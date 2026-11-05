"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/7/4
Last Modified: 2025/7/4
Last Editor:
Filename: pdf.py
Description: PDF processing module.
"""
import io
import os
from typing import Dict, List, Optional, Tuple
from pathlib import Path

import camelot
import pdfplumber
from pypdf import PdfReader, PdfWriter
from pypdf.constants import AnnotationDictionaryAttributes
from pypdf.generic import (
    ArrayObject,
    BooleanObject,
    DictionaryObject,
    FloatObject,
    NameObject,
    NumberObject,
    TextStringObject,
)

from loguru import logger

from docy.core._string import gen_snowflake_id
from docy.utils.enums import DocumentTemplateFieldTypeEnum, PdfBorderStyleEnum

LOG = logger.bind(module="pdf")

def hex_to_rgb(hex_color: str) -> Tuple[int, int, int]:

    # remove the leading # if present
    if hex_color.startswith('#'):
        hex_color = hex_color[1:]

    # split into three parts: red, green, blue
    red = hex_color[0:2]
    green = hex_color[2:4]
    blue = hex_color[4:6]

    # convert to decimal
    return (
        int(red, 16),
        int(green, 16),
        int(blue, 16)
    )

def rgb_to_pdf_color(color: Tuple[int, int, int]) -> Tuple[float, float, float]:
    """
    Convert an RGB color to the PDF 0~1 range.

    color: tuple  ex: (45, 23, 19)
    """
    try:
        r, g, b = color
        return round(r / 255, 1), round(g / 255, 1), round(b / 255, 1)
    except Exception as e:
        raise e


class PdfHandler:

    def __init__(self, input_pdf_path: str | Path = None):

        self.input_pdf_path = input_pdf_path
        self.default_font_name = "Helv"
        self.default_font_size = 12  # font size
        self.default_ling_height = self.default_font_size + 4
        self.default_form_field_text_color = (0, 0, 0)  # text color inside form fields
        self.default_border_style = PdfBorderStyleEnum.PDF_BORDER_STYLE_SOLID.value  # border style: solid | dashed
        self.default_border_width = 1  # border width
        self.default_border_color = (0, 0, 0)  # black border
        self.default_background_color = (1, 1, 1)  # RGB white; set the background to white (to cover content below)
        self.default_field_flags_multi_line = 1 << 12

    def read_tables_by_camelot(self, input_pdf_path: str | Path = None) -> List[Dict]:
        """Read the PDF via pypdf and extract table data with camelot."""
        table_data_list = []

        if not input_pdf_path:
            input_pdf_path = self.input_pdf_path
        try:
            py_pdf_reader = PdfReader(input_pdf_path)
            # camelot 2.x get_page_layout needs a page object; the old code here only
            # used the page size, so get it from pypdf's mediabox instead
            first_page = py_pdf_reader.pages[0]
            page_width, page_height = (
                float(first_page.mediabox.width),
                float(first_page.mediabox.height),
            )
            # camelot 2.x (playa backend) does not release the file handle after parsing
            # by path (the file stays locked on Windows); read into memory and pass
            # bytes to avoid locking the source file
            with open(input_pdf_path, "rb") as _pdf_file:
                pdf_bytes = _pdf_file.read()
            for page_num, _page in enumerate(py_pdf_reader.pages, start=1):
                page_table_dict = {"page": page_num, "data": []}
                tables = camelot.read_pdf(pdf_bytes, pages=str(page_num), flavor="lattice")
                # flavor:
                # 'lattice'  grid method   tables with clear lines (horizontal/vertical borders)
                #            detect lines first, then split into cells; high accuracy, slightly slower
                # 'stream'   stream method  tables without lines / blurred lines
                #            clusters text blocks (x/y coordinates) to "infer" columns; good for
                #            borderless tables, but error-prone when column widths are misaligned

                # print the number of detected tables
                for table_number, table in enumerate(tables, start=1):  # noqa
                    row_num, col_num = table.shape  # table row and column count
                    page_table_field_data_list = []
                    if col_num == 2:  # two-column table, assume it has no header
                        tb_header_data, tb_header_rows, tb_header_cells = [], [], []
                        tb_data, tb_rows, tb_cells = table.data, table.rows, table.cells
                    else:  # more than two columns, assume the first row is the header
                        tb_header_data, tb_header_rows, tb_header_cells = table.data[0], table.rows[0], table.cells[0]
                        tb_data, tb_rows, tb_cells = table.data[1:], table.rows[1:], table.cells[1:]

                    for idx, (data, rows, cells) in enumerate(zip(tb_data, tb_rows, tb_cells)):
                        if tb_header_data:
                            name_list, value_list, name_cells, value_cells = [], [], [], []
                            for c_idx, (text, cell) in enumerate(zip(data[1:], cells[1:]), start=1):
                                name_list.append(f"{data[0]}-{tb_header_data[c_idx]}")
                                value_list.append(text)
                                name_cells.append(cells[0])
                                value_cells.append(cell)
                        else:  # two-column table
                            name_list,value_list = [data[0]], [data[1]]
                            name_cells, value_cells = [cells[0]], [cells[1]]
                        for name, value, name_cell, value_cell in zip(name_list, value_list, name_cells, value_cells):
                            field_dict = {
                                "id": gen_snowflake_id(),
                                "table_number": table_number,
                                "shap": table.shape,
                                "name": name,
                                "value": value,
                                "rows": rows,
                                "field_type": DocumentTemplateFieldTypeEnum.auto,
                                "checked": False,  # whether selected
                                "name_cell": {
                                    "x1": round(name_cell.x1, 3),
                                    "y1": round(
                                        page_height - name_cell.y2, 3
                                    ),  # flip the height so the origin is at the top-left, for frontend display
                                    "x2": round(name_cell.x2, 3),
                                    "y2": round(
                                        page_height - name_cell.y1, 3
                                    ),  # flip the height so the origin is at the top-left, for frontend display
                                },
                                "value_cell": {
                                    "x1": round(value_cell.x1, 3),
                                    "y1": round(
                                        page_height - value_cell.y2, 3
                                    ),  # flip the height so the origin is at the top-left, for frontend display
                                    "x2": round(value_cell.x2, 3),
                                    "y2": round(
                                        page_height - value_cell.y1, 3
                                    ),  # flip the height so the origin is at the top-left, for frontend display
                                },
                            }
                            page_table_field_data_list.append(field_dict)
                    page_table_dict["data"].extend(page_table_field_data_list)
                if page_table_dict["data"]:
                    table_data_list.append(page_table_dict)
        except Exception as e:
            LOG.error(f"read_tables_by_camelot error: {e}")

        return table_data_list

    def read_tables(self, input_pdf_path: str | Path = None) -> List[Dict]:
        """
        Read tables in the PDF.

        Implementation note: previously backed by PyMuPDF's ``page.find_tables()``;
        now backed by pdfplumber (same top-left coordinate system).
        The first table row is treated as the header row (PyMuPDF detected headers
        explicitly; pdfplumber tables conventionally start with the header).
        """
        all_table_data_list = []

        if not input_pdf_path:
            input_pdf_path = self.input_pdf_path

        with pdfplumber.open(input_pdf_path) as document:
            for page_num, page in enumerate(document.pages, 1):
                tables = page.find_tables()   # find all tables
                page_table_field_data_list = []
                for t_idx, table in enumerate(tables):
                    LOG.info(f"\n[Page {page_num}, Table {t_idx}]")
                    cells = table.extract()  # plain text including the header
                    rows = table.rows  # get coordinates (cells as (x0, top, x1, bottom))
                    if not cells or not rows:
                        continue
                    header_names = cells[0]
                    print(f"\n=== Page {page_num - 1}, Table {t_idx + 1} Header {header_names if header_names else None} ===")
                    for r_idx, (row_texts, row_rects) in enumerate(zip(cells, rows)):
                        if r_idx == 0:  # skip the header row
                            continue
                        if row_texts and row_texts[0] and row_rects.cells and row_rects.cells[0]:
                            key, (key_x0, key_y0, key_x1, key_y1) = row_texts[0], row_rects.cells[0]
                            for c_idx, (text, rect) in enumerate(zip(row_texts[1:], row_rects.cells[1:]), start=1):
                                row_field_dict = {
                                    "id": gen_snowflake_id(),
                                    "rows": tuple(row_rects.bbox),
                                    "field_type": DocumentTemplateFieldTypeEnum.auto,
                                    "checked": False,  # whether selected
                                    "table_number": t_idx + 1,
                                }
                                x0, y0, x1, y1 = rect if rect else (key_x0, key_y0, key_x1, key_y1)
                                header_name = header_names[c_idx] if c_idx < len(header_names) else None
                                row_field_dict.update(
                                    {
                                        "name": f"{key}-{header_name}" if header_name else key,
                                        "name_cell": {
                                            "x1": f"{key_x0:.2f}",
                                            "y1": f"{key_y0:.2f}",
                                            "x2": f"{key_x1:.2f}",
                                            "y2": f"{key_y1:.2f}",
                                        },
                                        "value": text,
                                        "value_cell": {
                                            "x1": f"{x0:.2f}",
                                            "y1": f"{y0:.2f}",
                                            "x2": f"{x1:.2f}",
                                            "y2": f"{y1:.2f}",
                                        },
                                    }
                                )

                                if row_field_dict.get("name") or row_field_dict.get("value"):
                                    page_table_field_data_list.append(row_field_dict)

                if page_table_field_data_list:
                    all_table_data_list.append({"page": page_num, "data": page_table_field_data_list})

        return all_table_data_list

    def read_form_area_from_pypdf(self, input_pdf_path: str | Path = None):
        if not input_pdf_path:
            input_pdf_path = self.input_pdf_path

        reader = PdfReader(input_pdf_path)
        for page_num, page in enumerate(reader.pages, start=1):
            if "/Annots" not in page:
                continue
            for annot in page.annotations:
                widget = annot.get_object()
                if widget.get(AnnotationDictionaryAttributes.Subtype) == "/Widget":
                    name = widget.get("/TU")  # field name
                    value = widget.get("/V")
                    rect = widget.get("/Rect")  # [llx, lly, urx, ury]
                    print(f"\nPage {page_num}: \n Field = '{name}' \n Value = '{value}' ;\n Rect = {rect}\n")

    def read_form_area(self, input_pdf_path: str | Path = None) -> List[Dict]:
        """Extract form field data (name/value/rect per page).

        Implementation note: previously backed by PyMuPDF widgets; now backed by
        pypdf /Annots traversal. Coordinates are converted from PDF bottom-left
        origin to top-left origin, matching the previous ``widget.rect``
        convention (and the frontend's expectation).
        """
        if not input_pdf_path:
            input_pdf_path = self.input_pdf_path

        from_area_field_list = []
        # read into memory first, so the source file is never kept locked on Windows
        with open(input_pdf_path, "rb") as _pdf_file:
            pdf_bytes = _pdf_file.read()
        reader = PdfReader(io.BytesIO(pdf_bytes))
        for page_num, page in enumerate(reader.pages, 1):
            widget_field_dict = {"page": page_num, "data": []}
            page_h = float(page.mediabox.height)
            for ref in (page.get("/Annots") or []):
                widget = ref.get_object()
                if widget.get(AnnotationDictionaryAttributes.Subtype) != "/Widget":
                    continue
                # fully-qualified field name (fitz convention): join the /T values
                # along the /Parent chain with "." — e.g. "Tester. First Name",
                # "Job Details. Meter Installed.0"
                name_parts = []
                t = widget.get("/T")
                if t is not None:
                    name_parts.append(str(t))
                value = widget.get("/V")
                field_type = widget.get("/FT")
                node = widget
                while "/Parent" in node:
                    node = node["/Parent"].get_object()
                    pt = node.get("/T")
                    if pt is not None:
                        name_parts.insert(0, str(pt))
                    if value is None:
                        value = node.get("/V")
                    if field_type is None:
                        field_type = node.get("/FT")
                name = ".".join(name_parts) if name_parts else None
                if field_type == "/Btn":
                    # fitz convention: no /V on the field -> "", otherwise report this
                    # widget's own appearance state (a radio group's unselected kid
                    # shows "Off", not the group's /V)
                    value = "" if value is None else widget.get("/AS", value)
                if value is not None:
                    value = str(value)
                    if value.startswith("/"):
                        value = value[1:]  # NameObject /Yes -> "Yes" (fitz convention)
                llx, lly, urx, ury = [float(v) for v in widget.get("/Rect", [0, 0, 0, 0])]
                # top-left origin, same as the previous fitz widget.rect
                x0, y0, x1, y1 = llx, page_h - ury, urx, page_h - lly
                cell = {
                    "x1": round(x0, 3) if x0 else 0,
                    "y1": round(y0, 3) if y0 else 0,
                    "x2": round(x1, 3) if x1 else 0,
                    "y2": round(y1, 3) if y1 else 0,
                }
                widget_field_dict["data"].append(
                    {
                        "id": gen_snowflake_id(),
                        "name": str(name) if name is not None else "",
                        "value": value if value is not None else "",
                        "checked": False,
                        "name_cell": dict(cell),
                        "value_cell": dict(cell),
                    }
                )
            # append only when data was extracted
            if widget_field_dict["data"]:
                from_area_field_list.append(widget_field_dict)

        return from_area_field_list

    def read_form_area_from_pdfrw(self, input_pdf_path: str | Path = None):
        pass

    def create_pdf_from_area(
            self,
            input_pdf_file_path: str | None,
            output_pdf_file_path: str,
            area_field_list: List[Dict],
            input_file_stream=None,
            mode=DocumentTemplateFieldTypeEnum.area,
            write_value: bool = True
    ) -> bool:
        """
        Add text form fields (AcroForm widgets) to a PDF.

        Implementation note: previously backed by PyMuPDF's ``fitz.Widget``; now the
        widget annotations are built directly with pypdf, and ``/NeedAppearances``
        is set so viewers (and the ai module's fill/flatten pipeline, which uses the
        same convention) render the field appearance. The method name, parameters and
        the top-left input coordinate convention (``value_cell``) are unchanged.

        :param input_pdf_file_path: input PDF path
        :param output_pdf_file_path: output PDF path
        :param area_field_list: form field list
        :param input_file_stream: input file stream
        :param mode: extract from `area` or `auto` (the two extraction modes have slightly
            different data structures and need different handling)
        :param write_value: whether to write the value
        """
        _FONT_BASE = {"Helv": "Helvetica", "Cour": "Courier", "TiRo": "Times-Roman", "ZaDb": "ZapfDingbats"}

        # open the PDF file (or create a new one)
        writer = PdfWriter()
        if input_file_stream:
            stream = input_file_stream if hasattr(input_file_stream, "read") else io.BytesIO(input_file_stream)
            try:
                stream.seek(0)
            except Exception:
                pass
            writer.append(PdfReader(stream))
        elif input_pdf_file_path:
            writer.append(PdfReader(str(input_pdf_file_path)))

        # prepare the AcroForm dictionary (fields list, default resources, NeedAppearances)
        root = writer._root_object
        if "/AcroForm" not in root:
            root[NameObject("/AcroForm")] = writer._add_object(
                DictionaryObject({NameObject("/Fields"): ArrayObject()})
            )
        acroform = root["/AcroForm"].get_object()
        if "/Fields" not in acroform:
            acroform[NameObject("/Fields")] = ArrayObject()
        acroform[NameObject("/NeedAppearances")] = BooleanObject(True)
        if "/DR" not in acroform:
            acroform[NameObject("/DR")] = DictionaryObject()
        dr = acroform["/DR"].get_object()
        if "/Font" not in dr:
            dr[NameObject("/Font")] = DictionaryObject()
        dr_font = dr["/Font"].get_object()
        fields = acroform["/Fields"]

        def _ensure_font(short_name: str):
            if f"/{short_name}" not in dr_font:
                dr_font[NameObject(f"/{short_name}")] = writer._add_object(DictionaryObject({
                    NameObject("/Type"): NameObject("/Font"),
                    NameObject("/Subtype"): NameObject("/Type1"),
                    NameObject("/BaseFont"): NameObject(f"/{_FONT_BASE.get(short_name, 'Helvetica')}"),
                    NameObject("/Encoding"): NameObject("/WinAnsiEncoding"),
                }))

        if mode == DocumentTemplateFieldTypeEnum.auto:
            new_area_field_list = []
            for field_dict in area_field_list:
                for field_data_dict in field_dict["data"]:
                    field_data_dict["page"] = field_dict["page"]
                    new_area_field_list.append(field_data_dict)
        else:
            new_area_field_list = area_field_list

        for area_field_dict in new_area_field_list:
            # get the field_name value; adding a widget fails without it
            field_name, field_value = area_field_dict.get("name", ""), area_field_dict.get("value", "")
            if not field_name:
                continue

            if not area_field_dict.get("id"):
                area_field_dict["id"] = gen_snowflake_id()

            page_num = area_field_dict.get("page", 1)
            field_style = area_field_dict.get("style", {}) if area_field_dict.get("style") else {}
            font_size = field_style.get("font_size", self.default_font_size) if field_style else self.default_font_size

            # get the page
            page = writer.pages[page_num - 1]
            page_h = float(page.mediabox.height)

            value_cell = area_field_dict.get("value_cell", {})
            if not value_cell:
                continue

            # define the text box position: input is top-left origin (same convention as
            # before); the PDF /Rect needs bottom-left origin -> flip with the page height
            x0 = float(value_cell.get("x1", 0) or 0)
            y_top = float(value_cell.get("y1", 0) or 0)
            x1 = float(value_cell.get("x2", 0) or 0)
            y_bottom = float(value_cell.get("y2", 0) or 0)
            rect = [x0, page_h - y_bottom, x1, page_h - y_top]

            # colors: background white by default (covers content below), black border/text
            fill_color = field_style.get("background_color", self.default_background_color)
            fill_color = self.hex_or_rgb_to_pdf_color(fill_color) if fill_color != self.default_border_color else fill_color
            border_color = field_style.get("border_color", self.default_border_color)
            border_color = self.hex_or_rgb_to_pdf_color(fill_color) if border_color != self.default_border_color else border_color
            text_color = field_style.get("text_color", self.default_form_field_text_color)
            text_color = self.hex_or_rgb_to_pdf_color(text_color) if text_color != self.default_form_field_text_color else text_color

            font_name = field_style.get("font_name", self.default_font_name)
            _ensure_font(font_name)
            tr, tg, tb = text_color if text_color else self.default_form_field_text_color
            da = f"{tr} {tg} {tb} rg /{font_name} {font_size} Tf"

            border_width = field_style.get("border_width", self.default_border_width)
            border_style = field_style.get("border_style", self.default_border_style)

            mk = DictionaryObject()
            if fill_color:
                mk[NameObject("/BG")] = ArrayObject([FloatObject(v) for v in fill_color])
            if border_color:
                mk[NameObject("/BC")] = ArrayObject([FloatObject(v) for v in border_color])

            widget = DictionaryObject({
                NameObject("/Type"): NameObject("/Annot"),
                NameObject("/Subtype"): NameObject("/Widget"),
                NameObject("/FT"): NameObject("/Tx"),
                NameObject("/T"): TextStringObject(str(field_name)),
                # whether to write the value
                NameObject("/V"): TextStringObject(str(field_value) if write_value else ""),
                NameObject("/Rect"): ArrayObject([FloatObject(v) for v in rect]),
                # enable multi-line
                NameObject("/Ff"): NumberObject(self.default_field_flags_multi_line),
                NameObject("/F"): NumberObject(4),  # printable
                NameObject("/DA"): TextStringObject(da),
                NameObject("/MK"): mk,
                NameObject("/BS"): DictionaryObject({
                    NameObject("/W"): NumberObject(border_width),
                    NameObject("/S"): NameObject(f"/{border_style}"),
                }),
                NameObject("/P"): page.indirect_reference,
            })
            widget_ref = writer._add_object(widget)

            # add to the page and register in the AcroForm field list
            if "/Annots" in page:
                page["/Annots"].append(widget_ref)
            else:
                page[NameObject("/Annots")] = ArrayObject([widget_ref])
            fields.append(widget_ref)

        # delete the existing file first if present
        if Path(output_pdf_file_path).exists():
            os.remove(output_pdf_file_path)

        # save the file
        with open(output_pdf_file_path, "wb") as f:
            writer.write(f)
        return True

    def create_pdf_form_area_by_pdfrw(
            self,
            in_pdf_file_path: str,
            output_pdf_file_path: str,
            area_field_list: List[Dict]) -> bool:
        """
        Create PDF form fields via pdfrw + reportlab.
        """
        return True

    @staticmethod
    def hex_or_rgb_to_pdf_color(color: tuple[int, int, int] | str):
        """
        Convert an RGB color to the PDF 0~1 range.
        """
        _color = None

        if isinstance(color, str) and color.startswith("#"):
            rgb_color = hex_to_rgb(color)
            _color = rgb_to_pdf_color(rgb_color)
        else:
            if (
                isinstance(color, tuple)
                and len(color) == 3
                and color[0] > 1
            ):
                _color = rgb_to_pdf_color(color)

        return _color

    def create_pdf_form_area_by_node_server(
            self,
            input_file_url: str,
            field_list: List[Dict]
    ):
        """
        Create a PDF file with form fields via the node service.
        """

        pass

    def extract_form_area_or_tables_with_pdfplumber(self, input_pdf_path: str | Path = None):
        """Extract tables or form fields from the PDF."""

        results = []
        if not input_pdf_path:
            input_pdf_path = self.input_pdf_path

        with pdfplumber.open(input_pdf_path) as p:
            for page_num, page in enumerate(p.pages, start=1):
                page_form_ares_dict = {"page": page_num, "field_list": []}
                if page.annots:  # has form fields
                    for area_field_dict in page.annots:
                        field_dict = {
                            "name": area_field_dict.get("title", ""),
                            "value": area_field_dict.get("contents", ""),
                            "rect": {
                                "x1": round(area_field_dict.get("x0", 0), 3),
                                "y1": round(area_field_dict.get("y1", 0), 3),
                                "x2": round(area_field_dict.get("x2", 0), 3),
                                "y2": round(area_field_dict.get("y2", 0), 3),
                            },
                        }
                        page_form_ares_dict["field_list"].append(field_dict)
                else:  # no form fields, look for tables
                    tables = page.find_tables()
                    for t_idx, table in enumerate(tables, start=1):
                        cells = table.extract()  # plain text including the header
                        rows = table.rows  # get coordinates (only Rects)

                results.append(page_form_ares_dict)
        return results


if __name__ == "__main__":
    pdf_path = Path(__file__).resolve().parent.parent / "temp" /  "area_tag_Xf1jh9rgfsR0dSFm-wg8bhIntvx20myLe.pdf"
    pdf = PdfHandler(pdf_path)
    print(pdf.extract_form_area_or_tables_with_pdfplumber())
