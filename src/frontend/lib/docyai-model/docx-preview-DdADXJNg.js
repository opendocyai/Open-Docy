import { o as e } from "./rolldown-runtime-DsPmjQRF.js";
import { t } from "./jszip.min-N6L6cMlJ.js";
// node_modules/.pnpm/@file-viewer+docx@0.3.39/node_modules/@file-viewer/docx/dist/docx-preview.mjs
var n = /* @__PURE__ */ e(t(), 1), r = /* @__PURE__ */ new WeakMap(), i = () => new DOMException("DOCX layout was detached or replaced", "AbortError");
function a(e) {
	r.get(e)?.cancel();
	let t = new AbortController(), n = {
		signal: t.signal,
		isCurrent: () => !t.signal.aborted && r.get(e) === n,
		cancel: () => t.abort()
	};
	return r.set(e, n), n;
}
function o(e) {
	r.get(e)?.cancel(), r.delete(e);
}
function s(e) {
	let t = r.get(e);
	return t?.isCurrent() ? t : a(e);
}
function c(e, t, n = !0) {
	if (!t.isCurrent() || n && !e.isConnected) throw i();
}
function l(e, t = s(e)) {
	let n = Array.from(e.querySelectorAll?.("[data-docx-layout-root]") ?? []).length ? () => Array.from(e.querySelectorAll("[data-docx-layout-root]")) : () => Array.from(e.childNodes ?? []), r = n();
	return {
		signal: t.signal,
		cancel: () => t.cancel(),
		isCurrent: () => {
			if (!t.isCurrent()) return !1;
			let e = new Set(n());
			return !r.length || r.some((t) => e.has(t));
		},
		acceptLayoutChanges: (i) => {
			i === e && t.isCurrent() && (r = n()), t.acceptLayoutChanges?.(i);
		}
	};
}
async function u(e, t = [], n = s(e)) {
	c(e, n);
	let r = e.ownerDocument;
	e.getBoundingClientRect?.();
	let a = [], o, l = Array.from(e.querySelectorAll("img")), u = Array.from(e.querySelectorAll("[data-docx-layout-root]")), d = Array.from(e.childNodes ?? []), f = u.length ? () => Array.from(e.querySelectorAll("[data-docx-layout-root]")) : d.length ? () => Array.from(e.childNodes ?? []) : () => Array.from(e.querySelectorAll("img")), p = u.length ? u : d.length ? d : l, m = /* @__PURE__ */ new Map(), h = () => {
		c(e, n);
		let t = new Set(f());
		if (p.length && !p.some((e) => t.has(e))) throw n.cancel(), i();
		let r = new Set(Array.from(e.querySelectorAll("img")));
		for (let [e, t] of m) r.has(e) || t();
	}, g = new Promise((t, s) => {
		let c = () => s(i());
		n.signal.addEventListener("abort", c, { once: !0 }), a.push(() => n.signal.removeEventListener("abort", c));
		let l = r.defaultView?.MutationObserver;
		if (l && r.documentElement) {
			o = new l(() => {
				try {
					h();
				} catch (e) {
					s(e);
				}
			}), o.observe(r.documentElement, {
				childList: !0,
				subtree: !0
			});
			for (let t = e.getRootNode?.(); t && t !== r; t = t.host?.getRootNode?.()) o.observe(t, {
				childList: !0,
				subtree: !0
			});
		}
	}), _ = l.map((e) => e.complete ? Promise.resolve() : new Promise((t) => {
		let n = () => t();
		m.set(e, n), e.addEventListener("load", n, { once: !0 }), e.addEventListener("error", n, { once: !0 }), a.push(() => {
			e.removeEventListener("load", n), e.removeEventListener("error", n);
		});
	}));
	try {
		await Promise.race([Promise.all([
			Promise.allSettled(t),
			r.fonts?.ready ?? Promise.resolve(),
			..._
		]), g]), h();
	} finally {
		o?.disconnect(), a.forEach((e) => e());
	}
}
var d = /[\u0000-\u001f\u007f]/, f = /^data:image\/[a-z0-9.+-]+(?:;[^,]*)?,/i;
function p(e) {
	return e?.targetMode?.trim().toLowerCase() === "external";
}
function m(e, t = "block") {
	if (!p(e)) return null;
	let n = `${e?.target ?? ""}`.trim();
	if (!n || d.test(n)) return null;
	let r;
	try {
		r = new URL(n);
	} catch {
		return null;
	}
	switch (r.protocol.toLowerCase()) {
		case "data:": return f.test(n) ? n : null;
		case "blob:": return n;
		case "http:":
		case "https:": return t === "allow" ? r.href : null;
		default: return null;
	}
}
var h;
(function(e) {
	e.OfficeDocument = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument", e.FontTable = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable", e.Image = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", e.Numbering = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering", e.Styles = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles", e.StylesWithEffects = "http://schemas.microsoft.com/office/2007/relationships/stylesWithEffects", e.Theme = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme", e.Settings = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings", e.WebSettings = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/webSettings", e.Hyperlink = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink", e.Footnotes = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/footnotes", e.Endnotes = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/endnotes", e.Footer = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer", e.Header = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/header", e.ExtendedProperties = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties", e.CoreProperties = "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties", e.CustomProperties = "http://schemas.openxmlformats.org/package/2006/relationships/metadata/custom-properties", e.Comments = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments", e.CommentsExtended = "http://schemas.microsoft.com/office/2011/relationships/commentsExtended", e.AltChunk = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/aFChunk", e.Chart = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart", e.ChartUserShapes = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chartUserShapes", e.DiagramData = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/diagramData", e.DiagramLayout = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/diagramLayout", e.DiagramQuickStyle = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/diagramQuickStyle", e.DiagramColors = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/diagramColors", e.Ink = "http://schemas.microsoft.com/office/2007/relationships/ink", e.ContentPart = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/contentPart";
})(h ||= {});
function g(e, t) {
	return t.elements(e).map((e) => ({
		id: t.attr(e, "Id"),
		type: t.attr(e, "Type"),
		target: t.attr(e, "Target"),
		targetMode: t.attr(e, "TargetMode")
	}));
}
function _(e) {
	return e?.replace(/[ .]+/g, "-").replace(/[&]+/g, "and").toLowerCase();
}
function v(e) {
	let t = String(e ?? "").trim();
	return (t.startsWith("'") && t.endsWith("'") || t.startsWith("\"") && t.endsWith("\"")) && (t = t.slice(1, -1)), /^(?:serif|sans-serif|monospace|cursive|fantasy|system-ui|ui-serif|ui-sans-serif|ui-monospace|ui-rounded|emoji|math|fangsong)$/i.test(t) || /^[^\u0000-\u0020\u007f-\u009f'"\\;:{}()[\]<>/,]+$/u.test(t) ? t : `'${t.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/[\u0000-\u001f\u007f-\u009f]/g, (e) => e === "\0" ? "�" : `\\${e.codePointAt(0).toString(16)} `)}'`;
}
function y(e) {
	let t = String(e ?? "").normalize("NFKC").toLowerCase();
	return /simsun|nsimsun|宋体|宋體|songti|shusong|书宋|書宋|fangsong|仿宋|mincho|明朝|明體|mingliu|pmingliu|batang|명조|kaiti|楷体|楷體|stkaiti|simhei|黑体|黑體|heiti|dengxian|等线|等線|yahei|fangzheng|方正|fz(?:fs|kt|ht|ss|xbs)|ゴシック|(?:^|\s)(?:ms|yu)\s+p?gothic|meiryo|メイリオ|malgun|맑은/.test(t);
}
function b(e, t = "") {
	let n = String(e ?? "").trim();
	if (!n) return [];
	let r = n.normalize("NFKC").toLowerCase(), i = /mincho|明朝|ゴシック|(?:^|\s)(?:ms|yu)\s+p?gothic|meiryo|メイリオ/.test(r), a = [
		"Hans",
		"Hant",
		"Jpan",
		"Hang"
	].includes(t) ? t : i ? "Jpan" : t, o = [v(n)], s = x(n), c = /simsun|nsimsun|宋体|宋體|songti|shusong|书宋|書宋|fangsong|仿宋|fz(?:fs|ss|xbs)|小标宋|小標宋|mincho|明朝|明體|mingliu|pmingliu|batang|명조/.test(r), l = /kaiti|楷体|楷體|stkaiti|fzkt|kai/.test(r), u = /simhei|黑体|黑體|heiti|fzht|dengxian|等线|等線|yahei|gothic|ゴシック|malgun|맑은/.test(r);
	return s.length && o.push(...s.map(v)), c ? a == "Hant" ? o.push("'Songti TC'", "'Microsoft JhengHei'", "'Noto Serif CJK TC'", "serif") : a == "Jpan" ? o.push("'Yu Mincho'", "'Hiragino Mincho ProN'", "'Noto Serif CJK JP'", "serif") : a == "Hang" ? o.push("Batang", "AppleMyungjo", "'Noto Serif CJK KR'", "serif") : o.push("'Songti SC'", "'Noto Serif CJK SC'", "serif") : l ? o.push("'Kaiti SC'", "STKaiti", "'Noto Serif CJK SC'", "serif") : u ? a == "Hant" ? o.push("'Microsoft JhengHei'", "'PingFang TC'", "'Noto Sans CJK TC'", "sans-serif") : a == "Jpan" ? o.push("'Yu Gothic'", "Meiryo", "'Noto Sans CJK JP'", "sans-serif") : a == "Hang" ? o.push("'Malgun Gothic'", "'Apple SD Gothic Neo'", "'Noto Sans CJK KR'", "sans-serif") : o.push("'Microsoft YaHei'", "'PingFang SC'", "'Noto Sans CJK SC'", "sans-serif") : a == "Hant" ? o.push("'PingFang TC'", "'Noto Sans CJK TC'", "sans-serif") : a == "Jpan" ? o.push("'Yu Gothic'", "Meiryo", "'Noto Sans CJK JP'", "sans-serif") : a == "Hang" ? o.push("'Apple SD Gothic Neo'", "'Noto Sans CJK KR'", "sans-serif") : o.push("'PingFang SC'", "'Noto Sans CJK SC'", "sans-serif"), [...new Set(o)];
}
function x(e) {
	let t = String(e ?? "").normalize("NFKC").toLowerCase().replace(/[\s_-]+/g, "");
	return [
		[/方正仿宋|fangzhengfangsong|fzfangsong|fzfs/, [
			"方正仿宋",
			"方正仿宋简体",
			"方正仿宋_GBK",
			"FZFangSong-Z02",
			"FZFSK--GBK1-0"
		]],
		[/方正楷体|fangzhengkai|fzkai|fzkt/, [
			"方正楷体",
			"方正楷体简体",
			"方正楷体_GBK",
			"FZKai-Z03",
			"FZKTK--GBK1-0"
		]],
		[/方正黑体|fangzhenghei|fzhei|fzht/, [
			"方正黑体",
			"方正黑体简体",
			"FZHei-B01",
			"FZHTK--GBK1-0"
		]],
		[/方正书宋|fangzhengshusong|fzshusong|fzss/, [
			"方正书宋",
			"方正书宋简体",
			"FZShuSong-Z01",
			"FZSSK--GBK1-0"
		]],
		[/方正小标宋|fangzhengxiaobiaosong|fzxiaobiaosong|fzxbs/, [
			"方正小标宋简体",
			"方正小标宋",
			"FZXiaoBiaoSong-B05",
			"FZXBSJW--GB1-0"
		]]
	].find(([e]) => e.test(t))?.[1] ?? [];
}
function S(e) {
	let t = e.lastIndexOf("/") + 1;
	return [t == 0 ? "" : e.substring(0, t), t == 0 ? e : e.substring(t)];
}
function C(e, t) {
	try {
		return new URL(e, "http://docx/" + t).toString().substring(12);
	} catch {
		return `${t}${e}`;
	}
}
function w(e, t) {
	return e.reduce((e, n) => (e[t(n)] = n, e), {});
}
function T(e) {
	return new Promise((t, n) => {
		let r = new FileReader();
		r.onloadend = () => t(r.result), r.onerror = () => n(), r.readAsDataURL(e);
	});
}
function E(e) {
	return e && typeof e == "object" && !Array.isArray(e);
}
function D(e) {
	return typeof e == "string" || e instanceof String;
}
function O(e, ...t) {
	if (!t.length) return e;
	let n = t.shift();
	if (E(e) && E(n)) for (let t of Object.keys(n)) {
		if (t === "__proto__" || t === "constructor" || t === "prototype") continue;
		let r = n[t];
		if (E(r)) {
			let n = Object.prototype.hasOwnProperty.call(e, t) ? e[t] : void 0, i = E(n) ? n : {};
			e[t] = i, O(i, r);
		} else e[t] = r;
	}
	return O(e, ...t);
}
function k(e) {
	let t = {};
	for (let n of (e ?? "").split(";")) {
		let e = n.indexOf(":");
		if (e <= 0) continue;
		let r = n.substring(0, e).trim(), i = n.substring(e + 1).trim();
		r && (t[r] = i);
	}
	return t;
}
function A(e) {
	return Array.isArray(e) ? e : [e];
}
function j(e, t, n) {
	return t > e ? t : n < e ? n : e;
}
var M = {
	wordml: "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
	drawingml: "http://schemas.openxmlformats.org/drawingml/2006/main",
	picture: "http://schemas.openxmlformats.org/drawingml/2006/picture",
	wordprocessingCanvas: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
	wordprocessingGroup: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
	wordprocessingShape: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape"
}, N = {
	Dxa: {
		mul: .05,
		unit: "pt"
	},
	SignedDxa: {
		mul: .05,
		unit: "pt"
	},
	Emu: {
		mul: 1 / 12700,
		unit: "pt"
	},
	FontSize: {
		mul: .5,
		unit: "pt"
	},
	SignedHalfPoint: {
		mul: .5,
		unit: "pt"
	},
	Border: {
		mul: .125,
		unit: "pt",
		min: .25,
		max: 12
	},
	Point: {
		mul: 1,
		unit: "pt"
	},
	Percent: {
		mul: .02,
		unit: "%"
	}
};
function P(e, t = N.Dxa) {
	if (e == null || e === "" || /.+(p[xt]|[%])$/i.test(e)) return e;
	var n = parseFloat(e);
	if (Number.isNaN(n)) return null;
	var r = n * t.mul;
	return t.min != null && t.max != null && (r = j(r, t.min, t.max)), `${r.toFixed(2)}${t.unit}`;
}
function ee(e, t = !1) {
	switch (e) {
		case "1": return !0;
		case "0": return !1;
		case "on": return !0;
		case "off": return !1;
		case "true": return !0;
		case "false": return !1;
		default: return t;
	}
}
function te(e, t, n) {
	if (e.namespaceURI != M.wordml) return !1;
	switch (e.localName) {
		case "color":
			t.color = n.attr(e, "val");
			break;
		case "sz":
			t.fontSize = n.lengthAttr(e, "val", N.FontSize);
			break;
		case "szCs":
			t.fontSize ??= n.lengthAttr(e, "val", N.FontSize);
			break;
		default: return !1;
	}
	return !0;
}
var ne = /* @__PURE__ */ new Map(), re = /* @__PURE__ */ new Map(), ie = "file-viewer-docx-xml-parser", ae = "file-viewer-docx-altchunk-parser", oe = "file-viewer-docx-altchunk-srcdoc", se = /* @__PURE__ */ new Set([
	"script",
	"style",
	"base",
	"meta",
	"link",
	"object",
	"embed",
	"applet",
	"iframe",
	"frame",
	"frameset",
	"form",
	"input",
	"button",
	"textarea",
	"select",
	"option",
	"audio",
	"video",
	"source",
	"track",
	"svg",
	"math",
	"template"
]), ce = /^(?:action|archive|background|cite|classid|codebase|data|dynsrc|formaction|href|longdesc|lowsrc|manifest|ping|poster|profile|src|srcdoc|srcset|usemap|xlink:href)$/;
function le(e, t) {
	let n = globalThis.trustedTypes;
	if (!n) return t;
	let r = ne.get(e);
	r || (r = n.createPolicy(e, { createHTML(t) {
		if (t !== re.get(e)) throw TypeError(`Rejected HTML outside the ${e} boundary`);
		return t;
	} }), ne.set(e, r)), re.set(e, t);
	try {
		return r.createHTML(t);
	} finally {
		re.delete(e);
	}
}
function ue(e) {
	return typeof document > "u" ? e : le(ie, e);
}
function de(e) {
	e.parentNode && e.parentNode.removeChild(e);
}
function fe(e) {
	let t = new DOMParser(), n = le(ae, String(e ?? "")), r = t.parseFromString(n, "text/html");
	for (let e of Array.from(r.getElementsByTagName("*"))) {
		let t = e.localName?.toLowerCase() || e.nodeName.toLowerCase();
		se.has(t) && de(e);
	}
	for (let e of Array.from(r.getElementsByTagName("*"))) for (let t of Array.from(e.attributes ?? [])) {
		let n = t.name.toLowerCase();
		(n.startsWith("on") || n === "style" || ce.test(n)) && e.removeAttribute(t.name);
	}
	let i = r.documentElement;
	return `<!doctype html>${i ? new XMLSerializer().serializeToString(i) : "<html><head></head><body></body></html>"}`;
}
function pe(e, t) {
	e.srcdoc = le(oe, fe(t));
}
var me = {
	parse: (e) => new DOMParser().parseFromString(e, "application/xml"),
	serialize: (e) => new XMLSerializer().serializeToString(e)
};
function he(e, t = !1) {
	t && (e = e.replace(/<[?].*[?]>/, "")), e = _e(e);
	let n = me.parse(ue(e)), r = ge(n);
	if (r) throw Error(r);
	return n;
}
function ge(e) {
	return e.getElementsByTagName("parsererror")[0]?.textContent;
}
function _e(e) {
	return e.charCodeAt(0) === 65279 ? e.substring(1) : e;
}
function ve(e) {
	return me.serialize(e);
}
var ye = class {
	elements(e, t = null) {
		let n = [];
		for (let r = 0, i = e.childNodes.length; r < i; r++) {
			let i = e.childNodes.item(r);
			i.nodeType == 1 && (t == null || i.localName == t) && n.push(i);
		}
		return n;
	}
	element(e, t) {
		for (let n = 0, r = e.childNodes.length; n < r; n++) {
			let r = e.childNodes.item(n);
			if (r.nodeType == 1 && r.localName == t) return r;
		}
		return null;
	}
	elementAttr(e, t, n) {
		var r = this.element(e, t);
		return r ? this.attr(r, n) : void 0;
	}
	attrs(e) {
		return Array.from(e.attributes);
	}
	attr(e, t) {
		if (e?.localName == "blip" && (t == "embed" || t == "link")) {
			let n = this.descendantAttr(e, "svgBlip", t);
			if (n != null) return n;
		}
		return e?.localName == "cnfStyle" && t == "val" ? this.rawAttr(e, t) ?? this.cnfStyleValue(e) : this.rawAttr(e, t);
	}
	rawAttr(e, t) {
		for (let n = 0, r = e.attributes.length; n < r; n++) {
			let r = e.attributes.item(n);
			if (r.localName == t) return r.value;
		}
		return null;
	}
	descendantAttr(e, t, n) {
		for (let r of this.elements(e)) {
			if (r.localName == t) {
				let e = this.rawAttr(r, n);
				if (e != null) return e;
			}
			let e = this.descendantAttr(r, t, n);
			if (e != null) return e;
		}
		return null;
	}
	cnfStyleValue(e) {
		return [
			"firstRow",
			"lastRow",
			"firstColumn",
			"lastColumn",
			"oddVBand",
			"evenVBand",
			"oddHBand",
			"evenHBand",
			"firstRowLastColumn",
			"firstRowFirstColumn",
			"lastRowLastColumn",
			"lastRowFirstColumn"
		].map((t) => ee(this.rawAttr(e, t), !1) ? "1" : "0").join("");
	}
	intAttr(e, t, n = null) {
		var r = this.attr(e, t);
		return r != null && r !== "" ? parseInt(r, 10) : n;
	}
	hexAttr(e, t, n = null) {
		var r = this.attr(e, t);
		return r != null && r !== "" ? parseInt(r, 16) : n;
	}
	floatAttr(e, t, n = null) {
		var r = this.attr(e, t);
		return r != null && r !== "" ? parseFloat(r) : n;
	}
	boolAttr(e, t, n = null) {
		return ee(this.attr(e, t), n);
	}
	lengthAttr(e, t, n = N.Dxa) {
		return P(this.attr(e, t), n);
	}
}, F = new ye(), I = class {
	constructor(e, t) {
		this._package = e, this.path = t;
	}
	async load() {
		this.rels = await this._package.loadRelationships(this.path);
		let e = await this._package.load(this.path), t = this._package.parseXmlDocument(e);
		this._package.options.keepOrigin && (this._xmlDocument = t), this.parseXml(t.firstElementChild ?? t.documentElement);
	}
	save() {
		this._package.update(this.path, ve(this._xmlDocument));
	}
	parseXml(e) {}
}, be = {
	embedRegular: "regular",
	embedBold: "bold",
	embedItalic: "italic",
	embedBoldItalic: "boldItalic"
};
function xe(e, t) {
	return t.elements(e).map((e) => Se(e, t));
}
function Se(e, t) {
	let n = {
		name: t.attr(e, "name"),
		embedFontRefs: []
	};
	for (let r of t.elements(e)) switch (r.localName) {
		case "family":
			n.family = t.attr(r, "val");
			break;
		case "altName":
			n.altName = t.attr(r, "val");
			break;
		case "embedRegular":
		case "embedBold":
		case "embedItalic":
		case "embedBoldItalic": n.embedFontRefs.push(Ce(r, t));
	}
	return n;
}
function Ce(e, t) {
	return {
		id: t.attr(e, "id"),
		key: t.attr(e, "fontKey"),
		type: be[e.localName]
	};
}
var we = class extends I {
	parseXml(e) {
		this.fonts = xe(e, this._package.xmlParser);
	}
};
function Te(e, t) {
	return t.elements(e).map((e) => ({
		extension: t.attr(e, "Extension"),
		partName: t.attr(e, "PartName"),
		contentType: t.attr(e, "ContentType")
	}));
}
var Ee = class e {
	constructor(e, t) {
		this._zip = e, this.options = t, this.xmlParser = new ye();
	}
	get(e) {
		let t = Oe(e);
		return this._zip.files[t] ?? this._zip.files[t.replace(/\//g, "\\")];
	}
	update(e, t) {
		this._zip.file(e, t);
	}
	static async load(t, r) {
		let i = await (r.zipLoader ? r.zipLoader(t) : n.default.loadAsync(t));
		return new e(i, r);
	}
	save(e = "blob") {
		return this._zip.generateAsync({ type: e });
	}
	load(e, t = "string") {
		return this.get(e)?.async(t) ?? Promise.resolve(null);
	}
	async loadRelationships(e = null) {
		let t = "_rels/.rels";
		if (e != null) {
			let [n, r] = S(e);
			t = `${n}_rels/${r}.rels`;
		}
		let n = await this.load(t);
		return n ? g(De(this.parseXmlDocument(n)), this.xmlParser) : null;
	}
	async loadContentTypes() {
		let e = await this.load("[Content_Types].xml");
		return e ? Te(De(this.parseXmlDocument(e)), this.xmlParser) : [];
	}
	parseXmlDocument(e) {
		return he(e, this.options.trimXmlDeclaration);
	}
};
function De(e) {
	return e.firstElementChild ?? e.documentElement;
}
function Oe(e) {
	return e.startsWith("/") ? e.substr(1) : e;
}
var ke = class extends I {
	constructor(e, t, n) {
		super(e, t), this._documentParser = n;
	}
	parseXml(e) {
		this.body = this._documentParser.parseDocumentFile(e);
	}
};
function Ae(e, t) {
	return {
		type: t.attr(e, "val"),
		color: t.attr(e, "color"),
		size: t.lengthAttr(e, "sz", N.Border),
		offset: t.lengthAttr(e, "space", N.Point),
		frame: t.boolAttr(e, "frame"),
		shadow: t.boolAttr(e, "shadow")
	};
}
function je(e, t) {
	var n = {};
	for (let r of t.elements(e)) switch (r.localName) {
		case "left":
			n.left = Ae(r, t);
			break;
		case "top":
			n.top = Ae(r, t);
			break;
		case "right":
			n.right = Ae(r, t);
			break;
		case "bottom": n.bottom = Ae(r, t);
	}
	return n;
}
function Me(e, t) {
	let n = { defaultNoteIds: [] };
	for (let r of t.elements(e)) switch (r.localName) {
		case "numFmt":
			n.numberingFormat = n.nummeringFormat = t.attr(r, "val");
			break;
		case "numStart":
			let e = t.intAttr(r, "val", null);
			Number.isSafeInteger(e) && e >= 0 && (n.start = e);
			break;
		case "numRestart":
			let i = t.attr(r, "val");
			[
				"continuous",
				"eachSect",
				"eachPage"
			].includes(i) && (n.restart = i);
			break;
		case "footnote":
		case "endnote": n.defaultNoteIds.push(t.attr(r, "id"));
	}
	return n;
}
function Ne(e, t) {
	return {
		format: t?.numberingFormat ?? t?.nummeringFormat ?? e?.numberingFormat ?? e?.nummeringFormat ?? "decimal",
		start: t?.start ?? e?.start ?? 1,
		restart: t?.restart ?? e?.restart ?? "continuous"
	};
}
var Pe = class {
	constructor() {
		this.assignments = /* @__PURE__ */ new Map(), this.counters = /* @__PURE__ */ new Map();
	}
	assign(e, t, n, r, i, a) {
		let o = `${e}:${t}`, s = this.assignments.get(o);
		if (s) return s;
		let c = this.counters.get(e), l = !c || r.restart === "eachSect" && c.section !== i || r.restart === "eachPage" && c.page !== a, u = n ? null : l ? r.start : c.next;
		n || this.counters.set(e, {
			next: u + 1,
			section: i,
			page: a
		});
		let d = {
			id: t,
			kind: e,
			custom: n,
			value: u,
			properties: r
		};
		return this.assignments.set(o, d), d;
	}
};
function Fe(e) {
	if (!e || e.custom || e.properties.format === "none") return "";
	let t = e.value, n = e.properties.format;
	switch (n) {
		case "chicago": {
			let e = [
				"*",
				"†",
				"‡",
				"§"
			];
			return t > 0 && t <= 384 ? e[(t - 1) % e.length].repeat(Math.floor((t - 1) / e.length) + 1) : `${t}`;
		}
		case "upperLetter":
		case "lowerLetter": {
			if (t <= 0 || t > 3328) return `${t}`;
			let e = n === "upperLetter" ? 65 : 97;
			return String.fromCharCode(e + (t - 1) % 26).repeat(Math.floor((t - 1) / 26) + 1);
		}
		case "upperRoman":
		case "lowerRoman": {
			if (t <= 0 || t > 3999) return `${t}`;
			let e = [
				[1e3, "M"],
				[900, "CM"],
				[500, "D"],
				[400, "CD"],
				[100, "C"],
				[90, "XC"],
				[50, "L"],
				[40, "XL"],
				[10, "X"],
				[9, "IX"],
				[5, "V"],
				[4, "IV"],
				[1, "I"]
			], r = t, i = "";
			for (let [t, n] of e) for (; r >= t;) i += n, r -= t;
			return n === "lowerRoman" ? i.toLowerCase() : i;
		}
		case "decimalZero": return t < 10 ? `0${t}` : `${t}`;
		case "numberInDash": return `-${t}-`;
		case "hex": return t.toString(16).toUpperCase();
		case "ordinal": return `${t}${t % 100 >= 11 && t % 100 <= 13 ? "th" : {
			1: "st",
			2: "nd",
			3: "rd"
		}[t % 10] ?? "th"}`;
		default: return `${t}`;
	}
}
var Ie;
(function(e) {
	e.Continuous = "continuous", e.NextPage = "nextPage", e.NextColumn = "nextColumn", e.EvenPage = "evenPage", e.OddPage = "oddPage";
})(Ie ||= {});
function Le(e) {
	return e == null || e === Ie.NextPage || e === Ie.EvenPage || e === Ie.OddPage;
}
function Re(e) {
	return e === Ie.NextColumn;
}
var L = {
	width: "11906",
	height: "16838",
	marginTop: "1440",
	marginRight: "1440",
	marginBottom: "1440",
	marginLeft: "1440",
	header: "720",
	footer: "720",
	gutter: "0"
};
function ze(e = null) {
	let t = e === "landscape";
	return {
		width: P(t ? L.height : L.width),
		height: P(t ? L.width : L.height),
		orientation: e
	};
}
function Be() {
	return {
		top: P(L.marginTop),
		right: P(L.marginRight),
		bottom: P(L.marginBottom),
		left: P(L.marginLeft),
		header: P(L.header),
		footer: P(L.footer),
		gutter: P(L.gutter)
	};
}
function Ve(e = null, t = F) {
	let n = e ? t.element(e, "pgSz") : null, r = n ? t.attr(n, "orient") : null, i = ze(r), a = Be();
	var o = {
		pageSize: i,
		pageMargins: a
	};
	if (!e) return o;
	for (let n of t.elements(e)) switch (n.localName) {
		case "pgSz":
			o.pageSize = {
				width: t.lengthAttr(n, "w") ?? i.width,
				height: t.lengthAttr(n, "h") ?? i.height,
				orientation: r
			};
			break;
		case "type":
			o.type = t.attr(n, "val");
			break;
		case "pgMar":
			o.pageMargins = {
				left: t.lengthAttr(n, "left") ?? a.left,
				right: t.lengthAttr(n, "right") ?? a.right,
				top: t.lengthAttr(n, "top") ?? a.top,
				bottom: t.lengthAttr(n, "bottom") ?? a.bottom,
				header: t.lengthAttr(n, "header") ?? a.header,
				footer: t.lengthAttr(n, "footer") ?? a.footer,
				gutter: t.lengthAttr(n, "gutter") ?? a.gutter
			};
			break;
		case "cols":
			o.columns = He(n, t);
			break;
		case "headerReference":
			(o.headerRefs ??= []).push(Ge(n, t));
			break;
		case "footerReference":
			(o.footerRefs ??= []).push(Ge(n, t));
			break;
		case "titlePg":
			o.titlePage = t.boolAttr(n, "val", !0);
			break;
		case "pgBorders":
			o.pageBorders = je(n, t);
			break;
		case "pgNumType":
			o.pageNumber = Ue(n, t);
			break;
		case "footnotePr":
			o.footnoteProps = Me(n, t);
			break;
		case "endnotePr":
			o.endnoteProps = Me(n, t);
			break;
		case "docGrid": o.docGrid = We(n, t);
	}
	return o;
}
function He(e, t) {
	return {
		numberOfColumns: t.intAttr(e, "num"),
		space: t.lengthAttr(e, "space"),
		separator: t.boolAttr(e, "sep"),
		equalWidth: t.boolAttr(e, "equalWidth", !0),
		columns: t.elements(e, "col").map((e) => ({
			width: t.lengthAttr(e, "w"),
			space: t.lengthAttr(e, "space")
		}))
	};
}
function Ue(e, t) {
	return {
		chapSep: t.attr(e, "chapSep"),
		chapStyle: t.attr(e, "chapStyle"),
		format: t.attr(e, "fmt"),
		start: t.intAttr(e, "start")
	};
}
function We(e, t) {
	let n = t.intAttr(e, "charSpace", null), r = n == null ? null : n / 4096;
	return {
		type: t.attr(e, "type"),
		linePitch: t.lengthAttr(e, "linePitch"),
		charSpace: r == null ? null : `${r.toFixed(4)}pt`,
		charSpaceRaw: n
	};
}
function Ge(e, t) {
	return {
		id: t.attr(e, "id"),
		type: t.attr(e, "type")
	};
}
function Ke(e, t) {
	return {
		before: t.lengthAttr(e, "before"),
		after: t.lengthAttr(e, "after"),
		line: t.intAttr(e, "line"),
		lineRule: t.attr(e, "lineRule")
	};
}
function qe(e, t) {
	let n = {};
	for (let r of t.elements(e)) Je(r, n, t);
	return n;
}
function Je(e, t, n) {
	return !!te(e, t, n);
}
function Ye(e, t) {
	let n = {};
	for (let r of t.elements(e)) Xe(r, n, t);
	return n;
}
function Xe(e, t, n) {
	if (e.namespaceURI != M.wordml) return !1;
	if (te(e, t, n)) return !0;
	switch (e.localName) {
		case "tabs":
			t.tabs = Ze(e, n);
			break;
		case "sectPr":
			t.sectionProps = Ve(e, n);
			break;
		case "numPr":
			t.numbering = Qe(e, n);
			break;
		case "spacing": return t.lineSpacing = Ke(e, n), !1;
		case "textAlignment": return t.textAlignment = n.attr(e, "val"), !1;
		case "keepLines":
			t.keepLines = n.boolAttr(e, "val", !0);
			break;
		case "keepNext":
			t.keepNext = n.boolAttr(e, "val", !0);
			break;
		case "pageBreakBefore":
			t.pageBreakBefore = n.boolAttr(e, "val", !0);
			break;
		case "widowControl":
			t.widowControl = n.boolAttr(e, "val", !0);
			break;
		case "outlineLvl":
			t.outlineLevel = n.intAttr(e, "val");
			break;
		case "pStyle":
			t.styleName = n.attr(e, "val");
			break;
		case "rPr":
			t.runProps = qe(e, n);
			break;
		default: return !1;
	}
	return !0;
}
function Ze(e, t) {
	return t.elements(e, "tab").map((e) => ({
		position: t.lengthAttr(e, "pos"),
		leader: t.attr(e, "leader"),
		style: t.attr(e, "val")
	}));
}
function Qe(e, t) {
	var n = {};
	for (let r of t.elements(e)) switch (r.localName) {
		case "numId":
			n.id = t.attr(r, "val");
			break;
		case "ilvl": n.level = t.intAttr(r, "val");
	}
	return n;
}
function $e(e, t) {
	let n = {
		numberings: [],
		abstractNumberings: [],
		bulletPictures: []
	};
	for (let r of t.elements(e)) switch (r.localName) {
		case "num":
			n.numberings.push(et(r, t));
			break;
		case "abstractNum":
			n.abstractNumberings.push(tt(r, t));
			break;
		case "numPicBullet": n.bulletPictures.push(it(r, t));
	}
	return n;
}
function et(e, t) {
	let n = {
		id: t.attr(e, "numId"),
		overrides: []
	};
	for (let r of t.elements(e)) switch (r.localName) {
		case "abstractNumId":
			n.abstractId = t.attr(r, "val");
			break;
		case "lvlOverride": n.overrides.push(rt(r, t));
	}
	return n;
}
function tt(e, t) {
	let n = {
		id: t.attr(e, "abstractNumId"),
		levels: []
	};
	for (let r of t.elements(e)) switch (r.localName) {
		case "name":
			n.name = t.attr(r, "val");
			break;
		case "multiLevelType":
			n.multiLevelType = t.attr(r, "val");
			break;
		case "numStyleLink":
			n.numberingStyleLink = t.attr(r, "val");
			break;
		case "styleLink":
			n.styleLink = t.attr(r, "val");
			break;
		case "lvl": n.levels.push(nt(r, t));
	}
	return n;
}
function nt(e, t) {
	let n = { level: t.intAttr(e, "ilvl") };
	for (let r of t.elements(e)) switch (r.localName) {
		case "start":
			n.start = t.attr(r, "val");
			break;
		case "lvlRestart":
			n.restart = t.intAttr(r, "val");
			break;
		case "numFmt":
			n.format = t.attr(r, "val");
			break;
		case "lvlText":
			n.text = t.attr(r, "val");
			break;
		case "lvlJc":
			n.justification = t.attr(r, "val");
			break;
		case "lvlPicBulletId":
			n.bulletPictureId = t.attr(r, "val");
			break;
		case "pStyle":
			n.paragraphStyle = t.attr(r, "val");
			break;
		case "pPr":
			n.paragraphProps = Ye(r, t);
			break;
		case "rPr": n.runProps = qe(r, t);
	}
	return n;
}
function rt(e, t) {
	let n = { level: t.intAttr(e, "ilvl") };
	for (let r of t.elements(e)) switch (r.localName) {
		case "startOverride":
			n.start = t.intAttr(r, "val");
			break;
		case "lvl": n.numberingLevel = nt(r, t);
	}
	return n;
}
function it(e, t) {
	var n = t.attr(e, "numPicBulletId"), r = t.element(e, "pict"), i = r && t.element(r, "shape"), a = i && t.element(i, "imagedata");
	if (a) return {
		id: n,
		referenceId: t.attr(a, "id"),
		style: t.attr(i, "style")
	};
	var o = t.element(e, "drawing"), s = o && at(o, "blip", t);
	return s ? {
		id: n,
		referenceId: t.attr(s, "embed") ?? t.attr(s, "link"),
		style: null
	} : null;
}
function at(e, t, n) {
	for (let r of n.elements(e)) {
		if (r.localName == t) return r;
		let e = at(r, t, n);
		if (e) return e;
	}
	return null;
}
var ot = class extends I {
	constructor(e, t, n) {
		super(e, t), this._documentParser = n;
	}
	parseXml(e) {
		Object.assign(this, $e(e, this._package.xmlParser)), this.domNumberings = this._documentParser.parseNumberingFile(e);
	}
}, st = class extends I {
	constructor(e, t, n) {
		super(e, t), this._documentParser = n;
	}
	parseXml(e) {
		this.styles = this._documentParser.parseStylesFile(e);
	}
}, R;
(function(e) {
	e.Document = "document", e.Paragraph = "paragraph", e.Run = "run", e.Break = "break", e.NoBreakHyphen = "noBreakHyphen", e.Table = "table", e.Row = "row", e.Cell = "cell", e.Hyperlink = "hyperlink", e.SmartTag = "smartTag", e.Drawing = "drawing", e.Image = "image", e.Text = "text", e.Tab = "tab", e.PositionalTab = "positionalTab", e.SoftHyphen = "softHyphen", e.Symbol = "symbol", e.BookmarkStart = "bookmarkStart", e.BookmarkEnd = "bookmarkEnd", e.Footer = "footer", e.Header = "header", e.FootnoteReference = "footnoteReference", e.EndnoteReference = "endnoteReference", e.Footnote = "footnote", e.Endnote = "endnote", e.SimpleField = "simpleField", e.ComplexField = "complexField", e.Instruction = "instruction", e.VmlPicture = "vmlPicture", e.MmlMath = "mmlMath", e.Shape = "shape", e.MmlMathParagraph = "mmlMathParagraph", e.MmlFraction = "mmlFraction", e.MmlFunction = "mmlFunction", e.MmlFunctionName = "mmlFunctionName", e.MmlNumerator = "mmlNumerator", e.MmlDenominator = "mmlDenominator", e.MmlRadical = "mmlRadical", e.MmlBase = "mmlBase", e.MmlDegree = "mmlDegree", e.MmlSuperscript = "mmlSuperscript", e.MmlSubscript = "mmlSubscript", e.MmlPreSubSuper = "mmlPreSubSuper", e.MmlSubArgument = "mmlSubArgument", e.MmlSuperArgument = "mmlSuperArgument", e.MmlNary = "mmlNary", e.MmlDelimiter = "mmlDelimiter", e.MmlRun = "mmlRun", e.MmlEquationArray = "mmlEquationArray", e.MmlLimit = "mmlLimit", e.MmlLimitLower = "mmlLimitLower", e.MmlLimitUpper = "mmlLimitUpper", e.MmlSubSuperscript = "mmlSubSuperscript", e.MmlPhantom = "mmlPhantom", e.MmlBorderBox = "mmlBorderBox", e.MmlAccent = "mmlAccent", e.MmlMatrix = "mmlMatrix", e.MmlMatrixRow = "mmlMatrixRow", e.MmlBox = "mmlBox", e.MmlBar = "mmlBar", e.MmlGroupChar = "mmlGroupChar", e.VmlElement = "vmlElement", e.Chart = "chart", e.SmartArt = "smartArt", e.Ink = "ink", e.Ruby = "ruby", e.RubyBase = "rubyBase", e.RubyText = "rubyText", e.Inserted = "inserted", e.Deleted = "deleted", e.DeletedText = "deletedText", e.Comment = "comment", e.CommentReference = "commentReference", e.CommentRangeStart = "commentRangeStart", e.CommentRangeEnd = "commentRangeEnd", e.AltChunk = "altChunk";
})(R ||= {});
var ct = class {
	constructor() {
		this.children = [], this.cssStyle = {};
	}
}, lt = class extends ct {
	constructor() {
		super(...arguments), this.type = R.Header;
	}
}, ut = class extends ct {
	constructor() {
		super(...arguments), this.type = R.Footer;
	}
}, dt = class extends I {
	constructor(e, t, n) {
		super(e, t), this._documentParser = n;
	}
	parseXml(e) {
		this.rootElement = this.createRootElement(), this.rootElement.children = this._documentParser.parseBodyElements(e);
	}
}, ft = class extends dt {
	createRootElement() {
		return new lt();
	}
}, pt = class extends dt {
	createRootElement() {
		return new ut();
	}
};
function mt(e, t) {
	let n = {};
	for (let r of t.elements(e)) switch (r.localName) {
		case "Template":
			n.template = r.textContent;
			break;
		case "Pages":
			n.pages = ht(r.textContent);
			break;
		case "Words":
			n.words = ht(r.textContent);
			break;
		case "Characters":
			n.characters = ht(r.textContent);
			break;
		case "Application":
			n.application = r.textContent;
			break;
		case "Lines":
			n.lines = ht(r.textContent);
			break;
		case "Paragraphs":
			n.paragraphs = ht(r.textContent);
			break;
		case "Company":
			n.company = r.textContent;
			break;
		case "AppVersion": n.appVersion = r.textContent;
	}
	return n;
}
function ht(e) {
	if (e !== void 0) return parseInt(e);
}
var gt = class extends I {
	parseXml(e) {
		this.props = mt(e, this._package.xmlParser);
	}
};
function _t(e, t) {
	let n = {};
	for (let r of t.elements(e)) switch (r.localName) {
		case "title":
			n.title = r.textContent;
			break;
		case "description":
			n.description = r.textContent;
			break;
		case "subject":
			n.subject = r.textContent;
			break;
		case "creator":
			n.creator = r.textContent;
			break;
		case "keywords":
			n.keywords = r.textContent;
			break;
		case "language":
			n.language = r.textContent;
			break;
		case "lastModifiedBy":
			n.lastModifiedBy = r.textContent;
			break;
		case "revision": r.textContent && (n.revision = parseInt(r.textContent));
	}
	return n;
}
var vt = class extends I {
	parseXml(e) {
		this.props = _t(e, this._package.xmlParser);
	}
}, yt = class {};
function bt(e) {
	let t = String(e ?? "").trim().replace(/_/g, "-").toLowerCase(), n = t.split("-")[0];
	return n == "zh" ? /(?:^|-)hant(?:-|$)|-(?:tw|hk|mo)(?:-|$)/.test(t) ? "Hant" : "Hans" : {
		ja: "Jpan",
		ko: "Hang",
		ar: "Arab",
		fa: "Arab",
		ur: "Arab",
		he: "Hebr",
		yi: "Hebr",
		th: "Thai",
		vi: "Viet",
		hi: "Deva",
		bn: "Beng",
		gu: "Gujr",
		kn: "Knda",
		pa: "Guru",
		ta: "Taml",
		te: "Telu",
		ml: "Mlym",
		or: "Orya",
		si: "Sinh",
		km: "Khmr",
		lo: "Laoo",
		my: "Mymr",
		mn: "Mong"
	}[n] ?? "";
}
function xt(e, t) {
	var n = new yt(), r = t.element(e, "themeElements");
	for (let e of t.elements(r)) switch (e.localName) {
		case "clrScheme":
			n.colorScheme = St(e, t);
			break;
		case "fontScheme": n.fontScheme = Ct(e, t);
	}
	return n;
}
function St(e, t) {
	var n = {
		name: t.attr(e, "name"),
		colors: {}
	};
	for (let a of t.elements(e)) {
		var r = t.element(a, "srgbClr"), i = t.element(a, "sysClr");
		r ? n.colors[a.localName] = t.attr(r, "val") : i && (n.colors[a.localName] = t.attr(i, "lastClr"));
	}
	return n;
}
function Ct(e, t) {
	var n = { name: t.attr(e, "name") };
	for (let r of t.elements(e)) switch (r.localName) {
		case "majorFont":
			n.majorFont = wt(r, t);
			break;
		case "minorFont": n.minorFont = wt(r, t);
	}
	return n;
}
function wt(e, t) {
	let n = {};
	for (let r of t.elements(e).filter((e) => e.localName == "font")) {
		let e = t.attr(r, "script"), i = t.attr(r, "typeface");
		e && i && (n[e] = i);
	}
	return {
		latinTypeface: t.elementAttr(e, "latin", "typeface"),
		eaTypeface: t.elementAttr(e, "ea", "typeface"),
		csTypeface: t.elementAttr(e, "cs", "typeface"),
		scriptTypefaces: n
	};
}
var Tt = class extends I {
	constructor(e, t) {
		super(e, t);
	}
	parseXml(e) {
		this.theme = xt(e, this._package.xmlParser);
	}
}, Et = class {}, Dt = class extends Et {
	constructor() {
		super(...arguments), this.type = R.Footnote;
	}
}, Ot = class extends Et {
	constructor() {
		super(...arguments), this.type = R.Endnote;
	}
}, kt = class extends I {
	constructor(e, t, n) {
		super(e, t), this._documentParser = n;
	}
}, At = class extends kt {
	constructor(e, t, n) {
		super(e, t, n);
	}
	parseXml(e) {
		this.notes = this._documentParser.parseNotes(e, "footnote", Dt);
	}
}, jt = class extends kt {
	constructor(e, t, n) {
		super(e, t, n);
	}
	parseXml(e) {
		this.notes = this._documentParser.parseNotes(e, "endnote", Ot);
	}
};
function Mt(e, t) {
	var n = {};
	for (let r of t.elements(e)) switch (r.localName) {
		case "defaultTabStop":
			n.defaultTabStop = t.lengthAttr(r, "val");
			break;
		case "footnotePr":
			n.footnoteProps = Me(r, t);
			break;
		case "endnotePr":
			n.endnoteProps = Me(r, t);
			break;
		case "autoHyphenation":
			n.autoHyphenation = t.boolAttr(r, "val");
			break;
		case "kinsoku":
			n.kinsoku = t.boolAttr(r, "val", !0);
			break;
		case "overflowPunct":
			n.overflowPunctuation = t.boolAttr(r, "val", !0);
			break;
		case "topLinePunct":
			n.topLinePunctuation = t.boolAttr(r, "val", !0);
			break;
		case "autoSpaceDE":
			n.autoSpaceDE = t.boolAttr(r, "val", !0);
			break;
		case "autoSpaceDN":
			n.autoSpaceDN = t.boolAttr(r, "val", !0);
			break;
		case "noLineBreaksAfter":
			n.noLineBreaksAfter = t.attr(r, "val") || r.textContent || "";
			break;
		case "noLineBreaksBefore":
			n.noLineBreaksBefore = t.attr(r, "val") || r.textContent || "";
			break;
		case "evenAndOddHeaders":
			n.evenAndOddHeaders = t.boolAttr(r, "val", !0);
			break;
		case "splitPgBreakAndParaMark":
			n.splitPageBreakAndParagraphMark = t.boolAttr(r, "val", !0);
			break;
		case "compat": for (let e of t.elements(r)) e.localName == "adjustLineHeightInTable" && (n.adjustLineHeightInTable = t.boolAttr(e, "val", !0));
	}
	return n;
}
var Nt = class extends I {
	constructor(e, t) {
		super(e, t);
	}
	parseXml(e) {
		this.settings = Mt(e, this._package.xmlParser);
	}
};
function Pt(e, t) {
	return t.elements(e, "property").map((e) => {
		let n = e.firstChild;
		return {
			formatId: t.attr(e, "fmtid"),
			name: t.attr(e, "name"),
			type: n.nodeName,
			value: n.textContent
		};
	});
}
var Ft = class extends I {
	parseXml(e) {
		this.props = Pt(e, this._package.xmlParser);
	}
}, It = class extends I {
	constructor(e, t, n) {
		super(e, t), this._documentParser = n;
	}
	parseXml(e) {
		this.comments = this._documentParser.parseComments(e), this.commentMap = w(this.comments, (e) => e.id);
	}
}, Lt = class extends I {
	constructor(e, t) {
		super(e, t), this.comments = [];
	}
	parseXml(e) {
		let t = this._package.xmlParser;
		for (let n of t.elements(e, "commentEx")) this.comments.push({
			paraId: t.attr(n, "paraId"),
			paraIdParent: t.attr(n, "paraIdParent"),
			done: t.boolAttr(n, "done")
		});
		this.commentMap = w(this.comments, (e) => e.paraId);
	}
}, z = {
	HEADER: 1,
	POLYBEZIER: 2,
	POLYGON: 3,
	POLYLINE: 4,
	POLYBEZIERTO: 5,
	POLYLINETO: 6,
	POLYPOLYLINE: 7,
	POLYPOLYGON: 8,
	SETWINDOWEXTEX: 9,
	SETWINDOWORGEX: 10,
	SETVIEWPORTEXTEX: 11,
	SETVIEWPORTORGEX: 12,
	EOF: 14,
	SETPIXELV: 15,
	SETBKMODE: 18,
	SETPOLYFILLMODE: 19,
	SETTEXTALIGN: 22,
	SETTEXTCOLOR: 24,
	SETBKCOLOR: 25,
	MOVETOEX: 27,
	SCALEVIEWPORTEXTEX: 31,
	SCALEWINDOWEXTEX: 32,
	SAVEDC: 33,
	RESTOREDC: 34,
	SETWORLDTRANSFORM: 35,
	MODIFYWORLDTRANSFORM: 36,
	SELECTOBJECT: 37,
	CREATEPEN: 38,
	CREATEBRUSHINDIRECT: 39,
	DELETEOBJECT: 40,
	ELLIPSE: 42,
	RECTANGLE: 43,
	ROUNDRECT: 44,
	ARC: 45,
	CHORD: 46,
	PIE: 47,
	LINETO: 54,
	ARCTO: 55,
	POLYDRAW: 56,
	BEGINPATH: 59,
	ENDPATH: 60,
	CLOSEFIGURE: 61,
	FILLPATH: 62,
	STROKEANDFILLPATH: 63,
	STROKEPATH: 64,
	BITBLT: 76,
	STRETCHBLT: 77,
	STRETCHDIBITS: 81,
	EXTCREATEFONTINDIRECTW: 82,
	EXTTEXTOUTA: 83,
	EXTTEXTOUTW: 84,
	POLYBEZIER16: 85,
	POLYGON16: 86,
	POLYLINE16: 87,
	POLYBEZIERTO16: 88,
	POLYLINETO16: 89,
	POLYPOLYLINE16: 90,
	POLYPOLYGON16: 91,
	POLYDRAW16: 92,
	EXTCREATEPEN: 95,
	POLYTEXTOUTA: 96,
	POLYTEXTOUTW: 97,
	SMALLTEXTOUT: 108,
	ALPHABLEND: 114,
	TRANSPARENTBLT: 116
}, Rt = {
	0: {
		type: "brush",
		color: "#ffffff"
	},
	1: {
		type: "brush",
		color: "#c0c0c0"
	},
	2: {
		type: "brush",
		color: "#808080"
	},
	3: {
		type: "brush",
		color: "#404040"
	},
	4: {
		type: "brush",
		color: "#000000"
	},
	5: {
		type: "brush",
		color: "none",
		nullBrush: !0
	},
	6: {
		type: "pen",
		color: "#ffffff",
		width: 1
	},
	7: {
		type: "pen",
		color: "#000000",
		width: 1
	},
	8: {
		type: "pen",
		color: "none",
		width: 0,
		nullPen: !0
	},
	18: {
		type: "brush",
		color: "#ffffff"
	},
	19: {
		type: "pen",
		color: "#000000",
		width: 1
	}
}, zt = {
	m11: 1,
	m12: 0,
	m21: 0,
	m22: 1,
	dx: 0,
	dy: 0
};
function Bt(e) {
	if (!e || e.length < 48) return !1;
	let t = Jt(e);
	return t.getUint32(0, !0) == z.HEADER && t.getUint32(40, !0) == 1179469088;
}
function Vt(e, t) {
	let n = Ht(e, t);
	return n ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(n)}` : null;
}
function Ht(e, t = {}) {
	if (!Bt(e)) return null;
	let n = Jt(e), r = n.getUint32(4, !0), i = Yt(n, 8), a = Yt(n, 24), o = n.byteLength >= 52 ? n.getUint32(48, !0) : 0, s = Math.max(1, i.right - i.left), c = Math.max(1, i.bottom - i.top), l = Math.max(1, a.right - a.left) / 100, u = Math.max(1, a.bottom - a.top) / 100, d = Ut(), f = [], p = {}, m = [], h = Math.max(8, r || 108), g = 1, _ = "", v = !1, y = 0, b = t.maxRecords ?? Math.max(1e4, o + 100), x = t.maxShapes ?? 5e4, S = (e) => {
		!e || y >= x || (m.push(e), y++);
	}, C = (e) => {
		e && (_ += (_ ? " " : "") + e);
	};
	for (; h + 8 <= n.byteLength && g++ <= b;) {
		let e = n.getUint32(h, !0), t = n.getUint32(h + 4, !0);
		if (t < 8 || h + t > n.byteLength) break;
		switch (e) {
			case z.EOF:
				h += t, g = b + 1;
				break;
			case z.SETWINDOWEXTEX:
				d.windowExt = Xt(n, h + 8);
				break;
			case z.SETWINDOWORGEX:
				d.windowOrg = B(n, h + 8);
				break;
			case z.SETVIEWPORTEXTEX:
				d.viewportExt = Xt(n, h + 8);
				break;
			case z.SETVIEWPORTORGEX:
				d.viewportOrg = B(n, h + 8);
				break;
			case z.SCALEWINDOWEXTEX:
				d.windowExt &&= tn(n, h, d.windowExt);
				break;
			case z.SCALEVIEWPORTEXTEX:
				d.viewportExt &&= tn(n, h, d.viewportExt);
				break;
			case z.SETWORLDTRANSFORM:
				d.world = Qt(n, h + 8);
				break;
			case z.MODIFYWORLDTRANSFORM: {
				let e = Qt(n, h + 8), t = n.getUint32(h + 32, !0);
				t == 1 ? d.world = qt(zt) : t == 2 ? d.world = $t(e, d.world) : t == 3 ? d.world = $t(d.world, e) : t == 4 && (d.world = e);
				break;
			}
			case z.SAVEDC:
				f.push(Wt(d));
				break;
			case z.RESTOREDC: {
				let e = n.getInt32(h + 8, !0);
				if (e < 0) for (let t = 0; t < Math.min(-e, f.length); t++) Object.assign(d, f.pop());
				else if (e > 0 && e <= f.length) {
					let t = f[e - 1];
					f.length = e - 1, Object.assign(d, Wt(t));
				}
				break;
			}
			case z.SETBKMODE:
				d.bkMode = n.getUint32(h + 8, !0);
				break;
			case z.SETPOLYFILLMODE:
				d.polyFillMode = n.getUint32(h + 8, !0);
				break;
			case z.SETTEXTALIGN:
				d.textAlign = n.getUint32(h + 8, !0);
				break;
			case z.SETTEXTCOLOR:
				d.textColor = nn(n.getUint32(h + 8, !0));
				break;
			case z.SETBKCOLOR:
				d.bkColor = nn(n.getUint32(h + 8, !0));
				break;
			case z.CREATEPEN: {
				let e = n.getUint32(h + 8, !0), t = n.getUint32(h + 12, !0), r = Math.abs(n.getInt32(h + 16, !0));
				p[e] = {
					type: "pen",
					color: nn(n.getUint32(h + 24, !0)),
					width: r || 1,
					nullPen: (t & 15) == 5
				};
				break;
			}
			case z.EXTCREATEPEN: {
				let e = n.getUint32(h + 8, !0), t = n.getUint32(h + 28, !0), r = Math.abs(n.getInt32(h + 32, !0)), i = n.getUint32(h + 36, !0);
				p[e] = {
					type: "pen",
					color: nn(n.getUint32(h + 40, !0)),
					width: r || 1,
					nullPen: (t & 15) == 5 || i == 1
				};
				break;
			}
			case z.CREATEBRUSHINDIRECT: {
				let e = n.getUint32(h + 8, !0), t = n.getUint32(h + 12, !0);
				p[e] = {
					type: "brush",
					color: nn(n.getUint32(h + 16, !0)),
					nullBrush: t == 1
				};
				break;
			}
			case z.EXTCREATEFONTINDIRECTW: {
				let e = n.getUint32(h + 8, !0);
				p[e] = _n(n, h + 12, t - 12);
				break;
			}
			case z.SELECTOBJECT: {
				let e = n.getUint32(h + 8, !0), t = e & 2147483648 ? Rt[e & 2147483647] : p[e];
				t?.type == "pen" ? d.pen = Gt(t) : t?.type == "brush" ? d.brush = Kt(t) : t?.type == "font" && (d.font = { ...t });
				break;
			}
			case z.DELETEOBJECT:
				delete p[n.getUint32(h + 8, !0)];
				break;
			case z.BEGINPATH:
				v = !0, _ = "";
				break;
			case z.ENDPATH:
				v = !1;
				break;
			case z.CLOSEFIGURE:
				C("Z");
				break;
			case z.MOVETOEX: {
				let e = V(d, B(n, h + 8));
				d.currentPoint = e, v && C(`M ${H(e.x)} ${H(e.y)}`);
				break;
			}
			case z.LINETO: {
				let e = V(d, B(n, h + 8));
				v ? C(`L ${H(e.x)} ${H(e.y)}`) : S(`<path d="M ${H(d.currentPoint.x)} ${H(d.currentPoint.y)} L ${H(e.x)} ${H(e.y)}" ${on(d, !1, !0)}/>`), d.currentPoint = e;
				break;
			}
			case z.POLYLINE:
			case z.POLYGON:
				ln(n, h, e == z.POLYGON, !1, v, d, C, S);
				break;
			case z.POLYLINETO:
				ln(n, h, !1, !0, v, d, C, S);
				break;
			case z.POLYLINE16:
			case z.POLYGON16:
				cn(n, h, e == z.POLYGON16, !1, v, d, C, S);
				break;
			case z.POLYLINETO16:
				cn(n, h, !1, !0, v, d, C, S);
				break;
			case z.POLYBEZIER:
				dn(n, h, !1, !1, v, d, C, S);
				break;
			case z.POLYBEZIERTO:
				dn(n, h, !1, !0, v, d, C, S);
				break;
			case z.POLYBEZIER16:
				dn(n, h, !0, !1, v, d, C, S);
				break;
			case z.POLYBEZIERTO16:
				dn(n, h, !0, !0, v, d, C, S);
				break;
			case z.POLYPOLYLINE:
			case z.POLYPOLYGON:
				fn(n, h, e == z.POLYPOLYGON, !1, v, d, C, S);
				break;
			case z.POLYPOLYLINE16:
			case z.POLYPOLYGON16:
				fn(n, h, e == z.POLYPOLYGON16, !0, v, d, C, S);
				break;
			case z.POLYDRAW:
				pn(n, h, !1, v, d, C, S);
				break;
			case z.POLYDRAW16:
				pn(n, h, !0, v, d, C, S);
				break;
			case z.RECTANGLE:
				mn(n, h, d, S, !1);
				break;
			case z.ELLIPSE:
				hn(n, h, d, S);
				break;
			case z.ROUNDRECT:
				mn(n, h, d, S, !0);
				break;
			case z.ARC:
			case z.ARCTO:
			case z.CHORD:
			case z.PIE:
				gn(n, h, e, v, d, C, S);
				break;
			case z.FILLPATH:
				sn(_, d, S, !0, !1), _ = "";
				break;
			case z.STROKEPATH:
				sn(_, d, S, !1, !0), _ = "";
				break;
			case z.STROKEANDFILLPATH:
				sn(_, d, S, !0, !0), _ = "";
				break;
			case z.EXTTEXTOUTA:
			case z.EXTTEXTOUTW:
				vn(n, h, t, d, S, e == z.EXTTEXTOUTW);
				break;
			case z.POLYTEXTOUTA:
			case z.POLYTEXTOUTW:
				yn(n, h, t, d, S, e == z.POLYTEXTOUTW);
				break;
			case z.SMALLTEXTOUT:
				bn(n, h, t, d, S);
				break;
			case z.SETPIXELV:
				Dn(n, h, d, S);
				break;
			case z.BITBLT:
			case z.STRETCHBLT:
			case z.STRETCHDIBITS:
			case z.ALPHABLEND:
			case z.TRANSPARENTBLT: On(n, h, t, e, d, S);
		}
		h += t;
	}
	if (_ && sn(_, d, S, !0, !0), !m.length) {
		let t = jn(e, i);
		t.length && m.push(...t);
	}
	return m.length ? `<svg xmlns="http://www.w3.org/2000/svg" width="${H(l)}mm" height="${H(u)}mm" viewBox="${H(i.left)} ${H(i.top)} ${H(s)} ${H(c)}" preserveAspectRatio="xMidYMid meet" data-docx-metafile="emf">${m.join("")}</svg>` : Vn(s, c, i, l, u, "Unsupported EMF image");
}
function Ut() {
	return {
		world: qt(zt),
		windowOrg: {
			x: 0,
			y: 0
		},
		windowExt: null,
		viewportOrg: {
			x: 0,
			y: 0
		},
		viewportExt: null,
		pen: {
			type: "pen",
			color: "#000000",
			width: 1
		},
		brush: {
			type: "brush",
			color: "#ffffff",
			nullBrush: !0
		},
		font: null,
		textColor: "#000000",
		bkColor: "#ffffff",
		bkMode: 1,
		polyFillMode: 1,
		textAlign: 0,
		currentPoint: {
			x: 0,
			y: 0
		}
	};
}
function Wt(e) {
	return {
		world: qt(e.world),
		windowOrg: { ...e.windowOrg },
		windowExt: e.windowExt ? { ...e.windowExt } : null,
		viewportOrg: { ...e.viewportOrg },
		viewportExt: e.viewportExt ? { ...e.viewportExt } : null,
		pen: Gt(e.pen),
		brush: Kt(e.brush),
		font: e.font ? { ...e.font } : null,
		textColor: e.textColor,
		bkColor: e.bkColor,
		bkMode: e.bkMode,
		polyFillMode: e.polyFillMode,
		textAlign: e.textAlign,
		currentPoint: { ...e.currentPoint }
	};
}
function Gt(e) {
	return { ...e };
}
function Kt(e) {
	return { ...e };
}
function qt(e) {
	return { ...e };
}
function Jt(e) {
	return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function Yt(e, t) {
	return {
		left: e.getInt32(t, !0),
		top: e.getInt32(t + 4, !0),
		right: e.getInt32(t + 8, !0),
		bottom: e.getInt32(t + 12, !0)
	};
}
function B(e, t) {
	return {
		x: e.getInt32(t, !0),
		y: e.getInt32(t + 4, !0)
	};
}
function Xt(e, t) {
	return B(e, t);
}
function Zt(e, t) {
	return {
		x: e.getInt16(t, !0),
		y: e.getInt16(t + 2, !0)
	};
}
function Qt(e, t) {
	return {
		m11: e.getFloat32(t, !0),
		m12: e.getFloat32(t + 4, !0),
		m21: e.getFloat32(t + 8, !0),
		m22: e.getFloat32(t + 12, !0),
		dx: e.getFloat32(t + 16, !0),
		dy: e.getFloat32(t + 20, !0)
	};
}
function $t(e, t) {
	return {
		m11: e.m11 * t.m11 + e.m12 * t.m21,
		m12: e.m11 * t.m12 + e.m12 * t.m22,
		m21: e.m21 * t.m11 + e.m22 * t.m21,
		m22: e.m21 * t.m12 + e.m22 * t.m22,
		dx: e.dx * t.m11 + e.dy * t.m21 + t.dx,
		dy: e.dx * t.m12 + e.dy * t.m22 + t.dy
	};
}
function V(e, t) {
	let n = e.world, r = t.x * n.m11 + t.y * n.m21 + n.dx, i = t.x * n.m12 + t.y * n.m22 + n.dy;
	return e.windowExt && e.viewportExt && e.windowExt.x && e.windowExt.y && (r = (r - e.windowOrg.x) * e.viewportExt.x / e.windowExt.x + e.viewportOrg.x, i = (i - e.windowOrg.y) * e.viewportExt.y / e.windowExt.y + e.viewportOrg.y), {
		x: r,
		y: i
	};
}
function en(e) {
	let t = Math.hypot(e.world.m11, e.world.m12), n = Math.hypot(e.world.m21, e.world.m22);
	e.windowExt && e.viewportExt && e.windowExt.x && e.windowExt.y && (t *= Math.abs(e.viewportExt.x / e.windowExt.x), n *= Math.abs(e.viewportExt.y / e.windowExt.y));
	let r = (t + n) / 2;
	return Number.isFinite(r) && r > 0 ? r : 1;
}
function tn(e, t, n) {
	let r = e.getInt32(t + 8, !0), i = e.getInt32(t + 12, !0), a = e.getInt32(t + 16, !0), o = e.getInt32(t + 20, !0);
	return {
		x: i ? n.x * r / i : n.x,
		y: o ? n.y * a / o : n.y
	};
}
function nn(e) {
	let t = e & 255, n = e >> 8 & 255, r = e >> 16 & 255;
	return `#${rn(t)}${rn(n)}${rn(r)}`;
}
function rn(e) {
	return Math.max(0, Math.min(255, e | 0)).toString(16).padStart(2, "0");
}
function H(e) {
	return Number.isFinite(e) ? `${Math.round(e * 1e3) / 1e3}` : "0";
}
function an(e) {
	return `${e ?? ""}`.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function on(e, t, n) {
	let r = [];
	if (t && !e.brush.nullBrush ? (r.push(`fill="${e.brush.color}"`), r.push(`fill-rule="${e.polyFillMode == 2 ? "nonzero" : "evenodd"}"`)) : r.push("fill=\"none\""), n && !e.pen.nullPen) {
		let t = en(e), n = e.pen.width == 0 ? 1 : Math.max(.35, e.pen.width * t);
		r.push(`stroke="${e.pen.color}"`), r.push(`stroke-width="${H(n)}"`), r.push("stroke-linecap=\"square\""), r.push("stroke-linejoin=\"miter\"");
	} else r.push("stroke=\"none\"");
	return r.join(" ");
}
function sn(e, t, n, r, i) {
	e && n(`<path d="${e}" ${on(t, r, i)}/>`);
}
function cn(e, t, n, r, i, a, o, s) {
	let c = e.getUint32(t + 24, !0);
	if (!c || t + 28 + c * 4 > e.byteLength) return;
	let l = [];
	for (let n = 0; n < c; n++) l.push(V(a, Zt(e, t + 28 + n * 4)));
	un(l, n, r, i, a, o, s);
}
function ln(e, t, n, r, i, a, o, s) {
	let c = e.getUint32(t + 24, !0);
	if (!c || t + 28 + c * 8 > e.byteLength) return;
	let l = [];
	for (let n = 0; n < c; n++) l.push(V(a, B(e, t + 28 + n * 8)));
	un(l, n, r, i, a, o, s);
}
function un(e, t, n, r, i, a, o) {
	if (!e.length) return;
	let s = r && n ? "" : n ? `M ${H(i.currentPoint.x)} ${H(i.currentPoint.y)}` : `M ${H(e[0].x)} ${H(e[0].y)}`, c = +!n;
	for (let t = c; t < e.length; t++) s += ` L ${H(e[t].x)} ${H(e[t].y)}`;
	t && (s += " Z"), i.currentPoint = e[e.length - 1], r ? a(s.trim()) : o(`<path d="${s.trim()}" ${on(i, t, !0)}/>`);
}
function dn(e, t, n, r, i, a, o, s) {
	let c = e.getUint32(t + 24, !0), l = n ? 4 : 8;
	if (!c || t + 28 + c * l > e.byteLength) return;
	let u = [];
	for (let r = 0; r < c; r++) {
		let i = n ? Zt(e, t + 28 + r * l) : B(e, t + 28 + r * l);
		u.push(V(a, i));
	}
	let d = i && r ? "" : r ? `M ${H(a.currentPoint.x)} ${H(a.currentPoint.y)}` : `M ${H(u[0].x)} ${H(u[0].y)}`, f = r ? a.currentPoint : u[0], p = +!r;
	for (let e = p; e + 2 < u.length; e += 3) {
		let t = u[e], n = u[e + 1], r = u[e + 2];
		d += ` C ${H(t.x)} ${H(t.y)} ${H(n.x)} ${H(n.y)} ${H(r.x)} ${H(r.y)}`, f = r;
	}
	a.currentPoint = f, i ? o(d.trim()) : s(`<path d="${d.trim()}" ${on(a, !1, !0)}/>`);
}
function fn(e, t, n, r, i, a, o, s) {
	let c = e.getUint32(t + 24, !0), l = e.getUint32(t + 28, !0), u = t + 32, d = u + c * 4, f = r ? 4 : 8;
	if (!c || !l || d + l * f > e.byteLength) return;
	let p = 0;
	for (let t = 0; t < c; t++) {
		let c = e.getUint32(u + t * 4, !0);
		if (!c || p + c > l) break;
		let m = [];
		for (let t = 0; t < c; t++) {
			let n = d + (p + t) * f, i = r ? Zt(e, n) : B(e, n);
			m.push(V(a, i));
		}
		un(m, n, !1, i, a, o, s), p += c;
	}
}
function pn(e, t, n, r, i, a, o) {
	let s = e.getUint32(t + 24, !0), c = n ? 4 : 8, l = t + 28, u = l + s * c;
	if (!s || u + s > e.byteLength) return;
	let d = [];
	for (let t = 0; t < s; t++) {
		let r = l + t * c, a = n ? Zt(e, r) : B(e, r);
		d.push(V(i, a));
	}
	let f = "", p = 0;
	for (; p < s;) {
		let t = e.getUint8(u + p), n = t & 6;
		n == 6 ? (f += ` M ${H(d[p].x)} ${H(d[p].y)}`, i.currentPoint = d[p], p++) : n == 2 ? (f += ` L ${H(d[p].x)} ${H(d[p].y)}`, i.currentPoint = d[p], p++) : n == 4 && p + 2 < s ? (f += ` C ${H(d[p].x)} ${H(d[p].y)} ${H(d[p + 1].x)} ${H(d[p + 1].y)} ${H(d[p + 2].x)} ${H(d[p + 2].y)}`, i.currentPoint = d[p + 2], p += 3) : p++, t & 1 && (f += " Z");
	}
	f = f.trim(), f && (r ? a(f) : o(`<path d="${f}" ${on(i, !1, !0)}/>`));
}
function mn(e, t, n, r, i) {
	let a = Yt(e, t + 8), o = V(n, {
		x: a.left,
		y: a.top
	}), s = V(n, {
		x: a.right,
		y: a.bottom
	}), c = Math.min(o.x, s.x), l = Math.min(o.y, s.y), u = Math.abs(s.x - o.x), d = Math.abs(s.y - o.y), f = i ? ` rx="${H(Math.min(u, d) / 8)}" ry="${H(Math.min(u, d) / 8)}"` : "";
	r(`<rect x="${H(c)}" y="${H(l)}" width="${H(u)}" height="${H(d)}"${f} ${on(n, !0, !0)}/>`);
}
function hn(e, t, n, r) {
	let i = Yt(e, t + 8), a = V(n, {
		x: i.left,
		y: i.top
	}), o = V(n, {
		x: i.right,
		y: i.bottom
	}), s = (a.x + o.x) / 2, c = (a.y + o.y) / 2, l = Math.abs(o.x - a.x) / 2, u = Math.abs(o.y - a.y) / 2;
	r(`<ellipse cx="${H(s)}" cy="${H(c)}" rx="${H(l)}" ry="${H(u)}" ${on(n, !0, !0)}/>`);
}
function gn(e, t, n, r, i, a, o) {
	let s = Yt(e, t + 8), c = B(e, t + 24), l = B(e, t + 32), u = (s.left + s.right) / 2, d = (s.top + s.bottom) / 2, f = Math.abs(s.right - s.left) / 2, p = Math.abs(s.bottom - s.top) / 2;
	if (!f || !p) return;
	let m = Math.atan2(c.y - d, c.x - u), h = Math.atan2(l.y - d, l.x - u), g = h - m;
	g <= 0 && (g += Math.PI * 2);
	let _ = +(g > Math.PI), v = V(i, {
		x: u + Math.cos(m) * f,
		y: d + Math.sin(m) * p
	}), y = V(i, {
		x: u + Math.cos(h) * f,
		y: d + Math.sin(h) * p
	}), b = V(i, {
		x: u,
		y: d
	}), x = V(i, {
		x: u + f,
		y: d
	}), S = V(i, {
		x: u,
		y: d + p
	}), C = Math.max(.01, Math.abs(x.x - b.x) || Math.abs(S.x - b.x)), w = Math.max(.01, Math.abs(S.y - b.y) || Math.abs(x.y - b.y)), T = `A ${H(C)} ${H(w)} 0 ${_} 1 ${H(y.x)} ${H(y.y)}`, E = `M ${H(v.x)} ${H(v.y)} ${T}`, D = !1;
	n == z.CHORD ? (E += " Z", D = !0) : n == z.PIE && (E += ` L ${H(b.x)} ${H(b.y)} Z`, D = !0), n == z.ARCTO && (i.currentPoint = y), r ? a(E) : o(`<path d="${E}" ${on(i, D, !0)}/>`);
}
function _n(e, t, n) {
	let r = n >= 4 ? e.getInt32(t, !0) : 12, i = n >= 20 ? e.getInt32(t + 16, !0) : 400, a = n >= 21 && e.getUint8(t + 20) != 0, o = n >= 22 && e.getUint8(t + 21) != 0, s = "", c = t + 28, l = Math.max(0, Math.min(64, n - 28));
	for (let t = 0; t + 1 < l; t += 2) {
		let n = e.getUint16(c + t, !0);
		if (!n) break;
		s += String.fromCharCode(n);
	}
	return {
		type: "font",
		family: s,
		size: Math.abs(r) || 12,
		weight: i,
		italic: a,
		underline: o
	};
}
function vn(e, t, n, r, i, a) {
	if (n < 76) return;
	let o = V(r, B(e, t + 36)), s = e.getUint32(t + 44, !0), c = e.getUint32(t + 48, !0);
	!s || c <= 0 || c + s * (a ? 2 : 1) > n || En(a ? xn(e, t + c, s) : Sn(new Uint8Array(e.buffer, e.byteOffset + t + c, s)), o, r, i);
}
function yn(e, t, n, r, i, a) {
	if (n < 40) return;
	let o = e.getUint32(t + 36, !0), s = t + 40;
	for (let c = 0; c < o && s + 40 <= t + n; c++, s += 40) {
		let o = V(r, B(e, s)), c = e.getUint32(s + 8, !0), l = e.getUint32(s + 12, !0);
		!c || !l || l + c * (a ? 2 : 1) > n || En(a ? xn(e, t + l, c) : Sn(new Uint8Array(e.buffer, e.byteOffset + t + l, c)), o, r, i);
	}
}
function bn(e, t, n, r, i) {
	if (n < 36) return;
	let a = V(r, B(e, t + 8)), o = e.getUint32(t + 16, !0), s = e.getUint32(t + 20, !0) & 512 ? 40 : 28;
	!o || s + o > n || En(Sn(new Uint8Array(e.buffer, e.byteOffset + t + s, o)), a, r, i);
}
function xn(e, t, n) {
	let r = "";
	for (let i = 0; i < n; i++) {
		let n = e.getUint16(t + i * 2, !0);
		n && (r += String.fromCharCode(n));
	}
	return r;
}
function Sn(e) {
	if (!e.length) return "";
	let t = globalThis.TextDecoder;
	if (t) try {
		return new t("gb18030").decode(e).replace(/\0+$/g, "");
	} catch {
		try {
			return new t("windows-1252").decode(e).replace(/\0+$/g, "");
		} catch {}
	}
	let n = "";
	for (let t of e) t && (n += String.fromCharCode(t));
	return n;
}
function Cn(e, t) {
	let n = e.font, r = Math.max(1, (n?.size ?? 12) * en(e));
	return [
		`x="${H(t.x)}"`,
		`y="${H(t.y)}"`,
		`fill="${e.textColor}"`,
		`font-size="${H(r)}"`,
		n?.family ? `font-family="${an(n.family)}"` : "",
		n?.weight ? `font-weight="${n.weight >= 600 ? "bold" : "normal"}"` : "",
		n?.italic ? "font-style=\"italic\"" : "",
		n?.underline ? "text-decoration=\"underline\"" : "",
		wn(e),
		Tn(e)
	].filter(Boolean).join(" ");
}
function wn(e) {
	let t = e.textAlign & 6;
	return t == 6 ? "text-anchor=\"middle\"" : t == 2 ? "text-anchor=\"end\"" : "";
}
function Tn(e) {
	let t = e.textAlign & 24;
	return t == 0 ? "dominant-baseline=\"text-before-edge\"" : t == 8 ? "dominant-baseline=\"text-after-edge\"" : "";
}
function En(e, t, n, r) {
	e && r(`<text ${Cn(n, t)}>${an(e)}</text>`);
}
function Dn(e, t, n, r) {
	if (t + 20 > e.byteLength) return;
	let i = V(n, B(e, t + 8)), a = nn(e.getUint32(t + 16, !0));
	r(`<rect x="${H(i.x)}" y="${H(i.y)}" width="1" height="1" fill="${a}" stroke="none"/>`);
}
function On(e, t, n, r, i, a) {
	let o = 0, s = 0, c = 0, l = 0, u = 0, d = 0, f = 0, p = 0;
	if (r == z.STRETCHDIBITS) {
		if (n < 80) return;
		o = e.getInt32(t + 24, !0), s = e.getInt32(t + 28, !0), u = e.getUint32(t + 48, !0), d = e.getUint32(t + 52, !0), f = e.getUint32(t + 56, !0), p = e.getUint32(t + 60, !0), c = e.getInt32(t + 72, !0), l = e.getInt32(t + 76, !0);
	} else {
		if (n < 100) return;
		o = e.getInt32(t + 24, !0), s = e.getInt32(t + 28, !0), c = e.getInt32(t + 32, !0), l = e.getInt32(t + 36, !0), u = e.getUint32(t + 84, !0), d = e.getUint32(t + 88, !0), f = e.getUint32(t + 92, !0), p = e.getUint32(t + 96, !0);
	}
	if (!u || !d || !f || !p || u + d > n || f + p > n) return;
	let m = kn(e, t, u, d, f, p);
	if (!m) return;
	let h = V(i, {
		x: o,
		y: s
	}), g = V(i, {
		x: o + c,
		y: s + l
	}), _ = Math.min(h.x, g.x), v = Math.min(h.y, g.y), y = Math.abs(g.x - h.x), b = Math.abs(g.y - h.y);
	a(`<image x="${H(_)}" y="${H(v)}" width="${H(y)}" height="${H(b)}" href="${m}" preserveAspectRatio="none"/>`);
}
function kn(e, t, n, r, i, a) {
	let o = t + n, s = t + i;
	if (r < 4 || o + r > e.byteLength || s + a > e.byteLength) return null;
	let c = e.getUint32(o, !0) >= 40 && r >= 20 ? e.getUint32(o + 16, !0) : 0, l = new Uint8Array(e.buffer, e.byteOffset + s, a);
	if (c == 4) return `data:image/jpeg;base64,${Bn(l)}`;
	if (c == 5) return `data:image/png;base64,${Bn(l)}`;
	let u = new Uint8Array(r + a);
	return u.set(new Uint8Array(e.buffer, e.byteOffset + o, r), 0), u.set(l, r), An(u, r);
}
function An(e, t) {
	if (!e?.length || t <= 0 || t > e.length) return null;
	let n = 14 + e.length, r = 14 + t, i = new Uint8Array(n);
	return i[0] = 66, i[1] = 77, zn(i, 2, n), zn(i, 10, r), i.set(e, 14), `data:image/bmp;base64,${Bn(i)}`;
}
function jn(e, t) {
	let n = Mn(e);
	if (!n) return [];
	let r = Math.max(1, t.right - t.left), i = Math.max(1, t.bottom - t.top);
	return [`<image x="${H(t.left)}" y="${H(t.top)}" width="${H(r)}" height="${H(i)}" href="${n}" preserveAspectRatio="xMidYMid meet"/>`];
}
function Mn(e) {
	let t = Nn(e);
	if (t) return `data:image/png;base64,${Bn(t)}`;
	let n = Pn(e);
	if (n) return `data:image/jpeg;base64,${Bn(n)}`;
	let r = Fn(e);
	return r ? `data:image/bmp;base64,${Bn(r)}` : null;
}
function Nn(e) {
	let t = [
		137,
		80,
		78,
		71,
		13,
		10,
		26,
		10
	];
	for (let n = 0; n + t.length + 12 <= e.length; n++) {
		if (!In(e, t, n)) continue;
		let r = n + 8;
		for (; r + 12 <= e.length;) {
			let t = Ln(e, r), i = String.fromCharCode(e[r + 4], e[r + 5], e[r + 6], e[r + 7]);
			if (r += 12 + t, r > e.length) break;
			if (i == "IEND") return e.subarray(n, r);
		}
	}
	return null;
}
function Pn(e) {
	for (let t = 0; t + 4 < e.length; t++) if (e[t] == 255 && e[t + 1] == 216 && e[t + 2] == 255) {
		for (let n = t + 4; n + 1 < e.length; n++) if (e[n] == 255 && e[n + 1] == 217) return e.subarray(t, n + 2);
	}
	return null;
}
function Fn(e) {
	for (let t = 0; t + 14 < e.length; t++) {
		if (e[t] != 66 || e[t + 1] != 77) continue;
		let n = Rn(e, t + 2);
		if (n > 14 && t + n <= e.length) return e.subarray(t, t + n);
	}
	return null;
}
function In(e, t, n) {
	for (let r = 0; r < t.length; r++) if (e[n + r] != t[r]) return !1;
	return !0;
}
function Ln(e, t) {
	return (e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3]) >>> 0;
}
function Rn(e, t) {
	return (e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24) >>> 0;
}
function zn(e, t, n) {
	e[t] = n & 255, e[t + 1] = n >> 8 & 255, e[t + 2] = n >> 16 & 255, e[t + 3] = n >> 24 & 255;
}
function Bn(e) {
	let t = "", n = 32768;
	for (let r = 0; r < e.length; r += n) t += String.fromCharCode(...e.subarray(r, r + n));
	if (typeof btoa == "function") return btoa(t);
	let r = globalThis.Buffer;
	return r ? r.from(e).toString("base64") : t;
}
function Vn(e, t, n, r, i, a) {
	return `<svg xmlns="http://www.w3.org/2000/svg" width="${H(r)}mm" height="${H(i)}mm" viewBox="${H(n.left)} ${H(n.top)} ${H(e)} ${H(t)}" preserveAspectRatio="xMidYMid meet" data-docx-metafile="emf"><rect x="${H(n.left)}" y="${H(n.top)}" width="${H(e)}" height="${H(t)}" fill="none" stroke="#999" stroke-width="1"/><text x="${H(n.left + e / 2)}" y="${H(n.top + t / 2)}" text-anchor="middle" font-size="12" fill="#666">${an(a)}</text></svg>`;
}
var Hn = 2596720087, U = {
	EOF: 0,
	SETBKMODE: 258,
	SETBKCOLOR: 513,
	SETTEXTCOLOR: 521,
	SETTEXTALIGN: 302,
	SETWINDOWORG: 523,
	SETWINDOWEXT: 524,
	SETVIEWPORTORG: 525,
	SETVIEWPORTEXT: 526,
	MOVETO: 532,
	LINETO: 531,
	POLYLINE: 805,
	POLYGON: 804,
	RECTANGLE: 1051,
	ELLIPSE: 1048,
	CREATEPENINDIRECT: 762,
	CREATEBRUSHINDIRECT: 764,
	CREATEFONTINDIRECT: 763,
	SELECTOBJECT: 301,
	DELETEOBJECT: 496,
	TEXTOUT: 1313,
	EXTTEXTOUT: 2610
}, Un = {
	0: {
		type: "brush",
		color: "#ffffff"
	},
	1: {
		type: "brush",
		color: "#c0c0c0"
	},
	2: {
		type: "brush",
		color: "#808080"
	},
	3: {
		type: "brush",
		color: "#404040"
	},
	4: {
		type: "brush",
		color: "#000000"
	},
	5: {
		type: "brush",
		color: "none",
		nullBrush: !0
	},
	6: {
		type: "pen",
		color: "#ffffff",
		width: 1
	},
	7: {
		type: "pen",
		color: "#000000",
		width: 1
	},
	8: {
		type: "pen",
		color: "none",
		width: 0,
		nullPen: !0
	},
	18: {
		type: "brush",
		color: "#ffffff"
	},
	19: {
		type: "pen",
		color: "#000000",
		width: 1
	}
};
function Wn(e) {
	if (!e || e.length < 22) return !1;
	let t = Sr(e);
	return t.getUint32(0, !0) == Hn || e.length >= 18 && t.getUint16(0, !0) == 1 && t.getUint16(2, !0) == 9;
}
function Gn(e, t) {
	let n = Kn(e, t);
	return n ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(n)}` : null;
}
function Kn(e, t = {}) {
	if (!Wn(e)) return null;
	let n = Sr(e), r = 0, i = {
		left: 0,
		top: 0,
		right: 1e3,
		bottom: 1e3
	}, a = 100, o = 100;
	if (n.getUint32(0, !0) == Hn && n.byteLength >= 22) {
		i = {
			left: n.getInt16(6, !0),
			top: n.getInt16(8, !0),
			right: n.getInt16(10, !0),
			bottom: n.getInt16(12, !0)
		};
		let e = Math.max(1, n.getUint16(14, !0) || 1440);
		a = Math.max(1, i.right - i.left) / e * 25.4, o = Math.max(1, i.bottom - i.top) / e * 25.4, r = 22;
	}
	if (r + 18 > n.byteLength) return null;
	let s = n.getUint32(r + 6, !0), c = Math.max(1, n.getUint16(r + 10, !0) || 16), l = s > 0 ? s * 2 : n.byteLength;
	r += 18;
	let u = Math.max(1, i.right - i.left), d = Math.max(1, i.bottom - i.top), f = qn(i), p = Array(c).fill(null), m = [], h = 0, g = 0, _ = t.maxRecords ?? 1e4, v = t.maxShapes ?? 5e4, y = Math.min(n.byteLength, l), b = (e) => {
		!e || h >= v || (m.push(e), h++);
	};
	for (; r + 6 <= y && g++ < _;) {
		let e = n.getUint32(r, !0), t = n.getUint16(r + 4, !0), i = r + e * 2;
		if (e < 3 || i > n.byteLength) break;
		let s = r + 6;
		switch (t) {
			case U.EOF:
				r = y;
				break;
			case U.SETBKMODE:
				f.bkMode = G(n, s);
				break;
			case U.SETBKCOLOR:
				f.bkColor = br(gr(n, s));
				break;
			case U.SETTEXTCOLOR:
				f.textColor = br(gr(n, s));
				break;
			case U.SETTEXTALIGN:
				f.textAlign = W(n, s);
				break;
			case U.SETWINDOWORG:
				f.windowOrg = mr(n, s);
				break;
			case U.SETWINDOWEXT:
				f.windowExt = mr(n, s), a && o || (a = Math.max(1, Math.abs(f.windowExt.x)) / 100, o = Math.max(1, Math.abs(f.windowExt.y)) / 100);
				break;
			case U.SETVIEWPORTORG:
				f.viewportOrg = mr(n, s);
				break;
			case U.SETVIEWPORTEXT:
				f.viewportExt = mr(n, s);
				break;
			case U.CREATEPENINDIRECT:
				cr(p, Qn(n, s, i));
				break;
			case U.CREATEBRUSHINDIRECT:
				cr(p, $n(n, s, i));
				break;
			case U.CREATEFONTINDIRECT:
				cr(p, er(n, s, i));
				break;
			case U.SELECTOBJECT: {
				let e = W(n, s), t = e >= 32768 ? Un[e & 32767] : p[e];
				t?.type == "pen" ? f.pen = { ...t } : t?.type == "brush" ? f.brush = { ...t } : t?.type == "font" && (f.font = { ...t });
				break;
			}
			case U.DELETEOBJECT: {
				let e = W(n, s);
				e < p.length && (p[e] = null);
				break;
			}
			case U.MOVETO:
				f.currentPoint = Jn(f, mr(n, s));
				break;
			case U.LINETO: {
				let e = Jn(f, mr(n, s));
				b(`<path d="M ${K(f.currentPoint.x)} ${K(f.currentPoint.y)} L ${K(e.x)} ${K(e.y)}" ${dr(f)}/>`), f.currentPoint = e;
				break;
			}
			case U.POLYLINE:
			case U.POLYGON:
				tr(n, s, i, t == U.POLYGON, f, b);
				break;
			case U.RECTANGLE:
				nr(n, s, f, b, !1);
				break;
			case U.ELLIPSE:
				nr(n, s, f, b, !0);
				break;
			case U.TEXTOUT:
				rr(n, s, i, f, b);
				break;
			case U.EXTTEXTOUT: ir(n, s, i, f, b);
		}
		r = i;
	}
	return m.length ? `<svg xmlns="http://www.w3.org/2000/svg" width="${K(a)}mm" height="${K(o)}mm" viewBox="${K(i.left)} ${K(i.top)} ${K(u)} ${K(d)}" preserveAspectRatio="xMidYMid meet" data-docx-metafile="wmf">${m.join("")}</svg>` : Tr(u, d, i, a, o, "Unsupported WMF image");
}
function qn(e) {
	return {
		windowOrg: {
			x: e.left,
			y: e.top
		},
		windowExt: {
			x: Math.max(1, e.right - e.left),
			y: Math.max(1, e.bottom - e.top)
		},
		viewportOrg: {
			x: 0,
			y: 0
		},
		viewportExt: null,
		currentPoint: {
			x: 0,
			y: 0
		},
		pen: {
			type: "pen",
			color: "#000000",
			width: 1
		},
		brush: {
			type: "brush",
			color: "#ffffff",
			nullBrush: !0
		},
		font: {
			type: "font",
			family: "Times New Roman",
			size: 12,
			weight: 400,
			italic: !1,
			underline: !1,
			strike: !1,
			charset: 0
		},
		textColor: "#000000",
		bkColor: "#ffffff",
		bkMode: 1,
		textAlign: 0
	};
}
function Jn(e, t) {
	let n = e.viewportExt ?? e.windowExt, r = Zn(n.x, e.windowExt.x), i = Zn(n.y, e.windowExt.y);
	return {
		x: e.viewportOrg.x + (t.x - e.windowOrg.x) * r,
		y: e.viewportOrg.y + (t.y - e.windowOrg.y) * i
	};
}
function Yn(e, t) {
	let n = e.viewportExt ?? e.windowExt;
	return Math.abs(t * Zn(n.x, e.windowExt.x));
}
function Xn(e, t) {
	let n = e.viewportExt ?? e.windowExt;
	return Math.abs(t * Zn(n.y, e.windowExt.y));
}
function Zn(e, t) {
	return t ? e / t : 1;
}
function Qn(e, t, n) {
	let r = W(e, t), i = t + 4 < n ? Math.abs(G(e, t + 2)) : 1, a = t + 6 < n ? Math.abs(G(e, t + 4)) : 0;
	return {
		type: "pen",
		color: t + 10 <= n ? br(gr(e, t + 6)) : "#000000",
		width: Math.max(1, i, a),
		nullPen: (r & 15) == 5
	};
}
function $n(e, t, n) {
	let r = W(e, t);
	return {
		type: "brush",
		color: t + 6 <= n ? br(gr(e, t + 2)) : "#ffffff",
		nullBrush: r == 1 || r == 5
	};
}
function er(e, t, n) {
	let r = G(e, t), i = G(e, t + 2), a = G(e, t + 8) || 400, o = hr(e, t + 10) != 0, s = hr(e, t + 11) != 0, c = hr(e, t + 12) != 0, l = hr(e, t + 13);
	return {
		type: "font",
		family: vr(_r(e, t + 18, Math.max(0, Math.min(32, n - t - 18)))) || "Times New Roman",
		size: Math.max(1, Math.abs(r || i || 12)),
		weight: a,
		italic: o,
		underline: s,
		strike: c,
		charset: l
	};
}
function tr(e, t, n, r, i, a) {
	let o = W(e, t), s = t + 2, c = [];
	for (let t = 0; t < o && s + 4 <= n; t++, s += 4) c.push(Jn(i, {
		x: G(e, s),
		y: G(e, s + 2)
	}));
	c.length && (a(`<path d="${c.map((e, t) => `${t == 0 ? "M" : "L"} ${K(e.x)} ${K(e.y)}`).join(" ") + (r ? " Z" : "")}" ${r ? lr(i) : dr(i)}/>`), i.currentPoint = c[c.length - 1]);
}
function nr(e, t, n, r, i) {
	let a = Jn(n, mr(e, t)), o = Jn(n, mr(e, t + 4)), s = Math.min(o.x, a.x), c = Math.min(o.y, a.y), l = Math.abs(a.x - o.x), u = Math.abs(a.y - o.y);
	r(i ? `<ellipse cx="${K(s + l / 2)}" cy="${K(c + u / 2)}" rx="${K(l / 2)}" ry="${K(u / 2)}" ${lr(n)}/>` : `<rect x="${K(s)}" y="${K(c)}" width="${K(l)}" height="${K(u)}" ${lr(n)}/>`);
}
function rr(e, t, n, r, i) {
	let a = W(e, t), o = t + 2, s = o + a + a % 2;
	if (s + 4 > n) return;
	let c = pr(e, o, a, r.font.charset), l = G(e, s);
	sr(c, ar(r, {
		x: G(e, s + 2),
		y: l
	}), null, r, i), or(c, null, r);
}
function ir(e, t, n, r, i) {
	let a = G(e, t), o = G(e, t + 2), s = W(e, t + 4), c = W(e, t + 6), l = t + 8;
	if (c & 6 && (l += 8), l + s > n) return;
	let u = pr(e, l, s, r.font.charset);
	l += s + s % 2;
	let d = [];
	for (; l + 2 <= n && d.length < s;) d.push(G(e, l)), l += 2;
	sr(u, ar(r, {
		x: o,
		y: a
	}), d.length ? d : null, r, i), or(u, d.length ? d : null, r);
}
function ar(e, t) {
	return e.textAlign & 1 ? { ...e.currentPoint } : Jn(e, t);
}
function or(e, t, n) {
	if (!(n.textAlign & 1)) return;
	let r = t?.length ? t.reduce((e, t) => e + t, 0) : e.length * n.font.size * .5;
	n.currentPoint = {
		x: n.currentPoint.x + Yn(n, r),
		y: n.currentPoint.y
	};
}
function sr(e, t, n, r, i) {
	if (!e) return;
	let a = r.font, o = Math.max(1, Xn(r, a.size)), s = [
		`font-family:${yr(a.family)}`,
		`font-size:${K(o)}px`,
		`font-weight:${a.weight >= 600 ? "700" : a.weight}`,
		`font-style:${a.italic ? "italic" : "normal"}`
	], c = [];
	a.underline && c.push("underline"), a.strike && c.push("line-through"), c.length && s.push(`text-decoration:${c.join(" ")}`);
	let l = [
		`x="${K(t.x)}"`,
		`y="${K(t.y)}"`,
		`fill="${wr(r.textColor)}"`,
		`style="${wr(s.join(";"))}"`,
		`dominant-baseline="${(r.textAlign & 24) == 24 ? "alphabetic" : "text-before-edge"}"`,
		fr(r.textAlign)
	].filter(Boolean).join(" ");
	if (!n || n.length == 0) {
		i(`<text ${l}>${Cr(e)}</text>`);
		return;
	}
	let u = t.x;
	i(`<text ${l}>${Array.from(e).map((e, t) => {
		let i = `<tspan x="${K(u)}">${Cr(e)}</tspan>`;
		return u += Yn(r, n[t] ?? 0), i;
	}).join("")}</text>`);
}
function cr(e, t) {
	let n = e.findIndex((e) => e == null);
	n < 0 ? e.push(t) : e[n] = t;
}
function lr(e) {
	return `${ur(e)} ${dr(e)}`;
}
function ur(e) {
	return e.brush?.nullBrush ? "fill=\"none\"" : `fill="${wr(e.brush?.color ?? "#ffffff")}"`;
}
function dr(e) {
	return e.pen?.nullPen ? "stroke=\"none\"" : `fill="none" stroke="${wr(e.pen?.color ?? "#000000")}" stroke-width="${K(Math.max(.5, Yn(e, e.pen?.width ?? 1)))}"`;
}
function fr(e) {
	return e & 6 ? "text-anchor=\"end\"" : e & 2 ? "text-anchor=\"middle\"" : "";
}
function pr(e, t, n, r) {
	let i = new Uint8Array(e.buffer, e.byteOffset + t, Math.max(0, Math.min(n, e.byteLength - t))), a = r == 2 ? "symbol" : r == 134 ? "gb18030" : "windows-1252";
	try {
		return new TextDecoder(a).decode(i).replace(/\0+$/g, "");
	} catch {
		let e = "";
		for (let t of i) e += String.fromCharCode(t);
		return e.replace(/\0+$/g, "");
	}
}
function mr(e, t) {
	return {
		y: G(e, t),
		x: G(e, t + 2)
	};
}
function hr(e, t) {
	return t < e.byteLength ? e.getUint8(t) : 0;
}
function W(e, t) {
	return t + 2 <= e.byteLength ? e.getUint16(t, !0) : 0;
}
function G(e, t) {
	return t + 2 <= e.byteLength ? e.getInt16(t, !0) : 0;
}
function gr(e, t) {
	return t + 4 <= e.byteLength ? e.getUint32(t, !0) : 0;
}
function _r(e, t, n) {
	let r = "";
	for (let i = 0; i < n && t + i < e.byteLength; i++) {
		let n = e.getUint8(t + i);
		if (n == 0) break;
		r += String.fromCharCode(n);
	}
	return r;
}
function vr(e) {
	return (e ?? "").replace(/[^\x20-\x7e]/g, "").trim();
}
function yr(e) {
	let t = (e || "Times New Roman").replace(/["\\]/g, "");
	return /[\s,]/.test(t) ? `"${t}"` : t;
}
function br(e) {
	let t = e & 255, n = e >> 8 & 255, r = e >> 16 & 255;
	return `#${xr(t)}${xr(n)}${xr(r)}`;
}
function xr(e) {
	return Math.max(0, Math.min(255, e)).toString(16).padStart(2, "0");
}
function Sr(e) {
	return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function K(e) {
	return Number.isFinite(e) ? `${Math.round(e * 1e3) / 1e3}` : "0";
}
function Cr(e) {
	return String(e ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function wr(e) {
	return Cr(e).replace(/"/g, "&quot;");
}
function Tr(e, t, n, r, i, a) {
	return `<svg xmlns="http://www.w3.org/2000/svg" width="${K(r)}mm" height="${K(i)}mm" viewBox="${K(n.left)} ${K(n.top)} ${K(e)} ${K(t)}" preserveAspectRatio="xMidYMid meet" data-docx-metafile="wmf"><rect x="${K(n.left)}" y="${K(n.top)}" width="${K(e)}" height="${K(t)}" fill="none" stroke="#999" stroke-width="1"/><text x="${K(n.left + e / 2)}" y="${K(n.top + t / 2)}" text-anchor="middle" font-size="12" fill="#666">${Cr(a)}</text></svg>`;
}
var Er = [
	{
		type: h.OfficeDocument,
		target: "word/document.xml"
	},
	{
		type: h.ExtendedProperties,
		target: "docProps/app.xml"
	},
	{
		type: h.CoreProperties,
		target: "docProps/core.xml"
	},
	{
		type: h.CustomProperties,
		target: "docProps/custom.xml"
	}
], Dr = class e {
	constructor() {
		this.parts = [], this.partsMap = {}, this.contentTypes = [], this._snapshotAssetDataUrls = null, this._snapshotTextParts = null;
	}
	static fromSnapshot(t, n) {
		let r = new e();
		r._options = n, r.rels = t.rels ?? [], r.contentTypes = t.contentTypes ?? [], r.parts = [], r.partsMap = {}, r._snapshotAssetDataUrls = t.assetDataUrls ?? {}, r._snapshotTextParts = t.textParts ?? {}, r._package = {
			load: (e) => Promise.resolve(r._snapshotTextParts?.[q(e)] ?? null),
			parseXmlDocument: (e) => he(e, n?.trimXmlDeclaration ?? !0),
			get: (e) => r._snapshotTextParts?.[q(e)] == null ? null : {}
		};
		for (let e of t.parts ?? []) {
			let t = r.restoreSnapshotPart(e);
			t && (r.parts.push(t), r.partsMap[t.path] = t);
		}
		return r;
	}
	static async load(t, n, r) {
		var i = new e();
		return i._options = r, i._parser = n, i._package = await Ee.load(t, r), i.rels = await i._package.loadRelationships(), i.contentTypes = await i._package.loadContentTypes(), await Promise.all(Er.map((e) => {
			let t = i.rels.find((t) => t.type === e.type) ?? e;
			return i.loadRelationshipPart(t.target, t.type);
		})), i;
	}
	restoreSnapshotPart(e) {
		let t = {
			path: e.path,
			rels: e.rels ?? []
		};
		switch (Object.assign(t, e.data ?? {}), e.kind) {
			case "document":
				this.documentPart = t;
				break;
			case "fontTable":
				this.fontTablePart = t;
				break;
			case "numbering":
				this.numberingPart = t;
				break;
			case "styles":
				this.stylesPart = t;
				break;
			case "theme":
				this.themePart = t;
				break;
			case "footnotes":
				this.footnotesPart = t;
				break;
			case "endnotes":
				this.endnotesPart = t;
				break;
			case "coreProps":
				this.corePropsPart = t;
				break;
			case "extendedProps":
				this.extendedPropsPart = t;
				break;
			case "settings":
				this.settingsPart = t;
				break;
			case "comments":
				t.commentMap = w(t.comments ?? [], (e) => e.id), this.commentsPart = t;
				break;
			case "commentsExtended": t.commentMap = w(t.comments ?? [], (e) => e.paraId), this.commentsExtendedPart = t;
		}
		return t;
	}
	async createSnapshot() {
		let e = {
			rels: this.rels ?? [],
			contentTypes: this.contentTypes ?? [],
			parts: this.parts.map((e) => this.snapshotPart(e)).filter(Boolean),
			assetDataUrls: {},
			textParts: {}
		};
		return await this.preloadSnapshotRelationshipTargets(e), e;
	}
	snapshotPart(e) {
		let t = e, n = "part", r = {};
		if (e === this.documentPart) n = "document", r = { body: t.body };
		else if (e === this.fontTablePart) n = "fontTable", r = { fonts: t.fonts };
		else if (e === this.numberingPart) n = "numbering", r = {
			numberings: t.numberings,
			abstractNumberings: t.abstractNumberings,
			bulletPictures: t.bulletPictures,
			domNumberings: t.domNumberings
		};
		else if (e === this.stylesPart) n = "styles", r = { styles: t.styles };
		else if (e === this.themePart) n = "theme", r = { theme: t.theme };
		else if (e === this.footnotesPart) n = "footnotes", r = { notes: t.notes };
		else if (e === this.endnotesPart) n = "endnotes", r = { notes: t.notes };
		else if (e === this.corePropsPart) n = "coreProps", r = { props: t.props };
		else if (e === this.extendedPropsPart) n = "extendedProps", r = { props: t.props };
		else if (e === this.settingsPart) n = "settings", r = { settings: t.settings };
		else if (e === this.commentsPart) n = "comments", r = { comments: t.comments };
		else if (e === this.commentsExtendedPart) n = "commentsExtended", r = { comments: t.comments };
		else if (t.rootElement) n = t.rootElement.type === "header" ? "header" : "footer", r = { rootElement: t.rootElement };
		else return null;
		return {
			kind: n,
			path: e.path,
			rels: e.rels ?? [],
			data: r
		};
	}
	async preloadSnapshotRelationshipTargets(e) {
		let t = /* @__PURE__ */ new Set(), n = (e) => {
			for (let n of e?.rels ?? []) {
				if (!n || p(n)) continue;
				let r = q(this.resolveRelationshipTarget(e, n));
				r && !t.has(r) && t.add(r);
			}
		};
		for (let e of this.parts) n(e);
		for (let n of t) {
			if (this.partsMap[n]) continue;
			let t = n.toLowerCase(), r = /\.(xml|rels|html?|txt)$/i.test(t);
			try {
				if (r) {
					let t = await this._package.load(n, "string");
					t != null && (e.textParts[n] = t);
				} else {
					let t = await this.loadPackageAssetDataUrl(n);
					t && (e.assetDataUrls[n] = t);
				}
			} catch (e) {
				this._options?.debug && console.warn(`docx-preview: unable to preload relationship target ${n}`, e);
			}
		}
	}
	blobWithContentType(e, t) {
		if (!e) return null;
		let n = this.contentTypeForPath(t);
		return n ? new Blob([e], { type: n }) : e;
	}
	save(e = "blob") {
		return this._package.save(e);
	}
	async loadRelationshipPart(e, t) {
		if (this.partsMap[e]) return this.partsMap[e];
		if (!this._package.get(e)) return null;
		let n = null;
		switch (t) {
			case h.OfficeDocument:
				this.documentPart = n = new ke(this._package, e, this._parser);
				break;
			case h.FontTable:
				this.fontTablePart = n = new we(this._package, e);
				break;
			case h.Numbering:
				this.numberingPart = n = new ot(this._package, e, this._parser);
				break;
			case h.Styles:
				this.stylesPart = n = new st(this._package, e, this._parser);
				break;
			case h.Theme:
				this.themePart = n = new Tt(this._package, e);
				break;
			case h.Footnotes:
				this.footnotesPart = n = new At(this._package, e, this._parser);
				break;
			case h.Endnotes:
				this.endnotesPart = n = new jt(this._package, e, this._parser);
				break;
			case h.Footer:
				n = new pt(this._package, e, this._parser);
				break;
			case h.Header:
				n = new ft(this._package, e, this._parser);
				break;
			case h.CoreProperties:
				this.corePropsPart = n = new vt(this._package, e);
				break;
			case h.ExtendedProperties:
				this.extendedPropsPart = n = new gt(this._package, e);
				break;
			case h.CustomProperties:
				n = new Ft(this._package, e);
				break;
			case h.Settings:
				this.settingsPart = n = new Nt(this._package, e);
				break;
			case h.Comments:
				this.commentsPart = n = new It(this._package, e, this._parser);
				break;
			case h.CommentsExtended: this.commentsExtendedPart = n = new Lt(this._package, e);
		}
		if (n == null) return Promise.resolve(null);
		if (this.partsMap[e] = n, this.parts.push(n), await n.load(), n.rels?.length > 0) {
			let [e] = S(n.path);
			await Promise.all(n.rels.filter((e) => !p(e)).map((t) => this.loadRelationshipPart(C(t.target, e), t.type)));
		}
		return n;
	}
	async loadRelationshipXml(e, t) {
		let n = t ?? this.documentPart, r = this.getRelById(n, e);
		if (!r || p(r)) return null;
		let i = q(this.resolveRelationshipTarget(n, r)), a = i ? this._snapshotTextParts?.[i] ?? await this._package.load(i, "string") : null;
		return a ? this._package.parseXmlDocument(a) : null;
	}
	async loadRelationshipText(e, t) {
		let n = t ?? this.documentPart, r = this.getRelById(n, e);
		if (!r || p(r)) return null;
		let i = q(this.resolveRelationshipTarget(n, r));
		return i ? Promise.resolve(this._snapshotTextParts?.[i] ?? this._package.load(i, "string")) : Promise.resolve(null);
	}
	async loadRelationshipBlobUrl(e, t, n = this._options?.externalResourcePolicy ?? "block") {
		let r = t ?? this.documentPart, i = this.getRelById(r, e);
		if (!i) return null;
		if (p(i)) return m(i, n);
		let a = q(this.resolveRelationshipTarget(r, i));
		return a ? this.loadPackageAssetUrl(a) : null;
	}
	async loadDocumentImage(e, t, n = this._options?.externalResourcePolicy ?? "block") {
		let r = t ?? this.documentPart, i = this.getRelById(r, e);
		if (!i) return null;
		if (p(i)) return m(i, n);
		let a = q(this.resolveRelationshipTarget(r, i));
		return a ? this.loadPackageAssetUrl(a) : null;
	}
	async loadNumberingImage(e) {
		let t = q(this.getPathById(this.numberingPart, e));
		return t ? this.loadPackageAssetUrl(t) : null;
	}
	async loadFont(e, t) {
		let n = q(this.getPathById(this.fontTablePart, e));
		if (!n) return null;
		if (this._snapshotAssetDataUrls?.[n]) return this._snapshotAssetDataUrls[n];
		let r = await this._package.load(n, "uint8array");
		return r && this.blobToURL(new Blob([Or(r, t)]), n);
	}
	async loadAltChunk(e, t) {
		let n = t ?? this.documentPart, r = this.getRelById(n, e);
		if (!r || p(r)) return Promise.resolve(null);
		let i = q(this.resolveRelationshipTarget(n, r));
		return i ? Promise.resolve(this._snapshotTextParts?.[i] ?? this._package.load(i, "string")) : Promise.resolve(null);
	}
	blobToURL(e, t) {
		return e ? (e = this.blobWithContentType(e, t), this._options.useBase64URL ? T(e) : URL.createObjectURL(e)) : null;
	}
	async loadPackageAssetUrl(e) {
		let t = q(e);
		if (!t) return null;
		if (this._snapshotAssetDataUrls?.[t]) return this._snapshotAssetDataUrls[t];
		if (this.isConvertibleMetafileAsset(t)) {
			let e = await this._package.load(t, "uint8array");
			return e ? this.convertMetafileAsset(e, t) || this.blobToURL(new Blob([e], { type: this.contentTypeForPath(t) || this.defaultMetafileContentType(t) }), t) : null;
		}
		return this.blobToURL(await this._package.load(t, "blob"), t);
	}
	async loadPackageAssetDataUrl(e) {
		let t = q(e);
		if (!t) return null;
		if (this.isConvertibleMetafileAsset(t)) {
			let e = await this._package.load(t, "uint8array");
			if (!e) return null;
			let n = this.convertMetafileAsset(e, t);
			if (n) return n;
			let r = e ? new Blob([e], { type: this.contentTypeForPath(t) || this.defaultMetafileContentType(t) }) : null;
			return r ? T(r) : null;
		}
		let n = await this._package.load(t, "blob"), r = this.blobWithContentType(n, t);
		return r ? T(r) : null;
	}
	convertMetafileAsset(e, t) {
		if (!e) return null;
		try {
			if (Bt(e)) return Vt(e);
			if (Wn(e)) return Gn(e);
		} catch (e) {
			return this._options?.debug && console.warn(`docx-preview: unable to convert metafile asset ${t}`, e), null;
		}
		return null;
	}
	isConvertibleMetafileAsset(e) {
		let t = this.contentTypeForPath(e).toLowerCase();
		return /\.(emf|wmf)$/i.test(e ?? "") || t == "image/x-emf" || t == "image/emf" || t == "image/x-wmf" || t == "image/wmf";
	}
	defaultMetafileContentType(e) {
		return /\.wmf$/i.test(e ?? "") ? "image/x-wmf" : "image/x-emf";
	}
	contentTypeForPath(e) {
		let t = q(e ?? "").toLowerCase();
		for (let e of this.contentTypes ?? []) if (e.partName && q(e.partName).toLowerCase() == t) return e.contentType ?? "";
		let n = /\.([^.\/]+)$/.exec(t)?.[1] ?? "";
		return n ? (this.contentTypes ?? []).find((e) => e.extension?.toLowerCase() == n)?.contentType ?? "" : "";
	}
	findPartByRelId(e, t = null) {
		var n = this.getRelById(t, e);
		let r = n && !p(n) ? this.resolveRelationshipTarget(t, n) : null;
		return r ? this.partsMap[r] : null;
	}
	getRelById(e, t) {
		return (e?.rels ?? this.rels ?? []).find((e) => e.id == t);
	}
	getPathById(e, t) {
		let n = this.getRelById(e, t);
		return n && !p(n) ? this.resolveRelationshipTarget(e, n) : null;
	}
	resolveRelationshipTarget(e, t) {
		let [n] = e ? S(e.path) : [""];
		return q(C(t.target, n));
	}
};
function q(e) {
	return e && (e.startsWith("/") ? e.substring(1) : e);
}
function Or(e, t) {
	let n = t.replace(/{|}|-/g, ""), r = Array(16);
	for (let e = 0; e < 16; e++) r[16 - e - 1] = parseInt(n.substring(e * 2, e * 2 + 2), 16);
	for (let t = 0; t < 32; t++) e[t] = e[t] ^ r[t % 16];
	return e;
}
function kr(e, t) {
	return {
		type: R.BookmarkStart,
		id: t.attr(e, "id"),
		name: t.attr(e, "name"),
		colFirst: t.intAttr(e, "colFirst"),
		colLast: t.intAttr(e, "colLast")
	};
}
function Ar(e, t) {
	return {
		type: R.BookmarkEnd,
		id: t.attr(e, "id")
	};
}
var jr = class extends ct {
	constructor() {
		super(...arguments), this.type = R.VmlElement, this.attrs = {};
	}
};
function Mr(e, t) {
	var n = new jr();
	switch (e.localName) {
		case "group":
			n.tagName = "g", n.isGroup = !0;
			break;
		case "roundrect": n.roundRectArc = .2;
		case "rect":
			n.tagName = "rect", Object.assign(n.attrs, {
				width: "100%",
				height: "100%"
			});
			break;
		case "oval":
			n.tagName = "ellipse", Object.assign(n.attrs, {
				cx: "50%",
				cy: "50%",
				rx: "50%",
				ry: "50%"
			});
			break;
		case "line":
			n.tagName = "line";
			break;
		case "shape":
			n.tagName = "g";
			break;
		case "textbox":
			n.tagName = "foreignObject", n.textInset = [
				"0.1in",
				"0.05in",
				"0.1in",
				"0.05in"
			], Object.assign(n.attrs, {
				width: "100%",
				height: "100%"
			});
			break;
		default: return null;
	}
	for (let t of F.attrs(e)) switch (t.localName) {
		case "style":
			n.cssStyleText = t.value, n.cssStyle = k(t.value);
			break;
		case "coordorigin":
			n.coordOrigin = Br(t.value);
			break;
		case "coordsize":
			n.coordSize = Br(t.value);
			break;
		case "arcsize":
			n.roundRectArc != null && (n.roundRectArc = Nr(t.value));
			break;
		case "inset":
			if (n.textInset) {
				let e = t.value.trim().split(/\s*,\s*|\s+/);
				n.textInset = n.textInset.map((t, n) => e[n] || t);
			}
			break;
		case "id":
			n.attrs.id = t.value;
			break;
		case "fillcolor":
			n.attrs.fill = t.value;
			break;
		case "strokecolor":
			n.attrs.stroke = t.value;
			break;
		case "strokeweight":
			n.attrs["stroke-width"] = P(t.value, N.Point) ?? t.value;
			break;
		case "filled":
			(t.value == "f" || t.value == "false") && (n.attrs.fill = "none");
			break;
		case "stroked":
			(t.value == "f" || t.value == "false") && (n.attrs.stroke = "none");
			break;
		case "path":
			n.tagName = "path", n.attrs.d = Vr(t.value);
			break;
		case "from":
			let [e, r] = zr(t.value);
			Object.assign(n.attrs, {
				x1: e,
				y1: r
			});
			break;
		case "to":
			let [i, a] = zr(t.value);
			Object.assign(n.attrs, {
				x2: i,
				y2: a
			});
	}
	for (let r of F.elements(e)) switch (r.localName) {
		case "stroke":
			Object.assign(n.attrs, Lr(r));
			break;
		case "fill":
			Object.assign(n.attrs, Rr(r));
			break;
		case "imagedata":
			let e = F.attr(r, "id") ?? F.attr(r, "relid") ?? F.attr(r, "pict");
			e && (n.tagName = "image", Object.assign(n.attrs, Pr(r)), n.imageHref = {
				id: e,
				title: F.attr(r, "title")
			});
			break;
		case "txbxContent":
			n.children.push(...t.parseBodyElements(r));
			break;
		default:
			let i = Mr(r, t);
			i && n.children.push(i);
	}
	let r = n.cssStyle?.rotation?.trim();
	if (r && /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:fd|deg)?$/i.test(r)) {
		let e = parseFloat(r) / (/fd$/i.test(r) ? 65536 : 1);
		Number.isFinite(e) && (n.rotation = e);
	}
	if (n.cssStyle?.position == "absolute") {
		let t = n.cssStyle["mso-position-horizontal-relative"] ?? "paragraph", r = n.cssStyle["mso-position-vertical-relative"] ?? "paragraph", i = n.cssStyle["mso-position-horizontal"], a = n.cssStyle["mso-position-vertical"];
		n.props = { anchorPosition: {
			layoutInCell: !/^(f|false|0|off)$/i.test(F.attr(e, "allowincell") ?? ""),
			horizontal: {
				relative: t == "text" ? "column" : t,
				align: i,
				alignSpecified: !!i && i != "absolute"
			},
			vertical: {
				relative: r == "text" ? "paragraph" : r,
				align: a,
				alignSpecified: !!a && a != "absolute"
			}
		} };
	}
	return n;
}
function Nr(e) {
	let t = e.trim();
	if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:%|f)?$/i.test(t)) return .2;
	let n = parseFloat(t) / (/%$/.test(t) ? 100 : /f$/i.test(t) ? 65536 : 1);
	return Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : .2;
}
function Pr(e) {
	let t = Fr(F.attr(e, "cropleft")), n = Fr(F.attr(e, "croptop")), r = Fr(F.attr(e, "cropright")), i = Fr(F.attr(e, "cropbottom")), a = Math.max(1e-4, 1 - t - r), o = Math.max(1e-4, 1 - n - i), s = {
		x: Ir(-t / a),
		y: Ir(-n / o),
		width: Ir(1 / a),
		height: Ir(1 / o)
	};
	return (t || n || r || i) && (s.preserveAspectRatio = "none"), s;
}
function Fr(e) {
	if (!e) return 0;
	let t = String(e).trim();
	if (!t) return 0;
	let n;
	return n = /^-?\d+(\.\d+)?f$/i.test(t) ? parseFloat(t.slice(0, -1)) / 65536 : t.endsWith("%") ? parseFloat(t) / 100 : parseFloat(t), Number.isFinite(n) ? Math.max(0, Math.min(.9999, n)) : 0;
}
function Ir(e) {
	return `${Math.round(e * 1e5) / 1e3}%`;
}
function Lr(e) {
	let t = {}, n = F.attr(e, "color"), r = F.attr(e, "weight"), i = F.attr(e, "on");
	return i == "f" || i == "false" ? t.stroke = "none" : n && (t.stroke = n), t["stroke-width"] = r ? P(r, N.Point) ?? r : "1px", t;
}
function Rr(e) {
	let t = {}, n = F.attr(e, "color") ?? F.attr(e, "color2"), r = F.attr(e, "on"), i = F.attr(e, "opacity");
	return r == "f" || r == "false" ? t.fill = "none" : n && (t.fill = n), i && (t["fill-opacity"] = i.endsWith("%") ? `${parseFloat(i) / 100}` : i), t;
}
function zr(e) {
	return e.trim().split(/[\s,]+/);
}
function Br(e) {
	let [t, n] = zr(e).map((e) => Number(e));
	return [Number.isFinite(t) ? t : 0, Number.isFinite(n) ? n : 0];
}
function Vr(e) {
	return e.replace(/([mlxe])|([-\d]+)|([,])/g, (e) => /[-\d]/.test(e) || /[ml,]/.test(e) ? e : e == "x" ? "z" : "");
}
var Hr = class extends ct {
	constructor() {
		super(...arguments), this.type = R.Comment;
	}
}, Ur = class extends ct {
	constructor(e) {
		super(), this.id = e, this.type = R.CommentReference;
	}
}, Wr = class extends ct {
	constructor(e) {
		super(), this.id = e, this.type = R.CommentRangeStart;
	}
}, Gr = class extends ct {
	constructor(e) {
		super(), this.id = e, this.type = R.CommentRangeEnd;
	}
};
function Kr() {
	let e = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakSet();
	function n(r) {
		let i = e.get(r);
		if (i) return i;
		let a = r.parentNode?.nodeType === 1 ? r.parentNode : null;
		if (!a) {
			let t = `/${r.nodeName}`;
			return e.set(r, t), t;
		}
		let o = n(a);
		if (!t.has(a)) {
			let n = /* @__PURE__ */ new Map();
			for (let e of Array.from(a.childNodes)) {
				if (e.nodeType !== 1) continue;
				let t = e, r = `${t.namespaceURI}|${t.localName}`, i = n.get(r) ?? [];
				i.push(t), n.set(r, i);
			}
			for (let t of n.values()) t.forEach((n, r) => {
				e.set(n, `${o}/${n.nodeName}${t.length > 1 ? `[${r + 1}]` : ""}`);
			});
			t.add(a);
		}
		return e.get(r);
	}
	return (e) => {
		if (e.localName !== "p" || e.namespaceURI !== "http://schemas.openxmlformats.org/wordprocessingml/2006/main") return;
		let t = e.getAttributeNS("http://schemas.microsoft.com/office/word/2010/wordml", "paraId");
		return t ? `p:${t}` : `xpath:${n(e)}`;
	};
}
var qr = {
	shd: "inherit",
	color: "var(--docx-auto-color, black)",
	borderColor: "var(--docx-auto-color, black)",
	highlight: "transparent"
}, Jr = [
	M.wordprocessingShape,
	M.wordprocessingCanvas,
	M.wordprocessingGroup,
	M.drawingml,
	M.picture
], Yr = {
	oMath: R.MmlMath,
	oMathPara: R.MmlMathParagraph,
	f: R.MmlFraction,
	func: R.MmlFunction,
	fName: R.MmlFunctionName,
	num: R.MmlNumerator,
	den: R.MmlDenominator,
	rad: R.MmlRadical,
	deg: R.MmlDegree,
	e: R.MmlBase,
	sSup: R.MmlSuperscript,
	sSub: R.MmlSubscript,
	sPre: R.MmlPreSubSuper,
	sup: R.MmlSuperArgument,
	sub: R.MmlSubArgument,
	d: R.MmlDelimiter,
	nary: R.MmlNary,
	eqArr: R.MmlEquationArray,
	lim: R.MmlLimit,
	limLow: R.MmlLimitLower,
	limUpp: R.MmlLimitUpper,
	sSubSup: R.MmlSubSuperscript,
	phant: R.MmlPhantom,
	borderBox: R.MmlBorderBox,
	acc: R.MmlAccent,
	m: R.MmlMatrix,
	mr: R.MmlMatrixRow,
	box: R.MmlBox,
	bar: R.MmlBar,
	groupChr: R.MmlGroupChar
}, Xr = class {
	constructor(e) {
		this.paragraphAddress = Kr(), this.options = {
			ignoreWidth: !1,
			debug: !1,
			hideWebHiddenContent: !1,
			...e
		};
	}
	parseNotes(e, t, n) {
		var r = [];
		for (let i of F.elements(e, t)) {
			let e = new n();
			e.id = F.attr(i, "id"), e.noteType = F.attr(i, "type"), e.children = this.parseBodyElements(i), r.push(e);
		}
		return r;
	}
	parseComments(e) {
		var t = [];
		for (let n of F.elements(e, "comment")) {
			let e = new Hr();
			e.id = F.attr(n, "id"), e.author = F.attr(n, "author"), e.initials = F.attr(n, "initials"), e.date = F.attr(n, "date"), e.children = this.parseBodyElements(n), t.push(e);
		}
		return t;
	}
	parseDocumentFile(e) {
		var t = F.element(e, "body"), n = F.element(e, "background"), r = F.element(t, "sectPr");
		let i = n?.getElementsByTagNameNS("urn:schemas-microsoft-com:vml", "fill")?.[0], a = i?.getAttributeNS("http://schemas.openxmlformats.org/officeDocument/2006/relationships", "id");
		return {
			type: R.Document,
			children: this.parseBodyElements(t),
			props: Ve(r, F),
			cssStyle: n ? this.parseBackground(n) : {},
			backgroundImage: a ? {
				id: a,
				type: i.getAttribute("type") || "tile"
			} : void 0
		};
	}
	parseBackground(e) {
		var t = {}, n = ti.colorAttr(e, "color", null, qr.shd);
		return n && (t["background-color"] = n), t;
	}
	parseBodyElements(e) {
		var t = [];
		for (let n of F.elements(e)) switch (n.localName) {
			case "p":
				t.push(this.parseParagraph(n));
				break;
			case "altChunk":
				t.push(this.parseAltChunk(n));
				break;
			case "tbl":
				t.push(this.parseTable(n));
				break;
			case "sdt":
				t.push(...this.parseSdt(n, (e) => this.parseBodyElements(e)));
				break;
			case "ins":
				t.push(this.parseRevision(R.Inserted, n, (e) => ({ children: this.parseBodyElements(e) }), "insert"));
				break;
			case "del":
				t.push(this.parseRevision(R.Deleted, n, (e) => ({ children: this.parseBodyElements(e) }), "delete"));
				break;
			case "moveFrom":
				t.push(this.parseRevision(R.Deleted, n, (e) => ({ children: this.parseBodyElements(e) }), "move-from"));
				break;
			case "moveTo": t.push(this.parseRevision(R.Inserted, n, (e) => ({ children: this.parseBodyElements(e) }), "move-to"));
		}
		return t;
	}
	parseStylesFile(e) {
		var t = [];
		for (let n of F.elements(e)) switch (n.localName) {
			case "style":
				t.push(this.parseStyle(n));
				break;
			case "docDefaults": t.push(this.parseDefaultStyles(n));
		}
		return t;
	}
	parseDefaultStyles(e) {
		var t = {
			id: null,
			name: null,
			target: null,
			basedOn: null,
			styles: []
		};
		for (let i of F.elements(e)) switch (i.localName) {
			case "rPrDefault":
				var n = F.element(i, "rPr");
				n && t.styles.push({
					target: "span",
					values: this.parseDefaultProperties(n, {})
				});
				break;
			case "pPrDefault":
				var r = F.element(i, "pPr");
				r && t.styles.push({
					target: "p",
					values: this.parseDefaultProperties(r, {})
				});
		}
		return t;
	}
	parseStyle(e) {
		var t = {
			id: F.attr(e, "styleId"),
			isDefault: F.boolAttr(e, "default"),
			name: null,
			target: null,
			basedOn: null,
			styles: [],
			linked: null
		};
		switch (F.attr(e, "type")) {
			case "paragraph":
				t.target = "p";
				break;
			case "table":
				t.target = "table";
				break;
			case "character": t.target = "span";
		}
		for (let n of F.elements(e)) switch (n.localName) {
			case "basedOn":
				t.basedOn = F.attr(n, "val");
				break;
			case "name":
				t.name = F.attr(n, "val");
				break;
			case "link":
				t.linked = F.attr(n, "val");
				break;
			case "next":
				t.next = F.attr(n, "val");
				break;
			case "aliases":
				t.aliases = F.attr(n, "val").split(",");
				break;
			case "pPr":
				t.styles.push({
					target: "p",
					values: this.parseDefaultProperties(n, {})
				}), t.paragraphProps = Ye(n, F);
				break;
			case "rPr":
				t.styles.push({
					target: "span",
					values: this.parseDefaultProperties(n, {})
				}), t.runProps = qe(n, F);
				break;
			case "tblPr":
			case "tcPr":
				t.styles.push({
					target: "td",
					values: this.parseDefaultProperties(n, {})
				});
				break;
			case "tblStylePr":
				for (let e of this.parseTableStyle(n)) t.styles.push(e);
				break;
			case "rsid":
			case "qFormat":
			case "hidden":
			case "semiHidden":
			case "unhideWhenUsed":
			case "autoRedefine":
			case "uiPriority": break;
			default: this.options.debug && console.warn(`DOCX: Unknown style element: ${n.localName}`);
		}
		return t;
	}
	parseTableStyle(e) {
		var t = [], n = F.attr(e, "type"), r = "", i = "";
		switch (n) {
			case "firstRow":
				i = ".first-row", r = "tr.first-row td";
				break;
			case "lastRow":
				i = ".last-row", r = "tr.last-row td";
				break;
			case "firstCol":
				i = ".first-col", r = "td.first-col";
				break;
			case "lastCol":
				i = ".last-col", r = "td.last-col";
				break;
			case "band1Vert":
				i = ":not(.no-vband)", r = "td.odd-col";
				break;
			case "band2Vert":
				i = ":not(.no-vband)", r = "td.even-col";
				break;
			case "band1Horz":
				i = ":not(.no-hband)", r = "tr.odd-row";
				break;
			case "band2Horz":
				i = ":not(.no-hband)", r = "tr.even-row";
				break;
			default: return [];
		}
		for (let n of F.elements(e)) switch (n.localName) {
			case "pPr":
				t.push({
					target: `${r} p`,
					mod: i,
					values: this.parseDefaultProperties(n, {})
				});
				break;
			case "rPr":
				t.push({
					target: `${r} span`,
					mod: i,
					values: this.parseDefaultProperties(n, {})
				});
				break;
			case "tblPr":
			case "tcPr": t.push({
				target: r,
				mod: i,
				values: this.parseDefaultProperties(n, {})
			});
		}
		return t;
	}
	parseNumberingFile(e) {
		let t = [], n = [], r = {}, i = [], a = [];
		for (let t of F.elements(e)) switch (t.localName) {
			case "numPicBullet":
				n.push(this.parseNumberingPicBullet(t));
				break;
			case "abstractNum":
				i.push(t);
				break;
			case "num": a.push(t);
		}
		for (let e of i) r[F.attr(e, "abstractNumId")] = this.parseAbstractNumbering(e, n);
		for (let e of a) {
			let i = F.attr(e, "numId"), a = (r[F.elementAttr(e, "abstractNumId", "val")] ?? []).map((e) => this.cloneNumberingLevel(e, i));
			for (let t of F.elements(e, "lvlOverride")) {
				let e = F.intAttr(t, "ilvl"), r = F.element(t, "lvl"), o = F.element(t, "startOverride"), s = a.find((t) => t.level == e);
				if (r) {
					s = this.parseNumberingLevel(i, r, n);
					let t = a.findIndex((t) => t.level == e);
					t >= 0 ? a[t] = s : a.push(s);
				}
				o && s && (s.start = F.intAttr(o, "val", s.start));
			}
			t.push(...a);
		}
		return t;
	}
	cloneNumberingLevel(e, t) {
		return {
			...e,
			id: t,
			pStyle: { ...e.pStyle },
			rStyle: { ...e.rStyle },
			bullet: e.bullet ? { ...e.bullet } : null
		};
	}
	parseNumberingPicBullet(e) {
		let t = F.intAttr(e, "numPicBulletId"), n = F.element(e, "pict"), r = n && F.element(n, "shape"), i = r && F.element(r, "imagedata");
		if (i) return {
			id: t,
			src: F.attr(i, "id"),
			style: F.attr(r, "style")
		};
		let a = F.element(e, "drawing"), o = a ? this.findDescendant(a, "blip") : null;
		if (o) {
			let e = a ? this.findDescendant(a, "extent") : null, n = [];
			if (e) {
				let t = F.lengthAttr(e, "cx", N.Emu), r = F.lengthAttr(e, "cy", N.Emu);
				t && n.push(`width:${t};`), r && n.push(`height:${r};`);
			}
			return {
				id: t,
				src: F.attr(o, "embed") ?? F.attr(o, "link"),
				style: n.join("") || void 0
			};
		}
		return null;
	}
	parseAbstractNumbering(e, t) {
		var n = [], r = F.attr(e, "abstractNumId");
		for (let i of F.elements(e)) switch (i.localName) {
			case "lvl": n.push(this.parseNumberingLevel(r, i, t));
		}
		return n;
	}
	parseNumberingLevel(e, t, n) {
		var r = {
			id: e,
			level: F.intAttr(t, "ilvl"),
			start: 1,
			pStyleName: void 0,
			pStyle: {},
			rStyle: {},
			suff: "tab"
		};
		for (let e of F.elements(t)) switch (e.localName) {
			case "start":
				r.start = F.intAttr(e, "val");
				break;
			case "pPr":
				this.parseDefaultProperties(e, r.pStyle);
				break;
			case "rPr":
				this.parseDefaultProperties(e, r.rStyle);
				break;
			case "lvlPicBulletId":
				var i = F.intAttr(e, "val");
				r.bullet = n.find((e) => e?.id == i);
				break;
			case "lvlText":
				r.levelText = F.attr(e, "val");
				break;
			case "pStyle":
				r.pStyleName = F.attr(e, "val");
				break;
			case "numFmt":
				r.format = F.attr(e, "val");
				break;
			case "lvlRestart":
				r.restart = F.intAttr(e, "val");
				break;
			case "suff": r.suff = F.attr(e, "val");
		}
		return r;
	}
	parseSdt(e, t) {
		let n = F.element(e, "sdtContent");
		return n ? t(n) : [];
	}
	parseInserted(e, t) {
		return this.parseRevision(R.Inserted, e, t);
	}
	parseDeleted(e, t) {
		return this.parseRevision(R.Deleted, e, t);
	}
	parseRevision(e, t, n, r = e == R.Inserted ? "insert" : "delete") {
		return {
			type: e,
			children: n(t)?.children ?? [],
			props: { revision: {
				id: F.attr(t, "id"),
				author: F.attr(t, "author"),
				date: F.attr(t, "date"),
				kind: r
			} }
		};
	}
	parseAltChunk(e) {
		return {
			type: R.AltChunk,
			children: [],
			id: F.attr(e, "id")
		};
	}
	parseParagraph(e) {
		var t = {
			type: R.Paragraph,
			children: []
		};
		this.options.exposeDisplayTargets && (t.displayAddress = this.paragraphAddress(e));
		for (let n of F.elements(e)) switch (n.localName) {
			case "pPr":
				this.parseParagraphProperties(n, t);
				break;
			case "r":
				t.children.push(this.parseRun(n, t));
				break;
			case "hyperlink":
				t.children.push(this.parseHyperlink(n, t));
				break;
			case "fldSimple":
				t.children.push(this.parseSimpleField(n, t));
				break;
			case "smartTag":
				t.children.push(this.parseSmartTag(n, t));
				break;
			case "bookmarkStart":
				t.children.push(kr(n, F));
				break;
			case "bookmarkEnd":
				t.children.push(Ar(n, F));
				break;
			case "commentRangeStart":
				t.children.push(new Wr(F.attr(n, "id")));
				break;
			case "commentRangeEnd":
				t.children.push(new Gr(F.attr(n, "id")));
				break;
			case "oMath":
			case "oMathPara": {
				let e = this.parseMathElement(n);
				e && t.children.push(e);
				break;
			}
			case "sdt":
				t.children.push(...this.parseSdt(n, (e) => this.parseParagraph(e).children));
				break;
			case "ins":
				t.children.push(this.parseInserted(n, (e) => this.parseParagraph(e)));
				break;
			case "del":
				t.children.push(this.parseDeleted(n, (e) => this.parseParagraph(e)));
				break;
			case "moveFrom":
				t.children.push(this.parseRevision(R.Deleted, n, (e) => this.parseParagraph(e), "move-from"));
				break;
			case "moveTo": t.children.push(this.parseRevision(R.Inserted, n, (e) => this.parseParagraph(e), "move-to"));
		}
		return t;
	}
	parseParagraphProperties(e, t) {
		this.parseDefaultProperties(e, t.cssStyle = {}, null, (n) => {
			if (n.localName == "rPr") {
				let e = F.elements(n).filter((e) => e.localName == "ins" || e.localName == "del").map((e) => this.revisionMetadata(e, e.localName == "del" ? "delete" : "insert"));
				e.length && (t.props = {
					...t.props ?? {},
					paragraphMarkRevisions: [...t.props?.paragraphMarkRevisions ?? [], ...e]
				}), e.some((e) => e.kind == "delete") && (t.props = {
					...t.props ?? {},
					deletedParagraphMark: !0
				});
				let r = t.cssStyle["background-color"];
				return this.parseDefaultProperties(n, t.cssStyle), r == null ? delete t.cssStyle["background-color"] : t.cssStyle["background-color"] = r, Xe(n, t, F), !0;
			}
			if (n.localName == "pPrChange") return this.addFormatRevision(t, n, "paragraph-format", e), !0;
			if (Xe(n, t, F)) return !0;
			switch (n.localName) {
				case "pStyle":
					t.styleName = F.attr(n, "val");
					break;
				case "cnfStyle":
					t.className = J.classNameOfCnfStyle(n);
					break;
				case "framePr":
					this.parseFrame(n, t);
					break;
				default: return !1;
			}
			return !0;
		});
	}
	parseFrame(e, t) {
		let n = F.attr(e, "dropCap");
		t.frame = {
			dropCap: n,
			width: F.lengthAttr(e, "w"),
			height: F.lengthAttr(e, "h"),
			horizontalPosition: F.lengthAttr(e, "x"),
			verticalPosition: F.lengthAttr(e, "y"),
			horizontalAnchor: F.attr(e, "hAnchor"),
			verticalAnchor: F.attr(e, "vAnchor"),
			horizontalAlignment: F.attr(e, "xAlign"),
			verticalAlignment: F.attr(e, "yAlign"),
			horizontalSpace: F.lengthAttr(e, "hSpace"),
			verticalSpace: F.lengthAttr(e, "vSpace"),
			heightRule: F.attr(e, "hRule"),
			wrap: F.attr(e, "wrap"),
			lines: F.intAttr(e, "lines")
		}, n == "drop" && (t.cssStyle.float = "left");
	}
	parseHyperlink(e, t) {
		var n = {
			type: R.Hyperlink,
			parent: t,
			children: []
		};
		n.anchor = F.attr(e, "anchor"), n.id = F.attr(e, "id");
		for (let t of F.elements(e)) switch (t.localName) {
			case "r": n.children.push(this.parseRun(t, n));
		}
		return n;
	}
	parseSmartTag(e, t) {
		var n = {
			type: R.SmartTag,
			parent: t,
			children: []
		}, r = F.attr(e, "uri"), i = F.attr(e, "element");
		r && (n.uri = r), i && (n.element = i);
		for (let t of F.elements(e)) switch (t.localName) {
			case "r":
				n.children.push(this.parseRun(t, n));
				break;
			case "smartTag": n.children.push(this.parseSmartTag(t, n));
		}
		return n;
	}
	parseSimpleField(e, t) {
		let n = {
			type: R.SimpleField,
			parent: t,
			children: [],
			instruction: F.attr(e, "instr"),
			lock: F.boolAttr(e, "lock", !1),
			dirty: F.boolAttr(e, "dirty", !1)
		};
		for (let t of F.elements(e)) switch (t.localName) {
			case "r":
				n.children.push(this.parseRun(t, n));
				break;
			case "hyperlink":
				n.children.push(this.parseHyperlink(t, n));
				break;
			case "smartTag":
				n.children.push(this.parseSmartTag(t, n));
				break;
			case "bookmarkStart":
				n.children.push(kr(t, F));
				break;
			case "bookmarkEnd":
				n.children.push(Ar(t, F));
				break;
			case "commentRangeStart":
				n.children.push(new Wr(F.attr(t, "id")));
				break;
			case "commentRangeEnd":
				n.children.push(new Gr(F.attr(t, "id")));
				break;
			case "sdt":
				n.children.push(...this.parseSdt(t, (e) => this.parseParagraph(e).children));
				break;
			case "ins":
				n.children.push(this.parseInserted(t, (e) => this.parseParagraph(e)));
				break;
			case "del":
				n.children.push(this.parseDeleted(t, (e) => this.parseParagraph(e)));
				break;
			case "moveFrom":
				n.children.push(this.parseRevision(R.Deleted, t, (e) => this.parseParagraph(e), "move-from"));
				break;
			case "moveTo": n.children.push(this.parseRevision(R.Inserted, t, (e) => this.parseParagraph(e), "move-to"));
		}
		return n;
	}
	parseRun(e, t) {
		var n = {
			type: R.Run,
			parent: t,
			children: []
		};
		for (let t of F.elements(e)) if (t = this.checkAlternateContent(t), t) switch (t.localName) {
			case "t":
				n.children.push({
					type: R.Text,
					text: t.textContent
				});
				break;
			case "delText":
				n.children.push({
					type: R.DeletedText,
					text: t.textContent
				});
				break;
			case "commentReference":
				n.children.push(new Ur(F.attr(t, "id")));
				break;
			case "fldSimple":
				n.children.push(this.parseSimpleField(t, n));
				break;
			case "instrText":
				n.fieldRun = !0, n.children.push({
					type: R.Instruction,
					text: t.textContent
				});
				break;
			case "fldChar":
				n.fieldRun = !0, n.children.push({
					type: R.ComplexField,
					charType: F.attr(t, "fldCharType"),
					lock: F.boolAttr(t, "lock", !1),
					dirty: F.boolAttr(t, "dirty", !1)
				});
				break;
			case "noBreakHyphen":
				n.children.push({ type: R.NoBreakHyphen });
				break;
			case "softHyphen":
				n.children.push({ type: R.SoftHyphen });
				break;
			case "cr":
				n.children.push({
					type: R.Break,
					break: "line"
				});
				break;
			case "ptab":
				n.children.push({ type: R.PositionalTab });
				break;
			case "br":
				n.children.push({
					type: R.Break,
					break: F.attr(t, "type") || "textWrapping"
				});
				break;
			case "lastRenderedPageBreak":
				n.children.push({
					type: R.Break,
					break: "lastRenderedPageBreak"
				});
				break;
			case "sym":
				n.children.push({
					type: R.Symbol,
					font: v(F.attr(t, "font")),
					char: F.hexAttr(t, "char")
				});
				break;
			case "tab":
				n.children.push({ type: R.Tab });
				break;
			case "footnoteReference":
				n.children.push({
					type: R.FootnoteReference,
					id: F.attr(t, "id"),
					customMarkFollows: F.boolAttr(t, "customMarkFollows", !1)
				});
				break;
			case "endnoteReference":
				n.children.push({
					type: R.EndnoteReference,
					id: F.attr(t, "id"),
					customMarkFollows: F.boolAttr(t, "customMarkFollows", !1)
				});
				break;
			case "drawing":
				let e = this.parseDrawing(t);
				e && n.children.push(e);
				break;
			case "pict":
				n.children.push(this.parseVmlPicture(t));
				break;
			case "object":
				n.children.push(this.parseVmlPicture(t));
				break;
			case "ruby":
				n.children.push(this.parseRuby(t));
				break;
			case "rPr": this.parseRunProperties(t, n);
		}
		return n;
	}
	parseRuby(e) {
		let t = {
			type: R.Ruby,
			children: []
		};
		for (let n of F.elements(e)) switch (n.localName) {
			case "rubyPr":
				for (let e of F.elements(n)) switch (e.localName) {
					case "rubyAlign": t.align = F.attr(e, "val");
				}
				break;
			case "rt":
				t.children.push(this.parseRubyContent(n, R.RubyText));
				break;
			case "rubyBase": t.children.push(this.parseRubyContent(n, R.RubyBase));
		}
		return t;
	}
	parseRubyContent(e, t) {
		let n = {
			type: t,
			children: []
		};
		for (let r of F.elements(e)) if (r.localName == "r") n.children.push(this.parseRun(r, n));
		else if (t == R.RubyText && r.localName == "rPr") {
			let e = F.element(r, "hps"), t = e ? F.intAttr(e, "val", null) : null;
			t != null && (n.cssStyle = {
				...n.cssStyle ?? {},
				fontSize: `${t / 2}pt`
			});
		}
		return n;
	}
	parseMathElement(e) {
		let t = `${e.localName}Pr`, n = {
			type: Yr[e.localName],
			children: []
		}, r = !1, i = (e) => {
			if (Yr[e.localName]) {
				let t = this.parseMathElement(e);
				t ? (t.parent = n, n.children.push(t)) : r = !0;
			} else if (e.localName == "r") {
				var a = this.parseRun(e, n);
				a.type = R.MmlRun, n.children.push(a);
			} else if (e.localName == t) n.props = this.parseMathProperies(e);
			else if (e.localName == "ins") for (let t of F.elements(e)) i(t);
			else if (e.localName == "del") {
				if (this.options.renderChanges || this.options.reviewMode != null) for (let t of F.elements(e)) i(t);
				else r = !0;
			}
		};
		for (let t of F.elements(e)) i(t);
		return r && !this.hasVisibleMathContent(n) ? null : n;
	}
	hasVisibleMathContent(e) {
		for (let t of e.children ?? []) {
			switch (t.type) {
				case R.Text:
					if (t.text?.length) return !0;
					break;
				case R.DeletedText:
					if ((this.options.renderChanges || this.options.reviewMode != null) && t.text?.length) return !0;
					break;
				case R.Symbol:
				case R.Tab:
				case R.PositionalTab:
				case R.NoBreakHyphen:
				case R.Break: return !0;
			}
			if (this.hasVisibleMathContent(t)) return !0;
		}
		return !1;
	}
	parseMathProperies(e) {
		let t = {};
		for (let n of F.elements(e)) switch (n.localName) {
			case "chr":
				t.char = F.attr(n, "val");
				break;
			case "vertJc":
				t.verticalJustification = F.attr(n, "val");
				break;
			case "pos":
				t.position = F.attr(n, "val");
				break;
			case "degHide":
				t.hideDegree = F.boolAttr(n, "val");
				break;
			case "begChr":
				t.beginChar = F.attr(n, "val");
				break;
			case "endChr":
				t.endChar = F.attr(n, "val");
				break;
			case "limLoc":
				t.limitLocation = F.attr(n, "val");
				break;
			case "grow":
				t.grow = F.boolAttr(n, "val");
				break;
			case "sepChr": t.separatorChar = F.attr(n, "val");
		}
		return t;
	}
	parseRunProperties(e, t) {
		this.parseDefaultProperties(e, t.cssStyle = {}, null, (n) => {
			switch (n.localName) {
				case "rStyle":
					t.styleName = F.attr(n, "val");
					break;
				case "vertAlign":
					t.verticalAlign = J.valueOfVertAlign(n, !0);
					break;
				case "rPrChange":
					this.addFormatRevision(t, n, "run-format", e);
					break;
				default: return !1;
			}
			return !0;
		});
	}
	parseVmlPicture(e) {
		let t = {
			type: R.VmlPicture,
			children: []
		};
		for (let n of F.elements(e)) {
			let e = Mr(n, this);
			e && t.children.push(e);
		}
		return t;
	}
	checkAlternateContent(e) {
		if (e.localName != "AlternateContent") return e;
		for (let t of F.elements(e).filter((e) => e.localName == "Choice")) {
			let n = (F.attr(t, "Requires") ?? "").split(/\s+/).filter(Boolean);
			if (n.length > 0 && n.every((t) => Jr.includes(e.lookupNamespaceURI(t)))) {
				let e = F.elements(t)[0];
				if (e) return e;
			}
		}
		let t = F.element(e, "Fallback");
		return t ? F.elements(t)[0] : null;
	}
	parseDrawing(e) {
		for (var t of F.elements(e)) switch (t.localName) {
			case "inline":
			case "anchor": return this.parseDrawingWrapper(t);
		}
	}
	parseDrawingWrapper(e) {
		var t, n, r, i, a, o, s, c, l, u, d, f = {
			type: R.Drawing,
			children: [],
			cssStyle: {},
			props: {}
		}, p = e.localName == "anchor";
		let m = {
			left: F.lengthAttr(e, "distL", N.Emu),
			top: F.lengthAttr(e, "distT", N.Emu),
			right: F.lengthAttr(e, "distR", N.Emu),
			bottom: F.lengthAttr(e, "distB", N.Emu)
		}, h = (e, t) => {
			t && (f.cssStyle[e] = J.addSize(f.cssStyle[e], t));
		}, g = null, _ = null, v = null, y = F.boolAttr(e, "simplePos", !1), b = F.boolAttr(e, "behindDoc", !1), x = F.intAttr(e, "relativeHeight", null);
		x != null && (f.cssStyle["z-index"] = `${Math.max(1, Math.round(x / 1e3))}`), b && (f.cssStyle["z-index"] = "0");
		let S = {
			relative: "page",
			align: "left",
			offset: "0"
		}, C = {
			relative: "page",
			align: "top",
			offset: "0"
		}, w = !1, T = !1, E = !1, D = !1;
		for (var O of F.elements(e)) switch (O.localName) {
			case "simplePos":
				y && (S.offset = F.lengthAttr(O, "x", N.Emu), C.offset = F.lengthAttr(O, "y", N.Emu), E = S.offset != null, D = C.offset != null);
				break;
			case "extent":
				f.cssStyle.width = F.lengthAttr(O, "cx", N.Emu), f.cssStyle.height = F.lengthAttr(O, "cy", N.Emu);
				break;
			case "effectExtent":
				h("margin-left", F.lengthAttr(O, "l", N.Emu)), h("margin-top", F.lengthAttr(O, "t", N.Emu)), h("margin-right", F.lengthAttr(O, "r", N.Emu)), h("margin-bottom", F.lengthAttr(O, "b", N.Emu));
				break;
			case "docPr":
				f.props.title = F.attr(O, "title") ?? F.attr(O, "name"), f.props.alt = F.attr(O, "descr") ?? f.props.title;
				break;
			case "positionH":
			case "positionV":
				if (!y) {
					let e = O.localName == "positionH", t = e ? S : C;
					var k = F.element(O, "align"), A = F.element(O, "posOffset");
					t.relative = F.attr(O, "relativeFrom") ?? t.relative, k && (t.align = k.textContent, e ? w = !0 : T = !0), A && (t.offset = P(A.textContent, N.Emu), e ? E = t.offset != null : D = t.offset != null);
				}
				break;
			case "wrapTopAndBottom":
				g = "wrapTopAndBottom";
				break;
			case "wrapNone":
				g = "wrapNone";
				break;
			case "wrapSquare":
				g = "wrapSquare", _ = F.attr(O, "wrapText");
				break;
			case "wrapTight":
				g = "wrapTight", _ = F.attr(O, "wrapText"), v = this.parseWrapPolygon(O);
				break;
			case "wrapThrough":
				g = "wrapThrough", _ = F.attr(O, "wrapText"), v = this.parseWrapPolygon(O);
				break;
			case "graphic":
				var j = this.parseGraphic(O);
				j && (j.type == R.Image ? ((t = j).alt ?? (t.alt = f.props.alt), (n = j).title ?? (n.title = f.props.title)) : j.type == R.Shape ? ((r = j).alt ?? (r.alt = f.props.alt), (i = j).title ?? (i.title = f.props.title)) : j.type == R.Chart ? ((a = j).alt ?? (a.alt = f.props.alt), (o = j).title ?? (o.title = f.props.title)) : j.type == R.SmartArt ? ((s = j).alt ?? (s.alt = f.props.alt), (c = j).title ?? (c.title = f.props.title)) : j.type == R.Ink && ((l = j).alt ?? (l.alt = f.props.alt), (u = j).title ?? (u.title = f.props.title)), f.children.push(j));
		}
		f.props.anchorPosition = {
			horizontal: {
				...S,
				offsetSpecified: E,
				alignSpecified: w
			},
			vertical: {
				...C,
				offsetSpecified: D,
				alignSpecified: T
			},
			wrapType: g,
			layoutInCell: F.boolAttr(e, "layoutInCell", !0),
			simplePos: y
		}, g != "wrapNone" && (h("margin-left", m.left), h("margin-top", m.top), h("margin-right", m.right), h("margin-bottom", m.bottom));
		let M = () => {
			switch (S.align) {
				case "center":
					f.cssStyle["margin-left"] = "auto", f.cssStyle["margin-right"] = "auto";
					break;
				case "right": f.cssStyle["margin-left"] = "auto";
			}
		}, ee = () => {
			w ? M() : E && S.offset && (f.cssStyle["margin-inline-start"] = J.addSize(f.cssStyle["margin-inline-start"], S.offset));
		}, te = () => {
			D && C.offset && (f.cssStyle["margin-top"] = J.addSize(f.cssStyle["margin-top"], C.offset));
		};
		return g == "wrapTopAndBottom" ? (f.cssStyle.display = "block", f.cssStyle.clear = "both", ee(), te()) : g == "wrapNone" ? (f.cssStyle.display = "block", f.cssStyle.position = p ? "absolute" : "relative", S.offset && (f.cssStyle.left = S.offset), C.offset && (f.cssStyle.top = C.offset)) : g == "wrapSquare" || g == "wrapTight" || g == "wrapThrough" ? (v && (f.cssStyle["shape-outside"] = v, (d = f.cssStyle)["clip-path"] ?? (d["clip-path"] = v)), _ == "left" ? f.cssStyle.float = "right" : _ == "right" ? f.cssStyle.float = "left" : S.align == "left" || S.align == "right" ? f.cssStyle.float = S.align : (f.cssStyle.display = "block", M())) : p && (S.align == "left" || S.align == "right") ? f.cssStyle.float = S.align : f.cssStyle["vertical-align"] = "text-bottom", this.applyDrawingFloatOffsets(f, e);
	}
	applyDrawingFloatOffsets(e, t) {
		let n = e.cssStyle, r = e.props?.anchorPosition;
		if (!n?.float || !r) return e;
		let i = (e) => {
			if (r.simplePos) return !0;
			let n = F.element(t, `position${e}`);
			return !!n && !!F.element(n, "posOffset");
		}, a = /^-?\d+(?:\.\d+)?(?:pt|px|in|cm|mm)?$/, o = r.horizontal, s = r.vertical;
		return i("H") && o?.relative == "column" && a.test(o.offset ?? "") && a.test(n.width ?? "") && (n["--docx-float-column-position"] = o.offset, n["--docx-float-origin-offset"] = "0px", n.float == "right" ? n["margin-right"] = `calc(100% - ${o.offset} - ${n.width} - var(--docx-float-origin-offset, 0px))` : n.float == "left" && (n["margin-left"] = `calc(${o.offset} + var(--docx-float-origin-offset, 0px))`)), i("V") && s?.relative == "paragraph" && a.test(s.offset ?? "") && (n["margin-top"] = s.offset), e;
	}
	parseWrapPolygon(e) {
		let t = F.element(e, "wrapPolygon");
		if (!t) return null;
		let n = [], r = (e) => {
			let t = F.lengthAttr(e, "x", N.Emu), r = F.lengthAttr(e, "y", N.Emu);
			t && r && n.push(`${t} ${r}`);
		};
		for (let e of F.elements(t)) (e.localName == "start" || e.localName == "lineTo") && r(e);
		return n.length >= 3 ? `polygon(${n.join(", ")})` : null;
	}
	parseGraphic(e) {
		var t = F.element(e, "graphicData");
		if (!t) return null;
		for (let e of F.elements(t)) switch (e.localName) {
			case "pic": return this.parsePicture(e);
			case "wpc":
			case "wgp":
			case "grpSp": return this.parseDrawingContainer(e);
			case "wsp":
			case "sp":
			case "cxnSp": return this.parseWordprocessingShape(e);
			case "chart": return this.parseChartReference(e);
			case "relIds": return this.parseSmartArtReference(e);
			case "diagram": return this.parseSmartArtReference(e);
			case "contentPart":
			case "ink": return this.parseInkReference(e);
		}
		let n = this.findDescendant(t, "contentPart");
		return n ? this.parseInkReference(n) : null;
	}
	parseDrawingContainer(e, t) {
		let n = {
			type: R.Shape,
			children: [],
			cssStyle: {
				display: "inline-block",
				position: "relative",
				width: "100%",
				height: "100%",
				overflow: "visible",
				"box-sizing": "border-box"
			},
			props: { dmlContainer: !0 }
		}, r = this.parseDmlGroupTransform(e, t);
		for (let t of F.elements(e)) switch (t.localName) {
			case "wsp":
			case "sp":
			case "cxnSp":
				let e = this.parseDmlPositionedShape(t, r);
				e && n.children.push(e);
				break;
			case "pic":
				let i = this.parseDmlPositionedPicture(t, r);
				i && n.children.push(i);
				break;
			case "grpSp":
			case "wgp":
				let a = this.parseDrawingContainer(t, r);
				a && n.children.push(a);
		}
		return n;
	}
	parseDmlGroupTransform(e, t) {
		let n = F.element(e, "grpSpPr"), r = n ? F.element(n, "xfrm") : F.element(e, "xfrm"), i = r ? F.element(r, "off") : null, a = r ? F.element(r, "ext") : null, o = r ? F.element(r, "chOff") : null, s = r ? F.element(r, "chExt") : null, c = a ? F.floatAttr(a, "cx", null) : null, l = a ? F.floatAttr(a, "cy", null) : null, u = s ? F.floatAttr(s, "cx", null) : null, d = s ? F.floatAttr(s, "cy", null) : null, f = t?.scaleX ?? 1, p = t?.scaleY ?? 1, m = i ? F.floatAttr(i, "x", 0) : 0, h = i ? F.floatAttr(i, "y", 0) : 0;
		return {
			originX: t ? t.originX + (m - t.offsetX) * f : 0,
			originY: t ? t.originY + (h - t.offsetY) * p : 0,
			offsetX: o ? F.floatAttr(o, "x", 0) : 0,
			offsetY: o ? F.floatAttr(o, "y", 0) : 0,
			scaleX: f * (c && u ? c / u : 1),
			scaleY: p * (l && d ? l / d : 1)
		};
	}
	parseDmlPositionedPicture(e, t) {
		let n = this.parsePicture(e), r = F.element(e, "spPr");
		if (!n || !r) return n;
		let i = this.parseDmlShapeBounds(r, t);
		return n.cssStyle.position = "absolute", n.cssStyle.left = this.pt(i.left), n.cssStyle.top = this.pt(i.top), n.cssStyle.width = this.pt(i.width), n.cssStyle.height = this.pt(i.height), n;
	}
	parseDmlPositionedShape(e, t) {
		let n = F.element(e, "spPr");
		if (!n) return null;
		let r = this.parseDmlShapeBounds(n, t), i = [], a = null, o = !1;
		for (let t of F.elements(e)) switch (t.localName) {
			case "txbx":
			case "textBox":
				o = !0;
				for (let e of F.elements(t, "txbxContent")) i.push(...this.parseBodyElements(e));
				break;
			case "bodyPr": a = t;
		}
		a ??= F.element(e, "bodyPr");
		let s = {
			position: "absolute",
			left: this.pt(r.left),
			top: this.pt(r.top),
			width: this.pt(r.width),
			height: this.pt(r.height),
			"box-sizing": "border-box",
			overflow: "hidden"
		}, c = F.element(e, "cNvPr"), l = F.element(n, "custGeom"), u = F.element(n, "prstGeom"), d = this.parseDmlFillStyle(n), f = this.parseDmlLineStyle(F.element(n, "ln")), p = l ? null : this.parseDmlRoundRectRadius(n, r.width, r.height, t);
		if (p != null && (s["border-radius"] = p), l) {
			let e = this.parseDmlCustomGeometry(l);
			return {
				type: R.Shape,
				children: [],
				cssStyle: {
					...s,
					overflow: "visible"
				},
				props: {
					dmlSvg: !0,
					viewBox: e?.viewBox ?? "0 0 1 1",
					pathD: e?.d ?? "",
					fill: d.fill ?? "none",
					stroke: f.stroke ?? "none",
					strokeWidth: f.strokeWidth ?? "0",
					strokeDasharray: f.strokeDasharray
				},
				title: c ? F.attr(c, "title") ?? F.attr(c, "name") : null,
				alt: c ? F.attr(c, "descr") : null
			};
		}
		d.backgroundColor && (s["background-color"] = d.backgroundColor), d.backgroundImage && (s["background-image"] = d.backgroundImage), s.border = f.stroke && f.stroke != "none" ? `${f.strokeWidth || "0.75pt"} ${f.borderType || "solid"} ${f.stroke}` : "none";
		let m = o ? this.parseDmlTextBoxProperties(a) : null;
		return {
			type: R.Shape,
			children: i,
			cssStyle: s,
			props: {
				dmlShape: !0,
				presetGeometry: u ? F.attr(u, "prst") : null,
				...m
			},
			title: c ? F.attr(c, "title") ?? F.attr(c, "name") : null,
			alt: c ? F.attr(c, "descr") : null
		};
	}
	parseDmlRoundRectRadius(e, t, n, r) {
		let i = F.element(e, "prstGeom");
		if (!i || F.attr(i, "prst") != "roundRect") return null;
		let a = F.element(i, "avLst"), o = (a ? F.elements(a, "gd") : []).find((e) => F.attr(e, "name") == "adj"), s = o ? F.attr(o, "fmla") : "", c = /^val\s+[+-]?(?:\d+(?:\.\d*)?|\.\d+)\s*$/.test(s ?? "") ? Number(s.trim().split(/\s+/)[1]) : 16667, l = Math.max(0, Math.min(5e4, c)) / 1e5, u = Math.abs(r?.scaleX ?? 1), d = Math.abs(r?.scaleY ?? 1), f = Number.isFinite(u) && Number.isFinite(d) && u > 0 && d > 0 ? Math.min(t / u, n / d) * l : 0;
		return `${this.pt(Number.isFinite(f * u) ? f * u : 0)} / ${this.pt(Number.isFinite(f * d) ? f * d : 0)}`;
	}
	parseDmlShapeBounds(e, t) {
		let n = F.element(e, "xfrm"), r = n ? F.element(n, "off") : null, i = n ? F.element(n, "ext") : null, a = t?.scaleX ?? 1, o = t?.scaleY ?? 1, s = t?.offsetX ?? 0, c = t?.offsetY ?? 0, l = t?.originX ?? 0, u = t?.originY ?? 0, d = r ? F.floatAttr(r, "x", 0) : 0, f = r ? F.floatAttr(r, "y", 0) : 0, p = i ? F.floatAttr(i, "cx", 0) : 0, m = i ? F.floatAttr(i, "cy", 0) : 0;
		return {
			left: this.emuToPt(l + (d - s) * a),
			top: this.emuToPt(u + (f - c) * o),
			width: Math.max(0, this.emuToPt(p * a)),
			height: Math.max(0, this.emuToPt(m * o))
		};
	}
	parseDmlFillStyle(e) {
		if (F.element(e, "noFill")) return {
			fill: "none",
			backgroundColor: "transparent"
		};
		let t = F.element(e, "solidFill");
		if (t) {
			let e = this.parseDmlColor(t) ?? "transparent";
			return {
				fill: e,
				backgroundColor: e
			};
		}
		let n = F.element(e, "pattFill");
		if (n) {
			let e = this.parseDmlColor(F.element(n, "fgClr")) ?? "currentColor", t = this.parseDmlColor(F.element(n, "bgClr")) ?? "transparent", r = F.attr(n, "prst");
			return {
				fill: t,
				backgroundColor: t,
				backgroundImage: `repeating-linear-gradient(${r && r.toLowerCase().includes("horz") ? "0deg" : "90deg"}, ${e} 0, ${e} 0.75pt, ${t} 0.75pt, ${t} 3pt)`
			};
		}
		return {
			fill: "none",
			backgroundColor: "transparent"
		};
	}
	parseDmlLineStyle(e) {
		if (!e || F.element(e, "noFill")) return {
			stroke: "none",
			strokeWidth: "0",
			borderType: "none"
		};
		let t = this.parseDmlColor(F.element(e, "solidFill")) ?? "black", n = F.attr(e, "w") ? this.pt(this.emuToPt(F.floatAttr(e, "w", 0))) : "0.75pt", r = F.elementAttr(e, "prstDash", "val"), i = null, a = "solid";
		return r && r != "solid" && (a = "dashed", i = r == "dot" ? "1 2" : "4 3"), {
			stroke: t,
			strokeWidth: n,
			borderType: a,
			strokeDasharray: i
		};
	}
	parseDmlCustomGeometry(e) {
		let t = F.element(e, "pathLst"), n = t ? F.elements(t, "path") : [], r = "", i = 1, a = 1;
		for (let e of n) {
			let t = F.floatAttr(e, "w", i), n = F.floatAttr(e, "h", a);
			i = Math.max(i, t || 1), a = Math.max(a, n || 1), r += this.parseDmlPathData(e, t || 1, n || 1);
		}
		return {
			d: r.trim(),
			viewBox: `0 0 ${i} ${a}`
		};
	}
	parseDmlPathData(e, t, n) {
		let r = [], i = (e) => {
			let r = F.element(e, "pt");
			return r ? `${this.dmlCoord(F.attr(r, "x"), t, n)} ${this.dmlCoord(F.attr(r, "y"), t, n)}` : "0 0";
		};
		for (let a of F.elements(e)) switch (a.localName) {
			case "moveTo":
				r.push(`M ${i(a)}`);
				break;
			case "lnTo":
				r.push(`L ${i(a)}`);
				break;
			case "cubicBezTo":
				let e = F.elements(a, "pt").map((e) => `${this.dmlCoord(F.attr(e, "x"), t, n)} ${this.dmlCoord(F.attr(e, "y"), t, n)}`);
				e.length == 3 && r.push(`C ${e.join(" ")}`);
				break;
			case "quadBezTo":
				let o = F.elements(a, "pt").map((e) => `${this.dmlCoord(F.attr(e, "x"), t, n)} ${this.dmlCoord(F.attr(e, "y"), t, n)}`);
				o.length == 2 && r.push(`Q ${o.join(" ")}`);
				break;
			case "close": r.push("Z");
		}
		return r.join(" ") + " ";
	}
	dmlCoord(e, t, n) {
		if (e == "w" || e == "r") return t;
		if (e == "h" || e == "b") return n;
		if (e == "l" || e == "t") return 0;
		let r = parseFloat(e);
		return Number.isFinite(r) ? r : 0;
	}
	dmlVerticalAlign(e) {
		switch (e ? F.attr(e, "anchor") : null) {
			case "ctr": return "center";
			case "b": return "flex-end";
			default: return "flex-start";
		}
	}
	applyDmlTextInsets(e, t) {
		if (e) for (let [n, r] of Object.entries({
			lIns: "padding-left",
			tIns: "padding-top",
			rIns: "padding-right",
			bIns: "padding-bottom"
		})) {
			let i = F.attr(e, n);
			i != null && (t[r] = this.pt(this.emuToPt(parseFloat(i))));
		}
	}
	parseDmlTextBoxProperties(e) {
		let t = {};
		return this.applyDmlTextInsets(e, t), {
			dmlTextBox: !0,
			textInsets: t,
			textCompatibleLineSpacing: e ? F.boolAttr(e, "compatLnSpc", !1) : !1,
			textVerticalAlign: this.dmlVerticalAlign(e)
		};
	}
	emuToPt(e) {
		return (Number.isFinite(e) ? e : 0) / 12700;
	}
	pt(e) {
		return `${Math.round(e * 100) / 100}pt`;
	}
	parseChartReference(e) {
		return {
			type: R.Chart,
			id: F.attr(e, "id"),
			cssStyle: {
				width: "100%",
				height: "100%"
			}
		};
	}
	parseSmartArtReference(e) {
		let t = e.localName == "relIds" ? e : this.findDescendant(e, "relIds");
		return {
			type: R.SmartArt,
			dataId: t ? F.attr(t, "dm") : F.attr(e, "dm"),
			layoutId: t ? F.attr(t, "lo") : F.attr(e, "lo"),
			styleId: t ? F.attr(t, "qs") : F.attr(e, "qs"),
			colorId: t ? F.attr(t, "cs") : F.attr(e, "cs"),
			cssStyle: {
				width: "100%",
				height: "100%"
			}
		};
	}
	parseInkReference(e) {
		return {
			type: R.Ink,
			id: F.attr(e, "id"),
			cssStyle: {
				width: "100%",
				height: "100%"
			}
		};
	}
	parseGraphicPlaceholder(e) {
		return {
			type: R.Shape,
			children: [{
				type: R.Text,
				text: `[${e}]`
			}],
			cssStyle: {
				display: "inline-flex",
				"align-items": "center",
				"justify-content": "center",
				border: "1px solid #999",
				"background-color": "#f8f8f8",
				color: "#555",
				"min-width": "2in",
				"min-height": "1in"
			}
		};
	}
	parseWordprocessingShape(e) {
		let t = {
			type: R.Shape,
			children: [],
			cssStyle: {
				display: "inline-block",
				position: "relative",
				"box-sizing": "border-box",
				overflow: "hidden"
			}
		}, n = this.findDescendant(e, "cNvPr"), r = null, i = !1;
		n && (t.title = F.attr(n, "title") ?? F.attr(n, "name"), t.alt = F.attr(n, "descr") ?? t.title);
		for (let n of F.elements(e)) switch (n.localName) {
			case "spPr":
				this.parseDmlShapeProperties(n, t.cssStyle);
				break;
			case "txbx":
			case "textBox":
				i = !0;
				for (let e of F.elements(n, "txbxContent")) t.children.push(...this.parseBodyElements(e));
				break;
			case "bodyPr": r = n;
		}
		return i && (t.props = {
			...t.props ?? {},
			...this.parseDmlTextBoxProperties(r)
		}), t;
	}
	parseDmlShapeProperties(e, t) {
		let n = F.element(e, "xfrm"), r = this.parseDmlShapeBounds(e), i = this.parseDmlRoundRectRadius(e, r.width, r.height);
		if (i != null && (t["border-radius"] = i), n) for (let e of F.elements(n)) switch (e.localName) {
			case "ext": t.width = F.lengthAttr(e, "cx", N.Emu), t.height = F.lengthAttr(e, "cy", N.Emu);
		}
		let a = F.element(e, "solidFill"), o = F.element(e, "noFill"), s = F.element(e, "ln");
		if (a ? t["background-color"] = this.parseDmlColor(a) ?? t["background-color"] : o && (t["background-color"] = "transparent"), s && F.element(s, "noFill")) t.border = "none";
		else if (s) {
			let e = this.parseDmlColor(F.element(s, "solidFill")) ?? "black", n = F.lengthAttr(s, "w", N.Emu) ?? "1px", r = F.elementAttr(s, "prstDash", "val");
			t.border = `${n} ${r && r != "solid" ? "dashed" : "solid"} ${e}`;
		}
	}
	parseDmlColor(e) {
		if (!e) return null;
		let t = F.element(e, "srgbClr"), n = F.element(e, "schemeClr"), r = F.element(e, "prstClr"), i = F.element(e, "sysClr");
		if (t) return this.applyDmlColorTransforms(t, `#${F.attr(t, "val")}`);
		if (n) {
			let e = this.resolveDmlSchemeColor(F.attr(n, "val")), t = this.dmlSchemeColorFallback(e);
			return this.applyDmlColorTransforms(n, `var(--docx-${e}-color${t ? `, ${t}` : ""})`);
		}
		return i ? this.applyDmlColorTransforms(i, `#${F.attr(i, "lastClr") ?? F.attr(i, "val")}`) : r ? this.applyDmlColorTransforms(r, F.attr(r, "val")) : null;
	}
	resolveDmlSchemeColor(e) {
		switch (e) {
			case "bg1": return "lt1";
			case "tx1": return "dk1";
			case "bg2": return "lt2";
			case "tx2": return "dk2";
			default: return e;
		}
	}
	dmlSchemeColorFallback(e) {
		return ei(e);
	}
	applyDmlColorTransforms(e, t) {
		let n = F.elementAttr(e, "lumMod", "val"), r = F.elementAttr(e, "lumOff", "val");
		if (n != null) {
			let e = Math.max(0, Math.min(100, parseFloat(n) / 1e3));
			Number.isFinite(e) && e < 100 && (t = `color-mix(in srgb, ${t} ${e}%, black)`);
		}
		if (r != null) {
			let e = Math.max(0, Math.min(100, parseFloat(r) / 1e3));
			Number.isFinite(e) && e > 0 && (t = `color-mix(in srgb, ${t} ${100 - e}%, white)`);
		}
		return t;
	}
	findDescendant(e, t) {
		for (let n of F.elements(e)) {
			if (n.localName == t) return n;
			let e = this.findDescendant(n, t);
			if (e) return e;
		}
		return null;
	}
	parsePicture(e) {
		var t = {
			type: R.Image,
			src: "",
			cssStyle: {}
		}, n = F.element(e, "blipFill"), r = n ? F.element(n, "blip") : null, i = n ? F.element(n, "srcRect") : null;
		t.src = r ? F.attr(r, "embed") ?? F.attr(r, "link") : "";
		let a = this.findDescendant(e, "cNvPr");
		a && (t.title = F.attr(a, "title") ?? F.attr(a, "name"), t.alt = F.attr(a, "descr") ?? t.title), i && (t.srcRect = [
			F.intAttr(i, "l", 0) / 1e5,
			F.intAttr(i, "t", 0) / 1e5,
			F.intAttr(i, "r", 0) / 1e5,
			F.intAttr(i, "b", 0) / 1e5
		]);
		var o = F.element(e, "spPr"), s = o ? F.element(o, "xfrm") : null, c = [];
		if (t.cssStyle.display = "block", t.cssStyle.position = "relative", t.cssStyle["object-fit"] = "contain", s) {
			t.rotation = F.intAttr(s, "rot", 0) / 6e4, F.boolAttr(s, "flipH", !1) && c.push("scaleX(-1)"), F.boolAttr(s, "flipV", !1) && c.push("scaleY(-1)");
			for (var l of F.elements(s)) switch (l.localName) {
				case "ext": t.cssStyle.width = F.lengthAttr(l, "cx", N.Emu), t.cssStyle.height = F.lengthAttr(l, "cy", N.Emu);
			}
		}
		return c.length > 0 && (t.cssStyle.transform = c.join(" ")), t.cssStyle.width || (t.cssStyle.width = "100%"), t.cssStyle.height || (t.cssStyle.height = "100%"), t;
	}
	parseTable(e) {
		var t = {
			type: R.Table,
			children: []
		};
		for (let n of F.elements(e)) switch (n.localName) {
			case "tr":
				t.children.push(this.parseTableRow(n));
				break;
			case "tblGrid":
				t.columns = this.parseTableColumns(n);
				break;
			case "tblPr": this.parseTableProperties(n, t);
		}
		return t;
	}
	parseTableColumns(e) {
		var t = [];
		for (let n of F.elements(e)) switch (n.localName) {
			case "gridCol": t.push({ width: F.lengthAttr(n, "w") });
		}
		return t;
	}
	parseTableProperties(e, t) {
		t.cssStyle = {}, t.cellStyle = {};
		let n = null;
		switch (this.parseDefaultProperties(e, t.cssStyle, t.cellStyle, (r) => {
			switch (r.localName) {
				case "tblStyle":
					t.styleName = F.attr(r, "val");
					break;
				case "tblLook":
					t.className = J.classNameOftblLook(r);
					break;
				case "tblInd":
					n = this.parseTableIndentation(r);
					break;
				case "tblpPr":
					this.parseTablePosition(r, t);
					break;
				case "tblStyleColBandSize":
					t.colBandSize = F.intAttr(r, "val");
					break;
				case "tblStyleRowBandSize":
					t.rowBandSize = F.intAttr(r, "val");
					break;
				case "tblPrChange":
					this.addFormatRevision(t, r, "table-format", e);
					break;
				case "hidden":
					F.boolAttr(r, "val", !0) && (t.cssStyle.display = "none");
					break;
				default: return !1;
			}
			return !0;
		}), t.cssStyle["text-align"]) {
			case "center":
				delete t.cssStyle["text-align"], t.cssStyle["margin-left"] = "auto", t.cssStyle["margin-right"] = "auto";
				break;
			case "right":
				delete t.cssStyle["text-align"], t.cssStyle["margin-left"] = "auto";
				break;
			default: delete t.cssStyle["text-align"], n && (t.cssStyle["margin-inline-start"] = J.addSize(t.cssStyle["margin-inline-start"], n));
		}
	}
	parseTableIndentation(e) {
		let t = F.attr(e, "type");
		return t == "pct" || t == "auto" ? null : F.lengthAttr(e, "w", N.SignedDxa);
	}
	parseTablePosition(e, t) {
		var n = F.lengthAttr(e, "topFromText"), r = F.lengthAttr(e, "bottomFromText"), i = F.lengthAttr(e, "rightFromText"), a = F.lengthAttr(e, "leftFromText");
		t.cssStyle.float = "left", t.cssStyle["margin-bottom"] = J.addSize(t.cssStyle["margin-bottom"], r), t.cssStyle["margin-left"] = J.addSize(t.cssStyle["margin-left"], a), t.cssStyle["margin-right"] = J.addSize(t.cssStyle["margin-right"], i), t.cssStyle["margin-top"] = J.addSize(t.cssStyle["margin-top"], n);
	}
	parseTableRow(e) {
		var t = {
			type: R.Row,
			children: []
		};
		for (let n of F.elements(e)) switch (n.localName) {
			case "tc":
				t.children.push(this.parseTableCell(n));
				break;
			case "trPr":
			case "tblPrEx": this.parseTableRowProperties(n, t);
		}
		return t.children = this.normalizeHorizontalMerges(t.children), t;
	}
	normalizeHorizontalMerges(e) {
		let t = [];
		for (let n = 0; n < e.length; n++) {
			let r = e[n];
			if (r.horizontalMerge != "restart") {
				t.push(r);
				continue;
			}
			let i = r.span ?? 1, a = n + 1;
			for (; a < e.length && e[a].horizontalMerge == "continue";) i += e[a].span ?? 1, a++;
			a > n + 1 && (r.span = i, n = a - 1), t.push(r);
		}
		return t;
	}
	parseTableRowProperties(e, t) {
		let n = {};
		t.cssStyle = this.parseDefaultProperties(e, n, null, (r) => {
			switch (r.localName) {
				case "cnfStyle":
					t.className = J.classNameOfCnfStyle(r);
					break;
				case "tblHeader":
					t.isHeader = F.boolAttr(r, "val", !0);
					break;
				case "gridBefore":
					t.gridBefore = F.intAttr(r, "val");
					break;
				case "gridAfter":
					t.gridAfter = F.intAttr(r, "val");
					break;
				case "cantSplit":
					F.boolAttr(r, "val", !0) && (n["break-inside"] = "avoid");
					break;
				case "hidden":
					F.boolAttr(r, "val", !0) && (n.display = "none");
					break;
				case "ins":
					this.addStructuralRevision(t, r, "insert");
					break;
				case "del":
					this.addStructuralRevision(t, r, "delete");
					break;
				case "trPrChange":
					this.addFormatRevision(t, r, "row-format", e);
					break;
				default: return !1;
			}
			return !0;
		});
	}
	parseTableCell(e) {
		var t = {
			type: R.Cell,
			children: []
		};
		for (let n of F.elements(e)) switch (n.localName) {
			case "tbl":
				t.children.push(this.parseTable(n));
				break;
			case "p":
				t.children.push(this.parseParagraph(n));
				break;
			case "tcPr": this.parseTableCellProperties(n, t);
		}
		return t;
	}
	parseTableCellProperties(e, t) {
		t.cssStyle = this.parseDefaultProperties(e, {}, null, (n) => {
			switch (n.localName) {
				case "gridSpan":
					t.span = F.intAttr(n, "val", null);
					break;
				case "hMerge":
					t.horizontalMerge = F.attr(n, "val") ?? "continue";
					break;
				case "vMerge":
					t.verticalMerge = F.attr(n, "val") ?? "continue";
					break;
				case "cnfStyle":
					t.className = J.classNameOfCnfStyle(n);
					break;
				case "tcPrChange":
					this.addFormatRevision(t, n, "cell-format", e);
					break;
				default: return !1;
			}
			return !0;
		});
		let n = F.element(e, "tcBorders");
		if (n) {
			let e = {};
			for (let t of F.elements(n)) (t.localName === "tl2br" || t.localName === "tr2bl") && (e[t.localName] = J.valueOfBorder(t));
			Object.keys(e).length && (t.props = {
				...t.props,
				diagonalBorders: e
			});
		}
		this.parseTableCellVerticalText(e, t);
	}
	addStructuralRevision(e, t, n) {
		e.props = {
			...e.props ?? {},
			revision: this.revisionMetadata(t, n)
		};
	}
	addFormatRevision(e, t, n, r) {
		let i = F.elements(t)[0], a = this.captureFormatProperties(i), o = this.captureFormatProperties(r), s = [.../* @__PURE__ */ new Set([...Object.keys(a), ...Object.keys(o)])].sort().filter((e) => a[e] !== o[e]).map((e) => ({
			property: e,
			before: a[e],
			after: o[e]
		})), c = {
			...this.revisionMetadata(t, n),
			formatChanges: s
		}, l = [...e.props?.formatRevisions ?? [], c];
		e.props = {
			...e.props ?? {},
			formatRevisions: l
		};
	}
	captureFormatProperties(e) {
		let t = {};
		if (!e) return t;
		for (let n of F.elements(e)) /PrChange$/.test(n.localName) || (t[n.localName] = this.serializeFormatProperty(n));
		return t;
	}
	serializeFormatProperty(e) {
		let t = Array.from(e.attributes ?? []).map((e) => [e.localName || e.name, e.value]).sort(([e], [t]) => e.localeCompare(t)).map(([e, t]) => `${e}=${t}`), n = F.elements(e).map((e) => `${e.localName}{${this.serializeFormatProperty(e)}}`);
		return [...t, ...n].join("|") || "true";
	}
	revisionMetadata(e, t) {
		return {
			id: F.attr(e, "id"),
			author: F.attr(e, "author"),
			date: F.attr(e, "date"),
			kind: t
		};
	}
	parseTableCellVerticalText(e, t) {
		let n = {
			btLr: {
				writingMode: "vertical-rl",
				transform: "rotate(180deg)"
			},
			lrTb: {
				writingMode: "vertical-lr",
				transform: "none"
			},
			tbRl: {
				writingMode: "vertical-rl",
				transform: "none"
			}
		};
		for (let r of F.elements(e)) if (r.localName === "textDirection") {
			let e = n[F.attr(r, "val")] || { writingMode: "horizontal-tb" };
			t.cssStyle["writing-mode"] = e.writingMode, t.cssStyle.transform = e.transform;
		}
	}
	parseDefaultProperties(e, t = null, n = null, r = null) {
		t ||= {};
		let i = F.element(e, "lang"), a = {
			latin: i ? F.attr(i, "val") : "",
			eastAsia: i ? F.attr(i, "eastAsia") : "",
			bidi: i ? F.attr(i, "bidi") : ""
		};
		for (let i of F.elements(e)) if (!r?.(i)) switch (i.localName) {
			case "jc":
				t["text-align"] = J.valueOfJc(i);
				break;
			case "textAlignment":
				t["vertical-align"] = J.valueOfTextAlignment(i);
				break;
			case "autoSpaceDE":
			case "autoSpaceDN":
				t[i.localName == "autoSpaceDE" ? "--docx-auto-space-de" : "--docx-auto-space-dn"] = `${F.boolAttr(i, "val", !0)}`;
				break;
			case "color":
				t.color = ti.colorAttr(i, "val", null, qr.color);
				break;
			case "sz":
				t["font-size"] = t["min-height"] = F.lengthAttr(i, "val", N.FontSize);
				break;
			case "szCs":
				t["font-size"] ?? (t["font-size"] = F.lengthAttr(i, "val", N.FontSize)), t["min-height"] ?? (t["min-height"] = t["font-size"]);
				break;
			case "shd":
				t["background-color"] = ti.colorAttr(i, "fill", null, qr.shd);
				break;
			case "highlight":
				t["background-color"] = ti.colorAttr(i, "val", null, qr.highlight);
				break;
			case "vertAlign":
				t["vertical-align"] = J.valueOfVertAlign(i);
				break;
			case "position":
				t["vertical-align"] = F.lengthAttr(i, "val", N.SignedHalfPoint);
				break;
			case "w":
			case "scale":
				let r = F.intAttr(i, "val", 100);
				Number.isFinite(r) && r > 0 && r <= 600 && (t["--docx-text-scale"] = `${r / 100}`);
				break;
			case "tcW": if (this.options.ignoreWidth) break;
			case "tblW":
				t.width = J.valueOfSize(i, "w");
				break;
			case "trHeight":
				this.parseTrHeight(i, t);
				break;
			case "strike":
				t["text-decoration"] = F.boolAttr(i, "val", !0) ? "line-through" : "none";
				break;
			case "dstrike":
				F.boolAttr(i, "val", !0) ? (t["text-decoration-line"] = "line-through", t["text-decoration-style"] = "double") : t["text-decoration"] = "none";
				break;
			case "b":
				t["font-weight"] = F.boolAttr(i, "val", !0) ? "bold" : "normal";
				break;
			case "i":
				t["font-style"] = F.boolAttr(i, "val", !0) ? "italic" : "normal";
				break;
			case "bCs":
				t["--docx-bidi-font-weight"] = F.boolAttr(i, "val", !0) ? "bold" : "normal", t.direction == "rtl" && (t["font-weight"] = t["--docx-bidi-font-weight"]);
				break;
			case "iCs":
				t["--docx-bidi-font-style"] = F.boolAttr(i, "val", !0) ? "italic" : "normal", t.direction == "rtl" && (t["font-style"] = t["--docx-bidi-font-style"]);
				break;
			case "caps":
				t["text-transform"] = F.boolAttr(i, "val", !0) ? "uppercase" : "none";
				break;
			case "smallCaps":
				t["font-variant"] = F.boolAttr(i, "val", !0) ? "small-caps" : "none";
				break;
			case "rtl":
				F.boolAttr(i, "val", !0) && (t.direction = "rtl", t["unicode-bidi"] = "embed", t["--docx-bidi-font-weight"] && (t["font-weight"] = t["--docx-bidi-font-weight"]), t["--docx-bidi-font-style"] && (t["font-style"] = t["--docx-bidi-font-style"]));
				break;
			case "outline":
				F.boolAttr(i, "val", !0) && (t["-webkit-text-stroke"] = "0.5px currentColor");
				break;
			case "shadow":
				F.boolAttr(i, "val", !0) && (t["text-shadow"] = "1px 1px 0 currentColor");
				break;
			case "emboss":
				F.boolAttr(i, "val", !0) && (t["text-shadow"] = "-1px -1px 0 rgba(255,255,255,.75), 1px 1px 0 rgba(0,0,0,.35)");
				break;
			case "imprint":
				F.boolAttr(i, "val", !0) && (t["text-shadow"] = "1px 1px 0 rgba(255,255,255,.75), -1px -1px 0 rgba(0,0,0,.35)");
				break;
			case "em":
				t["text-emphasis-style"] = J.valueOfEmphasisMark(i);
				break;
			case "u":
				this.parseUnderline(i, t);
				break;
			case "ind":
			case "tblInd":
				this.parseIndentation(i, t);
				break;
			case "rFonts":
				this.parseFont(i, t, a);
				break;
			case "tblBorders":
				this.parseBorderProperties(i, n || t);
				break;
			case "tblCellSpacing":
				t["border-spacing"] = J.valueOfMargin(i), t["border-collapse"] = "separate";
				break;
			case "pBdr":
				this.parseBorderProperties(i, t);
				break;
			case "bdr":
				t.border = J.valueOfBorder(i);
				break;
			case "tcBorders":
				this.parseBorderProperties(i, t);
				break;
			case "vanish":
				F.boolAttr(i, "val", !0) && (t.display = "none");
				break;
			case "kern":
				t["font-kerning"] = F.intAttr(i, "val", 0) > 0 ? "normal" : "none";
				break;
			case "noWrap":
				t["white-space"] = F.boolAttr(i, "val", !0) ? "nowrap" : "normal";
				break;
			case "snapToGrid":
				t["--docx-snap-to-grid"] = F.boolAttr(i, "val", !0) ? "1" : "0";
				break;
			case "fitText":
				this.parseFitText(i, t);
				break;
			case "eastAsianLayout":
				this.parseEastAsianLayout(i, t);
				break;
			case "tblCellMar":
			case "tcMar":
				this.parseMarginProperties(i, n || t);
				break;
			case "tblLayout":
				t["table-layout"] = J.valueOfTblLayout(i);
				break;
			case "vAlign":
				t["vertical-align"] = J.valueOfTextAlignment(i);
				break;
			case "spacing":
				e.localName == "pPr" ? this.parseSpacing(i, t) : e.localName == "rPr" && (t["letter-spacing"] = F.lengthAttr(i, "val", N.SignedDxa));
				break;
			case "wordWrap":
				F.boolAttr(i, "val") && (t["overflow-wrap"] = "break-word");
				break;
			case "suppressAutoHyphens":
				t.hyphens = F.boolAttr(i, "val", !0) ? "none" : "auto";
				break;
			case "lang":
				t.$lang = F.attr(i, "val"), t["$lang-eastAsia"] = F.attr(i, "eastAsia"), t["$lang-bidi"] = F.attr(i, "bidi");
				break;
			case "rtl":
			case "bidi":
				F.boolAttr(i, "val", !0) && (t.direction = "rtl");
				break;
			case "pageBreakBefore":
				F.boolAttr(i, "val", !0) && (t["break-before"] = "page");
				break;
			case "keepLines":
				F.boolAttr(i, "val", !0) && (t["break-inside"] = "avoid");
				break;
			case "keepNext":
				F.boolAttr(i, "val", !0) && (t["break-after"] = "avoid");
				break;
			case "widowControl":
				F.boolAttr(i, "val", !0) && (t.orphans = "2", t.widows = "2");
				break;
			case "webHidden":
				this.options.hideWebHiddenContent && F.boolAttr(i, "val", !0) && (t.display = "none");
				break;
			case "specVanish":
				F.boolAttr(i, "val", !0) && (t.display = "none");
				break;
			case "tabs":
			case "outlineLvl":
			case "contextualSpacing":
			case "tblStyleColBandSize":
			case "tblStyleRowBandSize":
			case "suppressLineNumbers":
			case "noProof": break;
			default: this.options.debug && console.warn(`DOCX: Unknown document element: ${e.localName}.${i.localName}`);
		}
		return t;
	}
	parseFitText(e, t) {
		let n = F.lengthAttr(e, "val");
		n && (t.display = "inline-block", t.width = n, t["text-align"] = "justify", t["text-align-last"] = "justify");
	}
	parseEastAsianLayout(e, t) {
		F.boolAttr(e, "combine", !1) && (t["text-combine-upright"] = "all"), F.boolAttr(e, "vert", !1) && (t["writing-mode"] = "vertical-rl"), F.boolAttr(e, "vertCompress", !1) && (t["font-stretch"] = "condensed");
	}
	parseUnderline(e, t) {
		var n = F.attr(e, "val");
		if (n != null) {
			switch (n) {
				case "dash":
				case "dashDotDotHeavy":
				case "dashDotHeavy":
				case "dashedHeavy":
				case "dashLong":
				case "dashLongHeavy":
				case "dotDash":
				case "dotDotDash":
					t["text-decoration"] = "underline dashed";
					break;
				case "dotted":
				case "dottedHeavy":
					t["text-decoration"] = "underline dotted";
					break;
				case "double":
					t["text-decoration"] = "underline double";
					break;
				case "single":
				case "thick":
					t["text-decoration"] = "underline";
					break;
				case "wave":
				case "wavyDouble":
				case "wavyHeavy":
					t["text-decoration"] = "underline wavy";
					break;
				case "words":
					t["text-decoration"] = "underline";
					break;
				case "none": t["text-decoration"] = "none";
			}
			var r = ti.colorAttr(e, "color");
			r && (t["text-decoration-color"] = r);
		}
	}
	parseFont(e, t, n = {}) {
		var r = F.attr(e, "ascii"), i = F.attr(e, "hAnsi"), a = F.attr(e, "eastAsia"), o = F.attr(e, "cs"), s = J.themeValue(e, "asciiTheme"), c = J.themeValue(e, "hAnsiTheme"), l = this.scriptThemeFontValue(J.themeValue(e, "eastAsiaTheme"), n.eastAsia), u = this.scriptThemeFontValue(J.themeValue(e, "cstheme") ?? J.themeValue(e, "csTheme"), n.bidi);
		let d = bt(n.eastAsia), f = (e, t = "") => y(e) ? b(e, t) : [v(e)];
		var p = [r, i].filter((e) => e).flatMap((e) => f(e, d));
		p.push(...[s, c].filter((e) => e).map((e) => e.startsWith("var(") ? e : v(e)));
		let m = p.slice();
		if (a && p.push(...b(a, d)), l && p.push(l.startsWith("var(") ? l : v(l)), o && p.push(...f(o, bt(n.bidi))), u && p.push(u.startsWith("var(") ? u : v(u)), p.length > 0) {
			let e = (t["font-family"] ?? "").split(",").map((e) => e.trim()).filter((e) => e);
			t["font-family"] = [.../* @__PURE__ */ new Set([...e, ...p])].join(", "), m.length && (t["--docx-latin-font-family"] = [...new Set(m)].join(", ")), t["--docx-partial-eastasia-font"] = !m.length && (a || l) && !o && !u ? "true" : "false";
		}
	}
	scriptThemeFontValue(e, t) {
		if (!e) return e;
		let n = bt(t), r = /^var\((--docx-(?:major|minor)(?:EastAsia|Bidi|Cs)-font)\)$/.exec(e);
		return !n || !r ? e : `var(${r[1]}-${n}, ${e})`;
	}
	parseIndentation(e, t) {
		var n = F.lengthAttr(e, "firstLine"), r = F.lengthAttr(e, "hanging"), i = F.lengthAttr(e, "left"), a = F.lengthAttr(e, "start"), o = F.lengthAttr(e, "right"), s = F.lengthAttr(e, "end");
		n && (t["text-indent"] = n, t["--docx-text-indent"] = n), r && (t["text-indent"] = `-${r}`, t["--docx-text-indent"] = `-${r}`, t["--docx-hanging-indent"] = r), (i || a) && (t["margin-inline-start"] = i || a, t["--docx-margin-inline-start"] = i || a), (o || s) && (t["margin-inline-end"] = o || s, t["--docx-margin-inline-end"] = o || s);
	}
	parseSpacing(e, t) {
		var n = F.lengthAttr(e, "before"), r = F.lengthAttr(e, "after"), i = F.intAttr(e, "beforeLines", null), a = F.intAttr(e, "afterLines", null), o = F.boolAttr(e, "beforeAutospacing", !1), s = F.boolAttr(e, "afterAutospacing", !1), c = F.intAttr(e, "line", null), l = F.attr(e, "lineRule");
		if (o ? t["margin-top"] = "auto" : Number.isFinite(i) && i >= 0 ? t["margin-top"] = `${(i / 100).toFixed(2)}em` : n && (t["margin-top"] = n), s ? t["margin-bottom"] = "auto" : Number.isFinite(a) && a >= 0 ? t["margin-bottom"] = `${(a / 100).toFixed(2)}em` : r && (t["margin-bottom"] = r), c !== null) switch (l ?? "auto") {
			case "auto":
				t["line-height"] = `${(c / 240).toFixed(2)}`;
				break;
			case "atLeast":
				t["line-height"] = `max(1.2em, ${(c / 20).toFixed(2)}pt)`, t["min-height"] = `max(1.2em, ${(c / 20).toFixed(2)}pt)`;
				break;
			case "exact":
			case "exactly":
				t["line-height"] = t["min-height"] = `${(c / 20).toFixed(2)}pt`;
				break;
			default: t["line-height"] = `${(c / 240).toFixed(2)}`;
		}
	}
	parseMarginProperties(e, t) {
		for (let n of F.elements(e)) switch (n.localName) {
			case "left":
			case "start":
				t["padding-left"] = J.valueOfMargin(n);
				break;
			case "right":
			case "end":
				t["padding-right"] = J.valueOfMargin(n);
				break;
			case "top":
				t["padding-top"] = J.valueOfMargin(n);
				break;
			case "bottom": t["padding-bottom"] = J.valueOfMargin(n);
		}
	}
	parseTrHeight(e, t) {
		switch (F.attr(e, "hRule")) {
			case "exact":
				t.height = F.lengthAttr(e, "val");
				break;
			default: t.height = F.lengthAttr(e, "val");
		}
	}
	parseBorderProperties(e, t) {
		for (let n of F.elements(e)) {
			let e = J.valueOfBorder(n);
			switch (n.localName) {
				case "start":
				case "left":
					t["border-left"] = e;
					break;
				case "end":
				case "right":
					t["border-right"] = e;
					break;
				case "top":
					t["border-top"] = e;
					break;
				case "bottom":
					t["border-bottom"] = e;
					break;
				case "insideH":
					t["border-top"] ??= e, t["border-bottom"] ??= e;
					break;
				case "insideV": t["border-left"] ??= e, t["border-right"] ??= e;
			}
		}
	}
}, Zr = [
	"black",
	"blue",
	"cyan",
	"darkBlue",
	"darkCyan",
	"darkGray",
	"darkGreen",
	"darkMagenta",
	"darkRed",
	"darkYellow",
	"green",
	"lightGray",
	"magenta",
	"none",
	"red",
	"white",
	"yellow"
], Qr = {
	dark1: "dk1",
	light1: "lt1",
	dark2: "dk2",
	light2: "lt2",
	text1: "dk1",
	background1: "lt1",
	text2: "dk2",
	background2: "lt2",
	hyperlink: "hlink",
	followedHyperlink: "folHlink"
};
function $r(e) {
	return Qr[e] ?? e;
}
function ei(e) {
	switch (e) {
		case "dk1": return "#000000";
		case "lt1": return "#FFFFFF";
		case "dk2": return "#44546A";
		case "lt2": return "#E7E6E6";
		case "accent1": return "#4472C4";
		case "accent2": return "#ED7D31";
		case "accent3": return "#A5A5A5";
		case "accent4": return "#FFC000";
		case "accent5": return "#5B9BD5";
		case "accent6": return "#70AD47";
		case "hlink": return "#0563C1";
		case "folHlink": return "#954F72";
		default: return null;
	}
}
var ti = class {
	static colorAttr(e, t, n = null, r = qr.color) {
		var i = F.attr(e, t);
		if (i) return i == "auto" ? r : Zr.includes(i) ? i : `#${i}`;
		var a = F.attr(e, "themeColor");
		if (a) {
			let e = $r(a), t = ei(e);
			return `var(--docx-${e}-color${t ? `, ${t}` : ""})`;
		}
		return n;
	}
}, J = class e {
	static themeValue(e, t) {
		var n = F.attr(e, t);
		return n ? `var(--docx-${n}-font)` : null;
	}
	static valueOfSize(e, t) {
		var n = N.Dxa;
		switch (F.attr(e, "type")) {
			case "dxa": break;
			case "pct":
				n = N.Percent;
				break;
			case "auto": return "auto";
		}
		return F.lengthAttr(e, t, n);
	}
	static valueOfMargin(e) {
		return F.lengthAttr(e, "w");
	}
	static valueOfBorder(t) {
		var n = e.parseBorderType(F.attr(t, "val"));
		if (n == "none") return "none";
		var r = ti.colorAttr(t, "color", qr.borderColor, qr.borderColor);
		return `${F.lengthAttr(t, "sz", N.Border) ?? "1pt"} ${n} ${r == "auto" ? qr.borderColor : r}`;
	}
	static parseBorderType(e) {
		switch (e) {
			case "single": return "solid";
			case "dashDotStroked": return "solid";
			case "dashed": return "dashed";
			case "dashSmallGap": return "dashed";
			case "dotDash": return "dotted";
			case "dotDotDash": return "dotted";
			case "dotted": return "dotted";
			case "double": return "double";
			case "doubleWave": return "double";
			case "inset": return "inset";
			case "nil": return "none";
			case "none": return "none";
			case "outset": return "outset";
			case "thick": return "solid";
			case "thickThinLargeGap": return "solid";
			case "thickThinMediumGap": return "solid";
			case "thickThinSmallGap": return "solid";
			case "thinThickLargeGap": return "solid";
			case "thinThickMediumGap": return "solid";
			case "thinThickSmallGap": return "solid";
			case "thinThickThinLargeGap": return "solid";
			case "thinThickThinMediumGap": return "solid";
			case "thinThickThinSmallGap": return "solid";
			case "threeDEmboss": return "solid";
			case "threeDEngrave": return "solid";
			case "triple": return "double";
			case "wave": return "solid";
		}
		return "solid";
	}
	static valueOfTblLayout(e) {
		return (F.attr(e, "type") ?? F.attr(e, "val")) == "fixed" ? "fixed" : "auto";
	}
	static classNameOfCnfStyle(e) {
		let t = F.attr(e, "val");
		return [
			"first-row",
			"last-row",
			"first-col",
			"last-col",
			"odd-col",
			"even-col",
			"odd-row",
			"even-row",
			"ne-cell",
			"nw-cell",
			"se-cell",
			"sw-cell"
		].filter((e, n) => t[n] == "1").join(" ");
	}
	static valueOfJc(e) {
		var t = F.attr(e, "val");
		switch (t) {
			case "start":
			case "left": return "left";
			case "center": return "center";
			case "end":
			case "right": return "right";
			case "both": return "justify";
		}
		return t;
	}
	static valueOfVertAlign(e, t = !1) {
		var n = F.attr(e, "val");
		switch (n) {
			case "subscript": return "sub";
			case "superscript": return t ? "sup" : "super";
		}
		return t ? null : n;
	}
	static valueOfEmphasisMark(e) {
		switch (F.attr(e, "val")) {
			case "none": return "none";
			case "comma": return "\"﹐\"";
			case "circle": return "circle";
			default: return "dot";
		}
	}
	static valueOfTextAlignment(e) {
		var t = F.attr(e, "val");
		switch (t) {
			case "auto":
			case "baseline": return "baseline";
			case "top": return "top";
			case "center": return "middle";
			case "bottom": return "bottom";
		}
		return t;
	}
	static addSize(e, t) {
		return !e || e == "0.00pt" || e == "0px" ? t : !t || t == "0.00pt" || t == "0px" ? e : `calc(${e} + ${t})`;
	}
	static classNameOftblLook(e) {
		let t = F.hexAttr(e, "val", 0), n = "";
		return (F.boolAttr(e, "firstRow") || t & 32) && (n += " first-row"), (F.boolAttr(e, "lastRow") || t & 64) && (n += " last-row"), (F.boolAttr(e, "firstColumn") || t & 128) && (n += " first-col"), (F.boolAttr(e, "lastColumn") || t & 256) && (n += " last-col"), (F.boolAttr(e, "noHBand") || t & 512) && (n += " no-hband"), (F.boolAttr(e, "noVBand") || t & 1024) && (n += " no-vband"), n.trim();
	}
}, ni = {
	33: 33,
	34: 8704,
	35: 35,
	36: 8707,
	37: 37,
	38: 38,
	39: 8715,
	40: 40,
	41: 41,
	42: 8727,
	43: 43,
	44: 44,
	45: 8722,
	46: 46,
	47: 47,
	48: 48,
	49: 49,
	50: 50,
	51: 51,
	52: 52,
	53: 53,
	54: 54,
	55: 55,
	56: 56,
	57: 57,
	58: 58,
	59: 59,
	60: 60,
	61: 61,
	62: 62,
	63: 63,
	64: 8773,
	65: 913,
	66: 914,
	67: 935,
	69: 917,
	70: 934,
	71: 915,
	72: 919,
	73: 921,
	74: 977,
	75: 922,
	76: 923,
	77: 924,
	78: 925,
	79: 927,
	80: 928,
	81: 920,
	82: 929,
	83: 931,
	84: 932,
	85: 933,
	86: 962,
	88: 926,
	89: 936,
	90: 918,
	91: 91,
	92: 8756,
	93: 93,
	94: 8869,
	95: 95,
	97: 945,
	98: 946,
	99: 967,
	100: 948,
	101: 949,
	102: 966,
	103: 947,
	104: 951,
	105: 953,
	106: 981,
	107: 954,
	108: 955,
	110: 957,
	111: 959,
	112: 960,
	113: 952,
	114: 961,
	115: 963,
	116: 964,
	117: 965,
	118: 982,
	119: 969,
	120: 958,
	121: 968,
	122: 950,
	123: 123,
	124: 124,
	125: 125,
	126: 8764,
	160: 8364,
	161: 978,
	162: 8242,
	163: 8804,
	165: 8734,
	166: 402,
	167: 9827,
	168: 9830,
	169: 9829,
	170: 9824,
	171: 8596,
	172: 8592,
	173: 8593,
	174: 8594,
	175: 8595,
	176: 176,
	177: 177,
	178: 8243,
	179: 8805,
	180: 215,
	181: 8733,
	182: 8706,
	183: 8226,
	184: 247,
	185: 8800,
	186: 8801,
	187: 8776,
	188: 8230,
	191: 8629,
	192: 8501,
	193: 8465,
	194: 8476,
	195: 8472,
	196: 8855,
	197: 8853,
	198: 8709,
	199: 8745,
	200: 8746,
	201: 8835,
	202: 8839,
	203: 8836,
	204: 8834,
	205: 8838,
	206: 8712,
	207: 8713,
	208: 8736,
	209: 8711,
	213: 8719,
	214: 8730,
	215: 8901,
	216: 172,
	217: 8743,
	218: 8744,
	219: 8660,
	220: 8656,
	221: 8657,
	222: 8658,
	223: 8659,
	224: 9674,
	225: 9001,
	229: 8721,
	241: 9002,
	242: 8747,
	243: 8992,
	245: 8993
};
function ri(e, t) {
	let n = String.fromCharCode(t);
	if ((e ?? "").trim().replace(/^(["'])(.*)\1$/, "$2").trim().toLowerCase() !== "symbol") return {
		text: n,
		normalized: !1
	};
	let r = t >= 61440 && t <= 61695 ? t - 61440 : t, i = r >= 0 && r <= 255 ? ni[r] : void 0, a = i === void 0 ? n : String.fromCharCode(i);
	return {
		text: a,
		normalized: a !== n
	};
}
var ii = class {
	constructor(e, t, n) {
		this.className = e, this.createLayer = t, this.layoutContent = n, this.records = /* @__PURE__ */ new Map(), this.bindingRoot = null, this.binding = null, this.root = t(), this.root.dataset.docxCommentLayer = "true";
	}
	add(e) {
		this.records.set(e.key, e), this.root.appendChild(e.popup);
	}
	references(e, t) {
		return Array.from(e.querySelectorAll("[data-docx-comment-reference]")).filter((e) => e.dataset.docxCommentReference === t.key);
	}
	place(e, t) {
		let n = t.ownerDocument?.defaultView;
		if (!n || !t.isConnected || !this.root.isConnected) return;
		let r = this.root, i = r.getBoundingClientRect(), a = t.getBoundingClientRect(), o = e.references.find((e) => !e.closest("a")) ?? e.references[0] ?? t, s = o.getBoundingClientRect(), c = parseFloat(n.getComputedStyle(r).width), l = c > 0 ? i.width / c : 0;
		if (!(l > 0) || !Number.isFinite(l) || !a.width || !a.height || !s.width || !s.height) return;
		e.positionedReference !== o && e.positionedReference && delete e.positionedReference.dataset.docxCommentPositioned, e.positionedReference = o, e.reference = t;
		let u = (a.left - i.left) / l, d = (a.top - i.top) / l, f = (s.left - i.left) / l, p = (s.top - i.top) / l, m = s.width / l, h = o.closest("a");
		if (h) {
			let e = h.getBoundingClientRect(), t = o.closest("section") ?? r, a = t.getBoundingClientRect(), s = n.getComputedStyle(t), u = (a.left - i.left) / l, d = (a.right - i.left) / l, p = (e.left - i.left) / l, g = (e.right - i.left) / l;
			f = [
				u + (parseFloat(s.paddingLeft) || 0) - m - 4,
				d - (parseFloat(s.paddingRight) || 0) + 4,
				u - m - 4,
				d + 4
			].find((e) => e >= 0 && e + m <= c && (e + m <= p - 4 || e >= g + 4)) ?? Math.max(c, g) + 4;
		}
		e.popup.style.position = "absolute", e.popup.style.left = `${f}px`, e.popup.style.top = `${p}px`;
		let g = n.getComputedStyle(o);
		if (e.summary.style.fontSize = g.fontSize, e.summary.style.fontFamily = g.fontFamily, e.summary.style.lineHeight = g.lineHeight, e.summary.style.width = `${m}px`, e.summary.style.height = `${s.height / l}px`, h ? delete o.dataset.docxCommentPositioned : o.dataset.docxCommentPositioned = "true", e.popup.open) {
			let t = e.body.getBoundingClientRect().width / l, r = Math.min(0, Math.max(-u, c - u - t));
			e.body.style.left = `${u - f + r}px`, e.body.style.maxWidth = `${Math.max(0, c)}px`;
			let o = i.height / l, m = Math.max(0, Math.min(o - d - a.height / l, (n.innerHeight - a.bottom) / l)), h = Math.max(0, Math.min(d, a.top / l)), g = m < 120 && h > m;
			e.body.style.top = g ? "auto" : `${d - p + a.height / l}px`, e.body.style.bottom = g ? `${p + s.height / l - d}px` : "auto", e.body.style.maxHeight = `${Math.max(1, g ? h : m)}px`;
		}
	}
	close(e) {
		delete e.restoringOpen, e.revision++, e.opening?.abort(), e.opening = null, e.open = !1, e.popup.open = !1, e.references.forEach((e) => e.setAttribute("aria-expanded", "false"));
	}
	activate(e, t, n, r = !1) {
		if (!n.generation.isCurrent() || !t.isConnected) return Promise.resolve();
		delete e.restoringOpen, e.reference = t;
		let i = e.open;
		if (e.open = !0, e.popup.open = !0, e.references.forEach((e) => e.setAttribute("aria-expanded", "true")), this.place(e, t), i && !r) return e.layout ?? Promise.resolve();
		e.opening?.abort();
		let a = e.opening = new AbortController(), o = ++e.revision, s = () => a.abort();
		n.generation.signal.addEventListener("abort", s, { once: !0 });
		let c = {
			signal: a.signal,
			cancel: s,
			isCurrent: () => !a.signal.aborted && n.generation.isCurrent() && e.revision === o && e.popup.open && e.reference.isConnected
		};
		return e.body.dataset.docxCommentLayout = "pending", e.layout = u(e.body, [], c).then(() => {
			c.isCurrent() && (this.layoutContent(e.body), this.place(e, e.reference), e.body.dataset.docxCommentLayout = "ready");
		}).catch((t) => {
			e.revision === o && (e.body.dataset.docxCommentLayout = t?.name === "AbortError" ? "cancelled" : "failed");
		}).finally(() => n.generation.signal.removeEventListener("abort", s)), e.layout;
	}
	async bind(e, t) {
		if (!e.isConnected || !t.isCurrent() || typeof e.addEventListener != "function") return;
		let n = this.binding;
		if (n && n.generation.signal === t.signal && (this.bindingRoot === e || this.bindingRoot.contains(e))) {
			n.generation = t, await this.sync(this.bindingRoot, n, !0);
			return;
		}
		n && n.dispose(n.generation.isCurrent() && e.isConnected), n = null;
		let r = [], i = (e, t, n, i = !1) => {
			e.addEventListener(t, n, i), r.push(() => e.removeEventListener(t, n, i));
		}, a = Array.from(this.records.values()).find((e) => e.popup.open) ?? null, o = null, s = !1, c = !1, l = () => {
			let t = e.getRootNode().activeElement ?? e.ownerDocument.activeElement;
			for (; t?.shadowRoot?.activeElement;) t = t.shadowRoot.activeElement;
			return t;
		}, u = (e) => {
			let t = e.reference.hasAttribute("tabindex") ? e.reference : e.summary;
			s = !0, t.focus(), s = !1;
		}, d = (e) => e && e.nodeType === 1 ? e : null, f = (e) => {
			let t = d(e)?.closest("[data-docx-comment-reference], [data-docx-comment-popup]");
			return t ? this.records.get(t.dataset.docxCommentReference ?? t.dataset.docxCommentPopup) : null;
		}, p = (e, t) => {
			let n = t;
			return !!n && (e.popup.contains(n) || e.references.some((e) => e.contains(n)));
		}, m = (e = a) => {
			e && this.close(e), a === e && (a = null);
		};
		n = {
			generation: t,
			dispose: (t = !1) => {
				r.splice(0).forEach((e) => e());
				for (let e of this.records.values()) t || this.close(e), e.positionedReference && delete e.positionedReference.dataset.docxCommentPositioned, delete e.positionedReference;
				this.binding === n && (this.binding = null, this.bindingRoot = null), e.isConnected && n.generation.isCurrent() || this.root.remove();
			}
		}, this.binding = n, this.bindingRoot = e;
		let h = (e, t) => {
			if (c) return;
			a && a !== e && this.close(a), a = e;
			let r = d(t), i = r?.closest("[data-docx-comment-reference]") ?? (e.summary.contains(r) ? e.positionedReference : null) ?? e.reference;
			this.activate(e, i, n);
		};
		i(e, "mouseover", (e) => {
			let t = f(e.target);
			if (t) {
				if (a && a !== t && p(a, l())) return;
				o = t, h(t, e.target);
			}
		}), i(e, "mouseout", (e) => {
			let t = e.relatedTarget;
			a && !p(a, t) && (o = null, p(a, l()) || m());
		}), i(e, "focusin", (e) => {
			let t = f(e.target);
			!s && t && d(e.target)?.dataset.docxCommentReference && h(t, e.target);
		}), i(e, "focusout", (e) => {
			a && o !== a && !p(a, e.relatedTarget) && m();
		}), i(e, "click", (e) => {
			let t = d(e.target)?.closest("[data-docx-comment-reference]"), n = t && this.records.get(t.dataset.docxCommentReference);
			n && (e.preventDefault(), e.stopPropagation(), n.popup.open ? m(n) : h(n, t));
		}), i(e, "keydown", (e) => {
			let t = e, n = f(e.target);
			if (!n) return;
			let r = d(e.target)?.closest("[data-docx-comment-reference]");
			if (r && (t.key === "Enter" || t.key === " ")) e.preventDefault(), e.stopPropagation(), n.popup.open ? m(n) : h(n, r);
			else if (t.key === "Escape") e.preventDefault(), e.stopPropagation(), m(n), u(n);
			else if (t.key === "Tab" && n.popup.open) {
				let i = Array.from(n.body.querySelectorAll("a[href], button, input, select, textarea, [tabindex]")).filter((e) => e.tabIndex >= 0 && !e.disabled);
				r && !t.shiftKey && i.length ? (e.preventDefault(), i[0].focus()) : t.shiftKey && e.target === i[0] ? (e.preventDefault(), u(n)) : !t.shiftKey && e.target === i[i.length - 1] && (u(n), m(n));
			}
		}), i(e, "toggle", (e) => {
			let t = f(e.target);
			if (t && e.target === t.popup && !c) {
				if (t.restoringOpen !== void 0) {
					let e = t.restoringOpen;
					if (delete t.restoringOpen, t.popup.open === e) return;
				}
				t.popup.open && !t.open ? h(t, t.reference) : !t.popup.open && t.open && (this.close(t), a === t && (a = null));
			}
		}, !0);
		let g = e.ownerDocument.defaultView;
		if (g) {
			let t = () => {
				!c && n.generation.isCurrent() && this.sync(e, n, !0);
			};
			i(g, "resize", t), i(g, "scroll", t, !0);
			let a = /* @__PURE__ */ new Map();
			i(g, "beforeprint", () => {
				if (!c && n.generation.isCurrent()) {
					c = !0;
					for (let e of this.records.values()) a.set(e, e.popup.open), e.popup.open = !0, this.layoutContent(e.body);
				}
			}), i(g, "afterprint", () => {
				if (c) {
					for (let [e, t] of a) e.restoringOpen = t, t || e.opening?.abort(), e.open = t, e.popup.open = t, e.references.forEach((e) => e.setAttribute("aria-expanded", `${t}`));
					a.clear(), c = !1, this.sync(e, n, !0);
				}
			});
			let o = g.MutationObserver;
			if (o) {
				let t = new o(() => {
					e.isConnected && n.generation.isCurrent() || n.dispose();
				});
				t.observe(e.ownerDocument.documentElement, {
					childList: !0,
					subtree: !0
				});
				for (let n = e.getRootNode(); n && n !== e.ownerDocument; n = n.host?.getRootNode()) t.observe(n, {
					childList: !0,
					subtree: !0
				});
				r.push(() => t.disconnect());
			}
		}
		i(t.signal, "abort", () => n.dispose()), await this.sync(e, n, !0);
	}
	async sync(e, t, n = !1) {
		let r = [];
		for (let i of this.records.values()) {
			let a = this.references(e, i);
			if (!a.length) continue;
			i.references = a;
			let o = a.includes(i.reference) ? i.reference : a[0];
			this.place(i, o), t && i.popup.open && n ? r.push(this.activate(i, o, t, !0)) : i.layout && r.push(i.layout);
		}
		await Promise.all(r);
	}
}, ai = {
	pos: 0,
	leader: "none",
	style: "left"
}, oi = 50, si = .1;
function ci(e = document.body) {
	let t = document.createElement("div");
	t.style.width = "100pt", e.appendChild(t);
	let n = 100 / t.offsetWidth;
	return e.removeChild(t), n;
}
function li(e, t, n, r = 72 / 96) {
	let i = e.closest("p");
	if (!i) return;
	let a = e.getBoundingClientRect(), o = i.getBoundingClientRect(), s = getComputedStyle(i);
	if (s.direction == "rtl" || s.writingMode && s.writingMode != "horizontal-tb") return;
	let c = Y(s.marginInlineStart || s.marginLeft), l = Y(s.marginInlineEnd || s.marginRight), u = Y(s.textIndent), d = t?.length > 0 ? t.map((e) => ({
		pos: ui(e.position),
		leader: e.leader,
		style: e.style
	})).sort((e, t) => e.pos - t.pos) : [ai], f = c * r, p = d.some((e) => Math.abs(e.pos - f) <= si);
	u < -.1 && f > si && !p && (d.push({
		...ai,
		pos: f
	}), d.sort((e, t) => e.pos - t.pos));
	let m = d[d.length - 1], h = (o.width + c + l) * r, g = Number.isFinite(ui(n)) ? ui(n) : 36, _ = m.pos + g;
	if (_ < h) for (; _ < h && d.length < oi; _ += g) d.push({
		...ai,
		pos: _
	});
	let v = o.left - c, y = (a.left - v) * r, b = d.find((e) => e.style != "clear" && e.pos > y);
	if (b == null || ![
		"left",
		"right",
		"center"
	].includes(b.style || "left")) return;
	let x = 1;
	if (b.style == "right" || b.style == "center") {
		let t = Array.from(i.querySelectorAll(`.${e.className}`)), n = t.indexOf(e) + 1, a = document.createRange();
		a.setStart(e, 1), n < t.length ? a.setEndBefore(t[n]) : a.setEnd(i, i.childNodes.length);
		let o = b.style == "center" ? .5 : 1, s = a.getBoundingClientRect(), c = s.left + o * s.width - v;
		x = b.pos - c * r;
	} else x = b.pos - y;
	let S = Math.max(Number.isFinite(x) ? x : 0, 0);
	switch (e.textContent !== "\xA0" && (e.textContent = "\xA0"), e.style.display = "inline-block", e.style.width = `${S.toFixed(2)}pt`, e.style.minWidth = "0pt", e.style.lineHeight = "1", e.style.whiteSpace = "nowrap", e.style.wordSpacing = "normal", e.style.textDecoration = "none", e.style.borderBottom = "", e.style.height = "", e.style.transform = "", b.leader) {
		case "dot":
		case "middleDot":
			e.style.borderBottom = "1px dotted currentColor", e.style.height = ".85em", e.style.transform = "translateY(-.18em)";
			break;
		case "hyphen":
		case "heavy":
		case "underscore": e.style.borderBottom = "1px solid currentColor", e.style.height = ".85em", e.style.transform = "translateY(-.18em)";
	}
}
function Y(e) {
	let t = parseFloat(e);
	return Number.isFinite(t) ? t : 0;
}
function ui(e) {
	return parseFloat(e);
}
function di(e) {
	let t = /^\s*([-+]?(?:\d+(?:\.\d*)?|\.\d+))(pt|px|pc|in|cm|mm)?\s*$/i.exec(e ?? "");
	if (!t) return null;
	let n = {
		pt: 1,
		px: .75,
		pc: 12,
		in: 72,
		cm: 72 / 2.54,
		mm: 72 / 25.4
	}[t[2]?.toLowerCase() ?? "pt"], r = Number(t[1]) * n;
	return Number.isFinite(r) ? r : null;
}
function fi(e, t) {
	let n = e.dataset.docxTabLayout == "explicit", r = n ? e.dataset.docxTabFallbackWidth ?? "" : e.style.width, i = n ? e.dataset.docxTabFallbackMinWidth ?? "" : e.style.minWidth ?? "", a = e.style.display, o = () => (n && (e.style.width = r, e.style.minWidth = i), e.style.display = a, !1), s = e.closest("p"), c = e.ownerDocument?.defaultView;
	if (!s || !c || !e.isConnected) return o();
	let l = c.getComputedStyle(s);
	if (l.direction == "rtl" || l.writingMode && l.writingMode != "horizontal-tb") return o();
	let u = t.filter((e) => e.style != "clear").map((e) => ({
		...e,
		point: di(e.position)
	}));
	if (!u.length || u.some((e) => e.point == null)) return o();
	u.sort((e, t) => e.point - t.point);
	let d = e.style.width;
	e.style.display = "inline-block", e.style.width = "0pt";
	let f = e.getBoundingClientRect(), p = s.getBoundingClientRect(), m = Y(l.width) + (l.boxSizing == "border-box" ? 0 : Y(l.paddingLeft) + Y(l.paddingRight) + Y(l.borderLeftWidth) + Y(l.borderRightWidth)), h = m > 0 ? p.width / m : 0;
	if (!(h > 0) || !Number.isFinite(h)) return e.style.width = d, o();
	let g = p.left / h - Y(l.marginLeft), _ = (f.left / h - g) * .75, v = u.find((e) => e.point > _ + si);
	if (!v || ![
		"left",
		"right",
		"center"
	].includes(v.style || "left") || v.leader && v.leader != "none") return e.style.width = d, o();
	let y = (e) => {
		for (; e && e != s;) {
			if (e.nextSibling) return e.nextSibling;
			e = e.parentNode;
		}
		return null;
	}, b = null;
	for (let t = y(e); t;) {
		if (t.nodeType == 1) {
			let e = t;
			if (e.tagName == "BR" || e.tagName == "P" || e.dataset.docxTab == "true" || e.dataset.docxDrawing == "true") {
				b = e;
				break;
			}
		}
		t = t.firstChild ?? y(t);
	}
	let x = 0;
	if (v.style == "right" || v.style == "center") {
		let t = e.ownerDocument.createRange();
		if (t.setStartAfter(e), b ? t.setEndBefore(b) : t.setEnd(s, s.childNodes.length), x = t.getBoundingClientRect().width / h * .75, !Number.isFinite(x)) return e.style.width = d, o();
	}
	let S = v.style == "right" ? 1 : v.style == "center" ? .5 : 0, C = Math.max(0, v.point - _ - S * x);
	return e.textContent !== "\xA0" && (e.textContent = "\xA0"), e.style.width = `${C.toFixed(2)}pt`, e.style.minWidth = "0pt", e.style.lineHeight = "1", e.style.whiteSpace = "nowrap", e.style.wordSpacing = "normal", e.dataset.docxTabLayout = "explicit", e.dataset.docxTabFallbackWidth = r, e.dataset.docxTabFallbackMinWidth = i, !0;
}
function pi(e, t, n) {
	if (!t || ![
		t.start,
		t.size,
		n
	].every(Number.isFinite)) return null;
	if (e.alignSpecified) return e.align == "center" ? t.start + (t.size - n) / 2 : e.align == "right" || e.align == "bottom" ? t.start + t.size - n : e.align == "left" || e.align == "top" ? t.start : null;
	let r = di(e.offset ?? "0pt");
	return r == null ? null : t.start + r * 4 / 3;
}
var X = (e) => Number.parseFloat(e) || 0;
function mi(e, t, n) {
	let r = e.ownerDocument?.defaultView, i = e.closest("p"), a = e.closest("[data-docx-comment-story]") ?? e.closest(`section.${n}`);
	if (!r || !i || !a || !e.isConnected || i.closest("foreignObject")) return;
	let o = r.getComputedStyle(i);
	if (o.direction == "rtl" || o.writingMode && o.writingMode != "horizontal-tb") return;
	let s = r.getComputedStyle(a), c = a.getBoundingClientRect(), l = X(s.width) + (s.boxSizing == "border-box" ? 0 : X(s.paddingLeft) + X(s.paddingRight) + X(s.borderLeftWidth) + X(s.borderRightWidth)), u = l > 0 ? c.width / l : 0;
	if (!(u > 0) || !Number.isFinite(u)) return;
	let d = (e, t = !1) => {
		let n = e.getBoundingClientRect(), i = r.getComputedStyle(e), a = t ? X(i.borderLeftWidth) + X(i.paddingLeft) : 0, o = t ? X(i.borderTopWidth) + X(i.paddingTop) : 0, s = t ? X(i.borderRightWidth) + X(i.paddingRight) : 0, c = t ? X(i.borderBottomWidth) + X(i.paddingBottom) : 0;
		return {
			x: {
				start: n.left / u + a,
				size: n.width / u - a - s
			},
			y: {
				start: n.top / u + o,
				size: n.height / u - o - c
			}
		};
	}, f = d(a), p = d(a, !0), m = d(i);
	if (m.x.size <= 0 || m.y.size <= 0) return;
	let h = i.closest("article, header, footer");
	if (!h) return;
	let g = d(h, !0), _ = r.getComputedStyle(h), v = e.previousElementSibling, y = v?.dataset.docxAnchorMarker == "true" ? d(v) : null, b = v?.querySelector?.("[data-docx-anchor-line=\"top\"]"), x = v?.querySelector?.("[data-docx-anchor-line=\"bottom\"]"), S = b ? d(b).y.start : null, C = x ? d(x).y.start : null, w = S != null && C != null && C > S ? {
		start: S,
		size: C - S
	} : null, T = { ...g.x }, E = X(_.columnCount), D = X(_.columnWidth);
	if (E > 1 || D > 0) {
		let e = _.columnGap == "normal" ? X(_.fontSize) : X(_.columnGap), t = D > 0 ? Math.max(1, Math.floor((T.size + e) / (D + e))) : E, n = E > 0 ? Math.min(E, t) : t, r = (T.size + e) / n;
		if (!(r > 0)) return;
		let i = y?.x.start ?? m.x.start - X(o.marginLeft), a = Math.max(0, Math.min(n - 1, Math.floor((i - T.start + .1) / r)));
		T.start += a * r, T.size = r - e;
	}
	let O = t.layoutInCell === !1 ? null : i.closest("td, th"), k = O ? d(O, !0) : null, A = (e, t) => k && [
		"page",
		"margin",
		"column",
		"cell"
	].includes(t) ? k[e] : t == "page" ? f[e] : t == "margin" ? p[e] : t == "column" ? e == "x" ? T : g.y : t == "paragraph" ? m[e] : t == "character" ? y?.[e] : t == "line" ? e == "y" ? w : y?.x : t == "cell" && O ? d(O, !0)[e] : null, j = r.getComputedStyle(e), M = {
		x: X(j.width),
		y: X(j.height)
	}, N = {
		x: m.x.start + X(o.borderLeftWidth),
		y: m.y.start + X(o.borderTopWidth)
	};
	for (let [n, r] of [["x", t.horizontal], ["y", t.vertical]]) {
		let t = pi(r, A(n, r.relative), M[n]), i = di(r.offset ?? "0pt");
		if (t == null || i == null) continue;
		let a = t - N[n] - i * 4 / 3;
		e.style.setProperty(`--docx-anchor-origin-${n}`, `${(Math.abs(a) < 5e-5 ? 0 : a).toFixed(4)}px`);
	}
}
function hi(e, t, n = (e) => e) {
	let r = ["tl2br", "tr2bl"].filter((e) => t?.[e] && t[e] !== "none");
	if (!r.length) return;
	let i = e.ownerDocument ?? document, a = "http://www.w3.org/2000/svg", o = i.createElementNS(a, "svg"), s = i.createElement("span");
	for (let e of r) {
		let r = /^(\d+(?:\.\d+)?)(pt|px)\s+(\w+)\s+(.+)$/.exec(t[e]);
		if (!r || !Number.isFinite(Number(r[1])) || Number(r[1]) <= 0) continue;
		let [, c, l, u, d] = r;
		if (/url\s*\(|[;{}<>\\\x00-\x1f]/i.test(d) || (s.style.color = "", s.style.color = d, !s.style.color)) continue;
		let f = i.createElementNS(a, "line");
		f.dataset.docxDiagonal = e, f.setAttribute("x1", e === "tl2br" ? "0%" : "100%"), f.setAttribute("y1", "0%"), f.setAttribute("x2", e === "tl2br" ? "100%" : "0%"), f.setAttribute("y2", "100%"), f.style.stroke = n(s.style.color), f.style.strokeWidth = `${c}${l}`;
		let p = Number(c) * (l === "pt" ? 4 / 3 : 1);
		u === "dotted" ? (f.style.strokeDasharray = `0 ${p * 2}`, f.style.strokeLinecap = "round") : u === "dashed" && (f.style.strokeDasharray = `${p * 4} ${p * 2}`), o.appendChild(f);
	}
	o.hasChildNodes() && (o.setAttribute("aria-hidden", "true"), o.setAttribute("focusable", "false"), Object.assign(o.style, {
		position: "absolute",
		left: "0",
		top: "0",
		width: "100%",
		height: "100%",
		overflow: "hidden",
		pointerEvents: "none"
	}), e.style.position && e.style.position !== "static" || (e.style.position = "relative"), e.appendChild(o));
}
function gi(e, t, n = () => !0) {
	let r = e.ownerDocument?.defaultView;
	if (!r || typeof e.querySelectorAll != "function") return;
	let i = Array.from(e.querySelectorAll("section"));
	e.matches?.("section") && i.unshift(e);
	for (let e of i) {
		if (!e.classList.contains(t) || !n(e)) continue;
		let i = r.getComputedStyle(e), a = Z(i.width) + (i.boxSizing === "border-box" ? 0 : Z(i.paddingLeft) + Z(i.paddingRight) + Z(i.borderLeftWidth) + Z(i.borderRightWidth)), o = e.getBoundingClientRect(), s = a > 0 ? o.width / a : 0;
		if (!(!Number.isFinite(s) || s <= 0)) {
			for (let t of Array.from(e.querySelectorAll("[data-docx-anchor-context=\"paragraph\"]"))) {
				if (!n(t)) continue;
				let e = t.getBoundingClientRect();
				t.style.setProperty("--docx-paragraph-page-offset-top", `${(e.top - o.top) / s}px`), t.style.setProperty("--docx-paragraph-page-offset-left", `${(e.left - o.left) / s}px`);
			}
			vi(e, n), Ci(e, n), Ti(e, s, n), ki(e, n);
		}
	}
}
var _i = /* @__PURE__ */ new WeakMap(), Z = (e) => Number.parseFloat(e) || 0;
function vi(e, t = () => !0) {
	let n = e.ownerDocument.defaultView;
	if (!n) return;
	let r = e.getBoundingClientRect(), i = n.getComputedStyle(e), a = Z(i.width) + (i.boxSizing === "border-box" ? 0 : Z(i.paddingLeft) + Z(i.paddingRight) + Z(i.borderLeftWidth) + Z(i.borderRightWidth)), o = a ? r.width / a : 0;
	if (!(!Number.isFinite(o) || o <= 0)) for (let r of Array.from(e.querySelectorAll("[data-docx-anchor-horizontal=\"column\"], [data-docx-anchor-horizontal=\"margin\"]"))) {
		if (r.dataset.docxAnchorId != null || !t(r)) continue;
		let i = r.closest("[data-docx-anchor-context=\"paragraph\"]");
		if (!i || r.offsetParent !== i || n.getComputedStyle(r).position !== "absolute" || !r.style.left || i.closest("td, th")) continue;
		let a = r.dataset.docxAnchorHorizontal === "margin" ? e : i.closest("article, header, footer");
		if (!a || !e.contains(a) && a !== e) continue;
		let s = n.getComputedStyle(a), c = a.getBoundingClientRect().left + (Z(s.borderLeftWidth) + Z(s.paddingLeft)) * o, l = n.getComputedStyle(i), u = i.getBoundingClientRect();
		if (a !== e) {
			let e = Z(s.columnCount), t = Z(s.columnWidth);
			if (e > 1 || t > 0) {
				let n = s.columnGap === "normal" ? Z(s.fontSize) : Z(s.columnGap), r = a.clientWidth - Z(s.paddingLeft) - Z(s.paddingRight), i = e > 0 ? e : Math.max(1, Math.floor((r + n) / (t + n))), d = (r + n) / i;
				if (d > 0) {
					let e = (u.left - c) / o - Z(l.marginLeft);
					c += Math.round(e / d) * d * o;
				}
			}
		}
		let d = u.left + Z(l.borderLeftWidth) * o, f = (c - d) / o;
		if (!Number.isFinite(f)) continue;
		let p = _i.get(r) ?? r.style.left;
		_i.set(r, p), r.style.left = Math.abs(f) < .01 ? p : `calc(${p} + ${f.toFixed(4)}px)`;
	}
}
var yi = /* @__PURE__ */ new WeakMap(), bi = /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(?:px|pt|pc|in|cm|mm)?$/i, xi = (e) => e !== "" && e !== "none" && e !== "normal";
function Si(e, t) {
	for (let n = e.parentElement; n; n = n.parentElement) {
		let e = t.getComputedStyle(n);
		if (e.position && e.position !== "static" || xi(e.transform) || xi(e.perspective) || xi(e.filter) || /(?:layout|paint|strict|content)/.test(e.contain) || /(?:transform|perspective|filter)/.test(e.willChange)) return n;
	}
	return null;
}
function Ci(e, t = () => !0) {
	let n = e.ownerDocument.defaultView;
	if (!n) return 0;
	let r = n.getComputedStyle(e), i = Z(r.width) + (r.boxSizing === "border-box" ? 0 : Z(r.paddingLeft) + Z(r.paddingRight) + Z(r.borderLeftWidth) + Z(r.borderRightWidth)), a = i > 0 ? e.getBoundingClientRect().width / i : 0;
	if (!Number.isFinite(a) || a <= 0) return 0;
	let o = 0;
	for (let r of Array.from(e.querySelectorAll("svg[data-docx-float=\"true\"]"))) {
		if (r.dataset.docxAnchorId != null || !t(r) || r.namespaceURI !== "http://www.w3.org/2000/svg" || r.ownerSVGElement || n.getComputedStyle(r).position !== "absolute") continue;
		let i = r.dataset.docxAnchorHorizontal === "text" && !!(r.style.left || r.style.marginLeft) && (!r.style.right || r.style.right === "auto"), s = r.dataset.docxAnchorVertical === "text" && !!(r.style.top || r.style.marginTop) && (!r.style.bottom || r.style.bottom === "auto");
		if (!i && !s) continue;
		let c = r.closest("p");
		if (!c || c.closest("td, th, svg, [data-docx-shape-textbox]")) continue;
		let l = c.closest("article, header, footer"), u = Si(r, n);
		if (!l || !e.contains(l) || !u || u !== c && u !== l && u !== e) continue;
		let d = n.getComputedStyle(u), f = u.getBoundingClientRect(), p = n.getComputedStyle(c);
		if (p.direction === "rtl" || p.writingMode && p.writingMode !== "horizontal-tb") continue;
		let m = yi.get(r) ?? {
			left: r.style.left,
			top: r.style.top
		}, h = (e) => !e || e === "auto" || bi.test(e);
		if (i && (!h(m.left) || !h(r.style.marginLeft)) || s && (!h(m.top) || !h(r.style.marginTop))) continue;
		let g = m.left;
		if (i) {
			let e = n.getComputedStyle(l), t = l.getBoundingClientRect().left + (Z(e.borderLeftWidth) + Z(e.paddingLeft)) * a, r = c.getBoundingClientRect(), i = Z(e.columnCount), o = Z(e.columnWidth);
			if (i > 1 || o > 0) {
				let n = e.columnGap === "normal" ? Z(e.fontSize) : Z(e.columnGap), s = l.clientWidth - Z(e.paddingLeft) - Z(e.paddingRight), c = i > 0 ? i : Math.max(1, Math.floor((s + n) / (o + n))), u = (s + n) / c;
				if (!(u > 0)) continue;
				let d = (r.left - t) / a - Z(p.marginLeft);
				t += Math.round(d / u) * u * a;
			}
			let s = (t - f.left) / a - Z(d.borderLeftWidth);
			if (!Number.isFinite(s)) continue;
			let u = m.left && m.left !== "auto" ? m.left : "0px";
			g = Math.abs(s) < .01 ? u : `calc(${u} + ${s.toFixed(4)}px)`;
		}
		if (yi.set(r, m), i && (r.style.left = g), s) {
			let e = (c.getBoundingClientRect().top - f.top) / a + Z(p.borderTopWidth) - Z(d.borderTopWidth), t = m.top && m.top !== "auto" ? m.top : "0px";
			Number.isFinite(e) && (r.style.top = Math.abs(e) < .01 ? t : `calc(${t} + ${e.toFixed(4)}px)`);
		}
		o++;
	}
	return o;
}
var wi = (e) => Number.parseFloat(e) || 0;
function Ti(e, t, n) {
	for (let r of Array.from(e.querySelectorAll("[data-docx-vml-text-viewport]"))) {
		if (!n(r)) continue;
		let e = r.ownerSVGElement;
		if (!e || e.dataset.docxVml !== "true") continue;
		let i = e.getScreenCTM?.();
		if (!i) continue;
		let a = Math.hypot(i.a, i.b) / t, o = Math.hypot(i.c, i.d) / t, s = r.dataset.docxVmlTextViewport.split(" ").map(Number);
		if (!(![a, o].every((e) => Number.isFinite(e) && e > 0) || s.length !== 4 || !s.every(Number.isFinite) || Math.abs(i.a * i.c + i.b * i.d) > 1e-5 * t * t * a * o)) {
			for (let [e, t] of [
				"x",
				"y",
				"width",
				"height"
			].entries()) r.setAttribute(t, `${s[e] * (e % 2 ? o : a)}`);
			r.setAttribute("transform", `scale(${1 / a} ${1 / o})`);
		}
	}
}
function Ei(e) {
	let t = /^([+-]?(?:\d+(?:\.\d*)?|\.\d+))(pt|px|in|cm|mm|pc)?$/i.exec(e?.trim() || "");
	if (!t) return null;
	let n = Number(t[1]) * ({
		pt: 4 / 3,
		px: 1,
		in: 96,
		cm: 96 / 2.54,
		mm: 96 / 25.4,
		pc: 16
	}[t[2]?.toLowerCase() || "px"] ?? 1);
	return Number.isFinite(n) ? n : null;
}
function Di(e) {
	return wi(e.width) + (e.boxSizing === "border-box" ? 0 : wi(e.paddingLeft) + wi(e.paddingRight) + wi(e.borderLeftWidth) + wi(e.borderRightWidth));
}
function Oi(e, t) {
	let n = t.ownerDocument.createTreeWalker(t, 1);
	n.currentNode = e;
	for (let e = n.nextNode(); e; e = n.nextNode()) if (e.closest("p") !== t || e.matches("br, [data-docx-tab], [data-docx-float], [data-docx-frame-anchor]")) return e;
	return null;
}
function ki(e, t = () => !0) {
	let n = e.ownerDocument.defaultView;
	if (!n) return 0;
	let r = /* @__PURE__ */ new Map();
	for (let n of Array.from(e.querySelectorAll("[data-docx-tab=\"true\"][data-docx-tab-pos]"))) {
		if (n.dataset.docxTabId != null || !t(n)) continue;
		let i = n.closest("p");
		if (!i || !e.contains(i) || n.closest("[data-docx-has-tab-leader=\"true\"], [data-docx-toc-entry=\"true\"]") || n.dataset.docxTabLeader && n.dataset.docxTabLeader !== "none" || ![
			"left",
			"right",
			"center"
		].includes(n.dataset.docxTabAlign || "left") || Ei(n.dataset.docxTabPos) === null) continue;
		let a = r.get(i) || [];
		a.push(n), r.set(i, a);
	}
	let i = 0;
	for (let [e, t] of r) {
		let r = n.getComputedStyle(e);
		if (r.direction === "rtl" || r.writingMode && r.writingMode !== "horizontal-tb" || r.textAlign === "center" || r.textAlign === "right" || r.textAlign === "end") continue;
		let a = e.getBoundingClientRect(), o = Di(r), s = o > 0 ? a.width / o : 0;
		if (!Number.isFinite(s) || s <= 0 || a.width <= 0) continue;
		let c = a.left + (wi(r.borderLeftWidth) + wi(r.paddingLeft)) * s;
		for (let e of t) e.style.width = "0px", e.style.minWidth = "0px";
		for (let n of t) {
			let t = Ei(n.dataset.docxTabPos), r = n.getBoundingClientRect(), a = e.ownerDocument.createRange();
			a.setStartAfter(n);
			let o = Oi(n, e);
			o ? a.setEndBefore(o) : a.setEnd(e, e.childNodes.length);
			let l = Array.from(a.getClientRects()).filter((e) => e.width > 0 && e.bottom > r.top + .1 && e.top < r.bottom - .1), u = Infinity, d = -Infinity;
			for (let e of l) u = Math.min(u, e.left), d = Math.max(d, e.right);
			let f = l.length ? Math.max(0, d - u) / s : 0, p = n.dataset.docxTabAlign === "right" ? 1 : n.dataset.docxTabAlign === "center" ? .5 : 0, m = Math.max(0, t - (r.left - c) / s - f * p);
			Number.isFinite(m) && (n.style.width = `${m.toFixed(4)}px`, i++);
		}
	}
	return i;
}
var Ai = 21.247, ji = (6 / 29) ** 3;
function Mi(e) {
	return e > .04045 ? ((e + .055) / 1.055) ** 2.4 : e / 12.92;
}
function Ni(e) {
	let t = e > .0031308 ? 1.055 * e ** (1 / 2.4) - .055 : e * 12.92;
	return Math.min(Math.max(0, t), 1);
}
function Pi(e, t, n) {
	let r = Mi(e / 255), i = Mi(t / 255), a = Mi(n / 255), o = (r * .4124564 + i * .3575761 + a * .1804375) * 100 / 95.047, s = (r * .2126729 + i * .7151522 + a * .072175) * 100 / 100, c = (r * .0193339 + i * .119192 + a * .9503041) * 100 / 108.883, l = (e) => e > ji ? Math.cbrt(e) : 7.787 * e + 16 / 116;
	return o = l(o), s = l(s), c = l(c), [
		116 * s - 16,
		500 * (o - s),
		200 * (s - c)
	];
}
function Fi(e, t, n) {
	let r = (e + 16) / 116, i = r + t / 500, a = r - n / 200, o = (e) => e * e * e > ji ? e * e * e : (e - 16 / 116) / 7.787, s = o(i) * 95.047 / 100, c = o(r) * 100 / 100, l = o(a) * 108.883 / 100, u = Ni(s * 3.2404542 + c * -1.5371385 + l * -.4985314), d = Ni(s * -.969266 + c * 1.8760108 + l * .041556), f = Ni(s * .0556434 + c * -.2040259 + l * 1.0572252);
	return [
		Math.round(u * 255),
		Math.round(d * 255),
		Math.round(f * 255)
	];
}
var Ii = {
	black: [
		0,
		0,
		0
	],
	blue: [
		0,
		0,
		255
	],
	cyan: [
		0,
		255,
		255
	],
	darkblue: [
		0,
		0,
		139
	],
	darkcyan: [
		0,
		139,
		139
	],
	darkgray: [
		169,
		169,
		169
	],
	darkgrey: [
		169,
		169,
		169
	],
	darkgreen: [
		0,
		100,
		0
	],
	darkmagenta: [
		139,
		0,
		139
	],
	darkred: [
		139,
		0,
		0
	],
	darkyellow: [
		128,
		128,
		0
	],
	green: [
		0,
		128,
		0
	],
	gray: [
		128,
		128,
		128
	],
	grey: [
		128,
		128,
		128
	],
	lightgray: [
		211,
		211,
		211
	],
	lightgrey: [
		211,
		211,
		211
	],
	magenta: [
		255,
		0,
		255
	],
	red: [
		255,
		0,
		0
	],
	white: [
		255,
		255,
		255
	],
	yellow: [
		255,
		255,
		0
	]
};
function Li(e) {
	return Math.min(255, Math.max(0, e));
}
function Ri(e) {
	let t = e.trim();
	if (t.startsWith("#")) {
		let e = t.slice(1);
		if (e.length === 3 || e.length === 4) {
			let t = parseInt(e[0] + e[0], 16), n = parseInt(e[1] + e[1], 16), r = parseInt(e[2] + e[2], 16), i = e.length === 4 ? parseInt(e[3] + e[3], 16) / 255 : 1;
			return Number.isNaN(t) || Number.isNaN(n) || Number.isNaN(r) ? null : {
				r: t,
				g: n,
				b: r,
				a: i
			};
		}
		if (e.length === 6 || e.length === 8) {
			let t = parseInt(e.slice(0, 2), 16), n = parseInt(e.slice(2, 4), 16), r = parseInt(e.slice(4, 6), 16), i = e.length === 8 ? parseInt(e.slice(6, 8), 16) / 255 : 1;
			return Number.isNaN(t) || Number.isNaN(n) || Number.isNaN(r) ? null : {
				r: t,
				g: n,
				b: r,
				a: i
			};
		}
		return null;
	}
	let n = /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)$/i.exec(t);
	if (n) return {
		r: Li(parseFloat(n[1])),
		g: Li(parseFloat(n[2])),
		b: Li(parseFloat(n[3])),
		a: n[4] === void 0 ? 1 : parseFloat(n[4])
	};
	let r = Ii[t.toLowerCase()];
	return r ? {
		r: r[0],
		g: r[1],
		b: r[2],
		a: 1
	} : null;
}
function zi(e) {
	return e === "" || e === "none" || e === "transparent" || e === "inherit" || e === "initial" || e === "unset" || e === "currentcolor" || e.startsWith("var(") || e.startsWith("color-mix(") || e.startsWith("url(") || e.startsWith("linear-gradient(") || e.startsWith("radial-gradient(") || e.startsWith("conic-gradient(");
}
var Bi = /* @__PURE__ */ new Map(), Vi = /^var\(\s*(--[\w-]+)\s*,\s*([\s\S]+)\)$/i;
function Hi(e, t = Ai) {
	if (!e) return e;
	let n = e.trim(), r = n.toLowerCase();
	if (r.startsWith("var(")) {
		let r = Vi.exec(n);
		if (!r) return e;
		let i = r[2].trim(), a = Hi(i, t);
		return a === i ? e : `var(${r[1]}, ${a})`;
	}
	if (zi(r)) return e;
	let i = `${t}|${n}`, a = Bi.get(i);
	if (a !== void 0) return a;
	let o = Ri(n);
	if (!o || o.a === 0) return Bi.set(i, e), e;
	let [s, c, l] = Pi(o.r, o.g, o.b), [u, d, f] = Fi((100 - s) * ((100 - t) / 100) + t, c, l), p = o.a >= 1 ? `rgb(${u}, ${d}, ${f})` : `rgba(${u}, ${d}, ${f}, ${Math.round(o.a * 1e3) / 1e3})`;
	return Bi.set(i, p), p;
}
var Ui = /* @__PURE__ */ new Set([
	"color",
	"background-color",
	"border-color",
	"border-top-color",
	"border-right-color",
	"border-bottom-color",
	"border-left-color",
	"outline-color",
	"text-decoration-color",
	"caret-color",
	"column-rule-color",
	"fill",
	"stroke"
]), Wi = /* @__PURE__ */ new Set([
	"border",
	"border-top",
	"border-right",
	"border-bottom",
	"border-left",
	"outline",
	"column-rule"
]), Gi = /(var\([^)]*\)|rgba?\([^)]*\)|#[0-9a-fA-F]{3,8}|[a-zA-Z]+)\s*$/;
function Ki(e, t) {
	return e && e.replace(Gi, (e) => Hi(e, t));
}
function qi(e, t) {
	if (!e) return e;
	let n = e;
	for (let r in e) {
		let i = e[r];
		if (typeof i != "string" || !i) continue;
		let a;
		Ui.has(r) || r.startsWith("--") && r.endsWith("-color") ? a = Hi(i, t) : Wi.has(r) && (a = Ki(i, t)), a !== void 0 && a !== i && (n === e && (n = { ...e }), n[r] = a);
	}
	return n;
}
var Q;
(function(e) {
	e.html = "http://www.w3.org/1999/xhtml", e.svg = "http://www.w3.org/2000/svg", e.mathML = "http://www.w3.org/1998/Math/MathML";
})(Q ||= {});
function Ji(e) {
	if (D(e)) return document.createTextNode(e);
	if (e instanceof Node) return e;
	let { ns: t, tagName: n, className: r, style: i, children: a, ...o } = e;
	if (n === "#fragment") {
		let e = document.createDocumentFragment();
		return a?.forEach((t) => e.appendChild(Ji(t))), e;
	}
	if (n === "#comment") return document.createComment(a[0]);
	let s = t ? document.createElementNS(t, n) : document.createElement(n);
	if (r && s.setAttribute("class", r), i) {
		if (D(i)) s.setAttribute("style", i);
		else for (let [e, t] of Object.entries(i)) t != null && (e.startsWith("--") || e.includes("-") ? s.style.setProperty(e, t) : s.style[e] = t);
	}
	if (o) for (let [e, t] of Object.entries(o)) t !== void 0 && (s[e] = t);
	return a && a.forEach((e) => s.appendChild(Ji(e))), s;
}
function Yi(...e) {
	return e.filter(Boolean).join(" ");
}
function $(e) {
	let t = e?.reviewMode;
	return t === "final" || t === "original" || t === "simple" || t === "all" ? t : e?.renderChanges || t === "auto" ? "all" : "final";
}
function Xi(e) {
	return e?.reviewMode != null || e?.renderChanges === !0;
}
function Zi(e) {
	return e !== "original";
}
function Qi(e) {
	return e === "original";
}
function $i(e, t) {
	if (!e || !Ca(t)) return !1;
	let n = Array.from(e.querySelectorAll("[data-docx-review-enabled='true']"));
	if (e.dataset?.docxReviewEnabled === "true" && n.unshift(e), n.length === 0) return !1;
	for (let e of new Set(n)) e.dataset.docxReviewMode = t;
	return !0;
}
function ea(e) {
	let t = e?.documentPart?.body ?? e, n = [], r = (e) => {
		if (!e) return;
		if (e.type === R.Paragraph) {
			n.push(...na(e));
			return;
		}
		let t = ra(e.props?.revision, e.type);
		if (t && e.type !== R.Inserted && e.type !== R.Deleted) {
			let r = ca(Ta(e));
			n.push(ia(t, r || la(e.type), !0));
		}
		for (let t of e.props?.formatRevisions ?? []) n.push(aa(t));
		for (let t of e.children ?? []) r(t);
	};
	r(t);
	for (let t of e?.commentsPart?.comments ?? []) {
		let e = t.id == null ? void 0 : String(t.id);
		n.push({
			id: e,
			ids: e == null ? [] : [e],
			kind: "comment",
			author: t.author || void 0,
			date: t.date || void 0,
			text: ca(Ta(t)),
			presentation: "balloon"
		});
	}
	return n;
}
function ta(e, t) {
	if (t === "auto") {
		let t = ea(e).length;
		return {
			enabled: t > 0,
			mode: t > 0 ? "all" : "final",
			automatic: !0,
			changeCount: t
		};
	}
	return {
		enabled: t != null,
		mode: $({ reviewMode: t ?? void 0 }),
		automatic: !1,
		changeCount: 0
	};
}
function na(e) {
	let t = [], n = null, r = () => {
		if (!n) return;
		let e = ca(n.text);
		(e || n.structural) && t.push(ia(n.revision, e || "段落标记", n.structural, n.ids)), n = null;
	}, i = (e, t, i = !1) => {
		let a = e.id;
		!n || sa(n.revision) !== sa(e) ? (r(), n = {
			revision: e,
			ids: a == null ? [] : [a],
			text: "",
			structural: i
		}) : (a != null && !n.ids.includes(a) && n.ids.push(a), n.structural || (n.structural = i)), n.text += t;
	}, a = (e) => {
		let n = e.props?.formatRevisions ?? [];
		if (n.length) {
			r();
			for (let e of n) t.push(aa(e));
		}
	};
	a(e);
	for (let t of e.props?.paragraphMarkRevisions ?? []) {
		let e = ra(t, t?.kind === "delete" ? R.Deleted : R.Inserted);
		e && i(e, "", e.kind === "delete" || e.kind === "move-from");
	}
	let o = (e, t) => {
		if (!e) return;
		a(e);
		let n = ra(e.props?.revision, e.type), s = n ? [...t, n] : t, c = oa(e);
		if (c != null) {
			let e = s[s.length - 1];
			e ? i(e, c) : c.length && r();
		} else for (let t of e.children ?? []) o(t, s);
	};
	for (let t of e.children ?? []) o(t, []);
	return r(), t;
}
function ra(e, t) {
	if (!e) return null;
	let n = wa(e.kind, t);
	return n !== "insert" && n !== "delete" && n !== "move-from" && n !== "move-to" ? null : {
		id: e.id == null ? void 0 : String(e.id),
		kind: n,
		author: e.author || void 0,
		date: e.date || void 0
	};
}
function ia(e, t, n = !1, r) {
	let i = xa(r ?? (e.id == null ? [] : [e.id]));
	return {
		id: i[0],
		ids: i,
		kind: e.kind,
		author: e.author,
		date: e.date,
		text: t || (n ? "结构修订" : ""),
		presentation: e.kind === "insert" || e.kind === "move-to" ? "inline" : "balloon"
	};
}
function aa(e) {
	let t = e?.id == null ? void 0 : String(e.id), n = ua(e?.formatChanges);
	return {
		id: t,
		ids: t == null ? [] : [t],
		kind: "format",
		author: e?.author || void 0,
		date: e?.date || void 0,
		text: da(n, e?.kind),
		presentation: "balloon",
		formatChanges: n
	};
}
function oa(e) {
	return e.type === R.Text || e.type === R.DeletedText ? e.text ?? "" : e.type === R.Tab || e.type === R.PositionalTab ? "	" : e.type === R.Break ? "\n" : e.type === R.NoBreakHyphen ? "‑" : null;
}
function sa(e) {
	return [
		e.kind,
		e.author ?? "",
		e.date ?? ""
	].join("\0");
}
function ca(e) {
	return String(e ?? "").replace(/[\u2060\u200b]/g, "").replace(/[ \t]+\n/g, "\n").trim();
}
function la(e) {
	switch (e) {
		case R.Row: return "表格行";
		case R.Cell: return "表格单元格";
		case R.Table: return "表格";
		case R.Paragraph: return "段落标记";
		default: return "结构修订";
	}
}
function ua(e) {
	return Array.isArray(e) ? e.filter((e) => e && e.property).map((e) => ({
		property: String(e.property),
		before: e.before == null ? void 0 : String(e.before),
		after: e.after == null ? void 0 : String(e.after)
	})) : [];
}
function da(e, t) {
	return e.length && xa(e.map((e) => fa(e)).filter(Boolean)).join("；") || ba(t);
}
function fa(e) {
	let t = pa(e.after);
	switch (e.property) {
		case "u": return t == null || t === "none" || t === "0" || t === "false" ? "无下划线" : ha(t);
		case "b": return ma(t) ? "加粗" : "取消加粗";
		case "i": return ma(t) ? "倾斜" : "取消倾斜";
		case "strike": return ma(t) ? "删除线" : "取消删除线";
		case "dstrike": return ma(t) ? "双删除线" : "取消双删除线";
		case "color": return t ? `字体颜色 ${_a(t)}` : "自动字体颜色";
		case "highlight": return t && t !== "none" ? `突出显示 ${t}` : "无突出显示";
		case "sz":
		case "szCs": return t && !Number.isNaN(Number(t)) ? `字号 ${Number(t) / 2} 磅` : "字号已更改";
		case "rFonts": return t ? `字体 ${va(t)}` : "使用默认字体";
		case "jc": return `对齐方式 ${ga(t)}`;
		case "spacing": return "段落间距已更改";
		case "ind": return "段落缩进已更改";
		case "shd": return t ? `底纹 ${_a(t)}` : "无底纹";
		case "vertAlign": return t === "superscript" ? "上标" : t === "subscript" ? "下标" : "基线对齐";
		default: return ya(e.property, t);
	}
}
function pa(e) {
	if (e != null) return /(?:^|\|)val=([^|]+)/.exec(e)?.[1] ?? e;
}
function ma(e) {
	return e == null || e === "" || e === "1" || e === "true" || e === "on";
}
function ha(e) {
	switch (e) {
		case "single": return "单下划线";
		case "double": return "双下划线";
		case "words": return "仅字词下划线";
		case "wave":
		case "wavyDouble":
		case "wavyHeavy": return "波浪下划线";
		default: return "下划线";
	}
}
function ga(e) {
	switch (e) {
		case "center": return "居中";
		case "right":
		case "end": return "右对齐";
		case "both":
		case "distribute": return "两端对齐";
		default: return "左对齐";
	}
}
function _a(e) {
	return /(?:val|fill)=([^|]+)/.exec(e)?.[1] ?? e;
}
function va(e) {
	let t = e.split("|").map((e) => e.split("=")).filter((e) => e.length === 2);
	return (t.find(([e]) => e === "eastAsia") ?? t.find(([e]) => e === "ascii") ?? t[0])?.[1] ?? e;
}
function ya(e, t) {
	let n = {
		caps: "全部大写",
		smallCaps: "小型大写字母",
		vanish: "隐藏文字",
		keepNext: "与下段同页",
		keepLines: "段中不分页",
		pageBreakBefore: "段前分页",
		tblBorders: "表格边框",
		tcBorders: "单元格边框",
		tblW: "表格宽度",
		tcW: "单元格宽度"
	}[e] ?? "格式";
	return t && !["true", "1"].includes(t) ? `${n} ${t}` : n;
}
function ba(e) {
	switch (e) {
		case "paragraph-format": return "段落格式已更改";
		case "table-format": return "表格格式已更改";
		case "row-format": return "表格行格式已更改";
		case "cell-format": return "单元格格式已更改";
		default: return "字符格式已更改";
	}
}
function xa(e) {
	return [...new Set(e.filter((e) => e != null && e !== ""))];
}
function Sa(e) {
	let t = [
		"#c2410c",
		"#2563eb",
		"#7c3aed",
		"#0f766e",
		"#be123c",
		"#4d7c0f",
		"#a21caf",
		"#0369a1"
	], n = String(e || "Unknown"), r = 2166136261;
	for (let e = 0; e < n.length; e++) r ^= n.charCodeAt(e), r = Math.imul(r, 16777619);
	return t[(r >>> 0) % t.length];
}
function Ca(e) {
	return e === "final" || e === "original" || e === "simple" || e === "all";
}
function wa(e, t) {
	return e === "insert" || e === "delete" || e === "move-from" || e === "move-to" ? e : t === R.Deleted ? "delete" : "insert";
}
function Ta(e) {
	return e.type === R.Text || e.type === R.DeletedText ? e.text ?? "" : e.type === R.Tab || e.type === R.PositionalTab ? "	" : e.type === R.Break ? "\n" : (e.children ?? []).map(Ta).join("").trim();
}
var Ea = /[\u0000-\u0020\u007f-\u009f]+/g, Da = /^[a-z][a-z0-9+.-]*:/i, Oa = /^(?:https?|mailto|tel):/i;
function ka(e) {
	let t = String(e ?? "").trim().replace(Ea, "");
	return t ? t.startsWith("#") ? t : t.startsWith("//") || t.includes("\\") || Da.test(t) && !Oa.test(t) ? null : t : null;
}
function Aa(e, t) {
	let n = !1, r = null, i = /* @__PURE__ */ new Set(), a = () => {
		n = !1, r = null;
	};
	for (let o of e) {
		if (o.type !== R.Paragraph) {
			a();
			continue;
		}
		let e = o, s = !1, c = (e) => {
			if (!t(e)) switch (e.type) {
				case R.Break:
					let t = e.break;
					t === "page" ? (n = !0, r = null, s = !0) : t === "lastRenderedPageBreak" ? (s = !0, n ? (i.add(e), r = e) : r &&= (i.delete(r), null), n = !1) : a();
					break;
				case R.BookmarkStart:
				case R.BookmarkEnd: break;
				case R.Run:
				case R.Hyperlink:
					(e.children ?? []).forEach(c);
					break;
				case R.Text:
				case R.DeletedText:
					e.text && a();
					break;
				default: a();
			}
		};
		(e.children ?? []).forEach(c), (!s || e.sectionProps) && a();
	}
	if (!i.size) return e;
	let o = (e) => {
		if (i.has(e)) return null;
		if (!e.children?.length) return e;
		let t = !1, n = [];
		for (let r of e.children) {
			let e = o(r);
			t ||= e !== r, e && n.push(e);
		}
		return t && n.length === 0 && (e.type === R.Run || e.type === R.Hyperlink) ? null : t ? {
			...e,
			children: n
		} : e;
	};
	return e.map(o);
}
var ja = ["http://schemas.openxmlformats.org/drawingml/2006/chart", "http://purl.oclc.org/ooxml/drawingml/chart"], Ma = ["http://schemas.openxmlformats.org/drawingml/2006/main", "http://purl.oclc.org/ooxml/drawingml/main"], Na = /* @__PURE__ */ new WeakMap();
function Pa(e) {
	let t = /* @__PURE__ */ new Set(), n = [e, ...Array.from(e.querySelectorAll("[data-docx-layout-root], [data-docx-comment-layer]"))];
	for (let e of n) {
		let n = Na.get(e);
		n && t.add(n), Na.delete(e);
	}
	for (let e of t) e.disposeLayout();
}
async function Fa(e, t = l(e)) {
	c(e, t);
	let n = /* @__PURE__ */ new Set();
	for (let t of [e, ...Array.from(e.querySelectorAll("[data-docx-layout-root]"))]) {
		let e = Na.get(t);
		e && n.add(e);
	}
	for (let r of n) c(e, t), await r.prepareLayout(e, t);
	c(e, t);
	for (let n of [e, ...Array.from(e.querySelectorAll("[data-docx-layout-root]"))]) {
		let e = Na.get(n);
		e?.shouldRunDynamicPagination() && n.classList.contains(`${e.className}-wrapper`) && e.scheduleDynamicPagination(n, t);
	}
}
var Ia = class e {
	constructor() {
		this.className = "docx", this.styleMap = {}, this.currentPart = null, this.currentSectionProps = null, this.currentPageNumber = 1, this.currentSectionNumber = 1, this.currentSectionPageNumber = 1, this.totalPages = 1, this.sectionPageCount = 1, this.tableVerticalMerges = [], this.currentVerticalMerge = null, this.tableCellPositions = [], this.currentCellPosition = null, this.currentTableRow = null, this.repeatedTableHeaderRows = /* @__PURE__ */ new WeakSet(), this.footnoteMap = {}, this.endnoteMap = {}, this.currentEndnoteIds = [], this.noteNumbering = new Pe(), this.renderedNoteIds = /* @__PURE__ */ new Set(), this.noteSectionIds = /* @__PURE__ */ new Map(), this.notePageIndex = 1, this.dynamicNoteState = /* @__PURE__ */ new WeakMap(), this.noteContinuationOrigins = /* @__PURE__ */ new WeakMap(), this.headerFooterModels = /* @__PURE__ */ new Map(), this.pageHeaderFooterState = /* @__PURE__ */ new WeakMap(), this.currentTabs = [], this.anchorLayouts = /* @__PURE__ */ new Map(), this.currentParagraph = null, this.currentParagraphTabIndex = 0, this.currentParagraphTabCount = 0, this.commentMap = {}, this.commentLayer = null, this.commentPresentations = /* @__PURE__ */ new Map(), this.renderingComment = !1, this.hyperlinkDepth = 0, this.layoutGenerations = /* @__PURE__ */ new Map(), this.bookmarkTextMap = {}, this.bookmarkIdToName = {}, this.tocEntries = [], this.fieldSeqCounters = {}, this.fieldSetValues = {}, this.headingIndex = 0, this.tasks = [], this.postRenderTasks = [], this.compatibleTextBoxSpacing = !1, this.h = Ji, this.darkModeVarNames = /* @__PURE__ */ new Map(), this.darkModePrintReset = {};
	}
	async render(e, t) {
		this.document = e, this.options = t, this.className = t.className, this.rootSelector = t.inWrapper ? `.${this.className}-wrapper` : ":root", this.h = t.h ?? Ji, this.styleMap = null, this.tasks = [], this.postRenderTasks = [], this.commentLayer = null, this.commentPresentations.clear(), this.renderingComment = !1, this.currentTabs = [], this.currentFootnoteIds = [], this.currentEndnoteIds = [], this.footnoteMap = {}, this.endnoteMap = {}, this.noteNumbering = new Pe(), this.renderedNoteIds = /* @__PURE__ */ new Set(), this.repeatedTableHeaderRows = /* @__PURE__ */ new WeakSet(), this.noteSectionIds = /* @__PURE__ */ new Map(), this.notePageIndex = 1, this.dynamicNoteState = /* @__PURE__ */ new WeakMap(), this.noteContinuationOrigins = /* @__PURE__ */ new WeakMap(), this.anchorLayouts.clear(), this.headerFooterModels.clear(), this.pageHeaderFooterState = /* @__PURE__ */ new WeakMap(), this.fieldSeqCounters = {}, this.fieldSetValues = {}, this.headingIndex = 0, this.darkModeVarNames = /* @__PURE__ */ new Map(), this.darkModePrintReset = {}, this.options.renderComments && globalThis.Highlight && (this.commentHighlight = new Highlight());
		let n = [...this.renderDefaultStyle()];
		if (e.themePart && n.push(...this.renderTheme(e.themePart)), e.stylesPart != null) {
			let t = this.cloneRenderData(e.stylesPart.styles);
			this.styleMap = this.processStyles(t), n.push(...this.renderStyles(t));
		}
		e.numberingPart && (this.prodessNumberings(e.numberingPart.domNumberings), n.push(...await this.renderNumbering(e.numberingPart.domNumberings))), e.footnotesPart && (this.footnoteMap = w(this.cloneRenderData(e.footnotesPart.notes), (e) => e.id)), e.endnotesPart && (this.endnoteMap = w(this.cloneRenderData(e.endnotesPart.notes), (e) => e.id)), e.settingsPart && (this.defaultTabSize = e.settingsPart.settings?.defaultTabStop), !t.ignoreFonts && e.fontTablePart && n.push(...await this.renderFontTable(e.fontTablePart));
		var r = await this.renderSections(this.cloneRenderData(e.documentPart.body));
		if (this.options.inWrapper) {
			let e = this.renderWrapper(r);
			this.commentLayer && e.appendChild(this.commentLayer.root), n.push(e), this.shouldRunDynamicPagination() && this.scheduleDynamicPagination(e);
		} else n.push(...r), this.commentLayer && (this.commentLayer.root.style.position = "fixed", n.push(this.commentLayer.root));
		n.push(...this.renderDarkModePrintReset()), this.commentHighlight && t.renderComments && CSS.highlights.set(`${this.className}-comments`, this.commentHighlight), await Promise.allSettled(this.tasks), this.postRenderTasks.forEach((e) => e()), this.commentLayer && Na.set(this.commentLayer.root, this);
		for (let e of n) ["section", "div"].includes(e.tagName?.toLowerCase()) && !e.dataset?.docxCommentLayer && (e.dataset.docxLayoutRoot = "true", Na.set(e, this));
		return n;
	}
	renderTheme(e) {
		let t = {}, n = e.theme?.fontScheme, r = this.documentThemeLanguages();
		n && (n.majorFont && (t["--docx-majorHAnsi-font"] = this.themeFontFamily(n.majorFont, "latin", r.latin), t["--docx-majorEastAsia-font"] = this.themeFontFamily(n.majorFont, "eastAsia", r.eastAsia), t["--docx-majorBidi-font"] = this.themeFontFamily(n.majorFont, "complexScript", r.bidi), t["--docx-majorCs-font"] = t["--docx-majorBidi-font"], this.addThemeScriptFontVariables(t, "major", n.majorFont)), n.minorFont && (t["--docx-minorHAnsi-font"] = this.themeFontFamily(n.minorFont, "latin", r.latin), t["--docx-minorEastAsia-font"] = this.themeFontFamily(n.minorFont, "eastAsia", r.eastAsia), t["--docx-minorBidi-font"] = this.themeFontFamily(n.minorFont, "complexScript", r.bidi), t["--docx-minorCs-font"] = t["--docx-minorBidi-font"], this.addThemeScriptFontVariables(t, "minor", n.minorFont)));
		let i = e.theme?.colorScheme, a = [];
		if (i) for (let [e, n] of Object.entries(i.colors)) {
			let r = `--docx-${e}-color`;
			t[r] = `#${n}`, a.push(r);
		}
		let o = this.styleToString(`.${this.className}`, t);
		if (this.options.darkMode && a.length) {
			let e = a.map((e) => `  ${e}: ${t[e]};\r\n`).join("");
			o += `@media print {\r\n.${this.className} {\r\n${e}}\r\n}\r\n`;
		}
		return [this.h({
			tagName: "#comment",
			children: ["docxjs document theme values"]
		}), this.h({
			tagName: "style",
			children: [o]
		})];
	}
	documentThemeLanguages() {
		let e = {
			latin: "",
			eastAsia: "",
			bidi: ""
		}, t = (this.document.stylesPart?.styles ?? []).filter((e) => e.id == null || e.isDefault && e.target == "span").flatMap((e) => e.styles ?? []).find((e) => e.target == "span")?.values ?? {};
		return e.latin = t.$lang ?? "", e.eastAsia = t["$lang-eastAsia"] ?? e.latin, e.bidi = t["$lang-bidi"] ?? e.latin, e;
	}
	addThemeScriptFontVariables(e, t, n) {
		let r = /* @__PURE__ */ new Set([
			"Hans",
			"Hant",
			"Jpan",
			"Hang"
		]);
		for (let i of Object.keys(n.scriptTypefaces ?? {})) {
			let a = r.has(i) ? "eastAsia" : "complexScript", o = this.themeFontFamily(n, a, "", i);
			e[`--docx-${t}EastAsia-font-${i}`] = o, e[`--docx-${t}Bidi-font-${i}`] = o, e[`--docx-${t}Cs-font-${i}`] = o;
		}
	}
	themeFontFamily(e, t, n, r = "") {
		let i = t == "latin" ? e.latinTypeface : t == "eastAsia" ? e.eaTypeface : e.csTypeface, a = r || bt(n), o = a ? e.scriptTypefaces?.[a] : "", s = i?.trim() || o?.trim() || e.latinTypeface?.trim();
		if (!s) return t == "eastAsia" ? "sans-serif" : "serif";
		let c = [v(s)];
		return t == "eastAsia" && c.push(...b(s, a).slice(1)), [...new Set(c)].join(", ");
	}
	async renderFontTable(e) {
		let t = [];
		for (let n of e.fonts) for (let e of n.embedFontRefs) try {
			let r = await this.document.loadFont(e.id, e.key), i = {
				"font-family": v(n.name),
				src: `url(${r})`
			};
			(e.type == "bold" || e.type == "boldItalic") && (i["font-weight"] = "bold"), (e.type == "italic" || e.type == "boldItalic") && (i["font-style"] = "italic"), t.push(this.h({
				tagName: "#comment",
				children: [`docxjs ${n.name} font`]
			})), t.push(this.h({
				tagName: "style",
				children: [this.styleToString("@font-face", i)]
			}));
		} catch {
			this.options.debug && console.warn(`Can't load font with id ${e.id} and key ${e.key}`);
		}
		return t;
	}
	processStyleName(e) {
		return e ? `${this.className}_${_(e)}` : this.className;
	}
	processStyles(e) {
		let t = w(e.filter((e) => e.id != null), (e) => e.id);
		for (let r of e.filter((e) => e.basedOn)) {
			var n = t[r.basedOn];
			if (n) {
				r.paragraphProps = O({}, n.paragraphProps, r.paragraphProps), r.runProps = O({}, n.runProps, r.runProps);
				for (let e of n.styles) {
					let t = r.styles.find((t) => t.target == e.target);
					t ? this.copyStyleProperties(e.values, t.values) : r.styles.push({
						...e,
						values: { ...e.values }
					});
				}
			} else this.options.debug && console.warn(`Can't find base style ${r.basedOn}`);
		}
		for (let t of e) t.cssName = this.processStyleName(t.id);
		return t;
	}
	prodessNumberings(e) {
		for (let t of e.filter((e) => e.pStyleName)) {
			let e = this.findStyle(t.pStyleName);
			e?.paragraphProps?.numbering && (e.paragraphProps.numbering.level = t.level);
		}
	}
	processElement(e) {
		if (e && e.children) for (var t of e.children) t.parent = e, t.type == R.Table ? this.processTable(t) : this.processElement(t);
	}
	processTable(e) {
		let t = e.children ?? [], n = e.columns?.length ?? 0;
		for (let e of t) {
			let t = e.gridBefore ?? 0;
			for (let n of e.children ?? []) t += n.span ?? 1;
			n = Math.max(n, t + (e.gridAfter ?? 0));
		}
		let r = Math.max(e.rowBandSize ?? 1, 1), i = Math.max(e.colBandSize ?? 1, 1);
		t.forEach((a, o) => {
			o == 0 && this.appendClassName(a, "first-row"), o == t.length - 1 && this.appendClassName(a, "last-row"), this.appendClassName(a, Math.floor(o / r) % 2 == 0 ? "odd-row" : "even-row");
			let s = a.gridBefore ?? 0;
			for (let t of a.children ?? []) {
				t.cssStyle = this.copyStyleProperties(e.cellStyle, t.cssStyle, [
					"border-left",
					"border-right",
					"border-top",
					"border-bottom",
					"padding-left",
					"padding-right",
					"padding-top",
					"padding-bottom"
				]);
				let r = t.span ?? 1, a = s + r - 1;
				s == 0 && this.appendClassName(t, "first-col"), n > 0 && a >= n - 1 && this.appendClassName(t, "last-col"), this.appendClassName(t, Math.floor(s / i) % 2 == 0 ? "odd-col" : "even-col"), this.processElement(t), s += r;
			}
		});
	}
	collectDocumentMetadata(e) {
		this.bookmarkTextMap = {}, this.bookmarkIdToName = {}, this.tocEntries = [];
		let t = {}, n = (e) => {
			if (e.type != R.Deleted || Qi($(this.options))) {
				switch (e.type) {
					case R.BookmarkStart: {
						let n = e;
						n.id && n.name && (this.bookmarkIdToName[n.id] = n.name, t[n.id] = []);
						break;
					}
					case R.BookmarkEnd: {
						let n = e, r = this.bookmarkIdToName[n.id];
						r && t[n.id] && (this.bookmarkTextMap[r] = t[n.id].join("").trim(), delete t[n.id]);
						break;
					}
					case R.Text:
						for (let n of Object.keys(t)) t[n].push(e.text ?? "");
						break;
					case R.DeletedText: if (Qi($(this.options))) for (let n of Object.keys(t)) t[n].push(e.text ?? "");
				}
				for (let t of e.children ?? []) n(t);
			}
		};
		for (let t of e.children ?? []) n(t);
		for (let [e, n] of Object.entries(t)) {
			let t = this.bookmarkIdToName[e];
			t && (this.bookmarkTextMap[t] = n.join("").trim());
		}
		for (let t of e.children ?? []) this.collectTocEntries(t);
	}
	collectTocEntries(e) {
		if (e.type != R.Deleted || Qi($(this.options))) {
			if (e.type == R.Paragraph) {
				let t = e, n = this.findStyle(t.styleName), r = this.extractText(t).trim(), i = t.outlineLevel ?? n?.paragraphProps?.outlineLevel;
				if (i == null && t.styleName) {
					let e = /heading(\d+)|(?:^|[-_ ])h(\d+)$/i.exec(t.styleName);
					e && (i = parseInt(e[1] ?? e[2], 10) - 1);
				}
				if (r && i != null && i >= 0 && i < 9) {
					let e = this.findFirstBookmark(t), n = e?.name && !e.name.startsWith("_") ? e.name : `${this.className}-heading-${++this.headingIndex}`;
					t.props = {
						...t.props ?? {},
						anchorId: n
					}, this.tocEntries.push({
						level: i + 1,
						text: r,
						id: n
					});
				}
			}
			for (let t of e.children ?? []) this.collectTocEntries(t);
		}
	}
	findFirstBookmark(e) {
		if (e.type == R.BookmarkStart) return e;
		for (let t of e.children ?? []) {
			let e = this.findFirstBookmark(t);
			if (e) return e;
		}
		return null;
	}
	extractText(e) {
		switch (e.type) {
			case R.Text: return e.text ?? "";
			case R.DeletedText: return Qi($(this.options)) ? e.text ?? "" : "";
			case R.Deleted: return Qi($(this.options)) ? (e.children ?? []).map((e) => this.extractText(e)).join("") : "";
			case R.Inserted: return $(this.options) == "original" ? "" : (e.children ?? []).map((e) => this.extractText(e)).join("");
			case R.Tab:
			case R.PositionalTab: return "	";
			case R.NoBreakHyphen: return "‑";
			case R.SoftHyphen: return "";
			case R.Break: return "\n";
			case R.Instruction:
			case R.ComplexField: return "";
		}
		return (e.children ?? []).map((e) => this.extractText(e)).join("");
	}
	appendClassName(e, t) {
		e.className = [...new Set(Yi(e.className, t).split(/\s+/).filter(Boolean))].join(" ");
	}
	copyStyleProperties(e, t, n = null) {
		if (!e) return t;
		t ??= {}, n ??= Object.getOwnPropertyNames(e);
		for (var r of n) e.hasOwnProperty(r) && !t.hasOwnProperty(r) && (t[r] = e[r]);
		return t;
	}
	createPageElement(e, t, n) {
		let r = { ...n }, i = null, a = null;
		if (t) {
			if (t.pageMargins && (r.paddingLeft = this.addSize(t.pageMargins.left, t.pageMargins.gutter), r.paddingRight = t.pageMargins.right, r.paddingTop = t.pageMargins.top, r.paddingBottom = t.pageMargins.bottom), t.pageSize) {
				let e = t.pageSize.width, n = t.pageSize.height;
				if (t.pageSize.orientation == "landscape") {
					let t = this.parseCssLengthValue(e), r = this.parseCssLengthValue(n);
					t != null && r != null && t < r && ([e, n] = [n, e]);
				}
				i = e, a = n, this.options.ignoreWidth || (r.width = e), this.options.ignoreHeight && this.options.breakPages || (r.minHeight = n, !this.options.ignoreHeight && this.options.breakPages && this.options.fixedPageHeight && (r.height = n));
			}
			t.pageBorders && (this.applyPageBorder(r, "top", t.pageBorders.top), this.applyPageBorder(r, "right", t.pageBorders.right), this.applyPageBorder(r, "bottom", t.pageBorders.bottom), this.applyPageBorder(r, "left", t.pageBorders.left));
		}
		let o = this.h({
			tagName: "section",
			className: e,
			style: r
		});
		return r.paddingLeft && this.setCssStyle(o, "--docx-page-padding-left", r.paddingLeft), r.paddingTop && this.setCssStyle(o, "--docx-page-padding-top", r.paddingTop), i && this.setCssStyle(o, "--docx-page-width", i), a && this.setCssStyle(o, "--docx-page-height", a), o;
	}
	addSize(e, t) {
		return e ? !t || t == "0.00pt" || t == "0px" ? e : `calc(${e} + ${t})` : t;
	}
	parseCssLengthValue(e) {
		if (!e) return null;
		let t = /^(-?\d+(?:\.\d+)?)/.exec(e);
		return t ? parseFloat(t[1]) : null;
	}
	applyPageBorder(e, t, n) {
		if (!n) return;
		let r = this.borderTypeToCss(n.type);
		e[`border-${t}`] = r == "none" ? "none" : `${n.size ?? "1px"} ${r} ${this.borderColor(n.color)}`;
	}
	borderTypeToCss(e) {
		switch (e) {
			case "nil":
			case "none": return "none";
			case "double":
			case "triple": return "double";
			case "dashed":
			case "dashSmallGap": return "dashed";
			case "dotted":
			case "dotDash":
			case "dotDotDash": return "dotted";
		}
		return "solid";
	}
	borderColor(e) {
		return !e || e == "auto" ? "var(--docx-auto-color, black)" : /^[0-9a-f]{6}$/i.test(e) ? `#${e}` : e;
	}
	createSectionContent(e) {
		let t = {}, n = e.columns?.numberOfColumns ?? e.columns?.columns?.length, r = e.docGrid?.type == "linesAndChars" || e.docGrid?.type == "snapToChars";
		return e.docGrid && (e.docGrid.linePitch && (t["--docx-doc-grid-line-pitch"] = e.docGrid.linePitch), r && e.docGrid.charSpace && (t.letterSpacing = e.docGrid.charSpace)), this.document.settingsPart?.settings?.kinsoku && (t.lineBreak = "strict", t.wordBreak = "keep-all"), this.document.settingsPart?.settings?.overflowPunctuation && (t.hangingPunctuation = "allow-end"), this.document.settingsPart?.settings?.topLinePunctuation && (t["text-spacing-trim"] = "space-start"), (this.document.settingsPart?.settings?.autoSpaceDE || this.document.settingsPart?.settings?.autoSpaceDN) && (t["text-autospace"] = [this.document.settingsPart?.settings?.autoSpaceDE ? "ideograph-alpha" : null, this.document.settingsPart?.settings?.autoSpaceDN ? "ideograph-numeric" : null].filter(Boolean).join(" ")), e.columns && n && (n > 1 || e.columns.columns?.length > 0) && (t.columnCount = `${n}`, t.columnGap = e.columns.space, !e.columns.equalWidth && e.columns.columns?.length > 0 && (t.columnWidth = e.columns.columns[0].width, t.columnGap = e.columns.columns[0].space ?? t.columnGap), e.columns.separator && (t.columnRule = "1px solid black")), this.h({
			tagName: "article",
			style: t
		});
	}
	async renderSections(e) {
		let t = [];
		this.processElement(e), this.collectDocumentMetadata(e);
		let n = this.splitBySection(this.reviewParagraphs(e.children), e.props);
		this.resolveSectionHeaderFooterReferences(n);
		let r = this.groupByPageBreaks(n);
		if (e.backgroundImage) {
			let t = await this.document.loadDocumentImage(e.backgroundImage.id, this.document.documentPart, this.options.externalResourcePolicy).catch(() => null);
			t && (e = {
				...e,
				cssStyle: {
					...e.cssStyle,
					"background-image": `url(${JSON.stringify(t)})`,
					"background-repeat": e.backgroundImage.type == "tile" ? "repeat" : "no-repeat",
					"background-position": "center",
					"background-size": e.backgroundImage.type == "tile" ? "auto" : "100% 100%"
				}
			});
		}
		let i = null, a = 0, o = 0, s = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map(), d = (e) => {
			if (!l.has(e)) {
				let t = ++o;
				l.set(e, `${this.className}-section-${t}`), u.set(e, t);
			}
		};
		for (let e of r) {
			let t = e[0].sectProps;
			d(t), s.set(t, (s.get(t) ?? 0) + 1);
		}
		this.totalPages = r.length;
		for (let n = 0, o = r.length; n < o; n++) {
			this.currentFootnoteIds = [], this.notePageIndex = n + 1;
			let p = r[n][0].sectProps, m = p;
			d(p);
			let h = i != p;
			a = h && p?.pageNumber?.start != null ? p.pageNumber.start : a + 1, this.currentPageNumber = a, this.currentSectionNumber = u.get(p) ?? 1, this.currentSectionProps = p, this.currentSectionPageNumber = (c.get(p) ?? 0) + 1, this.sectionPageCount = s.get(p) ?? 1, c.set(p, this.currentSectionPageNumber);
			let g = this.createPageElement(this.className, p, e.cssStyle);
			g.dataset.docxSection = l.get(p), g.dataset.docxSectionNumber = `${this.currentSectionNumber}`, g.dataset.docxSectionPageNumber = `${this.currentSectionPageNumber}`, g.dataset.docxSectionPageCount = `${this.sectionPageCount}`, g.dataset.docxPageNumber = `${a}`, h && p?.pageNumber?.start != null && (g.dataset.docxPageStart = `${p.pageNumber.start}`), this.options.renderHeaders && this.renderHeaderFooter(p.headerRefs, p, a, h, g);
			for (let e of r[n]) {
				this.currentSectionProps = e.sectProps;
				var f = this.createSectionContent(e.sectProps);
				e.columnBreak && (f.style.breakBefore = "column"), this.renderElements(e.elements, f), g.appendChild(f), p = e.sectProps;
			}
			if (this.options.renderFootnotes) {
				let e = this.renderNotes(this.currentFootnoteIds, this.footnoteMap, this.document.footnotesPart, "footnote");
				e && g.appendChild(e);
			}
			if (this.options.renderEndnotes && n == o - 1) {
				let e = this.renderNotes(this.currentEndnoteIds, this.endnoteMap, this.document.endnotesPart, "endnote");
				e && g.appendChild(e);
			}
			this.currentSectionProps = p, this.options.renderFooters && this.renderHeaderFooter(p.footerRefs, p, a, h, g), this.pageHeaderFooterState.set(g, {
				headerProps: m,
				footerProps: p,
				headerId: this.selectHeaderFooterReference(m.headerRefs, m, a, h)?.id,
				footerId: this.selectHeaderFooterReference(p.footerRefs, p, a, h)?.id
			}), t.push(g), await this.yieldDuringRender(n + 1, o), i = p;
		}
		return t;
	}
	resolveSectionHeaderFooterReferences(e) {
		let t = /* @__PURE__ */ new Map(), n = null, r = (e, t) => {
			let n = new Map((t ?? []).map((e) => [e.type, e]));
			for (let t of e ?? []) n.set(t.type, t);
			return Array.from(n.values());
		};
		for (let i of e) {
			let e = i.sectProps, a = t.get(e);
			a || (a = {
				...e,
				headerRefs: r(e.headerRefs, n?.headerRefs),
				footerRefs: r(e.footerRefs, n?.footerRefs)
			}, t.set(e, a), n = a), i.sectProps = a;
		}
	}
	selectHeaderFooterReference(e, t, n, r) {
		let i = !!this.document.settingsPart?.settings?.evenAndOddHeaders, a = t.titlePage && r ? "first" : i && n % 2 == 0 ? "even" : "default";
		return e?.find((e) => e.type == a);
	}
	renderHeaderFooter(e, t, n, r, i) {
		let a = this.selectHeaderFooterReference(e, t, n, r);
		var o = a && this.document.findPartByRelId(a.id, this.document.documentPart);
		if (o?.rootElement) {
			this.currentPart = o;
			let e = this.headerFooterModels.get(o.path);
			e || (e = this.cloneRenderData(o.rootElement), this.processElement(e), this.headerFooterModels.set(o.path, e));
			let [n] = this.renderElements([e], i);
			t?.pageMargins && (o.rootElement.type === R.Header ? (n.style.marginTop = `calc(${t.pageMargins.header} - ${t.pageMargins.top})`, n.style.minHeight = `calc(${t.pageMargins.top} - ${t.pageMargins.header})`) : o.rootElement.type === R.Footer && (n.style.marginBottom = `calc(${t.pageMargins.footer} - ${t.pageMargins.bottom})`, n.style.minHeight = `calc(${t.pageMargins.bottom} - ${t.pageMargins.footer})`)), this.currentPart = null;
		} else o && this.options.debug && console.warn(`docx-preview: skipping ${o.path} because its parsed root element is missing`);
	}
	isPageBreakElement(e) {
		return e.type == R.Break ? e.break == "lastRenderedPageBreak" ? !this.options.ignoreLastRenderedPageBreak : e.break == "page" : !1;
	}
	isPageBreakSection(e, t) {
		return !e || !t ? !1 : e.pageSize?.orientation != t.pageSize?.orientation || e.pageSize?.width != t.pageSize?.width || e.pageSize?.height != t.pageSize?.height;
	}
	splitBySection(e, t) {
		this.options.breakPages && !this.options.ignoreLastRenderedPageBreak && (e = Aa(e, (e) => this.isHiddenRevisionForPagination(e)));
		let n = {
			sectProps: null,
			elements: [],
			pageBreak: !1,
			columnBreak: !1,
			startsAfterExplicitPageBreak: !1
		}, r = [n], i = (e = !1, t = !1, i = !1) => {
			n.elements.length == 0 && n.sectProps == null ? (n.pageBreak || (n.pageBreak = e), n.columnBreak || (n.columnBreak = t)) : (n.pageBreak || (n.pageBreak = e), n.columnBreak || (n.columnBreak = t), n = {
				sectProps: null,
				elements: [],
				pageBreak: !1,
				columnBreak: !1,
				startsAfterExplicitPageBreak: i
			}, r.push(n));
		};
		for (let t of e) {
			if (t.type != R.Paragraph) {
				if (t.type == R.Table) for (let e of this.splitTableByPageBreaks(t)) e.table.children?.length && n.elements.push(e.table), e.breakAfter && i(!0, !1, !0);
				else n.elements.push(t);
				continue;
			}
			let e = t, r = this.findStyle(e.styleName), a = e.pageBreakBefore ?? r?.paragraphProps?.pageBreakBefore;
			this.options.breakPages && a && n.elements.length > 0 && i(!0, !1, !0);
			let o = this.splitParagraphByPageBreaks(e);
			for (let e of o) {
				n.elements.push(e.paragraph);
				let t = e.paragraph.sectionProps;
				t && (n.sectProps = t), (e.breakAfter || t) && (n.endsWithExplicitPageBreak || (n.endsWithExplicitPageBreak = e.explicitPageBreak === !0), i(e.breakAfter || t && Le(t.type), t && Re(t.type), e.explicitPageBreak === !0));
			}
		}
		if (r = r.filter((e) => e.elements.length > 0), r.length == 0) return [{
			sectProps: t,
			elements: [],
			pageBreak: !1,
			columnBreak: !1
		}];
		let a = null;
		for (let e = r.length - 1; e >= 0; e--) r[e].sectProps == null ? r[e].sectProps = a ?? t : a = r[e].sectProps;
		return r;
	}
	hasPageBreakElement(e) {
		return this.isHiddenRevisionForPagination(e) ? !1 : this.isPageBreakElement(e) ? !0 : e.children?.some((e) => this.hasPageBreakElement(e)) ?? !1;
	}
	splitTableByPageBreaks(e) {
		if (!this.options.breakPages || !e.children?.length || !e.children.some((e) => this.hasPageBreakElement(e))) return [{
			table: e,
			breakAfter: !1
		}];
		let t = e.children, n = [];
		for (let e of t) {
			if (!e.isHeader) break;
			n.push(e);
		}
		let r = [], i = [], a = (t) => {
			if (i.length == 0 && r.length > 0) return;
			let a = r.length > 0, o = i;
			a && n.length > 0 && !i.some((e) => e.isHeader) && (o = [...n.map((e) => {
				let t = { ...e };
				return this.repeatedTableHeaderRows.add(t), t;
			}), ...i]), r.push({
				table: {
					...e,
					children: o
				},
				breakAfter: t
			}), i = [];
		};
		for (let e of t) i.push(e), this.hasPageBreakElement(e) && a(!0);
		return a(!1), r.length > 0 ? r : [{
			table: e,
			breakAfter: !1
		}];
	}
	isHiddenRevisionForPagination(e) {
		let t = $(this.options), n = t === "all" && this.options.reviewPresentation === "inline";
		return e.type === R.Deleted && !Qi(t) && !n || e.type === R.Inserted && !Zi(t);
	}
	hasOnlyHiddenRevisionTail(e) {
		let t = !1, n = (e) => this.isHiddenRevisionForPagination(e) ? (t = !0, !0) : e.type === R.BookmarkStart || e.type === R.BookmarkEnd ? !0 : [
			R.Run,
			R.Hyperlink,
			R.Inserted,
			R.Deleted
		].includes(e.type) && e.children?.length > 0 ? e.children.every(n) : !1;
		return e.every(n) && t;
	}
	splitElementByPageBreaks(e) {
		if (this.isHiddenRevisionForPagination(e)) return [{ element: e }];
		if (this.isPageBreakElement(e)) return [{
			breakAfter: !0,
			explicitPageBreak: e.break === "page"
		}];
		if (!e.children?.length) return [{ element: e }];
		let t = [], n = {
			...e,
			children: []
		}, r = () => {
			n.children.length > 0 && t.push({ element: n }), n = {
				...e,
				children: []
			};
		};
		for (let i of e.children) for (let e of this.splitElementByPageBreaks(i)) e.element && n.children.push(e.element), e.breakAfter && (r(), t.push({
			breakAfter: !0,
			explicitPageBreak: e.explicitPageBreak
		}));
		return r(), t.length > 0 ? t : [{ element: e }];
	}
	splitParagraphByPageBreaks(e) {
		if (!this.options.breakPages || !e.children?.length) return [{
			paragraph: e,
			breakAfter: !1
		}];
		let t = [], n = {
			...e,
			children: []
		}, r = (r, i = !1) => {
			(n.children.length > 0 || t.length == 0 || i) && t.push({
				paragraph: n,
				breakAfter: r,
				explicitPageBreak: i
			}), n = {
				...e,
				sectionProps: null,
				children: []
			};
		};
		for (let t of e.children) for (let e of this.splitElementByPageBreaks(t)) e.element && n.children.push(e.element), e.breakAfter && r(!0, e.explicitPageBreak === !0);
		t.length > 0 && this.hasOnlyHiddenRevisionTail(n.children) ? t[t.length - 1].paragraph.children.push(...n.children) : (n.children.length > 0 || t.length == 0) && t.push({
			paragraph: n,
			breakAfter: !1
		});
		let i = t[t.length - 1]?.paragraph;
		for (let n of t) n.paragraph.sectionProps = n.paragraph === i ? e.sectionProps : null;
		if (e.props?.anchorId && t.length > 1) {
			let e = t.find((e) => this.extractText(e.paragraph).trim()) ?? t[0];
			for (let n of t) n !== e && (n.paragraph.props = {
				...n.paragraph.props,
				anchorId: void 0
			});
		}
		return t;
	}
	styleValuesForTarget(e, t) {
		return e?.styles?.find((e) => e.target == t)?.values;
	}
	styleValue(e, t, n) {
		return this.styleValuesForTarget(e, t)?.[n];
	}
	effectiveParagraphCssValue(e, t, n) {
		return e.cssStyle?.[n] ?? this.styleValue(t, "p", n);
	}
	textBoxAutospace(e, t, n = (e) => typeof CSS > "u" || typeof CSS.supports != "function" || CSS.supports("text-autospace", e)) {
		let r = (n) => !/^(0|false|off)$/i.test(this.effectiveParagraphCssValue(e, t, n) ?? "true"), i = r("--docx-auto-space-de"), a = r("--docx-auto-space-dn"), o = i && a ? "normal" : i ? "ideograph-alpha" : a ? "ideograph-numeric" : "no-autospace";
		return n(o) ? o : "no-autospace";
	}
	applyTextBoxFontInheritance(e, t, n) {
		if (!this.compatibleTextBoxSpacing) return;
		let r = e.type == R.Paragraph ? e : this.currentParagraph, i = this.findStyle(r?.styleName), a = this.document.stylesPart?.styles?.find((e) => e.id == null), o = [
			e.cssStyle,
			this.styleValuesForTarget(t, e.type == R.Paragraph ? "p" : "span"),
			r?.cssStyle,
			this.styleValuesForTarget(i, "span"),
			this.styleValuesForTarget(a, "span")
		], s = (e) => o.find((t) => t?.[e] != null)?.[e];
		if (s("--docx-partial-eastasia-font") != "true") return;
		let c = s("--docx-latin-font-family"), l = s("font-family");
		c && l && (this.setCssStyle(n, "--docx-latin-font-family", c), this.setCssStyle(n, "font-family", `var(--docx-latin-font-family), ${l}`));
	}
	isInsideTableCell(e) {
		for (let t = e.parent; t; t = t.parent) if (t.type == R.Cell) return !0;
		return !1;
	}
	paragraphUsesDocumentGrid(e, t) {
		if (!this.currentSectionProps?.docGrid?.linePitch || this.isInsideTableCell(e) && !this.document.settingsPart?.settings?.adjustLineHeightInTable) return !1;
		let n = this.effectiveParagraphCssValue(e, t, "--docx-snap-to-grid");
		return n == null || !/^(0|false|off)$/i.test(n);
	}
	setCssStyle(e, t, n) {
		let r = e.style;
		typeof r.setProperty == "function" ? r.setProperty(t, n) : r[t] = n;
	}
	applyDocumentGridMinimumHeight(e, t, n, r) {
		let i = this.effectiveParagraphCssValue(e, t, "min-height");
		this.setCssStyle(n, "min-height", i ? `max(${i}, ${r})` : r);
	}
	applyDocumentGridLinePitch(e, t, n) {
		if (!this.paragraphUsesDocumentGrid(e, t)) return;
		let r = this.currentSectionProps.docGrid.linePitch, i = this.effectiveParagraphCssValue(e, t, "line-height"), a = e.lineSpacing ?? t?.paragraphProps?.lineSpacing;
		if (i) {
			if (a?.lineRule == "exact" || a?.lineRule == "exactly") return;
			let o = /^-?\d+(?:\.\d+)?$/.test(i) ? `calc(${i} * 1em)` : i;
			this.preserveGridInlineMetrics(n), this.setCssStyle(n, "line-height", `max(${o}, ${r})`), this.applyDocumentGridMinimumHeight(e, t, n, r);
		} else this.applyDocumentGridMinimumHeight(e, t, n, r);
	}
	preserveGridInlineMetrics(e) {
		let t = /^(span|a|sub|sup|b|i|u|s|strike|strong|em)$/, n = (e) => {
			for (let r of Array.from(e.children ?? [])) {
				if (r.namespaceURI !== Q.html || !t.test(r.localName) || !r.style) continue;
				let e = r.style;
				r.dataset?.docxTextScale && e.display === "block" ? n(r) : e.lineHeight || e.display && e.display !== "inline" || /^(absolute|fixed)$/.test(e.position) || e.cssFloat && e.cssFloat !== "none" || (e.lineHeight = "normal", n(r));
			}
		};
		n(e);
	}
	groupByPageBreaks(e) {
		let t = [], n = null, r = [t];
		for (let i of e) n && (n.pageBreak || this.isPageBreakSection(n.sectProps, i.sectProps)) && (t = [], r.push(t)), t.push(i), n = i;
		let i = r.filter((e) => e.length > 0).filter((e) => e[0]?.startsAfterExplicitPageBreak || e.some((e) => e.endsWithExplicitPageBreak || e.elements.some((e) => this.hasPageModelContent(e))));
		return i.length > 0 ? i : r.filter((e) => e.length > 0).slice(0, 1);
	}
	hasPageModelContent(e) {
		if (!e || this.isHiddenRevisionForPagination(e)) return !1;
		switch (e.type) {
			case R.Text:
			case R.DeletedText: return !!e.text?.trim();
			case R.Break:
			case R.Symbol:
			case R.Drawing:
			case R.Image:
			case R.Table:
			case R.VmlPicture:
			case R.VmlElement:
			case R.MmlMath:
			case R.MmlMathParagraph:
			case R.Shape:
			case R.Chart:
			case R.SmartArt:
			case R.Ink:
			case R.AltChunk:
			case R.FootnoteReference:
			case R.EndnoteReference: return !0;
		}
		return e.children?.some((e) => this.hasPageModelContent(e)) ?? !1;
	}
	async yieldDuringRender(e, t) {
		let n = this.options.renderPageBatchSize ?? 0;
		this.options.progress && this.options.progress({
			phase: "render",
			current: e,
			total: t,
			message: `Rendered ${e}/${t} logical pages`
		}), n > 0 && e % n == 0 && await this.yieldToBrowser();
	}
	async yieldToBrowser() {
		(this.options.renderYieldEveryMs ?? 0) <= 0 || await new Promise((e) => {
			let t = globalThis;
			typeof t.requestIdleCallback == "function" ? t.requestIdleCallback(() => e(), { timeout: Math.max(1, this.options.renderYieldEveryMs ?? 16) }) : typeof t.requestAnimationFrame == "function" ? t.requestAnimationFrame(() => e()) : setTimeout(e, 0);
		});
	}
	renderWrapper(e) {
		let t = this.h({
			tagName: "div",
			className: this.className + "-wrapper",
			children: e
		});
		return Xi(this.options) && (t.dataset.docxReviewEnabled = "true", t.dataset.docxReviewMode = $(this.options), t.dataset.docxReviewPresentation = this.options.reviewPresentation ?? "balloon"), t;
	}
	shouldRunDynamicPagination() {
		return !!(this.options.breakPages && this.options.fixedPageHeight && !this.options.ignoreHeight && typeof document < "u" && typeof requestAnimationFrame == "function");
	}
	scheduleDynamicPagination(e, t = l(e)) {
		e?.isConnected && t.isCurrent() && e.dataset.docxPaginated != "true" && e.dataset.docxPaginating != "true" && e.dataset.docxPaginationScheduled != "true" && (e.dataset.docxPaginationScheduled = "true", delete e.dataset.docxLayoutError, u(e, this.tasks, t).then(async () => {
			await this.yieldToBrowser(), e.isConnected && t.isCurrent() && await this.performDynamicPagination(e, t);
		}).catch((n) => {
			delete e.dataset.docxPaginating, e.isConnected && t.isCurrent() && (e.dataset.docxLayoutError = n?.message ?? "DOCX layout failed");
		}).finally(() => {
			delete e.dataset.docxPaginationScheduled, e.isConnected || delete e.dataset.docxPaginating;
		}));
	}
	async performDynamicPagination(e, t = s(e)) {
		if (!e || e.dataset.docxPaginated == "true" || e.dataset.docxPaginating == "true" || !e.isConnected || !t.isCurrent()) return;
		if (delete e.dataset.docxPaginationScheduled, e.dataset.docxPaginating = "true", this.syncDynamicNotes(e), await this.prepareLayout(e, t), !e.isConnected || !t.isCurrent()) {
			delete e.dataset.docxPaginating;
			return;
		}
		let n = Array.from(e.querySelectorAll(":scope > section." + this.className)), r = this.options.maxDynamicPaginationPasses ?? 1e3, i = 0;
		for (let a = 0; a < n.length; a++) {
			let o = n[a];
			if (a % 2 == 0 && await this.yieldToBrowser(), !e.isConnected || !t.isCurrent()) {
				delete e.dataset.docxPaginating;
				return;
			}
			for (; this.isPageOverflowing(o) && i++ < r;) {
				let r = Array.from(o.querySelectorAll(":scope > article"));
				if (!r.some((e) => e.children.length > 0) && !o.querySelector(":scope > [data-docx-note-list] > li")) break;
				let i = this.createContinuationPage(o);
				if (await this.refreshDynamicHeaderFooters([
					...n.slice(0, a + 1),
					i,
					...n.slice(a + 1)
				]), !e.isConnected || !t.isCurrent()) {
					delete e.dataset.docxPaginating;
					return;
				}
				let s = Array.from(i.querySelectorAll(":scope > article")), c = this.splitDynamicNotes(o, i);
				for (let n = r.length - 1; n >= 0 && this.isPageOverflowing(o); n--) {
					let i = r[n], a = s[n], l = 0;
					if (a) {
						for (; this.isPageOverflowing(o) && i.lastElementChild && l++ < 500;) {
							if (l % 20 == 0 && await this.yieldToBrowser(), !e.isConnected || !t.isCurrent()) {
								delete e.dataset.docxPaginating;
								return;
							}
							if (i.children.length > 1) {
								if (this.moveOverflowingTail(i, o, a)) {
									c = !0;
									continue;
								}
								let e = this.pickPaginationChunk(i);
								if (e.length == 0) break;
								if (e.length >= i.children.length) {
									if (this.splitOverflowBlock(i.lastElementChild, o, a)) {
										c = !0;
										continue;
									}
									e = [i.lastElementChild];
								}
								for (let t = e.length - 1; t >= 0; t--) a.prepend(e[t]), c = !0;
							} else {
								if (!this.splitOverflowBlock(i.lastElementChild, o, a)) break;
								c = !0;
							}
						}
						if (n > 0 && this.isPageOverflowing(o)) for (; i.lastElementChild;) a.prepend(i.lastElementChild), c = !0;
					}
				}
				if (c ||= Array.from(i.children).some((e) => e.dataset.docxNoteList && e.children.length > 0), !c) {
					if (i.remove(), this.syncDynamicNotes(e), await this.refreshDynamicHeaderFooters(n), !e.isConnected || !t.isCurrent()) {
						delete e.dataset.docxPaginating;
						return;
					}
					break;
				}
				this.refreshTabStops(e), this.refreshAnchors(e), n.splice(a + 1, 0, i);
			}
		}
		if (i >= r && n.some((e) => this.isPageOverflowing(e))) throw Error("DOCX pagination exceeded the configured pass budget");
		this.cleanupEmptyNumberedParagraphs(e), this.removeEmptyDynamicPages(e), t.acceptLayoutChanges?.(e), this.syncDynamicNotes(e), await this.refreshDynamicHeaderFooters(Array.from(e.querySelectorAll(":scope > section." + this.className))), !e.isConnected || !t.isCurrent() ? delete e.dataset.docxPaginating : (this.updateDynamicFieldPages(e), this.refreshTabStops(e), this.refreshAnchors(e), this.assertDynamicNotesFit(e), delete e.dataset.docxPaginating, e.dataset.docxPaginated = "true");
	}
	moveOverflowingTail(e, t, n) {
		let r = e.ownerDocument?.defaultView;
		if (!r || e.children.length < 3) return !1;
		let i = r.getComputedStyle(e);
		if (i.display !== "block" || !["auto", "1"].includes(i.columnCount) || i.columnWidth !== "auto" || i.writingMode !== "horizontal-tb") return !1;
		let a = Array.from(e.children), o = this.getPageBodyBottom(t) + (this.options.paginationTolerance ?? 2), s = a.length;
		for (; s > 1;) {
			let e = s - 1;
			for (; e > 0 && this.isKeepWithNext(a[e - 1]);) e--;
			if (e === 0) break;
			let t = !0;
			for (let n = e; n < s; n++) {
				let e = a[n], i = r.getComputedStyle(e), s = e.getBoundingClientRect();
				if (!/^(P|TABLE)$/.test(e.tagName) || ![
					"block",
					"table",
					"list-item"
				].includes(i.display) || i.position !== "static" || i.cssFloat !== "none" || i.transform !== "none" || i.clear !== "none" || i.writingMode !== "horizontal-tb" || !(parseFloat(i.marginTop) >= 0 && parseFloat(i.marginBottom) >= 0) || !(s.top > o && s.bottom > s.top) || e.querySelector("[data-docx-float]")) {
					t = !1;
					break;
				}
			}
			if (!t) break;
			s = e;
		}
		if (a.length - s < 2) return !1;
		let c = e.ownerDocument.createDocumentFragment();
		for (let e = s; e < a.length; e++) c.appendChild(a[e]);
		return n.prepend(c), !0;
	}
	pickPaginationChunk(e) {
		let t = Array.from(e.children);
		if (t.length == 0) return [];
		let n = t.length - 1;
		for (; n > 0 && this.isKeepWithNext(t[n - 1]);) n--;
		return t.slice(n);
	}
	isKeepWithNext(e) {
		if (e.dataset.docxKeepNext == "true") return !0;
		let t = getComputedStyle(e);
		return t.breakAfter == "avoid" || t.pageBreakAfter == "avoid";
	}
	isPageOverflowing(e) {
		e.parentElement && this.syncDynamicNotes(e.parentElement), this.refreshTabStops(e);
		let t = this.options.paginationTolerance ?? 2;
		if (e.clientHeight <= 0) return !1;
		let n = e.getBoundingClientRect(), r = this.getPageBodyBottom(e), i = n.top;
		for (let n of Array.from(e.children)) {
			let e = n.getBoundingClientRect();
			if (i = Math.max(i, e.bottom), n.tagName.toLowerCase() == "article") {
				if (e.bottom > r + t) return !0;
				for (let e of Array.from(n.children)) {
					let n = e.getBoundingClientRect();
					if (i = Math.max(i, n.bottom), n.bottom > r + t) return !0;
				}
			}
		}
		let a = this.getPageNoteBottom(e);
		return Array.from(e.querySelectorAll(":scope > [data-docx-note-list]")).some((e) => Array.from(e.querySelectorAll("*")).some((e) => e.getBoundingClientRect().bottom > a + t)) || i > n.bottom + t;
	}
	createContinuationPage(e, t = !0) {
		let n = e.cloneNode(!1);
		n.dataset.docxDynamicPage = "true", n.removeAttribute("id"), delete n.dataset.docxPageStart;
		let r = this.pageHeaderFooterState.get(e);
		r && this.pageHeaderFooterState.set(n, { ...r });
		for (let t of Array.from(e.childNodes)) {
			if (t.nodeType === 1 && t.dataset.docxNoteList) continue;
			let e = t.nodeType === 1 && t.localName === "article";
			n.appendChild(t.cloneNode(!e));
		}
		return t && e.after(n), n;
	}
	syncDynamicNotes(e) {
		let t = this.dynamicNoteState.get(e);
		if (!t) {
			t = {
				references: Array.from(e.querySelectorAll("article [data-docx-note-reference]")),
				items: [],
				fragments: /* @__PURE__ */ new Map(),
				owners: /* @__PURE__ */ new Map(),
				text: /* @__PURE__ */ new Map(),
				fields: /* @__PURE__ */ new Map()
			};
			let n = /* @__PURE__ */ new Map();
			for (let r of Array.from(e.querySelectorAll("[data-docx-note-list] > li[data-docx-note-id]"))) {
				let e = `${r.dataset.docxNoteKind}:${r.dataset.docxNoteId}`, i = n.get(e);
				i || (n.set(e, i = r), t.items.push(i), t.fragments.set(i, []), t.fields.set(i, []));
				let a = t.fragments.get(i);
				r.dataset.docxNoteFragment = `${a.length}`, a.push(r), t.fields.get(i).push(...Array.from(r.querySelectorAll("[data-docx-field-instr]"))), t.text.set(i, (t.text.get(i) ?? "") + this.noteTextSignature(r, t.fields.get(i)));
			}
			this.dynamicNoteState.set(e, t);
		}
		if (t.items.length === 0) return;
		let n = Array.from(e.querySelectorAll(`:scope > section.${this.className}`));
		if (n.length === 0) return;
		let r = new Set(n), i = (e) => {
			for (; e && !r.has(e);) e = e.parentElement;
			return e;
		}, a = /* @__PURE__ */ new Map();
		for (let e of t.references) {
			if (e.dataset.docxNoteHidden === "true") continue;
			let t = `${e.dataset.docxNoteReference}:${e.dataset.docxNoteId}`;
			if (a.has(t)) continue;
			let n = i(e);
			n && a.set(t, n);
		}
		let o = n.slice().reverse().find((e) => e.querySelector(":scope > [data-docx-note-list=\"footnote\"] > li") || Array.from(e.querySelectorAll(":scope > article > *")).some((e) => this.hasVisiblePaginationContent(e))) ?? n[0], s = /* @__PURE__ */ new Map();
		for (let e of t.items) {
			let c = e.dataset.docxNoteKind, l = t.owners.get(e), u = c === "endnote" ? r.has(l) && n.indexOf(l) >= n.indexOf(o) ? l : o : a.get(`${c}:${e.dataset.docxNoteId}`);
			if (!u) {
				e.dataset.docxNoteOwnershipError = "missing-reference";
				continue;
			}
			delete e.dataset.docxNoteOwnershipError;
			let d = t.fragments.get(e);
			if (l && l !== u || d.some((e) => !i(e))) {
				for (let t of d.slice(1)) this.mergeNoteContents(e, t), t.remove();
				d.splice(1);
			}
			t.owners.set(e, u);
			for (let e = 0; e < d.length; e++) {
				let t = d[e];
				t.dataset.docxNoteFragment = `${e}`;
				let n = e === 0 ? u : i(t), r = s.get(n);
				r || s.set(n, r = /* @__PURE__ */ new Map());
				let a = r.get(c);
				a || r.set(c, a = []), a.push(t);
			}
		}
		for (let [e, t] of s) for (let n of ["footnote", "endnote"]) {
			let r = t.get(n);
			if (!r) continue;
			let i = this.getOrCreateNoteList(e, n);
			for (let e = 0; e < r.length; e++) i.children[e] !== r[e] && i.insertBefore(r[e], i.children[e] ?? null);
		}
		for (let e of n) for (let t of Array.from(e.children)) t.dataset.docxNoteList && t.children.length === 0 && t.remove();
	}
	getOrCreateNoteList(e, t) {
		let n = Array.from(e.children).find((e) => e.dataset.docxNoteList === t);
		if (!n) {
			n = this.h({ tagName: "ol" }), n.dataset.docxNoteList = t;
			let r = Array.from(e.children).find((e) => e.localName === "footer" || t === "footnote" && e.dataset.docxNoteList === "endnote");
			e.insertBefore(n, r ?? null);
		}
		return n;
	}
	mergeNoteContents(e, t) {
		let n = (e) => {
			for (; this.noteContinuationOrigins.has(e);) e = this.noteContinuationOrigins.get(e);
			return e;
		};
		for (let r of Array.from(t.childNodes)) {
			let t = e.lastChild;
			r.nodeType === 1 && t?.nodeType === 1 && n(r) === n(t) ? (this.mergeNoteContents(t, r), r.id && !t.id && (t.id = r.id), r.remove()) : r.nodeType === 1 && r.dataset.docxNoteColumns === "true" ? r.remove() : e.appendChild(r);
		}
	}
	getPageNoteBottom(e) {
		let t = e.getBoundingClientRect(), n = e.ownerDocument?.defaultView;
		if (!n) return t.bottom;
		let r = n.getComputedStyle(e), i = (e) => Number.parseFloat(e) || 0, a = t.bottom - i(r.borderBottomWidth) - i(r.paddingBottom), o = Array.from(e.children).find((e) => e.localName === "footer");
		if (!o) return a;
		let s = n.getComputedStyle(o), c = o.getBoundingClientRect(), l = c.height + i(s.marginTop) + i(s.marginBottom);
		return Math.min(a, a - l, c.top - i(s.marginTop));
	}
	getPageBodyBottom(e) {
		let t = Array.from(e.children).filter((e) => e.dataset.docxNoteList), n = e.ownerDocument?.defaultView;
		if (!n) return e.getBoundingClientRect().bottom;
		let r = this.getPageNoteBottom(e);
		for (let e of t) {
			let t = e.getBoundingClientRect(), i = n.getComputedStyle(e), a = t.bottom;
			for (let t of Array.from(e.querySelectorAll("*"))) a = Math.max(a, t.getBoundingClientRect().bottom);
			r -= Math.max(t.height, a - t.top) + (Number.parseFloat(i.marginTop) || 0) + (Number.parseFloat(i.marginBottom) || 0);
		}
		return r;
	}
	getMinimumNoteBodyBottom(e) {
		let t = (e.ownerDocument?.defaultView)?.getComputedStyle(e), n = e.getBoundingClientRect().top + (parseFloat(t?.paddingTop) || 0) + (parseFloat(t?.borderTopWidth) || 0), r = e.querySelector(":scope > header");
		r && (n = Math.max(n, r.getBoundingClientRect().bottom));
		let i = Array.from(e.querySelectorAll(":scope > article > *")).find((e) => this.hasVisiblePaginationContent(e));
		if (!i) return n;
		let a = i.getBoundingClientRect();
		if (i.localName === "table") {
			let e = this.tableContentRows(i)[0];
			if (e) return Math.max(n, e.getBoundingClientRect().bottom, ...Array.from(e.cells, (e) => e.getBoundingClientRect().bottom));
		}
		if (i.localName !== "p" || i.dataset.docxKeepLines === "true") return Math.max(n, a.bottom);
		let o = [], s = e.ownerDocument.createTreeWalker(i, NodeFilter.SHOW_TEXT);
		for (; s.nextNode();) {
			let t = e.ownerDocument.createRange();
			t.selectNodeContents(s.currentNode);
			for (let e of Array.from(t.getClientRects())) e.height > 0 && e.width > 0 && o.push(e);
		}
		o.sort((e, t) => e.top - t.top);
		let c = o.find((e) => e.top > (o[0]?.top ?? Infinity) + 2);
		return Math.max(n, c ? a.top + c.top - o[0].top : a.bottom);
	}
	moveEndnotesAfterBody(e, t) {
		let n = this.dynamicNoteState.get(e.parentElement);
		if (!n || !e.querySelector(":scope > article > *") || !this.isPageOverflowing(e)) return !1;
		let r = Array.from(e.querySelectorAll(":scope > [data-docx-note-list=\"endnote\"] > li"));
		if (!r.length || r.some((e) => n.fragments.get(e)?.length !== 1)) return !1;
		let i = r[0].parentElement, a = i.nextSibling, o = r.map((e) => ({
			item: e,
			next: e.nextSibling,
			owner: n.owners.get(e)
		})), s = this.getOrCreateNoteList(t, "endnote");
		for (let e of r) s.appendChild(e), n.owners.set(e, t);
		if (i.children.length || i.remove(), !this.isPageOverflowing(e)) return !0;
		i.parentNode !== e && e.insertBefore(i, a?.parentNode === e ? a : null);
		for (let { item: e, next: t, owner: r } of o.reverse()) i.insertBefore(e, t?.parentNode === i ? t : null), n.owners.set(e, r);
		return s.children.length || s.remove(), !1;
	}
	splitDynamicNotes(e, t) {
		let n = e.parentElement, r = this.dynamicNoteState.get(n);
		if (!r?.items.length || e.clientHeight <= 0) return !1;
		if (this.moveEndnotesAfterBody(e, t)) return !0;
		let i = this.options.paginationTolerance ?? 2, a = this.getMinimumNoteBodyBottom(e), o = () => this.getPageBodyBottom(e) + i < a;
		if (!o()) return !1;
		let s = !1, c = /* @__PURE__ */ new Map(), l = Array.from(e.querySelectorAll(":scope > [data-docx-note-list] > li"));
		for (let u of l.slice().reverse()) {
			if (!o()) break;
			let d = r.items.find((e) => e.dataset.docxNoteKind === u.dataset.docxNoteKind && e.dataset.docxNoteId === u.dataset.docxNoteId);
			if (!d) continue;
			let f = r.fragments.get(d), p = f.indexOf(u), m = u.dataset.docxNoteKind, h = this.getOrCreateNoteList(t, m);
			if (m === "endnote" && p === 0 && e.querySelector(":scope > article > *")) {
				let e = u.parentElement;
				h.prepend(u), e.children.length || e.remove(), r.owners.set(d, t), s = !0;
				continue;
			}
			let g = Array.from(e.querySelectorAll(":scope > [data-docx-note-list] > li")), _ = new Map(g.map((e) => [e, this.getNoteItemHeight(e)])), v = this.getPageBodyBottom(e) - a + Array.from(_.values()).reduce((e, t) => e + t, 0);
			for (let n of g) c.has(n) || c.set(n, this.measureNoteMinimum(n, t, e));
			let y = g.find((e) => c.get(e) > v + i);
			if (y) throw t.remove(), this.syncDynamicNotes(n), e.dataset.docxNoteLayoutError = n.dataset.docxNoteLayoutError = "unresolved-overflow", Error(`docx-preview: unbreakable ${y.dataset.docxNoteKind}:${y.dataset.docxNoteId} exceeds its note region; all note content has been preserved`);
			let b = v - g.reduce((e, t) => e + c.get(t), 0), x = g.map((e) => Math.max(0, _.get(e) - c.get(e))).sort((e, t) => e - t), S = x.length;
			for (let e of x) {
				if (e * S > b) break;
				b -= e, S--;
			}
			let C = S > 0 ? Math.max(0, b / S) : Infinity, w = c.get(u) + Math.min(_.get(u) - c.get(u), C), T = () => o() && this.getNoteItemHeight(u) > w;
			if (!T()) {
				h.children.length || h.remove();
				continue;
			}
			let E = this.cloneBlockShell(u);
			if (E.dataset.docxNoteFragment = `${p + 1}`, E.dataset.docxContinued = "true", h.prepend(E), !this.moveNoteItemTail(u, E, e, T) || !this.hasVisibleNoteContent(u) || T() && this.getNoteItemHeight(u) > v + i) {
				if (this.mergeNoteContents(u, E), E.remove(), p > 0 && this.getNoteItemHeight(u) <= v + i && e.querySelector(":scope > article > *")) {
					h.prepend(u), s = !0;
					continue;
				}
				if (h.children.length || h.remove(), o() && (l.length === 1 || this.getNoteItemHeight(u) > v + i)) throw t.remove(), this.syncDynamicNotes(n), e.dataset.docxNoteLayoutError = n.dataset.docxNoteLayoutError = "unresolved-overflow", Error(`docx-preview: unbreakable ${m}:${u.dataset.docxNoteId} exceeds its note region; all note content has been preserved`);
			} else f.splice(p + 1, 0, E), f.forEach((e, t) => e.dataset.docxNoteFragment = `${t}`), s = !0;
		}
		return this.syncDynamicNotes(n), s;
	}
	measureNoteMinimum(e, t, n) {
		let r = this.getOrCreateNoteList(t, e.dataset.docxNoteKind), i = this.cloneBlockShell(e);
		i.dataset.docxNoteFragment = "1", r.appendChild(i);
		try {
			return this.moveNoteItemTail(e, i, n, () => !0), this.getNoteItemHeight(e);
		} finally {
			this.mergeNoteContents(e, i), i.remove();
		}
	}
	moveNoteItemTail(e, t, n, r) {
		let i = !1;
		for (; r() && e.lastChild;) {
			let a = e.lastChild;
			if (e.childNodes.length > 1 && this.hasNoteContentOutside(e, a)) t.prepend(a), i = !0;
			else if (a.nodeType === 1 && this.splitNoteBlock(a, t, n, r, e)) i = !0;
			else break;
		}
		return i;
	}
	hasNoteContentOutside(e, t) {
		let n = Array.from(e.childNodes);
		for (; n.length;) {
			let e = n.pop();
			if (e !== t) {
				if (e.nodeType === Node.TEXT_NODE && e.textContent.length > 0) return !0;
				if (e.nodeType === 1) {
					if (this.isNoteAtomicElement(e)) return !0;
					n.push(...Array.from(e.childNodes));
				}
			}
		}
		return !1;
	}
	firstNoteTextBoundary(e) {
		let t = globalThis.Intl?.Segmenter;
		if (t) {
			let n = 0;
			for (let r of new t(void 0, { granularity: "grapheme" }).segment(e)) if (n ||= r.segment.length, r.segment.trim()) return r.index + r.segment.length;
			return n;
		}
		let n = e.search(/\S/), r = Math.max(0, n);
		return r + (e.codePointAt(r) > 65535 ? 2 : 1);
	}
	getNoteItemHeight(e) {
		let t = e.getBoundingClientRect(), n = t.bottom;
		for (let t of Array.from(e.querySelectorAll("*"))) n = Math.max(n, t.getBoundingClientRect().bottom);
		let r = e.ownerDocument.defaultView.getComputedStyle(e);
		return Math.max(t.height, n - t.top) + (parseFloat(r.marginTop) || 0) + (parseFloat(r.marginBottom) || 0);
	}
	hasVisibleNoteContent(e) {
		return !!e.textContent?.length || !!e.querySelector("img,svg,math,object,canvas,video,br,[data-docx-field-instr]");
	}
	splitNoteBlock(e, t, n, r, i = e.parentElement) {
		let a = e.ownerDocument.defaultView.getComputedStyle(e);
		if (e.dataset.docxKeepLines === "true" || a.breakInside === "avoid" || a.pageBreakInside === "avoid" || !/^(p|table|div|blockquote)$/.test(e.localName)) return !1;
		let o = this.cloneBlockShell(e);
		o.dataset.docxContinued = "true", this.noteContinuationOrigins.set(o, e), t.prepend(o);
		let s = !1;
		if (e.localName === "table") {
			for (let t of Array.from(e.querySelectorAll(":scope > colgroup"))) {
				let e = t.cloneNode(!0);
				e.removeAttribute("id"), e.querySelectorAll("[id]").forEach((e) => e.removeAttribute("id")), e.dataset.docxNoteColumns = "true", o.appendChild(e);
			}
			let t = /* @__PURE__ */ new Map(), a = (n, r) => {
				if (r === e) {
					o.appendChild(n);
					return;
				}
				let i = t.get(r);
				i || (i = this.cloneBlockShell(r), this.noteContinuationOrigins.set(i, r), t.set(r, i), o.appendChild(i)), i.appendChild(n);
			}, c = this.tableContentRows(e), l = c.length - 1;
			for (; l > 0 && c.slice(0, l).some((e, t) => Array.from(e.cells).some((e) => t + e.rowSpan > l));) l--;
			if (l > 0) {
				for (let e of c.slice(l)) a(e, e.parentElement);
				s = !0;
			} else if (c.length === 1 && c[0].cells.length === 1 && c[0].cells[0].rowSpan === 1) {
				let e = c[0], t = e.cells[0], o = e.ownerDocument.defaultView.getComputedStyle(e);
				if (o.breakInside !== "avoid" && o.pageBreakInside !== "avoid") {
					let o = this.cloneBlockShell(e), c = this.cloneBlockShell(t);
					this.noteContinuationOrigins.set(o, e), this.noteContinuationOrigins.set(c, t), a(o, e.parentElement), o.appendChild(c), s = this.moveNoteBlockTail(t, c, n, r, i);
				}
			}
		} else if (e.localName === "p") for (; r() && e.lastChild && this.moveNoteTailNode(e, o, n, r, i);) s = !0;
		else s = this.moveNoteBlockTail(e, o, n, r, i);
		return s ? e.hasChildNodes() || (e.id && (o.id = e.id), e.remove()) : o.remove(), s;
	}
	moveNoteBlockTail(e, t, n, r, i) {
		let a = !1;
		for (; r() && e.lastChild;) {
			let o = e.lastChild;
			if (e.childNodes.length > 1 && this.hasNoteContentOutside(i, o)) t.prepend(o), a = !0;
			else if (o.nodeType === 1 && this.splitNoteBlock(o, t, n, r, i)) a = !0;
			else break;
		}
		return a;
	}
	moveNoteTailNode(e, t, n, r, i) {
		let a = e.lastChild;
		if (!a) return !1;
		if (a.nodeType === Node.TEXT_NODE) {
			let e = this.hasNoteContentOutside(i, a) ? 0 : this.firstNoteTextBoundary(a.textContent);
			return this.moveTextTail(a, t, n, r, !0, e);
		}
		if (a.nodeType === 1) {
			let e = a;
			if (e.hasChildNodes() && !this.isNoteAtomicElement(e) && !e.dataset.docxFloat && !e.dataset.docxNoteReference) {
				let a = this.cloneBlockShell(e);
				a.removeAttribute("name"), this.noteContinuationOrigins.set(a, e), t.prepend(a);
				let o = this.moveNoteTailNode(e, a, n, r, i);
				return e.hasChildNodes() || (e.id && (a.id = e.id), e.hasAttribute("name") && a.setAttribute("name", e.getAttribute("name")), e.remove()), a.hasChildNodes() || a.remove(), o;
			}
		}
		return a.nodeType === 1 && this.isNoteAtomicElement(a) && !this.hasNoteContentOutside(i, a) ? !1 : (t.prepend(a), !0);
	}
	isNoteAtomicElement(e) {
		return /^(img|svg|math|object|canvas|video|picture|br)$/i.test(e.localName) || e.hasAttribute("data-docx-field-instr");
	}
	isMutableNoteField(e) {
		if (!e.hasAttribute("data-docx-field-instr")) return !1;
		let t = this.tokenizeFieldInstruction((e.dataset.docxFieldInstr ?? "").replace(/\s+/g, " ").trim())[0]?.replace(/^=/, "").toUpperCase();
		return [
			"PAGE",
			"NUMPAGES",
			"SECTIONPAGES",
			"SECTION"
		].includes(t) || t === "PAGEREF" && !!this.options.updatePageReferences;
	}
	noteTextSignature(e, t) {
		let n = (e) => e.nodeType === Node.TEXT_NODE ? e.textContent : e.nodeType === 1 && this.isMutableNoteField(e) ? `\u0000docx-field-${t.indexOf(e)}\u0000` : Array.from(e.childNodes).map(n).join("");
		return n(e);
	}
	assertDynamicNotesFit(e) {
		let t = [], n = this.dynamicNoteState.get(e);
		if (n) for (let r of n.items) {
			let i = n.fragments.get(r), a = n.fields.get(r), o = i.flatMap((e) => Array.from(e.querySelectorAll("[data-docx-field-instr]")));
			(i.map((e) => this.noteTextSignature(e, a)).join("") !== n.text.get(r) || o.length !== a.length || o.some((e, t) => e !== a[t]) || i.some((t, n) => !e.contains(t) || t.dataset.docxNoteFragment !== `${n}`)) && t.push(`fragment conservation ${r.dataset.docxNoteKind}:${r.dataset.docxNoteId}`);
		}
		let r = this.options.paginationTolerance ?? 2;
		for (let n of Array.from(e.querySelectorAll(`:scope > section.${this.className}`))) {
			let e = Array.from(n.children).filter((e) => e.dataset.docxNoteList);
			if (!e.length || n.clientHeight <= 0) continue;
			delete n.dataset.docxNoteLayoutError;
			let i = this.getPageBodyBottom(n), a = this.getPageNoteBottom(n), o = Array.from(n.querySelectorAll(":scope > article > *")).some((e) => e.getBoundingClientRect().bottom > i + r), s = e.some((e) => Array.from(e.querySelectorAll("*")).some((e) => e.getBoundingClientRect().bottom > a + r));
			(o || s) && (n.dataset.docxNoteLayoutError = "unresolved-overflow", t.push(e.flatMap((e) => Array.from(e.children, (e) => `${e.dataset.docxNoteKind}:${e.dataset.docxNoteId}`)).join(",")));
		}
		if (t.length) throw e.dataset.docxNoteLayoutError = "unresolved-overflow", Error(`docx-preview: note layout requires continuation or unsupported geometry (${t.join("; ")}); all note content has been preserved`);
		delete e.dataset.docxNoteLayoutError;
	}
	async refreshDynamicHeaderFooters(e) {
		let t = "", n = 0, r = 0, i = this.tasks.length;
		for (let i of e) {
			let e = i.dataset.docxSection ?? "", a = e !== t;
			if (a) {
				let a = Number(i.dataset.docxPageStart);
				n = i.dataset.docxPageStart != null && Number.isFinite(a) ? a : n + 1, r = 1, t = e;
			} else n++, r++;
			let o = this.pageHeaderFooterState.get(i);
			if (o) {
				this.currentPageNumber = n, this.currentSectionPageNumber = r, this.currentSectionNumber = Number(i.dataset.docxSectionNumber) || 1;
				for (let e of ["header", "footer"]) {
					let t = e === "header" ? o.headerProps : o.footerProps, r = e === "header" ? t.headerRefs : t.footerRefs, s = e === "header" ? "headerId" : "footerId", c = this.selectHeaderFooterReference(r, t, n, a);
					if (o[s] !== c?.id && (o[s] = c?.id, i.querySelector(`:scope > ${e}`)?.remove(), (e === "header" ? this.options.renderHeaders : this.options.renderFooters) && (this.currentSectionProps = t, this.renderHeaderFooter(r, t, n, a, i), e === "header"))) {
						let e = i.querySelector(":scope > header");
						e && i.prepend(e);
					}
				}
			}
		}
		await Promise.allSettled(this.tasks.slice(i));
	}
	splitOverflowBlock(e, t, n) {
		if (!n.isConnected && t.isConnected && n.parentElement && t.after(n.parentElement), !e || e.dataset.docxKeepLines == "true") return !1;
		let r = getComputedStyle(e);
		if (r.breakInside == "avoid" || r.pageBreakInside == "avoid") return !1;
		switch (e.tagName.toLowerCase()) {
			case "p": return this.splitParagraphBlock(e, t, n);
			case "table": return this.splitTableBlock(e, t, n);
		}
		return !1;
	}
	splitParagraphBlock(e, t, n) {
		if (!e.hasChildNodes() || this.fitOversizedInlinePicture(e, t)) return !1;
		let r = this.cloneBlockShell(e);
		r.dataset.docxContinued = "true", n.prepend(r);
		let i = !1, a = 0;
		for (; this.isPageOverflowing(t) && e.hasChildNodes() && a++ < 1e3 && this.moveTailInlineNode(e, r, t);) i = !0, this.removeEmptyInlineContainers(e);
		return i ? (e.hasChildNodes() ? this.options.strictWordCompatibility && e.dataset.docxWidowControl == "true" && this.rebalanceWidowOrphan(e, r, t) : e.remove(), !0) : (r.remove(), !1);
	}
	fitOversizedInlinePicture(e, t) {
		let n = e.parentElement;
		if (n?.localName !== "article" || n.firstElementChild !== e || t.querySelector(":scope > article > *") !== e || e.textContent?.trim() || e.querySelector("table,math,object,canvas,video,[data-docx-note-reference]")) return !1;
		let r = Array.from(e.querySelectorAll("[data-docx-drawing]")), i = r[0];
		if (r.length !== 1 || !i || i.children.length !== 1 || e.querySelectorAll("img").length !== 1 || i.dataset.docxFloat) return !1;
		let a = i.firstElementChild;
		if (a.localName !== "img" && a.dataset.docxImageCrop !== "true") return !1;
		let o = e.ownerDocument.defaultView, s = o?.getComputedStyle(i);
		if (!o || !s || s.position === "absolute" || s.position === "fixed" || s.transform !== "none" || s.cssFloat !== "none") return !1;
		let c = e.getBoundingClientRect(), l = i.getBoundingClientRect(), u = t.getBoundingClientRect(), d = t.clientHeight > 0 ? u.height / t.clientHeight : 1, f = (parseFloat(o.getComputedStyle(e).marginBottom) || 0) * d, p = Math.max(0, c.height - l.height), m = this.getPageBodyBottom(t) - c.top - p - f - d, h = parseFloat(s.width), g = parseFloat(s.height);
		if (![
			m,
			h,
			g,
			l.height
		].every(Number.isFinite) || m <= 0 || h <= 0 || g <= 0 || l.height <= m) return !1;
		let _ = m / l.height;
		return i.style.width = `${h * _}px`, i.style.height = `${g * _}px`, a.style.width = "100%", a.style.height = "100%", i.dataset.docxPageFitScale = `${_}`, !0;
	}
	splitTableBlock(e, t, n) {
		let r = this.tableContentRows(e);
		if (r.length <= 1) return !1;
		let i = this.cloneBlockShell(e);
		i.dataset.docxContinued = "true";
		for (let t of Array.from(e.children)) t.tagName?.toLowerCase() == "colgroup" && i.appendChild(t.cloneNode(!0));
		for (let e of r.filter((e) => e.dataset.docxRepeatHeader == "true")) {
			let t = e.cloneNode(!0);
			t.dataset.docxRepeatedHeader = "true", i.appendChild(t);
		}
		n.prepend(i);
		let a = !1, o = 0;
		for (; this.isPageOverflowing(t) && this.tableContentRows(e).length > 1 && o++ < 500;) {
			let t = this.tableContentRows(e).filter((e) => e.dataset.docxRepeatedHeader != "true"), n = t[t.length - 1];
			if (!n) break;
			i.insertBefore(n, this.firstMovedTableRow(i)), a = !0;
		}
		return a ? !0 : (i.remove(), !1);
	}
	cloneBlockShell(e) {
		let t = e.cloneNode(!1);
		return t.removeAttribute("id"), t;
	}
	tableContentRows(e) {
		return Array.from(e.querySelectorAll(":scope > tr, :scope > tbody > tr"));
	}
	firstMovedTableRow(e) {
		return this.tableContentRows(e).find((e) => e.dataset.docxRepeatedHeader != "true") ?? null;
	}
	moveTailInlineNode(e, t, n) {
		let r = e.lastChild;
		if (!r) return !1;
		if (r.nodeType == Node.TEXT_NODE) return this.moveTextTail(r, t, n);
		if (r instanceof Element) {
			if (r.dataset?.docxNoteReference) return t.prepend(r), !0;
			if (r.childNodes.length > 0 && r.tagName?.toLowerCase() != "br") {
				let e = r.cloneNode(!1);
				e.removeAttribute("id"), t.prepend(e);
				let i = this.moveTailInlineNode(r, e, n);
				return r.hasChildNodes() || r.remove(), e.hasChildNodes() || e.remove(), i;
			}
		}
		return t.prepend(r), !0;
	}
	moveTextTail(e, t, n, r = () => this.isPageOverflowing(n), i = !1, a = 0) {
		let o = e.data ?? "";
		if (!o || o.length <= a) return !1;
		let s = document.createTextNode("");
		if (t.prepend(s), o.length == 1) return s.data = o, e.remove(), !0;
		let c = 1, l = o.length - a, u = l;
		for (; c <= l;) {
			let t = Math.floor((c + l) / 2);
			e.data = o.substring(0, o.length - t), s.data = o.substring(o.length - t), r() ? c = t + 1 : (u = t, l = t - 1);
		}
		if (u = Math.min(o.length - a, this.adjustSplitToWordBoundary(o, u)), i) {
			let e = o.length - u, t = globalThis.Intl?.Segmenter, n = 0;
			if (t) for (let r of new t(void 0, { granularity: "grapheme" }).segment(o)) {
				if (r.index > e) break;
				n = r.index;
			}
			else for (n = e, n > 0 && /[\uDC00-\uDFFF]/.test(o[n]) && /[\uD800-\uDBFF]/.test(o[n - 1]) && n--; n > 0 && /[\u0300-\u036f\u1ab0-\u1aff\u1dc0-\u1dff\u20d0-\u20ff\ufe20-\ufe2f\ufe00-\ufe0f\u200d]/.test(o[n]);) n--;
			u = o.length - Math.max(n, a);
		}
		return e.data = o.substring(0, o.length - u), s.data = o.substring(o.length - u), e.data || e.remove(), !0;
	}
	adjustSplitToWordBoundary(e, t) {
		if (t <= 1 || t >= e.length) return t;
		let n = e.length - t, r = e.lastIndexOf(" ", n);
		return r > 0 && n - r < 32 ? e.length - r - 1 : t;
	}
	removeEmptyInlineContainers(e) {
		for (let t of Array.from(e.childNodes)) t instanceof HTMLElement && (this.removeEmptyInlineContainers(t), !t.hasChildNodes() && !/^(br|img|svg|math)$/i.test(t.tagName) && t.remove());
	}
	cleanupEmptyNumberedParagraphs(e) {
		let t = `p[class*="${this.className}-num-"]`;
		for (let n of Array.from(e.querySelectorAll(t))) {
			if (this.hasVisiblePaginationContent(n) || !n.id && !n.querySelector("[id], a[name]")) continue;
			let t = this.findNextVisiblePaginationBlock(e, n);
			t && this.moveAnchorsToBlock(n, t), n.remove();
		}
	}
	removeEmptyDynamicPages(e) {
		let t = Array.from(e.querySelectorAll(`:scope > section.${this.className}[data-docx-dynamic-page="true"]`));
		for (let e of t) {
			let t = Array.from(e.querySelectorAll(":scope > article")), n = t.some((e) => Array.from(e.children).some((e) => this.hasVisiblePaginationContent(e))), r = Array.from(e.children).some((e) => e.dataset.docxNoteList && e.children.length > 0);
			t.length > 0 && !n && !r && e.remove();
		}
	}
	findNextVisiblePaginationBlock(e, t) {
		let n = Array.from(e.querySelectorAll("article p, article table, article figure, article img, article svg, article math")), r = n.indexOf(t);
		for (let e = r + 1; e < n.length; e++) {
			let t = n[e];
			if (this.hasVisiblePaginationContent(t)) return t;
		}
		return null;
	}
	hasVisiblePaginationContent(e) {
		return (e.textContent ?? "").replace(/\s+/g, "").length > 0 || !!e.querySelector("br,img,svg,math,object,canvas,video,table");
	}
	moveAnchorsToBlock(e, t) {
		let n = Array.from(e.querySelectorAll("[id], a[name]"));
		e.id && !t.id && (t.id = e.id);
		for (let e = n.length - 1; e >= 0; e--) {
			let r = n[e];
			r.id && t.querySelector(`#${CSS.escape(r.id)}`) || t.prepend(r);
		}
	}
	rebalanceWidowOrphan(e, t, n) {
		let r = this.visualLineCount(e), i = this.visualLineCount(t);
		if (r >= 2 && i >= 2) return;
		if (r < 2 && e.parentElement && t.hasChildNodes()) {
			t.prepend(...Array.from(e.childNodes)), e.remove();
			return;
		}
		let a = 0;
		for (; this.visualLineCount(t) < 2 && e.hasChildNodes() && a++ < 20 && !this.isPageOverflowing(n) && this.moveTailInlineNode(e, t, n););
	}
	visualLineCount(e) {
		try {
			let t = document.createRange();
			t.selectNodeContents(e);
			let n = Array.from(t.getClientRects());
			t.detach?.();
			let r = new Set(n.map((e) => Math.round(e.top)));
			return Math.max(r.size, 1);
		} catch {
			return 1;
		}
	}
	updateDynamicFieldPages(e) {
		let t = Array.from(e.querySelectorAll(":scope > section." + this.className)), n = {}, r = {}, i = {}, a = [], o = [], s = 0, c = "";
		for (let e of t) {
			let t = e.dataset.docxSection ?? "";
			r[t] = (r[t] ?? 0) + 1;
		}
		if (t.forEach((e, t) => {
			let l = e.dataset.docxSection ?? "";
			if (l != c) {
				let t = e.dataset.docxPageStart == null ? null : parseInt(e.dataset.docxPageStart, 10);
				s = Number.isFinite(t) ? t : s + 1, i[l] = 1, c = l;
			} else s++, i[l] = (i[l] ?? 0) + 1;
			e.dataset.docxPageNumber = `${s}`, e.dataset.docxSectionPageNumber = `${i[l]}`, e.dataset.docxSectionPageCount = `${r[l] ?? 1}`, a[t] = s, o[t] = i[l];
			for (let t of Array.from(e.querySelectorAll("[id]"))) t.id && n[t.id] == null && (n[t.id] = s);
		}), t.forEach((e, i) => {
			let s = e.dataset.docxSection ?? "";
			for (let c of Array.from(e.querySelectorAll("[data-docx-field-instr]"))) {
				let l = this.evaluateDynamicField(c.dataset.docxFieldInstr, a[i] ?? i + 1, t.length, n, r[s] ?? 1, o[i] ?? 1, parseInt(e.dataset.docxSectionNumber ?? "1", 10));
				l != null && (c.textContent = l);
			}
		}), this.options.updatePageReferences) for (let t of Array.from(e.querySelectorAll("[data-docx-page-ref]"))) t.textContent = `${n[t.dataset.docxPageRef] ?? 1}`;
		this.updateDynamicNoteNumbers(e);
	}
	evaluateDynamicField(e, t, n, r, i = n, a = t, o = 1) {
		let s = this.tokenizeFieldInstruction((e ?? "").replace(/\s+/g, " ").trim()), c = s[0]?.replace(/^=/, "").toUpperCase(), l = null;
		switch (c) {
			case "PAGE":
				l = this.formatFieldNumber(t, this.fieldFormatSwitchToNumFormat(this.fieldSwitch(s, "\\*") ?? this.currentSectionProps?.pageNumber?.format));
				break;
			case "NUMPAGES":
				l = this.formatFieldNumber(n, this.fieldFormatSwitchToNumFormat(this.fieldSwitch(s, "\\*") ?? this.currentSectionProps?.pageNumber?.format));
				break;
			case "SECTIONPAGES":
				l = this.formatFieldNumber(i, this.fieldFormatSwitchToNumFormat(this.fieldSwitch(s, "\\*") ?? this.currentSectionProps?.pageNumber?.format));
				break;
			case "SECTION":
				l = this.formatFieldNumber(o, this.fieldFormatSwitchToNumFormat(this.fieldSwitch(s, "\\*") ?? "decimal"));
				break;
			case "PAGEREF": {
				if (!this.options.updatePageReferences) return null;
				let e = this.firstFieldArgument(s);
				l = e ? `${r[e] ?? 1}` : "";
				break;
			}
		}
		return l == null ? null : this.applyFieldFormatting(l, e);
	}
	renderDefaultStyle() {
		var e = this.className;
		let t = !!this.options.darkMode, n = t ? "#242424" : "gray", r = t ? Hi("white") : "white", i = t ? Hi("black") : "black";
		var a = `
.${e}-wrapper { position: relative; background: ${n}; padding: 30px; padding-bottom: 0px; display: flex; flex-flow: column; align-items: center; }
.${e}-wrapper>section.${e} { background: ${r}; box-shadow: ${t ? "0 0 10px rgba(0, 0, 0, 0.8)" : "0 0 10px rgba(0, 0, 0, 0.5)"}; margin-bottom: 30px;${t ? " outline: 1px solid rgba(255, 255, 255, 0.15); outline-offset: -1px;" : ""} }`;
		this.options.hideWrapperOnPrint && (a = `@media not print { ${a} }`);
		var o = `${a}
.${e} { --docx-auto-color: ${i}; color: var(--docx-auto-color); font-size: 10.5pt; font-family: var(--docx-minorHAnsi-font, "Times New Roman", serif); hyphens: auto; text-underline-position: from-font; font-kerning: normal; font-variant-ligatures: common-ligatures contextual; text-rendering: optimizeLegibility; line-break: auto; }
section.${e} { box-sizing: border-box; display: flex; flex-flow: column nowrap; position: relative; overflow: visible; isolation: isolate; }
section.${e}>header, section.${e}>footer { flex-shrink: 0; }
section.${e}>[data-docx-note-list] { flex-shrink: 0; }
section.${e}>article { z-index: 1; }
section.${e}>article:last-of-type { margin-bottom: auto; }
section.${e}>footer { z-index: 1; }
.${e} [data-docx-continued="true"] { margin-top: 0 !important; }
.${e} tr[data-docx-repeat-header="true"], .${e} tr[data-docx-repeated-header="true"] { break-after: avoid; }
.${e} li[data-docx-note-label]::marker { content: attr(data-docx-note-label) " "; }
.${e} li[data-docx-note-custom="true"]::marker, .${e} li[data-docx-note-label=""]::marker,
.${e} li[data-docx-note-fragment]:not([data-docx-note-fragment="0"])::marker { content: ""; }
.${e} table { border-collapse: collapse; }
.${e} table td, .${e} table th { vertical-align: top; overflow-wrap: anywhere; }
.${e} p { margin: 0pt; min-height: 1em; }
.${e} .${e}-paragraph-frame > p { margin: 0; }
.${e} span { white-space: pre-wrap; overflow-wrap: break-word; font-feature-settings: "kern" 1; }
.${e} table span { overflow-wrap: anywhere; }
.${e} .${e}-float-wrap { shape-margin: 0.15in; }
.${e} .${e}-field { white-space: pre-wrap; }
.${e} .${e}-tab-stop { display: inline-block; min-width: 1em; white-space: nowrap; line-height: 1; }
.${e} .${e}-tab-stop[data-docx-tab-leader="dot"], .${e} .${e}-tab-stop[data-docx-tab-leader="middleDot"] { min-width: 2em; border-bottom: 1px dotted currentColor; height: .85em; transform: translateY(-.18em); }
.${e} .${e}-tab-stop[data-docx-tab-leader="hyphen"], .${e} .${e}-tab-stop[data-docx-tab-leader="heavy"], .${e} .${e}-tab-stop[data-docx-tab-leader="underscore"] { min-width: 2em; border-bottom: 1px solid currentColor; height: .85em; transform: translateY(-.18em); }
.${e} .${e}-tab-leader-paragraph > a, .${e} .${e}-tab-leader-paragraph > .${e}-tab-leader-line, .${e} .${e}-tab-leader-line { display: inline-flex; align-items: baseline; width: calc(100% - var(--docx-text-indent, 0pt)); color: inherit !important; text-decoration: none !important; box-sizing: border-box; max-width: none; text-indent: 0; }
.${e} .${e}-tab-leader-paragraph > a, .${e} .${e}-tab-leader-paragraph > a * { color: inherit !important; text-decoration: none !important; }
.${e} .${e}-toc-paragraph a, .${e} .${e}-toc-paragraph a * { color: inherit !important; text-decoration: none !important; }
.${e} .${e}-toc-paragraph.${e}-tab-leader-paragraph[class*="${e}-num-"] { display: grid; grid-template-columns: max-content minmax(0, 1fr); column-gap: .35em; align-items: baseline; list-style-position: outside; list-style-type: none; text-indent: 0 !important; }
.${e} .${e}-toc-paragraph.${e}-tab-leader-paragraph[class*="${e}-num-"]::before { grid-column: 1; grid-row: 1; white-space: pre; margin-inline-end: 0; }
.${e} .${e}-toc-paragraph.${e}-tab-leader-paragraph[class*="${e}-num-"] > a { grid-column: 2; grid-row: 1; display: inline-flex; flex: 1 1 auto; width: auto; min-width: 0; max-width: 100%; }
.${e} .${e}-tab-leader-title { flex: 0 1 auto; min-width: 0; }
.${e} .${e}-tab-leader-page { flex: 0 0 auto; white-space: nowrap; text-align: right; }
.${e} .${e}-tab-leader-fill, .${e} .${e}-tab-leader-paragraph > a > .${e}-tab-stop[data-docx-tab-leader="dot"], .${e} .${e}-tab-leader-paragraph > a > .${e}-tab-stop[data-docx-tab-leader="middleDot"], .${e} .${e}-tab-leader-paragraph > .${e}-tab-stop[data-docx-tab-leader="dot"], .${e} .${e}-tab-leader-paragraph > .${e}-tab-stop[data-docx-tab-leader="middleDot"] { flex: 1 1 auto; width: auto; margin: 0 .2em; }
.${e} .${e}-literal-leader-line > .${e}-tab-leader-title { flex: 0 0 auto; white-space: nowrap; }
.${e} .${e}-toc { display: table; width: 100%; }
.${e} .${e}-toc-entry { display: table-row; }
.${e} .${e}-toc-title, .${e} .${e}-toc-page { display: table-cell; }
.${e} .${e}-toc-title { border-bottom: 1px dotted currentColor; }
.${e} .${e}-toc-page { text-align: right; width: 3em; }
.${e} math { font-family: Cambria Math, STIX Two Math, Latin Modern Math, serif; }
.${e} ruby { ruby-position: over; }
.${e} rt { font-size: 0.5em; line-height: 1; }
.${e} .${e}-chart, .${e} .${e}-smartart, .${e} .${e}-ink { min-width: 2in; min-height: 1in; }
.${e} a { color: inherit; text-decoration: inherit; }
.${e} svg { fill: transparent; }
[data-docx-review-enabled="true"] { --docx-review-color: #c2410c; }
[data-docx-review-enabled="true"] ins[data-docx-change-kind], [data-docx-review-enabled="true"] del[data-docx-change-kind] { text-decoration: none; }
[data-docx-review-enabled="true"][data-docx-review-mode="final"] [data-docx-change-kind="delete"], [data-docx-review-enabled="true"][data-docx-review-mode="final"] [data-docx-change-kind="move-from"], [data-docx-review-enabled="true"][data-docx-review-mode="simple"] [data-docx-change-kind="delete"], [data-docx-review-enabled="true"][data-docx-review-mode="simple"] [data-docx-change-kind="move-from"], [data-docx-review-enabled="true"][data-docx-review-mode="original"] [data-docx-change-kind="insert"], [data-docx-review-enabled="true"][data-docx-review-mode="original"] [data-docx-change-kind="move-to"] { display: none !important; }
[data-docx-review-enabled="true"][data-docx-review-mode="all"] ins[data-docx-change-kind]:not([data-docx-change-empty="true"]) { color: var(--docx-review-color); text-decoration: underline; text-decoration-color: var(--docx-review-color); text-underline-offset: .16em; background: color-mix(in srgb, var(--docx-review-color) 7%, transparent); }
[data-docx-review-enabled="true"][data-docx-review-mode="all"] ins[data-docx-change-empty="true"] { color: inherit; text-decoration: none; background: transparent; }
[data-docx-review-enabled="true"][data-docx-review-mode="all"] del[data-docx-change-kind] { display: inline-block !important; width: 0 !important; max-width: 0 !important; height: 0 !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; line-height: 0 !important; vertical-align: baseline; color: transparent; }
[data-docx-review-enabled="true"][data-docx-review-mode="all"][data-docx-review-presentation="inline"] del[data-docx-change-kind] { display: inline !important; width: auto !important; max-width: none !important; height: auto !important; overflow: visible !important; line-height: inherit !important; color: var(--docx-review-color); text-decoration: line-through; text-decoration-color: var(--docx-review-color); }
[data-docx-review-enabled="true"][data-docx-review-mode="simple"] ins[data-docx-change-kind] { color: inherit; text-decoration: none; background: transparent; }
[data-docx-review-enabled="true"][data-docx-review-mode="original"] del[data-docx-change-kind] { color: inherit; text-decoration: none; background: transparent; }
[data-docx-review-enabled="true"][data-docx-review-mode="all"] [data-docx-format-change="true"], [data-docx-review-enabled="true"][data-docx-review-mode="simple"] [data-docx-format-change="true"] { outline: 0; }
[data-docx-review-enabled="true"][data-docx-review-mode="final"] [data-docx-change-kind="comment"], [data-docx-review-enabled="true"][data-docx-review-mode="original"] [data-docx-change-kind="comment"] { display: none !important; }
@media print { .${e}-wrapper { background: transparent; padding: 0; display: block; } .${e}-wrapper>section.${e}, section.${e} { background: white; margin: 0 auto; box-shadow: none; outline: none; break-after: page; page-break-after: always; } .${e} { --docx-auto-color: black; color: black; } }
`;
		return this.options.renderComments && (o += `
.${e}-comment-ref { cursor: pointer; }
.${e}-comment-ref[data-docx-comment-positioned="true"]:not(:focus) { opacity: 0; }
.${e}-comment-ref:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }
.${e}-comment-anchor { display: inline-block; width: 0; height: 0; overflow: visible; vertical-align: baseline; }
.${e}-comment-layer { position: absolute; inset: 0; pointer-events: none; z-index: 1000; }
.${e}-comment-popover { display: block; width: max-content; pointer-events: auto; margin: 0; padding: 0; }
.${e}-comment-popover > summary { list-style: none; cursor: pointer; display: block; padding: 0; margin: 0; }
.${e}-comment-popover > summary::-webkit-details-marker { display: none; }
.${e}-comment-popover > summary:focus-visible { outline: 2px solid currentColor; }
.${e}-comment-body { position: absolute; top: 100%; width: 30ch; box-sizing: border-box; overflow: auto; padding: .5rem; background: ${r}; color: var(--docx-auto-color); box-shadow: 0 0 .25rem rgba(0,0,0,.25); }
.${e}-comment-author,.${e}-comment-date { font-size: .875rem; color: ${t ? Hi("#888888") : "#888"}; }
@media print { .${e}-comment-layer, .${e}-comment-popover, .${e}-comment-body { position: static !important; width: auto !important; max-width: none !important; max-height: none !important; overflow: visible; } .${e}-comment-layer { pointer-events: auto; } .${e}-comment-body { box-shadow: none; } }

`), [this.h({
			tagName: "#comment",
			children: ["docxjs library predefined styles"]
		}), this.h({
			tagName: "style",
			children: [o]
		})];
	}
	async renderNumbering(e) {
		var t = "", n = [];
		let r = /* @__PURE__ */ new Map(), i = new Map(e.map((e) => [`${e.id}:${e.level}`, this.numFormatToCssValue(e.format)])), a = (e, t) => {
			let n = r.get(e) ?? [];
			n.push(t), r.set(e, n);
		};
		for (var o of e) {
			var s = this.numberingSelector(o.id, o.level), c = "none";
			if (o.bullet) {
				let e = `--${this.className}-${o.bullet.src}`.toLowerCase();
				t += this.styleToString(`${s}:before`, {
					content: "' '",
					display: "inline-block",
					background: `var(${e})`
				}, o.bullet.style);
				try {
					let n = await this.document.loadNumberingImage(o.bullet.src);
					t += `${this.rootSelector} { ${e}: url(${n}) }`;
				} catch {
					this.options.debug && console.warn(`Can't load numbering image with src ${o.bullet.src}`);
				}
			} else if (o.levelText) {
				let e = this.numberingCounter(o.id, o.level), r = e + " " + (o.start - 1), c = this.numberingRestartLevel(o);
				c != null && a(this.numberingSelector(o.id, c), r), n.push(r);
				let l = this.normalizeNumberingLevelText(o.levelText, o.format, o.rStyle), u = this.numberingMarkerRunStyle(o.rStyle, l.normalized);
				t += this.styleToString(`${s}:before`, {
					content: this.levelTextToContent(l.text, o.suff, o.id, this.numFormatToCssValue(o.format), i),
					"counter-increment": e,
					"font-family": "var(--docx-marker-font-family, inherit)",
					"font-size": "var(--docx-marker-font-size, inherit)",
					"font-style": "var(--docx-marker-font-style, inherit)",
					"font-weight": "var(--docx-marker-font-weight, inherit)",
					...u
				});
			} else c = this.numFormatToCssValue(o.format);
			t += this.styleToString(s, {
				display: "list-item",
				"list-style-position": "inside",
				"list-style-type": c,
				...o.pStyle
			});
		}
		for (let [e, n] of r) t += this.styleToString(e, { "counter-set": n.join(" ") });
		return n.length > 0 && (t += this.styleToString(this.rootSelector, { "counter-reset": n.join(" ") })), [this.h({
			tagName: "#comment",
			children: ["docxjs document numbering styles"]
		}), this.h({
			tagName: "style",
			children: [t]
		})];
	}
	renderStyles(e) {
		var t = "";
		let n = this.styleMap, r = w(e.filter((e) => e.isDefault), (e) => e.target);
		for (let s of e) {
			var i = s.styles;
			if (s.linked) {
				var a = s.linked && n[s.linked];
				a ? i = i.concat(a.styles) : this.options.debug && console.warn(`Can't find linked style ${s.linked}`);
			}
			for (let e of i) {
				var o = `${s.target ?? ""}.${s.cssName}${e.mod ?? ""}`;
				s.target != e.target && (o += ` ${e.target}`), o = this.scopeDocumentStyleSelector(o), r[s.target] == s && (o = `.${this.className} ${s.target}, ` + o), t += this.styleToString(o, e.values);
			}
		}
		return [this.h({
			tagName: "#comment",
			children: ["docxjs document styles"]
		}), this.h({
			tagName: "style",
			children: [t]
		})];
	}
	renderNotes(e, t, n, r = "footnote") {
		let i = Array.from(new Set(e)).filter((e) => t[e] && ![
			"separator",
			"continuationSeparator",
			"continuationNotice"
		].includes(t[e].noteType) && !this.renderedNoteIds.has(`${r}:${e}`));
		if (i.length === 0) return null;
		let a = this.currentPart;
		this.currentPart = n ?? a;
		try {
			let e = i.map((e) => {
				let n = this.renderElement(t[e]);
				return n.dataset.docxNoteId = e, n.dataset.docxNoteKind = r, n.dataset.docxNoteFragment = "0", this.applyNoteAssignment(n, this.noteNumbering.assignments.get(`${r}:${e}`), !1), this.renderedNoteIds.add(`${r}:${e}`), n;
			}), n = this.h({
				tagName: "ol",
				children: e
			});
			return n.dataset.docxNoteList = r, n;
		} finally {
			this.currentPart = a;
		}
	}
	formatNoteAssignment(e) {
		return Fe(e);
	}
	applyNoteAssignment(e, t, n) {
		if (!t) return;
		let r = this.formatNoteAssignment(t);
		e.dataset.docxNoteLabel = r, e.dataset.docxNoteCustom = `${t.custom}`, n ? e.childNodes?.length ? e.textContent = r : e.appendChild(this.h(r)) : (t.value != null && e.setAttribute("value", `${t.value}`), e.style.listStyleType = t.custom ? "none" : this.numFormatToCssValue(t.properties.format));
	}
	renderElement(e) {
		switch (e.type) {
			case R.Paragraph: return this.renderParagraph(e);
			case R.BookmarkStart: return this.renderBookmarkStart(e);
			case R.BookmarkEnd: return null;
			case R.Run: return this.renderRun(e);
			case R.Table: return this.renderTable(e);
			case R.Row: return this.renderTableRow(e);
			case R.Cell: return this.renderTableCell(e);
			case R.Hyperlink: return this.renderHyperlink(e);
			case R.SmartTag: return this.renderSmartTag(e);
			case R.Drawing: return this.renderAnchoredElement(e, this.renderDrawing(e));
			case R.Image: return this.renderImage(e);
			case R.Shape: return this.renderShape(e);
			case R.Chart: return this.renderChart(e);
			case R.SmartArt: return this.renderSmartArt(e);
			case R.Ink: return this.renderInk(e);
			case R.SimpleField: return this.renderSimpleField(e);
			case R.Instruction:
			case R.ComplexField: return null;
			case R.Text: return this.renderText(e);
			case R.DeletedText: return this.renderDeletedText(e);
			case R.Tab: return this.renderTab(e);
			case R.Symbol: return this.renderSymbol(e);
			case R.Break: return this.renderBreak(e);
			case R.Footer: return this.renderContainer(e, "footer");
			case R.Header: return this.renderContainer(e, "header");
			case R.Footnote:
			case R.Endnote: return this.renderContainer(e, "li");
			case R.FootnoteReference: return this.renderFootnoteReference(e);
			case R.EndnoteReference: return this.renderEndnoteReference(e);
			case R.NoBreakHyphen: return this.h("‑");
			case R.SoftHyphen: return this.h("­");
			case R.PositionalTab: return this.renderTab(e);
			case R.Ruby: return this.renderRuby(e);
			case R.RubyBase: return this.renderContainer(e, "span");
			case R.RubyText: return this.toHTML(e, Q.html, "rt");
			case R.VmlPicture: return this.renderVmlPicture(e);
			case R.VmlElement: return this.renderAnchoredElement(e, this.renderVmlElement(e));
			case R.MmlMath: return this.renderContainerNS(e, Q.mathML, "math", { xmlns: Q.mathML });
			case R.MmlMathParagraph: return this.renderMmlMathParagraph(e);
			case R.MmlFraction: return this.renderContainerNS(e, Q.mathML, "mfrac");
			case R.MmlBase: return this.renderContainerNS(e, Q.mathML, e.parent?.type == R.MmlMatrixRow ? "mtd" : "mrow");
			case R.MmlNumerator:
			case R.MmlDenominator:
			case R.MmlFunction:
			case R.MmlLimit:
			case R.MmlBox: return this.renderContainerNS(e, Q.mathML, "mrow");
			case R.MmlGroupChar: return this.renderMmlGroupChar(e);
			case R.MmlLimitLower: return this.renderContainerNS(e, Q.mathML, "munder");
			case R.MmlLimitUpper: return this.renderContainerNS(e, Q.mathML, "mover");
			case R.MmlSubSuperscript: return this.renderContainerNS(e, Q.mathML, "msubsup");
			case R.MmlPhantom: return this.renderMmlPhantom(e);
			case R.MmlBorderBox: return this.renderContainerNS(e, Q.mathML, "menclose");
			case R.MmlAccent: return this.renderMmlAccent(e);
			case R.MmlMatrix: return this.renderContainerNS(e, Q.mathML, "mtable");
			case R.MmlMatrixRow: return this.renderContainerNS(e, Q.mathML, "mtr");
			case R.MmlRadical: return this.renderMmlRadical(e);
			case R.MmlSuperscript: return this.renderContainerNS(e, Q.mathML, "msup");
			case R.MmlSubscript: return this.renderContainerNS(e, Q.mathML, "msub");
			case R.MmlDegree:
			case R.MmlSuperArgument:
			case R.MmlSubArgument: return this.renderContainerNS(e, Q.mathML, "mrow");
			case R.MmlFunctionName: return this.renderContainerNS(e, Q.mathML, "mi");
			case R.MmlDelimiter: return this.renderMmlDelimiter(e);
			case R.MmlRun: return this.renderMmlRun(e);
			case R.MmlNary: return this.renderMmlNary(e);
			case R.MmlPreSubSuper: return this.renderMmlPreSubSuper(e);
			case R.MmlBar: return this.renderMmlBar(e);
			case R.MmlEquationArray: return this.renderMllList(e);
			case R.Inserted: return this.renderInserted(e);
			case R.Deleted: return this.renderDeleted(e);
			case R.CommentRangeStart: return this.renderCommentRangeStart(e);
			case R.CommentRangeEnd: return this.renderCommentRangeEnd(e);
			case R.CommentReference: return this.renderCommentReference(e);
			case R.AltChunk: return this.renderAltChunk(e);
		}
		return null;
	}
	renderElements(e, t) {
		if (e == null) return null;
		e = this.reviewParagraphs(e);
		let n = [];
		for (let t = 0; t < e.length; t++) {
			let r = e[t].type == R.Paragraph ? e[t] : null;
			if (this.isPositionedParagraphFrame(r)) {
				let i = this.paragraphFrameKey(r), a = [r];
				for (; t + 1 < e.length;) {
					let n = e[t + 1].type == R.Paragraph ? e[t + 1] : null;
					if (!this.isPositionedParagraphFrame(n) || this.paragraphFrameKey(n) != i) break;
					a.push(n), t++;
				}
				let o = a.flatMap((e) => A(this.renderElement(e)).filter((e) => e != null)), s = this.h({
					tagName: "div",
					className: `${this.className}-paragraph-frame`,
					style: this.paragraphFrameStyle(r),
					children: o
				});
				s.dataset.docxFrameAnchor = `${r.frame.horizontalAnchor ?? "text"}/${r.frame.verticalAnchor ?? "text"}`, s.dataset.docxFrameParagraphs = `${a.length}`, n.push(s);
				continue;
			}
			let i = this.tryRenderComplexField(e, t);
			i ? (n.push(...A(i.node).filter((e) => e != null)), t = i.nextIndex - 1) : n.push(...A(this.renderElement(e[t])).filter((e) => e != null));
		}
		return t && n.forEach((e) => t.appendChild(D(e) ? document.createTextNode(e) : e)), n;
	}
	reviewParagraphs(e) {
		let t = $(this.options);
		if (t == "all") return e;
		let n = [];
		for (let r of e ?? []) {
			let e = n[n.length - 1], i = r, a = e?.props?.paragraphMarkRevisions ?? [], o = t == "original" ? a.some((e) => e.kind == "insert") : e?.props?.deletedParagraphMark;
			e?.type == R.Paragraph && r.type == R.Paragraph && o && !e.sectionProps && this.paragraphFrameKey(e) == this.paragraphFrameKey(i) ? n[n.length - 1] = {
				...i,
				children: [...e.children ?? [], ...i.children ?? []]
			} : n.push(r);
		}
		return n;
	}
	isPositionedParagraphFrame(e) {
		let t = e?.frame;
		return !!t && t.dropCap != "drop" && !!(t.width || t.height || t.horizontalPosition || t.verticalPosition || t.horizontalAlignment || t.verticalAlignment);
	}
	paragraphFrameKey(e) {
		let t = e.frame ?? {};
		return JSON.stringify([
			t.width,
			t.height,
			t.horizontalPosition,
			t.verticalPosition,
			t.horizontalAnchor,
			t.verticalAnchor,
			t.horizontalAlignment,
			t.verticalAlignment,
			t.horizontalSpace,
			t.verticalSpace,
			t.heightRule,
			t.wrap
		]);
	}
	paragraphFrameStyle(e) {
		let t = e.frame, n = {
			position: "absolute",
			boxSizing: "border-box",
			zIndex: "2"
		}, r = t.horizontalAnchor == "page", i = t.verticalAnchor == "page";
		return t.width && (n.width = t.width), t.height && (t.heightRule == "exact" ? (n.height = t.height, n.overflow = "hidden") : n.minHeight = t.height), t.horizontalPosition ? n.left = r ? `calc(${t.horizontalPosition} - var(--docx-page-padding-left, 0pt))` : t.horizontalPosition : t.horizontalAlignment == "center" ? (n.left = "50%", n.transform = "translateX(-50%)") : t.horizontalAlignment == "right" || t.horizontalAlignment == "outside" ? n.right = "0" : (t.horizontalAlignment == "left" || t.horizontalAlignment == "inside") && (n.left = "0"), t.verticalPosition ? n.top = i ? `calc(${t.verticalPosition} - var(--docx-page-padding-top, 0pt))` : t.verticalPosition : t.verticalAlignment == "center" ? (n.top = "50%", n.transform = `${n.transform ?? ""} translateY(-50%)`.trim()) : t.verticalAlignment == "bottom" || t.verticalAlignment == "outside" ? n.bottom = "0" : (t.verticalAlignment == "top" || t.verticalAlignment == "inside") && (n.top = "0"), n;
	}
	tryRenderComplexField(e, t) {
		if (!this.hasFieldChar(e[t], "begin")) return null;
		let n = 0, r = !1, i = "", a = [];
		for (let o = t; o < e.length; o++) {
			let t = e[o], s = t.type == R.Run ? {
				...t,
				fieldRun: !1,
				children: []
			} : null;
			if (t.type == R.Run) {
				for (let e of t.children ?? []) if (e.type == R.ComplexField) {
					let t = e;
					if (t.charType == "begin") n++;
					else if (t.charType == "separate" && n == 1) r = !0;
					else if (t.charType == "end" && (n--, n == 0)) return s.children.length > 0 && a.push(s), {
						node: this.renderSimpleField({
							type: R.SimpleField,
							instruction: i,
							lock: !1,
							dirty: !1,
							children: a
						}),
						nextIndex: o + 1
					};
				} else !r && n == 1 && e.type == R.Instruction ? i += e.text ?? "" : r && n > 0 && s.children.push(e);
				s.children.length > 0 && a.push(s);
			} else r && n > 0 && a.push(t);
		}
		return null;
	}
	hasFieldChar(e, t) {
		return e.type == R.Run && e.children?.some((e) => e.type == R.ComplexField && e.charType == t);
	}
	renderContainer(e, t) {
		return this.h({
			tagName: t,
			children: this.renderElements(e.children)
		});
	}
	renderContainerNS(e, t, n, r) {
		return this.h({
			ns: t,
			tagName: n,
			children: this.renderElements(e.children),
			...r
		});
	}
	effectiveParagraphTabs(e, t) {
		if (!e?.length) return t;
		if (!t?.length) return e;
		let n = [...t];
		for (let t of e) {
			let e = this.parseCssLengthValue(t.position), r = n.findIndex((t) => this.parseCssLengthValue(t.position) == e);
			r >= 0 ? n[r] = t : n.push(t);
		}
		return n.sort((e, t) => (this.parseCssLengthValue(e.position) ?? 0) - (this.parseCssLengthValue(t.position) ?? 0));
	}
	countParagraphTabs(e) {
		let t = 0, n = (e) => {
			(e.type == R.Tab || e.type == R.PositionalTab) && t++;
			for (let t of e.children ?? []) n(t);
		};
		return n(e), t;
	}
	isLeaderTabStop(e) {
		return !!e?.leader && e.leader != "none" && e.style != "clear";
	}
	resolveRenderedTabStop(e, t, n) {
		if (!e?.length) return null;
		let r = e[Math.min(t, Math.max(e.length - 1, 0))], i = [...e].reverse().find((e) => this.isLeaderTabStop(e)), a = this.findStyle(this.currentParagraph?.styleName), o = this.isTocParagraphStyle(this.currentParagraph?.styleName, a), s = !!i && !!(this.currentParagraph?.numbering ?? a?.paragraphProps?.numbering) && o;
		return i ? n <= 1 ? o || s ? i : r : t >= n - 1 ? i : this.isLeaderTabStop(r) ? e.slice(0, Math.min(t + 1, e.length)).reverse().find((e) => !this.isLeaderTabStop(e) && e.style != "clear") ?? e.find((e) => !this.isLeaderTabStop(e) && e.style != "clear") ?? null : r : r;
	}
	renderParagraph(e) {
		let t = this.findStyle(e.styleName);
		e.tabs = this.effectiveParagraphTabs(e.tabs, t?.paragraphProps?.tabs);
		let n = this.currentParagraph, r = this.currentParagraphTabIndex, i = this.currentParagraphTabCount;
		this.currentParagraph = e, this.currentParagraphTabIndex = 0, this.currentParagraphTabCount = this.countParagraphTabs(e);
		let a = this.renderElements(e.children), o = this.uniformParagraphTextScale(e, t);
		if (o != null && o != 1) {
			let n = this.effectiveParagraphCssValue(e, t, "text-indent") ?? "0pt", r = this.effectiveParagraphCssValue(e, t, "direction") == "rtl", i = this.h({
				tagName: "span",
				className: `${this.className}-text-scale`,
				style: {
					display: "block",
					font: "inherit",
					background: "none",
					border: "none",
					width: `${100 / o}%`,
					transform: `scaleX(${o})`,
					transformOrigin: r ? "right top" : "left top",
					textIndent: `calc(${n} / ${o})`
				},
				children: a
			});
			i.dataset.docxTextScale = `${o}`, a = [i];
		}
		var s = this.toHTML(e, Q.html, "p", this.wrapTabLeaderChildren(a, !0));
		if (this.applyTextBoxFontInheritance(e, t, s), this.options.exposeDisplayTargets && e.displayAddress) {
			let t = this.currentPart ?? this.document.documentPart;
			s.setAttribute("data-office-target", `${t.path}#${e.displayAddress}`);
		}
		let c = this.effectiveParagraphCssValue(e, t, "--docx-snap-to-grid");
		/^(0|false|off)$/i.test(c ?? "") && (s.style.letterSpacing = "normal"), this.currentParagraph = n, this.currentParagraphTabIndex = r, this.currentParagraphTabCount = i;
		let l = e.numbering ?? t?.paragraphProps?.numbering;
		l && s.classList.add(this.numberingClass(l.id, l.level));
		let u = t?.paragraphProps;
		(e.pageBreakBefore ?? u?.pageBreakBefore) && (s.style.breakBefore = "page", s.dataset.docxPageBreakBefore = "true"), (e.keepLines ?? u?.keepLines) && (s.style.breakInside = "avoid", s.dataset.docxKeepLines = "true"), (e.keepNext ?? u?.keepNext) && (s.style.breakAfter = "avoid", s.dataset.docxKeepNext = "true"), (e.widowControl ?? u?.widowControl) && (s.style.orphans = "2", s.style.widows = "2", s.dataset.docxWidowControl = "true"), this.applyDocumentGridLinePitch(e, t, s), this.compatibleTextBoxSpacing && this.setCssStyle(s, "text-autospace", this.textBoxAutospace(e, t));
		let d = (e.lineSpacing ?? t?.paragraphProps?.lineSpacing)?.lineRule;
		this.compatibleTextBoxSpacing && ["lines", "linesAndChars"].includes(this.currentSectionProps?.docGrid?.type) && this.paragraphUsesDocumentGrid(e, t) && d != "exact" && d != "exactly" && (s.dataset.docxTextboxGridPitch = this.currentSectionProps.docGrid.linePitch, s.dataset.docxTextboxBaseLineHeight = s.style.lineHeight ?? "", s.style.flexShrink = "0");
		let f = e.tabs?.find((e) => this.isLeaderTabStop(e));
		return f && (s.classList.add(`${this.className}-tab-leader-paragraph`), s.dataset.docxHasTabLeader = "true", s.dataset.docxTabLeader = f.leader, s.dataset.docxTabAlign = f.style), this.isTocParagraphStyle(e.styleName, t) && (s.classList.add(`${this.className}-toc-paragraph`), s.dataset.docxTocEntry = "true"), this.hasParagraphRelativeAnchor(e) && (s.style.position && s.style.position != "static" || (s.style.position = "relative"), s.dataset.docxAnchorContext = "paragraph"), e.props?.anchorId && (s.id = e.props.anchorId, s.setAttribute("id", e.props.anchorId)), s;
	}
	uniformParagraphTextScale(e, t) {
		if (e.numbering || t?.paragraphProps?.numbering || e.frame || this.effectiveParagraphCssValue(e, t, "writing-mode")) return null;
		let n = "--docx-text-scale", r = e.cssStyle?.[n] ?? this.styleValue(t, "span", n) ?? this.styleValue(t, "p", n) ?? "1", i = null, a = (e, t) => {
			let r = e.cssStyle?.[n] ?? this.styleValue(this.findStyle(e.styleName), "span", n) ?? t;
			switch (e.type) {
				case R.Text:
				case R.DeletedText:
					if (!e.text) return !0;
					let t = Number(r);
					return !Number.isFinite(t) || t <= 0 || t > 6 || i != null && i != t ? !1 : (i = t, !0);
				case R.Run:
				case R.Hyperlink:
				case R.SmartTag:
				case R.Inserted:
				case R.Deleted: return (e.children ?? []).every((e) => a(e, r));
				case R.BookmarkStart:
				case R.BookmarkEnd:
				case R.CommentRangeStart:
				case R.CommentRangeEnd:
				case R.NoBreakHyphen:
				case R.SoftHyphen: return !0;
				case R.Break: return ["line", "textWrapping"].includes(e.break);
				default: return !1;
			}
		};
		return (e.children ?? []).every((e) => a(e, r)) ? i : null;
	}
	hasParagraphRelativeAnchor(e) {
		return (e.children ?? []).some((e) => (e.type == R.Drawing || e.type == R.VmlElement) && e.cssStyle?.position == "absolute" || this.hasParagraphRelativeAnchor(e));
	}
	renderAnchoredElement(e, t) {
		if (t.dataset.docxDrawing = "true", e.cssStyle?.position != "absolute" || !e.props?.anchorPosition) return t;
		let n = e.props.anchorPosition, r = {
			...n,
			horizontal: {
				...n.horizontal,
				offset: n.horizontal.offset ?? (t.style.left || "0pt")
			},
			vertical: {
				...n.vertical,
				offset: n.vertical.offset ?? (t.style.top || "0pt")
			}
		}, i = `${this.anchorLayouts.size}`;
		this.anchorLayouts.set(i, r), t.dataset.docxAnchorId = i, t.dataset.docxLayoutInCell = `${n.layoutInCell !== !1}`;
		let a = (e) => /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(e) ? `${e}pt` : e;
		t.style.left = `calc(${a(r.horizontal.offset)} + var(--docx-anchor-origin-x, 0px))`, t.style.top = `calc(${a(r.vertical.offset)} + var(--docx-anchor-origin-y, 0px))`;
		let o = ["top", "bottom"].map((e) => {
			let t = this.h({
				tagName: "span",
				style: {
					display: "inline-block",
					width: "0px",
					height: "0px",
					padding: "0px",
					border: "0px",
					verticalAlign: e
				}
			});
			return t.dataset.docxAnchorLine = e, t;
		}), s = this.h({
			tagName: "span",
			children: o
		});
		s.dataset.docxAnchorMarker = "true", s.setAttribute("aria-hidden", "true");
		let c = this.h({
			tagName: "span",
			children: [s, t]
		});
		return c.dataset.docxDrawing = "true", c;
	}
	refreshAnchors(e) {
		gi(e, this.className, (e) => this.ownsLayoutElement(e));
		for (let t of Array.from(e.querySelectorAll("[data-docx-anchor-id]"))) {
			if (!this.ownsLayoutElement(t)) continue;
			let e = this.anchorLayouts.get(t.dataset.docxAnchorId);
			e && mi(t, e, this.className);
		}
	}
	ownsLayoutElement(e) {
		for (let t = e; t; t = t.parentElement) {
			let e = Na.get(t);
			if (e) return e == this;
		}
		return !0;
	}
	textBoxGridLineHeight(e, t) {
		return !Number.isFinite(e) || !Number.isFinite(t) || e < 0 || t <= 0 ? null : Math.max(1, Math.ceil((e - 1 / 64) / t)) * t;
	}
	refreshTextBoxLineGrid(e) {
		let t = e.ownerDocument?.defaultView, n = Array.from(e.querySelectorAll("[data-docx-textbox-grid-pitch]")).filter((e) => this.ownsLayoutElement(e));
		if (!t || !n.length) return;
		let r = e.ownerDocument.createElement("span");
		Object.assign(r.style, {
			position: "absolute",
			visibility: "hidden",
			pointerEvents: "none",
			display: "inline-block",
			whiteSpace: "pre",
			width: "max-content",
			margin: "0",
			padding: "0",
			border: "0",
			minHeight: "0"
		}), r.setAttribute("aria-hidden", "true");
		let i = e.getRootNode();
		(i.nodeType == 11 && "host" in i ? i : e.ownerDocument.body).appendChild(r);
		let a = (e, n, r = "normal") => {
			let i = t.getComputedStyle(n);
			Object.assign(e.style, {
				fontFamily: i.fontFamily,
				fontSize: i.fontSize,
				fontWeight: i.fontWeight,
				fontStyle: i.fontStyle,
				fontStretch: i.fontStretch,
				verticalAlign: i.verticalAlign,
				lineHeight: r
			});
		};
		try {
			for (let i of n) {
				if (i.querySelector("svg, img, table, math, [data-docx-drawing]")) continue;
				this.preserveGridInlineMetrics(i), r.style.height = i.dataset.docxTextboxGridPitch;
				let n = parseFloat(t.getComputedStyle(r).height);
				a(r, i, i.dataset.docxTextboxBaseLineHeight || "normal"), r.style.height = "auto", r.replaceChildren();
				let o = e.ownerDocument.createTreeWalker(i, 4);
				for (; o.nextNode();) {
					let t = o.currentNode, n = t.parentElement;
					if (!t.textContent || !n || !Array.from(n.getClientRects()).some((e) => e.width > 0 && e.height > 0)) continue;
					let s = n == i ? i.dataset.docxTextboxBaseLineHeight : n.style.lineHeight, c = e.ownerDocument.createElement("span");
					a(c, n, s || "normal"), c.style.whiteSpace = "pre", c.textContent = t.textContent.replace(/[\r\n]/g, " "), r.appendChild(c);
				}
				r.hasChildNodes() || (r.textContent = "\xA0");
				let s = parseFloat(t.getComputedStyle(r).height), c = this.textBoxGridLineHeight(s, n);
				c != null && (i.style.lineHeight = `${Math.round(c * 1e3) / 1e3}px`);
			}
		} finally {
			r.remove();
		}
	}
	async prepareLayout(e, t = s(e)) {
		if (e.isConnected && t.isCurrent() && (this.layoutGenerations.has(t.signal) || (this.layoutGenerations.set(t.signal, t), t.signal.addEventListener("abort", () => this.layoutGenerations.delete(t.signal), { once: !0 })), await this.yieldToBrowser(), e.isConnected && t.isCurrent())) {
			if (this.commentLayer && (Na.set(this.commentLayer.root, this), !this.commentLayer.root.parentElement)) {
				let t = [e, ...Array.from(e.querySelectorAll("[data-docx-layout-root]"))].find((e) => Na.get(e) === this && e.classList.contains(`${this.className}-wrapper`));
				t || (this.commentLayer.root.style.position = "fixed"), (t ?? e).appendChild(this.commentLayer.root);
			}
			this.refreshTextBoxLineGrid(e), this.refreshTabStops(e), this.refreshAnchors(e), await this.commentLayer?.bind(e, t);
		}
	}
	disposeLayout() {
		for (let e of Array.from(this.layoutGenerations.values())) e.cancel();
		this.layoutGenerations.clear(), this.commentLayer?.root.remove();
		let e = globalThis.CSS?.highlights;
		e && this.commentHighlight && e.get(`${this.className}-comments`) === this.commentHighlight && e.delete(`${this.className}-comments`);
	}
	renderHyperlink(e) {
		let t = this.renderHyperlinkChildren(e.children), n = this.h(this.toH(e, Q.html, "a", this.wrapTabLeaderChildren(t))), r = "", i = !1;
		return e.id && (r = (this.currentPart ?? this.document.documentPart)?.rels?.find((t) => t.id == e.id && t.targetMode === "External")?.target ?? r, i = !!r), !r && e.anchor && (r = `#${e.anchor}`), this.applyHyperlinkTarget(n, r, i), n;
	}
	renderHyperlinkChildren(e) {
		this.hyperlinkDepth++;
		try {
			return this.renderElements(e);
		} finally {
			this.hyperlinkDepth--;
		}
	}
	applyHyperlinkTarget(e, t, n) {
		let r = ka(t);
		r && (n && this.options.externalLinkPolicy == "block" ? (e.setAttribute("data-docx-external-href", r), e.setAttribute("aria-disabled", "true")) : e.setAttribute("href", r));
	}
	wrapTabLeaderChildren(e, t = !1) {
		if (!e?.length || e.some((e) => this.hasCssClass(e, `${this.className}-tab-leader-title`))) return e;
		let n = -1;
		for (let t = e.length - 1; t >= 0; t--) if (this.isTabLeaderNode(e[t])) {
			n = t;
			break;
		}
		if (n < 0) return this.wrapLiteralLeaderChildren(e, t) ?? e;
		let r = e.slice(0, n), i = e[n], a = e.slice(n + 1);
		this.addCssClass(i, `${this.className}-tab-leader-fill`);
		let o = [
			this.h({
				tagName: "span",
				className: `${this.className}-tab-leader-title`,
				children: r
			}),
			i,
			this.h({
				tagName: "span",
				className: `${this.className}-tab-leader-page`,
				children: a
			})
		];
		return t ? [this.h({
			tagName: "span",
			className: `${this.className}-tab-leader-line`,
			children: o
		})] : o;
	}
	wrapLiteralLeaderChildren(e, t = !1) {
		let n = this.findLastTextualNodeIndex(e);
		if (n < 0) return null;
		let r = e[n], i = this.nodeTextContent(r), a = /^(.*?)([.\u2026\u00b7\u2022\u2027\u2219\u22c5]{6,})(\s*[0-9０-９IVXLCDMivxlcdm]+)\s*$/.exec(i);
		if (!a) return null;
		let [, o, s, c] = a, l = e.slice(0, n), u = e.slice(n + 1), d = [...l];
		o && d.push(this.cloneTextNodeWithText(r, o));
		let f = this.h({
			tagName: "span",
			className: `${this.tabStopClass()} ${this.className}-tab-leader-fill`,
			children: ["\xA0"],
			style: this.nodeStyleObject(r)
		});
		f.dataset.docxTab = "true", f.dataset.docxTabLeader = this.literalLeaderKind(s), f.dataset.docxLiteralLeader = "true";
		let p = [
			this.h({
				tagName: "span",
				className: `${this.className}-tab-leader-title`,
				children: d
			}),
			f,
			this.h({
				tagName: "span",
				className: `${this.className}-tab-leader-page`,
				children: [this.cloneTextNodeWithText(r, c.trim()), ...u]
			})
		];
		return t ? [this.h({
			tagName: "span",
			className: `${this.className}-tab-leader-line ${this.className}-literal-leader-line`,
			children: p
		})] : p;
	}
	findLastTextualNodeIndex(e) {
		for (let t = e.length - 1; t >= 0; t--) if (this.nodeTextContent(e[t]).trim()) return t;
		return -1;
	}
	literalLeaderKind(e) {
		return /^[.\u2026]+$/.test(e) ? "dot" : "middleDot";
	}
	cloneTextNodeWithText(e, t) {
		return this.nodeElementName(e) ? this.h({
			tagName: this.nodeElementName(e),
			className: this.nodeClassName(e),
			style: this.nodeStyleObject(e),
			children: [t]
		}) : this.h({
			tagName: "span",
			children: [t]
		});
	}
	nodeElementName(e) {
		let t = e, n = t?.tagName ?? t?.nodeName;
		return n && !String(n).startsWith("#") ? String(n).toLowerCase() : "";
	}
	nodeStyleObject(e) {
		let t = e?.style, n = {};
		if (!t) return n;
		if (typeof t.length == "number" && typeof t.getPropertyValue == "function") for (let e = 0; e < t.length; e++) {
			let r = t.item(e), i = t.getPropertyValue(r);
			i && (n[r] = i);
		}
		else for (let [e, r] of Object.entries(t)) r != null && r !== "" && (n[e] = String(r));
		return n;
	}
	nodeTextContent(e) {
		let t = e;
		return t ? typeof t.textContent == "string" ? t.textContent : typeof t.text == "string" ? t.text : Array.from(t.children ?? t.childNodes ?? []).map((e) => this.nodeTextContent(e)).join("") : "";
	}
	isTabLeaderNode(e) {
		let t = this.nodeDatasetValue(e, "docxTabLeader");
		return this.hasCssClass(e, this.tabStopClass()) && !!t && t != "none";
	}
	nodeDatasetValue(e, t) {
		let n = e, r = n?.dataset?.[t];
		if (r != null) return String(r);
		let i = "data-" + t.replace(/[A-Z]/g, (e) => "-" + e.toLowerCase());
		return typeof n?.getAttribute == "function" ? n.getAttribute(i) : n?.attributes?.[i];
	}
	hasCssClass(e, t) {
		let n = e;
		return !n || !t ? !1 : typeof n.classList?.contains == "function" ? n.classList.contains(t) : this.nodeClassName(n).split(/\s+/).includes(t);
	}
	addCssClass(e, t) {
		let n = e;
		if (!n || !t || this.hasCssClass(e, t)) return;
		if (typeof n.classList?.add == "function") {
			n.classList.add(t);
			return;
		}
		let r = Yi(this.nodeClassName(n), t);
		typeof n.setAttribute == "function" ? n.setAttribute("class", r) : (n.attributes ??= {}, n.attributes.class = r);
	}
	nodeClassName(e) {
		return typeof e?.className == "string" ? e.className : typeof e?.className?.baseVal == "string" ? e.className.baseVal : typeof e?.getAttribute == "function" ? e.getAttribute("class") ?? "" : e?.attributes?.class ?? "";
	}
	renderSmartTag(e) {
		return this.renderContainer(e, "span");
	}
	renderCommentRangeStart(e) {
		if (!this.options.renderComments) return null;
		let t = typeof Range > "u" ? null : new Range();
		t && this.commentHighlight?.add(t);
		let n = this.h({
			tagName: "#comment",
			children: ["start of DOCX comment"]
		});
		return t && (this.later(() => t.setStart(n, 0)), this.commentMap[e.id] = t), n;
	}
	renderCommentRangeEnd(e) {
		if (!this.options.renderComments) return null;
		let t = this.commentMap[e.id], n = this.document.commentsPart?.commentMap[e.id], r = this.h({
			tagName: "span",
			className: `${this.className}-comment-anchor`
		});
		return r.dataset.docxChangeKind = "comment", r.dataset.docxChangeId = `${e.id}`, r.setAttribute("aria-hidden", "true"), r.style.setProperty("--docx-review-color", Sa(n?.author)), n?.author && (r.dataset.docxChangeAuthor = n.author), n?.date && (r.dataset.docxChangeDate = n.date), this.later(() => t?.setEnd(r, 0)), r;
	}
	renderCommentReference(t) {
		if (!this.options.renderComments || this.renderingComment) return null;
		let n = this.document.commentsPart?.commentMap[t.id];
		if (!n) return null;
		this.commentLayer ||= new ii(this.className, () => this.h({
			tagName: "div",
			className: `${this.className} ${this.className}-comment-layer`
		}), (e) => {
			this.refreshTabStops(e), this.refreshAnchors(e);
		});
		let r = `${n.id}`, i = this.h({
			tagName: "span",
			className: `${this.className}-comment-ref`,
			children: ["💬"]
		});
		i.dataset.docxChangeKind = "comment", i.dataset.docxChangeId = r, i.style.setProperty("--docx-review-color", Sa(n.author)), n.author && (i.dataset.docxChangeAuthor = n.author), n.date && (i.dataset.docxChangeDate = n.date), this.hyperlinkDepth || i.setAttribute("tabindex", "0"), i.setAttribute("role", "note"), i.setAttribute("aria-label", n.author ? `Comment by ${n.author}` : "Comment"), i.setAttribute("aria-expanded", "false");
		let a = this.commentPresentations.get(r);
		if (!a) {
			let t = `${this.className}-comment-${++e.nextCommentId}`, o = this.h({
				tagName: "summary",
				children: ["💬"]
			});
			o.setAttribute("aria-label", n.author ? `Comment by ${n.author}` : "Comment");
			let s = n.date ? new Date(n.date) : null, c = this.h({
				tagName: "article",
				children: this.renderCommentContent(n)
			});
			c.dataset.docxCommentStory = "true";
			let l = this.h({
				tagName: "div",
				className: `${this.className}-comment-body`,
				children: [
					this.h({
						tagName: "div",
						className: `${this.className}-comment-author`,
						children: [n.author ?? ""]
					}),
					this.h({
						tagName: "div",
						className: `${this.className}-comment-date`,
						children: [s && Number.isFinite(s.getTime()) ? s.toLocaleString() : n.date ?? ""]
					}),
					c
				]
			});
			l.setAttribute("id", t), l.setAttribute("role", "note");
			let u = this.h({
				tagName: "details",
				className: `${this.className}-comment-popover`,
				children: [o, l]
			});
			u.dataset.docxCommentPopup = t, Object.assign(u.dataset, {
				docxChangeKind: "comment",
				docxChangeId: r
			}), n.author && (u.dataset.docxChangeAuthor = n.author), n.date && (u.dataset.docxChangeDate = n.date), a = {
				key: t,
				descriptionId: t,
				reference: i,
				references: [],
				popup: u,
				summary: o,
				body: l,
				revision: 0,
				open: !1
			}, this.commentLayer.add(a), this.commentPresentations.set(r, a);
		}
		return i.dataset.docxCommentReference = a.key, a.references.push(i), i.setAttribute("aria-describedby", a.descriptionId), i.setAttribute("aria-controls", a.descriptionId), i;
	}
	cloneRenderData(e, t = /* @__PURE__ */ new Map()) {
		if (!e || typeof e != "object") return e;
		if (t.has(e)) return t.get(e);
		let n = Array.isArray(e) ? [] : Object.create(Object.getPrototypeOf(e));
		t.set(e, n);
		for (let r of Object.keys(e)) r !== "parent" && Object.defineProperty(n, r, {
			value: this.cloneRenderData(e[r], t),
			writable: !0,
			enumerable: !0,
			configurable: !0
		});
		return n;
	}
	renderCommentContent(e) {
		let t = {
			part: this.currentPart,
			paragraph: this.currentParagraph,
			index: this.currentParagraphTabIndex,
			count: this.currentParagraphTabCount,
			rendering: this.renderingComment
		};
		this.currentPart = this.document.commentsPart, this.currentParagraph = null, this.renderingComment = !0;
		try {
			let t = this.cloneRenderData(e);
			return this.processElement(t), this.renderElements(t.children) ?? [];
		} finally {
			this.currentPart = t.part, this.currentParagraph = t.paragraph, this.currentParagraphTabIndex = t.index, this.currentParagraphTabCount = t.count, this.renderingComment = t.rendering;
		}
	}
	renderAltChunk(e) {
		if (!this.options.renderAltChunks) return null;
		var t = this.h({
			tagName: "iframe",
			sandbox: "",
			referrerPolicy: "no-referrer",
			loading: "lazy"
		});
		return this.tasks.push(this.document.loadAltChunk(e.id, this.currentPart).then((e) => {
			pe(t, e);
		})), t;
	}
	renderDrawing(e) {
		e.cssStyle?.["shape-outside"] && (e.className = Yi(e.className, `${this.className}-float-wrap`));
		var t = this.toHTML(e, Q.html, this.currentParagraph ? "span" : "div");
		(e.cssStyle?.float || e.cssStyle?.position == "absolute") && (t.dataset.docxFloat = "true");
		let n = e.props?.anchorPosition;
		n?.vertical?.relative && (t.dataset.docxAnchorVertical = n.vertical.relative), n?.horizontal?.relative && (t.dataset.docxAnchorHorizontal = n.horizontal.relative), t.style.display || (t.style.display = "inline-block"), t.style.position || (t.style.position = "relative"), t.style.textIndent = "0px";
		for (let e of Array.from(t.children ?? [])) e.style.verticalAlign = "top";
		return t;
	}
	renderImage(e) {
		let t = e.srcRect, n = t ? 1 - t[0] - t[2] : 1, r = t ? 1 - t[1] - t[3] : 1, i = t?.length === 4 && t.some((e) => e !== 0) && t.every(Number.isFinite) && n > 0 && r > 0 && Number.isFinite(100 / n) && Number.isFinite(100 / r), a = this.toHTML(e, Q.html, i ? "span" : "img", []), o = i ? this.h({ tagName: "img" }) : a, s = e.cssStyle?.transform;
		return e.alt && (o.alt = e.alt), e.title && (o.title = e.title), i && (a.setAttribute("data-docx-image-crop", "true"), a.style.overflow = "hidden", a.style.position = "relative", Object.assign(o.style, {
			position: "absolute",
			display: "block",
			margin: "0",
			left: `${-100 * t[0] / n}%`,
			top: `${-100 * t[1] / r}%`,
			width: `${100 / n}%`,
			height: `${100 / r}%`,
			maxWidth: "none",
			maxHeight: "none",
			objectFit: "fill"
		}), a.appendChild(o)), e.rotation && (s = `rotate(${e.rotation}deg) ${s ?? ""}`), a.style.transform = s?.trim(), this.document && e.src && this.tasks.push(this.document.loadDocumentImage(e.src, this.currentPart, this.options.externalResourcePolicy).then((e) => {
			e && o.setAttribute("src", e);
		})), a;
	}
	renderShape(e) {
		if (e.props?.dmlSvg) return this.renderDmlSvgShape(e);
		let t = e.props?.dmlTextBox ? [this.renderDmlTextBox(e)] : null, n = this.toHTML(e, Q.html, this.currentParagraph ? "span" : "div", t);
		return n.style.display || (n.style.display = "inline-block"), e.title && (n.title = e.title), e.alt && (n.setAttribute("role", "img"), n.setAttribute("aria-label", e.alt)), n;
	}
	renderDmlTextBox(e) {
		let t = this.currentParagraph, n = this.compatibleTextBoxSpacing;
		this.currentParagraph = null, this.compatibleTextBoxSpacing = e.props?.textCompatibleLineSpacing === !0;
		let r;
		try {
			r = this.renderElements(e.children);
		} finally {
			this.currentParagraph = t, this.compatibleTextBoxSpacing = n;
		}
		let i = this.h({
			tagName: "div",
			className: `${this.className}-shape-textbox`,
			style: {
				"box-sizing": "border-box",
				display: "flex",
				"flex-direction": "column",
				"justify-content": e.props?.textVerticalAlign ?? "flex-start",
				"align-items": "stretch",
				width: "100%",
				height: "100%",
				overflow: "hidden",
				...e.props?.textInsets ?? {}
			},
			children: r
		});
		i.dataset.docxShapeTextbox = "true", i.setAttribute("xmlns", Q.html);
		let a = this.createSvgElement("svg", { style: {
			width: "100%",
			height: "100%",
			display: "block",
			overflow: "hidden"
		} });
		a.setAttribute("focusable", "false");
		let o = this.createSvgElement("foreignObject");
		return o.setAttribute("width", "100%"), o.setAttribute("height", "100%"), o.appendChild(i), a.appendChild(o), a;
	}
	renderDmlSvgShape(e) {
		let t = this.createSvgElement("svg", { style: e.cssStyle }), n = e.props ?? {};
		t.setAttribute("viewBox", n.viewBox ?? "0 0 1 1"), t.setAttribute("preserveAspectRatio", "none"), t.setAttribute("focusable", "false"), e.title && t.appendChild(this.createSvgElement("title", null, [e.title])), e.alt && (t.setAttribute("role", "img"), t.setAttribute("aria-label", e.alt));
		let r = this.createSvgElement("path");
		return r.setAttribute("d", n.pathD ?? ""), r.setAttribute("fill", this.darkenColorAttr(n.fill ?? "none")), r.setAttribute("stroke", this.darkenColorAttr(n.stroke ?? "none")), r.setAttribute("stroke-width", n.strokeWidth ?? "0"), r.setAttribute("stroke-linejoin", "round"), r.setAttribute("stroke-linecap", "round"), n.strokeDasharray && r.setAttribute("stroke-dasharray", n.strokeDasharray), t.appendChild(r), t;
	}
	renderChart(e) {
		var t;
		let n = this.toHTML(e, Q.html, this.currentParagraph ? "span" : "div", []);
		if ((t = n.style).display || (t.display = "block"), n.className = Yi(n.className, `${this.className}-chart`), e.title && (n.title = e.title), e.alt && (n.setAttribute("role", "img"), n.setAttribute("aria-label", e.alt)), n.appendChild(this.renderGraphicLoading("Chart")), e.id) {
			let t = this.currentPart;
			this.tasks.push(this.document.loadRelationshipXml(e.id, t).then((e) => {
				n.textContent = "", n.appendChild(e ? this.renderChartSvg(e) : this.renderGraphicLoading("Chart"));
			}).catch(() => {
				n.textContent = "", n.appendChild(this.renderGraphicLoading("Chart"));
			}));
		}
		return n;
	}
	renderSmartArt(e) {
		var t;
		let n = this.toHTML(e, Q.html, this.currentParagraph ? "span" : "div", []);
		if ((t = n.style).display || (t.display = "block"), n.className = Yi(n.className, `${this.className}-smartart`), e.title && (n.title = e.title), e.alt && (n.setAttribute("role", "img"), n.setAttribute("aria-label", e.alt)), n.appendChild(this.renderGraphicLoading("SmartArt")), e.dataId) {
			let t = this.currentPart;
			this.tasks.push(this.document.loadRelationshipXml(e.dataId, t).then((e) => {
				n.textContent = "", n.appendChild(e ? this.renderSmartArtSvg(e) : this.renderGraphicLoading("SmartArt"));
			}).catch(() => {
				n.textContent = "", n.appendChild(this.renderGraphicLoading("SmartArt"));
			}));
		}
		return n;
	}
	renderInk(e) {
		var t;
		let n = this.toHTML(e, Q.html, this.currentParagraph ? "span" : "div", []);
		if ((t = n.style).display || (t.display = "block"), n.className = Yi(n.className, `${this.className}-ink`), e.title && (n.title = e.title), e.alt && (n.setAttribute("role", "img"), n.setAttribute("aria-label", e.alt)), n.appendChild(this.renderGraphicLoading("Ink")), e.id) {
			let t = this.currentPart;
			this.tasks.push(this.document.loadRelationshipText(e.id, t).then((r) => {
				if (n.textContent = "", r?.trim().startsWith("<")) try {
					n.appendChild(this.renderInkSvg(he(r, !0)));
					return;
				} catch {}
				return this.document.loadRelationshipBlobUrl(e.id, t, this.options.externalResourcePolicy).then((t) => {
					n.textContent = "", t ? n.appendChild(this.h({
						tagName: "img",
						src: t,
						alt: e.alt ?? "Ink",
						style: {
							width: "100%",
							height: "100%",
							objectFit: "contain"
						}
					})) : n.appendChild(this.renderGraphicLoading("Ink"));
				});
			}).catch(() => {
				n.textContent = "", n.appendChild(this.renderGraphicLoading("Ink"));
			}));
		}
		return n;
	}
	renderGraphicLoading(e) {
		return this.h({
			tagName: "span",
			style: {
				display: "inline-flex",
				"align-items": "center",
				"justify-content": "center",
				width: "100%",
				height: "100%",
				"min-width": "2in",
				"min-height": "1in",
				border: "1px solid currentColor"
			},
			children: [`[${e}]`]
		});
	}
	renderChartSvg(e) {
		let t = e.documentElement, n = this.detectChartType(t), r = this.parseChartSeries(t, n), i = this.createSvgElement("svg", { style: {
			width: "100%",
			height: "100%",
			display: "block"
		} });
		i.setAttribute("viewBox", "0 0 640 360"), i.setAttribute("preserveAspectRatio", "xMidYMid meet");
		let a = this.extractChartTitle(t);
		if (a) {
			let e = this.svgText(a, 320, 24, "middle", "14px", "bold");
			e.setAttribute("data-docx-chart-title", "true"), i.appendChild(e);
		}
		if (!r.length || r.every((e) => !e.values.length)) return i.appendChild(this.svgText("Chart", 320, 180, "middle", "18px")), i;
		let o = t.localName == "chart" ? t : this.chartChild(t, "chart"), s = this.chartChild(o, "plotArea"), c = this.chartChildren(s).filter((e) => e.localName.endsWith("Chart"));
		if (c.length > 1 && c.every((e) => {
			let n = this.resolveChartAxes(t, e.localName, e), r = this.chartChild(e, "barDir")?.getAttribute("val"), i = this.chartChild(e, "grouping")?.getAttribute("val");
			return n?.category && n.value && ["barChart", "lineChart"].includes(e.localName) && (!r || r == "col") && !["stacked", "percentStacked"].includes(i);
		})) return this.drawCombinedChartAxes(i, t, c), i;
		let l = this.resolveChartAxes(t, n);
		return n == "lineChart" && l?.category?.localName == "dateAx" ? this.drawDateLineChart(i, r, l, { seriesNodes: this.chartChildren(this.chartChild(s, n), "ser") }) : n == "pieChart" || n == "doughnutChart" ? this.drawPieChart(i, r[0]) : [
			"lineChart",
			"scatterChart",
			"areaChart"
		].includes(n) ? this.drawLineChart(i, r, n == "areaChart") : this.drawBarChart(i, r), this.drawChartAxisTitles(i, l), i;
	}
	chartChildren(e, t) {
		return Array.from(e?.childNodes ?? []).filter((e) => e.nodeType == 1 && ja.includes(e.namespaceURI) && (!t || e.localName == t));
	}
	chartChild(e, t) {
		return this.chartChildren(e, t)[0] ?? null;
	}
	chartDescendant(e, t) {
		return e ? Array.from(e.getElementsByTagName("*")).find((e) => e.localName == t && ja.includes(e.namespaceURI)) ?? null : null;
	}
	detectChartType(e) {
		return [
			"barChart",
			"bar3DChart",
			"lineChart",
			"pieChart",
			"doughnutChart",
			"areaChart",
			"scatterChart",
			"ofPieChart",
			"radarChart"
		].find((t) => e.localName == t && ja.includes(e.namespaceURI) || this.chartDescendant(e, t)) ?? "barChart";
	}
	parseChartSeries(e, t) {
		let n = e.localName == t && ja.includes(e.namespaceURI) ? e : this.chartDescendant(e, t);
		return this.chartChildren(n, "ser").map((e, t) => {
			let n = this.chartCacheValues(this.chartChild(e, "cat") ?? this.chartChild(e, "xVal")), r = this.chartCacheValues(this.chartChild(e, "val") ?? this.chartChild(e, "yVal")).map((e) => e.trim() && Number.isFinite(Number(e)) ? Number(e) : NaN);
			return {
				name: this.chartText(this.chartChild(e, "tx")) || `Series ${t + 1}`,
				categories: n.length ? n : r.map((e, t) => `${t + 1}`),
				values: r
			};
		});
	}
	chartCacheValues(e) {
		if (!e) return [];
		let t = [
			"strCache",
			"numCache",
			"strLit",
			"numLit"
		].map((t) => this.chartDescendant(e, t)).find(Boolean) ?? e, n = 2e4, r = this.chartChild(t, "ptCount")?.getAttribute("val") ?? "", i = /^\d+$/.test(r) ? Math.min(Number(r), n) : 0, a = [];
		for (let e of this.chartChildren(t, "pt")) {
			let t = e.getAttribute("idx") ?? "";
			if (!/^\d+$/.test(t)) continue;
			let r = Number(t);
			!Number.isSafeInteger(r) || r >= n || (i = Math.max(i, r + 1), a.push({
				index: r,
				value: this.chartChild(e, "v")?.textContent ?? ""
			}));
		}
		let o = Array(i).fill(""), s = /* @__PURE__ */ new Set();
		for (let e of a) s.has(e.index) || (o[e.index] = e.value), s.add(e.index);
		return o;
	}
	chartText(e) {
		if (!e) return "";
		let t = this.chartCacheValues(e);
		return t.length ? t.join(" ") : Array.from(e.getElementsByTagName("*")).filter((e) => e.localName == "t" && Ma.includes(e.namespaceURI)).map((e) => e.textContent).filter(Boolean).join(" ").trim() || this.chartDescendant(e, "v")?.textContent?.trim() || "";
	}
	chartNumber(e, t) {
		let n = this.chartChild(e, t)?.getAttribute("val");
		return n != null && n.trim() && Number.isFinite(Number(n)) ? Number(n) : null;
	}
	chartBoolean(e) {
		return !!e && ![
			"0",
			"false",
			"off"
		].includes((e.getAttribute("val") ?? "1").toLowerCase());
	}
	chartTitleText(e) {
		let t = this.chartChild(this.chartChild(e, "tx"), "rich");
		return t ? Array.from(t.childNodes).filter((e) => e.nodeType == 1 && e.localName == "p" && Ma.includes(e.namespaceURI)).map((e) => Array.from(e.getElementsByTagNameNS(e.namespaceURI, "t")).map((e) => e.textContent ?? "").join("")).join("\n") : this.chartText(e);
	}
	extractChartTitle(e) {
		let t = e.localName == "chart" ? e : this.chartChild(e, "chart");
		return this.chartTitleText(this.chartChild(t, "title"));
	}
	resolveChartAxes(e, t, n) {
		let r = e.localName == "chart" ? e : this.chartChild(e, "chart"), i = this.chartChild(r, "plotArea"), a = n ?? this.chartChild(i, t);
		if (!a) return null;
		let o = this.chartChildren(a, "axId").map((e) => e.getAttribute("val")), s = this.chartChildren(i).filter((e) => /^(catAx|dateAx|valAx)$/.test(e.localName) && o.includes(this.chartChild(e, "axId")?.getAttribute("val"))), c = s.find((e) => e.localName == "dateAx") ?? s.find((e) => e.localName == "catAx") ?? null;
		return {
			category: c,
			value: s.find((e) => e.localName == "valAx" && (!c || this.chartChild(c, "crossAx")?.getAttribute("val") == this.chartChild(e, "axId")?.getAttribute("val"))) ?? s.find((e) => e.localName == "valAx") ?? null,
			date1904: this.chartBoolean(this.chartChild(e, "date1904"))
		};
	}
	chartValueBounds(e) {
		let t = 0, n = 0;
		for (let r of e) for (let e of r.values) Number.isFinite(e) && (t = Math.min(t, e), n = Math.max(n, e));
		return {
			min: t,
			max: t == n ? t + 1 : n
		};
	}
	drawCategoryLabels(e, t, n, r) {
		let i = t.map((e, t) => ({
			text: e,
			index: t
		})).filter((e) => e.text.trim());
		if (!i.length) return;
		let a = i[i.length - 1], o = n(a.index) - this.chartLegendTextWidth(a.text) / 2, s = -Infinity;
		i.forEach((t, a) => {
			let c = n(t.index), l = this.chartLegendTextWidth(t.text) / 2;
			if (a > 0 && a < i.length - 1 && (c - l < s + 3 || c + l + 3 > o)) return;
			let u = this.svgText(t.text, c, r, "middle", "10px");
			u.setAttribute("data-docx-chart-category-index", `${t.index}`), e.appendChild(u), s = c + l;
		});
	}
	drawBarChart(e, t) {
		let n = t[0]?.categories ?? [], r = Math.max(1, n.length, ...t.map((e) => e.values.length)), i = this.chartValueBounds(t), a = (e) => 300 - (e - i.min) / (i.max - i.min) * 230, o = a(0), s = 540 / r, c = s / Math.max(t.length + 1, 2);
		e.appendChild(this.svgLine(60, o, 600, o)), e.appendChild(this.svgLine(60, 300, 60, 70)), t.forEach((t, n) => t.values.forEach((t, r) => {
			if (!Number.isFinite(t)) return;
			let i = a(t), l = this.createSvgElement("rect");
			l.setAttribute("x", `${60 + r * s + n * c + c * .2}`), l.setAttribute("y", `${Math.min(o, i)}`), l.setAttribute("width", `${c * .8}`), l.setAttribute("height", `${Math.abs(i - o)}`), l.setAttribute("data-docx-chart-point-index", `${r}`), l.style.fill = this.chartColor(n), e.appendChild(l);
		})), this.drawCategoryLabels(e, n, (e) => 60 + (e + .5) * s, 318), this.drawBottomLegend(e, t.map((e) => e.name), 335);
	}
	drawLineChart(e, t, n = !1) {
		let r = this.chartValueBounds(t), i = (e) => 300 - (e - r.min) / (r.max - r.min) * 230, a = i(0), o = Math.max(1, ...t.map((e) => Math.max(e.values.length, e.categories.length))), s = 540 / Math.max(o - 1, 1);
		e.appendChild(this.svgLine(60, a, 600, a)), e.appendChild(this.svgLine(60, 300, 60, 70)), t.forEach((t, r) => {
			let o = [], c = () => {
				if (!o.length) return;
				let t = o.map((e, t) => `${t ? "L" : "M"}${e[0]},${e[1]}`).join(" ");
				if (n && o.length > 1) {
					let n = this.createSvgElement("path");
					n.setAttribute("d", `${t} L${o[o.length - 1][0]},${a} L${o[0][0]},${a} Z`), n.style.fill = this.chartColor(r), n.style.opacity = "0.25", e.appendChild(n);
				}
				let i = this.createSvgElement("path");
				i.setAttribute("d", t), i.style.stroke = this.chartColor(r), i.style.strokeWidth = "2", i.style.fill = "none", e.appendChild(i), o = [];
			};
			t.values.forEach((t, n) => {
				if (!Number.isFinite(t)) {
					c();
					return;
				}
				let a = 60 + n * s, l = i(t);
				o.push([a, l]);
				let u = this.createSvgElement("circle");
				u.setAttribute("cx", `${a}`), u.setAttribute("cy", `${l}`), u.setAttribute("r", "3"), u.setAttribute("data-docx-chart-point-index", `${n}`), u.style.fill = this.chartColor(r), e.appendChild(u);
			}), c();
		}), this.drawCategoryLabels(e, t[0]?.categories ?? [], (e) => 60 + e * s, 318), this.drawBottomLegend(e, t.map((e) => e.name), 335);
	}
	drawPieChart(e, t) {
		let n = t.values.reduce((e, t) => e + (Number.isFinite(t) ? Math.max(0, t) : 0), 0) || 1, r = -90;
		t.values.forEach((i, a) => {
			if (!Number.isFinite(i) || i < 0) return;
			let o = i / n * 360, s = this.createSvgElement(o == 360 ? "circle" : "path");
			o == 360 ? (s.setAttribute("cx", "300"), s.setAttribute("cy", "180"), s.setAttribute("r", "110")) : s.setAttribute("d", this.pieSlicePath(300, 180, 110, r, r + o)), s.setAttribute("data-docx-chart-point-index", `${a}`), s.style.fill = this.chartColor(a), e.appendChild(s), this.drawLegend(e, t.categories[a] || `${a + 1}`, a, 450, 90 + a * 22), r += o;
		});
	}
	drawCombinedChartAxes(e, t, n) {
		let r = 0, i = [];
		for (let a of n) {
			let n = this.resolveChartAxes(t, a.localName, a), o = this.parseChartSeries(a, a.localName);
			if (!n?.category || !n.value || !o.length) continue;
			let s = this.createSvgElement("g");
			s.setAttribute("data-docx-chart-axis-group", a.localName), s.setAttribute("data-docx-chart-value-axis-id", this.chartChild(n.value, "axId")?.getAttribute("val") ?? ""), e.appendChild(s), this.drawDateLineChart(s, o, n, {
				type: a.localName,
				group: a,
				colorOffset: r,
				noLegend: !0,
				seriesNodes: this.chartChildren(a, "ser")
			}), this.drawChartAxisTitles(e, n), r += o.length, i.push(...o.map((e) => e.name));
		}
		this.drawBottomLegend(e, i, 335), this.syncChartAxisLegend(e);
	}
	drawDateLineChart(e, t, n, r = {}) {
		let i = n.category, a = n.value, o = i?.localName != "dateAx", s = t.map((e) => e.categories.map((e) => e.trim() && Number.isFinite(Number(e)) ? Number(e) : NaN)), c = s.flat().filter(Number.isFinite);
		if (!o && !c.length) {
			this.drawLineChart(e, t);
			return;
		}
		let l = t.reduce((e, t) => Math.max(e, t.values.length, t.categories.length), 1), u = this.chartChild(i, "scaling"), d = this.chartChild(a, "scaling"), f = o ? 0 : this.chartNumber(u, "min") ?? c.reduce((e, t) => Math.min(e, t), Infinity), p = o ? l : this.chartNumber(u, "max") ?? c.reduce((e, t) => Math.max(e, t), -Infinity);
		p <= f && (p = f + 1);
		let m = this.chartValueBounds(t), h = this.chartNumber(d, "min") ?? m.min, g = this.chartNumber(d, "max") ?? m.max;
		if (g <= h && (h = m.min, g = m.max), !Number.isFinite(p - f) || !Number.isFinite(g - h)) return;
		let _ = this.chartChild(u, "orientation")?.getAttribute("val") == "maxMin", v = this.chartChild(d, "orientation")?.getAttribute("val") == "maxMin", y = (e) => {
			let t = (e - f) / (p - f);
			return 60 + (_ ? 1 - t : t) * 540;
		}, b = (e) => {
			let t = (e - h) / (g - h);
			return 300 - (v ? 1 - t : t) * 230;
		}, x = (e, t) => y(o ? t + .5 : e), S = this.chartChild(a, "axPos")?.getAttribute("val") == "r", C = this.chartBoolean(this.chartChild(i, "delete")), w = this.chartBoolean(this.chartChild(a, "delete")), T = this.chartChild(a, "crosses")?.getAttribute("val"), E = this.chartChild(i, "crosses")?.getAttribute("val"), D = Math.min(g, Math.max(h, this.chartNumber(a, "crossesAt") ?? (T == "max" ? g : T == "min" ? h : 0))), O = Math.min(p, Math.max(f, this.chartNumber(i, "crossesAt") ?? (E == "max" ? p : f)));
		if (C || e.appendChild(this.svgLine(60, b(D), 600, b(D))), !w) {
			let t = S ? 600 : y(O);
			e.appendChild(this.svgLine(t, 300, t, 70));
		}
		e.setAttribute("data-docx-chart-x-range", `${f},${p}`), e.setAttribute("data-docx-chart-y-range", `${h},${g}`);
		let k = this.createSvgElement("svg");
		for (let [e, t] of Object.entries({
			x: 60,
			y: 70,
			width: 540,
			height: 230,
			viewBox: "60 70 540 230",
			overflow: "hidden"
		})) k.setAttribute(e, String(t));
		if (k.setAttribute("data-docx-chart-date-plot", "true"), e.appendChild(k), t.forEach((e, n) => {
			let i = r.seriesNodes?.[n], a = this.chartChild(i, "spPr"), c = (e, t) => Array.from(e?.getElementsByTagName("*") ?? []).find((e) => e.localName == t && Ma.includes(e.namespaceURI)), u = c(a, "ln"), d = c(r.type == "barChart" ? a : u, "srgbClr")?.getAttribute("val"), f = n + (r.colorOffset ?? 0), p = /^[0-9a-f]{6}$/i.test(d ?? "") ? `#${d}` : this.chartColor(f), m = u?.getAttribute("w"), _ = m && Number.isFinite(Number(m)) ? Math.max(0, Number(m) / 9525) : 2, v = this.chartChild(this.chartChild(i, "marker"), "symbol")?.getAttribute("val") != "none", y = [], S = () => {
				if (!y.length) return;
				let e = this.createSvgElement("path");
				e.setAttribute("d", y.map(([e, t], n) => `${n ? "L" : "M"}${e},${t}`).join(" ")), e.style.stroke = p, e.style.strokeWidth = String(_), e.style.fill = "none", k.appendChild(e), y = [];
			};
			e.values.forEach((e, i) => {
				let a = s[n][i];
				if (!o && !Number.isFinite(a) || !Number.isFinite(e)) {
					S();
					return;
				}
				let c = x(a, i), u = b(e), d = r.type == "barChart";
				d || y.push([c, u]);
				let m = this.createSvgElement(d ? "rect" : "circle"), _ = {
					"data-docx-chart-point-index": i,
					"data-docx-chart-series-index": f,
					"data-docx-chart-date-value": a,
					"data-docx-chart-center-x": c,
					"data-docx-chart-center-y": u
				};
				if (d) {
					let e = Math.max(0, Math.min(500, this.chartNumber(r.group, "gapWidth") ?? 150)), i = 540 / l / (t.length + e / 100), a = b(Math.min(g, Math.max(h, 0)));
					Object.assign(_, {
						x: c - t.length * i / 2 + n * i,
						y: Math.min(u, a),
						width: i,
						height: Math.abs(a - u)
					});
				} else Object.assign(_, {
					cx: c,
					cy: u,
					r: v ? 3 : 0
				});
				for (let [e, t] of Object.entries(_)) Number.isFinite(t) && m.setAttribute(e, String(t));
				m.style.fill = p, k.appendChild(m);
			}), S();
		}), !C && this.chartChild(i, "tickLblPos")?.getAttribute("val") != "none") {
			let r = this.chartChild(i, "numFmt")?.getAttribute("formatCode") ?? (o ? "General" : "yyyy/m/d"), a = o ? t[0].categories.map((e, t) => ({
				raw: e,
				value: Number(e),
				x: x(Number(e), t),
				index: t
			})) : this.chartDateTicks(i, c, f, p, n.date1904).map((e) => ({
				raw: String(e),
				value: e,
				x: y(e)
			}));
			a.sort((e, t) => e.x - t.x);
			let s = -Infinity, l = null;
			for (let t of a) {
				let i = this.formatChartDateLabel(t.raw, r, n.date1904), a = this.chartLegendTextWidth(i) / 2;
				if (i == l || t.x - a < s + 4) continue;
				let c = this.svgText(i, t.x, 318, "middle", "10px");
				c.setAttribute("data-docx-chart-date-tick", Number.isFinite(t.value) ? String(t.value) : t.raw), o && c.setAttribute("data-docx-chart-category-index", String(t.index)), e.appendChild(c), s = t.x + a, l = i;
			}
		}
		if (!w && this.chartChild(a, "tickLblPos")?.getAttribute("val") != "none") {
			let t = this.chartNumber(a, "majorUnit"), n = t != null && t > 0 ? t : (g - h) / 5, r = Math.floor((g - h) / n + 1e-8) + 1;
			if (r > 0 && r <= 100) for (let t = 0; t < r; t++) {
				let r = Number((h + t * n).toPrecision(12)), i = this.chartAxisNumberLabel(r, this.chartChild(a, "numFmt")?.getAttribute("formatCode")), o = this.svgText(i, S ? 606 : 54, b(r) + 3, S ? "start" : "end", "10px");
				o.setAttribute("data-docx-chart-value-tick", String(r)), e.appendChild(o);
			}
		}
		r.noLegend || (this.drawBottomLegend(e, t.map((e) => e.name), 335), this.syncChartAxisLegend(e));
	}
	drawChartAxisTitles(e, t) {
		for (let n of [t?.category, t?.value]) {
			if (!n || this.chartBoolean(this.chartChild(n, "delete"))) continue;
			let t = this.chartChild(n, "title"), r = this.chartTitleText(t);
			if (!r) continue;
			let i = this.chartChild(n, "axPos")?.getAttribute("val") ?? (n.localName == "valAx" ? "l" : "b"), a = this.chartChild(this.chartChild(t, "layout"), "manualLayout"), o = this.chartNumber(a, "x"), s = this.chartNumber(a, "y"), c = o != null && s != null && this.chartChild(a, "xMode")?.getAttribute("val") == "edge" && this.chartChild(a, "yMode")?.getAttribute("val") == "edge", l = {
				b: [330, 349],
				t: [330, 50],
				l: [16, 185],
				r: [625, 185]
			}, u = l[i] ?? l.b, d = c ? o * 640 : u[0], f = c ? s * 360 : u[1], p = this.svgText(r, d, f, c ? "start" : "middle", "12px");
			p.setAttribute("data-docx-chart-axis-title", this.chartChild(n, "axId")?.getAttribute("val") ?? i), c ? p.setAttribute("dominant-baseline", "hanging") : (i == "l" || i == "r") && p.setAttribute("transform", `rotate(${i == "l" ? -90 : 90} ${d} ${f})`), e.appendChild(p);
		}
	}
	syncChartAxisLegend(e) {
		let t = /* @__PURE__ */ new Map();
		for (let n of Array.from(e.querySelectorAll("[data-docx-chart-series-index]"))) {
			let e = Number(n.getAttribute("data-docx-chart-series-index"));
			t.has(e) || t.set(e, n.style.fill);
		}
		e.querySelector("[data-docx-chart-legend]")?.querySelectorAll("rect").forEach((e, n) => {
			t.has(n) && (e.style.fill = t.get(n));
		});
	}
	chartAxisNumberLabel(e, t) {
		let n = /^(0)(?:\.(0{1,10}))?(%)?$/.exec(t ?? "");
		return n ? (e * (n[3] ? 100 : 1)).toFixed(n[2]?.length ?? 0) + (n[3] ? "%" : "") : String(e);
	}
	chartDateTicks(e, t, n, r, i) {
		let a = this.chartNumber(e, "majorUnit"), o = this.chartChild(e, "majorTimeUnit")?.getAttribute("val") ?? "days";
		if (a != null && a > 0) {
			if (o == "days") {
				let e = Math.floor((r - n) / a + 1e-9) + 1;
				if (e > 0 && e <= 1e3) return Array.from({ length: e }, (e, t) => n + t * a);
			} else if (Number.isInteger(a) && ["months", "years"].includes(o)) {
				let e = this.formatChartDateLabel(String(n), "yyyy/mm/dd", i);
				if (/^\d{4}\/\d{2}\/\d{2}$/.test(e)) {
					let [t, s, c] = e.split("/").map(Number), l = [];
					for (let e = 0; e < 1e3; e++) {
						let u = new Date(Date.UTC(t, s - 1 + e * a * (o == "years" ? 12 : 1), 1)), d = new Date(Date.UTC(u.getUTCFullYear(), u.getUTCMonth() + 1, 0)).getUTCDate(), f = Date.UTC(u.getUTCFullYear(), u.getUTCMonth(), Math.min(c, d)), p = (f - Date.UTC(i ? 1904 : 1899, i ? 0 : 11, i ? 1 : 31)) / 864e5;
						if (!i && f >= Date.UTC(1900, 2, 1) && p++, p += n - Math.floor(n), !Number.isFinite(p) || p > r + 1e-9) break;
						p >= n - 1e-9 && l.push(p);
					}
					if (l.length && l.length < 1e3) return l;
				}
			}
		}
		return [...new Set(t)].filter((e) => e >= n && e <= r);
	}
	formatChartDateLabel(e, t, n = !1) {
		if (!e.trim() || !Number.isFinite(Number(e))) return e;
		let r = Number(e), i = Math.floor(r);
		if (i < 0 || i > (n ? 2957003 : 2958465)) return e;
		let a = Math.min(86399999, Math.round((r - i) * 864e5)), o = new Date(Date.UTC(n ? 1904 : 1899, n ? 0 : 11, n ? 1 : 31) + (i - +(!n && i > 60)) * 864e5 + a), s = !n && i == 60, c = s ? 1900 : o.getUTCFullYear(), l = s ? 2 : o.getUTCMonth() + 1, u = s ? 29 : o.getUTCDate(), d = (e, t = 2) => String(e).padStart(t, "0"), f = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		], p = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday"
		], m = "", h = !1;
		for (let e = 0; e < (t ?? "").length; e++) {
			let n = t[e];
			if (n == "\\" && e + 1 < t.length) m += n + t[++e];
			else {
				if (n == "\"" && (h = !h), n == ";" && !h) break;
				m += n;
			}
		}
		if (!m || h) return e;
		let g = m.match(/"[^"]*"|\\.|\[\$-[\w-]+\]|AM\/PM|A\/P|y+|m+|d+|h+|s+|./gi) ?? [];
		if (!g.some((e) => /^(y+|m+|d+|h+|s+)$/i.test(e))) return e;
		let _ = g.some((e) => /^(AM\/PM|A\/P)$/i.test(e)), v = "";
		for (let t = 0; t < g.length; t++) {
			let n = g[t], r = n.toLowerCase();
			if (n.startsWith("\"")) {
				v += n.slice(1, -1);
				continue;
			}
			if (n.startsWith("\\")) {
				v += n.slice(1);
				continue;
			}
			if (/^\[\$-/i.test(n)) {
				if (!/^\[\$-(409|en-us)\]$/i.test(n)) return e;
				continue;
			}
			let i = g.slice(0, t).reverse().find((e) => /^[ymdhs]+$/i.test(e)), a = g.slice(t + 1).find((e) => /^[ymdhs]+$/i.test(e));
			if (/^y{1,4}$/.test(r)) v += r.length <= 2 ? d(c % 100) : d(c, 4);
			else if (/^m{1,5}$/.test(r)) /^h+$/i.test(i ?? "") || /^s+$/i.test(a ?? "") ? v += r.length == 1 ? o.getUTCMinutes() : d(o.getUTCMinutes()) : v += r.length == 1 ? l : r.length == 2 ? d(l) : r.length == 3 ? f[l - 1].slice(0, 3) : r.length == 4 ? f[l - 1] : f[l - 1][0];
			else if (/^d{1,4}$/.test(r)) v += r.length == 1 ? u : r.length == 2 ? d(u) : r.length == 3 ? p[o.getUTCDay()].slice(0, 3) : p[o.getUTCDay()];
			else if (/^h{1,2}$/.test(r)) {
				let e = _ ? o.getUTCHours() % 12 || 12 : o.getUTCHours();
				v += r.length == 1 ? e : d(e);
			} else if (/^s{1,2}$/.test(r)) v += r.length == 1 ? o.getUTCSeconds() : d(o.getUTCSeconds());
			else if (/^(am\/pm|a\/p)$/.test(r)) {
				let e = o.getUTCHours() < 12 ? "AM" : "PM", t = r == "a/p" ? e[0] : e;
				v += n == r ? t.toLowerCase() : t;
			} else if (/^[\s/.,:\-年月日时分秒()]$/.test(n)) v += n;
			else return e;
		}
		return v;
	}
	pieSlicePath(e, t, n, r, i) {
		let a = this.polar(e, t, n, i), o = this.polar(e, t, n, r), s = i - r <= 180 ? "0" : "1";
		return `M${e},${t} L${a.x},${a.y} A${n},${n} 0 ${s},0 ${o.x},${o.y} Z`;
	}
	polar(e, t, n, r) {
		let i = (r - 90) * Math.PI / 180;
		return {
			x: e + n * Math.cos(i),
			y: t + n * Math.sin(i)
		};
	}
	drawLegend(e, t, n, r, i) {
		let a = this.createSvgElement("rect");
		a.setAttribute("x", `${r}`), a.setAttribute("y", `${i - 10}`), a.setAttribute("width", "10"), a.setAttribute("height", "10"), a.style.fill = this.chartColor(n), e.appendChild(a), e.appendChild(this.svgText(t, r + 14, i, "start", "10px"));
	}
	drawBottomLegend(e, t, n) {
		if (t.length == 0) return;
		let r = t.map((e) => 14 + this.chartLegendTextWidth(e)), i = r.reduce((e, t) => e + t, 0) + 18 * Math.max(0, t.length - 1), a = this.createSvgElement("g");
		a.setAttribute("data-docx-chart-legend", "bottom"), a.setAttribute("transform", `translate(${Math.max(0, (640 - i) / 2)}, 0)`);
		let o = 0;
		t.forEach((e, t) => {
			this.drawLegend(a, e, t, o, n), o += r[t] + 18;
		}), e.appendChild(a);
	}
	chartLegendTextWidth(e) {
		return Array.from(e).reduce((e, t) => /\s/.test(t) ? e + 3 : e + ((t.codePointAt(0) ?? 0) > 255 ? 10 : 6), 0);
	}
	chartColor(e) {
		return `hsl(${e * 47 % 360}, 65%, 48%)`;
	}
	renderSmartArtSvg(e) {
		let t = e.documentElement, n = this.elementsByLocal(t, "pt").map((e) => ({
			id: e.getAttribute("modelId"),
			type: e.getAttribute("type"),
			text: this.elementsByLocal(e, "t").map((e) => e.textContent).filter(Boolean).join(" ").trim()
		})).filter((e) => e.id && e.text && e.type != "doc"), r = this.elementsByLocal(t, "cxn").map((e) => ({
			src: e.getAttribute("srcId"),
			dst: e.getAttribute("destId")
		})).filter((e) => e.src && e.dst && n.some((t) => t.id == e.src) && n.some((t) => t.id == e.dst)), i = this.createSvgElement("svg", { style: {
			width: "100%",
			height: "100%",
			display: "block"
		} });
		if (i.setAttribute("viewBox", "0 0 640 360"), i.setAttribute("preserveAspectRatio", "xMidYMid meet"), n.length == 0) return i.appendChild(this.svgText("SmartArt", 320, 180, "middle", "18px")), i;
		let a = this.layoutDiagramNodes(n, r), o = {}, s = Math.min(90, 260 / Math.max(a.length, 1));
		a.forEach((e, t) => {
			let n = 55 + t * s, r = 560 / Math.max(e.length, 1);
			e.forEach((e, t) => {
				o[e.id] = {
					x: 40 + r * t + Math.max(0, r - 140) / 2,
					y: n
				};
			});
		});
		for (let e of r) {
			let t = o[e.src], n = o[e.dst];
			t && n && i.appendChild(this.svgLine(t.x + 70, t.y + 44, n.x + 70, n.y));
		}
		return n.forEach((e, t) => {
			let n = o[e.id];
			if (!n) return;
			let r = this.createSvgElement("rect");
			r.setAttribute("x", `${n.x}`), r.setAttribute("y", `${n.y}`), r.setAttribute("width", "140"), r.setAttribute("height", "44"), r.setAttribute("rx", "8"), r.style.fill = this.chartColor(t), r.style.opacity = "0.18", r.style.stroke = this.chartColor(t), i.appendChild(r), i.appendChild(this.svgText(e.text, n.x + 70, n.y + 27, "middle", "11px"));
		}), i;
	}
	layoutDiagramNodes(e, t) {
		let n = new Map(e.map((e) => [e.id, 0]));
		t.forEach((e) => n.set(e.dst, (n.get(e.dst) ?? 0) + 1));
		let r = e.filter((e) => (n.get(e.id) ?? 0) == 0), i = /* @__PURE__ */ new Set(), a = [];
		for (r.length == 0 && (r = e.slice(0, 1)); r.length > 0;) {
			a.push(r), r.forEach((e) => i.add(e.id));
			let n = t.filter((e) => r.some((t) => t.id == e.src)).map((e) => e.dst).filter((e) => !i.has(e));
			r = [...new Set(n)].map((t) => e.find((e) => e.id == t)).filter(Boolean);
		}
		let o = e.filter((e) => !i.has(e.id));
		return o.length > 0 && a.push(o), a;
	}
	renderInkSvg(e) {
		let t = this.createSvgElement("svg", { style: {
			width: "100%",
			height: "100%",
			display: "block"
		} });
		t.setAttribute("viewBox", "0 0 640 360"), t.setAttribute("preserveAspectRatio", "xMidYMid meet");
		let n = this.elementsByLocal(e.documentElement, "trace").map((e) => this.inkTraceToPoints(e.textContent)), r = this.elementsByLocal(e.documentElement, "path").map((e) => e.getAttribute("d")).filter(Boolean);
		if (n.length == 0 && r.length == 0) return t.appendChild(this.svgText("Ink", 320, 180, "middle", "18px")), t;
		let i = n.flat(), a = Math.min(...i.map((e) => e[0]), 0), o = Math.min(...i.map((e) => e[1]), 0), s = Math.max(...i.map((e) => e[0]), 640), c = Math.max(...i.map((e) => e[1]), 360), l = Math.min(600 / Math.max(s - a, 1), 320 / Math.max(c - o, 1)), u = 20 - a * l, d = 20 - o * l;
		for (let e of n) {
			if (e.length < 2) continue;
			let n = this.createSvgElement("path");
			n.setAttribute("d", e.map((e, t) => `${t == 0 ? "M" : "L"}${e[0] * l + u},${e[1] * l + d}`).join(" ")), n.style.fill = "none", n.style.stroke = "currentColor", n.style.strokeWidth = "2", n.style.strokeLinecap = "round", n.style.strokeLinejoin = "round", t.appendChild(n);
		}
		for (let e of r) {
			let n = this.createSvgElement("path");
			n.setAttribute("d", e), n.style.fill = "none", n.style.stroke = "currentColor", n.style.strokeWidth = "2", t.appendChild(n);
		}
		return t;
	}
	inkTraceToPoints(e) {
		let t = (e ?? "").match(/-?\d+(?:\.\d+)?/g)?.map(Number) ?? [], n = [];
		for (let e = 0; e + 1 < t.length; e += 2) n.push([t[e], t[e + 1]]);
		return n;
	}
	svgLine(e, t, n, r) {
		let i = this.createSvgElement("line");
		return i.setAttribute("x1", `${e}`), i.setAttribute("y1", `${t}`), i.setAttribute("x2", `${n}`), i.setAttribute("y2", `${r}`), i.style.stroke = "currentColor", i.style.strokeWidth = "1", i;
	}
	svgText(e, t, n, r = "start", i = "12px", a = null) {
		let o = this.createSvgElement("text");
		return o.setAttribute("x", `${t}`), o.setAttribute("y", `${n}`), o.setAttribute("text-anchor", r), o.style.fill = "currentColor", o.style.fontSize = i, a && (o.style.fontWeight = a), o.appendChild(document.createTextNode(e)), o;
	}
	elementsByLocal(e, t) {
		let n = e.documentElement ?? e;
		return Array.from(n.getElementsByTagName("*")).filter((e) => e.localName == t);
	}
	firstByLocal(e, t) {
		return this.elementsByLocal(e, t)[0] ?? null;
	}
	renderSimpleField(e) {
		let t = this.evaluateFieldNode(e);
		return t === void 0 ? this.renderElements(e.children ?? []) : t == null ? null : D(t) ? this.renderFieldText(t, e.instruction) : t;
	}
	renderFieldText(e, t) {
		let n = this.h({
			tagName: "span",
			className: `${this.className}-field`,
			children: [e]
		});
		return t && (n.dataset.docxFieldInstr = t), n;
	}
	evaluateFieldNode(e) {
		let t = (e.instruction ?? "").replace(/\s+/g, " ").trim();
		if (!t) return;
		if (t.startsWith("=")) {
			let e = this.evaluateFormula(t.substring(1));
			return e == null ? void 0 : this.applyFieldFormatting(`${e}`, t);
		}
		let n = this.tokenizeFieldInstruction(t), r = n[0]?.replace(/^=/, "").toUpperCase();
		if (!this.shouldPreserveStoredFieldResult(r, e)) switch (r) {
			case "PAGE": return this.applyFieldFormatting(this.formatFieldNumber(this.currentPageNumber, this.currentSectionProps?.pageNumber?.format), t);
			case "NUMPAGES": return this.applyFieldFormatting(this.formatFieldNumber(this.totalPages, this.currentSectionProps?.pageNumber?.format), t);
			case "SECTIONPAGES": return this.applyFieldFormatting(this.formatFieldNumber(this.sectionPageCount, this.currentSectionProps?.pageNumber?.format), t);
			case "SECTION": return this.applyFieldFormatting(this.formatFieldNumber(this.currentSectionNumber, "decimal"), t);
			case "DATE":
			case "TIME":
			case "CREATEDATE":
			case "SAVEDATE":
			case "PRINTDATE": return this.applyFieldFormatting(this.evaluateDateField(n, r), t);
			case "AUTHOR": return this.applyFieldFormatting(this.document.corePropsPart?.props?.creator ?? "", t);
			case "TITLE": return this.applyFieldFormatting(this.document.corePropsPart?.props?.title ?? "", t);
			case "SUBJECT": return this.applyFieldFormatting(this.document.corePropsPart?.props?.subject ?? "", t);
			case "KEYWORDS": return this.applyFieldFormatting(this.document.corePropsPart?.props?.keywords ?? "", t);
			case "NUMWORDS": return this.applyFieldFormatting(`${this.document.extendedPropsPart?.props?.words ?? ""}`, t);
			case "NUMCHARS": return this.applyFieldFormatting(`${this.document.extendedPropsPart?.props?.characters ?? ""}`, t);
			case "FILENAME": return this.applyFieldFormatting(this.document.documentPart?.path?.split("/").pop() ?? "", t);
			case "DOCPROPERTY": return this.applyFieldFormatting(this.evaluateDocPropertyField(n), t);
			case "DOCVARIABLE": return this.applyFieldFormatting(this.evaluateDocVariableField(n), t);
			case "MERGEFIELD": return;
			case "SET": return this.evaluateSetField(n), null;
			case "QUOTE": return this.applyFieldFormatting(n.slice(1).map((e) => this.resolveFieldValue(e)).join(""), t);
			case "HYPERLINK": return this.renderHyperlinkField(n, e);
			case "IF": return this.applyFieldFormatting(this.evaluateIfField(n), t);
			case "REF":
			case "STYLEREF": return this.applyFieldFormatting(this.evaluateRefField(n), t);
			case "PAGEREF": return this.applyFieldFormatting(this.evaluatePageRefField(n), t);
			case "NOTEREF": return this.applyFieldFormatting(this.evaluateRefField(n), t);
			case "SEQ": return this.applyFieldFormatting(this.evaluateSeqField(n), t);
			case "LISTNUM": return this.applyFieldFormatting(this.evaluateListNumField(n), t);
			case "TC":
			case "XE": return null;
			case "TOC": return this.renderTocField(n);
			case "SYMBOL": return this.evaluateSymbolField(n);
		}
	}
	shouldPreserveStoredFieldResult(e, t) {
		if (!this.options.preserveComplexFieldResults || !t.children?.length) return !1;
		switch (e) {
			case "PAGE":
			case "NUMPAGES":
			case "SECTIONPAGES":
			case "SECTION": return !1;
			case "PAGEREF": return !this.options.updatePageReferences;
			case "TOC":
			case "REF":
			case "STYLEREF":
			case "NOTEREF":
			case "SEQ":
			case "LISTNUM":
			case "IF":
			case "DOCVARIABLE":
			case "MERGEFIELD": return !0;
		}
		return !1;
	}
	tokenizeFieldInstruction(e) {
		let t = [], n = "", r = null, i = !1;
		for (let a of e) i ? (n += a, i = !1) : a == "\\" ? r ? i = !0 : (n &&= (t.push(n), ""), n = "\\") : a == "\"" || a == "'" ? r == a ? (r = null, t.push(n), n = "") : r ? n += a : (n.trim() && t.push(n.trim()), n = "", r = a) : /\s/.test(a) && !r ? n &&= (t.push(n), "") : n += a;
		return n && t.push(n), t;
	}
	fieldSwitch(e, t) {
		let n = t.toLowerCase(), r = e.findIndex((e) => e.toLowerCase() == n);
		return r >= 0 ? e[r + 1] : null;
	}
	hasFieldSwitch(e, t) {
		let n = t.toLowerCase();
		return e.some((e) => e.toLowerCase() == n);
	}
	firstFieldArgument(e, t = 1) {
		for (let n = t; n < e.length; n++) {
			if (!e[n]?.startsWith("\\")) return e[n];
			n++;
		}
		return null;
	}
	evaluateDateField(e, t) {
		let n = this.fieldSwitch(e, "\\@"), r = /* @__PURE__ */ new Date();
		return n ? this.formatFieldDate(r, n) : t == "TIME" ? r.toLocaleTimeString() : r.toLocaleDateString();
	}
	formatFieldDate(e, t) {
		let n = (e, t = 2) => `${e}`.padStart(t, "0"), r = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		], i = r.map((e) => e.substring(0, 3)), a = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday"
		], o = a.map((e) => e.substring(0, 3)), s = [
			[/yyyy/g, `${e.getFullYear()}`],
			[/yy/g, n(e.getFullYear() % 100)],
			[/MMMM/g, r[e.getMonth()]],
			[/MMM/g, i[e.getMonth()]],
			[/MM/g, n(e.getMonth() + 1)],
			[/M/g, `${e.getMonth() + 1}`],
			[/dddd/g, a[e.getDay()]],
			[/ddd/g, o[e.getDay()]],
			[/dd/g, n(e.getDate())],
			[/d/g, `${e.getDate()}`],
			[/HH/g, n(e.getHours())],
			[/H/g, `${e.getHours()}`],
			[/hh/g, n((e.getHours() + 11) % 12 + 1)],
			[/h/g, `${(e.getHours() + 11) % 12 + 1}`],
			[/mm/g, n(e.getMinutes())],
			[/m/g, `${e.getMinutes()}`],
			[/ss/g, n(e.getSeconds())],
			[/s/g, `${e.getSeconds()}`],
			[/AM\/PM/g, e.getHours() < 12 ? "AM" : "PM"],
			[/am\/pm/g, e.getHours() < 12 ? "am" : "pm"]
		], c = t;
		for (let [e, t] of s) c = c.replace(e, t);
		return c;
	}
	evaluateDocPropertyField(e) {
		let t = this.firstFieldArgument(e)?.toLowerCase();
		if (!t) return "";
		let n = {
			...this.document.corePropsPart?.props ?? {},
			...this.document.extendedPropsPart?.props ?? {}
		};
		for (let [e, r] of Object.entries(n)) if (e.toLowerCase() == t) return r == null ? "" : `${r}`;
		return "";
	}
	evaluateSetField(e) {
		let t = this.firstFieldArgument(e);
		if (!t) return;
		let n = e.slice(e.indexOf(t) + 1).filter((e) => !e.startsWith("\\")).map((e) => this.resolveFieldValue(e)).join(" ");
		this.fieldSetValues[t] = n;
	}
	evaluateDocVariableField(e) {
		let t = this.firstFieldArgument(e);
		return t ? this.fieldSetValues[t] ?? "" : "";
	}
	renderHyperlinkField(e, t) {
		let n = this.fieldSwitch(e, "\\l"), r = this.firstFieldArgument(e) ?? "", i = n ? `${r}#${n}` : r, a = this.h({
			tagName: "a",
			children: this.renderHyperlinkChildren(t.children ?? [])
		});
		return this.applyHyperlinkTarget(a, i, !!r), a.textContent ||= i || n, a;
	}
	evaluateIfField(e) {
		let t = [
			"<>",
			">=",
			"<=",
			"=",
			">",
			"<"
		], n = e.findIndex((e, n) => n > 0 && t.includes(e));
		if (n < 0) return "";
		let r = this.resolveFieldValue(e.slice(1, n).join(" ")), i = e[n], a = this.resolveFieldValue(e[n + 1] ?? ""), o = e[n + 2] ?? "", s = e[n + 3] ?? "", c = parseFloat(r), l = parseFloat(a), u = !Number.isNaN(c) && !Number.isNaN(l), d = u ? c : r, f = u ? l : a, p = !1;
		switch (i) {
			case "=":
				p = d == f;
				break;
			case "<>":
				p = d != f;
				break;
			case ">":
				p = d > f;
				break;
			case "<":
				p = d < f;
				break;
			case ">=":
				p = d >= f;
				break;
			case "<=": p = d <= f;
		}
		return this.resolveFieldValue(p ? o : s);
	}
	resolveFieldValue(e) {
		let t = (e ?? "").trim();
		if (/^[-+]?\d+(?:\.\d+)?$/.test(t)) return t;
		if (this.bookmarkTextMap.hasOwnProperty(t)) return this.bookmarkTextMap[t];
		if (this.fieldSetValues.hasOwnProperty(t)) return this.fieldSetValues[t];
		if (t.startsWith("=")) {
			let e = this.evaluateFormula(t.substring(1));
			return e == null ? "" : `${e}`;
		}
		let n = this.tokenizeFieldInstruction(t)[0]?.toUpperCase();
		if ([
			"PAGE",
			"NUMPAGES",
			"SECTIONPAGES",
			"SECTION",
			"DATE",
			"TIME",
			"AUTHOR",
			"TITLE",
			"SUBJECT",
			"KEYWORDS",
			"REF",
			"PAGEREF",
			"SEQ",
			"DOCPROPERTY"
		].includes(n)) {
			let e = this.evaluateFieldNode({
				type: R.SimpleField,
				instruction: t,
				lock: !1,
				dirty: !1,
				children: []
			});
			if (D(e)) return e;
		}
		return t;
	}
	evaluateRefField(e) {
		let t = this.firstFieldArgument(e);
		return t ? this.bookmarkTextMap[t] ?? this.fieldSetValues[t] ?? "" : "";
	}
	evaluatePageRefField(e) {
		let t = this.firstFieldArgument(e);
		return t ? `${this.bookmarkTextMap[t] == null ? 1 : Math.max(this.currentPageNumber, 1)}` : "";
	}
	evaluateSeqField(e) {
		let t = this.firstFieldArgument(e);
		if (!t || this.hasFieldSwitch(e, "\\h")) return "";
		let n = this.fieldSwitch(e, "\\r"), r = this.hasFieldSwitch(e, "\\c");
		n == null ? r || (this.fieldSeqCounters[t] = (this.fieldSeqCounters[t] ?? 0) + 1) : this.fieldSeqCounters[t] = parseInt(n, 10) || 0;
		let i = this.fieldSwitch(e, "\\*") ?? "decimal";
		return this.formatFieldNumber(this.fieldSeqCounters[t] ?? 0, this.fieldFormatSwitchToNumFormat(i));
	}
	evaluateListNumField(e) {
		let t = this.firstFieldArgument(e) ?? "LISTNUM";
		this.fieldSeqCounters[t] = (this.fieldSeqCounters[t] ?? 0) + 1;
		let n = this.fieldSwitch(e, "*") ?? "decimal";
		return this.formatFieldNumber(this.fieldSeqCounters[t], this.fieldFormatSwitchToNumFormat(n));
	}
	renderTocField(e) {
		let t = 1, n = 9, r = this.fieldSwitch(e, "\\o");
		if (r) {
			let e = /(\d+)\s*-\s*(\d+)/.exec(r);
			e && (t = parseInt(e[1], 10), n = parseInt(e[2], 10));
		}
		let i = this.tocEntries.filter((e) => e.level >= t && e.level <= n).map((e) => {
			let t = this.h({
				tagName: "span",
				className: `${this.className}-toc-page`,
				children: ["1"]
			});
			return t.dataset.docxPageRef = e.id, this.h({
				tagName: "div",
				className: `${this.className}-toc-entry ${this.className}-toc-level-${e.level}`,
				children: [this.h({
					tagName: "a",
					className: `${this.className}-toc-title`,
					href: `#${e.id}`,
					children: [e.text]
				}), t]
			});
		});
		return this.h({
			tagName: "div",
			className: `${this.className}-toc`,
			children: i
		});
	}
	evaluateSymbolField(e) {
		let t = parseInt(e[1], 10);
		return Number.isFinite(t) ? String.fromCharCode(t) : "";
	}
	evaluateFormula(e) {
		let t = e.replace(/,/g, "").trim();
		if (!/^[0-9+\-*/().\s]+$/.test(t)) return null;
		try {
			let e = Function(`"use strict"; return (${t});`)();
			return Number.isFinite(e) ? e : null;
		} catch {
			return null;
		}
	}
	applyFieldFormatting(e, t) {
		let n = this.tokenizeFieldInstruction(t), r = e ?? "", i = this.fieldSwitch(n, "\\*"), a = i?.toUpperCase(), o = this.fieldSwitch(n, "\\#");
		if (o) {
			let e = parseFloat(r);
			Number.isNaN(e) || (r = this.formatNumberPicture(e, o));
		}
		switch (a) {
			case "UPPER":
				r = r.toUpperCase();
				break;
			case "LOWER":
				r = r.toLowerCase();
				break;
			case "FIRSTCAP":
				r = r.substring(0, 1).toUpperCase() + r.substring(1).toLowerCase();
				break;
			case "CAPS":
				r = r.replace(/\b\w/g, (e) => e.toUpperCase());
				break;
			case "ROMAN": {
				let e = parseInt(r, 10);
				Number.isNaN(e) || (r = i == "roman" ? this.toRoman(e).toLowerCase() : this.toRoman(e).toUpperCase());
				break;
			}
			case "ALPHABETIC": {
				let e = parseInt(r, 10);
				Number.isNaN(e) || (r = i == "alphabetic" ? this.toLetters(e).toLowerCase() : this.toLetters(e).toUpperCase());
				break;
			}
		}
		return r;
	}
	formatNumberPicture(e, t) {
		let n = t.indexOf("."), r = n >= 0 ? t.length - n - 1 : 0, i = e.toFixed(r);
		if (t.includes(",")) {
			let [e, t] = i.split(".");
			i = e.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (t == null ? "" : `.${t}`);
		}
		return i;
	}
	fieldFormatSwitchToNumFormat(e) {
		if (e == "roman") return "lowerRoman";
		if (e == "alphabetic") return "lowerLetter";
		switch (e?.toUpperCase()) {
			case "ROMAN": return "upperRoman";
			case "ALPHABETIC": return "upperLetter";
			default: return "decimal";
		}
	}
	formatFieldNumber(e, t) {
		switch (t) {
			case "upperRoman": return this.toRoman(e).toUpperCase();
			case "lowerRoman": return this.toRoman(e).toLowerCase();
			case "upperLetter": return this.toLetters(e).toUpperCase();
			case "lowerLetter": return this.toLetters(e).toLowerCase();
			case "decimalZero": return e < 10 ? `0${e}` : `${e}`;
			default: return `${e}`;
		}
	}
	toRoman(e) {
		let t = [
			[1e3, "M"],
			[900, "CM"],
			[500, "D"],
			[400, "CD"],
			[100, "C"],
			[90, "XC"],
			[50, "L"],
			[40, "XL"],
			[10, "X"],
			[9, "IX"],
			[5, "V"],
			[4, "IV"],
			[1, "I"]
		], n = Math.max(Math.floor(e), 0), r = "";
		for (let [e, i] of t) for (; n >= e;) r += i, n -= e;
		return r || `${e}`;
	}
	toLetters(e) {
		let t = Math.max(Math.floor(e), 1), n = "";
		for (; t > 0;) t--, n = String.fromCharCode(65 + t % 26) + n, t = Math.floor(t / 26);
		return n;
	}
	renderRuby(e) {
		let t = e.children?.find((e) => e.type == R.RubyBase), n = e.children?.find((e) => e.type == R.RubyText), r = [...t ? this.renderElements(t.children) : [], ...n ? A(this.renderElement(n)).filter((e) => e != null) : []], i = this.h({
			tagName: "ruby",
			children: r
		});
		return e.align && (i.style.rubyAlign = e.align), i;
	}
	hasRenderedContent(e) {
		for (let t of e ?? []) {
			if (!t) continue;
			let e = t, n = e.nodeType, r = String(e.localName ?? e.tagName ?? e.nodeName ?? "").toLowerCase();
			if (n == 3 || r == "#text") {
				if ((e.textContent ?? e.text ?? e.data ?? "").length) return !0;
				continue;
			}
			if ([
				"br",
				"img",
				"svg",
				"math",
				"table"
			].includes(r) || (e.textContent ?? "").length) return !0;
			let i = Array.from(e.childNodes ?? e.children ?? []);
			if (i.length && this.hasRenderedContent(i)) return !0;
		}
		return !1;
	}
	renderText(e) {
		return this.h(this.applyCjkLineBreakGuards(e.text));
	}
	applyCjkLineBreakGuards(e) {
		if (!e || !this.document.settingsPart?.settings?.kinsoku) return e;
		let t = this.document.settingsPart.settings.noLineBreaksBefore ?? "!),.:;?]}¢°·'\"†‡›℃∶、。々〉》」』】〕〗〙〛〜゠ァィゥェォッャュョヮ・ー－？！％，．：；゛゜ヽヾゝゞー", n = this.document.settingsPart.settings.noLineBreaksAfter ?? "([{$£¥'\"“‘〈《「『【〔〖〘〚", r = "";
		for (let i of e) t.includes(i) && (r += "⁠"), r += i, n.includes(i) && (r += "⁠");
		return r;
	}
	renderDeletedText(e) {
		return Xi(this.options) || Qi($(this.options)) ? this.renderText(e) : null;
	}
	renderBreak(e) {
		switch (e.break) {
			case "textWrapping":
			case "line": return this.h({ tagName: "br" });
			case "column": return this.h({
				tagName: "span",
				style: { breakAfter: "column" }
			});
			case "page": return this.options.breakPages ? null : this.h({
				tagName: "span",
				style: { breakAfter: "page" }
			});
			case "lastRenderedPageBreak": return this.options.breakPages || this.options.ignoreLastRenderedPageBreak ? null : this.h({
				tagName: "span",
				style: { breakAfter: "page" }
			});
		}
		return null;
	}
	renderInserted(e) {
		return Xi(this.options) ? this.renderRevisionContainer(e, "ins") : $(this.options) == "original" ? null : this.renderElements(e.children);
	}
	renderDeleted(e) {
		return Xi(this.options) ? this.renderRevisionContainer(e, "del") : $(this.options) == "original" ? this.renderElements(e.children) : null;
	}
	renderRevisionContainer(e, t) {
		let n = this.renderContainer(e, t), r = e.props?.revision, i = r?.kind ?? (t == "ins" ? "insert" : "delete");
		n.dataset.docxChangeKind = i, this.hasOwnRevisionContent(e) || (n.dataset.docxChangeEmpty = "true"), n.style.setProperty("--docx-review-color", Sa(r?.author)), r?.id != null && (n.dataset.docxChangeId = `${r.id}`), r?.author && (n.dataset.docxChangeAuthor = r.author), r?.date && (n.dataset.docxChangeDate = r.date, n.setAttribute("datetime", r.date));
		let a = [r?.author, r?.date].filter(Boolean).join(" - ");
		return a && n.setAttribute("title", a), n;
	}
	hasOwnRevisionContent(e) {
		let t = (e) => {
			for (let n of e.children ?? []) if (!n.props?.revision && ((n.type == R.Text || n.type == R.DeletedText) && (n.text ?? "").length || n.type == R.Tab || n.type == R.PositionalTab || n.type == R.Break || n.type == R.Symbol || t(n))) return !0;
			return !1;
		};
		return t(e);
	}
	renderSymbol(e) {
		let t = ri(e.font, e.char), n = this.h({
			tagName: "span",
			children: [t.text],
			style: { fontFamily: e.font }
		});
		return Number.isFinite(e.char) && n.setAttribute("data-docx-symbol-code", e.char.toString(16).padStart(4, "0").toUpperCase()), e.font && n.setAttribute("data-docx-symbol-font", e.font), t.normalized && n.setAttribute("data-docx-symbol-normalized", "true"), n;
	}
	renderFootnoteReference(e) {
		return this.renderNoteReference(e, "footnote");
	}
	renderEndnoteReference(e) {
		return this.renderNoteReference(e, "endnote");
	}
	renderNoteReference(e, t) {
		let n = this.h({
			tagName: "sup",
			children: []
		});
		n.dataset.docxNoteReference = t, n.dataset.docxNoteId = e.id;
		for (let t = e; t; t = t.parent) if (this.isHiddenRevisionForPagination(t)) return n.dataset.docxNoteHidden = "true", n;
		let r = t === "footnote" ? "footnoteProps" : "endnoteProps", i = Ne(this.document.settingsPart?.settings?.[r], this.currentSectionProps?.[r]), a = this.noteSectionIds.get(this.currentSectionProps);
		a ?? (a = `${this.noteSectionIds.size + 1}`, this.noteSectionIds.set(this.currentSectionProps, a));
		let o = this.noteNumbering.assign(t, e.id, !!e.customMarkFollows, i, a, `${this.notePageIndex}`), s = t === "footnote" ? this.currentFootnoteIds : this.currentEndnoteIds;
		return s.includes(e.id) || s.push(e.id), n.dataset.docxNoteSection = a, n.dataset.docxNoteFormat = i.format, n.dataset.docxNoteStart = `${i.start}`, n.dataset.docxNoteRestart = i.restart, this.applyNoteAssignment(n, o, !0), n;
	}
	updateDynamicNoteNumbers(e) {
		let t = Array.from(e.querySelectorAll(`:scope > section.${this.className}`)), n = new Pe();
		for (let e = 0; e < t.length; e++) for (let r of Array.from(t[e].querySelectorAll("article [data-docx-note-reference]"))) {
			if (r.dataset.docxNoteHidden === "true") continue;
			let t = n.assign(r.dataset.docxNoteReference, r.dataset.docxNoteId, r.dataset.docxNoteCustom === "true", {
				format: r.dataset.docxNoteFormat,
				start: Number(r.dataset.docxNoteStart),
				restart: r.dataset.docxNoteRestart
			}, r.dataset.docxNoteSection, `${e + 1}`);
			this.applyNoteAssignment(r, t, !0);
		}
		for (let t of Array.from(e.querySelectorAll("li[data-docx-note-id]"))) this.applyNoteAssignment(t, n.assignments.get(`${t.dataset.docxNoteKind}:${t.dataset.docxNoteId}`), !1);
	}
	renderTab(e) {
		let t = (this.currentParagraph ?? Ba(e, R.Paragraph))?.tabs ?? [], n = t.filter((e) => e?.style != "clear"), r = this.currentParagraphTabIndex++, i = this.resolveRenderedTabStop(n, r, this.currentParagraphTabCount);
		var a = this.h({
			tagName: "span",
			className: this.tabStopClass(),
			children: ["\xA0"]
		});
		return a.dataset.docxTab = "true", i && (a.dataset.docxTabAlign = i.style ?? "left", a.dataset.docxTabLeader = i.leader ?? "none", i.position && (a.dataset.docxTabPos = i.position)), a.dataset.docxTabId = `${this.currentTabs.length}`, this.currentTabs.push({
			stops: t,
			span: a
		}), a;
	}
	renderBookmarkStart(e) {
		let t = this.h({ tagName: "span" });
		return e.name && (t.id = e.name, t.setAttribute("id", e.name)), t;
	}
	renderRun(e) {
		let t = e.fieldRun ? e.children?.filter((e) => e.type != R.Instruction && e.type != R.ComplexField) : e.children;
		if (e.fieldRun && (!t || t.length == 0)) return null;
		let n = this.renderElements(t);
		if (e.verticalAlign && (n = [this.h({
			tagName: e.verticalAlign,
			children: n
		})]), !e.verticalAlign && t?.length == 1 && (t[0].type == R.Tab || t[0].type == R.PositionalTab) && n?.length == 1) {
			let t = n[0];
			return e.cssStyle && Object.assign(t.style, e.cssStyle), e.className && t.classList.add(e.className), t;
		}
		let r = this.toHTML(e, Q.html, "span", n), i = this.findStyle(e.styleName);
		this.applyTextBoxFontInheritance(e, i, r);
		let a = e.cssStyle?.["--docx-snap-to-grid"] ?? this.styleValue(i, "span", "--docx-snap-to-grid");
		if (/^(0|false|off)$/i.test(a ?? "")) r.style.letterSpacing = "normal";
		else if (/^(1|true|on)$/i.test(a ?? "")) {
			let e = this.currentSectionProps?.docGrid;
			(e?.type == "linesAndChars" || e?.type == "snapToChars") && e.charSpace && (r.style.letterSpacing = e.charSpace);
		}
		return e.id && (r.id = e.id), r;
	}
	renderTable(e) {
		e.columns?.length && !e.cssStyle?.["table-layout"] && (e.cssStyle ??= {}, e.cssStyle["table-layout"] = "fixed"), this.tableCellPositions.push(this.currentCellPosition), this.tableVerticalMerges.push(this.currentVerticalMerge), this.currentVerticalMerge = {}, this.currentCellPosition = {
			col: 0,
			row: 0
		};
		let t = [];
		return e.columns && t.push(this.renderTableColumns(e.columns)), t.push(...this.renderElements(e.children)), this.currentVerticalMerge = this.tableVerticalMerges.pop(), this.currentCellPosition = this.tableCellPositions.pop(), this.toHTML(e, Q.html, "table", t);
	}
	renderTableColumns(e) {
		let t = e.map((e) => this.h({
			tagName: "col",
			style: { width: e.width }
		}));
		return this.h({
			tagName: "colgroup",
			children: t
		});
	}
	renderTableRow(e) {
		this.currentCellPosition.col = e.gridBefore ?? 0;
		let t = [], n = this.currentTableRow;
		this.currentTableRow = e, e.gridBefore && t.push(this.renderTableCellPlaceholder(e.gridBefore)), t.push(...this.renderElements(e.children)), e.gridAfter && t.push(this.renderTableCellPlaceholder(e.gridAfter));
		for (let e of Object.keys(this.currentVerticalMerge)) this.currentVerticalMerge[e]?.lastRow != this.currentCellPosition.row && delete this.currentVerticalMerge[e];
		this.currentTableRow = n, this.currentCellPosition.row++;
		let r = this.toHTML(e, Q.html, "tr", t);
		return e.isHeader && (r.dataset.docxRepeatHeader = "true"), this.repeatedTableHeaderRows.has(e) && (r.dataset.docxRepeatedHeader = "true"), r;
	}
	renderTableCellPlaceholder(e) {
		return this.h({
			tagName: "td",
			colSpan: e,
			style: { border: "none" }
		});
	}
	renderTableCell(e) {
		let t = this.currentTableRow?.isHeader ? "th" : "td", n = this.toHTML(e, Q.html, t), r = this.currentCellPosition.col, i = Math.max(1, e.span ?? 1), a = this.currentVerticalMerge[r], o = n.style.getPropertyValue?.("border-bottom") || n.style["border-bottom"] || e.cssStyle?.["border-bottom"] || "", s = n.style.getPropertyPriority?.("border-bottom") || "";
		if (e.verticalMerge) {
			if (e.verticalMerge == "restart") this.currentVerticalMerge[r] = {
				cell: n,
				span: i,
				lastRow: this.currentCellPosition.row,
				bottomBorder: o,
				bottomBorderPriority: s
			}, n.rowSpan = 1;
			else if (a?.span == i && a.lastRow == this.currentCellPosition.row - 1) {
				a.cell.rowSpan += 1, a.lastRow = this.currentCellPosition.row;
				let e = o || a.bottomBorder || "";
				a.cell.style.setProperty ? a.cell.style.setProperty("border-bottom", e, s || a.bottomBorderPriority) : a.cell.style["border-bottom"] = e, n.style.display = "none";
			} else delete this.currentVerticalMerge[r];
		} else delete this.currentVerticalMerge[r];
		return e.span && (n.colSpan = e.span), this.currentCellPosition.col += n.colSpan, hi(n, e.props?.diagonalBorders, (e) => this.darkenColorAttr(e)), n;
	}
	renderVmlPicture(e) {
		let t = this.renderContainer(e, this.currentParagraph ? "span" : "div");
		return t.style.display = "block", t;
	}
	vmlLengthInPoints(e) {
		if (e == null) return null;
		let t = String(e).trim();
		if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?(?:pt|px|in|cm|mm|pc)?$/i.test(t)) return null;
		let n = parseFloat(t);
		return Number.isFinite(n) ? /px$/i.test(t) ? n * .75 : /in$/i.test(t) ? n * 72 : /cm$/i.test(t) ? n * 72 / 2.54 : /mm$/i.test(t) ? n * 72 / 25.4 : /pc$/i.test(t) ? n * 12 : n : null;
	}
	vmlRenderContext(e, t) {
		let n = k(e.cssStyleText), [r, i] = e.coordOrigin ?? [0, 0], a = (e) => Number.isFinite(e) ? e : 0, o = this.vmlLengthInPoints(n.width), s = this.vmlLengthInPoints(n.height), c = Math.max(0, a(t?.width ?? (o ?? Math.abs(e.coordSize?.[0] ?? 1)) * 4 / 3)), l = Math.max(0, a(t?.height ?? (s ?? Math.abs(e.coordSize?.[1] ?? 1)) * 4 / 3)), u = e.coordSize?.[0] ?? o ?? c * 3 / 4, d = e.coordSize?.[1] ?? s ?? l * 3 / 4;
		return {
			originX: a(r),
			originY: a(i),
			offsetX: a(t?.x ?? 0),
			offsetY: a(t?.y ?? 0),
			scaleX: u > 0 ? a(c / u) : 0,
			scaleY: d > 0 ? a(l / d) : 0,
			width: c,
			height: l
		};
	}
	vmlMappedValue(e, t, n, r) {
		if (e == null) return 0;
		let i = String(e).trim(), a = parseFloat(i);
		if (!Number.isFinite(a)) return 0;
		let o = n == "x" ? t.scaleX : t.scaleY, s = n == "x" ? t.originX : t.originY, c = r ? 0 : n == "x" ? t.offsetX : t.offsetY, l;
		return l = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)%$/.test(i) ? a * (n == "x" ? t.width : t.height) / 100 + c : /(?:pt|px|in|cm|mm|pc)$/i.test(i) ? (this.vmlLengthInPoints(i) ?? 0) * 4 / 3 + c : this.vmlLengthInPoints(i) == null ? 0 : (r ? a : a - s) * o + c, Number.isFinite(l) ? l : 0;
	}
	vmlBounds(e, t, n) {
		if (n) return n;
		let r = k(e.cssStyleText), i = r.width == null ? t.width : this.vmlMappedValue(r.width, t, "x", !0), a = r.height == null ? t.height : this.vmlMappedValue(r.height, t, "y", !0);
		return {
			x: r.left == null ? t.offsetX : this.vmlMappedValue(r.left, t, "x", !1),
			y: r.top == null ? t.offsetY : this.vmlMappedValue(r.top, t, "y", !1),
			width: Math.max(0, i),
			height: Math.max(0, a)
		};
	}
	vmlCombinedLength(e, t) {
		if (!e) return t;
		if (!t) return e;
		let n = this.vmlLengthInPoints(e), r = this.vmlLengthInPoints(t);
		return n != null && r != null ? `${n + r}pt` : `calc(${e} + ${t})`;
	}
	vmlRootStyle(e) {
		let t = k(e.cssStyleText), n = {};
		for (let e of [
			"position",
			"display",
			"left",
			"top",
			"right",
			"bottom",
			"margin-left",
			"margin-top",
			"width",
			"height",
			"z-index",
			"opacity",
			"visibility",
			"overflow"
		]) t[e] != null && (n[e] = t[e]);
		return t["mso-position-horizontal-relative"] == "page" && (n.left = this.vmlCombinedLength(n.left, n["margin-left"]), delete n["margin-left"]), t["mso-position-vertical-relative"] == "page" && (n.top = this.vmlCombinedLength(n.top, n["margin-top"]), delete n["margin-top"]), n.display ??= "block", n.overflow ??= "visible", n["pointer-events"] = "none", n;
	}
	applyVmlAttributes(e, t, n = /* @__PURE__ */ new Set()) {
		for (let [r, i] of Object.entries(t ?? {})) n.has(r) || e.setAttribute(r, r == "fill" || r == "stroke" ? this.darkenColorAttr(i) : i);
	}
	loadVmlImage(e, t) {
		e.imageHref?.id && this.tasks.push(this.document?.loadDocumentImage(e.imageHref.id, this.currentPart, this.options.externalResourcePolicy).then((e) => {
			e && t.setAttribute("href", e);
		}));
	}
	renderVmlElement(e) {
		let t = this.vmlRenderContext(e), n = this.vmlRootStyle(e);
		n.width ??= `${t.width}px`, n.height ??= `${t.height}px`;
		for (let e of ["width", "height"]) /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(n[e]) && (n[e] = `${t[e]}px`);
		let r = this.createSvgElement("svg", { style: n });
		if (t.width > 0 && t.height > 0 && this.vmlLengthInPoints(n.width) != null && this.vmlLengthInPoints(n.height) != null && r.setAttribute("viewBox", `0 0 ${t.width} ${t.height}`), r.setAttribute("preserveAspectRatio", "none"), r.setAttribute("focusable", "false"), r.dataset.docxVml = "true", e.cssStyle?.position == "absolute") {
			r.dataset.docxFloat = "true";
			let t = e.props?.anchorPosition;
			t?.horizontal?.relative && (r.dataset.docxAnchorHorizontal = t.horizontal.relative), t?.vertical?.relative && (r.dataset.docxAnchorVertical = t.vertical.relative);
		}
		return r.appendChild(this.renderVmlChildElement(e, t, {
			x: 0,
			y: 0,
			width: t.width,
			height: t.height
		}, !0)), r;
	}
	renderVmlChildElement(e, t, n, r = !1) {
		let i = this.vmlBounds(e, t, n), a = this.vmlRenderContext(e, i), o = k(e.cssStyleText), s;
		switch (e.tagName) {
			case "image": {
				let t = this.createSvgElement("svg");
				t.setAttribute("x", `${i.x}`), t.setAttribute("y", `${i.y}`), t.setAttribute("width", `${i.width}`), t.setAttribute("height", `${i.height}`), t.setAttribute("viewBox", "0 0 100 100"), t.setAttribute("preserveAspectRatio", "none"), t.setAttribute("overflow", "hidden");
				let n = this.createSvgElement("image");
				this.applyVmlAttributes(n, e.attrs), n.setAttribute("x", e.attrs.x ?? "0"), n.setAttribute("y", e.attrs.y ?? "0"), n.setAttribute("width", e.attrs.width ?? "100%"), n.setAttribute("height", e.attrs.height ?? "100%"), this.loadVmlImage(e, n), t.appendChild(n), s = t;
				break;
			}
			case "line": {
				let n = this.createSvgElement("line"), r = e.attrs.x1 == null ? i.x : this.vmlMappedValue(e.attrs.x1, t, "x", !1), a = e.attrs.y1 == null ? i.y : this.vmlMappedValue(e.attrs.y1, t, "y", !1), o = e.attrs.x2 == null ? i.x + i.width : this.vmlMappedValue(e.attrs.x2, t, "x", !1), c = e.attrs.y2 == null ? i.y + i.height : this.vmlMappedValue(e.attrs.y2, t, "y", !1);
				n.setAttribute("x1", `${r}`), n.setAttribute("y1", `${a}`), n.setAttribute("x2", `${o}`), n.setAttribute("y2", `${c}`), this.applyVmlAttributes(n, e.attrs, /* @__PURE__ */ new Set([
					"x1",
					"y1",
					"x2",
					"y2"
				])), e.attrs.stroke || n.setAttribute("stroke", "currentColor"), s = n;
				break;
			}
			case "path": {
				let t = this.createSvgElement("path");
				this.applyVmlAttributes(t, e.attrs, /* @__PURE__ */ new Set(["d"])), t.setAttribute("d", e.attrs.d ?? ""), t.setAttribute("transform", `matrix(${a.scaleX} 0 0 ${a.scaleY} ${i.x - a.originX * a.scaleX} ${i.y - a.originY * a.scaleY})`), t.setAttribute("vector-effect", "non-scaling-stroke"), s = t;
				break;
			}
			case "rect": {
				let t = this.createSvgElement("rect");
				if (t.setAttribute("x", `${i.x}`), t.setAttribute("y", `${i.y}`), t.setAttribute("width", `${i.width}`), t.setAttribute("height", `${i.height}`), this.applyVmlAttributes(t, e.attrs, /* @__PURE__ */ new Set([
					"x",
					"y",
					"width",
					"height"
				])), e.roundRectArc != null) {
					let n = Math.min(i.width, i.height) * e.roundRectArc / 2;
					t.setAttribute("rx", `${n}`), t.setAttribute("ry", `${n}`);
				}
				s = t;
				break;
			}
			case "ellipse": {
				let t = this.createSvgElement("ellipse");
				t.setAttribute("cx", `${i.x + i.width / 2}`), t.setAttribute("cy", `${i.y + i.height / 2}`), t.setAttribute("rx", `${i.width / 2}`), t.setAttribute("ry", `${i.height / 2}`), this.applyVmlAttributes(t, e.attrs, /* @__PURE__ */ new Set([
					"cx",
					"cy",
					"rx",
					"ry"
				])), s = t;
				break;
			}
			case "foreignObject": {
				let t = this.createSvgElement("foreignObject"), [n, r, a, o] = (e.textInset ?? [
					"0",
					"0",
					"0",
					"0"
				]).map((e) => (this.vmlLengthInPoints(e) ?? 0) * 4 / 3);
				t.setAttribute("x", `${i.x + n}`), t.setAttribute("y", `${i.y + r}`), t.setAttribute("width", `${Math.max(0, i.width - n - a)}`), t.setAttribute("height", `${Math.max(0, i.height - r - o)}`), this.applyVmlAttributes(t, e.attrs, /* @__PURE__ */ new Set([
					"x",
					"y",
					"width",
					"height"
				])), t.setAttribute("overflow", "hidden");
				let c = this.createElement("div", { style: {
					width: "100%",
					height: "100%",
					overflow: "hidden",
					boxSizing: "border-box"
				} });
				c.setAttribute("xmlns", Q.html);
				for (let t of e.children ?? []) for (let e of A(this.renderElement(t)).filter((e) => e != null)) c.appendChild(D(e) ? document.createTextNode(e) : e);
				t.appendChild(c), s = t;
				break;
			}
			default: s = this.createSvgElement("g"), this.applyVmlAttributes(s, e.attrs);
		}
		if (e.tagName != "foreignObject") {
			if (e.children?.length && e.tagName != "g") {
				let e = this.createSvgElement("g");
				e.appendChild(s), s = e;
			}
			for (let t of e.children ?? []) if (t.type == R.VmlElement) s.appendChild(this.renderVmlChildElement(t, a, e.isGroup ? void 0 : i));
			else for (let e of A(this.renderElement(t)).filter((e) => e != null)) s.appendChild(D(e) ? document.createTextNode(e) : e);
		}
		if (e.isGroup && o.overflow == "hidden") {
			let e = this.createSvgElement("svg");
			e.setAttribute("x", `${i.x}`), e.setAttribute("y", `${i.y}`), e.setAttribute("width", `${i.width}`), e.setAttribute("height", `${i.height}`), i.width > 0 && i.height > 0 && e.setAttribute("viewBox", `${i.x} ${i.y} ${i.width} ${i.height}`), e.setAttribute("overflow", "hidden"), e.appendChild(s), s = e;
		}
		let c = [], l = i.x + i.width / 2, u = i.y + i.height / 2;
		Number.isFinite(e.rotation) && e.rotation && c.push(`rotate(${e.rotation} ${l} ${u})`);
		let d = /x/i.test(o.flip ?? ""), f = /y/i.test(o.flip ?? "");
		if ((d || f) && c.push(`translate(${l} ${u}) scale(${d ? -1 : 1} ${f ? -1 : 1}) translate(${-l} ${-u})`), c.length) {
			let e = this.createSvgElement("g");
			e.setAttribute("transform", c.join(" ")), e.appendChild(s), s = e;
		}
		if (!r) for (let e of [
			"display",
			"visibility",
			"opacity"
		]) o[e] != null && s.style.setProperty(e, o[e]);
		return s;
	}
	renderMmlMathParagraph(e) {
		let t = this.renderElements(e.children);
		for (let e of t) e?.localName == "math" && e.setAttribute("display", "block");
		return this.h({
			tagName: this.currentParagraph ? "span" : "div",
			className: `${this.className}-math-paragraph`,
			style: {
				display: "block",
				textAlign: "center"
			},
			children: t
		});
	}
	renderMmlPhantom(e) {
		return this.renderContainerNS(e, Q.mathML, "mphantom");
	}
	renderMmlAccent(e) {
		let t = e.children?.find((e) => e.type == R.MmlBase), n = this.createMathMLElement("mo", null, [e.props?.char ?? "^"]), r = t ? A(this.renderElement(t)).filter((e) => e != null) : [];
		return this.createMathMLElement("mover", null, [...r, n]);
	}
	renderMmlRadical(e) {
		let t = e.children.find((e) => e.type == R.MmlBase);
		if (e.props?.hideDegree) return this.createMathMLElement("msqrt", null, this.renderElements([t]));
		let n = e.children.find((e) => e.type == R.MmlDegree);
		return this.createMathMLElement("mroot", null, this.renderElements([t, n]));
	}
	renderMmlDelimiter(e) {
		let t = [], n = e.props?.beginChar, r = e.props?.endChar;
		return n !== "" && t.push(this.createMathMLElement("mo", null, [n ?? "("])), t.push(...this.renderElements(e.children)), r !== "" && t.push(this.createMathMLElement("mo", null, [r ?? ")"])), this.createMathMLElement("mrow", null, t);
	}
	renderMmlNary(e) {
		let t = [], n = w(e.children, (e) => e.type), r = n[R.MmlSuperArgument], i = n[R.MmlSubArgument], a = r ? this.createMathMLElement("mrow", null, this.renderElements(r.children)) : null, o = i ? this.createMathMLElement("mrow", null, this.renderElements(i.children)) : null, s = this.createMathMLElement("mo", null, [e.props?.char ?? "∫"]);
		return a && o ? t.push(this.createMathMLElement("munderover", null, [
			s,
			o,
			a
		])) : a ? t.push(this.createMathMLElement("mover", null, [s, a])) : o ? t.push(this.createMathMLElement("munder", null, [s, o])) : t.push(s), n[R.MmlBase] && t.push(...this.renderElements(n[R.MmlBase].children)), this.createMathMLElement("mrow", null, t);
	}
	renderMmlPreSubSuper(e) {
		let t = [], n = w(e.children, (e) => e.type), r = n[R.MmlSuperArgument], i = n[R.MmlSubArgument], a = this.createMathMLElement("mrow", null, r ? this.renderElements(r.children) : []), o = this.createMathMLElement("mrow", null, i ? this.renderElements(i.children) : []), s = this.createMathMLElement("mrow", null, []);
		return t.push(this.createMathMLElement("msubsup", null, [
			s,
			o,
			a
		])), n[R.MmlBase] && t.push(...this.renderElements(n[R.MmlBase].children)), this.createMathMLElement("mrow", null, t);
	}
	renderMmlGroupChar(e) {
		let t = e.props?.verticalJustification === "bot" ? "munder" : "mover", n = this.createMathMLElement("mrow", null, this.renderElements(e.children)), r = this.createMathMLElement("mo", null, [e.props?.char ?? "⏞"]);
		return this.createMathMLElement(t, null, [n, r]);
	}
	renderMmlBar(e) {
		let t = {};
		switch (e.props.position) {
			case "top":
				t.textDecoration = "overline";
				break;
			case "bottom": t.textDecoration = "underline";
		}
		return this.renderContainerNS(e, Q.mathML, "mrow", { style: t });
	}
	renderMmlRun(e) {
		let t = this.extractMathRunText(e);
		if (t != null) {
			let n = this.renderMathTextTokens(t, e.cssStyle);
			return n.length ? n : null;
		}
		return this.renderContainerNS(e, Q.mathML, "mrow");
	}
	extractMathRunText(e) {
		let t = "";
		for (let n of e.children ?? []) switch (n.type) {
			case R.Text:
				t += n.text ?? "";
				break;
			case R.DeletedText:
				Qi($(this.options)) && (t += n.text ?? "");
				break;
			case R.Symbol:
				t += String.fromCharCode(n.char);
				break;
			case R.Tab:
				t += " ";
				break;
			case R.NoBreakHyphen:
				t += "‑";
				break;
			case R.SoftHyphen: break;
			default: return null;
		}
		return t;
	}
	renderMathTextTokens(e, t) {
		let n = [], r = 0;
		for (; r < e.length;) {
			let i = e[r];
			if (/\s/.test(i)) {
				let t = r + 1;
				for (; t < e.length && /\s/.test(e[t]);) t++;
				n.push(this.createMathMLElement("mspace", { width: `${Math.max(1, t - r) * .25}em` })), r = t;
			} else if (La(i)) {
				let i = r + 1;
				for (; i < e.length && (La(e[i]) || e[i] == ".");) i++;
				n.push(this.createMathToken("mn", e.substring(r, i), t)), r = i;
			} else if (Ra(i)) {
				let i = r + 1;
				for (; i < e.length && Ra(e[i]);) i++;
				n.push(this.createMathToken("mi", e.substring(r, i), t)), r = i;
			} else za(i) ? n.push(this.createMathToken("mo", i, t)) : n.push(this.createMathToken("mtext", i, t)), r++;
		}
		return n;
	}
	createMathToken(e, t, n) {
		return this.createMathMLElement(e, n ? { style: n } : null, [t]);
	}
	renderMllList(e) {
		let t = this.renderElements(e.children).map((e) => this.createMathMLElement("mtr", null, [this.createMathMLElement("mtd", null, [e])]));
		return this.toHTML(e, Q.mathML, "mtable", t);
	}
	toH(e, t, n, r = null) {
		let { $lang: i, "$lang-eastAsia": a, "$lang-bidi": o, ...s } = e.cssStyle ?? {};
		return {
			ns: t,
			tagName: n,
			className: Yi(e.className, e.styleName && this.processStyleName(e.styleName)),
			lang: i,
			style: this.darkenStyle(s),
			children: r ?? this.renderElements(e.children)
		};
	}
	darkenStyle(e) {
		if (!this.options.darkMode) return e;
		let t = qi(e);
		if (t === e) return e;
		let n = { ...t };
		for (let r in t) {
			if (r.startsWith("--")) continue;
			let i = e[r], a = t[r];
			a === i || typeof a != "string" || a.toLowerCase().includes("var(") || (n[r] = this.wrapForPrint(i, a));
		}
		return n;
	}
	darkenColorAttr(e) {
		if (!this.options.darkMode) return e;
		let t = Hi(e);
		return t === e || t.toLowerCase().includes("var(") ? t : this.wrapForPrint(e, t);
	}
	wrapForPrint(e, t) {
		let n = this.darkModeVarNames.get(e);
		return n || (n = `--docx-dm-${this.darkModeVarNames.size}`, this.darkModeVarNames.set(e, n), this.darkModePrintReset[n] = e), `var(${n}, ${t})`;
	}
	renderDarkModePrintReset() {
		let e = Object.entries(this.darkModePrintReset);
		if (!this.options.darkMode || e.length === 0) return [];
		let t = e.map(([e, t]) => `  ${e}: ${t};\r\n`).join(""), n = `@media print {\r\n.${this.className} {\r\n${t}}\r\n}\r\n`;
		return [this.h({
			tagName: "style",
			children: [n]
		})];
	}
	toHTML(e, t, n, r = null) {
		let i = this.h(this.toH(e, t, n, r));
		return i?.nodeType === 1 && this.applyElementRevisionMetadata(i, e), i;
	}
	applyElementRevisionMetadata(e, t) {
		let n = t.props?.revision;
		(n?.kind === "insert" || n?.kind === "delete") && (Xi(this.options) ? (e.dataset.docxChangeKind = n.kind, e.style.setProperty("--docx-review-color", Sa(n.author)), n.id != null && (e.dataset.docxChangeId = `${n.id}`), n.author && (e.dataset.docxChangeAuthor = n.author), n.date && (e.dataset.docxChangeDate = n.date)) : n.kind === "delete" && (e.style.display = "none"));
		let r = t.props?.formatRevisions?.[0];
		r && Xi(this.options) && (e.dataset.docxFormatChange = "true", e.style.setProperty("--docx-review-color", Sa(r.author)), r.id != null && (e.dataset.docxChangeId = `${r.id}`), r.author && (e.dataset.docxChangeAuthor = r.author), r.date && (e.dataset.docxChangeDate = r.date));
	}
	findStyle(e) {
		return e && this.styleMap?.[e];
	}
	isTocParagraphStyle(e, t) {
		return [
			e,
			t?.id,
			t?.name,
			t?.cssName,
			...t?.aliases ?? []
		].filter(Boolean).map((e) => String(e).replace(/[\s_-]+/g, "").toLowerCase()).some((e) => /^toc[1-9]$/.test(e));
	}
	numberingClass(e, t) {
		return `${this.className}-num-${e}-${t}`;
	}
	numberingSelector(e, t) {
		return `.${this.className} p.${this.numberingClass(e, t)}`;
	}
	tabStopClass() {
		return `${this.className}-tab-stop`;
	}
	scopeDocumentStyleSelector(e) {
		let t = e.trim();
		return !t || t.startsWith(`.${this.className}`) || t.startsWith(`section.${this.className}`) || t.startsWith(`.${this.className}-wrapper`) ? e : `.${this.className} ${e}`;
	}
	styleToString(e, t, n = null) {
		let r = `${e} {\r\n`, i = this.darkenStyle(t);
		for (let e in i) e.startsWith("$") || (r += `  ${e}: ${i[e]};\r\n`);
		return n && (r += n), r + "}\r\n";
	}
	numberingCounter(e, t) {
		return `${this.className}-num-${e}-${t}`;
	}
	numberingRestartLevel(e) {
		if (e.level <= 0) return null;
		if (e.restart == null) return e.level - 1;
		if (e.restart == 0) return null;
		let t = e.restart - 1;
		return t >= 0 && t < e.level ? t : null;
	}
	numberingMarkerRunStyle(e, t) {
		if (!e) return e;
		let n = { ...e };
		return t && (delete n["font-family"], delete n["--docx-latin-font-family"], delete n["--docx-partial-eastasia-font"]), n;
	}
	normalizeNumberingLevelText(e, t, n) {
		if (t != "bullet" || !e) return {
			text: e,
			normalized: !1
		};
		let r = (n?.["font-family"] ?? "").toLowerCase(), i = !1, a = null;
		if (r.includes("wingdings")) a = this.wingdingsBulletMap();
		else if (r.includes("symbol")) a = this.symbolBulletMap();
		else return {
			text: e,
			normalized: !1
		};
		let o = "";
		for (let t of e) {
			let e = a[t.charCodeAt(0)];
			e ? (o += e, i = !0) : o += t;
		}
		return {
			text: o,
			normalized: i
		};
	}
	symbolBulletMap() {
		return {
			183: "•",
			8226: "•",
			61623: "•"
		};
	}
	wingdingsBulletMap() {
		return {
			61548: "●",
			61550: "■",
			61557: "◆",
			61598: "·",
			61599: "•",
			61600: "▪",
			61601: "○",
			61604: "◉",
			61605: "◎",
			61607: "▪",
			61608: "◻",
			61656: "➢",
			61672: "➔",
			61690: "▫",
			61691: "✗",
			61692: "✓",
			61693: "☒",
			61694: "☑"
		};
	}
	levelTextToContent(e, t, n, r, i) {
		let a = [], o = 0;
		for (let t of e.matchAll(/%\d+/g)) {
			t.index > o && a.push(`"${this.escapeCssString(e.substring(o, t.index))}"`);
			let s = parseInt(t[0].substring(1), 10) - 1, c = i?.get(`${n}:${s}`) ?? r ?? "decimal";
			a.push(`counter(${this.numberingCounter(n, s)}, ${c})`), o = t.index + t[0].length;
		}
		let s = e.substring(o);
		s && a.push(`"${this.escapeCssString(s)}"`);
		let c = this.numberingSuffixToCssContent(t);
		return c && a.push(c), a.length > 0 ? a.join(" ") : "\"\"";
	}
	numberingSuffixToCssContent(e) {
		switch (e || "tab") {
			case "nothing": return "";
			case "space": return "\"\\000020\"";
			default: return "\"\\000009\"";
		}
	}
	escapeCssString(e) {
		return e.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\r?\n/g, "\\A ");
	}
	numFormatToCssValue(e) {
		return {
			none: "none",
			bullet: "disc",
			decimal: "decimal",
			lowerLetter: "lower-alpha",
			upperLetter: "upper-alpha",
			lowerRoman: "lower-roman",
			upperRoman: "upper-roman",
			decimalZero: "decimal-leading-zero",
			aiueo: "katakana",
			aiueoFullWidth: "katakana",
			chineseCounting: "simp-chinese-informal",
			chineseCountingThousand: "simp-chinese-informal",
			chineseLegalSimplified: "simp-chinese-formal",
			chosung: "hangul-consonant",
			ideographDigital: "cjk-ideographic",
			ideographTraditional: "cjk-heavenly-stem",
			ideographLegalTraditional: "trad-chinese-formal",
			ideographZodiac: "cjk-earthly-branch",
			iroha: "katakana-iroha",
			irohaFullWidth: "katakana-iroha",
			japaneseCounting: "japanese-informal",
			japaneseDigitalTenThousand: "cjk-decimal",
			japaneseLegal: "japanese-formal",
			thaiNumbers: "thai",
			koreanCounting: "korean-hangul-formal",
			koreanDigital: "korean-hangul-formal",
			koreanDigital2: "korean-hanja-informal",
			hebrew1: "hebrew",
			hebrew2: "hebrew",
			hindiNumbers: "devanagari",
			ganada: "hangul",
			taiwaneseCounting: "cjk-ideographic",
			taiwaneseCountingThousand: "cjk-ideographic",
			taiwaneseDigital: "cjk-decimal"
		}[e] ?? e ?? "decimal";
	}
	refreshTabStops(e) {
		let t = e?.querySelectorAll ? Array.from(e.querySelectorAll("[data-docx-tab-id]")) : this.currentTabs.map((e) => e.span);
		for (let e of t) {
			if (!e.isConnected || !this.ownsLayoutElement(e)) continue;
			let t = this.currentTabs[Number(e.dataset.docxTabId)];
			t && !fi(e, t.stops) && this.options.experimental && li(e, t.stops, this.defaultTabSize, ci());
		}
	}
	createElementNS(e, t, n, r) {
		return this.h({
			ns: e,
			tagName: t,
			children: r,
			...n
		});
	}
	createElement(e, t, n) {
		return this.createElementNS(Q.html, e, t, n);
	}
	createMathMLElement(e, t, n) {
		return this.createElementNS(Q.mathML, e, t, n);
	}
	createSvgElement(e, t, n) {
		return this.createElementNS(Q.svg, e, t, n);
	}
	later(e) {
		this.postRenderTasks.push(e);
	}
};
Ia.nextCommentId = 0;
function La(e) {
	return e >= "0" && e <= "9";
}
function Ra(e) {
	if (!e) return !1;
	let t = e.charCodeAt(0);
	return t >= 65 && t <= 90 || t >= 97 && t <= 122 || t >= 913 && t <= 1023 || t >= 119808 && t <= 120831;
}
function za(e) {
	return "()+-−=<>≤≥≈≠×÷*/·∙∑Σ∏∫√∞∂∇,.;:[]{}|‖!′″→←↔⇒⇔∈∉⊂⊃⊆⊇∧∨¬".includes(e);
}
function Ba(e, t) {
	for (var n = e.parent; n != null && n.type != t;) n = n.parent;
	return n;
}
var Va = "文件为空或尚未保存，无法作为 Word 文档打开。请在 WPS/Word 中保存后重新上传。";
function Ha(e) {
	if (Ua(e) === 0) throw Error(Va);
}
function Ua(e) {
	return e == null ? 0 : typeof Blob < "u" && e instanceof Blob ? e.size : typeof ArrayBuffer < "u" && (e instanceof ArrayBuffer || ArrayBuffer.isView(e)) ? e.byteLength : typeof e.size == "number" ? e.size : typeof e.byteLength == "number" ? e.byteLength : typeof e.length == "number" ? e.length : null;
}
var Wa = {
	ignoreHeight: !1,
	ignoreWidth: !1,
	fixedPageHeight: !0,
	ignoreFonts: !1,
	breakPages: !0,
	strictWordCompatibility: !0,
	paginationTolerance: 2,
	maxDynamicPaginationPasses: 1e3,
	awaitLayout: !0,
	useWorker: !0,
	workerUrl: void 0,
	workerFactory: void 0,
	workerJsZipUrl: void 0,
	workerFallback: !0,
	workerTimeout: 12e4,
	renderPageBatchSize: 2,
	renderYieldEveryMs: 16,
	progress: void 0,
	preserveComplexFieldResults: !0,
	updatePageReferences: !1,
	hideWebHiddenContent: !1,
	externalLinkPolicy: "allow",
	externalResourcePolicy: "block",
	darkMode: !1,
	debug: !1,
	experimental: !1,
	className: "docx",
	inWrapper: !0,
	hideWrapperOnPrint: !1,
	trimXmlDeclaration: !0,
	ignoreLastRenderedPageBreak: !1,
	renderHeaders: !0,
	renderFooters: !0,
	renderFootnotes: !0,
	renderEndnotes: !0,
	useBase64URL: !1,
	renderChanges: !1,
	reviewMode: void 0,
	reviewPresentation: "balloon",
	renderComments: !1,
	renderAltChunks: !0,
	h: Ji
};
function Ga(e) {
	let t = {
		...Wa,
		...e
	};
	return e?.reviewMode != null && e.renderComments == null && (t.renderComments = !0), t;
}
function Ka(e, t, n) {
	if (t.reviewMode !== "auto") return t;
	let r = ta(e, "auto");
	return t.reviewMode = r.enabled ? r.mode : void 0, t.renderChanges = r.enabled, n?.renderComments ?? (t.renderComments = r.enabled), t;
}
function qa(e, t) {
	let n = Ga(t);
	return n.licenseToken, Ha(e), $a(n) ? no(e, n).catch((t) => {
		if (!n.workerFallback) throw t;
		return n.debug && console.warn("docx-preview: worker parsing failed; falling back to main thread", t), Ja(e, {
			...n,
			useWorker: !1
		});
	}) : Ja(e, n);
}
function Ja(e, t) {
	return Ha(e), t.progress?.({
		phase: "parse",
		message: "Parsing DOCX on main thread"
	}), Dr.load(e, new Xr(t), t);
}
async function Ya(e, t) {
	let n = Ka(e, Ga(t), t);
	return n.licenseToken, await new Ia().render(e, n);
}
async function Xa(e, t, n, r) {
	let i = Ga(r);
	i.licenseToken, ao(t);
	let o = a(t), s = await qa(e, i);
	c(t, o, !1), Ka(s, i, r);
	let d = await Ya(s, i);
	c(t, o, !1), n ??= t, n === t || n.replaceChildren(), t.replaceChildren();
	let f = 0;
	for (let e of d) (e.nodeName === "STYLE" ? n : t).appendChild(e), f++, i.renderYieldEveryMs > 0 && f % 8 == 0 && (await fo(), c(t, o, !1));
	Qa(t), Xi(i) ? (t.dataset.docxReviewEnabled = "true", t.dataset.docxReviewMode = $(i), t.dataset.docxReviewPresentation = i.reviewPresentation ?? "balloon") : (delete t.dataset.docxReviewEnabled, delete t.dataset.docxReviewMode, delete t.dataset.docxReviewPresentation), co(t, i.className);
	let p = null;
	if (i.awaitLayout) i.progress?.({
		phase: "layout",
		message: "Measuring rendered pages"
	}), p = await ro(t, i), c(t, o), co(t, i.className);
	else {
		let e = l(t, o);
		u(t, [], e).then(() => Fa(t, e)).catch(() => {});
	}
	return oo(t, i, o), i.progress?.({
		phase: "done",
		current: p?.pageCount,
		total: p?.pageCount,
		message: "DOCX render complete"
	}), s;
}
var Za = /* @__PURE__ */ new WeakMap();
function Qa(e) {
	let t = Za.get(e);
	t && e.removeEventListener("click", t);
	let n = (t) => {
		let n = t;
		if (n.defaultPrevented || n.button != 0 || n.metaKey || n.ctrlKey || n.shiftKey || n.altKey) return;
		let r = n.target;
		if (!(r instanceof Element)) return;
		let i = r.closest("a[href^=\"#\"]");
		if (!i || !e.contains(i)) return;
		let a = i.getAttribute("href");
		if (!a || a == "#") return;
		let o = a.substring(1);
		try {
			o = decodeURIComponent(o);
		} catch {
			return;
		}
		let s = Array.from(e.querySelectorAll("[id]")).find((e) => e.id == o);
		s && (n.preventDefault(), s.scrollIntoView({
			block: "start",
			inline: "nearest"
		}));
	};
	e.addEventListener("click", n), Za.set(e, n);
}
function $a(e) {
	return !!(e.useWorker && (e.workerFactory || e.workerUrl) && typeof Worker < "u");
}
function eo(e) {
	let { h: t, progress: n, licenseToken: r, workerFactory: i, ...a } = e;
	return {
		...a,
		useWorker: !1
	};
}
var to = 0;
function no(e, t) {
	let n = {
		...Wa,
		...t
	};
	return n.licenseToken, Ha(e), !n.workerFactory && !n.workerUrl || typeof Worker > "u" ? Ja(e, {
		...n,
		useWorker: !1
	}) : (n.progress?.({
		phase: "worker",
		message: "Starting DOCX parse worker"
	}), new Promise((t, r) => {
		let i = ++to, a = n.workerFactory ? n.workerFactory() : new Worker(n.workerUrl), o = !1, s = null, c = () => {
			o = !0, s && clearTimeout(s), a.terminate();
		};
		n.workerTimeout > 0 && (s = setTimeout(() => {
			o || (c(), r(/* @__PURE__ */ Error(`docx-preview worker timed out after ${n.workerTimeout}ms`)));
		}, n.workerTimeout)), a.onerror = (e) => {
			o || (c(), r(Error(e.message || "docx-preview worker error")));
		}, a.onmessage = (e) => {
			let a = e.data ?? {};
			if (a.id === i || a.type === "ready") {
				if (a.type === "progress") n.progress?.({
					phase: "worker",
					current: a.current,
					total: a.total,
					message: a.message
				});
				else if (a.type === "parsed") c(), n.progress?.({
					phase: "worker",
					message: "Worker parse complete"
				}), t(Dr.fromSnapshot(a.snapshot, n));
				else if (a.type === "error") {
					c();
					let e = Error(a.error?.message ?? "docx-preview worker parse failed");
					e.stack = a.error?.stack, r(e);
				}
			}
		}, a.postMessage({
			type: "parse",
			id: i,
			data: e,
			options: eo(n),
			jsZipUrl: n.workerJsZipUrl
		});
	}));
}
async function ro(e, t) {
	let n = {
		...Wa,
		...t
	}, r = l(e);
	await u(e, [], r), await Fa(e, r);
	let i = Array.from(e.querySelectorAll(`.${n.className}-wrapper`));
	if (e.classList?.contains(`${n.className}-wrapper`) && i.unshift(e), n.breakPages && n.fixedPageHeight && !n.ignoreHeight && i.length) {
		let t = Math.max(2, n.maxDynamicPaginationPasses ?? 120), a = () => i.some((e) => e.dataset.docxPaginating === "true" || e.dataset.docxPaginationScheduled === "true");
		for (let n = 0; n < t; n++) {
			await fo(), c(e, r);
			let t = i.find((e) => e.dataset.docxLayoutError);
			if (t) throw Error(t.dataset.docxLayoutError);
			if (!a()) break;
		}
		if (a()) throw Error("DOCX layout did not settle within the configured pagination wait budget");
	}
	return await fo(), c(e, r), await Fa(e, r), c(e, r), so(e, n);
}
var io = /* @__PURE__ */ new WeakMap();
function ao(e) {
	o(e), io.get(e)?.(), io.delete(e), Pa(e);
	let t = Za.get(e);
	t && e.removeEventListener("click", t), Za.delete(e);
}
function oo(e, t, n) {
	io.get(e)?.();
	let r = e.ownerDocument.defaultView;
	if (!r || typeof r.requestAnimationFrame != "function" || typeof r.cancelAnimationFrame != "function") return;
	let i = 0, a = !1, o = !1, s = !1, c = async () => {
		if (i = 0, a || o || !n.isCurrent() || !e.isConnected) return;
		let r = e.querySelector(`.${t.className}-wrapper`);
		if (r?.dataset.docxPaginating !== "true" && r?.dataset.docxPaginationScheduled !== "true") {
			o = !0, s = !1;
			try {
				let t = l(e, n);
				await u(e, [], t), await Fa(e, t);
			} catch (e) {
				n.isCurrent() && e?.name !== "AbortError" && (r && (r.dataset.docxLayoutError = e?.message ?? "DOCX layout failed"), t.debug && console.warn("DOCX layout refresh failed", e));
			} finally {
				o = !1, s && d();
			}
		}
	}, d = () => {
		!a && n.isCurrent() && (o ? s = !0 : i ||= r.requestAnimationFrame(() => {
			c();
		}));
	}, f = r.ResizeObserver ? new r.ResizeObserver(d) : null, p = typeof r.MutationObserver == "function" ? new r.MutationObserver((e) => {
		let t = new Set(e.flatMap((e) => Array.from(e.addedNodes))), n = new Set(e.flatMap((e) => Array.from(e.removedNodes)));
		[...t, ...n].some((e) => e.isConnected || !t.has(e) || !n.has(e)) && d();
	}) : null;
	f?.observe(e), p?.observe(e, {
		childList: !0,
		subtree: !0
	}), r.addEventListener("resize", d), e.ownerDocument.fonts?.addEventListener?.("loadingdone", d);
	let m = () => {
		a || (a = !0, r.cancelAnimationFrame(i), f?.disconnect(), p?.disconnect(), r.removeEventListener("resize", d), e.ownerDocument.fonts?.removeEventListener?.("loadingdone", d), n.signal.removeEventListener("abort", m));
	};
	n.signal.addEventListener("abort", m, { once: !0 }), io.set(e, m);
}
function so(e, t) {
	let n = {
		...Wa,
		...t
	}, r = Array.from(e.querySelectorAll(`section.${n.className}`)).map((e, t) => {
		let r = Array.from(e.querySelectorAll("[data-docx-field-instr]")), i = Array.from(e.querySelectorAll("img")).filter((e) => !e.complete || e.naturalWidth === 0).length, a = e.clientHeight > 0 && e.scrollHeight > e.clientHeight + (n.paginationTolerance ?? 2);
		return {
			index: t + 1,
			section: e.dataset.docxSection ?? "",
			pageNumber: parseInt(e.dataset.docxPageNumber ?? `${t + 1}`, 10),
			sectionPageNumber: parseInt(e.dataset.docxSectionPageNumber ?? "1", 10),
			width: e.clientWidth,
			height: e.clientHeight,
			scrollHeight: e.scrollHeight,
			overflow: a,
			textLength: e.textContent?.length ?? 0,
			anchors: Array.from(e.querySelectorAll("[id]")).map((e) => e.id).filter(Boolean),
			fields: r.map((e) => ({
				instruction: e.dataset.docxFieldInstr ?? "",
				value: e.textContent ?? ""
			})),
			floats: e.querySelectorAll("[data-docx-float=\"true\"]").length,
			unresolvedMedia: i
		};
	});
	return {
		pageCount: r.length,
		overflowPages: r.filter((e) => e.overflow).map((e) => e.index),
		unresolvedMedia: r.reduce((e, t) => e + t.unresolvedMedia, 0),
		textLength: r.reduce((e, t) => e + t.textLength, 0),
		fields: r.flatMap((e) => e.fields),
		floats: r.reduce((e, t) => e + t.floats, 0),
		pages: r
	};
}
function co(e, t = "docx") {
	if (!e || typeof getComputedStyle != "function") return;
	let n = Array.from(e.querySelectorAll("p")), r = `${t}-num-`;
	for (let e of n) {
		if (!e.className?.includes(r)) continue;
		let t = getComputedStyle(e, "::before");
		if (!t.content || t.content == "none" || t.content == "normal") continue;
		let n = lo(e);
		if (!n || n == e) continue;
		let i = getComputedStyle(n);
		uo(e, "--docx-marker-font-family", i.fontFamily), uo(e, "--docx-marker-font-size", i.fontSize), uo(e, "--docx-marker-font-style", i.fontStyle), uo(e, "--docx-marker-font-weight", i.fontWeight);
	}
}
function lo(e) {
	let t = document.createTreeWalker(e, NodeFilter.SHOW_TEXT);
	for (; t.nextNode();) {
		let n = t.currentNode;
		if (!n.nodeValue?.trim()) continue;
		let r = n.parentElement;
		if (!r || r == e) return e;
		let i = getComputedStyle(r);
		if (i.display != "none" && i.visibility != "hidden") return r;
	}
	return null;
}
function uo(e, t, n) {
	n && e.style.setProperty(t, n);
}
function fo() {
	return new Promise((e) => {
		let t = globalThis;
		typeof t.requestIdleCallback == "function" ? t.requestIdleCallback(() => e(), { timeout: 32 }) : typeof t.requestAnimationFrame == "function" ? t.requestAnimationFrame(() => e()) : setTimeout(e, 0);
	});
}
var po = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	awaitRenderedLayout: ro,
	collectDocxReviewChanges: ea,
	collectLayoutSnapshot: so,
	defaultOptions: Wa,
	disposeRenderedDocument: ao,
	parseAsync: qa,
	parseAsyncInWorker: no,
	renderAsync: Xa,
	renderDocument: Ya,
	resolveDocxReviewState: ta,
	setDocxReviewMode: $i,
	syncNumberingMarkerStyles: co,
	yieldToBrowser: fo
});
export { ro as awaitRenderedLayout, ea as collectDocxReviewChanges, so as collectLayoutSnapshot, po as default, Wa as defaultOptions, ao as disposeRenderedDocument, qa as parseAsync, no as parseAsyncInWorker, Xa as renderAsync, Ya as renderDocument, ta as resolveDocxReviewState, $i as setDocxReviewMode, co as syncNumberingMarkerStyles, fo as yieldToBrowser };
