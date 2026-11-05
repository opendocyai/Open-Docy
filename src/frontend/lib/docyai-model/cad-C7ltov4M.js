import { Pt as e, nt as t, q as n, tt as r, xt as i } from "./dist-Bp5vtczT.js";
import { _ as a, g as o, m as s, o as c, p as l } from "./fit-Slu1JEBa.js";
import { n as u, t as d } from "./watermark-uZe6GCNe.js";
import { n as f, t as p } from "./messages-CWdnHJWg.js";
// node_modules/.pnpm/@file-viewer+core@3.3.0/node_modules/@file-viewer/core/dist/output/canvasImage.js
var m = (e, t) => new Promise((n, r) => {
	let i = e.createElement("img"), a = setTimeout(() => o(/* @__PURE__ */ Error("Image export resource timed out.")), 3e4), o = (e) => {
		clearTimeout(a), i.onload = i.onerror = null, e ? r(e) : n(i);
	};
	i.crossOrigin = "anonymous", i.onload = () => o(), i.onerror = () => o(/* @__PURE__ */ Error("Unable to render the export watermark.")), i.src = t;
});
async function h(e, t, n, r = 1) {
	if (!["png", "jpeg"].includes(t)) throw Error("Unsupported image export format.");
	if (!(e.width > 0 && e.height > 0) || e.width * e.height > 64e6) throw Error("The image export size is empty or exceeds 64 million pixels.");
	let i = e.ownerDocument, a = i.createElement("canvas");
	a.width = e.width, a.height = e.height;
	let o = a.getContext("2d");
	if (!o) throw Error("A Canvas 2D context is required for image export.");
	t === "jpeg" && (o.fillStyle = "#ffffff", o.fillRect(0, 0, a.width, a.height)), o.drawImage(e, 0, 0);
	let s = u(n);
	if (s) {
		if (s.image) {
			let e = await m(i, s.image), t = i.createElement("canvas");
			if (t.width = e.naturalWidth, t.height = e.naturalHeight, !t.width || !t.height || t.width * t.height > 16e6) throw Error("The watermark image size is invalid.");
			let n = t.getContext("2d");
			if (!n) throw Error("Unable to render the export watermark.");
			n.drawImage(e, 0, 0), s = {
				...s,
				image: t.toDataURL("image/png")
			};
		}
		let e = await m(i, `data:image/svg+xml;charset=utf-8,${encodeURIComponent(d(s))}`), t = o.createPattern(e, "repeat");
		if (!t) throw Error("Unable to render the export watermark.");
		let n = Number.isFinite(r) && r > 0 ? r : 1;
		o.save(), o.scale(n, n), o.fillStyle = t, o.fillRect(0, 0, a.width / n, a.height / n), o.restore();
	}
	let c = `image/${t}`;
	return new Promise((e, n) => {
		a.toBlob((r) => {
			r?.type === c && r.size > 0 ? e(r) : n(/* @__PURE__ */ Error(`Unable to encode ${t.toUpperCase()} output.`));
		}, c, .92);
	});
}
// node_modules/.pnpm/@file-viewer+renderer-cad@3.3.0_three@0.186.1/node_modules/@file-viewer/renderer-cad/dist/colorMode.js
function g(e) {
	return e === "monochrome" ? "monochrome" : "source";
}
function _(e, t = "#000000") {
	return typeof e == "string" && e.trim() ? e.trim() : t;
}
function v(e, t) {
	return {
		background: t === "monochrome" ? "#ffffff" : "#05070d",
		foreground: t === "monochrome" ? _(e.monochromeColor) : "#f8fafc",
		contrastMode: "adaptive",
		minColorContrast: 2.4,
		showPageBounds: !0,
		showUnsupportedMarkers: !0,
		enableSpatialIndex: !0,
		maxVisibleTextLabels: 2400,
		...e.canvasOptions
	};
}
function y(e) {
	return !!(e && typeof e.setColorMode == "function");
}
function ee(e) {
	let t = e;
	return (t?.getSourceDocument)?.call(t) ?? (t?.getDocument)?.call(t);
}
function b(e, t, n, r) {
	var i, a;
	if (!y(e)) return !1;
	if ((i = e.setColorMode) == null || i.call(e, t, n), r) {
		let n = v(r, t);
		e.isNativeRendererActive?.call(e) && r.dwfBackground && (n.background = r.dwfBackground), (a = e.setCanvasOptions) == null || a.call(e, n);
	}
	return !0;
}
// node_modules/.pnpm/dwf-viewer@0.6.7_three@0.186.1/node_modules/dwf-viewer/dist/format/types.js
function x(e, t, n, r) {
	return r === void 0 ? {
		level: e,
		code: t,
		message: n
	} : {
		level: e,
		code: t,
		message: n,
		source: r
	};
}
function S(e) {
	return (e ?? []).filter((e) => e.level !== "info");
}
// node_modules/.pnpm/dwf-viewer@0.6.7_three@0.186.1/node_modules/dwf-viewer/dist/format/inflate.js
function C() {
	return globalThis.DecompressionStream;
}
var w = class {
	async inflateRaw(e) {
		let t = C();
		if (!t) throw Error("This browser does not expose DecompressionStream. Provide a custom InflateProvider, or pre-bundle a WASM/JS inflater.");
		try {
			return await te(e, "deflate-raw", t);
		} catch (n) {
			try {
				return await te(e, "deflate", t);
			} catch {
				throw n instanceof Error ? n : Error(String(n));
			}
		}
	}
};
async function te(e, t, n) {
	let r = new Blob([e]).stream().pipeThrough(new n(t)), i = await new Response(r).arrayBuffer();
	return new Uint8Array(i);
}
// node_modules/.pnpm/dwf-viewer@0.6.7_three@0.186.1/node_modules/dwf-viewer/dist/format/util.js
var ne = new TextDecoder("utf-8");
new TextDecoder("ascii");
function T(e) {
	return ne.decode(e);
}
function E(e) {
	let t = [], n = e.replace(/\\/g, "/");
	for (let e of n.split("/")) e && e !== "." && (e === ".." ? t.pop() : t.push(e));
	return t.join("/");
}
function re(e) {
	let t = E(e), n = t.lastIndexOf("/");
	return n < 0 ? "" : t.slice(0, n);
}
function ie(e, t) {
	if (!t) return E(e);
	if (t.startsWith("/")) return E(t.slice(1));
	let n = re(e);
	return E((n ? n + "/" : "") + t);
}
function ae(e) {
	let t = e.indexOf(":");
	return t >= 0 ? e.slice(t + 1) : e;
}
function D(e) {
	return ae(e.localName || e.nodeName);
}
function O(e, t) {
	return e.getAttribute(t) ?? e.getAttributeNS(null, t) ?? void 0;
}
function k(e) {
	return Array.from(e.childNodes).filter((e) => e.nodeType === 1);
}
function A(e, t = "document.xml") {
	let n = oe(e);
	if (n) return n;
	let r = se(e);
	if (r !== e) {
		let e = oe(r);
		if (e) return e;
	}
	try {
		return de(r);
	} catch (e) {
		throw Error(`XML parse error in ${t}: ${String(e)}`);
	}
}
function oe(e) {
	if (typeof DOMParser < "u") try {
		let t = new DOMParser().parseFromString(e, "application/xml");
		return t.getElementsByTagName("parsererror")[0] ? void 0 : t;
	} catch {
		return;
	}
}
function se(e) {
	let t = e;
	return t = t.replace(/\s+xmlns:(?:schemaLocation|noNamespaceSchemaLocation)\s*=\s*("[^"]*"|'[^']*')/g, ""), /\s+xsi:schemaLocation\s*=/.test(t) && !/\s+xmlns:xsi\s*=/.test(t) && (t = t.replace(/<([A-Za-z_][\w.:-]*)(?=\s|>|\/)/, "<$1 xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"")), t;
}
var ce = class e {
	constructor(e, t) {
		this.nodeType = 1, this.childNodes = [], this.nodeName = e, this.localName = ae(e), this.attributes = t;
	}
	get textContent() {
		return this.childNodes.map((e) => e.textContent ?? "").join("");
	}
	get children() {
		return this.childNodes.filter((t) => t instanceof e);
	}
	getAttribute(e) {
		return this.attributes.find((t) => t.name === e || t.nodeName === e)?.value ?? null;
	}
	getAttributeNS(e, t) {
		return this.attributes.find((e) => e.localName === t)?.value ?? null;
	}
	getElementsByTagName(t) {
		let n = [], r = (i) => {
			(t === "*" || i.nodeName === t || i.localName === t) && n.push(i);
			for (let t of i.childNodes) t instanceof e && r(t);
		};
		for (let t of this.childNodes) t instanceof e && r(t);
		return n;
	}
}, le = class {
	constructor(e) {
		this.textContent = e, this.nodeType = 3;
	}
}, ue = class {
	constructor() {
		this.nodeType = 9, this.childNodes = [];
	}
	get textContent() {
		return this.childNodes.map((e) => e.textContent ?? "").join("");
	}
	get children() {
		return this.childNodes.filter((e) => e instanceof ce);
	}
	get documentElement() {
		return this.children[0];
	}
	getElementsByTagName(e) {
		let t = [], n = (r) => {
			(e === "*" || r.nodeName === e || r.localName === e) && t.push(r);
			for (let e of r.childNodes) e instanceof ce && n(e);
		};
		for (let e of this.childNodes) e instanceof ce && n(e);
		return t;
	}
};
function de(e) {
	let t = new ue(), n = [t], r = 0;
	for (; r < e.length;) {
		let i = e.indexOf("<", r);
		if (i < 0) {
			fe(n[n.length - 1], e.slice(r));
			break;
		}
		if (i > r && fe(n[n.length - 1], e.slice(r, i)), e.startsWith("<!--", i)) {
			let t = e.indexOf("-->", i + 4);
			if (t < 0) throw Error("Unclosed XML comment.");
			r = t + 3;
			continue;
		}
		if (e.startsWith("<![CDATA[", i)) {
			let t = e.indexOf("]]>", i + 9);
			if (t < 0) throw Error("Unclosed XML CDATA section.");
			fe(n[n.length - 1], e.slice(i + 9, t)), r = t + 3;
			continue;
		}
		if (e.startsWith("<?", i)) {
			let t = e.indexOf("?>", i + 2);
			if (t < 0) throw Error("Unclosed XML processing instruction.");
			r = t + 2;
			continue;
		}
		if (e.startsWith("<!", i)) {
			let t = e.indexOf(">", i + 2);
			if (t < 0) throw Error("Unclosed XML declaration.");
			r = t + 1;
			continue;
		}
		let a = pe(e, i + 1);
		if (a < 0) throw Error("Unclosed XML tag.");
		let o = e.slice(i + 1, a).trim();
		if (r = a + 1, !o) continue;
		if (o[0] === "/") {
			let e = o.slice(1).trim().split(/\s+/)[0] ?? "", r = n.pop();
			for (; r && r instanceof ce && r.nodeName !== e && r.localName !== ae(e) && n.length > 0;) r = n.pop();
			n.length === 0 && n.push(t);
			continue;
		}
		let s = o.endsWith("/");
		s && (o = o.slice(0, -1).trim());
		let c = o.search(/\s/), l = new ce(c < 0 ? o : o.slice(0, c), me(c < 0 ? "" : o.slice(c + 1))), u = n[n.length - 1];
		l.parentNode = u, u.childNodes.push(l), s || n.push(l);
	}
	return t;
}
function fe(e, t) {
	if (!t) return;
	let n = he(t);
	n.trim().length !== 0 && e.childNodes.push(new le(n));
}
function pe(e, t) {
	let n = "";
	for (let r = t; r < e.length; r++) {
		let t = e[r];
		if (n) t === n && (n = "");
		else if (t === "\"" || t === "'") n = t;
		else if (t === ">") return r;
	}
	return -1;
}
function me(e) {
	let t = [], n = /([^\s=]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g, r;
	for (; r = n.exec(e);) {
		let e = r[1], n = he(r[2] ?? r[3] ?? "");
		t.push({
			name: e,
			nodeName: e,
			localName: ae(e),
			value: n
		});
	}
	return t;
}
function he(e) {
	return e.replace(/&(#x[0-9a-fA-F]+|#\d+|amp|lt|gt|quot|apos);/g, (e, t) => t === "amp" ? "&" : t === "lt" ? "<" : t === "gt" ? ">" : t === "quot" ? "\"" : t === "apos" ? "'" : t.startsWith("#x") ? String.fromCodePoint(Number.parseInt(t.slice(2), 16)) : t.startsWith("#") ? String.fromCodePoint(Number.parseInt(t.slice(1), 10)) : e);
}
function ge(e, t = 2048) {
	let n = Math.min(t, e.length);
	if (n === 0) return !0;
	let r = 0, i = 0;
	for (let t = 0; t < n; t++) {
		let n = e[t];
		if (n === 0) return !1;
		n === 9 || n === 10 || n === 13 || n >= 32 && n <= 126 || n >= 160 ? r++ : i++;
	}
	return r / n > .85 && i < 20;
}
function _e(e) {
	let t = e.split(/[?#]/)[0] ?? e, n = t.lastIndexOf("/"), r = t.lastIndexOf(".");
	return r > n ? t.slice(r + 1).toLowerCase() : "";
}
function ve(e) {
	switch (_e(e)) {
		case "png": return "image/png";
		case "jpg":
		case "jpeg": return "image/jpeg";
		case "gif": return "image/gif";
		case "bmp": return "image/bmp";
		case "tif":
		case "tiff": return "image/tiff";
		case "w2d": return "application/x-dwf-w2d";
		case "hsf": return "model/vnd.hsf";
		case "fpage": return "application/vnd.ms-package.xps-fixeddocumentsequence+xml";
		case "fdseq": return "application/vnd.ms-package.xps-fixeddocumentsequence+xml";
		case "fdoc": return "application/vnd.ms-package.xps-fixeddocument+xml";
		default: return;
	}
}
async function ye(e, t) {
	let n = new Blob([e], { type: t });
	return "createImageBitmap" in globalThis ? await createImageBitmap(n) : await new Promise((e, t) => {
		let r = URL.createObjectURL(n), i = new Image();
		i.onload = () => {
			URL.revokeObjectURL(r), e(i);
		}, i.onerror = () => {
			URL.revokeObjectURL(r), t(/* @__PURE__ */ Error("Failed to decode image"));
		}, i.src = r;
	});
}
function j(e) {
	let t = e.match(/[-+]?(?:\d+\.\d*|\.\d+|\d+)(?:[eE][-+]?\d+)?/g);
	return t ? t.map(Number).filter(Number.isFinite) : [];
}
// node_modules/.pnpm/dwf-viewer@0.6.7_three@0.186.1/node_modules/dwf-viewer/dist/format/zip.js
var be = 101010256, xe = 33639248, Se = 67324752, Ce = class e {
	constructor(e, t, n, r) {
		this.entryMap = /* @__PURE__ */ new Map(), this.cache = /* @__PURE__ */ new Map(), this.bytes = e, this.entries = t, this.archiveBase = n, this.inflater = r ?? new w();
		for (let e of t) this.entryMap.set(E(e.name), e);
	}
	static open(t, n) {
		let r = new DataView(t.buffer, t.byteOffset, t.byteLength), i = Te(r);
		if (i < 0) throw Error("ZIP end-of-central-directory record was not found. This is not a DWF 6+/DWFx ZIP package.");
		let a = De(r, i + 4), o = De(r, i + 6);
		if (a !== 0 || o !== 0) throw Error("Multi-disk ZIP archives are not supported.");
		let s = De(r, i + 10), c = M(r, i + 12), l = M(r, i + 16), u = 0, d = l;
		if (M(r, d) !== xe) {
			let e = Math.max(0, i - c - 1048576), t = -1;
			for (let n = i - c; n >= e; n--) if (n >= 0 && M(r, n) === xe) {
				t = n;
				break;
			}
			if (t < 0) throw Error("ZIP central directory could not be located.");
			d = t, u = d - l;
		}
		let f = [], p = d;
		for (let e = 0; e < s; e++) {
			if (M(r, p) !== xe) throw Error(`Bad central directory signature at ${p}.`);
			let e = De(r, p + 8), n = De(r, p + 10), i = De(r, p + 12), a = De(r, p + 14), o = M(r, p + 16), s = M(r, p + 20), c = M(r, p + 24), l = De(r, p + 28), d = De(r, p + 30), m = De(r, p + 32), h = M(r, p + 42), g = t.subarray(p + 46, p + 46 + l), _ = t.subarray(p + 46 + l + d, p + 46 + l + d + m), v = E(Ee(g, e)), y = Ee(_, e);
			v.endsWith("/") || f.push({
				name: v,
				compressedSize: s,
				uncompressedSize: c,
				compressionMethod: n,
				crc32: o,
				localHeaderOffset: h,
				centralHeaderOffset: p - u,
				flags: e,
				lastModTime: i,
				lastModDate: a,
				comment: y
			}), p += 46 + l + d + m;
		}
		return new e(t, f, u, n);
	}
	has(e) {
		return this.entryMap.has(E(e));
	}
	get(e) {
		return this.entryMap.get(E(e));
	}
	find(e) {
		return this.entries.find(e);
	}
	findAll(e) {
		return this.entries.filter(e);
	}
	async read(e) {
		let t = typeof e == "string" ? this.get(e) : e;
		if (!t) throw Error(`ZIP entry not found: ${e}`);
		let n = this.cache.get(t.name);
		if (n) return n;
		let r = new DataView(this.bytes.buffer, this.bytes.byteOffset, this.bytes.byteLength), i = this.archiveBase + t.localHeaderOffset;
		if (M(r, i) !== Se) throw Error(`Bad local header signature for ${t.name}.`);
		let a = De(r, i + 26), o = De(r, i + 28), s = i + 30 + a + o, c = this.bytes.subarray(s, s + t.compressedSize), l;
		if (t.compressionMethod === 0) l = c.slice();
		else if (t.compressionMethod === 8) l = await this.inflater.inflateRaw(c);
		else throw Error(`Unsupported ZIP compression method ${t.compressionMethod} for ${t.name}.`);
		if (t.uncompressedSize !== 0 && l.byteLength !== t.uncompressedSize && t.uncompressedSize < 4294967295) throw Error(`ZIP entry size mismatch for ${t.name}: expected ${t.uncompressedSize}, got ${l.byteLength}.`);
		return this.cache.set(t.name, l), l;
	}
};
function we(e) {
	if (e.byteLength < 22) return !1;
	let t = new DataView(e.buffer, e.byteOffset, e.byteLength);
	return M(t, 0) === Se || Te(t) >= 0;
}
function Te(e) {
	let t = Math.max(0, e.byteLength - 65535 - 22);
	for (let n = e.byteLength - 22; n >= t; n--) if (M(e, n) === be) return n;
	return -1;
}
function Ee(e, t) {
	return t & 2048 ? T(e) : Array.from(e, (e) => String.fromCharCode(e)).join("");
}
function De(e, t) {
	return e.getUint16(t, !0);
}
function M(e, t) {
	return e.getUint32(t, !0);
}
// node_modules/.pnpm/dwf-viewer@0.6.7_three@0.186.1/node_modules/dwf-viewer/dist/format/opc.js
async function Oe(e) {
	let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), r = [];
	if (e.has("[Content_Types].xml")) {
		let i = A(T(await e.read("[Content_Types].xml")), "[Content_Types].xml");
		for (let e of Array.from(i.documentElement.children)) {
			let i = D(e);
			if (i === "Default") {
				let t = e.getAttribute("Extension")?.toLowerCase(), r = e.getAttribute("ContentType");
				t && r && n.set(t, r);
			} else if (i === "Override") {
				let n = E((e.getAttribute("PartName") ?? "").replace(/^\//, "")), i = e.getAttribute("ContentType");
				n && i && (t.set(n, i), r.push({
					partName: n,
					contentType: i
				}));
			}
		}
	}
	let i = /* @__PURE__ */ new Map();
	return {
		zip: e,
		contentTypes: t,
		defaults: n,
		overrides: r,
		relationships: i,
		resources: e.entries.map((e) => ({
			path: e.name,
			mediaType: Ae(t, n, e.name),
			size: e.uncompressedSize
		})),
		readText: async (t) => T(await e.read(E(t))),
		readBytes: async (t) => e.read(E(t)),
		getContentType: (e) => Ae(t, n, e),
		getRelationships: async (t = "") => {
			let n = E(t), r = i.get(n);
			if (r) return r;
			let a = ke(n);
			if (!e.has(a)) return i.set(n, []), [];
			let o = A(T(await e.read(a)), a), s = [];
			for (let e of Array.from(o.documentElement.children)) {
				if (D(e) !== "Relationship") continue;
				let t = e.getAttribute("Id") ?? "", r = e.getAttribute("Type") ?? "", i = e.getAttribute("Target") ?? "", a = e.getAttribute("TargetMode") ?? void 0;
				t && i && s.push({
					id: t,
					type: r,
					target: i,
					targetMode: a,
					source: n,
					resolvedTarget: a === "External" ? i : ie(n, i)
				});
			}
			return i.set(n, s), s;
		}
	};
}
function ke(e) {
	let t = E(e);
	if (!t) return "_rels/.rels";
	let n = t.lastIndexOf("/");
	return n < 0 ? `_rels/${t}.rels` : `${t.slice(0, n)}/_rels/${t.slice(n + 1)}.rels`;
}
function Ae(e, t, n) {
	let r = E(n), i = e.get(r);
	if (i) return i;
	let a = r.lastIndexOf(".");
	if (a >= 0) return t.get(r.slice(a + 1).toLowerCase());
}
// node_modules/.pnpm/dwf-viewer@0.6.7_three@0.186.1/node_modules/dwf-viewer/dist/format/document.js
function je(e, t, n, r) {
	return {
		...e,
		pages: t.map((e) => ({
			id: e.id,
			name: e.name,
			kind: e.kind,
			width: e.width,
			height: e.height,
			sourcePath: e.sourcePath,
			diagnostics: e.diagnostics
		})),
		pageData: t,
		zip: n,
		opc: r
	};
}
// node_modules/.pnpm/dwf-viewer@0.6.7_three@0.186.1/node_modules/dwf-viewer/dist/format/w3d.js
var Me = 1, Ne = 4, Pe = 16, Fe = 32, Ie = 128, Le = 4, Re = 8, ze = 1, Be = 4, Ve = 5, He = 1, Ue = 2, We = 4, Ge = 8, Ke = 16, qe = 32, Je = 64, Ye = 128, Xe = 0, Ze = 1, Qe = 2, $e = 3, N = 4, et = 5, tt = 6, P = -2139062144, nt = -2139062145, rt = -2139062146;
async function it(e, t = {}) {
	let n = [], r = await at(e, n, t.sourcePath), i = [], a = /* @__PURE__ */ new Set(), o = t.maxMeshes ?? 1e4, s = t.maxTriangles ?? 1e7, c = 0, l = 0, u = 0;
	for (let e = 0; e < r.length && i.length < o && u < s; e++) if (r[e] === 83) try {
		let t = st(r, e, i.length + 1);
		if (!t) continue;
		let n = `${t.sourceStart}:${t.sourceEnd}`;
		if (a.has(n)) continue;
		a.add(n), i.push(t), u += t.triangleCount, e = Math.max(e, t.sourceEnd - 1);
	} catch (e) {
		let t = String(e);
		/edgebreaker/i.test(t) ? c++ : l++;
	}
	c > 0 && n.push(x("warning", "W3D_EDGEBREAKER_PARTIAL", `${c} connectivity-compressed shell candidate(s) were skipped.`, t.sourcePath)), i.length === 0 && n.push(x("error", "W3D_NO_MESHES", "No renderable W3D shell meshes were decoded.", t.sourcePath));
	let d = Tt(i);
	return {
		kind: "w3d-model",
		title: t.title ?? "3D Model",
		meshes: i,
		bounds: d,
		diagnostics: n,
		sourcePath: t.sourcePath,
		stats: {
			meshCount: i.length,
			vertexCount: i.reduce((e, t) => e + t.vertexCount, 0),
			triangleCount: i.reduce((e, t) => e + t.triangleCount, 0),
			decodedBytes: r.byteLength,
			edgeCount: i.reduce((e, t) => e + Math.floor((t.edgeIndices?.length ?? 0) / 2), 0),
			materialCount: 0,
			textureCount: 0,
			pmiCount: 0,
			nodeCount: 0
		}
	};
}
async function at(e, t, n) {
	let r = new w();
	for (let t = 0; t + 6 < e.length; t++) {
		if (e[t] !== 120) continue;
		let n = e[t + 1];
		if (n !== 1 && n !== 94 && n !== 156 && n !== 218) continue;
		let i = e.subarray(t), a = ot(i), o = [];
		a.length > 6 && o.push({
			label: "raw-deflate-body",
			data: a.subarray(2, a.length - 4)
		}), i.length > 2 && o.push({
			label: "raw-deflate-body-with-trailer",
			data: i.subarray(2)
		}), o.push({
			label: "zlib-trimmed",
			data: a
		}), a.length !== i.length && o.push({
			label: "zlib-with-padding",
			data: i
		});
		for (let e of o) try {
			return await r.inflateRaw(e.data);
		} catch {}
	}
	return e;
}
function ot(e) {
	let t = e.length;
	for (; t > 0 && e[t - 1] === 0;) t--;
	return t === e.length ? e : e.subarray(0, t);
}
function st(e, t, n) {
	let r = Mt(e, t + 1), i = Nt(r), a = 0;
	if ((i & Ie) !== 0 && (a = Pt(r)), (i & Fe) !== 0 || ((i & Pe) === 0 && F(r), Nt(r), a & 3)) return;
	let o = i & 65 ? Nt(r) : Be, s, c, l;
	if (o === Ve) {
		let t = F(r);
		if (t <= 0 || r.pos + t > e.length || t > 1e8) throw Error("Bad edgebreaker block length.");
		r.pos;
		let n = e.subarray(r.pos, r.pos + t);
		r.pos += t;
		let a = ct(n);
		if ((i & Me) === 0) {
			let t = a.pointCount * 3;
			if (r.pos + t * 4 > e.length) throw Error("Edgebreaker shell has no following full-resolution vertex array.");
			s = kt(e, r.pos, t), r.pos += t * 4;
		} else throw Error("edgebreaker quantized-point reconstruction is not enabled for this shell.");
		if (c = bt(a.faces, a.pointCount), l = `edgebreaker-v${n[0] ?? 0}`, c.length < 3) throw Error("Empty edgebreaker face list.");
	} else if (o === Be) {
		let t = F(r);
		if (t <= 0 || t > 1e7) throw Error("Bad uncompressed shell point count.");
		s = kt(e, r.pos, t * 3), r.pos += t * 3 * 4, c = bt(gt(r, t, (i & Ne) !== 0, !1).indices, t), l = "uncompressed";
	} else if (o === ze) {
		let t = F(r);
		if (t <= 0 || t > 1e7) throw Error("Bad compressed shell point count.");
		let n = (a & Re) === 0 ? At(r, 6) : [
			0,
			0,
			0,
			1,
			1,
			1
		], o = Nt(r), u = F(r);
		if (u <= 0 || r.pos + u > e.length) throw Error("Bad compressed shell point payload length.");
		s = yt(e.subarray(r.pos, r.pos + u), t, o, n), r.pos += u, c = bt(gt(r, t, (i & Ne) !== 0, (a & Le) !== 0).indices, t), l = `quantized-${o}`;
	} else throw Error(`Unsupported W3D shell compression scheme ${o}.`);
	if (c.length < 3 || s.length < 9) return;
	let u = xt(s, c), d = St(s, c), f = Et(s);
	return {
		id: `w3d-mesh-${n}`,
		name: `Mesh ${n}`,
		positions: s,
		normals: u,
		indices: c,
		edgeIndices: d,
		vertexCount: Math.floor(s.length / 3),
		triangleCount: Math.floor(c.length / 3),
		bounds: f,
		color: Dt(n),
		sourceStart: t,
		sourceEnd: r.pos,
		decodeKind: l
	};
}
function ct(e) {
	if (e.byteLength < 24) throw Error("Edgebreaker block is too short.");
	let t = new DataView(e.buffer, e.byteOffset, e.byteLength), n = e[0], r = e[1], i = e[2], a = e[3], o = t.getInt32(4, !0), s = t.getInt32(8, !0);
	t.getInt32(12, !0);
	let c = t.getInt32(16, !0);
	if (t.getInt32(20, !0), n < 0 || n > 2 || r !== 0 || i < 0 || i > 3 || a < 0 || a > 3) throw Error("Unsupported edgebreaker header.");
	if (o <= 0 || s < 0 || c <= 0) throw Error("Invalid edgebreaker sizes.");
	let l = n >= 1 ? 24 : 20, u = e.subarray(l, l + o);
	if (l += o + It(l + o), l + s > e.length) throw Error("Invalid edgebreaker MTable offset.");
	let d = lt(e.subarray(l, l + s));
	l += s + It(l + s);
	let f = ut(u, d), p = ft(f.opcodePointCount, d, f.faces), m = [];
	for (let e of p) m.push(e[1], e[2], e[3]);
	let h = m.reduce((e, t) => Math.max(e, t), -1), g = m.reduce((e, t) => Math.min(e, t), c);
	if (g < 0 || h >= c) throw Error(`Edgebreaker face index range ${g}..${h} is outside point count ${c}.`);
	return {
		pointCount: c,
		faces: m,
		triangleCount: m.length / 3,
		diagnostics: []
	};
}
function lt(e) {
	let t = Mt(e, 0), n = F(t), r = (n & He) === 0 ? 0 : F(t), i = (n & Ue) === 0 ? 0 : F(t), a = (n & We) === 0 ? 0 : i, o = (n & Ge) === 0 ? 0 : F(t), s = (n & Ke) === 0 ? 0 : F(t), c = jt(t, r), l = jt(t, i), u = jt(t, a), d = [], f = 0;
	for (let e = 0; e < o; e++) f += F(t), d.push(f);
	let p = [], m = /* @__PURE__ */ new Map();
	f = 0;
	for (let e = 0; e < s; e += 2) {
		let e = F(t) + f;
		f = e;
		let n = F(t);
		p.push(e, n), m.set(e, n);
	}
	return {
		flags: n,
		mlengths: c,
		m2stackoffsets: l,
		m2gateoffsets: u,
		dummies: d,
		patches: p,
		patchMap: m,
		bounding: (n & qe) === 0 ? void 0 : At(t, 6),
		quantization: (n & Je) === 0 ? [
			11,
			11,
			11
		] : [
			F(t),
			F(t),
			F(t)
		],
		normalQuantization: (n & Ye) === 0 ? [
			11,
			11,
			11
		] : [
			F(t),
			F(t),
			F(t)
		]
	};
}
function ut(e, t) {
	let n = Array.from(e), r = [], i = 0, a = 0;
	for (; a < n.length;) {
		let { ecount: e, offsets: o } = dt(n, a, t);
		if (e <= 0) throw Error(`Invalid edgebreaker boundary loop length ${e}.`);
		let s = [], c = [], l = [], u = [], d = [];
		for (let t = 0; t < e; t++) c[t] = t - 1, s[t] = t + 1, l[t] = i++, u[t] = P;
		c[0] = e - 1, s[e - 1] = 0;
		let f = 0, p = 0, m = e, h = [], g = [];
		for (;;) {
			for (g.length === 0 && g.push(m++); m + 2 >= s.length;) s.push(0), c.push(0), l.push(0), u.push(P);
			let e = d.length;
			d.push({
				start: 0,
				twin: P
			}, {
				start: 0,
				twin: P
			}, {
				start: 0,
				twin: P
			});
			let t = [
				3,
				l[f],
				l[s[f]],
				-1
			];
			u[f] !== P && u[f] >= 0 && u[f] < d.length && (d[u[f]].twin = e), d[e].twin = u[f], d[e].start = l[f], d[e + 1].start = l[s[f]];
			let _ = n[a++];
			if (_ === Xe) {
				t[3] = i, d[e + 1].twin = P, d[e + 2].twin = P, d[e + 2].start = i;
				let n = g.pop();
				s[c[f]] = n, c[n] = c[f], s[n] = f, c[f] = n, l[n] = l[f], l[f] = i, u[f] = e + 1, u[n] = e + 2, i++;
			} else if (_ === Ze) t[3] = l[c[f]], d[e + 1].twin = P, d[e + 2].twin = u[c[f]], u[c[f]] !== P && u[c[f]] >= 0 && u[c[f]] < d.length && (d[u[c[f]]].twin = e + 2), d[e + 2].start = l[c[f]], l[f] = l[c[f]], g.push(c[f]), c[f] = c[c[f]], s[c[f]] = f, u[f] = e + 1;
			else if (_ === Qe) {
				if (t[3] = l[c[f]], d[e + 1].twin = u[s[f]], u[s[f]] !== P && u[s[f]] >= 0 && u[s[f]] < d.length && (d[u[s[f]]].twin = e + 1), d[e + 2].twin = u[c[f]], u[c[f]] !== P && u[c[f]] >= 0 && u[c[f]] < d.length && (d[u[c[f]]].twin = e + 2), d[e + 2].start = l[c[f]], g.push(f, c[f], s[f]), ht(t) && r.push(t), h.length > 0) f = h.pop();
				else break;
			} else if (_ === $e) t[3] = l[s[s[f]]], d[e + 1].twin = u[s[f]], u[s[f]] !== P && u[s[f]] >= 0 && u[s[f]] < d.length && (d[u[s[f]]].twin = e + 1), d[e + 2].twin = P, d[e + 2].start = l[s[s[f]]], g.push(s[f]), s[f] = s[s[f]], c[s[f]] = f, u[f] = e + 2;
			else if (_ === N) {
				let n = f, r = (o[p] ?? 0) + 1;
				for (let e = 0; e < r; e++) n = s[n];
				t[3] = l[s[n]], d[e + 1].twin = P, d[e + 2].twin = P, d[e + 2].start = l[s[n]], p++;
				let i = g.pop();
				h.push(i), s[c[f]] = i, c[i] = c[f], s[i] = s[n], c[s[n]] = i, u[i] = e + 2, l[i] = l[f], l[f] = l[s[n]], u[f] = e + 1, c[f] = n, s[n] = f;
			} else throw Error(`Unsupported edgebreaker opcode ${_}.`);
			if (_ !== Qe) {
				if (ht(t)) r.push(t);
				else throw Error("Invalid edgebreaker triangle.");
			}
			if (a >= n.length) break;
		}
	}
	return {
		faces: r,
		opcodePointCount: i
	};
}
function dt(e, t, n) {
	let r = 0, i = 0, a = 0, o = 0, s = [], c = [], l = [];
	for (let u = t; u < e.length; u++) {
		let t = e[u];
		if (t === Xe) --r;
		else if (t === Ze) r += 1;
		else if (t === Qe) {
			if (r += 3, s.length > 0) {
				let e = c.pop();
				l[e] = r - 2 - s.pop();
			} else break;
		} else if (t === $e) r += 1;
		else if (t === N) --r, c.push(i), s.push(r), l[i] = 0, i++;
		else if (t === et) {
			let e = n.mlengths[a++] ?? 0;
			r -= e + 1;
		} else if (t === tt) n.mlengths[o], --r, o++;
		else throw Error(`Bad edgebreaker opcode ${t}.`);
	}
	return {
		ecount: r,
		offsets: l
	};
}
function ft(e, t, n) {
	let r = new Int32Array(e);
	for (let n of t.dummies) n >= 0 && n < e && (r[n] = nt);
	for (let n = 0; n + 1 < t.patches.length; n += 2) {
		let i = t.patches[n];
		i >= 0 && i < e && r[i] !== nt && (r[i] = rt);
	}
	let i = 0;
	for (let t = 0; t < e; t++) r[t] < 0 ? i++ : r[t] = i;
	let a = [];
	for (let e of n) {
		let n = e[1], i = e[2], o = e[3];
		if (mt(n, r) || mt(i, r) || mt(o, r)) continue;
		let s = [
			3,
			pt(n, r, t),
			pt(i, r, t),
			pt(o, r, t)
		];
		ht(s) && a.push(s);
	}
	return a;
}
function pt(e, t, n) {
	return t[e] === rt ? n.patchMap.get(e) ?? e : e - t[e];
}
function mt(e, t) {
	return e < 0 || e >= t.length || t[e] === nt;
}
function ht(e) {
	return e[1] !== e[2] && e[2] !== e[3] && e[3] !== e[1] && e[1] >= 0 && e[2] >= 0 && e[3] >= 0;
}
function gt(e, t, n, r) {
	Nt(e);
	let i = F(e);
	if (i <= 0 || e.pos + i > e.bytes.length) throw Error("Bad compressed face-list payload length.");
	let a = e.bytes.subarray(e.pos, e.pos + i);
	e.pos += i;
	let o = _t(a, r);
	return {
		indices: vt(o, t, n),
		values: o
	};
}
function _t(e, t) {
	if (e.length < 2) throw Error("Face payload is too short.");
	let n = e[0], r = n / 8;
	if (r !== 1 && r !== 2 && r !== 4) throw Error(`Unsupported face-list sample width ${n}.`);
	let i = [], a = new DataView(e.buffer, e.byteOffset, e.byteLength);
	for (let n = 1; n + r <= e.length; n += r) r === 1 ? i.push(t ? a.getInt8(n) : a.getUint8(n)) : r === 2 ? i.push(t ? a.getInt16(n, !0) : a.getUint16(n, !0)) : i.push(t ? a.getInt32(n, !0) : a.getUint32(n, !0));
	return i;
}
function vt(e, t, n) {
	let r = [], i = 0;
	for (; i < e.length;) {
		let a = e[i++], o = Math.abs(a);
		if (o < 3 || i + o > e.length) throw Error("Invalid face list run.");
		let s = e.slice(i, i + o);
		if (i += o, s.some((e) => e < 0 || e >= t)) throw Error("Face index out of range.");
		if (n) {
			if (a > 0) for (let e = 2; e < s.length; e++) e & 1 ? r.push(s[e - 1], s[e - 2], s[e]) : r.push(s[e - 2], s[e - 1], s[e]);
			else for (let e = 2; e < s.length; e++) r.push(s[0], s[e - 1], s[e]);
		} else if (a > 0) for (let e = 2; e < s.length; e++) r.push(s[0], s[e - 1], s[e]);
	}
	return r;
}
function yt(e, t, n, r) {
	if (n === 8) {
		if (e.length < t * 3) throw Error("Short 8-bit quantized point payload.");
		let n = new Float32Array(t * 3);
		for (let i = 0; i < t; i++) for (let t = 0; t < 3; t++) {
			let a = e[i * 3 + t], o = r[t], s = r[t + 3];
			n[i * 3 + t] = a === 255 ? s : o + (s - o) * (a / 255);
		}
		return n;
	}
	let i = new Float32Array(t * 3), a = 0, o = (1 << n) - 1;
	for (let s = 0; s < t * 3; s++) {
		let t = 0;
		for (let r = 0; r < n; r++) {
			let n = e[a >> 3] ?? 0;
			t = t << 1 | n >> 7 - (a & 7) & 1, a++;
		}
		let c = s % 3, l = r[c], u = r[c + 3];
		i[s] = t === o ? u : l + (u - l) * (t / o);
	}
	return i;
}
function bt(e, t) {
	return t <= 65535 ? new Uint16Array(e) : new Uint32Array(e);
}
function xt(e, t) {
	let n = new Float32Array(e.length);
	for (let r = 0; r + 2 < t.length; r += 3) {
		let i = t[r] * 3, a = t[r + 1] * 3, o = t[r + 2] * 3, s = e[i], c = e[i + 1], l = e[i + 2], u = e[a], d = e[a + 1], f = e[a + 2], p = e[o], m = e[o + 1], h = e[o + 2], g = u - s, _ = d - c, v = f - l, y = p - s, ee = m - c, b = h - l, x = _ * b - v * ee, S = v * y - g * b, C = g * ee - _ * y;
		n[i] = (n[i] ?? 0) + x, n[i + 1] = (n[i + 1] ?? 0) + S, n[i + 2] = (n[i + 2] ?? 0) + C, n[a] = (n[a] ?? 0) + x, n[a + 1] = (n[a + 1] ?? 0) + S, n[a + 2] = (n[a + 2] ?? 0) + C, n[o] = (n[o] ?? 0) + x, n[o + 1] = (n[o + 1] ?? 0) + S, n[o + 2] = (n[o + 2] ?? 0) + C;
	}
	for (let e = 0; e < n.length; e += 3) {
		let t = n[e], r = n[e + 1], i = n[e + 2], a = Math.hypot(t, r, i) || 1;
		n[e] = t / a, n[e + 1] = r / a, n[e + 2] = i / a;
	}
	return n;
}
function St(e, t, n = Math.PI / 5) {
	if (t.length < 3) return;
	let r = [], i = /* @__PURE__ */ new Map();
	for (let n = 0, a = 0; n + 2 < t.length; n += 3, a++) {
		let o = t[n], s = t[n + 1], c = t[n + 2], l = Ct(e, o, s, c);
		r.push(l), wt(i, o, s, a), wt(i, s, c, a), wt(i, c, o, a);
	}
	let a = Math.cos(n), o = [];
	for (let e of i.values()) if (e.tris.length === 1) o.push(e.a, e.b);
	else if (e.tris.length >= 2) {
		let t = !1;
		for (let n = 0; n < e.tris.length && !t; n++) for (let i = n + 1; i < e.tris.length; i++) {
			let o = r[e.tris[n]], s = r[e.tris[i]];
			if (o[0] * s[0] + o[1] * s[1] + o[2] * s[2] < a) {
				t = !0;
				break;
			}
		}
		t && o.push(e.a, e.b);
	}
	if (o.length !== 0) return bt(o, Math.floor(e.length / 3));
}
function Ct(e, t, n, r) {
	let i = t * 3, a = n * 3, o = r * 3, s = e[i], c = e[i + 1], l = e[i + 2], u = e[a], d = e[a + 1], f = e[a + 2], p = e[o], m = e[o + 1], h = e[o + 2], g = u - s, _ = d - c, v = f - l, y = p - s, ee = m - c, b = h - l, x = _ * b - v * ee, S = v * y - g * b, C = g * ee - _ * y, w = Math.hypot(x, S, C) || 1;
	return x /= w, S /= w, C /= w, [
		x,
		S,
		C
	];
}
function wt(e, t, n, r) {
	let i = Math.min(t, n), a = Math.max(t, n), o = `${i}:${a}`, s = e.get(o);
	s || (s = {
		a: i,
		b: a,
		tris: []
	}, e.set(o, s)), s.tris.push(r);
}
function Tt(e) {
	if (e.length === 0) return {
		min: [
			0,
			0,
			0
		],
		max: [
			1,
			1,
			1
		],
		center: [
			.5,
			.5,
			.5
		],
		radius: 1
	};
	let t = [
		Infinity,
		Infinity,
		Infinity
	], n = [
		-Infinity,
		-Infinity,
		-Infinity
	];
	for (let r of e) for (let e = 0; e < 3; e++) t[e] = Math.min(t[e], r.bounds.min[e]), n[e] = Math.max(n[e], r.bounds.max[e]);
	let r = [
		(t[0] + n[0]) / 2,
		(t[1] + n[1]) / 2,
		(t[2] + n[2]) / 2
	];
	return {
		min: t,
		max: n,
		center: r,
		radius: Math.max(1e-6, Math.hypot(n[0] - r[0], n[1] - r[1], n[2] - r[2]))
	};
}
function Et(e) {
	let t = [
		Infinity,
		Infinity,
		Infinity
	], n = [
		-Infinity,
		-Infinity,
		-Infinity
	];
	for (let r = 0; r < e.length; r += 3) {
		let i = e[r], a = e[r + 1], o = e[r + 2];
		i < t[0] && (t[0] = i), a < t[1] && (t[1] = a), o < t[2] && (t[2] = o), i > n[0] && (n[0] = i), a > n[1] && (n[1] = a), o > n[2] && (n[2] = o);
	}
	return {
		min: t,
		max: n
	};
}
function Dt(e) {
	let t = e * .61803398875 % 1, n = .62, r = .96 - n * .34, i = 2 * n - r;
	return [
		Ot(i, r, t + 1 / 3),
		Ot(i, r, t),
		Ot(i, r, t - 1 / 3)
	];
}
function Ot(e, t, n) {
	return n < 0 && (n += 1), n > 1 && --n, n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function kt(e, t, n) {
	if (t + n * 4 > e.length) throw Error("Float array exceeds W3D stream length.");
	let r = new Float32Array(n), i = new DataView(e.buffer, e.byteOffset + t, n * 4);
	for (let e = 0; e < n; e++) r[e] = i.getFloat32(e * 4, !0);
	return r;
}
function At(e, t) {
	let n = [];
	for (let r = 0; r < t; r++) n.push(Ft(e));
	return n;
}
function jt(e, t) {
	let n = [];
	for (let r = 0; r < t; r++) n.push(F(e));
	return n;
}
function Mt(e, t = 0) {
	return {
		bytes: e,
		pos: t,
		view: new DataView(e.buffer, e.byteOffset, e.byteLength)
	};
}
function Nt(e) {
	if (e.pos >= e.bytes.length) throw Error("Unexpected end of W3D stream.");
	return e.bytes[e.pos++];
}
function Pt(e) {
	let t = e.view.getUint16(e.pos, !0);
	return e.pos += 2, t;
}
function F(e) {
	let t = e.view.getInt32(e.pos, !0);
	return e.pos += 4, t;
}
function Ft(e) {
	let t = e.view.getFloat32(e.pos, !0);
	return e.pos += 4, t;
}
function It(e) {
	return 3 - (e - 1) % 4;
}
// node_modules/.pnpm/dwf-viewer@0.6.7_three@0.186.1/node_modules/dwf-viewer/dist/format/emodelMetadata.js
async function Lt(e, t, n) {
	let r = e.diagnostics;
	e.metadata ??= {}, e.materials ??= [], e.textures ??= [], e.sceneTree ??= [], e.pmi ??= [], e.views ??= [], e.animations ??= [], await Rt(e, t, n, r);
	let i = t.find((e) => /descriptor/i.test(e.role ?? "") || /descriptor\.xml$/i.test(e.path));
	if (i && n.zip.has(i.path)) try {
		zt(e, T(await n.readBytes(i.path)), i.path);
	} catch (e) {
		r.push(x("warning", "EMODEL_DESCRIPTOR_PARSE_FAILED", `Failed to parse eModel descriptor: ${String(e)}`, i.path));
	}
	let a = t.find((e) => /content\s+definition/i.test(e.role ?? "")), o = a && n.zip.has(a.path) ? Vt(e, T(await n.readBytes(a.path)), a.path, r) : [], s = t.find((e) => /content\s+presentation/i.test(e.role ?? "")), c = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map();
	if (s && n.zip.has(s.path)) try {
		let { nodes: t, pmi: r, views: i, animations: a, materials: o } = Ht(T(await n.readBytes(s.path)), s.path, c);
		l = o, e.sceneTree = t, e.pmi = r, e.views = rn(e.views ?? [], i), e.animations = a;
		let u = new Map((e.materials ?? []).map((e) => [e.id, e]));
		for (let t of o.values()) u.set(t.id, Wt(t, e.textures ?? []));
		e.materials = Array.from(u.values());
	} catch (e) {
		r.push(x("warning", "EMODEL_PRESENTATION_PARSE_FAILED", `Failed to parse eModel presentation: ${String(e)}`, s.path));
	}
	qt(e, o, c, l);
	let u = on(e.sceneTree ?? []);
	(e.views?.length ?? 0) > 0 && !e.initialView && (e.initialView = e.views[0]), e.stats.materialCount = e.materials?.length ?? 0, e.stats.textureCount = e.textures?.length ?? 0, e.stats.pmiCount = e.pmi?.length ?? 0, e.stats.nodeCount = u;
}
async function Rt(e, t, n, r) {
	let i = [];
	for (let e of t.filter((e) => /texture/i.test(e.role ?? "") || /texture/i.test(e.title ?? ""))) {
		if (!n.zip.has(e.path)) continue;
		let t, a;
		try {
			let r = ln(await n.readBytes(e.path));
			t = r?.width, a = r?.height;
		} catch (t) {
			r.push(x("warning", "EMODEL_TEXTURE_SIZE_FAILED", `Failed to read texture size: ${String(t)}`, e.path));
		}
		i.push({
			id: e.path,
			name: cn(e.title) ?? sn(e.path),
			path: e.path,
			mediaType: e.mediaType,
			width: t,
			height: a,
			role: e.role
		});
	}
	if (e.textures = i, i.length > 0) {
		let t = i.find((e) => /thread/i.test(e.name ?? "")) ?? i.find((e) => !/environment/i.test(e.name ?? "")) ?? i[0];
		t && (e.materials = [{
			id: "dwfx-default-textured",
			name: "DWFx default material",
			color: [
				.72,
				.74,
				.78
			],
			textureId: t.id,
			roughness: .6,
			metalness: .03,
			doubleSided: !0,
			source: t.path
		}]);
	}
}
function zt(e, t, n) {
	let r = A(t, n), i = r.documentElement;
	if (i) {
		let t = Array.from(i.getElementsByTagName("*")).find((e) => D(e) === "Units")?.getAttribute("type");
		t && (e.metadata.units = t);
		let n = i.getAttribute("name");
		n && (e.metadata.spaceName = n);
	}
	for (let t of Array.from(r.getElementsByTagName("*")).filter((e) => D(e) === "Property")) {
		let n = t.getAttribute("name"), r = t.getAttribute("value");
		n && r && (e.metadata[n] = r);
	}
	let a = Bt(e.metadata);
	a && (e.views = rn(e.views ?? [], [a]), e.initialView = a);
}
function Bt(e) {
	let t = Xt(e._ViewCubeHomeCameraPosition), n = Xt(e._ViewCubeHomeCameraTarget), r = Xt(e._ViewCubeHomeCameraUpVector), i = Xt(e._ViewCubeHomeCameraField);
	if (t || n || r) return {
		id: "descriptor-home-view",
		label: "Home",
		camera: {
			position: t,
			target: n,
			up: r,
			field: i,
			projection: e._ViewCubeHomeCameraProjection === "1" ? "perspective" : "orthographic"
		}
	};
}
function Vt(e, t, n, r) {
	try {
		let r = A(t, n), i = [];
		for (let e of Array.from(r.getElementsByTagName("*")).filter((e) => D(e) === "Instance")) {
			let t = e.getAttribute("id") ?? "";
			t && i.push({
				id: t,
				renderableRef: e.getAttribute("renderableRef") ?? void 0,
				node: e.getAttribute("node") ?? void 0,
				geometricVariation: e.getAttribute("geometricVariation") ?? void 0
			});
		}
		return e.metadata.contentInstanceCount = String(i.length), i;
	} catch (e) {
		return r.push(x("warning", "EMODEL_CONTENTDEF_PARSE_FAILED", `Failed to parse eModel content definition: ${String(e)}`, n)), [];
	}
}
function Ht(e, t, n) {
	let r = A(e, t), i = Array.from(r.getElementsByTagName("*")).filter((e) => D(e) === "View"), a = [];
	for (let e of i) {
		let t = Qt(e);
		for (let e of t) a.push(Kt(e, n));
	}
	if (a.length === 0) for (let e of Array.from(r.getElementsByTagName("*")).filter((e) => D(e) === "ReferenceNode" && !$t(e))) a.push(Kt(e, n));
	let o = [];
	for (let e of Array.from(r.getElementsByTagName("*")).filter((e) => /ModelViewNode|View/i.test(D(e)))) {
		let t = e.getAttribute("id") ?? `view-${o.length + 1}`, n = e.getAttribute("label") ?? e.getAttribute("name") ?? t, r = Zt(e).find((e) => D(e) === "Camera") ?? Array.from(e.getElementsByTagName("*")).find((e) => D(e) === "Camera"), i = r ? Jt(r) : void 0;
		(i || /ModelViewNode/i.test(D(e))) && o.push({
			id: t,
			label: n,
			camera: i
		});
	}
	let s = [];
	for (let e of Array.from(r.getElementsByTagName("*"))) {
		let t = D(e);
		/PMI|Markup|Dimension|Annotation|Callout|Leader|Note/i.test(t) && s.push({
			id: e.getAttribute("id") ?? `pmi-${s.length + 1}`,
			type: /Leader/i.test(t) ? "leader" : /Text|Note|Dimension/i.test(t) ? "text" : "markup",
			label: e.getAttribute("label") ?? e.getAttribute("name") ?? t,
			text: e.getAttribute("text") ?? e.textContent?.trim() ?? void 0,
			targetRef: e.getAttribute("contentElementRefs") ?? e.getAttribute("target") ?? void 0,
			properties: tn(e)
		});
	}
	let c = [];
	for (let e of Array.from(r.getElementsByTagName("*")).filter((e) => /Animation|Sequence|Timeline/i.test(D(e)))) c.push({
		id: e.getAttribute("id") ?? `animation-${c.length + 1}`,
		name: e.getAttribute("label") ?? e.getAttribute("name") ?? D(e),
		targetRef: e.getAttribute("target") ?? void 0
	});
	let l = Ut(r);
	return {
		nodes: a,
		pmi: s,
		views: an(o),
		animations: c,
		materials: l
	};
}
function Ut(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of Array.from(e.getElementsByTagName("*")).filter((e) => D(e) === "InstanceAttributes")) {
		let e = n.getAttribute("id");
		if (!e) continue;
		let r = Zt(n).find((e) => D(e) === "Color") ?? Array.from(n.getElementsByTagName("*")).find((e) => D(e) === "Color");
		if (!r) continue;
		let i = Array.from(r.getElementsByTagName("*")).find((e) => D(e) === "Channel" && /diffuse/i.test(e.getAttribute("type") ?? "")), a = Array.from(r.getElementsByTagName("*")).find((e) => D(e) === "Channel" && /environment/i.test(e.getAttribute("type") ?? "")), o = Number(i?.getAttribute("red")), s = Number(i?.getAttribute("green")), c = Number(i?.getAttribute("blue"));
		if (![
			o,
			s,
			c
		].every(Number.isFinite)) continue;
		let l = Number(r.getAttribute("gloss")), u = cn(a?.getAttribute("name") ?? void 0);
		t.set(e, {
			id: `material-${e}`,
			name: `Material ${e}`,
			color: [
				o,
				s,
				c
			],
			opacity: 1,
			roughness: Number.isFinite(l) ? Math.max(.12, Math.min(.92, 1 - l / 128)) : .58,
			metalness: .03,
			textureName: u,
			doubleSided: !0,
			source: "content-presentation"
		});
	}
	return t;
}
function Wt(e, t) {
	if (e.textureId || !e.textureName) return e;
	let n = Gt(e.textureName), r = t.find((e) => Gt(e.name ?? "").includes(n) || n.includes(Gt(e.name ?? "")));
	return r ? {
		...e,
		textureId: r.id
	} : e;
}
function Gt(e) {
	return e.replace(/&quot;/g, "").replace(/["{}]/g, "").toLowerCase();
}
function Kt(e, t) {
	let n = nn(e.getAttribute("contentElementRefs") ?? e.getAttribute("contentRefs") ?? ""), r = {
		id: e.getAttribute("id") ?? `node-${Math.random().toString(36).slice(2)}`,
		label: e.getAttribute("label") ?? e.getAttribute("name") ?? D(e),
		contentRefs: n,
		meshIds: [],
		children: [],
		properties: tn(e)
	};
	for (let e of n) t.set(e, r);
	for (let n of Qt(e)) r.children.push(Kt(n, t));
	return r;
}
function qt(e, t, n, r) {
	let i = new Map(n), a = t.length === e.meshes.length;
	t.forEach((t, n) => {
		let o = e.meshes[n];
		if (!o) return;
		let s = [t.renderableRef, t.id].filter(Boolean);
		o.selectionRefs = s, o.nodeId = t.node;
		let c = r.get(t.id) ?? (t.renderableRef ? r.get(t.renderableRef) : void 0);
		c && a && (o.materialId = c.id, o.color = c.color);
		for (let e of s) {
			let t = i.get(e);
			if (t) {
				o.name = t.label || o.name, t.meshIds.push(o.id);
				break;
			}
		}
	});
}
function Jt(e) {
	return {
		position: Yt(e, "positionX", "positionY", "positionZ"),
		target: Yt(e, "targetX", "targetY", "targetZ"),
		up: Yt(e, "upVectorX", "upVectorY", "upVectorZ"),
		field: Yt(e, "fieldWidth", "fieldHeight", "fieldDepth"),
		projection: e.getAttribute("projectionType") ?? void 0
	};
}
function Yt(e, t, n, r) {
	let i = [
		Number(e.getAttribute(t)),
		Number(e.getAttribute(n)),
		Number(e.getAttribute(r))
	];
	return i.every(Number.isFinite) ? i : void 0;
}
function Xt(e) {
	if (!e) return;
	let t = e.trim().split(/[\s,]+/).map(Number).filter(Number.isFinite);
	return t.length >= 3 ? [
		t[0],
		t[1],
		t[2]
	] : void 0;
}
function Zt(e) {
	return Array.from(e.children);
}
function Qt(e) {
	let t = [];
	for (let n of Zt(e)) {
		let e = D(n);
		if (e.endsWith("Node")) t.push(n);
		else if (e === "Nodes" || e === "Views") for (let e of Zt(n)) D(e).endsWith("Node") && t.push(e);
	}
	return t;
}
function $t(e) {
	let t = en(e);
	for (; t;) {
		if (D(t) === "ReferenceNode") return !0;
		t = en(t);
	}
	return !1;
}
function en(e) {
	return (e.parentElement ?? e.parentNode) || void 0;
}
function tn(e) {
	let t = {};
	for (let n of Array.from(e.attributes)) t[n.localName || n.name] = n.value;
	return t;
}
function nn(e) {
	return e.trim().split(/[\s,]+/).filter(Boolean);
}
function rn(e, t) {
	return an([...e, ...t]);
}
function an(e) {
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of e) {
		let e = r.id || r.label;
		t.has(e) || (t.add(e), n.push(r));
	}
	return n;
}
function on(e) {
	let t = 0;
	for (let n of e) t += 1 + on(n.children);
	return t;
}
function sn(e) {
	let t = e.lastIndexOf("/");
	return t >= 0 ? e.slice(t + 1) : e;
}
function cn(e) {
	if (e) return e.replace(/^"|"$/g, "").replace(/&quot;/g, "\"");
}
function ln(e) {
	if (e.length >= 24 && e[0] === 137 && e[1] === 80 && e[2] === 78 && e[3] === 71) return {
		width: un(e, 16),
		height: un(e, 20)
	};
	if (e.length >= 4 && e[0] === 255 && e[1] === 216) {
		let t = 2;
		for (; t + 9 < e.length;) {
			if (e[t] !== 255) {
				t++;
				continue;
			}
			let n = e[t + 1];
			for (t += 2; e[t] === 255;) t++;
			if (n === 217 || n === 218 || t + 2 > e.length) break;
			let r = e[t] << 8 | e[t + 1];
			if (r < 2 || t + r > e.length) break;
			if (n >= 192 && n <= 195 || n >= 197 && n <= 199 || n >= 201 && n <= 203 || n >= 205 && n <= 207) return {
				width: e[t + 5] << 8 | e[t + 6],
				height: e[t + 3] << 8 | e[t + 4]
			};
			t += r;
		}
	}
}
function un(e, t) {
	return (e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3]) >>> 0;
}
// node_modules/.pnpm/dwf-viewer@0.6.7_three@0.186.1/node_modules/dwf-viewer/dist/format/dwfx.js
var dn = /* @__PURE__ */ new Set(["http://schemas.microsoft.com/xps/2005/06/fixedrepresentation", "http://schemas.openxps.org/oxps/v1.0/fixedrepresentation"]);
async function fn(e) {
	let t = await Oe(e), n = [], r = [], i = await mn(t, r, n);
	if (r.length === 0) {
		let e = await gn(t, n);
		for (let i of e) try {
			let e = A(await t.readText(i), i), a = Array.from(e.getElementsByTagName("*")).filter((e) => D(e) === "DocumentReference");
			a.length === 0 && n.push(x("warning", "DWFX_NO_DOCREF", `No DocumentReference elements found in ${i}.`, i));
			for (let e of a) {
				let a = e.getAttribute("Source");
				a && await _n(t, ie(i, a), r, n);
			}
		} catch (e) {
			n.push(x("warning", "DWFX_FDSEQ_READ_FAILED", `Failed to read fixed document sequence: ${String(e)}`, i));
		}
	}
	if (r.length === 0) {
		let i = e.entries.filter((e) => /\.fpage$/i.test(e.name));
		for (let [e, a] of i.entries()) {
			let i = await vn(t, a.name, n);
			r.push({
				id: `page-${e + 1}`,
				name: a.name.split("/").pop() ?? `Page ${e + 1}`,
				kind: "xps-fixed-page",
				sourcePath: a.name,
				width: i.width,
				height: i.height,
				diagnostics: []
			});
		}
	}
	if (r.length === 0) {
		let t = e.entries.some((e) => /\.(w3d|hsf)$/i.test(e.name)) || i.some((e) => /emodel/i.test(e.type));
		r.push({
			id: "unsupported-1",
			name: t ? "Unsupported 3D DWFx package" : "Unsupported DWFx package",
			kind: "unsupported",
			width: 1e3,
			height: 1e3,
			reason: t ? "This DWFx package contains 3D eModel/W3D content but no supported 2D FixedPage or preview image resource was found." : "No XPS FixedPage parts or supported DWF manifest preview resources were found.",
			diagnostics: [x("error", "DWFX_NO_PAGES", "No supported renderable page was found in this DWFx package.")]
		});
	}
	return je({
		kind: "dwfx",
		pages: [],
		resources: t.resources,
		diagnostics: n,
		packageEntries: e.entries.map((e) => e.name)
	}, r, e, t);
}
function pn(e) {
	return e.has("[Content_Types].xml") && (e.has("_rels/.rels") || e.entries.some((e) => /\.(fpage|dwfseq)$/i.test(e.name)));
}
async function mn(e, t, n) {
	let r = await hn(e, n), i = [];
	for (let t of r) try {
		let r = yn(await e.readText(t), t);
		i.push(...r), n.push(x("info", "DWFX_DWF_MANIFEST_FOUND", `Found DWFx DWF manifest with ${r.length} section(s).`, t));
	} catch (e) {
		n.push(x("warning", "DWFX_DWF_MANIFEST_PARSE_FAILED", `Failed to parse DWFx DWF manifest: ${String(e)}`, t));
	}
	for (let r of i.filter((e) => bn(e))) {
		let i = En(r, /2d\s+streaming\s+graphics/i) ?? r.resources.find((e) => /\.fpage$/i.test(e.path));
		if (!i || !/\.fpage$/i.test(Dn(i.path))) continue;
		let a = Dn(i.path);
		if (!e.zip.has(a)) continue;
		let o = await vn(e, a, n);
		t.push({
			id: `page-${t.length + 1}`,
			name: r.title || i.title || On(a),
			kind: "xps-fixed-page",
			sourcePath: a,
			width: Number.isFinite(o.width) && o.width > 0 ? o.width : 1e3,
			height: Number.isFinite(o.height) && o.height > 0 ? o.height : 1e3,
			diagnostics: []
		});
	}
	if (t.length > 0) return i;
	for (let n of i.filter((e) => xn(e))) {
		let r = Sn(n, e.zip), i = En(n, /3d\s+streaming\s+graphics/i) ?? n.resources.find((e) => /\.(w3d|hsf)$/i.test(e.path));
		if (i && e.zip.has(i.path)) try {
			let r = await it(await e.zip.read(i.path), {
				title: n.title || i.title || On(i.path),
				sourcePath: i.path
			});
			if (await Lt(r, n.resources, e), r.meshes.length > 0) {
				t.push({
					id: `w3d-${t.length + 1}`,
					name: n.title || i.title || On(i.path),
					kind: "w3d-model",
					sourcePath: i.path,
					width: 1e3,
					height: 1e3,
					model: r,
					diagnostics: r.diagnostics
				});
				continue;
			}
			t.push({
				id: `unsupported-3d-${t.length + 1}`,
				name: n.title || "Unsupported 3D eModel",
				kind: "unsupported",
				width: 1e3,
				height: 1e3,
				sourcePath: i.path,
				reason: "A W3D/HSF 3D stream exists, but no renderable shell geometry was decoded.  The package is intentionally not shown as a thumbnail so this failure is visible during production validation.",
				diagnostics: [...r.diagnostics, x("warning", "DWFX_3D_W3D_UNSUPPORTED", "Detected a 3D W3D resource, but no renderable shell geometry was decoded.", i.path)]
			});
			continue;
		} catch (e) {
			t.push({
				id: `unsupported-3d-${t.length + 1}`,
				name: n.title || "Unsupported 3D eModel",
				kind: "unsupported",
				width: 1e3,
				height: 1e3,
				sourcePath: i.path,
				reason: `A W3D/HSF 3D stream exists, but geometry parsing failed: ${String(e)}`,
				diagnostics: [x("warning", "DWFX_W3D_PARSE_FAILED", `Failed to parse W3D geometry: ${String(e)}`, i.path)]
			});
			continue;
		}
		if (r && e.zip.has(r.path)) {
			let i = kn(await e.zip.read(r.path)) ?? {
				width: 1e3,
				height: 1e3
			};
			t.push({
				id: `image-${t.length + 1}`,
				name: n.title || r.title || On(r.path),
				kind: "image",
				sourcePath: r.path,
				mediaType: r.mediaType ?? ve(r.path) ?? "image/png",
				width: i.width,
				height: i.height,
				diagnostics: [x("info", "DWFX_3D_PREVIEW_ONLY", "No W3D/HSF geometry stream was declared; showing the embedded section preview image.", r.path)]
			});
		}
	}
	return i;
}
async function hn(e, t) {
	let n = /* @__PURE__ */ new Set(), r = (e) => {
		e && n.add(E(Dn(e)));
	}, i = /* @__PURE__ */ new Set();
	try {
		let t = await e.getRelationships("");
		for (let e of t) (/documentsequence/i.test(e.type) || /\.dwfseq$/i.test(e.resolvedTarget)) && i.add(E(e.resolvedTarget)), /document$/i.test(e.type) && /manifest\.xml$/i.test(e.resolvedTarget) && r(e.resolvedTarget);
	} catch (e) {
		t.push(x("warning", "DWFX_DWFSEQ_RELS_FAILED", `Failed to inspect DWFx package relationships: ${String(e)}`));
	}
	for (let t of e.zip.entries) /\.dwfseq$/i.test(t.name) && i.add(t.name);
	for (let n of i) if (e.zip.has(n)) try {
		let t = A(await e.readText(n), n), i = Array.from(t.getElementsByTagName("*")).filter((e) => D(e) === "ManifestReference");
		for (let e of i) r(e.getAttribute("Source") ?? e.getAttribute("source") ?? void 0);
		let a = await e.getRelationships(n).catch(() => []);
		for (let e of a) (/document/i.test(e.type) || /manifest\.xml$/i.test(e.resolvedTarget)) && r(e.resolvedTarget);
	} catch (e) {
		t.push(x("warning", "DWFX_DWFSEQ_READ_FAILED", `Failed to read DWFDocumentSequence ${n}: ${String(e)}`, n));
	}
	for (let t of e.zip.entries) /^dwf\/documents\/.*\/manifest\.xml$/i.test(t.name) && r(t.name);
	return Array.from(n).filter((t) => e.zip.has(t));
}
async function gn(e, t) {
	let n = /* @__PURE__ */ new Set();
	try {
		let t = await e.getRelationships("");
		for (let e of t) (dn.has(e.type) || /fixedrepresentation/i.test(e.type) || /\.fdseq$/i.test(e.resolvedTarget)) && n.add(E(e.resolvedTarget));
	} catch (e) {
		t.push(x("warning", "DWFX_ROOT_RELS_FAILED", `Failed to read package relationships: ${String(e)}`));
	}
	for (let t of e.overrides) (/fixeddocumentsequence/i.test(t.contentType) || /\.fdseq$/i.test(t.partName)) && n.add(t.partName);
	for (let t of e.zip.entries) /\.fdseq$/i.test(t.name) && n.add(t.name);
	return Array.from(n);
}
async function _n(e, t, n, r) {
	let i;
	try {
		i = await e.readText(t);
	} catch (e) {
		r.push(x("warning", "DWFX_FDOC_READ_FAILED", `Failed to read fixed document ${t}: ${String(e)}`, t));
		return;
	}
	let a = A(i, t), o = Array.from(a.getElementsByTagName("*")).filter((e) => D(e) === "PageContent");
	for (let i of o) {
		let a = i.getAttribute("Source");
		if (!a) continue;
		let o = ie(t, Dn(a)), s = a.startsWith("#") ? a.slice(1) : void 0;
		if (s) {
			let n = (await e.getRelationships(t)).find((e) => e.id === s);
			n && (o = n.resolvedTarget);
		}
		o = Dn(o);
		let c = i.getAttribute("Width"), l = i.getAttribute("Height"), u = c && l ? {
			width: Number(c),
			height: Number(l)
		} : await vn(e, o, r), d = n.length + 1;
		n.push({
			id: `page-${d}`,
			name: `Page ${d}`,
			kind: "xps-fixed-page",
			sourcePath: o,
			width: Number.isFinite(u.width) && u.width > 0 ? u.width : 1e3,
			height: Number.isFinite(u.height) && u.height > 0 ? u.height : 1e3,
			diagnostics: []
		});
	}
}
async function vn(e, t, n) {
	try {
		let n = Dn(t), r = A(T(await e.readBytes(n)), n), i = r.documentElement ?? Array.from(r.getElementsByTagName("*"))[0];
		return {
			width: Number(i?.getAttribute("Width") ?? 1e3),
			height: Number(i?.getAttribute("Height") ?? 1e3)
		};
	} catch (e) {
		return n.push(x("warning", "DWFX_PAGE_SIZE_FAILED", `Failed to read FixedPage size: ${String(e)}`, t)), {
			width: 1e3,
			height: 1e3
		};
	}
}
function yn(e, t) {
	let n = A(e, t);
	return Array.from(n.getElementsByTagName("*")).filter((e) => D(e) === "Section").map((e, t) => {
		let n = wn(e, "name") ?? `section-${t + 1}`, r = wn(e, "title") ?? n;
		return {
			type: wn(e, "type") ?? "",
			name: n,
			title: r,
			resources: Array.from(e.getElementsByTagName("*")).filter((e) => D(e).endsWith("Resource") || D(e) === "Resource").map((e) => ({
				path: E(Dn(wn(e, "href") ?? "")),
				role: wn(e, "role"),
				mediaType: wn(e, "mime"),
				title: wn(e, "title"),
				size: Tn(e, "size")
			})).filter((e) => e.path.length > 0)
		};
	}).filter((e) => e.resources.length > 0 || e.type.length > 0);
}
function bn(e) {
	return /(^|\.)ePlot$/i.test(e.type) || /com\.autodesk\.dwf\.ePlot$/i.test(e.type);
}
function xn(e) {
	return /(^|\.)eModel$/i.test(e.type) || /com\.autodesk\.dwf\.eModel$/i.test(e.type);
}
function Sn(e, t) {
	let n = e.resources.filter((e) => /^(image\/|application\/octet-stream)/i.test(e.mediaType ?? "") || /\.(png|jpe?g|gif|bmp)$/i.test(e.path)), r = n.filter((e) => /thumbnail|preview/i.test(e.role ?? "") || /thumbnail|preview/i.test(e.title ?? "")), i = r.length > 0 ? r : n.filter((e) => !/texture/i.test(e.role ?? ""));
	return (i.length > 0 ? i : n).filter((e) => t.has(e.path)).sort((e, t) => Cn(t) - Cn(e))[0];
}
function Cn(e) {
	let t = e.size ?? 0;
	return /thumbnail/i.test(e.role ?? "") && (t += 5e6), /preview/i.test(e.role ?? "") && (t += 4e6), /icon/i.test(e.role ?? "") && (t -= 2e6), /texture/i.test(e.role ?? "") && (t -= 3e6), t;
}
function wn(e, t) {
	return e.getAttribute(t) ?? e.getAttribute(`dwf:${t}`) ?? e.getAttribute(`ePlot:${t}`) ?? e.getAttribute(`eModel:${t}`) ?? Array.from(e.attributes).find((e) => e.localName === t)?.value ?? void 0;
}
function Tn(e, t) {
	let n = wn(e, t);
	if (n === void 0) return;
	let r = Number(n);
	return Number.isFinite(r) ? r : void 0;
}
function En(e, t) {
	return e.resources.find((e) => t.test(e.role ?? ""));
}
function Dn(e) {
	return E((e.split(/[?#]/)[0] ?? e).replace(/^\//, ""));
}
function On(e) {
	let t = Dn(e), n = t.lastIndexOf("/");
	return n >= 0 ? t.slice(n + 1) : t;
}
function kn(e) {
	if (e.length >= 24 && e[0] === 137 && e[1] === 80 && e[2] === 78 && e[3] === 71) return {
		width: An(e, 16),
		height: An(e, 20)
	};
	if (e.length >= 4 && e[0] === 255 && e[1] === 216) {
		let t = 2;
		for (; t + 9 < e.length;) {
			if (e[t] !== 255) {
				t++;
				continue;
			}
			let n = e[t + 1];
			for (t += 2; e[t] === 255;) t++;
			if (n === 217 || n === 218 || t + 2 > e.length) break;
			let r = e[t] << 8 | e[t + 1];
			if (r < 2 || t + r > e.length) break;
			if (n >= 192 && n <= 195 || n >= 197 && n <= 199 || n >= 201 && n <= 203 || n >= 205 && n <= 207) return {
				width: e[t + 5] << 8 | e[t + 6],
				height: e[t + 3] << 8 | e[t + 4]
			};
			t += r;
		}
	}
}
function An(e, t) {
	return (e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3]) >>> 0;
}
// node_modules/.pnpm/dwf-viewer@0.6.7_three@0.186.1/node_modules/dwf-viewer/dist/render/xpsPath.js
function jn(e) {
	let t = Pn(e), n = [], r = 0, i = "", a = 0, o = 0, s = 0, c = 0, l, u, d = () => r < t.length && t[r]?.kind === "num", f = () => {
		let e = t[r++];
		if (!e || e.kind !== "num") throw Error(`Expected number in path data near token ${r}.`);
		return e.value;
	}, p = () => f() !== 0;
	for (; r < t.length;) {
		let e = t[r];
		if (!e) break;
		if (e.kind === "cmd") {
			if (i = e.value, r++, i === "F" || i === "f") {
				d() && f();
				continue;
			}
		} else if (!i) {
			r++;
			continue;
		}
		let m = i === i.toLowerCase(), h = i.toUpperCase(), g = (e) => m ? a + e : e, _ = (e) => m ? o + e : e;
		if (h === "M") {
			if (!d()) continue;
			let e = g(f()), t = _(f());
			for (n.push({
				type: "M",
				x: e,
				y: t
			}), a = s = e, o = c = t, l = u = void 0; d();) {
				let e = g(f()), t = _(f());
				n.push({
					type: "L",
					x: e,
					y: t
				}), a = e, o = t;
			}
		} else if (h === "L") for (; d();) {
			let e = g(f()), t = _(f());
			n.push({
				type: "L",
				x: e,
				y: t
			}), a = e, o = t, l = u = void 0;
		}
		else if (h === "H") for (; d();) {
			let e = g(f());
			n.push({
				type: "L",
				x: e,
				y: o
			}), a = e, l = u = void 0;
		}
		else if (h === "V") for (; d();) {
			let e = _(f());
			n.push({
				type: "L",
				x: a,
				y: e
			}), o = e, l = u = void 0;
		}
		else if (h === "C") for (; d();) {
			let e = g(f()), t = _(f()), r = g(f()), i = _(f()), s = g(f()), c = _(f());
			n.push({
				type: "C",
				x1: e,
				y1: t,
				x2: r,
				y2: i,
				x: s,
				y: c
			}), a = s, o = c, l = {
				x: r,
				y: i
			}, u = void 0;
		}
		else if (h === "S") for (; d();) {
			let e = l ? {
				x: 2 * a - l.x,
				y: 2 * o - l.y
			} : {
				x: a,
				y: o
			}, t = g(f()), r = _(f()), i = g(f()), s = _(f());
			n.push({
				type: "C",
				x1: e.x,
				y1: e.y,
				x2: t,
				y2: r,
				x: i,
				y: s
			}), a = i, o = s, l = {
				x: t,
				y: r
			}, u = void 0;
		}
		else if (h === "Q") for (; d();) {
			let e = g(f()), t = _(f()), r = g(f()), i = _(f());
			n.push({
				type: "Q",
				x1: e,
				y1: t,
				x: r,
				y: i
			}), a = r, o = i, u = {
				x: e,
				y: t
			}, l = void 0;
		}
		else if (h === "T") for (; d();) {
			let e = u ? {
				x: 2 * a - u.x,
				y: 2 * o - u.y
			} : {
				x: a,
				y: o
			}, t = g(f()), r = _(f());
			n.push({
				type: "Q",
				x1: e.x,
				y1: e.y,
				x: t,
				y: r
			}), a = t, o = r, u = e, l = void 0;
		}
		else if (h === "A") for (; d();) {
			let e = Math.abs(f()), t = Math.abs(f()), r = f(), i = p(), s = p(), c = g(f()), d = _(f());
			n.push({
				type: "A",
				rx: e,
				ry: t,
				rotation: r,
				largeArc: i,
				sweep: s,
				x: c,
				y: d
			}), a = c, o = d, l = u = void 0;
		}
		else h === "Z" ? (n.push({ type: "Z" }), a = s, o = c, l = u = void 0) : r++;
	}
	return n;
}
function Mn(e, t) {
	let n = 0, r = 0, i = 0, a = 0;
	for (let o of t) switch (o.type) {
		case "M":
			e.moveTo(o.x, o.y), n = i = o.x, r = a = o.y;
			break;
		case "L":
			e.lineTo(o.x, o.y), n = o.x, r = o.y;
			break;
		case "C":
			e.bezierCurveTo(o.x1, o.y1, o.x2, o.y2, o.x, o.y), n = o.x, r = o.y;
			break;
		case "Q":
			e.quadraticCurveTo(o.x1, o.y1, o.x, o.y), n = o.x, r = o.y;
			break;
		case "A": {
			let t = Rn(n, r, o.rx, o.ry, o.rotation, o.largeArc, o.sweep, o.x, o.y, 32);
			for (let [n, r] of t) e.lineTo(n, r);
			n = o.x, r = o.y;
			break;
		}
		case "Z": e.closePath(), n = i, r = a;
	}
}
function Nn(e, t = .75) {
	let n = [], r, i = 0, a = 0, o = 0, s = 0, c = () => (r || (r = {
		points: [],
		closed: !1
	}, n.push(r)), r), l = (e, t) => {
		let n = c(), r = n.points.length;
		r >= 2 && Math.abs(n.points[r - 2] - e) < 1e-9 && Math.abs(n.points[r - 1] - t) < 1e-9 || n.points.push(e, t);
	};
	for (let c of e) switch (c.type) {
		case "M":
			r = {
				points: [c.x, c.y],
				closed: !1
			}, n.push(r), i = o = c.x, a = s = c.y;
			break;
		case "L":
			l(c.x, c.y), i = c.x, a = c.y;
			break;
		case "C": {
			let e = Fn(i, a, c.x, c.y, t);
			for (let t = 1; t <= e; t++) {
				let n = t / e;
				l(In(i, c.x1, c.x2, c.x, n), In(a, c.y1, c.y2, c.y, n));
			}
			i = c.x, a = c.y;
			break;
		}
		case "Q": {
			let e = Fn(i, a, c.x, c.y, t);
			for (let t = 1; t <= e; t++) {
				let n = t / e;
				l(Ln(i, c.x1, c.x, n), Ln(a, c.y1, c.y, n));
			}
			i = c.x, a = c.y;
			break;
		}
		case "A": {
			let e = Rn(i, a, c.rx, c.ry, c.rotation, c.largeArc, c.sweep, c.x, c.y, Math.max(8, Math.ceil(24 / Math.max(t, .1))));
			for (let [t, n] of e) l(t, n);
			i = c.x, a = c.y;
			break;
		}
		case "Z": r && (l(o, s), r.closed = !0), i = o, a = s;
	}
	return n.filter((e) => e.points.length >= 2);
}
function Pn(e) {
	let t = [], n = /([MmLlHhVvCcSsQqTtAaZzFf])|([-+]?(?:\d+\.\d*|\.\d+|\d+)(?:[eE][-+]?\d+)?)/g, r;
	for (; (r = n.exec(e)) !== null;) r[1] ? t.push({
		kind: "cmd",
		value: r[1]
	}) : r[2] && t.push({
		kind: "num",
		value: Number(r[2])
	});
	return t;
}
function Fn(e, t, n, r, i) {
	let a = Math.hypot(n - e, r - t);
	return Math.max(4, Math.min(96, Math.ceil(a / Math.max(1.5, i * 6))));
}
function In(e, t, n, r, i) {
	let a = 1 - i;
	return a * a * a * e + 3 * a * a * i * t + 3 * a * i * i * n + i * i * i * r;
}
function Ln(e, t, n, r) {
	let i = 1 - r;
	return i * i * e + 2 * i * r * t + r * r * n;
}
function Rn(e, t, n, r, i, a, o, s, c, l) {
	if (n === 0 || r === 0 || Math.abs(e - s) < 1e-9 && Math.abs(t - c) < 1e-9) return [[s, c]];
	let u = i * Math.PI / 180, d = Math.cos(u), f = Math.sin(u), p = (e - s) / 2, m = (t - c) / 2, h = d * p + f * m, g = -f * p + d * m;
	n = Math.abs(n), r = Math.abs(r);
	let _ = h * h / (n * n) + g * g / (r * r);
	if (_ > 1) {
		let e = Math.sqrt(_);
		n *= e, r *= e;
	}
	let v = n * n, y = r * r, ee = h * h, b = g * g, x = (v * y - v * b - y * ee) / (v * b + y * ee);
	x = Math.max(0, x);
	let S = (a === o ? -1 : 1) * Math.sqrt(x), C = S * (n * g / r), w = S * (-r * h / n), te = d * C - f * w + (e + s) / 2, ne = f * C + d * w + (t + c) / 2, T = (h - C) / n, E = (g - w) / r, re = (-h - C) / n, ie = (-g - w) / r, ae = Math.atan2(E, T), D = Math.atan2(T * ie - E * re, T * re + E * ie);
	!o && D > 0 && (D -= 2 * Math.PI), o && D < 0 && (D += 2 * Math.PI);
	let O = Math.max(2, Math.min(l, Math.ceil(Math.abs(D) / (Math.PI / 16)))), k = [];
	for (let e = 1; e <= O; e++) {
		let t = ae + D * e / O, i = d * n * Math.cos(t) - f * r * Math.sin(t) + te, a = f * n * Math.cos(t) + d * r * Math.sin(t) + ne;
		k.push([i, a]);
	}
	return k;
}
// node_modules/.pnpm/dwf-viewer@0.6.7_three@0.186.1/node_modules/dwf-viewer/dist/format/legacyAsciiDwf.js
var zn = 1e6, Bn = /^\uFEFF?\s*\(DWF\s+V\d{2}\.\d{2}(?:\s|\))/i;
function Vn(e) {
	return Bn.test(e);
}
function Hn(e, t) {
	let n = new Zn(e), r = [], i = [], a = [], o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Set(), c, l, u, d = 0, f = "#000000", p = !1, m = !0, h = 1, g = 1, _ = 0, v = !1, y = !1, ee = (e) => {
		o.set(e, (o.get(e) ?? 0) + 1);
	}, b = (e) => {
		if (!(!Number.isInteger(e) || e < 0)) return a[e];
	}, S = (e) => {
		let i = n.readInteger();
		if (i === void 0 || i < 1 || i > zn) {
			r.push(x("error", "LEGACY_ASCII_DWF_INVALID_POINT_COUNT", `Opcode ${e} has an invalid point count at byte ${n.position}.`, t)), y = !0;
			return;
		}
		let a = Array(i * 2);
		for (let o = 0; o < i; o++) {
			let s = n.readPoint();
			if (!s) {
				r.push(x("error", "LEGACY_ASCII_DWF_TRUNCATED_POINT_SET", `Opcode ${e} ended before point ${o + 1} of ${i} at byte ${n.position}.`, t)), y = !0;
				return;
			}
			a[o * 2] = s[0], a[o * 2 + 1] = s[1];
		}
		return a;
	};
	for (; !n.eof && !v && !y && (n.skipWhitespace(), !n.eof);) {
		let e = n.position, o = n.peek();
		if (o === "(") {
			let i = n.readExtendedAscii();
			if (i === void 0) {
				r.push(x("error", "LEGACY_ASCII_DWF_UNTERMINATED_EXTENDED_OPCODE", `Unterminated extended ASCII opcode at byte ${e}.`, t));
				break;
			}
			let o = Gn(i);
			if (!o) continue;
			let s = o.name.toLowerCase();
			if (ee(`(${o.name})`), s === "dwf") c = o.operands.match(/\bV\d{2}\.\d{2}\b/i)?.[0]?.toUpperCase();
			else if (s === "colormap") {
				let e = Kn(o.operands), n = e[0];
				if (n === void 0 || !Number.isInteger(n) || n < 1) r.push(x("warning", "LEGACY_ASCII_DWF_INVALID_COLORMAP", "The legacy DWF ColorMap does not declare a valid color count.", t));
				else {
					let i = Math.floor((e.length - 1) / 4), o = Math.min(n, i);
					a.length = 0;
					for (let t = 0; t < o; t++) {
						let n = 1 + t * 4;
						a.push(qn(e[n], e[n + 1], e[n + 2], e[n + 3]));
					}
					i < n && r.push(x("warning", "LEGACY_ASCII_DWF_TRUNCATED_COLORMAP", `ColorMap declares ${n} colors but contains ${i}.`, t)), d !== void 0 && (f = b(d) ?? f), u !== void 0 && (l = b(u) ?? l);
				}
			} else if (s === "background") {
				let e = Kn(o.operands);
				e.length === 1 && Number.isInteger(e[0]) ? (u = e[0], l = b(e[0]) ?? l) : e.length >= 3 && (l = qn(e[0], e[1], e[2], e[3] ?? 255), u = void 0);
			} else if (s === "color") {
				let e = Kn(o.operands);
				e.length === 1 && Number.isInteger(e[0]) ? (d = e[0], f = b(e[0]) ?? f) : e.length >= 3 && (f = qn(e[0], e[1], e[2], e[3] ?? 255), d = void 0);
			} else if (s === "lineweight") {
				let e = Kn(o.operands)[0];
				e !== void 0 && Number.isFinite(e) && (h = Math.max(.2, Math.abs(e)));
			} else if (s === "markersize") {
				let e = Kn(o.operands)[0];
				e !== void 0 && Number.isFinite(e) && (g = Math.max(1, Math.abs(e)));
			} else if (s === "visibility") {
				let e = o.operands.trim().toLowerCase(), t = Kn(e)[0];
				m = t === void 0 ? !/^(?:off|false|hidden)\b/.test(e) : t !== 0;
			} else s === "endofdwf" && (v = !0);
		} else if (!o || !Yn(o)) n.skipLine();
		else {
			switch (n.advance(), ee(o), o) {
				case "C": {
					let e = n.readInteger();
					if (e === void 0) {
						r.push(x("error", "LEGACY_ASCII_DWF_INVALID_COLOR_INDEX", `Color opcode C is missing its palette index at byte ${n.position}.`, t)), y = !0;
						break;
					}
					d = e;
					let i = b(e);
					i && (f = i);
					break;
				}
				case "F":
					p = !0;
					break;
				case "f":
					p = !1;
					break;
				case "V":
					m = !0;
					break;
				case "v":
					m = !1;
					break;
				case "L": {
					let e = n.readPoint(), a = n.readPoint();
					if (!e || !a) {
						r.push(x("error", "LEGACY_ASCII_DWF_TRUNCATED_LINE", `Line opcode L is missing coordinates at byte ${n.position}.`, t)), y = !0;
						break;
					}
					m ? i.push({
						type: "polyline",
						points: [
							e[0],
							e[1],
							a[0],
							a[1]
						],
						stroke: f,
						lineWidth: h
					}) : _++;
					break;
				}
				case "P": {
					let e = S(o);
					if (!e) break;
					m ? p && e.length >= 6 ? i.push({
						type: "polygon",
						points: e,
						fill: f
					}) : i.push({
						type: "polyline",
						points: e,
						stroke: f,
						lineWidth: h
					}) : _++;
					break;
				}
				case "T": {
					let e = S(o);
					if (!e) break;
					if (!m) {
						_++;
						break;
					}
					Un(i, e, f);
					break;
				}
				case "M": {
					let e = S(o);
					if (!e) break;
					if (!m) {
						_++;
						break;
					}
					let t = Math.max(1, g, h);
					for (let n = 0; n + 1 < e.length; n += 2) i.push({
						type: "rect",
						x: e[n] - t / 2,
						y: e[n + 1] - t / 2,
						width: t,
						height: t,
						fill: f
					});
					break;
				}
				default: s.add(Xn(o)), n.skipLine();
			}
			n.position <= e && n.advance();
		}
	}
	let C = Wn(i), w = i.length, te = c ?? "legacy ASCII DWF";
	if (w === 0) r.push(x("warning", "LEGACY_ASCII_DWF_NO_GEOMETRY", `${te} contained no supported visible geometry.`, t));
	else {
		let e = [
			"L",
			"P",
			"T",
			"M"
		].map((e) => `${e}=${o.get(e) ?? 0}`).join(", "), n = _ > 0 ? `; skipped ${_} hidden geometry operation(s)` : "";
		r.push(x("info", "LEGACY_ASCII_DWF_PARSED", `Parsed ${te} readable WHIP!/W2D stream (${e}) into ${w} geometry primitive(s)${n}.`, t));
	}
	return s.size > 0 && r.push(x("warning", "LEGACY_ASCII_DWF_UNSUPPORTED_OPCODES", `Ignored unsupported readable WHIP!/W2D opcode(s): ${Array.from(s).sort().join(", ")}.`, t)), v || r.push(x("warning", "LEGACY_ASCII_DWF_MISSING_END", "The readable WHIP!/W2D stream did not contain a complete (EndOfDWF) marker.", t)), l && C && i.unshift({
		type: "rect",
		x: C.minX,
		y: C.minY,
		width: Math.max(1, C.maxX - C.minX),
		height: Math.max(1, C.maxY - C.minY),
		fill: l
	}), {
		primitives: i,
		diagnostics: r,
		bounds: C,
		version: c,
		background: l
	};
}
function Un(e, t, n) {
	let r = Math.floor(t.length / 2);
	for (let i = 2; i < r; i++) {
		let r = i % 2 == 0 ? i - 2 : i - 1, a = i % 2 == 0 ? i - 1 : i - 2, o = t[r * 2], s = t[r * 2 + 1], c = t[a * 2], l = t[a * 2 + 1], u = t[i * 2], d = t[i * 2 + 1];
		(c - o) * (d - s) - (l - s) * (u - o) !== 0 && e.push({
			type: "polygon",
			points: [
				o,
				s,
				c,
				l,
				u,
				d
			],
			fill: n
		});
	}
}
function Wn(e) {
	let t = Infinity, n = Infinity, r = -Infinity, i = -Infinity, a = (e, a) => {
		t = Math.min(t, e), n = Math.min(n, a), r = Math.max(r, e), i = Math.max(i, a);
	};
	for (let t of e) if ("points" in t) for (let e = 0; e + 1 < t.points.length; e += 2) a(t.points[e], t.points[e + 1]);
	else if (t.type === "rect") a(t.x, t.y), a(t.x + t.width, t.y + t.height);
	else if (t.type === "text") {
		let e = t.size ?? 12;
		a(t.x, t.y), a(t.x + t.text.length * e * .6, t.y + e);
	} else if (t.type === "path") for (let e of t.commands) "x" in e && "y" in e && typeof e.x == "number" && typeof e.y == "number" && a(e.x, e.y), "x1" in e && "y1" in e && typeof e.x1 == "number" && typeof e.y1 == "number" && a(e.x1, e.y1), "x2" in e && "y2" in e && typeof e.x2 == "number" && typeof e.y2 == "number" && a(e.x2, e.y2);
	return Number.isFinite(t) ? {
		minX: t,
		minY: n,
		maxX: r,
		maxY: i
	} : void 0;
}
function Gn(e) {
	let t = e.trimStart(), n = t.match(/^([^\s()]+)/);
	if (n?.[1]) return {
		name: n[1],
		operands: t.slice(n[1].length)
	};
}
function Kn(e) {
	return Array.from(e.matchAll(/[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/g), (e) => Number(e[0]));
}
function qn(e, t, n, r = 255) {
	let i = Jn(e), a = Jn(t), o = Jn(n), s = Jn(r);
	return s === 255 ? `rgb(${i}, ${a}, ${o})` : `rgba(${i}, ${a}, ${o}, ${Number((s / 255).toFixed(4))})`;
}
function Jn(e) {
	return Math.max(0, Math.min(255, Math.round(e)));
}
function Yn(e) {
	let t = e.charCodeAt(0);
	return t >= 65 && t <= 90 || t >= 97 && t <= 122;
}
function Xn(e) {
	let t = e.charCodeAt(0);
	return t >= 32 && t <= 126 ? e : `0x${t.toString(16).padStart(2, "0")}`;
}
var Zn = class {
	constructor(e) {
		this.source = e, this.position = 0;
	}
	get eof() {
		return this.position >= this.source.length;
	}
	peek() {
		return this.source[this.position];
	}
	advance() {
		this.eof || this.position++;
	}
	skipWhitespace() {
		for (; !this.eof;) {
			let e = this.source.charCodeAt(this.position);
			if (e !== 32 && e !== 9 && e !== 10 && e !== 13 && e !== 12) break;
			this.position++;
		}
	}
	skipLine() {
		for (; !this.eof && this.source.charCodeAt(this.position++) !== 10;);
	}
	readInteger() {
		let e = this.readNumber();
		return e !== void 0 && Number.isInteger(e) ? e : void 0;
	}
	readPoint() {
		let e = this.position, t = this.readNumber();
		if (t === void 0 || (this.skipWhitespace(), this.source[this.position] !== ",")) {
			this.position = e;
			return;
		}
		this.position++;
		let n = this.readNumber();
		if (n === void 0) this.position = e;
		else return [t, n];
	}
	readNumber() {
		this.skipWhitespace();
		let e = this.position;
		(this.source[this.position] === "+" || this.source[this.position] === "-") && this.position++;
		let t = 0;
		for (; !this.eof && Qn(this.source.charCodeAt(this.position));) this.position++, t++;
		if (this.source[this.position] === ".") for (this.position++; !this.eof && Qn(this.source.charCodeAt(this.position));) this.position++, t++;
		if (t === 0) {
			this.position = e;
			return;
		}
		if (this.source[this.position] === "e" || this.source[this.position] === "E") {
			let e = this.position;
			this.position++, (this.source[this.position] === "+" || this.source[this.position] === "-") && this.position++;
			let t = 0;
			for (; !this.eof && Qn(this.source.charCodeAt(this.position));) this.position++, t++;
			t === 0 && (this.position = e);
		}
		let n = Number(this.source.slice(e, this.position));
		if (!Number.isFinite(n)) this.position = e;
		else return n;
	}
	readExtendedAscii() {
		if (this.source[this.position] !== "(") return;
		let e = this.position++, t = 1, n, r = !1;
		for (; !this.eof;) {
			let i = this.source[this.position++];
			if (n) r ? r = !1 : i === "\\" ? r = !0 : i === n && (n = void 0);
			else if (i === "'" || i === "\"") n = i;
			else if (i === "(") t++;
			else if (i === ")" && (t--, t === 0)) return this.source.slice(e + 1, this.position - 1);
		}
	}
};
function Qn(e) {
	return e >= 48 && e <= 57;
}
// node_modules/.pnpm/dwf-viewer@0.6.7_three@0.186.1/node_modules/dwf-viewer/dist/format/w2dText.js
function $n(e, t) {
	let n = T(e);
	if (Vn(n)) return {
		format: "legacy-ascii-dwf",
		...Hn(n, t)
	};
	let r = [], i = [], a = "#000000", o, s = 1, c = 0;
	if (/<svg[\s>]/i.test(n)) {
		let e = n.matchAll(/<path\b[^>]*\bd=["']([^"']+)["'][^>]*>/gi);
		for (let t of e) {
			let e = t[0], n = t[1];
			i.push({
				type: "path",
				commands: jn(n),
				stroke: tr(e, "stroke") ?? a,
				fill: tr(e, "fill") ?? void 0,
				lineWidth: Number(tr(e, "stroke-width") ?? s)
			}), c++;
		}
		let t = n.matchAll(/<(polyline|polygon)\b[^>]*\bpoints=["']([^"']+)["'][^>]*>/gi);
		for (let e of t) {
			let t = e[0], n = j(e[2]);
			n.length >= 4 && i.push({
				type: e[1].toLowerCase() === "polygon" ? "polygon" : "polyline",
				points: n,
				stroke: tr(t, "stroke") ?? a,
				fill: tr(t, "fill") ?? void 0,
				lineWidth: Number(tr(t, "stroke-width") ?? s)
			}), c++;
		}
	}
	let l = n.split(/\r?\n/);
	for (let e of l) {
		let t = e.trim();
		if (!t || t.startsWith("#") || t.startsWith("//")) continue;
		let n = t.toLowerCase(), r = j(t);
		if (/^(color|stroke|pen|wt_color)\b/i.test(t)) a = nr(t) ?? a, c++;
		else if (/^(fill|brush|wt_fill)\b/i.test(t)) o = nr(t) ?? o ?? "#000000", c++;
		else if (/^(nofill|fillnone)\b/i.test(t)) o = void 0, c++;
		else if (/^(linewidth|lineweight|weight|wt_line_weight)\b/i.test(t) && r.length >= 1) s = Math.max(.2, r[0]), c++;
		else if ((/^path\b/i.test(t) || /\bPath\s*Data\b/.test(t)) && /[MmLlCcQqAaZz]/.test(t)) {
			let e = t.replace(/^path\b[:=]?/i, "").replace(/^.*?Data\s*=\s*/i, "").replace(/^['"]|['"]$/g, "");
			i.push({
				type: "path",
				commands: jn(e),
				stroke: a,
				fill: o,
				lineWidth: s
			}), c++;
		} else if (/^(line|wt_line)\b/i.test(t) && r.length >= 4) i.push({
			type: "polyline",
			points: r.slice(0, 4),
			stroke: a,
			lineWidth: s
		}), c++;
		else if ((/^(polyline|wt_polyline|pline)\b/i.test(t) || /\bPolyline\b/i.test(t)) && r.length >= 4) i.push({
			type: "polyline",
			points: er(r),
			stroke: a,
			lineWidth: s
		}), c++;
		else if ((/^(polygon|wt_polygon)\b/i.test(t) || /\bPolygon\b/i.test(t)) && r.length >= 6) i.push({
			type: "polygon",
			points: er(r),
			stroke: a,
			fill: o ?? "#000000",
			lineWidth: s
		}), c++;
		else if (/^(rect|rectangle|wt_rectangle)\b/i.test(t) && r.length >= 4) i.push({
			type: "rect",
			x: r[0],
			y: r[1],
			width: r[2],
			height: r[3],
			stroke: a,
			fill: o,
			lineWidth: s
		}), c++;
		else if (/^(circle|ellipse)\b/i.test(t) && r.length >= 3) {
			let [e, t, n] = r, l = [];
			for (let r = 0; r <= 72; r++) {
				let i = Math.PI * 2 * r / 72;
				l.push(e + Math.cos(i) * n, t + Math.sin(i) * n);
			}
			i.push({
				type: "polygon",
				points: l,
				stroke: a,
				fill: o,
				lineWidth: s
			}), c++;
		} else if (/^(text|wt_text)\b/i.test(t) && r.length >= 2) {
			let e = r[0], n = r[1], o = r.length >= 3 ? r[2] : 12, s = t.match(/["']([^"']+)["']/)?.[1] ?? t.replace(/^(text|wt_text)\b/i, "").replace(/[-+]?(?:\d+\.\d*|\.\d+|\d+)(?:[eE][-+]?\d+)?/g, "").trim();
			i.push({
				type: "text",
				x: e,
				y: n,
				size: o,
				text: s || "Text",
				fill: a
			}), c++;
		} else (n.includes("wt_") || n.includes("whip") || n.includes("dwf")) && c++;
	}
	let u = rr(i);
	return i.length === 0 ? r.push(x("warning", "W2D_TEXT_NO_GEOMETRY", `Textual W2D parser did not find supported geometry commands in ${t}.`, t)) : r.push(x("info", "W2D_TEXT_PARSED", `Parsed ${i.length} supported vector primitives from ${t}.`, t)), c === 0 && r.push(x("warning", "W2D_TEXT_UNKNOWN_DIALECT", "The file is textual, but does not look like the supported WHIP/W2D textual subset.", t)), {
		format: "generic-text",
		primitives: i,
		diagnostics: r,
		bounds: u
	};
}
function er(e) {
	return e.length >= 5 && Number.isInteger(e[0]) && e.length - 1 == e[0] * 2 ? e.slice(1) : e;
}
function tr(e, t) {
	return e.match(RegExp(`${t}=["']([^"']+)["']`, "i"))?.[1];
}
function nr(e) {
	let t = e.match(/#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})\b/i)?.[0];
	if (t) return t;
	let n = j(e);
	return n.length >= 3 ? `rgb(${Math.max(0, Math.min(255, n[0]))}, ${Math.max(0, Math.min(255, n[1]))}, ${Math.max(0, Math.min(255, n[2]))})` : e.match(/\b(black|white|red|green|blue|yellow|cyan|magenta|gray|grey)\b/i)?.[1];
}
function rr(e) {
	let t = Infinity, n = Infinity, r = -Infinity, i = -Infinity, a = (e, a) => {
		t = Math.min(t, e), n = Math.min(n, a), r = Math.max(r, e), i = Math.max(i, a);
	};
	for (let t of e) if ("points" in t) for (let e = 0; e + 1 < t.points.length; e += 2) a(t.points[e], t.points[e + 1]);
	else if (t.type === "rect") a(t.x, t.y), a(t.x + t.width, t.y + t.height);
	else if (t.type === "text") a(t.x, t.y), a(t.x + t.text.length * (t.size ?? 12) * .6, t.y + (t.size ?? 12));
	else if (t.type === "path") for (let e of t.commands) "x" in e && "y" in e && typeof e.x == "number" && typeof e.y == "number" && a(e.x, e.y), "x1" in e && "y1" in e && typeof e.x1 == "number" && typeof e.y1 == "number" && a(e.x1, e.y1), "x2" in e && "y2" in e && typeof e.x2 == "number" && typeof e.y2 == "number" && a(e.x2, e.y2);
	return Number.isFinite(t) ? {
		minX: t,
		minY: n,
		maxX: r,
		maxY: i
	} : void 0;
}
// node_modules/.pnpm/dwf-viewer@0.6.7_three@0.186.1/node_modules/dwf-viewer/dist/format/w2dBinary.js
var ir = 1, ar = 2, or = 4, sr = 8, cr = 16, lr = 32, ur = 64, dr = 128, fr = 256, pr = 512, mr = 1024;
function hr(e, t) {
	return new gr(e, t).parse();
}
var gr = class {
	constructor(e, t) {
		this.bytes = e, this.sourcePath = t, this.pos = 0, this.current = {
			x: 0,
			y: 0
		}, this.primitives = [], this.diagnostics = [], this.unsupportedOpcodes = [], this.opcodes = 0, this.decimalRevision = 600, this.state = {
			stroke: "#000000",
			fill: void 0,
			fillOn: !1,
			visible: !0,
			lineWidth: 1,
			fontHeight: 120,
			fontRotation: 0,
			fontName: "sans-serif"
		}, this.view = new DataView(e.buffer, e.byteOffset, e.byteLength);
	}
	parse() {
		for (; this.pos < this.bytes.length && (this.eatWhitespace(), !(this.pos >= this.bytes.length));) {
			let e = this.pos, t = this.u8();
			this.opcodes++;
			try {
				if (t === 40) {
					this.pos = e, this.parseExtendedAscii(e);
					continue;
				}
				if (t === 123) {
					if (!this.parseExtendedBinary(e)) break;
					continue;
				}
				if (this.parseSingleByteOpcode(t)) continue;
				this.unsupportedOpcodes.push({
					offset: e,
					opcode: t,
					message: `Unsupported/unknown W2D single-byte opcode 0x${t.toString(16).padStart(2, "0")}.`
				});
				break;
			} catch (n) {
				this.unsupportedOpcodes.push({
					offset: e,
					opcode: t,
					message: `Failed while decoding W2D opcode 0x${t.toString(16)}: ${String(n)}`
				});
				break;
			}
		}
		if (this.primitives.length > 0 ? this.diagnostics.push(x("info", "W2D_BINARY_PARSED", `Parsed ${this.primitives.length} vector primitives from binary WHIP!/W2D stream (${this.opcodes} opcodes).`, this.sourcePath)) : this.diagnostics.push(x("warning", "W2D_BINARY_NO_GEOMETRY", "Binary WHIP!/W2D parser did not emit supported geometry.", this.sourcePath)), this.unsupportedOpcodes.length > 0) {
			let e = this.unsupportedOpcodes[0];
			this.diagnostics.push(x("warning", "W2D_BINARY_PARTIAL", `${this.unsupportedOpcodes.length} unsupported opcode(s); first at byte ${e.offset}: ${e.message}`, this.sourcePath));
		}
		return {
			primitives: this.primitives,
			diagnostics: this.diagnostics,
			bounds: br(this.primitives),
			opcodes: this.opcodes,
			unsupportedOpcodes: this.unsupportedOpcodes
		};
	}
	parseSingleByteOpcode(e) {
		switch (e) {
			case 0: return !0;
			case 3: {
				let e = this.u8(), t = this.u8(), n = this.u8(), r = this.u8();
				return this.state.stroke = wr(e, t, n, r), this.state.fillOn && (this.state.fill = this.state.stroke), !0;
			}
			case 6: return this.readBinaryFont(), !0;
			case 12: {
				let e = [this.point16Relative(), this.point16Relative()];
				return this.polyline(e), !0;
			}
			case 16: {
				let e = this.pointSet16Relative();
				return this.pointSetPrimitive(e), !0;
			}
			case 18: {
				let e = this.point16Relative(), t = this.u16();
				return this.ellipsePrimitive(e, t, t, 0, 0, 0), !0;
			}
			case 20: return this.polytriangles(this.pointSet16Relative()), !0;
			case 23: return this.state.lineWidth = Math.max(.2, Math.abs(this.i32())), !0;
			case 24: {
				let e = this.point32Relative(), t = yr(this.readWhipString());
				return this.text(e, t), this.skipComplexTextOptions(), !0;
			}
			case 146: {
				let e = this.point32Relative(), t = this.u32(), n = this.u16(), r = this.u16();
				return this.ellipsePrimitive(e, t, t, n, r, 0, !1), !0;
			}
			case 172: return this.readCount(), !0;
			case 204: return this.readCount(), !0;
			case 228: return this.readCount(), !0;
		}
		switch (String.fromCharCode(e)) {
			case "B": return this.polyline(this.pointSet32Relative()), !0;
			case "C": return this.state.stroke = Dr(this.readAsciiInteger()), this.state.fillOn && (this.state.fill = this.state.stroke), !0;
			case "c": return this.state.stroke = Dr(this.u8()), this.state.fillOn && (this.state.fill = this.state.stroke), !0;
			case "E": {
				let e = this.readAsciiPoint(), t = this.readAsciiPoint();
				return this.ellipsePrimitive(e, t.x, t.y, 0, 0, 0), !0;
			}
			case "e": {
				let e = this.point32Relative(), t = this.u32(), n = this.u32(), r = this.u16(), i = this.u16(), a = this.u16();
				return this.ellipsePrimitive(e, t, n, r, i, a), !0;
			}
			case "F": return this.state.fillOn = !0, this.state.fill = this.state.stroke, !0;
			case "f": return this.state.fillOn = !1, this.state.fill = void 0, !0;
			case "L": {
				let e = [this.readAsciiPoint(), this.readAsciiPoint()];
				return this.polyline(e), !0;
			}
			case "l": {
				let e = [this.point32Relative(), this.point32Relative()];
				return this.polyline(e), !0;
			}
			case "N": return this.i32(), !0;
			case "n": return this.u16(), !0;
			case "O": return this.current = {
				x: this.i32(),
				y: this.i32()
			}, !0;
			case "P": return this.pointSetPrimitive(this.pointSetAscii()), !0;
			case "p": return this.pointSetPrimitive(this.pointSet32Relative()), !0;
			case "R": {
				let e = this.readAsciiPoint(), t = this.readAsciiInteger();
				return this.ellipsePrimitive(e, t, t, 0, 0, 0), !0;
			}
			case "r": {
				let e = this.point32Relative(), t = this.u32();
				return this.ellipsePrimitive(e, t, t, 0, 0, 0), !0;
			}
			case "T": return this.polytriangles(this.pointSetAscii()), !0;
			case "t": return this.polytriangles(this.pointSet32Relative()), !0;
			case "V": return this.state.visible = !0, !0;
			case "v": return this.state.visible = !1, !0;
			case "x": {
				let e = this.point32Relative(), t = yr(this.readWhipString());
				return this.text(e, t), !0;
			}
		}
		return !1;
	}
	parseExtendedAscii(e) {
		let { token: t, expr: n } = this.readBalancedExpression(e);
		switch (t) {
			case "(W2D": {
				let e = n.match(/V(\d+)\.(\d+)/i);
				e && (this.decimalRevision = Number(e[1]) * 100 + Number(e[2]));
				break;
			}
			case "(Color": {
				let e = Er(n);
				e.length >= 3 && (this.state.stroke = Cr(e[0], e[1], e[2]));
				break;
			}
			case "(LineWeight": {
				let e = Er(n);
				e.length >= 1 && (this.state.lineWidth = Math.max(.2, Math.abs(e[0])));
				break;
			}
			case "(Font": {
				let e = n.match(/\(Height\s+(-?\d+)/i)?.[1], t = n.match(/\(Rotation\s+(-?\d+)/i)?.[1], r = n.match(/\(Name\s+(['"])(.*?)\1/i)?.[2];
				e && (this.state.fontHeight = Math.max(1, Math.abs(Number(e)))), t && (this.state.fontRotation = Number(t) || 0), r && (this.state.fontName = r);
				break;
			}
			case "(EndOfDWF": this.pos = this.bytes.length;
		}
	}
	parseExtendedBinary(e) {
		if (this.remaining() < 6) return !1;
		let t = this.u32(), n = this.u16();
		return n === 17 || n === 16 || n === 291 ? (this.unsupportedOpcodes.push({
			offset: e,
			opcode: `{${n.toString(16)}}`,
			message: "Embedded compressed WHIP block detected. This build renders uncompressed binary W2D streams and manifest markup XML; compressed nested blocks are skipped."
		}), this.pos = t > 0 && this.pos + t <= this.bytes.length ? this.pos + t : this.bytes.length, !0) : t > 0 && this.pos + t <= this.bytes.length ? (this.pos += t, !0) : (this.unsupportedOpcodes.push({
			offset: e,
			opcode: `{${n.toString(16)}}`,
			message: "Unsupported extended binary WHIP object with unknown payload size."
		}), !1);
	}
	readBinaryFont() {
		let e = this.u16();
		e & ir && (this.state.fontName = this.readWhipString() || this.state.fontName), e & ar && this.u8(), e & or && this.u8(), e & sr && this.u8(), e & cr && this.u8(), e & lr && (this.state.fontHeight = Math.max(1, Math.abs(this.i32()))), e & ur && (this.state.fontRotation = this.u16()), e & dr && this.u16(), e & fr && this.u16(), e & pr && this.u16(), e & mr && this.i32();
	}
	skipComplexTextOptions() {
		this.skipScoringOption(), this.skipScoringOption();
		for (let e = 0; e < 4; e++) this.i32(), this.i32();
		if (this.decimalRevision >= 600 && this.pos < this.bytes.length) {
			let e = Math.max(0, this.readCount() - 1);
			for (let t = 0; t < e; t++) this.readCount();
		}
	}
	skipScoringOption() {
		let e = Math.max(0, this.readCount() - 1);
		for (let t = 0; t < e; t++) this.readCount();
	}
	pointSetPrimitive(e) {
		this.state.fillOn ? this.polygon(e, this.state.fill ?? this.state.stroke, this.state.stroke) : this.polyline(e);
	}
	polytriangles(e) {
		if (!(!this.state.visible || e.length < 3)) for (let t = 0; t + 2 < e.length; t++) this.polygon([
			e[t],
			e[t + 1],
			e[t + 2]
		], this.state.stroke, void 0);
	}
	polyline(e) {
		!this.state.visible || e.length < 2 || this.primitives.push({
			type: "polyline",
			points: _r(e),
			stroke: this.state.stroke,
			lineWidth: this.state.lineWidth
		});
	}
	polygon(e, t, n) {
		!this.state.visible || e.length < 3 || this.primitives.push({
			type: "polygon",
			points: _r(e),
			fill: t,
			stroke: n,
			lineWidth: this.state.lineWidth
		});
	}
	ellipsePrimitive(e, t, n, r, i, a, o = this.state.fillOn) {
		let s = vr(e, t, n, r, i, a);
		o ? this.polygon(s, this.state.fill ?? this.state.stroke, this.state.stroke) : this.polyline(s);
	}
	text(e, t) {
		this.state.visible && t.trim() && this.primitives.push({
			type: "text",
			x: e.x,
			y: e.y,
			text: t,
			size: Math.max(10, Math.abs(this.state.fontHeight)),
			fill: this.state.stroke
		});
	}
	pointSet32Relative() {
		let e = this.readCount(), t = [];
		for (let n = 0; n < e; n++) t.push(this.point32Relative());
		return t;
	}
	pointSet16Relative() {
		let e = this.readCount(), t = [];
		for (let n = 0; n < e; n++) t.push(this.point16Relative());
		return t;
	}
	pointSetAscii() {
		let e = this.readAsciiInteger(), t = [];
		for (let n = 0; n < e; n++) t.push(this.readAsciiPoint());
		return t;
	}
	point32Relative() {
		let e = this.i32(), t = this.i32();
		return this.current = {
			x: this.current.x + e,
			y: this.current.y + t
		}, { ...this.current };
	}
	point16Relative() {
		let e = this.i16(), t = this.i16();
		return this.current = {
			x: this.current.x + e,
			y: this.current.y + t
		}, { ...this.current };
	}
	readAsciiPoint() {
		let e = this.readAsciiInteger();
		return this.peek() === 44 && this.pos++, {
			x: e,
			y: this.readAsciiInteger()
		};
	}
	readAsciiInteger() {
		this.eatWhitespace();
		let e = this.pos;
		for ((this.peek() === 43 || this.peek() === 45) && this.pos++; this.pos < this.bytes.length && xr(this.bytes[this.pos]);) this.pos++;
		let t = Sr(this.bytes.subarray(e, this.pos)), n = Number.parseInt(t, 10);
		return Number.isFinite(n) ? n : 0;
	}
	readWhipString() {
		this.eatWhitespace();
		let e = this.peek();
		if (e === 123) {
			this.pos++;
			let e = this.i32(), t = Math.max(0, e * 2);
			if (this.pos + t > this.bytes.length) throw Error("Truncated binary WHIP string.");
			let n = new TextDecoder("utf-16le").decode(this.bytes.subarray(this.pos, this.pos + t));
			return this.pos += t, this.peek() === 125 && this.pos++, n;
		}
		if (e === 34 || e === 39) {
			let e = this.u8(), t = [], n = !1;
			for (; this.pos < this.bytes.length;) {
				let r = this.u8();
				if (n) t.push(r), n = !1;
				else if (r === 92) t.push(r), n = !0;
				else if (r === e) break;
				else t.push(r);
			}
			return Sr(new Uint8Array(t));
		}
		let t = this.pos;
		for (; this.pos < this.bytes.length;) {
			let e = this.bytes[this.pos];
			if (e === 32 || e === 9 || e === 10 || e === 13 || e === 41) break;
			this.pos++;
		}
		return Sr(this.bytes.subarray(t, this.pos));
	}
	readBalancedExpression(e) {
		this.pos = e;
		let t = 0, n = 0, r = !1;
		for (; this.pos < this.bytes.length;) {
			let e = this.u8();
			if (n) r ? r = !1 : e === 92 ? r = !0 : e === n && (n = 0);
			else if (e === 34 || e === 39) n = e;
			else if (e === 40) t++;
			else if (e === 41 && (t--, t <= 0)) break;
		}
		let i = Sr(this.bytes.subarray(e, this.pos));
		return {
			token: i.match(/^\([^\s()]+/)?.[0] ?? "(",
			expr: i
		};
	}
	readCount() {
		let e = this.u8();
		return e === 0 ? 256 + this.u16() : e;
	}
	eatWhitespace() {
		for (; this.pos < this.bytes.length;) {
			let e = this.bytes[this.pos];
			if (e === 32 || e === 9 || e === 10 || e === 13) this.pos++;
			else break;
		}
	}
	remaining() {
		return this.bytes.length - this.pos;
	}
	peek() {
		return this.pos < this.bytes.length ? this.bytes[this.pos] : void 0;
	}
	u8() {
		if (this.remaining() < 1) throw Error("Unexpected EOF");
		return this.view.getUint8(this.pos++);
	}
	i16() {
		if (this.remaining() < 2) throw Error("Unexpected EOF");
		let e = this.view.getInt16(this.pos, !0);
		return this.pos += 2, e;
	}
	u16() {
		if (this.remaining() < 2) throw Error("Unexpected EOF");
		let e = this.view.getUint16(this.pos, !0);
		return this.pos += 2, e;
	}
	i32() {
		if (this.remaining() < 4) throw Error("Unexpected EOF");
		let e = this.view.getInt32(this.pos, !0);
		return this.pos += 4, e;
	}
	u32() {
		if (this.remaining() < 4) throw Error("Unexpected EOF");
		let e = this.view.getUint32(this.pos, !0);
		return this.pos += 4, e;
	}
};
function _r(e) {
	let t = [];
	for (let n of e) t.push(n.x, n.y);
	return t;
}
function vr(e, t, n, r, i, a) {
	let o = r, s = i;
	o === 0 && s === 0 ? s = 65536 : s <= o && (s += 65536);
	let c = s - o, l = Math.max(16, Math.min(144, Math.ceil(Math.abs(c) / 65536 * 96))), u = a * Math.PI * 2 / 65536, d = Math.cos(u), f = Math.sin(u), p = [];
	for (let r = 0; r <= l; r++) {
		let i = (o + c * r / l) * Math.PI * 2 / 65536, a = Math.cos(i) * t, s = Math.sin(i) * n;
		p.push({
			x: e.x + a * d - s * f,
			y: e.y + a * f + s * d
		});
	}
	return p;
}
function yr(e) {
	return e.replace(/\\P/gi, "\n").replace(/\\L|\\l/g, "").replace(/\\O|\\o/g, "").replace(/\\H[-+]?\d*\.?\d+x;/gi, "").replace(/\\S([^;]+);/gi, "$1").replace(/\\[A-Za-z][^;]*;/g, "").replace(/\\~/g, " ").replace(/\\\\/g, "\\").trim();
}
function br(e) {
	let t = Infinity, n = Infinity, r = -Infinity, i = -Infinity, a = (e, a) => {
		t = Math.min(t, e), n = Math.min(n, a), r = Math.max(r, e), i = Math.max(i, a);
	};
	for (let t of e) if ("points" in t) for (let e = 0; e + 1 < t.points.length; e += 2) a(t.points[e], t.points[e + 1]);
	else if (t.type === "rect") a(t.x, t.y), a(t.x + t.width, t.y + t.height);
	else if (t.type === "text") {
		let e = t.size ?? 12;
		a(t.x, t.y), a(t.x, t.y + e);
	} else if (t.type === "path") for (let e of t.commands) "x" in e && "y" in e && a(e.x, e.y), "x1" in e && "y1" in e && a(e.x1, e.y1), "x2" in e && "y2" in e && a(e.x2, e.y2);
	return Number.isFinite(t) ? {
		minX: t,
		minY: n,
		maxX: r,
		maxY: i
	} : void 0;
}
function xr(e) {
	return e >= 48 && e <= 57;
}
function Sr(e) {
	return Array.from(e, (e) => String.fromCharCode(e)).join("");
}
function Cr(e, t, n) {
	return `rgb(${Tr(e)}, ${Tr(t)}, ${Tr(n)})`;
}
function wr(e, t, n, r) {
	return `rgba(${Tr(e)}, ${Tr(t)}, ${Tr(n)}, ${Math.max(0, Math.min(1, r / 255))})`;
}
function Tr(e) {
	return Math.max(0, Math.min(255, Math.round(e)));
}
function Er(e) {
	return (e.match(/[-+]?(?:\d+\.\d*|\.\d+|\d+)(?:[eE][-+]?\d+)?/g) ?? []).map(Number).filter(Number.isFinite);
}
function Dr(e) {
	return [
		"#000000",
		"#ff0000",
		"#ffff00",
		"#00ff00",
		"#00ffff",
		"#0000ff",
		"#ff00ff",
		"#000000",
		"#808080",
		"#c0c0c0"
	][e] ?? "#000000";
}
// node_modules/.pnpm/dwf-viewer@0.6.7_three@0.186.1/node_modules/dwf-viewer/dist/format/dwf.js
function Or(e) {
	return e.entries.some((e) => /\.w2d$/i.test(e.name) || /manifest\.xml$/i.test(e.name) || /descriptor\.xml$/i.test(e.name) || /\.hsf$/i.test(e.name));
}
async function kr(e) {
	let t = [], n = [], r = e.entries.map((e) => ({
		path: e.name,
		mediaType: ve(e.name),
		size: e.uncompressedSize
	})), i = e.entries.find((e) => /(^|\/)manifest\.xml$/i.test(e.name)), a = [];
	if (i) try {
		a = Mr(T(await e.read(i)), i.name), t.push(x("info", "DWF_MANIFEST_FOUND", `Found DWF manifest with ${a.length} section(s).`, i.name));
	} catch (e) {
		t.push(x("warning", "DWF_MANIFEST_PARSE_FAILED", `Failed to parse DWF manifest: ${String(e)}`, i.name));
	}
	else t.push(x("info", "DWF_NO_MANIFEST", "No manifest.xml was found; falling back to resource discovery."));
	if (a.length > 0) for (let r of a) {
		let i = Rr(r, /2d\s+streaming\s+graphics/i) ?? r.resources.find((e) => /\.w2d$/i.test(e.path));
		if (!i) continue;
		let a = Rr(r, /^descriptor$/i) ?? { path: E(r.name + "/descriptor.xml") }, o = {};
		if (a && e.has(a.path)) try {
			o = Nr(T(await e.read(a.path)), i.path);
		} catch (e) {
			t.push(x("warning", "DWF_DESCRIPTOR_PARSE_FAILED", `Failed to parse descriptor for ${r.title}: ${String(e)}`, a.path));
		}
		let s = [], c = [];
		try {
			let t = await jr(e, i.path);
			c.push(...t.primitives), s.push(...t.diagnostics);
		} catch (e) {
			s.push(x("warning", "DWF_W2D_READ_FAILED", `Failed to read or parse ${i.path}: ${String(e)}`, i.path));
		}
		for (let t of r.resources.filter((e) => /markup\s+private/i.test(e.role ?? "") && /\.xml$/i.test(e.path))) if (e.has(t.path)) try {
			let n = Pr(T(await e.read(t.path)), t.path, o.w2dTransform);
			c.push(...n.primitives), s.push(...n.diagnostics);
		} catch (e) {
			s.push(x("warning", "DWF_MARKUP_XML_PARSE_FAILED", `Failed to parse markup private XML: ${String(e)}`, t.path));
		}
		if (c.length > 0) {
			let e = Lr(c), t = e ? Math.max(1, e.maxX - e.minX) : o.paperWidth ?? 1e3, a = e ? Math.max(1, e.maxY - e.minY) : o.paperHeight ?? 1e3;
			n.push({
				id: `page-${n.length + 1}`,
				name: r.title || i.title || Vr(i.path),
				kind: "w2d-text",
				sourcePath: i.path,
				width: t,
				height: a,
				primitives: c,
				bounds: e,
				diagnostics: s
			});
		} else {
			let t = Rr(r, /thumbnail|preview/i) ?? r.resources.find((e) => /\.(png|jpe?g|gif|bmp)$/i.test(e.path));
			t && e.has(t.path) && n.push({
				id: `image-${n.length + 1}`,
				name: r.title || Vr(t.path),
				kind: "image",
				sourcePath: t.path,
				mediaType: t.mediaType ?? ve(t.path) ?? "image/png",
				width: 1e3,
				height: 1e3,
				diagnostics: [...s, x("warning", "DWF_IMAGE_FALLBACK", "Vector stream did not produce geometry; using section thumbnail as fallback.", t.path)]
			});
		}
	}
	n.length === 0 && await Ar(e, n, t);
	let o = e.entries.filter((e) => /\.hsf$/i.test(e.name));
	if (o.length > 0 && (t.push(x("warning", "DWF_3D_HSF_DETECTED", `Detected ${o.length} HSF/3D resource(s). This frontend build reports them but does not render 3D HSF.`, o[0]?.name)), n.length === 0 && n.push({
		id: "unsupported-3d",
		name: "Unsupported 3D DWF",
		kind: "unsupported",
		width: 1e3,
		height: 1e3,
		sourcePath: o[0]?.name,
		reason: "3D HSF resource detected; not implemented in this pure frontend native renderer build.",
		diagnostics: [x("warning", "DWF_3D_HSF_UNSUPPORTED", "3D HSF rendering is not implemented in this build.", o[0]?.name)]
	})), n.length === 0) {
		let t = Hr(e);
		t && n.push({
			id: "image-1",
			name: Vr(t.name),
			kind: "image",
			sourcePath: t.name,
			mediaType: ve(t.name) ?? "image/png",
			width: 1e3,
			height: 1e3,
			diagnostics: [x("info", "DWF_IMAGE_FALLBACK", "No supported vector page was found; using an embedded preview/image resource.", t.name)]
		});
	}
	return n.length === 0 && n.push({
		id: "unsupported-1",
		name: "Unsupported DWF package",
		kind: "unsupported",
		width: 1e3,
		height: 1e3,
		reason: "No supported W2D, XPS FixedPage, or preview image resource was found.",
		diagnostics: [x("error", "DWF_NO_SUPPORTED_PAGE", "No supported renderable DWF resource was found.")]
	}), je({
		kind: "dwf",
		pages: [],
		resources: r,
		diagnostics: t,
		packageEntries: e.entries.map((e) => e.name)
	}, n, e, void 0);
}
async function Ar(e, t, n) {
	let r = e.entries.filter((e) => /\.w2d$/i.test(e.name));
	for (let i of r) try {
		let n = await jr(e, i.name), r = n.bounds, a = r ? Math.max(1, r.maxX - r.minX) : 1e3, o = r ? Math.max(1, r.maxY - r.minY) : 1e3;
		n.primitives.length > 0 && t.push({
			id: `page-${t.length + 1}`,
			name: Vr(i.name),
			kind: "w2d-text",
			sourcePath: i.name,
			width: a,
			height: o,
			primitives: n.primitives,
			bounds: r,
			diagnostics: n.diagnostics
		});
	} catch (e) {
		n.push(x("warning", "DWF_W2D_READ_FAILED", `Failed to read ${i.name}: ${String(e)}`, i.name));
	}
}
async function jr(e, t) {
	let n = await e.read(t);
	return ge(n) ? $n(n, t) : hr(n, t);
}
function Mr(e, t) {
	let n = A(e, t);
	return Array.from(n.getElementsByTagName("*")).filter((e) => zr(e) === "Section").map((e, t) => {
		let n = I(e, "name") ?? `section-${t + 1}`;
		return {
			name: n,
			title: I(e, "title") ?? n,
			resources: Array.from(e.getElementsByTagName("*")).filter((e) => zr(e).endsWith("Resource") || zr(e) === "Resource").map((e) => ({
				path: E(I(e, "href") ?? ""),
				role: I(e, "role"),
				mediaType: I(e, "mime"),
				title: I(e, "title")
			})).filter((e) => e.path.length > 0)
		};
	}).filter((e) => e.resources.length > 0);
}
function Nr(e, t) {
	let n = A(e, "descriptor.xml"), r = Array.from(n.getElementsByTagName("*")).find((e) => zr(e) === "Paper"), i = {};
	if (r) {
		i.paperWidth = Br(r, "width"), i.paperHeight = Br(r, "height");
		let e = I(r, "clip");
		e && (i.clip = j(e));
	}
	let a = Array.from(n.getElementsByTagName("*")).filter((e) => /GraphicResource$/i.test(zr(e)) || zr(e) === "GraphicResource"), o = a.find((e) => E(I(e, "href") ?? "") === E(t)) ?? a.find((e) => /2d\s+streaming\s+graphics/i.test(I(e, "role") ?? "")), s = o ? j(I(o, "transform") ?? "") : [];
	return s.length >= 14 && (i.w2dTransform = {
		sx: s[0] || 1,
		sy: s[5] || s[0] || 1,
		tx: s[12] || 0,
		ty: s[13] || 0
	}), i;
}
function Pr(e, t, n) {
	let r = A(e, t), i = [], a = (e, t) => n ? {
		x: (e - n.tx) / n.sx,
		y: (t - n.ty) / n.sy
	} : {
		x: e,
		y: t
	}, o = (e) => j(I(e, "Points") ?? I(e, "points") ?? "");
	for (let e of Array.from(r.getElementsByTagName("*"))) {
		let t = zr(e);
		if (t === "Polyline2D" || t === "Leader") {
			let t = o(e);
			if (t.length >= 4) {
				let n = [];
				for (let e = 0; e + 1 < t.length; e += 2) {
					let r = a(t[e], t[e + 1]);
					n.push(r.x, r.y);
				}
				let r = Fr(e);
				i.push({
					type: "polyline",
					points: n,
					stroke: r.stroke,
					lineWidth: r.lineWidth
				});
			}
		} else if (t === "Tag" || t === "Target") {
			let t = Br(e, "CenterX"), n = Br(e, "CenterY"), r = Br(e, "Width"), o = Br(e, "Height");
			if ([
				t,
				n,
				r,
				o
			].every((e) => e !== void 0)) {
				let s = a(t - r / 2, n - o / 2), c = a(t + r / 2, n - o / 2), l = a(t + r / 2, n + o / 2), u = a(t - r / 2, n + o / 2), d = Fr(e);
				i.push({
					type: "polygon",
					points: [
						s.x,
						s.y,
						c.x,
						c.y,
						l.x,
						l.y,
						u.x,
						u.y
					],
					stroke: d.stroke,
					fill: d.fill,
					lineWidth: d.lineWidth
				});
			}
		} else if (t === "Text") {
			let t = Br(e, "X"), r = Br(e, "Y");
			if (t !== void 0 && r !== void 0) {
				let o = Array.from(e.getElementsByTagName("*")).filter((e) => zr(e) === "TextPhrase"), s = o.map((e) => I(e, "String") ?? "").filter(Boolean).join("\n");
				if (s) {
					let c = a(t, r), l = Br(e, "Height"), u = o.length ? Br(o[0], "FontHeight") : void 0, d = n && l ? Math.max(10, Math.abs(l / n.sy)) : u ?? 12, f = o.length ? I(o[0], "Color") : void 0;
					i.push({
						type: "text",
						x: c.x,
						y: c.y,
						text: s,
						size: d,
						fill: f ? Ir(f) : Fr(e).stroke
					});
				}
			}
		}
	}
	let s = [];
	return i.length > 0 && s.push(x("info", "DWF_MARKUP_XML_PARSED", `Parsed ${i.length} markup primitive(s) from markup private XML.`, t)), {
		primitives: i,
		diagnostics: s
	};
}
function Fr(e) {
	let t = "#0000ff", n, r = 1, i = Array.from(e.getElementsByTagName("*")).filter((e) => zr(e) === "FormatProperty");
	for (let e of i) {
		let i = (I(e, "Name") ?? "").toUpperCase(), a = (I(e, "Enabled") ?? "true").toLowerCase() !== "false", o = I(e, "ModifierUIntVal") ?? I(e, "UIntValue") ?? I(e, "DblValue") ?? I(e, "IntValue");
		a && o !== void 0 && (i === "LINECOLOR" && (t = Ir(o)), i === "FILLCOLOR" && (n = Ir(o)), i === "LINEWEIGHT" && (r = Math.max(1, Number(o) || r)), i === "NOFILL" && /true/i.test(I(e, "BoolValue") ?? "") && (n = void 0));
	}
	return {
		stroke: t,
		fill: n,
		lineWidth: r
	};
}
function Ir(e) {
	let t = Number(e);
	if (!Number.isFinite(t)) return "#000000";
	let n = t >>> 0;
	return `rgb(${n >>> 16 & 255}, ${n >>> 8 & 255}, ${n & 255})`;
}
function Lr(e) {
	let t = Infinity, n = Infinity, r = -Infinity, i = -Infinity, a = (e, a) => {
		t = Math.min(t, e), n = Math.min(n, a), r = Math.max(r, e), i = Math.max(i, a);
	};
	for (let t of e) if ("points" in t) for (let e = 0; e + 1 < t.points.length; e += 2) a(t.points[e], t.points[e + 1]);
	else if (t.type === "rect") a(t.x, t.y), a(t.x + t.width, t.y + t.height);
	else if (t.type === "text") {
		let e = t.size ?? 12;
		a(t.x, t.y), a(t.x, t.y + e);
	} else if (t.type === "path") for (let e of t.commands) "x" in e && "y" in e && a(e.x, e.y), "x1" in e && "y1" in e && a(e.x1, e.y1), "x2" in e && "y2" in e && a(e.x2, e.y2);
	return Number.isFinite(t) ? {
		minX: t,
		minY: n,
		maxX: r,
		maxY: i
	} : void 0;
}
function Rr(e, t) {
	return e.resources.find((e) => t.test(e.role ?? ""));
}
function I(e, t) {
	return e.getAttribute(t) ?? e.getAttribute(`dwf:${t}`) ?? e.getAttribute(`ePlot:${t}`) ?? Array.from(e.attributes).find((e) => e.localName === t)?.value ?? void 0;
}
function zr(e) {
	let t = e.localName || e.nodeName, n = t.indexOf(":");
	return n >= 0 ? t.slice(n + 1) : t;
}
function Br(e, t) {
	let n = I(e, t);
	if (n === void 0) return;
	let r = Number(n);
	return Number.isFinite(r) ? r : void 0;
}
function Vr(e) {
	let t = e.lastIndexOf("/");
	return t >= 0 ? e.slice(t + 1) : e;
}
function Hr(e) {
	let t = e.entries.filter((e) => /\.(png|jpe?g|gif|bmp)$/i.test(e.name));
	if (t.length !== 0) return t.sort((e, t) => Ur(t.name, t.uncompressedSize) - Ur(e.name, e.uncompressedSize))[0];
}
function Ur(e, t) {
	let n = Math.min(t, 1e7) / 1e3;
	return /thumbnail|preview/i.test(e) && (n += 5e3), _e(e) === "png" && (n += 100), n;
}
// node_modules/.pnpm/dwf-viewer@0.6.7_three@0.186.1/node_modules/dwf-viewer/dist/format/open.js
async function Wr(e, t = {}) {
	let n = await Gr(e), r = t.fileName ?? (e instanceof File ? e.name : void 0) ?? "document.dwf";
	if (we(n)) {
		let e = Ce.open(n, t.inflater);
		return pn(e) ? await fn(e) : Or(e) ? await kr(e) : e.entries.some((e) => /\.fpage$/i.test(e.name)) ? await fn(e) : await kr(e);
	}
	if (ge(n)) {
		let e = $n(n, r), t = e.format === "legacy-ascii-dwf", i = [{
			id: "page-1",
			name: r,
			kind: "w2d-text",
			width: e.bounds ? Math.max(1, e.bounds.maxX - e.bounds.minX) : 1e3,
			height: e.bounds ? Math.max(1, e.bounds.maxY - e.bounds.minY) : 1e3,
			sourcePath: r,
			primitives: e.primitives,
			bounds: e.bounds,
			diagnostics: e.diagnostics
		}];
		return je({
			kind: t ? "dwf" : "unknown",
			pages: [],
			resources: [{
				path: r,
				mediaType: t ? "model/vnd.dwf" : "text/plain",
				size: n.byteLength
			}],
			diagnostics: t ? [x("info", "LEGACY_ASCII_DWF_MODE", `Opened ${e.version ?? "legacy"} readable WHIP!/W2D stream as a classic DWF document.`, r)] : [x("warning", "RAW_TEXT_W2D_MODE", "Input is not a DWF ZIP package; opened it as a textual W2D-like vector stream.", r)],
			packageEntries: [r]
		}, i);
	}
	let i = {
		id: "unsupported-raw",
		name: r,
		kind: "unsupported",
		width: 1e3,
		height: 1e3,
		sourcePath: r,
		reason: "Input is neither a ZIP-based DWF/DWFx package nor a supported textual W2D stream.",
		diagnostics: [x("error", "UNSUPPORTED_RAW_FORMAT", "Unsupported raw DWF input. DWF 6+/DWFx ZIP packages or readable legacy WHIP!/W2D streams are required for this build.", r)]
	};
	return je({
		kind: "unknown",
		pages: [],
		resources: [{
			path: r,
			size: n.byteLength
		}],
		diagnostics: i.diagnostics,
		packageEntries: [r]
	}, [i]);
}
async function Gr(e) {
	return e instanceof Uint8Array ? e : e instanceof ArrayBuffer ? new Uint8Array(e) : new Uint8Array(await e.arrayBuffer());
}
// node_modules/.pnpm/dwf-viewer@0.6.7_three@0.186.1/node_modules/dwf-viewer/dist/render/style.js
var Kr = {
	a: 1,
	b: 0,
	c: 0,
	d: 1,
	e: 0,
	f: 0
};
function qr(e, t) {
	return {
		a: e.a * t.a + e.c * t.b,
		b: e.b * t.a + e.d * t.b,
		c: e.a * t.c + e.c * t.d,
		d: e.b * t.c + e.d * t.d,
		e: e.a * t.e + e.c * t.f + e.e,
		f: e.b * t.e + e.d * t.f + e.f
	};
}
function Jr(e, t, n) {
	return [e.a * t + e.c * n + e.e, e.b * t + e.d * n + e.f];
}
function Yr(e) {
	if (!e) return { ...Kr };
	let t = j(e);
	return t.length >= 6 ? {
		a: t[0],
		b: t[1],
		c: t[2],
		d: t[3],
		e: t[4],
		f: t[5]
	} : { ...Kr };
}
function Xr(e, t = 1) {
	if (!e || e === "Transparent" || e === "{x:Null}") return;
	let n = e.trim();
	if (n.startsWith("{") || n.includes("Brush")) return;
	let r = ti(n);
	if (r && (n = r), n.startsWith("sc#")) {
		let e = j(n);
		if (e.length >= 3) {
			let n = +(e.length >= 4), r = e.length >= 4 ? e[0] : 1;
			return $r(Math.round((e[n] ?? 0) * 255), Math.round((e[n + 1] ?? 0) * 255), Math.round((e[n + 2] ?? 0) * 255), r * t);
		}
	}
	if (n.startsWith("#")) {
		let e = n.slice(1);
		if (e.length === 3) return $r(parseInt(e[0] + e[0], 16), parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), t);
		if (e.length === 6) return $r(parseInt(e.slice(0, 2), 16), parseInt(e.slice(2, 4), 16), parseInt(e.slice(4, 6), 16), t);
		if (e.length === 8) {
			let n = parseInt(e.slice(0, 2), 16) / 255;
			return $r(parseInt(e.slice(2, 4), 16), parseInt(e.slice(4, 6), 16), parseInt(e.slice(6, 8), 16), n * t);
		}
	}
	return /^rgba?\(/i.test(n), n;
}
function Zr(e, t = 4278190080) {
	if (!e) return t;
	let n = e.trim(), r = n.match(/^rgba?\(([^)]+)\)/i);
	if (r) {
		let e = r[1].split(",").map((e) => e.trim()), t = Number(e[0] ?? 0), n = Number(e[1] ?? 0), i = Number(e[2] ?? 0), a = e[3] === void 0 ? 1 : Number(e[3]);
		return Qr(t, n, i, Math.round(a * 255));
	}
	if (n.startsWith("#")) {
		let e = n.slice(1);
		if (e.length === 6) return Qr(parseInt(e.slice(0, 2), 16), parseInt(e.slice(2, 4), 16), parseInt(e.slice(4, 6), 16), 255);
		if (e.length === 8) return Qr(parseInt(e.slice(2, 4), 16), parseInt(e.slice(4, 6), 16), parseInt(e.slice(6, 8), 16), parseInt(e.slice(0, 2), 16));
	}
	let i = ti(n);
	return i ? Zr(i, t) : t;
}
function Qr(e, t, n, r) {
	return e = ei(e), t = ei(t), n = ei(n), r = ei(r), e & 255 | (t & 255) << 8 | (n & 255) << 16 | (r & 255) << 24;
}
function $r(e, t, n, r) {
	return `rgba(${ei(e)}, ${ei(t)}, ${ei(n)}, ${Math.max(0, Math.min(1, r))})`;
}
function ei(e) {
	return Math.max(0, Math.min(255, Math.round(e)));
}
function ti(e) {
	switch (e.toLowerCase()) {
		case "black": return "#000000";
		case "white": return "#ffffff";
		case "red": return "#ff0000";
		case "green": return "#008000";
		case "blue": return "#0000ff";
		case "yellow": return "#ffff00";
		case "cyan": return "#00ffff";
		case "magenta": return "#ff00ff";
		case "gray":
		case "grey": return "#808080";
		case "transparent": return "#00000000";
		default: return;
	}
}
// node_modules/.pnpm/dwf-viewer@0.6.7_three@0.186.1/node_modules/dwf-viewer/dist/render/viewport.js
function ni(e) {
	let t = e.margin ?? 24, n = Math.max(1, e.canvasWidth - t * 2), r = Math.max(1, e.canvasHeight - t * 2), i = Math.min(n / Math.max(1, e.pageWidth), r / Math.max(1, e.pageHeight)) * (e.zoom ?? 1);
	return {
		a: i,
		b: 0,
		c: 0,
		d: i,
		e: (e.canvasWidth - e.pageWidth * i) / 2 + (e.panX ?? 0) - (e.sourceMinX ?? 0) * i,
		f: (e.canvasHeight - e.pageHeight * i) / 2 + (e.panY ?? 0) - (e.sourceMinY ?? 0) * i
	};
}
function ri(e, t, n, r = 1, i = 0, a = 0) {
	let o = e.bounds, s = o?.minX ?? 0;
	o?.minY;
	let c = o?.maxY ?? e.height, l = o ? Math.max(1, o.maxX - o.minX) : e.width, u = o ? Math.max(1, o.maxY - o.minY) : e.height, d = Math.max(1, t - 48), f = Math.max(1, n - 48), p = Math.min(d / Math.max(1, l), f / Math.max(1, u)) * r, m = (t - l * p) / 2 + i, h = (n - u * p) / 2 + a;
	return {
		a: p,
		b: 0,
		c: 0,
		d: -p,
		e: m - s * p,
		f: h + c * p
	};
}
// node_modules/.pnpm/dwf-viewer@0.6.7_three@0.186.1/node_modules/dwf-viewer/dist/render/cadLineStyle.js
function ii(e) {
	let t = Math.hypot(e.a, e.b), n = Math.hypot(e.c, e.d);
	return Math.max(1e-12, (t + n) * .5);
}
function ai(e) {
	let t = e.getBoundingClientRect?.(), n = t && t.width > 0 ? t.width : Number(e.style.width?.replace("px", "")) || e.width;
	return Math.max(1, e.width / Math.max(1, n));
}
function oi(e, t, n = {}, r) {
	let i = ii(t), a = Math.max(0, Math.abs(e || 0) * i), o = n.lineWeightMode ?? "adaptive";
	if (o === "physical") return Math.max(1e-6, Math.abs(e || 1));
	let s = Math.max(1, r.dpr || 1), c = Math.max(.25, (n.minStrokeCssPx ?? .55) * s);
	if (o === "hairline") return c / i;
	let l = Math.max(.05, r.zoom ?? 1), u = n.maxOverviewStrokeCssPx ?? 1.15, d = l <= 1 ? u : Math.min(24, u * (1 + Math.log2(l) * 1.6)), f = Math.max(c, d * s);
	return Math.max(c, Math.min(a, f)) / i;
}
function si(e, t, n = {}, r) {
	if ((n.lineWeightMode ?? "adaptive") === "physical") return !0;
	let i = Math.max(1, r.dpr || 1), a = n.minTextCssPx ?? 3.5;
	return Math.abs(e * ii(t)) >= a * i;
}
function ci(e, t, n = {}, r) {
	if (!e || (n.lineWeightMode ?? "adaptive") === "physical") return !0;
	let i = Math.max(1, r.dpr || 1), a = Math.max(0, n.minFilledAreaCssPx ?? .12) * i * i;
	if (a <= 0) return !0;
	let o = li(t, e.minX, e.minY), s = li(t, e.maxX, e.minY), c = li(t, e.maxX, e.maxY), l = li(t, e.minX, e.maxY), u = [
		o[0],
		s[0],
		c[0],
		l[0]
	], d = [
		o[1],
		s[1],
		c[1],
		l[1]
	];
	return (Math.max(...u) - Math.min(...u)) * (Math.max(...d) - Math.min(...d)) >= a;
}
function li(e, t, n) {
	return [e.a * t + e.c * n + e.e, e.b * t + e.d * n + e.f];
}
// node_modules/.pnpm/dwf-viewer@0.6.7_three@0.186.1/node_modules/dwf-viewer/dist/wasm/WasmRasterBackend.js
var ui = class {
	constructor(e = {}) {
		this.fbPtr = 0, this.fbBytes = 0, this.width = 0, this.height = 0, this.wasmUrl = e.wasmUrl ?? "./public/dwfv-render.wasm";
	}
	async init() {
		if (this.exports) return;
		let e = await fetch(this.wasmUrl);
		if (!e.ok) throw Error(`Failed to load WASM raster backend: ${e.status} ${e.statusText}`);
		let t = await e.arrayBuffer(), n = await WebAssembly.instantiate(t, {});
		this.exports = n.instance.exports;
	}
	begin(e, t, n = "#ffffff") {
		let r = this.requireExports();
		this.width = Math.max(1, Math.floor(e)), this.height = Math.max(1, Math.floor(t)), this.fbBytes = this.width * this.height * 4, r.dwfv_reset_heap(), this.fbPtr = r.dwfv_alloc(this.fbBytes), this.ensureMemory(this.fbPtr + this.fbBytes), r.dwfv_clear(this.fbPtr, this.width, this.height, Zr(n, 4294967295));
	}
	drawPolyline(e, t, n, r = 1) {
		let i = this.requireExports();
		if (e.length < 4 || !n) return;
		let a = Math.floor(e.length / 2), o = this.allocF32(a * 2), s = new Float32Array(i.memory.buffer, o, a * 2);
		for (let n = 0; n < a; n++) {
			let [r, i] = Jr(t, e[n * 2], e[n * 2 + 1]);
			s[n * 2] = r, s[n * 2 + 1] = i;
		}
		i.dwfv_draw_polyline(this.fbPtr, this.width, this.height, o, a, Zr(n, 4278190080), Math.max(1, r));
	}
	drawPolygon(e, t, n) {
		let r = this.requireExports();
		if (e.length < 6 || !n) return;
		let i = Math.floor(e.length / 2), a = this.allocF32(i * 2), o = new Float32Array(r.memory.buffer, a, i * 2);
		for (let n = 0; n < i; n++) {
			let [r, i] = Jr(t, e[n * 2], e[n * 2 + 1]);
			o[n * 2] = r, o[n * 2 + 1] = i;
		}
		r.dwfv_draw_polygon(this.fbPtr, this.width, this.height, a, i, Zr(n, 4278190080));
	}
	toImageData() {
		let e = this.requireExports(), t = new Uint8ClampedArray(e.memory.buffer, this.fbPtr, this.fbBytes);
		return new ImageData(new Uint8ClampedArray(t), this.width, this.height);
	}
	allocF32(e) {
		let t = this.requireExports(), n = e * 4, r = t.dwfv_alloc(n);
		return this.ensureMemory(r + n), r;
	}
	ensureMemory(e) {
		let t = this.requireExports(), n = t.memory.buffer.byteLength;
		e > n && t.memory.grow(Math.ceil((e - n) / 65536));
	}
	requireExports() {
		if (!this.exports) throw Error("WASM backend is not initialized. Call init() first.");
		return this.exports;
	}
}, di = 12, fi = 134217728, pi = 4, mi = {
	a: 1,
	b: 0,
	c: 0,
	d: 1,
	e: 0,
	f: 0
}, hi = class {
	constructor(e) {
		this.scenes = /* @__PURE__ */ new Map(), this.gpuBytes = 0, this.tick = 0, this.canvas = e ?? document.createElement("canvas");
		let t = this.canvas.getContext("webgl", {
			alpha: !1,
			antialias: !0,
			depth: !1,
			stencil: !1,
			preserveDrawingBuffer: !0,
			powerPreference: "high-performance"
		});
		if (!t) throw Error("WebGLRenderingContext is not available.");
		this.gl = t, this.program = zi(t, Vi, Hi), this.aPos = t.getAttribLocation(this.program, "a_pos"), this.aColor = t.getAttribLocation(this.program, "a_color");
		let n = t.getUniformLocation(this.program, "u_matrix"), r = t.getUniformLocation(this.program, "u_viewport");
		if (this.aPos < 0 || this.aColor < 0 || !n || !r) throw Error("Failed to resolve WebGL shader locations.");
		this.uMatrix = n, this.uViewport = r;
	}
	render(e, t, n, r = {}) {
		let i = [];
		if (n.width <= 0 || n.height <= 0) return {
			commands: 0,
			warnings: i,
			gpuBytes: this.gpuBytes,
			vertexCount: 0,
			pathCount: 0,
			cacheHit: !0
		};
		this.resize(n.width, n.height);
		let a = ni({
			canvasWidth: this.canvas.width,
			canvasHeight: this.canvas.height,
			pageWidth: e.width,
			pageHeight: e.height,
			zoom: r.zoom,
			panX: r.panX,
			panY: r.panY
		}), o = {
			dpr: ai(n),
			zoom: r.zoom ?? 1
		}, s = Di(e, a, r), c = this.scenes.get(s), l = !!c;
		if (!c) {
			let n = gi(t);
			c = this.compileScene(e, s, n, a, r, o), this.scenes.set(s, c), this.gpuBytes += c.gpuBytes, this.evictIfNeeded(r), c = this.scenes.get(s) ?? c;
		}
		c.lastUsed = ++this.tick;
		let u = this.gl, d = Li(r.background ?? "#ffffff");
		if (u.viewport(0, 0, this.canvas.width, this.canvas.height), u.disable(u.DEPTH_TEST), u.disable(u.CULL_FACE), u.enable(u.BLEND), u.blendFunc(u.SRC_ALPHA, u.ONE_MINUS_SRC_ALPHA), u.clearColor(d[0], d[1], d[2], d[3]), u.clear(u.COLOR_BUFFER_BIT), u.useProgram(this.program), u.bindBuffer(u.ARRAY_BUFFER, c.buffer), u.enableVertexAttribArray(this.aPos), u.vertexAttribPointer(this.aPos, 2, u.FLOAT, !1, di, 0), u.enableVertexAttribArray(this.aColor), u.vertexAttribPointer(this.aColor, 4, u.UNSIGNED_BYTE, !0, di, 8), u.uniform4f(this.uMatrix, a.a, a.b, a.c, a.d), u.uniform4f(this.uViewport, a.e, a.f, this.canvas.width, this.canvas.height), u.drawArrays(u.TRIANGLES, 0, c.vertexCount), r.compositeToTarget ?? !0) {
			let e = n.getContext("2d");
			if (!e) throw Error("CanvasRenderingContext2D is not available for WebGL compositing.");
			e.save(), e.setTransform(1, 0, 0, 1, 0, 0), e.clearRect(0, 0, n.width, n.height), e.drawImage(this.canvas, 0, 0), e.restore();
		}
		return c.vertexCount === 0 && i.push(x("warning", "WEBGL_XPS_EMPTY_SCENE", "WebGL XPS scene contained no drawable vector geometry; Canvas/WASM fallback may be required.", e.sourcePath)), {
			commands: c.pathCount,
			warnings: i,
			gpuBytes: this.gpuBytes,
			vertexCount: c.vertexCount,
			pathCount: c.pathCount,
			cacheHit: l
		};
	}
	dispose() {
		for (let e of this.scenes.values()) this.gl.deleteBuffer(e.buffer);
		this.scenes.clear(), this.gpuBytes = 0;
	}
	resize(e, t) {
		(this.canvas.width !== e || this.canvas.height !== t) && (this.canvas.width = e, this.canvas.height = t);
	}
	compileScene(e, t, n, r, i, a) {
		let o = new yi(), s = 0;
		for (let e of n) s++, vi(o, e, r, i, a);
		let c = o.byteLength, l = i.maxGpuCacheBytes ?? fi;
		if (c > l) throw Error(`WebGL XPS scene buffer would require ${Ri(c)}, exceeding maxGpuCacheBytes=${Ri(l)}.`);
		let u = this.gl, d = u.createBuffer();
		if (!d) throw Error("Failed to allocate WebGLBuffer.");
		u.bindBuffer(u.ARRAY_BUFFER, d), u.bufferData(u.ARRAY_BUFFER, o.toArrayBuffer(), u.STATIC_DRAW);
		let f = u.getError();
		if (f !== u.NO_ERROR) throw u.deleteBuffer(d), Error(`WebGL XPS buffer upload failed: 0x${f.toString(16)} for ${e.sourcePath}.`);
		return {
			key: t,
			buffer: d,
			vertexCount: o.vertexCount,
			gpuBytes: c,
			pathCount: s,
			lastUsed: ++this.tick
		};
	}
	evictIfNeeded(e) {
		let t = e.maxGpuCacheBytes ?? fi, n = e.maxCachedScenes ?? pi;
		for (; this.scenes.size > Math.max(1, n) || this.gpuBytes > t;) {
			let e;
			for (let t of this.scenes.values()) (!e || t.lastUsed < e.lastUsed) && (e = t);
			if (!e) break;
			this.scenes.delete(e.key), this.gl.deleteBuffer(e.buffer), this.gpuBytes -= e.gpuBytes;
		}
	}
};
function gi(e) {
	let t = [];
	return _i(e, mi, 1, t), t;
}
function _i(e, t, n, r) {
	let i = D(e), a = qr(t, Oi(e)), o = n * Mi(O(e, "Opacity"));
	if (i === "Path") {
		let t = ki(e);
		if (t.length > 0) {
			let n = Ai(e, "Fill", o), i = Ai(e, "Stroke", o), s = Number(O(e, "StrokeThickness") ?? 1);
			(n || i && s > 0) && r.push({
				commands: t,
				matrix: a,
				opacity: o,
				fill: n,
				stroke: i,
				thickness: Number.isFinite(s) ? s : 1,
				lineStyle: Pi(e),
				fillRule: Ni(e),
				bounds: Fi(t)
			});
		}
	}
	for (let t of k(e)) D(t).includes(".") || _i(t, a, o, r);
}
function vi(e, t, n, r, i) {
	let a = qr(n, t.matrix), o = ii(t.matrix), s = Math.max(1e-6, t.thickness || 1), c = Math.max(.01, oi(s, a, r, i) * o), l = Nn(t.commands, .5), u = t.fill ? Ii(t.fill) : void 0, d = t.stroke ? Ii(t.stroke) : void 0;
	if (u && ci(t.bounds, a, r, i)) for (let n of l) (n.closed || n.points.length >= 6) && bi(e, wi(n.points, t.matrix), u);
	if (d && t.thickness > 0) for (let n of l) {
		let r = wi(n.points, t.matrix), i = n.closed ? Ti(r) : r;
		t.lineStyle.dash.length > 0 ? Si(e, i, c, t.lineStyle, d) : xi(e, i, c, d);
	}
}
var yi = class {
	constructor() {
		this.buffer = /* @__PURE__ */ new ArrayBuffer(65536), this.view = new DataView(this.buffer), this.vertexCount = 0;
	}
	get byteLength() {
		return this.vertexCount * di;
	}
	push(e, t, n) {
		if (!Number.isFinite(e) || !Number.isFinite(t)) return;
		let r = this.byteLength;
		this.ensure(di), this.view.setFloat32(r, e, !0), this.view.setFloat32(r + 4, t, !0), this.view.setUint8(r + 8, n.r), this.view.setUint8(r + 9, n.g), this.view.setUint8(r + 10, n.b), this.view.setUint8(r + 11, n.a), this.vertexCount++;
	}
	toArrayBuffer() {
		return this.buffer.slice(0, this.byteLength);
	}
	ensure(e) {
		let t = this.byteLength + e;
		if (t <= this.buffer.byteLength) return;
		let n = this.buffer.byteLength;
		for (; n < t;) n *= 2;
		let r = new ArrayBuffer(n);
		new Uint8Array(r).set(new Uint8Array(this.buffer, 0, this.byteLength)), this.buffer = r, this.view = new DataView(this.buffer);
	}
};
function bi(e, t, n) {
	if (t.length < 3) return;
	let r = t[0];
	for (let i = 1; i + 1 < t.length; i++) {
		let a = t[i], o = t[i + 1];
		Ei(r, a, o) < 1e-6 || (e.push(r.x, r.y, n), e.push(a.x, a.y, n), e.push(o.x, o.y, n));
	}
}
function xi(e, t, n, r) {
	if (t.length < 2) return;
	let i = Math.max(.05, n * .5);
	for (let n = 0; n + 1 < t.length; n++) Ci(e, t[n], t[n + 1], i, r);
}
function Si(e, t, n, r, i) {
	if (t.length < 2 || r.dash.length === 0) return;
	let a = r.dash.map((e) => Math.max(.01, e * n)), o = a.reduce((e, t) => e + t, 0);
	if (o <= .01) {
		xi(e, t, n, i);
		return;
	}
	let s = 0, c = a[0], l = !0, u = (r.dashOffset * n % o + o) % o;
	for (; u > c;) u -= c, s = (s + 1) % a.length, c = a[s], l = !l;
	c -= u;
	for (let r = 0; r + 1 < t.length; r++) {
		let o = t[r], u = t[r + 1], d = u.x - o.x, f = u.y - o.y, p = Math.hypot(d, f);
		if (p <= 1e-9) continue;
		let m = 0;
		for (; m < p - 1e-9;) {
			let t = Math.min(c, p - m);
			if (l && t > 1e-9) {
				let r = m / p, a = (m + t) / p;
				Ci(e, {
					x: o.x + d * r,
					y: o.y + f * r
				}, {
					x: o.x + d * a,
					y: o.y + f * a
				}, Math.max(.05, n * .5), i);
			}
			m += t, c -= t, c <= 1e-9 && (s = (s + 1) % a.length, c = a[s], l = !l);
		}
	}
}
function Ci(e, t, n, r, i) {
	let a = n.x - t.x, o = n.y - t.y, s = Math.hypot(a, o);
	if (s <= 1e-9) return;
	let c = -o / s * r, l = a / s * r, u = t.x + c, d = t.y + l, f = t.x - c, p = t.y - l, m = n.x - c, h = n.y - l, g = n.x + c, _ = n.y + l;
	e.push(u, d, i), e.push(f, p, i), e.push(m, h, i), e.push(u, d, i), e.push(m, h, i), e.push(g, _, i);
}
function wi(e, t) {
	let n = [];
	for (let r = 0; r + 1 < e.length; r += 2) {
		let [i, a] = Jr(t, e[r] ?? 0, e[r + 1] ?? 0);
		n.push({
			x: i,
			y: a
		});
	}
	return n;
}
function Ti(e) {
	if (e.length < 2) return e;
	let t = e[0], n = e[e.length - 1];
	return t.x === n.x && t.y === n.y ? e : [...e, {
		x: t.x,
		y: t.y
	}];
}
function Ei(e, t, n) {
	return Math.abs((t.x - e.x) * (n.y - e.y) - (t.y - e.y) * (n.x - e.x));
}
function Di(e, t, n) {
	let r = n.lineWeightMode ?? "adaptive", i = r === "physical" ? "physical" : String(Math.round(Math.log2(Math.max(1e-12, ii(t))) * 8));
	return `${e.id}|${e.sourcePath}|${e.width}x${e.height}|lw:${r}:${i}`;
}
function Oi(e) {
	let t = Yr(O(e, "RenderTransform") ?? O(e, "Transform"));
	for (let n of k(e)) {
		let e = D(n);
		if (e.endsWith(".RenderTransform") || e.endsWith(".Transform")) {
			let e = k(n).find((e) => D(e) === "MatrixTransform");
			e && (t = qr(t, Yr(O(e, "Matrix"))));
		}
	}
	let n = Number(O(e, "Canvas.Left") ?? 0), r = Number(O(e, "Canvas.Top") ?? 0);
	return (n || r) && (t = qr({
		a: 1,
		b: 0,
		c: 0,
		d: 1,
		e: n,
		f: r
	}, t)), t;
}
function ki(e) {
	let t = O(e, "Data");
	if (t) return jn(t);
	for (let t of k(e)) if (D(t) === "Path.Data") for (let e of k(t)) {
		let t = O(e, "Figures");
		if (t) return jn(t);
	}
	return [];
}
function Ai(e, t, n) {
	let r = O(e, t);
	if (r) return Xr(r, n);
	let i = ji(e, t, "SolidColorBrush");
	if (i) return Xr(O(i, "Color"), n * Mi(O(i, "Opacity")));
}
function ji(e, t, n) {
	let r = `${D(e)}.${t}`;
	for (let t of k(e)) if (D(t) === r) return k(t).find((e) => D(e) === n);
}
function Mi(e) {
	if (!e) return 1;
	let t = Number(e);
	return Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 1;
}
function Ni(e) {
	let t = O(e, "Data") ?? "";
	return /F0/.test(t) ? "nonzero" : "evenodd";
}
function Pi(e) {
	let t = (O(e, "StrokeStartLineCap") ?? "").toLowerCase(), n = (O(e, "StrokeEndLineCap") ?? "").toLowerCase(), r = (O(e, "StrokeDashCap") ?? "").toLowerCase(), i = t === "round" || n === "round" || r === "round" ? "round" : t === "square" || n === "square" || r === "square" ? "square" : "butt", a = (O(e, "StrokeLineJoin") ?? "").toLowerCase(), o = a === "round" ? "round" : a === "bevel" ? "bevel" : "miter", s = Number(O(e, "StrokeMiterLimit") ?? 10);
	return {
		cap: i,
		join: o,
		miterLimit: Number.isFinite(s) && s > 0 ? s : 10,
		dash: j(O(e, "StrokeDashArray") ?? "").filter((e) => Number.isFinite(e) && e > 0),
		dashOffset: Number(O(e, "StrokeDashOffset") ?? 0) || 0
	};
}
function Fi(e) {
	let t = Infinity, n = Infinity, r = -Infinity, i = -Infinity, a = (e, a) => {
		Number.isFinite(e) && Number.isFinite(a) && (t = Math.min(t, e), n = Math.min(n, a), r = Math.max(r, e), i = Math.max(i, a));
	};
	for (let t of e) t.type === "M" || t.type === "L" ? a(t.x, t.y) : t.type === "C" ? (a(t.x1, t.y1), a(t.x2, t.y2), a(t.x, t.y)) : t.type === "Q" ? (a(t.x1, t.y1), a(t.x, t.y)) : t.type === "A" && (a(t.x - t.rx, t.y - t.ry), a(t.x + t.rx, t.y + t.ry));
	return Number.isFinite(t) ? {
		minX: t,
		minY: n,
		maxX: r,
		maxY: i
	} : void 0;
}
function Ii(e) {
	let t = Zr(e, 4278190080);
	return {
		r: t & 255,
		g: t >>> 8 & 255,
		b: t >>> 16 & 255,
		a: t >>> 24 & 255
	};
}
function Li(e) {
	let t = Ii(e);
	return [
		t.r / 255,
		t.g / 255,
		t.b / 255,
		t.a / 255
	];
}
function Ri(e) {
	return e < 1024 ? `${e} B` : e < 1048576 ? `${(e / 1024).toFixed(1)} KiB` : `${(e / 1024 / 1024).toFixed(1)} MiB`;
}
function zi(e, t, n) {
	let r = Bi(e, e.VERTEX_SHADER, t), i = Bi(e, e.FRAGMENT_SHADER, n), a = e.createProgram();
	if (!a) throw Error("Failed to create WebGLProgram.");
	if (e.attachShader(a, r), e.attachShader(a, i), e.linkProgram(a), e.deleteShader(r), e.deleteShader(i), !e.getProgramParameter(a, e.LINK_STATUS)) {
		let t = e.getProgramInfoLog(a) ?? "unknown link error";
		throw e.deleteProgram(a), Error(`WebGL program link failed: ${t}`);
	}
	return a;
}
function Bi(e, t, n) {
	let r = e.createShader(t);
	if (!r) throw Error("Failed to create WebGLShader.");
	if (e.shaderSource(r, n), e.compileShader(r), !e.getShaderParameter(r, e.COMPILE_STATUS)) {
		let t = e.getShaderInfoLog(r) ?? "unknown shader compile error";
		throw e.deleteShader(r), Error(`WebGL shader compile failed: ${t}`);
	}
	return r;
}
var Vi = "\nattribute vec2 a_pos;\nattribute vec4 a_color;\nuniform vec4 u_matrix;\nuniform vec4 u_viewport;\nvarying vec4 v_color;\nvoid main() {\n  float x = u_matrix.x * a_pos.x + u_matrix.z * a_pos.y + u_viewport.x;\n  float y = u_matrix.y * a_pos.x + u_matrix.w * a_pos.y + u_viewport.y;\n  vec2 clip = vec2((x / u_viewport.z) * 2.0 - 1.0, 1.0 - (y / u_viewport.w) * 2.0);\n  gl_Position = vec4(clip, 0.0, 1.0);\n  v_color = a_color;\n}\n", Hi = "\nprecision mediump float;\nvarying vec4 v_color;\nvoid main() {\n  gl_FragColor = v_color;\n}\n", Ui = class {
	constructor(e) {
		this.document = e, this.fontCache = /* @__PURE__ */ new Map(), this.xmlCache = /* @__PURE__ */ new Map();
	}
	async render(e, t, n = {}) {
		if (!this.document.opc) throw Error("XPS page requires an OPC package view.");
		let r = S(e.diagnostics), i = (await this.getXmlDocument(e.sourcePath)).documentElement, a = t.getContext("2d");
		if (!a) throw Error("CanvasRenderingContext2D is not available.");
		let o = n.background ?? "#ffffff", s = {
			dpr: ai(t),
			zoom: n.zoom ?? 1
		}, c = ni({
			canvasWidth: t.width,
			canvasHeight: t.height,
			pageWidth: e.width,
			pageHeight: e.height,
			zoom: n.zoom,
			panX: n.panX,
			panY: n.panY
		}), l = 0;
		if (n.preferWebgl ?? !0) try {
			let o = this.getWebGlBackend(n.webglCanvas);
			n.webglCanvas && (n.webglCanvas.style.visibility = "visible");
			let u = o.render(e, i, t, {
				...n,
				compositeToTarget: !n.webglCanvas
			});
			return a.save(), a.setTransform(1, 0, 0, 1, 0, 0), a.clearRect(0, 0, t.width, t.height), a.restore(), l += u.commands, l += await this.renderElementToCanvas(i, a, e.sourcePath, c, 1, r, {
				vectors: !1,
				overlays: !0
			}, n, s), r.push(...u.warnings), {
				backend: "webgl-xps",
				commands: l,
				warnings: r
			};
		} catch (t) {
			n.webglCanvas && (n.webglCanvas.style.visibility = "hidden"), r.push(x("warning", "WEBGL_XPS_BACKEND_FALLBACK", `WebGL XPS vector path failed, falling back to ${n.preferWasm ? "WASM raster" : "Canvas2D"}: ${String(t)}`, e.sourcePath));
		}
		if (n.webglCanvas && (n.webglCanvas.style.visibility = "hidden"), n.preferWasm) try {
			return this.wasm ??= new ui({ wasmUrl: n.wasmUrl }), await this.wasm.init(), this.wasm.begin(t.width, t.height, o), l += this.renderElementToWasm(i, c, 1, r, n, s), a.setTransform(1, 0, 0, 1, 0, 0), a.putImageData(this.wasm.toImageData(), 0, 0), l += await this.renderElementToCanvas(i, a, e.sourcePath, c, 1, r, {
				vectors: !1,
				overlays: !0
			}, n, s), {
				backend: "wasm-raster",
				commands: l,
				warnings: r
			};
		} catch (e) {
			r.push(x("warning", "WASM_BACKEND_FALLBACK", `WASM raster path failed, falling back to Canvas2D: ${String(e)}`));
		}
		return a.save(), a.setTransform(1, 0, 0, 1, 0, 0), a.fillStyle = o, a.fillRect(0, 0, t.width, t.height), a.restore(), l += await this.renderElementToCanvas(i, a, e.sourcePath, c, 1, r, {
			vectors: !0,
			overlays: !0
		}, n, s), {
			backend: "canvas2d",
			commands: l,
			warnings: r
		};
	}
	getWebGlBackend(e) {
		return this.webgl && this.webglCanvas === e || (this.webgl?.dispose(), this.webgl = new hi(e), this.webglCanvas = e), this.webgl;
	}
	getXmlDocument(e) {
		let t = this.xmlCache.get(e);
		return t || (t = this.document.opc.readText(e).then((t) => A(t, e)), this.xmlCache.set(e, t)), t;
	}
	dispose() {
		this.webgl?.dispose(), this.webgl = void 0, this.webglCanvas = void 0, this.xmlCache.clear(), this.fontCache.clear();
	}
	async renderElementToCanvas(e, t, n, r, i, a, o, s, c) {
		let l = D(e), u = qr(r, Zi(e)), d = i * na(O(e, "Opacity")), f = 0;
		if (l === "Path" && o.vectors) {
			let n = Qi(e);
			if (n.length > 0) {
				t.save(), t.setTransform(u.a, u.b, u.c, u.d, u.e, u.f), t.globalAlpha = d;
				let r = O(e, "Clip");
				r && (t.beginPath(), Mn(t, jn(r)), t.clip()), t.beginPath(), Mn(t, n);
				let i = ea(e, "Fill", d), a = ea(e, "Stroke", d), o = Number(O(e, "StrokeThickness") ?? 1), l = Gi(n);
				i && ci(l, u, s, c) && (t.fillStyle = i, t.fill(ra(e))), a && o > 0 && (t.strokeStyle = a, t.lineWidth = oi(o, u, s, c), Wi(t, e, t.lineWidth), t.stroke()), t.restore(), f++;
			}
		} else if (l === "Glyphs" && o.overlays) f += await this.drawGlyphs(t, n, e, u, d, a, s, c);
		else if (l === "Image" && o.overlays) {
			let r = O(e, "Source") ?? O(e, "ImageSource");
			if (r) try {
				await this.drawImageResource(t, n, r, u, d, e), f++;
			} catch (e) {
				a.push(x("warning", "XPS_IMAGE_DRAW_FAILED", `Failed to draw image ${r}: ${String(e)}`, n));
			}
		} else l === "Canvas" || l === "FixedPage" || l.endsWith(".RenderTransform") || l.endsWith(".Resources");
		if (l === "Path" && o.overlays) {
			let r = ta(e, "Fill", "ImageBrush"), i = r ? O(r, "ImageSource") : void 0;
			if (r && i) try {
				await this.drawImageBrush(t, n, i, u, d, e, r), f++;
			} catch (e) {
				a.push(x("warning", "XPS_IMAGEBRUSH_FAILED", `Failed to draw ImageBrush ${i}: ${String(e)}`, n));
			}
		}
		for (let r of k(e)) D(r).includes(".") || (f += await this.renderElementToCanvas(r, t, n, u, d, a, o, s, c));
		return f;
	}
	renderElementToWasm(e, t, n, r, i, a) {
		if (!this.wasm) return 0;
		let o = D(e), s = qr(t, Zi(e)), c = n * na(O(e, "Opacity")), l = 0;
		if (o === "Path") {
			let t = Qi(e);
			if (t.length > 0) {
				let n = ea(e, "Fill", c), r = ea(e, "Stroke", c), o = Number(O(e, "StrokeThickness") ?? 1), u = oi(o, s, i, a) * Math.max(1e-12, Math.hypot(s.a, s.b)), d = Nn(t, .5);
				if (n) for (let e of d) (e.closed || e.points.length >= 6) && this.wasm.drawPolygon(e.points, s, n);
				if (r && o > 0) for (let e of d) this.wasm.drawPolyline(e.points, s, r, u);
				l++;
			}
		}
		for (let t of k(e)) D(t).includes(".") || (l += this.renderElementToWasm(t, s, c, r, i, a));
		return l;
	}
	async drawGlyphs(e, t, n, r, i, a, o, s) {
		let c = O(n, "UnicodeString") ?? "";
		if (!c) return 0;
		let l = Number(O(n, "OriginX") ?? 0), u = Number(O(n, "OriginY") ?? 0), d = Number(O(n, "FontRenderingEmSize") ?? 12);
		if (!si(d, r, o, s)) return 0;
		let f = ea(n, "Fill", i) ?? "#000000", p = await this.fontFamilyForGlyphs(t, n, a) ?? "sans-serif";
		e.save(), e.setTransform(r.a, r.b, r.c, r.d, r.e, r.f), e.globalAlpha = i, e.fillStyle = f, e.font = `${d}px "${p}"`, e.textBaseline = "alphabetic";
		let m = O(n, "Indices");
		return m ? Ki(e, c, m, l, u, d) : e.fillText(c, l, u), e.restore(), 1;
	}
	async fontFamilyForGlyphs(e, t, n) {
		let r = O(t, "FontUri");
		if (!r) return;
		let i = ie(e, r.replace(/^\//, "")), a = this.fontCache.get(i);
		return a || (a = this.loadFontFace(i).catch((t) => {
			n.push(x("warning", "XPS_FONT_LOAD_FAILED", `Failed to load embedded XPS font ${i}: ${String(t)}`, e));
		}), this.fontCache.set(i, a)), a;
	}
	async loadFontFace(e) {
		let t = globalThis.FontFace, n = document.fonts;
		if (!t || !n) return;
		let r = await this.document.opc.readBytes(e), i = ve(e) ?? "font/ttf";
		/\.odttf$/i.test(e) && (r = qi(e, r), i = "font/ttf");
		let a = `dwfv_xps_${Xi(e)}`, o = new Blob([r], { type: i }), s = URL.createObjectURL(o), c = new t(a, `url("${s}")`);
		try {
			return await c.load(), n.add(c), URL.revokeObjectURL(s), a;
		} catch (e) {
			throw URL.revokeObjectURL(s), e;
		}
	}
	async drawImageResource(e, t, n, r, i, a) {
		let o = this.document.opc, s = ie(t, n.replace(/^\//, "")), c = await ye(await o.readBytes(s), o.getContentType(s) ?? ve(s) ?? "image/png"), l = Number(O(a, "Width") ?? ("width" in c ? c.width : 0)), u = Number(O(a, "Height") ?? ("height" in c ? c.height : 0)), d = Number(O(a, "Canvas.Left") ?? O(a, "X") ?? 0), f = Number(O(a, "Canvas.Top") ?? O(a, "Y") ?? 0);
		e.save(), e.setTransform(r.a, r.b, r.c, r.d, r.e, r.f), e.globalAlpha = i, e.drawImage(c, d, f, l || c.width, u || c.height), e.restore();
	}
	async drawImageBrush(e, t, n, r, i, a, o) {
		let s = this.document.opc, c = ie(t, n.replace(/^\//, "")), l = await ye(await s.readBytes(c), s.getContentType(c) ?? ve(c) ?? "image/png"), u = ia(O(o, "Viewport")) ?? ia(O(o, "Viewbox")) ?? [
			0,
			0,
			Number(l.width ?? 1),
			Number(l.height ?? 1)
		], d = Qi(a);
		e.save(), e.setTransform(r.a, r.b, r.c, r.d, r.e, r.f), e.globalAlpha = i, d.length > 0 && (e.beginPath(), Mn(e, d), e.clip()), e.drawImage(l, u[0], u[1], u[2], u[3]), e.restore();
	}
};
function Wi(e, t, n) {
	let r = (O(t, "StrokeStartLineCap") ?? "").toLowerCase(), i = (O(t, "StrokeEndLineCap") ?? "").toLowerCase(), a = (O(t, "StrokeDashCap") ?? "").toLowerCase();
	e.lineCap = r === "round" || i === "round" || a === "round" ? "round" : r === "square" || i === "square" || a === "square" ? "square" : "butt";
	let o = (O(t, "StrokeLineJoin") ?? "").toLowerCase();
	e.lineJoin = o === "round" ? "round" : o === "bevel" ? "bevel" : "miter";
	let s = Number(O(t, "StrokeMiterLimit") ?? 10);
	Number.isFinite(s) && s > 0 && (e.miterLimit = s);
	let c = j(O(t, "StrokeDashArray") ?? "");
	if (c.length > 0) {
		let r = Number(O(t, "StrokeDashOffset") ?? 0);
		e.setLineDash(c.map((e) => Math.max(0, e * n))), e.lineDashOffset = Number.isFinite(r) ? r * n : 0;
	} else e.setLineDash([]), e.lineDashOffset = 0;
}
function Gi(e) {
	let t = Infinity, n = Infinity, r = -Infinity, i = -Infinity, a = (e, a) => {
		Number.isFinite(e) && Number.isFinite(a) && (t = Math.min(t, e), n = Math.min(n, a), r = Math.max(r, e), i = Math.max(i, a));
	};
	for (let t of e) t.type === "M" || t.type === "L" ? a(t.x, t.y) : t.type === "C" ? (a(t.x1, t.y1), a(t.x2, t.y2), a(t.x, t.y)) : t.type === "Q" ? (a(t.x1, t.y1), a(t.x, t.y)) : t.type === "A" && (a(t.x - t.rx, t.y - t.ry), a(t.x + t.rx, t.y + t.ry));
	return Number.isFinite(t) ? {
		minX: t,
		minY: n,
		maxX: r,
		maxY: i
	} : void 0;
}
function Ki(e, t, n, r, i, a) {
	let o = n.split(";"), s = r, c = 0;
	for (let n of o) {
		let r = n.trim();
		if (!r) continue;
		let o = r.split(","), l = Number(o[1] ?? ""), u = Number(o[3] ?? 0), d = Number(o[4] ?? 0), f = t[c++] ?? "";
		f && e.fillText(f, s + (Number.isFinite(u) ? u : 0), i + (Number.isFinite(d) ? d : 0)), s += Number.isFinite(l) && l > 0 ? l * a / 100 : e.measureText(f || " ").width;
	}
	c < t.length && e.fillText(t.slice(c), s, i);
}
function qi(e, t) {
	let n = (e.split("/").pop() ?? "").replace(/\.odttf$/i, "").replace(/[^0-9a-fA-F]/g, "");
	if (n.length !== 32 || t.length < 32) return t;
	let r = /* @__PURE__ */ new Uint8Array(16);
	for (let e = 0; e < 16; e++) r[e] = parseInt(n.slice(e * 2, e * 2 + 2), 16);
	let i = new Uint8Array(t);
	for (let e = 0; e < Math.min(32, i.length); e++) i[e] = (i[e] ?? 0) ^ r[15 - e % 16];
	if (!Yi(i)) {
		let e = Ji(n), r = new Uint8Array(t);
		for (let t = 0; t < Math.min(32, r.length); t++) r[t] = (r[t] ?? 0) ^ e[15 - t % 16];
		if (Yi(r)) return r;
	}
	return i;
}
function Ji(e) {
	let t = /* @__PURE__ */ new Uint8Array(16), n = /* @__PURE__ */ new Uint8Array(16);
	for (let t = 0; t < 16; t++) n[t] = parseInt(e.slice(t * 2, t * 2 + 2), 16);
	t[0] = n[3], t[1] = n[2], t[2] = n[1], t[3] = n[0], t[4] = n[5], t[5] = n[4], t[6] = n[7], t[7] = n[6];
	for (let e = 8; e < 16; e++) t[e] = n[e];
	return t;
}
function Yi(e) {
	if (e.length < 4) return !1;
	let t = String.fromCharCode(e[0], e[1], e[2], e[3]);
	return t === "OTTO" || t === "true" || t === "typ1" || t === "ttcf" || e[0] === 0 && e[1] === 1 && e[2] === 0 && e[3] === 0;
}
function Xi(e) {
	let t = 2166136261;
	for (let n = 0; n < e.length; n++) t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
	return (t >>> 0).toString(36);
}
function Zi(e) {
	let t = Yr(O(e, "RenderTransform") ?? O(e, "Transform"));
	for (let n of k(e)) {
		let e = D(n);
		if (e.endsWith(".RenderTransform") || e.endsWith(".Transform")) {
			let e = k(n).find((e) => D(e) === "MatrixTransform");
			e && (t = qr(t, Yr(O(e, "Matrix"))));
		}
	}
	let n = Number(O(e, "Canvas.Left") ?? 0), r = Number(O(e, "Canvas.Top") ?? 0);
	return (n || r) && (t = qr({
		a: 1,
		b: 0,
		c: 0,
		d: 1,
		e: n,
		f: r
	}, t)), t;
}
function Qi(e) {
	let t = O(e, "Data");
	if (t) return jn(t);
	for (let t of k(e)) if (D(t) === "Path.Data") for (let e of k(t)) {
		let t = O(e, "Figures");
		if (t) return jn(t);
		if (D(e) === "PathGeometry") {
			let t = $i(e);
			if (t) return jn(t);
		}
	}
	return [];
}
function $i(e) {
	let t = [];
	for (let n of k(e).filter((e) => D(e) === "PathFigure")) {
		let e = j(O(n, "StartPoint") ?? "");
		e.length >= 2 && t.push(`M ${e[0]} ${e[1]}`);
		for (let e of k(n)) {
			let n = D(e);
			if (n === "LineSegment") {
				let n = j(O(e, "Point") ?? "");
				n.length >= 2 && t.push(`L ${n[0]} ${n[1]}`);
			} else if (n === "PolyLineSegment") {
				let n = j(O(e, "Points") ?? "");
				for (let e = 0; e + 1 < n.length; e += 2) t.push(`L ${n[e]} ${n[e + 1]}`);
			} else if (n === "BezierSegment") {
				let n = j(O(e, "Point1") + " " + O(e, "Point2") + " " + O(e, "Point3"));
				n.length >= 6 && t.push(`C ${n.slice(0, 6).join(" ")}`);
			} else if (n === "PolyBezierSegment") {
				let n = j(O(e, "Points") ?? "");
				for (let e = 0; e + 5 < n.length; e += 6) t.push(`C ${n.slice(e, e + 6).join(" ")}`);
			}
		}
		O(n, "IsClosed") === "true" && t.push("Z");
	}
	return t.length ? t.join(" ") : void 0;
}
function ea(e, t, n) {
	let r = O(e, t);
	if (r) return Xr(r, n);
	let i = ta(e, t, "SolidColorBrush");
	if (i) return Xr(O(i, "Color"), n * na(O(i, "Opacity")));
}
function ta(e, t, n) {
	let r = `${D(e)}.${t}`;
	for (let t of k(e)) if (D(t) === r) return k(t).find((e) => D(e) === n);
}
function na(e) {
	if (!e) return 1;
	let t = Number(e);
	return Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 1;
}
function ra(e) {
	let t = O(e, "Data") ?? "";
	return /F0/.test(t) ? "nonzero" : "evenodd";
}
function ia(e) {
	if (!e) return;
	let t = j(e);
	if (t.length >= 4) return [
		t[0],
		t[1],
		t[2],
		t[3]
	];
}
// node_modules/.pnpm/dwf-viewer@0.6.7_three@0.186.1/node_modules/dwf-viewer/dist/render/WebGlW2dBackend.js
var aa = 12, oa = 100663296, sa = 3, ca = class {
	constructor(e) {
		this.scenes = /* @__PURE__ */ new Map(), this.gpuBytes = 0, this.tick = 0, this.canvas = e ?? document.createElement("canvas");
		let t = this.canvas.getContext("webgl", {
			alpha: !1,
			antialias: !0,
			depth: !1,
			stencil: !1,
			preserveDrawingBuffer: !0,
			powerPreference: "high-performance"
		});
		if (!t) throw Error("WebGLRenderingContext is not available.");
		this.gl = t, this.program = Ca(t, Ta, Ea), this.aPos = t.getAttribLocation(this.program, "a_pos"), this.aColor = t.getAttribLocation(this.program, "a_color");
		let n = t.getUniformLocation(this.program, "u_matrix"), r = t.getUniformLocation(this.program, "u_viewport");
		if (this.aPos < 0 || this.aColor < 0 || !n || !r) throw Error("Failed to resolve WebGL shader locations.");
		this.uMatrix = n, this.uViewport = r;
	}
	render(e, t, n = {}) {
		let r = [];
		if (t.width <= 0 || t.height <= 0) return {
			commands: 0,
			warnings: r,
			gpuBytes: this.gpuBytes,
			vertexCount: 0,
			textCount: 0,
			cacheHit: !0
		};
		this.resize(t.width, t.height);
		let i = ri(e, this.canvas.width, this.canvas.height, n.zoom, n.panX, n.panY), a = {
			dpr: ai(t),
			zoom: n.zoom ?? 1
		}, o = ua(e, i, n), s = this.scenes.get(o), c = !!s;
		s ||= (s = this.compileScene(e, o, n, i, a), this.scenes.set(o, s), this.gpuBytes += s.gpuBytes, this.evictIfNeeded(n), this.scenes.get(o) ?? s), s.lastUsed = ++this.tick;
		let l = this.gl, u = xa(n.background ?? "#ffffff");
		l.viewport(0, 0, this.canvas.width, this.canvas.height), l.disable(l.DEPTH_TEST), l.disable(l.CULL_FACE), l.enable(l.BLEND), l.blendFunc(l.SRC_ALPHA, l.ONE_MINUS_SRC_ALPHA), l.clearColor(u[0], u[1], u[2], u[3]), l.clear(l.COLOR_BUFFER_BIT), l.useProgram(this.program), l.bindBuffer(l.ARRAY_BUFFER, s.buffer), l.enableVertexAttribArray(this.aPos), l.vertexAttribPointer(this.aPos, 2, l.FLOAT, !1, aa, 0), l.enableVertexAttribArray(this.aColor), l.vertexAttribPointer(this.aColor, 4, l.UNSIGNED_BYTE, !0, aa, 8), l.uniform4f(this.uMatrix, i.a, i.b, i.c, i.d), l.uniform4f(this.uViewport, i.e, i.f, this.canvas.width, this.canvas.height), l.drawArrays(l.TRIANGLES, 0, s.vertexCount);
		let d = t.getContext("2d");
		if (!d) throw Error("CanvasRenderingContext2D is not available for WebGL text overlay.");
		return d.save(), d.setTransform(1, 0, 0, 1, 0, 0), d.clearRect(0, 0, t.width, t.height), (n.compositeToTarget ?? !0) && d.drawImage(this.canvas, 0, 0), this.drawTextOverlay(d, e, i), d.restore(), s.vertexCount === 0 && e.primitives.some((e) => e.type !== "text") && r.push(x("warning", "WEBGL_EMPTY_SCENE", "WebGL scene contained no drawable geometry; Canvas/WASM fallback may be required.", e.sourcePath)), {
			commands: s.primitiveCount,
			warnings: r,
			gpuBytes: this.gpuBytes,
			vertexCount: s.vertexCount,
			textCount: s.textCount,
			cacheHit: c
		};
	}
	dispose() {
		for (let e of this.scenes.values()) this.gl.deleteBuffer(e.buffer);
		this.scenes.clear(), this.gpuBytes = 0;
	}
	resize(e, t) {
		(this.canvas.width !== e || this.canvas.height !== t) && (this.canvas.width = e, this.canvas.height = t);
	}
	compileScene(e, t, n, r, i) {
		let a = new da(), o = 0, s = 0;
		for (let t of e.primitives) t.type === "text" ? s++ : (o++, fa(a, t, r, n, i));
		let c = a.byteLength, l = n.maxGpuCacheBytes ?? oa;
		if (c > l) throw Error(`WebGL scene buffer would require ${Sa(c)}, exceeding maxGpuCacheBytes=${Sa(l)}.`);
		let u = this.gl, d = u.createBuffer();
		if (!d) throw Error("Failed to allocate WebGLBuffer.");
		u.bindBuffer(u.ARRAY_BUFFER, d), u.bufferData(u.ARRAY_BUFFER, a.toArrayBuffer(), u.STATIC_DRAW);
		let f = u.getError();
		if (f !== u.NO_ERROR) throw u.deleteBuffer(d), Error(`WebGL buffer upload failed: 0x${f.toString(16)}.`);
		return {
			key: t,
			buffer: d,
			vertexCount: a.vertexCount,
			gpuBytes: c,
			primitiveCount: o,
			textCount: s,
			lastUsed: ++this.tick
		};
	}
	evictIfNeeded(e) {
		let t = e.maxGpuCacheBytes ?? oa, n = e.maxCachedScenes ?? sa;
		for (; this.scenes.size > Math.max(1, n) || this.gpuBytes > t;) {
			let e;
			for (let t of this.scenes.values()) (!e || t.lastUsed < e.lastUsed) && (e = t);
			if (!e) break;
			this.scenes.delete(e.key), this.gl.deleteBuffer(e.buffer), this.gpuBytes -= e.gpuBytes;
		}
	}
	drawTextOverlay(e, t, n) {
		let r = this.canvas.width, i = this.canvas.height;
		for (let a of t.primitives) {
			if (a.type !== "text") continue;
			let t = qr(n, a.matrix ?? la), [o, s] = Jr(t, a.x, a.y), c = ya(t), l = Math.max(2, Math.min(768, Math.abs((a.size ?? 12) * c)));
			if (l < 2.5) continue;
			let u = a.text.split(/\n/), d = u.reduce((e, t) => Math.max(e, t.length), 0), f = Math.max(24, d * l * .65), p = Math.max(l, u.length * l * 1.15);
			if (!(o + f < -64 || o > r + 64 || s + p < -64 || s - p > i + 64)) {
				e.save(), e.setTransform(1, 0, 0, 1, 0, 0), e.fillStyle = a.fill ?? a.stroke ?? "#000000", e.font = `${l}px sans-serif`, e.textBaseline = "alphabetic";
				for (let t = 0; t < u.length; t++) e.fillText(u[t] ?? "", o, s + t * l * 1.15);
				e.restore();
			}
		}
	}
}, la = {
	a: 1,
	b: 0,
	c: 0,
	d: 1,
	e: 0,
	f: 0
};
function ua(e, t, n) {
	let r = n.lineWeightMode ?? "adaptive", i = r === "physical" ? "physical" : String(Math.round(Math.log2(Math.max(1e-12, ii(t))) * 8));
	return `${e.id}|${e.sourcePath}|${e.primitives.length}|lw:${r}:${i}`;
}
var da = class {
	constructor() {
		this.buffer = /* @__PURE__ */ new ArrayBuffer(65536), this.view = new DataView(this.buffer), this.vertexCount = 0;
	}
	get byteLength() {
		return this.vertexCount * aa;
	}
	push(e, t, n) {
		if (!Number.isFinite(e) || !Number.isFinite(t)) return;
		let r = this.byteLength;
		this.ensure(aa), this.view.setFloat32(r, e, !0), this.view.setFloat32(r + 4, t, !0), this.view.setUint8(r + 8, n.r), this.view.setUint8(r + 9, n.g), this.view.setUint8(r + 10, n.b), this.view.setUint8(r + 11, n.a), this.vertexCount++;
	}
	toArrayBuffer() {
		return this.buffer.slice(0, this.byteLength);
	}
	ensure(e) {
		let t = this.byteLength + e;
		if (t <= this.buffer.byteLength) return;
		let n = this.buffer.byteLength;
		for (; n < t;) n *= 2;
		let r = new ArrayBuffer(n);
		new Uint8Array(r).set(new Uint8Array(this.buffer, 0, this.byteLength)), this.buffer = r, this.view = new DataView(this.buffer);
	}
};
function fa(e, t, n, r, i) {
	let a = t.matrix ?? la, o = ya(a), s = qr(n, a), c = Math.max(.01, oi(t.lineWidth ?? 1, s, r, i) * o);
	if (t.type === "polyline") {
		let n = ba(t.stroke ?? "#000000");
		ha(e, pa(t.points, a), c, n);
	} else if (t.type === "polygon") {
		let n = pa(t.points, a);
		t.fill && ma(e, n, ba(t.fill)), t.stroke && ha(e, _a(n), c, ba(t.stroke));
	} else if (t.type === "rect") {
		let n = pa([
			t.x,
			t.y,
			t.x + t.width,
			t.y,
			t.x + t.width,
			t.y + t.height,
			t.x,
			t.y + t.height
		], a);
		t.fill && ma(e, n, ba(t.fill)), t.stroke && ha(e, _a(n), c, ba(t.stroke));
	} else if (t.type === "path") {
		let n = Nn(t.commands, .5), r = t.fill ? ba(t.fill) : void 0, i = t.stroke ? ba(t.stroke) : void 0;
		for (let t of n) {
			let n = pa(t.points, a);
			r && (t.closed || n.length >= 6) && ma(e, n, r), i && ha(e, n, c, i);
		}
	}
}
function pa(e, t) {
	let n = [];
	for (let r = 0; r + 1 < e.length; r += 2) {
		let [i, a] = Jr(t, e[r] ?? 0, e[r + 1] ?? 0);
		n.push({
			x: i,
			y: a
		});
	}
	return n;
}
function ma(e, t, n) {
	if (t.length < 3) return;
	let r = t[0];
	for (let i = 1; i + 1 < t.length; i++) {
		let a = t[i], o = t[i + 1];
		va(r, a, o) < 1e-6 || (e.push(r.x, r.y, n), e.push(a.x, a.y, n), e.push(o.x, o.y, n));
	}
}
function ha(e, t, n, r) {
	if (t.length < 2) return;
	let i = Math.max(.05, n * .5);
	for (let n = 0; n + 1 < t.length; n++) ga(e, t[n], t[n + 1], i, r);
}
function ga(e, t, n, r, i) {
	let a = n.x - t.x, o = n.y - t.y, s = Math.hypot(a, o);
	if (s <= 1e-9) return;
	let c = -o / s * r, l = a / s * r, u = t.x + c, d = t.y + l, f = t.x - c, p = t.y - l, m = n.x - c, h = n.y - l, g = n.x + c, _ = n.y + l;
	e.push(u, d, i), e.push(f, p, i), e.push(m, h, i), e.push(u, d, i), e.push(m, h, i), e.push(g, _, i);
}
function _a(e) {
	if (e.length < 2) return e;
	let t = e[0], n = e[e.length - 1];
	return t.x === n.x && t.y === n.y ? e : [...e, {
		x: t.x,
		y: t.y
	}];
}
function va(e, t, n) {
	return Math.abs((t.x - e.x) * (n.y - e.y) - (t.y - e.y) * (n.x - e.x));
}
function ya(e) {
	let t = Math.hypot(e.a, e.b), n = Math.hypot(e.c, e.d);
	return Math.max(1e-9, (t + n) * .5);
}
function ba(e) {
	let t = Zr(e, 4278190080);
	return {
		r: t & 255,
		g: t >>> 8 & 255,
		b: t >>> 16 & 255,
		a: t >>> 24 & 255
	};
}
function xa(e) {
	let t = ba(e);
	return [
		t.r / 255,
		t.g / 255,
		t.b / 255,
		t.a / 255
	];
}
function Sa(e) {
	return e < 1024 ? `${e} B` : e < 1048576 ? `${(e / 1024).toFixed(1)} KiB` : `${(e / 1024 / 1024).toFixed(1)} MiB`;
}
function Ca(e, t, n) {
	let r = wa(e, e.VERTEX_SHADER, t), i = wa(e, e.FRAGMENT_SHADER, n), a = e.createProgram();
	if (!a) throw Error("Failed to create WebGLProgram.");
	if (e.attachShader(a, r), e.attachShader(a, i), e.linkProgram(a), e.deleteShader(r), e.deleteShader(i), !e.getProgramParameter(a, e.LINK_STATUS)) {
		let t = e.getProgramInfoLog(a) ?? "unknown link error";
		throw e.deleteProgram(a), Error(`WebGL program link failed: ${t}`);
	}
	return a;
}
function wa(e, t, n) {
	let r = e.createShader(t);
	if (!r) throw Error("Failed to create WebGLShader.");
	if (e.shaderSource(r, n), e.compileShader(r), !e.getShaderParameter(r, e.COMPILE_STATUS)) {
		let t = e.getShaderInfoLog(r) ?? "unknown shader compile error";
		throw e.deleteShader(r), Error(`WebGL shader compile failed: ${t}`);
	}
	return r;
}
var Ta = "\nattribute vec2 a_pos;\nattribute vec4 a_color;\nuniform vec4 u_matrix;\nuniform vec4 u_viewport;\nvarying vec4 v_color;\nvoid main() {\n  float x = u_matrix.x * a_pos.x + u_matrix.z * a_pos.y + u_viewport.x;\n  float y = u_matrix.y * a_pos.x + u_matrix.w * a_pos.y + u_viewport.y;\n  vec2 clip = vec2((x / u_viewport.z) * 2.0 - 1.0, 1.0 - (y / u_viewport.w) * 2.0);\n  gl_Position = vec4(clip, 0.0, 1.0);\n  v_color = a_color;\n}\n", Ea = "\nprecision mediump float;\nvarying vec4 v_color;\nvoid main() {\n  gl_FragColor = v_color;\n}\n", Da = class {
	async render(e, t, n = {}) {
		let r = S(e.diagnostics), i = n.background ?? "#ffffff";
		if (n.preferWebgl ?? !0) try {
			let i = this.getWebGlBackend(n.webglCanvas);
			n.webglCanvas && (n.webglCanvas.style.visibility = "visible");
			let a = i.render(e, t, {
				...n,
				compositeToTarget: !n.webglCanvas
			}), o = Aa(a.gpuBytes), s = a.cacheHit ? "cache hit" : "cache upload";
			return r.push(x("info", "WEBGL_W2D_RENDERED", `WebGL rendered ${a.vertexCount} vertices, ${a.textCount} text item(s), GPU cache ${o}, ${s}.`, e.sourcePath)), r.push(...a.warnings), {
				backend: "webgl",
				commands: a.commands,
				warnings: r
			};
		} catch (t) {
			r.push(x("warning", "WEBGL_BACKEND_FALLBACK", `WebGL vector path failed, falling back to ${n.preferWasm ? "WASM raster" : "Canvas2D"}: ${String(t)}`, e.sourcePath));
		}
		n.webglCanvas && (n.webglCanvas.style.visibility = "hidden");
		let a = t.getContext("2d");
		if (!a) throw Error("CanvasRenderingContext2D is not available.");
		let o = ri(e, t.width, t.height, n.zoom, n.panX, n.panY), s = {
			dpr: ai(t),
			zoom: n.zoom ?? 1
		}, c = 0;
		if (n.preferWasm) try {
			this.wasm ??= new ui({ wasmUrl: n.wasmUrl }), await this.wasm.init(), this.wasm.begin(t.width, t.height, i);
			for (let t of e.primitives) c += this.drawPrimitiveWasm(t, o, n, s);
			a.setTransform(1, 0, 0, 1, 0, 0), a.putImageData(this.wasm.toImageData(), 0, 0);
			for (let t of e.primitives.filter((e) => e.type === "text")) c += this.drawPrimitiveCanvas(a, t, o, n, s);
			return {
				backend: "wasm-raster",
				commands: c,
				warnings: r
			};
		} catch (t) {
			r.push(x("warning", "WASM_BACKEND_FALLBACK", `WASM raster path failed, falling back to Canvas2D: ${String(t)}`, e.sourcePath));
		}
		a.save(), a.setTransform(1, 0, 0, 1, 0, 0), a.fillStyle = i, a.fillRect(0, 0, t.width, t.height), a.restore();
		for (let t of e.primitives) c += this.drawPrimitiveCanvas(a, t, o, n, s);
		return {
			backend: "canvas2d",
			commands: c,
			warnings: r
		};
	}
	dispose() {
		this.webgl?.dispose(), this.webgl = void 0, this.webglCanvas = void 0;
	}
	getWebGlBackend(e) {
		return this.webgl && this.webglCanvas === e || (this.webgl?.dispose(), this.webgl = new ca(e), this.webglCanvas = e), this.webgl;
	}
	drawPrimitiveCanvas(e, t, n, r, i) {
		let a = qr(n, t.matrix ?? {
			a: 1,
			b: 0,
			c: 0,
			d: 1,
			e: 0,
			f: 0
		}), o = Xr(t.stroke ?? "#000000") ?? "#000000", s = Xr(t.fill);
		if (t.type === "text") {
			let [n, c] = Jr(a, t.x, t.y), l = Math.max(1, Math.abs((t.size ?? 12) * ka(a)));
			if (!si(t.size ?? 12, a, r, i) || n > e.canvas.width + 64 || c > e.canvas.height + 64 || n < -e.canvas.width || c < -e.canvas.height) return 0;
			e.save(), e.setTransform(1, 0, 0, 1, 0, 0), e.fillStyle = s ?? o, e.font = `${Math.min(768, l)}px sans-serif`, e.textBaseline = "alphabetic";
			for (let [r, i] of t.text.split(/\n/).entries()) e.fillText(i, n, c + r * l * 1.15);
			return e.restore(), 1;
		}
		if (e.save(), e.setTransform(a.a, a.b, a.c, a.d, a.e, a.f), e.lineWidth = oi(t.lineWidth ?? 1, a, r, i), t.type === "polyline") {
			if (t.points.length >= 4) {
				e.beginPath(), e.moveTo(t.points[0], t.points[1]);
				for (let n = 2; n + 1 < t.points.length; n += 2) e.lineTo(t.points[n], t.points[n + 1]);
				e.strokeStyle = o, e.stroke();
			}
		} else if (t.type === "polygon") {
			if (t.points.length >= 6) {
				e.beginPath(), e.moveTo(t.points[0], t.points[1]);
				for (let n = 2; n + 1 < t.points.length; n += 2) e.lineTo(t.points[n], t.points[n + 1]);
				e.closePath(), s && (e.fillStyle = s, e.fill()), t.stroke && (e.strokeStyle = o, e.stroke());
			}
		} else t.type === "rect" ? (s && (e.fillStyle = s, e.fillRect(t.x, t.y, t.width, t.height)), t.stroke && (e.strokeStyle = o, e.strokeRect(t.x, t.y, t.width, t.height))) : t.type === "path" && (e.beginPath(), Mn(e, t.commands), s && (e.fillStyle = s, e.fill()), t.stroke && (e.strokeStyle = o, e.stroke()));
		return e.restore(), 1;
	}
	drawPrimitiveWasm(e, t, n, r) {
		if (!this.wasm || e.type === "text") return 0;
		let i = qr(t, e.matrix ?? {
			a: 1,
			b: 0,
			c: 0,
			d: 1,
			e: 0,
			f: 0
		}), a = ii(i), o = (e) => oi(e ?? 1, i, n, r) * a;
		if (e.type === "polyline") this.wasm.drawPolyline(e.points, i, Xr(e.stroke ?? "#000000"), o(e.lineWidth));
		else if (e.type === "polygon") this.wasm.drawPolygon(e.points, i, Xr(e.fill)), e.stroke && this.wasm.drawPolyline(Oa(e.points), i, Xr(e.stroke), o(e.lineWidth));
		else if (e.type === "rect") {
			let t = [
				e.x,
				e.y,
				e.x + e.width,
				e.y,
				e.x + e.width,
				e.y + e.height,
				e.x,
				e.y + e.height,
				e.x,
				e.y
			];
			e.fill && this.wasm.drawPolygon(t, i, Xr(e.fill)), e.stroke && this.wasm.drawPolyline(t, i, Xr(e.stroke), o(e.lineWidth));
		} else if (e.type === "path") {
			let t = Nn(e.commands, .5), n = Xr(e.fill), r = Xr(e.stroke);
			if (n) for (let e of t) (e.closed || e.points.length >= 6) && this.wasm.drawPolygon(e.points, i, n);
			if (r) for (let n of t) this.wasm.drawPolyline(n.points, i, r, o(e.lineWidth));
		}
		return 1;
	}
};
function Oa(e) {
	if (e.length < 4) return e;
	let t = e[0], n = e[1], r = e[e.length - 2], i = e[e.length - 1];
	return t === r && n === i ? e : [
		...e,
		t,
		n
	];
}
function ka(e) {
	return Math.max(1e-9, (Math.hypot(e.a, e.b) + Math.hypot(e.c, e.d)) * .5);
}
function Aa(e) {
	return e < 1024 ? `${e} B` : e < 1048576 ? `${(e / 1024).toFixed(1)} KiB` : `${(e / 1024 / 1024).toFixed(1)} MiB`;
}
// node_modules/.pnpm/dwf-viewer@0.6.7_three@0.186.1/node_modules/dwf-viewer/dist/render/ThreeW3dRenderer.js
var ja = class {
	constructor() {
		this.cache = /* @__PURE__ */ new Map();
	}
	async render(e, t, n = {}) {
		let r = n.webglCanvas ?? t;
		n.webglCanvas && (n.webglCanvas.style.visibility = "visible"), Fa(t);
		let i = this.ensureContext(r), a = this.ensureProgram(i), o = this.ensureEdgeProgram(i), s = this.ensureScene(i, e);
		this.evictScenes(i, n.maxCachedScenes ?? 2, n.maxGpuCacheBytes ?? 167772160), i.viewport(0, 0, r.width, r.height), i.enable(i.DEPTH_TEST), i.disable(i.CULL_FACE), i.clearColor(.97, .98, 1, 1), i.clear(i.COLOR_BUFFER_BIT | i.DEPTH_BUFFER_BIT), i.useProgram(a.program);
		let c = za(e, r, n);
		i.uniformMatrix4fv(a.uMvp, !1, c.mvp), i.uniformMatrix4fv(a.uModel, !1, Ba()), i.uniform3f(a.uLight0, .35, .65, .68), i.uniform3f(a.uLight1, -.75, .4, -.5), i.uniform1f(a.uAmbient, .28);
		let l = 0;
		i.enable(i.POLYGON_OFFSET_FILL), i.polygonOffset(1, 1);
		for (let e of s.meshes) {
			let t = e.mesh.color ?? [
				.72,
				.74,
				.78
			];
			i.uniform3f(a.uColor, t[0], t[1], t[2]), e.vao && "bindVertexArray" in i ? i.bindVertexArray(e.vao) : Pa(i, a, e), i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, e.index), i.drawElements(i.TRIANGLES, e.indexCount, e.indexType, 0), l++;
		}
		i.disable(i.POLYGON_OFFSET_FILL), Ga(i) && i.bindVertexArray(null), i.useProgram(o.program), i.uniformMatrix4fv(o.uMvp, !1, c.mvp), i.uniform3f(o.uColor, .035, .04, .045), i.enable(i.DEPTH_TEST);
		for (let e of s.meshes) e.edgeIndex && e.edgeIndexCount && (i.bindBuffer(i.ARRAY_BUFFER, e.pos), i.enableVertexAttribArray(o.aPosition), i.vertexAttribPointer(o.aPosition, 3, i.FLOAT, !1, 0, 0), i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, e.edgeIndex), i.drawElements(i.LINES, e.edgeIndexCount, e.edgeIndexType ?? e.indexType, 0), l++);
		return {
			backend: "threejs-webgl",
			commands: l,
			warnings: S(e.diagnostics)
		};
	}
	dispose() {
		if (this.gl) for (let e of this.cache.values()) Ma(this.gl, e);
		this.cache.clear(), this.program = void 0, this.edgeProgram = void 0;
	}
	ensureContext(e) {
		if (this.gl && this.currentCanvas === e) return this.gl;
		let t = e.getContext("webgl2", {
			antialias: !0,
			alpha: !1
		}) ?? e.getContext("webgl", {
			antialias: !0,
			alpha: !1
		});
		if (!t) throw Error("WebGL is not available for 3D W3D rendering.");
		if (this.gl && this.currentCanvas !== e) {
			for (let e of this.cache.values()) Ma(this.gl, e);
			this.cache.clear();
		}
		return this.gl = t, this.currentCanvas = e, this.program = void 0, this.edgeProgram = void 0, t;
	}
	ensureProgram(e) {
		if (this.program) return this.program;
		let t = La(e, Ia(e, e.VERTEX_SHADER, "\n      attribute vec3 a_position;\n      attribute vec3 a_normal;\n      uniform mat4 u_mvp;\n      uniform mat4 u_model;\n      varying vec3 v_normal;\n      void main() {\n        v_normal = normalize((u_model * vec4(a_normal, 0.0)).xyz);\n        gl_Position = u_mvp * vec4(a_position, 1.0);\n      }\n    "), Ia(e, e.FRAGMENT_SHADER, "\n      precision mediump float;\n      varying vec3 v_normal;\n      uniform vec3 u_color;\n      uniform vec3 u_light0;\n      uniform vec3 u_light1;\n      uniform float u_ambient;\n      void main() {\n        vec3 n = normalize(v_normal);\n        float d0 = max(dot(n, normalize(u_light0)), 0.0);\n        float d1 = max(dot(n, normalize(u_light1)), 0.0) * 0.45;\n        vec3 color = u_color * (u_ambient + d0 * 0.78 + d1);\n        gl_FragColor = vec4(color, 1.0);\n      }\n    ")), n = {
			program: t,
			aPosition: e.getAttribLocation(t, "a_position"),
			aNormal: e.getAttribLocation(t, "a_normal"),
			uMvp: Ra(e, t, "u_mvp"),
			uModel: Ra(e, t, "u_model"),
			uColor: Ra(e, t, "u_color"),
			uLight0: Ra(e, t, "u_light0"),
			uLight1: Ra(e, t, "u_light1"),
			uAmbient: Ra(e, t, "u_ambient")
		};
		return this.program = n, n;
	}
	ensureEdgeProgram(e) {
		if (this.edgeProgram) return this.edgeProgram;
		let t = La(e, Ia(e, e.VERTEX_SHADER, "\n      attribute vec3 a_position;\n      uniform mat4 u_mvp;\n      void main() {\n        gl_Position = u_mvp * vec4(a_position, 1.0);\n      }\n    "), Ia(e, e.FRAGMENT_SHADER, "\n      precision mediump float;\n      uniform vec3 u_color;\n      void main() {\n        gl_FragColor = vec4(u_color, 0.9);\n      }\n    "));
		return this.edgeProgram = {
			program: t,
			aPosition: e.getAttribLocation(t, "a_position"),
			uMvp: Ra(e, t, "u_mvp"),
			uColor: Ra(e, t, "u_color")
		}, this.edgeProgram;
	}
	evictScenes(e, t, n) {
		let r = Array.from(this.cache.values()).reduce((e, t) => e + t.bytes, 0);
		for (; this.cache.size > Math.max(1, t) || r > n;) {
			let t = this.cache.entries().next().value;
			if (!t) break;
			this.cache.delete(t[0]), Ma(e, t[1]), r -= t[1].bytes;
		}
	}
	ensureScene(e, t) {
		let n = this.cache.get(t);
		if (n) return n;
		let r = [], i = 0, a = this.ensureProgram(e), o = typeof e.createVertexArray == "function";
		for (let n of t.model.meshes) {
			let t = Na(e, e.ARRAY_BUFFER, n.positions), s = n.normals ?? new Float32Array(n.positions.length), c = {
				mesh: n,
				pos: t,
				normal: Na(e, e.ARRAY_BUFFER, s),
				index: Na(e, e.ELEMENT_ARRAY_BUFFER, n.indices),
				edgeIndex: n.edgeIndices ? Na(e, e.ELEMENT_ARRAY_BUFFER, n.edgeIndices) : void 0,
				indexType: n.indices instanceof Uint32Array ? e.UNSIGNED_INT : e.UNSIGNED_SHORT,
				edgeIndexType: n.edgeIndices instanceof Uint32Array ? e.UNSIGNED_INT : e.UNSIGNED_SHORT,
				indexCount: n.indices.length,
				edgeIndexCount: n.edgeIndices?.length,
				bytes: n.positions.byteLength + s.byteLength + n.indices.byteLength + (n.edgeIndices?.byteLength ?? 0)
			};
			if ((n.indices instanceof Uint32Array || n.edgeIndices instanceof Uint32Array) && !Ga(e) && !e.getExtension("OES_element_index_uint")) throw Error("This WebGL implementation does not support 32-bit element indices.");
			if (o) {
				let t = e, n = t.createVertexArray();
				t.bindVertexArray(n), Pa(e, a, c), t.bindVertexArray(null), c.vao = n;
			}
			r.push(c), i += c.bytes;
		}
		let s = {
			page: t,
			meshes: r,
			bytes: i
		};
		return this.cache.set(t, s), s;
	}
};
function Ma(e, t) {
	for (let n of t.meshes) e.deleteBuffer(n.pos), e.deleteBuffer(n.normal), e.deleteBuffer(n.index), n.edgeIndex && e.deleteBuffer(n.edgeIndex), n.vao && Ga(e) && e.deleteVertexArray(n.vao);
}
function Na(e, t, n) {
	let r = e.createBuffer();
	if (!r) throw Error("Failed to create WebGL buffer.");
	return e.bindBuffer(t, r), e.bufferData(t, n, e.STATIC_DRAW), r;
}
function Pa(e, t, n) {
	e.bindBuffer(e.ARRAY_BUFFER, n.pos), e.enableVertexAttribArray(t.aPosition), e.vertexAttribPointer(t.aPosition, 3, e.FLOAT, !1, 0, 0), e.bindBuffer(e.ARRAY_BUFFER, n.normal), e.enableVertexAttribArray(t.aNormal), e.vertexAttribPointer(t.aNormal, 3, e.FLOAT, !1, 0, 0);
}
function Fa(e) {
	let t = e.getContext("2d");
	t && (t.setTransform(1, 0, 0, 1, 0, 0), t.clearRect(0, 0, e.width, e.height));
}
function Ia(e, t, n) {
	let r = e.createShader(t);
	if (!r) throw Error("Failed to create WebGL shader.");
	if (e.shaderSource(r, n), e.compileShader(r), !e.getShaderParameter(r, e.COMPILE_STATUS)) {
		let t = e.getShaderInfoLog(r) ?? "unknown shader error";
		throw e.deleteShader(r), Error(t);
	}
	return r;
}
function La(e, t, n) {
	let r = e.createProgram();
	if (!r) throw Error("Failed to create WebGL program.");
	if (e.attachShader(r, t), e.attachShader(r, n), e.linkProgram(r), !e.getProgramParameter(r, e.LINK_STATUS)) {
		let t = e.getProgramInfoLog(r) ?? "unknown program link error";
		throw e.deleteProgram(r), Error(t);
	}
	return r;
}
function Ra(e, t, n) {
	let r = e.getUniformLocation(t, n);
	if (!r) throw Error(`Missing shader uniform ${n}.`);
	return r;
}
function za(e, t, n) {
	let r = e.model.bounds, i = Math.max(1e-6, t.width / Math.max(1, t.height)), a = n.yaw ?? -.78, o = Wa(n.pitch ?? .55, -1.45, 1.45), s = Math.max(.05, Math.min(100, n.zoom ?? 1)), c = Math.max(1e-4, r.radius), l = c * 2.55 / s, u = Math.cos(o), d = [
		Math.sin(a) * u,
		Math.sin(o),
		Math.cos(a) * u
	], f = r.center, p = [
		Math.cos(a),
		0,
		-Math.sin(a)
	], m = [
		p[1] * d[2] - p[2] * d[1],
		p[2] * d[0] - p[0] * d[2],
		p[0] * d[1] - p[1] * d[0]
	], h = c * 2 / Math.max(1, Math.min(t.width, t.height)) / Math.max(.1, s), g = (n.panX ?? 0) * h, _ = (n.panY ?? 0) * h, v = [
		f[0] - p[0] * g + m[0] * _,
		f[1] - p[1] * g + m[1] * _,
		f[2] - p[2] * g + m[2] * _
	], y = Ha([
		v[0] + d[0] * l,
		v[1] + d[1] * l,
		v[2] + d[2] * l
	], v, [
		0,
		1,
		0
	]);
	return { mvp: Ua(Va(Math.PI / 4, i, Math.max(.001, l - c * 2.2), l + c * 3.2), y) };
}
function Ba() {
	return new Float32Array([
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1,
		0,
		0,
		0,
		0,
		1
	]);
}
function Va(e, t, n, r) {
	let i = 1 / Math.tan(e / 2), a = 1 / (n - r);
	return new Float32Array([
		i / t,
		0,
		0,
		0,
		0,
		i,
		0,
		0,
		0,
		0,
		(r + n) * a,
		-1,
		0,
		0,
		2 * r * n * a,
		0
	]);
}
function Ha(e, t, n) {
	let r = e[0] - t[0], i = e[1] - t[1], a = e[2] - t[2], o = Math.hypot(r, i, a) || 1;
	r /= o, i /= o, a /= o;
	let s = n[1] * a - n[2] * i, c = n[2] * r - n[0] * a, l = n[0] * i - n[1] * r;
	o = Math.hypot(s, c, l) || 1, s /= o, c /= o, l /= o;
	let u = i * l - a * c, d = a * s - r * l, f = r * c - i * s;
	return new Float32Array([
		s,
		u,
		r,
		0,
		c,
		d,
		i,
		0,
		l,
		f,
		a,
		0,
		-(s * e[0] + c * e[1] + l * e[2]),
		-(u * e[0] + d * e[1] + f * e[2]),
		-(r * e[0] + i * e[1] + a * e[2]),
		1
	]);
}
function Ua(e, t) {
	let n = /* @__PURE__ */ new Float32Array(16);
	for (let r = 0; r < 4; r++) for (let i = 0; i < 4; i++) n[r * 4 + i] = e[0 + i] * t[r * 4 + 0] + e[4 + i] * t[r * 4 + 1] + e[8 + i] * t[r * 4 + 2] + e[12 + i] * t[r * 4 + 3];
	return n;
}
function Wa(e, t, n) {
	return Math.max(t, Math.min(n, e));
}
function Ga(e) {
	return typeof WebGL2RenderingContext < "u" && e instanceof WebGL2RenderingContext;
}
// node_modules/.pnpm/dwf-viewer@0.6.7_three@0.186.1/node_modules/dwf-viewer/dist/render/PageRenderer.js
var Ka = class {
	constructor(e) {
		this.document = e;
	}
	async render(e, t, n = {}) {
		let r = this.document.pageData[e];
		if (!r) throw Error(`Page index out of range: ${e}`);
		return r.kind !== "w2d-text" && r.kind !== "w3d-model" && n.webglCanvas && (n.webglCanvas.style.visibility = "hidden"), r.kind === "xps-fixed-page" ? (this.xps ??= new Ui(this.document), await this.xps.render(r, t, n)) : r.kind === "w2d-text" ? (this.w2d ??= new Da(), await this.w2d.render(r, t, n)) : r.kind === "w3d-model" ? (this.w3d ??= new ja(), await this.w3d.render(r, t, n)) : r.kind === "image" ? await this.renderImage(r, t, n) : this.renderUnsupported(r, t, n);
	}
	dispose() {
		this.xps?.dispose(), this.w2d?.dispose(), this.w3d?.dispose();
	}
	async renderImage(e, t, n) {
		let r = this.document.zip;
		if (!r) throw Error("Image page requires a ZIP package.");
		let i = t.getContext("2d");
		if (!i) throw Error("CanvasRenderingContext2D is not available.");
		i.save(), i.setTransform(1, 0, 0, 1, 0, 0), i.fillStyle = n.background ?? "#ffffff", i.fillRect(0, 0, t.width, t.height), i.restore();
		let a = await ye(await r.read(e.sourcePath), e.mediaType), o = "width" in a ? a.width : a.naturalWidth, s = "height" in a ? a.height : a.naturalHeight, c = Math.min(t.width / Math.max(1, o), t.height / Math.max(1, s)) * (n.zoom ?? 1), l = o * c, u = s * c, d = (t.width - l) / 2 + (n.panX ?? 0), f = (t.height - u) / 2 + (n.panY ?? 0);
		return i.drawImage(a, d, f, l, u), {
			backend: "image",
			commands: 1,
			warnings: S(e.diagnostics)
		};
	}
	renderUnsupported(e, t, n) {
		let r = t.getContext("2d");
		if (!r) throw Error("CanvasRenderingContext2D is not available.");
		return r.save(), r.setTransform(1, 0, 0, 1, 0, 0), r.fillStyle = n.background ?? "#ffffff", r.fillRect(0, 0, t.width, t.height), r.fillStyle = "#111827", r.font = "16px sans-serif", qa(r, e.name, 32, 48, t.width - 64, 24), r.font = "13px sans-serif", r.fillStyle = "#92400e", qa(r, e.reason, 32, 88, t.width - 64, 20), r.restore(), {
			backend: "unsupported",
			commands: 0,
			warnings: [...e.diagnostics, x("warning", "PAGE_UNSUPPORTED", e.reason, e.sourcePath)]
		};
	}
};
function qa(e, t, n, r, i, a) {
	let o = t.split(/\s+/), s = "";
	for (let t of o) {
		let o = s ? `${s} ${t}` : t;
		e.measureText(o).width > i && s ? (e.fillText(s, n, r), s = t, r += a) : s = o;
	}
	s && e.fillText(s, n, r);
}
// node_modules/.pnpm/dwf-viewer@0.6.7_three@0.186.1/node_modules/dwf-viewer/dist/viewer/DwfViewerBase.js
var Ja = class {
	constructor(e, t = {}) {
		this.pageIndex = 0, this.zoom = 1, this.panX = 0, this.panY = 0, this.yaw = -.78, this.pitch = .55, this.rendering = !1, this.renderAgain = !1, this.renderRaf = 0, this.renderSeq = 0, this.currentDpr = 1, this.preferWebgl = t.preferWebgl ?? !0, this.preferWasm = t.preferWasm ?? !0, this.wasmUrl = t.wasmUrl, this.background = t.background ?? "#ffffff", this.maxDevicePixelRatio = t.maxDevicePixelRatio ?? 2, this.maxCanvasPixels = t.maxCanvasPixels ?? 16777216, this.maxGpuCacheBytes = t.maxGpuCacheBytes, this.maxCachedScenes = t.maxCachedScenes, this.lineWeightMode = t.lineWeightMode ?? "adaptive", this.minStrokeCssPx = t.minStrokeCssPx, this.maxOverviewStrokeCssPx = t.maxOverviewStrokeCssPx, this.minTextCssPx = t.minTextCssPx, this.minFilledAreaCssPx = t.minFilledAreaCssPx, this.root = document.createElement("div"), this.root.className = "dwfv-root";
		let n = document.createElement("div");
		n.className = "dwfv-toolbar", this.pageSelect = document.createElement("select"), this.zoomOutButton = Ya("−"), this.zoomInButton = Ya("+"), this.resetButton = Ya("适应"), this.status = document.createElement("span"), this.status.className = "dwfv-status", n.append("页: ", this.pageSelect, this.zoomOutButton, this.zoomInButton, this.resetButton, this.status);
		let r = document.createElement("div");
		r.className = "dwfv-workspace", this.treePanel = document.createElement("div"), this.treePanel.className = "dwfv-tree", this.treePanel.style.display = "none";
		let i = document.createElement("div");
		i.className = "dwfv-stage", this.webglCanvas = document.createElement("canvas"), this.webglCanvas.className = "dwfv-canvas dwfv-webgl-canvas", this.webglCanvas.style.visibility = "hidden", this.canvas = document.createElement("canvas"), this.canvas.className = "dwfv-canvas dwfv-overlay-canvas", this.canvas.style.touchAction = "none", i.append(this.webglCanvas, this.canvas), r.append(this.treePanel, i), this.root.append(n, r), e.replaceChildren(this.root), this.pageSelect.addEventListener("change", () => {
			this.pageIndex = this.pageSelect.selectedIndex, this.resetView(), this.populateModelTree(), this.requestRender();
		}), this.zoomOutButton.addEventListener("click", () => {
			this.zoomAtCenter(.8), this.requestRender();
		}), this.zoomInButton.addEventListener("click", () => {
			this.zoomAtCenter(1.25), this.requestRender();
		}), this.resetButton.addEventListener("click", () => {
			this.resetView(), this.requestRender();
		}), this.canvas.addEventListener("wheel", (e) => this.onWheel(e), { passive: !1 }), this.canvas.addEventListener("pointerdown", (e) => this.onPointerDown(e)), window.addEventListener("pointermove", (e) => this.onPointerMove(e)), window.addEventListener("pointerup", () => {
			this.drag = void 0;
		}), this.canvas.addEventListener("contextmenu", (e) => e.preventDefault()), new ResizeObserver(() => this.requestRender()).observe(i), this.setStatus("选择 .dwf/.dwfx 文件");
	}
	setPreferWebgl(e) {
		this.preferWebgl = e, this.requestRender();
	}
	setPreferWasm(e) {
		this.preferWasm = e, this.requestRender();
	}
	setLineWeightMode(e) {
		this.lineWeightMode = e, this.renderer?.dispose(), this.requestRender();
	}
	async load(e, t = {}) {
		this.setStatus("解析文件中…"), this.renderer?.dispose(), this.doc = await Wr(e, { fileName: t.fileName }), this.renderer = new Ka(this.doc), this.pageIndex = t.pageIndex ?? 0, this.zoom = 1, this.panX = this.panY = 0, this.yaw = -.78, this.pitch = .55, this.preferWebgl = t.preferWebgl ?? this.preferWebgl, this.preferWasm = t.preferWasm ?? this.preferWasm, this.wasmUrl = t.wasmUrl ?? this.wasmUrl, this.background = t.background ?? this.background, this.maxGpuCacheBytes = t.maxGpuCacheBytes ?? this.maxGpuCacheBytes, this.maxCachedScenes = t.maxCachedScenes ?? this.maxCachedScenes, this.lineWeightMode = t.lineWeightMode ?? this.lineWeightMode, this.minStrokeCssPx = t.minStrokeCssPx ?? this.minStrokeCssPx, this.maxOverviewStrokeCssPx = t.maxOverviewStrokeCssPx ?? this.maxOverviewStrokeCssPx, this.minTextCssPx = t.minTextCssPx ?? this.minTextCssPx, this.minFilledAreaCssPx = t.minFilledAreaCssPx ?? this.minFilledAreaCssPx, this.populatePages(), this.populateModelTree(), await this.render();
	}
	async render() {
		if (this.renderer && this.doc) {
			if (this.rendering) return this.renderAgain = !0, this.pendingRender;
			this.rendering = !0;
			try {
				this.resizeCanvasToDisplaySize();
				let e = this.doc.pageData[this.pageIndex];
				if (!e) return;
				let t = ++this.renderSeq, n = this.renderer.render(this.pageIndex, this.canvas, {
					zoom: this.zoom,
					panX: this.panX,
					panY: this.panY,
					preferWebgl: this.preferWebgl,
					preferWasm: this.preferWasm,
					wasmUrl: this.wasmUrl,
					background: this.background,
					maxGpuCacheBytes: this.maxGpuCacheBytes,
					maxCachedScenes: this.maxCachedScenes,
					webglCanvas: this.webglCanvas,
					yaw: this.yaw,
					pitch: this.pitch,
					lineWeightMode: this.lineWeightMode,
					minStrokeCssPx: this.minStrokeCssPx,
					maxOverviewStrokeCssPx: this.maxOverviewStrokeCssPx,
					minTextCssPx: this.minTextCssPx,
					minFilledAreaCssPx: this.minFilledAreaCssPx
				});
				this.pendingRender = n;
				try {
					let r = await n;
					if (this.pendingRender === n && t === this.renderSeq) {
						let t = r.warnings.filter((e) => e.level !== "info").length, n = this.currentDpr > 1 ? ` · DPR ${this.currentDpr.toFixed(2)}` : "";
						this.setStatus(`${this.doc.kind.toUpperCase()} · ${e.kind} · ${r.backend} · ${r.commands} ops${n}${t ? ` · ${t} 警告` : ""}`, t > 0);
					}
					return r;
				} catch (e) {
					throw t === this.renderSeq && this.setStatus(`渲染失败：${String(e)}`, !0), e;
				}
			} finally {
				this.rendering = !1, this.renderAgain && (this.renderAgain = !1, this.requestRender());
			}
		}
	}
	getDocument() {
		return this.doc;
	}
	fit() {
		this.resetView(), this.requestRender();
	}
	dispose() {
		this.renderRaf && cancelAnimationFrame(this.renderRaf), this.renderRaf = 0, this.renderer?.dispose(), this.renderer = void 0, this.doc = void 0, this.root.replaceChildren();
	}
	requestRender() {
		this.renderRaf ||= requestAnimationFrame(() => {
			this.renderRaf = 0, this.render();
		});
	}
	populatePages() {
		this.pageSelect.replaceChildren();
		let e = this.doc?.pageData ?? [];
		for (let [t, n] of e.entries()) {
			let e = document.createElement("option");
			e.value = String(t), e.textContent = `${t + 1}. ${n.name} (${n.kind})`, this.pageSelect.append(e);
		}
		this.pageSelect.selectedIndex = Math.max(0, Math.min(this.pageIndex, e.length - 1));
	}
	populateModelTree() {
		let e = this.doc?.pageData[this.pageIndex];
		if (!e || e.kind !== "w3d-model" || !e.model.sceneTree?.length) {
			this.treePanel.style.display = "none", this.treePanel.replaceChildren();
			return;
		}
		this.treePanel.style.display = "";
		let t = document.createElement("div");
		t.className = "dwfv-tree-header", t.textContent = `模型结构 · ${e.model.stats.nodeCount ?? 0} 节点`;
		let n = document.createElement("div");
		n.className = "dwfv-tree-stats", n.textContent = `${e.model.stats.meshCount} meshes · ${e.model.stats.triangleCount} triangles · ${e.model.stats.textureCount ?? 0} textures`;
		let r = document.createElement("div");
		r.className = "dwfv-tree-content";
		for (let t of e.model.sceneTree) r.append(Xa(t));
		this.treePanel.replaceChildren(t, n, r);
	}
	resizeCanvasToDisplaySize() {
		let e = this.canvas.getBoundingClientRect(), t = Math.max(1, e.width), n = Math.max(1, e.height), r = Math.max(1, Math.min(this.maxDevicePixelRatio, window.devicePixelRatio || 1)), i = t * n * r * r;
		i > this.maxCanvasPixels && (r *= Math.sqrt(this.maxCanvasPixels / i)), this.currentDpr = r;
		let a = Math.max(1, Math.floor(t * r)), o = Math.max(1, Math.floor(n * r));
		(this.canvas.width !== a || this.canvas.height !== o) && (this.canvas.width = a, this.canvas.height = o), (this.webglCanvas.width !== a || this.webglCanvas.height !== o) && (this.webglCanvas.width = a, this.webglCanvas.height = o);
	}
	resetView() {
		this.zoom = 1, this.panX = 0, this.panY = 0, this.yaw = -.78, this.pitch = .55;
		let e = this.doc?.pageData[this.pageIndex];
		if (e?.kind === "w3d-model") {
			let t = e.model.initialView?.camera, n = t?.position, r = t?.target;
			if (n && r) {
				let t = n[0] - r[0], i = n[1] - r[1], a = n[2] - r[2], o = Math.hypot(t, i, a);
				if (o > 1e-6) {
					this.pitch = Math.max(-1.45, Math.min(1.45, Math.asin(i / o))), this.yaw = Math.atan2(t, a);
					let n = Math.max(1e-6, e.model.bounds.radius);
					this.zoom = Math.max(.05, Math.min(100, n * 2.55 / o));
				}
			}
		}
	}
	zoomAtCenter(e) {
		if (this.resizeCanvasToDisplaySize(), this.is3dPage()) {
			this.zoom = Math.max(.05, Math.min(100, this.zoom * e));
			return;
		}
		let t = this.canvas.width / 2, n = this.canvas.height / 2;
		this.zoomAroundPoint(e, t, n);
	}
	zoomAroundPoint(e, t, n) {
		let r = this.zoom, i = Math.max(.05, Math.min(64, r * e));
		if (i === r) return;
		let a = this.pagePointAtCanvasPoint(t, n, r, this.panX, this.panY);
		if (a) {
			let e = this.pageMatrixAt(i, 0, 0);
			if (e) {
				let [r, o] = Jr(e, a.x, a.y);
				this.panX = t - r, this.panY = n - o, this.zoom = i;
				return;
			}
		}
		let o = i / r;
		this.panX = t - (t - this.panX) * o, this.panY = n - (n - this.panY) * o, this.zoom = i;
	}
	onWheel(e) {
		if (!this.doc) return;
		e.preventDefault(), this.resizeCanvasToDisplaySize();
		let t = this.canvas.getBoundingClientRect(), n = (e.clientX - t.left) * this.currentDpr, r = (e.clientY - t.top) * this.currentDpr, i = e.deltaMode === WheelEvent.DOM_DELTA_LINE ? e.deltaY * 16 : e.deltaMode === WheelEvent.DOM_DELTA_PAGE ? e.deltaY * Math.max(1, t.height) : e.deltaY, a = Math.exp(-i * .0015);
		this.is3dPage() ? this.zoom = Math.max(.05, Math.min(100, this.zoom * a)) : this.zoomAroundPoint(a, n, r), this.requestRender();
	}
	onPointerDown(e) {
		this.canvas.setPointerCapture?.(e.pointerId), this.is3dPage() && e.preventDefault();
		let t = this.is3dPage() ? e.button === 2 || e.shiftKey ? "pan3d" : "rotate3d" : "pan2d";
		this.drag = {
			x: e.clientX,
			y: e.clientY,
			panX: this.panX,
			panY: this.panY,
			yaw: this.yaw,
			pitch: this.pitch,
			mode: t
		};
	}
	onPointerMove(e) {
		if (!this.drag) return;
		let t = e.clientX - this.drag.x, n = e.clientY - this.drag.y;
		this.drag.mode === "rotate3d" ? (this.yaw = this.drag.yaw + t * .008, this.pitch = Math.max(-1.45, Math.min(1.45, this.drag.pitch + n * .008))) : (this.panX = this.drag.panX + t * this.currentDpr, this.panY = this.drag.panY + n * this.currentDpr), this.requestRender();
	}
	is3dPage() {
		return this.doc?.pageData[this.pageIndex]?.kind === "w3d-model";
	}
	pagePointAtCanvasPoint(e, t, n, r, i) {
		let a = this.pageMatrixAt(n, r, i);
		if (!a) return;
		let o = a.a * a.d - a.b * a.c;
		if (!Number.isFinite(o) || Math.abs(o) < 1e-12) return;
		let s = e - a.e, c = t - a.f;
		return {
			x: (a.d * s - a.c * c) / o,
			y: (-a.b * s + a.a * c) / o
		};
	}
	pageMatrixAt(e, t, n) {
		let r = this.doc?.pageData[this.pageIndex];
		if (!r) return;
		let i = Math.max(1, this.canvas.width), a = Math.max(1, this.canvas.height);
		if (r.kind === "w2d-text") return ri(r, i, a, e, t, n);
		if (r.kind === "xps-fixed-page") return ni({
			canvasWidth: i,
			canvasHeight: a,
			pageWidth: Math.max(1, r.width),
			pageHeight: Math.max(1, r.height),
			zoom: e,
			panX: t,
			panY: n
		});
		if (r.kind === "image") return ni({
			canvasWidth: i,
			canvasHeight: a,
			pageWidth: Math.max(1, r.width),
			pageHeight: Math.max(1, r.height),
			zoom: e,
			panX: t,
			panY: n,
			margin: 0
		});
	}
	setStatus(e, t = !1) {
		this.status.textContent = e, this.status.classList.toggle("dwfv-warn", t);
	}
};
function Ya(e) {
	let t = document.createElement("button");
	return t.type = "button", t.textContent = e, t;
}
function Xa(e) {
	let t = document.createElement("details");
	t.open = e.children.length > 0 && e.children.length < 20;
	let n = document.createElement("summary");
	if (n.textContent = e.label || e.id, e.meshIds.length > 0 && (n.title = `${e.meshIds.length} mesh(es)`), t.append(n), e.contentRefs.length > 0) {
		let n = document.createElement("div");
		n.className = "dwfv-tree-meta", n.textContent = e.contentRefs.slice(0, 3).join(", "), t.append(n);
	}
	for (let n of e.children) t.append(Xa(n));
	return t;
}
// node_modules/.pnpm/dwf-viewer@0.6.7_three@0.186.1/node_modules/dwf-viewer/dist/render/contrast.js
var Za = /* @__PURE__ */ new WeakMap();
function Qa(e) {
	let t = Xr(e)?.match(/^rgba?\(([^)]+)\)$/i);
	if (!t) return;
	let n = t[1].split(",").map(Number);
	if (!(n.length < 3 || !n.every(Number.isFinite))) return [
		n[0],
		n[1],
		n[2],
		n[3] ?? 1
	];
}
function $a(e) {
	return e.slice(0, 3).reduce((e, t, n) => {
		let r = Math.max(0, Math.min(255, t)) / 255;
		return e + (r <= .04045 ? r / 12.92 : ((r + .055) / 1.055) ** 2.4) * [
			.2126,
			.7152,
			.0722
		][n];
	}, 0);
}
function eo(e, t) {
	if (t.contrastMode !== "adaptive") return e;
	let n = Qa(e), r = Qa(t.background ?? "#ffffff");
	if (!n || !r || n[3] === 0) return e;
	let i = $a(r), a = (e) => {
		let t = $a(e);
		return (Math.max(t, i) + .05) / (Math.min(t, i) + .05);
	}, o = t.minColorContrast ?? 2.4, s = Number.isFinite(o) ? Math.max(1, Math.min(21, o)) : 2.4;
	if (a(n) >= s) return e;
	let c = 1.05 / (i + .05) >= (i + .05) / .05 ? 255 : 0, l = (e) => n.slice(0, 3).map((t) => Math.round(t + (c - t) * e)), u = 0, d = 1;
	for (let e = 0; e < 16; e++) {
		let e = (u + d) / 2;
		a(l(e)) >= s ? d = e : u = e;
	}
	return `rgba(${l(d).join(", ")}, ${n[3]})`;
}
function to(e) {
	return JSON.stringify([
		e.contrastMode ?? "preserve",
		e.background ?? "#ffffff",
		e.minColorContrast ?? 2.4
	]);
}
function no(e, t) {
	if (e.kind !== "w2d-text" || t.contrastMode !== "adaptive") return e;
	let n = to(t), r = Za.get(e);
	r || Za.set(e, r = /* @__PURE__ */ new Map());
	let i = r.get(n);
	if (i) return i;
	let a = {
		...e,
		primitives: e.primitives.map((e) => {
			let n = { ...e };
			return e.stroke !== void 0 && (n.stroke = eo(e.stroke, t)), e.fill !== void 0 && (n.fill = eo(e.fill, t)), e.type === "polyline" && e.stroke === void 0 && (n.stroke = eo("#000000", t)), e.type === "text" && e.fill === void 0 && e.stroke === void 0 && (n.fill = eo("#000000", t)), n;
		})
	};
	return r.size >= 8 && r.delete(r.keys().next().value), r.set(n, a), a;
}
function ro(e, t) {
	return t.contrastMode === "adaptive" ? e.replace(/(\b(?:Fill|Stroke|Color)\s*=\s*)(["'])([^"']*)\2/gi, (e, n, r, i) => {
		let a = eo(i, t);
		return a === i ? e : `${n}${r}${a}${r}`;
	}) : e;
}
// node_modules/.pnpm/dwf-viewer@0.6.7_three@0.186.1/node_modules/dwf-viewer/dist/render/monochrome.js
var io = /* @__PURE__ */ new WeakMap(), ao = {
	black: {
		r: 0,
		g: 0,
		b: 0,
		a: 1
	},
	white: {
		r: 255,
		g: 255,
		b: 255,
		a: 1
	},
	red: {
		r: 255,
		g: 0,
		b: 0,
		a: 1
	},
	green: {
		r: 0,
		g: 128,
		b: 0,
		a: 1
	},
	blue: {
		r: 0,
		g: 0,
		b: 255,
		a: 1
	},
	yellow: {
		r: 255,
		g: 255,
		b: 0,
		a: 1
	},
	cyan: {
		r: 0,
		g: 255,
		b: 255,
		a: 1
	},
	magenta: {
		r: 255,
		g: 0,
		b: 255,
		a: 1
	},
	gray: {
		r: 128,
		g: 128,
		b: 128,
		a: 1
	},
	grey: {
		r: 128,
		g: 128,
		b: 128,
		a: 1
	},
	transparent: {
		r: 0,
		g: 0,
		b: 0,
		a: 0
	}
};
function oo(e) {
	if (typeof e != "string") return;
	let t = fo(e);
	return t ? ho(t) : void 0;
}
function so(e, t) {
	let n = oo(t);
	if (!n || e.kind !== "w2d-text" && e.kind !== "w3d-model") return e;
	let r = io.get(e);
	r || (r = /* @__PURE__ */ new Map(), io.set(e, r));
	let i = r.get(n);
	if (i) return i;
	let a;
	if (e.kind === "w2d-text") a = {
		...e,
		primitives: e.primitives.map((e) => uo(e, n))
	};
	else {
		let t = fo(n) ?? ao.black, r = [
			t.r / 255,
			t.g / 255,
			t.b / 255
		];
		a = {
			...e,
			model: {
				...e.model,
				meshes: e.model.meshes.map((e) => ({
					...e,
					color: [
						r[0],
						r[1],
						r[2]
					]
				})),
				materials: e.model.materials?.map((e) => ({
					...e,
					color: [
						r[0],
						r[1],
						r[2]
					]
				}))
			}
		};
	}
	return r.set(n, a), a;
}
function co(e, t) {
	let n = oo(t);
	return !n || !e ? e : e.replace(/(\b(?:Fill|Stroke|Color)\s*=\s*)(["'])([^"']*)\2/gi, (e, t, r, i) => fo(i) ? `${t}${r}${lo(n, i)}${r}` : e);
}
function lo(e, t) {
	let n = fo(e) ?? ao.black, r = t ? fo(t) : void 0;
	return ho({
		r: n.r,
		g: n.g,
		b: n.b,
		a: _o(n.a * (r?.a ?? 1))
	});
}
function uo(e, t) {
	let n = { ...e };
	return e.stroke !== void 0 && (n.stroke = lo(t, e.stroke)), e.fill !== void 0 && (n.fill = lo(t, e.fill)), e.type === "polyline" && e.stroke === void 0 && (n.stroke = t), e.type === "text" && e.stroke === void 0 && e.fill === void 0 && (n.fill = t), n;
}
function fo(e) {
	let t = e.trim();
	if (!t) return;
	let n = ao[t.toLowerCase()];
	if (n) return { ...n };
	if (/^#[0-9a-f]{3}$/i.test(t)) return {
		r: parseInt(t[1] + t[1], 16),
		g: parseInt(t[2] + t[2], 16),
		b: parseInt(t[3] + t[3], 16),
		a: 1
	};
	if (/^#[0-9a-f]{4}$/i.test(t)) return {
		r: parseInt(t[1] + t[1], 16),
		g: parseInt(t[2] + t[2], 16),
		b: parseInt(t[3] + t[3], 16),
		a: parseInt(t[4] + t[4], 16) / 255
	};
	if (/^#[0-9a-f]{6}$/i.test(t)) return {
		r: parseInt(t.slice(1, 3), 16),
		g: parseInt(t.slice(3, 5), 16),
		b: parseInt(t.slice(5, 7), 16),
		a: 1
	};
	if (/^#[0-9a-f]{8}$/i.test(t)) return {
		r: parseInt(t.slice(3, 5), 16),
		g: parseInt(t.slice(5, 7), 16),
		b: parseInt(t.slice(7, 9), 16),
		a: parseInt(t.slice(1, 3), 16) / 255
	};
	if (/^sc#/i.test(t)) {
		let e = t.slice(3).split(",").map((e) => Number(e.trim()));
		if (e.length === 3 && e.every(Number.isFinite)) return {
			r: e[0] * 255,
			g: e[1] * 255,
			b: e[2] * 255,
			a: 1
		};
		if (e.length === 4 && e.every(Number.isFinite)) return {
			r: e[1] * 255,
			g: e[2] * 255,
			b: e[3] * 255,
			a: _o(e[0])
		};
	}
	let r = t.match(/^rgba?\(([^)]+)\)$/i);
	if (r) {
		let e = r[1].split(",").map((e) => e.trim());
		if (e.length === 3 || e.length === 4) {
			let t = e.slice(0, 3).map(po), n = e[3] === void 0 ? 1 : mo(e[3]);
			if (t.every((e) => e !== void 0) && n !== void 0) return {
				r: t[0],
				g: t[1],
				b: t[2],
				a: n
			};
		}
	}
}
function po(e) {
	let t = e.endsWith("%"), n = Number(t ? e.slice(0, -1) : e);
	if (Number.isFinite(n)) return go(t ? n * 2.55 : n);
}
function mo(e) {
	let t = e.endsWith("%"), n = Number(t ? e.slice(0, -1) : e);
	if (Number.isFinite(n)) return _o(t ? n / 100 : n);
}
function ho(e) {
	let t = go(e.r), n = go(e.g), r = go(e.b), i = _o(e.a);
	return i >= .999999 ? `rgb(${t}, ${n}, ${r})` : `rgba(${t}, ${n}, ${r}, ${Math.round(i * 1e6) / 1e6})`;
}
function go(e) {
	return Math.max(0, Math.min(255, Math.round(e)));
}
function _o(e) {
	return Math.max(0, Math.min(1, e));
}
// node_modules/.pnpm/dwf-viewer@0.6.7_three@0.186.1/node_modules/dwf-viewer/dist/viewer/DwfViewer.js
var vo = class extends Ja {
	constructor(e, t = {}) {
		super(e, t), this.monochromeColor = oo(t.monochromeColor), this.contrastOptions = {
			contrastMode: t.contrastMode,
			minColorContrast: t.minColorContrast
		};
	}
	async load(e, t = {}) {
		Object.prototype.hasOwnProperty.call(t, "monochromeColor") && this.updateMonochromeColor(t.monochromeColor, !1), t.contrastMode !== void 0 && (this.contrastOptions.contrastMode = t.contrastMode), t.minColorContrast !== void 0 && (this.contrastOptions.minColorContrast = t.minColorContrast), await super.load(e, t);
	}
	setMonochromeColor(e) {
		this.updateMonochromeColor(e, !0);
	}
	getMonochromeColor() {
		return this.monochromeColor;
	}
	setContrastOptions(e) {
		this.contrastOptions = {
			...this.contrastOptions,
			...e
		}, this.requestRender();
	}
	async render() {
		let e = this;
		if (e.rendering) return super.render();
		let t = e.renderer, n = this.monochromeColor, r = {
			...this.contrastOptions,
			background: e.background
		}, i = n || to(r);
		t && (this.preparedRenderer === t && this.preparedColor !== i && t.dispose(), this.preparedRenderer = t, this.preparedColor = i);
		let a = e.doc, o = e.pageIndex, s = a?.pageData[o];
		if (!n && r.contrastMode !== "adaptive" || !a || !s) return super.render();
		let c = n ? so(s, n) : no(s, r);
		a.pageData[o] = c;
		let l = a.opc, u = l?.readText;
		l && u && (l.readText = async (e) => {
			let t = await u.call(l, e);
			return n ? co(t, n) : ro(t, r);
		});
		try {
			return await super.render();
		} finally {
			a.pageData[o] === c && (a.pageData[o] = s), l && u && (l.readText = u);
		}
	}
	dispose() {
		this.preparedRenderer = void 0, this.preparedColor = void 0, super.dispose();
	}
	updateMonochromeColor(e, t) {
		let n = oo(e);
		n !== this.monochromeColor && (this.monochromeColor = n, t && this.requestRender());
	}
}, yo = Object.defineProperty, bo = (e, t, n) => t in e ? yo(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, L = (e, t, n) => bo(e, typeof t == "symbol" ? t : t + "", n);
async function xo(e) {
	if (e.buffer instanceof Uint8Array) return e.buffer;
	if (e.buffer instanceof ArrayBuffer) return new Uint8Array(e.buffer);
	if (e.file) return new Uint8Array(await e.file.arrayBuffer());
	throw Error("CadLoadInput requires a File, ArrayBuffer, or Uint8Array.");
}
function So(e) {
	return e.byteOffset === 0 && e.byteLength === e.buffer.byteLength ? e.buffer : e.slice().buffer;
}
function Co(e) {
	let t = e.fileName ?? e.file?.name ?? "", n = t.lastIndexOf(".");
	return n >= 0 ? t.slice(n + 1).toLowerCase() : "";
}
function wo(e, t) {
	let n = Co(e);
	if (n === "dwg") return "dwg";
	if (n === "dxf") return "dxf";
	if (n === "dwfx") return "dwfx";
	if (n === "xps") return "xps";
	if (n === "dwf") return "dwf";
	if (t && t.byteLength >= 6) {
		let e = To(t.slice(0, 6));
		if (/^AC10/.test(e)) return "dwg";
		if (t[0] === 80 && t[1] === 75) return "dwfx";
		let n = To(t.slice(0, Math.min(t.byteLength, 2048))).toUpperCase();
		if (n.includes("SECTION") && n.includes("ENTITIES")) return "dxf";
		if (n.includes("DWF")) return "dwf";
	}
	return "unknown";
}
function To(e) {
	return Array.from(e, (e) => e >= 32 && e <= 126 ? String.fromCharCode(e) : " ").join("");
}
var Eo = class {
	constructor(e = []) {
		L(this, "loaders", []);
		for (let t of e) this.register(t);
	}
	register(e) {
		let t = this.loaders.findIndex((t) => t.id === e.id);
		return t >= 0 ? this.loaders.splice(t, 1, e) : this.loaders.push(e), this;
	}
	unregister(e) {
		let t = this.loaders.findIndex((t) => t.id === e);
		return t >= 0 && this.loaders.splice(t, 1), this;
	}
	list() {
		return [...this.loaders];
	}
	async detect(e) {
		let t = await xo(e), n = wo(e, t), r = this.loaders.find((r) => r.formats.includes(n) && r.accepts(e, t));
		if (r) return {
			loader: r,
			bytes: t,
			format: n
		};
		let i = this.loaders.find((n) => n.accepts(e, t));
		if (i) return {
			loader: i,
			bytes: t,
			format: n
		};
		throw Error(`No CAD loader registered for ${n === "unknown" ? "this file" : n.toUpperCase()}.`);
	}
	async load(e, t = {}) {
		let { loader: n, bytes: r } = await this.detect(e);
		return n.load({
			...e,
			buffer: r
		}, t);
	}
}, Do = "wasm/dwg-worker.js", Oo = class {
	constructor() {
		L(this, "worker"), L(this, "sequence", 0), L(this, "pending", /* @__PURE__ */ new Map());
	}
	load(e, t, n = {}) {
		var r;
		if (!ko()) throw Error("Web Worker is not available in this runtime.");
		let i = this.ensureWorker(n), a = ++this.sequence, o = Math.max(0, Number(n.workerTimeoutMs ?? 0)), s = n.fileName ?? t.fileName ?? t.file?.name, c = Mo(e, t, n);
		return (r = n.onProgress) == null || r.call(n, {
			phase: "worker-start",
			format: "dwg",
			message: "Dispatching DWG parse to worker…",
			total: e.byteLength
		}), new Promise((e, t) => {
			var r;
			if ((r = n.signal) != null && r.aborted) {
				t(Po());
				return;
			}
			let l = {
				resolve: e,
				reject: t,
				onProgress: n.onProgress,
				signal: n.signal
			};
			o > 0 && (l.timer = setTimeout(() => {
				this.pending.delete(a), this.resetWorker(), t(/* @__PURE__ */ Error(`DWG worker timed out after ${o} ms.`));
			}, o)), n.signal && (l.abortHandler = () => {
				this.pending.delete(a), this.resetWorker(), t(Po());
			}, n.signal.addEventListener("abort", l.abortHandler, { once: !0 })), this.pending.set(a, l);
			try {
				i.postMessage({
					type: "load",
					requestId: a,
					bytes: c,
					fileName: s,
					options: jo(n)
				}, [c]);
			} catch (e) {
				this.pending.delete(a), No(l), t(e instanceof Error ? e : Error(String(e)));
			}
		});
	}
	preload(e = {}) {
		var t;
		if (!ko()) return Promise.reject(/* @__PURE__ */ Error("Web Worker is not available in this runtime."));
		let n = this.ensureWorker(e), r = ++this.sequence, i = Math.max(0, Number(e.workerTimeoutMs ?? 0));
		return (t = e.onProgress) == null || t.call(e, {
			phase: "worker-start",
			format: "dwg",
			message: "Starting DWG worker warmup…"
		}), new Promise((t, a) => {
			var o;
			if ((o = e.signal) != null && o.aborted) {
				a(Po());
				return;
			}
			let s = {
				resolve: () => t(),
				reject: a,
				onProgress: e.onProgress,
				signal: e.signal
			};
			i > 0 && (s.timer = setTimeout(() => {
				this.pending.delete(r), this.resetWorker(), a(/* @__PURE__ */ Error(`DWG worker warmup timed out after ${i} ms.`));
			}, i)), e.signal && (s.abortHandler = () => {
				this.pending.delete(r), this.resetWorker(), a(Po());
			}, e.signal.addEventListener("abort", s.abortHandler, { once: !0 })), this.pending.set(r, s);
			try {
				n.postMessage({
					type: "warmup",
					requestId: r,
					options: jo(e)
				});
			} catch (e) {
				this.pending.delete(r), No(s), a(e instanceof Error ? e : Error(String(e)));
			}
		});
	}
	terminate() {
		this.resetWorker();
	}
	ensureWorker(e) {
		return this.worker || (this.worker = Ao(e), this.worker.onmessage = (e) => this.handleMessage(e.data), this.worker.onerror = (e) => {
			let t = e.message || "DWG worker failed.";
			this.rejectAll(Error(t)), this.resetWorker(!1);
		}, this.worker.onmessageerror = () => {
			this.rejectAll(/* @__PURE__ */ Error("DWG worker returned a message that could not be cloned.")), this.resetWorker(!1);
		}), this.worker;
	}
	handleMessage(e) {
		var t, n;
		if (e.type === "ready") return;
		let r = this.pending.get(e.requestId);
		if (!r) return;
		if (e.type === "progress") {
			(t = r.onProgress) == null || t.call(r, e.progress);
			return;
		}
		if (this.pending.delete(e.requestId), No(r), e.type === "result") {
			r.resolve(e.result);
			return;
		}
		if (e.type === "warmup-result") {
			(n = r.onProgress) == null || n.call(r, {
				phase: "worker-ready",
				format: "dwg",
				message: "DWG worker warmup complete.",
				percent: 100,
				elapsedMs: e.elapsedMs
			}), r.resolve(void 0);
			return;
		}
		let i = Error(e.error.message);
		i.name = e.error.name || "DwgWorkerError", e.error.stack && (i.stack = e.error.stack), r.reject(i);
	}
	rejectAll(e) {
		for (let [, t] of this.pending) No(t), t.reject(e);
		this.pending.clear();
	}
	resetWorker(e = !0) {
		var t;
		e && this.rejectAll(/* @__PURE__ */ Error("DWG worker was terminated.")), (t = this.worker) == null || t.terminate(), this.worker = void 0;
	}
};
function ko() {
	return typeof Worker < "u" && typeof URL < "u";
}
function Ao(e) {
	return e.workerFactory ? e.workerFactory() : new Worker(Io(e.workerUrl), {
		type: "module",
		name: "lightweight-cad-dwg-loader"
	});
}
function jo(e) {
	return {
		wasmPath: Fo(e.wasmPath),
		includePaperSpace: e.includePaperSpace,
		maxInsertDepth: e.maxInsertDepth,
		keepRaw: !!e.keepRaw
	};
}
function Mo(e, t, n) {
	return t.file || n.transferInputBuffer === !0 ? So(e) : e.slice().buffer;
}
function No(e) {
	e.timer && clearTimeout(e.timer), e.signal && e.abortHandler && e.signal.removeEventListener("abort", e.abortHandler);
}
function Po() {
	if (typeof DOMException < "u") return new DOMException("DWG loading was aborted.", "AbortError");
	let e = /* @__PURE__ */ Error("DWG loading was aborted.");
	return e.name = "AbortError", e;
}
function Fo(e) {
	let t = (e?.trim() || "/wasm").replace(/\/+$/, "");
	return t === "" ? Ro() : zo(t) ? t : t.startsWith("/") ? `${Ro()}${t}` : new URL(t, Lo()).href.replace(/\/+$/, "");
}
function Io(e) {
	if (e instanceof URL) return e;
	let t = e?.trim() || Do;
	return zo(t) ? t : new URL(t, Lo()).href;
}
function Lo() {
	return typeof document < "u" && document.baseURI ? document.baseURI : typeof location < "u" && location.href ? location.href : "http://localhost/";
}
function Ro() {
	return typeof location < "u" && location.origin ? location.origin : new URL(Lo()).origin;
}
function zo(e) {
	return /^[a-z][a-z0-9+.-]*:/i.test(e);
}
var Bo = class {
	constructor(e = {}) {
		L(this, "id", "dwg"), L(this, "label", "DWG / LibreDWG WebAssembly"), L(this, "formats", ["dwg"]), L(this, "defaults"), L(this, "workerClient", new Oo()), this.defaults = {
			useWorker: !0,
			...e
		};
	}
	accepts(e, t) {
		return Co(e) === "dwg" || wo(e, t) === "dwg";
	}
	async load(e, t = {}) {
		var n;
		let r = {
			...this.defaults,
			...t
		};
		(n = r.onProgress) == null || n.call(r, {
			phase: "read",
			format: "dwg",
			message: "Reading DWG bytes…"
		});
		let i = await xo(e), a = e.fileName ?? e.file?.name;
		if (r.useWorker === !1) throw Error("DWG main-thread parsing is intentionally not bundled by the default viewer. Keep useWorker enabled, or register a custom DWG loader for non-browser runtimes.");
		if (!ko()) throw Error("DWG loading requires Web Worker support in this build. Provide a custom loader for this runtime.");
		try {
			return await this.workerClient.load(i, e, {
				...r,
				fileName: a
			});
		} catch (e) {
			throw Vo(e) ? e : Ho(e);
		}
	}
	terminateWorker() {
		this.workerClient.terminate();
	}
	preload(e = {}) {
		let t = {
			...this.defaults,
			...e
		};
		return t.useWorker === !1 ? Promise.reject(/* @__PURE__ */ Error("DWG preload requires worker mode in the default viewer.")) : this.workerClient.preload(t);
	}
};
function Vo(e) {
	return e instanceof Error && e.name === "AbortError";
}
function Ho(e) {
	let t = e instanceof Error ? e.message : String(e), n = /worker|fetch|wasm|magic word|mime|network|404|failed to initialize/i.test(t), r = /* @__PURE__ */ Error(`${t}${n ? " If the worker asset cannot be resolved by your bundler/CDN, pass workerUrl or workerFactory to CadViewer." : ""}`);
	return e instanceof Error && (r.name = e.name, r.stack = e.stack), r;
}
function Uo(e) {
	return {
		format: e.format,
		sourceName: e.sourceName,
		units: e.units,
		header: e.header ?? {},
		layers: e.layers ?? {},
		lineTypes: e.lineTypes ?? {},
		blocks: e.blocks ?? {},
		entities: e.entities ?? [],
		pages: e.pages,
		savedView: e.savedView,
		dataLinks: e.dataLinks,
		dataTables: e.dataTables,
		xrecords: e.xrecords,
		dictionaries: e.dictionaries,
		metadata: e.metadata ?? {},
		warnings: e.warnings ?? [],
		raw: e.raw
	};
}
function Wo(e) {
	switch (String(e ?? "").toUpperCase()) {
		case "LINE": return "line";
		case "CIRCLE": return "circle";
		case "ARC": return "arc";
		case "LWPOLYLINE":
		case "POLYLINE":
		case "POLYLINE_2D":
		case "POLYLINE2D":
		case "POLYLINE_3D":
		case "POLYLINE3D":
		case "LEADER":
		case "MULTILEADER": return "polyline";
		case "ELLIPSE": return "ellipse";
		case "TEXT":
		case "MTEXT":
		case "ATTRIB":
		case "ATTDEF":
		case "DIMENSION": return "text";
		case "POINT": return "point";
		case "INSERT":
		case "MINSERT": return "insert";
		case "SOLID":
		case "TRACE":
		case "3DFACE": return "solid";
		case "HATCH": return "hatch";
		case "SPLINE": return "spline";
		case "PATH":
		case "XPS_PATH":
		case "DWF_PATH": return "path";
		case "IMAGE":
		case "RASTER_IMAGE":
		case "DWF_IMAGE": return "image";
		case "VIEWPORT": return "viewport";
		case "TABLE":
		case "ACAD_TABLE":
		case "ACDBTABLE": return "table";
		default: return "unsupported";
	}
}
function Go(e, t, n = {}) {
	let r = t ?? String(e.type ?? e.entityType ?? e.objectName ?? "UNKNOWN").toUpperCase(), i = n.includeUnknownProperties === !1 ? {
		type: r,
		kind: Wo(r)
	} : {
		...e,
		type: r,
		kind: Wo(r)
	};
	n.keepRaw && (i.raw = e), i.handle = B(e.handle ?? e.id), i.layer = B(e.layer ?? e.layerName), i.lineType = B(e.lineType ?? e.linetype), i.lineTypeScale = z(e.lineTypeScale ?? e.linetypeScale ?? e.ltscale) ?? i.lineTypeScale, i.flag = z(e.flag ?? e.flags) ?? i.flag, i.constantWidth = z(e.constantWidth ?? e.constWidth ?? e.const_width) ?? i.constantWidth, i.thickness = z(e.thickness) ?? i.thickness;
	let a = e.isClosed === !0 || e.closed === !0 || e.shape === !0, o = /^(POLYLINE|POLYLINE_2D|POLYLINE2D|POLYLINE_3D|POLYLINE3D|SPLINE)$/.test(r), s = r === "LWPOLYLINE";
	(a || o && (Number(i.flag ?? 0) & 1) == 1 || s && (Number(i.flag ?? 0) & 512) == 512) && (i.isClosed = !0);
	let c = n.numericColorMode ?? "auto", l = z(e.color);
	i.colorIndex = z(e.colorIndex ?? e.colorNumber ?? e.aci ?? e.aciColor ?? e.color_index) ?? (c !== "rgb" && l !== void 0 && Math.abs(l) <= 257 ? l : void 0), i.trueColor = e.trueColor ?? e.true_color ?? e.truecolor ?? e.colorRGB ?? e.colorRgb ?? e.rgbColor ?? e.rgb ?? (l !== void 0 && l >= 0 && l <= 16777215 && (c === "rgb" || c === "auto" && Math.abs(l) > 257) ? l : void 0), (typeof e.color == "string" || typeof e.color == "number") && (i.color = e.color), i.colorNumber = z(e.colorNumber) ?? i.colorNumber, i.colorName = B(e.colorName ?? e.color_name) ?? i.colorName, i.fillColor = e.fillColor ?? e.fill_color, i.fillColorIndex = z(e.fillColorIndex ?? e.fill_color_index ?? e.fillColorNumber) ?? i.fillColorIndex, i.opacity = z(e.opacity ?? e.alpha) ?? i.opacity, i.lineweight = z(e.lineweight ?? e.lineWeight), i.isVisible = e.isVisible !== !1 && e.visible !== !1;
	let u = es(e.text);
	i.startPoint = R(e.startPoint ?? u?.startPoint ?? e.start ?? e.p0 ?? e.from) ?? i.startPoint, i.endPoint = R(e.endPoint ?? u?.endPoint ?? e.end ?? e.p1 ?? e.to) ?? i.endPoint, i.center = R(e.center ?? e.centerPoint) ?? i.center, i.insertionPoint = R(e.insertionPoint ?? u?.startPoint ?? e.position ?? e.location ?? e.point ?? e.basePoint) ?? i.insertionPoint, i.radius = z(e.radius) ?? i.radius, i.startAngle = z(e.startAngle ?? e.start_angle) ?? i.startAngle, i.endAngle = z(e.endAngle ?? e.end_angle) ?? i.endAngle, i.majorAxisEndPoint = R(e.majorAxisEndPoint ?? e.majorAxis ?? e.major) ?? i.majorAxisEndPoint, i.axisRatio = z(e.axisRatio ?? e.ratio) ?? i.axisRatio, i.height = z(e.height ?? e.textHeight ?? u?.textHeight) ?? i.height, i.textHeight = z(e.textHeight ?? e.height ?? u?.textHeight) ?? i.textHeight, i.xScale = z(e.xScale ?? e.widthFactor ?? u?.xScale) ?? i.xScale, i.generationFlag = z(e.generationFlag ?? e.textGenerationFlag ?? u?.generationFlag) ?? i.generationFlag, i.halign = z(e.halign ?? e.horizontalAlignment ?? u?.halign) ?? i.halign, i.valign = z(e.valign ?? e.verticalAlignment ?? u?.valign) ?? i.valign, i.extrusionDirection = R(e.extrusionDirection ?? e.extrusion ?? u?.extrusionDirection) ?? i.extrusionDirection, i.rotation = z(e.rotation ?? e.angle ?? u?.rotation) ?? i.rotation, i.text = B(u?.text ?? e.text ?? e.value ?? e.string ?? e.contents ?? e.defaultValue ?? e.default_value) ?? i.text, i.value = B(e.value ?? u?.text ?? e.text ?? e.string ?? e.contents ?? e.defaultValue ?? e.default_value) ?? i.value, i.name = B(e.name ?? e.blockName) ?? i.name, i.blockName = B(e.blockName ?? e.name) ?? i.blockName, i.effectiveBlockName = B(e.effectiveBlockName ?? e.effectiveName ?? e.dynamicBlockName ?? e.originalBlockName) ?? i.effectiveBlockName, i.extensionDictionaryHandle = is(e.extensionDictionaryHandle ?? e.ownerDictionaryHardId ?? e.ownerdictionaryHardId ?? e.xdicobjhandle) ?? i.extensionDictionaryHandle, i.ownerBlockRecordHandle = is(e.ownerBlockRecordHandle ?? e.ownerBlockRecordSoftId ?? e.ownerHandle) ?? i.ownerBlockRecordHandle, i.attributeTag = B(e.attributeTag ?? e.tag ?? e.tagString ?? e.attrTag) ?? i.attributeTag, i.attributePrompt = B(e.attributePrompt ?? e.prompt ?? e.promptString) ?? i.attributePrompt, i.attributeFlags = z(e.attributeFlags ?? e.flags ?? e.flag) ?? i.attributeFlags, (r === "INSERT" || r === "MINSERT") && (i.insertRowCount = ts(e.insertRowCount ?? e.rowCount ?? e.numRows ?? e.num_rows) ?? i.insertRowCount, i.insertColumnCount = ts(e.insertColumnCount ?? e.columnCount ?? e.numColumns ?? e.numCols ?? e.num_cols) ?? i.insertColumnCount, i.insertRowSpacing = z(e.insertRowSpacing ?? e.rowSpacing ?? e.row_spacing) ?? i.insertRowSpacing, i.insertColumnSpacing = z(e.insertColumnSpacing ?? e.columnSpacing ?? e.col_spacing) ?? i.insertColumnSpacing);
	let d = ds(e.xdata ?? e.extendedData ?? e.xData);
	if (d.length > 0 && (i.xdata = d), r === "INSERT" || r === "MINSERT") {
		let t = R(e.scale);
		if (t) i.scale = t;
		else {
			let t = z(e.scaleX ?? e.xScale), n = z(e.scaleY ?? e.yScale) ?? t, r = z(e.scaleZ ?? e.zScale);
			t !== void 0 && n !== void 0 && (i.scale = r === void 0 ? {
				x: t,
				y: n
			} : {
				x: t,
				y: n,
				z: r
			});
		}
	}
	let f = qo(e.vertices ?? e.points);
	f.length > 0 && (i.vertices = f);
	let p = qo(e.controlPoints ?? e.control_points);
	p.length > 0 && (i.controlPoints = p);
	let m = qo(e.fitPoints ?? e.fit_points);
	m.length > 0 && (i.fitPoints = m);
	let h = e.attribs ?? e.attributes ?? e.attributeEntities;
	return Array.isArray(h) && (i.attribs = h.filter((e) => !!e && typeof e == "object").map((e) => Go(e, void 0, n))), (r === "TABLE" || r === "ACAD_TABLE" || r === "ACDBTABLE") && (i.table = Ko(e)), i;
}
function Ko(e) {
	let t = es(e.ldata ?? e.linkedData), n = es(e.tdata ?? e.linkedTableData), r = ts(e.rowCount ?? e.rowsCount ?? e.numRows ?? e.num_rows ?? n?.numRows ?? n?.num_rows) ?? 0, i = ts(e.columnCount ?? e.columnsCount ?? e.numColumns ?? e.numCols ?? e.num_cols ?? n?.numColumns ?? n?.numCols ?? n?.num_cols) ?? 0, a = as(e.cells ?? e.tableCells ?? e.cellValues ?? n?.rows ?? e.data), o = i || os(a), s = r || (o > 0 ? Math.ceil(a.length / o) : 0), c = a.map(({ cell: e, index: t }) => ss(e, t, o));
	return {
		name: B(e.tableName ?? e.name ?? t?.name ?? t?.description),
		rowCount: s,
		columnCount: o,
		cells: c,
		rowHeights: rs(e.rowHeights ?? e.rowHeightArr ?? e.row_heights),
		columnWidths: rs(e.columnWidths ?? e.columnWidthArr ?? e.col_widths),
		dataLinkHandle: is(e.dataLinkHandle ?? e.dataLink ?? e.data_link),
		titleSuppressed: ns(e.titleSuppressed ?? e.title_suppressed),
		headerSuppressed: ns(e.headerSuppressed ?? e.header_suppressed)
	};
}
function R(e) {
	if (!e || typeof e != "object") return;
	let t = e, n = Number(t.x ?? t.X ?? t[0]), r = Number(t.y ?? t.Y ?? t[1]), i = t.z ?? t.Z ?? t[2], a = i === void 0 ? void 0 : Number(i);
	if (Number.isFinite(n) && Number.isFinite(r)) return Number.isFinite(a) ? {
		x: n,
		y: r,
		z: a
	} : {
		x: n,
		y: r
	};
}
function qo(e) {
	if (!Array.isArray(e)) return [];
	let t = [];
	for (let n of e) {
		let e = R(n);
		if (!e) continue;
		let r = n, i = e, a = z(r.bulge);
		a !== void 0 && (i.bulge = a);
		let o = z(r.startWidth ?? r.start_width);
		o !== void 0 && (i.startWidth = o);
		let s = z(r.endWidth ?? r.end_width);
		s !== void 0 && (i.endWidth = s), t.push(i);
	}
	return t;
}
function Jo(e) {
	let t = {};
	for (let n of e.entities) {
		let e = String(n.type ?? "UNKNOWN").toUpperCase();
		t[e] = (t[e] ?? 0) + 1;
	}
	return {
		format: e.format,
		sourceName: e.sourceName,
		entityCount: e.entities.length,
		layerCount: Object.keys(e.layers).length,
		blockCount: Object.keys(e.blocks).length,
		pageCount: e.pages?.length ?? 0,
		byType: t,
		warnings: [...e.warnings]
	};
}
function Yo(e) {
	if (e.isClosed === !0) return !0;
	let t = String(e.type ?? "").toUpperCase(), n = Number(e.flag ?? 0), r = t === "LWPOLYLINE", i = /^(POLYLINE|POLYLINE_2D|POLYLINE2D|POLYLINE_3D|POLYLINE3D)$/.test(t);
	if (r && (n & 512) == 512 || i && (n & 1) == 1) return !0;
	if (!r && !i) return !1;
	let a = e.vertices ?? e.points;
	if (!Array.isArray(a) || a.length < 3) return !1;
	let o = a[0], s = a[a.length - 1];
	if (!o || !s) return !1;
	let c = a.reduce((e, t) => Math.max(e, Math.abs(t.x), Math.abs(t.y)), 1);
	return Math.hypot(o.x - s.x, o.y - s.y) <= Math.max(1e-9, c * 1e-12);
}
function Xo(e) {
	let t = ms(e.constantWidth);
	for (let n of e.vertices ?? []) t = Math.max(t, ms(n.startWidth), ms(n.endWidth));
	return t;
}
function Zo(e, t) {
	t.name && (e[t.name] = t, e[t.name.toLowerCase()] = t);
}
function Qo(e, t) {
	t.name && (e[t.name] = t, e[t.name.toLowerCase()] = t);
}
function $o(e) {
	return e != null && e.length ? e.flatMap((e) => e.entities.map((t) => ({
		...t,
		pageIndex: e.index
	}))) : [];
}
function z(e) {
	let t = Number(e);
	return Number.isFinite(t) ? t : void 0;
}
function B(e) {
	if (typeof e != "string" && typeof e != "number") return;
	let t = String(e);
	return t.length > 0 ? t : void 0;
}
function es(e) {
	return e && typeof e == "object" && !Array.isArray(e) ? e : void 0;
}
function ts(e) {
	let t = z(e);
	if (!(t === void 0 || t <= 0)) return Math.max(1, Math.trunc(t));
}
function ns(e) {
	if (typeof e == "boolean") return e;
	if (e === 0 || e === "0") return !1;
	if (e === 1 || e === "1") return !0;
}
function rs(e) {
	if (!Array.isArray(e)) return;
	let t = e.map(z).filter((e) => e !== void 0);
	return t.length > 0 ? t : void 0;
}
function is(e) {
	if (Array.isArray(e)) return B(e[3] ?? e[2] ?? e[e.length - 1]);
	if (e && typeof e == "object") {
		let t = e;
		return B(t.absolute_ref ?? t.absoluteRef ?? t.handle ?? t.id ?? t.value);
	}
	return B(e);
}
function as(e) {
	if (!Array.isArray(e)) {
		let t = es(e), n = t?.rows ?? t?.values ?? t?.cells;
		return Array.isArray(n) ? as(n) : [];
	}
	let t = [], n = 0;
	for (let r of e) {
		if (Array.isArray(r)) {
			for (let e of r) t.push({
				cell: e,
				index: n++
			});
			continue;
		}
		let e = es(r), i = e?.cells ?? e?.values;
		if (Array.isArray(i) && !("text" in (e ?? {})) && !("value" in (e ?? {}))) for (let e of i) t.push({
			cell: e,
			index: n++
		});
		else t.push({
			cell: r,
			index: n++
		});
	}
	return t;
}
function os(e) {
	let t = -1;
	for (let { cell: n } of e) {
		let e = es(n), r = z(e?.column ?? e?.columnIndex ?? e?.col ?? e?.column_index);
		r !== void 0 && (t = Math.max(t, Math.trunc(r)));
	}
	return t >= 0 ? t + 1 : 0;
}
function ss(e, t, n) {
	let r = es(e), i = r ? cs(r) : ps(e), a = B(r ? r.text ?? r.textValue ?? r.text_value ?? r.valueString ?? r.value_string ?? r.displayValue : e) ?? ls(i), o = Math.max(0, Math.trunc(z(r?.row ?? r?.rowIndex ?? r?.row_index) ?? (n > 0 ? Math.floor(t / n) : t))), s = Math.max(0, Math.trunc(z(r?.column ?? r?.columnIndex ?? r?.col ?? r?.column_index) ?? (n > 0 ? t % n : 0))), c = B(r?.attrText ?? r?.attributeText), l = c ? { value: c } : us(r?.blockAttributes ?? r?.attributes);
	return {
		row: o,
		column: s,
		text: a,
		...i === void 0 ? {} : { value: i },
		...B(r?.dataType ?? r?.typeName) || z(r?.cellType ?? r?.type) !== void 0 ? { dataType: B(r?.dataType ?? r?.typeName) ?? z(r?.cellType ?? r?.type) } : {},
		...B(r?.formula ?? r?.expression) ? { formula: B(r?.formula ?? r?.expression) } : {},
		...ts(r?.rowSpan ?? r?.mergedHeight ?? r?.merged_height_flag) ? { rowSpan: ts(r?.rowSpan ?? r?.mergedHeight ?? r?.merged_height_flag) } : {},
		...ts(r?.columnSpan ?? r?.mergedWidth ?? r?.merged_width_flag) ? { columnSpan: ts(r?.columnSpan ?? r?.mergedWidth ?? r?.merged_width_flag) } : {},
		...ns(r?.isMerged ?? r?.mergedValue ?? r?.is_merged_value) === void 0 ? {} : { isMerged: ns(r?.isMerged ?? r?.mergedValue ?? r?.is_merged_value) },
		...z(r?.textHeight ?? r?.text_height) === void 0 ? {} : { textHeight: z(r?.textHeight ?? r?.text_height) },
		...is(r?.blockTableRecordId ?? r?.blockRecordHandle ?? r?.block_handle) ? { blockTableRecordId: is(r?.blockTableRecordId ?? r?.blockRecordHandle ?? r?.block_handle) } : {},
		...l && Object.keys(l).length > 0 ? { blockAttributes: l } : {}
	};
}
function cs(e) {
	let t = es(e.value), n = [
		t?.valueString,
		t?.value_string,
		t?.dataString,
		t?.data_string,
		t?.dataLong,
		t?.data_long,
		t?.dataDouble,
		t?.data_double,
		t?.dataDate,
		t?.data_date,
		t?.dataPoint,
		t?.data_point,
		t?.data3dPoint,
		t?.data_3dpoint,
		e.rawValue,
		e.value
	];
	for (let e of n) {
		let t = ps(e);
		if (t !== void 0 && t !== "") return t;
	}
}
function ls(e) {
	if (e == null) return "";
	if (typeof e == "string" || typeof e == "number" || typeof e == "boolean") return String(e);
	if (!Array.isArray(e) && typeof e == "object" && "x" in e && "y" in e) {
		let t = e;
		return [
			t.x,
			t.y,
			t.z
		].filter((e) => e !== void 0).join(", ");
	}
	try {
		return JSON.stringify(e);
	} catch {
		return String(e);
	}
}
function us(e) {
	let t = es(e);
	if (!t) return;
	let n = {};
	for (let [e, r] of Object.entries(t)) {
		let t = B(r) ?? ls(ps(r));
		t && (n[e] = t);
	}
	return Object.keys(n).length > 0 ? n : void 0;
}
function ds(e) {
	if (!e) return [];
	if (Array.isArray(e)) {
		if (e.some((e) => es(e)?.appName !== void 0 || es(e)?.applicationName !== void 0)) return e.flatMap((e) => ds(e));
		let t = e.map(fs).filter((e) => !!e);
		return t.length > 0 ? [{ entries: t }] : [];
	}
	let t = es(e);
	if (!t) return [];
	let n = B(t.appName ?? t.applicationName ?? t.app), r = Array.isArray(t.customStrings) ? t.customStrings.map((e) => ({
		code: 1e3,
		value: e
	})) : void 0, i = t.entries ?? t.value ?? t.values ?? t.data ?? r;
	if (Array.isArray(i)) {
		let e = i.map(fs).filter((e) => !!e);
		return e.length > 0 ? [{
			appName: n,
			entries: e
		}] : [];
	}
	if (n) {
		let e = fs(i);
		return e ? [{
			appName: n,
			entries: [e]
		}] : [];
	}
	let a = [];
	for (let [e, n] of Object.entries(t)) {
		let t = (Array.isArray(n) ? n : [n]).map(fs).filter((e) => !!e);
		t.length > 0 && a.push({
			appName: e,
			entries: t
		});
	}
	return a;
}
function fs(e) {
	let t = es(e);
	if (t) {
		let e = ps(t.value ?? t.data ?? t.text ?? t);
		return e === void 0 ? void 0 : {
			...z(t.code ?? t.groupCode) === void 0 ? {} : { code: z(t.code ?? t.groupCode) },
			...B(t.name ?? t.key) ? { name: B(t.name ?? t.key) } : {},
			value: e
		};
	}
	let n = ps(e);
	return n === void 0 ? void 0 : { value: n };
}
function ps(e, t = 0, n = /* @__PURE__ */ new WeakSet()) {
	if (e === null) return null;
	if (typeof e == "string" || typeof e == "boolean") return e;
	if (typeof e == "number") return Number.isFinite(e) ? e : String(e);
	if (typeof e == "bigint") return e.toString();
	if (e instanceof Date) return e.toISOString();
	if (ArrayBuffer.isView(e)) return Array.from(new Uint8Array(e.buffer, e.byteOffset, Math.min(e.byteLength, 65536)));
	if (t >= 12 || !e || typeof e != "object") return;
	if (n.has(e)) return "[Circular]";
	if (n.add(e), Array.isArray(e)) {
		let r = e.slice(0, 1e5).map((e) => ps(e, t + 1, n)).filter((e) => e !== void 0);
		return n.delete(e), r;
	}
	let r = {};
	for (let [i, a] of Object.entries(e).slice(0, 1e4)) {
		let e = ps(a, t + 1, n);
		e !== void 0 && (r[i] = e);
	}
	return n.delete(e), r;
}
function ms(e) {
	let t = Math.abs(Number(e));
	return Number.isFinite(t) ? t : 0;
}
function hs() {
	return {
		minX: 1 / 0,
		minY: 1 / 0,
		maxX: -1 / 0,
		maxY: -1 / 0
	};
}
function gs(e) {
	return Number.isFinite(e.minX) && Number.isFinite(e.minY) && Number.isFinite(e.maxX) && Number.isFinite(e.maxY) && e.maxX >= e.minX && e.maxY >= e.minY;
}
function V(e, t) {
	H(t) && (e.minX = Math.min(e.minX, t.x), e.minY = Math.min(e.minY, t.y), e.maxX = Math.max(e.maxX, t.x), e.maxY = Math.max(e.maxY, t.y));
}
function _s(e, t, n) {
	if (!H(t) || !Number.isFinite(n)) return;
	let r = Math.abs(n);
	V(e, {
		x: t.x - r,
		y: t.y - r
	}), V(e, {
		x: t.x + r,
		y: t.y + r
	});
}
function vs(e, t) {
	gs(t) && (V(e, {
		x: t.minX,
		y: t.minY
	}), V(e, {
		x: t.maxX,
		y: t.maxY
	}));
}
function ys(e, t = .02, n = 1e-6) {
	if (!gs(e)) return {
		minX: -10,
		minY: -10,
		maxX: 10,
		maxY: 10
	};
	let r = Math.max((e.maxX - e.minX) * t, n), i = Math.max((e.maxY - e.minY) * t, n);
	return {
		minX: e.minX - r,
		minY: e.minY - i,
		maxX: e.maxX + r,
		maxY: e.maxY + i
	};
}
function H(e) {
	return !!e && typeof e == "object" && Number.isFinite(e.x) && Number.isFinite(e.y);
}
function U(e) {
	return {
		x: e.x,
		y: e.y
	};
}
function bs(e) {
	return e * Math.PI / 180;
}
function xs(e, t, n, r, i = !0, a = 64) {
	if (!H(e) || !Number.isFinite(t)) return [];
	let o = n, s = r;
	if (!Number.isFinite(o) || !Number.isFinite(s)) return [];
	(Math.abs(o) > Math.PI * 2 + 1e-6 || Math.abs(s) > Math.PI * 2 + 1e-6) && (o = bs(o), s = bs(s)), i && s < o && (s += Math.PI * 2), !i && o < s && (o += Math.PI * 2);
	let c = s - o, l = Math.max(8, Math.min(256, Math.ceil(Math.abs(c) / (Math.PI * 2) * a))), u = [];
	for (let n = 0; n <= l; n++) {
		let r = o + n / l * c;
		u.push({
			x: e.x + Math.cos(r) * t,
			y: e.y + Math.sin(r) * t
		});
	}
	return u;
}
function Ss(e, t, n = 1, r = 0, i = Math.PI * 2, a = 96) {
	if (!H(e) || !H(t)) return [];
	let o = Math.hypot(t.x, t.y);
	if (!Number.isFinite(o) || o <= 0) return [];
	let s = o * (Number.isFinite(n) && n > 0 ? n : 1), c = Math.atan2(t.y, t.x), l = Number.isFinite(r) ? r : 0, u = Number.isFinite(i) ? i : Math.PI * 2;
	(Math.abs(l) > Math.PI * 2 + 1e-6 || Math.abs(u) > Math.PI * 2 + 1e-6) && (l = bs(l), u = bs(u)), u < l && (u += Math.PI * 2);
	let d = Math.max(12, Math.min(256, Math.ceil(Math.abs(u - l) / (Math.PI * 2) * a))), f = [], p = Math.cos(c), m = Math.sin(c);
	for (let t = 0; t <= d; t++) {
		let n = l + (u - l) * (t / d), r = Math.cos(n) * o, i = Math.sin(n) * s;
		f.push({
			x: e.x + r * p - i * m,
			y: e.y + r * m + i * p
		});
	}
	return f;
}
function Cs(e, t, n = 0, r = 16) {
	if (!Number.isFinite(n) || Math.abs(n) < 1e-12) return [U(e), U(t)];
	let i = Math.hypot(t.x - e.x, t.y - e.y);
	if (i <= 1e-12) return [U(e), U(t)];
	let a = 4 * Math.atan(n), o = Math.abs(i / (2 * Math.sin(a / 2))), s = {
		x: (e.x + t.x) / 2,
		y: (e.y + t.y) / 2
	}, c = (t.x - e.x) / i, l = (t.y - e.y) / i, u = n >= 0 ? 1 : -1, d = Math.sqrt(Math.max(o * o - (i / 2) ** 2, 0)), f = {
		x: s.x - u * l * d,
		y: s.y + u * c * d
	};
	return xs(f, o, Math.atan2(e.y - f.y, e.x - f.x), Math.atan2(t.y - f.y, t.x - f.x), n >= 0, r);
}
function ws(e) {
	return e.replace(/\\P/g, "\n").replace(/\\~|\\ /g, " ").replace(/\\[A-Za-z][^;]*;/g, "").replace(/[{}]/g, "").replace(/\\[A-Za-z]/g, "").trim();
}
function Ts(e, t, n) {
	return Math.min(n, Math.max(t, e));
}
var Es = 134217728, Ds = 2e6, Os = 5e5, ks = 1048576, As = 256, js = 2e4, Ms = 1e5;
function Ns(e) {
	let t = [], n = Is(Fs(e, t), t), r = [], i = /* @__PURE__ */ new Map(), a = [], o = [], s = [], c = [], l = [], u = [], d, f, p = "", m = /* @__PURE__ */ new Map();
	for (let e of n) {
		let n = dc(e.section, e.blockName), h = cc(e, n, m), g = G(e.pairs, 5) ?? G(e.pairs, 105), _ = Ws(e.pairs, t, `${e.type}${g ? ` ${g}` : ""}`);
		if (g && _.length > 0 && i.set(J(g), _), h && _.length > 0 && a.push({
			handle: g,
			locator: h,
			groups: _
		}), e.section === "ENTITIES" || e.section === "BLOCKS") {
			if (e.type === "INSERT" || e.type === "MINSERT") d = g, f = h, p = n;
			else if (e.type === "ATTRIB") {
				let t = n === p && d ? d : $s(e.pairs), i = n === p ? f : void 0;
				r.push({
					ownerHandle: t,
					ownerLocator: i,
					attribute: Ls(e, _)
				});
			} else e.type, d = void 0, f = void 0;
			(e.type === "ACAD_TABLE" || e.type === "TABLE") && o.push({
				blockName: e.blockName,
				locator: h,
				entity: Rs(e, _)
			});
		} else if (e.section === "OBJECTS") switch (e.type) {
			case "DICTIONARY":
			case "ACDBDICTIONARYWDFLT":
				s.push(zs(e));
				break;
			case "XRECORD":
				c.push(Bs(e, t));
				break;
			case "DATALINK":
				l.push(Vs(e));
				break;
			case "DATATABLE":
				u.push(Hs(e));
				break;
			case "TABLECONTENT": {
				let t = Us(e);
				t && u.push(t);
				break;
			}
		}
	}
	return Gs(s, c), {
		attributes: r,
		xdataByHandle: i,
		xdataByLocator: a,
		tables: o,
		dictionaries: s,
		xrecords: c,
		dataLinks: l,
		dataTables: u,
		warnings: t
	};
}
function Ps(e, t) {
	let n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), i = new Set(Object.values(e.blocks));
	sc(e.entities, dc("ENTITIES"), n, r);
	for (let e of i) sc(e.entities, dc("BLOCKS", e.name), n, r);
	for (let { ownerHandle: i, ownerLocator: a, attribute: o } of t.attributes) {
		let t = (i ? n.get(J(i)) : void 0) ?? (a ? r.get(fc(a)) : void 0);
		if (!t || t.kind !== "insert" && !/^(INSERT|MINSERT)$/i.test(t.type)) {
			e.warnings.push(`DXF ATTRIB ${o.handle ?? o.attributeTag ?? "(unknown)"} could not be matched to its INSERT${i ? ` ${i}` : ""}.`);
			continue;
		}
		let s = t.attribs ??= [];
		s.some((e) => pc(e, o)) || s.push(o);
	}
	for (let [e, r] of t.xdataByHandle) {
		let t = n.get(e);
		t && (t.xdata = r);
	}
	for (let { handle: i, locator: a, groups: o } of t.xdataByLocator) {
		let t = r.get(fc(a));
		if (t) t.xdata = o;
		else {
			if (i && n.has(J(i))) continue;
			e.warnings.push(`DXF XDATA on ${i ? `${a.type} ${i}` : `handleless ${a.type} #${a.ordinal + 1}`} could not be matched to a normalized entity.`);
		}
	}
	for (let { blockName: i, locator: a, entity: o } of t.tables) {
		let t = (o.handle ? n.get(J(o.handle)) : void 0) ?? (a ? r.get(fc(a)) : void 0);
		if (t) t.kind = "table", t.table = o.table, t.xdata = o.xdata ?? t.xdata;
		else {
			if (i) {
				let t = e.blocks[i] ?? e.blocks[i.toLocaleLowerCase()];
				t ? t.entities.push(o) : e.warnings.push(`DXF table ${o.handle ?? "(unknown)"} belongs to missing block ${i}.`);
			} else e.entities.push(o);
			oc(o, n);
		}
	}
	t.dictionaries.length > 0 && (e.dictionaries = yc(e.dictionaries, t.dictionaries)), t.xrecords.length > 0 && (e.xrecords = yc(e.xrecords, t.xrecords)), t.dataLinks.length > 0 && (e.dataLinks = yc(e.dataLinks, t.dataLinks)), t.dataTables.length > 0 && (e.dataTables = yc(e.dataTables, t.dataTables)), e.warnings.push(...t.warnings), e.metadata.dxfBusinessData = {
		attributes: t.attributes.length,
		nativeTables: t.tables.length,
		dataTables: t.dataTables.length,
		dataLinks: t.dataLinks.length,
		xrecords: t.xrecords.length
	};
}
function Fs(e, t) {
	let n = Math.min(e.length, Es);
	e.length > n && t.push(`DXF BOM metadata scan was capped at ${Es.toLocaleString()} characters.`);
	let r = [], i = 0, a = !1, o = () => {
		if (i >= n) return;
		let t = i;
		for (; i < n && e.charCodeAt(i) !== 10 && e.charCodeAt(i) !== 13;) i += 1;
		let r = e.slice(t, i);
		return i < n && e.charCodeAt(i) === 13 && (i += 1), i < n && e.charCodeAt(i) === 10 && (i += 1), r;
	};
	for (; r.length < Ds;) {
		let e = o(), t = o();
		if (e === void 0 || t === void 0) break;
		let n = Number(e.trim());
		if (!Number.isInteger(n)) continue;
		let i = t.length > ks ? t.slice(0, ks) : t;
		i.length !== t.length && (a = !0), r.push({
			code: n,
			value: i.trimEnd()
		});
	}
	return r.length >= Ds && i < n && t.push(`DXF BOM metadata scan was capped at ${Ds.toLocaleString()} group-code pairs.`), a && t.push(`One or more DXF metadata values were capped at ${ks.toLocaleString()} characters.`), r;
}
function Is(e, t) {
	let n = [], r = "", i = [], a = !1, o = () => {
		i.length === 0 || r === "" || (n.length < Os ? n.push({
			section: r,
			type: i[0].value.trim().toUpperCase(),
			pairs: i
		}) : a = !0), i = [];
	};
	for (let t = 0; t < e.length; t += 1) {
		let n = e[t];
		if (n.code === 0 && n.value.trim().toUpperCase() === "SECTION") {
			o();
			let n = e[t + 1];
			r = n?.code === 2 ? n.value.trim().toUpperCase() : "", n?.code === 2 && (t += 1);
		} else n.code === 0 && n.value.trim().toUpperCase() === "ENDSEC" ? (o(), r = "") : r && (n.code === 0 && o(), i.push(n));
	}
	o(), a && t.push(`DXF BOM metadata scan was capped at ${Os.toLocaleString()} records.`);
	let s;
	for (let e of n) e.section === "BLOCKS" && (e.type === "BLOCK" ? (s = W(e.pairs, 2) ?? W(e.pairs, 3), e.blockName = s) : e.type === "ENDBLK" ? (e.blockName = s, s = void 0) : e.blockName = s);
	return n;
}
function Ls(e, t) {
	return Go({
		type: "ATTRIB",
		handle: G(e.pairs, 5),
		layer: W(e.pairs, 8) ?? "0",
		text: q(tc(e.pairs, [3, 1])),
		tag: q(W(e.pairs, 2)),
		prompt: q(W(e.pairs, 3)),
		attributeFlags: K(e.pairs, 70),
		insertionPoint: rc(e.pairs, 10),
		textHeight: K(e.pairs, 40),
		rotation: gc(K(e.pairs, 50)),
		isVisible: K(e.pairs, 60) !== 1,
		xdata: t
	}, "ATTRIB", { includeUnknownProperties: !1 });
}
function Rs(e, t) {
	let n = Qs(e.pairs, "AcDbTable"), r = hc(K(n, 91), 5e3), i = hc(K(n, 92), 5e3), a = Math.min(1e6, r * i), o = [];
	for (let e = 0; e < n.length; e += 1) n[e].code === 171 && o.push(e);
	let s = [];
	if (o.length > 0) for (let e = 0; e < Math.min(a || o.length, o.length); e += 1) {
		let t = n.slice(o[e], o[e + 1] ?? n.length), r = Zs(t);
		s.push({
			row: i > 0 ? Math.floor(e / i) : e,
			column: i > 0 ? e % i : 0,
			text: r,
			dataType: K(t, 171),
			formula: q(W(t, 300)),
			isMerged: K(t, 173) === 1,
			blockTableRecordId: G(t, 340)
		});
	}
	return Go({
		type: "ACAD_TABLE",
		handle: G(e.pairs, 5),
		layer: W(e.pairs, 8) ?? "0",
		insertionPoint: rc(e.pairs, 10),
		blockName: W(Qs(e.pairs, "AcDbBlockReference"), 2),
		rowCount: r,
		columnCount: i,
		rowHeights: nc(n, 141).slice(0, r),
		columnWidths: nc(n, 142).slice(0, i),
		cells: s,
		xdata: t
	}, "ACAD_TABLE", { includeUnknownProperties: !1 });
}
function zs(e) {
	let t = [];
	for (let n = 0; n < e.pairs.length; n += 1) {
		if (e.pairs[n].code !== 3) continue;
		let r = e.pairs.slice(n + 1).find((e) => e.code === 350 || e.code === 360 || e.code === 3);
		r && r.code !== 3 && r.value && t.push({
			name: q(e.pairs[n].value) ?? e.pairs[n].value,
			handle: r.value
		});
	}
	return {
		handle: G(e.pairs, 5) ?? G(e.pairs, 105),
		ownerHandle: ec(e.pairs),
		entries: t
	};
}
function Bs(e, t) {
	let n = Qs(e.pairs, "AcDbXrecord"), r = n.findIndex((e) => e.code === 280), i = n.filter((e, t) => t !== r);
	return i.length > Ms && t.push(`DXF XRECORD ${G(e.pairs, 5) ?? "(handleless)"} was capped at ${Ms.toLocaleString()} values.`), {
		handle: G(e.pairs, 5) ?? G(e.pairs, 105),
		ownerHandle: ec(e.pairs),
		cloning: K(n, 280),
		data: i.slice(0, Ms).map((e) => ({
			code: e.code,
			value: ic(e)
		}))
	};
}
function Vs(e) {
	let t = Qs(e.pairs, "AcDbDataLink"), n = K(t, 170), r = K(t, 171), i = K(t, 172), a = K(t, 173) ?? 0, o = K(t, 174) ?? 0, s = K(t, 175) ?? 0, c = K(t, 176) ?? 0, l = n && r && i ? vc(n, r, i, a, o, s, c) : void 0;
	return {
		handle: G(e.pairs, 5) ?? G(e.pairs, 105),
		dataAdapter: q(W(t, 1)),
		description: q(W(t, 300)),
		tooltip: q(W(t, 301)),
		connectionString: q(W(t, 302)),
		updateOption: K(t, 91),
		pathOption: K(t, 177),
		updateStatus: q(W(t, 304)),
		lastUpdated: l
	};
}
function Hs(e) {
	let t = Qs(e.pairs, "AcDbDataTable", "ACDBDATATABLE"), n = hc(K(t, 90), 1e5), r = hc(K(t, 91), 1e6), i = [], a = [];
	for (let e = 0; e < t.length; e += 1) t[e].code === 92 && a.push(e);
	for (let e = 0; e < Math.min(n || a.length, a.length); e += 1) {
		let n = t.slice(a[e], a[e + 1] ?? t.length), o = q(W(n, 2)) ?? `Column ${e + 1}`, s = n.findIndex((e) => e.code === 2), c = Ks(n.slice(s + 1)), l = r > 0 ? c.slice(0, r) : c;
		i.push({
			name: o,
			type: K(n, 92),
			values: l
		});
	}
	return {
		handle: G(e.pairs, 5) ?? G(e.pairs, 105),
		name: q(W(t, 1)),
		rowCount: r || Math.max(0, ...i.map((e) => e.values.length)),
		columnCount: n || i.length,
		columns: i
	};
}
function Us(e) {
	let t = Qs(e.pairs, "AcDbLinkedTableData");
	if (t.length === 0) return;
	let n = q(W(Qs(e.pairs, "AcDbLinkedData"), 1)), r = [];
	for (let e = 0; e < t.length; e += 1) {
		if (t[e].code !== 300 || t[e].value.trim().toUpperCase() !== "VALUE") continue;
		let n = Xs(t, e + 1, ["CELLCONTENT_END", "FORMATTEDCELLCONTENT_BEGIN"]), i = Ys(t.slice(e + 1, n));
		r.push(i ?? ""), e = Math.max(e, n - 1);
	}
	if (r.length === 0) return;
	let i = qs(t), a = Math.max(1, i.length || Js(t, r.length)), o = Math.max(1, Math.ceil(r.length / a)), s = Array.from({ length: a }, (e, t) => ({
		name: i[t] ?? `Column ${t + 1}`,
		values: Array.from({ length: o }, (e, n) => r[n * a + t] ?? "")
	}));
	return {
		handle: G(e.pairs, 5) ?? G(e.pairs, 105),
		name: n,
		rowCount: o,
		columnCount: a,
		columns: s
	};
}
function Ws(e, t, n) {
	let r = [], i, a = 0, o = !1;
	for (let t = 0; t < e.length; t += 1) {
		let n = e[t];
		if (n.code === 1001) {
			if (r.length >= As) {
				i = void 0, o = !0;
				continue;
			}
			i = {
				appName: q(n.value) ?? n.value,
				entries: []
			}, r.push(i);
		} else if (i && n.code >= 1e3 && n.code <= 1071) {
			if (a >= js) {
				o = !0;
				continue;
			}
			let r = ic(n);
			if (n.code >= 1010 && n.code <= 1013) {
				let i = e[t + 1]?.code === n.code + 10 ? e[t + 1] : void 0, a = e[t + (i ? 2 : 1)]?.code === n.code + 20 ? e[t + (i ? 2 : 1)] : void 0, o = Number(n.value), s = Number(i?.value), c = Number(a?.value);
				Number.isFinite(o) && Number.isFinite(s) && (r = Number.isFinite(c) ? {
					x: o,
					y: s,
					z: c
				} : {
					x: o,
					y: s
				}), i && (t += 1), a && (t += 1);
			}
			let s = {
				code: n.code,
				value: r
			};
			i.entries.push(s), a += 1;
		}
	}
	return o && t.push(`DXF XDATA on ${n} exceeded its safe metadata limit and was truncated.`), r.filter((e) => e.entries.length > 0);
}
function Gs(e, t) {
	let n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
	for (let t of e) {
		t.handle && n.set(J(t.handle), t);
		for (let e of t.entries) r.set(J(e.handle), {
			name: e.name,
			dictionary: t
		});
	}
	for (let e of t) {
		if (!e.handle) continue;
		let t = r.get(J(e.handle));
		if (!t) continue;
		e.entryName = t.name;
		let i = [t.name], a = t.dictionary, o = /* @__PURE__ */ new Set();
		for (; a != null && a.handle && !o.has(J(a.handle));) {
			o.add(J(a.handle));
			let e = r.get(J(a.handle));
			if (!e) break;
			i.unshift(e.name), a = n.get(J(e.dictionary.handle ?? ""));
		}
		e.dictionaryPath = i;
	}
}
function Ks(e) {
	let t = [];
	for (let n = 0; n < e.length; n += 1) {
		let r = e[n];
		if (r.code === 71) t.push(r.value.trim() !== "0");
		else if (r.code === 93 || r.code === 40) t.push(_c(r.value));
		else if (r.code === 3) t.push(q(r.value) ?? r.value);
		else if ([
			331,
			360,
			350,
			340,
			330
		].includes(r.code)) t.push(r.value);
		else if (r.code === 10 || r.code === 11) {
			let i = e[n + 1]?.code === r.code + 10 ? e[n + 1] : void 0, a = e[n + (i ? 2 : 1)]?.code === r.code + 20 ? e[n + (i ? 2 : 1)] : void 0, o = Number(r.value), s = Number(i?.value), c = Number(a?.value);
			Number.isFinite(o) && Number.isFinite(s) && t.push(Number.isFinite(c) ? {
				x: o,
				y: s,
				z: c
			} : {
				x: o,
				y: s
			}), i && (n += 1), a && (n += 1);
		}
	}
	return t;
}
function qs(e) {
	let t = [];
	for (let n = 0; n < e.length - 1; n += 1) {
		if (e[n].code !== 300) continue;
		let r = e[n + 1];
		r.code === 1 && r.value.trim().toUpperCase() === "LINKEDTABLEDATACOLUMN_BEGIN" && t.push(q(e[n].value) ?? e[n].value);
	}
	return t;
}
function Js(e, t) {
	let n = e.find((t, n) => t.code === 90 && e[n - 1]?.value !== "VALUE"), r = hc(n ? Number(n.value) : void 0, 1e5);
	return r > 0 ? Math.min(r, Math.max(1, t)) : 1;
}
function Ys(e) {
	for (let t of e) if (!(t.code === 300 && /^(VALUE|CONTENTFORMAT|CELLCONTENT)/i.test(t.value))) {
		if ([
			1,
			2,
			3,
			300,
			301,
			302,
			303,
			304
		].includes(t.code)) return q(t.value) ?? t.value;
		if (t.code >= 10 && t.code <= 59 || t.code >= 90 && t.code <= 99 || t.code >= 170 && t.code <= 179 || t.code >= 270 && t.code <= 299) return _c(t.value);
		if (t.code >= 310 && t.code <= 369) return t.value;
	}
}
function Xs(e, t, n) {
	let r = new Set(n.map((e) => e.toUpperCase()));
	for (let n = t; n < e.length; n += 1) if (r.has(e[n].value.trim().toUpperCase())) return n;
	return e.length;
}
function Zs(e) {
	let t = e.filter((e) => e.code === 302).map((e) => e.value), n = e.filter((e) => e.code === 303 || e.code === 1).map((e) => e.value);
	return q((n.length > 0 ? n : t).join("")) ?? "";
}
function Qs(e, ...t) {
	let n = new Set(t.map((e) => e.toUpperCase())), r = -1;
	for (let t = 0; t < e.length; t += 1) e[t].code === 100 && n.has(e[t].value.trim().toUpperCase()) && (r = t + 1);
	return r >= 0 ? e.slice(r) : e;
}
function $s(e) {
	return G(Qs(e, "AcDbAttribute"), 330) ?? G(e, 330);
}
function ec(e) {
	let t = e.findIndex((e) => e.code === 100);
	return e.slice(0, t >= 0 ? t : e.length).filter((e) => e.code === 330).at(-1)?.value ?? e.find((e) => e.code === 330)?.value;
}
function W(e, t) {
	return B(e.find((e) => e.code === t)?.value);
}
function tc(e, t) {
	let n = e.filter((e) => t.includes(e.code)).map((e) => e.value);
	return n.length > 0 ? n.join("") : void 0;
}
function G(e, t) {
	return W(e, t)?.trim() || void 0;
}
function K(e, t) {
	let n = e.find((e) => e.code === t);
	if (!n) return;
	let r = Number(n.value);
	return Number.isFinite(r) ? r : void 0;
}
function nc(e, t) {
	return e.filter((e) => e.code === t).map((e) => Number(e.value)).filter(Number.isFinite);
}
function rc(e, t) {
	let n = K(e, t), r = K(e, t + 10), i = K(e, t + 20);
	if (n !== void 0 && r !== void 0) return i === void 0 ? {
		x: n,
		y: r
	} : {
		x: n,
		y: r,
		z: i
	};
}
function ic(e) {
	if (e.code === 290) return e.value.trim() !== "0";
	if (ac(e.code)) return q(e.value) ?? e.value;
	let t = Number(e.value);
	return Number.isFinite(t) ? t : e.value;
}
function ac(e) {
	return e >= 0 && e <= 9 || e === 100 || e === 101 || e === 102 || e === 105 || e >= 300 && e <= 369 || e >= 390 && e <= 399 || e >= 410 && e <= 419 || e >= 430 && e <= 439 || e >= 470 && e <= 481 || e >= 999 && e <= 1009;
}
function q(e) {
	let t = B(e);
	if (t !== void 0) return t.replace(/\\U\+([0-9a-fA-F]{4,6})/g, (e, t) => {
		let n = Number.parseInt(t, 16);
		return Number.isFinite(n) && n <= 1114111 ? String.fromCodePoint(n) : e;
	}).replace(/%%[cC]/g, "∅").replace(/%%[dD]/g, "°").replace(/%%[pP]/g, "±").replace(/\\P/g, "\n");
}
function oc(e, t) {
	e.handle && t.set(J(e.handle), e);
}
function sc(e, t, n, r) {
	let i = /* @__PURE__ */ new Map();
	for (let a of e) {
		oc(a, n);
		let e = lc(a.type);
		if (!uc(e)) continue;
		let o = i.get(e) ?? 0;
		i.set(e, o + 1), r.set(fc({
			context: t,
			type: e,
			ordinal: o
		}), a);
	}
}
function cc(e, t, n) {
	if (e.section !== "ENTITIES" && e.section !== "BLOCKS") return;
	let r = lc(e.type);
	if (!uc(r)) return;
	let i = `${t}\0${r}`, a = n.get(i) ?? 0;
	return n.set(i, a + 1), {
		context: t,
		type: r,
		ordinal: a
	};
}
function lc(e) {
	let t = e.trim().toUpperCase();
	return t === "MINSERT" ? "INSERT" : /^POLYLINE(?:2D|3D|_2D|_3D)?$/.test(t) ? "POLYLINE" : t === "ACAD_TABLE" || t === "ACDBTABLE" ? "TABLE" : t;
}
function uc(e) {
	return ![
		"",
		"ATTRIB",
		"SEQEND",
		"VERTEX",
		"BLOCK",
		"ENDBLK"
	].includes(e);
}
function dc(e, t) {
	return `${e.trim().toUpperCase()}\0${t?.trim().toUpperCase() ?? ""}`;
}
function fc(e) {
	return `${e.context}\0${e.type}\0${e.ordinal}`;
}
function pc(e, t) {
	return e.handle && t.handle ? J(e.handle) === J(t.handle) : (e.attributeTag ?? "").trim().toLocaleUpperCase() === (t.attributeTag ?? "").trim().toLocaleUpperCase() && (e.text ?? e.value ?? "") === (t.text ?? t.value ?? "") && mc(e.insertionPoint, t.insertionPoint);
}
function mc(e, t) {
	return !e || !t ? e === t : e.x === t.x && e.y === t.y && (e.z ?? 0) === (t.z ?? 0);
}
function J(e) {
	return e.trim().toUpperCase();
}
function hc(e, t) {
	return !Number.isFinite(e) || e === void 0 || e <= 0 ? 0 : Math.min(t, Math.trunc(e));
}
function gc(e) {
	return e === void 0 ? void 0 : e * Math.PI / 180;
}
function _c(e) {
	let t = Number(e);
	return Number.isFinite(t) ? t : e;
}
function vc(e, t, n, r, i, a, o) {
	let s = new Date(Date.UTC(e, t - 1, n, r, i, a, o));
	return Number.isNaN(s.getTime()) ? void 0 : s.toISOString();
}
function yc(e, t) {
	let n = [...e ?? []], r = /* @__PURE__ */ new Map();
	n.forEach((e, t) => {
		e.handle && r.set(J(e.handle), t);
	});
	for (let e of t) {
		let t = e.handle ? J(e.handle) : void 0, i = t ? r.get(t) : void 0;
		i === void 0 ? (t && r.set(t, n.length), n.push(e)) : n[i] = e;
	}
	return n;
}
var bc = class {
	constructor(e = {}) {
		L(this, "id", "dxf"), L(this, "label", "DXF / JavaScript parser"), L(this, "formats", ["dxf"]), L(this, "defaults"), this.defaults = e;
	}
	accepts(e, t) {
		return Co(e) === "dxf" || wo(e, t) === "dxf";
	}
	async load(e, t = {}) {
		let n = {
			...this.defaults,
			...t
		}, r = performance.now(), i = await xo(e), a = Nc(i, n.dxfEncoding), o = [], s;
		try {
			s = await xc(a);
		} catch (e) {
			o.push(`dxf-parser failed, using built-in fallback parser: ${e instanceof Error ? e.message : String(e)}`), s = Uc(a);
		}
		let c = Sc(s, e.fileName ?? e.file?.name, o);
		Ps(c, Ns(a));
		let l = performance.now() - r;
		return {
			document: c,
			raw: s,
			bytes: i.byteLength,
			elapsedMs: l,
			format: "dxf",
			warnings: c.warnings
		};
	}
};
async function xc(e) {
	let t = await import("./dist-BS05xid8.js"), n = t.default ?? t.DxfParser;
	if (!n) throw Error("dxf-parser did not expose a parser constructor.");
	return new n().parseSync(e);
}
function Sc(e, t, n = []) {
	let r = e && typeof e == "object" ? e : {}, i = wc(r), a = Tc(r), o = (Array.isArray(r.entities) ? r.entities : []).filter((e) => !!e && typeof e == "object").map((e) => Cc(e)), s = Uo({
		format: "dxf",
		sourceName: t,
		header: r.header && typeof r.header == "object" ? r.header : {},
		layers: i,
		blocks: a,
		entities: o,
		metadata: { parser: "dxf-parser + cad-viewer normalizer" },
		warnings: n,
		raw: e
	});
	return o.length === 0 && s.warnings.push("DXF file did not expose any ENTITIES."), s;
}
function Cc(e) {
	let t = String(e.type ?? e.entityType ?? "UNKNOWN").toUpperCase(), n = Go(e, t), r = z(e.colorIndex ?? e.colorNumber ?? e.aci), i = z(e.color);
	if (n.colorIndex = r ?? (i !== void 0 && Math.abs(i) <= 257 ? i : void 0), n.trueColor = e.trueColor ?? e.true_color ?? e.colorRGB ?? e.trueColorValue ?? (i !== void 0 && Math.abs(i) > 257 ? i : void 0), n.layer = B(e.layer ?? e.layerName) ?? "0", n.isClosed = !!(e.shape ?? e.closed ?? e.isClosed) || (Number(e.flag ?? e.flags ?? 0) & 1) == 1, t === "LINE" && (n.startPoint = n.startPoint ?? R({
		x: e.x1 ?? e.x,
		y: e.y1 ?? e.y,
		z: e.z1 ?? e.z
	}) ?? n.vertices?.[0], n.endPoint = n.endPoint ?? R({
		x: e.x2,
		y: e.y2,
		z: e.z2
	}) ?? n.vertices?.[1]), (t === "TEXT" || t === "MTEXT" || t === "ATTRIB" || t === "ATTDEF") && (n.insertionPoint = R(e.startPoint ?? e.position ?? e.insertionPoint) ?? n.insertionPoint, n.text = Hc(e.text ?? e.string ?? e.value) ?? n.text, n.textHeight = z(e.textHeight ?? e.height) ?? n.textHeight, n.rotation = jc(e.rotation ?? e.angle)), (t === "ARC" || t === "ELLIPSE") && (n.startAngle = Mc(e.startAngle ?? e.start_angle), n.endAngle = Mc(e.endAngle ?? e.end_angle)), t === "INSERT") {
		n.blockName = B(e.name ?? e.blockName) ?? n.blockName, n.insertionPoint = R(e.position ?? e.insertionPoint ?? e.point) ?? n.insertionPoint;
		let t = z(e.xScale ?? e.scaleX ?? e.xscale), r = z(e.yScale ?? e.scaleY ?? e.yscale), i = z(e.zScale ?? e.scaleZ ?? e.zscale);
		(t !== void 0 || r !== void 0 || i !== void 0) && (n.scale = {
			x: t ?? 1,
			y: r ?? t ?? 1,
			z: i ?? 1
		}), n.rotation = jc(e.rotation ?? e.angle);
	}
	if (t === "SPLINE") {
		let t = Oc(e.controlPoints ?? e.control_points ?? e.points);
		t.length && (n.controlPoints = t);
		let r = Oc(e.fitPoints ?? e.fit_points);
		r.length && (n.fitPoints = r);
	}
	return t === "HATCH" && (n.loops = Ac(e), n.fillColorIndex = n.colorIndex), (t === "SOLID" || t === "TRACE" || t === "3DFACE") && (n.vertices = kc(e), n.fillColorIndex = n.colorIndex), n;
}
function wc(e) {
	let t = {}, n = e.tables, r = Dc(e.layers ?? n?.layer ?? n?.LAYER ?? n?.layers);
	for (let e of r) {
		let n = e, r = B(n.name ?? n.layerName);
		r && Zo(t, {
			name: r,
			color: n.color ?? n.colorNumber ?? n.colorIndex,
			colorIndex: z(n.colorNumber ?? n.colorIndex ?? n.color),
			lineType: B(n.lineType ?? n.linetype),
			isVisible: Number(n.colorNumber ?? n.colorIndex ?? n.color ?? 1) >= 0,
			isFrozen: !!n.frozen,
			isLocked: !!n.locked,
			raw: n
		});
	}
	return t[0] || Zo(t, {
		name: "0",
		colorIndex: 7,
		isVisible: !0
	}), t;
}
function Tc(e) {
	let t = {}, n = e.blocks;
	if (!n || typeof n != "object") return t;
	if (Array.isArray(n)) for (let e of n) Ec(t, e);
	else for (let [e, r] of Object.entries(n)) Ec(t, r, e);
	return t;
}
function Ec(e, t, n) {
	if (!t || typeof t != "object") return;
	let r = t, i = B(r.name ?? r.blockName ?? n);
	if (!i) return;
	let a = (Array.isArray(r.entities) ? r.entities : []).filter((e) => !!e && typeof e == "object").map((e) => Cc(e));
	Qo(e, {
		name: i,
		basePoint: R(r.basePoint ?? r.position) ?? {
			x: 0,
			y: 0
		},
		entities: a,
		raw: r
	});
}
function Dc(e) {
	if (!e) return [];
	if (Array.isArray(e)) return e;
	if (typeof e != "object") return [];
	let t = e;
	return Array.isArray(t.entries) ? t.entries : Array.isArray(t.records) ? t.records : Array.isArray(t.layers) ? t.layers : Object.values(t).filter((e) => e && typeof e == "object");
}
function Oc(e) {
	return Array.isArray(e) ? e.map(R).filter((e) => !!e) : [];
}
function kc(e) {
	let t = Oc(e.vertices ?? e.points);
	if (t.length) return t;
	let n = [];
	for (let t = 0; t < 4; t++) {
		let r = R({
			x: e[`x${t}`] ?? e[`x${t + 1}`],
			y: e[`y${t}`] ?? e[`y${t + 1}`],
			z: e[`z${t}`] ?? e[`z${t + 1}`]
		});
		r && n.push(r);
	}
	return n;
}
function Ac(e) {
	let t = e.boundaryLoops ?? e.loops ?? e.paths;
	if (Array.isArray(t)) return t.map((e) => {
		let t = e;
		return {
			vertices: Oc(t.vertices ?? t.points),
			isClosed: !0
		};
	}).filter((e) => e.vertices && e.vertices.length > 0);
}
function jc(e) {
	let t = z(e);
	if (t !== void 0) return Math.abs(t) > Math.PI * 2 + 1e-6 ? bs(t) : t;
}
function Mc(e) {
	let t = z(e);
	if (t !== void 0) return Math.abs(t) > Math.PI * 2 + 1e-6 ? bs(t) : t;
}
function Nc(e, t) {
	let n = Lc(t);
	if (n) return Rc(e, n);
	let r = Fc(e);
	if (r) return Rc(e, r);
	let i = Lc(Ic(e));
	if (i) return Rc(e, i);
	let a = Rc(e, "utf-8");
	return a.includes("�") ? zc(e) : a;
}
var Pc = {
	ANSI_874: "windows-874",
	ANSI_932: "shift_jis",
	ANSI_936: "gb18030",
	ANSI_949: "euc-kr",
	ANSI_950: "big5",
	ANSI_1250: "windows-1250",
	ANSI_1251: "windows-1251",
	ANSI_1252: "windows-1252",
	ANSI_1253: "windows-1253",
	ANSI_1254: "windows-1254",
	ANSI_1255: "windows-1255",
	ANSI_1256: "windows-1256",
	ANSI_1257: "windows-1257",
	ANSI_1258: "windows-1258",
	BIG5: "big5",
	CP874: "windows-874",
	CP932: "shift_jis",
	CP936: "gb18030",
	CP949: "euc-kr",
	CP950: "big5",
	CP1250: "windows-1250",
	CP1251: "windows-1251",
	CP1252: "windows-1252",
	CP1253: "windows-1253",
	CP1254: "windows-1254",
	CP1255: "windows-1255",
	CP1256: "windows-1256",
	CP1257: "windows-1257",
	CP1258: "windows-1258",
	GB18030: "gb18030",
	GB2312: "gb18030",
	GBK: "gb18030",
	SHIFT_JIS: "shift_jis",
	SHIFTJIS: "shift_jis",
	SJIS: "shift_jis",
	UTF8: "utf-8",
	UTF_8: "utf-8",
	UTF16: "utf-16le",
	UTF_16: "utf-16le",
	UTF16LE: "utf-16le",
	UTF_16LE: "utf-16le",
	UTF16BE: "utf-16be",
	UTF_16BE: "utf-16be"
};
function Fc(e) {
	if (e.length >= 3 && e[0] === 239 && e[1] === 187 && e[2] === 191) return "utf-8";
	if (e.length >= 2 && e[0] === 255 && e[1] === 254) return "utf-16le";
	if (e.length >= 2 && e[0] === 254 && e[1] === 255) return "utf-16be";
}
function Ic(e) {
	let t = Rc(e.subarray(0, Math.min(e.byteLength, 131072)), "iso-8859-1").replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
	for (let e = 0; e < t.length - 3; e++) if (t[e]?.trim() === "9" && t[e + 1]?.trim().toUpperCase() === "$DWGCODEPAGE") for (let n = e + 2; n < Math.min(e + 10, t.length - 1); n += 2) {
		let e = t[n]?.trim(), r = t[n + 1]?.trim();
		if (e === "3" && r) return r;
	}
}
function Lc(e) {
	let t = e?.trim();
	if (!t) return;
	let n = t.replace(/[-\s]+/g, "_").toUpperCase();
	if (Pc[n]) return Pc[n];
	let r = /^ANSI_(\d{3,4})$/.exec(n);
	if (r) return Lc(`cp${r[1]}`);
	let i = /^CP(\d{3,4})$/.exec(n);
	return i ? i[1] === "936" ? "gb18030" : i[1] === "950" ? "big5" : i[1] === "932" ? "shift_jis" : i[1] === "949" ? "euc-kr" : `windows-${i[1]}` : t;
}
function Rc(e, t) {
	try {
		return new TextDecoder(t, { fatal: !1 }).decode(e);
	} catch {
		return new TextDecoder("utf-8", { fatal: !1 }).decode(e);
	}
}
function zc(e) {
	let t = [
		"windows-1252",
		"gb18030",
		"big5",
		"shift_jis",
		"euc-kr",
		"iso-8859-1"
	], n = "", r = Infinity;
	for (let i of t) {
		let t = Rc(e, i), a = Bc(t, i);
		a < r && (r = a, n = t);
	}
	return n || Rc(e, "utf-8");
}
function Bc(e, t) {
	let n = Vc(e, /\uFFFD/g), r = Vc(e, /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g), i = Vc(e, /[\u3400-\u9FFF\uF900-\uFAFF]/g), a = e.includes("SECTION") && (e.includes("ENTITIES") || e.includes("HEADER")), o = n * 1e4 + r * 1e3;
	return a && (o -= 500), t === "windows-1252" && (o -= 2), t === "gb18030" && i >= 2 && (o -= 50 + Math.min(i, 200) * 2), o;
}
function Vc(e, t) {
	return e.match(t)?.length ?? 0;
}
function Hc(e) {
	let t = B(e);
	if (t !== void 0) return t.replace(/\\U\+([0-9a-fA-F]{4,6})/g, (e, t) => {
		let n = Number.parseInt(t, 16);
		return Number.isFinite(n) && n >= 0 && n <= 1114111 ? String.fromCodePoint(n) : e;
	}).replace(/%%[cC]/g, "∅").replace(/%%[dD]/g, "°").replace(/%%[pP]/g, "±").replace(/\\P/g, "\n");
}
function Uc(e) {
	let t = e.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n"), n = [];
	for (let e = 0; e < t.length - 1; e += 2) {
		let r = Number(t[e]?.trim()), i = t[e + 1] ?? "";
		Number.isFinite(r) && n.push({
			code: r,
			value: i.trimEnd()
		});
	}
	let r = [], i = {}, a = "", o = [], s;
	for (let e = 0; e < n.length; e++) {
		let t = n[e];
		t.code === 0 && t.value === "SECTION" ? (a = n[e + 1]?.code === 2 ? n[e + 1].value.toUpperCase() : "", e++) : t.code === 0 && t.value === "ENDSEC" ? (c(), a = "") : a === "ENTITIES" && (t.code === 0 ? (c(), o = [t]) : o.push(t));
	}
	return c(), {
		header: {},
		tables: {},
		entities: r,
		blocks: i
	};
	function c() {
		if (!o.length) return;
		let e = o[0]?.value.toUpperCase();
		if (e === "VERTEX" && s) {
			let e = Kc(o, 10, 20, 30);
			e && (s.vertices ?? (s.vertices = [])).push({
				...e,
				bulge: Y(o, 42)
			}), o = [];
			return;
		}
		if (e === "SEQEND") {
			s && r.push(s), s = void 0, o = [];
			return;
		}
		if (s &&= (r.push(s), void 0), !e || e === "EOF") {
			o = [];
			return;
		}
		let t = Wc(e, o);
		e === "POLYLINE" ? s = t : r.push(t), o = [];
	}
}
function Wc(e, t) {
	let n = {
		type: e,
		handle: Gc(t, 5),
		layer: Gc(t, 8) ?? "0",
		colorIndex: Y(t, 62),
		trueColor: Y(t, 420),
		lineType: Gc(t, 6),
		lineweight: Y(t, 370)
	};
	switch (e) {
		case "LINE":
			Object.assign(n, {
				startPoint: Kc(t, 10, 20, 30),
				endPoint: Kc(t, 11, 21, 31)
			});
			break;
		case "CIRCLE":
			Object.assign(n, {
				center: Kc(t, 10, 20, 30),
				radius: Y(t, 40)
			});
			break;
		case "ARC":
			Object.assign(n, {
				center: Kc(t, 10, 20, 30),
				radius: Y(t, 40),
				startAngle: Xc(Y(t, 50)),
				endAngle: Xc(Y(t, 51))
			});
			break;
		case "POINT":
			Object.assign(n, { point: Kc(t, 10, 20, 30) });
			break;
		case "TEXT":
		case "MTEXT":
			Object.assign(n, {
				insertionPoint: Kc(t, 10, 20, 30),
				text: Yc(t),
				textHeight: Y(t, 40),
				rotation: Xc(Y(t, 50))
			});
			break;
		case "LWPOLYLINE":
			Object.assign(n, {
				vertices: Jc(t),
				flag: Y(t, 70),
				isClosed: (Number(Y(t, 70) ?? 0) & 1) == 1
			});
			break;
		case "POLYLINE":
			Object.assign(n, {
				vertices: [],
				flag: Y(t, 70),
				isClosed: (Number(Y(t, 70) ?? 0) & 1) == 1
			});
			break;
		case "ELLIPSE":
			Object.assign(n, {
				center: Kc(t, 10, 20, 30),
				majorAxisEndPoint: Kc(t, 11, 21, 31),
				axisRatio: Y(t, 40),
				startAngle: Y(t, 41),
				endAngle: Y(t, 42)
			});
			break;
		case "SPLINE":
			Object.assign(n, {
				controlPoints: qc(t, 10, 20, 30),
				degree: Y(t, 71),
				isClosed: (Number(Y(t, 70) ?? 0) & 1) == 1
			});
			break;
		case "INSERT":
			Object.assign(n, {
				name: Gc(t, 2),
				blockName: Gc(t, 2),
				insertionPoint: Kc(t, 10, 20, 30),
				rotation: Xc(Y(t, 50)),
				scale: {
					x: Y(t, 41) ?? 1,
					y: Y(t, 42) ?? Y(t, 41) ?? 1,
					z: Y(t, 43) ?? 1
				}
			});
			break;
		case "SOLID":
		case "TRACE":
		case "3DFACE": Object.assign(n, { vertices: [
			Kc(t, 10, 20, 30),
			Kc(t, 11, 21, 31),
			Kc(t, 12, 22, 32),
			Kc(t, 13, 23, 33)
		].filter(Boolean) });
	}
	return Cc(n);
}
function Y(e, t) {
	let n = e.find((e) => e.code === t)?.value, r = Number(n);
	return Number.isFinite(r) ? r : void 0;
}
function Gc(e, t) {
	let n = e.find((e) => e.code === t)?.value;
	return n && n.length > 0 ? n : void 0;
}
function Kc(e, t, n, r) {
	let i = Y(e, t), a = Y(e, n), o = Y(e, r);
	if (i !== void 0 && a !== void 0) return o === void 0 ? {
		x: i,
		y: a
	} : {
		x: i,
		y: a,
		z: o
	};
}
function qc(e, t, n, r) {
	let i = [];
	for (let a = 0; a < e.length; a++) {
		if (e[a].code !== t) continue;
		let o = Number(e[a].value), s = e.slice(a + 1).find((e) => e.code === n), c = e.slice(a + 1).find((e) => e.code === r), l = Number(s?.value), u = Number(c?.value);
		Number.isFinite(o) && Number.isFinite(l) && i.push(Number.isFinite(u) ? {
			x: o,
			y: l,
			z: u
		} : {
			x: o,
			y: l
		});
	}
	return i;
}
function Jc(e) {
	let t = [];
	for (let n = 0; n < e.length; n++) {
		if (e[n].code !== 10) continue;
		let r = Number(e[n].value), i, a;
		for (let t = n + 1; t < e.length && e[t].code !== 10; t++) e[t].code === 20 && (i = Number(e[t].value)), e[t].code === 42 && (a = Number(e[t].value));
		Number.isFinite(r) && Number.isFinite(i) && t.push({
			x: r,
			y: i,
			bulge: Number.isFinite(a) ? a : void 0
		});
	}
	return t;
}
function Yc(e) {
	let t = e.filter((e) => e.code === 1 || e.code === 3).map((e) => e.value);
	return t.length ? t.join("") : void 0;
}
function Xc(e) {
	return typeof e == "number" && Number.isFinite(e) ? bs(e) : void 0;
}
function Zc(e) {
	let t = e[0];
	if (!t || !t.width || !t.height) throw Error("CAD canvas is not ready for capture.");
	let n = t.ownerDocument.createElement("canvas");
	n.width = t.width, n.height = t.height;
	let r = n.getContext("2d");
	if (!r) throw Error("Canvas 2D is required for CAD capture.");
	for (let t of e) r.drawImage(t, 0, 0, n.width, n.height);
	return n;
}
var Qc = class {
	constructor(e = {}) {
		L(this, "id", "dwf"), L(this, "label", "DWF/DWFx native viewer powered by dwf-viewer"), L(this, "formats", [
			"dwf",
			"dwfx",
			"xps"
		]), L(this, "nativeRenderer", !0), L(this, "defaults"), L(this, "native"), L(this, "host"), L(this, "lastStats"), this.defaults = e;
	}
	accepts(e, t) {
		let n = Co(e);
		if (n === "dwf" || n === "dwfx" || n === "xps") return !0;
		let r = wo(e, t);
		return r === "dwf" || r === "dwfx" || r === "xps";
	}
	async load(e, t = {}) {
		var n, r, i;
		let a = {
			...this.defaults,
			...t
		}, o = performance.now(), s = e.fileName ?? e.file?.name, c = await xo(e), l = al(wo(e, c), Co(e));
		(n = a.onProgress) == null || n.call(a, {
			phase: "parse",
			format: l,
			message: "Opening DWF/DWFx with dwf-viewer…",
			percent: 48
		});
		let u = await Wr(c, { fileName: s });
		(r = a.onProgress) == null || r.call(a, {
			phase: "normalize",
			format: l,
			message: "Reading DWF pages, sheets and model metadata…",
			percent: 76
		});
		let d = $c(u, s, l, a.keepRaw === !0), f = performance.now() - o;
		return (i = a.onProgress) == null || i.call(a, {
			phase: "done",
			format: d.format,
			message: "DWF/DWFx document ready.",
			percent: 100,
			elapsedMs: f
		}), {
			document: d,
			raw: a.keepRaw ? u : void 0,
			bytes: c.byteLength,
			elapsedMs: f,
			format: d.format,
			warnings: d.warnings
		};
	}
	async mount(e, t, n = {}) {
		var r, i, a, o;
		let s = {
			...this.defaults,
			...n
		}, c = performance.now(), l = e.fileName ?? e.file?.name, u = await xo(e), d = al(wo(e, u), Co(e)), f = ol(s), p = sl(s), m = ul(s, f, p), h = dl(s, f, p);
		(r = s.onProgress) == null || r.call(s, {
			phase: "native-render",
			format: d,
			message: "Mounting native DWF renderer…",
			percent: 28
		}), this.unmount(), this.host = t, t.replaceChildren(), this.native = new vo(t, m), (i = s.onProgress) == null || i.call(s, {
			phase: "parse",
			format: d,
			message: "Parsing DWF package and page streams…",
			percent: 58
		}), await this.native.load(u, {
			fileName: l,
			...h
		}), (a = s.onProgress) == null || a.call(s, {
			phase: "render",
			format: d,
			message: "Rendering DWF/DWFx with dwf-viewer…",
			percent: 88
		}), this.lastStats = await this.native.render();
		let g = this.native.getDocument(), _ = $c(g, l, d, s.keepRaw === !0);
		_.metadata.loaderMode = "Native DWF", _.metadata.nativeRenderer = "dwf-viewer", _.metadata.nativeRenderStats = this.lastStats ? {
			...this.lastStats,
			warnings: this.lastStats.warnings.length
		} : void 0;
		let v = performance.now() - c;
		return (o = s.onProgress) == null || o.call(s, {
			phase: "done",
			format: _.format,
			message: "DWF/DWFx rendered.",
			percent: 100,
			elapsedMs: v
		}), {
			document: _,
			raw: s.keepRaw ? g : void 0,
			bytes: u.byteLength,
			elapsedMs: v,
			format: _.format,
			warnings: _.warnings
		};
	}
	unmount() {
		var e;
		(e = this.native) == null || e.dispose(), this.native = void 0, this.lastStats = void 0, this.host && this.host.replaceChildren();
	}
	fit() {
		var e;
		(e = this.native) == null || e.fit();
	}
	zoomIn() {
		(this.native?.zoomInButton)?.click();
	}
	zoomOut() {
		(this.native?.zoomOutButton)?.click();
	}
	resize() {
		var e;
		(e = this.native) == null || e.render();
	}
	setNativeOptions(e) {
		var t, n, r, i, a, o;
		let s = this.native;
		if (s) {
			if (typeof e.dwfBackground == "string") s.background = e.dwfBackground;
			else {
				let t = sl(e);
				t && (s.background = t);
			}
			typeof e.dwfPreferWebgl == "boolean" && ((t = s.setPreferWebgl) == null || t.call(s, e.dwfPreferWebgl)), typeof e.dwfPreferWasm == "boolean" && ((n = s.setPreferWasm) == null || n.call(s, e.dwfPreferWasm)), e.dwfLineWeightMode && ((r = s.setLineWeightMode) == null || r.call(s, e.dwfLineWeightMode)), (i = s.setMonochromeColor) == null || i.call(s, cl(e)), (a = s.setContrastOptions) == null || a.call(s, ll(e)), fl(s, "minStrokeCssPx", e.dwfMinStrokeCssPx), fl(s, "maxOverviewStrokeCssPx", e.dwfMaxOverviewStrokeCssPx), fl(s, "minTextCssPx", e.dwfMinTextCssPx), fl(s, "minFilledAreaCssPx", e.dwfMinFilledAreaCssPx), (o = s.render) == null || o.call(s);
		}
	}
	getLastNativeStats() {
		return this.lastStats;
	}
	async captureCanvas() {
		let e = this.native;
		if (!e) throw Error("No DWF document is loaded.");
		if (await e.render(), await e.render(), this.native !== e) throw Error("DWF document changed during capture.");
		return Zc([e.webglCanvas, e.canvas].filter((e) => {
			let t = e.ownerDocument.defaultView?.getComputedStyle(e);
			return t?.display !== "none" && t?.visibility !== "hidden";
		}));
	}
};
function $c(e, t, n, r) {
	let i = il(e?.diagnostics ?? []), a = (e?.pageData ?? []).map((e, t) => el(e, t));
	for (let t of e?.pageData ?? []) i.push(...il(t.diagnostics));
	let o = {
		parser: "dwf-viewer",
		nativeRenderer: "dwf-viewer",
		dwfKind: e?.kind,
		packageEntries: e?.packageEntries?.length ?? 0,
		resources: e?.resources?.length ?? 0,
		pageKinds: gl((e?.pageData ?? []).map((e) => e.kind)),
		pageNames: (e?.pages ?? []).map((e) => e.name)
	};
	return Uo({
		format: n,
		sourceName: t,
		layers: {},
		blocks: {},
		pages: a,
		entities: $o(a),
		metadata: o,
		warnings: _l(i),
		raw: r ? e : void 0
	});
}
function el(e, t) {
	let n = tl(e, t);
	return {
		index: t,
		name: e.name || e.sourcePath || `${t + 1}`,
		width: e.width || 1e3,
		height: e.height || 1e3,
		entities: n
	};
}
function tl(e, t) {
	return e.kind === "w2d-text" ? e.primitives.flatMap((e, n) => nl(e, t, n)) : e.kind === "image" ? [{
		type: "DWF_IMAGE_PAGE",
		kind: "image",
		pageIndex: t,
		width: e.width,
		height: e.height,
		imageSource: e.sourcePath
	}] : e.kind === "w3d-model" ? e.model.meshes.map((e, n) => ({
		id: e.id,
		type: "W3D_MESH",
		kind: "solid",
		pageIndex: t,
		color: e.color ? ml(e.color) : void 0,
		name: e.name || `mesh-${n + 1}`,
		raw: {
			vertexCount: e.vertexCount,
			triangleCount: e.triangleCount,
			materialId: e.materialId
		}
	})) : e.kind === "xps-fixed-page" ? [{
		type: "XPS_FIXED_PAGE",
		kind: "viewport",
		pageIndex: t,
		width: e.width,
		height: e.height,
		raw: { sourcePath: e.sourcePath }
	}] : [{
		type: "DWF_PAGE",
		kind: "viewport",
		pageIndex: t,
		width: e.width,
		height: e.height,
		raw: { sourcePath: e.sourcePath }
	}];
}
function nl(e, t, n) {
	let r = {
		id: `dwf-${t}-${n}`,
		pageIndex: t,
		color: e.stroke,
		fillColor: e.fill,
		lineweight: e.lineWidth,
		raw: { matrix: e.matrix }
	};
	if (e.type === "polyline" || e.type === "polygon") return [{
		...r,
		type: e.type === "polygon" ? "DWF_POLYGON" : "DWF_POLYLINE",
		kind: "polyline",
		vertices: rl(e.points),
		isClosed: e.type === "polygon"
	}];
	if (e.type === "path") return [{
		...r,
		type: "DWF_PATH",
		kind: "path",
		commands: e.commands
	}];
	if (e.type === "text") return [{
		...r,
		type: "DWF_TEXT",
		kind: "text",
		insertionPoint: {
			x: e.x,
			y: e.y,
			z: 0
		},
		text: e.text,
		textHeight: e.size
	}];
	if (e.type === "rect") {
		let t = e.x, n = e.y, i = e.width, a = e.height;
		return [{
			...r,
			type: "DWF_RECT",
			kind: "polyline",
			isClosed: !0,
			vertices: [
				{
					x: t,
					y: n,
					z: 0
				},
				{
					x: t + i,
					y: n,
					z: 0
				},
				{
					x: t + i,
					y: n + a,
					z: 0
				},
				{
					x: t,
					y: n + a,
					z: 0
				}
			]
		}];
	}
	return [];
}
function rl(e) {
	let t = [];
	for (let n = 0; n + 1 < e.length; n += 2) t.push({
		x: e[n],
		y: e[n + 1],
		z: 0
	});
	return t;
}
function il(e) {
	return e.filter((e) => e.level !== "info").map((e) => `${e.code}: ${e.message}${e.source ? ` (${e.source})` : ""}`);
}
function al(e, t) {
	return t === "dwf" || t === "dwfx" || t === "xps" ? t : e === "dwf" || e === "dwfx" || e === "xps" ? e : "dwf";
}
function ol(e) {
	if (e.dwfWasmUrl) return e.dwfWasmUrl;
	if (typeof document > "u") return;
	let t = e.wasmPath ? new URL(pl(e.wasmPath), document.baseURI).href : new URL("wasm/", document.baseURI).href;
	return new URL("dwfv-render.wasm", t).href;
}
function sl(e) {
	return e.dwfBackground ? e.dwfBackground : e.canvasOptions?.background ?? "#05070d";
}
function cl(e) {
	let t = e;
	return t.colorMode === "monochrome" ? t.monochromeColor?.trim() || (t.canvasOptions?.foreground)?.trim() || "#ffffff" : void 0;
}
function ll(e) {
	let t = e.canvasOptions;
	return {
		contrastMode: t?.contrastMode ?? "adaptive",
		minColorContrast: t?.minColorContrast ?? 2.4
	};
}
function ul(e, t, n) {
	let r = cl(e);
	return {
		...dl(e, t, n),
		maxDevicePixelRatio: e.dwfMaxDevicePixelRatio ?? 2,
		maxCanvasPixels: e.dwfMaxCanvasPixels ?? 16777216,
		...r ? { monochromeColor: r } : {}
	};
}
function dl(e, t, n) {
	let r = cl(e);
	return {
		wasmUrl: t,
		preferWebgl: e.dwfPreferWebgl ?? !0,
		preferWasm: e.dwfPreferWasm ?? !0,
		background: n,
		...ll(e),
		maxGpuCacheBytes: e.dwfMaxGpuCacheBytes ?? 167772160,
		maxCachedScenes: e.dwfMaxCachedScenes ?? 2,
		lineWeightMode: e.dwfLineWeightMode ?? "adaptive",
		minStrokeCssPx: e.dwfMinStrokeCssPx,
		maxOverviewStrokeCssPx: e.dwfMaxOverviewStrokeCssPx,
		minTextCssPx: e.dwfMinTextCssPx,
		minFilledAreaCssPx: e.dwfMinFilledAreaCssPx,
		...r ? { monochromeColor: r } : {}
	};
}
function fl(e, t, n) {
	typeof n == "number" && Number.isFinite(n) && (e[t] = n);
}
function pl(e) {
	return e.endsWith("/") ? e : `${e}/`;
}
function ml(e) {
	let [t, n, r] = e.map((e) => Math.max(0, Math.min(255, Math.round(e * 255))));
	return `#${hl(t)}${hl(n)}${hl(r)}`;
}
function hl(e) {
	return e.toString(16).padStart(2, "0");
}
function gl(e) {
	let t = {};
	for (let n of e) t[n] = (t[n] ?? 0) + 1;
	return t;
}
function _l(e) {
	return Array.from(new Set(e));
}
function vl(e = {}) {
	return new Eo([
		new Bo(e),
		new bc(e),
		new Qc(e)
	]);
}
var yl = [
	"block-attributes",
	"native-table",
	"data-table",
	"xdata",
	"xrecord",
	"text-table"
], bl = yl.filter((e) => e !== "xdata" && e !== "xrecord"), xl = 1e6;
function Sl(e, t = {}) {
	let n = Cl(t), r = {
		document: e,
		options: n,
		tables: [],
		warnings: [],
		visitedEntities: 0,
		seenEntities: /* @__PURE__ */ new WeakSet(),
		emittedRows: 0,
		stopped: !1
	};
	if (n.sources.has("block-attributes") && wl(r, Dl(r)), n.sources.has("native-table")) for (let e of Ol(r)) wl(r, e);
	if (n.sources.has("data-table")) for (let e of Al(r)) wl(r, e);
	if (n.sources.has("xdata")) for (let e of Ml(r)) wl(r, e);
	if (n.sources.has("xrecord")) for (let e of Nl(r)) wl(r, e);
	if (n.sources.has("text-table") && n.textTables !== !1) for (let e of Fl(r)) wl(r, e);
	!["dwg", "dxf"].includes(e.format) && r.tables.length === 0 && r.warnings.push({
		code: "unsupported-format",
		message: `${e.format.toUpperCase()} does not expose a normalized component/property model for BOM extraction.`
	});
	let i = {};
	for (let e of r.tables) i[e.source] = (i[e.source] ?? 0) + 1;
	let a = r.tables.filter((e) => e.source === "block-attributes"), o = Eu([...r.warnings, ...r.tables.flatMap((e) => e.warnings)]);
	return {
		schemaVersion: 1,
		sourceName: e.sourceName,
		format: e.format,
		tables: r.tables,
		summary: {
			tableCount: r.tables.length,
			rowCount: r.tables.reduce((e, t) => e + t.rows.length, 0),
			sourceCounts: i,
			blockItemCount: a.reduce((e, t) => e + t.rows.length, 0),
			blockQuantity: a.reduce((e, t) => t.rows.reduce((e, t) => Ql(e, t.quantity ?? 1), e), 0)
		},
		warnings: o
	};
}
function Cl(e) {
	return {
		sources: new Set(e.sources?.filter((e) => yl.includes(e)) ?? bl),
		textTables: e.textTables ?? "auto",
		recursiveBlocks: e.recursiveBlocks !== !1,
		aggregateBlocks: e.aggregateBlocks !== !1,
		includeInvisible: e.includeInvisible !== !1,
		includePaperSpace: e.includePaperSpace === !0,
		includeAnonymousBlocks: e.includeAnonymousBlocks === !0,
		maxDepth: Tu(e.maxDepth, 16, 1, 128),
		maxEntities: Tu(e.maxEntities, 25e4, 1, 2e6),
		maxRows: Tu(e.maxRows, 1e5, 1, 1e6),
		maxCells: Tu(e.maxCells, 1e6, 1, 5e6),
		minTextTableRows: Tu(e.minTextTableRows, 3, 2, 100),
		minTextTableColumns: Tu(e.minTextTableColumns, 2, 2, 100),
		textRowTolerance: wu(e.textRowTolerance),
		textColumnTolerance: wu(e.textColumnTolerance)
	};
}
function wl(e, t) {
	if (!t || t.rows.length === 0) return;
	t.warnings = Eu(t.warnings);
	let n = e.options.maxRows - e.emittedRows;
	if (n <= 0) El(e, t.source);
	else {
		if (t.rows.length > n) {
			t.rows = t.rows.slice(0, n);
			let r = {
				code: "max-rows",
				source: t.source,
				message: `BOM extraction stopped at the configured ${e.options.maxRows.toLocaleString()} row limit.`
			};
			t.warnings.push(r), e.warnings.push(r), e.stopped = !0;
		}
		t.warnings = Eu(t.warnings), e.emittedRows += t.rows.length, e.tables.push(t);
	}
}
function Tl(e, t = 0) {
	return Math.max(0, e.options.maxRows - e.emittedRows - t);
}
function El(e, t) {
	e.stopped || (e.stopped = !0, e.warnings.push({
		code: "max-rows",
		source: t,
		message: `BOM extraction stopped at the configured ${e.options.maxRows.toLocaleString()} row limit.`
	}));
}
function Dl(e) {
	let t = [], n = /* @__PURE__ */ new Map(), r = Hl(e.document, e.options.includePaperSpace), i = (r, a, o, s) => {
		if (e.stopped || !Gl(r, e.options) || !Kl(e, "block-attributes", r) || r.kind !== "insert" && !/^(INSERT|MINSERT)$/i.test(r.type)) return;
		let c = Cu(r.blockName ?? r.name) || "(unnamed block)", l = Cu(r.effectiveBlockName) || c;
		if (Jl(c) || /^\*/.test(c) && !Yl(c) && !e.options.includeAnonymousBlocks && l === c) return;
		let u = ql(e.document.blocks, c), d = zl(r, u, e.warnings), f = Zl(a, Xl(r.insertRowCount, r.insertColumnCount)), p = Object.fromEntries(Object.keys(d).map((e) => [tu(e), e])), m = {
			blockName: c,
			effectiveName: l,
			attributes: nu(d),
			attributeLabels: p,
			quantity: f,
			layers: new Set(r.layer ? [r.layer] : []),
			handles: new Set(r.handle ? [r.handle] : [])
		};
		if (e.options.aggregateBlocks) {
			let e = ru([l.toLocaleUpperCase(), m.attributes]), t = n.get(e);
			if (t) {
				t.quantity = Zl(t.quantity, f, !0);
				for (let e of m.layers) t.layers.add(e);
				for (let e of m.handles) t.handles.add(e);
			} else n.set(e, m);
		} else t.push(m);
		if (!e.options.recursiveBlocks || !u) {
			e.options.recursiveBlocks && !u && c !== "(unnamed block)" && e.warnings.push({
				code: "missing-block",
				source: "block-attributes",
				blockName: c,
				handle: r.handle,
				message: `Block definition ${c} is missing; the reference is still included.`
			});
			return;
		}
		if (s >= e.options.maxDepth) {
			e.warnings.push({
				code: "max-depth",
				source: "block-attributes",
				blockName: c,
				message: `Stopped recursive block traversal at depth ${e.options.maxDepth}.`
			});
			return;
		}
		let h = u.name.toLocaleUpperCase();
		if (o.includes(h)) e.warnings.push({
			code: "cyclic-block",
			source: "block-attributes",
			blockName: c,
			message: `Skipped cyclic block reference ${[...o, h].join(" → ")}.`
		});
		else for (let e of u.entities) i(e, f, [...o, h], s + 1);
	};
	for (let e of r) i(e, 1, [], 0);
	let a = e.options.aggregateBlocks ? [...n.values()] : t, o = Tl(e), s = a.slice(0, o);
	if (s.length === 0) return;
	let c = /* @__PURE__ */ new Map();
	for (let e of s) for (let [t, n] of Object.entries(e.attributeLabels)) c.has(t) || c.set(t, n);
	let l = [...c.entries()].sort(([e], [t]) => e.localeCompare(t)), u = /* @__PURE__ */ new Set([
		"item",
		"block",
		"quantity",
		"layers"
	]), d = l.map(([e, t]) => ({
		key: au(iu(t), u),
		label: t,
		dataType: "string",
		sourceKey: e
	})), f = [
		{
			key: "item",
			label: "Item",
			dataType: "string"
		},
		{
			key: "block",
			label: "Source block",
			dataType: "string"
		},
		{
			key: "quantity",
			label: "Quantity",
			dataType: "number"
		},
		{
			key: "layers",
			label: "Layers",
			dataType: "string"
		},
		...d
	], p = s.sort((e, t) => e.effectiveName.localeCompare(t.effectiveName, void 0, { numeric: !0 })).map((e, t) => {
		let n = {
			item: e.effectiveName,
			block: e.blockName,
			quantity: e.quantity,
			layers: [...e.layers].sort().join(", ")
		};
		for (let t of d) n[t.key] = e.attributes[t.sourceKey] ?? "";
		return {
			id: `block-${t + 1}`,
			cells: n,
			quantity: e.quantity,
			sourceHandles: [...e.handles],
			blockName: e.blockName,
			effectiveBlockName: e.effectiveName,
			layer: [...e.layers].sort().join(", ")
		};
	}), m = [];
	return s.length < a.length && m.push({
		code: "max-rows",
		source: "block-attributes",
		message: `Block BOM rows were capped at the configured ${e.options.maxRows.toLocaleString()} row limit.`
	}), {
		id: "block-attributes",
		name: "Block attributes",
		source: "block-attributes",
		confidence: 1,
		columns: f,
		rows: p,
		warnings: m
	};
}
function Ol(e) {
	let t = [], n = Ul(e.document, e.options.includePaperSpace), r = 0, i = 0;
	for (let a of n) {
		if (e.stopped) break;
		let n = Tl(e, i);
		if (n <= 0) break;
		if (!Gl(a, e.options) || a.kind !== "table" && !/^(TABLE|ACAD_TABLE|ACDBTABLE)$/i.test(a.type)) continue;
		if (r += 1, !Kl(e, "native-table", a)) break;
		let o = a.table;
		if (!o || o.cells.length === 0) {
			let t = {
				code: "empty-native-table",
				source: "native-table",
				handle: a.handle,
				message: `Native table ${a.handle ?? r} has no cached cells. Modern TABLECONTENT or its external DataLink may not be exposed by the DWG parser.`
			};
			e.warnings.push(t);
			continue;
		}
		let s = [];
		if (o.cells.length > e.options.maxCells) {
			let t = {
				code: "max-cells",
				source: "native-table",
				handle: a.handle,
				message: `Native table cells were capped at ${e.options.maxCells.toLocaleString()} values.`
			};
			s.push(t);
		}
		let c = kl(a, r, e.document.dataLinks ?? [], s, n, e.options.maxCells);
		c.rows.length > 0 && (i += c.rows.length, t.push(c));
	}
	return t;
}
function kl(e, t, n, r, i, a) {
	var o;
	let s = e.table, c = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Set(), u = Math.max(1, Math.min(a, i + 2)), d = 0, f = 0;
	for (let e = 0; e < s.cells.length && e < a; e += 1) {
		let t = s.cells[e];
		if (!su(t.row) || !su(t.column)) {
			d += 1;
			continue;
		}
		if (!c.has(t.row) && c.size >= u) {
			f += 1;
			continue;
		}
		let n = c.get(t.row) ?? /* @__PURE__ */ new Map();
		(!n.has(t.column) || !((o = n.get(t.column)) != null && o.text) && t.text) && n.set(t.column, t), c.set(t.row, n), cu(t) !== "" && l.add(t.column);
	}
	d > 0 && r.push({
		code: "invalid-table-cell",
		source: "native-table",
		handle: e.handle,
		message: `Ignored ${d.toLocaleString()} native table cell${d === 1 ? "" : "s"} with invalid or extreme coordinates.`
	}), f > 0 && r.push({
		code: "max-rows",
		source: "native-table",
		handle: e.handle,
		message: `Native table rows were capped at the configured ${i.toLocaleString()} row limit.`
	});
	let p = [...c.keys()].sort((e, t) => e - t), m = Cu(s.name) || `Native table ${t}`, h = p[0], g = h === void 0 ? void 0 : c.get(h);
	if (g) {
		let e = [...g.values()].filter((e) => cu(e) !== "");
		s.titleSuppressed !== !0 && e.length === 1 && p.length > 1 && (m = cu(e[0]) || m, h = p[1]);
	}
	let _ = Math.max(0, p.indexOf(h)), v = p[_], y = v === void 0 ? void 0 : c.get(v), ee = p.slice(_ + 1), b = s.headerSuppressed !== !0 && !!y && (s.headerSuppressed === !1 || uu(y, ee.map((e) => c.get(e)))), x = b ? ee : p.slice(_), S = x.slice(0, Math.min(i, a)), C = [...l].sort((e, t) => e - t), w = Math.max(1, Math.floor(a / Math.max(1, S.length))), te = C.slice(0, w);
	x.length > S.length && r.push({
		code: "max-rows",
		source: "native-table",
		handle: e.handle,
		message: `Native table rows were capped at the configured ${i.toLocaleString()} row limit.`
	}), te.length < C.length && r.push({
		code: "max-cells",
		source: "native-table",
		handle: e.handle,
		message: `Native table output was capped at ${a.toLocaleString()} cells.`
	});
	let ne = /* @__PURE__ */ new Set(), T = te.map((e, t) => {
		let n = (b ? cu(y?.get(e)) : "") || `Column ${t + 1}`;
		return {
			key: au(iu(n), ne),
			label: n,
			dataType: pu(S.map((t) => lu(c.get(t)?.get(e)))),
			sourceKey: String(e)
		};
	}), E = [];
	for (let n of S) {
		if (E.length >= i) break;
		let r = c.get(n), a = {}, o = !1;
		for (let e of T) {
			let t = lu(r.get(Number(e.sourceKey)));
			a[e.key] = t, t !== "" && (o = !0);
		}
		o && E.push({
			id: `native-${e.handle ?? t}-${n}`,
			cells: a,
			sourceHandles: e.handle ? [e.handle] : void 0
		});
	}
	let re = s.dataLinkHandle ? n.find((e) => Su(e.handle, s.dataLinkHandle)) : void 0;
	return s.dataLinkHandle && !re && r.push({
		code: "external-data-unavailable",
		source: "native-table",
		handle: e.handle,
		message: `Table references DataLink ${s.dataLinkHandle}, but no link metadata or external workbook was embedded. Cached cells are returned without network access.`
	}), {
		id: `native-table-${e.handle ?? t}`,
		name: m,
		source: "native-table",
		confidence: 1,
		columns: T,
		rows: E,
		handle: e.handle,
		dataLink: re,
		warnings: r
	};
}
function Al(e) {
	let t = [], n = 0;
	for (let r = 0; r < (e.document.dataTables?.length ?? 0); r += 1) {
		let i = Tl(e, n);
		if (e.stopped || i <= 0) break;
		let a = jl(e.document.dataTables[r], r, i, e.options.maxCells);
		a.rows.length > 0 && (n += a.rows.length, t.push(a));
	}
	return t;
}
function jl(e, t, n, r) {
	let i = e.columns.slice(0, r), a = 0;
	for (let e of i) a = Math.max(a, e.values.length);
	let o = i.length > 0 ? Math.min(n, r, a) : 0, s = /* @__PURE__ */ new Set(), c = i.map((e, t) => ({
		key: au(iu(e.name || `Column ${t + 1}`), s),
		label: e.name || `Column ${t + 1}`,
		dataType: mu(e.values, o),
		sourceKey: String(t)
	})), l = [];
	for (let n = 0; n < o; n += 1) {
		let r = {}, a = !1;
		for (let e = 0; e < c.length; e += 1) {
			let t = hu(i[e]?.values[n]);
			r[c[e].key] = t, t !== "" && (a = !0);
		}
		a && l.push({
			id: `data-${e.handle ?? t}-${n}`,
			cells: r,
			sourceHandles: e.handle ? [e.handle] : void 0
		});
	}
	let u = [];
	return (i.length < e.columns.length || r < Math.min(n, a)) && u.push({
		code: "max-cells",
		source: "data-table",
		handle: e.handle,
		message: `DataTable columns and values per column were capped at ${r.toLocaleString()} entries.`
	}), o < Math.min(r, a) && u.push({
		code: "max-rows",
		source: "data-table",
		handle: e.handle,
		message: "DataTable rows were capped at the configured BOM row limit."
	}), {
		id: `data-table-${e.handle ?? t + 1}`,
		name: Cu(e.name) || `Data table ${t + 1}`,
		source: "data-table",
		confidence: 1,
		columns: c,
		rows: l,
		handle: e.handle,
		warnings: u
	};
}
function Ml(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of Ul(e.document, e.options.includePaperSpace)) {
		if (e.stopped || !Kl(e, "xdata", n)) break;
		if (Gl(n, e.options)) for (let e = 0; e < (n.xdata?.length ?? 0); e += 1) {
			let r = n.xdata[e];
			if (r.entries.length === 0) continue;
			let i = Cu(r.appName) || "Unscoped XDATA", a = t.get(i) ?? [];
			a.push({
				entity: n,
				group: r,
				sequence: e
			}), t.set(i, a);
		}
	}
	let n = [], r = /* @__PURE__ */ new Set(), i = 0;
	for (let [a, o] of t) {
		let t = Tl(e, i);
		if (t <= 0) break;
		let s = o.slice(0, t), c = s.map(({ group: e }) => Bl(e)), l = [...new Set(c.flatMap((e) => Object.keys(e)))].sort((e, t) => e.localeCompare(t, void 0, { numeric: !0 })), u = /* @__PURE__ */ new Set([
			"entity",
			"type",
			"block",
			"layer"
		]), d = l.map((e) => ({
			key: au(iu(e), u),
			label: e,
			dataType: pu(c.map((t) => t[e] ?? "")),
			sourceKey: e
		})), f = [
			{
				key: "entity",
				label: "Entity",
				dataType: "string"
			},
			{
				key: "type",
				label: "Type",
				dataType: "string"
			},
			{
				key: "block",
				label: "Block",
				dataType: "string"
			},
			{
				key: "layer",
				label: "Layer",
				dataType: "string"
			},
			...d
		], p = ou(`xdata-${iu(a)}`, r), m = s.map(({ entity: e, sequence: t }, n) => {
			let r = {
				entity: e.handle ?? String(n + 1),
				type: e.type,
				block: e.effectiveBlockName ?? e.blockName ?? "",
				layer: e.layer ?? ""
			};
			for (let e of d) r[e.key] = c[n][e.sourceKey] ?? "";
			return {
				id: `${p}-${n}-${t}`,
				cells: r,
				sourceHandles: e.handle ? [e.handle] : void 0
			};
		}), h = [];
		s.length < o.length && h.push({
			code: "max-rows",
			source: "xdata",
			message: "XDATA rows were capped at the configured BOM row limit."
		}), i += m.length, n.push({
			id: p,
			name: a,
			source: "xdata",
			confidence: 1,
			columns: f,
			rows: m,
			warnings: h
		});
	}
	return n;
}
function Nl(e) {
	let t = [], n = 0;
	for (let r = 0; r < (e.document.xrecords?.length ?? 0); r += 1) {
		let i = Tl(e, n);
		if (e.stopped || i <= 0) break;
		let a = e.document.xrecords[r];
		if (a.data.length === 0) continue;
		let o = Math.min(a.data.length, e.options.maxCells, i), s = [];
		e.options.maxCells < Math.min(a.data.length, i) && s.push({
			code: "max-cells",
			source: "xrecord",
			handle: a.handle,
			message: `XRecord groups were capped at ${e.options.maxCells.toLocaleString()} values.`
		}), i < Math.min(a.data.length, e.options.maxCells) && s.push({
			code: "max-rows",
			source: "xrecord",
			handle: a.handle,
			message: "XRecord rows were capped at the configured BOM row limit."
		});
		let c = [];
		for (let e = 0; e < o; e += 1) {
			let t = a.data[e];
			c.push({
				id: `xrecord-${a.handle ?? r}-${e}`,
				cells: {
					index: e + 1,
					code: t.code ?? "",
					value: hu(t.value)
				},
				sourceHandles: a.handle ? [a.handle] : void 0
			});
		}
		let l = a.dictionaryPath?.join(" / ");
		t.push({
			id: `xrecord-${a.handle ?? r + 1}`,
			name: l || a.entryName || `XRecord ${a.handle ?? r + 1}`,
			source: "xrecord",
			confidence: 1,
			columns: [
				{
					key: "index",
					label: "#",
					dataType: "number"
				},
				{
					key: "code",
					label: "Group code",
					dataType: "mixed"
				},
				{
					key: "value",
					label: "Value",
					dataType: "mixed"
				}
			],
			rows: c,
			handle: a.handle,
			warnings: s
		}), n += c.length;
	}
	return t;
}
function Pl(e, t, n = Infinity) {
	let r = 0, i = e.length;
	for (; r < i;) {
		let n = r + i >>> 1;
		e[n].x < t ? r = n + 1 : i = n;
	}
	let a;
	for (let i of [r - 1, r]) {
		if (i < 0 || i >= e.length) continue;
		let r = Math.abs(e[i].x - t);
		r <= n && (!a || r < a.distance) && (a = {
			column: i,
			distance: r
		});
	}
	return a;
}
function Fl(e) {
	let t = /* @__PURE__ */ new Map(), n = 0;
	for (let r of Hl(e.document, e.options.includePaperSpace)) {
		if (e.stopped || !Kl(e, "text-table", r)) break;
		if (!Gl(r, e.options) || !/^(TEXT|MTEXT)$/i.test(r.type)) continue;
		let i = r.insertionPoint ?? r.startPoint, a = _u(r.text);
		if (!i || !a || !yu(r.rotation)) continue;
		if (n >= e.options.maxCells) {
			e.warnings.push({
				code: "max-cells",
				source: "text-table",
				message: `Text-table candidates were capped at ${e.options.maxCells.toLocaleString()} entities.`
			});
			break;
		}
		let o = r.layer ?? "0", s = t.get(o) ?? [];
		s.push({
			entity: r,
			text: a,
			x: i.x,
			y: i.y,
			height: Math.max(1e-9, Math.abs(r.textHeight ?? r.height ?? 1))
		}), t.set(o, s), n += 1;
	}
	let r = [], i = 0, a = 0;
	for (let [n, o] of t) {
		if (Tl(e, a) <= 0) break;
		if (o.length < e.options.minTextTableRows * e.options.minTextTableColumns) continue;
		let t = bu(o.map((e) => e.height)) || 1, s = e.options.textRowTolerance ?? t * .7, c = e.options.textColumnTolerance ?? t * 2.2, l = Il(o, s);
		for (let t of Ll(l, s)) {
			let o = Tl(e, a);
			if (o <= 0) break;
			let s = Rl(t, n, c, e.options, i + 1, o);
			s && (i += 1, a += s.rows.length, r.push(s));
		}
	}
	return r;
}
function Il(e, t) {
	let n = [];
	for (let r of [...e].sort((e, t) => t.y - e.y || e.x - t.x)) {
		let e = n[n.length - 1];
		(!e || Math.abs(e.y - r.y) > t) && (e = {
			y: r.y,
			cells: []
		}, n.push(e));
		let i = e.cells.length;
		e.cells.push(r), e.y = (e.y * i + r.y) / (i + 1);
	}
	return n.map((e) => ({
		...e,
		cells: e.cells.sort((e, t) => e.x - t.x)
	}));
}
function Ll(e, t) {
	if (e.length < 2) return e.length ? [e] : [];
	let n = bu(e.slice(1).map((t, n) => Math.abs(e[n].y - t.y)).filter((e) => e > t)) || t * 2, r = Math.max(t * 5, n * 2.6), i = [[]];
	for (let t = 0; t < e.length; t += 1) t > 0 && Math.abs(e[t - 1].y - e[t].y) > r && i.push([]), i[i.length - 1].push(e[t]);
	return i;
}
function Rl(e, t, n, r, i, a) {
	if (e.length < r.minTextTableRows || a <= 0) return;
	let o = e.slice(0, Math.max(r.minTextTableRows, a + 1)), s = [], c = o.flatMap((e) => e.cells).sort((e, t) => e.x - t.x);
	for (let e of c) {
		let t = s[s.length - 1];
		t && Math.abs(t.x - e.x) <= n ? (t.x = (t.x * t.count + e.x) / (t.count + 1), t.count += 1) : s.push({
			x: e.x,
			count: 1
		});
	}
	let l = s.filter((e) => e.count >= Math.max(2, Math.ceil(o.length * .45)));
	if (l.length < r.minTextTableColumns) return;
	let u = o.map((e) => {
		let t = /* @__PURE__ */ new Map();
		for (let r of e.cells) {
			let e = Pl(l, r.x, n * 1.5);
			if (!e) continue;
			let i = t.get(e.column) ?? [];
			i.push(r), t.set(e.column, i);
		}
		return t;
	}), d = u.reduce((e, t) => e + t.size, 0) / Math.max(1, o.length * l.length), f = o.flatMap((e) => e.cells.map((e) => Pl(l, e.x)?.distance ?? n)), p = 1 - Math.min(1, (bu(f) || 0) / Math.max(n, 1e-9)), m = l.map((e, t) => vu(u[0].get(t))), h = du(m, u.slice(1).flatMap((e) => l.map((t, n) => vu(e.get(n))))), g = bu(u.map((e) => e.size)) || l.length, _ = 1 - Math.min(1, bu(u.map((e) => Math.abs(e.size - g))) / Math.max(1, l.length)), v = xu(d * .42 + p * .28 + _ * .15 + h * .15);
	if (v < (r.textTables === !0 ? .48 : .82)) return;
	let y = h >= .56 && o.length > r.minTextTableRows, ee = /* @__PURE__ */ new Set(), b = l.map((e, t) => {
		let n = y && m[t] || `Column ${t + 1}`, r = u.slice(+!!y).map((e) => gu(vu(e.get(t))));
		return {
			key: au(iu(n), ee),
			label: n,
			dataType: pu(r),
			sourceKey: String(t)
		};
	}), x = u.slice(+!!y), S = [];
	for (let e = 0; e < x.length && !(S.length >= a); e += 1) {
		let t = x[e], n = {}, r = /* @__PURE__ */ new Set(), a = !1;
		for (let e of b) {
			let i = t.get(Number(e.sourceKey)), o = gu(vu(i));
			n[e.key] = o, o !== "" && (a = !0);
			for (let e of i ?? []) e.entity.handle && r.add(e.entity.handle);
		}
		a && S.push({
			id: `text-${i}-${e}`,
			cells: n,
			sourceHandles: [...r]
		});
	}
	let C = [];
	return v < .82 && C.push({
		code: "low-confidence-text-table",
		source: "text-table",
		message: `Text table reconstruction confidence is ${Math.round(v * 100)}%; verify column alignment before using it as a manufacturing BOM.`
	}), (S.length < x.length || o.length < e.length) && C.push({
		code: "max-rows",
		source: "text-table",
		message: "Text table rows were capped at the configured BOM row limit."
	}), {
		id: `text-table-${i}`,
		name: t === "0" ? `Text table ${i}` : `${t} text table`,
		source: "text-table",
		confidence: v,
		columns: b,
		rows: S,
		warnings: C
	};
}
function zl(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i = (t, i) => {
		let a = Cu(t.attributeTag);
		if (!a) return;
		let o = tu(a), s = Cu(t.text ?? t.value), c = r.get(o);
		c != null && c.instance && i && c.handle && c.handle !== t.handle && n.push({
			code: "duplicate-attribute",
			source: "block-attributes",
			blockName: e.blockName,
			handle: e.handle,
			message: `Duplicate attribute tag ${a} on block ${e.blockName ?? e.name ?? "(unnamed)"}. The last instance value is used.`
		}), (!c || i || s) && r.set(o, {
			label: c?.label ?? a,
			value: s,
			handle: t.handle,
			instance: i
		});
	};
	for (let e of t?.entities ?? []) /^ATTDEF$/i.test(e.type) && i(e, !1);
	let a = /* @__PURE__ */ new Set();
	for (let t of e.attribs ?? []) t.handle && a.has(t.handle) || (t.handle && a.add(t.handle), i(t, !0));
	return Object.fromEntries([...r.values()].map(({ label: e, value: t }) => [e, t]));
}
function Bl(e) {
	let t = {}, n = (e, r) => {
		if (e === null || typeof e == "string" || typeof e == "number" || typeof e == "boolean") Vl(t, r, e);
		else if (Array.isArray(e)) e.forEach((e, t) => n(e, `${r}.${t + 1}`));
		else for (let [t, i] of Object.entries(e)) n(i, `${r}.${t}`);
	};
	return e.entries.forEach((e, t) => {
		let r = Cu(e.name) || (e.code === void 0 ? `Value ${t + 1}` : String(e.code));
		n(e.value, r);
	}), t;
}
function Vl(e, t, n) {
	let r = t, i = 2;
	for (; r in e;) r = `${t} ${i++}`;
	e[r] = n;
}
function Hl(e, t) {
	let n = [...e.entities];
	if (t) for (let t of e.pages ?? []) n.push(...t.entities);
	return Wl(n);
}
function Ul(e, t) {
	let n = Hl(e, t), r = /* @__PURE__ */ new Set();
	for (let t of Object.values(e.blocks)) r.has(t) || (r.add(t), n.push(...t.entities));
	return Wl(n);
}
function Wl(e) {
	let t = [], n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set();
	for (let i of e) {
		if (r.has(i)) continue;
		r.add(i);
		let e = Cu(i.handle);
		e && n.has(e.toLocaleUpperCase()) || (e && n.add(e.toLocaleUpperCase()), t.push(i));
	}
	return t;
}
function Gl(e, t) {
	return !(!t.includeInvisible && e.isVisible === !1 || !t.includePaperSpace && e.isInPaperSpace === !0);
}
function Kl(e, t, n) {
	return e.seenEntities.has(n) || (e.seenEntities.add(n), e.visitedEntities += 1, e.visitedEntities <= e.options.maxEntities) ? !0 : (e.warnings.some((e) => e.code === "max-entities") || e.warnings.push({
		code: "max-entities",
		source: t,
		message: `BOM traversal stopped at ${e.options.maxEntities.toLocaleString()} unique entities.`
	}), e.stopped = !0, !1);
}
function ql(e, t) {
	return e[t] ?? e[t.toLocaleLowerCase()] ?? Object.values(e).find((e) => e.name.localeCompare(t, void 0, { sensitivity: "accent" }) === 0);
}
function Jl(e) {
	return /^\*?(MODEL|PAPER)_SPACE(?:\d+)?$/i.test(e) || /^\$(MODEL|PAPER)_SPACE/i.test(e);
}
function Yl(e) {
	return /^\*U/i.test(e);
}
function Xl(e, t) {
	return Zl($l(e), $l(t));
}
function Zl(e, t, n = !1) {
	let r = $l(e), i = $l(t);
	return n ? Ql(r, i) : r > (2 ** 53 - 1) / i ? 2 ** 53 - 1 : r * i;
}
function Ql(e, t) {
	let n = eu(e), r = eu(t);
	return n > 2 ** 53 - 1 - r ? 2 ** 53 - 1 : n + r;
}
function $l(e) {
	return Number.isFinite(e) ? Math.max(1, Math.min(2 ** 53 - 1, Math.trunc(e))) : e === Infinity ? 2 ** 53 - 1 : 1;
}
function eu(e) {
	return Number.isFinite(e) ? Math.max(0, Math.min(2 ** 53 - 1, Math.trunc(e))) : e === Infinity ? 2 ** 53 - 1 : 0;
}
function tu(e) {
	return e.trim().toLocaleUpperCase();
}
function nu(e) {
	return Object.fromEntries(Object.entries(e).map(([e, t]) => [tu(e), t.trim()]).sort(([e], [t]) => e.localeCompare(t)));
}
function ru(e) {
	return typeof e != "object" || !e ? JSON.stringify(e) : Array.isArray(e) ? `[${e.map(ru).join(",")}]` : `{${Object.entries(e).sort(([e], [t]) => e.localeCompare(t)).map(([e, t]) => `${JSON.stringify(e)}:${ru(t)}`).join(",")}}`;
}
function iu(e) {
	return e.trim().toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, "_").replace(/^_+|_+$/g, "") || "column";
}
function au(e, t) {
	let n = e, r = 2;
	for (; t.has(n);) n = `${e}_${r++}`;
	return t.add(n), n;
}
function ou(e, t) {
	let n = e, r = 2;
	for (; t.has(n);) n = `${e}-${r++}`;
	return t.add(n), n;
}
function su(e) {
	return Number.isSafeInteger(e) && e >= 0 && e <= xl;
}
function cu(e) {
	return e ? Cu(e.text) || Cu(hu(e.value)) : "";
}
function lu(e) {
	if (!e) return "";
	let t = hu(e.value);
	return t === "" ? gu(e.text) : t;
}
function uu(e, t) {
	let n = [...e.values()].map(cu).filter(Boolean);
	if (n.length < 2 || new Set(n.map((e) => e.toLocaleUpperCase())).size !== n.length) return !1;
	let r = n.filter((e) => typeof gu(e) == "string").length / n.length, i = t.slice(0, 12).flatMap((e) => [...e.values()].map(lu)).filter((e) => e !== ""), a = i.filter((e) => typeof e == "number" || typeof e == "boolean").length / Math.max(1, i.length);
	return r >= .8 && (a >= .15 || n.some(fu));
}
function du(e, t) {
	let n = e.filter((e) => e !== "");
	if (n.length < 2) return 0;
	let r = new Set(n.map((e) => String(e).toLocaleUpperCase())).size / n.length, i = n.filter((e) => typeof e == "string").length / n.length, a = n.filter((e) => fu(String(e))).length / n.length, o = t.filter((e) => e !== "" && (typeof e == "number" || typeof e == "boolean")).length / Math.max(1, t.filter((e) => e !== "").length);
	return Math.min(1, r * .25 + i * .25 + a * .3 + o * .2);
}
function fu(e) {
	return /^(item|part|part\s*no|number|no\.?|name|description|material|qty|quantity|count|unit|规格|型号|名称|材料|数量|序号|代号|图号)$/i.test(e.trim());
}
function pu(e) {
	let t = new Set(e.filter((e) => e !== "" && e !== null).map((e) => typeof e));
	return t.size === 0 || t.size === 1 && t.has("string") ? "string" : t.size === 1 && t.has("number") ? "number" : t.size === 1 && t.has("boolean") ? "boolean" : "mixed";
}
function mu(e, t) {
	let n = /* @__PURE__ */ new Set(), r = Math.min(e.length, t);
	for (let t = 0; t < r; t += 1) {
		let r = hu(e[t]);
		if (r !== "" && r !== null && n.add(typeof r), n.size > 1) return "mixed";
	}
	return n.size === 0 || n.has("string") ? "string" : n.has("number") ? "number" : n.has("boolean") ? "boolean" : "mixed";
}
function hu(e) {
	if (e == null) return e ?? "";
	if (typeof e == "string" || typeof e == "number" || typeof e == "boolean") return e;
	try {
		return JSON.stringify(e);
	} catch {
		return String(e);
	}
}
function gu(e) {
	let t = Cu(e);
	if (!t) return "";
	if (/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(t)) {
		let e = Number(t);
		if (Number.isFinite(e)) return e;
	}
	return /^(true|false)$/i.test(t) ? t.toLocaleLowerCase() === "true" : t;
}
function _u(e) {
	return Cu(e).replace(/\\P/gi, " ").replace(/\{\\[^;{}]+;([^{}]*)\}/g, "$1").replace(/%%[dpc]/gi, " ").replace(/\s+/g, " ").trim();
}
function vu(e) {
	return (e ?? []).sort((e, t) => e.x - t.x).map((e) => e.text).join(" ").trim();
}
function yu(e) {
	if (!Number.isFinite(e)) return !0;
	let t = Math.abs(Number(e) % Math.PI);
	return Math.min(t, Math.abs(Math.PI - t)) <= .06;
}
function bu(e) {
	let t = e.filter(Number.isFinite).sort((e, t) => e - t);
	if (t.length === 0) return 0;
	let n = Math.floor(t.length / 2);
	return t.length % 2 ? t[n] : (t[n - 1] + t[n]) / 2;
}
function xu(e) {
	return Math.round(Math.max(0, Math.min(1, e)) * 1e3) / 1e3;
}
function Su(e, t) {
	return !!e && !!t && e.trim().toLocaleUpperCase() === t.trim().toLocaleUpperCase();
}
function Cu(e) {
	return typeof e == "string" || typeof e == "number" ? String(e).trim() : "";
}
function wu(e) {
	let t = Number(e);
	return Number.isFinite(t) && t > 0 ? t : void 0;
}
function Tu(e, t, n, r) {
	let i = Number(e);
	return Number.isFinite(i) ? Math.max(n, Math.min(r, Math.trunc(i))) : t;
}
function Eu(e) {
	let t = [], n = /* @__PURE__ */ new Set();
	for (let r of e) {
		let e = [
			r.code,
			r.source ?? "",
			r.handle ?? "",
			r.blockName ?? "",
			r.message
		].join("\0");
		n.has(e) || (n.add(e), t.push(r));
	}
	return t;
}
var Du = "cadColorMode", Ou = "cadMonochromeColor";
function ku(e, t = {}) {
	let n = t.mode ?? "source", r = Au(e), i = ju(t.monochromeColor);
	if (r.mode === n && r.monochromeColor === i) return e;
	let a = { ...e.metadata };
	return n === "monochrome" ? (a[Du] = n, i ? a[Ou] = i : delete a[Ou]) : (delete a[Du], delete a[Ou]), {
		...e,
		metadata: a
	};
}
function Au(e) {
	let t = e?.metadata, n = t?.[Du] === "monochrome" ? "monochrome" : "source", r = ju(t?.[Ou]);
	return r ? {
		mode: n,
		monochromeColor: r
	} : { mode: n };
}
function ju(e) {
	return typeof e == "string" && e.trim() || void 0;
}
var Mu = class {
	static byteToSByte(e) {
		return (e & 127) - (e & 128 ? 128 : 0);
	}
	constructor(e) {
		this.position = 0, this.data = new DataView(e);
	}
	readBytes(e = 1) {
		this.data.byteLength < this.position + e && this.throwOutOfRangeError(this.position + e);
		let t = new Uint8Array(this.data.buffer, this.position, e);
		return this.position += e, t;
	}
	skip(e) {
		this.data.byteLength < this.position + e && this.throwOutOfRangeError(this.position + e), this.position += e;
	}
	readUint8() {
		this.data.byteLength < this.position + 1 && this.throwOutOfRangeError(this.position + 1);
		let e = this.data.getUint8(this.position);
		return this.position += 1, e;
	}
	readInt8() {
		this.data.byteLength < this.position + 1 && this.throwOutOfRangeError(this.position + 1);
		let e = this.data.getInt8(this.position);
		return this.position += 1, e;
	}
	readUint16(e = !0) {
		this.data.byteLength < this.position + 2 && this.throwOutOfRangeError(this.position + 2);
		let t = this.data.getUint16(this.position, e);
		return this.position += 2, t;
	}
	readInt16() {
		this.data.byteLength < this.position + 2 && this.throwOutOfRangeError(this.position + 2);
		let e = this.data.getInt16(this.position, !0);
		return this.position += 2, e;
	}
	readUint32() {
		this.data.byteLength < this.position + 4 && this.throwOutOfRangeError(this.position + 4);
		let e = this.data.getUint32(this.position, !0);
		return this.position += 4, e;
	}
	readInt32() {
		this.data.byteLength < this.position + 4 && this.throwOutOfRangeError(this.position + 4);
		let e = this.data.getInt32(this.position, !0);
		return this.position += 4, e;
	}
	readFloat32() {
		this.data.byteLength < this.position + 4 && this.throwOutOfRangeError(this.position + 4);
		let e = this.data.getFloat32(this.position, !0);
		return this.position += 4, e;
	}
	readFloat64() {
		this.data.byteLength < this.position + 8 && this.throwOutOfRangeError(this.position + 8);
		let e = this.data.getFloat64(this.position, !0);
		return this.position += 8, e;
	}
	setPosition(e) {
		this.data.byteLength < e && this.throwOutOfRangeError(e), this.position = e;
	}
	isEnd() {
		return this.position === this.data.byteLength - 1;
	}
	get currentPosition() {
		return this.position;
	}
	get length() {
		return this.data.byteLength;
	}
	throwOutOfRangeError(e) {
		throw Error(`Position ${e} is out of range for the data length ${this.data.byteLength}!`);
	}
}, X = /* @__PURE__ */ ((e) => (e.SHAPES = "shapes", e.BIGFONT = "bigfont", e.UNIFONT = "unifont", e))(X || {}), Nu = class {
	parse(e) {
		let t = this.parseHeader(e).split(" "), n = t[1].toLocaleLowerCase();
		if (!Object.values(X).includes(n)) throw Error(`Invalid font type: ${n}`);
		return {
			fileHeader: t[0],
			fontType: n,
			fileVersion: t[2]
		};
	}
	parseHeader(e) {
		let t = "", n = 0;
		for (; e.currentPosition < e.length - 2 && n < 1024;) {
			let r = e.readUint8();
			if (r === 13) {
				let n = e.currentPosition, i = e.readUint8(), a = e.readUint8();
				if (i === 10 && a === 26) break;
				e.setPosition(n), t += String.fromCharCode(r);
			} else t += String.fromCharCode(r);
			n++;
		}
		return t.trim();
	}
}, Pu = 10, Fu = [
	13,
	10,
	0
];
function Iu(e, t) {
	t === 0 ? e.orientation = "horizontal" : t === 2 ? (e.orientation = "horizontal", e.dualOrientation = !0) : e.orientation = "vertical";
}
function Lu(e) {
	let t = {};
	for (let [n, r] of Object.entries(e)) t[r] = n;
	return t;
}
function Ru(e) {
	let t = e.indexOf(0);
	return t < 0 ? {
		name: null,
		bytecode: e
	} : {
		name: t > 0 ? new TextDecoder("ascii").decode(e.subarray(0, t)) : null,
		bytecode: e.subarray(t + 1)
	};
}
var zu = class {
	parse(e) {
		try {
			e.readBytes(4);
			let t = e.readInt16();
			if (t <= 0) throw Error("Invalid shape count in font file");
			let n = [];
			for (let r = 0; r < t; r++) {
				let t = e.readUint16(), r = e.readUint16();
				r > 0 && n.push({
					code: t,
					length: r
				});
			}
			let r = {};
			for (let t of n) try {
				let n = e.readBytes(t.length);
				n.length === t.length && (r[t.code] = n);
			} catch {
				console.warn(`Failed to read shape data for code ${t.code}`);
			}
			let i = {}, a = {};
			for (let [e, t] of Object.entries(r)) {
				let n = Number(e);
				if (n === 0) {
					i[n] = t;
					continue;
				}
				let { name: r, bytecode: o } = Ru(t);
				i[n] = o, r && (a[r] = n);
			}
			let o = {
				data: i,
				names: Object.keys(a).length > 0 ? a : void 0,
				codeToName: Object.keys(a).length > 0 ? Lu(a) : void 0,
				info: "",
				baseUp: 8,
				baseDown: 2,
				height: Pu,
				width: Pu,
				orientation: "horizontal",
				isExtended: !1
			};
			if (0 in i) {
				let e = i[0];
				try {
					let t = new TextDecoder().decode(e), n = e.findIndex((e) => Fu.includes(e));
					n >= 0 && (o.info = t.substring(0, n), n + 3 < e.length && (o.baseUp = e[n + 1], o.baseDown = e[n + 2], o.height = o.baseDown + o.baseUp, o.width = o.height, Iu(o, e[n + 3])));
				} catch {
					console.warn("Failed to parse font info block");
				}
			}
			return o;
		} catch (e) {
			let t = e instanceof Error ? e.message : String(e);
			throw Error(`Failed to parse shape font: ${t}`);
		}
	}
}, Bu = class {
	parse(e) {
		try {
			e.readInt16();
			let t = e.readInt16(), n = e.readInt16();
			if (t <= 0) throw Error("Invalid character count in font file");
			e.skip(n * 4);
			let r = [];
			for (let n = 0; n < t; n++) {
				let t = e.readUint16(), n = e.readUint16(), i = e.readUint32();
				(t !== 0 || n !== 0 || i !== 0) && r.push({
					code: t,
					length: n,
					offset: i
				});
			}
			let i = {};
			for (let t of r) try {
				e.setPosition(t.offset);
				let n = e.readBytes(t.length);
				n.length === t.length && (i[t.code] = n);
			} catch {
				console.warn(`Failed to read bigfont data for code ${t.code}`);
			}
			let a = {
				data: i,
				info: "",
				baseUp: 8,
				baseDown: 2,
				height: Pu,
				width: Pu,
				orientation: "horizontal",
				isExtended: !1
			};
			if (0 in i) {
				let e = i[0];
				try {
					let t = this.utf8ArrayToStr(e);
					if (t.pos >= 0) {
						let n = t.text;
						for (; n.length > 0 && n.charCodeAt(n.length - 1) === 0;) n = n.slice(0, -1);
						a.info = n;
						let r = this.parseBigfontMetrics(e, t.pos + 1);
						r && Object.assign(a, r);
					}
				} catch {
					console.warn("Failed to parse bigfont info block");
				}
			}
			return a;
		} catch (e) {
			let t = e instanceof Error ? e.message : String(e);
			throw Error(`Failed to parse big font: ${t}`);
		}
	}
	parseBigfontMetrics(e, t) {
		let n = t;
		for (; n < e.length && e[n] === 0;) n++;
		let r = e.length - n;
		if (r <= 0) return null;
		let i = (e) => e === 0 ? "horizontal" : "vertical";
		if (r >= 5) {
			let t = e[n++];
			n++;
			let r = i(e[n++]);
			return {
				baseUp: t,
				baseDown: 0,
				height: t,
				width: e[n++],
				orientation: r,
				isExtended: !0
			};
		}
		if (r === 4 && e[n + 1] === 0 && e[n + 3] > 0 && e[n + 3] !== e[n]) {
			let t = e[n++];
			n++;
			let r = i(e[n++]);
			return {
				baseUp: t,
				baseDown: 0,
				height: t,
				width: e[n],
				orientation: r,
				isExtended: !0
			};
		}
		if (r === 4) {
			let t = e[n++], r = e[n++], a = i(e[n++]);
			return {
				baseUp: t,
				baseDown: r,
				height: t + r,
				width: t + r,
				orientation: a,
				isExtended: !1
			};
		}
		if (r === 3) {
			let t = e[n++], r = e[n++], a = i(r), o = r === 2;
			return {
				baseUp: t,
				baseDown: 0,
				height: t,
				width: t,
				orientation: a,
				isExtended: o,
				verticalDualMode: o
			};
		}
		return null;
	}
	utf8ArrayToStr(e) {
		let t = "", n = 0;
		for (; n < e.length;) {
			let r = e[n];
			switch (r >> 4) {
				case 0:
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
				case 7:
					t += String.fromCharCode(r);
					break;
				case 12:
				case 13: {
					let i = e[n++];
					t += String.fromCharCode((r & 31) << 6 | i & 63);
					break;
				}
				case 14: {
					let i = e[n++], a = e[n++];
					t += String.fromCharCode((r & 15) << 12 | (i & 63) << 6 | a & 63);
					break;
				}
			}
			if (t.charCodeAt(t.length - 1) === 0) break;
			n++;
		}
		return {
			text: t,
			pos: n
		};
	}
}, Vu = class {
	parse(e) {
		try {
			let t = e.readInt32();
			if (t <= 0) throw Error("Invalid character count in font file");
			let n = e.readInt16(), r = e.readBytes(n), i = {
				data: {},
				info: "",
				baseUp: 8,
				baseDown: 2,
				height: Pu,
				width: Pu,
				orientation: "horizontal",
				isExtended: !1
			};
			try {
				let e = new TextDecoder().decode(r), t = e.indexOf("\0");
				t >= 0 && (i.info = e.substring(0, t), t + 3 < r.length && (i.baseUp = r[t + 1], i.baseDown = r[t + 2], i.height = i.baseUp + i.baseDown, i.width = i.height, Iu(i, r[t + 3])));
			} catch {
				console.warn("Failed to parse unifont info block");
			}
			let a = {}, o = {};
			for (let n = 0; n < t - 1; n++) try {
				let t = e.readUint16(), n = e.readUint16();
				if (n > 0) {
					let r = e.readBytes(n);
					if (r.length === n) {
						let { name: e, bytecode: n } = Ru(r);
						n.length > 0 && (a[t] = n, e && (o[e] = t));
					}
				}
			} catch {
				console.warn("Failed to read unifont character data");
				break;
			}
			return i.data = a, i.names = Object.keys(o).length > 0 ? o : void 0, i.codeToName = Object.keys(o).length > 0 ? Lu(o) : void 0, i;
		} catch (e) {
			let t = e instanceof Error ? e.message : String(e);
			throw Error(`Failed to parse unifont: ${t}`);
		}
	}
}, Hu = class {
	static createParser(e) {
		switch (e) {
			case X.SHAPES: return new zu();
			case X.BIGFONT: return new Bu();
			case X.UNIFONT: return new Vu();
			default: throw Error(`Unsupported font type: ${e}`);
		}
	}
}, Uu = .2, Wu = class {
	markAlignedAdvanceExplicit(e) {
		return !1;
	}
}, Gu = new class e extends Wu {
	constructor(e = Uu) {
		super(), this.cellWidthFactor = e;
	}
	static isCenterOriginGlyph(e) {
		return e.bbox.minX < -1e-6;
	}
	static computeAdvance(t, n, r = Uu) {
		if (!t.polylines.some((e) => e.length >= 2)) return n * r;
		let i = n * r, { maxX: a } = t.bbox;
		return e.isCenterOriginGlyph(t) ? Math.max(a, n / 2) + i : a + i;
	}
	resolve(t, n) {
		return t.hasExplicitAdvance ? t.lastPoint?.x ?? 0 : e.computeAdvance(t, n, this.cellWidthFactor);
	}
	markAlignedAdvanceExplicit(e) {
		return !0;
	}
}(), Z = class e {
	constructor(e = 0, t = 0) {
		this.x = e, this.y = t;
	}
	set(e, t) {
		return this.x = e, this.y = t, this;
	}
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	normalize() {
		let e = this.length();
		return e !== 0 && (this.x /= e, this.y /= e), this;
	}
	clone() {
		return new e(this.x, this.y);
	}
	add(e) {
		return this.x += e.x, this.y += e.y, this;
	}
	subtract(e) {
		return this.x -= e.x, this.y -= e.y, this;
	}
	multiply(e) {
		return this.x *= e, this.y *= e, this;
	}
	divide(e) {
		return e !== 0 && (this.x /= e, this.y /= e), this;
	}
	multiplyScalars(e, t) {
		return this.x *= e, this.y *= t, this;
	}
	divideScalars(e, t) {
		return e !== 0 && (this.x /= e), t !== 0 && (this.y /= t), this;
	}
	distanceTo(e) {
		let t = this.x - e.x, n = this.y - e.y;
		return Math.sqrt(t * t + n * n);
	}
};
function Ku(e) {
	let { width: t, capHeight: n, descenderHeight: r, origin: i = "baseline" } = e, a = n + r;
	return i === "top" ? {
		minX: -t / 2,
		maxX: t / 2,
		minY: -a,
		maxY: 0
	} : {
		minX: 0,
		maxX: t,
		minY: -r,
		maxY: n
	};
}
function qu(e) {
	return [
		e.minX,
		e.minY,
		e.maxX,
		e.maxY
	].every(Number.isFinite);
}
function Ju(e, t, n = 1e-6) {
	return t.minX >= e.minX - n && t.maxX <= e.maxX + n && t.minY >= e.minY - n && t.maxY <= e.maxY + n;
}
function Yu(e, t) {
	return {
		minX: Math.min(e.minX, t.minX),
		minY: Math.min(e.minY, t.minY),
		maxX: Math.max(e.maxX, t.maxX),
		maxY: Math.max(e.maxY, t.maxY)
	};
}
function Xu(e, t, n) {
	let r = e.maxX - e.minX, i = e.maxY - e.minY;
	return `<rect x="${e.minX}" y="${-e.maxY}" width="${r}" height="${i}" fill="none" stroke="${t}" stroke-width="${n}"/>`;
}
function Zu(e, t) {
	let n = e.maxX - e.minX, r = e.maxY - e.minY;
	return `<rect x="${e.minX}" y="${-e.maxY}" width="${n}" height="${r}" fill="${t}"/>`;
}
function Qu(e, t, n, r, i, a, o) {
	let s = ` stroke-dasharray="${o}"`;
	return `<line x1="${e}" y1="${-t}" x2="${n}" y2="${-r}" stroke="${i}" stroke-width="${a}"${s}/>`;
}
function $u(e, t, n) {
	let { capHeight: r, descenderHeight: i, origin: a = "baseline" } = e, o = r + i, s = Ku(e), c, l, u;
	a === "top" ? (r > 0 && (c = {
		minX: s.minX,
		maxX: s.maxX,
		minY: -r,
		maxY: 0
	}), i > 0 && (l = {
		minX: s.minX,
		maxX: s.maxX,
		minY: -o,
		maxY: -r
	}), u = -r) : (r > 0 && (c = {
		minX: s.minX,
		maxX: s.maxX,
		minY: 0,
		maxY: r
	}), i > 0 && (l = {
		minX: s.minX,
		maxX: s.maxX,
		minY: -i,
		maxY: 0
	}), u = 0);
	let d = [
		c ? Zu(c, "rgba(255, 0, 0, 0.06)") : "",
		l ? Zu(l, "rgba(255, 0, 0, 0.14)") : "",
		Xu(s, t, n)
	];
	return u !== void 0 && i > 0 && r > 0 && d.push(Qu(s.minX, u, s.maxX, u, t, n, "4 2")), `<g>${d.join("")}</g>`;
}
var ed = class e {
	constructor(e, t = [], n = !1) {
		this.lastPoint = e, this.polylines = t, this.hasExplicitAdvance = n;
	}
	get bbox() {
		if (this._bbox) return this._bbox;
		let e = 1 / 0, t = -1 / 0, n = 1 / 0, r = -1 / 0;
		return this.polylines.forEach((i) => {
			i.forEach((i) => {
				e = Math.min(e, i.x), t = Math.max(t, i.x), n = Math.min(n, i.y), r = Math.max(r, i.y);
			});
		}), this._bbox = {
			minX: e,
			minY: n,
			maxX: t,
			maxY: r
		}, this._bbox;
	}
	offset(t, n = !0) {
		var r;
		return n ? new e(this.lastPoint?.clone().add(t), this.polylines.map((e) => e.map((e) => e.clone().add(t))), this.hasExplicitAdvance) : ((r = this.lastPoint) == null || r.add(t), this.polylines.forEach((e) => e.forEach((e) => e.add(t))), this._bbox && (this._bbox.maxX += t.x, this._bbox.minX += t.x, this._bbox.maxY += t.y, this._bbox.minY += t.y), this);
	}
	normalizeToOrigin(e = !1) {
		let t = this.bbox;
		return this.offset(new Z(-t.minX, -t.minY), e);
	}
	toSVG(e = {}) {
		let { strokeWidth: t = "0.5%", strokeColor: n = "black", isAutoFit: r = !1, fontCell: i } = e, a, o, s = (e) => this.polylines.map((r) => {
			let i = "";
			return r.forEach((t, n) => {
				let { x: r, y: a } = e(t);
				i += n === 0 ? `M ${r} ${a} ` : `L ${r} ${a} `;
			}), `<path d="${i}" stroke="${n}" stroke-width="${t}" fill="none"/>`;
		}).join("");
		if (i) {
			let { padding: e = .1, expandToFit: t = !1, showFrame: n = !1, frameColor: r = "red", frameStrokeWidth: c = "0.5%" } = i, l = Ku(i), u = this.bbox, d = l;
			t && qu(u) && !Ju(l, u) && (d = Yu(l, u));
			let f = d.maxX - d.minX, p = d.maxY - d.minY, m = f * e, h = p * e, g = d.minX - m, _ = d.maxX + m, v = d.minY - h, y = d.maxY + h;
			o = s((e) => ({
				x: e.x,
				y: -e.y
			}));
			let ee = n ? $u(i, r, c) : "";
			return a = `${g} ${-y} ${_ - g} ${y - v}`, `<svg width="100%" height="100%" viewBox="${a}" preserveAspectRatio="xMidYMid meet">${ee}${o}</svg>`;
		}
		if (r) {
			let e = this.bbox, t = .2, n = e.maxX - e.minX, r = e.maxY - e.minY, i = n === 0 ? r : n, c = r === 0 ? n : r, l = e.minX - i * t, u = e.maxX + i * t, d = e.minY - c * t, f = e.maxY + c * t;
			o = s((e) => ({
				x: e.x,
				y: -e.y
			})), a = `${l} ${-f} ${u - l} ${f - d}`;
		} else a = "0 0 20 20", o = s((e) => ({
			x: e.x + 5,
			y: -e.y + 15
		}));
		return `<svg width="100%" height="100%" viewBox="${a}" preserveAspectRatio="xMidYMid meet">${o}</svg>`;
	}
}, td = 8, nd = 48, rd = .4, id = [
	52164,
	45795,
	49829,
	50150,
	54992,
	47610,
	54754,
	46532,
	51906,
	53947,
	49332,
	51706,
	46532,
	54224,
	52946,
	52714,
	52219,
	45755,
	51403,
	46532,
	53947,
	50410,
	49332,
	52219,
	52141,
	46532,
	50150,
	51120,
	50150,
	54992,
	51663,
	50119,
	53186,
	46532,
	46525,
	51365,
	52149,
	47016,
	46532,
	51889,
	51706,
	46025,
	47037,
	55031,
	48122,
	50935,
	47531,
	48122,
	51965,
	55e3
];
function ad(e, t) {
	let { height: n, width: r, baseUp: i, baseDown: a } = e, o = n > 0 ? t / n : 1, s = o * i, c = o * a;
	return {
		size: t,
		capHeight: s,
		descenderHeight: c,
		cellWidth: o * r,
		totalHeight: s + c
	};
}
function od(e, t, n) {
	if (e.header.fontType !== X.SHAPES || !(0 in e.content.data)) return !1;
	let r = -(n.descenderHeight + n.capHeight * .2);
	return t.bbox.minY < r;
}
function sd(e, t) {
	let n = -(t.descenderHeight + t.capHeight * .05);
	return !(e.bbox.minY < n || e.bbox.maxY - e.bbox.minY < t.capHeight * .05);
}
function cd(e, t, n) {
	if (e.header.fontType !== X.BIGFONT || e.content.baseDown > 0) return 0;
	let { height: r } = e.content;
	if (r <= 0) return 0;
	let i = r * rd, a = [], o = /* @__PURE__ */ new Set(), s = (n) => {
		if (o.has(n) || n <= 255 || !(n in e.content.data)) return;
		o.add(n);
		let r = t(n);
		if (!r) return;
		let s = r.bbox.minY;
		s > 0 && s <= i && a.push(s);
	};
	for (let e of id) if (s(e), a.length >= nd) break;
	if (a.length < td) {
		for (let t of Object.keys(e.content.data)) if (s(Number(t)), a.length >= nd) break;
	}
	if (a.length < td) return 0;
	a.sort((e, t) => e - t);
	let c = Math.floor(a.length / 2);
	return a.length % 2 == 0 ? (a[c - 1] + a[c]) / 2 : a[c];
}
function ld(e, t, n) {
	if (e.header.fontType !== X.UNIFONT) return !1;
	if (e.content.dualOrientation) return !0;
	let r = ad(e.content, n);
	for (let n of [
		48,
		65,
		78,
		49
	]) {
		if (!(n in e.content.data)) continue;
		let i = t(n);
		if (i && sd(i, r)) return !0;
	}
	return !1;
}
function ud(e, t, n, r = Gu, i = !1, a = 0) {
	let o = e;
	if (t.header.fontType === X.BIGFONT && a > 0) {
		let e = t.content.height > 0 ? n.size / t.content.height : 1;
		o = o.offset(new Z(0, -a * e), !0);
	}
	if (t.header.fontType === X.UNIFONT || od(t, e, n)) {
		let r = t.header.fontType === X.UNIFONT && (i || t.content.dualOrientation || sd(e, n));
		t.header.fontType === X.UNIFONT && r || (o = o.offset(new Z(0, n.capHeight), !0));
	}
	let s = r.resolve(o, n.cellWidth), c = r.markAlignedAdvanceExplicit(o) ? !0 : o.hasExplicitAdvance;
	return new ed(new Z(s, o.lastPoint?.y ?? 0), o.polylines, c);
}
function dd(e, t, n, r = Gu, i = !1, a = 0) {
	return ud(e, t, ad(t.content, n), r, i, a);
}
var fd = Math.PI / 4, pd = class e {
	static fromBulge(t, n, r) {
		return new e({
			start: t,
			end: n,
			bulge: Math.max(-1, Math.min(1, r))
		});
	}
	static fromOctant(t, n, r, i, a) {
		return new e({
			center: t,
			radius: n,
			startOctant: r,
			octantCount: i,
			isClockwise: a
		});
	}
	constructor(e) {
		if (e.start && e.end && e.bulge !== void 0) {
			this.start = e.start.clone(), this.end = e.end.clone(), this.bulge = e.bulge, this.isClockwise = e.bulge < 0;
			let t = this.end.clone().subtract(this.start), n = t.length();
			if (Math.abs(this.bulge) * n / 2 == 0) {
				this.radius = 0, this.center = this.start.clone(), this.startAngle = Math.atan2(t.y, t.x), this.endAngle = this.startAngle;
				return;
			}
			let r = 4 * Math.atan(Math.abs(this.bulge));
			this.radius = n / (2 * Math.sin(r / 2));
			let i = this.start.clone().add(t.clone().divide(2)), a = new Z(-t.y, t.x);
			a.normalize(), a.multiply(Math.abs(this.radius * Math.cos(r / 2))), this.center = i.clone(), this.isClockwise ? this.center.subtract(a) : this.center.add(a), this.startAngle = Math.atan2(this.start.y - this.center.y, this.start.x - this.center.x), this.endAngle = Math.atan2(this.end.y - this.center.y, this.end.x - this.center.x), this.isClockwise ? this.endAngle >= this.startAngle && (this.endAngle -= 2 * Math.PI) : this.endAngle <= this.startAngle && (this.endAngle += 2 * Math.PI);
		} else if (e.center && e.radius !== void 0 && e.startOctant !== void 0 && e.octantCount !== void 0 && e.isClockwise !== void 0) {
			this.center = e.center.clone(), this.radius = e.radius, this.isClockwise = e.isClockwise, this.startAngle = e.startOctant * fd;
			let t = (e.octantCount === 0 ? 8 : e.octantCount) * fd;
			this.endAngle = this.startAngle + (this.isClockwise ? -t : t), this.start = this.center.clone().add(new Z(this.radius * Math.cos(this.startAngle), this.radius * Math.sin(this.startAngle))), this.end = this.center.clone().add(new Z(this.radius * Math.cos(this.endAngle), this.radius * Math.sin(this.endAngle)));
		} else throw Error("Invalid arc parameters");
	}
	tessellate(e = Math.PI / 18) {
		if (this.radius === 0) return [this.start.clone(), this.end.clone()];
		let t = [this.start.clone()], n = Math.abs(this.endAngle - this.startAngle), r = Math.max(1, Math.floor(n / e));
		for (let e = 1; e < r; e++) {
			let i = e / r, a = this.isClockwise ? this.startAngle - i * n : this.startAngle + i * n;
			t.push(this.center.clone().add(new Z(this.radius * Math.cos(a), this.radius * Math.sin(a))));
		}
		return t.push(this.end ? this.end.clone() : this.center.clone().add(new Z(this.radius * Math.cos(this.endAngle), this.radius * Math.sin(this.endAngle)))), t;
	}
}, md = Math.PI / 18, hd = 1e-6, gd = class {
	constructor(e) {
		this.shapeCache = /* @__PURE__ */ new Map(), this.subshapeCache = /* @__PURE__ */ new Map(), this.shapeData = /* @__PURE__ */ new Map(), this.fontData = e;
	}
	release() {
		this.shapeCache.clear(), this.subshapeCache.clear(), this.shapeData.clear();
	}
	getCharShape(e, t) {
		let n = this.fontData.header.fontType === X.SHAPES && !(0 in this.fontData.content.data) ? t : t / this.fontData.content.height;
		return this.parseAndScale(e, { factor: n });
	}
	parseAndScale(e, t) {
		if (e === 0) return;
		let n;
		if (this.shapeCache.has(e)) n = this.shapeCache.get(e);
		else {
			let t = this.fontData.content.data;
			if (t[e]) {
				let r = this.prepareBigfontGlyphBytecode(e, t[e]), i = this.fontData.header.fontType !== X.BIGFONT;
				n = this.parseShape(r, {
					flushOnEnd: !0,
					initialPenDown: i
				}), this.shapeData.set(e, n), this.shapeCache.set(e, n);
			}
		}
		if (n) {
			if (t.factor !== void 0) return this.scaleShapeByFactor(n, t.factor);
			if (t.height !== void 0) {
				let e = t.width ?? t.height;
				return this.scaleShapeByHeightAndWidth(n, t.height, e);
			}
			return n;
		}
	}
	prepareBigfontGlyphBytecode(e, t) {
		if (this.fontData.header.fontType !== X.BIGFONT || e <= 255) return t;
		let n = e >> 8 & 255, r = e & 255;
		if (t.length >= 2 && t[0] === n && t[1] === r) {
			let e = 2;
			return t[e] === 0 && e++, t.slice(e);
		}
		return t;
	}
	isVerticalDualBigfontMarker(e, t, n) {
		return this.fontData.content.verticalDualMode ? n === "open" ? e[t] === 142 : e[t] === 143 : !1;
	}
	scaleShapeByFactor(e, t) {
		return new ed(e.lastPoint?.clone().multiply(t), e.polylines.map((e) => e.map((e) => e.clone().multiply(t))), e.hasExplicitAdvance);
	}
	scaleShapeByHeightAndWidth(e, t, n) {
		let r = e.bbox, i = r.maxY - r.minY, a = r.maxX - r.minX, o = i > 0 ? t / i : 1, s = a > 0 ? n / a : 1, c = e.lastPoint?.clone();
		return c && (c.x *= s, c.y *= o), new ed(c, e.polylines.map((e) => e.map((e) => {
			let t = e.clone();
			return t.x *= s, t.y *= o, t;
		})), e.hasExplicitAdvance);
	}
	shouldSkipVerticalFlagCommand(e = !1) {
		let { content: t, header: n } = this.fontData;
		return n.fontType === X.BIGFONT ? !t.verticalDualMode : t.dualOrientation ? !e : t.orientation === "horizontal";
	}
	markAdvanceDefined(e) {
		e.hasExplicitAdvance = !0;
	}
	notePenUpPositioning(e) {
		e.pendingTerminalAdvance = !0;
	}
	clearPendingAdvance(e) {
		e.pendingTerminalAdvance = !1;
	}
	stateHasInk(e) {
		return e.currentPolyline.length > 1 || e.polylines.some((e) => e.length >= 2);
	}
	finalizeAdvanceFlag(e) {
		if (!e.pendingTerminalAdvance) return;
		let t = e.currentPoint.x;
		Math.abs(t) > hd ? e.hasExplicitAdvance = !0 : this.stateHasInk(e) || (e.hasExplicitAdvance = !0);
	}
	parseShape(e, t = {}) {
		let n = new Z(), r = [], i = [], a = [], o = t.initialPenDown ?? !1;
		o && i.push(n.clone());
		let s = {
			currentPoint: n,
			polylines: r,
			currentPolyline: i,
			sp: a,
			isPenDown: o,
			scale: 1,
			flushEndPolyline: t.flushOnEnd ?? !1,
			hasExplicitAdvance: !1,
			pendingTerminalAdvance: !1
		};
		for (let t = 0; t < e.length; t++) {
			let n = e[t];
			n <= 15 ? t = this.handleSpecialCommand(n, e, t, s) : (this.clearPendingAdvance(s), this.handleVectorCommand(n, s));
		}
		return this.finalizeAdvanceFlag(s), this.buildShapeFromState(s);
	}
	buildShapeFromState(e) {
		let t = e.polylines.map((e) => e.map((e) => e.clone()));
		return e.currentPolyline.length > 1 && t.push(e.currentPolyline.map((e) => e.clone())), new ed(e.currentPoint.clone(), t, e.hasExplicitAdvance);
	}
	handleSpecialCommand(e, t, n, r) {
		let i = n;
		switch (e) {
			case 0:
				this.finalizeAdvanceFlag(r), r.flushEndPolyline && r.currentPolyline.length > 1 ? (r.polylines.push(r.currentPolyline.slice()), r.currentPolyline = []) : r.flushEndPolyline && (r.currentPolyline = []), r.isPenDown = !1;
				break;
			case 1:
				this.clearPendingAdvance(r), r.isPenDown || r.currentPolyline.push(r.currentPoint.clone()), r.isPenDown = !0;
				break;
			case 2:
				r.isPenDown = !1, r.currentPolyline.length > 1 && r.polylines.push(r.currentPolyline.slice()), r.currentPolyline = [];
				break;
			case 3:
				this.clearPendingAdvance(r), i++, r.scale /= t[i];
				break;
			case 4:
				this.clearPendingAdvance(r), i++, r.scale *= t[i];
				break;
			case 5:
				if (this.clearPendingAdvance(r), r.sp.length === 4) throw Error("The position stack is only four locations deep");
				r.sp.push(r.currentPoint.clone());
				break;
			case 6:
				this.clearPendingAdvance(r), r.currentPoint = r.sp.pop() ?? r.currentPoint, r.currentPolyline.length > 1 && (r.polylines.push(r.currentPolyline.slice()), r.currentPolyline = []), r.isPenDown && r.currentPolyline.push(r.currentPoint.clone());
				break;
			case 7:
				this.clearPendingAdvance(r), i = this.handleSubshapeCommand(t, i, r);
				break;
			case 8:
				i = this.handleXYDisplacement(t, i, r);
				break;
			case 9:
				i = this.handleMultipleXYDisplacements(t, i, r);
				break;
			case 10:
				this.clearPendingAdvance(r), i = this.handleOctantArc(t, i, r);
				break;
			case 11:
				this.clearPendingAdvance(r), i = this.handleFractionalArc(t, i, r);
				break;
			case 12:
				this.clearPendingAdvance(r), i = this.handleBulgeArc(t, i, r);
				break;
			case 13:
				this.clearPendingAdvance(r), i = this.handleMultipleBulgeArcs(t, i, r);
				break;
			case 14: this.clearPendingAdvance(r), this.shouldSkipVerticalFlagCommand() && (i = this.skipCode(t, ++i));
		}
		return i;
	}
	handleVectorCommand(e, t) {
		let n = (e & 240) >> 4, r = e & 15, i = this.getVectorForDirection(r);
		t.currentPoint.add(i.multiply(n * t.scale)), t.isPenDown && t.currentPolyline.push(t.currentPoint.clone());
	}
	getVectorForDirection(e) {
		let t = new Z();
		switch (e) {
			case 0:
				t.x = 1;
				break;
			case 1:
				t.x = 1, t.y = .5;
				break;
			case 2:
				t.x = 1, t.y = 1;
				break;
			case 3:
				t.x = .5, t.y = 1;
				break;
			case 4:
				t.y = 1;
				break;
			case 5:
				t.x = -.5, t.y = 1;
				break;
			case 6:
				t.x = -1, t.y = 1;
				break;
			case 7:
				t.x = -1, t.y = .5;
				break;
			case 8:
				t.x = -1;
				break;
			case 9:
				t.x = -1, t.y = -.5;
				break;
			case 10:
				t.x = -1, t.y = -1;
				break;
			case 11:
				t.x = -.5, t.y = -1;
				break;
			case 12:
				t.y = -1;
				break;
			case 13:
				t.x = .5, t.y = -1;
				break;
			case 14:
				t.x = 1, t.y = -1;
				break;
			case 15: t.x = 1, t.y = -.5;
		}
		return t;
	}
	handleSubshapeCommand(e, t, n) {
		let r = t, i = 0, a, o = n.scale * this.fontData.content.baseUp, s = o, c = n.currentPoint.clone();
		switch (n.currentPolyline.length > 1 && (n.polylines.push(n.currentPolyline.slice()), n.currentPolyline = []), this.fontData.header.fontType) {
			case X.SHAPES:
				r++, i = e[r];
				break;
			case X.BIGFONT:
				if (r++, this.isVerticalDualBigfontMarker(e, r, "open")) return r;
				if (this.isVerticalDualBigfontMarker(e, r, "close")) return r + 1;
				i = e[r], i === 0 && (r++, i = e[r++] << 8 | e[r++], c.x = Mu.byteToSByte(e[r++]) * n.scale, c.y = Mu.byteToSByte(e[r++]) * n.scale, this.fontData.content.isExtended ? (s = e[r++] * n.scale, o = e[r] * n.scale) : (o = e[r] * n.scale, s = o));
				break;
			case X.UNIFONT: r++, i = e[r++] << 8 | e[r++], r--;
		}
		if (i !== 0) {
			if (this.fontData.header.fontType === X.UNIFONT) {
				let e = n.isPenDown;
				a = this.getScaledSubshapeAtInsertPoint(i, s, o, c, e), a != null && a.polylines.some((e) => e.length >= 2) && (n.polylines.push(...a.polylines.slice()), a.lastPoint && (n.currentPoint = a.lastPoint.clone()), n.currentPolyline = [], n.isPenDown && n.currentPolyline.push(n.currentPoint.clone()));
			} else if (this.fontData.header.fontType === X.SHAPES) a = this.getScaledSubshapeAtInsertPoint(i, s, o, c), a && (n.polylines.push(...a.polylines.slice()), a.lastPoint && (n.currentPoint = a.lastPoint.clone(), a.hasExplicitAdvance && this.markAdvanceDefined(n))), n.currentPolyline = [], n.isPenDown && n.currentPolyline.push(n.currentPoint.clone());
			else {
				if (a = this.getScaledSubshapeAtInsertPoint(i, s, o, c), a && (n.polylines.push(...a.polylines.slice()), i === 2 && a.lastPoint)) {
					let e = a.lastPoint.x - c.x;
					e > n.currentPoint.x && (n.currentPoint.x = e), this.markAdvanceDefined(n);
				}
				n.currentPolyline = [];
			}
		}
		return r;
	}
	handleXYDisplacement(e, t, n) {
		let r = t, i = new Z();
		return i.x = Mu.byteToSByte(e[++r]), i.y = Mu.byteToSByte(e[++r]), n.currentPoint.add(i.multiply(n.scale)), n.isPenDown ? n.currentPolyline.push(n.currentPoint.clone()) : this.notePenUpPositioning(n), r;
	}
	handleMultipleXYDisplacements(e, t, n) {
		let r = t;
		for (; !(r + 1 >= e.length);) {
			let t = new Z();
			if (t.x = Mu.byteToSByte(e[++r]), t.y = Mu.byteToSByte(e[++r]), t.x === 0 && t.y === 0) break;
			n.currentPoint.add(t.multiply(n.scale)), n.isPenDown ? n.currentPolyline.push(n.currentPoint.clone()) : this.notePenUpPositioning(n);
		}
		return r;
	}
	handleOctantArc(e, t, n) {
		let r = t, i = e[++r] * n.scale, a = Mu.byteToSByte(e[++r]), o = (a & 112) >> 4, s = a & 7, c = a < 0, l = Math.PI / 4 * o, u = n.currentPoint.clone().subtract(new Z(Math.cos(l) * i, Math.sin(l) * i)), d = pd.fromOctant(u, i, o, s, c).tessellate();
		return n.isPenDown && (n.currentPolyline.pop(), n.currentPolyline.push(...d.slice())), n.currentPoint = d[d.length - 1].clone(), r;
	}
	handleFractionalArc(e, t, n) {
		let r = t, i = e[++r], a = e[++r], o = e[++r], s = e[++r], c = (o * 255 + s) * n.scale, l = Mu.byteToSByte(e[++r]), u = (l & 112) >> 4, d = l & 7;
		d === 0 && (d = 8), a !== 0 && d--;
		let f = Math.PI / 4, p = f * d, m = md, h = 1;
		l < 0 && (m = -m, p = -p, h = -1);
		let g = f * u, _ = g + p;
		g += f * i / 256 * h, _ += f * a / 256 * h;
		let v = n.currentPoint.clone().subtract(new Z(c * Math.cos(g), c * Math.sin(g)));
		if (n.currentPoint = v.clone().add(new Z(c * Math.cos(_), c * Math.sin(_))), n.isPenDown) {
			let e = g, t = [];
			if (t.push(v.clone().add(new Z(c * Math.cos(e), c * Math.sin(e)))), m > 0) for (; e + m < _;) e += m, t.push(v.clone().add(new Z(c * Math.cos(e), c * Math.sin(e))));
			else for (; e + m > _;) e += m, t.push(v.clone().add(new Z(c * Math.cos(e), c * Math.sin(e))));
			t.push(v.clone().add(new Z(c * Math.cos(_), c * Math.sin(_)))), n.currentPolyline.push(...t);
		}
		return r;
	}
	handleBulgeArc(e, t, n) {
		let r = t, i = new Z();
		i.x = Mu.byteToSByte(e[++r]), i.y = Mu.byteToSByte(e[++r]);
		let a = Mu.byteToSByte(e[++r]);
		return n.currentPoint = this.handleArcSegment(n.currentPoint, i, a, n.scale, n.isPenDown, n.currentPolyline), r;
	}
	handleMultipleBulgeArcs(e, t, n) {
		let r = t;
		for (; !(r + 1 >= e.length);) {
			let t = new Z();
			if (t.x = Mu.byteToSByte(e[++r]), t.y = Mu.byteToSByte(e[++r]), t.x === 0 && t.y === 0 || r + 1 >= e.length) break;
			let i = Mu.byteToSByte(e[++r]);
			n.currentPoint = this.handleArcSegment(n.currentPoint, t, i, n.scale, n.isPenDown, n.currentPolyline);
		}
		return r;
	}
	skipCode(e, t) {
		switch (e[t]) {
			case 0: break;
			case 1: break;
			case 2: break;
			case 3:
			case 4:
				t++;
				break;
			case 5: break;
			case 6: break;
			case 7:
				switch (this.fontData.header.fontType) {
					case X.SHAPES:
						t++;
						break;
					case X.BIGFONT:
						t++, this.isVerticalDualBigfontMarker(e, t, "open") ? t++ : this.isVerticalDualBigfontMarker(e, t, "close") ? t += 2 : e[t] === 0 && (t += this.fontData.content.isExtended ? 6 : 5);
						break;
					case X.UNIFONT: t += 2;
				}
				break;
			case 8:
				t += 2;
				break;
			case 9:
				for (; t++, !(t >= e.length);) {
					let n = e[t];
					if (t++, t >= e.length) break;
					let r = e[t];
					if (n === 0 && r === 0) break;
				}
				break;
			case 10:
				t += 2;
				break;
			case 11:
				t += 5;
				break;
			case 12:
				t += 3;
				break;
			case 13: for (; t++, !(t >= e.length);) {
				let n = e[t];
				if (t++, t >= e.length) break;
				let r = e[t];
				if (n === 0 && r === 0) break;
				t++;
			}
		}
		return t;
	}
	getScaledSubshapeAtInsertPoint(e, t, n, r, i = !1) {
		let a;
		if (i) {
			let t = this.fontData.content.data[e];
			if (!t) return;
			a = this.parseShape(t, {
				initialPenDown: !0,
				flushOnEnd: !0
			});
		} else if (a = this.subshapeCache.get(e), !a) {
			let t = this.fontData.content.data[e];
			if (!t) return;
			let n = this.fontData.header.fontType !== X.BIGFONT;
			a = this.parseShape(t, {
				flushOnEnd: !1,
				initialPenDown: n
			}), this.shapeData.set(e, a), this.subshapeCache.set(e, a);
		}
		let o = this.fontData.header.fontType === X.BIGFONT ? void 0 : n / this.fontData.content.baseUp, s = a.polylines.some((e) => e.length > 0);
		return (o === void 0 ? this.scaleShapeByHeightAndWidth(s ? a.normalizeToOrigin(!0) : a, n, t) : this.scaleShapeByFactor(a, o)).offset(r, !1);
	}
	handleArcSegment(e, t, n, r, i, a) {
		t.x *= r, t.y *= r, n < -127 && (n = -127);
		let o = e.clone();
		if (i) {
			if (n === 0) a.push(o.clone().add(t));
			else {
				let e = o.clone().add(t), r = pd.fromBulge(o, e, n / 127).tessellate();
				a.push(...r.slice(1));
			}
		}
		return o.add(t), o;
	}
}, _d = class {
	constructor(e) {
		if (e instanceof ArrayBuffer) {
			let t = new Mu(e), n = new Nu().parse(t), r = Hu.createParser(n.fontType).parse(t);
			this.fontData = {
				header: n,
				content: r
			};
		} else this.fontData = e;
		this.shapeParser = new gd(this.fontData);
	}
	hasChar(e) {
		return this.fontData.content.data[e] !== void 0;
	}
	hasShape(e) {
		return this.getShapeCode(e) !== void 0;
	}
	getShapeCode(e) {
		let t = this.fontData.content.names;
		if (t) return t[e.toUpperCase()];
	}
	getShapeName(e) {
		let t = this.fontData.content.codeToName?.[e];
		if (t !== void 0) return t;
		let n = this.fontData.content.names;
		if (n) {
			for (let [t, r] of Object.entries(n)) if (r === e) return t;
		}
	}
	getFontMetrics(e) {
		return ad(this.fontData.content, e);
	}
	getLayoutCharShape(e, t, n = Gu) {
		let r = this.getCharShape(e, t);
		if (r) return dd(r, this.fontData, t, n, this.usesUnifontBaselineOriginFont(t), this.getBigfontBaselineInkPaddingNative());
	}
	getBigfontBaselineInkPaddingNative() {
		if (this.bigfontBaselineInkPaddingNative === void 0) {
			let e = this.fontData.content.height;
			this.bigfontBaselineInkPaddingNative = cd(this.fontData, (t) => this.getCharShape(t, e));
		}
		return this.bigfontBaselineInkPaddingNative;
	}
	usesUnifontBaselineOriginFont(e) {
		return this.unifontBaselineOriginFont === void 0 && (this.unifontBaselineOriginFont = ld(this.fontData, (t) => this.getCharShape(t, e), e)), this.unifontBaselineOriginFont;
	}
	getShapeByName(e, t) {
		let n = this.getShapeCode(e);
		if (n !== void 0) return this.getCharShape(n, t);
	}
	getCharShape(e, t) {
		return this.shapeParser.getCharShape(e, t);
	}
	release() {
		this.shapeParser.release();
	}
};
function vd(e, t, n, r = Gu) {
	let i = ad(t.content, n);
	return r.resolve(e, i.cellWidth);
}
function yd(e, t, n = 0) {
	return e.offset(new Z(t, n), !0);
}
function bd(e, t = 0, n = {}) {
	let r = n.advance ?? Gu, i = 0, a = [];
	for (let { font: n, code: o, size: s } of e) {
		let e = n.getLayoutCharShape(o, s, r);
		e && (a.push({
			shape: yd(e, i, t),
			x: i
		}), i += vd(e, n.fontData, s, r));
	}
	return a;
}
var xd = Object.freeze({
	resolveShape: () => {},
	resolveText: () => {}
}), Sd = "Complex SHX linetype glyphs", Cd = class {
	constructor() {
		L(this, "fonts", /* @__PURE__ */ new Map()), L(this, "requirements", []);
	}
	async add(e) {
		let t = Td(e.fileName ?? e.file?.name);
		if (!t) throw Error("A fileName is required when adding an SHX reference buffer.");
		if (!/\.shx$/i.test(t)) throw Error(`${t} is not an SHX reference file.`);
		if (!e.file && !e.buffer) throw Error(`No file content was provided for ${t}.`);
		let n = e.file ? new Uint8Array(await e.file.arrayBuffer()) : kd(e.buffer);
		if (n.byteLength === 0) throw Error(`${t} is empty.`);
		let r;
		try {
			r = new _d(Ad(n));
		} catch (e) {
			let n = e instanceof Error ? e.message : String(e);
			throw Error(`Unable to parse SHX reference ${t}: ${n}`);
		}
		let i = Ed(t), a = this.fonts.get(i), o = {
			kind: "shx",
			fileName: t,
			bytes: n.byteLength,
			fontType: r.fontData.header.fontType,
			glyphCount: Object.keys(r.fontData.content.data).length
		};
		return this.fonts.set(i, {
			key: i,
			font: r,
			info: o,
			shapeCache: /* @__PURE__ */ new Map(),
			textCache: /* @__PURE__ */ new Map()
		}), a?.font.release(), { ...o };
	}
	setDocument(e) {
		if (!e) {
			this.requirements = [];
			return;
		}
		let t = /* @__PURE__ */ new Map(), n = (e) => {
			let n = Td(e), r = n ? Ed(n) : "*", i = t.get(r);
			return i || (i = {
				fileName: n || void 0,
				shapeNumbers: /* @__PURE__ */ new Set(),
				texts: /* @__PURE__ */ new Set()
			}, t.set(r, i)), i;
		};
		for (let t of new Set(Object.values(e.lineTypes ?? {}))) for (let e of t.pattern) {
			let t = Number(e.elementTypeFlag ?? 0);
			if (t === 0) continue;
			let r = n(e.fontName), i = Math.trunc(Number(e.shapeNumber));
			(t & 4) == 4 && Number.isFinite(i) && r.shapeNumbers.add(i), (t & 2) == 2 && e.text && r.texts.add(e.text);
		}
		let r = Array.isArray(e.metadata.requiredShxFonts) ? e.metadata.requiredShxFonts : [];
		for (let e of r) n(String(e));
		let i = t.get("*"), a = [...t.entries()].filter(([e]) => e !== "*");
		if (i && a.length === 1) {
			let e = a[0][1];
			for (let t of i.shapeNumbers) e.shapeNumbers.add(t);
			for (let t of i.texts) e.texts.add(t);
			t.delete("*");
		}
		this.requirements = [...t.values()];
	}
	has(e) {
		return this.fonts.has(Ed(e));
	}
	remove(e) {
		let t = Ed(e), n = this.fonts.get(t);
		return n ? (n.font.release(), this.fonts.delete(t), !0) : !1;
	}
	clear() {
		for (let e of this.fonts.values()) e.font.release();
		this.fonts.clear();
	}
	getState() {
		let e = [];
		for (let t of this.requirements) if (t.fileName) {
			let n = this.fonts.get(Ed(t.fileName));
			n ? Od(n.font, t) || e.push({
				kind: "shx",
				fileName: t.fileName,
				identified: !0,
				reason: "incompatible"
			}) : e.push({
				kind: "shx",
				fileName: t.fileName,
				identified: !0,
				reason: "not-loaded"
			});
		} else [...this.fonts.values()].some((e) => Od(e.font, t)) || e.push({
			kind: "shx",
			fileName: "External SHX font",
			identified: !1,
			reason: this.fonts.size ? "incompatible" : "not-loaded"
		});
		return {
			missing: e,
			loaded: [...this.fonts.values()].map(({ info: e }) => ({ ...e })).sort((e, t) => e.fileName.localeCompare(t.fileName))
		};
	}
	resolveShape(e, t) {
		let n = Math.trunc(Number(e));
		if (!Number.isFinite(n) || n < 0) return;
		let r = this.resolveFont(t, (e) => e.hasChar(n));
		if (!r) return;
		let i = r.shapeCache.get(n);
		if (i !== void 0) return i ?? void 0;
		let a;
		try {
			let e = r.font.getCharShape(n, 1);
			a = e ? Dd(e.polylines) : void 0;
		} catch {
			a = void 0;
		}
		return r.shapeCache.set(n, a ?? null), a;
	}
	resolveText(e, t) {
		if (!e) return;
		let n = Array.from(e, (e) => e.codePointAt(0) ?? 0), r = this.resolveFont(t, (e) => n.every((t) => e.hasChar(t)));
		if (!r) return;
		let i = r.textCache.get(e);
		if (i !== void 0) return i ?? void 0;
		let a;
		try {
			a = Dd(bd(n.map((e) => ({
				font: r.font,
				code: e,
				size: 1
			}))).flatMap(({ shape: e }) => e.polylines));
		} catch {
			a = void 0;
		}
		return r.textCache.set(e, a ?? null), a;
	}
	resolveFont(e, t) {
		if (e) {
			let n = this.fonts.get(Ed(e));
			return n && t(n.font) ? n : void 0;
		}
		let n = this.requirements.map(({ fileName: e }) => e ? this.fonts.get(Ed(e)) : void 0).filter((e) => e !== void 0 && t(e.font));
		if (n.length === 1) return n[0];
		let r = [...this.fonts.values()].filter((e) => t(e.font));
		return r.length === 1 ? r[0] : void 0;
	}
};
function wd(e, t) {
	let n = Array.isArray(e.metadata.requiredShxFonts) ? e.metadata.requiredShxFonts.map(String) : [];
	e.metadata.missingReferences = t.missing.map((e) => ({ ...e })), e.metadata.loadedReferences = t.loaded.map((e) => ({ ...e })), e.metadata.loadedShxFonts = n.filter((e) => t.loaded.some((t) => Ed(t.fileName) === Ed(e)));
	for (let t = e.warnings.length - 1; t >= 0; t--) e.warnings[t].startsWith(Sd) && e.warnings.splice(t, 1);
	if (t.missing.length === 0) return;
	let r = t.missing.map(({ fileName: e, reason: t }) => t === "incompatible" ? `${e} (missing required glyphs)` : e);
	e.warnings.push(`${Sd} are using a dash/dot fallback until the missing reference${r.length === 1 ? " is" : "s are"} supplied: ${r.join(", ")}.`);
}
function Td(e) {
	return String(e ?? "").trim().split(/[\\/]/).filter(Boolean).pop() ?? "";
}
function Ed(e) {
	return Td(e).toLocaleLowerCase("en-US");
}
function Dd(e) {
	let t = e.map((e) => e.filter((e) => Number.isFinite(e.x) && Number.isFinite(e.y)).map((e) => ({
		x: e.x,
		y: e.y
	}))).filter((e) => e.length >= 2);
	return t.length > 0 ? { polylines: t } : void 0;
}
function Od(e, t) {
	for (let n of t.shapeNumbers) if (!e.hasChar(n)) return !1;
	for (let n of t.texts) for (let t of n) if (!e.hasChar(t.codePointAt(0) ?? 0)) return !1;
	return !0;
}
function kd(e) {
	return e instanceof Uint8Array ? e.slice() : new Uint8Array(e.slice(0));
}
function Ad(e) {
	return e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength);
}
function jd(e) {
	let t = e;
	return t.nativeRenderer === !0 && typeof t.mount == "function";
}
var Md = {
	1: "#ff0000",
	2: "#ffff00",
	3: "#00ff00",
	4: "#00ffff",
	5: "#0000ff",
	6: "#ff00ff",
	8: "#808080",
	9: "#c0c0c0",
	10: "#ff0000",
	11: "#ff7f7f",
	12: "#a50000",
	13: "#a55252",
	14: "#7f0000",
	15: "#7f3f3f",
	16: "#4c0000",
	17: "#4c2626",
	18: "#260000",
	19: "#261313",
	20: "#ff3f00",
	21: "#ff9f7f",
	22: "#a52900",
	23: "#a56752",
	24: "#7f1f00",
	25: "#7f4f3f",
	26: "#4c1300",
	27: "#4c2f26",
	28: "#260900",
	29: "#261713",
	30: "#ff7f00",
	31: "#ffbf7f",
	32: "#a55200",
	33: "#a57c52",
	34: "#7f3f00",
	35: "#7f5f3f",
	36: "#4c2600",
	37: "#4c3926",
	38: "#261300",
	39: "#261c13",
	40: "#ffbf00",
	41: "#ffdf7f",
	42: "#a57c00",
	43: "#a59152",
	44: "#7f5f00",
	45: "#7f6f3f",
	46: "#4c3900",
	47: "#4c4226",
	48: "#261c00",
	49: "#262113",
	50: "#ffff00",
	51: "#ffff7f",
	52: "#a5a500",
	53: "#a5a552",
	54: "#7f7f00",
	55: "#7f7f3f",
	56: "#4c4c00",
	57: "#4c4c26",
	58: "#262600",
	59: "#262613",
	60: "#bfff00",
	61: "#dfff7f",
	62: "#7ca500",
	63: "#91a552",
	64: "#5f7f00",
	65: "#6f7f3f",
	66: "#394c00",
	67: "#424c26",
	68: "#1c2600",
	69: "#212613",
	70: "#7fff00",
	71: "#bfff7f",
	72: "#52a500",
	73: "#7ca552",
	74: "#3f7f00",
	75: "#5f7f3f",
	76: "#264c00",
	77: "#394c26",
	78: "#132600",
	79: "#1c2613",
	80: "#3fff00",
	81: "#9fff7f",
	82: "#29a500",
	83: "#67a552",
	84: "#1f7f00",
	85: "#4f7f3f",
	86: "#134c00",
	87: "#2f4c26",
	88: "#092600",
	89: "#172613",
	90: "#00ff00",
	91: "#7fff7f",
	92: "#00a500",
	93: "#52a552",
	94: "#007f00",
	95: "#3f7f3f",
	96: "#004c00",
	97: "#264c26",
	98: "#002600",
	99: "#132613",
	100: "#00ff3f",
	101: "#7fff9f",
	102: "#00a529",
	103: "#52a567",
	104: "#007f1f",
	105: "#3f7f4f",
	106: "#004c13",
	107: "#264c2f",
	108: "#002609",
	109: "#132617",
	110: "#00ff7f",
	111: "#7fffbf",
	112: "#00a552",
	113: "#52a57c",
	114: "#007f3f",
	115: "#3f7f5f",
	116: "#004c26",
	117: "#264c39",
	118: "#002613",
	119: "#13261c",
	120: "#00ffbf",
	121: "#7fffdf",
	122: "#00a57c",
	123: "#52a591",
	124: "#007f5f",
	125: "#3f7f6f",
	126: "#004c39",
	127: "#264c42",
	128: "#00261c",
	129: "#132621",
	130: "#00ffff",
	131: "#7fffff",
	132: "#00a5a5",
	133: "#52a5a5",
	134: "#007f7f",
	135: "#3f7f7f",
	136: "#004c4c",
	137: "#264c4c",
	138: "#002626",
	139: "#132626",
	140: "#00bfff",
	141: "#7fdfff",
	142: "#007ca5",
	143: "#5291a5",
	144: "#005f7f",
	145: "#3f6f7f",
	146: "#00394c",
	147: "#26424c",
	148: "#001c26",
	149: "#132126",
	150: "#007fff",
	151: "#7fbfff",
	152: "#0052a5",
	153: "#527ca5",
	154: "#003f7f",
	155: "#3f5f7f",
	156: "#00264c",
	157: "#26394c",
	158: "#001326",
	159: "#131c26",
	160: "#003fff",
	161: "#7f9fff",
	162: "#0029a5",
	163: "#5267a5",
	164: "#001f7f",
	165: "#3f4f7f",
	166: "#00134c",
	167: "#262f4c",
	168: "#000926",
	169: "#131726",
	170: "#0000ff",
	171: "#7f7fff",
	172: "#0000a5",
	173: "#5252a5",
	174: "#00007f",
	175: "#3f3f7f",
	176: "#00004c",
	177: "#26264c",
	178: "#000026",
	179: "#131326",
	180: "#3f00ff",
	181: "#9f7fff",
	182: "#2900a5",
	183: "#6752a5",
	184: "#1f007f",
	185: "#4f3f7f",
	186: "#13004c",
	187: "#2f264c",
	188: "#090026",
	189: "#171326",
	190: "#7f00ff",
	191: "#bf7fff",
	192: "#5200a5",
	193: "#7c52a5",
	194: "#3f007f",
	195: "#5f3f7f",
	196: "#26004c",
	197: "#39264c",
	198: "#130026",
	199: "#1c1326",
	200: "#bf00ff",
	201: "#df7fff",
	202: "#7c00a5",
	203: "#9152a5",
	204: "#5f007f",
	205: "#6f3f7f",
	206: "#39004c",
	207: "#42264c",
	208: "#1c0026",
	209: "#211326",
	210: "#ff00ff",
	211: "#ff7fff",
	212: "#a500a5",
	213: "#a552a5",
	214: "#7f007f",
	215: "#7f3f7f",
	216: "#4c004c",
	217: "#4c264c",
	218: "#260026",
	219: "#261326",
	220: "#ff00bf",
	221: "#ff7fdf",
	222: "#a5007c",
	223: "#a55291",
	224: "#7f005f",
	225: "#7f3f6f",
	226: "#4c0039",
	227: "#4c2642",
	228: "#26001c",
	229: "#261321",
	230: "#ff007f",
	231: "#ff7fbf",
	232: "#a50052",
	233: "#a5527c",
	234: "#7f003f",
	235: "#7f3f5f",
	236: "#4c0026",
	237: "#4c2639",
	238: "#260013",
	239: "#26131c",
	240: "#ff003f",
	241: "#ff7f9f",
	242: "#a50029",
	243: "#a55267",
	244: "#7f001f",
	245: "#7f3f4f",
	246: "#4c0013",
	247: "#4c262f",
	248: "#260009",
	249: "#261317",
	250: "#333333",
	251: "#505050",
	252: "#696969",
	253: "#828282",
	254: "#bebebe",
	255: "#ffffff"
};
function Nd(e, t = "#ffffff", n = t) {
	if (typeof e != "number" || Number.isNaN(e)) return t;
	let r = Math.abs(Math.trunc(e));
	return r === 0 || r === 256 || r === 257 ? t : r === 7 ? n : Md[r] ?? t;
}
function Pd(e, t = "rgb") {
	let n = Math.max(0, Math.trunc(e)) & 16777215, r = n >> 16 & 255, i = n >> 8 & 255, a = n & 255;
	return `rgb(${t === "rgb" ? r : a}, ${i}, ${t === "rgb" ? a : r})`;
}
function Fd(e) {
	if (typeof e == "string") {
		let t = e.trim();
		return t ? /^(#|rgb\(|rgba\(|hsl\(|hsla\()/i.test(t) ? Id(t) ?? t : {
			red: "#ff0000",
			yellow: "#ffff00",
			green: "#00ff00",
			cyan: "#00ffff",
			blue: "#0000ff",
			magenta: "#ff00ff",
			white: "#ffffff",
			black: "#000000",
			grey: "#808080",
			gray: "#808080"
		}[t.toLowerCase()] : void 0;
	}
	if (e && typeof e == "object") {
		let t = e, n = Number(t.r ?? t.red), r = Number(t.g ?? t.green), i = Number(t.b ?? t.blue), a = Number(t.a ?? t.alpha ?? 1);
		if ([
			n,
			r,
			i
		].every(Number.isFinite)) return Number.isFinite(a) && a >= 0 && a < 1 ? `rgba(${n}, ${r}, ${i}, ${a})` : `rgb(${n}, ${r}, ${i})`;
	}
}
function Id(e) {
	if (!e) return;
	let t = e.trim();
	if (/^#[0-9a-f]{8}$/i.test(t)) {
		let e = parseInt(t.slice(1, 3), 16) / 255, n = parseInt(t.slice(3, 5), 16), r = parseInt(t.slice(5, 7), 16), i = parseInt(t.slice(7, 9), 16);
		return e >= .999 ? `rgb(${n}, ${r}, ${i})` : `rgba(${n}, ${r}, ${i}, ${af(e)})`;
	}
	if (/^#[0-9a-f]{6}$/i.test(t) || /^#[0-9a-f]{3}$/i.test(t)) return t;
	if (/^sc#/i.test(t)) {
		let e = t.slice(3).split(",").map((e) => Number(e.trim())), [n, r, i, a] = e.length === 4 ? e : [1, ...e];
		if ([
			n,
			r,
			i,
			a
		].every(Number.isFinite)) return `rgba(${Math.round(r * 255)}, ${Math.round(i * 255)}, ${Math.round(a * 255)}, ${af(n)})`;
	}
}
function Ld(e, t, n = {}) {
	let r = n.foreground ?? "#ffffff", i = r, a, o = Fd(e.trueColor) ?? Fd(e.color) ?? Fd(e.colorName);
	if (o && (a = o), !a) {
		let t = Xd(e, [
			"trueColor",
			"true_color",
			"truecolor",
			"colorRGB",
			"colorRgb",
			"rgbColor",
			"rgb"
		]);
		typeof t == "number" && t >= 0 && t <= 16777215 && (a = Pd(t, n.trueColorByteOrder ?? "rgb"));
	}
	if (!a) {
		let t = Yd(e.colorIndex, e.colorNumber, e.aci);
		typeof t == "number" && Math.abs(t) <= 257 && t !== 256 && t !== 0 && t !== 257 && (a = Nd(t, i, r));
	}
	if (!a && typeof e.color == "number") {
		let t = Number(e.color);
		Math.abs(t) <= 257 ? t !== 0 && t !== 256 && t !== 257 && (a = Nd(t, i, r)) : a = Pd(t, n.trueColorByteOrder ?? "rgb");
	}
	return a ||= Wd(Jd(t, e.layer), n), Bd(a ?? i, t, n);
}
function Rd(e, t, n = {}) {
	let r, i = Fd(e.fillColor);
	if (i && (r = i), !r && typeof e.fillColor == "number") {
		let t = e.fillColor;
		r = Math.abs(t) <= 257 ? Nd(t, n.foreground ?? "#ffffff", n.foreground ?? "#ffffff") : Pd(t, n.trueColorByteOrder ?? "rgb");
	}
	return !r && typeof e.fillColorIndex == "number" && (r = Nd(e.fillColorIndex, n.foreground ?? "#ffffff", n.foreground ?? "#ffffff")), r ? Bd(r, t, n) : void 0;
}
function zd(e, t, n = {}) {
	let r = Au(t);
	if ((n.colorMode ?? r.mode) !== "monochrome") return e;
	let i = Fd(n.monochromeColor ?? r.monochromeColor ?? n.foreground ?? "#000000");
	if (!i) return e;
	let a = Zd(i);
	if (!a) return i;
	let o = Zd(e);
	return nf({
		r: a.r,
		g: a.g,
		b: a.b,
		a: a.a * (o?.a ?? 1)
	});
}
function Bd(e, t, n) {
	let r = Au(t), i = n.colorMode ?? r.mode, a = zd(e, t, n);
	return i === "monochrome" ? a : Vd(a, n);
}
function Vd(e, t = {}) {
	return t.contrastMode === "adaptive" ? Hd(e, t.background ?? "#0b1020", t.foreground ?? "#ffffff", t.minColorContrast ?? 2.4) : e;
}
function Hd(e, t, n, r = 2.4) {
	let i = Zd(n) ?? {
		r: 255,
		g: 255,
		b: 255,
		a: 1
	}, a = Zd(t) ?? {
		r: 11,
		g: 16,
		b: 32,
		a: 1
	}, o = Zd(e);
	if (!o || tf(Qd(o, a), a) >= r) return e;
	let s = ef(a), c = s < .5 ? {
		r: 255,
		g: 255,
		b: 255,
		a: o.a
	} : {
		r: 0,
		g: 0,
		b: 0,
		a: o.a
	};
	for (let e of [
		.25,
		.4,
		.55,
		.7,
		.85,
		1
	]) {
		let t = $d(o, c, e);
		if (tf(Qd(t, a), a) >= r) return nf(t);
	}
	return tf(i, a) >= r ? nf(i) : s < .5 ? "#ffffff" : "#000000";
}
function Ud(e) {
	return !e || e.isVisible !== !1 && e.isFrozen !== !0;
}
function Wd(e, t) {
	if (!e) return;
	let n = t.foreground ?? "#ffffff", r = Fd(e.trueColor);
	if (r) return r;
	if (typeof e.trueColor == "number" && e.trueColor >= 0 && e.trueColor <= 16777215) return Pd(e.trueColor, t.trueColorByteOrder ?? "rgb");
	let i = Fd(e.color);
	if (i) return i;
	if (qd(e.colorIndex)) return Nd(e.colorIndex, n, n);
	if (typeof e.color == "number") {
		let r = Number(e.color);
		return Math.abs(r) <= 257 ? Nd(r, n, n) : Pd(r, t.trueColorByteOrder ?? "rgb");
	}
	if (typeof e.colorIndex == "number") return Nd(e.colorIndex, n, n);
}
function Gd(e) {
	return Yd(e.colorIndex, e.colorNumber, e.aci) === 0 || e.trueColor === void 0 && e.color === 0;
}
function Kd(e, t, n, r = {}) {
	if (!Gd(e)) return e;
	let i = Ld(t, n, {
		...r,
		colorMode: "source"
	});
	return {
		...e,
		color: i,
		trueColor: void 0,
		colorIndex: void 0,
		colorNumber: void 0
	};
}
function qd(e) {
	return typeof e == "number" && Number.isFinite(e) && Math.abs(Math.trunc(e)) >= 1 && Math.abs(Math.trunc(e)) <= 255;
}
function Jd(e, t) {
	if (e && t) return e.layers[t] ?? e.layers[t.toLowerCase()] ?? Object.values(e.layers).find((e) => e.name.toLowerCase() === t.toLowerCase());
}
function Yd(...e) {
	for (let t of e) if (typeof t == "number" && Number.isFinite(t)) return t;
}
function Xd(e, t) {
	let n = e;
	for (let e of t) {
		let t = n[e];
		if (typeof t == "number" && Number.isFinite(t)) return t;
	}
}
function Zd(e) {
	let t = e.trim().toLowerCase();
	if (/^#[0-9a-f]{3}$/i.test(t)) return {
		r: parseInt(t[1] + t[1], 16),
		g: parseInt(t[2] + t[2], 16),
		b: parseInt(t[3] + t[3], 16),
		a: 1
	};
	if (/^#[0-9a-f]{6}$/i.test(t)) return {
		r: parseInt(t.slice(1, 3), 16),
		g: parseInt(t.slice(3, 5), 16),
		b: parseInt(t.slice(5, 7), 16),
		a: 1
	};
	let n = t.match(/^rgba?\(([^)]+)\)$/i);
	if (n) {
		let e = n[1].split(/[,\s/]+/).filter(Boolean).map((e) => Number(e.replace("%", "")));
		if (e.length >= 3 && e.slice(0, 3).every(Number.isFinite)) {
			let t = /%/.test(n[1]);
			return {
				r: rf(t ? e[0] * 2.55 : e[0]),
				g: rf(t ? e[1] * 2.55 : e[1]),
				b: rf(t ? e[2] * 2.55 : e[2]),
				a: Number.isFinite(e[3]) ? Math.max(0, Math.min(1, e[3])) : 1
			};
		}
	}
}
function Qd(e, t) {
	let n = e.a + t.a * (1 - e.a);
	return n <= 0 ? {
		r: 0,
		g: 0,
		b: 0,
		a: 0
	} : {
		r: (e.r * e.a + t.r * t.a * (1 - e.a)) / n,
		g: (e.g * e.a + t.g * t.a * (1 - e.a)) / n,
		b: (e.b * e.a + t.b * t.a * (1 - e.a)) / n,
		a: n
	};
}
function $d(e, t, n) {
	let r = Math.max(0, Math.min(1, n));
	return {
		r: e.r + (t.r - e.r) * r,
		g: e.g + (t.g - e.g) * r,
		b: e.b + (t.b - e.b) * r,
		a: e.a
	};
}
function ef(e) {
	let t = [
		e.r,
		e.g,
		e.b
	].map((e) => {
		let t = e / 255;
		return t <= .03928 ? t / 12.92 : ((t + .055) / 1.055) ** 2.4;
	});
	return .2126 * t[0] + .7152 * t[1] + .0722 * t[2];
}
function tf(e, t) {
	let n = ef(e), r = ef(t), i = Math.max(n, r), a = Math.min(n, r);
	return (i + .05) / (a + .05);
}
function nf(e) {
	let t = rf(e.r), n = rf(e.g), r = rf(e.b);
	return e.a < .999 ? `rgba(${t}, ${n}, ${r}, ${af(e.a)})` : `rgb(${t}, ${n}, ${r})`;
}
function rf(e) {
	return Math.max(0, Math.min(255, Math.round(e)));
}
function af(e) {
	return Math.round(e * 1e3) / 1e3;
}
var of = {
	a: 1,
	b: 0,
	c: 0,
	d: 1,
	e: 0,
	f: 0
};
function sf(e, t) {
	return {
		a: e.a * t.a + e.c * t.b,
		b: e.b * t.a + e.d * t.b,
		c: e.a * t.c + e.c * t.d,
		d: e.b * t.c + e.d * t.d,
		e: e.a * t.e + e.c * t.f + e.e,
		f: e.b * t.e + e.d * t.f + e.f
	};
}
function cf(e, t) {
	return {
		a: 1,
		b: 0,
		c: 0,
		d: 1,
		e,
		f: t
	};
}
function lf(e) {
	let t = Math.cos(e), n = Math.sin(e);
	return {
		a: t,
		b: n,
		c: -n,
		d: t,
		e: 0,
		f: 0
	};
}
function uf(e, t = e) {
	return {
		a: e,
		b: 0,
		c: 0,
		d: t,
		e: 0,
		f: 0
	};
}
function df(e, t) {
	return {
		x: e.x * t.a + e.y * t.c + t.e,
		y: e.x * t.b + e.y * t.d + t.f,
		z: "z" in e ? e.z : void 0
	};
}
function ff(e, t) {
	if (e) return e.map((e) => ({
		cmd: e.cmd,
		points: e.points.map((e) => df(e, t))
	}));
}
function pf(e, t = {
	x: 0,
	y: 0
}) {
	let n = e.insertionPoint ?? {
		x: 0,
		y: 0
	}, r = e.scale, i = Number(typeof r == "object" && r ? r.x ?? 1 : e.scaleX ?? 1), a = Number(typeof r == "object" && r ? r.y ?? i : e.scaleY ?? i), o = Number(e.rotation ?? 0), s = cf(n.x, n.y);
	return s = sf(s, lf(Number.isFinite(o) ? o : 0)), s = sf(s, uf(Number.isFinite(i) ? i : 1, Number.isFinite(a) ? a : 1)), s = sf(s, cf(-t.x, -t.y)), s;
}
function mf(e, t) {
	let n = { ...e }, r = t.a * t.d - t.b * t.c, i = Math.sqrt(Math.abs(r)), a = Math.hypot(t.a, t.b), o = Math.hypot(t.c, t.d);
	if (e.startPoint && (n.startPoint = df(e.startPoint, t)), e.endPoint && (n.endPoint = df(e.endPoint, t)), e.center && (n.center = df(e.center, t)), e.insertionPoint && (n.insertionPoint = df(e.insertionPoint, t)), e.majorAxisEndPoint) {
		let r = df({
			x: 0,
			y: 0
		}, t), i = df(e.majorAxisEndPoint, t);
		n.majorAxisEndPoint = {
			x: i.x - r.x,
			y: i.y - r.y,
			z: i.z
		};
	}
	e.vertices && (n.vertices = e.vertices.map((e) => ({
		...df(e, t),
		bulge: e.bulge,
		startWidth: hf(e.startWidth, i),
		endWidth: hf(e.endWidth, i)
	}))), e.points && (n.points = e.points.map((e) => df(e, t))), e.controlPoints && (n.controlPoints = e.controlPoints.map((e) => df(e, t))), e.fitPoints && (n.fitPoints = e.fitPoints.map((e) => df(e, t))), e.attribs && (n.attribs = e.attribs.map((e) => mf(e, t))), e.commands && (n.commands = ff(e.commands, t)), e.loops && (n.loops = e.loops.map((e) => ({
		...e,
		vertices: e.vertices?.map((e) => df(e, t)),
		commands: ff(e.commands, t)
	}))), typeof e.radius == "number" && Number.isFinite(i) && (n.radius = e.radius * i), typeof e.constantWidth == "number" && Number.isFinite(i) && (n.constantWidth = e.constantWidth * i), typeof e.thickness == "number" && Number.isFinite(i) && (n.thickness = e.thickness * i), typeof e.lineTypeScale == "number" && Number.isFinite(i) && (n.lineTypeScale = e.lineTypeScale * i), (e.kind === "text" || /^(TEXT|MTEXT|ATTRIB|ATTDEF|DIMENSION)$/i.test(String(e.type ?? ""))) && (typeof e.textHeight == "number" && Number.isFinite(o) && (n.textHeight = e.textHeight * o), typeof e.height == "number" && Number.isFinite(o) && (n.height = e.height * o), typeof e.xScale == "number" && o > 1e-14 && Number.isFinite(a) && (n.xScale = e.xScale * a / o));
	let s = Math.atan2(t.b, t.a), c = e.kind === "ellipse" || String(e.type ?? "").toUpperCase() === "ELLIPSE";
	return (typeof e.rotation == "number" || e.kind === "text" || e.kind === "insert") && (n.rotation = gf(Number(e.rotation ?? 0) + (Number.isFinite(s) ? s : 0))), Number.isFinite(s) && Math.abs(s) > 1e-14 && (!c && typeof e.startAngle == "number" && (n.startAngle = e.startAngle + s), !c && typeof e.endAngle == "number" && (n.endAngle = e.endAngle + s)), r < 0 && n.vertices && (n.vertices = n.vertices.map((e) => ({
		...e,
		bulge: typeof e.bulge == "number" ? -e.bulge : void 0
	}))), n;
}
function hf(e, t) {
	return typeof e == "number" && Number.isFinite(t) ? e * t : e;
}
function gf(e) {
	if (!Number.isFinite(e)) return e;
	let t = Math.PI * 2, n = ((e + Math.PI) % t + t) % t - Math.PI;
	return Math.abs(n) <= 1e-12 ? 0 : n;
}
var _f = 16, vf = 96, yf = .01;
function bf(e, t = {}) {
	let n = hs();
	for (let t of e.pages ?? []) V(n, {
		x: 0,
		y: 0
	}), V(n, {
		x: t.width,
		y: t.height
	});
	let r = Cf(e, t);
	for (let t of e.entities) vs(n, wf(t, r));
	return ys(n);
}
function xf(e, t, n = "auto", r = {}) {
	if (n === "extents") return t;
	let i = Sf(e);
	if (!i) return t;
	if (n === "saved-view") return i;
	let a = hs(), o = Cf(e, r), s = 0;
	for (let t of e.entities) {
		let e = Of(wf(t, o), i);
		e && (s++, vs(a, e));
	}
	return s === 0 || !kf(a, i) ? i : ys(a);
}
function Sf(e) {
	let t = e.savedView;
	if (!t || t.source !== "vport" || t.sceneTransformApplied !== !0 || !H(t.center)) return;
	let n = Number(t.viewHeight), r = Number(t.aspectRatio);
	if (!Number.isFinite(n) || n <= 1e-9 || !Number.isFinite(r) || r <= 1e-9) return;
	let i = n * r;
	return {
		minX: t.center.x - i / 2,
		minY: t.center.y - n / 2,
		maxX: t.center.x + i / 2,
		maxY: t.center.y + n / 2
	};
}
function Cf(e, t) {
	return {
		document: e,
		maxInsertDepth: Math.max(0, Math.floor(t.maxInsertDepth ?? _f)),
		maxCurveSegments: Math.max(12, Math.floor(t.maxCurveSegments ?? vf))
	};
}
function wf(e, t, n = 0) {
	let r = hs();
	return Tf(r, e, t, n), r;
}
function Tf(e, t, n, r) {
	let i = String(t.type ?? "").toUpperCase(), a = t.kind ?? Wo(i);
	if (a === "insert") {
		let i = Df(n.document, t.blockName ?? t.name);
		if (i && r < n.maxInsertDepth) {
			let a = pf(t, i.basePoint ?? {
				x: 0,
				y: 0
			});
			for (let t of i.entities) Tf(e, mf(t, a), n, r + 1);
			return;
		}
	}
	if (a === "line") H(t.startPoint) && V(e, t.startPoint), H(t.endPoint) && V(e, t.endPoint);
	else if (a === "circle" || a === "arc") H(t.center) && Number.isFinite(t.radius) && _s(e, t.center, Number(t.radius));
	else if (a === "polyline" || a === "solid" || a === "spline") for (let n of [
		...t.vertices ?? [],
		...t.points ?? [],
		...t.controlPoints ?? [],
		...t.fitPoints ?? []
	]) H(n) && V(e, n);
	else if (a === "ellipse") {
		if (H(t.center) && H(t.majorAxisEndPoint)) for (let r of Ss(t.center, t.majorAxisEndPoint, Number(t.axisRatio ?? 1), Number(t.startAngle ?? 0), Number(t.endAngle ?? Math.PI * 2), n.maxCurveSegments)) V(e, r);
	} else if (a === "path") for (let n of t.commands ?? []) for (let t of n.points) V(e, t);
	else if (a === "hatch") for (let n of t.loops ?? []) {
		for (let t of n.vertices ?? []) V(e, t);
		for (let t of n.commands ?? []) for (let n of t.points) V(e, n);
	}
	else {
		let n = Ef(t);
		n && V(e, n);
	}
}
function Ef(e) {
	for (let t of [
		"startPoint",
		"insertionPoint",
		"center",
		"point",
		"location"
	]) {
		let n = e[t];
		if (H(n)) return n;
	}
	if (Array.isArray(e.vertices) && H(e.vertices[0])) return e.vertices[0];
	if (Array.isArray(e.commands)) {
		let t = e.commands.find((e) => e.points.length > 0);
		if (t) return t.points[0];
	}
}
function Df(e, t) {
	if (t) return e.blocks[t] ?? e.blocks[t.toLowerCase()] ?? Object.values(e.blocks).find((e) => e.name.toLowerCase() === t.toLowerCase());
}
function Of(e, t) {
	if (!gs(e) || !gs(t)) return;
	let n = {
		minX: Math.max(e.minX, t.minX),
		minY: Math.max(e.minY, t.minY),
		maxX: Math.min(e.maxX, t.maxX),
		maxY: Math.min(e.maxY, t.maxY)
	};
	return gs(n) ? n : void 0;
}
function kf(e, t) {
	if (!gs(e) || !gs(t)) return !1;
	let n = Math.hypot(e.maxX - e.minX, e.maxY - e.minY), r = Math.hypot(t.maxX - t.minX, t.maxY - t.minY);
	return r > 1e-9 && n / r >= yf;
}
var Af = 1e5, jf = /* @__PURE__ */ new Set([
	"",
	"bylayer",
	"15"
]), Mf = /* @__PURE__ */ new Set(["byblock", "14"]), Nf = /* @__PURE__ */ new Set(["continuous", "16"]), Pf = (e) => String(e ?? "").trim().toLowerCase();
function Ff(e) {
	return Mf.has(Pf(e));
}
function If(e, t, n) {
	if (!Ff(e.lineType)) return e;
	let r = Lf(t, n);
	return {
		...e,
		lineType: r || "Continuous",
		lineTypeScale: qf(e.lineTypeScale, 1) * qf(t.lineTypeScale, 1)
	};
}
function Lf(e, t) {
	let n = String(e.lineType ?? "").trim(), r = Pf(n);
	return jf.has(r) ? n = Kf(t, e.layer)?.lineType ?? "Continuous" : Mf.has(r) && (n = "Continuous"), n || "Continuous";
}
function Rf(e, t) {
	if (!t) return;
	let n = Lf(e, t), r = Pf(n);
	if (Nf.has(r) || jf.has(r) || Mf.has(r)) return;
	let i = Gf(t, n);
	if (!(i != null && i.pattern.length)) return;
	let a = qf(e.lineTypeScale, qf(t.header?.CELTSCALE, 1)), o = Bf(i, qf(t.header?.LTSCALE, 1) * a), s = o.reduce((e, t) => e + t.length, 0);
	if (!Number.isFinite(s) || s <= 1e-9) return;
	let c = o.some((e) => !e.draw && e.length > 1e-12), l = o.some((e) => e.marker);
	if (c || l) return {
		name: i.name,
		segments: Wf(o, c),
		runs: o,
		period: s
	};
}
function zf(e, t, n, r = Af) {
	let i = e.filter((e) => Number.isFinite(e.x) && Number.isFinite(e.y));
	if (i.length < 2 || n.runs.length === 0) return {
		segments: [],
		dots: []
	};
	let a = [];
	for (let e = 0; e < i.length - 1; e++) a.push([i[e], i[e + 1]]);
	t && a.push([i[i.length - 1], i[0]]);
	let o = Number.isFinite(r) ? Math.max(1, Math.floor(r)) : Af, s = a.reduce((e, [t, n]) => e + Math.hypot(n.x - t.x, n.y - t.y), 0), c = (n.period > 1e-12 ? s / n.period : Infinity) * Math.max(1, n.runs.length);
	if (!Number.isFinite(c) || c > o) return {
		segments: a,
		dots: []
	};
	let l = {
		segments: [],
		dots: []
	}, u = 0, d = n.runs[0].length, f = !0, p = (e) => {
		let t = l.dots[l.dots.length - 1];
		t && Math.hypot(t.x - e.x, t.y - e.y) <= 1e-10 || l.dots.push(e);
	}, m = () => {
		u = (u + 1) % n.runs.length, d = n.runs[u].length, f = !0;
	}, h = (e, t, n, r, i) => {
		let a = Uf(e, t, n / i, r / i);
		p(t), a && (l.markers ??= []).push(a);
	};
	for (let [e, t] of a) {
		let r = t.x - e.x, i = t.y - e.y, a = Math.hypot(r, i);
		if (a <= 1e-14) continue;
		let o = 0;
		for (; o < a - 1e-12;) {
			let t = 0;
			for (; d <= 1e-12 && t < n.runs.length;) {
				let s = n.runs[u];
				if (f && s.marker) {
					let t = o / a, n = {
						x: e.x + r * t,
						y: e.y + i * t
					};
					Hf(s) ? h(s, n, r, i, a) : p(n);
				}
				m(), t++;
			}
			if (d <= 1e-12) break;
			let s = n.runs[u];
			if (f) {
				if (s.marker) {
					let t = o / a, n = {
						x: e.x + r * t,
						y: e.y + i * t
					};
					Hf(s) ? h(s, n, r, i, a) : p(n);
				}
				f = !1;
			}
			let c = Math.min(d, a - o);
			if (s.draw && c > 1e-12) {
				let t = o / a, n = (o + c) / a;
				l.segments.push([{
					x: e.x + r * t,
					y: e.y + i * t
				}, {
					x: e.x + r * n,
					y: e.y + i * n
				}]);
			}
			o += c, d -= c, d <= 1e-12 && m();
		}
	}
	return l;
}
function Bf(e, t) {
	let n = [];
	for (let r of e.pattern) {
		let e = Number(r.length), i = Number(r.elementTypeFlag ?? 0) !== 0;
		Number.isFinite(e) && n.push({
			draw: e >= 0,
			length: Math.abs(e) * t,
			marker: e >= 0 && (e === 0 || i),
			element: r,
			globalScale: t
		});
	}
	return n;
}
function Vf(e, t) {
	let n = Math.cos(e.angle), r = Math.sin(e.angle);
	return t.polylines.map((t) => t.map((t) => {
		let i = t.x * e.scale, a = t.y * e.scale;
		return {
			x: e.point.x + i * n - a * r,
			y: e.point.y + i * r + a * n
		};
	}));
}
function Hf(e) {
	return Number(e.element?.elementTypeFlag ?? 0) !== 0;
}
function Uf(e, t, n, r) {
	let i = e.element, a = Number(i?.elementTypeFlag ?? 0);
	if (!i || a === 0) return;
	let o = Jf(i.offsetX, 0) * e.globalScale, s = Jf(i.offsetY, 0) * e.globalScale, c = Jf(i.rotation, 0), l = Math.atan2(r, n), u = {
		fallbackPoint: t,
		point: {
			x: t.x + n * o - r * s,
			y: t.y + r * o + n * s
		},
		angle: (a & 1) == 1 ? c : l + c,
		scale: Math.abs(Jf(i.scale, 1) * e.globalScale),
		fontName: i.fontName
	}, d = Number(i.shapeNumber);
	if ((a & 4) == 4 && Number.isFinite(d)) return {
		...u,
		kind: "shape",
		shapeNumber: Math.trunc(d)
	};
	if ((a & 2) == 2 && i.text) return {
		...u,
		kind: "text",
		text: i.text
	};
}
function Wf(e, t) {
	if (!t) return [];
	let n = [];
	for (let t of e) {
		if (t.length <= 1e-12) continue;
		let e = n[n.length - 1];
		e?.draw === t.draw ? e.length += t.length : n.push({
			draw: t.draw,
			length: t.length
		});
	}
	let r = [];
	for (let e of n) {
		let t = r.length % 2 == 0;
		e.draw !== t && r.push(1e-9), r.push(e.length);
	}
	return r.length % 2 == 1 && r.push(1e-9), r;
}
function Gf(e, t) {
	let n = Pf(t), r = e.lineTypes ?? {};
	return r[t] ?? r[n] ?? Object.values(r).find((e) => Pf(e.name) === n || Pf(e.handle) === n);
}
function Kf(e, t) {
	if (e && t) return e.layers[t] ?? e.layers[t.toLowerCase()] ?? Object.values(e.layers).find((e) => e.name.toLowerCase() === t.toLowerCase());
}
function qf(e, t) {
	let n = Number(e);
	return Number.isFinite(n) && n > 0 ? n : t;
}
function Jf(e, t) {
	let n = Number(e);
	return Number.isFinite(n) ? n : t;
}
var Yf = (e) => Math.abs(e.a - 1) < 1e-12 && Math.abs(e.b) < 1e-12 && Math.abs(e.c) < 1e-12 && Math.abs(e.d - 1) < 1e-12 && Math.abs(e.e) < 1e-9 && Math.abs(e.f) < 1e-9;
function Xf(e) {
	if (e.metadata.sceneTransformApplied === !0 || e.savedView?.sceneTransformApplied === !1) return e;
	let t = e.savedView?.sceneTransform ?? of;
	return Yf(t) ? e : {
		...e,
		entities: e.entities.map((e) => mf(e, t)),
		pages: e.pages?.map((e) => ({
			...e,
			entities: e.entities.map((e) => mf(e, t))
		})),
		metadata: {
			...e.metadata,
			sceneTransformApplied: !0
		}
	};
}
var Zf = {
	background: "#0b1020",
	foreground: "#ffffff",
	showUnsupportedMarkers: !1,
	showImagePlaceholders: !0,
	showPageBounds: !0,
	minScale: 1e-9,
	maxScale: 1e9,
	wheelZoomFactor: 1.14,
	trueColorByteOrder: "rgb",
	maxInsertDepth: 16,
	fitMode: "auto",
	contrastMode: "adaptive",
	minColorContrast: 2.4,
	maxCurveSegments: 96,
	spatialIndexCellCount: 72,
	maxVerticesPerBatch: 65536,
	textMinPixelHeight: 4,
	maxVisibleTextLabels: 2500,
	powerPreference: "high-performance",
	antialias: !0,
	preserveDrawingBuffer: !1,
	enableSpatialIndex: !0,
	shxGlyphResolver: xd
}, Qf = class {
	constructor(e, t = {}) {
		L(this, "canvas"), L(this, "ctx"), L(this, "opts"), L(this, "sourceDocument"), L(this, "document"), L(this, "bounds", hs()), L(this, "view", {
			centerX: 0,
			centerY: 0,
			scale: 1
		}), L(this, "fitScale", 1), L(this, "dpr", 1), L(this, "isDragging", !1), L(this, "lastPointer"), L(this, "resizeObserver"), L(this, "imageCache", /* @__PURE__ */ new Map()), L(this, "stats", {
			total: 0,
			drawn: 0,
			skipped: 0,
			byType: {},
			unsupported: {},
			renderElapsedMs: 0,
			backend: "canvas2d"
		}), L(this, "onStats"), L(this, "onViewChange");
		let n = e.getContext("2d");
		if (!n) throw Error("Canvas 2D context is not available.");
		this.canvas = e, this.ctx = n, this.opts = {
			...Zf,
			...t
		}, this.canvas.classList.add("cad-viewer-canvas"), this.bindEvents(), typeof ResizeObserver < "u" && (this.resizeObserver = new ResizeObserver(() => this.resize()), this.resizeObserver.observe(e)), this.resize();
	}
	captureCanvas() {
		return this.render(), Zc([this.canvas]);
	}
	destroy() {
		var e;
		(e = this.resizeObserver) == null || e.disconnect();
	}
	clear() {
		this.sourceDocument = void 0, this.document = void 0, this.bounds = hs(), this.view = {
			centerX: 0,
			centerY: 0,
			scale: 1
		}, this.fitScale = 1, this.render(), this.emitViewChange();
	}
	setDocument(e) {
		this.sourceDocument = e, this.document = Xf(e), this.bounds = bf(this.document, this.boundsOptions()), this.fitToView();
	}
	refreshReferences() {
		this.render(), this.emitViewChange();
	}
	getDocument() {
		return this.document;
	}
	getSourceDocument() {
		return this.sourceDocument;
	}
	setOptions(e) {
		let t = e.fitMode !== void 0 && e.fitMode !== this.opts.fitMode;
		Object.assign(this.opts, e), t && this.document ? this.fitToView() : (this.render(), this.emitViewChange());
	}
	getOptions() {
		return { ...this.opts };
	}
	fitToView(e = .92, t = this.opts.fitMode) {
		let n = this.document ? xf(this.document, this.bounds, t, this.boundsOptions()) : this.bounds;
		if (!gs(n)) {
			this.view = {
				centerX: 0,
				centerY: 0,
				scale: 1
			}, this.fitScale = 1, this.render(), this.emitViewChange();
			return;
		}
		let r = Math.max(1, this.cssWidth), i = Math.max(1, this.cssHeight), a = Math.max(n.maxX - n.minX, 1e-9), o = Math.max(n.maxY - n.minY, 1e-9), s = this.clampScale(Math.min(r / a, i / o) * e);
		this.fitScale = s, this.view = {
			centerX: (n.minX + n.maxX) / 2,
			centerY: (n.minY + n.maxY) / 2,
			scale: s
		}, this.render(), this.emitViewChange();
	}
	resize() {
		this.dpr = Math.max(1, window.devicePixelRatio || 1);
		let e = Math.max(1, Math.floor(this.cssWidth * this.dpr)), t = Math.max(1, Math.floor(this.cssHeight * this.dpr));
		(this.canvas.width !== e || this.canvas.height !== t) && (this.canvas.width = e, this.canvas.height = t), this.render(), this.emitViewChange();
	}
	zoom(e, t) {
		if (!Number.isFinite(e) || e <= 0) return;
		let n = t ?? {
			x: this.cssWidth / 2,
			y: this.cssHeight / 2
		}, r = this.screenToWorld(n);
		this.view.scale = this.clampScale(this.view.scale * e);
		let i = this.screenToWorld(n);
		this.view.centerX += r.x - i.x, this.view.centerY += r.y - i.y, this.render(), this.emitViewChange();
	}
	zoomIn() {
		this.zoom(this.opts.wheelZoomFactor);
	}
	zoomOut() {
		this.zoom(1 / this.opts.wheelZoomFactor);
	}
	panByScreenDelta(e, t) {
		!Number.isFinite(e) || !Number.isFinite(t) || (this.view.centerX -= e / this.view.scale, this.view.centerY += t / this.view.scale, this.render(), this.emitViewChange());
	}
	setViewState(e) {
		if (![
			e.centerX,
			e.centerY,
			e.scale
		].every(Number.isFinite)) throw Error("Invalid view state.");
		this.view = {
			...e,
			scale: this.clampScale(e.scale)
		}, this.render(), this.emitViewChange();
	}
	getViewState() {
		return { ...this.view };
	}
	getBounds() {
		return { ...this.bounds };
	}
	getStats() {
		return $f(this.stats);
	}
	getZoomRatio() {
		return Math.abs(this.fitScale) < 1e-12 ? 1 : this.view.scale / this.fitScale;
	}
	getZoomPercent() {
		return this.getZoomRatio() * 100;
	}
	worldToScreen(e) {
		return {
			x: this.cssWidth / 2 + (e.x - this.view.centerX) * this.view.scale,
			y: this.cssHeight / 2 - (e.y - this.view.centerY) * this.view.scale
		};
	}
	screenToWorld(e) {
		return {
			x: this.view.centerX + (e.x - this.cssWidth / 2) / this.view.scale,
			y: this.view.centerY - (e.y - this.cssHeight / 2) / this.view.scale
		};
	}
	render() {
		var e, t;
		let n = performance.now();
		if (this.stats = {
			total: 0,
			drawn: 0,
			skipped: 0,
			byType: {},
			unsupported: {},
			renderElapsedMs: 0,
			backend: "canvas2d"
		}, this.clearCanvas(), this.document) {
			this.opts.showPageBounds && (e = this.document.pages) != null && e.length && this.drawPageBounds(this.document);
			for (let e of this.document.entities) this.drawEntityTracked(e, 0);
		}
		return this.stats.renderElapsedMs = performance.now() - n, (t = this.onStats) == null || t.call(this, this.getStats()), this.getStats();
	}
	get cssWidth() {
		return this.canvas.clientWidth || 1;
	}
	get cssHeight() {
		return this.canvas.clientHeight || 1;
	}
	bindEvents() {
		this.canvas.addEventListener("wheel", (e) => {
			e.preventDefault();
			let t = e.deltaY < 0 ? this.opts.wheelZoomFactor : 1 / this.opts.wheelZoomFactor;
			this.zoom(t, {
				x: e.offsetX,
				y: e.offsetY
			});
		}, { passive: !1 }), this.canvas.addEventListener("pointerdown", (e) => {
			this.canvas.setPointerCapture(e.pointerId), this.isDragging = !0, this.lastPointer = {
				x: e.clientX,
				y: e.clientY
			}, this.canvas.classList.add("is-dragging");
		}), this.canvas.addEventListener("pointermove", (e) => {
			!this.isDragging || !this.lastPointer || (this.panByScreenDelta(e.clientX - this.lastPointer.x, e.clientY - this.lastPointer.y), this.lastPointer = {
				x: e.clientX,
				y: e.clientY
			});
		});
		let e = (e) => {
			e && this.canvas.hasPointerCapture(e.pointerId) && this.canvas.releasePointerCapture(e.pointerId), this.isDragging = !1, this.lastPointer = void 0, this.canvas.classList.remove("is-dragging");
		};
		this.canvas.addEventListener("pointerup", e), this.canvas.addEventListener("pointercancel", () => e());
	}
	clearCanvas() {
		let e = this.ctx;
		e.save(), e.setTransform(this.dpr, 0, 0, this.dpr, 0, 0), e.clearRect(0, 0, this.cssWidth, this.cssHeight), e.fillStyle = this.opts.background, e.fillRect(0, 0, this.cssWidth, this.cssHeight), e.restore();
	}
	drawPageBounds(e) {
		let t = this.ctx;
		t.save(), t.setTransform(this.dpr, 0, 0, this.dpr, 0, 0), t.strokeStyle = "rgba(148, 163, 184, 0.35)", t.lineWidth = 1, t.setLineDash([8, 6]);
		for (let n of e.pages ?? []) {
			let e = this.worldToScreen({
				x: 0,
				y: 0
			}), r = this.worldToScreen({
				x: n.width,
				y: n.height
			});
			t.strokeRect(Math.min(e.x, r.x), Math.min(e.y, r.y), Math.abs(r.x - e.x), Math.abs(r.y - e.y));
		}
		t.restore();
	}
	drawEntityTracked(e, t) {
		this.stats.total++;
		let n = String(e.type ?? "UNKNOWN").toUpperCase();
		this.stats.byType[n] = (this.stats.byType[n] ?? 0) + 1;
		let r = this.lookupLayer(e.layer);
		e.isVisible === !1 || !Ud(r) ? this.stats.skipped++ : this.drawEntity(e, n, t);
	}
	drawEntity(e, t, n) {
		switch (e.kind ?? Wo(t)) {
			case "line": return this.drawLine(e);
			case "circle": return this.drawCircle(e);
			case "arc": return this.drawArc(e);
			case "polyline": return this.drawPolyline(e);
			case "ellipse": return this.drawEllipse(e);
			case "text": return this.drawText(e);
			case "point": return this.drawPoint(e);
			case "insert": return this.drawInsert(e, n);
			case "solid": return this.drawSolid(e);
			case "hatch": return this.drawHatch(e);
			case "spline": return this.drawSpline(e);
			case "path": return this.drawPath(e);
			case "image": return this.drawImage(e);
			case "viewport": return this.markSkipped(t);
			default: this.stats.unsupported[t] = (this.stats.unsupported[t] ?? 0) + 1, this.stats.skipped++, this.opts.showUnsupportedMarkers && this.drawUnsupportedMarker(e);
		}
	}
	beginStyledPath(e, t = !1, n = !0) {
		let r = this.ctx;
		r.save(), r.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
		let i = Ld(e, this.document, {
			foreground: this.opts.foreground,
			background: this.opts.background,
			trueColorByteOrder: this.opts.trueColorByteOrder,
			contrastMode: this.opts.contrastMode,
			minColorContrast: this.opts.minColorContrast
		}), a = Rd(e, this.document, {
			foreground: this.opts.foreground,
			background: this.opts.background,
			trueColorByteOrder: this.opts.trueColorByteOrder,
			contrastMode: this.opts.contrastMode,
			minColorContrast: this.opts.minColorContrast
		}) ?? i;
		r.strokeStyle = i, r.fillStyle = t ? a : i, r.globalAlpha = Ts(Number(e.opacity ?? 1), 0, 1), r.lineCap = "round", r.lineJoin = "round";
		let o = typeof e.lineweight == "number" && e.lineweight > 0 ? e.lineweight / 30 : 1, s = Xo(e) * Math.abs(this.view.scale);
		r.lineWidth = Math.max(1, Math.min(256, Math.max(o, Number.isFinite(s) ? s : 0)));
		let c = n ? Rf(e, this.document) : void 0;
		r.setLineDash(c ? c.segments.map((e) => Math.max(.05, e * this.view.scale)) : []), r.beginPath();
	}
	finishStroke() {
		this.ctx.stroke(), this.ctx.restore(), this.stats.drawn++;
	}
	finishFillStroke(e = !1) {
		e && this.ctx.fill(), this.ctx.stroke(), this.ctx.restore(), this.stats.drawn++;
	}
	drawLine(e) {
		let t = e.startPoint, n = e.endPoint;
		if (!H(t) || !H(n)) return this.markSkipped("LINE");
		this.strokeWorldPolyline(e, [t, n], !1);
	}
	drawCircle(e) {
		let t = e.center, n = Number(e.radius);
		if (!H(t) || !Number.isFinite(n)) return this.markSkipped("CIRCLE");
		this.strokeWorldPolyline(e, xs(U(t), n, 0, Math.PI * 2, !0), !0);
	}
	drawArc(e) {
		let t = e.center, n = Number(e.radius), r = Number(e.startAngle), i = Number(e.endAngle);
		if (!H(t) || !Number.isFinite(n) || !Number.isFinite(r) || !Number.isFinite(i)) return this.markSkipped("ARC");
		this.strokeWorldPolyline(e, xs(U(t), n, r, i, !0), !1);
	}
	drawPolyline(e) {
		let t = e.vertices ?? e.points;
		if (!Array.isArray(t) || t.length < 2) return this.markSkipped(String(e.type));
		let n = Yo(e), r = [], i = n ? t.length : t.length - 1;
		for (let e = 0; e < i; e++) {
			let n = t[e], i = t[(e + 1) % t.length];
			if (!H(n) || !H(i)) continue;
			let a = Cs(n, i, Number(n.bulge ?? 0));
			r.length > 0 && a.shift(), r.push(...a);
		}
		this.strokeWorldPolyline(e, r, n);
	}
	drawEllipse(e) {
		let t = e.center, n = e.majorAxisEndPoint, r = Number(e.axisRatio ?? 1);
		if (!H(t) || !H(n)) return this.markSkipped("ELLIPSE");
		let i = Ss(t, n, r, Number(e.startAngle ?? 0), Number(e.endAngle ?? Math.PI * 2)), a = Math.abs(Number(e.endAngle ?? Math.PI * 2) - Number(e.startAngle ?? 0)) >= Math.PI * 2 - 1e-6;
		this.strokeWorldPolyline(e, i, a);
	}
	drawPoint(e) {
		let t = e.point ?? e.location ?? e.center ?? e.insertionPoint;
		if (!H(t)) return this.markSkipped("POINT");
		let n = this.worldToScreen(t);
		this.beginStyledPath(e), this.ctx.moveTo(n.x - 3, n.y), this.ctx.lineTo(n.x + 3, n.y), this.ctx.moveTo(n.x, n.y - 3), this.ctx.lineTo(n.x, n.y + 3), this.finishStroke();
	}
	drawText(e) {
		let t = (Number(e.halign ?? 0) !== 0 || Number(e.valign ?? 0) !== 0) && H(e.endPoint) ? e.endPoint : e.insertionPoint ?? e.startPoint ?? e.center, n = ws(String(e.text ?? e.value ?? "")), r = Number(e.textHeight ?? e.height ?? 1);
		if (!H(t) || !n) return this.markSkipped(String(e.type));
		this.drawTextAt(e, t, n, r, Number(e.rotation ?? 0));
	}
	drawInsert(e, t) {
		let n = this.lookupBlock(e.blockName ?? e.name);
		if (n && t < this.opts.maxInsertDepth) {
			let r = pf(e, n.basePoint ?? {
				x: 0,
				y: 0
			});
			for (let i of n.entities) {
				let n = If(Kd(i, e, this.document, {
					foreground: this.opts.foreground,
					background: this.opts.background,
					trueColorByteOrder: this.opts.trueColorByteOrder,
					contrastMode: this.opts.contrastMode,
					minColorContrast: this.opts.minColorContrast
				}), e, this.document);
				this.drawEntityTracked(mf(n, r), t + 1);
			}
			return;
		}
		let r = e.insertionPoint;
		if (!H(r)) return this.markSkipped("INSERT");
		let i = this.worldToScreen(r);
		if (this.beginStyledPath(e), this.ctx.rect(i.x - 5, i.y - 5, 10, 10), this.finishStroke(), Array.isArray(e.attribs)) for (let t of e.attribs) this.drawText(t);
	}
	drawSolid(e) {
		let t = e.vertices ?? e.points;
		if (!Array.isArray(t) || t.length < 3) return this.markSkipped(String(e.type));
		this.beginStyledPath(e, !0);
		let n = this.worldToScreen(t[0]);
		this.ctx.moveTo(n.x, n.y);
		for (let e of t.slice(1)) {
			if (!H(e)) continue;
			let t = this.worldToScreen(e);
			this.ctx.lineTo(t.x, t.y);
		}
		this.ctx.closePath(), this.finishFillStroke(!0);
	}
	drawHatch(e) {
		var t, n;
		let r = e.loops;
		if (!Array.isArray(r) || r.length === 0) return this.markSkipped("HATCH");
		this.beginStyledPath(e, !0);
		for (let e of r) if ((t = e.commands) != null && t.length) this.addPathCommands(e.commands);
		else if ((n = e.vertices) != null && n.length) {
			let t = this.worldToScreen(e.vertices[0]);
			this.ctx.moveTo(t.x, t.y);
			for (let t of e.vertices.slice(1)) {
				let e = this.worldToScreen(t);
				this.ctx.lineTo(e.x, e.y);
			}
			this.ctx.closePath();
		}
		this.finishFillStroke(!!Rd(e, this.document, {
			foreground: this.opts.foreground,
			background: this.opts.background,
			trueColorByteOrder: this.opts.trueColorByteOrder,
			contrastMode: this.opts.contrastMode,
			minColorContrast: this.opts.minColorContrast
		}));
	}
	drawSpline(e) {
		var t;
		let n = (t = e.fitPoints) != null && t.length ? e.fitPoints : e.controlPoints;
		if (!n || n.length < 2) return this.markSkipped("SPLINE");
		this.strokeWorldPolyline(e, n, !!e.isClosed);
	}
	drawPath(e) {
		var t;
		if (!((t = e.commands) != null && t.length)) return this.markSkipped(String(e.type));
		this.beginStyledPath(e, !!e.fillColor), this.addPathCommands(e.commands), this.finishFillStroke(!!e.fillColor);
	}
	addPathCommands(e) {
		for (let t of e) if (t.cmd === "M") {
			let e = this.worldToScreen(t.points[0]);
			this.ctx.moveTo(e.x, e.y);
		} else if (t.cmd === "L") {
			let e = this.worldToScreen(t.points[0]);
			this.ctx.lineTo(e.x, e.y);
		} else if (t.cmd === "C") {
			let [e, n, r] = t.points.map((e) => this.worldToScreen(e));
			this.ctx.bezierCurveTo(e.x, e.y, n.x, n.y, r.x, r.y);
		} else if (t.cmd === "Q") {
			let [e, n] = t.points.map((e) => this.worldToScreen(e));
			this.ctx.quadraticCurveTo(e.x, e.y, n.x, n.y);
		} else t.cmd === "Z" && this.ctx.closePath();
	}
	drawImage(e) {
		let t = e.insertionPoint;
		if (!H(t)) return this.markSkipped(String(e.type));
		let n = Number(e.width ?? 32), r = Number(e.height ?? 32), i = this.worldToScreen(t), a = this.worldToScreen({
			x: t.x + n,
			y: t.y - r
		}), o = Math.min(i.x, a.x), s = Math.min(i.y, a.y), c = Math.abs(a.x - i.x), l = Math.abs(a.y - i.y), u = e.imageDataUrl;
		if (u) {
			let e = this.getImage(u);
			if (e.complete && e.naturalWidth > 0) {
				this.ctx.save(), this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0), this.ctx.drawImage(e, o, s, c, l), this.ctx.restore(), this.stats.drawn++;
				return;
			}
			e.onload = () => this.render();
		}
		if (!this.opts.showImagePlaceholders) return this.markSkipped(String(e.type));
		this.beginStyledPath(e), this.ctx.rect(o, s, c, l), this.ctx.moveTo(o, s), this.ctx.lineTo(o + c, s + l), this.ctx.moveTo(o + c, s), this.ctx.lineTo(o, s + l), this.finishStroke();
	}
	getImage(e) {
		let t = this.imageCache.get(e);
		return t || (t = new Image(), t.src = e, this.imageCache.set(e, t)), t;
	}
	drawUnsupportedMarker(e) {
		let t = this.entityAnchor(e);
		if (!t) return;
		let n = this.worldToScreen(t);
		this.beginStyledPath(e), this.ctx.moveTo(n.x - 4, n.y - 4), this.ctx.lineTo(n.x + 4, n.y + 4), this.ctx.moveTo(n.x + 4, n.y - 4), this.ctx.lineTo(n.x - 4, n.y + 4), this.finishStroke();
	}
	drawTextAt(e, t, n, r, i) {
		let a = this.ctx, o = this.worldToScreen(t);
		a.save(), a.setTransform(this.dpr, 0, 0, this.dpr, 0, 0), a.translate(o.x, o.y), a.rotate(-i);
		let s = Number(e.generationFlag ?? 0), c = Number(e.xScale ?? 1);
		a.scale((s & 2 ? -1 : 1) * (Number.isFinite(c) && Math.abs(c) > 1e-9 ? Math.abs(c) : 1), s & 4 ? -1 : 1);
		let l = Math.max(4, Math.min(256, Math.abs(r) * this.view.scale));
		a.font = `${l}px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`, a.fillStyle = Ld(e, this.document, {
			foreground: this.opts.foreground,
			background: this.opts.background,
			trueColorByteOrder: this.opts.trueColorByteOrder,
			contrastMode: this.opts.contrastMode,
			minColorContrast: this.opts.minColorContrast
		}), a.globalAlpha = Ts(Number(e.opacity ?? 1), 0, 1);
		let u = Number(e.halign ?? 0), d = Number(e.valign ?? 0);
		a.textAlign = u === 1 || u === 4 ? "center" : u === 2 ? "right" : "left", a.textBaseline = d === 1 ? "bottom" : d === 2 ? "middle" : d === 3 ? "top" : "alphabetic";
		for (let [e, t] of n.split(/\r?\n/g).entries()) a.fillText(t, 0, e * l * 1.22);
		a.restore(), this.stats.drawn++;
	}
	strokeWorldPolyline(e, t, n) {
		let r = t.filter(H);
		if (r.length < 2) return this.markSkipped(String(e.type));
		let i = Rf(e, this.document);
		if (i) {
			let t = zf(r, n, i), a = [...t.dots];
			this.beginStyledPath(e, !1, !1);
			for (let [e, n] of t.segments) {
				let t = this.worldToScreen(e), r = this.worldToScreen(n);
				this.ctx.moveTo(t.x, t.y), this.ctx.lineTo(r.x, r.y);
			}
			for (let e of t.markers ?? []) {
				let t = this.resolveLineTypeGlyph(e);
				if (t) {
					ep(a, e.fallbackPoint);
					for (let n of Vf(e, t)) {
						if (n.length < 2) continue;
						let e = this.worldToScreen(n[0]);
						this.ctx.moveTo(e.x, e.y);
						for (let e of n.slice(1)) {
							let t = this.worldToScreen(e);
							this.ctx.lineTo(t.x, t.y);
						}
					}
				}
			}
			if (this.ctx.stroke(), a.length > 0) {
				this.ctx.setLineDash([]), this.ctx.beginPath();
				let e = Math.max(.5, this.ctx.lineWidth / 2);
				for (let t of a) {
					let n = this.worldToScreen(t);
					this.ctx.moveTo(n.x + e, n.y), this.ctx.arc(n.x, n.y, e, 0, Math.PI * 2);
				}
				this.ctx.fillStyle = this.ctx.strokeStyle, this.ctx.fill();
			}
			this.ctx.restore(), this.stats.drawn++;
			return;
		}
		this.beginStyledPath(e);
		let a = this.worldToScreen(r[0]);
		this.ctx.moveTo(a.x, a.y);
		for (let e of r.slice(1)) {
			let t = this.worldToScreen(e);
			this.ctx.lineTo(t.x, t.y);
		}
		n && this.ctx.closePath(), this.finishStroke();
	}
	resolveLineTypeGlyph(e) {
		return e.kind === "shape" ? this.opts.shxGlyphResolver.resolveShape(Number(e.shapeNumber), e.fontName) : this.opts.shxGlyphResolver.resolveText(String(e.text ?? ""), e.fontName);
	}
	markSkipped(e) {
		this.stats.skipped++, this.stats.unsupported[e] = this.stats.unsupported[e] ?? 0;
	}
	entityAnchor(e) {
		for (let t of [
			"startPoint",
			"insertionPoint",
			"center",
			"point",
			"location"
		]) {
			let n = e[t];
			if (H(n)) return U(n);
		}
		if (Array.isArray(e.vertices) && H(e.vertices[0])) return U(e.vertices[0]);
		if (Array.isArray(e.commands) && e.commands.length) {
			let t = e.commands.find((e) => e.points.length > 0);
			if (t) return U(t.points[0]);
		}
	}
	lookupLayer(e) {
		if (this.document && e) return this.document.layers[e] ?? this.document.layers[e.toLowerCase()] ?? Object.values(this.document.layers).find((t) => t.name.toLowerCase() === e.toLowerCase());
	}
	lookupBlock(e) {
		if (this.document && e) return this.document.blocks[e] ?? this.document.blocks[e.toLowerCase()] ?? Object.values(this.document.blocks).find((t) => t.name.toLowerCase() === e.toLowerCase());
	}
	clampScale(e) {
		return Math.min(this.opts.maxScale, Math.max(this.opts.minScale, e));
	}
	boundsOptions() {
		return {
			maxInsertDepth: this.opts.maxInsertDepth,
			maxCurveSegments: this.opts.maxCurveSegments
		};
	}
	emitViewChange() {
		var e;
		(e = this.onViewChange) == null || e.call(this, {
			view: this.getViewState(),
			fitScale: this.fitScale,
			zoomRatio: this.getZoomRatio(),
			zoomPercent: this.getZoomPercent(),
			bounds: this.getBounds()
		});
	}
};
function $f(e) {
	return {
		total: e.total,
		drawn: e.drawn,
		skipped: e.skipped,
		byType: { ...e.byType },
		unsupported: { ...e.unsupported },
		renderElapsedMs: e.renderElapsedMs,
		backend: e.backend,
		primitiveCount: e.primitiveCount,
		visiblePrimitiveCount: e.visiblePrimitiveCount,
		culledPrimitiveCount: e.culledPrimitiveCount,
		gpuMemoryBytes: e.gpuMemoryBytes,
		buildElapsedMs: e.buildElapsedMs
	};
}
function ep(e, t) {
	let n = Math.max(1, Math.abs(t.x), Math.abs(t.y)), r = Math.max(1e-9, n * 1e-12), i = e.findIndex((e) => Math.hypot(e.x - t.x, e.y - t.y) <= r);
	i >= 0 && e.splice(i, 1);
}
var tp = {
	background: "#0b1020",
	foreground: "#ffffff",
	showUnsupportedMarkers: !1,
	showImagePlaceholders: !0,
	showPageBounds: !0,
	minScale: 1e-9,
	maxScale: 1e9,
	wheelZoomFactor: 1.14,
	trueColorByteOrder: "rgb",
	maxInsertDepth: 16,
	fitMode: "auto",
	contrastMode: "adaptive",
	minColorContrast: 2.4,
	maxCurveSegments: 96,
	spatialIndexCellCount: 72,
	maxVerticesPerBatch: 65536,
	textMinPixelHeight: 4,
	maxVisibleTextLabels: 2500,
	powerPreference: "high-performance",
	antialias: !0,
	preserveDrawingBuffer: !1,
	enableSpatialIndex: !0,
	shxGlyphResolver: xd
}, np = class {
	constructor(e, t = {}) {
		L(this, "canvas"), L(this, "backend", "webgl"), L(this, "gl"), L(this, "program"), L(this, "eventController", new AbortController()), L(this, "imageCache", /* @__PURE__ */ new Map()), L(this, "opts"), L(this, "sourceDocument"), L(this, "document"), L(this, "bounds", hs()), L(this, "view", {
			centerX: 0,
			centerY: 0,
			scale: 1
		}), L(this, "fitScale", 1), L(this, "dpr", 1), L(this, "isDragging", !1), L(this, "lastPointer"), L(this, "resizeObserver"), L(this, "overlayCanvas"), L(this, "overlayCtx"), L(this, "scene"), L(this, "stats", {
			total: 0,
			drawn: 0,
			skipped: 0,
			byType: {},
			unsupported: {},
			renderElapsedMs: 0,
			backend: "webgl",
			primitiveCount: 0,
			visiblePrimitiveCount: 0,
			culledPrimitiveCount: 0,
			gpuMemoryBytes: 0,
			buildElapsedMs: 0
		}), L(this, "rafHandle", 0), L(this, "onStats"), L(this, "onViewChange");
		let n = ip(e, t);
		if (!n) throw Error("WebGL is not available. Use renderer: \"canvas2d\" to force the Canvas2D fallback.");
		this.canvas = e, this.gl = n, this.program = ap(n), this.opts = {
			...tp,
			...t
		}, this.canvas.classList.add("cad-viewer-canvas", "cad-viewer-webgl-canvas"), this.createOverlayCanvas(), this.bindEvents(), typeof ResizeObserver < "u" && (this.resizeObserver = new ResizeObserver(() => this.resize()), this.resizeObserver.observe(e)), this.resize();
	}
	captureCanvas() {
		return this.render(), Zc([this.canvas, ...this.overlayCanvas ? [this.overlayCanvas] : []]);
	}
	static isSupported() {
		return rp();
	}
	destroy() {
		var e, t;
		this.eventController.abort(), (e = this.resizeObserver) == null || e.disconnect(), this.cancelScheduledRender(), this.disposeScene(), (t = this.overlayCanvas) == null || t.remove();
	}
	clear() {
		this.sourceDocument = void 0, this.document = void 0, this.bounds = hs(), this.view = {
			centerX: 0,
			centerY: 0,
			scale: 1
		}, this.fitScale = 1, this.disposeScene(), this.render(), this.emitViewChange();
	}
	setDocument(e) {
		this.sourceDocument = e, this.document = Xf(e), this.bounds = bf(this.document, this.boundsOptions()), this.disposeScene();
		let t = lp(this.document, this.opts, this.bounds);
		this.scene = sp(this.gl, t), this.stats = Cp(this.scene, 0), this.fitToView();
	}
	refreshReferences() {
		if (!this.document) return;
		let e = { ...this.view }, t = this.fitScale;
		this.disposeScene();
		let n = lp(this.document, this.opts, this.bounds);
		this.scene = sp(this.gl, n), this.stats = Cp(this.scene, 0), this.view = e, this.fitScale = t, this.render(), this.emitViewChange();
	}
	getDocument() {
		return this.document;
	}
	getSourceDocument() {
		return this.sourceDocument;
	}
	setOptions(e) {
		let t = Sp(this.opts, e), n = e.fitMode !== void 0 && e.fitMode !== this.opts.fitMode;
		this.opts = {
			...this.opts,
			...e
		}, t && (this.sourceDocument ?? this.document) ? this.setDocument(this.sourceDocument ?? this.document) : n && this.document ? this.fitToView() : (this.render(), this.emitViewChange());
	}
	getOptions() {
		return { ...this.opts };
	}
	fitToView(e = .92, t = this.opts.fitMode) {
		let n = this.document ? xf(this.document, this.bounds, t, this.boundsOptions()) : this.bounds;
		if (!gs(n)) {
			this.view = {
				centerX: 0,
				centerY: 0,
				scale: 1
			}, this.fitScale = 1, this.render(), this.emitViewChange();
			return;
		}
		let r = Math.max(1, this.cssWidth), i = Math.max(1, this.cssHeight), a = Math.max(n.maxX - n.minX, 1e-9), o = Math.max(n.maxY - n.minY, 1e-9), s = this.clampScale(Math.min(r / a, i / o) * e);
		this.fitScale = s, this.view = {
			centerX: (n.minX + n.maxX) / 2,
			centerY: (n.minY + n.maxY) / 2,
			scale: s
		}, this.render(), this.emitViewChange();
	}
	resize() {
		this.dpr = Math.max(1, window.devicePixelRatio || 1);
		let e = Math.max(1, Math.floor(this.cssWidth * this.dpr)), t = Math.max(1, Math.floor(this.cssHeight * this.dpr));
		(this.canvas.width !== e || this.canvas.height !== t) && (this.canvas.width = e, this.canvas.height = t), this.resizeOverlay(e, t), this.render(), this.emitViewChange();
	}
	zoom(e, t) {
		if (!Number.isFinite(e) || e <= 0) return;
		let n = t ?? {
			x: this.cssWidth / 2,
			y: this.cssHeight / 2
		}, r = this.screenToWorld(n);
		this.view.scale = this.clampScale(this.view.scale * e);
		let i = this.screenToWorld(n);
		this.view.centerX += r.x - i.x, this.view.centerY += r.y - i.y, this.scheduleRender(), this.emitViewChange();
	}
	zoomIn() {
		this.zoom(this.opts.wheelZoomFactor);
	}
	zoomOut() {
		this.zoom(1 / this.opts.wheelZoomFactor);
	}
	panByScreenDelta(e, t) {
		!Number.isFinite(e) || !Number.isFinite(t) || (this.view.centerX -= e / this.view.scale, this.view.centerY += t / this.view.scale, this.scheduleRender(), this.emitViewChange());
	}
	setViewState(e) {
		if (![
			e.centerX,
			e.centerY,
			e.scale
		].every(Number.isFinite)) throw Error("Invalid view state.");
		this.view = {
			...e,
			scale: this.clampScale(e.scale)
		}, this.render(), this.emitViewChange();
	}
	getViewState() {
		return { ...this.view };
	}
	getBounds() {
		return { ...this.bounds };
	}
	getStats() {
		return wp(this.stats);
	}
	getZoomRatio() {
		return Math.abs(this.fitScale) < 1e-12 ? 1 : this.view.scale / this.fitScale;
	}
	getZoomPercent() {
		return this.getZoomRatio() * 100;
	}
	worldToScreen(e) {
		return {
			x: this.cssWidth / 2 + (e.x - this.view.centerX) * this.view.scale,
			y: this.cssHeight / 2 - (e.y - this.view.centerY) * this.view.scale
		};
	}
	screenToWorld(e) {
		return {
			x: this.view.centerX + (e.x - this.cssWidth / 2) / this.view.scale,
			y: this.view.centerY - (e.y - this.cssHeight / 2) / this.view.scale
		};
	}
	render() {
		return this.cancelScheduledRender(), this.renderNow();
	}
	renderNow() {
		var e;
		let t = performance.now(), n = this.gl;
		n.viewport(0, 0, this.canvas.width, this.canvas.height);
		let r = Tp(this.opts.background, [
			11,
			16,
			32,
			255
		]);
		n.clearColor(r[0] / 255, r[1] / 255, r[2] / 255, r[3] / 255), n.clear(n.COLOR_BUFFER_BIT), n.disable(n.DEPTH_TEST), n.enable(n.BLEND), n.blendFunc(n.SRC_ALPHA, n.ONE_MINUS_SRC_ALPHA);
		let i = 0, a = 0, o = this.scene, s = this.visibleWorldBounds();
		if (o) {
			n.useProgram(this.program.program), n.uniform2f(this.program.uViewCenter, this.view.centerX - o.origin.x, this.view.centerY - o.origin.y), n.uniform1f(this.program.uScale, this.view.scale * this.dpr), n.uniform2f(this.program.uViewport, this.canvas.width, this.canvas.height), n.uniform1f(this.program.uPointSize, Math.max(1, this.dpr));
			let e = this.drawBatches(o.lineBatches, n.LINES, s);
			i += e.visible, a += e.culled;
			let t = this.drawBatches(o.triangleBatches, n.TRIANGLES, s);
			i += t.visible, a += t.culled;
			let r = this.drawBatches(o.lineTypePointBatches, n.POINTS, s);
			i += r.visible, a += r.culled, n.uniform1f(this.program.uPointSize, Math.max(2, Math.min(12, 4 * this.dpr)));
			let c = this.drawBatches(o.pointBatches, n.POINTS, s);
			i += c.visible, a += c.culled;
		}
		this.renderOverlay(s);
		let c = performance.now() - t;
		return this.stats = o ? {
			...o.stats,
			renderElapsedMs: c,
			backend: "webgl",
			primitiveCount: o.primitiveCount,
			visiblePrimitiveCount: i,
			culledPrimitiveCount: a,
			gpuMemoryBytes: o.gpuMemoryBytes,
			buildElapsedMs: o.buildElapsedMs
		} : {
			total: 0,
			drawn: 0,
			skipped: 0,
			byType: {},
			unsupported: {},
			renderElapsedMs: c,
			backend: "webgl",
			primitiveCount: 0,
			visiblePrimitiveCount: 0,
			culledPrimitiveCount: 0,
			gpuMemoryBytes: 0,
			buildElapsedMs: 0
		}, (e = this.onStats) == null || e.call(this, this.getStats()), this.getStats();
	}
	drawBatches(e, t, n) {
		let r = this.gl, i = 0, a = 0;
		for (let o of e) xp(o.bounds, n) ? (r.bindBuffer(r.ARRAY_BUFFER, o.positionBuffer), r.enableVertexAttribArray(this.program.aPosition), r.vertexAttribPointer(this.program.aPosition, 2, r.FLOAT, !1, 0, 0), r.bindBuffer(r.ARRAY_BUFFER, o.colorBuffer), r.enableVertexAttribArray(this.program.aColor), r.vertexAttribPointer(this.program.aColor, 4, r.UNSIGNED_BYTE, !0, 0, 0), r.drawArrays(t, 0, o.vertexCount), i += o.primitiveCount) : a += o.primitiveCount;
		return {
			visible: i,
			culled: a
		};
	}
	scheduleRender() {
		this.rafHandle ||= window.requestAnimationFrame(() => {
			this.rafHandle = 0, this.renderNow();
		});
	}
	cancelScheduledRender() {
		this.rafHandle &&= (window.cancelAnimationFrame(this.rafHandle), 0);
	}
	renderOverlay(e) {
		var t;
		let n = this.overlayCtx, r = this.overlayCanvas;
		!n || !r || (n.save(), n.setTransform(this.dpr, 0, 0, this.dpr, 0, 0), n.clearRect(0, 0, this.cssWidth, this.cssHeight), this.opts.showPageBounds && (t = this.document?.pages) != null && t.length && this.drawPageBoundsOverlay(n), this.scene && (this.drawImagesOverlay(n, this.scene.imageItems, e), this.drawTextOverlay(n, this.scene.textItems, e)), n.restore());
	}
	drawPageBoundsOverlay(e) {
		var t;
		if ((t = this.document?.pages) != null && t.length) {
			e.save(), e.strokeStyle = "rgba(148, 163, 184, 0.34)", e.lineWidth = 1, e.setLineDash([8, 6]);
			for (let t of this.document.pages) {
				let n = this.worldToScreen({
					x: 0,
					y: 0
				}), r = this.worldToScreen({
					x: t.width,
					y: t.height
				});
				e.strokeRect(Math.min(n.x, r.x), Math.min(n.y, r.y), Math.abs(r.x - n.x), Math.abs(r.y - n.y));
			}
			e.restore();
		}
	}
	drawTextOverlay(e, t, n) {
		let r = this.opts.maxVisibleTextLabels, i = 0;
		for (let a of t) {
			if (i >= r) break;
			if (!xp(a.bounds, n)) continue;
			let t = Math.abs(a.height) * this.view.scale;
			if (t < this.opts.textMinPixelHeight) continue;
			let o = this.worldToScreen(a.point);
			if (o.x < -512 || o.y < -512 || o.x > this.cssWidth + 512 || o.y > this.cssHeight + 512) continue;
			e.save(), e.translate(o.x, o.y), e.rotate(-a.rotation), e.scale((a.generationFlag & 2 ? -1 : 1) * a.xScale, a.generationFlag & 4 ? -1 : 1);
			let s = Math.max(4, Math.min(256, t));
			e.font = `${s}px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`, e.fillStyle = a.color, e.globalAlpha = a.opacity, e.textAlign = a.halign === 1 || a.halign === 4 ? "center" : a.halign === 2 ? "right" : "left", e.textBaseline = a.valign === 1 ? "bottom" : a.valign === 2 ? "middle" : a.valign === 3 ? "top" : "alphabetic";
			for (let [t, n] of a.text.split(/\r?\n/g).entries()) e.fillText(n, 0, t * s * 1.22);
			e.restore(), i++;
		}
	}
	drawImagesOverlay(e, t, n) {
		for (let r of t) {
			if (!xp(r.bounds, n)) continue;
			let t = this.worldToScreen(r.point), i = this.worldToScreen({
				x: r.point.x + r.width,
				y: r.point.y - r.height
			}), a = Math.min(t.x, i.x), o = Math.min(t.y, i.y), s = Math.abs(i.x - t.x), c = Math.abs(i.y - t.y);
			if (!(s < 1 || c < 1)) {
				if (r.source) {
					let t = this.getImage(r.source);
					if (t.complete && t.naturalWidth > 0) {
						e.save(), e.globalAlpha = r.opacity, e.drawImage(t, a, o, s, c), e.restore();
						continue;
					}
					t.onload = () => this.scheduleRender();
				}
				this.opts.showImagePlaceholders && (e.save(), e.strokeStyle = r.color, e.globalAlpha = r.opacity, e.lineWidth = 1, e.strokeRect(a, o, s, c), e.beginPath(), e.moveTo(a, o), e.lineTo(a + s, o + c), e.moveTo(a + s, o), e.lineTo(a, o + c), e.stroke(), e.restore());
			}
		}
	}
	getImage(e) {
		let t = this.imageCache.get(e);
		return t || (t = new Image(), t.src = e, this.imageCache.set(e, t)), t;
	}
	createOverlayCanvas() {
		let e = this.canvas.parentElement;
		if (!e || typeof document > "u") return;
		window.getComputedStyle(e).position === "static" && (e.style.position = "relative");
		let t = document.createElement("canvas");
		t.className = "cad-viewer-text-overlay", t.setAttribute("aria-hidden", "true"), t.style.position = "absolute", t.style.inset = "0", t.style.width = "100%", t.style.height = "100%", t.style.pointerEvents = "none", t.style.zIndex = "1";
		let n = t.getContext("2d");
		n && (e.appendChild(t), this.overlayCanvas = t, this.overlayCtx = n);
	}
	resizeOverlay(e, t) {
		this.overlayCanvas && (this.overlayCanvas.width !== e || this.overlayCanvas.height !== t) && (this.overlayCanvas.width = e, this.overlayCanvas.height = t);
	}
	bindEvents() {
		let e = this.eventController.signal;
		this.canvas.addEventListener("wheel", (e) => {
			e.preventDefault();
			let t = e.deltaY < 0 ? this.opts.wheelZoomFactor : 1 / this.opts.wheelZoomFactor;
			this.zoom(t, {
				x: e.offsetX,
				y: e.offsetY
			});
		}, {
			passive: !1,
			signal: e
		}), this.canvas.addEventListener("pointerdown", (e) => {
			this.canvas.setPointerCapture(e.pointerId), this.isDragging = !0, this.lastPointer = {
				x: e.clientX,
				y: e.clientY
			}, this.canvas.classList.add("is-dragging");
		}, { signal: e }), this.canvas.addEventListener("pointermove", (e) => {
			!this.isDragging || !this.lastPointer || (this.panByScreenDelta(e.clientX - this.lastPointer.x, e.clientY - this.lastPointer.y), this.lastPointer = {
				x: e.clientX,
				y: e.clientY
			});
		}, { signal: e });
		let t = (e) => {
			e && this.canvas.hasPointerCapture(e.pointerId) && this.canvas.releasePointerCapture(e.pointerId), this.isDragging = !1, this.lastPointer = void 0, this.canvas.classList.remove("is-dragging");
		};
		this.canvas.addEventListener("pointerup", t, { signal: e }), this.canvas.addEventListener("pointercancel", () => t(), { signal: e }), this.canvas.addEventListener("webglcontextlost", (e) => {
			e.preventDefault(), this.cancelScheduledRender();
		}, { signal: e });
	}
	visibleWorldBounds() {
		let e = this.cssWidth / Math.max(this.view.scale, 1e-12) / 2, t = this.cssHeight / Math.max(this.view.scale, 1e-12) / 2;
		return {
			minX: this.view.centerX - e,
			maxX: this.view.centerX + e,
			minY: this.view.centerY - t,
			maxY: this.view.centerY + t
		};
	}
	get cssWidth() {
		return this.canvas.clientWidth || 1;
	}
	get cssHeight() {
		return this.canvas.clientHeight || 1;
	}
	clampScale(e) {
		return Math.min(this.opts.maxScale, Math.max(this.opts.minScale, e));
	}
	boundsOptions() {
		return {
			maxInsertDepth: this.opts.maxInsertDepth,
			maxCurveSegments: this.opts.maxCurveSegments
		};
	}
	disposeScene() {
		if (!this.scene) return;
		let e = this.gl;
		for (let t of [
			...this.scene.lineBatches,
			...this.scene.triangleBatches,
			...this.scene.lineTypePointBatches,
			...this.scene.pointBatches
		]) e.deleteBuffer(t.positionBuffer), e.deleteBuffer(t.colorBuffer);
		this.scene = void 0;
	}
	emitViewChange() {
		var e;
		(e = this.onViewChange) == null || e.call(this, {
			view: this.getViewState(),
			fitScale: this.fitScale,
			zoomRatio: this.getZoomRatio(),
			zoomPercent: this.getZoomPercent(),
			bounds: this.getBounds()
		});
	}
};
function rp() {
	if (typeof document > "u") return !1;
	let e = document.createElement("canvas");
	return !!(e.getContext("webgl2") ?? e.getContext("webgl") ?? e.getContext("experimental-webgl"));
}
function ip(e, t) {
	let n = {
		alpha: !1,
		antialias: t.antialias ?? !0,
		depth: !1,
		stencil: !1,
		preserveDrawingBuffer: t.preserveDrawingBuffer ?? !1,
		powerPreference: t.powerPreference ?? "high-performance"
	};
	return e.getContext("webgl2", n) ?? e.getContext("webgl", n) ?? e.getContext("experimental-webgl", n) ?? void 0;
}
function ap(e) {
	let t = op(e, e.VERTEX_SHADER, "\n    attribute vec2 a_position;\n    attribute vec4 a_color;\n    uniform vec2 u_viewCenter;\n    uniform float u_scale;\n    uniform vec2 u_viewport;\n    uniform float u_pointSize;\n    varying vec4 v_color;\n    void main() {\n      vec2 screen = vec2(\n        u_viewport.x * 0.5 + (a_position.x - u_viewCenter.x) * u_scale,\n        u_viewport.y * 0.5 - (a_position.y - u_viewCenter.y) * u_scale\n      );\n      vec2 clip = vec2(screen.x / u_viewport.x * 2.0 - 1.0, 1.0 - screen.y / u_viewport.y * 2.0);\n      gl_Position = vec4(clip, 0.0, 1.0);\n      gl_PointSize = u_pointSize;\n      v_color = a_color;\n    }\n  "), n = op(e, e.FRAGMENT_SHADER, "\n    precision mediump float;\n    varying vec4 v_color;\n    void main() {\n      gl_FragColor = v_color;\n    }\n  "), r = e.createProgram();
	if (!r) throw Error("Failed to create WebGL program.");
	if (e.attachShader(r, t), e.attachShader(r, n), e.linkProgram(r), !e.getProgramParameter(r, e.LINK_STATUS)) {
		let t = e.getProgramInfoLog(r) ?? "Unknown WebGL program link error.";
		throw e.deleteProgram(r), Error(t);
	}
	e.deleteShader(t), e.deleteShader(n);
	let i = e.getUniformLocation(r, "u_viewCenter"), a = e.getUniformLocation(r, "u_scale"), o = e.getUniformLocation(r, "u_viewport"), s = e.getUniformLocation(r, "u_pointSize");
	if (!i || !a || !o || !s) throw Error("Failed to resolve WebGL shader uniforms.");
	return {
		program: r,
		aPosition: e.getAttribLocation(r, "a_position"),
		aColor: e.getAttribLocation(r, "a_color"),
		uViewCenter: i,
		uScale: a,
		uViewport: o,
		uPointSize: s
	};
}
function op(e, t, n) {
	let r = e.createShader(t);
	if (!r) throw Error("Failed to create WebGL shader.");
	if (e.shaderSource(r, n), e.compileShader(r), !e.getShaderParameter(r, e.COMPILE_STATUS)) {
		let t = e.getShaderInfoLog(r) ?? "Unknown WebGL shader compile error.";
		throw e.deleteShader(r), Error(t);
	}
	return r;
}
function sp(e, t) {
	let n = 0, r = (t) => t.map((t) => {
		let r = cp(e, t.positions), i = cp(e, t.colors), a = t.positions.byteLength + t.colors.byteLength;
		return n += a, {
			positionBuffer: r,
			colorBuffer: i,
			vertexCount: t.positions.length / 2,
			primitiveCount: t.primitiveCount,
			bounds: t.bounds,
			gpuBytes: a
		};
	}), i = r(t.lineBatches), a = r(t.triangleBatches), o = r(t.lineTypePointBatches), s = r(t.pointBatches);
	return {
		origin: t.origin,
		lineBatches: i,
		triangleBatches: a,
		lineTypePointBatches: o,
		pointBatches: s,
		textItems: t.textItems,
		imageItems: t.imageItems,
		stats: t.stats,
		primitiveCount: t.primitiveCount,
		gpuMemoryBytes: n,
		buildElapsedMs: t.buildElapsedMs
	};
}
function cp(e, t) {
	let n = e.createBuffer();
	if (!n) throw Error("Failed to create WebGL buffer.");
	return e.bindBuffer(e.ARRAY_BUFFER, n), e.bufferData(e.ARRAY_BUFFER, t, e.STATIC_DRAW), n;
}
function lp(e, t, n) {
	let r = performance.now(), i = new up(e, t, n, gs(n) ? {
		x: (n.minX + n.maxX) / 2,
		y: (n.minY + n.maxY) / 2
	} : {
		x: 0,
		y: 0
	});
	for (let t of e.entities) i.addEntityTracked(t, 0);
	let a = i.finalize();
	return a.buildElapsedMs = performance.now() - r, a;
}
var up = class {
	constructor(e, t, n, r) {
		L(this, "document"), L(this, "opts"), L(this, "bounds"), L(this, "origin"), L(this, "lineBuckets", /* @__PURE__ */ new Map()), L(this, "triangleBuckets", /* @__PURE__ */ new Map()), L(this, "lineTypePointBuckets", /* @__PURE__ */ new Map()), L(this, "pointBuckets", /* @__PURE__ */ new Map()), L(this, "textItems", []), L(this, "imageItems", []), L(this, "stats", {
			total: 0,
			drawn: 0,
			skipped: 0,
			byType: {},
			unsupported: {},
			backend: "webgl",
			primitiveCount: 0,
			visiblePrimitiveCount: 0,
			culledPrimitiveCount: 0,
			gpuMemoryBytes: 0,
			buildElapsedMs: 0
		}), L(this, "tileSize"), L(this, "maxVerticesPerBatch"), L(this, "primitiveCount", 0), this.document = e, this.opts = t, this.bounds = n, this.origin = r;
		let i = gs(n) ? Math.max(n.maxX - n.minX, n.maxY - n.minY, 1e-9) : 1;
		this.tileSize = t.enableSpatialIndex ? i / Math.max(8, t.spatialIndexCellCount) : Infinity, this.maxVerticesPerBatch = Math.max(4096, Math.floor(t.maxVerticesPerBatch));
	}
	addEntityTracked(e, t) {
		this.stats.total++;
		let n = String(e.type ?? "UNKNOWN").toUpperCase();
		this.stats.byType[n] = (this.stats.byType[n] ?? 0) + 1;
		let r = this.lookupLayer(e.layer);
		e.isVisible === !1 || !Ud(r) ? this.stats.skipped++ : this.addEntity(e, n, t);
	}
	finalize() {
		let e = pp(this.lineBuckets, this.maxVerticesPerBatch), t = pp(this.triangleBuckets, this.maxVerticesPerBatch), n = pp(this.lineTypePointBuckets, this.maxVerticesPerBatch), r = pp(this.pointBuckets, this.maxVerticesPerBatch);
		return this.stats.primitiveCount = this.primitiveCount, {
			origin: this.origin,
			lineBatches: e,
			triangleBatches: t,
			lineTypePointBatches: n,
			pointBatches: r,
			textItems: this.textItems,
			imageItems: this.imageItems,
			stats: this.stats,
			primitiveCount: this.primitiveCount,
			buildElapsedMs: 0
		};
	}
	addEntity(e, t, n) {
		switch (e.kind ?? Wo(t)) {
			case "line": return this.addLineEntity(e);
			case "circle": return this.addCircleEntity(e);
			case "arc": return this.addArcEntity(e);
			case "polyline": return this.addPolylineEntity(e);
			case "ellipse": return this.addEllipseEntity(e);
			case "text": return this.addTextEntity(e);
			case "point": return this.addPointEntity(e);
			case "insert": return this.addInsertEntity(e, n);
			case "solid": return this.addSolidEntity(e);
			case "hatch": return this.addHatchEntity(e);
			case "spline": return this.addSplineEntity(e);
			case "path": return this.addPathEntity(e);
			case "image": return this.addImageEntity(e);
			case "viewport": return this.markSkipped(t);
			default: this.stats.unsupported[t] = (this.stats.unsupported[t] ?? 0) + 1, this.stats.skipped++, this.opts.showUnsupportedMarkers && this.addUnsupportedMarker(e);
		}
	}
	addLineEntity(e) {
		if (!H(e.startPoint) || !H(e.endPoint)) return this.markSkipped("LINE");
		this.addPolyline([e.startPoint, e.endPoint], !1, this.strokeBytes(e), e), this.stats.drawn++;
	}
	addCircleEntity(e) {
		let t = e.center, n = Number(e.radius);
		if (!H(t) || !Number.isFinite(n)) return this.markSkipped("CIRCLE");
		let r = Math.max(16, Math.min(this.opts.maxCurveSegments, Math.ceil(Math.sqrt(Math.abs(n)) * 12))), i = xs(t, n, 0, Math.PI * 2, !0, r);
		this.addPolyline(i, !0, this.strokeBytes(e), e), this.stats.drawn++;
	}
	addArcEntity(e) {
		let t = e.center, n = Number(e.radius), r = Number(e.startAngle), i = Number(e.endAngle);
		if (!H(t) || !Number.isFinite(n) || !Number.isFinite(r) || !Number.isFinite(i)) return this.markSkipped("ARC");
		this.addPolyline(xs(t, n, r, i, !0, this.opts.maxCurveSegments), !1, this.strokeBytes(e), e), this.stats.drawn++;
	}
	addPolylineEntity(e) {
		let t = e.vertices ?? e.points;
		if (!Array.isArray(t) || t.length < 2) return this.markSkipped(String(e.type));
		let n = Yo(e), r = [], i = n ? t.length : t.length - 1;
		for (let e = 0; e < i; e++) {
			let n = t[e], i = t[(e + 1) % t.length];
			if (!H(n) || !H(i)) continue;
			let a = Cs(n, i, Number(n.bulge ?? 0), Math.max(4, Math.min(24, this.opts.maxCurveSegments / 4)));
			r.length > 0 && a.shift(), r.push(...a);
		}
		if (r.length < 2) return this.markSkipped(String(e.type));
		this.addPolyline(r, n, this.strokeBytes(e), e), this.stats.drawn++;
	}
	addEllipseEntity(e) {
		if (!H(e.center) || !H(e.majorAxisEndPoint)) return this.markSkipped("ELLIPSE");
		let t = Ss(e.center, e.majorAxisEndPoint, Number(e.axisRatio ?? 1), Number(e.startAngle ?? 0), Number(e.endAngle ?? Math.PI * 2), this.opts.maxCurveSegments), n = Math.abs(Number(e.endAngle ?? Math.PI * 2) - Number(e.startAngle ?? 0)) >= Math.PI * 2 - 1e-6;
		this.addPolyline(t, n, this.strokeBytes(e), e), this.stats.drawn++;
	}
	addTextEntity(e) {
		let t = Number(e.halign ?? 0), n = Number(e.valign ?? 0), r = (t !== 0 || n !== 0) && H(e.endPoint) ? e.endPoint : e.insertionPoint ?? e.startPoint ?? e.center, i = ws(String(e.text ?? e.value ?? "")), a = Number(e.textHeight ?? e.height ?? 1);
		if (!H(r) || !i || !Number.isFinite(a)) return this.markSkipped(String(e.type));
		let o = U(r), s = Number(e.xScale ?? 1), c = Number.isFinite(s) && Math.abs(s) > 1e-9 ? Math.abs(s) : 1, l = Math.max(1, i.split(/\r?\n/g).reduce((e, t) => Math.max(e, t.length), 0)) * Math.abs(a) * .62 * c, u = Math.max(1, i.split(/\r?\n/g).length) * Math.abs(a) * 1.22;
		this.textItems.push({
			point: o,
			text: i,
			height: a,
			rotation: Number(e.rotation ?? 0),
			xScale: c,
			generationFlag: Number(e.generationFlag ?? 0),
			halign: t,
			valign: n,
			color: Ld(e, this.document, this.colorOptions()),
			opacity: Ts(Number(e.opacity ?? 1), 0, 1),
			bounds: {
				minX: o.x - l,
				minY: o.y - u,
				maxX: o.x + l,
				maxY: o.y + u
			}
		}), this.stats.drawn++;
	}
	addPointEntity(e) {
		let t = e.point ?? e.location ?? e.center ?? e.insertionPoint;
		if (!H(t)) return this.markSkipped("POINT");
		this.addPoint(t, this.strokeBytes(e)), this.stats.drawn++;
	}
	addInsertEntity(e, t) {
		let n = this.lookupBlock(e.blockName ?? e.name);
		if (n && t < this.opts.maxInsertDepth) {
			let r = pf(e, n.basePoint ?? {
				x: 0,
				y: 0
			});
			for (let i of n.entities) {
				let n = If(Kd(i, e, this.document, this.colorOptions()), e, this.document);
				this.addEntityTracked(mf(n, r), t + 1);
			}
			return;
		}
		let r = e.insertionPoint;
		if (!H(r)) return this.markSkipped("INSERT");
		if (this.addPoint(r, this.strokeBytes(e)), Array.isArray(e.attribs)) for (let t of e.attribs) this.addTextEntity(t);
		this.stats.drawn++;
	}
	addSolidEntity(e) {
		let t = e.vertices ?? e.points;
		if (!Array.isArray(t) || t.length < 3) return this.markSkipped(String(e.type));
		let n = t.filter(H).map(U);
		if (n.length < 3) return this.markSkipped(String(e.type));
		let r = this.fillBytes(e) ?? this.strokeBytes(e);
		this.addTriangleFan(n, r), this.addPolyline(n, !0, this.strokeBytes(e), e), this.stats.drawn++;
	}
	addHatchEntity(e) {
		var t;
		let n = e.loops;
		if (!Array.isArray(n) || n.length === 0) return this.markSkipped("HATCH");
		let r = this.strokeBytes(e), i = this.fillBytes(e), a = !1;
		for (let o of n) {
			let n = (t = o.commands) != null && t.length ? hp(o.commands, this.opts.maxCurveSegments) : (o.vertices ?? []).filter(H).map(U);
			n.length < 2 || (this.addPolyline(n, !0, r, e), i && n.length >= 3 && this.addTriangleFan(n, i), a = !0);
		}
		if (!a) return this.markSkipped("HATCH");
		this.stats.drawn++;
	}
	addSplineEntity(e) {
		var t;
		let n = (t = e.fitPoints) != null && t.length ? e.fitPoints : e.controlPoints;
		if (!n || n.length < 2) return this.markSkipped("SPLINE");
		this.addPolyline(n.filter(H).map(U), !!e.isClosed, this.strokeBytes(e), e), this.stats.drawn++;
	}
	addPathEntity(e) {
		var t;
		if (!((t = e.commands) != null && t.length)) return this.markSkipped(String(e.type));
		let n = hp(e.commands, this.opts.maxCurveSegments);
		if (n.length < 2) return this.markSkipped(String(e.type));
		this.addPolyline(n, !1, this.strokeBytes(e), e);
		let r = this.fillBytes(e);
		r && n.length >= 3 && this.addTriangleFan(n, r), this.stats.drawn++;
	}
	addImageEntity(e) {
		let t = e.insertionPoint;
		if (!H(t)) return this.markSkipped(String(e.type));
		let n = Number(e.width ?? 32), r = Number(e.height ?? 32);
		if (!Number.isFinite(n) || !Number.isFinite(r)) return this.markSkipped(String(e.type));
		let i = U(t), a = _p([i, {
			x: i.x + n,
			y: i.y - r
		}]);
		this.imageItems.push({
			point: i,
			width: n,
			height: r,
			source: e.imageDataUrl ?? e.imageSource,
			color: Ld(e, this.document, this.colorOptions()),
			opacity: Ts(Number(e.opacity ?? 1), 0, 1),
			bounds: a
		}), this.stats.drawn++;
	}
	addUnsupportedMarker(e) {
		let t = gp(e);
		t && this.addPoint(t, this.strokeBytes(e));
	}
	addPolyline(e, t, n, r) {
		let i = e.filter(H).map(U);
		if (i.length < 2 || (t && vp(i[0], i[i.length - 1]) && i.pop(), i.length < 2)) return;
		let a = r ? Xo(r) : 0, o = r ? Rf(r, this.document) : void 0;
		if (o) {
			let e = zf(i, t, o), r = [...e.dots];
			for (let [t, r] of e.segments) this.addSegment(t, r, n), a > 1e-9 && this.addWideSegment(t, r, a, n, !0);
			for (let t of e.markers ?? []) {
				let e = this.resolveLineTypeGlyph(t);
				if (!e) continue;
				yp(r, t.fallbackPoint);
				let i = !1;
				for (let r of Vf(t, e)) for (let e = 0; e < r.length - 1; e++) this.addSegment(r[e], r[e + 1], n), i = !0;
				i || r.push(t.point);
			}
			for (let e of r) this.addLineTypePoint(e, n);
		} else {
			for (let e = 0; e < i.length - 1; e++) this.addSegment(i[e], i[e + 1], n);
			t && this.addSegment(i[i.length - 1], i[0], n), a > 1e-9 && this.addWidePolyline(i, t, a, n);
		}
	}
	addWidePolyline(e, t, n, r) {
		for (let t = 0; t < e.length - 1; t++) this.addWideSegment(e[t], e[t + 1], n, r, !1);
		t && this.addWideSegment(e[e.length - 1], e[0], n, r, !1);
		for (let t of e) this.addWideDisc(t, n / 2, r);
	}
	addWideSegment(e, t, n, r, i) {
		let a = t.x - e.x, o = t.y - e.y, s = Math.hypot(a, o);
		if (!Number.isFinite(s) || s <= 1e-14) return;
		let c = Math.abs(n) / 2, l = -o / s * c, u = a / s * c;
		this.addTriangleFan([
			{
				x: e.x + l,
				y: e.y + u
			},
			{
				x: t.x + l,
				y: t.y + u
			},
			{
				x: t.x - l,
				y: t.y - u
			},
			{
				x: e.x - l,
				y: e.y - u
			}
		], r), i && (this.addWideDisc(e, c, r), this.addWideDisc(t, c, r));
	}
	addWideDisc(e, t, n) {
		if (!Number.isFinite(t) || t <= 1e-9) return;
		let r = [];
		for (let n = 0; n < 8; n++) {
			let i = n / 8 * Math.PI * 2;
			r.push({
				x: e.x + Math.cos(i) * t,
				y: e.y + Math.sin(i) * t
			});
		}
		this.addTriangleFan([
			e,
			...r,
			r[0]
		], n);
	}
	addSegment(e, t, n) {
		if (!H(e) || !H(t) || Math.hypot(e.x - t.x, e.y - t.y) <= 1e-14) return;
		let r = this.batchFor(this.lineBuckets, _p([e, t]));
		fp(r, e, n, this.origin), fp(r, t, n, this.origin), r.primitiveCount++, this.primitiveCount++;
	}
	addPoint(e, t) {
		let n = this.batchFor(this.pointBuckets, bp(e));
		fp(n, e, t, this.origin), n.primitiveCount++, this.primitiveCount++;
	}
	addLineTypePoint(e, t) {
		let n = this.batchFor(this.lineTypePointBuckets, bp(e));
		fp(n, e, t, this.origin), n.primitiveCount++, this.primitiveCount++;
	}
	resolveLineTypeGlyph(e) {
		return e.kind === "shape" ? this.opts.shxGlyphResolver.resolveShape(Number(e.shapeNumber), e.fontName) : this.opts.shxGlyphResolver.resolveText(String(e.text ?? ""), e.fontName);
	}
	addTriangleFan(e, t) {
		let n = e.filter(H).map(U);
		if (n.length < 3) return;
		let r = _p(n), i = this.batchFor(this.triangleBuckets, r);
		for (let e = 1; e < n.length - 1; e++) fp(i, n[0], t, this.origin), fp(i, n[e], t, this.origin), fp(i, n[e + 1], t, this.origin), i.primitiveCount++, this.primitiveCount++;
	}
	batchFor(e, t) {
		let n = this.bucketKey(t), r = e.get(n);
		return r || (r = dp(), e.set(n, r)), V(r.bounds, {
			x: t.minX,
			y: t.minY
		}), V(r.bounds, {
			x: t.maxX,
			y: t.maxY
		}), r;
	}
	bucketKey(e) {
		if (!Number.isFinite(this.tileSize)) return "all";
		let t = (e.minX + e.maxX) / 2, n = (e.minY + e.maxY) / 2;
		return `${Math.floor((t - this.bounds.minX) / this.tileSize)}:${Math.floor((n - this.bounds.minY) / this.tileSize)}`;
	}
	strokeBytes(e) {
		return Tp(Ld(e, this.document, this.colorOptions()), [
			255,
			255,
			255,
			255
		], Ts(Number(e.opacity ?? 1), 0, 1));
	}
	fillBytes(e) {
		let t = Rd(e, this.document, this.colorOptions());
		return t ? Tp(t, [
			255,
			255,
			255,
			255
		], Ts(Number(e.opacity ?? 1), 0, 1)) : void 0;
	}
	colorOptions() {
		return {
			foreground: this.opts.foreground,
			background: this.opts.background,
			trueColorByteOrder: this.opts.trueColorByteOrder,
			contrastMode: this.opts.contrastMode,
			minColorContrast: this.opts.minColorContrast
		};
	}
	markSkipped(e) {
		this.stats.skipped++, this.stats.unsupported[e] = this.stats.unsupported[e] ?? 0;
	}
	lookupLayer(e) {
		if (e) return this.document.layers[e] ?? this.document.layers[e.toLowerCase()] ?? Object.values(this.document.layers).find((t) => t.name.toLowerCase() === e.toLowerCase());
	}
	lookupBlock(e) {
		if (e) return this.document.blocks[e] ?? this.document.blocks[e.toLowerCase()] ?? Object.values(this.document.blocks).find((t) => t.name.toLowerCase() === e.toLowerCase());
	}
};
function dp() {
	return {
		positions: [],
		colors: [],
		bounds: hs(),
		primitiveCount: 0
	};
}
function fp(e, t, n, r) {
	e.positions.push(t.x - r.x, t.y - r.y), e.colors.push(n[0], n[1], n[2], n[3]);
}
function pp(e, t) {
	let n = [];
	for (let r of e.values()) {
		let e = r.positions.length / 2;
		if (e <= 0 || !gs(r.bounds)) continue;
		if (e <= t) {
			n.push({
				positions: new Float32Array(r.positions),
				colors: new Uint8Array(r.colors),
				bounds: { ...r.bounds },
				primitiveCount: r.primitiveCount
			});
			continue;
		}
		let i = mp(r), a = Math.max(i, Math.floor(t / i) * i);
		for (let t = 0; t < e; t += a) {
			let o = Math.min(e, t + a), s = r.positions.slice(t * 2, o * 2), c = r.colors.slice(t * 4, o * 4), l = hs();
			for (let e = 0; e < s.length; e += 2) V(l, {
				x: s[e],
				y: s[e + 1]
			});
			n.push({
				positions: new Float32Array(s),
				colors: new Uint8Array(c),
				bounds: { ...r.bounds },
				primitiveCount: Math.floor((o - t) / i)
			});
		}
	}
	return n;
}
function mp(e) {
	let t = e.positions.length / 2;
	return t === e.primitiveCount ? 1 : t === e.primitiveCount * 3 ? 3 : 2;
}
function hp(e, t) {
	let n = [], r, i, a = (e) => {
		(!n.length || Math.hypot(n[n.length - 1].x - e.x, n[n.length - 1].y - e.y) > 1e-12) && n.push(U(e)), r = U(e);
	};
	for (let n of e) if (n.cmd === "M") r = U(n.points[0]), i = r, a(r);
	else if (n.cmd === "L") a(n.points[0]);
	else if (n.cmd === "Q" && r && n.points.length >= 2) {
		let e = r, [i, o] = n.points, s = Math.max(4, Math.min(t, 24));
		for (let t = 1; t <= s; t++) {
			let n = t / s, r = 1 - n;
			a({
				x: r * r * e.x + 2 * r * n * i.x + n * n * o.x,
				y: r * r * e.y + 2 * r * n * i.y + n * n * o.y
			});
		}
	} else if (n.cmd === "C" && r && n.points.length >= 3) {
		let e = r, [i, o, s] = n.points, c = Math.max(6, Math.min(t, 32));
		for (let t = 1; t <= c; t++) {
			let n = t / c, r = 1 - n;
			a({
				x: r ** 3 * e.x + 3 * r * r * n * i.x + 3 * r * n * n * o.x + n ** 3 * s.x,
				y: r ** 3 * e.y + 3 * r * r * n * i.y + 3 * r * n * n * o.y + n ** 3 * s.y
			});
		}
	} else n.cmd === "Z" && i && a(i);
	return n;
}
function gp(e) {
	for (let t of [
		"startPoint",
		"insertionPoint",
		"center",
		"point",
		"location"
	]) {
		let n = e[t];
		if (H(n)) return U(n);
	}
	if (Array.isArray(e.vertices) && H(e.vertices[0])) return U(e.vertices[0]);
	if (Array.isArray(e.commands) && e.commands.length) {
		let t = e.commands.find((e) => e.points.length > 0);
		if (t) return U(t.points[0]);
	}
}
function _p(e) {
	let t = hs();
	for (let n of e) V(t, n);
	return t;
}
function vp(e, t) {
	let n = Math.max(1, Math.abs(e.x), Math.abs(e.y), Math.abs(t.x), Math.abs(t.y));
	return Math.hypot(e.x - t.x, e.y - t.y) <= Math.max(1e-9, n * 1e-12);
}
function yp(e, t) {
	let n = e.findIndex((e) => vp(e, t));
	n >= 0 && e.splice(n, 1);
}
function bp(e) {
	return {
		minX: e.x,
		minY: e.y,
		maxX: e.x,
		maxY: e.y
	};
}
function xp(e, t) {
	return e.minX <= t.maxX && e.maxX >= t.minX && e.minY <= t.maxY && e.maxY >= t.minY;
}
function Sp(e, t) {
	return t.trueColorByteOrder !== void 0 && t.trueColorByteOrder !== e.trueColorByteOrder || t.contrastMode !== void 0 && t.contrastMode !== e.contrastMode || t.minColorContrast !== void 0 && t.minColorContrast !== e.minColorContrast || t.foreground !== void 0 && t.foreground !== e.foreground || t.background !== void 0 && t.background !== e.background || t.maxInsertDepth !== void 0 && t.maxInsertDepth !== e.maxInsertDepth || t.maxCurveSegments !== void 0 && t.maxCurveSegments !== e.maxCurveSegments || t.spatialIndexCellCount !== void 0 && t.spatialIndexCellCount !== e.spatialIndexCellCount || t.maxVerticesPerBatch !== void 0 && t.maxVerticesPerBatch !== e.maxVerticesPerBatch || t.enableSpatialIndex !== void 0 && t.enableSpatialIndex !== e.enableSpatialIndex || t.shxGlyphResolver !== void 0 && t.shxGlyphResolver !== e.shxGlyphResolver;
}
function Cp(e, t) {
	return {
		...e.stats,
		renderElapsedMs: t,
		backend: "webgl",
		primitiveCount: e.primitiveCount,
		visiblePrimitiveCount: 0,
		culledPrimitiveCount: 0,
		gpuMemoryBytes: e.gpuMemoryBytes,
		buildElapsedMs: e.buildElapsedMs
	};
}
function wp(e) {
	return {
		total: e.total,
		drawn: e.drawn,
		skipped: e.skipped,
		byType: { ...e.byType },
		unsupported: { ...e.unsupported },
		renderElapsedMs: e.renderElapsedMs,
		backend: e.backend,
		primitiveCount: e.primitiveCount,
		visiblePrimitiveCount: e.visiblePrimitiveCount,
		culledPrimitiveCount: e.culledPrimitiveCount,
		gpuMemoryBytes: e.gpuMemoryBytes,
		buildElapsedMs: e.buildElapsedMs
	};
}
function Tp(e, t, n = 1) {
	let r = e.trim().toLowerCase(), i;
	if (/^#[0-9a-f]{3}$/i.test(r)) i = [
		parseInt(r[1] + r[1], 16),
		parseInt(r[2] + r[2], 16),
		parseInt(r[3] + r[3], 16),
		255
	];
	else if (/^#[0-9a-f]{6}$/i.test(r)) i = [
		parseInt(r.slice(1, 3), 16),
		parseInt(r.slice(3, 5), 16),
		parseInt(r.slice(5, 7), 16),
		255
	];
	else {
		let e = r.match(/^rgba?\(([^)]+)\)$/i);
		if (e) {
			let t = e[1].split(/[\s,\/]+/).filter(Boolean), n = t.slice(0, 3).some((e) => e.includes("%")), r = t.map((e) => Number(e.replace("%", "")));
			r.length >= 3 && r.slice(0, 3).every(Number.isFinite) && (i = [
				Ep(n ? r[0] * 2.55 : r[0]),
				Ep(n ? r[1] * 2.55 : r[1]),
				Ep(n ? r[2] * 2.55 : r[2]),
				Ep((Number.isFinite(r[3]) ? r[3] : 1) * 255)
			]);
		}
	}
	let a = i ?? t;
	return [
		a[0],
		a[1],
		a[2],
		Ep(a[3] * n)
	];
}
function Ep(e) {
	return Math.max(0, Math.min(255, Math.round(e)));
}
var Dp = class {
	constructor(e = {}) {
		L(this, "canvas"), L(this, "renderer"), L(this, "registry"), L(this, "nativeHost"), L(this, "options"), L(this, "referenceRegistry", new Cd()), L(this, "shxGlyphResolver"), L(this, "externalShxGlyphResolver"), L(this, "lastResult"), L(this, "activeNativeLoader");
		var t;
		if (this.options = {
			autoFit: !0,
			colorMode: "source",
			...e
		}, this.externalShxGlyphResolver = e.canvasOptions?.shxGlyphResolver, this.shxGlyphResolver = {
			resolveShape: (e, t) => this.referenceRegistry.resolveShape(e, t) ?? this.externalShxGlyphResolver?.resolveShape(e, t),
			resolveText: (e, t) => this.referenceRegistry.resolveText(e, t) ?? this.externalShxGlyphResolver?.resolveText(e, t)
		}, this.registry = e.registry ?? vl(e), e.loaders) for (let t of e.loaders) this.registry.register(t);
		if (this.canvas = e.canvas ?? document.createElement("canvas"), this.canvas.classList.add("cad-viewer-canvas"), e.container) e.container.classList.add("cad-viewer-container"), e.canvas || (this.canvas.style.width = "100%", this.canvas.style.height = "100%", this.canvas.style.display = "block", e.container.appendChild(this.canvas)), this.nativeHost = e.nativeHost ?? document.createElement("div"), this.nativeHost.classList.add("cad-viewer-native-host"), e.nativeHost || e.container.appendChild(this.nativeHost);
		else if (e.nativeHost) this.nativeHost = e.nativeHost, this.nativeHost.classList.add("cad-viewer-native-host");
		else if ((t = e.canvas) != null && t.parentElement) {
			e.canvas.parentElement.classList.add("cad-viewer-container");
			let t = document.createElement("div");
			t.classList.add("cad-viewer-native-host"), e.canvas.parentElement.appendChild(t), this.nativeHost = t;
		}
		this.renderer = jp(e.renderer ?? "auto", this.canvas, {
			...e.canvasOptions,
			shxGlyphResolver: this.shxGlyphResolver
		}), this.renderer.onStats = (e) => {
			var t;
			return (t = this.options).onRenderStats?.call(t, e);
		}, this.renderer.onViewChange = (e) => {
			var t;
			return (t = this.options).onViewChange?.call(t, e);
		};
	}
	registerLoader(e) {
		return this.registry.register(e), this;
	}
	async loadFile(e, t = {}) {
		var n, r;
		return (r = (n = this.options).onLoadStart) == null || r.call(n, e), this.loadThroughRegistry({
			file: e,
			fileName: e.name
		}, t, e.name);
	}
	async loadBuffer(e, t, n = {}) {
		var r, i;
		return (i = (r = this.options).onLoadStart) == null || i.call(r, e), this.loadThroughRegistry({
			buffer: e,
			fileName: t
		}, n, t);
	}
	async load(e, t = {}) {
		var n, r;
		return (r = (n = this.options).onLoadStart) == null || r.call(n, e), this.loadThroughRegistry(e, t, e.fileName ?? e.file?.name);
	}
	async addReference(e) {
		var t, n;
		try {
			let t = await this.referenceRegistry.add(e);
			return this.refreshCurrentReferences(), t;
		} catch (e) {
			let r = kp(e);
			throw (n = (t = this.options).onError) == null || n.call(t, r), r;
		}
	}
	async addReferenceFile(e) {
		return this.addReference({
			file: e,
			fileName: e.name
		});
	}
	async addReferenceBuffer(e, t) {
		return this.addReference({
			buffer: e,
			fileName: t
		});
	}
	removeReference(e) {
		let t = this.referenceRegistry.remove(e);
		return t && this.refreshCurrentReferences(), t;
	}
	clearReferences() {
		this.referenceRegistry.clear(), this.refreshCurrentReferences();
	}
	getReferenceState() {
		return this.referenceRegistry.getState();
	}
	getMissingReferences() {
		return this.getReferenceState().missing;
	}
	getLoadedReferences() {
		return this.getReferenceState().loaded;
	}
	setDocument(e, t) {
		var n, r;
		this.deactivateNativeRenderer(), this.activateDocumentReferences(e);
		let i = {
			document: e,
			raw: e.raw,
			bytes: 0,
			elapsedMs: 0,
			format: e.format,
			warnings: e.warnings,
			summary: Jo(e),
			fileName: t
		};
		return this.renderer.setDocument(this.createRenderDocument(e)), this.options.autoFit || this.renderer.render(), this.lastResult = i, (r = (n = this.options).onLoad) == null || r.call(n, i), i;
	}
	fit(e) {
		var t, n;
		this.activeNativeLoader ? (n = (t = this.activeNativeLoader).fit) == null || n.call(t) : this.renderer.fitToView(.92, e);
	}
	zoomIn() {
		var e, t;
		this.activeNativeLoader ? (t = (e = this.activeNativeLoader).zoomIn) == null || t.call(e) : this.renderer.zoomIn();
	}
	zoomOut() {
		var e, t;
		this.activeNativeLoader ? (t = (e = this.activeNativeLoader).zoomOut) == null || t.call(e) : this.renderer.zoomOut();
	}
	resize() {
		var e, t;
		this.activeNativeLoader ? (t = (e = this.activeNativeLoader).resize) == null || t.call(e) : this.renderer.resize();
	}
	setColorMode(e, t = this.options.monochromeColor) {
		let n = e === "monochrome" ? "monochrome" : "source", r = Op(t);
		n === this.getColorMode() && r === this.getMonochromeColor() || (this.options.colorMode = n, this.options.monochromeColor = r, this.refreshColorPolicy());
	}
	getColorMode() {
		return this.options.colorMode === "monochrome" ? "monochrome" : "source";
	}
	getMonochromeColor() {
		return Op(this.options.monochromeColor);
	}
	setCanvasOptions(e) {
		var t, n;
		this.options.canvasOptions = {
			...this.options.canvasOptions ?? {},
			...e
		}, e.shxGlyphResolver && (this.externalShxGlyphResolver = e.shxGlyphResolver), this.renderer.setOptions({
			...e,
			shxGlyphResolver: this.shxGlyphResolver
		}), this.activeNativeLoader && ((n = (t = this.activeNativeLoader).setNativeOptions) == null || n.call(t, {
			...this.mergeLoadOptions({}),
			dwfBackground: e.background ?? this.options.dwfBackground
		}));
	}
	async preloadDwg(e = {}) {
		let t = this.registry.list().find((e) => e.id === "dwg");
		if (!(t != null && t.preload)) throw Error("The registered DWG loader does not support preload().");
		return t.preload(this.mergeLoadOptions(e));
	}
	clear() {
		this.lastResult = void 0, this.deactivateNativeRenderer(), this.renderer.clear(), this.referenceRegistry.setDocument(void 0), this.emitReferenceState();
	}
	destroy() {
		var e, t, n;
		this.deactivateNativeRenderer();
		for (let r of this.registry.list()) {
			let i = r;
			(e = i.terminateWorker) == null || e.call(i), (t = i.unmount) == null || t.call(i), (n = i.destroy) == null || n.call(i);
		}
		this.referenceRegistry.clear(), this.renderer.destroy();
	}
	getLoadResult() {
		return this.lastResult;
	}
	getDocument() {
		return this.activeNativeLoader ? this.lastResult?.document : this.renderer.getDocument();
	}
	getSourceDocument() {
		return this.lastResult?.document;
	}
	getBom(e = {}) {
		let t = this.getSourceDocument();
		return t ? Sl(t, e) : void 0;
	}
	getZoomPercent() {
		return this.activeNativeLoader ? 100 : this.renderer.getZoomPercent();
	}
	isNativeRendererActive() {
		return !!this.activeNativeLoader;
	}
	async captureCanvas() {
		if (!this.lastResult) throw Error("No CAD document is loaded.");
		if (this.activeNativeLoader) {
			if (!this.activeNativeLoader.captureCanvas) throw Error("The native loader does not support capture.");
			return this.activeNativeLoader.captureCanvas();
		}
		return this.renderer.captureCanvas();
	}
	async loadThroughRegistry(e, t, n) {
		var r, i;
		try {
			let r = this.mergeLoadOptions(t);
			Ap(r.signal);
			let i = await this.registry.detect(e), a = {
				...e,
				buffer: i.bytes
			};
			if (jd(i.loader)) return await this.applyNativeLoadResult(i.loader, a, r, n);
			let o = await i.loader.load(a, r);
			return this.applyLoadResult(o, n);
		} catch (e) {
			let t = kp(e);
			throw (i = (r = this.options).onError) == null || i.call(r, t), t;
		}
	}
	applyLoadResult(e, t) {
		var n, r, i, a;
		this.deactivateNativeRenderer(), (r = (n = this.options).onLoadProgress) == null || r.call(n, {
			phase: "render",
			format: e.format,
			message: "Rendering normalized CAD scene…",
			percent: 96
		}), this.activateDocumentReferences(e.document), e.warnings = e.document.warnings, this.renderer.setDocument(this.createRenderDocument(e.document)), this.options.autoFit || this.renderer.render();
		let o = {
			...e,
			fileName: t,
			summary: Jo(e.document)
		};
		return this.lastResult = o, (a = (i = this.options).onLoad) == null || a.call(i, o), o;
	}
	async applyNativeLoadResult(e, t, n, r) {
		var i, a, o;
		if (!this.nativeHost) throw Error("Native DWF rendering requires CadViewerOptions.container, nativeHost, or a canvas parent element.");
		Ap(n.signal), this.renderer.clear(), (i = this.activeNativeLoader) == null || i.unmount(), this.activeNativeLoader = e, this.canvas.style.display = "none", this.nativeHost.classList.add("is-active");
		try {
			let i = await e.mount(t, this.nativeHost, n);
			Ap(n.signal), this.activateDocumentReferences(i.document), i.warnings = i.document.warnings;
			let s = {
				...i,
				fileName: r,
				summary: Jo(i.document)
			};
			return this.lastResult = s, this.emitNativeRenderStats(i), (o = (a = this.options).onLoad) == null || o.call(a, s), s;
		} catch (e) {
			throw this.deactivateNativeRenderer(), e;
		}
	}
	deactivateNativeRenderer() {
		var e, t;
		!this.activeNativeLoader && !((e = this.nativeHost) != null && e.classList.contains("is-active")) || ((t = this.activeNativeLoader) == null || t.unmount(), this.activeNativeLoader = void 0, this.nativeHost && (this.nativeHost.classList.remove("is-active"), this.nativeHost.replaceChildren())), this.canvas.style.display = "";
	}
	emitNativeRenderStats(e) {
		var t, n;
		let r = e.document.metadata, i = Number(r.nativeRenderStats?.commands ?? e.document.entities.length ?? 0), a = String(r.nativeRenderStats?.backend ?? "webgl").includes("webgl") ? "webgl" : "canvas2d";
		(n = (t = this.options).onRenderStats) == null || n.call(t, {
			total: i,
			drawn: i,
			skipped: 0,
			byType: Jo(e.document).byType,
			unsupported: {},
			renderElapsedMs: e.elapsedMs,
			backend: a,
			primitiveCount: i,
			visiblePrimitiveCount: i,
			culledPrimitiveCount: 0,
			gpuMemoryBytes: void 0,
			buildElapsedMs: e.elapsedMs
		});
	}
	mergeLoadOptions(e) {
		let t = this.options.onProgress, n = e.onProgress;
		return {
			...this.options,
			...e,
			onProgress: (e) => {
				var r, i;
				(i = (r = this.options).onLoadProgress) == null || i.call(r, e), t?.(e), n && n !== t && n(e);
			}
		};
	}
	createRenderDocument(e) {
		return ku(e, {
			mode: this.getColorMode(),
			monochromeColor: this.getMonochromeColor()
		});
	}
	refreshColorPolicy() {
		var e, t;
		if (this.activeNativeLoader) {
			(t = (e = this.activeNativeLoader).setNativeOptions) == null || t.call(e, this.mergeLoadOptions({}));
			return;
		}
		let n = this.lastResult?.document;
		if (!n) return;
		let r = this.renderer.getViewState();
		this.renderer.setDocument(this.createRenderDocument(n)), this.renderer.setViewState(r);
	}
	activateDocumentReferences(e) {
		this.referenceRegistry.setDocument(e), wd(e, this.referenceRegistry.getState()), this.emitReferenceState();
	}
	refreshCurrentReferences() {
		let e = this.lastResult?.document;
		e && (this.referenceRegistry.setDocument(e), wd(e, this.referenceRegistry.getState()), this.lastResult.warnings = e.warnings, this.lastResult.summary = Jo(e), this.activeNativeLoader || this.renderer.refreshReferences()), this.emitReferenceState();
	}
	emitReferenceState() {
		var e, t;
		(t = (e = this.options).onReferenceStateChange) == null || t.call(e, this.referenceRegistry.getState());
	}
};
function Op(e) {
	return typeof e == "string" && e.trim() || void 0;
}
function kp(e) {
	return e instanceof Error ? e : Error(String(e));
}
function Ap(e) {
	if (e != null && e.aborted) throw new DOMException("Loading cancelled.", "AbortError");
}
function jp(e, t, n = {}) {
	if (e === "canvas2d") return new Qf(t, n);
	if (e === "webgl") return new np(t, n);
	if (rp()) try {
		return new np(t, n);
	} catch {}
	return new Qf(t, n);
}
// node_modules/.pnpm/@file-viewer+renderer-cad@3.3.0_three@0.186.1/node_modules/@file-viewer/renderer-cad/dist/export.js
async function Mp(e) {
	let t = e();
	if (!t?.captureCanvas) throw Error("The CAD engine does not support canvas snapshots.");
	let n = await t.captureCanvas();
	if (e() !== t) throw Error("The CAD document changed during export.");
	return n;
}
function Np(e, t = "CAD drawing", n) {
	return {
		includeDocumentStyles: !1,
		getPrintMaskPages: n ? () => [n()] : void 0,
		async toHtml() {
			let n = await Mp(e), r = n.ownerDocument.createElement("img");
			r.src = n.toDataURL("image/png"), r.alt = t, r.width = n.width, r.height = n.height, r.style.cssText = "display:block;max-width:100%;height:auto;margin:0 auto;";
			let i = n.ownerDocument.createElement("div");
			return i.dataset.viewerPrintPageIndex = "0", i.appendChild(r), i.outerHTML;
		}
	};
}
// node_modules/.pnpm/@file-viewer+renderer-cad@3.3.0_three@0.186.1/node_modules/@file-viewer/renderer-cad/dist/cad.js
var Pp = 12e4, Fp = .92, Q = 1e-9, Ip = 8, Lp = .05, Rp = 64, zp = "\n.cad-shell{display:flex;height:100%;min-height:100%;flex-direction:column;background:#f5f7fb;color:#142335;container-type:inline-size;container-name:file-viewer-cad}\n.cad-shell *{box-sizing:border-box}\n.cad-toolbar{display:flex;flex-shrink:0;min-height:48px;align-items:center;justify-content:space-between;gap:16px;padding:0 14px;border-bottom:1px solid rgba(15,23,42,.08);background:#fff}\n.cad-tools,.cad-meta{display:flex;align-items:center;gap:8px}\n.cad-tools{flex-wrap:wrap;padding:6px 0}\n.cad-tools button.cad-export-image{min-width:44px;min-height:40px;padding:0 10px;white-space:nowrap}\n.cad-tools button[hidden]{display:none}\n.cad-tools button:disabled{cursor:not-allowed;opacity:.46}\n.cad-export-error{margin:0;padding:6px 14px;background:#fff4ed;color:#b42318;font-size:12px}\n.cad-export-error[hidden]{display:none}\n.cad-tools button{min-width:34px;min-height:30px;border:0;border-radius:8px;background:rgba(15,23,42,.06);color:#25344c;cursor:pointer;font-weight:800;letter-spacing:0;transition:background-color .18s ease,color .18s ease}\n.cad-tools button:hover{background:rgba(31,150,110,.14);color:#0f8f62}\n.cad-tools button.cad-color-mode{min-width:52px;padding:0 10px;font-size:12px}\n.cad-tools button.cad-color-mode[aria-pressed='true']{background:#0f172a;color:#fff}\n.cad-tools button.cad-color-mode:disabled{cursor:not-allowed;opacity:.46}\n.cad-zoom,.cad-meta span{color:#64748b;font-size:12px;font-weight:800;letter-spacing:0}\n.cad-meta span{border-radius:999px;padding:5px 9px;background:rgba(15,23,42,.06)}\n.cad-body{display:grid;min-height:0;flex:1;grid-template-columns:minmax(176px,236px) minmax(0,1fr) minmax(142px,176px);background:#eef2f7}\n.cad-body.without-layers{grid-template-columns:minmax(0,1fr) minmax(142px,176px)}\n.cad-layers,.cad-inspector{min-height:0;overflow:auto;border-right:1px solid rgba(15,23,42,.08);background:#fff}\n.cad-layers[hidden]{display:none}\n.cad-inspector{border-right:0;border-left:1px solid rgba(15,23,42,.08);padding:14px}\n.cad-layers-head{position:sticky;top:0;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px 12px 9px;border-bottom:1px solid rgba(148,163,184,.16);background:rgba(255,255,255,.96);color:#1f2a3d;font-size:12px;z-index:1}\n.cad-layers-head span{color:#7b8ca5;font-size:11px;font-weight:800;white-space:nowrap}\n.cad-layers-list{display:flex;flex-direction:column;gap:2px;padding:7px 8px 10px}\n.cad-layers button{display:grid;width:100%;min-height:30px;grid-template-columns:14px minmax(0,1fr);align-items:center;gap:7px;border:0;border-radius:6px;background:transparent;color:#25344c;cursor:pointer;font-size:12px;font-weight:700;text-align:left}\n.cad-layers button:hover{background:#f1f5f9}\n.cad-layers button.muted{color:#94a3b8}\n.cad-layers button span:last-child{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n.cad-layer-color{width:8px;height:8px;justify-self:center;border-radius:50%;background:#1f966e;box-shadow:0 0 0 1px rgba(15,23,42,.12),0 0 0 3px rgba(31,150,110,.1)}\n.cad-canvas-wrap{position:relative;min-width:0;min-height:0;overflow:hidden;background:linear-gradient(90deg,rgba(15,23,42,.04) 1px,transparent 1px),linear-gradient(180deg,rgba(15,23,42,.04) 1px,transparent 1px),#f8fafc;background-size:28px 28px}\n.cad-stage{position:relative;width:100%;height:100%;min-height:420px;overflow:hidden}\n.cad-stage canvas{position:absolute;inset:0;display:block;width:100%!important;height:100%!important}\n.cad-native-stage{position:absolute;inset:0;z-index:2;display:none;overflow:hidden}\n.cad-native-stage:not(:empty),.cad-native-stage.is-active{display:block}\n.cad-native-stage *{box-sizing:border-box}\n.dwfv-root{height:100%;min-height:0;display:grid;grid-template-rows:auto 1fr;font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;color:#111827}\n.dwfv-toolbar{display:flex;gap:8px;align-items:center;padding:8px 12px;background:#fff;border-bottom:1px solid #e5e7eb}\n.dwfv-toolbar button,.dwfv-toolbar select{font:inherit}\n.dwfv-workspace{min-height:0;display:grid;grid-template-columns:minmax(220px,300px) 1fr}\n.dwfv-tree{overflow:auto;border-right:1px solid #d6d8dd;background:#fff;font-size:12px;padding:8px}\n.dwfv-tree[style*=\"display: none\"]+.dwfv-stage{grid-column:1/-1}\n.dwfv-tree-header{font-weight:700;margin-bottom:4px}\n.dwfv-tree-stats{color:#6b7280;margin-bottom:8px}\n.dwfv-tree details{margin-left:8px}\n.dwfv-tree summary{cursor:pointer;padding:2px 0}\n.dwfv-tree-meta{color:#6b7280;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:10px;padding-left:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n.dwfv-stage{position:relative;overflow:hidden;background:#e5e7eb}\n.dwfv-canvas{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%}\n.dwfv-webgl-canvas{pointer-events:none}\n.dwfv-overlay-canvas{pointer-events:auto;touch-action:none;cursor:grab}\n.dwfv-overlay-canvas:active{cursor:grabbing}\n.dwfv-status{margin-left:auto;font-size:12px;color:#4b5563}\n.dwfv-warn{color:#92400e}\n.cad-viewer-container{position:relative;overflow:hidden;min-width:0;min-height:0}\n.cad-viewer-canvas{display:block;width:100%;height:100%;cursor:grab;touch-action:none;-webkit-user-select:none;user-select:none}\n.cad-viewer-canvas.is-dragging{cursor:grabbing}\n.cad-viewer-webgl-canvas{position:relative;z-index:0}\n.cad-viewer-text-overlay{display:block;contain:strict;-webkit-user-select:none;user-select:none}\n.cad-viewer-native-host{position:absolute;top:0;right:0;bottom:0;left:0;display:none;z-index:2;min-width:0;min-height:0;background:#05070d}\n.cad-viewer-native-host.is-active{display:block}\n.cad-viewer-native-host .dwfv-root{height:100%;min-height:0;color:#dbeafe;background:#05070d}\n.cad-viewer-native-host .dwfv-toolbar{min-height:34px;padding:5px 8px;gap:6px;border-bottom:1px solid rgba(71,85,105,.65);background:#0f172af5;color:#e5e7eb}\n.cad-viewer-native-host .dwfv-toolbar button,.cad-viewer-native-host .dwfv-toolbar select{height:24px;border:1px solid rgba(100,116,139,.75);border-radius:6px;background:#111827;color:#e5e7eb;font-size:12px}\n.cad-viewer-native-host .dwfv-toolbar button{padding:0 8px;cursor:pointer}\n.cad-viewer-native-host .dwfv-toolbar button:hover,.cad-viewer-native-host .dwfv-toolbar select:hover{border-color:#60a5fa;color:#bfdbfe}\n.cad-viewer-native-host .dwfv-status{color:#93c5fd;font-size:12px}\n.cad-viewer-native-host .dwfv-workspace{min-height:0;background:#05070d}\n.cad-viewer-native-host .dwfv-stage{background:#05070d}\n.cad-viewer-native-host .dwfv-tree{border-right:1px solid rgba(71,85,105,.7);background:#0f172a;color:#dbeafe}\n.cad-viewer-native-host .dwfv-tree-stats,.cad-viewer-native-host .dwfv-tree-meta{color:#94a3b8}\n.cad-viewer-native-host .dwfv-warn{color:#fbbf24}\n.cad-native-stage .dwfv-root,.cad-native-stage .dwfv-workspace,.cad-native-stage .dwfv-stage{width:100%;min-width:0;min-height:0}\n.cad-native-stage .dwfv-root{height:100%}\n.cad-state{position:absolute;inset:50% auto auto 50%;max-width:min(520px,calc(100% - 48px));transform:translate(-50%,-50%);border-radius:12px;padding:14px 18px;background:rgba(255,255,255,.92);box-shadow:0 14px 38px rgba(15,23,42,.12);color:#53637a;font-size:13px;font-weight:800;text-align:center}\n.cad-state[hidden]{display:none!important}\n.cad-state.error{color:#b42318}\n.cad-inspector strong{display:block;margin-bottom:12px;color:#1f2a3d;font-size:13px}\n.cad-inspector dl{display:grid;gap:8px;margin:0}\n.cad-inspector dl div{display:flex;align-items:center;justify-content:space-between;gap:12px;border-radius:8px;padding:8px 10px;background:#f8fafc}\n.cad-inspector dt,.cad-inspector dd{margin:0;font-size:12px}\n.cad-inspector dt{color:#7b8ca5;font-weight:700}\n.cad-inspector dd{color:#20304a;font-weight:900}\n.cad-warning{margin:12px 0 0;border-radius:8px;padding:10px;background:rgba(245,158,11,.13);color:#92400e;font-size:12px;line-height:1.55}\n[data-viewer-theme='dark'] .cad-shell{background:#111827;color:#e5edf6}\n[data-viewer-theme='dark'] .cad-body{background:#0d1117}\n[data-viewer-theme='dark'] .cad-toolbar,[data-viewer-theme='dark'] .cad-layers,[data-viewer-theme='dark'] .cad-inspector{border-color:rgba(139,148,158,.2);background:#111827;color:#e5edf6}\n[data-viewer-theme='dark'] .cad-layers-head{border-color:rgba(139,148,158,.2);background:rgba(17,24,39,.96);color:#f8fafc}\n[data-viewer-theme='dark'] .cad-tools button,[data-viewer-theme='dark'] .cad-meta span,[data-viewer-theme='dark'] .cad-inspector dl div{background:#1f2937;color:#cbd5e1}\n[data-viewer-theme='dark'] .cad-layers button,[data-viewer-theme='dark'] .cad-inspector strong,[data-viewer-theme='dark'] .cad-inspector dd{color:#e5edf6}\n[data-viewer-theme='dark'] .cad-layers button:hover{background:#1f2937}\n[data-viewer-theme='dark'] .cad-zoom,[data-viewer-theme='dark'] .cad-meta span,[data-viewer-theme='dark'] .cad-inspector dt,[data-viewer-theme='dark'] .cad-layers-head span{color:#94a3b8}\n[data-viewer-theme='dark'] .cad-canvas-wrap{background:linear-gradient(90deg,rgba(148,163,184,.08) 1px,transparent 1px),linear-gradient(180deg,rgba(148,163,184,.08) 1px,transparent 1px),#090d14;background-size:28px 28px}\n[data-viewer-theme='dark'] .cad-state{background:rgba(15,23,42,.92);color:#cbd5e1;box-shadow:0 18px 44px rgba(0,0,0,.34)}\n@media (prefers-color-scheme:dark){[data-viewer-theme='system'] .cad-shell{background:#111827;color:#e5edf6}[data-viewer-theme='system'] .cad-body{background:#0d1117}[data-viewer-theme='system'] .cad-toolbar,[data-viewer-theme='system'] .cad-layers,[data-viewer-theme='system'] .cad-inspector{border-color:rgba(139,148,158,.2);background:#111827;color:#e5edf6}[data-viewer-theme='system'] .cad-layers-head{border-color:rgba(139,148,158,.2);background:rgba(17,24,39,.96);color:#f8fafc}[data-viewer-theme='system'] .cad-tools button,[data-viewer-theme='system'] .cad-meta span,[data-viewer-theme='system'] .cad-inspector dl div{background:#1f2937;color:#cbd5e1}[data-viewer-theme='system'] .cad-layers button,[data-viewer-theme='system'] .cad-inspector strong,[data-viewer-theme='system'] .cad-inspector dd{color:#e5edf6}[data-viewer-theme='system'] .cad-layers button:hover{background:#1f2937}[data-viewer-theme='system'] .cad-zoom,[data-viewer-theme='system'] .cad-meta span,[data-viewer-theme='system'] .cad-inspector dt,[data-viewer-theme='system'] .cad-layers-head span{color:#94a3b8}[data-viewer-theme='system'] .cad-canvas-wrap{background:linear-gradient(90deg,rgba(148,163,184,.08) 1px,transparent 1px),linear-gradient(180deg,rgba(148,163,184,.08) 1px,transparent 1px),#090d14;background-size:28px 28px}[data-viewer-theme='system'] .cad-state{background:rgba(15,23,42,.92);color:#cbd5e1;box-shadow:0 18px 44px rgba(0,0,0,.34)}}\n@media (max-width:860px){.cad-body,.cad-body.without-layers{grid-template-columns:minmax(0,1fr)}.cad-layers,.cad-inspector,.cad-meta{display:none}.cad-tools{flex:1}.cad-tools button{min-width:44px;min-height:40px}}\n@container file-viewer-cad (max-width:600px){.cad-meta{display:none}.cad-tools{flex:1}.cad-tools button{min-width:44px;min-height:40px}}\n", Bp = () => {
	let e = document.createElement("style");
	return e.textContent = zp, e;
}, $ = (e, t, n) => {
	let r = document.createElement(e);
	return t && (r.className = t), n !== void 0 && (r.textContent = n), r;
}, Vp = (e) => (e || "dxf").toLowerCase(), Hp = (e) => e.trim().toLocaleLowerCase(), Up = (e) => {
	let t = e.replace(/[^a-z]/gi, "");
	if (!t) return 0;
	let n = t === t.toLocaleUpperCase(), r = t === t.toLocaleLowerCase();
	return !n && !r ? 3 : n ? 2 : 1;
}, Wp = (e, t) => {
	let n = Up(e), r = Up(t);
	return n === r ? e.length === t.length ? e.localeCompare(t, void 0, { sensitivity: "base" }) < 0 : e.length > t.length : n > r;
}, Gp = (e, t) => {
	if (typeof t != "string" && typeof t != "number") return;
	let n = String(t);
	n && !e.sourceNames.includes(n) && e.sourceNames.push(n);
}, Kp = (e) => {
	if (!e) return [];
	let t = /* @__PURE__ */ new Map();
	return Object.entries(e.document.layers).forEach(([e, n]) => {
		let r = typeof n.name == "string" && n.name ? n.name : e, i = Hp(r || e), a = t.get(i);
		a ? (a.duplicateCount += 1, Gp(a, e), Gp(a, r), a.isVisible = a.isVisible !== !1 || n.isVisible !== !1, a.isFrozen = !!a.isFrozen && !!n.isFrozen, a.isLocked = !!a.isLocked || !!n.isLocked, a.color = a.color ?? n.color, a.colorIndex = a.colorIndex ?? n.colorIndex, a.trueColor = a.trueColor ?? n.trueColor, a.lineType = a.lineType ?? n.lineType, a.lineweight = a.lineweight ?? n.lineweight, Wp(r, a.name) && (a.name = r)) : t.set(i, {
			...n,
			name: r || e,
			sourceNames: Array.from(new Set([e, r].filter((e) => typeof e == "string" && e.length > 0))),
			duplicateCount: 1
		});
	}), Array.from(t.values()).sort((e, t) => e.name.localeCompare(t.name, void 0, {
		numeric: !0,
		sensitivity: "base"
	}));
}, qp = (e, t = "zh-CN") => Number.isFinite(e) ? new Intl.NumberFormat(t).format(Math.round(e || 0)) : "0", Jp = (t) => t.ownerDocument ? e(t.ownerDocument) : "file:///", Yp = "file-viewer-input.dwg", Xp = (e) => {
	let [t, n] = Array.from(e.values());
	return !t || !n ? null : {
		center: {
			x: (t.x + n.x) / 2,
			y: (t.y + n.y) / 2
		},
		distance: Math.hypot(n.x - t.x, n.y - t.y)
	};
}, Zp = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = null, a = !1, o = (e) => {
		e.preventDefault(), e.stopImmediatePropagation();
	}, s = (n) => {
		if (n.pointerType === "touch") {
			r.set(n.pointerId, {
				x: n.clientX,
				y: n.clientY
			});
			try {
				e.setPointerCapture(n.pointerId);
			} catch {}
			r.size < 2 || (a = !0, i = Xp(r), t(), o(n));
		}
	}, c = (e) => {
		if (e.pointerType === "touch" && r.has(e.pointerId) && (r.set(e.pointerId, {
			x: e.clientX,
			y: e.clientY
		}), a)) {
			if (r.size >= 2) {
				let e = Xp(r);
				i && e && i.distance > 0 && e.distance > 0 && n({
					center: e.center,
					deltaX: e.center.x - i.center.x,
					deltaY: e.center.y - i.center.y,
					factor: Math.min(2, Math.max(.5, e.distance / i.distance))
				}), i = e;
			}
			o(e);
		}
	}, l = (t) => {
		if (t.pointerType === "touch" && r.has(t.pointerId)) {
			r.delete(t.pointerId), i = r.size >= 2 ? Xp(r) : null, r.size === 0 && (a = !1);
			try {
				e.hasPointerCapture(t.pointerId) && e.releasePointerCapture(t.pointerId);
			} catch {}
		}
	};
	return e.addEventListener("pointerdown", s, { capture: !0 }), e.addEventListener("pointermove", c, { capture: !0 }), e.addEventListener("pointerup", l, { capture: !0 }), e.addEventListener("pointercancel", l, { capture: !0 }), () => {
		e.removeEventListener("pointerdown", s, { capture: !0 }), e.removeEventListener("pointermove", c, { capture: !0 }), e.removeEventListener("pointerup", l, { capture: !0 }), e.removeEventListener("pointercancel", l, { capture: !0 }), r.clear();
	};
}, Qp = () => ({
	minX: Infinity,
	minY: Infinity,
	maxX: -Infinity,
	maxY: -Infinity
}), $p = (e) => !!e && Number.isFinite(e.minX) && Number.isFinite(e.minY) && Number.isFinite(e.maxX) && Number.isFinite(e.maxY) && e.maxX >= e.minX && e.maxY >= e.minY, em = (e) => e.maxX - e.minX, tm = (e) => e.maxY - e.minY, nm = (e) => em(e) > Q || tm(e) > Q, rm = (e) => !!e && typeof e == "object" && Number.isFinite(e.x) && Number.isFinite(e.y), im = (e, t) => {
	rm(t) && (e.minX = Math.min(e.minX, t.x), e.minY = Math.min(e.minY, t.y), e.maxX = Math.max(e.maxX, t.x), e.maxY = Math.max(e.maxY, t.y));
}, am = (e, t) => {
	$p(t) && (im(e, {
		x: t.minX,
		y: t.minY
	}), im(e, {
		x: t.maxX,
		y: t.maxY
	}));
}, om = (e) => {
	let t = Qp();
	return e.forEach((e) => am(t, e)), $p(t) ? t : null;
}, sm = (e) => Math.max(em(e), Q) * Math.max(tm(e), Q), cm = (e, t, n) => {
	let r = Number(n);
	if (!rm(t) || !Number.isFinite(r)) return;
	let i = Math.abs(r);
	im(e, {
		x: t.x - i,
		y: t.y - i
	}), im(e, {
		x: t.x + i,
		y: t.y + i
	});
}, lm = (e, t) => {
	Array.isArray(t) && t.forEach((t) => im(e, t));
}, um = (e, t) => {
	Array.isArray(t) && t.forEach((t) => {
		let n = t.points;
		lm(e, n);
	});
}, dm = (e, t) => {
	let n = t.insertionPoint || t.startPoint || t.center;
	if (!rm(n)) return;
	let r = String(t.text ?? t.value ?? ""), i = Math.abs(Number(t.textHeight ?? t.height ?? 1)), a = r.split(/\r?\n/g), o = Math.max(1, ...a.map((e) => e.length)) * Math.max(i, 1) * .62, s = Math.max(1, a.length) * Math.max(i, 1) * 1.22;
	im(e, n), im(e, {
		x: n.x + o,
		y: n.y - s
	});
}, fm = (e) => {
	for (let t of [
		"startPoint",
		"insertionPoint",
		"center",
		"point",
		"location"
	]) {
		let n = e[t];
		if (rm(n)) return n;
	}
	let t = e.vertices || e.points;
	return Array.isArray(t) && rm(t[0]) ? t[0] : (e.commands?.find((e) => e.points.length > 0))?.points[0];
}, pm = (e) => {
	var t;
	let n = Qp(), r = String(e.type ?? "").toUpperCase(), i = e.kind || Wo(r);
	if (i === "viewport") return null;
	if (i === "line") im(n, e.startPoint), im(n, e.endPoint);
	else if (i === "circle" || i === "arc") cm(n, e.center, e.radius);
	else if (i === "polyline" || i === "solid" || i === "spline") lm(n, e.vertices), lm(n, e.points), lm(n, e.controlPoints), lm(n, e.fitPoints);
	else if (i === "ellipse") {
		let t = e.center, r = e.majorAxisEndPoint;
		if (rm(t) && rm(r)) {
			let i = Math.hypot(r.x, r.y), a = i * Math.abs(Number(e.axisRatio ?? 1));
			cm(n, t, Math.max(i, a));
		}
	} else if (i === "text") dm(n, e);
	else if (i === "path") um(n, e.commands);
	else if (i === "hatch") (t = e.loops) == null || t.forEach((e) => {
		lm(n, e.vertices), um(n, e.commands);
	});
	else if (i === "image") {
		let t = e.insertionPoint, r = Number(e.width ?? 32), i = Number(e.height ?? 32);
		rm(t) && Number.isFinite(r) && Number.isFinite(i) && (im(n, t), im(n, {
			x: t.x + r,
			y: t.y - i
		}));
	} else im(n, fm(e));
	return $p(n) ? n : null;
}, mm = () => ({
	a: 1,
	b: 0,
	c: 0,
	d: 1,
	e: 0,
	f: 0
}), hm = (e, t) => ({
	a: 1,
	b: 0,
	c: 0,
	d: 1,
	e,
	f: t
}), gm = (e, t) => ({
	a: e,
	b: 0,
	c: 0,
	d: t,
	e: 0,
	f: 0
}), _m = (e) => {
	let t = Math.cos(e), n = Math.sin(e);
	return {
		a: t,
		b: n,
		c: -n,
		d: t,
		e: 0,
		f: 0
	};
}, vm = (e, t) => ({
	a: e.a * t.a + e.c * t.b,
	b: e.b * t.a + e.d * t.b,
	c: e.a * t.c + e.c * t.d,
	d: e.b * t.c + e.d * t.d,
	e: e.a * t.e + e.c * t.f + e.e,
	f: e.b * t.e + e.d * t.f + e.f
}), ym = (e, t) => ({
	x: e.x * t.a + e.y * t.c + t.e,
	y: e.x * t.b + e.y * t.d + t.f
}), bm = (e, t) => {
	let n = Qp();
	return [
		{
			x: e.minX,
			y: e.minY
		},
		{
			x: e.minX,
			y: e.maxY
		},
		{
			x: e.maxX,
			y: e.minY
		},
		{
			x: e.maxX,
			y: e.maxY
		}
	].forEach((e) => im(n, ym(e, t))), $p(n) ? n : null;
}, xm = (e, t = {
	x: 0,
	y: 0
}) => {
	let n = e.insertionPoint || {
		x: 0,
		y: 0
	}, r = e.scale, i = Number(typeof r == "object" && r ? r.x ?? 1 : e.scaleX ?? 1), a = Number(typeof r == "object" && r ? r.y ?? i : e.scaleY ?? i), o = Number(e.rotation ?? 0), s = hm(rm(n) ? n.x : 0, rm(n) ? n.y : 0);
	return s = vm(s, _m(Number.isFinite(o) ? o : 0)), s = vm(s, gm(Number.isFinite(i) ? i : 1, Number.isFinite(a) ? a : 1)), s = vm(s, hm(-t.x, -t.y)), s;
}, Sm = (e, t) => {
	if (typeof t != "string" && typeof t != "number") return;
	let n = String(t);
	return e.layers[n] || e.layers[n.toLocaleLowerCase()] || Object.values(e.layers).find((e) => Hp(e.name) === Hp(n));
}, Cm = (e, t) => {
	if (typeof t != "string" && typeof t != "number") return;
	let n = String(t);
	return e.blocks[n] || e.blocks[n.toLocaleLowerCase()] || Object.values(e.blocks).find((e) => Hp(e.name) === Hp(n));
}, wm = (e, t) => {
	if (t.isVisible === !1) return !1;
	let n = Sm(e, t.layer);
	return !n || n.isVisible !== !1 && !n.isFrozen;
}, Tm = (e, t) => {
	let n = [], r = (i, a, o) => {
		if (!wm(e, i)) return;
		let s = String(i.type ?? "").toUpperCase();
		if ((i.kind || Wo(s)) === "insert") {
			let n = Cm(e, i.blockName ?? i.name);
			if (n && a < t) {
				let e = vm(o, xm(i, n.basePoint || {
					x: 0,
					y: 0
				}));
				n.entities.forEach((t) => r(t, a + 1, e));
				return;
			}
		}
		let c = pm(i);
		if (!c) return;
		let l = bm(c, o);
		l && n.push(l);
	};
	return e.entities.forEach((e) => r(e, 0, mm())), n;
}, Em = (e) => {
	let t = em(e), n = tm(e);
	if (t > Q && n > Q) return e;
	let r = (e.minX + e.maxX) / 2, i = (e.minY + e.maxY) / 2, a = Math.max(t, n, 1) * .5;
	return {
		minX: r - (t > Q ? t / 2 : a),
		maxX: r + (t > Q ? t / 2 : a),
		minY: i - (n > Q ? n / 2 : a),
		maxY: i + (n > Q ? n / 2 : a)
	};
}, Dm = (e) => {
	let t = e.filter($p), n = t.filter(nm);
	n.length > 0 && (t = n);
	let r = om(t);
	if (!r || t.length < 8) return r ? Em(r) : null;
	let i = t.map((e) => ({
		bounds: e,
		x: (e.minX + e.maxX) / 2,
		y: (e.minY + e.maxY) / 2
	})), a = Math.max(1, Math.floor(i.length * .05)), o = [...i].sort((e, t) => e.x - t.x), s = [...i].sort((e, t) => e.y - t.y), c = o[Math.min(a, o.length - 1)].x, l = o[Math.max(o.length - 1 - a, 0)].x, u = s[Math.min(a, s.length - 1)].y, d = s[Math.max(s.length - 1 - a, 0)].y, f = i.filter((e) => e.x >= c && e.x <= l && e.y >= u && e.y <= d).map((e) => e.bounds), p = Math.max(4, Math.floor(t.length * .55)), m = f.length >= p ? om(f) : null;
	if (!m) return Em(r);
	let h = Math.max(em(r), tm(r), Q), g = Math.max(em(m), tm(m), Q), _ = sm(r) / sm(m);
	return h / g >= Ip || _ >= Ip ** 2 ? Em(m) : Em(r);
}, Om = (e) => {
	let t = Number(e.fitPadding);
	return !Number.isFinite(t) || t <= 0 ? Fp : Math.min(1, Math.max(.2, t));
}, km = (e, t, n) => {
	if (!e || n.fitMode === "native") return t && $p(t) ? Em(t) : null;
	let r = Number(n.maxInsertDepth ?? 16);
	return Dm(Tm(e, Number.isFinite(r) ? Math.max(0, r) : 16)) || (t && $p(t) ? Em(t) : null);
}, Am = (e, t) => {
	let n = Hp(t.name), r = new Set(t.sourceNames);
	return Object.entries(e.layers).forEach(([e, t]) => {
		(Hp(e) === n || Hp(t.name) === n) && (r.add(e), r.add(t.name));
	}), Array.from(r);
};
async function jm(e, u, d = "dxf", m) {
	var x;
	let S = Vp(d), C = m?.options?.cad || {}, w = p(m?.options), te = f(m?.options), ne = _(C.monochromeColor), T = g(C.colorMode), E = "loading", re = w("cad.state.loadingViewer"), ie = "", ae = null, D = null, O = null, k = [], A = null, oe = null, se = null, ce = null, le = null, ue = !0, de = 1, fe = !1, pe = !1, me = Bp(), he = $("div", "cad-shell");
	he.dataset.viewerZoomProvider = "cad";
	let ge = $("div", "cad-toolbar"), _e = $("div", "cad-tools"), ve = $("button", void 0, w("cad.toolbar.fit")), ye = $("button", void 0, "-"), j = $("span", "cad-zoom", "100%"), be = $("button", void 0, "+"), xe = $("button", "cad-color-mode");
	xe.hidden = C.showColorModeToggle === !1;
	let Se = $("div", "cad-meta"), Ce = $("span", void 0, S.toUpperCase()), we = $("span", void 0, "AUTO");
	[
		ve,
		ye,
		be,
		xe
	].forEach((e) => {
		e.type = "button";
	}), ve.title = w("cad.toolbar.fit"), ye.title = w("cad.toolbar.zoomOut"), be.title = w("cad.toolbar.zoomIn"), _e.append(ve, ye, j, be, xe);
	let Te = ["png", "jpeg"].map((e) => {
		let t = $("button", `cad-export-image cad-export-${e}`, e.toUpperCase());
		return t.type = "button", t.title = w("cad.toolbar.exportImage", { format: e.toUpperCase() }), t.setAttribute("aria-label", t.title), t.hidden = !m?.requestSnapshotDownload || C.showImageExport === !1 || !n(m?.options), t.addEventListener("click", async () => {
			if (!(fe || E !== "ready" || pe)) {
				pe = !0, Ee.hidden = !0, N();
				try {
					await (m?.requestSnapshotDownload)?.call(m, async (t) => {
						let n = await Mp(() => A);
						return {
							blob: await h(n, e, t, n.width / Me.clientWidth),
							filename: `${ze().replace(/\.[^.]+$/, "") || "drawing"}.${e === "jpeg" ? "jpg" : "png"}`
						};
					});
				} catch (e) {
					fe || (Ee.textContent = w("cad.error.exportFailed", { message: e instanceof Error ? e.message : String(e) }), Ee.hidden = !1, console.error(e));
				} finally {
					pe = !1, fe || N();
				}
			}
		}), _e.append(t), t;
	});
	Se.append(Ce, we), ge.append(_e, Se);
	let Ee = $("p", "cad-export-error");
	Ee.setAttribute("role", "alert"), Ee.hidden = !0;
	let De = $("div", "cad-body without-layers"), M = $("aside", "cad-layers");
	M.hidden = !0;
	let Oe = $("div", "cad-layers-head"), ke = $("span", void 0, w("cad.layers.count", { count: 0 }));
	Oe.append($("strong", void 0, w("cad.layers.title")), ke);
	let Ae = $("div", "cad-layers-list");
	M.append(Oe, Ae);
	let je = $("div", "cad-canvas-wrap"), Me = $("div", "cad-stage"), Ne = $("div", "cad-native-stage");
	Me.append(Ne);
	let Pe = $("div", "cad-state", re);
	je.append(Me, Pe);
	let Fe = $("aside", "cad-inspector"), Ie = $("strong", void 0, w("cad.inspector.title")), Le = $("dl"), Re = $("p", "cad-warning");
	Re.hidden = !0, Fe.append(Ie, Le, Re), De.append(M, je, Fe), he.append(ge, Ee, De), u.replaceChildren(me, he);
	let ze = () => m?.filename || `drawing.${S}`, Be = () => S === "dwg" ? Yp : ze(), Ve = (e) => (e.document.sourceName = ze(), e), He = () => ae?.warnings || ae?.document.warnings || [], Ue = () => {
		if ((A?.isNativeRendererActive)?.call(A)) return Math.round(de * 100);
		let e = O?.zoomPercent ?? (A?.getZoomPercent)?.call(A) ?? 100;
		return Number.isFinite(e) ? Math.round(e) : 100;
	}, We = () => {
		let e = E === "ready" && !!A, t = Ue();
		return {
			scale: t / 100,
			label: `${t}%`,
			canZoomIn: e,
			canZoomOut: e,
			canReset: e,
			minScale: .05,
			maxScale: 16
		};
	}, Ge = c(), Ke = t(), qe = () => ({
		renderer: "cad",
		scale: We().scale,
		zoom: We(),
		extra: {
			status: E,
			view: O ? { ...O } : null,
			backend: D?.backend,
			colorMode: T,
			monochromeColor: T === "monochrome" ? ne : void 0,
			layerCount: k.length,
			visibleLayers: k.filter((e) => e.isVisible !== !1 && !e.isFrozen).map((e) => e.name)
		}
	}), Je = (e, t = "viewer") => {
		let n = qe();
		return fe || Ke.emit(r(n, {
			action: e,
			source: t
		})), n;
	}, Ye = (e) => Math.min(Rp, Math.max(Lp, e)), Xe = (e) => {
		Ge.emit(), N(), Je(e, "user");
	}, Ze = () => {
		le?.(), le = null;
		let e = Ne.querySelector(".dwfv-overlay-canvas");
		if (!e) return;
		let t = !1, n = (e) => {
			t || (t = !0, queueMicrotask(() => {
				t = !1, !fe && (A?.isNativeRendererActive)?.call(A) && Xe(e);
			}));
		}, r = (e, t) => {
			!Number.isFinite(e) || e <= 0 || (de = Ye(de * e), n(t));
		}, i = (e) => {
			let t = e.target, i = t instanceof Element ? t.closest("button") : null;
			if (!i || !Ne.contains(i)) return;
			let a = (i.textContent || "").trim();
			a === "+" ? r(1.25, "zoom-in") : a === "-" || a === "−" ? r(.8, "zoom-out") : /适应|fit|reset/i.test(a) && (de = 1, n("zoom-reset"));
		}, a = (t) => {
			let n = e.getBoundingClientRect(), i = t.deltaMode === WheelEvent.DOM_DELTA_LINE ? t.deltaY * 16 : t.deltaMode === WheelEvent.DOM_DELTA_PAGE ? t.deltaY * Math.max(1, n.height) : t.deltaY;
			r(Math.exp(-i * .0015), "cad-view-change");
		}, o = (e) => {
			e.target instanceof HTMLSelectElement && Ne.contains(e.target) && (de = 1, n("zoom-reset"));
		}, s = Zp(e, () => {
			ue = !1;
		}, ({ center: t, factor: n }) => {
			let r = -Math.log(n) / .0015;
			e.dispatchEvent(new WheelEvent("wheel", {
				bubbles: !0,
				cancelable: !0,
				clientX: t.x,
				clientY: t.y,
				deltaMode: WheelEvent.DOM_DELTA_PIXEL,
				deltaY: r
			}));
		});
		Ne.addEventListener("click", i), Ne.addEventListener("change", o), e.addEventListener("wheel", a), le = () => {
			s(), Ne.removeEventListener("click", i), Ne.removeEventListener("change", o), e.removeEventListener("wheel", a);
		};
	}, Qe = () => {
		let e = ae?.summary, t = [
			[w("cad.inspector.entities"), qp(e?.entityCount, te)],
			[w("cad.inspector.blocks"), qp(e?.blockCount, te)],
			[w("cad.inspector.pages"), qp(e?.pageCount, te)],
			[w("cad.inspector.drawn"), qp(D?.drawn, te)]
		];
		Le.replaceChildren(...t.map(([e, t]) => {
			let n = $("div");
			return n.append($("dt", void 0, e), $("dd", void 0, t)), n;
		}));
		let n = He()[0];
		Re.textContent = n || "", Re.hidden = !n;
	}, $e = () => {
		ke.textContent = w("cad.layers.count", { count: k.length }), M.hidden = k.length === 0, De.classList.toggle("without-layers", k.length === 0), Ae.replaceChildren(...k.map((e) => {
			let t = $("button");
			t.type = "button";
			let n = e.isVisible !== !1 && !e.isFrozen;
			t.classList.toggle("muted", !n), t.title = e.duplicateCount > 1 ? w("cad.layers.merged", {
				name: e.name,
				count: e.duplicateCount
			}) : e.name, t.setAttribute("aria-pressed", String(n));
			let r = $("span", "cad-layer-color");
			return T === "monochrome" ? r.style.background = ne : typeof e.color == "string" && (r.style.background = e.color), t.append(r, $("span", void 0, e.name)), t.addEventListener("click", () => {
				let t = ee(A);
				if (!t) return;
				let r = !n;
				Am(t, e).forEach((e) => {
					let n = t.layers[e] || Sm(t, e);
					n && (n.isVisible = r);
				}), ae = A?.setDocument(t, ze()) || null, k = Kp(ae), et(), queueMicrotask(() => {
					ue = !0, P(), Ge.emit(), Je("layer-toggle", "user");
				});
			}), t;
		}));
	}, N = () => {
		Te.forEach((e) => {
			e.disabled = E !== "ready" || pe || !A || typeof A.captureCanvas != "function";
		}), j.textContent = `${Ue()}%`, we.textContent = (D?.backend || "auto").toUpperCase();
		let e = y(A);
		xe.disabled = E !== "ready" || !e, xe.setAttribute("aria-pressed", String(T === "monochrome")), xe.textContent = w(T === "monochrome" ? "cad.toolbar.monochrome" : "cad.toolbar.colorSource"), xe.title = w(T === "monochrome" ? "cad.toolbar.colorSource" : "cad.toolbar.monochrome"), Pe.hidden = E === "ready", Pe.classList.toggle("error", E === "error"), E === "loading" ? Pe.textContent = re : E === "error" && (Pe.textContent = ie);
	}, et = () => {
		N(), $e(), Qe();
	}, tt = (e) => {
		let t = e.format ? `${e.format.toUpperCase()} ` : "", n = Number.isFinite(e.percent) ? ` ${Math.round(e.percent || 0)}%` : "";
		re = `${t}${e.message}${n}`, N();
	}, P = () => {
		if (!A) return !1;
		if (A.isNativeRendererActive?.call(A)) return de = 1, A.fit(), !0;
		let e = A.renderer, t = e.getBounds?.call(e), n = km(A.getDocument(), t, C);
		if (!n || !e.setViewState) return A.fit(), !0;
		let r = Math.max(1, Me.clientWidth || A.canvas.clientWidth || u.clientWidth), i = Math.max(1, Me.clientHeight || A.canvas.clientHeight || u.clientHeight), a = Math.max(em(n), Q), o = Math.max(tm(n), Q), s = C.canvasOptions || {}, c = Number(s.minScale ?? Q), l = Number(s.maxScale ?? 1e9), d = Math.min(r / a, i / o) * Om(C), f = Math.min(Number.isFinite(l) ? l : 1e9, Math.max(Number.isFinite(c) ? c : Q, d)), p = {
			centerX: (n.minX + n.maxX) / 2,
			centerY: (n.minY + n.maxY) / 2,
			scale: f
		};
		return e.fitScale = f, e.setViewState(p), !0;
	}, nt = (e = "user", t = "zoom-reset") => {
		ue = !0, P(), Ge.emit(), N(), Je(t, e);
	}, rt = (e) => {
		if (ue = !0, !P()) return {
			applied: !1,
			mode: e.mode,
			resize: e.resize,
			source: e.source,
			reason: "not-ready",
			provider: "view-state"
		};
		Ge.emit(), N();
		let t = Je("fit", e.source);
		return {
			applied: !0,
			mode: e.mode,
			resize: e.resize,
			scale: t.scale,
			source: e.source,
			provider: "view-state",
			state: t
		};
	}, it = () => {
		ue = !1, A?.zoomIn(), Ge.emit(), N(), Je("zoom-in", "user");
	}, at = () => {
		ue = !1, A?.zoomOut(), Ge.emit(), N(), Je("zoom-out", "user");
	};
	s(he, {
		zoomIn: () => (it(), We()),
		zoomOut: () => (at(), We()),
		resetZoom: () => (nt(), We()),
		fit: rt,
		getState: We,
		subscribe: Ge.subscribe
	}), l(he, {
		getState: qe,
		async applyState(e, t = {}) {
			let n = t.source || "api", r = t.action || "restore";
			return t.notify === !1 ? qe() : Je(r, n);
		},
		fit: rt,
		subscribe: Ke.subscribe
	}), ve.addEventListener("click", () => nt()), be.addEventListener("click", it), ye.addEventListener("click", at), xe.addEventListener("click", () => {
		let e = T;
		T = T === "monochrome" ? "source" : "monochrome", b(A, T, ne, C) ? (et(), Je("cad-view-change", "user")) : (T = e, N());
	});
	let ot = () => {
		let { wasmPath: e, workerUrl: t, dwfWasmUrl: n } = i(C, Jp(u)), r = v(C, T), a = new Dp({
			container: Me,
			nativeHost: Ne,
			renderer: C.renderer || "auto",
			wasmPath: e,
			workerUrl: t,
			dwfWasmUrl: n,
			dxfEncoding: C.dxfEncoding,
			useWorker: C.useWorker ?? !0,
			workerTimeoutMs: C.workerTimeoutMs ?? Pp,
			preferDwgWasm: C.preferDwgWasm ?? !0,
			includePaperSpace: C.includePaperSpace ?? !0,
			maxInsertDepth: C.maxInsertDepth,
			keepRaw: C.keepRaw ?? !1,
			dwfPreferWebgl: C.dwfPreferWebgl ?? !0,
			dwfPreferWasm: C.dwfPreferWasm ?? !0,
			dwfBackground: C.dwfBackground,
			dwfMaxDevicePixelRatio: C.dwfMaxDevicePixelRatio,
			dwfMaxCanvasPixels: C.dwfMaxCanvasPixels,
			dwfMaxGpuCacheBytes: C.dwfMaxGpuCacheBytes,
			dwfMaxCachedScenes: C.dwfMaxCachedScenes,
			dwfLineWeightMode: C.dwfLineWeightMode,
			dwfMinStrokeCssPx: C.dwfMinStrokeCssPx,
			dwfMaxOverviewStrokeCssPx: C.dwfMaxOverviewStrokeCssPx,
			dwfMinTextCssPx: C.dwfMinTextCssPx,
			dwfMinFilledAreaCssPx: C.dwfMinFilledAreaCssPx,
			colorMode: T,
			monochromeColor: ne,
			autoFit: !0,
			canvasOptions: r,
			onLoadProgress: tt,
			onRenderStats: (e) => {
				D = e, N(), Qe();
			},
			onViewChange: (e) => {
				O = e, Ge.emit(), Je("cad-view-change", "user"), N();
			},
			onLoad: (e) => {
				ae = Ve(e), k = Kp(e), et();
			},
			onError: (e) => {
				ie = e.message || w("cad.error.parseFailed"), N();
			}
		});
		ce?.();
		let o = a.renderer;
		return ce = Zp(a.canvas, () => {
			ue = !1;
		}, ({ center: e, deltaX: t, deltaY: n, factor: r }) => {
			var i, s;
			let c = a.canvas.getBoundingClientRect();
			(i = o.panByScreenDelta) == null || i.call(o, t, n), (s = o.zoom) == null || s.call(o, r, {
				x: e.x - c.left,
				y: e.y - c.top
			});
		}), C.preloadDwg !== !1 && S === "dwg" && a.preloadDwg({
			wasmPath: e,
			workerUrl: t
		}).catch(() => {}), a;
	};
	return typeof ResizeObserver < "u" && (oe = new ResizeObserver(() => {
		A?.resize(), ue && requestAnimationFrame(() => {
			!fe && ue && (P(), Ge.emit(), N());
		});
	}), oe.observe(Me)), et(), (x = m?.registerExportAdapter) == null || x.call(m, Np(() => A, m.filename, () => Me.querySelector(".dwfv-stage") || Me)), (async () => {
		E = "loading", re = w("cad.state.parsing"), ie = "", ae = null, D = null, O = null, k = [], ue = !0, de = 1, le?.(), le = null, et(), se?.abort();
		let t = new AbortController();
		se = t;
		try {
			A?.destroy(), A = ot();
			let n = i(C, Jp(u)), r = await A.loadBuffer(e.slice(0), Be(), {
				signal: t.signal,
				transferInputBuffer: !1,
				dxfEncoding: C.dxfEncoding,
				wasmPath: n.wasmPath,
				workerUrl: n.workerUrl,
				dwfWasmUrl: n.dwfWasmUrl
			});
			if (fe || t.signal.aborted) return;
			ae = Ve(r), k = Kp(r), E = "ready", A.isNativeRendererActive?.call(A) && Ze(), et(), queueMicrotask(() => {
				P(), Ge.emit(), Je("init", "viewer"), N();
			});
		} catch (e) {
			if (fe || t.signal.aborted) return;
			console.error(e), E = "error", ie = e instanceof Error ? e.message : w("cad.error.parseFailed"), et();
		}
	})(), {
		$el: he,
		unmount() {
			var e;
			fe = !0, (e = m?.registerExportAdapter) == null || e.call(m, null), o(he), a(he), se?.abort(), se = null, ce?.(), ce = null, le?.(), le = null, oe?.disconnect(), oe = null, A?.destroy(), A = null, u.replaceChildren();
		}
	};
}
export { jm as default };
