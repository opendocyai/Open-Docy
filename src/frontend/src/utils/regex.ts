export const REGEXP_PHONE: any = /^1[3-9]\d{9}$/;
export const REGEXP_OVERSEAS_PHONE: any = /^[0-9]{9}$/;
export const REGEXP_OVERSEAS_TEL: any = /^\+?[0-9]{7,15}$/;

export const REGEXP_PHONE_REGEX =
	/^(\+?\d{1,4}[-\s]?)?(\d{1,4}[-\s]?){1,4}\d{2,}$/;

export const REGEXP_EMAIL: any =
	/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]{2,6}$/;

export const REGEXP_URL: any = /^(((https|http|ftp|rtsp|mms):\/\/)?(([0-9a-zA-Z_!~*'().&=+$%-]+:)?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+\.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z]\.[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?))$/;

export const REGEXP_DATE_ISO: any =
	/^\d{4}[/-](0?[1-9]|1[012])[/-](0?[1-9]|[12][0-9]|3[01])$/;

export const REGEXP_NUMBER: any = /^[+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/;

export const REGEXP_DIGITS: any = /^\d+$/;

export const REGEXP_ID_CARD: any =
	/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;

export const REGEXP_NEW_CAR_NO: any =
	/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
export const REGEXP_OLD_CAR_NO: any =
	/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;

export const REGEXP_CHINESE: any = /^[\u4e00-\u9fa5]+$/gi;
export const REGEXP_LETTER: any = /^[a-zA-Z]*$/;

export const REGEXP_EN_OR_NUM: any = /^[0-9a-zA-Z]*$/g;

export const REGEXP_AMOUNT: any =
	/^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/;

export const REGEXP_LANDLINE: any = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
export const REGEXP_IMAGE: any = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
export const REGEXP_VIDEO: any =
	/\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i;

export const REGEXP_CAPITAL_LETTER: any = /(?=.*?[A-Z])/;
export const REGEXP_LOWERCASE_LETTER: any = /(?=.*?[a-z])/;
export const REGEXP_FIGURE: any = /(?=.*?\d)/;
export const REGEXP_SPECIAL_CHARACTER: any =
	/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

export const REGEXP_FIRST_LAST: any = /^[a-zA-Z'-]{1,50}$/;

export const REGEXP_PASSWORD: any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?])[a-zA-Z\d!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?]{8,15}$/;
export const REGEXP_HEX: any = /^[0-9a-fA-F]+$/;
