import * as htmlToImage from "html-to-image";
import { useRectangle } from "./rectangle";

interface Boundary {
  x: number;
  y: number;
  width: number;
  height: number;
  maxX: number;
  maxY: number;
  tx: number;
  ty: number;
}

const DEFAULT_PADDING = 30;

function freezeComputedStyles(
  source: Element,
  target: Element,
  flexPairs: Array<[Element, HTMLElement]>
) {
  const sourceStyle = window.getComputedStyle(source);
  const targetStyle = (target as HTMLElement).style;
  if (targetStyle) {
    for (let i = 0; i < sourceStyle.length; i++) {
      const name = sourceStyle[i];
      targetStyle.setProperty(
        name,
        sourceStyle.getPropertyValue(name),
        sourceStyle.getPropertyPriority(name)
      );
    }
    const flexWrap = sourceStyle.flexWrap;
    if (flexWrap === "wrap" || flexWrap === "wrap-reverse") {
      flexPairs.push([source, target as HTMLElement]);
    }
  }

  const sourceKids = source.children;
  const targetKids = target.children;
  const len = Math.min(sourceKids.length, targetKids.length);
  for (let i = 0; i < len; i++) {
    freezeComputedStyles(sourceKids[i], targetKids[i], flexPairs);
  }
}

const FLEX_SLACK_PX = 0.5;
const FLEX_REPAIR_PASSES = 4;

function countFlexLines(el: Element): number {
  const style = window.getComputedStyle(el);
  const column =
    style.flexDirection === "column" || style.flexDirection === "column-reverse";
  const lines = new Set<number>();
  for (const kid of Array.from(el.children)) {
    const kidStyle = window.getComputedStyle(kid);
    if (
      kidStyle.display === "none" ||
      kidStyle.position === "absolute" ||
      kidStyle.position === "fixed"
    ) {
      continue;
    }
    const rect = kid.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;
    lines.add(Math.round((column ? rect.left : rect.top) * 4) / 4);
  }
  return lines.size;
}

function addMainAxisSlack(el: HTMLElement) {
  const style = window.getComputedStyle(el);
  const column =
    style.flexDirection === "column" || style.flexDirection === "column-reverse";
  const size = parseFloat(column ? style.height : style.width);
  if (Number.isNaN(size)) return;
  if (column) el.style.height = `${size + FLEX_SLACK_PX}px`;
  else el.style.width = `${size + FLEX_SLACK_PX}px`;
}

function repairFlexWrapDrift(pairs: Array<[Element, HTMLElement]>) {
  for (let pass = 0; pass < FLEX_REPAIR_PASSES; pass++) {
    let repaired = 0;
    for (const [source, target] of pairs) {
      const liveLines = countFlexLines(source);
      if (countFlexLines(target) <= liveLines) continue;
      if (liveLines <= 1) target.style.flexWrap = "nowrap";
      else addMainAxisSlack(target);
      repaired++;
    }
    if (!repaired) return;
  }
}


export async function useExportAsImage(
  container: HTMLElement
): Promise<string> {
  if (!container?.firstElementChild) {
    throw new Error("Invalid container element");
  }

  const { calculateBoundary, transformValues } = useRectangle();

  const editorArea = container.firstElementChild as HTMLElement;

  const { scale } = await transformValues(editorArea);

  const els: HTMLElement[] = Array.from(
    editorArea.querySelectorAll<HTMLElement>('[style*="transform"]')
  );

  const boundary: Boundary = await calculateBoundary(els);

  console.log(scale, "scale");
  console.log(boundary, "boundary");

  const translateXY = scale * (DEFAULT_PADDING / 2);

  const clone = editorArea.cloneNode(true) as HTMLElement;
  const flexPairs: Array<[Element, HTMLElement]> = [];
  const sourceKids = editorArea.children;
  const cloneKids = clone.children;
  for (
    let i = 0, len = Math.min(sourceKids.length, cloneKids.length);
    i < len;
    i++
  ) {
    freezeComputedStyles(sourceKids[i], cloneKids[i], flexPairs);
  }
  clone.style.transform = `translate(${translateXY}px, ${translateXY}px) scale(${scale})`;

  const { x, y, maxX, maxY, width, height, tx, ty } = boundary;

  const contentWidth = width + DEFAULT_PADDING;
  const contentHeight = height + DEFAULT_PADDING;

  const tempContainer = document.createElement("div");
  Object.assign(tempContainer.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: `${contentWidth}px`,
    height: `${contentHeight}px`,
    overflow: "visible",
    zIndex: "-9999",
    backgroundColor: "#f3f3f3",
  });

  console.log(x, y, maxX, maxY, "minX, minY, maxX, maxY");
  console.log(tx, ty, "tx, ty");

  await new Promise((resolve) => requestAnimationFrame(resolve));

  const contentWrapper = document.createElement("div");
  Object.assign(contentWrapper.style, {
    position: "absolute",
    left: `${(tx * scale) * -1}px`,
    top: `${(ty * scale) * -1}px`,
  });

  contentWrapper.appendChild(clone);
  tempContainer.appendChild(contentWrapper);
  document.body.appendChild(tempContainer);

  try {
    await Promise.all([
      new Promise((resolve) => requestAnimationFrame(resolve)),
      document.fonts.ready,
      new Promise((resolve) => setTimeout(resolve, 100)),
    ]);

    repairFlexWrapDrift(flexPairs);

    try {
      return await htmlToImage.toPng(tempContainer, {
        quality: 0.7,
        backgroundColor: "transparent",
        pixelRatio: 2,
        cacheBust: true,
      });
    } catch (err) {
      console.error("[exportAsImage] toPng failed:", err);
      throw err;
    }
  } finally {
    tempContainer.remove();
  }
}
