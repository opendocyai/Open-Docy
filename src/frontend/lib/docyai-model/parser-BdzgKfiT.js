import { o as e, t } from "./rolldown-runtime-DsPmjQRF.js";
import { dt as n, pt as r } from "./dist-Bp5vtczT.js";
import { t as i } from "./jszip.min-N6L6cMlJ.js";
import { n as a, r as o, t as s } from "./spreadsheet-CVKrOx7p.js";
// node_modules/.pnpm/styled-exceljs@0.21.6/node_modules/styled-exceljs/xlsx.mjs
var c = {};
c.version = "0.21.6";
var l = 1200, u = [
	874,
	932,
	936,
	949,
	950,
	1250,
	1251,
	1252,
	1253,
	1254,
	1255,
	1256,
	1257,
	1258,
	1e4
], d = {
	0: 1252,
	1: 65001,
	2: 65001,
	77: 1e4,
	128: 932,
	129: 949,
	130: 1361,
	134: 936,
	136: 950,
	161: 1253,
	162: 1254,
	163: 1258,
	177: 1255,
	178: 1256,
	186: 1257,
	204: 1251,
	222: 874,
	238: 1250,
	255: 1252,
	69: 6969
}, f = function(e) {
	u.indexOf(e) != -1 && (d[0] = e);
};
function p() {
	f(1252);
}
var m = function(e) {
	l = e, f(e);
};
function h() {
	m(1200), p();
}
function g(e) {
	for (var t = [], n = 0, r = e.length; n < r; ++n) t[n] = e.charCodeAt(n);
	return t;
}
function _(e) {
	for (var t = [], n = 0; n < e.length >> 1; ++n) t[n] = String.fromCharCode(e.charCodeAt(2 * n) + (e.charCodeAt(2 * n + 1) << 8));
	return t.join("");
}
function v(e) {
	for (var t = [], n = 0; n < e.length >> 1; ++n) t[n] = String.fromCharCode(e[2 * n] + (e[2 * n + 1] << 8));
	return t.join("");
}
function y(e) {
	for (var t = [], n = 0; n < e.length >> 1; ++n) t[n] = String.fromCharCode(e.charCodeAt(2 * n + 1) + (e.charCodeAt(2 * n) << 8));
	return t.join("");
}
var b = function(e) {
	var t = e.charCodeAt(0), n = e.charCodeAt(1);
	return t == 255 && n == 254 ? _(e.slice(2)) : t == 254 && n == 255 ? y(e.slice(2)) : t == 65279 ? e.slice(1) : e;
}, x = function(e) {
	return String.fromCharCode(e);
}, S = function(e) {
	return String.fromCharCode(e);
}, C = null, w = !0, T = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function E(e) {
	for (var t = "", n = 0, r = 0, i = 0, a = 0, o = 0, s = 0, c = 0, l = 0; l < e.length;) n = e.charCodeAt(l++), a = n >> 2, r = e.charCodeAt(l++), o = (n & 3) << 4 | r >> 4, i = e.charCodeAt(l++), s = (r & 15) << 2 | i >> 6, c = i & 63, isNaN(r) ? s = c = 64 : isNaN(i) && (c = 64), t += T.charAt(a) + T.charAt(o) + T.charAt(s) + T.charAt(c);
	return t;
}
function D(e) {
	for (var t = "", n = 0, r = 0, i = 0, a = 0, o = 0, s = 0, c = 0, l = 0; l < e.length;) n = e[l++], a = n >> 2, r = e[l++], o = (n & 3) << 4 | r >> 4, i = e[l++], s = (r & 15) << 2 | i >> 6, c = i & 63, isNaN(r) ? s = c = 64 : isNaN(i) && (c = 64), t += T.charAt(a) + T.charAt(o) + T.charAt(s) + T.charAt(c);
	return t;
}
function O(e) {
	var t = "", n = 0, r = 0, i = 0, a = 0, o = 0, s = 0, c = 0;
	if (e.slice(0, 5) == "data:") {
		var l = e.slice(0, 1024).indexOf(";base64,");
		l > -1 && (e = e.slice(l + 8));
	}
	e = e.replace(/[^\w\+\/\=]/g, "");
	for (var u = 0; u < e.length;) a = T.indexOf(e.charAt(u++)), o = T.indexOf(e.charAt(u++)), n = a << 2 | o >> 4, t += String.fromCharCode(n), s = T.indexOf(e.charAt(u++)), r = (o & 15) << 4 | s >> 2, s !== 64 && (t += String.fromCharCode(r)), c = T.indexOf(e.charAt(u++)), i = (s & 3) << 6 | c, c !== 64 && (t += String.fromCharCode(i));
	return t;
}
var k = /*#__PURE__*/ (function() {
	return typeof Buffer < "u" && typeof process < "u" && process.versions !== void 0 && !!process.versions.node;
})(), A = /*#__PURE__*/ (function() {
	if (typeof Buffer < "u") {
		var e = !Buffer.from;
		if (!e) try {
			Buffer.from("foo", "utf8");
		} catch {
			e = !0;
		}
		return e ? function(e, t) {
			return t ? new Buffer(e, t) : new Buffer(e);
		} : Buffer.from.bind(Buffer);
	}
	return function() {};
})(), j = /*#__PURE__*/ (function() {
	if (typeof Buffer > "u") return !1;
	var e = A([65, 0]);
	return e ? e.toString("utf16le").length == 1 : !1;
})();
function M(e) {
	return k ? Buffer.alloc ? Buffer.alloc(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : Array(e);
}
function ee(e) {
	return k ? Buffer.allocUnsafe ? Buffer.allocUnsafe(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : Array(e);
}
var N = function(e) {
	return k ? A(e, "binary") : e.split("").map(function(e) {
		return e.charCodeAt(0) & 255;
	});
};
function P(e) {
	if (Array.isArray(e)) return e.map(function(e) {
		return String.fromCharCode(e);
	}).join("");
	for (var t = [], n = 0; n < e.length; ++n) t[n] = String.fromCharCode(e[n]);
	return t.join("");
}
function F(e) {
	if (typeof ArrayBuffer > "u") throw Error("Unsupported");
	if (e instanceof ArrayBuffer) return F(new Uint8Array(e));
	for (var t = Array(e.length), n = 0; n < e.length; ++n) t[n] = e[n];
	return t;
}
var I = k ? function(e) {
	return Buffer.concat(e.map(function(e) {
		return Buffer.isBuffer(e) ? e : A(e);
	}));
} : function(e) {
	if (typeof Uint8Array < "u") {
		var t = 0, n = 0;
		for (t = 0; t < e.length; ++t) n += e[t].length;
		var r = new Uint8Array(n), i = 0;
		for (t = 0, n = 0; t < e.length; n += i, ++t) i = e[t].length, e[t] instanceof Uint8Array ? r.set(e[t], n) : typeof e[t] == "string" ? r.set(new Uint8Array(N(e[t])), n) : r.set(new Uint8Array(e[t]), n);
		return r;
	}
	return [].concat.apply([], e.map(function(e) {
		return Array.isArray(e) ? e : [].slice.call(e);
	}));
};
function L(e) {
	for (var t = [], n = 0, r = e.length + 250, i = M(e.length + 255), a = 0; a < e.length; ++a) {
		var o = e.charCodeAt(a);
		if (o < 128) i[n++] = o;
		else if (o < 2048) i[n++] = 192 | o >> 6 & 31, i[n++] = 128 | o & 63;
		else if (o >= 55296 && o < 57344) {
			o = (o & 1023) + 64;
			var s = e.charCodeAt(++a) & 1023;
			i[n++] = 240 | o >> 8 & 7, i[n++] = 128 | o >> 2 & 63, i[n++] = 128 | s >> 6 & 15 | (o & 3) << 4, i[n++] = 128 | s & 63;
		} else i[n++] = 224 | o >> 12 & 15, i[n++] = 128 | o >> 6 & 63, i[n++] = 128 | o & 63;
		n > r && (t.push(i.slice(0, n)), n = 0, i = M(65535), r = 65530);
	}
	return t.push(i.slice(0, n)), I(t);
}
var R = /\u0000/g, te = /[\u0001-\u0006]/g;
function z(e) {
	for (var t = "", n = e.length - 1; n >= 0;) t += e.charAt(n--);
	return t;
}
function B(e, t) {
	var n = "" + e;
	return n.length >= t ? n : xt("0", t - n.length) + n;
}
function V(e, t) {
	var n = "" + e;
	return n.length >= t ? n : xt(" ", t - n.length) + n;
}
function H(e, t) {
	var n = "" + e;
	return n.length >= t ? n : n + xt(" ", t - n.length);
}
function U(e, t) {
	var n = "" + Math.round(e);
	return n.length >= t ? n : xt("0", t - n.length) + n;
}
function ne(e, t) {
	var n = "" + e;
	return n.length >= t ? n : xt("0", t - n.length) + n;
}
var re = 2 ** 32;
function ie(e, t) {
	return e > re || e < -re ? U(e, t) : ne(Math.round(e), t);
}
function ae(e, t) {
	return t ||= 0, e.length >= 7 + t && (e.charCodeAt(t) | 32) == 103 && (e.charCodeAt(t + 1) | 32) == 101 && (e.charCodeAt(t + 2) | 32) == 110 && (e.charCodeAt(t + 3) | 32) == 101 && (e.charCodeAt(t + 4) | 32) == 114 && (e.charCodeAt(t + 5) | 32) == 97 && (e.charCodeAt(t + 6) | 32) == 108;
}
var oe = [
	["Sun", "Sunday"],
	["Mon", "Monday"],
	["Tue", "Tuesday"],
	["Wed", "Wednesday"],
	["Thu", "Thursday"],
	["Fri", "Friday"],
	["Sat", "Saturday"]
], se = [
	[
		"J",
		"Jan",
		"January"
	],
	[
		"F",
		"Feb",
		"February"
	],
	[
		"M",
		"Mar",
		"March"
	],
	[
		"A",
		"Apr",
		"April"
	],
	[
		"M",
		"May",
		"May"
	],
	[
		"J",
		"Jun",
		"June"
	],
	[
		"J",
		"Jul",
		"July"
	],
	[
		"A",
		"Aug",
		"August"
	],
	[
		"S",
		"Sep",
		"September"
	],
	[
		"O",
		"Oct",
		"October"
	],
	[
		"N",
		"Nov",
		"November"
	],
	[
		"D",
		"Dec",
		"December"
	]
];
function ce(e) {
	return e ||= {}, e[0] = "General", e[1] = "0", e[2] = "0.00", e[3] = "#,##0", e[4] = "#,##0.00", e[9] = "0%", e[10] = "0.00%", e[11] = "0.00E+00", e[12] = "# ?/?", e[13] = "# ??/??", e[14] = "m/d/yy", e[15] = "d-mmm-yy", e[16] = "d-mmm", e[17] = "mmm-yy", e[18] = "h:mm AM/PM", e[19] = "h:mm:ss AM/PM", e[20] = "h:mm", e[21] = "h:mm:ss", e[22] = "m/d/yy h:mm", e[37] = "#,##0 ;(#,##0)", e[38] = "#,##0 ;[Red](#,##0)", e[39] = "#,##0.00;(#,##0.00)", e[40] = "#,##0.00;[Red](#,##0.00)", e[45] = "mm:ss", e[46] = "[h]:mm:ss", e[47] = "mmss.0", e[48] = "##0.0E+0", e[49] = "@", e[56] = "\"上午/下午 \"hh\"時\"mm\"分\"ss\"秒 \"", e;
}
var W = {
	0: "General",
	1: "0",
	2: "0.00",
	3: "#,##0",
	4: "#,##0.00",
	9: "0%",
	10: "0.00%",
	11: "0.00E+00",
	12: "# ?/?",
	13: "# ??/??",
	14: "m/d/yy",
	15: "d-mmm-yy",
	16: "d-mmm",
	17: "mmm-yy",
	18: "h:mm AM/PM",
	19: "h:mm:ss AM/PM",
	20: "h:mm",
	21: "h:mm:ss",
	22: "m/d/yy h:mm",
	37: "#,##0 ;(#,##0)",
	38: "#,##0 ;[Red](#,##0)",
	39: "#,##0.00;(#,##0.00)",
	40: "#,##0.00;[Red](#,##0.00)",
	45: "mm:ss",
	46: "[h]:mm:ss",
	47: "mmss.0",
	48: "##0.0E+0",
	49: "@",
	56: "\"上午/下午 \"hh\"時\"mm\"分\"ss\"秒 \""
}, G = {
	5: 37,
	6: 38,
	7: 39,
	8: 40,
	23: 0,
	24: 0,
	25: 0,
	26: 0,
	27: 14,
	28: 14,
	29: 14,
	30: 14,
	31: 14,
	50: 14,
	51: 14,
	52: 14,
	53: 14,
	54: 14,
	55: 14,
	56: 14,
	57: 14,
	58: 14,
	59: 1,
	60: 2,
	61: 3,
	62: 4,
	67: 9,
	68: 10,
	69: 12,
	70: 13,
	71: 14,
	72: 14,
	73: 15,
	74: 16,
	75: 17,
	76: 20,
	77: 21,
	78: 22,
	79: 45,
	80: 46,
	81: 47,
	82: 0
}, K = {
	5: "\"$\"#,##0_);\\(\"$\"#,##0\\)",
	63: "\"$\"#,##0_);\\(\"$\"#,##0\\)",
	6: "\"$\"#,##0_);[Red]\\(\"$\"#,##0\\)",
	64: "\"$\"#,##0_);[Red]\\(\"$\"#,##0\\)",
	7: "\"$\"#,##0.00_);\\(\"$\"#,##0.00\\)",
	65: "\"$\"#,##0.00_);\\(\"$\"#,##0.00\\)",
	8: "\"$\"#,##0.00_);[Red]\\(\"$\"#,##0.00\\)",
	66: "\"$\"#,##0.00_);[Red]\\(\"$\"#,##0.00\\)",
	41: "_(* #,##0_);_(* \\(#,##0\\);_(* \"-\"_);_(@_)",
	42: "_(\"$\"* #,##0_);_(\"$\"* \\(#,##0\\);_(\"$\"* \"-\"_);_(@_)",
	43: "_(* #,##0.00_);_(* \\(#,##0.00\\);_(* \"-\"??_);_(@_)",
	44: "_(\"$\"* #,##0.00_);_(\"$\"* \\(#,##0.00\\);_(\"$\"* \"-\"??_);_(@_)"
};
function le(e, t, n) {
	for (var r = e < 0 ? -1 : 1, i = e * r, a = 0, o = 1, s = 0, c = 1, l = 0, u = 0, d = Math.floor(i); l < t && (d = Math.floor(i), s = d * o + a, u = d * l + c, !(i - d < 5e-8));) i = 1 / (i - d), a = o, o = s, c = l, l = u;
	if (u > t && (l > t ? (u = c, s = a) : (u = l, s = o)), !n) return [
		0,
		r * s,
		u
	];
	var f = Math.floor(r * s / u);
	return [
		f,
		r * s - f * u,
		u
	];
}
function ue(e) {
	var t = e.toPrecision(16);
	if (t.indexOf("e") > -1) {
		var n = t.slice(0, t.indexOf("e"));
		return n = n.indexOf(".") > -1 ? n.slice(0, n.slice(0, 2) == "0." ? 17 : 16) : n.slice(0, 15) + xt("0", n.length - 15), n + t.slice(t.indexOf("e"));
	}
	var r = t.indexOf(".") > -1 ? t.slice(0, t.slice(0, 2) == "0." ? 17 : 16) : t.slice(0, 15) + xt("0", t.length - 15);
	return Number(r);
}
function de(e, t, n) {
	if (e > 2958465 || e < 0) return null;
	e = ue(e);
	var r = e | 0, i = Math.floor(86400 * (e - r)), a = 0, o = [], s = {
		D: r,
		T: i,
		u: 86400 * (e - r) - i,
		y: 0,
		m: 0,
		d: 0,
		H: 0,
		M: 0,
		S: 0,
		q: 0
	};
	if (Math.abs(s.u) < 1e-6 && (s.u = 0), t && t.date1904 && (r += 1462), s.u > .9999 && (s.u = 0, ++i == 86400 && (s.T = i = 0, ++r, ++s.D)), r === 60) o = n ? [
		1317,
		10,
		29
	] : [
		1900,
		2,
		29
	], a = 3;
	else if (r === 0) o = n ? [
		1317,
		8,
		29
	] : [
		1900,
		1,
		0
	], a = 6;
	else {
		r > 60 && --r;
		var c = new Date(1900, 0, 1);
		c.setDate(c.getDate() + r - 1), o = [
			c.getFullYear(),
			c.getMonth() + 1,
			c.getDate()
		], a = c.getDay(), r < 60 && (a = (a + 6) % 7), n && (a = ve(c, o));
	}
	return s.y = o[0], s.m = o[1], s.d = o[2], s.S = i % 60, i = Math.floor(i / 60), s.M = i % 60, i = Math.floor(i / 60), s.H = i, s.q = a, s;
}
function fe(e) {
	return e.indexOf(".") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)$/, "$1");
}
function pe(e) {
	return e.indexOf("E") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)[Ee]/, "$1E").replace(/(E[+-])(\d)$/, "$10$2");
}
function me(e) {
	var t = e < 0 ? 12 : 11, n = fe(e.toFixed(12));
	return n.length <= t || (n = e.toPrecision(10), n.length <= t) ? n : e.toExponential(5);
}
function he(e) {
	var t = fe(e.toFixed(11));
	return t.length > (e < 0 ? 12 : 11) || t === "0" || t === "-0" ? e.toPrecision(6) : t;
}
function ge(e) {
	if (!isFinite(e)) return isNaN(e) ? "#NUM!" : "#DIV/0!";
	var t = Math.floor(Math.log(Math.abs(e)) * Math.LOG10E);
	return fe(pe((t >= -4 && t <= -1 ? e.toPrecision(10 + t) : Math.abs(t) <= 9 ? me(e) : t === 10 ? e.toFixed(10).substr(0, 12) : he(e)).toUpperCase()));
}
function _e(e, t) {
	switch (typeof e) {
		case "string": return e;
		case "boolean": return e ? "TRUE" : "FALSE";
		case "number": return (e | 0) === e ? e.toString(10) : ge(e);
		case "undefined": return "";
		case "object":
			if (e == null) return "";
			if (e instanceof Date) return Je(14, ft(e, t && t.date1904), t);
	}
	throw Error("unsupported value in General format: " + e);
}
function ve(e, t) {
	t[0] -= 581;
	var n = e.getDay();
	return e < 60 && (n = (n + 6) % 7), n;
}
function ye(e, t, n, r) {
	var i = "", a = 0, o = 0, s = n.y, c, l = 0;
	switch (e) {
		case 98: s = n.y + 543;
		case 121:
			switch (t.length) {
				case 1:
				case 2:
					c = s % 100, l = 2;
					break;
				default: c = s % 1e4, l = 4;
			}
			break;
		case 109:
			switch (t.length) {
				case 1:
				case 2:
					c = n.m, l = t.length;
					break;
				case 3: return se[n.m - 1][1];
				case 5: return se[n.m - 1][0];
				default: return se[n.m - 1][2];
			}
			break;
		case 100:
			switch (t.length) {
				case 1:
				case 2:
					c = n.d, l = t.length;
					break;
				case 3: return oe[n.q][0];
				default: return oe[n.q][1];
			}
			break;
		case 104:
			switch (t.length) {
				case 1:
				case 2:
					c = 1 + (n.H + 11) % 12, l = t.length;
					break;
				default: throw "bad hour format: " + t;
			}
			break;
		case 72:
			switch (t.length) {
				case 1:
				case 2:
					c = n.H, l = t.length;
					break;
				default: throw "bad hour format: " + t;
			}
			break;
		case 77:
			switch (t.length) {
				case 1:
				case 2:
					c = n.M, l = t.length;
					break;
				default: throw "bad minute format: " + t;
			}
			break;
		case 115:
			if (t != "s" && t != "ss" && t != ".0" && t != ".00" && t != ".000") throw "bad second format: " + t;
			return n.u === 0 && (t == "s" || t == "ss") ? B(n.S, t.length) : (o = r >= 2 ? r === 3 ? 1e3 : 100 : r === 1 ? 10 : 1, a = Math.round(o * (n.S + n.u)), a >= 60 * o && (a = 0), t === "s" ? a === 0 ? "0" : "" + a / o : (i = B(a, 2 + r), t === "ss" ? i.substr(0, 2) : "." + i.substr(2, t.length - 1)));
		case 90:
			switch (t) {
				case "[h]":
				case "[hh]":
					c = n.D * 24 + n.H;
					break;
				case "[m]":
				case "[mm]":
					c = (n.D * 24 + n.H) * 60 + n.M;
					break;
				case "[s]":
				case "[ss]":
					c = ((n.D * 24 + n.H) * 60 + n.M) * 60 + (r == 0 ? Math.round(n.S + n.u) : n.S);
					break;
				default: throw "bad abstime format: " + t;
			}
			l = t.length === 3 ? 1 : 2;
			break;
		case 101: c = s, l = 1;
	}
	return l > 0 ? B(c, l) : "";
}
function be(e) {
	var t = 3;
	if (e.length <= t) return e;
	for (var n = e.length % t, r = e.substr(0, n); n != e.length; n += t) r += (r.length > 0 ? "," : "") + e.substr(n, t);
	return r;
}
var xe = /%/g;
function Se(e, t, n) {
	var r = t.replace(xe, ""), i = t.length - r.length;
	return Be(e, r, n * 10 ** (2 * i)) + xt("%", i);
}
function Ce(e, t, n) {
	for (var r = t.length - 1; t.charCodeAt(r - 1) === 44;) --r;
	return Be(e, t.substr(0, r), n / 10 ** (3 * (t.length - r)));
}
function we(e, t) {
	var n, r = e.indexOf("E") - e.indexOf(".") - 1;
	if (e.match(/^#+0.0E\+0$/)) {
		if (t == 0) return "0.0E+0";
		if (t < 0) return "-" + we(e, -t);
		var i = e.indexOf(".");
		i === -1 && (i = e.indexOf("E"));
		var a = Math.floor(Math.log(t) * Math.LOG10E) % i;
		if (a < 0 && (a += i), n = (t / 10 ** a).toPrecision(r + 1 + (i + a) % i), n.indexOf("e") === -1) {
			var o = Math.floor(Math.log(t) * Math.LOG10E);
			for (n.indexOf(".") === -1 ? n = n.charAt(0) + "." + n.substr(1) + "E+" + (o - n.length + a) : n += "E+" + (o - a); n.substr(0, 2) === "0.";) n = n.charAt(0) + n.substr(2, i) + "." + n.substr(2 + i), n = n.replace(/^0+([1-9])/, "$1").replace(/^0+\./, "0.");
			n = n.replace(/\+-/, "-");
		}
		n = n.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(e, t, n, r) {
			return t + n + r.substr(0, (i + a) % i) + "." + r.substr(a) + "E";
		});
	} else n = t.toExponential(r);
	return e.match(/E\+00$/) && n.match(/e[+-]\d$/) && (n = n.substr(0, n.length - 1) + "0" + n.charAt(n.length - 1)), e.match(/E\-/) && n.match(/e\+/) && (n = n.replace(/e\+/, "e")), n.replace("e", "E");
}
var Te = /# (\?+)( ?)\/( ?)(\d+)/;
function Ee(e, t, n) {
	var r = parseInt(e[4], 10), i = Math.round(t * r), a = Math.floor(i / r), o = i - a * r, s = r;
	return n + (a === 0 ? "" : "" + a) + " " + (o === 0 ? xt(" ", e[1].length + 1 + e[4].length) : V(o, e[1].length) + e[2] + "/" + e[3] + B(s, e[4].length));
}
function De(e, t, n) {
	return n + (t === 0 ? "" : "" + t) + xt(" ", e[1].length + 2 + e[4].length);
}
var q = /^#*0*\.([0#]+)/, Oe = /\)[^)]*[0#]/, ke = /\(###\) ###\\?-####/;
function Ae(e) {
	for (var t = "", n, r = 0; r != e.length; ++r) switch (n = e.charCodeAt(r)) {
		case 35: break;
		case 63:
			t += " ";
			break;
		case 48:
			t += "0";
			break;
		default: t += String.fromCharCode(n);
	}
	return t;
}
function je(e, t) {
	var n = e < 0 ? -1 : 1, r = 10 ** t;
	return "" + n * (Math.round(n * e * r) / r);
}
function Me(e, t) {
	var n = e - Math.floor(e), r = 10 ** t;
	return t < ("" + Math.round(n * r)).length ? 0 : Math.round(n * r);
}
function Ne(e, t) {
	return +(t < ("" + Math.round((e - Math.floor(e)) * 10 ** t)).length);
}
function Pe(e) {
	return e < 2147483647 && e > -2147483648 ? "" + (e >= 0 ? e | 0 : e - 1 | 0) : "" + Math.floor(e);
}
function Fe(e, t, n) {
	if (e.charCodeAt(0) === 40 && !t.match(Oe)) {
		var r = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
		return n >= 0 ? Fe("n", r, n) : "(" + Fe("n", r, -n) + ")";
	}
	if (t.charCodeAt(t.length - 1) === 44) return Ce(e, t, n);
	if (t.indexOf("%") !== -1) return Se(e, t, n);
	if (t.indexOf("E") !== -1) return we(t, n);
	if (t.charCodeAt(0) === 36) return "$" + Fe(e, t.substr(t.charAt(1) == " " ? 2 : 1), n);
	var i, a, o, s, c = Math.abs(n), l = n < 0 ? "-" : "";
	if (t.match(/^00+$/)) return l + ie(c, t.length);
	if (t.match(/^[#?]+$/)) return i = ie(n, 0), i === "0" && (i = ""), i.length > t.length ? i : Ae(t.substr(0, t.length - i.length)) + i;
	if (a = t.match(Te)) return Ee(a, c, l);
	if (t.match(/^#+0+$/)) return l + ie(c, t.length - t.indexOf("0"));
	if (a = t.match(q)) return i = je(n, a[1].length).replace(/^([^\.]+)$/, "$1." + Ae(a[1])).replace(/\.$/, "." + Ae(a[1])).replace(/\.(\d*)$/, function(e, t) {
		return "." + t + xt("0", Ae(a[1]).length - t.length);
	}), t.indexOf("0.") === -1 ? i.replace(/^0\./, ".") : i;
	if (t = t.replace(/^#+([0.])/, "$1"), a = t.match(/^(0*)\.(#*)$/)) return l + je(c, a[2].length).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, a[1].length ? "0." : ".");
	if (a = t.match(/^#{1,3},##0(\.?)$/)) return l + be(ie(c, 0));
	if (a = t.match(/^#,##0\.([#0]*0)$/)) return n < 0 ? "-" + Fe(e, t, -n) : be("" + (Math.floor(n) + Ne(n, a[1].length))) + "." + B(Me(n, a[1].length), a[1].length);
	if (a = t.match(/^#,#*,#0/)) return Fe(e, t.replace(/^#,#*,/, ""), n);
	if (a = t.match(/^([0#]+)(\\?-([0#]+))+$/)) return i = z(Fe(e, t.replace(/[\\-]/g, ""), n)), o = 0, z(z(t.replace(/\\/g, "")).replace(/[0#]/g, function(e) {
		return o < i.length ? i.charAt(o++) : e === "0" ? "0" : "";
	}));
	if (t.match(ke)) return i = Fe(e, "##########", n), "(" + i.substr(0, 3) + ") " + i.substr(3, 3) + "-" + i.substr(6);
	var u = "";
	if (a = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/)) return o = Math.min(a[4].length, 7), s = le(c, 10 ** o - 1, !1), i = "" + l, u = Be("n", a[1], s[1]), u.charAt(u.length - 1) == " " && (u = u.substr(0, u.length - 1) + "0"), i += u + a[2] + "/" + a[3], u = H(s[2], o), u.length < a[4].length && (u = Ae(a[4].substr(a[4].length - u.length)) + u), i += u, i;
	if (a = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/)) return o = Math.min(Math.max(a[1].length, a[4].length), 7), s = le(c, 10 ** o - 1, !0), l + (s[0] || (s[1] ? "" : "0")) + " " + (s[1] ? V(s[1], o) + a[2] + "/" + a[3] + H(s[2], o) : xt(" ", 2 * o + 1 + a[2].length + a[3].length));
	if (a = t.match(/^[#0?]+$/)) return i = ie(n, 0), t.length <= i.length ? i : Ae(t.substr(0, t.length - i.length)) + i;
	if (a = t.match(/^([#0?]+)\.([#0]+)$/)) {
		i = "" + n.toFixed(Math.min(a[2].length, 10)).replace(/([^0])0+$/, "$1"), o = i.indexOf(".");
		var d = t.indexOf(".") - o, f = t.length - i.length - d;
		return Ae(t.substr(0, d) + i + t.substr(t.length - f));
	}
	if (a = t.match(/^00,000\.([#0]*0)$/)) return o = Me(n, a[1].length), n < 0 ? "-" + Fe(e, t, -n) : be(Pe(n)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(e) {
		return "00," + (e.length < 3 ? B(0, 3 - e.length) : "") + e;
	}) + "." + B(o, a[1].length);
	switch (t) {
		case "###,##0.00": return Fe(e, "#,##0.00", n);
		case "###,###":
		case "##,###":
		case "#,###":
			var p = be(ie(c, 0));
			return p === "0" ? "" : l + p;
		case "###,###.00": return Fe(e, "###,##0.00", n).replace(/^0\./, ".");
		case "#,###.00": return Fe(e, "#,##0.00", n).replace(/^0\./, ".");
	}
	throw Error("unsupported format |" + t + "|");
}
function Ie(e, t, n) {
	for (var r = t.length - 1; t.charCodeAt(r - 1) === 44;) --r;
	return Be(e, t.substr(0, r), n / 10 ** (3 * (t.length - r)));
}
function Le(e, t, n) {
	var r = t.replace(xe, ""), i = t.length - r.length;
	return Be(e, r, n * 10 ** (2 * i)) + xt("%", i);
}
function Re(e, t) {
	var n, r = e.indexOf("E") - e.indexOf(".") - 1;
	if (e.match(/^#+0.0E\+0$/)) {
		if (t == 0) return "0.0E+0";
		if (t < 0) return "-" + Re(e, -t);
		var i = e.indexOf(".");
		i === -1 && (i = e.indexOf("E"));
		var a = Math.floor(Math.log(t) * Math.LOG10E) % i;
		if (a < 0 && (a += i), n = (t / 10 ** a).toPrecision(r + 1 + (i + a) % i), !n.match(/[Ee]/)) {
			var o = Math.floor(Math.log(t) * Math.LOG10E);
			n.indexOf(".") === -1 ? n = n.charAt(0) + "." + n.substr(1) + "E+" + (o - n.length + a) : n += "E+" + (o - a), n = n.replace(/\+-/, "-");
		}
		n = n.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(e, t, n, r) {
			return t + n + r.substr(0, (i + a) % i) + "." + r.substr(a) + "E";
		});
	} else n = t.toExponential(r);
	return e.match(/E\+00$/) && n.match(/e[+-]\d$/) && (n = n.substr(0, n.length - 1) + "0" + n.charAt(n.length - 1)), e.match(/E\-/) && n.match(/e\+/) && (n = n.replace(/e\+/, "e")), n.replace("e", "E");
}
function ze(e, t, n) {
	if (e.charCodeAt(0) === 40 && !t.match(Oe)) {
		var r = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
		return n >= 0 ? ze("n", r, n) : "(" + ze("n", r, -n) + ")";
	}
	if (t.charCodeAt(t.length - 1) === 44) return Ie(e, t, n);
	if (t.indexOf("%") !== -1) return Le(e, t, n);
	if (t.indexOf("E") !== -1) return Re(t, n);
	if (t.charCodeAt(0) === 36) return "$" + ze(e, t.substr(t.charAt(1) == " " ? 2 : 1), n);
	var i, a, o, s, c = Math.abs(n), l = n < 0 ? "-" : "";
	if (t.match(/^00+$/)) return l + B(c, t.length);
	if (t.match(/^[#?]+$/)) return i = "" + n, n === 0 && (i = ""), i.length > t.length ? i : Ae(t.substr(0, t.length - i.length)) + i;
	if (a = t.match(Te)) return De(a, c, l);
	if (t.match(/^#+0+$/)) return l + B(c, t.length - t.indexOf("0"));
	if (a = t.match(q)) return i = ("" + n).replace(/^([^\.]+)$/, "$1." + Ae(a[1])).replace(/\.$/, "." + Ae(a[1])), i = i.replace(/\.(\d*)$/, function(e, t) {
		return "." + t + xt("0", Ae(a[1]).length - t.length);
	}), t.indexOf("0.") === -1 ? i.replace(/^0\./, ".") : i;
	if (t = t.replace(/^#+([0.])/, "$1"), a = t.match(/^(0*)\.(#*)$/)) return l + ("" + c).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, a[1].length ? "0." : ".");
	if (a = t.match(/^#{1,3},##0(\.?)$/)) return l + be("" + c);
	if (a = t.match(/^#,##0\.([#0]*0)$/)) return n < 0 ? "-" + ze(e, t, -n) : be("" + n) + "." + xt("0", a[1].length);
	if (a = t.match(/^#,#*,#0/)) return ze(e, t.replace(/^#,#*,/, ""), n);
	if (a = t.match(/^([0#]+)(\\?-([0#]+))+$/)) return i = z(ze(e, t.replace(/[\\-]/g, ""), n)), o = 0, z(z(t.replace(/\\/g, "")).replace(/[0#]/g, function(e) {
		return o < i.length ? i.charAt(o++) : e === "0" ? "0" : "";
	}));
	if (t.match(ke)) return i = ze(e, "##########", n), "(" + i.substr(0, 3) + ") " + i.substr(3, 3) + "-" + i.substr(6);
	var u = "";
	if (a = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/)) return o = Math.min(a[4].length, 7), s = le(c, 10 ** o - 1, !1), i = "" + l, u = Be("n", a[1], s[1]), u.charAt(u.length - 1) == " " && (u = u.substr(0, u.length - 1) + "0"), i += u + a[2] + "/" + a[3], u = H(s[2], o), u.length < a[4].length && (u = Ae(a[4].substr(a[4].length - u.length)) + u), i += u, i;
	if (a = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/)) return o = Math.min(Math.max(a[1].length, a[4].length), 7), s = le(c, 10 ** o - 1, !0), l + (s[0] || (s[1] ? "" : "0")) + " " + (s[1] ? V(s[1], o) + a[2] + "/" + a[3] + H(s[2], o) : xt(" ", 2 * o + 1 + a[2].length + a[3].length));
	if (a = t.match(/^[#0?]+$/)) return i = "" + n, t.length <= i.length ? i : Ae(t.substr(0, t.length - i.length)) + i;
	if (a = t.match(/^([#0]+)\.([#0]+)$/)) {
		i = "" + n.toFixed(Math.min(a[2].length, 10)).replace(/([^0])0+$/, "$1"), o = i.indexOf(".");
		var d = t.indexOf(".") - o, f = t.length - i.length - d;
		return Ae(t.substr(0, d) + i + t.substr(t.length - f));
	}
	if (a = t.match(/^00,000\.([#0]*0)$/)) return n < 0 ? "-" + ze(e, t, -n) : be("" + n).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(e) {
		return "00," + (e.length < 3 ? B(0, 3 - e.length) : "") + e;
	}) + "." + B(0, a[1].length);
	switch (t) {
		case "###,###":
		case "##,###":
		case "#,###":
			var p = be("" + c);
			return p === "0" ? "" : l + p;
		default: if (t.match(/\.[0#?]*$/)) return ze(e, t.slice(0, t.lastIndexOf(".")), n) + Ae(t.slice(t.lastIndexOf(".")));
	}
	throw Error("unsupported format |" + t + "|");
}
function Be(e, t, n) {
	return (n | 0) === n ? ze(e, t, n) : Fe(e, t, n);
}
function Ve(e) {
	for (var t = [], n = !1, r = 0, i = 0; r < e.length; ++r) switch (e.charCodeAt(r)) {
		case 34:
			n = !n;
			break;
		case 95:
		case 42:
		case 92:
			++r;
			break;
		case 59: t[t.length] = e.substr(i, r - i), i = r + 1;
	}
	if (t[t.length] = e.substr(i), n === !0) throw Error("Format |" + e + "| unterminated string ");
	return t;
}
var He = /\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;
function Ue(e) {
	for (var t = 0, n = "", r = ""; t < e.length;) switch (n = e.charAt(t)) {
		case "G":
			ae(e, t) && (t += 6), t++;
			break;
		case "\"":
			for (; e.charCodeAt(++t) !== 34 && t < e.length;);
			++t;
			break;
		case "\\":
			t += 2;
			break;
		case "_":
			t += 2;
			break;
		case "@":
			++t;
			break;
		case "B":
		case "b": if (e.charAt(t + 1) === "1" || e.charAt(t + 1) === "2") return !0;
		case "M":
		case "D":
		case "Y":
		case "H":
		case "S":
		case "E":
		case "m":
		case "d":
		case "y":
		case "h":
		case "s":
		case "e":
		case "g": return !0;
		case "A":
		case "a":
		case "上":
			if (e.substr(t, 3).toUpperCase() === "A/P" || e.substr(t, 5).toUpperCase() === "AM/PM" || e.substr(t, 5).toUpperCase() === "上午/下午") return !0;
			++t;
			break;
		case "[":
			for (r = n; e.charAt(t++) !== "]" && t < e.length;) r += e.charAt(t);
			if (r.match(He)) return !0;
			break;
		case ".":
		case "0":
		case "#":
			for (; t < e.length && ("0#?.,E+-%".indexOf(n = e.charAt(++t)) > -1 || n == "\\" && e.charAt(t + 1) == "-" && "0#".indexOf(e.charAt(t + 2)) > -1););
			break;
		case "?":
			for (; e.charAt(++t) === n;);
			break;
		case "*":
			++t, (e.charAt(t) == " " || e.charAt(t) == "*") && ++t;
			break;
		case "(":
		case ")":
			++t;
			break;
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
			for (; t < e.length && "0123456789".indexOf(e.charAt(++t)) > -1;);
			break;
		case " ":
			++t;
			break;
		default: ++t;
	}
	return !1;
}
function We(e, t, n, r) {
	for (var i = [], a = "", o = 0, s = "", c = "t", l, u, d, f = "H"; o < e.length;) switch (s = e.charAt(o)) {
		case "G":
			if (!ae(e, o)) throw Error("unrecognized character " + s + " in " + e);
			i[i.length] = {
				t: "G",
				v: "General"
			}, o += 7;
			break;
		case "\"":
			for (a = ""; (d = e.charCodeAt(++o)) !== 34 && o < e.length;) a += String.fromCharCode(d);
			i[i.length] = {
				t: "t",
				v: a
			}, ++o;
			break;
		case "\\":
			var p = e.charAt(++o), m = p === "(" || p === ")" ? p : "t";
			i[i.length] = {
				t: m,
				v: p
			}, ++o;
			break;
		case "_":
			i[i.length] = {
				t: "t",
				v: " "
			}, o += 2;
			break;
		case "@":
			i[i.length] = {
				t: "T",
				v: t
			}, ++o;
			break;
		case "B":
		case "b": if (e.charAt(o + 1) === "1" || e.charAt(o + 1) === "2") {
			if (l == null && (l = de(t, n, e.charAt(o + 1) === "2"), l == null)) return "";
			i[i.length] = {
				t: "X",
				v: e.substr(o, 2)
			}, c = s, o += 2;
			break;
		}
		case "M":
		case "D":
		case "Y":
		case "H":
		case "S":
		case "E": s = s.toLowerCase();
		case "m":
		case "d":
		case "y":
		case "h":
		case "s":
		case "e":
		case "g":
			if (t < 0 || l == null && (l = de(t, n), l == null)) return "";
			for (a = s; ++o < e.length && e.charAt(o).toLowerCase() === s;) a += s;
			s === "m" && c.toLowerCase() === "h" && (s = "M"), s === "h" && (s = f), i[i.length] = {
				t: s,
				v: a
			}, c = s;
			break;
		case "A":
		case "a":
		case "上":
			var h = {
				t: s,
				v: s
			};
			if (l ??= de(t, n), e.substr(o, 3).toUpperCase() === "A/P" ? (l != null && (h.v = l.H >= 12 ? e.charAt(o + 2) : s), h.t = "T", f = "h", o += 3) : e.substr(o, 5).toUpperCase() === "AM/PM" ? (l != null && (h.v = l.H >= 12 ? "PM" : "AM"), h.t = "T", o += 5, f = "h") : e.substr(o, 5).toUpperCase() === "上午/下午" ? (l != null && (h.v = l.H >= 12 ? "下午" : "上午"), h.t = "T", o += 5, f = "h") : (h.t = "t", ++o), l == null && h.t === "T") return "";
			i[i.length] = h, c = s;
			break;
		case "[":
			for (a = s; e.charAt(o++) !== "]" && o < e.length;) a += e.charAt(o);
			if (a.slice(-1) !== "]") throw "unterminated \"[\" block: |" + a + "|";
			if (a.match(He)) {
				if (l == null && (l = de(t, n), l == null)) return "";
				i[i.length] = {
					t: "Z",
					v: a.toLowerCase()
				}, c = a.charAt(1);
			} else a.indexOf("$") > -1 && (a = (a.match(/\$([^-\[\]]*)/) || [])[1] || "$", Ue(e) || (i[i.length] = {
				t: "t",
				v: a
			}));
			break;
		case ".": if (l != null) {
			for (a = s; ++o < e.length && (s = e.charAt(o)) === "0";) a += s;
			i[i.length] = {
				t: "s",
				v: a
			};
			break;
		}
		case "0":
		case "#":
			for (a = s; ++o < e.length && "0#?.,E+-%".indexOf(s = e.charAt(o)) > -1;) a += s;
			i[i.length] = {
				t: "n",
				v: a
			};
			break;
		case "?":
			for (a = s; e.charAt(++o) === s;) a += s;
			i[i.length] = {
				t: s,
				v: a
			}, c = s;
			break;
		case "*":
			++o, (e.charAt(o) == " " || e.charAt(o) == "*") && ++o;
			break;
		case "(":
		case ")":
			i[i.length] = {
				t: r === 1 ? "t" : s,
				v: s
			}, ++o;
			break;
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
			for (a = s; o < e.length && "0123456789".indexOf(e.charAt(++o)) > -1;) a += e.charAt(o);
			i[i.length] = {
				t: "D",
				v: a
			};
			break;
		case " ":
			i[i.length] = {
				t: s,
				v: s
			}, ++o;
			break;
		case "$":
			i[i.length] = {
				t: "t",
				v: "$"
			}, ++o;
			break;
		default:
			if (",$-+/():!^&'~{}<>=€acfijklopqrtuvwxzP".indexOf(s) === -1) throw Error("unrecognized character " + s + " in " + e);
			i[i.length] = {
				t: "t",
				v: s
			}, ++o;
	}
	var g = 0, _ = 0, v;
	for (o = i.length - 1, c = "t"; o >= 0; --o) switch (i[o].t) {
		case "h":
		case "H":
			i[o].t = f, c = "h", g < 1 && (g = 1);
			break;
		case "s": (v = i[o].v.match(/\.0+$/)) && (_ = Math.max(_, v[0].length - 1), g = 4), g < 3 && (g = 3);
		case "d":
		case "y":
		case "e":
			c = i[o].t;
			break;
		case "M":
			c = i[o].t, g < 2 && (g = 2);
			break;
		case "m":
			c === "s" && (i[o].t = "M", g < 2 && (g = 2));
			break;
		case "X": break;
		case "Z": g < 1 && i[o].v.match(/[Hh]/) && (g = 1), g < 2 && i[o].v.match(/[Mm]/) && (g = 2), g < 3 && i[o].v.match(/[Ss]/) && (g = 3);
	}
	var y;
	switch (g) {
		case 0: break;
		case 1:
		case 2:
		case 3:
			l.u >= .5 && (l.u = 0, ++l.S), l.S >= 60 && (l.S = 0, ++l.M), l.M >= 60 && (l.M = 0, ++l.H), l.H >= 24 && (l.H = 0, ++l.D, y = de(l.D), y.u = l.u, y.S = l.S, y.M = l.M, y.H = l.H, l = y);
			break;
		case 4:
			switch (_) {
				case 1:
					l.u = Math.round(l.u * 10) / 10;
					break;
				case 2:
					l.u = Math.round(l.u * 100) / 100;
					break;
				case 3: l.u = Math.round(l.u * 1e3) / 1e3;
			}
			l.u >= 1 && (l.u = 0, ++l.S), l.S >= 60 && (l.S = 0, ++l.M), l.M >= 60 && (l.M = 0, ++l.H), l.H >= 24 && (l.H = 0, ++l.D, y = de(l.D), y.u = l.u, y.S = l.S, y.M = l.M, y.H = l.H, l = y);
	}
	var b = "", x;
	for (o = 0; o < i.length; ++o) switch (i[o].t) {
		case "t":
		case "T":
		case " ":
		case "D": break;
		case "X":
			i[o].v = "", i[o].t = ";";
			break;
		case "d":
		case "m":
		case "y":
		case "h":
		case "H":
		case "M":
		case "s":
		case "e":
		case "b":
		case "Z":
			i[o].v = ye(i[o].t.charCodeAt(0), i[o].v, l, _), i[o].t = "t";
			break;
		case "n":
		case "?":
			for (x = o + 1; i[x] != null && ((s = i[x].t) === "?" || s === "D" || (s === " " || s === "t") && i[x + 1] != null && (i[x + 1].t === "?" || i[x + 1].t === "t" && i[x + 1].v === "/") || i[o].t === "(" && (s === " " || s === "n" || s === ")") || s === "t" && (i[x].v === "/" || i[x].v === " " && i[x + 1] != null && i[x + 1].t == "?"));) i[o].v += i[x].v, i[x] = {
				v: "",
				t: ";"
			}, ++x;
			b += i[o].v, o = x - 1;
			break;
		case "G": i[o].t = "t", i[o].v = _e(t, n);
	}
	var S = "", C, w;
	if (b.length > 0) {
		b.charCodeAt(0) == 40 ? (C = t < 0 && b.charCodeAt(0) === 45 ? -t : t, w = Be("n", b, C)) : (C = t < 0 && r > 1 ? -t : t, w = Be("n", b, C), C < 0 && i[0] && i[0].t == "t" && (w = w.substr(1), i[0].v = "-" + i[0].v)), x = w.length - 1;
		var T = i.length;
		for (o = 0; o < i.length; ++o) if (i[o] != null && i[o].t != "t" && i[o].v.indexOf(".") > -1) {
			T = o;
			break;
		}
		var E = i.length;
		if (T === i.length && w.indexOf("E") === -1) {
			for (o = i.length - 1; o >= 0; --o) i[o] != null && "n?".indexOf(i[o].t) !== -1 && (x >= i[o].v.length - 1 ? (x -= i[o].v.length, i[o].v = w.substr(x + 1, i[o].v.length)) : x < 0 ? i[o].v = "" : (i[o].v = w.substr(0, x + 1), x = -1), i[o].t = "t", E = o);
			x >= 0 && E < i.length && (i[E].v = w.substr(0, x + 1) + i[E].v);
		} else if (T !== i.length && w.indexOf("E") === -1) {
			for (x = w.indexOf(".") - 1, o = T; o >= 0; --o) if (i[o] != null && "n?".indexOf(i[o].t) !== -1) {
				for (u = i[o].v.indexOf(".") > -1 && o === T ? i[o].v.indexOf(".") - 1 : i[o].v.length - 1, S = i[o].v.substr(u + 1); u >= 0; --u) x >= 0 && (i[o].v.charAt(u) === "0" || i[o].v.charAt(u) === "#") && (S = w.charAt(x--) + S);
				i[o].v = S, i[o].t = "t", E = o;
			}
			for (x >= 0 && E < i.length && (i[E].v = w.substr(0, x + 1) + i[E].v), x = w.indexOf(".") + 1, o = T; o < i.length; ++o) if (!(i[o] == null || "n?(".indexOf(i[o].t) === -1 && o !== T)) {
				for (u = i[o].v.indexOf(".") > -1 && o === T ? i[o].v.indexOf(".") + 1 : 0, S = i[o].v.substr(0, u); u < i[o].v.length; ++u) x < w.length && (S += w.charAt(x++));
				i[o].v = S, i[o].t = "t", E = o;
			}
		}
	}
	for (o = 0; o < i.length; ++o) i[o] != null && "n?".indexOf(i[o].t) > -1 && (C = r > 1 && t < 0 && o > 0 && i[o - 1].v === "-" ? -t : t, i[o].v = Be(i[o].t, i[o].v, C), i[o].t = "t");
	var D = "";
	for (o = 0; o !== i.length; ++o) i[o] != null && (D += i[o].v);
	return D;
}
var Ge = /\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;
function Ke(e, t) {
	if (t == null) return !1;
	var n = parseFloat(t[2]);
	switch (t[1]) {
		case "=":
			if (e == n) return !0;
			break;
		case ">":
			if (e > n) return !0;
			break;
		case "<":
			if (e < n) return !0;
			break;
		case "<>":
			if (e != n) return !0;
			break;
		case ">=":
			if (e >= n) return !0;
			break;
		case "<=": if (e <= n) return !0;
	}
	return !1;
}
function qe(e, t) {
	var n = Ve(e), r = n.length, i = n[r - 1].indexOf("@");
	if (r < 4 && i > -1 && --r, n.length > 4) throw Error("cannot find right format for |" + n.join("|") + "|");
	if (typeof t != "number") return [4, n.length === 4 || i > -1 ? n[n.length - 1] : "@"];
	switch (typeof t == "number" && !isFinite(t) && (t = 0), n.length) {
		case 1:
			n = i > -1 ? [
				"General",
				"General",
				"General",
				n[0]
			] : [
				n[0],
				n[0],
				n[0],
				"@"
			];
			break;
		case 2:
			n = i > -1 ? [
				n[0],
				n[0],
				n[0],
				n[1]
			] : [
				n[0],
				n[1],
				n[0],
				"@"
			];
			break;
		case 3: n = i > -1 ? [
			n[0],
			n[1],
			n[0],
			n[2]
		] : [
			n[0],
			n[1],
			n[2],
			"@"
		];
	}
	var a = t > 0 ? n[0] : t < 0 ? n[1] : n[2];
	if (n[0].indexOf("[") === -1 && n[1].indexOf("[") === -1) return [r, a];
	if (n[0].match(/\[[=<>]/) != null || n[1].match(/\[[=<>]/) != null) {
		var o = n[0].match(Ge), s = n[1].match(Ge);
		return Ke(t, o) ? [r, n[0]] : Ke(t, s) ? [r, n[1]] : [r, n[o != null && s != null ? 2 : 1]];
	}
	return [r, a];
}
function Je(e, t, n) {
	n ??= {};
	var r = "";
	switch (typeof e) {
		case "string":
			r = e == "m/d/yy" && n.dateNF ? n.dateNF : e;
			break;
		case "number": r = e == 14 && n.dateNF ? n.dateNF : (n.table == null ? W : n.table)[e], r ??= n.table && n.table[G[e]] || W[G[e]], r ??= K[e] || "General";
	}
	if (ae(r, 0)) return _e(t, n);
	t instanceof Date && (t = ft(t, n.date1904));
	var i = qe(r, t);
	if (ae(i[1])) return _e(t, n);
	if (t === !0) t = "TRUE";
	else if (t === !1) t = "FALSE";
	else if (t === "" || t == null) return "";
	else if (isNaN(t) && i[1].indexOf("0") > -1) return "#NUM!";
	else if (!isFinite(t) && i[1].indexOf("0") > -1) return "#DIV/0!";
	return We(i[1], t, n, i[0]);
}
function Ye(e, t) {
	if (typeof t != "number") {
		t = +t || -1;
		for (var n = 0; n < 392; ++n) if (W[n] == null) t < 0 && (t = n);
		else if (W[n] == e) {
			t = n;
			break;
		}
		t < 0 && (t = 391);
	}
	return W[t] = e, t;
}
function Xe() {
	W = ce();
}
var Ze = {
	5: "\"$\"#,##0_);\\(\"$\"#,##0\\)",
	6: "\"$\"#,##0_);[Red]\\(\"$\"#,##0\\)",
	7: "\"$\"#,##0.00_);\\(\"$\"#,##0.00\\)",
	8: "\"$\"#,##0.00_);[Red]\\(\"$\"#,##0.00\\)",
	23: "General",
	24: "General",
	25: "General",
	26: "General",
	27: "m/d/yy",
	28: "m/d/yy",
	29: "m/d/yy",
	30: "m/d/yy",
	31: "m/d/yy",
	32: "h:mm:ss",
	33: "h:mm:ss",
	34: "h:mm:ss",
	35: "h:mm:ss",
	36: "m/d/yy",
	41: "_(* #,##0_);_(* (#,##0);_(* \"-\"_);_(@_)",
	42: "_(\"$\"* #,##0_);_(\"$\"* (#,##0);_(\"$\"* \"-\"_);_(@_)",
	43: "_(* #,##0.00_);_(* (#,##0.00);_(* \"-\"??_);_(@_)",
	44: "_(\"$\"* #,##0.00_);_(\"$\"* (#,##0.00);_(\"$\"* \"-\"??_);_(@_)",
	50: "m/d/yy",
	51: "m/d/yy",
	52: "m/d/yy",
	53: "m/d/yy",
	54: "m/d/yy",
	55: "m/d/yy",
	56: "m/d/yy",
	57: "m/d/yy",
	58: "m/d/yy",
	59: "0",
	60: "0.00",
	61: "#,##0",
	62: "#,##0.00",
	63: "\"$\"#,##0_);\\(\"$\"#,##0\\)",
	64: "\"$\"#,##0_);[Red]\\(\"$\"#,##0\\)",
	65: "\"$\"#,##0.00_);\\(\"$\"#,##0.00\\)",
	66: "\"$\"#,##0.00_);[Red]\\(\"$\"#,##0.00\\)",
	67: "0%",
	68: "0.00%",
	69: "# ?/?",
	70: "# ??/??",
	71: "m/d/yy",
	72: "m/d/yy",
	73: "d-mmm-yy",
	74: "d-mmm",
	75: "mmm-yy",
	76: "h:mm",
	77: "h:mm:ss",
	78: "m/d/yy h:mm",
	79: "mm:ss",
	80: "[h]:mm:ss",
	81: "mmss.0"
}, Qe = /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;
function $e(e) {
	var t = typeof e == "number" ? W[e] : e;
	return t = t.replace(Qe, "(\\d+)"), Qe.lastIndex = 0, RegExp("^" + t + "$");
}
function et(e, t, n) {
	var r = -1, i = -1, a = -1, o = -1, s = -1, c = -1;
	(t.match(Qe) || []).forEach(function(e, t) {
		var l = parseInt(n[t + 1], 10);
		switch (e.toLowerCase().charAt(0)) {
			case "y":
				r = l;
				break;
			case "d":
				a = l;
				break;
			case "h":
				o = l;
				break;
			case "s":
				c = l;
				break;
			case "m": o >= 0 ? s = l : i = l;
		}
	}), Qe.lastIndex = 0, c >= 0 && s == -1 && i >= 0 && (s = i, i = -1);
	var l = ("" + (r >= 0 ? r : (/* @__PURE__ */ new Date()).getFullYear())).slice(-4) + "-" + ("00" + (i >= 1 ? i : 1)).slice(-2) + "-" + ("00" + (a >= 1 ? a : 1)).slice(-2);
	l.length == 7 && (l = "0" + l), l.length == 8 && (l = "20" + l);
	var u = ("00" + (o >= 0 ? o : 0)).slice(-2) + ":" + ("00" + (s >= 0 ? s : 0)).slice(-2) + ":" + ("00" + (c >= 0 ? c : 0)).slice(-2);
	return o == -1 && s == -1 && c == -1 ? l : r == -1 && i == -1 && a == -1 ? u : l + "T" + u;
}
var tt = { "d.m": "d\\.m" };
function nt(e, t) {
	return Ye(tt[e] || e, t);
}
var rt = /*#__PURE__*/ (function() {
	var e = {};
	e.version = "1.2.0";
	function t() {
		for (var e = 0, t = Array(256), n = 0; n != 256; ++n) e = n, e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1, e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1, e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1, e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1, e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1, e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1, e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1, e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1, t[n] = e;
		return typeof Int32Array < "u" ? new Int32Array(t) : t;
	}
	var n = t();
	function r(e) {
		var t = 0, n = 0, r = 0, i = typeof Int32Array < "u" ? /* @__PURE__ */ new Int32Array(4096) : Array(4096);
		for (r = 0; r != 256; ++r) i[r] = e[r];
		for (r = 0; r != 256; ++r) for (n = e[r], t = 256 + r; t < 4096; t += 256) n = i[t] = n >>> 8 ^ e[n & 255];
		var a = [];
		for (r = 1; r != 16; ++r) a[r - 1] = typeof Int32Array < "u" && typeof i.subarray == "function" ? i.subarray(r * 256, r * 256 + 256) : i.slice(r * 256, r * 256 + 256);
		return a;
	}
	var i = r(n), a = i[0], o = i[1], s = i[2], c = i[3], l = i[4], u = i[5], d = i[6], f = i[7], p = i[8], m = i[9], h = i[10], g = i[11], _ = i[12], v = i[13], y = i[14];
	function b(e, t) {
		for (var r = t ^ -1, i = 0, a = e.length; i < a;) r = r >>> 8 ^ n[(r ^ e.charCodeAt(i++)) & 255];
		return ~r;
	}
	function x(e, t) {
		for (var r = t ^ -1, i = e.length - 15, b = 0; b < i;) r = y[e[b++] ^ r & 255] ^ v[e[b++] ^ r >> 8 & 255] ^ _[e[b++] ^ r >> 16 & 255] ^ g[e[b++] ^ r >>> 24] ^ h[e[b++]] ^ m[e[b++]] ^ p[e[b++]] ^ f[e[b++]] ^ d[e[b++]] ^ u[e[b++]] ^ l[e[b++]] ^ c[e[b++]] ^ s[e[b++]] ^ o[e[b++]] ^ a[e[b++]] ^ n[e[b++]];
		for (i += 15; b < i;) r = r >>> 8 ^ n[(r ^ e[b++]) & 255];
		return ~r;
	}
	function S(e, t) {
		for (var r = t ^ -1, i = 0, a = e.length, o = 0, s = 0; i < a;) o = e.charCodeAt(i++), o < 128 ? r = r >>> 8 ^ n[(r ^ o) & 255] : o < 2048 ? (r = r >>> 8 ^ n[(r ^ (192 | o >> 6 & 31)) & 255], r = r >>> 8 ^ n[(r ^ (128 | o & 63)) & 255]) : o >= 55296 && o < 57344 ? (o = (o & 1023) + 64, s = e.charCodeAt(i++) & 1023, r = r >>> 8 ^ n[(r ^ (240 | o >> 8 & 7)) & 255], r = r >>> 8 ^ n[(r ^ (128 | o >> 2 & 63)) & 255], r = r >>> 8 ^ n[(r ^ (128 | s >> 6 & 15 | (o & 3) << 4)) & 255], r = r >>> 8 ^ n[(r ^ (128 | s & 63)) & 255]) : (r = r >>> 8 ^ n[(r ^ (224 | o >> 12 & 15)) & 255], r = r >>> 8 ^ n[(r ^ (128 | o >> 6 & 63)) & 255], r = r >>> 8 ^ n[(r ^ (128 | o & 63)) & 255]);
		return ~r;
	}
	return e.table = n, e.bstr = b, e.buf = x, e.str = S, e;
})(), it = /*#__PURE__*/ (function() {
	var e = {};
	e.version = "1.2.2";
	function t(e, t) {
		for (var n = e.split("/"), r = t.split("/"), i = 0, a = 0, o = Math.min(n.length, r.length); i < o; ++i) {
			if (a = n[i].length - r[i].length) return a;
			if (n[i] != r[i]) return n[i] < r[i] ? -1 : 1;
		}
		return n.length - r.length;
	}
	function n(e) {
		if (e.charAt(e.length - 1) == "/") return e.slice(0, -1).indexOf("/") === -1 ? e : n(e.slice(0, -1));
		var t = e.lastIndexOf("/");
		return t === -1 ? e : e.slice(0, t + 1);
	}
	function r(e) {
		if (e.charAt(e.length - 1) == "/") return r(e.slice(0, -1));
		var t = e.lastIndexOf("/");
		return t === -1 ? e : e.slice(t + 1);
	}
	function i(e, t) {
		typeof t == "string" && (t = new Date(t));
		var n = t.getHours();
		n = n << 6 | t.getMinutes(), n = n << 5 | t.getSeconds() >>> 1, e.write_shift(2, n);
		var r = t.getFullYear() - 1980;
		r = r << 4 | t.getMonth() + 1, r = r << 5 | t.getDate(), e.write_shift(2, r);
	}
	function a(e) {
		var t = e.read_shift(2) & 65535, n = e.read_shift(2) & 65535, r = /* @__PURE__ */ new Date(), i = n & 31;
		n >>>= 5;
		var a = n & 15;
		n >>>= 4, r.setMilliseconds(0), r.setFullYear(n + 1980), r.setMonth(a - 1), r.setDate(i);
		var o = t & 31;
		t >>>= 5;
		var s = t & 63;
		return t >>>= 6, r.setHours(t), r.setMinutes(s), r.setSeconds(o << 1), r;
	}
	function o(e) {
		fr(e, 0);
		for (var t = {}, n = 0; e.l <= e.length - 4;) {
			var r = e.read_shift(2), i = e.read_shift(2), a = e.l + i, o = {};
			switch (r) {
				case 21589:
					n = e.read_shift(1), n & 1 && (o.mtime = e.read_shift(4)), i > 5 && (n & 2 && (o.atime = e.read_shift(4)), n & 4 && (o.ctime = e.read_shift(4))), o.mtime && (o.mt = /* @__PURE__ */ new Date(o.mtime * 1e3));
					break;
				case 1:
					var s = e.read_shift(4), c = e.read_shift(4);
					o.usz = c * 2 ** 32 + s, s = e.read_shift(4), c = e.read_shift(4), o.csz = c * 2 ** 32 + s;
			}
			e.l = a, t[r] = o;
		}
		return t;
	}
	var s;
	function c() {
		return s ||= at;
	}
	function l(e, t) {
		if (e[0] == 80 && e[1] == 75) return Le(e, t);
		if ((e[0] | 32) == 109 && (e[1] | 32) == 105) return Ke(e, t);
		if (e.length < 512) throw Error("CFB file size " + e.length + " < 512");
		var n = 3, r = 512, i = 0, a = 0, o = 0, s = 0, c = 0, l = [], m = e.slice(0, 512);
		fr(m, 0);
		var g = u(m);
		switch (n = g[0], n) {
			case 3:
				r = 512;
				break;
			case 4:
				r = 4096;
				break;
			case 0: if (g[1] == 0) return Le(e, t);
			default: throw Error("Major Version: Expected 3 or 4 saw " + n);
		}
		r !== 512 && (m = e.slice(0, r), fr(m, 28));
		var y = e.slice(0, r);
		d(m, n);
		var b = m.read_shift(4, "i");
		if (n === 3 && b !== 0) throw Error("# Directory Sectors: Expected 0 saw " + b);
		m.l += 4, o = m.read_shift(4, "i"), m.l += 4, m.chk("00100000", "Mini Stream Cutoff Size: "), s = m.read_shift(4, "i"), i = m.read_shift(4, "i"), c = m.read_shift(4, "i"), a = m.read_shift(4, "i");
		for (var x = -1, S = 0; S < 109 && (x = m.read_shift(4, "i"), !(x < 0)); ++S) l[S] = x;
		var C = f(e, r);
		h(c, a, C, r, l);
		var w = _(C, o, l, r);
		if (!w[o]) throw Error("CFB directory chain is missing");
		if (w[o].name = "!Directory", i > 0 && w[s] && (w[s].name = "!MiniFAT"), !w[l[0]]) throw Error("CFB FAT chain is missing");
		w[l[0]].name = "!FAT", w.fat_addrs = l, w.ssz = r;
		var T = {}, E = [], D = [], O = [];
		v(o, w, C, E, i, T, D, s), p(D, O, E), E.shift();
		var k = {
			FileIndex: D,
			FullPaths: O
		};
		return t && t.raw && (k.raw = {
			header: y,
			sectors: C
		}), k;
	}
	function u(e) {
		if (e[e.l] == 80 && e[e.l + 1] == 75) return [0, 0];
		e.chk(F, "Header Signature: "), e.l += 16;
		var t = e.read_shift(2, "u");
		return [e.read_shift(2, "u"), t];
	}
	function d(e, t) {
		var n = 9;
		switch (e.l += 2, n = e.read_shift(2)) {
			case 9:
				if (t != 3) throw Error("Sector Shift: Expected 9 saw " + n);
				break;
			case 12:
				if (t != 4) throw Error("Sector Shift: Expected 12 saw " + n);
				break;
			default: throw Error("Sector Shift: Expected 9 or 12 saw " + n);
		}
		e.chk("0600", "Mini Sector Shift: "), e.chk("000000000000", "Reserved: ");
	}
	function f(e, t) {
		for (var n = Math.ceil(e.length / t) - 1, r = [], i = 1; i < n; ++i) r[i - 1] = e.slice(i * t, (i + 1) * t);
		return r[n - 1] = e.slice(n * t), r;
	}
	function p(e, t, n) {
		for (var r = 0, i = 0, a = 0, o = 0, s = 0, c = n.length, l = [], u = []; r < c; ++r) l[r] = u[r] = r, t[r] = n[r];
		for (; s < u.length; ++s) r = u[s], i = e[r].L, a = e[r].R, o = e[r].C, l[r] === r && (i !== -1 && l[i] !== i && (l[r] = l[i]), a !== -1 && l[a] !== a && (l[r] = l[a])), o !== -1 && (l[o] = r), i !== -1 && r != l[r] && (l[i] = l[r], u.lastIndexOf(i) < s && u.push(i)), a !== -1 && r != l[r] && (l[a] = l[r], u.lastIndexOf(a) < s && u.push(a));
		for (r = 1; r < c; ++r) l[r] === r && (a !== -1 && l[a] !== a ? l[r] = l[a] : i !== -1 && l[i] !== i && (l[r] = l[i]));
		for (r = 1; r < c; ++r) if (e[r].type !== 0) {
			if (s = r, s != l[s]) do
				s = l[s], t[r] = t[s] + "/" + t[r];
			while (s !== 0 && l[s] !== -1 && s != l[s]);
			l[r] = -1;
		}
		for (t[0] += "/", r = 1; r < c; ++r) e[r].type !== 2 && (t[r] += "/");
	}
	function m(e, t, n) {
		for (var r = e.start, i = e.size, a = [], o = r; n && i > 0 && o >= 0;) a.push(t.slice(o * j, o * j + j)), i -= j, o = ir(n, o * 4);
		return a.length === 0 ? mr(0) : I(a).slice(0, e.size);
	}
	function h(e, t, n, r, i) {
		var a = P;
		if (e === P) {
			if (t !== 0) throw Error("DIFAT chain shorter than expected");
		} else if (e !== -1) {
			var o = n[e], s = (r >>> 2) - 1;
			if (!o) return;
			for (var c = 0; c < s && (a = ir(o, c * 4)) !== P; ++c) i.push(a);
			t >= 1 && h(ir(o, r - 4), t - 1, n, r, i);
		}
	}
	function g(e, t, n, r, i) {
		var a = [], o = [];
		i ||= [];
		var s = r - 1, c = 0, l = 0;
		for (c = t; c >= 0;) {
			i[c] = !0, a[a.length] = c, o.push(e[c]);
			var u = n[Math.floor(c * 4 / r)];
			if (l = c * 4 & s, r < 4 + l) throw Error("FAT boundary crossed: " + c + " 4 " + r);
			if (!e[u]) break;
			c = ir(e[u], l);
		}
		return {
			nodes: a,
			data: Pn([o])
		};
	}
	function _(e, t, n, r) {
		var i = e.length, a = [], o = [], s = [], c = [], l = r - 1, u = 0, d = 0, f = 0, p = 0;
		for (u = 0; u < i; ++u) if (s = [], f = u + t, f >= i && (f -= i), !o[f]) {
			c = [];
			var m = [];
			for (d = f; d >= 0;) {
				m[d] = !0, o[d] = !0, s[s.length] = d, c.push(e[d]);
				var h = n[Math.floor(d * 4 / r)];
				if (p = d * 4 & l, r < 4 + p) throw Error("FAT boundary crossed: " + d + " 4 " + r);
				if (!e[h] || (d = ir(e[h], p), m[d])) break;
			}
			a[f] = {
				nodes: s,
				data: Pn([c])
			};
		}
		return a;
	}
	function v(e, t, n, r, i, a, o, s) {
		for (var c = 0, l = r.length ? 2 : 0, u = t[e].data, d = 0, f = 0, p; d < u.length; d += 128) {
			var h = u.slice(d, d + 128);
			fr(h, 64), f = h.read_shift(2), p = In(h, 0, f - l), r.push(p);
			var _ = {
				name: p,
				type: h.read_shift(1),
				color: h.read_shift(1),
				L: h.read_shift(4, "i"),
				R: h.read_shift(4, "i"),
				C: h.read_shift(4, "i"),
				clsid: h.read_shift(16),
				state: h.read_shift(4, "i"),
				start: 0,
				size: 0
			};
			if (h.read_shift(2) + h.read_shift(2) + h.read_shift(2) + h.read_shift(2) !== 0 && (_.ct = y(h, h.l - 8)), h.read_shift(2) + h.read_shift(2) + h.read_shift(2) + h.read_shift(2) !== 0 && (_.mt = y(h, h.l - 8)), _.start = h.read_shift(4, "i"), _.size = h.read_shift(4, "i"), _.type === 0 && (_.size = 0, _.start = P), _.size < 0 && _.start < 0 && (_.size = _.type = 0, _.start = P, _.name = ""), _.type === 5) {
				if (c = _.size > 0 ? _.start : P, _.size > 0 && i > 0) {
					if (!t[c]) throw Error("CFB root mini stream is missing");
					t[c].name = "!StreamData";
				}
			} else if (_.size >= 4096) _.storage = "fat", t[_.start] === void 0 && (t[_.start] = g(n, _.start, t.fat_addrs, t.ssz)), t[_.start].name = _.name, _.content = t[_.start].data.slice(0, _.size);
			else if (_.storage = "minifat", _.size < 0) _.size = 0;
			else if (_.type === 2 && _.size > 0) {
				if (i < 1 || !t[s]) throw Error("CFB MiniFAT chain is missing for stream: " + _.name);
				if (!t[c]) throw Error("CFB root mini stream is missing");
				if (_.content = m(_, t[c].data, t[s].data), _.content.length !== _.size) throw Error("CFB mini stream is truncated: " + _.name);
			}
			_.content && fr(_.content, 0), a[p] = _, o.push(_);
		}
	}
	function y(e, t) {
		return /* @__PURE__ */ new Date((rr(e, t + 4) / 1e7 * 2 ** 32 + rr(e, t) / 1e7 - 11644473600) * 1e3);
	}
	function b(e, t) {
		return c(), l(s.readFileSync(e), t);
	}
	function x(e, t) {
		var n = t && t.type;
		switch (n || k && Buffer.isBuffer(e) && (n = "buffer"), n || "base64") {
			case "file": return b(e, t);
			case "base64": return l(N(O(e)), t);
			case "binary": return l(N(e), t);
		}
		return l(e, t);
	}
	function S(e, t) {
		var n = t || {}, r = n.root || "Root Entry";
		if (e.FullPaths ||= [], e.FileIndex ||= [], e.FullPaths.length !== e.FileIndex.length) throw Error("inconsistent CFB structure");
		e.FullPaths.length === 0 && (e.FullPaths[0] = r + "/", e.FileIndex[0] = {
			name: r,
			type: 5
		}), n.CLSID && (e.FileIndex[0].clsid = n.CLSID), C(e);
	}
	function C(e) {
		var t = "Sh33tJ5";
		if (!it.find(e, "/" + t)) {
			var n = mr(4);
			n[0] = 55, n[1] = n[3] = 50, n[2] = 54, e.FileIndex.push({
				name: t,
				type: 2,
				content: n,
				size: 4,
				L: 69,
				R: 69,
				C: 69
			}), e.FullPaths.push(e.FullPaths[0] + t), w(e);
		}
	}
	function w(e, i) {
		S(e);
		for (var a = !1, o = !1, s = e.FullPaths.length - 1; s >= 0; --s) {
			var c = e.FileIndex[s];
			switch (c.type) {
				case 0:
					o ? a = !0 : (e.FileIndex.pop(), e.FullPaths.pop());
					break;
				case 1:
				case 2:
				case 5:
					o = !0, isNaN(c.R * c.L * c.C) && (a = !0), c.R > -1 && c.L > -1 && c.R == c.L && (a = !0);
					break;
				default: a = !0;
			}
		}
		if (a || i) {
			var l = new Date(1987, 1, 19), u = 0, d = Object.create ? Object.create(null) : {}, f = [];
			for (s = 0; s < e.FullPaths.length; ++s) d[e.FullPaths[s]] = !0, e.FileIndex[s].type !== 0 && f.push([e.FullPaths[s], e.FileIndex[s]]);
			for (s = 0; s < f.length; ++s) {
				var p = n(f[s][0]);
				for (o = d[p]; !o;) {
					for (; n(p) && !d[n(p)];) p = n(p);
					f.push([p, {
						name: r(p).replace("/", ""),
						type: 1,
						clsid: z,
						ct: l,
						mt: l,
						content: null
					}]), d[p] = !0, p = n(f[s][0]), o = d[p];
				}
			}
			for (f.sort(function(e, n) {
				return t(e[0], n[0]);
			}), e.FullPaths = [], e.FileIndex = [], s = 0; s < f.length; ++s) e.FullPaths[s] = f[s][0], e.FileIndex[s] = f[s][1];
			for (s = 0; s < f.length; ++s) {
				var m = e.FileIndex[s], h = e.FullPaths[s];
				if (m.name = r(h).replace("/", ""), m.L = m.R = m.C = -(m.color = 1), m.size = m.content ? m.content.length : 0, m.start = 0, m.clsid = m.clsid || z, s === 0) m.C = f.length > 1 ? 1 : -1, m.size = 0, m.type = 5;
				else if (h.slice(-1) == "/") {
					for (u = s + 1; u < f.length && n(e.FullPaths[u]) != h; ++u);
					for (m.C = u >= f.length ? -1 : u, u = s + 1; u < f.length && n(e.FullPaths[u]) != n(h); ++u);
					m.R = u >= f.length ? -1 : u, m.type = 1;
				} else n(e.FullPaths[s + 1] || "") == n(h) && (m.R = s + 1), m.type = 2;
			}
		}
	}
	function T(e, t) {
		var n = t || {};
		if (n.fileType == "mad") return qe(e, n);
		if (w(e), n.fileType === "zip") return ze(e, n);
		var r = (function(e) {
			for (var t = 0, n = 0, r = 0; r < e.FileIndex.length; ++r) {
				var i = e.FileIndex[r];
				if (i.content) {
					var a = i.content.length;
					a > 0 && (a < 4096 ? t += a + 63 >> 6 : n += a + 511 >> 9);
				}
			}
			for (var o = e.FullPaths.length + 3 >> 2, s = t + 7 >> 3, c = t + 127 >> 7, l = s + n + o + c, u = l + 127 >> 7, d = u <= 109 ? 0 : Math.ceil((u - 109) / 127); l + u + d + 127 >> 7 > u;) d = ++u <= 109 ? 0 : Math.ceil((u - 109) / 127);
			var f = [
				1,
				d,
				u,
				c,
				o,
				n,
				t,
				0
			];
			return e.FileIndex[0].size = t << 6, f[7] = (e.FileIndex[0].start = f[0] + f[1] + f[2] + f[3] + f[4] + f[5]) + (f[6] + 7 >> 3), f;
		})(e), i = mr(r[7] << 9), a = 0, o = 0;
		for (a = 0; a < 8; ++a) i.write_shift(1, L[a]);
		for (a = 0; a < 8; ++a) i.write_shift(2, 0);
		for (i.write_shift(2, 62), i.write_shift(2, 3), i.write_shift(2, 65534), i.write_shift(2, 9), i.write_shift(2, 6), a = 0; a < 3; ++a) i.write_shift(2, 0);
		for (i.write_shift(4, 0), i.write_shift(4, r[2]), i.write_shift(4, r[0] + r[1] + r[2] + r[3] - 1), i.write_shift(4, 0), i.write_shift(4, 4096), i.write_shift(4, r[3] ? r[0] + r[1] + r[2] - 1 : P), i.write_shift(4, r[3]), i.write_shift(-4, r[1] ? r[0] - 1 : P), i.write_shift(4, r[1]), a = 0; a < 109; ++a) i.write_shift(-4, a < r[2] ? r[1] + a : -1);
		if (r[1]) for (o = 0; o < r[1]; ++o) {
			for (; a < 236 + o * 127; ++a) i.write_shift(-4, a < r[2] ? r[1] + a : -1);
			i.write_shift(-4, o === r[1] - 1 ? P : o + 1);
		}
		var s = function(e) {
			for (o += e; a < o - 1; ++a) i.write_shift(-4, a + 1);
			e && (++a, i.write_shift(-4, P));
		};
		for (o = a = 0, o += r[1]; a < o; ++a) i.write_shift(-4, B.DIFSECT);
		for (o += r[2]; a < o; ++a) i.write_shift(-4, B.FATSECT);
		s(r[3]), s(r[4]);
		for (var c = 0, l = 0, u = e.FileIndex[0]; c < e.FileIndex.length; ++c) u = e.FileIndex[c], u.content && (l = u.content.length, !(l < 4096) && (u.start = o, s(l + 511 >> 9)));
		for (s(r[6] + 7 >> 3); i.l & 511;) i.write_shift(-4, B.ENDOFCHAIN);
		for (o = a = 0, c = 0; c < e.FileIndex.length; ++c) u = e.FileIndex[c], u.content && (l = u.content.length, !(!l || l >= 4096) && (u.start = o, s(l + 63 >> 6)));
		for (; i.l & 511;) i.write_shift(-4, B.ENDOFCHAIN);
		for (a = 0; a < r[4] << 2; ++a) {
			var d = e.FullPaths[a];
			if (!d || d.length === 0) {
				for (c = 0; c < 17; ++c) i.write_shift(4, 0);
				for (c = 0; c < 3; ++c) i.write_shift(4, -1);
				for (c = 0; c < 12; ++c) i.write_shift(4, 0);
			} else {
				u = e.FileIndex[a], a === 0 && (u.start = u.size ? u.start - 1 : P);
				var f = a === 0 && n.root || u.name;
				if (f.length > 31 && (console.error("Name " + f + " will be truncated to " + f.slice(0, 31)), f = f.slice(0, 31)), l = 2 * (f.length + 1), i.write_shift(64, f, "utf16le"), i.write_shift(2, l), i.write_shift(1, u.type), i.write_shift(1, u.color), i.write_shift(-4, u.L), i.write_shift(-4, u.R), i.write_shift(-4, u.C), u.clsid) i.write_shift(16, u.clsid, "hex");
				else for (c = 0; c < 4; ++c) i.write_shift(4, 0);
				i.write_shift(4, u.state || 0), i.write_shift(4, 0), i.write_shift(4, 0), i.write_shift(4, 0), i.write_shift(4, 0), i.write_shift(4, u.start), i.write_shift(4, u.size), i.write_shift(4, 0);
			}
		}
		for (a = 1; a < e.FileIndex.length; ++a) if (u = e.FileIndex[a], u.size >= 4096) {
			if (i.l = u.start + 1 << 9, k && Buffer.isBuffer(u.content)) u.content.copy(i, i.l, 0, u.size), i.l += u.size + 511 & -512;
			else {
				for (c = 0; c < u.size; ++c) i.write_shift(1, u.content[c]);
				for (; c & 511; ++c) i.write_shift(1, 0);
			}
		}
		for (a = 1; a < e.FileIndex.length; ++a) if (u = e.FileIndex[a], u.size > 0 && u.size < 4096) {
			if (k && Buffer.isBuffer(u.content)) u.content.copy(i, i.l, 0, u.size), i.l += u.size + 63 & -64;
			else {
				for (c = 0; c < u.size; ++c) i.write_shift(1, u.content[c]);
				for (; c & 63; ++c) i.write_shift(1, 0);
			}
		}
		if (k) i.l = i.length;
		else for (; i.l < i.length;) i.write_shift(1, 0);
		return i;
	}
	function D(e, t) {
		var n = e.FullPaths.map(function(e) {
			return e.toUpperCase();
		}), r = n.map(function(e) {
			var t = e.split("/");
			return t[t.length - (e.slice(-1) == "/" ? 2 : 1)];
		}), i = !1;
		t.charCodeAt(0) === 47 ? (i = !0, t = n[0].slice(0, -1) + t) : i = t.indexOf("/") !== -1;
		var a = t.toUpperCase(), o = i === !0 ? n.indexOf(a) : r.indexOf(a);
		if (o !== -1) return e.FileIndex[o];
		var s = !a.match(te);
		for (a = a.replace(R, ""), s && (a = a.replace(te, "!")), o = 0; o < n.length; ++o) if ((s ? n[o].replace(te, "!") : n[o]).replace(R, "") == a || (s ? r[o].replace(te, "!") : r[o]).replace(R, "") == a) return e.FileIndex[o];
		return null;
	}
	var j = 64, P = -2, F = "d0cf11e0a1b11ae1", L = [
		208,
		207,
		17,
		224,
		161,
		177,
		26,
		225
	], z = "00000000000000000000000000000000", B = {
		MAXREGSECT: -6,
		DIFSECT: -4,
		FATSECT: -3,
		ENDOFCHAIN: P,
		FREESECT: -1,
		HEADER_SIGNATURE: F,
		HEADER_MINOR_VERSION: "3e00",
		MAXREGSID: -6,
		NOSTREAM: -1,
		HEADER_CLSID: z,
		EntryTypes: [
			"unknown",
			"storage",
			"stream",
			"lockbytes",
			"property",
			"root"
		]
	};
	function V(e, t, n) {
		c();
		var r = T(e, n);
		s.writeFileSync(t, r);
	}
	function H(e) {
		for (var t = Array(e.length), n = 0; n < e.length; ++n) t[n] = String.fromCharCode(e[n]);
		return t.join("");
	}
	function U(e, t) {
		var n = T(e, t);
		switch (t && t.type || "buffer") {
			case "file": return c(), s.writeFileSync(t.filename, n), n;
			case "binary": return typeof n == "string" ? n : H(n);
			case "base64": return E(typeof n == "string" ? n : H(n));
			case "buffer": if (k) return Buffer.isBuffer(n) ? n : A(n);
			case "array": return typeof n == "string" ? N(n) : n;
		}
		return n;
	}
	var ne;
	function re(e) {
		try {
			var t = e.InflateRaw, n = new t();
			if (n._processChunk(new Uint8Array([3, 0]), n._finishFlushFlag), n.bytesRead) ne = e;
			else throw Error("zlib does not expose bytesRead");
		} catch (e) {
			console.error("cannot use native zlib: " + (e.message || e));
		}
	}
	function ie(e, t) {
		if (!ne) return Fe(e, t);
		var n = ne.InflateRaw, r = new n(), i = r._processChunk(e.slice(e.l), r._finishFlushFlag);
		return e.l += r.bytesRead, i;
	}
	function ae(e) {
		return ne ? ne.deflateRawSync(e) : q(e);
	}
	var oe = [
		16,
		17,
		18,
		0,
		8,
		7,
		9,
		6,
		10,
		5,
		11,
		4,
		12,
		3,
		13,
		2,
		14,
		1,
		15
	], se = [
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		10,
		11,
		13,
		15,
		17,
		19,
		23,
		27,
		31,
		35,
		43,
		51,
		59,
		67,
		83,
		99,
		115,
		131,
		163,
		195,
		227,
		258
	], ce = [
		1,
		2,
		3,
		4,
		5,
		7,
		9,
		13,
		17,
		25,
		33,
		49,
		65,
		97,
		129,
		193,
		257,
		385,
		513,
		769,
		1025,
		1537,
		2049,
		3073,
		4097,
		6145,
		8193,
		12289,
		16385,
		24577
	];
	function W(e) {
		var t = (e << 1 | e << 11) & 139536 | (e << 5 | e << 15) & 558144;
		return (t >> 16 | t >> 8 | t) & 255;
	}
	for (var G = typeof Uint8Array < "u", K = G ? /* @__PURE__ */ new Uint8Array(256) : [], le = 0; le < 256; ++le) K[le] = W(le);
	function ue(e, t) {
		var n = K[e & 255];
		return t <= 8 ? n >>> 8 - t : (n = n << 8 | K[e >> 8 & 255], t <= 16 ? n >>> 16 - t : (n = n << 8 | K[e >> 16 & 255], n >>> 24 - t));
	}
	function de(e, t) {
		var n = t & 7, r = t >>> 3;
		return (e[r] | (n <= 6 ? 0 : e[r + 1] << 8)) >>> n & 3;
	}
	function fe(e, t) {
		var n = t & 7, r = t >>> 3;
		return (e[r] | (n <= 5 ? 0 : e[r + 1] << 8)) >>> n & 7;
	}
	function pe(e, t) {
		var n = t & 7, r = t >>> 3;
		return (e[r] | (n <= 4 ? 0 : e[r + 1] << 8)) >>> n & 15;
	}
	function me(e, t) {
		var n = t & 7, r = t >>> 3;
		return (e[r] | (n <= 3 ? 0 : e[r + 1] << 8)) >>> n & 31;
	}
	function he(e, t) {
		var n = t & 7, r = t >>> 3;
		return (e[r] | (n <= 1 ? 0 : e[r + 1] << 8)) >>> n & 127;
	}
	function ge(e, t, n) {
		var r = t & 7, i = t >>> 3, a = (1 << n) - 1, o = e[i] >>> r;
		return n < 8 - r || (o |= e[i + 1] << 8 - r, n < 16 - r) || (o |= e[i + 2] << 16 - r, n < 24 - r) || (o |= e[i + 3] << 24 - r), o & a;
	}
	function _e(e, t, n) {
		var r = t & 7, i = t >>> 3;
		return r <= 5 ? e[i] |= (n & 7) << r : (e[i] |= n << r & 255, e[i + 1] = (n & 7) >> 8 - r), t + 3;
	}
	function ve(e, t, n) {
		var r = t & 7, i = t >>> 3;
		return n = (n & 1) << r, e[i] |= n, t + 1;
	}
	function ye(e, t, n) {
		var r = t & 7, i = t >>> 3;
		return n <<= r, e[i] |= n & 255, n >>>= 8, e[i + 1] = n, t + 8;
	}
	function be(e, t, n) {
		var r = t & 7, i = t >>> 3;
		return n <<= r, e[i] |= n & 255, n >>>= 8, e[i + 1] = n & 255, e[i + 2] = n >>> 8, t + 16;
	}
	function xe(e, t) {
		var n = e.length, r = 2 * n > t ? 2 * n : t + 5, i = 0;
		if (n >= t) return e;
		if (k) {
			var a = ee(r);
			if (e.copy) e.copy(a);
			else for (; i < e.length; ++i) a[i] = e[i];
			return a;
		}
		if (G) {
			var o = new Uint8Array(r);
			if (o.set) o.set(e);
			else for (; i < n; ++i) o[i] = e[i];
			return o;
		}
		return e.length = r, e;
	}
	function Se(e) {
		for (var t = Array(e), n = 0; n < e; ++n) t[n] = 0;
		return t;
	}
	function Ce(e, t, n) {
		var r = 1, i = 0, a = 0, o = 0, s = 0, c = e.length, l = G ? /* @__PURE__ */ new Uint16Array(32) : Se(32);
		for (a = 0; a < 32; ++a) l[a] = 0;
		for (a = c; a < n; ++a) e[a] = 0;
		c = e.length;
		var u = G ? new Uint16Array(c) : Se(c);
		for (a = 0; a < c; ++a) l[i = e[a]]++, r < i && (r = i), u[a] = 0;
		for (l[0] = 0, a = 1; a <= r; ++a) l[a + 16] = s = s + l[a - 1] << 1;
		for (a = 0; a < c; ++a) s = e[a], s != 0 && (u[a] = l[s + 16]++);
		var d = 0;
		for (a = 0; a < c; ++a) if (d = e[a], d != 0) for (s = ue(u[a], r) >> r - d, o = (1 << r + 4 - d) - 1; o >= 0; --o) t[s | o << d] = d & 15 | a << 4;
		return r;
	}
	var we = G ? /* @__PURE__ */ new Uint16Array(512) : Se(512), Te = G ? /* @__PURE__ */ new Uint16Array(32) : Se(32);
	if (!G) {
		for (var Ee = 0; Ee < 512; ++Ee) we[Ee] = 0;
		for (Ee = 0; Ee < 32; ++Ee) Te[Ee] = 0;
	}
	(function() {
		for (var e = [], t = 0; t < 32; t++) e.push(5);
		Ce(e, Te, 32);
		var n = [];
		for (t = 0; t <= 143; t++) n.push(8);
		for (; t <= 255; t++) n.push(9);
		for (; t <= 279; t++) n.push(7);
		for (; t <= 287; t++) n.push(8);
		Ce(n, we, 288);
	})();
	var De = /*#__PURE__*/ (function() {
		for (var e = G ? /* @__PURE__ */ new Uint8Array(32768) : [], t = 0, n = 0; t < ce.length - 1; ++t) for (; n < ce[t + 1]; ++n) e[n] = t;
		for (; n < 32768; ++n) e[n] = 29;
		var r = G ? /* @__PURE__ */ new Uint8Array(259) : [];
		for (t = 0, n = 0; t < se.length - 1; ++t) for (; n < se[t + 1]; ++n) r[n] = t;
		function i(e, t) {
			for (var n = 0; n < e.length;) {
				var r = Math.min(65535, e.length - n), i = n + r == e.length;
				for (t.write_shift(1, +i), t.write_shift(2, r), t.write_shift(2, ~r & 65535); r-- > 0;) t[t.l++] = e[n++];
			}
			return t.l;
		}
		function a(t, n) {
			for (var i = 0, a = 0, o = G ? /* @__PURE__ */ new Uint16Array(32768) : []; a < t.length;) {
				var s = Math.min(65535, t.length - a);
				if (s < 10) {
					for (i = _e(n, i, +(a + s == t.length)), i & 7 && (i += 8 - (i & 7)), n.l = i / 8 | 0, n.write_shift(2, s), n.write_shift(2, ~s & 65535); s-- > 0;) n[n.l++] = t[a++];
					i = n.l * 8;
				} else {
					i = _e(n, i, +(a + s == t.length) + 2);
					for (var c = 0; s-- > 0;) {
						var l = t[a];
						c = (c << 5 ^ l) & 32767;
						var u = -1, d = 0;
						if ((u = o[c]) && (u |= a & -32768, u > a && (u -= 32768), u < a)) for (; t[u + d] == t[a + d] && d < 250;) ++d;
						if (d > 2) {
							l = r[d], l <= 22 ? i = ye(n, i, K[l + 1] >> 1) - 1 : (ye(n, i, 3), i += 5, ye(n, i, K[l - 23] >> 5), i += 3);
							var f = l < 8 ? 0 : l - 4 >> 2;
							f > 0 && (be(n, i, d - se[l]), i += f), l = e[a - u], i = ye(n, i, K[l] >> 3), i -= 3;
							var p = l < 4 ? 0 : l - 2 >> 1;
							p > 0 && (be(n, i, a - u - ce[l]), i += p);
							for (var m = 0; m < d; ++m) o[c] = a & 32767, c = (c << 5 ^ t[a]) & 32767, ++a;
							s -= d - 1;
						} else l <= 143 ? l += 48 : i = ve(n, i, 1), i = ye(n, i, K[l]), o[c] = a & 32767, ++a;
					}
					i = ye(n, i, 0) - 1;
				}
			}
			return n.l = (i + 7) / 8 | 0, n.l;
		}
		return function(e, t) {
			return e.length < 8 ? i(e, t) : a(e, t);
		};
	})();
	function q(e) {
		var t = mr(50 + Math.floor(e.length * 1.1)), n = De(e, t);
		return t.slice(0, n);
	}
	var Oe = G ? /* @__PURE__ */ new Uint16Array(32768) : Se(32768), ke = G ? /* @__PURE__ */ new Uint16Array(32768) : Se(32768), Ae = G ? /* @__PURE__ */ new Uint16Array(128) : Se(128), je = 1, Me = 1;
	function Ne(e, t) {
		var n = me(e, t) + 257;
		t += 5;
		var r = me(e, t) + 1;
		t += 5;
		var i = pe(e, t) + 4;
		t += 4;
		for (var a = 0, o = G ? /* @__PURE__ */ new Uint8Array(19) : Se(19), s = [
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0
		], c = 1, l = G ? /* @__PURE__ */ new Uint8Array(8) : Se(8), u = G ? /* @__PURE__ */ new Uint8Array(8) : Se(8), d = o.length, f = 0; f < i; ++f) o[oe[f]] = a = fe(e, t), c < a && (c = a), l[a]++, t += 3;
		var p = 0;
		for (l[0] = 0, f = 1; f <= c; ++f) u[f] = p = p + l[f - 1] << 1;
		for (f = 0; f < d; ++f) (p = o[f]) != 0 && (s[f] = u[p]++);
		var m = 0;
		for (f = 0; f < d; ++f) if (m = o[f], m != 0) {
			p = K[s[f]] >> 8 - m;
			for (var h = (1 << 7 - m) - 1; h >= 0; --h) Ae[p | h << m] = m & 7 | f << 3;
		}
		var g = [];
		for (c = 1; g.length < n + r;) switch (p = Ae[he(e, t)], t += p & 7, p >>>= 3) {
			case 16:
				for (a = 3 + de(e, t), t += 2, p = g[g.length - 1]; a-- > 0;) g.push(p);
				break;
			case 17:
				for (a = 3 + fe(e, t), t += 3; a-- > 0;) g.push(0);
				break;
			case 18:
				for (a = 11 + he(e, t), t += 7; a-- > 0;) g.push(0);
				break;
			default: g.push(p), c < p && (c = p);
		}
		var _ = g.slice(0, n), v = g.slice(n);
		for (f = n; f < 286; ++f) _[f] = 0;
		for (f = r; f < 30; ++f) v[f] = 0;
		return je = Ce(_, Oe, 286), Me = Ce(v, ke, 30), t;
	}
	function Pe(e, t) {
		if (e[0] == 3 && !(e[1] & 3)) return [M(t), 2];
		for (var n = 0, r = 0, i = ee(t || 1 << 18), a = 0, o = i.length >>> 0, s = 0, c = 0; !(r & 1);) {
			if (r = fe(e, n), n += 3, r >>> 1) r >> 1 == 1 ? (s = 9, c = 5) : (n = Ne(e, n), s = je, c = Me);
			else {
				n & 7 && (n += 8 - (n & 7));
				var l = e[n >>> 3] | e[(n >>> 3) + 1] << 8;
				if (n += 32, l > 0) for (!t && o < a + l && (i = xe(i, a + l), o = i.length); l-- > 0;) i[a++] = e[n >>> 3], n += 8;
				continue;
			}
			for (;;) {
				!t && o < a + 32767 && (i = xe(i, a + 32767), o = i.length);
				var u = ge(e, n, s), d = r >>> 1 == 1 ? we[u] : Oe[u];
				if (n += d & 15, d >>>= 4, !(d >>> 8 & 255)) i[a++] = d;
				else if (d == 256) break;
				else {
					d -= 257;
					var f = d < 8 ? 0 : d - 4 >> 2;
					f > 5 && (f = 0);
					var p = a + se[d];
					f > 0 && (p += ge(e, n, f), n += f), u = ge(e, n, c), d = r >>> 1 == 1 ? Te[u] : ke[u], n += d & 15, d >>>= 4;
					var m = d < 4 ? 0 : d - 2 >> 1, h = ce[d];
					for (m > 0 && (h += ge(e, n, m), n += m), !t && o < p && (i = xe(i, p + 100), o = i.length); a < p;) i[a] = i[a - h], ++a;
				}
			}
		}
		return t ? [i, n + 7 >>> 3] : [i.slice(0, a), n + 7 >>> 3];
	}
	function Fe(e, t) {
		var n = Pe(e.slice(e.l || 0), t);
		return e.l += n[1], n[0];
	}
	function Ie(e, t) {
		if (e) typeof console < "u" && console.error(t);
		else throw Error(t);
	}
	function Le(e, t) {
		var n = e;
		fr(n, 0);
		var r = {
			FileIndex: [],
			FullPaths: []
		};
		S(r, { root: t.root });
		for (var i = n.length - 4; (n[i] != 80 || n[i + 1] != 75 || n[i + 2] != 5 || n[i + 3] != 6) && i >= 0;) --i;
		n.l = i + 4, n.l += 4;
		var a = n.read_shift(2);
		for (n.l += 6, n.l = n.read_shift(4), i = 0; i < a; ++i) {
			n.l += 20;
			var s = n.read_shift(4), c = n.read_shift(4), l = n.read_shift(2), u = n.read_shift(2), d = n.read_shift(2);
			n.l += 8;
			var f = n.read_shift(4), p = o(n.slice(n.l + l, n.l + l + u));
			n.l += l + u + d;
			var m = n.l;
			n.l = f + 4, p && p[1] && ((p[1] || {}).usz && (c = p[1].usz), (p[1] || {}).csz && (s = p[1].csz)), Re(n, s, c, r, p), n.l = m;
		}
		return r;
	}
	function Re(e, t, n, r, i) {
		e.l += 2;
		var s = e.read_shift(2), c = e.read_shift(2), l = a(e);
		if (s & 8257) throw Error("Unsupported ZIP encryption");
		for (var u = e.read_shift(4), d = e.read_shift(4), f = e.read_shift(4), p = e.read_shift(2), m = e.read_shift(2), h = "", g = 0; g < p; ++g) h += String.fromCharCode(e[e.l++]);
		if (m) {
			var _ = o(e.slice(e.l, e.l + m));
			(_[21589] || {}).mt && (l = _[21589].mt), (_[1] || {}).usz && (f = _[1].usz), (_[1] || {}).csz && (d = _[1].csz), i && ((i[21589] || {}).mt && (l = i[21589].mt), (i[1] || {}).usz && (f = i[1].usz), (i[1] || {}).csz && (d = i[1].csz));
		}
		e.l += m;
		var v = e.slice(e.l, e.l + d);
		switch (c) {
			case 8:
				v = ie(e, f);
				break;
			case 0:
				e.l += d;
				break;
			default: throw Error("Unsupported ZIP Compression method " + c);
		}
		var y = !1;
		s & 8 && (u = e.read_shift(4), u == 134695760 && (u = e.read_shift(4), y = !0), d = e.read_shift(4), f = e.read_shift(4)), d != t && Ie(y, "Bad compressed size: " + t + " != " + d), f != n && Ie(y, "Bad uncompressed size: " + n + " != " + f), Ye(r, h, v, {
			unsafe: !0,
			mt: l
		});
	}
	function ze(e, t) {
		var n = t || {}, r = [], a = [], o = mr(1), s = n.compression ? 8 : 0, c = 0, l = 0, u = 0, d = 0, f = 0, p = e.FullPaths[0], m = p, h = e.FileIndex[0], g = [], _ = 0;
		for (l = 1; l < e.FullPaths.length; ++l) if (m = e.FullPaths[l].slice(p.length), h = e.FileIndex[l], !(!h.size || !h.content || Array.isArray(h.content) && h.content.length == 0 || m == "Sh33tJ5")) {
			var v = d, y = mr(m.length);
			for (u = 0; u < m.length; ++u) y.write_shift(1, m.charCodeAt(u) & 127);
			y = y.slice(0, y.l), g[f] = typeof h.content == "string" ? rt.bstr(h.content, 0) : rt.buf(h.content, 0);
			var b = typeof h.content == "string" ? N(h.content) : h.content;
			s == 8 && (b = ae(b)), o = mr(30), o.write_shift(4, 67324752), o.write_shift(2, 20), o.write_shift(2, c), o.write_shift(2, s), h.mt ? i(o, h.mt) : o.write_shift(4, 0), o.write_shift(-4, c & 8 ? 0 : g[f]), o.write_shift(4, c & 8 ? 0 : b.length), o.write_shift(4, c & 8 ? 0 : h.content.length), o.write_shift(2, y.length), o.write_shift(2, 0), d += o.length, r.push(o), d += y.length, r.push(y), d += b.length, r.push(b), c & 8 && (o = mr(12), o.write_shift(-4, g[f]), o.write_shift(4, b.length), o.write_shift(4, h.content.length), d += o.l, r.push(o)), o = mr(46), o.write_shift(4, 33639248), o.write_shift(2, 0), o.write_shift(2, 20), o.write_shift(2, c), o.write_shift(2, s), o.write_shift(4, 0), o.write_shift(-4, g[f]), o.write_shift(4, b.length), o.write_shift(4, h.content.length), o.write_shift(2, y.length), o.write_shift(2, 0), o.write_shift(2, 0), o.write_shift(2, 0), o.write_shift(2, 0), o.write_shift(4, 0), o.write_shift(4, v), _ += o.l, a.push(o), _ += y.length, a.push(y), ++f;
		}
		return o = mr(22), o.write_shift(4, 101010256), o.write_shift(2, 0), o.write_shift(2, 0), o.write_shift(2, f), o.write_shift(2, f), o.write_shift(4, _), o.write_shift(4, d), o.write_shift(2, 0), I([
			I(r),
			I(a),
			o
		]);
	}
	var Be = {
		htm: "text/html",
		xml: "text/xml",
		gif: "image/gif",
		jpg: "image/jpeg",
		png: "image/png",
		mso: "application/x-mso",
		thmx: "application/vnd.ms-officetheme",
		sh33tj5: "application/octet-stream"
	};
	function Ve(e, t) {
		if (e.ctype) return e.ctype;
		var n = e.name || "", r = n.match(/\.([^\.]+)$/);
		return r && Be[r[1]] || t && (r = (n = t).match(/[\.\\]([^\.\\])+$/), r && Be[r[1]]) ? Be[r[1]] : "application/octet-stream";
	}
	function He(e) {
		for (var t = E(e), n = [], r = 0; r < t.length; r += 76) n.push(t.slice(r, r + 76));
		return n.join("\r\n") + "\r\n";
	}
	function Ue(e) {
		var t = e.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF=]/g, function(e) {
			var t = e.charCodeAt(0).toString(16).toUpperCase();
			return "=" + (t.length == 1 ? "0" + t : t);
		});
		t = t.replace(/ $/gm, "=20").replace(/\t$/gm, "=09"), t.charAt(0) == "\n" && (t = "=0D" + t.slice(1)), t = t.replace(/\r(?!\n)/gm, "=0D").replace(/\n\n/gm, "\n=0A").replace(/([^\r\n])\n/gm, "$1=0A");
		for (var n = [], r = t.split("\r\n"), i = 0; i < r.length; ++i) {
			var a = r[i];
			if (a.length == 0) n.push("");
			else for (var o = 0; o < a.length;) {
				var s = 76, c = a.slice(o, o + s);
				c.charAt(s - 1) == "=" ? s-- : c.charAt(s - 2) == "=" ? s -= 2 : c.charAt(s - 3) == "=" && (s -= 3), c = a.slice(o, o + s), o += s, o < a.length && (c += "="), n.push(c);
			}
		}
		return n.join("\r\n");
	}
	function We(e) {
		for (var t = [], n = 0; n < e.length; ++n) {
			for (var r = e[n]; n <= e.length && r.charAt(r.length - 1) == "=";) r = r.slice(0, r.length - 1) + e[++n];
			t.push(r);
		}
		for (var i = 0; i < t.length; ++i) t[i] = t[i].replace(/[=][0-9A-Fa-f]{2}/g, function(e) {
			return String.fromCharCode(parseInt(e.slice(1), 16));
		});
		return N(t.join("\r\n"));
	}
	function Ge(e, t, n) {
		for (var r = "", i = "", a = "", o, s = 0; s < 10; ++s) {
			var c = t[s];
			if (!c || c.match(/^\s*$/)) break;
			var l = c.match(/^([^:]*?):\s*([^\s].*)$/);
			if (l) switch (l[1].toLowerCase()) {
				case "content-location":
					r = l[2].trim();
					break;
				case "content-type":
					a = l[2].trim();
					break;
				case "content-transfer-encoding": i = l[2].trim();
			}
		}
		switch (++s, i.toLowerCase()) {
			case "base64":
				o = N(O(t.slice(s).join("")));
				break;
			case "quoted-printable":
				o = We(t.slice(s));
				break;
			default: throw Error("Unsupported Content-Transfer-Encoding " + i);
		}
		var u = Ye(e, r.slice(n.length), o, { unsafe: !0 });
		a && (u.ctype = a);
	}
	function Ke(e, t) {
		if (H(e.slice(0, 13)).toLowerCase() != "mime-version:") throw Error("Unsupported MAD header");
		var n = t && t.root || "", r = (k && Buffer.isBuffer(e) ? e.toString("binary") : H(e)).split("\r\n"), i = 0, a = "";
		for (i = 0; i < r.length; ++i) if (a = r[i], /^Content-Location:/i.test(a) && (a = a.slice(a.indexOf("file")), n ||= a.slice(0, a.lastIndexOf("/") + 1), a.slice(0, n.length) != n)) for (; n.length > 0 && (n = n.slice(0, n.length - 1), n = n.slice(0, n.lastIndexOf("/") + 1), a.slice(0, n.length) != n););
		var o = (r[1] || "").match(/boundary="(.*?)"/);
		if (!o) throw Error("MAD cannot find boundary");
		var s = "--" + (o[1] || ""), c = {
			FileIndex: [],
			FullPaths: []
		};
		S(c);
		var l, u = 0;
		for (i = 0; i < r.length; ++i) {
			var d = r[i];
			(d === s || d === s + "--") && (u++ && Ge(c, r.slice(l, i), n), l = i);
		}
		return c;
	}
	function qe(e, t) {
		var n = t || {}, r = n.boundary || "SheetJS";
		r = "------=" + r;
		for (var i = [
			"MIME-Version: 1.0",
			"Content-Type: multipart/related; boundary=\"" + r.slice(2) + "\"",
			"",
			"",
			""
		], a = e.FullPaths[0], o = a, s = e.FileIndex[0], c = 1; c < e.FullPaths.length; ++c) if (o = e.FullPaths[c].slice(a.length), s = e.FileIndex[c], s.size && s.content && o != "Sh33tJ5") {
			o = o.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF]/g, function(e) {
				return "_x" + e.charCodeAt(0).toString(16) + "_";
			}).replace(/[\u0080-\uFFFF]/g, function(e) {
				return "_u" + e.charCodeAt(0).toString(16) + "_";
			});
			for (var l = s.content, u = k && Buffer.isBuffer(l) ? l.toString("binary") : H(l), d = 0, f = Math.min(1024, u.length), p = 0, m = 0; m <= f; ++m) (p = u.charCodeAt(m)) >= 32 && p < 128 && ++d;
			var h = d >= f * 4 / 5;
			i.push(r), i.push("Content-Location: " + (n.root || "file:///C:/SheetJS/") + o), i.push("Content-Transfer-Encoding: " + (h ? "quoted-printable" : "base64")), i.push("Content-Type: " + Ve(s, o)), i.push(""), i.push(h ? Ue(u) : He(u));
		}
		return i.push(r + "--\r\n"), i.join("\r\n");
	}
	function Je(e) {
		var t = {};
		return S(t, e), t;
	}
	function Ye(e, t, n, i) {
		var a = i && i.unsafe;
		a || S(e);
		var o = !a && it.find(e, t);
		if (!o) {
			var s = e.FullPaths[0];
			t.slice(0, s.length) == s ? s = t : (s.slice(-1) != "/" && (s += "/"), s = (s + t).replace("//", "/")), o = {
				name: r(t),
				type: 2
			}, e.FileIndex.push(o), e.FullPaths.push(s), a || it.utils.cfb_gc(e);
		}
		return o.content = n, o.size = n ? n.length : 0, i && (i.CLSID && (o.clsid = i.CLSID), i.mt && (o.mt = i.mt), i.ct && (o.ct = i.ct)), o;
	}
	function Xe(e, t) {
		S(e);
		var n = it.find(e, t);
		if (n) {
			for (var r = 0; r < e.FileIndex.length; ++r) if (e.FileIndex[r] == n) return e.FileIndex.splice(r, 1), e.FullPaths.splice(r, 1), !0;
		}
		return !1;
	}
	function Ze(e, t, n) {
		S(e);
		var i = it.find(e, t);
		if (i) {
			for (var a = 0; a < e.FileIndex.length; ++a) if (e.FileIndex[a] == i) return e.FileIndex[a].name = r(n), e.FullPaths[a] = n, !0;
		}
		return !1;
	}
	function Qe(e) {
		w(e, !0);
	}
	return e.find = D, e.read = x, e.parse = l, e.write = U, e.writeFile = V, e.utils = {
		cfb_new: Je,
		cfb_add: Ye,
		cfb_del: Xe,
		cfb_mov: Ze,
		cfb_gc: Qe,
		ReadShift: or,
		CheckField: dr,
		prep_blob: fr,
		bconcat: I,
		use_zlib: re,
		_deflateRaw: q,
		_inflateRaw: Fe,
		consts: B
	}, e;
})(), at;
function ot(e) {
	if (typeof Deno < "u") return Deno.readFileSync(e);
	if (typeof $ < "u" && typeof File < "u" && typeof Folder < "u") try {
		var t = File(e);
		t.open("r"), t.encoding = "binary";
		var n = t.read();
		return t.close(), n;
	} catch (e) {
		if (!e.message || e.message.indexOf("onstruct") == -1) throw e;
	}
	throw Error("Cannot access file " + e);
}
function st(e) {
	for (var t = Object.keys(e), n = [], r = 0; r < t.length; ++r) Object.prototype.hasOwnProperty.call(e, t[r]) && n.push(t[r]);
	return n;
}
function ct(e) {
	for (var t = [], n = st(e), r = 0; r !== n.length; ++r) t[e[n[r]]] = n[r];
	return t;
}
var lt = /*#__PURE__*/ Date.UTC(1899, 11, 30, 0, 0, 0), ut = /*#__PURE__*/ Date.UTC(1899, 11, 31, 0, 0, 0), dt = /*#__PURE__*/ Date.UTC(1904, 0, 1, 0, 0, 0);
function ft(e, t) {
	var n = (/* @__PURE__ */ e.getTime() - lt) / 864e5;
	return t ? (n -= 1462, n < -1402 ? n - 1 : n) : n < 60 ? n - 1 : n;
}
function pt(e) {
	if (e >= 60 && e < 61) return e;
	var t = /* @__PURE__ */ new Date();
	return t.setTime((e > 60 ? e : e + 1) * 24 * 60 * 60 * 1e3 + lt), t;
}
function mt(e) {
	var t = 0, n = 0, r = !1, i = e.match(/P([0-9\.]+Y)?([0-9\.]+M)?([0-9\.]+D)?T([0-9\.]+H)?([0-9\.]+M)?([0-9\.]+S)?/);
	if (!i) throw Error("|" + e + "| is not an ISO8601 Duration");
	for (var a = 1; a != i.length; ++a) if (i[a]) {
		switch (n = 1, a > 3 && (r = !0), i[a].slice(i[a].length - 1)) {
			case "Y": throw Error("Unsupported ISO Duration Field: " + i[a].slice(i[a].length - 1));
			case "D": n *= 24;
			case "H": n *= 60;
			case "M": if (r) n *= 60;
			else throw Error("Unsupported ISO Duration Field: M");
		}
		t += n * parseInt(i[a], 10);
	}
	return t;
}
var ht = /^(\d+):(\d+)(:\d+)?(\.\d+)?$/, gt = /^(\d+)-(\d+)-(\d+)$/, _t = /^(\d+)-(\d+)-(\d+)[T ](\d+):(\d+)(:\d+)?(\.\d+)?$/;
function vt(e, t) {
	if (e instanceof Date) return e;
	var n = e.match(ht);
	return n ? new Date((t ? dt : ut) + ((parseInt(n[1], 10) * 60 + parseInt(n[2], 10)) * 60 + (n[3] ? parseInt(n[3].slice(1), 10) : 0)) * 1e3 + (n[4] ? parseInt((n[4] + "000").slice(1, 4), 10) : 0)) : (n = e.match(gt), n ? new Date(Date.UTC(+n[1], n[2] - 1, +n[3], 0, 0, 0, 0)) : (n = e.match(_t), n ? new Date(Date.UTC(+n[1], n[2] - 1, +n[3], +n[4], +n[5], n[6] && parseInt(n[6].slice(1), 10) || 0, n[7] && parseInt((n[7] + "0000").slice(1, 4), 10) || 0)) : new Date(e)));
}
function yt(e, t) {
	if (k && Buffer.isBuffer(e)) {
		if (t && j) {
			if (e[0] == 255 && e[1] == 254) return Sn(e.slice(2).toString("utf16le"));
			if (e[1] == 254 && e[2] == 255) return Sn(y(e.slice(2).toString("binary")));
		}
		return e.toString("binary");
	}
	if (typeof TextDecoder < "u") try {
		if (t) {
			if (e[0] == 255 && e[1] == 254) return Sn(new TextDecoder("utf-16le").decode(e.slice(2)));
			if (e[0] == 254 && e[1] == 255) return Sn(new TextDecoder("utf-16be").decode(e.slice(2)));
		}
		var n = {
			"€": "",
			"‚": "",
			ƒ: "",
			"„": "",
			"…": "",
			"†": "",
			"‡": "",
			ˆ: "",
			"‰": "",
			Š: "",
			"‹": "",
			Œ: "",
			Ž: "",
			"‘": "",
			"’": "",
			"“": "",
			"”": "",
			"•": "",
			"–": "",
			"—": "",
			"˜": "",
			"™": "",
			š: "",
			"›": "",
			œ: "",
			ž: "",
			Ÿ: ""
		};
		return Array.isArray(e) && (e = new Uint8Array(e)), new TextDecoder("latin1").decode(e).replace(/[€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ]/g, function(e) {
			return n[e] || e;
		});
	} catch {}
	var r = [], i = 0;
	try {
		for (i = 0; i < e.length - 65536; i += 65536) r.push(String.fromCharCode.apply(0, e.slice(i, i + 65536)));
		r.push(String.fromCharCode.apply(0, e.slice(i)));
	} catch {
		try {
			for (; i < e.length - 16384; i += 16384) r.push(String.fromCharCode.apply(0, e.slice(i, i + 16384)));
			r.push(String.fromCharCode.apply(0, e.slice(i)));
		} catch {
			for (; i != e.length; ++i) r.push(String.fromCharCode(e[i]));
		}
	}
	return r.join("");
}
function bt(e) {
	if (typeof JSON < "u" && !Array.isArray(e)) return JSON.parse(JSON.stringify(e));
	if (typeof e != "object" || !e) return e;
	if (e instanceof Date) return new Date(e.getTime());
	var t = {};
	for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = bt(e[n]));
	return t;
}
function xt(e, t) {
	for (var n = ""; n.length < t;) n += e;
	return n;
}
function St(e) {
	var t = Number(e);
	if (!isNaN(t)) return isFinite(t) ? t : NaN;
	if (!/\d/.test(e)) return t;
	var n = 1, r = e.replace(/([\d]),([\d])/g, "$1$2").replace(/[$]/g, "").replace(/[%]/g, function() {
		return n *= 100, "";
	});
	return !isNaN(t = Number(r)) || (r = r.replace(/[(]([^()]*)[)]/, function(e, t) {
		return n = -n, t;
	}), !isNaN(t = Number(r))) ? t / n : t;
}
var Ct = /^(0?\d|1[0-2])(?:|:([0-5]?\d)(?:|(\.\d+)(?:|:([0-5]?\d))|:([0-5]?\d)(|\.\d+)))\s+([ap])m?$/, wt = /^([01]?\d|2[0-3])(?:|:([0-5]?\d)(?:|(\.\d+)(?:|:([0-5]?\d))|:([0-5]?\d)(|\.\d+)))$/, Tt = /^(\d+)-(\d+)-(\d+)[T ](\d+):(\d+)(:\d+)(\.\d+)?[Z]?$/, Et = (/* @__PURE__ */ new Date("6/9/69 00:00 UTC")).valueOf() == -177984e5;
function Dt(e) {
	return e[2] ? e[3] ? e[4] ? new Date(Date.UTC(1899, 11, 31, e[1] % 12 + (e[7] == "p" ? 12 : 0), +e[2], +e[4], parseFloat(e[3]) * 1e3)) : new Date(Date.UTC(1899, 11, 31, e[7] == "p" ? 12 : 0, +e[1], +e[2], parseFloat(e[3]) * 1e3)) : e[5] ? new Date(Date.UTC(1899, 11, 31, e[1] % 12 + (e[7] == "p" ? 12 : 0), +e[2], +e[5], e[6] ? parseFloat(e[6]) * 1e3 : 0)) : new Date(Date.UTC(1899, 11, 31, e[1] % 12 + (e[7] == "p" ? 12 : 0), +e[2], 0, 0)) : new Date(Date.UTC(1899, 11, 31, e[1] % 12 + (e[7] == "p" ? 12 : 0), 0, 0, 0));
}
function Ot(e) {
	return e[2] ? e[3] ? e[4] ? new Date(Date.UTC(1899, 11, 31, +e[1], +e[2], +e[4], parseFloat(e[3]) * 1e3)) : new Date(Date.UTC(1899, 11, 31, 0, +e[1], +e[2], parseFloat(e[3]) * 1e3)) : e[5] ? new Date(Date.UTC(1899, 11, 31, +e[1], +e[2], +e[5], e[6] ? parseFloat(e[6]) * 1e3 : 0)) : new Date(Date.UTC(1899, 11, 31, +e[1], +e[2], 0, 0)) : new Date(Date.UTC(1899, 11, 31, +e[1], 0, 0, 0));
}
var kt = [
	"january",
	"february",
	"march",
	"april",
	"may",
	"june",
	"july",
	"august",
	"september",
	"october",
	"november",
	"december"
];
function At(e) {
	if (Tt.test(e)) return e.indexOf("Z") == -1 ? Nt(new Date(e)) : new Date(e);
	var t = e.toLowerCase(), n = t.replace(/\s+/g, " ").trim(), r = n.match(Ct);
	if (r) return Dt(r);
	if (r = n.match(wt), r) return Ot(r);
	if (r = n.match(_t), r) return new Date(Date.UTC(+r[1], r[2] - 1, +r[3], +r[4], +r[5], r[6] && parseInt(r[6].slice(1), 10) || 0, r[7] && parseInt((r[7] + "0000").slice(1, 4), 10) || 0));
	var i = new Date(Et && e.indexOf("UTC") == -1 ? e + " UTC" : e), a = /* @__PURE__ */ new Date(NaN), o = i.getYear();
	i.getMonth();
	var s = i.getDate();
	if (isNaN(s)) return a;
	if (t.match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)) {
		if (t = t.replace(/[^a-z]/g, "").replace(/([^a-z]|^)[ap]m?([^a-z]|$)/, ""), t.length > 3 && kt.indexOf(t) == -1) return a;
	} else if (t.replace(/[ap]m?/, "").match(/[a-z]/)) return a;
	return o < 0 || o > 8099 || e.match(/[^-0-9:,\/\\\ ]/) ? a : i;
}
var jt = /*#__PURE__*/ (function() {
	var e = "abacaba".split(/(:?b)/i).length == 5;
	return function(t, n, r) {
		if (e || typeof n == "string") return t.split(n);
		for (var i = t.split(n), a = [i[0]], o = 1; o < i.length; ++o) a.push(r), a.push(i[o]);
		return a;
	};
})();
function Mt(e) {
	return new Date(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate(), e.getUTCHours(), e.getUTCMinutes(), e.getUTCSeconds(), e.getUTCMilliseconds());
}
function Nt(e) {
	return new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
}
function Pt(e) {
	var t = e.slice(0, 1024).indexOf("<!DOCTYPE");
	if (t == -1) return e;
	var n = e.match(/<[\w]/);
	return n ? e.slice(0, t) + e.slice(n.index) : e;
}
function Ft(e, t, n) {
	for (var r = [], i = e.indexOf(t); i > -1;) {
		var a = e.indexOf(n, i + t.length);
		if (a == -1) break;
		r.push(e.slice(i, a + n.length)), i = e.indexOf(t, a + n.length);
	}
	return r.length > 0 ? r : null;
}
function It(e, t, n) {
	var r = [], i = 0, a = e.indexOf(t);
	if (a == -1) return e;
	for (; a > -1;) {
		r.push(e.slice(i, a));
		var o = e.indexOf(n, a + t.length);
		if (o == -1) break;
		(a = e.indexOf(t, i = o + n.length)) == -1 && r.push(e.slice(i));
	}
	return r.join("");
}
var Lt = {
	" ": 1,
	"	": 1,
	"\r": 1,
	"\n": 1,
	">": 1
};
function Rt(e, t) {
	for (var n = e.indexOf("<" + t), r = t.length + 1, i = e.length; n >= 0 && n <= i - r && !Lt[e.charAt(n + r)];) n = e.indexOf("<" + t, n + 1);
	if (n === -1) return null;
	var a = e.indexOf(">", n + t.length);
	if (a === -1) return null;
	var o = "</" + t + ">", s = e.indexOf(o, a);
	return s == -1 ? null : [e.slice(n, s + o.length), e.slice(a + 1, s)];
}
var zt = /*#__PURE__*/ (function() {
	var e = {};
	return function(t, n) {
		var r = e[n];
		r || (e[n] = r = [RegExp("<(?:\\w+:)?" + n + "\\b[^<>]*>", "g"), RegExp("</(?:\\w+:)?" + n + ">", "g")]), r[0].lastIndex = r[1].lastIndex = 0;
		var i = r[0].exec(t);
		if (!i) return null;
		var a = i.index, o = r[0].lastIndex;
		if (r[1].lastIndex = r[0].lastIndex, i = r[1].exec(t), !i) return null;
		var s = i.index, c = r[1].lastIndex;
		return [t.slice(a, c), t.slice(o, s)];
	};
})(), Bt = /*#__PURE__*/ (function() {
	var e = {};
	return function(t, n) {
		var r = [], i = e[n];
		i || (e[n] = i = [RegExp("<(?:\\w+:)?" + n + "\\b[^<>]*>", "g"), RegExp("</(?:\\w+:)?" + n + ">", "g")]), i[0].lastIndex = i[1].lastIndex = 0;
		for (var a; a = i[0].exec(t);) {
			var o = a.index;
			if (i[1].lastIndex = i[0].lastIndex, a = i[1].exec(t), !a) return null;
			var s = i[1].lastIndex;
			r.push(t.slice(o, s)), i[0].lastIndex = i[1].lastIndex;
		}
		return r.length == 0 ? null : r;
	};
})(), Vt = /*#__PURE__*/ (function() {
	var e = {};
	return function(t, n) {
		var r = [], i = e[n];
		i || (e[n] = i = [RegExp("<(?:\\w+:)?" + n + "\\b[^<>]*>", "g"), RegExp("</(?:\\w+:)?" + n + ">", "g")]), i[0].lastIndex = i[1].lastIndex = 0;
		for (var a, o = 0, s = 0; a = i[0].exec(t);) {
			if (o = a.index, r.push(t.slice(s, o)), s = o, i[1].lastIndex = i[0].lastIndex, a = i[1].exec(t), !a) return null;
			s = i[1].lastIndex, i[0].lastIndex = i[1].lastIndex;
		}
		return r.push(t.slice(s)), r.length == 0 ? "" : r.join("");
	};
})(), Ht = /*#__PURE__*/ (function() {
	var e = {};
	return function(t, n) {
		var r = [], i = e[n];
		i || (e[n] = i = [RegExp("<" + n + "\\b[^<>]*>", "ig"), RegExp("</" + n + ">", "ig")]), i[0].lastIndex = i[1].lastIndex = 0;
		for (var a; a = i[0].exec(t);) {
			var o = a.index;
			if (i[1].lastIndex = i[0].lastIndex, a = i[1].exec(t), !a) return null;
			var s = i[1].lastIndex;
			r.push(t.slice(o, s)), i[0].lastIndex = i[1].lastIndex;
		}
		return r.length == 0 ? null : r;
	};
})();
function Ut(e) {
	return e ? e.content && e.type ? yt(e.content, !0) : e.data ? b(e.data) : e.asNodeBuffer && k ? b(e.asNodeBuffer().toString("binary")) : e.asBinary ? b(e.asBinary()) : e._data && e._data.getContent ? b(yt(Array.prototype.slice.call(e._data.getContent(), 0))) : null : null;
}
function Wt(e) {
	if (!e) return null;
	if (e.data) return g(e.data);
	if (e.asNodeBuffer && k) return e.asNodeBuffer();
	if (e._data && e._data.getContent) {
		var t = e._data.getContent();
		return typeof t == "string" ? g(t) : Array.prototype.slice.call(t);
	}
	return e.content && e.type ? e.content : null;
}
function Gt(e) {
	return e && e.name.slice(-4) === ".bin" ? Wt(e) : Ut(e);
}
function Kt(e, t) {
	for (var n = e.FullPaths || st(e.files), r = t.toLowerCase().replace(/[\/]/g, "\\"), i = r.replace(/\\/g, "/"), a = 0; a < n.length; ++a) {
		var o = n[a].replace(/^Root Entry[\/]/, "").toLowerCase();
		if (r == o || i == o) return e.files ? e.files[n[a]] : e.FileIndex[a];
	}
	return null;
}
function qt(e, t) {
	var n = Kt(e, t);
	if (n == null) throw Error("Cannot find file " + t + " in zip");
	return n;
}
function Jt(e, t, n) {
	if (!n) return Gt(qt(e, t));
	if (!t) return null;
	try {
		return Jt(e, t);
	} catch {
		return null;
	}
}
function Yt(e, t, n) {
	if (!n) return Ut(qt(e, t));
	if (!t) return null;
	try {
		return Yt(e, t);
	} catch {
		return null;
	}
}
function Xt(e, t, n) {
	if (!n) return Wt(qt(e, t));
	if (!t) return null;
	try {
		return Xt(e, t);
	} catch {
		return null;
	}
}
function Zt(e) {
	for (var t = e.FullPaths || st(e.files), n = [], r = 0; r < t.length; ++r) t[r].slice(-1) != "/" && n.push(t[r].replace(/^Root Entry[\/]/, ""));
	return n.sort();
}
function Qt(e, t, n) {
	if (e.FullPaths) {
		if (Array.isArray(n) && typeof n[0] == "string" && (n = n.join("")), typeof n == "string") {
			var r = k ? A(n) : L(n);
			return it.utils.cfb_add(e, t, r);
		}
		it.utils.cfb_add(e, t, n);
	} else e.file(t, n);
}
function $t(e, t) {
	switch (t.type) {
		case "base64": return it.read(e, { type: "base64" });
		case "binary": return it.read(e, { type: "binary" });
		case "buffer":
		case "array": return it.read(e, { type: "buffer" });
	}
	throw Error("Unrecognized type " + t.type);
}
function en(e, t) {
	if (e.charAt(0) == "/") return e.slice(1);
	var n = t.split("/");
	t.slice(-1) != "/" && n.pop();
	for (var r = e.split("/"); r.length !== 0;) {
		var i = r.shift();
		i === ".." ? n.pop() : i !== "." && n.push(i);
	}
	return n.join("/");
}
var tn = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\r\n", nn = /\s([^"\s?>\/]+)\s*=\s*((?:")([^"]*)(?:")|(?:')([^']*)(?:')|([^'">\s]+))/g, rn = /<[\/\?]?[a-zA-Z0-9:_-]+(?:\s+[^"\s?<>\/]+\s*=\s*(?:"[^"]*"|'[^']*'|[^'"<>\s=]+))*\s*[\/\?]?>/gm, an = /*#__PURE__*/ tn.match(rn) ? rn : /<[^<>]*>/g, on = /<\w*:/, sn = /<(\/?)\w+:/;
function J(e, t, n) {
	for (var r = {}, i = 0, a = 0; i !== e.length && (a = e.charCodeAt(i)) !== 32 && a !== 10 && a !== 13; ++i);
	if (t || (r[0] = e.slice(0, i)), i === e.length) return r;
	var o = e.match(nn), s = 0, c = "", l = 0, u = "", d = "", f = 1;
	if (o) for (l = 0; l != o.length; ++l) {
		for (d = o[l].slice(1), a = 0; a != d.length && d.charCodeAt(a) !== 61; ++a);
		for (u = d.slice(0, a).trim(); d.charCodeAt(a + 1) == 32;) ++a;
		for (f = +((i = d.charCodeAt(a + 1)) == 34 || i == 39), c = d.slice(a + 1 + f, d.length - f), s = 0; s != u.length && u.charCodeAt(s) !== 58; ++s);
		if (s === u.length) u.indexOf("_") > 0 && (u = u.slice(0, u.indexOf("_"))), r[u] = c, n || (r[u.toLowerCase()] = c);
		else {
			var p = (s === 5 && u.slice(0, 5) === "xmlns" ? "xmlns" : "") + u.slice(s + 1);
			if (r[p] && u.slice(s - 3, s) == "ext") continue;
			r[p] = c, n || (r[p.toLowerCase()] = c);
		}
	}
	return r;
}
function cn(e, t, n) {
	for (var r = {}, i = 0, a = 0; i !== e.length && (a = e.charCodeAt(i)) !== 32 && a !== 10 && a !== 13; ++i);
	if (t || (r[0] = e.slice(0, i)), i === e.length) return r;
	var o = e.match(nn), s = "", c = 0, l = "", u = "", d = 1;
	if (o) for (c = 0; c != o.length; ++c) {
		for (u = o[c].slice(1), a = 0; a != u.length && u.charCodeAt(a) !== 61; ++a);
		for (l = u.slice(0, a).trim(); u.charCodeAt(a + 1) == 32;) ++a;
		d = +((i = u.charCodeAt(a + 1)) == 34 || i == 39), s = u.slice(a + 1 + d, u.length - d), l.indexOf("_") > 0 && (l = l.slice(0, l.indexOf("_"))), r[l] = s, n || (r[l.toLowerCase()] = s);
	}
	return r;
}
function ln(e) {
	return e.replace(sn, "<$1");
}
var un = {
	"&quot;": "\"",
	"&apos;": "'",
	"&gt;": ">",
	"&lt;": "<",
	"&amp;": "&"
}, dn = /*#__PURE__*/ ct(un), Y = /*#__PURE__*/ (function() {
	var e = /&(?:quot|apos|gt|lt|amp|#x?([\da-fA-F]+));/gi, t = /_x([\da-fA-F]{4})_/g;
	function n(r) {
		var i = r + "", a = i.indexOf("<![CDATA[");
		if (a == -1) return i.replace(e, function(e, t) {
			return un[e] || String.fromCharCode(parseInt(t, e.indexOf("x") > -1 ? 16 : 10)) || e;
		}).replace(t, function(e, t) {
			return String.fromCharCode(parseInt(t, 16));
		});
		var o = i.indexOf("]]>");
		return n(i.slice(0, a)) + i.slice(a + 9, o) + n(i.slice(o + 3));
	}
	return function(e, t) {
		var r = n(e);
		return t ? r.replace(/\r\n/g, "\n") : r;
	};
})(), fn = /[&<>'"]/g, pn = /[\u0000-\u001f]/g;
function mn(e) {
	return (e + "").replace(fn, function(e) {
		return dn[e];
	}).replace(/\r\n|\r|\n/g, "<br/>").replace(pn, function(e) {
		return "&#x" + ("000" + e.charCodeAt(0).toString(16)).slice(-4) + ";";
	});
}
function hn(e) {
	for (var t = String(e), n = [], r = !1, i = 0; i < t.length; ++i) {
		var a = t.charCodeAt(i);
		!r && a == 60 ? r = !0 : r && a == 62 ? r = !1 : r || n.push(t.charAt(i));
	}
	return n.join("");
}
var gn = /*#__PURE__*/ (function() {
	var e = /&#(\d+);/g;
	function t(e, t) {
		return String.fromCharCode(parseInt(t, 10));
	}
	return function(n) {
		return n.replace(e, t);
	};
})();
function X(e) {
	switch (e) {
		case 1:
		case !0:
		case "1":
		case "true": return !0;
		case 0:
		case !1:
		case "0":
		case "false": return !1;
	}
	return !1;
}
function _n(e) {
	for (var t = "", n = 0, r = 0, i = 0, a = 0, o = 0, s = 0; n < e.length;) r = e.charCodeAt(n++), r < 128 ? t += String.fromCharCode(r) : (i = e.charCodeAt(n++), r > 191 && r < 224 ? (o = (r & 31) << 6, o |= i & 63, t += String.fromCharCode(o)) : (a = e.charCodeAt(n++), r < 240 ? t += String.fromCharCode((r & 15) << 12 | (i & 63) << 6 | a & 63) : (o = e.charCodeAt(n++), s = ((r & 7) << 18 | (i & 63) << 12 | (a & 63) << 6 | o & 63) - 65536, t += String.fromCharCode(55296 + (s >>> 10 & 1023)), t += String.fromCharCode(56320 + (s & 1023)))));
	return t;
}
function vn(e) {
	var t = M(2 * e.length), n, r, i = 1, a = 0, o = 0, s;
	for (r = 0; r < e.length; r += i) i = 1, (s = e.charCodeAt(r)) < 128 ? n = s : s < 224 ? (n = (s & 31) * 64 + (e.charCodeAt(r + 1) & 63), i = 2) : s < 240 ? (n = (s & 15) * 4096 + (e.charCodeAt(r + 1) & 63) * 64 + (e.charCodeAt(r + 2) & 63), i = 3) : (i = 4, n = (s & 7) * 262144 + (e.charCodeAt(r + 1) & 63) * 4096 + (e.charCodeAt(r + 2) & 63) * 64 + (e.charCodeAt(r + 3) & 63), n -= 65536, o = 55296 + (n >>> 10 & 1023), n = 56320 + (n & 1023)), o !== 0 && (t[a++] = o & 255, t[a++] = o >>> 8, o = 0), t[a++] = n % 256, t[a++] = n >>> 8;
	return t.slice(0, a).toString("ucs2");
}
function yn(e) {
	return A(e, "binary").toString("utf8");
}
var bn = "foo bar bazâð£", xn = /*#__PURE__*/ (function() {
	if (k) {
		if (yn(bn) == _n(bn)) return yn;
		if (vn(bn) == _n(bn)) return vn;
	}
	return _n;
})(), Sn = k ? function(e) {
	return A(e, "utf8").toString("binary");
} : function(e) {
	for (var t = [], n = 0, r = 0, i = 0; n < e.length;) switch (r = e.charCodeAt(n++), !0) {
		case r < 128:
			t.push(String.fromCharCode(r));
			break;
		case r < 2048:
			t.push(String.fromCharCode(192 + (r >> 6))), t.push(String.fromCharCode(128 + (r & 63)));
			break;
		case r >= 55296 && r < 57344:
			r -= 55296, i = e.charCodeAt(n++) - 56320 + (r << 10), t.push(String.fromCharCode(240 + (i >> 18 & 7))), t.push(String.fromCharCode(144 + (i >> 12 & 63))), t.push(String.fromCharCode(128 + (i >> 6 & 63))), t.push(String.fromCharCode(128 + (i & 63)));
			break;
		default: t.push(String.fromCharCode(224 + (r >> 12))), t.push(String.fromCharCode(128 + (r >> 6 & 63))), t.push(String.fromCharCode(128 + (r & 63)));
	}
	return t.join("");
}, Cn = /*#__PURE__*/ (function() {
	var e = [
		["nbsp", " "],
		["middot", "·"],
		["quot", "\""],
		["apos", "'"],
		["gt", ">"],
		["lt", "<"],
		["amp", "&"]
	].map(function(e) {
		return [RegExp("&" + e[0] + ";", "ig"), e[1]];
	});
	return function(t) {
		var n = t.replace(/^[\t\n\r ]+/, "").replace(/(^|[^\t\n\r ])[\t\n\r ]+$/, "$1").replace(/>\s+/g, ">").replace(/\b\s+</g, "<").replace(/[\t\n\r ]+/g, " ").replace(/<\s*[bB][rR]\s*\/?>/g, "\n");
		n = hn(n);
		for (var r = 0; r < e.length; ++r) n = n.replace(e[r][0], e[r][1]);
		return n;
	};
})(), wn = /<\/?(?:vt:)?variant>/g, Tn = /<(?:vt:)([^<"'>]*)>([\s\S]*)</;
function En(e, t) {
	var n = J(e), r = Bt(e, n.baseType) || [], i = [];
	if (r.length != n.size) {
		if (t.WTF) throw Error("unexpected vector length " + r.length + " != " + n.size);
		return i;
	}
	return r.forEach(function(e) {
		var t = e.replace(wn, "").match(Tn);
		t && i.push({
			v: xn(t[2]),
			t: t[1]
		});
	}), i;
}
function Dn(e) {
	if (k && Buffer.isBuffer(e)) return e.toString("utf8");
	if (typeof e == "string") return e;
	if (typeof Uint8Array < "u" && e instanceof Uint8Array) return xn(P(F(e)));
	throw Error("Bad input format: expected Buffer or string");
}
var On = /<([\/]?)([^\s?><!\/:"]*:|)([^\s?<>:\/"]+)(?:\s+[^<>=?"'\s]+="[^"]*?")*\s*[\/]?>/gm, kn = {
	CORE_PROPS: "http://schemas.openxmlformats.org/package/2006/metadata/core-properties",
	CUST_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties",
	EXT_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
	CT: "http://schemas.openxmlformats.org/package/2006/content-types",
	RELS: "http://schemas.openxmlformats.org/package/2006/relationships",
	TCMNT: "http://schemas.microsoft.com/office/spreadsheetml/2018/threadedcomments",
	dc: "http://purl.org/dc/elements/1.1/",
	dcterms: "http://purl.org/dc/terms/",
	dcmitype: "http://purl.org/dc/dcmitype/",
	mx: "http://schemas.microsoft.com/office/mac/excel/2008/main",
	r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
	sjs: "http://schemas.openxmlformats.org/package/2006/sheetjs/core-properties",
	vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes",
	xsi: "http://www.w3.org/2001/XMLSchema-instance",
	xsd: "http://www.w3.org/2001/XMLSchema"
}, An = [
	"http://schemas.openxmlformats.org/spreadsheetml/2006/main",
	"http://purl.oclc.org/ooxml/spreadsheetml/main",
	"http://schemas.microsoft.com/office/excel/2006/main",
	"http://schemas.microsoft.com/office/excel/2006/2"
];
function jn(e, t) {
	for (var n = 1 - 2 * (e[t + 7] >>> 7), r = ((e[t + 7] & 127) << 4) + (e[t + 6] >>> 4 & 15), i = e[t + 6] & 15, a = 5; a >= 0; --a) i = i * 256 + e[t + a];
	return r == 2047 ? i == 0 ? n * Infinity : NaN : (r == 0 ? r = -1022 : (r -= 1023, i += 2 ** 52), n * 2 ** (r - 52) * i);
}
function Mn(e, t, n) {
	var r = (t < 0 || 1 / t == -Infinity) << 7, i = 0, a = 0, o = r ? -t : t;
	isFinite(o) ? o == 0 ? i = a = 0 : (i = Math.floor(Math.log(o) / Math.LN2), a = o * 2 ** (52 - i), i <= -1023 && (!isFinite(a) || a < 2 ** 52) ? i = -1022 : (a -= 2 ** 52, i += 1023)) : (i = 2047, a = isNaN(t) ? 26985 : 0);
	for (var s = 0; s <= 5; ++s, a /= 256) e[n + s] = a & 255;
	e[n + 6] = (i & 15) << 4 | a & 15, e[n + 7] = i >> 4 | r;
}
var Nn = function(e) {
	for (var t = [], n = 10240, r = 0; r < e[0].length; ++r) if (e[0][r]) for (var i = 0, a = e[0][r].length; i < a; i += n) t.push.apply(t, e[0][r].slice(i, i + n));
	return t;
}, Pn = k ? function(e) {
	return e[0].length > 0 && Buffer.isBuffer(e[0][0]) ? Buffer.concat(e[0].map(function(e) {
		return Buffer.isBuffer(e) ? e : A(e);
	})) : Nn(e);
} : Nn, Fn = function(e, t, n) {
	for (var r = [], i = t; i < n; i += 2) r.push(String.fromCharCode(tr(e, i)));
	return r.join("").replace(R, "");
}, In = k ? function(e, t, n) {
	return !Buffer.isBuffer(e) || !j ? Fn(e, t, n) : e.toString("utf16le", t, n).replace(R, "");
} : Fn, Ln = function(e, t, n) {
	for (var r = [], i = t; i < t + n; ++i) r.push(("0" + e[i].toString(16)).slice(-2));
	return r.join("");
}, Rn = k ? function(e, t, n) {
	return Buffer.isBuffer(e) ? e.toString("hex", t, t + n) : Ln(e, t, n);
} : Ln, zn = function(e, t, n) {
	for (var r = [], i = t; i < n; i++) r.push(String.fromCharCode(er(e, i)));
	return r.join("");
}, Bn = k ? function(e, t, n) {
	return Buffer.isBuffer(e) ? e.toString("utf8", t, n) : zn(e, t, n);
} : zn, Vn = function(e, t) {
	var n = rr(e, t);
	return n > 0 ? Bn(e, t + 4, t + 4 + n - 1) : "";
}, Hn = Vn, Un = function(e, t) {
	var n = rr(e, t);
	return n > 0 ? Bn(e, t + 4, t + 4 + n - 1) : "";
}, Wn = Un, Gn = function(e, t) {
	var n = 2 * rr(e, t);
	return n > 0 ? Bn(e, t + 4, t + 4 + n - 1) : "";
}, Kn = Gn, qn = function(e, t) {
	var n = rr(e, t);
	return n > 0 ? In(e, t + 4, t + 4 + n) : "";
}, Jn = qn, Yn = function(e, t) {
	var n = rr(e, t);
	return n > 0 ? Bn(e, t + 4, t + 4 + n) : "";
}, Xn = Yn, Zn = function(e, t) {
	return jn(e, t);
}, Qn = Zn, $n = function(e) {
	return Array.isArray(e) || typeof Uint8Array < "u" && e instanceof Uint8Array;
};
k && (Hn = function(e, t) {
	if (!Buffer.isBuffer(e)) return Vn(e, t);
	var n = e.readUInt32LE(t);
	return n > 0 ? e.toString("utf8", t + 4, t + 4 + n - 1) : "";
}, Wn = function(e, t) {
	if (!Buffer.isBuffer(e)) return Un(e, t);
	var n = e.readUInt32LE(t);
	return n > 0 ? e.toString("utf8", t + 4, t + 4 + n - 1) : "";
}, Kn = function(e, t) {
	if (!Buffer.isBuffer(e) || !j) return Gn(e, t);
	var n = 2 * e.readUInt32LE(t);
	return e.toString("utf16le", t + 4, t + 4 + n - 1);
}, Jn = function(e, t) {
	if (!Buffer.isBuffer(e) || !j) return qn(e, t);
	var n = e.readUInt32LE(t);
	return e.toString("utf16le", t + 4, t + 4 + n);
}, Xn = function(e, t) {
	if (!Buffer.isBuffer(e)) return Yn(e, t);
	var n = e.readUInt32LE(t);
	return e.toString("utf8", t + 4, t + 4 + n);
}, Qn = function(e, t) {
	return Buffer.isBuffer(e) ? e.readDoubleLE(t) : Zn(e, t);
}, $n = function(e) {
	return Buffer.isBuffer(e) || Array.isArray(e) || typeof Uint8Array < "u" && e instanceof Uint8Array;
});
var er = function(e, t) {
	return e[t];
}, tr = function(e, t) {
	return e[t + 1] * 256 + e[t];
}, nr = function(e, t) {
	var n = e[t + 1] * 256 + e[t];
	return n < 32768 ? n : (65535 - n + 1) * -1;
}, rr = function(e, t) {
	return e[t + 3] * (1 << 24) + (e[t + 2] << 16) + (e[t + 1] << 8) + e[t];
}, ir = function(e, t) {
	return e[t + 3] << 24 | e[t + 2] << 16 | e[t + 1] << 8 | e[t];
}, ar = function(e, t) {
	return e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3];
};
function or(e, t) {
	var n = "", r, i, a = [], o, s, c, l;
	switch (t) {
		case "dbcs":
			if (l = this.l, k && Buffer.isBuffer(this) && j) n = this.slice(this.l, this.l + 2 * e).toString("utf16le");
			else for (c = 0; c < e; ++c) n += String.fromCharCode(tr(this, l)), l += 2;
			e *= 2;
			break;
		case "utf8":
			n = Bn(this, this.l, this.l + e);
			break;
		case "utf16le":
			e *= 2, n = In(this, this.l, this.l + e);
			break;
		case "wstr": return or.call(this, e, "dbcs");
		case "lpstr-ansi":
			n = Hn(this, this.l), e = 4 + rr(this, this.l);
			break;
		case "lpstr-cp":
			n = Wn(this, this.l), e = 4 + rr(this, this.l);
			break;
		case "lpwstr":
			n = Kn(this, this.l), e = 4 + 2 * rr(this, this.l);
			break;
		case "lpp4":
			e = 4 + rr(this, this.l), n = Jn(this, this.l), e & 2 && (e += 2);
			break;
		case "8lpp4":
			e = 4 + rr(this, this.l), n = Xn(this, this.l), e & 3 && (e += 4 - (e & 3));
			break;
		case "cstr":
			for (e = 0, n = ""; (o = er(this, this.l + e++)) !== 0;) a.push(x(o));
			n = a.join("");
			break;
		case "_wstr":
			for (e = 0, n = ""; (o = tr(this, this.l + e)) !== 0;) a.push(x(o)), e += 2;
			e += 2, n = a.join("");
			break;
		case "dbcs-cont":
			for (n = "", l = this.l, c = 0; c < e; ++c) {
				if (this.lens && this.lens.indexOf(l) !== -1) return o = er(this, l), this.l = l + 1, s = or.call(this, e - c, o ? "dbcs-cont" : "sbcs-cont"), a.join("") + s;
				a.push(x(tr(this, l))), l += 2;
			}
			n = a.join(""), e *= 2;
			break;
		case "cpstr":
		case "sbcs-cont":
			for (n = "", l = this.l, c = 0; c != e; ++c) {
				if (this.lens && this.lens.indexOf(l) !== -1) return o = er(this, l), this.l = l + 1, s = or.call(this, e - c, o ? "dbcs-cont" : "sbcs-cont"), a.join("") + s;
				a.push(x(er(this, l))), l += 1;
			}
			n = a.join("");
			break;
		default: switch (e) {
			case 1: return r = er(this, this.l), this.l++, r;
			case 2: return r = (t === "i" ? nr : tr)(this, this.l), this.l += 2, r;
			case 4:
			case -4: return t === "i" || !(this[this.l + 3] & 128) ? (r = (e > 0 ? ir : ar)(this, this.l), this.l += 4, r) : (i = rr(this, this.l), this.l += 4, i);
			case 8:
			case -8:
				if (t === "f") return i = e == 8 ? Qn(this, this.l) : Qn([
					this[this.l + 7],
					this[this.l + 6],
					this[this.l + 5],
					this[this.l + 4],
					this[this.l + 3],
					this[this.l + 2],
					this[this.l + 1],
					this[this.l + 0]
				], 0), this.l += 8, i;
				e = 8;
			case 16: n = Rn(this, this.l, e);
		}
	}
	return this.l += e, n;
}
var sr = function(e, t, n) {
	e[n] = t & 255, e[n + 1] = t >>> 8 & 255, e[n + 2] = t >>> 16 & 255, e[n + 3] = t >>> 24 & 255;
}, cr = function(e, t, n) {
	e[n] = t & 255, e[n + 1] = t >> 8 & 255, e[n + 2] = t >> 16 & 255, e[n + 3] = t >> 24 & 255;
}, lr = function(e, t, n) {
	e[n] = t & 255, e[n + 1] = t >>> 8 & 255;
};
function ur(e, t, n) {
	var r = 0, i = 0;
	if (n === "dbcs") {
		for (i = 0; i != t.length; ++i) lr(this, t.charCodeAt(i), this.l + 2 * i);
		r = 2 * t.length;
	} else if (n === "sbcs" || n == "cpstr") {
		for (t = t.replace(/[^\x00-\x7F]/g, "_"), i = 0; i != t.length; ++i) this[this.l + i] = t.charCodeAt(i) & 255;
		r = t.length;
	} else if (n === "hex") {
		for (; i < e; ++i) this[this.l++] = parseInt(t.slice(2 * i, 2 * i + 2), 16) || 0;
		return this;
	} else if (n === "utf16le") {
		var a = Math.min(this.l + e, this.length);
		for (i = 0; i < Math.min(t.length, e); ++i) {
			var o = t.charCodeAt(i);
			this[this.l++] = o & 255, this[this.l++] = o >> 8;
		}
		for (; this.l < a;) this[this.l++] = 0;
		return this;
	} else switch (e) {
		case 1:
			r = 1, this[this.l] = t & 255;
			break;
		case 2:
			r = 2, this[this.l] = t & 255, t >>>= 8, this[this.l + 1] = t & 255;
			break;
		case 3:
			r = 3, this[this.l] = t & 255, t >>>= 8, this[this.l + 1] = t & 255, t >>>= 8, this[this.l + 2] = t & 255;
			break;
		case 4:
			r = 4, sr(this, t, this.l);
			break;
		case 8: if (r = 8, n === "f") {
			Mn(this, t, this.l);
			break;
		}
		case 16: break;
		case -4: r = 4, cr(this, t, this.l);
	}
	return this.l += r, this;
}
function dr(e, t) {
	var n = Rn(this, this.l, e.length >> 1);
	if (n !== e) throw Error(t + "Expected " + e + " saw " + n);
	this.l += e.length >> 1;
}
function fr(e, t) {
	e.l = t, e.read_shift = or, e.chk = dr, e.write_shift = ur;
}
function pr(e, t) {
	e.l += t;
}
function mr(e) {
	var t = M(e);
	return fr(t, 0), t;
}
function hr(e, t, n) {
	if (e) {
		var r, i, a;
		fr(e, e.l || 0);
		for (var o = e.length, s = 0, c = 0; e.l < o;) {
			s = e.read_shift(1), s & 128 && (s = (s & 127) + ((e.read_shift(1) & 127) << 7));
			var l = th[s] || th[65535];
			for (r = e.read_shift(1), a = r & 127, i = 1; i < 4 && r & 128; ++i) a += ((r = e.read_shift(1)) & 127) << 7 * i;
			c = e.l + a;
			var u = l.f && l.f(e, a, n);
			if (e.l = c, t(u, l, s)) return;
		}
	}
}
function gr() {
	var e = [], t = k ? 16384 : 2048, n = k && typeof mr(t).subarray == "function", r = function(e) {
		var t = mr(e);
		return fr(t, 0), t;
	}, i = r(t), a = function() {
		i &&= (i.l && (i.length > i.l && (i = i.slice(0, i.l), i.l = i.length), i.length > 0 && e.push(i)), null);
	};
	return {
		next: function(e) {
			return i && e < i.length - i.l ? i : (a(), i = r(Math.max(e + 1, t)));
		},
		push: function(t) {
			i.l > 0 && e.push(i.slice(0, i.l)), e.push(t), i = n ? i.subarray(i.l || 0) : i.slice(i.l || 0), fr(i, 0);
		},
		end: function() {
			return a(), I(e);
		},
		_bufs: e,
		end2: function() {
			return a(), e;
		}
	};
}
function _r(e, t, n) {
	var r = bt(e);
	if (t.s ? (r.cRel && (r.c += t.s.c), r.rRel && (r.r += t.s.r)) : (r.cRel && (r.c += t.c), r.rRel && (r.r += t.r)), !n || n.biff < 12) {
		for (; r.c >= 256;) r.c -= 256;
		for (; r.r >= 65536;) r.r -= 65536;
	}
	return r;
}
function vr(e, t, n) {
	var r = bt(e);
	return r.s = _r(r.s, t.s, n), r.e = _r(r.e, t.s, n), r;
}
function yr(e, t) {
	if (e.cRel && e.c < 0) for (e = bt(e); e.c < 0;) e.c += t > 8 ? 16384 : 256;
	if (e.rRel && e.r < 0) for (e = bt(e); e.r < 0;) e.r += t > 8 ? 1048576 : t > 5 ? 65536 : 16384;
	var n = jr(e);
	return !e.cRel && e.cRel != null && (n = Dr(n)), !e.rRel && e.rRel != null && (n = Cr(n)), n;
}
function br(e, t) {
	return e.s.r == 0 && !e.s.rRel && e.e.r == (t.biff >= 12 ? 1048575 : t.biff >= 8 ? 65536 : 16384) && !e.e.rRel ? (e.s.cRel ? "" : "$") + Er(e.s.c) + ":" + (e.e.cRel ? "" : "$") + Er(e.e.c) : e.s.c == 0 && !e.s.cRel && e.e.c == (t.biff >= 12 ? 16383 : 255) && !e.e.cRel ? (e.s.rRel ? "" : "$") + Sr(e.s.r) + ":" + (e.e.rRel ? "" : "$") + Sr(e.e.r) : yr(e.s, t.biff) + ":" + yr(e.e, t.biff);
}
function xr(e) {
	return parseInt(wr(e), 10) - 1;
}
function Sr(e) {
	return "" + (e + 1);
}
function Cr(e) {
	return e.replace(/([A-Z]|^)(\d+)$/, "$1$$$2");
}
function wr(e) {
	return e.replace(/\$(\d+)$/, "$1");
}
function Tr(e) {
	for (var t = Or(e), n = 0, r = 0; r !== t.length; ++r) n = 26 * n + t.charCodeAt(r) - 64;
	return n - 1;
}
function Er(e) {
	if (e < 0) throw Error("invalid column " + e);
	var t = "";
	for (++e; e; e = Math.floor((e - 1) / 26)) t = String.fromCharCode((e - 1) % 26 + 65) + t;
	return t;
}
function Dr(e) {
	return e.replace(/^([A-Z])/, "$$$1");
}
function Or(e) {
	return e.replace(/^\$([A-Z])/, "$1");
}
function kr(e) {
	return e.replace(/(\$?[A-Z]*)(\$?\d*)/, "$1,$2").split(",");
}
function Ar(e) {
	for (var t = 0, n = 0, r = 0; r < e.length; ++r) {
		var i = e.charCodeAt(r);
		i >= 48 && i <= 57 ? t = 10 * t + (i - 48) : i >= 65 && i <= 90 && (n = 26 * n + (i - 64));
	}
	return {
		c: n - 1,
		r: t - 1
	};
}
function jr(e) {
	for (var t = e.c + 1, n = ""; t; t = (t - 1) / 26 | 0) n = String.fromCharCode((t - 1) % 26 + 65) + n;
	return n + (e.r + 1);
}
function Mr(e) {
	var t = e.indexOf(":");
	return t == -1 ? {
		s: Ar(e),
		e: Ar(e)
	} : {
		s: Ar(e.slice(0, t)),
		e: Ar(e.slice(t + 1))
	};
}
function Z(e, t) {
	return t === void 0 || typeof t == "number" ? Z(e.s, e.e) : (typeof e != "string" && (e = jr(e)), typeof t != "string" && (t = jr(t)), e == t ? e : e + ":" + t);
}
function Nr(e, t) {
	if (!e && !(t && t.biff <= 5 && t.biff >= 2)) throw Error("empty sheet name");
	return /[^\w\u4E00-\u9FFF\u3040-\u30FF]/.test(e) ? "'" + e.replace(/'/g, "''") + "'" : e;
}
function Pr(e) {
	var t = {
		s: {
			c: 0,
			r: 0
		},
		e: {
			c: 0,
			r: 0
		}
	}, n = 0, r = 0, i = 0, a = e.length;
	for (n = 0; r < a && !((i = e.charCodeAt(r) - 64) < 1 || i > 26); ++r) n = 26 * n + i;
	for (t.s.c = --n, n = 0; r < a && !((i = e.charCodeAt(r) - 48) < 0 || i > 9); ++r) n = 10 * n + i;
	if (t.s.r = --n, r === a || i != 10) return t.e.c = t.s.c, t.e.r = t.s.r, t;
	for (++r, n = 0; r != a && !((i = e.charCodeAt(r) - 64) < 1 || i > 26); ++r) n = 26 * n + i;
	for (t.e.c = --n, n = 0; r != a && !((i = e.charCodeAt(r) - 48) < 0 || i > 9); ++r) n = 10 * n + i;
	return t.e.r = --n, t;
}
function Fr(e, t) {
	var n = e.t == "d" && t instanceof Date;
	if (e.z != null) try {
		return e.w = Je(e.z, n ? ft(t) : t);
	} catch {}
	try {
		return e.w = Je((e.XF || {}).numFmtId || (n ? 14 : 0), n ? ft(t) : t);
	} catch {
		return "" + t;
	}
}
function Ir(e, t, n) {
	return e == null || e.t == null || e.t == "z" ? "" : e.w === void 0 ? (e.t == "d" && !e.z && n && n.dateNF && (e.z = n.dateNF), e.t == "e" ? ki[e.v] || e.v : t == null ? Fr(e, e.v) : Fr(e, t)) : e.w;
}
function Lr() {
	return Object.create ? Object.create(null) : {};
}
function Rr(e, t, n) {
	t == "__proto__" && Object.defineProperty ? Object.defineProperty(e, t, {
		value: n,
		configurable: !0,
		enumerable: !0,
		writable: !0
	}) : e[t] = n;
}
function zr(e, t) {
	return e != null && Object.prototype.hasOwnProperty.call(e, t) ? e[t] : void 0;
}
function Br(e, t) {
	var n = t && t.sheet ? t.sheet : "Sheet1", r = Lr();
	return Rr(r, n, e), {
		SheetNames: [n],
		Sheets: r
	};
}
function Vr(e) {
	var t = {};
	return (e || {}).dense && (t["!data"] = []), t;
}
function Hr(e, t, n) {
	var r = n || {}, i = e ? e["!data"] != null : r.dense;
	C != null && i == null && (i = C);
	var a = e || (i ? { "!data": [] } : {});
	i && !a["!data"] && (a["!data"] = []);
	var o = 0, s = 0;
	if (a && r.origin != null) {
		if (typeof r.origin == "number") o = r.origin;
		else {
			var c = typeof r.origin == "string" ? Ar(r.origin) : r.origin;
			o = c.r, s = c.c;
		}
	}
	var l = {
		s: {
			c: 1e7,
			r: 1e7
		},
		e: {
			c: 0,
			r: 0
		}
	};
	if (a["!ref"]) {
		var u = Pr(a["!ref"]);
		l.s.c = u.s.c, l.s.r = u.s.r, l.e.c = Math.max(l.e.c, u.e.c), l.e.r = Math.max(l.e.r, u.e.r), o == -1 && (l.e.r = o = a["!ref"] ? u.e.r + 1 : 0);
	} else l.s.c = l.e.c = l.s.r = l.e.r = 0;
	for (var d = [], f = !1, p = 0; p != t.length; ++p) if (t[p]) {
		if (!Array.isArray(t[p])) throw Error("aoa_to_sheet expects an array of arrays");
		var m = o + p;
		i && (a["!data"][m] || (a["!data"][m] = []), d = a["!data"][m]);
		for (var h = t[p], g = 0; g != h.length; ++g) if (h[g] !== void 0) {
			var _ = {
				v: h[g],
				t: ""
			}, v = s + g;
			if (l.s.r > m && (l.s.r = m), l.s.c > v && (l.s.c = v), l.e.r < m && (l.e.r = m), l.e.c < v && (l.e.c = v), f = !0, h[g] && typeof h[g] == "object" && !Array.isArray(h[g]) && !(h[g] instanceof Date)) _ = h[g];
			else if (Array.isArray(_.v) && (_.f = h[g][1], _.v = _.v[0]), _.v === null) {
				if (_.f) _.t = "n";
				else if (r.nullError) _.t = "e", _.v = 0;
				else if (r.sheetStubs) _.t = "z";
				else continue;
			} else typeof _.v == "number" ? isFinite(_.v) ? _.t = "n" : isNaN(_.v) ? (_.t = "e", _.v = 15) : (_.t = "e", _.v = 7) : typeof _.v == "boolean" ? _.t = "b" : _.v instanceof Date ? (_.z = r.dateNF || W[14], r.UTC || (_.v = Nt(_.v)), r.cellDates ? (_.t = "d", _.w = Je(_.z, ft(_.v, r.date1904))) : (_.t = "n", _.v = ft(_.v, r.date1904), _.w = Je(_.z, _.v))) : _.t = "s";
			if (i) d[v] && d[v].z && (_.z = d[v].z), d[v] = _;
			else {
				var y = Er(v) + (m + 1);
				a[y] && a[y].z && (_.z = a[y].z), a[y] = _;
			}
		}
	}
	return f && l.s.c < 104e5 && (a["!ref"] = Z(l)), a;
}
function Ur(e, t) {
	return Hr(null, e, t);
}
function Wr(e) {
	return e.read_shift(4, "i");
}
function Gr(e) {
	var t = e.read_shift(4);
	return t === 0 ? "" : e.read_shift(t, "dbcs");
}
function Kr(e) {
	return {
		ich: e.read_shift(2),
		ifnt: e.read_shift(2)
	};
}
function qr(e, t) {
	var n = e.l, r = e.read_shift(1), i = Gr(e), a = [], o = {
		t: i,
		h: i
	};
	if (r & 1) {
		for (var s = e.read_shift(4), c = 0; c != s; ++c) a.push(Kr(e));
		o.r = a;
	} else o.r = [{
		ich: 0,
		ifnt: 0
	}];
	return e.l = n + t, o;
}
var Jr = qr;
function Yr(e) {
	var t = e.read_shift(4), n = e.read_shift(2);
	return n += e.read_shift(1) << 16, e.l++, {
		c: t,
		iStyleRef: n
	};
}
function Xr(e) {
	var t = e.read_shift(2);
	return t += e.read_shift(1) << 16, e.l++, {
		c: -1,
		iStyleRef: t
	};
}
var Zr = Gr;
function Qr(e) {
	var t = e.read_shift(4);
	return t === 0 || t === 4294967295 ? "" : e.read_shift(t, "dbcs");
}
var $r = Gr, ei = Qr;
function ti(e) {
	var t = e.slice(e.l, e.l + 4), n = t[0] & 1, r = t[0] & 2;
	e.l += 4;
	var i = r === 0 ? Qn([
		0,
		0,
		0,
		0,
		t[0] & 252,
		t[1],
		t[2],
		t[3]
	], 0) : ir(t, 0) >> 2;
	return n ? i / 100 : i;
}
function ni(e) {
	var t = {
		s: {},
		e: {}
	};
	return t.s.r = e.read_shift(4), t.e.r = e.read_shift(4), t.s.c = e.read_shift(4), t.e.c = e.read_shift(4), t;
}
var ri = ni;
function ii(e) {
	if (e.length - e.l < 8) throw "XLS Xnum Buffer underflow";
	return e.read_shift(8, "f");
}
function ai(e) {
	var t = {}, n = e.read_shift(1) >>> 1, r = e.read_shift(1), i = e.read_shift(2, "i"), a = e.read_shift(1), o = e.read_shift(1), s = e.read_shift(1);
	switch (e.l++, n) {
		case 0:
			t.auto = 1;
			break;
		case 1:
			t.index = r;
			var c = Oi[r];
			c && (t.rgb = tc(c));
			break;
		case 2:
			t.rgb = tc([
				a,
				o,
				s
			]);
			break;
		case 3: t.theme = r;
	}
	return i != 0 && (t.tint = i > 0 ? i / 32767 : i / 32768), t;
}
function oi(e) {
	var t = e.read_shift(1);
	return e.l++, {
		fBold: t & 1,
		fItalic: t & 2,
		fUnderline: t & 4,
		fStrikeout: t & 8,
		fOutline: t & 16,
		fShadow: t & 32,
		fCondense: t & 64,
		fExtend: t & 128
	};
}
function si(e, t) {
	var n = {
		2: "BITMAP",
		3: "METAFILEPICT",
		8: "DIB",
		14: "ENHMETAFILE"
	}, r = e.read_shift(4);
	switch (r) {
		case 0: return "";
		case 4294967295:
		case 4294967294: return n[e.read_shift(4)] || "";
	}
	if (r > 400) throw Error("Unsupported Clipboard: " + r.toString(16));
	return e.l -= 4, e.read_shift(0, t == 1 ? "lpstr" : "lpwstr");
}
function ci(e) {
	return si(e, 1);
}
function li(e) {
	return si(e, 2);
}
var ui = 2, di = 3, fi = 11, pi = 12, mi = 19, hi = 64, gi = 65, _i = 71, vi = 4108, yi = 4126, bi = 80, xi = 81, Si = [bi, xi], Ci = {
	1: {
		n: "CodePage",
		t: ui
	},
	2: {
		n: "Category",
		t: bi
	},
	3: {
		n: "PresentationFormat",
		t: bi
	},
	4: {
		n: "ByteCount",
		t: di
	},
	5: {
		n: "LineCount",
		t: di
	},
	6: {
		n: "ParagraphCount",
		t: di
	},
	7: {
		n: "SlideCount",
		t: di
	},
	8: {
		n: "NoteCount",
		t: di
	},
	9: {
		n: "HiddenCount",
		t: di
	},
	10: {
		n: "MultimediaClipCount",
		t: di
	},
	11: {
		n: "ScaleCrop",
		t: fi
	},
	12: {
		n: "HeadingPairs",
		t: vi
	},
	13: {
		n: "TitlesOfParts",
		t: yi
	},
	14: {
		n: "Manager",
		t: bi
	},
	15: {
		n: "Company",
		t: bi
	},
	16: {
		n: "LinksUpToDate",
		t: fi
	},
	17: {
		n: "CharacterCount",
		t: di
	},
	19: {
		n: "SharedDoc",
		t: fi
	},
	22: {
		n: "HyperlinksChanged",
		t: fi
	},
	23: {
		n: "AppVersion",
		t: di,
		p: "version"
	},
	24: {
		n: "DigSig",
		t: gi
	},
	26: {
		n: "ContentType",
		t: bi
	},
	27: {
		n: "ContentStatus",
		t: bi
	},
	28: {
		n: "Language",
		t: bi
	},
	29: {
		n: "Version",
		t: bi
	},
	255: {},
	2147483648: {
		n: "Locale",
		t: mi
	},
	2147483651: {
		n: "Behavior",
		t: mi
	},
	1919054434: {}
}, wi = {
	1: {
		n: "CodePage",
		t: ui
	},
	2: {
		n: "Title",
		t: bi
	},
	3: {
		n: "Subject",
		t: bi
	},
	4: {
		n: "Author",
		t: bi
	},
	5: {
		n: "Keywords",
		t: bi
	},
	6: {
		n: "Comments",
		t: bi
	},
	7: {
		n: "Template",
		t: bi
	},
	8: {
		n: "LastAuthor",
		t: bi
	},
	9: {
		n: "RevNumber",
		t: bi
	},
	10: {
		n: "EditTime",
		t: hi
	},
	11: {
		n: "LastPrinted",
		t: hi
	},
	12: {
		n: "CreatedDate",
		t: hi
	},
	13: {
		n: "ModifiedDate",
		t: hi
	},
	14: {
		n: "PageCount",
		t: di
	},
	15: {
		n: "WordCount",
		t: di
	},
	16: {
		n: "CharCount",
		t: di
	},
	17: {
		n: "Thumbnail",
		t: _i
	},
	18: {
		n: "Application",
		t: bi
	},
	19: {
		n: "DocSecurity",
		t: di
	},
	255: {},
	2147483648: {
		n: "Locale",
		t: mi
	},
	2147483651: {
		n: "Behavior",
		t: mi
	},
	1919054434: {}
}, Ti = {
	1: "US",
	2: "CA",
	3: "",
	7: "RU",
	20: "EG",
	30: "GR",
	31: "NL",
	32: "BE",
	33: "FR",
	34: "ES",
	36: "HU",
	39: "IT",
	41: "CH",
	43: "AT",
	44: "GB",
	45: "DK",
	46: "SE",
	47: "NO",
	48: "PL",
	49: "DE",
	52: "MX",
	55: "BR",
	61: "AU",
	64: "NZ",
	66: "TH",
	81: "JP",
	82: "KR",
	84: "VN",
	86: "CN",
	90: "TR",
	105: "JS",
	213: "DZ",
	216: "MA",
	218: "LY",
	351: "PT",
	354: "IS",
	358: "FI",
	420: "CZ",
	886: "TW",
	961: "LB",
	962: "JO",
	963: "SY",
	964: "IQ",
	965: "KW",
	966: "SA",
	971: "AE",
	972: "IL",
	974: "QA",
	981: "IR",
	65535: "US"
}, Ei = [
	null,
	"solid",
	"mediumGray",
	"darkGray",
	"lightGray",
	"darkHorizontal",
	"darkVertical",
	"darkDown",
	"darkUp",
	"darkGrid",
	"darkTrellis",
	"lightHorizontal",
	"lightVertical",
	"lightDown",
	"lightUp",
	"lightGrid",
	"lightTrellis",
	"gray125",
	"gray0625"
];
function Di(e) {
	return e.map(function(e) {
		return [
			e >> 16 & 255,
			e >> 8 & 255,
			e & 255
		];
	});
}
var Oi = /*#__PURE__*/ bt(/* @__PURE__ */ Di([
	0,
	16777215,
	16711680,
	65280,
	255,
	16776960,
	16711935,
	65535,
	0,
	16777215,
	16711680,
	65280,
	255,
	16776960,
	16711935,
	65535,
	8388608,
	32768,
	128,
	8421376,
	8388736,
	32896,
	12632256,
	8421504,
	10066431,
	10040166,
	16777164,
	13434879,
	6684774,
	16744576,
	26316,
	13421823,
	128,
	16711935,
	16776960,
	65535,
	8388736,
	8388608,
	32896,
	255,
	52479,
	13434879,
	13434828,
	16777113,
	10079487,
	16751052,
	13408767,
	16764057,
	3368703,
	3394764,
	10079232,
	16763904,
	16750848,
	16737792,
	6710937,
	9868950,
	13158,
	3381606,
	13056,
	3355392,
	10040064,
	10040166,
	3355545,
	3355443,
	0,
	16777215,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0
])), ki = {
	0: "#NULL!",
	7: "#DIV/0!",
	15: "#VALUE!",
	23: "#REF!",
	29: "#NAME?",
	36: "#NUM!",
	42: "#N/A",
	43: "#GETTING_DATA",
	255: "#WTF?"
}, Ai = {
	"#NULL!": 0,
	"#DIV/0!": 7,
	"#VALUE!": 15,
	"#REF!": 23,
	"#NAME?": 29,
	"#NUM!": 36,
	"#N/A": 42,
	"#GETTING_DATA": 43,
	"#WTF?": 255
}, ji = [
	"_xlnm.Consolidate_Area",
	"_xlnm.Auto_Open",
	"_xlnm.Auto_Close",
	"_xlnm.Extract",
	"_xlnm.Database",
	"_xlnm.Criteria",
	"_xlnm.Print_Area",
	"_xlnm.Print_Titles",
	"_xlnm.Recorder",
	"_xlnm.Data_Form",
	"_xlnm.Auto_Activate",
	"_xlnm.Auto_Deactivate",
	"_xlnm.Sheet_Title",
	"_xlnm._FilterDatabase"
], Mi = {
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": "workbooks",
	"application/vnd.ms-excel.sheet.macroEnabled.main+xml": "workbooks",
	"application/vnd.ms-excel.sheet.binary.macroEnabled.main": "workbooks",
	"application/vnd.ms-excel.addin.macroEnabled.main+xml": "workbooks",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": "workbooks",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": "sheets",
	"application/vnd.ms-excel.worksheet": "sheets",
	"application/vnd.ms-excel.binIndexWs": "TODO",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": "charts",
	"application/vnd.ms-excel.chartsheet": "charts",
	"application/vnd.ms-excel.macrosheet+xml": "macros",
	"application/vnd.ms-excel.macrosheet": "macros",
	"application/vnd.ms-excel.intlmacrosheet": "TODO",
	"application/vnd.ms-excel.binIndexMs": "TODO",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": "dialogs",
	"application/vnd.ms-excel.dialogsheet": "dialogs",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml": "strs",
	"application/vnd.ms-excel.sharedStrings": "strs",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": "styles",
	"application/vnd.ms-excel.styles": "styles",
	"application/vnd.openxmlformats-package.core-properties+xml": "coreprops",
	"application/vnd.openxmlformats-officedocument.custom-properties+xml": "custprops",
	"application/vnd.openxmlformats-officedocument.extended-properties+xml": "extprops",
	"application/vnd.openxmlformats-officedocument.customXmlProperties+xml": "TODO",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.customProperty": "TODO",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": "comments",
	"application/vnd.ms-excel.comments": "comments",
	"application/vnd.ms-excel.threadedcomments+xml": "threadedcomments",
	"application/vnd.ms-excel.person+xml": "people",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml": "metadata",
	"application/vnd.ms-excel.sheetMetadata": "metadata",
	"application/vnd.ms-excel.pivotTable": "TODO",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml": "TODO",
	"application/vnd.openxmlformats-officedocument.drawingml.chart+xml": "TODO",
	"application/vnd.ms-office.chartcolorstyle+xml": "TODO",
	"application/vnd.ms-office.chartstyle+xml": "TODO",
	"application/vnd.ms-office.chartex+xml": "TODO",
	"application/vnd.ms-excel.calcChain": "calcchains",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.calcChain+xml": "calcchains",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.printerSettings": "TODO",
	"application/vnd.ms-office.activeX": "TODO",
	"application/vnd.ms-office.activeX+xml": "TODO",
	"application/vnd.ms-excel.attachedToolbars": "TODO",
	"application/vnd.ms-excel.connections": "TODO",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": "TODO",
	"application/vnd.ms-excel.externalLink": "links",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.externalLink+xml": "links",
	"application/vnd.ms-excel.pivotCacheDefinition": "TODO",
	"application/vnd.ms-excel.pivotCacheRecords": "TODO",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheDefinition+xml": "TODO",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheRecords+xml": "TODO",
	"application/vnd.ms-excel.queryTable": "TODO",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.queryTable+xml": "TODO",
	"application/vnd.ms-excel.userNames": "TODO",
	"application/vnd.ms-excel.revisionHeaders": "TODO",
	"application/vnd.ms-excel.revisionLog": "TODO",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionHeaders+xml": "TODO",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionLog+xml": "TODO",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.userNames+xml": "TODO",
	"application/vnd.ms-excel.tableSingleCells": "TODO",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.tableSingleCells+xml": "TODO",
	"application/vnd.ms-excel.slicer": "TODO",
	"application/vnd.ms-excel.slicerCache": "TODO",
	"application/vnd.ms-excel.slicer+xml": "TODO",
	"application/vnd.ms-excel.slicerCache+xml": "TODO",
	"application/vnd.ms-excel.wsSortMap": "TODO",
	"application/vnd.ms-excel.table": "TODO",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": "TODO",
	"application/vnd.openxmlformats-officedocument.theme+xml": "themes",
	"application/vnd.openxmlformats-officedocument.themeOverride+xml": "TODO",
	"application/vnd.ms-excel.Timeline+xml": "TODO",
	"application/vnd.ms-excel.TimelineCache+xml": "TODO",
	"application/vnd.ms-office.vbaProject": "vba",
	"application/vnd.ms-office.vbaProjectSignature": "TODO",
	"application/vnd.ms-office.volatileDependencies": "TODO",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.volatileDependencies+xml": "TODO",
	"application/vnd.ms-excel.controlproperties+xml": "TODO",
	"application/vnd.openxmlformats-officedocument.model+data": "TODO",
	"application/vnd.ms-excel.Survey+xml": "TODO",
	"application/vnd.openxmlformats-officedocument.drawing+xml": "drawings",
	"application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": "TODO",
	"application/vnd.openxmlformats-officedocument.drawingml.diagramColors+xml": "TODO",
	"application/vnd.openxmlformats-officedocument.drawingml.diagramData+xml": "TODO",
	"application/vnd.openxmlformats-officedocument.drawingml.diagramLayout+xml": "TODO",
	"application/vnd.openxmlformats-officedocument.drawingml.diagramStyle+xml": "TODO",
	"application/vnd.openxmlformats-officedocument.vmlDrawing": "TODO",
	"application/vnd.openxmlformats-package.relationships+xml": "rels",
	"application/vnd.openxmlformats-officedocument.oleObject": "TODO",
	"image/png": "TODO",
	sheet: "js"
};
function Ni() {
	return {
		workbooks: [],
		sheets: [],
		charts: [],
		dialogs: [],
		macros: [],
		rels: [],
		strs: [],
		comments: [],
		threadedcomments: [],
		links: [],
		coreprops: [],
		extprops: [],
		custprops: [],
		themes: [],
		styles: [],
		calcchains: [],
		vba: [],
		drawings: [],
		metadata: [],
		people: [],
		TODO: [],
		xmlns: ""
	};
}
function Pi(e) {
	var t = Ni();
	if (!e || !e.match) return t;
	var n = {};
	if ((e.match(an) || []).forEach(function(e) {
		var r = J(e);
		switch (r[0].replace(on, "<")) {
			case "<?xml": break;
			case "<Types":
				t.xmlns = r["xmlns" + (r[0].match(/<(\w+):/) || ["", ""])[1]];
				break;
			case "<Default":
				n[r.Extension.toLowerCase()] = r.ContentType;
				break;
			case "<Override": t[Mi[r.ContentType]] !== void 0 && t[Mi[r.ContentType]].push(r.PartName);
		}
	}), t.xmlns !== kn.CT) throw Error("Unknown Namespace: " + t.xmlns);
	return t.calcchain = t.calcchains.length > 0 ? t.calcchains[0] : "", t.sst = t.strs.length > 0 ? t.strs[0] : "", t.style = t.styles.length > 0 ? t.styles[0] : "", t.defaults = n, delete t.calcchains, t;
}
var Fi = {
	WB: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
	SHEET: "http://sheetjs.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
	HLINK: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
	VML: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/vmlDrawing",
	XPATH: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLinkPath",
	XMISS: "http://schemas.microsoft.com/office/2006/relationships/xlExternalLinkPath/xlPathMissing",
	XLINK: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLink",
	CXML: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXml",
	CXMLP: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXmlProps",
	CMNT: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments",
	CORE_PROPS: "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties",
	EXT_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties",
	CUST_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties",
	SST: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings",
	STY: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles",
	THEME: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme",
	CHART: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart",
	CHARTEX: "http://schemas.microsoft.com/office/2014/relationships/chartEx",
	CS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chartsheet",
	WS: ["http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet", "http://purl.oclc.org/ooxml/officeDocument/relationships/worksheet"],
	DS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/dialogsheet",
	MS: "http://schemas.microsoft.com/office/2006/relationships/xlMacrosheet",
	IMG: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
	DRAW: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing",
	TABLE: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/table",
	XLMETA: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sheetMetadata",
	TCMNT: "http://schemas.microsoft.com/office/2017/10/relationships/threadedComment",
	PEOPLE: "http://schemas.microsoft.com/office/2017/10/relationships/person",
	CONN: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/connections",
	VBA: "http://schemas.microsoft.com/office/2006/relationships/vbaProject"
};
function Ii(e) {
	var t = e.lastIndexOf("/");
	return e.slice(0, t + 1) + "_rels/" + e.slice(t + 1) + ".rels";
}
function Li(e, t) {
	var n = { "!id": {} };
	if (!e) return n;
	t.charAt(0) !== "/" && (t = "/" + t);
	var r = {};
	return (e.match(an) || []).forEach(function(e) {
		var i = J(e);
		if (i[0] === "<Relationship") {
			var a = {};
			a.Type = i.Type, a.Target = Y(i.Target), a.Id = i.Id, i.TargetMode && (a.TargetMode = i.TargetMode);
			var o = i.TargetMode === "External" ? i.Target : en(i.Target, t);
			n[o] = a, r[i.Id] = a;
		}
	}), n["!id"] = r, n;
}
var Ri = "application/vnd.oasis.opendocument.spreadsheet";
function zi(e, t) {
	for (var n = Dn(e), r, i; r = On.exec(n);) switch (r[3]) {
		case "manifest": break;
		case "file-entry":
			if (i = J(r[0], !1), i.path == "/" && i.type !== Ri) throw Error("This OpenDocument is not a spreadsheet");
			break;
		case "encryption-data":
		case "algorithm":
		case "start-key-generation":
		case "key-derivation": throw Error("Unsupported ODS Encryption");
		default: if (t && t.WTF) throw r;
	}
}
var Bi = [
	["cp:category", "Category"],
	["cp:contentStatus", "ContentStatus"],
	["cp:keywords", "Keywords"],
	["cp:lastModifiedBy", "LastAuthor"],
	["cp:lastPrinted", "LastPrinted"],
	["cp:revision", "RevNumber"],
	["cp:version", "Version"],
	["dc:creator", "Author"],
	["dc:description", "Comments"],
	["dc:identifier", "Identifier"],
	["dc:language", "Language"],
	["dc:subject", "Subject"],
	["dc:title", "Title"],
	[
		"dcterms:created",
		"CreatedDate",
		"date"
	],
	[
		"dcterms:modified",
		"ModifiedDate",
		"date"
	]
];
function Vi(e) {
	var t = {};
	e = xn(e);
	for (var n = 0; n < Bi.length; ++n) {
		var r = Bi[n], i = Rt(e, r[0]);
		i != null && i.length > 0 && (t[r[1]] = Y(i[1])), r[2] === "date" && t[r[1]] && (t[r[1]] = vt(t[r[1]]));
	}
	return t;
}
var Hi = [
	[
		"Application",
		"Application",
		"string"
	],
	[
		"AppVersion",
		"AppVersion",
		"string"
	],
	[
		"Company",
		"Company",
		"string"
	],
	[
		"DocSecurity",
		"DocSecurity",
		"string"
	],
	[
		"Manager",
		"Manager",
		"string"
	],
	[
		"HyperlinksChanged",
		"HyperlinksChanged",
		"bool"
	],
	[
		"SharedDoc",
		"SharedDoc",
		"bool"
	],
	[
		"LinksUpToDate",
		"LinksUpToDate",
		"bool"
	],
	[
		"ScaleCrop",
		"ScaleCrop",
		"bool"
	],
	[
		"HeadingPairs",
		"HeadingPairs",
		"raw"
	],
	[
		"TitlesOfParts",
		"TitlesOfParts",
		"raw"
	]
];
function Ui(e, t, n, r) {
	var i = [];
	if (typeof e == "string") i = En(e, r);
	else for (var a = 0; a < e.length; ++a) i = i.concat(e[a].map(function(e) {
		return { v: e };
	}));
	var o = typeof t == "string" ? En(t, r).map(function(e) {
		return e.v;
	}) : t, s = 0, c = 0;
	if (o.length > 0) for (var l = 0; l !== i.length; l += 2) {
		switch (c = +i[l + 1].v, i[l].v) {
			case "Worksheets":
			case "工作表":
			case "Листы":
			case "أوراق العمل":
			case "ワークシート":
			case "גליונות עבודה":
			case "Arbeitsblätter":
			case "Çalışma Sayfaları":
			case "Feuilles de calcul":
			case "Fogli di lavoro":
			case "Folhas de cálculo":
			case "Planilhas":
			case "Regneark":
			case "Hojas de cálculo":
			case "Werkbladen":
				n.Worksheets = c, n.SheetNames = o.slice(s, s + c);
				break;
			case "Named Ranges":
			case "Rangos con nombre":
			case "名前付き一覧":
			case "Benannte Bereiche":
			case "Navngivne områder":
				n.NamedRanges = c, n.DefinedNames = o.slice(s, s + c);
				break;
			case "Charts":
			case "Diagramme": n.Chartsheets = c, n.ChartNames = o.slice(s, s + c);
		}
		s += c;
	}
}
function Wi(e, t, n) {
	var r = {};
	return t ||= {}, e = xn(e), Hi.forEach(function(n) {
		var i = (zt(e, n[0]) || [])[1];
		switch (n[2]) {
			case "string":
				i && (t[n[1]] = Y(i));
				break;
			case "bool":
				t[n[1]] = i === "true";
				break;
			case "raw":
				var a = Rt(e, n[0]);
				a && a.length > 0 && (r[n[1]] = a[1]);
		}
	}), r.HeadingPairs && r.TitlesOfParts && Ui(r.HeadingPairs, r.TitlesOfParts, t, n), t;
}
var Gi = /<[^<>]+>[^<]*/g;
function Ki(e, t) {
	var n = {}, r = "", i = e.match(Gi);
	if (i) for (var a = 0; a != i.length; ++a) {
		var o = i[a], s = J(o);
		switch (ln(s[0])) {
			case "<?xml": break;
			case "<Properties": break;
			case "<property":
				r = Y(s.name);
				break;
			case "</property>":
				r = null;
				break;
			default: if (o.indexOf("<vt:") === 0) {
				var c = o.split(">"), l = c[0].slice(4), u = c[1];
				switch (l) {
					case "lpstr":
					case "bstr":
					case "lpwstr":
						n[r] = Y(u);
						break;
					case "bool":
						n[r] = X(u);
						break;
					case "i1":
					case "i2":
					case "i4":
					case "i8":
					case "int":
					case "uint":
						n[r] = parseInt(u, 10);
						break;
					case "r4":
					case "r8":
					case "decimal":
						n[r] = parseFloat(u);
						break;
					case "filetime":
					case "date":
						n[r] = vt(u);
						break;
					case "cy":
					case "error":
						n[r] = Y(u);
						break;
					default:
						if (l.slice(-1) == "/") break;
						t.WTF && typeof console < "u" && console.warn("Unexpected", o, l, c);
				}
			} else if (o.slice(0, 2) !== "</" && t.WTF) throw Error(o);
		}
	}
	return n;
}
var qi = {
	Title: "Title",
	Subject: "Subject",
	Author: "Author",
	Keywords: "Keywords",
	Comments: "Description",
	LastAuthor: "LastAuthor",
	RevNumber: "Revision",
	Application: "AppName",
	LastPrinted: "LastPrinted",
	CreatedDate: "Created",
	ModifiedDate: "LastSaved",
	Category: "Category",
	Manager: "Manager",
	Company: "Company",
	AppVersion: "Version",
	ContentStatus: "ContentStatus",
	Identifier: "Identifier",
	Language: "Language"
}, Ji;
function Yi(e, t, n) {
	Ji ||= ct(qi), t = Ji[t] || t, e[t] = n;
}
function Xi(e) {
	var t = e.read_shift(4), n = e.read_shift(4);
	return (/* @__PURE__ */ new Date((n / 1e7 * 2 ** 32 + t / 1e7 - 11644473600) * 1e3)).toISOString().replace(/\.000/, "");
}
function Zi(e, t, n) {
	var r = e.l, i = e.read_shift(0, "lpstr-cp");
	if (n) for (; e.l - r & 3;) ++e.l;
	return i;
}
function Qi(e, t, n) {
	var r = e.read_shift(0, "lpwstr");
	return n && (e.l += 4 - (r.length + 1 & 3) & 3), r;
}
function $i(e, t, n) {
	return t === 31 ? Qi(e) : Zi(e, t, n);
}
function ea(e, t, n) {
	return $i(e, t, n === !1 ? 0 : 4);
}
function ta(e, t) {
	if (!t) throw Error("VtUnalignedString must have positive length");
	return $i(e, t, 0);
}
function na(e) {
	for (var t = e.read_shift(4), n = [], r = 0; r != t; ++r) {
		var i = e.l;
		n[r] = e.read_shift(0, "lpwstr").replace(R, ""), e.l - i & 2 && (e.l += 2);
	}
	return n;
}
function ra(e) {
	for (var t = e.read_shift(4), n = [], r = 0; r != t; ++r) n[r] = e.read_shift(0, "lpstr-cp").replace(R, "");
	return n;
}
function ia(e) {
	var t = e.l, n = la(e, xi);
	return e[e.l] == 0 && e[e.l + 1] == 0 && e.l - t & 2 && (e.l += 2), [n, la(e, di)];
}
function aa(e) {
	for (var t = e.read_shift(4), n = [], r = 0; r < t / 2; ++r) n.push(ia(e));
	return n;
}
function oa(e, t) {
	for (var n = e.read_shift(4), r = {}, i = 0; i != n; ++i) {
		var a = e.read_shift(4), o = e.read_shift(4);
		r[a] = e.read_shift(o, t === 1200 ? "utf16le" : "utf8").replace(R, "").replace(te, "!"), t === 1200 && o % 2 && (e.l += 2);
	}
	return e.l & 3 && (e.l = e.l >> 3 << 2), r;
}
function sa(e) {
	var t = e.read_shift(4), n = e.slice(e.l, e.l + t);
	return e.l += t, (t & 3) > 0 && (e.l += 4 - (t & 3) & 3), n;
}
function ca(e) {
	var t = {};
	return t.Size = e.read_shift(4), e.l += t.Size + 3 - (t.Size - 1) % 4, t;
}
function la(e, t, n) {
	var r = e.read_shift(2), i, a = n || {};
	if (e.l += 2, t !== pi && r !== t && Si.indexOf(t) === -1 && ((t & 65534) != 4126 || (r & 65534) != 4126)) throw Error("Expected type " + t + " saw " + r);
	switch (t === pi ? r : t) {
		case 2: return i = e.read_shift(2, "i"), a.raw || (e.l += 2), i;
		case 3: return i = e.read_shift(4, "i"), i;
		case 11: return e.read_shift(4) !== 0;
		case 19: return i = e.read_shift(4), i;
		case 30: return e.l += 4, ea(e, e[e.l - 4]).replace(/(^|[^\u0000])\u0000+$/, "$1");
		case 31: return e.l += 4, ea(e, e[e.l - 4]).replace(/(^|[^\u0000])\u0000+$/, "$1");
		case 64: return Xi(e);
		case 65: return sa(e);
		case 71: return ca(e);
		case 80: return ea(e, r, !a.raw).replace(R, "");
		case 81: return ta(e, r).replace(R, "");
		case 4108: return aa(e);
		case 4126:
		case 4127: return r == 4127 ? na(e) : ra(e);
		default: throw Error("TypedPropertyValue unrecognized type " + t + " " + r);
	}
}
function ua(e, t) {
	var n = e.l, r = e.read_shift(4), i = e.read_shift(4), a = [], o = 0, s = 0, c = -1, l = {};
	for (o = 0; o != i; ++o) {
		var u = e.read_shift(4), d = e.read_shift(4);
		a[o] = [u, d + n];
	}
	a.sort(function(e, t) {
		return e[1] - t[1];
	});
	var f = {};
	for (o = 0; o != i; ++o) {
		if (e.l !== a[o][1]) {
			var p = !0;
			if (o > 0 && t) switch (t[a[o - 1][0]].t) {
				case 2:
					e.l + 2 === a[o][1] && (e.l += 2, p = !1);
					break;
				case 80:
					e.l <= a[o][1] && (e.l = a[o][1], p = !1);
					break;
				case 4108: e.l <= a[o][1] && (e.l = a[o][1], p = !1);
			}
			if ((!t || o == 0) && e.l <= a[o][1] && (p = !1, e.l = a[o][1]), p) throw Error("Read Error: Expected address " + a[o][1] + " at " + e.l + " :" + o);
		}
		if (t) {
			if (a[o][0] == 0 && a.length > o + 1 && a[o][1] == a[o + 1][1]) continue;
			var h = t[a[o][0]];
			if (f[h.n] = la(e, h.t, { raw: !0 }), h.p === "version" && (f[h.n] = String(f[h.n] >> 16) + "." + ("0000" + String(f[h.n] & 65535)).slice(-4)), h.n == "CodePage") switch (f[h.n]) {
				case 0: f[h.n] = 1252;
				case 874:
				case 932:
				case 936:
				case 949:
				case 950:
				case 1250:
				case 1251:
				case 1253:
				case 1254:
				case 1255:
				case 1256:
				case 1257:
				case 1258:
				case 1e4:
				case 1200:
				case 1201:
				case 1252:
				case 65e3:
				case -536:
				case 65001:
				case -535:
					m(s = f[h.n] >>> 0 & 65535);
					break;
				default: throw Error("Unsupported CodePage: " + f[h.n]);
			}
		} else if (a[o][0] === 1) {
			if (s = f.CodePage = la(e, ui), m(s), c !== -1) {
				var g = e.l;
				e.l = a[c][1], l = oa(e, s), e.l = g;
			}
		} else if (a[o][0] === 0) {
			if (s === 0) {
				c = o, e.l = a[o + 1][1];
				continue;
			}
			l = oa(e, s);
		} else {
			var _ = l[a[o][0]], v;
			switch (e[e.l]) {
				case 65:
					e.l += 4, v = sa(e);
					break;
				case 30:
					e.l += 4, v = ea(e, e[e.l - 4]).replace(/(^|[^\u0000])\u0000+$/, "$1");
					break;
				case 31:
					e.l += 4, v = ea(e, e[e.l - 4]).replace(/(^|[^\u0000])\u0000+$/, "$1");
					break;
				case 3:
					e.l += 4, v = e.read_shift(4, "i");
					break;
				case 19:
					e.l += 4, v = e.read_shift(4);
					break;
				case 5:
					e.l += 4, v = e.read_shift(8, "f");
					break;
				case 11:
					e.l += 4, v = ma(e, 4);
					break;
				case 64:
					e.l += 4, v = vt(Xi(e));
					break;
				default: throw Error("unparsed value: " + e[e.l]);
			}
			f[_] = v;
		}
	}
	return e.l = n + r, f;
}
function da(e, t, n) {
	var r = e.content;
	if (!r) return {};
	fr(r, 0);
	var i, a, o, s, c = 0;
	r.chk("feff", "Byte Order: "), r.read_shift(2);
	var l = r.read_shift(4), u = r.read_shift(16);
	if (u !== it.utils.consts.HEADER_CLSID && u !== n) throw Error("Bad PropertySet CLSID " + u);
	if (i = r.read_shift(4), i !== 1 && i !== 2) throw Error("Unrecognized #Sets: " + i);
	if (a = r.read_shift(16), s = r.read_shift(4), i === 1 && s !== r.l) throw Error("Length mismatch: " + s + " !== " + r.l);
	i === 2 && (o = r.read_shift(16), c = r.read_shift(4));
	var d = ua(r, t), f = { SystemIdentifier: l };
	for (var p in d) f[p] = d[p];
	if (f.FMTID = a, i === 1) return f;
	if (c - r.l == 2 && (r.l += 2), r.l !== c) throw Error("Length mismatch 2: " + r.l + " !== " + c);
	var m;
	try {
		m = ua(r, null);
	} catch {}
	for (p in m) f[p] = m[p];
	return f.FMTID = [a, o], f;
}
function fa(e, t) {
	return e.read_shift(t), null;
}
function pa(e, t, n) {
	for (var r = [], i = e.l + t; e.l < i;) r.push(n(e, i - e.l));
	if (i !== e.l) throw Error("Slurp error");
	return r;
}
function ma(e, t) {
	return e.read_shift(t) === 1;
}
function ha(e) {
	return e.read_shift(2, "u");
}
function ga(e, t) {
	return pa(e, t, ha);
}
function _a(e) {
	var t = e.read_shift(1);
	return e.read_shift(1) === 1 ? t : t === 1;
}
function va(e, t, n) {
	var r = e.read_shift(n && n.biff >= 12 ? 2 : 1), i = "sbcs-cont", a = l;
	n && n.biff >= 8 && (l = 1200), !n || n.biff == 8 ? e.read_shift(1) && (i = "dbcs-cont") : n.biff == 12 && (i = "wstr"), n.biff >= 2 && n.biff <= 5 && (i = "cpstr");
	var o = r ? e.read_shift(r, i) : "";
	return l = a, o;
}
function ya(e) {
	var t = l;
	l = 1200;
	var n = e.read_shift(2), r = e.read_shift(1), i = r & 4, a = r & 8, o = 1 + (r & 1), s = 0, c, u = {};
	a && (s = e.read_shift(2)), i && (c = e.read_shift(4));
	var d = o == 2 ? "dbcs-cont" : "sbcs-cont", f = n === 0 ? "" : e.read_shift(n, d);
	return a && (e.l += 4 * s), i && (e.l += c), u.t = f, a || (u.raw = "<t>" + u.t + "</t>", u.r = u.t), l = t, u;
}
function ba(e, t, n) {
	var r;
	if (n) {
		if (n.biff >= 2 && n.biff <= 5) return e.read_shift(t, "cpstr");
		if (n.biff >= 12) return e.read_shift(t, "dbcs-cont");
	}
	return r = e.read_shift(1) === 0 ? e.read_shift(t, "sbcs-cont") : e.read_shift(t, "dbcs-cont"), r;
}
function xa(e, t, n) {
	var r = e.read_shift(n && n.biff == 2 ? 1 : 2);
	return r === 0 ? (n.biff <= 8 && e.l++, "") : ba(e, r, n);
}
function Sa(e, t, n) {
	if (n.biff > 5) return xa(e, t, n);
	var r = e.read_shift(1);
	return r === 0 ? (e.l++, "") : e.read_shift(r, n.biff <= 4 || !e.lens ? "cpstr" : "sbcs-cont");
}
function Ca(e) {
	var t = e.read_shift(1);
	e.l++;
	var n = e.read_shift(2);
	return e.l += 2, [t, n];
}
function wa(e) {
	var t = e.read_shift(4), n = e.l, r = !1;
	t > 24 && (e.l += t - 24, e.read_shift(16) === "795881f43b1d7f48af2c825dc4852763" && (r = !0), e.l = n);
	var i = e.read_shift((r ? t - 24 : t) >> 1, "utf16le").replace(R, "");
	return r && (e.l += 24), i;
}
function Ta(e) {
	for (var t = e.read_shift(2), n = ""; t-- > 0;) n += "../";
	var r = e.read_shift(0, "lpstr-ansi");
	if (e.l += 2, e.read_shift(2) != 57005) throw Error("Bad FileMoniker");
	if (e.read_shift(4) === 0) return n + r.replace(/\\/g, "/");
	var i = e.read_shift(4);
	if (e.read_shift(2) != 3) throw Error("Bad FileMoniker");
	var a = e.read_shift(i >> 1, "utf16le").replace(R, "");
	return n + a;
}
function Ea(e, t) {
	var n = e.read_shift(16);
	switch (t -= 16, n) {
		case "e0c9ea79f9bace118c8200aa004ba90b": return wa(e, t);
		case "0303000000000000c000000000000046": return Ta(e, t);
		default: throw Error("Unsupported Moniker " + n);
	}
}
function Da(e) {
	var t = e.read_shift(4);
	return t > 0 ? e.read_shift(t, "utf16le").replace(R, "") : "";
}
function Oa(e, t) {
	var n = e.l + t, r = e.read_shift(4);
	if (r !== 2) throw Error("Unrecognized streamVersion: " + r);
	var i = e.read_shift(2);
	e.l += 2;
	var a, o, s, c, l = "", u, d;
	i & 16 && (a = Da(e, n - e.l)), i & 128 && (o = Da(e, n - e.l)), (i & 257) == 257 && (s = Da(e, n - e.l)), (i & 257) == 1 && (c = Ea(e, n - e.l)), i & 8 && (l = Da(e, n - e.l)), i & 32 && (u = e.read_shift(16)), i & 64 && (d = Xi(e)), e.l = n;
	var f = o || s || c || "";
	f && l && (f += "#" + l), f ||= "#" + l, i & 2 && f.charAt(0) == "/" && f.charAt(1) != "/" && (f = "file://" + f);
	var p = { Target: f };
	return u && (p.guid = u), d && (p.time = d), a && (p.Tooltip = a), p;
}
function ka(e) {
	return [
		e.read_shift(1),
		e.read_shift(1),
		e.read_shift(1),
		e.read_shift(1)
	];
}
function Aa(e, t) {
	var n = ka(e, t);
	return n[3] = 0, n;
}
function ja(e, t, n) {
	var r = {
		r: e.read_shift(2),
		c: e.read_shift(2),
		ixfe: 0
	};
	return n && n.biff == 2 || t == 7 ? (r.ixfe = e.read_shift(1) & 63, e.l += 2) : r.ixfe = e.read_shift(2), r;
}
function Ma(e) {
	var t = e.read_shift(2), n = e.read_shift(2);
	return e.l += 8, {
		type: t,
		flags: n
	};
}
function Na(e, t, n) {
	return t === 0 ? "" : Sa(e, t, n);
}
function Pa(e, t, n) {
	var r = n.biff > 8 ? 4 : 2;
	return [
		e.read_shift(r),
		e.read_shift(r, "i"),
		e.read_shift(r, "i")
	];
}
function Fa(e) {
	return [e.read_shift(2), ti(e)];
}
function Ia(e, t, n) {
	e.l += 4, t -= 4;
	var r = e.l + t, i = va(e, t, n), a = e.read_shift(2);
	if (r -= e.l, a !== r) throw Error("Malformed AddinUdf: padding = " + r + " != " + a);
	return e.l += a, i;
}
function La(e) {
	var t = e.read_shift(2), n = e.read_shift(2), r = e.read_shift(2), i = e.read_shift(2);
	return {
		s: {
			c: r,
			r: t
		},
		e: {
			c: i,
			r: n
		}
	};
}
function Ra(e) {
	var t = e.read_shift(2), n = e.read_shift(2), r = e.read_shift(1), i = e.read_shift(1);
	return {
		s: {
			c: r,
			r: t
		},
		e: {
			c: i,
			r: n
		}
	};
}
var za = Ra;
function Ba(e) {
	e.l += 4;
	var t = e.read_shift(2), n = e.read_shift(2), r = e.read_shift(2);
	return e.l += 12, [
		n,
		t,
		r
	];
}
function Va(e) {
	var t = {};
	return e.l += 4, e.l += 16, t.fSharedNote = e.read_shift(2), e.l += 4, t;
}
function Ha(e) {
	return e.l += 4, e.cf = e.read_shift(2), {};
}
function Ua(e) {
	e.l += 2, e.l += e.read_shift(2);
}
var Wa = {
	0: Ua,
	4: Ua,
	5: Ua,
	6: Ua,
	7: Ha,
	8: Ua,
	9: Ua,
	10: Ua,
	11: Ua,
	12: Ua,
	13: Va,
	14: Ua,
	15: Ua,
	16: Ua,
	17: Ua,
	18: Ua,
	19: Ua,
	20: Ua,
	21: Ba
};
function Ga(e, t) {
	for (var n = e.l + t, r = []; e.l < n;) {
		var i = e.read_shift(2);
		e.l -= 2;
		try {
			r[i] = Wa[i](e, n - e.l);
		} catch {
			return e.l = n, r;
		}
	}
	return e.l != n && (e.l = n), r;
}
function Ka(e, t) {
	var n = {
		BIFFVer: 0,
		dt: 0
	};
	switch (n.BIFFVer = e.read_shift(2), t -= 2, t >= 2 && (n.dt = e.read_shift(2), e.l -= 2), n.BIFFVer) {
		case 1536:
		case 1280:
		case 1024:
		case 768:
		case 512:
		case 2:
		case 7: break;
		default: if (t > 6) throw Error("Unexpected BIFF Ver " + n.BIFFVer);
	}
	return e.read_shift(t), n;
}
function qa(e, t) {
	return t === 0 || e.read_shift(2), 1200;
}
function Ja(e, t, n) {
	if (n.enc) return e.l += t, "";
	var r = e.l, i = Sa(e, 0, n);
	return e.read_shift(t + r - e.l), i;
}
function Ya(e, t, n) {
	var r = n && n.biff == 8 || t == 2 ? e.read_shift(2) : (e.l += t, 0);
	return {
		fDialog: r & 16,
		fBelow: r & 64,
		fRight: r & 128
	};
}
function Xa(e, t, n) {
	var r = "";
	if (n.biff == 4) return r = va(e, 0, n), r.length === 0 && (r = "Sheet1"), { name: r };
	var i = e.read_shift(4), a = e.read_shift(1) & 3, o = e.read_shift(1);
	switch (o) {
		case 0:
			o = "Worksheet";
			break;
		case 1:
			o = "Macrosheet";
			break;
		case 2:
			o = "Chartsheet";
			break;
		case 6: o = "VBAModule";
	}
	return r = va(e, 0, n), r.length === 0 && (r = "Sheet1"), {
		pos: i,
		hs: a,
		dt: o,
		name: r
	};
}
function Za(e, t) {
	for (var n = e.l + t, r = e.read_shift(4), i = e.read_shift(4), a = [], o = 0; o != i && e.l < n; ++o) a.push(ya(e));
	return a.Count = r, a.Unique = i, a;
}
function Qa(e, t) {
	var n = {};
	return n.dsst = e.read_shift(2), e.l += t - 2, n;
}
function $a(e) {
	var t = {};
	t.r = e.read_shift(2), t.c = e.read_shift(2), t.cnt = e.read_shift(2) - t.c;
	var n = e.read_shift(2);
	e.l += 4;
	var r = e.read_shift(1);
	e.l += 1;
	var i = e.read_shift(2);
	return t.ixfe = i & 4095, t.flags = i >> 12 & 15, r & 7 && (t.level = r & 7), r & 32 && (t.hidden = !0), r & 64 && (t.hpt = n / 20), t;
}
function eo(e) {
	var t = Ma(e);
	if (t.type != 2211) throw Error("Invalid Future Record " + t.type);
	return e.read_shift(4) !== 0;
}
function to(e) {
	return e.read_shift(2), e.read_shift(4);
}
function no(e, t, n) {
	var r = 0;
	n && n.biff == 2 || (r = e.read_shift(2));
	var i = e.read_shift(2);
	return n && n.biff == 2 && (r = 1 - (i >> 15), i &= 32767), [{
		Unsynced: r & 1,
		DyZero: (r & 2) >> 1,
		ExAsc: (r & 4) >> 2,
		ExDsc: (r & 8) >> 3
	}, i];
}
function ro(e) {
	var t = e.read_shift(2), n = e.read_shift(2), r = e.read_shift(2), i = e.read_shift(2), a = e.read_shift(2), o = e.read_shift(2), s = e.read_shift(2), c = e.read_shift(2), l = e.read_shift(2);
	return {
		Pos: [t, n],
		Dim: [r, i],
		Flags: a,
		CurTab: o,
		FirstTab: s,
		Selected: c,
		TabRatio: l
	};
}
function io(e, t, n) {
	return n && n.biff >= 2 && n.biff < 5 ? {} : { RTL: e.read_shift(2) & 64 };
}
function ao() {}
function oo(e, t, n) {
	var r = e.l + t, i = {
		dyHeight: e.read_shift(2),
		fl: e.read_shift(2)
	};
	switch (i.sz = i.dyHeight / 20, i.italic = !!(i.fl & 2), i.strike = !!(i.fl & 8), i.outline = !!(i.fl & 16), i.shadow = !!(i.fl & 32), i.condense = !!(i.fl & 64), i.extend = !!(i.fl & 128), n && n.biff || 8) {
		case 2: break;
		case 3:
		case 4:
			i.icv = e.read_shift(2);
			break;
		default: i.icv = e.read_shift(2), i.bls = e.read_shift(2), i.bold = i.bls >= 700, i.vertAlign = e.read_shift(2), i.underline = e.read_shift(1), i.family = e.read_shift(1), i.charset = e.read_shift(1), e.l++;
	}
	return i.name = e.l < r ? va(e, r - e.l, n) : "", i;
}
function so(e, t, n) {
	var r = ja(e, t, n);
	return r.isst = e.read_shift(4), r;
}
function co(e, t, n) {
	n.biffguess && n.biff == 2 && (n.biff = 5);
	var r = e.l + t, i = ja(e, t, n);
	return i.val = xa(e, r - e.l, n), i;
}
function lo(e, t, n) {
	return [e.read_shift(2), Sa(e, 0, n)];
}
var uo = Sa;
function fo(e, t, n) {
	var r = e.l + t, i = n.biff == 8 || !n.biff ? 4 : 2, a = e.read_shift(i), o = e.read_shift(i), s = e.read_shift(2), c = e.read_shift(2);
	return e.l = r, {
		s: {
			r: a,
			c: s
		},
		e: {
			r: o,
			c
		}
	};
}
function po(e) {
	var t = e.read_shift(2), n = e.read_shift(2), r = Fa(e);
	return {
		r: t,
		c: n,
		ixfe: r[0],
		rknum: r[1]
	};
}
function mo(e, t) {
	for (var n = e.l + t - 2, r = e.read_shift(2), i = e.read_shift(2), a = []; e.l < n;) a.push(Fa(e));
	if (e.l !== n) throw Error("MulRK read error");
	var o = e.read_shift(2);
	if (a.length != o - i + 1) throw Error("MulRK length mismatch");
	return {
		r,
		c: i,
		C: o,
		rkrec: a
	};
}
function ho(e, t) {
	for (var n = e.l + t - 2, r = e.read_shift(2), i = e.read_shift(2), a = []; e.l < n;) a.push(e.read_shift(2));
	if (e.l !== n) throw Error("MulBlank read error");
	var o = e.read_shift(2);
	if (a.length != o - i + 1) throw Error("MulBlank length mismatch");
	return {
		r,
		c: i,
		C: o,
		ixfe: a
	};
}
function go(e, t, n, r) {
	var i = {}, a = e.read_shift(4), o = e.read_shift(4), s = e.read_shift(4), c = e.read_shift(2);
	return i.patternType = Ei[s >> 26], i.alc = a & 7, i.fWrap = a >> 3 & 1, i.alcV = a >> 4 & 7, i.fJustLast = a >> 7 & 1, i.trot = a >> 8 & 255, i.cIndent = a >> 16 & 15, i.fShrinkToFit = a >> 20 & 1, i.iReadOrder = a >> 22 & 2, i.fAtrNum = a >> 26 & 1, i.fAtrFnt = a >> 27 & 1, i.fAtrAlc = a >> 28 & 1, i.fAtrBdr = a >> 29 & 1, i.fAtrPat = a >> 30 & 1, i.fAtrProt = a >> 31 & 1, i.dgLeft = o & 15, i.dgRight = o >> 4 & 15, i.dgTop = o >> 8 & 15, i.dgBottom = o >> 12 & 15, i.icvLeft = o >> 16 & 127, i.icvRight = o >> 23 & 127, i.grbitDiag = o >> 30 & 3, i.icvTop = s & 127, i.icvBottom = s >> 7 & 127, i.icvDiag = s >> 14 & 127, i.dgDiag = s >> 21 & 15, i.icvFore = c & 127, i.icvBack = c >> 7 & 127, i.fsxButton = c >> 14 & 1, i;
}
function _o(e, t, n) {
	var r = {};
	return r.ifnt = e.read_shift(2), r.numFmtId = e.read_shift(2), r.flags = e.read_shift(2), r.locked = !!(r.flags & 1), r.hidden = !!(r.flags & 2), r.fStyle = r.flags >> 2 & 1, r.xfId = r.ixfeParent = r.flags >> 4 & 4095, t -= 6, r.data = go(e, t, r.fStyle, n), r;
}
function vo(e) {
	var t = {};
	return t.ifnt = e.read_shift(1), e.l++, t.flags = e.read_shift(1), t.numFmtId = t.flags & 63, t.flags >>= 6, t.fStyle = 0, t.data = {}, t;
}
function yo(e) {
	var t = {};
	return t.ifnt = e.read_shift(1), t.numFmtId = e.read_shift(1), t.flags = e.read_shift(2), t.fStyle = t.flags >> 2 & 1, t.data = {}, t;
}
function bo(e) {
	var t = {};
	return t.ifnt = e.read_shift(1), t.numFmtId = e.read_shift(1), t.flags = e.read_shift(2), t.fStyle = t.flags >> 2 & 1, t.data = {}, t;
}
function xo(e) {
	e.l += 4;
	var t = [e.read_shift(2), e.read_shift(2)];
	if (t[0] !== 0 && t[0]--, t[1] !== 0 && t[1]--, t[0] > 7 || t[1] > 7) throw Error("Bad Gutters: " + t.join("|"));
	return t;
}
function So(e, t, n) {
	var r = ja(e, 6, n), i = _a(e, 2);
	return r.val = i, r.t = i === !0 || i === !1 ? "b" : "e", r;
}
function Co(e, t, n) {
	n.biffguess && n.biff == 2 && (n.biff = 5);
	var r = ja(e, 6, n);
	return r.val = ii(e, 8), r;
}
var wo = Na;
function To(e, t, n) {
	var r = e.l + t, i = e.read_shift(2), a = e.read_shift(2);
	if (n.sbcch = a, a == 1025 || a == 14849) return [a, i];
	if (a < 1 || a > 255) throw Error("Unexpected SupBook type: " + a);
	for (var o = ba(e, a), s = []; r > e.l;) s.push(xa(e, r - e.l, n));
	return [
		a,
		i,
		o,
		s
	];
}
function Eo(e, t, n) {
	var r = e.read_shift(2), i, a = {
		fBuiltIn: r & 1,
		fWantAdvise: r >>> 1 & 1,
		fWantPict: r >>> 2 & 1,
		fOle: r >>> 3 & 1,
		fOleLink: r >>> 4 & 1,
		cf: r >>> 5 & 1023,
		fIcon: r >>> 15 & 1
	};
	return n.sbcch === 14849 && (i = Ia(e, t - 2, n)), a.body = i || e.read_shift(t - 2), typeof i == "string" && (a.Name = i), a;
}
function Do(e, t, n) {
	var r = e.l + t, i = e.read_shift(2), a = e.read_shift(1), o = e.read_shift(1), s = e.read_shift(n && n.biff == 2 ? 1 : 2), c = 0;
	(!n || n.biff >= 5) && (n.biff != 5 && (e.l += 2), c = e.read_shift(2), n.biff == 5 && (e.l += 2), e.l += 4);
	var l = ba(e, o, n);
	i & 32 && (l = ji[l.charCodeAt(0)]);
	var u = r - e.l;
	n && n.biff == 2 && --u;
	var d = r == e.l || s === 0 || !(u > 0) ? [] : Bd(e, u, n, s);
	return {
		chKey: a,
		Name: l,
		itab: c,
		rgce: d
	};
}
function Oo(e, t, n) {
	if (n.biff < 8 || !(n.biff > 8) && t == e[e.l] + +(e[e.l + 1] == 3) + 1) return ko(e, t, n);
	for (var r = [], i = e.l + t, a = e.read_shift(n.biff > 8 ? 4 : 2); a-- !== 0;) r.push(Pa(e, n.biff > 8 ? 12 : 6, n));
	if (e.l != i) throw Error("Bad ExternSheet: " + e.l + " != " + i);
	return r;
}
function ko(e, t, n) {
	e[e.l + 1] == 3 && e[e.l]++;
	var r = va(e, t, n);
	return r.charCodeAt(0) == 3 ? r.slice(1) : r;
}
function Ao(e, t, n) {
	if (n.biff < 8) e.l += t;
	else {
		var r = e.read_shift(2), i = e.read_shift(2);
		return [ba(e, r, n), ba(e, i, n)];
	}
}
function jo(e, t, n) {
	var r = Ra(e, 6);
	e.l++;
	var i = e.read_shift(1);
	return t -= 8, [
		Vd(e, t, n),
		i,
		r
	];
}
function Mo(e, t, n) {
	var r = za(e, 6);
	switch (n.biff) {
		case 2:
			e.l++, t -= 7;
			break;
		case 3:
		case 4:
			e.l += 2, t -= 8;
			break;
		default: e.l += 6, t -= 12;
	}
	return [r, Rd(e, t, n, r)];
}
function No(e) {
	return [
		e.read_shift(4) !== 0,
		e.read_shift(4) !== 0,
		e.read_shift(4)
	];
}
function Po(e, t, n) {
	var r = e.read_shift(2), i = e.read_shift(2), a = e.read_shift(2), o = e.read_shift(2), s = Sa(e, 0, n);
	return [
		{
			r,
			c: i
		},
		s,
		o,
		a
	];
}
function Fo(e, t, n) {
	if (n && n.biff < 8) {
		var r = e.read_shift(2), i = e.read_shift(2);
		if (r == 65535 || r == -1) return;
		var a = e.read_shift(2), o = e.read_shift(Math.min(a, 2048), "cpstr");
		return [{
			r,
			c: i
		}, o];
	}
	return Po(e, t, n);
}
function Io(e, t) {
	for (var n = [], r = e.read_shift(2); r--;) n.push(La(e, t));
	return n;
}
function Lo(e, t, n) {
	if (n && n.biff < 8) return zo(e, t, n);
	var r = Ba(e, 22);
	return {
		cmo: r,
		ft: Ga(e, t - 22, r[1])
	};
}
var Ro = { 8: function(e, t) {
	var n = e.l + t;
	e.l += 10;
	var r = e.read_shift(2);
	e.l += 4, e.l += 2, e.l += 2, e.l += 2, e.l += 4;
	var i = e.read_shift(1);
	return e.l += i, e.l = n, { fmt: r };
} };
function zo(e, t, n) {
	e.l += 4;
	var r = e.read_shift(2), i = e.read_shift(2), a = e.read_shift(2);
	e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 6, t -= 36;
	var o = [];
	return o.push((Ro[r] || pr)(e, t, n)), {
		cmo: [
			i,
			r,
			a
		],
		ft: o
	};
}
function Bo(e, t, n) {
	var r = e.l, i = "";
	try {
		e.l += 4;
		var a = (n.lastobj || { cmo: [0, 0] }).cmo[1];
		[
			0,
			5,
			7,
			11,
			12,
			14
		].indexOf(a) == -1 ? e.l += 6 : Ca(e, 6, n);
		var o = e.read_shift(2);
		e.read_shift(2), ha(e, 2);
		var s = e.read_shift(2);
		e.l += s;
		for (var c = 1; c < e.lens.length - 1; ++c) {
			if (e.l - r != e.lens[c]) throw Error("TxO: bad continue record");
			var l = e[e.l], u = ba(e, e.lens[c + 1] - e.lens[c] - 1);
			if (i += u, i.length >= (l ? o : 2 * o)) break;
		}
		if (i.length !== o && i.length !== o * 2) throw Error("cchText: " + o + " != " + i.length);
		return e.l = r + t, { t: i };
	} catch {
		return e.l = r + t, { t: i };
	}
}
function Vo(e, t) {
	var n = La(e, 8);
	return e.l += 16, [n, Oa(e, t - 24)];
}
function Ho(e, t) {
	e.read_shift(2);
	var n = La(e, 8), r = e.read_shift((t - 10) / 2, "dbcs-cont");
	return r = r.replace(R, ""), [n, r];
}
function Uo(e) {
	var t = [0, 0], n = e.read_shift(2);
	return t[0] = Ti[n] || n, n = e.read_shift(2), t[1] = Ti[n] || n, t;
}
function Wo(e) {
	for (var t = e.read_shift(2), n = []; t-- > 0;) n.push(Aa(e, 8));
	return n;
}
function Go(e) {
	for (var t = e.read_shift(2), n = []; t-- > 0;) n.push(Aa(e, 8));
	return n;
}
function Ko(e) {
	e.l += 2;
	var t = {
		cxfs: 0,
		crc: 0
	};
	return t.cxfs = e.read_shift(2), t.crc = e.read_shift(4), t;
}
function qo(e, t, n) {
	if (!n.cellStyles) return pr(e, t);
	var r = n && n.biff >= 12 ? 4 : 2, i = e.read_shift(r), a = e.read_shift(r), o = e.read_shift(r), s = e.read_shift(r), c = e.read_shift(2);
	r == 2 && (e.l += 2);
	var l = {
		s: i,
		e: a,
		w: o,
		ixfe: s,
		flags: c
	};
	return (n.biff >= 5 || !n.biff) && (l.level = c >> 8 & 7), l;
}
function Jo(e, t) {
	var n = {};
	return t < 32 || (e.l += 16, n.header = ii(e, 8), n.footer = ii(e, 8), e.l += 2), n;
}
function Yo(e, t, n) {
	var r = { area: !1 };
	if (n.biff != 5) return e.l += t, r;
	var i = e.read_shift(1);
	return e.l += 3, i & 16 && (r.area = !0), r;
}
var Xo = ja, Zo = ga, Qo = xa;
function $o(e) {
	var t = e.read_shift(2), n = e.read_shift(2), r = e.read_shift(4), i = {
		fmt: t,
		env: n,
		len: r,
		data: e.slice(e.l, e.l + r)
	};
	return e.l += r, i;
}
function es(e, t, n) {
	n.biffguess && n.biff == 5 && (n.biff = 2);
	var r = ja(e, 7, n), i = Sa(e, t - 7, n);
	return r.t = "str", r.val = i, r;
}
function ts(e, t, n) {
	var r = ja(e, 7, n), i = ii(e, 8);
	return r.t = "n", r.val = i, r;
}
function ns(e, t, n) {
	var r = ja(e, 7, n), i = e.read_shift(2);
	return r.t = "n", r.val = i, r;
}
function rs(e) {
	var t = e.read_shift(1);
	return t === 0 ? (e.l++, "") : e.read_shift(t, "sbcs-cont");
}
function is(e, t, n) {
	var r = e.l + 7, i = ja(e, 6, n);
	e.l = r;
	var a = _a(e, 2);
	return i.val = a, i.t = a === !0 || a === !1 ? "b" : "e", i;
}
function as(e, t) {
	e.l += 6, e.l += 2, e.l += 1, e.l += 3, e.l += 1, e.l += t - 13;
}
function os(e, t, n) {
	var r = e.l + t, i = ja(e, 6, n), a = ba(e, e.read_shift(2), n);
	return e.l = r, i.t = "str", i.val = a, i;
}
function ss(e) {
	var t = e.read_shift(4), n = e.read_shift(1), r = e.read_shift(n, "sbcs");
	return r.length === 0 && (r = "Sheet1"), {
		flags: t,
		name: r
	};
}
var cs = [
	2,
	3,
	48,
	49,
	131,
	139,
	140,
	245
], ls = /*#__PURE__*/ (function() {
	var e = {
		1: 437,
		2: 850,
		3: 1252,
		4: 1e4,
		100: 852,
		101: 866,
		102: 865,
		103: 861,
		104: 895,
		105: 620,
		106: 737,
		107: 857,
		120: 950,
		121: 949,
		122: 936,
		123: 932,
		124: 874,
		125: 1255,
		126: 1256,
		150: 10007,
		151: 10029,
		152: 10006,
		200: 1250,
		201: 1251,
		202: 1254,
		203: 1253,
		0: 20127,
		8: 865,
		9: 437,
		10: 850,
		11: 437,
		13: 437,
		14: 850,
		15: 437,
		16: 850,
		17: 437,
		18: 850,
		19: 932,
		20: 850,
		21: 437,
		22: 850,
		23: 865,
		24: 437,
		25: 437,
		26: 850,
		27: 437,
		28: 863,
		29: 850,
		31: 852,
		34: 852,
		35: 852,
		36: 860,
		37: 850,
		38: 866,
		55: 850,
		64: 852,
		77: 936,
		78: 949,
		79: 950,
		80: 874,
		87: 1252,
		88: 1252,
		89: 1252,
		108: 863,
		134: 737,
		135: 852,
		136: 857,
		204: 1257,
		255: 16969
	}, t = ct({
		1: 437,
		2: 850,
		3: 1252,
		4: 1e4,
		100: 852,
		101: 866,
		102: 865,
		103: 861,
		104: 895,
		105: 620,
		106: 737,
		107: 857,
		120: 950,
		121: 949,
		122: 936,
		123: 932,
		124: 874,
		125: 1255,
		126: 1256,
		150: 10007,
		151: 10029,
		152: 10006,
		200: 1250,
		201: 1251,
		202: 1254,
		203: 1253,
		0: 20127
	});
	function n(t, n) {
		var r = [], i = M(1);
		switch (n.type) {
			case "base64":
				i = N(O(t));
				break;
			case "binary":
				i = N(t);
				break;
			case "buffer":
			case "array": i = t;
		}
		fr(i, 0);
		var a = i.read_shift(1), o = !!(a & 136), s = !1, c = !1;
		switch (a) {
			case 2: break;
			case 3: break;
			case 48:
				s = !0, o = !0;
				break;
			case 49:
				s = !0, o = !0;
				break;
			case 131: break;
			case 139: break;
			case 140:
				c = !0;
				break;
			case 245: break;
			default: throw Error("DBF Unsupported Version: " + a.toString(16));
		}
		var l = 0, u = 521;
		a == 2 && (l = i.read_shift(2)), i.l += 3, a != 2 && (l = i.read_shift(4)), l > 1048576 && (l = 1e6), a != 2 && (u = i.read_shift(2));
		var d = i.read_shift(2);
		n.codepage, a != 2 && (i.l += 16, i.read_shift(1), i[i.l] !== 0 && e[i[i.l]], i.l += 1, i.l += 2), c && (i.l += 36);
		for (var f = [], p = {}, m = Math.min(i.length, a == 2 ? 521 : u - 10 - (s ? 264 : 0)), h = c ? 32 : 11; i.l < m && i[i.l] != 13;) switch (p = {}, p.name = P(i.slice(i.l, i.l + h)).replace(/[\u0000\r\n][\S\s]*$/g, ""), i.l += h, p.type = String.fromCharCode(i.read_shift(1)), a != 2 && !c && (p.offset = i.read_shift(4)), p.len = i.read_shift(1), a == 2 && (p.offset = i.read_shift(2)), p.dec = i.read_shift(1), p.name.length && f.push(p), a != 2 && (i.l += c ? 13 : 14), p.type) {
			case "B":
				(!s || p.len != 8) && n.WTF && console.log("Skipping " + p.name + ":" + p.type);
				break;
			case "G":
			case "P":
				n.WTF && console.log("Skipping " + p.name + ":" + p.type);
				break;
			case "+":
			case "0":
			case "@":
			case "C":
			case "D":
			case "F":
			case "I":
			case "L":
			case "M":
			case "N":
			case "O":
			case "T":
			case "Y": break;
			default: throw Error("Unknown Field Type: " + p.type);
		}
		if (i[i.l] !== 13 && (i.l = u - 1), i.read_shift(1) !== 13) throw Error("DBF Terminator not found " + i.l + " " + i[i.l]);
		i.l = u;
		var g = 0, _ = 0;
		for (r[0] = [], _ = 0; _ != f.length; ++_) r[0][_] = f[_].name;
		for (; l-- > 0;) if (i[i.l] === 42) i.l += d;
		else for (++i.l, r[++g] = [], _ = 0, _ = 0; _ != f.length; ++_) {
			var v = i.slice(i.l, i.l + f[_].len);
			i.l += f[_].len, fr(v, 0);
			var y = P(v);
			switch (f[_].type) {
				case "C":
					y.trim().length && (r[g][_] = y.replace(/([^\s])\s+$/, "$1"));
					break;
				case "D":
					y.length === 8 ? (r[g][_] = new Date(Date.UTC(+y.slice(0, 4), y.slice(4, 6) - 1, +y.slice(6, 8), 0, 0, 0, 0)), n && n.UTC || (r[g][_] = Mt(r[g][_]))) : r[g][_] = y;
					break;
				case "F":
					r[g][_] = parseFloat(y.trim());
					break;
				case "+":
				case "I":
					r[g][_] = c ? v.read_shift(-4, "i") ^ 2147483648 : v.read_shift(4, "i");
					break;
				case "L":
					switch (y.trim().toUpperCase()) {
						case "Y":
						case "T":
							r[g][_] = !0;
							break;
						case "N":
						case "F":
							r[g][_] = !1;
							break;
						case "":
						case "\0":
						case "?": break;
						default: throw Error("DBF Unrecognized L:|" + y + "|");
					}
					break;
				case "M":
					if (!o) throw Error("DBF Unexpected MEMO for type " + a.toString(16));
					r[g][_] = "##MEMO##" + (c ? parseInt(y.trim(), 10) : v.read_shift(4));
					break;
				case "N":
					y = y.replace(/\u0000/g, "").trim(), y && y != "." && (r[g][_] = +y || 0);
					break;
				case "@":
					r[g][_] = /* @__PURE__ */ new Date(v.read_shift(-8, "f") - 621356832e5);
					break;
				case "T":
					var b = v.read_shift(4), x = v.read_shift(4);
					if (b == 0 && x == 0) break;
					r[g][_] = new Date((b - 2440588) * 864e5 + x), n && n.UTC || (r[g][_] = Mt(r[g][_]));
					break;
				case "Y":
					r[g][_] = v.read_shift(4, "i") / 1e4 + v.read_shift(4, "i") / 1e4 * 2 ** 32;
					break;
				case "O":
					r[g][_] = -v.read_shift(-8, "f");
					break;
				case "B": if (s && f[_].len == 8) {
					r[g][_] = v.read_shift(8, "f");
					break;
				}
				case "G":
				case "P":
					v.l += f[_].len;
					break;
				case "0": if (f[_].name === "_NullFlags") break;
				default: throw Error("DBF Unsupported data type " + f[_].type);
			}
		}
		if (a != 2 && i.l < i.length && i[i.l++] != 26) throw Error("DBF EOF Marker missing " + (i.l - 1) + " of " + i.length + " " + i[i.l - 1].toString(16));
		return n && n.sheetRows && (r = r.slice(0, n.sheetRows)), n.DBF = f, r;
	}
	function r(e, t) {
		var r = t || {};
		r.dateNF ||= "yyyymmdd";
		var i = Ur(n(e, r), r);
		return i["!cols"] = r.DBF.map(function(e) {
			return {
				wch: e.len,
				DBF: e
			};
		}), delete r.DBF, i;
	}
	function i(e, t) {
		try {
			var n = Br(r(e, t), t);
			return n.bookType = "dbf", n;
		} catch (e) {
			if (t && t.WTF) throw e;
		}
		return {
			SheetNames: [],
			Sheets: Lr()
		};
	}
	var a = {
		B: 8,
		C: 250,
		L: 1,
		D: 8,
		"?": 0,
		"": 0
	};
	function o(n, r) {
		if (!n["!ref"]) throw Error("Cannot export empty sheet to DBF");
		var i = r || {}, o = l;
		if (+i.codepage >= 0 && m(+i.codepage), i.type == "string") throw Error("Cannot write DBF to JS string");
		var s = gr(), c = Rg(n, {
			header: 1,
			raw: !0,
			cellDates: !0
		}), u = c[0], d = c.slice(1), f = n["!cols"] || [], p = 0, h = 0, g = 0, _ = 1;
		for (p = 0; p < u.length; ++p) if (((f[p] || {}).DBF || {}).name) u[p] = f[p].DBF.name, ++g;
		else if (u[p] != null) {
			if (++g, typeof u[p] == "number" && (u[p] = u[p].toString(10)), typeof u[p] != "string") throw Error("DBF Invalid column name " + u[p] + " |" + typeof u[p] + "|");
			if (u.indexOf(u[p]) !== p) {
				for (h = 0; h < 1024; ++h) if (u.indexOf(u[p] + "_" + h) == -1) {
					u[p] += "_" + h;
					break;
				}
			}
		}
		var v = Pr(n["!ref"]), y = [], b = [], x = [];
		for (p = 0; p <= v.e.c - v.s.c; ++p) {
			var S = "", C = "", w = 0, T = [];
			for (h = 0; h < d.length; ++h) d[h][p] != null && T.push(d[h][p]);
			if (T.length == 0 || u[p] == null) y[p] = "?";
			else {
				for (h = 0; h < T.length; ++h) {
					switch (typeof T[h]) {
						case "number":
							C = "B";
							break;
						case "string":
							C = "C";
							break;
						case "boolean":
							C = "L";
							break;
						case "object":
							C = T[h] instanceof Date ? "D" : "C";
							break;
						default: C = "C";
					}
					w = Math.max(w, String(T[h]).length), S = S && S != C ? "C" : C;
				}
				w > 250 && (w = 250), C = ((f[p] || {}).DBF || {}).type, C == "C" && f[p].DBF.len > w && (w = f[p].DBF.len), S == "B" && C == "N" && (S = "N", x[p] = f[p].DBF.dec, w = f[p].DBF.len), b[p] = S == "C" || C == "N" ? w : a[S] || 0, _ += b[p], y[p] = S;
			}
		}
		var E = s.next(32);
		for (E.write_shift(4, 318902576), E.write_shift(4, d.length), E.write_shift(2, 296 + 32 * g), E.write_shift(2, _), p = 0; p < 4; ++p) E.write_shift(4, 0);
		var D = +t[l] || 3;
		for (E.write_shift(4, D << 8), e[D] != +i.codepage && (i.codepage && console.error("DBF Unsupported codepage " + l + ", using 1252"), l = 1252), p = 0, h = 0; p < u.length; ++p) if (u[p] != null) {
			var O = s.next(32), k = (u[p].slice(-10) + "\0\0\0\0\0\0\0\0\0\0\0").slice(0, 11);
			O.write_shift(1, k, "sbcs"), O.write_shift(1, y[p] == "?" ? "C" : y[p], "sbcs"), O.write_shift(4, h), O.write_shift(1, b[p] || a[y[p]] || 0), O.write_shift(1, x[p] || 0), O.write_shift(1, 2), O.write_shift(4, 0), O.write_shift(1, 0), O.write_shift(4, 0), O.write_shift(4, 0), h += b[p] || a[y[p]] || 0;
		}
		var A = s.next(264);
		for (A.write_shift(4, 13), p = 0; p < 65; ++p) A.write_shift(4, 0);
		for (p = 0; p < d.length; ++p) {
			var j = s.next(_);
			for (j.write_shift(1, 0), h = 0; h < u.length; ++h) if (u[h] != null) switch (y[h]) {
				case "L":
					j.write_shift(1, d[p][h] == null ? 63 : d[p][h] ? 84 : 70);
					break;
				case "B":
					j.write_shift(8, d[p][h] || 0, "f");
					break;
				case "N":
					var M = "0";
					for (typeof d[p][h] == "number" && (M = d[p][h].toFixed(x[h] || 0)), M.length > b[h] && (M = M.slice(0, b[h])), g = 0; g < b[h] - M.length; ++g) j.write_shift(1, 32);
					j.write_shift(1, M, "sbcs");
					break;
				case "D":
					d[p][h] ? (j.write_shift(4, ("0000" + d[p][h].getFullYear()).slice(-4), "sbcs"), j.write_shift(2, ("00" + (d[p][h].getMonth() + 1)).slice(-2), "sbcs"), j.write_shift(2, ("00" + d[p][h].getDate()).slice(-2), "sbcs")) : j.write_shift(8, "00000000", "sbcs");
					break;
				case "C":
					var ee = j.l, N = String(d[p][h] == null ? "" : d[p][h]).slice(0, b[h]);
					for (j.write_shift(1, N, "cpstr"), ee += b[h] - j.l, g = 0; g < ee; ++g) j.write_shift(1, 32);
			}
		}
		return l = o, s.next(1).write_shift(1, 26), s.end();
	}
	return {
		to_workbook: i,
		to_sheet: r,
		from_sheet: o
	};
})(), us = /*#__PURE__*/ (function() {
	var e = {
		AA: "À",
		BA: "Á",
		CA: "Â",
		DA: 195,
		HA: "Ä",
		JA: 197,
		AE: "È",
		BE: "É",
		CE: "Ê",
		HE: "Ë",
		AI: "Ì",
		BI: "Í",
		CI: "Î",
		HI: "Ï",
		AO: "Ò",
		BO: "Ó",
		CO: "Ô",
		DO: 213,
		HO: "Ö",
		AU: "Ù",
		BU: "Ú",
		CU: "Û",
		HU: "Ü",
		Aa: "à",
		Ba: "á",
		Ca: "â",
		Da: 227,
		Ha: "ä",
		Ja: 229,
		Ae: "è",
		Be: "é",
		Ce: "ê",
		He: "ë",
		Ai: "ì",
		Bi: "í",
		Ci: "î",
		Hi: "ï",
		Ao: "ò",
		Bo: "ó",
		Co: "ô",
		Do: 245,
		Ho: "ö",
		Au: "ù",
		Bu: "ú",
		Cu: "û",
		Hu: "ü",
		KC: "Ç",
		Kc: "ç",
		q: "æ",
		z: "œ",
		a: "Æ",
		j: "Œ",
		DN: 209,
		Dn: 241,
		Hy: 255,
		S: 169,
		c: 170,
		R: 174,
		"B ": 180,
		0: 176,
		1: 177,
		2: 178,
		3: 179,
		5: 181,
		6: 182,
		7: 183,
		Q: 185,
		k: 186,
		b: 208,
		i: 216,
		l: 222,
		s: 240,
		y: 248,
		"!": 161,
		"\"": 162,
		"#": 163,
		"(": 164,
		"%": 165,
		"'": 167,
		"H ": 168,
		"+": 171,
		";": 187,
		"<": 188,
		"=": 189,
		">": 190,
		"?": 191,
		"{": 223
	}, t = RegExp("\x1BN(" + st(e).join("|").replace(/\|\|\|/, "|\\||").replace(/([?()+])/g, "\\$1").replace("{", "\\{") + "|\\|)", "gm");
	try {
		t = RegExp("\x1BN(" + st(e).join("|").replace(/\|\|\|/, "|\\||").replace(/([?()+])/g, "\\$1") + "|\\|)", "gm");
	} catch {}
	var n = function(t, n) {
		var r = e[n];
		return typeof r == "number" ? S(r) : r;
	}, r = function(e, t, n) {
		var r = t.charCodeAt(0) - 32 << 4 | n.charCodeAt(0) - 48;
		return r == 59 ? e : S(r);
	};
	e["|"] = 254;
	var i = function(e) {
		return e.replace(/\n/g, "\x1B :").replace(/\r/g, "\x1B =");
	};
	function a(e, t) {
		switch (t.type) {
			case "base64": return o(O(e), t);
			case "binary": return o(e, t);
			case "buffer": return o(k && Buffer.isBuffer(e) ? e.toString("binary") : P(e), t);
			case "array": return o(yt(e), t);
		}
		throw Error("Unrecognized type " + t.type);
	}
	function o(e, i) {
		var a = e.split(/[\n\r]+/), o = -1, s = -1, c = 0, l = 0, u = [], d = [], f = null, p = {}, h = [], g = [], _ = [], v = 0, y, b = { Workbook: {
			WBProps: {},
			Names: []
		} };
		for (+i.codepage >= 0 && m(+i.codepage); c !== a.length; ++c) {
			v = 0;
			var x = a[c].trim().replace(/\x1B([\x20-\x2F])([\x30-\x3F])/g, r).replace(t, n), S = x.replace(/;;/g, "\0").split(";").map(function(e) {
				return e.replace(/\u0000/g, ";");
			}), C = S[0], w;
			if (x.length > 0) switch (C) {
				case "ID": break;
				case "E": break;
				case "B": break;
				case "O":
					for (l = 1; l < S.length; ++l) switch (S[l].charAt(0)) {
						case "V":
							var T = parseInt(S[l].slice(1), 10);
							T >= 1 && T <= 4 && (b.Workbook.WBProps.date1904 = !0);
					}
					break;
				case "W": break;
				case "P":
					S[1].charAt(0) === "P" && d.push(x.slice(3).replace(/;;/g, ";"));
					break;
				case "NN":
					var E = { Sheet: 0 };
					for (l = 1; l < S.length; ++l) switch (S[l].charAt(0)) {
						case "N":
							E.Name = S[l].slice(1);
							break;
						case "E": E.Ref = (i && i.sheet || "Sheet1") + "!" + nu(S[l].slice(1));
					}
					b.Workbook.Names.push(E);
					break;
				case "C":
					var D = !1, O = !1, k = !1, A = !1, j = -1, M = -1, ee = "", N = "z", P = "";
					for (l = 1; l < S.length; ++l) switch (S[l].charAt(0)) {
						case "A":
							P = S[l].slice(1);
							break;
						case "X":
							s = parseInt(S[l].slice(1), 10) - 1, O = !0;
							break;
						case "Y":
							for (o = parseInt(S[l].slice(1), 10) - 1, O || (s = 0), y = u.length; y <= o; ++y) u[y] = [];
							break;
						case "K":
							w = S[l].slice(1), w.charAt(0) === "\"" ? (w = w.slice(1, w.length - 1), N = "s") : w === "TRUE" || w === "FALSE" ? (w = w === "TRUE", N = "b") : w.charAt(0) == "#" && Ai[w] != null ? (N = "e", w = Ai[w]) : isNaN(St(w)) || (w = St(w), N = "n", f !== null && Ue(f) && i.cellDates && (w = pt(b.Workbook.WBProps.date1904 ? w + 1462 : w), N = typeof w == "number" ? "n" : "d")), D = !0;
							break;
						case "E":
							A = !0, ee = nu(S[l].slice(1), {
								r: o,
								c: s
							});
							break;
						case "S":
							k = !0;
							break;
						case "G": break;
						case "R":
							j = parseInt(S[l].slice(1), 10) - 1;
							break;
						case "C":
							M = parseInt(S[l].slice(1), 10) - 1;
							break;
						default: if (i && i.WTF) throw Error("SYLK bad record " + x);
					}
					if (D && (u[o][s] ? (u[o][s].t = N, u[o][s].v = w) : u[o][s] = {
						t: N,
						v: w
					}, f && (u[o][s].z = f), i.cellText !== !1 && f && (u[o][s].w = Je(u[o][s].z, u[o][s].v, { date1904: b.Workbook.WBProps.date1904 })), f = null), k) {
						if (A) throw Error("SYLK shared formula cannot have own formula");
						var F = j > -1 && u[j][M];
						if (!F || !F[1]) throw Error("SYLK shared formula cannot find base");
						ee = au(F[1], {
							r: o - j,
							c: s - M
						});
					}
					ee && (u[o][s] ? u[o][s].f = ee : u[o][s] = {
						t: "n",
						f: ee
					}), P && (u[o][s] || (u[o][s] = { t: "z" }), u[o][s].c = [{
						a: "SheetJSYLK",
						t: P
					}]);
					break;
				case "F":
					var I = 0;
					for (l = 1; l < S.length; ++l) switch (S[l].charAt(0)) {
						case "X":
							s = parseInt(S[l].slice(1), 10) - 1, ++I;
							break;
						case "Y":
							for (o = parseInt(S[l].slice(1), 10) - 1, y = u.length; y <= o; ++y) u[y] = [];
							break;
						case "M":
							v = parseInt(S[l].slice(1), 10) / 20;
							break;
						case "F": break;
						case "G": break;
						case "P":
							f = d[parseInt(S[l].slice(1), 10)];
							break;
						case "S": break;
						case "D": break;
						case "N": break;
						case "W":
							for (_ = S[l].slice(1).split(" "), y = parseInt(_[0], 10); y <= parseInt(_[1], 10); ++y) v = parseInt(_[2], 10), g[y - 1] = v === 0 ? { hidden: !0 } : { wch: v };
							break;
						case "C":
							s = parseInt(S[l].slice(1), 10) - 1, g[s] || (g[s] = {});
							break;
						case "R":
							o = parseInt(S[l].slice(1), 10) - 1, h[o] || (h[o] = {}), v > 0 ? (h[o].hpt = v, h[o].hpx = Ic(v)) : v === 0 && (h[o].hidden = !0);
							break;
						default: if (i && i.WTF) throw Error("SYLK bad record " + x);
					}
					I < 1 && (f = null);
					break;
				default: if (i && i.WTF) throw Error("SYLK bad record " + x);
			}
		}
		return h.length > 0 && (p["!rows"] = h), g.length > 0 && (p["!cols"] = g), g.forEach(function(e) {
			pc(e);
		}), i && i.sheetRows && (u = u.slice(0, i.sheetRows)), [
			u,
			p,
			b
		];
	}
	function s(e, t) {
		var n = a(e, t), r = n[0], i = n[1], o = n[2], s = bt(t);
		s.date1904 = (((o || {}).Workbook || {}).WBProps || {}).date1904;
		var c = Ur(r, s);
		st(i).forEach(function(e) {
			c[e] = i[e];
		});
		var l = Br(c, t);
		return st(o).forEach(function(e) {
			l[e] = o[e];
		}), l.bookType = "sylk", l;
	}
	function c(e, t, n, r, i, a) {
		var o = "C;Y" + (n + 1) + ";X" + (r + 1) + ";K";
		switch (e.t) {
			case "n":
				o += isFinite(e.v) ? e.v || 0 : ki[isNaN(e.v) ? 36 : 7], e.f && !e.F && (o += ";E" + iu(e.f, {
					r: n,
					c: r
				}));
				break;
			case "b":
				o += e.v ? "TRUE" : "FALSE";
				break;
			case "e":
				o += e.w || ki[e.v] || e.v;
				break;
			case "d":
				o += ft(vt(e.v, a), a);
				break;
			case "s": o += "\"" + (e.v == null ? "" : String(e.v)).replace(/"/g, "").replace(/;/g, ";;") + "\"";
		}
		return o;
	}
	function l(e, t, n) {
		var r = "C;Y" + (t + 1) + ";X" + (n + 1) + ";A";
		return r += i(e.map(function(e) {
			return e.t;
		}).join("")), r;
	}
	function u(e, t) {
		t.forEach(function(t, n) {
			var r = "F;W" + (n + 1) + " " + (n + 1) + " ";
			t.hidden ? r += "0" : (typeof t.width == "number" && !t.wpx && (t.wpx = uc(t.width)), typeof t.wpx == "number" && !t.wch && (t.wch = dc(t.wpx)), typeof t.wch == "number" && (r += Math.round(t.wch))), r.charAt(r.length - 1) != " " && e.push(r);
		});
	}
	function d(e, t) {
		t.forEach(function(t, n) {
			var r = "F;";
			t.hidden ? r += "M0;" : t.hpt ? r += "M" + 20 * t.hpt + ";" : t.hpx && (r += "M" + 20 * Fc(t.hpx) + ";"), r.length > 2 && e.push(r + "R" + (n + 1));
		});
	}
	function f(e, t, n) {
		t ||= {}, t._formats = ["General"];
		var r = ["ID;PSheetJS;N;E"], i = [], a = Pr(e["!ref"] || "A1"), o, s = e["!data"] != null, f = "\r\n", p = (((n || {}).Workbook || {}).WBProps || {}).date1904, m = "General";
		r.push("P;PGeneral");
		var h = a.s.r, g = a.s.c, _ = [];
		if (e["!ref"]) {
			for (h = a.s.r; h <= a.e.r; ++h) if (!s || e["!data"][h]) {
				for (_ = [], g = a.s.c; g <= a.e.c; ++g) o = s ? e["!data"][h][g] : e[Er(g) + Sr(h)], o && o.c && _.push(l(o.c, h, g));
				_.length && i.push(_.join(f));
			}
		}
		if (e["!ref"]) {
			for (h = a.s.r; h <= a.e.r; ++h) if (!s || e["!data"][h]) {
				for (_ = [], g = a.s.c; g <= a.e.c; ++g) if (o = s ? e["!data"][h][g] : e[Er(g) + Sr(h)], o && (o.v != null || o.f && !o.F)) {
					if ((o.z || (o.t == "d" ? W[14] : "General")) != m) {
						var v = t._formats.indexOf(o.z);
						v == -1 && (t._formats.push(o.z), v = t._formats.length - 1, r.push("P;P" + o.z.replace(/;/g, ";;"))), _.push("F;P" + v + ";Y" + (h + 1) + ";X" + (g + 1));
					}
					_.push(c(o, e, h, g, t, p));
				}
				i.push(_.join(f));
			}
		}
		return r.push("F;P0;DG0G8;M255"), e["!cols"] && u(r, e["!cols"]), e["!rows"] && d(r, e["!rows"]), e["!ref"] && r.push("B;Y" + (a.e.r - a.s.r + 1) + ";X" + (a.e.c - a.s.c + 1) + ";D" + [
			a.s.c,
			a.s.r,
			a.e.c,
			a.e.r
		].join(" ")), r.push("O;L;D;B" + (p ? ";V4" : "") + ";K47;G100 0.001"), delete t._formats, r.join(f) + f + i.join(f) + f + "E" + f;
	}
	return {
		to_workbook: s,
		from_sheet: f
	};
})(), ds = /*#__PURE__*/ (function() {
	function e(e, n) {
		switch (n.type) {
			case "base64": return t(O(e), n);
			case "binary": return t(e, n);
			case "buffer": return t(k && Buffer.isBuffer(e) ? e.toString("binary") : P(e), n);
			case "array": return t(yt(e), n);
		}
		throw Error("Unrecognized type " + n.type);
	}
	function t(e, t) {
		for (var n = e.split("\n"), r = -1, i = -1, a = 0, o = []; a !== n.length; ++a) if (n[a].trim() === "BOT") o[++r] = [], i = 0;
		else if (!(r < 0)) {
			var s = n[a].trim().split(","), c = s[0], l = s[1];
			++a;
			for (var u = n[a] || ""; (u.match(/["]/g) || []).length & 1 && a < n.length - 1;) u += "\n" + n[++a];
			switch (u = u.trim(), +c) {
				case -1:
					if (u === "BOT") {
						o[++r] = [], i = 0;
						continue;
					}
					if (u !== "EOD") throw Error("Unrecognized DIF special command " + u);
					break;
				case 0:
					u === "TRUE" ? o[r][i] = !0 : u === "FALSE" ? o[r][i] = !1 : isNaN(St(l)) ? isNaN(At(l).getDate()) ? o[r][i] = l : (o[r][i] = vt(l), t && t.UTC || (o[r][i] = Mt(o[r][i]))) : o[r][i] = St(l), ++i;
					break;
				case 1: u = u.slice(1, u.length - 1), u = u.replace(/""/g, "\""), w && u && u.match(/^=".*"$/) && (u = u.slice(2, -1)), o[r][i++] = u === "" ? null : u;
			}
			if (u === "EOD") break;
		}
		return t && t.sheetRows && (o = o.slice(0, t.sheetRows)), o;
	}
	function n(t, n) {
		return Ur(e(t, n), n);
	}
	function r(e, t) {
		var r = Br(n(e, t), t);
		return r.bookType = "dif", r;
	}
	function i(e, t) {
		return "0," + String(e) + "\r\n" + t;
	}
	function a(e) {
		return "1,0\r\n\"" + e.replace(/"/g, "\"\"") + "\"";
	}
	function o(e) {
		var t = w;
		if (!e["!ref"]) throw Error("Cannot export empty sheet to DIF");
		for (var n = Pr(e["!ref"]), r = e["!data"] != null, o = [
			"TABLE\r\n0,1\r\n\"sheetjs\"\r\n",
			"VECTORS\r\n0," + (n.e.r - n.s.r + 1) + "\r\n\"\"\r\n",
			"TUPLES\r\n0," + (n.e.c - n.s.c + 1) + "\r\n\"\"\r\n",
			"DATA\r\n0,0\r\n\"\"\r\n"
		], s = n.s.r; s <= n.e.r; ++s) {
			for (var c = r ? e["!data"][s] : [], l = "-1,0\r\nBOT\r\n", u = n.s.c; u <= n.e.c; ++u) {
				var d = r ? c && c[u] : e[jr({
					r: s,
					c: u
				})];
				if (d == null) l += "1,0\r\n\"\"\r\n";
				else {
					switch (d.t) {
						case "n":
							t ? d.w == null ? d.v == null ? d.f != null && !d.F ? l += a("=" + d.f) : l += "1,0\r\n\"\"" : l += i(d.v, "V") : l += "0," + d.w + "\r\nV" : d.v == null ? l += "1,0\r\n\"\"" : l += i(d.v, "V");
							break;
						case "b":
							l += d.v ? i(1, "TRUE") : i(0, "FALSE");
							break;
						case "s":
							l += a(!t || isNaN(+d.v) ? d.v : "=\"" + d.v + "\"");
							break;
						case "d":
							d.w ||= Je(d.z || W[14], ft(vt(d.v))), l += t ? i(d.w, "V") : a(d.w);
							break;
						default: l += "1,0\r\n\"\"";
					}
					l += "\r\n";
				}
			}
			o.push(l);
		}
		return o.join("") + "-1,0\r\nEOD";
	}
	return {
		to_workbook: r,
		to_sheet: n,
		from_sheet: o
	};
})(), fs = /*#__PURE__*/ (function() {
	function e(e) {
		return e.replace(/\\b/g, "\\").replace(/\\c/g, ":").replace(/\\n/g, "\n");
	}
	function t(e) {
		return e.replace(/\\/g, "\\b").replace(/:/g, "\\c").replace(/\n/g, "\\n");
	}
	function n(t, n) {
		for (var r = t.split("\n"), i = -1, a = -1, o = 0, s = []; o !== r.length; ++o) {
			var c = r[o].trim().split(":");
			if (c[0] === "cell") {
				var l = Ar(c[1]);
				if (s.length <= l.r) for (i = s.length; i <= l.r; ++i) s[i] || (s[i] = []);
				switch (i = l.r, a = l.c, c[2]) {
					case "t":
						s[i][a] = e(c[3]);
						break;
					case "v":
						s[i][a] = +c[3];
						break;
					case "vtf": var u = c[c.length - 1];
					case "vtc":
						switch (c[3]) {
							case "nl":
								s[i][a] = !!+c[4];
								break;
							default: s[i][a] = c[c.length - 1].charAt(0) == "#" ? {
								t: "e",
								v: Ai[c[c.length - 1]]
							} : +c[4];
						}
						c[2] == "vtf" && (s[i][a] = [s[i][a], u]);
				}
			}
		}
		return n && n.sheetRows && (s = s.slice(0, n.sheetRows)), s;
	}
	function r(e, t) {
		return Ur(n(e, t), t);
	}
	function i(e, t) {
		return Br(r(e, t), t);
	}
	var a = "--SocialCalcSpreadsheetControlSave\nContent-type: text/plain; charset=UTF-8\n";
	function o(e) {
		if (!e || !e["!ref"]) return "";
		for (var n = [], r = [], i, a = "", o = Mr(e["!ref"]), s = e["!data"] != null, c = o.s.r; c <= o.e.r; ++c) for (var l = o.s.c; l <= o.e.c; ++l) if (a = jr({
			r: c,
			c: l
		}), i = s ? (e["!data"][c] || [])[l] : e[a], i && i.v != null && i.t !== "z") {
			switch (r = [
				"cell",
				a,
				"t"
			], i.t) {
				case "s":
					r.push(t(i.v));
					break;
				case "b":
					r[2] = "vt" + (i.f ? "f" : "c"), r[3] = "nl", r[4] = i.v ? "1" : "0", r[5] = t(i.f || (i.v ? "TRUE" : "FALSE"));
					break;
				case "d":
					var u = ft(vt(i.v));
					r[2] = "vtc", r[3] = "nd", r[4] = "" + u, r[5] = i.w || Je(i.z || W[14], u);
					break;
				case "n":
					isFinite(i.v) ? i.f ? (r[2] = "vtf", r[3] = "n", r[4] = i.v, r[5] = t(i.f)) : (r[2] = "v", r[3] = i.v) : (r[2] = "vt" + (i.f ? "f" : "c"), r[3] = "e" + ki[isNaN(i.v) ? 36 : 7], r[4] = "0", r[5] = i.f || r[3].slice(1), r[6] = "e", r[7] = r[3].slice(1));
					break;
				case "e": continue;
			}
			n.push(r.join(":"));
		}
		return n.push("sheet:c:" + (o.e.c - o.s.c + 1) + ":r:" + (o.e.r - o.s.r + 1) + ":tvf:1"), n.push("valueformat:1:text-wiki"), n.join("\n");
	}
	function s(e) {
		return [
			"socialcalc:version:1.5\nMIME-Version: 1.0\nContent-Type: multipart/mixed; boundary=SocialCalcSpreadsheetControlSave",
			a,
			"# SocialCalc Spreadsheet Control Save\npart:sheet",
			a,
			o(e),
			"--SocialCalcSpreadsheetControlSave--"
		].join("\n");
	}
	return {
		to_workbook: i,
		to_sheet: r,
		from_sheet: s
	};
})(), ps = /*#__PURE__*/ (function() {
	function e(e, t, n, r, i) {
		i.raw ? t[n][r] = e : e === "" || (e === "TRUE" ? t[n][r] = !0 : e === "FALSE" ? t[n][r] = !1 : isNaN(St(e)) ? isNaN(At(e).getDate()) ? e.charCodeAt(0) == 35 && Ai[e] != null ? t[n][r] = {
			t: "e",
			v: Ai[e],
			w: e
		} : t[n][r] = e : t[n][r] = vt(e) : t[n][r] = St(e));
	}
	function t(t, n) {
		var r = n || {}, i = [];
		if (!t || t.length === 0) return i;
		for (var a = t.split(/[\r\n]/), o = a.length - 1; o >= 0 && a[o].length === 0;) --o;
		for (var s = 10, c = 0, l = 0; l <= o; ++l) c = a[l].indexOf(" "), c == -1 ? c = a[l].length : c++, s = Math.max(s, c);
		for (l = 0; l <= o; ++l) {
			i[l] = [];
			var u = 0;
			for (e(a[l].slice(0, s).trim(), i, l, u, r), u = 1; u <= (a[l].length - s) / 10 + 1; ++u) e(a[l].slice(s + (u - 1) * 10, s + u * 10).trim(), i, l, u, r);
		}
		return r.sheetRows && (i = i.slice(0, r.sheetRows)), i;
	}
	var n = {
		44: ",",
		9: "	",
		59: ";",
		124: "|"
	}, r = {
		44: 3,
		9: 2,
		59: 1,
		124: 0
	};
	function i(e) {
		for (var t = {}, i = !1, a = 0, o = 0; a < e.length; ++a) (o = e.charCodeAt(a)) == 34 ? i = !i : !i && o in n && (t[o] = (t[o] || 0) + 1);
		for (a in o = [], t) Object.prototype.hasOwnProperty.call(t, a) && o.push([t[a], a]);
		if (!o.length) for (a in t = r, t) Object.prototype.hasOwnProperty.call(t, a) && o.push([t[a], a]);
		return o.sort(function(e, t) {
			return e[0] - t[0] || r[e[1]] - r[t[1]];
		}), n[o.pop()[1]] || 44;
	}
	function a(e, t) {
		var n = t || {}, r = "";
		C != null && n.dense == null && (n.dense = C);
		var a = {};
		n.dense && (a["!data"] = []);
		var o = {
			s: {
				c: 0,
				r: 0
			},
			e: {
				c: 0,
				r: 0
			}
		};
		e.slice(0, 4) == "sep=" ? e.charCodeAt(5) == 13 && e.charCodeAt(6) == 10 ? (r = e.charAt(4), e = e.slice(7)) : e.charCodeAt(5) == 13 || e.charCodeAt(5) == 10 ? (r = e.charAt(4), e = e.slice(6)) : r = i(e.slice(0, 1024)) : r = n && n.FS ? n.FS : i(e.slice(0, 1024));
		var s = 0, c = 0, l = 0, u = 0, d = 0, f = r.charCodeAt(0), p = !1, m = 0, h = e.charCodeAt(0), g = n.dateNF == null ? null : $e(n.dateNF);
		function _() {
			var t = e.slice(u, d);
			t.slice(-1) == "\r" && (t = t.slice(0, -1));
			var r = {};
			if (t.charAt(0) == "\"" && t.charAt(t.length - 1) == "\"" && (t = t.slice(1, -1).replace(/""/g, "\"")), n.cellText !== !1 && (r.w = t), t.length === 0 ? r.t = "z" : n.raw || t.trim().length === 0 ? (r.t = "s", r.v = t) : t.charCodeAt(0) == 61 ? t.charCodeAt(1) == 34 && t.charCodeAt(t.length - 1) == 34 ? (r.t = "s", r.v = t.slice(2, -1).replace(/""/g, "\"")) : su(t) ? (r.t = "s", r.f = t.slice(1), r.v = t) : (r.t = "s", r.v = t) : t == "TRUE" ? (r.t = "b", r.v = !0) : t == "FALSE" ? (r.t = "b", r.v = !1) : isNaN(l = St(t)) ? !isNaN((l = At(t)).getDate()) || g && t.match(g) ? (r.z = n.dateNF || W[14], g && t.match(g) ? (l = vt(et(t, n.dateNF, t.match(g) || [])), n && n.UTC === !1 && (l = Mt(l))) : n && n.UTC === !1 ? l = Mt(l) : n.cellText !== !1 && n.dateNF && (r.w = Je(r.z, l)), n.cellDates ? (r.t = "d", r.v = l) : (r.t = "n", r.v = ft(l)), n.cellNF || delete r.z) : t.charCodeAt(0) == 35 && Ai[t] != null ? (r.t = "e", r.w = t, r.v = Ai[t]) : (r.t = "s", r.v = t) : (r.t = "n", r.v = l), r.t == "z" || (n.dense ? (a["!data"][s] || (a["!data"][s] = []), a["!data"][s][c] = r) : a[jr({
				c,
				r: s
			})] = r), u = d + 1, h = e.charCodeAt(u), o.e.c < c && (o.e.c = c), o.e.r < s && (o.e.r = s), m == f) ++c;
			else if (c = 0, ++s, n.sheetRows && n.sheetRows <= s) return !0;
		}
		outer: for (; d < e.length; ++d) switch (m = e.charCodeAt(d)) {
			case 34:
				h === 34 && (p = !p);
				break;
			case 13:
				if (p) break;
				e.charCodeAt(d + 1) == 10 && ++d;
			case f:
			case 10: if (!p && _()) break outer;
		}
		return d - u > 0 && _(), a["!ref"] = Z(o), a;
	}
	function o(e, n) {
		return !(n && n.PRN) || n.FS || e.slice(0, 4) == "sep=" || e.indexOf("	") >= 0 || e.indexOf(",") >= 0 || e.indexOf(";") >= 0 ? a(e, n) : Ur(t(e, n), n);
	}
	function s(e, t) {
		var n = "", r = t.type == "string" ? [
			0,
			0,
			0,
			0
		] : Og(e, t);
		switch (t.type) {
			case "base64":
				n = O(e);
				break;
			case "binary":
				n = e;
				break;
			case "buffer":
				t.codepage == 65001 ? n = e.toString("utf8") : (t.codepage, n = k && Buffer.isBuffer(e) ? e.toString("binary") : P(e));
				break;
			case "array":
				n = yt(e);
				break;
			case "string":
				n = e;
				break;
			default: throw Error("Unrecognized type " + t.type);
		}
		return r[0] == 239 && r[1] == 187 && r[2] == 191 ? n = xn(n.slice(3)) : t.type != "string" && t.type != "buffer" && t.codepage == 65001 ? n = xn(n) : t.type, n.slice(0, 19) == "socialcalc:version:" ? fs.to_sheet(t.type == "string" ? n : xn(n), t) : o(n, t);
	}
	function c(e, t) {
		return Br(s(e, t), t);
	}
	function l(e) {
		var t = [];
		if (!e["!ref"]) return "";
		for (var n = Pr(e["!ref"]), r, i = e["!data"] != null, a = n.s.r; a <= n.e.r; ++a) {
			for (var o = [], s = n.s.c; s <= n.e.c; ++s) {
				var c = jr({
					r: a,
					c: s
				});
				if (r = i ? (e["!data"][a] || [])[s] : e[c], !r || r.v == null) o.push("          ");
				else {
					for (var l = (r.w || (Ir(r), r.w) || "").slice(0, 10); l.length < 10;) l += " ";
					o.push(l + (s === 0 ? " " : ""));
				}
			}
			t.push(o.join(""));
		}
		return t.join("\n");
	}
	return {
		to_workbook: c,
		to_sheet: s,
		from_sheet: l
	};
})();
function ms(e, t) {
	var n = t || {}, r = !!n.WTF;
	n.WTF = !0;
	try {
		var i = us.to_workbook(e, n);
		return n.WTF = r, i;
	} catch (i) {
		if (n.WTF = r, i.message.indexOf("SYLK bad record ID") == -1 && r) throw i;
		return ps.to_workbook(e, t);
	}
}
function hs(e, t) {
	var n = t || {}, r = !!n.WTF;
	n.WTF = !0;
	try {
		var i = ds.to_workbook(e, n);
		if (!i || !i.Sheets) throw "DIF bad workbook";
		var a = zr(i.Sheets, i.SheetNames[0]);
		if (!a || !a["!ref"]) throw "DIF empty worksheet";
		return n.WTF = r, i;
	} catch {
		return n.WTF = r, ps.to_workbook(e, t);
	}
}
var gs = /*#__PURE__*/ (function() {
	function e(e, t, n) {
		if (e) {
			fr(e, e.l || 0);
			for (var r = n.Enum || V; e.l < e.length;) {
				var i = e.read_shift(2), a = r[i] || r[65535], o = e.read_shift(2), s = e.l + o, c = a.f && a.f(e, o, n);
				if (e.l = s, t(c, a, i)) return;
			}
		}
	}
	function t(e, t) {
		switch (t.type) {
			case "base64": return r(N(O(e)), t);
			case "binary": return r(N(e), t);
			case "buffer":
			case "array": return r(e, t);
		}
		throw "Unsupported type " + t.type;
	}
	var n = [
		"mmmm",
		"dd-mmm-yyyy",
		"dd-mmm",
		"mmm-yyyy",
		"@",
		"mm/dd",
		"hh:mm:ss AM/PM",
		"hh:mm AM/PM",
		"mm/dd/yyyy",
		"mm/dd",
		"hh:mm:ss",
		"hh:mm"
	];
	function r(t, r) {
		if (!t) return t;
		var i = r || {};
		C != null && i.dense == null && (i.dense = C);
		var a = {}, o = "Sheet1", s = "", c = 0, l = Lr(), u = [], d = [], f = [];
		i.dense && (f = a["!data"] = []);
		var p = {
			s: {
				r: 0,
				c: 0
			},
			e: {
				r: 0,
				c: 0
			}
		}, m = i.sheetRows || 0, h = {};
		if (t[4] == 81 && t[5] == 80 && t[6] == 87) return re(t, r);
		if (t[2] == 0 && (t[3] == 8 || t[3] == 9) && t.length >= 16 && t[14] == 5 && t[15] === 108) throw Error("Unsupported Works 3 for Mac file");
		if (t[2] == 2) i.Enum = V, e(t, function(e, t, r) {
			switch (r) {
				case 0:
					i.vers = e, e >= 4096 && (i.qpro = !0);
					break;
				case 255:
					i.vers = e, i.works = !0;
					break;
				case 6:
					p = e;
					break;
				case 204:
					e && (s = e);
					break;
				case 222:
					s = e;
					break;
				case 15:
				case 51: (!i.qpro && !i.works || r == 51) && e[1].v.charCodeAt(0) < 48 && (e[1].v = e[1].v.slice(1)), (i.works || i.works2) && (e[1].v = e[1].v.replace(/\r\n/g, "\n"));
				case 13:
				case 14:
				case 16:
					(e[2] & 112) == 112 && (e[2] & 15) > 1 && (e[2] & 15) < 15 && (e[1].z = i.dateNF || n[(e[2] & 15) - 1] || W[14], i.cellDates && (e[1].v = pt(e[1].v), e[1].t = typeof e[1].v == "number" ? "n" : "d")), i.qpro && e[3] > c && (a["!ref"] = Z(p), Rr(l, o, a), u.push(o), a = {}, i.dense && (f = a["!data"] = []), p = {
						s: {
							r: 0,
							c: 0
						},
						e: {
							r: 0,
							c: 0
						}
					}, c = e[3], o = s || "Sheet" + (c + 1), s = "");
					var d = i.dense ? (f[e[0].r] || [])[e[0].c] : a[jr(e[0])];
					if (d) {
						d.t = e[1].t, d.v = e[1].v, e[1].z != null && (d.z = e[1].z), e[1].f != null && (d.f = e[1].f), h = d;
						break;
					}
					i.dense ? (f[e[0].r] || (f[e[0].r] = []), f[e[0].r][e[0].c] = e[1]) : a[jr(e[0])] = e[1], h = e[1];
					break;
				case 21509:
					i.works2 = !0;
					break;
				case 21506: e == 5281 && (h.z = "hh:mm:ss", i.cellDates && h.t == "n" && (h.v = pt(h.v), h.t = typeof h.v == "number" ? "n" : "d"));
			}
		}, i);
		else if (t[2] == 26 || t[2] == 14) i.Enum = H, t[2] == 14 && (i.qpro = !0, t.l = 0), e(t, function(e, t, n) {
			switch (n) {
				case 204:
					o = e;
					break;
				case 22: e[1].v.charCodeAt(0) < 48 && (e[1].v = e[1].v.slice(1)), e[1].v = e[1].v.replace(/\x0F./g, function(e) {
					return String.fromCharCode(e.charCodeAt(1) - 32);
				}).replace(/\r\n/g, "\n");
				case 23:
				case 24:
				case 25:
				case 37:
				case 39:
				case 40:
					if (e[3] > c && (a["!ref"] = Z(p), Rr(l, o, a), u.push(o), a = {}, i.dense && (f = a["!data"] = []), p = {
						s: {
							r: 0,
							c: 0
						},
						e: {
							r: 0,
							c: 0
						}
					}, c = e[3], o = "Sheet" + (c + 1)), m > 0 && e[0].r >= m) break;
					i.dense ? (f[e[0].r] || (f[e[0].r] = []), f[e[0].r][e[0].c] = e[1]) : a[jr(e[0])] = e[1], p.e.c < e[0].c && (p.e.c = e[0].c), p.e.r < e[0].r && (p.e.r = e[0].r);
					break;
				case 27:
					e[14e3] && (d[e[14e3][0]] = e[14e3][1]);
					break;
				case 1537: d[e[0]] = e[1], e[0] == c && (o = e[1]);
			}
		}, i);
		else throw Error("Unrecognized LOTUS BOF " + t[2]);
		if (a["!ref"] = Z(p), Rr(l, s || o, a), u.push(s || o), !d.length) return {
			SheetNames: u,
			Sheets: l
		};
		for (var g = Lr(), _ = [], v = 0; v < d.length; ++v) zr(l, u[v]) ? (_.push(d[v] || u[v]), Rr(g, d[v] || u[v], zr(l, d[v]) || zr(l, u[v]))) : (_.push(d[v]), Rr(g, d[v], { "!ref": "A1" }));
		return {
			SheetNames: _,
			Sheets: g
		};
	}
	function i(e, t) {
		var n = t || {};
		if (+n.codepage >= 0 && m(+n.codepage), n.type == "string") throw Error("Cannot write WK1 to JS string");
		var r = gr();
		if (!e["!ref"]) throw Error("Cannot export empty sheet to WK1");
		var i = Pr(e["!ref"]), a = e["!data"] != null, s = [];
		rh(r, 0, o(1030)), rh(r, 6, l(i));
		for (var c = Math.min(i.e.r, 8191), u = i.s.c; u <= i.e.c; ++u) s[u] = Er(u);
		for (var d = i.s.r; d <= c; ++d) {
			var f = Sr(d);
			for (u = i.s.c; u <= i.e.c; ++u) {
				var h = a ? (e["!data"][d] || [])[u] : e[s[u] + f];
				if (h && h.t != "z") switch (h.t) {
					case "n":
						(h.v | 0) == h.v && h.v >= -32768 && h.v <= 32767 ? rh(r, 13, _(d, u, h)) : rh(r, 14, y(d, u, h));
						break;
					case "d":
						var g = ft(h.v);
						(g | 0) == g && g >= -32768 && g <= 32767 ? rh(r, 13, _(d, u, {
							t: "n",
							v: g,
							z: h.z || W[14]
						})) : rh(r, 14, y(d, u, {
							t: "n",
							v: g,
							z: h.z || W[14]
						}));
						break;
					default:
						var v = Ir(h);
						rh(r, 15, p(d, u, v.slice(0, 239)));
				}
			}
		}
		return rh(r, 1), r.end();
	}
	function a(e, t) {
		var n = t || {};
		if (+n.codepage >= 0 && m(+n.codepage), n.type == "string") throw Error("Cannot write WK3 to JS string");
		var r = gr();
		rh(r, 0, s(e));
		for (var i = 0, a = 0; i < e.SheetNames.length; ++i) (zr(e.Sheets, e.SheetNames[i]) || {})["!ref"] && rh(r, 27, B(e.SheetNames[i], a++));
		var o = 0;
		for (i = 0; i < e.SheetNames.length; ++i) {
			var c = zr(e.Sheets, e.SheetNames[i]);
			if (c && c["!ref"]) {
				for (var l = Pr(c["!ref"]), u = c["!data"] != null, d = [], f = Math.min(l.e.r, 8191), p = l.s.r; p <= f; ++p) for (var h = Sr(p), g = l.s.c; g <= l.e.c; ++g) {
					p === l.s.r && (d[g] = Er(g));
					var _ = d[g] + h, v = u ? (c["!data"][p] || [])[g] : c[_];
					if (v && v.t != "z") {
						if (v.t == "n") rh(r, 23, M(p, g, o, v.v));
						else {
							var y = Ir(v);
							rh(r, 22, k(p, g, o, y.slice(0, 239)));
						}
					}
				}
				++o;
			}
		}
		return rh(r, 1), r.end();
	}
	function o(e) {
		var t = mr(2);
		return t.write_shift(2, e), t;
	}
	function s(e) {
		var t = mr(26);
		t.write_shift(2, 4096), t.write_shift(2, 4), t.write_shift(4, 0);
		for (var n = 0, r = 0, i = 0, a = 0; a < e.SheetNames.length; ++a) {
			var o = e.SheetNames[a], s = zr(e.Sheets, o);
			if (s && s["!ref"]) {
				++i;
				var c = Mr(s["!ref"]);
				n < c.e.r && (n = c.e.r), r < c.e.c && (r = c.e.c);
			}
		}
		return n > 8191 && (n = 8191), t.write_shift(2, n), t.write_shift(1, i), t.write_shift(1, r), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(1, 1), t.write_shift(1, 2), t.write_shift(4, 0), t.write_shift(4, 0), t;
	}
	function c(e, t, n) {
		var r = {
			s: {
				c: 0,
				r: 0
			},
			e: {
				c: 0,
				r: 0
			}
		};
		return t == 8 && n.qpro ? (r.s.c = e.read_shift(1), e.l++, r.s.r = e.read_shift(2), r.e.c = e.read_shift(1), e.l++, r.e.r = e.read_shift(2), r) : (r.s.c = e.read_shift(2), r.s.r = e.read_shift(2), t == 12 && n.qpro && (e.l += 2), r.e.c = e.read_shift(2), r.e.r = e.read_shift(2), t == 12 && n.qpro && (e.l += 2), r.s.c == 65535 && (r.s.c = r.e.c = r.s.r = r.e.r = 0), r);
	}
	function l(e) {
		var t = mr(8);
		return t.write_shift(2, e.s.c), t.write_shift(2, e.s.r), t.write_shift(2, e.e.c), t.write_shift(2, e.e.r), t;
	}
	function u(e, t, n) {
		var r = [
			{
				c: 0,
				r: 0
			},
			{
				t: "n",
				v: 0
			},
			0,
			0
		];
		return n.qpro && n.vers != 20768 ? (r[0].c = e.read_shift(1), r[3] = e.read_shift(1), r[0].r = e.read_shift(2), e.l += 2) : n.works ? (r[0].c = e.read_shift(2), r[0].r = e.read_shift(2), r[2] = e.read_shift(2)) : (r[2] = e.read_shift(1), r[0].c = e.read_shift(2), r[0].r = e.read_shift(2)), r;
	}
	function d(e) {
		return e.z && Ue(e.z) ? 240 | (n.indexOf(e.z) + 1 || 2) : 255;
	}
	function f(e, t, n) {
		var r = e.l + t, i = u(e, t, n);
		if (i[1].t = "s", (n.vers & 65534) == 20768) {
			e.l++;
			var a = e.read_shift(1);
			return i[1].v = e.read_shift(a, "utf8"), i;
		}
		return n.qpro && e.l++, i[1].v = e.read_shift(r - e.l, "cstr"), i;
	}
	function p(e, t, n) {
		var r = mr(7 + n.length);
		r.write_shift(1, 255), r.write_shift(2, t), r.write_shift(2, e), r.write_shift(1, 39);
		for (var i = 0; i < r.length; ++i) {
			var a = n.charCodeAt(i);
			r.write_shift(1, a >= 128 ? 95 : a);
		}
		return r.write_shift(1, 0), r;
	}
	function h(e, t, n) {
		var r = e.l + t, i = u(e, t, n);
		if (i[1].t = "s", n.vers == 20768) {
			var a = e.read_shift(1);
			return i[1].v = e.read_shift(a, "utf8"), i;
		}
		return i[1].v = e.read_shift(r - e.l, "cstr"), i;
	}
	function g(e, t, n) {
		var r = u(e, t, n);
		return r[1].v = e.read_shift(2, "i"), r;
	}
	function _(e, t, n) {
		var r = mr(7);
		return r.write_shift(1, d(n)), r.write_shift(2, t), r.write_shift(2, e), r.write_shift(2, n.v, "i"), r;
	}
	function v(e, t, n) {
		var r = u(e, t, n);
		return r[1].v = e.read_shift(8, "f"), r;
	}
	function y(e, t, n) {
		var r = mr(13);
		return r.write_shift(1, d(n)), r.write_shift(2, t), r.write_shift(2, e), r.write_shift(8, n.v, "f"), r;
	}
	function b(e, t, n) {
		var r = e.l + t, i = u(e, t, n);
		if (i[1].v = e.read_shift(8, "f"), n.qpro) e.l = r;
		else {
			var a = e.read_shift(2);
			T(e.slice(e.l, e.l + a), i), e.l += a;
		}
		return i;
	}
	function x(e, t, n) {
		var r = t & 32768;
		return t &= -32769, t = (r ? e : 0) + (t >= 8192 ? t - 16384 : t), (r ? "" : "$") + (n ? Er(t) : Sr(t));
	}
	var S = {
		31: ["NA", 0],
		33: ["ABS", 1],
		34: ["TRUNC", 1],
		35: ["SQRT", 1],
		36: ["LOG", 1],
		37: ["LN", 1],
		38: ["PI", 0],
		39: ["SIN", 1],
		40: ["COS", 1],
		41: ["TAN", 1],
		42: ["ATAN2", 2],
		43: ["ATAN", 1],
		44: ["ASIN", 1],
		45: ["ACOS", 1],
		46: ["EXP", 1],
		47: ["MOD", 2],
		49: ["ISNA", 1],
		50: ["ISERR", 1],
		51: ["FALSE", 0],
		52: ["TRUE", 0],
		53: ["RAND", 0],
		54: ["DATE", 3],
		63: ["ROUND", 2],
		64: ["TIME", 3],
		68: ["ISNUMBER", 1],
		69: ["ISTEXT", 1],
		70: ["LEN", 1],
		71: ["VALUE", 1],
		73: ["MID", 3],
		74: ["CHAR", 1],
		80: ["SUM", 69],
		81: ["AVERAGEA", 69],
		82: ["COUNTA", 69],
		83: ["MINA", 69],
		84: ["MAXA", 69],
		102: ["UPPER", 1],
		103: ["LOWER", 1],
		107: ["PROPER", 1],
		109: ["TRIM", 1],
		111: ["T", 1]
	}, w = /* @__PURE__ */ ".........+.-.*./.^.=.<>.<=.>=.<.>.....&.......".split(".");
	function T(e, t) {
		fr(e, 0);
		for (var n = [], r = 0, i = "", a = "", o = "", s = ""; e.l < e.length;) {
			var c = e[e.l++];
			switch (c) {
				case 0:
					n.push(e.read_shift(8, "f"));
					break;
				case 1:
					a = x(t[0].c, e.read_shift(2), !0), i = x(t[0].r, e.read_shift(2), !1), n.push(a + i);
					break;
				case 2:
					var l = x(t[0].c, e.read_shift(2), !0), u = x(t[0].r, e.read_shift(2), !1);
					a = x(t[0].c, e.read_shift(2), !0), i = x(t[0].r, e.read_shift(2), !1), n.push(l + u + ":" + a + i);
					break;
				case 3:
					if (e.l < e.length) {
						console.error("WK1 premature formula end");
						return;
					}
					break;
				case 4:
					n.push("(" + n.pop() + ")");
					break;
				case 5:
					n.push(e.read_shift(2));
					break;
				case 6:
					for (var d = ""; c = e[e.l++];) d += String.fromCharCode(c);
					n.push("\"" + d.replace(/"/g, "\"\"") + "\"");
					break;
				case 8:
					n.push("-" + n.pop());
					break;
				case 23:
					n.push("+" + n.pop());
					break;
				case 22:
					n.push("NOT(" + n.pop() + ")");
					break;
				case 20:
				case 21:
					s = n.pop(), o = n.pop(), n.push(["AND", "OR"][c - 20] + "(" + o + "," + s + ")");
					break;
				default: if (c < 32 && w[c]) s = n.pop(), o = n.pop(), n.push(o + w[c] + s);
				else if (S[c]) {
					if (r = S[c][1], r == 69 && (r = e[e.l++]), r > n.length) {
						console.error("WK1 bad formula parse 0x" + c.toString(16) + ":|" + n.join("|") + "|");
						return;
					}
					var f = n.slice(-r);
					n.length -= r, n.push(S[c][0] + "(" + f.join(",") + ")");
				} else if (c <= 7) return console.error("WK1 invalid opcode " + c.toString(16));
				else if (c <= 24) return console.error("WK1 unsupported op " + c.toString(16));
				else if (c <= 30) return console.error("WK1 invalid opcode " + c.toString(16));
				else if (c <= 115) return console.error("WK1 unsupported function opcode " + c.toString(16));
				else return console.error("WK1 unrecognized opcode " + c.toString(16));
			}
		}
		n.length == 1 ? t[1].f = "" + n[0] : console.error("WK1 bad formula parse |" + n.join("|") + "|");
	}
	function E(e) {
		var t = [
			{
				c: 0,
				r: 0
			},
			{
				t: "n",
				v: 0
			},
			0
		];
		return t[0].r = e.read_shift(2), t[3] = e[e.l++], t[0].c = e[e.l++], t;
	}
	function D(e, t) {
		var n = E(e, t);
		return n[1].t = "s", n[1].v = e.read_shift(t - 4, "cstr"), n;
	}
	function k(e, t, n, r) {
		var i = mr(6 + r.length);
		i.write_shift(2, e), i.write_shift(1, n), i.write_shift(1, t), i.write_shift(1, 39);
		for (var a = 0; a < r.length; ++a) {
			var o = r.charCodeAt(a);
			i.write_shift(1, o >= 128 ? 95 : o);
		}
		return i.write_shift(1, 0), i;
	}
	function A(e, t) {
		var n = E(e, t);
		n[1].v = e.read_shift(2);
		var r = n[1].v >> 1;
		if (n[1].v & 1) switch (r & 7) {
			case 0:
				r = (r >> 3) * 5e3;
				break;
			case 1:
				r = (r >> 3) * 500;
				break;
			case 2:
				r = (r >> 3) / 20;
				break;
			case 3:
				r = (r >> 3) / 200;
				break;
			case 4:
				r = (r >> 3) / 2e3;
				break;
			case 5:
				r = (r >> 3) / 2e4;
				break;
			case 6:
				r = (r >> 3) / 16;
				break;
			case 7: r = (r >> 3) / 64;
		}
		return n[1].v = r, n;
	}
	function j(e, t) {
		var n = E(e, t), r = e.read_shift(4), i = e.read_shift(4), a = e.read_shift(2);
		if (a == 65535) return r === 0 && i === 3221225472 ? (n[1].t = "e", n[1].v = 15) : r === 0 && i === 3489660928 ? (n[1].t = "e", n[1].v = 42) : n[1].v = 0, n;
		var o = a & 32768;
		return a = (a & 32767) - 16446, n[1].v = (1 - o * 2) * (i * 2 ** (a + 32) + r * 2 ** a), n;
	}
	function M(e, t, n, r) {
		var i = mr(14);
		if (i.write_shift(2, e), i.write_shift(1, n), i.write_shift(1, t), r == 0) return i.write_shift(4, 0), i.write_shift(4, 0), i.write_shift(2, 65535), i;
		var a = 0, o = 0, s = 0, c = 0;
		return r < 0 && (a = 1, r = -r), o = Math.log2(r) | 0, r /= 2 ** (o - 31), c = r >>> 0, c & 2147483648 || (r /= 2, ++o, c = r >>> 0), r -= c, c |= 2147483648, c >>>= 0, r *= 2 ** 32, s = r >>> 0, i.write_shift(4, s), i.write_shift(4, c), o += 16383 + (a ? 32768 : 0), i.write_shift(2, o), i;
	}
	function ee(e, t) {
		var n = j(e, 14);
		return e.l += t - 14, n;
	}
	function P(e, t) {
		var n = E(e, t), r = e.read_shift(4);
		return n[1].v = r >> 6, n;
	}
	function F(e, t) {
		var n = E(e, t), r = e.read_shift(8, "f");
		return n[1].v = r, n;
	}
	function I(e, t) {
		var n = F(e, 12);
		return e.l += t - 12, n;
	}
	function L(e, t) {
		return e[e.l + t - 1] == 0 ? e.read_shift(t, "cstr") : "";
	}
	function R(e, t) {
		var n = e[e.l++];
		n > t - 1 && (n = t - 1);
		for (var r = ""; r.length < n;) r += String.fromCharCode(e[e.l++]);
		return r;
	}
	function te(e, t, n) {
		if (!(!n.qpro || t < 21)) {
			var r = e.read_shift(1);
			return e.l += 17, e.l += 1, e.l += 2, [r, e.read_shift(t - 21, "cstr")];
		}
	}
	function z(e, t) {
		for (var n = {}, r = e.l + t; e.l < r;) {
			var i = e.read_shift(2);
			if (i == 14e3) {
				for (n[i] = [0, ""], n[i][0] = e.read_shift(2); e[e.l];) n[i][1] += String.fromCharCode(e[e.l]), e.l++;
				e.l++;
			}
		}
		return n;
	}
	function B(e, t) {
		var n = mr(5 + e.length);
		n.write_shift(2, 14e3), n.write_shift(2, t);
		for (var r = 0; r < e.length; ++r) {
			var i = e.charCodeAt(r);
			n[n.l++] = i > 127 ? 95 : i;
		}
		return n[n.l++] = 0, n;
	}
	var V = {
		0: {
			n: "BOF",
			f: ha
		},
		1: { n: "EOF" },
		2: { n: "CALCMODE" },
		3: { n: "CALCORDER" },
		4: { n: "SPLIT" },
		5: { n: "SYNC" },
		6: {
			n: "RANGE",
			f: c
		},
		7: { n: "WINDOW1" },
		8: { n: "COLW1" },
		9: { n: "WINTWO" },
		10: { n: "COLW2" },
		11: { n: "NAME" },
		12: { n: "BLANK" },
		13: {
			n: "INTEGER",
			f: g
		},
		14: {
			n: "NUMBER",
			f: v
		},
		15: {
			n: "LABEL",
			f
		},
		16: {
			n: "FORMULA",
			f: b
		},
		24: { n: "TABLE" },
		25: { n: "ORANGE" },
		26: { n: "PRANGE" },
		27: { n: "SRANGE" },
		28: { n: "FRANGE" },
		29: { n: "KRANGE1" },
		32: { n: "HRANGE" },
		35: { n: "KRANGE2" },
		36: { n: "PROTEC" },
		37: { n: "FOOTER" },
		38: { n: "HEADER" },
		39: { n: "SETUP" },
		40: { n: "MARGINS" },
		41: { n: "LABELFMT" },
		42: { n: "TITLES" },
		43: { n: "SHEETJS" },
		45: { n: "GRAPH" },
		46: { n: "NGRAPH" },
		47: { n: "CALCCOUNT" },
		48: { n: "UNFORMATTED" },
		49: { n: "CURSORW12" },
		50: { n: "WINDOW" },
		51: {
			n: "STRING",
			f: h
		},
		55: { n: "PASSWORD" },
		56: { n: "LOCKED" },
		60: { n: "QUERY" },
		61: { n: "QUERYNAME" },
		62: { n: "PRINT" },
		63: { n: "PRINTNAME" },
		64: { n: "GRAPH2" },
		65: { n: "GRAPHNAME" },
		66: { n: "ZOOM" },
		67: { n: "SYMSPLIT" },
		68: { n: "NSROWS" },
		69: { n: "NSCOLS" },
		70: { n: "RULER" },
		71: { n: "NNAME" },
		72: { n: "ACOMM" },
		73: { n: "AMACRO" },
		74: { n: "PARSE" },
		102: { n: "PRANGES??" },
		103: { n: "RRANGES??" },
		104: { n: "FNAME??" },
		105: { n: "MRANGES??" },
		204: {
			n: "SHEETNAMECS",
			f: L
		},
		222: {
			n: "SHEETNAMELP",
			f: R
		},
		255: {
			n: "BOF",
			f: ha
		},
		21506: {
			n: "WKSNF",
			f: ha
		},
		65535: { n: "" }
	}, H = {
		0: { n: "BOF" },
		1: { n: "EOF" },
		2: { n: "PASSWORD" },
		3: { n: "CALCSET" },
		4: { n: "WINDOWSET" },
		5: { n: "SHEETCELLPTR" },
		6: { n: "SHEETLAYOUT" },
		7: { n: "COLUMNWIDTH" },
		8: { n: "HIDDENCOLUMN" },
		9: { n: "USERRANGE" },
		10: { n: "SYSTEMRANGE" },
		11: { n: "ZEROFORCE" },
		12: { n: "SORTKEYDIR" },
		13: { n: "FILESEAL" },
		14: { n: "DATAFILLNUMS" },
		15: { n: "PRINTMAIN" },
		16: { n: "PRINTSTRING" },
		17: { n: "GRAPHMAIN" },
		18: { n: "GRAPHSTRING" },
		19: { n: "??" },
		20: { n: "ERRCELL" },
		21: { n: "NACELL" },
		22: {
			n: "LABEL16",
			f: D
		},
		23: {
			n: "NUMBER17",
			f: j
		},
		24: {
			n: "NUMBER18",
			f: A
		},
		25: {
			n: "FORMULA19",
			f: ee
		},
		26: { n: "FORMULA1A" },
		27: {
			n: "XFORMAT",
			f: z
		},
		28: { n: "DTLABELMISC" },
		29: { n: "DTLABELCELL" },
		30: { n: "GRAPHWINDOW" },
		31: { n: "CPA" },
		32: { n: "LPLAUTO" },
		33: { n: "QUERY" },
		34: { n: "HIDDENSHEET" },
		35: { n: "??" },
		37: {
			n: "NUMBER25",
			f: P
		},
		38: { n: "??" },
		39: {
			n: "NUMBER27",
			f: F
		},
		40: {
			n: "FORMULA28",
			f: I
		},
		142: { n: "??" },
		147: { n: "??" },
		150: { n: "??" },
		151: { n: "??" },
		152: { n: "??" },
		153: { n: "??" },
		154: { n: "??" },
		155: { n: "??" },
		156: { n: "??" },
		163: { n: "??" },
		174: { n: "??" },
		175: { n: "??" },
		176: { n: "??" },
		177: { n: "??" },
		184: { n: "??" },
		185: { n: "??" },
		186: { n: "??" },
		187: { n: "??" },
		188: { n: "??" },
		195: { n: "??" },
		201: { n: "??" },
		204: {
			n: "SHEETNAMECS",
			f: L
		},
		205: { n: "??" },
		206: { n: "??" },
		207: { n: "??" },
		208: { n: "??" },
		256: { n: "??" },
		259: { n: "??" },
		260: { n: "??" },
		261: { n: "??" },
		262: { n: "??" },
		263: { n: "??" },
		265: { n: "??" },
		266: { n: "??" },
		267: { n: "??" },
		268: { n: "??" },
		270: { n: "??" },
		271: { n: "??" },
		384: { n: "??" },
		389: { n: "??" },
		390: { n: "??" },
		393: { n: "??" },
		396: { n: "??" },
		512: { n: "??" },
		514: { n: "??" },
		513: { n: "??" },
		516: { n: "??" },
		517: { n: "??" },
		640: { n: "??" },
		641: { n: "??" },
		642: { n: "??" },
		643: { n: "??" },
		644: { n: "??" },
		645: { n: "??" },
		646: { n: "??" },
		647: { n: "??" },
		648: { n: "??" },
		658: { n: "??" },
		659: { n: "??" },
		660: { n: "??" },
		661: { n: "??" },
		662: { n: "??" },
		665: { n: "??" },
		666: { n: "??" },
		768: { n: "??" },
		772: { n: "??" },
		1537: {
			n: "SHEETINFOQP",
			f: te
		},
		1600: { n: "??" },
		1602: { n: "??" },
		1793: { n: "??" },
		1794: { n: "??" },
		1795: { n: "??" },
		1796: { n: "??" },
		1920: { n: "??" },
		2048: { n: "??" },
		2049: { n: "??" },
		2052: { n: "??" },
		2688: { n: "??" },
		10998: { n: "??" },
		12849: { n: "??" },
		28233: { n: "??" },
		28484: { n: "??" },
		65535: { n: "" }
	}, U = {
		5: "dd-mmm-yy",
		6: "dd-mmm",
		7: "mmm-yy",
		8: "mm/dd/yy",
		10: "hh:mm:ss AM/PM",
		11: "hh:mm AM/PM",
		14: "dd-mmm-yyyy",
		15: "mmm-yyyy",
		34: "0.00",
		50: "0.00;[Red]0.00",
		66: "0.00;(0.00)",
		82: "0.00;[Red](0.00)",
		162: "\"$\"#,##0.00;\\(\"$\"#,##0.00\\)",
		288: "0%",
		304: "0E+00",
		320: "# ?/?"
	};
	function ne(e) {
		var t = e.read_shift(2), n = e.read_shift(1);
		if (n != 0) throw "unsupported QPW string type " + n.toString(16);
		return e.read_shift(t, "sbcs-cont");
	}
	function re(e, t) {
		fr(e, 0);
		var n = t || {};
		C != null && n.dense == null && (n.dense = C);
		var r = {};
		n.dense && (r["!data"] = []);
		var i = [], a = "", o = {
			s: {
				r: -1,
				c: -1
			},
			e: {
				r: -1,
				c: -1
			}
		}, s = 0, c = 0, l = 0, u = 0, d = {
			SheetNames: [],
			Sheets: Lr()
		}, f = [];
		outer: for (; e.l < e.length;) {
			var p = e.read_shift(2), m = e.read_shift(2), h = e.slice(e.l, e.l + m);
			switch (fr(h, 0), p) {
				case 1:
					if (h.read_shift(4) != 962023505) throw "Bad QPW9 BOF!";
					break;
				case 2: break outer;
				case 8: break;
				case 10:
					for (var g = h.read_shift(4), _ = (h.length - h.l) / g | 0, v = 0; v < g; ++v) {
						var y = h.l + _, b = {};
						h.l += 2, b.numFmtId = h.read_shift(2), U[b.numFmtId] && (b.z = U[b.numFmtId]), h.l = y, f.push(b);
					}
					break;
				case 1025: break;
				case 1026: break;
				case 1031:
					for (h.l += 12; h.l < h.length;) s = h.read_shift(2), c = h.read_shift(1), i.push(h.read_shift(s, "cstr"));
					break;
				case 1032: break;
				case 1537:
					var x = h.read_shift(2);
					r = {}, n.dense && (r["!data"] = []), o.s.c = h.read_shift(2), o.e.c = h.read_shift(2), o.s.r = h.read_shift(4), o.e.r = h.read_shift(4), h.l += 4, h.l + 2 < h.length && (s = h.read_shift(2), c = h.read_shift(1), a = s == 0 ? "" : h.read_shift(s, "cstr")), a ||= Er(x);
					break;
				case 1538:
					if (o.s.c > 255 || o.s.r > 999999) break;
					o.e.c < o.s.c && (o.e.c = o.s.c), o.e.r < o.s.r && (o.e.r = o.s.r), r["!ref"] = Z(o), Yg(d, r, a);
					break;
				case 2561:
					l = h.read_shift(2), o.e.c < l && (o.e.c = l), o.s.c > l && (o.s.c = l), u = h.read_shift(4), o.s.r > u && (o.s.r = u), u = h.read_shift(4), o.e.r < u && (o.e.r = u);
					break;
				case 3073:
					u = h.read_shift(4), s = h.read_shift(4), o.s.r > u && (o.s.r = u), o.e.r < u + s - 1 && (o.e.r = u + s - 1);
					for (var S = Er(l); h.l < h.length;) {
						var w = { t: "z" }, T = h.read_shift(1), E = -1;
						T & 128 && (E = h.read_shift(2));
						var D = T & 64 ? h.read_shift(2) - 1 : 0;
						switch (T & 31) {
							case 0: break;
							case 1: break;
							case 2:
								w = {
									t: "n",
									v: h.read_shift(2)
								};
								break;
							case 3:
								w = {
									t: "n",
									v: h.read_shift(2, "i")
								};
								break;
							case 4:
								w = {
									t: "n",
									v: ti(h)
								};
								break;
							case 5:
								w = {
									t: "n",
									v: h.read_shift(8, "f")
								};
								break;
							case 7:
								w = {
									t: "s",
									v: i[c = h.read_shift(4) - 1]
								};
								break;
							case 8:
								w = {
									t: "n",
									v: h.read_shift(8, "f")
								}, h.l += 2, h.l += 4, isNaN(w.v) && (w = {
									t: "e",
									v: 15
								});
								break;
							default: throw "Unrecognized QPW cell type " + (T & 31);
						}
						E != -1 && (f[E - 1] || {}).z && (w.z = f[E - 1].z);
						var O = 0;
						if (T & 32) switch (T & 31) {
							case 2:
								O = h.read_shift(2);
								break;
							case 3:
								O = h.read_shift(2, "i");
								break;
							case 7:
								O = h.read_shift(2);
								break;
							default: throw "Unsupported delta for QPW cell type " + (T & 31);
						}
						if (n.sheetStubs || w.t != "z") {
							var k = bt(w);
							w.t == "n" && w.z && Ue(w.z) && n.cellDates && (k.v = pt(w.v), k.t = typeof k.v == "number" ? "n" : "d"), r["!data"] == null ? r[S + Sr(u)] = k : (r["!data"][u] || (r["!data"][u] = []), r["!data"][u][l] = k);
						}
						for (++u, --s; D-- > 0 && s >= 0;) {
							if (T & 32) switch (T & 31) {
								case 2:
									w = {
										t: "n",
										v: w.v + O & 65535
									};
									break;
								case 3:
									w = {
										t: "n",
										v: w.v + O & 65535
									}, w.v > 32767 && (w.v -= 65536);
									break;
								case 7:
									w = {
										t: "s",
										v: i[c = c + O >>> 0]
									};
									break;
								default: throw "Cannot apply delta for QPW cell type " + (T & 31);
							}
							else switch (T & 31) {
								case 1:
									w = { t: "z" };
									break;
								case 2:
									w = {
										t: "n",
										v: h.read_shift(2)
									};
									break;
								case 7:
									w = {
										t: "s",
										v: i[c = h.read_shift(4) - 1]
									};
									break;
								default: throw "Cannot apply repeat for QPW cell type " + (T & 31);
							}
							(n.sheetStubs || w.t != "z") && (r["!data"] == null ? r[S + Sr(u)] = w : (r["!data"][u] || (r["!data"][u] = []), r["!data"][u][l] = w)), ++u, --s;
						}
					}
					break;
				case 3074:
					l = h.read_shift(2), u = h.read_shift(4);
					var A = ne(h);
					r["!data"] == null ? r[Er(l) + Sr(u)] = {
						t: "s",
						v: A
					} : (r["!data"][u] || (r["!data"][u] = []), r["!data"][u][l] = {
						t: "s",
						v: A
					});
			}
			e.l += m;
		}
		return d;
	}
	return {
		sheet_to_wk1: i,
		book_to_wk3: a,
		to_workbook: t
	};
})();
function _s(e) {
	var t = {}, n = e.match(an), r = 0, i = !1;
	if (n) for (; r != n.length; ++r) {
		var a = J(n[r]);
		switch (a[0].replace(/<\w*:/g, "<")) {
			case "<condense": break;
			case "<extend": break;
			case "<shadow": if (!a.val) break;
			case "<shadow>":
			case "<shadow/>":
				t.shadow = 1;
				break;
			case "</shadow>": break;
			case "<charset":
				if (a.val == "1") break;
				t.cp = d[parseInt(a.val, 10)];
				break;
			case "<outline": if (!a.val) break;
			case "<outline>":
			case "<outline/>":
				t.outline = 1;
				break;
			case "</outline>": break;
			case "<rFont":
				t.name = a.val;
				break;
			case "<sz":
				t.sz = a.val;
				break;
			case "<strike": if (!a.val) break;
			case "<strike>":
			case "<strike/>":
				t.strike = 1;
				break;
			case "</strike>": break;
			case "<u":
				if (!a.val) break;
				switch (a.val) {
					case "double":
						t.uval = "double";
						break;
					case "singleAccounting":
						t.uval = "single-accounting";
						break;
					case "doubleAccounting": t.uval = "double-accounting";
				}
			case "<u>":
			case "<u/>":
				t.u = 1;
				break;
			case "</u>": break;
			case "<b": if (a.val == "0") break;
			case "<b>":
			case "<b/>":
				t.b = 1;
				break;
			case "</b>": break;
			case "<i": if (a.val == "0") break;
			case "<i>":
			case "<i/>":
				t.i = 1;
				break;
			case "</i>": break;
			case "<color":
				a.rgb && (t.color = a.rgb.slice(2, 8));
				break;
			case "<color>":
			case "<color/>":
			case "</color>": break;
			case "<family":
				t.family = a.val;
				break;
			case "<family>":
			case "<family/>":
			case "</family>": break;
			case "<vertAlign":
				t.valign = a.val;
				break;
			case "<vertAlign>":
			case "<vertAlign/>":
			case "</vertAlign>": break;
			case "<scheme": break;
			case "<scheme>":
			case "<scheme/>":
			case "</scheme>": break;
			case "<extLst":
			case "<extLst>":
			case "</extLst>": break;
			case "<ext":
				i = !0;
				break;
			case "</ext>":
				i = !1;
				break;
			default: if (a[0].charCodeAt(1) !== 47 && !i) throw Error("Unrecognized rich format " + a[0]);
		}
	}
	return t;
}
var vs = /*#__PURE__*/ (function() {
	function e(e) {
		var t = zt(e, "t");
		if (!t) return {
			t: "s",
			v: ""
		};
		var n = {
			t: "s",
			v: Y(t[1])
		}, r = zt(e, "rPr");
		return r && (n.s = _s(r[1])), n;
	}
	var t = /<(?:\w+:)?r>/g, n = /<\/(?:\w+:)?r>/;
	return function(r) {
		return r.replace(t, "").split(n).map(e).filter(function(e) {
			return e.v;
		});
	};
})(), ys = /*#__PURE__*/ (function() {
	function e(e, t, n) {
		var r = [];
		e.u && r.push("text-decoration: underline;"), e.uval && /^(?:single|double|single-accounting|double-accounting)$/.test(e.uval) && r.push("text-underline-style:" + e.uval + ";");
		var i = +e.sz;
		isFinite(i) && i > 0 && r.push("font-size:" + Math.min(i, 409) + "pt;"), e.outline && r.push("text-effect: outline;"), e.shadow && r.push("text-shadow: auto;"), t.push("<span style=\"" + r.join("") + "\">"), e.b && (t.push("<b>"), n.push("</b>")), e.i && (t.push("<i>"), n.push("</i>")), e.strike && (t.push("<s>"), n.push("</s>"));
		var a = e.valign || "";
		return a == "superscript" || a == "super" ? a = "sup" : a == "subscript" && (a = "sub"), a != "" && (t.push("<" + a + ">"), n.push("</" + a + ">")), n.push("</span>"), e;
	}
	function t(t) {
		var n = [
			[],
			t.v,
			[]
		];
		return t.v ? (t.s && e(t.s, n[0], n[2]), n[0].join("") + mn(n[1]) + n[2].join("")) : "";
	}
	return function(e) {
		return e.map(t).join("");
	};
})(), bs = /<(?:\w+:)?t\b[^<>]*>([^<]*)<\/(?:\w+:)?t>/g, xs = /<(?:\w+:)?r\b[^<>]*>/;
function Ss(e, t) {
	var n = !t || t.cellHTML, r = {};
	return e ? (e.match(/^\s*<(?:\w+:)?t[^>]*>/) ? (r.t = Y(xn(e.slice(e.indexOf(">") + 1).split(/<\/(?:\w+:)?t>/)[0] || ""), !0), r.r = xn(e), n && (r.h = mn(r.t))) : e.match(xs) && (r.r = xn(e), r.t = Y(xn((Vt(e, "rPh").match(bs) || []).join("").replace(an, "")), !0), n && (r.h = ys(vs(r.r)))), r) : { t: "" };
}
var Cs = /<(?:\w+:)?(?:si|sstItem)>/g, ws = /<\/(?:\w+:)?(?:si|sstItem)>/;
function Ts(e, t) {
	var n = [], r = "";
	if (!e) return n;
	var i = zt(e, "sst");
	if (i) {
		r = i[1].replace(Cs, "").split(ws);
		for (var a = 0; a != r.length; ++a) {
			var o = Ss(r[a].trim(), t);
			o != null && (n[n.length] = o);
		}
		i = J(i[0].slice(0, i[0].indexOf(">"))), n.Count = i.count, n.Unique = i.uniqueCount;
	}
	return n;
}
function Es(e) {
	return [e.read_shift(4), e.read_shift(4)];
}
function Ds(e, t) {
	var n = [], r = !1;
	return hr(e, function(e, i, a) {
		switch (a) {
			case 159:
				n.Count = e[0], n.Unique = e[1];
				break;
			case 19:
				n.push(e);
				break;
			case 160: return !0;
			case 35:
				r = !0;
				break;
			case 36:
				r = !1;
				break;
			default: if (i.T, !r || t.WTF) throw Error("Unexpected record 0x" + a.toString(16));
		}
	}), n;
}
function Os(e) {
	for (var t = [], n = e.split(""), r = 0; r < n.length; ++r) t[r] = n[r].charCodeAt(0);
	return t;
}
function ks(e, t) {
	var n = {};
	return n.Major = e.read_shift(2), n.Minor = e.read_shift(2), t >= 4 && (e.l += t - 4), n;
}
function As(e) {
	var t = {};
	return t.id = e.read_shift(0, "lpp4"), t.R = ks(e, 4), t.U = ks(e, 4), t.W = ks(e, 4), t;
}
function js(e) {
	for (var t = e.read_shift(4), n = e.l + t - 4, r = {}, i = e.read_shift(4), a = []; i-- > 0;) a.push({
		t: e.read_shift(4),
		v: e.read_shift(0, "lpp4")
	});
	if (r.name = e.read_shift(0, "lpp4"), r.comps = a, e.l != n) throw Error("Bad DataSpaceMapEntry: " + e.l + " != " + n);
	return r;
}
function Ms(e) {
	var t = [];
	e.l += 4;
	for (var n = e.read_shift(4); n-- > 0;) t.push(js(e));
	return t;
}
function Ns(e) {
	var t = [];
	e.l += 4;
	for (var n = e.read_shift(4); n-- > 0;) t.push(e.read_shift(0, "lpp4"));
	return t;
}
function Ps(e) {
	var t = {};
	return e.read_shift(4), e.l += 4, t.id = e.read_shift(0, "lpp4"), t.name = e.read_shift(0, "lpp4"), t.R = ks(e, 4), t.U = ks(e, 4), t.W = ks(e, 4), t;
}
function Fs(e) {
	var t = Ps(e);
	if (t.ename = e.read_shift(0, "8lpp4"), t.blksz = e.read_shift(4), t.cmode = e.read_shift(4), e.read_shift(4) != 4) throw Error("Bad !Primary record");
	return t;
}
function Is(e, t) {
	var n = e.l + t, r = {};
	r.Flags = e.read_shift(4) & 63, e.l += 4, r.AlgID = e.read_shift(4);
	var i = !1;
	switch (r.AlgID) {
		case 26126:
		case 26127:
		case 26128:
			i = r.Flags == 36;
			break;
		case 26625:
			i = r.Flags == 4;
			break;
		case 0:
			i = r.Flags == 16 || r.Flags == 4 || r.Flags == 36;
			break;
		default: throw "Unrecognized encryption algorithm: " + r.AlgID;
	}
	if (!i) throw Error("Encryption Flags/AlgID mismatch");
	return r.AlgIDHash = e.read_shift(4), r.KeySize = e.read_shift(4), r.ProviderType = e.read_shift(4), e.l += 8, r.CSPName = e.read_shift(n - e.l >> 1, "utf16le"), e.l = n, r;
}
function Ls(e, t) {
	var n = {}, r = e.l + t;
	return e.l += 4, n.Salt = e.slice(e.l, e.l + 16), e.l += 16, n.Verifier = e.slice(e.l, e.l + 16), e.l += 16, e.read_shift(4), n.VerifierHash = e.slice(e.l, r), e.l = r, n;
}
function Rs(e) {
	var t = ks(e);
	switch (t.Minor) {
		case 2: return [t.Minor, zs(e, t)];
		case 3: return [t.Minor, Bs(e, t)];
		case 4: return [t.Minor, Vs(e, t)];
	}
	throw Error("ECMA-376 Encrypted file unrecognized Version: " + t.Minor);
}
function zs(e) {
	if ((e.read_shift(4) & 63) != 36) throw Error("EncryptionInfo mismatch");
	return {
		t: "Std",
		h: Is(e, e.read_shift(4)),
		v: Ls(e, e.length - e.l)
	};
}
function Bs() {
	throw Error("File is password-protected: ECMA-376 Extensible");
}
function Vs(e) {
	var t = [
		"saltSize",
		"blockSize",
		"keyBits",
		"hashSize",
		"cipherAlgorithm",
		"cipherChaining",
		"hashAlgorithm",
		"saltValue"
	];
	e.l += 4;
	var n = e.read_shift(e.length - e.l, "utf8"), r = {};
	return n.replace(an, function(e) {
		var n = J(e);
		switch (ln(n[0])) {
			case "<?xml": break;
			case "<encryption":
			case "</encryption>": break;
			case "<keyData":
				t.forEach(function(e) {
					r[e] = n[e];
				});
				break;
			case "<dataIntegrity":
				r.encryptedHmacKey = n.encryptedHmacKey, r.encryptedHmacValue = n.encryptedHmacValue;
				break;
			case "<keyEncryptors>":
			case "<keyEncryptors":
				r.encs = [];
				break;
			case "</keyEncryptors>": break;
			case "<keyEncryptor":
				r.uri = n.uri;
				break;
			case "</keyEncryptor>": break;
			case "<encryptedKey":
				r.encs.push(n);
				break;
			default: throw n[0];
		}
	}), r;
}
function Hs(e, t) {
	var n = {}, r = n.EncryptionVersionInfo = ks(e, 4);
	if (t -= 4, r.Minor != 2) throw Error("unrecognized minor version code: " + r.Minor);
	if (r.Major > 4 || r.Major < 2) throw Error("unrecognized major version code: " + r.Major);
	n.Flags = e.read_shift(4), t -= 4;
	var i = e.read_shift(4);
	return t -= 4, n.EncryptionHeader = Is(e, i), t -= i, n.EncryptionVerifier = Ls(e, t), n;
}
function Us(e) {
	var t = {}, n = t.EncryptionVersionInfo = ks(e, 4);
	if (n.Major != 1 || n.Minor != 1) throw "unrecognized version code " + n.Major + " : " + n.Minor;
	return t.Salt = e.read_shift(16), t.EncryptedVerifier = e.read_shift(16), t.EncryptedVerifierHash = e.read_shift(16), t;
}
function Ws(e) {
	var t = 0, n, r = Os(e), i = r.length + 1, a, o, s, c, l;
	for (n = M(i), n[0] = r.length, a = 1; a != i; ++a) n[a] = r[a - 1];
	for (a = i - 1; a >= 0; --a) o = n[a], s = t & 16384 ? 1 : 0, c = t << 1 & 32767, l = s | c, t = l ^ o;
	return t ^ 52811;
}
var Gs = /*#__PURE__*/ (function() {
	var e = [
		187,
		255,
		255,
		186,
		255,
		255,
		185,
		128,
		0,
		190,
		15,
		0,
		191,
		15,
		0
	], t = [
		57840,
		7439,
		52380,
		33984,
		4364,
		3600,
		61902,
		12606,
		6258,
		57657,
		54287,
		34041,
		10252,
		43370,
		20163
	], n = [
		44796,
		19929,
		39858,
		10053,
		20106,
		40212,
		10761,
		31585,
		63170,
		64933,
		60267,
		50935,
		40399,
		11199,
		17763,
		35526,
		1453,
		2906,
		5812,
		11624,
		23248,
		885,
		1770,
		3540,
		7080,
		14160,
		28320,
		56640,
		55369,
		41139,
		20807,
		41614,
		21821,
		43642,
		17621,
		28485,
		56970,
		44341,
		19019,
		38038,
		14605,
		29210,
		60195,
		50791,
		40175,
		10751,
		21502,
		43004,
		24537,
		18387,
		36774,
		3949,
		7898,
		15796,
		31592,
		63184,
		47201,
		24803,
		49606,
		37805,
		14203,
		28406,
		56812,
		17824,
		35648,
		1697,
		3394,
		6788,
		13576,
		27152,
		43601,
		17539,
		35078,
		557,
		1114,
		2228,
		4456,
		30388,
		60776,
		51953,
		34243,
		7079,
		14158,
		28316,
		14128,
		28256,
		56512,
		43425,
		17251,
		34502,
		7597,
		13105,
		26210,
		52420,
		35241,
		883,
		1766,
		3532,
		4129,
		8258,
		16516,
		33032,
		4657,
		9314,
		18628
	], r = function(e) {
		return (e / 2 | e * 128) & 255;
	}, i = function(e, t) {
		return r(e ^ t);
	}, a = function(e) {
		for (var r = t[e.length - 1], i = 104, a = e.length - 1; a >= 0; --a) for (var o = e[a], s = 0; s != 7; ++s) o & 64 && (r ^= n[i]), o *= 2, --i;
		return r;
	};
	return function(t) {
		for (var n = Os(t), r = a(n), o = n.length, s = M(16), c = 0; c != 16; ++c) s[c] = 0;
		var l, u, d;
		for ((o & 1) == 1 && (l = r >> 8, s[o] = i(e[0], l), --o, l = r & 255, u = n[n.length - 1], s[o] = i(u, l)); o > 0;) --o, l = r >> 8, s[o] = i(n[o], l), --o, l = r & 255, s[o] = i(n[o], l);
		for (o = 15, d = 15 - n.length; d > 0;) l = r >> 8, s[o] = i(e[d], l), --o, --d, l = r & 255, s[o] = i(n[o], l), --o, --d;
		return s;
	};
})(), Ks = function(e, t, n, r, i) {
	i ||= t, r ||= Gs(e);
	for (var a = 0, o; a != t.length; ++a) o = t[a], o ^= r[n], o = (o >> 5 | o << 3) & 255, i[a] = o, ++n;
	return [
		i,
		n,
		r
	];
}, qs = function(e) {
	var t = 0, n = Gs(e);
	return function(e) {
		var r = Ks("", e, t, n);
		return t = r[1], r[0];
	};
};
function Js(e, t, n, r) {
	var i = {
		key: ha(e),
		verificationBytes: ha(e)
	};
	return n.password && (i.verifier = Ws(n.password)), r.valid = i.verificationBytes === i.verifier, r.valid && (r.insitu = qs(n.password)), i;
}
function Ys(e, t, n) {
	var r = n || {};
	return r.Info = e.read_shift(2), e.l -= 2, r.Data = r.Info === 1 ? Us(e, t) : Hs(e, t), r;
}
function Xs(e, t, n) {
	var r = { Type: n.biff >= 8 ? e.read_shift(2) : 0 };
	return r.Type ? Ys(e, t - 2, r) : Js(e, n.biff >= 8 ? t : t - 2, n, r), r;
}
function Zs(e, t) {
	switch (t.type) {
		case "base64": return Qs(O(e), t);
		case "binary": return Qs(e, t);
		case "buffer": return Qs(k && Buffer.isBuffer(e) ? e.toString("binary") : P(e), t);
		case "array": return Qs(yt(e), t);
	}
	throw Error("Unrecognized type " + t.type);
}
function Qs(e, t) {
	var n = t || {}, r = {}, i = n.dense;
	i && (r["!data"] = []);
	var a = Ft(e, "\\trowd", "\\row");
	if (!a) throw Error("RTF missing table");
	var o = {
		s: {
			c: 0,
			r: 0
		},
		e: {
			c: 0,
			r: a.length - 1
		}
	}, s = [];
	return a.forEach(function(e, t) {
		i && (s = r["!data"][t] = []);
		for (var a = /\\[\w\-]+\b/g, c = 0, l, u = -1, d = []; (l = a.exec(e)) != null;) {
			var f = e.slice(c, a.lastIndex - l[0].length);
			switch (f.charCodeAt(0) == 32 && (f = f.slice(1)), f.length && d.push(f), l[0]) {
				case "\\cell":
					if (++u, d.length) {
						var p = {
							v: d.join(""),
							t: "s"
						};
						p.v == "TRUE" || p.v == "FALSE" ? (p.v = p.v == "TRUE", p.t = "b") : isNaN(St(p.v)) ? Ai[p.v] != null && (p.t = "e", p.w = p.v, p.v = Ai[p.v]) : (p.t = "n", n.cellText !== !1 && (p.w = p.v), p.v = St(p.v)), i ? s[u] = p : r[jr({
							r: t,
							c: u
						})] = p;
					}
					d = [];
					break;
				case "\\par": d.push("\n");
			}
			c = a.lastIndex;
		}
		u > o.e.c && (o.e.c = u);
	}), r["!ref"] = Z(o), r;
}
function $s(e, t) {
	var n = Br(Zs(e, t), t);
	return n.bookType = "rtf", n;
}
function ec(e) {
	var t = e.slice(+(e[0] === "#")).slice(0, 6);
	return [
		parseInt(t.slice(0, 2), 16),
		parseInt(t.slice(2, 4), 16),
		parseInt(t.slice(4, 6), 16)
	];
}
function tc(e) {
	for (var t = 0, n = 1; t != 3; ++t) n = n * 256 + (e[t] > 255 ? 255 : e[t] < 0 ? 0 : e[t]);
	return n.toString(16).toUpperCase().slice(1);
}
function nc(e) {
	var t = e[0] / 255, n = e[1] / 255, r = e[2] / 255, i = Math.max(t, n, r), a = Math.min(t, n, r), o = i - a;
	if (o === 0) return [
		0,
		0,
		t
	];
	var s = 0, c = 0, l = i + a;
	switch (c = o / (l > 1 ? 2 - l : l), i) {
		case t:
			s = ((n - r) / o + 6) % 6;
			break;
		case n:
			s = (r - t) / o + 2;
			break;
		case r: s = (t - n) / o + 4;
	}
	return [
		s / 6,
		c,
		l / 2
	];
}
function rc(e) {
	var t = e[0], n = e[1], r = e[2], i = n * 2 * (r < .5 ? r : 1 - r), a = r - i / 2, o = [
		a,
		a,
		a
	], s = 6 * t, c;
	if (n !== 0) switch (s | 0) {
		case 0:
		case 6:
			c = i * s, o[0] += i, o[1] += c;
			break;
		case 1:
			c = i * (2 - s), o[0] += c, o[1] += i;
			break;
		case 2:
			c = i * (s - 2), o[1] += i, o[2] += c;
			break;
		case 3:
			c = i * (4 - s), o[1] += c, o[2] += i;
			break;
		case 4:
			c = i * (s - 4), o[2] += i, o[0] += c;
			break;
		case 5: c = i * (6 - s), o[2] += c, o[0] += i;
	}
	for (var l = 0; l != 3; ++l) o[l] = Math.round(o[l] * 255);
	return o;
}
function ic(e, t) {
	if (t === 0) return e;
	var n = nc(ec(e));
	return t < 0 ? n[2] *= 1 + t : n[2] = 1 - (1 - n[2]) * (1 - t), tc(rc(n));
}
function ac(e, t) {
	var n = {};
	if (e == null) return n;
	if (e.auto != null && (n.auto = X(e.auto)), e.rgb != null && (n.rgb = e.rgb.slice(-6).toUpperCase()), e.indexed != null) {
		n.indexed = parseInt(e.indexed, 10), n.index = n.indexed;
		var r = Oi[n.indexed];
		n.indexed == 81 && (r = Oi[1]), r ||= Oi[1], r && (n.rgb = tc(r));
	}
	return e.theme != null && (n.theme = parseInt(e.theme, 10), e.tint != null && (n.tint = parseFloat(e.tint)), t && t.themeElements && t.themeElements.clrScheme && t.themeElements.clrScheme[n.theme] && (n.raw_rgb = t.themeElements.clrScheme[n.theme].rgb, n.rgb = ic(n.raw_rgb, n.tint || 0))), e.tint != null && n.tint == null && (n.tint = parseFloat(e.tint)), n;
}
function oc(e, t) {
	if (!e) return e;
	var n = bt(e);
	if (n.rgb &&= ("" + n.rgb).slice(-6).toUpperCase(), n.indexed != null && !n.rgb) {
		var r = Oi[n.indexed];
		n.indexed == 81 && (r = Oi[1]), r ||= Oi[1], r && (n.rgb = tc(r));
	}
	return n.index != null && n.indexed == null && (n.indexed = n.index), n.theme != null && t && t.themeElements && t.themeElements.clrScheme && t.themeElements.clrScheme[n.theme] && (n.raw_rgb = t.themeElements.clrScheme[n.theme].rgb, n.rgb = ic(n.raw_rgb, n.tint || 0)), n;
}
function sc(e, t) {
	if (!e) return e;
	var n = bt(e);
	return n.color &&= oc(n.color, t), n.fgColor &&= oc(n.fgColor, t), n.bgColor &&= oc(n.bgColor, t), [
		"left",
		"right",
		"top",
		"bottom",
		"diagonal",
		"horizontal",
		"vertical",
		"start",
		"end"
	].forEach(function(e) {
		n[e] && n[e].color && (n[e].color = oc(n[e].color, t));
	}), n.gradientFill && n.gradientFill.stops && n.gradientFill.stops.forEach(function(e) {
		e.color &&= oc(e.color, t);
	}), n;
}
var cc = 7, lc = cc;
function uc(e) {
	return Math.floor((e + Math.round(128 / lc) / 256) * lc);
}
function dc(e) {
	return Math.floor((e - 5) / lc * 100 + .5) / 100;
}
function fc(e) {
	return Math.round((e * lc + 5) / lc * 256) / 256;
}
function pc(e) {
	e.width ? (e.wpx = uc(e.width), e.wch = dc(e.wpx), e.MDW = lc) : e.wpx ? (e.wch = dc(e.wpx), e.width = fc(e.wch), e.MDW = lc) : typeof e.wch == "number" && (e.width = fc(e.wch), e.wpx = uc(e.width), e.MDW = lc), e.customWidth && delete e.customWidth;
}
var mc = 255, hc = 5;
function gc(e) {
	return e > mc ? mc : e < 0 ? 0 : e;
}
function _c(e) {
	return gc(fc(dc(Math.max(0, e))));
}
function vc(e) {
	return e ? e.wpx == null ? e.width == null ? e.wch == null ? 64 : uc(fc(e.wch)) : uc(e.width) : e.wpx : 64;
}
function yc(e, t) {
	return e ||= {}, e.wpx = Math.max(0, Math.ceil(t)), e.wch = dc(e.wpx), e.width = _c(e.wpx), e.MDW = lc, e.bestFit = !0, e.customWidth = !0, e;
}
function bc(e) {
	var t = +(e && e.font || {}).sz;
	return t > 0 ? t : 11;
}
function xc(e) {
	return (e && e.font || {}).name || "Calibri";
}
function Sc(e, t) {
	for (var n = String(e), r = [], i = 0; i < n.length; ++i) {
		var a = n.charCodeAt(i), o = n.charAt(i);
		o == t || o == "\\" || a < 32 || a == 127 || o == "<" || o == ">" || o == "&" ? r.push("\\" + a.toString(16) + " ") : r.push(o);
	}
	return r.join("");
}
function Cc(e) {
	var t = e && e.font || {}, n = [];
	t.italic && n.push("italic"), t.bold && n.push("bold"), n.push(bc(e) + "pt");
	var r = xc(e);
	return r = /[,\s'"]/.test(r) ? "\"" + Sc(r, "\"") + "\"" : Sc(r, "\""), n.push(r), n.join(" ");
}
function wc(e, t) {
	var n = e.charCodeAt(0);
	return n == 9 || n == 32 ? t * .33 : n >= 48 && n <= 57 ? t * .52 : n >= 65 && n <= 90 ? t * .62 : n >= 97 && n <= 122 ? "iljtfr".indexOf(e) > -1 ? t * .28 : "mw".indexOf(e) > -1 ? t * .82 : t * .5 : n >= 11904 ? t : t * .52;
}
function Tc(e, t) {
	for (var n = Lc(bc(t)), r = 0, i = 0; i < e.length; ++i) r += wc(e.charAt(i), n);
	return r;
}
function Ec(e, t, n) {
	var r = n || {}, i = (e == null ? "" : String(e)).split(/\r\n|\n|\r/g), a = 0, o = 0, s = 0;
	if (r.measureText) for (o = 0; o < i.length; ++o) s = +r.measureText(i[o], Cc(t), t || {}), isFinite(s) && s > a && (a = s);
	else {
		var c = r.canvas, l = null;
		if (!c && typeof document < "u" && document.createElement) try {
			c = document.createElement("canvas");
		} catch {}
		try {
			l = c && c.getContext && c.getContext("2d");
		} catch {
			l = null;
		}
		if (l && l.measureText) for (l.font = Cc(t), o = 0; o < i.length; ++o) s = l.measureText(i[o]).width, isFinite(s) && s > a && (a = s);
		else for (o = 0; o < i.length; ++o) s = Tc(i[o], t || {}), isFinite(s) && s > a && (a = s);
	}
	return a;
}
function Dc(e, t) {
	return !e || e.v == null ? "" : (e.w == null && e.t != "z" && Ir(e), String(e.w == null ? e.v : e.w));
}
function Oc(e, t) {
	var n = String(e ?? "").split(/\r\n|\n|\r/g), r = [], i = 0, a = 0, o = null;
	if (!t) return n;
	for (i = 0; i < n.length; ++i) {
		for (o = n[i].split(/[\t \u00A0\-\/]+/), a = 0; a < o.length; ++a) o[a] && r.push(o[a]);
		(!o.length || o.length == 1 && !o[0]) && r.push(n[i]);
	}
	return r.length ? r : [""];
}
function kc(e, t, n, r) {
	var i = {}, a = e["!cols"] || [], o = e["!rows"] || [];
	return a[r] && a[r].s && rf(i, a[r].s), o[n] && o[n].s && rf(i, o[n].s), t && t.s && rf(i, t.s), i;
}
function Ac(e, t, n) {
	for (var r = n || {}, i = Dc(e, r), a = t && t.alignment || {}, o = Oc(i, !!a.wrapText), s = 0, c = 0, l = 0; l < o.length; ++l) c = Ec(o[l], t, r), c > s && (s = c);
	var u = +a.indent || 0;
	u > 0 && (s += u * 3 * Math.max(1, lc));
	var d = +a.textRotation || 0;
	if (d == 255 && (d = 90), d > 90 && (d = 90 - d), d < 0 && (d = -d), d > 0 && d < 90) {
		var f = d * Math.PI / 180, p = Lc(bc(t));
		s = Math.abs(s * Math.cos(f)) + Math.abs(p * Math.sin(f));
	} else d >= 90 && (s = Math.max(lc + hc, Lc(bc(t)) + 2));
	return s + (r.padding == null ? hc : +r.padding);
}
function jc(e) {
	for (var t = {}, n = 0; n < e.length; ++n) t[e[n].s.r + ":" + e[n].s.c] = e[n];
	return t;
}
function Mc(e, t, n) {
	for (var r = 0; r < e.length; ++r) {
		var i = e[r];
		if (i.s.r <= t && t <= i.e.r && i.s.c <= n && n <= i.e.c) return i.s.r != t || i.s.c != n;
	}
	return !1;
}
function Nc(e, t) {
	var n = t || {}, r = lc;
	n.MDW && (lc = +n.MDW || lc);
	var i = n.range ? typeof n.range == "string" ? Mr(n.range) : n.range : Mr(e["!ref"] || "A1"), a = e["!cols"] || [], o = e["!rows"] || [], s = [], c = [], l = n.minPx == null ? n.min == null ? 0 : uc(fc(+n.min)) : +n.minPx, u = n.maxPx == null ? uc(mc) : +n.maxPx, d = n.includeMerged === !1 ? [] : e["!merges"] || [], f = jc(d), p = e["!data"] != null, m = 0, h = 0, g = 0, _ = null, v = 0, y = null, b = null, x = 0, S = 0;
	for (m = i.s.c; m <= i.e.c; ++m) s[m] = bt(a[m] || {}), !(s[m] && s[m].hidden && n.skipHidden) && (c[m] = s[m] && (s[m].wpx != null || s[m].width != null || s[m].wch != null) ? vc(s[m]) : l);
	for (h = i.s.r; h <= i.e.r; ++h) if (!(o[h] && o[h].hidden && n.skipHidden)) {
		for (m = i.s.c; m <= i.e.c; ++m) if (!(s[m] && s[m].hidden && n.skipHidden) && !Mc(d, h, m) && (y = p ? (e["!data"][h] || [])[m] : e[jr({
			r: h,
			c: m
		})], y && y.v != null)) {
			if (b = kc(e, y, h, m), x = Ac(y, b, n), b && b.alignment && b.alignment.shrinkToFit && c[m] && (x = Math.min(x, c[m])), _ = f[h + ":" + m], g = _ ? _.e.c - _.s.c + 1 : 1, g > 1) {
				for (S = 0, v = 0; v < g; ++v) S += c[m + v] || l;
				if (x > S) for (v = 0; v < g; ++v) c[m + v] = Math.min(u, Math.max(c[m + v] || l, (c[m + v] || l) + (x - S) / g));
			} else c[m] = Math.min(u, Math.max(c[m] || l, x));
		}
	}
	for (m = i.s.c; m <= i.e.c; ++m) c[m] != null && (s[m] = yc(s[m] || {}, Math.min(u, Math.max(l, c[m]))));
	return n.set === !1 ? (lc = r, s) : (e["!cols"] = s, lc = r, s);
}
var Pc = 96;
function Fc(e) {
	return e * 96 / Pc;
}
function Ic(e) {
	return e * Pc / 96;
}
function Lc(e) {
	return e * 96 / 72;
}
function Rc(e) {
	return e * 72 / 96;
}
var zc = {
	None: "none",
	Solid: "solid",
	Gray50: "mediumGray",
	Gray75: "darkGray",
	Gray25: "lightGray",
	HorzStripe: "darkHorizontal",
	VertStripe: "darkVertical",
	ReverseDiagStripe: "darkDown",
	DiagStripe: "darkUp",
	DiagCross: "darkGrid",
	ThickDiagCross: "darkTrellis",
	ThinHorzStripe: "lightHorizontal",
	ThinVertStripe: "lightVertical",
	ThinReverseDiagStripe: "lightDown",
	ThinHorzCross: "lightGrid"
};
function Bc(e, t, n, r) {
	t.Borders = [];
	var i = {}, a = "", o = !1;
	(e.match(an) || []).forEach(function(e) {
		var s = J(e);
		switch (ln(s[0])) {
			case "<borders":
			case "<borders>":
			case "</borders>": break;
			case "<border":
			case "<border>":
			case "<border/>":
				i = {}, s.diagonalUp && (i.diagonalUp = X(s.diagonalUp)), s.diagonalDown && (i.diagonalDown = X(s.diagonalDown)), t.Borders.push(i);
				break;
			case "</border>": break;
			case "<left/>":
				i.left = {}, s.style && (i.left.style = s.style);
				break;
			case "<left":
			case "<left>":
				a = "left", i[a] = i[a] || {}, s.style && (i[a].style = s.style);
				break;
			case "</left>":
				a = "";
				break;
			case "<right/>":
				i.right = {}, s.style && (i.right.style = s.style);
				break;
			case "<right":
			case "<right>":
				a = "right", i[a] = i[a] || {}, s.style && (i[a].style = s.style);
				break;
			case "</right>":
				a = "";
				break;
			case "<top/>":
				i.top = {}, s.style && (i.top.style = s.style);
				break;
			case "<top":
			case "<top>":
				a = "top", i[a] = i[a] || {}, s.style && (i[a].style = s.style);
				break;
			case "</top>":
				a = "";
				break;
			case "<bottom/>":
				i.bottom = {}, s.style && (i.bottom.style = s.style);
				break;
			case "<bottom":
			case "<bottom>":
				a = "bottom", i[a] = i[a] || {}, s.style && (i[a].style = s.style);
				break;
			case "</bottom>":
				a = "";
				break;
			case "<diagonal/>":
				i.diagonal = {}, s.style && (i.diagonal.style = s.style);
				break;
			case "<diagonal":
			case "<diagonal>":
				a = "diagonal", i[a] = i[a] || {}, s.style && (i[a].style = s.style);
				break;
			case "</diagonal>":
				a = "";
				break;
			case "<horizontal/>":
				i.horizontal = {}, s.style && (i.horizontal.style = s.style);
				break;
			case "<horizontal":
			case "<horizontal>":
				a = "horizontal", i[a] = i[a] || {}, s.style && (i[a].style = s.style);
				break;
			case "</horizontal>":
				a = "";
				break;
			case "<vertical/>":
				i.vertical = {}, s.style && (i.vertical.style = s.style);
				break;
			case "<vertical":
			case "<vertical>":
				a = "vertical", i[a] = i[a] || {}, s.style && (i[a].style = s.style);
				break;
			case "</vertical>":
				a = "";
				break;
			case "<start/>":
				i.start = {}, s.style && (i.start.style = s.style);
				break;
			case "<start":
			case "<start>":
				a = "start", i[a] = i[a] || {}, s.style && (i[a].style = s.style);
				break;
			case "</start>":
				a = "";
				break;
			case "<end/>":
				i.end = {}, s.style && (i.end.style = s.style);
				break;
			case "<end":
			case "<end>":
				a = "end", i[a] = i[a] || {}, s.style && (i[a].style = s.style);
				break;
			case "</end>":
				a = "";
				break;
			case "<color":
			case "<color>":
				a && (i[a].color = ac(s, n));
				break;
			case "<color/>":
			case "</color>": break;
			case "<extLst":
			case "<extLst>":
			case "</extLst>": break;
			case "<ext":
				o = !0;
				break;
			case "</ext>":
				o = !1;
				break;
			default: if (r && r.WTF && !o) throw Error("unrecognized " + s[0] + " in borders");
		}
	});
}
function Vc(e, t, n, r) {
	t.Fills = [];
	var i = {}, a = null, o = null, s = !1;
	(e.match(an) || []).forEach(function(e) {
		var c = J(e);
		switch (ln(c[0])) {
			case "<fills":
			case "<fills>":
			case "</fills>": break;
			case "<fill>":
			case "<fill":
			case "<fill/>":
				i = {}, t.Fills.push(i);
				break;
			case "</fill>": break;
			case "<gradientFill>":
				a = { stops: [] }, i.gradientFill = a;
				break;
			case "<gradientFill":
				a = { stops: [] }, c.type && (a.type = c.type), c.degree && (a.degree = parseFloat(c.degree)), [
					"left",
					"right",
					"top",
					"bottom"
				].forEach(function(e) {
					c[e] != null && (a[e] = parseFloat(c[e]));
				}), i.gradientFill = a;
				break;
			case "</gradientFill>":
				a = null;
				break;
			case "<patternFill":
			case "<patternFill>":
				c.patternType && (i.patternType = c.patternType);
				break;
			case "<patternFill/>":
			case "</patternFill>": break;
			case "<bgColor":
				i.bgColor = ac(c, n);
				break;
			case "<bgColor/>":
			case "</bgColor>": break;
			case "<fgColor":
				i.fgColor = ac(c, n);
				break;
			case "<fgColor/>":
			case "</fgColor>": break;
			case "<stop":
				o = {}, c.position != null && (o.position = parseFloat(c.position)), a && a.stops.push(o);
				break;
			case "<stop/>":
				a && (o = {}, c.position != null && (o.position = parseFloat(c.position)), a.stops.push(o)), o = null;
				break;
			case "</stop>":
				o = null;
				break;
			case "<color":
				o && (o.color = ac(c, n));
				break;
			case "<color/>":
				o && (o.color = ac(c, n));
				break;
			case "</color>": break;
			case "<extLst":
			case "<extLst>":
			case "</extLst>": break;
			case "<ext":
				s = !0;
				break;
			case "</ext>":
				s = !1;
				break;
			default: if (r && r.WTF && !s) throw Error("unrecognized " + c[0] + " in fills");
		}
	});
}
function Hc(e, t, n, r) {
	t.Fonts = [];
	var i = {}, a = !1;
	(e.match(an) || []).forEach(function(e) {
		var o = J(e);
		switch (ln(o[0])) {
			case "<fonts":
			case "<fonts>":
			case "</fonts>": break;
			case "<font":
			case "<font>": break;
			case "</font>":
			case "<font/>":
				t.Fonts.push(i), i = {};
				break;
			case "<name":
				o.val && (i.name = xn(o.val));
				break;
			case "<name/>":
			case "</name>": break;
			case "<b":
				i.bold = o.val ? X(o.val) : 1;
				break;
			case "<b/>":
				i.bold = 1;
				break;
			case "</b>":
			case "</b": break;
			case "<i":
				i.italic = o.val ? X(o.val) : 1;
				break;
			case "<i/>":
				i.italic = 1;
				break;
			case "</i>":
			case "</i": break;
			case "<u":
				switch (o.val) {
					case "none":
						i.underline = 0;
						break;
					case "single":
						i.underline = 1;
						break;
					case "double":
						i.underline = 2;
						break;
					case "singleAccounting":
						i.underline = 33;
						break;
					case "doubleAccounting": i.underline = 34;
				}
				break;
			case "<u/>":
				i.underline = 1;
				break;
			case "</u>":
			case "</u": break;
			case "<strike":
				i.strike = o.val ? X(o.val) : 1;
				break;
			case "<strike/>":
				i.strike = 1;
				break;
			case "</strike>":
			case "</strike": break;
			case "<outline":
				i.outline = o.val ? X(o.val) : 1;
				break;
			case "<outline/>":
				i.outline = 1;
				break;
			case "</outline>":
			case "</outline": break;
			case "<shadow":
				i.shadow = o.val ? X(o.val) : 1;
				break;
			case "<shadow/>":
				i.shadow = 1;
				break;
			case "</shadow>":
			case "</shadow": break;
			case "<condense":
				i.condense = o.val ? X(o.val) : 1;
				break;
			case "<condense/>":
				i.condense = 1;
				break;
			case "</condense>":
			case "</condense": break;
			case "<extend":
				i.extend = o.val ? X(o.val) : 1;
				break;
			case "<extend/>":
				i.extend = 1;
				break;
			case "</extend>":
			case "</extend": break;
			case "<sz":
				o.val && (i.sz = +o.val);
				break;
			case "<sz/>":
			case "</sz>":
			case "</sz": break;
			case "<vertAlign":
				o.val && (i.vertAlign = o.val);
				break;
			case "<vertAlign/>":
			case "</vertAlign>":
			case "</vertAlign": break;
			case "<family":
				o.val && (i.family = parseInt(o.val, 10));
				break;
			case "<family/>":
			case "</family>":
			case "</family": break;
			case "<scheme":
				o.val && (i.scheme = o.val);
				break;
			case "<scheme/>":
			case "</scheme>":
			case "</scheme": break;
			case "<charset":
				if (o.val == "1") break;
				o.codepage = d[parseInt(o.val, 10)];
				break;
			case "<charset/>":
			case "</charset>":
			case "</charset": break;
			case "<color":
				i.color = ac(o, n);
				break;
			case "<color/>":
			case "</color>":
			case "</color": break;
			case "<AlternateContent":
				a = !0;
				break;
			case "</AlternateContent>":
			case "</AlternateContent":
				a = !1;
				break;
			case "<extLst":
			case "<extLst>":
			case "</extLst>": break;
			case "<ext":
				a = !0;
				break;
			case "</ext>":
				a = !1;
				break;
			default: if (r && r.WTF && !a) throw Error("unrecognized " + o[0] + " in fonts");
		}
	});
}
function Uc(e, t, n) {
	t.NumberFmt = [];
	for (var r = st(W), i = 0; i < r.length; ++i) t.NumberFmt[r[i]] = W[r[i]];
	var a = e.match(an);
	if (a) for (i = 0; i < a.length; ++i) {
		var o = J(a[i]);
		switch (ln(o[0])) {
			case "<numFmts":
			case "</numFmts>":
			case "<numFmts/>":
			case "<numFmts>": break;
			case "<numFmt":
				var s = Y(xn(o.formatCode)), c = parseInt(o.numFmtId, 10);
				if (t.NumberFmt[c] = s, c > 0) {
					if (c > 392) {
						for (c = 392; c > 60 && t.NumberFmt[c] != null; --c);
						t.NumberFmt[c] = s;
					}
					nt(s, c);
				}
				break;
			case "</numFmt>": break;
			default: if (n.WTF) throw Error("unrecognized " + o[0] + " in numFmts");
		}
	}
}
var Wc = [
	"numFmtId",
	"fillId",
	"fontId",
	"borderId",
	"xfId"
], Gc = [
	"applyAlignment",
	"applyBorder",
	"applyFill",
	"applyFont",
	"applyNumberFormat",
	"applyProtection",
	"pivotButton",
	"quotePrefix"
];
function Kc(e, t, n, r) {
	t[r] = [];
	var i, a = !1;
	(e.match(an) || []).forEach(function(e) {
		var o = J(e), s = 0;
		switch (ln(o[0])) {
			case "<cellXfs":
			case "<cellXfs>":
			case "<cellXfs/>":
			case "</cellXfs>":
			case "<cellStyleXfs":
			case "<cellStyleXfs>":
			case "<cellStyleXfs/>":
			case "</cellStyleXfs>": break;
			case "<xf":
			case "<xf/>":
			case "<xf>":
				for (i = o, delete i[0], s = 0; s < Wc.length; ++s) i[Wc[s]] && (i[Wc[s]] = parseInt(i[Wc[s]], 10));
				for (s = 0; s < Gc.length; ++s) i[Gc[s]] && (i[Gc[s]] = X(i[Gc[s]]));
				if (t.NumberFmt && i.numFmtId > 392) {
					for (s = 392; s > 60; --s) if (t.NumberFmt[i.numFmtId] == t.NumberFmt[s]) {
						i.numFmtId = s;
						break;
					}
				}
				t[r].push(i);
				break;
			case "</xf>": break;
			case "<alignment":
			case "<alignment/>":
			case "<alignment>":
				var c = {};
				o.vertical && (c.vertical = o.vertical), o.horizontal && (c.horizontal = o.horizontal), o.textRotation != null && (c.textRotation = parseInt(o.textRotation, 10)), o.indent && (c.indent = parseInt(o.indent, 10)), o.relativeIndent && (c.relativeIndent = parseInt(o.relativeIndent, 10)), o.readingOrder && (c.readingOrder = parseInt(o.readingOrder, 10)), o.wrapText && (c.wrapText = X(o.wrapText)), o.shrinkToFit && (c.shrinkToFit = X(o.shrinkToFit)), o.justifyLastLine && (c.justifyLastLine = X(o.justifyLastLine)), i.alignment = c;
				break;
			case "</alignment>": break;
			case "<protection":
			case "<protection>":
				var l = {};
				o.locked != null && (l.locked = X(o.locked)), o.hidden != null && (l.hidden = X(o.hidden)), i.protection = l;
				break;
			case "<protection/>":
				l = {}, o.locked != null && (l.locked = X(o.locked)), o.hidden != null && (l.hidden = X(o.hidden)), i.protection = l;
				break;
			case "</protection>": break;
			case "<AlternateContent":
			case "<AlternateContent>":
				a = !0;
				break;
			case "</AlternateContent>":
				a = !1;
				break;
			case "<extLst":
			case "<extLst>":
			case "</extLst>": break;
			case "<ext":
				a = !0;
				break;
			case "</ext>":
				a = !1;
				break;
			default: if (n && n.WTF && !a) throw Error("unrecognized " + o[0] + " in cellXfs");
		}
	});
}
function qc(e, t, n) {
	Kc(e, t, n, "CellXf");
}
function Jc(e, t, n) {
	Kc(e, t, n, "CellStyleXf");
}
function Yc(e, t, n) {
	t.CellStyles = [], (e.match(an) || []).forEach(function(e) {
		var r = J(e);
		switch (ln(r[0])) {
			case "<cellStyles":
			case "<cellStyles>":
			case "<cellStyles/>":
			case "</cellStyles>": break;
			case "<cellStyle":
			case "<cellStyle/>":
				delete r[0], r.xfId != null && (r.xfId = parseInt(r.xfId, 10)), r.builtinId != null && (r.builtinId = parseInt(r.builtinId, 10)), r.iLevel != null && (r.iLevel = parseInt(r.iLevel, 10)), r.customBuiltin != null && (r.customBuiltin = X(r.customBuiltin)), r.hidden != null && (r.hidden = X(r.hidden)), r.name &&= xn(r.name), t.CellStyles.push(r);
				break;
			case "</cellStyle>": break;
			default: if (n && n.WTF) throw Error("unrecognized " + r[0] + " in cellStyles");
		}
	});
}
function Xc(e, t, n, r) {
	t.Dxfs = [];
	var i = null, a = null, o = null, s = null, c = "", l = !1;
	(e.match(an) || []).forEach(function(e) {
		var u = J(e);
		switch (ln(u[0])) {
			case "<dxfs":
			case "<dxfs>":
			case "<dxfs/>":
			case "</dxfs>": break;
			case "<dxf":
			case "<dxf>":
				i = {}, t.Dxfs.push(i);
				break;
			case "<dxf/>":
				t.Dxfs.push({}), i = null;
				break;
			case "</dxf>":
				i = null;
				break;
			case "<font":
			case "<font>":
				a = {}, i && (i.font = a);
				break;
			case "</font>":
			case "<font/>":
				a = null;
				break;
			case "<name":
				a && u.val && (a.name = xn(u.val));
				break;
			case "<name/>":
			case "</name>": break;
			case "<b":
				a && (a.bold = u.val ? X(u.val) : 1);
				break;
			case "<b/>":
				a && (a.bold = 1);
				break;
			case "</b>": break;
			case "<i":
				a && (a.italic = u.val ? X(u.val) : 1);
				break;
			case "<i/>":
				a && (a.italic = 1);
				break;
			case "</i>": break;
			case "<u":
				a && (a.underline = u.val || 1);
				break;
			case "<u/>":
				a && (a.underline = 1);
				break;
			case "</u>": break;
			case "<strike":
				a && (a.strike = u.val ? X(u.val) : 1);
				break;
			case "<strike/>":
				a && (a.strike = 1);
				break;
			case "</strike>": break;
			case "<sz":
				a && u.val && (a.sz = +u.val);
				break;
			case "<sz/>":
			case "</sz>": break;
			case "<outline":
				a && (a.outline = u.val ? X(u.val) : 1);
				break;
			case "<outline/>":
				a && (a.outline = 1);
				break;
			case "</outline>": break;
			case "<shadow":
				a && (a.shadow = u.val ? X(u.val) : 1);
				break;
			case "<shadow/>":
				a && (a.shadow = 1);
				break;
			case "</shadow>": break;
			case "<condense":
				a && (a.condense = u.val ? X(u.val) : 1);
				break;
			case "<condense/>":
				a && (a.condense = 1);
				break;
			case "</condense>": break;
			case "<extend":
				a && (a.extend = u.val ? X(u.val) : 1);
				break;
			case "<extend/>":
				a && (a.extend = 1);
				break;
			case "</extend>": break;
			case "<vertAlign":
				a && u.val && (a.vertAlign = u.val);
				break;
			case "<vertAlign/>":
			case "</vertAlign>": break;
			case "<family":
				a && u.val && (a.family = parseInt(u.val, 10));
				break;
			case "<family/>":
			case "</family>": break;
			case "<scheme":
				a && u.val && (a.scheme = u.val);
				break;
			case "<scheme/>":
			case "</scheme>": break;
			case "<charset":
				a && u.val != null && (a.charset = parseInt(u.val, 10));
				break;
			case "<charset/>":
			case "</charset>": break;
			case "<color":
				a ? a.color = ac(u, n) : c && s && (s[c].color = ac(u, n));
				break;
			case "<color/>":
			case "</color>": break;
			case "<fill":
			case "<fill>":
				o = {}, i && (i.fill = o);
				break;
			case "<fill/>":
				o = null;
				break;
			case "</fill>":
				o = null;
				break;
			case "<patternFill":
			case "<patternFill>":
				o && u.patternType && (o.patternType = u.patternType);
				break;
			case "<patternFill/>":
			case "</patternFill>": break;
			case "<fgColor":
				o && (o.fgColor = ac(u, n));
				break;
			case "<fgColor/>":
			case "</fgColor>": break;
			case "<bgColor":
				o && (o.bgColor = ac(u, n));
				break;
			case "<bgColor/>":
			case "</bgColor>": break;
			case "<border":
			case "<border>":
				s = {}, i && (i.border = s);
				break;
			case "<border/>":
				s = null;
				break;
			case "</border>":
				s = null;
				break;
			case "<left":
			case "<left>":
			case "<left/>":
				c = "left", s && (s[c] = s[c] || {}, u.style && (s[c].style = u.style)), u[0].slice(-2) == "/>" && (c = "");
				break;
			case "</left>":
				c = "";
				break;
			case "<right":
			case "<right>":
			case "<right/>":
				c = "right", s && (s[c] = s[c] || {}, u.style && (s[c].style = u.style)), u[0].slice(-2) == "/>" && (c = "");
				break;
			case "</right>":
				c = "";
				break;
			case "<top":
			case "<top>":
			case "<top/>":
				c = "top", s && (s[c] = s[c] || {}, u.style && (s[c].style = u.style)), u[0].slice(-2) == "/>" && (c = "");
				break;
			case "</top>":
				c = "";
				break;
			case "<bottom":
			case "<bottom>":
			case "<bottom/>":
				c = "bottom", s && (s[c] = s[c] || {}, u.style && (s[c].style = u.style)), u[0].slice(-2) == "/>" && (c = "");
				break;
			case "</bottom>":
				c = "";
				break;
			case "<diagonal":
			case "<diagonal>":
			case "<diagonal/>":
				c = "diagonal", s && (s[c] = s[c] || {}, u.style && (s[c].style = u.style)), u[0].slice(-2) == "/>" && (c = "");
				break;
			case "</diagonal>":
				c = "";
				break;
			case "<horizontal":
			case "<horizontal>":
			case "<horizontal/>":
				c = "horizontal", s && (s[c] = s[c] || {}, u.style && (s[c].style = u.style)), u[0].slice(-2) == "/>" && (c = "");
				break;
			case "</horizontal>":
				c = "";
				break;
			case "<vertical":
			case "<vertical>":
			case "<vertical/>":
				c = "vertical", s && (s[c] = s[c] || {}, u.style && (s[c].style = u.style)), u[0].slice(-2) == "/>" && (c = "");
				break;
			case "</vertical>":
				c = "";
				break;
			case "<start":
			case "<start>":
			case "<start/>":
				c = "start", s && (s[c] = s[c] || {}, u.style && (s[c].style = u.style)), u[0].slice(-2) == "/>" && (c = "");
				break;
			case "</start>":
				c = "";
				break;
			case "<end":
			case "<end>":
			case "<end/>":
				c = "end", s && (s[c] = s[c] || {}, u.style && (s[c].style = u.style)), u[0].slice(-2) == "/>" && (c = "");
				break;
			case "</end>":
				c = "";
				break;
			case "<alignment":
				i && (i.alignment = {}, u.vertical && (i.alignment.vertical = u.vertical), u.horizontal && (i.alignment.horizontal = u.horizontal), u.wrapText && (i.alignment.wrapText = X(u.wrapText)));
				break;
			case "<alignment/>":
			case "</alignment>": break;
			case "<numFmt":
				i && (i.numFmt = {
					numFmtId: u.numFmtId == null ? void 0 : parseInt(u.numFmtId, 10),
					formatCode: u.formatCode ? Y(xn(u.formatCode)) : void 0
				});
				break;
			case "<numFmt/>":
			case "</numFmt>": break;
			case "<protection":
				i && (i.protection = {}, u.locked != null && (i.protection.locked = X(u.locked)), u.hidden != null && (i.protection.hidden = X(u.hidden)));
				break;
			case "<protection/>":
			case "</protection>": break;
			case "<extLst":
			case "<extLst>":
			case "</extLst>": break;
			case "<ext":
				l = !0;
				break;
			case "</ext>":
				l = !1;
				break;
			default: if (r && r.WTF && !l) throw Error("unrecognized " + u[0] + " in dxfs");
		}
	});
}
function Zc(e, t, n) {
	t.TableStyles = { styles: [] };
	var r = null, i = !1;
	(e.match(an) || []).forEach(function(e) {
		var a = J(e), o = ln(a[0]);
		switch (o) {
			case "<tableStyles":
			case "<tableStyles>":
				a.defaultTableStyle && (t.TableStyles.defaultTableStyle = xn(Y(a.defaultTableStyle))), a.defaultPivotStyle && (t.TableStyles.defaultPivotStyle = xn(Y(a.defaultPivotStyle)));
				break;
			case "<tableStyles/>":
			case "</tableStyles>": break;
			case "<tableStyle":
			case "<tableStyle>":
			case "<tableStyle/>":
				if (t.TableStyles.styles.length >= Of) {
					r = null;
					break;
				}
				r = {
					name: xn(Y(a.name || "")),
					pivot: a.pivot != null && X(a.pivot),
					table: a.table == null || X(a.table),
					elements: []
				}, t.TableStyles.styles.push(r), o.slice(-2) == "/>" && (r = null);
				break;
			case "</tableStyle>":
				r = null;
				break;
			case "<tableStyleElement":
			case "<tableStyleElement>":
			case "<tableStyleElement/>":
				r && r.elements.length < 64 && Nf(a.type) && a.dxfId != null && r.elements.push({
					type: a.type,
					dxfId: parseInt(a.dxfId, 10),
					size: a.size == null ? 1 : Math.max(1, parseInt(a.size, 10) || 1)
				});
				break;
			case "<extLst":
			case "<extLst>":
			case "</extLst>": break;
			case "<ext":
				i = !0;
				break;
			case "</ext>":
				i = !1;
				break;
			default: if (n && n.WTF && !i) throw Error("unrecognized " + a[0] + " in tableStyles");
		}
	});
}
function Qc(e, t, n, r) {
	t.Colors = {
		indexedColors: [],
		mruColors: [],
		themeColors: []
	};
	var i = null, a = !1;
	(e.match(an) || []).forEach(function(e) {
		var o = J(e);
		switch (ln(o[0])) {
			case "<colors":
			case "<colors>":
			case "</colors>": break;
			case "<indexedColors":
			case "<indexedColors>":
				i = t.Colors.indexedColors;
				break;
			case "</indexedColors>":
				i = null;
				break;
			case "<themeColors":
			case "<themeColors>":
				i = t.Colors.themeColors;
				break;
			case "</themeColors>":
				i = null;
				break;
			case "<mruColors":
			case "<mruColors>":
				i = t.Colors.mruColors;
				break;
			case "</mruColors>":
				i = null;
				break;
			case "<rgbColor":
			case "<rgbColor/>":
				i && i.push(ac(o, n));
				break;
			case "</rgbColor>": break;
			case "<color":
			case "<color/>":
				i && i.push(ac(o, n));
				break;
			case "</color>": break;
			case "<extLst":
			case "<extLst>":
			case "</extLst>": break;
			case "<ext":
				a = !0;
				break;
			case "</ext>":
				a = !1;
				break;
			default: if (r && r.WTF && !a) throw Error("unrecognized " + o[0] + " in colors");
		}
	});
}
var $c = /*#__PURE__*/ (function() {
	return function(e, t, n) {
		var r = {};
		if (!e) return r;
		e = Pt(It(e, "<!--", "-->"));
		var i;
		return (i = zt(e, "numFmts")) && Uc(i[0], r, n), (i = zt(e, "fonts")) && Hc(i[0], r, t, n), (i = zt(e, "fills")) && Vc(i[0], r, t, n), (i = zt(e, "borders")) && Bc(i[0], r, t, n), (i = zt(e, "cellStyleXfs")) && Jc(i[0], r, n), (i = zt(e, "cellStyles")) && Yc(i[0], r, n), (i = zt(e, "cellXfs")) && qc(i[0], r, n), (i = zt(e, "dxfs")) && Xc(i[0], r, t, n), (i = zt(e, "tableStyles")) && Zc(i[0], r, n), (i = zt(e, "colors")) && Qc(i[0], r, t, n), r;
	};
})();
function el(e, t) {
	return [e.read_shift(2), Gr(e, t - 2)];
}
function tl(e, t, n) {
	var r = {};
	r.sz = e.read_shift(2) / 20;
	var i = oi(e, 2, n);
	switch (i.fItalic && (r.italic = 1), i.fCondense && (r.condense = 1), i.fExtend && (r.extend = 1), i.fShadow && (r.shadow = 1), i.fOutline && (r.outline = 1), i.fStrikeout && (r.strike = 1), e.read_shift(2) === 700 && (r.bold = 1), e.read_shift(2)) {
		case 1:
			r.vertAlign = "superscript";
			break;
		case 2: r.vertAlign = "subscript";
	}
	var a = e.read_shift(1);
	a != 0 && (r.underline = a);
	var o = e.read_shift(1);
	o > 0 && (r.family = o);
	var s = e.read_shift(1);
	switch (s > 0 && (r.charset = s), e.l++, r.color = ai(e, 8), e.read_shift(1)) {
		case 1:
			r.scheme = "major";
			break;
		case 2: r.scheme = "minor";
	}
	return r.name = Gr(e, t - 21), r;
}
var nl = pr;
function rl(e, t) {
	var n = e.l + t, r = e.read_shift(2), i = e.read_shift(2);
	return e.l = n, {
		ixfe: r,
		numFmtId: i
	};
}
var il = pr;
function al(e, t, n) {
	var r = {};
	for (var i in r.NumberFmt = [], W) r.NumberFmt[i] = W[i];
	r.CellXf = [], r.Fonts = [];
	var a = [], o = !1;
	return hr(e, function(e, i, s) {
		switch (s) {
			case 44:
				r.NumberFmt[e[0]] = e[1], nt(e[1], e[0]);
				break;
			case 43:
				r.Fonts.push(e), e.color.theme != null && t && t.themeElements && t.themeElements.clrScheme && (e.color.rgb = ic(t.themeElements.clrScheme[e.color.theme].rgb, e.color.tint || 0));
				break;
			case 1025: break;
			case 45: break;
			case 46: break;
			case 47:
				a[a.length - 1] == 617 && r.CellXf.push(e);
				break;
			case 48:
			case 507:
			case 572:
			case 475: break;
			case 1171:
			case 2102:
			case 1130:
			case 512:
			case 2095:
			case 3072: break;
			case 35:
				o = !0;
				break;
			case 36:
				o = !1;
				break;
			case 37:
				a.push(s), o = !0;
				break;
			case 38:
				a.pop(), o = !1;
				break;
			default: if (i.T > 0) a.push(s);
			else if (i.T < 0) a.pop();
			else if (!o || n.WTF && a[a.length - 1] != 37) throw Error("Unexpected record 0x" + s.toString(16));
		}
	}), r;
}
var ol = [
	"</a:lt1>",
	"</a:dk1>",
	"</a:lt2>",
	"</a:dk2>",
	"</a:accent1>",
	"</a:accent2>",
	"</a:accent3>",
	"</a:accent4>",
	"</a:accent5>",
	"</a:accent6>",
	"</a:hlink>",
	"</a:folHlink>"
];
function sl(e, t, n) {
	t.themeElements.clrScheme = [];
	var r = {};
	(e[0].match(an) || []).forEach(function(e) {
		var i = J(e);
		switch (i[0]) {
			case "<a:clrScheme":
			case "</a:clrScheme>": break;
			case "<a:srgbClr":
				r.rgb = i.val;
				break;
			case "</a:srgbClr>": break;
			case "<a:sysClr":
				r.rgb = i.lastClr;
				break;
			case "</a:sysClr>": break;
			case "</a:dk1>":
			case "</a:lt1>":
			case "<a:dk1>":
			case "<a:lt1>":
			case "<a:dk2>":
			case "</a:dk2>":
			case "<a:lt2>":
			case "</a:lt2>":
			case "<a:accent1>":
			case "</a:accent1>":
			case "<a:accent2>":
			case "</a:accent2>":
			case "<a:accent3>":
			case "</a:accent3>":
			case "<a:accent4>":
			case "</a:accent4>":
			case "<a:accent5>":
			case "</a:accent5>":
			case "<a:accent6>":
			case "</a:accent6>":
			case "<a:hlink>":
			case "</a:hlink>":
			case "<a:folHlink>":
			case "</a:folHlink>":
				i[0].charAt(1) === "/" ? (t.themeElements.clrScheme[ol.indexOf(i[0])] = r, r = {}) : r.name = i[0].slice(3, i[0].length - 1);
				break;
			default: if (n && n.WTF) throw Error("Unrecognized " + i[0] + " in clrScheme");
		}
	});
}
function cl(e, t, n) {
	t.themeElements = {};
	var r;
	if (!(r = Rt(e, "a:clrScheme"))) throw Error("clrScheme not found in themeElements");
	if (sl(r, t, n), !(r = Rt(e, "a:fontScheme"))) throw Error("fontScheme not found in themeElements");
	if (!(r = Rt(e, "a:fmtScheme"))) throw Error("fmtScheme not found in themeElements");
}
function ll(e, t) {
	e && e.length !== 0 || (e = ul());
	var n, r = {};
	if (!(n = Rt(e, "a:themeElements"))) throw Error("themeElements not found in theme");
	return cl(n[0], r, t), r.raw = e, r;
}
function ul(e, t) {
	if (t && t.themeXLSX) return t.themeXLSX;
	if (e && typeof e.raw == "string") return e.raw;
	var n = [tn];
	return n[n.length] = "<a:theme xmlns:a=\"http://schemas.openxmlformats.org/drawingml/2006/main\" name=\"Office Theme\">", n[n.length] = "<a:themeElements>", n[n.length] = "<a:clrScheme name=\"Office\">", n[n.length] = "<a:dk1><a:sysClr val=\"windowText\" lastClr=\"000000\"/></a:dk1>", n[n.length] = "<a:lt1><a:sysClr val=\"window\" lastClr=\"FFFFFF\"/></a:lt1>", n[n.length] = "<a:dk2><a:srgbClr val=\"1F497D\"/></a:dk2>", n[n.length] = "<a:lt2><a:srgbClr val=\"EEECE1\"/></a:lt2>", n[n.length] = "<a:accent1><a:srgbClr val=\"4F81BD\"/></a:accent1>", n[n.length] = "<a:accent2><a:srgbClr val=\"C0504D\"/></a:accent2>", n[n.length] = "<a:accent3><a:srgbClr val=\"9BBB59\"/></a:accent3>", n[n.length] = "<a:accent4><a:srgbClr val=\"8064A2\"/></a:accent4>", n[n.length] = "<a:accent5><a:srgbClr val=\"4BACC6\"/></a:accent5>", n[n.length] = "<a:accent6><a:srgbClr val=\"F79646\"/></a:accent6>", n[n.length] = "<a:hlink><a:srgbClr val=\"0000FF\"/></a:hlink>", n[n.length] = "<a:folHlink><a:srgbClr val=\"800080\"/></a:folHlink>", n[n.length] = "</a:clrScheme>", n[n.length] = "<a:fontScheme name=\"Office\">", n[n.length] = "<a:majorFont>", n[n.length] = "<a:latin typeface=\"Cambria\"/>", n[n.length] = "<a:ea typeface=\"\"/>", n[n.length] = "<a:cs typeface=\"\"/>", n[n.length] = "<a:font script=\"Jpan\" typeface=\"ＭＳ Ｐゴシック\"/>", n[n.length] = "<a:font script=\"Hang\" typeface=\"맑은 고딕\"/>", n[n.length] = "<a:font script=\"Hans\" typeface=\"宋体\"/>", n[n.length] = "<a:font script=\"Hant\" typeface=\"新細明體\"/>", n[n.length] = "<a:font script=\"Arab\" typeface=\"Times New Roman\"/>", n[n.length] = "<a:font script=\"Hebr\" typeface=\"Times New Roman\"/>", n[n.length] = "<a:font script=\"Thai\" typeface=\"Tahoma\"/>", n[n.length] = "<a:font script=\"Ethi\" typeface=\"Nyala\"/>", n[n.length] = "<a:font script=\"Beng\" typeface=\"Vrinda\"/>", n[n.length] = "<a:font script=\"Gujr\" typeface=\"Shruti\"/>", n[n.length] = "<a:font script=\"Khmr\" typeface=\"MoolBoran\"/>", n[n.length] = "<a:font script=\"Knda\" typeface=\"Tunga\"/>", n[n.length] = "<a:font script=\"Guru\" typeface=\"Raavi\"/>", n[n.length] = "<a:font script=\"Cans\" typeface=\"Euphemia\"/>", n[n.length] = "<a:font script=\"Cher\" typeface=\"Plantagenet Cherokee\"/>", n[n.length] = "<a:font script=\"Yiii\" typeface=\"Microsoft Yi Baiti\"/>", n[n.length] = "<a:font script=\"Tibt\" typeface=\"Microsoft Himalaya\"/>", n[n.length] = "<a:font script=\"Thaa\" typeface=\"MV Boli\"/>", n[n.length] = "<a:font script=\"Deva\" typeface=\"Mangal\"/>", n[n.length] = "<a:font script=\"Telu\" typeface=\"Gautami\"/>", n[n.length] = "<a:font script=\"Taml\" typeface=\"Latha\"/>", n[n.length] = "<a:font script=\"Syrc\" typeface=\"Estrangelo Edessa\"/>", n[n.length] = "<a:font script=\"Orya\" typeface=\"Kalinga\"/>", n[n.length] = "<a:font script=\"Mlym\" typeface=\"Kartika\"/>", n[n.length] = "<a:font script=\"Laoo\" typeface=\"DokChampa\"/>", n[n.length] = "<a:font script=\"Sinh\" typeface=\"Iskoola Pota\"/>", n[n.length] = "<a:font script=\"Mong\" typeface=\"Mongolian Baiti\"/>", n[n.length] = "<a:font script=\"Viet\" typeface=\"Times New Roman\"/>", n[n.length] = "<a:font script=\"Uigh\" typeface=\"Microsoft Uighur\"/>", n[n.length] = "<a:font script=\"Geor\" typeface=\"Sylfaen\"/>", n[n.length] = "</a:majorFont>", n[n.length] = "<a:minorFont>", n[n.length] = "<a:latin typeface=\"Calibri\"/>", n[n.length] = "<a:ea typeface=\"\"/>", n[n.length] = "<a:cs typeface=\"\"/>", n[n.length] = "<a:font script=\"Jpan\" typeface=\"ＭＳ Ｐゴシック\"/>", n[n.length] = "<a:font script=\"Hang\" typeface=\"맑은 고딕\"/>", n[n.length] = "<a:font script=\"Hans\" typeface=\"宋体\"/>", n[n.length] = "<a:font script=\"Hant\" typeface=\"新細明體\"/>", n[n.length] = "<a:font script=\"Arab\" typeface=\"Arial\"/>", n[n.length] = "<a:font script=\"Hebr\" typeface=\"Arial\"/>", n[n.length] = "<a:font script=\"Thai\" typeface=\"Tahoma\"/>", n[n.length] = "<a:font script=\"Ethi\" typeface=\"Nyala\"/>", n[n.length] = "<a:font script=\"Beng\" typeface=\"Vrinda\"/>", n[n.length] = "<a:font script=\"Gujr\" typeface=\"Shruti\"/>", n[n.length] = "<a:font script=\"Khmr\" typeface=\"DaunPenh\"/>", n[n.length] = "<a:font script=\"Knda\" typeface=\"Tunga\"/>", n[n.length] = "<a:font script=\"Guru\" typeface=\"Raavi\"/>", n[n.length] = "<a:font script=\"Cans\" typeface=\"Euphemia\"/>", n[n.length] = "<a:font script=\"Cher\" typeface=\"Plantagenet Cherokee\"/>", n[n.length] = "<a:font script=\"Yiii\" typeface=\"Microsoft Yi Baiti\"/>", n[n.length] = "<a:font script=\"Tibt\" typeface=\"Microsoft Himalaya\"/>", n[n.length] = "<a:font script=\"Thaa\" typeface=\"MV Boli\"/>", n[n.length] = "<a:font script=\"Deva\" typeface=\"Mangal\"/>", n[n.length] = "<a:font script=\"Telu\" typeface=\"Gautami\"/>", n[n.length] = "<a:font script=\"Taml\" typeface=\"Latha\"/>", n[n.length] = "<a:font script=\"Syrc\" typeface=\"Estrangelo Edessa\"/>", n[n.length] = "<a:font script=\"Orya\" typeface=\"Kalinga\"/>", n[n.length] = "<a:font script=\"Mlym\" typeface=\"Kartika\"/>", n[n.length] = "<a:font script=\"Laoo\" typeface=\"DokChampa\"/>", n[n.length] = "<a:font script=\"Sinh\" typeface=\"Iskoola Pota\"/>", n[n.length] = "<a:font script=\"Mong\" typeface=\"Mongolian Baiti\"/>", n[n.length] = "<a:font script=\"Viet\" typeface=\"Arial\"/>", n[n.length] = "<a:font script=\"Uigh\" typeface=\"Microsoft Uighur\"/>", n[n.length] = "<a:font script=\"Geor\" typeface=\"Sylfaen\"/>", n[n.length] = "</a:minorFont>", n[n.length] = "</a:fontScheme>", n[n.length] = "<a:fmtScheme name=\"Office\">", n[n.length] = "<a:fillStyleLst>", n[n.length] = "<a:solidFill><a:schemeClr val=\"phClr\"/></a:solidFill>", n[n.length] = "<a:gradFill rotWithShape=\"1\">", n[n.length] = "<a:gsLst>", n[n.length] = "<a:gs pos=\"0\"><a:schemeClr val=\"phClr\"><a:tint val=\"50000\"/><a:satMod val=\"300000\"/></a:schemeClr></a:gs>", n[n.length] = "<a:gs pos=\"35000\"><a:schemeClr val=\"phClr\"><a:tint val=\"37000\"/><a:satMod val=\"300000\"/></a:schemeClr></a:gs>", n[n.length] = "<a:gs pos=\"100000\"><a:schemeClr val=\"phClr\"><a:tint val=\"15000\"/><a:satMod val=\"350000\"/></a:schemeClr></a:gs>", n[n.length] = "</a:gsLst>", n[n.length] = "<a:lin ang=\"16200000\" scaled=\"1\"/>", n[n.length] = "</a:gradFill>", n[n.length] = "<a:gradFill rotWithShape=\"1\">", n[n.length] = "<a:gsLst>", n[n.length] = "<a:gs pos=\"0\"><a:schemeClr val=\"phClr\"><a:tint val=\"100000\"/><a:shade val=\"100000\"/><a:satMod val=\"130000\"/></a:schemeClr></a:gs>", n[n.length] = "<a:gs pos=\"100000\"><a:schemeClr val=\"phClr\"><a:tint val=\"50000\"/><a:shade val=\"100000\"/><a:satMod val=\"350000\"/></a:schemeClr></a:gs>", n[n.length] = "</a:gsLst>", n[n.length] = "<a:lin ang=\"16200000\" scaled=\"0\"/>", n[n.length] = "</a:gradFill>", n[n.length] = "</a:fillStyleLst>", n[n.length] = "<a:lnStyleLst>", n[n.length] = "<a:ln w=\"9525\" cap=\"flat\" cmpd=\"sng\" algn=\"ctr\"><a:solidFill><a:schemeClr val=\"phClr\"><a:shade val=\"95000\"/><a:satMod val=\"105000\"/></a:schemeClr></a:solidFill><a:prstDash val=\"solid\"/></a:ln>", n[n.length] = "<a:ln w=\"25400\" cap=\"flat\" cmpd=\"sng\" algn=\"ctr\"><a:solidFill><a:schemeClr val=\"phClr\"/></a:solidFill><a:prstDash val=\"solid\"/></a:ln>", n[n.length] = "<a:ln w=\"38100\" cap=\"flat\" cmpd=\"sng\" algn=\"ctr\"><a:solidFill><a:schemeClr val=\"phClr\"/></a:solidFill><a:prstDash val=\"solid\"/></a:ln>", n[n.length] = "</a:lnStyleLst>", n[n.length] = "<a:effectStyleLst>", n[n.length] = "<a:effectStyle>", n[n.length] = "<a:effectLst>", n[n.length] = "<a:outerShdw blurRad=\"40000\" dist=\"20000\" dir=\"5400000\" rotWithShape=\"0\"><a:srgbClr val=\"000000\"><a:alpha val=\"38000\"/></a:srgbClr></a:outerShdw>", n[n.length] = "</a:effectLst>", n[n.length] = "</a:effectStyle>", n[n.length] = "<a:effectStyle>", n[n.length] = "<a:effectLst>", n[n.length] = "<a:outerShdw blurRad=\"40000\" dist=\"23000\" dir=\"5400000\" rotWithShape=\"0\"><a:srgbClr val=\"000000\"><a:alpha val=\"35000\"/></a:srgbClr></a:outerShdw>", n[n.length] = "</a:effectLst>", n[n.length] = "</a:effectStyle>", n[n.length] = "<a:effectStyle>", n[n.length] = "<a:effectLst>", n[n.length] = "<a:outerShdw blurRad=\"40000\" dist=\"23000\" dir=\"5400000\" rotWithShape=\"0\"><a:srgbClr val=\"000000\"><a:alpha val=\"35000\"/></a:srgbClr></a:outerShdw>", n[n.length] = "</a:effectLst>", n[n.length] = "<a:scene3d><a:camera prst=\"orthographicFront\"><a:rot lat=\"0\" lon=\"0\" rev=\"0\"/></a:camera><a:lightRig rig=\"threePt\" dir=\"t\"><a:rot lat=\"0\" lon=\"0\" rev=\"1200000\"/></a:lightRig></a:scene3d>", n[n.length] = "<a:sp3d><a:bevelT w=\"63500\" h=\"25400\"/></a:sp3d>", n[n.length] = "</a:effectStyle>", n[n.length] = "</a:effectStyleLst>", n[n.length] = "<a:bgFillStyleLst>", n[n.length] = "<a:solidFill><a:schemeClr val=\"phClr\"/></a:solidFill>", n[n.length] = "<a:gradFill rotWithShape=\"1\">", n[n.length] = "<a:gsLst>", n[n.length] = "<a:gs pos=\"0\"><a:schemeClr val=\"phClr\"><a:tint val=\"40000\"/><a:satMod val=\"350000\"/></a:schemeClr></a:gs>", n[n.length] = "<a:gs pos=\"40000\"><a:schemeClr val=\"phClr\"><a:tint val=\"45000\"/><a:shade val=\"99000\"/><a:satMod val=\"350000\"/></a:schemeClr></a:gs>", n[n.length] = "<a:gs pos=\"100000\"><a:schemeClr val=\"phClr\"><a:shade val=\"20000\"/><a:satMod val=\"255000\"/></a:schemeClr></a:gs>", n[n.length] = "</a:gsLst>", n[n.length] = "<a:path path=\"circle\"><a:fillToRect l=\"50000\" t=\"-80000\" r=\"50000\" b=\"180000\"/></a:path>", n[n.length] = "</a:gradFill>", n[n.length] = "<a:gradFill rotWithShape=\"1\">", n[n.length] = "<a:gsLst>", n[n.length] = "<a:gs pos=\"0\"><a:schemeClr val=\"phClr\"><a:tint val=\"80000\"/><a:satMod val=\"300000\"/></a:schemeClr></a:gs>", n[n.length] = "<a:gs pos=\"100000\"><a:schemeClr val=\"phClr\"><a:shade val=\"30000\"/><a:satMod val=\"200000\"/></a:schemeClr></a:gs>", n[n.length] = "</a:gsLst>", n[n.length] = "<a:path path=\"circle\"><a:fillToRect l=\"50000\" t=\"50000\" r=\"50000\" b=\"50000\"/></a:path>", n[n.length] = "</a:gradFill>", n[n.length] = "</a:bgFillStyleLst>", n[n.length] = "</a:fmtScheme>", n[n.length] = "</a:themeElements>", n[n.length] = "<a:objectDefaults>", n[n.length] = "<a:spDef>", n[n.length] = "<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx=\"1\"><a:schemeClr val=\"accent1\"/></a:lnRef><a:fillRef idx=\"3\"><a:schemeClr val=\"accent1\"/></a:fillRef><a:effectRef idx=\"2\"><a:schemeClr val=\"accent1\"/></a:effectRef><a:fontRef idx=\"minor\"><a:schemeClr val=\"lt1\"/></a:fontRef></a:style>", n[n.length] = "</a:spDef>", n[n.length] = "<a:lnDef>", n[n.length] = "<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx=\"2\"><a:schemeClr val=\"accent1\"/></a:lnRef><a:fillRef idx=\"0\"><a:schemeClr val=\"accent1\"/></a:fillRef><a:effectRef idx=\"1\"><a:schemeClr val=\"accent1\"/></a:effectRef><a:fontRef idx=\"minor\"><a:schemeClr val=\"tx1\"/></a:fontRef></a:style>", n[n.length] = "</a:lnDef>", n[n.length] = "</a:objectDefaults>", n[n.length] = "<a:extraClrSchemeLst/>", n[n.length] = "</a:theme>", n.join("");
}
function dl(e, t, n) {
	var r = e.l + t;
	if (e.read_shift(4) !== 124226) {
		if (!n.cellStyles) e.l = r;
		else {
			var i = e.slice(e.l);
			e.l = r;
			var a;
			try {
				a = $t(i, { type: "array" });
			} catch {
				return;
			}
			var o = Yt(a, "theme/theme/theme1.xml", !0);
			if (o) return ll(o, n);
		}
	}
}
function fl(e) {
	return e.read_shift(4);
}
function pl(e) {
	var t = {};
	switch (t.xclrType = e.read_shift(2), t.nTintShade = e.read_shift(2, "i"), t.xclrType) {
		case 0:
			e.l += 4;
			break;
		case 1:
			t.xclrValue = ml(e, 4);
			break;
		case 2:
			t.xclrValue = ka(e, 4);
			break;
		case 3:
			t.xclrValue = fl(e, 4);
			break;
		case 4: e.l += 4;
	}
	return e.l += 8, t;
}
function ml(e, t) {
	var n = e.l + t, r = e.read_shift(2) & 127;
	return e.l = n, r;
}
function hl(e, t) {
	return pr(e, t);
}
function gl(e) {
	var t = e.read_shift(2), n = e.read_shift(2) - 4, r = [t];
	switch (t) {
		case 4:
		case 5:
		case 7:
		case 8:
		case 9:
		case 10:
		case 11:
		case 13:
			r[1] = pl(e, n);
			break;
		case 6:
			r[1] = hl(e, n);
			break;
		case 14:
		case 15:
			r[1] = e.read_shift(n === 1 ? 1 : 2);
			break;
		default: throw Error("Unrecognized ExtProp type: " + t + " " + n);
	}
	return r;
}
function _l(e, t) {
	var n = e.l + t;
	e.l += 2;
	var r = e.read_shift(2);
	e.l += 2;
	for (var i = e.read_shift(2), a = []; i-- > 0;) a.push(gl(e, n - e.l));
	return {
		ixfe: r,
		ext: a
	};
}
function vl(e, t) {
	e && (e.data ||= {}, t.forEach(function(t) {
		switch (t[0]) {
			case 4:
				e.data.xfextFore = t[1];
				break;
			case 5:
				e.data.xfextBack = t[1];
				break;
			case 6:
				e.data.gradientFill = t[1];
				break;
			case 7:
				e.data.xfextTop = t[1];
				break;
			case 8:
				e.data.xfextBottom = t[1];
				break;
			case 9:
				e.data.xfextLeft = t[1];
				break;
			case 10:
				e.data.xfextRight = t[1];
				break;
			case 11:
				e.data.xfextDiag = t[1];
				break;
			case 13:
				e.xfextFont = t[1];
				break;
			case 14:
				e.fontScheme = t[1];
				break;
			case 15: e.data.cIndent = t[1];
		}
	}));
}
function yl(e, t) {
	return {
		flags: e.read_shift(4),
		version: e.read_shift(4),
		name: Gr(e, t - 8)
	};
}
function bl(e) {
	for (var t = [], n = e.read_shift(4); n-- > 0;) t.push([e.read_shift(4), e.read_shift(4)]);
	return t;
}
function xl(e) {
	return e.l += 4, e.read_shift(4) != 0;
}
function Sl(e, t, n) {
	var r = {
		Types: [],
		Cell: [],
		Value: []
	}, i = n || {}, a = [], o = !1, s = 2;
	return hr(e, function(e, t, n) {
		switch (n) {
			case 58: break;
			case 59: break;
			case 335:
				r.Types.push({ name: e.name });
				break;
			case 51:
				e.forEach(function(e) {
					s == 1 ? r.Cell.push({
						type: r.Types[e[0] - 1].name,
						index: e[1]
					}) : s == 0 && r.Value.push({
						type: r.Types[e[0] - 1].name,
						index: e[1]
					});
				});
				break;
			case 337:
				s = +!!e;
				break;
			case 338:
				s = 2;
				break;
			case 35:
				a.push(n), o = !0;
				break;
			case 36:
				a.pop(), o = !1;
				break;
			default: if (!t.T && (!o || i.WTF && a[a.length - 1] != 35)) throw Error("Unexpected record 0x" + n.toString(16));
		}
	}), r;
}
function Cl(e, t, n) {
	var r = {
		Types: [],
		Cell: [],
		Value: []
	};
	if (!e) return r;
	var i = !1, a = 2, o;
	return e.replace(an, function(e) {
		var t = J(e);
		switch (ln(t[0])) {
			case "<?xml": break;
			case "<metadata":
			case "</metadata>": break;
			case "<metadataTypes":
			case "</metadataTypes>": break;
			case "<metadataType":
				r.Types.push({ name: t.name });
				break;
			case "</metadataType>": break;
			case "<futureMetadata":
				for (var s = 0; s < r.Types.length; ++s) r.Types[s].name == t.name && (o = r.Types[s]);
				break;
			case "</futureMetadata>": break;
			case "<bk>": break;
			case "</bk>": break;
			case "<rc":
				a == 1 ? r.Cell.push({
					type: r.Types[t.t - 1].name,
					index: +t.v
				}) : a == 0 && r.Value.push({
					type: r.Types[t.t - 1].name,
					index: +t.v
				});
				break;
			case "</rc>": break;
			case "<cellMetadata":
				a = 1;
				break;
			case "</cellMetadata>":
				a = 2;
				break;
			case "<valueMetadata":
				a = 0;
				break;
			case "</valueMetadata>":
				a = 2;
				break;
			case "<extLst":
			case "<extLst>":
			case "</extLst>":
			case "<extLst/>": break;
			case "<ext":
				i = !0;
				break;
			case "</ext>":
				i = !1;
				break;
			case "<rvb":
				if (!o) break;
				o.offsets || (o.offsets = []), o.offsets.push(+t.i);
				break;
			default: if (!i && n?.WTF) throw Error("unrecognized " + t[0] + " in metadata");
		}
		return e;
	}), r;
}
function wl(e) {
	var t = [];
	if (!e) return t;
	var n = 1;
	return (e.match(an) || []).forEach(function(e) {
		var r = J(e);
		switch (r[0]) {
			case "<?xml": break;
			case "<calcChain":
			case "<calcChain>":
			case "</calcChain>": break;
			case "<c": delete r[0], r.i ? n = r.i : r.i = n, t.push(r);
		}
	}), t;
}
function Tl(e) {
	var t = {};
	t.i = e.read_shift(4);
	var n = {};
	n.r = e.read_shift(4), n.c = e.read_shift(4), t.r = jr(n);
	var r = e.read_shift(1);
	return r & 2 && (t.l = "1"), r & 8 && (t.a = "1"), t;
}
function El(e, t, n) {
	var r = [];
	return hr(e, function(e, t, n) {
		switch (n) {
			case 63:
				r.push(e);
				break;
			default: if (!t.T) throw Error("Unexpected record 0x" + n.toString(16));
		}
	}), r;
}
function Dl(e, t, n, r) {
	if (!e) return e;
	var i = r || {}, a = !1;
	hr(e, function(e, t, n) {
		switch (n) {
			case 359:
			case 363:
			case 364:
			case 366:
			case 367:
			case 368:
			case 369:
			case 370:
			case 371:
			case 472:
			case 577:
			case 578:
			case 579:
			case 580:
			case 581:
			case 582:
			case 583:
			case 584:
			case 585:
			case 586:
			case 587:
			case 5108: break;
			case 35:
				a = !0;
				break;
			case 36:
				a = !1;
				break;
			default: if (!t.T && (!a || i.WTF)) throw Error("Unexpected record 0x" + n.toString(16));
		}
	}, i);
}
function Ol(e, t) {
	if (!e) return {
		charts: [],
		images: [],
		shapes: [],
		raw: ""
	};
	var n = {
		charts: [],
		images: [],
		shapes: [],
		raw: e
	};
	return t ||= { "!id": {} }, (e.match(/<(?:\w+:)?(twoCellAnchor|oneCellAnchor|absoluteAnchor)\b[^>]*>[\s\S]*?<\/(?:\w+:)?\1>/g) || [e]).forEach(function(e) {
		var r = Al(e);
		(e.match(/<c:chart\b[^<>]*r:id="([^<>"]*)"/g) || []).forEach(function(e) {
			var i = e.match(/r:id="([^<>"]*)"/);
			if (i) {
				var a = t["!id"][i[1]] || {};
				n.charts.push({
					id: i[1],
					rel: a,
					target: a.Target,
					anchor: r
				});
			}
		}), (e.match(/<a:blip\b[^<>]*(?:r:embed|r:link)="([^<>"]*)"/g) || []).forEach(function(e) {
			var i = e.match(/(?:r:embed|r:link)="([^<>"]*)"/);
			if (i) {
				var a = t["!id"][i[1]] || {};
				n.images.push({
					id: i[1],
					rel: a,
					target: a.Target,
					anchor: r
				});
			}
		});
		var i = jl(e);
		i && n.shapes.push({
			text: i,
			anchor: r,
			raw: e
		});
	}), n.chart = n.charts[0] && n.charts[0].target, n;
}
function kl(e, t) {
	var n = zt(e, t), r = n && n[1] || "";
	function i(e) {
		var t = zt(r, e);
		return t && t[1] != null ? parseInt(t[1], 10) : 0;
	}
	return {
		col: i("col"),
		colOff: i("colOff"),
		row: i("row"),
		rowOff: i("rowOff")
	};
}
function Al(e) {
	var t = { type: (e.match(/^<(?:\w+:)?(\w+)/) || [])[1] || "anchor" };
	(e.indexOf("<xdr:from") >= 0 || e.indexOf("<from") >= 0) && (t.from = kl(e, "from")), (e.indexOf("<xdr:to") >= 0 || e.indexOf("<to") >= 0) && (t.to = kl(e, "to"));
	var n = e.match(/<(?:\w+:)?pos\b[^<>]*\/>/);
	if (n) {
		var r = J(n[0]);
		t.pos = {
			x: r.x ? parseInt(r.x, 10) : 0,
			y: r.y ? parseInt(r.y, 10) : 0
		};
	}
	var i = e.match(/<(?:\w+:)?ext\b[^<>]*\/>/);
	if (i) {
		var a = J(i[0]);
		t.ext = {
			cx: a.cx ? parseInt(a.cx, 10) : 0,
			cy: a.cy ? parseInt(a.cy, 10) : 0
		};
	}
	return t;
}
function jl(e) {
	var t = [];
	return (e.match(/<a:t\b[^>]*>[\s\S]*?<\/a:t>/g) || []).forEach(function(e) {
		t.push(Y(hn(e)));
	}), t.join("");
}
function Ml(e, t, n) {
	var r = e.slice(e.l, e.l + t);
	return e.l += t, !n || !n.drawings && !n.charts ? {
		raw: r,
		blips: [],
		shapes: [],
		images: [],
		charts: [],
		groups: !0
	} : Il(r, !0);
}
function Nl(e, t, n) {
	var r = e.slice(e.l, e.l + t);
	return e.l += t, !n || !n.drawings && !n.charts ? {
		raw: r,
		blips: [],
		shapes: [],
		images: [],
		charts: [],
		groups: !1
	} : Il(r, !1);
}
function Pl(e, t) {
	return e[t] | e[t + 1] << 8;
}
function Fl(e, t) {
	return (e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24) >>> 0;
}
function Il(e, t) {
	var n = {
		raw: e,
		blips: [],
		shapes: [],
		images: [],
		charts: [],
		groups: !!t
	}, r = {
		out: n,
		current: null
	};
	try {
		Ll(e, 0, e.length, r);
	} catch (e) {
		n.error = e.message || String(e);
	}
	return n;
}
function Ll(e, t, n, r) {
	for (var i = t; i + 8 <= n && i + 8 <= e.length;) {
		var a = Pl(e, i), o = Pl(e, i + 2), s = Fl(e, i + 4), c = a & 15, l = a >> 4, u = i + 8, d = u + s;
		if (d > e.length && (d = e.length), o == 61444) {
			var f = {
				raw: e.slice(i, d),
				props: {}
			};
			r.out.shapes.push(f);
			var p = r.current;
			r.current = f, Ll(e, u, d, r), r.current = p;
		} else o == 61447 ? r.out.blips.push(Vl(e, u, d, l)) : o == 61450 && r.current ? (r.current.spid = Fl(e, u), r.current.flags = Fl(e, u + 4)) : o == 61451 && r.current ? (r.current.props = Rl(e, u, d, l), r.current.props.pib != null && (r.current.blipId = r.current.props.pib)) : o == 61456 && r.current ? r.current.anchor = zl(e, u, d) : o == 61457 && r.current ? r.current.clientData = e.slice(u, d) : c == 15 && Ll(e, u, d, r);
		i = d;
	}
}
function Rl(e, t, n, r) {
	for (var i = {}, a = [], o = t, s = 0; s < r && o + 6 <= n; ++s, o += 6) {
		var c = Pl(e, o), l = Fl(e, o + 2), u = c & 16383;
		i[u] = l, c & 16384 && a.push([u, l]), u == 260 && (i.pib = l), u == 261 && (i.pibName = l), u == 896 && (i.fillColor = l), u == 897 && (i.fillOpacity = l), u == 959 && (i.lineColor = l);
	}
	return a.forEach(function(t) {
		o + t[1] <= n && (i["complex_" + t[0]] = e.slice(o, o + t[1])), o += t[1];
	}), i;
}
function zl(e, t, n) {
	if (n - t < 18) return {};
	var r = t, i = Pl(e, r);
	r += 2;
	var a = Pl(e, r), o = Pl(e, r + 2), s = Pl(e, r + 4), c = Pl(e, r + 6);
	r += 8;
	var l = Pl(e, r), u = Pl(e, r + 2), d = Pl(e, r + 4), f = Pl(e, r + 6);
	return {
		type: "twoCellAnchor",
		flags: i,
		from: {
			col: a,
			colOff: o * 9525 / 1024,
			row: s,
			rowOff: c * 9525 / 256
		},
		to: {
			col: l,
			colOff: u * 9525 / 1024,
			row: d,
			rowOff: f * 9525 / 256
		}
	};
}
function Bl(e, t, n) {
	for (var r = t; r + 8 <= n; ++r) {
		if (e[r] == 137 && e[r + 1] == 80 && e[r + 2] == 78 && e[r + 3] == 71) return [r, "image/png"];
		if (e[r] == 255 && e[r + 1] == 216 && e[r + 2] == 255) return [r, "image/jpeg"];
		if (e[r] == 66 && e[r + 1] == 77) return [r, "image/bmp"];
	}
	return [t, ""];
}
function Vl(e, t, n, r) {
	var i = {
		index: r,
		raw: e.slice(t, n)
	};
	if (n - t < 36) return i;
	i.btWin32 = e[t], i.btMacOS = e[t + 1], i.size = Fl(e, t + 20), i.cRef = Fl(e, t + 24);
	var a = t + 36;
	if (a + 8 <= n) {
		i.blipType = Pl(e, a + 2);
		var o = a + 8, s = n, c = Bl(e, o, s);
		c[1] && (i.contentType = c[1], i.data = e.slice(c[0], s), i.dataURI = "data:" + i.contentType + ";base64," + D(i.data));
	}
	return i;
}
function Hl(e, t, n) {
	var r = 0;
	(Bt(e, "(?:shape|rect)") || []).forEach(function(e) {
		var i = "", a = !0, o = -1, s = -1, c = -1;
		if (e.replace(an, function(t, n) {
			var r = J(t);
			switch (ln(r[0])) {
				case "<ClientData":
					r.ObjectType && (i = r.ObjectType);
					break;
				case "<Visible":
				case "<Visible/>":
					a = !1;
					break;
				case "<Row":
				case "<Row>":
					o = n + t.length;
					break;
				case "</Row>":
					s = +e.slice(o, n).trim();
					break;
				case "<Column":
				case "<Column>":
					o = n + t.length;
					break;
				case "</Column>": c = +e.slice(o, n).trim();
			}
			return "";
		}), i === "Note") {
			var l = Kg(t, s >= 0 && c >= 0 ? jr({
				r: s,
				c
			}) : n[r].ref);
			l.c && (l.c.hidden = a), ++r;
		}
	});
}
function Ul(e, t, n, r) {
	var i = e["!data"] != null, a;
	t.forEach(function(t) {
		var o = Ar(t.ref);
		if (!(o.r < 0 || o.c < 0)) {
			if (i ? (e["!data"][o.r] || (e["!data"][o.r] = []), a = e["!data"][o.r][o.c]) : a = e[t.ref], !a) {
				a = { t: "z" }, i ? e["!data"][o.r][o.c] = a : e[t.ref] = a;
				var s = Pr(e["!ref"] || "BDWGO1000001:A1");
				s.s.r > o.r && (s.s.r = o.r), s.e.r < o.r && (s.e.r = o.r), s.s.c > o.c && (s.s.c = o.c), s.e.c < o.c && (s.e.c = o.c), e["!ref"] = Z(s);
			}
			a.c || (a.c = []);
			var c = {
				a: t.author,
				t: t.t,
				r: t.r,
				T: n
			};
			t.h && (c.h = t.h);
			for (var l = a.c.length - 1; l >= 0; --l) {
				if (!n && a.c[l].T) return;
				n && !a.c[l].T && a.c.splice(l, 1);
			}
			if (n && r) {
				for (l = 0; l < r.length; ++l) if (c.a == r[l].id) {
					c.a = r[l].name || c.a;
					break;
				}
			}
			a.c.push(c);
		}
	});
}
function Wl(e, t) {
	if (e.match(/<(?:\w+:)?comments *\/>/)) return [];
	var n = [], r = [], i = zt(e, "authors");
	i && i[1] && i[1].split(/<\/\w*:?author>/).forEach(function(e) {
		if (e !== "" && e.trim() !== "") {
			var t = e.match(/<(?:\w+:)?author[^<>]*>(.*)/);
			t && n.push(t[1]);
		}
	});
	var a = zt(e, "commentList");
	return a && a[1] && a[1].split(/<\/\w*:?comment>/).forEach(function(e) {
		if (e !== "" && e.trim() !== "") {
			var i = e.match(/<(?:\w+:)?comment[^<>]*>/);
			if (i) {
				var a = J(i[0]), o = {
					author: a.authorId && n[a.authorId] || "sheetjsghost",
					ref: a.ref,
					guid: a.guid
				}, s = Ar(a.ref);
				if (!(t.sheetRows && t.sheetRows <= s.r)) {
					var c = zt(e, "text"), l = !!c && !!c[1] && Ss(c[1]) || {
						r: "",
						t: "",
						h: ""
					};
					o.r = l.r, l.r == "<t></t>" && (l.t = l.h = ""), o.t = (l.t || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n"), t.cellHTML && (o.h = l.h), r.push(o);
				}
			}
		}
	}), r;
}
function Gl(e, t) {
	var n = [], r = !1, i = {}, a = 0;
	return e.replace(an, function(o, s) {
		var c = J(o);
		switch (ln(c[0])) {
			case "<?xml": break;
			case "<ThreadedComments": break;
			case "</ThreadedComments>": break;
			case "<threadedComment":
				i = {
					author: c.personId,
					guid: c.id,
					ref: c.ref,
					T: 1
				};
				break;
			case "</threadedComment>":
				i.t != null && n.push(i);
				break;
			case "<text>":
			case "<text":
				a = s + o.length;
				break;
			case "</text>":
				i.t = e.slice(a, s).replace(/\r\n/g, "\n").replace(/\r/g, "\n");
				break;
			case "<mentions":
			case "<mentions>":
				r = !0;
				break;
			case "</mentions>":
				r = !1;
				break;
			case "<extLst":
			case "<extLst>":
			case "</extLst>":
			case "<extLst/>": break;
			case "<ext":
				r = !0;
				break;
			case "</ext>":
				r = !1;
				break;
			default: if (!r && t.WTF) throw Error("unrecognized " + c[0] + " in threaded comments");
		}
		return o;
	}), n;
}
function Kl(e, t) {
	var n = [], r = !1;
	return e.replace(an, function(e) {
		var i = J(e);
		switch (ln(i[0])) {
			case "<?xml": break;
			case "<personList": break;
			case "</personList>": break;
			case "<person":
				n.push({
					name: i.displayname,
					id: i.id
				});
				break;
			case "</person>": break;
			case "<extLst":
			case "<extLst>":
			case "</extLst>":
			case "<extLst/>": break;
			case "<ext":
				r = !0;
				break;
			case "</ext>":
				r = !1;
				break;
			default: if (!r && t.WTF) throw Error("unrecognized " + i[0] + " in threaded comments");
		}
		return e;
	}), n;
}
function ql(e) {
	var t = {};
	t.iauthor = e.read_shift(4);
	var n = ri(e, 16);
	return t.rfx = n.s, t.ref = jr(n.s), e.l += 16, t;
}
var Jl = Gr;
function Yl(e, t) {
	var n = [], r = [], i = {}, a = !1;
	return hr(e, function(e, o, s) {
		switch (s) {
			case 632:
				r.push(e);
				break;
			case 635:
				i = e;
				break;
			case 637:
				i.t = e.t, i.h = e.h, i.r = e.r;
				break;
			case 636:
				if (i.author = r[i.iauthor], delete i.iauthor, t.sheetRows && i.rfx && t.sheetRows <= i.rfx.r) break;
				i.t || (i.t = ""), delete i.rfx, n.push(i);
				break;
			case 3072: break;
			case 35:
				a = !0;
				break;
			case 36:
				a = !1;
				break;
			case 37: break;
			case 38: break;
			default: if (!o.T && (!a || t.WTF)) throw Error("Unexpected record 0x" + s.toString(16));
		}
	}), n;
}
var Xl = "application/vnd.ms-office.vbaProject";
function Zl(e) {
	var t = it.utils.cfb_new({ root: "R" });
	return e.FullPaths.forEach(function(n, r) {
		if (n.slice(-1) !== "/" && n.match(/_VBA_PROJECT_CUR/)) {
			var i = n.replace(/^[^\/]*/, "R").replace(/\/_VBA_PROJECT_CUR\u0000*/, "");
			it.utils.cfb_add(t, i, e.FileIndex[r].content);
		}
	}), it.write(t);
}
function Ql() {
	return { "!type": "dialog" };
}
function $l() {
	return { "!type": "dialog" };
}
function eu() {
	return { "!type": "macro" };
}
function tu() {
	return { "!type": "macro" };
}
var nu = /*#__PURE__*/ (function() {
	var e = /(^|[^A-Za-z_])R(\[?-?\d+\]|[1-9]\d*|)C(\[?-?\d+\]|[1-9]\d*|)(?![A-Za-z0-9_])/g, t = {
		r: 0,
		c: 0
	};
	function n(e, n, r, i) {
		var a = !1, o = !1;
		r.length == 0 ? o = !0 : r.charAt(0) == "[" && (o = !0, r = r.slice(1, -1)), i.length == 0 ? a = !0 : i.charAt(0) == "[" && (a = !0, i = i.slice(1, -1));
		var s = r.length > 0 ? parseInt(r, 10) | 0 : 0, c = i.length > 0 ? parseInt(i, 10) | 0 : 0;
		return a ? c += t.c : --c, o ? s += t.r : --s, n + (a ? "" : "$") + Er(c) + (o ? "" : "$") + Sr(s);
	}
	return function(r, i) {
		return t = i, r.replace(e, n);
	};
})(), ru = /(^|[^._A-Za-z0-9])(\$?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])(\$?)(\d{1,7})(?![_.\(A-Za-z0-9])/g;
try {
	ru = /(^|[^._A-Za-z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})(?![_.\(A-Za-z0-9])/g;
} catch {}
var iu = /*#__PURE__*/ (function() {
	return function(e, t) {
		return e.replace(ru, function(e, n, r, i, a, o) {
			var s = Tr(i) - (r ? 0 : t.c), c = xr(o) - (a ? 0 : t.r), l = a == "$" ? c + 1 : c == 0 ? "" : "[" + c + "]", u = r == "$" ? s + 1 : s == 0 ? "" : "[" + s + "]";
			return n + "R" + l + "C" + u;
		});
	};
})();
function au(e, t) {
	return e.replace(ru, function(e, n, r, i, a, o) {
		return n + (r == "$" ? r + i : Er(Tr(i) + t.c)) + (a == "$" ? a + o : Sr(xr(o) + t.r));
	});
}
function ou(e, t, n) {
	var r = Mr(t).s, i = Ar(n);
	return au(e, {
		r: i.r - r.r,
		c: i.c - r.c
	});
}
function su(e) {
	return e.length != 1;
}
function cu(e) {
	return e.replace(/_xlfn\./g, "");
}
function lu(e) {
	e.l += 1;
}
function uu(e, t) {
	var n = e.read_shift(t == 1 ? 1 : 2);
	return [
		n & 16383,
		n >> 14 & 1,
		n >> 15 & 1
	];
}
function du(e, t, n) {
	var r = 2;
	if (n) {
		if (n.biff >= 2 && n.biff <= 5) return fu(e, t, n);
		n.biff == 12 && (r = 4);
	}
	var i = e.read_shift(r), a = e.read_shift(r), o = uu(e, 2), s = uu(e, 2);
	return {
		s: {
			r: i,
			c: o[0],
			cRel: o[1],
			rRel: o[2]
		},
		e: {
			r: a,
			c: s[0],
			cRel: s[1],
			rRel: s[2]
		}
	};
}
function fu(e) {
	var t = uu(e, 2), n = uu(e, 2), r = e.read_shift(1), i = e.read_shift(1);
	return {
		s: {
			r: t[0],
			c: r,
			cRel: t[1],
			rRel: t[2]
		},
		e: {
			r: n[0],
			c: i,
			cRel: n[1],
			rRel: n[2]
		}
	};
}
function pu(e, t, n) {
	if (n.biff < 8) return fu(e, t, n);
	var r = e.read_shift(n.biff == 12 ? 4 : 2), i = e.read_shift(n.biff == 12 ? 4 : 2), a = uu(e, 2), o = uu(e, 2);
	return {
		s: {
			r,
			c: a[0],
			cRel: a[1],
			rRel: a[2]
		},
		e: {
			r: i,
			c: o[0],
			cRel: o[1],
			rRel: o[2]
		}
	};
}
function mu(e, t, n) {
	if (n && n.biff >= 2 && n.biff <= 5) return hu(e, t, n);
	var r = e.read_shift(n && n.biff == 12 ? 4 : 2), i = uu(e, 2);
	return {
		r,
		c: i[0],
		cRel: i[1],
		rRel: i[2]
	};
}
function hu(e) {
	var t = uu(e, 2), n = e.read_shift(1);
	return {
		r: t[0],
		c: n,
		cRel: t[1],
		rRel: t[2]
	};
}
function gu(e) {
	var t = e.read_shift(2), n = e.read_shift(2);
	return {
		r: t,
		c: n & 255,
		fQuoted: !!(n & 16384),
		cRel: n >> 15,
		rRel: n >> 15
	};
}
function _u(e, t, n) {
	var r = n && n.biff ? n.biff : 8;
	if (r >= 2 && r <= 5) return vu(e, t, n);
	var i = e.read_shift(r >= 12 ? 4 : 2), a = e.read_shift(2), o = (a & 16384) >> 14, s = (a & 32768) >> 15;
	if (a &= 16383, s == 1) for (; i > 524287;) i -= 1048576;
	if (o == 1) for (; a > 8191;) a -= 16384;
	return {
		r: i,
		c: a,
		cRel: o,
		rRel: s
	};
}
function vu(e) {
	var t = e.read_shift(2), n = e.read_shift(1), r = (t & 32768) >> 15, i = (t & 16384) >> 14;
	return t &= 16383, r == 1 && t >= 8192 && (t -= 16384), i == 1 && n >= 128 && (n -= 256), {
		r: t,
		c: n,
		cRel: i,
		rRel: r
	};
}
function yu(e, t, n) {
	return [(e[e.l++] & 96) >> 5, du(e, n.biff >= 2 && n.biff <= 5 ? 6 : 8, n)];
}
function bu(e, t, n) {
	var r = (e[e.l++] & 96) >> 5, i = e.read_shift(2, "i"), a = 8;
	if (n) switch (n.biff) {
		case 5:
			e.l += 12, a = 6;
			break;
		case 12: a = 12;
	}
	return [
		r,
		i,
		du(e, a, n)
	];
}
function xu(e, t, n) {
	var r = (e[e.l++] & 96) >> 5;
	return e.l += n && n.biff > 8 ? 12 : n.biff < 8 ? 6 : 8, [r];
}
function Su(e, t, n) {
	var r = (e[e.l++] & 96) >> 5, i = e.read_shift(2), a = 8;
	if (n) switch (n.biff) {
		case 5:
			e.l += 12, a = 6;
			break;
		case 12: a = 12;
	}
	return e.l += a, [r, i];
}
function Cu(e, t, n) {
	return [(e[e.l++] & 96) >> 5, pu(e, t - 1, n)];
}
function wu(e, t, n) {
	var r = (e[e.l++] & 96) >> 5;
	return e.l += n.biff == 2 ? 6 : n.biff == 12 ? 14 : 7, [r];
}
function Tu(e) {
	var t = e[e.l + 1] & 1;
	return e.l += 4, [t, 1];
}
function Eu(e, t, n) {
	e.l += 2;
	for (var r = e.read_shift(n && n.biff == 2 ? 1 : 2), i = [], a = 0; a <= r; ++a) i.push(e.read_shift(n && n.biff == 2 ? 1 : 2));
	return i;
}
function Du(e, t, n) {
	var r = e[e.l + 1] & 255 ? 1 : 0;
	return e.l += 2, [r, e.read_shift(n && n.biff == 2 ? 1 : 2)];
}
function Ou(e, t, n) {
	var r = e[e.l + 1] & 255 ? 1 : 0;
	return e.l += 2, [r, e.read_shift(n && n.biff == 2 ? 1 : 2)];
}
function ku(e) {
	var t = e[e.l + 1] & 255 ? 1 : 0;
	return e.l += 2, [t, e.read_shift(2)];
}
function Au(e, t, n) {
	var r = e[e.l + 1] & 255 ? 1 : 0;
	return e.l += n && n.biff == 2 ? 3 : 4, [r];
}
function ju(e) {
	return [e.read_shift(1), e.read_shift(1)];
}
function Mu(e) {
	return e.read_shift(2), ju(e, 2);
}
function Nu(e) {
	return e.read_shift(2), ju(e, 2);
}
function Pu(e, t, n) {
	var r = (e[e.l] & 96) >> 5;
	return e.l += 1, [r, mu(e, 0, n)];
}
function Fu(e, t, n) {
	var r = (e[e.l] & 96) >> 5;
	return e.l += 1, [r, _u(e, 0, n)];
}
function Iu(e, t, n) {
	var r = (e[e.l] & 96) >> 5;
	e.l += 1;
	var i = e.read_shift(2);
	return n && n.biff == 5 && (e.l += 12), [
		r,
		i,
		mu(e, 0, n)
	];
}
function Lu(e, t, n) {
	var r = (e[e.l] & 96) >> 5;
	e.l += 1;
	var i = e.read_shift(n && n.biff <= 3 ? 1 : 2);
	return [
		Zd[i],
		Xd[i],
		r
	];
}
function Ru(e, t, n) {
	var r = e[e.l++], i = e.read_shift(1), a = n && n.biff <= 3 ? [r == 88 ? -1 : 0, e.read_shift(1)] : zu(e);
	return [i, (a[0] === 0 ? Xd : Yd)[a[1]]];
}
function zu(e) {
	return [e[e.l + 1] >> 7, e.read_shift(2) & 32767];
}
function Bu(e, t, n) {
	e.l += n && n.biff == 2 ? 3 : 4;
}
function Vu(e, t, n) {
	return e.l++, n && n.biff == 12 ? [e.read_shift(4, "i"), 0] : [e.read_shift(2), e.read_shift(n && n.biff == 2 ? 1 : 2)];
}
function Hu(e) {
	return e.l++, ki[e.read_shift(1)];
}
function Uu(e) {
	return e.l++, e.read_shift(2);
}
function Wu(e) {
	return e.l++, e.read_shift(1) !== 0;
}
function Gu(e) {
	return e.l++, ii(e, 8);
}
function Ku(e, t, n) {
	return e.l++, va(e, t - 1, n);
}
function qu(e, t) {
	var n = [e.read_shift(1)];
	if (t == 12) switch (n[0]) {
		case 2:
			n[0] = 4;
			break;
		case 4:
			n[0] = 16;
			break;
		case 0:
			n[0] = 1;
			break;
		case 1: n[0] = 2;
	}
	switch (n[0]) {
		case 4:
			n[1] = ma(e, 1) ? "TRUE" : "FALSE", t != 12 && (e.l += 7);
			break;
		case 37:
		case 16:
			n[1] = ki[e[e.l]], e.l += t == 12 ? 4 : 8;
			break;
		case 0:
			e.l += 8;
			break;
		case 1:
			n[1] = ii(e, 8);
			break;
		case 2:
			n[1] = Sa(e, 0, { biff: t > 0 && t < 8 ? 2 : t });
			break;
		default: throw Error("Bad SerAr: " + n[0]);
	}
	return n;
}
function Ju(e, t, n) {
	for (var r = e.read_shift(n.biff == 12 ? 4 : 2), i = [], a = 0; a != r; ++a) i.push((n.biff == 12 ? ri : La)(e, 8));
	return i;
}
function Yu(e, t, n) {
	var r = 0, i = 0;
	n.biff == 12 ? (r = e.read_shift(4), i = e.read_shift(4)) : (i = 1 + e.read_shift(1), r = 1 + e.read_shift(2)), n.biff >= 2 && n.biff < 8 && (--r, --i == 0 && (i = 256));
	for (var a = 0, o = []; a != r && (o[a] = []); ++a) for (var s = 0; s != i; ++s) o[a][s] = qu(e, n.biff);
	return o;
}
function Xu(e, t, n) {
	var r = e.read_shift(1) >>> 5 & 3, i = !n || n.biff >= 8 ? 4 : 2, a = e.read_shift(i);
	switch (n.biff) {
		case 2:
			e.l += 5;
			break;
		case 3:
		case 4:
			e.l += 8;
			break;
		case 5: e.l += 12;
	}
	return [
		r,
		0,
		a
	];
}
function Zu(e, t, n) {
	return n.biff == 5 ? Qu(e, t, n) : [
		e.read_shift(1) >>> 5 & 3,
		e.read_shift(2),
		e.read_shift(4)
	];
}
function Qu(e) {
	var t = e.read_shift(1) >>> 5 & 3, n = e.read_shift(2, "i");
	e.l += 8;
	var r = e.read_shift(2);
	return e.l += 12, [
		t,
		n,
		r
	];
}
function $u(e, t, n) {
	var r = e.read_shift(1) >>> 5 & 3;
	return e.l += n && n.biff == 2 ? 3 : 4, [r, e.read_shift(n && n.biff == 2 ? 1 : 2)];
}
function ed(e, t, n) {
	return [e.read_shift(1) >>> 5 & 3, e.read_shift(n && n.biff == 2 ? 1 : 2)];
}
function td(e, t, n) {
	var r = e.read_shift(1) >>> 5 & 3;
	return e.l += 4, n.biff < 8 && e.l--, n.biff == 12 && (e.l += 2), [r];
}
function nd(e, t, n) {
	var r = (e[e.l++] & 96) >> 5, i = e.read_shift(2), a = 4;
	if (n) switch (n.biff) {
		case 5:
			a = 15;
			break;
		case 12: a = 6;
	}
	return e.l += a, [r, i];
}
var rd = pr, id = pr, ad = pr;
function od(e, t, n) {
	return e.l += 2, [gu(e, 4, n)];
}
function sd(e) {
	return e.l += 6, [];
}
var cd = od, ld = sd, ud = sd, dd = od;
function fd(e) {
	return e.l += 2, [ha(e), e.read_shift(2) & 1];
}
var pd = od, md = fd, hd = sd, gd = od, _d = od, vd = [
	"Data",
	"All",
	"Headers",
	"??",
	"?Data2",
	"??",
	"?DataHeaders",
	"??",
	"Totals",
	"??",
	"??",
	"??",
	"?DataTotals",
	"??",
	"??",
	"??",
	"?Current"
];
function yd(e) {
	e.l += 2;
	var t = e.read_shift(2), n = e.read_shift(2), r = e.read_shift(4), i = e.read_shift(2), a = e.read_shift(2), o = vd[n >> 2 & 31];
	return {
		ixti: t,
		coltype: n & 3,
		rt: o,
		idx: r,
		c: i,
		C: a
	};
}
function bd(e) {
	return e.l += 2, [e.read_shift(4)];
}
function xd(e, t, n) {
	return e.l += 5, e.l += 2, e.l += n.biff == 2 ? 1 : 4, ["PTGSHEET"];
}
function Sd(e, t, n) {
	return e.l += n.biff == 2 ? 4 : 5, ["PTGENDSHEET"];
}
function Cd(e) {
	return [e.read_shift(1) >>> 5 & 3, e.read_shift(2)];
}
function wd(e) {
	return [e.read_shift(1) >>> 5 & 3, e.read_shift(2)];
}
function Td(e) {
	return e.l += 4, [0, 0];
}
var Ed = {
	1: {
		n: "PtgExp",
		f: Vu
	},
	2: {
		n: "PtgTbl",
		f: ad
	},
	3: {
		n: "PtgAdd",
		f: lu
	},
	4: {
		n: "PtgSub",
		f: lu
	},
	5: {
		n: "PtgMul",
		f: lu
	},
	6: {
		n: "PtgDiv",
		f: lu
	},
	7: {
		n: "PtgPower",
		f: lu
	},
	8: {
		n: "PtgConcat",
		f: lu
	},
	9: {
		n: "PtgLt",
		f: lu
	},
	10: {
		n: "PtgLe",
		f: lu
	},
	11: {
		n: "PtgEq",
		f: lu
	},
	12: {
		n: "PtgGe",
		f: lu
	},
	13: {
		n: "PtgGt",
		f: lu
	},
	14: {
		n: "PtgNe",
		f: lu
	},
	15: {
		n: "PtgIsect",
		f: lu
	},
	16: {
		n: "PtgUnion",
		f: lu
	},
	17: {
		n: "PtgRange",
		f: lu
	},
	18: {
		n: "PtgUplus",
		f: lu
	},
	19: {
		n: "PtgUminus",
		f: lu
	},
	20: {
		n: "PtgPercent",
		f: lu
	},
	21: {
		n: "PtgParen",
		f: lu
	},
	22: {
		n: "PtgMissArg",
		f: lu
	},
	23: {
		n: "PtgStr",
		f: Ku
	},
	26: {
		n: "PtgSheet",
		f: xd
	},
	27: {
		n: "PtgEndSheet",
		f: Sd
	},
	28: {
		n: "PtgErr",
		f: Hu
	},
	29: {
		n: "PtgBool",
		f: Wu
	},
	30: {
		n: "PtgInt",
		f: Uu
	},
	31: {
		n: "PtgNum",
		f: Gu
	},
	32: {
		n: "PtgArray",
		f: wu
	},
	33: {
		n: "PtgFunc",
		f: Lu
	},
	34: {
		n: "PtgFuncVar",
		f: Ru
	},
	35: {
		n: "PtgName",
		f: Xu
	},
	36: {
		n: "PtgRef",
		f: Pu
	},
	37: {
		n: "PtgArea",
		f: yu
	},
	38: {
		n: "PtgMemArea",
		f: $u
	},
	39: {
		n: "PtgMemErr",
		f: rd
	},
	40: {
		n: "PtgMemNoMem",
		f: id
	},
	41: {
		n: "PtgMemFunc",
		f: ed
	},
	42: {
		n: "PtgRefErr",
		f: td
	},
	43: {
		n: "PtgAreaErr",
		f: xu
	},
	44: {
		n: "PtgRefN",
		f: Fu
	},
	45: {
		n: "PtgAreaN",
		f: Cu
	},
	46: {
		n: "PtgMemAreaN",
		f: Cd
	},
	47: {
		n: "PtgMemNoMemN",
		f: wd
	},
	57: {
		n: "PtgNameX",
		f: Zu
	},
	58: {
		n: "PtgRef3d",
		f: Iu
	},
	59: {
		n: "PtgArea3d",
		f: bu
	},
	60: {
		n: "PtgRefErr3d",
		f: nd
	},
	61: {
		n: "PtgAreaErr3d",
		f: Su
	},
	255: {}
}, Dd = {
	64: 32,
	96: 32,
	65: 33,
	97: 33,
	66: 34,
	98: 34,
	67: 35,
	99: 35,
	68: 36,
	100: 36,
	69: 37,
	101: 37,
	70: 38,
	102: 38,
	71: 39,
	103: 39,
	72: 40,
	104: 40,
	73: 41,
	105: 41,
	74: 42,
	106: 42,
	75: 43,
	107: 43,
	76: 44,
	108: 44,
	77: 45,
	109: 45,
	78: 46,
	110: 46,
	79: 47,
	111: 47,
	88: 34,
	120: 34,
	89: 57,
	121: 57,
	90: 58,
	122: 58,
	91: 59,
	123: 59,
	92: 60,
	124: 60,
	93: 61,
	125: 61
}, Od = {
	1: {
		n: "PtgElfLel",
		f: fd
	},
	2: {
		n: "PtgElfRw",
		f: gd
	},
	3: {
		n: "PtgElfCol",
		f: cd
	},
	6: {
		n: "PtgElfRwV",
		f: _d
	},
	7: {
		n: "PtgElfColV",
		f: dd
	},
	10: {
		n: "PtgElfRadical",
		f: pd
	},
	11: {
		n: "PtgElfRadicalS",
		f: hd
	},
	13: {
		n: "PtgElfColS",
		f: ld
	},
	15: {
		n: "PtgElfColSV",
		f: ud
	},
	16: {
		n: "PtgElfRadicalLel",
		f: md
	},
	25: {
		n: "PtgList",
		f: yd
	},
	29: {
		n: "PtgSxName",
		f: bd
	},
	255: {}
}, kd = {
	0: {
		n: "PtgAttrNoop",
		f: Td
	},
	1: {
		n: "PtgAttrSemi",
		f: Au
	},
	2: {
		n: "PtgAttrIf",
		f: Ou
	},
	4: {
		n: "PtgAttrChoose",
		f: Eu
	},
	8: {
		n: "PtgAttrGoto",
		f: Du
	},
	16: {
		n: "PtgAttrSum",
		f: Bu
	},
	32: {
		n: "PtgAttrBaxcel",
		f: Tu
	},
	33: {
		n: "PtgAttrBaxcel",
		f: Tu
	},
	64: {
		n: "PtgAttrSpace",
		f: Mu
	},
	65: {
		n: "PtgAttrSpaceSemi",
		f: Nu
	},
	128: {
		n: "PtgAttrIfError",
		f: ku
	},
	255: {}
};
function Ad(e, t, n, r) {
	if (r.biff < 8) return pr(e, t);
	for (var i = e.l + t, a = [], o = 0; o !== n.length; ++o) switch (n[o][0]) {
		case "PtgArray":
			n[o][1] = Yu(e, 0, r), a.push(n[o][1]);
			break;
		case "PtgMemArea":
			n[o][2] = Ju(e, n[o][1], r), a.push(n[o][2]);
			break;
		case "PtgExp":
			r && r.biff == 12 && (n[o][1][1] = e.read_shift(4), a.push(n[o][1]));
			break;
		case "PtgList":
		case "PtgElfRadicalS":
		case "PtgElfColS":
		case "PtgElfColSV": throw "Unsupported " + n[o][0];
	}
	return t = i - e.l, t !== 0 && a.push(pr(e, t)), a;
}
function jd(e, t, n) {
	for (var r = e.l + t, i, a, o = []; r != e.l;) t = r - e.l, a = e[e.l], i = Ed[a] || Ed[Dd[a]], (a === 24 || a === 25) && (i = (a === 24 ? Od : kd)[e[e.l + 1]]), !i || !i.f ? pr(e, t) : o.push([i.n, i.f(e, t, n)]);
	return o;
}
function Md(e) {
	for (var t = [], n = 0; n < e.length; ++n) {
		for (var r = e[n], i = [], a = 0; a < r.length; ++a) {
			var o = r[a];
			if (o) switch (o[0]) {
				case 2:
					i.push("\"" + o[1].replace(/"/g, "\"\"") + "\"");
					break;
				default: i.push(o[1]);
			}
			else i.push("");
		}
		t.push(i.join(","));
	}
	return t.join(";");
}
var Nd = {
	PtgAdd: "+",
	PtgConcat: "&",
	PtgDiv: "/",
	PtgEq: "=",
	PtgGe: ">=",
	PtgGt: ">",
	PtgLe: "<=",
	PtgLt: "<",
	PtgMul: "*",
	PtgNe: "<>",
	PtgPower: "^",
	PtgSub: "-"
};
function Pd(e, t) {
	var n = e.lastIndexOf("!"), r = t.lastIndexOf("!");
	return n == -1 && r == -1 ? e + ":" + t : n > 0 && r > 0 && e.slice(0, n).toLowerCase() == t.slice(0, r).toLowerCase() ? e + ":" + t.slice(r + 1) : (console.error("Cannot hydrate range", e, t), e + ":" + t);
}
function Fd(e, t, n) {
	if (!e) return "SH33TJSERR0";
	if (n.biff > 8 && (!e.XTI || !e.XTI[t])) return e.SheetNames[t];
	if (!e.XTI) return "SH33TJSERR6";
	var r = e.XTI[t];
	if (n.biff < 8) return t > 1e4 && (t -= 65536), t < 0 && (t = -t), t == 0 ? "" : e.XTI[t - 1];
	if (!r) return "SH33TJSERR1";
	var i = "";
	if (n.biff > 8) switch (e[r[0]][0]) {
		case 357: return i = r[1] == -1 ? "#REF" : e.SheetNames[r[1]], r[1] == r[2] ? i : i + ":" + e.SheetNames[r[2]];
		case 358: return n.SID == null ? "SH33TJSSAME" + e[r[0]][0] : e.SheetNames[n.SID];
		default: return "SH33TJSSRC" + e[r[0]][0];
	}
	switch (e[r[0]][0][0]) {
		case 1025: return i = r[1] == -1 ? "#REF" : e.SheetNames[r[1]] || "SH33TJSERR3", r[1] == r[2] ? i : i + ":" + e.SheetNames[r[2]];
		case 14849: return e[r[0]].slice(1).map(function(e) {
			return e.Name;
		}).join(";;");
		default: return e[r[0]][0][3] ? (i = r[1] == -1 ? "#REF" : e[r[0]][0][3][r[1]] || "SH33TJSERR4", r[1] == r[2] ? i : i + ":" + e[r[0]][0][3][r[2]]) : "SH33TJSERR2";
	}
}
function Id(e, t, n) {
	var r = Fd(e, t, n);
	return r == "#REF" ? r : Nr(r, n);
}
function Ld(e, t, n, r, i) {
	var a = i && i.biff || 8, o = {
		s: {
			c: 0,
			r: 0
		},
		e: {
			c: 0,
			r: 0
		}
	}, s = [], c, l, u, d = 0, f = 0, p, m = "";
	if (!e[0] || !e[0][0]) return "";
	for (var h = -1, g = "", _ = 0, v = e[0].length; _ < v; ++_) {
		var y = e[0][_];
		switch (y[0]) {
			case "PtgUminus":
				s.push("-" + s.pop());
				break;
			case "PtgUplus":
				s.push("+" + s.pop());
				break;
			case "PtgPercent":
				s.push(s.pop() + "%");
				break;
			case "PtgAdd":
			case "PtgConcat":
			case "PtgDiv":
			case "PtgEq":
			case "PtgGe":
			case "PtgGt":
			case "PtgLe":
			case "PtgLt":
			case "PtgMul":
			case "PtgNe":
			case "PtgPower":
			case "PtgSub":
				if (c = s.pop(), l = s.pop(), h >= 0) {
					switch (e[0][h][1][0]) {
						case 0:
							g = xt(" ", e[0][h][1][1]);
							break;
						case 1:
							g = xt("\r", e[0][h][1][1]);
							break;
						default: if (g = "", i.WTF) throw Error("Unexpected PtgAttrSpaceType " + e[0][h][1][0]);
					}
					l += g, h = -1;
				}
				s.push(l + Nd[y[0]] + c);
				break;
			case "PtgIsect":
				c = s.pop(), l = s.pop(), s.push(l + " " + c);
				break;
			case "PtgUnion":
				c = s.pop(), l = s.pop(), s.push(l + "," + c);
				break;
			case "PtgRange":
				c = s.pop(), l = s.pop(), s.push(Pd(l, c));
				break;
			case "PtgAttrChoose": break;
			case "PtgAttrGoto": break;
			case "PtgAttrIf": break;
			case "PtgAttrIfError": break;
			case "PtgRef":
				u = _r(y[1][1], o, i), s.push(yr(u, a));
				break;
			case "PtgRefN":
				u = n ? _r(y[1][1], n, i) : y[1][1], s.push(yr(u, a));
				break;
			case "PtgRef3d":
				d = y[1][1], u = _r(y[1][2], o, i), m = Id(r, d, i), s.push(m + "!" + yr(u, a));
				break;
			case "PtgFunc":
			case "PtgFuncVar":
				var b = y[1][0], x = y[1][1];
				b ||= 0, b &= 127;
				var S = b == 0 ? [] : s.slice(-b);
				s.length -= b, x === "User" && (x = S.shift()), s.push(x + "(" + S.join(",") + ")");
				break;
			case "PtgBool":
				s.push(y[1] ? "TRUE" : "FALSE");
				break;
			case "PtgInt":
				s.push(y[1]);
				break;
			case "PtgNum":
				s.push(String(y[1]));
				break;
			case "PtgStr":
				s.push("\"" + y[1].replace(/"/g, "\"\"") + "\"");
				break;
			case "PtgErr":
				s.push(y[1]);
				break;
			case "PtgAreaN":
				p = vr(y[1][1], n ? { s: n } : o, i), s.push(br(p, i));
				break;
			case "PtgArea":
				p = vr(y[1][1], o, i), s.push(br(p, i));
				break;
			case "PtgArea3d":
				d = y[1][1], p = y[1][2], m = Id(r, d, i), s.push(m + "!" + br(p, i));
				break;
			case "PtgAttrSum":
				s.push("SUM(" + s.pop() + ")");
				break;
			case "PtgAttrBaxcel":
			case "PtgAttrSemi": break;
			case "PtgName":
				f = y[1][2];
				var C = (r.names || [])[f - 1] || (r[0] || [])[f], w = C ? C.Name : "SH33TJSNAME" + String(f);
				w && w.slice(0, 6) == "_xlfn." && !i.xlfn && (w = w.slice(6)), s.push(w);
				break;
			case "PtgNameX":
				var T = y[1][1];
				f = y[1][2];
				var E;
				if (i.biff <= 5) T < 0 && (T = -T), r[T] && (E = r[T][f]);
				else {
					var D = "";
					if (((r[T] || [])[0] || [])[0] == 14849 || (((r[T] || [])[0] || [])[0] == 1025 ? r[T][f] && r[T][f].itab > 0 && (D = r.SheetNames[r[T][f].itab - 1] + "!") : D = r.SheetNames[f - 1] + "!"), r[T] && r[T][f]) D += r[T][f].Name;
					else if (r[0] && r[0][f]) D += r[0][f].Name;
					else {
						var O = (Fd(r, T, i) || "").split(";;");
						O[f - 1] ? D = O[f - 1] : D += "SH33TJSERRX";
					}
					s.push(D);
					break;
				}
				E ||= { Name: "SH33TJSERRY" }, s.push(E.Name);
				break;
			case "PtgParen":
				var k = "(", A = ")";
				if (h >= 0) {
					switch (g = "", e[0][h][1][0]) {
						case 2:
							k = xt(" ", e[0][h][1][1]) + k;
							break;
						case 3:
							k = xt("\r", e[0][h][1][1]) + k;
							break;
						case 4:
							A = xt(" ", e[0][h][1][1]) + A;
							break;
						case 5:
							A = xt("\r", e[0][h][1][1]) + A;
							break;
						default: if (i.WTF) throw Error("Unexpected PtgAttrSpaceType " + e[0][h][1][0]);
					}
					h = -1;
				}
				s.push(k + s.pop() + A);
				break;
			case "PtgRefErr":
				s.push("#REF!");
				break;
			case "PtgRefErr3d":
				s.push("#REF!");
				break;
			case "PtgExp":
				u = {
					c: y[1][1],
					r: y[1][0]
				};
				var j = {
					c: n.c,
					r: n.r
				};
				if (r.sharedf[jr(u)]) {
					var M = r.sharedf[jr(u)];
					s.push(Ld(M, o, j, r, i));
				} else {
					var ee = !1;
					for (c = 0; c != r.arrayf.length; ++c) if (l = r.arrayf[c], !(u.c < l[0].s.c || u.c > l[0].e.c) && !(u.r < l[0].s.r || u.r > l[0].e.r)) {
						s.push(Ld(l[1], o, j, r, i)), ee = !0;
						break;
					}
					ee || s.push(y[1]);
				}
				break;
			case "PtgArray":
				s.push("{" + Md(y[1]) + "}");
				break;
			case "PtgMemArea": break;
			case "PtgAttrSpace":
			case "PtgAttrSpaceSemi":
				h = _;
				break;
			case "PtgTbl": break;
			case "PtgMemErr": break;
			case "PtgMissArg":
				s.push("");
				break;
			case "PtgAreaErr":
				s.push("#REF!");
				break;
			case "PtgAreaErr3d":
				s.push("#REF!");
				break;
			case "PtgList":
				s.push("Table" + y[1].idx + "[#" + y[1].rt + "]");
				break;
			case "PtgMemAreaN":
			case "PtgMemNoMemN":
			case "PtgAttrNoop":
			case "PtgSheet":
			case "PtgEndSheet": break;
			case "PtgMemFunc": break;
			case "PtgMemNoMem": break;
			case "PtgElfCol":
			case "PtgElfColS":
			case "PtgElfColSV":
			case "PtgElfColV":
			case "PtgElfLel":
			case "PtgElfRadical":
			case "PtgElfRadicalLel":
			case "PtgElfRadicalS":
			case "PtgElfRw":
			case "PtgElfRwV": throw Error("Unsupported ELFs");
			case "PtgSxName": throw Error("Unrecognized Formula Token: " + String(y));
			default: throw Error("Unrecognized Formula Token: " + String(y));
		}
		if (i.biff != 3 && h >= 0 && [
			"PtgAttrSpace",
			"PtgAttrSpaceSemi",
			"PtgAttrGoto"
		].indexOf(e[0][_][0]) == -1) {
			y = e[0][h];
			var N = !0;
			switch (y[1][0]) {
				case 4: N = !1;
				case 0:
					g = xt(" ", y[1][1]);
					break;
				case 5: N = !1;
				case 1:
					g = xt("\r", y[1][1]);
					break;
				default: if (g = "", i.WTF) throw Error("Unexpected PtgAttrSpaceType " + y[1][0]);
			}
			s.push((N ? g : "") + s.pop() + (N ? "" : g)), h = -1;
		}
	}
	if (s.length > 1 && i.WTF) throw Error("bad formula stack");
	return s[0] == "TRUE" || s[0] != "FALSE" && s[0];
}
function Rd(e, t, n) {
	var r = e.l + t, i = n.biff == 2 ? 1 : 2, a, o = e.read_shift(i);
	if (o == 65535) return [[], pr(e, t - 2)];
	var s = jd(e, o, n);
	return t !== o + i && (a = Ad(e, t - o - i, s, n)), e.l = r, [s, a];
}
function zd(e, t, n) {
	var r = e.l + t, i = n.biff == 2 ? 1 : 2, a, o = e.read_shift(i);
	if (o == 65535) return [[], pr(e, t - 2)];
	var s = jd(e, o, n);
	return t !== o + i && (a = Ad(e, t - o - i, s, n)), e.l = r, [s, a];
}
function Bd(e, t, n, r) {
	var i = e.l + t, a = jd(e, r, n), o;
	return i !== e.l && (o = Ad(e, i - e.l, a, n)), [a, o];
}
function Vd(e, t, n) {
	var r = e.l + t, i, a = e.read_shift(2), o = jd(e, a, n);
	return a == 65535 ? [[], pr(e, t - 2)] : (t !== a + 2 && (i = Ad(e, r - a - 2, o, n)), [o, i]);
}
function Hd(e) {
	var t;
	if (tr(e, e.l + 6) !== 65535) return [ii(e), "n"];
	switch (e[e.l]) {
		case 0: return e.l += 8, ["String", "s"];
		case 1: return t = e[e.l + 2] === 1, e.l += 8, [t, "b"];
		case 2: return t = e[e.l + 2], e.l += 8, [t, "e"];
		case 3: return e.l += 8, ["", "s"];
	}
	return [];
}
function Ud(e, t, n) {
	var r = e.l + t, i = ja(e, 6, n), a = Hd(e, 8), o = e.read_shift(1);
	n.biff != 2 && (e.read_shift(1), n.biff >= 5 && e.read_shift(4));
	var s = zd(e, r - e.l, n);
	return {
		cell: i,
		val: a[0],
		formula: s,
		shared: o >> 3 & 1,
		tt: a[1]
	};
}
function Wd(e, t, n) {
	var r = jd(e, e.read_shift(4), n), i = e.read_shift(4);
	return [r, i > 0 ? Ad(e, i, r, n) : null];
}
var Gd = Wd, Kd = Wd, qd = Wd, Jd = Wd, Yd = {
	0: "BEEP",
	1: "OPEN",
	2: "OPEN.LINKS",
	3: "CLOSE.ALL",
	4: "SAVE",
	5: "SAVE.AS",
	6: "FILE.DELETE",
	7: "PAGE.SETUP",
	8: "PRINT",
	9: "PRINTER.SETUP",
	10: "QUIT",
	11: "NEW.WINDOW",
	12: "ARRANGE.ALL",
	13: "WINDOW.SIZE",
	14: "WINDOW.MOVE",
	15: "FULL",
	16: "CLOSE",
	17: "RUN",
	22: "SET.PRINT.AREA",
	23: "SET.PRINT.TITLES",
	24: "SET.PAGE.BREAK",
	25: "REMOVE.PAGE.BREAK",
	26: "FONT",
	27: "DISPLAY",
	28: "PROTECT.DOCUMENT",
	29: "PRECISION",
	30: "A1.R1C1",
	31: "CALCULATE.NOW",
	32: "CALCULATION",
	34: "DATA.FIND",
	35: "EXTRACT",
	36: "DATA.DELETE",
	37: "SET.DATABASE",
	38: "SET.CRITERIA",
	39: "SORT",
	40: "DATA.SERIES",
	41: "TABLE",
	42: "FORMAT.NUMBER",
	43: "ALIGNMENT",
	44: "STYLE",
	45: "BORDER",
	46: "CELL.PROTECTION",
	47: "COLUMN.WIDTH",
	48: "UNDO",
	49: "CUT",
	50: "COPY",
	51: "PASTE",
	52: "CLEAR",
	53: "PASTE.SPECIAL",
	54: "EDIT.DELETE",
	55: "INSERT",
	56: "FILL.RIGHT",
	57: "FILL.DOWN",
	61: "DEFINE.NAME",
	62: "CREATE.NAMES",
	63: "FORMULA.GOTO",
	64: "FORMULA.FIND",
	65: "SELECT.LAST.CELL",
	66: "SHOW.ACTIVE.CELL",
	67: "GALLERY.AREA",
	68: "GALLERY.BAR",
	69: "GALLERY.COLUMN",
	70: "GALLERY.LINE",
	71: "GALLERY.PIE",
	72: "GALLERY.SCATTER",
	73: "COMBINATION",
	74: "PREFERRED",
	75: "ADD.OVERLAY",
	76: "GRIDLINES",
	77: "SET.PREFERRED",
	78: "AXES",
	79: "LEGEND",
	80: "ATTACH.TEXT",
	81: "ADD.ARROW",
	82: "SELECT.CHART",
	83: "SELECT.PLOT.AREA",
	84: "PATTERNS",
	85: "MAIN.CHART",
	86: "OVERLAY",
	87: "SCALE",
	88: "FORMAT.LEGEND",
	89: "FORMAT.TEXT",
	90: "EDIT.REPEAT",
	91: "PARSE",
	92: "JUSTIFY",
	93: "HIDE",
	94: "UNHIDE",
	95: "WORKSPACE",
	96: "FORMULA",
	97: "FORMULA.FILL",
	98: "FORMULA.ARRAY",
	99: "DATA.FIND.NEXT",
	100: "DATA.FIND.PREV",
	101: "FORMULA.FIND.NEXT",
	102: "FORMULA.FIND.PREV",
	103: "ACTIVATE",
	104: "ACTIVATE.NEXT",
	105: "ACTIVATE.PREV",
	106: "UNLOCKED.NEXT",
	107: "UNLOCKED.PREV",
	108: "COPY.PICTURE",
	109: "SELECT",
	110: "DELETE.NAME",
	111: "DELETE.FORMAT",
	112: "VLINE",
	113: "HLINE",
	114: "VPAGE",
	115: "HPAGE",
	116: "VSCROLL",
	117: "HSCROLL",
	118: "ALERT",
	119: "NEW",
	120: "CANCEL.COPY",
	121: "SHOW.CLIPBOARD",
	122: "MESSAGE",
	124: "PASTE.LINK",
	125: "APP.ACTIVATE",
	126: "DELETE.ARROW",
	127: "ROW.HEIGHT",
	128: "FORMAT.MOVE",
	129: "FORMAT.SIZE",
	130: "FORMULA.REPLACE",
	131: "SEND.KEYS",
	132: "SELECT.SPECIAL",
	133: "APPLY.NAMES",
	134: "REPLACE.FONT",
	135: "FREEZE.PANES",
	136: "SHOW.INFO",
	137: "SPLIT",
	138: "ON.WINDOW",
	139: "ON.DATA",
	140: "DISABLE.INPUT",
	142: "OUTLINE",
	143: "LIST.NAMES",
	144: "FILE.CLOSE",
	145: "SAVE.WORKBOOK",
	146: "DATA.FORM",
	147: "COPY.CHART",
	148: "ON.TIME",
	149: "WAIT",
	150: "FORMAT.FONT",
	151: "FILL.UP",
	152: "FILL.LEFT",
	153: "DELETE.OVERLAY",
	155: "SHORT.MENUS",
	159: "SET.UPDATE.STATUS",
	161: "COLOR.PALETTE",
	162: "DELETE.STYLE",
	163: "WINDOW.RESTORE",
	164: "WINDOW.MAXIMIZE",
	166: "CHANGE.LINK",
	167: "CALCULATE.DOCUMENT",
	168: "ON.KEY",
	169: "APP.RESTORE",
	170: "APP.MOVE",
	171: "APP.SIZE",
	172: "APP.MINIMIZE",
	173: "APP.MAXIMIZE",
	174: "BRING.TO.FRONT",
	175: "SEND.TO.BACK",
	185: "MAIN.CHART.TYPE",
	186: "OVERLAY.CHART.TYPE",
	187: "SELECT.END",
	188: "OPEN.MAIL",
	189: "SEND.MAIL",
	190: "STANDARD.FONT",
	191: "CONSOLIDATE",
	192: "SORT.SPECIAL",
	193: "GALLERY.3D.AREA",
	194: "GALLERY.3D.COLUMN",
	195: "GALLERY.3D.LINE",
	196: "GALLERY.3D.PIE",
	197: "VIEW.3D",
	198: "GOAL.SEEK",
	199: "WORKGROUP",
	200: "FILL.GROUP",
	201: "UPDATE.LINK",
	202: "PROMOTE",
	203: "DEMOTE",
	204: "SHOW.DETAIL",
	206: "UNGROUP",
	207: "OBJECT.PROPERTIES",
	208: "SAVE.NEW.OBJECT",
	209: "SHARE",
	210: "SHARE.NAME",
	211: "DUPLICATE",
	212: "APPLY.STYLE",
	213: "ASSIGN.TO.OBJECT",
	214: "OBJECT.PROTECTION",
	215: "HIDE.OBJECT",
	216: "SET.EXTRACT",
	217: "CREATE.PUBLISHER",
	218: "SUBSCRIBE.TO",
	219: "ATTRIBUTES",
	220: "SHOW.TOOLBAR",
	222: "PRINT.PREVIEW",
	223: "EDIT.COLOR",
	224: "SHOW.LEVELS",
	225: "FORMAT.MAIN",
	226: "FORMAT.OVERLAY",
	227: "ON.RECALC",
	228: "EDIT.SERIES",
	229: "DEFINE.STYLE",
	240: "LINE.PRINT",
	243: "ENTER.DATA",
	249: "GALLERY.RADAR",
	250: "MERGE.STYLES",
	251: "EDITION.OPTIONS",
	252: "PASTE.PICTURE",
	253: "PASTE.PICTURE.LINK",
	254: "SPELLING",
	256: "ZOOM",
	259: "INSERT.OBJECT",
	260: "WINDOW.MINIMIZE",
	265: "SOUND.NOTE",
	266: "SOUND.PLAY",
	267: "FORMAT.SHAPE",
	268: "EXTEND.POLYGON",
	269: "FORMAT.AUTO",
	272: "GALLERY.3D.BAR",
	273: "GALLERY.3D.SURFACE",
	274: "FILL.AUTO",
	276: "CUSTOMIZE.TOOLBAR",
	277: "ADD.TOOL",
	278: "EDIT.OBJECT",
	279: "ON.DOUBLECLICK",
	280: "ON.ENTRY",
	281: "WORKBOOK.ADD",
	282: "WORKBOOK.MOVE",
	283: "WORKBOOK.COPY",
	284: "WORKBOOK.OPTIONS",
	285: "SAVE.WORKSPACE",
	288: "CHART.WIZARD",
	289: "DELETE.TOOL",
	290: "MOVE.TOOL",
	291: "WORKBOOK.SELECT",
	292: "WORKBOOK.ACTIVATE",
	293: "ASSIGN.TO.TOOL",
	295: "COPY.TOOL",
	296: "RESET.TOOL",
	297: "CONSTRAIN.NUMERIC",
	298: "PASTE.TOOL",
	302: "WORKBOOK.NEW",
	305: "SCENARIO.CELLS",
	306: "SCENARIO.DELETE",
	307: "SCENARIO.ADD",
	308: "SCENARIO.EDIT",
	309: "SCENARIO.SHOW",
	310: "SCENARIO.SHOW.NEXT",
	311: "SCENARIO.SUMMARY",
	312: "PIVOT.TABLE.WIZARD",
	313: "PIVOT.FIELD.PROPERTIES",
	314: "PIVOT.FIELD",
	315: "PIVOT.ITEM",
	316: "PIVOT.ADD.FIELDS",
	318: "OPTIONS.CALCULATION",
	319: "OPTIONS.EDIT",
	320: "OPTIONS.VIEW",
	321: "ADDIN.MANAGER",
	322: "MENU.EDITOR",
	323: "ATTACH.TOOLBARS",
	324: "VBAActivate",
	325: "OPTIONS.CHART",
	328: "VBA.INSERT.FILE",
	330: "VBA.PROCEDURE.DEFINITION",
	336: "ROUTING.SLIP",
	338: "ROUTE.DOCUMENT",
	339: "MAIL.LOGON",
	342: "INSERT.PICTURE",
	343: "EDIT.TOOL",
	344: "GALLERY.DOUGHNUT",
	350: "CHART.TREND",
	352: "PIVOT.ITEM.PROPERTIES",
	354: "WORKBOOK.INSERT",
	355: "OPTIONS.TRANSITION",
	356: "OPTIONS.GENERAL",
	370: "FILTER.ADVANCED",
	373: "MAIL.ADD.MAILER",
	374: "MAIL.DELETE.MAILER",
	375: "MAIL.REPLY",
	376: "MAIL.REPLY.ALL",
	377: "MAIL.FORWARD",
	378: "MAIL.NEXT.LETTER",
	379: "DATA.LABEL",
	380: "INSERT.TITLE",
	381: "FONT.PROPERTIES",
	382: "MACRO.OPTIONS",
	383: "WORKBOOK.HIDE",
	384: "WORKBOOK.UNHIDE",
	385: "WORKBOOK.DELETE",
	386: "WORKBOOK.NAME",
	388: "GALLERY.CUSTOM",
	390: "ADD.CHART.AUTOFORMAT",
	391: "DELETE.CHART.AUTOFORMAT",
	392: "CHART.ADD.DATA",
	393: "AUTO.OUTLINE",
	394: "TAB.ORDER",
	395: "SHOW.DIALOG",
	396: "SELECT.ALL",
	397: "UNGROUP.SHEETS",
	398: "SUBTOTAL.CREATE",
	399: "SUBTOTAL.REMOVE",
	400: "RENAME.OBJECT",
	412: "WORKBOOK.SCROLL",
	413: "WORKBOOK.NEXT",
	414: "WORKBOOK.PREV",
	415: "WORKBOOK.TAB.SPLIT",
	416: "FULL.SCREEN",
	417: "WORKBOOK.PROTECT",
	420: "SCROLLBAR.PROPERTIES",
	421: "PIVOT.SHOW.PAGES",
	422: "TEXT.TO.COLUMNS",
	423: "FORMAT.CHARTTYPE",
	424: "LINK.FORMAT",
	425: "TRACER.DISPLAY",
	430: "TRACER.NAVIGATE",
	431: "TRACER.CLEAR",
	432: "TRACER.ERROR",
	433: "PIVOT.FIELD.GROUP",
	434: "PIVOT.FIELD.UNGROUP",
	435: "CHECKBOX.PROPERTIES",
	436: "LABEL.PROPERTIES",
	437: "LISTBOX.PROPERTIES",
	438: "EDITBOX.PROPERTIES",
	439: "PIVOT.REFRESH",
	440: "LINK.COMBO",
	441: "OPEN.TEXT",
	442: "HIDE.DIALOG",
	443: "SET.DIALOG.FOCUS",
	444: "ENABLE.OBJECT",
	445: "PUSHBUTTON.PROPERTIES",
	446: "SET.DIALOG.DEFAULT",
	447: "FILTER",
	448: "FILTER.SHOW.ALL",
	449: "CLEAR.OUTLINE",
	450: "FUNCTION.WIZARD",
	451: "ADD.LIST.ITEM",
	452: "SET.LIST.ITEM",
	453: "REMOVE.LIST.ITEM",
	454: "SELECT.LIST.ITEM",
	455: "SET.CONTROL.VALUE",
	456: "SAVE.COPY.AS",
	458: "OPTIONS.LISTS.ADD",
	459: "OPTIONS.LISTS.DELETE",
	460: "SERIES.AXES",
	461: "SERIES.X",
	462: "SERIES.Y",
	463: "ERRORBAR.X",
	464: "ERRORBAR.Y",
	465: "FORMAT.CHART",
	466: "SERIES.ORDER",
	467: "MAIL.LOGOFF",
	468: "CLEAR.ROUTING.SLIP",
	469: "APP.ACTIVATE.MICROSOFT",
	470: "MAIL.EDIT.MAILER",
	471: "ON.SHEET",
	472: "STANDARD.WIDTH",
	473: "SCENARIO.MERGE",
	474: "SUMMARY.INFO",
	475: "FIND.FILE",
	476: "ACTIVE.CELL.FONT",
	477: "ENABLE.TIPWIZARD",
	478: "VBA.MAKE.ADDIN",
	480: "INSERTDATATABLE",
	481: "WORKGROUP.OPTIONS",
	482: "MAIL.SEND.MAILER",
	485: "AUTOCORRECT",
	489: "POST.DOCUMENT",
	491: "PICKLIST",
	493: "VIEW.SHOW",
	494: "VIEW.DEFINE",
	495: "VIEW.DELETE",
	509: "SHEET.BACKGROUND",
	510: "INSERT.MAP.OBJECT",
	511: "OPTIONS.MENONO",
	517: "MSOCHECKS",
	518: "NORMAL",
	519: "LAYOUT",
	520: "RM.PRINT.AREA",
	521: "CLEAR.PRINT.AREA",
	522: "ADD.PRINT.AREA",
	523: "MOVE.BRK",
	545: "HIDECURR.NOTE",
	546: "HIDEALL.NOTES",
	547: "DELETE.NOTE",
	548: "TRAVERSE.NOTES",
	549: "ACTIVATE.NOTES",
	620: "PROTECT.REVISIONS",
	621: "UNPROTECT.REVISIONS",
	647: "OPTIONS.ME",
	653: "WEB.PUBLISH",
	667: "NEWWEBQUERY",
	673: "PIVOT.TABLE.CHART",
	753: "OPTIONS.SAVE",
	755: "OPTIONS.SPELL",
	808: "HIDEALL.INKANNOTS"
}, Xd = {
	0: "COUNT",
	1: "IF",
	2: "ISNA",
	3: "ISERROR",
	4: "SUM",
	5: "AVERAGE",
	6: "MIN",
	7: "MAX",
	8: "ROW",
	9: "COLUMN",
	10: "NA",
	11: "NPV",
	12: "STDEV",
	13: "DOLLAR",
	14: "FIXED",
	15: "SIN",
	16: "COS",
	17: "TAN",
	18: "ATAN",
	19: "PI",
	20: "SQRT",
	21: "EXP",
	22: "LN",
	23: "LOG10",
	24: "ABS",
	25: "INT",
	26: "SIGN",
	27: "ROUND",
	28: "LOOKUP",
	29: "INDEX",
	30: "REPT",
	31: "MID",
	32: "LEN",
	33: "VALUE",
	34: "TRUE",
	35: "FALSE",
	36: "AND",
	37: "OR",
	38: "NOT",
	39: "MOD",
	40: "DCOUNT",
	41: "DSUM",
	42: "DAVERAGE",
	43: "DMIN",
	44: "DMAX",
	45: "DSTDEV",
	46: "VAR",
	47: "DVAR",
	48: "TEXT",
	49: "LINEST",
	50: "TREND",
	51: "LOGEST",
	52: "GROWTH",
	53: "GOTO",
	54: "HALT",
	55: "RETURN",
	56: "PV",
	57: "FV",
	58: "NPER",
	59: "PMT",
	60: "RATE",
	61: "MIRR",
	62: "IRR",
	63: "RAND",
	64: "MATCH",
	65: "DATE",
	66: "TIME",
	67: "DAY",
	68: "MONTH",
	69: "YEAR",
	70: "WEEKDAY",
	71: "HOUR",
	72: "MINUTE",
	73: "SECOND",
	74: "NOW",
	75: "AREAS",
	76: "ROWS",
	77: "COLUMNS",
	78: "OFFSET",
	79: "ABSREF",
	80: "RELREF",
	81: "ARGUMENT",
	82: "SEARCH",
	83: "TRANSPOSE",
	84: "ERROR",
	85: "STEP",
	86: "TYPE",
	87: "ECHO",
	88: "SET.NAME",
	89: "CALLER",
	90: "DEREF",
	91: "WINDOWS",
	92: "SERIES",
	93: "DOCUMENTS",
	94: "ACTIVE.CELL",
	95: "SELECTION",
	96: "RESULT",
	97: "ATAN2",
	98: "ASIN",
	99: "ACOS",
	100: "CHOOSE",
	101: "HLOOKUP",
	102: "VLOOKUP",
	103: "LINKS",
	104: "INPUT",
	105: "ISREF",
	106: "GET.FORMULA",
	107: "GET.NAME",
	108: "SET.VALUE",
	109: "LOG",
	110: "EXEC",
	111: "CHAR",
	112: "LOWER",
	113: "UPPER",
	114: "PROPER",
	115: "LEFT",
	116: "RIGHT",
	117: "EXACT",
	118: "TRIM",
	119: "REPLACE",
	120: "SUBSTITUTE",
	121: "CODE",
	122: "NAMES",
	123: "DIRECTORY",
	124: "FIND",
	125: "CELL",
	126: "ISERR",
	127: "ISTEXT",
	128: "ISNUMBER",
	129: "ISBLANK",
	130: "T",
	131: "N",
	132: "FOPEN",
	133: "FCLOSE",
	134: "FSIZE",
	135: "FREADLN",
	136: "FREAD",
	137: "FWRITELN",
	138: "FWRITE",
	139: "FPOS",
	140: "DATEVALUE",
	141: "TIMEVALUE",
	142: "SLN",
	143: "SYD",
	144: "DDB",
	145: "GET.DEF",
	146: "REFTEXT",
	147: "TEXTREF",
	148: "INDIRECT",
	149: "REGISTER",
	150: "CALL",
	151: "ADD.BAR",
	152: "ADD.MENU",
	153: "ADD.COMMAND",
	154: "ENABLE.COMMAND",
	155: "CHECK.COMMAND",
	156: "RENAME.COMMAND",
	157: "SHOW.BAR",
	158: "DELETE.MENU",
	159: "DELETE.COMMAND",
	160: "GET.CHART.ITEM",
	161: "DIALOG.BOX",
	162: "CLEAN",
	163: "MDETERM",
	164: "MINVERSE",
	165: "MMULT",
	166: "FILES",
	167: "IPMT",
	168: "PPMT",
	169: "COUNTA",
	170: "CANCEL.KEY",
	171: "FOR",
	172: "WHILE",
	173: "BREAK",
	174: "NEXT",
	175: "INITIATE",
	176: "REQUEST",
	177: "POKE",
	178: "EXECUTE",
	179: "TERMINATE",
	180: "RESTART",
	181: "HELP",
	182: "GET.BAR",
	183: "PRODUCT",
	184: "FACT",
	185: "GET.CELL",
	186: "GET.WORKSPACE",
	187: "GET.WINDOW",
	188: "GET.DOCUMENT",
	189: "DPRODUCT",
	190: "ISNONTEXT",
	191: "GET.NOTE",
	192: "NOTE",
	193: "STDEVP",
	194: "VARP",
	195: "DSTDEVP",
	196: "DVARP",
	197: "TRUNC",
	198: "ISLOGICAL",
	199: "DCOUNTA",
	200: "DELETE.BAR",
	201: "UNREGISTER",
	204: "USDOLLAR",
	205: "FINDB",
	206: "SEARCHB",
	207: "REPLACEB",
	208: "LEFTB",
	209: "RIGHTB",
	210: "MIDB",
	211: "LENB",
	212: "ROUNDUP",
	213: "ROUNDDOWN",
	214: "ASC",
	215: "DBCS",
	216: "RANK",
	219: "ADDRESS",
	220: "DAYS360",
	221: "TODAY",
	222: "VDB",
	223: "ELSE",
	224: "ELSE.IF",
	225: "END.IF",
	226: "FOR.CELL",
	227: "MEDIAN",
	228: "SUMPRODUCT",
	229: "SINH",
	230: "COSH",
	231: "TANH",
	232: "ASINH",
	233: "ACOSH",
	234: "ATANH",
	235: "DGET",
	236: "CREATE.OBJECT",
	237: "VOLATILE",
	238: "LAST.ERROR",
	239: "CUSTOM.UNDO",
	240: "CUSTOM.REPEAT",
	241: "FORMULA.CONVERT",
	242: "GET.LINK.INFO",
	243: "TEXT.BOX",
	244: "INFO",
	245: "GROUP",
	246: "GET.OBJECT",
	247: "DB",
	248: "PAUSE",
	251: "RESUME",
	252: "FREQUENCY",
	253: "ADD.TOOLBAR",
	254: "DELETE.TOOLBAR",
	255: "User",
	256: "RESET.TOOLBAR",
	257: "EVALUATE",
	258: "GET.TOOLBAR",
	259: "GET.TOOL",
	260: "SPELLING.CHECK",
	261: "ERROR.TYPE",
	262: "APP.TITLE",
	263: "WINDOW.TITLE",
	264: "SAVE.TOOLBAR",
	265: "ENABLE.TOOL",
	266: "PRESS.TOOL",
	267: "REGISTER.ID",
	268: "GET.WORKBOOK",
	269: "AVEDEV",
	270: "BETADIST",
	271: "GAMMALN",
	272: "BETAINV",
	273: "BINOMDIST",
	274: "CHIDIST",
	275: "CHIINV",
	276: "COMBIN",
	277: "CONFIDENCE",
	278: "CRITBINOM",
	279: "EVEN",
	280: "EXPONDIST",
	281: "FDIST",
	282: "FINV",
	283: "FISHER",
	284: "FISHERINV",
	285: "FLOOR",
	286: "GAMMADIST",
	287: "GAMMAINV",
	288: "CEILING",
	289: "HYPGEOMDIST",
	290: "LOGNORMDIST",
	291: "LOGINV",
	292: "NEGBINOMDIST",
	293: "NORMDIST",
	294: "NORMSDIST",
	295: "NORMINV",
	296: "NORMSINV",
	297: "STANDARDIZE",
	298: "ODD",
	299: "PERMUT",
	300: "POISSON",
	301: "TDIST",
	302: "WEIBULL",
	303: "SUMXMY2",
	304: "SUMX2MY2",
	305: "SUMX2PY2",
	306: "CHITEST",
	307: "CORREL",
	308: "COVAR",
	309: "FORECAST",
	310: "FTEST",
	311: "INTERCEPT",
	312: "PEARSON",
	313: "RSQ",
	314: "STEYX",
	315: "SLOPE",
	316: "TTEST",
	317: "PROB",
	318: "DEVSQ",
	319: "GEOMEAN",
	320: "HARMEAN",
	321: "SUMSQ",
	322: "KURT",
	323: "SKEW",
	324: "ZTEST",
	325: "LARGE",
	326: "SMALL",
	327: "QUARTILE",
	328: "PERCENTILE",
	329: "PERCENTRANK",
	330: "MODE",
	331: "TRIMMEAN",
	332: "TINV",
	334: "MOVIE.COMMAND",
	335: "GET.MOVIE",
	336: "CONCATENATE",
	337: "POWER",
	338: "PIVOT.ADD.DATA",
	339: "GET.PIVOT.TABLE",
	340: "GET.PIVOT.FIELD",
	341: "GET.PIVOT.ITEM",
	342: "RADIANS",
	343: "DEGREES",
	344: "SUBTOTAL",
	345: "SUMIF",
	346: "COUNTIF",
	347: "COUNTBLANK",
	348: "SCENARIO.GET",
	349: "OPTIONS.LISTS.GET",
	350: "ISPMT",
	351: "DATEDIF",
	352: "DATESTRING",
	353: "NUMBERSTRING",
	354: "ROMAN",
	355: "OPEN.DIALOG",
	356: "SAVE.DIALOG",
	357: "VIEW.GET",
	358: "GETPIVOTDATA",
	359: "HYPERLINK",
	360: "PHONETIC",
	361: "AVERAGEA",
	362: "MAXA",
	363: "MINA",
	364: "STDEVPA",
	365: "VARPA",
	366: "STDEVA",
	367: "VARA",
	368: "BAHTTEXT",
	369: "THAIDAYOFWEEK",
	370: "THAIDIGIT",
	371: "THAIMONTHOFYEAR",
	372: "THAINUMSOUND",
	373: "THAINUMSTRING",
	374: "THAISTRINGLENGTH",
	375: "ISTHAIDIGIT",
	376: "ROUNDBAHTDOWN",
	377: "ROUNDBAHTUP",
	378: "THAIYEAR",
	379: "RTD",
	380: "CUBEVALUE",
	381: "CUBEMEMBER",
	382: "CUBEMEMBERPROPERTY",
	383: "CUBERANKEDMEMBER",
	384: "HEX2BIN",
	385: "HEX2DEC",
	386: "HEX2OCT",
	387: "DEC2BIN",
	388: "DEC2HEX",
	389: "DEC2OCT",
	390: "OCT2BIN",
	391: "OCT2HEX",
	392: "OCT2DEC",
	393: "BIN2DEC",
	394: "BIN2OCT",
	395: "BIN2HEX",
	396: "IMSUB",
	397: "IMDIV",
	398: "IMPOWER",
	399: "IMABS",
	400: "IMSQRT",
	401: "IMLN",
	402: "IMLOG2",
	403: "IMLOG10",
	404: "IMSIN",
	405: "IMCOS",
	406: "IMEXP",
	407: "IMARGUMENT",
	408: "IMCONJUGATE",
	409: "IMAGINARY",
	410: "IMREAL",
	411: "COMPLEX",
	412: "IMSUM",
	413: "IMPRODUCT",
	414: "SERIESSUM",
	415: "FACTDOUBLE",
	416: "SQRTPI",
	417: "QUOTIENT",
	418: "DELTA",
	419: "GESTEP",
	420: "ISEVEN",
	421: "ISODD",
	422: "MROUND",
	423: "ERF",
	424: "ERFC",
	425: "BESSELJ",
	426: "BESSELK",
	427: "BESSELY",
	428: "BESSELI",
	429: "XIRR",
	430: "XNPV",
	431: "PRICEMAT",
	432: "YIELDMAT",
	433: "INTRATE",
	434: "RECEIVED",
	435: "DISC",
	436: "PRICEDISC",
	437: "YIELDDISC",
	438: "TBILLEQ",
	439: "TBILLPRICE",
	440: "TBILLYIELD",
	441: "PRICE",
	442: "YIELD",
	443: "DOLLARDE",
	444: "DOLLARFR",
	445: "NOMINAL",
	446: "EFFECT",
	447: "CUMPRINC",
	448: "CUMIPMT",
	449: "EDATE",
	450: "EOMONTH",
	451: "YEARFRAC",
	452: "COUPDAYBS",
	453: "COUPDAYS",
	454: "COUPDAYSNC",
	455: "COUPNCD",
	456: "COUPNUM",
	457: "COUPPCD",
	458: "DURATION",
	459: "MDURATION",
	460: "ODDLPRICE",
	461: "ODDLYIELD",
	462: "ODDFPRICE",
	463: "ODDFYIELD",
	464: "RANDBETWEEN",
	465: "WEEKNUM",
	466: "AMORDEGRC",
	467: "AMORLINC",
	468: "CONVERT",
	724: "SHEETJS",
	469: "ACCRINT",
	470: "ACCRINTM",
	471: "WORKDAY",
	472: "NETWORKDAYS",
	473: "GCD",
	474: "MULTINOMIAL",
	475: "LCM",
	476: "FVSCHEDULE",
	477: "CUBEKPIMEMBER",
	478: "CUBESET",
	479: "CUBESETCOUNT",
	480: "IFERROR",
	481: "COUNTIFS",
	482: "SUMIFS",
	483: "AVERAGEIF",
	484: "AVERAGEIFS"
}, Zd = {
	2: 1,
	3: 1,
	10: 0,
	15: 1,
	16: 1,
	17: 1,
	18: 1,
	19: 0,
	20: 1,
	21: 1,
	22: 1,
	23: 1,
	24: 1,
	25: 1,
	26: 1,
	27: 2,
	30: 2,
	31: 3,
	32: 1,
	33: 1,
	34: 0,
	35: 0,
	38: 1,
	39: 2,
	40: 3,
	41: 3,
	42: 3,
	43: 3,
	44: 3,
	45: 3,
	47: 3,
	48: 2,
	53: 1,
	61: 3,
	63: 0,
	65: 3,
	66: 3,
	67: 1,
	68: 1,
	69: 1,
	70: 1,
	71: 1,
	72: 1,
	73: 1,
	74: 0,
	75: 1,
	76: 1,
	77: 1,
	79: 2,
	80: 2,
	83: 1,
	85: 0,
	86: 1,
	89: 0,
	90: 1,
	94: 0,
	95: 0,
	97: 2,
	98: 1,
	99: 1,
	101: 3,
	102: 3,
	105: 1,
	106: 1,
	108: 2,
	111: 1,
	112: 1,
	113: 1,
	114: 1,
	117: 2,
	118: 1,
	119: 4,
	121: 1,
	126: 1,
	127: 1,
	128: 1,
	129: 1,
	130: 1,
	131: 1,
	133: 1,
	134: 1,
	135: 1,
	136: 2,
	137: 2,
	138: 2,
	140: 1,
	141: 1,
	142: 3,
	143: 4,
	144: 4,
	161: 1,
	162: 1,
	163: 1,
	164: 1,
	165: 2,
	172: 1,
	175: 2,
	176: 2,
	177: 3,
	178: 2,
	179: 1,
	184: 1,
	186: 1,
	189: 3,
	190: 1,
	195: 3,
	196: 3,
	197: 1,
	198: 1,
	199: 3,
	201: 1,
	207: 4,
	210: 3,
	211: 1,
	212: 2,
	213: 2,
	214: 1,
	215: 1,
	225: 0,
	229: 1,
	230: 1,
	231: 1,
	232: 1,
	233: 1,
	234: 1,
	235: 3,
	244: 1,
	247: 4,
	252: 2,
	257: 1,
	261: 1,
	271: 1,
	273: 4,
	274: 2,
	275: 2,
	276: 2,
	277: 3,
	278: 3,
	279: 1,
	280: 3,
	281: 3,
	282: 3,
	283: 1,
	284: 1,
	285: 2,
	286: 4,
	287: 3,
	288: 2,
	289: 4,
	290: 3,
	291: 3,
	292: 3,
	293: 4,
	294: 1,
	295: 3,
	296: 1,
	297: 3,
	298: 1,
	299: 2,
	300: 3,
	301: 3,
	302: 4,
	303: 2,
	304: 2,
	305: 2,
	306: 2,
	307: 2,
	308: 2,
	309: 3,
	310: 2,
	311: 2,
	312: 2,
	313: 2,
	314: 2,
	315: 2,
	316: 4,
	325: 2,
	326: 2,
	327: 2,
	328: 2,
	331: 2,
	332: 2,
	337: 2,
	342: 1,
	343: 1,
	346: 2,
	347: 1,
	350: 4,
	351: 3,
	352: 1,
	353: 2,
	360: 1,
	368: 1,
	369: 1,
	370: 1,
	371: 1,
	372: 1,
	373: 1,
	374: 1,
	375: 1,
	376: 1,
	377: 1,
	378: 1,
	382: 3,
	385: 1,
	392: 1,
	393: 1,
	396: 2,
	397: 2,
	398: 2,
	399: 1,
	400: 1,
	401: 1,
	402: 1,
	403: 1,
	404: 1,
	405: 1,
	406: 1,
	407: 1,
	408: 1,
	409: 1,
	410: 1,
	414: 4,
	415: 1,
	416: 1,
	417: 2,
	420: 1,
	421: 1,
	422: 2,
	424: 1,
	425: 2,
	426: 2,
	427: 2,
	428: 2,
	430: 3,
	438: 3,
	439: 3,
	440: 3,
	443: 2,
	444: 2,
	445: 2,
	446: 2,
	447: 6,
	448: 6,
	449: 2,
	450: 2,
	464: 2,
	468: 3,
	476: 2,
	479: 1,
	480: 2,
	65535: 0
};
function Qd(e) {
	return e.slice(0, 3) == "of:" && (e = e.slice(3)), e.charCodeAt(0) == 61 && (e = e.slice(1), e.charCodeAt(0) == 61 && (e = e.slice(1))), e = e.replace(/COM\.MICROSOFT\./g, ""), e = e.replace(/\[((?:\.[A-Z]+[0-9]+)(?::\.[A-Z]+[0-9]+)?)\]/g, function(e, t) {
		return t.replace(/\./g, "");
	}), e = e.replace(/\$'([^']|'')+'/g, function(e) {
		return e.slice(1);
	}), e = e.replace(/\$([^\]\. #$]+)/g, function(e, t) {
		return t.match(/^([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])?(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})?$/) ? e : t;
	}), e = e.replace(/\[.(#[A-Z]*[?!])\]/g, "$1"), e.replace(/[;~]/g, ",").replace(/\|/g, ";");
}
function $d(e) {
	e = e.replace(/\$'([^']|'')+'/g, function(e) {
		return e.slice(1);
	}), e = e.replace(/\$([^\]\. #$]+)/g, function(e, t) {
		return t.match(/^([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])?(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})?$/) ? e : t;
	});
	var t = e.split(":");
	return [t[0].split(".")[0], t[0].split(".")[1] + (t.length > 1 ? ":" + (t[1].split(".")[1] || t[1].split(".")[0]) : "")];
}
var ef = {}, tf = {};
function nf(e, t) {
	if (e) {
		var n = [
			.7,
			.7,
			.75,
			.75,
			.3,
			.3
		];
		t == "xlml" && (n = [
			1,
			1,
			1,
			1,
			.5,
			.5
		]), e.left ??= n[0], e.right ??= n[1], e.top ??= n[2], e.bottom ??= n[3], e.header ??= n[4], e.footer ??= n[5];
	}
}
function rf(e, t) {
	return t && st(t).forEach(function(n) {
		e[n] = bt(t[n]);
	}), e;
}
function af(e, t) {
	return t && (t.patternType != null && (e.patternType = t.patternType), t.fgColor != null && (e.fgColor = bt(t.fgColor)), t.bgColor != null && (e.bgColor = bt(t.bgColor)), t.gradientFill != null && (e.gradientFill = bt(t.gradientFill))), e;
}
function of(e, t, n, r) {
	if (!e || !t) return null;
	var i = {};
	t.xfId != null && e.CellStyleXf && e.CellStyleXf[t.xfId] && rf(i, e.CellStyleXf[t.xfId]), rf(i, t);
	var a = {
		id: r,
		xf: bt(i)
	};
	return i.numFmtId != null && (a.numFmtId = i.numFmtId, e.NumberFmt && e.NumberFmt[i.numFmtId] != null && (a.numFmt = e.NumberFmt[i.numFmtId])), i.fontId != null && e.Fonts && e.Fonts[i.fontId] && (a.font = sc(e.Fonts[i.fontId], n)), i.fillId != null && e.Fills && e.Fills[i.fillId] && (a.fill = sc(e.Fills[i.fillId], n), af(a, a.fill)), i.borderId != null && e.Borders && e.Borders[i.borderId] && (a.border = sc(e.Borders[i.borderId], n)), i.alignment && (a.alignment = bt(i.alignment)), i.protection && (a.protection = bt(i.protection)), a;
}
function sf(e, t, n, r, i, a, o, s, c) {
	try {
		r.cellNF && (e.z = W[t]);
	} catch (e) {
		if (r.WTF) throw e;
	}
	if (e.t !== "z" || r.cellStyles) {
		if (e.t === "d" && typeof e.v == "string" && (e.v = vt(e.v)), (!r || r.cellText !== !1) && e.t !== "z") try {
			if (W[t] ?? nt(Ze[t] || "General", t), e.t === "e") e.w = e.w || ki[e.v];
			else if (t === 0) {
				if (e.t === "n") e.w = (e.v | 0) === e.v ? e.v.toString(10) : ge(e.v);
				else if (e.t === "d") {
					var l = ft(e.v, !!o);
					e.w = (l | 0) === l ? l.toString(10) : ge(l);
				} else if (e.v === void 0) return "";
				else e.w = _e(e.v, tf);
			} else e.w = e.t === "d" ? Je(t, ft(e.v, !!o), tf) : Je(t, e.v, tf);
		} catch (e) {
			if (r.WTF) throw e;
		}
		if (r.cellStyles) {
			if (s != null) try {
				var u = of(a, s, i, c);
				if (u) {
					e.s = u;
					return;
				}
			} catch (e) {
				if (r.WTF) throw e;
			}
			if (n != null) try {
				e.s = sc(a.Fills[n], i);
			} catch (e) {
				if (r.WTF && a.Fills) throw e;
			}
		}
	}
}
function cf(e, t) {
	return !(e.e.r < t.s.r || t.e.r < e.s.r || e.e.c < t.s.c || t.e.c < e.s.c);
}
function lf(e, t) {
	for (var n = e && e["!merges"] || [], r = [], i = e && e["!ref"] ? Pr(e["!ref"]) : null, a = {}, o = 0; o < n.length; ++o) {
		var s = n[o], c = "";
		if (!s || !s.s || !s.e) r.push({
			code: "E_MERGE_RANGE",
			message: "Merge range is malformed",
			index: o
		});
		else if (s.s.r < 0 || s.s.c < 0 || s.e.r < s.s.r || s.e.c < s.s.c) r.push({
			code: "E_MERGE_RANGE",
			message: "Merge range is invalid",
			index: o,
			range: s
		});
		else {
			c = Z(s), a[c] != null && r.push({
				code: "E_MERGE_DUP",
				message: "Merge range is duplicated",
				index: o,
				other: a[c],
				range: c
			}), a[c] = o, i && (s.s.r < i.s.r || s.s.c < i.s.c || s.e.r > i.e.r || s.e.c > i.e.c) && r.push({
				code: "E_MERGE_BOUNDS",
				message: "Merge range exceeds worksheet range",
				index: o,
				range: c,
				ref: Z(i)
			});
			for (var l = 0; l < o; ++l) n[l] && n[l].s && n[l].e && cf(s, n[l]) && Z(n[l]) != c && r.push({
				code: "E_MERGE_OVERLAP",
				message: "Merge ranges overlap",
				index: o,
				other: l,
				range: c,
				otherRange: Z(n[l])
			});
		}
	}
	if (r.length && t && t.WTF) {
		var u = /* @__PURE__ */ Error(r[0].message + " (" + (r[0].range || r[0].index) + ")");
		throw u.code = r[0].code, u;
	}
	return r;
}
function uf(e, t) {
	var n = Pr(t);
	n.s.r <= n.e.r && n.s.c <= n.e.c && n.s.r >= 0 && n.s.c >= 0 && (e["!ref"] = Z(n));
}
var df = /<(?:\w+:)?mergeCell ref=["'][A-Z0-9:]+['"]\s*[\/]?>/g, ff = /<(?:\w+:)?hyperlink [^<>]*>/gm, pf = /"(\w*:\w*)"/, mf = /<(?:\w+:)?col\b[^<>]*[\/]?>/g;
function hf(e) {
	var t = zt(e, "autoFilter");
	if (t) return t[0];
	for (var n = 0; (n = e.indexOf("<", n)) != -1;) {
		var r = e.indexOf(">", n + 1);
		if (r == -1) return null;
		for (var i = e.slice(n + 1, r), a = 0; a < i.length && i.charCodeAt(a) <= 32;) ++a;
		for (var o = a; o < i.length && i.charCodeAt(o) > 32 && i.charAt(o) != "/";) ++o;
		var s = i.slice(a, o), c = s.indexOf(":");
		c != -1 && (s = s.slice(c + 1));
		var l = i.slice(o).trim();
		if (s == "autoFilter" && l.charAt(l.length - 1) == "/") return e.slice(n, r + 1);
		n = r + 1;
	}
	return null;
}
var gf = /<(?:\w+:)?pageMargins[^<>]*\/>/g, _f = /<(?:\w+:)?sheetPr\b[^<>]*?\/>/;
function vf(e, t, n, r, i, a, o) {
	if (!e) return e;
	r ||= { "!id": {} }, C != null && t.dense == null && (t.dense = C);
	var s = {};
	t.dense && (s["!data"] = []);
	var c = {
		s: {
			r: 2e6,
			c: 2e6
		},
		e: {
			r: 0,
			c: 0
		}
	}, l = "", u = "", d = zt(e, "sheetData");
	d ? (l = e.slice(0, d.index), u = e.slice(d.index + d[0].length)) : l = u = e;
	var f = l.match(_f);
	f ? yf(f[0], s, i, n) : (f = zt(l, "sheetPr")) && bf(f[0], f[1] || "", s, i, n, o, a);
	var p = (l.match(/<(?:\w*:)?dimension/) || { index: -1 }).index;
	if (p > 0) {
		var m = l.slice(p, p + 50).match(pf);
		m && !(t && t.nodim) && uf(s, m[1]);
	}
	var h = zt(l, "sheetViews");
	h && h[1] && Ef(h[1], i);
	var g = [];
	if (t.cellStyles) {
		var _ = l.match(mf);
		_ && Cf(g, _);
	}
	d && Df(d[1], s, t, c, a, o, i);
	var v = hf(u);
	v && (s["!autofilter"] = wf(v));
	var y = [], b = u.match(df);
	if (b) for (p = 0; p != b.length; ++p) y[p] = Pr(b[p].slice(b[p].indexOf("=") + 2));
	var x = u.match(ff);
	x && xf(s, x, r);
	var S = u.match(gf);
	S && (s["!margins"] = Sf(J(S[0])));
	var w;
	if ((w = u.match(/<(?:\w+:)?drawing\b[^<>]*r:id="(.*?)"/)) && (s["!rel"] = w[1]), (w = u.match(/legacyDrawing r:id="(.*?)"/)) && (s["!legrel"] = w[1]), t && t.nodim && (c.s.c = c.s.r = 0), !s["!ref"] && c.e.c >= c.s.c && c.e.r >= c.s.r && (s["!ref"] = Z(c)), t.sheetRows > 0 && s["!ref"]) {
		var T = Pr(s["!ref"]);
		t.sheetRows <= +T.e.r && (T.e.r = t.sheetRows - 1, T.e.r > c.e.r && (T.e.r = c.e.r), T.e.r < T.s.r && (T.s.r = T.e.r), T.e.c > c.e.c && (T.e.c = c.e.c), T.e.c < T.s.c && (T.s.c = T.e.c), s["!fullref"] = s["!ref"], s["!ref"] = Z(T));
	}
	if (g.length > 0 && (s["!cols"] = g), y.length > 0) {
		s["!merges"] = y;
		var E = lf(s, { WTF: !!(t && t.validateMerges) });
		E.length && (s["!mergeErrors"] = E);
	}
	return r["!id"][s["!rel"]] && (s["!drawel"] = r["!id"][s["!rel"]]), r["!id"][s["!legrel"]] && (s["!legdrawel"] = r["!id"][s["!legrel"]]), s;
}
function yf(e, t, n, r) {
	var i = J(e);
	n.Sheets[r] || (n.Sheets[r] = {}), i.codeName && (n.Sheets[r].CodeName = Y(xn(i.codeName)));
}
function bf(e, t, n, r, i) {
	yf(e.slice(0, e.indexOf(">")), n, r, i);
}
function xf(e, t, n) {
	for (var r = e["!data"] != null, i = 0; i != t.length; ++i) {
		var a = J(xn(t[i]), !0);
		if (!a.ref) return;
		var o = ((n || {})["!id"] || [])[a.id];
		o ? (a.Target = o.Target, a.location && (a.Target += "#" + Y(a.location))) : (a.Target = "#" + Y(a.location), o = {
			Target: a.Target,
			TargetMode: "Internal"
		}), a.Rel = o, a.tooltip && (a.Tooltip = a.tooltip, delete a.tooltip);
		for (var s = Pr(a.ref), c = s.s.r; c <= s.e.r; ++c) for (var l = s.s.c; l <= s.e.c; ++l) {
			var u = Er(l) + Sr(c);
			r ? (e["!data"][c] || (e["!data"][c] = []), e["!data"][c][l] || (e["!data"][c][l] = {
				t: "z",
				v: void 0
			}), e["!data"][c][l].l = a) : (e[u] || (e[u] = {
				t: "z",
				v: void 0
			}), e[u].l = a);
		}
	}
}
function Sf(e) {
	var t = {};
	return [
		"left",
		"right",
		"top",
		"bottom",
		"header",
		"footer"
	].forEach(function(n) {
		e[n] && (t[n] = parseFloat(e[n]));
	}), t;
}
function Cf(e, t) {
	for (var n = !1, r = 0; r != t.length; ++r) {
		var i = J(t[r], !0);
		i.hidden &&= X(i.hidden), i.bestFit &&= X(i.bestFit), i.customWidth &&= X(i.customWidth);
		var a = parseInt(i.min, 10) - 1, o = parseInt(i.max, 10) - 1;
		for (i.outlineLevel && (i.level = +i.outlineLevel || 0), delete i.min, delete i.max, i.width = +i.width, !n && i.width && (n = !0, lc = cc), pc(i); a <= o;) e[a++] = bt(i);
	}
}
function wf(e) {
	return { ref: (e.match(/ref=["']([^"']*)["']/) || [])[1] };
}
var Tf = /<(?:\w:)?sheetView(?:[^<>a-z][^<>]*)?\/?>/g;
function Ef(e, t) {
	t.Views ||= [{}], (e.match(Tf) || []).forEach(function(e, n) {
		var r = J(e);
		t.Views[n] || (t.Views[n] = {}), +r.zoomScale && (t.Views[n].zoom = +r.zoomScale), r.rightToLeft && X(r.rightToLeft) && (t.Views[n].RTL = !0);
	});
}
var Df = /*#__PURE__*/ (function() {
	var e = /<(?:\w+:)?c[ \/>]/, t = /<\/(?:\w+:)?row>/, n = /r=["']([^"']*)["']/, r = /ref=["']([^"']*)["']/;
	return function(i, a, o, s, c, l, u) {
		for (var d = 0, f = "", p = [], m = [], h = 0, g = 0, _ = 0, v = "", y, b, x = 0, S = 0, C, w, T = 0, E = 0, D = -1, O = Array.isArray(l.CellXf), k, A = [], j = [], M = a["!data"] != null, ee = [], N = {}, P = !1, F = !!o.sheetStubs, I = !!((u || {}).WBProps || {}).date1904, L = i.split(t), R = 0, te = L.length; R != te; ++R) {
			f = L[R].trim();
			var z = f.length;
			if (z !== 0) {
				var B = 0;
				outa: for (d = 0; d < z; ++d) switch (f[d]) {
					case ">":
						if (f[d - 1] != "/") {
							++d;
							break outa;
						}
						if (o && o.cellStyles) {
							if (b = J(f.slice(B, d), !0), x = b.r == null ? x + 1 : parseInt(b.r, 10), S = -1, o.sheetRows && o.sheetRows < x) continue;
							N = {}, P = !1, b.ht && (P = !0, N.hpt = parseFloat(b.ht), N.hpx = Ic(N.hpt)), b.hidden && X(b.hidden) && (P = !0, N.hidden = !0), b.outlineLevel != null && (P = !0, N.level = +b.outlineLevel), P && (ee[x - 1] = N);
						}
						break;
					case "<": B = d;
				}
				if (B >= d) break;
				if (b = J(f.slice(B, d), !0), x = b.r == null ? x + 1 : parseInt(b.r, 10), S = -1, !(o.sheetRows && o.sheetRows < x)) {
					o.nodim || (s.s.r > x - 1 && (s.s.r = x - 1), s.e.r < x - 1 && (s.e.r = x - 1)), o && o.cellStyles && (N = {}, P = !1, b.ht && (P = !0, N.hpt = parseFloat(b.ht), N.hpx = Ic(N.hpt)), b.hidden && X(b.hidden) && (P = !0, N.hidden = !0), b.outlineLevel != null && (P = !0, N.level = +b.outlineLevel), P && (ee[x - 1] = N)), p = f.slice(d).split(e);
					for (var V = 0; V != p.length && p[V].trim().charAt(0) == "<"; ++V);
					for (p = p.slice(V), d = 0; d != p.length; ++d) if (f = p[d].trim(), f.length !== 0) {
						if (m = f.match(n), h = d, g = 0, _ = 0, f = "<c " + (f.slice(0, 1) == "<" ? ">" : "") + f, m != null && m.length === 2) {
							for (h = 0, v = m[1], g = 0; g != v.length && !((_ = v.charCodeAt(g) - 64) < 1 || _ > 26); ++g) h = 26 * h + _;
							--h, S = h;
						} else ++S;
						for (g = 0; g != f.length && f.charCodeAt(g) !== 62; ++g);
						if (++g, b = J(f.slice(0, g), !0), b.r || (b.r = jr({
							r: x - 1,
							c: S
						})), v = f.slice(g), y = { t: "" }, (m = zt(v, "v")) != null && m[1] !== "" && (y.v = Y(m[1])), o.cellFormula) {
							if ((m = zt(v, "f")) != null) {
								if (m[1] == "") m[0].indexOf("t=\"shared\"") > -1 && (w = J(m[0]), j[w.si] && (y.f = ou(j[w.si][1], j[w.si][2], b.r)));
								else if (y.f = Y(xn(m[1]), !0), o.xlfn || (y.f = cu(y.f)), m[0].indexOf("t=\"array\"") > -1) y.F = (v.match(r) || [])[1], y.F.indexOf(":") > -1 && A.push([Pr(y.F), y.F]);
								else if (m[0].indexOf("t=\"shared\"") > -1) {
									w = J(m[0]);
									var H = Y(xn(m[1]), !0);
									o.xlfn || (H = cu(H)), j[parseInt(w.si, 10)] = [
										w,
										H,
										b.r
									];
								}
							} else (m = v.match(/<f[^<>]*\/>/)) && (w = J(m[0]), j[w.si] && (y.f = ou(j[w.si][1], j[w.si][2], b.r)));
							var U = Ar(b.r);
							for (g = 0; g < A.length; ++g) U.r >= A[g][0].s.r && U.r <= A[g][0].e.r && U.c >= A[g][0].s.c && U.c <= A[g][0].e.c && (y.F = A[g][1]);
						}
						if (b.t == null && y.v === void 0) {
							if (y.f || y.F) y.v = 0, y.t = "n";
							else if (F) y.t = "z";
							else continue;
						} else y.t = b.t || "n";
						switch (s.s.c > S && (s.s.c = S), s.e.c < S && (s.e.c = S), y.t) {
							case "n":
								if (y.v == "" || y.v == null) {
									if (!F) continue;
									y.t = "z";
								} else y.v = parseFloat(y.v);
								break;
							case "s":
								if (y.v === void 0) {
									if (!F) continue;
									y.t = "z";
								} else C = ef[parseInt(y.v, 10)], y.v = C.t, y.r = C.r, o.cellHTML && (y.h = C.h);
								break;
							case "str":
								y.t = "s", y.v = y.v == null ? "" : Y(xn(y.v), !0), o.cellHTML && (y.h = mn(y.v));
								break;
							case "inlineStr":
								m = zt(v, "is"), y.t = "s", m != null && (C = Ss(m[1])) ? (y.v = C.t, o.cellHTML && (y.h = C.h)) : y.v = "";
								break;
							case "b":
								y.v = X(y.v);
								break;
							case "d":
								o.cellDates ? y.v = vt(y.v, I) : (y.v = ft(vt(y.v, I), I), y.t = "n");
								break;
							case "e": o && o.cellText === !1 || (y.w = y.v), y.v = Ai[y.v];
						}
						if (T = E = 0, D = -1, k = null, O && b.s !== void 0 && (D = parseInt(b.s, 10), k = l.CellXf[D], k != null && (k.numFmtId != null && (T = k.numFmtId), o.cellStyles && k.fillId != null && (E = k.fillId))), sf(y, T, E, o, c, l, I, k, D), o.cellDates && O && y.t == "n" && Ue(W[T]) && (y.v = pt(y.v + (I ? 1462 : 0)), y.t = typeof y.v == "number" ? "n" : "d"), b.cm && o.xlmeta) {
							var ne = (o.xlmeta.Cell || [])[b.cm - 1];
							ne && ne.type == "XLDAPR" && (y.D = !0);
						}
						var re;
						o.nodim && (re = Ar(b.r), s.s.r > re.r && (s.s.r = re.r), s.e.r < re.r && (s.e.r = re.r)), M ? (re = Ar(b.r), a["!data"][re.r] || (a["!data"][re.r] = []), a["!data"][re.r][re.c] = y) : a[b.r] = y;
					}
				}
			}
		}
		ee.length > 0 && (a["!rows"] = ee);
	};
})(), Of = 1024, kf = 16384, Af = 5242880, jf = {
	wholeTable: !0,
	headerRow: !0,
	totalRow: !0,
	firstColumn: !0,
	lastColumn: !0,
	firstRowStripe: !0,
	secondRowStripe: !0,
	firstColumnStripe: !0,
	secondColumnStripe: !0,
	firstHeaderCell: !0,
	lastHeaderCell: !0,
	firstTotalCell: !0,
	lastTotalCell: !0
};
function Mf(e) {
	return e != "__proto__" && e != "constructor" && e != "prototype";
}
function Nf(e) {
	return Object.prototype.hasOwnProperty.call(jf, e);
}
function Pf(e, t) {
	return e[t] == null ? e[t.toLowerCase()] : e[t];
}
function Ff(e, t, n) {
	var r = Pf(e, t);
	return r == null ? n : X(r);
}
function If(e, t) {
	var n = Pf(e, t);
	if (n != null && n !== "") return n = parseInt(n, 10), isFinite(n) && n >= 0 ? n : void 0;
}
function Lf(e, t) {
	return t && (e ||= {}, st(t).forEach(function(n) {
		if (Mf(n)) {
			var r = t[n];
			r && typeof r == "object" && !Array.isArray(r) ? e[n] = Lf(e[n] && typeof e[n] == "object" && !Array.isArray(e[n]) ? Lf({}, e[n]) : {}, r) : e[n] = r;
		}
	})), e;
}
function Rf(e, t, n) {
	return ac({
		theme: String(t),
		tint: String(n || 0)
	}, e);
}
function zf(e) {
	return { fill: {
		patternType: "solid",
		fgColor: e
	} };
}
function Bf(e, t) {
	var n = {};
	return e && (n.color = e), t && (n.bold = 1), { font: n };
}
function Vf(e, t, n) {
	var r = {}, i = { border: r };
	return r[e] = {
		style: n || "thin",
		color: t
	}, i;
}
function Hf(e, t) {
	var n = (t - 1) % 7;
	return Rf(e, n ? 3 + n : 1, 0);
}
function Uf(e, t) {
	var n = /^TableStyle(Light|Medium|Dark)(\d+)$/i.exec(e || "");
	if (!n) return null;
	var r = n[1].toLowerCase(), i = parseInt(n[2], 10);
	if (i < 1 || i > (r == "light" ? 21 : r == "medium" ? 28 : 11)) return null;
	var a = Hf(t, i), o = Rf(t, 0, 0), s = Rf(t, 1, 0), c = {};
	if (r == "light") c.headerRow = Lf(Bf(a, !0), Vf("bottom", a, "medium")), c.totalRow = Lf(Bf(a, !0), Vf("top", a, "double")), c.firstRowStripe = zf(Rf(t, a.theme, .9)), c.firstColumnStripe = c.firstRowStripe;
	else if (r == "medium") {
		var l = Math.floor((i - 1) / 7);
		c.headerRow = Lf(zf(a), Bf(o, !0)), c.totalRow = Lf(Bf(a, !0), Vf("top", a, "double")), l == 1 ? (c.wholeTable = zf(Rf(t, a.theme, .8)), c.firstRowStripe = zf(Rf(t, a.theme, .6)), c.firstColumnStripe = c.firstRowStripe) : l == 2 ? (c.firstRowStripe = zf(Rf(t, a.theme, .8)), c.firstColumnStripe = c.firstRowStripe, c.wholeTable = Vf("bottom", Rf(t, a.theme, .4), "thin")) : l == 3 ? (c.wholeTable = zf(Rf(t, a.theme, .9)), c.firstRowStripe = zf(Rf(t, a.theme, .7)), c.firstColumnStripe = c.firstRowStripe) : (c.firstRowStripe = zf(Rf(t, a.theme, .8)), c.firstColumnStripe = c.firstRowStripe);
	} else c.wholeTable = Lf(zf(s), Bf(o, !1)), c.headerRow = Lf(zf(a), Bf(o, !0)), c.firstRowStripe = zf(Rf(t, a.theme, -.35)), c.firstColumnStripe = c.firstRowStripe, c.totalRow = Lf(Bf(o, !0), Vf("top", a, "double"));
	return c.firstColumn = Bf(null, !0), c.lastColumn = Bf(null, !0), c;
}
function Wf(e, t) {
	var n = t && t.TableStyles;
	if (!n || !n.styles) return null;
	for (var r = 0; r < n.styles.length; ++r) {
		var i = n.styles[r];
		if (i.name == e) {
			var a = Object.create(null);
			return (i.elements || []).forEach(function(e) {
				if (Nf(e.type)) {
					var n = t.Dxfs && t.Dxfs[e.dxfId];
					n && (a[e.type] = {
						style: bt(n),
						size: e.size || 1
					});
				}
			}), a;
		}
	}
	return null;
}
function Gf(e, t, n, r, i) {
	if (!e || e.length > Af) return null;
	e = Pt(It(e, "<!--", "-->"));
	var a = { columns: [] }, o = null, s = !1;
	if ((e.match(an) || []).forEach(function(e) {
		var n = J(e), r = ln(n[0]);
		switch (r) {
			case "<table":
			case "<table>":
				a.id = If(n, "id"), a.name = xn(Y(Pf(n, "name") || "")), a.displayName = xn(Y(Pf(n, "displayName") || a.name)), a.ref = Pf(n, "ref") || "", a.headerRowCount = If(n, "headerRowCount"), a.totalsRowCount = If(n, "totalsRowCount"), a.totalsRowShown = Ff(n, "totalsRowShown", !1), a.headerRowDxfId = If(n, "headerRowDxfId"), a.dataDxfId = If(n, "dataDxfId"), a.totalsRowDxfId = If(n, "totalsRowDxfId"), a.path = t;
				break;
			case "<tableColumn":
			case "<tableColumn>":
			case "<tableColumn/>":
				if (a.columns.length >= kf) {
					o = null;
					break;
				}
				o = {
					id: If(n, "id"),
					name: xn(Y(Pf(n, "name") || "")),
					headerRowDxfId: If(n, "headerRowDxfId"),
					dataDxfId: If(n, "dataDxfId"),
					totalsRowDxfId: If(n, "totalsRowDxfId")
				}, a.columns.push(o), r.slice(-2) == "/>" && (o = null);
				break;
			case "</tableColumn>":
				o = null;
				break;
			case "<tableStyleInfo":
			case "<tableStyleInfo>":
			case "<tableStyleInfo/>":
				a.styleInfo = {
					name: xn(Y(Pf(n, "name") || "")),
					showFirstColumn: Ff(n, "showFirstColumn", !1),
					showLastColumn: Ff(n, "showLastColumn", !1),
					showRowStripes: Ff(n, "showRowStripes", !1),
					showColumnStripes: Ff(n, "showColumnStripes", !1)
				};
				break;
			case "<extLst":
			case "<extLst>":
			case "</extLst>": break;
			case "<ext":
				s = !0;
				break;
			case "</ext>":
				s = !1;
				break;
			default: if (i && i.WTF && !s && /^<\/?(?:tableColumns|autoFilter|sortState|calculatedColumnFormula|totalsRowFormula|xmlColumnPr)/.test(r)) break;
		}
	}), !a.ref) return null;
	try {
		if (a.range = Pr(a.ref), a.range.s.r < 0 || a.range.s.c < 0 || a.range.e.r > 1048575 || a.range.e.c > 16383) return null;
	} catch {
		return null;
	}
	var c = a.styleInfo && a.styleInfo.name;
	return a.styleRules = Wf(c, r) || Uf(c, n) || {}, a.dxfs = r && r.Dxfs ? r.Dxfs : [], a;
}
function Kf(e, t, n, r, i, a, o) {
	if (e && r && r["!id"] && i && i.cellStyles) {
		var s = [], c = Object.create(null);
		st(r["!id"]).forEach(function(e) {
			if (!(s.length >= Of)) {
				var l = r["!id"][e];
				if (l && l.TargetMode != "External" && typeof l.Target == "string" && l.Target && (l.Type == Fi.TABLE || /\/table$/.test(l.Type || ""))) {
					var u = en(l.Target, n);
					if (!c[u]) {
						c[u] = !0;
						var d = Gf(Yt(t, u, !0), u, a, o, i);
						d && s.push(d);
					}
				}
			}
		}), s.length && (e["!tables"] = s);
	}
}
function qf(e) {
	return e && e.style ? e.style : e;
}
function Jf(e, t, n) {
	var r = e && e.size || 1, i = r + (t && t.size || 1);
	return i ? n % i < r ? e : t : null;
}
function Yf(e, t) {
	return t == null || !e.dxfs ? null : e.dxfs[t];
}
function Xf(e, t, n, r) {
	var i = e && e["!tables"], a = r ? Lf({}, r) : {};
	if (!i || !i.length) return st(a).length ? a : void 0;
	for (var o = 0; o < i.length; ++o) {
		var s = i[o], c = s.range;
		if (!(!c || t < c.s.r || t > c.e.r || n < c.s.c || n > c.e.c)) {
			var l = s.styleRules || {}, u = s.styleInfo || {}, d = t - c.s.r, f = n - c.s.c, p = s.headerRowCount == null ? 1 : s.headerRowCount, m = s.totalsRowCount == null ? +!!s.totalsRowShown : s.totalsRowCount, h = p, g = c.e.r - c.s.r - m, _ = d < p, v = m > 0 && d > g, y = d - h, b = s.columns && s.columns[f];
			a = Lf(a, qf(l.wholeTable)), !_ && !v && y >= 0 && (u.showRowStripes && (a = Lf(a, qf(Jf(l.firstRowStripe, l.secondRowStripe, y)))), u.showColumnStripes && (a = Lf(a, qf(Jf(l.firstColumnStripe, l.secondColumnStripe, f))))), u.showFirstColumn && n == c.s.c && (a = Lf(a, qf(l.firstColumn))), u.showLastColumn && n == c.e.c && (a = Lf(a, qf(l.lastColumn))), _ ? (a = Lf(a, qf(l.headerRow)), n == c.s.c && (a = Lf(a, qf(l.firstHeaderCell))), n == c.e.c && (a = Lf(a, qf(l.lastHeaderCell))), a = Lf(a, Yf(s, s.headerRowDxfId)), a = Lf(a, Yf(s, b && b.headerRowDxfId))) : v ? (a = Lf(a, qf(l.totalRow)), n == c.s.c && (a = Lf(a, qf(l.firstTotalCell))), n == c.e.c && (a = Lf(a, qf(l.lastTotalCell))), a = Lf(a, Yf(s, s.totalsRowDxfId)), a = Lf(a, Yf(s, b && b.totalsRowDxfId))) : (a = Lf(a, Yf(s, s.dataDxfId)), a = Lf(a, Yf(s, b && b.dataDxfId)));
		}
	}
	return st(a).length ? a : void 0;
}
function Zf(e, t) {
	var n = {}, r = e.l + t;
	n.r = e.read_shift(4), e.l += 4;
	var i = e.read_shift(2);
	e.l += 1;
	var a = e.read_shift(1);
	return e.l = r, a & 7 && (n.level = a & 7), a & 16 && (n.hidden = !0), a & 32 && (n.hpt = i / 20), n;
}
var Qf = ri;
function $f() {}
function ep(e, t) {
	var n = {}, r = e[e.l];
	return ++e.l, n.above = !(r & 64), n.left = !(r & 128), e.l += 18, n.name = Zr(e, t - 19), n;
}
function tp(e) {
	return [Yr(e)];
}
function np(e) {
	return [Xr(e)];
}
function rp(e) {
	return [
		Yr(e),
		e.read_shift(1),
		"b"
	];
}
function ip(e) {
	return [
		Xr(e),
		e.read_shift(1),
		"b"
	];
}
function ap(e) {
	return [
		Yr(e),
		e.read_shift(1),
		"e"
	];
}
function op(e) {
	return [
		Xr(e),
		e.read_shift(1),
		"e"
	];
}
function sp(e) {
	return [
		Yr(e),
		e.read_shift(4),
		"s"
	];
}
function cp(e) {
	return [
		Xr(e),
		e.read_shift(4),
		"s"
	];
}
function lp(e) {
	return [
		Yr(e),
		ii(e),
		"n"
	];
}
function up(e) {
	return [
		Xr(e),
		ii(e),
		"n"
	];
}
function dp(e) {
	return [
		Yr(e),
		ti(e),
		"n"
	];
}
function fp(e) {
	return [
		Xr(e),
		ti(e),
		"n"
	];
}
function pp(e) {
	return [
		Yr(e),
		qr(e),
		"is"
	];
}
function mp(e) {
	return [
		Yr(e),
		Gr(e),
		"str"
	];
}
function hp(e) {
	return [
		Xr(e),
		Gr(e),
		"str"
	];
}
function gp(e, t, n) {
	var r = e.l + t, i = Yr(e);
	i.r = n["!row"];
	var a = [
		i,
		e.read_shift(1),
		"b"
	];
	return n.cellFormula ? (e.l += 2, a[3] = Ld(Kd(e, r - e.l, n), null, i, n.supbooks, n)) : e.l = r, a;
}
function _p(e, t, n) {
	var r = e.l + t, i = Yr(e);
	i.r = n["!row"];
	var a = [
		i,
		e.read_shift(1),
		"e"
	];
	return n.cellFormula ? (e.l += 2, a[3] = Ld(Kd(e, r - e.l, n), null, i, n.supbooks, n)) : e.l = r, a;
}
function vp(e, t, n) {
	var r = e.l + t, i = Yr(e);
	i.r = n["!row"];
	var a = [
		i,
		ii(e),
		"n"
	];
	return n.cellFormula ? (e.l += 2, a[3] = Ld(Kd(e, r - e.l, n), null, i, n.supbooks, n)) : e.l = r, a;
}
function yp(e, t, n) {
	var r = e.l + t, i = Yr(e);
	i.r = n["!row"];
	var a = [
		i,
		Gr(e),
		"str"
	];
	return n.cellFormula ? (e.l += 2, a[3] = Ld(Kd(e, r - e.l, n), null, i, n.supbooks, n)) : e.l = r, a;
}
var bp = ri;
function xp(e, t) {
	var n = e.l + t, r = ri(e, 16), i = Qr(e), a = Gr(e), o = Gr(e), s = Gr(e);
	e.l = n;
	var c = {
		rfx: r,
		relId: i,
		loc: a,
		display: s
	};
	return o && (c.Tooltip = o), c;
}
function Sp() {}
function Cp(e, t, n) {
	var r = e.l + t, i = ni(e, 16), a = e.read_shift(1), o = [i];
	return o[2] = a, n.cellFormula ? o[1] = Gd(e, r - e.l, n) : e.l = r, o;
}
function wp(e, t, n) {
	var r = e.l + t, i = [ri(e, 16)];
	return n.cellFormula && (i[1] = Jd(e, r - e.l, n)), e.l = r, i;
}
var Tp = [
	"left",
	"right",
	"top",
	"bottom",
	"header",
	"footer"
];
function Ep(e) {
	var t = {};
	return Tp.forEach(function(n) {
		t[n] = ii(e, 8);
	}), t;
}
function Dp(e) {
	var t = e.read_shift(2);
	return e.l += 28, { RTL: t & 32 };
}
function Op() {}
function kp() {}
function Ap(e, t, n, r, i, a, o) {
	if (!e) return e;
	var s = t || {};
	r ||= { "!id": {} }, C != null && s.dense == null && (s.dense = C);
	var c = {};
	s.dense && (c["!data"] = []);
	var l, u = {
		s: {
			r: 2e6,
			c: 2e6
		},
		e: {
			r: 0,
			c: 0
		}
	}, d = [], f = !1, p = !1, m, h, g, _, v, y, b, x, S, w = [];
	s.biff = 12, s["!row"] = 0;
	var T = 0, E = !1, D = [], O = {}, k = s.supbooks || i.supbooks || [[]];
	if (k.sharedf = O, k.arrayf = D, k.SheetNames = i.SheetNames || i.Sheets.map(function(e) {
		return e.name;
	}), !s.supbooks && (s.supbooks = k, i.Names)) for (var A = 0; A < i.Names.length; ++A) k[0][A + 1] = i.Names[A];
	var j = [], M = [], ee = !1;
	th[16] = {
		n: "BrtShortReal",
		f: up
	};
	var N, P, F = 1462 * !!((i || {}).WBProps || {}).date1904;
	if (hr(e, function(e, t, C) {
		if (!p) switch (C) {
			case 148:
				l = e;
				break;
			case 0:
				m = e, s.sheetRows && s.sheetRows <= m.r && (p = !0), x = Sr(_ = m.r), s["!row"] = m.r, (e.hidden || e.hpt || e.level != null) && (e.hpt && (e.hpx = Ic(e.hpt)), M[e.r] = e);
				break;
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
			case 11:
			case 13:
			case 14:
			case 15:
			case 16:
			case 17:
			case 18:
			case 62:
				switch (h = { t: e[2] }, e[2]) {
					case "n":
						h.v = e[1];
						break;
					case "s":
						b = ef[e[1]], h.v = b.t, h.r = b.r;
						break;
					case "b":
						h.v = !!e[1];
						break;
					case "e":
						h.v = e[1], s.cellText !== !1 && (h.w = ki[h.v]);
						break;
					case "str":
						h.t = "s", h.v = e[1];
						break;
					case "is": h.t = "s", h.v = e[1].t;
				}
				if ((g = o.CellXf[e[0].iStyleRef]) && sf(h, g.numFmtId, null, s, a, o, F > 0, g, e[0].iStyleRef), v = e[0].c == -1 ? v + 1 : e[0].c, s.dense ? (c["!data"][_] || (c["!data"][_] = []), c["!data"][_][v] = h) : c[Er(v) + x] = h, s.cellFormula) {
					for (E = !1, T = 0; T < D.length; ++T) {
						var A = D[T];
						m.r >= A[0].s.r && m.r <= A[0].e.r && v >= A[0].s.c && v <= A[0].e.c && (h.F = Z(A[0]), E = !0);
					}
					!E && e.length > 3 && (h.f = e[3]);
				}
				if (u.s.r > m.r && (u.s.r = m.r), u.s.c > v && (u.s.c = v), u.e.r < m.r && (u.e.r = m.r), u.e.c < v && (u.e.c = v), s.cellDates && g && h.t == "n" && Ue(W[g.numFmtId])) {
					var I = de(h.v + F);
					I && (h.t = "d", h.v = new Date(Date.UTC(I.y, I.m - 1, I.d, I.H, I.M, I.S, I.u)));
				}
				N &&= (N.type == "XLDAPR" && (h.D = !0), void 0), P &&= void 0;
				break;
			case 1:
			case 12:
				if (!s.sheetStubs || f) break;
				h = {
					t: "z",
					v: void 0
				}, v = e[0].c == -1 ? v + 1 : e[0].c, s.dense ? (c["!data"][_] || (c["!data"][_] = []), c["!data"][_][v] = h) : c[Er(v) + x] = h, u.s.r > m.r && (u.s.r = m.r), u.s.c > v && (u.s.c = v), u.e.r < m.r && (u.e.r = m.r), u.e.c < v && (u.e.c = v), N &&= (N.type == "XLDAPR" && (h.D = !0), void 0), P &&= void 0;
				break;
			case 176:
				w.push(e);
				break;
			case 49:
				N = ((s.xlmeta || {}).Cell || [])[e - 1];
				break;
			case 494:
				var L = r["!id"][e.relId];
				for (L ? (e.Target = L.Target, e.loc && (e.Target += "#" + e.loc), e.Rel = L) : e.relId == "" && (e.Target = "#" + e.loc), _ = e.rfx.s.r; _ <= e.rfx.e.r; ++_) for (v = e.rfx.s.c; v <= e.rfx.e.c; ++v) s.dense ? (c["!data"][_] || (c["!data"][_] = []), c["!data"][_][v] || (c["!data"][_][v] = {
					t: "z",
					v: void 0
				}), c["!data"][_][v].l = e) : (y = Er(v) + Sr(_), c[y] || (c[y] = {
					t: "z",
					v: void 0
				}), c[y].l = e);
				break;
			case 426:
				if (!s.cellFormula) break;
				D.push(e), S = s.dense ? c["!data"][_][v] : c[Er(v) + x], S.f = Ld(e[1], u, {
					r: m.r,
					c: v
				}, k, s), S.F = Z(e[0]);
				break;
			case 427:
				if (!s.cellFormula) break;
				O[jr(e[0].s)] = e[1], S = s.dense ? c["!data"][_][v] : c[Er(v) + x], S.f = Ld(e[1], u, {
					r: m.r,
					c: v
				}, k, s);
				break;
			case 60:
				if (!s.cellStyles) break;
				for (; e.e >= e.s;) j[e.e--] = {
					width: e.w / 256,
					hidden: !!(e.flags & 1),
					level: e.level
				}, ee || (ee = !0, lc = cc), pc(j[e.e + 1]);
				break;
			case 551:
				e && (c["!legrel"] = e);
				break;
			case 161:
				c["!autofilter"] = { ref: Z(e) };
				break;
			case 476:
				c["!margins"] = e;
				break;
			case 147:
				i.Sheets[n] || (i.Sheets[n] = {}), e.name && (i.Sheets[n].CodeName = e.name), (e.above || e.left) && (c["!outline"] = {
					above: e.above,
					left: e.left
				});
				break;
			case 137:
				i.Views ||= [{}], i.Views[0] || (i.Views[0] = {}), e.RTL && (i.Views[0].RTL = !0);
				break;
			case 485: break;
			case 64:
			case 1053: break;
			case 151: break;
			case 152:
			case 175:
			case 644:
			case 625:
			case 562:
			case 396:
			case 1112:
			case 1146:
			case 471:
			case 1050:
			case 649:
			case 1105:
			case 589:
			case 607:
			case 564:
			case 1055:
			case 168:
			case 174:
			case 1180:
			case 499:
			case 507:
			case 550:
			case 171:
			case 167:
			case 1177:
			case 169:
			case 1181:
			case 552:
			case 661:
			case 639:
			case 478:
			case 537:
			case 477:
			case 536:
			case 1103:
			case 680:
			case 1104:
			case 1024:
			case 663:
			case 535:
			case 678:
			case 504:
			case 1043:
			case 428:
			case 170:
			case 3072:
			case 50:
			case 2070:
			case 1045: break;
			case 35:
				f = !0;
				break;
			case 36:
				f = !1;
				break;
			case 37:
				d.push(C), f = !0;
				break;
			case 38:
				d.pop(), f = !1;
				break;
			default: if (!t.T && (!f || s.WTF)) throw Error("Unexpected record 0x" + C.toString(16));
		}
	}, s), delete s.supbooks, delete s["!row"], !c["!ref"] && (u.s.r < 2e6 || l && (l.e.r > 0 || l.e.c > 0 || l.s.r > 0 || l.s.c > 0)) && (c["!ref"] = Z(l || u)), s.sheetRows && c["!ref"]) {
		var I = Pr(c["!ref"]);
		s.sheetRows <= +I.e.r && (I.e.r = s.sheetRows - 1, I.e.r > u.e.r && (I.e.r = u.e.r), I.e.r < I.s.r && (I.s.r = I.e.r), I.e.c > u.e.c && (I.e.c = u.e.c), I.e.c < I.s.c && (I.s.c = I.e.c), c["!fullref"] = c["!ref"], c["!ref"] = Z(I));
	}
	return w.length > 0 && (c["!merges"] = w), j.length > 0 && (c["!cols"] = j), M.length > 0 && (c["!rows"] = M), r["!id"][c["!legrel"]] && (c["!legdrawel"] = r["!id"][c["!legrel"]]), c;
}
function jp(e) {
	var t = [], n = e.match(/^<c:numCache>/), r;
	(e.match(/<c:pt idx="(\d*)"[^<>\/]*><c:v>([^<]*)<\/c:v><\/c:pt>/gm) || []).forEach(function(e) {
		var r = e.match(/<c:pt idx="(\d*)"[^<>\/]*><c:v>([^<]*)<\/c:v><\/c:pt>/);
		r && (t[+r[1]] = n ? +r[2] : r[2]);
	});
	var i = Y((Rt(e, "c:formatCode") || ["", "General"])[1]);
	return (Ft(e, "<c:f>", "</c:f>") || []).forEach(function(e) {
		r = hn(e);
	}), [
		t,
		i,
		r
	];
}
function Mp(e) {
	var t = Ft(e, "<c:numCache>", "</c:numCache>");
	if (t && t.length) {
		var n = jp(t[0]);
		return {
			values: n[0],
			formatCode: n[1],
			formula: n[2]
		};
	}
	var r = Ft(e, "<c:strCache>", "</c:strCache>");
	if (r && r.length) {
		var i = jp(r[0]);
		return {
			values: i[0],
			formatCode: i[1],
			formula: i[2]
		};
	}
	var a = (Ft(e, "<c:f>", "</c:f>") || [])[0];
	return {
		values: [],
		formula: a ? hn(a) : void 0
	};
}
function Np(e) {
	var t = Ft(e, "<c:tx>", "</c:tx>");
	if (!t || !t.length) return "";
	var n = zt(t[0], "v");
	if (n && n[1]) return Y(n[1]);
	var r = zt(t[0], "f");
	return r && r[1] ? Y(r[1]) : "";
}
function Pp(e) {
	var t = { name: Np(e) }, n = zt(e, "idx");
	n && (t.idx = +(J(n[0]).val || 0));
	var r = zt(e, "order");
	return r && (t.order = +(J(r[0]).val || 0)), [
		"cat",
		"val",
		"xVal",
		"yVal",
		"bubbleSize"
	].forEach(function(n) {
		var r = zt(e, n);
		r && (t[n] = Mp(r[0]));
	}), t.val && t.val.values ? t.data = t.val.values : t.yVal && t.yVal.values && (t.data = t.yVal.values), t;
}
function Fp(e) {
	var t = zt(e, "title");
	if (!t) return "";
	var n = [];
	return (t[0].match(/<a:t\b[^>]*>[\s\S]*?<\/a:t>/g) || []).forEach(function(e) {
		n.push(Y(hn(e)));
	}), n.join("");
}
function Ip(e, t, n) {
	var r = {
		target: t,
		raw: e,
		rels: n,
		series: []
	};
	r.title = Fp(e);
	var i = zt(e, "plotArea"), a = i ? i[1] : e;
	[
		"barChart",
		"lineChart",
		"areaChart",
		"scatterChart",
		"pieChart",
		"doughnutChart",
		"bubbleChart"
	].forEach(function(e) {
		(Ft(a, "<c:" + e + ">", "</c:" + e + ">") || []).forEach(function(t) {
			r.type ||= e;
			var n = zt(t, "grouping");
			n && (r.grouping = J(n[0]).val), (Ft(t, "<c:ser>", "</c:ser>") || []).forEach(function(t) {
				var n = Pp(t);
				n.chartType = e, r.series.push(n);
			});
		});
	});
	var o = zt(e, "legend");
	if (o) {
		r.legend = {};
		var s = zt(o[0], "legendPos");
		s && (r.legend.position = J(s[0]).val);
	}
	return r;
}
function Lp(e, t, n, r, i, a) {
	var o = a || { "!type": "chart" };
	if (!e) return a;
	o["!chart"] = Ip(e, t, r);
	var s = 0, c = 0, l = "A", u = {
		s: {
			r: 2e6,
			c: 2e6
		},
		e: {
			r: 0,
			c: 0
		}
	};
	return (Ft(e, "<c:numCache>", "</c:numCache>") || []).forEach(function(e) {
		var t = jp(e);
		u.s.r = u.s.c = 0, u.e.c = s, l = Er(s), t[0].forEach(function(e, n) {
			o["!data"] ? (o["!data"][n] || (o["!data"][n] = []), o["!data"][n][s] = {
				t: "n",
				v: e,
				z: t[1]
			}) : o[l + Sr(n)] = {
				t: "n",
				v: e,
				z: t[1]
			}, c = n;
		}), u.e.r < c && (u.e.r = c), ++s;
	}), s > 0 && (o["!ref"] = Z(u)), o;
}
function Rp(e, t, n, r, i) {
	if (!e) return e;
	r ||= { "!id": {} };
	var a = {
		"!type": "chart",
		"!drawel": null,
		"!rel": ""
	}, o, s = e.match(_f);
	return s && yf(s[0], a, i, n), (o = e.match(/drawing r:id="(.*?)"/)) && (a["!rel"] = o[1]), r["!id"][a["!rel"]] && (a["!drawel"] = r["!id"][a["!rel"]]), a;
}
function zp(e, t) {
	return e.l += 10, { name: Gr(e, t - 10) };
}
function Bp(e, t, n, r, i) {
	if (!e) return e;
	r ||= { "!id": {} };
	var a = {
		"!type": "chart",
		"!drawel": null,
		"!rel": ""
	}, o = [], s = !1;
	return hr(e, function(e, r, c) {
		switch (c) {
			case 550:
				a["!rel"] = e;
				break;
			case 651:
				i.Sheets[n] || (i.Sheets[n] = {}), e.name && (i.Sheets[n].CodeName = e.name);
				break;
			case 562:
			case 652:
			case 669:
			case 679:
			case 551:
			case 552:
			case 476:
			case 3072: break;
			case 35:
				s = !0;
				break;
			case 36:
				s = !1;
				break;
			case 37:
				o.push(c);
				break;
			case 38:
				o.pop();
				break;
			default: if (r.T > 0) o.push(c);
			else if (r.T < 0) o.pop();
			else if (!s || t.WTF) throw Error("Unexpected record 0x" + c.toString(16));
		}
	}, t), r["!id"][a["!rel"]] && (a["!drawel"] = r["!id"][a["!rel"]]), a;
}
var Vp = [
	[
		"allowRefreshQuery",
		!1,
		"bool"
	],
	[
		"autoCompressPictures",
		!0,
		"bool"
	],
	[
		"backupFile",
		!1,
		"bool"
	],
	[
		"checkCompatibility",
		!1,
		"bool"
	],
	["CodeName", ""],
	[
		"date1904",
		!1,
		"bool"
	],
	[
		"defaultThemeVersion",
		0,
		"int"
	],
	[
		"filterPrivacy",
		!1,
		"bool"
	],
	[
		"hidePivotFieldList",
		!1,
		"bool"
	],
	[
		"promptedSolutions",
		!1,
		"bool"
	],
	[
		"publishItems",
		!1,
		"bool"
	],
	[
		"refreshAllConnections",
		!1,
		"bool"
	],
	[
		"saveExternalLinkValues",
		!0,
		"bool"
	],
	[
		"showBorderUnselectedTables",
		!0,
		"bool"
	],
	[
		"showInkAnnotation",
		!0,
		"bool"
	],
	["showObjects", "all"],
	[
		"showPivotChartFilter",
		!1,
		"bool"
	],
	["updateLinks", "userSet"]
], Hp = [
	[
		"activeTab",
		0,
		"int"
	],
	[
		"autoFilterDateGrouping",
		!0,
		"bool"
	],
	[
		"firstSheet",
		0,
		"int"
	],
	[
		"minimized",
		!1,
		"bool"
	],
	[
		"showHorizontalScroll",
		!0,
		"bool"
	],
	[
		"showSheetTabs",
		!0,
		"bool"
	],
	[
		"showVerticalScroll",
		!0,
		"bool"
	],
	[
		"tabRatio",
		600,
		"int"
	],
	["visibility", "visible"]
], Up = [], Wp = [
	["calcCompleted", "true"],
	["calcMode", "auto"],
	["calcOnSave", "true"],
	["concurrentCalc", "true"],
	["fullCalcOnLoad", "false"],
	["fullPrecision", "true"],
	["iterate", "false"],
	["iterateCount", "100"],
	["iterateDelta", "0.001"],
	["refMode", "A1"]
];
function Gp(e, t) {
	for (var n = 0; n != e.length; ++n) for (var r = e[n], i = 0; i != t.length; ++i) {
		var a = t[i];
		if (r[a[0]] == null) r[a[0]] = a[1];
		else switch (a[2]) {
			case "bool":
				typeof r[a[0]] == "string" && (r[a[0]] = X(r[a[0]]));
				break;
			case "int": typeof r[a[0]] == "string" && (r[a[0]] = parseInt(r[a[0]], 10));
		}
	}
}
function Kp(e, t) {
	for (var n = 0; n != t.length; ++n) {
		var r = t[n];
		if (e[r[0]] == null) e[r[0]] = r[1];
		else switch (r[2]) {
			case "bool":
				typeof e[r[0]] == "string" && (e[r[0]] = X(e[r[0]]));
				break;
			case "int": typeof e[r[0]] == "string" && (e[r[0]] = parseInt(e[r[0]], 10));
		}
	}
}
function qp(e) {
	Kp(e.WBProps, Vp), Kp(e.CalcPr, Wp), Gp(e.WBView, Hp), Gp(e.Sheets, Up), tf.date1904 = X(e.WBProps.date1904);
}
var Jp = /*#__PURE__*/ ":][*?/\\".split("");
function Yp(e, t) {
	try {
		if (e == "") throw Error("Sheet name cannot be blank");
		if (e.length > 31) throw Error("Sheet name cannot exceed 31 chars");
		if (e.charCodeAt(0) == 39 || e.charCodeAt(e.length - 1) == 39) throw Error("Sheet name cannot start or end with apostrophe (')");
		if (e.toLowerCase() == "history") throw Error("Sheet name cannot be 'History'");
		Jp.forEach(function(t) {
			if (e.indexOf(t) != -1) throw Error("Sheet name cannot contain : \\ / ? * [ ]");
		});
	} catch (e) {
		if (t) return !1;
		throw e;
	}
	return !0;
}
var Xp = /<\w+:workbook/;
function Zp(e, t) {
	if (!e) throw Error("Could not find file");
	var n = {
		AppVersion: {},
		WBProps: {},
		WBView: [],
		Sheets: [],
		CalcPr: {},
		Names: [],
		xmlns: ""
	}, r = !1, i = "xmlns", a = {}, o = 0;
	if (e.replace(an, function(s, c) {
		var l = J(s);
		switch (ln(l[0])) {
			case "<?xml": break;
			case "<workbook":
				s.match(Xp) && (i = "xmlns" + s.match(/<(\w+):/)[1]), n.xmlns = l[i];
				break;
			case "</workbook>": break;
			case "<fileVersion":
				delete l[0], n.AppVersion = l;
				break;
			case "<fileVersion/>":
			case "</fileVersion>": break;
			case "<fileSharing": break;
			case "<fileSharing/>": break;
			case "<workbookPr":
			case "<workbookPr/>":
				Vp.forEach(function(e) {
					if (l[e[0]] != null) switch (e[2]) {
						case "bool":
							n.WBProps[e[0]] = X(l[e[0]]);
							break;
						case "int":
							n.WBProps[e[0]] = parseInt(l[e[0]], 10);
							break;
						default: n.WBProps[e[0]] = l[e[0]];
					}
				}), l.codeName && (n.WBProps.CodeName = xn(l.codeName));
				break;
			case "</workbookPr>": break;
			case "<workbookProtection": break;
			case "<workbookProtection/>": break;
			case "<bookViews":
			case "<bookViews>":
			case "</bookViews>": break;
			case "<workbookView":
			case "<workbookView/>":
				delete l[0], n.WBView.push(l);
				break;
			case "</workbookView>": break;
			case "<sheets":
			case "<sheets>":
			case "</sheets>": break;
			case "<sheet":
				switch (l.state) {
					case "hidden":
						l.Hidden = 1;
						break;
					case "veryHidden":
						l.Hidden = 2;
						break;
					default: l.Hidden = 0;
				}
				delete l.state, l.name = Y(xn(l.name)), delete l[0], n.Sheets.push(l);
				break;
			case "</sheet>": break;
			case "<functionGroups":
			case "<functionGroups/>": break;
			case "<functionGroup": break;
			case "<externalReferences":
			case "</externalReferences>":
			case "<externalReferences>": break;
			case "<externalReference": break;
			case "<definedNames/>": break;
			case "<definedNames>":
			case "<definedNames":
				r = !0;
				break;
			case "</definedNames>":
				r = !1;
				break;
			case "<definedName":
				a = {}, a.Name = xn(l.name), l.comment && (a.Comment = l.comment), l.localSheetId && (a.Sheet = +l.localSheetId), X(l.hidden || "0") && (a.Hidden = !0), o = c + s.length;
				break;
			case "</definedName>":
				a.Ref = Y(xn(e.slice(o, c))), n.Names.push(a);
				break;
			case "<definedName/>": break;
			case "<calcPr":
				delete l[0], n.CalcPr = l;
				break;
			case "<calcPr/>":
				delete l[0], n.CalcPr = l;
				break;
			case "</calcPr>": break;
			case "<oleSize": break;
			case "<customWorkbookViews>":
			case "</customWorkbookViews>":
			case "<customWorkbookViews": break;
			case "<customWorkbookView":
			case "</customWorkbookView>": break;
			case "<pivotCaches>":
			case "</pivotCaches>":
			case "<pivotCaches": break;
			case "<pivotCache": break;
			case "<smartTagPr":
			case "<smartTagPr/>": break;
			case "<smartTagTypes":
			case "<smartTagTypes>":
			case "</smartTagTypes>": break;
			case "<smartTagType": break;
			case "<webPublishing":
			case "<webPublishing/>": break;
			case "<fileRecoveryPr":
			case "<fileRecoveryPr/>": break;
			case "<webPublishObjects>":
			case "<webPublishObjects":
			case "</webPublishObjects>": break;
			case "<webPublishObject": break;
			case "<extLst":
			case "<extLst>":
			case "</extLst>":
			case "<extLst/>": break;
			case "<ext":
				r = !0;
				break;
			case "</ext>":
				r = !1;
				break;
			case "<ArchID": break;
			case "<AlternateContent":
			case "<AlternateContent>":
				r = !0;
				break;
			case "</AlternateContent>":
				r = !1;
				break;
			case "<revisionPtr": break;
			default: if (!r && t.WTF) throw Error("unrecognized " + l[0] + " in workbook");
		}
		return s;
	}), An.indexOf(n.xmlns) === -1) throw Error("Unknown Namespace: " + n.xmlns);
	return qp(n), n;
}
function Qp(e, t) {
	var n = {};
	return n.Hidden = e.read_shift(4), n.iTabID = e.read_shift(4), n.strRelID = ei(e, t - 8), n.name = Gr(e), n;
}
function $p(e, t) {
	var n = {}, r = e.read_shift(4);
	n.defaultThemeVersion = e.read_shift(4);
	var i = t > 8 ? Gr(e) : "";
	return i.length > 0 && (n.CodeName = i), n.autoCompressPictures = !!(r & 65536), n.backupFile = !!(r & 64), n.checkCompatibility = !!(r & 4096), n.date1904 = !!(r & 1), n.filterPrivacy = !!(r & 8), n.hidePivotFieldList = !!(r & 1024), n.promptedSolutions = !!(r & 16), n.publishItems = !!(r & 2048), n.refreshAllConnections = !!(r & 262144), n.saveExternalLinkValues = !!(r & 128), n.showBorderUnselectedTables = !!(r & 4), n.showInkAnnotation = !!(r & 32), n.showObjects = [
		"all",
		"placeholders",
		"none"
	][r >> 13 & 3], n.showPivotChartFilter = !!(r & 32768), n.updateLinks = [
		"userSet",
		"never",
		"always"
	][r >> 8 & 3], n;
}
function em(e, t) {
	var n = {};
	return e.read_shift(4), n.ArchID = e.read_shift(4), e.l += t - 8, n;
}
function tm(e, t, n) {
	var r = e.l + t, i = e.read_shift(4);
	e.l += 1;
	var a = e.read_shift(4), o = $r(e), s, c = "";
	try {
		s = qd(e, 0, n);
		try {
			c = Qr(e);
		} catch {}
	} catch {
		console.error("Could not parse defined name " + o);
	}
	i & 32 && (o = "_xlnm." + o), e.l = r;
	var l = {
		Name: o,
		Ptg: s,
		Flags: i
	};
	return a < 268435455 && (l.Sheet = a), c && (l.Comment = c), l;
}
function nm(e, t) {
	var n = {
		AppVersion: {},
		WBProps: {},
		WBView: [],
		Sheets: [],
		CalcPr: {},
		xmlns: ""
	}, r = [], i = !1;
	t ||= {}, t.biff = 12;
	var a = [], o = [[]];
	return o.SheetNames = [], o.XTI = [], th[16] = {
		n: "BrtFRTArchID$",
		f: em
	}, hr(e, function(e, s, c) {
		switch (c) {
			case 156:
				o.SheetNames.push(e.name), n.Sheets.push(e);
				break;
			case 153:
				n.WBProps = e;
				break;
			case 39:
				e.Sheet != null && (t.SID = e.Sheet), e.Ref = e.Ptg ? Ld(e.Ptg, null, null, o, t) : "#REF!", delete t.SID, delete e.Ptg, a.push(e);
				break;
			case 1036: break;
			case 357:
			case 358:
			case 355:
			case 667:
				o[0].length ? o.push([c, e]) : o[0] = [c, e], o[o.length - 1].XTI = [];
				break;
			case 362:
				o.length === 0 && (o[0] = [], o[0].XTI = []), o[o.length - 1].XTI = o[o.length - 1].XTI.concat(e), o.XTI = o.XTI.concat(e);
				break;
			case 361: break;
			case 2071:
			case 158:
			case 143:
			case 664:
			case 353: break;
			case 3072:
			case 3073:
			case 534:
			case 677:
			case 157:
			case 610:
			case 2050:
			case 155:
			case 548:
			case 676:
			case 128:
			case 665:
			case 2128:
			case 2125:
			case 549:
			case 2053:
			case 596:
			case 2076:
			case 2075:
			case 2082:
			case 397:
			case 154:
			case 1117:
			case 553:
			case 2091: break;
			case 35:
				r.push(c), i = !0;
				break;
			case 36:
				r.pop(), i = !1;
				break;
			case 37:
				r.push(c), i = !0;
				break;
			case 38:
				r.pop(), i = !1;
				break;
			case 16: break;
			default: if (!s.T && (!i || t.WTF && r[r.length - 1] != 37 && r[r.length - 1] != 35)) throw Error("Unexpected record 0x" + c.toString(16));
		}
	}, t), qp(n), n.Names = a, n.supbooks = o, n;
}
function rm(e, t, n) {
	return t.slice(-4) === ".bin" ? nm(e, n) : Zp(e, n);
}
function im(e, t, n, r, i, a, o, s) {
	return t.slice(-4) === ".bin" ? Ap(e, r, n, i, a, o, s) : vf(e, r, n, i, a, o, s);
}
function am(e, t, n, r, i, a, o, s) {
	return t.slice(-4) === ".bin" ? Bp(e, r, n, i, a, o, s) : Rp(e, r, n, i, a, o, s);
}
function om(e, t, n, r, i, a, o, s) {
	return t.slice(-4) === ".bin" ? eu(e, r, n, i, a, o, s) : tu(e, r, n, i, a, o, s);
}
function sm(e, t, n, r, i, a, o, s) {
	return t.slice(-4) === ".bin" ? Ql(e, r, n, i, a, o, s) : $l(e, r, n, i, a, o, s);
}
function cm(e, t, n, r) {
	return t.slice(-4) === ".bin" ? al(e, n, r) : $c(e, n, r);
}
function lm(e, t, n) {
	return t.slice(-4) === ".bin" ? Ds(e, n) : Ts(e, n);
}
function um(e, t, n) {
	return t.slice(-4) === ".bin" ? Yl(e, n) : Wl(e, n);
}
function dm(e, t, n) {
	return t.slice(-4) === ".bin" ? El(e, t, n) : wl(e, t, n);
}
function fm(e, t, n, r) {
	if (n.slice(-4) === ".bin") return Dl(e, t, n, r);
}
function pm(e, t, n) {
	return t.slice(-4) === ".bin" ? Sl(e, t, n) : Cl(e, t, n);
}
var mm = /\b((?:\w+:)?[\w]+)=((?:")([^"]*)(?:")|(?:')([^']*)(?:'))/g, hm = /\b((?:\w+:)?[\w]+)=((?:")(?:[^"]*)(?:")|(?:')(?:[^']*)(?:'))/;
function gm(e, t) {
	var n = e.split(/\s+/), r = [];
	if (t || (r[0] = n[0]), n.length === 1) return r;
	var i = e.match(mm), a, o, s, c;
	if (i) for (c = 0; c != i.length; ++c) a = i[c].match(hm), (o = a[1].indexOf(":")) === -1 ? r[a[1]] = a[2].slice(1, a[2].length - 1) : (s = a[1].slice(0, 6) === "xmlns:" ? "xmlns" + a[1].slice(6) : a[1].slice(o + 1), r[s] = a[2].slice(1, a[2].length - 1));
	return r;
}
function _m(e) {
	var t = e.split(/\s+/), n = {};
	if (t.length === 1) return n;
	var r = e.match(mm), i, a, o, s;
	if (r) for (s = 0; s != r.length; ++s) i = r[s].match(hm), (a = i[1].indexOf(":")) === -1 ? n[i[1]] = i[2].slice(1, i[2].length - 1) : (o = i[1].slice(0, 6) === "xmlns:" ? "xmlns" + i[1].slice(6) : i[1].slice(a + 1), n[o] = i[2].slice(1, i[2].length - 1));
	return n;
}
var vm;
function ym(e, t, n) {
	var r = vm[e] || Y(e);
	return r === "General" ? _e(t) : Je(r, t, { date1904: !!n });
}
function bm(e, t, n, r) {
	var i = r;
	switch ((n[0].match(/dt:dt="([\w.]+)"/) || ["", ""])[1]) {
		case "boolean":
			i = X(r);
			break;
		case "i2":
		case "int":
			i = parseInt(r, 10);
			break;
		case "r4":
		case "float":
			i = parseFloat(r);
			break;
		case "date":
		case "dateTime.tz":
			i = vt(r);
			break;
		case "i8":
		case "string":
		case "fixed":
		case "uuid":
		case "bin.base64": break;
		default: throw Error("bad custprop:" + n[0]);
	}
	e[Y(t)] = i;
}
function xm(e, t, n, r) {
	if (e.t !== "z") {
		if (!n || n.cellText !== !1) try {
			e.w = e.t === "e" ? e.w || ki[e.v] : t === "General" ? e.t === "n" ? (e.v | 0) === e.v ? e.v.toString(10) : ge(e.v) : _e(e.v) : ym(t || "General", e.v, r);
		} catch (e) {
			if (n.WTF) throw e;
		}
		try {
			var i = vm[t] || t || "General";
			if (n.cellNF && (e.z = i), n.cellDates && e.t == "n" && Ue(i)) {
				var a = de(e.v + (r ? 1462 : 0));
				a && (e.t = "d", e.v = new Date(Date.UTC(a.y, a.m - 1, a.d, a.H, a.M, a.S, a.u)));
			}
		} catch (e) {
			if (n.WTF) throw e;
		}
	}
}
function Sm(e, t, n) {
	if (n.cellStyles && t.Interior) {
		var r = t.Interior;
		r.Pattern && (r.patternType = zc[r.Pattern] || r.Pattern);
	}
	e[t.ID] = t;
}
function Cm(e, t, n, r, i, a, o, s, c, l, u) {
	var d = "General", f = r.StyleID, p = {};
	l ||= {};
	var m = [], h = 0;
	for (f === void 0 && s && (f = s.StyleID), f === void 0 && o && (f = o.StyleID); a[f] !== void 0;) {
		var g = a[f];
		if (g.nf && (d = g.nf), g.Interior && m.push(g.Interior), !g.Parent) break;
		f = g.Parent;
	}
	switch (n.Type) {
		case "Boolean":
			r.t = "b", r.v = X(e);
			break;
		case "String":
			r.t = "s", r.r = gn(Y(e)), r.v = e.indexOf("<") > -1 ? hn(Y(t || e)) : r.r;
			break;
		case "DateTime": e.slice(-1) != "Z" && (e += "Z"), r.v = ft(vt(e, u), u), r.v !== r.v && (r.v = Y(e)), d && d != "General" || (d = "yyyy-mm-dd");
		case "Number":
			r.v === void 0 && (r.v = +e), r.t ||= "n";
			break;
		case "Error":
			r.t = "e", r.v = Ai[e], l.cellText !== !1 && (r.w = e);
			break;
		default: e == "" && t == "" ? r.t = "z" : (r.t = "s", r.v = gn(t || e));
	}
	if (xm(r, d, l, u), l.cellFormula !== !1) {
		if (r.Formula) {
			var _ = Y(r.Formula);
			_.charCodeAt(0) == 61 && (_ = _.slice(1)), r.f = nu(_, i), delete r.Formula, r.ArrayRange == "RC" ? r.F = nu("RC:RC", i) : r.ArrayRange && (r.F = nu(r.ArrayRange, i), c.push([Pr(r.F), r.F]));
		} else for (h = 0; h < c.length; ++h) i.r >= c[h][0].s.r && i.r <= c[h][0].e.r && i.c >= c[h][0].s.c && i.c <= c[h][0].e.c && (r.F = c[h][1]);
	}
	l.cellStyles && (m.forEach(function(e) {
		!p.patternType && e.patternType && (p.patternType = e.patternType);
	}), r.s = p), r.StyleID !== void 0 && (r.ixfe = r.StyleID);
}
function wm(e) {
	return ji.indexOf("_xlnm." + e) > -1 ? "_xlnm." + e : e;
}
function Tm(e) {
	e.t = e.v || "", e.t = e.t.replace(/\r\n/g, "\n").replace(/\r/g, "\n"), e.v = e.w = e.ixfe = void 0;
}
function Em(e, t) {
	var n = t || {};
	Xe();
	var r = b(Dn(e));
	(n.type == "binary" || n.type == "array" || n.type == "base64") && (r = xn(r));
	var i = r.slice(0, 1024).toLowerCase(), a = !1;
	if (i = i.replace(/".*?"/g, ""), (i.indexOf(">") & 1023) > Math.min(i.indexOf(",") & 1023, i.indexOf(";") & 1023)) {
		var o = bt(n);
		return o.type = "string", ps.to_workbook(r, o);
	}
	if (i.indexOf("<?xml") == -1 && [
		"html",
		"table",
		"head",
		"meta",
		"script",
		"style",
		"div"
	].forEach(function(e) {
		i.indexOf("<" + e) >= 0 && (a = !0);
	}), a) return Sh(r, n);
	vm = {
		"General Number": "General",
		"General Date": W[22],
		"Long Date": "dddd, mmmm dd, yyyy",
		"Medium Date": W[15],
		"Short Date": W[14],
		"Long Time": W[19],
		"Medium Time": W[18],
		"Short Time": W[20],
		Currency: "\"$\"#,##0.00_);[Red]\\(\"$\"#,##0.00\\)",
		Fixed: W[2],
		Standard: W[4],
		Percent: W[10],
		Scientific: W[11],
		"Yes/No": "\"Yes\";\"Yes\";\"No\";@",
		"True/False": "\"True\";\"True\";\"False\";@",
		"On/Off": "\"Yes\";\"Yes\";\"No\";@"
	};
	var s, c = [], l;
	C != null && n.dense == null && (n.dense = C);
	var u = Lr(), d = [], f = {}, p = "";
	n.dense && (f["!data"] = []);
	var m = {}, h = {}, g = gm("<Data ss:Type=\"String\">"), _ = 0, v = 0, y = 0, x = {
		s: {
			r: 2e6,
			c: 2e6
		},
		e: {
			r: 0,
			c: 0
		}
	}, S = {}, w = {}, T = "", E = 0, D = [], O = {}, k = {}, A = 0, j = [], M = [], ee = {}, N = [], P, F = !1, I = [], L = [], R = {}, te = 0, z = 0, B = {
		Sheets: [],
		WBProps: { date1904: !1 }
	}, V = {};
	On.lastIndex = 0, r = It(r, "<!--", "-->");
	for (var H = ""; s = On.exec(r);) switch (s[3] = (H = s[3]).toLowerCase()) {
		case "data":
			if (H == "data") {
				if (s[1] === "/") {
					if ((l = c.pop())[0] !== s[3]) throw Error("Bad state: " + l.join("|"));
				} else s[0].charAt(s[0].length - 2) !== "/" && c.push([s[3], !0]);
				break;
			}
			if (c[c.length - 1][1]) break;
			s[1] === "/" ? Cm(r.slice(_, s.index), T, g, c[c.length - 1][0] == "comment" ? ee : m, {
				c: v,
				r: y
			}, S, N[v], h, I, n, B.WBProps.date1904) : (T = "", g = gm(s[0]), _ = s.index + s[0].length);
			break;
		case "cell":
			if (s[1] === "/") {
				if (M.length > 0 && (m.c = M), (!n.sheetRows || n.sheetRows > y) && m.v !== void 0 && (n.dense ? (f["!data"][y] || (f["!data"][y] = []), f["!data"][y][v] = m) : f[Er(v) + Sr(y)] = m), m.HRef && (m.l = { Target: Y(m.HRef) }, m.HRefScreenTip && (m.l.Tooltip = m.HRefScreenTip), delete m.HRef, delete m.HRefScreenTip), (m.MergeAcross || m.MergeDown) && (te = v + (parseInt(m.MergeAcross, 10) | 0), z = y + (parseInt(m.MergeDown, 10) | 0), (te > v || z > y) && D.push({
					s: {
						c: v,
						r: y
					},
					e: {
						c: te,
						r: z
					}
				})), !n.sheetStubs) m.MergeAcross ? v = te + 1 : ++v;
				else if (m.MergeAcross || m.MergeDown) {
					for (var U = v; U <= te; ++U) for (var ne = y; ne <= z; ++ne) (U > v || ne > y) && (n.dense ? (f["!data"][ne] || (f["!data"][ne] = []), f["!data"][ne][U] = { t: "z" }) : f[Er(U) + Sr(ne)] = { t: "z" });
					v = te + 1;
				} else ++v;
			} else m = _m(s[0]), m.Index && (v = m.Index - 1), v < x.s.c && (x.s.c = v), v > x.e.c && (x.e.c = v), s[0].slice(-2) === "/>" && ++v, M = [];
			break;
		case "row":
			s[1] === "/" || s[0].slice(-2) === "/>" ? (y < x.s.r && (x.s.r = y), y > x.e.r && (x.e.r = y), s[0].slice(-2) === "/>" && (h = gm(s[0]), h.Index && (y = h.Index - 1)), v = 0, ++y) : (h = gm(s[0]), h.Index && (y = h.Index - 1), R = {}, (h.AutoFitHeight == "0" || h.Height) && (R.hpx = parseInt(h.Height, 10), R.hpt = Fc(R.hpx), L[y] = R), h.Hidden == "1" && (R.hidden = !0, L[y] = R));
			break;
		case "worksheet":
			if (s[1] === "/") {
				if ((l = c.pop())[0] !== s[3]) throw Error("Bad state: " + l.join("|"));
				d.push(p), x.s.r <= x.e.r && x.s.c <= x.e.c && (f["!ref"] = Z(x), n.sheetRows && n.sheetRows <= x.e.r && (f["!fullref"] = f["!ref"], x.e.r = n.sheetRows - 1, f["!ref"] = Z(x))), D.length && (f["!merges"] = D), N.length > 0 && (f["!cols"] = N), L.length > 0 && (f["!rows"] = L), Rr(u, p, f);
			} else x = {
				s: {
					r: 2e6,
					c: 2e6
				},
				e: {
					r: 0,
					c: 0
				}
			}, y = v = 0, c.push([s[3], !1]), l = gm(s[0]), p = Y(l.Name), f = {}, n.dense && (f["!data"] = []), D = [], I = [], L = [], V = {
				name: p,
				Hidden: 0
			}, B.Sheets.push(V);
			break;
		case "table":
			if (s[1] === "/") {
				if ((l = c.pop())[0] !== s[3]) throw Error("Bad state: " + l.join("|"));
			} else if (s[0].slice(-2) == "/>") break;
			else c.push([s[3], !1]), N = [], F = !1;
			break;
		case "style":
			s[1] === "/" ? Sm(S, w, n) : w = gm(s[0]);
			break;
		case "numberformat":
			w.nf = Y(gm(s[0]).Format || "General"), vm[w.nf] && (w.nf = vm[w.nf]);
			for (var re = 0; re != 392 && W[re] != w.nf; ++re);
			if (re == 392) {
				for (re = 57; re != 392; ++re) if (W[re] == null) {
					nt(w.nf, re);
					break;
				}
			}
			break;
		case "column":
			if (c[c.length - 1][0] !== "table" || s[1] === "/") break;
			if (P = gm(s[0]), P.Hidden && (P.hidden = !0, delete P.Hidden), P.Width && (P.wpx = parseInt(P.Width, 10)), !F && P.wpx > 10) {
				F = !0, lc = cc;
				for (var ie = 0; ie < N.length; ++ie) N[ie] && pc(N[ie]);
			}
			F && pc(P), N[P.Index - 1 || N.length] = P;
			for (var ae = 0; ae < +P.Span; ++ae) N[N.length] = bt(P);
			break;
		case "namedrange":
			if (s[1] === "/") break;
			B.Names ||= [];
			var oe = J(s[0]), se = {
				Name: wm(oe.Name),
				Ref: nu(oe.RefersTo.slice(1), {
					r: 0,
					c: 0
				})
			};
			B.Sheets.length > 0 && (se.Sheet = B.Sheets.length - 1), B.Names.push(se);
			break;
		case "namedcell": break;
		case "b": break;
		case "i": break;
		case "u": break;
		case "s": break;
		case "em": break;
		case "h2": break;
		case "h3": break;
		case "sub": break;
		case "sup": break;
		case "span": break;
		case "alignment": break;
		case "borders": break;
		case "border": break;
		case "font":
			if (s[0].slice(-2) === "/>") break;
			s[1] === "/" ? T += r.slice(E, s.index) : E = s.index + s[0].length;
			break;
		case "interior":
			if (!n.cellStyles) break;
			w.Interior = gm(s[0]);
			break;
		case "protection": break;
		case "author":
		case "title":
		case "description":
		case "created":
		case "keywords":
		case "subject":
		case "category":
		case "company":
		case "lastauthor":
		case "lastsaved":
		case "lastprinted":
		case "version":
		case "revision":
		case "totaltime":
		case "hyperlinkbase":
		case "manager":
		case "contentstatus":
		case "identifier":
		case "language":
		case "appname":
			if (s[0].slice(-2) === "/>") break;
			s[1] === "/" ? Yi(O, H, r.slice(A, s.index)) : A = s.index + s[0].length;
			break;
		case "paragraphs": break;
		case "styles":
		case "workbook":
			if (s[1] === "/") {
				if ((l = c.pop())[0] !== s[3]) throw Error("Bad state: " + l.join("|"));
			} else c.push([s[3], !1]);
			break;
		case "comment":
			if (s[1] === "/") {
				if ((l = c.pop())[0] !== s[3]) throw Error("Bad state: " + l.join("|"));
				Tm(ee), M.push(ee);
			} else c.push([s[3], !1]), l = gm(s[0]), X(l.ShowAlways || "0") || (M.hidden = !0), ee = { a: l.Author };
			break;
		case "autofilter":
			if (s[1] === "/") {
				if ((l = c.pop())[0] !== s[3]) throw Error("Bad state: " + l.join("|"));
			} else if (s[0].charAt(s[0].length - 2) !== "/") {
				var ce = gm(s[0]);
				f["!autofilter"] = { ref: nu(ce.Range).replace(/\$/g, "") }, c.push([s[3], !0]);
			}
			break;
		case "name": break;
		case "datavalidation":
			if (s[1] === "/") {
				if ((l = c.pop())[0] !== s[3]) throw Error("Bad state: " + l.join("|"));
			} else s[0].charAt(s[0].length - 2) !== "/" && c.push([s[3], !0]);
			break;
		case "pixelsperinch": break;
		case "componentoptions":
		case "documentproperties":
		case "customdocumentproperties":
		case "officedocumentsettings":
		case "pivottable":
		case "pivotcache":
		case "names":
		case "mapinfo":
		case "pagebreaks":
		case "querytable":
		case "sorting":
		case "schema":
		case "conditionalformatting":
		case "smarttagtype":
		case "smarttags":
		case "excelworkbook":
		case "workbookoptions":
		case "worksheetoptions":
			if (s[1] === "/") {
				if ((l = c.pop())[0] !== s[3]) throw Error("Bad state: " + l.join("|"));
			} else s[0].charAt(s[0].length - 2) !== "/" && c.push([s[3], !0]);
			break;
		case "null": break;
		default:
			if (c.length == 0 && s[3] == "document" || c.length == 0 && s[3] == "uof") return Vh(r, n);
			var G = !0;
			switch (c[c.length - 1][0]) {
				case "officedocumentsettings":
					switch (s[3]) {
						case "allowpng": break;
						case "removepersonalinformation": break;
						case "downloadcomponents": break;
						case "locationofcomponents": break;
						case "colors": break;
						case "color": break;
						case "index": break;
						case "rgb": break;
						case "targetscreensize": break;
						case "readonlyrecommended": break;
						default: G = !1;
					}
					break;
				case "componentoptions":
					switch (s[3]) {
						case "toolbar": break;
						case "hideofficelogo": break;
						case "spreadsheetautofit": break;
						case "label": break;
						case "caption": break;
						case "maxheight": break;
						case "maxwidth": break;
						case "nextsheetnumber": break;
						default: G = !1;
					}
					break;
				case "excelworkbook":
					switch (s[3]) {
						case "date1904":
							B.WBProps.date1904 = !0;
							break;
						case "hidehorizontalscrollbar": break;
						case "hideverticalscrollbar": break;
						case "hideworkbooktabs": break;
						case "windowheight": break;
						case "windowwidth": break;
						case "windowtopx": break;
						case "windowtopy": break;
						case "tabratio": break;
						case "protectstructure": break;
						case "protectwindow": break;
						case "protectwindows": break;
						case "activesheet": break;
						case "displayinknotes": break;
						case "firstvisiblesheet": break;
						case "supbook": break;
						case "sheetname": break;
						case "sheetindex": break;
						case "sheetindexfirst": break;
						case "sheetindexlast": break;
						case "dll": break;
						case "acceptlabelsinformulas": break;
						case "donotsavelinkvalues": break;
						case "iteration": break;
						case "maxiterations": break;
						case "maxchange": break;
						case "path": break;
						case "xct": break;
						case "count": break;
						case "selectedsheets": break;
						case "calculation": break;
						case "uncalced": break;
						case "startupprompt": break;
						case "crn": break;
						case "externname": break;
						case "formula": break;
						case "colfirst": break;
						case "collast": break;
						case "wantadvise": break;
						case "boolean": break;
						case "error": break;
						case "text": break;
						case "ole": break;
						case "noautorecover": break;
						case "publishobjects": break;
						case "donotcalculatebeforesave": break;
						case "number": break;
						case "refmoder1c1": break;
						case "embedsavesmarttags": break;
						default: G = !1;
					}
					break;
				case "workbookoptions":
					switch (s[3]) {
						case "owcversion": break;
						case "height": break;
						case "width": break;
						default: G = !1;
					}
					break;
				case "worksheetoptions":
					switch (s[3]) {
						case "visible":
							if (s[0].slice(-2) !== "/>") {
								if (s[1] === "/") switch (r.slice(A, s.index)) {
									case "SheetHidden":
										V.Hidden = 1;
										break;
									case "SheetVeryHidden": V.Hidden = 2;
								}
								else A = s.index + s[0].length;
							}
							break;
						case "header":
							f["!margins"] || nf(f["!margins"] = {}, "xlml"), isNaN(+J(s[0]).Margin) || (f["!margins"].header = +J(s[0]).Margin);
							break;
						case "footer":
							f["!margins"] || nf(f["!margins"] = {}, "xlml"), isNaN(+J(s[0]).Margin) || (f["!margins"].footer = +J(s[0]).Margin);
							break;
						case "pagemargins":
							var K = J(s[0]);
							f["!margins"] || nf(f["!margins"] = {}, "xlml"), isNaN(+K.Top) || (f["!margins"].top = +K.Top), isNaN(+K.Left) || (f["!margins"].left = +K.Left), isNaN(+K.Right) || (f["!margins"].right = +K.Right), isNaN(+K.Bottom) || (f["!margins"].bottom = +K.Bottom);
							break;
						case "displayrighttoleft":
							B.Views ||= [], B.Views[0] || (B.Views[0] = {}), B.Views[0].RTL = !0;
							break;
						case "freezepanes": break;
						case "frozennosplit": break;
						case "splithorizontal":
						case "splitvertical": break;
						case "donotdisplaygridlines": break;
						case "activerow": break;
						case "activecol": break;
						case "toprowbottompane": break;
						case "leftcolumnrightpane": break;
						case "unsynced": break;
						case "print": break;
						case "printerrors": break;
						case "panes": break;
						case "scale": break;
						case "pane": break;
						case "number": break;
						case "layout": break;
						case "pagesetup": break;
						case "selected": break;
						case "protectobjects": break;
						case "enableselection": break;
						case "protectscenarios": break;
						case "validprinterinfo": break;
						case "horizontalresolution": break;
						case "verticalresolution": break;
						case "numberofcopies": break;
						case "activepane": break;
						case "toprowvisible": break;
						case "leftcolumnvisible": break;
						case "fittopage": break;
						case "rangeselection": break;
						case "papersizeindex": break;
						case "pagelayoutzoom": break;
						case "pagebreakzoom": break;
						case "filteron": break;
						case "fitwidth": break;
						case "fitheight": break;
						case "commentslayout": break;
						case "zoom": break;
						case "lefttoright": break;
						case "gridlines": break;
						case "allowsort": break;
						case "allowfilter": break;
						case "allowinsertrows": break;
						case "allowdeleterows": break;
						case "allowinsertcols": break;
						case "allowdeletecols": break;
						case "allowinserthyperlinks": break;
						case "allowformatcells": break;
						case "allowsizecols": break;
						case "allowsizerows": break;
						case "nosummaryrowsbelowdetail":
							f["!outline"] || (f["!outline"] = {}), f["!outline"].above = !0;
							break;
						case "tabcolorindex": break;
						case "donotdisplayheadings": break;
						case "showpagelayoutzoom": break;
						case "nosummarycolumnsrightdetail":
							f["!outline"] || (f["!outline"] = {}), f["!outline"].left = !0;
							break;
						case "blackandwhite": break;
						case "donotdisplayzeros": break;
						case "displaypagebreak": break;
						case "rowcolheadings": break;
						case "donotdisplayoutline": break;
						case "noorientation": break;
						case "allowusepivottables": break;
						case "zeroheight": break;
						case "viewablerange": break;
						case "selection": break;
						case "protectcontents": break;
						default: G = !1;
					}
					break;
				case "pivottable":
				case "pivotcache":
					switch (s[3]) {
						case "immediateitemsondrop": break;
						case "showpagemultipleitemlabel": break;
						case "compactrowindent": break;
						case "location": break;
						case "pivotfield": break;
						case "orientation": break;
						case "layoutform": break;
						case "layoutsubtotallocation": break;
						case "layoutcompactrow": break;
						case "position": break;
						case "pivotitem": break;
						case "datatype": break;
						case "datafield": break;
						case "sourcename": break;
						case "parentfield": break;
						case "ptlineitems": break;
						case "ptlineitem": break;
						case "countofsameitems": break;
						case "item": break;
						case "itemtype": break;
						case "ptsource": break;
						case "cacheindex": break;
						case "consolidationreference": break;
						case "filename": break;
						case "reference": break;
						case "nocolumngrand": break;
						case "norowgrand": break;
						case "blanklineafteritems": break;
						case "hidden": break;
						case "subtotal": break;
						case "basefield": break;
						case "mapchilditems": break;
						case "function": break;
						case "refreshonfileopen": break;
						case "printsettitles": break;
						case "mergelabels": break;
						case "defaultversion": break;
						case "refreshname": break;
						case "refreshdate": break;
						case "refreshdatecopy": break;
						case "versionlastrefresh": break;
						case "versionlastupdate": break;
						case "versionupdateablemin": break;
						case "versionrefreshablemin": break;
						case "calculation": break;
						default: G = !1;
					}
					break;
				case "pagebreaks":
					switch (s[3]) {
						case "colbreaks": break;
						case "colbreak": break;
						case "rowbreaks": break;
						case "rowbreak": break;
						case "colstart": break;
						case "colend": break;
						case "rowend": break;
						default: G = !1;
					}
					break;
				case "autofilter":
					switch (s[3]) {
						case "autofiltercolumn": break;
						case "autofiltercondition": break;
						case "autofilterand": break;
						case "autofilteror": break;
						default: G = !1;
					}
					break;
				case "querytable":
					switch (s[3]) {
						case "id": break;
						case "autoformatfont": break;
						case "autoformatpattern": break;
						case "querysource": break;
						case "querytype": break;
						case "enableredirections": break;
						case "refreshedinxl9": break;
						case "urlstring": break;
						case "htmltables": break;
						case "connection": break;
						case "commandtext": break;
						case "refreshinfo": break;
						case "notitles": break;
						case "nextid": break;
						case "columninfo": break;
						case "overwritecells": break;
						case "donotpromptforfile": break;
						case "textwizardsettings": break;
						case "source": break;
						case "number": break;
						case "decimal": break;
						case "thousandseparator": break;
						case "trailingminusnumbers": break;
						case "formatsettings": break;
						case "fieldtype": break;
						case "delimiters": break;
						case "tab": break;
						case "comma": break;
						case "autoformatname": break;
						case "versionlastedit": break;
						case "versionlastrefresh": break;
						default: G = !1;
					}
					break;
				case "datavalidation":
					switch (s[3]) {
						case "range": break;
						case "type": break;
						case "min": break;
						case "max": break;
						case "sort": break;
						case "descending": break;
						case "order": break;
						case "casesensitive": break;
						case "value": break;
						case "errorstyle": break;
						case "errormessage": break;
						case "errortitle": break;
						case "inputmessage": break;
						case "inputtitle": break;
						case "combohide": break;
						case "inputhide": break;
						case "condition": break;
						case "qualifier": break;
						case "useblank": break;
						case "value1": break;
						case "value2": break;
						case "format": break;
						case "cellrangelist": break;
						default: G = !1;
					}
					break;
				case "sorting":
				case "conditionalformatting":
					switch (s[3]) {
						case "range": break;
						case "type": break;
						case "min": break;
						case "max": break;
						case "sort": break;
						case "descending": break;
						case "order": break;
						case "casesensitive": break;
						case "value": break;
						case "errorstyle": break;
						case "errormessage": break;
						case "errortitle": break;
						case "cellrangelist": break;
						case "inputmessage": break;
						case "inputtitle": break;
						case "combohide": break;
						case "inputhide": break;
						case "condition": break;
						case "qualifier": break;
						case "useblank": break;
						case "value1": break;
						case "value2": break;
						case "format": break;
						default: G = !1;
					}
					break;
				case "mapinfo":
				case "schema":
				case "data":
					switch (s[3]) {
						case "map": break;
						case "entry": break;
						case "range": break;
						case "xpath": break;
						case "field": break;
						case "xsdtype": break;
						case "filteron": break;
						case "aggregate": break;
						case "elementtype": break;
						case "attributetype": break;
						case "schema":
						case "element":
						case "complextype":
						case "datatype":
						case "all":
						case "attribute":
						case "extends": break;
						case "row": break;
						default: G = !1;
					}
					break;
				case "smarttags": break;
				default: G = !1;
			}
			if (G || s[3].match(/!\[CDATA/)) break;
			if (!c[c.length - 1][1]) throw "Unrecognized tag: " + s[3] + "|" + c.join("|");
			if (c[c.length - 1][0] === "customdocumentproperties") {
				if (s[0].slice(-2) === "/>") break;
				s[1] === "/" ? bm(k, H, j, r.slice(A, s.index)) : (j = s, A = s.index + s[0].length);
				break;
			}
			if (n.WTF) throw "Unrecognized tag: " + s[3] + "|" + c.join("|");
	}
	var le = {};
	return !n.bookSheets && !n.bookProps && (le.Sheets = u), le.SheetNames = d, le.Workbook = B, le.SSF = bt(W), le.Props = O, le.Custprops = k, le.bookType = "xlml", le;
}
function Dm(e, t) {
	switch (vg(t ||= {}), t.type || "base64") {
		case "base64": return Em(O(e), t);
		case "binary":
		case "buffer":
		case "file": return Em(e, t);
		case "array": return Em(P(e), t);
	}
}
function Om(e) {
	var t = {}, n = e.content;
	if (n.l = 28, t.AnsiUserType = n.read_shift(0, "lpstr-ansi"), t.AnsiClipboardFormat = ci(n), n.length - n.l <= 4) return t;
	var r = n.read_shift(4);
	if (r == 0 || r > 40 || (n.l -= 4, t.Reserved1 = n.read_shift(0, "lpstr-ansi"), n.length - n.l <= 4) || (r = n.read_shift(4), r !== 1907505652) || (t.UnicodeClipboardFormat = li(n), r = n.read_shift(4), r == 0 || r > 40)) return t;
	n.l -= 4, t.Reserved2 = n.read_shift(0, "lpwstr");
}
var km = [
	60,
	1084,
	2066,
	2165,
	2175
];
function Am(e, t, n, r, i) {
	var a = r, o = [], s = n.slice(n.l, n.l + a);
	if (i && i.enc && i.enc.insitu && s.length > 0) switch (e) {
		case 9:
		case 521:
		case 1033:
		case 2057:
		case 47:
		case 405:
		case 225:
		case 406:
		case 312:
		case 404:
		case 10: break;
		case 133: break;
		default: i.enc.insitu(s);
	}
	o.push(s), n.l += a;
	for (var c = tr(n, n.l), l = nh[c], u = 0; l != null && km.indexOf(c) > -1;) a = tr(n, n.l + 2), u = n.l + 4, c == 2066 ? u += 4 : (c == 2165 || c == 2175) && (u += 12), s = n.slice(u, n.l + 4 + a), o.push(s), n.l += 4 + a, l = nh[c = tr(n, n.l)];
	var d = I(o);
	fr(d, 0);
	var f = 0;
	d.lens = [];
	for (var p = 0; p < o.length; ++p) d.lens.push(f), f += o[p].length;
	if (d.length < r) throw "XLS Record 0x" + e.toString(16) + " Truncated: " + d.length + " < " + r;
	return t.f(d, d.length, i);
}
function jm(e, t, n) {
	if (e.t !== "z" && e.XF) {
		var r = 0;
		try {
			r = e.z || e.XF.numFmtId || 0, t.cellNF && e.z == null && (e.z = W[r]);
		} catch (e) {
			if (t.WTF) throw e;
		}
		if (!t || t.cellText !== !1) try {
			e.w = e.t === "e" ? e.w || ki[e.v] : r === 0 || r == "General" ? e.t === "n" ? (e.v | 0) === e.v ? e.v.toString(10) : ge(e.v) : _e(e.v) : Je(r, e.v, {
				date1904: !!n,
				dateNF: t && t.dateNF
			});
		} catch (e) {
			if (t.WTF) throw e;
		}
		if (t.cellDates && r && e.t == "n" && Ue(W[r] || String(r))) {
			var i = de(e.v + (n ? 1462 : 0));
			i && (e.t = "d", e.v = new Date(Date.UTC(i.y, i.m - 1, i.d, i.H, i.M, i.S, i.u)));
		}
	}
}
function Mm(e, t, n) {
	return {
		v: e,
		ixfe: t,
		t: n
	};
}
var Nm = [
	"none",
	"thin",
	"medium",
	"dashed",
	"dotted",
	"thick",
	"double",
	"hair",
	"mediumDashed",
	"dashDot",
	"mediumDashDot",
	"dashDotDot",
	"mediumDashDotDot",
	"slantDashDot"
], Pm = [
	null,
	"left",
	"center",
	"right",
	"fill",
	"justify",
	"centerContinuous",
	"distributed"
], Fm = [
	"top",
	"center",
	"bottom",
	"justify",
	"distributed"
];
function Im(e, t) {
	var n = e.l + t, r = {};
	return t >= 16 && (r.x = e.read_shift(4, "i"), r.y = e.read_shift(4, "i"), r.w = e.read_shift(4, "i"), r.h = e.read_shift(4, "i")), e.l = n, r;
}
function Lm(e, t) {
	var n = e.l + t, r = {};
	return t >= 12 && (r.catType = e.read_shift(2), r.valType = e.read_shift(2), r.cCat = e.read_shift(2), r.cVal = e.read_shift(2), r.bubbleType = e.read_shift(2), r.cBubble = e.read_shift(2)), e.l = n, r;
}
function Rm(e, t, n) {
	var r = e.l + t, i = {};
	t >= 2 && (i.id = e.read_shift(2));
	try {
		e.l < r && (i.text = va(e, r - e.l, n));
	} catch {
		e.l = r;
	}
	return e.l = r, i;
}
function zm(e, t) {
	var n = e.l + t, r = {};
	return t >= 20 && (r.x = e.read_shift(4, "i"), r.y = e.read_shift(4, "i"), r.w = e.read_shift(4, "i"), r.h = e.read_shift(4, "i"), r.dock = e.read_shift(1), r.spacing = e.read_shift(1), r.flags = e.read_shift(2)), e.l = n, r;
}
function Bm(e, t) {
	var n = e.l + t, r = {};
	return t >= 2 && (r.axisType = e.read_shift(2)), e.l = n, r;
}
function Vm(e, t) {
	var n = e.l + t, r = {};
	return t >= 32 && (r.hAlign = e.read_shift(1), r.vAlign = e.read_shift(1), r.bgMode = e.read_shift(2), r.color = e.read_shift(4), r.x = e.read_shift(4, "i"), r.y = e.read_shift(4, "i"), r.w = e.read_shift(4, "i"), r.h = e.read_shift(4, "i")), e.l = n, r;
}
function Hm(e, t) {
	var n = e.l + t, r = {};
	if (t >= 6) {
		r.id = e.read_shift(1), r.rt = e.read_shift(1), r.flags = e.read_shift(2);
		var i = e.read_shift(2);
		r.cce = i, r.formulaRaw = e.slice(e.l, Math.min(n, e.l + i));
	}
	return e.l = n, r;
}
function Um(e) {
	return function(t, n) {
		var r = t.l + n, i = { type: e };
		return n >= 2 && (i.flags = t.read_shift(2)), t.l = r, i;
	};
}
var Wm = Um("barChart"), Gm = Um("lineChart"), Km = Um("pieChart"), qm = Um("areaChart"), Jm = Um("scatterChart"), Ym = Um("radarChart"), Xm = Um("surfaceChart");
function Zm(e, t) {
	var n = { opts: {} }, r = Lr();
	C != null && t.dense == null && (t.dense = C);
	var i = {};
	t.dense && (i["!data"] = []);
	var a = {}, o = {}, s = null, c = [], l = "", u = {}, d, f = "", p, h, g, _, v = {}, y = [], b, x, S = [], w = [], T = {}, E = [], O = {
		Sheets: [],
		WBProps: { date1904: !1 },
		Views: [{}]
	}, k = {}, A = !1, j = function(e) {
		return e < 8 ? Oi[e] : e < 64 && E[e - 8] || Oi[e];
	}, M = function(e) {
		if (e == null) return null;
		var t = j(e), n = {
			indexed: e,
			index: e
		};
		return t && (n.rgb = tc(t)), oc(n, H);
	}, ee = function(e) {
		if (!e) return null;
		var t = {};
		switch (e.xclrType) {
			case 0:
				t.auto = 1;
				break;
			case 1:
				t = M(e.xclrValue) || {};
				break;
			case 2:
				t.rgb = tc(e.xclrValue);
				break;
			case 3: t.theme = e.xclrValue;
		}
		return e.nTintShade && (t.tint = e.nTintShade > 0 ? e.nTintShade / 32767 : e.nTintShade / 32768), oc(t, H);
	}, N = function(e, t) {
		if (!e) return null;
		var n = {};
		return e.name && (n.name = e.name), e.sz && (n.sz = e.sz), e.bold && (n.bold = !0), e.italic && (n.italic = !0), e.underline && (n.underline = e.underline), e.strike && (n.strike = !0), e.outline && (n.outline = !0), e.shadow && (n.shadow = !0), e.family != null && (n.family = e.family), e.charset != null && (n.charset = e.charset), e.vertAlign == 1 ? n.vertAlign = "superscript" : e.vertAlign == 2 && (n.vertAlign = "subscript"), t && t.fontScheme != null && (n.scheme = t.fontScheme == 1 ? "major" : t.fontScheme == 2 ? "minor" : "none"), n.color = ee(t && t.xfextFont) || M(e.icv), n.color && n.color.auto && delete n.color, n;
	}, P = function(e) {
		if (!e) return null;
		var t = { patternType: e.patternType || "none" }, n = ee(e.xfextFore) || M(e.icvFore), r = ee(e.xfextBack) || M(e.icvBack);
		return n && (t.fgColor = n), r && (t.bgColor = r), e.gradientFill && (t.gradientFill = e.gradientFill), t;
	}, F = function(e, t, n) {
		if (!e) return null;
		var r = { style: Nm[e] || "thin" }, i = ee(n) || M(t);
		return i && (r.color = i), r;
	}, I = function(e) {
		if (!e) return null;
		var t = {}, n;
		return (n = F(e.dgLeft, e.icvLeft, e.xfextLeft)) && (t.left = n), (n = F(e.dgRight, e.icvRight, e.xfextRight)) && (t.right = n), (n = F(e.dgTop, e.icvTop, e.xfextTop)) && (t.top = n), (n = F(e.dgBottom, e.icvBottom, e.xfextBottom)) && (t.bottom = n), (n = F(e.dgDiag, e.icvDiag, e.xfextDiag)) && (t.diagonal = n), e.grbitDiag & 1 && (t.diagonalUp = !0), e.grbitDiag & 2 && (t.diagonalDown = !0), st(t).length ? t : null;
	}, L = function(e) {
		if (!e) return null;
		var t = {};
		return Pm[e.alc] && (t.horizontal = Pm[e.alc]), Fm[e.alcV] && e.alcV != 2 && (t.vertical = Fm[e.alcV]), e.fWrap && (t.wrapText = !0), e.fShrinkToFit && (t.shrinkToFit = !0), e.trot && (t.textRotation = e.trot), e.cIndent && (t.indent = e.cIndent), e.iReadOrder && (t.readingOrder = e.iReadOrder), st(t).length ? t : null;
	}, R = function(e, t) {
		if (!t) return e;
		var n = t.data || {};
		t.numFmtId != null && (e.numFmtId = t.numFmtId, W[t.numFmtId] != null && (e.numFmt = W[t.numFmtId]));
		var r = N(w[t.ifnt], t);
		r && (e.font = r);
		var i = P(n);
		i && (e.fill = i, af(e, i));
		var a = I(n);
		a && (e.border = a);
		var o = L(n);
		return o && (e.alignment = o), (t.locked || t.hidden) && (e.protection = {
			locked: t.locked,
			hidden: t.hidden
		}), e;
	}, te = function(e, t) {
		if (!e) return null;
		if (t ??= S.indexOf(e), T[t]) return T[t];
		var n = {
			id: t,
			xf: bt(e)
		};
		return !e.fStyle && e.xfId != null && e.xfId !== t && S[e.xfId] && rf(n, te(S[e.xfId], e.xfId)), n.id = t, n.xf = bt(e), R(n, e), T[t] = n;
	}, z = function(e, t) {
		if (e.XF && t && t.cellStyles) {
			var n = te(e.XF, e.ixfe);
			n && (e.s = n);
		}
	}, B = function(e, t, n) {
		if (!(!A && ue > 1) && !(n.sheetRows && e.r >= n.sheetRows)) {
			if (n.cellStyles && t.XF && t.XF.data && z(t, n), delete t.ixfe, delete t.XF, d = e, f = jr(e), o && o.s && o.e || (o = {
				s: {
					r: 0,
					c: 0
				},
				e: {
					r: 0,
					c: 0
				}
			}), e.r < o.s.r && (o.s.r = e.r), e.c < o.s.c && (o.s.c = e.c), e.r + 1 > o.e.r && (o.e.r = e.r + 1), e.c + 1 > o.e.c && (o.e.c = e.c + 1), n.cellFormula && t.f) {
				for (var r = 0; r < y.length; ++r) if (!(y[r][0].s.c > e.c || y[r][0].s.r > e.r) && !(y[r][0].e.c < e.c || y[r][0].e.r < e.r)) {
					t.F = Z(y[r][0]), (y[r][0].s.c != e.c || y[r][0].s.r != e.r) && delete t.f, t.f &&= "" + Ld(y[r][1], o, e, K, V);
					break;
				}
			}
			n.dense ? (i["!data"][e.r] || (i["!data"][e.r] = []), i["!data"][e.r][e.c] = t) : i[f] = t;
		}
	}, V = {
		enc: !1,
		sbcch: 0,
		snames: [],
		sharedf: v,
		arrayf: y,
		rrtabid: [],
		lastuser: "",
		biff: 8,
		codepage: 0,
		winlocked: 0,
		cellStyles: !!t && !!t.cellStyles,
		drawings: !!t && !!t.drawings,
		charts: !!t && !!t.charts,
		WTF: !!t && !!t.WTF
	};
	t.password && (V.password = t.password);
	var H, U = [], ne = [], re = [], ie = [], ae = !1, oe = { blips: [] }, se = null, ce = [], G = null, K = [];
	K.SheetNames = V.snames, K.sharedf = V.sharedf, K.arrayf = V.arrayf, K.names = [], K.XTI = [];
	var le = 0, ue = 0, de = 0, fe = [], pe = [], me, he = function() {
		return se ||= {
			raw: [],
			images: [],
			shapes: [],
			charts: []
		}, se;
	}, ge = function(e) {
		if (e && (t.drawings || t.charts)) {
			if (e.groups && e.blips) oe.blips = oe.blips.concat(e.blips);
			else {
				var n = he();
				e.raw && n.raw.push(e.raw), e.blips && e.blips.length && (oe.blips = oe.blips.concat(e.blips)), (e.shapes || []).forEach(function(e) {
					ce.push(e);
					var t = e.blipId == null ? null : oe.blips[e.blipId - 1];
					t && t.dataURI ? n.images.push({
						id: "xls-image-" + (n.images.length + 1),
						objectId: e.spid,
						biffType: "msoDrawing",
						anchor: e.anchor,
						dataURI: t.dataURI,
						contentType: t.contentType,
						raw: e.raw
					}) : n.shapes.push({
						id: "xls-shape-" + (n.shapes.length + 1),
						objectId: e.spid,
						biffType: "msoDrawing",
						anchor: e.anchor,
						props: e.props,
						raw: e.raw
					});
				});
			}
		}
	}, _e = function(e) {
		if (e && e.ImData && e.ImData.data && (t.drawings || t.charts)) {
			var n = he(), r = e.ImData.data, i = Bl(r, 0, r.length), a = e._shape || {}, o = {
				id: "xls-imdata-" + (n.images.length + 1),
				objectId: e.cmo && e.cmo[0],
				biffType: "imData",
				anchor: a.anchor,
				raw: e.ImData
			};
			i[1] ? (o.contentType = i[1], o.dataURI = "data:" + i[1] + ";base64," + D(r.slice(i[0])), n.images.push(o)) : n.shapes.push({
				id: "xls-imdata-" + (n.shapes.length + 1),
				objectId: o.objectId,
				biffType: "imData",
				anchor: a.anchor,
				raw: e.ImData
			});
		}
	}, ve = function() {
		G = {
			type: null,
			title: "",
			series: [],
			seriesText: [],
			raw: [],
			current: null
		};
	}, ye = function(e, t) {
		switch (G || ve(), G.raw.push({
			rt: e,
			v: t
		}), e) {
			case 4099:
				G.current = {
					raw: t,
					name: "",
					data: []
				}, G.series.push(G.current);
				break;
			case 4109:
				t && t.text && (G.current && !G.current.name ? G.current.name = t.text : G.title ? G.seriesText.push(t.text) : G.title = t.text);
				break;
			case 4119:
			case 4120:
			case 4121:
			case 4122:
			case 4123:
			case 4158:
			case 4159:
				t && t.type && (G.type = t.type);
				break;
			case 4177: G.current && (G.current.brai || (G.current.brai = []), G.current.brai.push(t));
		}
	}, be = function(e) {
		if (!G || !G.raw.length) return null;
		var t = {
			type: G.type || "barChart",
			title: G.title,
			series: [],
			raw: G.raw
		};
		if (e && e["!ref"]) {
			var n = Pr(e["!ref"]), r = e["!data"] != null, i, a, o, s = !1;
			for (a = n.s.r; a <= n.e.r; ++a) o = r ? (e["!data"][a] || [])[n.s.c] : e[jr({
				r: a,
				c: n.s.c
			})], o && o.t == "n" && (s = !0);
			var c = [];
			if (!s && n.e.c > n.s.c) for (a = n.s.r; a <= n.e.r; ++a) o = r ? (e["!data"][a] || [])[n.s.c] : e[jr({
				r: a,
				c: n.s.c
			})], c.push(o ? o.w || o.v : "");
			for (i = n.s.c + +!!c.length; i <= n.e.c; ++i) {
				var l = [], u = (G.series[i - n.s.c] || G.series[i - n.s.c - 1] || {}).name || "";
				for (a = n.s.r; a <= n.e.r; ++a) o = r ? (e["!data"][a] || [])[i] : e[jr({
					r: a,
					c: i
				})], o && o.t == "n" ? l.push(o.v) : o && o.v != null && !isNaN(+o.v) && l.push(+o.v);
				l.length && t.series.push({
					name: u,
					data: l,
					val: { values: l },
					cat: { values: c }
				});
			}
		}
		return t.series.length || G.series.forEach(function(e) {
			t.series.push({
				name: e.name || "",
				data: [],
				raw: e
			});
		}), t;
	}, xe = function(e) {
		if (e["!merges"] && e["!merges"].length) {
			var n = lf(e, { WTF: !!(t && t.validateMerges) });
			n.length && (e["!mergeErrors"] = n);
		}
		se && (se.images.length || se.shapes.length || se.charts.length || se.raw.length) && (e["!drawings"] = se);
		var r = t.charts ? be(e) : null;
		r && (e["!chart"] = r, e["!charts"] ||= [], se && se.charts.length ? se.charts.forEach(function(t) {
			t.model ||= r, e["!charts"].push(t);
		}) : e["!charts"].push({
			id: "xls-chart-" + e["!charts"].length,
			title: r.title,
			model: r,
			raw: r.raw,
			anchor: {
				type: "absoluteAnchor",
				pos: {
					x: 0,
					y: 0
				},
				ext: {
					cx: 4572e3,
					cy: 2743200
				}
			}
		}));
	};
	V.codepage = 1200, m(1200);
	for (var Se = !1; e.l < e.length - 1;) {
		var Ce = e.l, we = e.read_shift(2);
		if (we === 0 && le === 10) break;
		var Te = e.l === e.length ? 0 : e.read_shift(2), Ee = nh[we];
		if (ue == 0 && [
			9,
			521,
			1033,
			2057
		].indexOf(we) == -1) break;
		if (Ee && Ee.f) {
			if (t.bookSheets && le === 133 && we !== 133) break;
			if (le = we, Ee.r === 2 || Ee.r == 12) {
				var De = e.read_shift(2);
				if (Te -= 2, !V.enc && De !== we && ((De & 255) << 8 | De >> 8) !== we) throw Error("rt mismatch: " + De + "!=" + we);
				Ee.r == 12 && (e.l += 10, Te -= 10);
			}
			var q = {};
			if (q = we === 10 ? Ee.f(e, Te, V) : Am(we, Ee, e, Te, V), ue == 0 && [
				9,
				521,
				1033,
				2057
			].indexOf(le) === -1) continue;
			switch (we) {
				case 34:
					n.opts.Date1904 = O.WBProps.date1904 = q;
					break;
				case 134:
					n.opts.WriteProtect = !0;
					break;
				case 47:
					if (V.enc || (e.l = 0), V.enc = q, !t.password) throw Error("File is password-protected");
					if (q.valid == null) throw Error("Encryption scheme unsupported");
					if (!q.valid) throw Error("Password is incorrect");
					break;
				case 92:
					V.lastuser = q;
					break;
				case 66:
					var Oe = Number(q);
					switch (Oe) {
						case 21010:
							Oe = 1200;
							break;
						case 32768:
							Oe = 1e4;
							break;
						case 32769: Oe = 1252;
					}
					m(V.codepage = Oe), Se = !0;
					break;
				case 317:
					V.rrtabid = q;
					break;
				case 25:
					V.winlocked = q;
					break;
				case 439:
					n.opts.RefreshAll = q;
					break;
				case 12:
					n.opts.CalcCount = q;
					break;
				case 16:
					n.opts.CalcDelta = q;
					break;
				case 17:
					n.opts.CalcIter = q;
					break;
				case 13:
					n.opts.CalcMode = q;
					break;
				case 14:
					n.opts.CalcPrecision = q;
					break;
				case 95:
					n.opts.CalcSaveRecalc = q;
					break;
				case 15:
					V.CalcRefMode = q;
					break;
				case 2211:
					n.opts.FullCalc = q;
					break;
				case 129:
					q.fDialog && (i["!type"] = "dialog"), q.fBelow || ((i["!outline"] || (i["!outline"] = {})).above = !0), q.fRight || ((i["!outline"] || (i["!outline"] = {})).left = !0);
					break;
				case 67:
				case 579:
				case 1091:
				case 224:
					S.push(q);
					break;
				case 49:
					w.push(q), V.biff >= 5 && w.length == 4 && w.push(null);
					break;
				case 430:
					K.push([q]), K[K.length - 1].XTI = [];
					break;
				case 35:
				case 547:
					K[K.length - 1].push(q);
					break;
				case 24:
				case 536:
					me = {
						Name: q.Name,
						Ref: Ld(q.rgce, o, null, K, V)
					}, q.itab > 0 && (me.Sheet = q.itab - 1), K.names.push(me), K[0] || (K[0] = [], K[0].XTI = []), K[K.length - 1].push(q), q.Name == "_xlnm._FilterDatabase" && q.itab > 0 && q.rgce && q.rgce[0] && q.rgce[0][0] && q.rgce[0][0][0] == "PtgArea3d" && (pe[q.itab - 1] = { ref: Z(q.rgce[0][0][1][2]) });
					break;
				case 22:
					V.ExternCount = q;
					break;
				case 23:
					K.length == 0 && (K[0] = [], K[0].XTI = []), K[K.length - 1].XTI = K[K.length - 1].XTI.concat(q), K.XTI = K.XTI.concat(q);
					break;
				case 2196:
					if (V.biff < 8) break;
					me != null && (me.Comment = q[1]);
					break;
				case 18:
					i["!protect"] = q;
					break;
				case 19:
					q !== 0 && V.WTF && console.error("Password verifier: " + q);
					break;
				case 133:
					a[V.biff == 4 ? V.snames.length : q.pos] = q, V.snames.push(q.name);
					break;
				case 10:
					if (--ue ? !A : A) break;
					if (o.e) {
						if (o.e.r > 0 && o.e.c > 0) {
							if (o.e.r--, o.e.c--, i["!ref"] = Z(o), t.sheetRows && t.sheetRows <= o.e.r) {
								var ke = o.e.r;
								o.e.r = t.sheetRows - 1, i["!fullref"] = i["!ref"], i["!ref"] = Z(o), o.e.r = ke;
							}
							o.e.r++, o.e.c++;
						}
						U.length > 0 && (i["!merges"] = U), ne.length > 0 && (i["!objects"] = ne), re.length > 0 && (i["!cols"] = re), ie.length > 0 && (i["!rows"] = ie), xe(i), O.Sheets.push(k);
					}
					l === "" ? u = i : Rr(r, l, i), i = {}, t.dense && (i["!data"] = []);
					break;
				case 9:
				case 521:
				case 1033:
				case 2057:
					if (V.biff === 8 && (V.biff = {
						9: 2,
						521: 3,
						1033: 4
					}[we] || {
						512: 2,
						768: 3,
						1024: 4,
						1280: 5,
						1536: 8,
						2: 2,
						7: 2
					}[q.BIFFVer] || 8), V.biffguess = q.BIFFVer == 0, q.BIFFVer == 0 && q.dt == 4096 && (V.biff = 5, Se = !0, m(V.codepage = 28591)), V.biff == 4 && q.dt & 256 && (A = !0), V.biff == 8 && q.BIFFVer == 0 && q.dt == 16 && (V.biff = 2), ue++ && !A) break;
					if (i = {}, t.dense && (i["!data"] = []), V.biff < 8 && !Se && (Se = !0, m(V.codepage = t.codepage || 1252)), V.biff == 4 && A) l = (a[V.snames.indexOf(l) + 1] || { name: "" }).name;
					else if (V.biff < 5 || q.BIFFVer == 0 && q.dt == 4096) {
						l === "" && (l = "Sheet1"), o = {
							s: {
								r: 0,
								c: 0
							},
							e: {
								r: 0,
								c: 0
							}
						};
						var Ae = {
							pos: e.l - Te,
							name: l
						};
						a[Ae.pos] = Ae, V.snames.push(l);
					} else l = (a[Ce] || { name: "" }).name;
					q.dt == 32 && (i["!type"] = "chart"), q.dt == 64 && (i["!type"] = "macro"), U = [], ne = [], se = null, ce = [], ve(), V.arrayf = y = [], re = [], ie = [], ae = !1, k = {
						Hidden: (a[Ce] || { hs: 0 }).hs,
						name: l
					};
					break;
				case 515:
				case 3:
				case 2:
					i["!type"] == "chart" && (t.dense ? (i["!data"][q.r] || [])[q.c] : i[Er(q.c) + Sr(q.r)]) && ++q.c, b = {
						ixfe: q.ixfe,
						XF: S[q.ixfe] || {},
						v: q.val,
						t: "n"
					}, de > 0 && (b.z = b.XF && b.XF.numFmtId && fe[b.XF.numFmtId] || fe[b.ixfe >> 8 & 63]), jm(b, t, n.opts.Date1904), B({
						c: q.c,
						r: q.r
					}, b, t);
					break;
				case 5:
				case 517:
					b = {
						ixfe: q.ixfe,
						XF: S[q.ixfe],
						v: q.val,
						t: q.t
					}, de > 0 && (b.z = b.XF && b.XF.numFmtId && fe[b.XF.numFmtId] || fe[b.ixfe >> 8 & 63]), jm(b, t, n.opts.Date1904), B({
						c: q.c,
						r: q.r
					}, b, t);
					break;
				case 638:
					b = {
						ixfe: q.ixfe,
						XF: S[q.ixfe],
						v: q.rknum,
						t: "n"
					}, de > 0 && (b.z = b.XF && b.XF.numFmtId && fe[b.XF.numFmtId] || fe[b.ixfe >> 8 & 63]), jm(b, t, n.opts.Date1904), B({
						c: q.c,
						r: q.r
					}, b, t);
					break;
				case 189:
					for (var je = q.c; je <= q.C; ++je) {
						var Me = q.rkrec[je - q.c][0];
						b = {
							ixfe: Me,
							XF: S[Me],
							v: q.rkrec[je - q.c][1],
							t: "n"
						}, de > 0 && (b.z = b.XF && b.XF.numFmtId && fe[b.XF.numFmtId] || fe[b.ixfe >> 8 & 63]), jm(b, t, n.opts.Date1904), B({
							c: je,
							r: q.r
						}, b, t);
					}
					break;
				case 6:
				case 518:
				case 1030:
					if (q.val == "String") {
						s = q;
						break;
					}
					if (b = Mm(q.val, q.cell.ixfe, q.tt), b.XF = S[b.ixfe], t.cellFormula) {
						var Ne = q.formula;
						if (Ne && Ne[0] && Ne[0][0] && Ne[0][0][0] == "PtgExp") {
							var Pe = Ne[0][0][1][0], Fe = Ne[0][0][1][1], Ie = jr({
								r: Pe,
								c: Fe
							});
							v[Ie] ? b.f = "" + Ld(q.formula, o, q.cell, K, V) : b.F = ((t.dense ? (i["!data"][Pe] || [])[Fe] : i[Ie]) || {}).F;
						} else b.f = "" + Ld(q.formula, o, q.cell, K, V);
					}
					de > 0 && (b.z = b.XF && b.XF.numFmtId && fe[b.XF.numFmtId] || fe[b.ixfe >> 8 & 63]), jm(b, t, n.opts.Date1904), B(q.cell, b, t), s = q;
					break;
				case 7:
				case 519:
					if (s) s.val = q, b = Mm(q, s.cell.ixfe, "s"), b.XF = S[b.ixfe], t.cellFormula && (b.f = "" + Ld(s.formula, o, s.cell, K, V)), de > 0 && (b.z = b.XF && b.XF.numFmtId && fe[b.XF.numFmtId] || fe[b.ixfe >> 8 & 63]), jm(b, t, n.opts.Date1904), B(s.cell, b, t), s = null;
					else throw Error("String record expects Formula");
					break;
				case 33:
				case 545:
					y.push(q);
					var Le = jr(q[0].s);
					if (p = t.dense ? (i["!data"][q[0].s.r] || [])[q[0].s.c] : i[Le], t.cellFormula && p) {
						if (!s || !Le || !p) break;
						p.f = "" + Ld(q[1], o, q[0], K, V), p.F = Z(q[0]);
					}
					break;
				case 1212:
					if (!t.cellFormula) break;
					if (f) {
						if (!s) break;
						v[jr(s.cell)] = q[0], p = t.dense ? (i["!data"][s.cell.r] || [])[s.cell.c] : i[jr(s.cell)], (p || {}).f = "" + Ld(q[0], o, d, K, V);
					}
					break;
				case 253:
					b = Mm(c[q.isst].t, q.ixfe, "s"), c[q.isst].h && (b.h = c[q.isst].h), b.XF = S[b.ixfe], de > 0 && (b.z = b.XF && b.XF.numFmtId && fe[b.XF.numFmtId] || fe[b.ixfe >> 8 & 63]), jm(b, t, n.opts.Date1904), B({
						c: q.c,
						r: q.r
					}, b, t);
					break;
				case 513:
					t.sheetStubs && (b = {
						ixfe: q.ixfe,
						XF: S[q.ixfe],
						t: "z"
					}, de > 0 && (b.z = b.XF && b.XF.numFmtId && fe[b.XF.numFmtId] || fe[b.ixfe >> 8 & 63]), jm(b, t, n.opts.Date1904), B({
						c: q.c,
						r: q.r
					}, b, t));
					break;
				case 190:
					if (t.sheetStubs) for (var Re = q.c; Re <= q.C; ++Re) {
						var ze = q.ixfe[Re - q.c];
						b = {
							ixfe: ze,
							XF: S[ze],
							t: "z"
						}, de > 0 && (b.z = b.XF && b.XF.numFmtId && fe[b.XF.numFmtId] || fe[b.ixfe >> 8 & 63]), jm(b, t, n.opts.Date1904), B({
							c: Re,
							r: q.r
						}, b, t);
					}
					break;
				case 214:
				case 516:
				case 4:
					b = Mm(q.val, q.ixfe, "s"), b.XF = S[b.ixfe], de > 0 && (b.z = b.XF && b.XF.numFmtId && fe[b.XF.numFmtId] || fe[b.ixfe >> 8 & 63]), jm(b, t, n.opts.Date1904), B({
						c: q.c,
						r: q.r
					}, b, t);
					break;
				case 0:
				case 512:
					ue === 1 && (o = q);
					break;
				case 252:
					c = q;
					break;
				case 1054:
					if (V.biff >= 3 && V.biff <= 4) {
						fe[de++] = q[1];
						for (var Be = 0; Be < de + 163 && W[Be] != q[1]; ++Be);
						Be >= 163 && nt(q[1], de + 163);
					} else nt(q[1], q[0]);
					break;
				case 30:
					fe[de++] = q;
					for (var Ve = 0; Ve < de + 163 && W[Ve] != q; ++Ve);
					Ve >= 163 && nt(q, de + 163);
					break;
				case 229:
					U = U.concat(q);
					break;
				case 235:
					ge(q);
					break;
				case 236:
					ge(q);
					break;
				case 93:
					ne[q.cmo[0]] = V.lastobj = q, ce.length && (q._shape = ce.shift(), q._shape.object = q, q.cmo[1] == 5 && he().charts.push({
						id: "xls-chart-object-" + q.cmo[0],
						objectId: q.cmo[0],
						biffType: "obj",
						anchor: q._shape.anchor,
						raw: q._shape.raw
					}));
					break;
				case 438:
					V.lastobj.TxO = q;
					break;
				case 127:
					V.lastobj.ImData = q, _e(V.lastobj);
					break;
				case 440:
					for (_ = q[0].s.r; _ <= q[0].e.r; ++_) for (g = q[0].s.c; g <= q[0].e.c; ++g) p = t.dense ? (i["!data"][_] || [])[g] : i[jr({
						c: g,
						r: _
					})], p && (p.l = q[1]);
					break;
				case 2048:
					for (_ = q[0].s.r; _ <= q[0].e.r; ++_) for (g = q[0].s.c; g <= q[0].e.c; ++g) p = t.dense ? (i["!data"][_] || [])[g] : i[jr({
						c: g,
						r: _
					})], p && p.l && (p.l.Tooltip = q[1]);
					break;
				case 28:
					if (p = t.dense ? (i["!data"][q[0].r] || [])[q[0].c] : i[jr(q[0])], p || (t.dense ? (i["!data"][q[0].r] || (i["!data"][q[0].r] = []), p = i["!data"][q[0].r][q[0].c] = { t: "z" }) : p = i[jr(q[0])] = { t: "z" }, o.e.r = Math.max(o.e.r, q[0].r), o.s.r = Math.min(o.s.r, q[0].r), o.e.c = Math.max(o.e.c, q[0].c), o.s.c = Math.min(o.s.c, q[0].c)), p.c || (p.c = []), V.biff <= 5 && V.biff >= 2) h = {
						a: "SheetJ5",
						t: q[1]
					};
					else {
						var He = ne[q[2]];
						h = {
							a: q[1],
							t: He.TxO.t
						}, q[3] != null && !(q[3] & 2) && (p.c.hidden = !0);
					}
					p.c.push(h);
					break;
				case 2173:
					vl(S[q.ixfe], q.ext), T = {};
					break;
				case 125:
					if (!V.cellStyles) break;
					for (; q.e >= q.s;) re[q.e--] = {
						width: q.w / 256,
						level: q.level || 0,
						hidden: !!(q.flags & 1)
					}, q.ixfe != null && S[q.ixfe] && (re[q.e + 1].s = te(S[q.ixfe], q.ixfe)), ae || (ae = !0, lc = cc), pc(re[q.e + 1]);
					break;
				case 520:
					var Ue = {};
					q.level != null && (ie[q.r] = Ue, Ue.level = q.level), q.hidden && (ie[q.r] = Ue, Ue.hidden = !0), V.cellStyles && q.ixfe != null && q.ixfe != 4095 && S[q.ixfe] && (ie[q.r] = Ue, Ue.s = te(S[q.ixfe], q.ixfe)), q.hpt && (ie[q.r] = Ue, Ue.hpt = q.hpt, Ue.hpx = Ic(q.hpt));
					break;
				case 38:
				case 39:
				case 40:
				case 41:
					i["!margins"] || nf(i["!margins"] = {}), i["!margins"][{
						38: "left",
						39: "right",
						40: "top",
						41: "bottom"
					}[we]] = q;
					break;
				case 161:
					i["!margins"] || nf(i["!margins"] = {}), i["!margins"].header = q.header, i["!margins"].footer = q.footer;
					break;
				case 574:
					q.RTL && (O.Views[0].RTL = !0);
					break;
				case 146:
					E = q, T = {};
					break;
				case 2198:
					H = q, T = {};
					break;
				case 140:
					x = q;
					break;
				case 4098:
				case 4099:
				case 4109:
				case 4116:
				case 4117:
				case 4119:
				case 4120:
				case 4121:
				case 4122:
				case 4123:
				case 4125:
				case 4127:
				case 4128:
				case 4133:
				case 4149:
				case 4154:
				case 4158:
				case 4159:
				case 4161:
				case 4165:
				case 4177:
					ye(we, q);
					break;
				case 442: l ? k.CodeName = q || k.name : O.WBProps.CodeName = q || "ThisWorkbook";
			}
		} else Ee || console.error("Missing Info for XLS Record 0x" + we.toString(16)), e.l += Te;
	}
	return n.SheetNames = st(a).sort(function(e, t) {
		return Number(e) - Number(t);
	}).map(function(e) {
		return a[e].name;
	}), t.bookSheets || (n.Sheets = r), !n.SheetNames.length && u["!ref"] ? (n.SheetNames.push("Sheet1"), n.Sheets && Rr(n.Sheets, "Sheet1", u)) : n.Preamble = u, n.Sheets && pe.forEach(function(e, t) {
		var r = zr(n.Sheets, n.SheetNames[t]);
		r && (r["!autofilter"] = e);
	}), n.Strings = c, n.SSF = bt(W), V.enc && (n.Encryption = V.enc), H && (n.Themes = H), n.Metadata = {}, x !== void 0 && (n.Metadata.Country = x), K.names.length > 0 && (O.Names = K.names), n.Workbook = O, n;
}
var Qm = {
	SI: "e0859ff2f94f6810ab9108002b27b3d9",
	DSI: "02d5cdd59c2e1b10939708002b2cf9ae",
	UDI: "05d5cdd59c2e1b10939708002b2cf9ae"
};
function $m(e, t, n) {
	var r = it.find(e, "/!DocumentSummaryInformation");
	if (r && r.size > 0) try {
		var i = da(r, Ci, Qm.DSI);
		for (var a in i) t[a] = i[a];
	} catch (e) {
		n.WTF && console.error(e && e.message || e);
	}
	var o = it.find(e, "/!SummaryInformation");
	if (o && o.size > 0) try {
		var s = da(o, wi, Qm.SI);
		for (var c in s) t[c] ?? (t[c] = s[c]);
	} catch (e) {
		n.WTF && console.error(e && e.message || e);
	}
	t.HeadingPairs && t.TitlesOfParts && (Ui(t.HeadingPairs, t.TitlesOfParts, t, n), delete t.HeadingPairs, delete t.TitlesOfParts);
}
function eh(e, t) {
	t ||= {}, vg(t), h(), t.codepage && f(t.codepage);
	var n, r;
	if (e.FullPaths) {
		if (it.find(e, "/encryption")) throw Error("File is password-protected");
		n = it.find(e, "!CompObj"), r = it.find(e, "/Workbook") || it.find(e, "/Book");
	} else {
		switch (t.type) {
			case "base64":
				e = N(O(e));
				break;
			case "binary":
				e = N(e);
				break;
			case "buffer": break;
			case "array": Array.isArray(e) || (e = Array.prototype.slice.call(e));
		}
		fr(e, 0), r = { content: e };
	}
	var i, a;
	if (n && Om(n), t.bookProps && !t.bookSheets) i = {};
	else {
		var o = k ? "buffer" : "array";
		if (r && r.content) i = Zm(r.content, t);
		else if ((a = it.find(e, "PerfectOffice_MAIN")) && a.content) i = gs.to_workbook(a.content, (t.type = o, t));
		else if ((a = it.find(e, "NativeContent_MAIN")) && a.content) i = gs.to_workbook(a.content, (t.type = o, t));
		else if ((a = it.find(e, "MN0")) && a.content) throw Error("Unsupported Works 4 for Mac file");
		else throw Error("Cannot find Workbook stream");
		t.bookVBA && e.FullPaths && it.find(e, "/_VBA_PROJECT_CUR/VBA/dir") && (i.vbaraw = Zl(e));
	}
	var s = {};
	return e.FullPaths && $m(e, s, t), i.Props = i.Custprops = s, t.bookFiles && (i.cfb = e), i;
}
var th = {
	0: { f: Zf },
	1: { f: tp },
	2: { f: dp },
	3: { f: ap },
	4: { f: rp },
	5: { f: lp },
	6: { f: mp },
	7: { f: sp },
	8: { f: yp },
	9: { f: vp },
	10: { f: gp },
	11: { f: _p },
	12: { f: np },
	13: { f: fp },
	14: { f: op },
	15: { f: ip },
	16: { f: up },
	17: { f: hp },
	18: { f: cp },
	19: { f: qr },
	20: {},
	21: {},
	22: {},
	23: {},
	24: {},
	25: {},
	26: {},
	27: {},
	28: {},
	29: {},
	30: {},
	31: {},
	32: {},
	33: {},
	34: {},
	35: { T: 1 },
	36: { T: -1 },
	37: { T: 1 },
	38: { T: -1 },
	39: { f: tm },
	40: {},
	42: {},
	43: { f: tl },
	44: { f: el },
	45: { f: nl },
	46: { f: il },
	47: { f: rl },
	48: {},
	49: { f: Wr },
	50: {},
	51: { f: bl },
	52: { T: 1 },
	53: { T: -1 },
	54: { T: 1 },
	55: { T: -1 },
	56: { T: 1 },
	57: { T: -1 },
	58: {},
	59: {},
	60: { f: qo },
	62: { f: pp },
	63: { f: Tl },
	64: { f: Op },
	65: {},
	66: {},
	67: {},
	68: {},
	69: {},
	70: {},
	128: {},
	129: { T: 1 },
	130: { T: -1 },
	131: {
		T: 1,
		f: pr,
		p: 0
	},
	132: { T: -1 },
	133: { T: 1 },
	134: { T: -1 },
	135: { T: 1 },
	136: { T: -1 },
	137: {
		T: 1,
		f: Dp
	},
	138: { T: -1 },
	139: { T: 1 },
	140: { T: -1 },
	141: { T: 1 },
	142: { T: -1 },
	143: { T: 1 },
	144: { T: -1 },
	145: { T: 1 },
	146: { T: -1 },
	147: { f: ep },
	148: {
		f: Qf,
		p: 16
	},
	151: { f: Sp },
	152: {},
	153: { f: $p },
	154: {},
	155: {},
	156: { f: Qp },
	157: {},
	158: {},
	159: {
		T: 1,
		f: Es
	},
	160: { T: -1 },
	161: {
		T: 1,
		f: ri
	},
	162: { T: -1 },
	163: { T: 1 },
	164: { T: -1 },
	165: { T: 1 },
	166: { T: -1 },
	167: {},
	168: {},
	169: {},
	170: {},
	171: {},
	172: { T: 1 },
	173: { T: -1 },
	174: {},
	175: {},
	176: { f: bp },
	177: { T: 1 },
	178: { T: -1 },
	179: { T: 1 },
	180: { T: -1 },
	181: { T: 1 },
	182: { T: -1 },
	183: { T: 1 },
	184: { T: -1 },
	185: { T: 1 },
	186: { T: -1 },
	187: { T: 1 },
	188: { T: -1 },
	189: { T: 1 },
	190: { T: -1 },
	191: { T: 1 },
	192: { T: -1 },
	193: { T: 1 },
	194: { T: -1 },
	195: { T: 1 },
	196: { T: -1 },
	197: { T: 1 },
	198: { T: -1 },
	199: { T: 1 },
	200: { T: -1 },
	201: { T: 1 },
	202: { T: -1 },
	203: { T: 1 },
	204: { T: -1 },
	205: { T: 1 },
	206: { T: -1 },
	207: { T: 1 },
	208: { T: -1 },
	209: { T: 1 },
	210: { T: -1 },
	211: { T: 1 },
	212: { T: -1 },
	213: { T: 1 },
	214: { T: -1 },
	215: { T: 1 },
	216: { T: -1 },
	217: { T: 1 },
	218: { T: -1 },
	219: { T: 1 },
	220: { T: -1 },
	221: { T: 1 },
	222: { T: -1 },
	223: { T: 1 },
	224: { T: -1 },
	225: { T: 1 },
	226: { T: -1 },
	227: { T: 1 },
	228: { T: -1 },
	229: { T: 1 },
	230: { T: -1 },
	231: { T: 1 },
	232: { T: -1 },
	233: { T: 1 },
	234: { T: -1 },
	235: { T: 1 },
	236: { T: -1 },
	237: { T: 1 },
	238: { T: -1 },
	239: { T: 1 },
	240: { T: -1 },
	241: { T: 1 },
	242: { T: -1 },
	243: { T: 1 },
	244: { T: -1 },
	245: { T: 1 },
	246: { T: -1 },
	247: { T: 1 },
	248: { T: -1 },
	249: { T: 1 },
	250: { T: -1 },
	251: { T: 1 },
	252: { T: -1 },
	253: { T: 1 },
	254: { T: -1 },
	255: { T: 1 },
	256: { T: -1 },
	257: { T: 1 },
	258: { T: -1 },
	259: { T: 1 },
	260: { T: -1 },
	261: { T: 1 },
	262: { T: -1 },
	263: { T: 1 },
	264: { T: -1 },
	265: { T: 1 },
	266: { T: -1 },
	267: { T: 1 },
	268: { T: -1 },
	269: { T: 1 },
	270: { T: -1 },
	271: { T: 1 },
	272: { T: -1 },
	273: { T: 1 },
	274: { T: -1 },
	275: { T: 1 },
	276: { T: -1 },
	277: {},
	278: { T: 1 },
	279: { T: -1 },
	280: { T: 1 },
	281: { T: -1 },
	282: { T: 1 },
	283: { T: 1 },
	284: { T: -1 },
	285: { T: 1 },
	286: { T: -1 },
	287: { T: 1 },
	288: { T: -1 },
	289: { T: 1 },
	290: { T: -1 },
	291: { T: 1 },
	292: { T: -1 },
	293: { T: 1 },
	294: { T: -1 },
	295: { T: 1 },
	296: { T: -1 },
	297: { T: 1 },
	298: { T: -1 },
	299: { T: 1 },
	300: { T: -1 },
	301: { T: 1 },
	302: { T: -1 },
	303: { T: 1 },
	304: { T: -1 },
	305: { T: 1 },
	306: { T: -1 },
	307: { T: 1 },
	308: { T: -1 },
	309: { T: 1 },
	310: { T: -1 },
	311: { T: 1 },
	312: { T: -1 },
	313: { T: -1 },
	314: { T: 1 },
	315: { T: -1 },
	316: { T: 1 },
	317: { T: -1 },
	318: { T: 1 },
	319: { T: -1 },
	320: { T: 1 },
	321: { T: -1 },
	322: { T: 1 },
	323: { T: -1 },
	324: { T: 1 },
	325: { T: -1 },
	326: { T: 1 },
	327: { T: -1 },
	328: { T: 1 },
	329: { T: -1 },
	330: { T: 1 },
	331: { T: -1 },
	332: { T: 1 },
	333: { T: -1 },
	334: { T: 1 },
	335: { f: yl },
	336: { T: -1 },
	337: {
		f: xl,
		T: 1
	},
	338: { T: -1 },
	339: { T: 1 },
	340: { T: -1 },
	341: { T: 1 },
	342: { T: -1 },
	343: { T: 1 },
	344: { T: -1 },
	345: { T: 1 },
	346: { T: -1 },
	347: { T: 1 },
	348: { T: -1 },
	349: { T: 1 },
	350: { T: -1 },
	351: {},
	352: {},
	353: { T: 1 },
	354: { T: -1 },
	355: { f: ei },
	357: {},
	358: {},
	359: {},
	360: { T: 1 },
	361: {},
	362: { f: Oo },
	363: {},
	364: {},
	366: {},
	367: {},
	368: {},
	369: {},
	370: {},
	371: {},
	372: { T: 1 },
	373: { T: -1 },
	374: { T: 1 },
	375: { T: -1 },
	376: { T: 1 },
	377: { T: -1 },
	378: { T: 1 },
	379: { T: -1 },
	380: { T: 1 },
	381: { T: -1 },
	382: { T: 1 },
	383: { T: -1 },
	384: { T: 1 },
	385: { T: -1 },
	386: { T: 1 },
	387: { T: -1 },
	388: { T: 1 },
	389: { T: -1 },
	390: { T: 1 },
	391: { T: -1 },
	392: { T: 1 },
	393: { T: -1 },
	394: { T: 1 },
	395: { T: -1 },
	396: {},
	397: {},
	398: {},
	399: {},
	400: {},
	401: { T: 1 },
	403: {},
	404: {},
	405: {},
	406: {},
	407: {},
	408: {},
	409: {},
	410: {},
	411: {},
	412: {},
	413: {},
	414: {},
	415: {},
	416: {},
	417: {},
	418: {},
	419: {},
	420: {},
	421: {},
	422: { T: 1 },
	423: { T: 1 },
	424: { T: -1 },
	425: { T: -1 },
	426: { f: Cp },
	427: { f: wp },
	428: {},
	429: { T: 1 },
	430: { T: -1 },
	431: { T: 1 },
	432: { T: -1 },
	433: { T: 1 },
	434: { T: -1 },
	435: { T: 1 },
	436: { T: -1 },
	437: { T: 1 },
	438: { T: -1 },
	439: { T: 1 },
	440: { T: -1 },
	441: { T: 1 },
	442: { T: -1 },
	443: { T: 1 },
	444: { T: -1 },
	445: { T: 1 },
	446: { T: -1 },
	447: { T: 1 },
	448: { T: -1 },
	449: { T: 1 },
	450: { T: -1 },
	451: { T: 1 },
	452: { T: -1 },
	453: { T: 1 },
	454: { T: -1 },
	455: { T: 1 },
	456: { T: -1 },
	457: { T: 1 },
	458: { T: -1 },
	459: { T: 1 },
	460: { T: -1 },
	461: { T: 1 },
	462: { T: -1 },
	463: { T: 1 },
	464: { T: -1 },
	465: { T: 1 },
	466: { T: -1 },
	467: { T: 1 },
	468: { T: -1 },
	469: { T: 1 },
	470: { T: -1 },
	471: {},
	472: {},
	473: { T: 1 },
	474: { T: -1 },
	475: {},
	476: { f: Ep },
	477: {},
	478: {},
	479: { T: 1 },
	480: { T: -1 },
	481: { T: 1 },
	482: { T: -1 },
	483: { T: 1 },
	484: { T: -1 },
	485: { f: $f },
	486: { T: 1 },
	487: { T: -1 },
	488: { T: 1 },
	489: { T: -1 },
	490: { T: 1 },
	491: { T: -1 },
	492: { T: 1 },
	493: { T: -1 },
	494: { f: xp },
	495: { T: 1 },
	496: { T: -1 },
	497: { T: 1 },
	498: { T: -1 },
	499: {},
	500: { T: 1 },
	501: { T: -1 },
	502: { T: 1 },
	503: { T: -1 },
	504: {},
	505: { T: 1 },
	506: { T: -1 },
	507: {},
	508: { T: 1 },
	509: { T: -1 },
	510: { T: 1 },
	511: { T: -1 },
	512: {},
	513: {},
	514: { T: 1 },
	515: { T: -1 },
	516: { T: 1 },
	517: { T: -1 },
	518: { T: 1 },
	519: { T: -1 },
	520: { T: 1 },
	521: { T: -1 },
	522: {},
	523: {},
	524: {},
	525: {},
	526: {},
	527: {},
	528: { T: 1 },
	529: { T: -1 },
	530: { T: 1 },
	531: { T: -1 },
	532: { T: 1 },
	533: { T: -1 },
	534: {},
	535: {},
	536: {},
	537: {},
	538: { T: 1 },
	539: { T: -1 },
	540: { T: 1 },
	541: { T: -1 },
	542: { T: 1 },
	548: {},
	549: {},
	550: { f: ei },
	551: { f: Qr },
	552: {},
	553: {},
	554: { T: 1 },
	555: { T: -1 },
	556: { T: 1 },
	557: { T: -1 },
	558: { T: 1 },
	559: { T: -1 },
	560: { T: 1 },
	561: { T: -1 },
	562: {},
	564: {},
	565: { T: 1 },
	566: { T: -1 },
	569: { T: 1 },
	570: { T: -1 },
	572: {},
	573: { T: 1 },
	574: { T: -1 },
	577: {},
	578: {},
	579: {},
	580: {},
	581: {},
	582: {},
	583: {},
	584: {},
	585: {},
	586: {},
	587: {},
	588: { T: -1 },
	589: {},
	590: { T: 1 },
	591: { T: -1 },
	592: { T: 1 },
	593: { T: -1 },
	594: { T: 1 },
	595: { T: -1 },
	596: {},
	597: { T: 1 },
	598: { T: -1 },
	599: { T: 1 },
	600: { T: -1 },
	601: { T: 1 },
	602: { T: -1 },
	603: { T: 1 },
	604: { T: -1 },
	605: { T: 1 },
	606: { T: -1 },
	607: {},
	608: { T: 1 },
	609: { T: -1 },
	610: {},
	611: { T: 1 },
	612: { T: -1 },
	613: { T: 1 },
	614: { T: -1 },
	615: { T: 1 },
	616: { T: -1 },
	617: { T: 1 },
	618: { T: -1 },
	619: { T: 1 },
	620: { T: -1 },
	625: {},
	626: { T: 1 },
	627: { T: -1 },
	628: { T: 1 },
	629: { T: -1 },
	630: { T: 1 },
	631: { T: -1 },
	632: { f: Jl },
	633: { T: 1 },
	634: { T: -1 },
	635: {
		T: 1,
		f: ql
	},
	636: { T: -1 },
	637: { f: Jr },
	638: { T: 1 },
	639: {},
	640: { T: -1 },
	641: { T: 1 },
	642: { T: -1 },
	643: { T: 1 },
	644: {},
	645: { T: -1 },
	646: { T: 1 },
	648: { T: 1 },
	649: {},
	650: { T: -1 },
	651: { f: zp },
	652: {},
	653: { T: 1 },
	654: { T: -1 },
	655: { T: 1 },
	656: { T: -1 },
	657: { T: 1 },
	658: { T: -1 },
	659: {},
	660: { T: 1 },
	661: {},
	662: { T: -1 },
	663: {},
	664: { T: 1 },
	665: {},
	666: { T: -1 },
	667: {},
	668: {},
	669: {},
	671: { T: 1 },
	672: { T: -1 },
	673: { T: 1 },
	674: { T: -1 },
	675: {},
	676: {},
	677: {},
	678: {},
	679: {},
	680: {},
	681: {},
	1024: {},
	1025: {},
	1026: { T: 1 },
	1027: { T: -1 },
	1028: { T: 1 },
	1029: { T: -1 },
	1030: {},
	1031: { T: 1 },
	1032: { T: -1 },
	1033: { T: 1 },
	1034: { T: -1 },
	1035: {},
	1036: {},
	1037: {},
	1038: { T: 1 },
	1039: { T: -1 },
	1040: {},
	1041: { T: 1 },
	1042: { T: -1 },
	1043: {},
	1044: {},
	1045: {},
	1046: { T: 1 },
	1047: { T: -1 },
	1048: { T: 1 },
	1049: { T: -1 },
	1050: {},
	1051: { T: 1 },
	1052: { T: 1 },
	1053: { f: kp },
	1054: { T: 1 },
	1055: {},
	1056: { T: 1 },
	1057: { T: -1 },
	1058: { T: 1 },
	1059: { T: -1 },
	1061: {},
	1062: { T: 1 },
	1063: { T: -1 },
	1064: { T: 1 },
	1065: { T: -1 },
	1066: { T: 1 },
	1067: { T: -1 },
	1068: { T: 1 },
	1069: { T: -1 },
	1070: { T: 1 },
	1071: { T: -1 },
	1072: { T: 1 },
	1073: { T: -1 },
	1075: { T: 1 },
	1076: { T: -1 },
	1077: { T: 1 },
	1078: { T: -1 },
	1079: { T: 1 },
	1080: { T: -1 },
	1081: { T: 1 },
	1082: { T: -1 },
	1083: { T: 1 },
	1084: { T: -1 },
	1085: {},
	1086: { T: 1 },
	1087: { T: -1 },
	1088: { T: 1 },
	1089: { T: -1 },
	1090: { T: 1 },
	1091: { T: -1 },
	1092: { T: 1 },
	1093: { T: -1 },
	1094: { T: 1 },
	1095: { T: -1 },
	1096: {},
	1097: { T: 1 },
	1098: {},
	1099: { T: -1 },
	1100: { T: 1 },
	1101: { T: -1 },
	1102: {},
	1103: {},
	1104: {},
	1105: {},
	1111: {},
	1112: {},
	1113: { T: 1 },
	1114: { T: -1 },
	1115: { T: 1 },
	1116: { T: -1 },
	1117: {},
	1118: { T: 1 },
	1119: { T: -1 },
	1120: { T: 1 },
	1121: { T: -1 },
	1122: { T: 1 },
	1123: { T: -1 },
	1124: { T: 1 },
	1125: { T: -1 },
	1126: {},
	1128: { T: 1 },
	1129: { T: -1 },
	1130: {},
	1131: { T: 1 },
	1132: { T: -1 },
	1133: { T: 1 },
	1134: { T: -1 },
	1135: { T: 1 },
	1136: { T: -1 },
	1137: { T: 1 },
	1138: { T: -1 },
	1139: { T: 1 },
	1140: { T: -1 },
	1141: {},
	1142: { T: 1 },
	1143: { T: -1 },
	1144: { T: 1 },
	1145: { T: -1 },
	1146: {},
	1147: { T: 1 },
	1148: { T: -1 },
	1149: { T: 1 },
	1150: { T: -1 },
	1152: { T: 1 },
	1153: { T: -1 },
	1154: { T: -1 },
	1155: { T: -1 },
	1156: { T: -1 },
	1157: { T: 1 },
	1158: { T: -1 },
	1159: { T: 1 },
	1160: { T: -1 },
	1161: { T: 1 },
	1162: { T: -1 },
	1163: { T: 1 },
	1164: { T: -1 },
	1165: { T: 1 },
	1166: { T: -1 },
	1167: { T: 1 },
	1168: { T: -1 },
	1169: { T: 1 },
	1170: { T: -1 },
	1171: {},
	1172: { T: 1 },
	1173: { T: -1 },
	1177: {},
	1178: { T: 1 },
	1180: {},
	1181: {},
	1182: {},
	2048: { T: 1 },
	2049: { T: -1 },
	2050: {},
	2051: { T: 1 },
	2052: { T: -1 },
	2053: {},
	2054: {},
	2055: { T: 1 },
	2056: { T: -1 },
	2057: { T: 1 },
	2058: { T: -1 },
	2060: {},
	2067: {},
	2068: { T: 1 },
	2069: { T: -1 },
	2070: {},
	2071: {},
	2072: { T: 1 },
	2073: { T: -1 },
	2075: {},
	2076: {},
	2077: { T: 1 },
	2078: { T: -1 },
	2079: {},
	2080: { T: 1 },
	2081: { T: -1 },
	2082: {},
	2083: { T: 1 },
	2084: { T: -1 },
	2085: { T: 1 },
	2086: { T: -1 },
	2087: { T: 1 },
	2088: { T: -1 },
	2089: { T: 1 },
	2090: { T: -1 },
	2091: {},
	2092: {},
	2093: { T: 1 },
	2094: { T: -1 },
	2095: {},
	2096: { T: 1 },
	2097: { T: -1 },
	2098: { T: 1 },
	2099: { T: -1 },
	2100: { T: 1 },
	2101: { T: -1 },
	2102: {},
	2103: { T: 1 },
	2104: { T: -1 },
	2105: {},
	2106: { T: 1 },
	2107: { T: -1 },
	2108: {},
	2109: { T: 1 },
	2110: { T: -1 },
	2111: { T: 1 },
	2112: { T: -1 },
	2113: { T: 1 },
	2114: { T: -1 },
	2115: {},
	2116: {},
	2117: {},
	2118: { T: 1 },
	2119: { T: -1 },
	2120: {},
	2121: { T: 1 },
	2122: { T: -1 },
	2123: { T: 1 },
	2124: { T: -1 },
	2125: {},
	2126: { T: 1 },
	2127: { T: -1 },
	2128: {},
	2129: { T: 1 },
	2130: { T: -1 },
	2131: { T: 1 },
	2132: { T: -1 },
	2133: { T: 1 },
	2134: {},
	2135: {},
	2136: {},
	2137: { T: 1 },
	2138: { T: -1 },
	2139: { T: 1 },
	2140: { T: -1 },
	2141: {},
	3072: {},
	3073: {},
	4096: { T: 1 },
	4097: { T: -1 },
	5002: { T: 1 },
	5003: { T: -1 },
	5081: { T: 1 },
	5082: { T: -1 },
	5083: {},
	5084: { T: 1 },
	5085: { T: -1 },
	5086: { T: 1 },
	5087: { T: -1 },
	5088: {},
	5089: {},
	5090: {},
	5092: { T: 1 },
	5093: { T: -1 },
	5094: {},
	5095: { T: 1 },
	5096: { T: -1 },
	5097: {},
	5099: {},
	5100: {},
	5101: {},
	5102: {},
	5103: {},
	5105: {},
	5108: {},
	5109: {},
	5110: {},
	5111: {},
	5112: {},
	5113: {},
	5114: {},
	5117: {},
	5127: {},
	5130: {},
	5131: {},
	5132: {},
	5134: {},
	5135: {},
	65535: { n: "" }
}, nh = {
	6: { f: Ud },
	10: { f: fa },
	12: { f: ha },
	13: { f: ha },
	14: { f: ma },
	15: { f: ma },
	16: { f: ii },
	17: { f: ma },
	18: { f: ma },
	19: { f: ha },
	20: { f: wo },
	21: { f: wo },
	23: { f: Oo },
	24: { f: Do },
	25: { f: ma },
	26: {},
	27: {},
	28: { f: Fo },
	29: {},
	34: { f: ma },
	35: { f: Eo },
	38: { f: ii },
	39: { f: ii },
	40: { f: ii },
	41: { f: ii },
	42: { f: ma },
	43: { f: ma },
	47: { f: Xs },
	49: { f: oo },
	51: { f: ha },
	60: {},
	61: { f: ro },
	64: { f: ma },
	65: { f: ao },
	66: { f: ha },
	77: {},
	80: {},
	81: {},
	82: {},
	85: { f: ha },
	89: {},
	90: {},
	91: {},
	92: { f: Ja },
	93: { f: Lo },
	94: {},
	95: { f: ma },
	96: {},
	97: {},
	99: { f: ma },
	125: { f: qo },
	128: { f: xo },
	129: { f: Ya },
	130: { f: ha },
	131: { f: ma },
	132: { f: ma },
	133: { f: Xa },
	134: {},
	140: { f: Uo },
	141: { f: ha },
	144: {},
	146: { f: Go },
	151: {},
	152: {},
	153: {},
	154: {},
	155: {},
	156: { f: ha },
	157: {},
	158: {},
	160: { f: Zo },
	161: { f: Jo },
	174: {},
	175: {},
	176: {},
	177: {},
	178: {},
	180: {},
	181: {},
	182: {},
	184: {},
	185: {},
	189: { f: mo },
	190: { f: ho },
	193: { f: fa },
	197: {},
	198: {},
	199: {},
	200: {},
	201: {},
	202: { f: ma },
	203: {},
	204: {},
	205: {},
	206: {},
	207: {},
	208: {},
	209: {},
	210: {},
	211: {},
	213: {},
	215: {},
	216: {},
	217: {},
	218: { f: ha },
	220: {},
	221: { f: ma },
	222: {},
	224: { f: _o },
	225: { f: qa },
	226: { f: fa },
	227: {},
	229: { f: Io },
	233: {},
	235: { f: Ml },
	236: { f: Nl },
	237: {},
	239: {},
	240: {},
	241: {},
	242: {},
	244: {},
	245: {},
	246: {},
	247: {},
	248: {},
	249: {},
	251: {},
	252: { f: Za },
	253: { f: so },
	255: { f: Qa },
	256: {},
	259: {},
	290: {},
	311: {},
	312: {},
	315: {},
	317: { f: ga },
	318: {},
	319: {},
	320: {},
	330: {},
	331: {},
	333: {},
	334: {},
	335: {},
	336: {},
	337: {},
	338: {},
	339: {},
	340: {},
	351: {},
	352: { f: ma },
	353: { f: fa },
	401: {},
	402: {},
	403: {},
	404: {},
	405: {},
	406: {},
	407: {},
	408: {},
	425: {},
	426: {},
	427: {},
	428: {},
	429: {},
	430: { f: To },
	431: { f: ma },
	432: {},
	433: {},
	434: {},
	437: {},
	438: { f: Bo },
	439: { f: ma },
	440: { f: Vo },
	441: {},
	442: { f: xa },
	443: {},
	444: { f: ha },
	445: {},
	446: {},
	448: { f: fa },
	449: {
		f: to,
		r: 2
	},
	450: { f: fa },
	512: { f: fo },
	513: { f: Xo },
	515: { f: Co },
	516: { f: co },
	517: { f: So },
	519: { f: Qo },
	520: { f: $a },
	523: {},
	545: { f: Mo },
	549: { f: no },
	566: {},
	574: { f: io },
	638: { f: po },
	659: {},
	1048: {},
	1054: { f: lo },
	1084: {},
	1212: { f: jo },
	2048: { f: Ho },
	2049: {},
	2050: {},
	2051: {},
	2052: {},
	2053: {},
	2054: {},
	2055: {},
	2056: {},
	2057: { f: Ka },
	2058: {},
	2059: {},
	2060: {},
	2061: {},
	2062: {},
	2063: {},
	2064: {},
	2066: {},
	2067: {},
	2128: {},
	2129: {},
	2130: {},
	2131: {},
	2132: {},
	2133: {},
	2134: {},
	2135: {},
	2136: {},
	2137: {},
	2138: {},
	2146: {},
	2147: { r: 12 },
	2148: {},
	2149: {},
	2150: {},
	2151: { f: fa },
	2152: {},
	2154: {},
	2155: {},
	2156: {},
	2161: {},
	2162: {},
	2164: {},
	2165: {},
	2166: {},
	2167: {},
	2168: {},
	2169: {},
	2170: {},
	2171: {},
	2172: {
		f: Ko,
		r: 12
	},
	2173: {
		f: _l,
		r: 12
	},
	2174: {},
	2175: {},
	2180: {},
	2181: {},
	2182: {},
	2183: {},
	2184: {},
	2185: {},
	2186: {},
	2187: {},
	2188: {
		f: ma,
		r: 12
	},
	2189: {},
	2190: { r: 12 },
	2191: {},
	2192: {},
	2194: {},
	2195: {},
	2196: {
		f: Ao,
		r: 12
	},
	2197: {},
	2198: {
		f: dl,
		r: 12
	},
	2199: {},
	2200: {},
	2201: {},
	2202: {
		f: No,
		r: 12
	},
	2203: { f: fa },
	2204: {},
	2205: {},
	2206: {},
	2207: {},
	2211: { f: eo },
	2212: {},
	2213: {},
	2214: {},
	2215: {},
	4097: {},
	4098: { f: Im },
	4099: { f: Lm },
	4102: {},
	4103: {},
	4105: {},
	4106: {},
	4107: {},
	4108: {},
	4109: { f: Rm },
	4116: {},
	4117: { f: zm },
	4118: {},
	4119: { f: Wm },
	4120: { f: Gm },
	4121: { f: Km },
	4122: { f: qm },
	4123: { f: Jm },
	4124: {},
	4125: { f: Bm },
	4126: {},
	4127: {},
	4128: {},
	4129: {},
	4130: {},
	4132: {},
	4133: { f: Vm },
	4134: { f: ha },
	4135: {},
	4146: {},
	4147: {},
	4148: {},
	4149: {},
	4154: {},
	4156: {},
	4157: {},
	4158: { f: Ym },
	4159: { f: Xm },
	4160: {},
	4161: {},
	4163: {},
	4164: { f: Yo },
	4165: {},
	4166: {},
	4168: {},
	4170: {},
	4171: {},
	4174: {},
	4175: {},
	4176: {},
	4177: { f: Hm },
	4187: {},
	4188: { f: Wo },
	4189: {},
	4191: {},
	4192: {},
	4193: {},
	4194: {},
	4195: {},
	4196: {},
	4197: {},
	4198: {},
	4199: {},
	4200: {},
	0: { f: fo },
	1: {},
	2: { f: ns },
	3: { f: ts },
	4: { f: es },
	5: { f: is },
	7: { f: rs },
	8: {},
	9: { f: Ka },
	11: {},
	22: { f: ha },
	30: { f: uo },
	31: {},
	32: {},
	33: { f: Mo },
	36: {},
	37: { f: no },
	50: { f: as },
	62: {},
	52: {},
	67: { f: vo },
	68: { f: ha },
	69: {},
	86: {},
	126: {},
	127: { f: $o },
	135: {},
	136: {},
	137: {},
	143: { f: ss },
	145: {},
	148: {},
	149: {},
	150: {},
	169: {},
	171: {},
	188: {},
	191: {},
	192: {},
	194: {},
	195: {},
	214: { f: os },
	223: {},
	234: {},
	354: {},
	421: {},
	518: { f: Ud },
	521: { f: Ka },
	536: { f: Do },
	547: { f: Eo },
	561: {},
	579: { f: yo },
	1030: { f: Ud },
	1033: { f: Ka },
	1091: { f: bo },
	2157: {},
	2163: {},
	2177: {},
	2240: {},
	2241: {},
	2242: {},
	2243: {},
	2244: {},
	2245: {},
	2246: {},
	2247: {},
	2248: {},
	2249: {},
	2250: {},
	2251: {},
	2262: { r: 12 },
	101: {},
	102: {},
	105: {},
	106: {},
	107: {},
	109: {},
	112: {},
	114: {},
	29282: {}
};
function rh(e, t, n, r) {
	var i = t;
	if (!isNaN(i)) {
		var a = r || (n || []).length || 0, o = e.next(4);
		o.write_shift(2, i), o.write_shift(2, a), a > 0 && $n(n) && e.push(n);
	}
}
function ih(e, t) {
	var n = t || {}, r = n.dense == null ? C : n.dense, i = {};
	r && (i["!data"] = []), e = It(e, "<!--", "-->");
	var a = e.match(/<table/i);
	if (!a) throw Error("Invalid HTML: could not find <table>");
	var o = e.match(/<\/table/i), s = a.index, c = o && o.index || e.length, l = jt(e.slice(s, c), /(:?<tr[^<>]*>)/i, "<tr>"), u = -1, d = 0, f = 0, p = 0, m = {
		s: {
			r: 1e7,
			c: 1e7
		},
		e: {
			r: 0,
			c: 0
		}
	}, h = [];
	for (s = 0; s < l.length; ++s) {
		var g = l[s].trim(), _ = g.slice(0, 3).toLowerCase();
		if (_ == "<tr") {
			if (++u, n.sheetRows && n.sheetRows <= u) {
				--u;
				break;
			}
			d = 0;
		} else if (_ == "<td" || _ == "<th") {
			var v = g.split(/<\/t[dh]>/i);
			for (c = 0; c < v.length; ++c) {
				var y = v[c].trim();
				if (y.match(/<t[dh]/i)) {
					for (var b = y, x = 0; b.charAt(0) == "<" && (x = b.indexOf(">")) > -1;) b = b.slice(x + 1);
					for (var S = 0; S < h.length; ++S) {
						var w = h[S];
						w.s.c == d && w.s.r < u && u <= w.e.r && (d = w.e.c + 1, S = -1);
					}
					var T = J(y.slice(0, y.indexOf(">")));
					p = T.colspan ? +T.colspan : 1, ((f = +T.rowspan) > 1 || p > 1) && h.push({
						s: {
							r: u,
							c: d
						},
						e: {
							r: u + (f || 1) - 1,
							c: d + p - 1
						}
					});
					var E = T.t || T["data-t"] || "";
					if (!b.length) d += p;
					else if (b = Cn(b), m.s.r > u && (m.s.r = u), m.e.r < u && (m.e.r = u), m.s.c > d && (m.s.c = d), m.e.c < d && (m.e.c = d), !b.length) d += p;
					else {
						var D = {
							t: "s",
							v: b
						};
						n.raw || !b.trim().length || E == "s" || (b === "TRUE" ? D = {
							t: "b",
							v: !0
						} : b === "FALSE" ? D = {
							t: "b",
							v: !1
						} : isNaN(St(b)) ? isNaN(At(b).getDate()) ? b.charCodeAt(0) == 35 && Ai[b] != null && (D.t = "e", D.w = b, D.v = Ai[b]) : (D = {
							t: "d",
							v: vt(b)
						}, n.UTC === !1 && (D.v = Mt(D.v)), n.cellDates || (D = {
							t: "n",
							v: ft(D.v)
						}), D.z = n.dateNF || W[14]) : D = {
							t: "n",
							v: St(b)
						}), D.cellText !== !1 && (D.w = b), r ? (i["!data"][u] || (i["!data"][u] = []), i["!data"][u][d] = D) : i[jr({
							r: u,
							c: d
						})] = D, d += p;
					}
				}
			}
		}
	}
	return i["!ref"] = Z(m), h.length && (i["!merges"] = h), i;
}
function ah(e) {
	return e && e.rgb && /^[0-9A-Fa-f]{6}(?:[0-9A-Fa-f]{2})?$/.test(String(e.rgb)) ? "#" + String(e.rgb).slice(-6) : "";
}
function oh(e) {
	return e ? "'" + Sc(e, "'") + "'" : "";
}
function sh(e) {
	return String(e).replace(/[&<>"']/g, function(e) {
		return e == "&" ? "&amp;" : e == "<" ? "&lt;" : e == ">" ? "&gt;" : e == "\"" ? "&quot;" : "&#39;";
	});
}
function ch(e, t, n) {
	var r = ["<", e];
	return n && st(n).forEach(function(e) {
		r.push(" ", e, "=\"", sh(n[e]), "\"");
	}), t == null ? (r.push("/>"), r.join("")) : (r.push(">", t, "</", e, ">"), r.join(""));
}
function lh(e) {
	var t = String(e ?? "").trim();
	if (!t || t.slice(0, 2) == "//") return null;
	for (var n = t.indexOf(":"), r = n == -1 ? "" : t.slice(0, n), i = "", a = 0; a < r.length; ++a) r.charCodeAt(a) > 32 && r.charCodeAt(a) != 127 && (i += r.charAt(a));
	return n != -1 && !/^(?:https?|mailto|tel)$/i.test(i) ? null : t;
}
function uh(e) {
	var t = String(e ?? "");
	return /^data:image\/[A-Za-z0-9.+-]+;base64,[A-Za-z0-9+/=\r\n]+$/.test(t) ? t : null;
}
function dh(e) {
	for (var t = String(e ?? ""), n = [], r = 0; r < t.length;) {
		var i = t.indexOf("<", r);
		if (i == -1) {
			n.push(t.slice(r));
			break;
		}
		n.push(t.slice(r, i));
		var a = t.indexOf(">", i + 1);
		if (a == -1) {
			n.push("&lt;", t.slice(i + 1));
			break;
		}
		var o = t.slice(i + 1, a).trim(), s = o.toLowerCase();
		if (/^(?:\/?(?:b|i|s|sup|sub)|br\s*\/?)$/.test(s)) n.push("<", s == "br" ? "br/" : s, ">");
		else if (s == "/span") n.push("</span>");
		else if (s.slice(0, 12) == "span style=\"" && o.charAt(o.length - 1) == "\"") {
			var c = o.slice(12, -1).split(";"), l = [];
			c.forEach(function(e) {
				var t = e.indexOf(":"), n = t == -1 ? "" : e.slice(0, t).trim().toLowerCase(), r = t == -1 ? "" : e.slice(t + 1).trim().toLowerCase();
				n == "text-decoration" && r == "underline" ? l.push("text-decoration:underline") : n == "text-underline-style" && /^(?:single|double|single-accounting|double-accounting)$/.test(r) ? l.push("text-underline-style:" + r) : n == "font-size" && /^\d+(?:\.\d+)?pt$/.test(r) ? l.push("font-size:" + r) : n == "text-effect" && r == "outline" ? l.push("text-effect:outline") : n == "text-shadow" && r == "auto" && l.push("text-shadow:auto");
			}), n.push("<span style=\"", l.join(";"), l.length ? ";" : "", "\">");
		} else n.push(sh(t.slice(i, a + 1)));
		r = a + 1;
	}
	return n.join("");
}
function fh(e) {
	switch (e) {
		case "dashDot":
		case "dashDotDot":
		case "dashed":
		case "mediumDashed": return "dashed";
		case "dotted":
		case "hair": return "dotted";
		case "double": return "double";
		case "none": return "none";
		default: return "solid";
	}
}
function ph(e) {
	switch (e) {
		case "medium":
		case "mediumDashDot":
		case "mediumDashDotDot":
		case "mediumDashed": return "2px";
		case "thick": return "3px";
		case "hair": return "1px";
		default: return "1px";
	}
}
function mh(e, t, n) {
	if (n && n.style && n.style != "none") {
		var r = ah(n.color) || "#000000";
		e.push("border-" + t + ":" + ph(n.style) + " " + fh(n.style) + " " + r);
	}
}
function hh(e, t) {
	if (!t || !t.cellStyles || !e || !e.s) return "";
	var n = e.s, r = [], i = n.font || {};
	i.name && r.push("font-family:" + oh(i.name));
	var a = +i.sz;
	isFinite(a) && a > 0 && r.push("font-size:" + Math.min(a, 409) + "pt"), i.bold && r.push("font-weight:bold"), i.italic && r.push("font-style:italic");
	var o = [];
	i.underline && o.push("underline"), i.strike && o.push("line-through"), o.length && r.push("text-decoration:" + o.join(" ")), i.color && ah(i.color) && r.push("color:" + ah(i.color));
	var s = n.fill || n, c = "";
	s.patternType != "none" && s.patternType != "gray125" && (c = ah(s.fgColor) || ah(s.bgColor)), c && r.push("background-color:" + c);
	var l = n.alignment || {};
	/^(?:left|right|center|justify|fill|distributed)$/.test(l.horizontal || "") && r.push("text-align:" + l.horizontal);
	var u = l.vertical == "center" ? "middle" : l.vertical;
	if (/^(?:top|middle|bottom|baseline)$/.test(u || "") && r.push("vertical-align:" + u), l.textRotation != null && l.textRotation !== 0) {
		var d = l.textRotation == 255 ? 90 : l.textRotation > 90 ? 90 - l.textRotation : l.textRotation;
		r.push("transform:rotate(" + d + "deg)"), r.push("transform-origin:center");
	}
	var f = n.border || {};
	return mh(r, "left", f.left || f.start), mh(r, "right", f.right || f.end), mh(r, "top", f.top), mh(r, "bottom", f.bottom), r.join(";");
}
function gh(e, t, n, r, i) {
	if (!t || !e) return "";
	var a = e.s || {}, o = a.alignment || {}, s = [];
	if ((t.browserPixels || t.autoFit) && s.push("box-sizing:border-box;padding:0 2px;min-width:0"), o.wrapText ? s.push("white-space:pre-wrap;overflow-wrap:normal;word-break:normal") : (s.push("white-space:pre"), o.shrinkToFit || t.overflow == "clip" || t.overflow == "hidden" ? s.push("overflow:hidden;text-overflow:clip") : s.push("overflow:visible")), o.shrinkToFit && i && n != null) {
		for (var c = 0, l = r || 1, u = 0; u < l; ++u) c += _h(i[n + u]);
		var d = Ac(e, a, t);
		if (c > 0 && d > c) {
			var f = Math.max(.25, Math.min(1, c / d));
			s.push("font-size:" + Math.max(1, bc(a) * f) + "pt");
		}
	}
	return s.join(";");
}
function _h(e) {
	return vc(e);
}
function vh(e) {
	return e ? e.hpx == null ? e.hpt == null ? 20 : Lc(e.hpt) : e.hpx : 20;
}
function yh(e, t, n, r) {
	for (var i = e["!merges"] || [], a = [], o = {}, s = e["!data"] != null, c = (e["!rows"] || [])[n], l = r && r._htmlCols || e["!cols"] || [], u = t.s.c; u <= t.e.c; ++u) {
		for (var d = 0, f = 0, p = 0; p < i.length; ++p) if (!(i[p].s.r > n || i[p].s.c > u) && !(i[p].e.r < n || i[p].e.c < u)) {
			if (i[p].s.r < n || i[p].s.c < u) {
				d = -1;
				break;
			}
			d = i[p].e.r - i[p].s.r + 1, f = i[p].e.c - i[p].s.c + 1;
			break;
		}
		if (!(d < 0)) {
			var m = Er(u) + Sr(n), h = s ? (e["!data"][n] || [])[u] : e[m], g = h;
			if (h && h.t == "n" && h.v != null && !isFinite(h.v) && (h = isNaN(h.v) ? {
				t: "e",
				v: 36,
				w: ki[36]
			} : {
				t: "e",
				v: 7,
				w: ki[7]
			}, g = h), r.cellStyles) {
				var _ = {};
				l[u] && l[u].s && rf(_, l[u].s), c && c.s && rf(_, c.s), h && h.s && rf(_, h.s), _ = Xf(e, n, u, _) || _, st(_).length && (g = h ? bt(h) : { t: "z" }, g.s = _);
			}
			var v = h && h.v != null && (h.h ? dh(h.h) : mn(h.w || (Ir(h), h.w) || "")) || "";
			if (o = {}, d > 1 && (o.rowspan = d), f > 1 && (o.colspan = f), r.editable) v = "<span contenteditable=\"true\">" + v + "</span>";
			else if (h) {
				o["data-t"] = h && h.t || "z", h.v != null && (o["data-v"] = h.v instanceof Date ? h.v.toISOString() : h.v), h.z != null && (o["data-z"] = h.z), h.f != null && (o["data-f"] = h.f);
				var y = h.l && lh(h.l.Target);
				y && (v = "<a href=\"" + sh(y) + "\">" + v + "</a>");
			}
			var b = hh(g, r), x = gh(g, r, u, f, l);
			x && (b = b ? b + ";" + x : x), b && (o.style = b), o.id = (r.id || "sjs") + "-" + m, a.push(ch("td", v, o));
		}
	}
	var S = {}, C = [];
	return c && (c.hidden && C.push("display:none"), r.browserPixels && C.push("height:" + vh(c) + "px")), C.length && (S.style = C.join(";")), ch("tr", a.join(""), S);
}
var bh = "<html><head><meta charset=\"utf-8\"/><title>SheetJS Table Export</title></head><body>", xh = "</body></html>";
function Sh(e, t) {
	var n = Ht(e, "table");
	if (!n || n.length == 0) throw Error("Invalid HTML: could not find <table>");
	if (n.length == 1) {
		var r = Br(ih(n[0], t), t);
		return r.bookType = "html", r;
	}
	var i = Jg();
	return n.forEach(function(e, n) {
		Yg(i, ih(e, t), "Sheet" + (n + 1));
	}), i.bookType = "html", i;
}
var Ch = 9525;
function wh(e, t, n) {
	for (var r = {
		left: 0,
		top: 0,
		width: 480,
		height: 288
	}, i = n && n._htmlCols || e["!cols"] || [], a = e["!rows"] || [], o = t && t.from || {
		col: 0,
		row: 0,
		colOff: 0,
		rowOff: 0
	}, s = t && t.to, c = 0; c < (o.col || 0); ++c) r.left += _h(i[c]);
	for (var l = 0; l < (o.row || 0); ++l) r.top += vh(a[l]);
	if (r.left += (o.colOff || 0) / Ch, r.top += (o.rowOff || 0) / Ch, s) {
		var u = 0, d = 0;
		for (c = 0; c < (s.col || 0); ++c) u += _h(i[c]);
		for (l = 0; l < (s.row || 0); ++l) d += vh(a[l]);
		u += (s.colOff || 0) / Ch, d += (s.rowOff || 0) / Ch, r.width = Math.max(1, u - r.left), r.height = Math.max(1, d - r.top);
	} else t && t.ext && (t.ext.cx && (r.width = t.ext.cx / Ch), t.ext.cy && (r.height = t.ext.cy / Ch));
	return r;
}
function Th(e) {
	return "position:absolute;left:" + Math.round(e.left) + "px;top:" + Math.round(e.top) + "px;width:" + Math.round(e.width) + "px;height:" + Math.round(e.height) + "px";
}
function Eh(e) {
	return e ? e.val && e.val.values ? e.val.values : e.yVal && e.yVal.values ? e.yVal.values : e.data && e.data.length ? e.data : [] : [];
}
function Dh(e) {
	return e ? e.cat && e.cat.values ? e.cat.values : e.xVal && e.xVal.values ? e.xVal.values : [] : [];
}
function Oh(e, t, n) {
	var r = e && (e.model || e["!chart"] || e);
	if (!r) return "";
	var i = r.series || [], a = (r.type || "").replace(/Chart$/, ""), o = Math.max(160, Math.round(t || 480)), s = Math.max(120, Math.round(n || 288)), c = r.title || e.title || "", l = [
		"#4F81BD",
		"#C0504D",
		"#9BBB59",
		"#8064A2",
		"#4BACC6",
		"#F79646"
	], u = ["<svg class=\"sjs-chart-svg\" xmlns=\"http://www.w3.org/2000/svg\" width=\"" + o + "\" height=\"" + s + "\" viewBox=\"0 0 " + o + " " + s + "\">"];
	u.push("<rect x=\"0\" y=\"0\" width=\"" + o + "\" height=\"" + s + "\" fill=\"#fff\" stroke=\"#d0d7de\"/>"), c && u.push("<text x=\"" + o / 2 + "\" y=\"20\" text-anchor=\"middle\" font-family=\"Arial\" font-size=\"14\">" + mn(c) + "</text>");
	var d = c ? 34 : 16, f = 42, p = 14, m = 28, h = o - f - p, g = s - d - m, _ = [];
	i.forEach(function(e) {
		Eh(e).forEach(function(e) {
			typeof e == "number" && isFinite(e) && _.push(e);
		});
	});
	var v = Math.max.apply(Math, _.concat([0])), y = Math.min.apply(Math, _.concat([0]));
	if (y > 0 && (y = 0), v == y && (v = y + 1), u.push("<line x1=\"" + f + "\" y1=\"" + (d + g) + "\" x2=\"" + (f + h) + "\" y2=\"" + (d + g) + "\" stroke=\"#444\"/>"), u.push("<line x1=\"" + f + "\" y1=\"" + d + "\" x2=\"" + f + "\" y2=\"" + (d + g) + "\" stroke=\"#444\"/>"), a == "pie" || a == "doughnut") {
		var b = Eh(i[0] || {}), x = b.reduce(function(e, t) {
			return e + (typeof t == "number" ? Math.max(0, t) : 0);
		}, 0) || 1, S = o / 2, C = d + g / 2, w = Math.max(10, Math.min(h, g) / 2 - 8), T = -Math.PI / 2;
		return b.forEach(function(e, t) {
			var n = T + Math.max(0, +e || 0) / x * Math.PI * 2, r = S + w * Math.cos(T), i = C + w * Math.sin(T), a = S + w * Math.cos(n), o = C + w * Math.sin(n), s = +(n - T > Math.PI);
			u.push("<path d=\"M" + S + "," + C + " L" + r + "," + i + " A" + w + "," + w + " 0 " + s + ",1 " + a + "," + o + " Z\" fill=\"" + l[t % l.length] + "\"/>"), T = n;
		}), a == "doughnut" && u.push("<circle cx=\"" + S + "\" cy=\"" + C + "\" r=\"" + w * .45 + "\" fill=\"#fff\"/>"), u.push("</svg>"), u.join("");
	}
	var E = 0;
	if (i.forEach(function(e) {
		E = Math.max(E, Eh(e).length);
	}), !E) return u.push("</svg>"), u.join("");
	var D = h / E;
	i.forEach(function(e, t) {
		var n = Eh(e), r = l[t % l.length];
		if (a == "line" || a == "scatter" || a == "area") {
			var o = [];
			n.forEach(function(e, t) {
				if (typeof e == "number" && isFinite(e)) {
					var n = f + D * (t + .5), r = d + g - (e - y) / (v - y) * g;
					o.push([n, r]);
				}
			}), a == "area" && o.length && u.push("<polygon points=\"" + [[o[0][0], d + g]].concat(o, [[o[o.length - 1][0], d + g]]).map(function(e) {
				return e[0] + "," + e[1];
			}).join(" ") + "\" fill=\"" + r + "\" opacity=\"0.35\"/>"), o.length && u.push("<polyline points=\"" + o.map(function(e) {
				return e[0] + "," + e[1];
			}).join(" ") + "\" fill=\"none\" stroke=\"" + r + "\" stroke-width=\"2\"/>"), o.forEach(function(e) {
				u.push("<circle cx=\"" + e[0] + "\" cy=\"" + e[1] + "\" r=\"2.5\" fill=\"" + r + "\"/>");
			});
		} else {
			var s = Math.max(1, D / Math.max(i.length, 1) * .72);
			n.forEach(function(e, n) {
				if (typeof e == "number" && isFinite(e)) {
					var a = f + D * n + (D - s * i.length) / 2 + s * t, o = d + g - (e - y) / (v - y) * g, c = d + g - (0 - y) / (v - y) * g;
					u.push("<rect x=\"" + a + "\" y=\"" + Math.min(o, c) + "\" width=\"" + s + "\" height=\"" + Math.max(1, Math.abs(c - o)) + "\" fill=\"" + r + "\"/>");
				}
			});
		}
		e.name && u.push("<text x=\"" + (f + 8) + "\" y=\"" + (d + 14 + t * 14) + "\" font-family=\"Arial\" font-size=\"11\" fill=\"" + r + "\">" + mn(e.name) + "</text>");
	});
	var O = Dh(i[0] || {});
	return O.slice(0, Math.min(O.length, E)).forEach(function(e, t) {
		t % Math.ceil(E / 8) == 0 && u.push("<text x=\"" + (f + D * (t + .5)) + "\" y=\"" + (d + g + 16) + "\" text-anchor=\"middle\" font-family=\"Arial\" font-size=\"10\">" + mn(String(e)) + "</text>");
	}), u.push("</svg>"), u.join("");
}
function kh(e, t) {
	var n = [], r = e["!drawings"] || {}, i = e["!charts"] || [];
	return t && t.drawings && r.images && r.images.forEach(function(r) {
		if (r && r.dataURI) {
			var i = uh(r.dataURI);
			if (i) {
				var a = wh(e, r.anchor, t);
				n.push("<img class=\"sjs-drawing-image\" src=\"" + sh(i) + "\" style=\"" + Th(a) + "\"/>");
			}
		}
	}), t && t.charts && i.forEach(function(r) {
		var i = wh(e, r.anchor, t);
		n.push("<div class=\"sjs-chart\" style=\"" + Th(i) + "\">" + Oh(r, i.width, i.height) + "</div>");
	}), n.length ? "<div class=\"sjs-drawing-layer\" style=\"position:absolute;left:0;top:0;pointer-events:none\">" + n.join("") + "</div>" : "";
}
function Ah(e, t, n) {
	var r = [], i = {}, a = [];
	n && n.id && (i.id = n.id), n && (n.browserPixels || n.autoFit) && a.push("border-collapse:collapse;table-layout:fixed"), a.length && (i.style = a.join(";"));
	var o = ch("table", "", i).replace(/<\/table>$/, ""), s = n && n._htmlCols || e["!cols"];
	if (n && (n.browserPixels || n.autoFit) && s) {
		r.push("<colgroup>");
		for (var c = t.s.c; c <= t.e.c; ++c) {
			var l = s[c], u = [];
			u.push("width:" + _h(l) + "px"), l && l.hidden && u.push("display:none"), r.push(ch("col", null, { style: u.join(";") }));
		}
		r.push("</colgroup>");
	}
	return o + r.join("");
}
function jh(e, t) {
	var n = {};
	if (t) for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r]);
	if (n.autoFit) {
		var i = { set: !1 };
		if (typeof n.autoFit == "object") for (r in n.autoFit) Object.prototype.hasOwnProperty.call(n.autoFit, r) && (i[r] = n.autoFit[r]);
		n.measureText && i.measureText == null && (i.measureText = n.measureText), n.canvas && i.canvas == null && (i.canvas = n.canvas), n._htmlCols = Nc(e, i), n.browserPixels ??= !0;
	}
	var a = n.header == null ? bh : n.header, o = n.footer == null ? xh : n.footer, s = [a], c = Mr(e["!ref"] || "A1"), l = n.charts && e["!charts"] && e["!charts"].length || n.drawings && e["!drawings"];
	if (l && s.push("<div class=\"sjs-sheet\" style=\"position:relative;display:inline-block\">"), s.push(Ah(e, c, n)), e["!ref"]) for (var u = c.s.r; u <= c.e.r; ++u) s.push(yh(e, c, u, n));
	return l ? (s.push("</table>"), s.push(kh(e, n)), s.push("</div>"), s.push(o)) : s.push("</table>" + o), s.join("");
}
function Mh(e, t, n) {
	var r = n || {}, i = e["!data"] != null, a = 0, o = 0;
	if (r.origin != null) {
		if (typeof r.origin == "number") a = r.origin;
		else {
			var s = typeof r.origin == "string" ? Ar(r.origin) : r.origin;
			a = s.r, o = s.c;
		}
	}
	var c = {
		s: {
			r: 0,
			c: 0
		},
		e: {
			r: a,
			c: o
		}
	};
	if (e["!ref"]) {
		var l = Mr(e["!ref"]);
		c.s.r = Math.min(c.s.r, l.s.r), c.s.c = Math.min(c.s.c, l.s.c), c.e.r = Math.max(c.e.r, l.e.r), c.e.c = Math.max(c.e.c, l.e.c), a == -1 && (c.e.r = a = l.e.r + 1);
	}
	var u = t.rows;
	if (!u) throw "Unsupported origin when " + t.tagName + " is not a TABLE";
	var d = Math.min(r.sheetRows || 1e7, u.length), f = [], p = 0, m = e["!rows"] ||= [], h = 0, g = 0, _ = 0, v = 0, y = 0, b = 0;
	for (e["!cols"] ||= []; h < u.length && g < d; ++h) {
		var x = u[h];
		if (Fh(x)) {
			if (r.display) continue;
			m[g] = { hidden: !0 };
		}
		var S = x.cells;
		for (_ = v = 0; _ < S.length; ++_) {
			var C = S[_];
			if (!(r.display && Fh(C))) {
				var w = C.hasAttribute("data-v") ? C.getAttribute("data-v") : C.hasAttribute("v") ? C.getAttribute("v") : Cn(C.innerHTML), T = C.getAttribute("data-z") || C.getAttribute("z"), E = C.hasAttribute("data-f") ? C.getAttribute("data-f") : C.hasAttribute("f") ? C.getAttribute("f") : null;
				for (p = 0; p < f.length; ++p) {
					var D = f[p];
					D.s.c == v + o && D.s.r < g + a && g + a <= D.e.r && (v = D.e.c + 1 - o, p = -1);
				}
				b = +C.getAttribute("colspan") || 1, ((y = +C.getAttribute("rowspan") || 1) > 1 || b > 1) && f.push({
					s: {
						r: g + a,
						c: v + o
					},
					e: {
						r: g + a + (y || 1) - 1,
						c: v + o + (b || 1) - 1
					}
				});
				var O = {
					t: "s",
					v: w
				}, k = C.getAttribute("data-t") || C.getAttribute("t") || "";
				w != null && (w.length == 0 ? O.t = k || "z" : r.raw || w.trim().length == 0 || k == "s" || (k == "e" && ki[+w] ? O = {
					t: "e",
					v: +w,
					w: ki[+w]
				} : w === "TRUE" ? O = {
					t: "b",
					v: !0
				} : w === "FALSE" ? O = {
					t: "b",
					v: !1
				} : isNaN(St(w)) ? isNaN(At(w).getDate()) ? w.charCodeAt(0) == 35 && Ai[w] != null && (O = {
					t: "e",
					v: Ai[w],
					w
				}) : (O = {
					t: "d",
					v: vt(w)
				}, r.UTC && (O.v = Nt(O.v)), r.cellDates || (O = {
					t: "n",
					v: ft(O.v)
				}), O.z = r.dateNF || W[14]) : O = {
					t: "n",
					v: St(w)
				})), O.z === void 0 && T != null && (O.z = T);
				var A = "", j = C.getElementsByTagName("A");
				if (j && j.length) for (var M = 0; M < j.length && !(j[M].hasAttribute("href") && (A = j[M].getAttribute("href"), A.charAt(0) != "#")); ++M);
				A && A.charAt(0) != "#" && A.slice(0, 11).toLowerCase() != "javascript:" && (O.l = { Target: A }), E != null && (O.f = E), i ? (e["!data"][g + a] || (e["!data"][g + a] = []), e["!data"][g + a][v + o] = O) : e[jr({
					c: v + o,
					r: g + a
				})] = O, c.e.c < v + o && (c.e.c = v + o), v += b;
			}
		}
		++g;
	}
	return f.length && (e["!merges"] = (e["!merges"] || []).concat(f)), c.e.r = Math.max(c.e.r, g - 1 + a), e["!ref"] = Z(c), g >= d && (e["!fullref"] = Z((c.e.r = u.length - h + g - 1 + a, c))), e;
}
function Nh(e, t) {
	var n = t || {}, r = {};
	return n.dense && (r["!data"] = []), Mh(r, e, t);
}
function Ph(e, t) {
	return Br(Nh(e, t), t);
}
function Fh(e) {
	var t = "", n = Ih(e);
	return n && (t = n(e).getPropertyValue("display")), t ||= e.style && e.style.display, t === "none";
}
function Ih(e) {
	return e.ownerDocument.defaultView && typeof e.ownerDocument.defaultView.getComputedStyle == "function" ? e.ownerDocument.defaultView.getComputedStyle : typeof getComputedStyle == "function" ? getComputedStyle : null;
}
function Lh(e) {
	return [Y(hn(e.replace(/[\t\r\n]/g, " ").trim().replace(/ +/g, " ").replace(/<text:s\/>/g, " ").replace(/<text:s text:c="(\d+)"\/>/g, function(e, t) {
		return Array(parseInt(t, 10) + 1).join(" ");
	}).replace(/<text:tab[^<>]*\/>/g, "	").replace(/<text:line-break\/>/g, "\n")))];
}
function Rh(e, t, n) {
	var r = n || {}, i = Dn(e);
	On.lastIndex = 0, i = Pt(It(i, "<!--", "-->"));
	for (var a, o, s = "", c = "", l, u = 0, d = -1, f = ""; a = On.exec(i);) switch (a[3] = a[3].replace(/_[\s\S]*$/, "")) {
		case "number-style":
		case "currency-style":
		case "percentage-style":
		case "date-style":
		case "time-style":
		case "text-style":
			a[1] === "/" ? (o["truncate-on-overflow"] == "false" && (s.match(/h/) ? s = s.replace(/h+/, "[$&]") : s.match(/m/) ? s = s.replace(/m+/, "[$&]") : s.match(/s/) && (s = s.replace(/s+/, "[$&]"))), r[o.name] = s, s = "") : a[0].charAt(a[0].length - 2) !== "/" && (s = "", o = J(a[0], !1));
			break;
		case "boolean-style":
			a[1] === "/" ? (r[o.name] = "General", s = "") : a[0].charAt(a[0].length - 2) !== "/" && (s = "", o = J(a[0], !1));
			break;
		case "boolean":
			s += "General";
			break;
		case "text":
			a[1] === "/" ? (f = i.slice(d, On.lastIndex - a[0].length), f == "%" && o[0] == "<number:percentage-style" ? s += "%" : s += "\"" + f.replace(/"/g, "\"\"") + "\"") : a[0].charAt(a[0].length - 2) !== "/" && (d = On.lastIndex);
			break;
		case "day":
			switch (l = J(a[0], !1), l.style) {
				case "short":
					s += "d";
					break;
				case "long":
					s += "dd";
					break;
				default: s += "dd";
			}
			break;
		case "day-of-week":
			switch (l = J(a[0], !1), l.style) {
				case "short":
					s += "ddd";
					break;
				case "long":
					s += "dddd";
					break;
				default: s += "ddd";
			}
			break;
		case "era":
			switch (l = J(a[0], !1), l.style) {
				case "short":
					s += "ee";
					break;
				case "long":
					s += "eeee";
					break;
				default: s += "eeee";
			}
			break;
		case "hours":
			switch (l = J(a[0], !1), l.style) {
				case "short":
					s += "h";
					break;
				case "long":
					s += "hh";
					break;
				default: s += "hh";
			}
			break;
		case "minutes":
			switch (l = J(a[0], !1), l.style) {
				case "short":
					s += "m";
					break;
				case "long":
					s += "mm";
					break;
				default: s += "mm";
			}
			break;
		case "month":
			switch (l = J(a[0], !1), l.textual && (s += "mm"), l.style) {
				case "short":
					s += "m";
					break;
				case "long":
					s += "mm";
					break;
				default: s += "m";
			}
			break;
		case "seconds":
			switch (l = J(a[0], !1), l.style) {
				case "short":
					s += "s";
					break;
				case "long":
					s += "ss";
					break;
				default: s += "ss";
			}
			l["decimal-places"] && (s += "." + xt("0", +l["decimal-places"]));
			break;
		case "year":
			switch (l = J(a[0], !1), l.style) {
				case "short":
					s += "yy";
					break;
				case "long":
					s += "yyyy";
					break;
				default: s += "yy";
			}
			break;
		case "am-pm":
			s += "AM/PM";
			break;
		case "week-of-year":
		case "quarter":
			console.error("Excel does not support ODS format token " + a[3]);
			break;
		case "fill-character":
			a[1] === "/" ? (f = i.slice(d, On.lastIndex - a[0].length), s += "\"" + f.replace(/"/g, "\"\"") + "\"*") : a[0].charAt(a[0].length - 2) !== "/" && (d = On.lastIndex);
			break;
		case "scientific-number":
			l = J(a[0], !1), s += "0." + xt("0", +l["min-decimal-places"] || +l["decimal-places"] || 2) + xt("?", +l["decimal-places"] - l["min-decimal-places"] || 0) + "E" + (X(l["forced-exponent-sign"]) ? "+" : "") + xt("0", +l["min-exponent-digits"] || 2);
			break;
		case "fraction":
			l = J(a[0], !1), +l["min-integer-digits"] ? s += xt("0", +l["min-integer-digits"]) : s += "#", s += " ", s += xt("?", +l["min-numerator-digits"] || 1), s += "/", +l["denominator-value"] ? s += l["denominator-value"] : s += xt("?", +l["min-denominator-digits"] || 1);
			break;
		case "currency-symbol":
			a[1] === "/" ? s += "\"" + i.slice(d, On.lastIndex - a[0].length).replace(/"/g, "\"\"") + "\"" : a[0].charAt(a[0].length - 2) === "/" ? s += "$" : d = On.lastIndex;
			break;
		case "text-properties":
			switch (l = J(a[0], !1), (l.color || "").toLowerCase().replace("#", "")) {
				case "ff0000":
				case "red": s = "[Red]" + s;
			}
			break;
		case "text-content":
			s += "@";
			break;
		case "map":
			l = J(a[0], !1), Y(l.condition) == "value()>=0" ? s = r[l["apply-style-name"]] + ";" + s : t && t.WTF && console.error("ODS number format may be incorrect: " + l.condition);
			break;
		case "number":
			if (a[1] === "/") break;
			l = J(a[0], !1), c = "", c += xt("0", +l["min-integer-digits"] || 1), X(l.grouping) && (c = be(xt("#", Math.max(0, 4 - c.length)) + c)), (+l["min-decimal-places"] || +l["decimal-places"]) && (c += "."), +l["min-decimal-places"] && (c += xt("0", +l["min-decimal-places"] || 1)), +l["decimal-places"] - (+l["min-decimal-places"] || 0) && (c += xt("0", +l["decimal-places"] - (+l["min-decimal-places"] || 0))), s += c;
			break;
		case "embedded-text": a[1] === "/" ? u == 0 ? s += "\"" + i.slice(d, On.lastIndex - a[0].length).replace(/"/g, "\"\"") + "\"" : s = s.slice(0, u) + "\"" + i.slice(d, On.lastIndex - a[0].length).replace(/"/g, "\"\"") + "\"" + s.slice(u) : a[0].charAt(a[0].length - 2) !== "/" && (d = On.lastIndex, u = -+J(a[0], !1).position || 0);
	}
	return r;
}
function zh(e, t, n) {
	var r = t || {};
	C != null && r.dense == null && (r.dense = C);
	var i = Dn(e), a = [], o, s, c, l = "", u = 0, d, f, p = Lr(), m = [], h = {};
	r.dense && (h["!data"] = []);
	var g, _, v = { value: "" }, y = {}, b = "", x = 0, S, w = "", T = 0, E = [], D = [], O = -1, k = -1, A = {
		s: {
			r: 1e6,
			c: 1e7
		},
		e: {
			r: 0,
			c: 0
		}
	}, j = 0, M = n || {}, ee = {}, N = {}, P = [], F = {}, I = 0, L = 0, R = [], te = 1, z = 1, B = [], V = {
		Names: [],
		WBProps: {},
		Sheets: []
	}, H = {}, U = ["", ""], ne = [], re = {}, ie = "", ae = 0, oe = !1, se = !1, ce = 0;
	for (On.lastIndex = 0, i = Pt(It(i, "<!--", "-->")); g = On.exec(i);) switch (g[3] = g[3].replace(/_[\s\S]*$/, "")) {
		case "table":
		case "工作表":
			g[1] === "/" ? (A.e.c >= A.s.c && A.e.r >= A.s.r ? h["!ref"] = Z(A) : h["!ref"] = "A1:A1", r.sheetRows > 0 && r.sheetRows <= A.e.r && (h["!fullref"] = h["!ref"], A.e.r = r.sheetRows - 1, h["!ref"] = Z(A)), P.length && (h["!merges"] = P), R.length && (h["!rows"] = R), d.name = d.名称 || d.name, typeof JSON < "u" && JSON.stringify(d), m.push(d.name), Rr(p, d.name, h), V.Sheets.push({ Hidden: N[d["style-name"]] && N[d["style-name"]].display ? +!X(N[d["style-name"]].display) : 0 }), se = !1) : g[0].charAt(g[0].length - 2) !== "/" && (d = J(g[0], !1), O = k = -1, A.s.r = A.s.c = 1e7, A.e.r = A.e.c = 0, h = {}, r.dense && (h["!data"] = []), P = [], R = [], se = !0);
			break;
		case "table-row-group":
			g[1] === "/" ? --j : ++j;
			break;
		case "table-row":
		case "行":
			if (g[1] === "/") {
				O += te, te = 1;
				break;
			}
			if (f = J(g[0], !1), f.行号 ? O = f.行号 - 1 : O == -1 && (O = 0), te = +f["number-rows-repeated"] || 1, te < 10) for (ce = 0; ce < te; ++ce) j > 0 && (R[O + ce] = { level: j });
			k = -1;
			break;
		case "covered-table-cell":
			if (g[1] !== "/") {
				if (++k, v = J(g[0], !1), z = parseInt(v["number-columns-repeated"] || "1", 10) || 1, r.sheetStubs) {
					for (; z-- > 0;) r.dense ? (h["!data"][O] || (h["!data"][O] = []), h["!data"][O][k] = { t: "z" }) : h[jr({
						r: O,
						c: k
					})] = { t: "z" }, ++k;
					--k;
				} else k += z - 1;
			}
			b = "", E = [];
			break;
		case "table-cell":
		case "数据":
			if (g[0].charAt(g[0].length - 2) === "/") ++k, v = J(g[0], !1), z = parseInt(v["number-columns-repeated"] || "1", 10) || 1, _ = {
				t: "z",
				v: null
			}, v.formula && r.cellFormula != 0 && (_.f = Qd(Y(v.formula))), v["style-name"] && ee[v["style-name"]] && (_.z = ee[v["style-name"]]), (v.数据类型 || v["value-type"]) == "string" && (_.t = "s", _.v = Y(v["string-value"] || ""), r.dense ? (h["!data"][O] || (h["!data"][O] = []), h["!data"][O][k] = _) : h[Er(k) + Sr(O)] = _), k += z - 1;
			else if (g[1] !== "/") {
				++k, b = w = "", x = T = 0, E = [], D = [], z = 1;
				var W = te ? O + te - 1 : O;
				if (k > A.e.c && (A.e.c = k), k < A.s.c && (A.s.c = k), O < A.s.r && (A.s.r = O), W > A.e.r && (A.e.r = W), v = J(g[0], !1), y = cn(g[0], !0), ne = [], re = {}, _ = {
					t: v.数据类型 || v["value-type"],
					v: null
				}, v["style-name"] && ee[v["style-name"]] && (_.z = ee[v["style-name"]]), r.cellFormula) {
					if (v.formula && (v.formula = Y(v.formula)), v["number-matrix-columns-spanned"] && v["number-matrix-rows-spanned"] && (I = parseInt(v["number-matrix-rows-spanned"], 10) || 0, L = parseInt(v["number-matrix-columns-spanned"], 10) || 0, F = {
						s: {
							r: O,
							c: k
						},
						e: {
							r: O + I - 1,
							c: k + L - 1
						}
					}, _.F = Z(F), B.push([F, _.F])), v.formula) _.f = Qd(v.formula);
					else for (ce = 0; ce < B.length; ++ce) O >= B[ce][0].s.r && O <= B[ce][0].e.r && k >= B[ce][0].s.c && k <= B[ce][0].e.c && (_.F = B[ce][1]);
				}
				switch ((v["number-columns-spanned"] || v["number-rows-spanned"]) && (I = parseInt(v["number-rows-spanned"] || "1", 10) || 1, L = parseInt(v["number-columns-spanned"] || "1", 10) || 1, I * L > 1 && (F = {
					s: {
						r: O,
						c: k
					},
					e: {
						r: O + I - 1,
						c: k + L - 1
					}
				}, P.push(F))), v["number-columns-repeated"] && (z = parseInt(v["number-columns-repeated"], 10)), _.t) {
					case "boolean":
						_.t = "b", _.v = X(v["boolean-value"]) || +v["boolean-value"] >= 1;
						break;
					case "float":
						_.t = "n", _.v = parseFloat(v.value), r.cellDates && _.z && Ue(_.z) && (_.v = pt(_.v + (V.WBProps.date1904 ? 1462 : 0)), _.t = typeof _.v == "number" ? "n" : "d");
						break;
					case "percentage":
						_.t = "n", _.v = parseFloat(v.value);
						break;
					case "currency":
						_.t = "n", _.v = parseFloat(v.value);
						break;
					case "date":
						_.t = "d", _.v = vt(v["date-value"], V.WBProps.date1904), r.cellDates || (_.t = "n", _.v = ft(_.v, V.WBProps.date1904)), _.z || (_.z = "m/d/yy");
						break;
					case "time":
						_.t = "n", _.v = mt(v["time-value"]) / 86400, r.cellDates && (_.v = pt(_.v), _.t = typeof _.v == "number" ? "n" : "d"), _.z || (_.z = "HH:MM:SS");
						break;
					case "number":
						_.t = "n", _.v = parseFloat(v.数据数值);
						break;
					default: if (_.t === "string" || _.t === "text" || !_.t) _.t = "s", v["string-value"] != null && (b = Y(v["string-value"]), E = []);
					else throw Error("Unsupported value type " + _.t);
				}
			} else {
				if (oe = !1, y["calcext:value-type"] == "error" && Ai[b] != null && (_.t = "e", _.w = b, _.v = Ai[b]), _.t === "s" && (_.v = b || "", E.length && (_.R = E), oe = x == 0), H.Target && (_.l = H), ne.length > 0 && (_.c = ne, ne = []), b && r.cellText !== !1 && (_.w = b), oe && (_.t = "z", delete _.v), (!oe || r.sheetStubs) && !(r.sheetRows && r.sheetRows <= O)) for (var G = 0; G < te; ++G) {
					if (z = parseInt(v["number-columns-repeated"] || "1", 10), r.dense) for (h["!data"][O + G] || (h["!data"][O + G] = []), h["!data"][O + G][k] = G == 0 ? _ : bt(_); --z > 0;) h["!data"][O + G][k + z] = bt(_);
					else for (h[jr({
						r: O + G,
						c: k
					})] = _; --z > 0;) h[jr({
						r: O + G,
						c: k + z
					})] = bt(_);
					A.e.c <= k && (A.e.c = k);
				}
				z = parseInt(v["number-columns-repeated"] || "1", 10), k += z - 1, z = 0, _ = {}, b = "", E = [];
			}
			H = {};
			break;
		case "document":
		case "document-content":
		case "电子表格文档":
		case "spreadsheet":
		case "主体":
		case "scripts":
		case "styles":
		case "font-face-decls":
		case "master-styles":
			if (g[1] === "/") {
				if ((o = a.pop())[0] !== g[3]) throw "Bad state: " + o;
			} else g[0].charAt(g[0].length - 2) !== "/" && a.push([g[3], !0]);
			break;
		case "annotation":
			if (g[1] === "/") {
				if ((o = a.pop())[0] !== g[3]) throw "Bad state: " + o;
				re.t = b, E.length && (re.R = E), re.a = ie, ne.push(re), b = w, x = T, E = D;
			} else if (g[0].charAt(g[0].length - 2) !== "/") {
				a.push([g[3], !1]);
				var K = J(g[0], !0);
				K.display && X(K.display) || (ne.hidden = !0), w = b, T = x, D = E, b = "", x = 0, E = [];
			}
			ie = "", ae = 0;
			break;
		case "creator":
			g[1] === "/" ? ie = i.slice(ae, g.index) : ae = g.index + g[0].length;
			break;
		case "meta":
		case "元数据":
		case "settings":
		case "config-item-set":
		case "config-item-map-indexed":
		case "config-item-map-entry":
		case "config-item-map-named":
		case "shapes":
		case "frame":
		case "text-box":
		case "image":
		case "data-pilot-tables":
		case "list-style":
		case "form":
		case "dde-links":
		case "event-listeners":
		case "chart":
			if (g[1] === "/") {
				if ((o = a.pop())[0] !== g[3]) throw "Bad state: " + o;
			} else g[0].charAt(g[0].length - 2) !== "/" && a.push([g[3], !1]);
			b = "", x = 0, E = [];
			break;
		case "scientific-number":
		case "currency-symbol":
		case "fill-character": break;
		case "text-style":
		case "boolean-style":
		case "number-style":
		case "currency-style":
		case "percentage-style":
		case "date-style":
		case "time-style":
			if (g[1] === "/") {
				var le = On.lastIndex;
				Rh(i.slice(c, On.lastIndex), t, M), On.lastIndex = le;
			} else g[0].charAt(g[0].length - 2) !== "/" && (c = On.lastIndex - g[0].length);
			break;
		case "script": break;
		case "libraries": break;
		case "automatic-styles": break;
		case "default-style":
		case "page-layout": break;
		case "style":
			var ue = J(g[0], !1);
			ue.family == "table-cell" && M[ue["data-style-name"]] ? ee[ue.name] = M[ue["data-style-name"]] : ue.family == "table" && (N[ue.name] = ue);
			break;
		case "map": break;
		case "font-face": break;
		case "paragraph-properties": break;
		case "table-properties":
			var de = J(g[0], !1);
			ue && ue.family == "table" && (ue.display = de.display);
			break;
		case "table-column-properties": break;
		case "table-row-properties": break;
		case "table-cell-properties": break;
		case "number": break;
		case "fraction": break;
		case "day":
		case "month":
		case "year":
		case "era":
		case "day-of-week":
		case "week-of-year":
		case "quarter":
		case "hours":
		case "minutes":
		case "seconds":
		case "am-pm": break;
		case "boolean": break;
		case "text":
			if (g[0].slice(-2) === "/>") break;
			if (g[1] === "/") switch (a[a.length - 1][0]) {
				case "number-style":
				case "date-style":
				case "time-style": l += i.slice(u, g.index);
			}
			else u = g.index + g[0].length;
			break;
		case "named-range":
			s = J(g[0], !1), U = $d(s["cell-range-address"]);
			var fe = {
				Name: s.name,
				Ref: U[0] + "!" + U[1]
			};
			se && (fe.Sheet = m.length), V.Names.push(fe);
			break;
		case "text-content": break;
		case "text-properties": break;
		case "embedded-text": break;
		case "body":
		case "电子表格": break;
		case "forms": break;
		case "table-column": break;
		case "table-header-rows": break;
		case "table-rows": break;
		case "table-column-group": break;
		case "table-header-columns": break;
		case "table-columns": break;
		case "null-date":
			s = J(g[0], !1), s["date-value"] === "1904-01-01" && (V.WBProps.date1904 = !0);
			break;
		case "graphic-properties": break;
		case "calculation-settings": break;
		case "named-expressions": break;
		case "label-range": break;
		case "label-ranges": break;
		case "named-expression": break;
		case "sort": break;
		case "sort-by": break;
		case "sort-groups": break;
		case "tab": break;
		case "line-break": break;
		case "span": break;
		case "p":
		case "文本串":
			if (["master-styles"].indexOf(a[a.length - 1][0]) > -1) break;
			if (g[1] === "/" && (!v || !v["string-value"])) {
				var pe = Lh(i.slice(x, g.index), S);
				b = (b.length > 0 ? b + "\n" : "") + pe[0];
			} else g[0].slice(-2) == "/>" ? b += "\n" : (S = J(g[0], !1), x = g.index + g[0].length);
			break;
		case "s": break;
		case "database-range":
			if (g[1] === "/") break;
			try {
				U = $d(J(g[0])["target-range-address"]), Object.prototype.hasOwnProperty.call(p, U[0]) && p[U[0]] && (p[U[0]]["!autofilter"] = { ref: U[1] });
			} catch {}
			break;
		case "date": break;
		case "object": break;
		case "title":
		case "标题": break;
		case "desc": break;
		case "binary-data": break;
		case "table-source": break;
		case "scenario": break;
		case "iteration": break;
		case "content-validations": break;
		case "content-validation": break;
		case "help-message": break;
		case "error-message": break;
		case "database-ranges": break;
		case "filter": break;
		case "filter-and": break;
		case "filter-or": break;
		case "filter-condition": break;
		case "filter-set-item": break;
		case "list-level-style-bullet": break;
		case "list-level-style-number": break;
		case "list-level-properties": break;
		case "sender-firstname":
		case "sender-lastname":
		case "sender-initials":
		case "sender-title":
		case "sender-position":
		case "sender-email":
		case "sender-phone-private":
		case "sender-fax":
		case "sender-company":
		case "sender-phone-work":
		case "sender-street":
		case "sender-city":
		case "sender-postal-code":
		case "sender-country":
		case "sender-state-or-province":
		case "author-name":
		case "author-initials":
		case "chapter":
		case "file-name":
		case "template-name":
		case "sheet-name": break;
		case "event-listener": break;
		case "initial-creator":
		case "creation-date":
		case "print-date":
		case "generator":
		case "document-statistic":
		case "user-defined":
		case "editing-duration":
		case "editing-cycles": break;
		case "config-item": break;
		case "page-number": break;
		case "page-count": break;
		case "time": break;
		case "cell-range-source": break;
		case "detective": break;
		case "operation": break;
		case "highlighted-range": break;
		case "data-pilot-table":
		case "source-cell-range":
		case "source-service":
		case "data-pilot-field":
		case "data-pilot-level":
		case "data-pilot-subtotals":
		case "data-pilot-subtotal":
		case "data-pilot-members":
		case "data-pilot-member":
		case "data-pilot-display-info":
		case "data-pilot-sort-info":
		case "data-pilot-layout-info":
		case "data-pilot-field-reference":
		case "data-pilot-groups":
		case "data-pilot-group":
		case "data-pilot-group-member": break;
		case "rect": break;
		case "dde-connection-decls":
		case "dde-connection-decl":
		case "dde-link":
		case "dde-source": break;
		case "properties": break;
		case "property": break;
		case "a":
			if (g[1] !== "/") {
				if (H = J(g[0], !1), !H.href) break;
				H.Target = Y(H.href), delete H.href, H.Target.charAt(0) == "#" && H.Target.indexOf(".") > -1 ? (U = $d(H.Target.slice(1)), H.Target = "#" + U[0] + "!" + U[1]) : H.Target.match(/^\.\.[\\\/]/) && (H.Target = H.Target.slice(3)), H.title && (H.Tooltip = Y(H.title), delete H.title);
			}
			break;
		case "table-protection": break;
		case "data-pilot-grand-total": break;
		case "office-document-common-attrs": break;
		default: switch (g[2]) {
			case "dc:":
			case "calcext:":
			case "loext:":
			case "ooo:":
			case "chartooo:":
			case "draw:":
			case "style:":
			case "chart:":
			case "form:":
			case "uof:":
			case "表:":
			case "字:": break;
			default: if (r.WTF) throw Error(g);
		}
	}
	var me = {
		Sheets: p,
		SheetNames: m,
		Workbook: V
	};
	return r.bookSheets && delete me.Sheets, me;
}
function Bh(e, t) {
	t ||= {}, Kt(e, "META-INF/manifest.xml") && zi(Jt(e, "META-INF/manifest.xml"), t);
	var n = Yt(e, "styles.xml"), r = n && Rh(xn(n), t), i = Yt(e, "content.xml");
	if (!i) throw Error("Missing content.xml in ODS / UOF file");
	var a = zh(xn(i), t, r);
	return Kt(e, "meta.xml") && (a.Props = Vi(Jt(e, "meta.xml"))), a.bookType = "ods", a;
}
function Vh(e, t) {
	var n = zh(e, t);
	return n.bookType = "fods", n;
}
var Hh = function() {
	try {
		return typeof Uint8Array > "u" || Uint8Array.prototype.subarray === void 0 ? "slice" : typeof Buffer < "u" ? Buffer.prototype.subarray === void 0 ? "slice" : (typeof Buffer.from == "function" ? Buffer.from([72, 62]) : new Buffer([72, 62])) instanceof Uint8Array ? "subarray" : "slice" : "subarray";
	} catch {
		return "slice";
	}
}();
function Uh(e) {
	return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function Wh(e) {
	return typeof TextDecoder < "u" ? new TextDecoder().decode(e) : xn(P(e));
}
function Gh(e) {
	for (var t = 0, n = 0; n < e.length; ++n) t += e[n].length;
	var r = new Uint8Array(t), i = 0;
	for (n = 0; n < e.length; ++n) {
		var a = e[n], o = a.length;
		if (o < 250) for (var s = 0; s < o; ++s) r[i++] = a[s];
		else r.set(a, i), i += o;
	}
	return r;
}
function Kh(e) {
	return e -= e >> 1 & 1431655765, e = (e & 858993459) + (e >> 2 & 858993459), (e + (e >> 4) & 252645135) * 16843009 >>> 24;
}
function qh(e, t) {
	for (var n = (e[t + 15] & 127) << 7 | e[t + 14] >> 1, r = e[t + 14] & 1, i = t + 13; i >= t; --i) r = r * 256 + e[i];
	return (e[t + 15] & 128 ? -r : r) * 10 ** (n - 6176);
}
function Jh(e, t) {
	var n = t.l, r = e[n] & 127;
	varint: if (e[n++] >= 128 && (r |= (e[n] & 127) << 7, e[n++] < 128 || (r |= (e[n] & 127) << 14, e[n++] < 128) || (r |= (e[n] & 127) << 21, e[n++] < 128) || (r += (e[n] & 127) * 2 ** 28, ++n, e[n++] < 128) || (r += (e[n] & 127) * 2 ** 35, ++n, e[n++] < 128) || (r += (e[n] & 127) * 2 ** 42, ++n, e[n++] < 128))) break varint;
	return t.l = n, r;
}
function Yh(e) {
	var t = 0, n = e[t] & 127;
	return e[t++] < 128 || (n |= (e[t] & 127) << 7, e[t++] < 128) || (n |= (e[t] & 127) << 14, e[t++] < 128) || (n |= (e[t] & 127) << 21, e[t++] < 128) || (n |= (e[t] & 15) << 28), n;
}
function Xh(e) {
	for (var t = [], n = { l: 0 }; n.l < e.length;) {
		var r = n.l, i = Jh(e, n), a = i & 7;
		i = i / 8 | 0;
		var o, s = n.l;
		switch (a) {
			case 0:
				for (; e[s++] >= 128;);
				o = e[Hh](n.l, s), n.l = s;
				break;
			case 1:
				o = e[Hh](s, s + 8), n.l = s + 8;
				break;
			case 2:
				var c = Jh(e, n);
				o = e[Hh](n.l, n.l + c), n.l += c;
				break;
			case 5:
				o = e[Hh](s, s + 4), n.l = s + 4;
				break;
			default: throw Error(`PB Type ${a} for Field ${i} at offset ${r}`);
		}
		var l = {
			data: o,
			type: a
		};
		t[i] ?? (t[i] = []), t[i].push(l);
	}
	return t;
}
function Zh(e, t) {
	return e?.map(function(e) {
		return t(e.data);
	}) || [];
}
function Qh(e) {
	for (var t = [], n = { l: 0 }; n.l < e.length;) {
		var r = Jh(e, n), i = Xh(e[Hh](n.l, n.l + r));
		n.l += r;
		var a = {
			id: Yh(i[1][0].data),
			messages: []
		};
		i[2].forEach(function(t) {
			var r = Xh(t.data), i = Yh(r[3][0].data);
			a.messages.push({
				meta: r,
				data: e[Hh](n.l, n.l + i)
			}), n.l += i;
		}), i[3]?.[0] && (a.merge = Yh(i[3][0].data) >>> 0 > 0), t.push(a);
	}
	return t;
}
function $h(e, t) {
	if (e != 0) throw Error(`Unexpected Snappy chunk type ${e}`);
	for (var n = { l: 0 }, r = Jh(t, n), i = [], a = n.l; a < t.length;) {
		var o = t[a] & 3;
		if (o == 0) {
			var s = t[a++] >> 2;
			if (s < 60) ++s;
			else {
				var c = s - 59;
				s = t[a], c > 1 && (s |= t[a + 1] << 8), c > 2 && (s |= t[a + 2] << 16), c > 3 && (s |= t[a + 3] << 24), s >>>= 0, s++, a += c;
			}
			i.push(t[Hh](a, a + s)), a += s;
		} else {
			var l = 0, u = 0;
			if (o == 1 ? (u = (t[a] >> 2 & 7) + 4, l = (t[a++] & 224) << 3, l |= t[a++]) : (u = (t[a++] >> 2) + 1, o == 2 ? (l = t[a] | t[a + 1] << 8, a += 2) : (l = (t[a] | t[a + 1] << 8 | t[a + 2] << 16 | t[a + 3] << 24) >>> 0, a += 4)), l == 0) throw Error("Invalid offset 0");
			for (var d = i.length - 1, f = l; d >= 0 && f >= i[d].length;) f -= i[d].length, --d;
			if (d < 0) {
				if (f == 0) f = i[d = 0].length;
				else throw Error("Invalid offset beyond length");
			}
			if (u < f) i.push(i[d][Hh](i[d].length - f, i[d].length - f + u));
			else {
				for (f > 0 && (i.push(i[d][Hh](i[d].length - f)), u -= f), ++d; u >= i[d].length;) i.push(i[d]), u -= i[d].length, ++d;
				u && i.push(i[d][Hh](0, u));
			}
			i.length > 25 && (i = [Gh(i)]);
		}
	}
	for (var p = 0, m = 0; m < i.length; ++m) p += i[m].length;
	if (p != r) throw Error(`Unexpected length: ${p} != ${r}`);
	return i;
}
function eg(e) {
	Array.isArray(e) && (e = new Uint8Array(e));
	for (var t = [], n = 0; n < e.length;) {
		var r = e[n++], i = e[n] | e[n + 1] << 8 | e[n + 2] << 16;
		n += 3, t.push.apply(t, $h(r, e[Hh](n, n + i))), n += i;
	}
	if (n !== e.length) throw Error("data is not a valid framed stream!");
	return t.length == 1 ? t[0] : Gh(t);
}
var tg = function() {
	return {
		sst: [],
		rsst: [],
		ofmt: [],
		nfmt: [],
		fmla: [],
		ferr: [],
		cmnt: []
	};
};
function ng(e, t, n, r, i) {
	var a = t & 255, o = t >> 8, s = (o >= 5 ? i : r) || [];
	dur: if (n & (o > 4 ? 8 : 4) && e.t == "n" && a == 7) {
		var c = s[7]?.[0] ? Yh(s[7][0].data) : -1;
		if (c == -1) break dur;
		var l = s[15]?.[0] ? Yh(s[15][0].data) : -1, u = s[16]?.[0] ? Yh(s[16][0].data) : -1, d = s[40]?.[0] ? Yh(s[40][0].data) : -1, f = e.v, p = f;
		autodur: if (d) {
			if (f == 0) {
				l = u = 2;
				break autodur;
			}
			l = f >= 604800 ? 1 : f >= 86400 ? 2 : f >= 3600 ? 4 : f >= 60 ? 8 : f >= 1 ? 16 : 32, Math.floor(f) == f ? f % 60 ? u = 16 : f % 3600 ? u = 8 : f % 86400 ? u = 4 : f % 604800 && (u = 2) : u = 32, u < l && (u = l);
		}
		if (l == -1 || u == -1) break dur;
		var m = [], h = [];
		l == 1 && (p = f / 604800, u == 1 ? h.push("d\"d\"") : (p |= 0, f -= 604800 * p), m.push(p + (c == 2 ? " week" + (p == 1 ? "" : "s") : c == 1 ? "w" : ""))), l <= 2 && u >= 2 && (p = f / 86400, u > 2 && (p |= 0, f -= 86400 * p), h.push("d\"d\""), m.push(p + (c == 2 ? " day" + (p == 1 ? "" : "s") : c == 1 ? "d" : ""))), l <= 4 && u >= 4 && (p = f / 3600, u > 4 && (p |= 0, f -= 3600 * p), h.push((l >= 4 ? "[h]" : "h") + "\"h\""), m.push(p + (c == 2 ? " hour" + (p == 1 ? "" : "s") : c == 1 ? "h" : ""))), l <= 8 && u >= 8 && (p = f / 60, u > 8 && (p |= 0, f -= 60 * p), h.push((l >= 8 ? "[m]" : "m") + "\"m\""), c == 0 ? m.push((l == 8 && u == 8 || p >= 10 ? "" : "0") + p) : m.push(p + (c == 2 ? " minute" + (p == 1 ? "" : "s") : c == 1 ? "m" : ""))), l <= 16 && u >= 16 && (p = f, u > 16 && (p |= 0, f -= p), h.push((l >= 16 ? "[s]" : "s") + "\"s\""), c == 0 ? m.push((u == 16 && l == 16 || p >= 10 ? "" : "0") + p) : m.push(p + (c == 2 ? " second" + (p == 1 ? "" : "s") : c == 1 ? "s" : ""))), u >= 32 && (p = Math.round(1e3 * f), l < 32 && h.push(".000\"ms\""), c == 0 ? m.push((p >= 100 ? "" : p >= 10 ? "0" : "00") + p) : m.push(p + (c == 2 ? " millisecond" + (p == 1 ? "" : "s") : c == 1 ? "ms" : ""))), e.w = m.join(c == 0 ? ":" : " "), e.z = h.join(c == 0 ? "\":\"" : " "), c == 0 && (e.w = e.w.replace(/:(\d\d\d)$/, ".$1"));
	}
}
function rg(e, t, n, r) {
	var i = Uh(e), a = i.getUint32(4, !0), o = -1, s = -1, c = -1, l = NaN, u = 0, d = new Date(Date.UTC(2001, 0, 1)), f = n > 1 ? 12 : 8;
	a & 2 && (c = i.getUint32(f, !0), f += 4), f += Kh(a & (n > 1 ? 3468 : 396)) * 4, a & 512 && (o = i.getUint32(f, !0), f += 4), f += Kh(a & (n > 1 ? 12288 : 4096)) * 4, a & 16 && (s = i.getUint32(f, !0), f += 4), a & 32 && (l = i.getFloat64(f, !0), f += 8), a & 64 && (d.setTime(d.getTime() + (u = i.getFloat64(f, !0)) * 1e3), f += 8), n > 1 && (a = i.getUint32(8, !0) >>> 16, a & 255 && (c == -1 && (c = i.getUint32(f, !0)), f += 4));
	var p, m = e[n >= 4 ? 1 : 2];
	switch (m) {
		case 0: return;
		case 2:
			p = {
				t: "n",
				v: l
			};
			break;
		case 3:
			p = {
				t: "s",
				v: t.sst[s]
			};
			break;
		case 5:
			p = r?.cellDates ? {
				t: "d",
				v: d
			} : {
				t: "n",
				v: u / 86400 + 35430,
				z: W[14]
			};
			break;
		case 6:
			p = {
				t: "b",
				v: l > 0
			};
			break;
		case 7:
			p = {
				t: "n",
				v: l
			};
			break;
		case 8:
			p = {
				t: "e",
				v: 0
			};
			break;
		case 9:
			if (o > -1) {
				var h = t.rsst[o];
				p = {
					t: "s",
					v: h.v
				}, h.l && (p.l = { Target: h.l });
			} else throw Error(`Unsupported cell type ${e[Hh](0, 4)}`);
			break;
		default: throw Error(`Unsupported cell type ${e[Hh](0, 4)}`);
	}
	return c > -1 && ng(p, m | n << 8, a, t.ofmt[c], t.nfmt[c]), m == 7 && (p.v /= 86400), p;
}
function ig(e, t, n) {
	var r = Uh(e);
	r.getUint32(4, !0);
	var i = r.getUint32(8, !0), a = 12, o = -1, s = -1, c = -1, l = NaN, u = NaN, d = 0, f = new Date(Date.UTC(2001, 0, 1));
	i & 1 && (l = qh(e, a), a += 16), i & 2 && (u = r.getFloat64(a, !0), a += 8), i & 4 && (f.setTime(f.getTime() + (d = r.getFloat64(a, !0)) * 1e3), a += 8), i & 8 && (s = r.getUint32(a, !0), a += 4), i & 16 && (o = r.getUint32(a, !0), a += 4), a += Kh(i & 480) * 4, i & 512 && (r.getUint32(a, !0), a += 4), a += Kh(i & 1024) * 4, i & 2048 && (r.getUint32(a, !0), a += 4);
	var p, m = e[1];
	switch (m) {
		case 0:
			p = { t: "z" };
			break;
		case 2:
			p = {
				t: "n",
				v: l
			};
			break;
		case 3:
			p = {
				t: "s",
				v: t.sst[s]
			};
			break;
		case 5:
			p = n?.cellDates ? {
				t: "d",
				v: f
			} : {
				t: "n",
				v: d / 86400 + 35430,
				z: W[14]
			};
			break;
		case 6:
			p = {
				t: "b",
				v: u > 0
			};
			break;
		case 7:
			p = {
				t: "n",
				v: u
			};
			break;
		case 8:
			p = {
				t: "e",
				v: 0
			};
			break;
		case 9:
			if (o > -1) {
				var h = t.rsst[o];
				p = {
					t: "s",
					v: h.v
				}, h.l && (p.l = { Target: h.l });
			} else throw Error(`Unsupported cell type ${e[1]} : ${i & 31} : ${e[Hh](0, 4)}`);
			break;
		case 10:
			p = {
				t: "n",
				v: l
			};
			break;
		default: throw Error(`Unsupported cell type ${e[1]} : ${i & 31} : ${e[Hh](0, 4)}`);
	}
	if (a += Kh(i & 4096) * 4, i & 516096 && (c == -1 && (c = r.getUint32(a, !0)), a += 4), i & 524288) {
		var g = r.getUint32(a, !0);
		a += 4, t.cmnt[g] && (p.c = dg(t.cmnt[g]));
	}
	return c > -1 && ng(p, m | 1280, i >> 13, t.ofmt[c], t.nfmt[c]), m == 7 && (p.v /= 86400), p;
}
function ag(e, t, n) {
	switch (e[0]) {
		case 0:
		case 1:
		case 2:
		case 3:
		case 4: return rg(e, t, e[0], n);
		case 5: return ig(e, t, n);
		default: throw Error(`Unsupported payload version ${e[0]}`);
	}
}
function og(e) {
	return Yh(Xh(e)[1][0].data);
}
function sg(e, t) {
	var n = Xh(t.data), r = Yh(n[1][0].data), i = n[3], a = [];
	return (i || []).forEach(function(t) {
		var n = Xh(t.data);
		if (n[1]) {
			var i = Yh(n[1][0].data) >>> 0;
			switch (r) {
				case 1:
					a[i] = Wh(n[3][0].data);
					break;
				case 8:
					var o = e[og(n[9][0].data)][0], s = e[og(Xh(o.data)[1][0].data)][0], c = Yh(s.meta[1][0].data);
					if (c != 2001) throw Error(`2000 unexpected reference to ${c}`);
					var l = Xh(s.data), u = { v: l[3].map(function(e) {
						return Wh(e.data);
					}).join("") };
					a[i] = u;
					sfields: if (l?.[11]?.[0]) {
						var d = Xh(l[11][0].data)?.[1];
						if (!d) break sfields;
						d.forEach(function(t) {
							var n = Xh(t.data);
							if (n[2]?.[0]) {
								var r = e[og(n[2]?.[0].data)][0], i = Yh(r.meta[1][0].data);
								switch (i) {
									case 2032:
										var a = Xh(r.data);
										a?.[2]?.[0] && !u.l && (u.l = Wh(a[2][0].data));
										break;
									case 2039: break;
									default: console.log(`unrecognized ObjectAttribute type ${i}`);
								}
							}
						});
					}
					break;
				case 2:
					a[i] = Xh(n[6][0].data);
					break;
				case 3:
					a[i] = Xh(n[5][0].data);
					break;
				case 10:
					var f = e[og(n[10][0].data)][0];
					a[i] = ug(e, f.data);
					break;
				default: throw r;
			}
		}
	}), a;
}
function cg(e, t) {
	var n = Xh(e), r = Yh(n[1][0].data) >>> 0, i = Yh(n[2][0].data) >>> 0, a = n[8]?.[0]?.data && Yh(n[8][0].data) > 0 || !1, o, s;
	if (n[7]?.[0]?.data && t != 0) o = n[7]?.[0]?.data, s = n[6]?.[0]?.data;
	else if (n[4]?.[0]?.data && t != 1) o = n[4]?.[0]?.data, s = n[3]?.[0]?.data;
	else throw `NUMBERS Tile missing ${t} cell storage`;
	for (var c = a ? 4 : 1, l = Uh(o), u = [], d = 0; d < o.length / 2; ++d) {
		var f = l.getUint16(d * 2, !0);
		f < 65535 && u.push([d, f]);
	}
	if (u.length != i) throw `Expected ${i} cells, found ${u.length}`;
	var p = [];
	for (d = 0; d < u.length - 1; ++d) p[u[d][0]] = s[Hh](u[d][1] * c, u[d + 1][1] * c);
	return u.length >= 1 && (p[u[u.length - 1][0]] = s[Hh](u[u.length - 1][1] * c)), {
		R: r,
		cells: p
	};
}
function lg(e, t) {
	var n = Xh(t.data), r = -1;
	n?.[7]?.[0] && (r = Yh(n[7][0].data) >>> 0 ? 1 : 0);
	var i = Zh(n[5], function(e) {
		return cg(e, r);
	});
	return {
		nrows: Yh(n[4][0].data) >>> 0,
		data: i.reduce(function(e, t) {
			return e[t.R] || (e[t.R] = []), t.cells.forEach(function(n, r) {
				if (e[t.R][r]) throw Error(`Duplicate cell r=${t.R} c=${r}`);
				e[t.R][r] = n;
			}), e;
		}, [])
	};
}
function ug(e, t) {
	var n = {
		t: "",
		a: ""
	}, r = Xh(t);
	if (r?.[1]?.[0]?.data && (n.t = Wh(r?.[1]?.[0]?.data) || ""), r?.[3]?.[0]?.data) {
		var i = e[og(r?.[3]?.[0]?.data)][0], a = Xh(i.data);
		a[1]?.[0]?.data && (n.a = Wh(a[1][0].data));
	}
	return r?.[4] && (n.replies = [], r[4].forEach(function(t) {
		var r = e[og(t.data)][0];
		n.replies.push(ug(e, r.data));
	})), n;
}
function dg(e) {
	var t = [];
	return t.push({
		t: e.t || "",
		a: e.a,
		T: e.replies && e.replies.length > 0
	}), e.replies && e.replies.forEach(function(e) {
		t.push({
			t: e.t || "",
			a: e.a,
			T: !0
		});
	}), t;
}
function fg(e, t, n, r) {
	var i = Xh(t.data), a = {
		s: {
			r: 0,
			c: 0
		},
		e: {
			r: 0,
			c: 0
		}
	};
	if (a.e.r = (Yh(i[6][0].data) >>> 0) - 1, a.e.r < 0) throw Error(`Invalid row varint ${i[6][0].data}`);
	if (a.e.c = (Yh(i[7][0].data) >>> 0) - 1, a.e.c < 0) throw Error(`Invalid col varint ${i[7][0].data}`);
	n["!ref"] = Z(a);
	var o = n["!data"] != null, s = n, c = Xh(i[4][0].data), l = tg();
	c[4]?.[0] && (l.sst = sg(e, e[og(c[4][0].data)][0])), c[6]?.[0] && (l.fmla = sg(e, e[og(c[6][0].data)][0])), c[11]?.[0] && (l.ofmt = sg(e, e[og(c[11][0].data)][0])), c[12]?.[0] && (l.ferr = sg(e, e[og(c[12][0].data)][0])), c[17]?.[0] && (l.rsst = sg(e, e[og(c[17][0].data)][0])), c[19]?.[0] && (l.cmnt = sg(e, e[og(c[19][0].data)][0])), c[22]?.[0] && (l.nfmt = sg(e, e[og(c[22][0].data)][0]));
	var u = Xh(c[3][0].data), d = 0;
	if (!c[9]?.[0]) throw "NUMBERS file missing row tree";
	if (Xh(c[9][0].data)[1].map(function(e) {
		return Xh(e.data);
	}).forEach(function(t) {
		d = Yh(t[1][0].data);
		var i = Yh(t[2][0].data), a = u[1][i];
		if (!a) throw "NUMBERS missing tile " + i;
		var c = e[og(Xh(a.data)[2][0].data)][0], f = Yh(c.meta[1][0].data);
		if (f != 6002) throw Error(`6001 unexpected reference to ${f}`);
		var p = lg(e, c);
		p.data.forEach(function(e, t) {
			e.forEach(function(e, i) {
				var a = ag(e, l, r);
				a && (o ? (s["!data"][d + t] || (s["!data"][d + t] = []), s["!data"][d + t][i] = a) : n[Er(i) + Sr(d + t)] = a);
			});
		}), d += p.nrows;
	}), c[13]?.[0]) {
		var f = e[og(c[13][0].data)][0], p = Yh(f.meta[1][0].data);
		if (p != 6144) throw Error(`Expected merge type 6144, found ${p}`);
		n["!merges"] = Xh(f.data)?.[1].map(function(e) {
			var t = Xh(e.data), n = Uh(Xh(t[1][0].data)[1][0].data), r = Uh(Xh(t[2][0].data)[1][0].data);
			return {
				s: {
					r: n.getUint16(0, !0),
					c: n.getUint16(2, !0)
				},
				e: {
					r: n.getUint16(0, !0) + r.getUint16(0, !0) - 1,
					c: n.getUint16(2, !0) + r.getUint16(2, !0) - 1
				}
			};
		});
	}
	if (!n["!merges"]?.length && i[47]?.[0]) {
		var m = Xh(i[47][0].data);
		if (m[2]?.[0]) {
			var h = Xh(m[2][0].data);
			h[3]?.[0] && (n["!merges"] = Zh(h[3], function(e) {
				var t = Xh(Xh(Xh(e)[2][0].data)[1][0].data);
				if (t[1]?.[0]) {
					var n = Xh(t[1][0].data);
					if (Yh(n[1][0].data) == 67) {
						var r = Xh(n[40][0].data);
						if (r[3]?.[0] && r[4]?.[0]) {
							var i = Xh(r[3][0].data), a = Xh(r[4][0].data), o = Yh(i[1][0].data), s = i[2]?.[0] ? Yh(i[2][0].data) : o, c = Yh(a[1][0].data), l = a[2]?.[0] ? Yh(a[2][0].data) : c;
							return {
								s: {
									r: c,
									c: o
								},
								e: {
									r: l,
									c: s
								}
							};
						}
					}
				}
			}).filter(function(e) {
				return e != null;
			}));
		}
	}
}
function pg(e, t, n) {
	var r = Xh(t.data), i = { "!ref": "A1" };
	n?.dense && (i["!data"] = []);
	var a = e[og(r[2][0].data)], o = Yh(a[0].meta[1][0].data);
	if (o != 6001) throw Error(`6000 unexpected reference to ${o}`);
	return fg(e, a[0], i, n), i;
}
function mg(e, t, n) {
	var r = Xh(t.data), i = {
		name: r[1]?.[0] ? Wh(r[1][0].data) : "",
		sheets: []
	};
	return Zh(r[2], og).forEach(function(t) {
		e[t].forEach(function(t) {
			Yh(t.meta[1][0].data) == 6e3 && i.sheets.push(pg(e, t, n));
		});
	}), i;
}
function hg(e, t, n) {
	var r = Jg();
	r.Workbook = { WBProps: { date1904: !0 } };
	var i = Xh(t.data);
	if (i[2]?.[0]) throw Error("Keynote presentations are not supported");
	if (Zh(i[1], og).forEach(function(t) {
		e[t].forEach(function(t) {
			if (Yh(t.meta[1][0].data) == 2) {
				var i = mg(e, t, n);
				i.sheets.forEach(function(e, t) {
					Yg(r, e, t == 0 ? i.name : i.name + "_" + t, !0);
				});
			}
		});
	}), r.SheetNames.length == 0) throw Error("Empty NUMBERS file");
	return r.bookType = "numbers", r;
}
function gg(e, t) {
	var n = {}, r = [];
	if (e.FullPaths.forEach(function(e) {
		if (e.match(/\.iwpv2/)) throw Error("Unsupported password protection");
	}), e.FileIndex.forEach(function(e) {
		if (e.name.match(/\.iwa$/) && e.content[0] == 0) {
			var t;
			try {
				t = eg(e.content);
			} catch (t) {
				return console.log("?? " + e.content.length + " " + (t.message || t));
			}
			var i;
			try {
				i = Qh(t);
			} catch (e) {
				return console.log("## " + (e.message || e));
			}
			i.forEach(function(e) {
				n[e.id] = e.messages, r.push(e.id);
			});
		}
	}), !r.length) throw Error("File has no messages");
	if (((n?.[1])?.[0].meta?.[1])?.[0].data && Yh(n[1][0].meta[1][0].data) == 1e4) throw Error("Pages documents are not supported");
	var i = (n?.[1]?.[0]?.meta?.[1])?.[0].data && Yh(n[1][0].meta[1][0].data) == 1 && n[1][0];
	if (i || r.forEach(function(e) {
		n[e].forEach(function(e) {
			if (Yh(e.meta[1][0].data) >>> 0 == 1) {
				if (!i) i = e;
				else throw Error("Document has multiple roots");
			}
		});
	}), !i) throw Error("Cannot find Document root");
	return hg(n, i, t);
}
function _g(e) {
	return function(t) {
		for (var n = 0; n != e.length; ++n) {
			var r = e[n];
			t[r[0]] === void 0 && (t[r[0]] = r[1]), r[2] === "n" && (t[r[0]] = Number(t[r[0]]));
		}
	};
}
function vg(e) {
	_g([
		["cellNF", !1],
		["cellHTML", !0],
		["cellFormula", !0],
		["cellStyles", !1],
		["cellText", !0],
		["cellDates", !1],
		["sheetStubs", !1],
		[
			"sheetRows",
			0,
			"n"
		],
		["bookDeps", !1],
		["bookSheets", !1],
		["bookProps", !1],
		["bookFiles", !1],
		["bookVBA", !1],
		["password", ""],
		["WTF", !1]
	])(e);
}
function yg(e) {
	return Fi.WS.indexOf(e) > -1 ? "sheet" : Fi.CS && e == Fi.CS ? "chart" : Fi.DS && e == Fi.DS ? "dialog" : Fi.MS && e == Fi.MS ? "macro" : e && e.length ? e : "sheet";
}
function bg(e, t) {
	if (!e) return 0;
	try {
		e = t.map(function(t) {
			return t.id ||= t.strRelID, [
				t.name,
				e["!id"][t.id].Target,
				yg(e["!id"][t.id].Type)
			];
		});
	} catch {
		return null;
	}
	return !e || e.length === 0 ? null : e;
}
function xg(e, t, n, r, i, a, o, s) {
	if (e && e["!legdrawel"]) {
		var c = Yt(n, en(e["!legdrawel"].Target, r), !0);
		c && Hl(xn(c), e, s || []);
	}
}
function Sg(e) {
	switch ((e || "").toLowerCase().replace(/.*\./, "")) {
		case "png": return "image/png";
		case "gif": return "image/gif";
		case "bmp": return "image/bmp";
		case "svg": return "image/svg+xml";
		case "jpg":
		case "jpeg": return "image/jpeg";
		case "tif":
		case "tiff": return "image/tiff";
		default: return "application/octet-stream";
	}
}
function Cg(e, t, n, r, i, a, o) {
	if (e && e["!drawel"] && a && (a.drawings || a.charts)) {
		var s = en(e["!drawel"].Target, r), c = Ii(s), l = Ol(Yt(n, s, !0), Li(Yt(n, c, !0), s));
		e["!drawings"] = l, a.drawings && l.images && l.images.length && l.images.forEach(function(e) {
			if (e && e.target) {
				var t = en(e.target, s), r = Xt(n, t, !0), i = Sg(t);
				r && (e.dataURI = "data:" + i + ";base64," + D(r)), e.contentType = i, e.path = t;
			}
		}), a.charts && l.charts && l.charts.length && (e["!charts"] = [], l.charts.forEach(function(t) {
			if (t && t.target) {
				var r = en(t.target, s), i = Ii(r), c = Lp(Yt(n, r, !0), r, a, Li(Yt(n, i, !0), r), o, { "!type": "chart" });
				t.model = c && c["!chart"], t.data = c, t.path = r, e["!charts"].push(t);
			}
		}));
	}
}
function wg(e, t, n, r, i, a, o, s, c, l, u, d) {
	try {
		a[r] = Li(Yt(e, n, !0), t);
		var f = Jt(e, t), p;
		switch (s) {
			case "sheet":
				p = im(f, t, i, c, a[r], l, u, d);
				break;
			case "chart":
				if (p = am(f, t, i, c, a[r], l, u, d), !p || !p["!drawel"] || !c.drawings && !c.charts) break;
				var m = en(p["!drawel"].Target, t), h = Ii(m), g = Ol(Yt(e, m, !0), Li(Yt(e, h, !0), m));
				if (p["!drawings"] = g, !c.charts || !g.chart) break;
				var _ = en(g.chart, m), v = Ii(_);
				p = Lp(Yt(e, _, !0), _, c, Li(Yt(e, v, !0), _), l, p), g.charts && g.charts.length && (g.charts[0].model = p && p["!chart"], p["!charts"] = g.charts);
				break;
			case "macro":
				p = om(f, t, i, c, a[r], l, u, d);
				break;
			case "dialog":
				p = sm(f, t, i, c, a[r], l, u, d);
				break;
			default: throw Error("Unrecognized sheet type " + s);
		}
		s == "sheet" && Kf(p, e, t, a[r], c, u, d), Rr(o, r, p);
		var y = [], b = [];
		a && a[r] && st(a[r]).forEach(function(n) {
			var i = "";
			if (a[r][n].Type == Fi.CMNT) {
				if (i = en(a[r][n].Target, t), y = um(Jt(e, i, !0), i, c), !y || !y.length) return;
				Ul(p, y, !1);
			}
			a[r][n].Type == Fi.TCMNT && (i = en(a[r][n].Target, t), b = b.concat(Gl(Jt(e, i, !0), c)));
		}), b && b.length && Ul(p, b, !0, c.people || []), s == "sheet" && Cg(p, s, e, t, i, c, l), xg(p, s, e, t, i, c, l, y);
	} catch (e) {
		if (c.WTF || c.validateMerges && e && /^E_MERGE_/.test(e.code)) throw e;
	}
}
function Tg(e) {
	return e.charAt(0) == "/" ? e.slice(1) : e;
}
function Eg(e, t) {
	if (Xe(), t ||= {}, vg(t), Kt(e, "META-INF/manifest.xml") || Kt(e, "objectdata.xml")) return Bh(e, t);
	if (Kt(e, "Index/Document.iwa")) {
		if (typeof Uint8Array > "u") throw Error("NUMBERS file parsing requires Uint8Array support");
		if (gg !== void 0) {
			if (e.FileIndex) return gg(e, t);
			var n = it.utils.cfb_new();
			return Zt(e).forEach(function(t) {
				Qt(n, t, Xt(e, t));
			}), gg(n, t);
		}
		throw Error("Unsupported NUMBERS file");
	}
	if (!Kt(e, "[Content_Types].xml")) {
		if (Kt(e, "index.xml.gz")) throw Error("Unsupported NUMBERS 08 file");
		if (Kt(e, "index.xml")) throw Error("Unsupported NUMBERS 09 file");
		var r = it.find(e, "Index.zip");
		if (r) return t = bt(t), delete t.type, typeof r.content == "string" && (t.type = "binary"), typeof Bun < "u" && Buffer.isBuffer(r.content) ? Ig(new Uint8Array(r.content), t) : Ig(r.content, t);
		throw Error("Unsupported ZIP file");
	}
	var i = Zt(e), a = Pi(Yt(e, "[Content_Types].xml")), o = !1, s, c;
	if (a.workbooks.length === 0 && (c = "xl/workbook.xml", Jt(e, c, !0) && a.workbooks.push(c)), a.workbooks.length === 0) {
		if (c = "xl/workbook.bin", !Jt(e, c, !0)) throw Error("Could not find workbook");
		a.workbooks.push(c), o = !0;
	}
	a.workbooks[0].slice(-3) == "bin" && (o = !0);
	var l = {}, u = {};
	if (!t.bookSheets && !t.bookProps) {
		if (ef = [], a.sst) try {
			ef = lm(Jt(e, Tg(a.sst)), a.sst, t);
		} catch (e) {
			if (t.WTF) throw e;
		}
		t.cellStyles && a.themes.length && (l = ll(Yt(e, a.themes[0].replace(/^\//, ""), !0) || "", t)), a.style && (u = cm(Jt(e, Tg(a.style)), a.style, l, t));
	}
	a.links.map(function(n) {
		try {
			var r = Li(Yt(e, Ii(Tg(n))), n);
			return fm(Jt(e, Tg(n)), r, n, t);
		} catch {}
	});
	var d = rm(Jt(e, Tg(a.workbooks[0])), a.workbooks[0], t), f = {}, p = "";
	a.coreprops.length && (p = Jt(e, Tg(a.coreprops[0]), !0), p && (f = Vi(p)), a.extprops.length !== 0 && (p = Jt(e, Tg(a.extprops[0]), !0), p && Wi(p, f, t)));
	var m = {};
	(!t.bookSheets || t.bookProps) && a.custprops.length !== 0 && (p = Yt(e, Tg(a.custprops[0]), !0), p && (m = Ki(p, t)));
	var h = {};
	if ((t.bookSheets || t.bookProps) && (d.Sheets ? s = d.Sheets.map(function(e) {
		return e.name;
	}) : f.Worksheets && f.SheetNames.length > 0 && (s = f.SheetNames), t.bookProps && (h.Props = f, h.Custprops = m), t.bookSheets && s !== void 0 && (h.SheetNames = s), t.bookSheets ? h.SheetNames : t.bookProps)) return h;
	s = Lr();
	var g = {};
	t.bookDeps && a.calcchain && (g = dm(Jt(e, Tg(a.calcchain)), a.calcchain, t));
	var _ = 0, v = {}, y, b, x = d.Sheets;
	f.Worksheets = x.length, f.SheetNames = [];
	for (var S = 0; S != x.length; ++S) f.SheetNames[S] = x[S].name;
	var C = o ? "bin" : "xml", w = a.workbooks[0].lastIndexOf("/"), T = (a.workbooks[0].slice(0, w + 1) + "_rels/" + a.workbooks[0].slice(w + 1) + ".rels").replace(/^\//, "");
	Kt(e, T) || (T = "xl/_rels/workbook." + C + ".rels");
	var E = Li(Yt(e, T, !0), T.replace(/_rels.*/, "s5s"));
	(a.metadata || []).length >= 1 && (t.xlmeta = pm(Jt(e, Tg(a.metadata[0])), a.metadata[0], t)), (a.people || []).length >= 1 && (t.people = Kl(Jt(e, Tg(a.people[0])), t)), E &&= bg(E, d.Sheets);
	var D = +!!Jt(e, "xl/worksheets/sheet.xml", !0);
	wsloop: for (_ = 0; _ != f.Worksheets; ++_) {
		var O = "sheet";
		if (E && E[_] ? (y = "xl/" + E[_][1].replace(/[\/]?xl\//, ""), Kt(e, y) || (y = E[_][1]), Kt(e, y) || (y = T.replace(/_rels\/[\S\s]*$/, "") + E[_][1]), O = E[_][2]) : (y = "xl/worksheets/sheet" + (_ + 1 - D) + "." + C, y = y.replace(/sheet0\./, "sheet.")), b = y.replace(/^(.*)(\/)([^\/]*)$/, "$1/_rels/$3.rels"), t && t.sheets != null) switch (typeof t.sheets) {
			case "number":
				if (_ != t.sheets) continue wsloop;
				break;
			case "string":
				if (f.SheetNames[_].toLowerCase() != t.sheets.toLowerCase()) continue wsloop;
				break;
			default: if (Array.isArray && Array.isArray(t.sheets)) {
				for (var k = !1, A = 0; A != t.sheets.length; ++A) typeof t.sheets[A] == "number" && t.sheets[A] == _ && (k = 1), typeof t.sheets[A] == "string" && t.sheets[A].toLowerCase() == f.SheetNames[_].toLowerCase() && (k = 1);
				if (!k) continue wsloop;
			}
		}
		wg(e, y, b, f.SheetNames[_], _, v, s, O, t, d, l, u);
	}
	return h = {
		Directory: a,
		Workbook: d,
		Props: f,
		Custprops: m,
		Deps: g,
		Sheets: s,
		SheetNames: f.SheetNames,
		Strings: ef,
		Styles: u,
		Themes: l,
		SSF: bt(W)
	}, t && t.bookFiles && (e.files ? (h.keys = i, h.files = e.files) : (h.keys = [], h.files = {}, e.FullPaths.forEach(function(t, n) {
		t = t.replace(/^Root Entry[\/]/, ""), h.keys.push(t), h.files[t] = e.FileIndex[n];
	}))), t && t.bookVBA && (a.vba.length > 0 ? h.vbaraw = Jt(e, Tg(a.vba[0]), !0) : a.defaults && a.defaults.bin === Xl && (h.vbaraw = Jt(e, "xl/vbaProject.bin", !0))), h.bookType = o ? "xlsb" : "xlsx", h;
}
function Dg(e, t) {
	var n = t || {}, r = "Workbook", i = it.find(e, r);
	try {
		if (r = "/!DataSpaces/Version", i = it.find(e, r), !i || !i.content || (As(i.content), r = "/!DataSpaces/DataSpaceMap", i = it.find(e, r), !i || !i.content)) throw Error("ECMA-376 Encrypted file missing " + r);
		var a = Ms(i.content);
		if (a.length !== 1 || a[0].comps.length !== 1 || a[0].comps[0].t !== 0 || a[0].name !== "StrongEncryptionDataSpace" || a[0].comps[0].v !== "EncryptedPackage") throw Error("ECMA-376 Encrypted file bad " + r);
		if (r = "/!DataSpaces/DataSpaceInfo/StrongEncryptionDataSpace", i = it.find(e, r), !i || !i.content) throw Error("ECMA-376 Encrypted file missing " + r);
		var o = Ns(i.content);
		if (o.length != 1 || o[0] != "StrongEncryptionTransform") throw Error("ECMA-376 Encrypted file bad " + r);
		if (r = "/!DataSpaces/TransformInfo/StrongEncryptionTransform/!Primary", i = it.find(e, r), !i || !i.content) throw Error("ECMA-376 Encrypted file missing " + r);
		Fs(i.content);
	} catch {}
	if (r = "/EncryptionInfo", i = it.find(e, r), !i || !i.content) throw Error("ECMA-376 Encrypted file missing " + r);
	var s = Rs(i.content);
	if (r = "/EncryptedPackage", i = it.find(e, r), !i || !i.content) throw Error("ECMA-376 Encrypted file missing " + r);
	if (s[0] == 4 && typeof decrypt_agile < "u") return decrypt_agile(s[1], i.content, n.password || "", n);
	if (s[0] == 2 && typeof decrypt_std76 < "u") return decrypt_std76(s[1], i.content, n.password || "", n);
	throw Error("File is password-protected");
}
function Og(e, t) {
	var n = "";
	switch ((t || {}).type || "base64") {
		case "buffer": return [
			e[0],
			e[1],
			e[2],
			e[3],
			e[4],
			e[5],
			e[6],
			e[7]
		];
		case "base64":
			n = O(e.slice(0, 12));
			break;
		case "binary":
			n = e;
			break;
		case "array": return [
			e[0],
			e[1],
			e[2],
			e[3],
			e[4],
			e[5],
			e[6],
			e[7]
		];
		default: throw Error("Unrecognized type " + (t && t.type || "undefined"));
	}
	return [
		n.charCodeAt(0),
		n.charCodeAt(1),
		n.charCodeAt(2),
		n.charCodeAt(3),
		n.charCodeAt(4),
		n.charCodeAt(5),
		n.charCodeAt(6),
		n.charCodeAt(7)
	];
}
function kg(e, t) {
	return it.find(e, "EncryptedPackage") ? Dg(e, t) : eh(e, t);
}
function Ag(e, t) {
	var n, r = e, i = t || {};
	return i.type ||= k && Buffer.isBuffer(e) ? "buffer" : "base64", n = $t(r, i), Eg(n, i);
}
function jg(e, t) {
	var n = 0;
	main: for (; n < e.length;) switch (e.charCodeAt(n)) {
		case 10:
		case 13:
		case 32:
			++n;
			break;
		case 60: return Dm(e.slice(n), t);
		default: break main;
	}
	return ps.to_workbook(e, t);
}
function Mg(e, t) {
	var n = "", r = Og(e, t);
	switch (t.type) {
		case "base64":
			n = O(e);
			break;
		case "binary":
			n = e;
			break;
		case "buffer":
			n = e.toString("binary");
			break;
		case "array":
			n = yt(e);
			break;
		default: throw Error("Unrecognized type " + t.type);
	}
	return r[0] == 239 && r[1] == 187 && r[2] == 191 && (n = xn(n)), t.type = "binary", jg(n, t);
}
function Ng(e, t) {
	var n = e;
	return t.type == "base64" && (n = O(n)), typeof ArrayBuffer < "u" && e instanceof ArrayBuffer && (n = new Uint8Array(e)), n = k && Buffer.isBuffer(e) ? e.slice(2).toString("utf16le") : typeof Uint8Array < "u" && n instanceof Uint8Array ? typeof TextDecoder < "u" ? new TextDecoder("utf-16le").decode(n.slice(2)) : v(n.slice(2)) : _(n.slice(2)), t.type = "binary", jg(n, t);
}
function Pg(e) {
	return e.match(/[^\x00-\x7F]/) ? Sn(e) : e;
}
function Fg(e, t, n, r) {
	return r ? (n.type = "string", ps.to_workbook(e, n)) : ps.to_workbook(t, n);
}
function Ig(e, t) {
	h();
	var n = t || {};
	if (n.codepage && console.error("Codepage tables are not loaded.  Non-ASCII characters may not give expected results"), typeof ArrayBuffer < "u" && e instanceof ArrayBuffer) return Ig(new Uint8Array(e), (n = bt(n), n.type = "array", n));
	if (typeof Int8Array < "u" && e instanceof Int8Array) return Ig(new Uint8Array(e.buffer, e.byteOffset, e.length), n);
	typeof Uint8Array < "u" && e instanceof Uint8Array && !n.type && (n.type = typeof Deno < "u" ? "buffer" : "array");
	var r = e, i = [
		0,
		0,
		0,
		0
	], a = !1;
	if (n.cellStyles && (n.cellNF = !0, n.sheetStubs = !0), tf = {}, n.dateNF && (tf.dateNF = n.dateNF), n.type || (n.type = k && Buffer.isBuffer(e) ? "buffer" : "base64"), n.type == "file" && (n.type = k ? "buffer" : "binary", r = ot(e), typeof Uint8Array < "u" && !k && (n.type = "array")), n.type == "string" && (a = !0, n.type = "binary", n.codepage = 65001, r = Pg(e)), n.type == "array" && typeof Uint8Array < "u" && e instanceof Uint8Array && typeof ArrayBuffer < "u") {
		var o = new Uint8Array(/* @__PURE__ */ new ArrayBuffer(3));
		if (o.foo = "bar", !o.foo) return n = bt(n), n.type = "array", Ig(F(r), n);
	}
	switch ((i = Og(r, n))[0]) {
		case 208:
			if (i[1] === 207 && i[2] === 17 && i[3] === 224 && i[4] === 161 && i[5] === 177 && i[6] === 26 && i[7] === 225) return kg(it.read(r, n), n);
			break;
		case 9:
			if (i[1] <= 8) return eh(r, n);
			break;
		case 60: return Dm(r, n);
		case 73:
			if (i[1] === 73 && i[2] === 42 && i[3] === 0) throw Error("TIFF Image File is not a spreadsheet");
			if (i[1] === 68) return ms(r, n);
			break;
		case 84:
			if (i[1] === 65 && i[2] === 66 && i[3] === 76) return hs(r, n);
			break;
		case 80: return i[1] === 75 && i[2] < 9 && i[3] < 9 ? Ag(r, n) : Fg(e, r, n, a);
		case 239: return i[3] === 60 ? Dm(r, n) : Fg(e, r, n, a);
		case 255:
			if (i[1] === 254) return Ng(r, n);
			if (i[1] === 0 && i[2] === 2 && i[3] === 0) return gs.to_workbook(r, n);
			break;
		case 0:
			if (i[1] === 0 && (i[2] >= 2 && i[3] === 0 || i[2] === 0 && (i[3] === 8 || i[3] === 9))) return gs.to_workbook(r, n);
			break;
		case 3:
		case 131:
		case 139:
		case 140: return ls.to_workbook(r, n);
		case 123:
			if (i[1] === 92 && i[2] === 114 && i[3] === 116) return $s(r, n);
			break;
		case 10:
		case 13:
		case 32: return Mg(r, n);
		case 137:
			if (i[1] === 80 && i[2] === 78 && i[3] === 71) throw Error("PNG Image File is not a spreadsheet");
			break;
		case 37:
			if (i[1] === 80 && i[2] === 68 && i[3] === 70) throw Error("PDF File is not a spreadsheet");
			break;
		case 8:
			if (i[1] === 231) throw Error("Unsupported Multiplan 1.x file!");
			break;
		case 12:
			if (i[1] === 236) throw Error("Unsupported Multiplan 2.x file!");
			if (i[1] === 237) throw Error("Unsupported Multiplan 3.x file!");
	}
	return cs.indexOf(i[0]) > -1 && i[2] <= 12 && i[3] <= 31 ? ls.to_workbook(r, n) : Fg(e, r, n, a);
}
function Lg(e, t, n, r, i, a, o) {
	var s = Sr(n), c = o.defval, l = o.raw || !Object.prototype.hasOwnProperty.call(o, "raw"), u = !0, d = e["!data"] != null, f = i === 1 ? [] : {};
	if (i !== 1) {
		if (Object.defineProperty) try {
			Object.defineProperty(f, "__rowNum__", {
				value: n,
				enumerable: !1
			});
		} catch {
			f.__rowNum__ = n;
		}
		else f.__rowNum__ = n;
	}
	if (!d || e["!data"][n]) for (var p = t.s.c; p <= t.e.c; ++p) {
		var m = d ? (e["!data"][n] || [])[p] : e[r[p] + s];
		if (m == null || m.t === void 0) {
			if (c === void 0) continue;
			a[p] != null && (f[a[p]] = c);
		} else {
			var h = m.v;
			switch (m.t) {
				case "z":
					if (h == null) break;
					continue;
				case "e":
					h = h == 0 ? null : void 0;
					break;
				case "s":
				case "b": break;
				case "n": if (!m.z || !Ue(m.z) || (h = pt(h), typeof h == "number")) break;
				case "d":
					(!o || !o.UTC && o.raw !== !1) && (h = Mt(new Date(h)));
					break;
				default: throw Error("unrecognized type " + m.t);
			}
			if (a[p] != null) {
				if (h == null) {
					if (m.t == "e" && h === null) f[a[p]] = null;
					else if (c !== void 0) f[a[p]] = c;
					else if (l && h === null) f[a[p]] = null;
					else continue;
				} else f[a[p]] = (m.t === "n" && typeof o.rawNumbers == "boolean" ? o.rawNumbers : l) ? h : Ir(m, h, o);
				h != null && (u = !1);
			}
		}
	}
	return {
		row: f,
		isempty: u
	};
}
function Rg(e, t) {
	if (e == null || e["!ref"] == null) return [];
	var n = {
		t: "n",
		v: 0
	}, r = 0, i = 1, a = [], o = 0, s = "", c = {
		s: {
			r: 0,
			c: 0
		},
		e: {
			r: 0,
			c: 0
		}
	}, l = t || {}, u = l.range == null ? e["!ref"] : l.range;
	switch (l.header === 1 ? r = 1 : l.header === "A" ? r = 2 : Array.isArray(l.header) ? r = 3 : l.header ?? (r = 0), typeof u) {
		case "string":
			c = Pr(u);
			break;
		case "number":
			c = Pr(e["!ref"]), c.s.r = u;
			break;
		default: c = u;
	}
	r > 0 && (i = 0);
	var d = Sr(c.s.r), f = [], p = [], m = 0, h = 0, g = e["!data"] != null, _ = c.s.r, v = 0, y = {};
	g && !e["!data"][_] && (e["!data"][_] = []);
	var b = l.skipHidden && e["!cols"] || [], x = l.skipHidden && e["!rows"] || [];
	for (v = c.s.c; v <= c.e.c; ++v) if (!(b[v] || {}).hidden) switch (f[v] = Er(v), n = g ? e["!data"][_][v] : e[f[v] + d], r) {
		case 1:
			a[v] = v - c.s.c;
			break;
		case 2:
			a[v] = f[v];
			break;
		case 3:
			a[v] = l.header[v - c.s.c];
			break;
		default:
			if (n ??= {
				w: "__EMPTY",
				t: "s"
			}, s = o = Ir(n, null, l), h = y[o] || 0, !h) y[o] = 1;
			else {
				do
					s = o + "_" + h++;
				while (y[s]);
				y[o] = h, y[s] = 1;
			}
			a[v] = s;
	}
	for (_ = c.s.r + i; _ <= c.e.r; ++_) if (!(x[_] || {}).hidden) {
		var S = Lg(e, c, _, f, r, a, l);
		(S.isempty === !1 || (r === 1 ? l.blankrows !== !1 : l.blankrows)) && (p[m++] = S.row);
	}
	return p.length = m, p;
}
var zg = /"/g;
function Bg(e, t, n, r, i, a, o, s, c) {
	for (var l = !0, u = [], d = "", f = Sr(n), p = e["!data"] != null, m = p && e["!data"][n] || [], h = t.s.c; h <= t.e.c; ++h) if (r[h]) {
		var g = p ? m[h] : e[r[h] + f];
		if (g == null) d = "";
		else if (g.v != null) {
			l = !1, d = "" + (c.rawNumbers && g.t == "n" ? g.v : Ir(g, null, c));
			for (var _ = 0, v = 0; _ !== d.length; ++_) if ((v = d.charCodeAt(_)) === i || v === a || v === 10 || v === 13 || v === 34 || c.forceQuotes) {
				d = "\"" + d.replace(zg, "\"\"") + "\"";
				break;
			}
			d == "ID" && s == 0 && u.length == 0 && (d = "\"ID\"");
		} else g.f != null && !g.F ? (l = !1, d = "=" + g.f, d.indexOf(",") >= 0 && (d = "\"" + d.replace(zg, "\"\"") + "\"")) : d = "";
		u.push(d);
	}
	if (c.strip) for (; u[u.length - 1] === "";) --u.length;
	return c.blankrows === !1 && l ? null : u.join(o);
}
function Vg(e, t) {
	var n = [], r = t ?? {};
	if (e == null || e["!ref"] == null) return "";
	for (var i = Pr(e["!ref"]), a = r.FS === void 0 ? "," : r.FS, o = a.charCodeAt(0), s = r.RS === void 0 ? "\n" : r.RS, c = s.charCodeAt(0), l = "", u = [], d = r.skipHidden && e["!cols"] || [], f = r.skipHidden && e["!rows"] || [], p = i.s.c; p <= i.e.c; ++p) (d[p] || {}).hidden || (u[p] = Er(p));
	for (var m = 0, h = i.s.r; h <= i.e.r; ++h) (f[h] || {}).hidden || (l = Bg(e, i, h, u, o, c, a, m, r), l != null && (l || r.blankrows !== !1) && n.push((m++ ? s : "") + l));
	return n.join("");
}
function Hg(e, t) {
	return t ||= {}, t.FS = "	", t.RS = "\n", Vg(e, t);
}
function Ug(e, t) {
	var n = "", r, i = "";
	if (e == null || e["!ref"] == null) return [];
	var a = Pr(e["!ref"]), o = "", s = [], c, l = [], u = e["!data"] != null;
	for (c = a.s.c; c <= a.e.c; ++c) s[c] = Er(c);
	for (var d = a.s.r; d <= a.e.r; ++d) for (o = Sr(d), c = a.s.c; c <= a.e.c; ++c) if (n = s[c] + o, r = u ? (e["!data"][d] || [])[c] : e[n], i = "", r !== void 0) {
		if (r.F != null) {
			if (n = r.F, !r.f) continue;
			i = r.f, n.indexOf(":") == -1 && (n = n + ":" + n);
		}
		if (r.f != null) i = r.f;
		else if (t && t.values === !1) continue;
		else if (r.t == "z") continue;
		else if (r.t == "n" && r.v != null) i = "" + r.v;
		else if (r.t == "b") i = r.v ? "TRUE" : "FALSE";
		else if (r.w !== void 0) i = "'" + r.w;
		else if (r.v === void 0) continue;
		else i = r.t == "s" ? "'" + r.v : "" + r.v;
		l[l.length] = n + "=" + i;
	}
	return l;
}
function Wg(e, t, n) {
	var r = n || {}, i = e ? e["!data"] != null : r.dense;
	C != null && i == null && (i = C);
	var a = +!r.skipHeader, o = e || {};
	!e && i && (o["!data"] = []);
	var s = 0, c = 0;
	if (o && r.origin != null) {
		if (typeof r.origin == "number") s = r.origin;
		else {
			var l = typeof r.origin == "string" ? Ar(r.origin) : r.origin;
			s = l.r, c = l.c;
		}
		if (!isFinite(s) || s !== Math.floor(s) || s < -1 || !isFinite(c) || c !== Math.floor(c) || c < 0) throw Error("Invalid origin");
	}
	var u = {
		s: {
			c: 0,
			r: 0
		},
		e: {
			c,
			r: s + t.length - 1 + a
		}
	};
	if (o["!ref"]) {
		var d = Pr(o["!ref"]);
		u.e.c = Math.max(u.e.c, d.e.c), u.e.r = Math.max(u.e.r, d.e.r), s == -1 && (s = d.e.r + 1, u.e.r = s + t.length - 1 + a);
	} else s == -1 && (s = 0, u.e.r = t.length - 1 + a);
	var f = r.header || [], p = 0, m = [];
	t.forEach(function(e, t) {
		i && !o["!data"][s + t + a] && (o["!data"][s + t + a] = []), i && (m = o["!data"][s + t + a]), st(e).forEach(function(n) {
			(p = f.indexOf(n)) == -1 && (f[p = f.length] = n);
			var l = e[n], u = "z", d = "", h = i ? "" : Er(c + p) + Sr(s + t + a), g = i ? m[c + p] : o[h];
			l && typeof l == "object" && !(l instanceof Date) ? i ? m[c + p] = l : o[h] = l : (typeof l == "number" ? u = "n" : typeof l == "boolean" ? u = "b" : typeof l == "string" ? u = "s" : l instanceof Date ? (u = "d", r.UTC || (l = Nt(l)), r.cellDates || (u = "n", l = ft(l)), d = g != null && g.z && Ue(g.z) ? g.z : r.dateNF || W[14]) : l === null && r.nullError && (u = "e", l = 0), g ? (g.t = u, g.v = l, delete g.w, delete g.R, d && (g.z = d)) : i ? m[c + p] = g = {
				t: u,
				v: l
			} : o[h] = g = {
				t: u,
				v: l
			}, d && (g.z = d));
		});
	}), u.e.c = Math.max(u.e.c, c + f.length - 1);
	var h = Sr(s);
	if (i && !o["!data"][s] && (o["!data"][s] = []), a) for (p = 0; p < f.length; ++p) i ? o["!data"][s][p + c] = {
		t: "s",
		v: f[p]
	} : o[Er(p + c) + h] = {
		t: "s",
		v: f[p]
	};
	return o["!ref"] = Z(u), o;
}
function Gg(e, t) {
	return Wg(null, e, t);
}
function Kg(e, t, n) {
	if (typeof t == "string") {
		if (e["!data"] != null) {
			var r = Ar(t);
			return e["!data"][r.r] || (e["!data"][r.r] = []), e["!data"][r.r][r.c] || (e["!data"][r.r][r.c] = { t: "z" });
		}
		return e[t] || (e[t] = { t: "z" });
	}
	return typeof t == "number" ? Kg(e, Er(n || 0) + Sr(t)) : Kg(e, jr(t));
}
function qg(e, t) {
	if (typeof t == "number") {
		if (t >= 0 && e.SheetNames.length > t) return t;
		throw Error("Cannot find sheet # " + t);
	}
	if (typeof t == "string") {
		var n = e.SheetNames.indexOf(t);
		if (n > -1) return n;
		throw Error("Cannot find sheet name |" + t + "|");
	}
	throw Error("Cannot find sheet |" + t + "|");
}
function Jg(e, t) {
	var n = {
		SheetNames: [],
		Sheets: Lr()
	};
	return e && Yg(n, e, t || "Sheet1"), n;
}
function Yg(e, t, n, r) {
	var i = 1;
	if (!n) for (; i <= 65535 && e.SheetNames.indexOf(n = "Sheet" + i) != -1; ++i, n = void 0);
	if (!n || e.SheetNames.length >= 65535) throw Error("Too many worksheets");
	if (r && e.SheetNames.indexOf(n) >= 0 && n.length < 32) {
		var a = n.match(/\d+$/);
		i = a && +a[0] || 0;
		var o = a && n.slice(0, a.index) || n;
		for (++i; i <= 65535 && e.SheetNames.indexOf(n = o + i) != -1; ++i);
	}
	if (Yp(n), e.SheetNames.indexOf(n) >= 0) throw Error("Worksheet with name |" + n + "| already exists!");
	return e.SheetNames.push(n), Rr(e.Sheets, n, t), n;
}
function Xg(e, t, n) {
	e.Workbook ||= {}, e.Workbook.Sheets || (e.Workbook.Sheets = []);
	var r = qg(e, t);
	switch (e.Workbook.Sheets[r] || (e.Workbook.Sheets[r] = {}), n) {
		case 0:
		case 1:
		case 2: break;
		default: throw Error("Bad sheet visibility setting " + n);
	}
	e.Workbook.Sheets[r].Hidden = n;
}
function Zg(e, t) {
	return e.z = t, e;
}
function Qg(e, t, n) {
	return t ? (e.l = { Target: t }, n && (e.l.Tooltip = n)) : delete e.l, e;
}
function $g(e, t, n) {
	return Qg(e, "#" + t, n);
}
function e_(e, t, n) {
	e.c ||= [], e.c.push({
		t,
		a: n || "SheetJS"
	});
}
function t_(e, t, n, r) {
	for (var i = typeof t == "string" ? Pr(t) : t, a = typeof t == "string" ? t : Z(t), o = i.s.r; o <= i.e.r; ++o) for (var s = i.s.c; s <= i.e.c; ++s) {
		var c = Kg(e, o, s);
		c.t = "n", c.F = a, delete c.v, o == i.s.r && s == i.s.c && (c.f = n, r && (c.D = !0));
	}
	var l = Mr(e["!ref"]);
	return l.s.r > i.s.r && (l.s.r = i.s.r), l.s.c > i.s.c && (l.s.c = i.s.c), l.e.r < i.e.r && (l.e.r = i.e.r), l.e.c < i.e.c && (l.e.c = i.e.c), e["!ref"] = Z(l), e;
}
var n_ = {
	encode_col: Er,
	encode_row: Sr,
	encode_cell: jr,
	encode_range: Z,
	decode_col: Tr,
	decode_row: xr,
	split_cell: kr,
	decode_cell: Ar,
	decode_range: Mr,
	format_cell: Ir,
	sheet_new: Vr,
	sheet_add_aoa: Hr,
	sheet_add_json: Wg,
	sheet_add_dom: Mh,
	aoa_to_sheet: Ur,
	json_to_sheet: Gg,
	table_to_sheet: Nh,
	table_to_book: Ph,
	sheet_to_csv: Vg,
	sheet_to_txt: Hg,
	sheet_to_json: Rg,
	sheet_to_html: jh,
	sheet_to_formulae: Ug,
	sheet_to_row_object_array: Rg,
	validate_merges: lf,
	measure_text_width: Ec,
	auto_fit_columns: Nc,
	autofit_columns: Nc,
	resolve_table_cell_style: Xf,
	col_width_to_px: uc,
	px_to_col_width: function(e) {
		return fc(dc(e));
	},
	row_height_to_px: Lc,
	px_to_row_height: Rc,
	sheet_get_cell: Kg,
	book_new: Jg,
	book_append_sheet: Yg,
	book_set_sheet_visibility: Xg,
	cell_set_number_format: Zg,
	cell_set_hyperlink: Qg,
	cell_set_internal_link: $g,
	cell_add_comment: e_,
	sheet_set_array_formula: t_,
	consts: {
		SHEET_VISIBLE: 0,
		SHEET_HIDDEN: 1,
		SHEET_VERY_HIDDEN: 2
	}
};
c.version;
// node_modules/.pnpm/@file-viewer+renderer-spreadsheet@3.3.0/node_modules/@file-viewer/renderer-spreadsheet/dist/spreadsheet/worker/sheetjs/color.js
var r_ = /* @__PURE__ */ "FF000000.FFFFFFFF.FFFF0000.FF00FF00.FF0000FF.FFFFFF00.FFFF00FF.FF00FFFF.FF000000.FFFFFFFF.FFFF0000.FF00FF00.FF0000FF.FFFFFF00.FFFF00FF.FF00FFFF.FF800000.FF008000.FF000080.FF808000.FF800080.FF008080.FFC0C0C0.FF808080.FF9999FF.FF993366.FFFFFFCC.FFCCFFFF.FF660066.FFFF8080.FF0066CC.FFCCCCFF.FF000080.FFFF00FF.FFFFFF00.FF00FFFF.FF800080.FF800000.FF008080.FF0000FF.FF00CCFF.FFCCFFFF.FFCCFFCC.FFFFFF99.FF99CCFF.FFFF99CC.FFCC99FF.FFFFCC99.FF3366FF.FF33CCCC.FF99CC00.FFFFCC00.FFFF9900.FFFF6600.FF666699.FF969696.FF003366.FF339966.FF003300.FF333300.FF993300.FF993366.FF333399.FF333333".split("."), i_ = 240, a_ = 255;
function o_(e, t, n) {
	let r = Math.max(e, t, n), i = Math.min(e, t, n), a = r + i, o = r - i, s = a / 2, c, l;
	if (i == r) return [
		0,
		s,
		0
	];
	l = s <= .5 ? o / a : o / (2 - a);
	let u = (r - e) / o, d = (r - t) / o, f = (r - n) / o;
	return c = e == r ? f - d : t === r ? 2 + u - f : 4 + d - u, c = c / 6 % 1, [
		c,
		s,
		l
	];
}
function s_(e) {
	e.length > 6 && (e = e.substring(2));
	let [t, n, r] = o_(parseInt(e.slice(0, 2), 16) / a_, parseInt(e.slice(2, 4), 16) / a_, parseInt(e.slice(4, 6), 16) / a_);
	return [
		Math.round(t * i_),
		Math.round(n * i_),
		Math.round(r * i_)
	];
}
function c_(e, t, n) {
	return s({
		h: e / i_ * 360,
		s: n / i_,
		l: t / i_
	}).toHex().toUpperCase();
}
function l_(e, t) {
	return Math.round(e <= 0 ? t * (1 + e) : t * (1 - e) + (i_ - i_ * (1 - e)));
}
function u_(e, t) {
	if (!e) return e;
	let [n, r, i] = s_(e);
	return `FF${c_(n, l_(t, r), i)}`;
}
// node_modules/.pnpm/@xmldom+xmldom@0.9.12/node_modules/@xmldom/xmldom/lib/conventions.js
var d_ = /* @__PURE__ */ t(((e) => {
	function t(e, t, n) {
		if (n === void 0 && (n = Array.prototype), e && typeof n.find == "function") return n.find.call(e, t);
		for (var i = 0; i < e.length; i++) if (r(e, i)) {
			var a = e[i];
			if (t.call(void 0, a, i, e)) return a;
		}
	}
	function n(e, t) {
		return t === void 0 && (t = Object), t && typeof t.getOwnPropertyDescriptors == "function" && (e = t.create(null, t.getOwnPropertyDescriptors(e))), t && typeof t.freeze == "function" ? t.freeze(e) : e;
	}
	function r(e, t) {
		return Object.prototype.hasOwnProperty.call(e, t);
	}
	function i(e, t) {
		if (typeof e != "object" || !e) throw TypeError("target is not an object");
		for (var n in t) r(t, n) && (e[n] = t[n]);
		return e;
	}
	var a = n({
		allowfullscreen: !0,
		async: !0,
		autofocus: !0,
		autoplay: !0,
		checked: !0,
		controls: !0,
		default: !0,
		defer: !0,
		disabled: !0,
		formnovalidate: !0,
		hidden: !0,
		ismap: !0,
		itemscope: !0,
		loop: !0,
		multiple: !0,
		muted: !0,
		nomodule: !0,
		novalidate: !0,
		open: !0,
		playsinline: !0,
		readonly: !0,
		required: !0,
		reversed: !0,
		selected: !0
	});
	function o(e) {
		return r(a, e.toLowerCase());
	}
	var s = n({
		area: !0,
		base: !0,
		br: !0,
		col: !0,
		embed: !0,
		hr: !0,
		img: !0,
		input: !0,
		link: !0,
		meta: !0,
		param: !0,
		source: !0,
		track: !0,
		wbr: !0
	});
	function c(e) {
		return r(s, e.toLowerCase());
	}
	var l = n({
		script: !1,
		style: !1,
		textarea: !0,
		title: !0
	});
	function u(e) {
		var t = e.toLowerCase();
		return r(l, t) && !l[t];
	}
	function d(e) {
		var t = e.toLowerCase();
		return r(l, t) && l[t];
	}
	function f(e) {
		return e === m.HTML;
	}
	function p(e) {
		return f(e) || e === m.XML_XHTML_APPLICATION;
	}
	var m = n({
		HTML: "text/html",
		XML_APPLICATION: "application/xml",
		XML_TEXT: "text/xml",
		XML_XHTML_APPLICATION: "application/xhtml+xml",
		XML_SVG_IMAGE: "image/svg+xml"
	}), h = Object.keys(m).map(function(e) {
		return m[e];
	});
	function g(e) {
		return h.indexOf(e) > -1;
	}
	var _ = n({
		HTML: "http://www.w3.org/1999/xhtml",
		SVG: "http://www.w3.org/2000/svg",
		XML: "http://www.w3.org/XML/1998/namespace",
		XMLNS: "http://www.w3.org/2000/xmlns/"
	});
	e.assign = i, e.find = t, e.freeze = n, e.HTML_BOOLEAN_ATTRIBUTES = a, e.HTML_RAW_TEXT_ELEMENTS = l, e.HTML_VOID_ELEMENTS = s, e.hasDefaultHTMLNamespace = p, e.hasOwn = r, e.isHTMLBooleanAttribute = o, e.isHTMLRawTextElement = u, e.isHTMLEscapableRawTextElement = d, e.isHTMLMimeType = f, e.isHTMLVoidElement = c, e.isValidMimeType = g, e.MIME_TYPE = m, e.NAMESPACE = _;
})), f_ = /* @__PURE__ */ t(((e) => {
	var t = d_();
	function n(e, t) {
		e.prototype = Object.create(Error.prototype, {
			constructor: { value: e },
			name: {
				value: e.name,
				enumerable: !0,
				writable: t
			}
		});
	}
	var r = t.freeze({
		Error: "Error",
		IndexSizeError: "IndexSizeError",
		DomstringSizeError: "DomstringSizeError",
		HierarchyRequestError: "HierarchyRequestError",
		WrongDocumentError: "WrongDocumentError",
		InvalidCharacterError: "InvalidCharacterError",
		NoDataAllowedError: "NoDataAllowedError",
		NoModificationAllowedError: "NoModificationAllowedError",
		NotFoundError: "NotFoundError",
		NotSupportedError: "NotSupportedError",
		InUseAttributeError: "InUseAttributeError",
		InvalidStateError: "InvalidStateError",
		SyntaxError: "SyntaxError",
		InvalidModificationError: "InvalidModificationError",
		NamespaceError: "NamespaceError",
		InvalidAccessError: "InvalidAccessError",
		ValidationError: "ValidationError",
		TypeMismatchError: "TypeMismatchError",
		SecurityError: "SecurityError",
		NetworkError: "NetworkError",
		AbortError: "AbortError",
		URLMismatchError: "URLMismatchError",
		QuotaExceededError: "QuotaExceededError",
		TimeoutError: "TimeoutError",
		InvalidNodeTypeError: "InvalidNodeTypeError",
		DataCloneError: "DataCloneError",
		EncodingError: "EncodingError",
		NotReadableError: "NotReadableError",
		UnknownError: "UnknownError",
		ConstraintError: "ConstraintError",
		DataError: "DataError",
		TransactionInactiveError: "TransactionInactiveError",
		ReadOnlyError: "ReadOnlyError",
		VersionError: "VersionError",
		OperationError: "OperationError",
		NotAllowedError: "NotAllowedError",
		OptOutError: "OptOutError"
	}), i = Object.keys(r);
	function a(e) {
		return typeof e == "number" && e >= 1 && e <= 25;
	}
	function o(e) {
		return typeof e == "string" && e.substring(e.length - r.Error.length) === r.Error;
	}
	function s(e, t) {
		a(e) ? (this.name = i[e], this.message = t || "") : (this.message = e, this.name = o(t) ? t : r.Error), Error.captureStackTrace && Error.captureStackTrace(this, s);
	}
	n(s, !0), Object.defineProperties(s.prototype, { code: {
		enumerable: !0,
		get: function() {
			var e = i.indexOf(this.name);
			return a(e) ? e : 0;
		}
	} });
	for (var c = {
		INDEX_SIZE_ERR: 1,
		DOMSTRING_SIZE_ERR: 2,
		HIERARCHY_REQUEST_ERR: 3,
		WRONG_DOCUMENT_ERR: 4,
		INVALID_CHARACTER_ERR: 5,
		NO_DATA_ALLOWED_ERR: 6,
		NO_MODIFICATION_ALLOWED_ERR: 7,
		NOT_FOUND_ERR: 8,
		NOT_SUPPORTED_ERR: 9,
		INUSE_ATTRIBUTE_ERR: 10,
		INVALID_STATE_ERR: 11,
		SYNTAX_ERR: 12,
		INVALID_MODIFICATION_ERR: 13,
		NAMESPACE_ERR: 14,
		INVALID_ACCESS_ERR: 15,
		VALIDATION_ERR: 16,
		TYPE_MISMATCH_ERR: 17,
		SECURITY_ERR: 18,
		NETWORK_ERR: 19,
		ABORT_ERR: 20,
		URL_MISMATCH_ERR: 21,
		QUOTA_EXCEEDED_ERR: 22,
		TIMEOUT_ERR: 23,
		INVALID_NODE_TYPE_ERR: 24,
		DATA_CLONE_ERR: 25
	}, l = Object.entries(c), u = 0; u < l.length; u++) {
		var d = l[u][0];
		s[d] = l[u][1];
	}
	function f(e, t, n) {
		this.message = e, this.locator = t, this.cause = n, Error.captureStackTrace && Error.captureStackTrace(this, f);
	}
	n(f), e.DOMException = s, e.DOMExceptionName = r, e.ExceptionCode = c, e.ParseError = f;
})), p_ = /* @__PURE__ */ t(((e) => {
	function t(e) {
		try {
			typeof e != "function" && (e = RegExp);
			var t = new e("𝌆", "u").exec("𝌆");
			return !!t && t[0].length === 2;
		} catch {}
		return !1;
	}
	var n = t();
	function r(e) {
		if (e.source[0] !== "[") throw Error(e + " can not be used with chars");
		return e.source.slice(1, e.source.lastIndexOf("]"));
	}
	function i(e, t) {
		if (e.source[0] !== "[") throw Error("/" + e.source + "/ can not be used with chars_without");
		if (!t || typeof t != "string") throw Error(JSON.stringify(t) + " is not a valid search");
		if (e.source.indexOf(t) === -1) throw Error("\"" + t + "\" is not is /" + e.source + "/");
		if (t === "-" && e.source.indexOf(t) !== 1) throw Error("\"" + t + "\" is not at the first postion of /" + e.source + "/");
		return new RegExp(e.source.replace(t, ""), n ? "u" : "");
	}
	function a(e) {
		var t = this;
		return new RegExp(Array.prototype.slice.call(arguments).map(function(e) {
			var n = typeof e == "string";
			if (n && t === void 0 && e === "|") throw Error("use regg instead of reg to wrap expressions with `|`!");
			return n ? e : e.source;
		}).join(""), n ? "u" : "");
	}
	function o(e) {
		if (arguments.length === 0) throw Error("no parameters provided");
		return a.apply(o, ["(?:"].concat(Array.prototype.slice.call(arguments), [")"]));
	}
	var s = "�", c = /[-\x09\x0A\x0D\x20-\x2C\x2E-\uD7FF\uE000-\uFFFD]/;
	n && (c = a("[", r(c), "\\u{10000}-\\u{10FFFF}", "]"));
	var l = RegExp("[^" + r(c) + "]", n ? "u" : ""), u = /[\x20\x09\x0D\x0A]/, d = r(u), f = a(u, "+"), p = a(u, "*"), m = /[:_a-zA-Z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
	n && (m = a("[", r(m), "\\u{10000}-\\u{10FFFF}", "]"));
	var h = a("[", r(m), r(/[-.0-9\xB7]/), r(/[\u0300-\u036F\u203F-\u2040]/), "]"), g = a(m, h, "*"), _ = a("^", g, "$"), v = a(h, "+"), y = o(a("&", g, ";"), "|", o(/&#[0-9]+;|&#x[0-9a-fA-F]+;/)), b = a("%", g, ";"), x = o(a("\"", o(/[^%&"]/, "|", b, "|", y), "*", "\""), "|", a("'", o(/[^%&']/, "|", b, "|", y), "*", "'")), S = o("\"", o(/[^<&"]/, "|", y), "*", "\"", "|", "'", o(/[^<&']/, "|", y), "*", "'"), C = a(i(m, ":"), i(h, ":"), "*"), w = a("^", C, "$"), T = a(C, o(":", C), "?"), E = a("^", T, "$"), D = a("(", T, ")"), O = o(/"[^"]*"|'[^']*'/), k = a(/^<\?/, "(", g, ")", o(f, "(?!", u, ")(", c, "*?)"), "?", /\?>/), A = /[\x20\x0D\x0Aa-zA-Z0-9-'()+,./:=?;!*#@$_%]/, j = o("\"", A, "*\"", "|", "'", i(A, "'"), "*'"), M = "<!--", ee = "-->", N = a(M, o(i(c, "-"), "|", a("-", i(c, "-"))), "*", ee), P = "#PCDATA", F = o("EMPTY", "|", "ANY", "|", o(a(/\(/, p, P, o(p, /\|/, p, T), "*", p, /\)\*/), "|", a(/\(/, p, P, p, /\)/)), "|", a(/\([^>]+\)/, /[?*+]?/)), I = a("<!ELEMENT", f, o(T, "|", b), f, o(F, "|", b), p, ">"), L = a("<!ATTLIST", f, g, o(f, g, f, o(/CDATA|ID|IDREF|IDREFS|ENTITY|ENTITIES|NMTOKEN|NMTOKENS/, "|", o(a("NOTATION", f, /\(/, p, g, o(p, /\|/, p, g), "*", p, /\)/), "|", a(/\(/, p, v, o(p, /\|/, p, v), "*", p, /\)/))), f, o(/#REQUIRED|#IMPLIED/, "|", o(o("#FIXED", f), "?", S))), "*", p, ">"), R = "about:legacy-compat", te = o("\"" + R + "\"", "|", "'" + R + "'"), z = "SYSTEM", B = "PUBLIC", V = o(o(z, f, O), "|", o(B, f, j, f, O)), H = a("^", o(o(z, f, "(?<SystemLiteralOnly>", O, ")"), "|", o(B, f, "(?<PubidLiteral>", j, ")", f, "(?<SystemLiteral>", O, ")"))), U = a("^", j, "$"), ne = a("^", O, "$"), re = o(x, "|", o(V, o(f, "NDATA", f, g), "?")), ie = "<!ENTITY", ae = o(a(ie, f, g, f, re, p, ">"), "|", a(ie, f, "%", f, g, f, o(x, "|", V), p, ">")), oe = a("<!NOTATION", f, g, f, o(V, "|", a(B, f, j)), p, ">"), se = a(p, "=", p), ce = /1[.]\d+/, W = a(f, "version", se, o("'", ce, "'", "|", "\"", ce, "\"")), G = /[A-Za-z][-A-Za-z0-9._]*/, K = a(/^<\?xml/, W, o(f, "encoding", se, o("\"", G, "\"", "|", "'", G, "'")), "?", o(f, "standalone", se, o("'", o("yes", "|", "no"), "'", "|", "\"", o("yes", "|", "no"), "\"")), "?", p, /\?>/), le = "<!DOCTYPE", ue = "<![CDATA[", de = "]]>", fe = a(/<!\[CDATA\[/, a(c, "*?", /\]\]>/));
	e.chars = r, e.chars_without = i, e.detectUnicodeSupport = t, e.reg = a, e.regg = o, e.ABOUT_LEGACY_COMPAT = R, e.ABOUT_LEGACY_COMPAT_SystemLiteral = te, e.AttlistDecl = L, e.CDATA_START = ue, e.CDATA_END = de, e.CDSect = fe, e.Char = c, e.Comment = N, e.COMMENT_START = M, e.COMMENT_END = ee, e.DOCTYPE_DECL_START = le, e.elementdecl = I, e.EntityDecl = ae, e.EntityValue = x, e.ExternalID = V, e.ExternalID_match = H, e.Name = g, e.Name_exact = _, e.NCName_exact = w, e.NotationDecl = oe, e.Reference = y, e.PEReference = b, e.PI = k, e.PUBLIC = B, e.PubidLiteral = j, e.PubidLiteral_match = U, e.QName = T, e.QName_exact = E, e.QName_group = D, e.S = f, e.SChar_s = d, e.S_OPT = p, e.SYSTEM = z, e.SystemLiteral = O, e.SystemLiteral_match = ne, e.InvalidChar = l, e.UNICODE_REPLACEMENT_CHARACTER = s, e.UNICODE_SUPPORT = n, e.XMLDecl = K;
})), m_ = /* @__PURE__ */ t(((e) => {
	var t = d_(), n = t.find, r = t.hasDefaultHTMLNamespace, i = t.hasOwn, a = t.isHTMLMimeType, o = t.isHTMLRawTextElement, s = t.isHTMLVoidElement, c = t.MIME_TYPE, l = t.NAMESPACE, u = Symbol(), d = f_(), f = d.DOMException, p = d.DOMExceptionName, m = p_();
	function h(e) {
		if (e !== u) throw TypeError("Illegal constructor");
	}
	function g(e) {
		return e !== "";
	}
	function _(e) {
		return e ? e.split(/[\t\n\f\r ]+/).filter(g) : [];
	}
	function v(e, t) {
		return i(e, t) || (e[t] = !0), e;
	}
	function y(e) {
		if (!e) return [];
		var t = _(e);
		return Object.keys(t.reduce(v, {}));
	}
	function b(e) {
		return function(t) {
			return e && e.indexOf(t) !== -1;
		};
	}
	function x(e) {
		if (!m.QName_exact.test(e)) throw new f(f.INVALID_CHARACTER_ERR, "invalid character in qualified name \"" + e + "\"");
	}
	function S(e, n) {
		x(n), e ||= null;
		var r = null, i = n;
		if (n.indexOf(":") >= 0) {
			var a = n.split(":");
			r = a[0], i = a[1];
		}
		if (r !== null && e === null) throw new f(f.NAMESPACE_ERR, "prefix is non-null and namespace is null");
		if (r === "xml" && e !== t.NAMESPACE.XML) throw new f(f.NAMESPACE_ERR, "prefix is \"xml\" and namespace is not the XML namespace");
		if ((r === "xmlns" || n === "xmlns") && e !== t.NAMESPACE.XMLNS) throw new f(f.NAMESPACE_ERR, "either qualifiedName or prefix is \"xmlns\" and namespace is not the XMLNS namespace");
		if (e === t.NAMESPACE.XMLNS && r !== "xmlns" && n !== "xmlns") throw new f(f.NAMESPACE_ERR, "namespace is the XMLNS namespace and neither qualifiedName nor prefix is \"xmlns\"");
		return [
			e,
			r,
			i
		];
	}
	function C(e, t) {
		for (var n in e) i(e, n) && (t[n] = e[n]);
	}
	function w(e, t) {
		var n = e.prototype;
		if (!(n instanceof t)) {
			function r() {}
			r.prototype = t.prototype, r = new r(), C(n, r), e.prototype = n = r;
		}
		n.constructor != e && (typeof e != "function" && console.error("unknown Class:" + e), n.constructor = e);
	}
	var T = {}, E = T.ELEMENT_NODE = 1, D = T.ATTRIBUTE_NODE = 2, O = T.TEXT_NODE = 3, k = T.CDATA_SECTION_NODE = 4, A = T.ENTITY_REFERENCE_NODE = 5, j = T.ENTITY_NODE = 6, M = T.PROCESSING_INSTRUCTION_NODE = 7, ee = T.COMMENT_NODE = 8, N = T.DOCUMENT_NODE = 9, P = T.DOCUMENT_TYPE_NODE = 10, F = T.DOCUMENT_FRAGMENT_NODE = 11, I = T.NOTATION_NODE = 12, L = t.freeze({
		DOCUMENT_POSITION_DISCONNECTED: 1,
		DOCUMENT_POSITION_PRECEDING: 2,
		DOCUMENT_POSITION_FOLLOWING: 4,
		DOCUMENT_POSITION_CONTAINS: 8,
		DOCUMENT_POSITION_CONTAINED_BY: 16,
		DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32
	});
	function R(e, t) {
		if (t.length < e.length) return R(t, e);
		var n = null;
		for (var r in e) {
			if (e[r] !== t[r]) return n;
			n = e[r];
		}
		return n;
	}
	function te(e) {
		return e.guid ||= Math.random(), e.guid;
	}
	function z() {}
	z.prototype = {
		length: 0,
		item: function(e) {
			return e >= 0 && e < this.length ? this[e] : null;
		},
		toString: function(e) {
			for (var t = typeof e == "function" ? {
				requireWellFormed: !1,
				splitCDATASections: !0,
				nodeFilter: e
			} : e ? {
				requireWellFormed: !!e.requireWellFormed,
				splitCDATASections: e.splitCDATASections !== !1,
				nodeFilter: e.nodeFilter || null
			} : {
				requireWellFormed: !1,
				splitCDATASections: !0,
				nodeFilter: null
			}, n = [], r = 0; r < this.length; r++) Ve(this[r], n, null, t);
			return n.join("");
		},
		filter: function(e) {
			return Array.prototype.filter.call(this, e);
		},
		indexOf: function(e) {
			return Array.prototype.indexOf.call(this, e);
		}
	}, z.prototype[Symbol.iterator] = function() {
		var e = this, t = 0;
		return {
			next: function() {
				return t < e.length ? {
					value: e[t++],
					done: !1
				} : { done: !0 };
			},
			return: function() {
				return { done: !0 };
			}
		};
	};
	function B(e, t) {
		this._node = e, this._refresh = t, V(this);
	}
	function V(e) {
		var t = e._node._inc || e._node.ownerDocument._inc;
		if (e._inc !== t) {
			var n = e._refresh(e._node);
			if (We(e, "length", n.length), !e.$$length || n.length < e.$$length) for (var r = n.length; r in e; r++) i(e, r) && delete e[r];
			C(n, e), e._inc = t;
		}
	}
	B.prototype.item = function(e) {
		return V(this), this[e] || null;
	}, w(B, z);
	function H() {
		this._nsIndex = Object.create(null), this._noNsIndex = Object.create(null);
	}
	function U(e, t) {
		for (var n = 0; n < e.length;) {
			if (e[n] === t) return n;
			n++;
		}
	}
	function ne(e, t, n) {
		if (!t) return e._noNsIndex;
		var r = e._nsIndex[t];
		return !r && n && (r = e._nsIndex[t] = Object.create(null)), r;
	}
	function re(e, t, n) {
		var r = ne(e, t, !1);
		return r && r[n] || null;
	}
	function ie(e, t) {
		ne(e, t.namespaceURI, !0)[t.localName] = t;
	}
	function ae(e, t) {
		var n = ne(e, t.namespaceURI, !1);
		n && delete n[t.localName];
	}
	function oe(e, t, n, r) {
		if (r ? t[U(t, r)] = n : (t[t.length] = n, t.length++), ie(t, n), e) {
			n.ownerElement = e;
			var i = e.ownerDocument;
			i && (r && fe(i, e, r), de(i, e, n));
		}
	}
	function se(e, t, n) {
		var r = U(t, n);
		if (r >= 0) {
			for (var i = t.length - 1; r <= i;) t[r] = t[++r];
			if (t.length = i, ae(t, n), e) {
				var a = e.ownerDocument;
				a && fe(a, e, n), n.ownerElement = null;
			}
		}
	}
	H.prototype = {
		length: 0,
		item: z.prototype.item,
		getNamedItem: function(e) {
			this._ownerElement && this._ownerElement._isInHTMLDocumentAndNamespace() && (e = e.toLowerCase());
			for (var t = 0; t < this.length;) {
				var n = this[t];
				if (n.nodeName === e) return n;
				t++;
			}
			return null;
		},
		setNamedItem: function(e) {
			var t = e.ownerElement;
			if (t && t !== this._ownerElement) throw new f(f.INUSE_ATTRIBUTE_ERR);
			var n = re(this, e.namespaceURI, e.localName);
			return n === e ? e : (oe(this._ownerElement, this, e, n), n);
		},
		setNamedItemNS: function(e) {
			return this.setNamedItem(e);
		},
		removeNamedItem: function(e) {
			var t = this.getNamedItem(e);
			if (!t) throw new f(f.NOT_FOUND_ERR, e);
			return se(this._ownerElement, this, t), t;
		},
		removeNamedItemNS: function(e, t) {
			var n = this.getNamedItemNS(e, t);
			if (!n) throw new f(f.NOT_FOUND_ERR, e ? e + " : " + t : t);
			return se(this._ownerElement, this, n), n;
		},
		getNamedItemNS: function(e, t) {
			e ||= null;
			for (var n = 0; n < this.length;) {
				var r = this[n];
				if (r.localName === t && r.namespaceURI === e) return r;
				n++;
			}
			return null;
		}
	}, H.prototype[Symbol.iterator] = function() {
		var e = this, t = 0;
		return {
			next: function() {
				return t < e.length ? {
					value: e[t++],
					done: !1
				} : { done: !0 };
			},
			return: function() {
				return { done: !0 };
			}
		};
	};
	function ce() {}
	ce.prototype = {
		hasFeature: function(e, t) {
			return !0;
		},
		createDocument: function(e, t, n) {
			var r = c.XML_APPLICATION;
			e === l.HTML ? r = c.XML_XHTML_APPLICATION : e === l.SVG && (r = c.XML_SVG_IMAGE);
			var i = new ue(u, { contentType: r });
			if (i.implementation = this, i.childNodes = new z(), i.doctype = n || null, n && i.appendChild(n), t) {
				var a = i.createElementNS(e, t);
				i.appendChild(a);
			}
			return i;
		},
		createDocumentType: function(e, t, n, r) {
			x(e);
			var i = new je(u);
			return i.name = e, i.nodeName = e, i.publicId = t || "", i.systemId = n || "", i.internalSubset = r || "", i.childNodes = new z(), i;
		},
		createHTMLDocument: function(e) {
			var t = new ue(u, { contentType: c.HTML });
			if (t.implementation = this, t.childNodes = new z(), e !== !1) {
				t.doctype = this.createDocumentType("html"), t.doctype.ownerDocument = t, t.appendChild(t.doctype);
				var n = t.createElement("html");
				t.appendChild(n);
				var r = t.createElement("head");
				if (n.appendChild(r), typeof e == "string") {
					var i = t.createElement("title");
					i.appendChild(t.createTextNode(e)), r.appendChild(i);
				}
				n.appendChild(t.createElement("body"));
			}
			return t;
		}
	};
	function W(e) {
		h(e);
	}
	W.prototype = {
		firstChild: null,
		lastChild: null,
		previousSibling: null,
		nextSibling: null,
		parentNode: null,
		get parentElement() {
			return this.parentNode && this.parentNode.nodeType === this.ELEMENT_NODE ? this.parentNode : null;
		},
		childNodes: null,
		ownerDocument: null,
		nodeValue: null,
		namespaceURI: null,
		prefix: null,
		localName: null,
		baseURI: "about:blank",
		get isConnected() {
			var e = this.getRootNode();
			return e && e.nodeType === e.DOCUMENT_NODE;
		},
		contains: function(e) {
			if (!e) return !1;
			var t = e;
			do {
				if (this === t) return !0;
				t = t.parentNode;
			} while (t);
			return !1;
		},
		getRootNode: function(e) {
			var t = this;
			do {
				if (!t.parentNode) return t;
				t = t.parentNode;
			} while (t);
		},
		isEqualNode: function(e) {
			if (!e) return !1;
			for (var t = [{
				node: this,
				other: e
			}]; t.length > 0;) {
				var n = t.pop(), r = n.node, i = n.other;
				if (r.nodeType !== i.nodeType) return !1;
				switch (r.nodeType) {
					case r.DOCUMENT_TYPE_NODE:
						if (r.name !== i.name || r.publicId !== i.publicId || r.systemId !== i.systemId) return !1;
						break;
					case r.ELEMENT_NODE:
						if (r.namespaceURI !== i.namespaceURI || r.prefix !== i.prefix || r.localName !== i.localName || r.attributes.length !== i.attributes.length) return !1;
						for (var a = 0; a < r.attributes.length; a++) {
							var o = r.attributes.item(a), s = i.getAttributeNodeNS(o.namespaceURI, o.localName);
							if (!s) return !1;
							t.push({
								node: o,
								other: s
							});
						}
						break;
					case r.ATTRIBUTE_NODE:
						if (r.namespaceURI !== i.namespaceURI || r.localName !== i.localName || r.value !== i.value) return !1;
						break;
					case r.PROCESSING_INSTRUCTION_NODE:
						if (r.target !== i.target || r.data !== i.data) return !1;
						break;
					case r.TEXT_NODE:
					case r.CDATA_SECTION_NODE:
					case r.COMMENT_NODE: if (r.data !== i.data) return !1;
				}
				if (r.childNodes.length !== i.childNodes.length) return !1;
				for (var a = r.childNodes.length - 1; a >= 0; a--) t.push({
					node: r.childNodes[a],
					other: i.childNodes[a]
				});
			}
			return !0;
		},
		isSameNode: function(e) {
			return this === e;
		},
		insertBefore: function(e, t) {
			return Te(this, e, t);
		},
		replaceChild: function(e, t) {
			Te(this, e, t, we), t && this.removeChild(t);
		},
		removeChild: function(e) {
			return me(this, e);
		},
		appendChild: function(e) {
			return this.insertBefore(e, null);
		},
		hasChildNodes: function() {
			return this.firstChild != null;
		},
		cloneNode: function(e) {
			return Ue(this.ownerDocument || this, this, e);
		},
		normalize: function() {
			le(this, null, { enter: function(e) {
				for (var t = e.firstChild; t;) {
					var n = t.nextSibling;
					if (n !== null && n.nodeType === O && t.nodeType === O) {
						for (var r = [], i = n; i !== null && i.nodeType === O;) r.push(i.data), i = i.nextSibling;
						for (var a = t.nextSibling; a !== i;) {
							var o = a.nextSibling;
							a.parentNode = null, a.previousSibling = null, a.nextSibling = null, a = o;
						}
						t.nextSibling = i, i === null ? e.lastChild = t : i.previousSibling = t, t.appendData(r.join("")), pe(e.ownerDocument, e), t = i;
					} else t = n;
				}
				return !0;
			} });
		},
		isSupported: function(e, t) {
			return this.ownerDocument.implementation.hasFeature(e, t);
		},
		lookupPrefix: function(e) {
			for (var t = this; t;) {
				var n = t._nsMap;
				if (n) {
					for (var r in n) if (i(n, r) && n[r] === e) return r;
				}
				t = t.nodeType == D ? t.ownerDocument : t.parentNode;
			}
			return null;
		},
		lookupNamespaceURI: function(e) {
			for (var t = this; t;) {
				var n = t._nsMap;
				if (n && i(n, e)) return n[e];
				t = t.nodeType == D ? t.ownerDocument : t.parentNode;
			}
			return null;
		},
		isDefaultNamespace: function(e) {
			return this.lookupPrefix(e) == null;
		},
		compareDocumentPosition: function(e) {
			if (this === e) return 0;
			var t = e, n = this, r = null, i = null;
			if (t instanceof De && (r = t, t = r.ownerElement), n instanceof De && (i = n, n = i.ownerElement, r && t && n === t)) for (var a = 0, o; o = n.attributes[a]; a++) {
				if (o === r) return L.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + L.DOCUMENT_POSITION_PRECEDING;
				if (o === i) return L.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + L.DOCUMENT_POSITION_FOLLOWING;
			}
			if (!t || !n || n.ownerDocument !== t.ownerDocument) return L.DOCUMENT_POSITION_DISCONNECTED + L.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + (te(n.ownerDocument) > te(t.ownerDocument) ? L.DOCUMENT_POSITION_FOLLOWING : L.DOCUMENT_POSITION_PRECEDING);
			if (i && t === n) return L.DOCUMENT_POSITION_CONTAINS + L.DOCUMENT_POSITION_PRECEDING;
			if (r && t === n) return L.DOCUMENT_POSITION_CONTAINED_BY + L.DOCUMENT_POSITION_FOLLOWING;
			for (var s = [], c = t.parentNode; c;) {
				if (!i && c === n) return L.DOCUMENT_POSITION_CONTAINED_BY + L.DOCUMENT_POSITION_FOLLOWING;
				s.push(c), c = c.parentNode;
			}
			s.reverse();
			for (var l = [], u = n.parentNode; u;) {
				if (!r && u === t) return L.DOCUMENT_POSITION_CONTAINS + L.DOCUMENT_POSITION_PRECEDING;
				l.push(u), u = u.parentNode;
			}
			l.reverse();
			var d = R(s, l);
			for (var f in d.childNodes) {
				var p = d.childNodes[f];
				if (p === n) return L.DOCUMENT_POSITION_FOLLOWING;
				if (p === t) return L.DOCUMENT_POSITION_PRECEDING;
				if (l.indexOf(p) >= 0) return L.DOCUMENT_POSITION_FOLLOWING;
				if (s.indexOf(p) >= 0) return L.DOCUMENT_POSITION_PRECEDING;
			}
			return 0;
		}
	};
	function G(e) {
		return e == "<" && "&lt;" || e == ">" && "&gt;" || e == "&" && "&amp;" || e == "\"" && "&quot;" || "&#" + e.charCodeAt() + ";";
	}
	C(T, W), C(T, W.prototype), C(L, W), C(L, W.prototype);
	function K(e, t) {
		le(e, null, { enter: function(e) {
			return !t(e) || le.STOP;
		} });
	}
	function le(e, t, n) {
		for (var r = [{
			node: e,
			context: t,
			phase: le.ENTER
		}]; r.length > 0;) {
			var i = r.pop();
			if (i.phase === le.ENTER) {
				var a = n.enter(i.node, i.context);
				if (a === le.STOP) return le.STOP;
				if (r.push({
					node: i.node,
					context: a,
					phase: le.EXIT
				}), a == null) continue;
				for (var o = i.node.lastChild; o;) r.push({
					node: o,
					context: a,
					phase: le.ENTER
				}), o = o.previousSibling;
			} else n.exit && n.exit(i.node, i.context);
		}
	}
	le.STOP = Symbol("walkDOM.STOP"), le.ENTER = 0, le.EXIT = 1;
	function ue(e, t) {
		h(e);
		var n = t || {};
		this.ownerDocument = this, this.contentType = n.contentType || c.XML_APPLICATION, this.type = a(this.contentType) ? "html" : "xml";
	}
	function de(e, t, n) {
		e && e._inc++, n.namespaceURI === l.XMLNS && (t._nsMap[n.prefix ? n.localName : ""] = n.value);
	}
	function fe(e, t, n, r) {
		e && e._inc++, n.namespaceURI === l.XMLNS && delete t._nsMap[n.prefix ? n.localName : ""];
	}
	function pe(e, t, n) {
		if (e && e._inc) {
			e._inc++;
			var r = t.childNodes;
			if (n && !n.nextSibling) r[r.length++] = n;
			else {
				for (var i = t.firstChild, a = 0; i;) r[a++] = i, i = i.nextSibling;
				r.length = a, delete r[r.length];
			}
		}
	}
	function me(e, t) {
		if (e !== t.parentNode) throw new f(f.NOT_FOUND_ERR, "child's parent is not parent");
		var n = t.previousSibling, r = t.nextSibling;
		return n ? n.nextSibling = r : e.firstChild = r, r ? r.previousSibling = n : e.lastChild = n, pe(e.ownerDocument, e), t.parentNode = null, t.previousSibling = null, t.nextSibling = null, t;
	}
	function he(e) {
		return e && (e.nodeType === W.DOCUMENT_NODE || e.nodeType === W.DOCUMENT_FRAGMENT_NODE || e.nodeType === W.ELEMENT_NODE);
	}
	function ge(e) {
		return e && (e.nodeType === W.CDATA_SECTION_NODE || e.nodeType === W.COMMENT_NODE || e.nodeType === W.DOCUMENT_FRAGMENT_NODE || e.nodeType === W.DOCUMENT_TYPE_NODE || e.nodeType === W.ELEMENT_NODE || e.nodeType === W.PROCESSING_INSTRUCTION_NODE || e.nodeType === W.TEXT_NODE);
	}
	function _e(e) {
		return e && e.nodeType === W.DOCUMENT_TYPE_NODE;
	}
	function ve(e) {
		return e && e.nodeType === W.ELEMENT_NODE;
	}
	function ye(e) {
		return e && e.nodeType === W.TEXT_NODE;
	}
	function be(e, t) {
		var r = e.childNodes || [];
		if (n(r, ve) || _e(t)) return !1;
		var i = n(r, _e);
		return !(t && i && r.indexOf(i) > r.indexOf(t));
	}
	function xe(e, t) {
		var r = e.childNodes || [];
		function i(e) {
			return ve(e) && e !== t;
		}
		if (n(r, i)) return !1;
		var a = n(r, _e);
		return !(t && a && r.indexOf(a) > r.indexOf(t));
	}
	function Se(e, t, n) {
		if (!he(e)) throw new f(f.HIERARCHY_REQUEST_ERR, "Unexpected parent node type " + e.nodeType);
		if (n && n.parentNode !== e) throw new f(f.NOT_FOUND_ERR, "child not in parent");
		if (!ge(t) || _e(t) && e.nodeType !== W.DOCUMENT_NODE) throw new f(f.HIERARCHY_REQUEST_ERR, "Unexpected node type " + t.nodeType + " for parent node type " + e.nodeType);
	}
	function Ce(e, t, r) {
		var i = e.childNodes || [], a = t.childNodes || [];
		if (t.nodeType === W.DOCUMENT_FRAGMENT_NODE) {
			var o = a.filter(ve);
			if (o.length > 1 || n(a, ye)) throw new f(f.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
			if (o.length === 1 && !be(e, r)) throw new f(f.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
		}
		if (ve(t) && !be(e, r)) throw new f(f.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
		if (_e(t)) {
			if (n(i, _e)) throw new f(f.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
			var s = n(i, ve);
			if (r && i.indexOf(s) < i.indexOf(r)) throw new f(f.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
			if (!r && s) throw new f(f.HIERARCHY_REQUEST_ERR, "Doctype can not be appended since element is present");
		}
	}
	function we(e, t, r) {
		var i = e.childNodes || [], a = t.childNodes || [];
		if (t.nodeType === W.DOCUMENT_FRAGMENT_NODE) {
			var o = a.filter(ve);
			if (o.length > 1 || n(a, ye)) throw new f(f.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
			if (o.length === 1 && !xe(e, r)) throw new f(f.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
		}
		if (ve(t) && !xe(e, r)) throw new f(f.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
		if (_e(t)) {
			function e(e) {
				return _e(e) && e !== r;
			}
			if (n(i, e)) throw new f(f.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
			var s = n(i, ve);
			if (r && i.indexOf(s) < i.indexOf(r)) throw new f(f.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
		}
	}
	function Te(e, t, n, r) {
		Se(e, t, n), e.nodeType === W.DOCUMENT_NODE && (r || Ce)(e, t, n);
		var i = t.parentNode;
		if (i && i.removeChild(t), t.nodeType === F) {
			var a = t.firstChild;
			if (a == null) return t;
			var o = t.lastChild;
		} else a = o = t;
		var s = n ? n.previousSibling : e.lastChild;
		a.previousSibling = s, o.nextSibling = n, s ? s.nextSibling = a : e.firstChild = a, n == null ? e.lastChild = o : n.previousSibling = o;
		do
			a.parentNode = e;
		while (a !== o && (a = a.nextSibling));
		return pe(e.ownerDocument || e, e, t), t.nodeType == F && (t.firstChild = t.lastChild = null), t;
	}
	ue.prototype = {
		implementation: null,
		nodeName: "#document",
		nodeType: N,
		doctype: null,
		documentElement: null,
		_inc: 1,
		insertBefore: function(e, t) {
			if (e.nodeType === F) {
				for (var n = e.firstChild; n;) {
					var r = n.nextSibling;
					this.insertBefore(n, t), n = r;
				}
				return e;
			}
			return Te(this, e, t), e.ownerDocument = this, this.documentElement === null && e.nodeType === E && (this.documentElement = e), e;
		},
		removeChild: function(e) {
			var t = me(this, e);
			return t === this.documentElement && (this.documentElement = null), t;
		},
		replaceChild: function(e, t) {
			Te(this, e, t, we), e.ownerDocument = this, t && this.removeChild(t), ve(e) && (this.documentElement = e);
		},
		importNode: function(e, t) {
			return He(this, e, t);
		},
		getElementById: function(e) {
			var t = null;
			return K(this.documentElement, function(n) {
				if (n.nodeType == E && n.getAttribute("id") == e) return t = n, !0;
			}), t;
		},
		createElement: function(e) {
			var t = new Ee(u);
			t.ownerDocument = this, this.type === "html" && (e = e.toLowerCase()), r(this.contentType) && (t.namespaceURI = l.HTML), t.nodeName = e, t.tagName = e, t.localName = e, t.childNodes = new z();
			var n = t.attributes = new H();
			return n._ownerElement = t, t;
		},
		createDocumentFragment: function() {
			var e = new Fe(u);
			return e.ownerDocument = this, e.childNodes = new z(), e;
		},
		createTextNode: function(e) {
			var t = new Oe(u);
			return t.ownerDocument = this, t.childNodes = new z(), t.appendData(e), t;
		},
		createComment: function(e) {
			var t = new ke(u);
			return t.ownerDocument = this, t.childNodes = new z(), t.appendData(e), t;
		},
		createCDATASection: function(e) {
			if (e.indexOf("]]>") !== -1) throw new f(f.INVALID_CHARACTER_ERR, "data contains \"]]>\"");
			var t = new Ae(u);
			return t.ownerDocument = this, t.childNodes = new z(), t.appendData(e), t;
		},
		createProcessingInstruction: function(e, t) {
			var n = new Ie(u);
			return n.ownerDocument = this, n.childNodes = new z(), n.nodeName = n.target = e, n.nodeValue = n.data = t, n;
		},
		createAttribute: function(e) {
			if (!m.QName_exact.test(e)) throw new f(f.INVALID_CHARACTER_ERR, "invalid character in name \"" + e + "\"");
			return this.type === "html" && (e = e.toLowerCase()), this._createAttribute(e);
		},
		_createAttribute: function(e) {
			var t = new De(u);
			return t.ownerDocument = this, t.childNodes = new z(), t.name = e, t.nodeName = e, t.localName = e, t.specified = !0, t;
		},
		createEntityReference: function(e) {
			if (!m.Name_exact.test(e)) throw new f(f.INVALID_CHARACTER_ERR, "not a valid xml name \"" + e + "\"");
			if (this.type === "html") throw new f("document is an html document", p.NotSupportedError);
			var t = new Pe(u);
			return t.ownerDocument = this, t.childNodes = new z(), t.nodeName = e, t;
		},
		createElementNS: function(e, t) {
			var n = S(e, t), r = new Ee(u), i = r.attributes = new H();
			return r.childNodes = new z(), r.ownerDocument = this, r.nodeName = t, r.tagName = t, r.namespaceURI = n[0], r.prefix = n[1], r.localName = n[2], i._ownerElement = r, r;
		},
		createAttributeNS: function(e, t) {
			var n = S(e, t), r = new De(u);
			return r.ownerDocument = this, r.childNodes = new z(), r.nodeName = t, r.name = t, r.specified = !0, r.namespaceURI = n[0], r.prefix = n[1], r.localName = n[2], r;
		}
	}, w(ue, W);
	function Ee(e) {
		h(e), this._nsMap = Object.create(null);
	}
	Ee.prototype = {
		nodeType: E,
		attributes: null,
		getQualifiedName: function() {
			return this.prefix ? this.prefix + ":" + this.localName : this.localName;
		},
		_isInHTMLDocumentAndNamespace: function() {
			return this.ownerDocument.type === "html" && this.namespaceURI === l.HTML;
		},
		hasAttributes: function() {
			return !!(this.attributes && this.attributes.length);
		},
		hasAttribute: function(e) {
			return !!this.getAttributeNode(e);
		},
		getAttribute: function(e) {
			var t = this.getAttributeNode(e);
			return t ? t.value : null;
		},
		getAttributeNode: function(e) {
			return this._isInHTMLDocumentAndNamespace() && (e = e.toLowerCase()), this.attributes.getNamedItem(e);
		},
		setAttribute: function(e, t) {
			this._isInHTMLDocumentAndNamespace() && (e = e.toLowerCase());
			var n = this.getAttributeNode(e);
			n ? n.value = n.nodeValue = "" + t : (n = this.ownerDocument._createAttribute(e), n.value = n.nodeValue = "" + t, this.setAttributeNode(n));
		},
		removeAttribute: function(e) {
			var t = this.getAttributeNode(e);
			t && this.removeAttributeNode(t);
		},
		setAttributeNode: function(e) {
			return this.attributes.setNamedItem(e);
		},
		setAttributeNodeNS: function(e) {
			return this.attributes.setNamedItemNS(e);
		},
		removeAttributeNode: function(e) {
			return this.attributes.removeNamedItem(e.nodeName);
		},
		removeAttributeNS: function(e, t) {
			var n = this.getAttributeNodeNS(e, t);
			n && this.removeAttributeNode(n);
		},
		hasAttributeNS: function(e, t) {
			return this.getAttributeNodeNS(e, t) != null;
		},
		getAttributeNS: function(e, t) {
			var n = this.getAttributeNodeNS(e, t);
			return n ? n.value : null;
		},
		setAttributeNS: function(e, t, n) {
			var r = S(e, t)[2], i = this.getAttributeNodeNS(e, r);
			i ? i.value = i.nodeValue = "" + n : (i = this.ownerDocument.createAttributeNS(e, t), i.value = i.nodeValue = "" + n, this.setAttributeNode(i));
		},
		getAttributeNodeNS: function(e, t) {
			return this.attributes.getNamedItemNS(e, t);
		},
		getElementsByClassName: function(e) {
			var t = y(e);
			return new B(this, function(n) {
				var r = [];
				return t.length > 0 && K(n, function(i) {
					if (i !== n && i.nodeType === E) {
						var a = i.getAttribute("class");
						if (a) {
							var o = e === a;
							if (!o) {
								var s = y(a);
								o = t.every(b(s));
							}
							o && r.push(i);
						}
					}
				}), r;
			});
		},
		getElementsByTagName: function(e) {
			var t = (this.nodeType === N ? this : this.ownerDocument).type === "html", n = e.toLowerCase();
			return new B(this, function(r) {
				var i = [];
				return K(r, function(a) {
					a !== r && a.nodeType === E && (e === "*" || a.getQualifiedName() === (t && a.namespaceURI === l.HTML ? n : e)) && i.push(a);
				}), i;
			});
		},
		getElementsByTagNameNS: function(e, t) {
			return new B(this, function(n) {
				var r = [];
				return K(n, function(i) {
					i === n || i.nodeType !== E || e !== "*" && i.namespaceURI !== e || t !== "*" && i.localName != t || r.push(i);
				}), r;
			});
		}
	}, ue.prototype.getElementsByClassName = Ee.prototype.getElementsByClassName, ue.prototype.getElementsByTagName = Ee.prototype.getElementsByTagName, ue.prototype.getElementsByTagNameNS = Ee.prototype.getElementsByTagNameNS, w(Ee, W);
	function De(e) {
		h(e), this.namespaceURI = null, this.prefix = null, this.ownerElement = null;
	}
	De.prototype.nodeType = D, w(De, W);
	function q(e) {
		h(e);
	}
	q.prototype = {
		data: "",
		substringData: function(e, t) {
			return this.data.substring(e, e + t);
		},
		appendData: function(e) {
			e = this.data + e, this.nodeValue = this.data = e, this.length = e.length;
		},
		insertData: function(e, t) {
			this.replaceData(e, 0, t);
		},
		deleteData: function(e, t) {
			this.replaceData(e, t, "");
		},
		replaceData: function(e, t, n) {
			var r = this.data.substring(0, e), i = this.data.substring(e + t);
			n = r + n + i, this.nodeValue = this.data = n, this.length = n.length;
		}
	}, w(q, W);
	function Oe(e) {
		h(e);
	}
	Oe.prototype = {
		nodeName: "#text",
		nodeType: O,
		splitText: function(e) {
			var t = this.data, n = t.substring(e);
			t = t.substring(0, e), this.data = this.nodeValue = t, this.length = t.length;
			var r = this.ownerDocument.createTextNode(n);
			return this.parentNode && this.parentNode.insertBefore(r, this.nextSibling), r;
		}
	}, w(Oe, q);
	function ke(e) {
		h(e);
	}
	ke.prototype = {
		nodeName: "#comment",
		nodeType: ee
	}, w(ke, q);
	function Ae(e) {
		h(e);
	}
	Ae.prototype = {
		nodeName: "#cdata-section",
		nodeType: k
	}, w(Ae, Oe);
	function je(e) {
		h(e);
	}
	je.prototype.nodeType = P, w(je, W);
	function Me(e) {
		h(e);
	}
	Me.prototype.nodeType = I, w(Me, W);
	function Ne(e) {
		h(e);
	}
	Ne.prototype.nodeType = j, w(Ne, W);
	function Pe(e) {
		h(e);
	}
	Pe.prototype.nodeType = A, w(Pe, W);
	function Fe(e) {
		h(e);
	}
	Fe.prototype.nodeName = "#document-fragment", Fe.prototype.nodeType = F, w(Fe, W);
	function Ie(e) {
		h(e);
	}
	Ie.prototype.nodeType = M, w(Ie, q);
	function Le() {}
	Le.prototype.serializeToString = function(e, t) {
		return Re.call(e, t);
	}, W.prototype.toString = Re;
	function Re(e) {
		var t = typeof e == "function" ? {
			requireWellFormed: !1,
			splitCDATASections: !0,
			nodeFilter: e
		} : e == null ? {
			requireWellFormed: !1,
			splitCDATASections: !0,
			nodeFilter: null
		} : {
			requireWellFormed: !!e.requireWellFormed,
			splitCDATASections: e.splitCDATASections !== !1,
			nodeFilter: e.nodeFilter || null
		}, n = [], r = this.nodeType === N && this.documentElement || this, i = r.prefix, a = r.namespaceURI;
		if (a && i == null) {
			var i = r.lookupPrefix(a);
			if (i == null) var o = [{
				namespace: a,
				prefix: null
			}];
		}
		return Ve(this, n, o, t), n.join("");
	}
	function ze(e, t, n) {
		var r = e.prefix || "", i = e.namespaceURI;
		if (!i || r === "xml" && i === l.XML || i === l.XMLNS) return !1;
		for (var a = n.length; a--;) {
			var o = n[a];
			if (o.prefix === r) return o.namespace !== i;
		}
		return !0;
	}
	function Be(e, t, n, r) {
		if (r && !m.QName_exact.test(t)) throw new f("The attribute name \"" + t + "\" is not a valid XML QName", p.InvalidStateError);
		e.push(" ", t, "=\"", n.replace(/[<>&"\t\n\r]/g, G), "\"");
	}
	function Ve(e, t, n, r) {
		n ||= [];
		var i = r.nodeFilter, a = r.requireWellFormed, c = r.splitCDATASections, u = (e.nodeType === N ? e : e.ownerDocument).type === "html";
		le(e, { ns: n }, {
			enter: function(e, n) {
				var d = n.ns;
				if (i) {
					if (e = i(e), e) {
						if (typeof e == "string") return t.push(e), null;
					} else return null;
				}
				switch (e.nodeType) {
					case E:
						var h = e.attributes, g = h.length, _ = e.tagName, v = _;
						if (!u && !e.prefix && e.namespaceURI) {
							for (var y, b = 0; b < h.length; b++) if (h.item(b).name === "xmlns") {
								y = h.item(b).value;
								break;
							}
							if (!y) for (var x = d.length - 1; x >= 0; x--) {
								var S = d[x];
								if (S.prefix === "" && S.namespace === e.namespaceURI) {
									y = S.namespace;
									break;
								}
							}
							if (y !== e.namespaceURI) for (var x = d.length - 1; x >= 0; x--) {
								var S = d[x];
								if (S.namespace === e.namespaceURI) {
									S.prefix && (v = S.prefix + ":" + _);
									break;
								}
							}
						}
						if (a && !m.QName_exact.test(v)) throw new f("The element name \"" + v + "\" is not a valid XML QName", p.InvalidStateError);
						t.push("<", v);
						for (var C = d.slice(), w = 0; w < g; w++) {
							var T = h.item(w);
							T.prefix == "xmlns" ? C.push({
								prefix: T.localName,
								namespace: T.value
							}) : T.nodeName == "xmlns" && C.push({
								prefix: "",
								namespace: T.value
							});
						}
						for (var w = 0; w < g; w++) {
							var T = h.item(w);
							if (ze(T, u, C)) {
								var j = T.prefix || "", I = T.namespaceURI;
								Be(t, j ? "xmlns:" + j : "xmlns", I, a), C.push({
									prefix: j,
									namespace: I
								});
							}
							var L = i ? i(T) : T;
							L && (typeof L == "string" ? t.push(L) : Be(t, L.name, L.value, a));
						}
						if (_ === v && ze(e, u, C)) {
							var R = e.prefix || "", I = e.namespaceURI;
							Be(t, R ? "xmlns:" + R : "xmlns", I, a), C.push({
								prefix: R,
								namespace: I
							});
						}
						var te = !e.firstChild;
						if (te && (u || e.namespaceURI === l.HTML) && (te = s(_)), te) return t.push("/>"), null;
						if (t.push(">"), u && o(_)) {
							for (var z = e.firstChild; z;) z.data ? t.push(z.data) : Ve(z, t, C.slice(), r), z = z.nextSibling;
							return t.push("</", v, ">"), null;
						}
						return {
							ns: C,
							tag: v
						};
					case N:
					case F:
						if (a && e.nodeType === N && e.documentElement == null) throw new f("The Document has no documentElement", p.InvalidStateError);
						return { ns: d };
					case D: return Be(t, e.name, e.value, a), null;
					case O:
						if (a && m.InvalidChar.test(e.data)) throw new f("The Text node data contains characters outside the XML Char production", p.InvalidStateError);
						return t.push(e.data.replace(/[<&>]/g, G)), null;
					case k:
						if (a && e.data.indexOf("]]>") !== -1) throw new f("The CDATASection data contains \"]]>\"", p.InvalidStateError);
						return c ? t.push(m.CDATA_START, e.data.replace(/]]>/g, "]]]]><![CDATA[>"), m.CDATA_END) : t.push(m.CDATA_START, e.data, m.CDATA_END), null;
					case ee:
						if (a) {
							if (m.InvalidChar.test(e.data)) throw new f("The comment node data contains characters outside the XML Char production", p.InvalidStateError);
							if (e.data.indexOf("--") !== -1 || e.data[e.data.length - 1] === "-") throw new f("The comment node data contains \"--\" or ends with \"-\"", p.InvalidStateError);
						}
						return t.push(m.COMMENT_START, e.data, m.COMMENT_END), null;
					case P:
						var B = e.publicId, V = e.systemId;
						if (a) {
							if (!m.Name_exact.test(e.name)) throw new f("The doctype name \"" + e.name + "\" is not a valid XML Name", p.InvalidStateError);
							if (B && !m.PubidLiteral_match.test(B)) throw new f("DocumentType publicId is not a valid PubidLiteral", p.InvalidStateError);
							if (V && V !== "." && !m.SystemLiteral_match.test(V)) throw new f("DocumentType systemId is not a valid SystemLiteral", p.InvalidStateError);
							if (e.internalSubset && e.internalSubset.indexOf("]>") !== -1) throw new f("DocumentType internalSubset contains \"]>\"", p.InvalidStateError);
						}
						return t.push(m.DOCTYPE_DECL_START, " ", e.name), B ? (t.push(" ", m.PUBLIC, " ", B), V && V !== "." && t.push(" ", V)) : V && V !== "." && t.push(" ", m.SYSTEM, " ", V), e.internalSubset && t.push(" [", e.internalSubset, "]"), t.push(">"), null;
					case M:
						if (a) {
							if (!m.NCName_exact.test(e.target) || e.target.toLowerCase() === "xml") throw new f("The processing instruction target \"" + e.target + "\" is not a valid XML NCName or is reserved", p.InvalidStateError);
							if (m.InvalidChar.test(e.data)) throw new f("The ProcessingInstruction data contains characters outside the XML Char production", p.InvalidStateError);
							if (e.data.indexOf("?>") !== -1) throw new f("The ProcessingInstruction data contains \"?>\"", p.InvalidStateError);
						}
						return t.push("<?", e.target, " ", e.data, "?>"), null;
					case A:
						if (a && !m.Name_exact.test(e.nodeName)) throw new f("The entity reference name \"" + e.nodeName + "\" is not a valid XML Name", p.InvalidStateError);
						return t.push("&", e.nodeName, ";"), null;
					default: return t.push("??", e.nodeName), null;
				}
			},
			exit: function(e, n) {
				n && n.tag && t.push("</", n.tag, ">");
			}
		});
	}
	function He(e, t, n) {
		var r;
		return le(t, null, { enter: function(t, i) {
			var a = t.cloneNode(!1);
			return a.ownerDocument = e, a.parentNode = null, i === null ? r = a : i.appendChild(a), t.nodeType === D || n ? a : null;
		} }), r;
	}
	function Ue(e, t, n) {
		var r;
		return le(t, null, { enter: function(t, a) {
			var o = new t.constructor(u);
			for (var s in t) if (i(t, s)) {
				var c = t[s];
				typeof c != "object" && c != o[s] && (o[s] = c);
			}
			t.childNodes && (o.childNodes = new z()), o.ownerDocument = e;
			var l = n;
			switch (o.nodeType) {
				case E:
					var d = t.attributes, f = o.attributes = new H(), p = d.length;
					f._ownerElement = o;
					for (var m = 0; m < p; m++) o.setAttributeNode(Ue(e, d.item(m), !0));
					break;
				case D: l = !0;
			}
			return a === null ? r = o : a.appendChild(o), l ? o : null;
		} }), r;
	}
	function We(e, t, n) {
		e[t] = n;
	}
	function Ge(e) {
		for (var t = [], n = e.firstChild; n;) n.nodeType === E && t.push(n), n = n.nextSibling;
		return t;
	}
	try {
		Object.defineProperty && (Object.defineProperty(B.prototype, "length", { get: function() {
			return V(this), this.$$length;
		} }), Object.defineProperty(W.prototype, "textContent", {
			get: function() {
				if (this.nodeType === E || this.nodeType === F) {
					var e = [];
					return le(this, null, { enter: function(t) {
						if (t.nodeType === E || t.nodeType === F) return !0;
						if (t.nodeType === M || t.nodeType === ee) return null;
						e.push(t.nodeValue);
					} }), e.join("");
				}
				return this.nodeValue;
			},
			set: function(e) {
				switch (this.nodeType) {
					case E:
					case F:
						for (; this.firstChild;) this.removeChild(this.firstChild);
						(e || String(e)) && this.appendChild(this.ownerDocument.createTextNode(e));
						break;
					default: this.data = e, this.value = e, this.nodeValue = e;
				}
			}
		}), Object.defineProperty(q.prototype, "data", {
			get: function() {
				return this._data == null ? "" : this._data;
			},
			set: function(e) {
				this._data = e, this.length = typeof e == "string" ? e.length : 0;
			}
		}), Object.defineProperty(q.prototype, "nodeValue", {
			get: function() {
				return this.data;
			},
			set: function(e) {
				this.data = e;
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(Ee.prototype, "children", { get: function() {
			return new B(this, Ge);
		} }), Object.defineProperty(ue.prototype, "children", { get: function() {
			return new B(this, Ge);
		} }), Object.defineProperty(Fe.prototype, "children", { get: function() {
			return new B(this, Ge);
		} }), We = function(e, t, n) {
			e["$$" + t] = n;
		});
	} catch {}
	e._updateLiveList = V, e.Attr = De, e.CDATASection = Ae, e.CharacterData = q, e.Comment = ke, e.Document = ue, e.DocumentFragment = Fe, e.DocumentType = je, e.DOMImplementation = ce, e.Element = Ee, e.Entity = Ne, e.EntityReference = Pe, e.LiveNodeList = B, e.NamedNodeMap = H, e.Node = W, e.NodeList = z, e.Notation = Me, e.Text = Oe, e.ProcessingInstruction = Ie, e.walkDOM = le, e.XMLSerializer = Le;
})), h_ = /* @__PURE__ */ t(((e) => {
	var t = d_().freeze;
	e.XML_ENTITIES = t({
		amp: "&",
		apos: "'",
		gt: ">",
		lt: "<",
		quot: "\""
	}), e.HTML_ENTITIES = t({
		Aacute: "Á",
		aacute: "á",
		Abreve: "Ă",
		abreve: "ă",
		ac: "∾",
		acd: "∿",
		acE: "∾̳",
		Acirc: "Â",
		acirc: "â",
		acute: "´",
		Acy: "А",
		acy: "а",
		AElig: "Æ",
		aelig: "æ",
		af: "⁡",
		Afr: "𝔄",
		afr: "𝔞",
		Agrave: "À",
		agrave: "à",
		alefsym: "ℵ",
		aleph: "ℵ",
		Alpha: "Α",
		alpha: "α",
		Amacr: "Ā",
		amacr: "ā",
		amalg: "⨿",
		AMP: "&",
		amp: "&",
		And: "⩓",
		and: "∧",
		andand: "⩕",
		andd: "⩜",
		andslope: "⩘",
		andv: "⩚",
		ang: "∠",
		ange: "⦤",
		angle: "∠",
		angmsd: "∡",
		angmsdaa: "⦨",
		angmsdab: "⦩",
		angmsdac: "⦪",
		angmsdad: "⦫",
		angmsdae: "⦬",
		angmsdaf: "⦭",
		angmsdag: "⦮",
		angmsdah: "⦯",
		angrt: "∟",
		angrtvb: "⊾",
		angrtvbd: "⦝",
		angsph: "∢",
		angst: "Å",
		angzarr: "⍼",
		Aogon: "Ą",
		aogon: "ą",
		Aopf: "𝔸",
		aopf: "𝕒",
		ap: "≈",
		apacir: "⩯",
		apE: "⩰",
		ape: "≊",
		apid: "≋",
		apos: "'",
		ApplyFunction: "⁡",
		approx: "≈",
		approxeq: "≊",
		Aring: "Å",
		aring: "å",
		Ascr: "𝒜",
		ascr: "𝒶",
		Assign: "≔",
		ast: "*",
		asymp: "≈",
		asympeq: "≍",
		Atilde: "Ã",
		atilde: "ã",
		Auml: "Ä",
		auml: "ä",
		awconint: "∳",
		awint: "⨑",
		backcong: "≌",
		backepsilon: "϶",
		backprime: "‵",
		backsim: "∽",
		backsimeq: "⋍",
		Backslash: "∖",
		Barv: "⫧",
		barvee: "⊽",
		Barwed: "⌆",
		barwed: "⌅",
		barwedge: "⌅",
		bbrk: "⎵",
		bbrktbrk: "⎶",
		bcong: "≌",
		Bcy: "Б",
		bcy: "б",
		bdquo: "„",
		becaus: "∵",
		Because: "∵",
		because: "∵",
		bemptyv: "⦰",
		bepsi: "϶",
		bernou: "ℬ",
		Bernoullis: "ℬ",
		Beta: "Β",
		beta: "β",
		beth: "ℶ",
		between: "≬",
		Bfr: "𝔅",
		bfr: "𝔟",
		bigcap: "⋂",
		bigcirc: "◯",
		bigcup: "⋃",
		bigodot: "⨀",
		bigoplus: "⨁",
		bigotimes: "⨂",
		bigsqcup: "⨆",
		bigstar: "★",
		bigtriangledown: "▽",
		bigtriangleup: "△",
		biguplus: "⨄",
		bigvee: "⋁",
		bigwedge: "⋀",
		bkarow: "⤍",
		blacklozenge: "⧫",
		blacksquare: "▪",
		blacktriangle: "▴",
		blacktriangledown: "▾",
		blacktriangleleft: "◂",
		blacktriangleright: "▸",
		blank: "␣",
		blk12: "▒",
		blk14: "░",
		blk34: "▓",
		block: "█",
		bne: "=⃥",
		bnequiv: "≡⃥",
		bNot: "⫭",
		bnot: "⌐",
		Bopf: "𝔹",
		bopf: "𝕓",
		bot: "⊥",
		bottom: "⊥",
		bowtie: "⋈",
		boxbox: "⧉",
		boxDL: "╗",
		boxDl: "╖",
		boxdL: "╕",
		boxdl: "┐",
		boxDR: "╔",
		boxDr: "╓",
		boxdR: "╒",
		boxdr: "┌",
		boxH: "═",
		boxh: "─",
		boxHD: "╦",
		boxHd: "╤",
		boxhD: "╥",
		boxhd: "┬",
		boxHU: "╩",
		boxHu: "╧",
		boxhU: "╨",
		boxhu: "┴",
		boxminus: "⊟",
		boxplus: "⊞",
		boxtimes: "⊠",
		boxUL: "╝",
		boxUl: "╜",
		boxuL: "╛",
		boxul: "┘",
		boxUR: "╚",
		boxUr: "╙",
		boxuR: "╘",
		boxur: "└",
		boxV: "║",
		boxv: "│",
		boxVH: "╬",
		boxVh: "╫",
		boxvH: "╪",
		boxvh: "┼",
		boxVL: "╣",
		boxVl: "╢",
		boxvL: "╡",
		boxvl: "┤",
		boxVR: "╠",
		boxVr: "╟",
		boxvR: "╞",
		boxvr: "├",
		bprime: "‵",
		Breve: "˘",
		breve: "˘",
		brvbar: "¦",
		Bscr: "ℬ",
		bscr: "𝒷",
		bsemi: "⁏",
		bsim: "∽",
		bsime: "⋍",
		bsol: "\\",
		bsolb: "⧅",
		bsolhsub: "⟈",
		bull: "•",
		bullet: "•",
		bump: "≎",
		bumpE: "⪮",
		bumpe: "≏",
		Bumpeq: "≎",
		bumpeq: "≏",
		Cacute: "Ć",
		cacute: "ć",
		Cap: "⋒",
		cap: "∩",
		capand: "⩄",
		capbrcup: "⩉",
		capcap: "⩋",
		capcup: "⩇",
		capdot: "⩀",
		CapitalDifferentialD: "ⅅ",
		caps: "∩︀",
		caret: "⁁",
		caron: "ˇ",
		Cayleys: "ℭ",
		ccaps: "⩍",
		Ccaron: "Č",
		ccaron: "č",
		Ccedil: "Ç",
		ccedil: "ç",
		Ccirc: "Ĉ",
		ccirc: "ĉ",
		Cconint: "∰",
		ccups: "⩌",
		ccupssm: "⩐",
		Cdot: "Ċ",
		cdot: "ċ",
		cedil: "¸",
		Cedilla: "¸",
		cemptyv: "⦲",
		cent: "¢",
		CenterDot: "·",
		centerdot: "·",
		Cfr: "ℭ",
		cfr: "𝔠",
		CHcy: "Ч",
		chcy: "ч",
		check: "✓",
		checkmark: "✓",
		Chi: "Χ",
		chi: "χ",
		cir: "○",
		circ: "ˆ",
		circeq: "≗",
		circlearrowleft: "↺",
		circlearrowright: "↻",
		circledast: "⊛",
		circledcirc: "⊚",
		circleddash: "⊝",
		CircleDot: "⊙",
		circledR: "®",
		circledS: "Ⓢ",
		CircleMinus: "⊖",
		CirclePlus: "⊕",
		CircleTimes: "⊗",
		cirE: "⧃",
		cire: "≗",
		cirfnint: "⨐",
		cirmid: "⫯",
		cirscir: "⧂",
		ClockwiseContourIntegral: "∲",
		CloseCurlyDoubleQuote: "”",
		CloseCurlyQuote: "’",
		clubs: "♣",
		clubsuit: "♣",
		Colon: "∷",
		colon: ":",
		Colone: "⩴",
		colone: "≔",
		coloneq: "≔",
		comma: ",",
		commat: "@",
		comp: "∁",
		compfn: "∘",
		complement: "∁",
		complexes: "ℂ",
		cong: "≅",
		congdot: "⩭",
		Congruent: "≡",
		Conint: "∯",
		conint: "∮",
		ContourIntegral: "∮",
		Copf: "ℂ",
		copf: "𝕔",
		coprod: "∐",
		Coproduct: "∐",
		COPY: "©",
		copy: "©",
		copysr: "℗",
		CounterClockwiseContourIntegral: "∳",
		crarr: "↵",
		Cross: "⨯",
		cross: "✗",
		Cscr: "𝒞",
		cscr: "𝒸",
		csub: "⫏",
		csube: "⫑",
		csup: "⫐",
		csupe: "⫒",
		ctdot: "⋯",
		cudarrl: "⤸",
		cudarrr: "⤵",
		cuepr: "⋞",
		cuesc: "⋟",
		cularr: "↶",
		cularrp: "⤽",
		Cup: "⋓",
		cup: "∪",
		cupbrcap: "⩈",
		CupCap: "≍",
		cupcap: "⩆",
		cupcup: "⩊",
		cupdot: "⊍",
		cupor: "⩅",
		cups: "∪︀",
		curarr: "↷",
		curarrm: "⤼",
		curlyeqprec: "⋞",
		curlyeqsucc: "⋟",
		curlyvee: "⋎",
		curlywedge: "⋏",
		curren: "¤",
		curvearrowleft: "↶",
		curvearrowright: "↷",
		cuvee: "⋎",
		cuwed: "⋏",
		cwconint: "∲",
		cwint: "∱",
		cylcty: "⌭",
		Dagger: "‡",
		dagger: "†",
		daleth: "ℸ",
		Darr: "↡",
		dArr: "⇓",
		darr: "↓",
		dash: "‐",
		Dashv: "⫤",
		dashv: "⊣",
		dbkarow: "⤏",
		dblac: "˝",
		Dcaron: "Ď",
		dcaron: "ď",
		Dcy: "Д",
		dcy: "д",
		DD: "ⅅ",
		dd: "ⅆ",
		ddagger: "‡",
		ddarr: "⇊",
		DDotrahd: "⤑",
		ddotseq: "⩷",
		deg: "°",
		Del: "∇",
		Delta: "Δ",
		delta: "δ",
		demptyv: "⦱",
		dfisht: "⥿",
		Dfr: "𝔇",
		dfr: "𝔡",
		dHar: "⥥",
		dharl: "⇃",
		dharr: "⇂",
		DiacriticalAcute: "´",
		DiacriticalDot: "˙",
		DiacriticalDoubleAcute: "˝",
		DiacriticalGrave: "`",
		DiacriticalTilde: "˜",
		diam: "⋄",
		Diamond: "⋄",
		diamond: "⋄",
		diamondsuit: "♦",
		diams: "♦",
		die: "¨",
		DifferentialD: "ⅆ",
		digamma: "ϝ",
		disin: "⋲",
		div: "÷",
		divide: "÷",
		divideontimes: "⋇",
		divonx: "⋇",
		DJcy: "Ђ",
		djcy: "ђ",
		dlcorn: "⌞",
		dlcrop: "⌍",
		dollar: "$",
		Dopf: "𝔻",
		dopf: "𝕕",
		Dot: "¨",
		dot: "˙",
		DotDot: "⃜",
		doteq: "≐",
		doteqdot: "≑",
		DotEqual: "≐",
		dotminus: "∸",
		dotplus: "∔",
		dotsquare: "⊡",
		doublebarwedge: "⌆",
		DoubleContourIntegral: "∯",
		DoubleDot: "¨",
		DoubleDownArrow: "⇓",
		DoubleLeftArrow: "⇐",
		DoubleLeftRightArrow: "⇔",
		DoubleLeftTee: "⫤",
		DoubleLongLeftArrow: "⟸",
		DoubleLongLeftRightArrow: "⟺",
		DoubleLongRightArrow: "⟹",
		DoubleRightArrow: "⇒",
		DoubleRightTee: "⊨",
		DoubleUpArrow: "⇑",
		DoubleUpDownArrow: "⇕",
		DoubleVerticalBar: "∥",
		DownArrow: "↓",
		Downarrow: "⇓",
		downarrow: "↓",
		DownArrowBar: "⤓",
		DownArrowUpArrow: "⇵",
		DownBreve: "̑",
		downdownarrows: "⇊",
		downharpoonleft: "⇃",
		downharpoonright: "⇂",
		DownLeftRightVector: "⥐",
		DownLeftTeeVector: "⥞",
		DownLeftVector: "↽",
		DownLeftVectorBar: "⥖",
		DownRightTeeVector: "⥟",
		DownRightVector: "⇁",
		DownRightVectorBar: "⥗",
		DownTee: "⊤",
		DownTeeArrow: "↧",
		drbkarow: "⤐",
		drcorn: "⌟",
		drcrop: "⌌",
		Dscr: "𝒟",
		dscr: "𝒹",
		DScy: "Ѕ",
		dscy: "ѕ",
		dsol: "⧶",
		Dstrok: "Đ",
		dstrok: "đ",
		dtdot: "⋱",
		dtri: "▿",
		dtrif: "▾",
		duarr: "⇵",
		duhar: "⥯",
		dwangle: "⦦",
		DZcy: "Џ",
		dzcy: "џ",
		dzigrarr: "⟿",
		Eacute: "É",
		eacute: "é",
		easter: "⩮",
		Ecaron: "Ě",
		ecaron: "ě",
		ecir: "≖",
		Ecirc: "Ê",
		ecirc: "ê",
		ecolon: "≕",
		Ecy: "Э",
		ecy: "э",
		eDDot: "⩷",
		Edot: "Ė",
		eDot: "≑",
		edot: "ė",
		ee: "ⅇ",
		efDot: "≒",
		Efr: "𝔈",
		efr: "𝔢",
		eg: "⪚",
		Egrave: "È",
		egrave: "è",
		egs: "⪖",
		egsdot: "⪘",
		el: "⪙",
		Element: "∈",
		elinters: "⏧",
		ell: "ℓ",
		els: "⪕",
		elsdot: "⪗",
		Emacr: "Ē",
		emacr: "ē",
		empty: "∅",
		emptyset: "∅",
		EmptySmallSquare: "◻",
		emptyv: "∅",
		EmptyVerySmallSquare: "▫",
		emsp: " ",
		emsp13: " ",
		emsp14: " ",
		ENG: "Ŋ",
		eng: "ŋ",
		ensp: " ",
		Eogon: "Ę",
		eogon: "ę",
		Eopf: "𝔼",
		eopf: "𝕖",
		epar: "⋕",
		eparsl: "⧣",
		eplus: "⩱",
		epsi: "ε",
		Epsilon: "Ε",
		epsilon: "ε",
		epsiv: "ϵ",
		eqcirc: "≖",
		eqcolon: "≕",
		eqsim: "≂",
		eqslantgtr: "⪖",
		eqslantless: "⪕",
		Equal: "⩵",
		equals: "=",
		EqualTilde: "≂",
		equest: "≟",
		Equilibrium: "⇌",
		equiv: "≡",
		equivDD: "⩸",
		eqvparsl: "⧥",
		erarr: "⥱",
		erDot: "≓",
		Escr: "ℰ",
		escr: "ℯ",
		esdot: "≐",
		Esim: "⩳",
		esim: "≂",
		Eta: "Η",
		eta: "η",
		ETH: "Ð",
		eth: "ð",
		Euml: "Ë",
		euml: "ë",
		euro: "€",
		excl: "!",
		exist: "∃",
		Exists: "∃",
		expectation: "ℰ",
		ExponentialE: "ⅇ",
		exponentiale: "ⅇ",
		fallingdotseq: "≒",
		Fcy: "Ф",
		fcy: "ф",
		female: "♀",
		ffilig: "ﬃ",
		fflig: "ﬀ",
		ffllig: "ﬄ",
		Ffr: "𝔉",
		ffr: "𝔣",
		filig: "ﬁ",
		FilledSmallSquare: "◼",
		FilledVerySmallSquare: "▪",
		fjlig: "fj",
		flat: "♭",
		fllig: "ﬂ",
		fltns: "▱",
		fnof: "ƒ",
		Fopf: "𝔽",
		fopf: "𝕗",
		ForAll: "∀",
		forall: "∀",
		fork: "⋔",
		forkv: "⫙",
		Fouriertrf: "ℱ",
		fpartint: "⨍",
		frac12: "½",
		frac13: "⅓",
		frac14: "¼",
		frac15: "⅕",
		frac16: "⅙",
		frac18: "⅛",
		frac23: "⅔",
		frac25: "⅖",
		frac34: "¾",
		frac35: "⅗",
		frac38: "⅜",
		frac45: "⅘",
		frac56: "⅚",
		frac58: "⅝",
		frac78: "⅞",
		frasl: "⁄",
		frown: "⌢",
		Fscr: "ℱ",
		fscr: "𝒻",
		gacute: "ǵ",
		Gamma: "Γ",
		gamma: "γ",
		Gammad: "Ϝ",
		gammad: "ϝ",
		gap: "⪆",
		Gbreve: "Ğ",
		gbreve: "ğ",
		Gcedil: "Ģ",
		Gcirc: "Ĝ",
		gcirc: "ĝ",
		Gcy: "Г",
		gcy: "г",
		Gdot: "Ġ",
		gdot: "ġ",
		gE: "≧",
		ge: "≥",
		gEl: "⪌",
		gel: "⋛",
		geq: "≥",
		geqq: "≧",
		geqslant: "⩾",
		ges: "⩾",
		gescc: "⪩",
		gesdot: "⪀",
		gesdoto: "⪂",
		gesdotol: "⪄",
		gesl: "⋛︀",
		gesles: "⪔",
		Gfr: "𝔊",
		gfr: "𝔤",
		Gg: "⋙",
		gg: "≫",
		ggg: "⋙",
		gimel: "ℷ",
		GJcy: "Ѓ",
		gjcy: "ѓ",
		gl: "≷",
		gla: "⪥",
		glE: "⪒",
		glj: "⪤",
		gnap: "⪊",
		gnapprox: "⪊",
		gnE: "≩",
		gne: "⪈",
		gneq: "⪈",
		gneqq: "≩",
		gnsim: "⋧",
		Gopf: "𝔾",
		gopf: "𝕘",
		grave: "`",
		GreaterEqual: "≥",
		GreaterEqualLess: "⋛",
		GreaterFullEqual: "≧",
		GreaterGreater: "⪢",
		GreaterLess: "≷",
		GreaterSlantEqual: "⩾",
		GreaterTilde: "≳",
		Gscr: "𝒢",
		gscr: "ℊ",
		gsim: "≳",
		gsime: "⪎",
		gsiml: "⪐",
		Gt: "≫",
		GT: ">",
		gt: ">",
		gtcc: "⪧",
		gtcir: "⩺",
		gtdot: "⋗",
		gtlPar: "⦕",
		gtquest: "⩼",
		gtrapprox: "⪆",
		gtrarr: "⥸",
		gtrdot: "⋗",
		gtreqless: "⋛",
		gtreqqless: "⪌",
		gtrless: "≷",
		gtrsim: "≳",
		gvertneqq: "≩︀",
		gvnE: "≩︀",
		Hacek: "ˇ",
		hairsp: " ",
		half: "½",
		hamilt: "ℋ",
		HARDcy: "Ъ",
		hardcy: "ъ",
		hArr: "⇔",
		harr: "↔",
		harrcir: "⥈",
		harrw: "↭",
		Hat: "^",
		hbar: "ℏ",
		Hcirc: "Ĥ",
		hcirc: "ĥ",
		hearts: "♥",
		heartsuit: "♥",
		hellip: "…",
		hercon: "⊹",
		Hfr: "ℌ",
		hfr: "𝔥",
		HilbertSpace: "ℋ",
		hksearow: "⤥",
		hkswarow: "⤦",
		hoarr: "⇿",
		homtht: "∻",
		hookleftarrow: "↩",
		hookrightarrow: "↪",
		Hopf: "ℍ",
		hopf: "𝕙",
		horbar: "―",
		HorizontalLine: "─",
		Hscr: "ℋ",
		hscr: "𝒽",
		hslash: "ℏ",
		Hstrok: "Ħ",
		hstrok: "ħ",
		HumpDownHump: "≎",
		HumpEqual: "≏",
		hybull: "⁃",
		hyphen: "‐",
		Iacute: "Í",
		iacute: "í",
		ic: "⁣",
		Icirc: "Î",
		icirc: "î",
		Icy: "И",
		icy: "и",
		Idot: "İ",
		IEcy: "Е",
		iecy: "е",
		iexcl: "¡",
		iff: "⇔",
		Ifr: "ℑ",
		ifr: "𝔦",
		Igrave: "Ì",
		igrave: "ì",
		ii: "ⅈ",
		iiiint: "⨌",
		iiint: "∭",
		iinfin: "⧜",
		iiota: "℩",
		IJlig: "Ĳ",
		ijlig: "ĳ",
		Im: "ℑ",
		Imacr: "Ī",
		imacr: "ī",
		image: "ℑ",
		ImaginaryI: "ⅈ",
		imagline: "ℐ",
		imagpart: "ℑ",
		imath: "ı",
		imof: "⊷",
		imped: "Ƶ",
		Implies: "⇒",
		in: "∈",
		incare: "℅",
		infin: "∞",
		infintie: "⧝",
		inodot: "ı",
		Int: "∬",
		int: "∫",
		intcal: "⊺",
		integers: "ℤ",
		Integral: "∫",
		intercal: "⊺",
		Intersection: "⋂",
		intlarhk: "⨗",
		intprod: "⨼",
		InvisibleComma: "⁣",
		InvisibleTimes: "⁢",
		IOcy: "Ё",
		iocy: "ё",
		Iogon: "Į",
		iogon: "į",
		Iopf: "𝕀",
		iopf: "𝕚",
		Iota: "Ι",
		iota: "ι",
		iprod: "⨼",
		iquest: "¿",
		Iscr: "ℐ",
		iscr: "𝒾",
		isin: "∈",
		isindot: "⋵",
		isinE: "⋹",
		isins: "⋴",
		isinsv: "⋳",
		isinv: "∈",
		it: "⁢",
		Itilde: "Ĩ",
		itilde: "ĩ",
		Iukcy: "І",
		iukcy: "і",
		Iuml: "Ï",
		iuml: "ï",
		Jcirc: "Ĵ",
		jcirc: "ĵ",
		Jcy: "Й",
		jcy: "й",
		Jfr: "𝔍",
		jfr: "𝔧",
		jmath: "ȷ",
		Jopf: "𝕁",
		jopf: "𝕛",
		Jscr: "𝒥",
		jscr: "𝒿",
		Jsercy: "Ј",
		jsercy: "ј",
		Jukcy: "Є",
		jukcy: "є",
		Kappa: "Κ",
		kappa: "κ",
		kappav: "ϰ",
		Kcedil: "Ķ",
		kcedil: "ķ",
		Kcy: "К",
		kcy: "к",
		Kfr: "𝔎",
		kfr: "𝔨",
		kgreen: "ĸ",
		KHcy: "Х",
		khcy: "х",
		KJcy: "Ќ",
		kjcy: "ќ",
		Kopf: "𝕂",
		kopf: "𝕜",
		Kscr: "𝒦",
		kscr: "𝓀",
		lAarr: "⇚",
		Lacute: "Ĺ",
		lacute: "ĺ",
		laemptyv: "⦴",
		lagran: "ℒ",
		Lambda: "Λ",
		lambda: "λ",
		Lang: "⟪",
		lang: "⟨",
		langd: "⦑",
		langle: "⟨",
		lap: "⪅",
		Laplacetrf: "ℒ",
		laquo: "«",
		Larr: "↞",
		lArr: "⇐",
		larr: "←",
		larrb: "⇤",
		larrbfs: "⤟",
		larrfs: "⤝",
		larrhk: "↩",
		larrlp: "↫",
		larrpl: "⤹",
		larrsim: "⥳",
		larrtl: "↢",
		lat: "⪫",
		lAtail: "⤛",
		latail: "⤙",
		late: "⪭",
		lates: "⪭︀",
		lBarr: "⤎",
		lbarr: "⤌",
		lbbrk: "❲",
		lbrace: "{",
		lbrack: "[",
		lbrke: "⦋",
		lbrksld: "⦏",
		lbrkslu: "⦍",
		Lcaron: "Ľ",
		lcaron: "ľ",
		Lcedil: "Ļ",
		lcedil: "ļ",
		lceil: "⌈",
		lcub: "{",
		Lcy: "Л",
		lcy: "л",
		ldca: "⤶",
		ldquo: "“",
		ldquor: "„",
		ldrdhar: "⥧",
		ldrushar: "⥋",
		ldsh: "↲",
		lE: "≦",
		le: "≤",
		LeftAngleBracket: "⟨",
		LeftArrow: "←",
		Leftarrow: "⇐",
		leftarrow: "←",
		LeftArrowBar: "⇤",
		LeftArrowRightArrow: "⇆",
		leftarrowtail: "↢",
		LeftCeiling: "⌈",
		LeftDoubleBracket: "⟦",
		LeftDownTeeVector: "⥡",
		LeftDownVector: "⇃",
		LeftDownVectorBar: "⥙",
		LeftFloor: "⌊",
		leftharpoondown: "↽",
		leftharpoonup: "↼",
		leftleftarrows: "⇇",
		LeftRightArrow: "↔",
		Leftrightarrow: "⇔",
		leftrightarrow: "↔",
		leftrightarrows: "⇆",
		leftrightharpoons: "⇋",
		leftrightsquigarrow: "↭",
		LeftRightVector: "⥎",
		LeftTee: "⊣",
		LeftTeeArrow: "↤",
		LeftTeeVector: "⥚",
		leftthreetimes: "⋋",
		LeftTriangle: "⊲",
		LeftTriangleBar: "⧏",
		LeftTriangleEqual: "⊴",
		LeftUpDownVector: "⥑",
		LeftUpTeeVector: "⥠",
		LeftUpVector: "↿",
		LeftUpVectorBar: "⥘",
		LeftVector: "↼",
		LeftVectorBar: "⥒",
		lEg: "⪋",
		leg: "⋚",
		leq: "≤",
		leqq: "≦",
		leqslant: "⩽",
		les: "⩽",
		lescc: "⪨",
		lesdot: "⩿",
		lesdoto: "⪁",
		lesdotor: "⪃",
		lesg: "⋚︀",
		lesges: "⪓",
		lessapprox: "⪅",
		lessdot: "⋖",
		lesseqgtr: "⋚",
		lesseqqgtr: "⪋",
		LessEqualGreater: "⋚",
		LessFullEqual: "≦",
		LessGreater: "≶",
		lessgtr: "≶",
		LessLess: "⪡",
		lesssim: "≲",
		LessSlantEqual: "⩽",
		LessTilde: "≲",
		lfisht: "⥼",
		lfloor: "⌊",
		Lfr: "𝔏",
		lfr: "𝔩",
		lg: "≶",
		lgE: "⪑",
		lHar: "⥢",
		lhard: "↽",
		lharu: "↼",
		lharul: "⥪",
		lhblk: "▄",
		LJcy: "Љ",
		ljcy: "љ",
		Ll: "⋘",
		ll: "≪",
		llarr: "⇇",
		llcorner: "⌞",
		Lleftarrow: "⇚",
		llhard: "⥫",
		lltri: "◺",
		Lmidot: "Ŀ",
		lmidot: "ŀ",
		lmoust: "⎰",
		lmoustache: "⎰",
		lnap: "⪉",
		lnapprox: "⪉",
		lnE: "≨",
		lne: "⪇",
		lneq: "⪇",
		lneqq: "≨",
		lnsim: "⋦",
		loang: "⟬",
		loarr: "⇽",
		lobrk: "⟦",
		LongLeftArrow: "⟵",
		Longleftarrow: "⟸",
		longleftarrow: "⟵",
		LongLeftRightArrow: "⟷",
		Longleftrightarrow: "⟺",
		longleftrightarrow: "⟷",
		longmapsto: "⟼",
		LongRightArrow: "⟶",
		Longrightarrow: "⟹",
		longrightarrow: "⟶",
		looparrowleft: "↫",
		looparrowright: "↬",
		lopar: "⦅",
		Lopf: "𝕃",
		lopf: "𝕝",
		loplus: "⨭",
		lotimes: "⨴",
		lowast: "∗",
		lowbar: "_",
		LowerLeftArrow: "↙",
		LowerRightArrow: "↘",
		loz: "◊",
		lozenge: "◊",
		lozf: "⧫",
		lpar: "(",
		lparlt: "⦓",
		lrarr: "⇆",
		lrcorner: "⌟",
		lrhar: "⇋",
		lrhard: "⥭",
		lrm: "‎",
		lrtri: "⊿",
		lsaquo: "‹",
		Lscr: "ℒ",
		lscr: "𝓁",
		Lsh: "↰",
		lsh: "↰",
		lsim: "≲",
		lsime: "⪍",
		lsimg: "⪏",
		lsqb: "[",
		lsquo: "‘",
		lsquor: "‚",
		Lstrok: "Ł",
		lstrok: "ł",
		Lt: "≪",
		LT: "<",
		lt: "<",
		ltcc: "⪦",
		ltcir: "⩹",
		ltdot: "⋖",
		lthree: "⋋",
		ltimes: "⋉",
		ltlarr: "⥶",
		ltquest: "⩻",
		ltri: "◃",
		ltrie: "⊴",
		ltrif: "◂",
		ltrPar: "⦖",
		lurdshar: "⥊",
		luruhar: "⥦",
		lvertneqq: "≨︀",
		lvnE: "≨︀",
		macr: "¯",
		male: "♂",
		malt: "✠",
		maltese: "✠",
		Map: "⤅",
		map: "↦",
		mapsto: "↦",
		mapstodown: "↧",
		mapstoleft: "↤",
		mapstoup: "↥",
		marker: "▮",
		mcomma: "⨩",
		Mcy: "М",
		mcy: "м",
		mdash: "—",
		mDDot: "∺",
		measuredangle: "∡",
		MediumSpace: " ",
		Mellintrf: "ℳ",
		Mfr: "𝔐",
		mfr: "𝔪",
		mho: "℧",
		micro: "µ",
		mid: "∣",
		midast: "*",
		midcir: "⫰",
		middot: "·",
		minus: "−",
		minusb: "⊟",
		minusd: "∸",
		minusdu: "⨪",
		MinusPlus: "∓",
		mlcp: "⫛",
		mldr: "…",
		mnplus: "∓",
		models: "⊧",
		Mopf: "𝕄",
		mopf: "𝕞",
		mp: "∓",
		Mscr: "ℳ",
		mscr: "𝓂",
		mstpos: "∾",
		Mu: "Μ",
		mu: "μ",
		multimap: "⊸",
		mumap: "⊸",
		nabla: "∇",
		Nacute: "Ń",
		nacute: "ń",
		nang: "∠⃒",
		nap: "≉",
		napE: "⩰̸",
		napid: "≋̸",
		napos: "ŉ",
		napprox: "≉",
		natur: "♮",
		natural: "♮",
		naturals: "ℕ",
		nbsp: "\xA0",
		nbump: "≎̸",
		nbumpe: "≏̸",
		ncap: "⩃",
		Ncaron: "Ň",
		ncaron: "ň",
		Ncedil: "Ņ",
		ncedil: "ņ",
		ncong: "≇",
		ncongdot: "⩭̸",
		ncup: "⩂",
		Ncy: "Н",
		ncy: "н",
		ndash: "–",
		ne: "≠",
		nearhk: "⤤",
		neArr: "⇗",
		nearr: "↗",
		nearrow: "↗",
		nedot: "≐̸",
		NegativeMediumSpace: "​",
		NegativeThickSpace: "​",
		NegativeThinSpace: "​",
		NegativeVeryThinSpace: "​",
		nequiv: "≢",
		nesear: "⤨",
		nesim: "≂̸",
		NestedGreaterGreater: "≫",
		NestedLessLess: "≪",
		NewLine: "\n",
		nexist: "∄",
		nexists: "∄",
		Nfr: "𝔑",
		nfr: "𝔫",
		ngE: "≧̸",
		nge: "≱",
		ngeq: "≱",
		ngeqq: "≧̸",
		ngeqslant: "⩾̸",
		nges: "⩾̸",
		nGg: "⋙̸",
		ngsim: "≵",
		nGt: "≫⃒",
		ngt: "≯",
		ngtr: "≯",
		nGtv: "≫̸",
		nhArr: "⇎",
		nharr: "↮",
		nhpar: "⫲",
		ni: "∋",
		nis: "⋼",
		nisd: "⋺",
		niv: "∋",
		NJcy: "Њ",
		njcy: "њ",
		nlArr: "⇍",
		nlarr: "↚",
		nldr: "‥",
		nlE: "≦̸",
		nle: "≰",
		nLeftarrow: "⇍",
		nleftarrow: "↚",
		nLeftrightarrow: "⇎",
		nleftrightarrow: "↮",
		nleq: "≰",
		nleqq: "≦̸",
		nleqslant: "⩽̸",
		nles: "⩽̸",
		nless: "≮",
		nLl: "⋘̸",
		nlsim: "≴",
		nLt: "≪⃒",
		nlt: "≮",
		nltri: "⋪",
		nltrie: "⋬",
		nLtv: "≪̸",
		nmid: "∤",
		NoBreak: "⁠",
		NonBreakingSpace: "\xA0",
		Nopf: "ℕ",
		nopf: "𝕟",
		Not: "⫬",
		not: "¬",
		NotCongruent: "≢",
		NotCupCap: "≭",
		NotDoubleVerticalBar: "∦",
		NotElement: "∉",
		NotEqual: "≠",
		NotEqualTilde: "≂̸",
		NotExists: "∄",
		NotGreater: "≯",
		NotGreaterEqual: "≱",
		NotGreaterFullEqual: "≧̸",
		NotGreaterGreater: "≫̸",
		NotGreaterLess: "≹",
		NotGreaterSlantEqual: "⩾̸",
		NotGreaterTilde: "≵",
		NotHumpDownHump: "≎̸",
		NotHumpEqual: "≏̸",
		notin: "∉",
		notindot: "⋵̸",
		notinE: "⋹̸",
		notinva: "∉",
		notinvb: "⋷",
		notinvc: "⋶",
		NotLeftTriangle: "⋪",
		NotLeftTriangleBar: "⧏̸",
		NotLeftTriangleEqual: "⋬",
		NotLess: "≮",
		NotLessEqual: "≰",
		NotLessGreater: "≸",
		NotLessLess: "≪̸",
		NotLessSlantEqual: "⩽̸",
		NotLessTilde: "≴",
		NotNestedGreaterGreater: "⪢̸",
		NotNestedLessLess: "⪡̸",
		notni: "∌",
		notniva: "∌",
		notnivb: "⋾",
		notnivc: "⋽",
		NotPrecedes: "⊀",
		NotPrecedesEqual: "⪯̸",
		NotPrecedesSlantEqual: "⋠",
		NotReverseElement: "∌",
		NotRightTriangle: "⋫",
		NotRightTriangleBar: "⧐̸",
		NotRightTriangleEqual: "⋭",
		NotSquareSubset: "⊏̸",
		NotSquareSubsetEqual: "⋢",
		NotSquareSuperset: "⊐̸",
		NotSquareSupersetEqual: "⋣",
		NotSubset: "⊂⃒",
		NotSubsetEqual: "⊈",
		NotSucceeds: "⊁",
		NotSucceedsEqual: "⪰̸",
		NotSucceedsSlantEqual: "⋡",
		NotSucceedsTilde: "≿̸",
		NotSuperset: "⊃⃒",
		NotSupersetEqual: "⊉",
		NotTilde: "≁",
		NotTildeEqual: "≄",
		NotTildeFullEqual: "≇",
		NotTildeTilde: "≉",
		NotVerticalBar: "∤",
		npar: "∦",
		nparallel: "∦",
		nparsl: "⫽⃥",
		npart: "∂̸",
		npolint: "⨔",
		npr: "⊀",
		nprcue: "⋠",
		npre: "⪯̸",
		nprec: "⊀",
		npreceq: "⪯̸",
		nrArr: "⇏",
		nrarr: "↛",
		nrarrc: "⤳̸",
		nrarrw: "↝̸",
		nRightarrow: "⇏",
		nrightarrow: "↛",
		nrtri: "⋫",
		nrtrie: "⋭",
		nsc: "⊁",
		nsccue: "⋡",
		nsce: "⪰̸",
		Nscr: "𝒩",
		nscr: "𝓃",
		nshortmid: "∤",
		nshortparallel: "∦",
		nsim: "≁",
		nsime: "≄",
		nsimeq: "≄",
		nsmid: "∤",
		nspar: "∦",
		nsqsube: "⋢",
		nsqsupe: "⋣",
		nsub: "⊄",
		nsubE: "⫅̸",
		nsube: "⊈",
		nsubset: "⊂⃒",
		nsubseteq: "⊈",
		nsubseteqq: "⫅̸",
		nsucc: "⊁",
		nsucceq: "⪰̸",
		nsup: "⊅",
		nsupE: "⫆̸",
		nsupe: "⊉",
		nsupset: "⊃⃒",
		nsupseteq: "⊉",
		nsupseteqq: "⫆̸",
		ntgl: "≹",
		Ntilde: "Ñ",
		ntilde: "ñ",
		ntlg: "≸",
		ntriangleleft: "⋪",
		ntrianglelefteq: "⋬",
		ntriangleright: "⋫",
		ntrianglerighteq: "⋭",
		Nu: "Ν",
		nu: "ν",
		num: "#",
		numero: "№",
		numsp: " ",
		nvap: "≍⃒",
		nVDash: "⊯",
		nVdash: "⊮",
		nvDash: "⊭",
		nvdash: "⊬",
		nvge: "≥⃒",
		nvgt: ">⃒",
		nvHarr: "⤄",
		nvinfin: "⧞",
		nvlArr: "⤂",
		nvle: "≤⃒",
		nvlt: "<⃒",
		nvltrie: "⊴⃒",
		nvrArr: "⤃",
		nvrtrie: "⊵⃒",
		nvsim: "∼⃒",
		nwarhk: "⤣",
		nwArr: "⇖",
		nwarr: "↖",
		nwarrow: "↖",
		nwnear: "⤧",
		Oacute: "Ó",
		oacute: "ó",
		oast: "⊛",
		ocir: "⊚",
		Ocirc: "Ô",
		ocirc: "ô",
		Ocy: "О",
		ocy: "о",
		odash: "⊝",
		Odblac: "Ő",
		odblac: "ő",
		odiv: "⨸",
		odot: "⊙",
		odsold: "⦼",
		OElig: "Œ",
		oelig: "œ",
		ofcir: "⦿",
		Ofr: "𝔒",
		ofr: "𝔬",
		ogon: "˛",
		Ograve: "Ò",
		ograve: "ò",
		ogt: "⧁",
		ohbar: "⦵",
		ohm: "Ω",
		oint: "∮",
		olarr: "↺",
		olcir: "⦾",
		olcross: "⦻",
		oline: "‾",
		olt: "⧀",
		Omacr: "Ō",
		omacr: "ō",
		Omega: "Ω",
		omega: "ω",
		Omicron: "Ο",
		omicron: "ο",
		omid: "⦶",
		ominus: "⊖",
		Oopf: "𝕆",
		oopf: "𝕠",
		opar: "⦷",
		OpenCurlyDoubleQuote: "“",
		OpenCurlyQuote: "‘",
		operp: "⦹",
		oplus: "⊕",
		Or: "⩔",
		or: "∨",
		orarr: "↻",
		ord: "⩝",
		order: "ℴ",
		orderof: "ℴ",
		ordf: "ª",
		ordm: "º",
		origof: "⊶",
		oror: "⩖",
		orslope: "⩗",
		orv: "⩛",
		oS: "Ⓢ",
		Oscr: "𝒪",
		oscr: "ℴ",
		Oslash: "Ø",
		oslash: "ø",
		osol: "⊘",
		Otilde: "Õ",
		otilde: "õ",
		Otimes: "⨷",
		otimes: "⊗",
		otimesas: "⨶",
		Ouml: "Ö",
		ouml: "ö",
		ovbar: "⌽",
		OverBar: "‾",
		OverBrace: "⏞",
		OverBracket: "⎴",
		OverParenthesis: "⏜",
		par: "∥",
		para: "¶",
		parallel: "∥",
		parsim: "⫳",
		parsl: "⫽",
		part: "∂",
		PartialD: "∂",
		Pcy: "П",
		pcy: "п",
		percnt: "%",
		period: ".",
		permil: "‰",
		perp: "⊥",
		pertenk: "‱",
		Pfr: "𝔓",
		pfr: "𝔭",
		Phi: "Φ",
		phi: "φ",
		phiv: "ϕ",
		phmmat: "ℳ",
		phone: "☎",
		Pi: "Π",
		pi: "π",
		pitchfork: "⋔",
		piv: "ϖ",
		planck: "ℏ",
		planckh: "ℎ",
		plankv: "ℏ",
		plus: "+",
		plusacir: "⨣",
		plusb: "⊞",
		pluscir: "⨢",
		plusdo: "∔",
		plusdu: "⨥",
		pluse: "⩲",
		PlusMinus: "±",
		plusmn: "±",
		plussim: "⨦",
		plustwo: "⨧",
		pm: "±",
		Poincareplane: "ℌ",
		pointint: "⨕",
		Popf: "ℙ",
		popf: "𝕡",
		pound: "£",
		Pr: "⪻",
		pr: "≺",
		prap: "⪷",
		prcue: "≼",
		prE: "⪳",
		pre: "⪯",
		prec: "≺",
		precapprox: "⪷",
		preccurlyeq: "≼",
		Precedes: "≺",
		PrecedesEqual: "⪯",
		PrecedesSlantEqual: "≼",
		PrecedesTilde: "≾",
		preceq: "⪯",
		precnapprox: "⪹",
		precneqq: "⪵",
		precnsim: "⋨",
		precsim: "≾",
		Prime: "″",
		prime: "′",
		primes: "ℙ",
		prnap: "⪹",
		prnE: "⪵",
		prnsim: "⋨",
		prod: "∏",
		Product: "∏",
		profalar: "⌮",
		profline: "⌒",
		profsurf: "⌓",
		prop: "∝",
		Proportion: "∷",
		Proportional: "∝",
		propto: "∝",
		prsim: "≾",
		prurel: "⊰",
		Pscr: "𝒫",
		pscr: "𝓅",
		Psi: "Ψ",
		psi: "ψ",
		puncsp: " ",
		Qfr: "𝔔",
		qfr: "𝔮",
		qint: "⨌",
		Qopf: "ℚ",
		qopf: "𝕢",
		qprime: "⁗",
		Qscr: "𝒬",
		qscr: "𝓆",
		quaternions: "ℍ",
		quatint: "⨖",
		quest: "?",
		questeq: "≟",
		QUOT: "\"",
		quot: "\"",
		rAarr: "⇛",
		race: "∽̱",
		Racute: "Ŕ",
		racute: "ŕ",
		radic: "√",
		raemptyv: "⦳",
		Rang: "⟫",
		rang: "⟩",
		rangd: "⦒",
		range: "⦥",
		rangle: "⟩",
		raquo: "»",
		Rarr: "↠",
		rArr: "⇒",
		rarr: "→",
		rarrap: "⥵",
		rarrb: "⇥",
		rarrbfs: "⤠",
		rarrc: "⤳",
		rarrfs: "⤞",
		rarrhk: "↪",
		rarrlp: "↬",
		rarrpl: "⥅",
		rarrsim: "⥴",
		Rarrtl: "⤖",
		rarrtl: "↣",
		rarrw: "↝",
		rAtail: "⤜",
		ratail: "⤚",
		ratio: "∶",
		rationals: "ℚ",
		RBarr: "⤐",
		rBarr: "⤏",
		rbarr: "⤍",
		rbbrk: "❳",
		rbrace: "}",
		rbrack: "]",
		rbrke: "⦌",
		rbrksld: "⦎",
		rbrkslu: "⦐",
		Rcaron: "Ř",
		rcaron: "ř",
		Rcedil: "Ŗ",
		rcedil: "ŗ",
		rceil: "⌉",
		rcub: "}",
		Rcy: "Р",
		rcy: "р",
		rdca: "⤷",
		rdldhar: "⥩",
		rdquo: "”",
		rdquor: "”",
		rdsh: "↳",
		Re: "ℜ",
		real: "ℜ",
		realine: "ℛ",
		realpart: "ℜ",
		reals: "ℝ",
		rect: "▭",
		REG: "®",
		reg: "®",
		ReverseElement: "∋",
		ReverseEquilibrium: "⇋",
		ReverseUpEquilibrium: "⥯",
		rfisht: "⥽",
		rfloor: "⌋",
		Rfr: "ℜ",
		rfr: "𝔯",
		rHar: "⥤",
		rhard: "⇁",
		rharu: "⇀",
		rharul: "⥬",
		Rho: "Ρ",
		rho: "ρ",
		rhov: "ϱ",
		RightAngleBracket: "⟩",
		RightArrow: "→",
		Rightarrow: "⇒",
		rightarrow: "→",
		RightArrowBar: "⇥",
		RightArrowLeftArrow: "⇄",
		rightarrowtail: "↣",
		RightCeiling: "⌉",
		RightDoubleBracket: "⟧",
		RightDownTeeVector: "⥝",
		RightDownVector: "⇂",
		RightDownVectorBar: "⥕",
		RightFloor: "⌋",
		rightharpoondown: "⇁",
		rightharpoonup: "⇀",
		rightleftarrows: "⇄",
		rightleftharpoons: "⇌",
		rightrightarrows: "⇉",
		rightsquigarrow: "↝",
		RightTee: "⊢",
		RightTeeArrow: "↦",
		RightTeeVector: "⥛",
		rightthreetimes: "⋌",
		RightTriangle: "⊳",
		RightTriangleBar: "⧐",
		RightTriangleEqual: "⊵",
		RightUpDownVector: "⥏",
		RightUpTeeVector: "⥜",
		RightUpVector: "↾",
		RightUpVectorBar: "⥔",
		RightVector: "⇀",
		RightVectorBar: "⥓",
		ring: "˚",
		risingdotseq: "≓",
		rlarr: "⇄",
		rlhar: "⇌",
		rlm: "‏",
		rmoust: "⎱",
		rmoustache: "⎱",
		rnmid: "⫮",
		roang: "⟭",
		roarr: "⇾",
		robrk: "⟧",
		ropar: "⦆",
		Ropf: "ℝ",
		ropf: "𝕣",
		roplus: "⨮",
		rotimes: "⨵",
		RoundImplies: "⥰",
		rpar: ")",
		rpargt: "⦔",
		rppolint: "⨒",
		rrarr: "⇉",
		Rrightarrow: "⇛",
		rsaquo: "›",
		Rscr: "ℛ",
		rscr: "𝓇",
		Rsh: "↱",
		rsh: "↱",
		rsqb: "]",
		rsquo: "’",
		rsquor: "’",
		rthree: "⋌",
		rtimes: "⋊",
		rtri: "▹",
		rtrie: "⊵",
		rtrif: "▸",
		rtriltri: "⧎",
		RuleDelayed: "⧴",
		ruluhar: "⥨",
		rx: "℞",
		Sacute: "Ś",
		sacute: "ś",
		sbquo: "‚",
		Sc: "⪼",
		sc: "≻",
		scap: "⪸",
		Scaron: "Š",
		scaron: "š",
		sccue: "≽",
		scE: "⪴",
		sce: "⪰",
		Scedil: "Ş",
		scedil: "ş",
		Scirc: "Ŝ",
		scirc: "ŝ",
		scnap: "⪺",
		scnE: "⪶",
		scnsim: "⋩",
		scpolint: "⨓",
		scsim: "≿",
		Scy: "С",
		scy: "с",
		sdot: "⋅",
		sdotb: "⊡",
		sdote: "⩦",
		searhk: "⤥",
		seArr: "⇘",
		searr: "↘",
		searrow: "↘",
		sect: "§",
		semi: ";",
		seswar: "⤩",
		setminus: "∖",
		setmn: "∖",
		sext: "✶",
		Sfr: "𝔖",
		sfr: "𝔰",
		sfrown: "⌢",
		sharp: "♯",
		SHCHcy: "Щ",
		shchcy: "щ",
		SHcy: "Ш",
		shcy: "ш",
		ShortDownArrow: "↓",
		ShortLeftArrow: "←",
		shortmid: "∣",
		shortparallel: "∥",
		ShortRightArrow: "→",
		ShortUpArrow: "↑",
		shy: "­",
		Sigma: "Σ",
		sigma: "σ",
		sigmaf: "ς",
		sigmav: "ς",
		sim: "∼",
		simdot: "⩪",
		sime: "≃",
		simeq: "≃",
		simg: "⪞",
		simgE: "⪠",
		siml: "⪝",
		simlE: "⪟",
		simne: "≆",
		simplus: "⨤",
		simrarr: "⥲",
		slarr: "←",
		SmallCircle: "∘",
		smallsetminus: "∖",
		smashp: "⨳",
		smeparsl: "⧤",
		smid: "∣",
		smile: "⌣",
		smt: "⪪",
		smte: "⪬",
		smtes: "⪬︀",
		SOFTcy: "Ь",
		softcy: "ь",
		sol: "/",
		solb: "⧄",
		solbar: "⌿",
		Sopf: "𝕊",
		sopf: "𝕤",
		spades: "♠",
		spadesuit: "♠",
		spar: "∥",
		sqcap: "⊓",
		sqcaps: "⊓︀",
		sqcup: "⊔",
		sqcups: "⊔︀",
		Sqrt: "√",
		sqsub: "⊏",
		sqsube: "⊑",
		sqsubset: "⊏",
		sqsubseteq: "⊑",
		sqsup: "⊐",
		sqsupe: "⊒",
		sqsupset: "⊐",
		sqsupseteq: "⊒",
		squ: "□",
		Square: "□",
		square: "□",
		SquareIntersection: "⊓",
		SquareSubset: "⊏",
		SquareSubsetEqual: "⊑",
		SquareSuperset: "⊐",
		SquareSupersetEqual: "⊒",
		SquareUnion: "⊔",
		squarf: "▪",
		squf: "▪",
		srarr: "→",
		Sscr: "𝒮",
		sscr: "𝓈",
		ssetmn: "∖",
		ssmile: "⌣",
		sstarf: "⋆",
		Star: "⋆",
		star: "☆",
		starf: "★",
		straightepsilon: "ϵ",
		straightphi: "ϕ",
		strns: "¯",
		Sub: "⋐",
		sub: "⊂",
		subdot: "⪽",
		subE: "⫅",
		sube: "⊆",
		subedot: "⫃",
		submult: "⫁",
		subnE: "⫋",
		subne: "⊊",
		subplus: "⪿",
		subrarr: "⥹",
		Subset: "⋐",
		subset: "⊂",
		subseteq: "⊆",
		subseteqq: "⫅",
		SubsetEqual: "⊆",
		subsetneq: "⊊",
		subsetneqq: "⫋",
		subsim: "⫇",
		subsub: "⫕",
		subsup: "⫓",
		succ: "≻",
		succapprox: "⪸",
		succcurlyeq: "≽",
		Succeeds: "≻",
		SucceedsEqual: "⪰",
		SucceedsSlantEqual: "≽",
		SucceedsTilde: "≿",
		succeq: "⪰",
		succnapprox: "⪺",
		succneqq: "⪶",
		succnsim: "⋩",
		succsim: "≿",
		SuchThat: "∋",
		Sum: "∑",
		sum: "∑",
		sung: "♪",
		Sup: "⋑",
		sup: "⊃",
		sup1: "¹",
		sup2: "²",
		sup3: "³",
		supdot: "⪾",
		supdsub: "⫘",
		supE: "⫆",
		supe: "⊇",
		supedot: "⫄",
		Superset: "⊃",
		SupersetEqual: "⊇",
		suphsol: "⟉",
		suphsub: "⫗",
		suplarr: "⥻",
		supmult: "⫂",
		supnE: "⫌",
		supne: "⊋",
		supplus: "⫀",
		Supset: "⋑",
		supset: "⊃",
		supseteq: "⊇",
		supseteqq: "⫆",
		supsetneq: "⊋",
		supsetneqq: "⫌",
		supsim: "⫈",
		supsub: "⫔",
		supsup: "⫖",
		swarhk: "⤦",
		swArr: "⇙",
		swarr: "↙",
		swarrow: "↙",
		swnwar: "⤪",
		szlig: "ß",
		Tab: "	",
		target: "⌖",
		Tau: "Τ",
		tau: "τ",
		tbrk: "⎴",
		Tcaron: "Ť",
		tcaron: "ť",
		Tcedil: "Ţ",
		tcedil: "ţ",
		Tcy: "Т",
		tcy: "т",
		tdot: "⃛",
		telrec: "⌕",
		Tfr: "𝔗",
		tfr: "𝔱",
		there4: "∴",
		Therefore: "∴",
		therefore: "∴",
		Theta: "Θ",
		theta: "θ",
		thetasym: "ϑ",
		thetav: "ϑ",
		thickapprox: "≈",
		thicksim: "∼",
		ThickSpace: "  ",
		thinsp: " ",
		ThinSpace: " ",
		thkap: "≈",
		thksim: "∼",
		THORN: "Þ",
		thorn: "þ",
		Tilde: "∼",
		tilde: "˜",
		TildeEqual: "≃",
		TildeFullEqual: "≅",
		TildeTilde: "≈",
		times: "×",
		timesb: "⊠",
		timesbar: "⨱",
		timesd: "⨰",
		tint: "∭",
		toea: "⤨",
		top: "⊤",
		topbot: "⌶",
		topcir: "⫱",
		Topf: "𝕋",
		topf: "𝕥",
		topfork: "⫚",
		tosa: "⤩",
		tprime: "‴",
		TRADE: "™",
		trade: "™",
		triangle: "▵",
		triangledown: "▿",
		triangleleft: "◃",
		trianglelefteq: "⊴",
		triangleq: "≜",
		triangleright: "▹",
		trianglerighteq: "⊵",
		tridot: "◬",
		trie: "≜",
		triminus: "⨺",
		TripleDot: "⃛",
		triplus: "⨹",
		trisb: "⧍",
		tritime: "⨻",
		trpezium: "⏢",
		Tscr: "𝒯",
		tscr: "𝓉",
		TScy: "Ц",
		tscy: "ц",
		TSHcy: "Ћ",
		tshcy: "ћ",
		Tstrok: "Ŧ",
		tstrok: "ŧ",
		twixt: "≬",
		twoheadleftarrow: "↞",
		twoheadrightarrow: "↠",
		Uacute: "Ú",
		uacute: "ú",
		Uarr: "↟",
		uArr: "⇑",
		uarr: "↑",
		Uarrocir: "⥉",
		Ubrcy: "Ў",
		ubrcy: "ў",
		Ubreve: "Ŭ",
		ubreve: "ŭ",
		Ucirc: "Û",
		ucirc: "û",
		Ucy: "У",
		ucy: "у",
		udarr: "⇅",
		Udblac: "Ű",
		udblac: "ű",
		udhar: "⥮",
		ufisht: "⥾",
		Ufr: "𝔘",
		ufr: "𝔲",
		Ugrave: "Ù",
		ugrave: "ù",
		uHar: "⥣",
		uharl: "↿",
		uharr: "↾",
		uhblk: "▀",
		ulcorn: "⌜",
		ulcorner: "⌜",
		ulcrop: "⌏",
		ultri: "◸",
		Umacr: "Ū",
		umacr: "ū",
		uml: "¨",
		UnderBar: "_",
		UnderBrace: "⏟",
		UnderBracket: "⎵",
		UnderParenthesis: "⏝",
		Union: "⋃",
		UnionPlus: "⊎",
		Uogon: "Ų",
		uogon: "ų",
		Uopf: "𝕌",
		uopf: "𝕦",
		UpArrow: "↑",
		Uparrow: "⇑",
		uparrow: "↑",
		UpArrowBar: "⤒",
		UpArrowDownArrow: "⇅",
		UpDownArrow: "↕",
		Updownarrow: "⇕",
		updownarrow: "↕",
		UpEquilibrium: "⥮",
		upharpoonleft: "↿",
		upharpoonright: "↾",
		uplus: "⊎",
		UpperLeftArrow: "↖",
		UpperRightArrow: "↗",
		Upsi: "ϒ",
		upsi: "υ",
		upsih: "ϒ",
		Upsilon: "Υ",
		upsilon: "υ",
		UpTee: "⊥",
		UpTeeArrow: "↥",
		upuparrows: "⇈",
		urcorn: "⌝",
		urcorner: "⌝",
		urcrop: "⌎",
		Uring: "Ů",
		uring: "ů",
		urtri: "◹",
		Uscr: "𝒰",
		uscr: "𝓊",
		utdot: "⋰",
		Utilde: "Ũ",
		utilde: "ũ",
		utri: "▵",
		utrif: "▴",
		uuarr: "⇈",
		Uuml: "Ü",
		uuml: "ü",
		uwangle: "⦧",
		vangrt: "⦜",
		varepsilon: "ϵ",
		varkappa: "ϰ",
		varnothing: "∅",
		varphi: "ϕ",
		varpi: "ϖ",
		varpropto: "∝",
		vArr: "⇕",
		varr: "↕",
		varrho: "ϱ",
		varsigma: "ς",
		varsubsetneq: "⊊︀",
		varsubsetneqq: "⫋︀",
		varsupsetneq: "⊋︀",
		varsupsetneqq: "⫌︀",
		vartheta: "ϑ",
		vartriangleleft: "⊲",
		vartriangleright: "⊳",
		Vbar: "⫫",
		vBar: "⫨",
		vBarv: "⫩",
		Vcy: "В",
		vcy: "в",
		VDash: "⊫",
		Vdash: "⊩",
		vDash: "⊨",
		vdash: "⊢",
		Vdashl: "⫦",
		Vee: "⋁",
		vee: "∨",
		veebar: "⊻",
		veeeq: "≚",
		vellip: "⋮",
		Verbar: "‖",
		verbar: "|",
		Vert: "‖",
		vert: "|",
		VerticalBar: "∣",
		VerticalLine: "|",
		VerticalSeparator: "❘",
		VerticalTilde: "≀",
		VeryThinSpace: " ",
		Vfr: "𝔙",
		vfr: "𝔳",
		vltri: "⊲",
		vnsub: "⊂⃒",
		vnsup: "⊃⃒",
		Vopf: "𝕍",
		vopf: "𝕧",
		vprop: "∝",
		vrtri: "⊳",
		Vscr: "𝒱",
		vscr: "𝓋",
		vsubnE: "⫋︀",
		vsubne: "⊊︀",
		vsupnE: "⫌︀",
		vsupne: "⊋︀",
		Vvdash: "⊪",
		vzigzag: "⦚",
		Wcirc: "Ŵ",
		wcirc: "ŵ",
		wedbar: "⩟",
		Wedge: "⋀",
		wedge: "∧",
		wedgeq: "≙",
		weierp: "℘",
		Wfr: "𝔚",
		wfr: "𝔴",
		Wopf: "𝕎",
		wopf: "𝕨",
		wp: "℘",
		wr: "≀",
		wreath: "≀",
		Wscr: "𝒲",
		wscr: "𝓌",
		xcap: "⋂",
		xcirc: "◯",
		xcup: "⋃",
		xdtri: "▽",
		Xfr: "𝔛",
		xfr: "𝔵",
		xhArr: "⟺",
		xharr: "⟷",
		Xi: "Ξ",
		xi: "ξ",
		xlArr: "⟸",
		xlarr: "⟵",
		xmap: "⟼",
		xnis: "⋻",
		xodot: "⨀",
		Xopf: "𝕏",
		xopf: "𝕩",
		xoplus: "⨁",
		xotime: "⨂",
		xrArr: "⟹",
		xrarr: "⟶",
		Xscr: "𝒳",
		xscr: "𝓍",
		xsqcup: "⨆",
		xuplus: "⨄",
		xutri: "△",
		xvee: "⋁",
		xwedge: "⋀",
		Yacute: "Ý",
		yacute: "ý",
		YAcy: "Я",
		yacy: "я",
		Ycirc: "Ŷ",
		ycirc: "ŷ",
		Ycy: "Ы",
		ycy: "ы",
		yen: "¥",
		Yfr: "𝔜",
		yfr: "𝔶",
		YIcy: "Ї",
		yicy: "ї",
		Yopf: "𝕐",
		yopf: "𝕪",
		Yscr: "𝒴",
		yscr: "𝓎",
		YUcy: "Ю",
		yucy: "ю",
		Yuml: "Ÿ",
		yuml: "ÿ",
		Zacute: "Ź",
		zacute: "ź",
		Zcaron: "Ž",
		zcaron: "ž",
		Zcy: "З",
		zcy: "з",
		Zdot: "Ż",
		zdot: "ż",
		zeetrf: "ℨ",
		ZeroWidthSpace: "​",
		Zeta: "Ζ",
		zeta: "ζ",
		Zfr: "ℨ",
		zfr: "𝔷",
		ZHcy: "Ж",
		zhcy: "ж",
		zigrarr: "⇝",
		Zopf: "ℤ",
		zopf: "𝕫",
		Zscr: "𝒵",
		zscr: "𝓏",
		zwj: "‍",
		zwnj: "‌"
	}), e.entityMap = e.HTML_ENTITIES;
})), g_ = /* @__PURE__ */ t(((e) => {
	var t = d_(), n = p_(), r = f_(), i = t.isHTMLEscapableRawTextElement, a = t.isHTMLMimeType, o = t.isHTMLRawTextElement, s = t.hasOwn, c = t.NAMESPACE, l = r.ParseError, u = r.DOMException, d = 0, f = 1, p = 2, m = 3, h = 4, g = 5, _ = 6, v = 7;
	function y() {}
	y.prototype = { parse: function(e, t, n) {
		var r = this.domBuilder;
		r.startDocument(), E(t, t = Object.create(null)), x(e, t, n, r, this.errorHandler), r.endDocument();
	} };
	var b = /&#?\w+;?/g;
	function x(e, r, i, o, c) {
		var d = a(o.mimeType);
		e.indexOf(n.UNICODE_REPLACEMENT_CHARACTER) >= 0 && c.warning("Unicode replacement character detected, source encoding issues?");
		function f(e) {
			if (e > 65535) {
				e -= 65536;
				var t = 55296 + (e >> 10), n = 56320 + (e & 1023);
				return String.fromCharCode(t, n);
			}
			return String.fromCharCode(e);
		}
		function p(e) {
			var t = e[e.length - 1] === ";" ? e : e + ";";
			if (!d && t !== e) return c.error("EntityRef: expecting ;"), e;
			var r = n.Reference.exec(t);
			if (!r || r[0].length !== t.length) return c.error("entity not matching Reference production: " + e), e;
			var a = t.slice(1, -1);
			return s(i, a) ? i[a] : a.charAt(0) === "#" ? f(parseInt(a.substring(1).replace("x", "0x"))) : (c.error("entity not found:" + e), e);
		}
		function m(t) {
			if (t > D) {
				var n = e.substring(D, t).replace(b, p);
				v && y(D), o.characters(n, 0, t - D), D = t;
			}
		}
		var h = 0, g = 0, _ = /\r\n?|\n|$/g, v = o.locator;
		function y(t, n) {
			for (; t >= g && (n = _.exec(e));) h = g, g = n.index + n[0].length, v.lineNumber++;
			v.columnNumber = t - h + 1;
		}
		for (var x = [{ currentNSMap: r }], E = [], D = 0;;) {
			try {
				var O = e.indexOf("<", D);
				if (O < 0) {
					if (!d && E.length > 0) return c.fatalError("unclosed xml tag(s): " + E.join(", "));
					if (!e.substring(D).match(/^\s*$/)) {
						var M = o.doc, ee = M.createTextNode(e.substring(D));
						if (M.documentElement) return c.error("Extra content at the end of the document");
						M.appendChild(ee), o.currentElement = ee;
					}
					return;
				}
				if (O > D) {
					var N = e.substring(D, O);
					!d && E.length === 0 && (N = N.replace(new RegExp(n.S_OPT.source, "g"), ""), N && c.error("Unexpected content outside root element: '" + N + "'")), m(O);
				}
				switch (e.charAt(O + 1)) {
					case "/":
						var P = e.indexOf(">", O + 2), F = e.substring(O + 2, P > 0 ? P : void 0);
						if (!F) return c.fatalError("end tag name missing");
						var I = n.reg("^", n.QName_group, n.S_OPT, "$"), L = P > 0 && I.exec(F);
						if (!L) {
							var R = P > 0 && n.reg("^", n.QName_group).exec(F);
							if (d && R) c.warning("end tag name contains invalid trailing characters: \"" + F + "\""), L = R;
							else if (R && new RegExp(I.source, I.flags + "m").test(F)) c.error("end tag name is followed by a line break and trailing content: \"" + F + "\""), L = R;
							else return c.fatalError("end tag name contains invalid characters: \"" + F + "\"");
						}
						if (!o.currentElement && !o.doc.documentElement) return;
						var te = E[E.length - 1] || o.currentElement.tagName || o.doc.documentElement.tagName || "";
						if (te !== L[1]) {
							var z = L[1].toLowerCase();
							if (!d || te.toLowerCase() !== z) return c.fatalError("Opening and ending tag mismatch: \"" + te + "\" != \"" + F + "\"");
						}
						var B = x.pop();
						E.pop();
						var V = B.localNSMap;
						if (o.endElement(B.uri, B.localName, te), V) for (var H in V) s(V, H) && o.endPrefixMapping(H);
						P++;
						break;
					case "?":
						v && y(O), P = A(e, O, o, c);
						break;
					case "!":
						v && y(O), P = k(e, O, o, c, d);
						break;
					default:
						v && y(O);
						var U = new j(), ne = x[x.length - 1].currentNSMap, P = C(e, O, U, ne, p, c, d), re = U.length;
						if (U.closed || (d && t.isHTMLVoidElement(U.tagName) ? U.closed = !0 : E.push(U.tagName)), v && re) {
							for (var ie = S(v, {}), ae = 0; ae < re; ae++) {
								var oe = U[ae];
								y(oe.offset), oe.locator = S(v, {});
							}
							o.locator = ie, w(U, o, ne) && x.push(U), o.locator = v;
						} else w(U, o, ne) && x.push(U);
						d && !U.closed ? P = T(e, P, U.tagName, p, o) : P++;
				}
			} catch (e) {
				if (e instanceof l) throw e;
				if (e instanceof u) return c.fatalError("Error constructing the DOM: " + e.name + ": " + e.message, e);
				c.error("element parse error: " + e), P = -1;
			}
			P > D ? D = P : m(Math.max(O, D) + 1);
		}
	}
	function S(e, t) {
		return t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber, t;
	}
	function C(e, t, n, r, i, a, o) {
		function c(e, t, r) {
			if (s(n.attributeNames, e)) return a.fatalError("Attribute " + e + " redefined");
			if (!o && t.indexOf("<") >= 0) return a.fatalError("Unescaped '<' not allowed in attributes values");
			n.addValue(e, t.replace(/[\t\n\r]/g, " ").replace(b, i), r);
		}
		for (var l, u, y = ++t, x = d;;) {
			var S = e.charAt(y);
			if (x === d && S === "<") throw Error("unexpected < in tag name: " + e.slice(t, y));
			switch (S) {
				case "=":
					if (x === f) l = e.slice(t, y), x = m;
					else if (x === p) x = m;
					else throw Error("attribute equal must after attrName");
					break;
				case "'":
				case "\"":
					if (x === m || x === f) {
						if (x === f && (a.warning("attribute value must after \"=\""), l = e.slice(t, y)), t = y + 1, y = e.indexOf(S, t), y > 0) u = e.slice(t, y), c(l, u, t - 1), x = g;
						else throw Error("attribute value no end '" + S + "' match");
					} else if (x == h) u = e.slice(t, y), c(l, u, t), a.warning("attribute \"" + l + "\" missed start quot(" + S + ")!!"), t = y + 1, x = g;
					else throw Error("attribute value must after \"=\"");
					break;
				case "/":
					switch (x) {
						case d: n.setTagName(e.slice(t, y));
						case g:
						case _:
						case v: x = v, n.closed = !0;
						case h:
						case f: break;
						case p:
							n.closed = !0;
							break;
						default: throw Error("attribute invalid close char('/')");
					}
					break;
				case "": return a.error("unexpected end of input"), x == d && n.setTagName(e.slice(t, y)), y;
				case ">":
					switch (x) {
						case d: n.setTagName(e.slice(t, y));
						case g:
						case _:
						case v: break;
						case h:
						case f: u = e.slice(t, y), u.slice(-1) === "/" && (n.closed = !0, u = u.slice(0, -1));
						case p:
							x === p && (u = l), x == h ? (a.warning("attribute \"" + u + "\" missed quot(\")!"), c(l, u, t)) : (o || a.warning("attribute \"" + u + "\" missed value!! \"" + u + "\" instead!!"), c(u, u, t));
							break;
						case m: if (!o) return a.fatalError("AttValue: ' or \" expected");
					}
					return y;
				case "": S = " ";
				default: if (S <= " ") switch (x) {
					case d:
						n.setTagName(e.slice(t, y)), x = _;
						break;
					case f:
						l = e.slice(t, y), x = p;
						break;
					case h:
						var u = e.slice(t, y);
						a.warning("attribute \"" + u + "\" missed quot(\")!!"), c(l, u, t);
					case g: x = _;
				}
				else switch (x) {
					case p:
						o || a.warning("attribute \"" + l + "\" missed value!! \"" + l + "\" instead2!!"), c(l, l, t), t = y, x = f;
						break;
					case g: a.warning("attribute space is required\"" + l + "\"!!");
					case _:
						x = f, t = y;
						break;
					case m:
						x = h, t = y;
						break;
					case v: throw Error("elements closed character '/' and '>' must be connected to");
				}
			}
			y++;
		}
	}
	function w(e, t, n) {
		for (var r = e.tagName, i = null, a = e.length; a--;) {
			var o = e[a], l = o.qName, u = o.value, d = l.indexOf(":");
			if (d > 0) var f = o.prefix = l.slice(0, d), p = l.slice(d + 1), m = f === "xmlns" && p;
			else p = l, f = null, m = l === "xmlns" && "";
			o.localName = p, m !== !1 && (i ?? (i = Object.create(null), n = Object.create(n)), n[m] = i[m] = u, o.uri = c.XMLNS, t.startPrefixMapping(m, u));
		}
		for (var a = e.length; a--;) o = e[a], o.prefix && (o.prefix === "xml" && (o.uri = c.XML), o.prefix !== "xmlns" && (o.uri = n[o.prefix]));
		var d = r.indexOf(":");
		d > 0 ? (f = e.prefix = r.slice(0, d), p = e.localName = r.slice(d + 1)) : (f = null, p = e.localName = r);
		var h = e.uri = n[f || ""];
		if (t.startElement(h, p, r, e), e.closed) {
			if (t.endElement(h, p, r), i) for (f in i) s(i, f) && t.endPrefixMapping(f);
		} else return e.currentNSMap = n, e.localNSMap = i, !0;
	}
	function T(e, t, n, r, a) {
		var s = i(n);
		if (s || o(n)) {
			var c = RegExp("</" + n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ">", "ig");
			c.lastIndex = t;
			var l = c.exec(e), u = l ? l.index : -1;
			if (u < 0) return t + 1;
			var d = e.substring(t + 1, u);
			return s && (d = d.replace(b, r)), a.characters(d, 0, d.length), u;
		}
		return t + 1;
	}
	function E(e, t) {
		for (var n in e) s(e, n) && (t[n] = e[n]);
	}
	function D(e, t) {
		var r = t;
		function i(t) {
			return t ||= 0, e.charAt(r + t);
		}
		function a(e) {
			e ||= 1, r += e;
		}
		function o() {
			for (var t = 0; r < e.length;) {
				var n = i();
				if (n !== " " && n !== "\n" && n !== "	" && n !== "\r") return t;
				t++, a();
			}
			return -1;
		}
		function s() {
			return e.substring(r);
		}
		function c(t) {
			return e.substring(r, r + t.length) === t;
		}
		function l(t) {
			return e.substring(r, r + t.length).toUpperCase() === t.toUpperCase();
		}
		function u(e) {
			var t = n.reg("^", e).exec(s());
			return t ? (a(t[0].length), t[0]) : null;
		}
		return {
			char: i,
			getIndex: function() {
				return r;
			},
			getMatch: u,
			getSource: function() {
				return e;
			},
			skip: a,
			skipBlanks: o,
			substringFromIndex: s,
			substringStartsWith: c,
			substringStartsWithCaseInsensitive: l
		};
	}
	function O(e, t) {
		function r(e, t) {
			var r = n.PI.exec(e.substringFromIndex());
			return r ? r[1].toLowerCase() === "xml" ? t.fatalError("xml declaration is only allowed at the start of the document, but found at position " + e.getIndex()) : (e.skip(r[0].length), r[0]) : t.fatalError("processing instruction is not well-formed at position " + e.getIndex());
		}
		var i = e.getSource();
		if (e.char() === "[") {
			e.skip(1);
			for (var a = e.getIndex(); e.getIndex() < i.length;) {
				if (e.skipBlanks(), e.char() === "]") {
					var o = i.substring(a, e.getIndex());
					return e.skip(1), o;
				}
				var s = null;
				if (e.char() === "<" && e.char(1) === "!") switch (e.char(2)) {
					case "E":
						e.char(3) === "L" ? s = e.getMatch(n.elementdecl) : e.char(3) === "N" && (s = e.getMatch(n.EntityDecl));
						break;
					case "A":
						s = e.getMatch(n.AttlistDecl);
						break;
					case "N":
						s = e.getMatch(n.NotationDecl);
						break;
					case "-": s = e.getMatch(n.Comment);
				}
				else if (e.char() === "<" && e.char(1) === "?") s = r(e, t);
				else if (e.char() === "%") s = e.getMatch(n.PEReference);
				else return t.fatalError("Error detected in Markup declaration");
				if (!s) return t.fatalError("Error in internal subset at position " + e.getIndex());
			}
			return t.fatalError("doctype internal subset is not well-formed, missing ]");
		}
	}
	function k(e, t, r, i, a) {
		var o = D(e, t);
		switch (a ? o.char(2).toUpperCase() : o.char(2)) {
			case "-":
				var s = o.getMatch(n.Comment);
				return s ? (r.comment(s, n.COMMENT_START.length, s.length - n.COMMENT_START.length - n.COMMENT_END.length), o.getIndex()) : i.fatalError("comment is not well-formed at position " + o.getIndex());
			case "[":
				var c = o.getMatch(n.CDSect);
				return c ? !a && !r.currentElement ? i.fatalError("CDATA outside of element") : (r.startCDATA(), r.characters(c, n.CDATA_START.length, c.length - n.CDATA_START.length - n.CDATA_END.length), r.endCDATA(), o.getIndex()) : i.fatalError("Invalid CDATA starting at position " + t);
			case "D":
				if (r.doc && r.doc.documentElement) return i.fatalError("Doctype not allowed inside or after documentElement at position " + o.getIndex());
				if (a ? !o.substringStartsWithCaseInsensitive(n.DOCTYPE_DECL_START) : !o.substringStartsWith(n.DOCTYPE_DECL_START)) return i.fatalError("Expected " + n.DOCTYPE_DECL_START + " at position " + o.getIndex());
				if (o.skip(n.DOCTYPE_DECL_START.length), o.skipBlanks() < 1) return i.fatalError("Expected whitespace after " + n.DOCTYPE_DECL_START + " at position " + o.getIndex());
				var l = {
					name: void 0,
					publicId: void 0,
					systemId: void 0,
					internalSubset: void 0
				};
				if (l.name = o.getMatch(n.Name), !l.name) return i.fatalError("doctype name missing or contains unexpected characters at position " + o.getIndex());
				if (a && l.name.toLowerCase() !== "html" && i.warning("Unexpected DOCTYPE in HTML document at position " + o.getIndex()), o.skipBlanks(), o.substringStartsWith(n.PUBLIC) || o.substringStartsWith(n.SYSTEM)) {
					var u = n.ExternalID_match.exec(o.substringFromIndex());
					if (!u) return i.fatalError("doctype external id is not well-formed at position " + o.getIndex());
					u.groups.SystemLiteralOnly === void 0 ? (l.systemId = u.groups.SystemLiteral, l.publicId = u.groups.PubidLiteral) : l.systemId = u.groups.SystemLiteralOnly, o.skip(u[0].length);
				} else if (a && o.substringStartsWithCaseInsensitive(n.SYSTEM)) {
					if (o.skip(n.SYSTEM.length), o.skipBlanks() < 1) return i.fatalError("Expected whitespace after " + n.SYSTEM + " at position " + o.getIndex());
					if (l.systemId = o.getMatch(n.ABOUT_LEGACY_COMPAT_SystemLiteral), !l.systemId) return i.fatalError("Expected " + n.ABOUT_LEGACY_COMPAT + " in single or double quotes after " + n.SYSTEM + " at position " + o.getIndex());
				}
				return a && l.systemId && !n.ABOUT_LEGACY_COMPAT_SystemLiteral.test(l.systemId) && i.warning("Unexpected doctype.systemId in HTML document at position " + o.getIndex()), a || (o.skipBlanks(), l.internalSubset = O(o, i)), o.skipBlanks(), o.char() === ">" ? (o.skip(1), r.startDTD(l.name, l.publicId, l.systemId, l.internalSubset), r.endDTD(), o.getIndex()) : i.fatalError("doctype not terminated with > at position " + o.getIndex());
			default: return i.fatalError("Not well-formed XML starting with \"<!\" at position " + t);
		}
	}
	function A(e, t, r, i) {
		var a = e.substring(t).match(n.PI);
		if (!a) return i.fatalError("Invalid processing instruction starting at position " + t);
		if (a[1].toLowerCase() === "xml") {
			if (t > 0) return i.fatalError("processing instruction at position " + t + " is an xml declaration which is only at the start of the document");
			if (!n.XMLDecl.test(e.substring(t))) return i.fatalError("xml declaration is not well-formed");
		}
		return r.processingInstruction(a[1], a[2]), t + a[0].length;
	}
	function j() {
		this.attributeNames = Object.create(null);
	}
	j.prototype = {
		setTagName: function(e) {
			if (!n.QName_exact.test(e)) throw Error("invalid tagName:" + e);
			this.tagName = e;
		},
		addValue: function(e, t, r) {
			if (!n.QName_exact.test(e)) throw Error("invalid attribute:" + e);
			this.attributeNames[e] = this.length, this[this.length++] = {
				qName: e,
				value: t,
				offset: r
			};
		},
		length: 0,
		getLocalName: function(e) {
			return this[e].localName;
		},
		getLocator: function(e) {
			return this[e].locator;
		},
		getQName: function(e) {
			return this[e].qName;
		},
		getURI: function(e) {
			return this[e].uri;
		},
		getValue: function(e) {
			return this[e].value;
		}
	}, e.XMLReader = y, e.parseUtils = D, e.parseDoctypeCommentOrCData = k;
})), __ = /* @__PURE__ */ t(((e) => {
	var t = d_(), n = m_(), r = f_(), i = h_(), a = g_(), o = n.DOMImplementation, s = t.hasDefaultHTMLNamespace, c = t.isHTMLMimeType, l = t.isValidMimeType, u = t.MIME_TYPE, d = t.NAMESPACE, f = r.ParseError, p = a.XMLReader;
	function m(e) {
		return e.replace(/\r[\n\u0085]/g, "\n").replace(/[\r\u0085\u2028\u2029]/g, "\n");
	}
	function h(e) {
		if (e ||= {}, e.locator === void 0 && (e.locator = !0), this.assign = e.assign || t.assign, this.domHandler = e.domHandler || g, this.onError = e.onError || e.errorHandler, e.errorHandler && typeof e.errorHandler != "function") throw TypeError("errorHandler object is no longer supported, switch to onError!");
		e.errorHandler && e.errorHandler("warning", "The `errorHandler` option has been deprecated, use `onError` instead!", this), this.normalizeLineEndings = e.normalizeLineEndings || m, this.locator = !!e.locator, this.xmlns = this.assign(Object.create(null), e.xmlns);
	}
	h.prototype.parseFromString = function(e, n) {
		if (!l(n)) throw TypeError("DOMParser.parseFromString: the provided mimeType \"" + n + "\" is not valid.");
		var r = this.assign(Object.create(null), this.xmlns), a = i.XML_ENTITIES, o = r[""] || null;
		s(n) ? (a = i.HTML_ENTITIES, o = d.HTML) : n === u.XML_SVG_IMAGE && (o = d.SVG), r[""] = o, r.xml = r.xml || d.XML;
		var c = new this.domHandler({
			mimeType: n,
			defaultNamespace: o,
			onError: this.onError
		}), f = this.locator ? {} : void 0;
		this.locator && c.setDocumentLocator(f);
		var m = new p();
		return m.errorHandler = c, m.domBuilder = c, !t.isHTMLMimeType(n) && typeof e != "string" && m.errorHandler.fatalError("source is not a string"), m.parse(this.normalizeLineEndings(String(e)), r, a), c.doc.documentElement || m.errorHandler.fatalError("missing root element"), c.doc;
	};
	function g(e) {
		var t = e || {};
		this.mimeType = t.mimeType || u.XML_APPLICATION, this.defaultNamespace = t.defaultNamespace || null, this.cdata = !1, this.currentElement = void 0, this.doc = void 0, this.locator = void 0, this.onError = t.onError;
	}
	function _(e, t) {
		t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber;
	}
	g.prototype = {
		startDocument: function() {
			var e = new o();
			this.doc = c(this.mimeType) ? e.createHTMLDocument(!1) : e.createDocument(this.defaultNamespace, "");
		},
		startElement: function(e, t, n, r) {
			var i = this.doc, a = i.createElementNS(e, n || t), o = r.length;
			b(this, a), this.currentElement = a, this.locator && _(this.locator, a);
			for (var s = 0; s < o; s++) {
				var e = r.getURI(s), c = r.getValue(s), n = r.getQName(s), l = i.createAttributeNS(e, n);
				this.locator && _(r.getLocator(s), l), l.value = l.nodeValue = c, a.setAttributeNode(l);
			}
		},
		endElement: function(e, t, n) {
			this.currentElement = this.currentElement.parentNode;
		},
		startPrefixMapping: function(e, t) {},
		endPrefixMapping: function(e) {},
		processingInstruction: function(e, t) {
			var n = this.doc.createProcessingInstruction(e, t);
			this.locator && _(this.locator, n), b(this, n);
		},
		ignorableWhitespace: function(e, t, n) {},
		characters: function(e, t, n) {
			if (e = y.apply(this, arguments), e) {
				if (this.cdata) var r = this.doc.createCDATASection(e);
				else var r = this.doc.createTextNode(e);
				this.currentElement ? this.currentElement.appendChild(r) : /^\s*$/.test(e) && this.doc.appendChild(r), this.locator && _(this.locator, r);
			}
		},
		skippedEntity: function(e) {},
		endDocument: function() {
			this.doc.normalize();
		},
		setDocumentLocator: function(e) {
			e && (e.lineNumber = 0), this.locator = e;
		},
		comment: function(e, t, n) {
			e = y.apply(this, arguments);
			var r = this.doc.createComment(e);
			this.locator && _(this.locator, r), b(this, r);
		},
		startCDATA: function() {
			this.cdata = !0;
		},
		endCDATA: function() {
			this.cdata = !1;
		},
		startDTD: function(e, t, n, r) {
			var i = this.doc.implementation;
			if (i && i.createDocumentType) {
				var a = i.createDocumentType(e, t, n, r);
				this.locator && _(this.locator, a), b(this, a), this.doc.doctype = a;
			}
		},
		reportError: function(e, t) {
			if (typeof this.onError == "function") try {
				this.onError(e, t, this);
			} catch (n) {
				throw new f("Reporting " + e + " \"" + t + "\" caused " + n, this.locator);
			}
			else console.error("[xmldom " + e + "]	" + t, v(this.locator));
		},
		warning: function(e) {
			this.reportError("warning", e);
		},
		error: function(e) {
			this.reportError("error", e);
		},
		fatalError: function(e, t) {
			throw this.reportError("fatalError", e), new f(e, this.locator, t);
		}
	};
	function v(e) {
		if (e) return "\n@#[line:" + e.lineNumber + ",col:" + e.columnNumber + "]";
	}
	function y(e, t, n) {
		return typeof e == "string" ? e.substr(t, n) : e.length >= t + n || t ? new java.lang.String(e, t, n) + "" : e;
	}
	"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(e) {
		g.prototype[e] = function() {
			return null;
		};
	});
	function b(e, t) {
		e.currentElement ? e.currentElement.appendChild(t) : e.doc.appendChild(t);
	}
	function x(e) {
		if (e === "error") throw "onErrorStopParsing";
	}
	function S() {
		throw "onWarningStopParsing";
	}
	e.__DOMHandler = g, e.DOMParser = h, e.normalizeLineEndings = m, e.onErrorStopParsing = x, e.onWarningStopParsing = S;
})), v_ = (/* @__PURE__ */ t(((e) => {
	var t = d_();
	e.assign = t.assign, e.hasDefaultHTMLNamespace = t.hasDefaultHTMLNamespace, e.isHTMLMimeType = t.isHTMLMimeType, e.isValidMimeType = t.isValidMimeType, e.MIME_TYPE = t.MIME_TYPE, e.NAMESPACE = t.NAMESPACE;
	var n = f_();
	e.DOMException = n.DOMException, e.DOMExceptionName = n.DOMExceptionName, e.ExceptionCode = n.ExceptionCode, e.ParseError = n.ParseError;
	var r = m_();
	e.Attr = r.Attr, e.CDATASection = r.CDATASection, e.CharacterData = r.CharacterData, e.Comment = r.Comment, e.Document = r.Document, e.DocumentFragment = r.DocumentFragment, e.DocumentType = r.DocumentType, e.DOMImplementation = r.DOMImplementation, e.Element = r.Element, e.Entity = r.Entity, e.EntityReference = r.EntityReference, e.LiveNodeList = r.LiveNodeList, e.NamedNodeMap = r.NamedNodeMap, e.Node = r.Node, e.NodeList = r.NodeList, e.Notation = r.Notation, e.ProcessingInstruction = r.ProcessingInstruction, e.Text = r.Text, e.XMLSerializer = r.XMLSerializer;
	var i = __();
	e.DOMParser = i.DOMParser, e.normalizeLineEndings = i.normalizeLineEndings, e.onErrorStopParsing = i.onErrorStopParsing, e.onWarningStopParsing = i.onWarningStopParsing;
})))(), y_ = "http://schemas.openxmlformats.org/spreadsheetml/2006/main", b_ = 1e6, x_ = 1e4, S_ = "\"Segoe UI Symbol\", \"Apple Symbols\", \"Noto Sans Symbols 2\", sans-serif", C_ = /* @__PURE__ */ new WeakMap(), w_ = (e) => {
	let t = e.localName || e.nodeName;
	return t.split(":").pop() || t;
}, T_ = (e) => e ? Array.from(e.childNodes).filter((e) => e.nodeType === 1) : [], E_ = (e, t) => T_(e).find((e) => w_(e) === t), D_ = (e) => {
	if (!e) return !1;
	let t = e.getAttribute("val");
	return t === null || ![
		"0",
		"false",
		"off",
		"none"
	].includes(t.toLowerCase());
}, O_ = (e) => {
	if (!e) return;
	let t = e.replace(/^#/, "");
	if (/^[0-9a-f]{6}([0-9a-f]{2})?$/i.test(t)) return `#${t.length === 8 ? t.slice(2) : t}`;
}, k_ = (e) => {
	let t = O_(e?.getAttribute("rgb") || null);
	if (t) return t;
	let n = e?.getAttribute("indexed"), r = n == null || n === "" ? void 0 : Number(n), i = Number.isInteger(r) ? r_[r] : void 0;
	return i ? `#${i.slice(-6)}` : void 0;
}, A_ = (e) => {
	let t = Number(e?.getAttribute("val"));
	return Number.isFinite(t) && t > 0 ? t : void 0;
}, j_ = (e, t) => {
	if (t?.trim().toLowerCase() !== "wingdings 2") return {
		text: e,
		fontFamily: t
	};
	let n = !1;
	return {
		text: Array.from(e, (e) => e === "£" ? (n = !0, "☐") : e).join(""),
		fontFamily: n ? S_ : t
	};
}, M_ = (e) => {
	let t = E_(e, "rPr"), n = E_(e, "t")?.textContent || "";
	if (!n) return;
	let r = j_(n, E_(t, "rFont")?.getAttribute("val") || void 0), i = A_(E_(t, "sz")), a = k_(E_(t, "color")), o = E_(t, "vertAlign")?.getAttribute("val");
	return {
		text: r.text,
		...r.fontFamily ? { fontFamily: r.fontFamily } : {},
		...i ? { fontSize: i } : {},
		...a ? { color: a } : {},
		...D_(E_(t, "b")) ? { bold: !0 } : {},
		...D_(E_(t, "i")) ? { italic: !0 } : {},
		...D_(E_(t, "u")) ? { underline: !0 } : {},
		...D_(E_(t, "strike")) ? { strike: !0 } : {},
		...o === "superscript" ? { verticalAlign: "super" } : {},
		...o === "subscript" ? { verticalAlign: "sub" } : {}
	};
}, N_ = (e) => {
	if (!e) return;
	let t = C_.get(e);
	if (t !== void 0) return t || void 0;
	let n = e.r;
	if (typeof n != "string" || !n.includes("<r") || n.length > b_) C_.set(e, null);
	else try {
		let t = new v_.DOMParser().parseFromString(`<si xmlns="${y_}">${n}</si>`, "application/xml").documentElement;
		if (!t || w_(t) === "parsererror") {
			C_.set(e, null);
			return;
		}
		let r = T_(t).filter((e) => w_(e) === "r");
		if (r.length > x_) {
			C_.set(e, null);
			return;
		}
		let i = r.map(M_).filter((e) => !!e), a = i.length ? i : void 0;
		return C_.set(e, a || null), a;
	} catch {
		C_.set(e, null);
		return;
	}
}, P_ = (e) => e?.map((e) => e.text).join("") || "", F_ = 8.43, I_ = 15, L_ = "#202124", R_ = 9525, z_ = 480, B_ = 288, V_ = 24, H_ = 8, U_ = 1e5, W_ = 8, G_ = 128, K_ = (e, t) => {
	let n = Math.max(e, 1), r = Math.max(t, 1), i = r - 1;
	if (n * r <= U_) return [{
		s: {
			r: 0,
			c: 0
		},
		e: {
			r: n - 1,
			c: i
		}
	}];
	let a = Math.max(1, Math.min(G_, Math.floor(U_ / r / W_))), o = Math.max(n - a, 0), s = Math.max(1, Math.floor(U_ / r / a)), c = Math.min(W_, s, Math.ceil(n / a)), l = /* @__PURE__ */ new Set();
	for (let e = 0; e < c; e += 1) {
		let t = c === 1 ? 0 : Math.round(o * e / (c - 1));
		l.add(t);
	}
	return Array.from(l, (e) => ({
		s: {
			r: e,
			c: 0
		},
		e: {
			r: Math.min(e + a - 1, n - 1),
			c: i
		}
	}));
}, q_ = (e) => typeof e == "number" && Number.isFinite(e) ? e : void 0, J_ = {
	rowHeight: (() => {
		let e = n_.row_height_to_px, t = typeof e == "function" ? e(I_) : void 0;
		return Math.ceil(q_(t) ?? 20);
	})(),
	colWidth: (() => {
		let e = n_.col_width_to_px, t = typeof e == "function" ? e(F_) : void 0;
		return Math.ceil(q_(t) ?? 64);
	})()
}, Y_ = (e, t) => `${e}-${t}`, X_ = (e) => {
	if (!e) return "";
	let t = N_(e);
	return t?.length ? P_(t) : e.w !== void 0 && e.w !== null ? `${e.w}` : e.v === void 0 || e.v === null ? "" : e.t === "d" && e.v instanceof Date ? e.v.toLocaleDateString() : `${e.v}`;
}, Z_ = (e) => {
	if (!e) return;
	if (e.hidden) return 0;
	let t = q_(e.wpx);
	if (t !== void 0 && t >= 0) return Math.ceil(t);
	let n = q_(e.width);
	if (n === 0) return 0;
	if (n !== void 0 && n > 0) {
		let t = n_.col_width_to_px, r = typeof t == "function" ? q_(t(n)) : void 0;
		return Math.ceil(r === void 0 ? n * (e.MDW || 7) : r);
	}
	let r = q_(e.wch);
	if (r === 0) return 0;
	if (r !== void 0 && r > 0) return Math.ceil(r * (e.MDW || 7) + 5);
}, Q_ = (e, t, n) => typeof e == "number" ? e : e?.[t] ?? n, $_ = (e) => (e || 0) / R_, ev = (e) => e ? e.hidden ? !0 : (q_(e.wpx) ?? -1) >= 0 || (q_(e.width) ?? -1) >= 0 || (q_(e.wch) ?? -1) >= 0 : !1, tv = (e) => {
	if (!e) return;
	if (e.hidden) return 0;
	let t = q_(e.hpx);
	if (t !== void 0 && t >= 0) return Math.ceil(t);
	let n = q_(e.hpt);
	if (n !== void 0 && n >= 0) {
		let e = n_.row_height_to_px, t = typeof e == "function" ? q_(e(n)) : void 0;
		return Math.ceil(t ?? n * 96 / 72);
	}
}, nv = (e) => {
	switch (`${e || ""}`) {
		case "left": return "Left";
		case "center":
		case "centerContinuous":
		case "distributed":
		case "justify": return "Center";
		case "right": return "Right";
		default: return;
	}
}, rv = (e) => {
	switch (`${e || ""}`) {
		case "top": return "Top";
		case "center":
		case "middle":
		case "distributed":
		case "justify": return "Middle";
		case "bottom": return "Bottom";
		default: return;
	}
}, iv = (e) => {
	if (!e) return "";
	let t = [nv(e.horizontal), rv(e.vertical)].filter(Boolean).map((e) => `ht${e}`);
	return e.wrapText && t.push("htWrap"), e.shrinkToFit && t.push("htShrink"), t.join(" ");
}, av = (e) => {
	if (!e) return;
	let t = e.raw_rgb && typeof e.tint == "number" ? u_(e.raw_rgb, e.tint) : void 0, n = e.rgb || t || e.raw_rgb;
	if (typeof n == "string" && n) {
		let e = n.startsWith("#") ? n.slice(1) : n;
		return `#${e.length > 6 ? e.slice(-6) : e}`;
	}
	let r = typeof e.indexed == "number" ? e.indexed : e.index;
	if (typeof r == "number") {
		let e = r_[r];
		if (e) return `#${e.slice(-6)}`;
	}
}, ov = (e) => e ? (typeof e.indexed == "number" ? e.indexed : e.index) === 32767 : !1, sv = (e) => ov(e) ? L_ : av(e), cv = (e) => {
	switch (e) {
		case "hair": return "0.5px";
		case "medium":
		case "mediumDashed":
		case "mediumDashDot":
		case "mediumDashDotDot": return "2px";
		case "thick":
		case "double": return "3px";
		default: return "1px";
	}
}, lv = (e) => {
	switch (e) {
		case "dashed":
		case "mediumDashed":
		case "dashDot":
		case "mediumDashDot":
		case "dashDotDot":
		case "mediumDashDotDot":
		case "slantDashDot": return "dashed";
		case "dotted": return "dotted";
		case "double": return "double";
		default: return "solid";
	}
}, uv = (...e) => {
	let t = {};
	return e.forEach((e) => {
		e && Object.entries(e).forEach(([e, n]) => {
			n && typeof n == "object" && !Array.isArray(n) ? t[e] = {
				...t[e] && typeof t[e] == "object" ? t[e] : {},
				...n
			} : t[e] = n;
		});
	}), Object.keys(t).length ? t : void 0;
}, dv = (e, t, n, r) => {
	let i = n_.resolve_table_cell_style;
	return typeof i == "function" ? i(e, t, n, r) : r;
}, fv = (e) => {
	let t = {}, n = e?.fill || {}, r = av(n.fgColor || e?.fgColor || n.bgColor || e?.bgColor), i = n.patternType || e?.patternType;
	r && i !== "none" && (t.backgroundColor = r);
	let a = e?.font || {}, o = sv(a.color || e?.color);
	o && (t.color = o), (a.italic || e?.italic) && (t.fontStyle = "italic"), (a.bold || e?.bold) && (t.fontWeight = "bold");
	let s = a.sz || e?.sz;
	s && (t.fontSize = `${s}px`);
	let c = a.name || e?.name;
	c && (t.fontFamily = c);
	let l = e?.border;
	return l && [
		"top",
		"right",
		"bottom",
		"left"
	].forEach((e) => {
		let n = l[e];
		if (!n?.style || n.style === "none") return;
		let r = `border${e.charAt(0).toUpperCase()}${e.slice(1)}`;
		t[`${r}Width`] = cv(n.style), t[`${r}Style`] = lv(n.style), t[`${r}Color`] = av(n.color) || "#000000";
	}), Object.keys(t).length ? t : void 0;
}, pv = (e, t) => {
	for (let n of e) for (let e = 0; e < t; e += 1) (n[e] === void 0 || n[e] === null) && (n[e] = "");
	return e;
}, mv = class e {
	static create(t, n = {}) {
		return new e(t, n);
	}
	constructor(e, t) {
		this._ws = e, this._startRow = Math.max(t.startRow || 0, 0), this._pageSize = Math.max(t.pageSize || 500, 1), this._totalRows = t.totalRows, this._totalCols = t.totalCols, this._charts = t.charts || [], this._cellImages = t.cellImages || [], this._cellImageKeys = new Set(this._cellImages.map((e) => Y_(e.row, e.col)));
		let { "!ref": n } = e;
		this.range = n_.decode_range(n || "A1");
	}
	get ws() {
		return this._ws;
	}
	get defaults() {
		return e.defaults;
	}
	get data() {
		return this._data ??= this.getData();
	}
	get cell() {
		return this._cell ??= this.getCell();
	}
	get merge() {
		return this._merge ??= this.getMerge();
	}
	get columns() {
		return this._columns ??= this.getColumns();
	}
	get structure() {
		return this._structure ??= this.getStructure();
	}
	get rowHeights() {
		return this._rowHeights ??= this.getRowHeights();
	}
	get colWidths() {
		return this._colWidths ??= this.getColWidths();
	}
	get meta() {
		return this._meta ??= {
			startRow: this.startRow,
			endRow: this.endRow,
			pageSize: this._pageSize,
			totalRows: this.totalRows,
			totalCols: this.totalCols
		};
	}
	get totalRows() {
		return this._totalRows ?? this.range.e.r + 1;
	}
	get totalCols() {
		return this._totalCols ?? this.range.e.c + 1;
	}
	get startRow() {
		return Math.min(this._startRow, Math.max(this.totalRows - 1, 0));
	}
	get endRow() {
		return Math.min(this.startRow + this._pageSize, this.totalRows);
	}
	get denseRows() {
		let e = this.ws;
		return Array.isArray(e) ? e : Array.isArray(e["!data"]) ? e["!data"] : void 0;
	}
	getCellAt(e, t) {
		let n = this.denseRows;
		return n ? n[e]?.[t] : this.ws[n_.encode_cell({
			r: e,
			c: t
		})];
	}
	getAxisOffset(e, t, n) {
		let r = 0;
		for (let i = 0; i < e; i += 1) r += Q_(t, i, n);
		return r;
	}
	getMarkerLeft(e) {
		return e ? this.getAxisOffset(e.col || 0, this.getColWidths(), this.defaults.colWidth) + $_(e.colOff) : 0;
	}
	getMarkerTop(e) {
		return e ? this.getAxisOffset(e.row || 0, this.getAllRowHeights(), this.defaults.rowHeight) + $_(e.rowOff) : 0;
	}
	getImages() {
		let e = this.ws["!drawings"]?.images || [];
		if (!e.length && !this._cellImages.length) return;
		let t = e.flatMap((e, t) => {
			let n = e.anchor;
			if (!e.dataURI || !n) return [];
			let r = n.from, i = r ? this.getMarkerLeft(r) : $_(n.pos?.x), a = r ? this.getMarkerTop(r) : $_(n.pos?.y), o = n.to ? this.getMarkerLeft(n.to) : i + $_(n.ext?.cx), s = n.to ? this.getMarkerTop(n.to) : a + $_(n.ext?.cy);
			return [{
				id: e.id || e.objectId?.toString() || e.target || `image-${t + 1}`,
				src: e.dataURI,
				contentType: e.contentType,
				left: Math.max(0, i),
				top: Math.max(0, a),
				width: Math.max(1, o > i ? o - i : z_),
				height: Math.max(1, s > a ? s - a : B_),
				row: r?.row || 0,
				col: r?.col || 0
			}];
		}), n = this._cellImages.flatMap((e) => {
			let t = Q_(this.getColWidths(), e.col, this.defaults.colWidth), n = Q_(this.getAllRowHeights(), e.row, this.defaults.rowHeight);
			return t <= 0 || n <= 0 ? [] : [{
				...e,
				left: this.getAxisOffset(e.col, this.getColWidths(), this.defaults.colWidth),
				top: this.getAxisOffset(e.row, this.getAllRowHeights(), this.defaults.rowHeight),
				width: t,
				height: n
			}];
		}), r = [...t, ...n];
		return r.length ? r : void 0;
	}
	getCharts() {
		let e = this._charts.map((e) => {
			let t = this.getMarkerLeft(e.from), n = this.getMarkerTop(e.from), r = e.to ? this.getMarkerLeft(e.to) : t + $_(e.ext?.width), i = e.to ? this.getMarkerTop(e.to) : n + $_(e.ext?.height);
			return {
				id: e.id,
				type: e.type,
				title: e.title,
				categoryAxisTitle: e.categoryAxisTitle,
				valueAxisTitle: e.valueAxisTitle,
				categoryAxisFontSize: e.categoryAxisFontSize,
				valueAxisFontSize: e.valueAxisFontSize,
				barDirection: e.barDirection,
				grouping: e.grouping,
				scatterStyle: e.scatterStyle,
				legendPosition: e.legendPosition,
				series: e.series,
				left: Math.max(0, t),
				top: Math.max(0, n),
				width: Math.max(1, r > t ? r - t : z_),
				height: Math.max(1, i > n ? i - n : B_),
				row: e.from.row,
				col: e.from.col
			};
		});
		return e.length ? e : void 0;
	}
	getAllMerge() {
		let { "!merges": e = [] } = this.ws;
		return e.map((e) => {
			let { r: t, c: n } = e.s, { r, c: i } = e.e;
			return {
				row: t,
				col: n,
				rowspan: r - t + 1,
				colspan: i - n + 1
			};
		});
	}
	getData() {
		let e = [], t = this.denseRows;
		for (let n = this.startRow; n < this.endRow; n += 1) {
			let r = t?.[n], i = r ? r.slice(0, this.totalCols).map((e, t) => this._cellImageKeys.has(Y_(n, t)) ? "" : X_(e)) : Array.from({ length: this.totalCols }, (e, t) => this._cellImageKeys.has(Y_(n, t)) ? "" : X_(this.getCellAt(n, t)));
			e.push(i);
		}
		return pv(e, this.totalCols);
	}
	getCell() {
		let e = {}, { "!cols": t = [], "!rows": n = [] } = this.ws;
		for (let r = this.startRow; r < this.endRow; r += 1) for (let i = 0; i < this.totalCols; i += 1) {
			let a = this.getCellAt(r, i), o = uv(t[i]?.s, n[r]?.s, a?.s), s = dv(this.ws, r, i, o), c = iv(s?.alignment), l = fv(s), u = N_(a);
			(c || l || u?.length) && (e[Y_(r - this.startRow, i)] = {
				...c ? { className: c } : {},
				style: l || {},
				...u?.length ? { richText: u } : {}
			});
		}
		return e;
	}
	getMerge() {
		return this.getAllMerge().flatMap((e) => e.row + e.rowspan - 1 < this.startRow || e.row >= this.endRow || e.row < this.startRow ? [] : {
			...e,
			row: e.row - this.startRow
		});
	}
	getRowHeights() {
		let { rowHeight: e } = this.defaults, { "!rows": t = [] } = this.ws, n = [];
		if (t.length && this.endRow > this.startRow) for (let e = this.startRow; e < this.endRow; e += 1) {
			let r = tv(t[e]);
			r !== void 0 && (n[e - this.startRow] = r);
		}
		return n.length === 1 ? n[0] : n.length ? n : e;
	}
	getAllRowHeights() {
		let { "!rows": e = [] } = this.ws, t = [];
		if (e.length) for (let n = 0; n < this.totalRows; n += 1) {
			let r = tv(e[n]);
			r !== void 0 && (t[n] = r);
		}
		return t.length ? t : void 0;
	}
	getAutoFitColumns() {
		let e = n_.auto_fit_columns || n_.autofit_columns;
		if (typeof e == "function") try {
			let t = this.getAutoFitSampleRanges(), n = [];
			for (let r of t) {
				let t = e(this.ws, {
					range: r,
					set: !1,
					skipHidden: !0,
					includeMerged: !1,
					minPx: V_,
					padding: H_
				});
				for (let e = 0; e < this.totalCols; e += 1) {
					let r = t?.[e];
					if (!r) continue;
					let i = Z_(n[e]) ?? -1, a = Z_(r) ?? -1;
					(!n[e] || a > i) && (n[e] = r);
				}
			}
			return n.length ? n : void 0;
		} catch (e) {
			console.warn("[file-viewer] Excel 自动列宽计算失败，已回退到原始列宽。", e);
			return;
		}
	}
	getAutoFitSampleRanges() {
		return K_(this.totalRows, this.totalCols);
	}
	get autoFitColumns() {
		return this._autoFitColumns === void 0 && (this._autoFitColumns = this.getAutoFitColumns() || null), this._autoFitColumns || void 0;
	}
	getColumnMeta(e, t) {
		let n = e[t];
		return ev(n) || this.hasAnchoredObjects ? n : this.autoFitColumns?.[t] || n;
	}
	get hasAnchoredObjects() {
		return !!this.ws["!drawings"]?.images?.length || !!this._charts.length || !!this._cellImages.length;
	}
	getColWidths() {
		let { colWidth: e } = this.defaults, { "!cols": t = [] } = this.ws, n = [];
		for (let e = 0; e < this.totalCols; e += 1) {
			let r = Z_(this.getColumnMeta(t, e));
			r !== void 0 && (n[e] = r);
		}
		return n.length ? n : e;
	}
	getColumns() {
		let { "!cols": e = [] } = this.ws;
		return Array.from({ length: this.totalCols }, (t, n) => {
			let r = this.getColumnMeta(e, n);
			return {
				key: n + 1,
				title: n_.encode_col(n),
				hidden: !!r?.hidden,
				editor: !1,
				className: iv(r?.s?.alignment),
				renderer: "styleRender"
			};
		});
	}
	getStructure() {
		return {
			merge: this.getAllMerge(),
			colWidths: this.getColWidths(),
			rowHeights: this.getAllRowHeights(),
			columns: this.getColumns(),
			images: this.getImages(),
			charts: this.getCharts()
		};
	}
	toObject(e = {}) {
		let { defaults: t, data: n, cell: r, merge: i, rowHeights: a, meta: o } = this;
		return {
			defaults: t,
			data: n,
			cell: r,
			merge: i,
			rowHeights: a,
			...e.includeLayout === !1 ? {} : {
				colWidths: this.colWidths,
				columns: this.columns
			},
			meta: o
		};
	}
};
mv.defaults = J_;
// node_modules/.pnpm/@file-viewer+renderer-spreadsheet@3.3.0/node_modules/@file-viewer/renderer-spreadsheet/dist/spreadsheet/worker/sheetjs/chartParser.js
var hv = /* @__PURE__ */ e(i(), 1), gv = "/chart", _v = "/drawing", vv = "/worksheet", yv = 9525, bv = 1048576, xv = {
	areaChart: "area",
	area3DChart: "area",
	barChart: "bar",
	bar3DChart: "bar",
	doughnutChart: "doughnut",
	lineChart: "line",
	line3DChart: "line",
	pieChart: "pie",
	pie3DChart: "pie",
	radarChart: "radar",
	scatterChart: "scatter"
}, Sv = {
	b: "bottom",
	l: "left",
	r: "right",
	t: "top",
	tr: "top"
}, Cv = {
	accent1: "#4472c4",
	accent2: "#ed7d31",
	accent3: "#a5a5a5",
	accent4: "#ffc000",
	accent5: "#5b9bd5",
	accent6: "#70ad47",
	dk1: "#000000",
	dk2: "#44546a",
	lt1: "#ffffff",
	lt2: "#e7e6e6",
	tx1: "#000000",
	tx2: "#44546a"
}, wv = (e) => {
	let t = e.localName || e.nodeName;
	return t.split(":").pop() || t;
}, Tv = (e) => e ? Array.from(e.childNodes).filter((e) => e.nodeType === 1) : [], Ev = (e, t) => Tv(e).filter((e) => wv(e) === t), Q = (e, t) => Ev(e, t)[0], Dv = (e, t) => {
	let n = [], r = (e) => {
		Tv(e).forEach((e) => {
			wv(e) === t && n.push(e), r(e);
		});
	};
	return e && r(e), n;
}, Ov = (e, t) => Dv(e, t)[0], kv = (e, t = "val") => {
	let n = Number(e?.getAttribute(t));
	return Number.isFinite(n) ? n : 0;
}, Av = (e) => (e?.textContent)?.trim() || "", jv = (e) => e && (e.getAttribute("r:id") || e.getAttributeNS("http://schemas.openxmlformats.org/officeDocument/2006/relationships", "id")) || "", Mv = (e, t) => {
	let n = e.includes("/") ? e.slice(0, e.lastIndexOf("/")) : "", r = (t.startsWith("/") ? t.slice(1) : `${n}/${t}`).split("/"), i = [];
	for (let e of r) e && e !== "." && (e === ".." ? i.pop() : i.push(e));
	return i.join("/");
}, Nv = (e) => {
	let t = e.lastIndexOf("/"), n = t >= 0 ? e.slice(0, t) : "", r = t >= 0 ? e.slice(t + 1) : e;
	return `${n ? `${n}/` : ""}_rels/${r}.rels`;
}, Pv = (e) => new v_.DOMParser().parseFromString(e.replace(/^[\uFEFF\s]+/, ""), "application/xml"), Fv = async (e, t) => {
	let n = e.file(t);
	return n ? Pv(await n.async("text")) : null;
}, Iv = async (e, t) => {
	let n = await Fv(e, Nv(t));
	return n ? Dv(n.documentElement, "Relationship").flatMap((e) => {
		let n = e.getAttribute("Id") || "", r = e.getAttribute("Target") || "", i = e.getAttribute("Type") || "";
		return !n || !r || e.getAttribute("TargetMode") === "External" ? [] : [{
			id: n,
			target: Mv(t, r),
			type: i
		}];
	}) : [];
}, Lv = (e, t) => e.find((e) => e.id === t), Rv = (e) => {
	if (e) return {
		row: Number(Av(Q(e, "row"))) || 0,
		col: Number(Av(Q(e, "col"))) || 0,
		rowOff: Number(Av(Q(e, "rowOff"))) || 0,
		colOff: Number(Av(Q(e, "colOff"))) || 0
	};
}, zv = (e) => {
	let t = 0;
	for (let n of e.toUpperCase()) t = t * 26 + n.charCodeAt(0) - 64;
	return t - 1;
}, Bv = (e) => {
	let t = /^\$?([A-Z]{1,3})\$?(\d+)$/i.exec(e.trim());
	return t ? {
		col: zv(t[1]),
		row: Number(t[2]) - 1
	} : null;
}, Vv = (e, t) => {
	let n = t + 1, r = "";
	for (; n > 0;) {
		let e = (n - 1) % 26;
		r = String.fromCharCode(65 + e) + r, n = Math.floor((n - 1) / 26);
	}
	return `${r}${e + 1}`;
}, Hv = (e, t, n) => e["!data"]?.[t]?.[n] || e[Vv(t, n)], Uv = (e) => {
	let t = e.trim().replace(/^=/, ""), n = t.lastIndexOf("!");
	if (n <= 0) return null;
	let r = t.slice(0, n).trim(), i = t.slice(n + 1).trim();
	if (!r || r.includes("[")) return null;
	let a = r.startsWith("'") && r.endsWith("'") ? r.slice(1, -1).replace(/''/g, "'") : r, o = i.split(":");
	if (o.length > 2) return null;
	let [s, c = s] = o, l = Bv(s), u = Bv(c);
	return !a || !l || !u || l.row < 0 || u.row < 0 || Math.max(l.row, u.row) >= bv || Math.max(l.col, u.col) >= 16384 || (Math.abs(u.row - l.row) + 1) * (Math.abs(u.col - l.col) + 1) > bv ? null : {
		sheetName: a,
		start: {
			row: Math.min(l.row, u.row),
			col: Math.min(l.col, u.col)
		},
		end: {
			row: Math.max(l.row, u.row),
			col: Math.max(l.col, u.col)
		}
	};
}, Wv = (e, t, n) => {
	let r = Uv(e), i = r && t?.Sheets?.[r.sheetName];
	if (!r || !i) return [];
	let a = [];
	for (let e = r.start.row; e <= r.end.row; e += 1) for (let t = r.start.col; t <= r.end.col; t += 1) {
		let r = Hv(i, e, t), o = n && r?.w !== void 0 ? r.w : r?.v;
		a.push(o == null ? "" : `${o}`);
	}
	return a;
}, Gv = (e, t, n = !0) => {
	if (!e) return [];
	let r = Q(e, "strLit") || Q(e, "numLit"), i = Q(e, "strRef") || Q(e, "numRef"), a = Q(Q(e, "multiLvlStrRef"), "multiLvlStrCache"), o = r || Q(i, "strCache") || Q(i, "numCache") || a;
	if (o) {
		let e = (e) => {
			let t = e?.trim() || "";
			if (!/^\+?\d+$/.test(t)) return;
			let n = Number(t);
			return Number.isSafeInteger(n) && n >= 0 && n <= bv ? n : void 0;
		}, t = Ev(a ? Q(o, "lvl") : o, "pt").flatMap((t) => {
			let n = e(t.getAttribute("idx"));
			return n !== void 0 && n < bv ? [{
				index: n,
				value: Q(t, "v")?.textContent || ""
			}] : [];
		}), n = t.reduce((e, t) => Math.max(e, t.index + 1), e(Q(o, "ptCount")?.getAttribute("val")) || 0), s = Array(n).fill("");
		for (let e of t) s[e.index] = e.value;
		if (n || r || !i) return s;
	}
	let s = Av(Ov(e, "f"));
	return s ? Wv(s, t, n) : [];
}, Kv = (e, t) => {
	if (!e) return "";
	let n = Gv(e, t);
	return n.length ? n.join(" ").trim() : Dv(e, "t").map(Av).filter(Boolean).join(" ").trim() || Av(Ov(e, "v"));
}, qv = (e) => {
	let t = Ov(Q(e, "spPr"), "solidFill"), n = Ov(t, "srgbClr")?.getAttribute("val");
	return n && /^[0-9a-f]{6}$/i.test(n) ? `#${n}` : Cv[Ov(t, "schemeClr")?.getAttribute("val") || ""];
}, Jv = (e) => {
	let t = Q(Q(e, "spPr"), "ln"), n = Number(t?.getAttribute("w"));
	return {
		lineWidth: Number.isFinite(n) && n > 0 ? n / yv : void 0,
		lineDash: Q(t, "prstDash")?.getAttribute("val") || void 0,
		lineVisible: t ? !Q(t, "noFill") : void 0
	};
}, Yv = (e) => {
	let t = Q(e, "marker");
	if (!t) return;
	let n = Q(t, "symbol")?.getAttribute("val") || "auto", r = Number(Q(t, "size")?.getAttribute("val"));
	return {
		symbol: n,
		size: Number.isFinite(r) && r > 0 ? r : void 0
	};
}, Xv = (e, t, n = "gap") => {
	let r = xv[wv(e)], i = r === "line" || r === "area" || r === "scatter" || r === "radar";
	return Ev(e, "ser").map((e, r) => {
		let s = Q(e, "tx"), c = Q(e, "cat") || Q(e, "xVal"), l = Q(e, "val") || Q(e, "yVal"), u = Gv(c, t), d = Gv(l, t, !1), f = Math.max(u.length, d.length), p = [], m = Array.from({ length: f }, (e, t) => {
			let r = d[t]?.trim() || "";
			if (!r) return n === "span" && p.push(t), n === "zero" ? 0 : NaN;
			let i = /^[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?$/.test(r) ? Number(r) : NaN;
			return Number.isFinite(i) ? i : NaN;
		}), h = {
			name: Kv(s, t) || `Series ${r + 1}`,
			categories: u.length ? Array.from({ length: f }, (e, t) => u[t] ?? "") : m.map((e, t) => `${t + 1}`),
			values: m,
			...p.length ? { spanBlankIndexes: p } : {},
			color: qv(e),
			...Jv(e),
			marker: Yv(e)
		};
		if (!i || m.length <= 4096) return h;
		let g = o(m, a, p), _ = new Set(p);
		return {
			...h,
			categories: g.map((e) => h.categories[e] ?? `${e + 1}`),
			values: g.map((e) => m[e]),
			...p.length ? { spanBlankIndexes: g.flatMap((e, t) => _.has(e) ? [t] : []) } : {},
			sourcePointCount: m.length,
			sourcePointIndexes: g
		};
	});
}, Zv = (e, t) => {
	let n = (e) => {
		let t = (Ov(Q(e, "txPr"), "defRPr")?.getAttribute("sz"))?.trim() || "", n = /^\d+$/.test(t) ? Number(t) : NaN;
		return Number.isFinite(n) && n >= 100 && n <= 4e5 ? n / 75 : void 0;
	};
	return n(e) ?? n(t);
}, Qv = (e, t) => {
	let n = e.documentElement, r = Ov(n, "chart"), i = Q(r, "plotArea") || Ov(r, "plotArea"), a = Tv(i).map((e) => ({
		element: e,
		type: xv[wv(e)]
	})).find((e) => e.type);
	if (!a) return null;
	let o = Q(r, "legend"), s = Q(o, "legendPos")?.getAttribute("val") || "", c = Q(i, "catAx"), l = Q(i, "valAx"), u = Q(a.element, "barDir")?.getAttribute("val") === "bar" ? "bar" : "column";
	return {
		type: a.type,
		title: Kv(Q(r, "title"), t) || void 0,
		categoryAxisTitle: Kv(Q(c, "title"), t) || void 0,
		valueAxisTitle: Kv(Q(l, "title"), t) || void 0,
		barDirection: u,
		categoryAxisFontSize: Zv(c, n),
		valueAxisFontSize: Zv(l, n),
		grouping: Q(a.element, "grouping")?.getAttribute("val") || void 0,
		scatterStyle: Q(a.element, "scatterStyle")?.getAttribute("val") || void 0,
		legendPosition: o ? Sv[s] || "bottom" : void 0,
		series: Xv(a.element, t, Q(r, "dispBlanksAs")?.getAttribute("val") || "gap")
	};
}, $v = async (e, t, n) => {
	let [r, i] = await Promise.all([Fv(e, t), Iv(e, t)]);
	if (!r) return [];
	let a = Tv(r.documentElement).filter((e) => wv(e).endsWith("Anchor"));
	return (await Promise.all(a.map(async (t, r) => {
		let a = Ov(t, "chart"), o = Lv(i, jv(a));
		if (!o?.type.endsWith(gv)) return null;
		let s = await Fv(e, o.target), c = s ? Qv(s, n) : null;
		if (!c || !c.series.length || c.series.every((e) => !e.values.length)) return null;
		let l = Rv(Q(t, "from")) || {
			row: 0,
			col: 0,
			rowOff: kv(Q(t, "pos"), "y"),
			colOff: kv(Q(t, "pos"), "x")
		}, u = Rv(Q(t, "to")), d = Q(t, "ext"), f = Ov(t, "cNvPr")?.getAttribute("name");
		return {
			...c,
			id: f || o.target || `chart-${r + 1}`,
			from: l,
			to: u,
			ext: d ? {
				width: kv(d, "cx"),
				height: kv(d, "cy")
			} : void 0
		};
	}))).filter((e) => e !== null);
}, ey = async (e, t) => {
	let n = await hv.default.loadAsync(e), r = "xl/workbook.xml", [i, a] = await Promise.all([Fv(n, r), Iv(n, r)]), o = {};
	if (!i) return o;
	for (let e of Dv(i.documentElement, "sheet")) {
		let r = e.getAttribute("name") || "", i = Lv(a, jv(e));
		if (!r || !i?.type.endsWith(vv)) continue;
		let s = await Iv(n, i.target), c = Array.from(new Set(s.filter((e) => e.type.endsWith(_v)).map((e) => e.target))), l = (await Promise.all(c.map((e) => $v(n, e, t)))).flat();
		l.length && (o[r] = l);
	}
	return o;
}, ty = /* @__PURE__ */ new Set(["csv", "tsv"]), ny = /* @__PURE__ */ new Set(["text/csv", "text/tab-separated-values"]), ry = (e) => String(e || "").trim().toLowerCase().replace(/^\./, "").split(/[?#;]/, 1)[0], iy = (e) => {
	let t = String(e || "").trim().toLowerCase().split(/[?#]/, 1)[0], n = Math.max(t.lastIndexOf("/"), t.lastIndexOf("\\")), r = t.lastIndexOf(".");
	return r > n ? t.slice(r + 1) : "";
}, ay = ({ fileType: e, filename: t }) => {
	let n = ry(e);
	return n ? ty.has(n) || ny.has(n) : ty.has(iy(t));
}, oy = (e, t = "auto") => n(e, t), sy = /* @__PURE__ */ new Set([
	"xls",
	"xlt",
	"xla",
	"application/vnd.ms-excel"
]), cy = [
	208,
	207,
	17,
	224,
	161,
	177,
	26,
	225
], ly = 65536, uy = (e, t) => {
	let n = ry(t.fileType) || iy(t.filename);
	if (!sy.has(n) || !e.byteLength) return !1;
	let i = new Uint8Array(e, 0, Math.min(e.byteLength, ly));
	if (cy.every((e, t) => i[t] === e) || i[0] === 80 && i[1] === 75 || i[0] === 9 && [
		0,
		2,
		4,
		8
	].includes(i[1]) || r(i).encoding.startsWith("utf-16") && e.byteLength % 2 != 0) return !1;
	try {
		let n = oy(e.slice(0, i.length), t.textEncoding).text;
		return /^[\s\uFEFF]*(?:%PDF-|%!PS|\{\\rtf)/i.test(n) || /[\u0000-\u0008\u000b\u000e-\u001f\u007f]/.test(n) ? !1 : (n.match(/\uFFFD/g) || []).length <= Math.max(1, n.length * .01);
	} catch {
		return !1;
	}
}, dy = (e, t = {}) => {
	if (!ay(t) && !uy(e, t)) return {
		kind: "binary",
		data: e
	};
	let n = oy(e, t.textEncoding);
	return {
		kind: "text",
		data: n.text,
		encoding: n.encoding
	};
}, fy = "xl/workbook.xml", py = "[Content_Types].xml", my = "/worksheet", hy = "/sheetmetadata", gy = "/rdrichvalue", _y = "/rdrichvaluestructure", vy = "/richvaluerel", yy = "http://www.wps.cn/officeDocument/2017/relationships/cellimage", by = "XLRICHVALUE", xy = "_localImage", Sy = "LocalImageIdentifier", Cy = (e) => (e?.textContent)?.trim() || "", wy = (e, t) => Tv(e).filter((e) => wv(e) === t), Ty = (e, t) => Dv(e, t)[0], Ey = (e, t) => e.find((e) => e.type.toLowerCase().endsWith(t)), Dy = (e) => {
	let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
	return e && (Dv(e.documentElement, "Default").forEach((e) => {
		let n = (e.getAttribute("Extension") || "").toLowerCase(), r = e.getAttribute("ContentType") || "";
		n && r && t.set(n, r);
	}), Dv(e.documentElement, "Override").forEach((e) => {
		let t = (e.getAttribute("PartName") || "").replace(/^\//, ""), r = e.getAttribute("ContentType") || "";
		t && r && n.set(t, r);
	})), {
		defaults: t,
		overrides: n
	};
}, Oy = (e) => {
	switch (e.split(".").pop()?.toLowerCase() || "") {
		case "bmp": return "image/bmp";
		case "gif": return "image/gif";
		case "jpeg":
		case "jpg": return "image/jpeg";
		case "png": return "image/png";
		case "svg": return "image/svg+xml";
		case "webp": return "image/webp";
		default: return "";
	}
}, ky = (e, t) => {
	let n = t.overrides.get(e);
	if (n) return n;
	let r = e.split(".").pop()?.toLowerCase() || "";
	return t.defaults.get(r) || Oy(e);
}, Ay = (e) => e ? wy(e.documentElement, "s").map((e) => ({
	type: e.getAttribute("t") || "",
	keys: wy(e, "k").map((e) => e.getAttribute("n") || "")
})) : [], jy = (e) => e ? wy(e.documentElement, "rv").map((e) => ({
	structureIndex: Number(e.getAttribute("s")),
	values: wy(e, "v").map((e) => Number(Cy(e)))
})) : [], My = (e) => e ? wy(e.documentElement, "rel").map(jv) : [], Ny = (e) => {
	if (!e) return [];
	let t = wy(Ty(e.documentElement, "metadataTypes"), "metadataType").findIndex((e) => e.getAttribute("name") === by) + 1;
	if (t <= 0) return [];
	let n = wy(Dv(e.documentElement, "futureMetadata").find((e) => e.getAttribute("name") === by), "bk").map((e) => {
		let t = Ty(e, "rvb"), n = Number(t?.getAttribute("i"));
		return Number.isInteger(n) && n >= 0 ? n : void 0;
	});
	return wy(Ty(e.documentElement, "valueMetadata"), "bk").map((e) => {
		let r = wy(e, "rc").find((e) => Number(e.getAttribute("t")) === t), i = Number(r?.getAttribute("v"));
		return Number.isInteger(i) && i >= 0 ? n[i] : void 0;
	});
}, Py = (e, t) => {
	let n = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), r = e.match(RegExp(`(?:^|\\s)${n}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, "i"));
	return r?.[1] ?? r?.[2] ?? "";
}, Fy = (e) => {
	let t = [];
	for (let n of e.matchAll(/<(?:[A-Za-z_][\w.-]*:)?c\b[^>]*>/gi)) {
		let e = n[0], r = Py(e, "r"), i = Py(e, "vm"), a = Number(i);
		!r || !i || !Number.isInteger(a) || a < 0 || t.push({
			ref: r,
			metadataIndex: a > 0 ? a - 1 : 0
		});
	}
	return t;
}, Iy = (e) => e.replace(/&quot;/gi, "\"").replace(/&apos;/gi, "'").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&"), Ly = (e) => {
	let t = [];
	for (let n of e.matchAll(/<(?:[A-Za-z_][\w.-]*:)?c\b[^>]*>[\s\S]*?<\/(?:[A-Za-z_][\w.-]*:)?c\s*>/gi)) {
		let e = n[0], r = Py(e.slice(0, e.indexOf(">") + 1), "r"), i = Iy((e.match(/<(?:[A-Za-z_][\w.-]*:)?f\b[^>]*>([\s\S]*?)<\/(?:[A-Za-z_][\w.-]*:)?f\s*>/i)?.[1])?.trim() || "").match(/(?:_xlfn\.)?(?:_xlws\.)?DISPIMG\s*\(\s*["']([^"']+)["']/i)?.[1];
		r && i && t.push({
			ref: r,
			imageId: i
		});
	}
	return t;
}, Ry = (e) => e && (e.getAttribute("r:embed") || e.getAttributeNS("http://schemas.openxmlformats.org/officeDocument/2006/relationships", "embed") || e.getAttribute("embed")) || "", zy = async (e, t, n) => {
	let r = /* @__PURE__ */ new Map();
	if (!t) return r;
	let [i, a] = await Promise.all([Fv(e, t.target), Iv(e, t.target)]);
	return i && await Promise.all(Dv(i.documentElement, "cellImage").map(async (t) => {
		let i = Ty(t, "cNvPr")?.getAttribute("name") || "", o = Ty(t, "blip"), s = Lv(a, Ry(o));
		if (!i || !s) return;
		let c = ky(s.target, n), l = e.file(s.target);
		l && c.startsWith("image/") && r.set(i, {
			id: i,
			src: `data:${c};base64,${await l.async("base64")}`,
			contentType: c
		});
	})), r;
}, By = async (e, t, n, r, i, a) => {
	let o = /* @__PURE__ */ new Map();
	return await Promise.all(n.map(async (n, s) => {
		let c = t[n.structureIndex];
		if (!c || c.type !== xy) return;
		let l = c.keys.findIndex((e) => e.endsWith(Sy)), u = n.values[l];
		if (l < 0 || !Number.isInteger(u) || u < 0) return;
		let d = r[u], f = Lv(i, d);
		if (!f) return;
		let p = ky(f.target, a), m = e.file(f.target);
		if (!m || !p.startsWith("image/")) return;
		let h = await m.async("base64");
		o.set(s, {
			id: f.id,
			src: `data:${p};base64,${h}`,
			contentType: p
		});
	})), o;
}, Vy = async (e) => {
	let t = await hv.default.loadAsync(e), [n, r, i] = await Promise.all([
		Fv(t, fy),
		Iv(t, fy),
		Fv(t, py)
	]), a = {};
	if (!n) return a;
	let o = Ey(r, hy), s = Ey(r, gy), c = Ey(r, _y), l = Ey(r, vy), u = Dy(i), d = [], f = /* @__PURE__ */ new Map();
	if (o && s && c && l) {
		let [e, n, r, i, a] = await Promise.all([
			Fv(t, o.target),
			Fv(t, s.target),
			Fv(t, c.target),
			Fv(t, l.target),
			Iv(t, l.target)
		]);
		d = Ny(e), f = await By(t, Ay(r), jy(n), My(i), a, u);
	}
	let p = await zy(t, r.find((e) => e.type.toLowerCase() === yy.toLowerCase()), u);
	if (!f.size && !p.size) return a;
	for (let e of Dv(n.documentElement, "sheet")) {
		let n = e.getAttribute("name") || "", i = Lv(r, jv(e)), o = i?.type.toLowerCase().endsWith(my) ? t.file(i.target) : null;
		if (!n || !o) continue;
		let s = await o.async("text"), c = /* @__PURE__ */ new Map();
		Fy(s).forEach(({ ref: e, metadataIndex: t }) => {
			let n = d[t], r = n === void 0 ? void 0 : f.get(n);
			r && c.set(e, r);
		}), Ly(s).forEach(({ ref: e, imageId: t }) => {
			let n = p.get(t);
			n && !c.has(e) && c.set(e, n);
		});
		let l = Array.from(c).flatMap(([e, t]) => {
			try {
				let n = n_.decode_cell(e);
				return [{
					...t,
					id: `cell-image-${e}-${t.id}`,
					row: n.r,
					col: n.c
				}];
			} catch {
				return [];
			}
		});
		l.length && (a[n] = l);
	}
	return a;
}, Hy = 2e6, Uy = 128, Wy = /^\$?([A-Z]{1,3})\$?([1-9][0-9]*)$/i, Gy = () => {
	throw Error("Formula value unavailable");
};
function Ky(e) {
	if (e.length > 8192) return Gy();
	let t = [], n = e.replace(/^=/, "");
	for (; n.length;) {
		let e = /^\s+/.exec(n);
		if (e) {
			n = n.slice(e[0].length);
			continue;
		}
		let r = /^(?:"(?:[^"]|"")*"|'(?:[^']|'')*'|(?:\d+(?:\.\d*)?|\.\d+)(?:[Ee][+-]?\d+)?|[\p{L}_$\\][\p{L}\p{N}_.$\\]*|<>|<=|>=|[+\-*/^&=<>%(),!:])/u.exec(n);
		if (!r || t.length >= 4096) return Gy();
		let i = r[0];
		t.push({
			kind: i[0] === "\"" ? "string" : i[0] === "'" ? "quoted" : /^[\d.]/.test(i) ? "number" : /^[\p{L}_$\\]/u.test(i) ? "name" : i,
			text: i
		}), n = n.slice(i.length);
	}
	return t.push({
		kind: "eof",
		text: ""
	}), t;
}
var qy = class {
	constructor(e) {
		this.tokens = e, this.index = 0, this.depth = 0;
	}
	current() {
		return this.tokens[this.index];
	}
	take(e) {
		return this.current().kind === e && (this.index++, !0);
	}
	parse() {
		let e = this.expression();
		return this.current().kind === "eof" ? e : Gy();
	}
	expression(e = 0) {
		if (++this.depth > Uy) return Gy();
		let t = this.primary(), n = {
			"=": 1,
			"<>": 1,
			"<": 1,
			">": 1,
			"<=": 1,
			">=": 1,
			"&": 2,
			"+": 3,
			"-": 3,
			"*": 4,
			"/": 4,
			"^": 5
		};
		for (; (n[this.current().kind] ?? -1) >= e;) {
			let e = this.tokens[this.index++].kind;
			t = {
				kind: "binary",
				op: e,
				left: t,
				right: this.expression(n[e] + 1)
			};
		}
		return this.depth--, t;
	}
	primary() {
		let e = this.tokens[this.index++], t;
		if (e.kind === "+" || e.kind === "-") t = {
			kind: "unary",
			op: e.kind,
			value: this.expression(6)
		};
		else if (e.kind === "number") {
			let n = Number(e.text);
			if (!Number.isFinite(n)) return Gy();
			t = {
				kind: "value",
				value: n
			};
		} else if (e.kind === "string") t = {
			kind: "value",
			value: e.text.slice(1, -1).replace(/""/g, "\"")
		};
		else if (e.kind === "(") {
			if (t = this.expression(), !this.take(")")) return Gy();
		} else if (e.kind === "name" || e.kind === "quoted") {
			if (e.kind === "name" && this.take("(")) {
				let n = [];
				if (!this.take(")")) {
					do
						n.push(this.expression());
					while (this.take(","));
					if (!this.take(")")) return Gy();
				}
				t = {
					kind: "call",
					name: e.text.toUpperCase(),
					args: n
				};
			} else {
				let n = e.text, r;
				if (this.take("!")) r = e.kind === "quoted" ? e.text.slice(1, -1).replace(/''/g, "'") : e.text, n = this.tokens[this.index++].text;
				else if (/^(TRUE|FALSE)$/i.test(n)) return {
					kind: "value",
					value: n.toUpperCase() === "TRUE"
				};
				if (!Wy.test(n)) return Gy();
				let i;
				if (this.take(":") && (i = this.tokens[this.index++].text, !Wy.test(i))) return Gy();
				t = {
					kind: "ref",
					sheet: r,
					address: n,
					end: i
				};
			}
		} else return Gy();
		for (; this.take("%");) t = {
			kind: "unary",
			op: "%",
			value: t
		};
		return t;
	}
}, Jy = (e) => {
	let t = Wy.exec(e);
	if (!t) return Gy();
	let n = 0;
	for (let e of t[1].toUpperCase()) n = n * 26 + e.charCodeAt(0) - 64;
	let r = Number(t[2]);
	return n > 16384 || r > 1048576 ? Gy() : {
		row: r - 1,
		col: n - 1
	};
}, Yy = (e, t) => `${e}:${t}`, Xy = (e) => {
	if (e === null) return 0;
	if (typeof e == "boolean") return +!!e;
	if (typeof e == "string" && !/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[Ee][+-]?\d+)?$/.test(e.trim())) return Gy();
	let t = typeof e == "string" ? Number(e.trim()) : e;
	return Number.isFinite(t) ? t : Gy();
}, Zy = (e) => Array.isArray(e) ? Gy() : e, Qy = (e) => typeof e == "boolean" ? e ? "TRUE" : "FALSE" : String(e ?? ""), $y = (e) => !!e.f && (e.t === "z" || e.v === void 0 || e.v === null);
function eb(e) {
	let t = /* @__PURE__ */ new Map(), n = Array.isArray(e) ? e : e["!data"];
	if (n) for (let e of Object.keys(n)) {
		let r = Number(e);
		if (!(!Number.isInteger(r) || r < 0 || !Array.isArray(n[r]))) for (let e of Object.keys(n[r])) {
			let i = Number(e), a = n[r][i];
			Number.isInteger(i) && i >= 0 && a && $y(a) && t.set(Yy(r, i), a);
		}
	}
	else for (let n of Object.keys(e)) {
		if (!Wy.test(n)) continue;
		let { row: r, col: i } = Jy(n);
		e[n] && $y(e[n]) && t.set(Yy(r, i), e[n]);
	}
	return t;
}
function tb(e) {
	let t = new Map(e.SheetNames.map((t) => [t.toLowerCase(), {
		name: t,
		sheet: e.Sheets[t],
		cells: eb(e.Sheets[t])
	}])), n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), a = 0, o = () => {
		if (++a > Hy) return Gy();
	}, s = (e) => t.get(e.toLowerCase()) ?? Gy(), c = (e, t, a, c) => {
		if (o(), c > Uy) return Gy();
		let { sheet: u } = s(e), d = Array.isArray(u) ? u : u["!data"], f = d ? d[t]?.[a] : u[n_.encode_cell({
			r: t,
			c: a
		})];
		if (!f) return null;
		if (n.has(f)) return n.get(f);
		if (r.has(f) || i.has(f) || f.t === "e") return Gy();
		if (!$y(f)) {
			if (f.v instanceof Date) return Gy();
			let e = f.v ?? null;
			return typeof e == "number" && !Number.isFinite(e) ? Gy() : e;
		}
		i.add(f);
		try {
			let r = new qy(Ky(f.f)).parse(), i = Zy(l(r, e, t, c + 1));
			return typeof i == "number" && !Number.isFinite(i) ? Gy() : (n.set(f, i), i);
		} catch {
			return r.add(f), Gy();
		} finally {
			i.delete(f);
		}
	}, l = (e, t, n, r) => {
		if (o(), r > Uy) return Gy();
		let i = (e) => l(e, t, n, r + 1);
		if (e.kind === "value") return e.value;
		if (e.kind === "ref") {
			let n = Jy(e.address);
			if (!e.end) return c(e.sheet ?? t, n.row, n.col, r + 1);
			let i = Jy(e.end), o = Math.min(n.row, i.row), s = Math.max(n.row, i.row), l = Math.min(n.col, i.col), u = Math.max(n.col, i.col);
			if ((s - o + 1) * (u - l + 1) > Hy - a) return Gy();
			let d = [];
			for (let n = o; n <= s; n++) for (let i = l; i <= u; i++) d.push(c(e.sheet ?? t, n, i, r + 1));
			return d;
		}
		if (e.kind === "unary") {
			let t = Xy(Zy(i(e.value)));
			return e.op === "-" ? -t : e.op === "%" ? t / 100 : t;
		}
		if (e.kind === "binary") {
			let t = Zy(i(e.left)), n = Zy(i(e.right));
			if (e.op === "&") return Qy(t) + Qy(n);
			if ([
				"=",
				"<>",
				"<",
				">",
				"<=",
				">="
			].includes(e.op)) {
				let r = (e, t) => e === null ? typeof t == "string" ? "" : typeof t != "boolean" && 0 : typeof e == "string" ? e.toUpperCase() : e, i = r(t, n), a = r(n, t), o = (e) => typeof e == "number" ? 0 : typeof e == "string" ? 1 : 2, s = typeof i == typeof a ? i === a ? 0 : i < a ? -1 : 1 : o(i) - o(a);
				return e.op === "=" ? s === 0 : e.op === "<>" ? s !== 0 : e.op === "<" ? s < 0 : e.op === ">" ? s > 0 : e.op === "<=" ? s <= 0 : s >= 0;
			}
			let r = Xy(t), a = Xy(n);
			if (e.op === "/" && a === 0 || e.op === "^" && r === 0 && a === 0) return Gy();
			let o = e.op === "+" ? r + a : e.op === "-" ? r - a : e.op === "*" ? r * a : e.op === "/" ? r / a : r ** a;
			return Number.isFinite(o) ? o : Gy();
		}
		if (e.name === "IF" && (e.args.length === 2 || e.args.length === 3)) {
			let t = Zy(i(e.args[0]));
			return typeof t == "string" && !/^(TRUE|FALSE)$/i.test(t) ? Gy() : (typeof t == "string" ? t.toUpperCase() === "TRUE" : t) ? i(e.args[1]) : e.args[2] ? i(e.args[2]) : !1;
		}
		if (e.name === "ROW" && e.args.length <= 1) {
			if (!e.args.length) return n + 1;
			let t = e.args[0];
			return t.kind === "ref" ? (t.sheet && s(t.sheet), Jy(t.address).row + 1) : Gy();
		}
		if (e.name === "ROUND" && e.args.length === 2) {
			let t = Xy(Zy(i(e.args[0]))), n = Math.trunc(Xy(Zy(i(e.args[1]))));
			if (Math.abs(n) > 100) return Gy();
			let r = 10 ** n, a = Math.abs(t) * r, o = Math.floor(a + .5 + 2 ** -52 * a) / r;
			return Number.isFinite(o) ? Math.sign(t) * o : Gy();
		}
		if (e.name === "SUM" && e.args.length > 0) {
			let t = 0;
			for (let n of e.args) {
				let e = i(n);
				if (Array.isArray(e)) for (let n of e) typeof n == "number" && (t += n);
				else n.kind === "ref" ? typeof e == "number" && (t += e) : t += Xy(e);
			}
			return Number.isFinite(t) ? t : Gy();
		}
		return Gy();
	}, u = 0, d = 0;
	for (let { name: e, cells: n } of t.values()) for (let [t, r] of n) {
		if (!$y(r)) continue;
		let [n, i] = t.split(":").map(Number);
		try {
			c(e, n, i, 0);
		} catch {}
	}
	for (let { cells: e } of t.values()) for (let t of e.values()) if ($y(t)) {
		if (n.has(t)) {
			let e = n.get(t) ?? 0;
			t.v = e, t.t = typeof e == "boolean" ? "b" : typeof e == "string" ? "s" : "n", delete t.w;
			try {
				t.w = n_.format_cell(t);
			} catch {}
			u++;
		} else t.w = `=${t.f}`, d++;
	}
	return {
		calculated: u,
		unavailable: d
	};
}
// node_modules/.pnpm/@file-viewer+renderer-spreadsheet@3.3.0/node_modules/@file-viewer/renderer-spreadsheet/dist/spreadsheet/worker/sheetjs/parser.js
var nb = {
	type: "array",
	dense: !0,
	cellDates: !0,
	cellStyles: !0,
	browserPixels: !0,
	drawings: !0
}, rb = (e) => e instanceof Error && typeof e.code == "string" && /^E_MERGE_/.test(e.code), ib = (e) => {
	for (let t of e.SheetNames || []) {
		let n = e.Sheets[t], r = n?.["!merges"], i = n?.["!mergeErrors"];
		if (!n || !r?.length || !i?.length) continue;
		let a;
		try {
			a = n["!ref"] ? n_.decode_range(n["!ref"]) : void 0;
		} catch {
			a = void 0;
		}
		let o = /* @__PURE__ */ new Map();
		for (let e of i) {
			let t = e.index;
			if (!Number.isInteger(t) || typeof t != "number" || typeof e.code != "string") continue;
			let n = o.get(t) || /* @__PURE__ */ new Set();
			n.add(e.code), o.set(t, n);
		}
		n["!merges"] = r.flatMap((e, t) => {
			let n = o.get(t), r = Number(e.s?.r), i = Number(e.s?.c), s = Number(e.e?.r), c = Number(e.e?.c);
			if (!Number.isInteger(r) || !Number.isInteger(i) || !Number.isInteger(s) || !Number.isInteger(c) || r < 0 || i < 0 || s < r || c < i || n?.has("E_MERGE_RANGE") || n?.has("E_MERGE_DUP") || n?.has("E_MERGE_OVERLAP")) return [];
			if (n?.has("E_MERGE_BOUNDS")) {
				if (!a || r < a.s.r || i < a.s.c || r > a.e.r || i > a.e.c) return [];
				s = Math.min(s, a.e.r), c = Math.min(c, a.e.c);
			}
			return [{
				...e,
				s: {
					...e.s,
					r,
					c: i
				},
				e: {
					...e.e,
					r: s,
					c
				}
			}];
		});
	}
}, ab = (e, t) => e.kind === "text" ? Ig(e.data, {
	...nb,
	type: "string",
	validateMerges: t
}) : Ig(e.data, {
	...nb,
	validateMerges: t
}), ob = (e) => {
	try {
		return ab(e, !0);
	} catch (t) {
		if (!rb(t)) throw t;
		let n = ab(e, !1);
		return ib(n), console.warn(`[file-viewer] Recovered a workbook with invalid merge metadata: ${t.message}`), n;
	}
}, sb = () => ({
	workbook: null,
	sheets: [],
	charts: {},
	cellImages: {}
}), cb = (e, t = {}) => ({
	type: "parseError",
	payload: {
		...t,
		message: e instanceof Error ? e.message : String(e)
	}
}), lb = (e) => (e?.["!drawings"]?.images || []).reduce((e, t) => {
	let n = t.anchor, r = Number(n?.to?.row ?? n?.from?.row), i = Number(n?.to?.col ?? n?.from?.col);
	return {
		rowCount: Number.isFinite(r) ? Math.max(e.rowCount, r + 1) : e.rowCount,
		colCount: Number.isFinite(i) ? Math.max(e.colCount, i + 1) : e.colCount
	};
}, {
	rowCount: 0,
	colCount: 0
}), ub = (e) => (e || []).reduce((e, t) => {
	let n = t.ext?.height ? Math.ceil(t.ext.height / 9525 / 20) : 0, r = t.ext?.width ? Math.ceil(t.ext.width / 9525 / 64) : 0, i = t.to?.row ?? t.from.row + n, a = t.to?.col ?? t.from.col + r;
	return {
		rowCount: Math.max(e.rowCount, i + 1),
		colCount: Math.max(e.colCount, a + 1)
	};
}, {
	rowCount: 0,
	colCount: 0
}), db = 1e3, fb = 256, pb = 256, mb = 64, hb = 4, gb = 4, _b = 4, vb = (e, t, n, r) => {
	if (e.length === 0) return 0;
	let i = [...new Set(e)].sort((e, t) => e - t), a = Math.max(t * n, hb);
	if (!r && i[0] > a) return 0;
	let o = Math.max(i[0], r - 1);
	for (let e = 1; e < i.length; e += 1) {
		let r = i[e];
		if (r <= o) continue;
		let a = o + 1;
		if (r - o > Math.max(t * n, a * hb)) break;
		o = r;
	}
	return o + 1;
}, yb = (e) => {
	let t = {
		rowCount: 0,
		colCount: 0
	};
	if (!e) return t;
	let n = [], r = [], i = 0, a = 0, o = (e, t, o) => {
		n.push(e), r.push(t);
		let s = o;
		(typeof o != "object" || s.v != null || s.f != null || s.F != null || s.w || s.r || s.h || s.l || Array.isArray(s.c) && s.c.length > 0) && (i = Math.max(i, e + 1), a = Math.max(a, t + 1));
	}, s = Array.isArray(e) ? e : e["!data"];
	if (Array.isArray(s)) for (let e of Object.keys(s)) {
		let t = Number(e), n = s[t];
		if (!(!Number.isInteger(t) || t < 0 || !Array.isArray(n))) for (let e of Object.keys(n)) {
			let r = Number(e);
			!Number.isInteger(r) || r < 0 || n[r] == null || o(t, r, n[r]);
		}
	}
	else for (let t of Object.keys(e)) if (!t.startsWith("!") && /^[A-Z]+[1-9][0-9]*$/i.test(t) && e[t] != null) try {
		let n = n_.decode_cell(t);
		o(n.r, n.c, e[t]);
	} catch {}
	return t.rowCount = vb(n, pb, gb, i), t.colCount = vb(r, mb, _b, a), t;
}, bb = (e) => (e?.["!merges"] || []).reduce((e, t) => {
	let n = Number(t.e?.row ?? t.e?.r), r = Number(t.e?.col ?? t.e?.c);
	return {
		rowCount: Number.isFinite(n) ? Math.max(e.rowCount, n + 1) : e.rowCount,
		colCount: Number.isFinite(r) ? Math.max(e.colCount, r + 1) : e.colCount
	};
}, {
	rowCount: 0,
	colCount: 0
}), xb = (e, t, n, r) => t <= 0 ? Math.min(Math.max(e, 1), r) : e <= Math.max(t + n, t * hb) ? Math.max(e, t) : t, Sb = (e, t) => {
	let n = 0, r = 0, i = e?.["!ref"];
	if (i) try {
		let e = n_.decode_range(i);
		n = e.e.r + 1, r = e.e.c + 1;
	} catch {}
	let a = yb(e), o = bb(e), s = lb(e), c = ub(t), l = Math.max(a.rowCount, o.rowCount, s.rowCount, c.rowCount), u = Math.max(a.colCount, o.colCount, s.colCount, c.colCount), d = xb(n, l, pb, db), f = xb(r, u, mb, fb), p = d, m = f;
	return {
		rowCount: p,
		colCount: m,
		declaredRowCount: n,
		declaredColCount: r,
		observedRowCount: l,
		observedColCount: u,
		trimmed: p < n || m < r || p < d || m < f
	};
}, Cb = (e, t = !1) => {
	let n = e.workbook;
	if (!n?.SheetNames) return [];
	let r = n.Workbook?.Sheets || [];
	return e.sheets = n.SheetNames.reduce((i, a, o) => {
		let s = n.Sheets[a], c = Sb(s, e.charts[a]), l = !s?.["!ref"] && !c.observedRowCount && !c.observedColCount;
		return !s || l && !t || (c.trimmed && console.warn(`[file-viewer] Ignored pathological worksheet dimensions for ${a}: ${c.declaredRowCount}x${c.declaredColCount} -> ${c.rowCount}x${c.colCount}.`), i.push({
			id: i.length,
			name: a,
			hidden: !!r[o]?.Hidden,
			rowCount: l ? 0 : c.rowCount,
			colCount: l ? 0 : c.colCount
		})), i;
	}, []), [{
		type: "sheets",
		payload: { sheets: e.sheets }
	}];
}, wb = async (e, t, n = {}) => {
	try {
		if (e.workbook = ob(dy(t, n)), tb(e.workbook), (t.byteLength >= 2 ? new DataView(t).getUint16(0, !1) : 0) === 20555) {
			let [n, r] = await Promise.all([ey(t, e.workbook).catch((e) => (console.warn("[file-viewer] Spreadsheet chart parsing failed; continuing with cell content.", e), {})), Vy(t).catch((e) => (console.warn("[file-viewer] Spreadsheet cell image parsing failed; continuing with cell content.", e), {}))]);
			e.charts = n, e.cellImages = r;
		} else e.charts = {}, e.cellImages = {};
		return Cb(e, n.includeEmptySheets);
	} catch (e) {
		return [cb(e)];
	}
}, Tb = (e, t = {}) => {
	let { sheet: n, startRow: r = 0, pageSize: i = 500, sessionId: a = 0 } = t;
	try {
		let t = e.workbook, o = e.sheets.find((e) => e.id === n)?.name;
		if (!t?.Sheets || !o) return [];
		let s = t.Sheets[o];
		if (!s) return [];
		let c = e.sheets.find((e) => e.id === n), l = mv.create(s, {
			startRow: r,
			pageSize: i,
			totalRows: c?.rowCount,
			totalCols: c?.colCount,
			charts: e.charts[o],
			cellImages: e.cellImages[o]
		}), u = l.toObject({ includeLayout: r === 0 }), d = r === 0 ? l.structure : void 0;
		return [{
			type: "parseSheet",
			payload: {
				sessionId: a,
				sheet: n,
				sheetData: d ? {
					...u,
					structure: d
				} : u
			}
		}];
	} catch (e) {
		return [cb(e, {
			sessionId: a,
			startRow: r
		})];
	}
}, Eb = (e) => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), Db = (e, t) => {
	let n = t.wholeWord ? `\\b${Eb(e)}\\b` : Eb(e);
	return new RegExp(n, t.caseSensitive ? "g" : "gi");
}, Ob = (e, t) => {
	let n = e, r = Array.isArray(e) ? e : n["!data"];
	if (r) {
		for (let e of Object.keys(r)) {
			let n = r[Number(e)], i = Number(e);
			if (!(!Number.isInteger(i) || i < 0 || !Array.isArray(n))) for (let e of Object.keys(n)) {
				let r = Number(e), a = n[r];
				if (!(!Number.isInteger(r) || r < 0 || !a) && !t(a, i, r)) return !1;
			}
		}
		return !0;
	}
	for (let n of Object.keys(e)) {
		if (n.startsWith("!") || !/^[A-Z]+[1-9][0-9]*$/i.test(n)) continue;
		let r = e[n];
		if (!r) continue;
		let i;
		try {
			i = n_.decode_cell(n);
		} catch {
			continue;
		}
		if (!t(r, i.r, i.c)) return !1;
	}
	return !0;
}, kb = (e, t, n = {}) => {
	let r = t.replace(/\s+/g, " ").trim();
	if (!r || !e.workbook?.Sheets) return [];
	let i = Math.max(1, Math.floor(n.maxMatches || 1e3)), a = Db(r, n), o = [];
	for (let t of e.sheets) {
		let n = e.workbook.Sheets[t.name];
		if (n && (!Ob(n, (e, n, r) => {
			let s = X_(e);
			if (!s) return !0;
			a.lastIndex = 0;
			let c;
			for (; (c = a.exec(s)) && o.length < i;) c[0] ? o.push({
				sheet: t.id,
				sheetName: t.name,
				row: n,
				col: r,
				text: s,
				matchText: c[0]
			}) : a.lastIndex += 1;
			return o.length < i;
		}) || o.length >= i)) break;
	}
	return o;
}, Ab = (e, t) => {
	switch (t.type) {
		case "parseWorkbook": return wb(e, t.payload?.workbook, {
			fileType: t.payload?.fileType,
			filename: t.payload?.filename,
			textEncoding: t.payload?.textEncoding,
			includeEmptySheets: t.payload?.includeEmptySheets
		});
		case "parseSheet": return Tb(e, t.payload);
		case "searchWorkbook": return [{
			type: "searchWorkbook",
			payload: {
				requestId: t.payload?.requestId,
				query: t.payload?.query || "",
				matches: kb(e, t.payload?.query || "", t.payload)
			}
		}];
		default: return [];
	}
};
export { sb as createSpreadsheetParserContext, Sb as getWorksheetDisplayBounds, Ab as handleSpreadsheetWorkerRequest, Tb as parseSpreadsheetSheet, wb as parseSpreadsheetWorkbook, kb as searchSpreadsheetWorkbook };
