import { ref } from "vue";

interface FileIconList {
  icon?: any;
  id: string;
}

export const useFileIconList = () => {
  const fileIconList = ref<FileIconList[]>([
    {
      icon: new URL("~/assets/icon_svg/pdf.svg", import.meta.url).href,
      id: "pdf",
    },
    {
      icon: new URL("~/assets/icon_svg/csv.svg", import.meta.url).href,
      id: "csv",
    },
    {
      icon: new URL("~/assets/icon_svg/doc.svg", import.meta.url).href,
      id: "docx",
    },
    {
      icon: new URL("~/assets/icon_svg/ppt.svg", import.meta.url).href,
      id: "pptx",
    },
    {
      icon: new URL("~/assets/icon_svg/ppt.svg", import.meta.url).href,
      id: "ppt",
    },
    {
      icon: new URL("~/assets/icon_svg/txt.svg", import.meta.url).href,
      id: "txt",
    },
    {
      icon: new URL("~/assets/icon_svg/xlsx.svg", import.meta.url).href,
      id: "xlsx",
    },
    {
      icon: new URL("~/assets/icon_svg/json.svg", import.meta.url).href,
      id: "json",
    },
    {
      icon: new URL("~/assets/icons/gif.svg", import.meta.url).href,
      id: "gif",
    },
    {
      icon: new URL("~/assets/icons/jpeg.svg", import.meta.url).href,
      id: "jpeg",
    },
    {
      icon: new URL("~/assets/icons/jpg.svg", import.meta.url).href,
      id: "jpg",
    },
    {
      icon: new URL("~/assets/icons/png.svg", import.meta.url).href,
      id: "png",
    },
    {
      icon: new URL("~/assets/icons/png.svg", import.meta.url).href,
      id: "svg",
    },
  ]);
  return { fileIconList }
};
