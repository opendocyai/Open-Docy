import {
  REGEXP_EMAIL,
  REGEXP_PHONE,
  REGEXP_OVERSEAS_PHONE,
  REGEXP_OVERSEAS_TEL,
  REGEXP_PHONE_REGEX,
  REGEXP_URL,
  REGEXP_DATE_ISO,
  REGEXP_NUMBER,
  REGEXP_DIGITS,
  REGEXP_CHINESE,
  REGEXP_ID_CARD,
  REGEXP_NEW_CAR_NO,
  REGEXP_OLD_CAR_NO,
  REGEXP_AMOUNT,
  REGEXP_LETTER,
  REGEXP_EN_OR_NUM,
  REGEXP_LANDLINE,
  REGEXP_IMAGE,
  REGEXP_VIDEO,
  REGEXP_CAPITAL_LETTER,
  REGEXP_LOWERCASE_LETTER,
  REGEXP_FIGURE,
  REGEXP_SPECIAL_CHARACTER,
  REGEXP_FIRST_LAST,
  REGEXP_PASSWORD,
  REGEXP_HEX,
} from "./regex";

import { FILE_TYPES, type FileTypeKey } from "../shared/types/file";
import { getFileExtensionFromFile, getFileExtension } from "./file";

class EfficacyClass {
  email = (value: string): boolean => {
    return REGEXP_EMAIL.test(value);
  };

  mobile = (value: any): boolean => {
    return REGEXP_PHONE.test(value);
  };

  overseasMobile = (value: any): boolean => {
    return REGEXP_OVERSEAS_PHONE.test(value);
  };

  overseasTel = (value: any): boolean => {
    return REGEXP_OVERSEAS_TEL.test(value);
  };

  phoneRegex = (value: any): boolean => {
    return REGEXP_PHONE_REGEX.test(value);
  };

  url = (value: string): boolean => {
    return REGEXP_URL.test(value);
  };

  date = (value: any): boolean => {
    if (!value) return false;

    if (this.number(value)) value = +value;

    return !/Invalid|NaN/.test(new Date(value).toString());
  };

  dateISO = (value: any): boolean => {
    return REGEXP_DATE_ISO.test(value);
  };

  number = (value: any): boolean => {
    return REGEXP_NUMBER.test(value);
  };

  string = (value: any): boolean => {
    return typeof value === "string";
  };

  digits = (value: any): boolean => {
    return REGEXP_DIGITS.test(value);
  };

  idCard = (value: any): boolean => {
    return REGEXP_ID_CARD.test(value);
  };

  carNo = (value: any): boolean => {
    if (value.length === 7) return REGEXP_OLD_CAR_NO.test(value);
    if (value.length === 8) return REGEXP_NEW_CAR_NO.test(value);
    return false;
  };

  amount = (value: any): boolean => {
    return REGEXP_AMOUNT.test(value);
  };

  chinese = (value: any): boolean => {
    return REGEXP_CHINESE.test(value);
  };

  letter = (value: any): boolean => {
    return REGEXP_LETTER.test(value);
  };

  enOrNum = (value: any): boolean => {
    return REGEXP_EN_OR_NUM.test(value);
  };

  contains = (value: any, param: any): boolean => {
    return value.indexOf(param) >= 0;
  };

  range = (value: any, param: any): boolean => {
    return value >= param[0] && value <= param[1];
  };

  rangeLength = (value: any, param: any): boolean => {
    return value.length >= param[0] && value.length <= param[1];
  };

  landline = (value: any): boolean => {
    return REGEXP_LANDLINE.test(value);
  };

  empty = (value: any): boolean => {
    switch (typeof value) {
      case "undefined":
        return true;
      case "string":
        return value.trim().length === 0;
      case "boolean":
        return !value;
      case "number":
        return value === 0 || isNaN(value);
      case "object":
        if (value === null) return true;
        if (Array.isArray(value) && value.length === 0) return true;
        return Object.keys(value).length === 0;
    }
    return false;
  };

  jsonString = (value: any): boolean => {
    if (typeof value !== "string") return false;
    try {
      const obj = JSON.parse(value);
      return typeof obj === "object" && obj !== null;
    } catch {
      return false;
    }
  };

  array = (value: any): boolean => {
    return Array.isArray(value);
  };

  object = (value: any): boolean => {
    return Object.prototype.toString.call(value) === "[object Object]";
  };

  code = (value: any, len = 6): boolean => {
    return new RegExp(`^\\d{${len}}$`).test(value);
  };

  func = (value: any): boolean => {
    return typeof value === "function";
  };

  promise = (value: any): boolean => {
    return (
      this.object(value) && this.func(value.then) && this.func(value.catch)
    );
  };

  image = (value: any): boolean => {
    const newValue = value.split("?")[0];
    return REGEXP_IMAGE.test(newValue);
  };

  video = (value: any): boolean => {
    return REGEXP_VIDEO.test(value);
  };

  regExp = (o: any): boolean => {
    return Object.prototype.toString.call(o) === "[object RegExp]";
  };

  capitalLetter = (vala: any): boolean => {
    return REGEXP_CAPITAL_LETTER.test(vala);
  };

  lowercaseLetter = (value: any): boolean => {
    return REGEXP_LOWERCASE_LETTER.test(value);
  };

  figure = (value: any): boolean => {
    return REGEXP_FIGURE.test(value);
  };

  specialCharacter = (value: any): boolean => {
    return REGEXP_SPECIAL_CHARACTER.test(value);
  };

  isMobile = (): boolean => {
    const ua = navigator.userAgent;
    const agents = [
      "Android",
      "webOS",
      "BlackBerry",
      "IEMobile",
      "Opera Mini",
      "iPhone",
      "SymbianOS",
      "Windows Phone",
      "iPad",
      "iPod",
    ];

    return agents.some((a) => ua.includes(a));
  };

  isFirstLast = (value: any): boolean => {
    return REGEXP_FIRST_LAST.test(value);
  };

  verifyPassword = (value: any): boolean => {
    return REGEXP_PASSWORD.test(value);
  };

  isImageFile = (src: File | string): boolean => {
    if (src instanceof File) {
      return src.type.startsWith("image/");
    } else {
      const imageExtensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".bmp",
        ".webp",
      ];
      const lowerSrc: any = src.split("?")[0]?.split("#")[0]?.toLowerCase();
      return imageExtensions.some((ext) => lowerSrc.endsWith(ext));
    }
  };

  isHex = (value: any): boolean => {
    return REGEXP_HEX.test(value);
  };

  isFile = (value: unknown): value is File => {
    return typeof File !== "undefined" && value instanceof File;
  };

  isDataURL = (src: string): boolean => {
    return src.startsWith("data:");
  };

  isFileType = (src: string | File, type: FileTypeKey): boolean => {
    const extensions: any = FILE_TYPES[type];
    if (isFile(src)) {
      const mimeType = src?.type?.toLowerCase();

      if (type === "image") {
        return mimeType.startsWith("image/");
      }

      if (type === "video") {
        return mimeType.startsWith("video/");
      }

      if (type === "audio") {
        return mimeType.startsWith("audio/");
      }

      const ext = getFileExtensionFromFile(src);

      return extensions?.includes(ext as never);
    }

    if (isDataURL(src)) {
      if (type === "image") {
        return src.startsWith("data:image/");
      }

      if (type === "video") {
        return src.startsWith("data:video/");
      }

      if (type === "audio") {
        return src.startsWith("data:audio/");
      }
    }

    const ext = getFileExtension(src);

    return extensions?.includes(ext as never);
  };

  isImage = (src: string | File): boolean => {
    return isFileType(src, "image");
  };

  isVideo = (src: string | File): boolean => {
    return isFileType(src, "video");
  };

  isAudio = (src: string | File): boolean => {
    return isFileType(src, "audio");
  };

  isPdf = (src: string | File): boolean => {
    return isFileType(src, "pdf");
  };

  isWord = (src: string | File): boolean => {
    return isFileType(src, "word");
  };

  isExcel = (src: string | File): boolean => {
    return isFileType(src, "excel");
  };

  isPpt = (src: string | File): boolean => {
    return isFileType(src, "ppt");
  };

  isZip = (src: string | File): boolean => {
    return isFileType(src, "zip");
  };

  isText = (src: string | File): boolean => {
    return isFileType(src, "text");
  };

  isHtml = (src: string | File): boolean => {
    return isFileType(src, "html");
  };
}

const instance = new EfficacyClass();

export const email = instance.email.bind(instance);
export const mobile = instance.mobile.bind(instance);
export const overseasTel = instance.overseasTel.bind(instance);
export const overseasMobile = instance.overseasMobile.bind(instance);
export const phoneRegex = instance.phoneRegex.bind(instance);
export const url = instance.url.bind(instance);
export const date = instance.date.bind(instance);
export const dateISO = instance.dateISO.bind(instance);
export const number = instance.number.bind(instance);
export const digits = instance.digits.bind(instance);
export const idCard = instance.idCard.bind(instance);
export const carNo = instance.carNo.bind(instance);
export const amount = instance.amount.bind(instance);
export const chinese = instance.chinese.bind(instance);
export const letter = instance.letter.bind(instance);
export const enOrNum = instance.enOrNum.bind(instance);
export const contains = instance.contains.bind(instance);
export const range = instance.range.bind(instance);
export const rangeLength = instance.rangeLength.bind(instance);
export const empty = instance.empty.bind(instance);
export const jsonString = instance.jsonString.bind(instance);
export const landline = instance.landline.bind(instance);
export const object = instance.object.bind(instance);
export const array = instance.array.bind(instance);
export const code = instance.code.bind(instance);
export const func = instance.func.bind(instance);
export const promise = instance.promise.bind(instance);
export const video = instance.video.bind(instance);
export const image = instance.image.bind(instance);
export const regExp = instance.regExp.bind(instance);
export const string = instance.string.bind(instance);
export const capitalLetter = instance.capitalLetter.bind(instance);
export const lowercaseLetter = instance.lowercaseLetter.bind(instance);
export const figure = instance.figure.bind(instance);
export const specialCharacter = instance.specialCharacter.bind(instance);
export const isMobile = instance.isMobile.bind(instance);
export const isFirstLast = instance.isFirstLast.bind(instance);
export const verifyPassword = instance.verifyPassword.bind(instance);
export const isHex = instance.isHex.bind(instance);
export const isFile = instance.isFile.bind(instance);
export const isDataURL = instance.isDataURL.bind(instance);
export const isFileType = instance.isFileType.bind(instance);
export const isImage = instance.isImage.bind(instance);
export const isImageFile = instance.isImageFile.bind(instance);
export const isVideo = instance.isVideo.bind(instance);
export const isAudio = instance.isAudio.bind(instance);
export const isPdf = instance.isPdf.bind(instance);
export const isWord = instance.isWord.bind(instance);
export const isExcel = instance.isExcel.bind(instance);
export const isPpt = instance.isPpt.bind(instance);
export const isZip = instance.isZip.bind(instance);
export const isText = instance.isText.bind(instance);
export const isHtml = instance.isHtml.bind(instance);

export default instance;
