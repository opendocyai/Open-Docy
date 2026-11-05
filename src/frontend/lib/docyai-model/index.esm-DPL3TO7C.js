import { a as e, i as t, n, o as r, r as i, s as a } from "./src-DIgrtk6h.js";
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/module/browser.js
function o() {
	return typeof globalThis == "object" && globalThis !== null && globalThis.Object === Object && globalThis || typeof self == "object" && self !== null && self.Object === Object && self || Function("return this")();
}
function s(e) {
	let t = typeof e?.requestAnimationFrame == "function" && typeof e?.cancelAnimationFrame == "function", n = typeof e?.requestIdleCallback == "function" && typeof e?.cancelIdleCallback == "function", r = (e) => setTimeout(e, 1), i = (e) => clearTimeout(e);
	return [
		t ? e.requestAnimationFrame : r,
		t ? e.cancelAnimationFrame : i,
		n ? e.requestIdleCallback : r,
		n ? e.cancelIdleCallback : i
	];
}
var c = o(), l = c?.document, [u, d, f, p] = s(c), m = (e) => e || e === 0, h = (e) => typeof e == "function", g = (e) => typeof e == "string", _ = (e) => typeof e == "number", v = (e) => e === void 0, y = (e) => e !== void 0, b = (e) => typeof e == "boolean", x = (e) => Math.ceil(e / 10) * 10, S = (e) => Math.ceil(e) + .5, C = (e) => e[1] - e[0], w = (e) => typeof e == "object", T = (e) => {
	for (let t in e) if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
	return !0;
}, E = (e) => v(e) || e === null || g(e) && e.length === 0 || w(e) && !(e instanceof Date) && T(e) || _(e) && isNaN(e), D = (e) => !E(e), O = (e) => Array.isArray(e), k = (e) => e && !e?.nodeType && w(e) && !O(e), A = /* @__PURE__ */ new Set(/* @__PURE__ */ "span.div.p.br.b.i.em.small.strong.mark.u.s.sub.sup.h1.h2.h3.h4.h5.h6.ul.ol.li.dl.dt.dd.table.thead.tbody.tfoot.tr.th.td.caption.colgroup.col.hr.pre.code.blockquote.abbr.ins.del.a.img.figure.figcaption.svg.g.path.circle.ellipse.rect.line.polyline.polygon.text.tspan.textPath.use.defs.symbol.clipPath.mask.linearGradient.radialGradient.stop.pattern.marker.title.desc".split(".")), j = /* @__PURE__ */ new Set(/* @__PURE__ */ "class.id.style.title.lang.dir.href.src.alt.width.height.colspan.rowspan.scope.headers.d.points.x.y.x1.x2.y1.y2.cx.cy.r.rx.ry.dx.dy.viewBox.preserveAspectRatio.transform.fill.fill-opacity.fill-rule.stroke.stroke-width.stroke-opacity.stroke-linecap.stroke-linejoin.stroke-dasharray.stroke-dashoffset.opacity.clip-path.clip-rule.mask.font-family.font-size.font-weight.font-style.text-anchor.dominant-baseline.offset.stop-color.stop-opacity.gradientUnits.gradientTransform.spreadMethod.patternUnits.patternTransform.marker-start.marker-mid.marker-end.markerWidth.markerHeight.refX.refY.xlink:href".split(".")), M = /* @__PURE__ */ new Map();
A.forEach((e) => M.set(e.toLowerCase(), e));
var N = /* @__PURE__ */ new Map();
j.forEach((e) => N.set(e.toLowerCase(), e));
var ee = /* @__PURE__ */ new Set([
	"http:",
	"https:",
	"mailto:"
]), te = /* @__PURE__ */ new Set([
	"href",
	"src",
	"xlink:href"
]), ne = /^<\/?([a-zA-Z][a-zA-Z0-9]*)/, re = /^<\/([a-zA-Z][a-zA-Z0-9]*)\s*>$/, ie = /^<([a-zA-Z][a-zA-Z0-9]*)([\s\S]*?)(\/?)>$/, ae = /([a-zA-Z][\w:-]*)\s*(?:=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g, oe = /url\s*\(\s*["']?([^"')]+)["']?\s*\)/gi, se = [
	"expression(",
	"behavior:",
	"binding:",
	"@import",
	"@charset",
	"-moz-binding:"
];
function ce(e) {
	return e.replace(/&colon;/gi, ":").replace(/&newline;/gi, "\n").replace(/&tab;/gi, "	").replace(/&nbsp;/gi, " ").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&").replace(/&quot;/gi, "\"").replace(/&apos;/gi, "'").replace(/&#(\d+);?/gi, (e, t) => String.fromCharCode(parseInt(t, 10))).replace(/&#x([0-9a-f]+);?/gi, (e, t) => String.fromCharCode(parseInt(t, 16)));
}
function le(e) {
	let t = ce(e).trim().replace(/[\s\u0000-\u001f]/g, "").toLowerCase();
	if (!t || t.startsWith("#")) return !0;
	let n = t.match(/^[^/?#]*:/);
	return !n || ee.has(n[0]);
}
function ue(e) {
	let t = ce(e).replace(/[\u0000-\u001f]/g, "");
	oe.lastIndex = 0;
	let n;
	for (; (n = oe.exec(t)) !== null;) if (!le(n[1])) return null;
	let r = t.toLowerCase().replace(/\s/g, "");
	for (let e of se) if (r.includes(e)) return null;
	return e;
}
var de = {
	"\"": "&quot;",
	"'": "&#39;",
	"`": "&#96;"
}, fe = /["'`]/g;
function pe(e) {
	return e.replace(fe, (e) => de[e]);
}
function me(e, t, n = !1) {
	if (te.has(e)) return le(t) ? n ? pe(t) : t : null;
	if (e === "style") {
		let e = ue(t);
		return e === null ? null : n ? pe(e) : e;
	}
	let r = ce(t).toLowerCase().replace(/\s/g, "");
	return /\bon\w+=/.test(r) ? null : n ? pe(t) : t;
}
function he(e) {
	let t = e.match(ne);
	return t ? t[1].toLowerCase() : null;
}
function ge(e) {
	let t = he(e);
	return t !== null && M.has(t);
}
function _e(e) {
	let t = e.match(re);
	if (t) {
		let e = t[1].toLowerCase();
		return `</${M.get(e) ?? e}>`;
	}
	let n = e.match(ie);
	if (!n) return "";
	let [, r, i, a] = n, o = r.toLowerCase(), s = M.get(o) ?? o, c = [];
	ae.lastIndex = 0;
	let l;
	for (; (l = ae.exec(i)) !== null;) {
		let e = l[1].toLowerCase(), t = l[2], n = l[3], r = l[4];
		if (e.startsWith("on")) continue;
		let i = N.get(e) ?? e, a, o;
		if (t !== void 0) a = t, o = "\"";
		else if (n !== void 0) a = n, o = "'";
		else if (r !== void 0) a = r, o = "\"";
		else {
			N.has(e) && c.push(i);
			continue;
		}
		if (N.has(e)) {
			let t = me(e, a, r !== void 0);
			t !== null && c.push(`${i}=${o}${t}${o}`);
		}
	}
	return `<${s}${c.length > 0 ? ` ${c.join(" ")}` : ""}${a ? "/>" : ">"}`;
}
function ve(e) {
	return typeof e != "string" || !e || e.indexOf("<") === -1 ? e : e.replace(/<\/?[^>]*>|<[^>]*$|[^<>\s]+>/g, (e) => e.startsWith("<") && !e.endsWith(">") ? e.replace(/</g, "&lt;") : e.startsWith("<!--") ? "" : e.startsWith("<") ? ge(e) ? _e(e) : e.replace(/</g, "&lt;") : e.slice(0, -1) + "&gt;");
}
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/module/util/object.js
function ye(e, t) {
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		r !== null && y(r) && t(r, n);
	}
}
function be(e, t, n) {
	return y(e[t]) ? e[t] : n;
}
function xe(e, t) {
	for (let n in e) if (e[n] === t) return !0;
	return !1;
}
function P(e, t, ...n) {
	let r = h(e);
	return r && e.call(t, ...n), r;
}
function Se(e, t) {
	let n = 0, r = function(...e) {
		!--n && t.apply(this, e);
	};
	"duration" in e ? e.each(() => ++n).on("end", r) : (++n, e.call(r));
}
var Ce = (e) => e.charAt(0).toUpperCase() + e.slice(1);
function we(e, t = "-") {
	return e.split(t).map((e, t) => t ? e.charAt(0).toUpperCase() + e.slice(1).toLowerCase() : e.toLowerCase()).join("");
}
var Te = (e) => [].slice.call(e);
function Ee(...e) {
	let t = (e) => {
		if (O(e)) return e.map(t);
		if (k(e) && e.constructor) {
			let n = new e.constructor();
			for (let r in e) n[r] = t(e[r]);
			return n;
		}
		return e;
	};
	return e.map((e) => t(e)).reduce((e, t) => ({
		...e,
		...t
	}));
}
function F(e = {}, t) {
	O(t) && t.forEach((t) => F(e, t));
	for (let n in t) /^\d+$/.test(n) || n in e || (e[n] = t[n]);
	return e;
}
function De(e) {
	let t = e[0] instanceof Date, n = Array.from(new Set(t ? e.map(Number) : e));
	return t ? n.map((e) => new Date(e)) : n;
}
function Oe(e) {
	return e && e.length ? e.reduce((e, t) => e.concat(t)) : [];
}
function ke(e, ...t) {
	if (!t.length || t.length === 1 && !t[0]) return e;
	let n = t.shift();
	return k(e) && k(n) && Object.keys(n).forEach((t) => {
		if (!/^(__proto__|constructor|prototype)$/i.test(t)) {
			let r = n[t];
			r instanceof Date ? e[t] = new Date(r.getTime()) : k(r) ? (!e[t] && (e[t] = {}), e[t] = ke(e[t], r)) : e[t] = O(r) ? r.concat() : r;
		}
	}), ke(e, ...t);
}
function Ae(e, t = !0) {
	let n;
	return e[0] instanceof Date ? n = t ? (e, t) => e - t : (e, t) => t - e : t && !e.every(isNaN) ? n = (e, t) => e - t : t || (n = (e, t) => e > t && -1 || e < t && 1 || e === t && 0), e.concat().sort(n);
}
function je(e, t) {
	let n = t.filter((e) => D(e));
	if (n.length) {
		if (_(n[0])) {
			let t = e === "min" ? Infinity : -Infinity;
			for (let r of n) (e === "min" ? r < t : r > t) && (t = r);
			n = t;
		} else n[0] instanceof Date && (n = Ae(n, e === "min")[0]);
	} else n = void 0;
	return n;
}
var Me = (e, t, n = 1) => {
	let r = [], i = Math.max(0, Math.ceil((t - e) / n)) | 0;
	for (let t = 0; t < i; t++) r.push(e + t * n);
	return r;
}, Ne = 0;
function Pe(e = !0) {
	let t = ++Ne;
	return e ? String(t) : t;
}
function Fe(e, t, n, r, i) {
	if (n > r) return -1;
	let a = Math.floor((n + r) / 2), { x: o, w: s = 0 } = e[a];
	return i && (o = e[a].y, s = e[a].h), t >= o && t <= o + s ? a : t < o ? Fe(e, t, n, a - 1, i) : Fe(e, t, a + 1, r, i);
}
function Ie(e, t) {
	return ve(e.replace(/\{=([^}]+)\}/g, (e, n) => t[n] ?? ""));
}
function Le(e) {
	let t;
	if (e instanceof Date) t = e;
	else if (g(e)) {
		let { config: n, format: r } = this;
		t = r.dataTime(n.data_xFormat)(e) ?? new Date(e);
	} else _(e) && !isNaN(e) && (t = /* @__PURE__ */ new Date(+e));
	return (!t || isNaN(+t)) && console && console.error && console.error(`Failed to parse x '${e}' to Date object`), t;
}
function Re(e) {
	if (k(e) && !g(e)) {
		let t = e;
		return {
			top: t.top || 0,
			right: t.right || 0,
			bottom: t.bottom || 0,
			left: t.left || 0
		};
	}
	let [t, n = t, r = t, i = n] = (g(e) ? e.trim().split(/\s+/) : [e]).map((e) => +e || 0);
	return {
		top: t,
		right: n,
		bottom: r,
		left: i
	};
}
function ze(e, t) {
	t() === !1 ? u(() => ze(e, t)) : e();
}
function Be(e, t = ((e) => e)) {
	let n = /* @__PURE__ */ new Set();
	return ye(e, (e, r) => {
		n.add(t(e, r));
	}), n;
}
function Ve(e, t, n = ((e) => e)) {
	let r = /* @__PURE__ */ new Map();
	return ye(e, (e, i) => {
		r.set(t(e, i), n(e, i));
	}), r;
}
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/config/const.js
var I = {
	AREA: "area",
	AREA_LINE_RANGE: "area-line-range",
	AREA_SPLINE: "area-spline",
	AREA_SPLINE_RANGE: "area-spline-range",
	AREA_STEP: "area-step",
	AREA_STEP_RANGE: "area-step-range",
	BAR: "bar",
	BUBBLE: "bubble",
	CANDLESTICK: "candlestick",
	DONUT: "donut",
	FUNNEL: "funnel",
	GAUGE: "gauge",
	LINE: "line",
	PIE: "pie",
	POLAR: "polar",
	RADAR: "radar",
	SCATTER: "scatter",
	SPLINE: "spline",
	STEP: "step",
	TREEMAP: "treemap"
}, He = {
	export: "exportApi",
	flow: "flow",
	xgrids: "grid",
	ygrids: "grid",
	regions: "regions",
	category: "category",
	categories: "category"
}, Ue = {
	x: {
		start: "M0 -8.5 A6 6 0 0 0 -6.5 -3.5 V2.5 A6 6 0 0 0 0 8.5 Z M-2 -3.5 V3.5 M-4 -3.5 V3.5z",
		end: "M0 -8.5 A6 6 0 0 1 6.5 -3.5 V2.5 A6 6 0 0 1 0 8.5 Z M2 -3.5 V3.5 M4 -3.5 V3.5z"
	},
	y: {
		start: "M8.5 0 a6 6 0 0 0 -6 -6.5 H-2.5 a 6 6 0 0 0 -6 6.5 z m-5 -2 H-3.5 m7 -2 H-3.5z",
		end: "M8.5 0 a6 -6 0 0 1 -6 6.5 H-2.5 a 6 -6 0 0 1 -6 -6.5z m-5 2 H-3.5 m7 2 H-3.5z"
	}
}, We = {
	AREA: "initArea",
	AREA_LINE_RANGE: "initArea",
	AREA_SPLINE: "initArea",
	AREA_SPLINE_RANGE: "initArea",
	AREA_STEP: "initArea",
	AREA_STEP_RANGE: "initArea",
	BAR: "initBar",
	BUBBLE: "initCircle",
	CANDLESTICK: "initCandlestick",
	DONUT: "initArc",
	FUNNEL: "initFunnel",
	GAUGE: "initArc",
	LINE: "initLine",
	PIE: "initArc",
	POLAR: "initPolar",
	RADAR: "initCircle",
	SCATTER: "initCircle",
	SPLINE: "initLine",
	STEP: "initLine",
	TREEMAP: "initTreemap"
}, Ge = {
	Area: [
		I.AREA,
		I.AREA_SPLINE,
		I.AREA_SPLINE_RANGE,
		I.AREA_LINE_RANGE,
		I.AREA_STEP,
		I.AREA_STEP_RANGE
	],
	AreaRange: [
		I.AREA_SPLINE_RANGE,
		I.AREA_LINE_RANGE,
		I.AREA_STEP_RANGE
	],
	Arc: [
		I.PIE,
		I.DONUT,
		I.GAUGE,
		I.POLAR,
		I.RADAR
	],
	Line: [
		I.LINE,
		I.SPLINE,
		I.AREA,
		I.AREA_SPLINE,
		I.AREA_SPLINE_RANGE,
		I.AREA_LINE_RANGE,
		I.STEP,
		I.AREA_STEP,
		I.AREA_STEP_RANGE
	],
	Step: [
		I.STEP,
		I.AREA_STEP,
		I.AREA_STEP_RANGE
	],
	Spline: [
		I.SPLINE,
		I.AREA_SPLINE,
		I.AREA_SPLINE_RANGE
	]
}, Ke = "https://github.com/naver/billboard.js/blob/master/MODULE_IMPORTS.md";
function qe(e) {
	let t = e, { config: n } = t, r = "";
	if (E(n.data_type || n.data_types) && !t[We.LINE]) r = "line";
	else for (let e in We) {
		let n = I[e];
		if (t.hasType(n) && !t[We[e]]) {
			r = n;
			break;
		}
	}
	r && Ye(`Please, make sure if %c${we(r)}`, "module has been imported and specified correctly.", Ke);
}
function Je(e) {
	let t = He[e];
	t && Ye(`Please, make sure if %c${t}`, "module has been imported and specified correctly.", Ke);
}
function Ye(e, t, n) {
	let r = "[billboard.js]";
	if (c.console?.error) {
		let i = t ? ["background:red;color:white;display:block;font-size:15px", t] : [];
		console.error(`❌ ${r} ${e}`, "background:red;color:white;display:block;font-size:15px", ...i), n && console.info("%cℹ️", "font-size:15px", n);
	}
	throw Error(`${r} ${e.replace(/\%c([a-z-]+)/i, "'$1' ")} ${t ?? ""}`);
}
var Xe = {
	svg: "http://www.w3.org/2000/svg",
	xhtml: "http://www.w3.org/1999/xhtml",
	xlink: "http://www.w3.org/1999/xlink",
	xml: "http://www.w3.org/XML/1998/namespace",
	xmlns: "http://www.w3.org/2000/xmlns/"
};
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/namespace.js
function Ze(e) {
	var t = e += "", n = t.indexOf(":");
	return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), Xe.hasOwnProperty(t) ? {
		space: Xe[t],
		local: e
	} : e;
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/creator.js
function Qe(e) {
	return function() {
		var t = this.ownerDocument, n = this.namespaceURI;
		return n === "http://www.w3.org/1999/xhtml" && t.documentElement.namespaceURI === "http://www.w3.org/1999/xhtml" ? t.createElement(e) : t.createElementNS(n, e);
	};
}
function $e(e) {
	return function() {
		return this.ownerDocument.createElementNS(e.space, e.local);
	};
}
function et(e) {
	var t = Ze(e);
	return (t.local ? $e : Qe)(t);
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selector.js
function tt() {}
function nt(e) {
	return e == null ? tt : function() {
		return this.querySelector(e);
	};
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/select.js
function rt(e) {
	typeof e != "function" && (e = nt(e));
	for (var t = this._groups, n = t.length, r = Array(n), i = 0; i < n; ++i) for (var a = t[i], o = a.length, s = r[i] = Array(o), c, l, u = 0; u < o; ++u) (c = a[u]) && (l = e.call(c, c.__data__, u, a)) && ("__data__" in c && (l.__data__ = c.__data__), s[u] = l);
	return new Kn(r, this._parents);
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/array.js
function it(e) {
	return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selectorAll.js
function at() {
	return [];
}
function ot(e) {
	return e == null ? at : function() {
		return this.querySelectorAll(e);
	};
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/selectAll.js
function st(e) {
	return function() {
		return it(e.apply(this, arguments));
	};
}
function ct(e) {
	e = typeof e == "function" ? st(e) : ot(e);
	for (var t = this._groups, n = t.length, r = [], i = [], a = 0; a < n; ++a) for (var o = t[a], s = o.length, c, l = 0; l < s; ++l) (c = o[l]) && (r.push(e.call(c, c.__data__, l, o)), i.push(c));
	return new Kn(r, i);
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/matcher.js
function lt(e) {
	return function() {
		return this.matches(e);
	};
}
function ut(e) {
	return function(t) {
		return t.matches(e);
	};
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/selectChild.js
var dt = Array.prototype.find;
function ft(e) {
	return function() {
		return dt.call(this.children, e);
	};
}
function pt() {
	return this.firstElementChild;
}
function mt(e) {
	return this.select(e == null ? pt : ft(typeof e == "function" ? e : ut(e)));
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/selectChildren.js
var ht = Array.prototype.filter;
function gt() {
	return Array.from(this.children);
}
function _t(e) {
	return function() {
		return ht.call(this.children, e);
	};
}
function vt(e) {
	return this.selectAll(e == null ? gt : _t(typeof e == "function" ? e : ut(e)));
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/filter.js
function yt(e) {
	typeof e != "function" && (e = lt(e));
	for (var t = this._groups, n = t.length, r = Array(n), i = 0; i < n; ++i) for (var a = t[i], o = a.length, s = r[i] = [], c, l = 0; l < o; ++l) (c = a[l]) && e.call(c, c.__data__, l, a) && s.push(c);
	return new Kn(r, this._parents);
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/sparse.js
function bt(e) {
	return Array(e.length);
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/enter.js
function xt() {
	return new Kn(this._enter || this._groups.map(bt), this._parents);
}
function St(e, t) {
	this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
St.prototype = {
	constructor: St,
	appendChild: function(e) {
		return this._parent.insertBefore(e, this._next);
	},
	insertBefore: function(e, t) {
		return this._parent.insertBefore(e, t);
	},
	querySelector: function(e) {
		return this._parent.querySelector(e);
	},
	querySelectorAll: function(e) {
		return this._parent.querySelectorAll(e);
	}
};
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/constant.js
function Ct(e) {
	return function() {
		return e;
	};
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/data.js
function wt(e, t, n, r, i, a) {
	for (var o = 0, s, c = t.length, l = a.length; o < l; ++o) (s = t[o]) ? (s.__data__ = a[o], r[o] = s) : n[o] = new St(e, a[o]);
	for (; o < c; ++o) (s = t[o]) && (i[o] = s);
}
function Tt(e, t, n, r, i, a, o) {
	var s, c, l = /* @__PURE__ */ new Map(), u = t.length, d = a.length, f = Array(u), p;
	for (s = 0; s < u; ++s) (c = t[s]) && (f[s] = p = o.call(c, c.__data__, s, t) + "", l.has(p) ? i[s] = c : l.set(p, c));
	for (s = 0; s < d; ++s) p = o.call(e, a[s], s, a) + "", (c = l.get(p)) ? (r[s] = c, c.__data__ = a[s], l.delete(p)) : n[s] = new St(e, a[s]);
	for (s = 0; s < u; ++s) (c = t[s]) && l.get(f[s]) === c && (i[s] = c);
}
function Et(e) {
	return e.__data__;
}
function Dt(e, t) {
	if (!arguments.length) return Array.from(this, Et);
	var n = t ? Tt : wt, r = this._parents, i = this._groups;
	typeof e != "function" && (e = Ct(e));
	for (var a = i.length, o = Array(a), s = Array(a), c = Array(a), l = 0; l < a; ++l) {
		var u = r[l], d = i[l], f = d.length, p = Ot(e.call(u, u && u.__data__, l, r)), m = p.length, h = s[l] = Array(m), g = o[l] = Array(m);
		n(u, d, h, g, c[l] = Array(f), p, t);
		for (var _ = 0, v = 0, y, b; _ < m; ++_) if (y = h[_]) {
			for (_ >= v && (v = _ + 1); !(b = g[v]) && ++v < m;);
			y._next = b || null;
		}
	}
	return o = new Kn(o, r), o._enter = s, o._exit = c, o;
}
function Ot(e) {
	return typeof e == "object" && "length" in e ? e : Array.from(e);
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/exit.js
function kt() {
	return new Kn(this._exit || this._groups.map(bt), this._parents);
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/join.js
function At(e, t, n) {
	var r = this.enter(), i = this, a = this.exit();
	return typeof e == "function" ? (r = e(r), r &&= r.selection()) : r = r.append(e + ""), t != null && (i = t(i), i &&= i.selection()), n == null ? a.remove() : n(a), r && i ? r.merge(i).order() : i;
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/merge.js
function jt(e) {
	for (var t = e.selection ? e.selection() : e, n = this._groups, r = t._groups, i = n.length, a = r.length, o = Math.min(i, a), s = Array(i), c = 0; c < o; ++c) for (var l = n[c], u = r[c], d = l.length, f = s[c] = Array(d), p, m = 0; m < d; ++m) (p = l[m] || u[m]) && (f[m] = p);
	for (; c < i; ++c) s[c] = n[c];
	return new Kn(s, this._parents);
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/order.js
function Mt() {
	for (var e = this._groups, t = -1, n = e.length; ++t < n;) for (var r = e[t], i = r.length - 1, a = r[i], o; --i >= 0;) (o = r[i]) && (a && o.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(o, a), a = o);
	return this;
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/sort.js
function Nt(e) {
	e ||= Pt;
	function t(t, n) {
		return t && n ? e(t.__data__, n.__data__) : !t - !n;
	}
	for (var n = this._groups, r = n.length, i = Array(r), a = 0; a < r; ++a) {
		for (var o = n[a], s = o.length, c = i[a] = Array(s), l, u = 0; u < s; ++u) (l = o[u]) && (c[u] = l);
		c.sort(t);
	}
	return new Kn(i, this._parents).order();
}
function Pt(e, t) {
	return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/call.js
function Ft() {
	var e = arguments[0];
	return arguments[0] = this, e.apply(null, arguments), this;
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/nodes.js
function It() {
	return Array.from(this);
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/node.js
function Lt() {
	for (var e = this._groups, t = 0, n = e.length; t < n; ++t) for (var r = e[t], i = 0, a = r.length; i < a; ++i) {
		var o = r[i];
		if (o) return o;
	}
	return null;
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/size.js
function Rt() {
	let e = 0;
	for (let t of this) ++e;
	return e;
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/empty.js
function zt() {
	return !this.node();
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/each.js
function Bt(e) {
	for (var t = this._groups, n = 0, r = t.length; n < r; ++n) for (var i = t[n], a = 0, o = i.length, s; a < o; ++a) (s = i[a]) && e.call(s, s.__data__, a, i);
	return this;
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/attr.js
function Vt(e) {
	return function() {
		this.removeAttribute(e);
	};
}
function Ht(e) {
	return function() {
		this.removeAttributeNS(e.space, e.local);
	};
}
function Ut(e, t) {
	return function() {
		this.setAttribute(e, t);
	};
}
function Wt(e, t) {
	return function() {
		this.setAttributeNS(e.space, e.local, t);
	};
}
function Gt(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
	};
}
function Kt(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
	};
}
function qt(e, t) {
	var n = Ze(e);
	if (arguments.length < 2) {
		var r = this.node();
		return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
	}
	return this.each((t == null ? n.local ? Ht : Vt : typeof t == "function" ? n.local ? Kt : Gt : n.local ? Wt : Ut)(n, t));
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/window.js
function Jt(e) {
	return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/style.js
function Yt(e) {
	return function() {
		this.style.removeProperty(e);
	};
}
function Xt(e, t, n) {
	return function() {
		this.style.setProperty(e, t, n);
	};
}
function Zt(e, t, n) {
	return function() {
		var r = t.apply(this, arguments);
		r == null ? this.style.removeProperty(e) : this.style.setProperty(e, r, n);
	};
}
function Qt(e, t, n) {
	return arguments.length > 1 ? this.each((t == null ? Yt : typeof t == "function" ? Zt : Xt)(e, t, n ?? "")) : $t(this.node(), e);
}
function $t(e, t) {
	return e.style.getPropertyValue(t) || Jt(e).getComputedStyle(e, null).getPropertyValue(t);
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/property.js
function en(e) {
	return function() {
		delete this[e];
	};
}
function tn(e, t) {
	return function() {
		this[e] = t;
	};
}
function nn(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		n == null ? delete this[e] : this[e] = n;
	};
}
function rn(e, t) {
	return arguments.length > 1 ? this.each((t == null ? en : typeof t == "function" ? nn : tn)(e, t)) : this.node()[e];
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/classed.js
function an(e) {
	return e.trim().split(/^|\s+/);
}
function on(e) {
	return e.classList || new sn(e);
}
function sn(e) {
	this._node = e, this._names = an(e.getAttribute("class") || "");
}
sn.prototype = {
	add: function(e) {
		this._names.indexOf(e) < 0 && (this._names.push(e), this._node.setAttribute("class", this._names.join(" ")));
	},
	remove: function(e) {
		var t = this._names.indexOf(e);
		t >= 0 && (this._names.splice(t, 1), this._node.setAttribute("class", this._names.join(" ")));
	},
	contains: function(e) {
		return this._names.indexOf(e) >= 0;
	}
};
function cn(e, t) {
	for (var n = on(e), r = -1, i = t.length; ++r < i;) n.add(t[r]);
}
function ln(e, t) {
	for (var n = on(e), r = -1, i = t.length; ++r < i;) n.remove(t[r]);
}
function un(e) {
	return function() {
		cn(this, e);
	};
}
function dn(e) {
	return function() {
		ln(this, e);
	};
}
function fn(e, t) {
	return function() {
		(t.apply(this, arguments) ? cn : ln)(this, e);
	};
}
function pn(e, t) {
	var n = an(e + "");
	if (arguments.length < 2) {
		for (var r = on(this.node()), i = -1, a = n.length; ++i < a;) if (!r.contains(n[i])) return !1;
		return !0;
	}
	return this.each((typeof t == "function" ? fn : t ? un : dn)(n, t));
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/text.js
function mn() {
	this.textContent = "";
}
function hn(e) {
	return function() {
		this.textContent = e;
	};
}
function gn(e) {
	return function() {
		var t = e.apply(this, arguments);
		this.textContent = t ?? "";
	};
}
function _n(e) {
	return arguments.length ? this.each(e == null ? mn : (typeof e == "function" ? gn : hn)(e)) : this.node().textContent;
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/html.js
function vn() {
	this.innerHTML = "";
}
function yn(e) {
	return function() {
		this.innerHTML = e;
	};
}
function bn(e) {
	return function() {
		var t = e.apply(this, arguments);
		this.innerHTML = t ?? "";
	};
}
function xn(e) {
	return arguments.length ? this.each(e == null ? vn : (typeof e == "function" ? bn : yn)(e)) : this.node().innerHTML;
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/raise.js
function Sn() {
	this.nextSibling && this.parentNode.appendChild(this);
}
function Cn() {
	return this.each(Sn);
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/lower.js
function wn() {
	this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Tn() {
	return this.each(wn);
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/append.js
function En(e) {
	var t = typeof e == "function" ? e : et(e);
	return this.select(function() {
		return this.appendChild(t.apply(this, arguments));
	});
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/insert.js
function Dn() {
	return null;
}
function On(e, t) {
	var n = typeof e == "function" ? e : et(e), r = t == null ? Dn : typeof t == "function" ? t : nt(t);
	return this.select(function() {
		return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
	});
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/remove.js
function kn() {
	var e = this.parentNode;
	e && e.removeChild(this);
}
function An() {
	return this.each(kn);
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/clone.js
function jn() {
	var e = this.cloneNode(!1), t = this.parentNode;
	return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Mn() {
	var e = this.cloneNode(!0), t = this.parentNode;
	return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Nn(e) {
	return this.select(e ? Mn : jn);
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/datum.js
function Pn(e) {
	return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/on.js
function Fn(e) {
	return function(t) {
		e.call(this, t, this.__data__);
	};
}
function In(e) {
	return e.trim().split(/^|\s+/).map(function(e) {
		var t = "", n = e.indexOf(".");
		return n >= 0 && (t = e.slice(n + 1), e = e.slice(0, n)), {
			type: e,
			name: t
		};
	});
}
function Ln(e) {
	return function() {
		var t = this.__on;
		if (t) {
			for (var n = 0, r = -1, i = t.length, a; n < i; ++n) a = t[n], (!e.type || a.type === e.type) && a.name === e.name ? this.removeEventListener(a.type, a.listener, a.options) : t[++r] = a;
			++r ? t.length = r : delete this.__on;
		}
	};
}
function Rn(e, t, n) {
	return function() {
		var r = this.__on, i, a = Fn(t);
		if (r) {
			for (var o = 0, s = r.length; o < s; ++o) if ((i = r[o]).type === e.type && i.name === e.name) {
				this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = a, i.options = n), i.value = t;
				return;
			}
		}
		this.addEventListener(e.type, a, n), i = {
			type: e.type,
			name: e.name,
			value: t,
			listener: a,
			options: n
		}, r ? r.push(i) : this.__on = [i];
	};
}
function zn(e, t, n) {
	var r = In(e + ""), i, a = r.length, o;
	if (arguments.length < 2) {
		var s = this.node().__on;
		if (s) {
			for (var c = 0, l = s.length, u; c < l; ++c) for (i = 0, u = s[c]; i < a; ++i) if ((o = r[i]).type === u.type && o.name === u.name) return u.value;
		}
	} else {
		for (s = t ? Rn : Ln, i = 0; i < a; ++i) this.each(s(r[i], t, n));
		return this;
	}
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/dispatch.js
function Bn(e, t, n) {
	var r = Jt(e), i = r.CustomEvent;
	typeof i == "function" ? i = new i(t, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(t, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(t, !1, !1)), e.dispatchEvent(i);
}
function Vn(e, t) {
	return function() {
		return Bn(this, e, t);
	};
}
function Hn(e, t) {
	return function() {
		return Bn(this, e, t.apply(this, arguments));
	};
}
function Un(e, t) {
	return this.each((typeof t == "function" ? Hn : Vn)(e, t));
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/iterator.js
function* Wn() {
	for (var e = this._groups, t = 0, n = e.length; t < n; ++t) for (var r = e[t], i = 0, a = r.length, o; i < a; ++i) (o = r[i]) && (yield o);
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selection/index.js
var Gn = [null];
function Kn(e, t) {
	this._groups = e, this._parents = t;
}
function qn() {
	return new Kn([[document.documentElement]], Gn);
}
function Jn() {
	return this;
}
Kn.prototype = qn.prototype = {
	constructor: Kn,
	select: rt,
	selectAll: ct,
	selectChild: mt,
	selectChildren: vt,
	filter: yt,
	data: Dt,
	enter: xt,
	exit: kt,
	join: At,
	merge: jt,
	selection: Jn,
	order: Mt,
	sort: Nt,
	call: Ft,
	nodes: It,
	node: Lt,
	size: Rt,
	empty: zt,
	each: Bt,
	attr: qt,
	style: Qt,
	property: rn,
	classed: pn,
	text: _n,
	html: xn,
	raise: Cn,
	lower: Tn,
	append: En,
	insert: On,
	remove: An,
	clone: Nn,
	datum: Pn,
	on: zn,
	dispatch: Un,
	[Symbol.iterator]: Wn
};
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/select.js
function L(e) {
	return typeof e == "string" ? new Kn([[document.querySelector(e)]], [document.documentElement]) : new Kn([[e]], Gn);
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/sourceEvent.js
function Yn(e) {
	let t;
	for (; t = e.sourceEvent;) e = t;
	return e;
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/pointer.js
function Xn(e, t) {
	if (e = Yn(e), t === void 0 && (t = e.currentTarget), t) {
		var n = t.ownerSVGElement || t;
		if (n.createSVGPoint) {
			var r = n.createSVGPoint();
			return r.x = e.clientX, r.y = e.clientY, r = r.matrixTransform(t.getScreenCTM().inverse()), [r.x, r.y];
		}
		if (t.getBoundingClientRect) {
			var i = t.getBoundingClientRect();
			return [e.clientX - i.left - t.clientLeft, e.clientY - i.top - t.clientTop];
		}
	}
	return [e.pageX, e.pageY];
}
// node_modules/.pnpm/d3-selection@3.0.0/node_modules/d3-selection/src/selectAll.js
function Zn(e) {
	return typeof e == "string" ? new Kn([document.querySelectorAll(e)], [document.documentElement]) : new Kn([it(e)], Gn);
}
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/module/util/dom.js
var Qn = /\s?(bb-)/g, $n = /\.+/g;
function er(e) {
	return e.replace(Qn, ".$1").replace($n, ".");
}
function tr(e, t, n = !1) {
	let r = (t) => t[e ? "getBoundingClientRect" : "getBBox"](), i = e ? "rectClient" : "rectBBox";
	return n ? r(t) : !(i in t) || t.hasAttribute("width") && t[i].width !== +(t.getAttribute("width") || 0) ? t[i] = r(t) : t[i];
}
function nr(e, t, n = [-1, 1], r = !1) {
	if (e && g(t)) {
		if (t.indexOf("\n") === -1) e.text(t);
		else {
			let i = [e.text(), t].map((e) => e.replace(/[\s\n]/g, ""));
			if (i[0] !== i[1]) {
				let i = t.split("\n"), a = r ? i.length - 1 : 1;
				e.html(""), i.forEach((t, r) => {
					e.append("tspan").attr("x", 0).attr("dy", `${r === 0 ? n[0] * a : n[1]}em`).text(t);
				});
			}
		}
	}
}
function rr(e) {
	let { x: t, y: n, width: r, height: i } = or(e, !0);
	return [
		{
			x: t,
			y: n + i
		},
		{
			x: t,
			y: n
		},
		{
			x: t + r,
			y: n
		},
		{
			x: t + r,
			y: n + i
		}
	];
}
function ir(e) {
	let { width: t, height: n } = R(e), r = rr(e);
	return {
		x: r[0].x,
		y: Math.min(r[0].y, r[1].y),
		width: t,
		height: n
	};
}
function ar(e, t) {
	let n = e && (e.touches || e.sourceEvent && e.sourceEvent.touches)?.[0], r = [0, 0];
	try {
		r = Xn(n || e, t);
	} catch {}
	return r.map((e) => isNaN(e) ? 0 : e);
}
function R(e, t = !1) {
	return tr(!0, e, t);
}
function or(e, t = !1) {
	return tr(!1, e, t);
}
function sr(e, t, n) {
	let { rootSelector: r = "", sheet: i } = e, a = `${r} ${er(t)} {${n.join(";")}}`;
	return i[i.insertRule ? "insertRule" : "addRule"](a, i.cssRules.length);
}
function cr(e) {
	let t = [];
	return e.forEach((e) => {
		try {
			e.cssRules && e.cssRules.length && (t = t.concat(Te(e.cssRules)));
		} catch (t) {
			c.console?.warn(`Error while reading rules from ${e.href}: ${String(t)}`);
		}
	}), t;
}
function lr(e) {
	return {
		x: (c.pageXOffset ?? c.scrollX ?? 0) + (e.scrollLeft ?? 0),
		y: (c.pageYOffset ?? c.scrollY ?? 0) + (e.scrollTop ?? 0)
	};
}
function ur(e, t = 0, n = 0, r = !0) {
	let i = new DOMPoint(t, n), a = e.getScreenCTM(), o = i.matrixTransform(r ? a?.inverse() : a);
	if (r === !1) {
		let t = R(e);
		o.x -= t.x, o.y -= t.y;
	}
	return o;
}
function dr(e) {
	let t = e ? e.transform : null, n = t && t.baseVal;
	return n && n.numberOfItems ? n.getItem(0).matrix : {
		a: 0,
		b: 0,
		c: 0,
		d: 0,
		e: 0,
		f: 0
	};
}
function fr(e, t) {
	let n = e?.getAttribute?.(t);
	if (n) return parseFloat(n);
	let r = dr(e);
	return t === "x" ? r.e : r.f;
}
function pr(e) {
	let t = e.attr("viewBox");
	return t ? t.trim().split(/[\s,]+/).length === 4 : !1;
}
function mr(e, t, n = !1) {
	let r = !!e.node, i = !1;
	for (let [a, o] of Object.entries(t)) if (i = r ? e.style(a) === o : e.style[a] === o, n ? !i : i) break;
	return i;
}
function hr() {
	return l?.hidden === !1 || l?.visibilityState === "visible";
}
function gr(e, t) {
	let { DocumentTouch: n, matchMedia: r, navigator: i } = c, a = r?.("(pointer:coarse)").matches, o = !1;
	if (t) {
		if (i && "maxTouchPoints" in i) o = i.maxTouchPoints > 0;
		else if ("ontouchmove" in c || n && l instanceof n) o = !0;
		else if (a) o = !0;
		else {
			let e = i.userAgent;
			o = /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(e) || /\b(Android|Windows Phone|iPad|iPod)\b/i.test(e);
		}
	}
	return e && !a && r?.("(pointer:fine)").matches && "mouse" || o && "touch" || "mouse";
}
function _r(e, t) {
	e.pendingRaf === null ? (e.pendingRaf = c.requestAnimationFrame(() => {
		e.pendingRaf = null;
	}), t()) : (c.cancelAnimationFrame(e.pendingRaf), e.pendingRaf = c.requestAnimationFrame(() => {
		e.pendingRaf = null, t();
	}));
}
var vr = {
	mouse: (() => {
		let e = () => ({
			bubbles: !1,
			cancelable: !1,
			screenX: 0,
			screenY: 0,
			clientX: 0,
			clientY: 0
		});
		try {
			return new MouseEvent("t"), (t, n, r = e()) => {
				t.dispatchEvent(new MouseEvent(n, r));
			};
		} catch {
			return (t, n, r = e()) => {
				let i = l.createEvent("MouseEvent");
				i.initMouseEvent(n, r.bubbles, r.cancelable, c, 0, r.screenX, r.screenY, r.clientX, r.clientY, !1, !1, !1, !1, 0, null), t.dispatchEvent(i);
			};
		}
	})(),
	touch: (e, t, n) => {
		let r = new Touch(ke({
			identifier: Date.now(),
			target: e,
			radiusX: 2.5,
			radiusY: 2.5,
			rotationAngle: 10,
			force: .5
		}, n));
		e.dispatchEvent(new TouchEvent(t, {
			cancelable: !0,
			bubbles: !0,
			shiftKey: !0,
			touches: [r],
			targetTouches: [],
			changedTouches: [r]
		}));
	}
}, z = {
	button: "bb-button",
	chart: "bb-chart",
	empty: "bb-empty",
	main: "bb-main",
	target: "bb-target",
	EXPANDED: "_expanded_",
	dummy: "_dummy_"
}, B = {
	arc: "bb-arc",
	arcLabelLine: "bb-arc-label-line",
	arcLabelLineText: "bb-arc-label-line-text",
	arcRange: "bb-arc-range",
	arcs: "bb-arcs",
	chartArc: "bb-chart-arc",
	chartArcs: "bb-chart-arcs",
	chartArcsBackground: "bb-chart-arcs-background",
	chartArcsTitle: "bb-chart-arcs-title",
	needle: "bb-needle"
}, yr = {
	area: "bb-area",
	areas: "bb-areas"
}, V = {
	axis: "bb-axis",
	axisX: "bb-axis-x",
	axisXLabel: "bb-axis-x-label",
	axisY: "bb-axis-y",
	axisY2: "bb-axis-y2",
	axisY2Label: "bb-axis-y2-label",
	axisYLabel: "bb-axis-y-label",
	axisXTooltip: "bb-axis-x-tooltip",
	axisYTooltip: "bb-axis-y-tooltip",
	axisY2Tooltip: "bb-axis-y2-tooltip",
	axisTooltipX: "bb-axis-tooltip-x",
	axisTooltipY: "bb-axis-tooltip-y"
}, br = {
	bar: "bb-bar",
	bars: "bb-bars",
	chartBar: "bb-chart-bar",
	chartBars: "bb-chart-bars",
	barConnectLine: "bb-bar-connectLine"
}, xr = {
	candlestick: "bb-candlestick",
	candlesticks: "bb-candlesticks",
	chartCandlestick: "bb-chart-candlestick",
	chartCandlesticks: "bb-chart-candlesticks",
	valueDown: "bb-value-down",
	valueUp: "bb-value-up"
}, Sr = {
	chartCircles: "bb-chart-circles",
	circle: "bb-circle",
	circles: "bb-circles"
}, Cr = {
	colorPattern: "bb-color-pattern",
	colorScale: "bb-colorscale"
}, wr = {
	dragarea: "bb-dragarea",
	INCLUDED: "_included_"
}, Tr = {
	funnel: "bb-funnel",
	chartFunnel: "bb-chart-funnel",
	chartFunnels: "bb-chart-funnels",
	funnelBackground: "bb-funnel-background"
}, Er = {
	chartArcsGaugeMax: "bb-chart-arcs-gauge-max",
	chartArcsGaugeMin: "bb-chart-arcs-gauge-min",
	chartArcsGaugeUnit: "bb-chart-arcs-gauge-unit",
	chartArcsGaugeTitle: "bb-chart-arcs-gauge-title",
	gaugeValue: "bb-gauge-value"
}, H = {
	legend: "bb-legend",
	legendBackground: "bb-legend-background",
	legendItem: "bb-legend-item",
	legendItemEvent: "bb-legend-item-event",
	legendItemHidden: "bb-legend-item-hidden",
	legendItemPoint: "bb-legend-item-point",
	legendItemTile: "bb-legend-item-tile"
}, Dr = {
	chartLine: "bb-chart-line",
	chartLines: "bb-chart-lines",
	line: "bb-line",
	lines: "bb-lines"
}, Or = {
	eventRect: "bb-event-rect",
	eventRects: "bb-event-rects",
	eventRectsMultiple: "bb-event-rects-multiple",
	eventRectsSingle: "bb-event-rects-single"
}, U = {
	focused: "bb-focused",
	defocused: "bb-defocused",
	legendItemFocused: "bb-legend-item-focused",
	xgridFocus: "bb-xgrid-focus",
	xgridFocusContinuous: "bb-xgrid-focus-continuous",
	ygridFocus: "bb-ygrid-focus"
}, W = {
	grid: "bb-grid",
	gridLines: "bb-grid-lines",
	xgrid: "bb-xgrid",
	xgridLine: "bb-xgrid-line",
	xgridLines: "bb-xgrid-lines",
	xgrids: "bb-xgrids",
	ygrid: "bb-ygrid",
	ygridLine: "bb-ygrid-line",
	ygridLines: "bb-ygrid-lines",
	ygrids: "bb-ygrids"
}, kr = {
	level: "bb-level",
	levels: "bb-levels"
}, Ar = {
	chartRadar: "bb-chart-radar",
	chartRadars: "bb-chart-radars"
}, jr = {
	region: "bb-region",
	regions: "bb-regions"
}, G = {
	selectedCircle: "bb-selected-circle",
	selectedCircles: "bb-selected-circles",
	SELECTED: "_selected_"
}, K = {
	shape: "bb-shape",
	shapes: "bb-shapes"
}, Mr = {
	brush: "bb-brush",
	subchart: "bb-subchart"
}, q = {
	chartText: "bb-chart-text",
	chartTexts: "bb-chart-texts",
	text: "bb-text",
	texts: "bb-texts",
	title: "bb-title",
	textBorderRect: "bb-text-border",
	textLabelImage: "bb-text-label-image",
	TextOverlapping: "text-overlapping"
}, Nr = {
	tooltip: "bb-tooltip",
	tooltipContainer: "bb-tooltip-container",
	tooltipName: "bb-tooltip-name"
}, Pr = {
	treemap: "bb-treemap",
	chartTreemap: "bb-chart-treemap",
	chartTreemaps: "bb-chart-treemaps"
}, Fr = {
	buttonZoomReset: "bb-zoom-reset",
	zoomBrush: "bb-zoom-brush"
}, J = {
	...z,
	...B,
	...yr,
	...V,
	...br,
	...xr,
	...Sr,
	...Cr,
	...wr,
	...Er,
	...H,
	...Dr,
	...Or,
	...U,
	...Tr,
	...W,
	...kr,
	...Ar,
	...jr,
	...G,
	...K,
	...Mr,
	...q,
	...Nr,
	...Pr,
	...Fr
}, Ir = {
	boost_useCssRule: !1,
	boost_useWorker: !1,
	boost_workerUrl: void 0
}, Lr = {
	color_pattern: [],
	color_tiles: void 0,
	color_threshold: {},
	color_onover: void 0
}, Rr = {
	legend_contents_bindto: void 0,
	legend_contents_template: "<span style='color:#fff;padding:5px;background-color:{=COLOR}'>{=TITLE}</span>",
	legend_equally: !1,
	legend_hide: !1,
	legend_inset_anchor: "top-left",
	legend_inset_x: 10,
	legend_inset_y: 0,
	legend_inset_step: void 0,
	legend_item_interaction: !0,
	legend_item_dblclick: !1,
	legend_item_onclick: void 0,
	legend_item_onover: void 0,
	legend_item_onout: void 0,
	legend_item_tile_width: 10,
	legend_item_tile_height: 10,
	legend_item_tile_r: 5,
	legend_item_tile_type: "rectangle",
	legend_format: void 0,
	legend_padding: 0,
	legend_position: "bottom",
	legend_show: !0,
	legend_tooltip: !1,
	legend_usePoint: !1
}, zr = {
	bindto: "#chart",
	background: {},
	clipPath: !0,
	svg_classname: void 0,
	size_width: void 0,
	size_height: void 0,
	padding: !0,
	padding_mode: void 0,
	padding_left: void 0,
	padding_right: void 0,
	padding_top: void 0,
	padding_bottom: void 0,
	resize_auto: !0,
	resize_timer: !0,
	resize_live: !1,
	onclick: void 0,
	onover: void 0,
	onout: void 0,
	onresize: void 0,
	onresized: void 0,
	onbeforeinit: void 0,
	oninit: void 0,
	onafterinit: void 0,
	onrendered: void 0,
	transition_duration: 250,
	plugins: [],
	render: {},
	render_mode: "svg",
	canvas_theme: {},
	regions: []
}, Br = {
	title_text: void 0,
	title_padding: {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	},
	title_position: "center"
}, Vr = {
	tooltip_show: !0,
	tooltip_doNotHide: !1,
	tooltip_grouped: !0,
	tooltip_format_title: void 0,
	tooltip_format_name: void 0,
	tooltip_format_value: void 0,
	tooltip_position: void 0,
	tooltip_contents: {},
	tooltip_init_show: !1,
	tooltip_init_x: 0,
	tooltip_init_position: void 0,
	tooltip_linked: !1,
	tooltip_linked_name: "",
	tooltip_onshow: () => {},
	tooltip_onhide: () => {},
	tooltip_onshown: () => {},
	tooltip_onhidden: () => {},
	tooltip_order: null
}, Hr = {
	data_x: void 0,
	data_idConverter: (e) => e,
	data_names: {},
	data_classes: {},
	data_type: void 0,
	data_types: {},
	data_order: "desc",
	data_groups: [],
	data_groupsZeroAs: "positive",
	data_color: void 0,
	data_colors: {},
	data_labels: {},
	data_labels_backgroundColors: void 0,
	data_labels_colors: void 0,
	data_labels_position: {},
	data_labels_imgUrl: void 0,
	data_hide: !1,
	data_filter: void 0,
	data_onclick: () => {},
	data_onover: () => {},
	data_onout: () => {},
	data_onshown: void 0,
	data_onhidden: void 0,
	data_onmin: void 0,
	data_onmax: void 0,
	data_url: void 0,
	data_headers: void 0,
	data_json: void 0,
	data_rows: void 0,
	data_columns: void 0,
	data_mimeType: "csv",
	data_keys: void 0,
	data_empty_label_text: ""
}, Ur = {
	interaction_enabled: !0,
	interaction_brighten: !0,
	interaction_inputType_mouse: !0,
	interaction_inputType_touch: {},
	interaction_onout: !0
}, Wr = class e {
	static data = {};
	static setOptions(e) {
		for (let t = 0; t < e.length; t++) Object.assign(this.data, e[t]);
	}
	constructor() {
		return Ee(zr, Ir, Hr, Lr, Ur, Rr, Br, Vr, e.data);
	}
}, Gr = {
	element: class {
		constructor() {
			return {
				chart: null,
				main: null,
				svg: null,
				axis: {
					x: null,
					y: null,
					y2: null,
					subX: null,
					subY: null,
					subY2: null
				},
				axisTooltip: {
					x: null,
					y: null,
					y2: null
				},
				defs: null,
				tooltip: null,
				legend: null,
				title: null,
				subchart: {
					main: null,
					bar: null,
					line: null,
					area: null
				},
				arcs: null,
				bar: null,
				candlestick: null,
				line: null,
				area: null,
				circle: null,
				radar: null,
				text: null,
				grid: {
					main: null,
					x: null,
					y: null
				},
				gridLines: {
					main: null,
					x: null,
					y: null
				},
				region: {
					main: null,
					list: null
				},
				eventRect: null,
				zoomResetBtn: null
			};
		}
	},
	state: class {
		constructor() {
			return {
				width: 0,
				width2: 0,
				height: 0,
				height2: 0,
				margin: {
					top: 0,
					bottom: 0,
					left: 0,
					right: 0
				},
				margin2: {
					top: 0,
					bottom: 0,
					left: 0,
					right: 0
				},
				margin3: {
					top: 0,
					bottom: 0,
					left: 0,
					right: 0
				},
				arcWidth: 0,
				arcHeight: 0,
				xAxisHeight: 0,
				hasAxis: !1,
				hasFunnel: !1,
				hasRadar: !1,
				hasTreemap: !1,
				isCanvasMode: !1,
				canvasShape: null,
				canvasFocusKey: null,
				canvasSubchartBrushDragging: !1,
				canvasSubchartBrushMode: null,
				canvasSubchartBrushStart: null,
				canvasSubchartBrushOrigin: null,
				canvasSubchartBrushMoved: !1,
				canvasFlowFrame: null,
				canvasFlowFinish: null,
				canvasFocusMainRedraw: !1,
				cssRule: {},
				loading: void 0,
				domain: void 0,
				subchartSourceTypes: void 0,
				current: {
					domain: void 0,
					width: 0,
					height: 0,
					dataMax: 0,
					maxTickSize: {
						x: {
							width: 0,
							height: 0,
							ticks: [],
							clipPath: 0,
							domain: ""
						},
						y: {
							width: 0,
							height: 0,
							domain: ""
						},
						y2: {
							width: 0,
							height: 0,
							domain: ""
						}
					},
					types: [],
					needle: void 0,
					zoomDomain: null
				},
				isLegendRight: !1,
				isLegendInset: !1,
				isLegendTop: !1,
				isLegendLeft: !1,
				legendStep: 0,
				legendItemWidth: 0,
				legendItemHeight: 0,
				legendHasRendered: !1,
				canvasInlineStyle: { minHeight: "" },
				canvasSelection: /* @__PURE__ */ new Set(),
				canvasSelectionDragStart: null,
				canvasSelectionDragIncluded: /* @__PURE__ */ new Set(),
				canvasSelectionDragging: !1,
				canvasSelectionDragMoved: !1,
				canvasSelectionDragMoveHandler: null,
				canvasSelectionDragEndHandler: null,
				eventReceiver: {
					currentIdx: -1,
					rect: {},
					data: [],
					coords: []
				},
				axis: { x: {
					padding: {
						left: 0,
						right: 0
					},
					tickCount: 0
				} },
				rotatedPadding: {
					left: 30,
					right: 0,
					top: 5
				},
				withoutFadeIn: {},
				inputType: "",
				datetimeId: "",
				clip: {
					id: "",
					idXAxis: "",
					idYAxis: "",
					idXAxisTickTexts: "",
					idGrid: "",
					idSubchart: "",
					path: "",
					pathXAxis: "",
					pathYAxis: "",
					pathXAxisTickTexts: "",
					pathGrid: ""
				},
				event: null,
				dragStart: null,
				dragging: !1,
				flowing: !1,
				cancelClick: !1,
				mouseover: !1,
				rendered: !1,
				transiting: !1,
				redrawing: !1,
				resizing: !1,
				resizePreview: !1,
				resizeRedrawTime: 0,
				resizeLiveScale: null,
				toggling: !1,
				zooming: !1,
				hasNegativeValue: !1,
				hasPositiveValue: !0,
				orgAreaOpacity: "0.2",
				orgConfig: {},
				hiddenTargetIds: /* @__PURE__ */ new Set(),
				hiddenLegendIds: /* @__PURE__ */ new Set(),
				focusedTargetIds: /* @__PURE__ */ new Set(),
				defocusedTargetIds: /* @__PURE__ */ new Set(),
				radius: 0,
				innerRadius: 0,
				outerRadius: void 0,
				innerRadiusRatio: 0,
				gaugeArcWidth: 0,
				radiusExpanded: 0,
				xgridAttr: {
					x1: null,
					x2: null,
					y1: null,
					y2: null
				},
				pendingRaf: null,
				rafBatchQueue: [],
				dirty: {
					data: !1,
					visibility: !1,
					size: !1
				},
				redrawGeneration: 0,
				dataGeneration: 0,
				_targetsToShow: null,
				_cachedDrawShape: null,
				_canvasVisibleRangeCache: null,
				_canvasXDataTickCache: null,
				_canvasXTickValuesCache: null,
				_eventRectFingerprint: null,
				_lastTooltipMouse: null,
				_gridFocusEl: null,
				generateClassCache: /* @__PURE__ */ new Map()
			};
		}
	}
}, Kr = class {
	constructor() {
		Object.keys(Gr).forEach((e) => {
			this[e] = new Gr[e]();
		});
	}
	getStore(e) {
		return this[e];
	}
}, Y = {
	bubbleBaseLength: "$baseLength",
	bubbleMaxValue: "$bubbleMaxValue",
	colorPattern: "__colorPattern__",
	dataMinMax: "$dataMinMax",
	dataTotalSum: "$dataTotalSum",
	dataTotalPerIndex: "$totalPerIndex",
	visibleTotalPerIndex: "$visibleTotalPerIndex",
	domainMinMax: "$domainMinMax",
	filteredTargets: "$filteredTargets",
	svgLeft: "$svgLeft",
	valuesByX: "$valuesByX",
	legendItemTextBox: "legendItemTextBox",
	legendItemMap: "$legendItemMap",
	radarPoints: "$radarPoints",
	radarTextWidth: "$radarTextWidth",
	setOverOut: "setOverOut",
	callOverOutForTouch: "callOverOutForTouch",
	textRect: "textRect",
	shapeOffset: "$shapeOffset",
	maxTickSize: "$maxTickSize",
	maxDataCountTarget: "$maxDataCountTarget",
	valuesXIndexMap: "$valuesXIndexMap"
}, qr = class {
	cache = /* @__PURE__ */ new Map();
	add(e, t, n = !1) {
		let r = n ? this.cloneTarget(t) : t;
		return this.cache.set(e, r), r;
	}
	remove(e) {
		let t = g(e) ? [e] : e;
		for (let e = 0; e < t.length; e++) this.cache.delete(t[e]);
	}
	get(e, t = !1) {
		if (t && Array.isArray(e)) {
			let t = [];
			for (let n = 0, r; r = e[n]; n++) this.cache.has(r) && t.push(this.cache.get(r));
			return t;
		}
		return this.cache.has(e) ? this.cache.get(e) : null;
	}
	has(e) {
		return this.cache.has(e);
	}
	getKeys() {
		return Array.from(this.cache.keys());
	}
	reset(e, t) {
		e ? this.cache.clear() : this.cache.forEach((e, n) => {
			/^\$/.test(n) && (t?.some((e) => n.startsWith(e)) || this.cache.delete(n));
		});
	}
	cloneTarget(e) {
		return {
			id: e.id,
			id_org: e.id_org,
			values: e.values.map((e) => ({
				x: e.x,
				value: e.value,
				id: e.id
			}))
		};
	}
}, { setTimeout: Jr, clearTimeout: Yr } = c;
function Xr(e, t) {
	let n = [], r, i = null, a = function() {
		a.clear(), t && i === null && (i = u(() => {
			i = null, t();
		})), r = e === !1 ? f(() => {
			r = null, n.forEach((e) => e());
		}, { timeout: 200 }) : Jr(() => {
			r = null, n.forEach((e) => e());
		}, _(e) ? e : 200);
	};
	return a.clear = () => {
		r &&= ((e === !1 ? p : Yr)(r), null);
	}, a.clearLive = () => {
		i !== null && (d(i), i = null);
	}, a.add = (e) => n.push(e), a.remove = (e) => {
		let t = n.indexOf(e);
		t !== -1 && n.splice(t, 1);
	}, a;
}
function Zr() {
	let e = [], t = function(t, n) {
		function r() {
			let t = 0;
			for (let n = 0, r; r = e[n]; n++) if (r === !0 || r.empty?.()) t++;
			else {
				if (hr() === !1) {
					t = e.length;
					break;
				}
				try {
					r.transition();
				} catch {
					t++;
				}
			}
			return t === e.length;
		}
		ze(() => {
			n?.();
		}, r);
	};
	return t.add = function(t) {
		O(t) ? e = e.concat(t) : e.push(t);
	}, t;
}
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/module/worker.js
var Qr = {}, $r = /* @__PURE__ */ new Set(), ei = /* @__PURE__ */ new Map(), ti = 5e3, ni = 3, ri = 0;
function ii() {
	try {
		return "var bbWorker=(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:`Module`});function t(e){let t=[];return e.forEach(function(e,n){let r=e[0];e.forEach(function(e,i){if(i>0){if(t[i-1]===void 0&&(t[i-1]={}),e===void 0)throw Error(`Source data is missing a component at (${n}, ${i})!`);t[i-1][r]=e}})}),t}function n(e){let t=e[0],n=[];return e.forEach(function(e,r){if(r>0){let i={};e.forEach(function(e,n){if(e===void 0)throw Error(`Source data is missing a component at (${r}, ${n})!`);i[t[n]]=e}),n.push(i)}}),n}function r(e,r){let i=[],a,o;if(Array.isArray(e)){let t=function(e,t){if(e[t]!==void 0)return e[t];let n=t.replace(/\\[(\\w+)\\]/g,`.$1`).replace(/^\\./,``).split(`.`),r=e;return n.some(function(e){return!(r=r&&typeof r==`object`&&e in r?r[e]:void 0)}),r};a=r.x?r.value.concat(r.x):r.value,i.push(a),e.forEach(function(e){let n=a.map(function(n){let r=t(e,n);return r===void 0&&(r=null),r});i.push(n)}),o=n(i)}else Object.keys(e).forEach(function(t){let n=[].concat(e[t]);n.unshift?.(t),i.push(n)}),o=t(i);return o}let i={columns:t,json:r,rows:n},a=self;function o({data:e}){let{args:t,id:n,op:r}=e;try{let e=i[r];if(!e)throw Error(`Unknown worker op: ${r}`);a.postMessage({id:n,result:e(...t)})}catch(e){a.postMessage({id:n,error:e&&(e.message||e.name)||String(e)})}}return typeof window>`u`&&(a.onmessage=o),e.handleMessage=o,e.ops=i,e})({});";
	} catch {
		return "";
	}
}
function ai() {
	let { Blob: e, Worker: t, URL: n } = c;
	return t && e && n?.createObjectURL && n?.revokeObjectURL ? {
		Blob: e,
		Worker: t,
		URL: n
	} : null;
}
function oi() {
	return c.Worker || null;
}
function si(e) {
	return typeof e == "number" ? {
		timeout: e,
		workerUrl: ""
	} : {
		timeout: e?.timeout ?? ti,
		workerUrl: e?.workerUrl ?? ""
	};
}
function ci(e, t = !1) {
	let n = Qr[e];
	t && $r.add(e), n && (n.worker?.terminate(), n.revoke && ai()?.URL.revokeObjectURL(n.src), delete Qr[e]);
	for (let t of ei.keys()) t.startsWith(`${e}:`) && ei.delete(t);
}
function li(e, t) {
	if (e === t) return !0;
	try {
		return JSON.stringify(e) === JSON.stringify(t);
	} catch {
		return !0;
	}
}
function ui(e) {
	let [t, ...n] = e;
	return Array.isArray(t) ? [t.slice(0, ni).map((e) => Array.isArray(e) ? e.slice(0, 4) : e), ...n] : e;
}
function di(e, t, n, r) {
	let i = ++ri, a = !1, o, s = new Promise((t, n) => {
		let s = (e, t) => {
			a || (a = !0, o(), e(t));
		}, c = function(e) {
			e.data?.id === i && (e.data.error ? s(n, Error(e.data.error)) : s(t, e.data.result));
		}, l = function() {
			s(n, /* @__PURE__ */ Error("worker error"));
		}, u = setTimeout(() => s(n, /* @__PURE__ */ Error("worker timeout")), r);
		o = () => {
			clearTimeout(u), e.removeEventListener("message", c), e.removeEventListener("error", l);
		}, e.addEventListener("message", c), e.addEventListener("error", l);
	});
	try {
		e.postMessage({
			args: n,
			id: i,
			op: t
		});
	} catch (e) {
		throw a = !0, o(), e;
	}
	return s;
}
function fi(e, t, n, r, i, a) {
	let o = ui(i), s = di(e, n, o, a).then((e) => li(e, r(...o)), () => !1).then((e) => (e ? ei.set(t, !0) : ei.delete(t), e));
	return ei.set(t, s), s;
}
function pi(e, t = "") {
	let n = !!oi(), r = t ? null : ai(), i = t ? "" : ii(), a = t || "blob";
	if (!n || !t && (!r || !i) || $r.has(a)) return null;
	if (!(a in Qr)) try {
		if (t) Qr[a] = {
			revoke: !1,
			src: t,
			worker: null
		};
		else if (r) {
			let e = new r.Blob([i], { type: "text/javascript" });
			Qr[a] = {
				revoke: !0,
				src: r.URL.createObjectURL(e),
				worker: null
			};
		}
	} catch {
		return null;
	}
	return {
		key: a,
		src: Qr[a].src
	};
}
function mi(e, t) {
	let n = Qr[e], r = oi();
	if (!n || !r || $r.has(e)) return null;
	if (!n.worker) try {
		n.worker = new r(t);
	} catch {
		return ci(e, !0), null;
	}
	return n.worker;
}
function hi(e = !0, t, n, r, i) {
	let { timeout: a, workerUrl: o } = si(i), s = function(...e) {
		r(n(...e));
	}, c = s;
	if (e) {
		let e = pi(t, o), i = e ? mi(e.key, e.src) : null;
		if (i && e) {
			let { key: o } = e;
			c = function(...e) {
				let l = () => {
					ci(o, !0), c = s, s(...e);
				};
				try {
					let s = `${o}:${t}`, c = ei.get(s) ?? fi(i, s, t, n, e, a);
					di(i, t, e, a).then((e) => {
						c === !0 ? r(e) : c.then((t) => t ? r(e) : l());
					}, l);
				} catch {
					l();
				}
			};
		}
	}
	return c;
}
function gi() {
	let e = ai();
	for (let t in Qr) {
		let n = Qr[t];
		n.worker && n.worker.terminate(), n.src && n.revoke && e?.URL.revokeObjectURL(n.src), delete Qr[t];
	}
	$r.clear(), ei.clear();
}
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/module/dsv.js
var _i = 34, vi = 10, yi = 13;
function bi(e) {
	let t = e.charCodeAt(0);
	function n(e, n) {
		let r = [], i = e.length, a = 0, o = 0, s = i <= 0, c = !1;
		e.charCodeAt(0) === 65279 && a++, e.charCodeAt(i - 1) === vi && --i, e.charCodeAt(i - 1) === yi && --i;
		function l() {
			if (s) return null;
			if (c) return c = !1, null;
			let n = a, r, o;
			if (e.charCodeAt(n) === _i) {
				for (; ++a < i;) if (e.charCodeAt(a) === _i) {
					if (e.charCodeAt(a + 1) !== _i) break;
					a++;
				}
				return (o = a++) >= i ? s = !0 : (r = e.charCodeAt(a++)) === vi ? c = !0 : r === yi && (c = !0, e.charCodeAt(a) === vi && ++a), e.slice(n + 1, o).replace(/""/g, "\"");
			}
			for (; a < i;) {
				if ((r = e.charCodeAt(o = a++)) === vi) c = !0;
				else if (r === yi) c = !0, e.charCodeAt(a) === vi && ++a;
				else if (r !== t) continue;
				return e.slice(n, o);
			}
			return s = !0, e.slice(n, i);
		}
		let u;
		for (; (u = l()) !== null;) {
			let e = [];
			for (; u !== null;) e.push(u), u = l();
			if (n) {
				let t = n(e, o++);
				t != null && r.push(t);
			} else r.push(e);
		}
		return r;
	}
	function r(e, t) {
		let r = [];
		return n(e, (e, n) => {
			if (n === 0) return r = e, null;
			let i = {};
			for (let t = 0; t < r.length; t++) i[r[t]] = e[t] ?? "";
			return t ? t(i, n - 1, r) : i;
		});
	}
	return {
		parse: r,
		parseRows: n
	};
}
var xi = bi(","), Si = bi("	"), Ci = xi.parse, wi = xi.parseRows, Ti = Si.parse, Ei = Si.parseRows;
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/ChartInternal/data/convert.helper.js
function Di(e) {
	let t = [];
	return e.forEach(function(e, n) {
		let r = e[0];
		e.forEach(function(e, i) {
			if (i > 0) {
				if (t[i - 1] === void 0 && (t[i - 1] = {}), e === void 0) throw Error(`Source data is missing a component at (${n}, ${i})!`);
				t[i - 1][r] = e;
			}
		});
	}), t;
}
function Oi(e) {
	let t = e[0], n = [];
	return e.forEach(function(e, r) {
		if (r > 0) {
			let i = {};
			e.forEach(function(e, n) {
				if (e === void 0) throw Error(`Source data is missing a component at (${r}, ${n})!`);
				i[t[n]] = e;
			}), n.push(i);
		}
	}), n;
}
function ki(e, t) {
	let n = [], r, i;
	if (Array.isArray(e)) {
		let a = function(e, t) {
			if (e[t] !== void 0) return e[t];
			let n = t.replace(/\[(\w+)\]/g, ".$1").replace(/^\./, "").split("."), r = e;
			return n.some(function(e) {
				return !(r = r && typeof r == "object" && e in r ? r[e] : void 0);
			}), r;
		};
		r = t.x ? t.value.concat(t.x) : t.value, n.push(r), e.forEach(function(e) {
			let t = r.map(function(t) {
				let n = a(e, t);
				return n === void 0 && (n = null), n;
			});
			n.push(t);
		}), i = Oi(n);
	} else Object.keys(e).forEach(function(t) {
		let r = [].concat(e[t]);
		r.unshift?.(t), n.push(r);
	}), i = Di(n);
	return i;
}
function Ai(e, t = "csv", n, r, i) {
	let a = new XMLHttpRequest(), o = {
		csv: Mi,
		tsv: Ni,
		json: ki
	};
	a.open("GET", e), n && Object.keys(n).forEach(function(e) {
		a.setRequestHeader(e, n[e]);
	}), a.onreadystatechange = function() {
		if (a.readyState === 4) {
			if (a.status === 200) {
				let e = a.responseText;
				e && i.call(this, o[t](t === "json" ? JSON.parse(e) : e, r));
			} else throw Error(`${e}: Something went wrong loading!`);
		}
	}, a.send();
}
function ji(e, t) {
	let n = e.rows(t), r;
	return n.length === 1 ? (r = [{}], n[0].forEach((e) => {
		r[0][e] = null;
	})) : r = e.parse(t), r;
}
function Mi(e) {
	return ji({
		rows: wi,
		parse: Ci
	}, e);
}
function Ni(e) {
	return ji({
		rows: Ei,
		parse: Ti
	}, e);
}
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/ChartInternal/data/convert.js
var Pi = 5e3;
function Fi(e) {
	let t = e[0];
	if (O(t)) {
		let t = 0;
		for (let n = 0, r = e.length; n < r; n++) t += e[n]?.length ?? 0;
		return t;
	}
	return e.length * Object.keys(t ?? {}).length;
}
function Ii(e, t) {
	let n = e || t?.data_keys;
	return n?.x && (t.data_x = n.x), n;
}
function Li(e, t, n) {
	let r = this, { config: i } = r, a;
	e.forEach((e) => {
		let o = r.getXKey(e);
		if (n.customX || n.timeSeries ? n.xs.indexOf(o) >= 0 ? a = (n.appendXs && r.data.xs[e] || []).concat(t.map((t, n) => {
			let i = t[o];
			return m(i) ? r.generateTargetX(i, e, n) : !1;
		}).filter((e) => e !== !1)) : i.data_x ? a = this.getOtherTargetXs() : D(i.data_xs) && (a = r.getXValuesOfXKey(o, r.data.targets)) : a = t.map((e, t) => t), a) r.data.xs[e] = a;
		else throw Error(`x is not defined for id = "${e}".`);
	});
}
var Ri = {
	convertData(e, t) {
		let { config: n } = this, r = (e) => !e?.length || E(e[0]) ? !1 : n.boost_useWorker === "auto" ? Fi(e) >= Pi : !!n.boost_useWorker, i = n.boost_workerUrl ? { workerUrl: n.boost_workerUrl } : void 0, a = e;
		if (e.bindto && (a = {}, [
			"url",
			"mimeType",
			"headers",
			"keys",
			"json",
			"rows",
			"columns"
		].forEach((t) => {
			let n = `data_${t}`;
			n in e && (a[t] = e[n]);
		})), a.url && t) Ai(a.url, a.mimeType, a.headers, Ii(a.keys, n), t);
		else if (a.json) hi(r(a.json), "json", ki, t, i)(a.json, Ii(a.keys, n));
		else if (a.rows) hi(r(a.rows), "rows", Oi, t, i)(a.rows);
		else if (a.columns) hi(r(a.columns), "columns", Di, t, i)(a.columns);
		else if (e.bindto) throw Error("url or json or rows or columns is required.");
	},
	convertDataToTargets(e, t) {
		let n = this, { axis: r, config: i, state: a } = n, o = i.data_type, s = Object.keys(e[0] || {}), { ids: c, xs: l } = s.length ? s.reduce((e, t) => (n.isX.call(n, t) ? e.xs.push(t) : e.ids.push(t), e), {
			ids: [],
			xs: []
		}) : {
			ids: [],
			xs: []
		}, u = {
			appendXs: t,
			xs: l,
			categorized: r?.isCategorized(),
			timeSeries: r?.isTimeSeries(),
			customX: r?.isCustomX()
		};
		Li.bind(n)(c, e, u);
		let d = u.customX && u.categorized && i.axis_x_categories.length ? new Map(i.axis_x_categories.map((e, t) => [e, t])) : null, f = i.data_idConverter.bind(n.api), p = c.map((t, r) => {
			let o = f(t), s = n.getXKey(t), c = u.customX && u.categorized, l = c && r === 0 && (() => {
				let t = Be(i.axis_x_categories);
				return e.every((e) => t.has(e[s]));
			})(), p = e.__append__, m = s === null && p ? n.api.data.values(t).length : 0;
			return {
				id: o,
				id_org: t,
				values: e.map((e, u) => {
					let f = e[s], h = e[t], g;
					if (h = h !== null && !isNaN(h) && !k(h) ? +h : O(h) || k(h) ? h : null, (c || a.hasRadar) && r === 0 && !v(f)) {
						!l && u === 0 && !p && (i.axis_x_categories = [], d && d.clear());
						let e = String(f);
						g = d?.get(e) ?? -1, g === -1 && (g = i.axis_x_categories.length, i.axis_x_categories.push(f), d?.set(e, g));
					} else g = n.generateTargetX(f, t, m + u);
					return (v(h) || n.data.xs[t].length <= u) && (g = void 0), {
						x: g,
						value: h,
						id: o,
						index: -1
					};
				}).filter((e) => y(e.x))
			};
		});
		if (p.forEach((e) => {
			i.data_xSort && (e.values = e.values.sort((e, t) => (e.x || e.x === 0 ? e.x : Infinity) - (t.x || t.x === 0 ? t.x : Infinity))), e.values.forEach((e, t) => e.index = t), n.data.xs[e.id]?.sort((e, t) => e - t);
		}), a.hasNegativeValue = p.some((e) => e.values.some((e) => e.value !== null && e.value < 0)), a.hasPositiveValue = p.some((e) => e.values.some((e) => e.value !== null && e.value > 0)), o && n.isValidChartType(o)) {
			let e = n.mapToIds(p).filter((e) => !(e in i.data_types) || !n.isValidChartType(i.data_types[e]));
			n.setTargetType(e, o);
		}
		return p.forEach((e) => n.cache.add(e.id_org, e, !0)), p;
	}
}, zi = {
	areaRange: {
		high: 0,
		mid: 1,
		low: 2
	},
	candlestick: {
		open: 0,
		high: 1,
		low: 2,
		close: 3,
		volume: 4
	}
};
function Bi(e) {
	return O(e) ? e : [e];
}
var Vi = {
	isX(e) {
		let { config: t } = this, n = t.data_x && e === t.data_x, r = D(t.data_xs) && xe(t.data_xs, e);
		return n || r;
	},
	isStackNormalized() {
		let { config: e } = this;
		return !(e.data_stack_normalize !== !0 && !w(e.data_stack_normalize) || !e.data_groups.length);
	},
	isStackNormalizedPerGroup() {
		let { config: e } = this;
		return !!(w(e.data_stack_normalize) && e.data_stack_normalize?.perGroup && e.data_groups.length);
	},
	isGrouped(e) {
		let t = this.config.data_groups;
		return e ? t.some((t) => t.indexOf(e) >= 0 && t.length > 1) : t.length > 0;
	},
	hasAxisGroupedData(e) {
		let t = this, { axis: n } = t;
		return t.data.targets.filter((t) => n.getId(t.id) === e).map((e) => e.id).some((e) => t.isGrouped(e));
	},
	getXKey(e) {
		let { config: t } = this;
		return t.data_x ? t.data_x : D(t.data_xs) ? t.data_xs[e] : null;
	},
	getXValuesOfXKey(e, t) {
		let n = this, r = t && D(t) ? n.mapToIds(t) : [], i;
		return r.forEach((t) => {
			n.getXKey(t) === e && (i = n.data.xs[t]);
		}), i;
	},
	getIndexByX(e, t) {
		let n = this;
		return t ? t.indexOf(g(e) ? e : +e) : (n.filterByX(n.data.targets, e)[0] || { index: null }).index;
	},
	getXValue(e, t) {
		let n = this;
		return e in n.data.xs && n.data.xs[e] && m(n.data.xs[e][t]) ? n.data.xs[e][t] : t;
	},
	getOtherTargetXs() {
		let e = this, t = Object.keys(e.data.xs);
		return t.length ? e.data.xs[t[0]] : null;
	},
	getOtherTargetX(e) {
		let t = this.getOtherTargetXs();
		return t && e < t.length ? t[e] : null;
	},
	addXs(e) {
		let { config: t } = this;
		Object.keys(e).forEach((n) => {
			t.data_xs[n] = e[n];
		});
	},
	isMultipleX() {
		return !this.config.axis_x_forceAsSingle && (D(this.config.data_xs) || this.hasType("bubble") || this.hasType("scatter"));
	},
	addName(e) {
		let { config: t } = this, n;
		return e && (n = t.data_names[e.id], e.name = n === void 0 ? e.id : n), e;
	},
	getAllValuesOnIndex(e, t = !1) {
		let n = this, r = n.filterTargetsToShow(n.data.targets).map((t) => n.addName(n.getValueOnIndex(t.values, e)));
		return t && (r = r.filter((e) => e && "value" in e && m(e.value))), r;
	},
	getValueOnIndex(e, t) {
		if (e[t]?.index === t) return e[t];
		let n = e.filter((e) => e.index === t);
		return n.length ? n[0] : null;
	},
	updateTargetX(e, t) {
		let n = this;
		e.forEach((e) => {
			e.values.forEach((r, i) => {
				r.x = n.generateTargetX(t[i], e.id, i);
			}), n.data.xs[e.id] = t;
		});
	},
	updateTargetXs(e, t) {
		let n = this;
		e.forEach((e) => {
			t[e.id] && n.updateTargetX([e], t[e.id]);
		});
	},
	generateTargetX(e, t, n) {
		let r = this, { axis: i } = r, a = i?.isCategorized() ? n : e || n;
		return i?.isTimeSeries() ? a = Le.bind(r)(e || r.getXValue(t, n)) : i?.isCustomX() && !i?.isCategorized() && (a = m(e) ? +e : r.getXValue(t, n)), a;
	},
	updateXs(e) {
		e.length && (this.axis.xs = e.map((e) => e.x));
	},
	getPrevX(e) {
		let t = this.axis.xs[e - 1];
		return y(t) ? t : null;
	},
	getNextX(e) {
		let t = this.axis.xs[e + 1];
		return y(t) ? t : null;
	},
	getBaseValue(e) {
		let t = this, { hasAxis: n } = t.state, { value: r } = e;
		return r && n && (t.isAreaRangeType(e) ? r = t.getRangedData(e, "mid") : t.isBubbleZType(e) && (r = t.getBubbleZData(r, "y"))), r;
	},
	getMinMaxValue(e) {
		let t = this.getBaseValue.bind(this), n = Infinity, r = -Infinity, i = e || this.data.targets.map((e) => e.values);
		for (let e = 0; e < i.length; e++) {
			let a = i[e];
			for (let e = 0; e < a.length; e++) {
				let i = t(a[e]);
				_(i) && (i < n && (n = i), i > r && (r = i));
			}
		}
		return {
			min: n,
			max: r
		};
	},
	getMinMaxData() {
		let e = this, t = Y.dataMinMax, n = e.cache.get(t);
		if (!n) {
			let r = e.data.targets.map((e) => e.values), i = e.getMinMaxValue(r), a = [], o = [], { min: s, max: c } = i;
			r.forEach((t) => {
				let n = e.getFilteredDataByValue(t, s), r = e.getFilteredDataByValue(t, c);
				if (n.length) for (let e = 0; e < n.length; e++) a.push(n[e]);
				if (r.length) for (let e = 0; e < r.length; e++) o.push(r[e]);
			}), e.cache.add(t, n = {
				min: a,
				max: o
			});
		}
		return n;
	},
	getTotalPerIndex(e) {
		let t = this, { config: n } = t, r = e ? `${Y.dataTotalPerIndex}-${e}` : Y.dataTotalPerIndex, i = t.cache.get(r), a = i?.generation === t.state.dataGeneration ? i.value : null;
		if ((t.config.data_groups.length || t.isStackNormalized()) && !a) {
			a = [];
			let { targets: i } = t.data;
			if (t.isStackNormalizedPerGroup() && e) {
				let t = n.data_groups.find((t) => t.indexOf(e) >= 0);
				if (t) i = i.filter((e) => t.indexOf(e.id) >= 0);
				else return null;
			}
			i.forEach((e) => {
				e.values.forEach((e, t) => {
					a[t] || (a[t] = 0), a[t] += _(e.value) ? e.value : 0;
				});
			}), t.cache.add(r, {
				generation: t.state.dataGeneration,
				value: a
			});
		}
		return a;
	},
	getVisibleTotalPerIndex(e) {
		let t = this, { api: n, config: r, state: i, cache: a } = t, o = a.get(Y.visibleTotalPerIndex);
		if (o && o.generation === i.dataGeneration || (o = a.add(Y.visibleTotalPerIndex, {
			generation: i.dataGeneration,
			values: /* @__PURE__ */ new Map()
		})), o.values.has(e)) return o.values.get(e);
		let s = n.data.values.bind(n), { hiddenTargetIds: c } = i, l = t.getTotalPerIndex(e);
		if (l === null) return o.values.set(e, l), l;
		if (c.size) {
			let t = [...c];
			if (e) {
				let n = r.data_groups.find((t) => t.indexOf(e) >= 0);
				n && (t = t.filter((e) => n.indexOf(e) >= 0));
			}
			if (t.length) {
				let e = s(t, !1);
				e.length && (e = e.reduce((e, t) => e.map((e, n) => (_(e) ? e : 0) + t[n])), l = l.map((t, n) => t - e[n]));
			}
		}
		return o.values.set(e, l), l;
	},
	getTotalDataSum(e) {
		let t = this, n = Y.dataTotalSum, r = t.cache.get(n);
		return _(r) || (r = t.data.targets.reduce((e, t) => e + t.values.reduce((e, t) => e + (t.value ?? 0), 0), 0), t.cache.add(n, r)), e && (r -= t.getHiddenTotalDataSum()), r;
	},
	getHiddenTotalDataSum() {
		let { api: e, state: { hiddenTargetIds: t } } = this, n = 0;
		return t.size && (n = e.data.values.bind(e)([...t]).reduce((e, t) => e + t, 0)), n;
	},
	getFilteredDataByValue(e, t) {
		return e.filter((e) => this.getBaseValue(e) === t);
	},
	getMaxDataCount() {
		let { targets: e } = this.data, t = 0;
		for (let n = 0; n < e.length; n++) e[n].values.length > t && (t = e[n].values.length);
		return t;
	},
	getMaxDataCountTarget() {
		let e = this, { cache: t, state: n } = e, r = t.get(Y.maxDataCountTarget);
		if (r && r.generation === n.dataGeneration) return r.value;
		let i = e.filterTargetsToShow() || [], a = i.length, o = e.config.axis_x_inverted;
		if (a > 1) {
			let e = [];
			for (let t = 0; t < i.length; t++) {
				let n = i[t].values;
				for (let t = 0; t < n.length; t++) e.push(n[t].x);
			}
			i = e, i = Ae(De(i)).map((e, t, n) => ({
				x: e,
				index: o ? n.length - t - 1 : t
			}));
		} else a && (i = i[0].values.concat());
		return t.add(Y.maxDataCountTarget, {
			value: i,
			generation: n.dataGeneration
		}), i;
	},
	mapToIds(e) {
		return e.map((e) => e.id);
	},
	mapToTargetIds(e) {
		let t = this;
		return e ? O(e) ? e.concat() : [e] : t.mapToIds(t.data.targets);
	},
	hasTarget(e, t) {
		let n = this.mapToIds(e);
		for (let e = 0, r; r = n[e]; e++) if (r === t) return !0;
		return !1;
	},
	isTargetToShow(e) {
		return !this.state.hiddenTargetIds.has(e);
	},
	isLegendToShow(e) {
		return !this.state.hiddenLegendIds.has(e);
	},
	getTargetsToShow() {
		let { state: e } = this;
		return e._targetsToShow ?? this.filterTargetsToShow();
	},
	filterTargetsToShow(e) {
		let t = this;
		if (!e) {
			let { cache: e, data: n, state: r } = t, i = Y.filteredTargets, a = e.get(i);
			if (a && a.generation === r.dataGeneration) return a.value;
			let o = n.targets.filter((e) => t.isTargetToShow(e.id));
			return e.add(i, {
				value: o,
				generation: r.dataGeneration
			}), o;
		}
		return e.filter((e) => t.isTargetToShow(e.id));
	},
	mapTargetsToUniqueXs(e) {
		let { axis: t } = this, n = [];
		return e?.length && (n = De(Oe(e.map((e) => e.values.map((e) => +e.x)))), n = t?.isTimeSeries() ? n.map((e) => /* @__PURE__ */ new Date(+e)) : n.map(Number)), Ae(n);
	},
	addTargetIds(e, t) {
		let { state: n } = this;
		Bi(t).forEach((t) => n[e].add(t));
	},
	removeTargetIds(e, t) {
		let { state: n } = this;
		Bi(t).forEach((t) => n[e].delete(t));
	},
	addHiddenTargetIds(e) {
		this.addTargetIds("hiddenTargetIds", e), this.cache.remove(Y.visibleTotalPerIndex);
	},
	removeHiddenTargetIds(e) {
		this.removeTargetIds("hiddenTargetIds", e), this.cache.remove(Y.visibleTotalPerIndex);
	},
	addHiddenLegendIds(e) {
		this.addTargetIds("hiddenLegendIds", e);
	},
	removeHiddenLegendIds(e) {
		this.removeTargetIds("hiddenLegendIds", e);
	},
	getValuesAsIdKeyed(e) {
		let t = this, { hasAxis: n } = t.state, r = {}, i = t.isMultipleX(), a = null;
		if (i) {
			let e = t.cache.get(Y.valuesXIndexMap);
			if (e && e.generation === t.state.dataGeneration) a = e.value;
			else {
				let e = t.mapTargetsToUniqueXs(t.data.targets).map((e) => g(e) ? e : +e);
				a = new Map(e.map((e, t) => [e, t])), t.cache.add(Y.valuesXIndexMap, {
					value: a,
					generation: t.state.dataGeneration
				});
			}
		}
		return e.forEach((e) => {
			let o = [];
			e.values.filter(({ value: e }) => m(e) || e === null).forEach((e) => {
				let { value: r } = e;
				if (r !== null && t.isCandlestickType(e) && (r = O(r) ? r.slice(0, 4) : [
					r.open,
					r.high,
					r.low,
					r.close
				]), O(r)) o.push(...r);
				else if (k(r) && "high" in r) o.push(...Object.values(r));
				else if (t.isBubbleZType(e)) o.push(n && t.getBubbleZData(r, "y"));
				else if (i && a) {
					let t = g(e.x) ? e.x : +e.x, n = a.get(t);
					n !== void 0 && (o[n] = r);
				} else o.push(r);
			}), r[e.id] = o;
		}), r;
	},
	hasMultiTargets() {
		return this.filterTargetsToShow().length > 1;
	},
	orderTargets(e) {
		let t = this, n = e.slice(), r = t.getSortCompareFn();
		return r && n.sort(r), n;
	},
	getSortCompareFn(e = !1) {
		let t = this, { config: n } = t, r = n.data_order, i = /asc/i.test(r), a = /desc/i.test(r), o;
		if (i || a) {
			let t = (e, t) => e + Math.abs(t.value), n = (e) => _(e) ? e : "values" in e ? e.values.reduce(t, 0) : e.value;
			o = (t, r) => {
				let a = n(t), o = n(r);
				return e ? i ? a - o : o - a : i ? o - a : a - o;
			};
		} else h(r) && (o = r.bind(t.api));
		return o || null;
	},
	filterByX(e, t) {
		return this.getValuesByX(e).get(this.getXCacheKey(t)) || [];
	},
	filterNullish(e) {
		let t = (e) => m(e.value);
		return e && e.filter((e) => "value" in e ? t(e) : e.values.some(t));
	},
	filterRemoveNull(e) {
		return e.filter((e) => m(this.getBaseValue(e)));
	},
	filterByXDomain(e, t) {
		return e.map((e) => ({
			id: e.id,
			id_org: e.id_org,
			values: e.values.filter((e) => t[0] <= e.x && e.x <= t[1])
		}));
	},
	hasDataLabel() {
		let e = this.config.data_labels;
		return b(e) && e || w(e) && D(e);
	},
	hasNullDataValue(e) {
		return e.some(({ value: e }) => e === null);
	},
	getDataIndexFromEvent(e) {
		let { $el: t, config: n, state: { hasRadar: r, inputType: i, eventReceiver: { coords: a, rect: o } } } = this, s;
		if (r) {
			let t = e.target;
			/tspan/i.test(t.tagName) && (t = t.parentNode);
			let n = L(t).datum();
			s = n && Object.keys(n).length === 1 ? n.index : void 0;
		} else {
			let r = n.axis_rotated, c = lr(t.chart.node()), l = i === "touch" && e.changedTouches ? e.changedTouches[0] : e, u = r ? l.clientY + c.y : l.clientX + c.x;
			if (pr(t.svg)) {
				let e = [u, 0];
				r && e.reverse(), u = ur(t.eventRect.node(), ...e)[r ? "y" : "x"];
			} else u -= r ? o.top : o.left;
			s = Fe(a, u, 0, a.length - 1, r);
		}
		return s;
	},
	getDataLabelLength(e, t, n) {
		let r = this, i = 1.3, a = [e, t].map((e) => r.dataLabelFormat()(e));
		if (r.config.render_mode === "canvas" && !r.$el.svg) {
			let e = r.$el.chart?.node?.(), t = e?.ownerDocument, o = t?.createElementNS("http://www.w3.org/2000/svg", "svg");
			if (e && o) {
				let r = a.map((e) => {
					let n = t.createElementNS("http://www.w3.org/2000/svg", "text");
					return n.textContent = e, o.appendChild(n), n;
				});
				o.style.cssText = "position:absolute;visibility:hidden;left:-10000px;top:-10000px;", e.appendChild(o);
				let s = r.map((e) => e.getBoundingClientRect()[n] * i);
				return o.remove(), s;
			}
		}
		return r.getTextRect(a)?.map((e) => e[n] * i) || [0, 0];
	},
	isNoneArc(e) {
		return this.hasTarget(this.data.targets, e.id);
	},
	isArc(e) {
		return "data" in e && this.hasTarget(this.data.targets, e.data.id);
	},
	findSameXOfValues(e, t) {
		let n = e[t].x, r = [], i;
		for (i = t - 1; i >= 0 && n === e[i].x; i--) r.push(e[i]);
		for (i = t; i < e.length && n === e[i].x; i++) r.push(e[i]);
		return r;
	},
	getXCacheKey(e) {
		return g(e) ? e : +e;
	},
	getValuesByX(e) {
		let t = this, { cache: n, state: r } = t, i = e.map((e) => {
			let { values: n } = e, r = n[0], i = n[n.length - 1];
			return `${e.id}:${n.length}:${r ? t.getXCacheKey(r.x) : ""}:${i ? t.getXCacheKey(i.x) : ""}`;
		}).join("|"), a = n.get(Y.valuesByX);
		if (a && a.generation === r.dataGeneration && a.targetKey === i) return a.value;
		let o = /* @__PURE__ */ new Map();
		for (let n = 0; n < e.length; n++) {
			let r = e[n].values;
			for (let e = 0; e < r.length; e++) {
				let n = r[e], i = t.getXCacheKey(n.x), a = o.get(i);
				a ? a.push(n) : o.set(i, [n]);
			}
		}
		return n.add(Y.valuesByX, {
			generation: r.dataGeneration,
			targetKey: i,
			value: o
		}), o;
	},
	getClosestCandidates(e, t, n = !0) {
		let r = this, { config: i, scale: a } = r, o = e.length, s = e[0];
		if (!n || o < 200 || !s || !i.data_xSort) return e;
		let c = r.isBarType(s.id), l = r.isCandlestickType(s.id), u = i.point_sensitivity;
		if (!(c || l) && !_(u)) return e;
		let d = a.zoom || a.x, f = t[+i.axis_rotated], p = d(e[0].x) <= d(e[o - 1].x), m = 0, h = o - 1;
		for (; m < h;) {
			let t = m + h >> 1, n = d(e[t].x);
			(p ? n < f : n > f) ? m = t + 1 : h = t;
		}
		let g = [], v = /* @__PURE__ */ new Set(), y = (t) => {
			t >= 0 && t < o && !v.has(t) && (v.add(t), g.push(e[t]));
		}, b = (t) => {
			if (t < 0 || t >= o) return;
			let n = r.getXCacheKey(e[t].x), i = t;
			for (; i >= 0 && r.getXCacheKey(e[i].x) === n;) y(i--);
			for (i = t + 1; i < o && r.getXCacheKey(e[i].x) === n;) y(i++);
		};
		if (c || l) for (let e = m - 2; e <= m + 2; e++) b(e);
		else {
			let t = u, n = (n, r) => {
				for (let i = n; i >= 0 && i < o; i += r) {
					let n = e[i];
					if (Math.abs(d(n.x) - f) > t) break;
					y(i);
				}
			};
			n(m, 1), n(m - 1, -1);
		}
		return g;
	},
	findClosestFromTargets(e, t) {
		let n = this, r = [];
		for (let i = 0; i < e.length; i++) {
			let a = n.findClosest(e[i].values, t);
			a && r.push(a);
		}
		return n.findClosest(r, t, !1);
	},
	findClosest(e, t, n = !0) {
		let r = this, { $el: { main: i } } = r, a = r.getClosestCandidates(e, t, n), o, s;
		for (let e = 0; e < a.length; e++) {
			let n = a[e];
			if (!n || !m(n.value)) continue;
			let c = r.isBarType(n.id), l = r.isCandlestickType(n.id);
			if (c || l) {
				let e = c ? `.${br.chartBar}.${z.target}${r.getTargetSelectorSuffix(n.id)} .${br.bar}-${n.index}` : `.${xr.chartCandlestick}.${z.target}${r.getTargetSelectorSuffix(n.id)} .${xr.candlestick}-${n.index} path`;
				!s && r.isWithinBar(i.select(e).node()) && (s = n);
			} else {
				let e = r.dist(n, t);
				e < r.getPointSensitivity(n) && (o === void 0 || e < o) && (o = e, s = n);
			}
		}
		return s;
	},
	dist(e, t) {
		let n = this, { config: { axis_rotated: r }, scale: i } = n, a = +r, o = +!r, s = n.circleY(e, e.index), c = (i.zoom || i.x)(e.x) - t[a], l = s - t[o];
		return Math.sqrt(c * c + l * l);
	},
	convertValuesToStep(e) {
		let { axis: t, config: n } = this, r = n.line_step_type, i = t ? t.isCategorized() : !1, a = O(e) ? e.concat() : [e];
		if (!(i || /step\-(after|before)/.test(r))) return e;
		if (a.length) {
			let e = a[0], t = a[a.length - 1], { id: n } = e, { x: o } = e;
			a.unshift({
				x: --o,
				value: e.value,
				id: n
			}), i && r === "step-after" && a.unshift({
				x: o - 1,
				value: e.value,
				id: n
			}), o = t.x, a.push({
				x: ++o,
				value: t.value,
				id: n
			}), i && r === "step-before" && a.push({
				x: o + 1,
				value: t.value,
				id: n
			});
		}
		return a;
	},
	convertValuesToRange(e) {
		let t = O(e) ? e.concat() : [e], n = [];
		return t.forEach((e) => {
			let { x: t, id: r } = e;
			n.push({
				x: t,
				id: r,
				value: e.value[0]
			}), n.push({
				x: t,
				id: r,
				value: e.value[2]
			});
		}), n;
	},
	updateDataAttributes(e, t) {
		let n = this, { config: r } = n, i = r[`data_${e}`];
		return v(t) || (Object.keys(t).forEach((e) => {
			i[e] = t[e];
		}), n.redraw({ withLegend: !0 })), i;
	},
	getRangedData(e, t = "", n = "areaRange") {
		let r = e?.value;
		if (O(r)) {
			if (n === "bar") return r.reduce((e, t) => t - e);
			{
				let e = zi[n]?.[t] ?? -1;
				return e >= 0 ? r[e] : void 0;
			}
		}
		return r && t ? r[t] : r;
	},
	setRatioForGroupedData(e) {
		let t = this, { config: n } = t;
		if (n.data_groups.length && e.some((e) => t.isGrouped(e.id))) {
			let n = (e) => t.getRatio("index", e, !0);
			e.forEach((e) => {
				"values" in e ? e.values.forEach(n) : n(e);
			});
		}
	},
	getRatio(e, t, n = !1) {
		let r = this, { config: i, state: a } = r, o = r.api, s = 0;
		if (t && o.data.shown().length) {
			if (s = t.ratio || t.value, e === "arc") {
				if (r.pie.padAngle()()) s = t.value / r.getTotalDataSum(!0);
				else {
					let e = i.gauge_fullCircle ? r.getArcLength() : r.getStartingAngle() * -2, n = r.hasType("gauge") ? e : Math.PI * 2;
					s = (t.endAngle - t.startAngle) / n;
				}
			} else if (e === "index") {
				let e = r.getVisibleTotalPerIndex(r.isStackNormalizedPerGroup() ? t.id : void 0);
				if (e === null) return s;
				let n = e[t.index];
				t.ratio = _(t.value) && e && n ? t.value / n : 0, s = t.ratio;
			} else if (e === "radar") s = parseFloat(String(Math.max(t.value, 0))) / a.current.dataMax * i.radar_size_ratio;
			else if (e === "bar") {
				let n = r.getYScaleById.bind(r)(t.id).domain().reduce((e, t) => t - e);
				s = n === 0 ? 0 : Math.abs(r.getRangedData(t, null, e) / n);
			} else e === "treemap" && (s /= r.getTotalDataSum(!0));
		}
		return n && s ? s * 100 : s;
	},
	updateDataIndexByX(e) {
		let t = this, n = e.reduce((e, t, n) => (e[Number(t.x)] = n, e), {});
		t.data.targets.forEach((e) => {
			e.values.forEach((e, t) => {
				let r = n[Number(e.x)];
				r === void 0 && (r = t), e.index = r;
			});
		});
	},
	isBubbleZType(e) {
		return this.isBubbleType(e) && (k(e.value) && ("z" in e.value || "y" in e.value) || O(e.value) && e.value.length >= 2);
	},
	isBarRangeType(e) {
		let t = this, { value: n } = e;
		return t.isBarType(e) && !t.isSubchartSourceTypeOf?.(e, I.CANDLESTICK) && O(n) && n.length >= 2 && n.every(_);
	},
	getDataById(e) {
		let t = this.cache.get(e) || this.api.data(e);
		return t?.[0] ?? t;
	}
};
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/ChartInternal/data/load.js
function Hi(e, t = !1) {
	let n = this, { api: r } = n;
	t && n.api.flush(!0), e?.call(r);
}
var Ui = {
	load(e, t) {
		let n = this, { axis: r, data: i, org: a, scale: o } = n, { append: s } = t, c = {
			domain: null,
			currentDomain: null,
			x: null
		}, l = e;
		if (l) {
			t.filter && (l = l.filter(t.filter)), (t.type || t.types) && l.forEach((e) => {
				n.setTargetType(e.id, t.types?.[e.id] || t.type);
			});
			let e = new Map(l.map((e) => [e.id, e]));
			i.targets.forEach((t) => {
				let n = e.get(t.id);
				if (n) {
					if (s) {
						let e = n.values;
						for (let n = 0; n < e.length; n++) t.values.push(e[n]);
					} else t.values = n.values;
					e.delete(t.id);
				}
			}), e.forEach((e) => i.targets.push(e));
		}
		n.state.isCanvasMode ? (n.redraw({
			withUpdateOrgXDomain: !0,
			withUpdateXDomain: !0,
			withLegend: !0
		}), n.updateTypesElements(), Hi.call(n, t.done, t.resizeAfter)) : (n.updateTargets(i.targets), o.zoom && (c.x = r.isCategorized() ? o.x.orgScale() : (a.xScale || o.x).copy(), c.domain = n.getXDomain(i.targets), c.x.domain(c.domain), c.currentDomain = n.zoom.getDomain(), n.withinRange(c.currentDomain, void 0, c.domain) || (o.x.domain(c.domain), o.zoom = null, n.$el.eventRect.property("__zoom", null))), n.redraw({
			withUpdateOrgXDomain: !0,
			withUpdateXDomain: !0,
			withLegend: !0
		}), o.zoom ? (a.xDomain = c.domain, a.xScale = c.x, r.isCategorized() && (c.currentDomain = n.getZoomDomainValue(c.currentDomain), a.xDomain = n.getZoomDomainValue(a.xDomain), a.xScale = c.x.domain(a.xDomain)), n.updateCurrentZoomTransform(c.x, c.currentDomain)) : a.xScale && a.xScale.domain(a.xDomain), n.updateTypesElements(), Hi.call(n, t.done, t.resizeAfter));
	},
	loadFromArgs(e) {
		let t = this;
		t.config && (t.cache.reset(!1, [
			Y.filteredTargets,
			Y.maxDataCountTarget,
			Y.valuesXIndexMap,
			Y.maxTickSize
		]), t.convertData(e, (n) => {
			let r = e.data || n;
			e.append && (r.__append__ = !0), r && t.load(t.convertDataToTargets.call(t, r), e);
		}));
	},
	unload(e, t) {
		let n = this, { state: r, $el: i, $T: a } = n, o = !!n.hasLegendDefsPoint?.(), s = t, c = e;
		if (n.cache.reset(!1, [
			Y.filteredTargets,
			Y.maxDataCountTarget,
			Y.valuesXIndexMap,
			Y.maxTickSize
		]), s ||= () => {}, c = c.filter((e) => n.hasTarget(n.data.targets, e)), c.length === 0) {
			s();
			return;
		}
		let l = new Set(c);
		r.isCanvasMode ? (c.forEach((e) => {
			r.withoutFadeIn[e] = !1;
		}), n.data.targets = n.data.targets.filter((e) => !l.has(e.id)), n.removeHiddenTargetIds(c), n.removeHiddenLegendIds(c), n.updateTypesElements(), s()) : (c.forEach((e) => {
			let t = n.getTargetSelectorSuffix(e);
			r.withoutFadeIn[e] = !1, i.legend && i.legend.selectAll(`.${H.legendItem}${t}`).remove(), o && i.defs?.select(`#${n.getDefsPointId(t)}`).remove();
		}), n.data.targets = n.data.targets.filter((e) => !l.has(e.id)), r.hasFunnel && n.updateFunnel(n.data.targets), r.hasTreemap && n.updateTargetsForTreemap(n.data.targets), n.updateTypesElements(), a(i.svg.selectAll(c.map((e) => n.selectorTarget(e)))).style("opacity", "0").remove().call(Se, s));
	}
}, Wi = { value: () => {} };
function Gi() {
	for (var e = 0, t = arguments.length, n = {}, r; e < t; ++e) {
		if (!(r = arguments[e] + "") || r in n || /[\s.]/.test(r)) throw Error("illegal type: " + r);
		n[r] = [];
	}
	return new Ki(n);
}
function Ki(e) {
	this._ = e;
}
function qi(e, t) {
	return e.trim().split(/^|\s+/).map(function(e) {
		var n = "", r = e.indexOf(".");
		if (r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), e && !t.hasOwnProperty(e)) throw Error("unknown type: " + e);
		return {
			type: e,
			name: n
		};
	});
}
Ki.prototype = Gi.prototype = {
	constructor: Ki,
	on: function(e, t) {
		var n = this._, r = qi(e + "", n), i, a = -1, o = r.length;
		if (arguments.length < 2) {
			for (; ++a < o;) if ((i = (e = r[a]).type) && (i = Ji(n[i], e.name))) return i;
		} else {
			if (t != null && typeof t != "function") throw Error("invalid callback: " + t);
			for (; ++a < o;) if (i = (e = r[a]).type) n[i] = Yi(n[i], e.name, t);
			else if (t == null) for (i in n) n[i] = Yi(n[i], e.name, null);
			return this;
		}
	},
	copy: function() {
		var e = {}, t = this._;
		for (var n in t) e[n] = t[n].slice();
		return new Ki(e);
	},
	call: function(e, t) {
		if ((i = arguments.length - 2) > 0) for (var n = Array(i), r = 0, i, a; r < i; ++r) n[r] = arguments[r + 2];
		if (!this._.hasOwnProperty(e)) throw Error("unknown type: " + e);
		for (a = this._[e], r = 0, i = a.length; r < i; ++r) a[r].value.apply(t, n);
	},
	apply: function(e, t, n) {
		if (!this._.hasOwnProperty(e)) throw Error("unknown type: " + e);
		for (var r = this._[e], i = 0, a = r.length; i < a; ++i) r[i].value.apply(t, n);
	}
};
function Ji(e, t) {
	for (var n = 0, r = e.length, i; n < r; ++n) if ((i = e[n]).name === t) return i.value;
}
function Yi(e, t, n) {
	for (var r = 0, i = e.length; r < i; ++r) if (e[r].name === t) {
		e[r] = Wi, e = e.slice(0, r).concat(e.slice(r + 1));
		break;
	}
	return n != null && e.push({
		name: t,
		value: n
	}), e;
}
// node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/noevent.js
var Xi = { passive: !1 }, Zi = {
	capture: !0,
	passive: !1
};
function Qi(e) {
	e.stopImmediatePropagation();
}
function $i(e) {
	e.preventDefault(), e.stopImmediatePropagation();
}
// node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/nodrag.js
function ea(e) {
	var t = e.document.documentElement, n = L(e).on("dragstart.drag", $i, Zi);
	"onselectstart" in t ? n.on("selectstart.drag", $i, Zi) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function ta(e, t) {
	var n = e.document.documentElement, r = L(e).on("dragstart.drag", null);
	t && (r.on("click.drag", $i, Zi), setTimeout(function() {
		r.on("click.drag", null);
	}, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
// node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/constant.js
var na = (e) => () => e;
// node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/event.js
function ra(e, { sourceEvent: t, subject: n, target: r, identifier: i, active: a, x: o, y: s, dx: c, dy: l, dispatch: u }) {
	Object.defineProperties(this, {
		type: {
			value: e,
			enumerable: !0,
			configurable: !0
		},
		sourceEvent: {
			value: t,
			enumerable: !0,
			configurable: !0
		},
		subject: {
			value: n,
			enumerable: !0,
			configurable: !0
		},
		target: {
			value: r,
			enumerable: !0,
			configurable: !0
		},
		identifier: {
			value: i,
			enumerable: !0,
			configurable: !0
		},
		active: {
			value: a,
			enumerable: !0,
			configurable: !0
		},
		x: {
			value: o,
			enumerable: !0,
			configurable: !0
		},
		y: {
			value: s,
			enumerable: !0,
			configurable: !0
		},
		dx: {
			value: c,
			enumerable: !0,
			configurable: !0
		},
		dy: {
			value: l,
			enumerable: !0,
			configurable: !0
		},
		_: { value: u }
	});
}
ra.prototype.on = function() {
	var e = this._.on.apply(this._, arguments);
	return e === this._ ? this : e;
};
// node_modules/.pnpm/d3-drag@3.0.0/node_modules/d3-drag/src/drag.js
function ia(e) {
	return !e.ctrlKey && !e.button;
}
function aa() {
	return this.parentNode;
}
function oa(e, t) {
	return t ?? {
		x: e.x,
		y: e.y
	};
}
function sa() {
	return navigator.maxTouchPoints || "ontouchstart" in this;
}
function ca() {
	var e = ia, t = aa, n = oa, r = sa, i = {}, a = Gi("start", "drag", "end"), o = 0, s, c, l, u, d = 0;
	function f(e) {
		e.on("mousedown.drag", p).filter(r).on("touchstart.drag", g).on("touchmove.drag", _, Xi).on("touchend.drag touchcancel.drag", v).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
	}
	function p(n, r) {
		if (!u && e.call(this, n, r)) {
			var i = y(this, t.call(this, n, r), n, r, "mouse");
			i && (L(n.view).on("mousemove.drag", m, Zi).on("mouseup.drag", h, Zi), ea(n.view), Qi(n), l = !1, s = n.clientX, c = n.clientY, i("start", n));
		}
	}
	function m(e) {
		if ($i(e), !l) {
			var t = e.clientX - s, n = e.clientY - c;
			l = t * t + n * n > d;
		}
		i.mouse("drag", e);
	}
	function h(e) {
		L(e.view).on("mousemove.drag mouseup.drag", null), ta(e.view, l), $i(e), i.mouse("end", e);
	}
	function g(n, r) {
		if (e.call(this, n, r)) for (var i = n.changedTouches, a = t.call(this, n, r), o = i.length, s = 0, c; s < o; ++s) (c = y(this, a, n, r, i[s].identifier, i[s])) && (Qi(n), c("start", n, i[s]));
	}
	function _(e) {
		for (var t = e.changedTouches, n = t.length, r = 0, a; r < n; ++r) (a = i[t[r].identifier]) && ($i(e), a("drag", e, t[r]));
	}
	function v(e) {
		var t = e.changedTouches, n = t.length, r, a;
		for (u && clearTimeout(u), u = setTimeout(function() {
			u = null;
		}, 500), r = 0; r < n; ++r) (a = i[t[r].identifier]) && (Qi(e), a("end", e, t[r]));
	}
	function y(e, t, r, s, c, l) {
		var u = a.copy(), d = Xn(l || r, t), p, m, h;
		if ((h = n.call(e, new ra("beforestart", {
			sourceEvent: r,
			target: f,
			identifier: c,
			active: o,
			x: d[0],
			y: d[1],
			dx: 0,
			dy: 0,
			dispatch: u
		}), s)) != null) return p = h.x - d[0] || 0, m = h.y - d[1] || 0, function n(r, a, l) {
			var g = d, _;
			switch (r) {
				case "start":
					i[c] = n, _ = o++;
					break;
				case "end": delete i[c], --o;
				case "drag": d = Xn(l || a, t), _ = o;
			}
			u.call(r, e, new ra(r, {
				sourceEvent: a,
				subject: h,
				target: f,
				identifier: c,
				active: _,
				x: d[0] + p,
				y: d[1] + m,
				dx: d[0] - g[0],
				dy: d[1] - g[1],
				dispatch: u
			}), s);
		};
	}
	return f.filter = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : na(!!t), f) : e;
	}, f.container = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : na(e), f) : t;
	}, f.subject = function(e) {
		return arguments.length ? (n = typeof e == "function" ? e : na(e), f) : n;
	}, f.touchable = function(e) {
		return arguments.length ? (r = typeof e == "function" ? e : na(!!e), f) : r;
	}, f.on = function() {
		var e = a.on.apply(a, arguments);
		return e === a ? f : e;
	}, f.clickDistance = function(e) {
		return arguments.length ? (d = (e = +e) * e, f) : Math.sqrt(d);
	}, f;
}
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/ChartInternal/interactions/interaction.js
var la = {
	setExpand(e, t, n) {
		let r = this, { config: i, $el: { circle: a } } = r;
		a && i.point_focus_expand_enabled && r.expandCircles(e, t, n), r.expandBarTypeShapes(!0, e, t, n);
	},
	expandBarTypeShapes(e = !0, t, n, r) {
		let i = this;
		["bar", "candlestick"].filter((e) => i.$el[e]).forEach((a) => {
			r && i.$el[a].classed(z.EXPANDED, !1), i.getShapeByIndex(a, t, n).classed(z.EXPANDED, e);
		});
	},
	setOverOut(e, t) {
		let n = this, { config: r, state: { hasFunnel: i, hasRadar: a, hasTreemap: o }, $el: { main: s } } = n, c = k(t);
		if (c || t !== -1) {
			let l = r[e ? "data_onover" : "data_onout"].bind(n.api);
			if (r.color_onover && n.setOverColor(e, t, c), c) {
				let e = n.getTargetSelectorSuffix(t.id), r = i || o ? `${z.target + e} .${K.shape}` : B.arc + e;
				l(t, s.select(`.${r}`).node());
			} else if (r.tooltip_grouped) e && (a && n.isPointFocusOnly() ? n.showCircleFocus(n.getAllValuesOnIndex(t, !0)) : n.setExpand(t, null, !0)), !n.isMultipleX() && s.selectAll(`.${K.shape}-${t}`).each(function(e) {
				l(e, this);
			});
			else {
				let i = n.cache.get(Y.setOverOut) || [], a = s.selectAll(`.${K.shape}-${t}`).filter(function(e) {
					return n.isWithinShape(this, e);
				}), o = a.filter(function() {
					return i.every((e) => e !== this);
				});
				if (!e || a.empty() || i.length === o.size() && o.nodes().every((e, t) => e !== i[t])) for (; i.length;) {
					let e = i.pop();
					r.data_onout.bind(n.api)(L(e).datum(), e);
				}
				o.each(function() {
					e && (l(L(this).datum(), this), i.push(this));
				}), n.cache.add(Y.setOverOut, i);
			}
		}
	},
	callOverOutForTouch(e) {
		let t = this, n = t.cache.get(Y.callOverOutForTouch);
		(k(e) && n ? e.id !== n.id : e !== n) && ((n || _(n)) && t.setOverOut(!1, n), (e || _(e)) && t.setOverOut(!0, e), t.cache.add(Y.callOverOutForTouch, e));
	},
	getDraggableSelection() {
		let e = this, { config: t, state: n } = e;
		return t.interaction_enabled && t.data_selection_draggable && e.drag ? ca().on("drag", function(t) {
			n.event = t, e.drag(ar(t, this));
		}).on("start", function(t) {
			n.event = t, e.dragstart(ar(t, this));
		}).on("end", (t) => {
			n.event = t, e.dragend();
		}) : () => {};
	},
	dispatchEvent(e, t, n) {
		let r = this, { config: i, state: { eventReceiver: a, hasAxis: o, hasFunnel: s, hasRadar: c, hasTreemap: l }, $el: { eventRect: u, funnel: d, radar: f, svg: p, treemap: m } } = r, h = ((s || l) && a.rect || c && f.axes.select(`.${V.axis}-${t} text`) || u || r.getArcElementByIdOrIndex?.(t))?.node?.();
		if (h) {
			let u = r.isMultipleX(), f = i.axis_rotated, { width: g, left: _, top: v } = R(h);
			if (o && !c && !u) {
				let e = a.coords[t];
				e ? (g = e.w, _ += e.x, v += e.y) : (g = 0, _ = 0, v = 0);
			}
			let y = _ + (n ? n[0] : 0) + (u || f ? 0 : g / 2), b = v + (n ? n[1] : 0) + (f ? 4 : 0);
			if (pr(p) && r.$el.eventRect) {
				let e = ur(r.$el.eventRect.node(), y, b, !1);
				y = e.x, b = e.y;
			}
			let x = {
				screenX: y,
				screenY: b,
				clientX: y,
				clientY: b,
				bubbles: c
			};
			(s || l) && (h = (d ?? m).node()), vr[/^(mouse|click)/.test(e) ? "mouse" : "touch"](h, e, x);
		}
	},
	setDragStatus(e) {
		this.state.dragging = e;
	},
	unbindZoomEvent() {
		let { $el: { canvas: e, eventRect: t, svg: n, zoomResetBtn: r } } = this;
		t?.on(".zoom wheel.zoom .drag", null), e?.on(".zoom wheel.zoom .drag", null), n?.on("wheel", null), r?.on("click", null).style("display", "none");
	},
	unbindAllEvents() {
		let e = this, { $el: { arcs: t, eventRect: n, legend: r, region: i, svg: a, treemap: o }, brush: s } = e;
		[
			a,
			n,
			i?.list,
			s?.getSelection(),
			t?.selectAll("path"),
			r?.selectAll("g"),
			o
		].forEach((e) => e?.on("wheel click mouseover mousemove mouseout touchstart touchmove touchend touchstart.eventRect touchmove.eventRect touchend.eventRect .brush .drag .zoom wheel.zoom dblclick.zoom", null)), e.unbindZoomEvent?.();
	}
}, ua = { categoryName(e) {
	let { axis_x_categories: t } = this.config;
	return t?.[e] ?? e;
} }, da = /[\x00-\x20\x7F-\xA0\s?!@#$%^&*()_=+,.<>'":;\[\]\/|~`{}\\]/g, fa = {
	generateClass(e, t) {
		let n = this.state.generateClassCache, r = `${e}\0${t}`, i = n.get(r);
		return i || (i = ` ${e} ${e + this.getTargetSelectorSuffix(t)}`, n.set(r, i)), i;
	},
	getClass(e, t) {
		let n = /s$/.test(e), r = /^(area|arc|line|funnel|treemap)s?$/.test(e), i = n ? "id" : "index";
		return (a) => {
			let o = a.data || a;
			return ((t ? this.generateClass(J[n ? "shapes" : "shape"], o[i]) : "") + this.generateClass(J[e], o[r ? "id" : i])).trim();
		};
	},
	getChartClass(e) {
		return (t) => J[`chart${e}`] + this.classTarget((t.data ? t.data : t).id);
	},
	generateExtraLineClass() {
		let e = this.config.line_classes || [], t = [];
		return function(n) {
			let r = n.id || n.data?.id || n;
			return t.indexOf(r) < 0 && t.push(r), e[t.indexOf(r) % e.length];
		};
	},
	classRegion(e, t) {
		return `${this.generateClass(J.region, t)} ${"class" in e ? e.class : ""}`;
	},
	classTarget(e) {
		let t = this.config.data_classes[e], n = "";
		return t && (n = ` ${J.target}-${t}`), this.generateClass(J.target, e) + n;
	},
	classFocus(e) {
		return this.classFocused(e) + this.classDefocused(e);
	},
	classFocused(e) {
		return ` ${this.state.focusedTargetIds.has(e.id) ? J.focused : ""}`;
	},
	classDefocused(e) {
		return ` ${this.state.defocusedTargetIds.has(e.id) ? J.defocused : ""}`;
	},
	getTargetSelectorSuffix(e) {
		return (e || e === 0 ? `-${e}` : "").replace(da, "-");
	},
	selectorTarget(e, t = "", n = "") {
		let r = this.getTargetSelectorSuffix(e);
		return `${t}.${J.target + r} ${n}, ${t}.${J.circles + r} ${n}`;
	},
	selectorTargets(e, t) {
		let n = e || [];
		return n.length ? n.map((e) => this.selectorTarget(e, t)) : null;
	},
	selectorLegend(e) {
		return `.${J.legendItem + this.getTargetSelectorSuffix(e)}`;
	},
	selectorLegends(e) {
		return e?.length ? e.map((e) => this.selectorLegend(e)) : null;
	}
}, pa = (e, t, n) => {
	let r = L(e.cloneNode(!0));
	return r.attr("id", n).insert("rect", ":first-child").attr("width", r.attr("width")).attr("height", r.attr("height")).style("fill", t), {
		id: n,
		node: r.node()
	};
};
function ma(e) {
	let t = Y.colorPattern, { body: n } = l, r = n[t];
	if (!r) {
		let i = e.classed(Cr.colorPattern, !0).style("background-image");
		e.classed(Cr.colorPattern, !1), i.indexOf(";") > -1 && (r = i.replace(/url[^#]*|["'()]|(\s|%20)/g, "").split(";").map((e) => e.trim().replace(/[\"'\s]/g, "")).filter(Boolean), n[t] = r);
	}
	return r;
}
var ha = [
	"#1f77b4",
	"#ff7f0e",
	"#2ca02c",
	"#d62728",
	"#9467bd",
	"#8c564b",
	"#e377c2",
	"#7f7f7f",
	"#bcbd22",
	"#17becf"
], ga = {
	generateColor() {
		let e = this, { $el: t, config: n } = e, r = [], i = n.area_linearGradient || n.bar_linearGradient || n.point_radialGradient, a = D(n.color_pattern) ? n.color_pattern : [...ma(t.chart) || ha], o = a;
		if (h(n.color_tiles)) {
			let t = n.color_tiles.bind(e.api)(), r = a.map((n, r) => {
				let i = n.replace(/[#\(\)\s,]/g, ""), a = `${e.state.datetimeId}-pattern-${i}-${r}`;
				return pa(t[r % t.length], n, a);
			});
			a = r.map((e) => `url(#${e.id})`), e.patterns = r;
		}
		return function(s) {
			let c = n.data_colors, l = n.data_color, u = s.id || s.data?.id || s, d = e.isTypeOf(u, [
				"line",
				"spline",
				"step"
			]) || !n.data_types[u], f;
			if (h(c[u])) f = c[u].bind(e.api)(s);
			else if (c[u]) f = c[u];
			else {
				let e = r.indexOf(u);
				e < 0 && (r.push(u), e = r.length - 1), f = d ? o[e % o.length] : a[e % a.length], c[u] = f;
			}
			if (f = h(l) ? l.call(e.api, f, s) : f, i && t.defs) {
				let t = e.$el.defs.selectAll(`[id$='-gradient${e.getTargetSelectorSuffix(u)}'] stop`), n;
				t.each(function(e, t) {
					n = t === 0 ? this.style.stopColor : this.style.stopColor === n;
				}), n === !0 && t.attr("stop-color", f);
			}
			return f;
		};
	},
	generateLevelColor() {
		let { config: e } = this, t = e.color_pattern, n = e.color_threshold, r = n.unit === "value", i = n.max || 100, a = n.values && n.values.length ? n.values : [];
		return D(n) ? function(e) {
			let n = r ? e : e * 100 / i, o = t[t.length - 1];
			for (let e = 0, r = a.length; e < r; e++) if (n <= a[e]) {
				o = t[e];
				break;
			}
			return o;
		} : null;
	},
	generateTextBGColorFilter(e, t = {
		x: 0,
		y: 0,
		width: 1,
		height: 1
	}) {
		let n = this, { $el: { defs: r }, state: i } = n;
		if (e) {
			let a = [];
			g(e) ? a.push("") : k(e) ? a = Object.keys(e) : h(e) && (a = n.mapToTargetIds()), a.forEach((a) => {
				let o = `${i.datetimeId}-labels-bg${n.getTargetSelectorSuffix(a)}${g(e) ? n.getTargetSelectorSuffix(e) : ""}`, s = ve(a === "" ? e : e?.[a] || "");
				if (r.select(`#${o}`).empty()) {
					let e = r.append("filter").attr("x", t.x).attr("y", t.y).attr("width", t.width).attr("height", t.height).attr("id", o);
					e.append("feFlood").attr("flood-color", s), e.append("feComposite").attr("in", "SourceGraphic");
				}
			});
		}
	},
	getGradienColortUrl(e) {
		return `url(#${this.state.datetimeId}-gradient${this.getTargetSelectorSuffix(e)})`;
	},
	updateLinearGradient() {
		let e = this, { config: t, data: { targets: n }, state: { datetimeId: r }, $el: { defs: i } } = e;
		n.forEach((n) => {
			let a = `${r}-gradient${e.getTargetSelectorSuffix(n.id)}`, o = e.hasPointType() && t.point_radialGradient, s = e.isAreaType(n) && "area" || e.isBarType(n) && "bar";
			if ((o || s) && i.select(`#${a}`).empty()) {
				let r = e.color(n), c = {
					defs: null,
					stops: []
				};
				if (o) {
					let { cx: e = .3, cy: t = .3, r: n = .7, stops: s = [[
						.1,
						r,
						0
					], [
						.9,
						r,
						1
					]] } = o;
					c.stops = s, c.defs = i.append("radialGradient").attr("id", `${a}`).attr("cx", e).attr("cy", t).attr("r", n);
				} else {
					let e = t.axis_rotated, { x: n = e ? [1, 0] : [0, 0], y: o = e ? [0, 0] : [0, 1], stops: l = [[
						0,
						r,
						1
					], [
						1,
						r,
						0
					]] } = t[`${s}_linearGradient`];
					c.stops = l, c.defs = i.append("linearGradient").attr("id", `${a}`).attr("x1", n[0]).attr("x2", n[1]).attr("y1", o[0]).attr("y2", o[1]);
				}
				c.stops.forEach((t) => {
					let [i, a, o] = t, s = h(a) ? a.bind(e.api)(n.id) : a;
					c.defs && c.defs.append("stop").attr("offset", i).attr("stop-color", s || r).attr("stop-opacity", o);
				});
			}
		});
	},
	setOverColor(e, t) {
		let n = this, { config: r, $el: { main: i } } = n, a = r.color_onover, o = e ? a : n.color;
		k(o) ? o = ({ id: e }) => e in a ? a[e] : n.color(e) : g(o) ? o = () => a : h(a) && (o = o.bind(n.api)), i.selectAll(k(t) ? `.${B.arc}${n.getTargetSelectorSuffix(t.id)}` : `.${K.shape}-${t}`).style("fill", o);
	}
};
// node_modules/.pnpm/d3-color@3.1.0/node_modules/d3-color/src/define.js
function _a(e, t, n) {
	e.prototype = t.prototype = n, n.constructor = e;
}
function va(e, t) {
	var n = Object.create(e.prototype);
	for (var r in t) n[r] = t[r];
	return n;
}
// node_modules/.pnpm/d3-color@3.1.0/node_modules/d3-color/src/color.js
function ya() {}
var ba = .7, xa = 1 / ba, Sa = "\\s*([+-]?\\d+)\\s*", Ca = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", wa = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Ta = /^#([0-9a-f]{3,8})$/, Ea = RegExp(`^rgb\\(${Sa},${Sa},${Sa}\\)$`), Da = RegExp(`^rgb\\(${wa},${wa},${wa}\\)$`), Oa = RegExp(`^rgba\\(${Sa},${Sa},${Sa},${Ca}\\)$`), ka = RegExp(`^rgba\\(${wa},${wa},${wa},${Ca}\\)$`), Aa = RegExp(`^hsl\\(${Ca},${wa},${wa}\\)$`), ja = RegExp(`^hsla\\(${Ca},${wa},${wa},${Ca}\\)$`), Ma = {
	aliceblue: 15792383,
	antiquewhite: 16444375,
	aqua: 65535,
	aquamarine: 8388564,
	azure: 15794175,
	beige: 16119260,
	bisque: 16770244,
	black: 0,
	blanchedalmond: 16772045,
	blue: 255,
	blueviolet: 9055202,
	brown: 10824234,
	burlywood: 14596231,
	cadetblue: 6266528,
	chartreuse: 8388352,
	chocolate: 13789470,
	coral: 16744272,
	cornflowerblue: 6591981,
	cornsilk: 16775388,
	crimson: 14423100,
	cyan: 65535,
	darkblue: 139,
	darkcyan: 35723,
	darkgoldenrod: 12092939,
	darkgray: 11119017,
	darkgreen: 25600,
	darkgrey: 11119017,
	darkkhaki: 12433259,
	darkmagenta: 9109643,
	darkolivegreen: 5597999,
	darkorange: 16747520,
	darkorchid: 10040012,
	darkred: 9109504,
	darksalmon: 15308410,
	darkseagreen: 9419919,
	darkslateblue: 4734347,
	darkslategray: 3100495,
	darkslategrey: 3100495,
	darkturquoise: 52945,
	darkviolet: 9699539,
	deeppink: 16716947,
	deepskyblue: 49151,
	dimgray: 6908265,
	dimgrey: 6908265,
	dodgerblue: 2003199,
	firebrick: 11674146,
	floralwhite: 16775920,
	forestgreen: 2263842,
	fuchsia: 16711935,
	gainsboro: 14474460,
	ghostwhite: 16316671,
	gold: 16766720,
	goldenrod: 14329120,
	gray: 8421504,
	green: 32768,
	greenyellow: 11403055,
	grey: 8421504,
	honeydew: 15794160,
	hotpink: 16738740,
	indianred: 13458524,
	indigo: 4915330,
	ivory: 16777200,
	khaki: 15787660,
	lavender: 15132410,
	lavenderblush: 16773365,
	lawngreen: 8190976,
	lemonchiffon: 16775885,
	lightblue: 11393254,
	lightcoral: 15761536,
	lightcyan: 14745599,
	lightgoldenrodyellow: 16448210,
	lightgray: 13882323,
	lightgreen: 9498256,
	lightgrey: 13882323,
	lightpink: 16758465,
	lightsalmon: 16752762,
	lightseagreen: 2142890,
	lightskyblue: 8900346,
	lightslategray: 7833753,
	lightslategrey: 7833753,
	lightsteelblue: 11584734,
	lightyellow: 16777184,
	lime: 65280,
	limegreen: 3329330,
	linen: 16445670,
	magenta: 16711935,
	maroon: 8388608,
	mediumaquamarine: 6737322,
	mediumblue: 205,
	mediumorchid: 12211667,
	mediumpurple: 9662683,
	mediumseagreen: 3978097,
	mediumslateblue: 8087790,
	mediumspringgreen: 64154,
	mediumturquoise: 4772300,
	mediumvioletred: 13047173,
	midnightblue: 1644912,
	mintcream: 16121850,
	mistyrose: 16770273,
	moccasin: 16770229,
	navajowhite: 16768685,
	navy: 128,
	oldlace: 16643558,
	olive: 8421376,
	olivedrab: 7048739,
	orange: 16753920,
	orangered: 16729344,
	orchid: 14315734,
	palegoldenrod: 15657130,
	palegreen: 10025880,
	paleturquoise: 11529966,
	palevioletred: 14381203,
	papayawhip: 16773077,
	peachpuff: 16767673,
	peru: 13468991,
	pink: 16761035,
	plum: 14524637,
	powderblue: 11591910,
	purple: 8388736,
	rebeccapurple: 6697881,
	red: 16711680,
	rosybrown: 12357519,
	royalblue: 4286945,
	saddlebrown: 9127187,
	salmon: 16416882,
	sandybrown: 16032864,
	seagreen: 3050327,
	seashell: 16774638,
	sienna: 10506797,
	silver: 12632256,
	skyblue: 8900331,
	slateblue: 6970061,
	slategray: 7372944,
	slategrey: 7372944,
	snow: 16775930,
	springgreen: 65407,
	steelblue: 4620980,
	tan: 13808780,
	teal: 32896,
	thistle: 14204888,
	tomato: 16737095,
	turquoise: 4251856,
	violet: 15631086,
	wheat: 16113331,
	white: 16777215,
	whitesmoke: 16119285,
	yellow: 16776960,
	yellowgreen: 10145074
};
_a(ya, La, {
	copy(e) {
		return Object.assign(new this.constructor(), this, e);
	},
	displayable() {
		return this.rgb().displayable();
	},
	hex: Na,
	formatHex: Na,
	formatHex8: Pa,
	formatHsl: Fa,
	formatRgb: Ia,
	toString: Ia
});
function Na() {
	return this.rgb().formatHex();
}
function Pa() {
	return this.rgb().formatHex8();
}
function Fa() {
	return Xa(this).formatHsl();
}
function Ia() {
	return this.rgb().formatRgb();
}
function La(e) {
	var t, n;
	return e = (e + "").trim().toLowerCase(), (t = Ta.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? Ra(t) : n === 3 ? new Ha(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? za(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? za(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Ea.exec(e)) ? new Ha(t[1], t[2], t[3], 1) : (t = Da.exec(e)) ? new Ha(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Oa.exec(e)) ? za(t[1], t[2], t[3], t[4]) : (t = ka.exec(e)) ? za(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Aa.exec(e)) ? Ya(t[1], t[2] / 100, t[3] / 100, 1) : (t = ja.exec(e)) ? Ya(t[1], t[2] / 100, t[3] / 100, t[4]) : Ma.hasOwnProperty(e) ? Ra(Ma[e]) : e === "transparent" ? new Ha(NaN, NaN, NaN, 0) : null;
}
function Ra(e) {
	return new Ha(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function za(e, t, n, r) {
	return r <= 0 && (e = t = n = NaN), new Ha(e, t, n, r);
}
function Ba(e) {
	return e instanceof ya || (e = La(e)), e ? (e = e.rgb(), new Ha(e.r, e.g, e.b, e.opacity)) : new Ha();
}
function Va(e, t, n, r) {
	return arguments.length === 1 ? Ba(e) : new Ha(e, t, n, r ?? 1);
}
function Ha(e, t, n, r) {
	this.r = +e, this.g = +t, this.b = +n, this.opacity = +r;
}
_a(Ha, Va, va(ya, {
	brighter(e) {
		return e = e == null ? xa : xa ** +e, new Ha(this.r * e, this.g * e, this.b * e, this.opacity);
	},
	darker(e) {
		return e = e == null ? ba : ba ** +e, new Ha(this.r * e, this.g * e, this.b * e, this.opacity);
	},
	rgb() {
		return this;
	},
	clamp() {
		return new Ha(qa(this.r), qa(this.g), qa(this.b), Ka(this.opacity));
	},
	displayable() {
		return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
	},
	hex: Ua,
	formatHex: Ua,
	formatHex8: Wa,
	formatRgb: Ga,
	toString: Ga
}));
function Ua() {
	return `#${Ja(this.r)}${Ja(this.g)}${Ja(this.b)}`;
}
function Wa() {
	return `#${Ja(this.r)}${Ja(this.g)}${Ja(this.b)}${Ja((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Ga() {
	let e = Ka(this.opacity);
	return `${e === 1 ? "rgb(" : "rgba("}${qa(this.r)}, ${qa(this.g)}, ${qa(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Ka(e) {
	return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function qa(e) {
	return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Ja(e) {
	return e = qa(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Ya(e, t, n, r) {
	return r <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Qa(e, t, n, r);
}
function Xa(e) {
	if (e instanceof Qa) return new Qa(e.h, e.s, e.l, e.opacity);
	if (e instanceof ya || (e = La(e)), !e) return new Qa();
	if (e instanceof Qa) return e;
	e = e.rgb();
	var t = e.r / 255, n = e.g / 255, r = e.b / 255, i = Math.min(t, n, r), a = Math.max(t, n, r), o = NaN, s = a - i, c = (a + i) / 2;
	return s ? (o = t === a ? (n - r) / s + (n < r) * 6 : n === a ? (r - t) / s + 2 : (t - n) / s + 4, s /= c < .5 ? a + i : 2 - a - i, o *= 60) : s = c > 0 && c < 1 ? 0 : o, new Qa(o, s, c, e.opacity);
}
function Za(e, t, n, r) {
	return arguments.length === 1 ? Xa(e) : new Qa(e, t, n, r ?? 1);
}
function Qa(e, t, n, r) {
	this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
}
_a(Qa, Za, va(ya, {
	brighter(e) {
		return e = e == null ? xa : xa ** +e, new Qa(this.h, this.s, this.l * e, this.opacity);
	},
	darker(e) {
		return e = e == null ? ba : ba ** +e, new Qa(this.h, this.s, this.l * e, this.opacity);
	},
	rgb() {
		var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < .5 ? n : 1 - n) * t, i = 2 * n - r;
		return new Ha(to(e >= 240 ? e - 240 : e + 120, i, r), to(e, i, r), to(e < 120 ? e + 240 : e - 120, i, r), this.opacity);
	},
	clamp() {
		return new Qa($a(this.h), eo(this.s), eo(this.l), Ka(this.opacity));
	},
	displayable() {
		return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
	},
	formatHsl() {
		let e = Ka(this.opacity);
		return `${e === 1 ? "hsl(" : "hsla("}${$a(this.h)}, ${eo(this.s) * 100}%, ${eo(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
	}
}));
function $a(e) {
	return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function eo(e) {
	return Math.max(0, Math.min(1, e || 0));
}
function to(e, t, n) {
	return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/constant.js
var no = (e) => () => e;
// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/color.js
function ro(e, t) {
	return function(n) {
		return e + n * t;
	};
}
function io(e, t, n) {
	return e **= +n, t = t ** +n - e, n = 1 / n, function(r) {
		return (e + r * t) ** +n;
	};
}
function ao(e) {
	return (e = +e) == 1 ? oo : function(t, n) {
		return n - t ? io(t, n, e) : no(isNaN(t) ? n : t);
	};
}
function oo(e, t) {
	var n = t - e;
	return n ? ro(e, n) : no(isNaN(e) ? t : e);
}
// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/rgb.js
var so = (function e(t) {
	var n = ao(t);
	function r(e, t) {
		var r = n((e = Va(e)).r, (t = Va(t)).r), i = n(e.g, t.g), a = n(e.b, t.b), o = oo(e.opacity, t.opacity);
		return function(t) {
			return e.r = r(t), e.g = i(t), e.b = a(t), e.opacity = o(t), e + "";
		};
	}
	return r.gamma = e, r;
})(1);
// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/numberArray.js
function co(e, t) {
	t ||= [];
	var n = e ? Math.min(t.length, e.length) : 0, r = t.slice(), i;
	return function(a) {
		for (i = 0; i < n; ++i) r[i] = e[i] * (1 - a) + t[i] * a;
		return r;
	};
}
function lo(e) {
	return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/array.js
function uo(e, t) {
	for (var n = t ? t.length : 0, r = e ? Math.min(n, e.length) : 0, i = Array(r), a = Array(n), o = 0; o < r; ++o) i[o] = bo(e[o], t[o]);
	for (; o < n; ++o) a[o] = t[o];
	return function(e) {
		for (o = 0; o < r; ++o) a[o] = i[o](e);
		return a;
	};
}
// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/date.js
function fo(e, t) {
	var n = /* @__PURE__ */ new Date();
	return e = +e, t = +t, function(r) {
		return n.setTime(e * (1 - r) + t * r), n;
	};
}
// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/number.js
function po(e, t) {
	return e = +e, t = +t, function(n) {
		return e * (1 - n) + t * n;
	};
}
// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/object.js
function mo(e, t) {
	var n = {}, r = {}, i;
	for (i in typeof e == "object" && e || (e = {}), typeof t == "object" && t || (t = {}), t) i in e ? n[i] = bo(e[i], t[i]) : r[i] = t[i];
	return function(e) {
		for (i in n) r[i] = n[i](e);
		return r;
	};
}
// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/string.js
var ho = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, go = new RegExp(ho.source, "g");
function _o(e) {
	return function() {
		return e;
	};
}
function vo(e) {
	return function(t) {
		return e(t) + "";
	};
}
function yo(e, t) {
	var n = ho.lastIndex = go.lastIndex = 0, r, i, a, o = -1, s = [], c = [];
	for (e += "", t += ""; (r = ho.exec(e)) && (i = go.exec(t));) (a = i.index) > n && (a = t.slice(n, a), s[o] ? s[o] += a : s[++o] = a), (r = r[0]) === (i = i[0]) ? s[o] ? s[o] += i : s[++o] = i : (s[++o] = null, c.push({
		i: o,
		x: po(r, i)
	})), n = go.lastIndex;
	return n < t.length && (a = t.slice(n), s[o] ? s[o] += a : s[++o] = a), s.length < 2 ? c[0] ? vo(c[0].x) : _o(t) : (t = c.length, function(e) {
		for (var n = 0, r; n < t; ++n) s[(r = c[n]).i] = r.x(e);
		return s.join("");
	});
}
// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/value.js
function bo(e, t) {
	var n = typeof t, r;
	return t == null || n === "boolean" ? no(t) : (n === "number" ? po : n === "string" ? (r = La(t)) ? (t = r, so) : yo : t instanceof La ? so : t instanceof Date ? fo : lo(t) ? co : Array.isArray(t) ? uo : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? mo : po)(e, t);
}
// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/round.js
function xo(e, t) {
	return e = +e, t = +t, function(n) {
		return Math.round(e * (1 - n) + t * n);
	};
}
// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/transform/decompose.js
var So = 180 / Math.PI, Co = {
	translateX: 0,
	translateY: 0,
	rotate: 0,
	skewX: 0,
	scaleX: 1,
	scaleY: 1
};
function wo(e, t, n, r, i, a) {
	var o, s, c;
	return (o = Math.sqrt(e * e + t * t)) && (e /= o, t /= o), (c = e * n + t * r) && (n -= e * c, r -= t * c), (s = Math.sqrt(n * n + r * r)) && (n /= s, r /= s, c /= s), e * r < t * n && (e = -e, t = -t, c = -c, o = -o), {
		translateX: i,
		translateY: a,
		rotate: Math.atan2(t, e) * So,
		skewX: Math.atan(c) * So,
		scaleX: o,
		scaleY: s
	};
}
// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/transform/parse.js
var To;
function Eo(e) {
	let t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
	return t.isIdentity ? Co : wo(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Do(e) {
	return e == null || (To ||= document.createElementNS("http://www.w3.org/2000/svg", "g"), To.setAttribute("transform", e), !(e = To.transform.baseVal.consolidate())) ? Co : (e = e.matrix, wo(e.a, e.b, e.c, e.d, e.e, e.f));
}
// node_modules/.pnpm/d3-interpolate@3.0.1/node_modules/d3-interpolate/src/transform/index.js
function Oo(e, t, n, r) {
	function i(e) {
		return e.length ? e.pop() + " " : "";
	}
	function a(e, r, i, a, o, s) {
		if (e !== i || r !== a) {
			var c = o.push("translate(", null, t, null, n);
			s.push({
				i: c - 4,
				x: po(e, i)
			}, {
				i: c - 2,
				x: po(r, a)
			});
		} else (i || a) && o.push("translate(" + i + t + a + n);
	}
	function o(e, t, n, a) {
		e === t ? t && n.push(i(n) + "rotate(" + t + r) : (e - t > 180 ? t += 360 : t - e > 180 && (e += 360), a.push({
			i: n.push(i(n) + "rotate(", null, r) - 2,
			x: po(e, t)
		}));
	}
	function s(e, t, n, a) {
		e === t ? t && n.push(i(n) + "skewX(" + t + r) : a.push({
			i: n.push(i(n) + "skewX(", null, r) - 2,
			x: po(e, t)
		});
	}
	function c(e, t, n, r, a, o) {
		if (e !== n || t !== r) {
			var s = a.push(i(a) + "scale(", null, ",", null, ")");
			o.push({
				i: s - 4,
				x: po(e, n)
			}, {
				i: s - 2,
				x: po(t, r)
			});
		} else (n !== 1 || r !== 1) && a.push(i(a) + "scale(" + n + "," + r + ")");
	}
	return function(t, n) {
		var r = [], i = [];
		return t = e(t), n = e(n), a(t.translateX, t.translateY, n.translateX, n.translateY, r, i), o(t.rotate, n.rotate, r, i), s(t.skewX, n.skewX, r, i), c(t.scaleX, t.scaleY, n.scaleX, n.scaleY, r, i), t = n = null, function(e) {
			for (var t = -1, n = i.length, a; ++t < n;) r[(a = i[t]).i] = a.x(e);
			return r.join("");
		};
	};
}
var ko = Oo(Eo, "px, ", "px)", "deg)"), Ao = Oo(Do, ", ", ")", ")"), jo = 1e-12;
function Mo(e) {
	return ((e = Math.exp(e)) + 1 / e) / 2;
}
function No(e) {
	return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Po(e) {
	return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
var Fo = (function e(t, n, r) {
	function i(e, i) {
		var a = e[0], o = e[1], s = e[2], c = i[0], l = i[1], u = i[2], d = c - a, f = l - o, p = d * d + f * f, m, h;
		if (p < jo) h = Math.log(u / s) / t, m = function(e) {
			return [
				a + e * d,
				o + e * f,
				s * Math.exp(t * e * h)
			];
		};
		else {
			var g = Math.sqrt(p), _ = (u * u - s * s + r * p) / (2 * s * n * g), v = (u * u - s * s - r * p) / (2 * u * n * g), y = Math.log(Math.sqrt(_ * _ + 1) - _);
			h = (Math.log(Math.sqrt(v * v + 1) - v) - y) / t, m = function(e) {
				var r = e * h, i = Mo(y), c = s / (n * g) * (i * Po(t * r + y) - No(y));
				return [
					a + c * d,
					o + c * f,
					s * i / Mo(t * r + y)
				];
			};
		}
		return m.duration = h * 1e3 * t / Math.SQRT2, m;
	}
	return i.rho = function(t) {
		var n = Math.max(.001, +t), r = n * n;
		return e(n, r, r * r);
	}, i;
})(Math.SQRT2, 2, 4), Io = 0, Lo = 0, Ro = 0, zo = 1e3, Bo, Vo, Ho = 0, Uo = 0, Wo = 0, Go = typeof performance == "object" && performance.now ? performance : Date, Ko = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
	setTimeout(e, 17);
};
function qo() {
	return Uo ||= (Ko(Jo), Go.now() + Wo);
}
function Jo() {
	Uo = 0;
}
function Yo() {
	this._call = this._time = this._next = null;
}
Yo.prototype = Xo.prototype = {
	constructor: Yo,
	restart: function(e, t, n) {
		if (typeof e != "function") throw TypeError("callback is not a function");
		n = (n == null ? qo() : +n) + (t == null ? 0 : +t), !this._next && Vo !== this && (Vo ? Vo._next = this : Bo = this, Vo = this), this._call = e, this._time = n, ts();
	},
	stop: function() {
		this._call && (this._call = null, this._time = Infinity, ts());
	}
};
function Xo(e, t, n) {
	var r = new Yo();
	return r.restart(e, t, n), r;
}
function Zo() {
	qo(), ++Io;
	for (var e = Bo, t; e;) (t = Uo - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
	--Io;
}
function Qo() {
	Uo = (Ho = Go.now()) + Wo, Io = Lo = 0;
	try {
		Zo();
	} finally {
		Io = 0, es(), Uo = 0;
	}
}
function $o() {
	var e = Go.now(), t = e - Ho;
	t > zo && (Wo -= t, Ho = e);
}
function es() {
	for (var e, t = Bo, n, r = Infinity; t;) t._call ? (r > t._time && (r = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : Bo = n);
	Vo = e, ts(r);
}
function ts(e) {
	Io || (Lo &&= clearTimeout(Lo), e - Uo > 24 ? (e < Infinity && (Lo = setTimeout(Qo, e - Go.now() - Wo)), Ro &&= clearInterval(Ro)) : (Ro ||= (Ho = Go.now(), setInterval($o, zo)), Io = 1, Ko(Qo)));
}
// node_modules/.pnpm/d3-timer@3.0.1/node_modules/d3-timer/src/timeout.js
function ns(e, t, n) {
	var r = new Yo();
	return t = t == null ? 0 : +t, r.restart((n) => {
		r.stop(), e(n + t);
	}, t, n), r;
}
// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/schedule.js
var rs = Gi("start", "end", "cancel", "interrupt"), is = [];
function as(e, t, n, r, i, a) {
	var o = e.__transition;
	if (!o) e.__transition = {};
	else if (n in o) return;
	ls(e, n, {
		name: t,
		index: r,
		group: i,
		on: rs,
		tween: is,
		time: a.time,
		delay: a.delay,
		duration: a.duration,
		ease: a.ease,
		timer: null,
		state: 0
	});
}
function os(e, t) {
	var n = cs(e, t);
	if (n.state > 0) throw Error("too late; already scheduled");
	return n;
}
function ss(e, t) {
	var n = cs(e, t);
	if (n.state > 3) throw Error("too late; already running");
	return n;
}
function cs(e, t) {
	var n = e.__transition;
	if (!n || !(n = n[t])) throw Error("transition not found");
	return n;
}
function ls(e, t, n) {
	var r = e.__transition, i;
	r[t] = n, n.timer = Xo(a, 0, n.time);
	function a(e) {
		n.state = 1, n.timer.restart(o, n.delay, n.time), n.delay <= e && o(e - n.delay);
	}
	function o(a) {
		var l, u, d, f;
		if (n.state !== 1) return c();
		for (l in r) if (f = r[l], f.name === n.name) {
			if (f.state === 3) return ns(o);
			f.state === 4 ? (f.state = 6, f.timer.stop(), f.on.call("interrupt", e, e.__data__, f.index, f.group), delete r[l]) : +l < t && (f.state = 6, f.timer.stop(), f.on.call("cancel", e, e.__data__, f.index, f.group), delete r[l]);
		}
		if (ns(function() {
			n.state === 3 && (n.state = 4, n.timer.restart(s, n.delay, n.time), s(a));
		}), n.state = 2, n.on.call("start", e, e.__data__, n.index, n.group), n.state === 2) {
			for (n.state = 3, i = Array(d = n.tween.length), l = 0, u = -1; l < d; ++l) (f = n.tween[l].value.call(e, e.__data__, n.index, n.group)) && (i[++u] = f);
			i.length = u + 1;
		}
	}
	function s(t) {
		for (var r = t < n.duration ? n.ease.call(null, t / n.duration) : (n.timer.restart(c), n.state = 5, 1), a = -1, o = i.length; ++a < o;) i[a].call(e, r);
		n.state === 5 && (n.on.call("end", e, e.__data__, n.index, n.group), c());
	}
	function c() {
		for (var i in n.state = 6, n.timer.stop(), delete r[t], r) return;
		delete e.__transition;
	}
}
// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/interrupt.js
function us(e, t) {
	var n = e.__transition, r, i, a = !0, o;
	if (n) {
		for (o in t = t == null ? null : t + "", n) (r = n[o]).name === t ? (i = r.state > 2 && r.state < 5, r.state = 6, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", e, e.__data__, r.index, r.group), delete n[o]) : a = !1;
		a && delete e.__transition;
	}
}
// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/selection/interrupt.js
function ds(e) {
	return this.each(function() {
		us(this, e);
	});
}
// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/tween.js
function fs(e, t) {
	var n, r;
	return function() {
		var i = ss(this, e), a = i.tween;
		if (a !== n) {
			r = n = a;
			for (var o = 0, s = r.length; o < s; ++o) if (r[o].name === t) {
				r = r.slice(), r.splice(o, 1);
				break;
			}
		}
		i.tween = r;
	};
}
function ps(e, t, n) {
	var r, i;
	if (typeof n != "function") throw Error();
	return function() {
		var a = ss(this, e), o = a.tween;
		if (o !== r) {
			i = (r = o).slice();
			for (var s = {
				name: t,
				value: n
			}, c = 0, l = i.length; c < l; ++c) if (i[c].name === t) {
				i[c] = s;
				break;
			}
			c === l && i.push(s);
		}
		a.tween = i;
	};
}
function ms(e, t) {
	var n = this._id;
	if (e += "", arguments.length < 2) {
		for (var r = cs(this.node(), n).tween, i = 0, a = r.length, o; i < a; ++i) if ((o = r[i]).name === e) return o.value;
		return null;
	}
	return this.each((t == null ? fs : ps)(n, e, t));
}
function hs(e, t, n) {
	var r = e._id;
	return e.each(function() {
		var e = ss(this, r);
		(e.value ||= {})[t] = n.apply(this, arguments);
	}), function(e) {
		return cs(e, r).value[t];
	};
}
// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/interpolate.js
function gs(e, t) {
	var n;
	return (typeof t == "number" ? po : t instanceof La ? so : (n = La(t)) ? (t = n, so) : yo)(e, t);
}
// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/attr.js
function _s(e) {
	return function() {
		this.removeAttribute(e);
	};
}
function vs(e) {
	return function() {
		this.removeAttributeNS(e.space, e.local);
	};
}
function ys(e, t, n) {
	var r, i = n + "", a;
	return function() {
		var o = this.getAttribute(e);
		return o === i ? null : o === r ? a : a = t(r = o, n);
	};
}
function bs(e, t, n) {
	var r, i = n + "", a;
	return function() {
		var o = this.getAttributeNS(e.space, e.local);
		return o === i ? null : o === r ? a : a = t(r = o, n);
	};
}
function xs(e, t, n) {
	var r, i, a;
	return function() {
		var o, s = n(this), c;
		return s == null ? void this.removeAttribute(e) : (o = this.getAttribute(e), c = s + "", o === c ? null : o === r && c === i ? a : (i = c, a = t(r = o, s)));
	};
}
function Ss(e, t, n) {
	var r, i, a;
	return function() {
		var o, s = n(this), c;
		return s == null ? void this.removeAttributeNS(e.space, e.local) : (o = this.getAttributeNS(e.space, e.local), c = s + "", o === c ? null : o === r && c === i ? a : (i = c, a = t(r = o, s)));
	};
}
function Cs(e, t) {
	var n = Ze(e), r = n === "transform" ? Ao : gs;
	return this.attrTween(e, typeof t == "function" ? (n.local ? Ss : xs)(n, r, hs(this, "attr." + e, t)) : t == null ? (n.local ? vs : _s)(n) : (n.local ? bs : ys)(n, r, t));
}
// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/attrTween.js
function ws(e, t) {
	return function(n) {
		this.setAttribute(e, t.call(this, n));
	};
}
function Ts(e, t) {
	return function(n) {
		this.setAttributeNS(e.space, e.local, t.call(this, n));
	};
}
function Es(e, t) {
	var n, r;
	function i() {
		var i = t.apply(this, arguments);
		return i !== r && (n = (r = i) && Ts(e, i)), n;
	}
	return i._value = t, i;
}
function Ds(e, t) {
	var n, r;
	function i() {
		var i = t.apply(this, arguments);
		return i !== r && (n = (r = i) && ws(e, i)), n;
	}
	return i._value = t, i;
}
function Os(e, t) {
	var n = "attr." + e;
	if (arguments.length < 2) return (n = this.tween(n)) && n._value;
	if (t == null) return this.tween(n, null);
	if (typeof t != "function") throw Error();
	var r = Ze(e);
	return this.tween(n, (r.local ? Es : Ds)(r, t));
}
// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/delay.js
function ks(e, t) {
	return function() {
		os(this, e).delay = +t.apply(this, arguments);
	};
}
function As(e, t) {
	return t = +t, function() {
		os(this, e).delay = t;
	};
}
function js(e) {
	var t = this._id;
	return arguments.length ? this.each((typeof e == "function" ? ks : As)(t, e)) : cs(this.node(), t).delay;
}
// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/duration.js
function Ms(e, t) {
	return function() {
		ss(this, e).duration = +t.apply(this, arguments);
	};
}
function Ns(e, t) {
	return t = +t, function() {
		ss(this, e).duration = t;
	};
}
function Ps(e) {
	var t = this._id;
	return arguments.length ? this.each((typeof e == "function" ? Ms : Ns)(t, e)) : cs(this.node(), t).duration;
}
// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/ease.js
function Fs(e, t) {
	if (typeof t != "function") throw Error();
	return function() {
		ss(this, e).ease = t;
	};
}
function Is(e) {
	var t = this._id;
	return arguments.length ? this.each(Fs(t, e)) : cs(this.node(), t).ease;
}
// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/easeVarying.js
function Ls(e, t) {
	return function() {
		var n = t.apply(this, arguments);
		if (typeof n != "function") throw Error();
		ss(this, e).ease = n;
	};
}
function Rs(e) {
	if (typeof e != "function") throw Error();
	return this.each(Ls(this._id, e));
}
// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/filter.js
function zs(e) {
	typeof e != "function" && (e = lt(e));
	for (var t = this._groups, n = t.length, r = Array(n), i = 0; i < n; ++i) for (var a = t[i], o = a.length, s = r[i] = [], c, l = 0; l < o; ++l) (c = a[l]) && e.call(c, c.__data__, l, a) && s.push(c);
	return new mc(r, this._parents, this._name, this._id);
}
// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/merge.js
function Bs(e) {
	if (e._id !== this._id) throw Error();
	for (var t = this._groups, n = e._groups, r = t.length, i = n.length, a = Math.min(r, i), o = Array(r), s = 0; s < a; ++s) for (var c = t[s], l = n[s], u = c.length, d = o[s] = Array(u), f, p = 0; p < u; ++p) (f = c[p] || l[p]) && (d[p] = f);
	for (; s < r; ++s) o[s] = t[s];
	return new mc(o, this._parents, this._name, this._id);
}
// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/on.js
function Vs(e) {
	return (e + "").trim().split(/^|\s+/).every(function(e) {
		var t = e.indexOf(".");
		return t >= 0 && (e = e.slice(0, t)), !e || e === "start";
	});
}
function Hs(e, t, n) {
	var r, i, a = Vs(t) ? os : ss;
	return function() {
		var o = a(this, e), s = o.on;
		s !== r && (i = (r = s).copy()).on(t, n), o.on = i;
	};
}
function Us(e, t) {
	var n = this._id;
	return arguments.length < 2 ? cs(this.node(), n).on.on(e) : this.each(Hs(n, e, t));
}
// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/remove.js
function Ws(e) {
	return function() {
		var t = this.parentNode;
		for (var n in this.__transition) if (+n !== e) return;
		t && t.removeChild(this);
	};
}
function Gs() {
	return this.on("end.remove", Ws(this._id));
}
// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/select.js
function Ks(e) {
	var t = this._name, n = this._id;
	typeof e != "function" && (e = nt(e));
	for (var r = this._groups, i = r.length, a = Array(i), o = 0; o < i; ++o) for (var s = r[o], c = s.length, l = a[o] = Array(c), u, d, f = 0; f < c; ++f) (u = s[f]) && (d = e.call(u, u.__data__, f, s)) && ("__data__" in u && (d.__data__ = u.__data__), l[f] = d, as(l[f], t, n, f, l, cs(u, n)));
	return new mc(a, this._parents, t, n);
}
// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/selectAll.js
function qs(e) {
	var t = this._name, n = this._id;
	typeof e != "function" && (e = ot(e));
	for (var r = this._groups, i = r.length, a = [], o = [], s = 0; s < i; ++s) for (var c = r[s], l = c.length, u, d = 0; d < l; ++d) if (u = c[d]) {
		for (var f = e.call(u, u.__data__, d, c), p, m = cs(u, n), h = 0, g = f.length; h < g; ++h) (p = f[h]) && as(p, t, n, h, f, m);
		a.push(f), o.push(u);
	}
	return new mc(a, o, t, n);
}
// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/selection.js
var Js = qn.prototype.constructor;
function Ys() {
	return new Js(this._groups, this._parents);
}
// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/style.js
function Xs(e, t) {
	var n, r, i;
	return function() {
		var a = $t(this, e), o = (this.style.removeProperty(e), $t(this, e));
		return a === o ? null : a === n && o === r ? i : i = t(n = a, r = o);
	};
}
function Zs(e) {
	return function() {
		this.style.removeProperty(e);
	};
}
function Qs(e, t, n) {
	var r, i = n + "", a;
	return function() {
		var o = $t(this, e);
		return o === i ? null : o === r ? a : a = t(r = o, n);
	};
}
function $s(e, t, n) {
	var r, i, a;
	return function() {
		var o = $t(this, e), s = n(this), c = s + "";
		return s ?? (c = s = (this.style.removeProperty(e), $t(this, e))), o === c ? null : o === r && c === i ? a : (i = c, a = t(r = o, s));
	};
}
function ec(e, t) {
	var n, r, i, a = "style." + t, o = "end." + a, s;
	return function() {
		var c = ss(this, e), l = c.on, u = c.value[a] == null ? s ||= Zs(t) : void 0;
		(l !== n || i !== u) && (r = (n = l).copy()).on(o, i = u), c.on = r;
	};
}
function tc(e, t, n) {
	var r = (e += "") == "transform" ? ko : gs;
	return t == null ? this.styleTween(e, Xs(e, r)).on("end.style." + e, Zs(e)) : typeof t == "function" ? this.styleTween(e, $s(e, r, hs(this, "style." + e, t))).each(ec(this._id, e)) : this.styleTween(e, Qs(e, r, t), n).on("end.style." + e, null);
}
// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/styleTween.js
function nc(e, t, n) {
	return function(r) {
		this.style.setProperty(e, t.call(this, r), n);
	};
}
function rc(e, t, n) {
	var r, i;
	function a() {
		var a = t.apply(this, arguments);
		return a !== i && (r = (i = a) && nc(e, a, n)), r;
	}
	return a._value = t, a;
}
function ic(e, t, n) {
	var r = "style." + (e += "");
	if (arguments.length < 2) return (r = this.tween(r)) && r._value;
	if (t == null) return this.tween(r, null);
	if (typeof t != "function") throw Error();
	return this.tween(r, rc(e, t, n ?? ""));
}
// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/text.js
function ac(e) {
	return function() {
		this.textContent = e;
	};
}
function oc(e) {
	return function() {
		var t = e(this);
		this.textContent = t ?? "";
	};
}
function sc(e) {
	return this.tween("text", typeof e == "function" ? oc(hs(this, "text", e)) : ac(e == null ? "" : e + ""));
}
// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/textTween.js
function cc(e) {
	return function(t) {
		this.textContent = e.call(this, t);
	};
}
function lc(e) {
	var t, n;
	function r() {
		var r = e.apply(this, arguments);
		return r !== n && (t = (n = r) && cc(r)), t;
	}
	return r._value = e, r;
}
function uc(e) {
	var t = "text";
	if (arguments.length < 1) return (t = this.tween(t)) && t._value;
	if (e == null) return this.tween(t, null);
	if (typeof e != "function") throw Error();
	return this.tween(t, lc(e));
}
// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/transition.js
function dc() {
	for (var e = this._name, t = this._id, n = gc(), r = this._groups, i = r.length, a = 0; a < i; ++a) for (var o = r[a], s = o.length, c, l = 0; l < s; ++l) if (c = o[l]) {
		var u = cs(c, t);
		as(c, e, n, l, o, {
			time: u.time + u.delay + u.duration,
			delay: 0,
			duration: u.duration,
			ease: u.ease
		});
	}
	return new mc(r, this._parents, e, n);
}
// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/end.js
function fc() {
	var e, t, n = this, r = n._id, i = n.size();
	return new Promise(function(a, o) {
		var s = { value: o }, c = { value: function() {
			--i === 0 && a();
		} };
		n.each(function() {
			var n = ss(this, r), i = n.on;
			i !== e && (t = (e = i).copy(), t._.cancel.push(s), t._.interrupt.push(s), t._.end.push(c)), n.on = t;
		}), i === 0 && a();
	});
}
// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/transition/index.js
var pc = 0;
function mc(e, t, n, r) {
	this._groups = e, this._parents = t, this._name = n, this._id = r;
}
function hc(e) {
	return qn().transition(e);
}
function gc() {
	return ++pc;
}
var _c = qn.prototype;
mc.prototype = hc.prototype = {
	constructor: mc,
	select: Ks,
	selectAll: qs,
	selectChild: _c.selectChild,
	selectChildren: _c.selectChildren,
	filter: zs,
	merge: Bs,
	selection: Ys,
	transition: dc,
	call: _c.call,
	nodes: _c.nodes,
	node: _c.node,
	size: _c.size,
	empty: _c.empty,
	each: _c.each,
	on: Us,
	attr: Cs,
	attrTween: Os,
	style: tc,
	styleTween: ic,
	text: sc,
	textTween: uc,
	remove: Gs,
	tween: ms,
	delay: js,
	duration: Ps,
	ease: Is,
	easeVarying: Rs,
	end: fc,
	[Symbol.iterator]: _c[Symbol.iterator]
};
// node_modules/.pnpm/d3-ease@3.0.1/node_modules/d3-ease/src/cubic.js
function vc(e) {
	return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
// node_modules/.pnpm/d3-transition@3.0.1_d3-selection@3.0.0/node_modules/d3-transition/src/selection/transition.js
var yc = {
	time: null,
	delay: 0,
	duration: 250,
	ease: vc
};
function bc(e, t) {
	for (var n; !(n = e.__transition) || !(n = n[t]);) if (!(e = e.parentNode)) throw Error(`transition ${t} not found`);
	return n;
}
function xc(e) {
	var t, n;
	e instanceof mc ? (t = e._id, e = e._name) : (t = gc(), (n = yc).time = qo(), e = e == null ? null : e + "");
	for (var r = this._groups, i = r.length, a = 0; a < i; ++a) for (var o = r[a], s = o.length, c, l = 0; l < s; ++l) (c = o[l]) && as(c, e, t, l, o, n || bc(c, t));
	return new mc(r, this._parents, e, t);
}
qn.prototype.interrupt = ds, qn.prototype.transition = xc;
// node_modules/.pnpm/d3-brush@3.0.0/node_modules/d3-brush/src/constant.js
var Sc = (e) => () => e;
// node_modules/.pnpm/d3-brush@3.0.0/node_modules/d3-brush/src/event.js
function Cc(e, { sourceEvent: t, target: n, selection: r, mode: i, dispatch: a }) {
	Object.defineProperties(this, {
		type: {
			value: e,
			enumerable: !0,
			configurable: !0
		},
		sourceEvent: {
			value: t,
			enumerable: !0,
			configurable: !0
		},
		target: {
			value: n,
			enumerable: !0,
			configurable: !0
		},
		selection: {
			value: r,
			enumerable: !0,
			configurable: !0
		},
		mode: {
			value: i,
			enumerable: !0,
			configurable: !0
		},
		_: { value: a }
	});
}
// node_modules/.pnpm/d3-brush@3.0.0/node_modules/d3-brush/src/noevent.js
function wc(e) {
	e.stopImmediatePropagation();
}
function Tc(e) {
	e.preventDefault(), e.stopImmediatePropagation();
}
// node_modules/.pnpm/d3-brush@3.0.0/node_modules/d3-brush/src/brush.js
var Ec = { name: "drag" }, Dc = { name: "space" }, Oc = { name: "handle" }, kc = { name: "center" }, { abs: Ac, max: jc, min: Mc } = Math;
function Nc(e) {
	return [+e[0], +e[1]];
}
function Pc(e) {
	return [Nc(e[0]), Nc(e[1])];
}
var Fc = {
	name: "x",
	handles: ["w", "e"].map(Hc),
	input: function(e, t) {
		return e == null ? null : [[+e[0], t[0][1]], [+e[1], t[1][1]]];
	},
	output: function(e) {
		return e && [e[0][0], e[1][0]];
	}
}, Ic = {
	name: "y",
	handles: ["n", "s"].map(Hc),
	input: function(e, t) {
		return e == null ? null : [[t[0][0], +e[0]], [t[1][0], +e[1]]];
	},
	output: function(e) {
		return e && [e[0][1], e[1][1]];
	}
};
[
	"n",
	"w",
	"e",
	"s",
	"nw",
	"ne",
	"sw",
	"se"
].map(Hc);
var Lc = {
	overlay: "crosshair",
	selection: "move",
	n: "ns-resize",
	e: "ew-resize",
	s: "ns-resize",
	w: "ew-resize",
	nw: "nwse-resize",
	ne: "nesw-resize",
	se: "nwse-resize",
	sw: "nesw-resize"
}, Rc = {
	e: "w",
	w: "e",
	nw: "ne",
	ne: "nw",
	se: "sw",
	sw: "se"
}, zc = {
	n: "s",
	s: "n",
	nw: "sw",
	ne: "se",
	se: "ne",
	sw: "nw"
}, Bc = {
	overlay: 1,
	selection: 1,
	n: null,
	e: 1,
	s: null,
	w: -1,
	nw: -1,
	ne: 1,
	se: 1,
	sw: -1
}, Vc = {
	overlay: 1,
	selection: 1,
	n: -1,
	e: null,
	s: 1,
	w: null,
	nw: -1,
	ne: -1,
	se: 1,
	sw: 1
};
function Hc(e) {
	return { type: e };
}
function Uc(e) {
	return !e.ctrlKey && !e.button;
}
function Wc() {
	var e = this.ownerSVGElement || this;
	return e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
}
function Gc() {
	return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Kc(e) {
	for (; !e.__brush;) if (!(e = e.parentNode)) return;
	return e.__brush;
}
function qc(e) {
	return e[0][0] === e[1][0] || e[0][1] === e[1][1];
}
function Jc(e) {
	var t = e.__brush;
	return t ? t.dim.output(t.selection) : null;
}
function Yc() {
	return Zc(Fc);
}
function Xc() {
	return Zc(Ic);
}
function Zc(e) {
	var t = Wc, n = Uc, r = Gc, i = !0, a = Gi("start", "brush", "end"), o = 6, s;
	function c(t) {
		var n = t.property("__brush", h).selectAll(".overlay").data([Hc("overlay")]);
		n.enter().append("rect").attr("class", "overlay").attr("pointer-events", "all").attr("cursor", Lc.overlay).merge(n).each(function() {
			var e = Kc(this).extent;
			L(this).attr("x", e[0][0]).attr("y", e[0][1]).attr("width", e[1][0] - e[0][0]).attr("height", e[1][1] - e[0][1]);
		}), t.selectAll(".selection").data([Hc("selection")]).enter().append("rect").attr("class", "selection").attr("cursor", Lc.selection).attr("fill", "#777").attr("fill-opacity", .3).attr("stroke", "#fff").attr("shape-rendering", "crispEdges");
		var i = t.selectAll(".handle").data(e.handles, function(e) {
			return e.type;
		});
		i.exit().remove(), i.enter().append("rect").attr("class", function(e) {
			return "handle handle--" + e.type;
		}).attr("cursor", function(e) {
			return Lc[e.type];
		}), t.each(l).attr("fill", "none").attr("pointer-events", "all").on("mousedown.brush", f).filter(r).on("touchstart.brush", f).on("touchmove.brush", p).on("touchend.brush touchcancel.brush", m).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
	}
	c.move = function(t, n, r) {
		t.tween ? t.on("start.brush", function(e) {
			u(this, arguments).beforestart().start(e);
		}).on("interrupt.brush end.brush", function(e) {
			u(this, arguments).end(e);
		}).tween("brush", function() {
			var t = this, r = t.__brush, i = u(t, arguments), a = r.selection, o = e.input(typeof n == "function" ? n.apply(this, arguments) : n, r.extent), s = bo(a, o);
			function c(e) {
				r.selection = e === 1 && o === null ? null : s(e), l.call(t), i.brush();
			}
			return a !== null && o !== null ? c : c(1);
		}) : t.each(function() {
			var t = this, i = arguments, a = t.__brush, o = e.input(typeof n == "function" ? n.apply(t, i) : n, a.extent), s = u(t, i).beforestart();
			us(t), a.selection = o === null ? null : o, l.call(t), s.start(r).brush(r).end(r);
		});
	}, c.clear = function(e, t) {
		c.move(e, null, t);
	};
	function l() {
		var e = L(this), t = Kc(this).selection;
		t ? (e.selectAll(".selection").style("display", null).attr("x", t[0][0]).attr("y", t[0][1]).attr("width", t[1][0] - t[0][0]).attr("height", t[1][1] - t[0][1]), e.selectAll(".handle").style("display", null).attr("x", function(e) {
			return e.type[e.type.length - 1] === "e" ? t[1][0] - o / 2 : t[0][0] - o / 2;
		}).attr("y", function(e) {
			return e.type[0] === "s" ? t[1][1] - o / 2 : t[0][1] - o / 2;
		}).attr("width", function(e) {
			return e.type === "n" || e.type === "s" ? t[1][0] - t[0][0] + o : o;
		}).attr("height", function(e) {
			return e.type === "e" || e.type === "w" ? t[1][1] - t[0][1] + o : o;
		})) : e.selectAll(".selection,.handle").style("display", "none").attr("x", null).attr("y", null).attr("width", null).attr("height", null);
	}
	function u(e, t, n) {
		var r = e.__brush.emitter;
		return r && (!n || !r.clean) ? r : new d(e, t, n);
	}
	function d(e, t, n) {
		this.that = e, this.args = t, this.state = e.__brush, this.active = 0, this.clean = n;
	}
	d.prototype = {
		beforestart: function() {
			return ++this.active === 1 && (this.state.emitter = this, this.starting = !0), this;
		},
		start: function(e, t) {
			return this.starting ? (this.starting = !1, this.emit("start", e, t)) : this.emit("brush", e), this;
		},
		brush: function(e, t) {
			return this.emit("brush", e, t), this;
		},
		end: function(e, t) {
			return --this.active === 0 && (delete this.state.emitter, this.emit("end", e, t)), this;
		},
		emit: function(t, n, r) {
			var i = L(this.that).datum();
			a.call(t, this.that, new Cc(t, {
				sourceEvent: n,
				target: c,
				selection: e.output(this.state.selection),
				mode: r,
				dispatch: a
			}), i);
		}
	};
	function f(t) {
		if (s && !t.touches || !n.apply(this, arguments)) return;
		var r = this, a = t.target.__data__.type, o = (i && t.metaKey ? a = "overlay" : a) === "selection" ? Ec : i && t.altKey ? kc : Oc, c = e === Ic ? null : Bc[a], d = e === Fc ? null : Vc[a], f = Kc(r), p = f.extent, m = f.selection, h = p[0][0], g, _, v = p[0][1], y, b, x = p[1][0], S, C, w = p[1][1], T, E, D = 0, O = 0, k, A = c && d && i && t.shiftKey, j, M, N = Array.from(t.touches || [t], (e) => {
			let t = e.identifier;
			return e = Xn(e, r), e.point0 = e.slice(), e.identifier = t, e;
		});
		us(r);
		var ee = u(r, arguments, !0).beforestart();
		if (a === "overlay") {
			m && (k = !0);
			let n = [N[0], N[1] || N[0]];
			f.selection = m = [[g = e === Ic ? h : Mc(n[0][0], n[1][0]), y = e === Fc ? v : Mc(n[0][1], n[1][1])], [S = e === Ic ? x : jc(n[0][0], n[1][0]), T = e === Fc ? w : jc(n[0][1], n[1][1])]], N.length > 1 && ae(t);
		} else g = m[0][0], y = m[0][1], S = m[1][0], T = m[1][1];
		_ = g, b = y, C = S, E = T;
		var te = L(r).attr("pointer-events", "none"), ne = te.selectAll(".overlay").attr("cursor", Lc[a]);
		if (t.touches) ee.moved = ie, ee.ended = oe;
		else {
			var re = L(t.view).on("mousemove.brush", ie, !0).on("mouseup.brush", oe, !0);
			i && re.on("keydown.brush", se, !0).on("keyup.brush", ce, !0), ea(t.view);
		}
		l.call(r), ee.start(t, o.name);
		function ie(e) {
			for (let t of e.changedTouches || [e]) for (let e of N) e.identifier === t.identifier && (e.cur = Xn(t, r));
			if (A && !j && !M && N.length === 1) {
				let e = N[0];
				Ac(e.cur[0] - e[0]) > Ac(e.cur[1] - e[1]) ? M = !0 : j = !0;
			}
			for (let e of N) e.cur && (e[0] = e.cur[0], e[1] = e.cur[1]);
			k = !0, Tc(e), ae(e);
		}
		function ae(e) {
			let t = N[0], n = t.point0;
			var i;
			switch (D = t[0] - n[0], O = t[1] - n[1], o) {
				case Dc:
				case Ec:
					c && (D = jc(h - g, Mc(x - S, D)), _ = g + D, C = S + D), d && (O = jc(v - y, Mc(w - T, O)), b = y + O, E = T + O);
					break;
				case Oc:
					N[1] ? (c &&= (_ = jc(h, Mc(x, N[0][0])), C = jc(h, Mc(x, N[1][0])), 1), d &&= (b = jc(v, Mc(w, N[0][1])), E = jc(v, Mc(w, N[1][1])), 1)) : (c < 0 ? (D = jc(h - g, Mc(x - g, D)), _ = g + D, C = S) : c > 0 && (D = jc(h - S, Mc(x - S, D)), _ = g, C = S + D), d < 0 ? (O = jc(v - y, Mc(w - y, O)), b = y + O, E = T) : d > 0 && (O = jc(v - T, Mc(w - T, O)), b = y, E = T + O));
					break;
				case kc: c && (_ = jc(h, Mc(x, g - D * c)), C = jc(h, Mc(x, S + D * c))), d && (b = jc(v, Mc(w, y - O * d)), E = jc(v, Mc(w, T + O * d)));
			}
			C < _ && (c *= -1, i = g, g = S, S = i, i = _, _ = C, C = i, a in Rc && ne.attr("cursor", Lc[a = Rc[a]])), E < b && (d *= -1, i = y, y = T, T = i, i = b, b = E, E = i, a in zc && ne.attr("cursor", Lc[a = zc[a]])), f.selection && (m = f.selection), j && (_ = m[0][0], C = m[1][0]), M && (b = m[0][1], E = m[1][1]), (m[0][0] !== _ || m[0][1] !== b || m[1][0] !== C || m[1][1] !== E) && (f.selection = [[_, b], [C, E]], l.call(r), ee.brush(e, o.name));
		}
		function oe(e) {
			if (wc(e), e.touches) {
				if (e.touches.length) return;
				s && clearTimeout(s), s = setTimeout(function() {
					s = null;
				}, 500);
			} else ta(e.view, k), re.on("keydown.brush keyup.brush mousemove.brush mouseup.brush", null);
			te.attr("pointer-events", "all"), ne.attr("cursor", Lc.overlay), f.selection && (m = f.selection), qc(m) && (f.selection = null, l.call(r)), ee.end(e, o.name);
		}
		function se(e) {
			switch (e.keyCode) {
				case 16:
					A = c && d;
					break;
				case 18:
					o === Oc && (c && (S = C - D * c, g = _ + D * c), d && (T = E - O * d, y = b + O * d), o = kc, ae(e));
					break;
				case 32:
					(o === Oc || o === kc) && (c < 0 ? S = C - D : c > 0 && (g = _ - D), d < 0 ? T = E - O : d > 0 && (y = b - O), o = Dc, ne.attr("cursor", Lc.selection), ae(e));
					break;
				default: return;
			}
			Tc(e);
		}
		function ce(e) {
			switch (e.keyCode) {
				case 16:
					A && (j = M = A = !1, ae(e));
					break;
				case 18:
					o === kc && (c < 0 ? S = C : c > 0 && (g = _), d < 0 ? T = E : d > 0 && (y = b), o = Oc, ae(e));
					break;
				case 32:
					o === Dc && (e.altKey ? (c && (S = C - D * c, g = _ + D * c), d && (T = E - O * d, y = b + O * d), o = kc) : (c < 0 ? S = C : c > 0 && (g = _), d < 0 ? T = E : d > 0 && (y = b), o = Oc), ne.attr("cursor", Lc[a]), ae(e));
					break;
				default: return;
			}
			Tc(e);
		}
	}
	function p(e) {
		u(this, arguments).moved(e);
	}
	function m(e) {
		u(this, arguments).ended(e);
	}
	function h() {
		var n = this.__brush || { selection: null };
		return n.extent = Pc(t.apply(this, arguments)), n.dim = e, n;
	}
	return c.extent = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : Sc(Pc(e)), c) : t;
	}, c.filter = function(e) {
		return arguments.length ? (n = typeof e == "function" ? e : Sc(!!e), c) : n;
	}, c.touchable = function(e) {
		return arguments.length ? (r = typeof e == "function" ? e : Sc(!!e), c) : r;
	}, c.handleSize = function(e) {
		return arguments.length ? (o = +e, c) : o;
	}, c.keyModifiers = function(e) {
		return arguments.length ? (i = !!e, c) : i;
	}, c.on = function() {
		var e = a.on.apply(a, arguments);
		return e === a ? c : e;
	}, c;
}
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/module/util/brush.js
function Qc(e) {
	let { event: t, $el: n } = e, r = n.subchart.main || n.main, i;
	return t && t.type === "brush" ? i = t.selection : r && (i = r.select(".bb-brush").node()) && (i = Jc(i)), i;
}
function $c(e) {
	let t = Qc(e);
	return !t || t[0] === t[1];
}
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/ChartInternal/internals/domain.js
function el(e, t) {
	return t.map((t) => {
		let { values: n } = t, r = n[0], i = n[n.length - 1], a = r ? e.getXCacheKey?.(r.x) ?? r.x : "", o = i ? e.getXCacheKey?.(i.x) ?? i.x : "", s = e.getTargetType?.(t) ?? "";
		return `${t.id}:${s}:${e.state?.subchartSourceTypes?.[t.id] ?? ""}:${n.length}:${a}:${o}`;
	}).join("|");
}
function tl(e, t) {
	let n = e.data?.targets;
	if (!n) return !1;
	for (let e = 0; e < t.length; e++) {
		let r = t[e], i = n.find((e) => e.id === r.id);
		if (!i || i.values !== r.values) return !1;
	}
	return !0;
}
function nl(e, t) {
	D(t) && ((e.min === void 0 || t < e.min) && (e.min = t), (e.max === void 0 || t > e.max) && (e.max = t));
}
function rl(e, t) {
	for (let n = 0; n < t.length; n++) nl(e, t[n]);
}
function il(e, t) {
	let n = {
		min: void 0,
		max: void 0
	}, r = e.state.hasAxis;
	for (let i = 0; i < t.length; i++) {
		let a = t[i], o = e.isCandlestickType?.(a), s = !o && !!e.isSubchartSourceTypeOf?.(a, I.CANDLESTICK), { values: c } = a;
		for (let t = 0; t < c.length; t++) {
			let i = c[t], a = i.value;
			if (!(m(a) || a === null)) continue;
			let l = s ? e.getSubchartCandlestickShapeValue?.(i, !0) : void 0;
			_(l) ? a = l : a !== null && (o || s) && (a = Array.isArray(a) ? a.slice(0, 4) : [
				a.open,
				a.high,
				a.low,
				a.close
			]), Array.isArray(a) ? rl(n, a) : k(a) && "high" in a ? rl(n, Object.values(a)) : e.isBubbleZType?.(i) ? nl(n, r && e.getBubbleZData(a, "y")) : nl(n, a);
		}
	}
	return [n.min, n.max];
}
function al(e, t) {
	let n;
	for (let r = 0; r < e.length; r++) {
		let { values: i } = e[r];
		for (let e = 0; e < i.length; e++) {
			let { x: r } = i[e];
			D(r) && (n === void 0 || (t === "min" ? r < n : r > n)) && (n = r);
		}
	}
	return n;
}
var ol = {
	getYDomainMinMaxBoth(e) {
		let t = this, { axis: n, cache: r, config: i, state: a } = t, o = tl(t, e) ? `${Y.domainMinMax}_y_${el(t, e)}` : null, s = o && r.get(o);
		if (s && s.generation === a.dataGeneration) return s.value;
		let c = i.data_groups, l = t.mapToIds(e), u = Be(l), d;
		if (c.length > 0) {
			let r = t.getValuesAsIdKeyed(e), i = e.some((e) => e.values.some((e) => e.value < 0)), a = e.some((e) => e.values.some((e) => e.value > 0)), o = new Map(l.map((e) => [e, n.getId(e)])), s = {}, f = {};
			for (let e in r) s[e] = r[e].slice(), f[e] = r[e].slice();
			c.forEach((e) => {
				let t = e.filter((e) => u.has(e));
				if (t.length) {
					let e = t[0], n = o.get(e);
					s[e] && i && (s[e] = s[e].map((e) => e < 0 ? e : 0)), f[e] && a && (f[e] = f[e].map((e) => e > 0 ? e : 0)), t.filter((e, t) => t > 0).forEach((t) => {
						if (s[t]) {
							let r = o.get(t);
							s[t].forEach((t, a) => {
								let o = +t;
								r === n && !(i && o > 0) && (s[e][a] += o);
							});
						}
						if (f[t]) {
							let r = o.get(t);
							f[t].forEach((t, i) => {
								let o = +t;
								r === n && !(a && o < 0) && (f[e][i] += o);
							});
						}
					});
				}
			});
			let p = [], m = [];
			for (let e in s) p.push(je("min", s[e])), m.push(je("max", f[e]));
			d = [je("min", p), je("max", m)];
		} else d = il(t, e);
		return o && r.add(o, {
			generation: a.dataGeneration,
			value: d
		}), d;
	},
	isHiddenTargetWithYDomain(e) {
		let t = this;
		for (let n of t.state.hiddenTargetIds) if (t.axis.getId(n) === e) return !0;
		return !1;
	},
	getYDomain(e, t, n) {
		let r = this, { axis: i, config: a, scale: o } = r, s = `axis_${t}`;
		if (r.isStackNormalized() && e.filter((e) => i.getId(e.id) === t).map((e) => e.id).some((e) => r.isGrouped(e))) return [0, 100];
		let c = o?.[t] && o[t].type === "log", l = e.filter((e) => i.getId(e.id) === t), u = n ? r.filterByXDomain(l, n) : l;
		if (u.length === 0) return r.isHiddenTargetWithYDomain(t) ? o[t].domain() : t === "y2" ? o.y.domain() : r.getYDomain(e, "y2", n);
		let d = a[`${s}_min`], f = a[`${s}_max`], p = a[`${s}_center`], h = a[`${s}_inverted`], g = r.hasDataLabel() && a.axis_rotated, _ = r.hasDataLabel() && !a.axis_rotated, [v, b] = r.getYDomainMinMaxBoth(u), x = v, S = b, w = [
			I.BAR,
			I.BUBBLE,
			I.SCATTER,
			...Ge.Line
		].some((e) => {
			let t = e.indexOf("area") > -1 ? "area" : e;
			return r.hasType(e, u, !0) && a[`${t}_zerobased`];
		});
		x = m(d) ? d : m(f) ? x <= f ? x : f - 10 : x, S = m(f) ? f : m(d) ? d <= S ? S : d + 10 : S, isNaN(x) && (x = 0), isNaN(S) && (S = x), x === S && (x < 0 ? S = 0 : x = 0);
		let T = x >= 0 && S >= 0, E = x <= 0 && S <= 0;
		(m(d) && T || m(f) && E) && (w = !1), w && (T && (x = 0), E && (S = 0));
		let O = Math.abs(S - x), k = {
			top: O * .1,
			bottom: O * .1
		};
		if (y(p)) {
			let e = Math.max(Math.abs(x), Math.abs(S));
			S = p + e, x = p - e;
		}
		if (g) {
			let e = C(o.y.range()), t = r.getDataLabelLength(x, S, "width").map((t) => {
				let n = t / e;
				return isFinite(n) ? n : 0;
			});
			["bottom", "top"].forEach((e, n) => {
				k[e] += O * (t[n] / (1 - t[0] - t[1]));
			});
		} else if (_) {
			let e = r.getDataLabelLength(x, S, "height");
			["bottom", "top"].forEach((t, n) => {
				k[t] += r.convertPixelToScale("y", e[n], O);
			});
		}
		k = r.getResettedPadding(k);
		let A = a[`${s}_padding`];
		D(A) && ["bottom", "top"].forEach((e) => {
			k[e] = i.getPadding(A, e, k[e], O);
		}), w && (T && (k.bottom = x), E && (k.top = -S));
		let j = c ? [x, S].map((e) => e < 0 ? 0 : e) : [x - k.bottom, S + k.top];
		return h ? j.reverse() : j;
	},
	getXDomainMinMax(e, t) {
		let n = this, { cache: r, state: i } = n, a = n.config[`axis_x_${t}`], o = tl(n, e) ? `${Y.domainMinMax}_x_${t}_${el(n, e)}` : null, s = o && r.get(o), c = s?.generation === i.dataGeneration ? s.value : void 0;
		c === void 0 && (c = al(e, t), o && r.add(o, {
			generation: i.dataGeneration,
			value: c
		}));
		let l = k(a) ? a.value : a;
		return l = y(l) && n.axis?.isTimeSeries() ? Le.bind(this)(l) : l, k(a) && a.fit && (t === "min" && l < c || t === "max" && l > c) && (l = void 0), y(l) ? l : c;
	},
	getXDomainPadding(e, t) {
		let n = this, { axis: r, config: i } = n, a = i.axis_x_padding, o = r.isTimeSeries() && t, s = C(e), c;
		if (r.isCategorized() || o) c = 0;
		else if (n.hasType("bar")) {
			let e = n.getMaxDataCount();
			c = e > 1 ? s / (e - 1) / 2 : .5;
		} else c = n.getResettedPadding(s * .01);
		let { left: l = c, right: u = c } = _(a) ? {
			left: a,
			right: a
		} : a;
		if (a.unit === "px") {
			let e = Math.abs(s + s * .2);
			l = r.getPadding(a, "left", c, e), u = r.getPadding(a, "right", c, e);
		} else {
			let e = s + l + u;
			if (o && e) {
				let n = s / t / e;
				l = l / e / n, u = u / e / n;
			}
		}
		return {
			left: l,
			right: u
		};
	},
	getXDomain(e) {
		let t = this, { axis: n, config: r, scale: { x: i } } = t, a = r.axis_x_inverted, o = [t.getXDomainMinMax(e, "min"), t.getXDomainMinMax(e, "max")], [s = 0, c = 0] = o;
		if (i.type !== "log") {
			let e = n.isCategorized(), r = n.isTimeSeries(), i = t.getXDomainPadding(o), [a, l] = o;
			a - l === 0 && !e && (r ? (a = /* @__PURE__ */ new Date(a.getTime() * .5), l = /* @__PURE__ */ new Date(l.getTime() * 1.5)) : (a = a === 0 ? 1 : a * .5, l = l === 0 ? -1 : l * 1.5)), (a || a === 0) && (s = r ? new Date(a.getTime() - i.left) : a - i.left), (l || l === 0) && (c = r ? new Date(l.getTime() + i.right) : l + i.right);
		}
		return a ? [c, s] : [s, c];
	},
	updateXDomain(e, t, n, r, i) {
		let a = this, { config: o, org: s, scale: { x: c, subX: l } } = a, u = o.zoom_enabled;
		if (n && (c.domain(i || Ae(a.getXDomain(e), !o.axis_x_inverted)), s.xDomain = c.domain(), l.domain(c.domain()), a.brush?.scale(l)), t) {
			let e = i || !a.brush || $c(a) ? s.xDomain : Qc(a).map(l.invert);
			c.domain(e);
		}
		return (n || t) && u && a.zoom.updateScaleExtent(), r && c.domain(a.trimXDomain(c.orgDomain())), c.domain();
	},
	trimXDomain(e) {
		let t = this, n = t.config.axis_x_inverted, [r, i] = t.getZoomDomain();
		return (n ? e[0] >= r : e[0] <= r) && (e[1] = +e[1] + (r - e[0]), e[0] = r), (n ? e[1] <= i : e[1] >= i) && (e[0] = +e[0] - (e[1] - i), e[1] = i), e;
	},
	getZoomDomain(e = "zoom", t = !1) {
		let { config: n, scale: r, org: i } = this, [a, o] = t && r[e] ? r[e].domain() : i.xDomain;
		return e === "zoom" && (y(n.zoom_x_min) && (a = je("min", [a, n.zoom_x_min])), y(n.zoom_x_max) && (o = je("max", [o, n.zoom_x_max]))), [a, o];
	},
	getZoomDomainValue(e) {
		let { config: t, axis: n } = this;
		if (n.isCategorized() && Array.isArray(e)) {
			let n = t.axis_x_inverted;
			return e.map((e, t) => Number(e) + (t === 0 ? +n : +!n));
		}
		return e;
	},
	convertPixelToScale(e, t, n) {
		let { config: r, state: i } = this, a = r.axis_rotated, o;
		return o = e === "x" ? a ? "height" : "width" : a ? "width" : "height", n * (t / i[o]);
	},
	withinRange(e, t = [0, 0], n) {
		let r = this.config.axis_x_inverted, [i, a] = n;
		return Array.isArray(e) && (r ? e[1] : e[0]) < (r ? e[0] : e[1]) ? e.every((n, o) => (o === 0 ? r ? +n <= i : +n >= i : r ? +n >= a : +n <= a) && !e.every((e, n) => e === t[n])) : !1;
	}
};
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/ChartInternal/internals/format.js
function sl(e, t, n) {
	let { config: r } = e, i = `axis_${t}_tick_format`;
	return (r[i] ? r[i] : e.defaultValueFormat).call(e.api, n);
}
var cl = {
	yFormat(e) {
		return sl(this, "y", e);
	},
	y2Format(e) {
		return sl(this, "y2", e);
	},
	getDefaultValueFormat() {
		let e = this, { defaultArcValueFormat: t, yFormat: n, y2Format: r } = e, i = e.hasArcType(null, [
			"gauge",
			"polar",
			"radar"
		]);
		return function(a, o, s) {
			return (i ? t : e.axis && e.axis.getId(s) === "y2" ? r : n).call(e, a, o);
		};
	},
	defaultValueFormat(e) {
		return O(e) ? e.join("~") : m(e) ? +e : "";
	},
	defaultArcValueFormat(e, t) {
		return `${(t * 100).toFixed(1)}%`;
	},
	defaultPolarValueFormat(e) {
		return `${e}`;
	},
	dataLabelFormat(e) {
		let t = this, n = t.config.data_labels, r = (e) => {
			let t = e;
			return O(e) ? t = e.join("~") : k(e) && (t = Object.values(e).join("~")), t;
		}, i = r;
		return h(n.format) ? i = n.format : w(n.format) && (i = n.format[e] ? n.format[e] === !0 ? r : n.format[e] : () => ""), i.bind(t.api);
	}
}, ll = 10, ul = 750;
function dl(e) {
	let t = this, n = t.getDataById(e);
	return t.levelColor ? t.levelColor(n.values[0].value) : t.color(n);
}
function fl(e, t = !0) {
	let { config: n } = this, r = n.data_names[e] ?? e;
	return t && h(n.legend_format) && (r = n.legend_format(r, e === r ? void 0 : e)), r;
}
function pl(e, t) {
	if (!t || t.empty()) return;
	let n = e.$el.legend?.selectAll(`.${H.legendItem}`);
	n && !n.empty() && (t = n);
	let r = [];
	t.each(function(e) {
		r.push({
			id: e,
			node: this
		});
	});
	let i = Ve(r, (e) => e.id, (e) => e.node);
	e.cache.add(Y.legendItemMap, i);
}
function ml(e) {
	return e.changedTouches?.[0] || e.touches?.[0];
}
function hl(e, t, n) {
	let r = ml(n);
	e.state.legendTouch = r ? {
		id: t,
		x: r.clientX,
		y: r.clientY,
		moved: !1
	} : null;
}
function gl(e, t) {
	let n = e.state.legendTouch, r = n && ml(t);
	r && (n.moved = n.moved || Math.abs(r.clientX - n.x) > ll || Math.abs(r.clientY - n.y) > ll);
}
function _l(e, t, n) {
	gl(e, n);
	let r = e.state.legendTouch;
	return e.state.legendTouch = null, !!r && r.id === t && !r.moved;
}
function vl(e, t) {
	e.state.legendLastTouchClickId = t, e.state.legendLastTouchClickTime = Date.now();
}
function yl(e, t) {
	let { state: n } = e, r = n.legendLastTouchClickId === t && Date.now() - (n.legendLastTouchClickTime || 0) < ul;
	return r && (n.legendLastTouchClickId = null, n.legendLastTouchClickTime = 0), r;
}
function bl(e) {
	let t = e.config.interaction_inputType_touch?.preventDefault;
	return { passive: !(b(t) && t) && (!isNaN(t) && t || null) === null };
}
var xl = {
	initLegend() {
		let e = this, { config: t, $el: n } = e;
		e.legendItemTextBox = {}, e.state.legendHasRendered = !1, e.state.isCanvasMode ? t.legend_show ? e.updateHtmlLegend?.() : e.state.hiddenLegendIds = new Set(e.mapToIds(e.data.targets)) : t.legend_show ? (t.legend_contents_bindto || (n.legend = e.$el.svg.append("g").classed(H.legend, !0).attr("transform", e.getTranslate("legend"))), e.updateLegend()) : e.state.hiddenLegendIds = new Set(e.mapToIds(e.data.targets));
	},
	updateLegend(e, t, n) {
		let r = this, { config: i, state: a, scale: o, $el: s } = r, c = t || {
			withTransform: !1,
			withTransitionForTransform: !1,
			withTransition: !1
		};
		c.withTransition = be(c, "withTransition", !0), c.withTransitionForTransform = be(c, "withTransitionForTransform", !0), i.legend_contents_bindto && i.legend_contents_template ? r.updateLegendTemplate() : a.hasTreemap || r.updateLegendElement(e || r.mapToIds(r.data.targets), c), s.legend?.selectAll(`.${H.legendItem}`).classed(H.legendItemHidden, function(e) {
			let t = !r.isTargetToShow(e);
			return t && (this.style.opacity = null), t;
		}), r.updateScales(!1, !o.zoom), r.updateSvgSize(), r.transformAll(c.withTransitionForTransform, n), a.legendHasRendered = !0;
	},
	updateLegendTemplate() {
		let e = this, { config: t, $el: n } = e, r = L(t.legend_contents_bindto), i = t.legend_contents_template;
		if (!r.empty()) {
			let t = e.mapToIds(e.data.targets), a = [], o = "";
			t.forEach((t) => {
				let n = h(i) ? ve(i.call(e.api, t, e.color(t), e.api.data(t)[0].values)) : Ie(i, {
					COLOR: e.color(t),
					TITLE: t
				});
				n && (a.push(t), o += n);
			});
			let s = r.html(ve(o)).selectAll(function() {
				return this.children;
			}).data(a);
			e.setLegendItem(s), n.legend = r;
		}
	},
	updateSizeForLegend(e) {
		let t = this, { config: n, state: { isLegendTop: r, isLegendLeft: i, isLegendRight: a, isLegendInset: o, current: s } } = t, { width: c, height: l } = e, u = {
			top: r ? t.getCurrentPaddingByDirection("top") + n.legend_inset_y + 5.5 : s.height - l - t.getCurrentPaddingByDirection("bottom") - n.legend_inset_y,
			left: i ? t.getCurrentPaddingByDirection("left") + n.legend_inset_x + .5 : s.width - c - t.getCurrentPaddingByDirection("right") - n.legend_inset_x + .5
		};
		t.state.margin3 = {
			top: a ? 0 : o ? u.top : s.height - l,
			right: NaN,
			bottom: 0,
			left: a ? s.width - c : o ? u.left : 0
		};
	},
	transformLegend(e) {
		let t = this, { $el: { legend: n }, $T: r } = t;
		r(n, e).attr("transform", t.getTranslate("legend"));
	},
	updateLegendItemColor(e, t) {
		let n = this, { legend: r } = n.$el;
		if (r) {
			let r = n.getLegendItemById(e);
			r && L(r).select("line").style("stroke", t);
		}
	},
	getLegendWidth() {
		let e = this, { current: { width: t }, isLegendRight: n, isLegendInset: r, legendItemWidth: i, legendStep: a } = e.state;
		return e.config.legend_show ? n || r ? i * (a + 1) : t : 0;
	},
	getLegendHeight() {
		let e = this, { current: t, isLegendRight: n, legendItemHeight: r, legendStep: i } = e.state;
		return e.config.legend_show ? n ? t.height : Math.max(e.config.padding?.mode === "fit" ? 10 : 20, r) * (i + 1) : 0;
	},
	opacityForUnfocusedLegend(e) {
		return e.classed(H.legendItemHidden) ? null : "0.3";
	},
	toggleFocusLegend(e, t) {
		let n = this, { $el: { legend: r }, $T: i } = n, a = n.mapToTargetIds(e);
		r && i(r.selectAll(`.${H.legendItem}`).filter((e) => a.indexOf(e) >= 0).classed(U.legendItemFocused, t)).style("opacity", function() {
			return t ? null : n.opacityForUnfocusedLegend.call(n, L(this));
		});
	},
	revertLegend() {
		let { $el: { legend: e }, $T: t } = this;
		e && t(e.selectAll(`.${H.legendItem}`).classed(U.legendItemFocused, !1)).style("opacity", null);
	},
	showLegend(e) {
		let t = this, { config: n, $el: r, $T: i } = t;
		n.legend_show || (n.legend_show = !0, r.legend ? r.legend.style("visibility", null) : t.initLegend(), !t.state.legendHasRendered && t.updateLegend()), t.removeHiddenLegendIds(e), i(r.legend.selectAll(t.selectorLegends(e)).style("visibility", null)).style("opacity", null);
	},
	hideLegend(e) {
		let t = this, { config: n, $el: { legend: r } } = t;
		n.legend_show && E(e) && (n.legend_show = !1, r?.style("visibility", "hidden")), t.addHiddenLegendIds(e), r?.selectAll(t.selectorLegends(e)).style("opacity", "0").style("visibility", "hidden");
	},
	getLegendItemTextBox(e, t) {
		let n = this, { cache: r, state: i } = n, a, o = Y.legendItemTextBox;
		return e && (a = !i.redrawing && r.get(o) || {}, a[e] || (a[e] = n.getTextRect(t, H.legendItem), r.add(o, a)), a = a[e]), a;
	},
	setLegendItem(e) {
		let t = this, { $el: n, api: r, config: i, state: a } = t, o = a.inputType === "touch", s = t.hasType("gauge"), c = i.boost_useCssRule, l = i.legend_item_interaction, u = l.dblclick ? "dblclick" : "click", d = l || h(i.legend_item_onclick), f = o ? bl(t) : void 0, p = function(e, n) {
			if (!P(i.legend_item_onclick, r, n, !a.hiddenTargetIds.has(n))) {
				let { altKey: t, type: i } = e, o = L(this);
				i === "dblclick" || t ? a.hiddenTargetIds.size && !o.classed(H.legendItemHidden) ? r.show() : (r.hide(), r.show(n)) : (r.toggle(n), o.classed(U.legendItemFocused, !1));
			}
			o && (t.hideTooltip(), t.hideGridFocus?.(!0));
		};
		e.attr("class", function(e) {
			let n = L(this);
			return (!n.empty() && n.attr("class") || "") + t.generateClass(H.legendItem, e);
		}).style("visibility", (e) => t.isLegendToShow(e) ? null : "hidden"), i.interaction_enabled && (c && [
			[`.${H.legendItem}`, "cursor:pointer"],
			[`.${H.legendItem} text`, "pointer-events:none"],
			[`.${H.legendItemPoint} text`, "pointer-events:none"],
			[`.${H.legendItemTile}`, "pointer-events:none"],
			[`.${H.legendItemEvent}`, "fill-opacity:0"]
		].forEach((e) => {
			let [r, i] = e;
			t.setCssRule(!1, r, [i])(n.legend);
		}), e.on(u, d ? function(e, n) {
			o && e.type === "click" && yl(t, n) || p.call(this, e, n);
		} : null), o && u === "click" && d && e.on("touchstart", function(e, n) {
			hl(t, n, e);
		}, f).on("touchmove", (e) => {
			gl(t, e);
		}, f).on("touchend", function(e, n) {
			_l(t, n, e) && (vl(t, n), p.call(this, e, n));
		}, f), !o && e.on("mouseout", l || h(i.legend_item_onout) ? function(e, n) {
			P(i.legend_item_onout, r, n, !a.hiddenTargetIds.has(n)) || (L(this).classed(U.legendItemFocused, !1), s && t.undoMarkOverlapped(t, `.${Er.gaugeValue}`), t.api.revert());
		} : null).on("mouseover", l || h(i.legend_item_onover) ? function(e, n) {
			P(i.legend_item_onover, r, n, !a.hiddenTargetIds.has(n)) || (L(this).classed(U.legendItemFocused, !0), s && t.markOverlapped(n, t, `.${Er.gaugeValue}`), !a.transiting && t.isTargetToShow(n) && r.focus(n));
		} : null), !e.empty() && e.on("click mouseout mouseover") && e.style("cursor", t.getStylePropValue("pointer"))), pl(t, e);
	},
	getLegendItemById(e) {
		let t = this, n = t.cache.get(Y.legendItemMap);
		return n && n instanceof Map ? n.get(e) || null : (t.$el.legend?.selectAll(`.${H.legendItem}`).filter((t) => t === e))?.node() || null;
	},
	updateLegendElement(e, t) {
		let n = this, { config: r, state: i, $el: { legend: a }, $T: o } = n, s = r.legend_item_tile_type !== "circle", c = r.legend_item_tile_r, l = {
			width: s ? r.legend_item_tile_width : c * 2,
			height: s ? r.legend_item_tile_height : c * 2
		}, u = {
			padding: {
				top: 4,
				right: 10
			},
			max: {
				width: 0,
				height: 0
			},
			posMin: 10,
			step: 0,
			tileWidth: l.width + 5,
			totalLength: 0
		}, d = {
			offsets: {},
			widths: {},
			heights: {},
			margins: [0],
			steps: {}
		}, f, p, m, h = e.filter((e) => !y(r.data_names[e]) || r.data_names[e] !== null), g = t.withTransition, _ = i.isLegendRight || i.isLegendInset, v = fl.bind(n), b = n.getUpdateLegendPositions(h, u, d, _);
		i.isLegendInset && (u.step = r.legend_inset_step ? r.legend_inset_step : h.length, i.legendStep = u.step), i.isLegendRight ? (f = (e) => u.max.width * d.steps[e], p = (e) => d.margins[d.steps[e]] + d.offsets[e]) : i.isLegendInset ? (f = (e) => u.max.width * d.steps[e] + 10, p = (e) => d.margins[d.steps[e]] + d.offsets[e]) : (f = (e) => d.margins[d.steps[e]] + d.offsets[e], p = (e) => u.max.height * d.steps[e]);
		let x = {
			xText: (e, t) => f(e, t) + 4 + l.width,
			xRect: (e, t) => f(e, t),
			x1Tile: (e, t) => f(e, t) - 2,
			x2Tile: (e, t) => f(e, t) - 2 + l.width,
			yText: (e, t) => p(e, t) + 9,
			yRect: (e, t) => p(e, t) - 5,
			yTile: (e, t) => p(e, t) + 4
		};
		n.generateLegendItem(h, l, b, x, _, v), m = a.select(`.${H.legendBackground} rect`), i.isLegendInset && u.max.width > 0 && m.size() === 0 && (m = a.insert("g", `.${H.legendItem}`).attr("class", H.legendBackground).append("rect")), r.legend_tooltip && a.selectAll("title").data(h).text((e) => v(e, !1)), o(a.selectAll("text").data(h).text((e) => v(e)).each(function(e, t) {
			b(this, e, t);
		}), g).attr("x", x.xText).attr("y", x.yText), o(a.selectAll(`rect.${H.legendItemEvent}`).data(h), g).attr("width", (e) => d.widths[e]).attr("height", (e) => d.heights[e]).attr("x", x.xRect).attr("y", x.yRect), n.updateLegendItemPos(h, g, x), m && o(m, g).attr("height", n.getLegendHeight() - 12).attr("width", u.max.width * (u.step + 1) + 10), i.legendItemWidth = u.max.width, i.legendItemHeight = u.max.height, i.legendStep = u.step;
	},
	getUpdateLegendPositions(e, t, n, r) {
		let i = this, { config: a, state: o } = i;
		return function(s, c, l) {
			let u = l === 0, d = l === e.length - 1, f = i.getLegendItemTextBox(c, s), p = f.width + t.tileWidth + (d && !r ? 0 : t.padding.right) + a.legend_padding, m = f.height + t.padding.top, h = r ? m : p, g = r ? i.getLegendHeight() : i.getLegendWidth(), _, v = function(e, r) {
				r || (_ = (g - t.totalLength - h) / 2, _ < t.posMin && (_ = (g - h) / 2, t.totalLength = 0, t.step++)), n.steps[e] = t.step, n.margins[t.step] = o.isLegendInset ? 10 : _, n.offsets[e] = t.totalLength, t.totalLength += h;
			};
			if (u && (t.totalLength = 0, t.step = 0, t.max.width = 0, t.max.height = 0), a.legend_show && !i.isLegendToShow(c)) {
				n.widths[c] = 0, n.heights[c] = 0, n.steps[c] = 0, n.offsets[c] = 0;
				return;
			}
			n.widths[c] = p, n.heights[c] = m, (!t.max.width || p >= t.max.width) && (t.max.width = p), (!t.max.height || m >= t.max.height) && (t.max.height = m);
			let y = r ? t.max.height : t.max.width;
			if (a.legend_equally) {
				for (let e in n.widths) n.widths[e] = t.max.width;
				for (let e in n.heights) n.heights[e] = t.max.height;
				_ = (g - y * e.length) / 2, _ < t.posMin ? (t.totalLength = 0, t.step = 0, e.forEach((e) => v(e))) : v(c, !0);
			} else v(c);
		};
	},
	generateLegendItem(e, t, n, r, i, a) {
		let o = this, { config: s, state: c, $el: { legend: u } } = o, d = s.legend_usePoint, f = s.legend_item_tile_r, p = s.legend_item_tile_type, m = p !== "circle", h = -200, g = u.selectAll(`.${H.legendItem}`).data(e).enter().append("g");
		if (o.setLegendItem(g), s.legend_tooltip && g.append("title").text((e) => e), g.append("text").text((e) => a(e)).each(function(e, t) {
			n(this, e, t);
		}).style("pointer-events", o.getStylePropValue("none")).attr("x", i ? r.xText : h).attr("y", i ? h : r.yText), g.append("rect").attr("class", H.legendItemEvent).style("fill-opacity", o.getStylePropValue("0")).attr("x", i ? r.xRect : h).attr("y", i ? h : r.yRect), d) {
			let e = [], t = o.getValidPointPattern();
			g.append((n) => {
				e.indexOf(n) === -1 && e.push(n);
				let r = t[e.indexOf(n) % t.length];
				return r === "rectangle" && (r = "rect"), l.createElementNS(Xe.svg, "hasValidPointType" in o && o.hasValidPointType(r) ? r : "use");
			}).attr("class", H.legendItemPoint).style("fill", dl.bind(o)).style("pointer-events", o.getStylePropValue("none")).attr("href", (e, t, n) => {
				let r = n[t].nodeName.toLowerCase(), i = o.getTargetSelectorSuffix(e);
				return r === "use" ? `#${c.datetimeId}-point${i}` : void 0;
			});
		} else g.append(m ? "line" : p).attr("class", H.legendItemTile).style("stroke", dl.bind(o)).style("pointer-events", o.getStylePropValue("none")).call((e) => {
			p === "circle" ? e.attr("r", f).style("fill", dl.bind(o)).attr("cx", i ? r.x2Tile : h).attr("cy", i ? h : r.yTile) : m && e.attr("stroke-width", t.height).attr("x1", i ? r.x1Tile : h).attr("y1", i ? h : r.yTile).attr("x2", i ? r.x2Tile : h).attr("y2", i ? h : r.yTile);
		});
	},
	updateLegendItemPos(e, t, n) {
		let r = this, { config: i, $el: { legend: a }, $T: o } = r, s = i.legend_usePoint, c = i.legend_item_tile_type, l = c !== "circle";
		if (s) {
			let r = a.selectAll(`.${H.legendItemPoint}`).data(e), s = i.legend_item_tile_type !== "circle", c = s ? i.legend_item_tile_width : i.legend_item_tile_r * 2, l = s ? i.legend_item_tile_height : i.legend_item_tile_r * 2, u = c * .75, d = l * .75, f = c / 8, p = l / 8;
			o(r, t).each(function() {
				let e = this.nodeName.toLowerCase(), t = "x", r = "y", i = null, a = null, o = null;
				e === "circle" ? (t = "cx", r = "cy", i = Math.min(u, d) / 2) : e === "rect" && (a = u, o = d);
				let s = L(this).attr("transform", null).attr("x", null).attr("y", null).attr("cx", null).attr("cy", null).attr("r", i).attr("width", a).attr("height", o);
				e === "use" ? s.attr("transform", (e) => `translate(${n.x1Tile(e)} ${n.yTile(e) - l / 2}) scale(${f} ${p})`) : s.attr(t, (e) => n.x1Tile(e) + (c - (a || 0)) / 2).attr(r, (e) => n.yTile(e) - (o || 0) / 2);
			});
		} else o(a.selectAll(`.${H.legendItemTile}`).data(e), t).style("stroke", dl.bind(r)).call((e) => {
			c === "circle" ? e.attr("cx", (e) => {
				let t = n.x2Tile(e);
				return t - (t - n.x1Tile(e)) / 2;
			}).attr("cy", n.yTile) : l && e.attr("x1", n.x1Tile).attr("y1", n.yTile).attr("x2", n.x2Tile).attr("y2", n.yTile);
		});
	}
}, Sl = {
	redraw(e = {}) {
		let t = this, { config: n, state: r, $el: i } = t, { main: a, treemap: o } = i;
		r.redrawing = !0, r.redrawGeneration++, (r.dirty.data || r.dirty.visibility || e.initializing) && r.dataGeneration++, (e.initializing || r.dirty.size || r.dirty.data || !r.rendered) && t.cache.remove([Y.svgLeft]);
		let s = t.filterTargetsToShow(t.data.targets);
		r._targetsToShow = s;
		let c = {
			data: r.dirty.data,
			visibility: r.dirty.visibility,
			size: r.dirty.size
		};
		r.dirty.data = !1, r.dirty.visibility = !1, r.dirty.size = !1;
		let { flow: l, initializing: u } = e, d = t.getWithOption(e), f = d.Transition ? n.transition_duration : 0, p = d.TransitionForExit ? f : 0, m = t.axis?.generateTransitions(d.TransitionForAxis ? f : 0), h = c.data || c.visibility || u;
		if (r.isCanvasMode && (t.setContainerSize(), t.updateHtmlLegend?.()), t.updateSizes(u), r.isCanvasMode) {
			let a = t.scale.zoom, o = a?.domain();
			a && (t.scale.zoom = null), t.updateScales(u, d.UpdateXDomain), a && (a.range(t.scale.x.range()), o && a.domain(o), t.scale.zoom = t.getCustomizedXScale(a), t.axis.x.scale(t.scale.zoom), t.scale.x.domain(n.zoom_rescale ? o : t.org.xDomain), t.scale.subX.domain(t.org.xDomain)), r.hasAxis && t.axis.syncAxisDomains(s, d, l), r.hasAxis && t.applyCanvasSubchartDomain?.();
			let c = h ? t.getDrawShape() : r._cachedDrawShape || t.getDrawShape();
			h && (r._cachedDrawShape = c), n.legend_show && i.legend && !(n.legend_contents_bindto && n.legend_contents_template) && t.positionHtmlLegend?.(), t.resizeCanvas?.(), r.canvasFocusKey = null, t.renderCanvasFrame(c, null, !0), u && t.updateTypesElements(), t.callPluginHook("$redraw", e, 0), r.redrawing = !1, r._targetsToShow = null, r._cachedDrawShape = null, t.mapToIds(t.data.targets).forEach((e) => {
				r.withoutFadeIn[e] = !0;
			}), P(n.onrendered, t.api);
		} else d.Legend && n.legend_show ? (e.withTransition = !!f, !o && t.updateLegend(t.mapToIds(t.data.targets), e, m)) : d.Dimension && t.updateDimension(!0), n.data_empty_label_text && a.select(`text.${q.text}.${z.empty}`).attr("x", r.width / 2).attr("y", r.height / 2).text(n.data_empty_label_text).style("display", s.length ? "none" : null), t.redrawTitle?.(), r.hasAxis ? (t.axis.redrawAxis(s, d, m, l, u), t.hasGrid?.() && t.updateGrid(), n.regions.length && t.updateRegion?.(), [
			"bar",
			"candlestick",
			"line",
			"area"
		].forEach((e) => {
			let n = Ce(e);
			(/^(line|area)$/.test(e) && t.hasTypeOf(n) || t.hasType(e)) && h && t[`update${n}`](d.TransitionForExit);
		}), i.text && a.selectAll(`.${G.selectedCircles}`).filter(t.isBarType.bind(t)).selectAll("circle").remove(), n.interaction_enabled && !l && d.EventRect && (t.redrawEventRect(), t.bindZoomEvent?.())) : (i.arcs && t.redrawArc(f, p, d.Transform), i.radar && t.redrawRadar(), i.polar && t.redrawPolar(), i.funnel && t.redrawFunnel(), o && t.updateTreemap(p)), !r.resizing && !o && (t.hasPointType() || r.hasRadar) ? h && t.updateCircle() : t.hasLegendDefsPoint?.() && t.data.targets.forEach(t.point("create", this)), t.hasDataLabel() && !t.hasArcType(null, ["radar"]) && h && t.updateText(), u && t.updateTypesElements(), t.generateRedrawList(s, l, f, d.Subchart, h), t.updateTooltipOnRedraw(), t.callPluginHook("$redraw", e, f);
	},
	generateRedrawList(e, t, n, r, i = !0) {
		let a = this, { config: o, state: s } = a, c = i ? a.getDrawShape() : s._cachedDrawShape || a.getDrawShape();
		i && (s._cachedDrawShape = c), s.hasAxis && o.subchart_show && a.redrawSubchart(r, n, c);
		let l = t && a.generateFlow({
			targets: e,
			flow: t,
			duration: t.duration,
			shape: c,
			xv: a.xv.bind(a)
		}), u = (n || l) && hr(), d = a.getRedrawList(c, t, l, u), f = () => {
			l && l(), s.redrawing = !1, s._targetsToShow = null, s._cachedDrawShape = null, P(o.onrendered, a.api);
		};
		if (u && d.length) {
			let e = Zr();
			hc().duration(n).each(() => {
				d.flatMap((e) => e).forEach((t) => e.add(t));
			}).call(e, f);
		} else s.transiting || f();
		a.mapToIds(a.data.targets).forEach((e) => {
			s.withoutFadeIn[e] = !0;
		});
	},
	getRedrawList(e, t, n, r) {
		let i = this, { config: a, state: { hasAxis: o, hasRadar: s, hasTreemap: c }, $el: { grid: l } } = i, { cx: u, cy: d, xForText: f, yForText: p } = e.pos, m = [];
		if (o) {
			i.redrawGrid && (a.grid_x_lines.length || a.grid_y_lines.length) && m.push(i.redrawGrid(r)), i.redrawRegion && a.regions.length && m.push(i.redrawRegion(r));
			for (let t in e.type) {
				let n = Ce(t), a = e.type[t];
				(/^(area|line)$/.test(t) && i.hasTypeOf(n) || i.hasType(t)) && m.push(i[`redraw${n}`](a, r));
			}
			!t && l.main && i.updateGridFocus && m.push(i.updateGridFocus());
		}
		return (!i.hasArcType() || s) && D(a.data_labels) && a.data_labels !== !1 && m.push(i.redrawText(f, p, t, r)), (i.hasPointType() || s) && !i.isPointFocusOnly() && i.redrawCircle && m.push(i.redrawCircle(u, d, r, n)), c && m.push(i.redrawTreemap(r)), m;
	},
	updateAndRedraw(e = {}) {
		let t = this, { config: n, state: r } = t, i;
		e.withTransition = be(e, "withTransition", !0), e.withTransform = be(e, "withTransform", !1), e.withLegend = be(e, "withLegend", !1), e.withUpdateXDomain = !0, e.withUpdateOrgXDomain = !0, e.withTransitionForExit = !1, e.withTransitionForTransform = be(e, "withTransitionForTransform", e.withTransition), e.withLegend && n.legend_show || (r.hasAxis && (i = t.axis.generateTransitions(e.withTransitionForAxis ? n.transition_duration : 0)), t.updateScales(), t.updateSvgSize(), t.transformAll(e.withTransitionForTransform, i)), t.redraw(e);
	}
};
// node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/ascending.js
function Cl(e, t) {
	return e == null || t == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
// node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/descending.js
function wl(e, t) {
	return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
// node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/bisector.js
function Tl(e) {
	let t, n, r;
	e.length === 2 ? (t = e === Cl || e === wl ? e : El, n = e, r = e) : (t = Cl, n = (t, n) => Cl(e(t), n), r = (t, n) => e(t) - n);
	function i(e, r, i = 0, a = e.length) {
		if (i < a) {
			if (t(r, r) !== 0) return a;
			do {
				let t = i + a >>> 1;
				n(e[t], r) < 0 ? i = t + 1 : a = t;
			} while (i < a);
		}
		return i;
	}
	function a(e, r, i = 0, a = e.length) {
		if (i < a) {
			if (t(r, r) !== 0) return a;
			do {
				let t = i + a >>> 1;
				n(e[t], r) <= 0 ? i = t + 1 : a = t;
			} while (i < a);
		}
		return i;
	}
	function o(e, t, n = 0, a = e.length) {
		let o = i(e, t, n, a - 1);
		return o > n && r(e[o - 1], t) > -r(e[o], t) ? o - 1 : o;
	}
	return {
		left: i,
		center: o,
		right: a
	};
}
function El() {
	return 0;
}
// node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/number.js
function Dl(e) {
	return e === null ? NaN : +e;
}
// node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/bisect.js
var Ol = Tl(Cl), kl = Ol.right;
Ol.left, Tl(Dl).center;
// node_modules/.pnpm/d3-array@3.2.4/node_modules/d3-array/src/ticks.js
var Al = Math.sqrt(50), jl = Math.sqrt(10), Ml = Math.sqrt(2);
function Nl(e, t, n) {
	let r = (t - e) / Math.max(0, n), i = Math.floor(Math.log10(r)), a = r / 10 ** i, o = a >= Al ? 10 : a >= jl ? 5 : a >= Ml ? 2 : 1, s, c, l;
	return i < 0 ? (l = 10 ** -i / o, s = Math.round(e * l), c = Math.round(t * l), s / l < e && ++s, c / l > t && --c, l = -l) : (l = 10 ** i * o, s = Math.round(e / l), c = Math.round(t / l), s * l < e && ++s, c * l > t && --c), c < s && .5 <= n && n < 2 ? Nl(e, t, n * 2) : [
		s,
		c,
		l
	];
}
function Pl(e, t, n) {
	if (t = +t, e = +e, n = +n, !(n > 0)) return [];
	if (e === t) return [e];
	let r = t < e, [i, a, o] = r ? Nl(t, e, n) : Nl(e, t, n);
	if (!(a >= i)) return [];
	let s = a - i + 1, c = Array(s);
	if (r) {
		if (o < 0) for (let e = 0; e < s; ++e) c[e] = (a - e) / -o;
		else for (let e = 0; e < s; ++e) c[e] = (a - e) * o;
	} else if (o < 0) for (let e = 0; e < s; ++e) c[e] = (i + e) / -o;
	else for (let e = 0; e < s; ++e) c[e] = (i + e) * o;
	return c;
}
function Fl(e, t, n) {
	return t = +t, e = +e, n = +n, Nl(e, t, n)[2];
}
function Il(e, t, n) {
	t = +t, e = +e, n = +n;
	let r = t < e, i = r ? Fl(t, e, n) : Fl(e, t, n);
	return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/init.js
function Ll(e, t) {
	switch (arguments.length) {
		case 0: break;
		case 1:
			this.range(e);
			break;
		default: this.range(t).domain(e);
	}
	return this;
}
// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/constant.js
function Rl(e) {
	return function() {
		return e;
	};
}
// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/number.js
function zl(e) {
	return +e;
}
// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/continuous.js
var Bl = [0, 1];
function Vl(e) {
	return e;
}
function Hl(e, t) {
	return (t -= e = +e) ? function(n) {
		return (n - e) / t;
	} : Rl(isNaN(t) ? NaN : .5);
}
function Ul(e, t) {
	var n;
	return e > t && (n = e, e = t, t = n), function(n) {
		return Math.max(e, Math.min(t, n));
	};
}
function Wl(e, t, n) {
	var r = e[0], i = e[1], a = t[0], o = t[1];
	return i < r ? (r = Hl(i, r), a = n(o, a)) : (r = Hl(r, i), a = n(a, o)), function(e) {
		return a(r(e));
	};
}
function Gl(e, t, n) {
	var r = Math.min(e.length, t.length) - 1, i = Array(r), a = Array(r), o = -1;
	for (e[r] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++o < r;) i[o] = Hl(e[o], e[o + 1]), a[o] = n(t[o], t[o + 1]);
	return function(t) {
		var n = kl(e, t, 1, r) - 1;
		return a[n](i[n](t));
	};
}
function Kl(e, t) {
	return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown());
}
function ql() {
	var e = Bl, t = Bl, n = bo, r, i, a, o = Vl, s, c, l;
	function u() {
		var n = Math.min(e.length, t.length);
		return o !== Vl && (o = Ul(e[0], e[n - 1])), s = n > 2 ? Gl : Wl, c = l = null, d;
	}
	function d(i) {
		return i == null || isNaN(i = +i) ? a : (c ||= s(e.map(r), t, n))(r(o(i)));
	}
	return d.invert = function(n) {
		return o(i((l ||= s(t, e.map(r), po))(n)));
	}, d.domain = function(t) {
		return arguments.length ? (e = Array.from(t, zl), u()) : e.slice();
	}, d.range = function(e) {
		return arguments.length ? (t = Array.from(e), u()) : t.slice();
	}, d.rangeRound = function(e) {
		return t = Array.from(e), n = xo, u();
	}, d.clamp = function(e) {
		return arguments.length ? (o = e ? !0 : Vl, u()) : o !== Vl;
	}, d.interpolate = function(e) {
		return arguments.length ? (n = e, u()) : n;
	}, d.unknown = function(e) {
		return arguments.length ? (a = e, d) : a;
	}, function(e, t) {
		return r = e, i = t, u();
	};
}
function Jl() {
	return ql()(Vl, Vl);
}
// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/tickFormat.js
function Yl(o, s, c, l) {
	var u = Il(o, s, c), d;
	switch (l = a(l ?? ",f"), l.type) {
		case "s":
			var f = Math.max(Math.abs(o), Math.abs(s));
			return l.precision == null && !isNaN(d = i(u, f)) && (l.precision = d), r(l, f);
		case "":
		case "e":
		case "g":
		case "p":
		case "r":
			l.precision == null && !isNaN(d = n(u, Math.max(Math.abs(o), Math.abs(s)))) && (l.precision = d - (l.type === "e"));
			break;
		case "f":
		case "%": l.precision == null && !isNaN(d = t(u)) && (l.precision = d - (l.type === "%") * 2);
	}
	return e(l);
}
// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/linear.js
function Xl(e) {
	var t = e.domain;
	return e.ticks = function(e) {
		var n = t();
		return Pl(n[0], n[n.length - 1], e ?? 10);
	}, e.tickFormat = function(e, n) {
		var r = t();
		return Yl(r[0], r[r.length - 1], e ?? 10, n);
	}, e.nice = function(n) {
		n ??= 10;
		var r = t(), i = 0, a = r.length - 1, o = r[i], s = r[a], c, l, u = 10;
		for (s < o && (l = o, o = s, s = l, l = i, i = a, a = l); u-- > 0;) {
			if (l = Fl(o, s, n), l === c) return r[i] = o, r[a] = s, t(r);
			if (l > 0) o = Math.floor(o / l) * l, s = Math.ceil(s / l) * l;
			else if (l < 0) o = Math.ceil(o * l) / l, s = Math.floor(s * l) / l;
			else break;
			c = l;
		}
		return e;
	}, e;
}
function Zl() {
	var e = Jl();
	return e.copy = function() {
		return Kl(e, Zl());
	}, Ll.apply(e, arguments), Xl(e);
}
// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/nice.js
function Ql(e, t) {
	e = e.slice();
	var n = 0, r = e.length - 1, i = e[n], a = e[r], o;
	return a < i && (o = n, n = r, r = o, o = i, i = a, a = o), e[n] = t.floor(i), e[r] = t.ceil(a), e;
}
// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/log.js
function $l(e) {
	return Math.log(e);
}
function eu(e) {
	return Math.exp(e);
}
function tu(e) {
	return -Math.log(-e);
}
function nu(e) {
	return -Math.exp(-e);
}
function ru(e) {
	return isFinite(e) ? +("1e" + e) : e < 0 ? 0 : e;
}
function iu(e) {
	return e === 10 ? ru : e === Math.E ? Math.exp : (t) => e ** +t;
}
function au(e) {
	return e === Math.E ? Math.log : e === 10 && Math.log10 || e === 2 && Math.log2 || (e = Math.log(e), (t) => Math.log(t) / e);
}
function ou(e) {
	return (t, n) => -e(-t, n);
}
function su(t) {
	let n = t($l, eu), r = n.domain, i = 10, o, s;
	function c() {
		return o = au(i), s = iu(i), r()[0] < 0 ? (o = ou(o), s = ou(s), t(tu, nu)) : t($l, eu), n;
	}
	return n.base = function(e) {
		return arguments.length ? (i = +e, c()) : i;
	}, n.domain = function(e) {
		return arguments.length ? (r(e), c()) : r();
	}, n.ticks = (e) => {
		let t = r(), n = t[0], a = t[t.length - 1], c = a < n;
		c && ([n, a] = [a, n]);
		let l = o(n), u = o(a), d, f, p = e == null ? 10 : +e, m = [];
		if (!(i % 1) && u - l < p) {
			if (l = Math.floor(l), u = Math.ceil(u), n > 0) {
				for (; l <= u; ++l) for (d = 1; d < i; ++d) if (f = l < 0 ? d / s(-l) : d * s(l), !(f < n)) {
					if (f > a) break;
					m.push(f);
				}
			} else for (; l <= u; ++l) for (d = i - 1; d >= 1; --d) if (f = l > 0 ? d / s(-l) : d * s(l), !(f < n)) {
				if (f > a) break;
				m.push(f);
			}
			m.length * 2 < p && (m = Pl(n, a, p));
		} else m = Pl(l, u, Math.min(u - l, p)).map(s);
		return c ? m.reverse() : m;
	}, n.tickFormat = (t, r) => {
		if (t ??= 10, r ??= i === 10 ? "s" : ",", typeof r != "function" && (!(i % 1) && (r = a(r)).precision == null && (r.trim = !0), r = e(r)), t === Infinity) return r;
		let c = Math.max(1, i * t / n.ticks().length);
		return (e) => {
			let t = e / s(Math.round(o(e)));
			return t * i < i - .5 && (t *= i), t <= c ? r(e) : "";
		};
	}, n.nice = () => r(Ql(r(), {
		floor: (e) => s(Math.floor(o(e))),
		ceil: (e) => s(Math.ceil(o(e)))
	})), n;
}
function cu() {
	let e = su(ql()).domain([1, 10]);
	return e.copy = () => Kl(e, cu()).base(e.base()), Ll.apply(e, arguments), e;
}
// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/symlog.js
function lu(e) {
	return function(t) {
		return Math.sign(t) * Math.log1p(Math.abs(t / e));
	};
}
function uu(e) {
	return function(t) {
		return Math.sign(t) * Math.expm1(Math.abs(t)) * e;
	};
}
function du(e) {
	var t = 1, n = e(lu(t), uu(t));
	return n.constant = function(n) {
		return arguments.length ? e(lu(t = +n), uu(t)) : t;
	}, Xl(n);
}
function fu() {
	var e = du(ql());
	return e.copy = function() {
		return Kl(e, fu()).constant(e.constant());
	}, Ll.apply(e, arguments);
}
// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/interval.js
var pu = /* @__PURE__ */ new Date(), mu = /* @__PURE__ */ new Date();
function X(e, t, n, r) {
	function i(t) {
		return e(t = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+t)), t;
	}
	return i.floor = (t) => (e(t = /* @__PURE__ */ new Date(+t)), t), i.ceil = (n) => (e(n = /* @__PURE__ */ new Date(n - 1)), t(n, 1), e(n), n), i.round = (e) => {
		let t = i(e), n = i.ceil(e);
		return e - t < n - e ? t : n;
	}, i.offset = (e, n) => (t(e = /* @__PURE__ */ new Date(+e), n == null ? 1 : Math.floor(n)), e), i.range = (n, r, a) => {
		let o = [];
		if (n = i.ceil(n), a = a == null ? 1 : Math.floor(a), !(n < r) || !(a > 0)) return o;
		let s;
		do
			o.push(s = /* @__PURE__ */ new Date(+n)), t(n, a), e(n);
		while (s < n && n < r);
		return o;
	}, i.filter = (n) => X((t) => {
		if (t >= t) for (; e(t), !n(t);) t.setTime(t - 1);
	}, (e, r) => {
		if (e >= e) {
			if (r < 0) for (; ++r <= 0;) for (; t(e, -1), !n(e););
			else for (; --r >= 0;) for (; t(e, 1), !n(e););
		}
	}), n && (i.count = (t, r) => (pu.setTime(+t), mu.setTime(+r), e(pu), e(mu), Math.floor(n(pu, mu))), i.every = (e) => (e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? i.filter(r ? (t) => r(t) % e === 0 : (t) => i.count(0, t) % e === 0) : i)), i;
}
// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/millisecond.js
var hu = X(() => {}, (e, t) => {
	e.setTime(+e + t);
}, (e, t) => t - e);
hu.every = (e) => (e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? X((t) => {
	t.setTime(Math.floor(t / e) * e);
}, (t, n) => {
	t.setTime(+t + n * e);
}, (t, n) => (n - t) / e) : hu), hu.range;
// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/duration.js
var gu = 1e3, _u = gu * 60, vu = _u * 60, yu = vu * 24, bu = yu * 7, xu = yu * 30, Su = yu * 365, Cu = X((e) => {
	e.setTime(e - e.getMilliseconds());
}, (e, t) => {
	e.setTime(+e + t * gu);
}, (e, t) => (t - e) / gu, (e) => e.getUTCSeconds());
Cu.range;
// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/minute.js
var wu = X((e) => {
	e.setTime(e - e.getMilliseconds() - e.getSeconds() * gu);
}, (e, t) => {
	e.setTime(+e + t * _u);
}, (e, t) => (t - e) / _u, (e) => e.getMinutes());
wu.range;
var Tu = X((e) => {
	e.setUTCSeconds(0, 0);
}, (e, t) => {
	e.setTime(+e + t * _u);
}, (e, t) => (t - e) / _u, (e) => e.getUTCMinutes());
Tu.range;
// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/hour.js
var Eu = X((e) => {
	e.setTime(e - e.getMilliseconds() - e.getSeconds() * gu - e.getMinutes() * _u);
}, (e, t) => {
	e.setTime(+e + t * vu);
}, (e, t) => (t - e) / vu, (e) => e.getHours());
Eu.range;
var Du = X((e) => {
	e.setUTCMinutes(0, 0, 0);
}, (e, t) => {
	e.setTime(+e + t * vu);
}, (e, t) => (t - e) / vu, (e) => e.getUTCHours());
Du.range;
// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/day.js
var Ou = X((e) => e.setHours(0, 0, 0, 0), (e, t) => e.setDate(e.getDate() + t), (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * _u) / yu, (e) => e.getDate() - 1);
Ou.range;
var ku = X((e) => {
	e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
	e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / yu, (e) => e.getUTCDate() - 1);
ku.range;
var Au = X((e) => {
	e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
	e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / yu, (e) => Math.floor(e / yu));
Au.range;
// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/week.js
function ju(e) {
	return X((t) => {
		t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(0, 0, 0, 0);
	}, (e, t) => {
		e.setDate(e.getDate() + t * 7);
	}, (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * _u) / bu);
}
var Mu = ju(0), Nu = ju(1), Pu = ju(2), Fu = ju(3), Iu = ju(4), Lu = ju(5), Ru = ju(6);
Mu.range, Nu.range, Pu.range, Fu.range, Iu.range, Lu.range, Ru.range;
function zu(e) {
	return X((t) => {
		t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7), t.setUTCHours(0, 0, 0, 0);
	}, (e, t) => {
		e.setUTCDate(e.getUTCDate() + t * 7);
	}, (e, t) => (t - e) / bu);
}
var Bu = zu(0), Vu = zu(1), Hu = zu(2), Uu = zu(3), Wu = zu(4), Gu = zu(5), Ku = zu(6);
Bu.range, Vu.range, Hu.range, Uu.range, Wu.range, Gu.range, Ku.range;
// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/month.js
var qu = X((e) => {
	e.setDate(1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
	e.setMonth(e.getMonth() + t);
}, (e, t) => t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12, (e) => e.getMonth());
qu.range;
var Ju = X((e) => {
	e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
	e.setUTCMonth(e.getUTCMonth() + t);
}, (e, t) => t.getUTCMonth() - e.getUTCMonth() + (t.getUTCFullYear() - e.getUTCFullYear()) * 12, (e) => e.getUTCMonth());
Ju.range;
// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/year.js
var Yu = X((e) => {
	e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
	e.setFullYear(e.getFullYear() + t);
}, (e, t) => t.getFullYear() - e.getFullYear(), (e) => e.getFullYear());
Yu.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : X((t) => {
	t.setFullYear(Math.floor(t.getFullYear() / e) * e), t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, (t, n) => {
	t.setFullYear(t.getFullYear() + n * e);
}), Yu.range;
var Xu = X((e) => {
	e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
	e.setUTCFullYear(e.getUTCFullYear() + t);
}, (e, t) => t.getUTCFullYear() - e.getUTCFullYear(), (e) => e.getUTCFullYear());
Xu.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : X((t) => {
	t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, (t, n) => {
	t.setUTCFullYear(t.getUTCFullYear() + n * e);
}), Xu.range;
// node_modules/.pnpm/d3-time@3.1.0/node_modules/d3-time/src/ticks.js
function Zu(e, t, n, r, i, a) {
	let o = [
		[
			Cu,
			1,
			gu
		],
		[
			Cu,
			5,
			5 * gu
		],
		[
			Cu,
			15,
			15 * gu
		],
		[
			Cu,
			30,
			30 * gu
		],
		[
			a,
			1,
			_u
		],
		[
			a,
			5,
			5 * _u
		],
		[
			a,
			15,
			15 * _u
		],
		[
			a,
			30,
			30 * _u
		],
		[
			i,
			1,
			vu
		],
		[
			i,
			3,
			3 * vu
		],
		[
			i,
			6,
			6 * vu
		],
		[
			i,
			12,
			12 * vu
		],
		[
			r,
			1,
			yu
		],
		[
			r,
			2,
			2 * yu
		],
		[
			n,
			1,
			bu
		],
		[
			t,
			1,
			xu
		],
		[
			t,
			3,
			3 * xu
		],
		[
			e,
			1,
			Su
		]
	];
	function s(e, t, n) {
		let r = t < e;
		r && ([e, t] = [t, e]);
		let i = n && typeof n.range == "function" ? n : c(e, t, n), a = i ? i.range(e, +t + 1) : [];
		return r ? a.reverse() : a;
	}
	function c(t, n, r) {
		let i = Math.abs(n - t) / r, a = Tl(([, , e]) => e).right(o, i);
		if (a === o.length) return e.every(Il(t / Su, n / Su, r));
		if (a === 0) return hu.every(Math.max(Il(t, n, r), 1));
		let [s, c] = o[i / o[a - 1][2] < o[a][2] / i ? a - 1 : a];
		return s.every(c);
	}
	return [s, c];
}
var [Qu, $u] = Zu(Xu, Ju, Bu, Au, Du, Tu), [ed, td] = Zu(Yu, qu, Mu, Ou, Eu, wu);
// node_modules/.pnpm/d3-time-format@4.1.0/node_modules/d3-time-format/src/locale.js
function nd(e) {
	if (0 <= e.y && e.y < 100) {
		var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
		return t.setFullYear(e.y), t;
	}
	return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function rd(e) {
	if (0 <= e.y && e.y < 100) {
		var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
		return t.setUTCFullYear(e.y), t;
	}
	return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function id(e, t, n) {
	return {
		y: e,
		m: t,
		d: n,
		H: 0,
		M: 0,
		S: 0,
		L: 0
	};
}
function ad(e) {
	var t = e.dateTime, n = e.date, r = e.time, i = e.periods, a = e.days, o = e.shortDays, s = e.months, c = e.shortMonths, l = ud(i), u = dd(i), d = ud(a), f = dd(a), p = ud(o), m = dd(o), h = ud(s), g = dd(s), _ = ud(c), v = dd(c), y = {
		a: N,
		A: ee,
		b: te,
		B: ne,
		c: null,
		d: Md,
		e: Md,
		f: Ld,
		g: Jd,
		G: Xd,
		H: Nd,
		I: Pd,
		j: Fd,
		L: Id,
		m: Rd,
		M: zd,
		p: re,
		q: ie,
		Q: bf,
		s: xf,
		S: Bd,
		u: Vd,
		U: Hd,
		V: Wd,
		w: Gd,
		W: Kd,
		x: null,
		X: null,
		y: qd,
		Y: Yd,
		Z: Zd,
		"%": yf
	}, b = {
		a: ae,
		A: oe,
		b: se,
		B: ce,
		c: null,
		d: Qd,
		e: Qd,
		f: rf,
		g: hf,
		G: _f,
		H: $d,
		I: ef,
		j: tf,
		L: nf,
		m: af,
		M: of,
		p: le,
		q: ue,
		Q: bf,
		s: xf,
		S: sf,
		u: cf,
		U: lf,
		V: df,
		w: ff,
		W: pf,
		x: null,
		X: null,
		y: mf,
		Y: gf,
		Z: vf,
		"%": yf
	}, x = {
		a: E,
		A: D,
		b: O,
		B: k,
		c: A,
		d: Sd,
		e: Sd,
		f: Od,
		g: vd,
		G: _d,
		H: wd,
		I: wd,
		j: Cd,
		L: Dd,
		m: xd,
		M: Td,
		p: T,
		q: bd,
		Q: Ad,
		s: jd,
		S: Ed,
		u: pd,
		U: md,
		V: hd,
		w: fd,
		W: gd,
		x: j,
		X: M,
		y: vd,
		Y: _d,
		Z: yd,
		"%": kd
	};
	y.x = S(n, y), y.X = S(r, y), y.c = S(t, y), b.x = S(n, b), b.X = S(r, b), b.c = S(t, b);
	function S(e, t) {
		return function(n) {
			var r = [], i = -1, a = 0, o = e.length, s, c, l;
			for (n instanceof Date || (n = /* @__PURE__ */ new Date(+n)); ++i < o;) e.charCodeAt(i) === 37 && (r.push(e.slice(a, i)), (c = od[s = e.charAt(++i)]) == null ? c = s === "e" ? " " : "0" : s = e.charAt(++i), (l = t[s]) && (s = l(n, c)), r.push(s), a = i + 1);
			return r.push(e.slice(a, i)), r.join("");
		};
	}
	function C(e, t) {
		return function(n) {
			var r = id(1900, void 0, 1), i = w(r, e, n += "", 0), a, o;
			if (i != n.length) return null;
			if ("Q" in r) return new Date(r.Q);
			if ("s" in r) return new Date(r.s * 1e3 + ("L" in r ? r.L : 0));
			if (t && !("Z" in r) && (r.Z = 0), "p" in r && (r.H = r.H % 12 + r.p * 12), r.m === void 0 && (r.m = "q" in r ? r.q : 0), "V" in r) {
				if (r.V < 1 || r.V > 53) return null;
				"w" in r || (r.w = 1), "Z" in r ? (a = rd(id(r.y, 0, 1)), o = a.getUTCDay(), a = o > 4 || o === 0 ? Vu.ceil(a) : Vu(a), a = ku.offset(a, (r.V - 1) * 7), r.y = a.getUTCFullYear(), r.m = a.getUTCMonth(), r.d = a.getUTCDate() + (r.w + 6) % 7) : (a = nd(id(r.y, 0, 1)), o = a.getDay(), a = o > 4 || o === 0 ? Nu.ceil(a) : Nu(a), a = Ou.offset(a, (r.V - 1) * 7), r.y = a.getFullYear(), r.m = a.getMonth(), r.d = a.getDate() + (r.w + 6) % 7);
			} else ("W" in r || "U" in r) && ("w" in r || (r.w = "u" in r ? r.u % 7 : +("W" in r)), o = "Z" in r ? rd(id(r.y, 0, 1)).getUTCDay() : nd(id(r.y, 0, 1)).getDay(), r.m = 0, r.d = "W" in r ? (r.w + 6) % 7 + r.W * 7 - (o + 5) % 7 : r.w + r.U * 7 - (o + 6) % 7);
			return "Z" in r ? (r.H += r.Z / 100 | 0, r.M += r.Z % 100, rd(r)) : nd(r);
		};
	}
	function w(e, t, n, r) {
		for (var i = 0, a = t.length, o = n.length, s, c; i < a;) {
			if (r >= o) return -1;
			if (s = t.charCodeAt(i++), s === 37) {
				if (s = t.charAt(i++), c = x[s in od ? t.charAt(i++) : s], !c || (r = c(e, n, r)) < 0) return -1;
			} else if (s != n.charCodeAt(r++)) return -1;
		}
		return r;
	}
	function T(e, t, n) {
		var r = l.exec(t.slice(n));
		return r ? (e.p = u.get(r[0].toLowerCase()), n + r[0].length) : -1;
	}
	function E(e, t, n) {
		var r = p.exec(t.slice(n));
		return r ? (e.w = m.get(r[0].toLowerCase()), n + r[0].length) : -1;
	}
	function D(e, t, n) {
		var r = d.exec(t.slice(n));
		return r ? (e.w = f.get(r[0].toLowerCase()), n + r[0].length) : -1;
	}
	function O(e, t, n) {
		var r = _.exec(t.slice(n));
		return r ? (e.m = v.get(r[0].toLowerCase()), n + r[0].length) : -1;
	}
	function k(e, t, n) {
		var r = h.exec(t.slice(n));
		return r ? (e.m = g.get(r[0].toLowerCase()), n + r[0].length) : -1;
	}
	function A(e, n, r) {
		return w(e, t, n, r);
	}
	function j(e, t, r) {
		return w(e, n, t, r);
	}
	function M(e, t, n) {
		return w(e, r, t, n);
	}
	function N(e) {
		return o[e.getDay()];
	}
	function ee(e) {
		return a[e.getDay()];
	}
	function te(e) {
		return c[e.getMonth()];
	}
	function ne(e) {
		return s[e.getMonth()];
	}
	function re(e) {
		return i[+(e.getHours() >= 12)];
	}
	function ie(e) {
		return 1 + ~~(e.getMonth() / 3);
	}
	function ae(e) {
		return o[e.getUTCDay()];
	}
	function oe(e) {
		return a[e.getUTCDay()];
	}
	function se(e) {
		return c[e.getUTCMonth()];
	}
	function ce(e) {
		return s[e.getUTCMonth()];
	}
	function le(e) {
		return i[+(e.getUTCHours() >= 12)];
	}
	function ue(e) {
		return 1 + ~~(e.getUTCMonth() / 3);
	}
	return {
		format: function(e) {
			var t = S(e += "", y);
			return t.toString = function() {
				return e;
			}, t;
		},
		parse: function(e) {
			var t = C(e += "", !1);
			return t.toString = function() {
				return e;
			}, t;
		},
		utcFormat: function(e) {
			var t = S(e += "", b);
			return t.toString = function() {
				return e;
			}, t;
		},
		utcParse: function(e) {
			var t = C(e += "", !0);
			return t.toString = function() {
				return e;
			}, t;
		}
	};
}
var od = {
	"-": "",
	_: " ",
	0: "0"
}, Z = /^\s*\d+/, sd = /^%/, cd = /[\\^$*+?|[\]().{}]/g;
function Q(e, t, n) {
	var r = e < 0 ? "-" : "", i = (r ? -e : e) + "", a = i.length;
	return r + (a < n ? Array(n - a + 1).join(t) + i : i);
}
function ld(e) {
	return e.replace(cd, "\\$&");
}
function ud(e) {
	return RegExp("^(?:" + e.map(ld).join("|") + ")", "i");
}
function dd(e) {
	return new Map(e.map((e, t) => [e.toLowerCase(), t]));
}
function fd(e, t, n) {
	var r = Z.exec(t.slice(n, n + 1));
	return r ? (e.w = +r[0], n + r[0].length) : -1;
}
function pd(e, t, n) {
	var r = Z.exec(t.slice(n, n + 1));
	return r ? (e.u = +r[0], n + r[0].length) : -1;
}
function md(e, t, n) {
	var r = Z.exec(t.slice(n, n + 2));
	return r ? (e.U = +r[0], n + r[0].length) : -1;
}
function hd(e, t, n) {
	var r = Z.exec(t.slice(n, n + 2));
	return r ? (e.V = +r[0], n + r[0].length) : -1;
}
function gd(e, t, n) {
	var r = Z.exec(t.slice(n, n + 2));
	return r ? (e.W = +r[0], n + r[0].length) : -1;
}
function _d(e, t, n) {
	var r = Z.exec(t.slice(n, n + 4));
	return r ? (e.y = +r[0], n + r[0].length) : -1;
}
function vd(e, t, n) {
	var r = Z.exec(t.slice(n, n + 2));
	return r ? (e.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3), n + r[0].length) : -1;
}
function yd(e, t, n) {
	var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(n, n + 6));
	return r ? (e.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), n + r[0].length) : -1;
}
function bd(e, t, n) {
	var r = Z.exec(t.slice(n, n + 1));
	return r ? (e.q = r[0] * 3 - 3, n + r[0].length) : -1;
}
function xd(e, t, n) {
	var r = Z.exec(t.slice(n, n + 2));
	return r ? (e.m = r[0] - 1, n + r[0].length) : -1;
}
function Sd(e, t, n) {
	var r = Z.exec(t.slice(n, n + 2));
	return r ? (e.d = +r[0], n + r[0].length) : -1;
}
function Cd(e, t, n) {
	var r = Z.exec(t.slice(n, n + 3));
	return r ? (e.m = 0, e.d = +r[0], n + r[0].length) : -1;
}
function wd(e, t, n) {
	var r = Z.exec(t.slice(n, n + 2));
	return r ? (e.H = +r[0], n + r[0].length) : -1;
}
function Td(e, t, n) {
	var r = Z.exec(t.slice(n, n + 2));
	return r ? (e.M = +r[0], n + r[0].length) : -1;
}
function Ed(e, t, n) {
	var r = Z.exec(t.slice(n, n + 2));
	return r ? (e.S = +r[0], n + r[0].length) : -1;
}
function Dd(e, t, n) {
	var r = Z.exec(t.slice(n, n + 3));
	return r ? (e.L = +r[0], n + r[0].length) : -1;
}
function Od(e, t, n) {
	var r = Z.exec(t.slice(n, n + 6));
	return r ? (e.L = Math.floor(r[0] / 1e3), n + r[0].length) : -1;
}
function kd(e, t, n) {
	var r = sd.exec(t.slice(n, n + 1));
	return r ? n + r[0].length : -1;
}
function Ad(e, t, n) {
	var r = Z.exec(t.slice(n));
	return r ? (e.Q = +r[0], n + r[0].length) : -1;
}
function jd(e, t, n) {
	var r = Z.exec(t.slice(n));
	return r ? (e.s = +r[0], n + r[0].length) : -1;
}
function Md(e, t) {
	return Q(e.getDate(), t, 2);
}
function Nd(e, t) {
	return Q(e.getHours(), t, 2);
}
function Pd(e, t) {
	return Q(e.getHours() % 12 || 12, t, 2);
}
function Fd(e, t) {
	return Q(1 + Ou.count(Yu(e), e), t, 3);
}
function Id(e, t) {
	return Q(e.getMilliseconds(), t, 3);
}
function Ld(e, t) {
	return Id(e, t) + "000";
}
function Rd(e, t) {
	return Q(e.getMonth() + 1, t, 2);
}
function zd(e, t) {
	return Q(e.getMinutes(), t, 2);
}
function Bd(e, t) {
	return Q(e.getSeconds(), t, 2);
}
function Vd(e) {
	var t = e.getDay();
	return t === 0 ? 7 : t;
}
function Hd(e, t) {
	return Q(Mu.count(Yu(e) - 1, e), t, 2);
}
function Ud(e) {
	var t = e.getDay();
	return t >= 4 || t === 0 ? Iu(e) : Iu.ceil(e);
}
function Wd(e, t) {
	return e = Ud(e), Q(Iu.count(Yu(e), e) + (Yu(e).getDay() === 4), t, 2);
}
function Gd(e) {
	return e.getDay();
}
function Kd(e, t) {
	return Q(Nu.count(Yu(e) - 1, e), t, 2);
}
function qd(e, t) {
	return Q(e.getFullYear() % 100, t, 2);
}
function Jd(e, t) {
	return e = Ud(e), Q(e.getFullYear() % 100, t, 2);
}
function Yd(e, t) {
	return Q(e.getFullYear() % 1e4, t, 4);
}
function Xd(e, t) {
	var n = e.getDay();
	return e = n >= 4 || n === 0 ? Iu(e) : Iu.ceil(e), Q(e.getFullYear() % 1e4, t, 4);
}
function Zd(e) {
	var t = e.getTimezoneOffset();
	return (t > 0 ? "-" : (t *= -1, "+")) + Q(t / 60 | 0, "0", 2) + Q(t % 60, "0", 2);
}
function Qd(e, t) {
	return Q(e.getUTCDate(), t, 2);
}
function $d(e, t) {
	return Q(e.getUTCHours(), t, 2);
}
function ef(e, t) {
	return Q(e.getUTCHours() % 12 || 12, t, 2);
}
function tf(e, t) {
	return Q(1 + ku.count(Xu(e), e), t, 3);
}
function nf(e, t) {
	return Q(e.getUTCMilliseconds(), t, 3);
}
function rf(e, t) {
	return nf(e, t) + "000";
}
function af(e, t) {
	return Q(e.getUTCMonth() + 1, t, 2);
}
function of(e, t) {
	return Q(e.getUTCMinutes(), t, 2);
}
function sf(e, t) {
	return Q(e.getUTCSeconds(), t, 2);
}
function cf(e) {
	var t = e.getUTCDay();
	return t === 0 ? 7 : t;
}
function lf(e, t) {
	return Q(Bu.count(Xu(e) - 1, e), t, 2);
}
function uf(e) {
	var t = e.getUTCDay();
	return t >= 4 || t === 0 ? Wu(e) : Wu.ceil(e);
}
function df(e, t) {
	return e = uf(e), Q(Wu.count(Xu(e), e) + (Xu(e).getUTCDay() === 4), t, 2);
}
function ff(e) {
	return e.getUTCDay();
}
function pf(e, t) {
	return Q(Vu.count(Xu(e) - 1, e), t, 2);
}
function mf(e, t) {
	return Q(e.getUTCFullYear() % 100, t, 2);
}
function hf(e, t) {
	return e = uf(e), Q(e.getUTCFullYear() % 100, t, 2);
}
function gf(e, t) {
	return Q(e.getUTCFullYear() % 1e4, t, 4);
}
function _f(e, t) {
	var n = e.getUTCDay();
	return e = n >= 4 || n === 0 ? Wu(e) : Wu.ceil(e), Q(e.getUTCFullYear() % 1e4, t, 4);
}
function vf() {
	return "+0000";
}
function yf() {
	return "%";
}
function bf(e) {
	return +e;
}
function xf(e) {
	return Math.floor(e / 1e3);
}
// node_modules/.pnpm/d3-time-format@4.1.0/node_modules/d3-time-format/src/defaultLocale.js
var Sf, Cf, wf, Tf, Ef;
Df({
	dateTime: "%x, %X",
	date: "%-m/%-d/%Y",
	time: "%-I:%M:%S %p",
	periods: ["AM", "PM"],
	days: [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	],
	shortDays: [
		"Sun",
		"Mon",
		"Tue",
		"Wed",
		"Thu",
		"Fri",
		"Sat"
	],
	months: [
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
	],
	shortMonths: [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	]
});
function Df(e) {
	return Sf = ad(e), Cf = Sf.format, wf = Sf.parse, Tf = Sf.utcFormat, Ef = Sf.utcParse, Sf;
}
// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/time.js
function Of(e) {
	return new Date(e);
}
function kf(e) {
	return e instanceof Date ? +e : +/* @__PURE__ */ new Date(+e);
}
function Af(e, t, n, r, i, a, o, s, c, l) {
	var u = Jl(), d = u.invert, f = u.domain, p = l(".%L"), m = l(":%S"), h = l("%I:%M"), g = l("%I %p"), _ = l("%a %d"), v = l("%b %d"), y = l("%B"), b = l("%Y");
	function x(e) {
		return (c(e) < e ? p : s(e) < e ? m : o(e) < e ? h : a(e) < e ? g : r(e) < e ? i(e) < e ? _ : v : n(e) < e ? y : b)(e);
	}
	return u.invert = function(e) {
		return new Date(d(e));
	}, u.domain = function(e) {
		return arguments.length ? f(Array.from(e, kf)) : f().map(Of);
	}, u.ticks = function(t) {
		var n = f();
		return e(n[0], n[n.length - 1], t ?? 10);
	}, u.tickFormat = function(e, t) {
		return t == null ? x : l(t);
	}, u.nice = function(e) {
		var n = f();
		return e && typeof e.range == "function" || (e = t(n[0], n[n.length - 1], e ?? 10)), e ? f(Ql(n, e)) : u;
	}, u.copy = function() {
		return Kl(u, Af(e, t, n, r, i, a, o, s, c, l));
	}, u;
}
function jf() {
	return Ll.apply(Af(ed, td, Yu, qu, Mu, Ou, Eu, wu, Cu, Cf).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
// node_modules/.pnpm/d3-scale@4.0.2/node_modules/d3-scale/src/utcTime.js
function Mf() {
	return Ll.apply(Af(Qu, $u, Xu, Ju, Bu, ku, Du, Tu, Cu, Tf).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/ChartInternal/internals/scale.js
function Nf(e = "linear", t, n) {
	let r = {
		linear: Zl,
		log: fu,
		_log: cu,
		time: jf,
		utc: Mf
	}[e]();
	return r.type = e, /_?log/.test(e) && r.clamp(!0), r.range([t ?? 0, n ?? 1]);
}
var Pf = {
	getXScale(e, t, n, r) {
		let i = this, a = i.state.loading !== "append" && i.scale.zoom || Nf(i.axis.getAxisType("x"), e, t);
		return i.getCustomizedXScale(n ? a.domain(n) : a, r);
	},
	getYScale(e, t, n, r, i) {
		let a = this.axis.getAxisType(e);
		if (i && i.type === a) return i.range([t, n]), r && i.domain(r), i;
		let o = Nf(a, t, n);
		return r && o.domain(r), o;
	},
	getYScaleById(e, t = !1) {
		let n = this.axis?.getId(e) === "y2", r = t ? n ? "subY2" : "subY" : n ? "y2" : "y";
		return this.scale[r];
	},
	getCustomizedXScale(e, t) {
		let n = this, r = () => (t ? t() : n.axis.x.tickOffset()) || (n.axis.isCategorized() ? (e(1) - e(0)) / 2 : 0), i = n.config.axis_x_inverted, a = function(t) {
			return e(t) + r();
		};
		for (let t in e) a[t] = e[t];
		return a.orgDomain = () => e.domain(), a.orgScale = () => e, n.axis.isCategorized() && (a.domain = function(t) {
			let n = t;
			return arguments.length ? (e.domain(n), a) : (n = this.orgDomain(), i ? [n[0] + 1, n[1]] : [n[0], n[1] + 1]);
		}), a;
	},
	updateScales(e, t = !0) {
		let n = this, { axis: r, config: i, format: a, org: o, scale: s, state: { current: c, width: l, height: u, width2: d, height2: f, hasAxis: p, hasTreemap: m } } = n;
		if (p) {
			let c = i.axis_rotated, p = n.getResettedPadding(1), m = {
				x: c ? p : 0,
				y: c ? 0 : u,
				subX: +!!c,
				subY: c ? 0 : f
			}, h = {
				x: c ? u : l,
				y: c ? l : p,
				subX: c ? u : l,
				subY: c ? d : 1
			}, g = t ? s.x?.orgDomain() : s.zoom ? void 0 : s.x?.domain?.(), _ = t ? o.xDomain : s.zoom ? void 0 : s.subX?.domain?.();
			s.x = n.getXScale(m.x, h.x, g, () => r.x.tickOffset()), s.subX = n.getXScale(m.x, h.x, _, (e) => e % 1 ? 0 : (r.subX ?? r.x).tickOffset()), a.xAxisTick = r.getXAxisTickFormat(), a.subXAxisTick = r.getXAxisTickFormat(!0), r.setAxis("x", s.x, i.axis_x_tick_outer, e), i.subchart_show && r.setAxis("subX", s.subX, i.subchart_axis_x_tick_outer ?? i.axis_x_tick_outer, e), s.y = n.getYScale("y", m.y, h.y, s.y ? s.y.domain() : i.axis_y_default, s.y), s.subY = n.getYScale("y", m.subY, h.subY, s.subY ? s.subY.domain() : i.axis_y_default, s.subY), r.setAxis("y", s.y, i.axis_y_tick_outer, e), i.subchart_show && i.subchart_axis_y_show && r.setAxis("subY", s.subY, i.subchart_axis_y_tick_outer ?? i.axis_y_tick_outer, e), (i.axis_y2_show || i.subchart_axis_y2_show) && (s.y2 = n.getYScale("y2", m.y, h.y, s.y2 ? s.y2.domain() : i.axis_y2_default, s.y2), s.subY2 = n.getYScale("y2", m.subY, h.subY, s.subY2 ? s.subY2.domain() : i.axis_y2_default, s.subY2), r.setAxis("y2", s.y2, i.axis_y2_tick_outer, e), i.subchart_show && i.subchart_axis_y2_show && r.setAxis("subY2", s.subY2, i.subchart_axis_y2_tick_outer ?? i.axis_y2_tick_outer, e));
		} else if (m) {
			let e = n.getCurrentPadding();
			s.x = Zl().rangeRound([e.left, c.width - e.right]), s.y = Zl().rangeRound([e.top, c.height - e.bottom]);
		} else n.updateArc?.();
	},
	xx(e) {
		let { config: t, scale: { x: n, zoom: r } } = this;
		return e ? (t.zoom_enabled && r ? r : n)(m(e.x) ? e.x : e) : null;
	},
	xv(e) {
		let t = this, { axis: n, config: r, scale: { x: i, zoom: a } } = t, o = r.zoom_enabled && a ? a : i, s = t.getBaseValue(e);
		return n.isTimeSeries() ? s = Le.call(t, s) : n.isCategorized() && g(s) && (s = r.axis_x_categories.indexOf(s)), o(s);
	},
	yv(e) {
		let t = this, { scale: { y: n, y2: r } } = t;
		return (e.axis && e.axis === "y2" ? r : n)(t.getBaseValue(e));
	},
	subxx(e) {
		return e ? this.scale.subX(e.x) : null;
	}
}, Ff = {
	setContainerSize() {
		let e = this, { state: t } = e;
		t.current.width = e.getCurrentWidth(), t.current.height = e.getCurrentHeight();
	},
	getCurrentWidth() {
		let e = this;
		return e.config.size_width || e.getParentRectValue("width");
	},
	getCurrentHeight() {
		let e = this, { config: t, state: n, $el: r } = e, i = t.size_height;
		if (!i) {
			let t = n.isCanvasMode ? r.chart?.node() : null, a = t?.style.minHeight;
			a && (t.style.minHeight = ""), i = e.getParentHeight(), a && (t.style.minHeight = a);
			let o = t && parseFloat(e.canvasEngine?.canvas.style.height) || 0, s = n.current.height - o;
			s > 0 && Math.round(i) === Math.round(o) && (i += s);
		}
		return i > 0 ? i : 320 / (e.hasType("gauge") && !t.gauge_fullCircle ? 2 : 1);
	},
	getParentRectValue(e) {
		let t = `offset${Ce(e)}`, n = this.$el.chart.node(), r = 0;
		for (; r < 30 && n && n.tagName !== "BODY";) {
			try {
				r = R(n, !0)[e];
			} catch {
				t in n && (r = n[t]);
			}
			n = n.parentNode;
		}
		let i = l.body[t];
		return r > i && (r = i), r;
	},
	getParentHeight() {
		let e = this.$el.chart.style("height"), t = 0;
		return e && (t = /px$/.test(e) ? parseInt(e, 10) : this.getParentRectValue("height")), t;
	},
	getSvgLeft(e) {
		let t = this, { cache: n, config: r, state: { hasAxis: i }, $el: a } = t;
		if (e) {
			let e = n.get(Y.svgLeft);
			if (e !== null) return e;
		}
		let o = r.axis_rotated, s = o || !o && !r.axis_y_inner, c = o ? V.axisX : V.axisY, l = a.main.select(`.${c}`).node(), u = i && r[`axis_${o ? "x" : "y"}_label`], d = i && (g(u) || g(u.text) || /^inner-/.test(u?.position)) ? a.main.select(`.${c}-label`) : null, f = d && !d.empty() ? d.node() : null, p = !e, m = {
			label: f ? R(f, p) : null,
			leftAxis: l && s ? R(l, p) : null,
			chart: R(a.chart.node(), p)
		}, h = m.label?.left ?? 0, _ = m.leftAxis ?? { right: 0 }, v = m.chart.left + h, y = t.hasArcType(), b = _.right - v - (y ? 0 : t.getCurrentPaddingByDirection("left", e)), x = b > 0 ? b : 0;
		return n.add(Y.svgLeft, x), x;
	},
	previewResize() {
		let e = this, { state: t, $el: n } = e, { current: r } = t, i = e.getCurrentWidth(), a = e.getCurrentHeight();
		if (i && a && r.width && r.height && (i !== r.width || a !== r.height)) {
			if (t.isCanvasMode) {
				let t = e.canvasEngine?.canvas;
				if (!t) return;
				n.chart.style("min-height", `${a}px`), t.style.width = `${i}px`, t.style.height = `${Math.max(0, a - (e.getCanvasBottomLegendHeight?.() ?? 0))}px`;
			} else if (n.svg) n.svg.attr("viewBox", `0 0 ${r.width} ${r.height}`).attr("preserveAspectRatio", "none").attr("width", i).attr("height", a);
			else return;
			t.resizePreview = !0;
		}
	},
	clearResizePreview() {
		let { config: e, state: t, $el: n } = this;
		t.resizePreview && (t.resizePreview = !1, !t.isCanvasMode && n.svg && e.resize_auto !== "viewBox" && n.svg.attr("viewBox", null).attr("preserveAspectRatio", null));
	},
	updateDimension(e) {
		let t = this, { config: n, state: { hasAxis: r, isCanvasMode: i }, $el: a } = t;
		r && !e && t.axis.x && n.axis_rotated && t.axis.subX?.create(a.axis.subX), t.updateScales(e), i ? t.resizeCanvas?.() : (t.updateSvgSize(), t.transformAll(!1));
	},
	updateSvgSize() {
		let e = this, { config: t, state: { clip: n, current: r, hasAxis: i, width: a, height: o }, $el: { svg: s } } = e;
		if (!s) e.resizeCanvas?.();
		else if (e.clearResizePreview(), t.resize_auto === "viewBox" ? s.attr("viewBox", `0 0 ${r.width} ${r.height}`) : s.attr("width", r.width).attr("height", r.height), i) {
			let t = s.select(`.${Mr.brush} .overlay`), r = {
				width: 0,
				height: 0
			};
			t.size() && (r.width = +t.attr("width"), r.height = +t.attr("height")), s.selectAll([`#${n.id}`, `#${n.idGrid}`]).select("rect").attr("width", a).attr("height", o), s.select(`#${n.idXAxis}`).select("rect").call(e.setXAxisClipPath.bind(e)), s.select(`#${n.idYAxis}`).select("rect").call(e.setYAxisClipPath.bind(e)), n.idSubchart && s.select(`#${n.idSubchart}`).select("rect").attr("width", a).attr("height", r.height);
		}
	},
	getCurrentPaddingByDirection(e, t = !1, n = !1) {
		let r = this, { config: i, $el: a, state: { hasAxis: o, isCanvasMode: s } } = r, c = i.axis_rotated, l = i.padding?.mode === "fit", u = _(i[`padding_${e}`]) ? i[`padding_${e}`] : void 0, d = o ? {
			top: c ? "y2" : null,
			bottom: c ? "y" : "x",
			left: c ? "x" : "y",
			right: c ? null : "y2"
		}[e] : null, f = /^(left|right)$/.test(e), p = d && i[`axis_${d}_inner`], m = d && i[`axis_${d}_show`], h = d ? i[`axis_${d}_axes`].length : 0, g = d ? f ? r.getAxisWidthByAxisId(d, t) : r.getHorizontalAxisHeight(d) : 0, y = 0;
		!l && f && (g = x(g));
		let b = o && f && (p || v(u) && !m) ? 0 : l ? (m ? g : 0) + (u ?? 0) : v(u) ? g : u;
		return f && o ? (d && (l || p) && i[`axis_${d}_label`].text && (b += r.axis.getAxisLabelPosition(d).isOuter ? 20 : 0), e === "right" ? (b += c ? !l && v(u) ? 10 : 2 : !m || p ? l ? 2 : 1 : 0, b += n ? r.axis.getXAxisTickTextY2Overflow(20) : 0) : e === "left" && c && v(u) && (b = i.axis_x_show ? l ? g : Math.max(g, 40) : 1)) : e === "top" ? ((a.title && a.title.node() || s && i.title_text) && (b += r.getTitlePadding()), y = c && !p ? h : 0) : e === "bottom" && o && c && !m && (b += 1), b + g * h - y;
	},
	getCurrentPadding(e = !1) {
		let t = this, [n, r, i, a] = [
			"top",
			"bottom",
			"left",
			"right"
		].map((n) => t.getCurrentPaddingByDirection(n, null, e));
		return {
			top: n,
			bottom: r,
			left: i,
			right: a
		};
	},
	getResettedPadding(e) {
		let { config: t } = this, n = _(e), r = n ? 0 : {};
		return t.padding === !1 ? !n && Object.keys(e).forEach((n) => {
			r[n] = !E(t.data_labels) && t.data_labels !== !1 && n === "top" ? e[n] : 0;
		}) : r = e, r;
	},
	updateSizes(e) {
		let t = this, { config: n, state: r, $el: { legend: i } } = t, a = n.axis_rotated, o = t.hasArcType() || r.hasFunnel || r.hasTreemap, s = n.padding?.mode === "fit";
		!e && t.setContainerSize();
		let c = i ? t.getLegendWidth() : 0, l = i ? t.getLegendHeight() : 0, u = {
			width: c,
			height: l
		};
		!o && n.axis_x_show && n.axis_x_tick_autorotate && t.updateXAxisTickClip();
		let d = {
			right: n.legend_show && r.isLegendRight ? c + (s ? 0 : 20) : 0,
			bottom: !n.legend_show || r.isLegendRight || r.isLegendInset ? 0 : l
		}, f = a || o ? 0 : t.getHorizontalAxisHeight("x"), p = n.subchart_axis_x_show && n.subchart_axis_x_tick_text_show ? f : 30, m = n.subchart_show && !o ? n.subchart_size_height + p : 0, h = t.hasType("gauge") && n.arc_needle_show && !n.gauge_fullCircle && !n.gauge_label_show ? 10 : 0, g = t.getCurrentPadding(!0);
		if (r.margin = !o && a ? {
			top: g.top,
			right: o ? 0 : g.right + d.right,
			bottom: d.bottom + g.bottom,
			left: m + (o ? 0 : g.left)
		} : {
			top: (s ? 0 : 4) + g.top,
			right: o ? 0 : g.right + d.right,
			bottom: h + m + d.bottom + g.bottom,
			left: o ? 0 : g.left
		}, r.margin = t.getResettedPadding(r.margin), r.margin2 = a ? {
			top: r.margin.top,
			right: NaN,
			bottom: 20 + d.bottom,
			left: t.state.rotatedPadding.left
		} : {
			top: r.current.height - m - d.bottom,
			right: NaN,
			bottom: p + d.bottom,
			left: r.margin.left
		}, r.margin3 = {
			top: 0,
			right: NaN,
			bottom: 0,
			left: 0
		}, t.updateSizeForLegend?.(u), r.width = r.current.width - r.margin.left - r.margin.right, r.height = r.current.height - r.margin.top - r.margin.bottom, r.width < 0 && (r.width = 0), r.height < 0 && (r.height = 0), r.width2 = a ? r.margin.left - r.rotatedPadding.left - r.rotatedPadding.right : r.width, r.height2 = a ? r.height : r.current.height - r.margin2.top - r.margin2.bottom, r.width2 < 0 && (r.width2 = 0), r.height2 < 0 && (r.height2 = 0), t.hasArcType()) {
			let e = t.hasType("gauge"), i = n.legend_show && r.isLegendRight, a = (r.hasRadar && t.cache.get(Y.radarTextWidth)) ?? 0;
			r.arcWidth = r.width - (i ? u.width + 10 : 0) - a, r.arcHeight = r.height - (i && !e ? 0 : 10), n.arc_rangeText_values?.length && (e ? (r.arcWidth -= 25, r.arcHeight -= 10, r.margin.left += 10) : (r.arcHeight -= 20, r.margin.top += 10)), e && !n.gauge_fullCircle && (r.arcHeight += r.height - t.getPaddingBottomForGauge()), t.updateRadius?.();
		}
		r.isLegendRight && o && (r.margin3.left = r.arcWidth / 2 + r.radiusExpanded * 1.1);
	}
}, If = {
	setCssRule(e, t, n, r) {
		let i = this, { config: a, state: { cssRule: o, style: s } } = i;
		return a.boost_useCssRule ? (a) => {
			a.each((a) => {
				let c = r && r?.call(i, a), l = `${e ? `.${K.shapes + i.getTargetSelectorSuffix(a.id)}` : ""}${t}`;
				t in o && s.sheet.deleteRule(o[l]), i.state.cssRule[l] = sr(s, l, n.filter(Boolean).map((e) => g(c) && e.indexOf(":") === -1 ? `${e}: ${c}` : e || ""));
			});
		} : () => {};
	},
	getStylePropValue(e) {
		let { config: { boost_useCssRule: t } } = this;
		return t ? null : h(e) ? e.bind(this) : e;
	}
};
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/ChartInternal/internals/text.util.js
function Lf(e) {
	let t = "middle";
	return e > 0 && e <= 170 ? t = "end" : e > 190 && e <= 360 && (t = "start"), t;
}
function Rf(e, t, n, r, i) {
	let a = this, { value: o } = e, s = a.isCandlestickType(e), c = _(o) && o < 0 || s && !a.getCandlestickData(e)?._isUp, { x: l, y: u } = t;
	return r ? n === "start" ? (l += c ? 0 : 8, u += 4) : n === "middle" ? (l += 8, u -= 8) : n === "end" && (c && (l -= 8), u += 4) : (n === "start" ? (l += 4, c && (u += 16)) : n === "middle" ? u -= 8 : n === "end" && (l -= 4, c && (u += 16)), i && (u += c ? -17 : s ? 13 : 7)), {
		x: l,
		y: u
	};
}
function zf(e, t) {
	let n = this.config.data_labels_position, { id: r, index: i, value: a } = e;
	return (h(n) ? n.bind(this.api)(t, a, r, i, this.$el.text) : (r in n ? n[r] : n)[t]) ?? 0;
}
function Bf(e, t, n) {
	let { config: r, $T: i } = this, a = r.axis_rotated, { border: { padding: o = "3 5", radius: s = 10, stroke: c = "#000", strokeWidth: l = 1, fill: u = "none" } } = r.data_labels, d = Re(o), f = r.data_labels.border !== !0, p = or(e), m = L(e.previousElementSibling);
	(m.empty() || m.node()?.tagName !== "rect" || !m.attr("class")?.includes(n)) && (m = L(e.parentNode).insert("rect", () => e).attr("class", `${q.textBorderRect} ${n}`).attr("width", p.width + (f ? d.left + d.right : 0)).attr("height", p.height + (f ? d.top + d.bottom : 0)), f && m.style("fill", u).style("stroke", c).style("stroke-width", `${l}px`).attr("rx", s).attr("ry", s)), i(m).attr("x", t.x - (f ? d.left : 0) - (a ? 0 : p.width / 2)).attr("y", t.y - (f ? d.top : 0) - p.height / 4 * 3.2);
}
function Vf(e = 0, t) {
	let { config: n } = this;
	return e >= (n[`${t}_label_threshold`] || 0);
}
function Hf() {
	let e = this, { $el: { text: t }, config: n } = e;
	(e.state.arcWidth ? e.getArcLabelConfig("image") : n.data_labels.image) && t.filter(function() {
		let e = this.previousElementSibling;
		return !e || e.tagName !== "image" || !e.classList.contains(q.textLabelImage);
	}).each(function(t) {
		let n = Uf.call(e, t);
		if (!n) return;
		let { url: r, width: i, height: a, pos: o } = n;
		r && L(this.parentNode)?.insert("image", `${this.getAttribute("class")?.replace(/(?:^(.)|\s)/g, ".$1") ?? "text"}`).style("opacity", "0").attr("href", (e) => Ie(r, { ID: "id" in e ? e.id : e.data.id })).attr("class", q.textLabelImage).style("pointer-events", "none").attr("width", i).attr("height", a).attr("transform", o ? `translate(${o.x ?? 0} ${o.y ?? 0})` : null);
	});
}
function Uf(e) {
	let t = this, { config: n, state: r } = t, i = r.arcWidth ? t.getArcLabelConfig("image") : n.data_labels.image;
	if (h(i)) return i.call(t.api, e.value, e.id, e.index) ?? {
		url: "",
		width: 0,
		height: 0,
		pos: {
			x: 0,
			y: 0
		}
	};
	if (i) {
		let { url: e = "", width: t = 0, height: n = 0, pos: r } = i;
		return {
			url: e,
			width: t,
			height: n,
			pos: r
		};
	}
	return null;
}
function Wf(e, t, n) {
	let r = this, { config: i, state: { arcWidth: a, hasTreemap: o } } = r, s = i.axis_rotated, c = L(e.previousElementSibling), l = (e) => (a ? e.textContent : e.style.opacity !== "0" && e.style.fillOpacity !== "0") && this.previousElementSibling?.tagName !== "image";
	if (!c.empty() && c.node()?.tagName === "image") {
		let i = n || R(e), a = c.attr("width") / 2, u = c.attr("height") / 2, d = t.x - a, f = t.y - u - i.height / 2;
		s ? t.x += a : (o && (d = -a, f = -(u * 2 + i.height)), r.hasType("pie") || r.hasType("polar") || (t.y += u)), r.$T(c).style("opacity", l(e) ? null : "0").attr("x", d).attr("y", f);
	}
}
function Gf(e) {
	return Ve(e, (e) => e, (e) => or(e, !0));
}
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/ChartInternal/internals/text.js
var Kf = {
	opacityForText(e) {
		let t = this;
		return t.isBarType(e) && !Vf.call(t, Math.abs(t.getRatio("bar", e)), "bar") ? "0" : t.hasDataLabel() ? null : "0";
	},
	initText() {
		let { $el: e } = this;
		e.main.select(`.${z.chart}`).append("g").attr("class", q.chartTexts).style("pointer-events", e.funnel || e.treemap ? "none" : null);
	},
	updateTargetsForText(e) {
		let t = this, n = t.getChartClass("Text"), r = t.getClass("texts", "id"), i = t.classFocus.bind(t);
		t.$el.main.select(`.${q.chartTexts}`).selectAll(`.${q.chartText}`).data(t.filterNullish(e)).attr("class", (e) => `${n(e)}${i(e)}`.trim()).enter().append("g").style("opacity", "0").attr("class", n).call(t.setCssRule(!0, ` .${q.text}`, ["fill", "pointer-events:none"], t.updateTextColor)).append("g").attr("class", r);
	},
	updateText() {
		let e = this, { $el: t, $T: n, config: r, axis: i } = e, a = e.getClass("text", "index"), o = r.data_labels.centered, s = t.main.selectAll(`.${q.texts}`).selectAll(`.${q.text}`).data(e.labelishData.bind(e));
		n(s.exit()).style("fill-opacity", "0").remove(), t.text = s.enter().append("text").merge(s).attr("class", a).attr("text-anchor", (t) => {
			let n = r[`axis_${i?.getId(t.id)}_inverted`] ? t.value > 0 : t.value < 0;
			if (e.isCandlestickType(t)) n = !e.getCandlestickData(t)?._isUp;
			else if (e.isTreemapType(t)) return o ? "middle" : "start";
			return r.axis_rotated ? n ? "end" : "start" : "middle";
		}).style("fill", e.getStylePropValue(e.updateTextColor)).style("fill-opacity", "0").each(function(t, n, r) {
			let i = L(this), { value: a } = t;
			if (e.isBubbleZType(t)) a = e.getBubbleZData(a, "z");
			else if (e.isCandlestickType(t)) {
				let n = e.getCandlestickData(t);
				n && (a = n.close);
			}
			a = e.isTreemapType(t) ? e.treemapDataLabelFormat(t)(i) : e.dataLabelFormat(t.id)(a, t.id, t.index, r), _(a) ? this.textContent = a : nr(i, a, void 0, !0);
		}), Hf.call(e);
	},
	updateTextColor(e) {
		let t = this, { config: n } = t, r = n.data_labels_colors, i = t.isArcType(e) && !t.isRadarType(e) || t.isFunnelType(e) || t.isTreemapType(e) ? null : t.color(e), a;
		if (g(r)) a = r;
		else if (k(r)) {
			let { id: t } = e.data || e;
			a = r[t];
		} else h(r) && (a = r.bind(t.api)(i, e));
		if (t.isCandlestickType(e) && !h(r) && !t.getCandlestickData(e)?._isUp) {
			let t = n.candlestick_color_down;
			a = k(t) ? t[e.id] : t;
		}
		return a || i;
	},
	updateTextBGColor(e, t) {
		let n = this, { $el: { defs: r } } = n, i = "";
		if (t) {
			let a = g(t) ? "" : n.getTargetSelectorSuffix("id" in e ? e.id : e.data.id), o = r.select(["filter[id*='labels-bg", "']"].join(a));
			if (o.size() && (i = `url(#${o.attr("id")})`), h(t)) {
				n.generateTextBGColorFilter(t);
				let r = n.color(e), a = t.bind(n.api)(r, e);
				a ? o.select("feFlood").attr("flood-color", a) : i = "";
			}
		}
		return i || null;
	},
	redrawText(e, t, n, r) {
		let i = this, { $T: a, axis: o, config: s, state: { hasTreemap: c } } = i, l = Pe(!0), u = s.axis_rotated, d = s.data_labels.rotate, f = Lf(d), p = d ? `rotate(${d})` : "", m = i.$el.text.style("fill", i.getStylePropValue(i.updateTextColor)).attr("filter", (e) => i.updateTextBGColor.bind(i)(e, s.data_labels_backgroundColors)).style("fill-opacity", n ? 0 : i.opacityForText.bind(i)), h = /* @__PURE__ */ new Map(), g = [];
		return m.each(function(e) {
			let t = this;
			h.set(t, { rect: R(t) }), s.data_labels.centered && (i.isBarType(e) || i.isTreemapType(e)) && g.push(t);
		}), g.length > 0 && Gf(g).forEach((e, t) => {
			let n = h.get(t);
			n && (n.bbox = e);
		}), m.each(function(n, m) {
			let g = h.get(this), _ = a(c && this.childElementCount ? this.parentNode : this, !!(r && (this.getAttribute("x") || this.getAttribute("transform"))), l), v = s[`axis_${o?.getId(n.id)}_inverted`], y = {
				x: e.call(this, n, m, g),
				y: t.call(this, n, m, g)
			};
			d && (y = Rf.bind(i)(n, y, f, u, v), _.attr("text-anchor", f)), Wf.call(i, this, y, g?.rect), this.childElementCount || d ? _.attr("transform", `translate(${y.x} ${y.y}) ${p}`) : _.attr("x", y.x).attr("y", y.y), s.data_labels.border && Bf.call(i, _.node(), y, `${q.textBorderRect}-${m}`);
		}), !0;
	},
	getTextRect(e, t) {
		let n = this, r, i, a;
		Array.isArray(e) ? r = `${Y.textRect}-${e.join("_")}` : (i = e.node?.() ?? e, /text/i.test(i.tagName) || (i = i.querySelector("text")), a = i.textContent, r = `${Y.textRect}-${a.replace(/\W/g, "_")}`);
		let o = n.cache.get(r) || [];
		return o.length === 0 && ((n.$el.svg || n.$el.chart.select("svg")).selectAll(`.${z.dummy}`).data(a ? [a] : e).enter().append("text").style("visibility", "hidden").style("font", i ? L(i).style("font") : null).classed(t || z.dummy, !0).text((e) => e).each(function(e, t) {
			o[t] = R(this);
		}).remove(), n.cache.add(r, o)), o.length > 1 ? o : o[0];
	},
	generateXYForText(e, t) {
		let n = this, { state: { hasRadar: r, hasFunnel: i, hasTreemap: a } } = n, o = Object.keys(e), s = {}, c = t ? n.getXForText : n.getYForText;
		return i && o.push("funnel"), r && o.push("radar"), a && o.push("treemap"), o.forEach((t) => {
			s[t] = n[`generateGet${Ce(t)}Points`](e[t], !1);
		}), function(e, t, r) {
			let i = n.isAreaType(e) && "area" || n.isBarType(e) && "bar" || n.isCandlestickType(e) && "candlestick" || n.isFunnelType(e) && "funnel" || n.isRadarType(e) && "radar" || n.isTreemapType(e) && "treemap" || "line";
			return c.call(n, s[i](e, t), e, this, r);
		};
	},
	getCenteredTextPos(e, t, n, r, i) {
		let a = this, { config: o } = a, s = o.axis_rotated, c = a.isBarType(e), l = a.isTreemapType(e);
		if (o.data_labels.centered && (c || l)) {
			let o = i?.bbox || or(n);
			if (c) {
				let n = a.getRangedData(e, null, "bar") >= 0;
				if (s) {
					let e = (n ? t[1][1] - t[0][1] : t[0][1] - t[1][1]) / 2 + o.width / 2;
					return n ? -e - 3 : e + 2;
				}
				{
					let e = (n ? t[0][1] - t[1][1] : t[1][1] - t[0][1]) / 2 + o.height / 2;
					return n ? e : -e - 2;
				}
			}
			if (l) {
				let e = o.y - (n.childElementCount ? 0 : +(n.getAttribute("y") || 0));
				return r === "x" ? (t[1][0] - t[0][0]) / 2 : (t[1][1] - t[0][1]) / 2 - e - o.height / 2;
			}
		}
		return 0;
	},
	getXForText(e, t, n, r) {
		let i = this, { config: a } = i, o = a.axis_rotated, s = i.isFunnelType(t), c = i.isTreemapType(t), l = e ? e[0][0] : 0;
		if (i.isCandlestickType(t)) o ? l = i.getCandlestickData(t)?._isUp ? e[2][2] + 4 : e[2][1] - 4 : l += (e[1][0] - l) / 2;
		else if (s) {
			if (e) l = e[2]?.[0] ?? l;
			else return fr(n, "x");
		} else if (c) l += a.data_labels.centered ? 0 : 5;
		else if (o) {
			let n = a[`axis_${i.axis.getId(t.id)}_inverted`], r = i.isBarType(t) ? 4 : 6, o = t.value;
			l = e[2][1], l += r * ((n ? o > 0 : o < 0) ? -1 : 1);
		} else l = i.hasType("bar") ? (e[2][0] + e[0][0]) / 2 : l;
		return (o || c || s) && (l += i.getCenteredTextPos(t, e, n, "x", r)), l + zf.call(this, t, "x");
	},
	getYForText(e, t, n, r) {
		let i = this, { axis: a, config: o, state: s } = i, c = o.axis_rotated, l = o[`axis_${a?.getId(t.id)}_inverted`], u = i.isBarType(t), d = i.isFunnelType(t), f = i.isTreemapType(t), p = o.point_r, m = r?.rect || R(n), { value: h } = t, g = 3, v;
		if (i.isCandlestickType(t)) h = i.getCandlestickData(t), c ? (v = e[0][0], v += (e[1][0] - v) / 2 + g) : (v = h && h._isUp ? e[2][2] - g : e[2][1] + g * 4, l && (v += 15 * (h._isUp ? 1 : -1)));
		else if (d) {
			if (e) v = (e[2]?.[1] ?? e[0][1]) + m.height / 2 - 3;
			else return fr(n, "y");
		} else if (f) v = e[0][1] + (o.data_labels.centered ? 0 : m.height + 5);
		else if (c) v = (e[0][0] + e[2][0] + m.height * .6) / 2;
		else if (v = e[2][1], _(p) && p > 5 && (i.isLineType(t) || i.isScatterType(t)) && (g += o.point_r / 2.3), h < 0 || h === 0 && !s.hasPositiveValue && s.hasNegativeValue) v += l ? u ? -3 : -5 : m.height + (u ? -g : g);
		else {
			let e = -g * 2;
			u ? e = -g : i.isBubbleType(t) && (e = g), l && (e = u ? 10 : 15), v += e;
		}
		return (!c || f) && (v += i.getCenteredTextPos(t, e, n, "y", r)), v + zf.call(this, t, "y");
	},
	markOverlapped(e, t, n) {
		let r = t.$el.arcs.selectAll(n), i = r.filter((t) => t.data.id !== e), a = r.filter((t) => t.data.id === e), o = dr(a.node()), s = (e, t) => Math.sqrt(e * e + t * t);
		if (!a.node()) return;
		let c = parseInt(a.style("font-size"), 10), l = [];
		i.each(function() {
			let e = dr(this), t = s(o.e, o.f) > s(e.e, e.f) ? a : L(this), n = Math.ceil(Math.abs(o.e - e.e)) < Math.ceil(t.node().getComputedTextLength()), r = Math.ceil(Math.abs(o.f - e.f)) < c;
			l.push({
				node: this,
				overlaps: n && r
			});
		}), l.forEach(({ node: e, overlaps: t }) => {
			L(e).classed(q.TextOverlapping, t);
		});
	},
	undoMarkOverlapped(e, t) {
		e.$el.arcs.selectAll(t).each(function() {
			Zn([this, this.previousSibling]).classed(q.TextOverlapping, !1);
		});
	}
};
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/ChartInternal/internals/title.js
function qf(e = "left", t) {
	let n = _(t);
	return e.includes("center") ? n ? t / 2 : "middle" : e.includes("right") ? n ? t : "end" : n ? 0 : "start";
}
function Jf(e) {
	let { config: t, $el: n } = e, r = e.canvasTheme?.style?.title?.font || e.canvasTheme?.style?.label?.font || "14px sans-serif", i = n.chart?.node?.(), a = i?.ownerDocument;
	if (i && a && t.title_text) {
		let e = a.createElementNS("http://www.w3.org/2000/svg", "svg"), n = a.createElementNS("http://www.w3.org/2000/svg", "text");
		e.style.cssText = "position:absolute;visibility:hidden;left:-10000px;top:-10000px;", n.setAttribute("class", q.title), n.style.font = r, n.textContent = String(t.title_text), e.appendChild(n), i.appendChild(e);
		let o = R(n).height;
		if (e.remove(), o) return o;
	}
	return t.title_text ? parseFloat(r) || 14 : 0;
}
var Yf = {
	initTitle() {
		let { config: e, $el: t } = this;
		e.title_text && (t.title = t.svg.append("g"), nr(t.title.append("text").style("text-anchor", qf(e.title_position)).attr("class", q.title), e.title_text, [.3, 1.5]));
	},
	redrawTitle() {
		let e = this, { config: t, state: { current: n }, $el: { title: r } } = e;
		if (r) {
			let i = qf(t.title_position, n.width), a = (t.title_padding.top || 0) + e.getTextRect(e.$el.title, q.title).height;
			r.attr("transform", `translate(${i}, ${a})`);
		}
	},
	getCanvasTitleHeight() {
		return Jf(this);
	},
	getTitlePadding() {
		let e = this, { $el: { title: t }, config: n, state: r } = e, i = n.title_padding.top || 0, a = n.title_padding.bottom || 0;
		if (r.isCanvasMode && n.title_text) return i + e.getCanvasTitleHeight() + a;
		if (!t?.node()) return i + a;
		let o = t.node(), s = fr(o, "y");
		if (s) {
			let e = or(o);
			return s + e.y + e.height + a;
		}
		return i + e.getTextRect(t, q.title).height + a;
	}
}, Xf = /(\r?\n|\t)/g, Zf = /{{(.*)}}/, Qf = {
	initTooltip() {
		let e = this, { config: t, $el: n } = e;
		n.tooltip = L(t.tooltip_contents.bindto), n.tooltip.empty() && (n.tooltip = n.chart.append("div").attr("class", Nr.tooltipContainer).style("position", "absolute").style("pointer-events", "none").style("display", "none")), e.bindTooltipResizePos();
	},
	initShowTooltip() {
		let e = this, { config: t, $el: n, state: { hasAxis: r, hasRadar: i } } = e;
		if (t.tooltip_init_show) {
			let a = !(r || i);
			e.axis?.isTimeSeries() && g(t.tooltip_init_x) && (t.tooltip_init_x = Le.call(e, t.tooltip_init_x)), e.api.tooltip.show({ data: { [a ? "index" : "x"]: t.tooltip_init_x } });
			let o = t.tooltip_init_position;
			if (!t.tooltip_contents.bindto && !E(o)) {
				let { top: e = 0, left: t = 50 } = o;
				n.tooltip.style("top", g(e) ? e : `${e}px`).style("left", g(t) ? t : `${t}px`).style("display", null);
			}
		}
	},
	getTooltipHTML(...e) {
		let t = this, { api: n, config: r } = t;
		return ve(h(r.tooltip_contents) ? r.tooltip_contents.bind(n)(...e) : t.getTooltipContent(...e));
	},
	getTooltipContent(e, t, n, r) {
		let i = this, { api: a, config: o, state: s, $el: c } = i, l = o.tooltip_format_title, u = o.tooltip_format_name, d = o.tooltip_format_value, f = h(l) ? l.bind(a) : t, p = h(u) ? u.bind(a) : ((e) => e), g = h(d) ? d.bind(a) : null, _ = (e, t, r, a) => {
			let o = g;
			return o ||= s.hasTreemap || i.isStackNormalized() && (!i.isStackNormalizedPerGroup() || i.isGrouped(r)) ? (e, t) => `${(t * 100).toFixed(2)}%` : n, o(e, t, r, a);
		}, y = o.tooltip_order, b = (e) => i.axis && i.isBubbleZType(e) ? i.getBubbleZData(e.value, "z") : i.getBaseValue(e), x = i.levelColor ? (e) => i.levelColor(e.value) : (e) => r(e), S = o.tooltip_contents, C = S.template, w = i.mapToTargetIds();
		if (y === null && o.data_groups.length) {
			let t = i.orderTargets(i.data.targets).map((e) => e.id).reverse();
			e.sort((e, n) => {
				let r = e ? e.value : null, i = n ? n.value : null;
				return r > 0 && i > 0 && (r = e.id ? t.indexOf(e.id) : null, i = n.id ? t.indexOf(n.id) : null), r - i;
			});
		} else if (/^(asc|desc)$/.test(y)) {
			let t = y === "asc";
			e.sort((e, n) => {
				let r = e ? b(e) : null, i = n ? b(n) : null;
				return t ? r - i : i - r;
			});
		} else h(y) && e.sort(y.bind(a));
		let T = i.getTooltipContentTemplate(C), E = e.length, D, O, A, j, M = 0;
		for (; M < E; M++) {
			O = e[M];
			let t = O && b(O);
			if (O && (t || t === 0)) {
				if (v(D)) {
					let e = (s.hasAxis || s.hasRadar) && f(O.x);
					D = Ie(T[0], {
						CLASS_TOOLTIP: Nr.tooltip,
						TITLE: m(e) ? C ? e : `<tr><th colspan="2">${e}</th></tr>` : ""
					});
				}
				if (!O.ratio && c.arcs && (A = ["arc", i.$el.arcs.select(`path.${B.arc}-${O.id}`).data()[0]], O.ratio = i.getRatio(...A)), A = [
					O.ratio,
					O.id,
					O.index
				], i.isAreaRangeType(O)) {
					let [e, t] = ["high", "low"].map((e) => _(i.getRangedData(O, e), ...A));
					j = `<b>Mid:</b> ${_(b(O), ...A)} <b>High:</b> ${e} <b>Low:</b> ${t}`;
				} else if (i.isCandlestickType(O)) {
					let [e, t, n, r, a] = [
						"open",
						"high",
						"low",
						"close",
						"volume"
					].map((e) => i.getRangedData(O, e, "candlestick") ? _(i.getRangedData(O, e, "candlestick"), ...A) : void 0);
					j = `<b>Open:</b> ${e} <b>High:</b> ${t} <b>Low:</b> ${n} <b>Close:</b> ${r}${a ? ` <b>Volume:</b> ${a}` : ""}`;
				} else if (i.isBarRangeType(O)) {
					let { value: e, id: t, index: n } = O;
					j = `${_(e, void 0, t, n)}`;
				} else j = _(b(O), ...A);
				if (j !== void 0) {
					if (O.name === null) continue;
					let e = p(O.name ?? O.id, ...A), t = x(O), n = {
						CLASS_TOOLTIP_NAME: Nr.tooltipName + i.getTargetSelectorSuffix(O.id),
						COLOR: C || !i.patterns ? t : `<svg><rect style="fill:${t}" width="10" height="10"></rect></svg>`,
						NAME: e,
						VALUE: j
					};
					if (C && k(S.text)) {
						let e = w.indexOf(O.id);
						Object.keys(S.text).forEach((t) => {
							n[t] = S.text[t][e];
						});
					}
					D += Ie(T[1], n);
				}
			}
		}
		return `${D}</table>`;
	},
	getTooltipContentTemplate(e) {
		return (e || `<table class="{=CLASS_TOOLTIP}"><tbody>
				{=TITLE}
				{{<tr class="{=CLASS_TOOLTIP_NAME}">
					<td class="name">${this.patterns ? "{=COLOR}" : "<span style=\"background-color:{=COLOR}\"></span>"}{=NAME}</td>
					<td class="value">{=VALUE}</td>
				</tr>}}
			</tbody></table>`).replace(Xf, "").split(Zf);
	},
	setTooltipPosition(e, t) {
		let n = this, { config: r, scale: i, state: a, $el: { eventRect: o, tooltip: s, svg: c } } = n, { bindto: l } = r.tooltip_contents, u = r.axis_rotated, d = s?.datum();
		if (!l && d) {
			let l = e ?? d.data, [f, p] = ar(a.event, t ?? o?.node()), m = {
				x: f,
				y: p
			};
			if (a.hasAxis && i.x && d && "x" in d) {
				let e = (e = 0, t, r = "y") => {
					let o = i[t ? n.axis?.getId(t) : r];
					return o ? o(e) + (u ? a.margin.left : a.margin.top) : 0;
				};
				m.xAxis = i.x(d.x) + (r.tooltip_position ? u ? a.margin.top : a.margin.left : 0), m.yAxis = l.length === 1 ? e(l[0].value, l[0].id) : e;
			}
			let { width: h = 0, height: g = 0 } = d, _ = r.tooltip_position?.bind(n.api)(l, h, g, o?.node(), m) ?? (c && pr(c) ? n.getTooltipPositionViewBox.bind(n)(h, g, m) : n.getTooltipPosition.bind(n)(h, g, m));
			["top", "left"].forEach((e) => {
				let t = _[e];
				s.style(e, `${t}px`), e === "left" && !d.xPosInPercent && (d.xPosInPercent = t / a.current.width * 100);
			});
		}
	},
	getTooltipPositionViewBox(e, t, n) {
		let r = this, { $el: { eventRect: i, svg: a }, config: o, state: s } = r, c = o.axis_rotated, l = r.hasArcType() || s.hasFunnel || s.hasTreemap, u = (l ? a : i)?.node() ?? s.event.target, { x: d, y: f } = n;
		s.hasAxis && (d = c ? d : n.xAxis, f = c ? n.xAxis : f);
		let p = ur(u, d, f, !1), m = R(u), h = ur(u, 20, 0, !1).x, g = p.y, _ = p.x + e / 2 + h;
		return l && (s.hasFunnel || s.hasTreemap || s.hasRadar ? (_ -= e / 2 + h, g += t) : (g += m.height / 2, _ += m.width / 2 - (e - h))), _ + e > m.width && (_ = m.width - e - h), g + t > m.height && (g -= t * 2), {
			top: g,
			left: _
		};
	},
	getTooltipPosition(e, t, n) {
		let r = this, { config: i, scale: a, state: o } = r, { width: s, height: c, current: l, hasFunnel: u, hasRadar: d, hasTreemap: f, isLegendRight: p, inputType: m } = o, h = r.hasType("gauge") && !i.gauge_fullCircle, g = i.axis_rotated, _ = r.hasArcType(), v = o.isCanvasMode ? 0 : r.getSvgLeft(!0), y = v + l.width - r.getCurrentPaddingByDirection("right"), { x: b, y: x } = n;
		if (d) b += b >= s / 2 ? 15 : -(e + 15), x += 15;
		else if (_) {
			if (m !== "touch") {
				let e = r.getTitlePadding?.() ?? 0;
				e && h && i.arc_rangeText_values?.length && (e += 10), b += (s - (p ? r.getLegendWidth() : 0)) / 2, x += (h ? c : c / 2 + t) + e;
			}
		} else if (u || f) x += t;
		else {
			let e = {
				top: r.getCurrentPaddingByDirection("top", !0),
				left: r.getCurrentPaddingByDirection("left", !0)
			};
			g ? (b += v + e.left + 20, x = e.top + n.xAxis + 20, y -= v) : (b = v + e.left + 20 + (a.zoom ? b : n.xAxis), x += e.top - 5);
		}
		if (b + e + 15 > y && (b -= e + (u || f || _ ? 0 : g ? 40 : 38)), x + t > l.height) {
			let e = f ? t + 10 : 30;
			x -= h ? t * 1.5 : t + e;
		}
		let S = {
			top: x,
			left: b
		};
		return S.top < 0 && (S.top = 0), S.left < 0 && (S.left = 0), S;
	},
	showTooltip(e, t) {
		let n = this, { config: r, $el: { tooltip: i } } = n;
		if (!i || !r.tooltip_show) return;
		let a = null, o = 0, s = `${n.data.targets.length}:`, c;
		for (let t = 0; t < e.length; t++) {
			let r = e[t];
			t > 0 && (s += ","), s += `${r?.index}|${r?.id}|${r?.value}`, !c && r && (c = r), r && m(n.getBaseValue(r)) ? (o++, a?.push(r)) : a ||= e.slice(0, t);
		}
		if (o === 0 || !c) return;
		let l = i.datum(), u = a;
		if (!l || l.current !== s) {
			let { index: t, x: a } = c;
			u ||= e.slice(), P(r.tooltip_onshow, n.api, e), i.html(n.getTooltipHTML(e, n.axis ? n.axis.getXAxisTickFormat() : n.categoryName.bind(n), n.getDefaultValueFormat(), n.color)).style("display", null).style("visibility", null), i.datum({
				index: t,
				x: a,
				current: s,
				data: e,
				width: i.property("offsetWidth"),
				height: i.property("offsetHeight")
			}), P(r.tooltip_onshown, n.api, e), n._handleLinkedCharts(!0, t);
		}
		n.setTooltipPosition(u || e, t);
	},
	bindTooltipResizePos() {
		let { resizeFunction: e, state: t, $el: { tooltip: n } } = this;
		e.add(() => {
			if (n.style("display") === "block") {
				let { current: e } = t, { width: r, xPosInPercent: i } = n.datum(), a = e.width / 100 * i, o = e.width - (a + r);
				o < 0 && (a += o), n.style("left", `${a}px`);
			}
		});
	},
	hideTooltip(e) {
		let { api: t, config: n, $el: { tooltip: r } } = this;
		if (r && r.style("display") !== "none" && (!n.tooltip_doNotHide || e)) {
			let e = r.datum().data ?? [];
			P(n.tooltip_onhide, t, e), r.style("display", "none").datum(null), P(n.tooltip_onhidden, t, e);
		}
	},
	_handleLinkedCharts(e, t) {
		let n = this, { charts: r, config: i, state: { event: a } } = n;
		if (a?.isTrusted && i.tooltip_linked && r.length > 1) {
			let a = i.tooltip_linked_name;
			r.filter((e) => e !== n.api).forEach((n) => {
				let { config: r, $el: i, state: o } = n.internal, s = r.tooltip_linked, c = r.tooltip_linked_name, u = l.body.contains(i.chart.node());
				if (s && a === c && u) {
					let r = t !== i.tooltip.data()[0]?.index;
					try {
						e && r && o.isCanvasMode ? n.internal.showCanvasLinkedTooltip?.(t) : n.tooltip[e && r ? "show" : "hide"]({ index: t });
					} catch {}
				}
			});
		}
	},
	updateTooltipOnRedraw(e, t) {
		let n = this, { config: r, $el: { eventRect: i, svg: a, tooltip: o }, state: { event: s, hasAxis: c, hasRadar: u, hasTreemap: d } } = n;
		if (!n.state.isCanvasMode && o?.style("display") === "block" && s) {
			let o = e ?? (u ? a : i)?.node();
			if (c || u) {
				if (n.isMultipleX()) n.selectRectForMultipleXs(o, !1);
				else {
					let e = t ?? n.getDataIndexFromEvent(s);
					t === -1 ? n.api.tooltip.hide() : (n.selectRectForSingle(o, e), n.setExpand(e, null, !0));
				}
			} else {
				let { clientX: e, clientY: t } = s;
				setTimeout(() => {
					let r = [e, t].every(Number.isFinite) && l.elementFromPoint(e, t), i = r && L(r).datum();
					if (i) {
						let e = n.hasArcType() ? n.convertToArcData(n.updateAngle(i)) : i?.data;
						d && (r = a.node()), e && n.showTooltip([e], r);
					} else n.api.tooltip.hide();
				}, r.transition_duration);
			}
		}
	}
}, $f = {
	getTranslate(e, t = 0) {
		let n = this, { config: r, state: i } = n, a = r.axis_rotated, o = 0, s, c;
		if (t && /^(x|y2?)$/.test(e) && (o = n.getAxisSize(e) * t), e === "main") s = S(i.margin.left), c = S(i.margin.top);
		else if (e === "context") s = S(i.margin2.left), c = S(i.margin2.top);
		else if (e === "legend") s = i.margin3.left, c = i.margin3.top;
		else if (e === "x") s = a ? -o : 0, c = a ? 0 : i.height + o;
		else if (e === "y") s = a ? 0 : -o, c = a ? i.height + o : 0;
		else if (e === "y2") s = a ? 0 : i.width + o, c = a ? -o - 1 : 0;
		else if (e === "subX") s = 0, c = a ? 0 : i.height2;
		else if (e === "subY") s = 0, c = a ? i.height2 : 0;
		else if (e === "subY2") s = a ? 0 : i.width2, c = a ? -1 : 0;
		else if (e === "arc") s = i.arcWidth / 2, c = i.arcHeight / 2, r.arc_rangeText_values?.length && (c += 5 + (n.hasType("gauge") && r.title_text ? 10 : 0));
		else if (e === "polar") s = i.arcWidth / 2, c = i.arcHeight / 2;
		else if (e === "radar") {
			let [e, t] = n.getRadarSize();
			s = i.width / 2 - e, c = i.height / 2 - t;
		}
		return `translate(${s}, ${c})`;
	},
	transformMain(e, t) {
		let n = this, { $el: { main: r }, $T: i } = n, a = t?.axisX ? t.axisX : i(r.select(`.${V.axisX}`), e), o = t?.axisY ? t.axisY : i(r.select(`.${V.axisY}`), e), s = t?.axisY2 ? t.axisY2 : i(r.select(`.${V.axisY2}`), e);
		i(r, e).attr("transform", n.getTranslate("main")), a.attr("transform", n.getTranslate("x")), o.attr("transform", n.getTranslate("y")), s.attr("transform", n.getTranslate("y2")), r.select(`.${B.chartArcs}`).attr("transform", n.getTranslate("arc"));
	},
	transformAll(e, t) {
		let n = this, { config: r, state: { hasAxis: i, hasFunnel: a, hasTreemap: o, isCanvasMode: s }, $el: c } = n;
		s || (!a && !o && n.transformMain(e, t), i && r.subchart_show && n.transformContext(e, t), c.legend && n.transformLegend(e));
	}
}, ep = /* @__PURE__ */ new Set([
	"basis",
	"basis-closed",
	"basis-open",
	"bundle",
	"cardinal",
	"cardinal-closed",
	"cardinal-open",
	"catmull-rom",
	"catmull-rom-closed",
	"catmull-rom-open",
	"linear",
	"linear-closed",
	"monotone-x",
	"monotone-y",
	"natural"
]), tp = {
	isValidChartType(e) {
		return !!(e && Object.values(I).indexOf(e) > -1);
	},
	getSubchartTargetType(e) {
		let t = this, { config: n } = t, r = g(e) ? e : e?.id, i = n.subchart_types || {}, a = n.subchart_type, o = n.data_types || {}, s = r && i[r];
		return s && t.isValidChartType(s) ? s : a && t.isValidChartType(a) ? a : r && o[r] || n.data_type || I.LINE;
	},
	getTargetType(e) {
		let { config: t } = this, n = g(e) ? e : e?.id;
		return n && t.data_types?.[n] || t.data_type || I.LINE;
	},
	getSubchartSourceTargetType(e) {
		let { state: t } = this, n = g(e) ? e : e?.id;
		return n && t.subchartSourceTypes?.[n] || this.getTargetType(e);
	},
	isSubchartSourceTypeOf(e, t) {
		let n = this.getSubchartSourceTargetType(e);
		return O(t) ? t.indexOf(n) >= 0 : n === t;
	},
	withSubchartTypeContext(e) {
		let t = this, { config: n, data: r, state: i } = t, a = n.data_type, o = n.data_types, s = i.current.types, c = i.subchartSourceTypes, l = {}, u = {}, d = n.subchart_type;
		t.mapToIds(r.targets).forEach((e) => {
			u[e] = t.getTargetType(e), l[e] = t.getSubchartTargetType(e);
		}), n.data_type = d && t.isValidChartType(d) ? d : a, n.data_types = l, i.current.types = [], i.subchartSourceTypes = u;
		try {
			return e();
		} finally {
			n.data_type = a, n.data_types = o, i.current.types = s, i.subchartSourceTypes = c;
		}
	},
	setTargetType(e, t) {
		let n = this, { config: r, state: { withoutFadeIn: i } } = n;
		n.mapToTargetIds(e).forEach((e) => {
			i[e] = t === r.data_types[e], r.data_types[e] = t;
		}), e || (r.data_type = t);
	},
	updateTypesElements() {
		let e = this, { state: { current: t } } = e;
		Object.keys(I).forEach((n) => {
			let r = I[n], i = e.hasType(r, null, !0), a = t.types.indexOf(r);
			a === -1 && i ? t.types.push(r) : a > -1 && !i && t.types.splice(a, 1);
		}), e.setChartElements();
	},
	hasType(e, t, n = !1) {
		let r = this, { config: i, state: { current: a } } = r, o = i.data_types, s = t || r.data.targets;
		return !n && a.types?.indexOf(e) > -1 ? !0 : s?.length ? s.some((t) => {
			let n = o[t.id];
			return n === e || !n && e === "line";
		}) : Object.keys(o).length ? Object.values(o).some((t) => t === e) : i.data_type === e;
	},
	hasTypeOf(e, t, n = []) {
		return e in Ge && !Ge[e].filter((e) => n.indexOf(e) === -1).every((e) => !this.hasType(e, t));
	},
	isTypeOf(e, t) {
		let n = g(e) ? e : e.id, r = this.config && this.getTargetType(n);
		return O(t) ? t.indexOf(r) >= 0 : r === t;
	},
	hasPointType() {
		let e = this;
		return e.hasTypeOf("Line") || e.hasType("bubble") || e.hasType("scatter");
	},
	hasArcType(e, t) {
		return this.hasTypeOf("Arc", e, t);
	},
	hasMultiArcGauge() {
		return this.hasType("gauge") && this.config.gauge_type === "multi";
	},
	isLineType(e) {
		let t = g(e) ? e : e.id;
		return !this.config.data_types[t] || this.isTypeOf(t, Ge.Line);
	},
	isStepType(e) {
		return this.isTypeOf(e, Ge.Step);
	},
	isSplineType(e) {
		return this.isTypeOf(e, Ge.Spline);
	},
	isAreaType(e) {
		return this.isTypeOf(e, Ge.Area);
	},
	isAreaRangeType(e) {
		return this.isTypeOf(e, Ge.AreaRange);
	},
	isBarType(e) {
		return this.isTypeOf(e, "bar");
	},
	isBubbleType(e) {
		return this.isTypeOf(e, "bubble");
	},
	isCandlestickType(e) {
		return this.isTypeOf(e, "candlestick");
	},
	isScatterType(e) {
		return this.isTypeOf(e, "scatter");
	},
	isTreemapType(e) {
		return this.isTypeOf(e, "treemap");
	},
	isPieType(e) {
		return this.isTypeOf(e, "pie");
	},
	isFunnelType(e) {
		return this.isTypeOf(e, "funnel");
	},
	isGaugeType(e) {
		return this.isTypeOf(e, "gauge");
	},
	isDonutType(e) {
		return this.isTypeOf(e, "donut");
	},
	isPolarType(e) {
		return this.isTypeOf(e, "polar");
	},
	isRadarType(e) {
		return this.isTypeOf(e, "radar");
	},
	isArcType(e) {
		return this.isPieType(e) || this.isDonutType(e) || this.isGaugeType(e) || this.isPolarType(e) || this.isRadarType(e);
	},
	isCirclePoint(e) {
		let { config: t } = this, n = t.point_pattern;
		return e?.tagName === "circle" || t.point_type === "circle" && (!n || O(n) && n.length === 0);
	},
	lineData(e) {
		return this.isLineType(e) ? [e] : [];
	},
	arcData(e) {
		return this.isArcType(e.data) ? [e] : [];
	},
	labelishData(e) {
		return this.isBarType(e) || this.isLineType(e) || this.isScatterType(e) || this.isBubbleType(e) || this.isCandlestickType(e) || this.isFunnelType(e) || this.isRadarType(e) || this.isTreemapType(e) ? e.values.filter((e) => _(e.value) || !!e.value) : [];
	},
	barLineBubbleData(e) {
		return this.isBarType(e) || this.isLineType(e) || this.isBubbleType(e) ? e.values : [];
	},
	isInterpolationType(e) {
		return ep.has(e);
	}
};
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/constant.js
function $(e) {
	return function() {
		return e;
	};
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/math.js
var np = Math.abs, rp = Math.atan2, ip = Math.cos, ap = Math.max, op = Math.min, sp = Math.sin, cp = Math.sqrt, lp = Math.PI, up = lp / 2, dp = 2 * lp;
function fp(e) {
	return e > 1 ? 0 : e < -1 ? lp : Math.acos(e);
}
function pp(e) {
	return e >= 1 ? up : e <= -1 ? -up : Math.asin(e);
}
// node_modules/.pnpm/d3-path@3.1.0/node_modules/d3-path/src/path.js
var mp = Math.PI, hp = 2 * mp, gp = 1e-6, _p = hp - gp;
function vp(e) {
	this._ += e[0];
	for (let t = 1, n = e.length; t < n; ++t) this._ += arguments[t] + e[t];
}
function yp(e) {
	let t = Math.floor(e);
	if (!(t >= 0)) throw Error(`invalid digits: ${e}`);
	if (t > 15) return vp;
	let n = 10 ** t;
	return function(e) {
		this._ += e[0];
		for (let t = 1, r = e.length; t < r; ++t) this._ += Math.round(arguments[t] * n) / n + e[t];
	};
}
var bp = class {
	constructor(e) {
		this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = "", this._append = e == null ? vp : yp(e);
	}
	moveTo(e, t) {
		this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +t}`;
	}
	closePath() {
		this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
	}
	lineTo(e, t) {
		this._append`L${this._x1 = +e},${this._y1 = +t}`;
	}
	quadraticCurveTo(e, t, n, r) {
		this._append`Q${+e},${+t},${this._x1 = +n},${this._y1 = +r}`;
	}
	bezierCurveTo(e, t, n, r, i, a) {
		this._append`C${+e},${+t},${+n},${+r},${this._x1 = +i},${this._y1 = +a}`;
	}
	arcTo(e, t, n, r, i) {
		if (e = +e, t = +t, n = +n, r = +r, i = +i, i < 0) throw Error(`negative radius: ${i}`);
		let a = this._x1, o = this._y1, s = n - e, c = r - t, l = a - e, u = o - t, d = l * l + u * u;
		if (this._x1 === null) this._append`M${this._x1 = e},${this._y1 = t}`;
		else if (d > gp) {
			if (!(Math.abs(u * s - c * l) > gp) || !i) this._append`L${this._x1 = e},${this._y1 = t}`;
			else {
				let f = n - a, p = r - o, m = s * s + c * c, h = f * f + p * p, g = Math.sqrt(m), _ = Math.sqrt(d), v = i * Math.tan((mp - Math.acos((m + d - h) / (2 * g * _))) / 2), y = v / _, b = v / g;
				Math.abs(y - 1) > gp && this._append`L${e + y * l},${t + y * u}`, this._append`A${i},${i},0,0,${+(u * f > l * p)},${this._x1 = e + b * s},${this._y1 = t + b * c}`;
			}
		}
	}
	arc(e, t, n, r, i, a) {
		if (e = +e, t = +t, n = +n, a = !!a, n < 0) throw Error(`negative radius: ${n}`);
		let o = n * Math.cos(r), s = n * Math.sin(r), c = e + o, l = t + s, u = 1 ^ a, d = a ? r - i : i - r;
		this._x1 === null ? this._append`M${c},${l}` : (Math.abs(this._x1 - c) > gp || Math.abs(this._y1 - l) > gp) && this._append`L${c},${l}`, n && (d < 0 && (d = d % hp + hp), d > _p ? this._append`A${n},${n},0,1,${u},${e - o},${t - s}A${n},${n},0,1,${u},${this._x1 = c},${this._y1 = l}` : d > gp && this._append`A${n},${n},0,${+(d >= mp)},${u},${this._x1 = e + n * Math.cos(i)},${this._y1 = t + n * Math.sin(i)}`);
	}
	rect(e, t, n, r) {
		this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +t}h${n = +n}v${+r}h${-n}Z`;
	}
	toString() {
		return this._;
	}
};
bp.prototype;
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/path.js
function xp(e) {
	let t = 3;
	return e.digits = function(n) {
		if (!arguments.length) return t;
		if (n == null) t = null;
		else {
			let e = Math.floor(n);
			if (!(e >= 0)) throw RangeError(`invalid digits: ${n}`);
			t = e;
		}
		return e;
	}, () => new bp(t);
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/arc.js
function Sp(e) {
	return e.innerRadius;
}
function Cp(e) {
	return e.outerRadius;
}
function wp(e) {
	return e.startAngle;
}
function Tp(e) {
	return e.endAngle;
}
function Ep(e) {
	return e && e.padAngle;
}
function Dp(e, t, n, r, i, a, o, s) {
	var c = n - e, l = r - t, u = o - i, d = s - a, f = d * c - u * l;
	if (!(f * f < 1e-12)) return f = (u * (t - a) - d * (e - i)) / f, [e + f * c, t + f * l];
}
function Op(e, t, n, r, i, a, o) {
	var s = e - n, c = t - r, l = (o ? a : -a) / cp(s * s + c * c), u = l * c, d = -l * s, f = e + u, p = t + d, m = n + u, h = r + d, g = (f + m) / 2, _ = (p + h) / 2, v = m - f, y = h - p, b = v * v + y * y, x = i - a, S = f * h - m * p, C = (y < 0 ? -1 : 1) * cp(ap(0, x * x * b - S * S)), w = (S * y - v * C) / b, T = (-S * v - y * C) / b, E = (S * y + v * C) / b, D = (-S * v + y * C) / b, O = w - g, k = T - _, A = E - g, j = D - _;
	return O * O + k * k > A * A + j * j && (w = E, T = D), {
		cx: w,
		cy: T,
		x01: -u,
		y01: -d,
		x11: w * (i / x - 1),
		y11: T * (i / x - 1)
	};
}
function kp() {
	var e = Sp, t = Cp, n = $(0), r = null, i = wp, a = Tp, o = Ep, s = null, c = xp(l);
	function l() {
		var l, u, d = +e.apply(this, arguments), f = +t.apply(this, arguments), p = i.apply(this, arguments) - up, m = a.apply(this, arguments) - up, h = np(m - p), g = m > p;
		if (s ||= l = c(), f < d && (u = f, f = d, d = u), !(f > 1e-12)) s.moveTo(0, 0);
		else if (h > dp - 1e-12) s.moveTo(f * ip(p), f * sp(p)), s.arc(0, 0, f, p, m, !g), d > 1e-12 && (s.moveTo(d * ip(m), d * sp(m)), s.arc(0, 0, d, m, p, g));
		else {
			var _ = p, v = m, y = p, b = m, x = h, S = h, C = o.apply(this, arguments) / 2, w = C > 1e-12 && (r ? +r.apply(this, arguments) : cp(d * d + f * f)), T = op(np(f - d) / 2, +n.apply(this, arguments)), E = T, D = T, O, k;
			if (w > 1e-12) {
				var A = pp(w / d * sp(C)), j = pp(w / f * sp(C));
				(x -= A * 2) > 1e-12 ? (A *= g ? 1 : -1, y += A, b -= A) : (x = 0, y = b = (p + m) / 2), (S -= j * 2) > 1e-12 ? (j *= g ? 1 : -1, _ += j, v -= j) : (S = 0, _ = v = (p + m) / 2);
			}
			var M = f * ip(_), N = f * sp(_), ee = d * ip(b), te = d * sp(b);
			if (T > 1e-12) {
				var ne = f * ip(v), re = f * sp(v), ie = d * ip(y), ae = d * sp(y), oe;
				if (h < lp) {
					if (oe = Dp(M, N, ie, ae, ne, re, ee, te)) {
						var se = M - oe[0], ce = N - oe[1], le = ne - oe[0], ue = re - oe[1], de = 1 / sp(fp((se * le + ce * ue) / (cp(se * se + ce * ce) * cp(le * le + ue * ue))) / 2), fe = cp(oe[0] * oe[0] + oe[1] * oe[1]);
						E = op(T, (d - fe) / (de - 1)), D = op(T, (f - fe) / (de + 1));
					} else E = D = 0;
				}
			}
			S > 1e-12 ? D > 1e-12 ? (O = Op(ie, ae, M, N, f, D, g), k = Op(ne, re, ee, te, f, D, g), s.moveTo(O.cx + O.x01, O.cy + O.y01), D < T ? s.arc(O.cx, O.cy, D, rp(O.y01, O.x01), rp(k.y01, k.x01), !g) : (s.arc(O.cx, O.cy, D, rp(O.y01, O.x01), rp(O.y11, O.x11), !g), s.arc(0, 0, f, rp(O.cy + O.y11, O.cx + O.x11), rp(k.cy + k.y11, k.cx + k.x11), !g), s.arc(k.cx, k.cy, D, rp(k.y11, k.x11), rp(k.y01, k.x01), !g))) : (s.moveTo(M, N), s.arc(0, 0, f, _, v, !g)) : s.moveTo(M, N), !(d > 1e-12) || !(x > 1e-12) ? s.lineTo(ee, te) : E > 1e-12 ? (O = Op(ee, te, ne, re, d, -E, g), k = Op(M, N, ie, ae, d, -E, g), s.lineTo(O.cx + O.x01, O.cy + O.y01), E < T ? s.arc(O.cx, O.cy, E, rp(O.y01, O.x01), rp(k.y01, k.x01), !g) : (s.arc(O.cx, O.cy, E, rp(O.y01, O.x01), rp(O.y11, O.x11), !g), s.arc(0, 0, d, rp(O.cy + O.y11, O.cx + O.x11), rp(k.cy + k.y11, k.cx + k.x11), g), s.arc(k.cx, k.cy, E, rp(k.y11, k.x11), rp(k.y01, k.x01), !g))) : s.arc(0, 0, d, b, y, g);
		}
		if (s.closePath(), l) return s = null, l + "" || null;
	}
	return l.centroid = function() {
		var n = (+e.apply(this, arguments) + +t.apply(this, arguments)) / 2, r = (+i.apply(this, arguments) + +a.apply(this, arguments)) / 2 - lp / 2;
		return [ip(r) * n, sp(r) * n];
	}, l.innerRadius = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : $(+t), l) : e;
	}, l.outerRadius = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : $(+e), l) : t;
	}, l.cornerRadius = function(e) {
		return arguments.length ? (n = typeof e == "function" ? e : $(+e), l) : n;
	}, l.padRadius = function(e) {
		return arguments.length ? (r = e == null ? null : typeof e == "function" ? e : $(+e), l) : r;
	}, l.startAngle = function(e) {
		return arguments.length ? (i = typeof e == "function" ? e : $(+e), l) : i;
	}, l.endAngle = function(e) {
		return arguments.length ? (a = typeof e == "function" ? e : $(+e), l) : a;
	}, l.padAngle = function(e) {
		return arguments.length ? (o = typeof e == "function" ? e : $(+e), l) : o;
	}, l.context = function(e) {
		return arguments.length ? (s = e ?? null, l) : s;
	}, l;
}
Array.prototype.slice;
function Ap(e) {
	return typeof e == "object" && "length" in e ? e : Array.from(e);
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/linear.js
function jp(e) {
	this._context = e;
}
jp.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._point = 0;
	},
	lineEnd: function() {
		(this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
	},
	point: function(e, t) {
		switch (e = +e, t = +t, this._point) {
			case 0:
				this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
				break;
			case 1: this._point = 2;
			default: this._context.lineTo(e, t);
		}
	}
};
function Mp(e) {
	return new jp(e);
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/point.js
function Np(e) {
	return e[0];
}
function Pp(e) {
	return e[1];
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/line.js
function Fp(e, t) {
	var n = $(!0), r = null, i = Mp, a = null, o = xp(s);
	e = typeof e == "function" ? e : e === void 0 ? Np : $(e), t = typeof t == "function" ? t : t === void 0 ? Pp : $(t);
	function s(s) {
		var c, l = (s = Ap(s)).length, u, d = !1, f;
		for (r ?? (a = i(f = o())), c = 0; c <= l; ++c) !(c < l && n(u = s[c], c, s)) === d && ((d = !d) ? a.lineStart() : a.lineEnd()), d && a.point(+e(u, c, s), +t(u, c, s));
		if (f) return a = null, f + "" || null;
	}
	return s.x = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : $(+t), s) : e;
	}, s.y = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : $(+e), s) : t;
	}, s.defined = function(e) {
		return arguments.length ? (n = typeof e == "function" ? e : $(!!e), s) : n;
	}, s.curve = function(e) {
		return arguments.length ? (i = e, r != null && (a = i(r)), s) : i;
	}, s.context = function(e) {
		return arguments.length ? (e == null ? r = a = null : a = i(r = e), s) : r;
	}, s;
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/area.js
function Ip(e, t, n) {
	var r = null, i = $(!0), a = null, o = Mp, s = null, c = xp(l);
	e = typeof e == "function" ? e : e === void 0 ? Np : $(+e), t = typeof t == "function" ? t : $(t === void 0 ? 0 : +t), n = typeof n == "function" ? n : n === void 0 ? Pp : $(+n);
	function l(l) {
		var u, d, f, p = (l = Ap(l)).length, m, h = !1, g, _ = Array(p), v = Array(p);
		for (a ?? (s = o(g = c())), u = 0; u <= p; ++u) {
			if (!(u < p && i(m = l[u], u, l)) === h) {
				if (h = !h) d = u, s.areaStart(), s.lineStart();
				else {
					for (s.lineEnd(), s.lineStart(), f = u - 1; f >= d; --f) s.point(_[f], v[f]);
					s.lineEnd(), s.areaEnd();
				}
			}
			h && (_[u] = +e(m, u, l), v[u] = +t(m, u, l), s.point(r ? +r(m, u, l) : _[u], n ? +n(m, u, l) : v[u]));
		}
		if (g) return s = null, g + "" || null;
	}
	function u() {
		return Fp().defined(i).curve(o).context(a);
	}
	return l.x = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : $(+t), r = null, l) : e;
	}, l.x0 = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : $(+t), l) : e;
	}, l.x1 = function(e) {
		return arguments.length ? (r = e == null ? null : typeof e == "function" ? e : $(+e), l) : r;
	}, l.y = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : $(+e), n = null, l) : t;
	}, l.y0 = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : $(+e), l) : t;
	}, l.y1 = function(e) {
		return arguments.length ? (n = e == null ? null : typeof e == "function" ? e : $(+e), l) : n;
	}, l.lineX0 = l.lineY0 = function() {
		return u().x(e).y(t);
	}, l.lineY1 = function() {
		return u().x(e).y(n);
	}, l.lineX1 = function() {
		return u().x(r).y(t);
	}, l.defined = function(e) {
		return arguments.length ? (i = typeof e == "function" ? e : $(!!e), l) : i;
	}, l.curve = function(e) {
		return arguments.length ? (o = e, a != null && (s = o(a)), l) : o;
	}, l.context = function(e) {
		return arguments.length ? (e == null ? a = s = null : s = o(a = e), l) : a;
	}, l;
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/descending.js
function Lp(e, t) {
	return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/identity.js
function Rp(e) {
	return e;
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/pie.js
function zp() {
	var e = Rp, t = Lp, n = null, r = $(0), i = $(dp), a = $(0);
	function o(o) {
		var s, c = (o = Ap(o)).length, l, u, d = 0, f = Array(c), p = Array(c), m = +r.apply(this, arguments), h = Math.min(dp, Math.max(-dp, i.apply(this, arguments) - m)), g, _ = Math.min(Math.abs(h) / c, a.apply(this, arguments)), v = _ * (h < 0 ? -1 : 1), y;
		for (s = 0; s < c; ++s) (y = p[f[s] = s] = +e(o[s], s, o)) > 0 && (d += y);
		for (t == null ? n != null && f.sort(function(e, t) {
			return n(o[e], o[t]);
		}) : f.sort(function(e, n) {
			return t(p[e], p[n]);
		}), s = 0, u = d ? (h - c * v) / d : 0; s < c; ++s, m = g) l = f[s], y = p[l], g = m + (y > 0 ? y * u : 0) + v, p[l] = {
			data: o[l],
			index: s,
			value: y,
			startAngle: m,
			endAngle: g,
			padAngle: _
		};
		return p;
	}
	return o.value = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : $(+t), o) : e;
	}, o.sortValues = function(e) {
		return arguments.length ? (t = e, n = null, o) : t;
	}, o.sort = function(e) {
		return arguments.length ? (n = e, t = null, o) : n;
	}, o.startAngle = function(e) {
		return arguments.length ? (r = typeof e == "function" ? e : $(+e), o) : r;
	}, o.endAngle = function(e) {
		return arguments.length ? (i = typeof e == "function" ? e : $(+e), o) : i;
	}, o.padAngle = function(e) {
		return arguments.length ? (a = typeof e == "function" ? e : $(+e), o) : a;
	}, o;
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/noop.js
function Bp() {}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/basis.js
function Vp(e, t, n) {
	e._context.bezierCurveTo((2 * e._x0 + e._x1) / 3, (2 * e._y0 + e._y1) / 3, (e._x0 + 2 * e._x1) / 3, (e._y0 + 2 * e._y1) / 3, (e._x0 + 4 * e._x1 + t) / 6, (e._y0 + 4 * e._y1 + n) / 6);
}
function Hp(e) {
	this._context = e;
}
Hp.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
	},
	lineEnd: function() {
		switch (this._point) {
			case 3: Vp(this, this._x1, this._y1);
			case 2: this._context.lineTo(this._x1, this._y1);
		}
		(this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
	},
	point: function(e, t) {
		switch (e = +e, t = +t, this._point) {
			case 0:
				this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
				break;
			case 1:
				this._point = 2;
				break;
			case 2: this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
			default: Vp(this, e, t);
		}
		this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
	}
};
function Up(e) {
	return new Hp(e);
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/basisClosed.js
function Wp(e) {
	this._context = e;
}
Wp.prototype = {
	areaStart: Bp,
	areaEnd: Bp,
	lineStart: function() {
		this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN, this._point = 0;
	},
	lineEnd: function() {
		switch (this._point) {
			case 1:
				this._context.moveTo(this._x2, this._y2), this._context.closePath();
				break;
			case 2:
				this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3), this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3), this._context.closePath();
				break;
			case 3: this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4);
		}
	},
	point: function(e, t) {
		switch (e = +e, t = +t, this._point) {
			case 0:
				this._point = 1, this._x2 = e, this._y2 = t;
				break;
			case 1:
				this._point = 2, this._x3 = e, this._y3 = t;
				break;
			case 2:
				this._point = 3, this._x4 = e, this._y4 = t, this._context.moveTo((this._x0 + 4 * this._x1 + e) / 6, (this._y0 + 4 * this._y1 + t) / 6);
				break;
			default: Vp(this, e, t);
		}
		this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
	}
};
function Gp(e) {
	return new Wp(e);
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/basisOpen.js
function Kp(e) {
	this._context = e;
}
Kp.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
	},
	lineEnd: function() {
		(this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
	},
	point: function(e, t) {
		switch (e = +e, t = +t, this._point) {
			case 0:
				this._point = 1;
				break;
			case 1:
				this._point = 2;
				break;
			case 2:
				this._point = 3;
				var n = (this._x0 + 4 * this._x1 + e) / 6, r = (this._y0 + 4 * this._y1 + t) / 6;
				this._line ? this._context.lineTo(n, r) : this._context.moveTo(n, r);
				break;
			case 3: this._point = 4;
			default: Vp(this, e, t);
		}
		this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
	}
};
function qp(e) {
	return new Kp(e);
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/bundle.js
function Jp(e, t) {
	this._basis = new Hp(e), this._beta = t;
}
Jp.prototype = {
	lineStart: function() {
		this._x = [], this._y = [], this._basis.lineStart();
	},
	lineEnd: function() {
		var e = this._x, t = this._y, n = e.length - 1;
		if (n > 0) for (var r = e[0], i = t[0], a = e[n] - r, o = t[n] - i, s = -1, c; ++s <= n;) c = s / n, this._basis.point(this._beta * e[s] + (1 - this._beta) * (r + c * a), this._beta * t[s] + (1 - this._beta) * (i + c * o));
		this._x = this._y = null, this._basis.lineEnd();
	},
	point: function(e, t) {
		this._x.push(+e), this._y.push(+t);
	}
};
var Yp = (function e(t) {
	function n(e) {
		return t === 1 ? new Hp(e) : new Jp(e, t);
	}
	return n.beta = function(t) {
		return e(+t);
	}, n;
})(.85);
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/cardinal.js
function Xp(e, t, n) {
	e._context.bezierCurveTo(e._x1 + e._k * (e._x2 - e._x0), e._y1 + e._k * (e._y2 - e._y0), e._x2 + e._k * (e._x1 - t), e._y2 + e._k * (e._y1 - n), e._x2, e._y2);
}
function Zp(e, t) {
	this._context = e, this._k = (1 - t) / 6;
}
Zp.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0;
	},
	lineEnd: function() {
		switch (this._point) {
			case 2:
				this._context.lineTo(this._x2, this._y2);
				break;
			case 3: Xp(this, this._x1, this._y1);
		}
		(this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
	},
	point: function(e, t) {
		switch (e = +e, t = +t, this._point) {
			case 0:
				this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
				break;
			case 1:
				this._point = 2, this._x1 = e, this._y1 = t;
				break;
			case 2: this._point = 3;
			default: Xp(this, e, t);
		}
		this._x0 = this._x1, this._x1 = this._x2, this._x2 = e, this._y0 = this._y1, this._y1 = this._y2, this._y2 = t;
	}
};
var Qp = (function e(t) {
	function n(e) {
		return new Zp(e, t);
	}
	return n.tension = function(t) {
		return e(+t);
	}, n;
})(0);
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/cardinalClosed.js
function $p(e, t) {
	this._context = e, this._k = (1 - t) / 6;
}
$p.prototype = {
	areaStart: Bp,
	areaEnd: Bp,
	lineStart: function() {
		this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, this._point = 0;
	},
	lineEnd: function() {
		switch (this._point) {
			case 1:
				this._context.moveTo(this._x3, this._y3), this._context.closePath();
				break;
			case 2:
				this._context.lineTo(this._x3, this._y3), this._context.closePath();
				break;
			case 3: this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5);
		}
	},
	point: function(e, t) {
		switch (e = +e, t = +t, this._point) {
			case 0:
				this._point = 1, this._x3 = e, this._y3 = t;
				break;
			case 1:
				this._point = 2, this._context.moveTo(this._x4 = e, this._y4 = t);
				break;
			case 2:
				this._point = 3, this._x5 = e, this._y5 = t;
				break;
			default: Xp(this, e, t);
		}
		this._x0 = this._x1, this._x1 = this._x2, this._x2 = e, this._y0 = this._y1, this._y1 = this._y2, this._y2 = t;
	}
};
var em = (function e(t) {
	function n(e) {
		return new $p(e, t);
	}
	return n.tension = function(t) {
		return e(+t);
	}, n;
})(0);
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/cardinalOpen.js
function tm(e, t) {
	this._context = e, this._k = (1 - t) / 6;
}
tm.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0;
	},
	lineEnd: function() {
		(this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
	},
	point: function(e, t) {
		switch (e = +e, t = +t, this._point) {
			case 0:
				this._point = 1;
				break;
			case 1:
				this._point = 2;
				break;
			case 2:
				this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
				break;
			case 3: this._point = 4;
			default: Xp(this, e, t);
		}
		this._x0 = this._x1, this._x1 = this._x2, this._x2 = e, this._y0 = this._y1, this._y1 = this._y2, this._y2 = t;
	}
};
var nm = (function e(t) {
	function n(e) {
		return new tm(e, t);
	}
	return n.tension = function(t) {
		return e(+t);
	}, n;
})(0);
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/catmullRom.js
function rm(e, t, n) {
	var r = e._x1, i = e._y1, a = e._x2, o = e._y2;
	if (e._l01_a > 1e-12) {
		var s = 2 * e._l01_2a + 3 * e._l01_a * e._l12_a + e._l12_2a, c = 3 * e._l01_a * (e._l01_a + e._l12_a);
		r = (r * s - e._x0 * e._l12_2a + e._x2 * e._l01_2a) / c, i = (i * s - e._y0 * e._l12_2a + e._y2 * e._l01_2a) / c;
	}
	if (e._l23_a > 1e-12) {
		var l = 2 * e._l23_2a + 3 * e._l23_a * e._l12_a + e._l12_2a, u = 3 * e._l23_a * (e._l23_a + e._l12_a);
		a = (a * l + e._x1 * e._l23_2a - t * e._l12_2a) / u, o = (o * l + e._y1 * e._l23_2a - n * e._l12_2a) / u;
	}
	e._context.bezierCurveTo(r, i, a, o, e._x2, e._y2);
}
function im(e, t) {
	this._context = e, this._alpha = t;
}
im.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
	},
	lineEnd: function() {
		switch (this._point) {
			case 2:
				this._context.lineTo(this._x2, this._y2);
				break;
			case 3: this.point(this._x2, this._y2);
		}
		(this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
	},
	point: function(e, t) {
		if (e = +e, t = +t, this._point) {
			var n = this._x2 - e, r = this._y2 - t;
			this._l23_a = Math.sqrt(this._l23_2a = (n * n + r * r) ** +this._alpha);
		}
		switch (this._point) {
			case 0:
				this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
				break;
			case 1:
				this._point = 2;
				break;
			case 2: this._point = 3;
			default: rm(this, e, t);
		}
		this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = e, this._y0 = this._y1, this._y1 = this._y2, this._y2 = t;
	}
};
var am = (function e(t) {
	function n(e) {
		return t ? new im(e, t) : new Zp(e, 0);
	}
	return n.alpha = function(t) {
		return e(+t);
	}, n;
})(.5);
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/catmullRomClosed.js
function om(e, t) {
	this._context = e, this._alpha = t;
}
om.prototype = {
	areaStart: Bp,
	areaEnd: Bp,
	lineStart: function() {
		this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
	},
	lineEnd: function() {
		switch (this._point) {
			case 1:
				this._context.moveTo(this._x3, this._y3), this._context.closePath();
				break;
			case 2:
				this._context.lineTo(this._x3, this._y3), this._context.closePath();
				break;
			case 3: this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5);
		}
	},
	point: function(e, t) {
		if (e = +e, t = +t, this._point) {
			var n = this._x2 - e, r = this._y2 - t;
			this._l23_a = Math.sqrt(this._l23_2a = (n * n + r * r) ** +this._alpha);
		}
		switch (this._point) {
			case 0:
				this._point = 1, this._x3 = e, this._y3 = t;
				break;
			case 1:
				this._point = 2, this._context.moveTo(this._x4 = e, this._y4 = t);
				break;
			case 2:
				this._point = 3, this._x5 = e, this._y5 = t;
				break;
			default: rm(this, e, t);
		}
		this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = e, this._y0 = this._y1, this._y1 = this._y2, this._y2 = t;
	}
};
var sm = (function e(t) {
	function n(e) {
		return t ? new om(e, t) : new $p(e, 0);
	}
	return n.alpha = function(t) {
		return e(+t);
	}, n;
})(.5);
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/catmullRomOpen.js
function cm(e, t) {
	this._context = e, this._alpha = t;
}
cm.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
	},
	lineEnd: function() {
		(this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
	},
	point: function(e, t) {
		if (e = +e, t = +t, this._point) {
			var n = this._x2 - e, r = this._y2 - t;
			this._l23_a = Math.sqrt(this._l23_2a = (n * n + r * r) ** +this._alpha);
		}
		switch (this._point) {
			case 0:
				this._point = 1;
				break;
			case 1:
				this._point = 2;
				break;
			case 2:
				this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
				break;
			case 3: this._point = 4;
			default: rm(this, e, t);
		}
		this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = e, this._y0 = this._y1, this._y1 = this._y2, this._y2 = t;
	}
};
var lm = (function e(t) {
	function n(e) {
		return t ? new cm(e, t) : new tm(e, 0);
	}
	return n.alpha = function(t) {
		return e(+t);
	}, n;
})(.5);
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/linearClosed.js
function um(e) {
	this._context = e;
}
um.prototype = {
	areaStart: Bp,
	areaEnd: Bp,
	lineStart: function() {
		this._point = 0;
	},
	lineEnd: function() {
		this._point && this._context.closePath();
	},
	point: function(e, t) {
		e = +e, t = +t, this._point ? this._context.lineTo(e, t) : (this._point = 1, this._context.moveTo(e, t));
	}
};
function dm(e) {
	return new um(e);
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/monotone.js
function fm(e) {
	return e < 0 ? -1 : 1;
}
function pm(e, t, n) {
	var r = e._x1 - e._x0, i = t - e._x1, a = (e._y1 - e._y0) / (r || i < 0 && -0), o = (n - e._y1) / (i || r < 0 && -0), s = (a * i + o * r) / (r + i);
	return (fm(a) + fm(o)) * Math.min(Math.abs(a), Math.abs(o), .5 * Math.abs(s)) || 0;
}
function mm(e, t) {
	var n = e._x1 - e._x0;
	return n ? (3 * (e._y1 - e._y0) / n - t) / 2 : t;
}
function hm(e, t, n) {
	var r = e._x0, i = e._y0, a = e._x1, o = e._y1, s = (a - r) / 3;
	e._context.bezierCurveTo(r + s, i + s * t, a - s, o - s * n, a, o);
}
function gm(e) {
	this._context = e;
}
gm.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0;
	},
	lineEnd: function() {
		switch (this._point) {
			case 2:
				this._context.lineTo(this._x1, this._y1);
				break;
			case 3: hm(this, this._t0, mm(this, this._t0));
		}
		(this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
	},
	point: function(e, t) {
		var n = NaN;
		if (e = +e, t = +t, e !== this._x1 || t !== this._y1) {
			switch (this._point) {
				case 0:
					this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
					break;
				case 1:
					this._point = 2;
					break;
				case 2:
					this._point = 3, hm(this, mm(this, n = pm(this, e, t)), n);
					break;
				default: hm(this, this._t0, n = pm(this, e, t));
			}
			this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t, this._t0 = n;
		}
	}
};
function _m(e) {
	this._context = new vm(e);
}
(_m.prototype = Object.create(gm.prototype)).point = function(e, t) {
	gm.prototype.point.call(this, t, e);
};
function vm(e) {
	this._context = e;
}
vm.prototype = {
	moveTo: function(e, t) {
		this._context.moveTo(t, e);
	},
	closePath: function() {
		this._context.closePath();
	},
	lineTo: function(e, t) {
		this._context.lineTo(t, e);
	},
	bezierCurveTo: function(e, t, n, r, i, a) {
		this._context.bezierCurveTo(t, e, r, n, a, i);
	}
};
function ym(e) {
	return new gm(e);
}
function bm(e) {
	return new _m(e);
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/natural.js
function xm(e) {
	this._context = e;
}
xm.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x = [], this._y = [];
	},
	lineEnd: function() {
		var e = this._x, t = this._y, n = e.length;
		if (n) {
			if (this._line ? this._context.lineTo(e[0], t[0]) : this._context.moveTo(e[0], t[0]), n === 2) this._context.lineTo(e[1], t[1]);
			else for (var r = Sm(e), i = Sm(t), a = 0, o = 1; o < n; ++a, ++o) this._context.bezierCurveTo(r[0][a], i[0][a], r[1][a], i[1][a], e[o], t[o]);
		}
		(this._line || this._line !== 0 && n === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
	},
	point: function(e, t) {
		this._x.push(+e), this._y.push(+t);
	}
};
function Sm(e) {
	var t, n = e.length - 1, r, i = Array(n), a = Array(n), o = Array(n);
	for (i[0] = 0, a[0] = 2, o[0] = e[0] + 2 * e[1], t = 1; t < n - 1; ++t) i[t] = 1, a[t] = 4, o[t] = 4 * e[t] + 2 * e[t + 1];
	for (i[n - 1] = 2, a[n - 1] = 7, o[n - 1] = 8 * e[n - 1] + e[n], t = 1; t < n; ++t) r = i[t] / a[t - 1], a[t] -= r, o[t] -= r * o[t - 1];
	for (i[n - 1] = o[n - 1] / a[n - 1], t = n - 2; t >= 0; --t) i[t] = (o[t] - i[t + 1]) / a[t];
	for (a[n - 1] = (e[n] + i[n - 1]) / 2, t = 0; t < n - 1; ++t) a[t] = 2 * e[t + 1] - i[t + 1];
	return [i, a];
}
function Cm(e) {
	return new xm(e);
}
// node_modules/.pnpm/d3-shape@3.2.0/node_modules/d3-shape/src/curve/step.js
function wm(e, t) {
	this._context = e, this._t = t;
}
wm.prototype = {
	areaStart: function() {
		this._line = 0;
	},
	areaEnd: function() {
		this._line = NaN;
	},
	lineStart: function() {
		this._x = this._y = NaN, this._point = 0;
	},
	lineEnd: function() {
		0 < this._t && this._t < 1 && this._point === 2 && this._context.lineTo(this._x, this._y), (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line >= 0 && (this._t = 1 - this._t, this._line = 1 - this._line);
	},
	point: function(e, t) {
		switch (e = +e, t = +t, this._point) {
			case 0:
				this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
				break;
			case 1: this._point = 2;
			default: if (this._t <= 0) this._context.lineTo(this._x, t), this._context.lineTo(e, t);
			else {
				var n = this._x * (1 - this._t) + e * this._t;
				this._context.lineTo(n, this._y), this._context.lineTo(n, t);
			}
		}
		this._x = e, this._y = t;
	}
};
function Tm(e) {
	return new wm(e, .5);
}
function Em(e) {
	return new wm(e, 0);
}
function Dm(e) {
	return new wm(e, 1);
}
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/ChartInternal/shape/shape.js
var Om = {
	basis: Up,
	"basis-closed": Gp,
	"basis-open": qp,
	bundle: Yp,
	cardinal: Qp,
	"cardinal-closed": em,
	"cardinal-open": nm,
	"catmull-rom": am,
	"catmull-rom-closed": sm,
	"catmull-rom-open": lm,
	"monotone-x": ym,
	"monotone-y": bm,
	natural: Cm,
	"linear-closed": dm,
	linear: Mp,
	step: Tm,
	"step-after": Dm,
	"step-before": Em
};
function km(e, t) {
	return e.isLineType(t) || e.isScatterType?.(t) || e.isBubbleType?.(t);
}
function Am(e) {
	return (t) => km(e, t);
}
function jm(e, t, n) {
	let r = n ? Mm(e, t, n) : void 0;
	return _(r) ? r : e.isCandlestickType?.(t) ? e.getCandlestickData?.(t)?.close : e.getBaseValue(t);
}
function Mm(e, t, n) {
	if (!n || e.isCandlestickType?.(t) || !e.isSubchartSourceTypeOf?.(t, I.CANDLESTICK)) return;
	let r = e.getCandlestickData?.(t);
	if (r) return e.isBarType(t) ? _(r.open) && _(r.close) ? r._isUp ? r.close : r.open : void 0 : _(r.close) ? r.close : void 0;
}
function Nm(e, t, n) {
	return _(Mm(e, t, n)) && e.isBarType(t);
}
function Pm(e, t, n) {
	if (!Nm(e, t, n)) return null;
	if (e.getCandlestickData?.(t)?._isUp) return e.color(t);
	let r = e.config.candlestick_color_down;
	return (r && typeof r == "object" ? r[t.id] : r) || e.color(t);
}
function Fm(e) {
	let t = this, n;
	if (km(t, e)) {
		let e = Am(t);
		n = t.generateGetLinePoints(t.getShapeIndices(e), !1, e);
	} else t.isBarType(e) ? n = t.generateGetBarPoints(t.getShapeIndices(t.isBarType)) : t.isCandlestickType?.(e) && (n = t.generateGetCandlestickPoints?.(t.getShapeIndices(t.isCandlestickType)));
	return n;
}
function Im(e, t, n) {
	return this.config[t] ? this.getGradienColortUrl(e.id) : n(e);
}
function Lm(e) {
	let { $el: t } = this, { elKey: n, className: r, cssRules: i, position: a } = e, o = t.main.select(`.${J.chart}`);
	t[n] = a === "first" ? o.insert("g", ":first-child") : o.append("g"), t[n].attr("class", r), i?.length && t[n].call(this.setCssRule(!1, `.${r}`, i));
}
function Rm(e, t) {
	let n = this, { $el: r } = n, { type: i, elKey: a, containerClass: o, itemClass: s, initFn: c, withFocus: l = !0, withStyles: u = !0 } = t;
	r[a] || c.call(n);
	let d = n.getChartClass(i), f = l ? n.classFocus.bind(n) : () => "", p = r.main.select(`.${o}`).selectAll(`.${s}`).data(n.filterNullish(e)).attr("class", (e) => d(e) + f(e)).enter().append("g").attr("class", d);
	return u && p.style("opacity", "0").style("pointer-events", n.getStylePropValue("none")), p;
}
var zm = {
	getDrawShape() {
		let e = this, t = e.config.axis_rotated, { hasRadar: n, hasTreemap: r } = e.state, i = {
			type: {},
			indices: {},
			pos: {}
		};
		if (!r && [
			"bar",
			"candlestick",
			"line",
			"area"
		].forEach((t) => {
			let n = Ce(t);
			if (e.hasType(t) || e.hasTypeOf(n) || t === "line" && (e.hasType("bubble") || e.hasType("scatter"))) {
				let r = e.getShapeIndices(e[`is${n}Type`]), a = e[`generateDraw${n}`];
				i.indices[t] = r, i.type[t] = a ? a.bind(e)(r, !1) : void 0;
			}
		}), !e.hasArcType() || n || r) {
			let a, o, s, c;
			r || (a = n ? e.radarCircleX : t ? e.circleY : e.circleX, o = n ? e.radarCircleY : t ? e.circleX : e.circleY), r && e.state.isCanvasMode ? s = c = function() {} : (s = e.generateXYForText(i.indices, !0), c = e.generateXYForText(i.indices, !1)), i.pos = {
				xForText: s,
				yForText: c,
				cx: (a || function() {}).bind(e),
				cy: (o || function() {}).bind(e)
			};
		}
		return i;
	},
	getShapeIndices(e) {
		let t = this, { config: n } = t, r = n.data_xs, i = D(r), a = {}, o = i ? {} : 0;
		return i && De(Object.keys(r).map((e) => r[e])).forEach((e) => {
			o[e] = 0, a[e] = {};
		}), t.filterTargetsToShow(t.data.targets.filter(e, t)).forEach((e) => {
			let t = e.id in r ? r[e.id] : "", i = t ? a[t] : a;
			for (let r = 0, a; a = n.data_groups[r]; r++) if (!(a.indexOf(e.id) < 0)) for (let n = 0, r; r = a[n]; n++) {
				if (r in i) {
					i[e.id] = i[r];
					break;
				}
				e.id !== r && t && (i[r] = i[e.id] ?? o[t]);
			}
			v(i[e.id]) && (i[e.id] = t ? o[t]++ : o++, i.__max__ = (t ? o[t] : o) - 1);
		}), a;
	},
	getIndices(e, t, n) {
		let r = this, { data_xs: i, bar_indices_removeNull: a } = r.config, { id: o, index: s } = t;
		if (r.isBarType(o) && a) {
			let e = {};
			return r.getAllValuesOnIndex(s, !0).forEach((t, n) => {
				e[t.id] = n, e.__max__ = n;
			}), e;
		}
		return D(i) ? e[i[o]] : e;
	},
	getIndicesMax(e) {
		if (!D(this.config.data_xs)) return e.__max__;
		let t = 0;
		for (let n in e) t += e[n].__max__ || 0;
		return t;
	},
	getShapeX(e, t, n) {
		let r = this, { config: i, scale: a } = r, o = n ? a.subX : a.zoom || a.x, s = i.bar_overlap, c = i.bar_padding, l = (e, t) => e + t, u = w(e) && (e._$total.length ? e._$total.reduce(l) / 2 : 0), d = [];
		if (u && w(e) && e._$total.length) {
			let t = 0;
			for (let n of e._$total) t += n, d.push(t);
		}
		return (n) => {
			let i = r.getIndices(t, n, "getShapeX"), a = n.id in i ? i[n.id] : 0, f = (i.__max__ || 0) + 1, p = 0;
			if (D(n.x)) {
				let t = o(n.x, !0);
				if (u) {
					let r = e[n.id] || e._$width;
					p = s ? t - r / 2 : t - r + (d[a] ?? e._$total.slice(0, a + 1).reduce(l)) - u;
				} else p = t - (_(e) ? e : e._$width) * (f / 2 - (s ? 1 : a));
			}
			return e && p && f > 1 && c && (a && (p += c * a), f > 2 ? p -= (f - 1) * c / 2 : f === 2 && (p -= c / 2)), p;
		};
	},
	getShapeY(e) {
		let t = this, n = t.isStackNormalized();
		return (r) => {
			let { value: i } = r, a = e ? Mm(t, r, e) : void 0;
			return _(r) ? i = r : _(a) ? i = a : t.isAreaRangeType(r) ? i = t.getBaseValue(r, "mid") : n ? i = t.getRatio("index", r, !0) : t.isBubbleZType(r) ? i = t.getBubbleZData(r.value, "y") : t.isBarRangeType(r) && (i = i[1]), t.getYScaleById(r.id, e)(i);
		};
	},
	getShapeYMin(e, t = !1) {
		let n = this, r = n.axis.getId(e), [i] = n.getYScaleById(e, t).domain(), a = n.config[`axis_${r}_inverted`];
		return !n.isGrouped(e) && !a && i > 0 ? i : 0;
	},
	getShapeOffsetData(e, t) {
		let n = this, r = n.orderTargets(n.filterTargetsToShow(n.data.targets.filter(e, n))), i = n.state.dataGeneration, a = r.map((e) => e.id).join("_"), o = `${Y.shapeOffset}_${t ? "sub" : "main"}_${a}`, s = n.cache.get(o);
		if (s?.generation === i) return s;
		let c = n.isStackNormalized(), l = r.map((e) => {
			let r = e.values, i = {};
			n.isStepType(e) && (r = n.convertValuesToStep(r));
			let a = r.reduce((e, r) => {
				let a = Number(r.x), o = jm(n, r, t);
				return e[a] = r, i[a] = c ? n.getRatio("index", r, !0) : o, e;
			}, {});
			return {
				id: e.id,
				rowValues: r,
				rowValueMapByXValue: a,
				values: i
			};
		}), u = {
			generation: i,
			indexMapByTargetId: r.reduce((e, { id: t }, n) => (e[t] = n, e), {}),
			shapeOffsetTargets: l
		};
		return n.cache.add(o, u), u;
	},
	getShapeOffset(e, t, n) {
		let r = this, { shapeOffsetTargets: i, indexMapByTargetId: a } = r.getShapeOffsetData(e, n), o = r.config.data_groupsZeroAs, s = null;
		if (!r.config.bar_indices_removeNull) {
			s = /* @__PURE__ */ new Map();
			for (let e of i) {
				let n = r.getIndices(t, {
					id: e.id,
					index: 0
				});
				s.set(e.id, i.filter((t) => t.id !== e.id && n[t.id] === n[e.id]));
			}
		}
		return (e, c) => {
			let { id: l, value: u, x: d } = e, f = jm(r, e, n), p = r.getIndices(t, e), m = r.getYScaleById(l, n);
			if (r.isBarRangeType(e)) return m(u[0]);
			let h = Number(d), g = m(o === "zero" ? 0 : r.getShapeYMin(l, n)), v = g, y = s?.get(l) ?? i.filter((e) => e.id !== l && p[e.id] === p[l]);
			for (let e of y) {
				let { id: t, rowValueMapByXValue: i, rowValues: s, values: u } = e;
				if (a[t] < a[l]) {
					let e = u[h], t = s[c];
					t && Number(t.x) === h || (t = i[h]);
					let a = t && jm(r, t, n);
					_(a) && _(f) && a * f >= 0 && _(e) && (f !== 0 || o === "positive" && e > 0 || o === "negative" && e < 0) && (v += m(e) - g);
				}
			}
			return v;
		};
	},
	generateGetLinePoints(e, t, n) {
		let r = this, { config: i } = r, a = r.getShapeX(0, e, t), o = r.getShapeY(t), s = r.getShapeOffset(n || r.isLineType, e, t), c = r.getYScaleById.bind(r), l = /* @__PURE__ */ new Map();
		return (e, n) => {
			let u = l.get(e.id);
			u === void 0 && (u = c.call(r, e.id, t)(r.getShapeYMin(e.id, t)), l.set(e.id, u));
			let d = s(e, n) || u, f = a(e), p = o(e);
			i.axis_rotated && (e.value > 0 && p < u || e.value < 0 && u < p) && (p = u);
			let m = [f, p - (u - d)];
			return [
				m,
				m,
				m,
				m
			];
		};
	},
	generateGetAreaPoints(e, t) {
		let n = this, { config: r } = n, i = n.getShapeX(0, e, t), a = n.getShapeY(!!t), o = n.getShapeOffset(n.isAreaType, e, t), s = n.getYScaleById.bind(n), c = /* @__PURE__ */ new Map();
		return function(e, l) {
			let u = c.get(e.id);
			u === void 0 && (u = s.call(n, e.id, t)(n.getShapeYMin(e.id, t)), c.set(e.id, u));
			let d = o(e, l) || u, f = i(e), p = e.value, m = a(e);
			return r.axis_rotated && (p > 0 && m < u || p < 0 && u < m) && (m = u), [
				[f, d],
				[f, m - (u - d)],
				[f, m - (u - d)],
				[f, d]
			];
		};
	},
	generateGetBarPoints(e, t) {
		let n = this, { config: r } = n, i = t ? n.axis.subX : n.axis.x, a = n.getIndicesMax(e) + 1, o = n.getBarW("bar", i, a), s = n.getShapeX(o, e, !!t), c = n.getShapeY(!!t), l = n.getShapeOffset(n.isBarType, e, !!t), u = n.getYScaleById.bind(n), d = /* @__PURE__ */ new Map();
		return (e, i) => {
			let { id: a } = e, f = d.get(a);
			f || (f = {
				y0: u.call(n, a, t)(n.getShapeYMin(a, t)),
				isInverted: r[`axis_${n.axis.getId(a)}_inverted`]
			}, d.set(a, f));
			let { y0: p, isInverted: m } = f, h = l(e, i) || p, g = _(o) ? o : o[e.id] || o._$width, v = e.value, y = s(e), b = c(e);
			r.axis_rotated && !m && (v > 0 && b < p || v < 0 && p < b) && (b = p), n.isBarRangeType(e) || (b -= p - h);
			let x = y + g;
			return [
				[y, h],
				[y, b],
				[x, b],
				[x, h]
			];
		};
	},
	circleY(e, t) {
		let n = this, r = e.id, i;
		return n.isGrouped(r) && (i = Fm.bind(n)(e)), i ? i(e, t)[0][1] : n.getYScaleById(r)(n.getBaseValue(e));
	},
	circleX(e) {
		return this.xx(e);
	},
	updateCircleY(e = !1) {
		let t = this, n = Am(t), r = t.generateGetLinePoints(t.getShapeIndices(n), e, n), i = t.getShapeY(e);
		return (e, n) => t.isGrouped(e.id) && km(t, e) ? r(e, n)[0][1] : i(e);
	},
	getSubchartCandlestickShapeValue(e, t) {
		return Mm(this, e, t);
	},
	isSubchartCandlestickBarValue(e, t) {
		return Nm(this, e, t);
	},
	getSubchartCandlestickBarColor(e, t) {
		return Pm(this, e, t);
	},
	pointR(e) {
		let t = this, { config: n } = t, r = n.point_r, i = r;
		return t.isBubbleType(e) ? i = t.getBubbleR(e) : h(r) && (i = r.bind(t.api)(e)), e.r = i, i;
	},
	pointExpandedR(e) {
		let t = this, { config: n } = t, r = t.isBubbleType(e) ? 1.15 : 1.75;
		return n.point_focus_expand_enabled ? n.point_focus_expand_r || t.pointR(e) * r : t.pointR(e);
	},
	pointSelectR(e) {
		let t = this, n = t.config.point_select_r;
		return h(n) ? n(e) : n || t.pointR(e) * 4;
	},
	isPointFocusOnly() {
		let e = this;
		return e.config.point_focus_only && !e.hasType("bubble") && !e.hasType("scatter") && !e.hasArcType(null, ["radar"]);
	},
	getPointSensitivity(e) {
		let t = this, n = t.config.point_sensitivity;
		if (e) h(n) ? n = n.call(t.api, e) : n === "radius" && (n = e.r);
		else return n;
		return n;
	},
	getBarW(e, t, n) {
		let r = this, { config: i, org: a, scale: o, state: s } = r, c = r.getMaxDataCount(), l = e === "bar" && i.data_groups?.length, u = `${e}_width`, { k: d } = r.getZoomTransform?.() ?? { k: 1 }, f = [i.axis_x_min ?? a.xDomain[0], i.axis_x_max ?? a.xDomain[1]].map((e) => r.axis.isTimeSeries() ? Le.call(r, e) : Number(e)), p = t.tickInterval(c);
		if (o.zoom && !r.axis.isCategorized() && d > 1) {
			let e = f.every((e, t) => e === a.xDomain[t]);
			p = a.xDomain.map((t, n) => {
				let r = e ? t : t - Math.abs(f[n]);
				return o.zoom(r);
			}).reduce((e, t) => Math.abs(e) + t) / c;
		}
		let m = (e) => {
			let t = e ? i[u][e] : i[u], a = e ? t.ratio : i[`${u}_ratio`], o = e ? t.max : i[`${u}_max`], l = _(t) ? t : h(t) ? t.call(r, s.width, n, c) : n ? p * a / n : 0;
			return o && l > o ? o : l;
		}, g = m();
		return !l && w(i[u]) && (g = {
			_$width: g,
			_$total: []
		}, r.getTargetsToShow().forEach((e) => {
			i[u][e.id] && (g[e.id] = m(e.id), g._$total.push(g[e.id] || g._$width));
		})), g;
	},
	getShapeByIndex(e, t, n) {
		let r = this, { $el: i } = r, a = m(t) ? `-${t}` : "", o = i[e];
		return o = o && !o.empty() ? o.filter((e) => !n || e.id === n).filter((e) => !m(t) || e.index === t) : (n ? i.main.selectAll(`.${J[`${e}s`]}${r.getTargetSelectorSuffix(n)}`) : i.main).selectAll(`.${J[e]}${a}`), o;
	},
	isWithinShape(e, t) {
		let n = this, r = L(e), i;
		return n.isTargetToShow(t.id) ? n.hasValidPointType?.(e.nodeName) ? i = n.isStepType(t) ? n.isWithinStep(e, n.getYScaleById(t.id)(n.getBaseValue(t))) : n.isWithinCircle(e, n.isBubbleType(t) ? n.pointSelectR(t) * 1.5 : 0) : e.nodeName === "path" && (i = !r.classed(J.bar) || n.isWithinBar(e)) : i = !1, i;
	},
	getInterpolate(e) {
		return Om[this.getInterpolateType(e)];
	},
	getCurve(e) {
		let t = this;
		return t.config.axis_rotated && t.isStepType(e) ? (n) => {
			let r = t.getInterpolate(e)(n);
			return r.orgPoint = r.point, r.pointRotated = function(e, t) {
				this._point === 1 && (this._point = 2);
				let n = this._y * (1 - this._t) + t * this._t;
				this._context.lineTo(this._x, n), this._context.lineTo(e, n), this._x = e, this._y = t;
			}, r.point = function(e, t) {
				this._point === 0 ? this.orgPoint(e, t) : this.pointRotated(e, t);
			}, r;
		} : t.getInterpolate(e);
	},
	getInterpolateType(e) {
		let t = this, { config: n } = t, r = n.spline_interpolation_type, i = t.isInterpolationType(r) ? r : "cardinal";
		return t.isSplineType(e) ? i : t.isStepType(e) ? n.line_step_type : "linear";
	},
	isWithinBar(e) {
		let t = ar(this.state.event, e), [n, r, i] = rr(e), a = Math.min(n.x, r.x), o = Math.min(n.y, r.y), s = this.config.bar_sensitivity, c = Math.abs(i.x - r.x), l = Math.abs(n.y - r.y), u = a - s, d = a + c + s, f = o + l + s, p = o - s;
		return u < t[0] && t[0] < d && p < t[1] && t[1] < f;
	}
};
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/ChartInternal/ChartInternal.js
function Bm() {
	return c.performance?.now?.() ?? Date.now();
}
function Vm(e) {
	return e.hasArcType() ? "arc charts" : e.hasType("funnel") ? "funnel chart" : null;
}
function Hm(e) {
	let { config: t } = e, n = t.render_mode === "canvas" ? Vm(e) : null;
	n && (c.console?.warn?.(`[billboard.js] render.mode='canvas' is ignored for ${n}; falling back to SVG.`), t.render_mode = "svg");
}
var Um = class {
	api;
	config;
	cache;
	$el;
	state;
	charts;
	data = {
		xs: {},
		targets: []
	};
	axis;
	scale = {
		x: null,
		y: null,
		y2: null,
		subX: null,
		subY: null,
		subY2: null,
		zoom: null
	};
	org = {
		xScale: null,
		xDomain: null
	};
	color;
	patterns;
	levelColor;
	point;
	brush;
	format = {
		extraLineClasses: null,
		xAxisTick: null,
		dataTime: null,
		defaultAxisTime: null,
		axisTime: null
	};
	constructor(e) {
		let t = this;
		t.api = e, t.config = new Wr(), t.cache = new qr();
		let n = new Kr();
		t.$el = n.getStore("element"), t.state = n.getStore("state"), t.$T = t.$T.bind(t);
	}
	$T(e, t, n) {
		let { config: r, state: i } = this, a = r.transition_duration, o = r.subchart_show, s = e;
		return s &&= ("tagName" in s && (s = L(s)), (t !== !1 && a || t) && (!i.zooming || i.dragging) && !i.resizing && i.rendered && !o ? s.transition(n).duration(a) : s), s;
	}
	beforeInit() {
		let e = this;
		e.callPluginHook("$beforeInit"), P(e.config.onbeforeinit, e.api);
	}
	afterInit() {
		let e = this;
		e.callPluginHook("$afterInit"), P(e.config.onafterinit, e.api);
	}
	init() {
		let e = this, { config: t, state: n, $el: r } = e, { boost_useCssRule: i, bindto: a } = t;
		qe(e), Hm(e);
		let o = e.hasArcType();
		if (n.hasRadar = !n.hasAxis && e.hasType("radar"), n.hasFunnel = !n.hasAxis && e.hasType("funnel"), n.hasTreemap = !n.hasAxis && e.hasType("treemap"), n.hasAxis = !o && !n.hasFunnel && !n.hasTreemap, n.datetimeId = `bb-${+/* @__PURE__ */ new Date() * Pe()}`, i) {
			let e = l.createElement("style");
			e.type = "text/css", l.head.appendChild(e), n.style = {
				rootSelector: `.${n.datetimeId}`,
				sheet: e.sheet
			}, r.style = e;
		}
		let s = {
			element: a,
			classname: "bb"
		};
		k(a) && (s.element = a.element || "#chart", s.classname = a.classname || s.classname), r.chart = h(s.element.node) ? a.element : L(s.element || []), r.chart.empty() && (r.chart = L(l.body.appendChild(l.createElement("div")))), r.chart.html("").classed(s.classname, !0).classed(n.datetimeId, i).style("position", "relative"), e.initParams(), e.initToRender();
	}
	initToRender(e) {
		let t = this, { config: n, state: r, $el: { chart: i } } = t, a = () => mr(i, {
			display: "none",
			visibility: "hidden"
		}), o = n.render.lazy === !1 ? !1 : n.render.lazy || a(), s = c.MutationObserver;
		o && s && n.render.observe !== !1 && !e && new s((e, n) => {
			a() || (n.disconnect(), !r.rendered && t.initToRender(!0));
		}).observe(i.node(), {
			attributes: !0,
			attributeFilter: ["class", "style"]
		}), (!o || e) && t.convertData(n, (e) => {
			t.initWithData(e), t.afterInit();
		});
	}
	initParams() {
		let e = this, { config: t, format: n, state: r } = e;
		if (t.render_mode === "canvas" && e.prepareCanvasConfig?.(), e.color = e.generateColor(), e.levelColor = e.generateLevelColor(), t.padding === !1 && (t.axis_x_show = !1, t.axis_y_show = !1, t.axis_y2_show = !1, t.subchart_show = !1), t.render_mode !== "canvas" && (e.hasPointType() || e.hasLegendDefsPoint?.()) && (e.point = e.generatePoint()), r.hasAxis) {
			e.initClip(), n.extraLineClasses = e.generateExtraLineClass(), n.dataTime = t.data_xLocaltime ? wf : Ef, n.axisTime = t.axis_x_localtime ? Cf : Tf;
			let r = t.zoom_enabled && t.zoom_type === "drag";
			n.defaultAxisTime = (t) => {
				let { x: i, zoom: a } = e.scale, o = r ? a : a && i.orgDomain().toString() !== a.domain().toString(), s = t.getMilliseconds() && ".%L" || t.getSeconds() && ".:%S" || t.getMinutes() && "%I:%M" || t.getHours() && "%I %p" || t.getDate() !== 1 && "%b %d" || o && t.getDate() === 1 && "%b'%y" || t.getMonth() && "%-m/%-d" || "%Y";
				return n.axisTime(s)(t);
			};
		}
		let { legend_position: i, legend_inset_anchor: a, axis_rotated: o } = t;
		r.isLegendRight = i === "right", r.isLegendInset = i === "inset", r.isLegendTop = a === "top-left" || a === "top-right", r.isLegendLeft = a === "top-left" || a === "bottom-left", r.rotatedPadding.top = e.getResettedPadding(r.rotatedPadding.top), r.rotatedPadding.right = o && !t.axis_x_show ? 0 : 30, r.inputType = gr(t.interaction_inputType_mouse, t.interaction_inputType_touch);
	}
	initWithData(e) {
		let t = this, { config: n, scale: r, state: i, $el: a, org: o } = t, { hasAxis: s, hasFunnel: c, hasTreemap: l } = i, u = n.interaction_enabled, d = t.hasType("polar"), f = n.data_labels_backgroundColors;
		if (s && (t.axis = t.getAxisInstance(), n.zoom_enabled && t.initZoom()), t.data.xs = {}, t.data.targets = t.convertDataToTargets(e), n.data_filter && (t.data.targets = t.data.targets.filter(n.data_filter.bind(t.api))), n.data_hide && t.addHiddenTargetIds(n.data_hide === !0 ? t.mapToIds(t.data.targets) : n.data_hide), n.legend_hide && t.addHiddenLegendIds(n.legend_hide === !0 ? t.mapToIds(t.data.targets) : n.legend_hide), t.updateSizes(), t.updateScales(!0), s) {
			let { x: e, y: i, y2: a, subX: s, subY: c, subY2: l } = r;
			e && (e.domain(Ae(t.getXDomain(t.data.targets), !n.axis_x_inverted)), s.domain(e.domain()), o.xDomain = e.domain()), i && (i.domain(t.getYDomain(t.data.targets, "y")), c.domain(i.domain())), a && (a.domain(t.getYDomain(t.data.targets, "y2")), l && l.domain(a.domain()));
		}
		if (n.render_mode === "canvas") {
			if (!t.initCanvas) throw Error("[billboard.js] Please import and call canvas() to use render.mode='canvas'.");
			if (t.bindResize(), t.initCanvas(), n.tooltip_show && t.initTooltip(), t.callPluginHook("$init"), P(n.oninit, t.api), t.redraw({
				withTransition: !1,
				withTransform: !0,
				withUpdateXDomain: !0,
				withUpdateOrgXDomain: !0,
				withTransitionForAxis: !1,
				initializing: !0
			}), n.data_onmin || n.data_onmax) {
				let e = t.getMinMaxData();
				P(n.data_onmin, t.api, e.min), P(n.data_onmax, t.api, e.max);
			}
			i.rendered = !0;
			return;
		}
		if (a.svg = a.chart.append("svg").style("overflow", "hidden").style("display", "block"), u && i.inputType) {
			let e = i.inputType === "touch", { onclick: r, onover: o, onout: s } = n, c = n.interaction_inputType_touch?.preventDefault, l = b(c) && c || !1, u = e ? { passive: !l && (!isNaN(c) && c || null) === null } : void 0;
			a.svg.on("click", r?.bind(t.api) || null).on(e ? "touchstart" : "mouseenter", o?.bind(t.api) || null, u).on(e ? "touchend" : "mouseleave", s?.bind(t.api) || null);
		}
		n.svg_classname && a.svg.attr("class", n.svg_classname);
		let p = h(n.color_tiles) && t.patterns;
		(s || p || d || l || f || t.hasLegendDefsPoint?.()) && (a.defs = a.svg.append("defs"), s && [
			"id",
			"idXAxis",
			"idYAxis",
			"idGrid"
		].forEach((e) => {
			t.appendClip(a.defs, i.clip[e]);
		}), t.generateTextBGColorFilter(f), p && t.patterns.forEach((e) => a.defs.append(() => e.node))), t.updateSvgSize(), t.bindResize();
		let m = a.svg.append("g").classed(z.main, !0).attr("transform", c || l ? null : t.getTranslate("main"));
		if (a.main = m, n.subchart_show && t.initSubchart(), n.tooltip_show && t.initTooltip(), n.title_text && t.initTitle(), !l && n.legend_show && t.initLegend(), n.data_empty_label_text && m.append("text").attr("class", `${q.text} ${z.empty}`).attr("text-anchor", "middle").attr("dominant-baseline", "middle"), s && (n.regions.length && t.initRegion?.(), !n.clipPath && t.axis.init()), m.append("g").classed(z.chart, !0).attr("clip-path", s ? i.clip.path : null), t.callPluginHook("$init"), t.initChartElements(), s && (u && t.initEventRect?.(), t.initGrid?.(), n.clipPath && t.axis?.init()), t.updateTargets(t.data.targets), t.updateDimension(), P(n.oninit, t.api), t.setBackground(), t.redraw({
			withTransition: !1,
			withTransform: !0,
			withUpdateXDomain: !0,
			withUpdateOrgXDomain: !0,
			withTransitionForAxis: !1,
			initializing: !0
		}), n.data_onmin || n.data_onmax) {
			let e = t.getMinMaxData();
			P(n.data_onmin, t.api, e.min), P(n.data_onmax, t.api, e.max);
		}
		n.tooltip_show && t.initShowTooltip(), i.rendered = !0;
	}
	initChartElements() {
		let e = this, { hasAxis: t, hasRadar: n, hasTreemap: r } = e.state, i = [];
		if (t) {
			let t = [
				"bar",
				"bubble",
				"candlestick",
				"line"
			];
			e.config.bar_front && t.push(t.shift());
			for (let n of t) {
				let t = Ce(n);
				(n === "line" && e.hasTypeOf(t) || e.hasType(n)) && i.push(t);
			}
		} else if (r) i.push("Treemap");
		else if (e.hasType("funnel")) i.push("Funnel");
		else {
			let t = e.hasType("polar"), r = e.hasType("gauge");
			n || i.push("Arc", "Pie"), r ? i.push("Gauge") : n ? i.push("Radar") : t && i.push("Polar");
		}
		for (let t of i) e[`init${t}`]();
		D(e.config.data_labels) && !e.hasArcType(null, ["radar"]) && e.initText();
	}
	setChartElements() {
		let e = this, { $el: { chart: t, svg: n, defs: r, main: i, tooltip: a, legend: o, title: s, canvas: c, eventOverlay: l, grid: u, needle: d, arcs: f, circle: p, bar: m, candlestick: h, line: g, area: _, text: v } } = e;
		e.api.$ = {
			chart: t,
			svg: n,
			canvas: c,
			eventOverlay: l,
			defs: r,
			main: i,
			tooltip: a,
			legend: o,
			title: s,
			grid: u,
			arc: f,
			circles: p,
			bar: { bars: m },
			candlestick: h,
			line: {
				lines: g,
				areas: _
			},
			needle: d,
			text: { texts: v }
		};
	}
	setBackground() {
		let { config: { background: e }, state: t, $el: { svg: n } } = this;
		if (D(e)) {
			let r = n.select("g").insert(e.imgUrl ? "image" : "rect", ":first-child");
			e.imgUrl ? r.attr("href", e.imgUrl) : e.color && r.style("fill", e.color).attr("clip-path", t.clip.path), r.attr("class", e.class || null).attr("width", "100%").attr("height", "100%");
		}
	}
	updateTargets(e) {
		let t = this, { hasAxis: n, hasFunnel: r, hasRadar: i, hasTreemap: a } = t.state, o = (n) => t[`updateTargetsFor${n}`](e.filter(t[`is${n}Type`].bind(t)));
		if (t.updateTargetsForText(e), n) {
			for (let e of [
				"bar",
				"candlestick",
				"line"
			]) {
				let n = Ce(e);
				(e === "line" && t.hasTypeOf(n) || t.hasType(e)) && o(n);
			}
			t.updateTargetsForSubchart?.(e);
		} else if (t.hasArcType(e)) {
			let e = "Arc";
			i ? e = "Radar" : t.hasType("polar") && (e = "Polar"), o(e);
		} else r ? o("Funnel") : a && o("Treemap");
		let s = t.hasType("bubble") || t.hasType("scatter");
		s && t.updateTargetForCircle?.(), t.filterTargetsToShowAtInit(s);
	}
	filterTargetsToShowAtInit(e = !1) {
		let t = this, { $el: { svg: n }, $T: r } = t, i = `.${z.target}`;
		e && (i += `, .${Sr.chartCircles} > .${Sr.circles}`), r(n.selectAll(i).filter((e) => t.isTargetToShow(e.id))).style("opacity", null);
	}
	getWithOption(e) {
		let t = {
			Dimension: !0,
			EventRect: !0,
			Legend: !1,
			Subchart: !0,
			Transform: !1,
			Transition: !0,
			TrimXDomain: !0,
			UpdateXAxis: "UpdateXDomain",
			UpdateXDomain: !1,
			UpdateOrgXDomain: !1,
			TransitionForExit: "Transition",
			TransitionForAxis: "Transition",
			Y: !0
		};
		for (let [n, r] of Object.entries(t)) {
			let i = g(r) ? t[r] : r;
			t[n] = be(e, `with${n}`, i);
		}
		return t;
	}
	initialOpacity(e) {
		let t = this, { withoutFadeIn: n } = t.state;
		return t.getBaseValue(e) !== null && n[e.id] ? null : "0";
	}
	bindResize() {
		let e = this, { $el: t, config: n, state: r } = e, { resize_auto: i, resize_live: a } = n, o = /^(true|parent)$/.test(i), s = [], l = () => {
			let t = r.current.width, i = r.current.height;
			return e.setContainerSize(), !r.resizePreview && t === r.current.width && i === r.current.height ? !1 : (r.resizing = !0, r.dirty.size = !0, n.legend_show && (e.updateSizes(), r.isCanvasMode ? e.updateHtmlLegend?.() : e.updateLegend()), e.api.flush(!1), !0);
		}, u = Xr(n.resize_timer, o && a ? () => {
			if (r.resizeLiveScale === null && (r.resizeLiveScale = r.resizeRedrawTime > 16), r.resizeLiveScale) {
				e.previewResize();
				return;
			}
			let t = Bm();
			l() && (r.resizeRedrawTime = Bm() - t, r.resizeLiveScale = r.resizeRedrawTime > 16);
		} : void 0);
		s.push(() => P(n.onresize, e.api)), o && s.push(l), s.push(() => {
			P(n.onresized, e.api), r.resizing = !1, r.resizeLiveScale = null;
		}), s.forEach((e) => u.add(e)), e.resizeFunction = u, i === "parent" && c.ResizeObserver ? (e.resizeFunction.resizeObserver = new c.ResizeObserver(e.resizeFunction.bind(e))).observe(t.chart.node().parentNode) : (i === "parent" && c.console?.warn?.("[billboard.js] resize.auto='parent' requires ResizeObserver; falling back to window resize."), c.addEventListener("resize", e.resizeFunction));
	}
	callPluginHook(e, ...t) {
		this.config.plugins.forEach((n) => {
			e === "$beforeInit" && (n.$$ = this, this.api.plugins.push(n)), n[e](...t);
		});
	}
};
F(Um.prototype, [
	Ri,
	Vi,
	Ui,
	ua,
	fa,
	ga,
	ol,
	la,
	cl,
	xl,
	Sl,
	Pf,
	zm,
	Ff,
	If,
	Kf,
	Yf,
	Qf,
	$f,
	tp
]);
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/config/config.js
function Wm(e) {
	let t = this.config, n, r, i, a = () => {
		let e = r.shift();
		if (e && n && w(n) && e in n) return n = n[e], a();
		if (!e) return n;
	};
	Object.keys(t).forEach((o) => {
		n = e, r = o.split("_"), i = a(), y(i) && (t[o] = i);
	}), this.api && (this.state.orgConfig = e);
}
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/Chart/api/chart.js
var Gm = {
	resize(e) {
		let t = this.internal, { config: n, state: r } = t;
		r.rendered && (n.size_width = e ? e.width : null, n.size_height = e ? e.height : null, r.resizing = !0, r.dirty.size = !0, this.flush(!1), t.resizeFunction());
	},
	flush(e) {
		let t = this.internal, { state: n, $el: { zoomResetBtn: r } } = t;
		n.rendered ? (n.resizing ? t.brush?.updateResize() : t.axis?.setOrient(), r?.style("display", "none"), t.scale.zoom && (n.current.zoomDomain = t.scale.zoom.domain()), t.scale.zoom = null, n.resizing || (n.dirty.data = !0), e ? t.redraw({
			withTransform: !0,
			withUpdateXDomain: !0,
			withUpdateOrgXDomain: !0,
			withLegend: !0
		}) : t.updateAndRedraw({
			withLegend: !0,
			withTransition: !1,
			withTransitionForTransform: !1
		}), !n.resizing && t.brush && (t.brush.getSelection().call(t.brush.move), t.unselectRect()), n.current.zoomDomain && (t.api.zoom(n.current.zoomDomain), n.current.zoomDomain = null)) : t.initToRender(!0);
	},
	destroy() {
		let e = this.internal, { state: t, $el: { chart: n, style: r, svg: i } } = e;
		if (D(e)) {
			e.callPluginHook("$willDestroy"), e.cache?.remove(["setOverOut", "callOverOutForTouch"]), e.charts.splice(e.charts.indexOf(this), 1), e.charts.length === 0 && gi(), e.unbindAllEvents(), i?.select("*").interrupt(), t.canvasFlowFrame !== null && c.cancelAnimationFrame?.(t.canvasFlowFrame), t.canvasFlowFrame = null, t.canvasFlowFinish = null, t.pendingRaf !== null && c.cancelAnimationFrame?.(t.pendingRaf), t.pendingRaf = null, e.canvasRenderer?.destroy(), e.canvasEngine?.destroy(), e.resizeFunction?.clear(), e.resizeFunction?.clearLive?.(), e.resizeFunction?.resizeObserver?.disconnect(), e.resizeFunction && c.removeEventListener("resize", e.resizeFunction), n.classed("bb", !1).style("position", null), t.isCanvasMode && n.style("min-height", t.canvasInlineStyle.minHeight || null), n.selectChildren().remove(), r && r.parentNode.removeChild(r), Object.keys(this).forEach((t) => {
				t === "internal" && Object.keys(e).forEach((t) => {
					e[t] = null;
				}), this[t] = null, delete this[t];
			});
			for (let e in this) this[e] = () => {};
		}
		return null;
	},
	config(e, t, n) {
		let { config: r, state: i } = this.internal, a = e?.replace(/\./g, "_"), o;
		return e && a in r ? y(t) ? (r[a] = t, o = t, n && this.flush()) : o = r[a] : (arguments.length === 0 || E(e)) && (o = i.orgConfig), o;
	}
}, Km = { color(e) {
	return this.internal.color(e);
} }, qm = function(e) {
	let { targets: t } = this.internal.data;
	if (!v(e)) {
		let n = O(e) ? e : [e];
		return t.filter((e) => n.some((t) => t === e.id));
	}
	return t;
};
F(qm, {
	shown: function(e) {
		return this.internal.filterTargetsToShow(this.data(e));
	},
	values: function(e, t = !0) {
		let n = null;
		if (e) {
			let r = this.data(e);
			O(r) && (n = [], r.forEach((e) => {
				t ? e.values.forEach((e) => n.push(e.value)) : n.push(e.values.map((e) => e.value));
			}));
		}
		return n;
	},
	names: function(e) {
		return this.internal.updateDataAttributes("names", e);
	},
	colors: function(e) {
		return this.internal.updateDataAttributes("colors", e);
	},
	axes: function(e) {
		return this.internal.updateDataAttributes("axes", e);
	},
	min: function() {
		return this.internal.getMinMaxData().min;
	},
	max: function() {
		return this.internal.getMinMaxData().max;
	}
});
var Jm = { data: qm }, Ym = {
	focus(e) {
		let t = this.internal, { state: n } = t, r = t.mapToTargetIds(e);
		if (n.isCanvasMode) {
			let e = r.filter(t.isTargetToShow, t), i = new Set(e), a = t.mapToTargetIds().filter((e) => !i.has(e) && t.isTargetToShow(e));
			t.revertLegend(), t.toggleFocusLegend(a, !1), t.toggleFocusLegend(e, !0), n.focusedTargetIds = i, n.defocusedTargetIds = new Set(a), t.renderCanvasFrame?.(void 0, null, !1);
			return;
		}
		let i = t.$el.svg.selectAll(t.selectorTargets(r.filter(t.isTargetToShow, t)));
		this.revert(), this.defocus(), i.classed(U.focused, !0).classed(U.defocused, !1), t.hasArcType() && !n.hasRadar && (t.expandArc(r), t.hasType("gauge") && t.markOverlapped(e, t, `.${Er.gaugeValue}`)), t.toggleFocusLegend(r, !0), n.focusedTargetIds = new Set(r), r.forEach((e) => n.defocusedTargetIds.delete(e));
	},
	defocus(e) {
		let t = this.internal, { state: n } = t, r = t.mapToTargetIds(e);
		if (n.isCanvasMode) {
			let e = r.filter(t.isTargetToShow, t);
			t.toggleFocusLegend(e, !1), e.forEach((e) => n.focusedTargetIds.delete(e)), n.defocusedTargetIds = new Set(e), t.renderCanvasFrame?.(void 0, null, !1);
		} else t.$el.svg.selectAll(t.selectorTargets(r.filter(t.isTargetToShow, t))).classed(U.focused, !1).classed(U.defocused, !0), t.hasArcType(null, ["polar"]) && (t.unexpandArc(r), t.hasType("gauge") && t.undoMarkOverlapped(t, `.${Er.gaugeValue}`)), t.toggleFocusLegend(r, !1), r.forEach((e) => n.focusedTargetIds.delete(e)), n.defocusedTargetIds = new Set(r);
	},
	revert(e) {
		let t = this.internal, { config: n, state: r, $el: i } = t, a = t.mapToTargetIds(e), o = () => {
			n.legend_show && (t.showLegend(a.filter(t.isLegendToShow.bind(t))), i.legend.selectAll(t.selectorLegends(a)).filter(function() {
				return L(this).classed(U.legendItemFocused);
			}).classed(U.legendItemFocused, !1));
		};
		if (r.isCanvasMode) {
			let e = !!r.focusedTargetIds?.size || !!r.defocusedTargetIds?.size;
			o(), r.focusedTargetIds = /* @__PURE__ */ new Set(), r.defocusedTargetIds = /* @__PURE__ */ new Set(), e && t.renderCanvasFrame?.(void 0, null, !1);
		} else i.svg.selectAll(t.selectorTargets(a)).classed(U.focused, !1).classed(U.defocused, !1), t.hasArcType(null, ["polar"]) && t.unexpandArc(a), o(), r.focusedTargetIds = /* @__PURE__ */ new Set(), r.defocusedTargetIds = /* @__PURE__ */ new Set();
	}
}, Xm = { legend: {
	show: function(e) {
		let t = this.internal;
		t.showLegend(t.mapToTargetIds(e)), t.updateAndRedraw({ withLegend: !0 });
	},
	hide: function(e) {
		let t = this.internal;
		t.hideLegend(t.mapToTargetIds(e)), t.updateAndRedraw({ withLegend: !0 });
	}
} }, Zm = {
	load(e) {
		let t = this.internal, { config: n } = t;
		t.state.dirty.data = !0, t.state._eventRectFingerprint = null, e.xs && t.addXs(e.xs), "names" in e && this.data.names(e.names), "classes" in e && Object.keys(e.classes).forEach((t) => {
			n.data_classes[t] = e.classes[t];
		}), "categories" in e && t.axis.isCategorized() && (n.axis_x_categories = e.categories), "axes" in e && Object.keys(e.axes).forEach((t) => {
			n.data_axes[t] = e.axes[t];
		}), "colors" in e && Object.keys(e.colors).forEach((t) => {
			n.data_colors[t] = e.colors[t];
		}), "regions" in e && (n.data_regions = e.regions || {});
		let r = [
			"data",
			"columns",
			"rows",
			"json",
			"url"
		].some((t) => t in e), i = "unload" in e && e.unload !== !1;
		if ("regions" in e && !r && !i) t.redraw({
			withUpdateOrgXDomain: !0,
			withUpdateXDomain: !0,
			withLegend: !0
		}), Hi.call(t, e.done, e.resizeAfter);
		else if (i) {
			let n = t.mapToTargetIds(e.unload === !0 ? null : e.unload);
			t.unload(n, () => {
				t.config && t.cache && (t.cache.remove(n), f(() => t.loadFromArgs(e)));
			});
		} else t.loadFromArgs(e);
	},
	unload(e) {
		let t = this.internal, n = e || {};
		E(n) && this.tooltip.hide(), O(n) ? n = { ids: n } : g(n) && (n = { ids: [n] });
		let r = t.mapToTargetIds(n.ids);
		t.state.dirty.data = !0, t.state._eventRectFingerprint = null, t.unload(r, () => {
			t.config && t.cache && (t.redraw({
				withUpdateOrgXDomain: !0,
				withUpdateXDomain: !0,
				withLegend: !0
			}), t.cache.remove(r), Hi.call(t, n.done, n.resizeAfter));
		});
	}
};
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/Chart/api/show.js
function Qm(e, t, n, r = !1) {
	let i = this.internal, a = i.mapToTargetIds(t), o = new Set(a), s = [...i.state.hiddenTargetIds].filter((e) => o.has(e));
	if (i.state.toggling = !0, i.state.dirty.visibility = !0, i[`${e ? "remove" : "add"}HiddenTargetIds`](a), i.state.isCanvasMode) {
		e && s.length ? P(i.config.data_onshown, this, s) : !e && s.length === 0 && P(i.config?.data_onhidden, this, a), r || i.redraw({
			withUpdateOrgXDomain: !0,
			withUpdateXDomain: !0,
			withLegend: !0
		}), i.state.toggling = !1;
		return;
	}
	let c = i.$el.svg.selectAll(i.selectorTargets(a)), l = e ? null : "0";
	e && s.length && (c.style("display", null), P(i.config.data_onshown, this, s)), i.$T(c).style("opacity", l, "important").call(Se, () => {
		!e && s.length === 0 && (c.style("display", "none"), P(i.config?.data_onhidden, this, a)), c.style("opacity", l);
	}), n.withLegend && i[`${e ? "show" : "hide"}Legend`](a), r || i.redraw({
		withUpdateOrgXDomain: !0,
		withUpdateXDomain: !0,
		withLegend: !0
	}), i.state.toggling = !1;
}
var $m = {
	show(e, t = {}) {
		Qm.call(this, !0, e, t);
	},
	hide(e, t = {}) {
		Qm.call(this, !1, e, t);
	},
	toggle(e, t = {}) {
		let n = this.internal, r = {
			show: [],
			hide: []
		};
		n.mapToTargetIds(e).forEach((e) => r[n.isTargetToShow(e) ? "hide" : "show"].push(e)), r.show.length && r.hide.length ? (Qm.call(this, !0, r.show, t, !0), Qm.call(this, !1, r.hide, t)) : (r.show.length && this.show(r.show, t), r.hide.length && this.hide(r.hide, t));
	}
}, eh = { tooltip: {
	show: function(e) {
		let t = this.internal, { $el: n, config: r, state: { eventReceiver: i, hasFunnel: a, hasTreemap: o, inputType: s } } = t, c, l;
		if (e.mouse && (l = e.mouse), e.data) {
			let { data: s } = e, u = t.getYScaleById(s.id)?.(s.value);
			if ((a || o) && s.id) {
				let e = t.selectorTarget(s.id, void 0, `.${K.shape}`);
				i.rect = n.main.select(e);
			} else t.isMultipleX() ? l = [t.xx(s), u] : (r.tooltip_grouped || (l = [0, u]), c = s.index ?? (t.hasArcType() && s.id ? t.getArcElementByIdOrIndex(s.id)?.datum().index : t.getIndexByX(s.x)));
		} else y(e.x) ? c = t.getIndexByX(e.x) : y(e.index) && (c = e.index);
		if (t.state.isCanvasMode) {
			let i = t.filterTargetsToShow?.() || t.data.targets, a = e.data?.id && !r.tooltip_grouped ? i.filter((t) => t.id === e.data.id).map((t) => t.values[c ?? e.data.index]).filter(Boolean) : i.map((e) => e.values[c]).filter(Boolean), o = n.canvas?.node?.(), s = t.state.canvasShape || t.getDrawShape?.(), u = a[0], d = l || (u && s?.pos?.cx && s?.pos?.cy ? [t.state.margin.left + s.pos.cx(u), t.state.margin.top + s.pos.cy(u)] : void 0);
			if (!a.length || !o) return;
			t.state.canvasFocusKey = a.map((e) => `${e.id}:${e.index}`).join("|"), t.renderCanvasFocus?.(a, d), t.showTooltip?.(a, o);
		} else (s === "mouse" ? ["mouseover", "mousemove"] : ["touchstart"]).forEach((e) => {
			t.dispatchEvent(e, c, l);
		});
	},
	hide: function() {
		let e = this.internal, { state: { inputType: t, isCanvasMode: n }, $el: { tooltip: r } } = e, i = r?.datum();
		if (n) e.state.canvasFocusKey = null, e.hideTooltip(!0), e.clearCanvasFocus?.();
		else {
			if (i?.data?.[0]) {
				let { index: n } = i.data[0];
				(t === "mouse" ? ["mouseout"] : ["touchend"]).forEach((t) => {
					e.dispatchEvent(t, n);
				});
			}
			t === "touch" && e.callOverOutForTouch(), e.hideTooltip(!0), e.hideGridFocus?.(), e.unexpandCircles?.(), e.expandBarTypeShapes?.(!1);
		}
	}
} }, th = class e {
	plugins = [];
	internal;
	constructor(t) {
		let n = new Um(this);
		this.internal = n, (function e(t, n, r) {
			Object.keys(t).forEach((i) => {
				let a = h(t[i]), o = n !== r, s = D(t[i]), c = s && Object.keys(t[i]).length > 0;
				n[i] = a && (!o && c || o) ? t[i].bind(r) : s && !a ? {} : t[i], c && e(t[i], n[i], r);
			});
		})(e.prototype, this, this), Wm.call(n, t), n.beforeInit(), n.init();
	}
};
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/Chart/api/stubs.js
F(th.prototype, [
	Gm,
	Km,
	Jm,
	Ym,
	Xm,
	Zm,
	$m,
	eh
]), F(th.prototype, [{
	export() {
		Je("export");
	},
	flow() {
		Je("flow");
	},
	xgrids() {
		Je("xgrids");
	},
	ygrids() {
		Je("ygrids");
	},
	regions() {
		Je("regions");
	},
	category() {
		Je("category");
	},
	categories() {
		Je("categories");
	}
}]);
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/ChartInternal/shape/core/path.js
function nh(e, t) {
	return t ? (t) => {
		let n = e.getSubchartCandlestickShapeValue?.(t, !0);
		return n === void 0 ? e.getBaseValue(t) : n;
	} : (t) => e.getBaseValue(t);
}
function rh(e, t, n) {
	return n ? t.map((t) => {
		let r = e.getSubchartCandlestickShapeValue?.(t, n);
		return r === void 0 ? t : {
			...t,
			value: r
		};
	}) : t;
}
function ih(e, t, n) {
	return e.isStepType(t) ? e.convertValuesToStep(n) : n;
}
function ah(e, t, n, r) {
	let { config: i, scale: a } = e, o = i.line_connectNull, s = i.axis_rotated, c = e.generateGetLinePoints(t, n), l = e.getYScaleById.bind(e), u = nh(e, n), d = (t) => (n ? e.subxx : e.xx).call(e, t), f = (t, r) => e.isGrouped(t.id) ? c(t, r)[0][1] : l(t.id, n)(u(t)), p = Fp();
	p = s ? p.x(f).y(d) : p.x(d).y(f), r && (p = p.context(r)), o || (p = p.defined((e) => u(e) !== null));
	let m = n ? a.subX : a.x;
	return (t) => {
		let c = l(t.id, n), d = o ? e.filterRemoveNull(t.values) : t.values, f = 0, h = 0, g;
		if (e.isLineType(t)) {
			let o = i.data_regions[t.id];
			o && !r && e.lineWithRegions ? (d = rh(e, d, n), e.isAreaRangeType(t) && (d = d.map((t) => ({
				...t,
				value: e.getRangedData(t, "mid")
			}))), e.isStepType(t) && (d = e.convertValuesToStep(d)), g = e.lineWithRegions(d, a.zoom || m, c, o)) : g = p.curve(e.getCurve(t))(ih(e, t, d));
		} else d[0] && (f = m(d[0].x), h = c(u(d[0]))), g = s ? `M ${h} ${f}` : `M ${f} ${h}`;
		return g || (r ? void 0 : "M 0 0");
	};
}
function oh(e, t, n, r) {
	let { config: i } = e, a = i.line_connectNull, o = i.axis_rotated, s = e.generateGetAreaPoints(t, n), c = e.getYScaleById.bind(e), l = nh(e, n), u = /* @__PURE__ */ new Map(), d = (t) => {
		let r = u.get(t);
		return r === void 0 && (r = e.getShapeYMin(t, n), u.set(t, r)), r;
	}, f = (t) => (n ? e.subxx : e.xx).call(e, t), p = (t, r) => e.isGrouped(t.id) ? s(t, r)[0][1] : c(t.id, n)(e.isAreaRangeType(t) ? e.getRangedData(t, "high") : d(t.id)), m = (t, r) => e.isGrouped(t.id) ? s(t, r)[1][1] : c(t.id, n)(e.isAreaRangeType(t) ? e.getRangedData(t, "low") : l(t));
	return (t) => {
		let s = a ? e.filterRemoveNull(t.values) : t.values, c = 0, u = 0, d;
		if (e.isAreaType(t)) {
			let c = Ip();
			c = o ? c.y(f).x0(p).x1(m) : c.x(f).y0(i.area_above ? 0 : i.area_below ? n ? e.state.height2 : e.state.height : p).y1(m), r && (c = c.context(r)), a || (c = c.defined((e) => l(e) !== null)), s = rh(e, s, n), e.isStepType(t) && (s = e.convertValuesToStep(s)), d = c.curve(e.getCurve(t))(s);
		} else s[0] && (c = (n ? e.scale.subX : e.scale.x)(s[0].x), u = e.getYScaleById(t.id, n)(l(s[0]))), d = o ? `M ${u} ${c}` : `M ${c} ${u}`;
		return d || (r ? void 0 : "M 0 0");
	};
}
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/ChartInternal/shape/area.js
var sh = {
	initArea(e) {
		let t = this, { config: n } = t;
		e.insert("g", `.${n.area_front ? Sr.circles : Dr.lines}`).attr("class", t.getClass("areas", !0));
	},
	updateAreaColor(e) {
		let t = this;
		return Im.call(t, e, "area_linearGradient", t.color);
	},
	updateArea(e, t = !1) {
		let n = this;
		if (n.state.isCanvasMode) return;
		let { config: r, state: i, $el: a, $T: o } = n, s = t ? a.subchart : a;
		r.area_linearGradient && n.updateLinearGradient();
		let c = s.main.selectAll(`.${yr.areas}`).selectAll(`.${yr.area}`).data(n.lineData.bind(n));
		o(c.exit(), e).style("opacity", "0").remove(), s.area = c.enter().append("path").attr("class", n.getClass("area", !0)).style("fill", n.updateAreaColor.bind(n)).style("opacity", function() {
			return i.orgAreaOpacity = L(this).style("opacity"), "0";
		}).merge(c), c.style("opacity", i.orgAreaOpacity), n.setRatioForGroupedData(s.area.data());
	},
	redrawArea(e, t, n = !1) {
		let r = this;
		if (r.state.isCanvasMode) return [];
		let { area: i } = n ? this.$el.subchart : this.$el, { orgAreaOpacity: a } = r.state;
		return [r.$T(i, t, Pe()).attr("d", e).style("fill", r.updateAreaColor.bind(r)).style("opacity", (e) => String(r.isAreaRangeType(e) ? a / 1.75 : a))];
	},
	generateDrawArea(e, t) {
		return oh(this, e, t);
	}
}, ch = {
	area_above: !1,
	area_below: !1,
	area_front: !0,
	area_linearGradient: !1,
	area_zerobased: !0
}, lh = { spline_interpolation_type: "cardinal" };
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/ChartInternal/shape/core/point.js
function uh(e) {
	return w(e) && h(e.create) && h(e.update);
}
function dh(e, t) {
	let n = this, r = (e, t) => {
		let n = e.attributes;
		for (let r = 0, i; i = n[r]; r++) i = i.name, t.setAttribute(i, e.getAttribute(i));
	}, i = new DOMParser().parseFromString(ve(e), "image/svg+xml").documentElement, a = l.createElementNS(Xe.svg, i.nodeName.toLowerCase());
	if (a.id = t, a.style.fill = "inherit", a.style.stroke = "inherit", r(i, a), i.childNodes?.length) {
		let e = L(a);
		"innerHTML" in a ? e.html(ve(i.innerHTML)) : Te(i.childNodes).forEach((t) => {
			r(t, e.append(t.tagName).node());
		});
	}
	n.$el.defs.node().appendChild(a);
}
var fh = {
	hasValidPointType(e) {
		return /^(circle|rect(angle)?|polygon|ellipse|use)$/i.test(e || this.config.point_type);
	},
	hasLegendDefsPoint() {
		let { config: e } = this;
		return e.legend_show && e.point_pattern?.length && e.legend_usePoint;
	},
	getDefsPointId(e) {
		let { state: { datetimeId: t } } = this;
		return `${t}-point${e}`;
	},
	getValidPointPattern() {
		let { config: e } = this, t = /^(circle|rect(angle)?)$/i.test(e.point_type) ? e.point_type : "circle";
		return D(e.point_pattern) ? e.point_pattern : [t];
	},
	generatePoint() {
		let e = this, { $el: t, config: n } = e, r = [], i = e.getValidPointPattern();
		return function(a, o, ...s) {
			return function(c) {
				let l = e.getTargetSelectorSuffix(c.id || c.data?.id || c), u = L(this);
				r.indexOf(l) < 0 && r.push(l);
				let d = i[r.indexOf(l) % i.length];
				if (e.hasValidPointType(d)) d = e[d];
				else if (!uh(d || n.point_type)) {
					let n = e.getDefsPointId(l);
					if (t.defs.select(`#${n}`).size() < 1 && dh.call(e, d, n), a === "create") return e.custom?.create.bind(o)(u, n, ...s);
					if (a === "update") return e.custom?.update.bind(o)(u, ...s);
				}
				return d[a]?.bind(o)(u, ...s);
			};
		};
	}
}, ph = "2 2";
function mh(e, t, n) {
	let r = e.axis.isTimeSeries(), i = (t, n) => v(t) ? n : r ? Le.call(e, t) : t;
	return (n || []).map((e) => ({
		start: i(e.start, t[0]?.x),
		end: i(e.end, t[t.length - 1]?.x),
		style: e.style || { dasharray: ph }
	}));
}
function hh(e, t) {
	for (let n = 0, r; r = t[n]; n++) if (r.start < e && e <= r.end) return r.style;
	return !1;
}
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/ChartInternal/shape/line.js
function gh(e, t, n, r = !1) {
	let i = e ? [e, 0] : n;
	for (let r = e || n.reduce((e, t) => e + t); r <= t;) n.forEach((e) => {
		r + e <= t && i.push(e), r += e;
	});
	return i.length % 2 != 0 && i.push(r ? n[1] : 0), {
		dash: i.join(" "),
		length: i.reduce((e, t) => e + t, 0)
	};
}
var _h = {
	initLine() {
		Lm.call(this, {
			elKey: "line",
			className: Dr.chartLines,
			cssRules: ["pointer-events:none"]
		});
	},
	updateTargetsForLine(e) {
		let t = this, { $el: { area: n, main: r } } = t, i = t.getClass("lines", !0), a = e.filter((e) => !(t.isScatterType(e) || t.isBubbleType(e))), o = Rm.call(t, a, {
			type: "Line",
			elKey: "line",
			containerClass: Dr.chartLines,
			itemClass: Dr.chartLine,
			initFn: t.initLine
		});
		if (o.append("g").attr("class", i), t.hasTypeOf("Area")) {
			let e = r.select(`.${Dr.chartLines}`).selectAll(`.${Dr.chartLine}`), i = (!n && o.empty() ? e : o).filter(t.isAreaType.bind(t));
			t.initArea(i);
		}
		t.updateTargetForCircle(a, o);
	},
	updateLine(e, t = !1) {
		let n = this;
		if (n.state.isCanvasMode) return;
		let { format: { extraLineClasses: r }, $el: i, $T: a } = n, o = t ? i.subchart : i, s = o.main.selectAll(`.${Dr.lines}`).selectAll(`.${Dr.line}`).data(n.lineData.bind(n));
		a(s.exit(), e).style("opacity", "0").remove(), o.line = s.enter().append("path").attr("class", (e) => `${n.getClass("line", !0)(e)} ${r(e) || ""}`).style("stroke", n.color).merge(s).style("opacity", n.initialOpacity.bind(n)).attr("transform", null);
	},
	redrawLine(e, t, n = !1) {
		let r = this;
		if (r.state.isCanvasMode) return [];
		let { $el: i, $T: a } = r, { line: o } = n ? i.subchart : i;
		return [a(o, t, Pe()).attr("d", e).style("stroke", this.color).style("opacity", null)];
	},
	generateDrawLine(e, t) {
		return ah(this, e, t);
	},
	lineWithRegions(e, t, n, r) {
		let i = this, { config: a } = i, o = a.axis_rotated, s = i.axis.isTimeSeries(), c = mh(i, e, r), l = i.hasNullDataValue(e), u, d, f, p, h = o ? (e) => n(e.value) : (e) => t(e.x), g = o ? (e) => t(e.x) : (e) => n(e.value), _ = (e) => `M${e[0][0]},${e[0][1]}L${e[1][0]},${e[1][1]}`, y = s ? (e, r, i, a) => {
			let s = e.x.getTime(), c = r.x - e.x, l = new Date(s + c * i), u = new Date(s + c * (i + a)), p = o ? [[n(d(i)), t(l)], [n(d(i + f)), t(u)]] : [[t(l), n(d(i))], [t(u), n(d(i + f))]];
			return _(p);
		} : (e, r, i, a) => {
			let s = t(r.x, !o), c = n(r.value, o), l = i + a, f = t(u(i), !o), p = n(d(i), o), m = t(u(l), !o), h = n(d(l), o);
			m > s && (m = s), e.value > r.value && (o ? h < c : h > c) && (h = c);
			let g = [[f, p], [m, h]];
			return o && g.forEach((e) => e.reverse()), _(g);
		}, b = {
			x: i.axis.getAxisType("x"),
			y: i.axis.getAxisType("y")
		}, x = "";
		if (!e.length) return x;
		let S = i.$el.line.filter(({ id: t }) => t === e[0].id), C = S.clone().style("display", "none"), w = (e, t) => e.attr("d", t).node().getTotalLength(), T = {
			dash: [],
			lastLength: 0
		}, E = !1;
		for (let r = 0, a; a = e[r]; r++) {
			let _ = e[r - 1], S = _ && m(_.value), D = i.isWithinRegions(a.x, c);
			if (m(a.value)) {
				if (v(c) || !D || !S) x += `${r && S ? "L" : "M"}${h(a)},${g(a)}`;
				else if (S) {
					if (D = (D?.dasharray || "2 2").split(" ").map(Number), u = Nf(b.x, _.x, a.x), d = Nf(b.y, _.value, a.value), l) {
						let e = t(a.x) - t(_.x), r = n(a.value) - n(_.value), i = Math.sqrt(e * e + r * r);
						f = D[0] / i, p = f * D[1];
						for (let e = f; e <= 1; e += p) x += y(_, a, e, f), e + p >= 1 && (x += y(_, a, 1, 0));
					} else {
						let r;
						if (E = a.x === e[e.length - 1].x, s) {
							let e = +_.x, i = new Date(e), o = new Date(e + (+a.x - e));
							r = [[t(i), n(d(0))], [t(o), n(d(1))]];
						} else r = [[t(u(0)), n(d(0))], [t(u(1)), n(d(1))]];
						o && r.forEach((e) => e.reverse());
						let i = w(C, x), c = w(C, x += `L${r[1].join(",")}`), l = gh(i - T.lastLength, c - T.lastLength, D, E);
						T.lastLength += l.length, T.dash.push(l.dash);
					}
				}
			}
		}
		return T.dash.length && (!E && T.dash.push(w(C, x)), S.attr("stroke-dasharray", T.dash.join(" "))), C.remove(), x;
	},
	isWithinRegions(e, t) {
		return hh(e, t);
	},
	isWithinStep(e, t) {
		return Math.abs(t - ar(this.state.event, e)[1]) < 30;
	},
	shouldDrawPointsForLine(e) {
		let t = this.config.line_point;
		return t === !0 || O(t) && t.indexOf(e.id) !== -1;
	}
}, vh = () => Pe(), yh = /* @__PURE__ */ new WeakMap();
function bh(e) {
	let t = e.getAttribute("height"), n = e.getAttribute("width"), r = e.getAttribute("href") || e.getAttribute("xlink:href"), i = yh.get(e);
	if (i && i.attrHeight === t && i.attrWidth === n && i.href === r) return i;
	let { width: a, height: o } = or(e), s = {
		attrHeight: t,
		attrWidth: n,
		height: o,
		href: r,
		width: a
	};
	return yh.set(e, s), s;
}
var xh = {
	initialOpacityForCircle(e) {
		let { config: t, state: { withoutFadeIn: n } } = this, r = t.point_opacity;
		return v(r) && (r = this.getBaseValue(e) !== null && n[e.id] ? this.opacityForCircle(e) : "0"), r;
	},
	opacityForCircle(e) {
		let { config: t } = this, n = t.point_opacity;
		return v(n) && (n = t.point_show && !this.isPointFocusOnly?.() ? null : "0", n = m(this.getBaseValue(e)) ? this.isBubbleType(e) || this.isScatterType(e) ? "0.5" : n : "0"), n;
	},
	initCircle() {
		let e = this, { $el: { main: t } } = e;
		!e.point && (e.point = e.generatePoint()), (e.hasType("bubble") || e.hasType("scatter")) && t.select(`.${z.chart} > .${Sr.chartCircles}`).empty() && t.select(`.${z.chart}`).append("g").attr("class", Sr.chartCircles);
	},
	updateTargetForCircle(e, t) {
		let n = this, { config: r, data: i, $el: a } = n, o = r.interaction_enabled && r.data_selection_enabled, s = o && r.data_selection_isselectable, c = n.getClass("circles", !0);
		if (!r.point_show) return;
		n.initCircle();
		let l = e, u = t;
		if (!l) {
			l = n.filterNullish(i.targets).filter((e) => this.isScatterType(e) || this.isBubbleType(e));
			let e = a.main.select(`.${Sr.chartCircles}`).style("pointer-events", "none").selectAll(`.${Sr.circles}`).data(l);
			e.exit().remove(), u = e.enter();
		}
		o && u.append("g").attr("class", (e) => n.generateClass(G.selectedCircles, e.id)), u.append("g").attr("class", c).call((e) => {
			n.setCssRule(!0, `.${Sr.circles}`, ["cursor:pointer"], s)(e), n.setCssRule(!0, ` .${Sr.circle}`, ["fill", "stroke"], n.color)(e);
		}).style("opacity", function() {
			return L(this.parentNode).classed(Sr.chartCircles) ? "0" : null;
		}), o && l.forEach((e) => {
			a.main.selectAll(`.${G.selectedCircles}${n.getTargetSelectorSuffix(e.id)}`).selectAll(`${G.selectedCircle}`).each((t) => {
				t.value = e.values[t.index].value;
			});
		});
	},
	updateCircle(e = !1) {
		let t = this, { config: n, state: r, $el: i } = t, a = t.isPointFocusOnly(), o = e ? i.subchart : i;
		if (n.point_show && !r.toggling) {
			n.point_radialGradient && t.updateLinearGradient();
			let e = o.main.selectAll(`.${Sr.circles}`).selectAll(`.${Sr.circle}`).data((e) => {
				let n = t.isLineType(e) && t.shouldDrawPointsForLine(e) || t.isBubbleType(e) || t.isRadarType(e) || t.isScatterType(e) ? a ? [e.values[0]] : e.values : [];
				return t.filterNullish(n);
			});
			e.exit().remove();
			let r = t.pointR.bind(t), i = t.generateUpdateCircleColor(), s = t.initialOpacityForCircle.bind(t);
			e.enter().filter(Boolean).append(t.point("create", this, r, i)), o.circle = o.main.selectAll(`.${Sr.circles} .${Sr.circle}`).style("stroke", t.getStylePropValue(t.color)).style("opacity", s);
		}
	},
	generateUpdateCircleColor() {
		let e = this, t = e.getStylePropValue(e.color);
		return (n) => e.config.point_radialGradient ? e.getGradienColortUrl(n.id) : t ? t(n) : null;
	},
	updateCircleColor(e) {
		return this.generateUpdateCircleColor()(e);
	},
	redrawCircle(e, t, n, r, i = !1) {
		let a = this, { state: { rendered: o }, $el: s, $T: c } = a, l = i ? s.subchart : s, u = l.main.selectAll(`.${G.selectedCircle}`);
		if (!a.config.point_show) return [];
		let d = a.isCirclePoint() ? "c" : "", f = Pe(), p = a.opacityForCircle.bind(a), m = a.generateUpdateCircleColor();
		if (a.isCirclePoint()) {
			let i = l.circle;
			return a.hasType("bubble") && i.attr("r", a.pointR.bind(a)), n ? (r && i.attr("cx", e), c(i.filter(function() {
				return !!this.getAttribute("cx");
			}), !0, `${f}-pos`).attr("cx", e).attr("cy", t).style("fill", m), i.filter(function() {
				return !this.getAttribute("cx");
			}).attr("cx", e).attr("cy", t).style("fill", m)) : i.attr("cx", e).attr("cy", t).style("fill", m), [[c(i, n || !o, f).style("opacity", p)], c(u, n).attr("cx", e).attr("cy", t)];
		}
		let h = a.point("update", a, e, t, m, n, r, u), g = [];
		return l.circle.each(function(e) {
			let t = h.bind(this)(e);
			t = c(t, n || !o, f).style("opacity", p), g.push(t);
		}), [g, c(u, n).attr(`${d}x`, e).attr(`${d}y`, t)];
	},
	showCircleFocus(e) {
		let t = this, { state: { hasRadar: n, resizing: r, toggling: i, transiting: a }, $el: o } = t, { circle: s } = o;
		if (a === !1 && s && t.isPointFocusOnly()) {
			let a = (n ? t.radarCircleX : t.circleX).bind(t), o = (n ? t.radarCircleY : t.circleY).bind(t), c = i || v(e), l = t.point("update", t, a, o, t.getStylePropValue(t.color), !r && c);
			e && (s = s.filter(function(t) {
				let n = e.filter?.((e) => e.id === t.id);
				return n.length ? L(this).datum(n[0]) : !1;
			})), s.attr("class", this.updatePointClass.bind(this)).style("opacity", null).each(function(e) {
				let { id: n, index: r, value: i } = e, a = "hidden";
				m(i) && (l.bind(this)(e), t.expandCircles(r, n), a = ""), this.style.visibility = a;
			});
		}
	},
	hideCircleFocus() {
		let e = this, { $el: { circle: t } } = e;
		e.isPointFocusOnly() && t && (e.unexpandCircles(), t.style("visibility", "hidden"));
	},
	expandCircles(e, t, n) {
		let r = this, i = r.pointExpandedR.bind(r);
		n && r.unexpandCircles();
		let a = r.getShapeByIndex("circle", e, t).classed(z.EXPANDED, !0), o = i(a) / r.config.point_r, s = 1 - o;
		r.isCirclePoint() ? a.attr("r", i) : a.each(function() {
			let e = L(this);
			if (this.tagName === "circle") e.attr("r", i);
			else {
				let { width: t, height: n } = bh(this), r = s * (+e.attr("x") + t / 2), i = s * (+e.attr("y") + n / 2);
				e.attr("transform", `translate(${r} ${i}) scale(${o})`);
			}
		});
	},
	unexpandCircles(e) {
		let t = this, n = t.pointR.bind(t), r = t.getShapeByIndex("circle", e).filter(function() {
			return L(this).classed(z.EXPANDED);
		}).classed(z.EXPANDED, !1);
		if (r.attr("r", n), !t.isCirclePoint()) {
			let e = n(r) / t.config.point_r;
			r.attr("transform", e === 1 ? null : `scale(${e})`);
		}
	},
	isWithinCircle(e, t) {
		let { state: n } = this, r = ar(n.event, e), i = L(e), a = this.isCirclePoint(e) ? "c" : "", o = this.getPointSensitivity(i?.datum()), s = +i.attr(`${a}x`), c = +i.attr(`${a}y`);
		if (!(s || c) && e.nodeType === 1) {
			let { x: t, y: n } = R(e);
			s = t, c = n;
		}
		let l = s - r[0], u = c - r[1];
		return Math.sqrt(l * l + u * u) < (t || o);
	},
	updatePointClass(e) {
		let t = this, { circle: n } = t.$el, r = !1;
		return (k(e) || n) && (r = e === !0 ? n.each(function(e) {
			let n = t.getClass("circle", !0)(e);
			this.getAttribute("class").indexOf(z.EXPANDED) > -1 && (n += ` ${z.EXPANDED}`), this.setAttribute("class", n);
		}) : t.getClass("circle", !0)(e)), r;
	},
	custom: {
		create(e, t, n) {
			return e.append("use").attr("xlink:href", `#${t}`).attr("class", this.updatePointClass.bind(this)).style("fill", n).node();
		},
		update(e, t, n, r, i, a, o) {
			let s = this, { width: c, height: l } = bh(e.node()), u = (e) => m(e.value) ? t(e) - c / 2 : 0, d = (e) => m(e.value) ? n(e) - l / 2 : 0, f = e;
			return i && (a && f.attr("x", u), f = s.$T(f, i, vh()), o && s.$T(o, i, vh())), f.attr("x", u).attr("y", d).style("fill", r);
		}
	},
	circle: {
		create(e, t, n) {
			return e.append("circle").attr("class", this.updatePointClass.bind(this)).attr("r", t).style("fill", n).node();
		},
		update(e, t, n, r, i, a, o) {
			let s = this, c = e;
			return s.hasType("bubble") && c.attr("r", s.pointR.bind(s)), i && (a && c.attr("cx", t), c.attr("cx") && (c = s.$T(c, i, vh())), o && s.$T(o, i, vh())), c.attr("cx", t).attr("cy", n).style("fill", r);
		}
	},
	rectangle: {
		create(e, t, n) {
			let r = (e) => t(e) * 2;
			return e.append("rect").attr("class", this.updatePointClass.bind(this)).attr("width", r).attr("height", r).style("fill", n).node();
		},
		update(e, t, n, r, i, a, o) {
			let s = this, c = s.config.point_r, l = (e) => t(e) - c, u = (e) => n(e) - c, d = e;
			return i && (a && d.attr("x", l), d = s.$T(d, i, vh()), o && s.$T(o, i, vh())), d.attr("x", l).attr("y", u).style("fill", r);
		}
	}
}, Sh = {
	point_show: !0,
	point_r: 2.5,
	point_radialGradient: !1,
	point_sensitivity: 10,
	point_focus_expand_enabled: !0,
	point_focus_expand_r: void 0,
	point_focus_only: !1,
	point_opacity: void 0,
	point_pattern: [],
	point_select_r: void 0,
	point_type: "circle"
}, Ch = {
	line_connectNull: !1,
	line_step_type: "step",
	line_step_tooltipMatch: !1,
	line_zerobased: !1,
	line_classes: void 0,
	line_point: !0
};
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/Chart/api/axis.js
function wh(e, t, n) {
	let { config: r } = e, i = (e, n) => {
		let i = _(n) ? n : n === !1 ? void 0 : null;
		i !== null && (r[`axis_${e}_${t}`] = i);
	};
	y(n) && (w(n) ? Object.keys(n).forEach((e) => {
		i(e, n[e]);
	}) : (_(n) || n === !1) && ["y", "y2"].forEach((e) => {
		i(e, n);
	}), e.state.dirty.data = !0, e.redraw({
		withUpdateOrgXDomain: !0,
		withUpdateXDomain: !0
	}));
}
function Th(e, t) {
	let { config: n } = e;
	return {
		x: n[`axis_x_${t}`],
		y: n[`axis_y_${t}`],
		y2: n[`axis_y2_${t}`]
	};
}
var Eh = { axis: {
	labels: function(e) {
		let t = this.internal, n;
		return e && (Object.keys(e).forEach((n) => {
			t.axis.setLabelText(n, e[n]);
		}), t.state.isCanvasMode ? t.renderCanvasFrame?.(void 0, null, !1) : t.axis.updateLabels()), [
			"x",
			"y",
			"y2"
		].forEach((e) => {
			let r = t.axis.getLabelText(e);
			r && (!n && (n = {}), n[e] = r);
		}), n;
	},
	min: function(e) {
		let t = this.internal;
		return m(e) || e === !1 ? wh(t, "min", e) : Th(t, "min");
	},
	max: function(e) {
		let t = this.internal;
		return m(e) || e === !1 ? wh(t, "max", e) : Th(t, "max");
	},
	range: function(e) {
		let { axis: t } = this;
		if (arguments.length) {
			let { min: n, max: r } = e;
			y(r) && t.max(r), y(n) && t.min(n);
		} else return {
			max: t.max(),
			min: t.min()
		};
	}
} }, Dh = { groups(e) {
	let t = this.internal, { config: n } = t;
	return v(e) || (n.data_groups = e, t.state.dirty.data = !0, t.redraw()), n.data_groups;
} }, Oh = {
	x(e) {
		let t = this.internal, { axis: n, data: r } = t, i = n.isCustomX() && n.isCategorized();
		return O(e) && (i ? this.categories(e) : (t.updateTargetX(r.targets, e), t.state.dirty.data = !0, t.redraw({
			withUpdateOrgXDomain: !0,
			withUpdateXDomain: !0
		}))), i ? this.categories() : r.xs;
	},
	xs(e) {
		let t = this.internal;
		return k(e) && (t.updateTargetXs(t.data.targets, e), t.state.dirty.data = !0, t.redraw({
			withUpdateOrgXDomain: !0,
			withUpdateXDomain: !0
		})), t.data.xs;
	}
}, kh = class {
	owner;
	config;
	scale;
	charSize = {};
	constructor(e) {
		let t = Nf(), { config: n, params: r } = e;
		this.owner = e, this.config = n, this.scale = t, (n.noTransition || !r.config.transition_duration) && (n.withoutTransition = !0), n.range = this.scaleExtent((r.orgXScale || t).range());
	}
	getSizeFor1Char(e, t, n = !0) {
		let r = {
			w: 5.5,
			h: 11.5
		};
		return this.charSize[e] && n ? this.charSize[e] : (!t.empty() && t.text("0").call((e) => {
			try {
				let { width: t, height: n } = or(e.node(), !0);
				t && n && (r.w = t, r.h = n);
			} finally {
				e.text("");
			}
		}), this.charSize[e] = r, r);
	}
	getTickTransformSetter(e) {
		let { config: t } = this, n = e === "x" ? (e) => `translate(${e + t.tickOffset},0)` : (e) => `translate(0,${e})`;
		return (e, t) => {
			e.attr("transform", (e) => {
				let r = t(e);
				return m(e) ? n(r) : null;
			});
		};
	}
	scaleExtent(e) {
		let t = e[0], n = e[e.length - 1];
		return t < n ? [t, n] : [n, t];
	}
	generateTicks(e, t) {
		let { tickStepSize: n } = this.owner.params, [r, i] = e.domain(), a = [];
		if (t && n) {
			let e = Math.round(r);
			for (; e <= i;) a.push(e), e += n;
		} else if (e.ticks) {
			let { tickArguments: t } = this.config;
			if (e.type === "log" && !t) {
				let t = Nf("_log").domain([r > 0 ? r : 1, i]).range(e.range());
				a = t.ticks();
				for (let e = i.toFixed().length; a.length > 15; e--) a = t.ticks(e);
				a.splice(0, 1, r), a.splice(a.length - 1, 1, i);
			} else a = e.ticks(...this.config.tickArguments || []);
		}
		return a;
	}
	copyScale() {
		let e = this.scale.copy();
		return e.domain().length || e.domain(this.scale.domain()), e.type = this.scale.type, e;
	}
	textFormatted(e) {
		let t = this.config.tickFormat, n = /\d+\.\d+0{5,}\d$/.test(e) ? +String(e).replace(/0+\d$/, "") : e, r = t ? t(n) : n;
		return y(r) ? r : "";
	}
	transitionise(e) {
		let { config: t } = this, n = e;
		if (t.withoutTransition) n = e.interrupt();
		else if (t.transition || !this.owner.params.noTransition) try {
			n = e.transition(t.transition);
		} catch {}
		return n;
	}
};
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/ChartInternal/Axis/AxisRenderer.js
function Ah(e) {
	return e === "subX" ? "x" : e === "subY" ? "y" : e === "subY2" ? "y2" : e;
}
function jh(e) {
	let t = Ah(e);
	return /^sub/.test(e) ? `subchart_axis_${t}` : `axis_${t}`;
}
var Mh = class {
	helper;
	config;
	params;
	g;
	generatedTicks = [];
	canReuseTickTextOnResize(e) {
		let { config: t, params: n } = this, { config: r, id: i, owner: a } = n, o = /^(x|subX)$/.test(i), s = Ah(i), c = /^sub/.test(i) && r[`subchart_axis_${s}_tick_format`] || r[`axis_${s}_tick_format`], l = n.tickMultiline && n.isCategory && !e && !(n.tickWidth > 0);
		return !(!a.state.resizing || a.state.flowing || h(r.axis_evalTextSize) || c || n.tickTitle || o && r.axis_x_tick_autorotate || l || !t.withoutTransition);
	}
	canReuseTickNodesOnResize(e, t, n, r) {
		if (r.tick || !r.text || !this.canReuseTickTextOnResize(n) || e.size() !== t.length) return !1;
		let i = e.nodes();
		for (let e = 0; e < t.length; e++) {
			let n = i[e].__data__, r = t[e];
			if (n instanceof Date || r instanceof Date) {
				if (+n != +r) return !1;
			} else if (n !== r) return !1;
		}
		return !0;
	}
	constructor(e = {}) {
		let t = {
			innerTickSize: 6,
			outerTickSize: e.outerTick ? 6 : 0,
			orient: "bottom",
			range: [],
			tickArguments: null,
			tickCentered: null,
			tickCulling: !0,
			tickFormat: null,
			tickLength: 9,
			tickOffset: 0,
			tickPadding: 3,
			tickValues: null,
			transition: null,
			noTransition: e.noTransition
		};
		t.tickLength = Math.max(t.innerTickSize, 0) + t.tickPadding, this.config = t, this.params = e, this.helper = new kh(this);
	}
	create(e) {
		let t = this, { config: n, helper: r, params: i } = t, { scale: a } = r, { orient: o } = n, s = this.splitTickText.bind(t), c = /^(left|right)$/.test(o), l = /^(top|bottom)$/.test(o), u = r.getTickTransformSetter(l ? "x" : "y"), d = u === r.axisX ? "y" : "x", f = /^(top|left)$/.test(o) ? -1 : 1, p = i.tickTextRotate;
		this.config.range = a.rangeExtent ? a.rangeExtent() : r.scaleExtent((i.orgXScale || a).range());
		let { innerTickSize: m, tickLength: g, range: v } = n, y = i.id, b = Ah(y), { isSubAxes: x } = i, S = !x && b && /^(x|y|y2)$/.test(b) ? i.config[`axis_${b}_tick_text_position`] : {
			x: 0,
			y: 0
		}, C = jh(y), w = i.config[`${C}_show`], T = x ? {
			tick: !0,
			text: !0
		} : {
			tick: w ? i.config[`${C}_tick_show`] : !1,
			text: w ? i.config[`${C}_tick_text_show`] : !1
		}, E = i.config.axis_evalTextSize, D;
		e.each(function() {
			let e = L(this), b = this.__chart__ || a, x = r.copyScale();
			D = e, this.__chart__ = x, n.tickOffset = i.isCategory ? (x(1) - x(0)) / 2 : 0;
			let C = e.selectAll(".domain").data([0]);
			if (C.enter().append("path").attr("class", "domain").merge(C).attr("d", () => {
				let e = n.outerTickSize * f;
				return l ? `M${v[0]},${e}V0H${v[1]}V${e}` : `M${e},${v[0]}H0V${v[1]}H${e}`;
			}), T.tick || T.text) {
				let a = n.tickValues || r.generateTicks(x, c || i.config.axis_rotated);
				t.generatedTicks = a;
				let v = e.selectAll(".tick");
				if (t.canReuseTickNodesOnResize(v, a, c || i.config.axis_rotated, T)) u(v, x);
				else {
					v = v.data(a, x);
					let e = v.enter().insert("g", ".domain").attr("class", "tick"), n = v.exit().remove();
					v = e.merge(v), T.tick && e.append("line"), T.text && e.append("text");
					let C = !e.empty() || !n.empty(), w = T.text && !C && t.canReuseTickTextOnResize(c || i.config.axis_rotated), D = {
						w: 0,
						h: 0
					}, k = v.selectAll("text.__bb-empty");
					if (T.text && !w) {
						let e = v.select("text"), n = [];
						k = e, h(E) && (D = E.bind(t.params.owner.api)(e.node(), y), this.classList.contains(z.dummy) && (this.sizeFor1Char = D)), D && D.w !== 0 && D.h !== 0 || (D = t.helper.getSizeFor1Char(o, e, !!E));
						let u = e.selectAll("tspan").data((e, t) => {
							let o;
							if (i.tickMultiline) o = s(e, x, a, c, D.w);
							else {
								let t = r.textFormatted(e);
								o = O(t) ? t.concat() : [t];
							}
							return n[t] = o.length, o.map((e) => ({
								index: t,
								splitted: e
							}));
						});
						u.exit().remove(), u = u.enter().append("tspan").merge(u).text((e) => e.splitted), u.attr("x", l ? 0 : g * f).attr("dx", (() => {
							let e = 0;
							return /(top|bottom)/.test(o) && p && (e = 8 * Math.sin(p / 180 * Math.PI) * (o === "top" ? -1 : 1)), e + (S.x || 0);
						})()).attr("dy", (e, t) => {
							let r = ".71em", i = 0;
							return o !== "top" && (i = D.h, t === 0 && (i = c ? -((n[e.index] - 1) * (D.h / 2) - 3) : S.y === 0 ? r : 0)), _(i) && S.y ? i + S.y : i || r;
						});
					}
					let A = v.select("line");
					if (e.select("line").attr(`${d}2`, m * f), e.select("text").attr(d, g * f), t.setTickLineTextPosition(A, k, D), i.tickTitle) {
						let e = k.select("title"), t = i.tickTitle;
						(e.empty() ? k.append("title") : e).text((e) => t[Number(e)]);
					}
					if (x.bandwidth) {
						let e = x, t = e.bandwidth() / 2;
						b = (n) => e(n) + t, x = b;
					} else b.bandwidth ? b = x : u(n, x);
					v = i.owner.state.flowing ? r.transitionise(v) : i.owner.$T(v), u(e, b), u(v.style("opacity", null), x);
				}
			}
		}), this.g = D;
	}
	getGeneratedTicks(e) {
		let t = this.generatedTicks?.length - 1, n = this.generatedTicks;
		if (t > e) {
			let r = Math.round(t / e + .1);
			n = this.generatedTicks.map((e, t) => t % r === 0 ? e : null).filter((e) => e !== null).splice(0, e);
		}
		return n;
	}
	getTickXY() {
		let { config: e } = this, t = {
			x: 0,
			y: 0
		};
		return this.params.isCategory && (t.x = e.tickCentered ? 0 : e.tickOffset, t.y = e.tickCentered ? e.tickOffset : 0), t;
	}
	getTickSize(e) {
		let { scale: t } = this.helper, { config: n } = this, { innerTickSize: r, range: i } = n, a = t(e) + (n.tickCentered ? 0 : n.tickOffset);
		return i[0] < a && a < i[1] ? r : 0;
	}
	setTickLineTextPosition(e, t, n) {
		let r = this.getTickXY(), { innerTickSize: i, orient: a, tickLength: o, tickOffset: s } = this.config, c = this.params.id, l = this.params.tickTextRotate, u = n.h / 2 - 6, d = (e) => {
			let t = ["start", "end"];
			return a === "top" && t.reverse(), e ? t[e > 0 ? 0 : 1] : "middle";
		}, f = (e) => e ? `rotate(${e})` : null, p = (e) => {
			let t = e / (a === "bottom" ? 15 : 23);
			return e ? 11.5 - 2.5 * t * (e > 0 ? 1 : -1) : o;
		}, { config: { axis_rotated: m, axis_x_tick_text_inner: h } } = this.params.owner, g = this.params.config[`axis_${Ah(c)}_tick_inner`];
		switch (a) {
			case "bottom":
				e.attr("x1", r.x).attr("x2", r.x).attr("y2", (e) => this.getTickSize.bind(this)(e) * (g ? -1 : 1)), t.attr("x", 0).attr("y", p(l)).style("text-anchor", (e, t, { length: n }) => !m && t === 0 && (h === !0 || h.first) ? "start" : !m && t === n - 1 && (h === !0 || h.last) ? "end" : d(l)).attr("transform", f(l));
				break;
			case "top":
				e.attr("x2", 0).attr("y2", g ? i : -i), t.attr("x", 0).attr("y", -(p(l) + u + 6)).style("text-anchor", d(l)).attr("transform", f(l));
				break;
			case "left":
				e.attr("x2", g ? i : -i).attr("y1", r.y).attr("y2", r.y), t.attr("x", -o).attr("y", s + (m ? u / 4 : u)).style("text-anchor", "end");
				break;
			case "right": e.attr("x2", g ? -i : i).attr("y2", 0), t.attr("x", o).attr("y", u).style("text-anchor", "start");
		}
	}
	splitTickText(e, t, n, r, i) {
		let { params: a } = this, o = this.helper.textFormatted(e), s = g(o) && o.indexOf("\n") > -1 ? o.split("\n") : [];
		if (s.length) return s;
		if (O(o)) return o;
		let c = a.tickWidth;
		(!c || c <= 0) && (c = r ? 95 : a.isCategory ? (a.isInverted ? t(n[0]) - t(n[1]) : t(n[1]) - t(n[0])) - 12 : 110);
		function l(e, t) {
			let n, r, a;
			for (let o = 1; o < t.length; o++) if (t.charAt(o) === " " && (r = o), n = t.substr(0, o + 1), a = i * n.length, c < a) return l(e.concat(t.substr(0, r || o)), t.slice(r ? r + 1 : o));
			return e.concat(t);
		}
		return l(s, String(o));
	}
	scale(e) {
		return arguments.length ? (this.helper.scale = e, this) : this.helper.scale;
	}
	orient(e) {
		return arguments.length ? (this.config.orient = e in {
			top: 1,
			right: 1,
			bottom: 1,
			left: 1
		} ? String(e) : "bottom", this) : this.config.orient;
	}
	tickFormat(e) {
		let { config: t } = this;
		return arguments.length ? (t.tickFormat = e, this) : t.tickFormat;
	}
	tickCentered(e) {
		let { config: t } = this;
		return arguments.length ? (t.tickCentered = e, this) : t.tickCentered;
	}
	tickOffset() {
		return this.config.tickOffset;
	}
	tickInterval(e) {
		let { outerTickSize: t, tickOffset: n, tickValues: r } = this.config, i;
		if (this.params.isCategory) {
			let e = this.params.owner.scale.zoom ?? this.helper.scale;
			i = n * 2 || Math.abs(e(1) - e(0));
		} else {
			let n = this.params.owner.scale.zoom ?? this.helper.scale;
			if (i = (this.g ? this.g.select("path.domain").node().getTotalLength() - t * 2 : Math.abs(n.range()[1] - n.range()[0])) / (e || this.g?.selectAll("line").size() || 1), r) for (let e = 0; e < r.length - 1; e++) {
				let t = n(r[e + 1]) - n(r[e]);
				t && t < i && (i = t);
			}
		}
		return i === Infinity ? 0 : i;
	}
	ticks(...e) {
		let { config: t } = this;
		return e.length ? (t.tickArguments = Te(e), this) : t.tickArguments;
	}
	tickCulling(e) {
		let { config: t } = this;
		return arguments.length ? (t.tickCulling = e, this) : t.tickCulling;
	}
	tickValues(e) {
		let { config: t } = this;
		if (h(e)) t.tickValues = () => e(this.helper.scale.domain());
		else {
			if (!arguments.length) return t.tickValues;
			t.tickValues = e;
		}
		return this;
	}
	setTransition(e) {
		return this.config.transition = e, this;
	}
};
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/ChartInternal/Axis/Axis.js
function Nh(e) {
	return e === "subX" ? "x" : e === "subY" ? "y" : e === "subY2" ? "y2" : e;
}
function Ph(e) {
	return /^sub/.test(e);
}
function Fh(e, t, n) {
	let r = Nh(t), i = e[`subchart_axis_${r}_tick_${n}`];
	return Ph(t) && i !== void 0 ? i : e[`axis_${r}_tick_${n}`];
}
function Ih(e) {
	let t = [e[0], e[e.length - 1]], n = 0, r = null;
	for (let t of e) {
		let e = t.textContent?.length ?? 0;
		e > n && (n = e, r = t);
	}
	r && !t.includes(r) && t.push(r);
	let i = e[Math.floor(e.length / 2)];
	return t.includes(i) || t.push(i), t;
}
var Lh = 50, Rh = Symbol("tickWidthFallback");
function zh(e) {
	let t = e.select("line").node(), n = t?.ownerDocument?.defaultView?.getComputedStyle ? parseFloat(t.ownerDocument.defaultView.getComputedStyle(t).strokeWidth) : parseFloat(t?.getAttribute?.("stroke-width"));
	return Number.isFinite(n) && n > 0 ? n : 1;
}
function Bh(e, t, n) {
	let r = e?.scale?.();
	if (!r || t.length < 2) return !1;
	let i = Math.max(1, n) / 2, a = t.map((e) => +r(e)).filter(Number.isFinite).sort((e, t) => e - t);
	if (a.length < 2) return !1;
	let o = a[0] + i;
	for (let e = 1; e < a.length; e++) {
		let t = a[e] - i, n = a[e] + i;
		if (t <= o + 1) return !0;
		o = Math.max(o, n);
	}
	return !1;
}
function Vh(e, t) {
	if (e.length <= Lh) return e;
	let n = /* @__PURE__ */ new Map(), r = (t) => {
		t >= 0 && t < e.length && n.set(t, e[t]);
	};
	r(0), r(e.length - 1), r(Math.floor(e.length / 2));
	let i = Math.max(1, Math.floor(e.length / 47)), a = -1, o = 0;
	for (let n = 0; n < e.length; n += i) {
		r(n);
		let i = e[n], s = t ? t(i) : i, c = Array.isArray(s) ? s.join("").length : String(s ?? "").length;
		c > a && (a = c, o = n);
	}
	return r(o), Array.from(n.keys()).sort((e, t) => e - t).map((e) => n.get(e));
}
function Hh(e) {
	return h(e) ? Qh(e) : !Array.isArray(e) || e.length <= Lh ? e : {
		length: e.length,
		first: e[0],
		middle: e[Math.floor(e.length / 2)],
		last: e[e.length - 1]
	};
}
function Uh(e) {
	return e[Rh];
}
function Wh(e, t) {
	_(t) ? Object.defineProperty(e, Rh, {
		configurable: !0,
		value: t,
		writable: !0
	}) : delete e[Rh];
}
function Gh(e) {
	e.length = 0, Wh(e);
}
function Kh(e, t, n) {
	Gh(e), e.length = t, Wh(e, n);
}
function qh(e) {
	let t = [];
	return t.length = e.length, Object.keys(e).forEach((n) => {
		let r = +n;
		t[r] = e[r];
	}), Wh(t, Uh(e)), t;
}
function Jh(e, t) {
	Gh(e), e.length = t.length, Object.keys(t).forEach((n) => {
		let r = +n;
		e[r] = t[r];
	}), Wh(e, Uh(t));
}
function Yh(e, t, n) {
	let r = e[t];
	if (_(r)) return r;
	let i = Number(r);
	return Number.isFinite(i) ? i : n;
}
var Xh = /* @__PURE__ */ new WeakMap(), Zh = 0;
function Qh(e) {
	if (!e || !/^(function|object)$/.test(typeof e)) return `${typeof e}:${String(e)}`;
	let t = Xh.get(e);
	return t || (t = ++Zh, Xh.set(e, t)), `${typeof e}:${t}`;
}
function $h(e) {
	return e instanceof Date ? `date:${+e}` : Array.isArray(e) ? `[${e.map((e) => $h(e)).join(",")}]` : e && typeof e == "object" ? `{${Object.keys(e).sort().map((t) => `${t}:${$h(e[t])}`).join(",")}}` : typeof e == "function" ? Qh(e) : `${typeof e}:${String(e)}`;
}
function eg(e) {
	return e instanceof Date ? /* @__PURE__ */ new Date(+e) : Array.isArray(e) ? e.map((e) => eg(e)) : e;
}
function tg(e) {
	return {
		width: e.width,
		height: e.height,
		ticks: e.ticks && qh(e.ticks),
		clipPath: e.clipPath,
		domain: eg(e.domain)
	};
}
function ng(e, t) {
	return e.width = t.width, e.height = t.height, e.clipPath = t.clipPath, e.domain = eg(t.domain), e.ticks && t.ticks && Jh(e.ticks, t.ticks), e;
}
var rg = { getAxisInstance: function() {
	return this.axis || new ig(this);
} }, ig = class {
	owner;
	x;
	subX;
	subY;
	subY2;
	y;
	y2;
	axesList = {};
	tick = {
		x: null,
		y: null,
		y2: null
	};
	xs = [];
	orient = {
		x: "bottom",
		y: "left",
		y2: "right",
		subX: "bottom",
		subY: "left",
		subY2: "right"
	};
	constructor(e) {
		this.owner = e, this.setOrient();
	}
	getAxisClassName(e) {
		return `${V.axis} ${V[`axis${Ce(e)}`]}`;
	}
	isHorizontal(e, t) {
		let n = e.config.axis_rotated;
		return t ? n : !n;
	}
	isCategorized() {
		let { config: e, state: t } = this.owner;
		return e.axis_x_type.indexOf("category") >= 0 || t.hasRadar;
	}
	isCustomX() {
		let { config: e } = this.owner;
		return !this.isTimeSeries() && (e.data_x || D(e.data_xs));
	}
	isTimeSeries(e = "x") {
		return this.owner.config[`axis_${e}_type`] === "timeseries";
	}
	isLog(e = "x") {
		return this.owner.config[`axis_${e}_type`] === "log";
	}
	isTimeSeriesY() {
		return this.isTimeSeries("y");
	}
	getAxisType(e = "x") {
		let t = "linear";
		return this.isTimeSeries(e) ? t = this.owner.config.axis_x_localtime ? "time" : "utc" : this.isLog(e) && (t = "log"), t;
	}
	getExtent() {
		let e = this.owner, { config: t, scale: n } = e, r = t.axis_x_extent;
		if (r) {
			if (h(r)) r = r.bind(e.api)(e.getXDomain(e.data.targets), n.subX);
			else if (this.isTimeSeries() && r.every(isNaN)) {
				let t = Le.bind(e);
				r = r.map((e) => n.subX(t(e)));
			}
		}
		return r;
	}
	init() {
		let e = this.owner, { config: t, $el: { main: n, axis: r }, state: { clip: i } } = e, a = ["x", "y"];
		t.axis_y2_show && a.push("y2"), a.forEach((a) => {
			let o = this.getAxisClassName(a);
			r[a] = n.append("g").attr("class", o).attr("clip-path", () => {
				let e = null;
				return a === "x" ? e = i.pathXAxis : a === "y" && (e = i.pathYAxis), e;
			}).attr("transform", e.getTranslate(a)).style("visibility", t[`axis_${a}_show`] ? null : "hidden"), this.generateAxes(a);
		});
	}
	setOrient() {
		let { axis_rotated: e, axis_y_inner: t, axis_y2_inner: n } = this.owner.config;
		this.orient = {
			x: e ? "left" : "bottom",
			y: e ? t ? "top" : "bottom" : t ? "right" : "left",
			y2: e ? n ? "bottom" : "top" : n ? "left" : "right",
			subX: e ? "left" : "bottom",
			subY: e ? t ? "top" : "bottom" : t ? "right" : "left",
			subY2: e ? n ? "bottom" : "top" : n ? "left" : "right"
		};
	}
	generateAxes(e) {
		let t = this.owner, { config: n } = t, r = [], i = n[`axis_${e}_axes`], a = n.axis_rotated, o;
		e === "x" ? o = a ? "left" : "bottom" : e === "y" ? o = a ? "bottom" : "left" : e === "y2" && (o = a ? "top" : "right"), i.length && i.forEach((i) => {
			let a = i.tick || {}, s = t.scale[e].copy();
			i.domain && s.domain(i.domain);
			let c = new Mh({
				outerTick: a.outer !== !1,
				noTransition: !1,
				config: n,
				id: e,
				isSubAxes: !0,
				owner: t
			}).scale(s).orient(o).tickFormat(h(a.format) ? a.format.bind(t.api) : ((e) => e));
			m(a.count) && c.ticks(a.count), a.values && c.tickValues(a.values), r.push(c);
		}), this.axesList[e] = r;
	}
	updateAxes() {
		let e = this.owner, { config: t, $el: { main: n }, $T: r } = e;
		Object.keys(this.axesList).forEach((i) => {
			let a = t[`axis_${i}_axes`], o = e.scale[i].copy(), s = o.range();
			this.axesList[i].forEach((c, l) => {
				let u = c.scale().range();
				s.every((e, t) => e === u[t]) || c.scale().range(s);
				let d = `${this.getAxisClassName(i)}-${l + 1}`, f = n.select(`.${d.replace(/\s/, ".")}`);
				f.empty() ? (f = n.append("g").attr("class", d).style("visibility", t[`axis_${i}_show`] ? null : "hidden"), c.create(f)) : (a[l].domain && o.domain(a[l].domain), c.scale(o).create(r(f))), f.attr("transform", e.getTranslate(i, l + 1));
			});
		});
	}
	setAxis(e, t, n, r) {
		let i = this.owner, a = Nh(e);
		Ph(e) || (this.tick[a] = this.getTickValues(a)), this[e] = this.getAxis(e, t, n, e === "x" && (i.scale.zoom || i.config.subchart_show || i.state.resizing) ? !0 : r);
	}
	getAxis(e, t, n, r, i) {
		let a = this.owner, { config: o } = a, s = /^(x|subX)$/.test(e), c = Nh(e), l = s && this.isCategorized(), u = this.orient[e], d = i ? 0 : a.getAxisTickRotate(c), f;
		if (s) f = e === "subX" ? a.format.subXAxisTick : a.format.xAxisTick;
		else {
			let t = Ph(e) && o[`subchart_axis_${c}_tick_format`] || o[`axis_${c}_tick_format`];
			h(t) && (f = t.bind(a.api));
		}
		let p = Ph(e) ? this.getTickValues(c, !0) : this.tick[c], m = ke({
			outerTick: n,
			noTransition: r,
			config: o,
			id: e,
			tickTextRotate: d,
			owner: a
		}, s && {
			isCategory: l,
			isInverted: o.axis_x_inverted,
			tickMultiline: o.axis_x_tick_multiline,
			tickWidth: o.axis_x_tick_width,
			tickTitle: l && o.axis_x_tick_tooltip && a.api.categories(),
			orgXScale: a.scale.x
		});
		s || (m.tickStepSize = o[`axis_${c}_tick_stepSize`]);
		let g = new Mh(m).scale(s && a.scale.zoom || t).orient(u);
		if (s && this.isTimeSeries() && p && !h(p)) {
			let e = Le.bind(a);
			p = p.map((t) => e(t));
		} else !s && this.isTimeSeriesY() && (g.ticks(o.axis_y_tick_time_value), p = null);
		p && g.tickValues(p), g.tickFormat(f || !s && a.isStackNormalized() && a.hasAxisGroupedData(c) && ((e) => `${e}%`)), l && (g.tickCentered(o.axis_x_tick_centered), E(o.axis_x_tick_culling) && (o.axis_x_tick_culling = !1));
		let _ = Fh(o, e, "count");
		return _ && g.ticks(_), g;
	}
	updateXAxisTickValues(e, t) {
		let n = this.owner, { config: r } = n, i = r.axis_x_tick_fit, a = (t = r.axis_x_tick_count) => {
			let a = t, o;
			return i && (o = n.mapTargetsToUniqueXs(e), this.isCategorized() && a > o.length && (a = o.length), o = this.generateTickValues(o, a, this.isTimeSeries())), o;
		}, o = a();
		if (t) t.tickValues(o);
		else if (this.x) {
			let e = this.getTickValues("x", !0), t = Fh(r, "subX", "count"), n = e ?? (t === r.axis_x_tick_count ? o : a(t));
			this.x.tickValues(o), this.subX?.tickValues(n);
		}
		return o;
	}
	getId(e) {
		let { config: t, scale: n } = this.owner, r = t.data_axes[e];
		return r && n[r] || (r = "y"), r;
	}
	getXAxisTickFormat(e) {
		let t = this.owner, { config: n, format: r } = t, i = e && n.subchart_axis_x_tick_format || n.axis_x_tick_format, a = this.isTimeSeries(), o = this.isCategorized(), s;
		return i ? h(i) ? s = i.bind(t.api) : a && (s = (e) => e ? r.axisTime(i)(e) : "") : s = a ? r.defaultAxisTime : o ? t.categoryName : (e) => e < 0 ? e.toFixed(0) : e, h(s) ? (e) => s.apply(t, o ? [e, t.categoryName(e)] : [e]) : s;
	}
	getTickValues(e, t = !1) {
		let n = this.owner, r = t ? Fh(n.config, `sub${Ce(e)}`, "values") : n.config[`axis_${e}_tick_values`], i = h(r) ? r.call(n.api) : r, a = n[`${e}Axis`];
		return t ? i ?? void 0 : i || (a ? a.tickValues() : void 0);
	}
	getLabelOptionByAxisId(e) {
		return this.owner.config[`axis_${e}_label`];
	}
	getLabelText(e) {
		let t = this.getLabelOptionByAxisId(e);
		return g(t) ? t : t ? t.text : null;
	}
	setLabelText(e, t) {
		let { config: n } = this.owner, r = this.getLabelOptionByAxisId(e);
		g(r) ? n[`axis_${e}_label`] = t : r && (r.text = t);
	}
	getLabelPosition(e, t) {
		let n = this.owner.config.axis_rotated, r = this.getLabelOptionByAxisId(e), i = w(r) && r.position ? r.position : t[+!n], a = (e) => !!~i.indexOf(e);
		return {
			isInner: a("inner"),
			isOuter: a("outer"),
			isLeft: a("left"),
			isCenter: a("center"),
			isRight: a("right"),
			isTop: a("top"),
			isMiddle: a("middle"),
			isBottom: a("bottom")
		};
	}
	getAxisLabelPosition(e) {
		return this.getLabelPosition(e, e === "x" ? ["inner-top", "inner-right"] : ["inner-right", "inner-top"]);
	}
	xForAxisLabel(e) {
		let t = this.owner, { state: { width: n, height: r } } = t, i = this.getAxisLabelPosition(e), a = i.isMiddle ? -r / 2 : 0;
		return this.isHorizontal(t, e !== "x") ? a = i.isLeft ? 0 : i.isCenter ? n / 2 : n : i.isBottom && (a = -r), a;
	}
	textAnchorForAxisLabel(e) {
		let t = this.owner, n = this.getAxisLabelPosition(e), r = n.isMiddle ? "middle" : "end";
		return this.isHorizontal(t, e !== "x") ? r = n.isLeft ? "start" : n.isCenter ? "middle" : "end" : n.isBottom && (r = "start"), r;
	}
	dxForAxisLabel(e) {
		let t = this.owner, n = this.getAxisLabelPosition(e), r = n.isBottom ? "0.5em" : "0";
		return this.isHorizontal(t, e !== "x") ? r = n.isLeft ? "0.5em" : n.isRight ? "-0.5em" : "0" : n.isTop && (r = "-0.5em"), r;
	}
	dyForAxisLabel(e) {
		let t = this.owner, { config: n } = t, r = n.axis_rotated, i = this.getAxisLabelPosition(e).isInner, a = n[`axis_${e}_tick_rotate`] ? t.getHorizontalAxisHeight(e) : 0, { width: o } = this.getMaxTickSize(e), s;
		if (e === "x") {
			let e = n.axis_x_height;
			s = r ? i ? "1.2em" : -25 - o : i ? "-0.5em" : e ? e - 10 : a ? a - 10 : "3em";
		} else s = {
			y: [
				"-0.5em",
				10,
				"3em",
				"1.2em",
				10
			],
			y2: [
				"1.2em",
				-20,
				"-2.2em",
				"-0.5em",
				15
			]
		}[e], s = r ? i ? s[0] : a ? a * (e === "y2" ? -1 : 1) - s[1] : s[2] : i ? s[3] : (s[4] + (n[`axis_${e}_inner`] ? 0 : o + s[4])) * (e === "y" ? -1 : 1);
		return s;
	}
	getTickFormatCacheValue(e) {
		let t = this.owner, { config: n } = t;
		return e === "x" ? {
			format: n.axis_x_tick_format,
			type: n.axis_x_type,
			localtime: n.axis_x_localtime,
			categories: n.axis_x_categories
		} : {
			format: n[`axis_${e}_tick_format`],
			normalized: t.isStackNormalized(),
			grouped: t.hasAxisGroupedData(e),
			type: n[`axis_${e}_type`]
		};
	}
	getMaxTickSizeFingerprint(e, t, n, r, i, a) {
		let { config: o, state: s } = this.owner, c = e === "x", l = c ? "axis_x" : `axis_${e}`, u = r.tickValues();
		return $h({
			id: e,
			withoutRecompute: !!a,
			dataGeneration: s.dataGeneration,
			size: [s.current.width, s.current.height],
			range: t.range?.(),
			domain: n,
			type: t.type,
			orient: this.orient[e],
			axisRotated: o.axis_rotated,
			evalTextSize: o.axis_evalTextSize,
			format: this.getTickFormatCacheValue(e),
			ticks: {
				values: Hh(u),
				rawValues: o[`${l}_tick_values`],
				arguments: r.ticks(),
				count: o[`${l}_tick_count`],
				rotate: i,
				show: o[`${l}_tick_show`],
				textShow: o[`${l}_tick_text_show`],
				textPosition: o[`${l}_tick_text_position`],
				inner: o[`${l}_tick_inner`],
				culling: o[`${l}_tick_culling`],
				cullingMax: o[`${l}_tick_culling_max`],
				cullingLines: o[`${l}_tick_culling_lines`],
				cullingReverse: o[`${l}_tick_culling_reverse`],
				stepSize: !c && o[`${l}_tick_stepSize`],
				timeValue: !c && o[`${l}_tick_time_value`],
				fit: c && o.axis_x_tick_fit,
				autorotate: c && o.axis_x_tick_autorotate,
				centered: c && o.axis_x_tick_centered,
				inverted: c && o.axis_x_inverted,
				multiline: c && o.axis_x_tick_multiline,
				width: c && o.axis_x_tick_width
			}
		});
	}
	getMaxTickSize(e, t) {
		let n = this.owner, { config: r, state: i, $el: { svg: a, chart: o } } = n, { current: s, resizing: c } = i, l = s.maxTickSize[e], u = `${Y.maxTickSize}_${e}_${!!t}`, d = n.cache.get(u);
		if (d && d.generation === i.redrawGeneration) return l;
		let f = `axis_${e}`, p = {
			width: 0,
			height: 0
		}, m;
		if (c || t || !r[`${f}_show`] || l.width > 0 && n.filterTargetsToShow().length === 0) return l;
		if ((a || r.render_mode === "canvas") && n.scale[e]?.copy) {
			let a = /^y2?$/.test(e), s = n.getTargetsToShow(), c = n.scale[e].copy().domain(n[`get${a ? "Y" : "X"}Domain`](s, e)), h = c.domain(), g = h[0] === h[1] && h.every((e) => e > 0), v = O(l.domain) && l.domain[0] === l.domain[1] && l.domain.every((e) => e > 0);
			if (g || v) return l;
			l.domain = h, a || Gh(l.ticks);
			let y = this.getAxis(e, c, !1, !1, !0), b = r[`${f}_tick_rotate`], x = r[`${f}_tick_count`];
			if (!r[`${f}_tick_values`] && x && y.tickValues(this.generateTickValues(h, x, a ? this.isTimeSeriesY() : this.isTimeSeries())), !a && this.updateXAxisTickValues(s, y), m = this.getMaxTickSizeFingerprint(e, c, h, y, b, t), d?.fingerprint === m) return n.cache.add(u, {
				...d,
				generation: i.redrawGeneration
			}), ng(l, d.value);
			let S = y.tickValues(), C = !a && Array.isArray(S) && S.length > Lh;
			C && y.tickValues(Vh(S, y.tickFormat()));
			let w = o.append("svg").style("visibility", "hidden").style("position", "fixed").style("top", "0").style("left", "0"), T = w.append("g").attr("class", `${V[`axis${Ce(e)}`]} ${z.dummy}`);
			y.create(T);
			let { sizeFor1Char: E } = T.node(), D = w.selectAll("text").attr("transform", _(b) ? `rotate(${b})` : null), k = C ? S.length : D.size();
			if (E) D.each(function(e, t) {
				let n = this.textContent.length * E.w, r = E.h;
				p.width = Math.max(p.width, n), p.height = Math.max(p.height, r), a || (l.ticks[t] = n);
			});
			else {
				let e = [];
				if (D.each(function() {
					e.push(this);
				}), (e.length <= 5 ? e : Ih(e)).map((e) => R(e, !0)).forEach((e) => {
					p.width = Math.max(p.width, e.width), p.height = Math.max(p.height, e.height);
				}), !a) for (let t = 0; t < e.length; t++) l.ticks[t] = p.width;
			}
			!a && C && Kh(l.ticks, k, p.width), w.remove();
		}
		return Object.keys(p).forEach((e) => {
			p[e] > 0 && (l[e] = p[e]);
		}), n.cache.add(u, {
			fingerprint: m,
			generation: i.redrawGeneration,
			value: tg(l)
		}), l;
	}
	getXAxisTickTextY2Overflow(e) {
		let t = this.owner, { axis: n, config: r, state: { current: i, isLegendRight: a, legendItemWidth: o } } = t, s = t.getAxisTickRotate("x"), c = s > 0 && s < 90;
		if ((n.isCategorized() || n.isTimeSeries()) && r.axis_x_tick_fit && (!r.axis_x_tick_culling || E(r.axis_x_tick_culling)) && !r.axis_x_tick_multiline && c) {
			let n = r.axis_y2_show && i.maxTickSize.y2.width || 0, c = a && o || 0, l = i.width - t.getCurrentPaddingByDirection("left"), u = this.getXAxisTickMaxOverflow(s, l - e) - n - c, d = Math.max(0, u) + e;
			return Math.min(d, l / 2);
		}
		return 0;
	}
	getXAxisTickMaxOverflow(e, t) {
		let n = this.owner, { axis: r, config: i, state: a } = n, o = r.isTimeSeries(), s = a.current.maxTickSize.x.ticks, c = s.length, l = Uh(s) ?? a.current.maxTickSize.x.width, { left: u, right: d } = a.axis.x.padding, f = 0, p = c - (o && i.axis_x_tick_fit ? .5 : 0);
		for (let n = 0; n < c; n++) {
			let r = n + 1, i = Math.cos(Math.PI * e / 180) * Yh(s, n, l), a = r - (o ? 1 : .5) + u;
			if (a <= 0) continue;
			let c = (t - i) / a, m = p - r, h = d * c, g = m * c + h, _ = i - c / 2 - g;
			f = Math.max(f, _);
		}
		let m = n.getTargetsToShow(), h = 0;
		if (!o && i.axis_x_tick_count <= m.length && m[0].values.length) {
			let e = Nf(n.axis.getAxisType("x"), 0, t - f).domain([u * -1, n.getXDomainMax(n.data.targets) + 1 + d]);
			h = (e(1) - e(0)) / 2;
		}
		return f + h;
	}
	updateLabels(e) {
		let { config: t, $el: { main: n }, $T: r } = this.owner, i = t.axis_rotated;
		[
			"x",
			"y",
			"y2"
		].forEach((t) => {
			let a = this.getLabelText(t), o = `axis${Ce(t)}`, s = V[`${o}Label`];
			if (a) {
				let c = n.select(`text.${s}`);
				c.empty() && (c = n.select(`g.${V[o]}`).insert("text", ":first-child").attr("class", s).attr("transform", ["rotate(-90)", null][t === "x" ? +!i : +i]).style("text-anchor", () => this.textAnchorForAxisLabel(t))), r(c, e).attr("x", () => this.xForAxisLabel(t)).attr("dx", () => this.dxForAxisLabel(t)).attr("dy", () => this.dyForAxisLabel(t)).text(a);
			}
		});
	}
	getPadding(e, t, n, r) {
		let i = _(e) ? e : e[t];
		return m(i) ? this.owner.convertPixelToScale(/(bottom|top)/.test(t) ? "y" : "x", i, r) : n;
	}
	generateTickValues(e, t, n) {
		let r = e;
		if (t) {
			let i = h(t) ? t() : t;
			if (i === 1) r = [e[0]];
			else if (i === 2) r = [e[0], e[e.length - 1]];
			else if (i > 2) {
				let t = this.isCategorized(), a = i - 2, o = e[0], s = e[e.length - 1], c = (s - o) / (a + 1), l;
				r = [o];
				for (let e = 0; e < a; e++) l = +o + c * (e + 1), r.push(n ? new Date(l) : t ? Math.round(l) : l);
				r.push(s);
			}
		}
		return n || (r = r.sort((e, t) => e - t)), r;
	}
	generateTransitions(e) {
		let { $el: { axis: t }, $T: n } = this.owner, [r, i, a, o, s, c] = [
			"x",
			"y",
			"y2",
			"subX",
			"subY",
			"subY2"
		].map((r) => n(t[r], e));
		return {
			axisX: r,
			axisY: i,
			axisY2: a,
			axisSubX: o,
			axisSubY: s,
			axisSubY2: c
		};
	}
	redraw(e, t, n) {
		let { config: r, state: i, $el: a } = this.owner, o = t ? "0" : null;
		[
			"x",
			"y",
			"y2",
			"subX",
			"subY",
			"subY2"
		].forEach((t) => {
			let i = this[t], s = a.axis[t];
			i && s && (!n && !r.transition_duration && (i.config.withoutTransition = !0), s.style("opacity", o), i.create(e[`axis${Ce(t)}`]));
		}), this.updateAxes(), !i.rendered && r.axis_tooltip && this.setAxisTooltip();
	}
	syncAxisDomains(e, t, n) {
		let r = this.owner, { config: i, scale: a, $el: o } = r, s = !!a.zoom, c;
		if (!s && this.isCategorized() && e.length === 0 && o.axis.x && a.x.domain([0, o.axis.x.selectAll(".tick").size()]), a.x && e.length ? (!s && r.updateXDomain(e, t.UpdateXDomain, t.UpdateOrgXDomain, t.TrimXDomain), i.axis_x_tick_values || this.updateXAxisTickValues(e)) : this.x && (this.x.tickValues([]), this.subX?.tickValues([])), i.zoom_rescale && !n && (c = a.x.orgDomain()), ["y", "y2"].forEach((t) => {
			let n = `axis_${t}_`, o = a[t];
			if (o) {
				let a = i[`${n}tick_values`], s = i[`${n}tick_count`];
				if (o.domain(r.getYDomain(e, t, c)), !a && s) {
					let e = r.axis[t], n = o.domain();
					e.tickValues(this.generateTickValues(n, n.every((e) => e === 0) ? 1 : s, this.isTimeSeriesY()));
				}
			}
		}), t.Y) {
			let t = () => {
				a.subY?.domain(r.getYDomain(e, "y")), a.subY2?.domain(r.getYDomain(e, "y2")), ["y", "y2"].forEach((e) => {
					let t = e === "y2" ? "subY2" : "subY", n = a[t], o = r.axis[t], s = this.getTickValues(e, !0), c = Fh(i, t, "count");
					if (!n || !o || s || !c) return;
					let l = n.domain();
					o.tickValues(this.generateTickValues(l, l.every((e) => e === 0) ? 1 : c, this.isTimeSeriesY()));
				});
			};
			i.subchart_show ? r.withSubchartTypeContext(t) : t();
		}
	}
	redrawAxis(e, t, n, r, i) {
		let a = this.owner;
		this.syncAxisDomains(e, t, r), this.redraw(n, a.hasArcType(), i), this.updateLabels(t.Transition), (t.UpdateXDomain || t.UpdateXAxis || t.Y) && e.length && this.setCulling();
	}
	setCulling() {
		let { config: e, state: { clip: t, current: n }, $el: r } = this.owner;
		[
			"subX",
			"x",
			"y",
			"y2",
			"subY",
			"subY2"
		].forEach((i) => {
			let a = r.axis[i], o = Fh(e, i, "culling");
			if (a && o) {
				let o = a.selectAll(".tick"), s = Ae(o.data(), !Fh(e, i, "culling_reverse")), c = s.length, l = Fh(e, i, "culling_max"), u = !Fh(e, i, "culling_lines") || Bh(this[i], s, zh(o)), d;
				if (c) {
					for (let e = 1; e < c; e++) if (c / e < l) {
						d = e;
						break;
					}
					d ??= c;
					let e = /* @__PURE__ */ new Map();
					for (let t = 0; t < s.length; t++) e.set(s[t], t);
					o.each(function(t) {
						let n = u ? this : this.querySelector("text");
						n && (n.style.display = (e.get(t) ?? 0) % d ? "none" : null);
					});
				} else o.style("display", null);
				if (i === "x") {
					let e = n.maxTickSize.x.clipPath ? t.pathXAxisTickTexts : null;
					r.svg.selectAll(`.${V.axisX} .tick text`).attr("clip-path", e);
				}
			}
		});
	}
	setAxisTooltip() {
		let e = this.owner, { config: { axis_rotated: t, axis_tooltip: n }, $el: { axis: r, axisTooltip: i } } = e, a = n.backgroundColor ?? "black";
		e.generateTextBGColorFilter(a, {
			x: -.15,
			y: -.2,
			width: 1.3,
			height: 1.3
		}), [
			"x",
			"y",
			"y2"
		].forEach((n) => {
			(g(a) || a[n]) && (i[n] = r[n]?.append("text").classed(V[`axis${n.toUpperCase()}Tooltip`], !0).attr("filter", e.updateTextBGColor({ id: n }, a)), t ? i[n]?.attr(n === "x" ? "x" : "y", n === "y" ? "1.15em" : n === "x" ? "-0.3em" : "-0.4em").attr(`d${n === "x" ? "y" : "x"}`, n === "x" ? "0.4em" : "-1.3em").style("text-anchor", n === "x" ? "end" : null) : i[n]?.attr(n === "x" ? "y" : "x", n === "x" ? "1.15em" : `${n === "y" ? "-" : ""}0.4em`).attr(`d${n === "x" ? "x" : "y"}`, n === "x" ? "-1em" : "0.3em").style("text-anchor", n === "y" ? "end" : null));
		});
	}
}, ag = {
	initEventRect() {
		this.$el.main.select(`.${z.chart}`).append("g").attr("class", Or.eventRects).style("fill-opacity", "0");
	},
	redrawEventRect() {
		let e = this, { config: t, state: n, $el: r } = e, i = e.isMultipleX(), a = t.axis_x_inverted;
		if (r.eventRect) e.updateEventRect(r.eventRect, !0);
		else if (e.data.targets.length) {
			let a = e.$el.main.select(`.${Or.eventRects}`).style("cursor", t.zoom_enabled && t.zoom_type !== "drag" ? t.axis_rotated ? "ns-resize" : "ew-resize" : null).classed(Or.eventRectsMultiple, i).classed(Or.eventRectsSingle, !i).selectAll(`.${Or.eventRect}`).data([0]).enter().append("rect");
			e.updateEventRect(a), e.updateEventType(a), a.call(e.getDraggableSelection()), r.eventRect = a, e.state.inputType === "touch" && !r.svg.on("touchstart.eventRect") && !e.hasArcType() && e.bindTouchOnEventRect(), n.rendered && e.updateEventRect(r.eventRect, !0);
		}
		if (!i) {
			let r = e.getMaxDataCountTarget();
			(!t.data_xSort || a) && r.sort((e, t) => a ? t.x - e.x : e.x - t.x), e.updateDataIndexByX(r), e.updateXs(r), e.updatePointClass?.(!0), n.eventReceiver.data = r;
		}
		e.updateEventRectData();
	},
	bindTouchOnEventRect() {
		let e = this, { config: t, state: n, $el: { eventRect: r, svg: i } } = e, a = (t) => {
			if (e.isMultipleX()) e.selectRectForMultipleXs(t);
			else {
				let r = e.getDataIndexFromEvent(n.event);
				e.callOverOutForTouch(r), r === -1 ? e.unselectRect() : e.selectRectForSingle(t, r);
			}
		}, o = () => {
			e.unselectRect(), e.callOverOutForTouch();
		}, s = t.interaction_inputType_touch.preventDefault, c = b(s) && s || !1, l = !isNaN(s) && s || null, u, d = !c && l === null, f = (e) => {
			let n = e.type, r = e.changedTouches[0][`client${t.axis_rotated ? "Y" : "X"}`];
			n === "touchstart" ? c ? e.preventDefault() : l !== null && (u = r) : n === "touchmove" && (c || u === !0 || l !== null && Math.abs(u - r) >= l) && (u = !0, e.preventDefault());
		};
		r.on("touchstart", (t) => {
			n.event = t, e.updateEventRect();
		}, { passive: d }).on("touchstart.eventRect touchmove.eventRect", (t) => {
			if (n.event = t, !r.empty() && r.classed(Or.eventRect)) {
				if (n.dragging || n.flowing || e.hasArcType() || t.touches.length > 1) return;
				f(t), a(r.node());
			} else o();
		}, { passive: d }).on("touchend.eventRect", (t) => {
			n.event = t, !r.empty() && r.classed(Or.eventRect) && (e.hasArcType() || !e.toggleShape || n.cancelClick) && (n.cancelClick &&= !1);
		}, { passive: d }), i.on("touchstart", (e) => {
			n.event = e;
			let { target: t } = e;
			t && t !== r.node() && o();
		}, { passive: d });
	},
	updateEventRect(e, t = !1) {
		let { state: n, $el: r } = this, { eventReceiver: i, width: a, height: o, rendered: s, resizing: c } = n, l = e || r.eventRect;
		(!s || c || t) && (l.attr("x", 0).attr("y", 0).attr("width", a).attr("height", o), (!s || t) && l.classed(Or.eventRect, !0)), (() => {
			if (i) {
				let e = lr(r.chart.node());
				i.rect = R(l.node(), !0).toJSON(), i.rect.top += e.y, i.rect.left += e.x;
			}
		})();
	},
	updateEventType(e) {
		let t = this, n = b(e), r = n ? t.$el.eventRect : e, i = n ? e !== r?.datum().multipleX : !1;
		r && (i && r?.on("mouseover mousemove mouseout click", null), t.isMultipleX() ? t.generateEventRectsForMultipleXs(r) : t.generateEventRectsForSingleX(r));
	},
	updateEventRectData() {
		let e = this, { config: t, scale: n, state: r } = e, i = n.zoom || n.x, a = t.axis_rotated, o = e.isMultipleX(), s = i?.domain(), c = s ? `${s[0]}_${s[1]}_${r.width}_${r.height}_${e.data.targets.length}_${r.dataGeneration}_${[...r.hiddenTargetIds].join(",")}` : null;
		if (c && c === r._eventRectFingerprint) return;
		r._eventRectFingerprint = c;
		let l, u, d, f;
		if (e.updateEventType(o), o) l = 0, u = 0, d = r.width, f = r.height;
		else {
			let t, n;
			if (e.axis.isCategorized()) t = e.getEventRectWidth(), n = (e) => i(e.x) - t / 2;
			else {
				let o = ({ index: t }) => ({
					prev: e.getPrevX(t),
					next: e.getNextX(t)
				});
				t = (e) => {
					let t = o(e), n = i.domain(), s;
					return s = t.prev === null && t.next === null ? a ? r.height : r.width : t.prev === null ? (i(t.next) + i(e.x)) / 2 : t.next === null ? i(n[1]) - (i(t.prev) + i(e.x)) / 2 : Math.max(0, (i(t.next) - i(t.prev)) / 2), s;
				}, n = (e) => {
					let t = o(e), n;
					return n = t.prev === null && t.next === null ? 0 : t.prev === null ? i(i.domain()[0]) : (i(e.x) + i(t.prev)) / 2, n;
				};
			}
			l = a ? 0 : n, u = a ? n : 0, d = a ? r.width : t, f = a ? t : r.height;
		}
		let { eventReceiver: p } = r, m = (e, t) => h(e) ? e(t) : e;
		p.coords.splice(p.data.length), p.data.forEach((e, t) => {
			p.coords[t] = {
				x: m(l, e),
				y: m(u, e),
				w: m(d, e),
				h: m(f, e)
			};
		});
	},
	selectRectForSingle(e, t) {
		let n = this, { config: r, state: i, $el: { main: a, circle: o } } = n, s = r.data_selection_enabled, c = r.data_selection_grouped, l = r.data_selection_isselectable, u = r.tooltip_grouped, d = n.getAllValuesOnIndex(t);
		if (u && (n.showTooltip(d, e), n.showGridFocus?.(d), n.showSubchartGridFocus?.(d), !s || c)) return;
		!o && a.selectAll(`.${z.EXPANDED}:not(.${K.shape}-${t})`).classed(z.EXPANDED, !1);
		let f = a.selectAll(`.${K.shape}-${t}`).classed(z.EXPANDED, !0).style("cursor", l ? "pointer" : null).filter(function(e) {
			return n.isWithinShape(this, e);
		});
		if (f.call((r) => {
			let i = r.data();
			s && (c || l?.bind(n.api)(i)) && (e.style.cursor = "pointer"), u || (n.showTooltip(i, e), n.showGridFocus?.(i), n.showSubchartGridFocus?.(i), n.unexpandCircles?.(), r.each((e) => n.setExpand(t, e.id)));
		}), !u && f.empty()) {
			let a = ar(i.event, e), o = d.filter((e) => n.isTargetToShow(e.id) ? n.dist(e, a) < n.getPointSensitivity(e) : !1);
			if (o.length > 0) {
				let r = o[0], i = n.dist(r, a);
				for (let e = 1; e < o.length; e++) {
					let t = o[e], s = n.dist(t, a);
					s < i && (i = s, r = t);
				}
				n.showTooltip([r], e), n.showGridFocus?.([r]), n.showSubchartGridFocus?.([r]), n.unexpandCircles?.(), n.setExpand(t, r.id, !0), s && (c || l?.bind(n.api)(r)) && (e.style.cursor = "pointer");
			} else r.interaction_onout && (n.hideGridFocus?.(), n.hideSubchartGridFocus?.(), n.hideTooltip(), !c && n.setExpand(t));
		}
	},
	selectRectForMultipleXs(e, t = !0) {
		let n = this, { config: r, state: i } = n, a = n.getTargetsToShow();
		if (i.dragging || n.hasArcType(a)) return;
		let o = ar(i.event, e), s = n.findClosestFromTargets(a, o);
		if (t && i.mouseover && (!s || s.id !== i.mouseover.id) && (r.data_onout.call(n.api, i.mouseover), i.mouseover = void 0), !s) {
			n.unselectRect();
			return;
		}
		let c = (n.isBubbleType(s) || n.isScatterType(s) || !r.tooltip_grouped ? [s] : n.filterByX(a, s.x)).map((e) => n.addName(e));
		n.showTooltip(c, e), n.setExpand(s.index, s.id, !0), n.showGridFocus?.(c), n.showSubchartGridFocus?.(c);
		let l = n.dist(s, o);
		(n.isBarType(s.id) || l < n.getPointSensitivity(s)) && (n.$el.eventRect.style("cursor", "pointer"), t && (!i.mouseover || i.mouseover.x !== s.x || i.mouseover.id !== s.id) && (r.data_onover.call(n.api, s), i.mouseover = s));
	},
	unselectRect() {
		let e = this, { state: t, $el: { circle: n, tooltip: r } } = e;
		t._lastTooltipMouse = null, t.isCanvasMode ? (e.clearCanvasFocus?.(), r && e.hideTooltip()) : (e.$el.eventRect?.style("cursor", null), e.hideGridFocus?.(), e.hideSubchartGridFocus?.(), r && (e.hideTooltip(), e._handleLinkedCharts(!1)), n && !e.isPointFocusOnly() && e.unexpandCircles(), e.expandBarTypeShapes(!1));
	},
	generateEventRectsForSingleX(e) {
		let t = this, { config: n, state: r } = t, { eventReceiver: i } = r, a = e.style("cursor", n.data_selection_enabled && n.data_selection_grouped ? "pointer" : null).on("click", function(e) {
			r.event = e;
			let { currentIdx: n, data: a } = i, o = a[n === -1 ? t.getDataIndexFromEvent(e) : n];
			t.clickHandlerForSingleX.bind(this)(o, t);
		}).datum({ multipleX: !1 });
		if (r.inputType === "mouse") {
			let e = (e) => {
				let n = e ? t.getDataIndexFromEvent(e) : i.currentIdx;
				return n > -1 ? i.data[n] : null;
			};
			a.on("mouseover", (e) => {
				r.event = e, t.updateEventRect(), Object.values(t.$el.axisTooltip).forEach((e) => e?.style("display", null));
			}).on("mousemove", function(a) {
				let o = e(a);
				if (r.event = a, !o) return;
				let { index: s } = o, c = n.line_step_type;
				if (n.line_step_tooltipMatch && t.hasType("step") && /^step\-(before|after)$/.test(c)) {
					let e = t.scale.zoom || t.scale.x, n = t.axis.xs[s], r = e.invert(ar(a, this)[0]);
					c === "step-after" && r < n ? --s : c === "step-before" && r > n && (s += 1);
				}
				t.showAxisGridFocus?.();
				let l = n.tooltip_grouped && s === i.currentIdx;
				if (r.dragging || r.flowing || t.hasArcType() || l) {
					if (n.tooltip_show && l) {
						let [e, n] = ar(a, this), i = r._lastTooltipMouse;
						(!i || (e - i[0]) ** 2 + (n - i[1]) ** 2 >= 9) && (r._lastTooltipMouse = [e, n], t.setTooltipPosition());
					}
				} else s !== i.currentIdx && (t.setOverOut(!1, i.currentIdx), i.currentIdx = s), s === -1 ? t.unselectRect() : t.selectRectForSingle(this, s), t.setOverOut(s !== -1, s);
			}).on("mouseout", (e) => {
				r.event = e, t.config && !t.hasArcType() && i.currentIdx !== -1 && n.interaction_onout && (t.hideAxisGridFocus?.(), t.unselectRect(), t.setOverOut(!1, i.currentIdx), i.currentIdx = -1);
			});
		}
		return a;
	},
	clickHandlerForSingleX(e, t) {
		let n = t, { config: r, state: i, $el: { main: a } } = n;
		if (!e || n.hasArcType() || i.cancelClick) {
			i.cancelClick &&= !1;
			return;
		}
		let { index: o } = e;
		a.selectAll(`.${K.shape}-${o}`).each(function(e) {
			(r.data_selection_grouped || n.isWithinShape(this, e)) && (n.toggleShape?.(this, e, o), r.data_onclick.bind(n.api)(e, this));
		});
	},
	generateEventRectsForMultipleXs(e) {
		let t = this, { config: n, state: r } = t;
		e.on("click", function(e) {
			r.event = e, t.clickHandlerForMultipleXS.bind(this)(t);
		}).datum({ multipleX: !0 }), r.inputType === "mouse" && e.on("mouseover mousemove", function(e) {
			r.event = e, t.selectRectForMultipleXs(this);
		}).on("mouseout", (e) => {
			r.event = e, t.config && !t.hasArcType() && n.interaction_onout && t.unselectRect();
		});
	},
	clickHandlerForMultipleXS(e) {
		let t = e, { config: n, state: r } = t, i = t.getTargetsToShow();
		if (t.hasArcType(i)) return;
		let a = ar(r.event, this), o = t.findClosestFromTargets(i, a);
		if (!o) return;
		let s = t.getPointSensitivity(o);
		(t.isBarType(o.id) || t.dist(o, a) < s) && t.$el.main.selectAll(`.${K.shapes}${t.getTargetSelectorSuffix(o.id)}`).selectAll(`.${K.shape}-${o.index}`).each(function() {
			(n.data_selection_grouped || t.isWithinShape(this, o)) && (t.toggleShape?.(this, o, o.index), n.data_onclick.bind(t.api)(o, this));
		});
	}
}, og = {
	initClip() {
		let e = this, { clip: t, datetimeId: n } = e.state;
		t.id = `${n}-clip`, t.idXAxis = `${t.id}-xaxis`, t.idYAxis = `${t.id}-yaxis`, t.idGrid = `${t.id}-grid`, t.path = e.getClipPath(t.id), t.pathXAxis = e.getClipPath(t.idXAxis), t.pathYAxis = e.getClipPath(t.idYAxis), t.pathGrid = e.getClipPath(t.idGrid);
	},
	getClipPath(e) {
		let { config: t } = this;
		return !t.clipPath && /-clip$/.test(e) || !t.axis_x_clipPath && /-clip-xaxis$/.test(e) || !t.axis_y_clipPath && /-clip-yaxis$/.test(e) ? null : `url(#${e})`;
	},
	appendClip(e, t) {
		t && e.append("clipPath").attr("id", t).append("rect");
	},
	setXAxisClipPath(e) {
		let { config: t, state: { margin: n, width: r, height: i } } = this, a = t.axis_rotated, o = Math.max(30, n.left) - (a ? 0 : 20), s = (a ? n.top + i + 10 : n.bottom) + 20, c = a ? -(1 + o) : -(o - 1), l = a ? n.left + 20 : r + 10 + o;
		e.attr("x", c).attr("y", -15).attr("width", l).attr("height", s);
	},
	setYAxisClipPath(e) {
		let { config: t, state: { margin: n, width: r, height: i } } = this, a = t.axis_rotated, o = Math.max(30, n.left) - (a ? 20 : 0), s = t.axis_y_inner, c = s && !a ? t.axis_y_label.text ? -20 : -1 : a ? -(1 + o) : -(o - 1), l = -(a ? 20 : n.top), u = (a ? r + 15 + o : n.left + 20) + (s ? 20 : 0), d = (a ? n.bottom + 10 : n.top + i) + 10;
		e.attr("x", c).attr("y", l).attr("width", u).attr("height", d);
	},
	updateXAxisTickClip() {
		let e = this, { config: t, state: { clip: n, xAxisHeight: r }, $el: { defs: i } } = e, a = e.getHorizontalAxisHeight("x");
		if (i && !n.idXAxisTickTexts) {
			let t = `${n.id}-xaxisticktexts`;
			e.appendClip(i, t), n.idXAxisTickTexts = t, n.pathXAxisTickTexts = e.getClipPath(n.idXAxisTickTexts);
		}
		!t.axis_x_tick_multiline && e.getAxisTickRotate("x") && a !== r && (e.setXAxisTickClipWidth(), e.setXAxisTickTextClipPathWidth()), e.state.xAxisHeight = a;
	},
	setXAxisTickClipWidth() {
		let e = this, { config: t, state: { current: { maxTickSize: n } } } = e, r = e.getAxisTickRotate("x");
		if (!t.axis_x_tick_multiline && r) {
			let t = Math.sin(Math.PI / 180 * Math.abs(r));
			n.x.clipPath = (e.getHorizontalAxisHeight("x") - 20) / t;
		} else n.x.clipPath = null;
	},
	setXAxisTickTextClipPathWidth() {
		let { state: { clip: e, current: t }, $el: { svg: n } } = this;
		n && n.select(`#${e.idXAxisTickTexts} rect`).attr("width", t.maxTickSize.x.clipPath).attr("height", 30);
	}
}, sg = {
	getAxisSize(e) {
		let t = this, n = t.config.axis_rotated;
		return n && e === "x" || !n && /y2?/.test(e) ? t.getAxisWidthByAxisId(e, !0) : t.getHorizontalAxisHeight(e);
	},
	getAxisWidthByAxisId(e, t) {
		let n = this;
		if (n.axis) {
			let r = n.axis?.getAxisLabelPosition(e), { width: i } = n.axis.getMaxTickSize(e, t), a = i === 0 ? .5 : 0;
			return i + (n.config.padding?.mode === "fit" ? r.isInner ? 10 + a : 10 : r.isInner ? 20 + a : 40);
		}
		return 40;
	},
	getHorizontalAxisHeight(e) {
		let t = this, { config: n, state: r } = t, { rotatedPadding: i, isLegendRight: a, isLegendInset: o } = r, s = n.axis_rotated, c = n.padding?.mode === "fit", l = n[`axis_${e}_inner`], u = n[`axis_${e}_label`].text, d = n.padding?.mode === "fit" ? l && !u ? +(e === "y") : 20 : 30;
		if (e === "x" && !n.axis_x_show) return 8;
		if (e === "x" && _(n.axis_x_height)) return n.axis_x_height;
		if (e === "y" && !n.axis_y_show) return n.legend_show && !a && !o ? 10 : 1;
		if (e === "y2" && !n.axis_y2_show) return c ? 0 : i.top;
		let f = t.axis.getMaxTickSize(e), p = Math.abs(n.axis_x_tick_rotate) > 0 && (!n.axis_x_tick_autorotate || t.needToRotateXAxisTickTexts());
		return (n.axis_x_tick_multiline || p) && f.height > 13 && (d += f.height - 13), d + (t.axis.getAxisLabelPosition(e).isInner ? 0 : 10) + (e === "y2" && !s ? -10 : 0);
	},
	getEventRectWidth() {
		let { config: e, axis: t } = this, n = e.axis_x_inverted, r = t.x.tickInterval();
		return Math.max(0, n ? Math.abs(r) : r);
	},
	getAxisTickRotate(e) {
		let t = this, { axis: n, config: r, state: i, $el: a } = t, o = r[`axis_${e}_tick_rotate`];
		if (e === "x") {
			let e = n.isCategorized() || n.isTimeSeries();
			if (r.axis_x_tick_fit && e) {
				let e = r.axis_x_tick_count, n = i.current.maxTickSize.x.ticks.length, a = 0;
				if (e ? a = e > n ? n : e : n && (a = n), a !== i.axis.x.tickCount) {
					let { targets: e } = t.data;
					i.axis.x.padding = t.getXDomainPadding([t.getXDomainMinMax(e, "min"), t.getXDomainMinMax(e, "max")], a);
				}
				i.axis.x.tickCount = a;
			}
			(a.svg || i.isCanvasMode) && r.axis_x_tick_autorotate && r.axis_x_tick_fit && !r.axis_x_tick_multiline && !r.axis_x_tick_culling && e && (o = t.needToRotateXAxisTickTexts() ? r.axis_x_tick_rotate : 0);
		}
		return o;
	},
	needToRotateXAxisTickTexts() {
		let e = this, { state: { axis: t, current: n, isLegendRight: r, legendItemWidth: i } } = e, a = n.width - (r && i) - e.getCurrentPaddingByDirection("left") - e.getCurrentPaddingByDirection("right"), o = t.x.tickCount + t.x.padding.left + t.x.padding.right, { width: s } = e.axis.getMaxTickSize("x");
		return s > (o ? a / o : 0);
	}
}, cg = {
	axis_x_clipPath: !0,
	axis_x_show: !0,
	axis_x_forceAsSingle: !1,
	axis_x_type: "indexed",
	axis_x_localtime: !0,
	axis_x_categories: [],
	axis_x_tick_centered: !1,
	axis_x_tick_format: void 0,
	axis_x_tick_culling: {},
	axis_x_tick_culling_max: 10,
	axis_x_tick_culling_lines: !0,
	axis_x_tick_culling_reverse: !1,
	axis_x_tick_count: void 0,
	axis_x_tick_inner: !1,
	axis_x_tick_show: !0,
	axis_x_tick_text_show: !0,
	axis_x_tick_text_inner: !1,
	axis_x_tick_text_position: {
		x: 0,
		y: 0
	},
	axis_x_tick_fit: !0,
	axis_x_tick_values: null,
	axis_x_tick_autorotate: !1,
	axis_x_tick_rotate: 0,
	axis_x_tick_outer: !0,
	axis_x_tick_multiline: !0,
	axis_x_tick_width: null,
	axis_x_tick_tooltip: !1,
	axis_x_max: void 0,
	axis_x_min: void 0,
	axis_x_inverted: !1,
	axis_x_padding: {},
	axis_x_height: void 0,
	axis_x_extent: void 0,
	axis_x_label: {},
	axis_x_axes: []
}, lg = {
	axis_y_clipPath: !0,
	axis_y_show: !0,
	axis_y_type: "indexed",
	axis_y_max: void 0,
	axis_y_min: void 0,
	axis_y_inverted: !1,
	axis_y_center: void 0,
	axis_y_inner: !1,
	axis_y_label: {},
	axis_y_tick_format: void 0,
	axis_y_tick_culling: !1,
	axis_y_tick_culling_max: 5,
	axis_y_tick_culling_lines: !0,
	axis_y_tick_culling_reverse: !1,
	axis_y_tick_inner: !1,
	axis_y_tick_outer: !0,
	axis_y_tick_values: null,
	axis_y_tick_rotate: 0,
	axis_y_tick_count: void 0,
	axis_y_tick_show: !0,
	axis_y_tick_stepSize: null,
	axis_y_tick_text_show: !0,
	axis_y_tick_text_position: {
		x: 0,
		y: 0
	},
	axis_y_tick_time_value: void 0,
	axis_y_padding: {},
	axis_y_default: void 0,
	axis_y_axes: []
}, ug = {
	axis_y2_show: !1,
	axis_y2_type: "indexed",
	axis_y2_max: void 0,
	axis_y2_min: void 0,
	axis_y2_inverted: !1,
	axis_y2_center: void 0,
	axis_y2_inner: !1,
	axis_y2_label: {},
	axis_y2_tick_format: void 0,
	axis_y2_tick_culling: !1,
	axis_y2_tick_culling_max: 5,
	axis_y2_tick_culling_lines: !0,
	axis_y2_tick_culling_reverse: !1,
	axis_y2_tick_inner: !1,
	axis_y2_tick_outer: !0,
	axis_y2_tick_values: null,
	axis_y2_tick_rotate: 0,
	axis_y2_tick_count: void 0,
	axis_y2_tick_show: !0,
	axis_y2_tick_stepSize: null,
	axis_y2_tick_text_show: !0,
	axis_y2_tick_text_position: {
		x: 0,
		y: 0
	},
	axis_y2_padding: {},
	axis_y2_default: void 0,
	axis_y2_axes: []
}, dg = {
	axis_evalTextSize: !0,
	axis_rotated: !1,
	axis_tooltip: !1,
	...cg,
	...lg,
	...ug
}, fg = {
	data_xs: {},
	data_xFormat: "%Y-%m-%d",
	data_xLocaltime: !0,
	data_xSort: !0,
	data_axes: {},
	data_regions: {},
	data_stack_normalize: !1
}, pg = [
	Eh,
	Dh,
	Oh
], mg = {
	axis: rg,
	clip: og,
	eventrect: ag,
	sizeAxis: sg
}, hg = {
	optDataAxis: fg,
	optAxis: dg
};
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/config/resolver/axis.core.js
function gg(e) {
	return Object.keys(e).map((t) => e[t]);
}
function _g(e = [], t = []) {
	F(Um.prototype, gg(mg).concat(e)), F(th.prototype, pg), Wr.setOptions(gg(hg).concat(t));
}
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/config/resolver/shape/axis.helpers.js
function vg(e = [], t = []) {
	_g(e, t);
}
function yg(e, t = []) {
	_g([
		fh,
		xh,
		_h
	].concat(Array.isArray(e) ? e : e ? [e] : []), [Sh, Ch].concat(t));
}
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/config/resolver/shape/area.js
var bg = () => (yg(sh, [ch]), (bg = () => I.AREA)()), xg = () => (yg(sh, [ch]), (xg = () => I.AREA_LINE_RANGE)()), Sg = () => (yg(sh, [ch]), (Sg = () => I.AREA_STEP_RANGE)()), Cg = () => (yg(sh, [ch, lh]), (Cg = () => I.AREA_SPLINE)()), wg = () => (yg(sh, [ch, lh]), (wg = () => I.AREA_SPLINE_RANGE)()), Tg = () => (yg(sh, [ch]), (Tg = () => I.AREA_STEP)()), Eg = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Dg = /([aAcChHlLmMqQsStTvVzZ])|([-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?)/g;
function Og(e) {
	let t = /* @__PURE__ */ new Set(), n = -1, r = 0, i = !1, a;
	for (Dg.lastIndex = 0; a = Dg.exec(e);) if (a[1]) i = a[1] === "a" || a[1] === "A", r = 0;
	else if (n++, i) {
		let e = r % 7;
		(e === 2 || e === 3 || e === 4) && t.add(n), r++;
	}
	return t;
}
function kg(e, t) {
	let n = Og(t), r = [], i = [], a = 0, o = -1, s = -1, c, l, u = (e) => {
		r[o] ? r[o] += e : r[++o] = e;
	};
	Eg.lastIndex = 0;
	let d = Eg, f = new RegExp(Eg.source, "g");
	for (e += "", t += ""; (c = d.exec(e)) && (l = f.exec(t));) {
		if (s++, l.index > a && u(t.slice(a, l.index)), c[0] === l[0]) u(l[0]);
		else {
			let e = +c[0], t = +l[0], a = n.has(s);
			r[++o] = null, i.push({
				index: o,
				fn: a ? (n) => Math.round(e + (t - e) * n) : (n) => e + (t - e) * n
			});
		}
		a = f.lastIndex;
	}
	if (a < t.length && u(t.slice(a)), !i.length) {
		let e = r.join("");
		return () => e;
	}
	return (e) => {
		for (let t = 0, n = i.length; t < n; t++) {
			let { index: n, fn: a } = i[t];
			r[n] = String(a(e));
		}
		return r.join("");
	};
}
function Ag(e) {
	let { bar_radius: t, bar_radius_ratio: n } = e.config;
	return _(t) && t > 0 ? () => t : _(n) ? (e) => e * n : null;
}
function jg(e) {
	let { config: t, data: n } = e, r = /* @__PURE__ */ new Set();
	if (!t.data_groups.length) return r;
	let i = e.orderTargets(e.filterTargetsToShow(n.targets.filter(e.isBarType, e)));
	for (let e of t.data_groups) {
		let t = new Set(e), n = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
		for (let e of i) if (t.has(e.id)) for (let t of e.values) t.value !== null && t.value !== 0 && (t.value > 0 ? n : a).set(t.index, e.id);
		for (let [e, t] of n) r.add(`${t}:${e}`);
		for (let [e, t] of a) r.add(`${t}:${e}`);
	}
	return r;
}
function Mg(e, t, n) {
	return n ? e ? t ? {
		tl: n,
		bl: n
	} : {
		tr: n,
		br: n
	} : t ? {
		br: n,
		bl: n
	} : {
		tl: n,
		tr: n
	} : 0;
}
function Ng(e, t, n, r) {
	let i = "";
	return n ? r && e[0] < t ? i = `0 ${t - e[0]}px 0 0` : !r && e[0] > t && (i = `0 0 0 ${e[0] - t}px`) : r && e[1] > t ? i = `${e[1] - t}px 0 0 0` : !r && e[1] < t && (i = `0 0 ${t - e[1]}px 0`), i ? `inset(${i})` : null;
}
function Pg(e, t, n, r, i, a) {
	let { config: o, state: s } = e, c = o.axis_rotated, l = +c, u = +!l, d = t.value < 0, f = o[`axis_${e.axis.getId(t.id)}_inverted`], p = !f && d || f && !d, m = e.isGrouped(t.id), h = r && m && t.value !== 0 ? s.hiddenTargetIds.has(t.id) && a ? a(t) : i.has(`${t.id}:${t.index}`) : !1, g = [n[0][l], n[0][u]], _ = 0;
	if (r) {
		let e = c ? u : l, t = Math.abs(n[2][e] - n[0][e]);
		_ = Math.max(0, !m || h ? r(t) : 0);
	}
	let v = c ? n[1][l] + (p ? _ : -_) : n[1][u] + (p ? -_ : _);
	return {
		radius: _,
		corners: Mg(c, p, _),
		clipPath: _ ? Ng(g, v, c, p) : null,
		indexX: l,
		indexY: u,
		isNegative: p,
		pos: v
	};
}
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/ChartInternal/shape/bar.js
function Fg(e) {
	let t = this.config.bar_connectLine, n = t?.[e] || t;
	return /^(start|end)\-(start|end)$/.test(n) ? n : null;
}
var Ig = {
	initBar() {
		let { $el: e, config: t, state: { clip: n } } = this;
		e.bar = e.main.select(`.${z.chart}`), e.bar = t.bar_front ? e.bar.append("g") : e.bar.insert("g", ":first-child"), e.bar.attr("class", br.chartBars).call(this.setCssRule(!1, `.${br.chartBars}`, ["pointer-events:none"])), t.clipPath === !1 && (t.bar_radius || t.bar_radius_ratio) && e.bar.attr("clip-path", n.pathXAxis.replace(/#[^)]*/, `#${n.id}`));
	},
	updateTargetsForBar(e) {
		let t = this, { config: n } = t, r = t.getClass("bars", !0), i = n.interaction_enabled && n.data_selection_isselectable;
		Rm.call(t, e, {
			type: "Bar",
			elKey: "bar",
			containerClass: br.chartBars,
			itemClass: br.chartBar,
			initFn: t.initBar
		}).append("g").attr("class", r).style("cursor", (e) => i?.bind?.(t.api)(e) ? "pointer" : null).call((e) => {
			t.setCssRule(!0, ` .${br.bar}`, ["fill"], t.color)(e), e.each(function(e) {
				Fg.call(t, e.id) && L(this).append("path").attr("class", br.barConnectLine);
			});
		});
	},
	updateBar(e, t = !1) {
		let n = this;
		if (n.state.isCanvasMode) return;
		let { config: r, $el: i, $T: a } = n, o = t ? i.subchart : i, s = n.getClass("bar", !0), c = n.initialOpacity.bind(n);
		r.bar_linearGradient && n.updateLinearGradient();
		let l = o.main.selectAll(`.${br.bars}`).selectAll(`.${br.bar}`).data(n.labelishData.bind(n));
		a(l.exit(), e).style("opacity", "0").remove(), o.bar = l.enter().append("path").attr("class", s).style("fill", n.generateUpdateBarColor()).merge(l).style("opacity", c), n.setRatioForGroupedData(o.bar.data());
	},
	generateUpdateBarColor() {
		let e = this, t = e.getStylePropValue(e.color) || (() => null);
		return (n) => Im.call(e, n, "bar_linearGradient", t);
	},
	updateBarColor(e) {
		return this.generateUpdateBarColor()(e);
	},
	redrawBar(e, t, n = !1) {
		let r = this;
		if (r.state.isCanvasMode) return [];
		let { bar: i } = n ? r.$el.subchart : r.$el, a = [], o = /* @__PURE__ */ new Map(), s = Ag(r), c = r.generateUpdateBarColor(), l = function(i, s, c) {
			let l = _(i.value) || r.isBarRangeType(i) || r.isSubchartCandlestickBarValue?.(i, n) ? e(i, s) : [""], u = o.get(i.id);
			if (u === void 0 && (u = Fg.call(r, i.id), o.set(i.id, u)), l.length > 1 && a.push(l[1]), s === c.length - 1 && a.length) {
				let e = r.$T(L(this.parentNode.querySelector(`.${br.barConnectLine}`)), t, Pe());
				r.updateConnectLine(e, u, a), a.splice(0);
			}
			return l[0];
		}, u = r.$T(i, t, Pe());
		return s && typeof u.attrTween == "function" ? u.attrTween("d", function(e, t, n) {
			let r = l.call(this, e, t, n);
			return kg(this.getAttribute("d") ?? "", r);
		}) : u.attr("d", l), [u.style("fill", (e) => r.getSubchartCandlestickBarColor?.(e, n) || c(e)).style("clip-path", (e) => e.clipPath).style("opacity", null)];
	},
	generateDrawBar(e, t) {
		let n = this, { config: r } = n, i = n.generateGetBarPoints(e, t), a = Ag(n), o = a ? jg(n) : /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Map();
		return (e, t) => {
			let c = i(e, t), { indexX: l, indexY: u, isNegative: d, pos: f, radius: p, clipPath: m } = Pg(n, e, c, a, o, n.isStackingRadiusData.bind(n)), h = ["", ""];
			if (e.clipPath = m, a) {
				let e = `a${p} ${p} ${d ? "1 0 0" : "0 0 1"} `;
				h[u] = `${e}${p},${p}`, h[l] = `${e}${[-p, p][r.axis_rotated ? "sort" : "reverse"]()}`, d && h.reverse();
			}
			let g = r.axis_rotated ? `H${f} ${h[0]}V${c[2][u] - p} ${h[1]}H${c[3][l]}` : `V${f} ${h[0]}H${c[2][l] - p} ${h[1]}V${c[3][u]}`, _ = [`M${c[0][l]},${c[0][u]}${g}z`], v = s.get(e.id);
			return v === void 0 && (v = Fg.call(n, e.id), s.set(e.id, v)), v && _.push(r.axis_rotated ? {
				x: c[0][l],
				y: c[0][u],
				width: c[0][l] - f,
				height: c[2][u] - c[0][u]
			} : {
				x: c[0][l],
				y: f,
				width: c[2][l] - c[0][l],
				height: c[3][u] - f
			}), _;
		};
	},
	isStackingRadiusData(e) {
		let t = this, { $el: n, config: r, data: i, state: a } = t, { id: o, index: s, value: c } = e;
		if (a.hiddenTargetIds.has(o)) {
			let e = n.bar.filter((e) => e.id === o && e.value === c);
			return !e.empty() && /a\d+/i.test(e.attr("d"));
		}
		let l = r.data_groups.find((e) => e.indexOf(o) > -1), u = t.orderTargets(t.filterTargetsToShow(i.targets.filter(t.isBarType, t))).filter((e) => l.indexOf(e.id) > -1).map((e) => {
			let t = e.values[s];
			if (t && (_(c) && c > 0 ? t.value > 0 : t.value < 0)) return t;
		}).filter(Boolean).map((e) => e.id);
		return c !== 0 && u.indexOf(o) === u.length - 1;
	},
	updateConnectLine(e, t, n) {
		let r = n.map((e, n, r) => {
			let i = this.config.axis_rotated, a = /^start-(start|end)$/.test(t), o = /^end-(start|end)$/.test(t), s = [], c = i ? o ? e.x - e.width : e.x : e.x + e.width, l = i || a ? e.y + e.height : e.y;
			return n === 0 ? s.push(`${c},${l}`) : (s.push(i ? `L${e.x - (/\w+-end$/.test(t) ? e.width : 0)},${e.y}` : `L${e.x},${e.y + (/\w+-start$/.test(t) ? e.height : 0)}`), n < r.length - 1 && s.push(`M${c},${l}`)), s.join(" ");
		});
		e.attr("d", `M${r.join("")}z`);
	}
}, Lg = {
	bar_connectLine: !1,
	bar_front: !1,
	bar_indices_removeNull: !1,
	bar_label_threshold: 0,
	bar_linearGradient: !1,
	bar_overlap: !1,
	bar_padding: 0,
	bar_radius: void 0,
	bar_radius_ratio: void 0,
	bar_sensitivity: 2,
	bar_width: void 0,
	bar_width_ratio: .6,
	bar_width_max: void 0,
	bar_zerobased: !0
}, Rg = () => (vg([Ig, fh], [Lg, Sh]), (Rg = () => I.BAR)()), zg = {
	initBubble() {
		let e = this, { config: t } = e;
		e.hasType("bubble") && (t.point_show = !0, t.point_type = "circle");
	},
	getBaseLength() {
		let e = this, { width: t, height: n } = e.state, r = Y.bubbleBaseLength, i = e.cache.get(r);
		return i || e.cache.add(r, i = je("min", [t, n])), i;
	},
	getBubbleR(e) {
		let t = this, n = t.config.bubble_maxR;
		h(n) ? n = n.bind(t.api)(e) : _(n) || (n = t.getBaseLength() / (t.getMaxDataCount() * 2) + 12);
		let r = Y.bubbleMaxValue, i = t.cache.get(r);
		i === null && t.cache.add(r, i = je("max", t.getMinMaxData().max.map((e) => t.isBubbleZType(e) ? t.getBubbleZData(e.value, "y") : k(e.value) ? e.value.mid : e.value)));
		let a = n * n * Math.PI, o = (t.isBubbleZType(e) ? t.getBubbleZData(e.value, "z") : e.value) * (a / i);
		return Math.sqrt(o / Math.PI);
	},
	getBubbleZData(e, t) {
		return k(e) ? e[t] : e[t === "y" ? 0 : 1];
	}
}, Bg = {
	bubble_maxR: 35,
	bubble_zerobased: !1
}, Vg = () => (vg([
	fh,
	xh,
	zg
], [Bg, Sh]), (Vg = () => I.BUBBLE)()), Hg = {
	generateGetCandlestickPoints(e, t = !1) {
		let n = this, r = t ? n.axis.subX : n.axis.x, i = n.getIndicesMax(e) + 1, a = n.getBarW("candlestick", r, i), o = n.getShapeX(a, e, !!t), s = n.getShapeY(!!t), c = n.getShapeOffset(n.isCandlestickType, e, !!t), l = n.getYScaleById.bind(n);
		return (e, r) => {
			let i = l.call(n, e.id, t)(n.getShapeYMin(e.id, t)), u = c(e, r) || i, d = _(a) ? a : a[e.id] || a._$width, f = n.getCandlestickData(e), p;
			if (f && _(f.open) && _(f.close)) {
				let t = {
					start: o(e),
					end: 0
				};
				t.end = t.start + d;
				let n = {
					start: s(f.open),
					end: s(f.close)
				}, r = {
					x: t.start + d / 2,
					high: s(f.high),
					low: s(f.low)
				}, a = i - u;
				n.start -= a, n.end -= a, r.high -= a, r.low -= a, p = [
					[t.start, n.start],
					[t.end, n.end],
					[
						r.x,
						r.low,
						r.high
					]
				];
			} else p = [
				[0, 0],
				[0, 0],
				[
					0,
					0,
					0
				]
			];
			return p;
		};
	},
	getCandlestickData({ value: e }) {
		let t;
		if (O(e)) {
			let [n, r, i, a, o = !1] = e;
			t = {
				open: n,
				high: r,
				low: i,
				close: a
			}, o !== !1 && (t.volume = o);
		} else k(e) && (t = { ...e });
		return t && (t._isUp = t.close >= t.open), t || null;
	},
	initCandlestick() {
		Lm.call(this, {
			elKey: "candlestick",
			className: xr.chartCandlesticks
		});
	},
	updateTargetsForCandlestick(e) {
		Rm.call(this, e, {
			type: "Candlestick",
			elKey: "candlestick",
			containerClass: xr.chartCandlesticks,
			itemClass: xr.chartCandlestick,
			initFn: this.initCandlestick,
			withFocus: !1,
			withStyles: !1
		}).style("pointer-events", "none");
	},
	updateCandlestick(e, t = !1) {
		let n = this, { $el: r, $T: i } = n, a = t ? r.subchart : r, o = n.getClass("candlestick", !0), s = n.initialOpacity.bind(n), c = a.main.selectAll(`.${xr.chartCandlestick}`).selectAll(`.${xr.candlestick}`).data(n.labelishData.bind(n));
		i(c.exit(), e).style("opacity", "0").remove();
		let l = c.enter().filter((e) => e.value).append("g").attr("class", o);
		l.append("line"), l.append("path"), a.candlestick = c.merge(l).style("opacity", s);
	},
	generateDrawCandlestick(e, t) {
		let n = this, { config: r } = n, i = n.generateGetCandlestickPoints(e, t), a = r.axis_rotated, o = r.candlestick_color_down;
		return (e, t, r) => {
			let s = i(e, t), c = n.getCandlestickData(e)?._isUp, l = +a, u = +!l;
			r.classed && r.classed(xr[c ? "valueUp" : "valueDown"], !0);
			let d = a ? `H${s[1][1]} V${s[1][0]} H${s[0][1]}` : `V${s[1][1]} H${s[1][0]} V${s[0][1]}`;
			r.select("path").attr("d", `M${s[0][l]},${s[0][u]}${d}z`).style("fill", (e) => (c ? n.color(e) : k(o) ? o[e.id] : o) || n.color(e));
			let f = r.select("line"), p = a ? {
				x1: s[2][1],
				x2: s[2][2],
				y1: s[2][0],
				y2: s[2][0]
			} : {
				x1: s[2][0],
				x2: s[2][0],
				y1: s[2][1],
				y2: s[2][2]
			};
			for (let e in p) f.attr(e, p[e]);
		};
	},
	redrawCandlestick(e, t, n = !1) {
		let { $el: r, $T: i } = this, { candlestick: a } = n ? r.subchart : r, o = Pe(!0);
		return [a.each(function(n, r) {
			e(n, r, i(L(this), t, o));
		}).style("opacity", null)];
	}
}, Ug = {
	candlestick_width: void 0,
	candlestick_width_ratio: .6,
	candlestick_width_max: void 0,
	candlestick_color_down: "red"
}, Wg = () => (vg([Hg, fh], [Ug, Sh]), (Wg = () => I.CANDLESTICK)()), Gg = {
	arc_cornerRadius: 0,
	arc_cornerRadius_ratio: 0,
	arc_needle_show: !1,
	arc_needle_color: void 0,
	arc_needle_value: void 0,
	arc_needle_path: void 0,
	arc_needle_length: 100,
	arc_needle_top_rx: 0,
	arc_needle_top_ry: 0,
	arc_needle_top_width: 0,
	arc_needle_bottom_rx: 1,
	arc_needle_bottom_ry: 1,
	arc_needle_bottom_width: 15,
	arc_needle_bottom_len: 0,
	arc_rangeText_values: void 0,
	arc_rangeText_unit: "absolute",
	arc_rangeText_fixed: !1,
	arc_rangeText_format: void 0,
	arc_rangeText_position: void 0
}, Kg = {
	donut_label_show: !0,
	donut_label_format: void 0,
	donut_label_threshold: .05,
	donut_label_line: !1,
	donut_label_image: void 0,
	donut_label_ratio: void 0,
	donut_width: void 0,
	donut_title: "",
	donut_expand: {},
	donut_expand_rate: .98,
	donut_expand_duration: 50,
	donut_padAngle: 0,
	donut_startingAngle: 0
}, qg = 15, Jg = 20, Yg = .35;
function Xg(e = !1) {
	let t = this;
	return [
		"donut",
		"pie",
		"polar",
		"gauge"
	].find((n) => t.hasType(n) && !(n === "gauge" && e && t.hasMultiArcGauge()));
}
function Zg() {
	let e = this, { config: t } = e, n = Xg.call(e, !0), r = n && t[`${n}_label_line`], i = w(r), a = (e, t, n) => n, o = {
		show: r === !0 || i && r?.show !== !1,
		distance: i && r?.distance || Jg
	};
	if (r === !0) return {
		chartType: n,
		line: o,
		text: { formatter: a }
	};
	if (!i) return {
		chartType: n,
		line: {
			show: !1,
			distance: Jg
		},
		text: { formatter: null }
	};
	let s = a;
	return h(r.text) ? s = r.text : r.text === !1 && (s = null), {
		chartType: n,
		line: o,
		text: { formatter: s }
	};
}
function Qg(e, t) {
	let n = this, { state: r } = n, i = n.updateAngle(e);
	if (!i) return null;
	let { outerRadius: a } = n.getRadius(e), o = a;
	n.hasType("polar") && (o = n.getPolarOuterRadius(e, a), a = r.radius);
	let s = (i.startAngle + i.endAngle) / 2;
	Math.abs(i.endAngle - i.startAngle - 2 * Math.PI) < .01 && (s = Math.PI / 2);
	let c = Math.sin(s), l = -Math.cos(s), u = {
		x: c * o,
		y: l * o
	}, d = a + qg, f = {
		x: c * d,
		y: l * d
	}, p = c >= 0;
	return {
		startPoint: u,
		breakPoint: f,
		endPoint: {
			x: f.x + t * (p ? 1 : -1),
			y: f.y
		},
		isRight: p,
		midAngle: s
	};
}
function $g() {
	return Zg.call(this).line.show;
}
function e_(e) {
	let t = this, { $el: { arcs: n }, $T: r } = t, { line: i, text: a } = Zg.call(t), o = i.distance, s = null;
	n.selectAll(`.${B.chartArc}`).each(function(n) {
		let l = L(this), u = Qg.call(t, n, o), { ratio: d, meetsThreshold: f, updated: p } = n._cache ?? {};
		if (!p || !u) return;
		let m = t.isTargetToShow(n.data.id) && f, { startPoint: h, breakPoint: g, endPoint: _, isRight: v } = u, y = `${h.x},${h.y} ${g.x},${g.y} ${_.x},${_.y}`;
		if (i.show) {
			let i = l.select(`.${B.arcLabelLine}`);
			i.empty() && (i = l.append("polyline").attr("class", B.arcLabelLine)), r(i, e).attr("points", y).style("stroke", t.color(n.data)).style("opacity", m ? null : "0");
		}
		let b = l.select(`.${B.arcLabelLineText}`);
		if (b.empty() && (b = l.append("text").attr("class", B.arcLabelLineText).style("pointer-events", "none")), m) {
			let { value: i } = p, { id: o } = n.data, l = (a.formatter ?? t.getArcLabelConfig("format") ?? t.defaultArcValueFormat)(i, d, o).toString();
			nr(b, l, [-1, 1], !1);
			let u = {
				x: _.x + 5 * (v ? 1 : -1),
				y: _.y
			};
			b.style("text-anchor", v ? "start" : "end");
			let f = b.node(), m = f?.querySelectorAll("tspan");
			if (s === null && (s = parseFloat(c.getComputedStyle(f).fontSize) || 12), m && m.length > 1) {
				let e = (m.length - 3) / 2;
				u.y += (-e + Yg) * s;
			} else u.y += Yg * s;
			r(b, e).attr("transform", `translate(${u.x},${u.y})`).style("opacity", null).style("fill", t.updateTextColor.bind(t)(n));
		} else r(b, e).style("opacity", "0");
	});
}
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/ChartInternal/shape/arc.js
var t_ = [
	"donut",
	"gauge",
	"pie",
	"polar"
];
function n_(e) {
	return [
		"donut",
		"pie",
		"polar",
		"gauge"
	].find((t) => e.hasType(t));
}
function r_(e, t, n, r) {
	let { config: i, state: { radiusExpanded: a } } = e, o = n.endAngle - Math.PI / 2, s = Math.sin(o), c = {
		x: Math.cos(o) * (a + (r ? 5 : 25)),
		y: s * (a + 15 - Math.abs(s * 10)) + 3
	};
	if (r) {
		let e = i.arc_rangeText_position;
		if (e) {
			let n = i.arc_rangeText_values, r = h(e) ? e(n[t.index]) : e;
			c.x += r?.x ?? 0, c.y += r?.y ?? 0;
		}
	}
	return c;
}
function i_(e, t, n, r) {
	let { config: i } = e, a = n_(e), o = a ? i[`${a}_label_ratio`] : void 0;
	if (o) o = h(o) ? o.bind(e.api)(t, n, r) : o;
	else {
		let e = 36 / n;
		o = n && r ? (e > .375 ? 1.175 - e : .8) * n / r : 0;
	}
	return o;
}
function a_(e, t, n) {
	let { outerRadius: r } = e.getRadius(t);
	e.hasType("polar") && (r = e.getPolarOuterRadius(t, r));
	let [i, a] = e.svgArc.centroid(n).map((e) => isNaN(e) ? 0 : e), o = Math.sqrt(i * i + a * a), s = i_(e, t, r, o);
	return {
		pos: {
			x: i,
			y: a
		},
		ratio: s
	};
}
function o_(e = 0) {
	let t = this, { config: n, state: r } = t, i = t.hasMultiArcGauge(), a = r.gaugeArcWidth / t.getTargetsToShow().length, o = e ? Math.min(r.radiusExpanded * e - r.radius, a * .8 - (1 - e) * 100) : 0;
	return {
		inner(e) {
			let { innerRadius: n } = t.getRadius(e);
			return i ? r.radius - a * (e.index + 1) : _(n) ? n : 0;
		},
		outer(n) {
			let { outerRadius: s } = t.getRadius(n), c;
			if (i) c = r.radius - a * n.index + o;
			else if (t.hasType("polar") && !e) c = t.getPolarOuterRadius(n, s);
			else if (c = s, e) {
				let { radiusExpanded: t } = r;
				r.radius !== s && (t -= Math.abs(r.radius - s)), c = t * e;
			}
			return c;
		},
		corner(e, r) {
			let { arc_cornerRadius_ratio: i = 0, arc_cornerRadius: a = 0 } = n, { data: { id: o }, value: s } = e, c;
			return c = i ? i * r : _(a) ? a : a.call(t.api, o, s, r), c;
		}
	};
}
function s_(e) {
	return function(t) {
		let n = ({ startAngle: e = 0, endAngle: t = 0, padAngle: n = 0 }) => ({
			startAngle: e,
			endAngle: t,
			padAngle: n
		}), r = bo(n(this._current), n(t));
		return this._current = t, function(n) {
			let i = r(n), { data: a, index: o, value: s } = t;
			return e({
				...i,
				data: a,
				index: o,
				value: s
			});
		};
	};
}
var c_ = {
	initPie() {
		let e = this, { config: t } = e, n = t.data_type, r = t[`${n}_padding`], i = t[`${n}_startingAngle`] || 0, a = (r ? r * .01 : t[`${n}_padAngle`]) || 0;
		e.pie = zp().startAngle(i).endAngle(i + 2 * Math.PI).padAngle(a).value((e) => e.values?.reduce((e, t) => e + t.value, 0) ?? e).sort(e.getSortCompareFn.bind(e)(!0));
	},
	updateRadius() {
		let e = this, { config: t, state: n } = e, r = t[`${t.data_type}_padding`], i = t.gauge_width || t.donut_width, a = e.getTargetsToShow().length * t.gauge_arcs_minWidth, o = .85, s = $g.call(e) ? o : 1;
		n.radiusExpanded = Math.min(n.arcWidth, n.arcHeight) / 2 * (e.hasMultiArcGauge() && t.gauge_label_show ? o : s), n.radius = n.radiusExpanded * .95, n.innerRadiusRatio = i ? (n.radius - i) / n.radius : .6, n.gaugeArcWidth = i || (a <= n.radius - n.innerRadius ? n.radius - n.innerRadius : a <= n.radius ? a : n.radius);
		let c = t.pie_innerRadius || (r ? r * (n.innerRadiusRatio + .1) : 0);
		n.outerRadius = t.pie_outerRadius, n.innerRadius = e.hasType("donut") || e.hasType("gauge") ? n.radius * n.innerRadiusRatio : c;
	},
	getRadius(e) {
		let t = this, n = e?.data, { innerRadius: r, outerRadius: i } = t.state;
		return !_(r) && n && (r = r[n.id] || 0), k(i) && n && n.id in i ? i = i[n.id] : _(i) || (i = t.state.radius), {
			innerRadius: r,
			outerRadius: i
		};
	},
	updateArc() {
		let e = this;
		e.updateRadius(), e.svgArc = e.getSvgArc(), e.svgArcExpanded = e.getSvgArcExpanded();
	},
	getArcLength() {
		let { config: e } = this, t = e.gauge_arcLength * 3.6, n = t / 360 * 2;
		return t < -360 ? n = -2 : t > 360 && (n = 2), n * Math.PI;
	},
	getStartingAngle() {
		let e = this, { config: t } = e, n = t.data_type, r = e.hasType("gauge") ? t.gauge_fullCircle : !1, i = -1 * Math.PI / 2, a = Math.PI / 2, o = t[`${n}_startingAngle`] || 0;
		return !r && o <= i ? o = i : !r && o >= a ? o = a : (o > Math.PI || o < -1 * Math.PI) && (o = Math.PI), o;
	},
	updateAngle(e, t = !1) {
		let n = this, { config: r, state: i } = n, a = t && n.hasType("gauge"), { pie: o } = n, s = e, c = !1;
		if (!r) return null;
		let l = n.getStartingAngle(), u = r.gauge_fullCircle || t && !a ? n.getArcLength() : l * -2, d = s.data && n.isGaugeType(s.data) && !n.hasMultiArcGauge();
		if (d) {
			let { gauge_min: e, gauge_max: t } = r, a = u * ((n.getTotalDataSum(i.rendered) - e) / (t - e));
			o = o.startAngle(l).endAngle(a + l);
		}
		if (t === !1) {
			let e;
			if (d) e = o(n.filterTargetsToShow());
			else {
				let t = "$arcPieLayout", r = n.cache.get(t);
				r && r.generation === i.redrawGeneration || (r = {
					generation: i.redrawGeneration,
					layout: o(n.filterTargetsToShow())
				}, n.cache.add(t, r)), e = r.layout;
			}
			e.forEach((e, t) => {
				!c && e.data.id === s.data?.id && (c = !0, s = e, s.index = t);
			});
		}
		if (isNaN(s.startAngle) && (s.startAngle = 0), isNaN(s.endAngle) && (s.endAngle = s.startAngle), t || s.data && (r.gauge_enforceMinMax || n.hasMultiArcGauge())) {
			let { gauge_min: e, gauge_max: o } = r, c = t && !a ? n.getTotalDataSum(i.rendered) : o, d = u / (c - e), f = s.value ?? 0, p = f < e ? 0 : f < c ? f - e : c - e;
			s.startAngle = l, s.endAngle = l + d * p;
		}
		return c || t ? s : null;
	},
	getSvgArc() {
		let e = this, { inner: t, outer: n, corner: r } = o_.call(e), i = kp().innerRadius(t).outerRadius(n), a = function(t, a) {
			let o = "M 0 0";
			if (t.value || t.data) {
				let s = a ? t : e.updateAngle(t) ?? null;
				s && (o = i.cornerRadius(r(s, n(s)))(s));
			}
			return o;
		};
		return a.centroid = i.centroid, a;
	},
	getSvgArcExpanded(e = 1) {
		let t = this, { inner: n, outer: r, corner: i } = o_.call(t, e), a = kp().innerRadius(n).outerRadius(r);
		return (e) => {
			let n = t.updateAngle(e), o = r(n), s = 0;
			return n && (s = i(n, o)), n && a.cornerRadius(s)(n) || "M 0 0";
		};
	},
	getArc(e, t, n) {
		return n || this.isArcType(e.data) ? this.svgArc(e, t) : "M 0 0";
	},
	redrawArcRangeText() {
		let e = this, { config: t, $el: { arcs: n }, state: r, $T: i } = e, a = t.arc_rangeText_format, o = e.hasType("gauge") && t.arc_rangeText_fixed, s = t.arc_rangeText_values;
		if (s?.length) {
			let c = t.arc_rangeText_unit === "%", l = e.getTotalDataSum(r.rendered);
			c && (s = s.map((e) => l / 100 * e));
			let u = e.pie(s).map((e, t) => (e.index = t, e)), d = n.selectAll(`.${B.arcRange}`).data(s);
			d.exit().remove(), d = i(d.enter().append("text").attr("class", B.arcRange).style("text-anchor", "middle").style("pointer-events", "none").style("opacity", "0").text((e) => {
				let t = c ? e / l * 100 : e;
				return h(a) ? a(t) : `${t}${c ? "%" : ""}`;
			}).merge(d)), (!r.rendered || r.rendered && !o) && l > 0 && d.attr("transform", function(t, n) {
				return e.transformForArcLabel(this, u[n], !0);
			}), d.style("opacity", (e) => !o && (e > l || l === 0) ? "0" : null);
		}
	},
	transformForArcLabel(e, t, n = !1) {
		let r = this, i = r.updateAngle(t, n);
		if (!i) return "";
		let a, o = 1;
		if (n || r.hasMultiArcGauge()) a = r_(r, t, i, n);
		else if (!r.hasType("gauge") || r.data.targets.length > 1) {
			let e = a_(r, t, i);
			a = e.pos, o = e.ratio;
		} else return "";
		return Wf.call(r, e, a), `translate(${a.x * o},${a.y * o})`;
	},
	convertToArcData(e) {
		return this.addName({
			id: "data" in e ? e.data.id : e.id,
			value: e.value,
			ratio: this.getRatio("arc", e),
			index: e.index
		});
	},
	textForArcLabel(e) {
		let t = this, n = t.hasType("gauge"), r = t_.filter(t.hasType.bind(t))?.[0];
		t.shouldShowArcLabel() && e.style("fill", t.updateTextColor.bind(t)).attr("filter", (e) => t.updateTextBGColor.bind(t)(e, t.config.data_labels_backgroundColors)).each(function(e) {
			let i = L(this), a = t.updateAngle(e), o = t.getRatio("arc", a), s = Vf.call(t, o, r);
			if (e._cache = {
				updated: a,
				ratio: o,
				meetsThreshold: s
			}, s) {
				let { value: r } = a || e;
				nr(i, (t.getArcLabelConfig("format") || t.defaultArcValueFormat)(r, o, e.data.id).toString(), [-1, 1], n);
			} else i.text("");
		});
	},
	expandArc(e) {
		let t = this, { state: { transiting: n }, $el: r } = t;
		if (n) {
			let n = setInterval(() => {
				t.state.transiting || (clearInterval(n), r.legend.selectAll(`.${U.legendItemFocused}`).size() > 0 && t.expandArc(e));
			}, 10);
			return;
		}
		let i = t.mapToTargetIds(e);
		r.svg.selectAll(t.selectorTargets(i, `.${B.chartArc}`)).each(function(e) {
			if (!t.shouldExpand(e.data.id)) return;
			let n = t.getExpandConfig(e.data.id, "duration"), r = t.getSvgArcExpanded(t.getExpandConfig(e.data.id, "rate"));
			L(this).selectAll("path").transition().duration(n).attrTween("d", s_(t.svgArcExpanded.bind(t))).transition().duration(n * 2).attrTween("d", s_(r.bind(t)));
		});
	},
	unexpandArc(e) {
		let t = this, { state: { transiting: n }, $el: { svg: r } } = t;
		if (n) return;
		let i = t.mapToTargetIds(e);
		r.selectAll(t.selectorTargets(i, `.${B.chartArc}`)).selectAll("path").transition().duration((e) => t.getExpandConfig(e.data.id, "duration")).attrTween("d", s_(t.svgArc.bind(t))), r.selectAll(`${B.arc}`).style("opacity", null);
	},
	getExpandConfig(e, t) {
		let n = this, { config: r } = n, i = {
			duration: 50,
			rate: .98
		}, a;
		return n.isDonutType(e) ? a = "donut" : n.isGaugeType(e) ? a = "gauge" : n.isPieType(e) && (a = "pie"), a ? r[`${a}_expand_${t}`] : i[t];
	},
	shouldExpand(e) {
		let t = this, { config: n } = t, r = t.isDonutType(e) ? "donut" : t.isGaugeType(e) ? "gauge" : t.isPieType(e) ? "pie" : null;
		return r ? !!n[`${r}_expand`] : !1;
	},
	shouldShowArcLabel() {
		let e = this, { config: t } = e;
		return t_.some((n) => e.hasType(n) && t[`${n}_label_show`]);
	},
	getArcLabelConfig(e = "format") {
		let t = this, { config: n } = t, r = (e) => e;
		return t_.filter(t.hasType.bind(t)).forEach((t) => {
			r = n[`${t}_label_${e}`];
		}), e === "format" && h(r) ? r.bind(t.api) : r;
	},
	updateTargetsForArc(e) {
		let t = this, { $el: n } = t, r = t.hasType("gauge"), i = t.getChartClass("Arc"), a = t.getClass("arcs", !0), o = t.classFocus.bind(t), s = n.main.select(`.${B.chartArcs}`), c = s.selectAll(`.${B.chartArc}`).data(t.pie(e)).attr("class", (e) => i(e) + o(e.data)), l = c.enter().append("g").attr("class", i).call(this.setCssRule(!1, `.${B.chartArcs} text`, ["pointer-events:none", "text-anchor:middle"]));
		l.append("g").attr("class", a).merge(c), l.append("text").attr("dy", r && !t.hasMultiTargets() ? "-.1em" : null).style("opacity", "0").style("text-anchor", t.getStylePropValue("middle")).style("pointer-events", t.getStylePropValue("none")), n.text = s.selectAll(`.${z.target} text`);
	},
	initArc() {
		let e = this, { $el: t } = e;
		t.arcs = t.main.select(`.${z.chart}`).append("g").attr("class", B.chartArcs).attr("transform", e.getTranslate("arc")), e.setArcTitle();
	},
	setArcTitle(e) {
		let t = this, n = e || t.getArcTitle(), r = t.hasType("gauge");
		if (n) {
			let e = r ? Er.chartArcsGaugeTitle : B.chartArcsTitle, i = t.$el.arcs.select(`.${e}`);
			i.empty() && (i = t.$el.arcs.append("text").attr("class", e).style("text-anchor", "middle")), r && i.attr("dy", "-0.3em"), nr(i, n, r ? void 0 : [-.6, 1.35], !0);
		}
	},
	getArcTitle() {
		let e = this, t = e.hasType("donut") && "donut" || e.hasType("gauge") && "gauge";
		return t ? e.config[`${t}_title`] : "";
	},
	getArcTitleWithNeedleValue() {
		let e = this, { config: t, state: n } = e, r = e.getArcTitle();
		if (r && e.config.arc_needle_show && /{=[A-Z_]+}/.test(r)) {
			let e = n.current.needle;
			return _(e) || (e = t.arc_needle_value), Ie(r, { NEEDLE_VALUE: ~~e });
		}
		return !1;
	},
	redrawArc(e, t, n) {
		let r = this, { config: i, state: a, $el: { main: o } } = r, s = i.interaction_enabled, c = s && i.data_selection_isselectable, l = o.selectAll(`.${B.arcs}`).selectAll(`.${B.arc}`).data(r.arcData.bind(r));
		l.exit().transition().duration(t).style("opacity", "0").remove(), l = l.enter().append("path").attr("class", r.getClass("arc", !0)).style("fill", (e) => r.color(e.data)).style("cursor", (e) => c?.bind?.(r.api)(e) ? "pointer" : null).style("opacity", "0").each(function(e) {
			r.isGaugeType(e.data) && (e.startAngle = i.gauge_startingAngle, e.endAngle = i.gauge_startingAngle), this._current = e;
		}).merge(l), r.hasType("gauge") && (r.updateGaugeMax(), r.hasMultiArcGauge() && r.redrawArcGaugeLine()), l.attr("transform", (e) => !r.isGaugeType(e.data) && n ? "scale(0)" : "").style("opacity", function(e) {
			return e === this._current ? "0" : null;
		}).each(() => {
			a.transiting = !0;
		}).transition().duration(e).attrTween("d", function(e) {
			let t = r.updateAngle(e);
			if (!t) return () => "M 0 0";
			isNaN(this._current.startAngle) && (this._current.startAngle = 0), isNaN(this._current.endAngle) && (this._current.endAngle = this._current.startAngle);
			let n = bo(this._current, t);
			return this._current = n(0), function(t) {
				let i = n(t);
				return i.data = e.data, r.getArc(i, !0);
			};
		}).attr("transform", n ? "scale(1)" : "").style("fill", (e) => {
			let t;
			return r.levelColor ? (t = r.levelColor(e.data.values[0].value), i.data_colors[e.data.id] = t) : t = r.color(e.data), t;
		}).style("opacity", null).call(Se, function() {
			if (r.levelColor) {
				let e = L(this), t = e.datum(this._current);
				r.updateLegendItemColor(t.data.id, e.style("fill"));
			}
			a.transiting = !1, a.redrawing && (a.redrawing = !1, a._targetsToShow = null, a._cachedDrawShape = null), P(i.onrendered, r.api);
		}), s && r.bindArcEvent(l), r.hasType("polar") && r.redrawPolar(), r.hasType("gauge") && r.redrawBackgroundArcs(), i.arc_needle_show && r.redrawNeedle(), r.redrawArcText(e), r.redrawArcRangeText();
	},
	redrawNeedle() {
		let e = this, { $el: t, config: n, state: { hiddenTargetIds: r, radius: i } } = e, a = (i - 1) / 100 * n.arc_needle_length, o = r.size !== e.data.targets.length, s = e.$el.arcs.select(`.${B.needle}`), c = n.arc_needle_path, l = n.arc_needle_bottom_width / 2, u = n.arc_needle_top_width / 2, d = n.arc_needle_top_rx, f = n.arc_needle_top_ry, p = n.arc_needle_bottom_len, m = n.arc_needle_bottom_rx, g = n.arc_needle_bottom_ry, _ = e.getNeedleAngle(), v = () => {
			let t = e.getArcTitleWithNeedleValue();
			t && e.setArcTitle(t);
		};
		if (v(), s.empty() && (s = t.arcs.append("path").classed(B.needle, !0), t.needle = s, t.needle.updateHelper = (r, i = !1) => {
			t.needle.style("display") !== "none" && e.$T(t.needle).style("transform", `rotate(${e.getNeedleAngle(r)}deg)`).call(Se, () => {
				i && (n.arc_needle_value = r), v();
			});
		}), o) {
			let t = h(c) ? c.call(e, a) : `M-${l} ${p} A${m} ${g} 0 0 0 ${l} ${p} L${u} -${a} A${d} ${f} 0 0 0 -${u} -${a} L-${l} ${p} Z`;
			e.$T(s).attr("d", t).style("fill", n.arc_needle_color).style("display", null).style("transform", `rotate(${_}deg)`);
		} else s.style("display", "none");
	},
	getNeedleAngle(e) {
		let t = this, { config: n, state: r } = t, i = t.getArcLength(), a = t.hasType("gauge"), o = t.getTotalDataSum(!0), s = y(e) ? e : n.arc_needle_value, c = n[`${n.data_type}_startingAngle`] || 0, l;
		if (_(s) || (s = a && t.data.targets.length === 1 ? o : 0), r.current.needle = s, a) {
			c = t.getStartingAngle();
			let e = n.gauge_fullCircle ? i : c * -2, { gauge_min: r, gauge_max: a } = n;
			l = e * ((s - r) / (a - r));
		} else l = o ? s / o * i : 0;
		return (c + l) * (180 / Math.PI);
	},
	redrawBackgroundArcs() {
		let e = this, { config: t, state: n } = e, r = e.hasMultiArcGauge(), i = t.gauge_fullCircle, a = e.getTargetsToShow().length === 0 && !!t.data_empty_label_text, o = e.getStartingAngle(), s = i ? o + e.getArcLength() : o * -1, c = e.$el.arcs.select(`${r ? "g" : ""}.${B.chartArcsBackground}`);
		if (r) {
			let r = 0;
			c = c.selectAll(`path.${B.chartArcsBackground}`).data(e.data.targets), c.enter().append("path").attr("class", (e, t) => `${B.chartArcsBackground} ${B.chartArcsBackground}-${t}`).merge(c).style("fill", t.gauge_background || null).attr("d", ({ id: i }) => {
				if (a || n.hiddenTargetIds.has(i)) return "M 0 0";
				let c = {
					data: [{ value: t.gauge_max }],
					startAngle: o,
					endAngle: s,
					index: r++
				};
				return e.getArc(c, !0, !0);
			}), c.exit().remove();
		} else c.attr("d", a ? "M 0 0" : () => e.getArc({
			data: [{ value: t.gauge_max }],
			startAngle: o,
			endAngle: s
		}, !0, !0));
	},
	bindArcEvent(e) {
		let t = this, { config: n, state: r } = t, i = r.inputType === "touch", a = r.inputType === "mouse", o = (e) => {
			let n = t.updateAngle(e);
			return n ? t.convertToArcData(n) : null;
		};
		function s(e, n, r) {
			t.expandArc(r), t.api.focus(r), t.toggleFocusLegend(r, !0), t.showTooltip([n], e);
		}
		function c(e) {
			t.unexpandArc(e?.id || void 0), t.api.revert(), t.revertLegend(), t.hideTooltip();
		}
		if (e.on("click", function(e, r, i) {
			let a = o(r);
			a && (t.toggleShape?.(this, a, i), n.data_onclick.bind(t.api)(a, this));
		}), a && e.on("mouseover", function(e, n) {
			if (r.transiting) return;
			r.event = e;
			let i = o(n), a = i?.id || void 0;
			s(this, i, a), t.setOverOut(!0, i);
		}).on("mouseout", (e, i) => {
			if (r.transiting || !n.interaction_onout) return;
			r.event = e;
			let a = o(i);
			c(), t.setOverOut(!1, a);
		}).on("mousemove", function(e, n) {
			let i = o(n);
			r.event = e, t.showTooltip([i], this);
		}), i && t.hasArcType() && !t.radars) {
			let e = (e) => {
				let { clientX: t, clientY: n } = e.changedTouches?.[0] ?? {
					clientX: 0,
					clientY: 0
				};
				return L(l.elementFromPoint(t, n));
			};
			t.$el.svg.on("touchstart touchmove", function(n) {
				if (r.transiting) return;
				r.event = n;
				let i = e(n).datum(), a = i?.data && i.data.id ? t.updateAngle(i) : null, o = a ? t.convertToArcData(a) : null, l = o?.id || void 0;
				t.callOverOutForTouch(o), v(l) ? c() : s(this, o, l);
			}, { passive: !0 });
		}
	},
	redrawArcText(e) {
		let t = this, { config: n, state: r, $el: { main: i, arcs: a } } = t, o = t.hasType("gauge"), s = t.hasMultiArcGauge(), c;
		if (o && t.data.targets.length === 1 && n.gauge_title || (c = i.selectAll(`.${B.chartArc}`).select("text").style("opacity", "0").attr("class", (e) => t.isGaugeType(e.data) ? Er.gaugeValue : null).call(t.textForArcLabel.bind(t)).style("font-size", (e) => t.isGaugeType(e.data) && t.data.targets.length === 1 && !s ? `${Math.round(r.radius / 5)}px` : null), Hf.call(t), c.attr("transform", function(e) {
			return t.transformForArcLabel.bind(t)(this, e);
		}).transition().duration(e).style("opacity", (e) => t.isTargetToShow(e.data.id) && t.isArcType(e.data) ? null : "0"), s && c.attr("dy", "-.1em")), i.select(`.${B.chartArcsTitle}`).style("opacity", t.hasType("donut") || o ? null : "0"), o) {
			let e = n.gauge_fullCircle;
			e && c?.attr("dy", `${s ? 0 : Math.round(r.radius / 14)}`), n.gauge_label_show && (a.select(`.${Er.chartArcsGaugeUnit}`).attr("dy", `${e ? 1.5 : .75}em`).text(n.gauge_units), a.select(`.${Er.chartArcsGaugeMin}`).attr("dx", `${-1 * (r.innerRadius + (r.radius - r.innerRadius) / (e ? 1 : 2))}px`).attr("dy", "1.2em").text(t.textForGaugeMinMax(n.gauge_min, !1)), !e && a.select(`.${Er.chartArcsGaugeMax}`).attr("dx", `${r.innerRadius + (r.radius - r.innerRadius) / 2}px`).attr("dy", "1.2em").text(t.textForGaugeMinMax(n.gauge_max, !0)));
		}
		$g.call(t) && e_.call(t, e);
	},
	getArcElementByIdOrIndex(e) {
		let { $el: { arcs: t } } = this, n = _(e) ? (t) => t.index === e : (t) => t.data.id === e;
		return t?.selectAll(`.${z.target} path`).filter(n);
	}
};
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/config/resolver/shape/arc.helpers.js
function l_(e, t) {
	F(Um.prototype, [c_, fh].concat(e || [])), Wr.setOptions([Sh].concat(t || []));
}
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/config/resolver/shape/donut.js
var u_ = () => (l_(void 0, [Gg, Kg]), (u_ = () => I.DONUT)());
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/ChartInternal/shape/funnel.js
function d_(e = !1) {
	let t = this, { config: n, state: { current: { width: r, height: i } } } = t, a = t.getCurrentPadding(), o = {
		width: r - a.left - a.right,
		height: i - (n.legend_show ? t.getLegendHeight() + 10 : 0) - a.top - a.bottom,
		...a
	};
	if (e) {
		let e = f_.call(t, o), r = n.funnel_rotated;
		o.width = Math.max(o.width, r ? e.height : e.width), o.height = Math.max(o.height, r ? e.width : e.height);
	}
	return o;
}
function f_(e) {
	let { config: t } = this, n = t.funnel_rotated, [r, i] = [t.funnel_neck_width, t.funnel_neck_height].map((t, r) => k(t) ? e[n === !r ? "height" : "width"] * t.ratio : t);
	return {
		width: r,
		height: i
	};
}
function p_(e) {
	let t = this, n = t.config.funnel_rotated, { width: r, height: i } = d_.call(t, !0), a = [];
	return e.forEach((e, t) => {
		let { ratio: o = 0 } = e, s = t > 0 ? a[t - 1][2][+!n] : 0, c = o + s;
		a.push(e.coords = n ? [
			[s, 0],
			[c, 0],
			[c, i],
			[s, i],
			[s, 0]
		] : [
			[0, s],
			[r, s],
			[r, c],
			[0, c],
			[0, s]
		]);
	}), a;
}
function m_() {
	let e = this, t = e.config.funnel_rotated, { width: n, height: r } = d_.call(e, !0), i = f_.call(e, {
		width: n,
		height: r
	}), a;
	if (t) {
		let e = (r - i.width) / 2, t = n - i.height;
		a = [
			[t, e],
			[n, e],
			[n, r - e],
			[t, r - e],
			[0, r]
		];
	} else {
		let e = (n - i.width) / 2, t = r - i.height;
		a = [
			[n, 0],
			[n - e, t],
			[n - e, r],
			[e, r],
			[e, t]
		];
	}
	return `M${[
		[0, 0],
		...a,
		[0, 0]
	].join("L")}z`;
}
function h_(e) {
	let t = this, { config: n } = t, r = e.map((e) => ({
		id: e.id,
		value: e.values.reduce((e, t) => e + t.value, 0)
	}));
	return n.data_order && r.sort(t.getSortCompareFn.bind(t)(!0)), g_.call(t, r);
}
function g_(e) {
	let t = this, { width: n, height: r } = d_.call(t), i = t.getTotalDataSum(!0), a = t.config.funnel_rotated ? n : r;
	return e.forEach((e) => {
		e.ratio = e.value / i * a;
	}), e;
}
function __(e) {
	return e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2;
}
function v_(e, t, n, r, i) {
	let a = [];
	for (let o = 0; o <= 20; o++) {
		let s = o / 20, c = e + (t - e) * s, l = n + (r - n) * __(s);
		a.push(i ? [c, l] : [l, c]);
	}
	return a;
}
function y_() {
	let e = this, t = e.config.funnel_rotated, { width: n, height: r } = d_.call(e, !0), i = f_.call(e, {
		width: n,
		height: r
	}), a = Fp().x((e) => e[0]).y((e) => e[1]).curve(Mp), o = (t ? r - i.width : n - i.width) / 2, s = t ? n - i.height : r - i.height, c = v_(0, s, t ? 0 : n, t ? o : n - o, t), l = [];
	if (i.height > 0 && (c.push(t ? [n, o] : [n - o, r]), l.push(t ? [n, r - o] : [o, r])), l.push(...v_(s, 0, t ? r - o : o, t ? r : 0, t)), c.length > 1) {
		let [e, n] = t ? [1, 0] : [0, 1];
		c.splice(1, 0, [c[e][0], c[n][1]]);
		let r = l.length - 1;
		r > 0 && l.splice(r, 0, [l[r - e][0], l[r - n][1]]);
	}
	let u = a(c) || "", d = a(l)?.replace(/^M/, "L") || "";
	return t ? `${u}${d}z` : `M0,0${u.replace(/^M/, "L")}${d}z`;
}
var b_ = {
	initFunnel() {
		let e = this, { $el: t } = e;
		t.funnel = t.main.select(`.${z.chart}`).append("g").classed(Tr.chartFunnels, !0), t.funnel.background = t.funnel.append("path").classed(Tr.funnelBackground, !0), e.bindFunnelEvent();
	},
	bindFunnelEvent() {
		let e = this, { $el: { funnel: t }, config: n, state: r } = e;
		if (!n.interaction_enabled) return;
		let i = (e) => {
			let t = e.isTrusted ? e.target : r.eventReceiver.rect?.node();
			if (t && /^path$/i.test(t.tagName)) return r.event = e, L(t).datum();
		}, a = r.inputType === "touch";
		t.on(a ? "touchstart" : "mouseover mousemove", (t) => {
			let n = i(t);
			n && (e.showTooltip([n], t.target), /^(touchstart|mouseover)$/.test(t.type) && e.setOverOut(!0, n));
		}, a ? { passive: !0 } : void 0).on(a ? "touchend" : "mouseout", (t) => {
			let r = i(t);
			n.interaction_onout && (e.hideTooltip(), e.setOverOut(!1, r));
		});
	},
	updateTargetsForFunnel(e) {
		let t = this, { $el: { funnel: n } } = t;
		n || t.initFunnel();
		let r = t.getChartClass("Funnel"), i = t.getClass("funnel", !0), a = h_.call(t, e.filter(t.isFunnelType.bind(t))), o = t.filterNullish(a), s = n.selectAll(`.${Tr.chartFunnel}`).data(o);
		s.exit().remove();
		let c = s.enter().insert("g", `.${Tr.funnelBackground}`);
		c.append("path"), n.path = c.merge(s).attr("class", r).select("path").attr("class", i).style("opacity", "0").style("fill", t.color);
	},
	updateFunnel(e) {
		let { $el: { funnel: t } } = this, n = e.map(({ id: e }) => e);
		t.path = t.path.filter((e) => n.includes(e.id));
	},
	generateGetFunnelPoints() {
		let e = this, { config: t, $el: { funnel: n } } = e, r = t.funnel_rotated, i = e.filterTargetsToShow(n.path), { top: a, left: o, width: s, height: c } = d_.call(e), l = {}, u = 0;
		return i.each((e) => {
			let t = u, { ratio: n } = e;
			u += n;
			let i = r ? o : a, d = i + t, f = i + u, p = (d + f) / 2, m = r ? a + c / 2 : o + s / 2;
			l[e.id] = r ? [
				[d, m],
				[f, m],
				[p, m]
			] : [
				[m, d],
				[m, f],
				[m, p]
			];
		}), (e) => l[e.id];
	},
	redrawFunnel() {
		let e = this, { config: t, $T: n, $el: { funnel: r } } = e, i = e.filterTargetsToShow(r.path), a = p_.call(e, g_.call(e, i.data())), { top: o, left: s } = d_.call(e), c = (t.funnel_spline ? y_ : m_).call(e);
		r.attr("transform", `translate(${s}, ${o})`).attr("clip-path", `path('${c}')`), r.background.attr("d", c), n(i).attr("d", (e, t) => `M${a[t].join("L")}z`).style("opacity", "1"), r.selectAll("g").style("opacity", null);
	}
}, x_ = {
	funnel_neck_width: 0,
	funnel_neck_height: 0,
	funnel_rotated: !1,
	funnel_spline: !1
}, S_ = () => (l_([b_], [x_]), (S_ = () => I.FUNNEL)()), C_ = {
	initGauge() {
		let e = this, { config: t, $el: { arcs: n } } = e, r = (e = null, t = "") => {
			n.append("text").attr("class", e).style("text-anchor", "middle").style("pointer-events", "none").text(t);
		};
		if (e.hasType("gauge")) {
			let i = e.hasMultiArcGauge();
			n.append(i ? "g" : "path").attr("class", B.chartArcsBackground).style("fill", !i && t.gauge_background || null), t.gauge_units && r(Er.chartArcsGaugeUnit), t.gauge_label_show && (r(Er.chartArcsGaugeMin), !t.gauge_fullCircle && r(Er.chartArcsGaugeMax));
		}
	},
	updateGaugeMax() {
		let e = this, { config: t, state: n } = e, r = e.hasMultiArcGauge() ? e.getMinMaxData().max[0].value : e.getTotalDataSum(n.rendered);
		!t.gauge_enforceMinMax && r + t.gauge_min * (t.gauge_min > 0 ? -1 : 1) > t.gauge_max && (t.gauge_max = r - t.gauge_min);
	},
	redrawArcGaugeLine() {
		let e = this, { config: t, state: n, $el: r } = e, { hiddenTargetIds: i } = e.state, a = r.main.selectAll(`.${B.arcs}`).selectAll(`.${B.arcLabelLine}`).data(e.arcData.bind(e));
		a.enter().append("rect").attr("class", (e) => `${B.arcLabelLine} ${z.target} ${z.target}-${e.data.id}`).merge(a).style("fill", (t) => e.levelColor ? e.levelColor(t.data.values[0].value) : e.color(t.data)).style("display", t.gauge_label_show ? null : "none").each(function(t) {
			let r = 0, a = 0, o = 0, s = "";
			if (!i.has(t.data.id)) {
				let i = e.updateAngle(t), c = n.gaugeArcWidth / e.getTargetsToShow().length * (i.index + 1), l = i.endAngle - Math.PI / 2, u = n.radius - c, d = l - (u === 0 ? 0 : 1 / u);
				r = n.radiusExpanded - n.radius + c, a = Math.cos(d) * u, o = Math.sin(d) * u, s = `rotate(${l * 180 / Math.PI}, ${a}, ${o})`;
			}
			L(this).attr("x", a).attr("y", o).attr("width", r).attr("height", 2).attr("transform", s).style("stroke-dasharray", `0, ${r + 2}, 0`);
		});
	},
	textForGaugeMinMax(e, t) {
		let n = this, { config: r } = n, i = r.gauge_label_extents;
		return h(i) ? i.bind(n.api)(e, t) : e;
	},
	getGaugeLabelHeight() {
		let { config: e } = this;
		return this.config.gauge_label_show && !e.gauge_fullCircle ? 20 : 0;
	},
	getPaddingBottomForGauge() {
		return this.getGaugeLabelHeight() * 2;
	}
}, w_ = {
	gauge_background: "",
	gauge_fullCircle: !1,
	gauge_label_show: !0,
	gauge_label_extents: void 0,
	gauge_label_format: void 0,
	gauge_label_ratio: void 0,
	gauge_label_threshold: 0,
	gauge_label_line: !1,
	gauge_label_image: void 0,
	gauge_enforceMinMax: !1,
	gauge_min: 0,
	gauge_max: 100,
	gauge_type: "single",
	gauge_startingAngle: -1 * Math.PI / 2,
	gauge_arcLength: 100,
	gauge_title: "",
	gauge_units: void 0,
	gauge_width: void 0,
	gauge_arcs_minWidth: 5,
	gauge_expand: {},
	gauge_expand_rate: .98,
	gauge_expand_duration: 50
}, T_ = () => (l_([C_], [Gg, w_]), (T_ = () => I.GAUGE)()), E_ = () => (yg(), (E_ = () => I.LINE)()), D_ = () => (yg(void 0, [lh]), (D_ = () => I.SPLINE)()), O_ = () => (yg(), (O_ = () => I.STEP)()), k_ = {
	pie_label_show: !0,
	pie_label_format: void 0,
	pie_label_ratio: void 0,
	pie_label_threshold: .05,
	pie_label_line: !1,
	pie_label_image: void 0,
	pie_expand: {},
	pie_expand_rate: .98,
	pie_expand_duration: 50,
	pie_innerRadius: 0,
	pie_outerRadius: void 0,
	pie_padAngle: 0,
	pie_padding: 0,
	pie_startingAngle: 0
}, A_ = () => (l_(void 0, [Gg, k_]), (A_ = () => I.PIE)());
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/ChartInternal/shape/polar.js
function j_(e) {
	let t = e.config.polar_level_max, n = e.getMinMaxData().max[0].value;
	return t && t > n && (n = t), n;
}
var M_ = {
	initPolar() {
		let e = this, { $el: { arcs: t }, config: n } = e, r = n.polar_level_text_show, i = n.polar_level_text_backgroundColor;
		t.levels = t.append("g").attr("class", kr.levels), r && i && e.generateTextBGColorFilter(i);
	},
	getPolarOuterRadius(e, t) {
		let n = j_(this);
		return (e?.data.values[0].value ?? 0) / n * t;
	},
	updateTargetsForPolar(e) {
		this.updateTargetsForArc(e);
	},
	redrawPolar() {
		let e = this, { config: t } = e;
		t.polar_level_show && e.updatePolarLevel();
	},
	updatePolarLevel() {
		let e = this, { config: t, state: n, $el: { arcs: { levels: r } } } = e, i = t.polar_level_depth, a = j_(e), o = Me(0, i), s = n.radius, c = o.map((e) => s * ((e + 1) / i)), l = (t.polar_level_text_format || function() {}).bind(e.api), u = r.selectAll(`.${kr.level}`).data(o);
		u.exit().remove();
		let d = u.enter().append("g").attr("class", (e, t) => `${kr.level} ${kr.level}-${t}`);
		if (d.append("circle"), d.merge(u).selectAll("circle").style("visibility", t.polar_level_show ? null : "hidden").attr("cx", 0).attr("cy", 0).attr("r", (e) => c[e]), t.polar_level_text_show) {
			let r = t.polar_level_text_backgroundColor, i = `#${n.datetimeId}-labels-bg${e.getTargetSelectorSuffix(r)}`;
			d.append("text").style("text-anchor", "middle"), d.merge(u).selectAll("text").attr("dy", (e) => -c[e] + 5).attr("filter", r ? `url(${i})` : null).text((e) => l(a / o.length * (e + 1)));
		}
	}
}, N_ = {
	polar_label_show: !0,
	polar_label_format: void 0,
	polar_label_threshold: .05,
	polar_label_line: !1,
	polar_label_image: void 0,
	polar_label_ratio: void 0,
	polar_level_depth: 3,
	polar_level_max: void 0,
	polar_level_show: !0,
	polar_level_text_backgroundColor: "#fff",
	polar_level_text_format: (e) => e % 1 == 0 ? e : e.toFixed(2),
	polar_level_text_show: !0,
	polar_padAngle: 0,
	polar_padding: 0,
	polar_startingAngle: 0
}, P_ = () => (l_([M_], [Gg, N_]), (P_ = () => I.POLAR)());
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/ChartInternal/shape/radar.js
function F_(e, t, n, r, i, a) {
	let o = e && r > 0 ? n - r : r;
	return i * (1 - a * (t === "x" ? Math.sin : Math.cos)(2 * Math.PI * o / n));
}
var I_ = Y.radarPoints, L_ = Y.radarTextWidth, R_ = {
	initRadar() {
		let e = this, { config: t, state: { current: n }, $el: r } = e;
		e.hasType("radar") && (r.radar = r.main.select(`.${z.chart}`).append("g").attr("class", Ar.chartRadars), r.radar.levels = r.radar.append("g").attr("class", kr.levels), r.radar.axes = r.radar.append("g").attr("class", V.axis), r.radar.shapes = r.radar.append("g").attr("class", K.shapes), n.dataMax = t.radar_axis_max || e.getMinMaxData().max[0].value, t.radar_axis_text_show && (t.interaction_enabled && e.bindRadarEvent(), e.updateRadarLevel(), e.updateRadarAxes()));
	},
	getRadarSize() {
		let { config: e, state: { arcWidth: t, arcHeight: n } } = this, r = (Math.min(t, n) - (e.axis_x_categories.length < 4 ? -20 : 10)) / 2;
		return [r, r];
	},
	updateTargetsForRadar(e) {
		let t = this, { config: n } = t;
		E(n.axis_x_categories) && (n.axis_x_categories = Me(0, je("max", e.map((e) => e.values.length)))), t.generateRadarPoints();
	},
	getRadarPosition(e, t, n, r) {
		let i = this, { config: a } = i, [o, s] = i.getRadarSize(), c = a.axis_x_categories.length, l = a.radar_direction_clockwise, u = Te(e).map((i) => F_(l, i, c, t, y(n) ? n : e === "x" ? o : s, _(r) ? r : a.radar_size_ratio));
		return u.length === 1 ? u[0] : u;
	},
	generateRadarPoints() {
		let e = this, t = e.data.targets, [n, r] = e.getRadarSize(), i = e.cache.get(I_) || {}, a = i._size;
		(!a || a.width !== n && a.height !== r) && (t.forEach((t) => {
			i[t.id] = t.values.map((t, n) => e.getRadarPosition(["x", "y"], n, void 0, e.getRatio("radar", t)));
		}), i._size = {
			width: n,
			height: r
		}, e.cache.add(I_, i));
	},
	redrawRadar() {
		let e = this, { radar: t, main: n } = e.$el, r = e.getTranslate("radar");
		r && (t.attr("transform", r), n.select(`.${q.chartTexts}`).attr("transform", r), e.generateRadarPoints(), e.updateRadarLevel(), e.updateRadarAxes(), e.updateRadarShape());
	},
	generateGetRadarPoints() {
		let e = this.cache.get(I_);
		return (t, n) => {
			let r = e[t.id][n];
			return [
				r,
				r,
				r,
				r
			];
		};
	},
	updateRadarLevel() {
		let e = this, { config: t, state: n, $el: { radar: r } } = e, [i, a] = e.getRadarSize(), o = t.radar_level_depth, s = t.axis_x_categories.length, c = t.radar_level_text_show, l = r.levels, u = Me(0, o), d = t.radar_size_ratio * Math.min(i, a), f = u.map((e) => d * ((e + 1) / o)), p = (t.radar_level_text_format || function() {}).bind(e.api), m = u.map((t) => {
			let n = f[t];
			return Me(0, s).map((t) => e.getRadarPosition(["x", "y"], t, n, 1).join(",")).join(" ");
		}), h = l.selectAll(`.${kr.level}`).data(u);
		h.exit().remove();
		let g = h.enter().append("g").attr("class", (e, t) => `${kr.level} ${kr.level}-${t}`);
		g.append("polygon").style("visibility", t.radar_level_show ? null : "hidden"), c && (l.select("text").empty() && l.append("text").attr("dx", "-.5em").attr("dy", "-.7em").style("text-anchor", "end").text(() => p(0)), g.append("text").attr("dx", "-.5em").style("text-anchor", "end").text((e) => p(n.current.dataMax / u.length * (e + 1)))), g.merge(h).attr("transform", (e) => `translate(${i - f[e]}, ${a - f[e]})`).selectAll("polygon").attr("points", (e) => m[e]), c && l.selectAll("text").attr("x", (e) => v(e) ? i : m[e].split(",")[0]).attr("y", (e) => v(e) ? a : 0);
	},
	updateRadarAxes() {
		let e = this, { config: t, $el: { radar: n } } = e, [r, i] = e.getRadarSize(), a = t.axis_x_categories, o = n.axes.selectAll("g").data(a);
		o.exit().remove();
		let s = o.enter().append("g").attr("class", (e, t) => `${V.axis}-${t}`);
		if (t.radar_axis_line_show && s.append("line"), t.radar_axis_text_show && s.append("text"), o = s.merge(o), t.radar_axis_line_show && o.select("line").attr("x1", r).attr("y1", i).attr("x2", (t, n) => e.getRadarPosition("x", n)).attr("y2", (t, n) => e.getRadarPosition("y", n)), t.radar_axis_text_show) {
			let { x: a = 0, y: s = 0 } = t.radar_axis_text_position, c = e.cache.get(L_) || 0;
			if (o.select("text").style("text-anchor", "middle").attr("dy", ".5em").call((e) => {
				e.each(function(e) {
					nr(L(this), String(e), [-.6, 1.2]);
				});
			}).datum((e, t) => ({ index: t })).attr("transform", function(t) {
				v(this.width) && (this.width = R(this, !0).width / 2);
				let n = e.getRadarPosition("x", t.index, void 0, 1), o = Math.round(e.getRadarPosition("y", t.index, void 0, 1));
				return n > r ? n += this.width + a : Math.round(n) < r && (n -= this.width + a), o > i ? (o / 2 === i && this.firstChild.tagName === "tspan" && this.firstChild.setAttribute("dy", "0em"), o += s) : o < i && (o -= s), `translate(${n} ${o})`;
			}), !c) {
				let t = [n.axes, n.levels].map((e) => ir(e.node()).width);
				t.every((e) => e > 0) && e.cache.add(L_, t[0] - t[1]);
			}
		}
	},
	bindRadarEvent() {
		let e = this, { config: t, state: n, $el: { radar: r, svg: i } } = e, a = e.isPointFocusOnly(), { inputType: o, transiting: s } = n, c = o === "mouse", l = (r) => {
			if (n.event = r, !t.interaction_onout) return;
			let i = e.getDataIndexFromEvent(r), o = v(i);
			(c || o) && (e.hideTooltip(), a ? e.hideCircleFocus() : e.unexpandCircles(), c ? e.setOverOut(!1, i) : o && e.callOverOutForTouch());
		};
		r.axes.on(c ? "mouseover " : "touchstart", (t) => {
			if (s) return;
			n.event = t;
			let r = e.getDataIndexFromEvent(t);
			e.selectRectForSingle(i.node(), r), c ? e.setOverOut(!0, r) : e.callOverOutForTouch(r);
		}, c ? void 0 : { passive: !0 }).on("mouseout", c ? l : null), c || i.on("touchstart", l, { passive: !0 });
	},
	updateRadarShape() {
		let e = this, t = e.data.targets.filter((t) => e.isRadarType(t)), n = e.cache.get(I_), r = e.$el.radar.shapes.selectAll("polygon").data(e.filterNullish(t)), i = r.enter().append("g").attr("class", e.getChartClass("Radar"));
		e.$T(r.exit()).remove(), i.append("polygon").merge(r).style("fill", e.color).style("stroke", e.color).attr("points", (e) => n[e.id].join(" ")), e.updateTargetForCircle(t, i);
	},
	radarCircleX(e) {
		return this.cache.get(I_)[e.id][e.index][0];
	},
	radarCircleY(e) {
		return this.cache.get(I_)[e.id][e.index][1];
	}
}, z_ = {
	radar_axis_max: void 0,
	radar_axis_line_show: !0,
	radar_axis_text_show: !0,
	radar_axis_text_position: {},
	radar_level_depth: 3,
	radar_level_show: !0,
	radar_level_text_format: (e) => e % 1 == 0 ? e : e.toFixed(2),
	radar_level_text_show: !0,
	radar_size_ratio: .87,
	radar_direction_clockwise: !1
}, B_ = () => (l_([
	mg.eventrect,
	xh,
	R_
], [
	Sh,
	z_,
	{ axis_x_categories: hg.optAxis.axis_x_categories }
]), (B_ = () => I.RADAR)()), V_ = { scatter_zerobased: !1 }, H_ = () => (vg([fh, xh], [Sh, V_]), (H_ = () => I.SCATTER)());
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/ChartInternal/shape/core/geometry.js
function U_(e, t, n, r = !1) {
	if (t === n) return {
		x: 0,
		y: 0,
		w: e.state.width,
		h: 0
	};
	let { scale: { x: i, y: a } } = e, o = i(t.x0), s = a(t.y0), c = i(t.x1) - o, l = a(t.y1) - s;
	return {
		x: o,
		y: s,
		w: r ? Math.max(0, c) : c,
		h: r ? Math.max(0, l) : l
	};
}
// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/hierarchy/count.js
function W_(e) {
	var t = 0, n = e.children, r = n && n.length;
	if (!r) t = 1;
	else for (; --r >= 0;) t += n[r].value;
	e.value = t;
}
function G_() {
	return this.eachAfter(W_);
}
// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/hierarchy/each.js
function K_(e, t) {
	let n = -1;
	for (let r of this) e.call(t, r, ++n, this);
	return this;
}
// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/hierarchy/eachBefore.js
function q_(e, t) {
	for (var n = this, r = [n], i, a, o = -1; n = r.pop();) if (e.call(t, n, ++o, this), i = n.children) for (a = i.length - 1; a >= 0; --a) r.push(i[a]);
	return this;
}
// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/hierarchy/eachAfter.js
function J_(e, t) {
	for (var n = this, r = [n], i = [], a, o, s, c = -1; n = r.pop();) if (i.push(n), a = n.children) for (o = 0, s = a.length; o < s; ++o) r.push(a[o]);
	for (; n = i.pop();) e.call(t, n, ++c, this);
	return this;
}
// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/hierarchy/find.js
function Y_(e, t) {
	let n = -1;
	for (let r of this) if (e.call(t, r, ++n, this)) return r;
}
// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/hierarchy/sum.js
function X_(e) {
	return this.eachAfter(function(t) {
		for (var n = +e(t.data) || 0, r = t.children, i = r && r.length; --i >= 0;) n += r[i].value;
		t.value = n;
	});
}
// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/hierarchy/sort.js
function Z_(e) {
	return this.eachBefore(function(t) {
		t.children && t.children.sort(e);
	});
}
// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/hierarchy/path.js
function Q_(e) {
	for (var t = this, n = $_(t, e), r = [t]; t !== n;) t = t.parent, r.push(t);
	for (var i = r.length; e !== n;) r.splice(i, 0, e), e = e.parent;
	return r;
}
function $_(e, t) {
	if (e === t) return e;
	var n = e.ancestors(), r = t.ancestors(), i = null;
	for (e = n.pop(), t = r.pop(); e === t;) i = e, e = n.pop(), t = r.pop();
	return i;
}
// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/hierarchy/ancestors.js
function ev() {
	for (var e = this, t = [e]; e = e.parent;) t.push(e);
	return t;
}
// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/hierarchy/descendants.js
function tv() {
	return Array.from(this);
}
// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/hierarchy/leaves.js
function nv() {
	var e = [];
	return this.eachBefore(function(t) {
		t.children || e.push(t);
	}), e;
}
// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/hierarchy/links.js
function rv() {
	var e = this, t = [];
	return e.each(function(n) {
		n !== e && t.push({
			source: n.parent,
			target: n
		});
	}), t;
}
// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/hierarchy/iterator.js
function* iv() {
	var e = this, t, n = [e], r, i, a;
	do
		for (t = n.reverse(), n = []; e = t.pop();) if (yield e, r = e.children) for (i = 0, a = r.length; i < a; ++i) n.push(r[i]);
	while (n.length);
}
// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/hierarchy/index.js
function av(e, t) {
	e instanceof Map ? (e = [void 0, e], t === void 0 && (t = cv)) : t === void 0 && (t = sv);
	for (var n = new dv(e), r, i = [n], a, o, s, c; r = i.pop();) if ((o = t(r.data)) && (c = (o = Array.from(o)).length)) for (r.children = o, s = c - 1; s >= 0; --s) i.push(a = o[s] = new dv(o[s])), a.parent = r, a.depth = r.depth + 1;
	return n.eachBefore(uv);
}
function ov() {
	return av(this).eachBefore(lv);
}
function sv(e) {
	return e.children;
}
function cv(e) {
	return Array.isArray(e) ? e[1] : null;
}
function lv(e) {
	e.data.value !== void 0 && (e.value = e.data.value), e.data = e.data.data;
}
function uv(e) {
	var t = 0;
	do
		e.height = t;
	while ((e = e.parent) && e.height < ++t);
}
function dv(e) {
	this.data = e, this.depth = this.height = 0, this.parent = null;
}
dv.prototype = av.prototype = {
	constructor: dv,
	count: G_,
	each: K_,
	eachAfter: J_,
	eachBefore: q_,
	find: Y_,
	sum: X_,
	sort: Z_,
	path: Q_,
	ancestors: ev,
	descendants: tv,
	leaves: nv,
	links: rv,
	copy: ov,
	[Symbol.iterator]: iv
};
// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/accessors.js
function fv(e) {
	if (typeof e != "function") throw Error();
	return e;
}
// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/constant.js
function pv() {
	return 0;
}
function mv(e) {
	return function() {
		return e;
	};
}
// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/treemap/round.js
function hv(e) {
	e.x0 = Math.round(e.x0), e.y0 = Math.round(e.y0), e.x1 = Math.round(e.x1), e.y1 = Math.round(e.y1);
}
// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/treemap/dice.js
function gv(e, t, n, r, i) {
	for (var a = e.children, o, s = -1, c = a.length, l = e.value && (r - t) / e.value; ++s < c;) o = a[s], o.y0 = n, o.y1 = i, o.x0 = t, o.x1 = t += o.value * l;
}
// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/treemap/slice.js
function _v(e, t, n, r, i) {
	for (var a = e.children, o, s = -1, c = a.length, l = e.value && (i - n) / e.value; ++s < c;) o = a[s], o.x0 = t, o.x1 = r, o.y0 = n, o.y1 = n += o.value * l;
}
// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/treemap/squarify.js
var vv = (1 + Math.sqrt(5)) / 2;
function yv(e, t, n, r, i, a) {
	for (var o = [], s = t.children, c, l, u = 0, d = 0, f = s.length, p, m, h = t.value, g, _, v, y, b, x, S; u < f;) {
		p = i - n, m = a - r;
		do
			g = s[d++].value;
		while (!g && d < f);
		for (_ = v = g, x = Math.max(m / p, p / m) / (h * e), S = g * g * x, b = Math.max(v / S, S / _); d < f; ++d) {
			if (g += l = s[d].value, l < _ && (_ = l), l > v && (v = l), S = g * g * x, y = Math.max(v / S, S / _), y > b) {
				g -= l;
				break;
			}
			b = y;
		}
		o.push(c = {
			value: g,
			dice: p < m,
			children: s.slice(u, d)
		}), c.dice ? gv(c, n, r, i, h ? r += m * g / h : a) : _v(c, n, r, h ? n += p * g / h : i, a), h -= g, u = d;
	}
	return o;
}
var bv = (function e(t) {
	function n(e, n, r, i, a) {
		yv(t, e, n, r, i, a);
	}
	return n.ratio = function(t) {
		return e((t = +t) > 1 ? t : 1);
	}, n;
})(vv);
// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/treemap/index.js
function xv() {
	var e = bv, t = !1, n = 1, r = 1, i = [0], a = pv, o = pv, s = pv, c = pv, l = pv;
	function u(e) {
		return e.x0 = e.y0 = 0, e.x1 = n, e.y1 = r, e.eachBefore(d), i = [0], t && e.eachBefore(hv), e;
	}
	function d(t) {
		var n = i[t.depth], r = t.x0 + n, u = t.y0 + n, d = t.x1 - n, f = t.y1 - n;
		d < r && (r = d = (r + d) / 2), f < u && (u = f = (u + f) / 2), t.x0 = r, t.y0 = u, t.x1 = d, t.y1 = f, t.children && (n = i[t.depth + 1] = a(t) / 2, r += l(t) - n, u += o(t) - n, d -= s(t) - n, f -= c(t) - n, d < r && (r = d = (r + d) / 2), f < u && (u = f = (u + f) / 2), e(t, r, u, d, f));
	}
	return u.round = function(e) {
		return arguments.length ? (t = !!e, u) : t;
	}, u.size = function(e) {
		return arguments.length ? (n = +e[0], r = +e[1], u) : [n, r];
	}, u.tile = function(t) {
		return arguments.length ? (e = fv(t), u) : e;
	}, u.padding = function(e) {
		return arguments.length ? u.paddingInner(e).paddingOuter(e) : u.paddingInner();
	}, u.paddingInner = function(e) {
		return arguments.length ? (a = typeof e == "function" ? e : mv(+e), u) : a;
	}, u.paddingOuter = function(e) {
		return arguments.length ? u.paddingTop(e).paddingRight(e).paddingBottom(e).paddingLeft(e) : u.paddingTop();
	}, u.paddingTop = function(e) {
		return arguments.length ? (o = typeof e == "function" ? e : mv(+e), u) : o;
	}, u.paddingRight = function(e) {
		return arguments.length ? (s = typeof e == "function" ? e : mv(+e), u) : s;
	}, u.paddingBottom = function(e) {
		return arguments.length ? (c = typeof e == "function" ? e : mv(+e), u) : c;
	}, u.paddingLeft = function(e) {
		return arguments.length ? (l = typeof e == "function" ? e : mv(+e), u) : l;
	}, u;
}
// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/treemap/binary.js
function Sv(e, t, n, r, i) {
	var a = e.children, o, s = a.length, c, l = Array(s + 1);
	for (l[0] = c = o = 0; o < s; ++o) l[o + 1] = c += a[o].value;
	u(0, s, e.value, t, n, r, i);
	function u(e, t, n, r, i, o, s) {
		if (e >= t - 1) {
			var c = a[e];
			c.x0 = r, c.y0 = i, c.x1 = o, c.y1 = s;
		} else {
			for (var d = l[e], f = n / 2 + d, p = e + 1, m = t - 1; p < m;) {
				var h = p + m >>> 1;
				l[h] < f ? p = h + 1 : m = h;
			}
			f - l[p - 1] < l[p] - f && e + 1 < p && --p;
			var g = l[p] - d, _ = n - g;
			if (o - r > s - i) {
				var v = n ? (r * _ + o * g) / n : o;
				u(e, p, g, r, i, v, s), u(p, t, _, v, i, o, s);
			} else {
				var y = n ? (i * _ + s * g) / n : s;
				u(e, p, g, r, i, o, y), u(p, t, _, r, y, o, s);
			}
		}
	}
}
// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/treemap/sliceDice.js
function Cv(e, t, n, r, i) {
	(e.depth & 1 ? _v : gv)(e, t, n, r, i);
}
// node_modules/.pnpm/d3-hierarchy@3.1.2/node_modules/d3-hierarchy/src/treemap/resquarify.js
var wv = (function e(t) {
	function n(e, n, r, i, a) {
		if ((o = e._squarify) && o.ratio === t) for (var o, s, c, l, u = -1, d, f = o.length, p = e.value; ++u < f;) {
			for (s = o[u], c = s.children, l = s.value = 0, d = c.length; l < d; ++l) s.value += c[l].value;
			s.dice ? gv(s, n, r, i, p ? r += (a - r) * s.value / p : a) : _v(s, n, r, p ? n += (i - n) * s.value / p : i, a), p -= s.value;
		}
		else e._squarify = o = yv(t, e, n, r, i, a), o.ratio = t;
	}
	return n.ratio = function(t) {
		return e((t = +t) > 1 ? t : 1);
	}, n;
})(vv);
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/ChartInternal/shape/core/treemap.js
function Tv(e) {
	let t = this;
	return e.map((e) => {
		let { id: n, values: r } = e, { value: i } = r[0];
		return {
			name: n,
			id: n,
			value: i,
			ratio: t.getRatio("treemap", r[0])
		};
	});
}
var Ev = {
	initTreemapLayout() {
		this.treemap = xv().tile(this.getTreemapTile());
	},
	getTreemapTile() {
		let { config: e, state: { current: { width: t, height: n } } } = this, r = {
			binary: Sv,
			dice: gv,
			slice: _v,
			sliceDice: Cv,
			squarify: bv,
			resquarify: wv
		}[e.treemap_tile ?? "binary"] ?? Sv;
		return (e, i, a, o, s) => {
			r(e, 0, 0, t, n);
			for (let r of e.children) r.x0 = i + r.x0 / t * (o - i), r.x1 = i + r.x1 / t * (o - i), r.y0 = a + r.y0 / n * (s - a), r.y1 = a + r.y1 / n * (s - a);
		};
	},
	getTreemapData(e) {
		let t = this;
		return {
			name: "root",
			children: Tv.bind(t)(t.filterTargetsToShow(e.filter(t.isTreemapType, t)))
		};
	},
	getTreemapRoot(e) {
		let t = this, n = av(t.getTreemapData(e ?? t.data.targets)).sum((e) => e.value), r = t.getSortCompareFn(!0);
		return t.treemap || t.initTreemapLayout(), t.treemap(r ? n.sort(r) : n);
	}
};
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/ChartInternal/shape/treemap.js
function Dv(e, t) {
	let n = this;
	e.selectAll("g").attr("transform", (e) => {
		let r = U_(n, e, t);
		return `translate(${r.x},${r.y})`;
	}).select("rect").attr("width", (e) => U_(n, e, t).w).attr("height", (e) => U_(n, e, t).h);
}
var Ov = {
	...Ev,
	initTreemap() {
		let e = this, { $el: t, state: { current: { width: n, height: r }, clip: i, datetimeId: a } } = e;
		i.id = `${a}-clip`, e.initTreemapLayout(), t.defs.append("clipPath").attr("id", i.id).append("rect").attr("width", n).attr("height", r), t.treemap = t.main.select(`.${z.chart}`).attr("clip-path", `url(#${i.id})`).append("g").classed(Pr.chartTreemaps, !0), e.bindTreemapEvent();
	},
	bindTreemapEvent() {
		let e = this, { $el: t, config: n, state: r } = e, i = (e) => {
			let t = e.isTrusted ? e.target : r.eventReceiver.rect?.node(), n;
			return t && /^rect$/i.test(t.tagName) && (r.event = e, n = L(t).datum()), n?.data;
		};
		if (n.interaction_enabled) {
			let a = r.inputType === "touch";
			t.treemap.on(a ? "touchstart" : "mouseover mousemove", (t) => {
				let n = i(t);
				n && (e.showTooltip([n], t.currentTarget), /^(touchstart|mouseover)$/.test(t.type) && e.setOverOut(!0, n));
			}, a ? { passive: !0 } : void 0).on(a ? "touchend" : "mouseout", (t) => {
				let r = i(t);
				n.interaction_onout && (e.hideTooltip(), e.setOverOut(!1, r));
			});
		}
	},
	updateTargetsForTreemap(e) {
		let t = this, { $el: { treemap: n } } = t, r = [t.getTreemapRoot(e ?? t.data.targets)];
		n.data(t.filterNullish(r));
	},
	updateTreemap(e) {
		let t = this, { $el: n, $T: r } = t, i = n.treemap.datum(), a = t.getChartClass("Treemap"), o = t.getClass("treemap", !0), s = n.treemap.selectAll("g").data(i.children);
		r(s.exit(), e).style("opacity", "0").remove(), s.enter().append("g").append("rect"), n.treemap.selectAll("g").attr("class", a).select("rect").attr("class", o).attr("fill", (e) => t.color(e.data.name));
	},
	generateGetTreemapPoints() {
		let e = this, { $el: t } = e, n = {};
		return t.treemap.selectAll("g").each((t) => {
			let r = U_(e, t);
			n[t.data.name] = [[r.x, r.y], [r.x + r.w, r.y + r.h]];
		}), (e) => n[e.id];
	},
	redrawTreemap(e) {
		let t = this, { $el: n, state: { current: { width: r, height: i } } } = t;
		return n.defs.select("rect").attr("width", r).attr("height", i), [t.$T(n.treemap, e, Pe()).call(Dv.bind(t), n.treemap.datum())];
	},
	treemapDataLabelFormat(e) {
		let t = this, { $el: { treemap: n }, config: r, scale: { x: i, y: a } } = t, { id: o, value: s } = e, c = r.treemap_label_format, l = t.getRatio("treemap", e), u = (l * 100).toFixed(2), d = r.treemap_label_show && Vf.call(t, l, "treemap") ? null : "0", f = n.selectAll("g").filter((e) => e.data.id === o).datum(), p = 0, m = 0;
		if (f) {
			let { x0: e, x1: t, y0: n, y1: r } = f;
			p = i(t) - i(e), m = a(r) - a(n);
		}
		return function(e) {
			return e.style("opacity", d), h(c) ? c.bind(t.api)(s, l, o, {
				width: p,
				height: m
			}) : `${o}\n${u}%`;
		};
	}
}, kv = {
	treemap_tile: "binary",
	treemap_label_format: void 0,
	treemap_label_threshold: .05,
	treemap_label_show: !0
}, Av = () => (vg([Ov], [kv]), (Av = () => I.TREEMAP)());
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/Chart/api/selection.js
function jv(e, t, n, r) {
	let i = this, { config: a, $el: { main: o } } = i, s = a.data_selection_grouped, c = a.data_selection_isselectable.bind(i.api), l = y(t) ? [].concat(t) : null, u = e && !a.data_selection_multiple, d = !u, f = (e, t, n) => {
		i.unselectPoint(e, t, n), e.interrupt().remove();
	};
	i.getTargetsToShow().forEach((t) => {
		let { id: a } = t, p = s || !l || l.indexOf(a) >= 0, m = o.select(`.${G.selectedCircles}${i.getTargetSelectorSuffix(a)}`);
		t.values.forEach((t) => {
			let { index: a } = t, o = !n || n.indexOf(a) >= 0, s = m.selectAll(`.${G.selectedCircle}-${a}`), l = !s.empty();
			e ? p && o && c(t) && (!l || u) ? (d ||= (jv.call(i, !1), !0), i.selectPoint(null, t, a)) : (!u || d) && y(r) && r && l && f(s, t, a) : p && o && l && f(s, t, a);
		});
	});
}
function Mv(e = !1, t, n, r) {
	let i = this, { config: a, $el: { main: o } } = i, s = a.data_selection_grouped, c = a.data_selection_isselectable.bind(i.api), l = e && !a.data_selection_multiple, u = !l;
	a.data_selection_enabled && (l && (n = n?.length ? [n[0]] : [0], s || (t = (y(t) ? [].concat(t) : i.getTargetsToShow().map((e) => e.id)).slice(0, 1))), i.isPointFocusOnly?.() ? jv.call(i, e, t, n, r) : o.selectAll(`.${K.shapes}`).selectAll(`.${K.shape}`).each(function(a) {
		let o = L(this), { id: d, index: f } = a.data ? a.data : a, p = s || !t || t.indexOf(d) >= 0, m = !n || n.indexOf(f) >= 0;
		if (o.classed(Dr.line) || o.classed(yr.area)) return;
		let h = i.getToggle(this, a).bind(i), g = o.classed(G.SELECTED);
		e ? p && m && c(a) && (!g || l) ? (u ||= (Mv.call(i, !1), !0), !o.classed(G.SELECTED) && h(!0, o.classed(G.SELECTED, !0), a, f)) : (!l || u) && y(r) && r && g && h(!1, o.classed(G.SELECTED, !1), a, f) : p && m && c(a) && g && h(!1, o.classed(G.SELECTED, !1), a, f);
	}));
}
var Nv = {
	selected(e) {
		let t = this.internal, n = [];
		return t.state.isCanvasMode ? t.getCanvasSelectedData?.(e) || n : t.isPointFocusOnly?.() ? (t.$el.main.selectAll(`.${G.selectedCircles + t.getTargetSelectorSuffix(e)}`).selectAll(`.${G.selectedCircle}`).each((e) => n.push(e)), n) : (t.$el.main.selectAll(`.${K.shapes + t.getTargetSelectorSuffix(e)}`).selectAll(`.${K.shape}`).filter(function() {
			return L(this).classed(G.SELECTED);
		}).each((e) => n.push(e)), n);
	},
	select(e, t, n) {
		let r = this.internal;
		r.state.isCanvasMode ? r.setCanvasSelection?.(!0, e, t, n) : Mv.bind(r)(!0, e, t, n);
	},
	unselect(e, t) {
		let n = this.internal;
		n.state.isCanvasMode ? n.setCanvasSelection?.(!1, e, t) : Mv.bind(n)(!1, e, t);
	}
}, Pv = {
	drag(e) {
		let t = this, { config: n, state: r, $el: { main: i } } = t, a = n.data_selection_grouped, o = n.interaction_enabled && n.data_selection_isselectable;
		if (t.hasArcType() || !n.data_selection_enabled || n.zoom_enabled && !t.zoom.altDomain || !n.data_selection_multiple) return;
		let [s, c] = r.dragStart || [0, 0], [l, u] = e, d = Math.min(s, l), f = Math.max(s, l), p = a ? r.margin.top : Math.min(c, u), m = a ? r.height : Math.max(c, u);
		_r(t.state, () => {
			t && t.$el && t.$el.main && (i.select(`.${wr.dragarea}`).attr("x", d).attr("y", p).attr("width", f - d).attr("height", m - p), i.selectAll(`.${K.shapes}`).selectAll(`.${K.shape}`).filter((e) => o?.bind(t.api)(e)).each(function(e, n) {
				let r = L(this), i = r.classed(G.SELECTED), a = r.classed(wr.INCLUDED), o, s;
				if (r.classed(Sr.circle)) {
					let e = +r.attr("cx"), n = +r.attr("cy");
					s = t.togglePoint, o = d < e && e < f && p < n && n < m;
				} else if (r.classed(br.bar)) {
					let { x: e, y: n, width: r, height: i } = ir(this);
					s = t.togglePath, o = !(f < e || e + r < d) && !(m < n || n + i < p);
				} else return;
				o ^ a && (r.classed(wr.INCLUDED, !a), r.classed(G.SELECTED, !i), s.call(t, !i, r, e, n));
			}));
		});
	},
	dragstart(e) {
		let t = this, { config: n, state: r, $el: { main: i } } = t;
		!t.hasArcType() && n.data_selection_enabled && (r.dragStart = e, i.select(`.${z.chart}`).append("rect").attr("class", wr.dragarea).style("opacity", "0.1"), t.setDragStatus(!0));
	},
	dragend() {
		let e = this, { config: t, $el: { main: n }, $T: r } = e;
		!e.hasArcType() && t.data_selection_enabled && (r(n.select(`.${wr.dragarea}`)).style("opacity", "0").remove(), n.selectAll(`.${K.shape}`).classed(wr.INCLUDED, !1), e.setDragStatus(!1));
	},
	selectPoint(e, t, n) {
		let r = this, { config: i, $el: { main: a }, $T: o } = r, s = i.axis_rotated, c = (s ? r.circleY : r.circleX).bind(r), l = (s ? r.circleX : r.circleY).bind(r), u = r.pointSelectR.bind(r);
		P(i.data_onselected, r.api, t, e?.node()), o(a.select(`.${G.selectedCircles}${r.getTargetSelectorSuffix(t.id)}`).selectAll(`.${G.selectedCircle}-${n}`).data([t]).enter().append("circle").attr("class", () => r.generateClass(G.selectedCircle, n)).attr("cx", c).attr("cy", l).attr("stroke", r.color).attr("r", (e) => r.pointSelectR(e) * 1.4)).attr("r", u);
	},
	unselectPoint(e, t, n) {
		let r = this, { config: i, $el: { main: a }, $T: o } = r;
		P(i.data_onunselected, r.api, t, e?.node()), o(a.select(`.${G.selectedCircles}${r.getTargetSelectorSuffix(t.id)}`).selectAll(`.${G.selectedCircle}-${n}`)).attr("r", 0).remove();
	},
	togglePoint(e, t, n, r) {
		let i = `${e ? "" : "un"}selectPoint`;
		this[i](t, n, r);
	},
	selectPath(e, t) {
		let n = this, { config: r } = n;
		P(r.data_onselected, n.api, t, e.node()), r.interaction_brighten && e.style("filter", "brightness(1.25)");
	},
	unselectPath(e, t) {
		let n = this, { config: r } = n;
		P(r.data_onunselected, n.api, t, e.node()), r.interaction_brighten && e.style("filter", null);
	},
	togglePath(e, t, n, r) {
		this[`${e ? "" : "un"}selectPath`](t, n, r);
	},
	getToggle(e, t) {
		let n = this;
		return e.nodeName === "path" ? n.togglePath : n.isStepType(t) ? () => {} : n.togglePoint;
	},
	toggleShape(e, t, n) {
		let r = this, { config: i, $el: { main: a } } = r;
		if (i.data_selection_enabled && i.data_selection_isselectable.bind(r.api)(t)) {
			let o = L(e), s = o.classed(G.SELECTED), c = r.getToggle(e, t).bind(r), l;
			if (!i.data_selection_multiple) {
				let e = r.isPointFocusOnly?.(), n = `.${e ? G.selectedCircles : K.shapes}`;
				i.data_selection_grouped && (n += r.getTargetSelectorSuffix(t.id)), a.selectAll(n).selectAll(e ? `.${G.selectedCircle}` : `.${K.shape}.${G.SELECTED}`).classed(G.SELECTED, !1).each(function(e) {
					let t = L(this);
					l = t, c(!1, t, e, e.index);
				});
			}
			l && l.node() === o.node() || (o.classed(G.SELECTED, !s), c(!s, o, t, n));
		}
	}
}, Fv = {
	data_selection_enabled: !1,
	data_selection_grouped: !1,
	data_selection_isselectable: () => !0,
	data_selection_multiple: !0,
	data_selection_draggable: !1,
	data_onselected: () => {},
	data_onunselected: () => {}
}, Iv = () => (F(Um.prototype, Pv), F(th.prototype, Nv), Wr.setOptions([Fv]), (Iv = () => !0)()), Lv = function(e) {
	let t = this.internal, { axis: n, brush: r, config: i, scale: { x: a, subX: o }, state: s } = t, c;
	return s.isCanvasMode ? (i.subchart_show && (c = e, Array.isArray(c) ? (c = n.isTimeSeries() ? c.map((e) => Le.bind(t)(e)) : c, c = t.setCanvasSubchartDomain(c) || s.domain) : c = s.domain ?? a.orgDomain()), c) : (i.subchart_show && (c = e, Array.isArray(c) ? (n.isTimeSeries() && (c = c.map((e) => Le.bind(t)(e))), t.withinRange(c, t.getZoomDomain("subX", !0), t.getZoomDomain("subX")) && (s.domain = c.slice(), r.move(r.getSelection(), c.map(o)))) : c = s.domain ?? a.orgDomain()), c);
};
F(Lv, {
	show() {
		let e = this.internal, { $el: { subchart: t }, config: n } = e, r = n.subchart_show;
		if (!r) {
			if (e.state.isCanvasMode) {
				e.unbindZoomEvent?.(), n.subchart_show = !0, this.resize();
				return;
			}
			e.unbindZoomEvent(), n.subchart_show = !r, !t.main && e.initSubchart();
			let i = t.main.selectAll(`.${z.target}`);
			e.data.targets.length !== i.size() && (e.updateSizes(), e.updateTargetsForSubchart(e.data.targets), i = t.main?.selectAll(`.${z.target}`)), i?.style("opacity", null), t.main?.style("display", null), this.resize();
		}
	},
	hide() {
		let e = this.internal, { $el: { subchart: { main: t } }, config: n } = e;
		e.state.isCanvasMode ? n.subchart_show && (n.subchart_show = !1, this.resize(), e.bindZoomEvent?.()) : n.subchart_show && t?.style("display") !== "none" && (n.subchart_show = !1, t.style("display", "none"), this.resize());
	},
	toggle() {
		let { config: e } = this.internal;
		this.subchart[e.subchart_show ? "hide" : "show"]();
	},
	reset() {
		let e = this.internal, { brush: t } = e;
		e.state.isCanvasMode ? e.clearCanvasSubchartDomain?.(!0, !1) : t.clear(t.getSelection());
	}
});
var Rv = { subchart: Lv };
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/ChartInternal/internals/subchart.util.js
function zv(e) {
	let { config: t, state: n } = e;
	return !!(t.subchart_grid_focus_continuous && t.subchart_grid_focus !== !1 && t.subchart_show && t.subchart_brush_enabled === !1 && n.width2 > 0 && n.height2 > 0);
}
function Bv(e, t) {
	let { config: n, scale: r, state: i } = e, a = r.zoom || r.x, o = r.subX;
	if (!a || !o) return null;
	let s = n.axis_rotated ? i.height2 : i.width2, c = n.axis_rotated ? i.height : i.width, l = o.invert?.(t), u = l == null ? NaN : a(l);
	return !Number.isFinite(u) && s > 0 && (u = Math.max(0, Math.min(1, t / s)) * c), Number.isFinite(u) ? Math.max(0, Math.min(c, u)) : null;
}
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/ChartInternal/interactions/subchart.js
var Vv = [
	"bar",
	"line",
	"bubble",
	"candlestick",
	"scatter"
], Hv = [
	"opacity",
	"stroke",
	"stroke-dasharray",
	"stroke-dashoffset",
	"stroke-linecap",
	"stroke-linejoin",
	"stroke-miterlimit",
	"stroke-opacity",
	"stroke-width"
];
function Uv(e, t) {
	let n = e.$el.grid?.main?.select(`line.${J.xgridFocus}`).node();
	if (!n || !c.getComputedStyle) return;
	let r = c.getComputedStyle(n);
	Hv.forEach((e) => {
		let n = r.getPropertyValue(e);
		n && t.style(e, n);
	});
}
function Wv(e, t) {
	let n = Number(e);
	return Number.isFinite(n) ? n : t;
}
function Gv(e) {
	if (!zv(e)) return !1;
	let { config: t, state: n, $el: r } = e, i = r.grid?.main?.select(`line.${J.xgridFocus}:not(.${J.xgridFocusContinuous})`), a = r.main.select(`line.${J.xgridFocusContinuous}`);
	if (!i?.node() || !a.node()) return !1;
	let o = n.margin2.left - n.margin.left + n.width2, s = n.margin2.top - n.margin.top + n.height2;
	return Uv(e, a), t.axis_rotated ? a.attr("x1", Wv(i.attr("x1"), 0)).attr("x2", o).attr("y1", Wv(i.attr("y1"), -10)).attr("y2", Wv(i.attr("y2"), -10)) : a.attr("x1", Wv(i.attr("x1"), -10)).attr("x2", Wv(i.attr("x2"), -10)).attr("y1", Wv(i.attr("y1"), 0)).attr("y2", s), a.style("visibility", null), i.style("visibility", "hidden"), !0;
}
function Kv(e) {
	e.$el.main?.select(`line.${J.xgridFocusContinuous}`).style("visibility", "hidden");
}
function qv(e, t, n) {
	let { config: r, state: i } = e, [a, o] = ar(t, n), s = Bv(e, r.axis_rotated ? o : a);
	return s === null ? null : r.axis_rotated ? [i.width / 2, s] : [s, i.height / 2];
}
function Jv(e, t, n, r) {
	let i = e.$el.eventRect?.node?.();
	if (!i) return;
	let a = qv(e, n, r) || [0, 0], o = R(i, !0), s = o.left + a[0], c = o.top + a[1], l = {
		bubbles: !0,
		cancelable: !0,
		screenX: s,
		screenY: c,
		clientX: s,
		clientY: c
	};
	/^touch/.test(t) ? vr.touch(i, t, l) : vr.mouse(i, t, l);
}
var Yv = {
	isSubchartBrushEnabled() {
		let { config: e } = this;
		return e.subchart_show && e.subchart_brush_enabled !== !1;
	},
	bindSubchartEventRect(e) {
		let t = this, { config: n, state: r } = t;
		e.on("mouseover mousemove mouseout touchstart touchmove touchend", null), n.interaction_enabled && (r.inputType === "mouse" ? e.on("mouseover mousemove", function(e) {
			t.isSubchartBrushEnabled() || Jv(t, e.type, e, this);
		}).on("mouseout", function(e) {
			t.isSubchartBrushEnabled() || Jv(t, "mouseout", e, this);
		}) : r.inputType === "touch" && e.on("touchstart touchmove touchend", function(e) {
			t.isSubchartBrushEnabled() || e.touches?.length > 1 || Jv(t, e.type, e, this);
		}));
	},
	initBrush() {
		let e = this, { config: t, scale: n, $el: { subchart: r }, state: i } = e, a = t.axis_rotated, o = t.subchart_size_height, s, c, l;
		e.brush = (a ? Xc() : Yc()).handleSize(5), e.brush.on("start brush end", (t) => {
			let { selection: r, sourceEvent: l, target: u, type: d } = t;
			d === "start" && (e.state.inputType === "touch" && e.hideTooltip(), c = l ? r : null), /(start|brush)/.test(d) && (d === "brush" && l && i.domain && c?.forEach((e, t) => {
				e !== r[t] && (i.domain[t] = n.x.orgDomain()[t]);
			}), e.redrawForBrush(d !== "start")), d === "end" && (s = n.x.orgDomain()), u?.handle && (r === null ? e.brush.handle.attr("display", "none") : e.brush.handle.attr("display", null).attr("transform", (e, t) => {
				let n = [r[t], o / 2];
				return `translate(${a ? n.reverse() : n})`;
			}));
		}), e.brush.updateResize = function() {
			l && clearTimeout(l), l = setTimeout(() => {
				let e = this.getSelection();
				s && Jc(e.node()) && this.move(e, s.map(n.subX.orgScale()));
			}, 0);
		}, e.brush.update = function() {
			return this.extent()()[1].filter((e) => isNaN(e)).length === 0 && r.main?.select(`.${J.brush}`).call(this), this;
		}, e.brush.scale = function(n) {
			let r = t.subchart_size_height, i = e.axis.getExtent();
			!i && n.range ? i = [[0, 0], [n.range()[1], r]] : O(i) && (i = i.map((e, t) => [e, t > 0 ? r : t])), a && i[1].reverse(), this.extent(i), this.update();
		}, e.brush.getSelection = () => r.main ? r.main.select(`.${J.brush}`) : L([]);
	},
	initSubchart() {
		let e = this, { config: t, state: { clip: n, hasAxis: r }, $el: { defs: i, svg: a, subchart: o, axis: s } } = e;
		if (!r) return;
		let c = t.subchart_show ? null : "hidden", l = `${n.id}-subchart`, u = e.getClipPath(l);
		n.idSubchart = l, e.appendClip(i, l), e.initBrush(), o.main = a.append("g").classed(J.subchart, !0).attr("transform", e.getTranslate("context"));
		let { main: d } = o;
		d.style("visibility", c), d.append("g").attr("clip-path", u).attr("class", J.chart), e.withSubchartTypeContext(() => {
			Vv.forEach((t) => {
				let n = Ce(/^(bubble|scatter)$/.test(t) ? "circle" : t);
				if (e.hasType(t) || e.hasTypeOf(n)) {
					let e = d.select(`.${J.chart}`), t = J[`chart${n}s`];
					e.select(`.${t}`).empty() && e.append("g").attr("class", t);
				}
			});
		});
		let f = d.append("g").attr("clip-path", u).attr("class", J.brush).style("pointer-events", e.isSubchartBrushEnabled() ? null : "none").call(e.brush);
		t.subchart_showHandle && e.addBrushHandle(f), o.eventRect = d.append("g").attr("clip-path", u).attr("class", `${J.eventRects} ${J.eventRects}-subchart`).style("fill-opacity", "0").style("pointer-events", e.isSubchartBrushEnabled() ? "none" : "all").append("rect").attr("class", `${J.eventRect} ${J.eventRect}-subchart`).attr("width", e.state.width2).attr("height", e.state.height2), e.bindSubchartEventRect(o.eventRect), d.append("g").attr("clip-path", u).attr("class", J.xgridFocus).append("line").attr("class", J.xgridFocus).style("visibility", "hidden"), s.subX = d.append("g").attr("class", J.axisX).attr("transform", e.getTranslate("subX")).attr("clip-path", t.axis_rotated ? "" : n.pathXAxis).style("visibility", t.subchart_axis_x_show ? c : "hidden"), s.subY = d.append("g").attr("class", J.axisY).attr("transform", e.getTranslate("subY")).style("visibility", t.subchart_axis_y_show ? c : "hidden"), s.subY2 = d.append("g").attr("class", J.axisY2).attr("transform", e.getTranslate("subY2")).style("visibility", t.subchart_axis_y2_show ? c : "hidden");
	},
	addBrushHandle(e) {
		let t = this, { config: n } = t, r = n.axis_rotated, i = n.subchart_init_range, a = "handle--custom", o = Ue[r ? "y" : "x"];
		t.brush.handle = e.selectAll(`.${a}`).data(r ? [{ type: "n" }, { type: "s" }] : [{ type: "w" }, { type: "e" }]).enter().append("path").attr("class", a).attr("cursor", `${r ? "ns" : "ew"}-resize`).attr("d", (e) => o[/[se]/.test(e.type) ? "end" : "start"]).attr("display", i ? null : "none");
	},
	updateTargetsForSubchart(e) {
		let t = this, { config: n, state: r, $el: { subchart: { main: i } } } = t;
		n.subchart_show && (t.withSubchartTypeContext(() => {
			Vv.filter((e) => t.hasType(e) || t.hasTypeOf(Ce(e))).forEach((n) => {
				let r = /^(bubble|scatter)$/.test(n), a = Ce(r ? "circle" : n), o = t.getChartClass(a, !0), s = t.getClass(r ? "circles" : `${n}s`, !0), c = i.select(`.${J[`chart${`${a}s`}`]}`);
				if (r) {
					let r = c.selectAll(`.${J.circles}`).data(e.filter(t[`is${Ce(n)}Type`].bind(t))).attr("class", s);
					r.exit().remove(), r.enter().append("g").attr("class", s);
				} else {
					let r = c.selectAll(`.${J[`chart${a}`]}`).attr("class", o).data(e.filter(t[`is${a}Type`].bind(t))), i = r.enter().append("g").style("opacity", "0").attr("class", o).append("g").attr("class", s);
					r.exit().remove(), n === "line" && t.hasTypeOf("Area") && i.append("g").attr("class", t.getClass("areas", !0));
				}
			});
		}), i.selectAll(`.${J.brush} rect`).attr(n.axis_rotated ? "width" : "height", n.axis_rotated ? r.width2 : r.height2), t.$el.subchart.eventRect?.attr("width", r.width2).attr("height", r.height2).style("pointer-events", t.isSubchartBrushEnabled() ? "none" : "all"));
	},
	updateSubchartYDomain(e) {
		let t = this, { scale: n } = t, r = e || t.filterTargetsToShow(t.data.targets);
		n.subY?.domain(t.getYDomain(r, "y")), n.subY2?.domain(t.getYDomain(r, "y2"));
	},
	redrawSubchart(e, t) {
		let n = this, { config: r, $el: { subchart: { main: i } }, state: a } = n, o = !!t;
		if (i.style("visibility", r.subchart_show ? null : "hidden"), i.select(`.${J.brush}`).style("pointer-events", n.isSubchartBrushEnabled() ? null : "none"), n.$el.subchart.eventRect?.style("pointer-events", n.isSubchartBrushEnabled() ? "none" : "all"), n.$el.axis.subY?.style("visibility", r.subchart_axis_y_show ? null : "hidden"), n.$el.axis.subY2?.style("visibility", r.subchart_axis_y2_show ? null : "hidden"), r.subchart_show && (a.event?.type === "zoom" && n.brush.update(), e)) {
			let e = r.subchart_init_range;
			!$c(n) && n.brush.update(), n.withSubchartTypeContext(() => {
				let e = a._targetsToShow || n.filterTargetsToShow(n.data.targets);
				n.updateSubchartYDomain(e);
				let t = n.getDrawShape();
				if (Object.keys(t.type).forEach((e) => {
					let r = Ce(e), i = n[`generateDraw${r}`](t.indices[e], !0);
					n[`update${r}`](o, !0), n[`redraw${r}`](i, o, !0);
				}), n.hasType("bubble") || n.hasType("scatter")) {
					let { cx: e } = t.pos, r = n.updateCircleY(!0);
					n.updateCircle(!0), n.redrawCircle(e, r, o, void 0, !0);
				}
			}), !a.rendered && e && (a.domain = e, n.brush.move(n.brush.getSelection(), e.map(n.scale.x)));
		}
	},
	showSubchartGridFocus(e) {
		let t = this, { config: n, state: r, $el: { subchart: { main: i } } } = t;
		if (!i || !n.subchart_show || t.isSubchartBrushEnabled() || n.grid_focus_show === !1 || n.subchart_grid_focus === !1 || !n.tooltip_show || n.axis_tooltip) return;
		let a = (Array.isArray(e) ? e : [e]).find((e) => e && t.getBaseValue(e) != null);
		if (!a) {
			t.hideSubchartGridFocus();
			return;
		}
		let o = t.scale.subX(a.x);
		if (!Number.isFinite(o)) {
			t.hideSubchartGridFocus();
			return;
		}
		let s = i.select(`g.${J.xgridFocus} line.${J.xgridFocus}`);
		Gv(t) ? s.style("visibility", "hidden") : (Uv(t, s), n.axis_rotated ? s.attr("x1", 0).attr("x2", r.width2).attr("y1", o).attr("y2", o) : s.attr("x1", o).attr("x2", o).attr("y1", 0).attr("y2", r.height2), s.style("visibility", null));
	},
	hideSubchartGridFocus() {
		Kv(this), this.$el.subchart.main?.select(`g.${J.xgridFocus} line.${J.xgridFocus}`).style("visibility", "hidden");
	},
	redrawForBrush(e = !0) {
		let t = this, { config: { subchart_onbrush: n, zoom_rescale: r }, scale: i, state: a } = t;
		t.redraw({
			withTransition: !1,
			withY: r,
			withSubchart: !1,
			withUpdateXDomain: !0,
			withDimension: !1
		}), e && a.rendered && n.bind(t.api)(a.domain ?? i.x.orgDomain());
	},
	transformContext(e, t) {
		let n = this, { $el: { subchart: r }, $T: i } = n, a = t?.axisSubX ? t.axisSubX : i(r.main.select(`.${J.axisX}`), e), o = t?.axisSubY ? t.axisSubY : i(r.main.select(`.${J.axisY}`), e), s = t?.axisSubY2 ? t.axisSubY2 : i(r.main.select(`.${J.axisY2}`), e);
		r.main.attr("transform", n.getTranslate("context")), a.attr("transform", n.getTranslate("subX")), o.attr("transform", n.getTranslate("subY")), s.attr("transform", n.getTranslate("subY2"));
	}
}, Xv = {
	subchart_show: !1,
	subchart_type: void 0,
	subchart_types: {},
	subchart_brush_enabled: !0,
	subchart_showHandle: !1,
	subchart_size_height: 60,
	subchart_grid_focus: !0,
	subchart_grid_focus_continuous: !1,
	subchart_axis_x_show: !0,
	subchart_axis_x_tick_show: !0,
	subchart_axis_x_tick_count: void 0,
	subchart_axis_x_tick_values: void 0,
	subchart_axis_x_tick_culling: void 0,
	subchart_axis_x_tick_culling_max: void 0,
	subchart_axis_x_tick_culling_lines: void 0,
	subchart_axis_x_tick_culling_reverse: void 0,
	subchart_axis_x_tick_outer: void 0,
	subchart_axis_x_tick_format: void 0,
	subchart_axis_x_tick_text_show: !0,
	subchart_axis_y_show: !1,
	subchart_axis_y_tick_show: !0,
	subchart_axis_y_tick_count: void 0,
	subchart_axis_y_tick_values: void 0,
	subchart_axis_y_tick_culling: void 0,
	subchart_axis_y_tick_culling_max: void 0,
	subchart_axis_y_tick_culling_lines: void 0,
	subchart_axis_y_tick_culling_reverse: void 0,
	subchart_axis_y_tick_outer: void 0,
	subchart_axis_y_tick_format: void 0,
	subchart_axis_y_tick_text_show: !0,
	subchart_axis_y2_show: !1,
	subchart_axis_y2_tick_show: !0,
	subchart_axis_y2_tick_count: void 0,
	subchart_axis_y2_tick_values: void 0,
	subchart_axis_y2_tick_culling: void 0,
	subchart_axis_y2_tick_culling_max: void 0,
	subchart_axis_y2_tick_culling_lines: void 0,
	subchart_axis_y2_tick_culling_reverse: void 0,
	subchart_axis_y2_tick_outer: void 0,
	subchart_axis_y2_tick_format: void 0,
	subchart_axis_y2_tick_text_show: !0,
	subchart_init_range: void 0,
	subchart_onbrush: () => {}
}, Zv = () => (F(Um.prototype, Yv), F(th.prototype, Rv), Wr.setOptions([Xv]), (Zv = () => !0)()), Qv = (e) => () => e;
// node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/event.js
function $v(e, { sourceEvent: t, target: n, transform: r, dispatch: i }) {
	Object.defineProperties(this, {
		type: {
			value: e,
			enumerable: !0,
			configurable: !0
		},
		sourceEvent: {
			value: t,
			enumerable: !0,
			configurable: !0
		},
		target: {
			value: n,
			enumerable: !0,
			configurable: !0
		},
		transform: {
			value: r,
			enumerable: !0,
			configurable: !0
		},
		_: { value: i }
	});
}
// node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/transform.js
function ey(e, t, n) {
	this.k = e, this.x = t, this.y = n;
}
ey.prototype = {
	constructor: ey,
	scale: function(e) {
		return e === 1 ? this : new ey(this.k * e, this.x, this.y);
	},
	translate: function(e, t) {
		return e === 0 & t === 0 ? this : new ey(this.k, this.x + this.k * e, this.y + this.k * t);
	},
	apply: function(e) {
		return [e[0] * this.k + this.x, e[1] * this.k + this.y];
	},
	applyX: function(e) {
		return e * this.k + this.x;
	},
	applyY: function(e) {
		return e * this.k + this.y;
	},
	invert: function(e) {
		return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k];
	},
	invertX: function(e) {
		return (e - this.x) / this.k;
	},
	invertY: function(e) {
		return (e - this.y) / this.k;
	},
	rescaleX: function(e) {
		return e.copy().domain(e.range().map(this.invertX, this).map(e.invert, e));
	},
	rescaleY: function(e) {
		return e.copy().domain(e.range().map(this.invertY, this).map(e.invert, e));
	},
	toString: function() {
		return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
	}
};
var ty = new ey(1, 0, 0);
ny.prototype = ey.prototype;
function ny(e) {
	for (; !e.__zoom;) if (!(e = e.parentNode)) return ty;
	return e.__zoom;
}
// node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/noevent.js
function ry(e) {
	e.stopImmediatePropagation();
}
function iy(e) {
	e.preventDefault(), e.stopImmediatePropagation();
}
// node_modules/.pnpm/d3-zoom@3.0.0/node_modules/d3-zoom/src/zoom.js
function ay(e) {
	return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function oy() {
	var e = this;
	return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function sy() {
	return this.__zoom || ty;
}
function cy(e) {
	return -e.deltaY * (e.deltaMode === 1 ? .05 : e.deltaMode ? 1 : .002) * (e.ctrlKey ? 10 : 1);
}
function ly() {
	return navigator.maxTouchPoints || "ontouchstart" in this;
}
function uy(e, t, n) {
	var r = e.invertX(t[0][0]) - n[0][0], i = e.invertX(t[1][0]) - n[1][0], a = e.invertY(t[0][1]) - n[0][1], o = e.invertY(t[1][1]) - n[1][1];
	return e.translate(i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i), o > a ? (a + o) / 2 : Math.min(0, a) || Math.max(0, o));
}
function dy() {
	var e = ay, t = oy, n = uy, r = cy, i = ly, a = [0, Infinity], o = [[-Infinity, -Infinity], [Infinity, Infinity]], s = 250, c = Fo, l = Gi("start", "zoom", "end"), u, d, f, p = 500, m = 150, h = 0, g = 10;
	function _(e) {
		e.property("__zoom", sy).on("wheel.zoom", w, { passive: !1 }).on("mousedown.zoom", T).on("dblclick.zoom", E).filter(i).on("touchstart.zoom", D).on("touchmove.zoom", O).on("touchend.zoom touchcancel.zoom", k).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
	}
	_.transform = function(e, t, n, r) {
		var i = e.selection ? e.selection() : e;
		i.property("__zoom", sy), e === i ? i.interrupt().each(function() {
			S(this, arguments).event(r).start().zoom(null, typeof t == "function" ? t.apply(this, arguments) : t).end();
		}) : x(e, t, n, r);
	}, _.scaleBy = function(e, t, n, r) {
		_.scaleTo(e, function() {
			return this.__zoom.k * (typeof t == "function" ? t.apply(this, arguments) : t);
		}, n, r);
	}, _.scaleTo = function(e, r, i, a) {
		_.transform(e, function() {
			var e = t.apply(this, arguments), a = this.__zoom, s = i == null ? b(e) : typeof i == "function" ? i.apply(this, arguments) : i, c = a.invert(s), l = typeof r == "function" ? r.apply(this, arguments) : r;
			return n(y(v(a, l), s, c), e, o);
		}, i, a);
	}, _.translateBy = function(e, r, i, a) {
		_.transform(e, function() {
			return n(this.__zoom.translate(typeof r == "function" ? r.apply(this, arguments) : r, typeof i == "function" ? i.apply(this, arguments) : i), t.apply(this, arguments), o);
		}, null, a);
	}, _.translateTo = function(e, r, i, a, s) {
		_.transform(e, function() {
			var e = t.apply(this, arguments), s = this.__zoom, c = a == null ? b(e) : typeof a == "function" ? a.apply(this, arguments) : a;
			return n(ty.translate(c[0], c[1]).scale(s.k).translate(typeof r == "function" ? -r.apply(this, arguments) : -r, typeof i == "function" ? -i.apply(this, arguments) : -i), e, o);
		}, a, s);
	};
	function v(e, t) {
		return t = Math.max(a[0], Math.min(a[1], t)), t === e.k ? e : new ey(t, e.x, e.y);
	}
	function y(e, t, n) {
		var r = t[0] - n[0] * e.k, i = t[1] - n[1] * e.k;
		return r === e.x && i === e.y ? e : new ey(e.k, r, i);
	}
	function b(e) {
		return [(+e[0][0] + +e[1][0]) / 2, (+e[0][1] + +e[1][1]) / 2];
	}
	function x(e, n, r, i) {
		e.on("start.zoom", function() {
			S(this, arguments).event(i).start();
		}).on("interrupt.zoom end.zoom", function() {
			S(this, arguments).event(i).end();
		}).tween("zoom", function() {
			var e = this, a = arguments, o = S(e, a).event(i), s = t.apply(e, a), l = r == null ? b(s) : typeof r == "function" ? r.apply(e, a) : r, u = Math.max(s[1][0] - s[0][0], s[1][1] - s[0][1]), d = e.__zoom, f = typeof n == "function" ? n.apply(e, a) : n, p = c(d.invert(l).concat(u / d.k), f.invert(l).concat(u / f.k));
			return function(e) {
				if (e === 1) e = f;
				else {
					var t = p(e), n = u / t[2];
					e = new ey(n, l[0] - t[0] * n, l[1] - t[1] * n);
				}
				o.zoom(null, e);
			};
		});
	}
	function S(e, t, n) {
		return !n && e.__zooming || new C(e, t);
	}
	function C(e, n) {
		this.that = e, this.args = n, this.active = 0, this.sourceEvent = null, this.extent = t.apply(e, n), this.taps = 0;
	}
	C.prototype = {
		event: function(e) {
			return e && (this.sourceEvent = e), this;
		},
		start: function() {
			return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
		},
		zoom: function(e, t) {
			return this.mouse && e !== "mouse" && (this.mouse[1] = t.invert(this.mouse[0])), this.touch0 && e !== "touch" && (this.touch0[1] = t.invert(this.touch0[0])), this.touch1 && e !== "touch" && (this.touch1[1] = t.invert(this.touch1[0])), this.that.__zoom = t, this.emit("zoom"), this;
		},
		end: function() {
			return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
		},
		emit: function(e) {
			var t = L(this.that).datum();
			l.call(e, this.that, new $v(e, {
				sourceEvent: this.sourceEvent,
				target: _,
				type: e,
				transform: this.that.__zoom,
				dispatch: l
			}), t);
		}
	};
	function w(t, ...i) {
		if (!e.apply(this, arguments)) return;
		var s = S(this, i).event(t), c = this.__zoom, l = Math.max(a[0], Math.min(a[1], c.k * 2 ** r.apply(this, arguments))), u = Xn(t);
		if (s.wheel) (s.mouse[0][0] !== u[0] || s.mouse[0][1] !== u[1]) && (s.mouse[1] = c.invert(s.mouse[0] = u)), clearTimeout(s.wheel);
		else if (c.k === l) return;
		else s.mouse = [u, c.invert(u)], us(this), s.start();
		iy(t), s.wheel = setTimeout(d, m), s.zoom("mouse", n(y(v(c, l), s.mouse[0], s.mouse[1]), s.extent, o));
		function d() {
			s.wheel = null, s.end();
		}
	}
	function T(t, ...r) {
		if (f || !e.apply(this, arguments)) return;
		var i = t.currentTarget, a = S(this, r, !0).event(t), s = L(t.view).on("mousemove.zoom", d, !0).on("mouseup.zoom", p, !0), c = Xn(t, i), l = t.clientX, u = t.clientY;
		ea(t.view), ry(t), a.mouse = [c, this.__zoom.invert(c)], us(this), a.start();
		function d(e) {
			if (iy(e), !a.moved) {
				var t = e.clientX - l, r = e.clientY - u;
				a.moved = t * t + r * r > h;
			}
			a.event(e).zoom("mouse", n(y(a.that.__zoom, a.mouse[0] = Xn(e, i), a.mouse[1]), a.extent, o));
		}
		function p(e) {
			s.on("mousemove.zoom mouseup.zoom", null), ta(e.view, a.moved), iy(e), a.event(e).end();
		}
	}
	function E(r, ...i) {
		if (e.apply(this, arguments)) {
			var a = this.__zoom, c = Xn(r.changedTouches ? r.changedTouches[0] : r, this), l = a.invert(c), u = a.k * (r.shiftKey ? .5 : 2), d = n(y(v(a, u), c, l), t.apply(this, i), o);
			iy(r), s > 0 ? L(this).transition().duration(s).call(x, d, c, r) : L(this).call(_.transform, d, c, r);
		}
	}
	function D(t, ...n) {
		if (e.apply(this, arguments)) {
			var r = t.touches, i = r.length, a = S(this, n, t.changedTouches.length === i).event(t), o, s, c, l;
			for (ry(t), s = 0; s < i; ++s) c = r[s], l = Xn(c, this), l = [
				l,
				this.__zoom.invert(l),
				c.identifier
			], a.touch0 ? !a.touch1 && a.touch0[2] !== l[2] && (a.touch1 = l, a.taps = 0) : (a.touch0 = l, o = !0, a.taps = 1 + !!u);
			u &&= clearTimeout(u), o && (a.taps < 2 && (d = l[0], u = setTimeout(function() {
				u = null;
			}, p)), us(this), a.start());
		}
	}
	function O(e, ...t) {
		if (this.__zooming) {
			var r = S(this, t).event(e), i = e.changedTouches, a = i.length, s, c, l, u;
			for (iy(e), s = 0; s < a; ++s) c = i[s], l = Xn(c, this), r.touch0 && r.touch0[2] === c.identifier ? r.touch0[0] = l : r.touch1 && r.touch1[2] === c.identifier && (r.touch1[0] = l);
			if (c = r.that.__zoom, r.touch1) {
				var d = r.touch0[0], f = r.touch0[1], p = r.touch1[0], m = r.touch1[1], h = (h = p[0] - d[0]) * h + (h = p[1] - d[1]) * h, g = (g = m[0] - f[0]) * g + (g = m[1] - f[1]) * g;
				c = v(c, Math.sqrt(h / g)), l = [(d[0] + p[0]) / 2, (d[1] + p[1]) / 2], u = [(f[0] + m[0]) / 2, (f[1] + m[1]) / 2];
			} else if (r.touch0) l = r.touch0[0], u = r.touch0[1];
			else return;
			r.zoom("touch", n(y(c, l, u), r.extent, o));
		}
	}
	function k(e, ...t) {
		if (this.__zooming) {
			var n = S(this, t).event(e), r = e.changedTouches, i = r.length, a, o;
			for (ry(e), f && clearTimeout(f), f = setTimeout(function() {
				f = null;
			}, p), a = 0; a < i; ++a) o = r[a], n.touch0 && n.touch0[2] === o.identifier ? delete n.touch0 : n.touch1 && n.touch1[2] === o.identifier && delete n.touch1;
			if (n.touch1 && !n.touch0 && (n.touch0 = n.touch1, delete n.touch1), n.touch0) n.touch0[1] = this.__zoom.invert(n.touch0[0]);
			else if (n.end(), n.taps === 2 && (o = Xn(o, this), Math.hypot(d[0] - o[0], d[1] - o[1]) < g)) {
				var s = L(this).on("dblclick.zoom");
				s && s.apply(this, arguments);
			}
		}
	}
	return _.wheelDelta = function(e) {
		return arguments.length ? (r = typeof e == "function" ? e : Qv(+e), _) : r;
	}, _.filter = function(t) {
		return arguments.length ? (e = typeof t == "function" ? t : Qv(!!t), _) : e;
	}, _.touchable = function(e) {
		return arguments.length ? (i = typeof e == "function" ? e : Qv(!!e), _) : i;
	}, _.extent = function(e) {
		return arguments.length ? (t = typeof e == "function" ? e : Qv([[+e[0][0], +e[0][1]], [+e[1][0], +e[1][1]]]), _) : t;
	}, _.scaleExtent = function(e) {
		return arguments.length ? (a[0] = +e[0], a[1] = +e[1], _) : [a[0], a[1]];
	}, _.translateExtent = function(e) {
		return arguments.length ? (o[0][0] = +e[0][0], o[1][0] = +e[1][0], o[0][1] = +e[0][1], o[1][1] = +e[1][1], _) : [[o[0][0], o[0][1]], [o[1][0], o[1][1]]];
	}, _.constrain = function(e) {
		return arguments.length ? (n = e, _) : n;
	}, _.duration = function(e) {
		return arguments.length ? (s = +e, _) : s;
	}, _.interpolate = function(e) {
		return arguments.length ? (c = e, _) : c;
	}, _.on = function() {
		var e = l.on.apply(l, arguments);
		return e === l ? _ : e;
	}, _.clickDistance = function(e) {
		return arguments.length ? (h = (e = +e) * e, _) : Math.sqrt(h);
	}, _.tapDistance = function(e) {
		return arguments.length ? (g = +e, _) : g;
	}, _;
}
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/Chart/api/zoom.js
var fy = function(e) {
	let t = this.internal, { axis: n, config: r, org: i, scale: a, state: o } = t, s;
	if (!n) return;
	let c = n.isCategorized();
	if (r.zoom_enabled) {
		if (s = e, Array.isArray(s)) {
			if (n.isTimeSeries() && (s = s.map((e) => Le.bind(t)(e))), t.withinRange(s, t.getZoomDomain("zoom", !0), t.getZoomDomain("zoom"))) {
				if (o.domain = s.slice(), s = t.getZoomDomainValue(s), t.api.tooltip.hide(), r.subchart_show) {
					if (o.isCanvasMode) t.setCanvasSubchartDomain?.(s, !0, !1);
					else {
						let e = a.zoom || a.x;
						t.brush.getSelection().call(t.brush.move, s.map(e));
					}
				} else {
					let e = c ? a.x.orgScale() : i.xScale || a.x;
					t.updateCurrentZoomTransform(e, s);
				}
				t.setZoomResetButton();
			}
		} else s = t.zoom.getDomain();
	}
	return o.domain ?? s;
};
F(fy, {
	enable(e) {
		let t = this.internal, { axis: n, config: r } = t;
		n ? (/^(drag|wheel)$/.test(e) && (r.zoom_type = e), r.zoom_enabled = !!e, t.zoom ? e === !1 && t.bindZoomEvent(!1) : t.initZoom(), e !== !1 && (r.zoom_type === "drag" && !t.zoomBehaviour && t.initZoomBehaviour?.(), t.bindZoomEvent()), t.updateAndRedraw()) : r.zoom_enabled = !1;
	},
	max(e) {
		let { config: t, org: { xDomain: n } } = this.internal;
		return (e === 0 || e) && (t.zoom_x_max = je("max", [n[1], e])), t.zoom_x_max;
	},
	min(e) {
		let { config: t, org: { xDomain: n } } = this.internal;
		return (e === 0 || e) && (t.zoom_x_min = je("min", [n[0], e])), t.zoom_x_min;
	},
	range(e) {
		let t = this.zoom;
		if (k(e)) {
			let { min: n, max: r } = e;
			y(n) && t.min(n), y(r) && t.max(r);
		}
		return {
			min: t.min(),
			max: t.max()
		};
	}
});
var py = {
	zoom: fy,
	unzoom() {
		let e = this.internal, { config: t, $el: { canvas: n, eventRect: r, zoomResetBtn: i }, scale: { zoom: a }, state: o } = e, s = o.isCanvasMode ? n : r;
		(a || o.isCanvasMode && t.subchart_show && o.domain) && (t.subchart_show ? o.isCanvasMode ? e.clearCanvasSubchartDomain?.(!0, !1) : e.brush.getSelection().call(e.brush.move, null) : e.zoom.updateTransformScale(ty), e.updateZoom(!0), i?.style("display", "none"), s?.node() && ny(s.node()) !== ty && e.zoom.transform(s, ty), o.domain = void 0);
	}
};
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/ChartInternal/interactions/zoom.js
function my(e) {
	return e.state.isCanvasMode ? e.$el.canvas : e.$el.eventRect;
}
function hy(e, t) {
	if (!e.state.isCanvasMode) return t;
	let { margin: n } = e.state;
	return ty.translate(t.x + (t.k - 1) * n.left, t.y + (t.k - 1) * n.top).scale(t.k);
}
function gy(e, t) {
	if (!e.state.isCanvasMode) return t;
	let { margin: n } = e.state;
	return ty.translate(t.x - (t.k - 1) * n.left, t.y - (t.k - 1) * n.top).scale(t.k);
}
function _y(e, t, n) {
	let r = ar(t, n);
	if (e.state.isCanvasMode) {
		let { margin: t } = e.state;
		r[0] -= t.left, r[1] -= t.top;
	}
	return r;
}
var vy = {
	initZoom() {
		let e = this;
		e.scale.zoom = null, e.generateZoom(), e.config.zoom_type === "drag" && e.initZoomBehaviour();
	},
	bindZoomEvent(e = !0) {
		let t = this, { config: n } = t;
		n.zoom_enabled && e ? !n.subchart_show && t.bindZoomOnEventRect() : e === !1 && (t.api.unzoom(), t.unbindZoomEvent());
	},
	generateZoom() {
		let e = this, { config: t, org: n, scale: r } = e, i = dy().duration(0).on("start", e.onZoomStart.bind(e)).on("zoom", e.onZoom.bind(e)).on("end", e.onZoomEnd.bind(e));
		i.orgScaleExtent = () => {
			let n = t.zoom_extent || [1, 10];
			return [n[0], Math.max(e.getMaxDataCount() / n[1], n[1])];
		}, i.updateScaleExtent = function() {
			let t = C(e.scale.x.orgDomain()) / C(e.getZoomDomain()), n = this.orgScaleExtent();
			return this.scaleExtent([n[0] * t, n[1] * t]), this;
		}, i.updateTransformScale = (i, a) => {
			let o = t.axis_rotated, s = hy(e, i);
			n.xScale?.range(r.x.range());
			let c = s[o ? "rescaleY" : "rescaleX"](n.xScale || r.x);
			if (c.domain().some((e) => /(Invalid Date|NaN)/.test(e.toString()))) return;
			let l = e.trimXDomain(c.domain()), u = t.zoom_rescale;
			if (c.domain(l, n.xDomain), a) {
				let t = c(r.x.domain()[0]), n = gy(e, ty.translate(o ? s.x : t, o ? t : s.y).scale(i.k));
				my(e)?.property("__zoom", n);
			}
			r.zoom = e.getCustomizedXScale(c), e.axis.x.scale(r.zoom), u ? (!n.xScale && (n.xScale = r.x.copy()), r.x.domain(l)) : n.xScale &&= (r.x.domain(n.xScale.domain()), null);
		}, i.getDomain = () => {
			let t = r[r.zoom ? "zoom" : "subX"].domain();
			return e.axis.isCategorized() && (t[1] -= 2), t;
		}, e.zoom = i;
	},
	onZoomStart(e) {
		let t = this, { sourceEvent: n } = e;
		n && (t.zoom.startEvent = n, t.state.zooming = !0, P(t.config.zoom_onzoomstart, t.api, e));
	},
	onZoom(e) {
		let t = this, { config: n, scale: r, state: i, org: a } = t, { sourceEvent: o } = e, s = e?.transform === ty;
		if (!n.zoom_enabled || t.filterTargetsToShow(t.data.targets).length === 0 || !r.zoom && o?.type.indexOf("touch") > -1 && o?.touches.length === 1) return;
		e.sourceEvent && (i.zooming = !0, i.domain = void 0);
		let c = o?.type === "mousemove", l = o?.wheelDelta < 0, { transform: u } = e;
		!c && l && r.x.domain().every((e, t) => e !== a.xDomain[t]) && r.x.domain(a.xDomain), t.zoom.updateTransformScale(u, n.zoom_type === "wheel" && o);
		let d = n.transition_duration > 0 && !n.subchart_show && (i.dragging || s || !e.sourceEvent), f = o && c && n.zoom_type !== "wheel", p = () => {
			t.config && (t.redraw({
				withTransition: d,
				withY: n.zoom_rescale,
				withSubchart: !1,
				withEventRect: !1,
				withDimension: !1
			}), t.state.cancelClick = c, !s && P(n.zoom_onzoom, t.api, t.state.domain ?? t.zoom.getDomain()));
		};
		f ? _r(t.state, p) : p();
	},
	onZoomEnd(e) {
		let t = this, { config: n, state: r } = t, i = t.zoom;
		if (!i) return;
		let { startEvent: a } = i, o = e?.sourceEvent, s = e?.transform === ty;
		a?.type.indexOf("touch") > -1 && (a = a.changedTouches[0], o = o?.changedTouches?.[0]), !(n.zoom_type === "drag" && o && a.clientX === o.clientX && a.clientY === o.clientY) && (r.zooming = !1, !r.isCanvasMode && t.redrawEventRect(), t.updateZoom(), !s && (o || r.dragging) && P(n.zoom_onzoomend, t.api, t.state.domain ?? t.zoom.getDomain()));
	},
	updateZoom(e) {
		let t = this, { subX: n, x: r, zoom: i } = t.scale;
		if (i) {
			let a = i.domain(), o = n.domain(), s = .015, c = t.config.axis_x_inverted ? (a[0] >= o[0] || a[0] + s >= o[0]) && (o[1] >= a[1] || o[1] >= a[1] + s) : (a[0] <= o[0] || a[0] - s <= o[0]) && (o[1] <= a[1] || o[1] <= a[1] - s);
			(e || c) && (t.axis.x.scale(n), r.domain(n.orgDomain()), t.scale.zoom = null);
		}
	},
	updateCurrentZoomTransform(e, t) {
		let n = this, { config: r } = n, i = r.axis_rotated, a = [-e(t[0]), 0], o = ty.scale(e.range()[1] / (e(t[1]) - e(t[0]))).translate(...i ? a.reverse() : a);
		my(n)?.call(n.zoom.transform, gy(n, o));
	},
	bindZoomOnEventRect() {
		let e = this, { config: t, $el: { svg: n } } = e, r = my(e), i = t.zoom_type === "drag" ? e.zoomBehaviour : e.zoom;
		e.state.isCanvasMode && i?.touchable?.(() => t.interaction_inputType_touch !== !1), !e.state.isCanvasMode && c.GestureEvent && /^((?!chrome|android|mobile).)*safari/i.test(c.navigator?.userAgent) && n.on("wheel", () => {}), r?.call(i).on("dblclick.zoom", null);
	},
	initZoomBehaviour() {
		let e = this, { config: t, state: n } = e, r = t.axis_rotated, i = 0, a = 0, o, s, c = {
			axis: r ? "y" : "x",
			attr: r ? "height" : "width",
			index: +!!r
		}, l = (e) => {
			let [t, i] = s ?? [0, r ? n.height : n.width];
			return Math.min(Math.max(e, t), i);
		};
		e.zoomBehaviour = ca().touchable(() => !n.isCanvasMode || t.interaction_inputType_touch !== !1).clickDistance(4).on("start", function(t) {
			s = e.scale.zoom ? null : e.axis.getExtent(), n.event = t, e.setDragStatus(!0), e.unselectRect(), !n.isCanvasMode && !o && (o = e.$el.main.append("rect").attr("clip-path", n.clip.path).attr("class", Fr.zoomBrush).attr("width", r ? n.width : 0).attr("height", r ? 0 : n.height)), o?.attr(r ? "width" : "height", r ? n.width : n.height), i = l(_y(e, t, this)[c.index]), a = i, n.isCanvasMode ? e.renderCanvasZoomBrush?.(i, a) : o.attr(c.axis, i).attr(c.attr, 0), e.onZoomStart(t);
		}).on("drag", function(t) {
			a = l(_y(e, t, this)[c.index]), n.isCanvasMode ? e.renderCanvasZoomBrush?.(i, a) : o.attr(c.axis, Math.min(i, a)).attr(c.attr, Math.abs(a - i));
		}).on("end", (t) => {
			let r = e.scale.zoom || e.scale.x;
			n.event = t, a = l(a), n.isCanvasMode ? e.clearCanvasZoomBrush?.() : o.attr(c.axis, 0).attr(c.attr, 0), i > a && ([i, a] = [a, i]), i < 0 && (a += Math.abs(i), i = 0), i !== a && e.api.zoom([i, a].map((e) => r.invert(e))), e.setDragStatus(!1);
		});
	},
	setZoomResetButton() {
		let e = this, { config: t, $el: n } = e, r = t.zoom_resetButton;
		r && t.zoom_type === "drag" && (n.zoomResetBtn ? n.zoomResetBtn.style("display", null) : n.zoomResetBtn = e.$el.chart.append("div").classed(z.button, !0).append("span").on("click", function() {
			h(r.onclick) && r.onclick.bind(e.api)(this), e.api.unzoom();
		}).classed(Fr.buttonZoomReset, !0).text(r.text || "Reset Zoom"));
	},
	getZoomTransform() {
		let e = this, t = my(e)?.node();
		return t ? hy(e, ny(t)) : { k: 1 };
	}
}, yy = {
	zoom_enabled: !1,
	zoom_type: "wheel",
	zoom_extent: void 0,
	zoom_rescale: !1,
	zoom_onzoom: void 0,
	zoom_onzoomstart: void 0,
	zoom_onzoomend: void 0,
	zoom_resetButton: !0,
	zoom_x_min: void 0,
	zoom_x_max: void 0
}, by = () => (F(Um.prototype, vy), F(th.prototype, py), Wr.setOptions([yy]), (by = () => !0)()), xy = {
	category(e, t) {
		let n = this.internal, { config: r } = n;
		return arguments.length > 1 && (r.axis_x_categories[e] = t, n.state.dirty.data = !0, n.redraw()), r.axis_x_categories[e];
	},
	categories(e) {
		let t = this.internal, { config: n } = t;
		if (!e || !Array.isArray(e)) {
			let e = n.axis_x_categories;
			return E(e) ? Object.values(t.data.xs)[0] : e;
		}
		return n.axis_x_categories = e, t.state.dirty.data = !0, t.redraw(), n.axis_x_categories;
	}
}, Sy = () => (th.prototype.category = xy.category, th.prototype.categories = xy.categories, (Sy = () => ({}))()), Cy = (e) => c.btoa?.(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, (e, t) => String.fromCharCode(Number(`0x${t}`))));
function wy(e, t, n) {
	let { width: r, height: i } = t || n, a = new XMLSerializer(), o = e.cloneNode(!0), s = cr(Te(l.styleSheets)).filter((e) => e.cssText).map((e) => e.cssText);
	o.setAttribute("xmlns", Xe.xhtml), o.style.margin = "0", o.style.padding = "0", t.preserveFontStyle && o.querySelectorAll("text").forEach((e) => {
		e.innerHTML = "";
	});
	let c = a.serializeToString(o), u = l.createElement("style");
	u.appendChild(l.createTextNode(s.join("\n")));
	let d = a.serializeToString(u);
	return `data:image/svg+xml;base64,${Cy(`<svg xmlns="${Xe.svg}" width="${r}" height="${i}" 
		viewBox="0 0 ${n.width} ${n.height}" 
		preserveAspectRatio="${t?.preserveAspectRatio === !1 ? "none" : "xMinYMid meet"}">
			<foreignObject width="100%" height="100%">
				${d}
				${c.replace(/(url\()[^#]+/g, "$1")}
			</foreignObject></svg>`)}`;
}
function Ty(e, t) {
	let { top: n, left: r } = t, { x: i, y: a } = or(e, !0), { a: o, b: s, c, d: l, e: u, f: d } = e.getScreenCTM(), { width: f, height: p } = R(e, !0);
	return {
		x: o * i + c * a + u - r,
		y: s * i + l * a + d - n + (p - Math.round(p / 4)),
		width: f,
		height: p
	};
}
function Ey(e) {
	let { left: t, top: n } = R(e), r = (e) => e.textContent || e.childElementCount, i = [];
	return Te(e.querySelectorAll("text")).filter(r).forEach((e) => {
		let a = (e) => {
			let { fill: r, fontFamily: i, fontSize: a, textAnchor: o, transform: s } = c.getComputedStyle(e), { x: l, y: u, width: d, height: f } = Ty(e, {
				left: t,
				top: n
			});
			return { [e.textContent]: {
				x: l,
				y: u,
				width: d,
				height: f,
				fill: r,
				fontFamily: i,
				fontSize: a,
				textAnchor: o,
				transform: s
			} };
		};
		e.childElementCount > 1 ? Te(e.querySelectorAll("tspan")).filter(r).forEach((e) => {
			i.push(a(e));
		}) : i.push(a(e));
	}), i;
}
function Dy(e, t) {
	t.forEach((t) => {
		Object.keys(t).forEach((n) => {
			let { x: r, y: i, width: a, height: o, fill: s, fontFamily: c, fontSize: l, transform: u } = t[n];
			if (e.save(), e.font = `${l} ${c}`, e.fillStyle = s, u === "none") e.fillText(n, r, i);
			else {
				let t = u.replace(/(matrix|\(|\))/g, "").split(",");
				t.splice(4).every((e) => +e == 0) ? (t.push(r + a - a / 4), t.push(i - o + o / 3)) : (t.push(r), t.push(i)), e.transform(...t), e.fillText(n, 0, 0);
			}
			e.restore();
		});
	});
}
function Oy(e, t, n) {
	let { width: r, height: i } = t || n, a = l.createElement("canvas"), o = a.getContext("2d");
	if (a.width = r, a.height = i, o) {
		let a = 0, s = r, c = i;
		if (t?.preserveAspectRatio !== !1) {
			let e = Math.min(r / n.width, i / n.height);
			s = n.width * e, c = n.height * e, a = (i - c) / 2;
		}
		o.drawImage(e, 0, 0, e.width, e.height, 0, a, s, c);
	}
	return a.toDataURL(t.mimeType);
}
var ky = { export(e, t) {
	let n = this.internal, { state: r, $el: { chart: i, svg: a } } = n, o = n.canvasEngine?.canvas, s = r.isCanvasMode && o ? R(o, !0) : null, { width: c, height: u } = s && s.width && s.height ? {
		width: s.width,
		height: s.height
	} : r.current, d = ke(Object.create(null), {
		width: c,
		height: u,
		preserveAspectRatio: !0,
		preserveFontStyle: !1,
		mimeType: "image/png"
	}, e);
	if (r.isCanvasMode && o) {
		let e = Oy(o, d, {
			width: c,
			height: u
		});
		return t?.bind(this)(e), e;
	}
	let f = wy(i.node(), d, {
		width: c,
		height: u
	}), p = d.preserveFontStyle ? Ey(a.node()) : [];
	if (t && h(t)) {
		let e = new Image();
		e.crossOrigin = "Anonymous", e.onload = () => {
			let n = l.createElement("canvas"), r = n.getContext("2d");
			n.width = d.width || c, n.height = d.height || u, r.drawImage(e, 0, 0), p.length &&= (Dy(r, p), 0), t.bind(this)(n.toDataURL(d.mimeType));
		}, e.src = f;
	}
	return f;
} }, Ay = () => (th.prototype.export = ky.export, (Ay = () => ({}))()), jy = { flow(e) {
	let t = this.internal, n;
	(e.json || e.rows || e.columns) && t.convertData(e, (e) => {
		n = e, r();
	});
	function r() {
		let r, i = 0, a = 0, o, s;
		if (t.state.redrawing || !n || !hr()) return;
		t.flushCanvasFlow?.();
		let c = [], l = t.getMaxDataCount(), u = t.convertDataToTargets(n, !0), d = t.axis.isTimeSeries();
		t.data.targets.forEach((e) => {
			let t = !1;
			for (let n = 0; n < u.length; n++) if (e.id === u[n].id) {
				t = !0, e.values[e.values.length - 1] && (a = e.values[e.values.length - 1].index + 1);
				let r = u[n].values;
				i = r.length;
				for (let t = 0; t < i; t++) r[t].index = a + t, d || (r[t].x = a + t), e.values.push(r[t]);
				u.splice(n, 1);
				break;
			}
			!t && c.push(e.id);
		}), t.data.targets.forEach((e) => {
			for (let n = 0; n < c.length; n++) if (e.id === c[n]) {
				if (!e.values[e.values.length - 1]) continue;
				a = e.values[e.values.length - 1].index + 1;
				for (let n = 0; n < i; n++) e.values.push({
					id: e.id,
					index: a + n,
					x: d ? t.getOtherTargetX(a + n) : a + n,
					value: null
				});
			}
		}), t.data.targets.length && u.forEach((e) => {
			let n = t.data.targets[0].values[0].index, r = e.values, i = r.length, o = Math.max(a - n, 0);
			if (o) {
				r.length = i + o;
				for (let e = i - 1; e >= 0; e--) r[e + o] = r[e];
				for (let i = 0; i < o; i++) {
					let a = n + i;
					r[i] = {
						id: e.id,
						index: a,
						x: d ? t.getOtherTargetX(a) : a,
						value: null
					};
				}
			}
			for (let e = o; e < r.length; e++) {
				let t = r[e];
				t.index += a, d || (t.x += a);
			}
		});
		for (let e = 0; e < u.length; e++) t.data.targets.push(u[e]);
		let f = t.data.targets[0], p = f.values[0];
		if (y(e.to) ? (i = 0, s = d ? Le.call(t, e.to) : e.to, f.values.forEach((e) => {
			e.x < s && i++;
		})) : y(e.length) && (i = e.length), l ? l === 1 && d && (o = (f.values[f.values.length - 1].x - p.x) / 2, r = [/* @__PURE__ */ new Date(+p.x - o), new Date(+p.x + o)]) : (o = d ? f.values.length > 1 ? f.values[f.values.length - 1].x - p.x : p.x - t.getXDomain(t.data.targets)[0] : 1, r = [p.x - o, p.x]), r && t.updateXDomain(null, !0, !0, !1, r), t.state.isCanvasMode) {
			let n = m(e.duration) ? e.duration : t.config.transition_duration;
			if (t.animateCanvasFlow?.({
				done: e.done,
				duration: n,
				length: i,
				orgDataCount: l
			})) return;
			i && l && t.data.targets.forEach((e) => {
				e.values.splice(0, i);
			}), t.state.dirty.data = !0, t.state._eventRectFingerprint = null, t.redraw({
				withLegend: !0,
				withTransition: !1,
				withTrimXDomain: !1,
				withUpdateOrgXDomain: !0,
				withUpdateXAxis: !0,
				withUpdateXDomain: !0
			}), t.updateTypesElements(), e.done?.call(t.api);
		} else t.updateTargets(t.data.targets), t.state.dirty.data = !0, t.state._eventRectFingerprint = null, t.redraw({
			flow: {
				index: p.index,
				length: i,
				duration: m(e.duration) ? e.duration : t.config.transition_duration,
				done: e.done,
				orgDataCount: l
			},
			withLegend: !0,
			withTransition: l > 1,
			withTrimXDomain: !1,
			withUpdateXAxis: !0
		});
	}
} }, My = {
	generateFlow(e) {
		let t = this, { data: n, state: r, $el: i } = t;
		return function() {
			let a = e.flow.length;
			r.flowing = !0, n.targets.forEach((e) => {
				e.values.splice(0, a);
			}), r.dataGeneration++, t.updateXGrid && t.updateXGrid(!0);
			let o = {};
			[
				"axis.x",
				"grid.x",
				"gridLines.x",
				"region.list",
				"text",
				"bar",
				"line",
				"area",
				"circle"
			].forEach((e) => {
				let t = e.split("."), n = i[t[0]];
				n && t.length > 1 && (n = n[t[1]]), n?.size() && (o[e] = n);
			}), t.hideGridFocus?.(), t.setFlowList(o, e);
		};
	},
	setFlowList(e, t) {
		let n = this, { flow: r, targets: i } = t, { duration: a = t.duration, index: o, length: s, orgDataCount: c } = r, l = n.getFlowTransform(i, c, o, s), u = Zr(), d;
		u.add(Object.keys(e).map((t) => (d = e[t].transition().ease((e) => +e).duration(a), d = t === "axis.x" ? d.call((e) => {
			n.axis.x.setTransition(e).create(e);
		}) : t === "region.list" ? d.filter(n.isRegionOnX).attr("transform", l) : d.attr("transform", l), d))), d.call(u, () => {
			n.cleanUpFlow(e, t);
		});
	},
	cleanUpFlow(e, t) {
		let n = this, { config: r, state: i, $el: { svg: a } } = n, o = r.axis_rotated, { flow: s, shape: c, xv: l } = t, { cx: u, cy: d, xForText: f, yForText: p } = c.pos, { done: m = () => {}, length: h } = s;
		h && ([
			"circle",
			"text",
			"shape",
			"eventRect"
		].forEach((e) => {
			let t = [];
			for (let n = 0; n < h; n++) t.push(`.${J[e]}-${n}`);
			a.selectAll(`.${J[`${e}s`]}`).selectAll(t).remove();
		}), a.select(`.${J.xgrid}`).remove()), Object.keys(e).forEach((t) => {
			let a = e[t];
			t !== "axis.x" && a.attr("transform", null), t === "grid.x" ? a.attr(i.xgridAttr) : t === "gridLines.x" ? (a.attr("x1", o ? 0 : l).attr("x2", o ? i.width : l), a.select("text").attr("x", o ? i.width : 0).attr("y", l)) : /^(area|bar|line)$/.test(t) ? a.attr("d", c.type[t]) : t === "text" ? a.attr("x", f).attr("y", p).style("fill-opacity", n.opacityForText.bind(n)) : t === "circle" ? n.isCirclePoint() ? a.attr("cx", u).attr("cy", d) : a.attr("x", (e) => u(e) - r.point_r).attr("y", (e) => d(e) - r.point_r) : t === "region.list" && a.select("rect").filter(n.isRegionOnX).attr("x", n.regionX.bind(n)).attr("width", n.regionWidth.bind(n));
		}), r.interaction_enabled && n.redrawEventRect(), m.call(n.api), i.flowing = !1;
	},
	getFlowTransform(e, t, n, r) {
		let i = this, { data: a, scale: { x: o } } = i, s = a.targets[0].values, c = i.getValueOnIndex(s, n), l = i.getValueOnIndex(s, n + r), u, d = o.domain(), f = i.updateXDomain(e, !0, !0);
		t ? u = t === 1 || c?.x === l?.x || i.axis.isTimeSeries() ? o(d[0]) - o(f[0]) : o(c?.x || 0) - o(l.x) : s.length === 1 ? i.axis.isTimeSeries() ? (c = i.getValueOnIndex(s, 0), l = i.getValueOnIndex(s, s.length - 1), u = o(c.x) - o(l.x)) : u = C(f) / 2 : u = o(d[0]) - o(f[0]);
		let p = C(d) / C(f);
		return `translate(${u},0) scale(${p},1)`;
	}
}, Ny = () => (F(Um.prototype, My), th.prototype.flow = jy.flow, (Ny = () => ({}))());
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/Chart/api/grid.js
function Py(e) {
	return Array.isArray(e) ? e : [e];
}
function Fy(e) {
	e.state.canvasShape = null, e.renderCanvasFrame?.(void 0, null, !1);
}
function Iy(e, t) {
	let n = this.internal, { config: r } = n, i = r.transition_duration && hr(), a = `grid_${t}_lines`;
	return e ? (r[a] = Py(e), n.state.isCanvasMode ? (Fy(n), r[a]) : (n.updateGrid(), n.redrawGrid(i), r[a])) : r[a];
}
function Ly(e, t) {
	let n = `grid_${t}_lines`;
	return Iy.bind(this)(this.internal.config[n].concat(e ? Py(e) : []), t);
}
function Ry(e, t) {
	let n = this.internal;
	if (n.state.isCanvasMode) {
		let r = n.getGridFilterToRemove?.(e) || (() => !0), i = `grid_${t ? "x" : "y"}_lines`;
		n.config[i] = n.config[i].filter((e) => !r(e)), Fy(n);
	} else n.removeGridLines(e, t);
}
var zy = function(e) {
	return Iy.bind(this)(e, "x");
};
F(zy, {
	add(e) {
		return Ly.bind(this)(e, "x");
	},
	remove(e) {
		return Ry.bind(this)(e, !0);
	}
});
var By = function(e) {
	return Iy.bind(this)(e, "y");
};
F(By, {
	add(e) {
		return Ly.bind(this)(e, "y");
	},
	remove(e) {
		return Ry.bind(this)(e, !1);
	}
});
var Vy = {
	xgrids: zy,
	ygrids: By
}, Hy = `line.${U.xgridFocus}:not(.${U.xgridFocusContinuous}), line.${U.ygridFocus}`, Uy = (e) => m(e.position) || "end", Wy = (e) => e.position === "start" ? 4 : e.position === "middle" ? 0 : -4;
function Gy(e) {
	let { state: t, $el: { main: n } } = e, r = t._gridFocusEl, i = n.node(), a = r?.nodes?.() || [];
	return a.length && a.every((e) => i?.contains(e)) ? r : t._gridFocusEl = n.selectAll(Hy);
}
function Ky(e) {
	e.$el.main.select(`line.${U.xgridFocusContinuous}`).style("visibility", "hidden");
}
function qy(e, t, n) {
	return (r) => {
		let i = e ? 0 : t;
		return r.position === "start" ? i = e ? -n : 0 : r.position === "middle" && (i = (e ? -n : t) / 2), i;
	};
}
function Jy(e, t) {
	t === "grid" && e.each(function() {
		let e = L(this);
		[
			"x1",
			"x2",
			"y1",
			"y2"
		].forEach((t) => e.attr(t, +e.attr(t)));
	});
}
var Yy = {
	hasGrid() {
		let { config: e } = this;
		return ["x", "y"].some((t) => e[`grid_${t}_show`] || e[`grid_${t}_lines`].length);
	},
	initGrid() {
		let e = this;
		e.hasGrid() && e.initGridLines(), e.initFocusGrid();
	},
	initGridLines() {
		let { config: e, state: { clip: t }, $el: n } = this;
		(e.grid_x_lines.length || e.grid_y_lines.length) && (n.gridLines.main = n.main.insert("g", `.${z.chart}${e.grid_lines_front ? " + *" : ""}`).attr("clip-path", t.pathGrid).attr("class", `${W.grid} ${W.gridLines}`), n.gridLines.main.append("g").attr("class", W.xgridLines), n.gridLines.main.append("g").attr("class", W.ygridLines), n.gridLines.x = Zn([]));
	},
	updateXGrid(e) {
		let t = this, { config: n, scale: r, state: i, $el: { main: a, grid: o } } = t, s = n.axis_rotated, c = t.generateGridData(n.grid_x_type, r.x), l = t.axis.isCategorized() ? t.axis.x.tickOffset() : 0, u = (e) => (r.zoom || r.x)(e) + l * (s ? -1 : 1);
		i.xgridAttr = s ? {
			x1: 0,
			x2: i.width,
			y1: u,
			y2: u
		} : {
			x1: u,
			x2: u,
			y1: 0,
			y2: i.height
		}, o.x = a.select(`.${W.xgrids}`).selectAll(`.${W.xgrid}`).data(c), o.x.exit().remove(), o.x = o.x.enter().append("line").attr("class", W.xgrid).merge(o.x), e || o.x.each(function() {
			let e = L(this);
			Object.keys(i.xgridAttr).forEach((t) => {
				e.attr(t, i.xgridAttr[t]);
			}), e.style("opacity", () => +e.attr(s ? "y1" : "x1") === (s ? i.height : 0) ? "0" : null);
		});
	},
	updateYGrid() {
		let e = this, { axis: t, config: n, scale: r, state: i, $el: { grid: a, main: o } } = e, s = n.axis_rotated, c = (e) => r.y(e), l = t.y.getGeneratedTicks(n.grid_y_ticks), u = l?.length ? l : e.scale.y.ticks(n.grid_y_ticks);
		a.y = o.select(`.${W.ygrids}`).selectAll(`.${W.ygrid}`).data(u), a.y.exit().remove(), a.y = a.y.enter().append("line").attr("class", W.ygrid).merge(a.y), a.y.attr("x1", s ? c : 0).attr("x2", s ? c : i.width).attr("y1", s ? 0 : c).attr("y2", s ? i.height : c), Jy(a.y, "grid");
	},
	updateGrid() {
		let e = this, { $el: { grid: t, gridLines: n } } = e;
		!n.main && e.initGridLines(), t.main.style("visibility", e.hasArcType() ? "hidden" : null), e.hideGridFocus(), e.updateGridLines("x"), e.updateGridLines("y");
	},
	updateGridLines(e) {
		let t = this, { config: n, $el: { gridLines: r, main: i }, $T: a } = t, o = n.axis_rotated, s = e === "x";
		n[`grid_${e}_show`] && t[`update${e.toUpperCase()}Grid`]();
		let c = i.select(`.${W[`${e}gridLines`]}`).selectAll(`.${W[`${e}gridLine`]}`).data(n[`grid_${e}_lines`]);
		a(c.exit()).style("opacity", "0").remove();
		let l = c.enter().append("g");
		l.append("line").style("opacity", "0"), c = l.merge(c), c.each(function(e) {
			let t = L(this);
			t.select("text").empty() && e.text && t.append("text").style("opacity", "0");
		}), a(c.attr("class", (t) => `${W[`${e}gridLine`]} ${t.class || ""}`.trim()).select("text").attr("text-anchor", Uy).attr("transform", () => s ? o ? null : "rotate(-90)" : o ? "rotate(-90)" : null).attr("dx", Wy).attr("dy", -5)).text(function(e) {
			return e.text ?? this.remove();
		}), r[e] = c;
	},
	redrawGrid(e) {
		let t = this, { config: { axis_rotated: n }, state: { width: r, height: i }, $el: { gridLines: a }, $T: o } = t, s = t.xv.bind(t), c = t.yv.bind(t), l = a.x.select("line"), u = a.x.select("text"), d = a.y.select("line"), f = a.y.select("text");
		return l = o(l, e).attr("x1", n ? 0 : s).attr("x2", n ? r : s).attr("y1", n ? s : 0).attr("y2", n ? s : i), u = o(u, e).attr("x", qy(!n, r, i)).attr("y", s), d = o(d, e).attr("x1", n ? c : 0).attr("x2", n ? c : r).attr("y1", n ? 0 : c).attr("y2", n ? i : c), f = o(f, e).attr("x", qy(n, r, i)).attr("y", c), [
			l.style("opacity", null),
			u.style("opacity", null),
			d.style("opacity", null),
			f.style("opacity", null)
		];
	},
	initFocusGrid() {
		let { config: e, state: t, state: { clip: n }, $el: r } = this;
		t._gridFocusEl = null;
		let i = e.grid_front, a = `.${i && r.gridLines.main ? W.gridLines : z.chart}${i ? " + *" : ""}`, o = r.main.insert("g", a).attr("clip-path", n.pathGrid).attr("class", W.grid);
		if (r.grid.main = o, e.grid_x_show && o.append("g").attr("class", W.xgrids), e.grid_y_show && o.append("g").attr("class", W.ygrids), e.axis_tooltip) {
			let e = o.append("g").attr("class", "bb-axis-tooltip");
			e.append("line").attr("class", "bb-axis-tooltip-x"), e.append("line").attr("class", "bb-axis-tooltip-y");
		}
		e.interaction_enabled && e.grid_focus_show && !e.axis_tooltip && (o.append("g").attr("class", U.xgridFocus).append("line").attr("class", U.xgridFocus), e.grid_focus_y && !e.tooltip_grouped && o.append("g").attr("class", U.ygridFocus).append("line").attr("class", U.ygridFocus), e.subchart_grid_focus_continuous && e.subchart_grid_focus !== !1 && r.main.insert("g", a).attr("class", U.xgridFocusContinuous).append("line").attr("class", `${U.xgridFocus} ${U.xgridFocusContinuous}`).style("visibility", "hidden"));
	},
	showAxisGridFocus() {
		let e = this, { config: t, format: n, state: { event: r, width: i, height: a } } = e, o = t.axis_rotated, [s, c] = ar(r, e.$el.eventRect?.node()), l = {
			x: s,
			y: c
		};
		for (let [t, r] of Object.entries(e.$el.axisTooltip)) {
			let i = t === "x" && !o || t !== "x" && o ? "x" : "y", a = l[i], s = e.scale[t]?.invert(a);
			s && (s = t === "x" && e.axis.isTimeSeries() ? n.xAxisTick(s) : s?.toFixed(2), r?.attr(i, a).text(s));
		}
		e.$el.main.selectAll("line.bb-axis-tooltip-x, line.bb-axis-tooltip-y").style("visibility", null).each(function(e, t) {
			let n = L(this);
			t === 0 ? n.attr("x1", s).attr("x2", s).attr("y1", t ? 0 : a).attr("y2", t ? a : 0) : n.attr("x1", t ? 0 : i).attr("x2", t ? i : 0).attr("y1", c).attr("y2", c);
		});
	},
	hideAxisGridFocus() {
		let e = this;
		e.$el.main.selectAll(`line.${V.axisTooltipX}, line.${V.axisTooltipY}`).style("visibility", "hidden"), Object.values(e.$el.axisTooltip).forEach((e) => e?.style("display", "none"));
	},
	showGridFocus(e) {
		let t = this, { config: n, state: { width: r, height: i } } = t, a = n.axis_rotated, o = Gy(t), s = (e || [o.datum()]).filter((e) => e && m(t.getBaseValue(e)));
		if (!n.tooltip_show || s.length === 0 || !n.axis_x_forceAsSingle && t.hasType("bubble") || t.hasArcType()) return;
		let c = n.grid_focus_edge && !n.tooltip_grouped, l = t.xx.bind(t);
		o.style("visibility", null).data(s.concat(s)).each(function(e) {
			let n = L(this), o = {
				x: l(e),
				y: t.getYScaleById(e.id)(e.value)
			}, s;
			if (n.classed(U.xgridFocus)) s = a ? [
				null,
				o.x,
				c ? o.y : r,
				o.x
			] : [
				o.x,
				c ? o.y : null,
				o.x,
				i
			];
			else {
				let n = t.axis.getId(e.id) === "y2";
				s = a ? [
					o.y,
					c && !n ? o.x : null,
					o.y,
					c && n ? o.x : i
				] : [
					c && n ? o.x : null,
					o.y,
					c && !n ? o.x : r,
					o.y
				];
			}
			[
				"x1",
				"y1",
				"x2",
				"y2"
			].forEach((e, t) => n.attr(e, s[t]));
		}), Jy(o, "grid"), t.showCircleFocus?.(e);
	},
	hideGridFocus(e = !1) {
		let t = this, { state: { inputType: n, resizing: r } } = t;
		(e || n === "mouse" || !r) && (Gy(t).style("visibility", "hidden"), Ky(t), t.hideCircleFocus?.());
	},
	updateGridFocus() {
		let e = this, { state: { inputType: t, width: n, height: r, resizing: i }, $el: { grid: a } } = e, o = a.main.select(`line.${U.xgridFocus}`);
		if (t === "touch") o.empty() ? i && e.showCircleFocus?.() : e.showGridFocus();
		else {
			let t = e.config.axis_rotated;
			o.attr("x1", t ? 0 : -10).attr("x2", t ? n : -10).attr("y1", t ? -10 : 0).attr("y2", t ? -10 : r), Ky(e);
		}
		return !0;
	},
	generateGridData(e, t) {
		let n = this, r = n.$el.main.select(`.${V.axisX}`).selectAll(".tick").size(), i = [];
		if (e === "year") {
			let [e, t] = n.getXDomain(n.data.targets).map((e) => e.getFullYear());
			for (let n = e; n <= t; n++) i.push(/* @__PURE__ */ new Date(`${n}-01-01 00:00:00`));
		} else i = t.ticks(10), i.length > r && (i = i.filter((e) => String(e).indexOf(".") < 0));
		return i;
	},
	getGridFilterToRemove(e) {
		return e ? (t) => {
			let n = !1;
			return (O(e) ? e.concat() : [e]).forEach((e) => {
				("value" in e && t.value === e.value || "class" in e && t.class === e.class) && (n = !0);
			}), n;
		} : () => !0;
	},
	removeGridLines(e, t) {
		let n = this, { config: r, $T: i } = n, a = n.getGridFilterToRemove(e), o = (e) => !a(e), s = t ? W.xgridLines : W.ygridLines, c = t ? W.xgridLine : W.ygridLine;
		i(n.$el.main.select(`.${s}`).selectAll(`.${c}`).filter(a)).style("opacity", "0").remove();
		let l = `grid_${t ? "x" : "y"}_lines`;
		r[l] = r[l].filter(o);
	}
}, Xy = {
	grid_x_show: !1,
	grid_x_type: "tick",
	grid_x_lines: [],
	grid_y_show: !1,
	grid_y_lines: [],
	grid_y_ticks: void 0,
	grid_focus_edge: !1,
	grid_focus_show: !0,
	grid_focus_y: !1,
	grid_front: !1,
	grid_lines_front: !0
}, Zy = () => (F(Um.prototype, Yy), th.prototype.xgrids = Vy.xgrids, th.prototype.ygrids = Vy.ygrids, Wr.setOptions([Xy]), (Zy = () => ({}))());
// node_modules/.pnpm/billboard.js@4.1.3/node_modules/billboard.js/dist-esm/Chart/api/regions.js
function Qy(e) {
	e.state.canvasShape = null, e.renderCanvasFrame?.(void 0, null, !1);
}
function $y(e, t = !1) {
	let n = this.internal, { config: r } = n, i = r.transition_duration && hr();
	return e ? (r.regions = t ? r.regions.concat(e) : e, n.state.isCanvasMode ? (Qy(n), r.regions) : (n.updateRegion(), n.redrawRegion(i), r.regions)) : r.regions;
}
var eb = function(e) {
	return $y.bind(this)(e);
};
F(eb, {
	add: function(e) {
		return $y.bind(this)(e, !0);
	},
	remove: function(e) {
		let t = this.internal, { config: n, $T: r } = t, i = e || {}, a = be(i, "classes", [jr.region]), o = n.regions;
		return t.state.isCanvasMode ? (Object.keys(i).length ? (o = o.filter((e) => {
			let t = !1;
			return !e.class || (e.class.split(" ").forEach((e) => {
				a.indexOf(e) >= 0 && (t = !0);
			}), !t);
		}), n.regions = o) : n.regions = [], Qy(t), n.regions) : (r(t.$el.main.select(`.${jr.regions}`).selectAll(a.map((e) => `.${e}`))).style("opacity", "0").remove(), Object.keys(i).length ? (o = o.filter((e) => {
			let t = !1;
			return !e.class || (e.class.split(" ").forEach((e) => {
				a.indexOf(e) >= 0 && (t = !0);
			}), !t);
		}), n.regions = o) : n.regions = [], o);
	}
});
var tb = { regions: eb }, nb = {
	initRegion() {
		let e = this, { $el: t } = e;
		t.region.main = t.main.insert("g", ":first-child").attr("clip-path", e.state.clip.path).attr("class", jr.regions);
	},
	updateRegion() {
		let e = this, { config: t, $el: { region: n }, $T: r } = e;
		n.main || e.initRegion(), n.main.style("visibility", e.hasArcType() ? "hidden" : null);
		let i = n.main.selectAll(`.${jr.region}`).data(t.regions);
		r(i.exit()).style("opacity", "0").remove();
		let a = i.enter().append("g");
		a.append("rect").style("fill-opacity", "0"), n.list = a.merge(i).attr("class", e.classRegion.bind(e)), n.list.each(function(e) {
			L(this).select("text").empty() && e.label?.text && L(this).append("text").style("opacity", "0");
		});
	},
	redrawRegion(e) {
		let t = this, { $el: { region: n }, $T: r } = t, i = t.regionX.bind(t), a = t.regionY.bind(t), o = ["width", "height"], s = n.list.select("rect"), c = n.list.selectAll("text");
		return s = r(s, e).attr("x", i).attr("y", a).attr("width", t.regionWidth.bind(t)).attr("height", t.regionHeight.bind(t)), c = r(c, e).text((e) => e.label?.text).attr("transform", ({ label: e }) => e.rotated ? " rotate(-90)" : null).attr("transform", function(e) {
			let { x: t = 0, y: n = 0, center: r = !1, rotated: s = !1 } = e.label ?? {}, c = this.previousElementSibling, l = {
				x: 0,
				y: 0
			};
			return g(r) && ["x", "y"].forEach((e, t) => {
				r.indexOf(e) > -1 && (l[e] = (+c.getAttribute(o[t]) - R(this)[o[t]]) / 2);
			}), `translate(${i(e) + l.x + t}, ${a(e) + l.y + n})${s ? " rotate(-90)" : ""}`;
		}).attr("text-anchor", ({ label: e }) => e?.rotated ? "end" : null).attr("dy", "1em").style("fill", ({ label: e }) => e?.color ?? null), [s.style("fill-opacity", (e) => m(e.opacity) ? e.opacity : null).on("end", function() {
			L(this.parentNode).selectAll("rect:not([x])").remove();
		}), c.style("opacity", null)];
	},
	regionX(e) {
		return this.getRegionSize("x", e);
	},
	regionY(e) {
		return this.getRegionSize("y", e);
	},
	regionWidth(e) {
		return this.getRegionSize("width", e);
	},
	regionHeight(e) {
		return this.getRegionSize("height", e);
	},
	getRegionSize(e, t) {
		let n = this, { config: r, scale: i, state: a } = n, o = r.axis_rotated, s = /(x|y|y2)/.test(e), c = s ? e === "x" : e === "width", l = !s && n[c ? "regionX" : "regionY"](t), u = s ? "start" : "end", d = s ? 0 : a[e], f;
		if (t.axis === "y" || t.axis === "y2" ? (!s && !c ? u = "start" : s && !c && (u = "end"), (c ? o : !o) && u in t && (f = i[t.axis])) : (c ? !o : o) && u in t && (f = i.zoom || i.x), f) {
			let i = 0;
			d = t[u], n.axis.isTimeSeries(t.axis) ? d = Le.call(n, d) : /(x|width)/.test(e) && n.axis.isCategorized() && isNaN(d) && (d = r.axis_x_categories.indexOf(d), i = n.axis.x.tickOffset() * (u === "start" ? -1 : 1)), d = f(d) + i;
		}
		return s ? d : d < l ? 0 : d - l;
	},
	isRegionOnX(e) {
		return !e.axis || e.axis === "x";
	}
}, rb = () => (F(Um.prototype, nb), th.prototype.regions = tb.regions, (rb = () => ({}))()), ib = Object.create(null), ab = {
	version: "4.1.3",
	generate(e) {
		let t = new th(ke(Object.create(null), ib, e));
		return t.internal.charts = this.instance, this.instance.push(t), t;
	},
	defaults(e) {
		return k(e) && (ib = e), ib;
	},
	instance: [],
	plugin: {}
};
export { bg as area, xg as areaLineRange, Cg as areaSpline, wg as areaSplineRange, Tg as areaStep, Sg as areaStepRange, Rg as bar, ab as bb, ab as default, Vg as bubble, Wg as candlestick, Sy as category, u_ as donut, Ay as exportApi, Ny as flow, S_ as funnel, T_ as gauge, Zy as grid, E_ as line, A_ as pie, P_ as polar, B_ as radar, rb as regions, H_ as scatter, Iv as selection, D_ as spline, O_ as step, Zv as subchart, Av as treemap, by as zoom };
