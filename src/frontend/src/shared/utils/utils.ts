import { v4 as uuidV4 } from "uuid";
import { nanoid } from "nanoid";
import {type addTextWatermarkToImageFileOptions, UUID_CHARS} from "@/shared/types";
import {isDataURL, isFile} from "@/utils";

class UtilsClass {
  readonly supportsIteratorHelpers: boolean;
  constructor() {
    this.supportsIteratorHelpers = !!Symbol.iterator;
    this.supportsIteratorHelpers = this.getSupportsIteratorHelpers();
  }

  private hasMethods(
    target: object,
    methods: readonly PropertyKey[],
  ): boolean {
    return methods.every(
      methods => typeof Reflect.get(target, methods) === 'function'
    );
  }

  private getSupportsIteratorHelpers() {
    if (typeof Iterator === 'undefined') {
      return false;
    }
    const iterator = [][Symbol.iterator]();
    return (
      this.hasMethods(Iterator, ['from']) &&
      this.hasMethods(iterator, ['map', 'filter', 'reduce', 'some', 'every', 'find', 'take', 'drop', 'toArray', 'forEach'])
    )
  }




  useCapitalizeWords = (str: string) => {
    return (
      str
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(" ")
    );
  };

  fallbackUUID = () => {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
      "",
    );
  };

  getUUID = () => {
    try {
      return typeof crypto?.randomUUID === "function"
        ? crypto.randomUUID()
        : this.fallbackUUID();
    } catch (error) {
      return this.fallbackUUID();
    }
  };

  getNanoID = (size = 21) => {
    try {
      return nanoid(size);
    } catch (error) {
      return uuidV4().replaceAll("-", "").slice(0, size);
    }
  };

  useShortUUID = (length = 8, chunkSize = 4): string => {
    if (length <= 0 || chunkSize <= 0) return "";

    const hex = uuidV4().replaceAll("-", "");
    let result = "";

    for (let i = 0; i < length; i++) {
      const start = (i * chunkSize) % hex.length;
      const segment = hex.slice(start, start + chunkSize);
      const value = Number.parseInt(segment, 16);
      result += UUID_CHARS[value % UUID_CHARS.length];
    }

    return result;
  };

  formatNumber = (num: any) => {
    if (num === null || num === undefined || num === "") return "";
    const n = Number(num);
    if (isNaN(n)) return "";
    return new Intl.NumberFormat("en-US").format(n);
  };

  getMimeType = (src: string | File): string => {
    if (isFile(src)) {
      return src.type || "";
    }

    if (isDataURL(src)) {
      return src.substring(src.indexOf(":") + 1, src.indexOf(";"));
    }

    return "";
  };

  buildURL = (base: string, path: string) => {
    return new URL(path, base).toString();
  };

  formatString = (
    str: string,
    mode: string = "compact",
    toLowerCase: boolean = true
  ): string => {
    if (!str) return '';
    const pattern = /[\s\-_\/\\\u3000]+/g;

    let result = toLowerCase ? str.toLowerCase() : str;

    switch (mode) {
      case "compact":
        return result.replace(pattern, "");
      case "underline":
        return result.replace(pattern, "_");
      case "slug":
        return result
          .replace(pattern, "-")
          .replace(/^-+|-+$/g, "")
          .replace(/-{2,}/g, "-");

      case "clean":
        return result.trim().replace(/\u3000/g, "");

      default:
        return result;
    }
  };


  addTextWatermarkToImageFile = async (
    file: File,
    watermarkText: string,
    options?: addTextWatermarkToImageFileOptions
  ): Promise<File> => {

    const {
      font = '14px sans-serif',
      color = 'rgba(0, 0, 0, 0.8)',
      backgroundColor = 'rgba(255, 255, 255, 0.6)',
      opacity = 1,
      position = 'bottom-right',
      margin = 20,
      lineHeight = 1.4,
      maxWidthRatio = 0.8,
      padding = 4
    } = options || {}

    const img = await loadImageFromFile(file)
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(img, 0, 0)

    ctx.font = font
    ctx.globalAlpha = opacity
    ctx.textBaseline = 'top'

    const lineHeightPx = parseInt(font, 10) * lineHeight
    const maxLineWidth = canvas.width * maxWidthRatio

    const finalLines: string[] = []
    const rawLines = watermarkText.split('\n')
    for (const rawLine of rawLines) {
      let currentLine = ''
      for (const word of rawLine) {
        const testLine = currentLine + word
        const testWidth = ctx.measureText(testLine).width
        if (testWidth > maxLineWidth) {
          finalLines.push(currentLine)
          currentLine = word
        } else {
          currentLine = testLine
        }
      }
      if (currentLine) finalLines.push(currentLine)
    }

    const totalTextHeight = finalLines.length * lineHeightPx
    const maxLineWidthUsed = Math.max(...finalLines.map(line => ctx.measureText(line).width))

    let x = 0, y = 0
    switch (position) {
      case 'top-left':
        x = margin
        y = margin
        break
      case 'top-right':
        x = canvas.width - maxLineWidthUsed - margin - padding * 2
        y = margin
        break
      case 'bottom-left':
        x = margin
        y = canvas.height - totalTextHeight - margin - padding * 2
        break
      case 'bottom-right':
        x = canvas.width - maxLineWidthUsed - margin - padding * 2
        y = canvas.height - totalTextHeight - margin - padding * 2
        break
      case 'center':
        x = (canvas.width - maxLineWidthUsed) / 2 - padding
        y = (canvas.height - totalTextHeight) / 2 - padding
        break
    }

    ctx.fillStyle = backgroundColor
    ctx.globalAlpha = opacity
    ctx.fillRect(
      x - padding,
      y - padding,
      maxLineWidthUsed + padding * 2,
      totalTextHeight + padding * 2
    )

    ctx.fillStyle = color
    finalLines.forEach((line, i) => {
      ctx.fillText(line, x, y + i * lineHeightPx)
    })

    const { promise, resolve } = Promise.withResolvers<Blob | null>()
    canvas.toBlob(resolve, file.type)

    const blob = await promise
    if (!blob) throw new Error('Canvas generated Blob is empty')
    return new File([blob!], file.name, { type: file.type })
  }

  loadImageFromFile = (file: File): Promise<HTMLImageElement> => {
    const { promise, resolve, reject } = Promise.withResolvers<HTMLImageElement>()
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = reader.result as string
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
    return promise
  }

  getLocation = (): Promise<GeolocationPosition> => {
    if (!navigator.geolocation) {
      return Promise.reject(new Error('Geolocation is not supported by this browser.'))
    }
    const { promise, resolve, reject } = Promise.withResolvers<GeolocationPosition>()
    navigator.geolocation.getCurrentPosition(resolve, reject)
    return promise
  }


}

export const utils = new UtilsClass();

export const useCapitalizeWords = utils.useCapitalizeWords.bind(utils);

export const fallbackUUID = utils.fallbackUUID.bind(utils);

export const getUUID = utils.getUUID.bind(utils);

export const getNanoID = utils.getNanoID.bind(utils);

export const useShortUUID = utils.useShortUUID.bind(utils);

export const formatNumber = utils.formatNumber.bind(utils);

export const getMimeType = utils.getMimeType.bind(utils);

export const buildURL = utils.buildURL.bind(utils);

export const formatString = utils.formatString.bind(utils);
export const addTextWatermarkToImageFile = utils.addTextWatermarkToImageFile.bind(utils);
export const loadImageFromFile = utils.loadImageFromFile.bind(utils);
export const getLocation = utils.getLocation.bind(utils);

export default utils;
