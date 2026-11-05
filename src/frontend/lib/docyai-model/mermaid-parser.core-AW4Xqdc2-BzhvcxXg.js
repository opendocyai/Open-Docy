// node_modules/.pnpm/@file-viewer+capability-mermaid@3.3.0/node_modules/@file-viewer/capability-mermaid/dist/defineProperty-Dt7ri80W.js
function e(t) {
	"@babel/helpers - typeof";
	return e = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, e(t);
}
function t(t, n) {
	if (e(t) != "object" || !t) return t;
	var r = t[Symbol.toPrimitive];
	if (r !== void 0) {
		var i = r.call(t, n || "default");
		if (e(i) != "object") return i;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (n === "string" ? String : Number)(t);
}
function n(n) {
	var r = t(n, "string");
	return e(r) == "symbol" ? r : r + "";
}
function r(e, t, r) {
	return (t = n(t)) in e ? Object.defineProperty(e, t, {
		value: r,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = r, e;
}
// node_modules/.pnpm/@file-viewer+capability-mermaid@3.3.0/node_modules/@file-viewer/capability-mermaid/dist/chunk-NGNAAXSQ-BCWPP_Dy.js
var i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, ee, w, T, te, E, D, O, ne, k, A, re, ie, ae, j, oe, se, ce, M, le, N, ue, de, fe, pe, me, he, ge, _e, ve, ye, be, xe, Se, Ce, we, Te, Ee, De, Oe, ke, Ae, je, Me, Ne, Pe, Fe, Ie, Le, Re, ze, Be, Ve, He, Ue, We, Ge, Ke, qe, Je, Ye, Xe, Ze, Qe, $e, et, tt, nt, rt, it, at, ot, st, ct, lt, ut, dt, ft, pt, mt, ht, gt, _t, vt, yt, bt, xt, St, Ct, wt, Tt, Et, Dt, Ot, kt, At, jt, Mt, Nt, Pt, Ft, It, Lt, Rt, zt, Bt, Vt, Ht, Ut = Object.create, Wt = Object.defineProperty, Gt = Object.getOwnPropertyDescriptor, Kt = Object.getOwnPropertyNames, qt = Object.getPrototypeOf, Jt = Object.prototype.hasOwnProperty, P = (e, t) => Wt(e, "name", {
	value: t,
	configurable: !0
}), Yt = (e, t) => function() {
	return e && (t = (0, e[Kt(e)[0]])(e = 0)), t;
}, F = (e, t) => function() {
	return t || (0, e[Kt(e)[0]])((t = { exports: {} }).exports, t), t.exports;
}, Xt = (e, t) => {
	for (var n in t) Wt(e, n, {
		get: t[n],
		enumerable: !0
	});
}, Zt = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (let i of Kt(t)) !Jt.call(e, i) && i !== n && Wt(e, i, {
		get: () => t[i],
		enumerable: !(r = Gt(t, i)) || r.enumerable
	});
	return e;
}, Qt = (e, t, n) => (n = e == null ? {} : Ut(qt(e)), Zt(t || !e || !e.__esModule ? Wt(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), $t = (e) => Zt(Wt({}, "__esModule", { value: !0 }), e), en = F({ "../../node_modules/.pnpm/vscode-jsonrpc@9.0.3/node_modules/vscode-jsonrpc/lib/common/is.js"(e) {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.boolean = t, e.string = n, e.number = r, e.error = i, e.func = a, e.array = o, e.stringArray = s;
	function t(e) {
		return e === !0 || e === !1;
	}
	P(t, "boolean");
	function n(e) {
		return typeof e == "string" || e instanceof String;
	}
	P(n, "string");
	function r(e) {
		return typeof e == "number" || e instanceof Number;
	}
	P(r, "number");
	function i(e) {
		return e instanceof Error;
	}
	P(i, "error");
	function a(e) {
		return typeof e == "function";
	}
	P(a, "func");
	function o(e) {
		return Array.isArray(e);
	}
	P(o, "array");
	function s(e) {
		return o(e) && e.every((e) => n(e));
	}
	P(s, "stringArray");
} }), tn = F({ "../../node_modules/.pnpm/vscode-jsonrpc@9.0.3/node_modules/vscode-jsonrpc/lib/common/messages.js"(e) {
	var t, n, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, ee, w, T, te = e && e.__createBinding || (Object.create ? (function(e, t, n, r) {
		r === void 0 && (r = n);
		var i = Object.getOwnPropertyDescriptor(t, n);
		(!i || ("get" in i ? !t.__esModule : i.writable || i.configurable)) && (i = {
			enumerable: !0,
			get: /* @__PURE__ */ P(function() {
				return t[n];
			}, "get")
		}), Object.defineProperty(e, r, i);
	}) : (function(e, t, n, r) {
		r === void 0 && (r = n), e[r] = t[n];
	})), E = e && e.__setModuleDefault || (Object.create ? (function(e, t) {
		Object.defineProperty(e, "default", {
			enumerable: !0,
			value: t
		});
	}) : function(e, t) {
		e.default = t;
	}), D = e && e.__importStar || /* @__PURE__ */ (function() {
		var e = /* @__PURE__ */ P(function(t) {
			return e = Object.getOwnPropertyNames || function(e) {
				var t = [];
				for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[t.length] = n);
				return t;
			}, e(t);
		}, "ownKeys");
		return function(t) {
			if (t && t.__esModule) return t;
			var n = {};
			if (t != null) for (var r = e(t), i = 0; i < r.length; i++) r[i] !== "default" && te(n, t, r[i]);
			return E(n, t), n;
		};
	})();
	Object.defineProperty(e, "__esModule", { value: !0 }), e.Message = e.NotificationType9 = e.NotificationType8 = e.NotificationType7 = e.NotificationType6 = e.NotificationType5 = e.NotificationType4 = e.NotificationType3 = e.NotificationType2 = e.NotificationType1 = e.NotificationType0 = e.NotificationType = e.RequestType9 = e.RequestType8 = e.RequestType7 = e.RequestType6 = e.RequestType5 = e.RequestType4 = e.RequestType3 = e.RequestType2 = e.RequestType1 = e.RequestType = e.RequestType0 = e.AbstractMessageSignature = e.ParameterStructures = e.ResponseError = e.ErrorCodes = void 0;
	var O = D(en()), ne;
	(function(e) {
		e.ParseError = -32700, e.InvalidRequest = -32600, e.MethodNotFound = -32601, e.InvalidParams = -32602, e.InternalError = -32603, e.jsonrpcReservedErrorRangeStart = -32099, e.serverErrorStart = -32099, e.MessageWriteError = -32099, e.MessageReadError = -32098, e.PendingResponseRejected = -32097, e.ConnectionInactive = -32096, e.ServerNotInitialized = -32002, e.UnknownErrorCode = -32001, e.jsonrpcReservedErrorRangeEnd = -32e3, e.serverErrorEnd = -32e3;
	})(ne || (e.ErrorCodes = ne = {})), e.ResponseError = (t = class e extends Error {
		constructor(t, n, i) {
			super(n), r(this, "code", void 0), r(this, "data", void 0), this.code = O.number(t) ? t : ne.UnknownErrorCode, this.data = i, Object.setPrototypeOf(this, e.prototype);
		}
		toJson() {
			let e = {
				code: this.code,
				message: this.message
			};
			return this.data !== void 0 && (e.data = this.data), e;
		}
	}, P(t, "ResponseError"), t);
	var k = (n = class e {
		constructor(e) {
			r(this, "kind", void 0), this.kind = e;
		}
		static is(t) {
			return t === e.auto || t === e.byName || t === e.byPosition;
		}
		toString() {
			return this.kind;
		}
	}, P(n, "ParameterStructures"), r(n, "auto", new n("auto")), r(n, "byPosition", new n("byPosition")), r(n, "byName", new n("byName")), n);
	e.ParameterStructures = k;
	var A = (i = class {
		constructor(e, t) {
			r(this, "method", void 0), r(this, "numberOfParams", void 0), this.method = e, this.numberOfParams = t;
		}
		get parameterStructures() {
			return k.auto;
		}
	}, P(i, "AbstractMessageSignature"), i);
	e.AbstractMessageSignature = A, e.RequestType0 = (a = class extends A {
		constructor(e) {
			super(e, 0), r(this, "_", void 0);
		}
	}, P(a, "RequestType0"), a), e.RequestType = (o = class extends A {
		constructor(e, t = k.auto) {
			super(e, 1), r(this, "_parameterStructures", void 0), r(this, "_", void 0), this._parameterStructures = t;
		}
		get parameterStructures() {
			return this._parameterStructures;
		}
	}, P(o, "RequestType"), o), e.RequestType1 = (s = class extends A {
		constructor(e, t = k.auto) {
			super(e, 1), r(this, "_parameterStructures", void 0), r(this, "_", void 0), this._parameterStructures = t;
		}
		get parameterStructures() {
			return this._parameterStructures;
		}
	}, P(s, "RequestType1"), s), e.RequestType2 = (c = class extends A {
		constructor(e) {
			super(e, 2), r(this, "_", void 0);
		}
	}, P(c, "RequestType2"), c), e.RequestType3 = (l = class extends A {
		constructor(e) {
			super(e, 3), r(this, "_", void 0);
		}
	}, P(l, "RequestType3"), l), e.RequestType4 = (u = class extends A {
		constructor(e) {
			super(e, 4), r(this, "_", void 0);
		}
	}, P(u, "RequestType4"), u), e.RequestType5 = (d = class extends A {
		constructor(e) {
			super(e, 5), r(this, "_", void 0);
		}
	}, P(d, "RequestType5"), d), e.RequestType6 = (f = class extends A {
		constructor(e) {
			super(e, 6), r(this, "_", void 0);
		}
	}, P(f, "RequestType6"), f), e.RequestType7 = (p = class extends A {
		constructor(e) {
			super(e, 7), r(this, "_", void 0);
		}
	}, P(p, "RequestType7"), p), e.RequestType8 = (m = class extends A {
		constructor(e) {
			super(e, 8), r(this, "_", void 0);
		}
	}, P(m, "RequestType8"), m), e.RequestType9 = (h = class extends A {
		constructor(e) {
			super(e, 9), r(this, "_", void 0);
		}
	}, P(h, "RequestType9"), h), e.NotificationType = (g = class extends A {
		constructor(e, t = k.auto) {
			super(e, 1), r(this, "_parameterStructures", void 0), r(this, "_", void 0), this._parameterStructures = t;
		}
		get parameterStructures() {
			return this._parameterStructures;
		}
	}, P(g, "NotificationType"), g), e.NotificationType0 = (_ = class extends A {
		constructor(e) {
			super(e, 0), r(this, "_", void 0);
		}
	}, P(_, "NotificationType0"), _), e.NotificationType1 = (v = class extends A {
		constructor(e, t = k.auto) {
			super(e, 1), r(this, "_parameterStructures", void 0), r(this, "_", void 0), this._parameterStructures = t;
		}
		get parameterStructures() {
			return this._parameterStructures;
		}
	}, P(v, "NotificationType1"), v), e.NotificationType2 = (y = class extends A {
		constructor(e) {
			super(e, 2), r(this, "_", void 0);
		}
	}, P(y, "NotificationType2"), y), e.NotificationType3 = (b = class extends A {
		constructor(e) {
			super(e, 3), r(this, "_", void 0);
		}
	}, P(b, "NotificationType3"), b), e.NotificationType4 = (x = class extends A {
		constructor(e) {
			super(e, 4), r(this, "_", void 0);
		}
	}, P(x, "NotificationType4"), x), e.NotificationType5 = (S = class extends A {
		constructor(e) {
			super(e, 5), r(this, "_", void 0);
		}
	}, P(S, "NotificationType5"), S), e.NotificationType6 = (C = class extends A {
		constructor(e) {
			super(e, 6), r(this, "_", void 0);
		}
	}, P(C, "NotificationType6"), C), e.NotificationType7 = (ee = class extends A {
		constructor(e) {
			super(e, 7), r(this, "_", void 0);
		}
	}, P(ee, "NotificationType7"), ee), e.NotificationType8 = (w = class extends A {
		constructor(e) {
			super(e, 8), r(this, "_", void 0);
		}
	}, P(w, "NotificationType8"), w), e.NotificationType9 = (T = class extends A {
		constructor(e) {
			super(e, 9), r(this, "_", void 0);
		}
	}, P(T, "NotificationType9"), T);
	var re;
	(function(e) {
		function t(e) {
			let t = e;
			return t && O.string(t.method) && (O.string(t.id) || O.number(t.id));
		}
		P(t, "isRequest"), e.isRequest = t;
		function n(e) {
			let t = e;
			return t && O.string(t.method) && e.id === void 0;
		}
		P(n, "isNotification"), e.isNotification = n;
		function r(e) {
			let t = e;
			return t && (t.result !== void 0 || !!t.error) && (O.string(t.id) || O.number(t.id) || t.id === null);
		}
		P(r, "isResponse"), e.isResponse = r;
	})(re || (e.Message = re = {}));
} }), nn = F({ "../../node_modules/.pnpm/vscode-jsonrpc@9.0.3/node_modules/vscode-jsonrpc/lib/common/linkedMap.js"(e) {
	var t, n;
	let i, a;
	Object.defineProperty(e, "__esModule", { value: !0 }), e.LRUCache = e.LinkedMap = e.Touch = void 0;
	var o;
	(function(e) {
		e.None = 0, e.First = 1, e.AsOld = e.First, e.Last = 2, e.AsNew = e.Last;
	})(o || (e.Touch = o = {}));
	var s = (i = Symbol.toStringTag, a = Symbol.iterator, t = class {
		constructor() {
			r(this, i, "LinkedMap"), r(this, "_map", void 0), r(this, "_head", void 0), r(this, "_tail", void 0), r(this, "_size", void 0), r(this, "_state", void 0), this._map = /* @__PURE__ */ new Map(), this._head = void 0, this._tail = void 0, this._size = 0, this._state = 0;
		}
		clear() {
			this._map.clear(), this._head = void 0, this._tail = void 0, this._size = 0, this._state++;
		}
		isEmpty() {
			return !this._head && !this._tail;
		}
		get size() {
			return this._size;
		}
		get first() {
			return this._head?.value;
		}
		get last() {
			return this._tail?.value;
		}
		before(e) {
			let t = this._map.get(e);
			return t ? t.previous?.value : void 0;
		}
		after(e) {
			let t = this._map.get(e);
			return t ? t.next?.value : void 0;
		}
		has(e) {
			return this._map.has(e);
		}
		get(e, t = o.None) {
			let n = this._map.get(e);
			if (n) return t !== o.None && this.touch(n, t), n.value;
		}
		set(e, t, n = o.None) {
			let r = this._map.get(e);
			if (r) r.value = t, n !== o.None && this.touch(r, n);
			else {
				switch (r = {
					key: e,
					value: t,
					next: void 0,
					previous: void 0
				}, n) {
					case o.None:
						this.addItemLast(r);
						break;
					case o.First:
						this.addItemFirst(r);
						break;
					case o.Last:
						this.addItemLast(r);
						break;
					default: this.addItemLast(r);
				}
				this._map.set(e, r), this._size++;
			}
			return this;
		}
		delete(e) {
			return !!this.remove(e);
		}
		remove(e) {
			let t = this._map.get(e);
			if (t) return this._map.delete(e), this.removeItem(t), this._size--, t.value;
		}
		shift() {
			if (!this._head && !this._tail) return;
			if (!this._head || !this._tail) throw Error("Invalid list");
			let e = this._head;
			return this._map.delete(e.key), this.removeItem(e), this._size--, e.value;
		}
		forEach(e, t) {
			let n = this._state, r = this._head;
			for (; r;) {
				if (t ? e.bind(t)(r.value, r.key, this) : e(r.value, r.key, this), this._state !== n) throw Error("LinkedMap got modified during iteration.");
				r = r.next;
			}
		}
		keys() {
			let e = this._state, t = this._head, n = {
				[Symbol.iterator]: () => n,
				next: /* @__PURE__ */ P(() => {
					if (this._state !== e) throw Error("LinkedMap got modified during iteration.");
					if (t) {
						let e = {
							value: t.key,
							done: !1
						};
						return t = t.next, e;
					}
					return {
						value: void 0,
						done: !0
					};
				}, "next")
			};
			return n;
		}
		values() {
			let e = this._state, t = this._head, n = {
				[Symbol.iterator]: () => n,
				next: /* @__PURE__ */ P(() => {
					if (this._state !== e) throw Error("LinkedMap got modified during iteration.");
					if (t) {
						let e = {
							value: t.value,
							done: !1
						};
						return t = t.next, e;
					}
					return {
						value: void 0,
						done: !0
					};
				}, "next")
			};
			return n;
		}
		entries() {
			let e = this._state, t = this._head, n = {
				[Symbol.iterator]: () => n,
				next: /* @__PURE__ */ P(() => {
					if (this._state !== e) throw Error("LinkedMap got modified during iteration.");
					if (t) {
						let e = {
							value: [t.key, t.value],
							done: !1
						};
						return t = t.next, e;
					}
					return {
						value: void 0,
						done: !0
					};
				}, "next")
			};
			return n;
		}
		[a]() {
			return this.entries();
		}
		trimOld(e) {
			if (e >= this.size) return;
			if (e === 0) {
				this.clear();
				return;
			}
			let t = this._head, n = this.size;
			for (; t && n > e;) this._map.delete(t.key), t = t.next, n--;
			this._head = t, this._size = n, t && (t.previous = void 0), this._state++;
		}
		addItemFirst(e) {
			if (!this._head && !this._tail) this._tail = e;
			else if (this._head) e.next = this._head, this._head.previous = e;
			else throw Error("Invalid list");
			this._head = e, this._state++;
		}
		addItemLast(e) {
			if (!this._head && !this._tail) this._head = e;
			else if (this._tail) e.previous = this._tail, this._tail.next = e;
			else throw Error("Invalid list");
			this._tail = e, this._state++;
		}
		removeItem(e) {
			if (e === this._head && e === this._tail) this._head = void 0, this._tail = void 0;
			else if (e === this._head) {
				if (!e.next) throw Error("Invalid list");
				e.next.previous = void 0, this._head = e.next;
			} else if (e === this._tail) {
				if (!e.previous) throw Error("Invalid list");
				e.previous.next = void 0, this._tail = e.previous;
			} else {
				let t = e.next, n = e.previous;
				if (!t || !n) throw Error("Invalid list");
				t.previous = n, n.next = t;
			}
			e.next = void 0, e.previous = void 0, this._state++;
		}
		touch(e, t) {
			if (!this._head || !this._tail) throw Error("Invalid list");
			if (t === o.First || t === o.Last) {
				if (t === o.First) {
					if (e === this._head) return;
					let t = e.next, n = e.previous;
					e === this._tail ? (n.next = void 0, this._tail = n) : (t.previous = n, n.next = t), e.previous = void 0, e.next = this._head, this._head.previous = e, this._head = e, this._state++;
				} else if (t === o.Last) {
					if (e === this._tail) return;
					let t = e.next, n = e.previous;
					e === this._head ? (t.previous = void 0, this._head = t) : (t.previous = n, n.next = t), e.next = void 0, e.previous = this._tail, this._tail.next = e, this._tail = e, this._state++;
				}
			}
		}
		toJSON() {
			let e = [];
			return this.forEach((t, n) => {
				e.push([n, t]);
			}), e;
		}
		fromJSON(e) {
			this.clear();
			for (let [t, n] of e) this.set(t, n);
		}
	}, P(t, "LinkedMap"), t);
	e.LinkedMap = s, e.LRUCache = (n = class extends s {
		constructor(e, t = 1) {
			super(), r(this, "_limit", void 0), r(this, "_ratio", void 0), this._limit = e, this._ratio = Math.min(Math.max(0, t), 1);
		}
		get limit() {
			return this._limit;
		}
		set limit(e) {
			this._limit = e, this.checkTrim();
		}
		get ratio() {
			return this._ratio;
		}
		set ratio(e) {
			this._ratio = Math.min(Math.max(0, e), 1), this.checkTrim();
		}
		get(e, t = o.AsNew) {
			return super.get(e, t);
		}
		peek(e) {
			return super.get(e, o.None);
		}
		set(e, t) {
			return super.set(e, t, o.Last), this.checkTrim(), this;
		}
		checkTrim() {
			this.size > this._limit && this.trimOld(Math.round(this._limit * this._ratio));
		}
	}, P(n, "LRUCache"), n);
} }), rn = F({ "../../node_modules/.pnpm/vscode-jsonrpc@9.0.3/node_modules/vscode-jsonrpc/lib/common/disposable.js"(e) {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.Disposable = void 0;
	var t;
	(function(e) {
		function t(e) {
			return { dispose: e };
		}
		P(t, "create"), e.create = t;
	})(t || (e.Disposable = t = {}));
} }), an = F({ "../../node_modules/.pnpm/vscode-jsonrpc@9.0.3/node_modules/vscode-jsonrpc/lib/common/ral.js"(e) {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t;
	function n() {
		if (t === void 0) throw Error("No runtime abstraction layer installed");
		return t;
	}
	P(n, "RAL"), (function(e) {
		function n(e) {
			if (e === void 0) throw Error("No runtime abstraction layer provided");
			t = e;
		}
		P(n, "install"), e.install = n;
	})(n ||= {}), e.default = n;
} }), on = F({ "../../node_modules/.pnpm/vscode-jsonrpc@9.0.3/node_modules/vscode-jsonrpc/lib/common/events.js"(e) {
	var t, n, i = e && e.__importDefault || function(e) {
		return e && e.__esModule ? e : { default: e };
	};
	Object.defineProperty(e, "__esModule", { value: !0 }), e.Emitter = e.Event = void 0;
	var a = i(an()), o;
	(function(e) {
		let t = { dispose() {} };
		e.None = function() {
			return t;
		};
	})(o || (e.Event = o = {}));
	var s = (t = class {
		constructor() {
			r(this, "_callbacks", void 0), r(this, "_contexts", void 0);
		}
		add(e, t = null, n) {
			this._callbacks || (this._callbacks = [], this._contexts = []), this._callbacks.push(e), this._contexts.push(t), Array.isArray(n) && n.push({ dispose: /* @__PURE__ */ P(() => this.remove(e, t), "dispose") });
		}
		remove(e, t = null) {
			if (!this._callbacks) return;
			let n = !1;
			for (let r = 0, i = this._callbacks.length; r < i; r++) if (this._callbacks[r] === e) {
				if (this._contexts[r] === t) {
					this._callbacks.splice(r, 1), this._contexts.splice(r, 1);
					return;
				}
				n = !0;
			}
			if (n) throw Error("When adding a listener with a context, you should remove it with the same context");
		}
		invoke(...e) {
			if (!this._callbacks) return [];
			let t = [], n = this._callbacks.slice(0), r = this._contexts.slice(0);
			for (let i = 0, o = n.length; i < o; i++) try {
				t.push(n[i].apply(r[i], e));
			} catch (e) {
				(0, a.default)().console.error(e);
			}
			return t;
		}
		isEmpty() {
			return !this._callbacks || this._callbacks.length === 0;
		}
		dispose() {
			this._callbacks = void 0, this._contexts = void 0;
		}
	}, P(t, "CallbackList"), t);
	e.Emitter = (n = class e {
		constructor(e) {
			r(this, "_options", void 0), r(this, "_event", void 0), r(this, "_callbacks", void 0), this._options = e;
		}
		get event() {
			return this._event ||= (t, n, r) => {
				this._callbacks ||= new s(), this._options && this._options.onFirstListenerAdd && this._callbacks.isEmpty() && this._options.onFirstListenerAdd(this), this._callbacks.add(t, n);
				let i = { dispose: /* @__PURE__ */ P(() => {
					this._callbacks && (this._callbacks.remove(t, n), i.dispose = e._noop, this._options && this._options.onLastListenerRemove && this._callbacks.isEmpty() && this._options.onLastListenerRemove(this));
				}, "dispose") };
				return Array.isArray(r) && r.push(i), i;
			}, this._event;
		}
		fire(e) {
			this._callbacks && this._callbacks.invoke.call(this._callbacks, e);
		}
		dispose() {
			this._callbacks &&= (this._callbacks.dispose(), void 0);
		}
	}, P(n, "Emitter"), r(n, "_noop", /* @__PURE__ */ P(function() {}, "_noop")), n);
} }), sn = F({ "../../node_modules/.pnpm/vscode-jsonrpc@9.0.3/node_modules/vscode-jsonrpc/lib/common/cancellation.js"(e) {
	var t, n, i = e && e.__createBinding || (Object.create ? (function(e, t, n, r) {
		r === void 0 && (r = n);
		var i = Object.getOwnPropertyDescriptor(t, n);
		(!i || ("get" in i ? !t.__esModule : i.writable || i.configurable)) && (i = {
			enumerable: !0,
			get: /* @__PURE__ */ P(function() {
				return t[n];
			}, "get")
		}), Object.defineProperty(e, r, i);
	}) : (function(e, t, n, r) {
		r === void 0 && (r = n), e[r] = t[n];
	})), a = e && e.__setModuleDefault || (Object.create ? (function(e, t) {
		Object.defineProperty(e, "default", {
			enumerable: !0,
			value: t
		});
	}) : function(e, t) {
		e.default = t;
	}), o = e && e.__importStar || /* @__PURE__ */ (function() {
		var e = /* @__PURE__ */ P(function(t) {
			return e = Object.getOwnPropertyNames || function(e) {
				var t = [];
				for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[t.length] = n);
				return t;
			}, e(t);
		}, "ownKeys");
		return function(t) {
			if (t && t.__esModule) return t;
			var n = {};
			if (t != null) for (var r = e(t), o = 0; o < r.length; o++) r[o] !== "default" && i(n, t, r[o]);
			return a(n, t), n;
		};
	})(), s = e && e.__importDefault || function(e) {
		return e && e.__esModule ? e : { default: e };
	};
	Object.defineProperty(e, "__esModule", { value: !0 }), e.CancellationTokenSource = e.CancellationToken = void 0;
	var c = s(an()), l = o(en()), u = on(), d;
	(function(e) {
		e.None = Object.freeze({
			isCancellationRequested: !1,
			onCancellationRequested: u.Event.None
		}), e.Cancelled = Object.freeze({
			isCancellationRequested: !0,
			onCancellationRequested: u.Event.None
		});
		function t(t) {
			let n = t;
			return n && (n === e.None || n === e.Cancelled || l.boolean(n.isCancellationRequested) && !!n.onCancellationRequested);
		}
		P(t, "is"), e.is = t;
	})(d || (e.CancellationToken = d = {}));
	var f = Object.freeze(function(e, t) {
		let n = (0, c.default)().timer.setTimeout(e.bind(t), 0);
		return { dispose() {
			n.dispose();
		} };
	}), p = (t = class {
		constructor() {
			r(this, "_isCancelled", !1), r(this, "_emitter", void 0);
		}
		cancel() {
			this._isCancelled || (this._isCancelled = !0, this._emitter && (this._emitter.fire(void 0), this.dispose()));
		}
		get isCancellationRequested() {
			return this._isCancelled;
		}
		get onCancellationRequested() {
			return this._isCancelled ? f : (this._emitter ||= new u.Emitter(), this._emitter.event);
		}
		dispose() {
			this._emitter &&= (this._emitter.dispose(), void 0);
		}
	}, P(t, "MutableToken"), t);
	e.CancellationTokenSource = (n = class {
		constructor() {
			r(this, "_token", void 0);
		}
		get token() {
			return this._token ||= new p(), this._token;
		}
		cancel() {
			this._token ? this._token.cancel() : this._token = d.Cancelled;
		}
		dispose() {
			this._token ? this._token instanceof p && this._token.dispose() : this._token = d.None;
		}
	}, P(n, "CancellationTokenSource"), n);
} }), cn = F({ "../../node_modules/.pnpm/vscode-jsonrpc@9.0.3/node_modules/vscode-jsonrpc/lib/common/sharedArrayCancellation.js"(e) {
	var t, n, i, a;
	Object.defineProperty(e, "__esModule", { value: !0 }), e.SharedArrayReceiverStrategy = e.SharedArraySenderStrategy = void 0;
	var o = sn(), s;
	(function(e) {
		e.Continue = 0, e.Cancelled = 1;
	})(s ||= {}), e.SharedArraySenderStrategy = (t = class {
		constructor() {
			r(this, "buffers", void 0), this.buffers = /* @__PURE__ */ new Map();
		}
		enableCancellation(e) {
			if (e.id === null) return;
			let t = new SharedArrayBuffer(4), n = new Int32Array(t, 0, 1);
			n[0] = s.Continue, this.buffers.set(e.id, t), e.$cancellationData = t;
		}
		async sendCancellation(e, t) {
			let n = this.buffers.get(t);
			if (n === void 0) return;
			let r = new Int32Array(n, 0, 1);
			Atomics.store(r, 0, s.Cancelled);
		}
		cleanup(e) {
			this.buffers.delete(e);
		}
		dispose() {
			this.buffers.clear();
		}
	}, P(t, "SharedArraySenderStrategy"), t);
	var c = (n = class {
		constructor(e) {
			r(this, "data", void 0), this.data = new Int32Array(e, 0, 1);
		}
		get isCancellationRequested() {
			return Atomics.load(this.data, 0) === s.Cancelled;
		}
		get onCancellationRequested() {
			throw Error("Cancellation over SharedArrayBuffer doesn't support cancellation events");
		}
	}, P(n, "SharedArrayBufferCancellationToken"), n), l = (i = class {
		constructor(e) {
			r(this, "token", void 0), this.token = new c(e);
		}
		cancel() {}
		dispose() {}
	}, P(i, "SharedArrayBufferCancellationTokenSource"), i);
	e.SharedArrayReceiverStrategy = (a = class {
		constructor() {
			r(this, "kind", "request");
		}
		createCancellationTokenSource(e) {
			let t = e.$cancellationData;
			return t === void 0 ? new o.CancellationTokenSource() : new l(t);
		}
	}, P(a, "SharedArrayReceiverStrategy"), a);
} }), ln = F({ "../../node_modules/.pnpm/vscode-jsonrpc@9.0.3/node_modules/vscode-jsonrpc/lib/common/semaphore.js"(e) {
	var t, n = e && e.__importDefault || function(e) {
		return e && e.__esModule ? e : { default: e };
	};
	Object.defineProperty(e, "__esModule", { value: !0 }), e.Semaphore = void 0;
	var i = n(an());
	e.Semaphore = (t = class {
		constructor(e = 1) {
			if (r(this, "_capacity", void 0), r(this, "_active", void 0), r(this, "_waiting", void 0), e <= 0) throw Error("Capacity must be greater than 0");
			this._capacity = e, this._active = 0, this._waiting = [];
		}
		lock(e) {
			return new Promise((t, n) => {
				this._waiting.push({
					thunk: e,
					resolve: t,
					reject: n
				}), this.runNext();
			});
		}
		get active() {
			return this._active;
		}
		runNext() {
			this._waiting.length === 0 || this._active === this._capacity || (0, i.default)().timer.setImmediate(() => this.doRunNext());
		}
		doRunNext() {
			if (this._waiting.length === 0 || this._active === this._capacity) return;
			let e = this._waiting.shift();
			if (this._active++, this._active > this._capacity) throw Error("Too many thunks active");
			try {
				let t = e.thunk();
				t instanceof Promise ? t.then((t) => {
					this._active--, e.resolve(t), this.runNext();
				}, (t) => {
					this._active--, e.reject(t), this.runNext();
				}) : (this._active--, e.resolve(t), this.runNext());
			} catch (t) {
				this._active--, e.reject(t), this.runNext();
			}
		}
	}, P(t, "Semaphore"), t);
} }), un = F({ "../../node_modules/.pnpm/vscode-jsonrpc@9.0.3/node_modules/vscode-jsonrpc/lib/common/messageReader.js"(e) {
	var t, n, i = e && e.__createBinding || (Object.create ? (function(e, t, n, r) {
		r === void 0 && (r = n);
		var i = Object.getOwnPropertyDescriptor(t, n);
		(!i || ("get" in i ? !t.__esModule : i.writable || i.configurable)) && (i = {
			enumerable: !0,
			get: /* @__PURE__ */ P(function() {
				return t[n];
			}, "get")
		}), Object.defineProperty(e, r, i);
	}) : (function(e, t, n, r) {
		r === void 0 && (r = n), e[r] = t[n];
	})), a = e && e.__setModuleDefault || (Object.create ? (function(e, t) {
		Object.defineProperty(e, "default", {
			enumerable: !0,
			value: t
		});
	}) : function(e, t) {
		e.default = t;
	}), o = e && e.__importStar || /* @__PURE__ */ (function() {
		var e = /* @__PURE__ */ P(function(t) {
			return e = Object.getOwnPropertyNames || function(e) {
				var t = [];
				for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[t.length] = n);
				return t;
			}, e(t);
		}, "ownKeys");
		return function(t) {
			if (t && t.__esModule) return t;
			var n = {};
			if (t != null) for (var r = e(t), o = 0; o < r.length; o++) r[o] !== "default" && i(n, t, r[o]);
			return a(n, t), n;
		};
	})(), s = e && e.__importDefault || function(e) {
		return e && e.__esModule ? e : { default: e };
	};
	Object.defineProperty(e, "__esModule", { value: !0 }), e.ReadableStreamMessageReader = e.AbstractMessageReader = e.MessageReader = void 0;
	var c = s(an()), l = o(en()), u = on(), d = ln(), f;
	(function(e) {
		function t(e) {
			let t = e;
			return t && l.func(t.listen) && l.func(t.dispose) && l.func(t.onError) && l.func(t.onClose) && l.func(t.onPartialMessage);
		}
		P(t, "is"), e.is = t;
	})(f || (e.MessageReader = f = {}));
	var p = (t = class {
		constructor() {
			r(this, "errorEmitter", void 0), r(this, "closeEmitter", void 0), r(this, "partialMessageEmitter", void 0), this.errorEmitter = new u.Emitter(), this.closeEmitter = new u.Emitter(), this.partialMessageEmitter = new u.Emitter();
		}
		dispose() {
			this.errorEmitter.dispose(), this.closeEmitter.dispose(), this.partialMessageEmitter.dispose();
		}
		get onError() {
			return this.errorEmitter.event;
		}
		fireError(e) {
			this.errorEmitter.fire(this.asError(e));
		}
		get onClose() {
			return this.closeEmitter.event;
		}
		fireClose() {
			this.closeEmitter.fire(void 0);
		}
		get onPartialMessage() {
			return this.partialMessageEmitter.event;
		}
		firePartialMessage(e) {
			this.partialMessageEmitter.fire(e);
		}
		asError(e) {
			return e instanceof Error ? e : /* @__PURE__ */ Error(`Reader received error. Reason: ${l.string(e.message) ? e.message : "unknown"}`);
		}
	}, P(t, "AbstractMessageReader"), t);
	e.AbstractMessageReader = p;
	var m;
	(function(e) {
		function t(e) {
			let t, n, r = /* @__PURE__ */ new Map(), i, a = /* @__PURE__ */ new Map();
			if (e === void 0 || typeof e == "string") t = e ?? "utf-8";
			else {
				if (t = e.charset ?? "utf-8", e.contentDecoder !== void 0 && (n = e.contentDecoder, r.set(n.name, n)), e.contentDecoders !== void 0) for (let t of e.contentDecoders) r.set(t.name, t);
				if (e.contentTypeDecoder !== void 0 && (i = e.contentTypeDecoder, a.set(i.name, i)), e.contentTypeDecoders !== void 0) for (let t of e.contentTypeDecoders) a.set(t.name, t);
			}
			return i === void 0 && (i = (0, c.default)().applicationJson.decoder, a.set(i.name, i)), {
				charset: t,
				contentDecoder: n,
				contentDecoders: r,
				contentTypeDecoder: i,
				contentTypeDecoders: a
			};
		}
		P(t, "fromOptions"), e.fromOptions = t;
	})(m ||= {}), e.ReadableStreamMessageReader = (n = class extends p {
		constructor(e, t) {
			super(), r(this, "readable", void 0), r(this, "options", void 0), r(this, "callback", void 0), r(this, "nextMessageLength", void 0), r(this, "messageToken", void 0), r(this, "buffer", void 0), r(this, "partialMessageTimer", void 0), r(this, "_partialMessageTimeout", void 0), r(this, "readSemaphore", void 0), this.readable = e, this.options = m.fromOptions(t), this.buffer = (0, c.default)().messageBuffer.create(this.options.charset), this._partialMessageTimeout = 1e4, this.nextMessageLength = -1, this.messageToken = 0, this.readSemaphore = new d.Semaphore(1);
		}
		set partialMessageTimeout(e) {
			this._partialMessageTimeout = e;
		}
		get partialMessageTimeout() {
			return this._partialMessageTimeout;
		}
		listen(e) {
			this.nextMessageLength = -1, this.messageToken = 0, this.partialMessageTimer = void 0, this.callback = e;
			let t = this.readable.onData((e) => {
				this.onData(e);
			});
			return this.readable.onError((e) => this.fireError(e)), this.readable.onClose(() => this.fireClose()), t;
		}
		onData(e) {
			try {
				for (this.buffer.append(e);;) {
					if (this.nextMessageLength === -1) {
						let e = this.buffer.tryReadHeaders(!0);
						if (!e) return;
						let t = e.get("content-length");
						if (!t) {
							this.fireError(/* @__PURE__ */ Error(`Header must provide a Content-Length property.
${JSON.stringify(Object.fromEntries(e))}`));
							return;
						}
						let n = parseInt(t);
						if (isNaN(n)) {
							this.fireError(/* @__PURE__ */ Error(`Content-Length value must be a number. Got ${t}`));
							return;
						}
						this.nextMessageLength = n;
					}
					let e = this.buffer.tryReadBody(this.nextMessageLength);
					if (e === void 0) {
						this.setPartialMessageTimer();
						return;
					}
					this.clearPartialMessageTimer(), this.nextMessageLength = -1, this.readSemaphore.lock(async () => {
						let t = this.options.contentDecoder === void 0 ? e : await this.options.contentDecoder.decode(e), n = await this.options.contentTypeDecoder.decode(t, this.options);
						this.callback(n);
					}).catch((e) => {
						this.fireError(e);
					});
				}
			} catch (e) {
				this.fireError(e);
			}
		}
		clearPartialMessageTimer() {
			this.partialMessageTimer &&= (this.partialMessageTimer.dispose(), void 0);
		}
		setPartialMessageTimer() {
			this.clearPartialMessageTimer(), !(this._partialMessageTimeout <= 0) && (this.partialMessageTimer = (0, c.default)().timer.setTimeout((e, t) => {
				this.partialMessageTimer = void 0, e === this.messageToken && (this.firePartialMessage({
					messageToken: e,
					waitingTime: t
				}), this.setPartialMessageTimer());
			}, this._partialMessageTimeout, this.messageToken, this._partialMessageTimeout));
		}
	}, P(n, "ReadableStreamMessageReader"), n);
} }), dn = F({ "../../node_modules/.pnpm/vscode-jsonrpc@9.0.3/node_modules/vscode-jsonrpc/lib/common/messageWriter.js"(e) {
	var t, n, i = e && e.__createBinding || (Object.create ? (function(e, t, n, r) {
		r === void 0 && (r = n);
		var i = Object.getOwnPropertyDescriptor(t, n);
		(!i || ("get" in i ? !t.__esModule : i.writable || i.configurable)) && (i = {
			enumerable: !0,
			get: /* @__PURE__ */ P(function() {
				return t[n];
			}, "get")
		}), Object.defineProperty(e, r, i);
	}) : (function(e, t, n, r) {
		r === void 0 && (r = n), e[r] = t[n];
	})), a = e && e.__setModuleDefault || (Object.create ? (function(e, t) {
		Object.defineProperty(e, "default", {
			enumerable: !0,
			value: t
		});
	}) : function(e, t) {
		e.default = t;
	}), o = e && e.__importStar || /* @__PURE__ */ (function() {
		var e = /* @__PURE__ */ P(function(t) {
			return e = Object.getOwnPropertyNames || function(e) {
				var t = [];
				for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[t.length] = n);
				return t;
			}, e(t);
		}, "ownKeys");
		return function(t) {
			if (t && t.__esModule) return t;
			var n = {};
			if (t != null) for (var r = e(t), o = 0; o < r.length; o++) r[o] !== "default" && i(n, t, r[o]);
			return a(n, t), n;
		};
	})(), s = e && e.__importDefault || function(e) {
		return e && e.__esModule ? e : { default: e };
	};
	Object.defineProperty(e, "__esModule", { value: !0 }), e.WriteableStreamMessageWriter = e.AbstractMessageWriter = e.MessageWriter = void 0;
	var c = s(an()), l = o(en()), u = ln(), d = on(), f = "Content-Length: ", p = "\r\n", m;
	(function(e) {
		function t(e) {
			let t = e;
			return t && l.func(t.dispose) && l.func(t.onClose) && l.func(t.onError) && l.func(t.write);
		}
		P(t, "is"), e.is = t;
	})(m || (e.MessageWriter = m = {}));
	var h = (t = class {
		constructor() {
			r(this, "errorEmitter", void 0), r(this, "closeEmitter", void 0), this.errorEmitter = new d.Emitter(), this.closeEmitter = new d.Emitter();
		}
		dispose() {
			this.errorEmitter.dispose(), this.closeEmitter.dispose();
		}
		get onError() {
			return this.errorEmitter.event;
		}
		fireError(e, t, n) {
			this.errorEmitter.fire([
				this.asError(e),
				t,
				n
			]);
		}
		get onClose() {
			return this.closeEmitter.event;
		}
		fireClose() {
			this.closeEmitter.fire(void 0);
		}
		asError(e) {
			return e instanceof Error ? e : /* @__PURE__ */ Error(`Writer received error. Reason: ${l.string(e.message) ? e.message : "unknown"}`);
		}
	}, P(t, "AbstractMessageWriter"), t);
	e.AbstractMessageWriter = h;
	var g;
	(function(e) {
		function t(e) {
			return e === void 0 || typeof e == "string" ? {
				charset: e ?? "utf-8",
				contentTypeEncoder: (0, c.default)().applicationJson.encoder
			} : {
				charset: e.charset ?? "utf-8",
				contentEncoder: e.contentEncoder,
				contentTypeEncoder: e.contentTypeEncoder ?? (0, c.default)().applicationJson.encoder
			};
		}
		P(t, "fromOptions"), e.fromOptions = t;
	})(g ||= {}), e.WriteableStreamMessageWriter = (n = class extends h {
		constructor(e, t) {
			super(), r(this, "writable", void 0), r(this, "options", void 0), r(this, "errorCount", void 0), r(this, "writeSemaphore", void 0), this.writable = e, this.options = g.fromOptions(t), this.errorCount = 0, this.writeSemaphore = new u.Semaphore(1), this.writable.onError((e) => this.fireError(e)), this.writable.onClose(() => this.fireClose());
		}
		async write(e) {
			return this.writeSemaphore.lock(async () => this.options.contentTypeEncoder.encode(e, this.options).then((e) => this.options.contentEncoder === void 0 ? e : this.options.contentEncoder.encode(e)).then((t) => {
				let n = [];
				return n.push(f, t.byteLength.toString(), p), n.push(p), this.doWrite(e, n, t);
			}, (e) => {
				throw this.fireError(e), e;
			}));
		}
		async doWrite(e, t, n) {
			try {
				return await this.writable.write(t.join(""), "ascii"), this.writable.write(n);
			} catch (t) {
				return this.handleError(t, e), Promise.reject(t);
			}
		}
		handleError(e, t) {
			this.errorCount++, this.fireError(e, t, this.errorCount);
		}
		end() {
			this.writable.end();
		}
	}, P(n, "WriteableStreamMessageWriter"), n);
} }), fn = F({ "../../node_modules/.pnpm/vscode-jsonrpc@9.0.3/node_modules/vscode-jsonrpc/lib/common/messageBuffer.js"(e) {
	var t;
	Object.defineProperty(e, "__esModule", { value: !0 }), e.AbstractMessageBuffer = void 0;
	var n = 13, i = 10, a = "\r\n";
	e.AbstractMessageBuffer = (t = class {
		constructor(e = "utf-8") {
			r(this, "_encoding", void 0), r(this, "_chunks", void 0), r(this, "_totalLength", void 0), this._encoding = e, this._chunks = [], this._totalLength = 0;
		}
		get encoding() {
			return this._encoding;
		}
		append(e) {
			let t = typeof e == "string" ? this.fromString(e, this._encoding) : e;
			this._chunks.push(t), this._totalLength += t.byteLength;
		}
		tryReadHeaders(e = !1) {
			if (this._chunks.length === 0) return;
			let t = 0, r = 0, o = 0, s = 0;
			e: for (; r < this._chunks.length;) {
				let e = this._chunks[r];
				for (o = 0; o < e.length;) {
					switch (e[o]) {
						case n:
							switch (t) {
								case 0:
									t = 1;
									break;
								case 2:
									t = 3;
									break;
								default: t = 0;
							}
							break;
						case i:
							switch (t) {
								case 1:
									t = 2;
									break;
								case 3:
									t = 4, o++;
									break e;
								default: t = 0;
							}
							break;
						default: t = 0;
					}
					o++;
				}
				s += e.byteLength, r++;
			}
			if (t !== 4) return;
			let c = this._read(s + o), l = /* @__PURE__ */ new Map(), u = this.toString(c, "ascii").split(a);
			if (u.length < 2) return l;
			for (let t = 0; t < u.length - 2; t++) {
				let n = u[t], r = n.indexOf(":");
				if (r === -1) throw Error(`Message header must separate key and value using ':'
${n}`);
				let i = n.substr(0, r), a = n.substr(r + 1).trim();
				l.set(e ? i.toLowerCase() : i, a);
			}
			return l;
		}
		tryReadBody(e) {
			if (!(this._totalLength < e)) return this._read(e);
		}
		get numberOfBytes() {
			return this._totalLength;
		}
		_read(e) {
			if (e === 0) return this.emptyBuffer();
			if (e > this._totalLength) throw Error("Cannot read so many bytes!");
			if (this._chunks[0].byteLength === e) {
				let t = this._chunks[0];
				return this._chunks.shift(), this._totalLength -= e, this.asNative(t);
			}
			if (this._chunks[0].byteLength > e) {
				let t = this._chunks[0], n = this.asNative(t, e);
				return this._chunks[0] = t.slice(e), this._totalLength -= e, n;
			}
			let t = this.allocNative(e), n = 0;
			for (; e > 0;) {
				let r = this._chunks[0];
				if (r.byteLength > e) {
					let i = r.slice(0, e);
					t.set(i, n), n += e, this._chunks[0] = r.slice(e), this._totalLength -= e, e -= e;
				} else t.set(r, n), n += r.byteLength, this._chunks.shift(), this._totalLength -= r.byteLength, e -= r.byteLength;
			}
			return t;
		}
	}, P(t, "AbstractMessageBuffer"), t);
} }), pn = F({ "../../node_modules/.pnpm/vscode-jsonrpc@9.0.3/node_modules/vscode-jsonrpc/lib/common/connection.js"(e) {
	var t, n, i = e && e.__createBinding || (Object.create ? (function(e, t, n, r) {
		r === void 0 && (r = n);
		var i = Object.getOwnPropertyDescriptor(t, n);
		(!i || ("get" in i ? !t.__esModule : i.writable || i.configurable)) && (i = {
			enumerable: !0,
			get: /* @__PURE__ */ P(function() {
				return t[n];
			}, "get")
		}), Object.defineProperty(e, r, i);
	}) : (function(e, t, n, r) {
		r === void 0 && (r = n), e[r] = t[n];
	})), a = e && e.__setModuleDefault || (Object.create ? (function(e, t) {
		Object.defineProperty(e, "default", {
			enumerable: !0,
			value: t
		});
	}) : function(e, t) {
		e.default = t;
	}), o = e && e.__importStar || /* @__PURE__ */ (function() {
		var e = /* @__PURE__ */ P(function(t) {
			return e = Object.getOwnPropertyNames || function(e) {
				var t = [];
				for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[t.length] = n);
				return t;
			}, e(t);
		}, "ownKeys");
		return function(t) {
			if (t && t.__esModule) return t;
			var n = {};
			if (t != null) for (var r = e(t), o = 0; o < r.length; o++) r[o] !== "default" && i(n, t, r[o]);
			return a(n, t), n;
		};
	})(), s = e && e.__importDefault || function(e) {
		return e && e.__esModule ? e : { default: e };
	};
	Object.defineProperty(e, "__esModule", { value: !0 }), e.ConnectionOptions = e.MessageStrategy = e.CancellationStrategy = e.CancellationSenderStrategy = e.CancellationReceiverStrategy = e.RequestCancellationReceiverStrategy = e.IdCancellationReceiverStrategy = e.ConnectionStrategy = e.ConnectionError = e.ConnectionErrors = e.LogTraceNotification = e.SetTraceNotification = e.TraceFormat = e.TraceValues = e.TraceValue = e.Trace = e.NullLogger = e.ProgressType = e.ProgressToken = void 0, e.createMessageConnection = re;
	var c = s(an()), l = o(en()), u = tn(), d = nn(), f = on(), p = sn(), m;
	(function(e) {
		e.type = new u.NotificationType("$/cancelRequest");
	})(m ||= {});
	var h;
	(function(e) {
		function t(e) {
			return typeof e == "string" || typeof e == "number";
		}
		P(t, "is"), e.is = t;
	})(h || (e.ProgressToken = h = {}));
	var g;
	(function(e) {
		e.type = new u.NotificationType("$/progress");
	})(g ||= {}), e.ProgressType = (t = class {
		constructor() {
			r(this, "__", void 0), r(this, "_pr", void 0);
		}
	}, P(t, "ProgressType"), t);
	var _;
	(function(e) {
		function t(e) {
			return l.func(e);
		}
		P(t, "is"), e.is = t;
	})(_ ||= {}), e.NullLogger = Object.freeze({
		error: /* @__PURE__ */ P(() => {}, "error"),
		warn: /* @__PURE__ */ P(() => {}, "warn"),
		info: /* @__PURE__ */ P(() => {}, "info"),
		log: /* @__PURE__ */ P(() => {}, "log")
	});
	var v;
	(function(e) {
		e[e.Off = 0] = "Off", e[e.Messages = 1] = "Messages", e[e.Compact = 2] = "Compact", e[e.Verbose = 3] = "Verbose";
	})(v || (e.Trace = v = {}));
	var y;
	(function(e) {
		e.Off = "off", e.Messages = "messages", e.Compact = "compact", e.Verbose = "verbose";
	})(y || (e.TraceValue = y = {})), e.TraceValues = y, (function(e) {
		function t(t) {
			if (!l.string(t)) return e.Off;
			switch (t = t.toLowerCase(), t) {
				case "off": return e.Off;
				case "messages": return e.Messages;
				case "compact": return e.Compact;
				case "verbose": return e.Verbose;
				default: return e.Off;
			}
		}
		P(t, "fromString"), e.fromString = t;
		function n(t) {
			switch (t) {
				case e.Off: return "off";
				case e.Messages: return "messages";
				case e.Compact: return "compact";
				case e.Verbose: return "verbose";
				default: return "off";
			}
		}
		P(n, "toString"), e.toString = n;
	})(v || (e.Trace = v = {}));
	var b;
	(function(e) {
		e.Text = "text", e.JSON = "json";
	})(b || (e.TraceFormat = b = {})), (function(e) {
		function t(t) {
			return l.string(t) ? (t = t.toLowerCase(), t === "json" ? e.JSON : e.Text) : e.Text;
		}
		P(t, "fromString"), e.fromString = t;
	})(b || (e.TraceFormat = b = {}));
	var x;
	(function(e) {
		e.type = new u.NotificationType("$/setTrace");
	})(x || (e.SetTraceNotification = x = {}));
	var S;
	(function(e) {
		e.type = new u.NotificationType("$/logTrace");
	})(S || (e.LogTraceNotification = S = {}));
	var C;
	(function(e) {
		e[e.Closed = 1] = "Closed", e[e.Disposed = 2] = "Disposed", e[e.AlreadyListening = 3] = "AlreadyListening";
	})(C || (e.ConnectionErrors = C = {}));
	var ee = (n = class e extends Error {
		constructor(t, n) {
			super(n), r(this, "code", void 0), this.code = t, Object.setPrototypeOf(this, e.prototype);
		}
	}, P(n, "ConnectionError"), n);
	e.ConnectionError = ee;
	var w;
	(function(e) {
		function t(e) {
			let t = e;
			return t && l.func(t.cancelUndispatched);
		}
		P(t, "is"), e.is = t;
	})(w || (e.ConnectionStrategy = w = {}));
	var T;
	(function(e) {
		function t(e) {
			let t = e;
			return t && (t.kind === void 0 || t.kind === "id") && l.func(t.createCancellationTokenSource) && (t.dispose === void 0 || l.func(t.dispose));
		}
		P(t, "is"), e.is = t;
	})(T || (e.IdCancellationReceiverStrategy = T = {}));
	var te;
	(function(e) {
		function t(e) {
			let t = e;
			return t && t.kind === "request" && l.func(t.createCancellationTokenSource) && (t.dispose === void 0 || l.func(t.dispose));
		}
		P(t, "is"), e.is = t;
	})(te || (e.RequestCancellationReceiverStrategy = te = {}));
	var E;
	(function(e) {
		e.Message = Object.freeze({ createCancellationTokenSource(e) {
			return new p.CancellationTokenSource();
		} });
		function t(e) {
			return T.is(e) || te.is(e);
		}
		P(t, "is"), e.is = t;
	})(E || (e.CancellationReceiverStrategy = E = {}));
	var D;
	(function(e) {
		e.Message = Object.freeze({
			sendCancellation(e, t) {
				return e.sendNotification(m.type, { id: t });
			},
			cleanup(e) {}
		});
		function t(e) {
			let t = e;
			return t && l.func(t.sendCancellation) && l.func(t.cleanup);
		}
		P(t, "is"), e.is = t;
	})(D || (e.CancellationSenderStrategy = D = {}));
	var O;
	(function(e) {
		e.Message = Object.freeze({
			receiver: E.Message,
			sender: D.Message
		});
		function t(e) {
			let t = e;
			return t && E.is(t.receiver) && D.is(t.sender);
		}
		P(t, "is"), e.is = t;
	})(O || (e.CancellationStrategy = O = {}));
	var ne;
	(function(e) {
		function t(e) {
			let t = e;
			return t && l.func(t.handleMessage);
		}
		P(t, "is"), e.is = t;
	})(ne || (e.MessageStrategy = ne = {}));
	var k;
	(function(e) {
		function t(e) {
			let t = e;
			return t && (O.is(t.cancellationStrategy) || w.is(t.connectionStrategy) || ne.is(t.messageStrategy) || l.number(t.maxParallelism));
		}
		P(t, "is"), e.is = t;
	})(k || (e.ConnectionOptions = k = {}));
	var A;
	(function(e) {
		e[e.New = 1] = "New", e[e.Listening = 2] = "Listening", e[e.Closed = 3] = "Closed", e[e.Disposed = 4] = "Disposed";
	})(A ||= {});
	function re(t, n, r, i) {
		let a = r === void 0 ? e.NullLogger : r, o = 0, s = 0, y = 0, w = i?.maxParallelism ?? -1, te = 0, E, D = /* @__PURE__ */ new Map(), k, re = /* @__PURE__ */ new Map(), ie = /* @__PURE__ */ new Map(), ae, j = new d.LinkedMap(), oe = /* @__PURE__ */ new Map(), se = /* @__PURE__ */ new Set(), ce = /* @__PURE__ */ new Map(), M = v.Off, le = b.Text, N, ue = A.New, de = new f.Emitter(), fe = new f.Emitter(), pe = new f.Emitter(), me = new f.Emitter(), he = new f.Emitter(), ge = i && i.cancellationStrategy ? i.cancellationStrategy : O.Message;
		function _e(e) {}
		P(_e, "cancelUndispatched");
		function ve() {
			return ue === A.Listening;
		}
		P(ve, "isListening");
		function ye() {
			return ue === A.Closed;
		}
		P(ye, "isClosed");
		function be() {
			return ue === A.Disposed;
		}
		P(be, "isDisposed");
		function xe() {
			(ue === A.New || ue === A.Listening) && (ue = A.Closed, fe.fire(void 0));
		}
		P(xe, "closeHandler");
		function Se(e) {
			de.fire([
				e,
				void 0,
				void 0
			]);
		}
		P(Se, "readErrorHandler");
		function Ce(e) {
			de.fire(e);
		}
		P(Ce, "writeErrorHandler"), t.onClose(xe), t.onError(Se), n.onClose(xe), n.onError(Ce);
		function we(e) {
			if (e === null) throw Error("Can't send requests with id null since the response can't be correlated.");
			return "req-" + e.toString();
		}
		P(we, "createRequestQueueKey");
		function Te(e) {
			return e === null ? "res-unknown-" + (++y).toString() : "res-" + e.toString();
		}
		P(Te, "createResponseQueueKey");
		function Ee() {
			return "not-" + (++s).toString();
		}
		P(Ee, "createNotificationQueueKey");
		function De(e, t) {
			u.Message.isRequest(t) ? e.set(we(t.id), t) : u.Message.isResponse(t) ? w === -1 ? e.set(Te(t.id), t) : Me(t) : e.set(Ee(), t);
		}
		P(De, "addMessageToQueue");
		function Oe() {
			ae || j.size === 0 || w !== -1 && te >= w || (ae = (0, c.default)().timer.setImmediate(async () => {
				if (ae = void 0, j.size === 0 || w !== -1 && te >= w) return;
				let e = j.shift(), t;
				try {
					te++;
					let n = i?.messageStrategy;
					t = ne.is(n) ? n.handleMessage(e, ke) : ke(e);
				} catch (e) {
					a.error(`Processing message queue failed: ${e.toString()}`);
				} finally {
					t instanceof Promise ? t.then(() => {
						te--, Oe();
					}).catch((e) => {
						a.error(`Processing message queue failed: ${e.toString()}`);
					}) : te--, Oe();
				}
			}));
		}
		P(Oe, "triggerMessageQueue");
		async function ke(e) {
			return u.Message.isRequest(e) ? je(e) : u.Message.isNotification(e) ? Ne(e) : u.Message.isResponse(e) ? Me(e) : Pe(e);
		}
		P(ke, "handleMessage");
		let Ae = /* @__PURE__ */ P((e) => {
			try {
				if (u.Message.isNotification(e) && e.method === m.type.method) {
					let t = e.params.id, r = we(t), o = j.get(r);
					if (u.Message.isRequest(o)) {
						let s = i?.connectionStrategy, c = s && s.cancelUndispatched ? s.cancelUndispatched(o, _e) : void 0;
						if (c && (c.error !== void 0 || c.result !== void 0)) {
							j.delete(r), ce.delete(t), c.id = o.id, Re(c, e.method, Date.now()), n.write(c).catch(() => a.error("Sending response for canceled message failed."));
							return;
						}
					}
					let s = ce.get(t);
					if (s !== void 0) {
						s.cancel(), Be(e);
						return;
					}
					se.add(t);
				}
				De(j, e);
			} finally {
				Oe();
			}
		}, "callback");
		async function je(e) {
			if (be()) return Promise.resolve();
			function t(t, r, i) {
				let a = {
					jsonrpc: "2.0",
					id: e.id
				};
				return t instanceof u.ResponseError ? a.error = t.toJson() : a.result = t === void 0 ? null : t, Re(a, r, i), n.write(a);
			}
			P(t, "reply");
			function r(t, r, i) {
				let a = {
					jsonrpc: "2.0",
					id: e.id,
					error: t.toJson()
				};
				return Re(a, r, i), n.write(a);
			}
			P(r, "replyError"), ze(e);
			let i = D.get(e.method), a, o;
			i && (a = i.type, o = i.handler);
			let s = Date.now();
			if (o || E) {
				let n = e.id ?? String(Date.now()), i = T.is(ge.receiver) ? ge.receiver.createCancellationTokenSource(n) : ge.receiver.createCancellationTokenSource(e);
				e.id !== null && se.has(e.id) && i.cancel(), e.id !== null && ce.set(n, i);
				try {
					let n;
					if (o) {
						if (e.params === void 0) {
							if (a !== void 0 && a.numberOfParams !== 0) return r(new u.ResponseError(u.ErrorCodes.InvalidParams, `Request ${e.method} defines ${a.numberOfParams} params but received none.`), e.method, s);
							n = o(i.token);
						} else if (Array.isArray(e.params)) {
							if (a !== void 0 && a.parameterStructures === u.ParameterStructures.byName) return r(new u.ResponseError(u.ErrorCodes.InvalidParams, `Request ${e.method} defines parameters by name but received parameters by position`), e.method, s);
							n = o(...e.params, i.token);
						} else {
							if (a !== void 0 && a.parameterStructures === u.ParameterStructures.byPosition) return r(new u.ResponseError(u.ErrorCodes.InvalidParams, `Request ${e.method} defines parameters by position but received parameters by name`), e.method, s);
							n = o(e.params, i.token);
						}
					} else E && (n = E(e.method, e.params, i.token));
					await t(await n, e.method, s);
				} catch (n) {
					n instanceof u.ResponseError ? await t(n, e.method, s) : n && l.string(n.message) ? await r(new u.ResponseError(u.ErrorCodes.InternalError, `Request ${e.method} failed with message: ${n.message}`), e.method, s) : await r(new u.ResponseError(u.ErrorCodes.InternalError, `Request ${e.method} failed unexpectedly without providing any details.`), e.method, s);
				} finally {
					ce.delete(n);
				}
			} else await r(new u.ResponseError(u.ErrorCodes.MethodNotFound, `Unhandled method ${e.method}`), e.method, s);
		}
		P(je, "handleRequest");
		function Me(e) {
			if (!be()) {
				if (e.id === null) e.error ? a.error(`Received response message without id: Error is: 
${JSON.stringify(e.error, void 0, 4)}`) : a.error("Received response message without id. No further error information provided.");
				else {
					let t = e.id, n = oe.get(t);
					if (Ve(e, n), n !== void 0) {
						oe.delete(t);
						try {
							if (e.error) {
								let t = e.error;
								n.reject(new u.ResponseError(t.code, t.message, t.data));
							} else if (e.result !== void 0) n.resolve(e.result);
							else throw Error("Should never happen.");
						} catch (e) {
							e.message ? a.error(`Response handler '${n.method}' failed with message: ${e.message}`) : a.error(`Response handler '${n.method}' failed unexpectedly.`);
						}
					}
				}
			}
		}
		P(Me, "handleResponse");
		async function Ne(e) {
			if (be()) return;
			let t, n;
			if (e.method === m.type.method) {
				let t = e.params.id;
				se.delete(t), Be(e);
			} else {
				{
					let r = re.get(e.method);
					r && (n = r.handler, t = r.type);
				}
				if (n || k) try {
					if (Be(e), n) {
						if (e.params === void 0) t !== void 0 && t.numberOfParams !== 0 && t.parameterStructures !== u.ParameterStructures.byName && a.error(`Notification ${e.method} defines ${t.numberOfParams} params but received none.`), await n();
						else if (Array.isArray(e.params)) {
							let r = e.params;
							e.method === g.type.method && r.length === 2 && h.is(r[0]) ? await n({
								token: r[0],
								value: r[1]
							}) : (t !== void 0 && (t.parameterStructures === u.ParameterStructures.byName && a.error(`Notification ${e.method} defines parameters by name but received parameters by position`), t.numberOfParams !== e.params.length && a.error(`Notification ${e.method} defines ${t.numberOfParams} params but received ${r.length} arguments`)), await n(...r));
						} else t !== void 0 && t.parameterStructures === u.ParameterStructures.byPosition && a.error(`Notification ${e.method} defines parameters by position but received parameters by name`), await n(e.params);
					} else k && await k(e.method, e.params);
				} catch (t) {
					t.message ? a.error(`Notification handler '${e.method}' failed with message: ${t.message}`) : a.error(`Notification handler '${e.method}' failed unexpectedly.`);
				}
				else pe.fire(e);
			}
		}
		P(Ne, "handleNotification");
		function Pe(e) {
			if (!e) {
				a.error("Received empty message.");
				return;
			}
			a.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(e, null, 4)}`);
			let t = e;
			if (l.string(t.id) || l.number(t.id)) {
				let e = t.id, n = oe.get(e);
				n && n.reject(/* @__PURE__ */ Error("The received response has neither a result nor an error property."));
			}
		}
		P(Pe, "handleInvalidMessage");
		function Fe(e) {
			if (e != null) switch (M) {
				case v.Verbose: return JSON.stringify(e, null, 4);
				case v.Compact: return JSON.stringify(e);
				default: return;
			}
		}
		P(Fe, "stringifyTrace");
		function Ie(e) {
			if (M !== v.Off && N) {
				if (le === b.Text) {
					let t;
					(M === v.Verbose || M === v.Compact) && e.params && (t = `Params: ${Fe(e.params)}`), N.log(`Sending request '${e.method} - (${e.id})'.`, t);
				} else He("send-request", e);
			}
		}
		P(Ie, "traceSendingRequest");
		function Le(e) {
			if (M !== v.Off && N) {
				if (le === b.Text) {
					let t;
					(M === v.Verbose || M === v.Compact) && (t = e.params ? `Params: ${Fe(e.params)}` : "No parameters provided."), N.log(`Sending notification '${e.method}'.`, t);
				} else He("send-notification", e);
			}
		}
		P(Le, "traceSendingNotification");
		function Re(e, t, n) {
			if (M !== v.Off && N) {
				if (le === b.Text) {
					let r;
					(M === v.Verbose || M === v.Compact) && (e.error && e.error.data ? r = `Error data: ${Fe(e.error.data)}` : e.result ? r = `Result: ${Fe(e.result)}` : e.error === void 0 && (r = "No result returned."));
					let i = e.error ? ` Request failed: ${e.error.message} (${e.error.code}).` : "";
					N.log(`Sending response '${t} - (${e.id})'. Processing request took ${Date.now() - n}ms.${i}`, r);
				} else He("send-response", e);
			}
		}
		P(Re, "traceSendingResponse");
		function ze(e) {
			if (M !== v.Off && N) {
				if (le === b.Text) {
					let t;
					(M === v.Verbose || M === v.Compact) && e.params && (t = `Params: ${Fe(e.params)}`), N.log(`Received request '${e.method} - (${e.id})'.`, t);
				} else He("receive-request", e);
			}
		}
		P(ze, "traceReceivedRequest");
		function Be(e) {
			if (M !== v.Off && N && e.method !== S.type.method) {
				if (le === b.Text) {
					let t;
					(M === v.Verbose || M === v.Compact) && (t = e.params ? `Params: ${Fe(e.params)}` : "No parameters provided."), N.log(`Received notification '${e.method}'.`, t);
				} else He("receive-notification", e);
			}
		}
		P(Be, "traceReceivedNotification");
		function Ve(e, t) {
			if (M !== v.Off && N) {
				if (le === b.Text) {
					let n;
					if ((M === v.Verbose || M === v.Compact) && (e.error && e.error.data ? n = `Error data: ${Fe(e.error.data)}` : e.result ? n = `Result: ${Fe(e.result)}` : e.error === void 0 && (n = "No result returned.")), t) {
						let r = e.error ? ` Request failed: ${e.error.message} (${e.error.code}).` : "";
						N.log(`Received response '${t.method} - (${e.id})' in ${Date.now() - t.timerStart}ms.${r}`, n);
					} else N.log(`Received response ${e.id} without active response promise.`, n);
				} else He("receive-response", e);
			}
		}
		P(Ve, "traceReceivedResponse");
		function He(e, t) {
			if (!N || M === v.Off) return;
			let n = {
				isLSPMessage: !0,
				type: e,
				message: t,
				timestamp: Date.now()
			};
			N.log(n);
		}
		P(He, "logLSPMessage");
		function Ue() {
			if (ye()) throw new ee(C.Closed, "Connection is closed.");
			if (be()) throw new ee(C.Disposed, "Connection is disposed.");
		}
		P(Ue, "throwIfClosedOrDisposed");
		function We() {
			if (ve()) throw new ee(C.AlreadyListening, "Connection is already listening");
		}
		P(We, "throwIfListening");
		function Ge() {
			if (!ve()) throw Error("Call listen() first.");
		}
		P(Ge, "throwIfNotListening");
		function Ke(e) {
			return e === void 0 ? null : e;
		}
		P(Ke, "undefinedToNull");
		function qe(e) {
			if (e !== null) return e;
		}
		P(qe, "nullToUndefined");
		function Je(e) {
			return e != null && !Array.isArray(e) && typeof e == "object";
		}
		P(Je, "isNamedParam");
		function Ye(e, t) {
			switch (e) {
				case u.ParameterStructures.auto: return Je(t) ? qe(t) : [Ke(t)];
				case u.ParameterStructures.byName:
					if (!Je(t)) throw Error("Received parameters by name but param is not an object literal.");
					return qe(t);
				case u.ParameterStructures.byPosition: return [Ke(t)];
				default: throw Error(`Unknown parameter structure ${e.toString()}`);
			}
		}
		P(Ye, "computeSingleParam");
		function Xe(e, t) {
			let n, r = e.numberOfParams;
			switch (r) {
				case 0:
					n = void 0;
					break;
				case 1:
					n = Ye(e.parameterStructures, t[0]);
					break;
				default:
					n = [];
					for (let e = 0; e < t.length && e < r; e++) n.push(Ke(t[e]));
					if (t.length < r) for (let e = t.length; e < r; e++) n.push(null);
			}
			return n;
		}
		P(Xe, "computeMessageParams");
		let Ze = {
			sendNotification: /* @__PURE__ */ P((e, ...t) => {
				Ue();
				let r, i;
				if (l.string(e)) {
					r = e;
					let n = t[0], a = 0, o = u.ParameterStructures.auto;
					u.ParameterStructures.is(n) && (a = 1, o = n);
					let s = t.length, c = s - a;
					switch (c) {
						case 0:
							i = void 0;
							break;
						case 1:
							i = Ye(o, t[a]);
							break;
						default:
							if (o === u.ParameterStructures.byName) throw Error(`Received ${c} parameters for 'by Name' notification parameter structure.`);
							i = t.slice(a, s).map((e) => Ke(e));
					}
				} else {
					let n = t;
					r = e.method, i = Xe(e, n);
				}
				let o = {
					jsonrpc: "2.0",
					method: r,
					params: i
				};
				return Le(o), n.write(o).catch((e) => {
					throw a.error("Sending notification failed."), e;
				});
			}, "sendNotification"),
			onNotification: /* @__PURE__ */ P((e, t) => {
				Ue();
				let n;
				return l.func(e) ? k = e : t && (l.string(e) ? (n = e, re.set(e, {
					type: void 0,
					handler: t
				})) : (n = e.method, re.set(e.method, {
					type: e,
					handler: t
				}))), { dispose: /* @__PURE__ */ P(() => {
					n === void 0 ? k === e && (k = void 0) : re.get(n)?.handler === t && re.delete(n);
				}, "dispose") };
			}, "onNotification"),
			onProgress: /* @__PURE__ */ P((e, t, n) => {
				if (ie.has(t)) throw Error(`Progress handler for token ${t} already registered`);
				return ie.set(t, n), { dispose: /* @__PURE__ */ P(() => {
					ie.get(t) === n && ie.delete(t);
				}, "dispose") };
			}, "onProgress"),
			sendProgress: /* @__PURE__ */ P((e, t, n) => Ze.sendNotification(g.type, {
				token: t,
				value: n
			}), "sendProgress"),
			onUnhandledProgress: me.event,
			sendRequest: /* @__PURE__ */ P((e, ...t) => {
				Ue(), Ge();
				function r(e, t) {
					let n = ge.sender.sendCancellation(e, t);
					n === void 0 ? a.log(`Received no promise from cancellation strategy when cancelling id ${t}`) : n.catch(() => {
						a.log(`Sending cancellation messages for id ${t} failed.`);
					});
				}
				P(r, "sendCancellation");
				let i, s, c;
				if (l.string(e)) {
					i = e;
					let n = t[0], r = t[t.length - 1], a = 0, o = u.ParameterStructures.auto;
					u.ParameterStructures.is(n) && (a = 1, o = n);
					let l = t.length;
					p.CancellationToken.is(r) && (--l, c = r);
					let d = l - a;
					switch (d) {
						case 0:
							s = void 0;
							break;
						case 1:
							s = Ye(o, t[a]);
							break;
						default:
							if (o === u.ParameterStructures.byName) throw Error(`Received ${d} parameters for 'by Name' request parameter structure.`);
							s = t.slice(a, l).map((e) => Ke(e));
					}
				} else {
					let n = t;
					i = e.method, s = Xe(e, n);
					let r = e.numberOfParams;
					c = p.CancellationToken.is(n[r]) ? n[r] : void 0;
				}
				let d = o++, f, m = !1;
				c !== void 0 && (c.isCancellationRequested ? m = !0 : f = c.onCancellationRequested(() => {
					r(Ze, d);
				}));
				let h = {
					jsonrpc: "2.0",
					id: d,
					method: i,
					params: s
				};
				return Ie(h), typeof ge.sender.enableCancellation == "function" && ge.sender.enableCancellation(h), new Promise(async (e, t) => {
					let o = /* @__PURE__ */ P((t) => {
						e(t), ge.sender.cleanup(d), f?.dispose();
					}, "resolveWithCleanup"), s = /* @__PURE__ */ P((e) => {
						t(e), ge.sender.cleanup(d), f?.dispose();
					}, "rejectWithCleanup"), c = {
						method: i,
						timerStart: Date.now(),
						resolve: o,
						reject: s
					};
					try {
						oe.set(d, c), await n.write(h), m && r(Ze, d);
					} catch (e) {
						oe.delete(d), c.reject(new u.ResponseError(u.ErrorCodes.MessageWriteError, e.message ? e.message : "Unknown reason")), a.error("Sending request failed.");
					}
				});
			}, "sendRequest"),
			onRequest: /* @__PURE__ */ P((e, t) => {
				Ue();
				let n = null;
				return _.is(e) ? (n = void 0, E = e) : l.string(e) ? (n = null, t !== void 0 && (n = e, D.set(e, {
					handler: t,
					type: void 0
				}))) : t !== void 0 && (n = e.method, D.set(e.method, {
					type: e,
					handler: t
				})), { dispose: /* @__PURE__ */ P(() => {
					n !== null && (n === void 0 ? E === e && (E = void 0) : D.get(n)?.handler === t && D.delete(n));
				}, "dispose") };
			}, "onRequest"),
			hasPendingResponse: /* @__PURE__ */ P(() => oe.size > 0, "hasPendingResponse"),
			trace: /* @__PURE__ */ P(async (e, t, n) => {
				let r = !1, i = b.Text;
				n !== void 0 && (l.boolean(n) ? r = n : (r = n.sendNotification || !1, i = n.traceFormat || b.Text)), M = e, le = i, N = M === v.Off ? void 0 : t, r && !ye() && !be() && await Ze.sendNotification(x.type, { value: v.toString(e) });
			}, "trace"),
			onError: de.event,
			onClose: fe.event,
			onUnhandledNotification: pe.event,
			onDispose: he.event,
			end: /* @__PURE__ */ P(() => {
				n.end();
			}, "end"),
			dispose: /* @__PURE__ */ P(() => {
				if (be()) return;
				ue = A.Disposed, he.fire(void 0);
				let e = new u.ResponseError(u.ErrorCodes.PendingResponseRejected, "Pending response rejected since connection got disposed");
				for (let t of oe.values()) t.reject(e);
				oe = /* @__PURE__ */ new Map(), ce = /* @__PURE__ */ new Map(), se = /* @__PURE__ */ new Set(), j = new d.LinkedMap(), l.func(n.dispose) && n.dispose(), l.func(t.dispose) && t.dispose();
			}, "dispose"),
			listen: /* @__PURE__ */ P(() => {
				Ue(), We(), ue = A.Listening, t.listen(Ae);
			}, "listen"),
			inspect: /* @__PURE__ */ P(() => {
				(0, c.default)().console.log("inspect");
			}, "inspect")
		};
		return Ze.onNotification(S.type, (e) => {
			if (M === v.Off || !N) return;
			let t = M === v.Verbose || M === v.Compact;
			N.log(e.message, t ? e.verbose : void 0);
		}), Ze.onNotification(g.type, async (e) => {
			let t = ie.get(e.token);
			t ? await t(e.value) : me.fire(e);
		}), Ze;
	}
	P(re, "createMessageConnection");
} }), mn = F({ "../../node_modules/.pnpm/vscode-jsonrpc@9.0.3/node_modules/vscode-jsonrpc/lib/common/api.js"(e) {
	var t = e && e.__importDefault || function(e) {
		return e && e.__esModule ? e : { default: e };
	};
	Object.defineProperty(e, "__esModule", { value: !0 }), e.ProgressType = e.ProgressToken = e.createMessageConnection = e.NullLogger = e.ConnectionOptions = e.ConnectionStrategy = e.AbstractMessageBuffer = e.WriteableStreamMessageWriter = e.AbstractMessageWriter = e.MessageWriter = e.ReadableStreamMessageReader = e.AbstractMessageReader = e.MessageReader = e.SharedArrayReceiverStrategy = e.SharedArraySenderStrategy = e.CancellationToken = e.CancellationTokenSource = e.Emitter = e.Event = e.Disposable = e.LRUCache = e.Touch = e.LinkedMap = e.ParameterStructures = e.NotificationType9 = e.NotificationType8 = e.NotificationType7 = e.NotificationType6 = e.NotificationType5 = e.NotificationType4 = e.NotificationType3 = e.NotificationType2 = e.NotificationType1 = e.NotificationType0 = e.NotificationType = e.ErrorCodes = e.ResponseError = e.RequestType9 = e.RequestType8 = e.RequestType7 = e.RequestType6 = e.RequestType5 = e.RequestType4 = e.RequestType3 = e.RequestType2 = e.RequestType1 = e.RequestType0 = e.RequestType = e.Message = e.RAL = void 0, e.MessageStrategy = e.CancellationStrategy = e.CancellationSenderStrategy = e.RequestCancellationReceiverStrategy = e.IdCancellationReceiverStrategy = e.CancellationReceiverStrategy = e.ConnectionError = e.ConnectionErrors = e.LogTraceNotification = e.SetTraceNotification = e.TraceFormat = e.TraceValues = e.TraceValue = e.Trace = void 0;
	var n = tn();
	Object.defineProperty(e, "Message", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return n.Message;
		}, "get")
	}), Object.defineProperty(e, "RequestType", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return n.RequestType;
		}, "get")
	}), Object.defineProperty(e, "RequestType0", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return n.RequestType0;
		}, "get")
	}), Object.defineProperty(e, "RequestType1", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return n.RequestType1;
		}, "get")
	}), Object.defineProperty(e, "RequestType2", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return n.RequestType2;
		}, "get")
	}), Object.defineProperty(e, "RequestType3", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return n.RequestType3;
		}, "get")
	}), Object.defineProperty(e, "RequestType4", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return n.RequestType4;
		}, "get")
	}), Object.defineProperty(e, "RequestType5", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return n.RequestType5;
		}, "get")
	}), Object.defineProperty(e, "RequestType6", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return n.RequestType6;
		}, "get")
	}), Object.defineProperty(e, "RequestType7", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return n.RequestType7;
		}, "get")
	}), Object.defineProperty(e, "RequestType8", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return n.RequestType8;
		}, "get")
	}), Object.defineProperty(e, "RequestType9", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return n.RequestType9;
		}, "get")
	}), Object.defineProperty(e, "ResponseError", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return n.ResponseError;
		}, "get")
	}), Object.defineProperty(e, "ErrorCodes", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return n.ErrorCodes;
		}, "get")
	}), Object.defineProperty(e, "NotificationType", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return n.NotificationType;
		}, "get")
	}), Object.defineProperty(e, "NotificationType0", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return n.NotificationType0;
		}, "get")
	}), Object.defineProperty(e, "NotificationType1", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return n.NotificationType1;
		}, "get")
	}), Object.defineProperty(e, "NotificationType2", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return n.NotificationType2;
		}, "get")
	}), Object.defineProperty(e, "NotificationType3", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return n.NotificationType3;
		}, "get")
	}), Object.defineProperty(e, "NotificationType4", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return n.NotificationType4;
		}, "get")
	}), Object.defineProperty(e, "NotificationType5", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return n.NotificationType5;
		}, "get")
	}), Object.defineProperty(e, "NotificationType6", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return n.NotificationType6;
		}, "get")
	}), Object.defineProperty(e, "NotificationType7", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return n.NotificationType7;
		}, "get")
	}), Object.defineProperty(e, "NotificationType8", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return n.NotificationType8;
		}, "get")
	}), Object.defineProperty(e, "NotificationType9", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return n.NotificationType9;
		}, "get")
	}), Object.defineProperty(e, "ParameterStructures", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return n.ParameterStructures;
		}, "get")
	});
	var r = nn();
	Object.defineProperty(e, "LinkedMap", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return r.LinkedMap;
		}, "get")
	}), Object.defineProperty(e, "LRUCache", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return r.LRUCache;
		}, "get")
	}), Object.defineProperty(e, "Touch", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return r.Touch;
		}, "get")
	});
	var i = rn();
	Object.defineProperty(e, "Disposable", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return i.Disposable;
		}, "get")
	});
	var a = on();
	Object.defineProperty(e, "Event", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return a.Event;
		}, "get")
	}), Object.defineProperty(e, "Emitter", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return a.Emitter;
		}, "get")
	});
	var o = sn();
	Object.defineProperty(e, "CancellationTokenSource", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return o.CancellationTokenSource;
		}, "get")
	}), Object.defineProperty(e, "CancellationToken", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return o.CancellationToken;
		}, "get")
	});
	var s = cn();
	Object.defineProperty(e, "SharedArraySenderStrategy", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return s.SharedArraySenderStrategy;
		}, "get")
	}), Object.defineProperty(e, "SharedArrayReceiverStrategy", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return s.SharedArrayReceiverStrategy;
		}, "get")
	});
	var c = un();
	Object.defineProperty(e, "MessageReader", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return c.MessageReader;
		}, "get")
	}), Object.defineProperty(e, "AbstractMessageReader", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return c.AbstractMessageReader;
		}, "get")
	}), Object.defineProperty(e, "ReadableStreamMessageReader", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return c.ReadableStreamMessageReader;
		}, "get")
	});
	var l = dn();
	Object.defineProperty(e, "MessageWriter", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return l.MessageWriter;
		}, "get")
	}), Object.defineProperty(e, "AbstractMessageWriter", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return l.AbstractMessageWriter;
		}, "get")
	}), Object.defineProperty(e, "WriteableStreamMessageWriter", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return l.WriteableStreamMessageWriter;
		}, "get")
	});
	var u = fn();
	Object.defineProperty(e, "AbstractMessageBuffer", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return u.AbstractMessageBuffer;
		}, "get")
	});
	var d = pn();
	Object.defineProperty(e, "ConnectionStrategy", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return d.ConnectionStrategy;
		}, "get")
	}), Object.defineProperty(e, "ConnectionOptions", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return d.ConnectionOptions;
		}, "get")
	}), Object.defineProperty(e, "NullLogger", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return d.NullLogger;
		}, "get")
	}), Object.defineProperty(e, "createMessageConnection", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return d.createMessageConnection;
		}, "get")
	}), Object.defineProperty(e, "ProgressToken", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return d.ProgressToken;
		}, "get")
	}), Object.defineProperty(e, "ProgressType", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return d.ProgressType;
		}, "get")
	}), Object.defineProperty(e, "Trace", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return d.Trace;
		}, "get")
	}), Object.defineProperty(e, "TraceValue", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return d.TraceValue;
		}, "get")
	}), Object.defineProperty(e, "TraceFormat", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return d.TraceFormat;
		}, "get")
	}), Object.defineProperty(e, "SetTraceNotification", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return d.SetTraceNotification;
		}, "get")
	}), Object.defineProperty(e, "LogTraceNotification", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return d.LogTraceNotification;
		}, "get")
	}), Object.defineProperty(e, "ConnectionErrors", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return d.ConnectionErrors;
		}, "get")
	}), Object.defineProperty(e, "ConnectionError", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return d.ConnectionError;
		}, "get")
	}), Object.defineProperty(e, "CancellationReceiverStrategy", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return d.CancellationReceiverStrategy;
		}, "get")
	}), Object.defineProperty(e, "IdCancellationReceiverStrategy", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return d.IdCancellationReceiverStrategy;
		}, "get")
	}), Object.defineProperty(e, "RequestCancellationReceiverStrategy", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return d.RequestCancellationReceiverStrategy;
		}, "get")
	}), Object.defineProperty(e, "CancellationSenderStrategy", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return d.CancellationSenderStrategy;
		}, "get")
	}), Object.defineProperty(e, "CancellationStrategy", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return d.CancellationStrategy;
		}, "get")
	}), Object.defineProperty(e, "MessageStrategy", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return d.MessageStrategy;
		}, "get")
	}), Object.defineProperty(e, "TraceValues", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return d.TraceValues;
		}, "get")
	}), e.RAL = t(an()).default;
} }), hn = {};
Xt(hn, {
	AnnotatedTextEdit: () => In,
	ApplyKind: () => ir,
	ChangeAnnotation: () => Pn,
	ChangeAnnotationIdentifier: () => Fn,
	CodeAction: () => Cr,
	CodeActionContext: () => xr,
	CodeActionKind: () => yr,
	CodeActionTag: () => Sr,
	CodeActionTriggerKind: () => br,
	CodeDescription: () => An,
	CodeLens: () => wr,
	Color: () => Sn,
	ColorInformation: () => Cn,
	ColorPresentation: () => wn,
	Command: () => Mn,
	CompletionItem: () => or,
	CompletionItemKind: () => $n,
	CompletionItemLabelDetails: () => ar,
	CompletionItemTag: () => tr,
	CompletionList: () => sr,
	CreateFile: () => Rn,
	DeleteFile: () => Bn,
	Diagnostic: () => jn,
	DiagnosticRelatedInformation: () => Dn,
	DiagnosticSeverity: () => On,
	DiagnosticTag: () => kn,
	DocumentHighlight: () => pr,
	DocumentHighlightKind: () => fr,
	DocumentLink: () => Er,
	DocumentSymbol: () => vr,
	DocumentUri: () => gn,
	EOL: () => Gr,
	FoldingRange: () => En,
	FoldingRangeKind: () => Tn,
	FormattingOptions: () => Tr,
	Hover: () => lr,
	InlayHint: () => Lr,
	InlayHintKind: () => Fr,
	InlayHintLabelPart: () => Ir,
	InlineCompletionContext: () => Ur,
	InlineCompletionItem: () => zr,
	InlineCompletionList: () => Br,
	InlineCompletionTriggerKind: () => Vr,
	InlineValueContext: () => Pr,
	InlineValueEvaluatableExpression: () => Nr,
	InlineValueText: () => jr,
	InlineValueVariableLookup: () => Mr,
	InsertReplaceEdit: () => nr,
	InsertTextFormat: () => er,
	InsertTextMode: () => rr,
	LanguageKind: () => Yn,
	Location: () => bn,
	LocationLink: () => xn,
	MarkedString: () => cr,
	MarkupContent: () => Qn,
	MarkupKind: () => Zn,
	OptionalVersionedTextDocumentIdentifier: () => Jn,
	ParameterInformation: () => ur,
	Position: () => I,
	Range: () => L,
	RenameFile: () => zn,
	SelectedCompletionInfo: () => Hr,
	SelectionRange: () => Dr,
	SemanticTokenModifiers: () => kr,
	SemanticTokenTypes: () => Or,
	SemanticTokens: () => Ar,
	SignatureInformation: () => dr,
	SnippetTextEdit: () => Un,
	StringValue: () => Rr,
	SymbolInformation: () => gr,
	SymbolKind: () => mr,
	SymbolTag: () => hr,
	TextDocument: () => Kr,
	TextDocumentEdit: () => Ln,
	TextDocumentIdentifier: () => Kn,
	TextDocumentItem: () => Xn,
	TextEdit: () => Nn,
	URI: () => _n,
	VersionedTextDocumentIdentifier: () => qn,
	WorkspaceChange: () => Gn,
	WorkspaceEdit: () => Vn,
	WorkspaceFolder: () => Wr,
	WorkspaceSymbol: () => _r,
	integer: () => vn,
	uinteger: () => yn
});
var gn, _n, vn, yn, I, L, bn, xn, Sn, Cn, wn, Tn, En, Dn, On, kn, An, jn, Mn, Nn, Pn, Fn, In, Ln, Rn, zn, Bn, Vn, Hn, Un, Wn, Gn, Kn, qn, Jn, Yn, Xn, Zn, Qn, $n, er, tr, nr, rr, ir, ar, or, sr, cr, lr, ur, dr, fr, pr, mr, hr, gr, _r, vr, yr, br, xr, Sr, Cr, wr, Tr, Er, Dr, Or, kr, Ar, jr, Mr, Nr, Pr, Fr, Ir, Lr, Rr, zr, Br, Vr, Hr, Ur, Wr, Gr, Kr, qr, R, Jr = Yt({ "../../node_modules/.pnpm/vscode-languageserver-types@3.18.4/node_modules/vscode-languageserver-types/lib/esm/main.js"() {
	var e, t, n, r;
	(function(e) {
		function t(e) {
			return typeof e == "string";
		}
		P(t, "is"), e.is = t;
	})(gn ||= {}), (function(e) {
		function t(e) {
			return typeof e == "string";
		}
		P(t, "is"), e.is = t;
	})(_n ||= {}), (function(e) {
		e.MIN_VALUE = -2147483648, e.MAX_VALUE = 2147483647;
		function t(t) {
			return typeof t == "number" && e.MIN_VALUE <= t && t <= e.MAX_VALUE;
		}
		P(t, "is"), e.is = t;
	})(vn ||= {}), (function(e) {
		e.MIN_VALUE = 0, e.MAX_VALUE = 2147483647;
		function t(t) {
			return typeof t == "number" && e.MIN_VALUE <= t && t <= e.MAX_VALUE;
		}
		P(t, "is"), e.is = t;
	})(yn ||= {}), (function(e) {
		function t(e, t) {
			return e === Number.MAX_VALUE && (e = yn.MAX_VALUE), t === Number.MAX_VALUE && (t = yn.MAX_VALUE), {
				line: e,
				character: t
			};
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return R.objectLiteral(t) && R.uinteger(t.line) && R.uinteger(t.character);
		}
		P(n, "is"), e.is = n;
	})(I ||= {}), (function(e) {
		function t(e, t, n, r) {
			if (R.uinteger(e) && R.uinteger(t) && R.uinteger(n) && R.uinteger(r)) return {
				start: I.create(e, t),
				end: I.create(n, r)
			};
			if (I.is(e) && I.is(t)) return {
				start: e,
				end: t
			};
			throw Error(`Range#create called with invalid arguments[${e}, ${t}, ${n}, ${r}]`);
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return R.objectLiteral(t) && I.is(t.start) && I.is(t.end);
		}
		P(n, "is"), e.is = n;
	})(L ||= {}), (function(e) {
		function t(e, t) {
			return {
				uri: e,
				range: t
			};
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return R.objectLiteral(t) && L.is(t.range) && (R.string(t.uri) || R.undefined(t.uri));
		}
		P(n, "is"), e.is = n;
	})(bn ||= {}), (function(e) {
		function t(e, t, n, r) {
			return {
				targetUri: e,
				targetRange: t,
				targetSelectionRange: n,
				originSelectionRange: r
			};
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return R.objectLiteral(t) && L.is(t.targetRange) && R.string(t.targetUri) && L.is(t.targetSelectionRange) && (L.is(t.originSelectionRange) || R.undefined(t.originSelectionRange));
		}
		P(n, "is"), e.is = n;
	})(xn ||= {}), (function(e) {
		function t(e, t, n, r) {
			return {
				red: e,
				green: t,
				blue: n,
				alpha: r
			};
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return R.objectLiteral(t) && R.numberRange(t.red, 0, 1) && R.numberRange(t.green, 0, 1) && R.numberRange(t.blue, 0, 1) && R.numberRange(t.alpha, 0, 1);
		}
		P(n, "is"), e.is = n;
	})(Sn ||= {}), (function(e) {
		function t(e, t) {
			return {
				range: e,
				color: t
			};
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return R.objectLiteral(t) && L.is(t.range) && Sn.is(t.color);
		}
		P(n, "is"), e.is = n;
	})(Cn ||= {}), (function(e) {
		function t(e, t, n) {
			return {
				label: e,
				textEdit: t,
				additionalTextEdits: n
			};
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return R.objectLiteral(t) && R.string(t.label) && (R.undefined(t.textEdit) || Nn.is(t)) && (R.undefined(t.additionalTextEdits) || R.typedArray(t.additionalTextEdits, Nn.is));
		}
		P(n, "is"), e.is = n;
	})(wn ||= {}), (function(e) {
		e.Comment = "comment", e.Imports = "imports", e.Region = "region";
	})(Tn ||= {}), (function(e) {
		function t(e, t, n, r, i, a) {
			let o = {
				startLine: e,
				endLine: t
			};
			return R.defined(n) && (o.startCharacter = n), R.defined(r) && (o.endCharacter = r), R.defined(i) && (o.kind = i), R.defined(a) && (o.collapsedText = a), o;
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return R.objectLiteral(t) && R.uinteger(t.startLine) && R.uinteger(t.startLine) && (R.undefined(t.startCharacter) || R.uinteger(t.startCharacter)) && (R.undefined(t.endCharacter) || R.uinteger(t.endCharacter)) && (R.undefined(t.kind) || R.string(t.kind));
		}
		P(n, "is"), e.is = n;
	})(En ||= {}), (function(e) {
		function t(e, t) {
			return {
				location: e,
				message: t
			};
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return R.defined(t) && bn.is(t.location) && R.string(t.message);
		}
		P(n, "is"), e.is = n;
	})(Dn ||= {}), (function(e) {
		e.Error = 1, e.Warning = 2, e.Information = 3, e.Hint = 4;
	})(On ||= {}), (function(e) {
		e.Unnecessary = 1, e.Deprecated = 2;
	})(kn ||= {}), (function(e) {
		function t(e) {
			let t = e;
			return R.objectLiteral(t) && R.string(t.href);
		}
		P(t, "is"), e.is = t;
	})(An ||= {}), (function(e) {
		function t(e, t, n, r, i, a) {
			let o = {
				range: e,
				message: t
			};
			return R.defined(n) && (o.severity = n), R.defined(r) && (o.code = r), R.defined(i) && (o.source = i), R.defined(a) && (o.relatedInformation = a), o;
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return R.defined(t) && L.is(t.range) && (R.string(t.message) || Qn.is(t.message)) && (R.number(t.severity) || R.undefined(t.severity)) && (R.integer(t.code) || R.string(t.code) || R.undefined(t.code)) && (R.undefined(t.codeDescription) || R.string(t.codeDescription?.href)) && (R.string(t.source) || R.undefined(t.source)) && (R.undefined(t.relatedInformation) || R.typedArray(t.relatedInformation, Dn.is));
		}
		P(n, "is"), e.is = n;
		function r(e) {
			return R.string(e.message);
		}
		P(r, "is3_17"), e.is3_17 = r;
		function i(e) {
			if (R.string(e.message)) return e.message;
			if (Qn.is(e.message)) return e.message.value;
			throw Error(`Unknown message type ${typeof e.message}`);
		}
		P(i, "getMessageString"), e.getMessageString = i;
	})(jn ||= {}), (function(e) {
		function t(e, t, ...n) {
			let r = {
				title: e,
				command: t
			};
			return R.defined(n) && n.length > 0 && (r.arguments = n), r;
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return R.defined(t) && R.string(t.title) && (t.tooltip === void 0 || R.string(t.tooltip)) && R.string(t.command);
		}
		P(n, "is"), e.is = n;
	})(Mn ||= {}), (function(e) {
		function t(e, t) {
			return {
				range: e,
				newText: t
			};
		}
		P(t, "replace"), e.replace = t;
		function n(e, t) {
			return {
				range: {
					start: e,
					end: e
				},
				newText: t
			};
		}
		P(n, "insert"), e.insert = n;
		function r(e) {
			return {
				range: e,
				newText: ""
			};
		}
		P(r, "del"), e.del = r;
		function i(e) {
			let t = e;
			return R.objectLiteral(t) && R.string(t.newText) && L.is(t.range);
		}
		P(i, "is"), e.is = i;
	})(Nn ||= {}), (function(e) {
		function t(e, t, n) {
			let r = { label: e };
			return t !== void 0 && (r.needsConfirmation = t), n !== void 0 && (r.description = n), r;
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return R.objectLiteral(t) && R.string(t.label) && (R.boolean(t.needsConfirmation) || t.needsConfirmation === void 0) && (R.string(t.description) || t.description === void 0);
		}
		P(n, "is"), e.is = n;
	})(Pn ||= {}), (function(e) {
		function t(e) {
			let t = e;
			return R.string(t);
		}
		P(t, "is"), e.is = t;
	})(Fn ||= {}), (function(e) {
		function t(e, t, n) {
			return {
				range: e,
				newText: t,
				annotationId: n
			};
		}
		P(t, "replace"), e.replace = t;
		function n(e, t, n) {
			return {
				range: {
					start: e,
					end: e
				},
				newText: t,
				annotationId: n
			};
		}
		P(n, "insert"), e.insert = n;
		function r(e, t) {
			return {
				range: e,
				newText: "",
				annotationId: t
			};
		}
		P(r, "del"), e.del = r;
		function i(e) {
			let t = e;
			return Nn.is(t) && (Pn.is(t.annotationId) || Fn.is(t.annotationId));
		}
		P(i, "is"), e.is = i;
	})(In ||= {}), (function(e) {
		function t(e, t) {
			return {
				textDocument: e,
				edits: t
			};
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return R.defined(t) && Jn.is(t.textDocument) && Array.isArray(t.edits);
		}
		P(n, "is"), e.is = n;
	})(Ln ||= {}), (function(e) {
		function t(e, t, n) {
			let r = {
				kind: "create",
				uri: e
			};
			return t !== void 0 && (t.overwrite !== void 0 || t.ignoreIfExists !== void 0) && (r.options = t), n !== void 0 && (r.annotationId = n), r;
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return t && t.kind === "create" && R.string(t.uri) && (t.options === void 0 || (t.options.overwrite === void 0 || R.boolean(t.options.overwrite)) && (t.options.ignoreIfExists === void 0 || R.boolean(t.options.ignoreIfExists))) && (t.annotationId === void 0 || Fn.is(t.annotationId));
		}
		P(n, "is"), e.is = n;
	})(Rn ||= {}), (function(e) {
		function t(e, t, n, r) {
			let i = {
				kind: "rename",
				oldUri: e,
				newUri: t
			};
			return n !== void 0 && (n.overwrite !== void 0 || n.ignoreIfExists !== void 0) && (i.options = n), r !== void 0 && (i.annotationId = r), i;
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return t && t.kind === "rename" && R.string(t.oldUri) && R.string(t.newUri) && (t.options === void 0 || (t.options.overwrite === void 0 || R.boolean(t.options.overwrite)) && (t.options.ignoreIfExists === void 0 || R.boolean(t.options.ignoreIfExists))) && (t.annotationId === void 0 || Fn.is(t.annotationId));
		}
		P(n, "is"), e.is = n;
	})(zn ||= {}), (function(e) {
		function t(e, t, n) {
			let r = {
				kind: "delete",
				uri: e
			};
			return t !== void 0 && (t.recursive !== void 0 || t.ignoreIfNotExists !== void 0) && (r.options = t), n !== void 0 && (r.annotationId = n), r;
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return t && t.kind === "delete" && R.string(t.uri) && (t.options === void 0 || (t.options.recursive === void 0 || R.boolean(t.options.recursive)) && (t.options.ignoreIfNotExists === void 0 || R.boolean(t.options.ignoreIfNotExists))) && (t.annotationId === void 0 || Fn.is(t.annotationId));
		}
		P(n, "is"), e.is = n;
	})(Bn ||= {}), (function(e) {
		function t(e) {
			let t = e;
			return t && (t.changes !== void 0 || t.documentChanges !== void 0) && (t.documentChanges === void 0 || t.documentChanges.every((e) => R.string(e.kind) ? Rn.is(e) || zn.is(e) || Bn.is(e) : Ln.is(e)));
		}
		P(t, "is"), e.is = t;
	})(Vn ||= {}), Hn = (e = class {
		constructor(e, t) {
			this.edits = e, this.changeAnnotations = t;
		}
		insert(e, t, n) {
			let r, i;
			if (n === void 0 ? r = Nn.insert(e, t) : Fn.is(n) ? (i = n, r = In.insert(e, t, n)) : (this.assertChangeAnnotations(this.changeAnnotations), i = this.changeAnnotations.manage(n), r = In.insert(e, t, i)), this.edits.push(r), i !== void 0) return i;
		}
		replace(e, t, n) {
			let r, i;
			if (n === void 0 ? r = Nn.replace(e, t) : Fn.is(n) ? (i = n, r = In.replace(e, t, n)) : (this.assertChangeAnnotations(this.changeAnnotations), i = this.changeAnnotations.manage(n), r = In.replace(e, t, i)), this.edits.push(r), i !== void 0) return i;
		}
		delete(e, t) {
			let n, r;
			if (t === void 0 ? n = Nn.del(e) : Fn.is(t) ? (r = t, n = In.del(e, t)) : (this.assertChangeAnnotations(this.changeAnnotations), r = this.changeAnnotations.manage(t), n = In.del(e, r)), this.edits.push(n), r !== void 0) return r;
		}
		add(e) {
			this.edits.push(e);
		}
		all() {
			return this.edits;
		}
		clear() {
			this.edits.splice(0, this.edits.length);
		}
		assertChangeAnnotations(e) {
			if (e === void 0) throw Error("Text edit change is not configured to manage change annotations.");
		}
	}, P(e, "TextEditChangeImpl"), e), (function(e) {
		function t(e) {
			let t = e;
			return R.objectLiteral(t) && L.is(t.range) && Rr.isSnippet(t.snippet) && (t.annotationId === void 0 || Pn.is(t.annotationId) || Fn.is(t.annotationId));
		}
		P(t, "is"), e.is = t;
	})(Un ||= {}), Wn = (t = class {
		constructor(e) {
			this._annotations = e === void 0 ? /* @__PURE__ */ Object.create(null) : e, this._counter = 0, this._size = 0;
		}
		all() {
			return this._annotations;
		}
		get size() {
			return this._size;
		}
		manage(e, t) {
			let n;
			if (Fn.is(e) ? n = e : (n = this.nextId(), t = e), this._annotations[n] !== void 0) throw Error(`Id ${n} is already in use.`);
			if (t === void 0) throw Error(`No annotation provided for id ${n}`);
			return this._annotations[n] = t, this._size++, n;
		}
		nextId() {
			return this._counter++, this._counter.toString();
		}
	}, P(t, "ChangeAnnotations"), t), Gn = (n = class {
		constructor(e) {
			this._textEditChanges = /* @__PURE__ */ Object.create(null), e === void 0 ? this._workspaceEdit = {} : (this._workspaceEdit = e, e.documentChanges ? (this._changeAnnotations = new Wn(e.changeAnnotations), e.changeAnnotations = this._changeAnnotations.all(), e.documentChanges.forEach((e) => {
				if (Ln.is(e)) {
					let t = new Hn(e.edits, this._changeAnnotations);
					this._textEditChanges[e.textDocument.uri] = t;
				}
			})) : e.changes && Object.keys(e.changes).forEach((t) => {
				let n = new Hn(e.changes[t]);
				this._textEditChanges[t] = n;
			}));
		}
		get edit() {
			return this.initDocumentChanges(), this._changeAnnotations !== void 0 && (this._changeAnnotations.size === 0 ? this._workspaceEdit.changeAnnotations = void 0 : this._workspaceEdit.changeAnnotations = this._changeAnnotations.all()), this._workspaceEdit;
		}
		getTextEditChange(e) {
			if (Jn.is(e)) {
				if (this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0) throw Error("Workspace edit is not configured for document changes.");
				let t = {
					uri: e.uri,
					version: e.version
				}, n = this._textEditChanges[t.uri];
				if (!n) {
					let e = [], r = {
						textDocument: t,
						edits: e
					};
					this._workspaceEdit.documentChanges.push(r), n = new Hn(e, this._changeAnnotations), this._textEditChanges[t.uri] = n;
				}
				return n;
			}
			{
				if (this.initChanges(), this._workspaceEdit.changes === void 0) throw Error("Workspace edit is not configured for normal text edit changes.");
				let t = this._textEditChanges[e];
				if (!t) {
					let n = [];
					this._workspaceEdit.changes[e] = n, t = new Hn(n), this._textEditChanges[e] = t;
				}
				return t;
			}
		}
		initDocumentChanges() {
			this._workspaceEdit.documentChanges === void 0 && this._workspaceEdit.changes === void 0 && (this._changeAnnotations = new Wn(), this._workspaceEdit.documentChanges = [], this._workspaceEdit.changeAnnotations = this._changeAnnotations.all());
		}
		initChanges() {
			this._workspaceEdit.documentChanges === void 0 && this._workspaceEdit.changes === void 0 && (this._workspaceEdit.changes = /* @__PURE__ */ Object.create(null));
		}
		createFile(e, t, n) {
			if (this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0) throw Error("Workspace edit is not configured for document changes.");
			let r;
			Pn.is(t) || Fn.is(t) ? r = t : n = t;
			let i, a;
			if (r === void 0 ? i = Rn.create(e, n) : (a = Fn.is(r) ? r : this._changeAnnotations.manage(r), i = Rn.create(e, n, a)), this._workspaceEdit.documentChanges.push(i), a !== void 0) return a;
		}
		renameFile(e, t, n, r) {
			if (this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0) throw Error("Workspace edit is not configured for document changes.");
			let i;
			Pn.is(n) || Fn.is(n) ? i = n : r = n;
			let a, o;
			if (i === void 0 ? a = zn.create(e, t, r) : (o = Fn.is(i) ? i : this._changeAnnotations.manage(i), a = zn.create(e, t, r, o)), this._workspaceEdit.documentChanges.push(a), o !== void 0) return o;
		}
		deleteFile(e, t, n) {
			if (this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0) throw Error("Workspace edit is not configured for document changes.");
			let r;
			Pn.is(t) || Fn.is(t) ? r = t : n = t;
			let i, a;
			if (r === void 0 ? i = Bn.create(e, n) : (a = Fn.is(r) ? r : this._changeAnnotations.manage(r), i = Bn.create(e, n, a)), this._workspaceEdit.documentChanges.push(i), a !== void 0) return a;
		}
	}, P(n, "WorkspaceChange"), n), (function(e) {
		function t(e) {
			return { uri: e };
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return R.defined(t) && R.string(t.uri);
		}
		P(n, "is"), e.is = n;
	})(Kn ||= {}), (function(e) {
		function t(e, t) {
			return {
				uri: e,
				version: t
			};
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return R.defined(t) && R.string(t.uri) && R.integer(t.version);
		}
		P(n, "is"), e.is = n;
	})(qn ||= {}), (function(e) {
		function t(e, t) {
			return {
				uri: e,
				version: t
			};
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return R.defined(t) && R.string(t.uri) && (t.version === null || R.integer(t.version));
		}
		P(n, "is"), e.is = n;
	})(Jn ||= {}), (function(e) {
		e.ABAP = "abap", e.WindowsBat = "bat", e.BibTeX = "bibtex", e.Clojure = "clojure", e.Coffeescript = "coffeescript", e.C = "c", e.CPP = "cpp", e.CSharp = "csharp", e.CSS = "css", e.D = "d", e.Delphi = "pascal", e.Diff = "diff", e.Dart = "dart", e.Dockerfile = "dockerfile", e.Elixir = "elixir", e.Erlang = "erlang", e.FSharp = "fsharp", e.GitCommit = "git-commit", e.GitRebase = "git-rebase", e.Go = "go", e.Groovy = "groovy", e.Handlebars = "handlebars", e.Haskell = "haskell", e.HTML = "html", e.Ini = "ini", e.Java = "java", e.JavaScript = "javascript", e.JavaScriptReact = "javascriptreact", e.JSON = "json", e.LaTeX = "latex", e.Less = "less", e.Lua = "lua", e.Makefile = "makefile", e.Markdown = "markdown", e.ObjectiveC = "objective-c", e.ObjectiveCPP = "objective-cpp", e.Pascal = "pascal", e.Perl = "perl", e.Perl6 = "perl6", e.PHP = "php", e.Plaintext = "plaintext", e.Powershell = "powershell", e.Pug = "jade", e.Python = "python", e.R = "r", e.Razor = "razor", e.Ruby = "ruby", e.Rust = "rust", e.SCSS = "scss", e.SASS = "sass", e.Scala = "scala", e.ShaderLab = "shaderlab", e.ShellScript = "shellscript", e.SQL = "sql", e.Swift = "swift", e.TypeScript = "typescript", e.TypeScriptReact = "typescriptreact", e.TeX = "tex", e.VisualBasic = "vb", e.XML = "xml", e.XSL = "xsl", e.YAML = "yaml";
	})(Yn ||= {}), (function(e) {
		function t(e, t, n, r) {
			return {
				uri: e,
				languageId: t,
				version: n,
				text: r
			};
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return R.defined(t) && R.string(t.uri) && R.string(t.languageId) && R.integer(t.version) && R.string(t.text);
		}
		P(n, "is"), e.is = n;
	})(Xn ||= {}), (function(e) {
		e.PlainText = "plaintext", e.Markdown = "markdown";
		function t(t) {
			let n = t;
			return n === e.PlainText || n === e.Markdown;
		}
		P(t, "is"), e.is = t;
	})(Zn ||= {}), (function(e) {
		function t(e) {
			let t = e;
			return R.objectLiteral(e) && Zn.is(t.kind) && R.string(t.value);
		}
		P(t, "is"), e.is = t;
	})(Qn ||= {}), (function(e) {
		e.Text = 1, e.Method = 2, e.Function = 3, e.Constructor = 4, e.Field = 5, e.Variable = 6, e.Class = 7, e.Interface = 8, e.Module = 9, e.Property = 10, e.Unit = 11, e.Value = 12, e.Enum = 13, e.Keyword = 14, e.Snippet = 15, e.Color = 16, e.File = 17, e.Reference = 18, e.Folder = 19, e.EnumMember = 20, e.Constant = 21, e.Struct = 22, e.Event = 23, e.Operator = 24, e.TypeParameter = 25;
	})($n ||= {}), (function(e) {
		e.PlainText = 1, e.Snippet = 2;
	})(er ||= {}), (function(e) {
		e.Deprecated = 1;
	})(tr ||= {}), (function(e) {
		function t(e, t, n) {
			return {
				newText: e,
				insert: t,
				replace: n
			};
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return t && R.string(t.newText) && L.is(t.insert) && L.is(t.replace);
		}
		P(n, "is"), e.is = n;
	})(nr ||= {}), (function(e) {
		e.asIs = 1, e.adjustIndentation = 2;
	})(rr ||= {}), (function(e) {
		e.Replace = 1, e.Merge = 2;
	})(ir ||= {}), (function(e) {
		function t(e) {
			let t = e;
			return t && (R.string(t.detail) || t.detail === void 0) && (R.string(t.description) || t.description === void 0);
		}
		P(t, "is"), e.is = t;
	})(ar ||= {}), (function(e) {
		function t(e) {
			return { label: e };
		}
		P(t, "create"), e.create = t;
	})(or ||= {}), (function(e) {
		function t(e, t) {
			return {
				items: e || [],
				isIncomplete: !!t
			};
		}
		P(t, "create"), e.create = t;
	})(sr ||= {}), (function(e) {
		function t(e) {
			return e.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
		}
		P(t, "fromPlainText"), e.fromPlainText = t;
		function n(e) {
			let t = e;
			return R.string(t) || R.objectLiteral(t) && R.string(t.language) && R.string(t.value);
		}
		P(n, "is"), e.is = n;
	})(cr ||= {}), (function(e) {
		function t(e) {
			let t = e;
			return !!t && R.objectLiteral(t) && (Qn.is(t.contents) || cr.is(t.contents) || R.typedArray(t.contents, cr.is)) && (e.range === void 0 || L.is(e.range));
		}
		P(t, "is"), e.is = t;
	})(lr ||= {}), (function(e) {
		function t(e, t) {
			return t ? {
				label: e,
				documentation: t
			} : { label: e };
		}
		P(t, "create"), e.create = t;
	})(ur ||= {}), (function(e) {
		function t(e, t, ...n) {
			let r = { label: e };
			return R.defined(t) && (r.documentation = t), r.parameters = R.defined(n) ? n : [], r;
		}
		P(t, "create"), e.create = t;
	})(dr ||= {}), (function(e) {
		e.Text = 1, e.Read = 2, e.Write = 3;
	})(fr ||= {}), (function(e) {
		function t(e, t) {
			let n = { range: e };
			return R.number(t) && (n.kind = t), n;
		}
		P(t, "create"), e.create = t;
	})(pr ||= {}), (function(e) {
		e.File = 1, e.Module = 2, e.Namespace = 3, e.Package = 4, e.Class = 5, e.Method = 6, e.Property = 7, e.Field = 8, e.Constructor = 9, e.Enum = 10, e.Interface = 11, e.Function = 12, e.Variable = 13, e.Constant = 14, e.String = 15, e.Number = 16, e.Boolean = 17, e.Array = 18, e.Object = 19, e.Key = 20, e.Null = 21, e.EnumMember = 22, e.Struct = 23, e.Event = 24, e.Operator = 25, e.TypeParameter = 26;
	})(mr ||= {}), (function(e) {
		e.Deprecated = 1;
	})(hr ||= {}), (function(e) {
		function t(e, t, n, r, i) {
			let a = {
				name: e,
				kind: t,
				location: {
					uri: r,
					range: n
				}
			};
			return i && (a.containerName = i), a;
		}
		P(t, "create"), e.create = t;
	})(gr ||= {}), (function(e) {
		function t(e, t, n, r) {
			return r === void 0 ? {
				name: e,
				kind: t,
				location: { uri: n }
			} : {
				name: e,
				kind: t,
				location: {
					uri: n,
					range: r
				}
			};
		}
		P(t, "create"), e.create = t;
	})(_r ||= {}), (function(e) {
		function t(e, t, n, r, i, a) {
			let o = {
				name: e,
				detail: t,
				kind: n,
				range: r,
				selectionRange: i
			};
			return a !== void 0 && (o.children = a), o;
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return t && R.string(t.name) && R.number(t.kind) && L.is(t.range) && L.is(t.selectionRange) && (t.detail === void 0 || R.string(t.detail)) && (t.deprecated === void 0 || R.boolean(t.deprecated)) && (t.children === void 0 || Array.isArray(t.children)) && (t.tags === void 0 || Array.isArray(t.tags));
		}
		P(n, "is"), e.is = n;
	})(vr ||= {}), (function(e) {
		e.Empty = "", e.QuickFix = "quickfix", e.Refactor = "refactor", e.RefactorExtract = "refactor.extract", e.RefactorInline = "refactor.inline", e.RefactorMove = "refactor.move", e.RefactorRewrite = "refactor.rewrite", e.Source = "source", e.SourceOrganizeImports = "source.organizeImports", e.SourceFixAll = "source.fixAll", e.Notebook = "notebook";
	})(yr ||= {}), (function(e) {
		e.Invoked = 1, e.Automatic = 2;
	})(br ||= {}), (function(e) {
		function t(e, t, n) {
			let r = { diagnostics: e };
			return t != null && (r.only = t), n != null && (r.triggerKind = n), r;
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return R.defined(t) && R.typedArray(t.diagnostics, jn.is) && (t.only === void 0 || R.typedArray(t.only, R.string)) && (t.triggerKind === void 0 || t.triggerKind === br.Invoked || t.triggerKind === br.Automatic);
		}
		P(n, "is"), e.is = n;
	})(xr ||= {}), (function(e) {
		e.LLMGenerated = 1;
		function t(t) {
			return R.defined(t) && t === e.LLMGenerated;
		}
		P(t, "is"), e.is = t;
	})(Sr ||= {}), (function(e) {
		function t(e, t, n) {
			let r = { title: e }, i = !0;
			return typeof t == "string" ? (i = !1, r.kind = t) : Mn.is(t) ? r.command = t : r.edit = t, i && n !== void 0 && (r.kind = n), r;
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return t && R.string(t.title) && (t.diagnostics === void 0 || R.typedArray(t.diagnostics, jn.is)) && (t.kind === void 0 || R.string(t.kind)) && (t.edit !== void 0 || t.command !== void 0) && (t.command === void 0 || Mn.is(t.command)) && (t.isPreferred === void 0 || R.boolean(t.isPreferred)) && (t.edit === void 0 || Vn.is(t.edit)) && (t.tags === void 0 || R.typedArray(t.tags, Sr.is));
		}
		P(n, "is"), e.is = n;
	})(Cr ||= {}), (function(e) {
		function t(e, t) {
			let n = { range: e };
			return R.defined(t) && (n.data = t), n;
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return R.defined(t) && L.is(t.range) && (R.undefined(t.command) || Mn.is(t.command));
		}
		P(n, "is"), e.is = n;
	})(wr ||= {}), (function(e) {
		function t(e, t) {
			return {
				tabSize: e,
				insertSpaces: t
			};
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return R.defined(t) && R.uinteger(t.tabSize) && R.boolean(t.insertSpaces);
		}
		P(n, "is"), e.is = n;
	})(Tr ||= {}), (function(e) {
		function t(e, t, n) {
			return {
				range: e,
				target: t,
				data: n
			};
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return R.defined(t) && L.is(t.range) && (R.undefined(t.target) || R.string(t.target));
		}
		P(n, "is"), e.is = n;
	})(Er ||= {}), (function(e) {
		function t(e, t) {
			return {
				range: e,
				parent: t
			};
		}
		P(t, "create"), e.create = t;
		function n(t) {
			let n = t;
			return R.objectLiteral(n) && L.is(n.range) && (n.parent === void 0 || e.is(n.parent));
		}
		P(n, "is"), e.is = n;
	})(Dr ||= {}), (function(e) {
		e.namespace = "namespace", e.type = "type", e.class = "class", e.enum = "enum", e.interface = "interface", e.struct = "struct", e.typeParameter = "typeParameter", e.parameter = "parameter", e.variable = "variable", e.property = "property", e.enumMember = "enumMember", e.event = "event", e.function = "function", e.method = "method", e.macro = "macro", e.keyword = "keyword", e.modifier = "modifier", e.comment = "comment", e.string = "string", e.number = "number", e.regexp = "regexp", e.operator = "operator", e.decorator = "decorator", e.label = "label";
	})(Or ||= {}), (function(e) {
		e.declaration = "declaration", e.definition = "definition", e.readonly = "readonly", e.static = "static", e.deprecated = "deprecated", e.abstract = "abstract", e.async = "async", e.modification = "modification", e.documentation = "documentation", e.defaultLibrary = "defaultLibrary";
	})(kr ||= {}), (function(e) {
		function t(e) {
			let t = e;
			return R.objectLiteral(t) && (t.resultId === void 0 || typeof t.resultId == "string") && Array.isArray(t.data) && (t.data.length === 0 || typeof t.data[0] == "number");
		}
		P(t, "is"), e.is = t;
	})(Ar ||= {}), (function(e) {
		function t(e, t) {
			return {
				range: e,
				text: t
			};
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return t != null && L.is(t.range) && R.string(t.text);
		}
		P(n, "is"), e.is = n;
	})(jr ||= {}), (function(e) {
		function t(e, t, n) {
			return {
				range: e,
				variableName: t,
				caseSensitiveLookup: n
			};
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return t != null && L.is(t.range) && R.boolean(t.caseSensitiveLookup) && (R.string(t.variableName) || t.variableName === void 0);
		}
		P(n, "is"), e.is = n;
	})(Mr ||= {}), (function(e) {
		function t(e, t) {
			return {
				range: e,
				expression: t
			};
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return t != null && L.is(t.range) && (R.string(t.expression) || t.expression === void 0);
		}
		P(n, "is"), e.is = n;
	})(Nr ||= {}), (function(e) {
		function t(e, t) {
			return {
				frameId: e,
				stoppedLocation: t
			};
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return R.defined(t) && L.is(e.stoppedLocation);
		}
		P(n, "is"), e.is = n;
	})(Pr ||= {}), (function(e) {
		e.Type = 1, e.Parameter = 2;
		function t(e) {
			return e === 1 || e === 2;
		}
		P(t, "is"), e.is = t;
	})(Fr ||= {}), (function(e) {
		function t(e) {
			return { value: e };
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return R.objectLiteral(t) && (t.tooltip === void 0 || R.string(t.tooltip) || Qn.is(t.tooltip)) && (t.location === void 0 || bn.is(t.location)) && (t.command === void 0 || Mn.is(t.command));
		}
		P(n, "is"), e.is = n;
	})(Ir ||= {}), (function(e) {
		function t(e, t, n) {
			let r = {
				position: e,
				label: t
			};
			return n !== void 0 && (r.kind = n), r;
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return R.objectLiteral(t) && I.is(t.position) && (R.string(t.label) || R.typedArray(t.label, Ir.is)) && (t.kind === void 0 || Fr.is(t.kind)) && t.textEdits === void 0 || R.typedArray(t.textEdits, Nn.is) && (t.tooltip === void 0 || R.string(t.tooltip) || Qn.is(t.tooltip)) && (t.paddingLeft === void 0 || R.boolean(t.paddingLeft)) && (t.paddingRight === void 0 || R.boolean(t.paddingRight));
		}
		P(n, "is"), e.is = n;
	})(Lr ||= {}), (function(e) {
		function t(e) {
			return {
				kind: "snippet",
				value: e
			};
		}
		P(t, "createSnippet"), e.createSnippet = t;
		function n(e) {
			let t = e;
			return R.objectLiteral(t) && t.kind === "snippet" && R.string(t.value);
		}
		P(n, "isSnippet"), e.isSnippet = n;
	})(Rr ||= {}), (function(e) {
		function t(e, t, n, r) {
			return {
				insertText: e,
				filterText: t,
				range: n,
				command: r
			};
		}
		P(t, "create"), e.create = t;
	})(zr ||= {}), (function(e) {
		function t(e) {
			return { items: e };
		}
		P(t, "create"), e.create = t;
	})(Br ||= {}), (function(e) {
		e.Invoked = 1, e.Automatic = 2;
	})(Vr ||= {}), (function(e) {
		function t(e, t) {
			return {
				range: e,
				text: t
			};
		}
		P(t, "create"), e.create = t;
	})(Hr ||= {}), (function(e) {
		function t(e, t) {
			return {
				triggerKind: e,
				selectedCompletionInfo: t
			};
		}
		P(t, "create"), e.create = t;
	})(Ur ||= {}), (function(e) {
		function t(e) {
			let t = e;
			return R.objectLiteral(t) && _n.is(t.uri) && R.string(t.name);
		}
		P(t, "is"), e.is = t;
	})(Wr ||= {}), Gr = [
		"\n",
		"\r\n",
		"\r"
	], (function(e) {
		function t(e, t, n, r) {
			return new qr(e, t, n, r);
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return !!(R.defined(t) && R.string(t.uri) && (R.undefined(t.languageId) || R.string(t.languageId)) && R.uinteger(t.lineCount) && R.func(t.getText) && R.func(t.positionAt) && R.func(t.offsetAt));
		}
		P(n, "is"), e.is = n;
		function r(e, t) {
			let n = e.getText(), r = i(t, (e, t) => {
				let n = e.range.start.line - t.range.start.line;
				return n === 0 ? e.range.start.character - t.range.start.character : n;
			}), a = n.length;
			for (let t = r.length - 1; t >= 0; t--) {
				let i = r[t], o = e.offsetAt(i.range.start), s = e.offsetAt(i.range.end);
				if (s <= a) n = n.substring(0, o) + i.newText + n.substring(s, n.length);
				else throw Error("Overlapping edit");
				a = o;
			}
			return n;
		}
		P(r, "applyEdits"), e.applyEdits = r;
		function i(e, t) {
			if (e.length <= 1) return e;
			let n = e.length / 2 | 0, r = e.slice(0, n), a = e.slice(n);
			i(r, t), i(a, t);
			let o = 0, s = 0, c = 0;
			for (; o < r.length && s < a.length;) t(r[o], a[s]) <= 0 ? e[c++] = r[o++] : e[c++] = a[s++];
			for (; o < r.length;) e[c++] = r[o++];
			for (; s < a.length;) e[c++] = a[s++];
			return e;
		}
		P(i, "mergeSort");
	})(Kr ||= {}), qr = (r = class {
		constructor(e, t, n, r) {
			this._uri = e, this._languageId = t, this._version = n, this._content = r, this._lineOffsets = void 0;
		}
		get uri() {
			return this._uri;
		}
		get languageId() {
			return this._languageId;
		}
		get version() {
			return this._version;
		}
		getText(e) {
			if (e) {
				let t = this.offsetAt(e.start), n = this.offsetAt(e.end);
				return this._content.substring(t, n);
			}
			return this._content;
		}
		update(e, t) {
			this._content = e.text, this._version = t, this._lineOffsets = void 0;
		}
		getLineOffsets() {
			if (this._lineOffsets === void 0) {
				let e = [], t = this._content, n = !0;
				for (let r = 0; r < t.length; r++) {
					n &&= (e.push(r), !1);
					let i = t.charAt(r);
					n = i === "\r" || i === "\n", i === "\r" && r + 1 < t.length && t.charAt(r + 1) === "\n" && r++;
				}
				n && t.length > 0 && e.push(t.length), this._lineOffsets = e;
			}
			return this._lineOffsets;
		}
		positionAt(e) {
			e = Math.max(Math.min(e, this._content.length), 0);
			let t = this.getLineOffsets(), n = 0, r = t.length;
			if (r === 0) return I.create(0, e);
			for (; n < r;) {
				let i = Math.floor((n + r) / 2);
				t[i] > e ? r = i : n = i + 1;
			}
			let i = n - 1;
			return I.create(i, e - t[i]);
		}
		offsetAt(e) {
			let t = this.getLineOffsets();
			if (e.line >= t.length) return this._content.length;
			if (e.line < 0) return 0;
			let n = t[e.line], r = e.line + 1 < t.length ? t[e.line + 1] : this._content.length;
			return Math.max(Math.min(n + e.character, r), n);
		}
		get lineCount() {
			return this.getLineOffsets().length;
		}
	}, P(r, "FullTextDocument"), r), (function(e) {
		let t = Object.prototype.toString;
		function n(e) {
			return typeof e < "u";
		}
		P(n, "defined"), e.defined = n;
		function r(e) {
			return typeof e > "u";
		}
		P(r, "undefined"), e.undefined = r;
		function i(e) {
			return e === !0 || e === !1;
		}
		P(i, "boolean"), e.boolean = i;
		function a(e) {
			return t.call(e) === "[object String]";
		}
		P(a, "string"), e.string = a;
		function o(e) {
			return t.call(e) === "[object Number]";
		}
		P(o, "number"), e.number = o;
		function s(e, n, r) {
			return t.call(e) === "[object Number]" && n <= e && e <= r;
		}
		P(s, "numberRange"), e.numberRange = s;
		function c(e) {
			return t.call(e) === "[object Number]" && -2147483648 <= e && e <= 2147483647;
		}
		P(c, "integer"), e.integer = c;
		function l(e) {
			return t.call(e) === "[object Number]" && 0 <= e && e <= 2147483647;
		}
		P(l, "uinteger"), e.uinteger = l;
		function u(e) {
			return t.call(e) === "[object Function]";
		}
		P(u, "func"), e.func = u;
		function d(e) {
			return typeof e == "object" && !!e;
		}
		P(d, "objectLiteral"), e.objectLiteral = d;
		function f(e, t) {
			return Array.isArray(e) && e.every(t);
		}
		P(f, "typedArray"), e.typedArray = f;
	})(R ||= {});
} }), z = F({ "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/messages.js"(e) {
	var t, n, i, a, o;
	Object.defineProperty(e, "__esModule", { value: !0 }), e.CM = e.ProtocolNotificationType = e.ProtocolNotificationType0 = e.ProtocolRequestType = e.ProtocolRequestType0 = e.RegistrationType = e.MessageDirection = void 0;
	var s = mn(), c;
	(function(e) {
		e.clientToServer = "clientToServer", e.serverToClient = "serverToClient", e.both = "both";
	})(c || (e.MessageDirection = c = {})), e.RegistrationType = (t = class {
		constructor(e) {
			r(this, "____", void 0), r(this, "method", void 0), this.method = e;
		}
	}, P(t, "RegistrationType"), t), e.ProtocolRequestType0 = (n = class extends s.RequestType0 {
		constructor(e) {
			super(e), r(this, "__", void 0), r(this, "___", void 0), r(this, "____", void 0), r(this, "_pr", void 0);
		}
	}, P(n, "ProtocolRequestType0"), n), e.ProtocolRequestType = (i = class extends s.RequestType {
		constructor(e) {
			super(e, s.ParameterStructures.byName), r(this, "__", void 0), r(this, "___", void 0), r(this, "____", void 0), r(this, "_pr", void 0);
		}
	}, P(i, "ProtocolRequestType"), i), e.ProtocolNotificationType0 = (a = class extends s.NotificationType0 {
		constructor(e) {
			super(e), r(this, "___", void 0), r(this, "____", void 0);
		}
	}, P(a, "ProtocolNotificationType0"), a), e.ProtocolNotificationType = (o = class extends s.NotificationType {
		constructor(e) {
			super(e, s.ParameterStructures.byName), r(this, "___", void 0), r(this, "____", void 0);
		}
	}, P(o, "ProtocolNotificationType"), o);
	var l;
	(function(e) {
		function t(e, t) {
			return {
				client: e,
				server: t
			};
		}
		P(t, "create"), e.create = t;
	})(l || (e.CM = l = {}));
} }), Yr = F({ "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/utils/is.js"(e) {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.boolean = t, e.string = n, e.number = r, e.error = i, e.func = a, e.array = o, e.stringArray = s, e.typedArray = c, e.objectLiteral = l;
	function t(e) {
		return e === !0 || e === !1;
	}
	P(t, "boolean");
	function n(e) {
		return typeof e == "string" || e instanceof String;
	}
	P(n, "string");
	function r(e) {
		return typeof e == "number" || e instanceof Number;
	}
	P(r, "number");
	function i(e) {
		return e instanceof Error;
	}
	P(i, "error");
	function a(e) {
		return typeof e == "function";
	}
	P(a, "func");
	function o(e) {
		return Array.isArray(e);
	}
	P(o, "array");
	function s(e) {
		return o(e) && e.every((e) => n(e));
	}
	P(s, "stringArray");
	function c(e, t) {
		return Array.isArray(e) && e.every(t);
	}
	P(c, "typedArray");
	function l(e) {
		return typeof e == "object" && !!e;
	}
	P(l, "objectLiteral");
} }), Xr = F({ "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.implementation.js"(e) {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.ImplementationRequest = void 0;
	var t = z(), n;
	(function(e) {
		e.method = "textDocument/implementation", e.messageDirection = t.MessageDirection.clientToServer, e.type = new t.ProtocolRequestType(e.method), e.capabilities = t.CM.create("textDocument.implementation", "implementationProvider");
	})(n || (e.ImplementationRequest = n = {}));
} }), Zr = F({ "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.typeDefinition.js"(e) {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.TypeDefinitionRequest = void 0;
	var t = z(), n;
	(function(e) {
		e.method = "textDocument/typeDefinition", e.messageDirection = t.MessageDirection.clientToServer, e.type = new t.ProtocolRequestType(e.method), e.capabilities = t.CM.create("textDocument.typeDefinition", "typeDefinitionProvider");
	})(n || (e.TypeDefinitionRequest = n = {}));
} }), Qr = F({ "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.workspaceFolder.js"(e) {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.DidChangeWorkspaceFoldersNotification = e.WorkspaceFoldersRequest = void 0;
	var t = z(), n;
	(function(e) {
		e.method = "workspace/workspaceFolders", e.messageDirection = t.MessageDirection.serverToClient, e.type = new t.ProtocolRequestType0(e.method), e.capabilities = t.CM.create("workspace.workspaceFolders", "workspace.workspaceFolders");
	})(n || (e.WorkspaceFoldersRequest = n = {}));
	var r;
	(function(e) {
		e.method = "workspace/didChangeWorkspaceFolders", e.messageDirection = t.MessageDirection.clientToServer, e.type = new t.ProtocolNotificationType(e.method), e.capabilities = t.CM.create(void 0, "workspace.workspaceFolders.changeNotifications");
	})(r || (e.DidChangeWorkspaceFoldersNotification = r = {}));
} }), $r = F({ "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.configuration.js"(e) {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.ConfigurationRequest = void 0;
	var t = z(), n;
	(function(e) {
		e.method = "workspace/configuration", e.messageDirection = t.MessageDirection.serverToClient, e.type = new t.ProtocolRequestType(e.method), e.capabilities = t.CM.create("workspace.configuration", void 0);
	})(n || (e.ConfigurationRequest = n = {}));
} }), ei = F({ "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.colorProvider.js"(e) {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.ColorPresentationRequest = e.DocumentColorRequest = void 0;
	var t = z(), n;
	(function(e) {
		e.method = "textDocument/documentColor", e.messageDirection = t.MessageDirection.clientToServer, e.type = new t.ProtocolRequestType(e.method), e.capabilities = t.CM.create("textDocument.colorProvider", "colorProvider");
	})(n || (e.DocumentColorRequest = n = {}));
	var r;
	(function(e) {
		e.method = "textDocument/colorPresentation", e.messageDirection = t.MessageDirection.clientToServer, e.type = new t.ProtocolRequestType(e.method), e.capabilities = t.CM.create("textDocument.colorProvider", "colorProvider");
	})(r || (e.ColorPresentationRequest = r = {}));
} }), ti = F({ "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.foldingRange.js"(e) {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.FoldingRangeRefreshRequest = e.FoldingRangeRequest = void 0;
	var t = z(), n;
	(function(e) {
		e.method = "textDocument/foldingRange", e.messageDirection = t.MessageDirection.clientToServer, e.type = new t.ProtocolRequestType(e.method), e.capabilities = t.CM.create("textDocument.foldingRange", "foldingRangeProvider");
	})(n || (e.FoldingRangeRequest = n = {}));
	var r;
	(function(e) {
		e.method = "workspace/foldingRange/refresh", e.messageDirection = t.MessageDirection.serverToClient, e.type = new t.ProtocolRequestType0(e.method), e.capabilities = t.CM.create("workspace.foldingRange.refreshSupport", void 0);
	})(r || (e.FoldingRangeRefreshRequest = r = {}));
} }), ni = F({ "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.declaration.js"(e) {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.DeclarationRequest = void 0;
	var t = z(), n;
	(function(e) {
		e.method = "textDocument/declaration", e.messageDirection = t.MessageDirection.clientToServer, e.type = new t.ProtocolRequestType(e.method), e.capabilities = t.CM.create("textDocument.declaration", "declarationProvider");
	})(n || (e.DeclarationRequest = n = {}));
} }), ri = F({ "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.selectionRange.js"(e) {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.SelectionRangeRequest = void 0;
	var t = z(), n;
	(function(e) {
		e.method = "textDocument/selectionRange", e.messageDirection = t.MessageDirection.clientToServer, e.type = new t.ProtocolRequestType(e.method), e.capabilities = t.CM.create("textDocument.selectionRange", "selectionRangeProvider");
	})(n || (e.SelectionRangeRequest = n = {}));
} }), ii = F({ "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.progress.js"(e) {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.WorkDoneProgressCancelNotification = e.WorkDoneProgressCreateRequest = e.WorkDoneProgress = void 0;
	var t = mn(), n = z(), r;
	(function(e) {
		e.type = new t.ProgressType();
		function n(t) {
			return t === e.type;
		}
		P(n, "is"), e.is = n;
	})(r || (e.WorkDoneProgress = r = {}));
	var i;
	(function(e) {
		e.method = "window/workDoneProgress/create", e.messageDirection = n.MessageDirection.serverToClient, e.type = new n.ProtocolRequestType(e.method), e.capabilities = n.CM.create("window.workDoneProgress", void 0);
	})(i || (e.WorkDoneProgressCreateRequest = i = {}));
	var a;
	(function(e) {
		e.method = "window/workDoneProgress/cancel", e.messageDirection = n.MessageDirection.clientToServer, e.type = new n.ProtocolNotificationType(e.method);
	})(a || (e.WorkDoneProgressCancelNotification = a = {}));
} }), ai = F({ "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.callHierarchy.js"(e) {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.CallHierarchyOutgoingCallsRequest = e.CallHierarchyIncomingCallsRequest = e.CallHierarchyPrepareRequest = void 0;
	var t = z(), n;
	(function(e) {
		e.method = "textDocument/prepareCallHierarchy", e.messageDirection = t.MessageDirection.clientToServer, e.type = new t.ProtocolRequestType(e.method), e.capabilities = t.CM.create("textDocument.callHierarchy", "callHierarchyProvider");
	})(n || (e.CallHierarchyPrepareRequest = n = {}));
	var r;
	(function(e) {
		e.method = "callHierarchy/incomingCalls", e.messageDirection = t.MessageDirection.clientToServer, e.type = new t.ProtocolRequestType(e.method), e.capabilities = t.CM.create("textDocument.callHierarchy", "callHierarchyProvider");
	})(r || (e.CallHierarchyIncomingCallsRequest = r = {}));
	var i;
	(function(e) {
		e.method = "callHierarchy/outgoingCalls", e.messageDirection = t.MessageDirection.clientToServer, e.type = new t.ProtocolRequestType(e.method), e.capabilities = t.CM.create("textDocument.callHierarchy", "callHierarchyProvider");
	})(i || (e.CallHierarchyOutgoingCallsRequest = i = {}));
} }), oi = F({ "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.semanticTokens.js"(e) {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.SemanticTokensRefreshRequest = e.SemanticTokensRangeRequest = e.SemanticTokensDeltaRequest = e.SemanticTokensRequest = e.SemanticTokensRegistrationType = e.TokenFormat = void 0;
	var t = z(), n;
	(function(e) {
		e.Relative = "relative";
	})(n || (e.TokenFormat = n = {}));
	var r;
	(function(e) {
		e.method = "textDocument/semanticTokens", e.type = new t.RegistrationType(e.method);
	})(r || (e.SemanticTokensRegistrationType = r = {}));
	var i;
	(function(e) {
		e.method = "textDocument/semanticTokens/full", e.messageDirection = t.MessageDirection.clientToServer, e.type = new t.ProtocolRequestType(e.method), e.registrationMethod = r.method, e.capabilities = t.CM.create("textDocument.semanticTokens", "semanticTokensProvider");
	})(i || (e.SemanticTokensRequest = i = {}));
	var a;
	(function(e) {
		e.method = "textDocument/semanticTokens/full/delta", e.messageDirection = t.MessageDirection.clientToServer, e.type = new t.ProtocolRequestType(e.method), e.registrationMethod = r.method, e.capabilities = t.CM.create("textDocument.semanticTokens.requests.full.delta", "semanticTokensProvider.full.delta");
	})(a || (e.SemanticTokensDeltaRequest = a = {}));
	var o;
	(function(e) {
		e.method = "textDocument/semanticTokens/range", e.messageDirection = t.MessageDirection.clientToServer, e.type = new t.ProtocolRequestType(e.method), e.registrationMethod = r.method, e.capabilities = t.CM.create("textDocument.semanticTokens.requests.range", "semanticTokensProvider.range");
	})(o || (e.SemanticTokensRangeRequest = o = {}));
	var s;
	(function(e) {
		e.method = "workspace/semanticTokens/refresh", e.messageDirection = t.MessageDirection.serverToClient, e.type = new t.ProtocolRequestType0(e.method), e.capabilities = t.CM.create("workspace.semanticTokens.refreshSupport", void 0);
	})(s || (e.SemanticTokensRefreshRequest = s = {}));
} }), si = F({ "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.showDocument.js"(e) {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.ShowDocumentRequest = void 0;
	var t = z(), n;
	(function(e) {
		e.method = "window/showDocument", e.messageDirection = t.MessageDirection.serverToClient, e.type = new t.ProtocolRequestType(e.method), e.capabilities = t.CM.create("window.showDocument.support", void 0);
	})(n || (e.ShowDocumentRequest = n = {}));
} }), ci = F({ "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.linkedEditingRange.js"(e) {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.LinkedEditingRangeRequest = void 0;
	var t = z(), n;
	(function(e) {
		e.method = "textDocument/linkedEditingRange", e.messageDirection = t.MessageDirection.clientToServer, e.type = new t.ProtocolRequestType(e.method), e.capabilities = t.CM.create("textDocument.linkedEditingRange", "linkedEditingRangeProvider");
	})(n || (e.LinkedEditingRangeRequest = n = {}));
} }), li = F({ "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.fileOperations.js"(e) {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.WillDeleteFilesRequest = e.DidDeleteFilesNotification = e.DidRenameFilesNotification = e.WillRenameFilesRequest = e.DidCreateFilesNotification = e.WillCreateFilesRequest = e.FileOperationPatternKind = void 0;
	var t = z(), n;
	(function(e) {
		e.file = "file", e.folder = "folder";
	})(n || (e.FileOperationPatternKind = n = {}));
	var r;
	(function(e) {
		e.method = "workspace/willCreateFiles", e.messageDirection = t.MessageDirection.clientToServer, e.type = new t.ProtocolRequestType(e.method), e.capabilities = t.CM.create("workspace.fileOperations.willCreate", "workspace.fileOperations.willCreate");
	})(r || (e.WillCreateFilesRequest = r = {}));
	var i;
	(function(e) {
		e.method = "workspace/didCreateFiles", e.messageDirection = t.MessageDirection.clientToServer, e.type = new t.ProtocolNotificationType(e.method), e.capabilities = t.CM.create("workspace.fileOperations.didCreate", "workspace.fileOperations.didCreate");
	})(i || (e.DidCreateFilesNotification = i = {}));
	var a;
	(function(e) {
		e.method = "workspace/willRenameFiles", e.messageDirection = t.MessageDirection.clientToServer, e.type = new t.ProtocolRequestType(e.method), e.capabilities = t.CM.create("workspace.fileOperations.willRename", "workspace.fileOperations.willRename");
	})(a || (e.WillRenameFilesRequest = a = {}));
	var o;
	(function(e) {
		e.method = "workspace/didRenameFiles", e.messageDirection = t.MessageDirection.clientToServer, e.type = new t.ProtocolNotificationType(e.method), e.capabilities = t.CM.create("workspace.fileOperations.didRename", "workspace.fileOperations.didRename");
	})(o || (e.DidRenameFilesNotification = o = {}));
	var s;
	(function(e) {
		e.method = "workspace/didDeleteFiles", e.messageDirection = t.MessageDirection.clientToServer, e.type = new t.ProtocolNotificationType(e.method), e.capabilities = t.CM.create("workspace.fileOperations.didDelete", "workspace.fileOperations.didDelete");
	})(s || (e.DidDeleteFilesNotification = s = {}));
	var c;
	(function(e) {
		e.method = "workspace/willDeleteFiles", e.messageDirection = t.MessageDirection.clientToServer, e.type = new t.ProtocolRequestType(e.method), e.capabilities = t.CM.create("workspace.fileOperations.willDelete", "workspace.fileOperations.willDelete");
	})(c || (e.WillDeleteFilesRequest = c = {}));
} }), ui = F({ "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.moniker.js"(e) {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.MonikerRequest = e.MonikerKind = e.UniquenessLevel = void 0;
	var t = z(), n;
	(function(e) {
		e.document = "document", e.project = "project", e.group = "group", e.scheme = "scheme", e.global = "global";
	})(n || (e.UniquenessLevel = n = {}));
	var r;
	(function(e) {
		e.$import = "import", e.$export = "export", e.local = "local";
	})(r || (e.MonikerKind = r = {}));
	var i;
	(function(e) {
		e.method = "textDocument/moniker", e.messageDirection = t.MessageDirection.clientToServer, e.type = new t.ProtocolRequestType(e.method), e.capabilities = t.CM.create("textDocument.moniker", "monikerProvider");
	})(i || (e.MonikerRequest = i = {}));
} }), di = F({ "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.typeHierarchy.js"(e) {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.TypeHierarchySubtypesRequest = e.TypeHierarchySupertypesRequest = e.TypeHierarchyPrepareRequest = void 0;
	var t = z(), n;
	(function(e) {
		e.method = "textDocument/prepareTypeHierarchy", e.messageDirection = t.MessageDirection.clientToServer, e.type = new t.ProtocolRequestType(e.method), e.capabilities = t.CM.create("textDocument.typeHierarchy", "typeHierarchyProvider");
	})(n || (e.TypeHierarchyPrepareRequest = n = {}));
	var r;
	(function(e) {
		e.method = "typeHierarchy/supertypes", e.messageDirection = t.MessageDirection.clientToServer, e.type = new t.ProtocolRequestType(e.method);
	})(r || (e.TypeHierarchySupertypesRequest = r = {}));
	var i;
	(function(e) {
		e.method = "typeHierarchy/subtypes", e.messageDirection = t.MessageDirection.clientToServer, e.type = new t.ProtocolRequestType(e.method);
	})(i || (e.TypeHierarchySubtypesRequest = i = {}));
} }), fi = F({ "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.inlineValue.js"(e) {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.InlineValueRefreshRequest = e.InlineValueRequest = void 0;
	var t = z(), n;
	(function(e) {
		e.method = "textDocument/inlineValue", e.messageDirection = t.MessageDirection.clientToServer, e.type = new t.ProtocolRequestType(e.method), e.capabilities = t.CM.create("textDocument.inlineValue", "inlineValueProvider");
	})(n || (e.InlineValueRequest = n = {}));
	var r;
	(function(e) {
		e.method = "workspace/inlineValue/refresh", e.messageDirection = t.MessageDirection.serverToClient, e.type = new t.ProtocolRequestType0(e.method), e.capabilities = t.CM.create("workspace.inlineValue.refreshSupport", void 0);
	})(r || (e.InlineValueRefreshRequest = r = {}));
} }), pi = F({ "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.inlayHint.js"(e) {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.InlayHintRefreshRequest = e.InlayHintResolveRequest = e.InlayHintRequest = void 0;
	var t = z(), n;
	(function(e) {
		e.method = "textDocument/inlayHint", e.messageDirection = t.MessageDirection.clientToServer, e.type = new t.ProtocolRequestType(e.method), e.capabilities = t.CM.create("textDocument.inlayHint", "inlayHintProvider");
	})(n || (e.InlayHintRequest = n = {}));
	var r;
	(function(e) {
		e.method = "inlayHint/resolve", e.messageDirection = t.MessageDirection.clientToServer, e.type = new t.ProtocolRequestType(e.method), e.capabilities = t.CM.create("textDocument.inlayHint.resolveSupport", "inlayHintProvider.resolveProvider");
	})(r || (e.InlayHintResolveRequest = r = {}));
	var i;
	(function(e) {
		e.method = "workspace/inlayHint/refresh", e.messageDirection = t.MessageDirection.serverToClient, e.type = new t.ProtocolRequestType0(e.method), e.capabilities = t.CM.create("workspace.inlayHint.refreshSupport", void 0);
	})(i || (e.InlayHintRefreshRequest = i = {}));
} }), mi = F({ "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.diagnostic.js"(e) {
	var t = e && e.__createBinding || (Object.create ? (function(e, t, n, r) {
		r === void 0 && (r = n);
		var i = Object.getOwnPropertyDescriptor(t, n);
		(!i || ("get" in i ? !t.__esModule : i.writable || i.configurable)) && (i = {
			enumerable: !0,
			get: /* @__PURE__ */ P(function() {
				return t[n];
			}, "get")
		}), Object.defineProperty(e, r, i);
	}) : (function(e, t, n, r) {
		r === void 0 && (r = n), e[r] = t[n];
	})), n = e && e.__setModuleDefault || (Object.create ? (function(e, t) {
		Object.defineProperty(e, "default", {
			enumerable: !0,
			value: t
		});
	}) : function(e, t) {
		e.default = t;
	}), r = e && e.__importStar || /* @__PURE__ */ (function() {
		var e = /* @__PURE__ */ P(function(t) {
			return e = Object.getOwnPropertyNames || function(e) {
				var t = [];
				for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[t.length] = n);
				return t;
			}, e(t);
		}, "ownKeys");
		return function(r) {
			if (r && r.__esModule) return r;
			var i = {};
			if (r != null) for (var a = e(r), o = 0; o < a.length; o++) a[o] !== "default" && t(i, r, a[o]);
			return n(i, r), i;
		};
	})();
	Object.defineProperty(e, "__esModule", { value: !0 }), e.DiagnosticRefreshRequest = e.WorkspaceDiagnosticRequest = e.DocumentDiagnosticRequest = e.DocumentDiagnosticReportKind = e.DiagnosticServerCancellationData = void 0;
	var i = mn(), a = r(Yr()), o = z(), s;
	(function(e) {
		function t(e) {
			let t = e;
			return t && a.boolean(t.retriggerRequest);
		}
		P(t, "is"), e.is = t;
	})(s || (e.DiagnosticServerCancellationData = s = {}));
	var c;
	(function(e) {
		e.Full = "full", e.Unchanged = "unchanged";
	})(c || (e.DocumentDiagnosticReportKind = c = {}));
	var l;
	(function(e) {
		e.method = "textDocument/diagnostic", e.messageDirection = o.MessageDirection.clientToServer, e.type = new o.ProtocolRequestType(e.method), e.partialResult = new i.ProgressType(), e.capabilities = o.CM.create("textDocument.diagnostic", "diagnosticProvider");
	})(l || (e.DocumentDiagnosticRequest = l = {}));
	var u;
	(function(e) {
		e.method = "workspace/diagnostic", e.messageDirection = o.MessageDirection.clientToServer, e.type = new o.ProtocolRequestType(e.method), e.partialResult = new i.ProgressType(), e.capabilities = o.CM.create("workspace.diagnostics", "diagnosticProvider.workspaceDiagnostics");
	})(u || (e.WorkspaceDiagnosticRequest = u = {}));
	var d;
	(function(e) {
		e.method = "workspace/diagnostic/refresh", e.messageDirection = o.MessageDirection.serverToClient, e.type = new o.ProtocolRequestType0(e.method), e.capabilities = o.CM.create("workspace.diagnostics.refreshSupport", void 0);
	})(d || (e.DiagnosticRefreshRequest = d = {}));
} }), hi = F({ "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.notebook.js"(e) {
	var t = e && e.__createBinding || (Object.create ? (function(e, t, n, r) {
		r === void 0 && (r = n);
		var i = Object.getOwnPropertyDescriptor(t, n);
		(!i || ("get" in i ? !t.__esModule : i.writable || i.configurable)) && (i = {
			enumerable: !0,
			get: /* @__PURE__ */ P(function() {
				return t[n];
			}, "get")
		}), Object.defineProperty(e, r, i);
	}) : (function(e, t, n, r) {
		r === void 0 && (r = n), e[r] = t[n];
	})), n = e && e.__setModuleDefault || (Object.create ? (function(e, t) {
		Object.defineProperty(e, "default", {
			enumerable: !0,
			value: t
		});
	}) : function(e, t) {
		e.default = t;
	}), r = e && e.__importStar || /* @__PURE__ */ (function() {
		var e = /* @__PURE__ */ P(function(t) {
			return e = Object.getOwnPropertyNames || function(e) {
				var t = [];
				for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[t.length] = n);
				return t;
			}, e(t);
		}, "ownKeys");
		return function(r) {
			if (r && r.__esModule) return r;
			var i = {};
			if (r != null) for (var a = e(r), o = 0; o < a.length; o++) a[o] !== "default" && t(i, r, a[o]);
			return n(i, r), i;
		};
	})();
	Object.defineProperty(e, "__esModule", { value: !0 }), e.DidCloseNotebookDocumentNotification = e.DidSaveNotebookDocumentNotification = e.DidChangeNotebookDocumentNotification = e.NotebookCellArrayChange = e.DidOpenNotebookDocumentNotification = e.NotebookDocumentSyncRegistrationType = e.NotebookDocument = e.NotebookCell = e.ExecutionSummary = e.NotebookCellKind = void 0;
	var i = (Jr(), $t(hn)), a = r(Yr()), o = z(), s;
	(function(e) {
		e.Markup = 1, e.Code = 2;
		function t(e) {
			return e === 1 || e === 2;
		}
		P(t, "is"), e.is = t;
	})(s || (e.NotebookCellKind = s = {}));
	var c;
	(function(e) {
		function t(e, t) {
			let n = { executionOrder: e };
			return (t === !0 || t === !1) && (n.success = t), n;
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return a.objectLiteral(t) && i.uinteger.is(t.executionOrder) && (t.success === void 0 || a.boolean(t.success));
		}
		P(n, "is"), e.is = n;
		function r(e, t) {
			return e === t ? !0 : e == null || t == null ? !1 : e.executionOrder === t.executionOrder && e.success === t.success;
		}
		P(r, "equals"), e.equals = r;
	})(c || (e.ExecutionSummary = c = {}));
	var l;
	(function(e) {
		function t(e, t) {
			return {
				kind: e,
				document: t
			};
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return a.objectLiteral(t) && s.is(t.kind) && i.DocumentUri.is(t.document) && (t.metadata === void 0 || a.objectLiteral(t.metadata));
		}
		P(n, "is"), e.is = n;
		function r(e, t) {
			let n = /* @__PURE__ */ new Set();
			return e.document !== t.document && n.add("document"), e.kind !== t.kind && n.add("kind"), e.executionSummary !== t.executionSummary && n.add("executionSummary"), e.metadata === void 0 && t.metadata === void 0 || o(e.metadata, t.metadata) || n.add("metadata"), e.executionSummary === void 0 && t.executionSummary === void 0 || c.equals(e.executionSummary, t.executionSummary) || n.add("executionSummary"), n;
		}
		P(r, "diff"), e.diff = r;
		function o(e, t) {
			if (e === t) return !0;
			if (e == null || t == null || typeof e != typeof t || typeof e != "object") return !1;
			let n = Array.isArray(e), r = Array.isArray(t);
			if (n !== r) return !1;
			if (n && r) {
				if (e.length !== t.length) return !1;
				for (let n = 0; n < e.length; n++) if (!o(e[n], t[n])) return !1;
			}
			if (a.objectLiteral(e) && a.objectLiteral(t)) {
				let n = Object.keys(e), r = Object.keys(t);
				if (n.length !== r.length || (n.sort(), r.sort(), !o(n, r))) return !1;
				for (let r = 0; r < n.length; r++) {
					let i = n[r];
					if (!o(e[i], t[i])) return !1;
				}
			}
			return !0;
		}
		P(o, "equalsMetadata");
	})(l || (e.NotebookCell = l = {}));
	var u;
	(function(e) {
		function t(e, t, n, r) {
			return {
				uri: e,
				notebookType: t,
				version: n,
				cells: r
			};
		}
		P(t, "create"), e.create = t;
		function n(e) {
			let t = e;
			return a.objectLiteral(t) && a.string(t.uri) && i.integer.is(t.version) && a.typedArray(t.cells, l.is);
		}
		P(n, "is"), e.is = n;
	})(u || (e.NotebookDocument = u = {}));
	var d;
	(function(e) {
		e.method = "notebookDocument/sync", e.messageDirection = o.MessageDirection.clientToServer, e.type = new o.RegistrationType(e.method);
	})(d || (e.NotebookDocumentSyncRegistrationType = d = {}));
	var f;
	(function(e) {
		e.method = "notebookDocument/didOpen", e.messageDirection = o.MessageDirection.clientToServer, e.type = new o.ProtocolNotificationType(e.method), e.registrationMethod = d.method;
	})(f || (e.DidOpenNotebookDocumentNotification = f = {}));
	var p;
	(function(e) {
		function t(e) {
			let t = e;
			return a.objectLiteral(t) && i.uinteger.is(t.start) && i.uinteger.is(t.deleteCount) && (t.cells === void 0 || a.typedArray(t.cells, l.is));
		}
		P(t, "is"), e.is = t;
		function n(e, t, n) {
			let r = {
				start: e,
				deleteCount: t
			};
			return n !== void 0 && (r.cells = n), r;
		}
		P(n, "create"), e.create = n;
	})(p || (e.NotebookCellArrayChange = p = {}));
	var m;
	(function(e) {
		e.method = "notebookDocument/didChange", e.messageDirection = o.MessageDirection.clientToServer, e.type = new o.ProtocolNotificationType(e.method), e.registrationMethod = d.method;
	})(m || (e.DidChangeNotebookDocumentNotification = m = {}));
	var h;
	(function(e) {
		e.method = "notebookDocument/didSave", e.messageDirection = o.MessageDirection.clientToServer, e.type = new o.ProtocolNotificationType(e.method), e.registrationMethod = d.method;
	})(h || (e.DidSaveNotebookDocumentNotification = h = {}));
	var g;
	(function(e) {
		e.method = "notebookDocument/didClose", e.messageDirection = o.MessageDirection.clientToServer, e.type = new o.ProtocolNotificationType(e.method), e.registrationMethod = d.method;
	})(g || (e.DidCloseNotebookDocumentNotification = g = {}));
} }), gi = F({ "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.inlineCompletion.js"(e) {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.InlineCompletionRequest = void 0;
	var t = z(), n;
	(function(e) {
		e.method = "textDocument/inlineCompletion", e.messageDirection = t.MessageDirection.clientToServer, e.type = new t.ProtocolRequestType(e.method), e.capabilities = t.CM.create("textDocument.inlineCompletion", "inlineCompletionProvider");
	})(n || (e.InlineCompletionRequest = n = {}));
} }), _i = F({ "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.textDocumentContent.js"(e) {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.TextDocumentContentRefreshRequest = e.TextDocumentContentRequest = void 0;
	var t = z(), n;
	(function(e) {
		e.method = "workspace/textDocumentContent", e.messageDirection = t.MessageDirection.clientToServer, e.type = new t.ProtocolRequestType(e.method), e.capabilities = t.CM.create("workspace.textDocumentContent", "workspace.textDocumentContent");
	})(n || (e.TextDocumentContentRequest = n = {}));
	var r;
	(function(e) {
		e.method = "workspace/textDocumentContent/refresh", e.messageDirection = t.MessageDirection.serverToClient, e.type = new t.ProtocolRequestType(e.method);
	})(r || (e.TextDocumentContentRefreshRequest = r = {}));
} }), vi = F({ "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/protocol.js"(e) {
	var t = e && e.__createBinding || (Object.create ? (function(e, t, n, r) {
		r === void 0 && (r = n);
		var i = Object.getOwnPropertyDescriptor(t, n);
		(!i || ("get" in i ? !t.__esModule : i.writable || i.configurable)) && (i = {
			enumerable: !0,
			get: /* @__PURE__ */ P(function() {
				return t[n];
			}, "get")
		}), Object.defineProperty(e, r, i);
	}) : (function(e, t, n, r) {
		r === void 0 && (r = n), e[r] = t[n];
	})), n = e && e.__setModuleDefault || (Object.create ? (function(e, t) {
		Object.defineProperty(e, "default", {
			enumerable: !0,
			value: t
		});
	}) : function(e, t) {
		e.default = t;
	}), r = e && e.__importStar || /* @__PURE__ */ (function() {
		var e = /* @__PURE__ */ P(function(t) {
			return e = Object.getOwnPropertyNames || function(e) {
				var t = [];
				for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[t.length] = n);
				return t;
			}, e(t);
		}, "ownKeys");
		return function(r) {
			if (r && r.__esModule) return r;
			var i = {};
			if (r != null) for (var a = e(r), o = 0; o < a.length; o++) a[o] !== "default" && t(i, r, a[o]);
			return n(i, r), i;
		};
	})();
	Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeActionRequest = e.DocumentSymbolRequest = e.DocumentHighlightRequest = e.ReferencesRequest = e.DefinitionRequest = e.SignatureHelpRequest = e.SignatureHelpTriggerKind = e.HoverRequest = e.CompletionResolveRequest = e.CompletionRequest = e.CompletionTriggerKind = e.PublishDiagnosticsNotification = e.WatchKind = e.GlobPattern = e.RelativePattern = e.FileChangeType = e.DidChangeWatchedFilesNotification = e.WillSaveTextDocumentWaitUntilRequest = e.WillSaveTextDocumentNotification = e.TextDocumentSaveReason = e.DidSaveTextDocumentNotification = e.DidCloseTextDocumentNotification = e.DidChangeTextDocumentNotification = e.TextDocumentContentChangeEvent = e.DidOpenTextDocumentNotification = e.TextDocumentSyncKind = e.TelemetryEventNotification = e.LogMessageNotification = e.ShowMessageRequest = e.ShowMessageNotification = e.MessageType = e.DidChangeConfigurationNotification = e.ExitNotification = e.ShutdownRequest = e.InitializedNotification = e.InitializeErrorCodes = e.InitializeRequest = e.WorkDoneProgressOptions = e.TextDocumentRegistrationOptions = e.StaticRegistrationOptions = e.PositionEncodingKind = e.RegularExpressionEngineKind = e.FailureHandlingKind = e.ResourceOperationKind = e.UnregistrationRequest = e.RegistrationRequest = e.DocumentSelector = e.NotebookCellTextDocumentFilter = e.NotebookDocumentFilter = e.TextDocumentFilter = void 0, e.UniquenessLevel = e.WillDeleteFilesRequest = e.DidDeleteFilesNotification = e.WillRenameFilesRequest = e.DidRenameFilesNotification = e.WillCreateFilesRequest = e.DidCreateFilesNotification = e.FileOperationPatternKind = e.LinkedEditingRangeRequest = e.ShowDocumentRequest = e.SemanticTokensRegistrationType = e.SemanticTokensRefreshRequest = e.SemanticTokensRangeRequest = e.SemanticTokensDeltaRequest = e.SemanticTokensRequest = e.TokenFormat = e.CallHierarchyPrepareRequest = e.CallHierarchyOutgoingCallsRequest = e.CallHierarchyIncomingCallsRequest = e.WorkDoneProgressCancelNotification = e.WorkDoneProgressCreateRequest = e.WorkDoneProgress = e.SelectionRangeRequest = e.DeclarationRequest = e.FoldingRangeRefreshRequest = e.FoldingRangeRequest = e.ColorPresentationRequest = e.DocumentColorRequest = e.ConfigurationRequest = e.DidChangeWorkspaceFoldersNotification = e.WorkspaceFoldersRequest = e.TypeDefinitionRequest = e.ImplementationRequest = e.ApplyWorkspaceEditRequest = e.ExecuteCommandRequest = e.PrepareRenameRequest = e.RenameRequest = e.PrepareSupportDefaultBehavior = e.DocumentOnTypeFormattingRequest = e.DocumentRangesFormattingRequest = e.DocumentRangeFormattingRequest = e.DocumentFormattingRequest = e.DocumentLinkResolveRequest = e.DocumentLinkRequest = e.CodeLensRefreshRequest = e.CodeLensResolveRequest = e.CodeLensRequest = e.WorkspaceSymbolResolveRequest = e.WorkspaceSymbolRequest = e.CodeActionResolveRequest = void 0, e.TextDocumentContentRefreshRequest = e.TextDocumentContentRequest = e.InlineCompletionRequest = e.DidCloseNotebookDocumentNotification = e.DidSaveNotebookDocumentNotification = e.DidChangeNotebookDocumentNotification = e.NotebookCellArrayChange = e.DidOpenNotebookDocumentNotification = e.NotebookDocumentSyncRegistrationType = e.NotebookDocument = e.NotebookCell = e.ExecutionSummary = e.NotebookCellKind = e.DiagnosticRefreshRequest = e.WorkspaceDiagnosticRequest = e.DocumentDiagnosticRequest = e.DocumentDiagnosticReportKind = e.DiagnosticServerCancellationData = e.InlayHintRefreshRequest = e.InlayHintResolveRequest = e.InlayHintRequest = e.InlineValueRefreshRequest = e.InlineValueRequest = e.TypeHierarchySupertypesRequest = e.TypeHierarchySubtypesRequest = e.TypeHierarchyPrepareRequest = e.MonikerRequest = e.MonikerKind = void 0;
	var i = z(), a = (Jr(), $t(hn)), o = r(Yr()), s = Xr();
	Object.defineProperty(e, "ImplementationRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return s.ImplementationRequest;
		}, "get")
	});
	var c = Zr();
	Object.defineProperty(e, "TypeDefinitionRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return c.TypeDefinitionRequest;
		}, "get")
	});
	var l = Qr();
	Object.defineProperty(e, "WorkspaceFoldersRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return l.WorkspaceFoldersRequest;
		}, "get")
	}), Object.defineProperty(e, "DidChangeWorkspaceFoldersNotification", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return l.DidChangeWorkspaceFoldersNotification;
		}, "get")
	});
	var u = $r();
	Object.defineProperty(e, "ConfigurationRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return u.ConfigurationRequest;
		}, "get")
	});
	var d = ei();
	Object.defineProperty(e, "DocumentColorRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return d.DocumentColorRequest;
		}, "get")
	}), Object.defineProperty(e, "ColorPresentationRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return d.ColorPresentationRequest;
		}, "get")
	});
	var f = ti();
	Object.defineProperty(e, "FoldingRangeRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return f.FoldingRangeRequest;
		}, "get")
	}), Object.defineProperty(e, "FoldingRangeRefreshRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return f.FoldingRangeRefreshRequest;
		}, "get")
	});
	var p = ni();
	Object.defineProperty(e, "DeclarationRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return p.DeclarationRequest;
		}, "get")
	});
	var m = ri();
	Object.defineProperty(e, "SelectionRangeRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return m.SelectionRangeRequest;
		}, "get")
	});
	var h = ii();
	Object.defineProperty(e, "WorkDoneProgress", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return h.WorkDoneProgress;
		}, "get")
	}), Object.defineProperty(e, "WorkDoneProgressCreateRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return h.WorkDoneProgressCreateRequest;
		}, "get")
	}), Object.defineProperty(e, "WorkDoneProgressCancelNotification", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return h.WorkDoneProgressCancelNotification;
		}, "get")
	});
	var g = ai();
	Object.defineProperty(e, "CallHierarchyIncomingCallsRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return g.CallHierarchyIncomingCallsRequest;
		}, "get")
	}), Object.defineProperty(e, "CallHierarchyOutgoingCallsRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return g.CallHierarchyOutgoingCallsRequest;
		}, "get")
	}), Object.defineProperty(e, "CallHierarchyPrepareRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return g.CallHierarchyPrepareRequest;
		}, "get")
	});
	var _ = oi();
	Object.defineProperty(e, "TokenFormat", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return _.TokenFormat;
		}, "get")
	}), Object.defineProperty(e, "SemanticTokensRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return _.SemanticTokensRequest;
		}, "get")
	}), Object.defineProperty(e, "SemanticTokensDeltaRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return _.SemanticTokensDeltaRequest;
		}, "get")
	}), Object.defineProperty(e, "SemanticTokensRangeRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return _.SemanticTokensRangeRequest;
		}, "get")
	}), Object.defineProperty(e, "SemanticTokensRefreshRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return _.SemanticTokensRefreshRequest;
		}, "get")
	}), Object.defineProperty(e, "SemanticTokensRegistrationType", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return _.SemanticTokensRegistrationType;
		}, "get")
	});
	var v = si();
	Object.defineProperty(e, "ShowDocumentRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return v.ShowDocumentRequest;
		}, "get")
	});
	var y = ci();
	Object.defineProperty(e, "LinkedEditingRangeRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return y.LinkedEditingRangeRequest;
		}, "get")
	});
	var b = li();
	Object.defineProperty(e, "FileOperationPatternKind", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return b.FileOperationPatternKind;
		}, "get")
	}), Object.defineProperty(e, "DidCreateFilesNotification", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return b.DidCreateFilesNotification;
		}, "get")
	}), Object.defineProperty(e, "WillCreateFilesRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return b.WillCreateFilesRequest;
		}, "get")
	}), Object.defineProperty(e, "DidRenameFilesNotification", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return b.DidRenameFilesNotification;
		}, "get")
	}), Object.defineProperty(e, "WillRenameFilesRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return b.WillRenameFilesRequest;
		}, "get")
	}), Object.defineProperty(e, "DidDeleteFilesNotification", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return b.DidDeleteFilesNotification;
		}, "get")
	}), Object.defineProperty(e, "WillDeleteFilesRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return b.WillDeleteFilesRequest;
		}, "get")
	});
	var x = ui();
	Object.defineProperty(e, "UniquenessLevel", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return x.UniquenessLevel;
		}, "get")
	}), Object.defineProperty(e, "MonikerKind", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return x.MonikerKind;
		}, "get")
	}), Object.defineProperty(e, "MonikerRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return x.MonikerRequest;
		}, "get")
	});
	var S = di();
	Object.defineProperty(e, "TypeHierarchyPrepareRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return S.TypeHierarchyPrepareRequest;
		}, "get")
	}), Object.defineProperty(e, "TypeHierarchySubtypesRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return S.TypeHierarchySubtypesRequest;
		}, "get")
	}), Object.defineProperty(e, "TypeHierarchySupertypesRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return S.TypeHierarchySupertypesRequest;
		}, "get")
	});
	var C = fi();
	Object.defineProperty(e, "InlineValueRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return C.InlineValueRequest;
		}, "get")
	}), Object.defineProperty(e, "InlineValueRefreshRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return C.InlineValueRefreshRequest;
		}, "get")
	});
	var ee = pi();
	Object.defineProperty(e, "InlayHintRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return ee.InlayHintRequest;
		}, "get")
	}), Object.defineProperty(e, "InlayHintResolveRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return ee.InlayHintResolveRequest;
		}, "get")
	}), Object.defineProperty(e, "InlayHintRefreshRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return ee.InlayHintRefreshRequest;
		}, "get")
	});
	var w = mi();
	Object.defineProperty(e, "DiagnosticServerCancellationData", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return w.DiagnosticServerCancellationData;
		}, "get")
	}), Object.defineProperty(e, "DocumentDiagnosticReportKind", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return w.DocumentDiagnosticReportKind;
		}, "get")
	}), Object.defineProperty(e, "DocumentDiagnosticRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return w.DocumentDiagnosticRequest;
		}, "get")
	}), Object.defineProperty(e, "WorkspaceDiagnosticRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return w.WorkspaceDiagnosticRequest;
		}, "get")
	}), Object.defineProperty(e, "DiagnosticRefreshRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return w.DiagnosticRefreshRequest;
		}, "get")
	});
	var T = hi();
	Object.defineProperty(e, "NotebookCellKind", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return T.NotebookCellKind;
		}, "get")
	}), Object.defineProperty(e, "ExecutionSummary", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return T.ExecutionSummary;
		}, "get")
	}), Object.defineProperty(e, "NotebookCell", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return T.NotebookCell;
		}, "get")
	}), Object.defineProperty(e, "NotebookDocument", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return T.NotebookDocument;
		}, "get")
	}), Object.defineProperty(e, "NotebookDocumentSyncRegistrationType", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return T.NotebookDocumentSyncRegistrationType;
		}, "get")
	}), Object.defineProperty(e, "DidOpenNotebookDocumentNotification", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return T.DidOpenNotebookDocumentNotification;
		}, "get")
	}), Object.defineProperty(e, "NotebookCellArrayChange", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return T.NotebookCellArrayChange;
		}, "get")
	}), Object.defineProperty(e, "DidChangeNotebookDocumentNotification", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return T.DidChangeNotebookDocumentNotification;
		}, "get")
	}), Object.defineProperty(e, "DidSaveNotebookDocumentNotification", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return T.DidSaveNotebookDocumentNotification;
		}, "get")
	}), Object.defineProperty(e, "DidCloseNotebookDocumentNotification", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return T.DidCloseNotebookDocumentNotification;
		}, "get")
	});
	var te = gi();
	Object.defineProperty(e, "InlineCompletionRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return te.InlineCompletionRequest;
		}, "get")
	});
	var E = _i();
	Object.defineProperty(e, "TextDocumentContentRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return E.TextDocumentContentRequest;
		}, "get")
	}), Object.defineProperty(e, "TextDocumentContentRefreshRequest", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return E.TextDocumentContentRefreshRequest;
		}, "get")
	});
	var D;
	(function(e) {
		function t(e) {
			let t = e;
			return o.string(t) || o.string(t.language) || o.string(t.scheme) || je.is(t.pattern);
		}
		P(t, "is"), e.is = t;
	})(D || (e.TextDocumentFilter = D = {}));
	var O;
	(function(e) {
		function t(e) {
			let t = e;
			return o.objectLiteral(t) && (o.string(t.notebookType) || o.string(t.scheme) || o.string(t.pattern));
		}
		P(t, "is"), e.is = t;
	})(O || (e.NotebookDocumentFilter = O = {}));
	var ne;
	(function(e) {
		function t(e) {
			let t = e;
			return o.objectLiteral(t) && (o.string(t.notebook) || O.is(t.notebook)) && (t.language === void 0 || o.string(t.language));
		}
		P(t, "is"), e.is = t;
	})(ne || (e.NotebookCellTextDocumentFilter = ne = {}));
	var k;
	(function(e) {
		function t(e) {
			if (!Array.isArray(e)) return !1;
			for (let t of e) if (!o.string(t) && !D.is(t) && !ne.is(t)) return !1;
			return !0;
		}
		P(t, "is"), e.is = t;
	})(k || (e.DocumentSelector = k = {}));
	var A;
	(function(e) {
		e.method = "client/registerCapability", e.messageDirection = i.MessageDirection.serverToClient, e.type = new i.ProtocolRequestType(e.method);
	})(A || (e.RegistrationRequest = A = {}));
	var re;
	(function(e) {
		e.method = "client/unregisterCapability", e.messageDirection = i.MessageDirection.serverToClient, e.type = new i.ProtocolRequestType(e.method);
	})(re || (e.UnregistrationRequest = re = {}));
	var ie;
	(function(e) {
		e.Create = "create", e.Rename = "rename", e.Delete = "delete";
	})(ie || (e.ResourceOperationKind = ie = {}));
	var ae;
	(function(e) {
		e.Abort = "abort", e.Transactional = "transactional", e.TextOnlyTransactional = "textOnlyTransactional", e.Undo = "undo";
	})(ae || (e.FailureHandlingKind = ae = {}));
	var j;
	(function(e) {
		e.ES2020 = "ES2020";
	})(j || (e.RegularExpressionEngineKind = j = {}));
	var oe;
	(function(e) {
		e.UTF8 = "utf-8", e.UTF16 = "utf-16", e.UTF32 = "utf-32";
	})(oe || (e.PositionEncodingKind = oe = {}));
	var se;
	(function(e) {
		function t(e) {
			let t = e;
			return t && o.string(t.id) && t.id.length > 0;
		}
		P(t, "hasId"), e.hasId = t;
	})(se || (e.StaticRegistrationOptions = se = {}));
	var ce;
	(function(e) {
		function t(e) {
			let t = e;
			return t && (t.documentSelector === null || k.is(t.documentSelector));
		}
		P(t, "is"), e.is = t;
	})(ce || (e.TextDocumentRegistrationOptions = ce = {}));
	var M;
	(function(e) {
		function t(e) {
			let t = e;
			return o.objectLiteral(t) && (t.workDoneProgress === void 0 || o.boolean(t.workDoneProgress));
		}
		P(t, "is"), e.is = t;
		function n(e) {
			let t = e;
			return t && o.boolean(t.workDoneProgress);
		}
		P(n, "hasWorkDoneProgress"), e.hasWorkDoneProgress = n;
	})(M || (e.WorkDoneProgressOptions = M = {}));
	var le;
	(function(e) {
		e.method = "initialize", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.ProtocolRequestType(e.method);
	})(le || (e.InitializeRequest = le = {}));
	var N;
	(function(e) {
		e.unknownProtocolVersion = 1;
	})(N || (e.InitializeErrorCodes = N = {}));
	var ue;
	(function(e) {
		e.method = "initialized", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.ProtocolNotificationType(e.method);
	})(ue || (e.InitializedNotification = ue = {}));
	var de;
	(function(e) {
		e.method = "shutdown", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.ProtocolRequestType0(e.method);
	})(de || (e.ShutdownRequest = de = {}));
	var fe;
	(function(e) {
		e.method = "exit", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.ProtocolNotificationType0(e.method);
	})(fe || (e.ExitNotification = fe = {}));
	var pe;
	(function(e) {
		e.method = "workspace/didChangeConfiguration", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.ProtocolNotificationType(e.method), e.capabilities = i.CM.create("workspace.didChangeConfiguration", void 0);
	})(pe || (e.DidChangeConfigurationNotification = pe = {}));
	var me;
	(function(e) {
		e.Error = 1, e.Warning = 2, e.Info = 3, e.Log = 4, e.Debug = 5;
	})(me || (e.MessageType = me = {}));
	var he;
	(function(e) {
		e.method = "window/showMessage", e.messageDirection = i.MessageDirection.serverToClient, e.type = new i.ProtocolNotificationType(e.method), e.capabilities = i.CM.create("window.showMessage", void 0);
	})(he || (e.ShowMessageNotification = he = {}));
	var ge;
	(function(e) {
		e.method = "window/showMessageRequest", e.messageDirection = i.MessageDirection.serverToClient, e.type = new i.ProtocolRequestType(e.method), e.capabilities = i.CM.create("window.showMessage", void 0);
	})(ge || (e.ShowMessageRequest = ge = {}));
	var _e;
	(function(e) {
		e.method = "window/logMessage", e.messageDirection = i.MessageDirection.serverToClient, e.type = new i.ProtocolNotificationType(e.method);
	})(_e || (e.LogMessageNotification = _e = {}));
	var ve;
	(function(e) {
		e.method = "telemetry/event", e.messageDirection = i.MessageDirection.serverToClient, e.type = new i.ProtocolNotificationType(e.method);
	})(ve || (e.TelemetryEventNotification = ve = {}));
	var ye;
	(function(e) {
		e.None = 0, e.Full = 1, e.Incremental = 2;
	})(ye || (e.TextDocumentSyncKind = ye = {}));
	var be;
	(function(e) {
		e.method = "textDocument/didOpen", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.ProtocolNotificationType(e.method), e.capabilities = i.CM.create("textDocument.synchronization", "textDocumentSync.openClose");
	})(be || (e.DidOpenTextDocumentNotification = be = {}));
	var xe;
	(function(e) {
		function t(e) {
			let t = e;
			return t != null && typeof t.text == "string" && t.range !== void 0 && (t.rangeLength === void 0 || typeof t.rangeLength == "number");
		}
		P(t, "isIncremental"), e.isIncremental = t;
		function n(e) {
			let t = e;
			return t != null && typeof t.text == "string" && t.range === void 0 && t.rangeLength === void 0;
		}
		P(n, "isFull"), e.isFull = n;
	})(xe || (e.TextDocumentContentChangeEvent = xe = {}));
	var Se;
	(function(e) {
		e.method = "textDocument/didChange", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.ProtocolNotificationType(e.method), e.capabilities = i.CM.create("textDocument.synchronization", "textDocumentSync");
	})(Se || (e.DidChangeTextDocumentNotification = Se = {}));
	var Ce;
	(function(e) {
		e.method = "textDocument/didClose", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.ProtocolNotificationType(e.method), e.capabilities = i.CM.create("textDocument.synchronization", "textDocumentSync.openClose");
	})(Ce || (e.DidCloseTextDocumentNotification = Ce = {}));
	var we;
	(function(e) {
		e.method = "textDocument/didSave", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.ProtocolNotificationType(e.method), e.capabilities = i.CM.create("textDocument.synchronization.didSave", "textDocumentSync.save");
	})(we || (e.DidSaveTextDocumentNotification = we = {}));
	var Te;
	(function(e) {
		e.Manual = 1, e.AfterDelay = 2, e.FocusOut = 3;
	})(Te || (e.TextDocumentSaveReason = Te = {}));
	var Ee;
	(function(e) {
		e.method = "textDocument/willSave", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.ProtocolNotificationType(e.method), e.capabilities = i.CM.create("textDocument.synchronization.willSave", "textDocumentSync.willSave");
	})(Ee || (e.WillSaveTextDocumentNotification = Ee = {}));
	var De;
	(function(e) {
		e.method = "textDocument/willSaveWaitUntil", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.ProtocolRequestType(e.method), e.capabilities = i.CM.create("textDocument.synchronization.willSaveWaitUntil", "textDocumentSync.willSaveWaitUntil");
	})(De || (e.WillSaveTextDocumentWaitUntilRequest = De = {}));
	var Oe;
	(function(e) {
		e.method = "workspace/didChangeWatchedFiles", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.ProtocolNotificationType(e.method), e.capabilities = i.CM.create("workspace.didChangeWatchedFiles", void 0);
	})(Oe || (e.DidChangeWatchedFilesNotification = Oe = {}));
	var ke;
	(function(e) {
		e.Created = 1, e.Changed = 2, e.Deleted = 3;
	})(ke || (e.FileChangeType = ke = {}));
	var Ae;
	(function(e) {
		function t(e) {
			let t = e;
			return o.objectLiteral(t) && (a.URI.is(t.baseUri) || a.WorkspaceFolder.is(t.baseUri)) && o.string(t.pattern);
		}
		P(t, "is"), e.is = t;
	})(Ae || (e.RelativePattern = Ae = {}));
	var je;
	(function(e) {
		function t(e) {
			let t = e;
			return o.string(t) || Ae.is(t);
		}
		P(t, "is"), e.is = t;
	})(je || (e.GlobPattern = je = {}));
	var Me;
	(function(e) {
		e.Create = 1, e.Change = 2, e.Delete = 4;
	})(Me || (e.WatchKind = Me = {}));
	var Ne;
	(function(e) {
		e.method = "textDocument/publishDiagnostics", e.messageDirection = i.MessageDirection.serverToClient, e.type = new i.ProtocolNotificationType(e.method), e.capabilities = i.CM.create("textDocument.publishDiagnostics", void 0);
	})(Ne || (e.PublishDiagnosticsNotification = Ne = {}));
	var Pe;
	(function(e) {
		e.Invoked = 1, e.TriggerCharacter = 2, e.TriggerForIncompleteCompletions = 3;
	})(Pe || (e.CompletionTriggerKind = Pe = {}));
	var Fe;
	(function(e) {
		e.method = "textDocument/completion", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.ProtocolRequestType(e.method), e.capabilities = i.CM.create("textDocument.completion", "completionProvider");
	})(Fe || (e.CompletionRequest = Fe = {}));
	var Ie;
	(function(e) {
		e.method = "completionItem/resolve", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.ProtocolRequestType(e.method), e.capabilities = i.CM.create("textDocument.completion.completionItem.resolveSupport", "completionProvider.resolveProvider");
	})(Ie || (e.CompletionResolveRequest = Ie = {}));
	var Le;
	(function(e) {
		e.method = "textDocument/hover", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.ProtocolRequestType(e.method), e.capabilities = i.CM.create("textDocument.hover", "hoverProvider");
	})(Le || (e.HoverRequest = Le = {}));
	var Re;
	(function(e) {
		e.Invoked = 1, e.TriggerCharacter = 2, e.ContentChange = 3;
	})(Re || (e.SignatureHelpTriggerKind = Re = {}));
	var ze;
	(function(e) {
		e.method = "textDocument/signatureHelp", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.ProtocolRequestType(e.method), e.capabilities = i.CM.create("textDocument.signatureHelp", "signatureHelpProvider");
	})(ze || (e.SignatureHelpRequest = ze = {}));
	var Be;
	(function(e) {
		e.method = "textDocument/definition", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.ProtocolRequestType(e.method), e.capabilities = i.CM.create("textDocument.definition", "definitionProvider");
	})(Be || (e.DefinitionRequest = Be = {}));
	var Ve;
	(function(e) {
		e.method = "textDocument/references", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.ProtocolRequestType(e.method), e.capabilities = i.CM.create("textDocument.references", "referencesProvider");
	})(Ve || (e.ReferencesRequest = Ve = {}));
	var He;
	(function(e) {
		e.method = "textDocument/documentHighlight", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.ProtocolRequestType(e.method), e.capabilities = i.CM.create("textDocument.documentHighlight", "documentHighlightProvider");
	})(He || (e.DocumentHighlightRequest = He = {}));
	var Ue;
	(function(e) {
		e.method = "textDocument/documentSymbol", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.ProtocolRequestType(e.method), e.capabilities = i.CM.create("textDocument.documentSymbol", "documentSymbolProvider");
	})(Ue || (e.DocumentSymbolRequest = Ue = {}));
	var We;
	(function(e) {
		e.method = "textDocument/codeAction", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.ProtocolRequestType(e.method), e.capabilities = i.CM.create("textDocument.codeAction", "codeActionProvider");
	})(We || (e.CodeActionRequest = We = {}));
	var Ge;
	(function(e) {
		e.method = "codeAction/resolve", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.ProtocolRequestType(e.method), e.capabilities = i.CM.create("textDocument.codeAction.resolveSupport", "codeActionProvider.resolveProvider");
	})(Ge || (e.CodeActionResolveRequest = Ge = {}));
	var Ke;
	(function(e) {
		e.method = "workspace/symbol", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.ProtocolRequestType(e.method), e.capabilities = i.CM.create("workspace.symbol", "workspaceSymbolProvider");
	})(Ke || (e.WorkspaceSymbolRequest = Ke = {}));
	var qe;
	(function(e) {
		e.method = "workspaceSymbol/resolve", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.ProtocolRequestType(e.method), e.capabilities = i.CM.create("workspace.symbol.resolveSupport", "workspaceSymbolProvider.resolveProvider");
	})(qe || (e.WorkspaceSymbolResolveRequest = qe = {}));
	var Je;
	(function(e) {
		e.method = "textDocument/codeLens", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.ProtocolRequestType(e.method), e.capabilities = i.CM.create("textDocument.codeLens", "codeLensProvider");
	})(Je || (e.CodeLensRequest = Je = {}));
	var Ye;
	(function(e) {
		e.method = "codeLens/resolve", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.ProtocolRequestType(e.method), e.capabilities = i.CM.create("textDocument.codeLens.resolveSupport", "codeLensProvider.resolveProvider");
	})(Ye || (e.CodeLensResolveRequest = Ye = {}));
	var Xe;
	(function(e) {
		e.method = "workspace/codeLens/refresh", e.messageDirection = i.MessageDirection.serverToClient, e.type = new i.ProtocolRequestType0(e.method), e.capabilities = i.CM.create("workspace.codeLens", void 0);
	})(Xe || (e.CodeLensRefreshRequest = Xe = {}));
	var Ze;
	(function(e) {
		e.method = "textDocument/documentLink", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.ProtocolRequestType(e.method), e.capabilities = i.CM.create("textDocument.documentLink", "documentLinkProvider");
	})(Ze || (e.DocumentLinkRequest = Ze = {}));
	var Qe;
	(function(e) {
		e.method = "documentLink/resolve", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.ProtocolRequestType(e.method), e.capabilities = i.CM.create("textDocument.documentLink", "documentLinkProvider.resolveProvider");
	})(Qe || (e.DocumentLinkResolveRequest = Qe = {}));
	var $e;
	(function(e) {
		e.method = "textDocument/formatting", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.ProtocolRequestType(e.method), e.capabilities = i.CM.create("textDocument.formatting", "documentFormattingProvider");
	})($e || (e.DocumentFormattingRequest = $e = {}));
	var et;
	(function(e) {
		e.method = "textDocument/rangeFormatting", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.ProtocolRequestType(e.method), e.capabilities = i.CM.create("textDocument.rangeFormatting", "documentRangeFormattingProvider");
	})(et || (e.DocumentRangeFormattingRequest = et = {}));
	var tt;
	(function(e) {
		e.method = "textDocument/rangesFormatting", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.ProtocolRequestType(e.method), e.capabilities = i.CM.create("textDocument.rangeFormatting.rangesSupport", "documentRangeFormattingProvider.rangesSupport");
	})(tt || (e.DocumentRangesFormattingRequest = tt = {}));
	var nt;
	(function(e) {
		e.method = "textDocument/onTypeFormatting", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.ProtocolRequestType(e.method), e.capabilities = i.CM.create("textDocument.onTypeFormatting", "documentOnTypeFormattingProvider");
	})(nt || (e.DocumentOnTypeFormattingRequest = nt = {}));
	var rt;
	(function(e) {
		e.Identifier = 1;
	})(rt || (e.PrepareSupportDefaultBehavior = rt = {}));
	var it;
	(function(e) {
		e.method = "textDocument/rename", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.ProtocolRequestType(e.method), e.capabilities = i.CM.create("textDocument.rename", "renameProvider");
	})(it || (e.RenameRequest = it = {}));
	var at;
	(function(e) {
		e.method = "textDocument/prepareRename", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.ProtocolRequestType(e.method), e.capabilities = i.CM.create("textDocument.rename.prepareSupport", "renameProvider.prepareProvider");
	})(at || (e.PrepareRenameRequest = at = {}));
	var ot;
	(function(e) {
		e.method = "workspace/executeCommand", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.ProtocolRequestType(e.method), e.capabilities = i.CM.create("workspace.executeCommand", "executeCommandProvider");
	})(ot || (e.ExecuteCommandRequest = ot = {}));
	var st;
	(function(e) {
		e.method = "workspace/applyEdit", e.messageDirection = i.MessageDirection.serverToClient, e.type = new i.ProtocolRequestType("workspace/applyEdit"), e.capabilities = i.CM.create("workspace.applyEdit", void 0);
	})(st || (e.ApplyWorkspaceEditRequest = st = {}));
} }), yi = F({ "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/connection.js"(e) {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.createProtocolConnection = n;
	var t = mn();
	function n(e, n, r, i) {
		return t.ConnectionStrategy.is(i) && (i = { connectionStrategy: i }), (0, t.createMessageConnection)(e, n, r, i);
	}
	P(n, "createProtocolConnection");
} }), bi = F({ "../../node_modules/.pnpm/vscode-languageserver-protocol@3.18.4/node_modules/vscode-languageserver-protocol/lib/common/api.js"(e) {
	var t = e && e.__createBinding || (Object.create ? (function(e, t, n, r) {
		r === void 0 && (r = n);
		var i = Object.getOwnPropertyDescriptor(t, n);
		(!i || ("get" in i ? !t.__esModule : i.writable || i.configurable)) && (i = {
			enumerable: !0,
			get: /* @__PURE__ */ P(function() {
				return t[n];
			}, "get")
		}), Object.defineProperty(e, r, i);
	}) : (function(e, t, n, r) {
		r === void 0 && (r = n), e[r] = t[n];
	})), n = e && e.__exportStar || function(e, n) {
		for (var r in e) r !== "default" && !Object.prototype.hasOwnProperty.call(n, r) && t(n, e, r);
	};
	Object.defineProperty(e, "__esModule", { value: !0 }), e.LSPErrorCodes = e.createProtocolConnection = void 0, n(mn(), e), n((Jr(), $t(hn)), e), n(z(), e), n(vi(), e);
	var r = yi();
	Object.defineProperty(e, "createProtocolConnection", {
		enumerable: !0,
		get: /* @__PURE__ */ P(function() {
			return r.createProtocolConnection;
		}, "get")
	});
	var i;
	(function(e) {
		e.lspReservedErrorRangeStart = -32899, e.RequestFailed = -32803, e.ServerCancelled = -32802, e.ContentModified = -32801, e.RequestCancelled = -32800, e.lspReservedErrorRangeEnd = -32800;
	})(i || (e.LSPErrorCodes = i = {}));
} });
function xi(e) {
	return typeof e == "object" && !!e && typeof e.$type == "string";
}
P(xi, "isAstNode");
function Si(e) {
	return typeof e == "object" && !!e && typeof e.$refText == "string" && "ref" in e;
}
P(Si, "isReference");
function Ci(e) {
	return typeof e == "object" && !!e && typeof e.$refText == "string" && "items" in e;
}
P(Ci, "isMultiReference");
function wi(e) {
	return typeof e == "object" && !!e && typeof e.name == "string" && typeof e.type == "string" && typeof e.path == "string";
}
P(wi, "isAstNodeDescription");
function Ti(e) {
	return typeof e == "object" && !!e && typeof e.info == "object" && typeof e.message == "string";
}
P(Ti, "isLinkingError");
var Ei = (i = class {
	constructor() {
		this.subtypes = {}, this.allSubtypes = {};
	}
	getAllTypes() {
		return Object.keys(this.types);
	}
	getReferenceType(e) {
		let t = this.types[e.container.$type];
		if (!t) throw Error(`Type ${e.container.$type || "undefined"} not found.`);
		let n = t.properties[e.property]?.referenceType;
		if (!n) throw Error(`Property ${e.property || "undefined"} of type ${e.container.$type} is not a reference.`);
		return n;
	}
	getTypeMetaData(e) {
		return this.types[e] || {
			name: e,
			properties: {},
			superTypes: []
		};
	}
	isInstance(e, t) {
		return xi(e) && this.isSubtype(e.$type, t);
	}
	isSubtype(e, t) {
		if (e === t) return !0;
		let n = this.subtypes[e];
		n ||= this.subtypes[e] = {};
		let r = n[t];
		if (r !== void 0) return r;
		{
			let r = this.types[e], i = r ? r.superTypes.some((e) => this.isSubtype(e, t)) : !1;
			return n[t] = i, i;
		}
	}
	getAllSubTypes(e) {
		let t = this.allSubtypes[e];
		if (t) return t;
		{
			let t = this.getAllTypes(), n = [];
			for (let r of t) this.isSubtype(r, e) && n.push(r);
			return this.allSubtypes[e] = n, n;
		}
	}
	isComplete(e) {
		let t = this.getTypeMetaData(e.$type);
		for (let n of Object.keys(t.properties)) {
			let r = t.properties[n];
			if (!r.optional && e[r.name] == null) return !1;
		}
		return !0;
	}
}, P(i, "AbstractAstReflection"), i);
function Di(e) {
	return typeof e == "object" && !!e && Array.isArray(e.content);
}
P(Di, "isCompositeCstNode");
function Oi(e) {
	return typeof e == "object" && !!e && typeof e.tokenType == "object";
}
P(Oi, "isLeafCstNode");
function ki(e) {
	return Di(e) && typeof e.fullText == "string";
}
P(ki, "isRootCstNode");
var Ai = (Vt = Symbol.iterator, a = class e {
	constructor(e, t) {
		this.startFn = e, this.nextFn = t;
	}
	iterator() {
		let e = {
			state: this.startFn(),
			next: /* @__PURE__ */ P(() => this.nextFn(e.state), "next"),
			[Symbol.iterator]: () => e
		};
		return e;
	}
	[Vt]() {
		return this.iterator();
	}
	isEmpty() {
		return !!this.iterator().next().done;
	}
	count() {
		let e = this.iterator(), t = 0, n = e.next();
		for (; !n.done;) t++, n = e.next();
		return t;
	}
	toArray() {
		let e = [], t = this.iterator(), n;
		do
			n = t.next(), n.value !== void 0 && e.push(n.value);
		while (!n.done);
		return e;
	}
	toSet() {
		return new Set(this);
	}
	toMap(e, t) {
		let n = this.map((n) => [e ? e(n) : n, t ? t(n) : n]);
		return new Map(n);
	}
	toString() {
		return this.join();
	}
	concat(t) {
		return new e(() => ({
			first: this.startFn(),
			firstDone: !1,
			iterator: t[Symbol.iterator]()
		}), (e) => {
			let t;
			if (!e.firstDone) {
				do
					if (t = this.nextFn(e.first), !t.done) return t;
				while (!t.done);
				e.firstDone = !0;
			}
			do
				if (t = e.iterator.next(), !t.done) return t;
			while (!t.done);
			return Pi;
		});
	}
	join(e = ",") {
		let t = this.iterator(), n = "", r, i = !1;
		do
			r = t.next(), r.done || (i && (n += e), n += ji(r.value)), i = !0;
		while (!r.done);
		return n;
	}
	indexOf(e, t = 0) {
		let n = this.iterator(), r = 0, i = n.next();
		for (; !i.done;) {
			if (r >= t && i.value === e) return r;
			i = n.next(), r++;
		}
		return -1;
	}
	every(e) {
		let t = this.iterator(), n = t.next();
		for (; !n.done;) {
			if (!e(n.value)) return !1;
			n = t.next();
		}
		return !0;
	}
	some(e) {
		let t = this.iterator(), n = t.next();
		for (; !n.done;) {
			if (e(n.value)) return !0;
			n = t.next();
		}
		return !1;
	}
	forEach(e) {
		let t = this.iterator(), n = 0, r = t.next();
		for (; !r.done;) e(r.value, n), r = t.next(), n++;
	}
	map(t) {
		return new e(this.startFn, (e) => {
			let { done: n, value: r } = this.nextFn(e);
			return n ? Pi : {
				done: !1,
				value: t(r)
			};
		});
	}
	filter(t) {
		return new e(this.startFn, (e) => {
			let n;
			do
				if (n = this.nextFn(e), !n.done && t(n.value)) return n;
			while (!n.done);
			return Pi;
		});
	}
	nonNullable() {
		return this.filter((e) => e != null);
	}
	reduce(e, t) {
		let n = this.iterator(), r = t, i = n.next();
		for (; !i.done;) r = r === void 0 ? i.value : e(r, i.value), i = n.next();
		return r;
	}
	reduceRight(e, t) {
		return this.recursiveReduce(this.iterator(), e, t);
	}
	recursiveReduce(e, t, n) {
		let r = e.next();
		if (r.done) return n;
		let i = this.recursiveReduce(e, t, n);
		return i === void 0 ? r.value : t(i, r.value);
	}
	find(e) {
		let t = this.iterator(), n = t.next();
		for (; !n.done;) {
			if (e(n.value)) return n.value;
			n = t.next();
		}
	}
	findIndex(e) {
		let t = this.iterator(), n = 0, r = t.next();
		for (; !r.done;) {
			if (e(r.value)) return n;
			r = t.next(), n++;
		}
		return -1;
	}
	includes(e) {
		let t = this.iterator(), n = t.next();
		for (; !n.done;) {
			if (n.value === e) return !0;
			n = t.next();
		}
		return !1;
	}
	flatMap(t) {
		return new e(() => ({ this: this.startFn() }), (e) => {
			do {
				if (e.iterator) {
					let t = e.iterator.next();
					if (t.done) e.iterator = void 0;
					else return t;
				}
				let { done: n, value: r } = this.nextFn(e.this);
				if (!n) {
					let n = t(r);
					if (Mi(n)) e.iterator = n[Symbol.iterator]();
					else return {
						done: !1,
						value: n
					};
				}
			} while (e.iterator);
			return Pi;
		});
	}
	flat(t) {
		if (t === void 0 && (t = 1), t <= 0) return this;
		let n = t > 1 ? this.flat(t - 1) : this;
		return new e(() => ({ this: n.startFn() }), (e) => {
			do {
				if (e.iterator) {
					let t = e.iterator.next();
					if (t.done) e.iterator = void 0;
					else return t;
				}
				let { done: t, value: r } = n.nextFn(e.this);
				if (!t) {
					if (Mi(r)) e.iterator = r[Symbol.iterator]();
					else return {
						done: !1,
						value: r
					};
				}
			} while (e.iterator);
			return Pi;
		});
	}
	head() {
		let e = this.iterator().next();
		if (!e.done) return e.value;
	}
	tail(t = 1) {
		return new e(() => {
			let e = this.startFn();
			for (let n = 0; n < t; n++) if (this.nextFn(e).done) return e;
			return e;
		}, this.nextFn);
	}
	limit(t) {
		return new e(() => ({
			size: 0,
			state: this.startFn()
		}), (e) => (e.size++, e.size > t ? Pi : this.nextFn(e.state)));
	}
	distinct(t) {
		return new e(() => ({
			set: /* @__PURE__ */ new Set(),
			internalState: this.startFn()
		}), (e) => {
			let n;
			do
				if (n = this.nextFn(e.internalState), !n.done) {
					let r = t ? t(n.value) : n.value;
					if (!e.set.has(r)) return e.set.add(r), n;
				}
			while (!n.done);
			return Pi;
		});
	}
	exclude(e, t) {
		let n = /* @__PURE__ */ new Set();
		for (let r of e) {
			let e = t ? t(r) : r;
			n.add(e);
		}
		return this.filter((e) => {
			let r = t ? t(e) : e;
			return !n.has(r);
		});
	}
}, P(a, "StreamImpl"), a);
function ji(e) {
	return typeof e == "string" ? e : typeof e > "u" ? "undefined" : typeof e.toString == "function" ? e.toString() : Object.prototype.toString.call(e);
}
P(ji, "toString");
function Mi(e) {
	return !!e && typeof e[Symbol.iterator] == "function";
}
P(Mi, "isIterable");
var Ni = new Ai(() => {}, () => Pi), Pi = Object.freeze({
	done: !0,
	value: void 0
});
function B(...e) {
	if (e.length === 1) {
		let t = e[0];
		if (t instanceof Ai) return t;
		if (Mi(t)) return new Ai(() => t[Symbol.iterator](), (e) => e.next());
		if (typeof t.length == "number") return new Ai(() => ({ index: 0 }), (e) => e.index < t.length ? {
			done: !1,
			value: t[e.index++]
		} : Pi);
	}
	return e.length > 1 ? new Ai(() => ({
		collIndex: 0,
		arrIndex: 0
	}), (t) => {
		do {
			if (t.iterator) {
				let e = t.iterator.next();
				if (!e.done) return e;
				t.iterator = void 0;
			}
			if (t.array) {
				if (t.arrIndex < t.array.length) return {
					done: !1,
					value: t.array[t.arrIndex++]
				};
				t.array = void 0, t.arrIndex = 0;
			}
			if (t.collIndex < e.length) {
				let n = e[t.collIndex++];
				Mi(n) ? t.iterator = n[Symbol.iterator]() : n && typeof n.length == "number" && (t.array = n);
			}
		} while (t.iterator || t.array || t.collIndex < e.length);
		return Pi;
	}) : Ni;
}
P(B, "stream");
var Fi = (o = class extends Ai {
	constructor(e, t, n) {
		super(() => ({
			iterators: n?.includeRoot ? [[e][Symbol.iterator]()] : [t(e)[Symbol.iterator]()],
			pruned: !1
		}), (e) => {
			for (e.pruned &&= (e.iterators.pop(), !1); e.iterators.length > 0;) {
				let n = e.iterators[e.iterators.length - 1].next();
				if (n.done) e.iterators.pop();
				else return e.iterators.push(t(n.value)[Symbol.iterator]()), n;
			}
			return Pi;
		});
	}
	iterator() {
		let e = {
			state: this.startFn(),
			next: /* @__PURE__ */ P(() => this.nextFn(e.state), "next"),
			prune: /* @__PURE__ */ P(() => {
				e.state.pruned = !0;
			}, "prune"),
			[Symbol.iterator]: () => e
		};
		return e;
	}
}, P(o, "TreeStreamImpl"), o), Ii;
(function(e) {
	function t(e) {
		return e.reduce((e, t) => e + t, 0);
	}
	P(t, "sum"), e.sum = t;
	function n(e) {
		return e.reduce((e, t) => e * t, 0);
	}
	P(n, "product"), e.product = n;
	function r(e) {
		return e.reduce((e, t) => Math.min(e, t));
	}
	P(r, "min"), e.min = r;
	function i(e) {
		return e.reduce((e, t) => Math.max(e, t));
	}
	P(i, "max"), e.max = i;
})(Ii ||= {});
function Li(e, t = {}) {
	for (let [n, r] of Object.entries(e)) n.startsWith("$") || (Array.isArray(r) ? r.forEach((r, i) => {
		xi(r) && (r.$container = e, r.$containerProperty = n, r.$containerIndex = i, t.deep && Li(r, t));
	}) : xi(r) && (r.$container = e, r.$containerProperty = n, t.deep && Li(r, t)));
}
P(Li, "linkContentToContainer");
function Ri(e, t) {
	let n = e;
	for (; n;) {
		if (t(n)) return n;
		n = n.$container;
	}
}
P(Ri, "getContainerOfType");
function zi(e) {
	let t = Bi(e).$document;
	if (!t) throw Error("AST node has no document.");
	return t;
}
P(zi, "getDocument");
function Bi(e) {
	for (; e.$container;) e = e.$container;
	return e;
}
P(Bi, "findRootNode");
function Vi(e) {
	return Si(e) ? e.ref ? [e.ref] : [] : Ci(e) ? e.items.map((e) => e.ref) : [];
}
P(Vi, "getReferenceNodes");
function Hi(e, t) {
	if (!e) throw Error("Node must be an AstNode.");
	let n = t?.range;
	return new Ai(() => ({
		keys: Object.keys(e),
		keyIndex: 0,
		arrayIndex: 0
	}), (t) => {
		for (; t.keyIndex < t.keys.length;) {
			let r = t.keys[t.keyIndex];
			if (!r.startsWith("$")) {
				let i = e[r];
				if (xi(i)) {
					if (t.keyIndex++, Gi(i, n)) return {
						done: !1,
						value: i
					};
				} else if (Array.isArray(i)) {
					for (; t.arrayIndex < i.length;) {
						let e = i[t.arrayIndex++];
						if (xi(e) && Gi(e, n)) return {
							done: !1,
							value: e
						};
					}
					t.arrayIndex = 0;
				}
			}
			t.keyIndex++;
		}
		return Pi;
	});
}
P(Hi, "streamContents");
function Ui(e, t) {
	if (!e) throw Error("Root node must be an AstNode.");
	return new Fi(e, (e) => Hi(e, t));
}
P(Ui, "streamAllContents");
function Wi(e, t) {
	if (e) {
		if (t?.range && !Gi(e, t.range)) return new Fi(e, () => []);
	} else throw Error("Root node must be an AstNode.");
	return new Fi(e, (e) => Hi(e, t), { includeRoot: !0 });
}
P(Wi, "streamAst");
function Gi(e, t) {
	if (!t) return !0;
	let n = e.$cstNode?.range;
	return n ? No(n, t) : !1;
}
P(Gi, "isAstNodeInRange");
function Ki(e) {
	return new Ai(() => ({
		keys: Object.keys(e),
		keyIndex: 0,
		arrayIndex: 0
	}), (t) => {
		for (; t.keyIndex < t.keys.length;) {
			let n = t.keys[t.keyIndex];
			if (!n.startsWith("$")) {
				let r = e[n];
				if (Si(r) || Ci(r)) return t.keyIndex++, {
					done: !1,
					value: {
						reference: r,
						container: e,
						property: n
					}
				};
				if (Array.isArray(r)) {
					for (; t.arrayIndex < r.length;) {
						let i = t.arrayIndex++, a = r[i];
						if (Si(a) || Ci(a)) return {
							done: !1,
							value: {
								reference: a,
								container: e,
								property: n,
								index: i
							}
						};
					}
					t.arrayIndex = 0;
				}
			}
			t.keyIndex++;
		}
		return Pi;
	});
}
P(Ki, "streamReferences");
function qi(e, t) {
	let n = e.getTypeMetaData(t.$type), r = t;
	for (let e of Object.values(n.properties)) e.defaultValue !== void 0 && r[e.name] === void 0 && (r[e.name] = Ji(e.defaultValue));
}
P(qi, "assignMandatoryProperties");
function Ji(e) {
	return Array.isArray(e) ? [...e.map(Ji)] : e;
}
P(Ji, "copyDefaultValue");
var Yi = {
	$type: "AbstractElement",
	cardinality: "cardinality"
};
function Xi(e) {
	return V.isInstance(e, Yi.$type);
}
P(Xi, "isAbstractElement");
var Zi = { $type: "AbstractParserRule" };
function Qi(e) {
	return V.isInstance(e, Zi.$type);
}
P(Qi, "isAbstractParserRule");
var $i = { $type: "AbstractRule" }, ea = { $type: "AbstractType" }, ta = {
	$type: "Action",
	cardinality: "cardinality",
	feature: "feature",
	inferredType: "inferredType",
	operator: "operator",
	type: "type"
};
function na(e) {
	return V.isInstance(e, ta.$type);
}
P(na, "isAction");
var ra = {
	$type: "Alternatives",
	cardinality: "cardinality",
	elements: "elements"
};
function ia(e) {
	return V.isInstance(e, ra.$type);
}
P(ia, "isAlternatives");
var aa = {
	$type: "ArrayLiteral",
	elements: "elements"
}, oa = {
	$type: "ArrayType",
	elementType: "elementType"
}, sa = {
	$type: "Assignment",
	cardinality: "cardinality",
	feature: "feature",
	operator: "operator",
	predicate: "predicate",
	terminal: "terminal"
};
function ca(e) {
	return V.isInstance(e, sa.$type);
}
P(ca, "isAssignment");
var la = {
	$type: "BooleanLiteral",
	true: "true"
};
function ua(e) {
	return V.isInstance(e, la.$type);
}
P(ua, "isBooleanLiteral");
var da = {
	$type: "CharacterRange",
	cardinality: "cardinality",
	left: "left",
	lookahead: "lookahead",
	parenthesized: "parenthesized",
	right: "right"
};
function fa(e) {
	return V.isInstance(e, da.$type);
}
P(fa, "isCharacterRange");
var pa = { $type: "Condition" }, ma = {
	$type: "Conjunction",
	left: "left",
	right: "right"
};
function ha(e) {
	return V.isInstance(e, ma.$type);
}
P(ha, "isConjunction");
var ga = {
	$type: "CrossReference",
	cardinality: "cardinality",
	deprecatedSyntax: "deprecatedSyntax",
	isMulti: "isMulti",
	terminal: "terminal",
	type: "type"
};
function _a(e) {
	return V.isInstance(e, ga.$type);
}
P(_a, "isCrossReference");
var va = {
	$type: "Disjunction",
	left: "left",
	right: "right"
};
function ya(e) {
	return V.isInstance(e, va.$type);
}
P(ya, "isDisjunction");
var ba = {
	$type: "EndOfFile",
	cardinality: "cardinality"
};
function xa(e) {
	return V.isInstance(e, ba.$type);
}
P(xa, "isEndOfFile");
var Sa = {
	$type: "Grammar",
	imports: "imports",
	interfaces: "interfaces",
	isDeclared: "isDeclared",
	name: "name",
	rules: "rules",
	types: "types"
}, Ca = {
	$type: "GrammarImport",
	path: "path"
}, wa = {
	$type: "Group",
	cardinality: "cardinality",
	elements: "elements",
	guardCondition: "guardCondition",
	predicate: "predicate"
};
function Ta(e) {
	return V.isInstance(e, wa.$type);
}
P(Ta, "isGroup");
var Ea = {
	$type: "InferredType",
	name: "name"
};
function Da(e) {
	return V.isInstance(e, Ea.$type);
}
P(Da, "isInferredType");
var Oa = {
	$type: "InfixRule",
	call: "call",
	dataType: "dataType",
	inferredType: "inferredType",
	name: "name",
	operators: "operators",
	parameters: "parameters",
	returnType: "returnType"
};
function ka(e) {
	return V.isInstance(e, Oa.$type);
}
P(ka, "isInfixRule");
var Aa = {
	$type: "InfixRuleOperatorList",
	associativity: "associativity",
	operators: "operators"
}, ja = {
	$type: "InfixRuleOperators",
	precedences: "precedences"
}, Ma = {
	$type: "Interface",
	attributes: "attributes",
	name: "name",
	superTypes: "superTypes"
};
function Na(e) {
	return V.isInstance(e, Ma.$type);
}
P(Na, "isInterface");
var Pa = {
	$type: "Keyword",
	cardinality: "cardinality",
	predicate: "predicate",
	value: "value"
};
function Fa(e) {
	return V.isInstance(e, Pa.$type);
}
P(Fa, "isKeyword");
var Ia = {
	$type: "NamedArgument",
	calledByName: "calledByName",
	parameter: "parameter",
	value: "value"
}, La = {
	$type: "NegatedToken",
	cardinality: "cardinality",
	lookahead: "lookahead",
	parenthesized: "parenthesized",
	terminal: "terminal"
};
function Ra(e) {
	return V.isInstance(e, La.$type);
}
P(Ra, "isNegatedToken");
var za = {
	$type: "Negation",
	value: "value"
};
function Ba(e) {
	return V.isInstance(e, za.$type);
}
P(Ba, "isNegation");
var Va = {
	$type: "NumberLiteral",
	value: "value"
}, Ha = {
	$type: "Parameter",
	name: "name"
}, Ua = {
	$type: "ParameterReference",
	parameter: "parameter"
};
function Wa(e) {
	return V.isInstance(e, Ua.$type);
}
P(Wa, "isParameterReference");
var Ga = {
	$type: "ParserRule",
	dataType: "dataType",
	definition: "definition",
	entry: "entry",
	fragment: "fragment",
	inferredType: "inferredType",
	name: "name",
	parameters: "parameters",
	returnType: "returnType"
};
function Ka(e) {
	return V.isInstance(e, Ga.$type);
}
P(Ka, "isParserRule");
var qa = {
	$type: "ReferenceType",
	isMulti: "isMulti",
	referenceType: "referenceType"
}, Ja = {
	$type: "RegexToken",
	cardinality: "cardinality",
	lookahead: "lookahead",
	parenthesized: "parenthesized",
	regex: "regex"
};
function Ya(e) {
	return V.isInstance(e, Ja.$type);
}
P(Ya, "isRegexToken");
var Xa = {
	$type: "ReturnType",
	name: "name"
};
function Za(e) {
	return V.isInstance(e, Xa.$type);
}
P(Za, "isReturnType");
var Qa = {
	$type: "RuleCall",
	arguments: "arguments",
	cardinality: "cardinality",
	predicate: "predicate",
	rule: "rule"
};
function $a(e) {
	return V.isInstance(e, Qa.$type);
}
P($a, "isRuleCall");
var eo = {
	$type: "SimpleType",
	primitiveType: "primitiveType",
	stringType: "stringType",
	typeRef: "typeRef"
};
function to(e) {
	return V.isInstance(e, eo.$type);
}
P(to, "isSimpleType");
var no = {
	$type: "StringLiteral",
	value: "value"
}, ro = {
	$type: "TerminalAlternatives",
	cardinality: "cardinality",
	elements: "elements",
	lookahead: "lookahead",
	parenthesized: "parenthesized"
};
function io(e) {
	return V.isInstance(e, ro.$type);
}
P(io, "isTerminalAlternatives");
var ao = {
	$type: "TerminalElement",
	cardinality: "cardinality",
	lookahead: "lookahead",
	parenthesized: "parenthesized"
}, oo = {
	$type: "TerminalGroup",
	cardinality: "cardinality",
	elements: "elements",
	lookahead: "lookahead",
	parenthesized: "parenthesized"
};
function so(e) {
	return V.isInstance(e, oo.$type);
}
P(so, "isTerminalGroup");
var co = {
	$type: "TerminalRule",
	definition: "definition",
	fragment: "fragment",
	hidden: "hidden",
	name: "name",
	type: "type"
};
function lo(e) {
	return V.isInstance(e, co.$type);
}
P(lo, "isTerminalRule");
var uo = {
	$type: "TerminalRuleCall",
	cardinality: "cardinality",
	lookahead: "lookahead",
	parenthesized: "parenthesized",
	rule: "rule"
};
function fo(e) {
	return V.isInstance(e, uo.$type);
}
P(fo, "isTerminalRuleCall");
var po = {
	$type: "Type",
	name: "name",
	type: "type"
};
function mo(e) {
	return V.isInstance(e, po.$type);
}
P(mo, "isType");
var ho = {
	$type: "TypeAttribute",
	defaultValue: "defaultValue",
	isOptional: "isOptional",
	name: "name",
	type: "type"
}, go = { $type: "TypeDefinition" }, _o = {
	$type: "UnionType",
	types: "types"
}, vo = {
	$type: "UnorderedGroup",
	cardinality: "cardinality",
	elements: "elements"
};
function yo(e) {
	return V.isInstance(e, vo.$type);
}
P(yo, "isUnorderedGroup");
var bo = {
	$type: "UntilToken",
	cardinality: "cardinality",
	lookahead: "lookahead",
	parenthesized: "parenthesized",
	terminal: "terminal"
};
function xo(e) {
	return V.isInstance(e, bo.$type);
}
P(xo, "isUntilToken");
var So = { $type: "ValueLiteral" }, Co = {
	$type: "Wildcard",
	cardinality: "cardinality",
	lookahead: "lookahead",
	parenthesized: "parenthesized"
};
function wo(e) {
	return V.isInstance(e, Co.$type);
}
P(wo, "isWildcard");
var To = (s = class extends Ei {
	constructor() {
		super(...arguments), this.types = {
			AbstractElement: {
				name: Yi.$type,
				properties: { cardinality: {
					name: Yi.cardinality,
					optional: !0
				} },
				superTypes: []
			},
			AbstractParserRule: {
				name: Zi.$type,
				properties: {},
				superTypes: [$i.$type, ea.$type]
			},
			AbstractRule: {
				name: $i.$type,
				properties: {},
				superTypes: []
			},
			AbstractType: {
				name: ea.$type,
				properties: {},
				superTypes: []
			},
			Action: {
				name: ta.$type,
				properties: {
					cardinality: {
						name: ta.cardinality,
						optional: !0
					},
					feature: {
						name: ta.feature,
						optional: !0
					},
					inferredType: {
						name: ta.inferredType,
						optional: !0
					},
					operator: {
						name: ta.operator,
						optional: !0
					},
					type: {
						name: ta.type,
						referenceType: ea.$type,
						optional: !0
					}
				},
				superTypes: [Yi.$type]
			},
			Alternatives: {
				name: ra.$type,
				properties: {
					cardinality: {
						name: ra.cardinality,
						optional: !0
					},
					elements: {
						name: ra.elements,
						defaultValue: []
					}
				},
				superTypes: [Yi.$type]
			},
			ArrayLiteral: {
				name: aa.$type,
				properties: { elements: {
					name: aa.elements,
					defaultValue: []
				} },
				superTypes: [So.$type]
			},
			ArrayType: {
				name: oa.$type,
				properties: { elementType: { name: oa.elementType } },
				superTypes: [go.$type]
			},
			Assignment: {
				name: sa.$type,
				properties: {
					cardinality: {
						name: sa.cardinality,
						optional: !0
					},
					feature: { name: sa.feature },
					operator: { name: sa.operator },
					predicate: {
						name: sa.predicate,
						optional: !0
					},
					terminal: { name: sa.terminal }
				},
				superTypes: [Yi.$type]
			},
			BooleanLiteral: {
				name: la.$type,
				properties: { true: {
					name: la.true,
					defaultValue: !1
				} },
				superTypes: [pa.$type, So.$type]
			},
			CharacterRange: {
				name: da.$type,
				properties: {
					cardinality: {
						name: da.cardinality,
						optional: !0
					},
					left: { name: da.left },
					lookahead: {
						name: da.lookahead,
						optional: !0
					},
					parenthesized: {
						name: da.parenthesized,
						defaultValue: !1,
						optional: !0
					},
					right: {
						name: da.right,
						optional: !0
					}
				},
				superTypes: [ao.$type]
			},
			Condition: {
				name: pa.$type,
				properties: {},
				superTypes: []
			},
			Conjunction: {
				name: ma.$type,
				properties: {
					left: { name: ma.left },
					right: { name: ma.right }
				},
				superTypes: [pa.$type]
			},
			CrossReference: {
				name: ga.$type,
				properties: {
					cardinality: {
						name: ga.cardinality,
						optional: !0
					},
					deprecatedSyntax: {
						name: ga.deprecatedSyntax,
						defaultValue: !1
					},
					isMulti: {
						name: ga.isMulti,
						defaultValue: !1
					},
					terminal: {
						name: ga.terminal,
						optional: !0
					},
					type: {
						name: ga.type,
						referenceType: ea.$type
					}
				},
				superTypes: [Yi.$type]
			},
			Disjunction: {
				name: va.$type,
				properties: {
					left: { name: va.left },
					right: { name: va.right }
				},
				superTypes: [pa.$type]
			},
			EndOfFile: {
				name: ba.$type,
				properties: { cardinality: {
					name: ba.cardinality,
					optional: !0
				} },
				superTypes: [Yi.$type]
			},
			Grammar: {
				name: Sa.$type,
				properties: {
					imports: {
						name: Sa.imports,
						defaultValue: []
					},
					interfaces: {
						name: Sa.interfaces,
						defaultValue: []
					},
					isDeclared: {
						name: Sa.isDeclared,
						defaultValue: !1
					},
					name: {
						name: Sa.name,
						optional: !0
					},
					rules: {
						name: Sa.rules,
						defaultValue: []
					},
					types: {
						name: Sa.types,
						defaultValue: []
					}
				},
				superTypes: []
			},
			GrammarImport: {
				name: Ca.$type,
				properties: { path: { name: Ca.path } },
				superTypes: []
			},
			Group: {
				name: wa.$type,
				properties: {
					cardinality: {
						name: wa.cardinality,
						optional: !0
					},
					elements: {
						name: wa.elements,
						defaultValue: []
					},
					guardCondition: {
						name: wa.guardCondition,
						optional: !0
					},
					predicate: {
						name: wa.predicate,
						optional: !0
					}
				},
				superTypes: [Yi.$type]
			},
			InferredType: {
				name: Ea.$type,
				properties: { name: { name: Ea.name } },
				superTypes: [ea.$type]
			},
			InfixRule: {
				name: Oa.$type,
				properties: {
					call: { name: Oa.call },
					dataType: {
						name: Oa.dataType,
						optional: !0
					},
					inferredType: {
						name: Oa.inferredType,
						optional: !0
					},
					name: { name: Oa.name },
					operators: { name: Oa.operators },
					parameters: {
						name: Oa.parameters,
						defaultValue: []
					},
					returnType: {
						name: Oa.returnType,
						referenceType: ea.$type,
						optional: !0
					}
				},
				superTypes: [Zi.$type]
			},
			InfixRuleOperatorList: {
				name: Aa.$type,
				properties: {
					associativity: {
						name: Aa.associativity,
						optional: !0
					},
					operators: {
						name: Aa.operators,
						defaultValue: []
					}
				},
				superTypes: []
			},
			InfixRuleOperators: {
				name: ja.$type,
				properties: { precedences: {
					name: ja.precedences,
					defaultValue: []
				} },
				superTypes: []
			},
			Interface: {
				name: Ma.$type,
				properties: {
					attributes: {
						name: Ma.attributes,
						defaultValue: []
					},
					name: { name: Ma.name },
					superTypes: {
						name: Ma.superTypes,
						defaultValue: [],
						referenceType: ea.$type
					}
				},
				superTypes: [ea.$type]
			},
			Keyword: {
				name: Pa.$type,
				properties: {
					cardinality: {
						name: Pa.cardinality,
						optional: !0
					},
					predicate: {
						name: Pa.predicate,
						optional: !0
					},
					value: { name: Pa.value }
				},
				superTypes: [Yi.$type]
			},
			NamedArgument: {
				name: Ia.$type,
				properties: {
					calledByName: {
						name: Ia.calledByName,
						defaultValue: !1
					},
					parameter: {
						name: Ia.parameter,
						referenceType: Ha.$type,
						optional: !0
					},
					value: { name: Ia.value }
				},
				superTypes: []
			},
			NegatedToken: {
				name: La.$type,
				properties: {
					cardinality: {
						name: La.cardinality,
						optional: !0
					},
					lookahead: {
						name: La.lookahead,
						optional: !0
					},
					parenthesized: {
						name: La.parenthesized,
						defaultValue: !1,
						optional: !0
					},
					terminal: { name: La.terminal }
				},
				superTypes: [ao.$type]
			},
			Negation: {
				name: za.$type,
				properties: { value: { name: za.value } },
				superTypes: [pa.$type]
			},
			NumberLiteral: {
				name: Va.$type,
				properties: { value: { name: Va.value } },
				superTypes: [So.$type]
			},
			Parameter: {
				name: Ha.$type,
				properties: { name: { name: Ha.name } },
				superTypes: []
			},
			ParameterReference: {
				name: Ua.$type,
				properties: { parameter: {
					name: Ua.parameter,
					referenceType: Ha.$type
				} },
				superTypes: [pa.$type]
			},
			ParserRule: {
				name: Ga.$type,
				properties: {
					dataType: {
						name: Ga.dataType,
						optional: !0
					},
					definition: { name: Ga.definition },
					entry: {
						name: Ga.entry,
						defaultValue: !1
					},
					fragment: {
						name: Ga.fragment,
						defaultValue: !1
					},
					inferredType: {
						name: Ga.inferredType,
						optional: !0
					},
					name: { name: Ga.name },
					parameters: {
						name: Ga.parameters,
						defaultValue: []
					},
					returnType: {
						name: Ga.returnType,
						referenceType: ea.$type,
						optional: !0
					}
				},
				superTypes: [Zi.$type]
			},
			ReferenceType: {
				name: qa.$type,
				properties: {
					isMulti: {
						name: qa.isMulti,
						defaultValue: !1
					},
					referenceType: { name: qa.referenceType }
				},
				superTypes: [go.$type]
			},
			RegexToken: {
				name: Ja.$type,
				properties: {
					cardinality: {
						name: Ja.cardinality,
						optional: !0
					},
					lookahead: {
						name: Ja.lookahead,
						optional: !0
					},
					parenthesized: {
						name: Ja.parenthesized,
						defaultValue: !1,
						optional: !0
					},
					regex: { name: Ja.regex }
				},
				superTypes: [ao.$type]
			},
			ReturnType: {
				name: Xa.$type,
				properties: { name: { name: Xa.name } },
				superTypes: []
			},
			RuleCall: {
				name: Qa.$type,
				properties: {
					arguments: {
						name: Qa.arguments,
						defaultValue: []
					},
					cardinality: {
						name: Qa.cardinality,
						optional: !0
					},
					predicate: {
						name: Qa.predicate,
						optional: !0
					},
					rule: {
						name: Qa.rule,
						referenceType: $i.$type
					}
				},
				superTypes: [Yi.$type]
			},
			SimpleType: {
				name: eo.$type,
				properties: {
					primitiveType: {
						name: eo.primitiveType,
						optional: !0
					},
					stringType: {
						name: eo.stringType,
						optional: !0
					},
					typeRef: {
						name: eo.typeRef,
						referenceType: ea.$type,
						optional: !0
					}
				},
				superTypes: [go.$type]
			},
			StringLiteral: {
				name: no.$type,
				properties: { value: { name: no.value } },
				superTypes: [So.$type]
			},
			TerminalAlternatives: {
				name: ro.$type,
				properties: {
					cardinality: {
						name: ro.cardinality,
						optional: !0
					},
					elements: {
						name: ro.elements,
						defaultValue: []
					},
					lookahead: {
						name: ro.lookahead,
						optional: !0
					},
					parenthesized: {
						name: ro.parenthesized,
						defaultValue: !1,
						optional: !0
					}
				},
				superTypes: [ao.$type]
			},
			TerminalElement: {
				name: ao.$type,
				properties: {
					cardinality: {
						name: ao.cardinality,
						optional: !0
					},
					lookahead: {
						name: ao.lookahead,
						optional: !0
					},
					parenthesized: {
						name: ao.parenthesized,
						defaultValue: !1,
						optional: !0
					}
				},
				superTypes: [Yi.$type]
			},
			TerminalGroup: {
				name: oo.$type,
				properties: {
					cardinality: {
						name: oo.cardinality,
						optional: !0
					},
					elements: {
						name: oo.elements,
						defaultValue: []
					},
					lookahead: {
						name: oo.lookahead,
						optional: !0
					},
					parenthesized: {
						name: oo.parenthesized,
						defaultValue: !1,
						optional: !0
					}
				},
				superTypes: [ao.$type]
			},
			TerminalRule: {
				name: co.$type,
				properties: {
					definition: { name: co.definition },
					fragment: {
						name: co.fragment,
						defaultValue: !1
					},
					hidden: {
						name: co.hidden,
						defaultValue: !1
					},
					name: { name: co.name },
					type: {
						name: co.type,
						optional: !0
					}
				},
				superTypes: [$i.$type]
			},
			TerminalRuleCall: {
				name: uo.$type,
				properties: {
					cardinality: {
						name: uo.cardinality,
						optional: !0
					},
					lookahead: {
						name: uo.lookahead,
						optional: !0
					},
					parenthesized: {
						name: uo.parenthesized,
						defaultValue: !1,
						optional: !0
					},
					rule: {
						name: uo.rule,
						referenceType: co.$type
					}
				},
				superTypes: [ao.$type]
			},
			Type: {
				name: po.$type,
				properties: {
					name: { name: po.name },
					type: { name: po.type }
				},
				superTypes: [ea.$type]
			},
			TypeAttribute: {
				name: ho.$type,
				properties: {
					defaultValue: {
						name: ho.defaultValue,
						optional: !0
					},
					isOptional: {
						name: ho.isOptional,
						defaultValue: !1
					},
					name: { name: ho.name },
					type: { name: ho.type }
				},
				superTypes: []
			},
			TypeDefinition: {
				name: go.$type,
				properties: {},
				superTypes: []
			},
			UnionType: {
				name: _o.$type,
				properties: { types: {
					name: _o.types,
					defaultValue: []
				} },
				superTypes: [go.$type]
			},
			UnorderedGroup: {
				name: vo.$type,
				properties: {
					cardinality: {
						name: vo.cardinality,
						optional: !0
					},
					elements: {
						name: vo.elements,
						defaultValue: []
					}
				},
				superTypes: [Yi.$type]
			},
			UntilToken: {
				name: bo.$type,
				properties: {
					cardinality: {
						name: bo.cardinality,
						optional: !0
					},
					lookahead: {
						name: bo.lookahead,
						optional: !0
					},
					parenthesized: {
						name: bo.parenthesized,
						defaultValue: !1,
						optional: !0
					},
					terminal: { name: bo.terminal }
				},
				superTypes: [ao.$type]
			},
			ValueLiteral: {
				name: So.$type,
				properties: {},
				superTypes: []
			},
			Wildcard: {
				name: Co.$type,
				properties: {
					cardinality: {
						name: Co.cardinality,
						optional: !0
					},
					lookahead: {
						name: Co.lookahead,
						optional: !0
					},
					parenthesized: {
						name: Co.parenthesized,
						defaultValue: !1,
						optional: !0
					}
				},
				superTypes: [ao.$type]
			}
		};
	}
}, P(s, "LangiumGrammarAstReflection"), s), V = new To();
function Eo(e) {
	return new Fi(e, (e) => Di(e) ? e.content : [], { includeRoot: !0 });
}
P(Eo, "streamCst");
function Do(e, t) {
	for (; e.container;) if (e = e.container, e === t) return !0;
	return !1;
}
P(Do, "isChildNode");
function Oo(e) {
	return {
		start: {
			line: e.startLine - 1,
			character: e.startColumn - 1
		},
		end: {
			line: e.endLine - 1,
			character: e.endColumn
		}
	};
}
P(Oo, "tokenToRange");
function ko(e) {
	let { startOffset: t, endOffset: n } = e;
	return typeof t == "number" && Number.isFinite(t) && t >= 0 && typeof n == "number" && Number.isFinite(n) && n >= t;
}
P(ko, "isValidTokenRange");
function Ao(e) {
	if (!e) return;
	let { offset: t, end: n, range: r } = e;
	return {
		range: r,
		offset: t,
		end: n,
		length: n - t
	};
}
P(Ao, "toDocumentSegment");
var jo;
(function(e) {
	e[e.Before = 0] = "Before", e[e.After = 1] = "After", e[e.OverlapFront = 2] = "OverlapFront", e[e.OverlapBack = 3] = "OverlapBack", e[e.Inside = 4] = "Inside", e[e.Outside = 5] = "Outside";
})(jo ||= {});
function Mo(e, t) {
	if (e.end.line < t.start.line || e.end.line === t.start.line && e.end.character <= t.start.character) return jo.Before;
	if (e.start.line > t.end.line || e.start.line === t.end.line && e.start.character >= t.end.character) return jo.After;
	let n = e.start.line > t.start.line || e.start.line === t.start.line && e.start.character >= t.start.character, r = e.end.line < t.end.line || e.end.line === t.end.line && e.end.character <= t.end.character;
	return n && r ? jo.Inside : n ? jo.OverlapBack : r ? jo.OverlapFront : jo.Outside;
}
P(Mo, "compareRange");
function No(e, t) {
	return Mo(e, t) > jo.After;
}
P(No, "inRange");
var Po = /^[\w\p{L}]$/u;
function Fo(e, t) {
	if (e) {
		let n = Lo(e, !0);
		if (n && Io(n, t)) return n;
		if (ki(e)) {
			let n = e.content.findIndex((e) => !e.hidden);
			for (let r = n - 1; r >= 0; r--) {
				let n = e.content[r];
				if (Io(n, t)) return n;
			}
		}
	}
}
P(Fo, "findCommentNode");
function Io(e, t) {
	return Oi(e) && t.includes(e.tokenType.name);
}
P(Io, "isCommentNode");
function Lo(e, t = !0) {
	for (; e.container;) {
		let n = e.container, r = n.content.indexOf(e);
		for (; r > 0;) {
			r--;
			let e = n.content[r];
			if (t || !e.hidden) return e;
		}
		e = n;
	}
}
P(Lo, "getPreviousNode");
var Ro = (c = class extends Error {
	constructor(e, t) {
		let n = typeof t == "string" ? t : t();
		super(e ? `${n} at ${e.range.start.line}:${e.range.start.character}` : n);
	}
}, P(c, "ErrorWithLocation"), c);
function zo(e, t = "Error: Got unexpected value.") {
	throw Error(typeof t == "string" ? t : t());
}
P(zo, "assertUnreachable");
function H(e) {
	return e.charCodeAt(0);
}
P(H, "cc");
function Bo(e, t) {
	Array.isArray(e) ? e.forEach(function(e) {
		t.push(e);
	}) : t.push(e);
}
P(Bo, "insertToSet");
function Vo(e, t) {
	if (e[t] === !0) throw "duplicate flag " + t;
	e[t], e[t] = !0;
}
P(Vo, "addFlag");
function Ho(e) {
	if (e === void 0) throw Error("Internal Error - Should never get here!");
	return !0;
}
P(Ho, "ASSERT_EXISTS");
function Uo() {
	throw Error("Internal Error - Should never get here!");
}
P(Uo, "ASSERT_NEVER_REACH_HERE");
function Wo(e) {
	return e.type === "Character";
}
P(Wo, "isCharacter");
var Go = [];
for (let e = H("0"); e <= H("9"); e++) Go.push(e);
var Ko = [H("_")].concat(Go);
for (let e = H("a"); e <= H("z"); e++) Ko.push(e);
for (let e = H("A"); e <= H("Z"); e++) Ko.push(e);
var qo = [
	H(" "),
	H("\f"),
	H("\n"),
	H("\r"),
	H("	"),
	H("\v"),
	H("	"),
	H("\xA0"),
	H(" "),
	H(" "),
	H(" "),
	H(" "),
	H(" "),
	H(" "),
	H(" "),
	H(" "),
	H(" "),
	H(" "),
	H(" "),
	H(" "),
	H("\u2028"),
	H("\u2029"),
	H(" "),
	H(" "),
	H("　"),
	H("﻿")
], Jo = /[0-9a-fA-F]/, Yo = /[0-9]/, Xo = /[1-9]/, Zo = (l = class {
	constructor() {
		this.idx = 0, this.input = "", this.groupIdx = 0;
	}
	saveState() {
		return {
			idx: this.idx,
			input: this.input,
			groupIdx: this.groupIdx
		};
	}
	restoreState(e) {
		this.idx = e.idx, this.input = e.input, this.groupIdx = e.groupIdx;
	}
	pattern(e) {
		this.idx = 0, this.input = e, this.groupIdx = 0, this.consumeChar("/");
		let t = this.disjunction();
		this.consumeChar("/");
		let n = {
			type: "Flags",
			loc: {
				begin: this.idx,
				end: e.length
			},
			global: !1,
			ignoreCase: !1,
			multiLine: !1,
			unicode: !1,
			sticky: !1
		};
		for (; this.isRegExpFlag();) switch (this.popChar()) {
			case "g":
				Vo(n, "global");
				break;
			case "i":
				Vo(n, "ignoreCase");
				break;
			case "m":
				Vo(n, "multiLine");
				break;
			case "u":
				Vo(n, "unicode");
				break;
			case "y": Vo(n, "sticky");
		}
		if (this.idx !== this.input.length) throw Error("Redundant input: " + this.input.substring(this.idx));
		return {
			type: "Pattern",
			flags: n,
			value: t,
			loc: this.loc(0)
		};
	}
	disjunction() {
		let e = [], t = this.idx;
		for (e.push(this.alternative()); this.peekChar() === "|";) this.consumeChar("|"), e.push(this.alternative());
		return {
			type: "Disjunction",
			value: e,
			loc: this.loc(t)
		};
	}
	alternative() {
		let e = [], t = this.idx;
		for (; this.isTerm();) e.push(this.term());
		return {
			type: "Alternative",
			value: e,
			loc: this.loc(t)
		};
	}
	term() {
		return this.isAssertion() ? this.assertion() : this.atom();
	}
	assertion() {
		let e = this.idx;
		switch (this.popChar()) {
			case "^": return {
				type: "StartAnchor",
				loc: this.loc(e)
			};
			case "$": return {
				type: "EndAnchor",
				loc: this.loc(e)
			};
			case "\\":
				switch (this.popChar()) {
					case "b": return {
						type: "WordBoundary",
						loc: this.loc(e)
					};
					case "B": return {
						type: "NonWordBoundary",
						loc: this.loc(e)
					};
				}
				throw Error("Invalid Assertion Escape");
			case "(":
				this.consumeChar("?");
				let t;
				switch (this.popChar()) {
					case "=":
						t = "Lookahead";
						break;
					case "!":
						t = "NegativeLookahead";
						break;
					case "<": switch (this.popChar()) {
						case "=":
							t = "Lookbehind";
							break;
						case "!": t = "NegativeLookbehind";
					}
				}
				Ho(t);
				let n = this.disjunction();
				return this.consumeChar(")"), {
					type: t,
					value: n,
					loc: this.loc(e)
				};
		}
		return Uo();
	}
	quantifier(e = !1) {
		let t, n = this.idx;
		switch (this.popChar()) {
			case "*":
				t = {
					atLeast: 0,
					atMost: 1 / 0
				};
				break;
			case "+":
				t = {
					atLeast: 1,
					atMost: 1 / 0
				};
				break;
			case "?":
				t = {
					atLeast: 0,
					atMost: 1
				};
				break;
			case "{":
				let n = this.integerIncludingZero();
				switch (this.popChar()) {
					case "}":
						t = {
							atLeast: n,
							atMost: n
						};
						break;
					case ",":
						let e;
						this.isDigit() ? (e = this.integerIncludingZero(), t = {
							atLeast: n,
							atMost: e
						}) : t = {
							atLeast: n,
							atMost: 1 / 0
						}, this.consumeChar("}");
				}
				if (e === !0 && t === void 0) return;
				Ho(t);
		}
		if ((e !== !0 || t !== void 0) && Ho(t)) return this.peekChar(0) === "?" ? (this.consumeChar("?"), t.greedy = !1) : t.greedy = !0, t.type = "Quantifier", t.loc = this.loc(n), t;
	}
	atom() {
		let e, t = this.idx;
		switch (this.peekChar()) {
			case ".":
				e = this.dotAll();
				break;
			case "\\":
				e = this.atomEscape();
				break;
			case "[":
				e = this.characterClass();
				break;
			case "(": e = this.group();
		}
		return e === void 0 && this.isPatternCharacter() && (e = this.patternCharacter()), Ho(e) ? (e.loc = this.loc(t), this.isQuantifier() && (e.quantifier = this.quantifier()), e) : Uo();
	}
	dotAll() {
		return this.consumeChar("."), {
			type: "Set",
			complement: !0,
			value: [
				H("\n"),
				H("\r"),
				H("\u2028"),
				H("\u2029")
			]
		};
	}
	atomEscape() {
		switch (this.consumeChar("\\"), this.peekChar()) {
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9": return this.decimalEscapeAtom();
			case "d":
			case "D":
			case "s":
			case "S":
			case "w":
			case "W": return this.characterClassEscape();
			case "f":
			case "n":
			case "r":
			case "t":
			case "v": return this.controlEscapeAtom();
			case "c": return this.controlLetterEscapeAtom();
			case "0": return this.nulCharacterAtom();
			case "x": return this.hexEscapeSequenceAtom();
			case "u": return this.regExpUnicodeEscapeSequenceAtom();
			default: return this.identityEscapeAtom();
		}
	}
	decimalEscapeAtom() {
		return {
			type: "GroupBackReference",
			value: this.positiveInteger()
		};
	}
	characterClassEscape() {
		let e, t = !1;
		switch (this.popChar()) {
			case "d":
				e = Go;
				break;
			case "D":
				e = Go, t = !0;
				break;
			case "s":
				e = qo;
				break;
			case "S":
				e = qo, t = !0;
				break;
			case "w":
				e = Ko;
				break;
			case "W": e = Ko, t = !0;
		}
		return Ho(e) ? {
			type: "Set",
			value: e,
			complement: t
		} : Uo();
	}
	controlEscapeAtom() {
		let e;
		switch (this.popChar()) {
			case "f":
				e = H("\f");
				break;
			case "n":
				e = H("\n");
				break;
			case "r":
				e = H("\r");
				break;
			case "t":
				e = H("	");
				break;
			case "v": e = H("\v");
		}
		return Ho(e) ? {
			type: "Character",
			value: e
		} : Uo();
	}
	controlLetterEscapeAtom() {
		this.consumeChar("c");
		let e = this.popChar();
		if (/[a-zA-Z]/.test(e) === !1) throw Error("Invalid ");
		return {
			type: "Character",
			value: e.toUpperCase().charCodeAt(0) - 64
		};
	}
	nulCharacterAtom() {
		return this.consumeChar("0"), {
			type: "Character",
			value: H("\0")
		};
	}
	hexEscapeSequenceAtom() {
		return this.consumeChar("x"), this.parseHexDigits(2);
	}
	regExpUnicodeEscapeSequenceAtom() {
		return this.consumeChar("u"), this.parseHexDigits(4);
	}
	identityEscapeAtom() {
		return {
			type: "Character",
			value: H(this.popChar())
		};
	}
	classPatternCharacterAtom() {
		switch (this.peekChar()) {
			// istanbul ignore next
			case "\n":
			// istanbul ignore next
			case "\r":
			// istanbul ignore next
			case "\u2028":
			// istanbul ignore next
			case "\u2029":
			// istanbul ignore next
			case "\\":
			// istanbul ignore next
			case "]": throw Error("TBD");
			default: return {
				type: "Character",
				value: H(this.popChar())
			};
		}
	}
	characterClass() {
		let e = [], t = !1;
		for (this.consumeChar("["), this.peekChar(0) === "^" && (this.consumeChar("^"), t = !0); this.isClassAtom();) {
			let t = this.classAtom();
			if (t.type, Wo(t) && this.isRangeDash()) {
				this.consumeChar("-");
				let n = this.classAtom();
				if (n.type, Wo(n)) {
					if (n.value < t.value) throw Error("Range out of order in character class");
					e.push({
						from: t.value,
						to: n.value
					});
				} else Bo(t.value, e), e.push(H("-")), Bo(n.value, e);
			} else Bo(t.value, e);
		}
		return this.consumeChar("]"), {
			type: "Set",
			complement: t,
			value: e
		};
	}
	classAtom() {
		switch (this.peekChar()) {
			// istanbul ignore next
			case "]":
			// istanbul ignore next
			case "\n":
			// istanbul ignore next
			case "\r":
			// istanbul ignore next
			case "\u2028":
			// istanbul ignore next
			case "\u2029": throw Error("TBD");
			case "\\": return this.classEscape();
			default: return this.classPatternCharacterAtom();
		}
	}
	classEscape() {
		switch (this.consumeChar("\\"), this.peekChar()) {
			case "b": return this.consumeChar("b"), {
				type: "Character",
				value: H("\b")
			};
			case "d":
			case "D":
			case "s":
			case "S":
			case "w":
			case "W": return this.characterClassEscape();
			case "f":
			case "n":
			case "r":
			case "t":
			case "v": return this.controlEscapeAtom();
			case "c": return this.controlLetterEscapeAtom();
			case "0": return this.nulCharacterAtom();
			case "x": return this.hexEscapeSequenceAtom();
			case "u": return this.regExpUnicodeEscapeSequenceAtom();
			default: return this.identityEscapeAtom();
		}
	}
	group() {
		let e = !0;
		this.consumeChar("("), this.peekChar(0) === "?" ? (this.consumeChar("?"), this.consumeChar(":"), e = !1) : this.groupIdx++;
		let t = this.disjunction();
		this.consumeChar(")");
		let n = {
			type: "Group",
			capturing: e,
			value: t
		};
		return e && (n.idx = this.groupIdx), n;
	}
	positiveInteger() {
		let e = this.popChar();
		if (Xo.test(e) === !1) throw Error("Expecting a positive integer");
		for (; Yo.test(this.peekChar(0));) e += this.popChar();
		return parseInt(e, 10);
	}
	integerIncludingZero() {
		let e = this.popChar();
		if (Yo.test(e) === !1) throw Error("Expecting an integer");
		for (; Yo.test(this.peekChar(0));) e += this.popChar();
		return parseInt(e, 10);
	}
	patternCharacter() {
		let e = this.popChar();
		switch (e) {
			// istanbul ignore next
			case "\n":
			// istanbul ignore next
			case "\r":
			// istanbul ignore next
			case "\u2028":
			// istanbul ignore next
			case "\u2029":
			// istanbul ignore next
			case "^":
			// istanbul ignore next
			case "$":
			// istanbul ignore next
			case "\\":
			// istanbul ignore next
			case ".":
			// istanbul ignore next
			case "*":
			// istanbul ignore next
			case "+":
			// istanbul ignore next
			case "?":
			// istanbul ignore next
			case "(":
			// istanbul ignore next
			case ")":
			// istanbul ignore next
			case "[":
			// istanbul ignore next
			case "|": throw Error("TBD");
			default: return {
				type: "Character",
				value: H(e)
			};
		}
	}
	isRegExpFlag() {
		switch (this.peekChar(0)) {
			case "g":
			case "i":
			case "m":
			case "u":
			case "y": return !0;
			default: return !1;
		}
	}
	isRangeDash() {
		return this.peekChar() === "-" && this.isClassAtom(1);
	}
	isDigit() {
		return Yo.test(this.peekChar(0));
	}
	isClassAtom(e = 0) {
		switch (this.peekChar(e)) {
			case "]":
			case "\n":
			case "\r":
			case "\u2028":
			case "\u2029": return !1;
			default: return !0;
		}
	}
	isTerm() {
		return this.isAtom() || this.isAssertion();
	}
	isAtom() {
		if (this.isPatternCharacter()) return !0;
		switch (this.peekChar(0)) {
			case ".":
			case "\\":
			case "[":
			case "(": return !0;
			default: return !1;
		}
	}
	isAssertion() {
		switch (this.peekChar(0)) {
			case "^":
			case "$": return !0;
			case "\\": switch (this.peekChar(1)) {
				case "b":
				case "B": return !0;
				default: return !1;
			}
			case "(": return this.peekChar(1) === "?" && (this.peekChar(2) === "=" || this.peekChar(2) === "!" || this.peekChar(2) === "<" && (this.peekChar(3) === "=" || this.peekChar(3) === "!"));
			default: return !1;
		}
	}
	isQuantifier() {
		let e = this.saveState();
		try {
			return this.quantifier(!0) !== void 0;
		} catch {
			return !1;
		} finally {
			this.restoreState(e);
		}
	}
	isPatternCharacter() {
		switch (this.peekChar()) {
			case "^":
			case "$":
			case "\\":
			case ".":
			case "*":
			case "+":
			case "?":
			case "(":
			case ")":
			case "[":
			case "|":
			case "/":
			case "\n":
			case "\r":
			case "\u2028":
			case "\u2029": return !1;
			default: return !0;
		}
	}
	parseHexDigits(e) {
		let t = "";
		for (let n = 0; n < e; n++) {
			let e = this.popChar();
			if (Jo.test(e) === !1) throw Error("Expecting a HexDecimal digits");
			t += e;
		}
		return {
			type: "Character",
			value: parseInt(t, 16)
		};
	}
	peekChar(e = 0) {
		return this.input[this.idx + e];
	}
	popChar() {
		let e = this.peekChar(0);
		return this.consumeChar(void 0), e;
	}
	consumeChar(e) {
		if (e !== void 0 && this.input[this.idx] !== e) throw Error("Expected: '" + e + "' but found: '" + this.input[this.idx] + "' at offset: " + this.idx);
		if (this.idx >= this.input.length) throw Error("Unexpected end of input");
		this.idx++;
	}
	loc(e) {
		return {
			begin: e,
			end: this.idx
		};
	}
}, P(l, "RegExpParser"), l), Qo = (u = class {
	visitChildren(e) {
		for (let t in e) {
			let n = e[t];
			e.hasOwnProperty(t) && (n.type === void 0 ? Array.isArray(n) && n.forEach((e) => {
				this.visit(e);
			}, this) : this.visit(n));
		}
	}
	visit(e) {
		switch (e.type) {
			case "Pattern":
				this.visitPattern(e);
				break;
			case "Flags":
				this.visitFlags(e);
				break;
			case "Disjunction":
				this.visitDisjunction(e);
				break;
			case "Alternative":
				this.visitAlternative(e);
				break;
			case "StartAnchor":
				this.visitStartAnchor(e);
				break;
			case "EndAnchor":
				this.visitEndAnchor(e);
				break;
			case "WordBoundary":
				this.visitWordBoundary(e);
				break;
			case "NonWordBoundary":
				this.visitNonWordBoundary(e);
				break;
			case "Lookahead":
				this.visitLookahead(e);
				break;
			case "NegativeLookahead":
				this.visitNegativeLookahead(e);
				break;
			case "Lookbehind":
				this.visitLookbehind(e);
				break;
			case "NegativeLookbehind":
				this.visitNegativeLookbehind(e);
				break;
			case "Character":
				this.visitCharacter(e);
				break;
			case "Set":
				this.visitSet(e);
				break;
			case "Group":
				this.visitGroup(e);
				break;
			case "GroupBackReference":
				this.visitGroupBackReference(e);
				break;
			case "Quantifier": this.visitQuantifier(e);
		}
		this.visitChildren(e);
	}
	visitPattern(e) {}
	visitFlags(e) {}
	visitDisjunction(e) {}
	visitAlternative(e) {}
	visitStartAnchor(e) {}
	visitEndAnchor(e) {}
	visitWordBoundary(e) {}
	visitNonWordBoundary(e) {}
	visitLookahead(e) {}
	visitNegativeLookahead(e) {}
	visitLookbehind(e) {}
	visitNegativeLookbehind(e) {}
	visitCharacter(e) {}
	visitSet(e) {}
	visitGroup(e) {}
	visitGroupBackReference(e) {}
	visitQuantifier(e) {}
}, P(u, "BaseRegExpVisitor"), u), $o = /\r?\n/gm, es = new Zo(), ts = new (d = class extends Qo {
	constructor() {
		super(...arguments), this.isStarting = !0, this.endRegexpStack = [], this.multiline = !1;
	}
	get endRegex() {
		return this.endRegexpStack.join("");
	}
	reset(e) {
		this.multiline = !1, this.regex = e, this.startRegexp = "", this.isStarting = !0, this.endRegexpStack = [];
	}
	visitGroup(e) {
		e.quantifier && (this.isStarting = !1, this.endRegexpStack = []);
	}
	visitCharacter(e) {
		let t = String.fromCharCode(e.value);
		if (!this.multiline && t === "\n" && (this.multiline = !0), e.quantifier) this.isStarting = !1, this.endRegexpStack = [];
		else {
			let e = as(t);
			this.endRegexpStack.push(e), this.isStarting && (this.startRegexp += e);
		}
	}
	visitSet(e) {
		if (!this.multiline) {
			let t = this.regex.substring(e.loc.begin, e.loc.end), n = new RegExp(t);
			this.multiline = !!"\n".match(n);
		}
		if (e.quantifier) this.isStarting = !1, this.endRegexpStack = [];
		else {
			let t = this.regex.substring(e.loc.begin, e.loc.end);
			this.endRegexpStack.push(t), this.isStarting && (this.startRegexp += t);
		}
	}
	visitChildren(e) {
		e.type === "Group" && e.quantifier || super.visitChildren(e);
	}
}, P(d, "TerminalRegExpVisitor"), d)();
function ns(e) {
	try {
		return typeof e == "string" && (e = new RegExp(e)), e = e.toString(), ts.reset(e), ts.visit(es.pattern(e)), ts.multiline;
	} catch {
		return !1;
	}
}
P(ns, "isMultilineComment");
var rs = "\f\n\r	\v \xA0            \u2028\u2029  　﻿".split("");
function is(e) {
	let t = typeof e == "string" ? new RegExp(e) : e;
	return rs.some((e) => t.test(e));
}
P(is, "isWhitespace");
function as(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
P(as, "escapeRegExp");
function os(e, t) {
	let n = ss(e), r = t.match(n);
	return !!r && r[0].length > 0;
}
P(os, "partialMatches");
function ss(e) {
	typeof e == "string" && (e = new RegExp(e));
	let t = e, n = e.source, r = 0;
	function i() {
		let e = "", a;
		function o(t) {
			e += n.substr(r, t), r += t;
		}
		P(o, "appendRaw");
		function s(t) {
			e += "(?:" + n.substr(r, t) + "|$)", r += t;
		}
		for (P(s, "appendOptional"); r < n.length;) switch (n[r]) {
			case "\\":
				switch (n[r + 1]) {
					case "c":
						s(3);
						break;
					case "x":
						s(4);
						break;
					case "u":
						t.unicode ? n[r + 2] === "{" ? s(n.indexOf("}", r) - r + 1) : s(6) : s(2);
						break;
					case "p":
					case "P":
						t.unicode ? s(n.indexOf("}", r) - r + 1) : s(2);
						break;
					case "k":
						s(n.indexOf(">", r) - r + 1);
						break;
					default: s(2);
				}
				break;
			case "[":
				a = /\[(?:\\.|.)*?\]/g, a.lastIndex = r, a = a.exec(n) || [], s(a[0].length);
				break;
			case "|":
			case "^":
			case "$":
			case "*":
			case "+":
			case "?":
				o(1);
				break;
			case "{":
				a = /\{\d+,?\d*\}/g, a.lastIndex = r, a = a.exec(n), a ? o(a[0].length) : s(1);
				break;
			case "(":
				if (n[r + 1] === "?") switch (n[r + 2]) {
					case ":":
						e += "(?:", r += 3, e += i() + "|$)";
						break;
					case "=":
						e += "(?=", r += 3, e += i() + ")";
						break;
					case "!":
						a = r, r += 3, i(), e += n.substr(a, r - a);
						break;
					case "<": switch (n[r + 3]) {
						case "=":
						case "!":
							a = r, r += 4, i(), e += n.substr(a, r - a);
							break;
						default: o(n.indexOf(">", r) - r + 1), e += i() + "|$)";
					}
				}
				else o(1), e += i() + "|$)";
				break;
			case ")": return ++r, e;
			default: s(1);
		}
		return e;
	}
	return P(i, "process"), new RegExp(i(), e.flags);
}
P(ss, "partialRegExp");
function cs(e) {
	return e.rules.find((e) => Ka(e) && e.entry);
}
P(cs, "getEntryRule");
function ls(e) {
	return e.rules.filter((e) => lo(e) && e.hidden);
}
P(ls, "getHiddenRules");
function us(e, t) {
	let n = /* @__PURE__ */ new Set(), r = cs(e);
	if (!r) return new Set(e.rules);
	let i = [r].concat(ls(e));
	for (let e of i) ds(e, n, t);
	let a = /* @__PURE__ */ new Set();
	for (let t of e.rules) (n.has(t.name) || lo(t) && t.hidden) && a.add(t);
	return a;
}
P(us, "getAllReachableRules");
function ds(e, t, n) {
	t.add(e.name), Ui(e).forEach((e) => {
		if ($a(e) || n && fo(e)) {
			let r = e.rule.ref;
			r && !t.has(r.name) && ds(r, t, n);
		}
	});
}
P(ds, "ruleDfs");
function fs(e) {
	if (e.terminal) return e.terminal;
	if (e.type.ref) return bs(e.type.ref)?.terminal;
}
P(fs, "getCrossReferenceTerminal");
function ps(e) {
	return e.hidden && !is(Os(e));
}
P(ps, "isCommentTerminal");
function ms(e, t) {
	return !e || !t ? [] : gs(e, t, e.astNode, !0);
}
P(ms, "findNodesForProperty");
function hs(e, t, n) {
	if (!e || !t) return;
	let r = gs(e, t, e.astNode, !0);
	if (r.length !== 0) return n = n === void 0 ? 0 : Math.max(0, Math.min(n, r.length - 1)), r[n];
}
P(hs, "findNodeForProperty");
function gs(e, t, n, r) {
	if (!r) {
		let n = Ri(e.grammarSource, ca);
		if (n && n.feature === t) return [e];
	}
	return Di(e) && e.astNode === n ? e.content.flatMap((e) => gs(e, t, n, !1)) : [];
}
P(gs, "findNodesForPropertyInternal");
function _s(e, t, n) {
	if (!e) return;
	let r = vs(e, t, e?.astNode);
	if (r.length !== 0) return n = n === void 0 ? 0 : Math.max(0, Math.min(n, r.length - 1)), r[n];
}
P(_s, "findNodeForKeyword");
function vs(e, t, n) {
	if (e.astNode !== n) return [];
	if (Fa(e.grammarSource) && e.grammarSource.value === t) return [e];
	let r = Eo(e).iterator(), i, a = [];
	do
		if (i = r.next(), !i.done) {
			let e = i.value;
			e.astNode === n ? Fa(e.grammarSource) && e.grammarSource.value === t && a.push(e) : r.prune();
		}
	while (!i.done);
	return a;
}
P(vs, "findNodesForKeywordInternal");
function ys(e) {
	let t = e.astNode;
	for (; t === e.container?.astNode;) {
		let t = Ri(e.grammarSource, ca);
		if (t) return t;
		e = e.container;
	}
}
P(ys, "findAssignment");
function bs(e) {
	let t = e;
	return Da(t) && (na(t.$container) ? t = t.$container.$container : Qi(t.$container) ? t = t.$container : zo(t.$container)), xs(e, t, /* @__PURE__ */ new Map());
}
P(bs, "findNameAssignment");
function xs(e, t, n) {
	function r(t, r) {
		let i;
		return Ri(t, ca) || (i = xs(r, r, n)), n.set(e, i), i;
	}
	if (P(r, "go"), n.has(e)) return n.get(e);
	n.set(e, void 0);
	for (let i of Ui(t)) {
		if (ca(i) && i.feature.toLowerCase() === "name") return n.set(e, i), i;
		if ($a(i) && Ka(i.rule.ref)) return r(i, i.rule.ref);
		if (to(i) && i.typeRef?.ref) return r(i, i.typeRef.ref);
	}
}
P(xs, "findNameAssignmentInternal");
function Ss(e) {
	return Cs(e, /* @__PURE__ */ new Set());
}
P(Ss, "isDataTypeRule");
function Cs(e, t) {
	if (t.has(e)) return !0;
	t.add(e);
	for (let n of Ui(e)) if ($a(n)) {
		if (!n.rule.ref || Ka(n.rule.ref) && !Cs(n.rule.ref, t) || ka(n.rule.ref)) return !1;
	} else if (ca(n) || na(n)) return !1;
	return !!e.definition;
}
P(Cs, "isDataTypeRuleInternal");
function ws(e) {
	if (!lo(e)) {
		if (e.inferredType) return e.inferredType.name;
		if (e.dataType) return e.dataType;
		if (e.returnType) {
			let t = e.returnType.ref;
			if (t) return t.name;
		}
	}
}
P(ws, "getExplicitRuleType");
function Ts(e) {
	if (Qi(e)) return Ka(e) && Ss(e) ? e.name : ws(e) ?? e.name;
	if (Na(e) || mo(e) || Za(e)) return e.name;
	if (na(e)) {
		let t = Es(e);
		if (t) return t;
	} else if (Da(e)) return e.name;
	throw Error("Cannot get name of Unknown Type");
}
P(Ts, "getTypeName");
function Es(e) {
	if (e.inferredType) return e.inferredType.name;
	if (e.type?.ref) return Ts(e.type.ref);
}
P(Es, "getActionType");
function Ds(e) {
	return lo(e) ? e.type?.name ?? "string" : ws(e) ?? e.name;
}
P(Ds, "getRuleType");
function Os(e) {
	let t = {
		s: !1,
		i: !1,
		u: !1
	}, n = As(e.definition, t), r = Object.entries(t).filter(([, e]) => e).map(([e]) => e).join("");
	return new RegExp(n, r);
}
P(Os, "terminalRegex");
var ks = "[\\s\\S]";
function As(e, t) {
	if (io(e)) return js(e);
	if (so(e)) return Ms(e);
	if (fa(e)) return Fs(e);
	if (fo(e)) {
		let t = e.rule.ref;
		if (!t) throw Error("Missing rule reference.");
		return Ls(As(t.definition), {
			cardinality: e.cardinality,
			lookahead: e.lookahead,
			parenthesized: e.parenthesized
		});
	}
	if (Ra(e)) return Ps(e);
	if (xo(e)) return Ns(e);
	if (Ya(e)) {
		let n = e.regex.lastIndexOf("/"), r = e.regex.substring(1, n), i = e.regex.substring(n + 1);
		return t && (t.i = i.includes("i"), t.s = i.includes("s"), t.u = i.includes("u")), Ls(r, {
			cardinality: e.cardinality,
			lookahead: e.lookahead,
			parenthesized: e.parenthesized,
			wrap: !1
		});
	}
	if (wo(e)) return Ls(ks, {
		cardinality: e.cardinality,
		lookahead: e.lookahead,
		parenthesized: e.parenthesized
	});
	throw Error(`Invalid terminal element: ${e?.$type}, ${e?.$cstNode?.text}`);
}
P(As, "abstractElementToRegex");
function js(e) {
	return Ls(e.elements.map((e) => As(e)).join("|"), {
		cardinality: e.cardinality,
		lookahead: e.lookahead,
		parenthesized: e.parenthesized,
		wrap: !1
	});
}
P(js, "terminalAlternativesToRegex");
function Ms(e) {
	return Ls(e.elements.map((e) => As(e)).join(""), {
		cardinality: e.cardinality,
		lookahead: e.lookahead,
		parenthesized: e.parenthesized,
		wrap: !1
	});
}
P(Ms, "terminalGroupToRegex");
function Ns(e) {
	return Ls(`${ks}*?${As(e.terminal)}`, {
		cardinality: e.cardinality,
		lookahead: e.lookahead,
		parenthesized: e.parenthesized
	});
}
P(Ns, "untilTokenToRegex");
function Ps(e) {
	return Ls(`(?!${As(e.terminal)})${ks}*?`, {
		cardinality: e.cardinality,
		lookahead: e.lookahead,
		parenthesized: e.parenthesized
	});
}
P(Ps, "negateTokenToRegex");
function Fs(e) {
	return e.right ? Ls(`[${Is(e.left)}-${Is(e.right)}]`, {
		cardinality: e.cardinality,
		lookahead: e.lookahead,
		parenthesized: e.parenthesized,
		wrap: !1
	}) : Ls(Is(e.left), {
		cardinality: e.cardinality,
		lookahead: e.lookahead,
		parenthesized: e.parenthesized,
		wrap: !1
	});
}
P(Fs, "characterRangeToRegex");
function Is(e) {
	return as(e.value);
}
P(Is, "keywordToRegex");
function Ls(e, t) {
	return (t.parenthesized || t.lookahead || t.wrap !== !1) && (e = `(${t.lookahead ?? (t.parenthesized ? "" : "?:")}${e})`), t.cardinality ? `${e}${t.cardinality}` : e;
}
P(Ls, "withCardinality");
function Rs(e) {
	let t = [], n = e.Grammar;
	for (let e of n.rules) lo(e) && ps(e) && ns(Os(e)) && t.push(e.name);
	return {
		multilineCommentRules: t,
		nameRegexp: Po
	};
}
P(Rs, "createGrammarConfig");
function zs(e) {
	console && console.error && console.error(`Error: ${e}`);
}
P(zs, "PRINT_ERROR");
function Bs(e) {
	console && console.warn && console.warn(`Warning: ${e}`);
}
P(Bs, "PRINT_WARNING");
function Vs(e) {
	let t = (/* @__PURE__ */ new Date()).getTime(), n = e();
	return {
		time: (/* @__PURE__ */ new Date()).getTime() - t,
		value: n
	};
}
P(Vs, "timer");
function Hs(e) {
	function t() {}
	P(t, "FakeConstructor"), t.prototype = e;
	let n = new t();
	function r() {
		return typeof n.bar;
	}
	return P(r, "fakeAccess"), r(), r(), e;
}
P(Hs, "toFastProperties");
function Us(e) {
	return Ws(e) ? e.LABEL : e.name;
}
P(Us, "tokenLabel");
function Ws(e) {
	return typeof e.LABEL == "string" && e.LABEL !== "";
}
P(Ws, "hasTokenLabel");
var Gs = (f = class {
	get definition() {
		return this._definition;
	}
	set definition(e) {
		this._definition = e;
	}
	constructor(e) {
		this._definition = e;
	}
	accept(e) {
		e.visit(this), this.definition.forEach((t) => {
			t.accept(e);
		});
	}
}, P(f, "AbstractProduction"), f), Ks = (p = class extends Gs {
	constructor(e) {
		super([]), this.idx = 1, Object.assign(this, nc(e));
	}
	set definition(e) {}
	get definition() {
		return this.referencedRule === void 0 ? [] : this.referencedRule.definition;
	}
	accept(e) {
		e.visit(this);
	}
}, P(p, "NonTerminal"), p), qs = (m = class extends Gs {
	constructor(e) {
		super(e.definition), this.orgText = "", Object.assign(this, nc(e));
	}
}, P(m, "Rule"), m), Js = (h = class extends Gs {
	constructor(e) {
		super(e.definition), this.ignoreAmbiguities = !1, Object.assign(this, nc(e));
	}
}, P(h, "Alternative"), h), Ys = (g = class extends Gs {
	constructor(e) {
		super(e.definition), this.idx = 1, Object.assign(this, nc(e));
	}
}, P(g, "Option"), g), Xs = (_ = class extends Gs {
	constructor(e) {
		super(e.definition), this.idx = 1, Object.assign(this, nc(e));
	}
}, P(_, "RepetitionMandatory"), _), Zs = (v = class extends Gs {
	constructor(e) {
		super(e.definition), this.idx = 1, Object.assign(this, nc(e));
	}
}, P(v, "RepetitionMandatoryWithSeparator"), v), U = (y = class extends Gs {
	constructor(e) {
		super(e.definition), this.idx = 1, Object.assign(this, nc(e));
	}
}, P(y, "Repetition"), y), Qs = (b = class extends Gs {
	constructor(e) {
		super(e.definition), this.idx = 1, Object.assign(this, nc(e));
	}
}, P(b, "RepetitionWithSeparator"), b), $s = (x = class extends Gs {
	get definition() {
		return this._definition;
	}
	set definition(e) {
		this._definition = e;
	}
	constructor(e) {
		super(e.definition), this.idx = 1, this.ignoreAmbiguities = !1, this.hasPredicates = !1, Object.assign(this, nc(e));
	}
}, P(x, "Alternation"), x), W = (S = class {
	constructor(e) {
		this.idx = 1, Object.assign(this, nc(e));
	}
	accept(e) {
		e.visit(this);
	}
}, P(S, "Terminal"), S);
function ec(e) {
	return e.map(tc);
}
P(ec, "serializeGrammar");
function tc(e) {
	function t(e) {
		return e.map(tc);
	}
	if (P(t, "convertDefinition"), e instanceof Ks) {
		let t = {
			type: "NonTerminal",
			name: e.nonTerminalName,
			idx: e.idx
		};
		return typeof e.label == "string" && (t.label = e.label), t;
	}
	if (e instanceof Js) return {
		type: "Alternative",
		definition: t(e.definition)
	};
	if (e instanceof Ys) return {
		type: "Option",
		idx: e.idx,
		definition: t(e.definition)
	};
	if (e instanceof Xs) return {
		type: "RepetitionMandatory",
		idx: e.idx,
		definition: t(e.definition)
	};
	if (e instanceof Zs) return {
		type: "RepetitionMandatoryWithSeparator",
		idx: e.idx,
		separator: tc(new W({ terminalType: e.separator })),
		definition: t(e.definition)
	};
	if (e instanceof Qs) return {
		type: "RepetitionWithSeparator",
		idx: e.idx,
		separator: tc(new W({ terminalType: e.separator })),
		definition: t(e.definition)
	};
	if (e instanceof U) return {
		type: "Repetition",
		idx: e.idx,
		definition: t(e.definition)
	};
	if (e instanceof $s) return {
		type: "Alternation",
		idx: e.idx,
		definition: t(e.definition)
	};
	if (e instanceof W) {
		let t = {
			type: "Terminal",
			name: e.terminalType.name,
			label: Us(e.terminalType),
			idx: e.idx
		};
		typeof e.label == "string" && (t.terminalLabel = e.label);
		let n = e.terminalType.PATTERN;
		return e.terminalType.PATTERN && (t.pattern = n instanceof RegExp ? n.source : n), t;
	}
	if (e instanceof qs) return {
		type: "Rule",
		name: e.name,
		orgText: e.orgText,
		definition: t(e.definition)
	};
	throw Error("non exhaustive match");
}
P(tc, "serializeProduction");
function nc(e) {
	return Object.fromEntries(Object.entries(e).filter(([, e]) => e !== void 0));
}
P(nc, "pickOnlyDefined");
var rc = (C = class {
	visit(e) {
		let t = e;
		switch (t.constructor) {
			case Ks: return this.visitNonTerminal(t);
			case Js: return this.visitAlternative(t);
			case Ys: return this.visitOption(t);
			case Xs: return this.visitRepetitionMandatory(t);
			case Zs: return this.visitRepetitionMandatoryWithSeparator(t);
			case Qs: return this.visitRepetitionWithSeparator(t);
			case U: return this.visitRepetition(t);
			case $s: return this.visitAlternation(t);
			case W: return this.visitTerminal(t);
			case qs: return this.visitRule(t);
			/* c8 ignore next 2 */
			default: throw Error("non exhaustive match");
		}
	}
	/* c8 ignore next */
	visitNonTerminal(e) {}
	/* c8 ignore next */
	visitAlternative(e) {}
	/* c8 ignore next */
	visitOption(e) {}
	/* c8 ignore next */
	visitRepetition(e) {}
	/* c8 ignore next */
	visitRepetitionMandatory(e) {}
	/* c8 ignore next 3 */
	visitRepetitionMandatoryWithSeparator(e) {}
	/* c8 ignore next */
	visitRepetitionWithSeparator(e) {}
	/* c8 ignore next */
	visitAlternation(e) {}
	/* c8 ignore next */
	visitTerminal(e) {}
	/* c8 ignore next */
	visitRule(e) {}
}, P(C, "GAstVisitor"), C);
function ic(e) {
	return e instanceof Js || e instanceof Ys || e instanceof U || e instanceof Xs || e instanceof Zs || e instanceof Qs || e instanceof W || e instanceof qs;
}
P(ic, "isSequenceProd");
function ac(e, t = []) {
	return e instanceof Ys || e instanceof U || e instanceof Qs ? !0 : e instanceof $s ? e.definition.some((e) => ac(e, t)) : e instanceof Ks && t.includes(e) ? !1 : e instanceof Gs && (e instanceof Ks && t.push(e), e.definition.every((e) => ac(e, t)));
}
P(ac, "isOptionalProd");
function oc(e) {
	return e instanceof $s;
}
P(oc, "isBranchingProd");
function sc(e) {
	if (e instanceof Ks) return "SUBRULE";
	if (e instanceof Ys) return "OPTION";
	if (e instanceof $s) return "OR";
	if (e instanceof Xs) return "AT_LEAST_ONE";
	if (e instanceof Zs) return "AT_LEAST_ONE_SEP";
	if (e instanceof Qs) return "MANY_SEP";
	if (e instanceof U) return "MANY";
	if (e instanceof W) return "CONSUME";
	throw Error("non exhaustive match");
}
P(sc, "getProductionDslName");
var cc = (ee = class {
	walk(e, t = []) {
		e.definition.forEach((n, r) => {
			let i = e.definition.slice(r + 1);
			if (n instanceof Ks) this.walkProdRef(n, i, t);
			else if (n instanceof W) this.walkTerminal(n, i, t);
			else if (n instanceof Js) this.walkFlat(n, i, t);
			else if (n instanceof Ys) this.walkOption(n, i, t);
			else if (n instanceof Xs) this.walkAtLeastOne(n, i, t);
			else if (n instanceof Zs) this.walkAtLeastOneSep(n, i, t);
			else if (n instanceof Qs) this.walkManySep(n, i, t);
			else if (n instanceof U) this.walkMany(n, i, t);
			else if (n instanceof $s) this.walkOr(n, i, t);
			else throw Error("non exhaustive match");
		});
	}
	walkTerminal(e, t, n) {}
	walkProdRef(e, t, n) {}
	walkFlat(e, t, n) {
		let r = t.concat(n);
		this.walk(e, r);
	}
	walkOption(e, t, n) {
		let r = t.concat(n);
		this.walk(e, r);
	}
	walkAtLeastOne(e, t, n) {
		let r = [new Ys({ definition: e.definition })].concat(t, n);
		this.walk(e, r);
	}
	walkAtLeastOneSep(e, t, n) {
		let r = lc(e, t, n);
		this.walk(e, r);
	}
	walkMany(e, t, n) {
		let r = [new Ys({ definition: e.definition })].concat(t, n);
		this.walk(e, r);
	}
	walkManySep(e, t, n) {
		let r = lc(e, t, n);
		this.walk(e, r);
	}
	walkOr(e, t, n) {
		let r = t.concat(n);
		e.definition.forEach((e) => {
			let t = new Js({ definition: [e] });
			this.walk(t, r);
		});
	}
}, P(ee, "RestWalker"), ee);
function lc(e, t, n) {
	return [new Ys({ definition: [new W({ terminalType: e.separator })].concat(e.definition) })].concat(t, n);
}
P(lc, "restForRepetitionWithSeparator");
function uc(e) {
	if (e instanceof Ks) return uc(e.referencedRule);
	if (e instanceof W) return pc(e);
	if (ic(e)) return dc(e);
	if (oc(e)) return fc(e);
	throw Error("non exhaustive match");
}
P(uc, "first");
function dc(e) {
	let t = [], n = e.definition, r = 0, i = n.length > r, a, o = !0;
	for (; i && o;) a = n[r], o = ac(a), t = t.concat(uc(a)), r += 1, i = n.length > r;
	return [...new Set(t)];
}
P(dc, "firstForSequence");
function fc(e) {
	let t = e.definition.map((e) => uc(e));
	return [...new Set(t.flat())];
}
P(fc, "firstForBranching");
function pc(e) {
	return [e.terminalType];
}
P(pc, "firstForTerminal");
var mc = "_~IN~_", hc = (w = class extends cc {
	constructor(e) {
		super(), this.topProd = e, this.follows = {};
	}
	startWalking() {
		return this.walk(this.topProd), this.follows;
	}
	walkTerminal(e, t, n) {}
	walkProdRef(e, t, n) {
		let r = _c(e.referencedRule, e.idx) + this.topProd.name, i = uc(new Js({ definition: t.concat(n) }));
		this.follows[r] = i;
	}
}, P(w, "ResyncFollowsWalker"), w);
function gc(e) {
	let t = {};
	return e.forEach((e) => {
		let n = new hc(e).startWalking();
		Object.assign(t, n);
	}), t;
}
P(gc, "computeAllProdsFollows");
function _c(e, t) {
	return e.name + t + mc;
}
P(_c, "buildBetweenProdsFollowPrefix");
var vc = {}, yc = new Zo();
function bc(e) {
	let t = e.toString();
	if (vc.hasOwnProperty(t)) return vc[t];
	{
		let e = yc.pattern(t);
		return vc[t] = e, e;
	}
}
P(bc, "getRegExpAst");
function xc() {
	vc = {};
}
P(xc, "clearRegExpParserCache");
var Sc = "Complement Sets are not supported for first char optimization", Cc = "Unable to use \"first char\" lexer optimizations:\n";
function wc(e, t = !1) {
	try {
		let t = bc(e);
		return Tc(t.value, {}, t.flags.ignoreCase);
	} catch (n) {
		if (n.message === Sc) t && Bs(`${Cc}	Unable to optimize: < ${e.toString()} >
	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);
		else {
			let n = "";
			t && (n = "\n	This will disable the lexer's first char optimizations.\n	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details."), zs(`${Cc}
	Failed parsing: < ${e.toString()} >
	Using the @chevrotain/regexp-to-ast library
	Please open an issue at: https://github.com/chevrotain/chevrotain/issues` + n);
		}
	}
	return [];
}
P(wc, "getOptimizedStartCodesIndices");
function Tc(e, t, n) {
	switch (e.type) {
		case "Disjunction":
			for (let r = 0; r < e.value.length; r++) Tc(e.value[r], t, n);
			break;
		case "Alternative":
			let r = e.value;
			for (let e = 0; e < r.length; e++) {
				let i = r[e];
				switch (i.type) {
					case "EndAnchor":
					case "GroupBackReference":
					case "Lookahead":
					case "NegativeLookahead":
					case "Lookbehind":
					case "NegativeLookbehind":
					case "StartAnchor":
					case "WordBoundary":
					case "NonWordBoundary": continue;
				}
				let a = i;
				switch (a.type) {
					case "Character":
						Ec(a.value, t, n);
						break;
					case "Set":
						if (a.complement === !0) throw Error(Sc);
						a.value.forEach((e) => {
							if (typeof e == "number") Ec(e, t, n);
							else {
								let r = e;
								if (n === !0) for (let e = r.from; e <= r.to; e++) Ec(e, t, n);
								else {
									for (let e = r.from; e <= r.to && e < ml; e++) Ec(e, t, n);
									if (r.to >= ml) {
										let e = r.from >= ml ? r.from : ml, n = r.to, i = gl(e), a = gl(n);
										for (let e = i; e <= a; e++) t[e] = e;
									}
								}
							}
						});
						break;
					case "Group":
						Tc(a.value, t, n);
						break;
					/* istanbul ignore next */
					default: throw Error("Non Exhaustive Match");
				}
				let o = a.quantifier !== void 0 && a.quantifier.atLeast === 0;
				if (a.type === "Group" && kc(a) === !1 || a.type !== "Group" && o === !1) break;
			}
			break;
		/* istanbul ignore next */
		default: throw Error("non exhaustive match!");
	}
	return Object.values(t);
}
P(Tc, "firstCharOptimizedIndices");
function Ec(e, t, n) {
	let r = gl(e);
	t[r] = r, n === !0 && Dc(e, t);
}
P(Ec, "addOptimizedIdxToResult");
function Dc(e, t) {
	let n = String.fromCharCode(e), r = n.toUpperCase();
	if (r !== n) {
		let e = gl(r.charCodeAt(0));
		t[e] = e;
	} else {
		let e = n.toLowerCase();
		if (e !== n) {
			let n = gl(e.charCodeAt(0));
			t[n] = n;
		}
	}
}
P(Dc, "handleIgnoreCase");
function Oc(e, t) {
	return e.value.find((e) => {
		if (typeof e == "number") return t.includes(e);
		{
			let n = e;
			return t.find((e) => n.from <= e && e <= n.to) !== void 0;
		}
	});
}
P(Oc, "findCode");
function kc(e) {
	let t = e.quantifier;
	return t && t.atLeast === 0 ? !0 : e.value ? Array.isArray(e.value) ? e.value.every(kc) : kc(e.value) : !1;
}
P(kc, "isWholeOptional");
var Ac = (T = class extends Qo {
	constructor(e) {
		super(), this.targetCharCodes = e, this.found = !1;
	}
	visitChildren(e) {
		if (this.found !== !0) {
			switch (e.type) {
				case "Lookahead":
					this.visitLookahead(e);
					return;
				case "NegativeLookahead":
					this.visitNegativeLookahead(e);
					return;
				case "Lookbehind":
					this.visitLookbehind(e);
					return;
				case "NegativeLookbehind":
					this.visitNegativeLookbehind(e);
					return;
			}
			super.visitChildren(e);
		}
	}
	visitCharacter(e) {
		this.targetCharCodes.includes(e.value) && (this.found = !0);
	}
	visitSet(e) {
		e.complement ? Oc(e, this.targetCharCodes) === void 0 && (this.found = !0) : Oc(e, this.targetCharCodes) !== void 0 && (this.found = !0);
	}
}, P(T, "CharCodeFinder"), T);
function jc(e, t) {
	if (t instanceof RegExp) {
		let n = bc(t), r = new Ac(e);
		return r.visit(n), r.found;
	}
	for (let n of t) {
		let t = n.charCodeAt(0);
		if (e.includes(t)) return !0;
	}
	return !1;
}
P(jc, "canMatchCharCode");
var Mc = "PATTERN", Nc = "defaultMode", Pc = "modes", Fc = 0, Ic = 1, Lc = 2, Rc = 3;
function zc(e, t) {
	t = Object.assign({
		safeMode: !1,
		positionTracking: "full",
		lineTerminatorCharacters: ["\r", "\n"],
		tracer: /* @__PURE__ */ P((e, t) => t(), "tracer")
	}, t);
	let n = t.tracer;
	n("initCharCodeToOptimizedIndexMap", () => {
		_l();
	});
	let r;
	n("Reject Lexer.NA", () => {
		r = e.filter((e) => e[Mc] !== Fl.NA);
	});
	let i = !1, a;
	n("Transform Patterns", () => {
		i = !1, a = r.map((e) => {
			let t = e[Mc];
			if (t instanceof RegExp) {
				let e = t.source;
				return e.length === 1 && e !== "^" && e !== "$" && e !== "." && !t.ignoreCase ? e : e.length === 2 && e[0] === "\\" && ![
					"d",
					"D",
					"s",
					"S",
					"t",
					"r",
					"n",
					"t",
					"0",
					"c",
					"b",
					"B",
					"f",
					"v",
					"w",
					"W"
				].includes(e[1]) ? e[1] : il(t);
			}
			if (typeof t == "function") return i = !0, { exec: t };
			if (typeof t == "object") return i = !0, t;
			if (typeof t == "string") {
				if (t.length === 1) return t;
				{
					let e = t.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
					return il(new RegExp(e));
				}
			}
			throw Error("non exhaustive match");
		});
	});
	let o, s, c, l, u;
	n("misc mapping", () => {
		o = r.map((e) => e.tokenTypeIdx), s = r.map((e) => {
			let t = e.GROUP;
			if (t !== Fl.SKIPPED) {
				if (typeof t == "string") return t;
				if (t === void 0) return !1;
				throw Error("non exhaustive match");
			}
		}), c = r.map((e) => {
			let t = e.LONGER_ALT;
			if (t) return Array.isArray(t) ? t.map((e) => r.indexOf(e)) : [r.indexOf(t)];
		}), l = r.map((e) => e.PUSH_MODE), u = r.map((e) => Object.hasOwn(e, "POP_MODE"));
	});
	let d;
	n("Line Terminator Handling", () => {
		let e = fl(t.lineTerminatorCharacters);
		d = r.map((e) => !1), t.positionTracking !== "onlyOffset" && (d = r.map((t) => Object.hasOwn(t, "LINE_BREAKS") ? !!t.LINE_BREAKS : ul(t, e) === !1 && jc(e, t.PATTERN)));
	});
	let f, p, m, h;
	n("Misc Mapping #2", () => {
		f = r.map(sl), p = a.map(cl), m = r.reduce((e, t) => {
			let n = t.GROUP;
			return typeof n == "string" && n !== Fl.SKIPPED && (e[n] = []), e;
		}, {}), h = a.map((e, t) => {
			let n = s[t] === void 0 && c[t] === void 0 ? Bc(r[t].PATTERN) : void 0;
			return {
				pattern: a[t],
				asciiClass: n,
				longerAlt: c[t],
				canLineTerminator: d[t],
				matchType: n === void 0 ? p[t] === !1 ? f[t] ? Ic : Lc : Fc : Rc,
				short: p[t],
				group: s[t],
				push: l[t],
				pop: u[t],
				tokenTypeIdx: o[t],
				tokenType: r[t]
			};
		});
	});
	let g = !0, _ = [];
	return t.safeMode || n("First Char Optimization", () => {
		_ = r.reduce((e, n, r) => {
			if (typeof n.PATTERN == "string") pl(e, gl(n.PATTERN.charCodeAt(0)), h[r]);
			else if (Array.isArray(n.START_CHARS_HINT)) {
				let t;
				n.START_CHARS_HINT.forEach((n) => {
					let i = gl(typeof n == "string" ? n.charCodeAt(0) : n);
					t !== i && (t = i, pl(e, i, h[r]));
				});
			} else if (n.PATTERN instanceof RegExp) {
				if (n.PATTERN.unicode) g = !1, t.ensureOptimizations && zs(`${Cc}	Unable to analyze < ${n.PATTERN.toString()} > pattern.
	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);
				else {
					let i = wc(n.PATTERN, t.ensureOptimizations);
					i.length === 0 && (g = !1), i.forEach((t) => {
						pl(e, t, h[r]);
					});
				}
			} else t.ensureOptimizations && zs(`${Cc}	TokenType: <${n.name}> is using a custom token pattern without providing <start_chars_hint> parameter.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`), g = !1;
			return e;
		}, []);
	}), {
		emptyGroups: m,
		patternIdxToConfig: h,
		charCodeToPatternIdxToConfig: _,
		hasCustom: i,
		canBeOptimized: g
	};
}
P(zc, "analyzeTokenTypes");
function Bc(e) {
	if (!(e instanceof RegExp) || e.flags !== "") return;
	let t;
	try {
		t = bc(e);
	} catch {
		return;
	}
	if (t.value.value.length !== 1 || t.value.value[0].value.length !== 1) return;
	let n = t.value.value[0].value[0], r;
	for (; n.type === "Group";) {
		if (n.capturing || n.quantifier !== void 0 && r !== void 0 || n.value.value.length !== 1 || n.value.value[0].value.length !== 1) return;
		r = n.quantifier ?? r, n = n.value.value[0].value[0];
	}
	if (n.type !== "Set" || n.complement || n.quantifier !== void 0 && r !== void 0 || (r = n.quantifier ?? r, r?.atLeast !== 1 || r.atMost !== 1 / 0 || !r.greedy)) return;
	let i = /* @__PURE__ */ new Uint8Array(128);
	for (let e of n.value) {
		let t = typeof e == "number" ? e : e.from, n = typeof e == "number" ? e : e.to;
		if (t < 0 || n >= i.length) return;
		i.fill(1, t, n + 1);
	}
	return i;
}
P(Bc, "getAsciiClass");
function Vc(e, t) {
	let n = [], r = Uc(e);
	n = n.concat(r.errors);
	let i = Wc(r.valid), a = i.valid;
	return n = n.concat(i.errors), n = n.concat(Hc(a)), n = n.concat(Qc(a)), n = n.concat($c(a, t)), n = n.concat(el(a)), n;
}
P(Vc, "validatePatterns");
function Hc(e) {
	let t = [], n = e.filter((e) => e[Mc] instanceof RegExp);
	return t = t.concat(Kc(n)), t = t.concat(Yc(n)), t = t.concat(Xc(n)), t = t.concat(Zc(n)), t = t.concat(qc(n)), t;
}
P(Hc, "validateRegExpPattern");
function Uc(e) {
	let t = e.filter((e) => !Object.hasOwn(e, Mc));
	return {
		errors: t.map((e) => ({
			message: "Token Type: ->" + e.name + "<- missing static 'PATTERN' property",
			type: G.MISSING_PATTERN,
			tokenTypes: [e]
		})),
		valid: e.filter((e) => !t.includes(e))
	};
}
P(Uc, "findMissingPatterns");
function Wc(e) {
	let t = e.filter((e) => {
		let t = e[Mc];
		return !(t instanceof RegExp) && typeof t != "function" && !Object.hasOwn(t, "exec") && typeof t != "string";
	});
	return {
		errors: t.map((e) => ({
			message: "Token Type: ->" + e.name + "<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",
			type: G.INVALID_PATTERN,
			tokenTypes: [e]
		})),
		valid: e.filter((e) => !t.includes(e))
	};
}
P(Wc, "findInvalidPatterns");
var Gc = /[^\\][$]/;
function Kc(e) {
	var t;
	class n extends Qo {
		constructor() {
			super(...arguments), this.found = !1;
		}
		visitEndAnchor(e) {
			this.found = !0;
		}
	}
	return t = n, P(t, "EndAnchorFinder"), e.filter((e) => {
		let t = e.PATTERN;
		try {
			let e = bc(t), r = new n();
			return r.visit(e), r.found;
		} catch {
			return Gc.test(t.source);
		}
	}).map((e) => ({
		message: "Unexpected RegExp Anchor Error:\n	Token Type: ->" + e.name + "<- static 'PATTERN' cannot contain end of input anchor '$'\n	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.",
		type: G.EOI_ANCHOR_FOUND,
		tokenTypes: [e]
	}));
}
P(Kc, "findEndOfInputAnchor");
function qc(e) {
	return e.filter((e) => e.PATTERN.test("")).map((e) => ({
		message: "Token Type: ->" + e.name + "<- static 'PATTERN' must not match an empty string",
		type: G.EMPTY_MATCH_PATTERN,
		tokenTypes: [e]
	}));
}
P(qc, "findEmptyMatchRegExps");
var Jc = /[^\\[][\^]|^\^/;
function Yc(e) {
	var t;
	class n extends Qo {
		constructor() {
			super(...arguments), this.found = !1;
		}
		visitStartAnchor(e) {
			this.found = !0;
		}
	}
	return t = n, P(t, "StartAnchorFinder"), e.filter((e) => {
		let t = e.PATTERN;
		try {
			let e = bc(t), r = new n();
			return r.visit(e), r.found;
		} catch {
			return Jc.test(t.source);
		}
	}).map((e) => ({
		message: "Unexpected RegExp Anchor Error:\n	Token Type: ->" + e.name + "<- static 'PATTERN' cannot contain start of input anchor '^'\n	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.",
		type: G.SOI_ANCHOR_FOUND,
		tokenTypes: [e]
	}));
}
P(Yc, "findStartOfInputAnchor");
function Xc(e) {
	return e.filter((e) => {
		let t = e[Mc];
		return t instanceof RegExp && (t.multiline || t.global);
	}).map((e) => ({
		message: "Token Type: ->" + e.name + "<- static 'PATTERN' may NOT contain global('g') or multiline('m')",
		type: G.UNSUPPORTED_FLAGS_FOUND,
		tokenTypes: [e]
	}));
}
P(Xc, "findUnsupportedFlags");
function Zc(e) {
	let t = [], n = e.map((n) => e.reduce((e, r) => (n.PATTERN.source === r.PATTERN.source && !t.includes(r) && r.PATTERN !== Fl.NA && (t.push(r), e.push(r)), e), []));
	return n = n.filter(Boolean), n.filter((e) => e.length > 1).map((e) => {
		let t = e.map((e) => e.name);
		return {
			message: `The same RegExp pattern ->${e[0].PATTERN}<-has been used in all of the following Token Types: ${t.join(", ")} <-`,
			type: G.DUPLICATE_PATTERNS_FOUND,
			tokenTypes: e
		};
	});
}
P(Zc, "findDuplicatePatterns");
function Qc(e) {
	return e.filter((e) => {
		if (!Object.hasOwn(e, "GROUP")) return !1;
		let t = e.GROUP;
		return t !== Fl.SKIPPED && t !== Fl.NA && typeof t != "string";
	}).map((e) => ({
		message: "Token Type: ->" + e.name + "<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",
		type: G.INVALID_GROUP_TYPE_FOUND,
		tokenTypes: [e]
	}));
}
P(Qc, "findInvalidGroupType");
function $c(e, t) {
	return e.filter((e) => e.PUSH_MODE !== void 0 && !t.includes(e.PUSH_MODE)).map((e) => ({
		message: `Token Type: ->${e.name}<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->${e.PUSH_MODE}<-which does not exist`,
		type: G.PUSH_MODE_DOES_NOT_EXIST,
		tokenTypes: [e]
	}));
}
P($c, "findModesThatDoNotExist");
function el(e) {
	let t = [], n = e.reduce((e, t, n) => {
		let r = t.PATTERN;
		return r === Fl.NA || (typeof r == "string" ? e.push({
			str: r,
			idx: n,
			tokenType: t
		}) : r instanceof RegExp && nl(r) && e.push({
			str: r.source,
			idx: n,
			tokenType: t
		})), e;
	}, []);
	return e.forEach((e, r) => {
		n.forEach(({ str: n, idx: i, tokenType: a }) => {
			if (r < i && tl(n, e.PATTERN)) {
				let n = `Token: ->${a.name}<- can never be matched.
Because it appears AFTER the Token Type ->${e.name}<-in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;
				t.push({
					message: n,
					type: G.UNREACHABLE_PATTERN,
					tokenTypes: [e, a]
				});
			}
		});
	}), t;
}
P(el, "findUnreachablePatterns");
function tl(e, t) {
	if (t instanceof RegExp) {
		if (rl(t)) return !1;
		let n = t.exec(e);
		return n !== null && n.index === 0;
	}
	if (typeof t == "function") return t(e, 0, [], {});
	if (Object.hasOwn(t, "exec")) return t.exec(e, 0, [], {});
	if (typeof t == "string") return t === e;
	throw Error("non exhaustive match");
}
P(tl, "tryToMatchStrToPattern");
function nl(e) {
	return [
		".",
		"\\",
		"[",
		"]",
		"|",
		"^",
		"$",
		"(",
		")",
		"?",
		"*",
		"+",
		"{"
	].find((t) => e.source.indexOf(t) !== -1) === void 0;
}
P(nl, "noMetaChar");
function rl(e) {
	return /(\(\?=)|(\(\?!)|(\(\?<=)|(\(\?<!)/.test(e.source);
}
P(rl, "usesLookAheadOrBehind");
function il(e) {
	let t = e.ignoreCase ? "iy" : "y";
	return RegExp(`${e.source}`, t);
}
P(il, "addStickyFlag");
function al(e, t, n) {
	let r = [];
	return Object.hasOwn(e, Nc) || r.push({
		message: "A MultiMode Lexer cannot be initialized without a <" + Nc + "> property in its definition\n",
		type: G.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE
	}), Object.hasOwn(e, Pc) || r.push({
		message: "A MultiMode Lexer cannot be initialized without a <" + Pc + "> property in its definition\n",
		type: G.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY
	}), Object.hasOwn(e, Pc) && Object.hasOwn(e, Nc) && !Object.hasOwn(e.modes, e.defaultMode) && r.push({
		message: `A MultiMode Lexer cannot be initialized with a ${Nc}: <${e.defaultMode}>which does not exist
`,
		type: G.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST
	}), Object.hasOwn(e, Pc) && Object.keys(e.modes).forEach((t) => {
		let n = e.modes[t];
		n.forEach((e, i) => {
			e === void 0 ? r.push({
				message: `A Lexer cannot be initialized using an undefined Token Type. Mode:<${t}> at index: <${i}>
`,
				type: G.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED
			}) : Object.hasOwn(e, "LONGER_ALT") && (Array.isArray(e.LONGER_ALT) ? e.LONGER_ALT : [e.LONGER_ALT]).forEach((i) => {
				i !== void 0 && !n.includes(i) && r.push({
					message: `A MultiMode Lexer cannot be initialized with a longer_alt <${i.name}> on token <${e.name}> outside of mode <${t}>
`,
					type: G.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE
				});
			});
		});
	}), r;
}
P(al, "performRuntimeChecks");
function ol(e, t, n) {
	let r = [], i = !1, a = Object.values(e.modes || {}).flat().filter(Boolean).filter((e) => e[Mc] !== Fl.NA), o = fl(n);
	return t && a.forEach((e) => {
		let t = ul(e, o);
		if (t !== !1) {
			let n = {
				message: dl(e, t),
				type: t.issue,
				tokenType: e
			};
			r.push(n);
		} else Object.hasOwn(e, "LINE_BREAKS") ? e.LINE_BREAKS === !0 && (i = !0) : jc(o, e.PATTERN) && (i = !0);
	}), t && !i && r.push({
		message: "Warning: No LINE_BREAKS Found.\n	This Lexer has been defined to track line and column information,\n	But none of the Token Types can be identified as matching a line terminator.\n	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS \n	for details.",
		type: G.NO_LINE_BREAKS_FLAGS
	}), r;
}
P(ol, "performWarningRuntimeChecks");
function sl(e) {
	let t = e.PATTERN;
	if (t instanceof RegExp) return !1;
	if (typeof t == "function" || Object.hasOwn(t, "exec")) return !0;
	if (typeof t == "string") return !1;
	throw Error("non exhaustive match");
}
P(sl, "isCustomPattern");
function cl(e) {
	return typeof e == "string" && e.length === 1 && e.charCodeAt(0);
}
P(cl, "isShortPattern");
var ll = {
	test: /* @__PURE__ */ P(function(e) {
		let t = e.length;
		for (let n = this.lastIndex; n < t; n++) {
			let t = e.charCodeAt(n);
			if (t === 10) return this.lastIndex = n + 1, !0;
			if (t === 13) return this.lastIndex = e.charCodeAt(n + 1) === 10 ? n + 2 : n + 1, !0;
		}
		return !1;
	}, "test"),
	lastIndex: 0
};
function ul(e, t) {
	if (Object.hasOwn(e, "LINE_BREAKS")) return !1;
	if (e.PATTERN instanceof RegExp) {
		try {
			jc(t, e.PATTERN);
		} catch (e) {
			return {
				issue: G.IDENTIFY_TERMINATOR,
				errMsg: e.message
			};
		}
		return !1;
	}
	if (typeof e.PATTERN == "string") return !1;
	if (sl(e)) return { issue: G.CUSTOM_LINE_BREAK };
	throw Error("non exhaustive match");
}
P(ul, "checkLineBreaksIssues");
function dl(e, t) {
	if (t.issue === G.IDENTIFY_TERMINATOR) return `Warning: unable to identify line terminator usage in pattern.
	The problem is in the <${e.name}> Token Type
	 Root cause: ${t.errMsg}.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR`;
	if (t.issue === G.CUSTOM_LINE_BREAK) return `Warning: A Custom Token Pattern should specify the <line_breaks> option.
	The problem is in the <${e.name}> Token Type
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK`;
	throw Error("non exhaustive match");
}
P(dl, "buildLineBreakIssueMessage");
function fl(e) {
	return e.map((e) => typeof e == "string" ? e.charCodeAt(0) : e);
}
P(fl, "getCharCodes");
function pl(e, t, n) {
	e[t] === void 0 ? e[t] = [n] : e[t].push(n);
}
P(pl, "addToMapOfArrays");
var ml = 256, hl = [];
function gl(e) {
	return e < ml ? e : hl[e];
}
P(gl, "charCodeToOptimizedIndex");
function _l() {
	if (hl.length === 0) {
		hl = Array(65536);
		for (let e = 0; e < 65536; e++) hl[e] = e > 255 ? 255 + ~~(e / 255) : e;
	}
}
P(_l, "initCharCodeToOptimizedIndexMap");
function vl(e, t) {
	let n = e.tokenTypeIdx;
	return n === t.tokenTypeIdx || t.isParent === !0 && t.categoryMatchesMap[n] === !0;
}
P(vl, "tokenStructuredMatcher");
function yl(e, t) {
	return e.tokenTypeIdx === t.tokenTypeIdx;
}
P(yl, "tokenStructuredMatcherNoCategories");
var bl = 1, xl = {};
function Sl(e) {
	let t = Cl(e);
	wl(t), El(t), Tl(t), t.forEach((e) => {
		e.isParent = e.categoryMatches.length > 0;
	});
}
P(Sl, "augmentTokenTypes");
function Cl(e) {
	let t = [...e], n = e, r = !0;
	for (; r;) {
		n = n.map((e) => e.CATEGORIES).flat().filter(Boolean);
		let e = n.filter((e) => !t.includes(e));
		t = t.concat(e), e.length === 0 ? r = !1 : n = e;
	}
	return t;
}
P(Cl, "expandCategories");
function wl(e) {
	e.forEach((e) => {
		Ol(e) || (xl[bl] = e, e.tokenTypeIdx = bl++), kl(e) && !Array.isArray(e.CATEGORIES) && (e.CATEGORIES = [e.CATEGORIES]), kl(e) || (e.CATEGORIES = []), Al(e) || (e.categoryMatches = []), jl(e) || (e.categoryMatchesMap = {});
	});
}
P(wl, "assignTokenDefaultProps");
function Tl(e) {
	e.forEach((e) => {
		e.categoryMatches = [], Object.keys(e.categoryMatchesMap).forEach((t) => {
			e.categoryMatches.push(xl[t].tokenTypeIdx);
		});
	});
}
P(Tl, "assignCategoriesTokensProp");
function El(e) {
	e.forEach((e) => {
		Dl([], e);
	});
}
P(El, "assignCategoriesMapProp");
function Dl(e, t) {
	e.forEach((e) => {
		t.categoryMatchesMap[e.tokenTypeIdx] = !0;
	}), t.CATEGORIES.forEach((n) => {
		let r = e.concat(t);
		r.includes(n) || Dl(r, n);
	});
}
P(Dl, "singleAssignCategoriesToksMap");
function Ol(e) {
	return Object.hasOwn(e ?? {}, "tokenTypeIdx");
}
P(Ol, "hasShortKeyProperty");
function kl(e) {
	return Object.hasOwn(e ?? {}, "CATEGORIES");
}
P(kl, "hasCategoriesProperty");
function Al(e) {
	return Object.hasOwn(e ?? {}, "categoryMatches");
}
P(Al, "hasExtendingTokensTypesProperty");
function jl(e) {
	return Object.hasOwn(e ?? {}, "categoryMatchesMap");
}
P(jl, "hasExtendingTokensTypesMapProperty");
function Ml(e) {
	return Object.hasOwn(e ?? {}, "tokenTypeIdx");
}
P(Ml, "isTokenType");
var Nl = {
	buildUnableToPopLexerModeMessage(e) {
		return `Unable to pop Lexer Mode after encountering Token ->${e.image}<- The Mode Stack is empty`;
	},
	buildUnexpectedCharactersMessage(e, t, n, r, i, a) {
		return `unexpected character: ->${e.charAt(t)}<- at offset: ${t}, skipped ${n} characters.`;
	}
}, G;
(function(e) {
	e[e.MISSING_PATTERN = 0] = "MISSING_PATTERN", e[e.INVALID_PATTERN = 1] = "INVALID_PATTERN", e[e.EOI_ANCHOR_FOUND = 2] = "EOI_ANCHOR_FOUND", e[e.UNSUPPORTED_FLAGS_FOUND = 3] = "UNSUPPORTED_FLAGS_FOUND", e[e.DUPLICATE_PATTERNS_FOUND = 4] = "DUPLICATE_PATTERNS_FOUND", e[e.INVALID_GROUP_TYPE_FOUND = 5] = "INVALID_GROUP_TYPE_FOUND", e[e.PUSH_MODE_DOES_NOT_EXIST = 6] = "PUSH_MODE_DOES_NOT_EXIST", e[e.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE = 7] = "MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE", e[e.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY = 8] = "MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY", e[e.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST = 9] = "MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST", e[e.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED = 10] = "LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED", e[e.SOI_ANCHOR_FOUND = 11] = "SOI_ANCHOR_FOUND", e[e.EMPTY_MATCH_PATTERN = 12] = "EMPTY_MATCH_PATTERN", e[e.NO_LINE_BREAKS_FLAGS = 13] = "NO_LINE_BREAKS_FLAGS", e[e.UNREACHABLE_PATTERN = 14] = "UNREACHABLE_PATTERN", e[e.IDENTIFY_TERMINATOR = 15] = "IDENTIFY_TERMINATOR", e[e.CUSTOM_LINE_BREAK = 16] = "CUSTOM_LINE_BREAK", e[e.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE = 17] = "MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE";
})(G ||= {});
var Pl = {
	deferDefinitionErrorsHandling: !1,
	positionTracking: "full",
	lineTerminatorsPattern: /\n|\r\n?/g,
	lineTerminatorCharacters: ["\n", "\r"],
	ensureOptimizations: !1,
	safeMode: !1,
	errorMessageProvider: Nl,
	traceInitPerf: !1,
	skipValidations: !1,
	recoveryEnabled: !0
};
Object.freeze(Pl);
var Fl = (te = class {
	constructor(e, t = Pl) {
		if (this.lexerDefinition = e, this.lexerDefinitionErrors = [], this.lexerDefinitionWarning = [], this.patternIdxToConfig = {}, this.charCodeToPatternIdxToConfig = {}, this.modes = [], this.emptyGroups = {}, this.cachedGroupKeys = [], this.trackStartLines = !0, this.trackEndLines = !0, this.hasCustom = !1, this.canModeBeOptimized = {}, this.TRACE_INIT = (e, t) => {
			if (this.traceInitPerf === !0) {
				this.traceInitIndent++;
				let n = Array(this.traceInitIndent + 1).join("	");
				this.traceInitIndent < this.traceInitMaxIdent && console.log(`${n}--> <${e}>`);
				let { time: r, value: i } = Vs(t), a = r > 10 ? console.warn : console.log;
				return this.traceInitIndent < this.traceInitMaxIdent && a(`${n}<-- <${e}> time: ${r}ms`), this.traceInitIndent--, i;
			}
			return t();
		}, typeof t == "boolean") throw Error("The second argument to the Lexer constructor is now an ILexerConfig Object.\na boolean 2nd argument is no longer supported");
		this.config = Object.assign({}, Pl, t);
		let n = this.config.traceInitPerf;
		n === !0 ? (this.traceInitMaxIdent = 1 / 0, this.traceInitPerf = !0) : typeof n == "number" && (this.traceInitMaxIdent = n, this.traceInitPerf = !0), this.traceInitIndent = -1, this.TRACE_INIT("Lexer Constructor", () => {
			let n, r = !0;
			this.TRACE_INIT("Lexer Config handling", () => {
				if (this.config.lineTerminatorsPattern === Pl.lineTerminatorsPattern) this.config.lineTerminatorsPattern = ll;
				else if (this.config.lineTerminatorCharacters === Pl.lineTerminatorCharacters) throw Error("Error: Missing <lineTerminatorCharacters> property on the Lexer config.\n	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS");
				if (t.safeMode && t.ensureOptimizations) throw Error("\"safeMode\" and \"ensureOptimizations\" flags are mutually exclusive.");
				this.trackStartLines = /full|onlyStart/i.test(this.config.positionTracking), this.trackEndLines = /full/i.test(this.config.positionTracking), Array.isArray(e) ? n = {
					modes: { defaultMode: [...e] },
					defaultMode: Nc
				} : (r = !1, n = Object.assign({}, e));
			}), this.config.skipValidations === !1 && (this.TRACE_INIT("performRuntimeChecks", () => {
				this.lexerDefinitionErrors = this.lexerDefinitionErrors.concat(al(n, this.trackStartLines, this.config.lineTerminatorCharacters));
			}), this.TRACE_INIT("performWarningRuntimeChecks", () => {
				this.lexerDefinitionWarning = this.lexerDefinitionWarning.concat(ol(n, this.trackStartLines, this.config.lineTerminatorCharacters));
			})), n.modes = n.modes ? n.modes : {}, Object.entries(n.modes).forEach(([e, t]) => {
				n.modes[e] = t.filter((e) => e !== void 0);
			});
			let i = Object.keys(n.modes);
			if (Object.entries(n.modes).forEach(([e, n]) => {
				this.TRACE_INIT(`Mode: <${e}> processing`, () => {
					if (this.modes.push(e), this.config.skipValidations === !1 && this.TRACE_INIT("validatePatterns", () => {
						this.lexerDefinitionErrors = this.lexerDefinitionErrors.concat(Vc(n, i));
					}), this.lexerDefinitionErrors.length === 0) {
						Sl(n);
						let r;
						this.TRACE_INIT("analyzeTokenTypes", () => {
							r = zc(n, {
								lineTerminatorCharacters: this.config.lineTerminatorCharacters,
								positionTracking: t.positionTracking,
								ensureOptimizations: t.ensureOptimizations,
								safeMode: t.safeMode,
								tracer: this.TRACE_INIT
							});
						}), this.patternIdxToConfig[e] = r.patternIdxToConfig, this.charCodeToPatternIdxToConfig[e] = r.charCodeToPatternIdxToConfig, this.emptyGroups = Object.assign({}, this.emptyGroups, r.emptyGroups), this.hasCustom = r.hasCustom || this.hasCustom, this.canModeBeOptimized[e] = r.canBeOptimized;
					}
				});
			}), this.defaultMode = n.defaultMode, this.cachedGroupKeys = Object.keys(this.emptyGroups), this.lexerDefinitionErrors.length > 0 && !this.config.deferDefinitionErrorsHandling) {
				let e = this.lexerDefinitionErrors.map((e) => e.message).join("-----------------------\n");
				throw Error("Errors detected in definition of Lexer:\n" + e);
			}
			this.lexerDefinitionWarning.forEach((e) => {
				Bs(e.message);
			}), this.TRACE_INIT("Choosing sub-methods implementations", () => {
				if (r && (this.handleModes = () => {}), this.trackStartLines === !1 && (this.computeNewColumn = (e) => e), this.trackEndLines === !1 && (this.updateTokenEndLineColumnLocation = () => {}), /full/i.test(this.config.positionTracking)) this.createTokenInstance = this.createFullToken;
				else if (/onlyStart/i.test(this.config.positionTracking)) this.createTokenInstance = this.createStartOnlyToken;
				else if (/onlyOffset/i.test(this.config.positionTracking)) this.createTokenInstance = this.createOffsetOnlyToken;
				else throw Error(`Invalid <positionTracking> config option: "${this.config.positionTracking}"`);
				this.hasCustom ? (this.addToken = this.addTokenUsingPush, this.handlePayload = this.handlePayloadWithCustom) : (this.addToken = this.addTokenUsingMemberAccess, this.handlePayload = this.handlePayloadNoCustom);
			}), this.TRACE_INIT("Failed Optimization Warnings", () => {
				let e = Object.entries(this.canModeBeOptimized).reduce((e, [t, n]) => (n === !1 && e.push(t), e), []);
				if (t.ensureOptimizations && e.length > 0) throw Error(`Lexer Modes: < ${e.join(", ")} > cannot be optimized.
	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`);
			}), this.TRACE_INIT("clearRegExpParserCache", () => {
				xc();
			}), this.TRACE_INIT("toFastProperties", () => {
				Hs(this);
			});
		});
	}
	tokenize(e, t = this.defaultMode) {
		if (this.lexerDefinitionErrors.length > 0) {
			let e = this.lexerDefinitionErrors.map((e) => e.message).join("-----------------------\n");
			throw Error("Unable to Tokenize because Errors detected in definition of Lexer:\n" + e);
		}
		return this.tokenizeInternal(e, t);
	}
	tokenizeInternal(e, t) {
		let n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _ = e, v = _.length, y = 0, b = 0, x = this.hasCustom ? 0 : Math.floor(e.length / 10), S = Array(x), C = [], ee = this.trackStartLines ? 1 : void 0, w = this.trackStartLines ? 1 : void 0, T = {};
		for (let e = 0; e < this.cachedGroupKeys.length; e++) T[this.cachedGroupKeys[e]] = [];
		let te = this.trackStartLines, E = this.config.lineTerminatorsPattern, D = 0, O = [], ne = [], k = [], A = [];
		Object.freeze(A);
		let re = !1, ie = /* @__PURE__ */ P((e) => {
			if (k.length === 1 && e.tokenType.PUSH_MODE === void 0) {
				let t = this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(e);
				C.push({
					offset: e.startOffset,
					line: e.startLine,
					column: e.startColumn,
					length: e.image.length,
					message: t
				});
			} else {
				k.pop();
				let e = k.at(-1);
				O = this.patternIdxToConfig[e], ne = this.charCodeToPatternIdxToConfig[e], D = O.length;
				let t = this.canModeBeOptimized[e] && this.config.safeMode === !1;
				re = !!(ne && t);
			}
		}, "pop_mode");
		function ae(e) {
			k.push(e), ne = this.charCodeToPatternIdxToConfig[e], O = this.patternIdxToConfig[e], D = O.length;
			let t = this.canModeBeOptimized[e] && this.config.safeMode === !1;
			re = !!(ne && t);
		}
		P(ae, "push_mode"), ae.call(this, t);
		let j, oe = this.config.recoveryEnabled;
		for (; y < v;) {
			s = null, u = -1;
			let t = _.charCodeAt(y), x;
			if (re) {
				let e = gl(t), n = ne[e];
				x = n === void 0 ? A : n;
			} else x = O;
			let se = x.length;
			for (n = 0; n < se; n++) {
				j = x[n];
				let r = j.pattern;
				switch (c = null, j.matchType) {
					case Fc:
						t === j.short && (u = 1, s = r);
						break;
					case Ic:
						g = r.exec(_, y, S, T), g === null ? s = null : (s = g[0], u = s.length, g.payload !== void 0 && (c = g.payload));
						break;
					case Rc: {
						let e = j.asciiClass;
						if (e[t] !== 1) {
							r.lastIndex = 0;
							break;
						}
						let n = y + 1;
						for (; e[_.charCodeAt(n)] === 1;) n++;
						u = n - y, r.lastIndex = n;
						break;
					}
					case Lc: r.lastIndex = y, u = this.matchLength(r, e, y);
				}
				if (u !== -1) {
					if (o = j.longerAlt, o !== void 0) {
						s = e.substring(y, y + u);
						let t = o.length;
						for (i = 0; i < t; i++) {
							let t = O[o[i]], n = t.pattern;
							if (l = null, t.matchType === Ic ? (g = n.exec(_, y, S, T), g === null ? a = null : (a = g[0], g.payload !== void 0 && (l = g.payload))) : (n.lastIndex = y, a = this.match(n, e, y)), a && a.length > s.length) {
								s = a, u = a.length, c = l, j = t;
								break;
							}
						}
					}
					break;
				}
			}
			if (u !== -1) {
				if (d = j.group, d !== void 0 && (s = s === null ? e.substring(y, y + u) : s, f = j.tokenTypeIdx, p = this.createTokenInstance(s, y, f, j.tokenType, ee, w, u), this.handlePayload(p, c), d === !1 ? b = this.addToken(S, b, p) : T[d].push(p)), te === !0 && j.canLineTerminator === !0) {
					let t = 0, n, r;
					E.lastIndex = 0;
					do
						s = s === null ? e.substring(y, y + u) : s, n = E.test(s), n === !0 && (r = E.lastIndex - 1, t++);
					while (n === !0);
					t === 0 ? w = this.computeNewColumn(w, u) : (ee += t, w = u - r, this.updateTokenEndLineColumnLocation(p, d, r, t, ee, w, u));
				} else w = this.computeNewColumn(w, u);
				y += u, this.handleModes(j, ie, ae, p);
			} else {
				let t = y, n = ee, i = w, a = oe === !1;
				for (; a === !1 && y < v;) for (y++, r = 0; r < D; r++) {
					let t = O[r], n = t.pattern;
					switch (t.matchType) {
						case Fc:
							_.charCodeAt(y) === t.short && (a = !0);
							break;
						case Ic:
							a = n.exec(_, y, S, T) !== null;
							break;
						case Rc:
						case Lc: n.lastIndex = y, a = n.exec(e) !== null;
					}
					if (a === !0) break;
				}
				if (m = y - t, w = this.computeNewColumn(w, m), h = this.config.errorMessageProvider.buildUnexpectedCharactersMessage(_, t, m, n, i, k.at(-1)), C.push({
					offset: t,
					line: n,
					column: i,
					length: m,
					message: h
				}), oe === !1) break;
			}
		}
		return this.hasCustom || (S.length = b), {
			tokens: S,
			groups: T,
			errors: C
		};
	}
	handleModes(e, t, n, r) {
		if (e.pop === !0) {
			let i = e.push;
			t(r), i !== void 0 && n.call(this, i);
		} else e.push !== void 0 && n.call(this, e.push);
	}
	updateTokenEndLineColumnLocation(e, t, n, r, i, a, o) {
		let s, c;
		t !== void 0 && (s = n === o - 1, c = s ? -1 : 0, r === 1 && s === !0 || (e.endLine = i + c, e.endColumn = a - 1 + -c));
	}
	computeNewColumn(e, t) {
		return e + t;
	}
	createOffsetOnlyToken(e, t, n, r) {
		return {
			image: e,
			startOffset: t,
			tokenTypeIdx: n,
			tokenType: r
		};
	}
	createStartOnlyToken(e, t, n, r, i, a) {
		return {
			image: e,
			startOffset: t,
			startLine: i,
			startColumn: a,
			tokenTypeIdx: n,
			tokenType: r
		};
	}
	createFullToken(e, t, n, r, i, a, o) {
		return {
			image: e,
			startOffset: t,
			endOffset: t + o - 1,
			startLine: i,
			endLine: i,
			startColumn: a,
			endColumn: a + o - 1,
			tokenTypeIdx: n,
			tokenType: r
		};
	}
	addTokenUsingPush(e, t, n) {
		return e.push(n), t;
	}
	addTokenUsingMemberAccess(e, t, n) {
		return e[t] = n, t++, t;
	}
	handlePayloadNoCustom(e, t) {}
	handlePayloadWithCustom(e, t) {
		t !== null && (e.payload = t);
	}
	match(e, t, n) {
		return e.test(t) === !0 ? t.substring(n, e.lastIndex) : null;
	}
	matchLength(e, t, n) {
		return e.test(t) === !0 ? e.lastIndex - n : -1;
	}
}, P(te, "Lexer"), te);
Fl.SKIPPED = "This marks a skipped Token pattern, this means each token identified by it will be consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.", Fl.NA = /NOT_APPLICABLE/;
function Il(e) {
	return Ll(e) ? e.LABEL : e.name;
}
P(Il, "tokenLabel");
function Ll(e) {
	return typeof e.LABEL == "string" && e.LABEL !== "";
}
P(Ll, "hasTokenLabel");
var Rl = "parent", zl = "categories", Bl = "label", Vl = "group", Hl = "push_mode", Ul = "pop_mode", Wl = "longer_alt", Gl = "line_breaks", Kl = "start_chars_hint";
function ql(e) {
	return Jl(e);
}
P(ql, "createToken");
function Jl(e) {
	let t = e.pattern, n = {};
	if (n.name = e.name, t !== void 0 && (n.PATTERN = t), Object.hasOwn(e, Rl)) throw "The parent property is no longer supported.\nSee: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.";
	return Object.hasOwn(e, zl) && (n.CATEGORIES = e[zl]), Sl([n]), Object.hasOwn(e, Bl) && (n.LABEL = e[Bl]), Object.hasOwn(e, Vl) && (n.GROUP = e[Vl]), Object.hasOwn(e, Ul) && (n.POP_MODE = e[Ul]), Object.hasOwn(e, Hl) && (n.PUSH_MODE = e[Hl]), Object.hasOwn(e, Wl) && (n.LONGER_ALT = e[Wl]), Object.hasOwn(e, Gl) && (n.LINE_BREAKS = e[Gl]), Object.hasOwn(e, Kl) && (n.START_CHARS_HINT = e[Kl]), n;
}
P(Jl, "createTokenInternal");
var Yl = ql({
	name: "EOF",
	pattern: Fl.NA
});
Sl([Yl]);
function Xl(e, t, n, r, i, a, o, s) {
	return {
		image: t,
		startOffset: n,
		endOffset: r,
		startLine: i,
		endLine: a,
		startColumn: o,
		endColumn: s,
		tokenTypeIdx: e.tokenTypeIdx,
		tokenType: e
	};
}
P(Xl, "createTokenInstance");
function Zl(e, t) {
	return vl(e, t);
}
P(Zl, "tokenMatcher");
var Ql = {
	buildMismatchTokenMessage({ expected: e, actual: t, previous: n, ruleName: r }) {
		return `Expecting ${Ll(e) ? `--> ${Il(e)} <--` : `token of type --> ${e.name} <--`} but found --> '${t.image}' <--`;
	},
	buildNotAllInputParsedMessage({ firstRedundant: e, ruleName: t }) {
		return "Redundant input, expecting EOF but found: " + e.image;
	},
	buildNoViableAltMessage({ expectedPathsPerAlt: e, actual: t, previous: n, customUserDescription: r, ruleName: i }) {
		let a = "\nbut found: '" + t[0].image + "'";
		return r ? "Expecting: " + r + a : `Expecting: one of these possible Token sequences:
${e.reduce((e, t) => e.concat(t), []).map((e) => `[${e.map((e) => Il(e)).join(", ")}]`).map((e, t) => `  ${t + 1}. ${e}`).join("\n")}` + a;
	},
	buildEarlyExitMessage({ expectedIterationPaths: e, actual: t, customUserDescription: n, ruleName: r }) {
		let i = "\nbut found: '" + t[0].image + "'";
		return n ? "Expecting: " + n + i : `Expecting: expecting at least one iteration which starts with one of these possible Token sequences::
  <${e.map((e) => `[${e.map((e) => Il(e)).join(",")}]`).join(" ,")}>` + i;
	}
};
Object.freeze(Ql);
var $l = { buildRuleNotFoundError(e, t) {
	return "Invalid grammar, reference to a rule which is not defined: ->" + t.nonTerminalName + "<-\ninside top level rule: ->" + e.name + "<-";
} }, eu = {
	buildDuplicateFoundError(e, t) {
		function n(e) {
			return e instanceof W ? e.terminalType.name : e instanceof Ks ? e.nonTerminalName : "";
		}
		P(n, "getExtraProductionArgument");
		let r = e.name, i = t[0], a = i.idx, o = sc(i), s = n(i), c = `->${o}${a > 0 ? a : ""}<- ${s ? `with argument: ->${s}<-` : ""}
                  appears more than once (${t.length} times) in the top level rule: ->${r}<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `;
		return c = c.replace(/[ \t]+/g, " "), c = c.replace(/\s\s+/g, "\n"), c;
	},
	buildNamespaceConflictError(e) {
		return `Namespace conflict found in grammar.
The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <${e.name}>.
To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`;
	},
	buildAlternationPrefixAmbiguityError(e) {
		let t = e.prefixPath.map((e) => Il(e)).join(", "), n = e.alternation.idx === 0 ? "" : e.alternation.idx;
		return `Ambiguous alternatives: <${e.ambiguityIndices.join(" ,")}> due to common lookahead prefix
in <OR${n}> inside <${e.topLevelRule.name}> Rule,
<${t}> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`;
	},
	buildAlternationAmbiguityError(e) {
		let t = e.alternation.idx === 0 ? "" : e.alternation.idx, n = e.prefixPath.length === 0, r = `Ambiguous Alternatives Detected: <${e.ambiguityIndices.join(" ,")}> in <OR${t}> inside <${e.topLevelRule.name}> Rule,
`;
		if (n) r += "These alternatives are all empty (match no tokens), making them indistinguishable.\nOnly the last alternative may be empty.\n";
		else {
			let t = e.prefixPath.map((e) => Il(e)).join(", ");
			r += `<${t}> may appears as a prefix path in all these alternatives.
`;
		}
		return r += "See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES\nFor Further details.", r;
	},
	buildEmptyRepetitionError(e) {
		let t = sc(e.repetition);
		return e.repetition.idx !== 0 && (t += e.repetition.idx), `The repetition <${t}> within Rule <${e.topLevelRule.name}> can never consume any tokens.
This could lead to an infinite loop.`;
	},
	buildTokenNameError(e) {
		return "deprecated";
	},
	buildEmptyAlternationError(e) {
		return `Ambiguous empty alternative: <${e.emptyChoiceIdx + 1}> in <OR${e.alternation.idx}> inside <${e.topLevelRule.name}> Rule.
Only the last alternative may be an empty alternative.`;
	},
	buildTooManyAlternativesError(e) {
		return `An Alternation cannot have more than 256 alternatives:
<OR${e.alternation.idx}> inside <${e.topLevelRule.name}> Rule.
 has ${e.alternation.definition.length + 1} alternatives.`;
	},
	buildLeftRecursionError(e) {
		let t = e.topLevelRule.name;
		return `Left Recursion found in grammar.
rule: <${t}> can be invoked from itself (directly or indirectly)
without consuming any Tokens. The grammar path that causes this is: 
 ${`${t} --> ${e.leftRecursionPath.map((e) => e.name).concat([t]).join(" --> ")}`}
 To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`;
	},
	buildInvalidRuleNameError(e) {
		return "deprecated";
	},
	buildDuplicateRuleNameError(e) {
		let t;
		return t = e.topLevelRule instanceof qs ? e.topLevelRule.name : e.topLevelRule, `Duplicate definition, rule: ->${t}<- is already defined in the grammar: ->${e.grammarName}<-`;
	}
};
function tu(e, t) {
	let n = new nu(e, t);
	return n.resolveRefs(), n.errors;
}
P(tu, "resolveGrammar");
var nu = (E = class extends rc {
	constructor(e, t) {
		super(), this.nameToTopRule = e, this.errMsgProvider = t, this.errors = [];
	}
	resolveRefs() {
		Object.values(this.nameToTopRule).forEach((e) => {
			this.currTopLevel = e, e.accept(this);
		});
	}
	visitNonTerminal(e) {
		let t = this.nameToTopRule[e.nonTerminalName];
		if (t) e.referencedRule = t;
		else {
			let t = this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel, e);
			this.errors.push({
				message: t,
				type: rf.UNRESOLVED_SUBRULE_REF,
				ruleName: this.currTopLevel.name,
				unresolvedRefName: e.nonTerminalName
			});
		}
	}
}, P(E, "GastRefResolverVisitor"), E), ru = (D = class extends cc {
	constructor(e, t) {
		super(), this.topProd = e, this.path = t, this.possibleTokTypes = [], this.nextProductionName = "", this.nextProductionOccurrence = 0, this.found = !1, this.isAtEndOfPath = !1;
	}
	startWalking() {
		if (this.found = !1, this.path.ruleStack[0] !== this.topProd.name) throw Error("The path does not start with the walker's top Rule!");
		return this.ruleStack = [...this.path.ruleStack].reverse(), this.occurrenceStack = [...this.path.occurrenceStack].reverse(), this.ruleStack.pop(), this.occurrenceStack.pop(), this.updateExpectedNext(), this.walk(this.topProd), this.possibleTokTypes;
	}
	walk(e, t = []) {
		this.found || super.walk(e, t);
	}
	walkProdRef(e, t, n) {
		if (e.referencedRule.name === this.nextProductionName && e.idx === this.nextProductionOccurrence) {
			let r = t.concat(n);
			this.updateExpectedNext(), this.walk(e.referencedRule, r);
		}
	}
	updateExpectedNext() {
		this.ruleStack.length === 0 ? (this.nextProductionName = "", this.nextProductionOccurrence = 0, this.isAtEndOfPath = !0) : (this.nextProductionName = this.ruleStack.pop(), this.nextProductionOccurrence = this.occurrenceStack.pop());
	}
}, P(D, "AbstractNextPossibleTokensWalker"), D), iu = (O = class extends ru {
	constructor(e, t) {
		super(e, t), this.path = t, this.nextTerminalName = "", this.nextTerminalOccurrence = 0, this.nextTerminalName = this.path.lastTok.name, this.nextTerminalOccurrence = this.path.lastTokOccurrence;
	}
	walkTerminal(e, t, n) {
		if (this.isAtEndOfPath && e.terminalType.name === this.nextTerminalName && e.idx === this.nextTerminalOccurrence && !this.found) {
			let e = new Js({ definition: t.concat(n) });
			this.possibleTokTypes = uc(e), this.found = !0;
		}
	}
}, P(O, "NextAfterTokenWalker"), O), au = (ne = class extends cc {
	constructor(e, t) {
		super(), this.topRule = e, this.occurrence = t, this.result = {
			token: void 0,
			occurrence: void 0,
			isEndOfRule: void 0
		};
	}
	startWalking() {
		return this.walk(this.topRule), this.result;
	}
}, P(ne, "AbstractNextTerminalAfterProductionWalker"), ne), ou = (k = class extends au {
	walkMany(e, t, n) {
		if (e.idx === this.occurrence) {
			let e = t.concat(n)[0];
			this.result.isEndOfRule = e === void 0, e instanceof W && (this.result.token = e.terminalType, this.result.occurrence = e.idx);
		} else super.walkMany(e, t, n);
	}
}, P(k, "NextTerminalAfterManyWalker"), k), su = (A = class extends au {
	walkManySep(e, t, n) {
		if (e.idx === this.occurrence) {
			let e = t.concat(n)[0];
			this.result.isEndOfRule = e === void 0, e instanceof W && (this.result.token = e.terminalType, this.result.occurrence = e.idx);
		} else super.walkManySep(e, t, n);
	}
}, P(A, "NextTerminalAfterManySepWalker"), A), cu = (re = class extends au {
	walkAtLeastOne(e, t, n) {
		if (e.idx === this.occurrence) {
			let e = t.concat(n)[0];
			this.result.isEndOfRule = e === void 0, e instanceof W && (this.result.token = e.terminalType, this.result.occurrence = e.idx);
		} else super.walkAtLeastOne(e, t, n);
	}
}, P(re, "NextTerminalAfterAtLeastOneWalker"), re), lu = (ie = class extends au {
	walkAtLeastOneSep(e, t, n) {
		if (e.idx === this.occurrence) {
			let e = t.concat(n)[0];
			this.result.isEndOfRule = e === void 0, e instanceof W && (this.result.token = e.terminalType, this.result.occurrence = e.idx);
		} else super.walkAtLeastOneSep(e, t, n);
	}
}, P(ie, "NextTerminalAfterAtLeastOneSepWalker"), ie);
function uu(e, t, n = []) {
	n = [...n];
	let r = [], i = 0;
	function a(t) {
		return t.concat(e.slice(i + 1));
	}
	P(a, "remainingPathWith");
	function o(e) {
		let i = uu(a(e), t, n);
		return r.concat(i);
	}
	for (P(o, "getAlternativesForProd"); n.length < t && i < e.length;) {
		let t = e[i];
		if (t instanceof Js || t instanceof Ks) return o(t.definition);
		if (t instanceof Ys) r = o(t.definition);
		else {
			if (t instanceof Xs) return o(t.definition.concat([new U({ definition: t.definition })]));
			if (t instanceof Zs) return o([new Js({ definition: t.definition }), new U({ definition: [new W({ terminalType: t.separator })].concat(t.definition) })]);
			if (t instanceof Qs) r = o(t.definition.concat([new U({ definition: [new W({ terminalType: t.separator })].concat(t.definition) })]));
			else if (t instanceof U) r = o(t.definition.concat([new U({ definition: t.definition })]));
			else {
				if (t instanceof $s) return t.definition.forEach((e) => {
					e.definition.length !== 0 && (r = o(e.definition));
				}), r;
				if (t instanceof W) n.push(t.terminalType);
				else throw Error("non exhaustive match");
			}
		}
		i++;
	}
	return r.push({
		partialPath: n,
		suffixDef: e.slice(i)
	}), r;
}
P(uu, "possiblePathsFrom");
function du(e, t, n, r) {
	let i = "EXIT_NONE_TERMINAL", a = [i], o = "EXIT_ALTERNATIVE", s = !1, c = t.length, l = c - r - 1, u = [], d = [];
	for (d.push({
		idx: -1,
		def: e,
		ruleStack: [],
		occurrenceStack: []
	}); d.length !== 0;) {
		let e = d.pop();
		if (e === o) {
			s && d.at(-1).idx <= l && d.pop();
			continue;
		}
		let r = e.def, f = e.idx, p = e.ruleStack, m = e.occurrenceStack;
		if (r.length === 0) continue;
		let h = r[0];
		if (h === i) {
			let e = {
				idx: f,
				def: r.slice(1),
				ruleStack: p.slice(0, -1),
				occurrenceStack: m.slice(0, -1)
			};
			d.push(e);
		} else if (h instanceof W) {
			if (f < c - 1) {
				let e = f + 1, i = t[e];
				if (n(i, h.terminalType)) {
					let t = {
						idx: e,
						def: r.slice(1),
						ruleStack: p,
						occurrenceStack: m
					};
					d.push(t);
				}
			} else if (f === c - 1) u.push({
				nextTokenType: h.terminalType,
				nextTokenOccurrence: h.idx,
				ruleStack: p,
				occurrenceStack: m
			}), s = !0;
			else throw Error("non exhaustive match");
		} else if (h instanceof Ks) {
			let e = [...p];
			e.push(h.nonTerminalName);
			let t = [...m];
			t.push(h.idx);
			let n = {
				idx: f,
				def: h.definition.concat(a, r.slice(1)),
				ruleStack: e,
				occurrenceStack: t
			};
			d.push(n);
		} else if (h instanceof Ys) {
			let e = {
				idx: f,
				def: r.slice(1),
				ruleStack: p,
				occurrenceStack: m
			};
			d.push(e), d.push(o);
			let t = {
				idx: f,
				def: h.definition.concat(r.slice(1)),
				ruleStack: p,
				occurrenceStack: m
			};
			d.push(t);
		} else if (h instanceof Xs) {
			let e = new U({
				definition: h.definition,
				idx: h.idx
			}), t = {
				idx: f,
				def: h.definition.concat([e], r.slice(1)),
				ruleStack: p,
				occurrenceStack: m
			};
			d.push(t);
		} else if (h instanceof Zs) {
			let e = new U({
				definition: [new W({ terminalType: h.separator })].concat(h.definition),
				idx: h.idx
			}), t = {
				idx: f,
				def: h.definition.concat([e], r.slice(1)),
				ruleStack: p,
				occurrenceStack: m
			};
			d.push(t);
		} else if (h instanceof Qs) {
			let e = {
				idx: f,
				def: r.slice(1),
				ruleStack: p,
				occurrenceStack: m
			};
			d.push(e), d.push(o);
			let t = new U({
				definition: [new W({ terminalType: h.separator })].concat(h.definition),
				idx: h.idx
			}), n = {
				idx: f,
				def: h.definition.concat([t], r.slice(1)),
				ruleStack: p,
				occurrenceStack: m
			};
			d.push(n);
		} else if (h instanceof U) {
			let e = {
				idx: f,
				def: r.slice(1),
				ruleStack: p,
				occurrenceStack: m
			};
			d.push(e), d.push(o);
			let t = new U({
				definition: h.definition,
				idx: h.idx
			}), n = {
				idx: f,
				def: h.definition.concat([t], r.slice(1)),
				ruleStack: p,
				occurrenceStack: m
			};
			d.push(n);
		} else if (h instanceof $s) for (let e = h.definition.length - 1; e >= 0; e--) {
			let t = {
				idx: f,
				def: h.definition[e].definition.concat(r.slice(1)),
				ruleStack: p,
				occurrenceStack: m
			};
			d.push(t), d.push(o);
		}
		else if (h instanceof Js) d.push({
			idx: f,
			def: h.definition.concat(r.slice(1)),
			ruleStack: p,
			occurrenceStack: m
		});
		else if (h instanceof qs) d.push(fu(h, f, p, m));
		else throw Error("non exhaustive match");
	}
	return u;
}
P(du, "nextPossibleTokensAfter");
function fu(e, t, n, r) {
	let i = [...n];
	i.push(e.name);
	let a = [...r];
	return a.push(1), {
		idx: t,
		def: e.definition,
		ruleStack: i,
		occurrenceStack: a
	};
}
P(fu, "expandTopLevelRule");
var K;
(function(e) {
	e[e.OPTION = 0] = "OPTION", e[e.REPETITION = 1] = "REPETITION", e[e.REPETITION_MANDATORY = 2] = "REPETITION_MANDATORY", e[e.REPETITION_MANDATORY_WITH_SEPARATOR = 3] = "REPETITION_MANDATORY_WITH_SEPARATOR", e[e.REPETITION_WITH_SEPARATOR = 4] = "REPETITION_WITH_SEPARATOR", e[e.ALTERNATION = 5] = "ALTERNATION";
})(K ||= {});
function pu(e) {
	if (e instanceof Ys || e === "Option") return K.OPTION;
	if (e instanceof U || e === "Repetition") return K.REPETITION;
	if (e instanceof Xs || e === "RepetitionMandatory") return K.REPETITION_MANDATORY;
	if (e instanceof Zs || e === "RepetitionMandatoryWithSeparator") return K.REPETITION_MANDATORY_WITH_SEPARATOR;
	if (e instanceof Qs || e === "RepetitionWithSeparator") return K.REPETITION_WITH_SEPARATOR;
	if (e instanceof $s || e === "Alternation") return K.ALTERNATION;
	throw Error("non exhaustive match");
}
P(pu, "getProdType");
function mu(e) {
	let { occurrence: t, rule: n, prodType: r, maxLookahead: i } = e, a = pu(r);
	return a === K.ALTERNATION ? Tu(t, n, i) : Eu(t, n, a, i);
}
P(mu, "getLookaheadPaths");
function hu(e, t, n, r, i, a) {
	let o = Tu(e, t, n);
	return a(o, r, ku(o) ? yl : vl, i);
}
P(hu, "buildLookaheadFuncForOr");
function gu(e, t, n, r, i, a) {
	let o = Eu(e, t, i, n), s = ku(o) ? yl : vl;
	return a(o[0], s, r);
}
P(gu, "buildLookaheadFuncForOptionalProd");
function _u(e, t, n, r) {
	let i = e.length, a = e.every((e) => e.every((e) => e.length === 1));
	if (t) return function(t) {
		let r = t.map((e) => e.GATE);
		for (let t = 0; t < i; t++) {
			let i = e[t], a = i.length, o = r[t];
			if (o === void 0 || o.call(this) !== !1) e: for (let e = 0; e < a; e++) {
				let r = i[e], a = r.length;
				for (let e = 0; e < a; e++) if (n(this.LA_FAST(e + 1), r[e]) === !1) continue e;
				return t;
			}
		}
	};
	if (a && !r) {
		let t = e.map((e) => e.flat()).reduce((e, t, n) => (t.forEach((t) => {
			t.tokenTypeIdx in e || (e[t.tokenTypeIdx] = n), t.categoryMatches.forEach((t) => {
				Object.hasOwn(e, t) || (e[t] = n);
			});
		}), e), {});
		return function() {
			let e = this.LA_FAST(1);
			return t[e.tokenTypeIdx];
		};
	}
	return function() {
		for (let t = 0; t < i; t++) {
			let r = e[t], i = r.length;
			e: for (let e = 0; e < i; e++) {
				let i = r[e], a = i.length;
				for (let e = 0; e < a; e++) if (n(this.LA_FAST(e + 1), i[e]) === !1) continue e;
				return t;
			}
		}
	};
}
P(_u, "buildAlternativesLookAheadFunc");
function vu(e, t, n) {
	let r = e.every((e) => e.length === 1), i = e.length;
	if (r && !n) {
		let t = e.flat();
		if (t.length === 1 && t[0].categoryMatches.length === 0) {
			let e = t[0].tokenTypeIdx;
			return function() {
				return this.LA_FAST(1).tokenTypeIdx === e;
			};
		}
		{
			let e = t.reduce((e, t, n) => (e[t.tokenTypeIdx] = !0, t.categoryMatches.forEach((t) => {
				e[t] = !0;
			}), e), []);
			return function() {
				let t = this.LA_FAST(1);
				return e[t.tokenTypeIdx] === !0;
			};
		}
	}
	return function() {
		e: for (let n = 0; n < i; n++) {
			let r = e[n], i = r.length;
			for (let e = 0; e < i; e++) if (t(this.LA_FAST(e + 1), r[e]) === !1) continue e;
			return !0;
		}
		return !1;
	};
}
P(vu, "buildSingleAlternativeLookaheadFunction");
var yu = (ae = class extends cc {
	constructor(e, t, n) {
		super(), this.topProd = e, this.targetOccurrence = t, this.targetProdType = n;
	}
	startWalking() {
		return this.walk(this.topProd), this.restDef;
	}
	checkIsTarget(e, t, n, r) {
		return e.idx === this.targetOccurrence && this.targetProdType === t && (this.restDef = n.concat(r), !0);
	}
	walkOption(e, t, n) {
		this.checkIsTarget(e, K.OPTION, t, n) || super.walkOption(e, t, n);
	}
	walkAtLeastOne(e, t, n) {
		this.checkIsTarget(e, K.REPETITION_MANDATORY, t, n) || super.walkOption(e, t, n);
	}
	walkAtLeastOneSep(e, t, n) {
		this.checkIsTarget(e, K.REPETITION_MANDATORY_WITH_SEPARATOR, t, n) || super.walkOption(e, t, n);
	}
	walkMany(e, t, n) {
		this.checkIsTarget(e, K.REPETITION, t, n) || super.walkOption(e, t, n);
	}
	walkManySep(e, t, n) {
		this.checkIsTarget(e, K.REPETITION_WITH_SEPARATOR, t, n) || super.walkOption(e, t, n);
	}
}, P(ae, "RestDefinitionFinderWalker"), ae), bu = (j = class extends rc {
	constructor(e, t, n) {
		super(), this.targetOccurrence = e, this.targetProdType = t, this.targetRef = n, this.result = [];
	}
	checkIsTarget(e, t) {
		e.idx === this.targetOccurrence && this.targetProdType === t && (this.targetRef === void 0 || e === this.targetRef) && (this.result = e.definition);
	}
	visitOption(e) {
		this.checkIsTarget(e, K.OPTION);
	}
	visitRepetition(e) {
		this.checkIsTarget(e, K.REPETITION);
	}
	visitRepetitionMandatory(e) {
		this.checkIsTarget(e, K.REPETITION_MANDATORY);
	}
	visitRepetitionMandatoryWithSeparator(e) {
		this.checkIsTarget(e, K.REPETITION_MANDATORY_WITH_SEPARATOR);
	}
	visitRepetitionWithSeparator(e) {
		this.checkIsTarget(e, K.REPETITION_WITH_SEPARATOR);
	}
	visitAlternation(e) {
		this.checkIsTarget(e, K.ALTERNATION);
	}
}, P(j, "InsideDefinitionFinderVisitor"), j);
function xu(e) {
	let t = Array(e);
	for (let n = 0; n < e; n++) t[n] = [];
	return t;
}
P(xu, "initializeArrayOfArrays");
function Su(e) {
	let t = [""];
	for (let n = 0; n < e.length; n++) {
		let r = e[n], i = [];
		for (let e = 0; e < t.length; e++) {
			let n = t[e];
			i.push(n + "_" + r.tokenTypeIdx);
			for (let e = 0; e < r.categoryMatches.length; e++) {
				let t = "_" + r.categoryMatches[e];
				i.push(n + t);
			}
		}
		t = i;
	}
	return t;
}
P(Su, "pathToHashKeys");
function Cu(e, t, n) {
	for (let r = 0; r < e.length; r++) {
		if (r === n) continue;
		let i = e[r];
		for (let e = 0; e < t.length; e++) if (i[t[e]] === !0) return !1;
	}
	return !0;
}
P(Cu, "isUniquePrefixHash");
function wu(e, t) {
	let n = e.map((e) => uu([e], 1)), r = xu(n.length), i = n.map((e) => {
		let t = {};
		return e.forEach((e) => {
			Su(e.partialPath).forEach((e) => {
				t[e] = !0;
			});
		}), t;
	}), a = n;
	for (let e = 1; e <= t; e++) {
		let n = a;
		a = xu(n.length);
		for (let o = 0; o < n.length; o++) {
			let s = n[o];
			for (let n = 0; n < s.length; n++) {
				let c = s[n].partialPath, l = s[n].suffixDef, u = Su(c);
				if (Cu(i, u, o) || l.length === 0 || c.length === t) {
					let e = r[o];
					if (Du(e, c) === !1) {
						e.push(c);
						for (let e = 0; e < u.length; e++) {
							let t = u[e];
							i[o][t] = !0;
						}
					}
				} else {
					let t = uu(l, e + 1, c);
					a[o] = a[o].concat(t), t.forEach((e) => {
						Su(e.partialPath).forEach((e) => {
							i[o][e] = !0;
						});
					});
				}
			}
		}
	}
	return r;
}
P(wu, "lookAheadSequenceFromAlternatives");
function Tu(e, t, n, r) {
	let i = new bu(e, K.ALTERNATION, r);
	return t.accept(i), wu(i.result, n);
}
P(Tu, "getLookaheadPathsForOr");
function Eu(e, t, n, r) {
	let i = new bu(e, n);
	t.accept(i);
	let a = i.result, o = new yu(t, e, n).startWalking();
	return wu([new Js({ definition: a }), new Js({ definition: o })], r);
}
P(Eu, "getLookaheadPathsForOptionalProd");
function Du(e, t) {
	e: for (let n = 0; n < e.length; n++) {
		let r = e[n];
		if (r.length === t.length) {
			for (let e = 0; e < r.length; e++) {
				let n = t[e], i = r[e];
				if (n !== i && i.categoryMatchesMap[n.tokenTypeIdx] === void 0) continue e;
			}
			return !0;
		}
	}
	return !1;
}
P(Du, "containsPath");
function Ou(e, t) {
	return e.length < t.length && e.every((e, n) => {
		let r = t[n];
		return e === r || r.categoryMatchesMap[e.tokenTypeIdx];
	});
}
P(Ou, "isStrictPrefixOfPath");
function ku(e) {
	return e.every((e) => e.every((e) => e.every((e) => e.categoryMatches.length === 0)));
}
P(ku, "areTokenCategoriesNotUsed");
function Au(e) {
	return e.lookaheadStrategy.validate({
		rules: e.rules,
		tokenTypes: e.tokenTypes,
		grammarName: e.grammarName
	}).map((e) => Object.assign({ type: rf.CUSTOM_LOOKAHEAD_VALIDATION }, e));
}
P(Au, "validateLookahead");
function ju(e, t, n, r) {
	let i = e.flatMap((e) => Mu(e, n)), a = Ju(e, t, n), o = e.flatMap((e) => Wu(e, n)), s = e.flatMap((t) => Iu(t, e, r, n));
	return i.concat(a, o, s);
}
P(ju, "validateGrammar");
function Mu(e, t) {
	let n = new Fu();
	e.accept(n);
	let r = n.allProductions, i = Object.groupBy(r, Nu), a = Object.fromEntries(Object.entries(i).filter(([e, t]) => t.length > 1));
	return Object.values(a).map((n) => {
		let r = n[0], i = t.buildDuplicateFoundError(e, n), a = sc(r), o = {
			message: i,
			type: rf.DUPLICATE_PRODUCTIONS,
			ruleName: e.name,
			dslName: a,
			occurrence: r.idx
		}, s = Pu(r);
		return s && (o.parameter = s), o;
	});
}
P(Mu, "validateDuplicateProductions");
function Nu(e) {
	return `${sc(e)}_#_${e.idx}_#_${Pu(e)}`;
}
P(Nu, "identifyProductionForDuplicates");
function Pu(e) {
	return e instanceof W ? e.terminalType.name : e instanceof Ks ? e.nonTerminalName : "";
}
P(Pu, "getExtraProductionArgument");
var Fu = (oe = class extends rc {
	constructor() {
		super(...arguments), this.allProductions = [];
	}
	visitNonTerminal(e) {
		this.allProductions.push(e);
	}
	visitOption(e) {
		this.allProductions.push(e);
	}
	visitRepetitionWithSeparator(e) {
		this.allProductions.push(e);
	}
	visitRepetitionMandatory(e) {
		this.allProductions.push(e);
	}
	visitRepetitionMandatoryWithSeparator(e) {
		this.allProductions.push(e);
	}
	visitRepetition(e) {
		this.allProductions.push(e);
	}
	visitAlternation(e) {
		this.allProductions.push(e);
	}
	visitTerminal(e) {
		this.allProductions.push(e);
	}
}, P(oe, "OccurrenceValidationCollector"), oe);
function Iu(e, t, n, r) {
	let i = [];
	if (t.reduce((t, n) => n.name === e.name ? t + 1 : t, 0) > 1) {
		let t = r.buildDuplicateRuleNameError({
			topLevelRule: e,
			grammarName: n
		});
		i.push({
			message: t,
			type: rf.DUPLICATE_RULE_NAME,
			ruleName: e.name
		});
	}
	return i;
}
P(Iu, "validateRuleDoesNotAlreadyExist");
function Lu(e, t, n) {
	let r = [], i;
	return t.includes(e) || (i = `Invalid rule override, rule: ->${e}<- cannot be overridden in the grammar: ->${n}<-as it is not defined in any of the super grammars `, r.push({
		message: i,
		type: rf.INVALID_RULE_OVERRIDE,
		ruleName: e
	})), r;
}
P(Lu, "validateRuleIsOverridden");
function Ru(e, t, n, r = []) {
	let i = [], a = zu(t.definition);
	if (a.length === 0) return [];
	{
		let t = e.name;
		a.includes(e) && i.push({
			message: n.buildLeftRecursionError({
				topLevelRule: e,
				leftRecursionPath: r
			}),
			type: rf.LEFT_RECURSION,
			ruleName: t
		});
		let o = r.concat([e]), s = a.filter((e) => !o.includes(e)).flatMap((t) => {
			let i = [...r];
			return i.push(t), Ru(e, t, n, i);
		});
		return i.concat(s);
	}
}
P(Ru, "validateNoLeftRecursion");
function zu(e) {
	let t = [];
	if (e.length === 0) return t;
	let n = e[0];
	if (n instanceof Ks) t.push(n.referencedRule);
	else if (n instanceof Js || n instanceof Ys || n instanceof Xs || n instanceof Zs || n instanceof Qs || n instanceof U) t = t.concat(zu(n.definition));
	else if (n instanceof $s) t = n.definition.map((e) => zu(e.definition)).flat();
	else if (!(n instanceof W)) throw Error("non exhaustive match");
	let r = ac(n), i = e.length > 1;
	if (r && i) {
		let n = e.slice(1);
		return t.concat(zu(n));
	}
	return t;
}
P(zu, "getFirstNoneTerminal");
var Bu = (se = class extends rc {
	constructor() {
		super(...arguments), this.alternations = [];
	}
	visitAlternation(e) {
		this.alternations.push(e);
	}
}, P(se, "OrCollector"), se);
function Vu(e, t) {
	let n = new Bu();
	return e.accept(n), n.alternations.flatMap((n) => n.definition.slice(0, -1).flatMap((r, i) => du([r], [], vl, 1).length === 0 ? [{
		message: t.buildEmptyAlternationError({
			topLevelRule: e,
			alternation: n,
			emptyChoiceIdx: i
		}),
		type: rf.NONE_LAST_EMPTY_ALT,
		ruleName: e.name,
		occurrence: n.idx,
		alternative: i + 1
	}] : []));
}
P(Vu, "validateEmptyOrAlternative");
function Hu(e, t, n) {
	let r = new Bu();
	e.accept(r);
	let i = r.alternations;
	return i = i.filter((e) => e.ignoreAmbiguities !== !0), i.flatMap((r) => {
		let i = r.idx, a = Tu(i, e, r.maxLookahead || t, r), o = Ku(a, r, e, n), s = qu(a, r, e, n);
		return o.concat(s);
	});
}
P(Hu, "validateAmbiguousAlternationAlternatives");
var Uu = (ce = class extends rc {
	constructor() {
		super(...arguments), this.allProductions = [];
	}
	visitRepetitionWithSeparator(e) {
		this.allProductions.push(e);
	}
	visitRepetitionMandatory(e) {
		this.allProductions.push(e);
	}
	visitRepetitionMandatoryWithSeparator(e) {
		this.allProductions.push(e);
	}
	visitRepetition(e) {
		this.allProductions.push(e);
	}
}, P(ce, "RepetitionCollector"), ce);
function Wu(e, t) {
	let n = new Bu();
	return e.accept(n), n.alternations.flatMap((n) => n.definition.length > 255 ? [{
		message: t.buildTooManyAlternativesError({
			topLevelRule: e,
			alternation: n
		}),
		type: rf.TOO_MANY_ALTS,
		ruleName: e.name,
		occurrence: n.idx
	}] : []);
}
P(Wu, "validateTooManyAlts");
function Gu(e, t, n) {
	let r = [];
	return e.forEach((e) => {
		let i = new Uu();
		e.accept(i), i.allProductions.forEach((i) => {
			let a = pu(i), o = i.maxLookahead || t, s = i.idx;
			if (Eu(s, e, a, o)[0].flat().length === 0) {
				let t = n.buildEmptyRepetitionError({
					topLevelRule: e,
					repetition: i
				});
				r.push({
					message: t,
					type: rf.NO_NON_EMPTY_LOOKAHEAD,
					ruleName: e.name
				});
			}
		});
	}), r;
}
P(Gu, "validateSomeNonEmptyLookaheadPath");
function Ku(e, t, n, r) {
	let i = [];
	return e.reduce((n, r, a) => (t.definition[a].ignoreAmbiguities === !0 || r.forEach((r) => {
		let o = [a];
		e.forEach((e, n) => {
			a !== n && Du(e, r) && t.definition[n].ignoreAmbiguities !== !0 && o.push(n);
		}), o.length > 1 && !Du(i, r) && (i.push(r), n.push({
			alts: o,
			path: r
		}));
	}), n), []).map((e) => {
		let i = e.alts.map((e) => e + 1);
		return {
			message: r.buildAlternationAmbiguityError({
				topLevelRule: n,
				alternation: t,
				ambiguityIndices: i,
				prefixPath: e.path
			}),
			type: rf.AMBIGUOUS_ALTS,
			ruleName: n.name,
			occurrence: t.idx,
			alternatives: e.alts
		};
	});
}
P(Ku, "checkAlternativesAmbiguities");
function qu(e, t, n, r) {
	let i = e.reduce((e, t, n) => {
		let r = t.map((e) => ({
			idx: n,
			path: e
		}));
		return e.concat(r);
	}, []);
	return i.flatMap((e) => {
		if (t.definition[e.idx].ignoreAmbiguities === !0) return [];
		let a = e.idx, o = e.path;
		return i.filter((e) => t.definition[e.idx].ignoreAmbiguities !== !0 && e.idx < a && Ou(e.path, o)).map((e) => {
			let i = [e.idx + 1, a + 1], o = t.idx === 0 ? "" : t.idx;
			return {
				message: r.buildAlternationPrefixAmbiguityError({
					topLevelRule: n,
					alternation: t,
					ambiguityIndices: i,
					prefixPath: e.path
				}),
				type: rf.AMBIGUOUS_PREFIX_ALTS,
				ruleName: n.name,
				occurrence: o,
				alternatives: i
			};
		});
	});
}
P(qu, "checkPrefixAlternativesAmbiguities");
function Ju(e, t, n) {
	let r = [], i = t.map((e) => e.name);
	return e.forEach((e) => {
		let t = e.name;
		if (i.includes(t)) {
			let i = n.buildNamespaceConflictError(e);
			r.push({
				message: i,
				type: rf.CONFLICT_TOKENS_RULES_NAMESPACE,
				ruleName: t
			});
		}
	}), r;
}
P(Ju, "checkTerminalAndNoneTerminalsNameSpace");
function Yu(e) {
	let t = Object.assign({ errMsgProvider: $l }, e), n = {};
	return e.rules.forEach((e) => {
		n[e.name] = e;
	}), tu(n, t.errMsgProvider);
}
P(Yu, "resolveGrammar");
function Xu(e) {
	let t = e.errMsgProvider ?? eu;
	return ju(e.rules, e.tokenTypes, t, e.grammarName);
}
P(Xu, "validateGrammar");
var Zu = "MismatchedTokenException", Qu = "NoViableAltException", $u = "EarlyExitException", ed = "NotAllInputParsedException", td = [
	Zu,
	Qu,
	$u,
	ed
];
Object.freeze(td);
function nd(e) {
	return td.includes(e.name);
}
P(nd, "isRecognitionException");
var rd = (M = class extends Error {
	constructor(e, t) {
		super(e), this.token = t, this.resyncedTokens = [], Object.setPrototypeOf(this, new.target.prototype), Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
	}
}, P(M, "RecognitionException"), M), id = (le = class extends rd {
	constructor(e, t, n) {
		super(e, t), this.previousToken = n, this.name = Zu;
	}
}, P(le, "MismatchedTokenException"), le), ad = (N = class extends rd {
	constructor(e, t, n) {
		super(e, t), this.previousToken = n, this.name = Qu;
	}
}, P(N, "NoViableAltException"), N), od = (ue = class extends rd {
	constructor(e, t) {
		super(e, t), this.name = ed;
	}
}, P(ue, "NotAllInputParsedException"), ue), sd = (de = class extends rd {
	constructor(e, t, n) {
		super(e, t), this.previousToken = n, this.name = $u;
	}
}, P(de, "EarlyExitException"), de), cd = {}, ld = "InRuleRecoveryException", ud = (fe = class extends Error {
	constructor(e) {
		super(e), this.name = ld;
	}
}, P(fe, "InRuleRecoveryException"), fe), dd = (pe = class {
	initRecoverable(e) {
		this.firstAfterRepMap = [], this.resyncFollows = {}, this.recoveryEnabled = Object.hasOwn(e, "recoveryEnabled") ? e.recoveryEnabled : tf.recoveryEnabled, this.recoveryEnabled && (this.attemptInRepetitionRecovery = fd);
	}
	getTokenToInsert(e) {
		let t = Xl(e, "", -1, -1, -1, -1, -1, -1);
		return t.isInsertedInRecovery = !0, t;
	}
	canTokenTypeBeInsertedInRecovery(e) {
		return !0;
	}
	canTokenTypeBeDeletedInRecovery(e) {
		return !0;
	}
	tryInRepetitionRecovery(e, t, n, r) {
		let i = this.findReSyncTokenType(), a = this.exportLexerState(), o = [], s = !1, c = this.LA_FAST(1), l = this.LA_FAST(1), u = /* @__PURE__ */ P(() => {
			let e = this.LA(0), t = new id(this.errorMessageProvider.buildMismatchTokenMessage({
				expected: r,
				actual: c,
				previous: e,
				ruleName: this.getCurrRuleFullName()
			}), c, this.LA(0));
			t.resyncedTokens = o.slice(0, -1), this.SAVE_ERROR(t);
		}, "generateErrorMessage");
		for (; !s;) if (this.tokenMatcher(l, r)) {
			u();
			return;
		} else if (n.call(this)) {
			u(), e.apply(this, t);
			return;
		} else this.tokenMatcher(l, i) ? s = !0 : (l = this.SKIP_TOKEN(), this.addToResyncTokens(l, o));
		this.importLexerState(a);
	}
	shouldInRepetitionRecoveryBeTried(e, t, n) {
		return !(n === !1 || this.tokenMatcher(this.LA_FAST(1), e) || this.isBackTracking() || this.canPerformInRuleRecovery(e, this.getFollowsForInRuleRecovery(e, t)));
	}
	getNextPossibleTokenTypes(e) {
		let t = e.ruleStack[0], n = this.getGAstProductions()[t];
		return new iu(n, e).startWalking();
	}
	getFollowsForInRuleRecovery(e, t) {
		let n = this.getCurrentGrammarPath(e, t);
		return this.getNextPossibleTokenTypes(n);
	}
	tryInRuleRecovery(e, t) {
		if (this.canRecoverWithSingleTokenInsertion(e, t)) return this.getTokenToInsert(e);
		if (this.canRecoverWithSingleTokenDeletion(e)) {
			let e = this.SKIP_TOKEN();
			return this.consumeToken(), e;
		}
		throw new ud("sad sad panda");
	}
	canPerformInRuleRecovery(e, t) {
		return this.canRecoverWithSingleTokenInsertion(e, t) || this.canRecoverWithSingleTokenDeletion(e);
	}
	canRecoverWithSingleTokenInsertion(e, t) {
		if (!this.canTokenTypeBeInsertedInRecovery(e) || t.length === 0) return !1;
		let n = this.LA_FAST(1);
		return t.find((e) => this.tokenMatcher(n, e)) !== void 0;
	}
	canRecoverWithSingleTokenDeletion(e) {
		return this.canTokenTypeBeDeletedInRecovery(e) ? this.tokenMatcher(this.LA(2), e) : !1;
	}
	isInCurrentRuleReSyncSet(e) {
		let t = this.getCurrFollowKey();
		return this.getFollowSetFromFollowKey(t).includes(e);
	}
	findReSyncTokenType() {
		let e = this.flattenFollowSet(), t = this.LA_FAST(1), n = 2;
		for (;;) {
			let r = e.find((e) => Zl(t, e));
			if (r !== void 0) return r;
			t = this.LA(n), n++;
		}
	}
	getCurrFollowKey() {
		if (this.RULE_STACK_IDX === 0) return cd;
		let e = this.currRuleShortName, t = this.getLastExplicitRuleOccurrenceIndex(), n = this.getPreviousExplicitRuleShortName();
		return {
			ruleName: this.shortRuleNameToFullName(e),
			idxInCallingRule: t,
			inRule: this.shortRuleNameToFullName(n)
		};
	}
	buildFullFollowKeyStack() {
		let e = this.RULE_STACK, t = this.RULE_OCCURRENCE_STACK, n = this.RULE_STACK_IDX + 1, r = Array(n);
		for (let i = 0; i < n; i++) i === 0 ? r[i] = cd : r[i] = {
			ruleName: this.shortRuleNameToFullName(e[i]),
			idxInCallingRule: t[i],
			inRule: this.shortRuleNameToFullName(e[i - 1])
		};
		return r;
	}
	flattenFollowSet() {
		return this.buildFullFollowKeyStack().map((e) => this.getFollowSetFromFollowKey(e)).flat();
	}
	getFollowSetFromFollowKey(e) {
		if (e === cd) return [Yl];
		let t = e.ruleName + e.idxInCallingRule + mc + e.inRule;
		return this.resyncFollows[t];
	}
	addToResyncTokens(e, t) {
		return this.tokenMatcher(e, Yl) || t.push(e), t;
	}
	reSyncTo(e) {
		let t = [], n = this.LA_FAST(1);
		for (; this.tokenMatcher(n, e) === !1;) n = this.SKIP_TOKEN(), this.addToResyncTokens(n, t);
		return t.slice(0, -1);
	}
	attemptInRepetitionRecovery(e, t, n, r, i, a, o) {}
	getCurrentGrammarPath(e, t) {
		return {
			ruleStack: this.getHumanReadableRuleStack(),
			occurrenceStack: this.RULE_OCCURRENCE_STACK.slice(0, this.RULE_OCCURRENCE_STACK_IDX + 1),
			lastTok: e,
			lastTokOccurrence: t
		};
	}
	getHumanReadableRuleStack() {
		let e = this.RULE_STACK_IDX + 1, t = Array(e);
		for (let n = 0; n < e; n++) t[n] = this.shortRuleNameToFullName(this.RULE_STACK[n]);
		return t;
	}
}, P(pe, "Recoverable"), pe);
function fd(e, t, n, r, i, a, o) {
	var s, c;
	let l = r | i, u = (s = this.firstAfterRepMap)[c = this.currRuleShortName] ?? (s[c] = []), d = u[l];
	if (d === void 0) {
		let e = this.getCurrRuleFullName(), t = this.getGAstProductions()[e];
		d = new a(t, i).startWalking(), u[l] = d;
	}
	let f = d.token, p = d.occurrence, m = d.isEndOfRule;
	this.RULE_STACK_IDX === 0 && m && f === void 0 && (f = Yl, p = 1), f !== void 0 && p !== void 0 && this.shouldInRepetitionRecoveryBeTried(f, p, o) && this.tryInRepetitionRecovery(e, t, n, f);
}
P(fd, "attemptInRepetitionRecovery");
var pd = 8, md = 1 << pd, hd = 2 << pd, gd = 3 << pd, _d = 4 << pd, vd = 5 << pd, yd = 6 << pd, bd = (me = class {
	constructor(e) {
		this.maxLookahead = e?.maxLookahead ?? tf.maxLookahead;
	}
	validate(e) {
		let t = this.validateNoLeftRecursion(e.rules);
		if (t.length === 0) {
			let n = this.validateEmptyOrAlternatives(e.rules), r = this.validateAmbiguousAlternationAlternatives(e.rules, this.maxLookahead), i = this.validateSomeNonEmptyLookaheadPath(e.rules, this.maxLookahead);
			return [
				...t,
				...n,
				...r,
				...i
			];
		}
		return t;
	}
	validateNoLeftRecursion(e) {
		return e.flatMap((e) => Ru(e, e, eu));
	}
	validateEmptyOrAlternatives(e) {
		return e.flatMap((e) => Vu(e, eu));
	}
	validateAmbiguousAlternationAlternatives(e, t) {
		return e.flatMap((e) => Hu(e, t, eu));
	}
	validateSomeNonEmptyLookaheadPath(e, t) {
		return Gu(e, t, eu);
	}
	buildLookaheadForAlternation(e) {
		return hu(e.prodOccurrence, e.rule, e.maxLookahead, e.hasPredicates, e.dynamicTokensEnabled, _u);
	}
	buildLookaheadForOptional(e) {
		return gu(e.prodOccurrence, e.rule, e.maxLookahead, e.dynamicTokensEnabled, pu(e.prodType), vu);
	}
}, P(me, "LLkLookaheadStrategy"), me), xd = (he = class {
	initLooksAhead(e) {
		this.dynamicTokensEnabled = Object.hasOwn(e, "dynamicTokensEnabled") ? e.dynamicTokensEnabled : tf.dynamicTokensEnabled, this.maxLookahead = Object.hasOwn(e, "maxLookahead") ? e.maxLookahead : tf.maxLookahead, this.lookaheadStrategy = Object.hasOwn(e, "lookaheadStrategy") ? e.lookaheadStrategy : new bd({ maxLookahead: this.maxLookahead }), this.lookAheadFuncsCache = [], this.currRuleLookaheadFuncs = [];
	}
	preComputeLookaheadFunctions(e) {
		e.forEach((e) => {
			this.TRACE_INIT(`${e.name} Rule Lookahead`, () => {
				let { alternation: t, repetition: n, option: r, repetitionMandatory: i, repetitionMandatoryWithSeparator: a, repetitionWithSeparator: o } = Cd(e);
				t.forEach((t) => {
					let n = t.idx === 0 ? "" : t.idx;
					this.TRACE_INIT(`${sc(t)}${n}`, () => {
						let n = this.lookaheadStrategy.buildLookaheadForAlternation({
							prodOccurrence: t.idx,
							rule: e,
							maxLookahead: t.maxLookahead || this.maxLookahead,
							hasPredicates: t.hasPredicates,
							dynamicTokensEnabled: this.dynamicTokensEnabled
						});
						this.setLaFuncCache(this.fullRuleNameToShort[e.name], md | t.idx, n);
					});
				}), n.forEach((t) => {
					this.computeLookaheadFunc(e, t.idx, gd, "Repetition", t.maxLookahead, sc(t));
				}), r.forEach((t) => {
					this.computeLookaheadFunc(e, t.idx, hd, "Option", t.maxLookahead, sc(t));
				}), i.forEach((t) => {
					this.computeLookaheadFunc(e, t.idx, _d, "RepetitionMandatory", t.maxLookahead, sc(t));
				}), a.forEach((t) => {
					this.computeLookaheadFunc(e, t.idx, yd, "RepetitionMandatoryWithSeparator", t.maxLookahead, sc(t));
				}), o.forEach((t) => {
					this.computeLookaheadFunc(e, t.idx, vd, "RepetitionWithSeparator", t.maxLookahead, sc(t));
				});
			});
		});
	}
	computeLookaheadFunc(e, t, n, r, i, a) {
		this.TRACE_INIT(`${a}${t === 0 ? "" : t}`, () => {
			let a = this.lookaheadStrategy.buildLookaheadForOptional({
				prodOccurrence: t,
				rule: e,
				maxLookahead: i || this.maxLookahead,
				dynamicTokensEnabled: this.dynamicTokensEnabled,
				prodType: r
			});
			this.setLaFuncCache(this.fullRuleNameToShort[e.name], n | t, a);
		});
	}
	setLaFuncCache(e, t, n) {
		let r = this.lookAheadFuncsCache[e];
		r === void 0 && (r = [], this.lookAheadFuncsCache[e] = r), r[t] = n;
	}
}, P(he, "LooksAhead"), he), Sd = new (ge = class extends rc {
	constructor() {
		super(...arguments), this.dslMethods = {
			option: [],
			alternation: [],
			repetition: [],
			repetitionWithSeparator: [],
			repetitionMandatory: [],
			repetitionMandatoryWithSeparator: []
		};
	}
	reset() {
		this.dslMethods = {
			option: [],
			alternation: [],
			repetition: [],
			repetitionWithSeparator: [],
			repetitionMandatory: [],
			repetitionMandatoryWithSeparator: []
		};
	}
	visitOption(e) {
		this.dslMethods.option.push(e);
	}
	visitRepetitionWithSeparator(e) {
		this.dslMethods.repetitionWithSeparator.push(e);
	}
	visitRepetitionMandatory(e) {
		this.dslMethods.repetitionMandatory.push(e);
	}
	visitRepetitionMandatoryWithSeparator(e) {
		this.dslMethods.repetitionMandatoryWithSeparator.push(e);
	}
	visitRepetition(e) {
		this.dslMethods.repetition.push(e);
	}
	visitAlternation(e) {
		this.dslMethods.alternation.push(e);
	}
}, P(ge, "DslMethodsCollectorVisitor"), ge)();
function Cd(e) {
	Sd.reset(), e.accept(Sd);
	let t = Sd.dslMethods;
	return Sd.reset(), t;
}
P(Cd, "collectMethods");
function wd(e, t) {
	e.startOffset === -1 ? (e.startOffset = t.startOffset, e.endOffset = t.endOffset) : e.endOffset < t.endOffset && (e.endOffset = t.endOffset);
}
P(wd, "setNodeLocationOnlyOffset");
function Td(e, t) {
	e.startOffset === -1 ? (e.startOffset = t.startOffset, e.startColumn = t.startColumn, e.startLine = t.startLine, e.endOffset = t.endOffset, e.endColumn = t.endColumn, e.endLine = t.endLine) : e.endOffset < t.endOffset && (e.endOffset = t.endOffset, e.endColumn = t.endColumn, e.endLine = t.endLine);
}
P(Td, "setNodeLocationFull");
function Ed(e, t, n) {
	e.children[n] === void 0 ? e.children[n] = [t] : e.children[n].push(t);
}
P(Ed, "addTerminalToCst");
function Dd(e, t, n) {
	e.children[t] === void 0 ? e.children[t] = [n] : e.children[t].push(n);
}
P(Dd, "addNoneTerminalToCst");
var Od = "name";
function kd(e, t) {
	Object.defineProperty(e, Od, {
		enumerable: !1,
		configurable: !0,
		writable: !1,
		value: t
	});
}
P(kd, "defineNameProp");
function Ad(e, t) {
	let n = Object.keys(e), r = n.length;
	for (let i = 0; i < r; i++) {
		let r = e[n[i]], a = r.length;
		for (let e = 0; e < a; e++) {
			let n = r[e];
			n.tokenTypeIdx === void 0 && this[n.name](n.children, t);
		}
	}
}
P(Ad, "defaultVisit");
function jd(e, t) {
	let n = /* @__PURE__ */ P(function() {}, "derivedConstructor");
	return kd(n, e + "BaseSemantics"), n.prototype = {
		visit: /* @__PURE__ */ P(function(e, t) {
			if (Array.isArray(e) && (e = e[0]), e !== void 0) return this[e.name](e.children, t);
		}, "visit"),
		validateVisitor: /* @__PURE__ */ P(function() {
			let e = Pd(this, t);
			if (e.length !== 0) {
				let t = e.map((e) => e.msg);
				throw Error(`Errors Detected in CST Visitor <${this.constructor.name}>:
	${t.join("\n\n").replace(/\n/g, "\n	")}`);
			}
		}, "validateVisitor")
	}, n.prototype.constructor = n, n._RULE_NAMES = t, n;
}
P(jd, "createBaseSemanticVisitorConstructor");
function Md(e, t, n) {
	let r = /* @__PURE__ */ P(function() {}, "derivedConstructor");
	kd(r, e + "BaseSemanticsWithDefaults");
	let i = Object.create(n.prototype);
	return t.forEach((e) => {
		i[e] = Ad;
	}), r.prototype = i, r.prototype.constructor = r, r;
}
P(Md, "createBaseVisitorConstructorWithDefaults");
var Nd;
(function(e) {
	e[e.REDUNDANT_METHOD = 0] = "REDUNDANT_METHOD", e[e.MISSING_METHOD = 1] = "MISSING_METHOD";
})(Nd ||= {});
function Pd(e, t) {
	return Fd(e, t);
}
P(Pd, "validateVisitor");
function Fd(e, t) {
	return t.filter((t) => typeof e[t] != "function").map((t) => ({
		msg: `Missing visitor method: <${t}> on ${e.constructor.name} CST Visitor.`,
		type: Nd.MISSING_METHOD,
		methodName: t
	})).filter(Boolean);
}
P(Fd, "validateMissingCstMethods");
var Id = (_e = class {
	initTreeBuilder(e) {
		if (this.CST_STACK = [], this.outputCst = e.outputCst, this.nodeLocationTracking = Object.hasOwn(e, "nodeLocationTracking") ? e.nodeLocationTracking : tf.nodeLocationTracking, !this.outputCst) this.cstInvocationStateUpdate = () => {}, this.cstFinallyStateUpdate = () => {}, this.cstPostTerminal = () => {}, this.cstPostNonTerminal = () => {}, this.cstPostRule = () => {};
		else if (/full/i.test(this.nodeLocationTracking)) this.recoveryEnabled ? (this.setNodeLocationFromToken = Td, this.setNodeLocationFromNode = Td, this.cstPostRule = () => {}, this.setInitialNodeLocation = this.setInitialNodeLocationFullRecovery) : (this.setNodeLocationFromToken = () => {}, this.setNodeLocationFromNode = () => {}, this.cstPostRule = this.cstPostRuleFull, this.setInitialNodeLocation = this.setInitialNodeLocationFullRegular);
		else if (/onlyOffset/i.test(this.nodeLocationTracking)) this.recoveryEnabled ? (this.setNodeLocationFromToken = wd, this.setNodeLocationFromNode = wd, this.cstPostRule = () => {}, this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRecovery) : (this.setNodeLocationFromToken = () => {}, this.setNodeLocationFromNode = () => {}, this.cstPostRule = this.cstPostRuleOnlyOffset, this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRegular);
		else if (/none/i.test(this.nodeLocationTracking)) this.setNodeLocationFromToken = () => {}, this.setNodeLocationFromNode = () => {}, this.cstPostRule = () => {}, this.setInitialNodeLocation = () => {};
		else throw Error(`Invalid <nodeLocationTracking> config option: "${e.nodeLocationTracking}"`);
	}
	setInitialNodeLocationOnlyOffsetRecovery(e) {
		e.location = {
			startOffset: -1,
			endOffset: -1
		};
	}
	setInitialNodeLocationOnlyOffsetRegular(e) {
		e.location = {
			startOffset: this.LA_FAST(1).startOffset,
			endOffset: -1
		};
	}
	setInitialNodeLocationFullRecovery(e) {
		e.location = {
			startOffset: -1,
			startLine: -1,
			startColumn: -1,
			endOffset: -1,
			endLine: -1,
			endColumn: -1
		};
	}
	setInitialNodeLocationFullRegular(e) {
		let t = this.LA_FAST(1);
		e.location = {
			startOffset: t.startOffset,
			startLine: t.startLine,
			startColumn: t.startColumn,
			endOffset: -1,
			endLine: -1,
			endColumn: -1
		};
	}
	cstInvocationStateUpdate(e) {
		let t = {
			name: e,
			children: /* @__PURE__ */ Object.create(null)
		};
		this.setInitialNodeLocation(t), this.CST_STACK.push(t);
	}
	cstFinallyStateUpdate() {
		this.CST_STACK.pop();
	}
	cstPostRuleFull(e) {
		let t = this.LA(0), n = e.location;
		n.startOffset !== -1 && n.startOffset <= t.startOffset ? (n.endOffset = t.endOffset, n.endLine = t.endLine, n.endColumn = t.endColumn) : (n.startOffset = -1, n.startLine = -1, n.startColumn = -1);
	}
	cstPostRuleOnlyOffset(e) {
		let t = this.LA(0), n = e.location;
		n.startOffset !== -1 && n.startOffset <= t.startOffset ? n.endOffset = t.endOffset : n.startOffset = -1;
	}
	cstPostTerminal(e, t) {
		let n = this.CST_STACK[this.CST_STACK.length - 1];
		Ed(n, t, e), this.setNodeLocationFromToken(n.location, t);
	}
	cstPostNonTerminal(e, t) {
		let n = this.CST_STACK[this.CST_STACK.length - 1];
		Dd(n, t, e), this.setNodeLocationFromNode(n.location, e.location);
	}
	get currCSTNode() {
		let e = this;
		return e.CST_STACK[e.CST_STACK.length - 1];
	}
	getBaseCstVisitorConstructor() {
		if (this.baseCstVisitorConstructor === void 0) {
			let e = jd(this.className, Object.keys(this.gastProductionsCache));
			return this.baseCstVisitorConstructor = e, e;
		}
		return this.baseCstVisitorConstructor;
	}
	getBaseCstVisitorConstructorWithDefaults() {
		if (this.baseCstVisitorWithDefaultsConstructor === void 0) {
			let e = Md(this.className, Object.keys(this.gastProductionsCache), this.getBaseCstVisitorConstructor());
			return this.baseCstVisitorWithDefaultsConstructor = e, e;
		}
		return this.baseCstVisitorWithDefaultsConstructor;
	}
	getPreviousExplicitRuleShortName() {
		return this.RULE_STACK[this.RULE_STACK_IDX - 1];
	}
	getLastExplicitRuleOccurrenceIndex() {
		return this.RULE_OCCURRENCE_STACK[this.RULE_OCCURRENCE_STACK_IDX];
	}
}, P(_e, "TreeBuilder"), _e), Ld = (ve = class {
	initLexerAdapter() {
		this.tokVector = [], this.tokVectorLength = 0, this.currIdx = -1;
	}
	set input(e) {
		if (this.selfAnalysisDone !== !0) throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");
		this.reset(), this.tokVector = e, this.tokVectorLength = e.length;
	}
	get input() {
		return this.tokVector;
	}
	SKIP_TOKEN() {
		return this.currIdx <= this.tokVectorLength - 2 ? (this.consumeToken(), this.LA_FAST(1)) : ef;
	}
	LA_FAST(e) {
		let t = this.currIdx + e;
		return this.tokVector[t];
	}
	LA(e) {
		let t = this.currIdx + e;
		return t < 0 || this.tokVectorLength <= t ? ef : this.tokVector[t];
	}
	consumeToken() {
		this.currIdx++;
	}
	exportLexerState() {
		return this.currIdx;
	}
	importLexerState(e) {
		this.currIdx = e;
	}
	resetLexerState() {
		this.currIdx = -1;
	}
	moveToTerminatedState() {
		this.currIdx = this.tokVectorLength - 1;
	}
	getLexerPosition() {
		return this.exportLexerState();
	}
}, P(ve, "LexerAdapter"), ve), Rd = (ye = class {
	ACTION(e) {
		return e.call(this);
	}
	consume(e, t, n) {
		return this.consumeInternal(t, e, n);
	}
	subrule(e, t, n) {
		return this.subruleInternal(t, e, n);
	}
	option(e, t) {
		return this.optionInternal(t, e);
	}
	or(e, t) {
		return this.orInternal(t, e);
	}
	many(e, t) {
		return this.manyInternal(e, t);
	}
	atLeastOne(e, t) {
		return this.atLeastOneInternal(e, t);
	}
	CONSUME(e, t) {
		return this.consumeInternal(e, 0, t);
	}
	CONSUME1(e, t) {
		return this.consumeInternal(e, 1, t);
	}
	CONSUME2(e, t) {
		return this.consumeInternal(e, 2, t);
	}
	CONSUME3(e, t) {
		return this.consumeInternal(e, 3, t);
	}
	CONSUME4(e, t) {
		return this.consumeInternal(e, 4, t);
	}
	CONSUME5(e, t) {
		return this.consumeInternal(e, 5, t);
	}
	CONSUME6(e, t) {
		return this.consumeInternal(e, 6, t);
	}
	CONSUME7(e, t) {
		return this.consumeInternal(e, 7, t);
	}
	CONSUME8(e, t) {
		return this.consumeInternal(e, 8, t);
	}
	CONSUME9(e, t) {
		return this.consumeInternal(e, 9, t);
	}
	SUBRULE(e, t) {
		return this.subruleInternal(e, 0, t);
	}
	SUBRULE1(e, t) {
		return this.subruleInternal(e, 1, t);
	}
	SUBRULE2(e, t) {
		return this.subruleInternal(e, 2, t);
	}
	SUBRULE3(e, t) {
		return this.subruleInternal(e, 3, t);
	}
	SUBRULE4(e, t) {
		return this.subruleInternal(e, 4, t);
	}
	SUBRULE5(e, t) {
		return this.subruleInternal(e, 5, t);
	}
	SUBRULE6(e, t) {
		return this.subruleInternal(e, 6, t);
	}
	SUBRULE7(e, t) {
		return this.subruleInternal(e, 7, t);
	}
	SUBRULE8(e, t) {
		return this.subruleInternal(e, 8, t);
	}
	SUBRULE9(e, t) {
		return this.subruleInternal(e, 9, t);
	}
	OPTION(e) {
		return this.optionInternal(e, 0);
	}
	OPTION1(e) {
		return this.optionInternal(e, 1);
	}
	OPTION2(e) {
		return this.optionInternal(e, 2);
	}
	OPTION3(e) {
		return this.optionInternal(e, 3);
	}
	OPTION4(e) {
		return this.optionInternal(e, 4);
	}
	OPTION5(e) {
		return this.optionInternal(e, 5);
	}
	OPTION6(e) {
		return this.optionInternal(e, 6);
	}
	OPTION7(e) {
		return this.optionInternal(e, 7);
	}
	OPTION8(e) {
		return this.optionInternal(e, 8);
	}
	OPTION9(e) {
		return this.optionInternal(e, 9);
	}
	OR(e) {
		return this.orInternal(e, 0);
	}
	OR1(e) {
		return this.orInternal(e, 1);
	}
	OR2(e) {
		return this.orInternal(e, 2);
	}
	OR3(e) {
		return this.orInternal(e, 3);
	}
	OR4(e) {
		return this.orInternal(e, 4);
	}
	OR5(e) {
		return this.orInternal(e, 5);
	}
	OR6(e) {
		return this.orInternal(e, 6);
	}
	OR7(e) {
		return this.orInternal(e, 7);
	}
	OR8(e) {
		return this.orInternal(e, 8);
	}
	OR9(e) {
		return this.orInternal(e, 9);
	}
	MANY(e) {
		this.manyInternal(0, e);
	}
	MANY1(e) {
		this.manyInternal(1, e);
	}
	MANY2(e) {
		this.manyInternal(2, e);
	}
	MANY3(e) {
		this.manyInternal(3, e);
	}
	MANY4(e) {
		this.manyInternal(4, e);
	}
	MANY5(e) {
		this.manyInternal(5, e);
	}
	MANY6(e) {
		this.manyInternal(6, e);
	}
	MANY7(e) {
		this.manyInternal(7, e);
	}
	MANY8(e) {
		this.manyInternal(8, e);
	}
	MANY9(e) {
		this.manyInternal(9, e);
	}
	MANY_SEP(e) {
		this.manySepFirstInternal(0, e);
	}
	MANY_SEP1(e) {
		this.manySepFirstInternal(1, e);
	}
	MANY_SEP2(e) {
		this.manySepFirstInternal(2, e);
	}
	MANY_SEP3(e) {
		this.manySepFirstInternal(3, e);
	}
	MANY_SEP4(e) {
		this.manySepFirstInternal(4, e);
	}
	MANY_SEP5(e) {
		this.manySepFirstInternal(5, e);
	}
	MANY_SEP6(e) {
		this.manySepFirstInternal(6, e);
	}
	MANY_SEP7(e) {
		this.manySepFirstInternal(7, e);
	}
	MANY_SEP8(e) {
		this.manySepFirstInternal(8, e);
	}
	MANY_SEP9(e) {
		this.manySepFirstInternal(9, e);
	}
	AT_LEAST_ONE(e) {
		this.atLeastOneInternal(0, e);
	}
	AT_LEAST_ONE1(e) {
		return this.atLeastOneInternal(1, e);
	}
	AT_LEAST_ONE2(e) {
		this.atLeastOneInternal(2, e);
	}
	AT_LEAST_ONE3(e) {
		this.atLeastOneInternal(3, e);
	}
	AT_LEAST_ONE4(e) {
		this.atLeastOneInternal(4, e);
	}
	AT_LEAST_ONE5(e) {
		this.atLeastOneInternal(5, e);
	}
	AT_LEAST_ONE6(e) {
		this.atLeastOneInternal(6, e);
	}
	AT_LEAST_ONE7(e) {
		this.atLeastOneInternal(7, e);
	}
	AT_LEAST_ONE8(e) {
		this.atLeastOneInternal(8, e);
	}
	AT_LEAST_ONE9(e) {
		this.atLeastOneInternal(9, e);
	}
	AT_LEAST_ONE_SEP(e) {
		this.atLeastOneSepFirstInternal(0, e);
	}
	AT_LEAST_ONE_SEP1(e) {
		this.atLeastOneSepFirstInternal(1, e);
	}
	AT_LEAST_ONE_SEP2(e) {
		this.atLeastOneSepFirstInternal(2, e);
	}
	AT_LEAST_ONE_SEP3(e) {
		this.atLeastOneSepFirstInternal(3, e);
	}
	AT_LEAST_ONE_SEP4(e) {
		this.atLeastOneSepFirstInternal(4, e);
	}
	AT_LEAST_ONE_SEP5(e) {
		this.atLeastOneSepFirstInternal(5, e);
	}
	AT_LEAST_ONE_SEP6(e) {
		this.atLeastOneSepFirstInternal(6, e);
	}
	AT_LEAST_ONE_SEP7(e) {
		this.atLeastOneSepFirstInternal(7, e);
	}
	AT_LEAST_ONE_SEP8(e) {
		this.atLeastOneSepFirstInternal(8, e);
	}
	AT_LEAST_ONE_SEP9(e) {
		this.atLeastOneSepFirstInternal(9, e);
	}
	RULE(e, t, n = nf) {
		if (this.definedRulesNames.includes(e)) {
			let t = {
				message: eu.buildDuplicateRuleNameError({
					topLevelRule: e,
					grammarName: this.className
				}),
				type: rf.DUPLICATE_RULE_NAME,
				ruleName: e
			};
			this.definitionErrors.push(t);
		}
		this.definedRulesNames.push(e);
		let r = this.defineRule(e, t, n);
		return this[e] = r, r;
	}
	OVERRIDE_RULE(e, t, n = nf) {
		let r = Lu(e, this.definedRulesNames, this.className);
		this.definitionErrors = this.definitionErrors.concat(r);
		let i = this.defineRule(e, t, n);
		return this[e] = i, i;
	}
	BACKTRACK(e, t) {
		let n = e.coreRule ?? e;
		return function() {
			this.isBackTrackingStack.push(1);
			let e = this.saveRecogState();
			try {
				return n.apply(this, t), !0;
			} catch (e) {
				if (nd(e)) return !1;
				throw e;
			} finally {
				this.reloadRecogState(e), this.isBackTrackingStack.pop();
			}
		};
	}
	getGAstProductions() {
		return this.gastProductionsCache;
	}
	getSerializedGastProductions() {
		return ec(Object.values(this.gastProductionsCache));
	}
}, P(ye, "RecognizerApi"), ye), zd = (be = class {
	initRecognizerEngine(e, t) {
		if (this.className = this.constructor.name, this.shortRuleNameToFull = [], this.fullRuleNameToShort = {}, this.ruleShortNameIdx = 0, this.tokenMatcher = yl, this.subruleIdx = 0, this.currRuleShortName = -1, this.definedRulesNames = [], this.tokensMap = {}, this.isBackTrackingStack = [], this.RULE_STACK = [], this.RULE_STACK_IDX = -1, this.RULE_OCCURRENCE_STACK = [], this.RULE_OCCURRENCE_STACK_IDX = -1, this.gastProductionsCache = {}, Object.hasOwn(t, "serializedGrammar")) throw Error("The Parser's configuration can no longer contain a <serializedGrammar> property.\n	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0\n	For Further details.");
		if (Array.isArray(e)) {
			if (e.length === 0) throw Error("A Token Vocabulary cannot be empty.\n	Note that the first argument for the parser constructor\n	is no longer a Token vector (since v4.0).");
			if (typeof e[0].startOffset == "number") throw Error("The Parser constructor no longer accepts a token vector as the first argument.\n	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0\n	For Further details.");
		}
		if (Array.isArray(e)) this.tokensMap = e.reduce((e, t) => (e[t.name] = t, e), {});
		else if (Object.hasOwn(e, "modes") && Object.values(e.modes).flat().every(Ml)) {
			let t = Object.values(e.modes).flat(), n = [...new Set(t)];
			this.tokensMap = n.reduce((e, t) => (e[t.name] = t, e), {});
		} else if (typeof e == "object" && e) this.tokensMap = Object.assign({}, e);
		else throw Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");
		this.tokensMap.EOF = Yl;
		let n = (Object.hasOwn(e, "modes") ? Object.values(e.modes).flat() : Object.values(e)).every((e) => e.categoryMatches?.length == 0);
		this.tokenMatcher = n ? yl : vl, Sl(Object.values(this.tokensMap));
	}
	defineRule(e, t, n) {
		if (this.selfAnalysisDone) throw Error(`Grammar rule <${e}> may not be defined after the 'performSelfAnalysis' method has been called'
Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.`);
		let r = Object.hasOwn(n, "resyncEnabled") ? n.resyncEnabled : nf.resyncEnabled, i = Object.hasOwn(n, "recoveryValueFunc") ? n.recoveryValueFunc : nf.recoveryValueFunc, a = this.ruleShortNameIdx++;
		this.shortRuleNameToFull[a] = e, this.fullRuleNameToShort[e] = a;
		let o;
		return o = this.outputCst === !0 ? /* @__PURE__ */ P(function(...n) {
			try {
				this.ruleInvocationStateUpdate(a, e, this.subruleIdx), t.apply(this, n);
				let r = this.CST_STACK[this.CST_STACK.length - 1];
				return this.cstPostRule(r), r;
			} catch (e) {
				return this.invokeRuleCatch(e, r, i);
			} finally {
				this.ruleFinallyStateUpdate();
			}
		}, "invokeRuleWithTry") : /* @__PURE__ */ P(function(...n) {
			try {
				return this.ruleInvocationStateUpdate(a, e, this.subruleIdx), t.apply(this, n);
			} catch (e) {
				return this.invokeRuleCatch(e, r, i);
			} finally {
				this.ruleFinallyStateUpdate();
			}
		}, "invokeRuleWithTryCst"), Object.assign(/* @__PURE__ */ P(function(...t) {
			this.onBeforeParse(e);
			try {
				return o.apply(this, t);
			} finally {
				this.onAfterParse(e);
			}
		}, "rootRule"), {
			ruleName: e,
			originalGrammarAction: t,
			coreRule: o
		});
	}
	invokeRuleCatch(e, t, n) {
		let r = this.RULE_STACK_IDX === 0, i = t && !this.isBackTracking() && this.recoveryEnabled;
		if (nd(e)) {
			let t = e;
			if (i) {
				let r = this.findReSyncTokenType();
				if (this.isInCurrentRuleReSyncSet(r)) {
					if (t.resyncedTokens = this.reSyncTo(r), this.outputCst) {
						let e = this.CST_STACK[this.CST_STACK.length - 1];
						return e.recoveredNode = !0, e;
					}
					return n(e);
				}
				if (this.outputCst) {
					let e = this.CST_STACK[this.CST_STACK.length - 1];
					e.recoveredNode = !0, t.partialCstResult = e;
				}
				throw t;
			}
			if (r) return this.moveToTerminatedState(), n(e);
			throw t;
		}
		throw e;
	}
	optionInternal(e, t) {
		let n = hd | t;
		return this.optionInternalLogic(e, t, n);
	}
	optionInternalLogic(e, t, n) {
		let r = this.currRuleLookaheadFuncs[n], i;
		if (typeof e != "function") {
			i = e.DEF;
			let t = e.GATE;
			if (t !== void 0) {
				let e = r;
				r = /* @__PURE__ */ P(() => t.call(this) && e.call(this), "lookAheadFunc");
			}
		} else i = e;
		if (r.call(this) === !0) return i.call(this);
	}
	atLeastOneInternal(e, t) {
		let n = _d | e;
		return this.atLeastOneInternalLogic(e, t, n);
	}
	atLeastOneInternalLogic(e, t, n) {
		let r = this.currRuleLookaheadFuncs[n], i;
		if (typeof t != "function") {
			i = t.DEF;
			let e = t.GATE;
			if (e !== void 0) {
				let t = r;
				r = /* @__PURE__ */ P(() => e.call(this) && t.call(this), "lookAheadFunc");
			}
		} else i = t;
		if (r.call(this) === !0) {
			let e = this.doSingleRepetition(i);
			for (; r.call(this) === !0 && e === !0;) e = this.doSingleRepetition(i);
		} else throw this.raiseEarlyExitException(e, K.REPETITION_MANDATORY, t.ERR_MSG);
		this.attemptInRepetitionRecovery(this.atLeastOneInternal, [e, t], r, _d, e, cu);
	}
	atLeastOneSepFirstInternal(e, t) {
		let n = yd | e;
		this.atLeastOneSepFirstInternalLogic(e, t, n);
	}
	atLeastOneSepFirstInternalLogic(e, t, n) {
		let r = t.DEF, i = t.SEP;
		if (this.currRuleLookaheadFuncs[n].call(this) === !0) {
			r.call(this);
			let t = /* @__PURE__ */ P(() => this.tokenMatcher(this.LA_FAST(1), i), "separatorLookAheadFunc");
			for (; this.tokenMatcher(this.LA_FAST(1), i) === !0;) this.CONSUME(i), r.call(this);
			this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
				e,
				i,
				t,
				r,
				lu
			], t, yd, e, lu);
		} else throw this.raiseEarlyExitException(e, K.REPETITION_MANDATORY_WITH_SEPARATOR, t.ERR_MSG);
	}
	manyInternal(e, t) {
		let n = gd | e;
		return this.manyInternalLogic(e, t, n);
	}
	manyInternalLogic(e, t, n) {
		let r = this.currRuleLookaheadFuncs[n], i;
		if (typeof t != "function") {
			i = t.DEF;
			let e = t.GATE;
			if (e !== void 0) {
				let t = r;
				r = /* @__PURE__ */ P(() => e.call(this) && t.call(this), "lookaheadFunction");
			}
		} else i = t;
		let a = !0;
		for (; r.call(this) === !0 && a === !0;) a = this.doSingleRepetition(i);
		this.attemptInRepetitionRecovery(this.manyInternal, [e, t], r, gd, e, ou, a);
	}
	manySepFirstInternal(e, t) {
		let n = vd | e;
		this.manySepFirstInternalLogic(e, t, n);
	}
	manySepFirstInternalLogic(e, t, n) {
		let r = t.DEF, i = t.SEP;
		if (this.currRuleLookaheadFuncs[n].call(this) === !0) {
			r.call(this);
			let t = /* @__PURE__ */ P(() => this.tokenMatcher(this.LA_FAST(1), i), "separatorLookAheadFunc");
			for (; this.tokenMatcher(this.LA_FAST(1), i) === !0;) this.CONSUME(i), r.call(this);
			this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
				e,
				i,
				t,
				r,
				su
			], t, vd, e, su);
		}
	}
	repetitionSepSecondInternal(e, t, n, r, i) {
		for (; n();) this.CONSUME(t), r.call(this);
		this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
			e,
			t,
			n,
			r,
			i
		], n, yd, e, i);
	}
	doSingleRepetition(e) {
		let t = this.getLexerPosition();
		return e.call(this), this.getLexerPosition() > t;
	}
	orInternal(e, t) {
		let n = md | t, r = Array.isArray(e) ? e : e.DEF, i = this.currRuleLookaheadFuncs[n].call(this, r);
		if (i !== void 0) return r[i].ALT.call(this);
		this.raiseNoAltException(t, e.ERR_MSG);
	}
	ruleFinallyStateUpdate() {
		this.RULE_STACK_IDX--, this.RULE_OCCURRENCE_STACK_IDX--, this.RULE_STACK_IDX >= 0 && (this.currRuleShortName = this.RULE_STACK[this.RULE_STACK_IDX], this.currRuleLookaheadFuncs = this.lookAheadFuncsCache[this.currRuleShortName]), this.cstFinallyStateUpdate();
	}
	subruleInternal(e, t, n) {
		let r;
		try {
			let i = n === void 0 ? void 0 : n.ARGS;
			return this.subruleIdx = t, r = e.coreRule.apply(this, i), this.cstPostNonTerminal(r, n !== void 0 && n.LABEL !== void 0 ? n.LABEL : e.ruleName), r;
		} catch (t) {
			throw this.subruleInternalError(t, n, e.ruleName);
		}
	}
	subruleInternalError(e, t, n) {
		throw nd(e) && e.partialCstResult !== void 0 && (this.cstPostNonTerminal(e.partialCstResult, t !== void 0 && t.LABEL !== void 0 ? t.LABEL : n), delete e.partialCstResult), e;
	}
	consumeInternal(e, t, n) {
		let r;
		try {
			let t = this.LA_FAST(1);
			this.tokenMatcher(t, e) === !0 ? (this.consumeToken(), r = t) : this.consumeInternalError(e, t, n);
		} catch (n) {
			r = this.consumeInternalRecovery(e, t, n);
		}
		return this.cstPostTerminal(n !== void 0 && n.LABEL !== void 0 ? n.LABEL : e.name, r), r;
	}
	consumeInternalError(e, t, n) {
		let r, i = this.LA(0);
		throw r = n !== void 0 && n.ERR_MSG ? n.ERR_MSG : this.errorMessageProvider.buildMismatchTokenMessage({
			expected: e,
			actual: t,
			previous: i,
			ruleName: this.getCurrRuleFullName()
		}), this.SAVE_ERROR(new id(r, t, i));
	}
	consumeInternalRecovery(e, t, n) {
		if (this.recoveryEnabled && n.name === "MismatchedTokenException" && !this.isBackTracking()) {
			let r = this.getFollowsForInRuleRecovery(e, t);
			try {
				return this.tryInRuleRecovery(e, r);
			} catch (e) {
				throw e.name === ld ? n : e;
			}
		}
		throw n;
	}
	saveRecogState() {
		let e = this.errors, t = this.RULE_STACK.slice(0, this.RULE_STACK_IDX + 1);
		return {
			errors: e,
			lexerState: this.exportLexerState(),
			RULE_STACK: t,
			CST_STACK: this.CST_STACK
		};
	}
	reloadRecogState(e) {
		this.errors = e.errors, this.importLexerState(e.lexerState);
		let t = e.RULE_STACK;
		for (let e = 0; e < t.length; e++) this.RULE_STACK[e] = t[e];
		this.RULE_STACK_IDX = t.length - 1, this.RULE_STACK_IDX >= 0 && (this.currRuleShortName = this.RULE_STACK[this.RULE_STACK_IDX], this.currRuleLookaheadFuncs = this.lookAheadFuncsCache[this.currRuleShortName]);
	}
	ruleInvocationStateUpdate(e, t, n) {
		this.RULE_OCCURRENCE_STACK[++this.RULE_OCCURRENCE_STACK_IDX] = n, this.RULE_STACK[++this.RULE_STACK_IDX] = e, this.currRuleShortName = e, this.currRuleLookaheadFuncs = this.lookAheadFuncsCache[e], this.cstInvocationStateUpdate(t);
	}
	isBackTracking() {
		return this.isBackTrackingStack.length !== 0;
	}
	getCurrRuleFullName() {
		let e = this.currRuleShortName;
		return this.shortRuleNameToFull[e];
	}
	shortRuleNameToFullName(e) {
		return this.shortRuleNameToFull[e];
	}
	isAtEndOfInput() {
		return this.tokenMatcher(this.LA(1), Yl);
	}
	reset() {
		this.resetLexerState(), this.subruleIdx = 0, this.currRuleShortName = -1, this.currRuleLookaheadFuncs = [], this.isBackTrackingStack = [], this.errors = [], this.RULE_STACK_IDX = -1, this.RULE_OCCURRENCE_STACK_IDX = -1, this.CST_STACK = [];
	}
	onBeforeParse(e) {
		for (let e = 0; e < this.maxLookahead + 1; e++) this.tokVector.push(ef);
	}
	onAfterParse(e) {
		if (this.isAtEndOfInput() === !1) {
			let e = this.LA(1), t = this.errorMessageProvider.buildNotAllInputParsedMessage({
				firstRedundant: e,
				ruleName: this.getCurrRuleFullName()
			});
			this.SAVE_ERROR(new od(t, e));
		}
		for (; this.tokVector.at(-1) === ef;) this.tokVector.pop();
	}
}, P(be, "RecognizerEngine"), be), Bd = (xe = class {
	initErrorHandler(e) {
		this._errors = [], this.errorMessageProvider = Object.hasOwn(e, "errorMessageProvider") ? e.errorMessageProvider : tf.errorMessageProvider;
	}
	SAVE_ERROR(e) {
		if (nd(e)) return e.context = {
			ruleStack: this.getHumanReadableRuleStack(),
			ruleOccurrenceStack: this.RULE_OCCURRENCE_STACK.slice(0, this.RULE_OCCURRENCE_STACK_IDX + 1)
		}, this._errors.push(e), e;
		throw Error("Trying to save an Error which is not a RecognitionException");
	}
	get errors() {
		return [...this._errors];
	}
	set errors(e) {
		this._errors = e;
	}
	raiseEarlyExitException(e, t, n) {
		let r = this.getCurrRuleFullName(), i = this.getGAstProductions()[r], a = Eu(e, i, t, this.maxLookahead)[0], o = [];
		for (let e = 1; e <= this.maxLookahead; e++) o.push(this.LA(e));
		let s = this.errorMessageProvider.buildEarlyExitMessage({
			expectedIterationPaths: a,
			actual: o,
			previous: this.LA(0),
			customUserDescription: n,
			ruleName: r
		});
		throw this.SAVE_ERROR(new sd(s, this.LA(1), this.LA(0)));
	}
	raiseNoAltException(e, t) {
		let n = this.getCurrRuleFullName(), r = this.getGAstProductions()[n], i = Tu(e, r, this.maxLookahead), a = [];
		for (let e = 1; e <= this.maxLookahead; e++) a.push(this.LA(e));
		let o = this.LA(0), s = this.errorMessageProvider.buildNoViableAltMessage({
			expectedPathsPerAlt: i,
			actual: a,
			previous: o,
			customUserDescription: t,
			ruleName: this.getCurrRuleFullName()
		});
		throw this.SAVE_ERROR(new ad(s, this.LA(1), o));
	}
}, P(xe, "ErrorHandler"), xe), Vd = { description: "This Object indicates the Parser is during Recording Phase" };
Object.freeze(Vd);
var Hd = !0, Ud = 255, Wd = ql({
	name: "RECORDING_PHASE_TOKEN",
	pattern: Fl.NA
});
Sl([Wd]);
var Gd = Xl(Wd, "This IToken indicates the Parser is in Recording Phase\n	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details", -1, -1, -1, -1, -1, -1);
Object.freeze(Gd);
var Kd = {
	name: "This CSTNode indicates the Parser is in Recording Phase\n	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details",
	children: {}
}, qd = (Se = class {
	initGastRecorder(e) {
		this.recordingProdStack = [], this.RECORDING_PHASE = !1;
	}
	enableRecording() {
		this.RECORDING_PHASE = !0, this.TRACE_INIT("Enable Recording", () => {
			for (let e = 0; e < 10; e++) {
				let t = e > 0 ? e : "";
				this[`CONSUME${t}`] = function(t, n) {
					return this.consumeInternalRecord(t, e, n);
				}, this[`SUBRULE${t}`] = function(t, n) {
					return this.subruleInternalRecord(t, e, n);
				}, this[`OPTION${t}`] = function(t) {
					return this.optionInternalRecord(t, e);
				}, this[`OR${t}`] = function(t) {
					return this.orInternalRecord(t, e);
				}, this[`MANY${t}`] = function(t) {
					this.manyInternalRecord(e, t);
				}, this[`MANY_SEP${t}`] = function(t) {
					this.manySepFirstInternalRecord(e, t);
				}, this[`AT_LEAST_ONE${t}`] = function(t) {
					this.atLeastOneInternalRecord(e, t);
				}, this[`AT_LEAST_ONE_SEP${t}`] = function(t) {
					this.atLeastOneSepFirstInternalRecord(e, t);
				};
			}
			this.consume = function(e, t, n) {
				return this.consumeInternalRecord(t, e, n);
			}, this.subrule = function(e, t, n) {
				return this.subruleInternalRecord(t, e, n);
			}, this.option = function(e, t) {
				return this.optionInternalRecord(t, e);
			}, this.or = function(e, t) {
				return this.orInternalRecord(t, e);
			}, this.many = function(e, t) {
				this.manyInternalRecord(e, t);
			}, this.atLeastOne = function(e, t) {
				this.atLeastOneInternalRecord(e, t);
			}, this.ACTION = this.ACTION_RECORD, this.BACKTRACK = this.BACKTRACK_RECORD, this.LA = this.LA_RECORD;
		});
	}
	disableRecording() {
		this.RECORDING_PHASE = !1, this.TRACE_INIT("Deleting Recording methods", () => {
			let e = this;
			for (let t = 0; t < 10; t++) {
				let n = t > 0 ? t : "";
				delete e[`CONSUME${n}`], delete e[`SUBRULE${n}`], delete e[`OPTION${n}`], delete e[`OR${n}`], delete e[`MANY${n}`], delete e[`MANY_SEP${n}`], delete e[`AT_LEAST_ONE${n}`], delete e[`AT_LEAST_ONE_SEP${n}`];
			}
			delete e.consume, delete e.subrule, delete e.option, delete e.or, delete e.many, delete e.atLeastOne, delete e.ACTION, delete e.BACKTRACK, delete e.LA;
		});
	}
	ACTION_RECORD(e) {}
	BACKTRACK_RECORD(e, t) {
		return () => !0;
	}
	LA_RECORD(e) {
		return ef;
	}
	topLevelRuleRecord(e, t) {
		try {
			let n = new qs({
				definition: [],
				name: e
			});
			return n.name = e, this.recordingProdStack.push(n), t.call(this), this.recordingProdStack.pop(), n;
		} catch (e) {
			if (e.KNOWN_RECORDER_ERROR !== !0) try {
				e.message += "\n	 This error was thrown during the \"grammar recording phase\" For more info see:\n	https://chevrotain.io/docs/guide/internals.html#grammar-recording";
			} catch {
				throw e;
			}
			throw e;
		}
	}
	optionInternalRecord(e, t) {
		return Jd.call(this, Ys, e, t);
	}
	atLeastOneInternalRecord(e, t) {
		Jd.call(this, Xs, t, e);
	}
	atLeastOneSepFirstInternalRecord(e, t) {
		Jd.call(this, Zs, t, e, Hd);
	}
	manyInternalRecord(e, t) {
		Jd.call(this, U, t, e);
	}
	manySepFirstInternalRecord(e, t) {
		Jd.call(this, Qs, t, e, Hd);
	}
	orInternalRecord(e, t) {
		return Yd.call(this, e, t);
	}
	subruleInternalRecord(e, t, n) {
		if (Zd(t), !e || !Object.hasOwn(e, "ruleName")) {
			let n = /* @__PURE__ */ Error(`<SUBRULE${Xd(t)}> argument is invalid expecting a Parser method reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);
			throw n.KNOWN_RECORDER_ERROR = !0, n;
		}
		let r = this.recordingProdStack.at(-1), i = e.ruleName, a = new Ks({
			idx: t,
			nonTerminalName: i,
			label: n?.LABEL,
			referencedRule: void 0
		});
		return r.definition.push(a), this.outputCst ? Kd : Vd;
	}
	consumeInternalRecord(e, t, n) {
		if (Zd(t), !Ol(e)) {
			let n = /* @__PURE__ */ Error(`<CONSUME${Xd(t)}> argument is invalid expecting a TokenType reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);
			throw n.KNOWN_RECORDER_ERROR = !0, n;
		}
		let r = this.recordingProdStack.at(-1), i = new W({
			idx: t,
			terminalType: e,
			label: n?.LABEL
		});
		return r.definition.push(i), Gd;
	}
}, P(Se, "GastRecorder"), Se);
function Jd(e, t, n, r = !1) {
	Zd(n);
	let i = this.recordingProdStack.at(-1), a = typeof t == "function" ? t : t.DEF, o = new e({
		definition: [],
		idx: n
	});
	return r && (o.separator = t.SEP), Object.hasOwn(t, "MAX_LOOKAHEAD") && (o.maxLookahead = t.MAX_LOOKAHEAD), this.recordingProdStack.push(o), a.call(this), i.definition.push(o), this.recordingProdStack.pop(), Vd;
}
P(Jd, "recordProd");
function Yd(e, t) {
	Zd(t);
	let n = this.recordingProdStack.at(-1), r = Array.isArray(e) === !1, i = r === !1 ? e : e.DEF, a = new $s({
		definition: [],
		idx: t,
		ignoreAmbiguities: r && e.IGNORE_AMBIGUITIES === !0
	});
	return Object.hasOwn(e, "MAX_LOOKAHEAD") && (a.maxLookahead = e.MAX_LOOKAHEAD), a.hasPredicates = i.some((e) => typeof e.GATE == "function"), n.definition.push(a), i.forEach((e) => {
		let t = new Js({ definition: [] });
		a.definition.push(t), Object.hasOwn(e, "IGNORE_AMBIGUITIES") ? t.ignoreAmbiguities = e.IGNORE_AMBIGUITIES : Object.hasOwn(e, "GATE") && (t.ignoreAmbiguities = !0), this.recordingProdStack.push(t), e.ALT.call(this), this.recordingProdStack.pop();
	}), Vd;
}
P(Yd, "recordOrProd");
function Xd(e) {
	return e === 0 ? "" : `${e}`;
}
P(Xd, "getIdxSuffix");
function Zd(e) {
	if (e < 0 || e > Ud) {
		let t = /* @__PURE__ */ Error(`Invalid DSL Method idx value: <${e}>
	Idx value must be a none negative value smaller than ${Ud + 1}`);
		throw t.KNOWN_RECORDER_ERROR = !0, t;
	}
}
P(Zd, "assertMethodIdxIsValid");
var Qd = (Ce = class {
	initPerformanceTracer(e) {
		if (Object.hasOwn(e, "traceInitPerf")) {
			let t = e.traceInitPerf, n = typeof t == "number";
			this.traceInitMaxIdent = n ? t : 1 / 0, this.traceInitPerf = n ? t > 0 : t;
		} else this.traceInitMaxIdent = 0, this.traceInitPerf = tf.traceInitPerf;
		this.traceInitIndent = -1;
	}
	TRACE_INIT(e, t) {
		if (this.traceInitPerf === !0) {
			this.traceInitIndent++;
			let n = Array(this.traceInitIndent + 1).join("	");
			this.traceInitIndent < this.traceInitMaxIdent && console.log(`${n}--> <${e}>`);
			let { time: r, value: i } = Vs(t), a = r > 10 ? console.warn : console.log;
			return this.traceInitIndent < this.traceInitMaxIdent && a(`${n}<-- <${e}> time: ${r}ms`), this.traceInitIndent--, i;
		}
		return t();
	}
}, P(Ce, "PerformanceTracer"), Ce);
function $d(e, t) {
	t.forEach((t) => {
		let n = t.prototype;
		Object.getOwnPropertyNames(n).forEach((r) => {
			if (r === "constructor") return;
			let i = Object.getOwnPropertyDescriptor(n, r);
			i && (i.get || i.set) ? Object.defineProperty(e.prototype, r, i) : e.prototype[r] = t.prototype[r];
		});
	});
}
P($d, "applyMixins");
var ef = Xl(Yl, "", -1, -1, -1, -1, -1, -1);
Object.freeze(ef);
var tf = Object.freeze({
	recoveryEnabled: !1,
	maxLookahead: 3,
	dynamicTokensEnabled: !1,
	outputCst: !0,
	errorMessageProvider: Ql,
	nodeLocationTracking: "none",
	traceInitPerf: !1,
	skipValidations: !1
}), nf = Object.freeze({
	recoveryValueFunc: /* @__PURE__ */ P(() => {}, "recoveryValueFunc"),
	resyncEnabled: !0
}), rf;
(function(e) {
	e[e.INVALID_RULE_NAME = 0] = "INVALID_RULE_NAME", e[e.DUPLICATE_RULE_NAME = 1] = "DUPLICATE_RULE_NAME", e[e.INVALID_RULE_OVERRIDE = 2] = "INVALID_RULE_OVERRIDE", e[e.DUPLICATE_PRODUCTIONS = 3] = "DUPLICATE_PRODUCTIONS", e[e.UNRESOLVED_SUBRULE_REF = 4] = "UNRESOLVED_SUBRULE_REF", e[e.LEFT_RECURSION = 5] = "LEFT_RECURSION", e[e.NONE_LAST_EMPTY_ALT = 6] = "NONE_LAST_EMPTY_ALT", e[e.AMBIGUOUS_ALTS = 7] = "AMBIGUOUS_ALTS", e[e.CONFLICT_TOKENS_RULES_NAMESPACE = 8] = "CONFLICT_TOKENS_RULES_NAMESPACE", e[e.INVALID_TOKEN_NAME = 9] = "INVALID_TOKEN_NAME", e[e.NO_NON_EMPTY_LOOKAHEAD = 10] = "NO_NON_EMPTY_LOOKAHEAD", e[e.AMBIGUOUS_PREFIX_ALTS = 11] = "AMBIGUOUS_PREFIX_ALTS", e[e.TOO_MANY_ALTS = 12] = "TOO_MANY_ALTS", e[e.CUSTOM_LOOKAHEAD_VALIDATION = 13] = "CUSTOM_LOOKAHEAD_VALIDATION";
})(rf ||= {});
function af(e = void 0) {
	return function() {
		return e;
	};
}
P(af, "EMPTY_ALT");
var of = (we = class e {
	static performSelfAnalysis(e) {
		throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.");
	}
	performSelfAnalysis() {
		this.TRACE_INIT("performSelfAnalysis", () => {
			let t;
			this.selfAnalysisDone = !0;
			let n = this.className;
			this.TRACE_INIT("toFastProps", () => {
				Hs(this);
			}), this.TRACE_INIT("Grammar Recording", () => {
				try {
					this.enableRecording(), this.definedRulesNames.forEach((e) => {
						let t = this[e].originalGrammarAction, n;
						this.TRACE_INIT(`${e} Rule`, () => {
							n = this.topLevelRuleRecord(e, t);
						}), this.gastProductionsCache[e] = n;
					});
				} finally {
					this.disableRecording();
				}
			});
			let r = [];
			if (this.TRACE_INIT("Grammar Resolving", () => {
				r = Yu({ rules: Object.values(this.gastProductionsCache) }), this.definitionErrors = this.definitionErrors.concat(r);
			}), this.TRACE_INIT("Grammar Validations", () => {
				if (r.length === 0 && this.skipValidations === !1) {
					let e = Xu({
						rules: Object.values(this.gastProductionsCache),
						tokenTypes: Object.values(this.tokensMap),
						errMsgProvider: eu,
						grammarName: n
					}), t = Au({
						lookaheadStrategy: this.lookaheadStrategy,
						rules: Object.values(this.gastProductionsCache),
						tokenTypes: Object.values(this.tokensMap),
						grammarName: n
					});
					this.definitionErrors = this.definitionErrors.concat(e, t);
				}
			}), this.definitionErrors.length === 0 && (this.recoveryEnabled && this.TRACE_INIT("computeAllProdsFollows", () => {
				let e = gc(Object.values(this.gastProductionsCache));
				this.resyncFollows = e;
			}), this.TRACE_INIT("ComputeLookaheadFunctions", () => {
				var e, t;
				(t = (e = this.lookaheadStrategy).initialize) == null || t.call(e, { rules: Object.values(this.gastProductionsCache) }), this.preComputeLookaheadFunctions(Object.values(this.gastProductionsCache));
			})), !e.DEFER_DEFINITION_ERRORS_HANDLING && this.definitionErrors.length !== 0) throw t = this.definitionErrors.map((e) => e.message), /* @__PURE__ */ Error(`Parser Definition Errors detected:
 ${t.join("\n-------------------------------\n")}`);
		});
	}
	constructor(e, t) {
		this.definitionErrors = [], this.selfAnalysisDone = !1;
		let n = this;
		if (n.initErrorHandler(t), n.initLexerAdapter(), n.initLooksAhead(t), n.initRecognizerEngine(e, t), n.initRecoverable(t), n.initTreeBuilder(t), n.initGastRecorder(t), n.initPerformanceTracer(t), Object.hasOwn(t, "ignoredIssues")) throw Error("The <ignoredIssues> IParserConfig property has been deprecated.\n	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.\n	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES\n	For further details.");
		this.skipValidations = Object.hasOwn(t, "skipValidations") ? t.skipValidations : tf.skipValidations;
	}
}, P(we, "Parser"), we);
of.DEFER_DEFINITION_ERRORS_HANDLING = !1, $d(of, [
	dd,
	xd,
	Id,
	Ld,
	zd,
	Rd,
	Bd,
	qd,
	Qd
]);
var sf = (Te = class extends of {
	constructor(e, t = tf) {
		let n = Object.assign({}, t);
		n.outputCst = !1, super(e, n);
	}
}, P(Te, "EmbeddedActionsParser"), Te);
function cf(e, t) {
	for (var n = -1, r = e == null ? 0 : e.length, i = Array(r); ++n < r;) i[n] = t(e[n], n, e);
	return i;
}
P(cf, "arrayMap");
var lf = cf;
function uf() {
	this.__data__ = [], this.size = 0;
}
P(uf, "listCacheClear");
var df = uf;
function ff(e, t) {
	return e === t || e !== e && t !== t;
}
P(ff, "eq");
var pf = ff;
function mf(e, t) {
	for (var n = e.length; n--;) if (pf(e[n][0], t)) return n;
	return -1;
}
P(mf, "assocIndexOf");
var hf = mf, gf = Array.prototype.splice;
function _f(e) {
	var t = this.__data__, n = hf(t, e);
	return n < 0 ? !1 : (n == t.length - 1 ? t.pop() : gf.call(t, n, 1), --this.size, !0);
}
P(_f, "listCacheDelete");
var vf = _f;
function yf(e) {
	var t = this.__data__, n = hf(t, e);
	return n < 0 ? void 0 : t[n][1];
}
P(yf, "listCacheGet");
var bf = yf;
function xf(e) {
	return hf(this.__data__, e) > -1;
}
P(xf, "listCacheHas");
var Sf = xf;
function Cf(e, t) {
	var n = this.__data__, r = hf(n, e);
	return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this;
}
P(Cf, "listCacheSet");
var wf = Cf;
function Tf(e) {
	var t = -1, n = e == null ? 0 : e.length;
	for (this.clear(); ++t < n;) {
		var r = e[t];
		this.set(r[0], r[1]);
	}
}
P(Tf, "ListCache"), Tf.prototype.clear = df, Tf.prototype.delete = vf, Tf.prototype.get = bf, Tf.prototype.has = Sf, Tf.prototype.set = wf;
var Ef = Tf;
function Df() {
	this.__data__ = new Ef(), this.size = 0;
}
P(Df, "stackClear");
var Of = Df;
function kf(e) {
	var t = this.__data__, n = t.delete(e);
	return this.size = t.size, n;
}
P(kf, "stackDelete");
var Af = kf;
function jf(e) {
	return this.__data__.get(e);
}
P(jf, "stackGet");
var Mf = jf;
function Nf(e) {
	return this.__data__.has(e);
}
P(Nf, "stackHas");
var Pf = Nf, Ff = typeof global == "object" && global && global.Object === Object && global, If = typeof self == "object" && self && self.Object === Object && self, Lf = Ff || If || Function("return this")(), Rf = Lf.Symbol, zf = Object.prototype, Bf = zf.hasOwnProperty, Vf = zf.toString, Hf = Rf ? Rf.toStringTag : void 0;
function Uf(e) {
	var t = Bf.call(e, Hf), n = e[Hf];
	try {
		e[Hf] = void 0;
		var r = !0;
	} catch {}
	var i = Vf.call(e);
	return r && (t ? e[Hf] = n : delete e[Hf]), i;
}
P(Uf, "getRawTag");
var Wf = Uf, Gf = Object.prototype.toString;
function Kf(e) {
	return Gf.call(e);
}
P(Kf, "objectToString");
var qf = Kf, Jf = "[object Null]", Yf = "[object Undefined]", Xf = Rf ? Rf.toStringTag : void 0;
function Zf(e) {
	return e == null ? e === void 0 ? Yf : Jf : Xf && Xf in Object(e) ? Wf(e) : qf(e);
}
P(Zf, "baseGetTag");
var Qf = Zf;
function $f(e) {
	var t = typeof e;
	return e != null && (t == "object" || t == "function");
}
P($f, "isObject");
var ep = $f, tp = "[object AsyncFunction]", np = "[object Function]", rp = "[object GeneratorFunction]", ip = "[object Proxy]";
function ap(e) {
	if (!ep(e)) return !1;
	var t = Qf(e);
	return t == np || t == rp || t == tp || t == ip;
}
P(ap, "isFunction");
var op = ap, sp = Lf["__core-js_shared__"], cp = (function() {
	var e = /[^.]+$/.exec(sp && sp.keys && sp.keys.IE_PROTO || "");
	return e ? "Symbol(src)_1." + e : "";
})();
function lp(e) {
	return !!cp && cp in e;
}
P(lp, "isMasked");
var up = lp, dp = Function.prototype.toString;
function fp(e) {
	if (e != null) {
		try {
			return dp.call(e);
		} catch {}
		try {
			return e + "";
		} catch {}
	}
	return "";
}
P(fp, "toSource");
var pp = fp, mp = /[\\^$.*+?()[\]{}|]/g, hp = /^\[object .+?Constructor\]$/, gp = Function.prototype, _p = Object.prototype, vp = gp.toString, yp = _p.hasOwnProperty, bp = RegExp("^" + vp.call(yp).replace(mp, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
function xp(e) {
	return !ep(e) || up(e) ? !1 : (op(e) ? bp : hp).test(pp(e));
}
P(xp, "baseIsNative");
var Sp = xp;
function Cp(e, t) {
	return e?.[t];
}
P(Cp, "getValue");
var wp = Cp;
function Tp(e, t) {
	var n = wp(e, t);
	return Sp(n) ? n : void 0;
}
P(Tp, "getNative");
var Ep = Tp, Dp = Ep(Lf, "Map"), Op = Ep(Object, "create");
function kp() {
	this.__data__ = Op ? Op(null) : {}, this.size = 0;
}
P(kp, "hashClear");
var Ap = kp;
function jp(e) {
	var t = this.has(e) && delete this.__data__[e];
	return this.size -= +!!t, t;
}
P(jp, "hashDelete");
var Mp = jp, Np = "__lodash_hash_undefined__", Pp = Object.prototype.hasOwnProperty;
function Fp(e) {
	var t = this.__data__;
	if (Op) {
		var n = t[e];
		return n === Np ? void 0 : n;
	}
	return Pp.call(t, e) ? t[e] : void 0;
}
P(Fp, "hashGet");
var Ip = Fp, Lp = Object.prototype.hasOwnProperty;
function Rp(e) {
	var t = this.__data__;
	return Op ? t[e] !== void 0 : Lp.call(t, e);
}
P(Rp, "hashHas");
var zp = Rp, Bp = "__lodash_hash_undefined__";
function Vp(e, t) {
	var n = this.__data__;
	return this.size += +!this.has(e), n[e] = Op && t === void 0 ? Bp : t, this;
}
P(Vp, "hashSet");
var Hp = Vp;
function Up(e) {
	var t = -1, n = e == null ? 0 : e.length;
	for (this.clear(); ++t < n;) {
		var r = e[t];
		this.set(r[0], r[1]);
	}
}
P(Up, "Hash"), Up.prototype.clear = Ap, Up.prototype.delete = Mp, Up.prototype.get = Ip, Up.prototype.has = zp, Up.prototype.set = Hp;
var Wp = Up;
function Gp() {
	this.size = 0, this.__data__ = {
		hash: new Wp(),
		map: new (Dp || Ef)(),
		string: new Wp()
	};
}
P(Gp, "mapCacheClear");
var Kp = Gp;
function qp(e) {
	var t = typeof e;
	return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
P(qp, "isKeyable");
var Jp = qp;
function Yp(e, t) {
	var n = e.__data__;
	return Jp(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
P(Yp, "getMapData");
var Xp = Yp;
function Zp(e) {
	var t = Xp(this, e).delete(e);
	return this.size -= +!!t, t;
}
P(Zp, "mapCacheDelete");
var Qp = Zp;
function $p(e) {
	return Xp(this, e).get(e);
}
P($p, "mapCacheGet");
var em = $p;
function tm(e) {
	return Xp(this, e).has(e);
}
P(tm, "mapCacheHas");
var nm = tm;
function rm(e, t) {
	var n = Xp(this, e), r = n.size;
	return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
}
P(rm, "mapCacheSet");
var im = rm;
function am(e) {
	var t = -1, n = e == null ? 0 : e.length;
	for (this.clear(); ++t < n;) {
		var r = e[t];
		this.set(r[0], r[1]);
	}
}
P(am, "MapCache"), am.prototype.clear = Kp, am.prototype.delete = Qp, am.prototype.get = em, am.prototype.has = nm, am.prototype.set = im;
var om = am, sm = 200;
function cm(e, t) {
	var n = this.__data__;
	if (n instanceof Ef) {
		var r = n.__data__;
		if (!Dp || r.length < sm - 1) return r.push([e, t]), this.size = ++n.size, this;
		n = this.__data__ = new om(r);
	}
	return n.set(e, t), this.size = n.size, this;
}
P(cm, "stackSet");
var lm = cm;
function um(e) {
	var t = this.__data__ = new Ef(e);
	this.size = t.size;
}
P(um, "Stack"), um.prototype.clear = Of, um.prototype.delete = Af, um.prototype.get = Mf, um.prototype.has = Pf, um.prototype.set = lm;
var dm = um, fm = "__lodash_hash_undefined__";
function pm(e) {
	return this.__data__.set(e, fm), this;
}
P(pm, "setCacheAdd");
var mm = pm;
function hm(e) {
	return this.__data__.has(e);
}
P(hm, "setCacheHas");
var gm = hm;
function _m(e) {
	var t = -1, n = e == null ? 0 : e.length;
	for (this.__data__ = new om(); ++t < n;) this.add(e[t]);
}
P(_m, "SetCache"), _m.prototype.add = _m.prototype.push = mm, _m.prototype.has = gm;
var vm = _m;
function ym(e, t) {
	for (var n = -1, r = e == null ? 0 : e.length; ++n < r;) if (t(e[n], n, e)) return !0;
	return !1;
}
P(ym, "arraySome");
var bm = ym;
function xm(e, t) {
	return e.has(t);
}
P(xm, "cacheHas");
var Sm = xm, Cm = 1, wm = 2;
function Tm(e, t, n, r, i, a) {
	var o = n & Cm, s = e.length, c = t.length;
	if (s != c && !(o && c > s)) return !1;
	var l = a.get(e), u = a.get(t);
	if (l && u) return l == t && u == e;
	var d = -1, f = !0, p = n & wm ? new vm() : void 0;
	for (a.set(e, t), a.set(t, e); ++d < s;) {
		var m = e[d], h = t[d];
		if (r) var g = o ? r(h, m, d, t, e, a) : r(m, h, d, e, t, a);
		if (g !== void 0) {
			if (g) continue;
			f = !1;
			break;
		}
		if (p) {
			if (!bm(t, function(e, t) {
				if (!Sm(p, t) && (m === e || i(m, e, n, r, a))) return p.push(t);
			})) {
				f = !1;
				break;
			}
		} else if (!(m === h || i(m, h, n, r, a))) {
			f = !1;
			break;
		}
	}
	return a.delete(e), a.delete(t), f;
}
P(Tm, "equalArrays");
var Em = Tm, Dm = Lf.Uint8Array;
function Om(e) {
	var t = -1, n = Array(e.size);
	return e.forEach(function(e, r) {
		n[++t] = [r, e];
	}), n;
}
P(Om, "mapToArray");
var km = Om;
function Am(e) {
	var t = -1, n = Array(e.size);
	return e.forEach(function(e) {
		n[++t] = e;
	}), n;
}
P(Am, "setToArray");
var jm = Am, Mm = 1, Nm = 2, Pm = "[object Boolean]", Fm = "[object Date]", Im = "[object Error]", Lm = "[object Map]", Rm = "[object Number]", zm = "[object RegExp]", Bm = "[object Set]", Vm = "[object String]", Hm = "[object Symbol]", Um = "[object ArrayBuffer]", Wm = "[object DataView]", Gm = Rf ? Rf.prototype : void 0, Km = Gm ? Gm.valueOf : void 0;
function qm(e, t, n, r, i, a, o) {
	switch (n) {
		case Wm:
			if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
			e = e.buffer, t = t.buffer;
		case Um: return !(e.byteLength != t.byteLength || !a(new Dm(e), new Dm(t)));
		case Pm:
		case Fm:
		case Rm: return pf(+e, +t);
		case Im: return e.name == t.name && e.message == t.message;
		case zm:
		case Vm: return e == t + "";
		case Lm: var s = km;
		case Bm:
			var c = r & Mm;
			if (s ||= jm, e.size != t.size && !c) return !1;
			var l = o.get(e);
			if (l) return l == t;
			r |= Nm, o.set(e, t);
			var u = Em(s(e), s(t), r, i, a, o);
			return o.delete(e), u;
		case Hm: if (Km) return Km.call(e) == Km.call(t);
	}
	return !1;
}
P(qm, "equalByTag");
var Jm = qm;
function Ym(e, t) {
	for (var n = -1, r = t.length, i = e.length; ++n < r;) e[i + n] = t[n];
	return e;
}
P(Ym, "arrayPush");
var Xm = Ym, Zm = Array.isArray;
function Qm(e, t, n) {
	var r = t(e);
	return Zm(e) ? r : Xm(r, n(e));
}
P(Qm, "baseGetAllKeys");
var $m = Qm;
function eh(e, t) {
	for (var n = -1, r = e == null ? 0 : e.length, i = 0, a = []; ++n < r;) {
		var o = e[n];
		t(o, n, e) && (a[i++] = o);
	}
	return a;
}
P(eh, "arrayFilter");
var th = eh;
function nh() {
	return [];
}
P(nh, "stubArray");
var rh = nh, ih = Object.prototype.propertyIsEnumerable, ah = Object.getOwnPropertySymbols, oh = ah ? function(e) {
	return e == null ? [] : (e = Object(e), th(ah(e), function(t) {
		return ih.call(e, t);
	}));
} : rh;
function sh(e, t) {
	for (var n = -1, r = Array(e); ++n < e;) r[n] = t(n);
	return r;
}
P(sh, "baseTimes");
var ch = sh;
function lh(e) {
	return typeof e == "object" && !!e;
}
P(lh, "isObjectLike");
var uh = lh, dh = "[object Arguments]";
function fh(e) {
	return uh(e) && Qf(e) == dh;
}
P(fh, "baseIsArguments");
var ph = fh, mh = Object.prototype, hh = mh.hasOwnProperty, gh = mh.propertyIsEnumerable, _h = ph(/* @__PURE__ */ (function() {
	return arguments;
})()) ? ph : function(e) {
	return uh(e) && hh.call(e, "callee") && !gh.call(e, "callee");
};
function vh() {
	return !1;
}
P(vh, "stubFalse");
var yh = vh, bh = typeof exports == "object" && exports && !exports.nodeType && exports, xh = bh && typeof module == "object" && module && !module.nodeType && module, Sh = xh && xh.exports === bh ? Lf.Buffer : void 0, Ch = (Sh ? Sh.isBuffer : void 0) || yh, wh = 9007199254740991, Th = /^(?:0|[1-9]\d*)$/;
function Eh(e, t) {
	var n = typeof e;
	return t ??= wh, !!t && (n == "number" || n != "symbol" && Th.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
P(Eh, "isIndex");
var Dh = Eh, Oh = 9007199254740991;
function kh(e) {
	return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Oh;
}
P(kh, "isLength");
var Ah = kh, jh = "[object Arguments]", Mh = "[object Array]", Nh = "[object Boolean]", Ph = "[object Date]", Fh = "[object Error]", Ih = "[object Function]", Lh = "[object Map]", Rh = "[object Number]", zh = "[object Object]", Bh = "[object RegExp]", Vh = "[object Set]", Hh = "[object String]", Uh = "[object WeakMap]", Wh = "[object ArrayBuffer]", Gh = "[object DataView]", Kh = "[object Float32Array]", qh = "[object Float64Array]", Jh = "[object Int8Array]", Yh = "[object Int16Array]", Xh = "[object Int32Array]", Zh = "[object Uint8Array]", Qh = "[object Uint8ClampedArray]", $h = "[object Uint16Array]", eg = "[object Uint32Array]", q = {};
q[Kh] = q[qh] = q[Jh] = q[Yh] = q[Xh] = q[Zh] = q[Qh] = q[$h] = q[eg] = !0, q[jh] = q[Mh] = q[Wh] = q[Nh] = q[Gh] = q[Ph] = q[Fh] = q[Ih] = q[Lh] = q[Rh] = q[zh] = q[Bh] = q[Vh] = q[Hh] = q[Uh] = !1;
function tg(e) {
	return uh(e) && Ah(e.length) && !!q[Qf(e)];
}
P(tg, "baseIsTypedArray");
var ng = tg;
function rg(e) {
	return function(t) {
		return e(t);
	};
}
P(rg, "baseUnary");
var ig = rg, ag = typeof exports == "object" && exports && !exports.nodeType && exports, og = ag && typeof module == "object" && module && !module.nodeType && module, sg = og && og.exports === ag && Ff.process, cg = (function() {
	try {
		return og && og.require && og.require("util").types || sg && sg.binding && sg.binding("util");
	} catch {}
})(), lg = cg && cg.isTypedArray, ug = lg ? ig(lg) : ng, dg = Object.prototype.hasOwnProperty;
function fg(e, t) {
	var n = Zm(e), r = !n && _h(e), i = !n && !r && Ch(e), a = !n && !r && !i && ug(e), o = n || r || i || a, s = o ? ch(e.length, String) : [], c = s.length;
	for (var l in e) (t || dg.call(e, l)) && !(o && (l == "length" || i && (l == "offset" || l == "parent") || a && (l == "buffer" || l == "byteLength" || l == "byteOffset") || Dh(l, c))) && s.push(l);
	return s;
}
P(fg, "arrayLikeKeys");
var pg = fg, mg = Object.prototype;
function hg(e) {
	var t = e && e.constructor;
	return e === (typeof t == "function" && t.prototype || mg);
}
P(hg, "isPrototype");
var gg = hg;
function _g(e, t) {
	return function(n) {
		return e(t(n));
	};
}
P(_g, "overArg");
var vg = _g(Object.keys, Object), yg = Object.prototype.hasOwnProperty;
function bg(e) {
	if (!gg(e)) return vg(e);
	var t = [];
	for (var n in Object(e)) yg.call(e, n) && n != "constructor" && t.push(n);
	return t;
}
P(bg, "baseKeys");
var xg = bg;
function Sg(e) {
	return e != null && Ah(e.length) && !op(e);
}
P(Sg, "isArrayLike");
var Cg = Sg;
function wg(e) {
	return Cg(e) ? pg(e) : xg(e);
}
P(wg, "keys");
var Tg = wg;
function Eg(e) {
	return $m(e, Tg, oh);
}
P(Eg, "getAllKeys");
var Dg = Eg, Og = 1, kg = Object.prototype.hasOwnProperty;
function Ag(e, t, n, r, i, a) {
	var o = n & Og, s = Dg(e), c = s.length;
	if (c != Dg(t).length && !o) return !1;
	for (var l = c; l--;) {
		var u = s[l];
		if (!(o ? u in t : kg.call(t, u))) return !1;
	}
	var d = a.get(e), f = a.get(t);
	if (d && f) return d == t && f == e;
	var p = !0;
	a.set(e, t), a.set(t, e);
	for (var m = o; ++l < c;) {
		u = s[l];
		var h = e[u], g = t[u];
		if (r) var _ = o ? r(g, h, u, t, e, a) : r(h, g, u, e, t, a);
		if (!(_ === void 0 ? h === g || i(h, g, n, r, a) : _)) {
			p = !1;
			break;
		}
		m ||= u == "constructor";
	}
	if (p && !m) {
		var v = e.constructor, y = t.constructor;
		v != y && "constructor" in e && "constructor" in t && !(typeof v == "function" && v instanceof v && typeof y == "function" && y instanceof y) && (p = !1);
	}
	return a.delete(e), a.delete(t), p;
}
P(Ag, "equalObjects");
var jg = Ag, Mg = Ep(Lf, "DataView"), Ng = Ep(Lf, "Promise"), Pg = Ep(Lf, "Set"), Fg = Ep(Lf, "WeakMap"), Ig = "[object Map]", Lg = "[object Object]", Rg = "[object Promise]", zg = "[object Set]", Bg = "[object WeakMap]", Vg = "[object DataView]", Hg = pp(Mg), Ug = pp(Dp), Wg = pp(Ng), Gg = pp(Pg), Kg = pp(Fg), qg = Qf;
(Mg && qg(new Mg(/* @__PURE__ */ new ArrayBuffer(1))) != Vg || Dp && qg(new Dp()) != Ig || Ng && qg(Ng.resolve()) != Rg || Pg && qg(new Pg()) != zg || Fg && qg(new Fg()) != Bg) && (qg = /* @__PURE__ */ P(function(e) {
	var t = Qf(e), n = t == Lg ? e.constructor : void 0, r = n ? pp(n) : "";
	if (r) switch (r) {
		case Hg: return Vg;
		case Ug: return Ig;
		case Wg: return Rg;
		case Gg: return zg;
		case Kg: return Bg;
	}
	return t;
}, "getTag"));
var Jg = qg, Yg = 1, Xg = "[object Arguments]", Zg = "[object Array]", Qg = "[object Object]", $g = Object.prototype.hasOwnProperty;
function e_(e, t, n, r, i, a) {
	var o = Zm(e), s = Zm(t), c = o ? Zg : Jg(e), l = s ? Zg : Jg(t);
	c = c == Xg ? Qg : c, l = l == Xg ? Qg : l;
	var u = c == Qg, d = l == Qg, f = c == l;
	if (f && Ch(e)) {
		if (!Ch(t)) return !1;
		o = !0, u = !1;
	}
	if (f && !u) return a ||= new dm(), o || ug(e) ? Em(e, t, n, r, i, a) : Jm(e, t, c, n, r, i, a);
	if (!(n & Yg)) {
		var p = u && $g.call(e, "__wrapped__"), m = d && $g.call(t, "__wrapped__");
		if (p || m) {
			var h = p ? e.value() : e, g = m ? t.value() : t;
			return a ||= new dm(), i(h, g, n, r, a);
		}
	}
	return f ? (a ||= new dm(), jg(e, t, n, r, i, a)) : !1;
}
P(e_, "baseIsEqualDeep");
var t_ = e_;
function n_(e, t, n, r, i) {
	return e === t ? !0 : e == null || t == null || !uh(e) && !uh(t) ? e !== e && t !== t : t_(e, t, n, r, n_, i);
}
P(n_, "baseIsEqual");
var r_ = n_, i_ = 1, a_ = 2;
function o_(e, t, n, r) {
	var i = n.length, a = i, o = !r;
	if (e == null) return !a;
	for (e = Object(e); i--;) {
		var s = n[i];
		if (o && s[2] ? s[1] !== e[s[0]] : !(s[0] in e)) return !1;
	}
	for (; ++i < a;) {
		s = n[i];
		var c = s[0], l = e[c], u = s[1];
		if (o && s[2]) {
			if (l === void 0 && !(c in e)) return !1;
		} else {
			var d = new dm();
			if (r) var f = r(l, u, c, e, t, d);
			if (!(f === void 0 ? r_(u, l, i_ | a_, r, d) : f)) return !1;
		}
	}
	return !0;
}
P(o_, "baseIsMatch");
var s_ = o_;
function c_(e) {
	return e === e && !ep(e);
}
P(c_, "isStrictComparable");
var l_ = c_;
function u_(e) {
	for (var t = Tg(e), n = t.length; n--;) {
		var r = t[n], i = e[r];
		t[n] = [
			r,
			i,
			l_(i)
		];
	}
	return t;
}
P(u_, "getMatchData");
var d_ = u_;
function f_(e, t) {
	return function(n) {
		return n != null && n[e] === t && (t !== void 0 || e in Object(n));
	};
}
P(f_, "matchesStrictComparable");
var p_ = f_;
function m_(e) {
	var t = d_(e);
	return t.length == 1 && t[0][2] ? p_(t[0][0], t[0][1]) : function(n) {
		return n === e || s_(n, e, t);
	};
}
P(m_, "baseMatches");
var h_ = m_, g_ = "[object Symbol]";
function __(e) {
	return typeof e == "symbol" || uh(e) && Qf(e) == g_;
}
P(__, "isSymbol");
var v_ = __, y_ = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, b_ = /^\w*$/;
function x_(e, t) {
	if (Zm(e)) return !1;
	var n = typeof e;
	return n == "number" || n == "symbol" || n == "boolean" || e == null || v_(e) ? !0 : b_.test(e) || !y_.test(e) || t != null && e in Object(t);
}
P(x_, "isKey");
var S_ = x_, C_ = "Expected a function";
function w_(e, t) {
	if (typeof e != "function" || t != null && typeof t != "function") throw TypeError(C_);
	var n = /* @__PURE__ */ P(function() {
		var r = arguments, i = t ? t.apply(this, r) : r[0], a = n.cache;
		if (a.has(i)) return a.get(i);
		var o = e.apply(this, r);
		return n.cache = a.set(i, o) || a, o;
	}, "memoized");
	return n.cache = new (w_.Cache || om)(), n;
}
P(w_, "memoize"), w_.Cache = om;
var T_ = w_, E_ = 500;
function D_(e) {
	var t = T_(e, function(e) {
		return n.size === E_ && n.clear(), e;
	}), n = t.cache;
	return t;
}
P(D_, "memoizeCapped");
var O_ = D_, k_ = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, A_ = /\\(\\)?/g, j_ = O_(function(e) {
	var t = [];
	return e.charCodeAt(0) === 46 && t.push(""), e.replace(k_, function(e, n, r, i) {
		t.push(r ? i.replace(A_, "$1") : n || e);
	}), t;
}), M_ = 1 / 0, N_ = Rf ? Rf.prototype : void 0, P_ = N_ ? N_.toString : void 0;
function F_(e) {
	if (typeof e == "string") return e;
	if (Zm(e)) return lf(e, F_) + "";
	if (v_(e)) return P_ ? P_.call(e) : "";
	var t = e + "";
	return t == "0" && 1 / e == -M_ ? "-0" : t;
}
P(F_, "baseToString");
var I_ = F_;
function L_(e) {
	return e == null ? "" : I_(e);
}
P(L_, "toString");
var R_ = L_;
function z_(e, t) {
	return Zm(e) ? e : S_(e, t) ? [e] : j_(R_(e));
}
P(z_, "castPath");
var B_ = z_, V_ = 1 / 0;
function H_(e) {
	if (typeof e == "string" || v_(e)) return e;
	var t = e + "";
	return t == "0" && 1 / e == -V_ ? "-0" : t;
}
P(H_, "toKey");
var U_ = H_;
function W_(e, t) {
	t = B_(t, e);
	for (var n = 0, r = t.length; e != null && n < r;) e = e[U_(t[n++])];
	return n && n == r ? e : void 0;
}
P(W_, "baseGet");
var G_ = W_;
function K_(e, t, n) {
	var r = e == null ? void 0 : G_(e, t);
	return r === void 0 ? n : r;
}
P(K_, "get");
var q_ = K_;
function J_(e, t) {
	return e != null && t in Object(e);
}
P(J_, "baseHasIn");
var Y_ = J_;
function X_(e, t, n) {
	t = B_(t, e);
	for (var r = -1, i = t.length, a = !1; ++r < i;) {
		var o = U_(t[r]);
		if (!(a = e != null && n(e, o))) break;
		e = e[o];
	}
	return a || ++r != i ? a : (i = e == null ? 0 : e.length, !!i && Ah(i) && Dh(o, i) && (Zm(e) || _h(e)));
}
P(X_, "hasPath");
var Z_ = X_;
function Q_(e, t) {
	return e != null && Z_(e, t, Y_);
}
P(Q_, "hasIn");
var $_ = Q_, ev = 1, tv = 2;
function nv(e, t) {
	return S_(e) && l_(t) ? p_(U_(e), t) : function(n) {
		var r = q_(n, e);
		return r === void 0 && r === t ? $_(n, e) : r_(t, r, ev | tv);
	};
}
P(nv, "baseMatchesProperty");
var rv = nv;
function iv(e) {
	return e;
}
P(iv, "identity");
var av = iv;
function ov(e) {
	return function(t) {
		return t?.[e];
	};
}
P(ov, "baseProperty");
var sv = ov;
function cv(e) {
	return function(t) {
		return G_(t, e);
	};
}
P(cv, "basePropertyDeep");
var lv = cv;
function uv(e) {
	return S_(e) ? sv(U_(e)) : lv(e);
}
P(uv, "property");
var dv = uv;
function fv(e) {
	return typeof e == "function" ? e : e == null ? av : typeof e == "object" ? Zm(e) ? rv(e[0], e[1]) : h_(e) : dv(e);
}
P(fv, "baseIteratee");
var pv = fv;
function mv(e) {
	return function(t, n, r) {
		for (var i = -1, a = Object(t), o = r(t), s = o.length; s--;) {
			var c = o[e ? s : ++i];
			if (n(a[c], c, a) === !1) break;
		}
		return t;
	};
}
P(mv, "createBaseFor");
var hv = mv();
function gv(e, t) {
	return e && hv(e, t, Tg);
}
P(gv, "baseForOwn");
var _v = gv;
function vv(e, t) {
	return function(n, r) {
		if (n == null) return n;
		if (!Cg(n)) return e(n, r);
		for (var i = n.length, a = t ? i : -1, o = Object(n); (t ? a-- : ++a < i) && r(o[a], a, o) !== !1;);
		return n;
	};
}
P(vv, "createBaseEach");
var yv = vv(_v);
function bv(e, t) {
	var n = -1, r = Cg(e) ? Array(e.length) : [];
	return yv(e, function(e, i, a) {
		r[++n] = t(e, i, a);
	}), r;
}
P(bv, "baseMap");
var xv = bv;
function Sv(e, t) {
	return (Zm(e) ? lf : xv)(e, pv(t, 3));
}
P(Sv, "map");
var Cv = Sv;
function wv(e, t) {
	var n = [];
	return yv(e, function(e, r, i) {
		t(e, r, i) && n.push(e);
	}), n;
}
P(wv, "baseFilter");
var Tv = wv;
function Ev(e, t) {
	return (Zm(e) ? th : Tv)(e, pv(t, 3));
}
P(Ev, "filter");
var Dv = Ev;
function Ov(e, t, n) {
	return `${e.name}_${t}_${n}`;
}
P(Ov, "buildATNKey");
var kv = 1, Av = 2, jv = 4, Mv = 5, Nv = 7, Pv = 8, Fv = 9, Iv = 10, Lv = 11, Rv = 12, zv = (Ee = class {
	constructor(e) {
		this.target = e;
	}
	isEpsilon() {
		return !1;
	}
}, P(Ee, "AbstractTransition"), Ee), Bv = (De = class extends zv {
	constructor(e, t) {
		super(e), this.tokenType = t;
	}
}, P(De, "AtomTransition"), De), Vv = (Oe = class extends zv {
	constructor(e) {
		super(e);
	}
	isEpsilon() {
		return !0;
	}
}, P(Oe, "EpsilonTransition"), Oe), Hv = (ke = class extends zv {
	constructor(e, t, n) {
		super(e), this.rule = t, this.followState = n;
	}
	isEpsilon() {
		return !0;
	}
}, P(ke, "RuleTransition"), ke);
function Uv(e) {
	let t = {
		decisionMap: {},
		decisionStates: [],
		ruleToStartState: /* @__PURE__ */ new Map(),
		ruleToStopState: /* @__PURE__ */ new Map(),
		states: []
	};
	Wv(t, e);
	let n = e.length;
	for (let r = 0; r < n; r++) {
		let n = e[r], i = Qv(t, n, n);
		i !== void 0 && cy(t, n, i);
	}
	return t;
}
P(Uv, "createATN");
function Wv(e, t) {
	let n = t.length;
	for (let r = 0; r < n; r++) {
		let n = t[r], i = Y(e, n, void 0, { type: Av }), a = Y(e, n, void 0, { type: Nv });
		i.stop = a, e.ruleToStartState.set(n, i), e.ruleToStopState.set(n, a);
	}
}
P(Wv, "createRuleStartAndStopATNStates");
function Gv(e, t, n) {
	return n instanceof W ? oy(e, t, n.terminalType, n) : n instanceof Ks ? sy(e, t, n) : n instanceof $s ? Xv(e, t, n) : n instanceof Ys ? Zv(e, t, n) : n instanceof U ? Kv(e, t, n) : n instanceof Qs ? qv(e, t, n) : n instanceof Xs ? Jv(e, t, n) : n instanceof Zs ? Yv(e, t, n) : Qv(e, t, n);
}
P(Gv, "atom");
function Kv(e, t, n) {
	let r = Y(e, t, n, { type: Mv });
	return ny(e, r), ey(e, t, n, ry(e, t, r, n, Qv(e, t, n)));
}
P(Kv, "repetition");
function qv(e, t, n) {
	let r = Y(e, t, n, { type: Mv });
	return ny(e, r), ey(e, t, n, ry(e, t, r, n, Qv(e, t, n)), oy(e, t, n.separator, n));
}
P(qv, "repetitionSep");
function Jv(e, t, n) {
	let r = Y(e, t, n, { type: jv });
	return ny(e, r), $v(e, t, n, ry(e, t, r, n, Qv(e, t, n)));
}
P(Jv, "repetitionMandatory");
function Yv(e, t, n) {
	let r = Y(e, t, n, { type: jv });
	return ny(e, r), $v(e, t, n, ry(e, t, r, n, Qv(e, t, n)), oy(e, t, n.separator, n));
}
P(Yv, "repetitionMandatorySep");
function Xv(e, t, n) {
	let r = Y(e, t, n, { type: kv });
	return ny(e, r), ry(e, t, r, n, ...Cv(n.definition, (n) => Gv(e, t, n)));
}
P(Xv, "alternation");
function Zv(e, t, n) {
	let r = Y(e, t, n, { type: kv });
	return ny(e, r), ty(e, t, n, ry(e, t, r, n, Qv(e, t, n)));
}
P(Zv, "option");
function Qv(e, t, n) {
	let r = Dv(Cv(n.definition, (n) => Gv(e, t, n)), (e) => e !== void 0);
	return r.length === 1 ? r[0] : r.length === 0 ? void 0 : ay(e, r);
}
P(Qv, "block");
function $v(e, t, n, r, i) {
	let a = r.left, o = r.right, s = Y(e, t, n, { type: Lv });
	ny(e, s);
	let c = Y(e, t, n, { type: Rv });
	return a.loopback = s, c.loopback = s, e.decisionMap[Ov(t, i ? "RepetitionMandatoryWithSeparator" : "RepetitionMandatory", n.idx)] = s, J(o, s), i === void 0 ? (J(s, a), J(s, c)) : (J(s, c), J(s, i.left), J(i.right, a)), {
		left: a,
		right: c
	};
}
P($v, "plus");
function ey(e, t, n, r, i) {
	let a = r.left, o = r.right, s = Y(e, t, n, { type: Iv });
	ny(e, s);
	let c = Y(e, t, n, { type: Rv }), l = Y(e, t, n, { type: Fv });
	return s.loopback = l, c.loopback = l, J(s, a), J(s, c), J(o, l), i === void 0 ? J(l, s) : (J(l, c), J(l, i.left), J(i.right, a)), e.decisionMap[Ov(t, i ? "RepetitionWithSeparator" : "Repetition", n.idx)] = s, {
		left: s,
		right: c
	};
}
P(ey, "star");
function ty(e, t, n, r) {
	let i = r.left, a = r.right;
	return J(i, a), e.decisionMap[Ov(t, "Option", n.idx)] = i, r;
}
P(ty, "optional");
function ny(e, t) {
	return e.decisionStates.push(t), t.decision = e.decisionStates.length - 1, t.decision;
}
P(ny, "defineDecisionState");
function ry(e, t, n, r, ...i) {
	let a = Y(e, t, r, {
		type: Pv,
		start: n
	});
	n.end = a;
	for (let e of i) e === void 0 ? J(n, a) : (J(n, e.left), J(e.right, a));
	let o = {
		left: n,
		right: a
	};
	return e.decisionMap[Ov(t, iy(r), r.idx)] = n, o;
}
P(ry, "makeAlts");
function iy(e) {
	if (e instanceof $s) return "Alternation";
	if (e instanceof Ys) return "Option";
	if (e instanceof U) return "Repetition";
	if (e instanceof Qs) return "RepetitionWithSeparator";
	if (e instanceof Xs) return "RepetitionMandatory";
	if (e instanceof Zs) return "RepetitionMandatoryWithSeparator";
	throw Error("Invalid production type encountered");
}
P(iy, "getProdType");
function ay(e, t) {
	let n = t.length;
	for (let r = 0; r < n - 1; r++) {
		let n = t[r], i;
		n.left.transitions.length === 1 && (i = n.left.transitions[0]);
		let a = i instanceof Hv, o = i, s = t[r + 1].left;
		n.left.type === kv && n.right.type === kv && i !== void 0 && (a && o.followState === n.right || i.target === n.right) ? (a ? o.followState = s : i.target = s, uy(e, n.right)) : J(n.right, s);
	}
	let r = t[0], i = t[n - 1];
	return {
		left: r.left,
		right: i.right
	};
}
P(ay, "makeBlock");
function oy(e, t, n, r) {
	let i = Y(e, t, r, { type: kv }), a = Y(e, t, r, { type: kv });
	return ly(i, new Bv(a, n)), {
		left: i,
		right: a
	};
}
P(oy, "tokenRef");
function sy(e, t, n) {
	let r = n.referencedRule, i = e.ruleToStartState.get(r), a = Y(e, t, n, { type: kv }), o = Y(e, t, n, { type: kv });
	return ly(a, new Hv(i, r, o)), {
		left: a,
		right: o
	};
}
P(sy, "ruleRef");
function cy(e, t, n) {
	let r = e.ruleToStartState.get(t);
	J(r, n.left);
	let i = e.ruleToStopState.get(t);
	return J(n.right, i), {
		left: r,
		right: i
	};
}
P(cy, "buildRuleHandle");
function J(e, t) {
	ly(e, new Vv(t));
}
P(J, "epsilon");
function Y(e, t, n, r) {
	let i = Object.assign({
		atn: e,
		production: n,
		epsilonOnlyTransitions: !1,
		rule: t,
		transitions: [],
		nextTokenWithinRule: [],
		stateNumber: e.states.length
	}, r);
	return e.states.push(i), i;
}
P(Y, "newState");
function ly(e, t) {
	e.transitions.length === 0 && (e.epsilonOnlyTransitions = t.isEpsilon()), e.transitions.push(t);
}
P(ly, "addTransition");
function uy(e, t) {
	e.states.splice(e.states.indexOf(t), 1);
}
P(uy, "removeState");
var dy = {}, fy = (Ae = class {
	constructor() {
		this.map = {}, this.configs = [];
	}
	get size() {
		return this.configs.length;
	}
	finalize() {
		this.map = {};
	}
	add(e) {
		let t = py(e);
		t in this.map || (this.map[t] = this.configs.length, this.configs.push(e));
	}
	get elements() {
		return this.configs;
	}
	get alts() {
		return Cv(this.configs, (e) => e.alt);
	}
	get key() {
		let e = "";
		for (let t in this.map) e += t + ":";
		return e;
	}
}, P(Ae, "ATNConfigSet"), Ae);
function py(e, t = !0) {
	return `${t ? `a${e.alt}` : ""}s${e.state.stateNumber}:${e.stack.map((e) => e.stateNumber.toString()).join("_")}`;
}
P(py, "getATNConfigKey");
function my(e, t, n) {
	for (var r = -1, i = e.length; ++r < i;) {
		var a = e[r], o = t(a);
		if (o != null && (s === void 0 ? o === o && !v_(o) : n(o, s))) var s = o, c = a;
	}
	return c;
}
P(my, "baseExtremum");
var hy = my;
function gy(e, t) {
	return e < t;
}
P(gy, "baseLt");
var _y = gy;
function vy(e) {
	return e && e.length ? hy(e, av, _y) : void 0;
}
P(vy, "min");
var yy = vy, by = Rf ? Rf.isConcatSpreadable : void 0;
function xy(e) {
	return Zm(e) || _h(e) || !!(by && e && e[by]);
}
P(xy, "isFlattenable");
var Sy = xy;
function Cy(e, t, n, r, i) {
	var a = -1, o = e.length;
	for (n ||= Sy, i ||= []; ++a < o;) {
		var s = e[a];
		t > 0 && n(s) ? t > 1 ? Cy(s, t - 1, n, r, i) : Xm(i, s) : r || (i[i.length] = s);
	}
	return i;
}
P(Cy, "baseFlatten");
var wy = Cy;
function Ty(e, t) {
	return wy(Cv(e, t), 1);
}
P(Ty, "flatMap");
var Ey = Ty;
function Dy(e, t, n, r) {
	for (var i = e.length, a = n + (r ? 1 : -1); r ? a-- : ++a < i;) if (t(e[a], a, e)) return a;
	return -1;
}
P(Dy, "baseFindIndex");
var Oy = Dy;
function ky(e) {
	return e !== e;
}
P(ky, "baseIsNaN");
var Ay = ky;
function jy(e, t, n) {
	for (var r = n - 1, i = e.length; ++r < i;) if (e[r] === t) return r;
	return -1;
}
P(jy, "strictIndexOf");
var My = jy;
function Ny(e, t, n) {
	return t === t ? My(e, t, n) : Oy(e, Ay, n);
}
P(Ny, "baseIndexOf");
var Py = Ny;
function Fy(e, t) {
	return !!(e != null && e.length) && Py(e, t, 0) > -1;
}
P(Fy, "arrayIncludes");
var Iy = Fy;
function Ly(e, t, n) {
	for (var r = -1, i = e == null ? 0 : e.length; ++r < i;) if (n(t, e[r])) return !0;
	return !1;
}
P(Ly, "arrayIncludesWith");
var Ry = Ly;
function zy() {}
P(zy, "noop");
var By = zy, Vy = Pg && 1 / jm(new Pg([, -0]))[1] == 1 / 0 ? function(e) {
	return new Pg(e);
} : By, Hy = 200;
function Uy(e, t, n) {
	var r = -1, i = Iy, a = e.length, o = !0, s = [], c = s;
	if (n) o = !1, i = Ry;
	else if (a >= Hy) {
		var l = t ? null : Vy(e);
		if (l) return jm(l);
		o = !1, i = Sm, c = new vm();
	} else c = t ? [] : s;
	e: for (; ++r < a;) {
		var u = e[r], d = t ? t(u) : u;
		if (u = n || u !== 0 ? u : 0, o && d === d) {
			for (var f = c.length; f--;) if (c[f] === d) continue e;
			t && c.push(d), s.push(u);
		} else i(c, d, n) || (c !== s && c.push(d), s.push(u));
	}
	return s;
}
P(Uy, "baseUniq");
var Wy = Uy;
function Gy(e, t) {
	return e && e.length ? Wy(e, pv(t, 2)) : [];
}
P(Gy, "uniqBy");
var Ky = Gy;
function qy(e) {
	return e != null && e.length ? wy(e, 1) : [];
}
P(qy, "flatten");
var Jy = qy;
function Yy(e, t) {
	for (var n = -1, r = e == null ? 0 : e.length; ++n < r && t(e[n], n, e) !== !1;);
	return e;
}
P(Yy, "arrayEach");
var Xy = Yy;
function Zy(e) {
	return typeof e == "function" ? e : av;
}
P(Zy, "castFunction");
var Qy = Zy;
function $y(e, t) {
	return (Zm(e) ? Xy : yv)(e, Qy(t));
}
P($y, "forEach");
var eb = $y, tb = "[object Map]", nb = "[object Set]", rb = Object.prototype.hasOwnProperty;
function ib(e) {
	if (e == null) return !0;
	if (Cg(e) && (Zm(e) || typeof e == "string" || typeof e.splice == "function" || Ch(e) || ug(e) || _h(e))) return !e.length;
	var t = Jg(e);
	if (t == tb || t == nb) return !e.size;
	if (gg(e)) return !xg(e).length;
	for (var n in e) if (rb.call(e, n)) return !1;
	return !0;
}
P(ib, "isEmpty");
var ab = ib;
function ob(e, t, n, r) {
	var i = -1, a = e == null ? 0 : e.length;
	for (r && a && (n = e[++i]); ++i < a;) n = t(n, e[i], i, e);
	return n;
}
P(ob, "arrayReduce");
var sb = ob;
function cb(e, t, n, r, i) {
	return i(e, function(e, i, a) {
		n = r ? (r = !1, e) : t(n, e, i, a);
	}), n;
}
P(cb, "baseReduce");
var lb = cb;
function ub(e, t, n) {
	var r = Zm(e) ? sb : lb, i = arguments.length < 3;
	return r(e, pv(t, 4), n, i, yv);
}
P(ub, "reduce");
var db = ub;
function fb(e, t) {
	let n = {};
	return (r) => {
		let i = r.toString(), a = n[i];
		return a !== void 0 || (a = {
			atnStartState: e,
			decision: t,
			states: {}
		}, n[i] = a), a;
	};
}
P(fb, "createDFACache");
var pb = (je = class {
	constructor() {
		this.predicates = [];
	}
	is(e) {
		return e >= this.predicates.length || this.predicates[e];
	}
	set(e, t) {
		this.predicates[e] = t;
	}
	toString() {
		let e = "", t = this.predicates.length;
		for (let n = 0; n < t; n++) e += this.predicates[n] === !0 ? "1" : "0";
		return e;
	}
}, P(je, "PredicateSet"), je), mb = new pb(), hb = (Me = class extends bd {
	constructor(e) {
		super(), this.logging = e?.logging ?? ((e) => console.log(e)), this.incomplete = e?.incomplete ?? !1;
	}
	initialize(e) {
		this.atn = Uv(e.rules), this.dfas = bb(this.atn), this.callers = _b(this.atn);
	}
	validateAmbiguousAlternationAlternatives() {
		return [];
	}
	validateEmptyOrAlternatives() {
		return [];
	}
	buildLookaheadForAlternation(e) {
		let { prodOccurrence: t, rule: n, hasPredicates: r, dynamicTokensEnabled: i } = e, a = this.dfas, o = this.logging, s = this.incomplete, c = Ov(n, "Alternation", t), l = this.atn.decisionMap[c].decision, u = Cv(mu({
			maxLookahead: 1,
			occurrence: t,
			prodType: "Alternation",
			rule: n
		}), (e) => Cv(e, (e) => e[0]));
		if (gb(u, !1) && !i) {
			let e = db(u, (e, t, n) => (eb(t, (t) => {
				t && (e[t.tokenTypeIdx] = n, eb(t.categoryMatches, (t) => {
					e[t] = n;
				}));
			}), e), {});
			return r ? function(t) {
				let n = this.LA_FAST(1), r = e[n.tokenTypeIdx];
				if (t !== void 0 && r !== void 0) {
					let e = t[r]?.GATE;
					if (e !== void 0 && e.call(this) === !1) return;
				}
				return r;
			} : function() {
				let t = this.LA_FAST(1);
				return e[t.tokenTypeIdx];
			};
		}
		return r ? function(e) {
			let t = new pb(), n = e === void 0 ? 0 : e.length;
			for (let r = 0; r < n; r++) {
				let n = e?.[r].GATE;
				t.set(r, n === void 0 || n.call(this));
			}
			let r = xb.call(this, a, l, t, o, s);
			return typeof r == "number" ? r : void 0;
		} : function() {
			let e = xb.call(this, a, l, mb, o, s);
			return typeof e == "number" ? e : void 0;
		};
	}
	buildLookaheadForOptional(e) {
		let { prodOccurrence: t, rule: n, prodType: r, dynamicTokensEnabled: i } = e, a = this.dfas, o = this.logging, s = this.incomplete, c = this.callers, l = Ov(n, r, t), u = this.atn.decisionMap[l], d = u.decision, f = Cv(mu({
			maxLookahead: 1,
			occurrence: t,
			prodType: r,
			rule: n
		}), (e) => Cv(e, (e) => e[0]));
		if (gb(f) && f[0][0] && !i && !yb(u, r, c)) {
			let e = f[0], t = Jy(e);
			if (t.length === 1 && ab(t[0].categoryMatches)) {
				let e = t[0].tokenTypeIdx;
				return function() {
					return this.LA_FAST(1).tokenTypeIdx === e;
				};
			}
			{
				let e = db(t, (e, t) => (t !== void 0 && (e[t.tokenTypeIdx] = !0, eb(t.categoryMatches, (t) => {
					e[t] = !0;
				})), e), {});
				return function() {
					let t = this.LA_FAST(1);
					return e[t.tokenTypeIdx] === !0;
				};
			}
		}
		return function() {
			let e = xb.call(this, a, d, mb, o, s);
			return typeof e != "object" && e === 0;
		};
	}
}, P(Me, "LLStarLookaheadStrategy"), Me);
function gb(e, t = !0) {
	let n = /* @__PURE__ */ new Set();
	for (let r of e) {
		let e = /* @__PURE__ */ new Set();
		for (let i of r) {
			if (i === void 0) {
				if (t) break;
				return !1;
			}
			let r = [i.tokenTypeIdx].concat(i.categoryMatches);
			for (let t of r) if (n.has(t)) {
				if (!e.has(t)) return !1;
			} else n.add(t), e.add(t);
		}
	}
	return !0;
}
P(gb, "isLL1Sequence");
function _b(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e.states) for (let e of n.transitions) if (e instanceof Hv) {
		let n = t.get(e.rule);
		n === void 0 && (n = [], t.set(e.rule, n)), n.push(e.followState);
	}
	return t;
}
P(_b, "buildCallers");
function vb(e, t) {
	let n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set(), i = [e];
	for (; i.length > 0;) {
		let e = i.shift();
		if (!r.has(e)) {
			if (r.add(e), e.type === Nv) {
				if (t !== void 0) {
					let n = t.get(e.rule);
					n !== void 0 && i.push(...n);
				}
				continue;
			}
			for (let t of e.transitions) if (t instanceof Bv) {
				n.add(t.tokenType.tokenTypeIdx);
				for (let e of t.tokenType.categoryMatches) n.add(e);
			} else i.push(t.target);
		}
	}
	return n;
}
P(vb, "firstSet");
function yb(e, t, n) {
	let r = t === "RepetitionMandatoryWithSeparator", i = e.transitions[+!!r], a = e.transitions[+!r];
	if (i === void 0 || a === void 0) return !1;
	let o = vb(i.target), s = vb(a.target, n);
	for (let e of o) if (s.has(e)) return !0;
	return !1;
}
P(yb, "optionalHasFollowConflict");
function bb(e) {
	let t = e.decisionStates.length, n = Array(t);
	for (let r = 0; r < t; r++) n[r] = fb(e.decisionStates[r], r);
	return n;
}
P(bb, "initATNSimulator");
function xb(e, t, n, r, i) {
	let a = e[t](n), o = a.start;
	return o === void 0 && (o = Pb(a, Mb(Fb(a.atnStartState))), a.start = o), Sb.apply(this, [
		a,
		o,
		n,
		r,
		i
	]);
}
P(xb, "adaptivePredict");
function Sb(e, t, n, r, i) {
	let a = t, o = 1, s = [], c = this.LA_FAST(o++);
	for (;;) {
		let t = Ob(a, c);
		if (t === void 0 && (t = Cb.apply(this, [
			e,
			a,
			c,
			o,
			n,
			r
		])), t === dy) return Db(s, a, c);
		if (t.isAcceptState === !0) {
			if (i === !0 && Zl(c, Yl)) {
				let e = Wb(a, n);
				if (e !== void 0) return e;
			}
			return t.prediction;
		}
		a = t, s.push(c), c = this.LA(o++);
	}
}
P(Sb, "performLookahead");
function Cb(e, t, n, r, i, a) {
	let o = kb(t.configs, n, i);
	if (o.size === 0) return Nb(e, t, n, dy), dy;
	let s = Mb(o), c = jb(o, i);
	if (c !== void 0) s.isAcceptState = !0, s.prediction = c, s.configs.uniqueAlt = c;
	else if (Bb(o)) {
		let t = yy(o.alts);
		s.isAcceptState = !0, s.prediction = t, s.configs.uniqueAlt = t, wb.apply(this, [
			e,
			r,
			o.alts,
			a
		]);
	}
	return s = Nb(e, t, n, s), s;
}
P(Cb, "computeLookaheadTarget");
function wb(e, t, n, r) {
	let i = [];
	for (let e = 1; e <= t; e++) i.push(this.LA(e).tokenType);
	let a = e.atnStartState, o = a.rule, s = a.production;
	r(Tb({
		topLevelRule: o,
		ambiguityIndices: n,
		production: s,
		prefixPath: i
	}));
}
P(wb, "reportLookaheadAmbiguity");
function Tb(e) {
	let t = Cv(e.prefixPath, (e) => Il(e)).join(", "), n = e.production.idx === 0 ? "" : e.production.idx, r = `Ambiguous Alternatives Detected: <${e.ambiguityIndices.join(", ")}> in <${Eb(e.production)}${n}> inside <${e.topLevelRule.name}> Rule,
<${t}> may appears as a prefix path in all these alternatives.
`;
	return r += "See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES\nFor Further details.", r;
}
P(Tb, "buildAmbiguityError");
function Eb(e) {
	if (e instanceof Ks) return "SUBRULE";
	if (e instanceof Ys) return "OPTION";
	if (e instanceof $s) return "OR";
	if (e instanceof Xs) return "AT_LEAST_ONE";
	if (e instanceof Zs) return "AT_LEAST_ONE_SEP";
	if (e instanceof Qs) return "MANY_SEP";
	if (e instanceof U) return "MANY";
	if (e instanceof W) return "CONSUME";
	throw Error("non exhaustive match");
}
P(Eb, "getProductionDslName");
function Db(e, t, n) {
	return {
		actualToken: n,
		possibleTokenTypes: Ky(Ey(t.configs.elements, (e) => e.state.transitions).filter((e) => e instanceof Bv).map((e) => e.tokenType), (e) => e.tokenTypeIdx),
		tokenPath: e
	};
}
P(Db, "buildAdaptivePredictError");
function Ob(e, t) {
	return e.edges[t.tokenTypeIdx];
}
P(Ob, "getExistingTargetState");
function kb(e, t, n) {
	let r = new fy(), i = [];
	for (let a of e.elements) {
		if (n.is(a.alt) === !1) continue;
		if (a.state.type === Nv) {
			i.push(a);
			continue;
		}
		let e = a.state.transitions.length;
		for (let n = 0; n < e; n++) {
			let e = a.state.transitions[n], i = Ab(e, t);
			i !== void 0 && r.add({
				state: i,
				alt: a.alt,
				stack: a.stack
			});
		}
	}
	let a;
	if (i.length === 0 && r.size === 1 && (a = r), a === void 0) {
		a = new fy();
		for (let e of r.elements) Ib(e, a);
	}
	if (i.length > 0 && !Rb(a)) for (let e of i) a.add(e);
	return a;
}
P(kb, "computeReachSet");
function Ab(e, t) {
	if (e instanceof Bv && Zl(t, e.tokenType)) return e.target;
}
P(Ab, "getReachableTarget");
function jb(e, t) {
	let n;
	for (let r of e.elements) if (t.is(r.alt) === !0) {
		if (n === void 0) n = r.alt;
		else if (n !== r.alt) return;
	}
	return n;
}
P(jb, "getUniqueAlt");
function Mb(e) {
	return {
		configs: e,
		edges: {},
		isAcceptState: !1,
		prediction: -1
	};
}
P(Mb, "newDFAState");
function Nb(e, t, n, r) {
	return r = Pb(e, r), t.edges[n.tokenTypeIdx] = r, r;
}
P(Nb, "addDFAEdge");
function Pb(e, t) {
	if (t === dy) return t;
	let n = t.configs.key, r = e.states[n];
	return r === void 0 ? (t.configs.finalize(), e.states[n] = t, t) : r;
}
P(Pb, "addDFAState");
function Fb(e) {
	let t = new fy(), n = e.transitions.length;
	for (let r = 0; r < n; r++) Ib({
		state: e.transitions[r].target,
		alt: r,
		stack: []
	}, t);
	return t;
}
P(Fb, "computeStartState");
function Ib(e, t) {
	let n = e.state;
	if (n.type === Nv) {
		if (e.stack.length > 0) {
			let n = [...e.stack];
			Ib({
				state: n.pop(),
				alt: e.alt,
				stack: n
			}, t);
		} else t.add(e);
		return;
	}
	n.epsilonOnlyTransitions || t.add(e);
	let r = n.transitions.length;
	for (let i = 0; i < r; i++) {
		let r = n.transitions[i], a = Lb(e, r);
		a !== void 0 && Ib(a, t);
	}
}
P(Ib, "closure");
function Lb(e, t) {
	if (t instanceof Vv) return {
		state: t.target,
		alt: e.alt,
		stack: e.stack
	};
	if (t instanceof Hv) {
		let n = [...e.stack, t.followState];
		return {
			state: t.target,
			alt: e.alt,
			stack: n
		};
	}
}
P(Lb, "getEpsilonTarget");
function Rb(e) {
	for (let t of e.elements) if (t.state.type === Nv) return !0;
	return !1;
}
P(Rb, "hasConfigInRuleStopState");
function zb(e) {
	for (let t of e.elements) if (t.state.type !== Nv) return !1;
	return !0;
}
P(zb, "allConfigsInRuleStopStates");
function Bb(e) {
	if (zb(e)) return !0;
	let t = Vb(e.elements);
	return Hb(t) && !Ub(t);
}
P(Bb, "hasConflictTerminatingPrediction");
function Vb(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = py(n, !1), r = t.get(e);
		r === void 0 && (r = {}, t.set(e, r)), r[n.alt] = !0;
	}
	return t;
}
P(Vb, "getConflictingAltSets");
function Hb(e) {
	for (let t of Array.from(e.values())) if (Object.keys(t).length > 1) return !0;
	return !1;
}
P(Hb, "hasConflictingAltSet");
function Ub(e) {
	for (let t of Array.from(e.values())) if (Object.keys(t).length === 1) return !0;
	return !1;
}
P(Ub, "hasStateAssociatedWithOneAlt");
function Wb(e, t) {
	let n;
	for (let r of e.configs.elements) if (t.is(r.alt) !== !1 && r.state.type !== Nv) {
		if (n === void 0) n = r.alt;
		else if (n !== r.alt) return;
	}
	return n;
}
P(Wb, "getBestGuess");
var Gb = (Ne = class {
	constructor() {
		this.nodeStack = [];
	}
	get current() {
		return this.nodeStack[this.nodeStack.length - 1] ?? this.rootNode;
	}
	buildRootNode(e) {
		return this.rootNode = new Xb(e), this.nodeStack = [this.rootNode], this.rootNode;
	}
	buildCompositeNode(e) {
		let t = new Yb();
		return t.grammarSource = e, this.appendChild(this.current, t), this.nodeStack.push(t), t;
	}
	buildLeafNode(e, t) {
		let n = this.createLeafNode(e, !t);
		return t && (n.grammarSource = t), this.appendChild(this.current, n), n;
	}
	createLeafNode(e, t) {
		return new qb(e.startOffset, e.image.length, e.startLine - 1, e.startColumn - 1, e.endLine - 1, e.endColumn, e.tokenType, t);
	}
	appendChild(e, t) {
		t.container = e, e.content.push(t);
	}
	appendChildren(e, t) {
		for (let n of t) n.container = e;
		e.content.length === 0 ? e.content = t.slice() : e.content.push(...t);
	}
	insertChildren(e, t, n) {
		for (let t of n) t.container = e;
		e.content.splice(t, 0, ...n);
	}
	removeNode(e) {
		let t = e.container;
		if (t) {
			let n = t.content.indexOf(e);
			n >= 0 && t.content.splice(n, 1);
		}
	}
	addHiddenNodes(e) {
		let t = [];
		for (let n of e) t.push(this.createLeafNode(n, !0));
		let n = this.current, r = !1;
		if (n.content.length > 0) this.appendChildren(n, t);
		else {
			for (; n.container;) {
				let e = n.container.content.indexOf(n);
				if (e > 0) {
					this.insertChildren(n.container, e, t), r = !0;
					break;
				}
				n = n.container;
			}
			r || this.insertChildren(this.rootNode, 0, t);
		}
	}
	construct(e) {
		e.$cstNode = this.current;
		let t = this.nodeStack.pop();
		t && (t.content.length === 0 ? this.removeNode(t) : t.content = t.content.slice());
	}
}, P(Ne, "CstNodeBuilder"), Ne), Kb = (Pe = class {
	constructor() {
		this.container = void 0, this.grammarSource = void 0;
	}
	get root() {
		let e = this;
		for (; e.container;) e = e.container;
		return e;
	}
	get text() {
		return this.root.fullText.substring(this.offset, this.end);
	}
}, P(Pe, "AbstractCstNode"), Pe), qb = (Fe = class extends Kb {
	get offset() {
		return this._offset;
	}
	get length() {
		return this._length;
	}
	get end() {
		return this._offset + this._length;
	}
	get hidden() {
		return this._hidden;
	}
	get tokenType() {
		return this._tokenType;
	}
	get astNode() {
		let e = this.container;
		if (!e) throw Error("This node has no associated AST element");
		return e.astNode;
	}
	get range() {
		return {
			start: {
				line: this._startLine,
				character: this._startColumn
			},
			end: {
				line: this._endLine,
				character: this._endColumn
			}
		};
	}
	constructor(e, t, n, r, i, a, o, s = !1) {
		super(), this._hidden = s, this._offset = Jb(e), this._length = Jb(t), this._startLine = Jb(n), this._startColumn = Jb(r), this._endLine = Jb(i), this._endColumn = Jb(a), this._tokenType = o;
	}
}, P(Fe, "LeafCstNodeImpl"), Fe);
function Jb(e) {
	return e | 0;
}
P(Jb, "toSmi");
var Yb = (Ie = class extends Kb {
	constructor() {
		super(...arguments), this.content = [], this._astNode = void 0, this._rangeCache = void 0;
	}
	get astNode() {
		let e = this;
		for (; e;) {
			if (e._astNode) return e._astNode;
			e = e.container;
		}
		throw Error("This node has no associated AST element");
	}
	set astNode(e) {
		this._astNode = e;
	}
	get hidden() {
		return !1;
	}
	get offset() {
		return this.firstNonHiddenNode?.offset ?? 0;
	}
	get length() {
		return this.end - this.offset;
	}
	get end() {
		return this.lastNonHiddenNode?.end ?? 0;
	}
	get range() {
		let e = this._rangeCache;
		if (e === void 0) {
			let t = this.firstNonHiddenNode, n = this.lastNonHiddenNode;
			if (t && n) {
				let { range: r } = t, { range: i } = n;
				this._rangeCache = e = {
					start: r.start,
					end: i.end.line < r.start.line ? r.start : i.end
				};
			} else return {
				start: {
					line: 0,
					character: 0
				},
				end: {
					line: 0,
					character: 0
				}
			};
		}
		return e;
	}
	get firstNonHiddenNode() {
		for (let e of this.content) if (!e.hidden) return e;
		return this.content[0];
	}
	get lastNonHiddenNode() {
		for (let e = this.content.length - 1; e >= 0; e--) {
			let t = this.content[e];
			if (!t.hidden) return t;
		}
		return this.content[this.content.length - 1];
	}
}, P(Ie, "CompositeCstNodeImpl"), Ie), Xb = (Le = class extends Yb {
	get text() {
		return this._text.substring(this.offset, this.end);
	}
	get fullText() {
		return this._text;
	}
	constructor(e) {
		super(), this._text = "", this._text = e ?? "";
	}
}, P(Le, "RootCstNodeImpl"), Le), Zb = /* @__PURE__ */ Symbol("Datatype");
function Qb(e) {
	return e.$type === Zb;
}
P(Qb, "isDataTypeNode");
var $b = "​", ex = /* @__PURE__ */ P((e) => e.endsWith($b) ? e : e + $b, "withRuleSuffix"), tx = (Re = class {
	constructor(e, t) {
		this._unorderedGroups = /* @__PURE__ */ new Map(), this.allRules = /* @__PURE__ */ new Map(), this.lexer = e.parser.Lexer;
		let n = this.lexer.definition, r = e.LanguageMetaData.mode === "production";
		this.wrapper = e.shared.profilers.LangiumProfiler?.isActive("parsing") ? new cx(n, {
			...e.parser.ParserConfig,
			skipValidations: r,
			errorMessageProvider: e.parser.ParserErrorMessageProvider
		}, t, e.shared.profilers.LangiumProfiler.createTask("parsing", e.LanguageMetaData.languageId)) : new sx(n, {
			...e.parser.ParserConfig,
			skipValidations: r,
			errorMessageProvider: e.parser.ParserErrorMessageProvider
		}, t);
	}
	alternatives(e, t) {
		this.wrapper.wrapOr(e, t);
	}
	optional(e, t) {
		this.wrapper.wrapOption(e, t);
	}
	many(e, t) {
		this.wrapper.wrapMany(e, t);
	}
	atLeastOne(e, t) {
		this.wrapper.wrapAtLeastOne(e, t);
	}
	getRule(e) {
		return this.allRules.get(e);
	}
	isRecording() {
		return this.wrapper.IS_RECORDING;
	}
	get unorderedGroups() {
		return this._unorderedGroups;
	}
	getRuleStack() {
		return this.wrapper.RULE_STACK;
	}
	finalize() {
		this.wrapper.wrapSelfAnalysis();
	}
}, P(Re, "AbstractLangiumParser"), Re), nx = (ze = class extends tx {
	get current() {
		return this.stack[this.stack.length - 1];
	}
	constructor(e) {
		super(e, !1), this.nodeBuilder = new Gb(), this.stack = [], this.assignmentMap = /* @__PURE__ */ new Map(), this.operatorPrecedence = /* @__PURE__ */ new Map(), this.linker = e.references.Linker, this.converter = e.parser.ValueConverter, this.astReflection = e.shared.AstReflection;
	}
	rule(e, t) {
		let n = this.computeRuleType(e), r;
		ka(e) && (r = e.name, this.registerPrecedenceMap(e));
		let i = this.wrapper.DEFINE_RULE(ex(e.name), this.startImplementation(n, r, t).bind(this));
		return this.allRules.set(e.name, i), Ka(e) && e.entry && (this.mainRule = i), i;
	}
	registerPrecedenceMap(e) {
		let t = e.name, n = /* @__PURE__ */ new Map();
		for (let t = 0; t < e.operators.precedences.length; t++) {
			let r = e.operators.precedences[t];
			for (let e of r.operators) n.set(e.value, {
				precedence: t,
				rightAssoc: r.associativity === "right"
			});
		}
		this.operatorPrecedence.set(t, n);
	}
	computeRuleType(e) {
		return ka(e) ? Ts(e) : e.fragment ? void 0 : Ss(e) ? Zb : Ts(e);
	}
	parse(e, t = {}) {
		this.nodeBuilder.buildRootNode(e);
		let n = this.lexerResult = this.lexer.tokenize(e);
		this.wrapper.input = n.tokens;
		let r = t.rule ? this.allRules.get(t.rule) : this.mainRule;
		if (!r) throw Error(t.rule ? `No rule found with name '${t.rule}'` : "No main rule available.");
		let i = this.doParse(r);
		return this.nodeBuilder.addHiddenNodes(n.hidden), this.unorderedGroups.clear(), this.lexerResult = void 0, Li(i, { deep: !0 }), {
			value: i,
			lexerErrors: n.errors,
			lexerReport: n.report,
			parserErrors: this.wrapper.errors
		};
	}
	doParse(e) {
		let t = this.wrapper.rule(e);
		if (this.stack.length > 0 && (t = this.construct()), t === void 0) throw Error("No result from parser");
		if (this.stack.length > 0) throw Error("Parser stack is not empty after parsing");
		return this.linkCstNode(t), t;
	}
	linkCstNode(e) {
		xi(e) && e.$cstNode && (e.$cstNode.astNode = e);
	}
	startImplementation(e, t, n) {
		return (r) => {
			let i = !this.isRecording() && e !== void 0;
			if (i) {
				let n = { $type: e };
				this.stack.push(n), e === Zb ? n.value = "" : t !== void 0 && (n.$infixName = t);
			}
			return n(r), i ? this.construct() : void 0;
		};
	}
	extractHiddenTokens(e) {
		let t = this.lexerResult.hidden;
		if (!t.length) return [];
		let n = e.startOffset;
		for (let e = 0; e < t.length; e++) if (t[e].startOffset > n) return t.splice(0, e);
		return t.splice(0, t.length);
	}
	consume(e, t, n) {
		let r = this.wrapper.wrapConsume(e, t);
		if (!this.isRecording() && this.isValidToken(r)) {
			let e = this.extractHiddenTokens(r);
			this.nodeBuilder.addHiddenNodes(e);
			let t = this.nodeBuilder.buildLeafNode(r, n), { assignment: i, crossRef: a } = this.getAssignment(n), o = this.current;
			if (i) {
				let e = Fa(n) ? r.image : this.converter.convert(r.image, t);
				this.assign(i.operator, i.feature, e, t, a);
			} else if (Qb(o)) {
				let e = r.image;
				Fa(n) || (e = this.converter.convert(e, t).toString()), o.value += e;
			}
		}
	}
	isValidToken(e) {
		return !e.isInsertedInRecovery && ko(e);
	}
	subrule(e, t, n, r, i) {
		let a;
		!this.isRecording() && !n && (a = this.nodeBuilder.buildCompositeNode(r));
		let o;
		try {
			o = this.wrapper.wrapSubrule(e, t, i);
		} finally {
			this.isRecording() || (o === void 0 && !n && (o = this.construct()), o !== void 0 && a && a.length > 0 && this.performSubruleAssignment(o, r, a));
		}
	}
	performSubruleAssignment(e, t, n) {
		let { assignment: r, crossRef: i } = this.getAssignment(t);
		if (r) this.assign(r.operator, r.feature, e, n, i);
		else if (!r) {
			let t = this.current;
			if (Qb(t)) t.value += e.toString();
			else if (typeof e == "object" && e) {
				let n = this.assignWithoutOverride(e, t);
				this.stack.pop(), this.stack.push(n);
			}
		}
	}
	action(e, t) {
		if (!this.isRecording()) {
			let n = this.current;
			if (t.feature && t.operator) {
				n = this.construct(), this.nodeBuilder.removeNode(n.$cstNode);
				let r = this.nodeBuilder.buildCompositeNode(t);
				this.nodeBuilder.appendChild(r, n.$cstNode);
				let i = { $type: e };
				this.stack.push(i), this.assign(t.operator, t.feature, n, n.$cstNode);
			} else n.$type = e;
		}
	}
	construct() {
		if (this.isRecording()) return;
		let e = this.stack.pop();
		return this.nodeBuilder.construct(e), "$infixName" in e ? this.constructInfix(e, this.operatorPrecedence.get(e.$infixName)) : Qb(e) ? this.converter.convert(e.value, e.$cstNode) : (qi(this.astReflection, e), e);
	}
	constructInfix(e, t) {
		let n = e.parts;
		if (!Array.isArray(n) || n.length === 0) return;
		let r = e.operators;
		if (!Array.isArray(r) || n.length < 2) return n[0];
		let i = 0, a = -1;
		for (let e = 0; e < r.length; e++) {
			let n = r[e], o = t.get(n) ?? {
				precedence: 1 / 0,
				rightAssoc: !1
			};
			o.precedence > a ? (a = o.precedence, i = e) : o.precedence === a && (o.rightAssoc || (i = e));
		}
		let o = r.slice(0, i), s = r.slice(i + 1), c = n.slice(0, i + 1), l = n.slice(i + 1), u = {
			$infixName: e.$infixName,
			$type: e.$type,
			$cstNode: e.$cstNode,
			parts: c,
			operators: o
		}, d = {
			$infixName: e.$infixName,
			$type: e.$type,
			$cstNode: e.$cstNode,
			parts: l,
			operators: s
		}, f = this.constructInfix(u, t), p = this.constructInfix(d, t);
		return {
			$type: e.$type,
			$cstNode: e.$cstNode,
			left: f,
			operator: r[i],
			right: p
		};
	}
	getAssignment(e) {
		if (!this.assignmentMap.has(e)) {
			let t = Ri(e, ca);
			this.assignmentMap.set(e, {
				assignment: t,
				crossRef: t && _a(t.terminal) ? t.terminal.isMulti ? "multi" : "single" : void 0
			});
		}
		return this.assignmentMap.get(e);
	}
	assign(e, t, n, r, i) {
		let a = this.current, o;
		switch (o = i === "single" && typeof n == "string" ? this.linker.buildReference(a, t, r, n) : i === "multi" && typeof n == "string" ? this.linker.buildMultiReference(a, t, r, n) : n, this.linkCstNode(o), e) {
			case "=":
				a[t] = o;
				break;
			case "?=":
				a[t] = !0;
				break;
			case "+=": Array.isArray(a[t]) || (a[t] = []), a[t].push(o);
		}
	}
	assignWithoutOverride(e, t) {
		for (let [n, r] of Object.entries(t)) {
			let t = e[n];
			t === void 0 ? e[n] = r : Array.isArray(t) && Array.isArray(r) && (r.push(...t), e[n] = r);
		}
		return e.$cstNode = void 0, e;
	}
	get definitionErrors() {
		return this.wrapper.definitionErrors;
	}
}, P(ze, "LangiumParser"), ze), rx = (Be = class {
	buildMismatchTokenMessage(e) {
		return Ql.buildMismatchTokenMessage(e);
	}
	buildNotAllInputParsedMessage(e) {
		return Ql.buildNotAllInputParsedMessage(e);
	}
	buildNoViableAltMessage(e) {
		return Ql.buildNoViableAltMessage(e);
	}
	buildEarlyExitMessage(e) {
		return Ql.buildEarlyExitMessage(e);
	}
}, P(Be, "AbstractParserErrorMessageProvider"), Be), ix = (Ve = class extends rx {
	buildMismatchTokenMessage({ expected: e, actual: t }) {
		return `Expecting ${e.LABEL ? "`" + e.LABEL + "`" : e.name.endsWith(":KW") ? `keyword '${e.name.substring(0, e.name.length - 3)}'` : `token of type '${e.name}'`} but found \`${t.image}\`.`;
	}
	buildNotAllInputParsedMessage({ firstRedundant: e }) {
		return `Expecting end of file but found \`${e.image}\`.`;
	}
}, P(Ve, "LangiumParserErrorMessageProvider"), Ve), ax = (He = class extends tx {
	constructor(e) {
		super(e, !0), this.tokens = [], this.elementStack = [], this.lastElementStack = [], this.nextTokenIndex = 0, this.stackSize = 0;
	}
	action() {}
	construct() {}
	parse(e) {
		this.resetState();
		let t = this.lexer.tokenize(e, { mode: "partial" });
		return this.tokens = t.tokens, this.wrapper.input = [...this.tokens], this.mainRule.call(this.wrapper, {}), this.unorderedGroups.clear(), {
			tokens: this.tokens,
			elementStack: [...this.lastElementStack],
			tokenIndex: this.nextTokenIndex
		};
	}
	rule(e, t) {
		let n = this.wrapper.DEFINE_RULE(ex(e.name), this.startImplementation(t).bind(this));
		return this.allRules.set(e.name, n), e.entry && (this.mainRule = n), n;
	}
	resetState() {
		this.elementStack = [], this.lastElementStack = [], this.nextTokenIndex = 0, this.stackSize = 0;
	}
	startImplementation(e) {
		return (t) => {
			let n = this.keepStackSize();
			try {
				e(t);
			} finally {
				this.resetStackSize(n);
			}
		};
	}
	removeUnexpectedElements() {
		this.elementStack.splice(this.stackSize);
	}
	keepStackSize() {
		let e = this.elementStack.length;
		return this.stackSize = e, e;
	}
	resetStackSize(e) {
		this.removeUnexpectedElements(), this.stackSize = e;
	}
	consume(e, t, n) {
		this.wrapper.wrapConsume(e, t), this.isRecording() || (this.lastElementStack = [...this.elementStack, n], this.nextTokenIndex = this.currIdx + 1);
	}
	subrule(e, t, n, r, i) {
		this.before(r), this.wrapper.wrapSubrule(e, t, i), this.after(r);
	}
	before(e) {
		this.isRecording() || this.elementStack.push(e);
	}
	after(e) {
		if (!this.isRecording()) {
			let t = this.elementStack.lastIndexOf(e);
			t >= 0 && this.elementStack.splice(t);
		}
	}
	get currIdx() {
		return this.wrapper.currIdx;
	}
}, P(He, "LangiumCompletionParser"), He), ox = {
	recoveryEnabled: !0,
	nodeLocationTracking: "full",
	skipValidations: !0,
	errorMessageProvider: new ix()
}, sx = (Ue = class extends sf {
	constructor(e, t, n) {
		let r = t && "maxLookahead" in t;
		super(e, {
			...ox,
			lookaheadStrategy: r ? new bd({ maxLookahead: t.maxLookahead }) : new hb({
				logging: t.skipValidations ? () => {} : void 0,
				incomplete: n
			}),
			...t
		});
	}
	get IS_RECORDING() {
		return this.RECORDING_PHASE;
	}
	DEFINE_RULE(e, t, n) {
		return this.RULE(e, t, n);
	}
	wrapSelfAnalysis() {
		this.performSelfAnalysis();
	}
	wrapConsume(e, t) {
		return this.consume(e, t, void 0);
	}
	wrapSubrule(e, t, n) {
		return this.subrule(e, t, { ARGS: [n] });
	}
	wrapOr(e, t) {
		this.or(e, t);
	}
	wrapOption(e, t) {
		this.option(e, t);
	}
	wrapMany(e, t) {
		this.many(e, t);
	}
	wrapAtLeastOne(e, t) {
		this.atLeastOne(e, t);
	}
	rule(e) {
		return e.call(this, {});
	}
}, P(Ue, "ChevrotainWrapper"), Ue), cx = (We = class extends sx {
	constructor(e, t, n, r) {
		super(e, t, n), this.task = r;
	}
	rule(e) {
		this.task.start(), this.task.startSubTask(this.ruleName(e));
		try {
			return super.rule(e);
		} finally {
			this.task.stopSubTask(this.ruleName(e)), this.task.stop();
		}
	}
	ruleName(e) {
		return e.ruleName;
	}
	subrule(e, t, n) {
		this.task.startSubTask(this.ruleName(t));
		try {
			return super.subrule(e, t, n);
		} finally {
			this.task.stopSubTask(this.ruleName(t));
		}
	}
}, P(We, "ProfilerWrapper"), We);
function lx(e, t, n) {
	return ux({
		parser: t,
		tokens: n,
		ruleNames: /* @__PURE__ */ new Map()
	}, e), t;
}
P(lx, "createParser");
function ux(e, t) {
	let n = us(t, !1), r = B(t.rules).filter(Ka).filter((e) => n.has(e));
	for (let t of r) {
		let n = {
			...e,
			consume: 1,
			optional: 1,
			subrule: 1,
			many: 1,
			or: 1
		};
		e.parser.rule(t, fx(n, t.definition));
	}
	let i = B(t.rules).filter(ka).filter((e) => n.has(e));
	for (let t of i) e.parser.rule(t, dx(e, t));
}
P(ux, "buildRules");
function dx(e, t) {
	let n = t.call.rule.ref;
	if (!n) throw Error("Could not resolve reference to infix operator rule: " + t.call.rule.$refText);
	if (lo(n)) throw Error("Cannot use terminal rule in infix expression");
	let r = t.operators.precedences.flatMap((e) => e.operators), i = {
		$type: "Group",
		elements: []
	}, a = {
		$container: i,
		$type: "Assignment",
		feature: "parts",
		operator: "+=",
		terminal: t.call
	}, o = {
		$container: i,
		$type: "Group",
		elements: [],
		cardinality: "*"
	};
	i.elements.push(a, o);
	let s = {
		$container: o,
		$type: "Assignment",
		feature: "operators",
		operator: "+=",
		terminal: {
			$type: "Alternatives",
			elements: r
		}
	}, c = {
		...a,
		$container: o
	};
	o.elements.push(s, c);
	let l = r.map((t) => e.tokens[t.value]).map((t, n) => ({ ALT: /* @__PURE__ */ P(() => e.parser.consume(n, t, s), "ALT") })), u;
	return (t) => {
		u ??= wx(e, n), e.parser.subrule(0, u, !1, a, t), e.parser.many(0, { DEF: /* @__PURE__ */ P(() => {
			e.parser.alternatives(0, l), e.parser.subrule(1, u, !1, c, t);
		}, "DEF") });
	};
}
P(dx, "buildInfixRule");
function fx(e, t, n = !1) {
	let r;
	if (Fa(t)) r = Sx(e, t);
	else if (na(t)) r = px(e, t);
	else if (ca(t)) r = fx(e, t.terminal);
	else if (_a(t)) r = xx(e, t);
	else if ($a(t)) r = mx(e, t);
	else if (ia(t)) r = _x(e, t);
	else if (yo(t)) r = vx(e, t);
	else if (Ta(t)) r = yx(e, t);
	else if (xa(t)) {
		let n = e.consume++;
		r = /* @__PURE__ */ P(() => e.parser.consume(n, Yl, t), "method");
	} else throw new Ro(t.$cstNode, `Unexpected element type: ${t.$type}`);
	return Cx(e, n ? void 0 : bx(t), r, t.cardinality);
}
P(fx, "buildElement");
function px(e, t) {
	let n = Ts(t);
	return () => e.parser.action(n, t);
}
P(px, "buildAction");
function mx(e, t) {
	let n = t.rule.ref;
	if (Qi(n)) {
		let r = e.subrule++, i = Ka(n) && n.fragment, a = t.arguments.length > 0 ? hx(n, t.arguments) : () => ({}), o;
		return (s) => {
			o ??= wx(e, n), e.parser.subrule(r, o, i, t, a(s));
		};
	}
	if (lo(n)) {
		let r = e.consume++, i = Ex(e, n.name);
		return () => e.parser.consume(r, i, t);
	}
	if (n) zo(n);
	else throw new Ro(t.$cstNode, `Undefined rule: ${t.rule.$refText}`);
}
P(mx, "buildRuleCall");
function hx(e, t) {
	if (t.some((e) => e.calledByName)) {
		let e = t.map((e) => ({
			parameterName: e.parameter?.ref?.name,
			predicate: gx(e.value)
		}));
		return (t) => {
			let n = {};
			for (let { parameterName: r, predicate: i } of e) r && (n[r] = i(t));
			return n;
		};
	}
	{
		let n = t.map((e) => gx(e.value));
		return (t) => {
			let r = {};
			for (let i = 0; i < n.length; i++) if (i < e.parameters.length) {
				let a = e.parameters[i].name, o = n[i];
				r[a] = o(t);
			}
			return r;
		};
	}
}
P(hx, "buildRuleCallPredicate");
function gx(e) {
	if (ya(e)) {
		let t = gx(e.left), n = gx(e.right);
		return (e) => t(e) || n(e);
	}
	if (ha(e)) {
		let t = gx(e.left), n = gx(e.right);
		return (e) => t(e) && n(e);
	}
	if (Ba(e)) {
		let t = gx(e.value);
		return (e) => !t(e);
	}
	if (Wa(e)) {
		let t = e.parameter.ref.name;
		return (e) => e !== void 0 && e[t] === !0;
	}
	if (ua(e)) {
		let t = !!e.true;
		return () => t;
	}
	zo(e);
}
P(gx, "buildPredicate");
function _x(e, t) {
	if (t.elements.length === 1) return fx(e, t.elements[0]);
	{
		let n = [];
		for (let r of t.elements) {
			let t = { ALT: fx(e, r, !0) }, i = bx(r);
			i && (t.GATE = gx(i)), n.push(t);
		}
		let r = e.or++;
		return (t) => e.parser.alternatives(r, n.map((e) => {
			let n = { ALT: /* @__PURE__ */ P(() => e.ALT(t), "ALT") }, r = e.GATE;
			return r && (n.GATE = () => r(t)), n;
		}));
	}
}
P(_x, "buildAlternatives");
function vx(e, t) {
	if (t.elements.length === 1) return fx(e, t.elements[0]);
	let n = [];
	for (let r of t.elements) {
		let t = { ALT: fx(e, r, !0) }, i = bx(r);
		i && (t.GATE = gx(i)), n.push(t);
	}
	let r = e.or++, i = /* @__PURE__ */ P((e, t) => `uGroup_${e}_${t.getRuleStack().join("-")}`, "idFunc"), a = /* @__PURE__ */ P((t) => e.parser.alternatives(r, n.map((n, a) => {
		let o = { ALT: /* @__PURE__ */ P(() => !0, "ALT") }, s = e.parser;
		o.ALT = () => {
			if (n.ALT(t), !s.isRecording()) {
				let e = i(r, s);
				s.unorderedGroups.get(e) || s.unorderedGroups.set(e, []);
				let t = s.unorderedGroups.get(e);
				typeof t?.[a] > "u" && (t[a] = !0);
			}
		};
		let c = n.GATE;
		return o.GATE = c ? () => c(t) : () => !s.unorderedGroups.get(i(r, s))?.[a], o;
	})), "alternatives"), o = Cx(e, bx(t), a, "*");
	return (t) => {
		o(t), e.parser.isRecording() || e.parser.unorderedGroups.delete(i(r, e.parser));
	};
}
P(vx, "buildUnorderedGroup");
function yx(e, t) {
	let n = t.elements.map((t) => fx(e, t));
	return (e) => n.forEach((t) => t(e));
}
P(yx, "buildGroup");
function bx(e) {
	if (Ta(e)) return e.guardCondition;
}
P(bx, "getGuardCondition");
function xx(e, t, n = t.terminal) {
	if (n) {
		if ($a(n) && Ka(n.rule.ref)) {
			let r = n.rule.ref, i = e.subrule++, a;
			return (n) => {
				a ??= wx(e, r), e.parser.subrule(i, a, !1, t, n);
			};
		}
		if ($a(n) && lo(n.rule.ref)) {
			let r = e.consume++, i = Ex(e, n.rule.ref.name);
			return () => e.parser.consume(r, i, t);
		}
		if (Fa(n)) {
			let r = e.consume++, i = Ex(e, n.value);
			return () => e.parser.consume(r, i, t);
		}
		throw Error("Could not build cross reference parser");
	}
	{
		if (!t.type.ref) throw Error("Could not resolve reference to type: " + t.type.$refText);
		let n = bs(t.type.ref)?.terminal;
		if (!n) throw Error("Could not find name assignment for type: " + Ts(t.type.ref));
		return xx(e, t, n);
	}
}
P(xx, "buildCrossReference");
function Sx(e, t) {
	let n = e.consume++, r = e.tokens[t.value];
	if (!r) throw Error("Could not find token for keyword: " + t.value);
	return () => e.parser.consume(n, r, t);
}
P(Sx, "buildKeyword");
function Cx(e, t, n, r) {
	let i = t && gx(t);
	if (!r) {
		if (i) {
			let t = e.or++;
			return (r) => e.parser.alternatives(t, [{
				ALT: /* @__PURE__ */ P(() => n(r), "ALT"),
				GATE: /* @__PURE__ */ P(() => i(r), "GATE")
			}, {
				ALT: af(),
				GATE: /* @__PURE__ */ P(() => !i(r), "GATE")
			}]);
		}
		return n;
	}
	if (r === "*") {
		let t = e.many++;
		return (r) => e.parser.many(t, {
			DEF: /* @__PURE__ */ P(() => n(r), "DEF"),
			GATE: i ? () => i(r) : void 0
		});
	}
	if (r === "+") {
		let t = e.many++;
		if (i) {
			let r = e.or++;
			return (a) => e.parser.alternatives(r, [{
				ALT: /* @__PURE__ */ P(() => e.parser.atLeastOne(t, { DEF: /* @__PURE__ */ P(() => n(a), "DEF") }), "ALT"),
				GATE: /* @__PURE__ */ P(() => i(a), "GATE")
			}, {
				ALT: af(),
				GATE: /* @__PURE__ */ P(() => !i(a), "GATE")
			}]);
		}
		return (r) => e.parser.atLeastOne(t, { DEF: /* @__PURE__ */ P(() => n(r), "DEF") });
	}
	if (r === "?") {
		let t = e.optional++;
		return (r) => e.parser.optional(t, {
			DEF: /* @__PURE__ */ P(() => n(r), "DEF"),
			GATE: i ? () => i(r) : void 0
		});
	}
	zo(r);
}
P(Cx, "wrap");
function wx(e, t) {
	let n = Tx(e, t), r = e.parser.getRule(n);
	if (!r) throw Error(`Rule "${n}" not found."`);
	return r;
}
P(wx, "getRule");
function Tx(e, t) {
	if (Qi(t)) return t.name;
	if (e.ruleNames.has(t)) return e.ruleNames.get(t);
	{
		let n = t, r = n.$container, i = t.$type;
		for (; !Ka(r);) (Ta(r) || ia(r) || yo(r)) && (i = r.elements.indexOf(n).toString() + ":" + i), n = r, r = r.$container;
		return i = r.name + ":" + i, e.ruleNames.set(t, i), i;
	}
}
P(Tx, "getRuleName");
function Ex(e, t) {
	let n = e.tokens[t];
	if (!n) throw Error(`Token "${t}" not found."`);
	return n;
}
P(Ex, "getToken");
function Dx(e) {
	let t = e.Grammar, n = e.parser.Lexer, r = new ax(e);
	return lx(t, r, n.definition), r.finalize(), r;
}
P(Dx, "createCompletionParser");
function Ox(e) {
	let t = kx(e);
	return t.finalize(), t;
}
P(Ox, "createLangiumParser");
function kx(e) {
	let t = e.Grammar, n = e.parser.Lexer;
	return lx(t, new nx(e), n.definition);
}
P(kx, "prepareLangiumParser");
var Ax = (Ge = class {
	constructor() {
		this.diagnostics = [];
	}
	buildTokens(e, t) {
		let n = B(us(e, !1)), r = this.buildTerminalTokens(n), i = this.buildKeywordTokens(n, r, t);
		return i.push(...r), i;
	}
	flushLexingReport(e) {
		return { diagnostics: this.popDiagnostics() };
	}
	popDiagnostics() {
		let e = [...this.diagnostics];
		return this.diagnostics = [], e;
	}
	buildTerminalTokens(e) {
		return e.filter(lo).filter((e) => !e.fragment).map((e) => this.buildTerminalToken(e)).toArray();
	}
	buildTerminalToken(e) {
		let t = Os(e), n = this.requiresCustomPattern(t) ? this.regexPatternFunction(t) : t, r = {
			name: e.name,
			PATTERN: n
		};
		return typeof n == "function" && (r.LINE_BREAKS = !0), e.hidden && (r.GROUP = is(t) ? Fl.SKIPPED : "hidden"), r;
	}
	requiresCustomPattern(e) {
		return !!(e.flags.includes("u") || e.flags.includes("s"));
	}
	regexPatternFunction(e) {
		let t = new RegExp(e, e.flags + "y");
		return (e, n) => (t.lastIndex = n, t.exec(e));
	}
	buildKeywordTokens(e, t, n) {
		return e.filter(Qi).flatMap((e) => Ui(e).filter(Fa)).distinct((e) => e.value).toArray().sort((e, t) => t.value.length - e.value.length).map((e) => this.buildKeywordToken(e, t, !!n?.caseInsensitive));
	}
	buildKeywordToken(e, t, n) {
		let r = this.buildKeywordPattern(e, n), i = {
			name: e.value,
			PATTERN: r,
			LONGER_ALT: this.findLongerAlt(e, t)
		};
		return typeof r == "function" && (i.LINE_BREAKS = !0), i;
	}
	buildKeywordPattern(e, t) {
		return t ? new RegExp(as(e.value), "i") : e.value;
	}
	findLongerAlt(e, t) {
		return t.reduce((t, n) => {
			let r = n?.PATTERN;
			return r?.source && os("^" + r.source + "$", e.value) && t.push(n), t;
		}, []);
	}
}, P(Ge, "DefaultTokenBuilder"), Ge), jx = (Ke = class {
	convert(e, t) {
		let n = t.grammarSource;
		if (_a(n) && (n = fs(n)), $a(n)) {
			let r = n.rule.ref;
			if (!r) throw Error("This cst node was not parsed by a rule.");
			return this.runConverter(r, e, t);
		}
		return e;
	}
	runConverter(e, t, n) {
		switch (e.name.toUpperCase()) {
			case "INT": return Mx.convertInt(t);
			case "STRING": return Mx.convertString(t);
			case "ID": return Mx.convertID(t);
		}
		switch (Ds(e)?.toLowerCase()) {
			case "number": return Mx.convertNumber(t);
			case "boolean": return Mx.convertBoolean(t);
			case "bigint": return Mx.convertBigint(t);
			case "date": return Mx.convertDate(t);
			default: return t;
		}
	}
}, P(Ke, "DefaultValueConverter"), Ke), Mx;
(function(e) {
	function t(e) {
		let t = "";
		for (let r = 1; r < e.length - 1; r++) {
			let i = e.charAt(r);
			if (i === "\\") {
				let i = e.charAt(++r);
				t += n(i);
			} else t += i;
		}
		return t;
	}
	P(t, "convertString"), e.convertString = t;
	function n(e) {
		switch (e) {
			case "b": return "\b";
			case "f": return "\f";
			case "n": return "\n";
			case "r": return "\r";
			case "t": return "	";
			case "v": return "\v";
			case "0": return "\0";
			default: return e;
		}
	}
	P(n, "convertEscapeCharacter");
	function r(e) {
		return e.charAt(0) === "^" ? e.substring(1) : e;
	}
	P(r, "convertID"), e.convertID = r;
	function i(e) {
		return parseInt(e);
	}
	P(i, "convertInt"), e.convertInt = i;
	function a(e) {
		return BigInt(e);
	}
	P(a, "convertBigint"), e.convertBigint = a;
	function o(e) {
		return new Date(e);
	}
	P(o, "convertDate"), e.convertDate = o;
	function s(e) {
		return Number(e);
	}
	P(s, "convertNumber"), e.convertNumber = s;
	function c(e) {
		return e.toLowerCase() === "true";
	}
	P(c, "convertBoolean"), e.convertBoolean = c;
})(Mx ||= {});
var X = Qt(bi(), 1);
function Nx() {
	return new Promise((e) => {
		typeof setImmediate > "u" ? setTimeout(e, 0) : setImmediate(e);
	});
}
P(Nx, "delayNextTick");
var Px = 0, Fx = 10;
function Ix() {
	return Px = performance.now(), new X.CancellationTokenSource();
}
P(Ix, "startCancelableOperation");
var Lx = /* @__PURE__ */ Symbol("OperationCancelled");
function Rx(e) {
	return e === Lx;
}
P(Rx, "isOperationCancelled");
async function zx(e) {
	if (e === X.CancellationToken.None) return;
	let t = performance.now();
	if (t - Px >= Fx && (Px = t, await Nx(), Px = performance.now()), e.isCancellationRequested) throw Lx;
}
P(zx, "interruptAndCheck");
var Bx = (qe = class {
	constructor() {
		this.promise = new Promise((e, t) => {
			this.resolve = (t) => (e(t), this), this.reject = (e) => (t(e), this);
		});
	}
}, P(qe, "Deferred"), qe), Vx = (Je = class e {
	constructor(e, t, n, r) {
		this._uri = e, this._languageId = t, this._version = n, this._content = r, this._lineOffsets = void 0;
	}
	get uri() {
		return this._uri;
	}
	get languageId() {
		return this._languageId;
	}
	get version() {
		return this._version;
	}
	getText(e) {
		if (e) {
			let t = this.offsetAt(e.start), n = this.offsetAt(e.end);
			return this._content.substring(t, n);
		}
		return this._content;
	}
	update(t, n) {
		for (let n of t) if (e.isIncremental(n)) {
			let e = Kx(n.range), t = this.offsetAt(e.start), r = this.offsetAt(e.end);
			this._content = this._content.substring(0, t) + n.text + this._content.substring(r, this._content.length);
			let i = Math.max(e.start.line, 0), a = Math.max(e.end.line, 0), o = this._lineOffsets, s = Wx(n.text, !1, t);
			if (a - i === s.length) for (let e = 0, t = s.length; e < t; e++) o[e + i + 1] = s[e];
			else s.length < 1e4 ? o.splice(i + 1, a - i, ...s) : this._lineOffsets = o = o.slice(0, i + 1).concat(s, o.slice(a + 1));
			let c = n.text.length - (r - t);
			if (c !== 0) for (let e = i + 1 + s.length, t = o.length; e < t; e++) o[e] = o[e] + c;
		} else if (e.isFull(n)) this._content = n.text, this._lineOffsets = void 0;
		else throw Error("Unknown change event received");
		this._version = n;
	}
	getLineOffsets() {
		return this._lineOffsets === void 0 && (this._lineOffsets = Wx(this._content, !0)), this._lineOffsets;
	}
	positionAt(e) {
		e = Math.max(Math.min(e, this._content.length), 0);
		let t = this.getLineOffsets(), n = 0, r = t.length;
		if (r === 0) return {
			line: 0,
			character: e
		};
		for (; n < r;) {
			let i = Math.floor((n + r) / 2);
			t[i] > e ? r = i : n = i + 1;
		}
		let i = n - 1;
		return e = this.ensureBeforeEOL(e, t[i]), {
			line: i,
			character: e - t[i]
		};
	}
	offsetAt(e) {
		let t = this.getLineOffsets();
		if (e.line >= t.length) return this._content.length;
		if (e.line < 0) return 0;
		let n = t[e.line];
		if (e.character <= 0) return n;
		let r = e.line + 1 < t.length ? t[e.line + 1] : this._content.length, i = Math.min(n + e.character, r);
		return this.ensureBeforeEOL(i, n);
	}
	getLineRange(e) {
		let t = this.getLineOffsets();
		if (e >= t.length) {
			let e = t.length - 1;
			return {
				start: {
					line: e,
					character: 0
				},
				end: {
					line: e,
					character: this._content.length - t[e]
				}
			};
		}
		if (e < 0) return {
			start: {
				line: 0,
				character: 0
			},
			end: {
				line: 0,
				character: 0
			}
		};
		let n = t[e], r = e + 1 < t.length ? t[e + 1] : this._content.length, i = this.ensureBeforeEOL(r, n);
		return {
			start: {
				line: e,
				character: 0
			},
			end: {
				line: e,
				character: i - n
			}
		};
	}
	getEOLCharacters(e) {
		let t = this.getLineOffsets();
		if (e >= t.length || e < 0) return "";
		let n = e + 1 < t.length ? t[e + 1] : this._content.length, r = this.ensureBeforeEOL(n, t[e]);
		return this._content.substring(r, n);
	}
	ensureBeforeEOL(e, t) {
		for (; e > t && Gx(this._content.charCodeAt(e - 1));) e--;
		return e;
	}
	get lineCount() {
		return this.getLineOffsets().length;
	}
	static isIncremental(e) {
		let t = e;
		return t != null && typeof t.text == "string" && t.range !== void 0 && (t.rangeLength === void 0 || typeof t.rangeLength == "number");
	}
	static isFull(e) {
		let t = e;
		return t != null && typeof t.text == "string" && t.range === void 0 && t.rangeLength === void 0;
	}
}, P(Je, "FullTextDocument"), Je), Hx;
(function(e) {
	function t(e, t, n, r) {
		return new Vx(e, t, n, r);
	}
	P(t, "create"), e.create = t;
	function n(e, t, n) {
		if (e instanceof Vx) return e.update(t, n), e;
		throw Error("TextDocument.update: document must be created by TextDocument.create");
	}
	P(n, "update"), e.update = n;
	function r(e, t) {
		let n = e.getText(), r = Ux(t.map(qx), (e, t) => {
			let n = e.range.start.line - t.range.start.line;
			return n === 0 ? e.range.start.character - t.range.start.character : n;
		}), i = 0, a = [];
		for (let t of r) {
			let r = e.offsetAt(t.range.start);
			if (r < i) throw Error("Overlapping edit");
			r > i && a.push(n.substring(i, r)), t.newText.length && a.push(t.newText), i = e.offsetAt(t.range.end);
		}
		return a.push(n.substr(i)), a.join("");
	}
	P(r, "applyEdits"), e.applyEdits = r;
})(Hx ||= {});
function Ux(e, t) {
	if (e.length <= 1) return e;
	let n = e.length / 2 | 0, r = e.slice(0, n), i = e.slice(n);
	Ux(r, t), Ux(i, t);
	let a = 0, o = 0, s = 0;
	for (; a < r.length && o < i.length;) t(r[a], i[o]) <= 0 ? e[s++] = r[a++] : e[s++] = i[o++];
	for (; a < r.length;) e[s++] = r[a++];
	for (; o < i.length;) e[s++] = i[o++];
	return e;
}
P(Ux, "mergeSort");
function Wx(e, t, n = 0) {
	let r = t ? [n] : [];
	for (let t = 0; t < e.length; t++) {
		let i = e.charCodeAt(t);
		Gx(i) && (i === 13 && t + 1 < e.length && e.charCodeAt(t + 1) === 10 && t++, r.push(n + t + 1));
	}
	return r;
}
P(Wx, "computeLineOffsets");
function Gx(e) {
	return e === 13 || e === 10;
}
P(Gx, "isEOL");
function Kx(e) {
	let t = e.start, n = e.end;
	return t.line > n.line || t.line === n.line && t.character > n.character ? {
		start: n,
		end: t
	} : e;
}
P(Kx, "getWellformedRange");
function qx(e) {
	let t = Kx(e.range);
	return t === e.range ? e : {
		newText: e.newText,
		range: t
	};
}
P(qx, "getWellformedEdit");
var Jx;
(() => {
	var e, t, n = { 975: (e) => {
		function t(e) {
			if (typeof e != "string") throw TypeError("Path must be a string. Received " + JSON.stringify(e));
		}
		P(t, "e");
		function n(e, t) {
			for (var n, r = "", i = 0, a = -1, o = 0, s = 0; s <= e.length; ++s) {
				if (s < e.length) n = e.charCodeAt(s);
				else {
					if (n === 47) break;
					n = 47;
				}
				if (n === 47) {
					if (a !== s - 1 && o !== 1) {
						if (a !== s - 1 && o === 2) {
							if (r.length < 2 || i !== 2 || r.charCodeAt(r.length - 1) !== 46 || r.charCodeAt(r.length - 2) !== 46) {
								if (r.length > 2) {
									var c = r.lastIndexOf("/");
									if (c !== r.length - 1) {
										c === -1 ? (r = "", i = 0) : i = (r = r.slice(0, c)).length - 1 - r.lastIndexOf("/"), a = s, o = 0;
										continue;
									}
								} else if (r.length === 2 || r.length === 1) {
									r = "", i = 0, a = s, o = 0;
									continue;
								}
							}
							t && (r.length > 0 ? r += "/.." : r = "..", i = 2);
						} else r.length > 0 ? r += "/" + e.slice(a + 1, s) : r = e.slice(a + 1, s), i = s - a - 1;
					}
					a = s, o = 0;
				} else n === 46 && o !== -1 ? ++o : o = -1;
			}
			return r;
		}
		P(n, "r");
		var r = {
			resolve: /* @__PURE__ */ P(function() {
				for (var e, r = "", i = !1, a = arguments.length - 1; a >= -1 && !i; a--) {
					var o;
					a >= 0 ? o = arguments[a] : (e === void 0 && (e = process.cwd()), o = e), t(o), o.length !== 0 && (r = o + "/" + r, i = o.charCodeAt(0) === 47);
				}
				return r = n(r, !i), i ? r.length > 0 ? "/" + r : "/" : r.length > 0 ? r : ".";
			}, "resolve"),
			normalize: /* @__PURE__ */ P(function(e) {
				if (t(e), e.length === 0) return ".";
				var r = e.charCodeAt(0) === 47, i = e.charCodeAt(e.length - 1) === 47;
				return (e = n(e, !r)).length !== 0 || r || (e = "."), e.length > 0 && i && (e += "/"), r ? "/" + e : e;
			}, "normalize"),
			isAbsolute: /* @__PURE__ */ P(function(e) {
				return t(e), e.length > 0 && e.charCodeAt(0) === 47;
			}, "isAbsolute"),
			join: /* @__PURE__ */ P(function() {
				if (arguments.length === 0) return ".";
				for (var e, n = 0; n < arguments.length; ++n) {
					var i = arguments[n];
					t(i), i.length > 0 && (e === void 0 ? e = i : e += "/" + i);
				}
				return e === void 0 ? "." : r.normalize(e);
			}, "join"),
			relative: /* @__PURE__ */ P(function(e, n) {
				if (t(e), t(n), e === n || (e = r.resolve(e)) === (n = r.resolve(n))) return "";
				for (var i = 1; i < e.length && e.charCodeAt(i) === 47; ++i);
				for (var a = e.length, o = a - i, s = 1; s < n.length && n.charCodeAt(s) === 47; ++s);
				for (var c = n.length - s, l = o < c ? o : c, u = -1, d = 0; d <= l; ++d) {
					if (d === l) {
						if (c > l) {
							if (n.charCodeAt(s + d) === 47) return n.slice(s + d + 1);
							if (d === 0) return n.slice(s + d);
						} else o > l && (e.charCodeAt(i + d) === 47 ? u = d : d === 0 && (u = 0));
						break;
					}
					var f = e.charCodeAt(i + d);
					if (f !== n.charCodeAt(s + d)) break;
					f === 47 && (u = d);
				}
				var p = "";
				for (d = i + u + 1; d <= a; ++d) d !== a && e.charCodeAt(d) !== 47 || (p.length === 0 ? p += ".." : p += "/..");
				return p.length > 0 ? p + n.slice(s + u) : (s += u, n.charCodeAt(s) === 47 && ++s, n.slice(s));
			}, "relative"),
			_makeLong: /* @__PURE__ */ P(function(e) {
				return e;
			}, "_makeLong"),
			dirname: /* @__PURE__ */ P(function(e) {
				if (t(e), e.length === 0) return ".";
				for (var n = e.charCodeAt(0), r = n === 47, i = -1, a = !0, o = e.length - 1; o >= 1; --o) if ((n = e.charCodeAt(o)) === 47) {
					if (!a) {
						i = o;
						break;
					}
				} else a = !1;
				return i === -1 ? r ? "/" : "." : r && i === 1 ? "//" : e.slice(0, i);
			}, "dirname"),
			basename: /* @__PURE__ */ P(function(e, n) {
				if (n !== void 0 && typeof n != "string") throw TypeError("\"ext\" argument must be a string");
				t(e);
				var r, i = 0, a = -1, o = !0;
				if (n !== void 0 && n.length > 0 && n.length <= e.length) {
					if (n.length === e.length && n === e) return "";
					var s = n.length - 1, c = -1;
					for (r = e.length - 1; r >= 0; --r) {
						var l = e.charCodeAt(r);
						if (l === 47) {
							if (!o) {
								i = r + 1;
								break;
							}
						} else c === -1 && (o = !1, c = r + 1), s >= 0 && (l === n.charCodeAt(s) ? --s == -1 && (a = r) : (s = -1, a = c));
					}
					return i === a ? a = c : a === -1 && (a = e.length), e.slice(i, a);
				}
				for (r = e.length - 1; r >= 0; --r) if (e.charCodeAt(r) === 47) {
					if (!o) {
						i = r + 1;
						break;
					}
				} else a === -1 && (o = !1, a = r + 1);
				return a === -1 ? "" : e.slice(i, a);
			}, "basename"),
			extname: /* @__PURE__ */ P(function(e) {
				t(e);
				for (var n = -1, r = 0, i = -1, a = !0, o = 0, s = e.length - 1; s >= 0; --s) {
					var c = e.charCodeAt(s);
					if (c !== 47) i === -1 && (a = !1, i = s + 1), c === 46 ? n === -1 ? n = s : o !== 1 && (o = 1) : n !== -1 && (o = -1);
					else if (!a) {
						r = s + 1;
						break;
					}
				}
				return n === -1 || i === -1 || o === 0 || o === 1 && n === i - 1 && n === r + 1 ? "" : e.slice(n, i);
			}, "extname"),
			format: /* @__PURE__ */ P(function(e) {
				if (typeof e != "object" || !e) throw TypeError("The \"pathObject\" argument must be of type Object. Received type " + typeof e);
				return (function(e, t) {
					var n = t.dir || t.root, r = t.base || (t.name || "") + (t.ext || "");
					return n ? n === t.root ? n + r : n + "/" + r : r;
				})(0, e);
			}, "format"),
			parse: /* @__PURE__ */ P(function(e) {
				t(e);
				var n = {
					root: "",
					dir: "",
					base: "",
					ext: "",
					name: ""
				};
				if (e.length === 0) return n;
				var r, i = e.charCodeAt(0), a = i === 47;
				a ? (n.root = "/", r = 1) : r = 0;
				for (var o = -1, s = 0, c = -1, l = !0, u = e.length - 1, d = 0; u >= r; --u) if ((i = e.charCodeAt(u)) !== 47) c === -1 && (l = !1, c = u + 1), i === 46 ? o === -1 ? o = u : d !== 1 && (d = 1) : o !== -1 && (d = -1);
				else if (!l) {
					s = u + 1;
					break;
				}
				return o === -1 || c === -1 || d === 0 || d === 1 && o === c - 1 && o === s + 1 ? c !== -1 && (n.base = n.name = s === 0 && a ? e.slice(1, c) : e.slice(s, c)) : (s === 0 && a ? (n.name = e.slice(1, o), n.base = e.slice(1, c)) : (n.name = e.slice(s, o), n.base = e.slice(s, c)), n.ext = e.slice(o, c)), s > 0 ? n.dir = e.slice(0, s - 1) : a && (n.dir = "/"), n;
			}, "parse"),
			sep: "/",
			delimiter: ":",
			win32: null,
			posix: null
		};
		r.posix = r, e.exports = r;
	} }, i = {};
	function a(e) {
		var t = i[e];
		if (t !== void 0) return t.exports;
		var r = i[e] = { exports: {} };
		return n[e](r, r.exports, a), r.exports;
	}
	P(a, "r"), a.d = (e, t) => {
		for (var n in t) a.o(t, n) && !a.o(e, n) && Object.defineProperty(e, n, {
			enumerable: !0,
			get: t[n]
		});
	}, a.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), a.r = (e) => {
		typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
	};
	var o = {};
	let s;
	a.r(o), a.d(o, {
		URI: /* @__PURE__ */ P(() => p, "URI"),
		Utils: /* @__PURE__ */ P(() => T, "Utils")
	}), typeof process == "object" ? s = process.platform === "win32" : typeof navigator == "object" && (s = navigator.userAgent.indexOf("Windows") >= 0);
	let c = /^\w[\w\d+.-]*$/, l = /^\//, u = /^\/\//;
	function d(e, t) {
		if (!e.scheme && t) throw Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${e.authority}", path: "${e.path}", query: "${e.query}", fragment: "${e.fragment}"}`);
		if (e.scheme && !c.test(e.scheme)) throw Error("[UriError]: Scheme contains illegal characters.");
		if (e.path) {
			if (e.authority) {
				if (!l.test(e.path)) throw Error("[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash (\"/\") character");
			} else if (u.test(e.path)) throw Error("[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters (\"//\")");
		}
	}
	P(d, "a");
	let f = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
	class p {
		static isUri(e) {
			return e instanceof p || !!e && typeof e.authority == "string" && typeof e.fragment == "string" && typeof e.path == "string" && typeof e.query == "string" && typeof e.scheme == "string" && typeof e.fsPath == "string" && typeof e.with == "function" && typeof e.toString == "function";
		}
		constructor(e, t, n, i, a, o = !1) {
			r(this, "scheme", void 0), r(this, "authority", void 0), r(this, "path", void 0), r(this, "query", void 0), r(this, "fragment", void 0), typeof e == "object" ? (this.scheme = e.scheme || "", this.authority = e.authority || "", this.path = e.path || "", this.query = e.query || "", this.fragment = e.fragment || "") : (this.scheme = /* @__PURE__ */ (function(e, t) {
				return e || t ? e : "file";
			})(e, o), this.authority = t || "", this.path = (function(e, t) {
				switch (e) {
					case "https":
					case "http":
					case "file": t ? t[0] !== "/" && (t = "/" + t) : t = "/";
				}
				return t;
			})(this.scheme, n || ""), this.query = i || "", this.fragment = a || "", d(this, o));
		}
		get fsPath() {
			return y(this, !1);
		}
		with(e) {
			if (!e) return this;
			let { scheme: t, authority: n, path: r, query: i, fragment: a } = e;
			return t === void 0 ? t = this.scheme : t === null && (t = ""), n === void 0 ? n = this.authority : n === null && (n = ""), r === void 0 ? r = this.path : r === null && (r = ""), i === void 0 ? i = this.query : i === null && (i = ""), a === void 0 ? a = this.fragment : a === null && (a = ""), t === this.scheme && n === this.authority && r === this.path && i === this.query && a === this.fragment ? this : new h(t, n, r, i, a);
		}
		static parse(e, t = !1) {
			let n = f.exec(e);
			return n ? new h(n[2] || "", C(n[4] || ""), C(n[5] || ""), C(n[7] || ""), C(n[9] || ""), t) : new h("", "", "", "", "");
		}
		static file(e) {
			let t = "";
			if (s && (e = e.replace(/\\/g, "/")), e[0] === "/" && e[1] === "/") {
				let n = e.indexOf("/", 2);
				n === -1 ? (t = e.substring(2), e = "/") : (t = e.substring(2, n), e = e.substring(n) || "/");
			}
			return new h("file", t, e, "", "");
		}
		static from(e) {
			let t = new h(e.scheme, e.authority, e.path, e.query, e.fragment);
			return d(t, !0), t;
		}
		toString(e = !1) {
			return b(this, e);
		}
		toJSON() {
			return this;
		}
		static revive(e) {
			if (e) {
				if (e instanceof p) return e;
				{
					let t = new h(e);
					return t._formatted = e.external, t._fsPath = e._sep === m ? e.fsPath : null, t;
				}
			}
			return e;
		}
	}
	e = p, P(e, "l");
	let m = s ? 1 : void 0;
	class h extends p {
		constructor(...e) {
			super(...e), r(this, "_formatted", null), r(this, "_fsPath", null);
		}
		get fsPath() {
			return this._fsPath ||= y(this, !1), this._fsPath;
		}
		toString(e = !1) {
			return e ? b(this, !0) : (this._formatted ||= b(this, !1), this._formatted);
		}
		toJSON() {
			let e = { $mid: 1 };
			return this._fsPath && (e.fsPath = this._fsPath, e._sep = m), this._formatted && (e.external = this._formatted), this.path && (e.path = this.path), this.scheme && (e.scheme = this.scheme), this.authority && (e.authority = this.authority), this.query && (e.query = this.query), this.fragment && (e.fragment = this.fragment), e;
		}
	}
	t = h, P(t, "d");
	let g = {
		58: "%3A",
		47: "%2F",
		63: "%3F",
		35: "%23",
		91: "%5B",
		93: "%5D",
		64: "%40",
		33: "%21",
		36: "%24",
		38: "%26",
		39: "%27",
		40: "%28",
		41: "%29",
		42: "%2A",
		43: "%2B",
		44: "%2C",
		59: "%3B",
		61: "%3D",
		32: "%20"
	};
	function _(e, t, n) {
		let r, i = -1;
		for (let a = 0; a < e.length; a++) {
			let o = e.charCodeAt(a);
			if (o >= 97 && o <= 122 || o >= 65 && o <= 90 || o >= 48 && o <= 57 || o === 45 || o === 46 || o === 95 || o === 126 || t && o === 47 || n && o === 91 || n && o === 93 || n && o === 58) i !== -1 && (r += encodeURIComponent(e.substring(i, a)), i = -1), r !== void 0 && (r += e.charAt(a));
			else {
				r === void 0 && (r = e.substr(0, a));
				let t = g[o];
				t === void 0 ? i === -1 && (i = a) : (i !== -1 && (r += encodeURIComponent(e.substring(i, a)), i = -1), r += t);
			}
		}
		return i !== -1 && (r += encodeURIComponent(e.substring(i))), r === void 0 ? e : r;
	}
	P(_, "m");
	function v(e) {
		let t;
		for (let n = 0; n < e.length; n++) {
			let r = e.charCodeAt(n);
			r === 35 || r === 63 ? (t === void 0 && (t = e.substr(0, n)), t += g[r]) : t !== void 0 && (t += e[n]);
		}
		return t === void 0 ? e : t;
	}
	P(v, "y");
	function y(e, t) {
		let n;
		return n = e.authority && e.path.length > 1 && e.scheme === "file" ? `//${e.authority}${e.path}` : e.path.charCodeAt(0) === 47 && (e.path.charCodeAt(1) >= 65 && e.path.charCodeAt(1) <= 90 || e.path.charCodeAt(1) >= 97 && e.path.charCodeAt(1) <= 122) && e.path.charCodeAt(2) === 58 ? t ? e.path.substr(1) : e.path[1].toLowerCase() + e.path.substr(2) : e.path, s && (n = n.replace(/\//g, "\\")), n;
	}
	P(y, "v");
	function b(e, t) {
		let n = t ? v : _, r = "", { scheme: i, authority: a, path: o, query: s, fragment: c } = e;
		if (i && (r += i, r += ":"), (a || i === "file") && (r += "/", r += "/"), a) {
			let e = a.indexOf("@");
			if (e !== -1) {
				let t = a.substr(0, e);
				a = a.substr(e + 1), e = t.lastIndexOf(":"), e === -1 ? r += n(t, !1, !1) : (r += n(t.substr(0, e), !1, !1), r += ":", r += n(t.substr(e + 1), !1, !0)), r += "@";
			}
			a = a.toLowerCase(), e = a.lastIndexOf(":"), e === -1 ? r += n(a, !1, !0) : (r += n(a.substr(0, e), !1, !0), r += a.substr(e));
		}
		if (o) {
			if (o.length >= 3 && o.charCodeAt(0) === 47 && o.charCodeAt(2) === 58) {
				let e = o.charCodeAt(1);
				e >= 65 && e <= 90 && (o = `/${String.fromCharCode(e + 32)}:${o.substr(3)}`);
			} else if (o.length >= 2 && o.charCodeAt(1) === 58) {
				let e = o.charCodeAt(0);
				e >= 65 && e <= 90 && (o = `${String.fromCharCode(e + 32)}:${o.substr(2)}`);
			}
			r += n(o, !0, !1);
		}
		return s && (r += "?", r += n(s, !1, !1)), c && (r += "#", r += t ? c : _(c, !1, !1)), r;
	}
	P(b, "b");
	function x(e) {
		try {
			return decodeURIComponent(e);
		} catch {
			return e.length > 3 ? e.substr(0, 3) + x(e.substr(3)) : e;
		}
	}
	P(x, "C");
	let S = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
	function C(e) {
		return e.match(S) ? e.replace(S, ((e) => x(e))) : e;
	}
	P(C, "w");
	var ee = a(975);
	let w = ee.posix || ee;
	var T;
	(function(e) {
		e.joinPath = function(e, ...t) {
			return e.with({ path: w.join(e.path, ...t) });
		}, e.resolvePath = function(e, ...t) {
			let n = e.path, r = !1;
			n[0] !== "/" && (n = "/" + n, r = !0);
			let i = w.resolve(n, ...t);
			return r && i[0] === "/" && !e.authority && (i = i.substring(1)), e.with({ path: i });
		}, e.dirname = function(e) {
			if (e.path.length === 0 || e.path === "/") return e;
			let t = w.dirname(e.path);
			return t.length === 1 && t.charCodeAt(0) === 46 && (t = ""), e.with({ path: t });
		}, e.basename = function(e) {
			return w.basename(e.path);
		}, e.extname = function(e) {
			return w.extname(e.path);
		};
	})(T ||= {}), Jx = o;
})();
var { URI: Yx, Utils: Xx } = Jx, Zx;
(function(e) {
	e.basename = Xx.basename, e.dirname = Xx.dirname, e.extname = Xx.extname, e.joinPath = Xx.joinPath, e.resolvePath = Xx.resolvePath;
	let t = typeof process == "object" && process?.platform === "win32";
	function n(e, t) {
		return e?.toString() === t?.toString();
	}
	P(n, "equals"), e.equals = n;
	function r(e, n) {
		let r = typeof e == "string" ? Yx.parse(e).path : e.path, i = typeof n == "string" ? Yx.parse(n).path : n.path, a = r.split("/").filter((e) => e.length > 0), o = i.split("/").filter((e) => e.length > 0);
		if (t) {
			let e = /^[A-Z]:$/;
			if (a[0] && e.test(a[0]) && (a[0] = a[0].toLowerCase()), o[0] && e.test(o[0]) && (o[0] = o[0].toLowerCase()), a[0] !== o[0]) return i.substring(1);
		}
		let s = 0;
		for (; s < a.length && a[s] === o[s]; s++);
		return "../".repeat(a.length - s) + o.slice(s).join("/");
	}
	P(r, "relative"), e.relative = r;
	function i(e) {
		return Yx.parse(e.toString()).toString();
	}
	P(i, "normalize"), e.normalize = i;
	function a(e, t) {
		let n = typeof e == "string" ? Yx.parse(e) : e, r = typeof t == "string" ? Yx.parse(t) : t;
		if (n.scheme !== r.scheme) return !1;
		let i = n.path, a = r.path;
		return a.charAt(a.length - 1) === "/" && (a = a.slice(0, -1)), i.charAt(i.length - 1) === "/" && (i = i.slice(0, -1)), a === i ? !0 : a.length < i.length || a.charAt(i.length) !== "/" ? !1 : a.startsWith(i);
	}
	P(a, "contains"), e.contains = a;
})(Zx ||= {});
var Qx = (Ye = class {
	constructor() {
		this.root = {
			name: "",
			children: /* @__PURE__ */ new Map()
		};
	}
	normalizeUri(e) {
		return Zx.normalize(e);
	}
	clear() {
		this.root.children.clear();
	}
	insert(e, t) {
		let n = this.getNode(this.normalizeUri(e), !0);
		n.element = t;
	}
	delete(e) {
		let t = this.getNode(this.normalizeUri(e), !1);
		t?.parent && t.parent.children.delete(t.name);
	}
	has(e) {
		return this.getNode(this.normalizeUri(e), !1)?.element !== void 0;
	}
	hasNode(e) {
		return this.getNode(this.normalizeUri(e), !1) !== void 0;
	}
	find(e) {
		return this.getNode(this.normalizeUri(e), !1)?.element;
	}
	findNode(e) {
		let t = this.normalizeUri(e), n = this.getNode(t, !1);
		if (n) return {
			name: n.name,
			uri: Zx.joinPath(Yx.parse(t), n.name).toString(),
			element: n.element
		};
	}
	findChildren(e) {
		let t = this.normalizeUri(e), n = this.getNode(t, !1);
		return n ? Array.from(n.children.values()).map((e) => ({
			name: e.name,
			uri: Zx.joinPath(Yx.parse(t), e.name).toString(),
			element: e.element
		})) : [];
	}
	all() {
		return this.collectValues(this.root);
	}
	findAll(e) {
		let t = this.getNode(this.normalizeUri(e), !1);
		return t ? this.collectValues(t) : [];
	}
	getNode(e, t) {
		let n = e.split("/");
		e.charAt(e.length - 1) === "/" && n.pop();
		let r = this.root;
		for (let e of n) {
			let n = r.children.get(e);
			if (!n) {
				if (t) n = {
					name: e,
					children: /* @__PURE__ */ new Map(),
					parent: r
				}, r.children.set(e, n);
				else return;
			}
			r = n;
		}
		return r;
	}
	collectValues(e) {
		let t = [];
		e.element && t.push(e.element);
		for (let n of e.children.values()) t.push(...this.collectValues(n));
		return t;
	}
}, P(Ye, "UriTrie"), Ye), Z;
(function(e) {
	e[e.Changed = 0] = "Changed", e[e.Parsed = 1] = "Parsed", e[e.IndexedContent = 2] = "IndexedContent", e[e.ComputedScopes = 3] = "ComputedScopes", e[e.Linked = 4] = "Linked", e[e.IndexedReferences = 5] = "IndexedReferences", e[e.Validated = 6] = "Validated";
})(Z ||= {});
var $x = (Xe = class {
	constructor(e) {
		this.serviceRegistry = e.ServiceRegistry, this.textDocuments = e.workspace.TextDocuments, this.fileSystemProvider = e.workspace.FileSystemProvider;
	}
	async fromUri(e, t = X.CancellationToken.None) {
		let n = await this.getInitialText(e, t);
		return this.createAsync(e, n, t);
	}
	async getInitialText(e, t) {
		return this.fileSystemProvider.readFile(e);
	}
	fromTextDocument(e, t, n) {
		return t ??= Yx.parse(e.uri), X.CancellationToken.is(n) ? this.createAsync(t, e, n) : this.create(t, e, n);
	}
	fromString(e, t, n) {
		return X.CancellationToken.is(n) ? this.createAsync(t, e, n) : this.create(t, e, n);
	}
	fromModel(e, t) {
		return this.create(t, { $model: e });
	}
	create(e, t, n) {
		if (typeof t == "string") {
			let r = this.parse(e, t, n);
			return this.createLangiumDocument(r, e, void 0, t);
		}
		if ("$model" in t) {
			let n = {
				value: t.$model,
				parserErrors: [],
				lexerErrors: []
			};
			return this.createLangiumDocument(n, e);
		}
		{
			let r = this.parse(e, t.getText(), n);
			return this.createLangiumDocument(r, e, t);
		}
	}
	async createAsync(e, t, n) {
		if (typeof t == "string") {
			let r = await this.parseAsync(e, t, n);
			return this.createLangiumDocument(r, e, void 0, t);
		}
		{
			let r = await this.parseAsync(e, t.getText(), n);
			return this.createLangiumDocument(r, e, t);
		}
	}
	createLangiumDocument(e, t, n, r) {
		let i;
		if (n) i = {
			parseResult: e,
			uri: t,
			state: Z.Parsed,
			references: [],
			textDocument: n
		};
		else {
			let n = this.createTextDocumentGetter(t, r);
			i = {
				parseResult: e,
				uri: t,
				state: Z.Parsed,
				references: [],
				get textDocument() {
					return n();
				}
			};
		}
		return e.value.$document = i, i;
	}
	async update(e, t) {
		let n = e.parseResult.value.$cstNode?.root.fullText, r = this.textDocuments?.get(e.uri.toString()), i = await this.getUpdatedText(e, r, t);
		if (r) Object.defineProperty(e, "textDocument", { value: r });
		else {
			let t = this.createTextDocumentGetter(e.uri, i);
			Object.defineProperty(e, "textDocument", { get: t });
		}
		return n !== i && (e.parseResult = await this.parseAsync(e.uri, i, t), e.parseResult.value.$document = e), e.state = Z.Parsed, e;
	}
	async getUpdatedText(e, t, n) {
		return t ? t.getText() : await this.fileSystemProvider.readFile(e.uri);
	}
	parse(e, t, n) {
		return this.serviceRegistry.getServices(e).parser.LangiumParser.parse(t, n);
	}
	parseAsync(e, t, n) {
		return this.serviceRegistry.getServices(e).parser.AsyncParser.parse(t, n);
	}
	createTextDocumentGetter(e, t) {
		let n = this.serviceRegistry, r;
		return () => r ??= Hx.create(e.toString(), n.getServices(e).LanguageMetaData.languageId, 0, t ?? "");
	}
}, P(Xe, "DefaultLangiumDocumentFactory"), Xe), eS = (Ze = class {
	constructor(e) {
		this.documentTrie = new Qx(), this.services = e, this.langiumDocumentFactory = e.workspace.LangiumDocumentFactory, this.documentBuilder = () => e.workspace.DocumentBuilder;
	}
	get all() {
		return B(this.documentTrie.all());
	}
	addDocument(e) {
		let t = e.uri.toString();
		if (this.documentTrie.has(t)) throw Error(`A document with the URI '${t}' is already present.`);
		this.documentTrie.insert(t, e);
	}
	getDocument(e) {
		let t = e.toString();
		return this.documentTrie.find(t);
	}
	getDocuments(e) {
		let t = e.toString();
		return this.documentTrie.findAll(t);
	}
	async getOrCreateDocument(e, t) {
		let n = this.getDocument(e);
		return n || (n = await this.langiumDocumentFactory.fromUri(e, t), this.addDocument(n), n);
	}
	createDocument(e, t, n) {
		if (n) return this.langiumDocumentFactory.fromString(t, e, n).then((e) => (this.addDocument(e), e));
		{
			let n = this.langiumDocumentFactory.fromString(t, e);
			return this.addDocument(n), n;
		}
	}
	hasDocument(e) {
		return this.documentTrie.has(e.toString());
	}
	invalidateDocument(e) {
		let t = e.toString(), n = this.documentTrie.find(t);
		return n && this.documentBuilder().resetToState(n, Z.Changed), n;
	}
	deleteDocument(e) {
		let t = e.toString(), n = this.documentTrie.find(t);
		return n && (n.state = Z.Changed, this.documentTrie.delete(t)), n;
	}
	deleteDocuments(e) {
		let t = e.toString(), n = this.documentTrie.findAll(t);
		for (let e of n) e.state = Z.Changed;
		return this.documentTrie.delete(t), n;
	}
}, P(Ze, "DefaultLangiumDocuments"), Ze), tS = /* @__PURE__ */ Symbol("RefResolving"), nS = (Qe = class {
	constructor(e, t, n, r, i) {
		this.resolver = e, this.node = t, this.property = n, this._ref = void 0, this.$refNode = r, this.$refText = i;
	}
	get ref() {
		return this.resolver.resolveReference(this, this.node, this.property);
	}
	get $nodeDescription() {
		return this._nodeDescription;
	}
	get error() {
		return Ti(this._ref) ? this._ref : void 0;
	}
}, P(Qe, "DefaultReferenceImpl"), Qe), rS = ($e = class {
	constructor(e, t, n, r, i) {
		this.resolver = e, this.node = t, this.property = n, this._items = void 0, this.$refNode = r, this.$refText = i;
	}
	get items() {
		return this.resolver.resolveMultiReference(this, this.node, this.property);
	}
	get error() {
		return this._linkingError;
	}
}, P($e, "DefaultMultiReferenceImpl"), $e), iS = (et = class {
	constructor(e) {
		this.reflection = e.shared.AstReflection, this.langiumDocuments = () => e.shared.workspace.LangiumDocuments, this.scopeProvider = e.references.ScopeProvider, this.astNodeLocator = e.workspace.AstNodeLocator, this.profiler = e.shared.profilers.LangiumProfiler, this.languageId = e.LanguageMetaData.languageId, this.referenceResolver = {
			resolveReference: this.resolveReference.bind(this),
			resolveMultiReference: this.resolveMultiReference.bind(this)
		};
	}
	async link(e, t = X.CancellationToken.None) {
		if (this.profiler?.isActive("linking")) {
			let n = this.profiler.createTask("linking", this.languageId);
			n.start();
			try {
				for (let r of Wi(e.parseResult.value)) await zx(t), Ki(r).forEach((t) => {
					let i = `${r.$type}:${t.property}`;
					n.startSubTask(i);
					try {
						this.doLink(t, e);
					} finally {
						n.stopSubTask(i);
					}
				});
			} finally {
				n.stop();
			}
		} else for (let n of Wi(e.parseResult.value)) await zx(t), Ki(n).forEach((t) => this.doLink(t, e));
	}
	doLink(e, t) {
		let n = e.reference;
		if ("_ref" in n && n._ref === void 0) {
			n._ref = tS;
			try {
				let t = this.getCandidate(e);
				Ti(t) ? n._ref = t : (n._nodeDescription = t, n._ref = this.loadAstNode(t) ?? this.createLinkingError(e, t));
			} catch (t) {
				console.error(`An error occurred while resolving reference to '${n.$refText}':`, t);
				let r = t.message ?? String(t);
				n._ref = {
					info: e,
					message: `An error occurred while resolving reference to '${n.$refText}': ${r}`
				};
			}
			t.references.push(n);
		} else if ("_items" in n && n._items === void 0) {
			n._items = tS;
			try {
				let t = this.getCandidates(e), r = [];
				if (Ti(t)) n._linkingError = t;
				else for (let e of t) {
					let t = this.loadAstNode(e);
					t && r.push({
						ref: t,
						$nodeDescription: e
					});
				}
				n._items = r;
			} catch (t) {
				n._linkingError = {
					info: e,
					message: `An error occurred while resolving reference to '${n.$refText}': ${t}`
				}, n._items = [];
			}
			t.references.push(n);
		}
	}
	unlink(e) {
		for (let t of e.references) "_ref" in t ? (t._ref = void 0, delete t._nodeDescription) : "_items" in t && (t._items = void 0, delete t._linkingError);
		e.references = [];
	}
	getCandidate(e) {
		return this.scopeProvider.getScope(e).getElement(e.reference.$refText) ?? this.createLinkingError(e);
	}
	getCandidates(e) {
		let t = this.scopeProvider.getScope(e).getElements(e.reference.$refText).distinct((e) => `${e.documentUri}#${e.path}`).toArray();
		return t.length > 0 ? t : this.createLinkingError(e);
	}
	buildReference(e, t, n, r) {
		return new nS(this.referenceResolver, e, t, n, r);
	}
	buildMultiReference(e, t, n, r) {
		return new rS(this.referenceResolver, e, t, n, r);
	}
	resolveReference(e, t, n) {
		if (xi(e._ref)) return e._ref;
		if (wi(e._nodeDescription)) e._ref = this.loadAstNode(e._nodeDescription) ?? this.createLinkingError({
			reference: e,
			container: t,
			property: n
		}, e._nodeDescription);
		else if (e._ref === void 0) {
			e._ref = tS;
			let r = Bi(t).$document, i = this.getLinkedNode({
				reference: e,
				container: t,
				property: n
			});
			if (i.error && r && r.state < Z.ComputedScopes) {
				e._ref = void 0;
				return;
			}
			e._ref = i.node ?? i.error, e._nodeDescription = i.descr, r?.references.push(e);
		} else e._ref === tS && this.throwCyclicReferenceError(t, n, e.$refText);
		return xi(e._ref) ? e._ref : void 0;
	}
	resolveMultiReference(e, t, n) {
		if (Array.isArray(e._items)) return e._items;
		if (e._items === void 0) {
			e._items = tS;
			let r = Bi(t).$document, i = this.getCandidates({
				reference: e,
				container: t,
				property: n
			}), a = [];
			if (Ti(i)) e._linkingError = i;
			else {
				for (let e of i) {
					let t = this.loadAstNode(e);
					t && a.push({
						ref: t,
						$nodeDescription: e
					});
				}
				a.length === 0 && (e._linkingError = this.createLinkingError({
					reference: e,
					container: t,
					property: n
				}));
			}
			e._items = a, r?.references.push(e);
		} else e._items === tS && this.throwCyclicReferenceError(t, n, e.$refText);
		return Array.isArray(e._items) ? e._items : [];
	}
	throwCyclicReferenceError(e, t, n) {
		throw Error(`Cyclic reference resolution detected: ${this.astNodeLocator.getAstNodePath(e)}/${t} (symbol '${n}')`);
	}
	getLinkedNode(e) {
		try {
			let t = this.getCandidate(e);
			if (Ti(t)) return { error: t };
			let n = this.loadAstNode(t);
			return n ? {
				node: n,
				descr: t
			} : {
				descr: t,
				error: this.createLinkingError(e, t)
			};
		} catch (t) {
			console.error(`An error occurred while resolving reference to '${e.reference.$refText}':`, t);
			let n = t.message ?? String(t);
			return { error: {
				info: e,
				message: `An error occurred while resolving reference to '${e.reference.$refText}': ${n}`
			} };
		}
	}
	loadAstNode(e) {
		if (e.node) return e.node;
		let t = this.langiumDocuments().getDocument(e.documentUri);
		if (t) return this.astNodeLocator.getAstNode(t.parseResult.value, e.path);
	}
	createLinkingError(e, t) {
		let n = Bi(e.container).$document;
		return n && n.state < Z.ComputedScopes && console.warn(`Attempted reference resolution before document reached ComputedScopes state (${n.uri}).`), {
			info: e,
			message: `Could not resolve reference to ${this.reflection.getReferenceType(e)} named '${e.reference.$refText}'.`,
			targetDescription: t
		};
	}
}, P(et, "DefaultLinker"), et);
function aS(e) {
	return typeof e.name == "string";
}
P(aS, "isNamed");
var oS = (tt = class {
	getName(e) {
		if (aS(e)) return e.name;
	}
	getNameNode(e) {
		return hs(e.$cstNode, "name");
	}
}, P(tt, "DefaultNameProvider"), tt), sS = (nt = class {
	constructor(e) {
		this.nameProvider = e.references.NameProvider, this.index = e.shared.workspace.IndexManager, this.nodeLocator = e.workspace.AstNodeLocator, this.documents = e.shared.workspace.LangiumDocuments, this.hasMultiReference = Wi(e.Grammar).some((e) => _a(e) && e.isMulti);
	}
	findDeclarations(e) {
		if (e) {
			let t = ys(e), n = e.astNode;
			if (t && n) {
				let r = n[t.feature];
				if (Si(r) || Ci(r)) return Vi(r);
				if (Array.isArray(r)) {
					for (let t of r) if ((Si(t) || Ci(t)) && t.$refNode && t.$refNode.offset <= e.offset && t.$refNode.end >= e.end) return Vi(t);
				}
			}
			if (n) {
				let t = this.nameProvider.getNameNode(n);
				if (t && (t === e || Do(e, t))) return this.getSelfNodes(n);
			}
		}
		return [];
	}
	getSelfNodes(e) {
		if (this.hasMultiReference) {
			let t = this.index.findAllReferences(e, this.nodeLocator.getAstNodePath(e)), n = this.getNodeFromReferenceDescription(t.head());
			if (n) {
				for (let t of Ki(n)) if (Ci(t.reference) && t.reference.items.some((t) => t.ref === e)) return t.reference.items.map((e) => e.ref);
			}
			return [e];
		}
		return [e];
	}
	getNodeFromReferenceDescription(e) {
		if (!e) return;
		let t = this.documents.getDocument(e.sourceUri);
		if (t) return this.nodeLocator.getAstNode(t.parseResult.value, e.sourcePath);
	}
	findDeclarationNodes(e) {
		let t = this.findDeclarations(e), n = [];
		for (let e of t) {
			let t = this.nameProvider.getNameNode(e) ?? e.$cstNode;
			t && n.push(t);
		}
		return n;
	}
	findReferences(e, t) {
		let n = [];
		t.includeDeclaration && n.push(...this.getSelfReferences(e));
		let r = this.index.findAllReferences(e, this.nodeLocator.getAstNodePath(e));
		return t.documentUri && (r = r.filter((e) => Zx.equals(e.sourceUri, t.documentUri))), n.push(...r), B(n);
	}
	getSelfReferences(e) {
		let t = this.getSelfNodes(e), n = [];
		for (let e of t) {
			let t = this.nameProvider.getNameNode(e);
			if (t) {
				let r = zi(e), i = this.nodeLocator.getAstNodePath(e);
				n.push({
					sourceUri: r.uri,
					sourcePath: i,
					targetUri: r.uri,
					targetPath: i,
					segment: Ao(t),
					local: !0
				});
			}
		}
		return n;
	}
}, P(nt, "DefaultReferences"), nt), cS = (Ht = Symbol.iterator, rt = class {
	constructor(e) {
		if (this.map = /* @__PURE__ */ new Map(), e) for (let [t, n] of e) this.add(t, n);
	}
	get size() {
		return Ii.sum(B(this.map.values()).map((e) => e.length));
	}
	clear() {
		this.map.clear();
	}
	delete(e, t) {
		if (t === void 0) return this.map.delete(e);
		{
			let n = this.map.get(e);
			if (n) {
				let r = n.indexOf(t);
				if (r >= 0) return n.length === 1 ? this.map.delete(e) : n.splice(r, 1), !0;
			}
			return !1;
		}
	}
	get(e) {
		return this.map.get(e) ?? [];
	}
	getStream(e) {
		let t = this.map.get(e);
		return t ? B(t) : Ni;
	}
	has(e, t) {
		if (t === void 0) return this.map.has(e);
		{
			let n = this.map.get(e);
			return n ? n.indexOf(t) >= 0 : !1;
		}
	}
	add(e, t) {
		return this.map.has(e) ? this.map.get(e).push(t) : this.map.set(e, [t]), this;
	}
	addAll(e, t) {
		return this.map.has(e) ? this.map.get(e).push(...t) : this.map.set(e, Array.from(t)), this;
	}
	forEach(e) {
		this.map.forEach((t, n) => t.forEach((t) => e(t, n, this)));
	}
	[Ht]() {
		return this.entries().iterator();
	}
	entries() {
		return B(this.map.entries()).flatMap(([e, t]) => t.map((t) => [e, t]));
	}
	keys() {
		return B(this.map.keys());
	}
	values() {
		return B(this.map.values()).flat();
	}
	entriesGroupedByKey() {
		return B(this.map.entries());
	}
}, P(rt, "MultiMap"), rt), lS = (it = class {
	get size() {
		return this.map.size;
	}
	constructor(e) {
		if (this.map = /* @__PURE__ */ new Map(), this.inverse = /* @__PURE__ */ new Map(), e) for (let [t, n] of e) this.set(t, n);
	}
	clear() {
		this.map.clear(), this.inverse.clear();
	}
	set(e, t) {
		return this.map.set(e, t), this.inverse.set(t, e), this;
	}
	get(e) {
		return this.map.get(e);
	}
	getKey(e) {
		return this.inverse.get(e);
	}
	delete(e) {
		let t = this.map.get(e);
		return t !== void 0 && (this.map.delete(e), this.inverse.delete(t), !0);
	}
}, P(it, "BiMap"), it), uS = (at = class {
	constructor(e) {
		this.nameProvider = e.references.NameProvider, this.descriptions = e.workspace.AstNodeDescriptionProvider;
	}
	async collectExportedSymbols(e, t = X.CancellationToken.None) {
		return this.collectExportedSymbolsForNode(e.parseResult.value, e, void 0, t);
	}
	async collectExportedSymbolsForNode(e, t, n = Hi, r = X.CancellationToken.None) {
		let i = [];
		this.addExportedSymbol(e, i, t);
		for (let a of n(e)) await zx(r), this.addExportedSymbol(a, i, t);
		return i;
	}
	addExportedSymbol(e, t, n) {
		let r = this.nameProvider.getName(e);
		r && t.push(this.descriptions.createDescription(e, r, n));
	}
	async collectLocalSymbols(e, t = X.CancellationToken.None) {
		let n = e.parseResult.value, r = new cS();
		for (let i of Ui(n)) await zx(t), this.addLocalSymbol(i, e, r);
		return r;
	}
	addLocalSymbol(e, t, n) {
		let r = e.$container;
		if (r) {
			let i = this.nameProvider.getName(e);
			i && n.add(r, this.descriptions.createDescription(e, i, t));
		}
	}
}, P(at, "DefaultScopeComputation"), at), dS = (ot = class {
	constructor(e, t, n) {
		this.elements = e, this.outerScope = t, this.caseInsensitive = n?.caseInsensitive ?? !1, this.concatOuterScope = n?.concatOuterScope ?? !0;
	}
	getAllElements() {
		return this.outerScope ? this.elements.concat(this.outerScope.getAllElements()) : this.elements;
	}
	getElement(e) {
		let t = this.caseInsensitive ? e.toLowerCase() : e, n = this.caseInsensitive ? this.elements.find((e) => e.name.toLowerCase() === t) : this.elements.find((t) => t.name === e);
		if (n) return n;
		if (this.outerScope) return this.outerScope.getElement(e);
	}
	getElements(e) {
		let t = this.caseInsensitive ? e.toLowerCase() : e, n = this.caseInsensitive ? this.elements.filter((e) => e.name.toLowerCase() === t) : this.elements.filter((t) => t.name === e);
		return (this.concatOuterScope || n.isEmpty()) && this.outerScope ? n.concat(this.outerScope.getElements(e)) : n;
	}
}, P(ot, "StreamScope"), ot), fS = (st = class {
	constructor(e, t, n) {
		this.elements = new cS(), this.caseInsensitive = n?.caseInsensitive ?? !1, this.concatOuterScope = n?.concatOuterScope ?? !0;
		for (let t of e) {
			let e = this.caseInsensitive ? t.name.toLowerCase() : t.name;
			this.elements.add(e, t);
		}
		this.outerScope = t;
	}
	getElement(e) {
		let t = this.caseInsensitive ? e.toLowerCase() : e, n = this.elements.get(t)[0];
		if (n) return n;
		if (this.outerScope) return this.outerScope.getElement(e);
	}
	getElements(e) {
		let t = this.caseInsensitive ? e.toLowerCase() : e, n = this.elements.get(t);
		return (this.concatOuterScope || n.length === 0) && this.outerScope ? B(n).concat(this.outerScope.getElements(e)) : B(n);
	}
	getAllElements() {
		let e = B(this.elements.values());
		return this.outerScope && (e = e.concat(this.outerScope.getAllElements())), e;
	}
}, P(st, "MultiMapScope"), st), pS = (ct = class {
	constructor() {
		this.toDispose = [], this.isDisposed = !1;
	}
	onDispose(e) {
		this.toDispose.push(e);
	}
	dispose() {
		this.throwIfDisposed(), this.clear(), this.isDisposed = !0, this.toDispose.forEach((e) => e.dispose());
	}
	throwIfDisposed() {
		if (this.isDisposed) throw Error("This cache has already been disposed");
	}
}, P(ct, "DisposableCache"), ct), mS = (lt = class extends pS {
	constructor() {
		super(...arguments), this.cache = /* @__PURE__ */ new Map();
	}
	has(e) {
		return this.throwIfDisposed(), this.cache.has(e);
	}
	set(e, t) {
		this.throwIfDisposed(), this.cache.set(e, t);
	}
	get(e, t) {
		if (this.throwIfDisposed(), this.cache.has(e)) return this.cache.get(e);
		if (t) {
			let n = t();
			return this.cache.set(e, n), n;
		}
	}
	delete(e) {
		return this.throwIfDisposed(), this.cache.delete(e);
	}
	clear() {
		this.throwIfDisposed(), this.cache.clear();
	}
}, P(lt, "SimpleCache"), lt), hS = (ut = class extends pS {
	constructor(e) {
		super(), this.cache = /* @__PURE__ */ new Map(), this.converter = e ?? ((e) => e);
	}
	has(e, t) {
		return this.throwIfDisposed(), this.cacheForContext(e).has(t);
	}
	set(e, t, n) {
		this.throwIfDisposed(), this.cacheForContext(e).set(t, n);
	}
	get(e, t, n) {
		this.throwIfDisposed();
		let r = this.cacheForContext(e);
		if (r.has(t)) return r.get(t);
		if (n) {
			let e = n();
			return r.set(t, e), e;
		}
	}
	delete(e, t) {
		return this.throwIfDisposed(), this.cacheForContext(e).delete(t);
	}
	clear(e) {
		if (this.throwIfDisposed(), e) {
			let t = this.converter(e);
			this.cache.delete(t);
		} else this.cache.clear();
	}
	cacheForContext(e) {
		let t = this.converter(e), n = this.cache.get(t);
		return n || (n = /* @__PURE__ */ new Map(), this.cache.set(t, n)), n;
	}
}, P(ut, "ContextCache"), ut), gS = (dt = class extends mS {
	constructor(e, t) {
		super(), t ? (this.toDispose.push(e.workspace.DocumentBuilder.onBuildPhase(t, () => {
			this.clear();
		})), this.toDispose.push(e.workspace.DocumentBuilder.onUpdate((e, t) => {
			t.length > 0 && this.clear();
		}))) : this.toDispose.push(e.workspace.DocumentBuilder.onUpdate(() => {
			this.clear();
		}));
	}
}, P(dt, "WorkspaceCache"), dt), _S = (ft = class {
	constructor(e) {
		this.reflection = e.shared.AstReflection, this.nameProvider = e.references.NameProvider, this.descriptions = e.workspace.AstNodeDescriptionProvider, this.indexManager = e.shared.workspace.IndexManager, this.globalScopeCache = new gS(e.shared);
	}
	getScope(e) {
		let t = [], n = this.reflection.getReferenceType(e), r = zi(e.container).localSymbols;
		if (r) {
			let i = e.container;
			do
				r.has(i) && t.push(r.getStream(i).filter((e) => this.reflection.isSubtype(e.type, n))), i = i.$container;
			while (i);
		}
		let i = this.getGlobalScope(n, e);
		for (let e = t.length - 1; e >= 0; e--) i = this.createScope(t[e], i);
		return i;
	}
	createScope(e, t, n) {
		return new dS(B(e), t, n);
	}
	createScopeForNodes(e, t, n) {
		return new dS(B(e).map((e) => {
			let t = this.nameProvider.getName(e);
			if (t) return this.descriptions.createDescription(e, t);
		}).nonNullable(), t, n);
	}
	getGlobalScope(e, t) {
		return this.globalScopeCache.get(e, () => new fS(this.indexManager.allElements(e)));
	}
}, P(ft, "DefaultScopeProvider"), ft);
function vS(e) {
	return typeof e.$comment == "string";
}
P(vS, "isAstNodeWithComment");
function yS(e) {
	return typeof e == "object" && !!e && ("$ref" in e || "$refs" in e || "$error" in e);
}
P(yS, "isIntermediateReference");
var bS = (pt = class {
	constructor(e) {
		this.ignoreProperties = /* @__PURE__ */ new Set([
			"$container",
			"$containerProperty",
			"$containerIndex",
			"$document",
			"$cstNode"
		]), this.langiumDocuments = e.shared.workspace.LangiumDocuments, this.astNodeLocator = e.workspace.AstNodeLocator, this.nameProvider = e.references.NameProvider, this.commentProvider = e.documentation.CommentProvider;
	}
	serialize(e, t) {
		let n = t ?? {}, r = t?.replacer, i = /* @__PURE__ */ P((e, t) => this.replacer(e, t, n), "defaultReplacer"), a = r ? (e, t) => r(e, t, i) : i;
		try {
			return this.currentDocument = zi(e), JSON.stringify(e, a, t?.space);
		} finally {
			this.currentDocument = void 0;
		}
	}
	deserialize(e, t) {
		let n = t ?? {}, r = JSON.parse(e);
		return this.linkNode(r, r, n), r;
	}
	replacer(e, t, { refText: n, sourceText: r, textRegions: i, comments: a, uriConverter: o }) {
		if (!this.ignoreProperties.has(e)) {
			if (Si(t)) {
				let e = t.ref, r = n ? t.$refText : void 0;
				if (e) {
					let t = zi(e), n = "";
					this.currentDocument && this.currentDocument !== t && (n = o ? o(t.uri, e) : t.uri.toString());
					let i = this.astNodeLocator.getAstNodePath(e);
					return {
						$ref: `${n}#${i}`,
						$refText: r
					};
				}
				return {
					$error: t.error?.message ?? "Could not resolve reference",
					$refText: r
				};
			}
			if (Ci(t)) {
				let e = n ? t.$refText : void 0, r = [];
				for (let e of t.items) {
					let t = e.ref, n = zi(e.ref), i = "";
					this.currentDocument && this.currentDocument !== n && (i = o ? o(n.uri, t) : n.uri.toString());
					let a = this.astNodeLocator.getAstNodePath(t);
					r.push(`${i}#${a}`);
				}
				return {
					$refs: r,
					$refText: e
				};
			}
			if (xi(t)) {
				let n;
				if (i && (n = this.addAstNodeRegionWithAssignmentsTo({ ...t }), (!e || t.$document) && n?.$textRegion && (n.$textRegion.documentURI = this.currentDocument?.uri.toString())), r && !e && (n ??= { ...t }, n.$sourceText = t.$cstNode?.text), a) {
					n ??= { ...t };
					let e = this.commentProvider.getComment(t);
					e && (n.$comment = e.replace(/\r/g, ""));
				}
				return n ?? t;
			}
			return t;
		}
	}
	addAstNodeRegionWithAssignmentsTo(e) {
		let t = /* @__PURE__ */ P((e) => ({
			offset: e.offset,
			end: e.end,
			length: e.length,
			range: e.range
		}), "createDocumentSegment");
		if (e.$cstNode) {
			let n = e.$textRegion = t(e.$cstNode), r = n.assignments = {};
			return Object.keys(e).filter((e) => !e.startsWith("$")).forEach((n) => {
				let i = ms(e.$cstNode, n).map(t);
				i.length !== 0 && (r[n] = i);
			}), e;
		}
	}
	linkNode(e, t, n, r, i, a) {
		for (let [r, i] of Object.entries(e)) if (Array.isArray(i)) for (let a = 0; a < i.length; a++) {
			let o = i[a];
			yS(o) ? i[a] = this.reviveReference(e, r, t, o, n) : xi(o) && this.linkNode(o, t, n, e, r, a);
		}
		else yS(i) ? e[r] = this.reviveReference(e, r, t, i, n) : xi(i) && this.linkNode(i, t, n, e, r);
		let o = e;
		o.$container = r, o.$containerProperty = i, o.$containerIndex = a;
	}
	reviveReference(e, t, n, r, i) {
		let a = r.$refText, o = r.$error, s;
		if (r.$ref) {
			let e = this.getRefNode(n, r.$ref, i.uriConverter);
			if (xi(e)) return a ||= this.nameProvider.getName(e), {
				$refText: a ?? "",
				ref: e
			};
			o = e;
		} else if (r.$refs) {
			let e = [];
			for (let t of r.$refs) {
				let r = this.getRefNode(n, t, i.uriConverter);
				xi(r) && e.push({ ref: r });
			}
			if (e.length === 0) s = {
				$refText: a ?? "",
				items: e
			}, o ??= "Could not resolve multi-reference";
			else return {
				$refText: a ?? "",
				items: e
			};
		}
		if (o) return s ??= {
			$refText: a ?? "",
			ref: void 0
		}, s.error = {
			info: {
				container: e,
				property: t,
				reference: s
			},
			message: o
		}, s;
	}
	getRefNode(e, t, n) {
		try {
			let r = t.indexOf("#");
			if (r === 0) return this.astNodeLocator.getAstNode(e, t.substring(1)) || "Could not resolve path: " + t;
			if (r < 0) {
				let e = n ? n(t) : Yx.parse(t), r = this.langiumDocuments.getDocument(e);
				return r ? r.parseResult.value : "Could not find document for URI: " + t;
			}
			let i = n ? n(t.substring(0, r)) : Yx.parse(t.substring(0, r)), a = this.langiumDocuments.getDocument(i);
			return a ? r === t.length - 1 ? a.parseResult.value : this.astNodeLocator.getAstNode(a.parseResult.value, t.substring(r + 1)) || "Could not resolve URI: " + t : "Could not find document for URI: " + t;
		} catch (e) {
			return String(e);
		}
	}
}, P(pt, "DefaultJsonSerializer"), pt), xS = (mt = class {
	get map() {
		return this.fileExtensionMap;
	}
	constructor(e) {
		this.languageIdMap = /* @__PURE__ */ new Map(), this.fileExtensionMap = /* @__PURE__ */ new Map(), this.fileNameMap = /* @__PURE__ */ new Map(), this.textDocuments = e?.workspace.TextDocuments;
	}
	register(e) {
		let t = e.LanguageMetaData;
		for (let n of t.fileExtensions) this.fileExtensionMap.has(n) && console.warn(`The file extension ${n} is used by multiple languages. It is now assigned to '${t.languageId}'.`), this.fileExtensionMap.set(n, e);
		if (t.fileNames) for (let n of t.fileNames) this.fileNameMap.has(n) && console.warn(`The file name ${n} is used by multiple languages. It is now assigned to '${t.languageId}'.`), this.fileNameMap.set(n, e);
		this.languageIdMap.set(t.languageId, e);
	}
	getServices(e) {
		if (this.languageIdMap.size === 0) throw Error("The service registry is empty. Use `register` to register the services of a language.");
		let t = this.textDocuments?.get(e)?.languageId;
		if (t !== void 0) {
			let e = this.languageIdMap.get(t);
			if (e) return e;
		}
		let n = Zx.extname(e), r = Zx.basename(e), i = this.fileNameMap.get(r) ?? this.fileExtensionMap.get(n);
		if (!i) throw Error(t ? `The service registry contains no services for the extension '${n}' for language '${t}'.` : `The service registry contains no services for the extension '${n}'.`);
		return i;
	}
	hasServices(e) {
		try {
			return this.getServices(e), !0;
		} catch {
			return !1;
		}
	}
	get all() {
		return Array.from(this.languageIdMap.values());
	}
}, P(mt, "DefaultServiceRegistry"), mt);
function SS(e) {
	return { code: e };
}
P(SS, "diagnosticData");
var CS;
(function(e) {
	e.defaults = [
		"fast",
		"slow",
		"built-in"
	], e.all = e.defaults;
})(CS ||= {});
var wS = (ht = class {
	constructor(e) {
		this.entries = new cS(), this.knownCategories = new Set(CS.defaults), this.entriesBefore = [], this.entriesAfter = [], this.reflection = e.shared.AstReflection;
	}
	register(e, t = this, n = "fast") {
		if (n === "built-in") throw Error("The 'built-in' category is reserved for lexer, parser, and linker errors.");
		this.knownCategories.add(n);
		for (let [r, i] of Object.entries(e)) {
			let e = i;
			if (Array.isArray(e)) for (let i of e) {
				let e = {
					check: this.wrapValidationException(i, t),
					category: n
				};
				this.addEntry(r, e);
			}
			else if (typeof e == "function") {
				let i = {
					check: this.wrapValidationException(e, t),
					category: n
				};
				this.addEntry(r, i);
			} else zo(e);
		}
	}
	wrapValidationException(e, t) {
		return async (n, r, i) => {
			await this.handleException(() => e.call(t, n, r, i), "An error occurred during validation", r, n);
		};
	}
	async handleException(e, t, n, r) {
		try {
			await e();
		} catch (e) {
			if (Rx(e)) throw e;
			console.error(`${t}:`, e), e instanceof Error && e.stack && console.error(e.stack), n("error", `${t}: ${e instanceof Error ? e.message : String(e)}`, { node: r });
		}
	}
	addEntry(e, t) {
		if (e === "AstNode") this.entries.add("AstNode", t);
		else for (let n of this.reflection.getAllSubTypes(e)) this.entries.add(n, t);
	}
	getChecks(e, t) {
		let n = B(this.entries.get(e)).concat(this.entries.get("AstNode"));
		return t && (n = n.filter((e) => t.includes(e.category))), n.map((e) => e.check);
	}
	registerBeforeDocument(e, t = this) {
		this.entriesBefore.push(this.wrapPreparationException(e, "An error occurred during set-up of the validation", t));
	}
	registerAfterDocument(e, t = this) {
		this.entriesAfter.push(this.wrapPreparationException(e, "An error occurred during tear-down of the validation", t));
	}
	wrapPreparationException(e, t, n) {
		return async (r, i, a, o) => {
			await this.handleException(() => e.call(n, r, i, a, o), t, i, r);
		};
	}
	get checksBefore() {
		return this.entriesBefore;
	}
	get checksAfter() {
		return this.entriesAfter;
	}
	getAllValidationCategories(e) {
		return this.knownCategories;
	}
}, P(ht, "ValidationRegistry"), ht), TS = Object.freeze({
	validateNode: !0,
	validateChildren: !0
}), ES = (gt = class {
	constructor(e) {
		this.validationRegistry = e.validation.ValidationRegistry, this.metadata = e.LanguageMetaData, this.profiler = e.shared.profilers.LangiumProfiler, this.languageId = e.LanguageMetaData.languageId;
	}
	async validateDocument(e, t = {}, n = X.CancellationToken.None) {
		let r = e.parseResult, i = [];
		if (await zx(n), (!t.categories || t.categories.includes("built-in")) && (this.processLexingErrors(r, i, t), t.stopAfterLexingErrors && i.some((e) => e.data?.code === AS.LexingError) || (this.processParsingErrors(r, i, t), t.stopAfterParsingErrors && i.some((e) => e.data?.code === AS.ParsingError)) || (this.processLinkingErrors(e, i, t), t.stopAfterLinkingErrors && i.some((e) => e.data?.code === AS.LinkingError)))) return i;
		try {
			i.push(...await this.validateAst(r.value, t, n));
		} catch (e) {
			if (Rx(e)) throw e;
			console.error("An error occurred during validation:", e);
		}
		return await zx(n), i;
	}
	processLexingErrors(e, t, n) {
		let r = [...e.lexerErrors, ...e.lexerReport?.diagnostics ?? []];
		for (let e of r) {
			let n = e.severity ?? "error", r = {
				severity: OS(n),
				range: {
					start: {
						line: e.line - 1,
						character: e.column - 1
					},
					end: {
						line: e.line - 1,
						character: e.column + e.length - 1
					}
				},
				message: e.message,
				data: kS(n),
				source: this.getSource()
			};
			t.push(r);
		}
	}
	processParsingErrors(e, t, n) {
		for (let n of e.parserErrors) {
			let e;
			if (ko(n.token)) e = Oo(n.token);
			else if ("previousToken" in n) {
				let t = n.previousToken;
				if (ko(t)) {
					let n = {
						line: t.endLine - 1,
						character: t.endColumn
					};
					e = {
						start: n,
						end: n
					};
				} else {
					let t = {
						line: 0,
						character: 0
					};
					e = {
						start: t,
						end: t
					};
				}
			}
			if (e) {
				let r = {
					severity: OS("error"),
					range: e,
					message: n.message,
					data: SS(AS.ParsingError),
					source: this.getSource()
				};
				t.push(r);
			}
		}
	}
	processLinkingErrors(e, t, n) {
		for (let n of e.references) {
			let e = n.error;
			if (e) {
				let r = {
					node: e.info.container,
					range: n.$refNode?.range,
					property: e.info.property,
					index: e.info.index,
					data: {
						code: AS.LinkingError,
						containerType: e.info.container.$type,
						property: e.info.property,
						refText: e.info.reference.$refText
					}
				};
				t.push(this.toDiagnostic("error", e.message, r));
			}
		}
	}
	async validateAst(e, t, n = X.CancellationToken.None) {
		let r = [], i = /* @__PURE__ */ P((e, t, n) => {
			r.push(this.toDiagnostic(e, t, n));
		}, "acceptor");
		return await this.validateAstBefore(e, t, i, n), await this.validateAstNodes(e, t, i, n), await this.validateAstAfter(e, t, i, n), r;
	}
	async validateAstBefore(e, t, n, r = X.CancellationToken.None) {
		let i = this.validationRegistry.checksBefore;
		for (let a of i) await zx(r), await a(e, n, t.categories ?? [], r);
	}
	async validateAstNodes(e, t, n, r = X.CancellationToken.None) {
		if (this.profiler?.isActive("validating")) {
			let i = this.profiler.createTask("validating", this.languageId);
			i.start();
			try {
				let a = Wi(e).iterator();
				for (let e of a) {
					i.startSubTask(e.$type);
					let o = this.validateSingleNodeOptions(e, t);
					if (o.validateNode) try {
						let i = this.validationRegistry.getChecks(e.$type, t.categories);
						for (let t of i) await t(e, n, r);
					} finally {
						i.stopSubTask(e.$type);
					}
					o.validateChildren || a.prune();
				}
			} finally {
				i.stop();
			}
		} else {
			let i = Wi(e).iterator();
			for (let e of i) {
				await zx(r);
				let a = this.validateSingleNodeOptions(e, t);
				if (a.validateNode) {
					let i = this.validationRegistry.getChecks(e.$type, t.categories);
					for (let t of i) await t(e, n, r);
				}
				a.validateChildren || i.prune();
			}
		}
	}
	validateSingleNodeOptions(e, t) {
		return TS;
	}
	async validateAstAfter(e, t, n, r = X.CancellationToken.None) {
		let i = this.validationRegistry.checksAfter;
		for (let a of i) await zx(r), await a(e, n, t.categories ?? [], r);
	}
	toDiagnostic(e, t, n) {
		return {
			message: t,
			range: DS(n),
			severity: OS(e),
			code: n.code,
			codeDescription: n.codeDescription,
			tags: n.tags,
			relatedInformation: n.relatedInformation,
			data: n.data,
			source: this.getSource()
		};
	}
	getSource() {
		return this.metadata.languageId;
	}
}, P(gt, "DefaultDocumentValidator"), gt);
function DS(e) {
	if (e.range) return e.range;
	let t;
	return typeof e.property == "string" ? t = hs(e.node.$cstNode, e.property, e.index) : typeof e.keyword == "string" && (t = _s(e.node.$cstNode, e.keyword, e.index)), t ??= e.node.$cstNode, t ? t.range : {
		start: {
			line: 0,
			character: 0
		},
		end: {
			line: 0,
			character: 0
		}
	};
}
P(DS, "getDiagnosticRange");
function OS(e) {
	switch (e) {
		case "error": return 1;
		case "warning": return 2;
		case "info": return 3;
		case "hint": return 4;
		default: throw Error("Invalid diagnostic severity: " + e);
	}
}
P(OS, "toDiagnosticSeverity");
function kS(e) {
	switch (e) {
		case "error": return SS(AS.LexingError);
		case "warning": return SS(AS.LexingWarning);
		case "info": return SS(AS.LexingInfo);
		case "hint": return SS(AS.LexingHint);
		default: throw Error("Invalid diagnostic severity: " + e);
	}
}
P(kS, "toDiagnosticData");
var AS;
(function(e) {
	e.LexingError = "lexing-error", e.LexingWarning = "lexing-warning", e.LexingInfo = "lexing-info", e.LexingHint = "lexing-hint", e.ParsingError = "parsing-error", e.LinkingError = "linking-error";
})(AS ||= {});
var jS = (_t = class {
	constructor(e) {
		this.astNodeLocator = e.workspace.AstNodeLocator, this.nameProvider = e.references.NameProvider;
	}
	createDescription(e, t, n) {
		let r = n ?? zi(e);
		t ??= this.nameProvider.getName(e);
		let i = this.astNodeLocator.getAstNodePath(e);
		if (!t) throw Error(`Node at path ${i} has no name.`);
		let a, o = /* @__PURE__ */ P(() => a ??= Ao(this.nameProvider.getNameNode(e) ?? e.$cstNode), "nameSegmentGetter");
		return {
			node: e,
			name: t,
			get nameSegment() {
				return o();
			},
			selectionSegment: Ao(e.$cstNode),
			type: e.$type,
			documentUri: r.uri,
			path: i
		};
	}
}, P(_t, "DefaultAstNodeDescriptionProvider"), _t), MS = (vt = class {
	constructor(e) {
		this.nodeLocator = e.workspace.AstNodeLocator;
	}
	async createDescriptions(e, t = X.CancellationToken.None) {
		let n = [], r = e.parseResult.value;
		for (let e of Wi(r)) await zx(t), Ki(e).forEach((e) => {
			e.reference.error || n.push(...this.createInfoDescriptions(e));
		});
		return n;
	}
	createInfoDescriptions(e) {
		let t = e.reference;
		if (t.error || !t.$refNode) return [];
		let n = [];
		Si(t) && t.$nodeDescription ? n = [t.$nodeDescription] : Ci(t) && (n = t.items.map((e) => e.$nodeDescription).filter((e) => e !== void 0));
		let r = zi(e.container).uri, i = this.nodeLocator.getAstNodePath(e.container), a = [], o = Ao(t.$refNode);
		for (let e of n) a.push({
			sourceUri: r,
			sourcePath: i,
			targetUri: e.documentUri,
			targetPath: e.path,
			segment: o,
			local: Zx.equals(e.documentUri, r)
		});
		return a;
	}
}, P(vt, "DefaultReferenceDescriptionProvider"), vt), NS = (yt = class {
	constructor() {
		this.segmentSeparator = "/", this.indexSeparator = "@";
	}
	getAstNodePath(e) {
		if (e.$container) {
			let t = this.getAstNodePath(e.$container), n = this.getPathSegment(e);
			return t + this.segmentSeparator + n;
		}
		return "";
	}
	getPathSegment({ $containerProperty: e, $containerIndex: t }) {
		if (!e) throw Error("Missing '$containerProperty' in AST node.");
		return t === void 0 ? e : e + this.indexSeparator + t;
	}
	getAstNode(e, t) {
		return t.split(this.segmentSeparator).reduce((e, t) => {
			if (!e || t.length === 0) return e;
			let n = t.indexOf(this.indexSeparator);
			if (n > 0) {
				let r = t.substring(0, n), i = parseInt(t.substring(n + 1));
				return e[r]?.[i];
			}
			return e[t];
		}, e);
	}
}, P(yt, "DefaultAstNodeLocator"), yt), PS = Qt(bi(), 1), FS = (bt = class {
	constructor(e) {
		this._ready = new Bx(), this.onConfigurationSectionUpdateEmitter = new PS.Emitter(), this.settings = {}, this.workspaceConfig = !1, this.serviceRegistry = e.ServiceRegistry;
	}
	get ready() {
		return this._ready.promise;
	}
	initialize(e) {
		this.workspaceConfig = e.capabilities.workspace?.configuration ?? !1;
	}
	async initialized(e) {
		if (this.workspaceConfig) {
			if (e.register) {
				let t = this.serviceRegistry.all;
				e.register({ section: t.map((e) => this.toSectionName(e.LanguageMetaData.languageId)) });
			}
			if (e.fetchConfiguration) {
				let t = this.serviceRegistry.all.map((e) => ({ section: this.toSectionName(e.LanguageMetaData.languageId) })), n = await e.fetchConfiguration(t);
				t.forEach((e, t) => {
					this.updateSectionConfiguration(e.section, n[t]);
				});
			}
		}
		this._ready.resolve();
	}
	updateConfiguration(e) {
		typeof e.settings != "object" || e.settings === null || Object.entries(e.settings).forEach(([e, t]) => {
			this.updateSectionConfiguration(e, t), this.onConfigurationSectionUpdateEmitter.fire({
				section: e,
				configuration: t
			});
		});
	}
	updateSectionConfiguration(e, t) {
		this.settings[e] = t;
	}
	async getConfiguration(e, t) {
		await this.ready;
		let n = this.toSectionName(e);
		if (this.settings[n]) return this.settings[n][t];
	}
	toSectionName(e) {
		return `${e}`;
	}
	get onConfigurationSectionUpdate() {
		return this.onConfigurationSectionUpdateEmitter.event;
	}
}, P(bt, "DefaultConfigurationProvider"), bt), IS = Qt(bi(), 1), LS;
(function(e) {
	function t(e) {
		return { dispose: /* @__PURE__ */ P(async () => await e(), "dispose") };
	}
	P(t, "create"), e.create = t;
})(LS ||= {});
var RS = (xt = class {
	constructor(e) {
		this.updateBuildOptions = { validation: { categories: ["built-in", "fast"] } }, this.updateListeners = [], this.buildPhaseListeners = new cS(), this.documentPhaseListeners = new cS(), this.buildState = /* @__PURE__ */ new Map(), this.documentBuildWaiters = /* @__PURE__ */ new Map(), this.currentState = Z.Changed, this.langiumDocuments = e.workspace.LangiumDocuments, this.langiumDocumentFactory = e.workspace.LangiumDocumentFactory, this.textDocuments = e.workspace.TextDocuments, this.indexManager = e.workspace.IndexManager, this.fileSystemProvider = e.workspace.FileSystemProvider, this.workspaceManager = () => e.workspace.WorkspaceManager, this.serviceRegistry = e.ServiceRegistry;
	}
	async build(e, t = {}, n = X.CancellationToken.None) {
		for (let n of e) {
			let e = n.uri.toString();
			if (n.state === Z.Validated) {
				if (typeof t.validation == "boolean" && t.validation) this.resetToState(n, Z.IndexedReferences);
				else if (typeof t.validation == "object") {
					let r = this.findMissingValidationCategories(n, t);
					r.length > 0 && (this.buildState.set(e, {
						completed: !1,
						options: { validation: { categories: r } },
						result: this.buildState.get(e)?.result
					}), n.state = Z.IndexedReferences);
				}
			} else this.buildState.delete(e);
		}
		this.currentState = Z.Changed, await this.emitUpdate(e.map((e) => e.uri), []), await this.buildDocuments(e, t, n);
	}
	async update(e, t, n = X.CancellationToken.None) {
		this.currentState = Z.Changed;
		let r = [];
		for (let e of t) {
			let t = this.langiumDocuments.deleteDocuments(e);
			for (let e of t) r.push(e.uri), this.cleanUpDeleted(e);
		}
		let i = (await Promise.all(e.map((e) => this.findChangedUris(e)))).flat();
		for (let e of i) {
			let t = this.langiumDocuments.getDocument(e);
			t === void 0 && (t = this.langiumDocumentFactory.fromModel({ $type: "INVALID" }, e), t.state = Z.Changed, this.langiumDocuments.addDocument(t)), this.resetToState(t, Z.Changed);
		}
		let a = B(i).concat(r).map((e) => e.toString()).toSet();
		this.langiumDocuments.all.filter((e) => !a.has(e.uri.toString()) && this.shouldRelink(e, a)).forEach((e) => this.resetToState(e, Z.ComputedScopes)), await this.emitUpdate(i, r), await zx(n);
		let o = this.sortDocuments(this.langiumDocuments.all.filter((e) => e.state < Z.Validated || !this.buildState.get(e.uri.toString())?.completed || this.resultsAreIncomplete(e, this.updateBuildOptions)).toArray());
		await this.buildDocuments(o, this.updateBuildOptions, n);
	}
	resultsAreIncomplete(e, t) {
		return this.findMissingValidationCategories(e, t).length >= 1;
	}
	findMissingValidationCategories(e, t) {
		let n = this.buildState.get(e.uri.toString()), r = this.serviceRegistry.getServices(e.uri).validation.ValidationRegistry.getAllValidationCategories(e), i = n?.result?.validationChecks ? new Set(n?.result?.validationChecks) : n?.completed ? r : /* @__PURE__ */ new Set();
		return B(t === void 0 || t.validation === !0 ? r : typeof t.validation == "object" ? t.validation.categories ?? r : []).filter((e) => !i.has(e)).toArray();
	}
	async findChangedUris(e) {
		if (this.langiumDocuments.getDocument(e) ?? this.textDocuments?.get(e)) return [e];
		try {
			let t = await this.fileSystemProvider.stat(e);
			if (t.isDirectory) return await this.workspaceManager().searchFolder(e);
			if (this.workspaceManager().shouldIncludeEntry(t)) return [e];
		} catch {}
		return [];
	}
	async emitUpdate(e, t) {
		await Promise.all(this.updateListeners.map((n) => n(e, t)));
	}
	sortDocuments(e) {
		let t = 0, n = e.length - 1;
		for (; t < n;) {
			for (; t < e.length && this.hasTextDocument(e[t]);) t++;
			for (; n >= 0 && !this.hasTextDocument(e[n]);) n--;
			t < n && ([e[t], e[n]] = [e[n], e[t]]);
		}
		return e;
	}
	hasTextDocument(e) {
		return !!this.textDocuments?.get(e.uri);
	}
	shouldRelink(e, t) {
		return e.references.some((e) => e.error !== void 0) ? !0 : this.indexManager.isAffected(e, t);
	}
	onUpdate(e) {
		return this.updateListeners.push(e), LS.create(() => {
			let t = this.updateListeners.indexOf(e);
			t >= 0 && this.updateListeners.splice(t, 1);
		});
	}
	resetToState(e, t) {
		switch (t) {
			case Z.Changed:
			case Z.Parsed: this.indexManager.removeContent(e.uri);
			case Z.IndexedContent: e.localSymbols = void 0;
			case Z.ComputedScopes: this.serviceRegistry.getServices(e.uri).references.Linker.unlink(e);
			case Z.Linked: this.indexManager.removeReferences(e.uri);
			case Z.IndexedReferences: e.diagnostics = void 0, this.buildState.delete(e.uri.toString());
			case Z.Validated:
		}
		e.state > t && (e.state = t);
	}
	cleanUpDeleted(e) {
		this.buildState.delete(e.uri.toString()), this.indexManager.remove(e.uri), e.state = Z.Changed;
	}
	async buildDocuments(e, t, n) {
		this.prepareBuild(e, t), await this.runCancelable(e, Z.Parsed, n, (e) => this.langiumDocumentFactory.update(e, n)), await this.runCancelable(e, Z.IndexedContent, n, (e) => this.indexManager.updateContent(e, n)), await this.runCancelable(e, Z.ComputedScopes, n, async (e) => {
			e.localSymbols = await this.serviceRegistry.getServices(e.uri).references.ScopeComputation.collectLocalSymbols(e, n);
		});
		let r = e.filter((e) => this.shouldLink(e));
		await this.runCancelable(r, Z.Linked, n, (e) => this.serviceRegistry.getServices(e.uri).references.Linker.link(e, n)), await this.runCancelable(r, Z.IndexedReferences, n, (e) => this.indexManager.updateReferences(e, n));
		let i = e.filter((e) => this.shouldValidate(e) ? !0 : (this.markAsCompleted(e), !1));
		await this.runCancelable(i, Z.Validated, n, async (e) => {
			await this.validate(e, n), this.markAsCompleted(e);
		});
	}
	markAsCompleted(e) {
		let t = this.buildState.get(e.uri.toString());
		t && (t.completed = !0);
	}
	prepareBuild(e, t) {
		for (let n of e) {
			let e = n.uri.toString(), r = this.buildState.get(e);
			(!r || r.completed) && this.buildState.set(e, {
				completed: !1,
				options: t,
				result: r?.result
			});
		}
	}
	async runCancelable(e, t, n, r) {
		for (let i of e) i.state < t && (await zx(n), await r(i), i.state = t, await this.notifyDocumentPhase(i, t, n));
		let i = e.filter((e) => e.state === t);
		await this.notifyBuildPhase(i, t, n), this.currentState = t;
	}
	onBuildPhase(e, t) {
		return this.buildPhaseListeners.add(e, t), LS.create(() => {
			this.buildPhaseListeners.delete(e, t);
		});
	}
	onDocumentPhase(e, t) {
		return this.documentPhaseListeners.add(e, t), LS.create(() => {
			this.documentPhaseListeners.delete(e, t);
		});
	}
	waitUntil(e, t, n) {
		let r;
		return t && "path" in t ? r = t : n = t, n ??= X.CancellationToken.None, r ? this.awaitDocumentState(e, r, n) : this.awaitBuilderState(e, n);
	}
	awaitDocumentState(e, t, n) {
		let r = this.langiumDocuments.getDocument(t);
		if (r) {
			if (r.state >= e) return Promise.resolve(t);
			if (n.isCancellationRequested) return Promise.reject(Lx);
			if (this.currentState >= e && e > r.state) return Promise.reject(new IS.ResponseError(IS.LSPErrorCodes.RequestFailed, `Document state of ${t.toString()} is ${Z[r.state]}, requiring ${Z[e]}, but workspace state is already ${Z[this.currentState]}. Returning undefined.`));
		} else return Promise.reject(new IS.ResponseError(IS.LSPErrorCodes.ServerCancelled, `No document found for URI: ${t.toString()}`));
		return new Promise((r, i) => {
			let a = this.onDocumentPhase(e, (e) => {
				Zx.equals(e.uri, t) && (a.dispose(), o.dispose(), r(e.uri));
			}), o = n.onCancellationRequested(() => {
				a.dispose(), o.dispose(), i(Lx);
			});
		});
	}
	awaitBuilderState(e, t) {
		return this.currentState >= e ? Promise.resolve() : t.isCancellationRequested ? Promise.reject(Lx) : new Promise((n, r) => {
			let i = this.onBuildPhase(e, () => {
				i.dispose(), a.dispose(), n();
			}), a = t.onCancellationRequested(() => {
				i.dispose(), a.dispose(), r(Lx);
			});
		});
	}
	async notifyDocumentPhase(e, t, n) {
		let r = this.documentPhaseListeners.get(t).slice();
		for (let t of r) try {
			await zx(n), await t(e, n);
		} catch (e) {
			if (!Rx(e)) throw e;
		}
	}
	async notifyBuildPhase(e, t, n) {
		if (e.length === 0) return;
		let r = this.buildPhaseListeners.get(t).slice();
		for (let t of r) await zx(n), await t(e, n);
	}
	shouldLink(e) {
		return this.getBuildOptions(e).eagerLinking ?? !0;
	}
	shouldValidate(e) {
		return !!this.getBuildOptions(e).validation;
	}
	async validate(e, t) {
		let n = this.serviceRegistry.getServices(e.uri).validation.DocumentValidator, r = this.getBuildOptions(e), i = typeof r.validation == "object" ? { ...r.validation } : {};
		i.categories = this.findMissingValidationCategories(e, r);
		let a = await n.validateDocument(e, i, t);
		e.diagnostics ? e.diagnostics.push(...a) : e.diagnostics = a;
		let o = this.buildState.get(e.uri.toString());
		o && (o.result ??= {}, o.result.validationChecks ? o.result.validationChecks = B(o.result.validationChecks).concat(i.categories).distinct().toArray() : o.result.validationChecks = [...i.categories]);
	}
	getBuildOptions(e) {
		return this.buildState.get(e.uri.toString())?.options ?? {};
	}
}, P(xt, "DefaultDocumentBuilder"), xt), zS = (St = class {
	constructor(e) {
		this.symbolIndex = /* @__PURE__ */ new Map(), this.symbolByTypeIndex = new hS(), this.referenceIndex = /* @__PURE__ */ new Map(), this.documents = e.workspace.LangiumDocuments, this.serviceRegistry = e.ServiceRegistry, this.astReflection = e.AstReflection;
	}
	findAllReferences(e, t) {
		let n = zi(e).uri, r = [];
		return this.referenceIndex.forEach((e) => {
			e.forEach((e) => {
				Zx.equals(e.targetUri, n) && e.targetPath === t && r.push(e);
			});
		}), B(r);
	}
	allElements(e, t) {
		let n = B(this.symbolIndex.keys());
		return t && (n = n.filter((e) => !t || t.has(e))), n.map((t) => this.getFileDescriptions(t, e)).flat();
	}
	getFileDescriptions(e, t) {
		return t ? this.symbolByTypeIndex.get(e, t, () => (this.symbolIndex.get(e) ?? []).filter((e) => this.astReflection.isSubtype(e.type, t))) : this.symbolIndex.get(e) ?? [];
	}
	remove(e) {
		this.removeContent(e), this.removeReferences(e);
	}
	removeContent(e) {
		let t = e.toString();
		this.symbolIndex.delete(t), this.symbolByTypeIndex.clear(t);
	}
	removeReferences(e) {
		let t = e.toString();
		this.referenceIndex.delete(t);
	}
	async updateContent(e, t = X.CancellationToken.None) {
		let n = await this.serviceRegistry.getServices(e.uri).references.ScopeComputation.collectExportedSymbols(e, t), r = e.uri.toString();
		this.symbolIndex.set(r, n), this.symbolByTypeIndex.clear(r);
	}
	async updateReferences(e, t = X.CancellationToken.None) {
		let n = await this.serviceRegistry.getServices(e.uri).workspace.ReferenceDescriptionProvider.createDescriptions(e, t);
		this.referenceIndex.set(e.uri.toString(), n);
	}
	isAffected(e, t) {
		let n = this.referenceIndex.get(e.uri.toString());
		return n ? n.some((e) => !e.local && t.has(e.targetUri.toString())) : !1;
	}
}, P(St, "DefaultIndexManager"), St), BS = (Ct = class {
	constructor(e) {
		this.initialBuildOptions = {}, this._ready = new Bx(), this.serviceRegistry = e.ServiceRegistry, this.langiumDocuments = e.workspace.LangiumDocuments, this.documentBuilder = e.workspace.DocumentBuilder, this.fileSystemProvider = e.workspace.FileSystemProvider, this.mutex = e.workspace.WorkspaceLock;
	}
	get ready() {
		return this._ready.promise;
	}
	get workspaceFolders() {
		return this.folders;
	}
	initialize(e) {
		this.folders = e.workspaceFolders ?? void 0;
	}
	initialized(e) {
		return this.mutex.write((e) => this.initializeWorkspace(this.folders ?? [], e));
	}
	async initializeWorkspace(e, t = X.CancellationToken.None) {
		let n = await this.performStartup(e);
		await zx(t), await this.documentBuilder.build(n, this.initialBuildOptions, t);
	}
	async performStartup(e) {
		let t = [], n = /* @__PURE__ */ P((e) => {
			t.push(e), this.langiumDocuments.hasDocument(e.uri) || this.langiumDocuments.addDocument(e);
		}, "collector");
		await this.loadAdditionalDocuments(e, n);
		let r = [];
		await Promise.all(e.map((e) => this.getRootFolder(e)).map(async (e) => this.traverseFolder(e, r)));
		let i = B(r).distinct((e) => e.toString()).filter((e) => !this.langiumDocuments.hasDocument(e));
		return await this.loadWorkspaceDocuments(i, n), this._ready.resolve(), t;
	}
	async loadWorkspaceDocuments(e, t) {
		await Promise.all(e.map(async (e) => {
			t(await this.langiumDocuments.getOrCreateDocument(e));
		}));
	}
	loadAdditionalDocuments(e, t) {
		return Promise.resolve();
	}
	getRootFolder(e) {
		return Yx.parse(e.uri);
	}
	async traverseFolder(e, t) {
		try {
			let n = await this.fileSystemProvider.readDirectory(e);
			await Promise.all(n.map(async (e) => {
				this.shouldIncludeEntry(e) && (e.isDirectory ? await this.traverseFolder(e.uri, t) : e.isFile && t.push(e.uri));
			}));
		} catch (t) {
			console.error("Failure to read directory content of " + e.toString(!0), t);
		}
	}
	async searchFolder(e) {
		let t = [];
		return await this.traverseFolder(e, t), t;
	}
	shouldIncludeEntry(e) {
		let t = Zx.basename(e.uri);
		return t.startsWith(".") ? !1 : e.isDirectory ? t !== "node_modules" && t !== "out" : e.isFile ? this.serviceRegistry.hasServices(e.uri) : !1;
	}
}, P(Ct, "DefaultWorkspaceManager"), Ct), VS = (wt = class {
	buildUnexpectedCharactersMessage(e, t, n, r, i) {
		return Nl.buildUnexpectedCharactersMessage(e, t, n, r, i);
	}
	buildUnableToPopLexerModeMessage(e) {
		return Nl.buildUnableToPopLexerModeMessage(e);
	}
}, P(wt, "DefaultLexerErrorMessageProvider"), wt), HS = { mode: "full" }, US = (Tt = class {
	constructor(e) {
		this.errorMessageProvider = e.parser.LexerErrorMessageProvider, this.tokenBuilder = e.parser.TokenBuilder;
		let t = this.tokenBuilder.buildTokens(e.Grammar, { caseInsensitive: e.LanguageMetaData.caseInsensitive });
		this.tokenTypes = this.toTokenTypeDictionary(t);
		let n = KS(t) ? Object.values(t) : t, r = e.LanguageMetaData.mode === "production";
		this.chevrotainLexer = new Fl(n, {
			positionTracking: "full",
			skipValidations: r,
			errorMessageProvider: this.errorMessageProvider
		});
	}
	get definition() {
		return this.tokenTypes;
	}
	tokenize(e, t = HS) {
		let n = this.chevrotainLexer.tokenize(e);
		return {
			tokens: n.tokens,
			errors: n.errors,
			hidden: n.groups.hidden ?? [],
			report: this.tokenBuilder.flushLexingReport?.(e)
		};
	}
	toTokenTypeDictionary(e) {
		if (KS(e)) return e;
		let t = GS(e) ? Object.values(e.modes).flat() : e, n = {};
		return t.forEach((e) => n[e.name] = e), n;
	}
}, P(Tt, "DefaultLexer"), Tt);
function WS(e) {
	return Array.isArray(e) && (e.length === 0 || "name" in e[0]);
}
P(WS, "isTokenTypeArray");
function GS(e) {
	return e && "modes" in e && "defaultMode" in e;
}
P(GS, "isIMultiModeLexerDefinition");
function KS(e) {
	return !WS(e) && !GS(e);
}
P(KS, "isTokenTypeDictionary"), Jr();
function qS(e, t, n) {
	let r, i;
	typeof e == "string" ? (i = t, r = n) : (i = e.range.start, r = t), i ||= I.create(0, 0);
	let a = YS(e), o = dC(r);
	return iC({
		index: 0,
		tokens: QS({
			lines: a,
			position: i,
			options: o
		}),
		position: i
	});
}
P(qS, "parseJSDoc");
function JS(e, t) {
	let n = dC(t), r = YS(e);
	if (r.length === 0) return !1;
	let i = r[0], a = r[r.length - 1], o = n.start, s = n.end;
	return !!o?.exec(i) && !!s?.exec(a);
}
P(JS, "isJSDoc");
function YS(e) {
	let t = "";
	return t = typeof e == "string" ? e : e.text, t.split($o);
}
P(YS, "getLines");
var XS = /\s*(@([\p{L}][\p{L}\p{N}]*)?)/uy, ZS = /\{(@[\p{L}][\p{L}\p{N}]*)(\s*)([^\r\n}]+)?\}/gu;
function QS(e) {
	let t = [], n = e.position.line, r = e.position.character;
	for (let i = 0; i < e.lines.length; i++) {
		let a = i === 0, o = i === e.lines.length - 1, s = e.lines[i], c = 0;
		if (a && e.options.start) {
			let t = e.options.start?.exec(s);
			t && (c = t.index + t[0].length);
		} else {
			let t = e.options.line?.exec(s);
			t && (c = t.index + t[0].length);
		}
		if (o) {
			let t = e.options.end?.exec(s);
			t && (s = s.substring(0, t.index));
		}
		if (s = s.substring(0, rC(s)), nC(s, c) >= s.length) {
			if (t.length > 0) {
				let e = I.create(n, r);
				t.push({
					type: "break",
					content: "",
					range: L.create(e, e)
				});
			}
		} else {
			XS.lastIndex = c;
			let e = XS.exec(s);
			if (e) {
				let i = e[0], a = e[1], o = I.create(n, r + c), l = I.create(n, r + c + i.length);
				t.push({
					type: "tag",
					content: a,
					range: L.create(o, l)
				}), c += i.length, c = nC(s, c);
			}
			if (c < s.length) {
				let e = s.substring(c), i = Array.from(e.matchAll(ZS));
				t.push(...$S(i, e, n, r + c));
			}
		}
		n++, r = 0;
	}
	return t.length > 0 && t[t.length - 1].type === "break" ? t.slice(0, -1) : t;
}
P(QS, "tokenize");
function $S(e, t, n, r) {
	let i = [];
	if (e.length === 0) {
		let e = I.create(n, r), a = I.create(n, r + t.length);
		i.push({
			type: "text",
			content: t,
			range: L.create(e, a)
		});
	} else {
		let a = 0;
		for (let o of e) {
			let e = o.index, s = t.substring(a, e);
			s.length > 0 && i.push({
				type: "text",
				content: t.substring(a, e),
				range: L.create(I.create(n, a + r), I.create(n, e + r))
			});
			let c = s.length + 1, l = o[1];
			if (i.push({
				type: "inline-tag",
				content: l,
				range: L.create(I.create(n, a + c + r), I.create(n, a + c + l.length + r))
			}), c += l.length, o.length === 4) {
				c += o[2].length;
				let e = o[3];
				i.push({
					type: "text",
					content: e,
					range: L.create(I.create(n, a + c + r), I.create(n, a + c + e.length + r))
				});
			} else i.push({
				type: "text",
				content: "",
				range: L.create(I.create(n, a + c + r), I.create(n, a + c + r))
			});
			a = e + o[0].length;
		}
		let o = t.substring(a);
		o.length > 0 && i.push({
			type: "text",
			content: o,
			range: L.create(I.create(n, a + r), I.create(n, a + r + o.length))
		});
	}
	return i;
}
P($S, "buildInlineTokens");
var eC = /\S/, tC = /\s*$/;
function nC(e, t) {
	let n = e.substring(t).match(eC);
	return n ? t + n.index : e.length;
}
P(nC, "skipWhitespace");
function rC(e) {
	let t = e.match(tC);
	if (t && typeof t.index == "number") return t.index;
}
P(rC, "lastCharacter");
function iC(e) {
	let t = I.create(e.position.line, e.position.character);
	if (e.tokens.length === 0) return new pC([], L.create(t, t));
	let n = [];
	for (; e.index < e.tokens.length;) {
		let t = aC(e, n[n.length - 1]);
		t && n.push(t);
	}
	let r = n[0]?.range.start ?? t, i = n[n.length - 1]?.range.end ?? t;
	return new pC(n, L.create(r, i));
}
P(iC, "parseJSDocComment");
function aC(e, t) {
	let n = e.tokens[e.index];
	if (n.type === "tag") return lC(e, !1);
	if (n.type === "text" || n.type === "inline-tag") return sC(e);
	oC(n, t), e.index++;
}
P(aC, "parseJSDocElement");
function oC(e, t) {
	if (t) {
		let n = new vC("", e.range);
		"inlines" in t ? t.inlines.push(n) : t.content.inlines.push(n);
	}
}
P(oC, "appendEmptyLine");
function sC(e) {
	let t = e.tokens[e.index], n = t, r = t, i = [];
	for (; t && t.type !== "break" && t.type !== "tag";) i.push(cC(e)), r = t, t = e.tokens[e.index];
	return new _C(i, L.create(n.range.start, r.range.end));
}
P(sC, "parseJSDocText");
function cC(e) {
	return e.tokens[e.index].type === "inline-tag" ? lC(e, !0) : uC(e);
}
P(cC, "parseJSDocInline");
function lC(e, t) {
	let n = e.tokens[e.index++], r = n.content.substring(1);
	if (e.tokens[e.index]?.type === "text") {
		if (t) {
			let i = uC(e);
			return new mC(r, new _C([i], i.range), t, L.create(n.range.start, i.range.end));
		}
		{
			let i = sC(e);
			return new mC(r, i, t, L.create(n.range.start, i.range.end));
		}
	}
	{
		let e = n.range;
		return new mC(r, new _C([], e), t, e);
	}
}
P(lC, "parseJSDocTag");
function uC(e) {
	let t = e.tokens[e.index++];
	return new vC(t.content, t.range);
}
P(uC, "parseJSDocLine");
function dC(e) {
	if (!e) return dC({
		start: "/**",
		end: "*/",
		line: "*"
	});
	let { start: t, end: n, line: r } = e;
	return {
		start: fC(t, !0),
		end: fC(n, !1),
		line: fC(r, !0)
	};
}
P(dC, "normalizeOptions");
function fC(e, t) {
	if (typeof e == "string" || typeof e == "object") {
		let n = typeof e == "string" ? as(e) : e.source;
		return RegExp(t ? `^\\s*${n}` : `\\s*${n}\\s*$`);
	}
	return e;
}
P(fC, "normalizeOption");
var pC = (Et = class {
	constructor(e, t) {
		this.elements = e, this.range = t;
	}
	getTag(e) {
		return this.getAllTags().find((t) => t.name === e);
	}
	getTags(e) {
		return this.getAllTags().filter((t) => t.name === e);
	}
	getAllTags() {
		return this.elements.filter((e) => "name" in e);
	}
	toString() {
		let e = "";
		for (let t of this.elements) if (e.length === 0) e = t.toString();
		else {
			let n = t.toString();
			e += yC(e) + n;
		}
		return e.trim();
	}
	toMarkdown(e) {
		let t = "";
		for (let n of this.elements) if (t.length === 0) t = n.toMarkdown(e);
		else {
			let r = n.toMarkdown(e);
			t += yC(t) + r;
		}
		return t.trim();
	}
}, P(Et, "JSDocCommentImpl"), Et), mC = (Dt = class {
	constructor(e, t, n, r) {
		this.name = e, this.content = t, this.inline = n, this.range = r;
	}
	toString() {
		let e = `@${this.name}`, t = this.content.toString();
		return this.content.inlines.length === 1 ? e = `${e} ${t}` : this.content.inlines.length > 1 && (e = `${e}
${t}`), this.inline ? `{${e}}` : e;
	}
	toMarkdown(e) {
		return e?.renderTag?.(this) ?? this.toMarkdownDefault(e);
	}
	toMarkdownDefault(e) {
		let t = this.content.toMarkdown(e);
		if (this.inline) {
			let n = hC(this.name, t, e ?? {});
			if (typeof n == "string") return n;
		}
		let n = "";
		e?.tag === "italic" || e?.tag === void 0 ? n = "*" : e?.tag === "bold" ? n = "**" : e?.tag === "bold-italic" && (n = "***");
		let r = `${n}@${this.name}${n}`;
		return this.content.inlines.length === 1 ? r = `${r} — ${t}` : this.content.inlines.length > 1 && (r = `${r}
${t}`), this.inline ? `{${r}}` : r;
	}
}, P(Dt, "JSDocTagImpl"), Dt);
function hC(e, t, n) {
	if (e === "linkplain" || e === "linkcode" || e === "link") {
		let r = t.indexOf(" "), i = t;
		if (r > 0) {
			let e = nC(t, r);
			i = t.substring(e), t = t.substring(0, r);
		}
		return (e === "linkcode" || e === "link" && n.link === "code") && (i = `\`${i}\``), n.renderLink?.(t, i) ?? gC(t, i);
	}
}
P(hC, "renderInlineTag");
function gC(e, t) {
	try {
		return Yx.parse(e, !0), `[${t}](${e})`;
	} catch {
		return e;
	}
}
P(gC, "renderLinkDefault");
var _C = (Ot = class {
	constructor(e, t) {
		this.inlines = e, this.range = t;
	}
	toString() {
		let e = "";
		for (let t = 0; t < this.inlines.length; t++) {
			let n = this.inlines[t], r = this.inlines[t + 1];
			e += n.toString(), r && r.range.start.line > n.range.start.line && (e += "\n");
		}
		return e;
	}
	toMarkdown(e) {
		let t = "";
		for (let n = 0; n < this.inlines.length; n++) {
			let r = this.inlines[n], i = this.inlines[n + 1];
			t += r.toMarkdown(e), i && i.range.start.line > r.range.start.line && (t += "\n");
		}
		return t;
	}
}, P(Ot, "JSDocTextImpl"), Ot), vC = (kt = class {
	constructor(e, t) {
		this.text = e, this.range = t;
	}
	toString() {
		return this.text;
	}
	toMarkdown() {
		return this.text;
	}
}, P(kt, "JSDocLineImpl"), kt);
function yC(e) {
	return e.endsWith("\n") ? "\n" : "\n\n";
}
P(yC, "fillNewlines");
var bC = (At = class {
	constructor(e) {
		this.indexManager = e.shared.workspace.IndexManager, this.commentProvider = e.documentation.CommentProvider;
	}
	getDocumentation(e) {
		let t = this.commentProvider.getComment(e);
		if (t && JS(t)) return qS(t).toMarkdown({
			renderLink: /* @__PURE__ */ P((t, n) => this.documentationLinkRenderer(e, t, n), "renderLink"),
			renderTag: /* @__PURE__ */ P((t) => this.documentationTagRenderer(e, t), "renderTag")
		});
	}
	documentationLinkRenderer(e, t, n) {
		let r = this.findNameInLocalSymbols(e, t) ?? this.findNameInGlobalScope(e, t);
		if (r && r.nameSegment) {
			let e = r.nameSegment.range.start.line + 1, t = r.nameSegment.range.start.character + 1;
			return `[${n}](${r.documentUri.with({ fragment: `L${e},${t}` }).toString()})`;
		}
	}
	documentationTagRenderer(e, t) {}
	findNameInLocalSymbols(e, t) {
		let n = zi(e).localSymbols;
		if (!n) return;
		let r = e;
		do {
			let e = n.getStream(r).find((e) => e.name === t);
			if (e) return e;
			r = r.$container;
		} while (r);
	}
	findNameInGlobalScope(e, t) {
		return this.indexManager.allElements().find((e) => e.name === t);
	}
}, P(At, "JSDocDocumentationProvider"), At), xC = (jt = class {
	constructor(e) {
		this.grammarConfig = () => e.parser.GrammarConfig;
	}
	getComment(e) {
		return vS(e) ? e.$comment : Fo(e.$cstNode, this.grammarConfig().multilineCommentRules)?.text;
	}
}, P(jt, "DefaultCommentProvider"), jt), SC = (Mt = class {
	constructor(e) {
		this.syncParser = e.parser.LangiumParser;
	}
	parse(e, t) {
		return Promise.resolve(this.syncParser.parse(e));
	}
}, P(Mt, "DefaultAsyncParser"), Mt), CC;
(function(e) {
	e[e.Normal = 0] = "Normal", e[e.Immediate = 1] = "Immediate";
})(CC ||= {});
var wC = (Nt = class {
	constructor() {
		this.previousTokenSource = new X.CancellationTokenSource(), this.writeQueue = [], this.readQueue = [], this.immediateReads = [], this.done = !0;
	}
	write(e) {
		this.cancelWrite();
		let t = Ix();
		return this.previousTokenSource = t, this.enqueue(this.writeQueue, e, t.token);
	}
	read(e, t = CC.Normal) {
		if (t === CC.Immediate) {
			let t = Promise.resolve().then(() => e());
			this.immediateReads.push(t);
			let n = /* @__PURE__ */ P(() => {
				this.immediateReads.splice(this.immediateReads.indexOf(t), 1);
			}, "remove");
			return t.then(n, n), t;
		}
		return this.enqueue(this.readQueue, e);
	}
	enqueue(e, t, n = X.CancellationToken.None) {
		let r = new Bx(), i = {
			action: t,
			deferred: r,
			cancellationToken: n
		};
		return e.push(i), this.performNextOperation(), r.promise;
	}
	async performNextOperation() {
		if (!this.done) return;
		let e = [];
		if (this.writeQueue.length > 0) for (e.push(this.writeQueue.shift()), this.done = !1; this.immediateReads.length > 0;) await Promise.allSettled(this.immediateReads.slice());
		else if (this.readQueue.length > 0) e.push(...this.readQueue.splice(0, this.readQueue.length)), this.done = !1;
		else return;
		await Promise.all(e.map(async ({ action: e, deferred: t, cancellationToken: n }) => {
			try {
				let r = await Promise.resolve().then(() => e(n));
				t.resolve(r);
			} catch (e) {
				Rx(e) ? t.resolve(void 0) : t.reject(e);
			}
		})), this.done = !0, this.performNextOperation();
	}
	cancelWrite() {
		this.previousTokenSource.cancel();
	}
}, P(Nt, "DefaultWorkspaceLock"), Nt), TC = (Pt = class {
	constructor(e) {
		this.grammarElementIdMap = new lS(), this.tokenTypeIdMap = new lS(), this.cstNodeBuilder = new Gb(), this.grammar = e.Grammar, this.lexer = e.parser.Lexer, this.linker = e.references.Linker;
	}
	dehydrate(e) {
		return {
			lexerErrors: e.lexerErrors,
			lexerReport: e.lexerReport ? this.dehydrateLexerReport(e.lexerReport) : void 0,
			parserErrors: e.parserErrors.map((e) => ({
				...e,
				message: e.message
			})),
			value: this.dehydrateAstNode(e.value, this.createDehyrationContext(e.value))
		};
	}
	dehydrateLexerReport(e) {
		return e;
	}
	createDehyrationContext(e) {
		let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
		for (let n of Wi(e)) t.set(n, {});
		if (e.$cstNode) for (let t of Eo(e.$cstNode)) n.set(t, {});
		return {
			astNodes: t,
			cstNodes: n
		};
	}
	dehydrateAstNode(e, t) {
		let n = t.astNodes.get(e);
		n.$type = e.$type, n.$containerIndex = e.$containerIndex, n.$containerProperty = e.$containerProperty, e.$cstNode !== void 0 && (n.$cstNode = this.dehydrateCstNode(e.$cstNode, t));
		for (let [r, i] of Object.entries(e)) if (!r.startsWith("$")) {
			if (Array.isArray(i)) {
				let e = [];
				n[r] = e;
				for (let n of i) xi(n) ? e.push(this.dehydrateAstNode(n, t)) : Si(n) ? e.push(this.dehydrateReference(n, t)) : e.push(n);
			} else xi(i) ? n[r] = this.dehydrateAstNode(i, t) : Si(i) ? n[r] = this.dehydrateReference(i, t) : i !== void 0 && (n[r] = i);
		}
		return n;
	}
	dehydrateReference(e, t) {
		let n = {};
		return n.$refText = e.$refText, e.$refNode && (n.$refNode = t.cstNodes.get(e.$refNode)), n;
	}
	dehydrateCstNode(e, t) {
		let n = t.cstNodes.get(e);
		if (ki(e) ? n.fullText = e.fullText : n.grammarSource = this.getGrammarElementId(e.grammarSource), n.hidden = e.hidden, Di(e)) n.content = e.content.map((e) => this.dehydrateCstNode(e, t));
		else if (Oi(e)) {
			n.tokenType = e.tokenType.name, n.offset = e.offset, n.length = e.length;
			let { start: t, end: r } = e.range;
			n.startLine = t.line, n.startColumn = t.character, n.endLine = r.line, n.endColumn = r.character;
		}
		return n;
	}
	hydrate(e) {
		let t = e.value, n = this.createHydrationContext(t);
		return "$cstNode" in t && this.hydrateCstNode(t.$cstNode, n), {
			lexerErrors: e.lexerErrors,
			lexerReport: e.lexerReport,
			parserErrors: e.parserErrors,
			value: this.hydrateAstNode(t, n)
		};
	}
	createHydrationContext(e) {
		let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
		for (let n of Wi(e)) t.set(n, {});
		if (e.$cstNode) for (let t of Eo(e.$cstNode)) {
			let e;
			"fullText" in t ? e = new Xb(t.fullText) : "content" in t ? e = new Yb() : "tokenType" in t && (e = this.hydrateCstLeafNode(t)), e && n.set(t, e);
		}
		return {
			astNodes: t,
			cstNodes: n,
			linkedCstNodes: /* @__PURE__ */ new Set()
		};
	}
	hydrateAstNode(e, t) {
		let n = t.astNodes.get(e);
		if (n.$type = e.$type, n.$containerIndex = e.$containerIndex, n.$containerProperty = e.$containerProperty, e.$cstNode) {
			let r = t.cstNodes.get(e.$cstNode);
			n.$cstNode = r, r && !t.linkedCstNodes.has(r) && (t.linkedCstNodes.add(r), r.astNode = n);
		}
		for (let [r, i] of Object.entries(e)) if (!r.startsWith("$")) {
			if (Array.isArray(i)) {
				let e = [];
				n[r] = e;
				for (let a of i) xi(a) ? e.push(this.setParent(this.hydrateAstNode(a, t), n)) : Si(a) ? e.push(this.hydrateReference(a, n, r, t)) : e.push(a);
			} else xi(i) ? n[r] = this.setParent(this.hydrateAstNode(i, t), n) : Si(i) ? n[r] = this.hydrateReference(i, n, r, t) : i !== void 0 && (n[r] = i);
		}
		return n;
	}
	setParent(e, t) {
		return e.$container = t, e;
	}
	hydrateReference(e, t, n, r) {
		return this.linker.buildReference(t, n, r.cstNodes.get(e.$refNode), e.$refText);
	}
	hydrateCstNode(e, t, n = 0) {
		let r = t.cstNodes.get(e);
		if (typeof e.grammarSource == "number" && (r.grammarSource = this.getGrammarElement(e.grammarSource)), Di(r)) {
			let i = [];
			for (let r of e.content) i.push(this.hydrateCstNode(r, t, n++));
			this.cstNodeBuilder.appendChildren(r, i);
		}
		return r;
	}
	hydrateCstLeafNode(e) {
		let t = this.getTokenType(e.tokenType);
		return new qb(e.offset, e.length, e.startLine, e.startColumn, e.endLine, e.endColumn, t, e.hidden);
	}
	getTokenType(e) {
		return this.lexer.definition[e];
	}
	getGrammarElementId(e) {
		if (e) return this.grammarElementIdMap.size === 0 && this.createGrammarElementIdMap(), this.grammarElementIdMap.get(e);
	}
	getGrammarElement(e) {
		return this.grammarElementIdMap.size === 0 && this.createGrammarElementIdMap(), this.grammarElementIdMap.getKey(e);
	}
	createGrammarElementIdMap() {
		let e = 0;
		for (let t of Wi(this.grammar)) Xi(t) && this.grammarElementIdMap.set(t, e++);
	}
}, P(Pt, "DefaultHydrator"), Pt);
function EC(e) {
	return {
		documentation: {
			CommentProvider: /* @__PURE__ */ P((e) => new xC(e), "CommentProvider"),
			DocumentationProvider: /* @__PURE__ */ P((e) => new bC(e), "DocumentationProvider")
		},
		parser: {
			AsyncParser: /* @__PURE__ */ P((e) => new SC(e), "AsyncParser"),
			GrammarConfig: /* @__PURE__ */ P((e) => Rs(e), "GrammarConfig"),
			LangiumParser: /* @__PURE__ */ P((e) => Ox(e), "LangiumParser"),
			CompletionParser: /* @__PURE__ */ P((e) => Dx(e), "CompletionParser"),
			ValueConverter: /* @__PURE__ */ P(() => new jx(), "ValueConverter"),
			TokenBuilder: /* @__PURE__ */ P(() => new Ax(), "TokenBuilder"),
			Lexer: /* @__PURE__ */ P((e) => new US(e), "Lexer"),
			ParserErrorMessageProvider: /* @__PURE__ */ P(() => new ix(), "ParserErrorMessageProvider"),
			LexerErrorMessageProvider: /* @__PURE__ */ P(() => new VS(), "LexerErrorMessageProvider")
		},
		workspace: {
			AstNodeLocator: /* @__PURE__ */ P(() => new NS(), "AstNodeLocator"),
			AstNodeDescriptionProvider: /* @__PURE__ */ P((e) => new jS(e), "AstNodeDescriptionProvider"),
			ReferenceDescriptionProvider: /* @__PURE__ */ P((e) => new MS(e), "ReferenceDescriptionProvider")
		},
		references: {
			Linker: /* @__PURE__ */ P((e) => new iS(e), "Linker"),
			NameProvider: /* @__PURE__ */ P(() => new oS(), "NameProvider"),
			ScopeProvider: /* @__PURE__ */ P((e) => new _S(e), "ScopeProvider"),
			ScopeComputation: /* @__PURE__ */ P((e) => new uS(e), "ScopeComputation"),
			References: /* @__PURE__ */ P((e) => new sS(e), "References")
		},
		serializer: {
			Hydrator: /* @__PURE__ */ P((e) => new TC(e), "Hydrator"),
			JsonSerializer: /* @__PURE__ */ P((e) => new bS(e), "JsonSerializer")
		},
		validation: {
			DocumentValidator: /* @__PURE__ */ P((e) => new ES(e), "DocumentValidator"),
			ValidationRegistry: /* @__PURE__ */ P((e) => new wS(e), "ValidationRegistry")
		},
		shared: /* @__PURE__ */ P(() => e.shared, "shared")
	};
}
P(EC, "createDefaultCoreModule");
function DC(e) {
	return {
		ServiceRegistry: /* @__PURE__ */ P((e) => new xS(e), "ServiceRegistry"),
		workspace: {
			LangiumDocuments: /* @__PURE__ */ P((e) => new eS(e), "LangiumDocuments"),
			LangiumDocumentFactory: /* @__PURE__ */ P((e) => new $x(e), "LangiumDocumentFactory"),
			DocumentBuilder: /* @__PURE__ */ P((e) => new RS(e), "DocumentBuilder"),
			IndexManager: /* @__PURE__ */ P((e) => new zS(e), "IndexManager"),
			WorkspaceManager: /* @__PURE__ */ P((e) => new BS(e), "WorkspaceManager"),
			FileSystemProvider: /* @__PURE__ */ P((t) => e.fileSystemProvider(t), "FileSystemProvider"),
			WorkspaceLock: /* @__PURE__ */ P(() => new wC(), "WorkspaceLock"),
			ConfigurationProvider: /* @__PURE__ */ P((e) => new FS(e), "ConfigurationProvider")
		},
		profilers: {}
	};
}
P(DC, "createDefaultSharedCoreModule");
var OC;
(function(e) {
	e.merge = (e, t) => NC(NC({}, e), t);
})(OC ||= {});
function Q(e, t, n, r, i, a, o, s, c) {
	return AC([
		e,
		t,
		n,
		r,
		i,
		a,
		o,
		s,
		c
	].reduce(NC, {}));
}
P(Q, "inject");
var kC = /* @__PURE__ */ Symbol("isProxy");
function AC(e, t) {
	let n = new Proxy({}, {
		deleteProperty: /* @__PURE__ */ P(() => !1, "deleteProperty"),
		set: /* @__PURE__ */ P(() => {
			throw Error("Cannot set property on injected service container");
		}, "set"),
		get: /* @__PURE__ */ P((r, i) => i === kC || MC(r, i, e, t || n), "get"),
		getOwnPropertyDescriptor: /* @__PURE__ */ P((r, i) => (MC(r, i, e, t || n), Object.getOwnPropertyDescriptor(r, i)), "getOwnPropertyDescriptor"),
		has: /* @__PURE__ */ P((t, n) => n in e, "has"),
		ownKeys: /* @__PURE__ */ P(() => [...Object.getOwnPropertyNames(e)], "ownKeys")
	});
	return n;
}
P(AC, "_inject");
var jC = /* @__PURE__ */ Symbol();
function MC(e, t, n, r) {
	if (t in e) {
		if (e[t] instanceof Error) throw Error("Construction failure. Please make sure that your dependencies are constructable. Cause: " + e[t]);
		if (e[t] === jC) throw Error("Cycle detected. Please make \"" + String(t) + "\" lazy. Visit https://langium.org/docs/reference/configuration-services/#resolving-cyclic-dependencies");
		return e[t];
	}
	if (t in n) {
		let i = n[t];
		e[t] = jC;
		try {
			e[t] = typeof i == "function" ? i(r) : AC(i, r);
		} catch (n) {
			throw e[t] = n instanceof Error ? n : void 0, n;
		}
		return e[t];
	}
}
P(MC, "_resolve");
function NC(e, t) {
	if (t) {
		for (let [n, r] of Object.entries(t)) if (n !== "__proto__" && n !== "constructor" && n !== "prototype" && r != null) {
			if (typeof r == "object") {
				let t = e[n];
				e[n] = NC(typeof t == "object" && t ? t : {}, r);
			} else e[n] = r;
		}
	}
	return e;
}
P(NC, "_merge");
var PC = (Ft = class {
	stat(e) {
		throw Error("No file system is available.");
	}
	statSync(e) {
		throw Error("No file system is available.");
	}
	async exists() {
		return !1;
	}
	existsSync() {
		return !1;
	}
	readBinary() {
		throw Error("No file system is available.");
	}
	readBinarySync() {
		throw Error("No file system is available.");
	}
	readFile() {
		throw Error("No file system is available.");
	}
	readFileSync() {
		throw Error("No file system is available.");
	}
	async readDirectory() {
		return [];
	}
	readDirectorySync() {
		return [];
	}
}, P(Ft, "EmptyFileSystemProvider"), Ft), FC = { fileSystemProvider: /* @__PURE__ */ P(() => new PC(), "fileSystemProvider") }, IC = {
	Grammar: /* @__PURE__ */ P(() => {}, "Grammar"),
	LanguageMetaData: /* @__PURE__ */ P(() => ({
		caseInsensitive: !1,
		fileExtensions: [".langium"],
		languageId: "langium"
	}), "LanguageMetaData")
}, LC = { AstReflection: /* @__PURE__ */ P(() => new To(), "AstReflection") };
function RC() {
	let e = Q(DC(FC), LC), t = Q(EC({ shared: e }), IC);
	return e.ServiceRegistry.register(t), t;
}
P(RC, "createMinimalGrammarServices");
function zC(e) {
	let t = RC(), n = t.serializer.JsonSerializer.deserialize(e);
	return t.shared.workspace.LangiumDocumentFactory.fromModel(n, Yx.parse(`memory:/${n.name ?? "grammar"}.langium`)), n;
}
P(zC, "loadGrammarFromJson");
var BC;
((e) => {
	e.Terminals = {
		ARROW_DIRECTION: /L|R|T|B/,
		ARROW_GROUP: /\{group\}/,
		ARROW_INTO: /<|>/,
		ACC_DESCR: /[\t ]*accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/,
		ACC_TITLE: /[\t ]*accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/,
		TITLE: /[\t ]*title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/,
		STRING: /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/,
		ID: /[\w]([-\w]*\w)?/,
		NEWLINE: /\r?\n/,
		WHITESPACE: /[\t ]+/,
		YAML: /---[\t ]*\r?\n(?:[\S\s]*?\r?\n)?---(?:\r?\n|(?!\S))/,
		DIRECTIVE: /[\t ]*%%{[\S\s]*?}%%(?:\r?\n|(?!\S))/,
		SINGLE_LINE_COMMENT: /[\t ]*%%[^\n\r]*/,
		ARCH_ICON: /\([\w-:]+\)/,
		ARCH_TITLE: /\[(?:"([^"\\]|\\.)*"|'([^'\\]|\\.)*'|[^\[\]\r\n]+)\]/
	};
})(BC ||= {});
var VC;
((e) => {
	e.Terminals = {
		DOMAIN_NAME: /complex|complicated|clear|chaotic|confusion/,
		ACC_DESCR: /[\t ]*accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/,
		ACC_TITLE: /[\t ]*accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/,
		TITLE: /[\t ]*title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/,
		STRING: /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/,
		NEWLINE: /\r?\n/,
		WHITESPACE: /[\t ]+/,
		YAML: /---[\t ]*\r?\n(?:[\S\s]*?\r?\n)?---(?:\r?\n|(?!\S))/,
		DIRECTIVE: /[\t ]*%%{[\S\s]*?}%%(?:\r?\n|(?!\S))/,
		SINGLE_LINE_COMMENT: /[\t ]*%%[^\n\r]*/
	};
})(VC ||= {});
var HC;
((e) => {
	e.Terminals = {
		EM_ID: /[_a-zA-Z][\w_]*/,
		EM_FID: /\d{1,3}/,
		EM_DATA_INLINE: /\{(.*)\}|"(.*)"|'(.*)'/,
		EM_DATA_BLOCK: /\{[\t ]*\r?\n(?:[\S\s]*?\r?\n)?\}(?:\r?\n|(?!\S))/,
		EM_ACC_DESCR: /[\t ]*accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/,
		EM_ACC_TITLE: /[\t ]*accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/,
		EM_TITLE: /[\t ]*title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/,
		EM_WS: /\s+/,
		EM_YAML: /---[\t ]*\r?\n(?:[\S\s]*?\r?\n)?---(?:\r?\n|(?!\S))/,
		EM_DIRECTIVE: /[\t ]*%%{[\S\s]*?}%%(?:\r?\n|(?!\S))/,
		EM_SINGLE_LINE_COMMENT: /[\t ]*%%[^\n\r]*/,
		EM_ML_COMMENT: /\/\*[\s\S]*?\*\//,
		EM_SL_COMMENT: /\/\/[^\n\r]*/
	};
})(HC ||= {});
var UC;
((e) => {
	e.Terminals = {
		ACC_DESCR: /[\t ]*accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/,
		ACC_TITLE: /[\t ]*accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/,
		TITLE: /[\t ]*title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/,
		INT: /0|[1-9][0-9]*(?!\.)/,
		STRING: /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/,
		NEWLINE: /\r?\n/,
		WHITESPACE: /[\t ]+/,
		YAML: /---[\t ]*\r?\n(?:[\S\s]*?\r?\n)?---(?:\r?\n|(?!\S))/,
		DIRECTIVE: /[\t ]*%%{[\S\s]*?}%%(?:\r?\n|(?!\S))/,
		SINGLE_LINE_COMMENT: /[\t ]*%%[^\n\r]*/,
		REFERENCE: /\w([-\./\w]*[-\w])?/
	};
})(UC ||= {});
var WC;
((e) => {
	e.Terminals = {
		ACC_DESCR: /[\t ]*accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/,
		ACC_TITLE: /[\t ]*accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/,
		TITLE: /[\t ]*title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/,
		NEWLINE: /\r?\n/,
		WHITESPACE: /[\t ]+/,
		YAML: /---[\t ]*\r?\n(?:[\S\s]*?\r?\n)?---(?:\r?\n|(?!\S))/,
		DIRECTIVE: /[\t ]*%%{[\S\s]*?}%%(?:\r?\n|(?!\S))/,
		SINGLE_LINE_COMMENT: /[\t ]*%%[^\n\r]*/
	};
})(WC ||= {});
var GC;
((e) => {
	e.Terminals = {
		ACC_DESCR: /[\t ]*accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/,
		ACC_TITLE: /[\t ]*accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/,
		TITLE: /[\t ]*title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/,
		INT: /0|[1-9][0-9]*(?!\.)/,
		STRING: /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/,
		NEWLINE: /\r?\n/,
		WHITESPACE: /[\t ]+/,
		YAML: /---[\t ]*\r?\n(?:[\S\s]*?\r?\n)?---(?:\r?\n|(?!\S))/,
		DIRECTIVE: /[\t ]*%%{[\S\s]*?}%%(?:\r?\n|(?!\S))/,
		SINGLE_LINE_COMMENT: /[\t ]*%%[^\n\r]*/
	};
})(GC ||= {});
var KC;
((e) => {
	e.Terminals = {
		NUMBER_PIE: /(?:-?[0-9]+\.[0-9]+(?!\.))|(?:-?(0|[1-9][0-9]*)(?!\.))/,
		ACC_DESCR: /[\t ]*accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/,
		ACC_TITLE: /[\t ]*accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/,
		TITLE: /[\t ]*title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/,
		STRING: /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/,
		NEWLINE: /\r?\n/,
		WHITESPACE: /[\t ]+/,
		YAML: /---[\t ]*\r?\n(?:[\S\s]*?\r?\n)?---(?:\r?\n|(?!\S))/,
		DIRECTIVE: /[\t ]*%%{[\S\s]*?}%%(?:\r?\n|(?!\S))/,
		SINGLE_LINE_COMMENT: /[\t ]*%%[^\n\r]*/
	};
})(KC ||= {});
var qC;
((e) => {
	e.Terminals = {
		GRATICULE: /circle|polygon/,
		BOOLEAN: /true|false/,
		ACC_DESCR: /[\t ]*accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/,
		ACC_TITLE: /[\t ]*accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/,
		TITLE: /[\t ]*title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/,
		NUMBER: /(?:[0-9]+\.[0-9]+(?!\.))|(?:0|[1-9][0-9]*(?!\.))/,
		STRING: /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/,
		ID: /[\w]([-\w]*\w)?/,
		NEWLINE: /\r?\n/,
		WHITESPACE: /[\t ]+/,
		YAML: /---[\t ]*\r?\n(?:[\S\s]*?\r?\n)?---(?:\r?\n|(?!\S))/,
		DIRECTIVE: /[\t ]*%%{[\S\s]*?}%%(?:\r?\n|(?!\S))/,
		SINGLE_LINE_COMMENT: /[\t ]*%%[^\n\r]*/
	};
})(qC ||= {});
var JC;
((e) => {
	e.Terminals = {
		TITLE: /title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/,
		ACC_TITLE: /accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/,
		ACC_DESCR: /accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/,
		ABNF_RULENAME: /[A-Za-z][A-Za-z0-9-]*/,
		ABNF_STRING: /"[^"]*"/,
		ABNF_NUMVAL: /%[xXdDbB][0-9A-Fa-f]+(?:-[0-9A-Fa-f]+|\.[0-9A-Fa-f]+)*/,
		ABNF_REPEAT: /[0-9]*\*[0-9]*/,
		ABNF_EXACT_REPEAT: /[0-9]+/,
		ABNF_WHITESPACE: /[\t \r\n]+/,
		ABNF_YAML: /---[\t ]*\r?\n(?:[\S\s]*?\r?\n)?---(?:\r?\n|(?!\S))/,
		ABNF_DIRECTIVE: /[\t ]*%%{[\S\s]*?}%%(?:\r?\n|(?!\S))/,
		ABNF_SINGLE_LINE_COMMENT: /[\t ]*%%[^\n\r]*/,
		ABNF_COMMENT: /;[^\n\r]*/
	};
})(JC ||= {});
var YC;
((e) => {
	e.Terminals = {
		TITLE: /title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/,
		ACC_TITLE: /accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/,
		ACC_DESCR: /accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/,
		EBNF_ID: /[A-Z_a-z][\w-]*/,
		EBNF_STRING: /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/,
		EBNF_SPECIAL_SEQUENCE: /\?(?=[^?;]*[^?\s;][^?;]*\?)[^?;]*\?/,
		EBNF_WHITESPACE: /[\t \r\n]+/,
		EBNF_YAML: /---[\t ]*\r?\n(?:[\S\s]*?\r?\n)?---(?:\r?\n|(?!\S))/,
		EBNF_DIRECTIVE: /[\t ]*%%{[\S\s]*?}%%(?:\r?\n|(?!\S))/,
		EBNF_SINGLE_LINE_COMMENT: /[\t ]*%%[^\n\r]*/,
		EBNF_BLOCK_COMMENT: /\/\*[\s\S]*?\*\//,
		EBNF_ISO_COMMENT: /\(\*[\s\S]*?\*\)/
	};
})(YC ||= {});
var XC;
((e) => {
	e.Terminals = {
		TITLE: /title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/,
		ACC_TITLE: /accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/,
		ACC_DESCR: /accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/,
		RR_ID: /[A-Z_a-z][\w-]*/,
		RR_STRING: /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/,
		RR_WHITESPACE: /[\t \r\n]+/,
		RR_YAML: /---[\t ]*\r?\n(?:[\S\s]*?\r?\n)?---(?:\r?\n|(?!\S))/,
		RR_DIRECTIVE: /[\t ]*%%{[\S\s]*?}%%(?:\r?\n|(?!\S))/,
		RR_SINGLE_LINE_COMMENT: /[\t ]*%%[^\n\r]*/,
		RR_BLOCK_COMMENT: /\/\*[\s\S]*?\*\//
	};
})(XC ||= {});
var ZC;
((e) => {
	e.Terminals = {
		TITLE: /title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/,
		ACC_TITLE: /accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/,
		ACC_DESCR: /accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/,
		PEG_ID: /[A-Z_a-z][\w-]*/,
		PEG_STRING: /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/,
		PEG_WHITESPACE: /[\t \r\n]+/,
		PEG_YAML: /---[\t ]*\r?\n(?:[\S\s]*?\r?\n)?---(?:\r?\n|(?!\S))/,
		PEG_DIRECTIVE: /[\t ]*%%{[\S\s]*?}%%(?:\r?\n|(?!\S))/,
		PEG_SINGLE_LINE_COMMENT: /[\t ]*%%[^\n\r]*/,
		PEG_LINE_COMMENT: /#[^\n\r]*/
	};
})(ZC ||= {});
var QC;
((e) => {
	e.Terminals = {
		ACC_DESCR: /[\t ]*accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/,
		ACC_TITLE: /[\t ]*accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/,
		TITLE: /[\t ]*title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/,
		TREEMAP_KEYWORD: /treemap-beta|treemap/,
		CLASS_DEF: /classDef\s+([a-zA-Z_][a-zA-Z0-9_]+)(?:\s+([^;\r\n]*))?(?:;)?/,
		STYLE_SEPARATOR: /:::/,
		SEPARATOR: /:/,
		COMMA: /,/,
		INDENTATION: /[ \t]{1,}/,
		WS: /[ \t]+/,
		ML_COMMENT: /\%\%[^\n]*/,
		NL: /\r?\n/,
		ID2: /[a-zA-Z_][a-zA-Z0-9_]*/,
		NUMBER2: /[0-9_\.\,]+/,
		STRING2: /"[^"]*"|'[^']*'/
	};
})(QC ||= {});
var $C;
((e) => {
	e.Terminals = {
		ACC_DESCR: /[\t ]*accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/,
		ACC_TITLE: /[\t ]*accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/,
		TITLE: /[\t ]*title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/,
		CLASS_ANNOTATION: /[ \t]+:::[ \t]*[A-Za-z_][\w-]*/,
		ICON_ANNOTATION: /[ \t]+icon\([\w-]*(?::[\w-]+)?\)/,
		DESC_ANNOTATION: /[ \t]+##[^\n\r]*/,
		INDENTATION: /[ \t]{1,}/,
		QUOTED_NAME: /"[^"]*"|'[^']*'/,
		WS: /[ \t]+/,
		ML_COMMENT: /\%\%[^\n]*/,
		NL: /\r?\n/,
		BARE_NAME: /(?!:::|icon\(|##)[^ \t\n\r"'](?:(?![ \t]+:::[ \t]*[A-Za-z_]|[ \t]+icon\(|[ \t]+##)[^\n\r])*/
	};
})($C ||= {});
var ew;
((e) => {
	e.Terminals = {
		WARDLEY_NUMBER: /[0-9]+\.[0-9]+/,
		ARROW: /->/,
		LINK_PORT: /\+<>|\+>|\+</,
		LINK_ARROW: /-->|-\.->|>|\+'[^']*'<>|\+'[^']*'<|\+'[^']*'>/,
		LINK_LABEL: /;[^\n\r]+/,
		STRATEGY: /build|buy|outsource|market/,
		KW_WARDLEY: /wardley-beta/,
		KW_SIZE: /size/,
		KW_EVOLUTION: /evolution/,
		KW_ANCHOR: /anchor/,
		KW_COMPONENT: /component/,
		KW_LABEL: /label/,
		KW_INERTIA: /inertia/,
		KW_EVOLVE: /evolve/,
		KW_PIPELINE: /pipeline/,
		KW_NOTE: /note/,
		KW_ANNOTATIONS: /annotations/,
		KW_ANNOTATION: /annotation/,
		KW_ACCELERATOR: /accelerator/,
		KW_DEACCELERATOR: /deaccelerator/,
		NAME_WITH_SPACES: /(?!title\s|accTitle|accDescr)[A-Za-z](?:[A-Za-z0-9_()&]|-(?!>))*(?:[ \t]+[A-Za-z(](?:[A-Za-z0-9_()&]|-(?!>))*)*/,
		WS: /[ \t]+/,
		ACC_DESCR: /[\t ]*accDescr(?:[\t ]*:([^\n\r]*?(?=%%)|[^\n\r]*)|\s*{([^}]*)})/,
		ACC_TITLE: /[\t ]*accTitle[\t ]*:(?:[^\n\r]*?(?=%%)|[^\n\r]*)/,
		TITLE: /[\t ]*title(?:[\t ][^\n\r]*?(?=%%)|[\t ][^\n\r]*|)/,
		INT: /0|[1-9][0-9]*(?!\.)/,
		STRING: /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/,
		ID: /[\w]([-\w]*\w)?/,
		NEWLINE: /\r?\n/,
		WHITESPACE: /[\t ]+/,
		YAML: /---[\t ]*\r?\n(?:[\S\s]*?\r?\n)?---(?:\r?\n|(?!\S))/,
		DIRECTIVE: /[\t ]*%%{[\S\s]*?}%%(?:\r?\n|(?!\S))/,
		SINGLE_LINE_COMMENT: /[\t ]*%%[^\n\r]*/
	};
})(ew ||= {}), {
	...BC.Terminals,
	...VC.Terminals,
	...HC.Terminals,
	...UC.Terminals,
	...WC.Terminals,
	...GC.Terminals,
	...KC.Terminals,
	...qC.Terminals,
	...JC.Terminals,
	...YC.Terminals,
	...XC.Terminals,
	...ZC.Terminals,
	...$C.Terminals,
	...QC.Terminals,
	...ew.Terminals
};
var tw = {
	$type: "AbnfAlternation",
	alternatives: "alternatives"
}, nw = {
	$type: "AbnfConcatenation",
	elements: "elements"
}, rw = {
	$type: "AbnfElement",
	primary: "primary",
	repeat: "repeat"
}, iw = {
	$type: "AbnfGroup",
	element: "element"
}, aw = {
	$type: "AbnfNumVal",
	value: "value"
}, ow = {
	$type: "AbnfOptionalGroup",
	element: "element"
}, sw = { $type: "AbnfPrimary" }, cw = {
	$type: "AbnfRule",
	definition: "definition",
	name: "name"
}, lw = {
	$type: "AbnfRuleName",
	name: "name"
}, uw = {
	$type: "AbnfStringLiteral",
	value: "value"
}, dw = {
	$type: "Accelerator",
	name: "name",
	x: "x",
	y: "y"
}, fw = {
	$type: "Alignment",
	direction: "direction",
	members: "members"
}, pw = {
	$type: "Anchor",
	evolution: "evolution",
	name: "name",
	visibility: "visibility"
}, mw = {
	$type: "Annotation",
	number: "number",
	text: "text",
	x: "x",
	y: "y"
}, hw = {
	$type: "Annotations",
	x: "x",
	y: "y"
}, gw = {
	$type: "Architecture",
	accDescr: "accDescr",
	accTitle: "accTitle",
	alignments: "alignments",
	edges: "edges",
	groups: "groups",
	junctions: "junctions",
	services: "services",
	title: "title"
};
function _w(e) {
	return $.isInstance(e, gw.$type);
}
P(_w, "isArchitecture");
var vw = {
	$type: "Axis",
	label: "label",
	name: "name"
}, yw = {
	$type: "Branch",
	name: "name",
	order: "order"
};
function bw(e) {
	return $.isInstance(e, yw.$type);
}
P(bw, "isBranch");
var xw = {
	$type: "Checkout",
	branch: "branch"
}, Sw = {
	$type: "CherryPicking",
	id: "id",
	parent: "parent",
	tags: "tags"
}, Cw = {
	$type: "ClassDefStatement",
	className: "className",
	styleText: "styleText"
}, ww = {
	$type: "Commit",
	id: "id",
	message: "message",
	tags: "tags",
	type: "type"
};
function Tw(e) {
	return $.isInstance(e, ww.$type);
}
P(Tw, "isCommit");
var Ew = {
	$type: "Common",
	accDescr: "accDescr",
	accTitle: "accTitle",
	title: "title"
}, Dw = {
	$type: "Component",
	decorator: "decorator",
	evolution: "evolution",
	inertia: "inertia",
	label: "label",
	name: "name",
	visibility: "visibility"
}, Ow = {
	$type: "Curve",
	entries: "entries",
	label: "label",
	name: "name"
}, kw = {
	$type: "Cynefin",
	accDescr: "accDescr",
	accTitle: "accTitle",
	domains: "domains",
	title: "title",
	transitions: "transitions"
};
function Aw(e) {
	return $.isInstance(e, kw.$type);
}
P(Aw, "isCynefin");
var jw = {
	$type: "Deaccelerator",
	name: "name",
	x: "x",
	y: "y"
}, Mw = {
	$type: "Decorator",
	strategy: "strategy"
}, Nw = {
	$type: "Direction",
	accDescr: "accDescr",
	accTitle: "accTitle",
	dir: "dir",
	statements: "statements",
	title: "title"
}, Pw = {
	$type: "DomainBlock",
	domain: "domain",
	items: "items"
};
function Fw(e) {
	return $.isInstance(e, Pw.$type);
}
P(Fw, "isDomainBlock");
var Iw = {
	$type: "DomainItem",
	label: "label"
};
function Lw(e) {
	return $.isInstance(e, Iw.$type);
}
P(Lw, "isDomainItem");
var Rw = {
	$type: "EbnfChoice",
	alternatives: "alternatives"
}, zw = {
	$type: "EbnfExceptionPostfix",
	except: "except"
}, Bw = {
	$type: "EbnfGroup",
	element: "element"
}, Vw = {
	$type: "EbnfNonTerminal",
	name: "name"
}, Hw = {
	$type: "EbnfOneOrMorePostfix",
	operator: "operator"
}, Uw = {
	$type: "EbnfOptional",
	element: "element"
}, Ww = {
	$type: "EbnfOptionalPostfix",
	operator: "operator"
}, Gw = { $type: "EbnfPostfix" }, Kw = { $type: "EbnfPrimary" }, qw = {
	$type: "EbnfRepetition",
	element: "element"
}, Jw = {
	$type: "EbnfRule",
	definition: "definition",
	name: "name"
}, Yw = {
	$type: "EbnfSequence",
	elements: "elements"
}, Xw = {
	$type: "EbnfSpecial",
	text: "text"
}, Zw = {
	$type: "EbnfTerm",
	base: "base",
	postfixes: "postfixes"
}, Qw = {
	$type: "EbnfTerminal",
	value: "value"
}, $w = {
	$type: "EbnfZeroOrMorePostfix",
	operator: "operator"
}, eT = {
	$type: "Edge",
	lhsDir: "lhsDir",
	lhsGroup: "lhsGroup",
	lhsId: "lhsId",
	lhsInto: "lhsInto",
	rhsDir: "rhsDir",
	rhsGroup: "rhsGroup",
	rhsId: "rhsId",
	rhsInto: "rhsInto",
	title: "title"
}, tT = {
	$type: "EmDataEntity",
	dataBlockValue: "dataBlockValue",
	dataType: "dataType",
	name: "name"
}, nT = { $type: "EmFrame" }, rT = {
	$type: "EmGwt",
	givenStatements: "givenStatements",
	sourceFrame: "sourceFrame",
	thenStatements: "thenStatements",
	whenStatements: "whenStatements"
}, iT = {
	$type: "EmGwtStatement",
	entityIdentifier: "entityIdentifier"
}, aT = {
	$type: "EmModelEntity",
	name: "name"
};
function oT(e) {
	return e === "rmo" || e === "readmodel" || e === "ui" || e === "cmd" || e === "command" || e === "evt" || e === "event" || e === "pcr" || e === "processor";
}
P(oT, "isEmModelEntityType");
var sT = {
	$type: "EmNoteEntity",
	dataBlockValue: "dataBlockValue",
	dataType: "dataType",
	sourceFrame: "sourceFrame"
}, cT = {
	$type: "EmResetFrame",
	dataInlineValue: "dataInlineValue",
	dataReference: "dataReference",
	dataType: "dataType",
	entityIdentifier: "entityIdentifier",
	modelEntityType: "modelEntityType",
	name: "name",
	sourceFrames: "sourceFrames"
};
function lT(e) {
	return $.isInstance(e, cT.$type);
}
P(lT, "isEmResetFrame");
var uT = {
	$type: "EmTimeFrame",
	dataInlineValue: "dataInlineValue",
	dataReference: "dataReference",
	dataType: "dataType",
	entityIdentifier: "entityIdentifier",
	modelEntityType: "modelEntityType",
	name: "name",
	sourceFrames: "sourceFrames"
}, dT = {
	$type: "Entry",
	axis: "axis",
	value: "value"
}, fT = {
	$type: "EventModel",
	accDescr: "accDescr",
	accTitle: "accTitle",
	dataEntities: "dataEntities",
	frames: "frames",
	gwtEntities: "gwtEntities",
	modelEntities: "modelEntities",
	noteEntities: "noteEntities",
	title: "title"
}, pT = {
	$type: "Evolution",
	stages: "stages"
}, mT = {
	$type: "EvolutionStage",
	boundary: "boundary",
	name: "name",
	secondName: "secondName"
}, hT = {
	$type: "Evolve",
	component: "component",
	target: "target"
}, gT = {
	$type: "GitGraph",
	accDescr: "accDescr",
	accTitle: "accTitle",
	statements: "statements",
	title: "title"
};
function _T(e) {
	return $.isInstance(e, gT.$type);
}
P(_T, "isGitGraph");
var vT = {
	$type: "Group",
	icon: "icon",
	id: "id",
	in: "in",
	title: "title"
}, yT = {
	$type: "Info",
	accDescr: "accDescr",
	accTitle: "accTitle",
	title: "title"
};
function bT(e) {
	return $.isInstance(e, yT.$type);
}
P(bT, "isInfo");
var xT = {
	$type: "Item",
	classSelector: "classSelector",
	name: "name"
}, ST = {
	$type: "Junction",
	id: "id",
	in: "in"
}, CT = {
	$type: "Label",
	negX: "negX",
	negY: "negY",
	offsetX: "offsetX",
	offsetY: "offsetY"
}, wT = {
	$type: "Leaf",
	classSelector: "classSelector",
	name: "name",
	value: "value"
}, TT = {
	$type: "Link",
	arrow: "arrow",
	from: "from",
	fromPort: "fromPort",
	linkLabel: "linkLabel",
	to: "to",
	toPort: "toPort"
}, ET = {
	$type: "Merge",
	branch: "branch",
	id: "id",
	tags: "tags",
	type: "type"
};
function DT(e) {
	return $.isInstance(e, ET.$type);
}
P(DT, "isMerge");
var OT = {
	$type: "Note",
	evolution: "evolution",
	text: "text",
	visibility: "visibility"
}, kT = {
	$type: "Option",
	name: "name",
	value: "value"
}, AT = {
	$type: "Packet",
	accDescr: "accDescr",
	accTitle: "accTitle",
	blocks: "blocks",
	title: "title"
};
function jT(e) {
	return $.isInstance(e, AT.$type);
}
P(jT, "isPacket");
var MT = {
	$type: "PacketBlock",
	bits: "bits",
	end: "end",
	label: "label",
	start: "start"
};
function NT(e) {
	return $.isInstance(e, MT.$type);
}
P(NT, "isPacketBlock");
var PT = {
	$type: "PegAny",
	dot: "dot"
}, FT = {
	$type: "PegGroup",
	element: "element"
}, IT = {
	$type: "PegIdentifier",
	name: "name"
}, LT = {
	$type: "PegLiteral",
	value: "value"
}, RT = {
	$type: "PegOrderedChoice",
	alternatives: "alternatives"
}, zT = {
	$type: "PegPrefix",
	operator: "operator",
	suffix: "suffix"
}, BT = { $type: "PegPrimary" }, VT = {
	$type: "PegRule",
	definition: "definition",
	name: "name"
}, HT = {
	$type: "PegSequence",
	elements: "elements"
}, UT = {
	$type: "PegSuffix",
	operator: "operator",
	primary: "primary"
}, WT = {
	$type: "Pie",
	accDescr: "accDescr",
	accTitle: "accTitle",
	sections: "sections",
	showData: "showData",
	title: "title"
};
function GT(e) {
	return $.isInstance(e, WT.$type);
}
P(GT, "isPie");
var KT = {
	$type: "PieSection",
	label: "label",
	value: "value"
};
function qT(e) {
	return $.isInstance(e, KT.$type);
}
P(qT, "isPieSection");
var JT = {
	$type: "Pipeline",
	components: "components",
	parent: "parent"
}, YT = {
	$type: "PipelineComponent",
	evolution: "evolution",
	label: "label",
	name: "name"
}, XT = {
	$type: "Radar",
	accDescr: "accDescr",
	accTitle: "accTitle",
	axes: "axes",
	curves: "curves",
	options: "options",
	title: "title"
}, ZT = {
	$type: "Railroad",
	accDescr: "accDescr",
	accTitle: "accTitle",
	rules: "rules",
	title: "title"
};
function QT(e) {
	return $.isInstance(e, ZT.$type);
}
P(QT, "isRailroad");
var $T = {
	$type: "RailroadAbnf",
	accDescr: "accDescr",
	accTitle: "accTitle",
	rules: "rules",
	title: "title"
};
function eE(e) {
	return $.isInstance(e, $T.$type);
}
P(eE, "isRailroadAbnf");
var tE = {
	$type: "RailroadChoiceExpr",
	alternatives: "alternatives"
}, nE = {
	$type: "RailroadEbnf",
	accDescr: "accDescr",
	accTitle: "accTitle",
	rules: "rules",
	title: "title"
};
function rE(e) {
	return $.isInstance(e, nE.$type);
}
P(rE, "isRailroadEbnf");
var iE = { $type: "RailroadExpression" }, aE = {
	$type: "RailroadNonTerminalExpr",
	name: "name"
}, oE = {
	$type: "RailroadOneOrMoreExpr",
	element: "element"
}, sE = {
	$type: "RailroadOptionalExpr",
	element: "element"
}, cE = {
	$type: "RailroadPeg",
	accDescr: "accDescr",
	accTitle: "accTitle",
	rules: "rules",
	title: "title"
};
function lE(e) {
	return $.isInstance(e, cE.$type);
}
P(lE, "isRailroadPeg");
var uE = {
	$type: "RailroadRule",
	definition: "definition",
	name: "name"
}, dE = {
	$type: "RailroadSequenceExpr",
	elements: "elements"
}, fE = {
	$type: "RailroadSpecialExpr",
	text: "text"
}, pE = {
	$type: "RailroadTerminalExpr",
	value: "value"
}, mE = {
	$type: "RailroadZeroOrMoreExpr",
	element: "element"
}, hE = {
	$type: "Section",
	classSelector: "classSelector",
	name: "name"
}, gE = {
	$type: "Service",
	icon: "icon",
	iconText: "iconText",
	id: "id",
	in: "in",
	title: "title"
}, _E = {
	$type: "Size",
	height: "height",
	width: "width"
}, vE = { $type: "Statement" }, yE = {
	$type: "Transition",
	from: "from",
	label: "label",
	to: "to"
};
function bE(e) {
	return $.isInstance(e, yE.$type);
}
P(bE, "isTransition");
var xE = {
	$type: "Treemap",
	accDescr: "accDescr",
	accTitle: "accTitle",
	title: "title",
	TreemapRows: "TreemapRows"
};
function SE(e) {
	return $.isInstance(e, xE.$type);
}
P(SE, "isTreemap");
var CE = {
	$type: "TreemapRow",
	indent: "indent",
	item: "item"
}, wE = {
	$type: "TreeNode",
	classAnnotation: "classAnnotation",
	descAnnotation: "descAnnotation",
	iconAnnotation: "iconAnnotation",
	indent: "indent",
	name: "name"
}, TE = {
	$type: "TreeView",
	accDescr: "accDescr",
	accTitle: "accTitle",
	nodes: "nodes",
	title: "title"
}, EE = {
	$type: "Wardley",
	accDescr: "accDescr",
	accelerators: "accelerators",
	accTitle: "accTitle",
	anchors: "anchors",
	annotation: "annotation",
	annotations: "annotations",
	components: "components",
	deaccelerators: "deaccelerators",
	evolution: "evolution",
	evolves: "evolves",
	links: "links",
	notes: "notes",
	pipelines: "pipelines",
	size: "size",
	title: "title"
};
function DE(e) {
	return $.isInstance(e, EE.$type);
}
P(DE, "isWardley");
var OE = (It = class extends Ei {
	constructor() {
		super(...arguments), this.types = {
			AbnfAlternation: {
				name: tw.$type,
				properties: { alternatives: {
					name: tw.alternatives,
					defaultValue: []
				} },
				superTypes: []
			},
			AbnfConcatenation: {
				name: nw.$type,
				properties: { elements: {
					name: nw.elements,
					defaultValue: []
				} },
				superTypes: []
			},
			AbnfElement: {
				name: rw.$type,
				properties: {
					primary: { name: rw.primary },
					repeat: {
						name: rw.repeat,
						optional: !0
					}
				},
				superTypes: []
			},
			AbnfGroup: {
				name: iw.$type,
				properties: { element: { name: iw.element } },
				superTypes: [sw.$type]
			},
			AbnfNumVal: {
				name: aw.$type,
				properties: { value: { name: aw.value } },
				superTypes: [sw.$type]
			},
			AbnfOptionalGroup: {
				name: ow.$type,
				properties: { element: { name: ow.element } },
				superTypes: [sw.$type]
			},
			AbnfPrimary: {
				name: sw.$type,
				properties: {},
				superTypes: []
			},
			AbnfRule: {
				name: cw.$type,
				properties: {
					definition: { name: cw.definition },
					name: { name: cw.name }
				},
				superTypes: []
			},
			AbnfRuleName: {
				name: lw.$type,
				properties: { name: { name: lw.name } },
				superTypes: [sw.$type]
			},
			AbnfStringLiteral: {
				name: uw.$type,
				properties: { value: { name: uw.value } },
				superTypes: [sw.$type]
			},
			Accelerator: {
				name: dw.$type,
				properties: {
					name: { name: dw.name },
					x: { name: dw.x },
					y: { name: dw.y }
				},
				superTypes: []
			},
			Alignment: {
				name: fw.$type,
				properties: {
					direction: { name: fw.direction },
					members: {
						name: fw.members,
						defaultValue: []
					}
				},
				superTypes: []
			},
			Anchor: {
				name: pw.$type,
				properties: {
					evolution: { name: pw.evolution },
					name: { name: pw.name },
					visibility: { name: pw.visibility }
				},
				superTypes: []
			},
			Annotation: {
				name: mw.$type,
				properties: {
					number: { name: mw.number },
					text: { name: mw.text },
					x: { name: mw.x },
					y: { name: mw.y }
				},
				superTypes: []
			},
			Annotations: {
				name: hw.$type,
				properties: {
					x: { name: hw.x },
					y: { name: hw.y }
				},
				superTypes: []
			},
			Architecture: {
				name: gw.$type,
				properties: {
					accDescr: {
						name: gw.accDescr,
						optional: !0
					},
					accTitle: {
						name: gw.accTitle,
						optional: !0
					},
					alignments: {
						name: gw.alignments,
						defaultValue: [],
						optional: !0
					},
					edges: {
						name: gw.edges,
						defaultValue: [],
						optional: !0
					},
					groups: {
						name: gw.groups,
						defaultValue: [],
						optional: !0
					},
					junctions: {
						name: gw.junctions,
						defaultValue: [],
						optional: !0
					},
					services: {
						name: gw.services,
						defaultValue: [],
						optional: !0
					},
					title: {
						name: gw.title,
						optional: !0
					}
				},
				superTypes: []
			},
			Axis: {
				name: vw.$type,
				properties: {
					label: {
						name: vw.label,
						optional: !0
					},
					name: { name: vw.name }
				},
				superTypes: []
			},
			Branch: {
				name: yw.$type,
				properties: {
					name: { name: yw.name },
					order: { name: yw.order }
				},
				superTypes: [vE.$type]
			},
			Checkout: {
				name: xw.$type,
				properties: { branch: { name: xw.branch } },
				superTypes: [vE.$type]
			},
			CherryPicking: {
				name: Sw.$type,
				properties: {
					id: { name: Sw.id },
					parent: { name: Sw.parent },
					tags: {
						name: Sw.tags,
						defaultValue: []
					}
				},
				superTypes: [vE.$type]
			},
			ClassDefStatement: {
				name: Cw.$type,
				properties: {
					className: { name: Cw.className },
					styleText: { name: Cw.styleText }
				},
				superTypes: []
			},
			Commit: {
				name: ww.$type,
				properties: {
					id: { name: ww.id },
					message: { name: ww.message },
					tags: {
						name: ww.tags,
						defaultValue: []
					},
					type: { name: ww.type }
				},
				superTypes: [vE.$type]
			},
			Common: {
				name: Ew.$type,
				properties: {
					accDescr: {
						name: Ew.accDescr,
						optional: !0
					},
					accTitle: {
						name: Ew.accTitle,
						optional: !0
					},
					title: {
						name: Ew.title,
						optional: !0
					}
				},
				superTypes: []
			},
			Component: {
				name: Dw.$type,
				properties: {
					decorator: {
						name: Dw.decorator,
						optional: !0
					},
					evolution: { name: Dw.evolution },
					inertia: {
						name: Dw.inertia,
						defaultValue: !1
					},
					label: {
						name: Dw.label,
						optional: !0
					},
					name: { name: Dw.name },
					visibility: { name: Dw.visibility }
				},
				superTypes: []
			},
			Curve: {
				name: Ow.$type,
				properties: {
					entries: {
						name: Ow.entries,
						defaultValue: []
					},
					label: {
						name: Ow.label,
						optional: !0
					},
					name: { name: Ow.name }
				},
				superTypes: []
			},
			Cynefin: {
				name: kw.$type,
				properties: {
					accDescr: {
						name: kw.accDescr,
						optional: !0
					},
					accTitle: {
						name: kw.accTitle,
						optional: !0
					},
					domains: {
						name: kw.domains,
						defaultValue: [],
						optional: !0
					},
					title: {
						name: kw.title,
						optional: !0
					},
					transitions: {
						name: kw.transitions,
						defaultValue: [],
						optional: !0
					}
				},
				superTypes: []
			},
			Deaccelerator: {
				name: jw.$type,
				properties: {
					name: { name: jw.name },
					x: { name: jw.x },
					y: { name: jw.y }
				},
				superTypes: []
			},
			Decorator: {
				name: Mw.$type,
				properties: { strategy: { name: Mw.strategy } },
				superTypes: []
			},
			Direction: {
				name: Nw.$type,
				properties: {
					accDescr: { name: Nw.accDescr },
					accTitle: { name: Nw.accTitle },
					dir: { name: Nw.dir },
					statements: {
						name: Nw.statements,
						defaultValue: []
					},
					title: { name: Nw.title }
				},
				superTypes: [gT.$type]
			},
			DomainBlock: {
				name: Pw.$type,
				properties: {
					domain: { name: Pw.domain },
					items: {
						name: Pw.items,
						defaultValue: [],
						optional: !0
					}
				},
				superTypes: []
			},
			DomainItem: {
				name: Iw.$type,
				properties: { label: { name: Iw.label } },
				superTypes: []
			},
			EbnfChoice: {
				name: Rw.$type,
				properties: { alternatives: {
					name: Rw.alternatives,
					defaultValue: []
				} },
				superTypes: []
			},
			EbnfExceptionPostfix: {
				name: zw.$type,
				properties: { except: { name: zw.except } },
				superTypes: [Gw.$type]
			},
			EbnfGroup: {
				name: Bw.$type,
				properties: { element: { name: Bw.element } },
				superTypes: [Kw.$type]
			},
			EbnfNonTerminal: {
				name: Vw.$type,
				properties: { name: { name: Vw.name } },
				superTypes: [Kw.$type]
			},
			EbnfOneOrMorePostfix: {
				name: Hw.$type,
				properties: { operator: { name: Hw.operator } },
				superTypes: [Gw.$type]
			},
			EbnfOptional: {
				name: Uw.$type,
				properties: { element: { name: Uw.element } },
				superTypes: [Kw.$type]
			},
			EbnfOptionalPostfix: {
				name: Ww.$type,
				properties: { operator: { name: Ww.operator } },
				superTypes: [Gw.$type]
			},
			EbnfPostfix: {
				name: Gw.$type,
				properties: {},
				superTypes: []
			},
			EbnfPrimary: {
				name: Kw.$type,
				properties: {},
				superTypes: []
			},
			EbnfRepetition: {
				name: qw.$type,
				properties: { element: { name: qw.element } },
				superTypes: [Kw.$type]
			},
			EbnfRule: {
				name: Jw.$type,
				properties: {
					definition: { name: Jw.definition },
					name: { name: Jw.name }
				},
				superTypes: []
			},
			EbnfSequence: {
				name: Yw.$type,
				properties: { elements: {
					name: Yw.elements,
					defaultValue: []
				} },
				superTypes: []
			},
			EbnfSpecial: {
				name: Xw.$type,
				properties: { text: { name: Xw.text } },
				superTypes: [Kw.$type]
			},
			EbnfTerm: {
				name: Zw.$type,
				properties: {
					base: { name: Zw.base },
					postfixes: {
						name: Zw.postfixes,
						defaultValue: []
					}
				},
				superTypes: []
			},
			EbnfTerminal: {
				name: Qw.$type,
				properties: { value: { name: Qw.value } },
				superTypes: [Kw.$type]
			},
			EbnfZeroOrMorePostfix: {
				name: $w.$type,
				properties: { operator: { name: $w.operator } },
				superTypes: [Gw.$type]
			},
			Edge: {
				name: eT.$type,
				properties: {
					lhsDir: { name: eT.lhsDir },
					lhsGroup: {
						name: eT.lhsGroup,
						defaultValue: !1,
						optional: !0
					},
					lhsId: { name: eT.lhsId },
					lhsInto: {
						name: eT.lhsInto,
						defaultValue: !1,
						optional: !0
					},
					rhsDir: { name: eT.rhsDir },
					rhsGroup: {
						name: eT.rhsGroup,
						defaultValue: !1,
						optional: !0
					},
					rhsId: { name: eT.rhsId },
					rhsInto: {
						name: eT.rhsInto,
						defaultValue: !1,
						optional: !0
					},
					title: {
						name: eT.title,
						optional: !0
					}
				},
				superTypes: []
			},
			EmDataEntity: {
				name: tT.$type,
				properties: {
					dataBlockValue: { name: tT.dataBlockValue },
					dataType: {
						name: tT.dataType,
						optional: !0
					},
					name: { name: tT.name }
				},
				superTypes: []
			},
			EmFrame: {
				name: nT.$type,
				properties: {},
				superTypes: []
			},
			EmGwt: {
				name: rT.$type,
				properties: {
					givenStatements: {
						name: rT.givenStatements,
						defaultValue: []
					},
					sourceFrame: {
						name: rT.sourceFrame,
						referenceType: nT.$type
					},
					thenStatements: {
						name: rT.thenStatements,
						defaultValue: []
					},
					whenStatements: {
						name: rT.whenStatements,
						defaultValue: [],
						optional: !0
					}
				},
				superTypes: []
			},
			EmGwtStatement: {
				name: iT.$type,
				properties: { entityIdentifier: {
					name: iT.entityIdentifier,
					referenceType: aT.$type
				} },
				superTypes: []
			},
			EmModelEntity: {
				name: aT.$type,
				properties: { name: { name: aT.name } },
				superTypes: []
			},
			EmNoteEntity: {
				name: sT.$type,
				properties: {
					dataBlockValue: { name: sT.dataBlockValue },
					dataType: {
						name: sT.dataType,
						optional: !0
					},
					sourceFrame: {
						name: sT.sourceFrame,
						referenceType: nT.$type
					}
				},
				superTypes: []
			},
			EmResetFrame: {
				name: cT.$type,
				properties: {
					dataInlineValue: {
						name: cT.dataInlineValue,
						optional: !0
					},
					dataReference: {
						name: cT.dataReference,
						referenceType: tT.$type,
						optional: !0
					},
					dataType: {
						name: cT.dataType,
						optional: !0
					},
					entityIdentifier: { name: cT.entityIdentifier },
					modelEntityType: { name: cT.modelEntityType },
					name: { name: cT.name },
					sourceFrames: {
						name: cT.sourceFrames,
						defaultValue: [],
						referenceType: nT.$type,
						optional: !0
					}
				},
				superTypes: [nT.$type]
			},
			EmTimeFrame: {
				name: uT.$type,
				properties: {
					dataInlineValue: {
						name: uT.dataInlineValue,
						optional: !0
					},
					dataReference: {
						name: uT.dataReference,
						referenceType: tT.$type,
						optional: !0
					},
					dataType: {
						name: uT.dataType,
						optional: !0
					},
					entityIdentifier: { name: uT.entityIdentifier },
					modelEntityType: { name: uT.modelEntityType },
					name: { name: uT.name },
					sourceFrames: {
						name: uT.sourceFrames,
						defaultValue: [],
						referenceType: nT.$type,
						optional: !0
					}
				},
				superTypes: [nT.$type]
			},
			Entry: {
				name: dT.$type,
				properties: {
					axis: {
						name: dT.axis,
						referenceType: vw.$type,
						optional: !0
					},
					value: { name: dT.value }
				},
				superTypes: []
			},
			EventModel: {
				name: fT.$type,
				properties: {
					accDescr: {
						name: fT.accDescr,
						optional: !0
					},
					accTitle: {
						name: fT.accTitle,
						optional: !0
					},
					dataEntities: {
						name: fT.dataEntities,
						defaultValue: [],
						optional: !0
					},
					frames: {
						name: fT.frames,
						defaultValue: [],
						optional: !0
					},
					gwtEntities: {
						name: fT.gwtEntities,
						defaultValue: [],
						optional: !0
					},
					modelEntities: {
						name: fT.modelEntities,
						defaultValue: [],
						optional: !0
					},
					noteEntities: {
						name: fT.noteEntities,
						defaultValue: [],
						optional: !0
					},
					title: {
						name: fT.title,
						optional: !0
					}
				},
				superTypes: []
			},
			Evolution: {
				name: pT.$type,
				properties: { stages: {
					name: pT.stages,
					defaultValue: []
				} },
				superTypes: []
			},
			EvolutionStage: {
				name: mT.$type,
				properties: {
					boundary: {
						name: mT.boundary,
						optional: !0
					},
					name: { name: mT.name },
					secondName: {
						name: mT.secondName,
						optional: !0
					}
				},
				superTypes: []
			},
			Evolve: {
				name: hT.$type,
				properties: {
					component: { name: hT.component },
					target: { name: hT.target }
				},
				superTypes: []
			},
			GitGraph: {
				name: gT.$type,
				properties: {
					accDescr: { name: gT.accDescr },
					accTitle: { name: gT.accTitle },
					statements: {
						name: gT.statements,
						defaultValue: []
					},
					title: { name: gT.title }
				},
				superTypes: []
			},
			Group: {
				name: vT.$type,
				properties: {
					icon: {
						name: vT.icon,
						optional: !0
					},
					id: { name: vT.id },
					in: { name: vT.in },
					title: {
						name: vT.title,
						optional: !0
					}
				},
				superTypes: []
			},
			Info: {
				name: yT.$type,
				properties: {
					accDescr: {
						name: yT.accDescr,
						optional: !0
					},
					accTitle: {
						name: yT.accTitle,
						optional: !0
					},
					title: {
						name: yT.title,
						optional: !0
					}
				},
				superTypes: []
			},
			Item: {
				name: xT.$type,
				properties: {
					classSelector: {
						name: xT.classSelector,
						optional: !0
					},
					name: { name: xT.name }
				},
				superTypes: []
			},
			Junction: {
				name: ST.$type,
				properties: {
					id: { name: ST.id },
					in: { name: ST.in }
				},
				superTypes: []
			},
			Label: {
				name: CT.$type,
				properties: {
					negX: {
						name: CT.negX,
						defaultValue: !1,
						optional: !0
					},
					negY: {
						name: CT.negY,
						defaultValue: !1,
						optional: !0
					},
					offsetX: { name: CT.offsetX },
					offsetY: { name: CT.offsetY }
				},
				superTypes: []
			},
			Leaf: {
				name: wT.$type,
				properties: {
					classSelector: {
						name: wT.classSelector,
						optional: !0
					},
					name: { name: wT.name },
					value: { name: wT.value }
				},
				superTypes: [xT.$type]
			},
			Link: {
				name: TT.$type,
				properties: {
					arrow: {
						name: TT.arrow,
						optional: !0
					},
					from: { name: TT.from },
					fromPort: {
						name: TT.fromPort,
						optional: !0
					},
					linkLabel: {
						name: TT.linkLabel,
						optional: !0
					},
					to: { name: TT.to },
					toPort: {
						name: TT.toPort,
						optional: !0
					}
				},
				superTypes: []
			},
			Merge: {
				name: ET.$type,
				properties: {
					branch: { name: ET.branch },
					id: { name: ET.id },
					tags: {
						name: ET.tags,
						defaultValue: []
					},
					type: { name: ET.type }
				},
				superTypes: [vE.$type]
			},
			Note: {
				name: OT.$type,
				properties: {
					evolution: { name: OT.evolution },
					text: { name: OT.text },
					visibility: { name: OT.visibility }
				},
				superTypes: []
			},
			Option: {
				name: kT.$type,
				properties: {
					name: { name: kT.name },
					value: {
						name: kT.value,
						defaultValue: !1
					}
				},
				superTypes: []
			},
			Packet: {
				name: AT.$type,
				properties: {
					accDescr: {
						name: AT.accDescr,
						optional: !0
					},
					accTitle: {
						name: AT.accTitle,
						optional: !0
					},
					blocks: {
						name: AT.blocks,
						defaultValue: [],
						optional: !0
					},
					title: {
						name: AT.title,
						optional: !0
					}
				},
				superTypes: []
			},
			PacketBlock: {
				name: MT.$type,
				properties: {
					bits: { name: MT.bits },
					end: {
						name: MT.end,
						optional: !0
					},
					label: { name: MT.label },
					start: { name: MT.start }
				},
				superTypes: []
			},
			PegAny: {
				name: PT.$type,
				properties: { dot: { name: PT.dot } },
				superTypes: [BT.$type]
			},
			PegGroup: {
				name: FT.$type,
				properties: { element: { name: FT.element } },
				superTypes: [BT.$type]
			},
			PegIdentifier: {
				name: IT.$type,
				properties: { name: { name: IT.name } },
				superTypes: [BT.$type]
			},
			PegLiteral: {
				name: LT.$type,
				properties: { value: { name: LT.value } },
				superTypes: [BT.$type]
			},
			PegOrderedChoice: {
				name: RT.$type,
				properties: { alternatives: {
					name: RT.alternatives,
					defaultValue: []
				} },
				superTypes: []
			},
			PegPrefix: {
				name: zT.$type,
				properties: {
					operator: {
						name: zT.operator,
						optional: !0
					},
					suffix: { name: zT.suffix }
				},
				superTypes: []
			},
			PegPrimary: {
				name: BT.$type,
				properties: {},
				superTypes: []
			},
			PegRule: {
				name: VT.$type,
				properties: {
					definition: { name: VT.definition },
					name: { name: VT.name }
				},
				superTypes: []
			},
			PegSequence: {
				name: HT.$type,
				properties: { elements: {
					name: HT.elements,
					defaultValue: []
				} },
				superTypes: []
			},
			PegSuffix: {
				name: UT.$type,
				properties: {
					operator: {
						name: UT.operator,
						optional: !0
					},
					primary: { name: UT.primary }
				},
				superTypes: []
			},
			Pie: {
				name: WT.$type,
				properties: {
					accDescr: {
						name: WT.accDescr,
						optional: !0
					},
					accTitle: {
						name: WT.accTitle,
						optional: !0
					},
					sections: {
						name: WT.sections,
						defaultValue: [],
						optional: !0
					},
					showData: {
						name: WT.showData,
						defaultValue: !1,
						optional: !0
					},
					title: {
						name: WT.title,
						optional: !0
					}
				},
				superTypes: []
			},
			PieSection: {
				name: KT.$type,
				properties: {
					label: { name: KT.label },
					value: { name: KT.value }
				},
				superTypes: []
			},
			Pipeline: {
				name: JT.$type,
				properties: {
					components: {
						name: JT.components,
						defaultValue: []
					},
					parent: { name: JT.parent }
				},
				superTypes: []
			},
			PipelineComponent: {
				name: YT.$type,
				properties: {
					evolution: { name: YT.evolution },
					label: {
						name: YT.label,
						optional: !0
					},
					name: { name: YT.name }
				},
				superTypes: []
			},
			Radar: {
				name: XT.$type,
				properties: {
					accDescr: {
						name: XT.accDescr,
						optional: !0
					},
					accTitle: {
						name: XT.accTitle,
						optional: !0
					},
					axes: {
						name: XT.axes,
						defaultValue: [],
						optional: !0
					},
					curves: {
						name: XT.curves,
						defaultValue: [],
						optional: !0
					},
					options: {
						name: XT.options,
						defaultValue: [],
						optional: !0
					},
					title: {
						name: XT.title,
						optional: !0
					}
				},
				superTypes: []
			},
			Railroad: {
				name: ZT.$type,
				properties: {
					accDescr: {
						name: ZT.accDescr,
						optional: !0
					},
					accTitle: {
						name: ZT.accTitle,
						optional: !0
					},
					rules: {
						name: ZT.rules,
						defaultValue: []
					},
					title: {
						name: ZT.title,
						optional: !0
					}
				},
				superTypes: []
			},
			RailroadAbnf: {
				name: $T.$type,
				properties: {
					accDescr: {
						name: $T.accDescr,
						optional: !0
					},
					accTitle: {
						name: $T.accTitle,
						optional: !0
					},
					rules: {
						name: $T.rules,
						defaultValue: []
					},
					title: {
						name: $T.title,
						optional: !0
					}
				},
				superTypes: []
			},
			RailroadChoiceExpr: {
				name: tE.$type,
				properties: { alternatives: {
					name: tE.alternatives,
					defaultValue: []
				} },
				superTypes: [iE.$type]
			},
			RailroadEbnf: {
				name: nE.$type,
				properties: {
					accDescr: {
						name: nE.accDescr,
						optional: !0
					},
					accTitle: {
						name: nE.accTitle,
						optional: !0
					},
					rules: {
						name: nE.rules,
						defaultValue: []
					},
					title: {
						name: nE.title,
						optional: !0
					}
				},
				superTypes: []
			},
			RailroadExpression: {
				name: iE.$type,
				properties: {},
				superTypes: []
			},
			RailroadNonTerminalExpr: {
				name: aE.$type,
				properties: { name: { name: aE.name } },
				superTypes: [iE.$type]
			},
			RailroadOneOrMoreExpr: {
				name: oE.$type,
				properties: { element: { name: oE.element } },
				superTypes: [iE.$type]
			},
			RailroadOptionalExpr: {
				name: sE.$type,
				properties: { element: { name: sE.element } },
				superTypes: [iE.$type]
			},
			RailroadPeg: {
				name: cE.$type,
				properties: {
					accDescr: {
						name: cE.accDescr,
						optional: !0
					},
					accTitle: {
						name: cE.accTitle,
						optional: !0
					},
					rules: {
						name: cE.rules,
						defaultValue: []
					},
					title: {
						name: cE.title,
						optional: !0
					}
				},
				superTypes: []
			},
			RailroadRule: {
				name: uE.$type,
				properties: {
					definition: { name: uE.definition },
					name: { name: uE.name }
				},
				superTypes: []
			},
			RailroadSequenceExpr: {
				name: dE.$type,
				properties: { elements: {
					name: dE.elements,
					defaultValue: []
				} },
				superTypes: [iE.$type]
			},
			RailroadSpecialExpr: {
				name: fE.$type,
				properties: { text: { name: fE.text } },
				superTypes: [iE.$type]
			},
			RailroadTerminalExpr: {
				name: pE.$type,
				properties: { value: { name: pE.value } },
				superTypes: [iE.$type]
			},
			RailroadZeroOrMoreExpr: {
				name: mE.$type,
				properties: { element: { name: mE.element } },
				superTypes: [iE.$type]
			},
			Section: {
				name: hE.$type,
				properties: {
					classSelector: {
						name: hE.classSelector,
						optional: !0
					},
					name: { name: hE.name }
				},
				superTypes: [xT.$type]
			},
			Service: {
				name: gE.$type,
				properties: {
					icon: {
						name: gE.icon,
						optional: !0
					},
					iconText: {
						name: gE.iconText,
						optional: !0
					},
					id: { name: gE.id },
					in: { name: gE.in },
					title: {
						name: gE.title,
						optional: !0
					}
				},
				superTypes: []
			},
			Size: {
				name: _E.$type,
				properties: {
					height: { name: _E.height },
					width: { name: _E.width }
				},
				superTypes: []
			},
			Statement: {
				name: vE.$type,
				properties: {},
				superTypes: []
			},
			Transition: {
				name: yE.$type,
				properties: {
					from: { name: yE.from },
					label: { name: yE.label },
					to: { name: yE.to }
				},
				superTypes: []
			},
			TreeNode: {
				name: wE.$type,
				properties: {
					classAnnotation: {
						name: wE.classAnnotation,
						optional: !0
					},
					descAnnotation: {
						name: wE.descAnnotation,
						optional: !0
					},
					iconAnnotation: {
						name: wE.iconAnnotation,
						optional: !0
					},
					indent: {
						name: wE.indent,
						optional: !0
					},
					name: { name: wE.name }
				},
				superTypes: []
			},
			TreeView: {
				name: TE.$type,
				properties: {
					accDescr: {
						name: TE.accDescr,
						optional: !0
					},
					accTitle: {
						name: TE.accTitle,
						optional: !0
					},
					nodes: {
						name: TE.nodes,
						defaultValue: []
					},
					title: {
						name: TE.title,
						optional: !0
					}
				},
				superTypes: []
			},
			Treemap: {
				name: xE.$type,
				properties: {
					accDescr: {
						name: xE.accDescr,
						optional: !0
					},
					accTitle: {
						name: xE.accTitle,
						optional: !0
					},
					title: {
						name: xE.title,
						optional: !0
					},
					TreemapRows: {
						name: xE.TreemapRows,
						defaultValue: []
					}
				},
				superTypes: []
			},
			TreemapRow: {
				name: CE.$type,
				properties: {
					indent: {
						name: CE.indent,
						optional: !0
					},
					item: { name: CE.item }
				},
				superTypes: []
			},
			Wardley: {
				name: EE.$type,
				properties: {
					accDescr: {
						name: EE.accDescr,
						optional: !0
					},
					accelerators: {
						name: EE.accelerators,
						defaultValue: [],
						optional: !0
					},
					accTitle: {
						name: EE.accTitle,
						optional: !0
					},
					anchors: {
						name: EE.anchors,
						defaultValue: [],
						optional: !0
					},
					annotation: {
						name: EE.annotation,
						defaultValue: [],
						optional: !0
					},
					annotations: {
						name: EE.annotations,
						defaultValue: [],
						optional: !0
					},
					components: {
						name: EE.components,
						defaultValue: [],
						optional: !0
					},
					deaccelerators: {
						name: EE.deaccelerators,
						defaultValue: [],
						optional: !0
					},
					evolution: {
						name: EE.evolution,
						optional: !0
					},
					evolves: {
						name: EE.evolves,
						defaultValue: [],
						optional: !0
					},
					links: {
						name: EE.links,
						defaultValue: [],
						optional: !0
					},
					notes: {
						name: EE.notes,
						defaultValue: [],
						optional: !0
					},
					pipelines: {
						name: EE.pipelines,
						defaultValue: [],
						optional: !0
					},
					size: {
						name: EE.size,
						optional: !0
					},
					title: {
						name: EE.title,
						optional: !0
					}
				},
				superTypes: []
			}
		};
	}
}, P(It, "MermaidAstReflection"), It), $ = new OE(), kE, AE = /* @__PURE__ */ P(() => kE ??= zC("{\"$type\":\"Grammar\",\"isDeclared\":true,\"name\":\"ArchitectureGrammar\",\"imports\":[],\"rules\":[{\"$type\":\"ParserRule\",\"entry\":true,\"name\":\"Architecture\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@24\"},\"arguments\":[],\"cardinality\":\"*\"},{\"$type\":\"Keyword\",\"value\":\"architecture-beta\"},{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@24\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@14\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@1\"},\"arguments\":[]}],\"cardinality\":\"*\"}]},\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"fragment\":true,\"name\":\"Statement\",\"definition\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"groups\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@5\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"services\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@6\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"junctions\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@7\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"edges\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@8\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"alignments\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@9\"},\"arguments\":[]}}]},\"entry\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"fragment\":true,\"name\":\"LeftPort\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\":\"},{\"$type\":\"Assignment\",\"feature\":\"lhsDir\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@10\"},\"arguments\":[]}}]},\"entry\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"fragment\":true,\"name\":\"RightPort\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"rhsDir\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@10\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\":\"}]},\"entry\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"fragment\":true,\"name\":\"Arrow\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@2\"},\"arguments\":[]},{\"$type\":\"Assignment\",\"feature\":\"lhsInto\",\"operator\":\"?=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@12\"},\"arguments\":[]},\"cardinality\":\"?\"},{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"--\"},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"-\"},{\"$type\":\"Assignment\",\"feature\":\"title\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@30\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\"-\"}]}]},{\"$type\":\"Assignment\",\"feature\":\"rhsInto\",\"operator\":\"?=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@12\"},\"arguments\":[]},\"cardinality\":\"?\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@3\"},\"arguments\":[]}]},\"entry\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"Group\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"group\"},{\"$type\":\"Assignment\",\"feature\":\"id\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@23\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"icon\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@29\"},\"arguments\":[]},\"cardinality\":\"?\"},{\"$type\":\"Assignment\",\"feature\":\"title\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@30\"},\"arguments\":[]},\"cardinality\":\"?\"},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"in\"},{\"$type\":\"Assignment\",\"feature\":\"in\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@23\"},\"arguments\":[]}}],\"cardinality\":\"?\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@13\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"Service\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"service\"},{\"$type\":\"Assignment\",\"feature\":\"id\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@23\"},\"arguments\":[]}},{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"iconText\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@22\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"icon\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@29\"},\"arguments\":[]}}],\"cardinality\":\"?\"},{\"$type\":\"Assignment\",\"feature\":\"title\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@30\"},\"arguments\":[]},\"cardinality\":\"?\"},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"in\"},{\"$type\":\"Assignment\",\"feature\":\"in\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@23\"},\"arguments\":[]}}],\"cardinality\":\"?\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@13\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"Junction\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"junction\"},{\"$type\":\"Assignment\",\"feature\":\"id\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@23\"},\"arguments\":[]}},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"in\"},{\"$type\":\"Assignment\",\"feature\":\"in\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@23\"},\"arguments\":[]}}],\"cardinality\":\"?\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@13\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"Edge\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"lhsId\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@23\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"lhsGroup\",\"operator\":\"?=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@11\"},\"arguments\":[]},\"cardinality\":\"?\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@4\"},\"arguments\":[]},{\"$type\":\"Assignment\",\"feature\":\"rhsId\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@23\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"rhsGroup\",\"operator\":\"?=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@11\"},\"arguments\":[]},\"cardinality\":\"?\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@13\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"Alignment\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"align\"},{\"$type\":\"Assignment\",\"feature\":\"direction\",\"operator\":\"=\",\"terminal\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"row\"},{\"$type\":\"Keyword\",\"value\":\"column\"}]}},{\"$type\":\"Assignment\",\"feature\":\"members\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@23\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"members\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@23\"},\"arguments\":[]},\"cardinality\":\"+\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@13\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"TerminalRule\",\"name\":\"ARROW_DIRECTION\",\"definition\":{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"L\"},\"parenthesized\":false},{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"R\"},\"parenthesized\":false}],\"parenthesized\":false},{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"T\"},\"parenthesized\":false}],\"parenthesized\":false},{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"B\"},\"parenthesized\":false}],\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ARROW_GROUP\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\\{group\\\\}/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ARROW_INTO\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/<|>/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"ParserRule\",\"name\":\"EOL\",\"dataType\":\"string\",\"definition\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@24\"},\"arguments\":[],\"cardinality\":\"+\"},{\"$type\":\"EndOfFile\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"fragment\":true,\"name\":\"TitleAndAccessibilities\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"accDescr\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@16\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"accTitle\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@17\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"title\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@18\"},\"arguments\":[]}}]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@13\"},\"arguments\":[]}],\"cardinality\":\"+\"},\"entry\":false,\"parameters\":[]},{\"$type\":\"TerminalRule\",\"name\":\"BOOLEAN\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"boolean\"},\"definition\":{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"true\"},\"parenthesized\":false},{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"false\"},\"parenthesized\":false}],\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ACC_DESCR\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ACC_TITLE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"TITLE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"FLOAT\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"number\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[0-9]+\\\\.[0-9]+(?!\\\\.)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"INT\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"number\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/0|[1-9][0-9]*(?!\\\\.)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"NUMBER\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"number\"},\"definition\":{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"TerminalRuleCall\",\"rule\":{\"$ref\":\"#/rules@19\"},\"parenthesized\":false},{\"$type\":\"TerminalRuleCall\",\"rule\":{\"$ref\":\"#/rules@20\"},\"parenthesized\":false}],\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"STRING\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"string\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\"([^\\\"\\\\\\\\]|\\\\\\\\.)*\\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ID\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"string\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\w]([-\\\\w]*\\\\w)?/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"NEWLINE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\\r?\\\\n/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"WHITESPACE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]+/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"YAML\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"DIRECTIVE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"SINGLE_LINE_COMMENT\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*%%[^\\\\n\\\\r]*/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"name\":\"ARCH_ICON\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\\([\\\\w-:]+\\\\)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ARCH_TITLE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\\[(?:\\\"([^\\\"\\\\\\\\]|\\\\\\\\.)*\\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'|[^\\\\[\\\\]\\\\r\\\\n]+)\\\\]/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false}],\"interfaces\":[],\"types\":[]}"), "ArchitectureGrammarGrammar"), jE, ME = /* @__PURE__ */ P(() => jE ??= zC("{\"$type\":\"Grammar\",\"isDeclared\":true,\"name\":\"CynefinGrammar\",\"imports\":[],\"rules\":[{\"$type\":\"ParserRule\",\"entry\":true,\"name\":\"Cynefin\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@16\"},\"arguments\":[],\"cardinality\":\"*\"},{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"cynefin-beta\"},{\"$type\":\"Keyword\",\"value\":\"cynefin-beta:\"}]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@16\"},\"arguments\":[],\"cardinality\":\"*\"},{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@6\"},\"arguments\":[]},{\"$type\":\"Assignment\",\"feature\":\"domains\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@1\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"transitions\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@3\"},\"arguments\":[]}},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@16\"},\"arguments\":[]}],\"cardinality\":\"*\"}]},\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"DomainBlock\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"domain\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@4\"},\"arguments\":[]}},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@16\"},\"arguments\":[],\"cardinality\":\"*\"},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"items\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@2\"},\"arguments\":[]}},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@16\"},\"arguments\":[],\"cardinality\":\"*\"}],\"cardinality\":\"*\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"DomainItem\",\"definition\":{\"$type\":\"Assignment\",\"feature\":\"label\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@14\"},\"arguments\":[]}},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"Transition\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"from\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@4\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\"-->\"},{\"$type\":\"Assignment\",\"feature\":\"to\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@4\"},\"arguments\":[]}},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\":\"},{\"$type\":\"Assignment\",\"feature\":\"label\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@14\"},\"arguments\":[]}}],\"cardinality\":\"?\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@5\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"TerminalRule\",\"name\":\"DOMAIN_NAME\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"string\"},\"definition\":{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"complex\"},\"parenthesized\":false},{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"complicated\"},\"parenthesized\":false}],\"parenthesized\":false},{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"clear\"},\"parenthesized\":false}],\"parenthesized\":false},{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"chaotic\"},\"parenthesized\":false}],\"parenthesized\":false},{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"confusion\"},\"parenthesized\":false}],\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"ParserRule\",\"name\":\"EOL\",\"dataType\":\"string\",\"definition\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@16\"},\"arguments\":[],\"cardinality\":\"+\"},{\"$type\":\"EndOfFile\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"fragment\":true,\"name\":\"TitleAndAccessibilities\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"accDescr\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@8\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"accTitle\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@9\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"title\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@10\"},\"arguments\":[]}}]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@5\"},\"arguments\":[]}],\"cardinality\":\"+\"},\"entry\":false,\"parameters\":[]},{\"$type\":\"TerminalRule\",\"name\":\"BOOLEAN\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"boolean\"},\"definition\":{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"true\"},\"parenthesized\":false},{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"false\"},\"parenthesized\":false}],\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ACC_DESCR\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ACC_TITLE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"TITLE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"FLOAT\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"number\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[0-9]+\\\\.[0-9]+(?!\\\\.)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"INT\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"number\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/0|[1-9][0-9]*(?!\\\\.)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"NUMBER\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"number\"},\"definition\":{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"TerminalRuleCall\",\"rule\":{\"$ref\":\"#/rules@11\"},\"parenthesized\":false},{\"$type\":\"TerminalRuleCall\",\"rule\":{\"$ref\":\"#/rules@12\"},\"parenthesized\":false}],\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"STRING\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"string\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\"([^\\\"\\\\\\\\]|\\\\\\\\.)*\\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ID\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"string\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\w]([-\\\\w]*\\\\w)?/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"NEWLINE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\\r?\\\\n/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"WHITESPACE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]+/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"YAML\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"DIRECTIVE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"SINGLE_LINE_COMMENT\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*%%[^\\\\n\\\\r]*/\",\"parenthesized\":false},\"fragment\":false}],\"interfaces\":[],\"types\":[]}"), "CynefinGrammarGrammar"), NE, PE = /* @__PURE__ */ P(() => NE ??= zC("{\"$type\":\"Grammar\",\"isDeclared\":true,\"name\":\"EventModeling\",\"interfaces\":[{\"$type\":\"Interface\",\"name\":\"Common\",\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"accDescr\",\"isOptional\":true,\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"}},{\"$type\":\"TypeAttribute\",\"name\":\"accTitle\",\"isOptional\":true,\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"}},{\"$type\":\"TypeAttribute\",\"name\":\"title\",\"isOptional\":true,\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"}}],\"superTypes\":[]}],\"rules\":[{\"$type\":\"ParserRule\",\"entry\":true,\"name\":\"EventModel\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"eventmodeling\"},{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"accDescr\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@20\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"accTitle\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@21\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"title\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@22\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"modelEntities\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@9\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"frames\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@8\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"dataEntities\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@10\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"noteEntities\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@11\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"gwtEntities\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@12\"},\"arguments\":[]}}],\"cardinality\":\"*\"}]},\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"EmModelEntityType\",\"dataType\":\"string\",\"definition\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"rmo\"},{\"$type\":\"Keyword\",\"value\":\"readmodel\"},{\"$type\":\"Keyword\",\"value\":\"ui\"},{\"$type\":\"Keyword\",\"value\":\"cmd\"},{\"$type\":\"Keyword\",\"value\":\"command\"},{\"$type\":\"Keyword\",\"value\":\"evt\"},{\"$type\":\"Keyword\",\"value\":\"event\"},{\"$type\":\"Keyword\",\"value\":\"pcr\"},{\"$type\":\"Keyword\",\"value\":\"processor\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"EmDataType\",\"dataType\":\"string\",\"definition\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"json\"},{\"$type\":\"Keyword\",\"value\":\"jsobj\"},{\"$type\":\"Keyword\",\"value\":\"figma\"},{\"$type\":\"Keyword\",\"value\":\"salt\"},{\"$type\":\"Keyword\",\"value\":\"uri\"},{\"$type\":\"Keyword\",\"value\":\"md\"},{\"$type\":\"Keyword\",\"value\":\"html\"},{\"$type\":\"Keyword\",\"value\":\"text\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"fragment\":true,\"name\":\"EmDataInline\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"`\"},{\"$type\":\"Assignment\",\"feature\":\"dataType\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@2\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\"`\"}],\"cardinality\":\"?\"},{\"$type\":\"Assignment\",\"feature\":\"dataInlineValue\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@18\"},\"arguments\":[]}}]},\"entry\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"fragment\":true,\"name\":\"EmDataBlock\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"`\"},{\"$type\":\"Assignment\",\"feature\":\"dataType\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@2\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\"`\"}],\"cardinality\":\"?\"},{\"$type\":\"Assignment\",\"feature\":\"dataBlockValue\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@19\"},\"arguments\":[]}}]},\"entry\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"QualifiedName\",\"dataType\":\"string\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@14\"},\"arguments\":[]},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\".\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@14\"},\"arguments\":[]}],\"cardinality\":\"*\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"EmTimeFrame\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"tf\"},{\"$type\":\"Keyword\",\"value\":\"timeframe\"}]},{\"$type\":\"Assignment\",\"feature\":\"name\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@15\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"modelEntityType\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@1\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"entityIdentifier\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@5\"},\"arguments\":[]}},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"->>\"},{\"$type\":\"Assignment\",\"feature\":\"sourceFrames\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"CrossReference\",\"type\":{\"$ref\":\"#/rules@8\"},\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@15\"},\"arguments\":[]},\"deprecatedSyntax\":false,\"isMulti\":false}}],\"cardinality\":\"*\"},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"[[\"},{\"$type\":\"Assignment\",\"feature\":\"dataReference\",\"operator\":\"=\",\"terminal\":{\"$type\":\"CrossReference\",\"type\":{\"$ref\":\"#/rules@10\"},\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@14\"},\"arguments\":[]},\"deprecatedSyntax\":false,\"isMulti\":false}},{\"$type\":\"Keyword\",\"value\":\"]]\"}],\"cardinality\":\"?\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@3\"},\"arguments\":[],\"cardinality\":\"?\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"EmResetFrame\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"rf\"},{\"$type\":\"Keyword\",\"value\":\"resetframe\"}]},{\"$type\":\"Assignment\",\"feature\":\"name\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@15\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"modelEntityType\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@1\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"entityIdentifier\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@5\"},\"arguments\":[]}},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"->>\"},{\"$type\":\"Assignment\",\"feature\":\"sourceFrames\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"CrossReference\",\"type\":{\"$ref\":\"#/rules@8\"},\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@15\"},\"arguments\":[]},\"deprecatedSyntax\":false,\"isMulti\":false}}],\"cardinality\":\"*\"},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"[[\"},{\"$type\":\"Assignment\",\"feature\":\"dataReference\",\"operator\":\"=\",\"terminal\":{\"$type\":\"CrossReference\",\"type\":{\"$ref\":\"#/rules@10\"},\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@14\"},\"arguments\":[]},\"deprecatedSyntax\":false,\"isMulti\":false}},{\"$type\":\"Keyword\",\"value\":\"]]\"}],\"cardinality\":\"?\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@3\"},\"arguments\":[],\"cardinality\":\"?\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"EmFrame\",\"definition\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@6\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@7\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"EmModelEntity\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"entity\"},{\"$type\":\"Assignment\",\"feature\":\"name\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@5\"},\"arguments\":[]}}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"EmDataEntity\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"data\"},{\"$type\":\"Assignment\",\"feature\":\"name\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@14\"},\"arguments\":[]}},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@4\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"EmNoteEntity\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"note\"},{\"$type\":\"Assignment\",\"feature\":\"sourceFrame\",\"operator\":\"=\",\"terminal\":{\"$type\":\"CrossReference\",\"type\":{\"$ref\":\"#/rules@8\"},\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@15\"},\"arguments\":[]},\"deprecatedSyntax\":false,\"isMulti\":false}},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@4\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"EmGwt\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"gwt\"},{\"$type\":\"Assignment\",\"feature\":\"sourceFrame\",\"operator\":\"=\",\"terminal\":{\"$type\":\"CrossReference\",\"type\":{\"$ref\":\"#/rules@8\"},\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@15\"},\"arguments\":[]},\"deprecatedSyntax\":false,\"isMulti\":false}},{\"$type\":\"Keyword\",\"value\":\"given\"},{\"$type\":\"Assignment\",\"feature\":\"givenStatements\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@13\"},\"arguments\":[]},\"cardinality\":\"+\"},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"when\"},{\"$type\":\"Assignment\",\"feature\":\"whenStatements\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@13\"},\"arguments\":[]},\"cardinality\":\"+\"}],\"cardinality\":\"?\"},{\"$type\":\"Keyword\",\"value\":\"then\"},{\"$type\":\"Assignment\",\"feature\":\"thenStatements\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@13\"},\"arguments\":[]},\"cardinality\":\"+\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"EmGwtStatement\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@1\"},\"arguments\":[]},{\"$type\":\"Assignment\",\"feature\":\"entityIdentifier\",\"operator\":\"=\",\"terminal\":{\"$type\":\"CrossReference\",\"type\":{\"$ref\":\"#/rules@9\"},\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@14\"},\"arguments\":[]},\"deprecatedSyntax\":false,\"isMulti\":false}}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"EM_EID\",\"dataType\":\"string\",\"definition\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@16\"},\"arguments\":[]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"EM_FI\",\"dataType\":\"string\",\"definition\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@17\"},\"arguments\":[]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"TerminalRule\",\"name\":\"EM_ID\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[_a-zA-Z][\\\\w_]*/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"EM_FID\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\\d{1,3}/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"EM_DATA_INLINE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\\{(.*)\\\\}|\\\"(.*)\\\"|'(.*)'/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"EM_DATA_BLOCK\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\\{[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?\\\\}(?:\\\\r?\\\\n|(?!\\\\S))/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"EM_ACC_DESCR\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"EM_ACC_TITLE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"EM_TITLE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"EM_WS\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\\s+/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"EM_YAML\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"EM_DIRECTIVE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"EM_SINGLE_LINE_COMMENT\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*%%[^\\\\n\\\\r]*/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"EM_ML_COMMENT\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\\/\\\\*[\\\\s\\\\S]*?\\\\*\\\\//\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"EM_SL_COMMENT\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\\/\\\\/[^\\\\n\\\\r]*/\",\"parenthesized\":false},\"fragment\":false}],\"imports\":[],\"types\":[]}"), "EventModelingGrammar"), FE, IE = /* @__PURE__ */ P(() => FE ??= zC("{\"$type\":\"Grammar\",\"isDeclared\":true,\"name\":\"GitGraphGrammar\",\"imports\":[],\"rules\":[{\"$type\":\"ParserRule\",\"entry\":true,\"name\":\"GitGraph\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@19\"},\"arguments\":[],\"cardinality\":\"*\"},{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"gitGraph\"},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"gitGraph\"},{\"$type\":\"Keyword\",\"value\":\":\"}]},{\"$type\":\"Keyword\",\"value\":\"gitGraph:\"},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"gitGraph\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@2\"},\"arguments\":[]},{\"$type\":\"Keyword\",\"value\":\":\"}]}]},{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@19\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@9\"},\"arguments\":[]},{\"$type\":\"Assignment\",\"feature\":\"statements\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@1\"},\"arguments\":[]}}],\"cardinality\":\"*\"}]},\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"Statement\",\"definition\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@3\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@4\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@5\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@6\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@7\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"Direction\",\"definition\":{\"$type\":\"Assignment\",\"feature\":\"dir\",\"operator\":\"=\",\"terminal\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"LR\"},{\"$type\":\"Keyword\",\"value\":\"TB\"},{\"$type\":\"Keyword\",\"value\":\"BT\"}]}},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"Commit\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"commit\"},{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"id:\"},{\"$type\":\"Assignment\",\"feature\":\"id\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@17\"},\"arguments\":[]}}]},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"msg:\",\"cardinality\":\"?\"},{\"$type\":\"Assignment\",\"feature\":\"message\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@17\"},\"arguments\":[]}}]},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"tag:\"},{\"$type\":\"Assignment\",\"feature\":\"tags\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@17\"},\"arguments\":[]}}]},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"type:\"},{\"$type\":\"Assignment\",\"feature\":\"type\",\"operator\":\"=\",\"terminal\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"NORMAL\"},{\"$type\":\"Keyword\",\"value\":\"REVERSE\"},{\"$type\":\"Keyword\",\"value\":\"HIGHLIGHT\"}]}}]}],\"cardinality\":\"*\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@8\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"Branch\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"branch\"},{\"$type\":\"Assignment\",\"feature\":\"name\",\"operator\":\"=\",\"terminal\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@24\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@17\"},\"arguments\":[]}]}},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"order:\"},{\"$type\":\"Assignment\",\"feature\":\"order\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@15\"},\"arguments\":[]}}],\"cardinality\":\"?\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@8\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"Merge\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"merge\"},{\"$type\":\"Assignment\",\"feature\":\"branch\",\"operator\":\"=\",\"terminal\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@24\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@17\"},\"arguments\":[]}]}},{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"id:\"},{\"$type\":\"Assignment\",\"feature\":\"id\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@17\"},\"arguments\":[]}}]},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"tag:\"},{\"$type\":\"Assignment\",\"feature\":\"tags\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@17\"},\"arguments\":[]}}]},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"type:\"},{\"$type\":\"Assignment\",\"feature\":\"type\",\"operator\":\"=\",\"terminal\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"NORMAL\"},{\"$type\":\"Keyword\",\"value\":\"REVERSE\"},{\"$type\":\"Keyword\",\"value\":\"HIGHLIGHT\"}]}}]}],\"cardinality\":\"*\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@8\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"Checkout\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"checkout\"},{\"$type\":\"Keyword\",\"value\":\"switch\"}]},{\"$type\":\"Assignment\",\"feature\":\"branch\",\"operator\":\"=\",\"terminal\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@24\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@17\"},\"arguments\":[]}]}},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@8\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"CherryPicking\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"cherry-pick\"},{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"id:\"},{\"$type\":\"Assignment\",\"feature\":\"id\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@17\"},\"arguments\":[]}}]},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"tag:\"},{\"$type\":\"Assignment\",\"feature\":\"tags\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@17\"},\"arguments\":[]}}]},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"parent:\"},{\"$type\":\"Assignment\",\"feature\":\"parent\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@17\"},\"arguments\":[]}}]}],\"cardinality\":\"*\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@8\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"EOL\",\"dataType\":\"string\",\"definition\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@19\"},\"arguments\":[],\"cardinality\":\"+\"},{\"$type\":\"EndOfFile\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"fragment\":true,\"name\":\"TitleAndAccessibilities\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"accDescr\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@11\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"accTitle\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@12\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"title\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@13\"},\"arguments\":[]}}]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@8\"},\"arguments\":[]}],\"cardinality\":\"+\"},\"entry\":false,\"parameters\":[]},{\"$type\":\"TerminalRule\",\"name\":\"BOOLEAN\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"boolean\"},\"definition\":{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"true\"},\"parenthesized\":false},{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"false\"},\"parenthesized\":false}],\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ACC_DESCR\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ACC_TITLE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"TITLE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"FLOAT\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"number\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[0-9]+\\\\.[0-9]+(?!\\\\.)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"INT\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"number\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/0|[1-9][0-9]*(?!\\\\.)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"NUMBER\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"number\"},\"definition\":{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"TerminalRuleCall\",\"rule\":{\"$ref\":\"#/rules@14\"},\"parenthesized\":false},{\"$type\":\"TerminalRuleCall\",\"rule\":{\"$ref\":\"#/rules@15\"},\"parenthesized\":false}],\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"STRING\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"string\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\"([^\\\"\\\\\\\\]|\\\\\\\\.)*\\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ID\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"string\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\w]([-\\\\w]*\\\\w)?/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"NEWLINE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\\r?\\\\n/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"WHITESPACE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]+/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"YAML\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"DIRECTIVE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"SINGLE_LINE_COMMENT\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*%%[^\\\\n\\\\r]*/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"name\":\"REFERENCE\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"string\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\\w([-\\\\./\\\\w]*[-\\\\w])?/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false}],\"interfaces\":[],\"types\":[]}"), "GitGraphGrammarGrammar"), LE, RE = /* @__PURE__ */ P(() => LE ??= zC("{\"$type\":\"Grammar\",\"isDeclared\":true,\"name\":\"InfoGrammar\",\"imports\":[],\"rules\":[{\"$type\":\"ParserRule\",\"entry\":true,\"name\":\"Info\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@12\"},\"arguments\":[],\"cardinality\":\"*\"},{\"$type\":\"Keyword\",\"value\":\"info\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@12\"},\"arguments\":[],\"cardinality\":\"*\"},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"showInfo\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@12\"},\"arguments\":[],\"cardinality\":\"*\"}],\"cardinality\":\"?\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@2\"},\"arguments\":[],\"cardinality\":\"?\"}]},\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"EOL\",\"dataType\":\"string\",\"definition\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@12\"},\"arguments\":[],\"cardinality\":\"+\"},{\"$type\":\"EndOfFile\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"fragment\":true,\"name\":\"TitleAndAccessibilities\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"accDescr\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@4\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"accTitle\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@5\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"title\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@6\"},\"arguments\":[]}}]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@1\"},\"arguments\":[]}],\"cardinality\":\"+\"},\"entry\":false,\"parameters\":[]},{\"$type\":\"TerminalRule\",\"name\":\"BOOLEAN\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"boolean\"},\"definition\":{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"true\"},\"parenthesized\":false},{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"false\"},\"parenthesized\":false}],\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ACC_DESCR\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ACC_TITLE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"TITLE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"FLOAT\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"number\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[0-9]+\\\\.[0-9]+(?!\\\\.)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"INT\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"number\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/0|[1-9][0-9]*(?!\\\\.)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"NUMBER\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"number\"},\"definition\":{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"TerminalRuleCall\",\"rule\":{\"$ref\":\"#/rules@7\"},\"parenthesized\":false},{\"$type\":\"TerminalRuleCall\",\"rule\":{\"$ref\":\"#/rules@8\"},\"parenthesized\":false}],\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"STRING\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"string\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\"([^\\\"\\\\\\\\]|\\\\\\\\.)*\\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ID\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"string\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\w]([-\\\\w]*\\\\w)?/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"NEWLINE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\\r?\\\\n/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"WHITESPACE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]+/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"YAML\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"DIRECTIVE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"SINGLE_LINE_COMMENT\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*%%[^\\\\n\\\\r]*/\",\"parenthesized\":false},\"fragment\":false}],\"interfaces\":[],\"types\":[]}"), "InfoGrammarGrammar"), zE, BE = /* @__PURE__ */ P(() => zE ??= zC("{\"$type\":\"Grammar\",\"isDeclared\":true,\"name\":\"PacketGrammar\",\"imports\":[],\"rules\":[{\"$type\":\"ParserRule\",\"entry\":true,\"name\":\"Packet\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@13\"},\"arguments\":[],\"cardinality\":\"*\"},{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"packet\"},{\"$type\":\"Keyword\",\"value\":\"packet-beta\"}]},{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@3\"},\"arguments\":[]},{\"$type\":\"Assignment\",\"feature\":\"blocks\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@1\"},\"arguments\":[]}},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@13\"},\"arguments\":[]}],\"cardinality\":\"*\"}]},\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"PacketBlock\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"start\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@9\"},\"arguments\":[]}},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"-\"},{\"$type\":\"Assignment\",\"feature\":\"end\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@9\"},\"arguments\":[]}}],\"cardinality\":\"?\"}]},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"+\"},{\"$type\":\"Assignment\",\"feature\":\"bits\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@9\"},\"arguments\":[]}}]}]},{\"$type\":\"Keyword\",\"value\":\":\"},{\"$type\":\"Assignment\",\"feature\":\"label\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@11\"},\"arguments\":[]}},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@2\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"EOL\",\"dataType\":\"string\",\"definition\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@13\"},\"arguments\":[],\"cardinality\":\"+\"},{\"$type\":\"EndOfFile\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"fragment\":true,\"name\":\"TitleAndAccessibilities\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"accDescr\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@5\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"accTitle\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@6\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"title\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@7\"},\"arguments\":[]}}]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@2\"},\"arguments\":[]}],\"cardinality\":\"+\"},\"entry\":false,\"parameters\":[]},{\"$type\":\"TerminalRule\",\"name\":\"BOOLEAN\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"boolean\"},\"definition\":{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"true\"},\"parenthesized\":false},{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"false\"},\"parenthesized\":false}],\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ACC_DESCR\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ACC_TITLE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"TITLE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"FLOAT\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"number\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[0-9]+\\\\.[0-9]+(?!\\\\.)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"INT\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"number\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/0|[1-9][0-9]*(?!\\\\.)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"NUMBER\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"number\"},\"definition\":{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"TerminalRuleCall\",\"rule\":{\"$ref\":\"#/rules@8\"},\"parenthesized\":false},{\"$type\":\"TerminalRuleCall\",\"rule\":{\"$ref\":\"#/rules@9\"},\"parenthesized\":false}],\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"STRING\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"string\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\"([^\\\"\\\\\\\\]|\\\\\\\\.)*\\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ID\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"string\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\w]([-\\\\w]*\\\\w)?/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"NEWLINE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\\r?\\\\n/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"WHITESPACE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]+/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"YAML\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"DIRECTIVE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"SINGLE_LINE_COMMENT\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*%%[^\\\\n\\\\r]*/\",\"parenthesized\":false},\"fragment\":false}],\"interfaces\":[],\"types\":[]}"), "PacketGrammarGrammar"), VE, HE = /* @__PURE__ */ P(() => VE ??= zC("{\"$type\":\"Grammar\",\"isDeclared\":true,\"name\":\"PieGrammar\",\"imports\":[],\"rules\":[{\"$type\":\"ParserRule\",\"entry\":true,\"name\":\"Pie\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@16\"},\"arguments\":[],\"cardinality\":\"*\"},{\"$type\":\"Keyword\",\"value\":\"pie\"},{\"$type\":\"Assignment\",\"feature\":\"showData\",\"operator\":\"?=\",\"terminal\":{\"$type\":\"Keyword\",\"value\":\"showData\"},\"cardinality\":\"?\"},{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@6\"},\"arguments\":[]},{\"$type\":\"Assignment\",\"feature\":\"sections\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@1\"},\"arguments\":[]}},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@16\"},\"arguments\":[]}],\"cardinality\":\"*\"}]},\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"PieSection\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"label\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@14\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\":\"},{\"$type\":\"Assignment\",\"feature\":\"value\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@4\"},\"arguments\":[]}},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@5\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"TerminalRule\",\"name\":\"FLOAT_PIE\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"number\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/-?[0-9]+\\\\.[0-9]+(?!\\\\.)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"INT_PIE\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"number\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/-?(0|[1-9][0-9]*)(?!\\\\.)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"NUMBER_PIE\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"number\"},\"definition\":{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"TerminalRuleCall\",\"rule\":{\"$ref\":\"#/rules@2\"},\"parenthesized\":false},{\"$type\":\"TerminalRuleCall\",\"rule\":{\"$ref\":\"#/rules@3\"},\"parenthesized\":false}],\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"ParserRule\",\"name\":\"EOL\",\"dataType\":\"string\",\"definition\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@16\"},\"arguments\":[],\"cardinality\":\"+\"},{\"$type\":\"EndOfFile\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"fragment\":true,\"name\":\"TitleAndAccessibilities\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"accDescr\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@8\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"accTitle\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@9\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"title\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@10\"},\"arguments\":[]}}]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@5\"},\"arguments\":[]}],\"cardinality\":\"+\"},\"entry\":false,\"parameters\":[]},{\"$type\":\"TerminalRule\",\"name\":\"BOOLEAN\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"boolean\"},\"definition\":{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"true\"},\"parenthesized\":false},{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"false\"},\"parenthesized\":false}],\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ACC_DESCR\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ACC_TITLE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"TITLE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"FLOAT\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"number\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[0-9]+\\\\.[0-9]+(?!\\\\.)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"INT\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"number\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/0|[1-9][0-9]*(?!\\\\.)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"NUMBER\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"number\"},\"definition\":{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"TerminalRuleCall\",\"rule\":{\"$ref\":\"#/rules@11\"},\"parenthesized\":false},{\"$type\":\"TerminalRuleCall\",\"rule\":{\"$ref\":\"#/rules@12\"},\"parenthesized\":false}],\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"STRING\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"string\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\"([^\\\"\\\\\\\\]|\\\\\\\\.)*\\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ID\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"string\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\w]([-\\\\w]*\\\\w)?/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"NEWLINE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\\r?\\\\n/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"WHITESPACE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]+/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"YAML\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"DIRECTIVE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"SINGLE_LINE_COMMENT\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*%%[^\\\\n\\\\r]*/\",\"parenthesized\":false},\"fragment\":false}],\"interfaces\":[],\"types\":[]}"), "PieGrammarGrammar"), UE, WE = /* @__PURE__ */ P(() => UE ??= zC("{\"$type\":\"Grammar\",\"isDeclared\":true,\"name\":\"RadarGrammar\",\"imports\":[],\"rules\":[{\"$type\":\"ParserRule\",\"entry\":true,\"name\":\"Radar\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@20\"},\"arguments\":[],\"cardinality\":\"*\"},{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"radar-beta\"},{\"$type\":\"Keyword\",\"value\":\"radar-beta:\"},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"radar-beta\"},{\"$type\":\"Keyword\",\"value\":\":\"}]}]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@20\"},\"arguments\":[],\"cardinality\":\"*\"},{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@10\"},\"arguments\":[]},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"axis\"},{\"$type\":\"Assignment\",\"feature\":\"axes\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@2\"},\"arguments\":[]}},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\",\"},{\"$type\":\"Assignment\",\"feature\":\"axes\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@2\"},\"arguments\":[]}}],\"cardinality\":\"*\"}]},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"curve\"},{\"$type\":\"Assignment\",\"feature\":\"curves\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@3\"},\"arguments\":[]}},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\",\"},{\"$type\":\"Assignment\",\"feature\":\"curves\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@3\"},\"arguments\":[]}}],\"cardinality\":\"*\"}]},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"options\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@7\"},\"arguments\":[]}},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\",\"},{\"$type\":\"Assignment\",\"feature\":\"options\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@7\"},\"arguments\":[]}}],\"cardinality\":\"*\"}]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@20\"},\"arguments\":[]}],\"cardinality\":\"*\"}]},\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"fragment\":true,\"name\":\"Label\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"[\"},{\"$type\":\"Assignment\",\"feature\":\"label\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@18\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\"]\"}]},\"entry\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"Axis\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"name\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@19\"},\"arguments\":[]}},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@1\"},\"arguments\":[],\"cardinality\":\"?\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"Curve\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"name\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@19\"},\"arguments\":[]}},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@1\"},\"arguments\":[],\"cardinality\":\"?\"},{\"$type\":\"Keyword\",\"value\":\"{\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@4\"},\"arguments\":[]},{\"$type\":\"Keyword\",\"value\":\"}\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"fragment\":true,\"name\":\"Entries\",\"definition\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Group\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@20\"},\"arguments\":[],\"cardinality\":\"*\"},{\"$type\":\"Assignment\",\"feature\":\"entries\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@6\"},\"arguments\":[]}},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\",\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@20\"},\"arguments\":[],\"cardinality\":\"*\"},{\"$type\":\"Assignment\",\"feature\":\"entries\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@6\"},\"arguments\":[]}}],\"cardinality\":\"*\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@20\"},\"arguments\":[],\"cardinality\":\"*\"}]},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@20\"},\"arguments\":[],\"cardinality\":\"*\"},{\"$type\":\"Assignment\",\"feature\":\"entries\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@5\"},\"arguments\":[]}},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\",\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@20\"},\"arguments\":[],\"cardinality\":\"*\"},{\"$type\":\"Assignment\",\"feature\":\"entries\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@5\"},\"arguments\":[]}}],\"cardinality\":\"*\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@20\"},\"arguments\":[],\"cardinality\":\"*\"}]}]},\"entry\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"DetailedEntry\",\"returnType\":{\"$ref\":\"#/interfaces@0\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"axis\",\"operator\":\"=\",\"terminal\":{\"$type\":\"CrossReference\",\"type\":{\"$ref\":\"#/rules@2\"},\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@19\"},\"arguments\":[]},\"deprecatedSyntax\":false,\"isMulti\":false}},{\"$type\":\"Keyword\",\"value\":\":\",\"cardinality\":\"?\"},{\"$type\":\"Assignment\",\"feature\":\"value\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@17\"},\"arguments\":[]}}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"NumberEntry\",\"returnType\":{\"$ref\":\"#/interfaces@0\"},\"definition\":{\"$type\":\"Assignment\",\"feature\":\"value\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@17\"},\"arguments\":[]}},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"Option\",\"definition\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"name\",\"operator\":\"=\",\"terminal\":{\"$type\":\"Keyword\",\"value\":\"showLegend\"}},{\"$type\":\"Assignment\",\"feature\":\"value\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@11\"},\"arguments\":[]}}]},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"name\",\"operator\":\"=\",\"terminal\":{\"$type\":\"Keyword\",\"value\":\"ticks\"}},{\"$type\":\"Assignment\",\"feature\":\"value\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@17\"},\"arguments\":[]}}]},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"name\",\"operator\":\"=\",\"terminal\":{\"$type\":\"Keyword\",\"value\":\"max\"}},{\"$type\":\"Assignment\",\"feature\":\"value\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@17\"},\"arguments\":[]}}]},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"name\",\"operator\":\"=\",\"terminal\":{\"$type\":\"Keyword\",\"value\":\"min\"}},{\"$type\":\"Assignment\",\"feature\":\"value\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@17\"},\"arguments\":[]}}]},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"name\",\"operator\":\"=\",\"terminal\":{\"$type\":\"Keyword\",\"value\":\"graticule\"}},{\"$type\":\"Assignment\",\"feature\":\"value\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@8\"},\"arguments\":[]}}]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"TerminalRule\",\"name\":\"GRATICULE\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"string\"},\"definition\":{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"circle\"},\"parenthesized\":false},{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"polygon\"},\"parenthesized\":false}],\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"ParserRule\",\"name\":\"EOL\",\"dataType\":\"string\",\"definition\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@20\"},\"arguments\":[],\"cardinality\":\"+\"},{\"$type\":\"EndOfFile\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"fragment\":true,\"name\":\"TitleAndAccessibilities\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"accDescr\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@12\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"accTitle\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@13\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"title\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@14\"},\"arguments\":[]}}]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@9\"},\"arguments\":[]}],\"cardinality\":\"+\"},\"entry\":false,\"parameters\":[]},{\"$type\":\"TerminalRule\",\"name\":\"BOOLEAN\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"boolean\"},\"definition\":{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"true\"},\"parenthesized\":false},{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"false\"},\"parenthesized\":false}],\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ACC_DESCR\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ACC_TITLE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"TITLE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"FLOAT\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"number\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[0-9]+\\\\.[0-9]+(?!\\\\.)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"INT\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"number\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/0|[1-9][0-9]*(?!\\\\.)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"NUMBER\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"number\"},\"definition\":{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"TerminalRuleCall\",\"rule\":{\"$ref\":\"#/rules@15\"},\"parenthesized\":false},{\"$type\":\"TerminalRuleCall\",\"rule\":{\"$ref\":\"#/rules@16\"},\"parenthesized\":false}],\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"STRING\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"string\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\"([^\\\"\\\\\\\\]|\\\\\\\\.)*\\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ID\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"string\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\w]([-\\\\w]*\\\\w)?/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"NEWLINE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\\r?\\\\n/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"WHITESPACE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]+/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"YAML\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"DIRECTIVE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"SINGLE_LINE_COMMENT\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*%%[^\\\\n\\\\r]*/\",\"parenthesized\":false},\"fragment\":false}],\"interfaces\":[{\"$type\":\"Interface\",\"name\":\"Entry\",\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"axis\",\"isOptional\":true,\"type\":{\"$type\":\"ReferenceType\",\"referenceType\":{\"$type\":\"SimpleType\",\"typeRef\":{\"$ref\":\"#/rules@2\"}},\"isMulti\":false}},{\"$type\":\"TypeAttribute\",\"name\":\"value\",\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"number\"},\"isOptional\":false}],\"superTypes\":[]}],\"types\":[]}"), "RadarGrammarGrammar"), GE, KE = /* @__PURE__ */ P(() => GE ??= zC("{\"$type\":\"Grammar\",\"isDeclared\":true,\"name\":\"RailroadAbnfGrammar\",\"rules\":[{\"$type\":\"TerminalRule\",\"name\":\"TITLE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ACC_TITLE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ACC_DESCR\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ABNF_RULENAME\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"string\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[A-Za-z][A-Za-z0-9-]*/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ABNF_STRING\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"string\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\"[^\\\"]*\\\"/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ABNF_NUMVAL\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"string\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/%[xXdDbB][0-9A-Fa-f]+(?:-[0-9A-Fa-f]+|\\\\.[0-9A-Fa-f]+)*/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ABNF_REPEAT\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"string\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[0-9]*\\\\*[0-9]*/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ABNF_EXACT_REPEAT\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"string\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[0-9]+/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"ABNF_WHITESPACE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t \\\\r\\\\n]+/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"ABNF_YAML\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"ABNF_DIRECTIVE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"ABNF_SINGLE_LINE_COMMENT\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*%%[^\\\\n\\\\r]*/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"ABNF_COMMENT\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/;[^\\\\n\\\\r]*/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"ParserRule\",\"entry\":true,\"name\":\"RailroadAbnf\",\"returnType\":{\"$ref\":\"#/interfaces@0\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"railroad-abnf-beta\"},{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"title\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@0\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"accTitle\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@1\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"accDescr\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@2\"},\"arguments\":[]}}],\"cardinality\":\"*\"},{\"$type\":\"Assignment\",\"feature\":\"rules\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@14\"},\"arguments\":[]},\"cardinality\":\"*\"}]},\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"AbnfRule\",\"returnType\":{\"$ref\":\"#/interfaces@1\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"name\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@3\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\"=\"},{\"$type\":\"Assignment\",\"feature\":\"definition\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@15\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\";\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"AbnfAlternation\",\"returnType\":{\"$ref\":\"#/interfaces@2\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"alternatives\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@16\"},\"arguments\":[]}},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"/\"},{\"$type\":\"Assignment\",\"feature\":\"alternatives\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@16\"},\"arguments\":[]}}],\"cardinality\":\"*\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"AbnfConcatenation\",\"returnType\":{\"$ref\":\"#/interfaces@3\"},\"definition\":{\"$type\":\"Assignment\",\"feature\":\"elements\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@17\"},\"arguments\":[]},\"cardinality\":\"+\"},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"AbnfElement\",\"returnType\":{\"$ref\":\"#/interfaces@4\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"repeat\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@6\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"repeat\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@7\"},\"arguments\":[]}}],\"cardinality\":\"?\"},{\"$type\":\"Assignment\",\"feature\":\"primary\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@18\"},\"arguments\":[]}}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"AbnfPrimary\",\"returnType\":{\"$ref\":\"#/interfaces@5\"},\"definition\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@19\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@20\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@21\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@22\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@23\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"AbnfStringLiteral\",\"returnType\":{\"$ref\":\"#/interfaces@6\"},\"definition\":{\"$type\":\"Assignment\",\"feature\":\"value\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@4\"},\"arguments\":[]}},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"AbnfNumVal\",\"returnType\":{\"$ref\":\"#/interfaces@7\"},\"definition\":{\"$type\":\"Assignment\",\"feature\":\"value\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@5\"},\"arguments\":[]}},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"AbnfRuleName\",\"returnType\":{\"$ref\":\"#/interfaces@8\"},\"definition\":{\"$type\":\"Assignment\",\"feature\":\"name\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@3\"},\"arguments\":[]}},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"AbnfGroup\",\"returnType\":{\"$ref\":\"#/interfaces@9\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"(\"},{\"$type\":\"Assignment\",\"feature\":\"element\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@15\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\")\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"AbnfOptionalGroup\",\"returnType\":{\"$ref\":\"#/interfaces@10\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"[\"},{\"$type\":\"Assignment\",\"feature\":\"element\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@15\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\"]\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]}],\"interfaces\":[{\"$type\":\"Interface\",\"name\":\"RailroadAbnf\",\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"title\",\"isOptional\":true,\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"}},{\"$type\":\"TypeAttribute\",\"name\":\"accTitle\",\"isOptional\":true,\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"}},{\"$type\":\"TypeAttribute\",\"name\":\"accDescr\",\"isOptional\":true,\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"}},{\"$type\":\"TypeAttribute\",\"name\":\"rules\",\"type\":{\"$type\":\"ArrayType\",\"elementType\":{\"$type\":\"SimpleType\",\"typeRef\":{\"$ref\":\"#/interfaces@1\"}}},\"isOptional\":false}],\"superTypes\":[]},{\"$type\":\"Interface\",\"name\":\"AbnfRule\",\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"name\",\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"},\"isOptional\":false},{\"$type\":\"TypeAttribute\",\"name\":\"definition\",\"type\":{\"$type\":\"SimpleType\",\"typeRef\":{\"$ref\":\"#/interfaces@2\"}},\"isOptional\":false}],\"superTypes\":[]},{\"$type\":\"Interface\",\"name\":\"AbnfAlternation\",\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"alternatives\",\"type\":{\"$type\":\"ArrayType\",\"elementType\":{\"$type\":\"SimpleType\",\"typeRef\":{\"$ref\":\"#/interfaces@3\"}}},\"isOptional\":false}],\"superTypes\":[]},{\"$type\":\"Interface\",\"name\":\"AbnfConcatenation\",\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"elements\",\"type\":{\"$type\":\"ArrayType\",\"elementType\":{\"$type\":\"SimpleType\",\"typeRef\":{\"$ref\":\"#/interfaces@4\"}}},\"isOptional\":false}],\"superTypes\":[]},{\"$type\":\"Interface\",\"name\":\"AbnfElement\",\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"repeat\",\"isOptional\":true,\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"}},{\"$type\":\"TypeAttribute\",\"name\":\"primary\",\"type\":{\"$type\":\"SimpleType\",\"typeRef\":{\"$ref\":\"#/interfaces@5\"}},\"isOptional\":false}],\"superTypes\":[]},{\"$type\":\"Interface\",\"name\":\"AbnfPrimary\",\"attributes\":[],\"superTypes\":[]},{\"$type\":\"Interface\",\"name\":\"AbnfStringLiteral\",\"superTypes\":[{\"$ref\":\"#/interfaces@5\"}],\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"value\",\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"},\"isOptional\":false}]},{\"$type\":\"Interface\",\"name\":\"AbnfNumVal\",\"superTypes\":[{\"$ref\":\"#/interfaces@5\"}],\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"value\",\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"},\"isOptional\":false}]},{\"$type\":\"Interface\",\"name\":\"AbnfRuleName\",\"superTypes\":[{\"$ref\":\"#/interfaces@5\"}],\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"name\",\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"},\"isOptional\":false}]},{\"$type\":\"Interface\",\"name\":\"AbnfGroup\",\"superTypes\":[{\"$ref\":\"#/interfaces@5\"}],\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"element\",\"type\":{\"$type\":\"SimpleType\",\"typeRef\":{\"$ref\":\"#/interfaces@2\"}},\"isOptional\":false}]},{\"$type\":\"Interface\",\"name\":\"AbnfOptionalGroup\",\"superTypes\":[{\"$ref\":\"#/interfaces@5\"}],\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"element\",\"type\":{\"$type\":\"SimpleType\",\"typeRef\":{\"$ref\":\"#/interfaces@2\"}},\"isOptional\":false}]}],\"imports\":[],\"types\":[]}"), "RailroadAbnfGrammarGrammar"), qE, JE = /* @__PURE__ */ P(() => qE ??= zC("{\"$type\":\"Grammar\",\"isDeclared\":true,\"name\":\"RailroadEbnfGrammar\",\"rules\":[{\"$type\":\"TerminalRule\",\"name\":\"TITLE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ACC_TITLE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ACC_DESCR\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"EBNF_ID\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"string\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[A-Z_a-z][\\\\w-]*/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"EBNF_STRING\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"string\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\"([^\\\"\\\\\\\\]|\\\\\\\\.)*\\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"EBNF_SPECIAL_SEQUENCE\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"string\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\\?(?=[^?;]*[^?\\\\s;][^?;]*\\\\?)[^?;]*\\\\?/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"EBNF_WHITESPACE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t \\\\r\\\\n]+/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"EBNF_YAML\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"EBNF_DIRECTIVE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"EBNF_SINGLE_LINE_COMMENT\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*%%[^\\\\n\\\\r]*/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"EBNF_BLOCK_COMMENT\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\\/\\\\*[\\\\s\\\\S]*?\\\\*\\\\//\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"EBNF_ISO_COMMENT\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\\(\\\\*[\\\\s\\\\S]*?\\\\*\\\\)/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"ParserRule\",\"entry\":true,\"name\":\"RailroadEbnf\",\"returnType\":{\"$ref\":\"#/interfaces@0\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"railroad-ebnf-beta\"},{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"title\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@0\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"accTitle\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@1\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"accDescr\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@2\"},\"arguments\":[]}}],\"cardinality\":\"*\"},{\"$type\":\"Assignment\",\"feature\":\"rules\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@13\"},\"arguments\":[]},\"cardinality\":\"*\"}]},\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"EbnfRule\",\"returnType\":{\"$ref\":\"#/interfaces@1\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"name\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@3\"},\"arguments\":[]}},{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"=\"},{\"$type\":\"Keyword\",\"value\":\"::=\"}]},{\"$type\":\"Assignment\",\"feature\":\"definition\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@14\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\";\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"EbnfChoice\",\"returnType\":{\"$ref\":\"#/interfaces@2\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"alternatives\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@15\"},\"arguments\":[]}},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"|\"},{\"$type\":\"Assignment\",\"feature\":\"alternatives\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@15\"},\"arguments\":[]}}],\"cardinality\":\"*\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"EbnfSequence\",\"returnType\":{\"$ref\":\"#/interfaces@3\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"elements\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@16\"},\"arguments\":[]}},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\",\",\"cardinality\":\"?\"},{\"$type\":\"Assignment\",\"feature\":\"elements\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@16\"},\"arguments\":[]}}],\"cardinality\":\"*\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"EbnfTerm\",\"returnType\":{\"$ref\":\"#/interfaces@4\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"base\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@17\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"postfixes\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@24\"},\"arguments\":[]},\"cardinality\":\"*\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"EbnfPrimary\",\"returnType\":{\"$ref\":\"#/interfaces@5\"},\"definition\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@18\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@20\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@19\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@21\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@22\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@23\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"EbnfTerminal\",\"returnType\":{\"$ref\":\"#/interfaces@7\"},\"definition\":{\"$type\":\"Assignment\",\"feature\":\"value\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@4\"},\"arguments\":[]}},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"EbnfNonTerminal\",\"returnType\":{\"$ref\":\"#/interfaces@8\"},\"definition\":{\"$type\":\"Assignment\",\"feature\":\"name\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@3\"},\"arguments\":[]}},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"EbnfSpecial\",\"returnType\":{\"$ref\":\"#/interfaces@9\"},\"definition\":{\"$type\":\"Assignment\",\"feature\":\"text\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@5\"},\"arguments\":[]}},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"EbnfGroup\",\"returnType\":{\"$ref\":\"#/interfaces@10\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"(\"},{\"$type\":\"Assignment\",\"feature\":\"element\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@14\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\")\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"EbnfOptional\",\"returnType\":{\"$ref\":\"#/interfaces@11\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"[\"},{\"$type\":\"Assignment\",\"feature\":\"element\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@14\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\"]\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"EbnfRepetition\",\"returnType\":{\"$ref\":\"#/interfaces@12\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"{\"},{\"$type\":\"Assignment\",\"feature\":\"element\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@14\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\"}\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"EbnfPostfix\",\"returnType\":{\"$ref\":\"#/interfaces@6\"},\"definition\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@25\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@26\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@27\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@28\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"EbnfOptionalPostfix\",\"returnType\":{\"$ref\":\"#/interfaces@13\"},\"definition\":{\"$type\":\"Assignment\",\"feature\":\"operator\",\"operator\":\"=\",\"terminal\":{\"$type\":\"Keyword\",\"value\":\"?\"}},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"EbnfZeroOrMorePostfix\",\"returnType\":{\"$ref\":\"#/interfaces@14\"},\"definition\":{\"$type\":\"Assignment\",\"feature\":\"operator\",\"operator\":\"=\",\"terminal\":{\"$type\":\"Keyword\",\"value\":\"*\"}},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"EbnfOneOrMorePostfix\",\"returnType\":{\"$ref\":\"#/interfaces@15\"},\"definition\":{\"$type\":\"Assignment\",\"feature\":\"operator\",\"operator\":\"=\",\"terminal\":{\"$type\":\"Keyword\",\"value\":\"+\"}},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"EbnfExceptionPostfix\",\"returnType\":{\"$ref\":\"#/interfaces@16\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"-\"},{\"$type\":\"Assignment\",\"feature\":\"except\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@17\"},\"arguments\":[]}}]},\"entry\":false,\"fragment\":false,\"parameters\":[]}],\"interfaces\":[{\"$type\":\"Interface\",\"name\":\"RailroadEbnf\",\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"title\",\"isOptional\":true,\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"}},{\"$type\":\"TypeAttribute\",\"name\":\"accTitle\",\"isOptional\":true,\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"}},{\"$type\":\"TypeAttribute\",\"name\":\"accDescr\",\"isOptional\":true,\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"}},{\"$type\":\"TypeAttribute\",\"name\":\"rules\",\"type\":{\"$type\":\"ArrayType\",\"elementType\":{\"$type\":\"SimpleType\",\"typeRef\":{\"$ref\":\"#/interfaces@1\"}}},\"isOptional\":false}],\"superTypes\":[]},{\"$type\":\"Interface\",\"name\":\"EbnfRule\",\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"name\",\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"},\"isOptional\":false},{\"$type\":\"TypeAttribute\",\"name\":\"definition\",\"type\":{\"$type\":\"SimpleType\",\"typeRef\":{\"$ref\":\"#/interfaces@2\"}},\"isOptional\":false}],\"superTypes\":[]},{\"$type\":\"Interface\",\"name\":\"EbnfChoice\",\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"alternatives\",\"type\":{\"$type\":\"ArrayType\",\"elementType\":{\"$type\":\"SimpleType\",\"typeRef\":{\"$ref\":\"#/interfaces@3\"}}},\"isOptional\":false}],\"superTypes\":[]},{\"$type\":\"Interface\",\"name\":\"EbnfSequence\",\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"elements\",\"type\":{\"$type\":\"ArrayType\",\"elementType\":{\"$type\":\"SimpleType\",\"typeRef\":{\"$ref\":\"#/interfaces@4\"}}},\"isOptional\":false}],\"superTypes\":[]},{\"$type\":\"Interface\",\"name\":\"EbnfTerm\",\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"base\",\"type\":{\"$type\":\"SimpleType\",\"typeRef\":{\"$ref\":\"#/interfaces@5\"}},\"isOptional\":false},{\"$type\":\"TypeAttribute\",\"name\":\"postfixes\",\"type\":{\"$type\":\"ArrayType\",\"elementType\":{\"$type\":\"SimpleType\",\"typeRef\":{\"$ref\":\"#/interfaces@6\"}}},\"isOptional\":false}],\"superTypes\":[]},{\"$type\":\"Interface\",\"name\":\"EbnfPrimary\",\"attributes\":[],\"superTypes\":[]},{\"$type\":\"Interface\",\"name\":\"EbnfPostfix\",\"attributes\":[],\"superTypes\":[]},{\"$type\":\"Interface\",\"name\":\"EbnfTerminal\",\"superTypes\":[{\"$ref\":\"#/interfaces@5\"}],\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"value\",\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"},\"isOptional\":false}]},{\"$type\":\"Interface\",\"name\":\"EbnfNonTerminal\",\"superTypes\":[{\"$ref\":\"#/interfaces@5\"}],\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"name\",\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"},\"isOptional\":false}]},{\"$type\":\"Interface\",\"name\":\"EbnfSpecial\",\"superTypes\":[{\"$ref\":\"#/interfaces@5\"}],\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"text\",\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"},\"isOptional\":false}]},{\"$type\":\"Interface\",\"name\":\"EbnfGroup\",\"superTypes\":[{\"$ref\":\"#/interfaces@5\"}],\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"element\",\"type\":{\"$type\":\"SimpleType\",\"typeRef\":{\"$ref\":\"#/interfaces@2\"}},\"isOptional\":false}]},{\"$type\":\"Interface\",\"name\":\"EbnfOptional\",\"superTypes\":[{\"$ref\":\"#/interfaces@5\"}],\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"element\",\"type\":{\"$type\":\"SimpleType\",\"typeRef\":{\"$ref\":\"#/interfaces@2\"}},\"isOptional\":false}]},{\"$type\":\"Interface\",\"name\":\"EbnfRepetition\",\"superTypes\":[{\"$ref\":\"#/interfaces@5\"}],\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"element\",\"type\":{\"$type\":\"SimpleType\",\"typeRef\":{\"$ref\":\"#/interfaces@2\"}},\"isOptional\":false}]},{\"$type\":\"Interface\",\"name\":\"EbnfOptionalPostfix\",\"superTypes\":[{\"$ref\":\"#/interfaces@6\"}],\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"operator\",\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"},\"isOptional\":false}]},{\"$type\":\"Interface\",\"name\":\"EbnfZeroOrMorePostfix\",\"superTypes\":[{\"$ref\":\"#/interfaces@6\"}],\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"operator\",\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"},\"isOptional\":false}]},{\"$type\":\"Interface\",\"name\":\"EbnfOneOrMorePostfix\",\"superTypes\":[{\"$ref\":\"#/interfaces@6\"}],\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"operator\",\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"},\"isOptional\":false}]},{\"$type\":\"Interface\",\"name\":\"EbnfExceptionPostfix\",\"superTypes\":[{\"$ref\":\"#/interfaces@6\"}],\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"except\",\"type\":{\"$type\":\"SimpleType\",\"typeRef\":{\"$ref\":\"#/interfaces@5\"}},\"isOptional\":false}]}],\"imports\":[],\"types\":[]}"), "RailroadEbnfGrammarGrammar"), YE, XE = /* @__PURE__ */ P(() => YE ??= zC("{\"$type\":\"Grammar\",\"isDeclared\":true,\"name\":\"RailroadGrammar\",\"rules\":[{\"$type\":\"TerminalRule\",\"name\":\"TITLE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ACC_TITLE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ACC_DESCR\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"RR_ID\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"string\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[A-Z_a-z][\\\\w-]*/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"RR_STRING\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"string\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\"([^\\\"\\\\\\\\]|\\\\\\\\.)*\\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"RR_WHITESPACE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t \\\\r\\\\n]+/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"RR_YAML\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"RR_DIRECTIVE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"RR_SINGLE_LINE_COMMENT\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*%%[^\\\\n\\\\r]*/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"RR_BLOCK_COMMENT\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\\/\\\\*[\\\\s\\\\S]*?\\\\*\\\\//\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"ParserRule\",\"entry\":true,\"name\":\"Railroad\",\"returnType\":{\"$ref\":\"#/interfaces@0\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"railroad-beta\"},{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"title\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@0\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"accTitle\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@1\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"accDescr\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@2\"},\"arguments\":[]}}],\"cardinality\":\"*\"},{\"$type\":\"Assignment\",\"feature\":\"rules\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@11\"},\"arguments\":[]},\"cardinality\":\"*\"}]},\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"RailroadRule\",\"returnType\":{\"$ref\":\"#/interfaces@1\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"name\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@3\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\"=\"},{\"$type\":\"Assignment\",\"feature\":\"definition\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@12\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\";\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"RailroadExpression\",\"returnType\":{\"$ref\":\"#/interfaces@2\"},\"definition\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@13\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@14\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@15\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@16\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@17\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@18\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@19\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@20\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"RailroadSequenceExpr\",\"returnType\":{\"$ref\":\"#/interfaces@3\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"sequence\"},{\"$type\":\"Keyword\",\"value\":\"(\"},{\"$type\":\"Assignment\",\"feature\":\"elements\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@12\"},\"arguments\":[]}},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\",\"},{\"$type\":\"Assignment\",\"feature\":\"elements\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@12\"},\"arguments\":[]}}],\"cardinality\":\"*\"},{\"$type\":\"Keyword\",\"value\":\")\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"RailroadChoiceExpr\",\"returnType\":{\"$ref\":\"#/interfaces@4\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"choice\"},{\"$type\":\"Keyword\",\"value\":\"(\"},{\"$type\":\"Assignment\",\"feature\":\"alternatives\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@12\"},\"arguments\":[]}},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\",\"},{\"$type\":\"Assignment\",\"feature\":\"alternatives\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@12\"},\"arguments\":[]}}],\"cardinality\":\"*\"},{\"$type\":\"Keyword\",\"value\":\")\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"RailroadOptionalExpr\",\"returnType\":{\"$ref\":\"#/interfaces@5\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"optional\"},{\"$type\":\"Keyword\",\"value\":\"(\"},{\"$type\":\"Assignment\",\"feature\":\"element\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@12\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\")\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"RailroadOneOrMoreExpr\",\"returnType\":{\"$ref\":\"#/interfaces@6\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"oneOrMore\"},{\"$type\":\"Keyword\",\"value\":\"(\"},{\"$type\":\"Assignment\",\"feature\":\"element\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@12\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\")\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"RailroadZeroOrMoreExpr\",\"returnType\":{\"$ref\":\"#/interfaces@7\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"zeroOrMore\"},{\"$type\":\"Keyword\",\"value\":\"(\"},{\"$type\":\"Assignment\",\"feature\":\"element\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@12\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\")\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"RailroadTerminalExpr\",\"returnType\":{\"$ref\":\"#/interfaces@8\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"terminal\"},{\"$type\":\"Keyword\",\"value\":\"(\"},{\"$type\":\"Assignment\",\"feature\":\"value\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@4\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\")\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"RailroadNonTerminalExpr\",\"returnType\":{\"$ref\":\"#/interfaces@9\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"nonterminal\"},{\"$type\":\"Keyword\",\"value\":\"(\"},{\"$type\":\"Assignment\",\"feature\":\"name\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@4\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\")\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"RailroadSpecialExpr\",\"returnType\":{\"$ref\":\"#/interfaces@10\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"special\"},{\"$type\":\"Keyword\",\"value\":\"(\"},{\"$type\":\"Assignment\",\"feature\":\"text\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@4\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\")\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]}],\"interfaces\":[{\"$type\":\"Interface\",\"name\":\"Railroad\",\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"title\",\"isOptional\":true,\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"}},{\"$type\":\"TypeAttribute\",\"name\":\"accTitle\",\"isOptional\":true,\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"}},{\"$type\":\"TypeAttribute\",\"name\":\"accDescr\",\"isOptional\":true,\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"}},{\"$type\":\"TypeAttribute\",\"name\":\"rules\",\"type\":{\"$type\":\"ArrayType\",\"elementType\":{\"$type\":\"SimpleType\",\"typeRef\":{\"$ref\":\"#/interfaces@1\"}}},\"isOptional\":false}],\"superTypes\":[]},{\"$type\":\"Interface\",\"name\":\"RailroadRule\",\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"name\",\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"},\"isOptional\":false},{\"$type\":\"TypeAttribute\",\"name\":\"definition\",\"type\":{\"$type\":\"SimpleType\",\"typeRef\":{\"$ref\":\"#/interfaces@2\"}},\"isOptional\":false}],\"superTypes\":[]},{\"$type\":\"Interface\",\"name\":\"RailroadExpression\",\"attributes\":[],\"superTypes\":[]},{\"$type\":\"Interface\",\"name\":\"RailroadSequenceExpr\",\"superTypes\":[{\"$ref\":\"#/interfaces@2\"}],\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"elements\",\"type\":{\"$type\":\"ArrayType\",\"elementType\":{\"$type\":\"SimpleType\",\"typeRef\":{\"$ref\":\"#/interfaces@2\"}}},\"isOptional\":false}]},{\"$type\":\"Interface\",\"name\":\"RailroadChoiceExpr\",\"superTypes\":[{\"$ref\":\"#/interfaces@2\"}],\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"alternatives\",\"type\":{\"$type\":\"ArrayType\",\"elementType\":{\"$type\":\"SimpleType\",\"typeRef\":{\"$ref\":\"#/interfaces@2\"}}},\"isOptional\":false}]},{\"$type\":\"Interface\",\"name\":\"RailroadOptionalExpr\",\"superTypes\":[{\"$ref\":\"#/interfaces@2\"}],\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"element\",\"type\":{\"$type\":\"SimpleType\",\"typeRef\":{\"$ref\":\"#/interfaces@2\"}},\"isOptional\":false}]},{\"$type\":\"Interface\",\"name\":\"RailroadOneOrMoreExpr\",\"superTypes\":[{\"$ref\":\"#/interfaces@2\"}],\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"element\",\"type\":{\"$type\":\"SimpleType\",\"typeRef\":{\"$ref\":\"#/interfaces@2\"}},\"isOptional\":false}]},{\"$type\":\"Interface\",\"name\":\"RailroadZeroOrMoreExpr\",\"superTypes\":[{\"$ref\":\"#/interfaces@2\"}],\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"element\",\"type\":{\"$type\":\"SimpleType\",\"typeRef\":{\"$ref\":\"#/interfaces@2\"}},\"isOptional\":false}]},{\"$type\":\"Interface\",\"name\":\"RailroadTerminalExpr\",\"superTypes\":[{\"$ref\":\"#/interfaces@2\"}],\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"value\",\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"},\"isOptional\":false}]},{\"$type\":\"Interface\",\"name\":\"RailroadNonTerminalExpr\",\"superTypes\":[{\"$ref\":\"#/interfaces@2\"}],\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"name\",\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"},\"isOptional\":false}]},{\"$type\":\"Interface\",\"name\":\"RailroadSpecialExpr\",\"superTypes\":[{\"$ref\":\"#/interfaces@2\"}],\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"text\",\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"},\"isOptional\":false}]}],\"imports\":[],\"types\":[]}"), "RailroadGrammarGrammar"), ZE, QE = /* @__PURE__ */ P(() => ZE ??= zC("{\"$type\":\"Grammar\",\"isDeclared\":true,\"name\":\"RailroadPegGrammar\",\"rules\":[{\"$type\":\"TerminalRule\",\"name\":\"TITLE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ACC_TITLE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ACC_DESCR\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"PEG_ID\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"string\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[A-Z_a-z][\\\\w-]*/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"PEG_STRING\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"string\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\"([^\\\"\\\\\\\\]|\\\\\\\\.)*\\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"PEG_WHITESPACE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t \\\\r\\\\n]+/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"PEG_YAML\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"PEG_DIRECTIVE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"PEG_SINGLE_LINE_COMMENT\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*%%[^\\\\n\\\\r]*/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"PEG_LINE_COMMENT\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/#[^\\\\n\\\\r]*/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"ParserRule\",\"entry\":true,\"name\":\"RailroadPeg\",\"returnType\":{\"$ref\":\"#/interfaces@0\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"railroad-peg-beta\"},{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"title\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@0\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"accTitle\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@1\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"accDescr\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@2\"},\"arguments\":[]}}],\"cardinality\":\"*\"},{\"$type\":\"Assignment\",\"feature\":\"rules\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@11\"},\"arguments\":[]},\"cardinality\":\"*\"}]},\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"PegRule\",\"returnType\":{\"$ref\":\"#/interfaces@1\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"name\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@3\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\"<-\"},{\"$type\":\"Assignment\",\"feature\":\"definition\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@12\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\";\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"PegOrderedChoice\",\"returnType\":{\"$ref\":\"#/interfaces@2\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"alternatives\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@13\"},\"arguments\":[]}},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"/\"},{\"$type\":\"Assignment\",\"feature\":\"alternatives\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@13\"},\"arguments\":[]}}],\"cardinality\":\"*\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"PegSequence\",\"returnType\":{\"$ref\":\"#/interfaces@3\"},\"definition\":{\"$type\":\"Assignment\",\"feature\":\"elements\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@14\"},\"arguments\":[]},\"cardinality\":\"+\"},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"PegPrefix\",\"returnType\":{\"$ref\":\"#/interfaces@4\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"operator\",\"operator\":\"=\",\"terminal\":{\"$type\":\"Keyword\",\"value\":\"&\"}},{\"$type\":\"Assignment\",\"feature\":\"operator\",\"operator\":\"=\",\"terminal\":{\"$type\":\"Keyword\",\"value\":\"!\"}}],\"cardinality\":\"?\"},{\"$type\":\"Assignment\",\"feature\":\"suffix\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@15\"},\"arguments\":[]}}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"PegSuffix\",\"returnType\":{\"$ref\":\"#/interfaces@5\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"primary\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@16\"},\"arguments\":[]}},{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"operator\",\"operator\":\"=\",\"terminal\":{\"$type\":\"Keyword\",\"value\":\"?\"}},{\"$type\":\"Assignment\",\"feature\":\"operator\",\"operator\":\"=\",\"terminal\":{\"$type\":\"Keyword\",\"value\":\"*\"}},{\"$type\":\"Assignment\",\"feature\":\"operator\",\"operator\":\"=\",\"terminal\":{\"$type\":\"Keyword\",\"value\":\"+\"}}],\"cardinality\":\"?\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"PegPrimary\",\"returnType\":{\"$ref\":\"#/interfaces@6\"},\"definition\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@17\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@18\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@19\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@20\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"PegLiteral\",\"returnType\":{\"$ref\":\"#/interfaces@7\"},\"definition\":{\"$type\":\"Assignment\",\"feature\":\"value\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@4\"},\"arguments\":[]}},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"PegIdentifier\",\"returnType\":{\"$ref\":\"#/interfaces@8\"},\"definition\":{\"$type\":\"Assignment\",\"feature\":\"name\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@3\"},\"arguments\":[]}},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"PegGroup\",\"returnType\":{\"$ref\":\"#/interfaces@9\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"(\"},{\"$type\":\"Assignment\",\"feature\":\"element\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@12\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\")\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"PegAny\",\"returnType\":{\"$ref\":\"#/interfaces@10\"},\"definition\":{\"$type\":\"Assignment\",\"feature\":\"dot\",\"operator\":\"=\",\"terminal\":{\"$type\":\"Keyword\",\"value\":\".\"}},\"entry\":false,\"fragment\":false,\"parameters\":[]}],\"interfaces\":[{\"$type\":\"Interface\",\"name\":\"RailroadPeg\",\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"title\",\"isOptional\":true,\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"}},{\"$type\":\"TypeAttribute\",\"name\":\"accTitle\",\"isOptional\":true,\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"}},{\"$type\":\"TypeAttribute\",\"name\":\"accDescr\",\"isOptional\":true,\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"}},{\"$type\":\"TypeAttribute\",\"name\":\"rules\",\"type\":{\"$type\":\"ArrayType\",\"elementType\":{\"$type\":\"SimpleType\",\"typeRef\":{\"$ref\":\"#/interfaces@1\"}}},\"isOptional\":false}],\"superTypes\":[]},{\"$type\":\"Interface\",\"name\":\"PegRule\",\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"name\",\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"},\"isOptional\":false},{\"$type\":\"TypeAttribute\",\"name\":\"definition\",\"type\":{\"$type\":\"SimpleType\",\"typeRef\":{\"$ref\":\"#/interfaces@2\"}},\"isOptional\":false}],\"superTypes\":[]},{\"$type\":\"Interface\",\"name\":\"PegOrderedChoice\",\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"alternatives\",\"type\":{\"$type\":\"ArrayType\",\"elementType\":{\"$type\":\"SimpleType\",\"typeRef\":{\"$ref\":\"#/interfaces@3\"}}},\"isOptional\":false}],\"superTypes\":[]},{\"$type\":\"Interface\",\"name\":\"PegSequence\",\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"elements\",\"type\":{\"$type\":\"ArrayType\",\"elementType\":{\"$type\":\"SimpleType\",\"typeRef\":{\"$ref\":\"#/interfaces@4\"}}},\"isOptional\":false}],\"superTypes\":[]},{\"$type\":\"Interface\",\"name\":\"PegPrefix\",\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"operator\",\"isOptional\":true,\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"}},{\"$type\":\"TypeAttribute\",\"name\":\"suffix\",\"type\":{\"$type\":\"SimpleType\",\"typeRef\":{\"$ref\":\"#/interfaces@5\"}},\"isOptional\":false}],\"superTypes\":[]},{\"$type\":\"Interface\",\"name\":\"PegSuffix\",\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"primary\",\"type\":{\"$type\":\"SimpleType\",\"typeRef\":{\"$ref\":\"#/interfaces@6\"}},\"isOptional\":false},{\"$type\":\"TypeAttribute\",\"name\":\"operator\",\"isOptional\":true,\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"}}],\"superTypes\":[]},{\"$type\":\"Interface\",\"name\":\"PegPrimary\",\"attributes\":[],\"superTypes\":[]},{\"$type\":\"Interface\",\"name\":\"PegLiteral\",\"superTypes\":[{\"$ref\":\"#/interfaces@6\"}],\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"value\",\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"},\"isOptional\":false}]},{\"$type\":\"Interface\",\"name\":\"PegIdentifier\",\"superTypes\":[{\"$ref\":\"#/interfaces@6\"}],\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"name\",\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"},\"isOptional\":false}]},{\"$type\":\"Interface\",\"name\":\"PegGroup\",\"superTypes\":[{\"$ref\":\"#/interfaces@6\"}],\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"element\",\"type\":{\"$type\":\"SimpleType\",\"typeRef\":{\"$ref\":\"#/interfaces@2\"}},\"isOptional\":false}]},{\"$type\":\"Interface\",\"name\":\"PegAny\",\"superTypes\":[{\"$ref\":\"#/interfaces@6\"}],\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"dot\",\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"},\"isOptional\":false}]}],\"imports\":[],\"types\":[]}"), "RailroadPegGrammarGrammar"), $E, eD = /* @__PURE__ */ P(() => $E ??= zC("{\"$type\":\"Grammar\",\"isDeclared\":true,\"name\":\"TreemapGrammar\",\"rules\":[{\"$type\":\"ParserRule\",\"fragment\":true,\"name\":\"TitleAndAccessibilities\",\"definition\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"accDescr\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@2\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"accTitle\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@3\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"title\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@4\"},\"arguments\":[]}}],\"cardinality\":\"+\"},\"entry\":false,\"parameters\":[]},{\"$type\":\"TerminalRule\",\"name\":\"BOOLEAN\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"boolean\"},\"definition\":{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"true\"},\"parenthesized\":false},{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"false\"},\"parenthesized\":false}],\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ACC_DESCR\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ACC_TITLE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"TITLE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"ParserRule\",\"entry\":true,\"name\":\"Treemap\",\"returnType\":{\"$ref\":\"#/interfaces@4\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@6\"},\"arguments\":[]},{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@0\"},\"arguments\":[]},{\"$type\":\"Assignment\",\"feature\":\"TreemapRows\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@15\"},\"arguments\":[]}}],\"cardinality\":\"*\"}]},\"fragment\":false,\"parameters\":[]},{\"$type\":\"TerminalRule\",\"name\":\"TREEMAP_KEYWORD\",\"definition\":{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"treemap-beta\"},\"parenthesized\":false},{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"treemap\"},\"parenthesized\":false}],\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"CLASS_DEF\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/classDef\\\\s+([a-zA-Z_][a-zA-Z0-9_]+)(?:\\\\s+([^;\\\\r\\\\n]*))?(?:;)?/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"STYLE_SEPARATOR\",\"definition\":{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\":::\"},\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"SEPARATOR\",\"definition\":{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\":\"},\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"COMMA\",\"definition\":{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\",\"},\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"INDENTATION\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[ \\\\t]{1,}/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"WS\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[ \\\\t]+/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"ML_COMMENT\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\\%\\\\%[^\\\\n]*/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"NL\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\\r?\\\\n/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"ParserRule\",\"name\":\"TreemapRow\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"indent\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@11\"},\"arguments\":[]},\"cardinality\":\"?\"},{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"item\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@17\"},\"arguments\":[]}},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@16\"},\"arguments\":[]}]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"ClassDef\",\"dataType\":\"string\",\"definition\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@7\"},\"arguments\":[]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"Item\",\"returnType\":{\"$ref\":\"#/interfaces@0\"},\"definition\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@19\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@18\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"Section\",\"returnType\":{\"$ref\":\"#/interfaces@1\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"name\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@23\"},\"arguments\":[]}},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@8\"},\"arguments\":[]},{\"$type\":\"Assignment\",\"feature\":\"classSelector\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@20\"},\"arguments\":[]}}],\"cardinality\":\"?\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"Leaf\",\"returnType\":{\"$ref\":\"#/interfaces@2\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"name\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@23\"},\"arguments\":[]}},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@11\"},\"arguments\":[],\"cardinality\":\"?\"},{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@9\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@10\"},\"arguments\":[]}]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@11\"},\"arguments\":[],\"cardinality\":\"?\"},{\"$type\":\"Assignment\",\"feature\":\"value\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@22\"},\"arguments\":[]}},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@8\"},\"arguments\":[]},{\"$type\":\"Assignment\",\"feature\":\"classSelector\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@20\"},\"arguments\":[]}}],\"cardinality\":\"?\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"TerminalRule\",\"name\":\"ID2\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[a-zA-Z_][a-zA-Z0-9_]*/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"NUMBER2\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[0-9_\\\\.\\\\,]+/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"ParserRule\",\"name\":\"MyNumber\",\"dataType\":\"number\",\"definition\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@21\"},\"arguments\":[]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"TerminalRule\",\"name\":\"STRING2\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\"[^\\\"]*\\\"|'[^']*'/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false}],\"interfaces\":[{\"$type\":\"Interface\",\"name\":\"Item\",\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"name\",\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"},\"isOptional\":false},{\"$type\":\"TypeAttribute\",\"name\":\"classSelector\",\"isOptional\":true,\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"}}],\"superTypes\":[]},{\"$type\":\"Interface\",\"name\":\"Section\",\"superTypes\":[{\"$ref\":\"#/interfaces@0\"}],\"attributes\":[]},{\"$type\":\"Interface\",\"name\":\"Leaf\",\"superTypes\":[{\"$ref\":\"#/interfaces@0\"}],\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"value\",\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"number\"},\"isOptional\":false}]},{\"$type\":\"Interface\",\"name\":\"ClassDefStatement\",\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"className\",\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"},\"isOptional\":false},{\"$type\":\"TypeAttribute\",\"name\":\"styleText\",\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"},\"isOptional\":false}],\"superTypes\":[]},{\"$type\":\"Interface\",\"name\":\"Treemap\",\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"TreemapRows\",\"type\":{\"$type\":\"ArrayType\",\"elementType\":{\"$type\":\"SimpleType\",\"typeRef\":{\"$ref\":\"#/rules@15\"}}},\"isOptional\":false},{\"$type\":\"TypeAttribute\",\"name\":\"title\",\"isOptional\":true,\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"}},{\"$type\":\"TypeAttribute\",\"name\":\"accTitle\",\"isOptional\":true,\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"}},{\"$type\":\"TypeAttribute\",\"name\":\"accDescr\",\"isOptional\":true,\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"}}],\"superTypes\":[]}],\"imports\":[],\"types\":[],\"$comment\":\"/**\\n * Treemap grammar for Langium\\n * Converted from mindmap grammar\\n *\\n * The ML_COMMENT and NL hidden terminals handle whitespace, comments, and newlines\\n * before the treemap keyword, allowing for empty lines and comments before the\\n * treemap declaration.\\n */\"}"), "TreemapGrammarGrammar"), tD, nD = /* @__PURE__ */ P(() => tD ??= zC("{\"$type\":\"Grammar\",\"isDeclared\":true,\"name\":\"TreeViewGrammar\",\"rules\":[{\"$type\":\"TerminalRule\",\"name\":\"ACC_DESCR\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ACC_TITLE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"TITLE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"ParserRule\",\"entry\":true,\"name\":\"TreeView\",\"returnType\":{\"$ref\":\"#/interfaces@0\"},\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"treeView-beta\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@4\"},\"arguments\":[],\"cardinality\":\"?\"},{\"$type\":\"Assignment\",\"feature\":\"nodes\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@14\"},\"arguments\":[]},\"cardinality\":\"*\"}]},\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"fragment\":true,\"name\":\"TitleAndAccessibilities\",\"definition\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"accDescr\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@0\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"accTitle\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@1\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"title\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@2\"},\"arguments\":[]}}],\"cardinality\":\"+\"},\"entry\":false,\"parameters\":[]},{\"$type\":\"TerminalRule\",\"name\":\"CLASS_ANNOTATION\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[ \\\\t]+:::[ \\\\t]*[A-Za-z_][\\\\w-]*/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ICON_ANNOTATION\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[ \\\\t]+icon\\\\([\\\\w-]*(?::[\\\\w-]+)?\\\\)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"DESC_ANNOTATION\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[ \\\\t]+##[^\\\\n\\\\r]*/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"INDENTATION\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[ \\\\t]{1,}/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"QUOTED_NAME\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\"[^\\\"]*\\\"|'[^']*'/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"WS\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[ \\\\t]+/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"ML_COMMENT\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\\%\\\\%[^\\\\n]*/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"NL\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\\r?\\\\n/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"name\":\"BARE_NAME\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/(?!:::|icon\\\\(|##)[^ \\\\t\\\\n\\\\r\\\"'](?:(?![ \\\\t]+:::[ \\\\t]*[A-Za-z_]|[ \\\\t]+icon\\\\(|[ \\\\t]+##)[^\\\\n\\\\r])*/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"ParserRule\",\"name\":\"TreeNode\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"indent\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@8\"},\"arguments\":[]},\"cardinality\":\"?\"},{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"name\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@9\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"name\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@13\"},\"arguments\":[]}}]},{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"classAnnotation\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@5\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"iconAnnotation\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@6\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"descAnnotation\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@7\"},\"arguments\":[]}}],\"cardinality\":\"*\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]}],\"interfaces\":[{\"$type\":\"Interface\",\"name\":\"TreeView\",\"attributes\":[{\"$type\":\"TypeAttribute\",\"name\":\"nodes\",\"type\":{\"$type\":\"ArrayType\",\"elementType\":{\"$type\":\"SimpleType\",\"typeRef\":{\"$ref\":\"#/rules@14\"}}},\"isOptional\":false},{\"$type\":\"TypeAttribute\",\"name\":\"title\",\"isOptional\":true,\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"}},{\"$type\":\"TypeAttribute\",\"name\":\"accTitle\",\"isOptional\":true,\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"}},{\"$type\":\"TypeAttribute\",\"name\":\"accDescr\",\"isOptional\":true,\"type\":{\"$type\":\"SimpleType\",\"primitiveType\":\"string\"}}],\"superTypes\":[]}],\"imports\":[],\"types\":[],\"$comment\":\"/**\\n * TreeView grammar for Langium\\n *\\n * Supports both quoted labels (\\\"my file\\\") and bare labels (index.js).\\n * Annotations (:::class, icon(), ## description) are parsed directly into\\n * AST fields by the grammar. Value conversion for stripping quotes, extracting\\n * class names, icon names, and description text happens in valueConverter.ts.\\n *\\n * The ML_COMMENT and NL hidden terminals handle whitespace, comments, and newlines\\n * before the treeView keyword, allowing for empty lines and comments before the\\n * treeView declaration.\\n */\"}"), "TreeViewGrammarGrammar"), rD, iD = /* @__PURE__ */ P(() => rD ??= zC("{\"$type\":\"Grammar\",\"isDeclared\":true,\"name\":\"WardleyGrammar\",\"imports\":[],\"rules\":[{\"$type\":\"ParserRule\",\"entry\":true,\"name\":\"Wardley\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@52\"},\"arguments\":[],\"cardinality\":\"*\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@25\"},\"arguments\":[]},{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@52\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@42\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@1\"},\"arguments\":[]}],\"cardinality\":\"*\"}]},\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"fragment\":true,\"name\":\"Statement\",\"definition\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"size\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@2\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"evolution\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@3\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"anchors\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@5\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"components\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@6\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"links\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@9\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"evolves\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@10\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"pipelines\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@11\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"notes\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@13\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"annotations\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@14\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"annotation\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@15\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"accelerators\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@17\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"deaccelerators\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@18\"},\"arguments\":[]}}]},\"entry\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"Size\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@26\"},\"arguments\":[]},{\"$type\":\"Keyword\",\"value\":\"[\"},{\"$type\":\"Assignment\",\"feature\":\"width\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@48\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\",\"},{\"$type\":\"Assignment\",\"feature\":\"height\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@48\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\"]\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@41\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"Evolution\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@27\"},\"arguments\":[]},{\"$type\":\"Assignment\",\"feature\":\"stages\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@4\"},\"arguments\":[]}},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@20\"},\"arguments\":[]},{\"$type\":\"Assignment\",\"feature\":\"stages\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@4\"},\"arguments\":[]}}],\"cardinality\":\"+\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@41\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"EvolutionStage\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"name\",\"operator\":\"=\",\"terminal\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@51\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@50\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@39\"},\"arguments\":[]}]}},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"@\"},{\"$type\":\"Assignment\",\"feature\":\"boundary\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@19\"},\"arguments\":[]}}],\"cardinality\":\"?\"},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"/\"},{\"$type\":\"Assignment\",\"feature\":\"secondName\",\"operator\":\"=\",\"terminal\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@51\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@50\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@39\"},\"arguments\":[]}]}}],\"cardinality\":\"?\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"Anchor\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@28\"},\"arguments\":[]},{\"$type\":\"Assignment\",\"feature\":\"name\",\"operator\":\"=\",\"terminal\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@50\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@51\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@39\"},\"arguments\":[]}]}},{\"$type\":\"Keyword\",\"value\":\"[\"},{\"$type\":\"Assignment\",\"feature\":\"visibility\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@19\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\",\"},{\"$type\":\"Assignment\",\"feature\":\"evolution\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@19\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\"]\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@41\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"Component\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@29\"},\"arguments\":[]},{\"$type\":\"Assignment\",\"feature\":\"name\",\"operator\":\"=\",\"terminal\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@50\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@51\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@39\"},\"arguments\":[]}]}},{\"$type\":\"Keyword\",\"value\":\"[\"},{\"$type\":\"Assignment\",\"feature\":\"visibility\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@19\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\",\"},{\"$type\":\"Assignment\",\"feature\":\"evolution\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@19\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\"]\"},{\"$type\":\"Assignment\",\"feature\":\"label\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@7\"},\"arguments\":[]},\"cardinality\":\"?\"},{\"$type\":\"Assignment\",\"feature\":\"decorator\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@8\"},\"arguments\":[]},\"cardinality\":\"?\"},{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"inertia\",\"operator\":\"?=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@31\"},\"arguments\":[]}},{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"(\"},{\"$type\":\"Assignment\",\"feature\":\"inertia\",\"operator\":\"?=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@31\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\")\"}]}],\"cardinality\":\"?\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@41\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"Label\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@30\"},\"arguments\":[]},{\"$type\":\"Keyword\",\"value\":\"[\"},{\"$type\":\"Assignment\",\"feature\":\"negX\",\"operator\":\"?=\",\"terminal\":{\"$type\":\"Keyword\",\"value\":\"-\"},\"cardinality\":\"?\"},{\"$type\":\"Assignment\",\"feature\":\"offsetX\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@48\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\",\"},{\"$type\":\"Assignment\",\"feature\":\"negY\",\"operator\":\"?=\",\"terminal\":{\"$type\":\"Keyword\",\"value\":\"-\"},\"cardinality\":\"?\"},{\"$type\":\"Assignment\",\"feature\":\"offsetY\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@48\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\"]\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"Decorator\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Keyword\",\"value\":\"(\"},{\"$type\":\"Assignment\",\"feature\":\"strategy\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@24\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\")\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"Link\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"from\",\"operator\":\"=\",\"terminal\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@50\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@51\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@39\"},\"arguments\":[]}]}},{\"$type\":\"Assignment\",\"feature\":\"fromPort\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@21\"},\"arguments\":[]},\"cardinality\":\"?\"},{\"$type\":\"Assignment\",\"feature\":\"arrow\",\"operator\":\"=\",\"terminal\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@22\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@20\"},\"arguments\":[]}]},\"cardinality\":\"?\"},{\"$type\":\"Assignment\",\"feature\":\"to\",\"operator\":\"=\",\"terminal\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@50\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@51\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@39\"},\"arguments\":[]}]}},{\"$type\":\"Assignment\",\"feature\":\"toPort\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@21\"},\"arguments\":[]},\"cardinality\":\"?\"},{\"$type\":\"Assignment\",\"feature\":\"linkLabel\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@23\"},\"arguments\":[]},\"cardinality\":\"?\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@41\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"Evolve\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@32\"},\"arguments\":[]},{\"$type\":\"Assignment\",\"feature\":\"component\",\"operator\":\"=\",\"terminal\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@50\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@51\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@39\"},\"arguments\":[]}]}},{\"$type\":\"Assignment\",\"feature\":\"target\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@19\"},\"arguments\":[]}},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@41\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"Pipeline\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@33\"},\"arguments\":[]},{\"$type\":\"Assignment\",\"feature\":\"parent\",\"operator\":\"=\",\"terminal\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@50\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@51\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@39\"},\"arguments\":[]}]}},{\"$type\":\"Keyword\",\"value\":\"{\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@52\"},\"arguments\":[],\"cardinality\":\"+\"},{\"$type\":\"Assignment\",\"feature\":\"components\",\"operator\":\"+=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@12\"},\"arguments\":[]},\"cardinality\":\"+\"},{\"$type\":\"Keyword\",\"value\":\"}\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@41\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"PipelineComponent\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@29\"},\"arguments\":[]},{\"$type\":\"Assignment\",\"feature\":\"name\",\"operator\":\"=\",\"terminal\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@50\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@51\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@39\"},\"arguments\":[]}]}},{\"$type\":\"Keyword\",\"value\":\"[\"},{\"$type\":\"Assignment\",\"feature\":\"evolution\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@19\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\"]\"},{\"$type\":\"Assignment\",\"feature\":\"label\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@7\"},\"arguments\":[]},\"cardinality\":\"?\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@41\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"Note\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@34\"},\"arguments\":[]},{\"$type\":\"Assignment\",\"feature\":\"text\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@50\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\"[\"},{\"$type\":\"Assignment\",\"feature\":\"visibility\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@19\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\",\"},{\"$type\":\"Assignment\",\"feature\":\"evolution\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@19\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\"]\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@41\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"Annotations\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@35\"},\"arguments\":[]},{\"$type\":\"Keyword\",\"value\":\"[\"},{\"$type\":\"Assignment\",\"feature\":\"x\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@16\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\",\"},{\"$type\":\"Assignment\",\"feature\":\"y\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@16\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\"]\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@41\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"Annotation\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@36\"},\"arguments\":[]},{\"$type\":\"Assignment\",\"feature\":\"number\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@48\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\",\"},{\"$type\":\"Keyword\",\"value\":\"[\"},{\"$type\":\"Assignment\",\"feature\":\"x\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@16\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\",\"},{\"$type\":\"Assignment\",\"feature\":\"y\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@16\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\"]\"},{\"$type\":\"Assignment\",\"feature\":\"text\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@50\"},\"arguments\":[]}},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@41\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"CoordinateValue\",\"dataType\":\"number\",\"definition\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@19\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@48\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"Accelerator\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@37\"},\"arguments\":[]},{\"$type\":\"Assignment\",\"feature\":\"name\",\"operator\":\"=\",\"terminal\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@50\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@51\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@39\"},\"arguments\":[]}]}},{\"$type\":\"Keyword\",\"value\":\"[\"},{\"$type\":\"Assignment\",\"feature\":\"x\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@19\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\",\"},{\"$type\":\"Assignment\",\"feature\":\"y\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@19\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\"]\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@41\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"name\":\"Deaccelerator\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@38\"},\"arguments\":[]},{\"$type\":\"Assignment\",\"feature\":\"name\",\"operator\":\"=\",\"terminal\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@50\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@51\"},\"arguments\":[]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@39\"},\"arguments\":[]}]}},{\"$type\":\"Keyword\",\"value\":\"[\"},{\"$type\":\"Assignment\",\"feature\":\"x\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@19\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\",\"},{\"$type\":\"Assignment\",\"feature\":\"y\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@19\"},\"arguments\":[]}},{\"$type\":\"Keyword\",\"value\":\"]\"},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@41\"},\"arguments\":[]}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"TerminalRule\",\"name\":\"WARDLEY_NUMBER\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"number\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[0-9]+\\\\.[0-9]+/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ARROW\",\"definition\":{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"->\"},\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"LINK_PORT\",\"definition\":{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"+<>\"},\"parenthesized\":false},{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"+>\"},\"parenthesized\":false}],\"parenthesized\":false},{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"+<\"},\"parenthesized\":false}],\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"LINK_ARROW\",\"definition\":{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"-->\"},\"parenthesized\":false},{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"-.->\"},\"parenthesized\":false}],\"parenthesized\":false},{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\">\"},\"parenthesized\":false}],\"parenthesized\":false},{\"$type\":\"RegexToken\",\"regex\":\"/\\\\+'[^']*'<>/\",\"parenthesized\":false}],\"parenthesized\":false},{\"$type\":\"RegexToken\",\"regex\":\"/\\\\+'[^']*'</\",\"parenthesized\":false}],\"parenthesized\":false},{\"$type\":\"RegexToken\",\"regex\":\"/\\\\+'[^']*'>/\",\"parenthesized\":false}],\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"LINK_LABEL\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/;[^\\\\n\\\\r]+/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"STRATEGY\",\"definition\":{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"build\"},\"parenthesized\":false},{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"buy\"},\"parenthesized\":false}],\"parenthesized\":false},{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"outsource\"},\"parenthesized\":false}],\"parenthesized\":false},{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"market\"},\"parenthesized\":false}],\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"KW_WARDLEY\",\"definition\":{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"wardley-beta\"},\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"KW_SIZE\",\"definition\":{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"size\"},\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"KW_EVOLUTION\",\"definition\":{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"evolution\"},\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"KW_ANCHOR\",\"definition\":{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"anchor\"},\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"KW_COMPONENT\",\"definition\":{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"component\"},\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"KW_LABEL\",\"definition\":{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"label\"},\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"KW_INERTIA\",\"definition\":{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"inertia\"},\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"KW_EVOLVE\",\"definition\":{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"evolve\"},\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"KW_PIPELINE\",\"definition\":{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"pipeline\"},\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"KW_NOTE\",\"definition\":{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"note\"},\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"KW_ANNOTATIONS\",\"definition\":{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"annotations\"},\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"KW_ANNOTATION\",\"definition\":{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"annotation\"},\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"KW_ACCELERATOR\",\"definition\":{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"accelerator\"},\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"KW_DEACCELERATOR\",\"definition\":{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"deaccelerator\"},\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"NAME_WITH_SPACES\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/(?!title\\\\s|accTitle|accDescr)[A-Za-z](?:[A-Za-z0-9_()&]|-(?!>))*(?:[ \\\\t]+[A-Za-z(](?:[A-Za-z0-9_()&]|-(?!>))*)*/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"WS\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[ \\\\t]+/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"ParserRule\",\"name\":\"EOL\",\"dataType\":\"string\",\"definition\":{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@52\"},\"arguments\":[],\"cardinality\":\"+\"},{\"$type\":\"EndOfFile\"}]},\"entry\":false,\"fragment\":false,\"parameters\":[]},{\"$type\":\"ParserRule\",\"fragment\":true,\"name\":\"TitleAndAccessibilities\",\"definition\":{\"$type\":\"Group\",\"elements\":[{\"$type\":\"Alternatives\",\"elements\":[{\"$type\":\"Assignment\",\"feature\":\"accDescr\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@44\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"accTitle\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@45\"},\"arguments\":[]}},{\"$type\":\"Assignment\",\"feature\":\"title\",\"operator\":\"=\",\"terminal\":{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@46\"},\"arguments\":[]}}]},{\"$type\":\"RuleCall\",\"rule\":{\"$ref\":\"#/rules@41\"},\"arguments\":[]}],\"cardinality\":\"+\"},\"entry\":false,\"parameters\":[]},{\"$type\":\"TerminalRule\",\"name\":\"BOOLEAN\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"boolean\"},\"definition\":{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"true\"},\"parenthesized\":false},{\"$type\":\"CharacterRange\",\"left\":{\"$type\":\"Keyword\",\"value\":\"false\"},\"parenthesized\":false}],\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ACC_DESCR\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*accDescr(?:[\\\\t ]*:([^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)|\\\\s*{([^}]*)})/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ACC_TITLE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*accTitle[\\\\t ]*:(?:[^\\\\n\\\\r]*?(?=%%)|[^\\\\n\\\\r]*)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"TITLE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*title(?:[\\\\t ][^\\\\n\\\\r]*?(?=%%)|[\\\\t ][^\\\\n\\\\r]*|)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"FLOAT\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"number\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[0-9]+\\\\.[0-9]+(?!\\\\.)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"INT\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"number\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/0|[1-9][0-9]*(?!\\\\.)/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"NUMBER\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"number\"},\"definition\":{\"$type\":\"TerminalAlternatives\",\"elements\":[{\"$type\":\"TerminalRuleCall\",\"rule\":{\"$ref\":\"#/rules@47\"},\"parenthesized\":false},{\"$type\":\"TerminalRuleCall\",\"rule\":{\"$ref\":\"#/rules@48\"},\"parenthesized\":false}],\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"STRING\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"string\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\"([^\\\"\\\\\\\\]|\\\\\\\\.)*\\\"|'([^'\\\\\\\\]|\\\\\\\\.)*'/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"ID\",\"type\":{\"$type\":\"ReturnType\",\"name\":\"string\"},\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\w]([-\\\\w]*\\\\w)?/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"name\":\"NEWLINE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/\\\\r?\\\\n/\",\"parenthesized\":false},\"fragment\":false,\"hidden\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"WHITESPACE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]+/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"YAML\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/---[\\\\t ]*\\\\r?\\\\n(?:[\\\\S\\\\s]*?\\\\r?\\\\n)?---(?:\\\\r?\\\\n|(?!\\\\S))/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"DIRECTIVE\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*%%{[\\\\S\\\\s]*?}%%(?:\\\\r?\\\\n|(?!\\\\S))/\",\"parenthesized\":false},\"fragment\":false},{\"$type\":\"TerminalRule\",\"hidden\":true,\"name\":\"SINGLE_LINE_COMMENT\",\"definition\":{\"$type\":\"RegexToken\",\"regex\":\"/[\\\\t ]*%%[^\\\\n\\\\r]*/\",\"parenthesized\":false},\"fragment\":false}],\"interfaces\":[],\"types\":[]}"), "WardleyGrammarGrammar"), aD = {
	languageId: "architecture",
	fileExtensions: [".mmd", ".mermaid"],
	caseInsensitive: !1,
	mode: "production"
}, oD = {
	languageId: "cynefin",
	fileExtensions: [".mmd", ".mermaid"],
	caseInsensitive: !1,
	mode: "production"
}, sD = {
	languageId: "eventmodeling",
	fileExtensions: [".mmd", ".mermaid"],
	caseInsensitive: !1,
	mode: "production"
}, cD = {
	languageId: "gitGraph",
	fileExtensions: [".mmd", ".mermaid"],
	caseInsensitive: !1,
	mode: "production"
}, lD = {
	languageId: "info",
	fileExtensions: [".mmd", ".mermaid"],
	caseInsensitive: !1,
	mode: "production"
}, uD = {
	languageId: "packet",
	fileExtensions: [".mmd", ".mermaid"],
	caseInsensitive: !1,
	mode: "production"
}, dD = {
	languageId: "pie",
	fileExtensions: [".mmd", ".mermaid"],
	caseInsensitive: !1,
	mode: "production"
}, fD = {
	languageId: "radar",
	fileExtensions: [".mmd", ".mermaid"],
	caseInsensitive: !1,
	mode: "production"
}, pD = {
	languageId: "railroadAbnf",
	fileExtensions: [".mmd", ".mermaid"],
	caseInsensitive: !1,
	mode: "production"
}, mD = {
	languageId: "railroadEbnf",
	fileExtensions: [".mmd", ".mermaid"],
	caseInsensitive: !1,
	mode: "production"
}, hD = {
	languageId: "railroad",
	fileExtensions: [".mmd", ".mermaid"],
	caseInsensitive: !1,
	mode: "production"
}, gD = {
	languageId: "railroadPeg",
	fileExtensions: [".mmd", ".mermaid"],
	caseInsensitive: !1,
	mode: "production"
}, _D = {
	languageId: "treemap",
	fileExtensions: [".mmd", ".mermaid"],
	caseInsensitive: !1,
	mode: "production"
}, vD = {
	languageId: "treeView",
	fileExtensions: [".mmd", ".mermaid"],
	caseInsensitive: !1,
	mode: "production"
}, yD = {
	languageId: "wardley",
	fileExtensions: [".mmd", ".mermaid"],
	caseInsensitive: !1,
	mode: "production"
}, bD = { AstReflection: /* @__PURE__ */ P(() => new OE(), "AstReflection") }, xD = {
	Grammar: /* @__PURE__ */ P(() => AE(), "Grammar"),
	LanguageMetaData: /* @__PURE__ */ P(() => aD, "LanguageMetaData"),
	parser: {}
}, SD = {
	Grammar: /* @__PURE__ */ P(() => ME(), "Grammar"),
	LanguageMetaData: /* @__PURE__ */ P(() => oD, "LanguageMetaData"),
	parser: {}
}, CD = {
	Grammar: /* @__PURE__ */ P(() => PE(), "Grammar"),
	LanguageMetaData: /* @__PURE__ */ P(() => sD, "LanguageMetaData"),
	parser: {}
}, wD = {
	Grammar: /* @__PURE__ */ P(() => IE(), "Grammar"),
	LanguageMetaData: /* @__PURE__ */ P(() => cD, "LanguageMetaData"),
	parser: {}
}, TD = {
	Grammar: /* @__PURE__ */ P(() => RE(), "Grammar"),
	LanguageMetaData: /* @__PURE__ */ P(() => lD, "LanguageMetaData"),
	parser: {}
}, ED = {
	Grammar: /* @__PURE__ */ P(() => BE(), "Grammar"),
	LanguageMetaData: /* @__PURE__ */ P(() => uD, "LanguageMetaData"),
	parser: {}
}, DD = {
	Grammar: /* @__PURE__ */ P(() => HE(), "Grammar"),
	LanguageMetaData: /* @__PURE__ */ P(() => dD, "LanguageMetaData"),
	parser: {}
}, OD = {
	Grammar: /* @__PURE__ */ P(() => WE(), "Grammar"),
	LanguageMetaData: /* @__PURE__ */ P(() => fD, "LanguageMetaData"),
	parser: {}
}, kD = {
	Grammar: /* @__PURE__ */ P(() => KE(), "Grammar"),
	LanguageMetaData: /* @__PURE__ */ P(() => pD, "LanguageMetaData"),
	parser: {}
}, AD = {
	Grammar: /* @__PURE__ */ P(() => JE(), "Grammar"),
	LanguageMetaData: /* @__PURE__ */ P(() => mD, "LanguageMetaData"),
	parser: {}
}, jD = {
	Grammar: /* @__PURE__ */ P(() => XE(), "Grammar"),
	LanguageMetaData: /* @__PURE__ */ P(() => hD, "LanguageMetaData"),
	parser: {}
}, MD = {
	Grammar: /* @__PURE__ */ P(() => QE(), "Grammar"),
	LanguageMetaData: /* @__PURE__ */ P(() => gD, "LanguageMetaData"),
	parser: {}
}, ND = {
	Grammar: /* @__PURE__ */ P(() => eD(), "Grammar"),
	LanguageMetaData: /* @__PURE__ */ P(() => _D, "LanguageMetaData"),
	parser: {}
}, PD = {
	Grammar: /* @__PURE__ */ P(() => nD(), "Grammar"),
	LanguageMetaData: /* @__PURE__ */ P(() => vD, "LanguageMetaData"),
	parser: {}
}, FD = {
	Grammar: /* @__PURE__ */ P(() => iD(), "Grammar"),
	LanguageMetaData: /* @__PURE__ */ P(() => yD, "LanguageMetaData"),
	parser: {}
}, ID = {
	ACC_DESCR: /accDescr(?:[\t ]*:([^\n\r]*)|\s*{([^}]*)})/,
	ACC_TITLE: /accTitle[\t ]*:([^\n\r]*)/,
	TITLE: /title([\t ][^\n\r]*|)/
}, LD = (Lt = class extends jx {
	runConverter(e, t, n) {
		let r = this.runCommonConverter(e, t, n);
		return r === void 0 && (r = this.runCustomConverter(e, t, n)), r === void 0 ? super.runConverter(e, t, n) : r;
	}
	runCommonConverter(e, t, n) {
		let r = ID[e.name];
		if (r === void 0) return;
		let i = r.exec(t);
		if (i !== null) {
			if (i[1] !== void 0) return i[1].trim().replace(/[\t ]{2,}/gm, " ");
			if (i[2] !== void 0) return i[2].replace(/^\s*/gm, "").replace(/\s+$/gm, "").replace(/[\t ]{2,}/gm, " ").replace(/[\n\r]{2,}/gm, "\n");
		}
	}
}, P(Lt, "AbstractMermaidValueConverter"), Lt), RD = (Rt = class extends LD {
	runCustomConverter(e, t, n) {}
}, P(Rt, "CommonValueConverter"), Rt), zD = (zt = class extends Ax {
	constructor(e) {
		super(), this.keywords = new Set(e);
	}
	buildKeywordTokens(e, t, n) {
		let r = super.buildKeywordTokens(e, t, n);
		return r.forEach((e) => {
			this.keywords.has(e.name) && e.PATTERN !== void 0 && (e.PATTERN = RegExp(e.PATTERN.toString() + "(?:(?=%%)|(?!\\S))"));
		}), r;
	}
}, P(zt, "AbstractMermaidTokenBuilder"), zt);
Bt = class extends zD {}, P(Bt, "CommonTokenBuilder");
// node_modules/.pnpm/@file-viewer+capability-mermaid@3.3.0/node_modules/@file-viewer/capability-mermaid/dist/mermaid-parser.core-AW4Xqdc2.js
var BD = class extends zD {
	constructor() {
		super(["architecture"]);
	}
}, VD, HD = (P(BD, "ArchitectureTokenBuilder"), BD), UD = (VD = class extends LD {
	runCustomConverter(e, t, n) {
		if (e.name === "ARCH_ICON") return t.replace(/[()]/g, "").trim();
		if (e.name === "ARCH_TEXT_ICON") return t.replace(/["()]/g, "");
		if (e.name === "ARCH_TITLE") {
			let e = t.replace(/^\[|]$/g, "").trim();
			return (e.startsWith("\"") && e.endsWith("\"") || e.startsWith("'") && e.endsWith("'")) && (e = e.slice(1, -1), e = e.replace(/\\"/g, "\"").replace(/\\'/g, "'")), e.trim();
		}
	}
}, P(VD, "ArchitectureValueConverter"), VD), WD = { parser: {
	TokenBuilder: /* @__PURE__ */ P(() => new HD(), "TokenBuilder"),
	ValueConverter: /* @__PURE__ */ P(() => new UD(), "ValueConverter")
} };
function GD(e = FC) {
	let t = Q(DC(e), bD), n = Q(EC({ shared: t }), xD, WD);
	return t.ServiceRegistry.register(n), {
		shared: t,
		Architecture: n
	};
}
P(GD, "createArchitectureServices");
var KD = class extends zD {
	constructor() {
		super(["cynefin-beta"]);
	}
}, qD = (P(KD, "CynefinTokenBuilder"), KD), JD = { parser: {
	TokenBuilder: /* @__PURE__ */ P(() => new qD(), "TokenBuilder"),
	ValueConverter: /* @__PURE__ */ P(() => new RD(), "ValueConverter")
} };
function YD(e = FC) {
	let t = Q(DC(e), bD), n = Q(EC({ shared: t }), SD, JD);
	return t.ServiceRegistry.register(n), {
		shared: t,
		Cynefin: n
	};
}
P(YD, "createCynefinServices");
var XD = class extends zD {
	constructor() {
		super(["eventmodeling"]);
	}
}, ZD, QD = (P(XD, "EventModelingTokenBuilder"), XD), $D = /* @__PURE__ */ new Set(["cmd", "command"]), eO = /* @__PURE__ */ new Set(["evt", "event"]), tO = /* @__PURE__ */ new Set(["rmo", "readmodel"]), nO = /* @__PURE__ */ new Set(["pcr", "processor"]), rO = /* @__PURE__ */ new Set(["ui"]);
function iO(e) {
	let t = e.validation.EventModelingValidator, n = e.validation.ValidationRegistry;
	if (n) {
		let e = {
			EmTimeFrame: t.checkSourceFrameTypes.bind(t),
			EmResetFrame: t.checkSourceFrameTypes.bind(t)
		};
		n.register(e, t);
	}
}
P(iO, "registerValidationChecks");
var aO = (ZD = class {
	checkSourceFrameTypes(e, t) {
		e.sourceFrames.length !== 0 && ($D.has(e.modelEntityType) ? this.validateSources(e, /* @__PURE__ */ new Set([...rO, ...nO]), "command", "ui or processor", t) : eO.has(e.modelEntityType) ? this.validateSources(e, $D, "event", "command", t) : tO.has(e.modelEntityType) ? this.validateSources(e, eO, "read model", "event", t) : nO.has(e.modelEntityType) ? this.validateSources(e, tO, "processor", "read model", t) : rO.has(e.modelEntityType) && this.validateSources(e, tO, "ui", "read model", t));
	}
	validateSources(e, t, n, r, i) {
		for (let a of e.sourceFrames) {
			let o = a.ref;
			o !== void 0 && !t.has(o.modelEntityType) && i("error", `A ${n} can only receive input from a ${r}, not from '${o.modelEntityType}'.`, {
				node: e,
				property: "sourceFrames"
			});
		}
	}
}, P(ZD, "EventModelingValidator"), ZD), oO = {
	parser: {
		TokenBuilder: /* @__PURE__ */ P(() => new QD(), "TokenBuilder"),
		ValueConverter: /* @__PURE__ */ P(() => new RD(), "ValueConverter")
	},
	validation: { EventModelingValidator: /* @__PURE__ */ P(() => new aO(), "EventModelingValidator") }
};
function sO(e = FC) {
	let t = Q(DC(e), bD), n = Q(EC({ shared: t }), CD, oO);
	return t.ServiceRegistry.register(n), iO(n), {
		shared: t,
		EventModel: n
	};
}
P(sO, "createEventModelingServices");
var cO = class extends zD {
	constructor() {
		super(["gitGraph"]);
	}
}, lO = (P(cO, "GitGraphTokenBuilder"), cO), uO = { parser: {
	TokenBuilder: /* @__PURE__ */ P(() => new lO(), "TokenBuilder"),
	ValueConverter: /* @__PURE__ */ P(() => new RD(), "ValueConverter")
} };
function dO(e = FC) {
	let t = Q(DC(e), bD), n = Q(EC({ shared: t }), wD, uO);
	return t.ServiceRegistry.register(n), {
		shared: t,
		GitGraph: n
	};
}
P(dO, "createGitGraphServices");
var fO = class extends zD {
	constructor() {
		super(["info", "showInfo"]);
	}
}, pO = (P(fO, "InfoTokenBuilder"), fO), mO = { parser: {
	TokenBuilder: /* @__PURE__ */ P(() => new pO(), "TokenBuilder"),
	ValueConverter: /* @__PURE__ */ P(() => new RD(), "ValueConverter")
} };
function hO(e = FC) {
	let t = Q(DC(e), bD), n = Q(EC({ shared: t }), TD, mO);
	return t.ServiceRegistry.register(n), {
		shared: t,
		Info: n
	};
}
P(hO, "createInfoServices");
var gO = class extends zD {
	constructor() {
		super(["packet"]);
	}
}, _O = (P(gO, "PacketTokenBuilder"), gO), vO = { parser: {
	TokenBuilder: /* @__PURE__ */ P(() => new _O(), "TokenBuilder"),
	ValueConverter: /* @__PURE__ */ P(() => new RD(), "ValueConverter")
} };
function yO(e = FC) {
	let t = Q(DC(e), bD), n = Q(EC({ shared: t }), ED, vO);
	return t.ServiceRegistry.register(n), {
		shared: t,
		Packet: n
	};
}
P(yO, "createPacketServices");
var bO = class extends zD {
	constructor() {
		super(["pie", "showData"]);
	}
}, xO, SO = (P(bO, "PieTokenBuilder"), bO), CO = (xO = class extends LD {
	runCustomConverter(e, t, n) {
		if (e.name === "PIE_SECTION_LABEL") return t.replace(/"/g, "").trim();
	}
}, P(xO, "PieValueConverter"), xO), wO = { parser: {
	TokenBuilder: /* @__PURE__ */ P(() => new SO(), "TokenBuilder"),
	ValueConverter: /* @__PURE__ */ P(() => new CO(), "ValueConverter")
} };
function TO(e = FC) {
	let t = Q(DC(e), bD), n = Q(EC({ shared: t }), DD, wO);
	return t.ServiceRegistry.register(n), {
		shared: t,
		Pie: n
	};
}
P(TO, "createPieServices");
var EO = class extends zD {
	constructor() {
		super(["radar-beta"]);
	}
}, DO = (P(EO, "RadarTokenBuilder"), EO), OO = { parser: {
	TokenBuilder: /* @__PURE__ */ P(() => new DO(), "TokenBuilder"),
	ValueConverter: /* @__PURE__ */ P(() => new RD(), "ValueConverter")
} };
function kO(e = FC) {
	let t = Q(DC(e), bD), n = Q(EC({ shared: t }), OD, OO);
	return t.ServiceRegistry.register(n), {
		shared: t,
		Radar: n
	};
}
P(kO, "createRadarServices");
var AO = class extends zD {
	constructor() {
		super(["railroad-beta"]);
	}
}, jO, MO = (P(AO, "RailroadTokenBuilder"), AO), NO = /* @__PURE__ */ P((e) => {
	let t = e.slice(1, -1), n = "";
	for (let e = 0; e < t.length; e++) {
		let r = t[e];
		if (r === "\\" && e + 1 < t.length) {
			e++;
			let r = t[e];
			switch (r) {
				case "n":
					n += "\n";
					break;
				case "r":
					n += "\r";
					break;
				case "t":
					n += "	";
					break;
				default: n += r;
			}
		} else n += r;
	}
	return n;
}, "decodeEscapedString"), PO = (jO = class extends LD {
	runConverter(e, t, n) {
		let r = super.runConverter(e, t, n);
		if (e.name === "TITLE" && typeof r == "string") {
			let e = r.trim();
			if (e.startsWith("\"") && e.endsWith("\"") || e.startsWith("'") && e.endsWith("'")) return NO(e);
		}
		return r;
	}
	runCustomConverter(e, t, n) {
		if (e.name === "RR_STRING") return NO(t);
	}
}, P(jO, "RailroadValueConverter"), jO), FO = { parser: {
	TokenBuilder: /* @__PURE__ */ P(() => new MO(), "TokenBuilder"),
	ValueConverter: /* @__PURE__ */ P(() => new PO(), "ValueConverter")
} };
function IO(e = FC) {
	let t = Q(DC(e), bD), n = Q(EC({ shared: t }), jD, FO);
	return t.ServiceRegistry.register(n), {
		shared: t,
		Railroad: n
	};
}
P(IO, "createRailroadServices");
var LO = class extends zD {
	constructor() {
		super(["railroad-abnf-beta"]);
	}
}, RO, zO = (P(LO, "RailroadAbnfTokenBuilder"), LO), BO = (RO = class extends LD {
	runConverter(e, t, n) {
		let r = super.runConverter(e, t, n);
		if (e.name === "TITLE" && typeof r == "string") {
			let e = r.trim();
			if (e.startsWith("\"") && e.endsWith("\"") || e.startsWith("'") && e.endsWith("'")) return e.slice(1, -1);
		}
		return r;
	}
	runCustomConverter(e, t, n) {
		if (e.name === "ABNF_STRING") return t.slice(1, -1);
	}
}, P(RO, "RailroadAbnfValueConverter"), RO), VO = { parser: {
	TokenBuilder: /* @__PURE__ */ P(() => new zO(), "TokenBuilder"),
	ValueConverter: /* @__PURE__ */ P(() => new BO(), "ValueConverter")
} };
function HO(e = FC) {
	let t = Q(DC(e), bD), n = Q(EC({ shared: t }), kD, VO);
	return t.ServiceRegistry.register(n), {
		shared: t,
		RailroadAbnf: n
	};
}
P(HO, "createRailroadAbnfServices");
var UO = class extends zD {
	constructor() {
		super(["railroad-ebnf-beta"]);
	}
}, WO, GO = (P(UO, "RailroadEbnfTokenBuilder"), UO), KO = /* @__PURE__ */ P((e) => {
	let t = e.slice(1, -1), n = "";
	for (let e = 0; e < t.length; e++) {
		let r = t[e];
		if (r === "\\" && e + 1 < t.length) {
			e++;
			let r = t[e];
			switch (r) {
				case "n":
					n += "\n";
					break;
				case "r":
					n += "\r";
					break;
				case "t":
					n += "	";
					break;
				default: n += r;
			}
		} else n += r;
	}
	return n;
}, "decodeEscapedString"), qO = (WO = class extends LD {
	runConverter(e, t, n) {
		let r = super.runConverter(e, t, n);
		if (e.name === "TITLE" && typeof r == "string") {
			let e = r.trim();
			if (e.startsWith("\"") && e.endsWith("\"") || e.startsWith("'") && e.endsWith("'")) return KO(e);
		}
		return r;
	}
	runCustomConverter(e, t, n) {
		if (e.name === "EBNF_STRING") return KO(t);
		if (e.name === "EBNF_SPECIAL_SEQUENCE") return t.slice(1, -1).trim();
	}
}, P(WO, "RailroadEbnfValueConverter"), WO), JO = { parser: {
	TokenBuilder: /* @__PURE__ */ P(() => new GO(), "TokenBuilder"),
	ValueConverter: /* @__PURE__ */ P(() => new qO(), "ValueConverter")
} };
function YO(e = FC) {
	let t = Q(DC(e), bD), n = Q(EC({ shared: t }), AD, JO);
	return t.ServiceRegistry.register(n), {
		shared: t,
		RailroadEbnf: n
	};
}
P(YO, "createRailroadEbnfServices");
var XO = class extends zD {
	constructor() {
		super(["railroad-peg-beta"]);
	}
}, ZO, QO = (P(XO, "RailroadPegTokenBuilder"), XO), $O = /* @__PURE__ */ P((e) => {
	let t = e.slice(1, -1), n = "";
	for (let e = 0; e < t.length; e++) {
		let r = t[e];
		if (r === "\\" && e + 1 < t.length) {
			e++;
			let r = t[e];
			switch (r) {
				case "n":
					n += "\n";
					break;
				case "r":
					n += "\r";
					break;
				case "t":
					n += "	";
					break;
				default: n += r;
			}
		} else n += r;
	}
	return n;
}, "decodeEscapedString"), ek = (ZO = class extends LD {
	runConverter(e, t, n) {
		let r = super.runConverter(e, t, n);
		if (e.name === "TITLE" && typeof r == "string") {
			let e = r.trim();
			if (e.startsWith("\"") && e.endsWith("\"") || e.startsWith("'") && e.endsWith("'")) return $O(e);
		}
		return r;
	}
	runCustomConverter(e, t, n) {
		if (e.name === "PEG_STRING") return $O(t);
	}
}, P(ZO, "RailroadPegValueConverter"), ZO), tk = { parser: {
	TokenBuilder: /* @__PURE__ */ P(() => new QO(), "TokenBuilder"),
	ValueConverter: /* @__PURE__ */ P(() => new ek(), "ValueConverter")
} };
function nk(e = FC) {
	let t = Q(DC(e), bD), n = Q(EC({ shared: t }), MD, tk);
	return t.ServiceRegistry.register(n), {
		shared: t,
		RailroadPeg: n
	};
}
P(nk, "createRailroadPegServices");
var rk = class extends LD {
	runCustomConverter(e, t, n) {
		if (e.name === "INDENTATION") return t?.length || 0;
		if (e.name === "QUOTED_NAME") return t.substring(1, t.length - 1);
		if (e.name === "BARE_NAME") return t.replace(/[\t ]+$/, "");
		if (e.name === "CLASS_ANNOTATION") return t.trim().substring(3).trim();
		if (e.name === "ICON_ANNOTATION") {
			let e = t.trim();
			return e.substring(5, e.length - 1);
		}
		if (e.name === "DESC_ANNOTATION") return t.trim().substring(2).trim();
	}
}, ik, ak = (P(rk, "TreeViewValueConverter"), rk), ok = (ik = class extends zD {
	constructor() {
		super(["treeView-beta"]);
	}
}, P(ik, "TreeViewTokenBuilder"), ik), sk = { parser: {
	TokenBuilder: /* @__PURE__ */ P(() => new ok(), "TokenBuilder"),
	ValueConverter: /* @__PURE__ */ P(() => new ak(), "ValueConverter")
} };
function ck(e = FC) {
	let t = Q(DC(e), bD), n = Q(EC({ shared: t }), PD, sk);
	return t.ServiceRegistry.register(n), {
		shared: t,
		TreeView: n
	};
}
P(ck, "createTreeViewServices");
var lk = class extends zD {
	constructor() {
		super(["treemap"]);
	}
}, uk, dk, fk = (P(lk, "TreemapTokenBuilder"), lk), pk = /classDef\s+([A-Z_a-z]\w+)(?:\s+([^\n\r;]*))?;?/, mk = (uk = class extends LD {
	runCustomConverter(e, t, n) {
		if (e.name === "NUMBER2") return parseFloat(t.replace(/,/g, ""));
		if (e.name === "SEPARATOR" || e.name === "STRING2") return t.substring(1, t.length - 1);
		if (e.name === "INDENTATION") return t.length;
		if (e.name === "ClassDef") {
			if (typeof t != "string") return t;
			let e = pk.exec(t);
			if (e) return {
				$type: "ClassDefStatement",
				className: e[1],
				styleText: e[2] || void 0
			};
		}
	}
}, P(uk, "TreemapValueConverter"), uk);
function hk(e) {
	let t = e.validation.TreemapValidator, n = e.validation.ValidationRegistry;
	if (n) {
		let e = { Treemap: t.checkSingleRoot.bind(t) };
		n.register(e, t);
	}
}
P(hk, "registerValidationChecks");
var gk = (dk = class {
	checkSingleRoot(e, t) {
		let n;
		for (let r of e.TreemapRows) r.item && (n === void 0 && r.indent === void 0 ? n = 0 : (r.indent === void 0 || n !== void 0 && n >= parseInt(r.indent, 10)) && t("error", "Multiple root nodes are not allowed in a treemap.", {
			node: r,
			property: "item"
		}));
	}
}, P(dk, "TreemapValidator"), dk), _k = {
	parser: {
		TokenBuilder: /* @__PURE__ */ P(() => new fk(), "TokenBuilder"),
		ValueConverter: /* @__PURE__ */ P(() => new mk(), "ValueConverter")
	},
	validation: { TreemapValidator: /* @__PURE__ */ P(() => new gk(), "TreemapValidator") }
};
function vk(e = FC) {
	let t = Q(DC(e), bD), n = Q(EC({ shared: t }), ND, _k);
	return t.ServiceRegistry.register(n), hk(n), {
		shared: t,
		Treemap: n
	};
}
P(vk, "createTreemapServices");
var yk = class extends LD {
	runCustomConverter(e, t, n) {
		if (e.name.toUpperCase() === "LINK_LABEL") return t.substring(1).trim();
	}
}, bk = (P(yk, "WardleyValueConverter"), yk), xk = { parser: { ValueConverter: /* @__PURE__ */ P(() => new bk(), "ValueConverter") } };
function Sk(e = FC) {
	let t = Q(DC(e), bD), n = Q(EC({ shared: t }), FD, xk);
	return t.ServiceRegistry.register(n), {
		shared: t,
		Wardley: n
	};
}
P(Sk, "createWardleyServices");
var Ck, wk = {}, Tk = {
	info: /* @__PURE__ */ P(async () => {
		let { createInfoServices: e } = await import("./info-OHQRW6UA-D1on1sCH-DshTpFSa.js");
		wk.info = e().Info.parser.LangiumParser;
	}, "info"),
	packet: /* @__PURE__ */ P(async () => {
		let { createPacketServices: e } = await import("./packet-JDAUHWVQ-BUADMtHT-COcEZxzF.js");
		wk.packet = e().Packet.parser.LangiumParser;
	}, "packet"),
	pie: /* @__PURE__ */ P(async () => {
		let { createPieServices: e } = await import("./pie-XZMESJXO-DGwyVVAK-DTl6Zy8y.js");
		wk.pie = e().Pie.parser.LangiumParser;
	}, "pie"),
	treeView: /* @__PURE__ */ P(async () => {
		let { createTreeViewServices: e } = await import("./treeView-D4JQ5SDB-DRVHWhBH-BHHhx-Mv.js");
		wk.treeView = e().TreeView.parser.LangiumParser;
	}, "treeView"),
	architecture: /* @__PURE__ */ P(async () => {
		let { createArchitectureServices: e } = await import("./architecture-WOLXFQ4H-BoR62xpl-Ck9pEM7K.js");
		wk.architecture = e().Architecture.parser.LangiumParser;
	}, "architecture"),
	gitGraph: /* @__PURE__ */ P(async () => {
		let { createGitGraphServices: e } = await import("./gitGraph-VSP46ZUC-C4sgmDR9-CFRxQOci.js");
		wk.gitGraph = e().GitGraph.parser.LangiumParser;
	}, "gitGraph"),
	eventmodeling: /* @__PURE__ */ P(async () => {
		let { createEventModelingServices: e } = await import("./eventmodeling-K75KTNOO-BXGmjtY9-DwVVehUl.js");
		wk.eventmodeling = e().EventModel.parser.LangiumParser;
	}, "eventmodeling"),
	radar: /* @__PURE__ */ P(async () => {
		let { createRadarServices: e } = await import("./radar-ABXABTNO-Xqk7NdUF-DcBK2yOv.js");
		wk.radar = e().Radar.parser.LangiumParser;
	}, "radar"),
	railroad: /* @__PURE__ */ P(async () => {
		let { createRailroadServices: e } = await import("./railroad-I3PHUGI6-BIkOnNod-CsxOOg_L.js");
		wk.railroad = e().Railroad.parser.LangiumParser;
	}, "railroad"),
	railroadEbnf: /* @__PURE__ */ P(async () => {
		let { createRailroadEbnfServices: e } = await import("./railroad-ebnf-DWYD2UWJ-B8rXy9tS-DyTZVPCA.js");
		wk.railroadEbnf = e().RailroadEbnf.parser.LangiumParser;
	}, "railroadEbnf"),
	railroadAbnf: /* @__PURE__ */ P(async () => {
		let { createRailroadAbnfServices: e } = await import("./railroad-abnf-LNEFI6M7-CzTSL20J-D51rHJH7.js");
		wk.railroadAbnf = e().RailroadAbnf.parser.LangiumParser;
	}, "railroadAbnf"),
	railroadPeg: /* @__PURE__ */ P(async () => {
		let { createRailroadPegServices: e } = await import("./railroad-peg-JR7BVNR7-D_cuwO4W-QeUCGU3c.js");
		wk.railroadPeg = e().RailroadPeg.parser.LangiumParser;
	}, "railroadPeg"),
	treemap: /* @__PURE__ */ P(async () => {
		let { createTreemapServices: e } = await import("./treemap-SAJKECNS-n-6bX5wl-Bwoippup.js");
		wk.treemap = e().Treemap.parser.LangiumParser;
	}, "treemap"),
	wardley: /* @__PURE__ */ P(async () => {
		let { createWardleyServices: e } = await import("./wardley-7MLQ67FV-DF_GMJ78-Bu6xeUbY.js");
		wk.wardley = e().Wardley.parser.LangiumParser;
	}, "wardley"),
	cynefin: /* @__PURE__ */ P(async () => {
		let { createCynefinServices: e } = await import("./cynefin-EF2NZ3EQ-olhO6nFD-DP9Rf_97.js");
		wk.cynefin = e().Cynefin.parser.LangiumParser;
	}, "cynefin")
};
async function Ek(e, t) {
	let n = Tk[e];
	if (!n) throw Error(`Unknown diagram type: ${e}`);
	wk[e] || await n();
	let r = wk[e].parse(t);
	if (r.lexerErrors.length > 0 || r.parserErrors.length > 0) throw new Ok(r);
	return r.value;
}
P(Ek, "parse");
var Dk = /* @__PURE__ */ P((e) => e !== void 0 && e >= 0 ? e : "?", "formatLocation"), Ok = (Ck = class extends Error {
	constructor(e) {
		let t = e.lexerErrors.map((e) => `Lexer error on line ${Dk(e.line)}, column ${Dk(e.column)}: ${e.message}`).join("\n"), n = e.parserErrors.map((e) => `Parse error on line ${Dk(e.token.startLine)}, column ${Dk(e.token.startColumn)}: ${e.message}`).join("\n");
		super(`Parsing failed: ${t} ${n}`), this.result = e;
	}
}, P(Ck, "MermaidParseError"), Ck);
export { TO as a, YD as c, IO as d, vk as f, sO as h, HO as i, GD as l, nk as m, kO as n, hO as o, ck as p, YO as r, yO as s, dO as t, Sk as u };
