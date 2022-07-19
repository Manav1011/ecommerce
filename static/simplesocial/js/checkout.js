var Razorpay = function() {
    var e = window,
        n = e.document,
        t = e.Boolean,
        r = e.Array,
        i = e.Object,
        a = e.String,
        o = e.Number,
        u = e.Date,
        c = e.Math,
        s = e.setTimeout,
        l = e.setInterval,
        m = e.clearTimeout,
        d = e.parseInt,
        f = e.encodeURIComponent,
        p = e.decodeURIComponent,
        h = e.btoa,
        v = e.unescape,
        _ = e.TypeError,
        y = e.navigator,
        g = e.location,
        b = e.XMLHttpRequest,
        w = e.NodeList,
        k = e.FormData;
    var S = function(e) {
            return function(n, t) {
                return arguments.length < 2 ? function(t) {
                    return e.call(null, t, n)
                } : e.call(null, n, t)
            }
        },
        E = function(e) {
            return function(n, t, r) {
                return arguments.length < 3 ? function(r) {
                    return e.call(null, r, n, t)
                } : e.call(null, n, t, r)
            }
        };

    function D() {
        for (var n = arguments.length, t = new r(n), i = 0; i < n; i++) t[i] = arguments[i];
        return function(n) {
            return function() {
                var r = arguments;
                return t.every((function(n, t) {
                    if (n(r[t])) return !0;
                    r[t], e.dispatchEvent(X("rzp_error", {
                        detail: new Error("wrong " + t + "th argtype " + r[t])
                    }))
                })) ? n.apply(null, r) : r[0]
            }
        }
    }
    var R = S((function(e, n) {
            return typeof e === n
        })),
        C = R("boolean"),
        P = R("number"),
        A = R("string"),
        M = R("function"),
        I = R("object"),
        N = r.isArray,
        T = R("undefined"),
        B = function(e) {
            return null === e
        },
        L = function(e) {
            return O(e) && 1 === e.nodeType
        },
        O = function(e) {
            return !B(e) && I(e)
        },
        x = S((function(e, n) {
            return e && e[n]
        })),
        K = x("length"),
        z = x("prototype"),
        F = S((function(e, n) {
            return e instanceof n
        })),
        H = u.now,
        j = c.random,
        G = c.floor,
        U = function() {
            var e = H();
            return function() {
                return H() - e
            }
        };

    function Y(e, n) {
        var t = {
            description: a(e)
        };
        return n && (t.field = n), t
    }

    function $(e, n) {
        return {
            error: Y(e, n)
        }
    }

    function V(e) {
        throw new Error(e)
    }
    var Z = function(e) {
        return /data:image\/[^;]+;base64/.test(e)
    };

    function W(e, n) {
        var t = {};
        if (!O(e)) return t;
        var r = null == n;
        return i.keys(e).forEach((function(a) {
            var o = e[a],
                u = r ? a : n + "[" + a + "]";
            if ("object" == typeof o) {
                var c = W(o, u);
                i.keys(c).forEach((function(e) {
                    t[e] = c[e]
                }))
            } else t[u] = o
        })), t
    }

    function q(e) {
        var n = W(e);
        return i.keys(n).map((function(e) {
            return f(e) + "=" + f(n[e])
        })).join("&")
    }

    function J(e, n) {
        return O(n) && (n = q(n)), n && (e += e.indexOf("?") > 0 ? "&" : "?", e += n), e
    }

    function X(e, t) {
        t = t || {
            bubbles: !1,
            cancelable: !1,
            detail: void 0
        };
        var r = n.createEvent("CustomEvent");
        return r.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), r
    }

    function Q(e) {
        var n = this.constructor;
        return this.then((function(t) {
            return n.resolve(e()).then((function() {
                return t
            }))
        }), (function(t) {
            return n.resolve(e()).then((function() {
                return n.reject(t)
            }))
        }))
    }

    function ee(e) {
        return new this((function(n, t) {
            if (!e || void 0 === e.length) return t(new _(typeof e + " " + e + " is not iterable(cannot read property Symbol(Symbol.iterator))"));
            var i = r.prototype.slice.call(e);
            if (0 === i.length) return n([]);
            var a = i.length;

            function o(e, t) {
                if (t && ("object" == typeof t || "function" == typeof t)) {
                    var r = t.then;
                    if ("function" == typeof r) return void r.call(t, (function(n) {
                        o(e, n)
                    }), (function(t) {
                        i[e] = {
                            status: "rejected",
                            reason: t
                        }, 0 == --a && n(i)
                    }))
                }
                i[e] = {
                    status: "fulfilled",
                    value: t
                }, 0 == --a && n(i)
            }
            for (var u = 0; u < i.length; u++) o(u, i[u])
        }))
    }
    var ne = s;

    function te(e) {
        return t(e && void 0 !== e.length)
    }

    function re() {}

    function ie(e) {
        if (!(this instanceof ie)) throw new _("Promises must be constructed via new");
        if ("function" != typeof e) throw new _("not a function");
        this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], le(e, this)
    }

    function ae(e, n) {
        for (; 3 === e._state;) e = e._value;
        0 !== e._state ? (e._handled = !0, ie._immediateFn((function() {
            var t = 1 === e._state ? n.onFulfilled : n.onRejected;
            if (null !== t) {
                var r;
                try {
                    r = t(e._value)
                } catch (e) {
                    return void ue(n.promise, e)
                }
                oe(n.promise, r)
            } else(1 === e._state ? oe : ue)(n.promise, e._value)
        }))) : e._deferreds.push(n)
    }

    function oe(e, n) {
        try {
            if (n === e) throw new _("A promise cannot be resolved with itself.");
            if (n && ("object" == typeof n || "function" == typeof n)) {
                var t = n.then;
                if (n instanceof ie) return e._state = 3, e._value = n, void ce(e);
                if ("function" == typeof t) return void le((r = t, i = n, function() {
                    r.apply(i, arguments)
                }), e)
            }
            e._state = 1, e._value = n, ce(e)
        } catch (n) {
            ue(e, n)
        }
        var r, i
    }

    function ue(e, n) {
        e._state = 2, e._value = n, ce(e)
    }

    function ce(e) {
        2 === e._state && 0 === e._deferreds.length && ie._immediateFn((function() {
            e._handled || ie._unhandledRejectionFn(e._value)
        }));
        for (var n = 0, t = e._deferreds.length; n < t; n++) ae(e, e._deferreds[n]);
        e._deferreds = null
    }

    function se(e, n, t) {
        this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof n ? n : null, this.promise = t
    }

    function le(e, n) {
        var t = !1;
        try {
            e((function(e) {
                t || (t = !0, oe(n, e))
            }), (function(e) {
                t || (t = !0, ue(n, e))
            }))
        } catch (e) {
            if (t) return;
            t = !0, ue(n, e)
        }
    }
    ie.prototype.catch = function(e) {
        return this.then(null, e)
    }, ie.prototype.then = function(e, n) {
        var t = new this.constructor(re);
        return ae(this, new se(e, n, t)), t
    }, ie.prototype.finally = Q, ie.all = function(e) {
        return new ie((function(n, t) {
            if (!te(e)) return t(new _("Promise.all accepts an array"));
            var i = r.prototype.slice.call(e);
            if (0 === i.length) return n([]);
            var a = i.length;

            function o(e, r) {
                try {
                    if (r && ("object" == typeof r || "function" == typeof r)) {
                        var u = r.then;
                        if ("function" == typeof u) return void u.call(r, (function(n) {
                            o(e, n)
                        }), t)
                    }
                    i[e] = r, 0 == --a && n(i)
                } catch (e) {
                    t(e)
                }
            }
            for (var u = 0; u < i.length; u++) o(u, i[u])
        }))
    }, ie.allSettled = ee, ie.resolve = function(e) {
        return e && "object" == typeof e && e.constructor === ie ? e : new ie((function(n) {
            n(e)
        }))
    }, ie.reject = function(e) {
        return new ie((function(n, t) {
            t(e)
        }))
    }, ie.race = function(e) {
        return new ie((function(n, t) {
            if (!te(e)) return t(new _("Promise.race accepts an array"));
            for (var r = 0, i = e.length; r < i; r++) ie.resolve(e[r]).then(n, t)
        }))
    }, ie._immediateFn = "function" == typeof setImmediate && function(e) {
        setImmediate(e)
    } || function(e) {
        ne(e, 0)
    }, ie._unhandledRejectionFn = function(e) {
        "undefined" != typeof console && console
    };
    var me = function() {
        if ("undefined" != typeof self) return self;
        if ("undefined" != typeof window) return window;
        if (void 0 !== e) return e;
        throw new Error("unable to locate global object")
    }();
    "function" != typeof me.Promise ? me.Promise = ie : (me.Promise.prototype.finally || (me.Promise.prototype.finally = Q), me.Promise.allSettled || (me.Promise.allSettled = ee)), i.entries || (i.entries = function(e) {
        for (var n = i.keys(e), t = n.length, a = new r(t); t--;) a[t] = [n[t], e[n[t]]];
        return a
    }), i.values || (i.values = function(e) {
        for (var n = i.keys(e), t = n.length, a = new r(t); t--;) a[t] = e[n[t]];
        return a
    }), "function" != typeof i.assign && i.defineProperty(i, "assign", {
        value: function(e) {
            if (null == e) throw new _("Cannot convert undefined or null to object");
            for (var n = i(e), t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                if (null != r)
                    for (var a in r) i.prototype.hasOwnProperty.call(r, a) && (n[a] = r[a])
            }
            return n
        },
        writable: !0,
        configurable: !0
    }), window.NodeList && !w.prototype.forEach && (w.prototype.forEach = r.prototype.forEach), r.prototype.find || (r.prototype.find = function(e) {
        if ("function" != typeof e) throw new _("callback must be a function");
        for (var n = arguments[1] || this, t = 0; t < this.length; t++)
            if (e.call(n, this[t], t, this)) return this[t]
    }), r.prototype.includes || (r.prototype.includes = function() {
        return -1 !== r.prototype.indexOf.apply(this, arguments)
    }), r.prototype.flatMap || (r.prototype.flatMap = function(e, n) {
        for (var t = n || this, r = [], a = i(t), o = a.length >>> 0, u = 0; u < o; ++u)
            if (u in a) {
                var c = e.call(t, a[u], u, a);
                r = r.concat(c)
            } return r
    }), r.prototype.findIndex || (r.prototype.findIndex = function(e) {
        if ("function" != typeof e) throw new _("callback must be a function");
        for (var n = arguments[1] || this, t = 0; t < this.length; t++)
            if (e.call(n, this[t], t, this)) return t;
        return -1
    });
    var de = function(e) {
            return i.keys(e || {})
        },
        fe = S((function(e, n) {
            return e && e.hasOwnProperty(n)
        })),
        pe = S((function(e, n) {
            return fe(e, n) && e[n]
        })),
        he = E((function(e, n, t) {
            return e[n] = t, e
        })),
        ve = S((function(e, n) {
            return de(e).forEach((function(t) {
                return n(e[t], t, e)
            })), e
        })),
        _e = S((function(e, n) {
            return de(e).reduce((function(t, r) {
                return he(t, r, n(e[r], r, e))
            }), {})
        })),
        ye = JSON.stringify,
        ge = function(e) {
            return function(e) {
                try {
                    return JSON.parse(e)
                } catch (e) {}
            }(ye(e))
        },
        be = S((function(e, n) {
            return ve(n, (function(n, t) {
                return e[t] = n
            })), e
        })),
        we = function(e) {
            var n = {};
            return ve(e, (function(e, t) {
                var r = (t = t.replace(/\[([^[\]]+)\]/g, ".$1")).split("."),
                    i = n;
                r.forEach((function(n, t) {
                    t < r.length - 1 ? (i[n] || (i[n] = {}), i = pe(i, n)) : i[n] = e
                }))
            })), n
        },
        ke = function e(n, t) {
            void 0 === t && (t = "");
            var r = {};
            return ve(n, (function(n, i) {
                var a = t ? t + "." + i : i;
                O(n) ? be(r, e(n, a)) : r[a] = n
            })), r
        },
        Se = function(e, n, t) {
            void 0 === t && (t = void 0);
            for (var r, i = n.split("."), a = e, o = 0; o < i.length; o++) try {
                var u = a[i[o]];
                if ((A(r = u) || P(r) || C(r) || B(r) || T(r)) && !A(u)) return o === i.length - 1 ? void 0 === u ? t : u : t;
                a = u
            } catch (e) {
                return t
            }
            return a
        };

    function Ee(e, n) {
        for (var t = 0; t < n.length; t++) {
            var r = n[t];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function De(e, n, t) {
        return n && Ee(e.prototype, n), t && Ee(e, t), e
    }

    function Re() {
        return Re = Object.assign || function(e) {
            for (var n = 1; n < arguments.length; n++) {
                var t = arguments[n];
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r])
            }
            return e
        }, Re.apply(this, arguments)
    }

    function Ce(e) {
        return Ce = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, Ce(e)
    }

    function Pe(e, n) {
        return Pe = Object.setPrototypeOf || function(e, n) {
            return e.__proto__ = n, e
        }, Pe(e, n)
    }

    function Ae() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
        } catch (e) {
            return !1
        }
    }

    function Me(e, n, t) {
        return Me = Ae() ? Reflect.construct : function(e, n, t) {
            var r = [null];
            r.push.apply(r, n);
            var i = new(Function.bind.apply(e, r));
            return t && Pe(i, t.prototype), i
        }, Me.apply(null, arguments)
    }

    function Ie(e) {
        var n = "function" == typeof Map ? new Map : void 0;
        return Ie = function(e) {
            if (null === e || (t = e, -1 === Function.toString.call(t).indexOf("[native code]"))) return e;
            var t;
            if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
            if (void 0 !== n) {
                if (n.has(e)) return n.get(e);
                n.set(e, r)
            }

            function r() {
                return Me(e, arguments, Ce(this).constructor)
            }
            return r.prototype = Object.create(e.prototype, {
                constructor: {
                    value: r,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), Pe(r, e)
        }, Ie(e)
    }

    function Ne(e, n) {
        (null == n || n > e.length) && (n = e.length);
        for (var t = 0, r = new Array(n); t < n; t++) r[t] = e[t];
        return r
    }

    function Te(e, n) {
        var t = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
        if (t) return (t = t.call(e)).next.bind(t);
        if (Array.isArray(e) || (t = function(e, n) {
                if (e) {
                    if ("string" == typeof e) return Ne(e, n);
                    var t = Object.prototype.toString.call(e).slice(8, -1);
                    return "Object" === t && e.constructor && (t = e.constructor.name), "Map" === t || "Set" === t ? Array.from(e) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? Ne(e, n) : void 0
                }
            }(e)) || n && e && "number" == typeof e.length) {
            t && (e = t);
            var r = 0;
            return function() {
                return r >= e.length ? {
                    done: !0
                } : {
                    done: !1,
                    value: e[r++]
                }
            }
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }
    var Be = "metric",
        Le = Object.freeze({
            __proto__: null,
            BEHAV: "behav",
            RENDER: "render",
            METRIC: Be,
            DEBUG: "debug",
            INTEGRATION: "integration"
        }),
        Oe = function() {
            return Oe = i.assign || function(e) {
                for (var n, t = 1, r = arguments.length; t < r; t++)
                    for (var a in n = arguments[t]) i.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
                return e
            }, Oe.apply(this, arguments)
        },
        xe = {
            _storage: {},
            setItem: function(e, n) {
                this._storage[e] = n
            },
            getItem: function(e) {
                return this._storage[e] || null
            },
            removeItem: function(e) {
                delete this._storage[e]
            }
        };
    var Ke = function() {
            var n = u.now();
            try {
                e.localStorage.setItem("_storage", n);
                var t = e.localStorage.getItem("_storage");
                return e.localStorage.removeItem("_storage"), n !== d(a(t)) ? xe : e.localStorage
            } catch (e) {
                return xe
            }
        }(),
        ze = "rzp_checkout_exp",
        Fe = function() {
            function e(n) {
                void 0 === n && (n = {});
                var t = this;
                this.getExperiment = function(e) {
                    return e ? t.experiments[e] : null
                }, this.getAllActiveExperimentsName = function() {
                    return i.keys(t.experiments)
                }, this.clearOldExperiments = function() {
                    var n = e.getExperimentsFromStorage(),
                        r = t.getAllActiveExperimentsName().reduce((function(e, t) {
                            return void 0 !== n[t] && (e[t] = n[t]), e
                        }), {});
                    e.setExperimentsInStorage(r)
                }, this.create = function(e, n, r) {
                    var i;
                    void 0 === r && (r = {});
                    var a = r.evaluatorArg,
                        o = r.overrideFn;
                    var u = n;
                    if ("number" == typeof n && (u = function() {
                            return c.random() < n ? 0 : 1
                        }), "function" != typeof u) throw new Error("evaluatorFn must be a function or number");
                    var s = {
                        name: e,
                        enabled: function() {
                            return 1 === this.getSegmentOrCreate(e, a, o)
                        }.bind(t),
                        evaluator: u
                    };
                    return t.register(((i = {})[e] = s, i)), s
                }, this.experiments = n
            }
            return e.setExperimentsInStorage = function(e) {
                if (e && "object" == typeof e) try {
                    Ke.setItem(ze, JSON.stringify(e))
                } catch (e) {
                    return
                }
            }, e.getExperimentsFromStorage = function() {
                var e;
                try {
                    e = JSON.parse(Ke.getItem(ze))
                } catch (e) {}
                return e && "object" == typeof e && !r.isArray(e) ? e : {}
            }, e.prototype.setSegment = function(n, t, r) {
                var i = this.getExperiment(n);
                if (i) {
                    var a = ("function" == typeof r ? r : i.evaluator)(t),
                        o = e.getExperimentsFromStorage();
                    return o[i.name] = a, e.setExperimentsInStorage(o), a
                }
            }, e.prototype.getSegment = function(n) {
                return e.getExperimentsFromStorage()[n]
            }, e.prototype.getSegmentOrCreate = function(e, n, t) {
                var r = this.getSegment(e);
                return "function" == typeof t ? t(n) : void 0 === r ? this.setSegment(e, n, t) : r
            }, e.prototype.register = function(e) {
                this.experiments = Oe(Oe({}, this.experiments), e)
            }, e
        }();
    new Fe({});

    function He() {}

    function je(e) {
        return e()
    }
    Promise.resolve();
    var Ge = [];

    function Ue(e, n) {
        var t;
        void 0 === n && (n = He);
        var r = new Set;

        function i(n) {
            if (l = n, ((s = e) != s ? l == l : s !== l || s && "object" == typeof s || "function" == typeof s) && (e = n, t)) {
                for (var i, a = !Ge.length, o = Te(r); !(i = o()).done;) {
                    var u = i.value;
                    u[1](), Ge.push(u, e)
                }
                if (a) {
                    for (var c = 0; c < Ge.length; c += 2) Ge[c][0](Ge[c + 1]);
                    Ge.length = 0
                }
            }
            var s, l
        }
        return {
            set: i,
            update: function(n) {
                i(n(e))
            },
            subscribe: function(a, o) {
                void 0 === o && (o = He);
                var u = [a, o];
                return r.add(u), 1 === r.size && (t = n(i) || He), a(e),
                    function() {
                        r.delete(u), 0 === r.size && (t(), t = null)
                    }
            }
        }
    }

    function Ye(e, n, t) {
        var r, i = !Array.isArray(e),
            a = i ? [e] : e,
            o = n.length < 2;
        return r = function(e) {
            var t = !1,
                r = [],
                u = 0,
                c = He,
                s = function() {
                    if (!u) {
                        c();
                        var t = n(i ? r[0] : r, e);
                        o ? e(t) : c = "function" == typeof t ? t : He
                    }
                },
                l = a.map((function(e, n) {
                    return function(e) {
                        if (null == e) return He;
                        for (var n = arguments.length, t = new Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++) t[r - 1] = arguments[r];
                        var i = e.subscribe.apply(e, t);
                        return i.unsubscribe ? function() {
                            return i.unsubscribe()
                        } : i
                    }(e, (function(e) {
                        r[n] = e, u &= ~(1 << n), t && s()
                    }), (function() {
                        u |= 1 << n
                    }))
                }));
            return t = !0, s(),
                function() {
                    l.forEach(je), c()
                }
        }, {
            subscribe: Ue(t, r).subscribe
        }
    }
    var $e = ["rzp_test_mZcDnA8WJMFQQD", "rzp_live_ENneAQv5t7kTEQ", "rzp_test_kD8QgcxVGzYSOU", "rzp_live_alEMh9FVT4XpwM"];

    function Ve(e, n, t) {
        return void 0 === t && (t = null), "string" == typeof n && (n = n.split(".")), n.reduce((function(e, n) {
            return e && void 0 !== e[n] ? e[n] : t
        }), e)
    }

    function Ze(e) {
        return null !== e && "object" == typeof e
    }
    var We = function(e, n) {
            return !!Ze(e) && n in e
        },
        qe = function(e) {
            return !i.keys(e || {}).length
        },
        Je = function(e) {
            try {
                return JSON.parse(e)
            } catch (e) {}
        },
        Xe = function() {
            function e() {
                var e = this;
                this.instance = null, this.preferenceResponse = null, this.updateInstance = function(n) {
                    e.razorpayInstance = n
                }, this.triggerInstanceMethod = function(n, t) {
                    if (void 0 === t && (t = []), e.instance) return e.instance[n].apply(e.instance, t)
                }, this.set = function() {
                    for (var n = arguments.length, t = new r(n), i = 0; i < n; i++) t[i] = arguments[i];
                    return e.triggerInstanceMethod("set", t)
                }, this.subscribe = function() {
                    for (var n = arguments.length, t = new r(n), i = 0; i < n; i++) t[i] = arguments[i];
                    return e._store.subscribe.apply(e, t)
                }, this.get = function() {
                    for (var n = arguments.length, t = new r(n), i = 0; i < n; i++) t[i] = arguments[i];
                    return t.length ? e.triggerInstanceMethod("get", t) : e.instance
                }, this.getMerchantOption = function(n) {
                    void 0 === n && (n = "");
                    var t = e.triggerInstanceMethod("get") || {};
                    return n ? Ve(t, n) : t
                }, this.isIRCTC = function() {
                    return $e.indexOf(e.get("key")) >= 0
                }, this.getCardFeatures = function(n) {
                    return e.instance.getCardFeatures(n)
                }, this._store = Ue()
            }
            return De(e, [{
                key: "razorpayInstance",
                get: function() {
                    return this.instance
                },
                set: function(e) {
                    this.instance = e, this.preferenceResponse = e.preferences, this._store.set(e), this.isIRCTC() && this.set("theme.image_frame", !1)
                }
            }, {
                key: "preferences",
                get: function() {
                    return this.preferenceResponse
                }
            }]), e
        }(),
        Qe = new Xe,
        en = {
            AED: {
                code: "784",
                denomination: 100,
                min_value: 10,
                min_auth_value: 100,
                symbol: "Ø¯.Ø¥",
                name: "Emirati Dirham"
            },
            ALL: {
                code: "008",
                denomination: 100,
                min_value: 221,
                min_auth_value: 100,
                symbol: "Lek",
                name: "Albanian Lek"
            },
            AMD: {
                code: "051",
                denomination: 100,
                min_value: 975,
                min_auth_value: 100,
                symbol: "Ö",
                name: "Armenian Dram"
            },
            ARS: {
                code: "032",
                denomination: 100,
                min_value: 80,
                min_auth_value: 100,
                symbol: "ARS",
                name: "Argentine Peso"
            },
            AUD: {
                code: "036",
                denomination: 100,
                min_value: 50,
                min_auth_value: 100,
                symbol: "A$",
                name: "Australian Dollar"
            },
            AWG: {
                code: "533",
                denomination: 100,
                min_value: 10,
                min_auth_value: 100,
                symbol: "Afl.",
                name: "Aruban or Dutch Guilder"
            },
            BBD: {
                code: "052",
                denomination: 100,
                min_value: 10,
                min_auth_value: 100,
                symbol: "Bds$",
                name: "Barbadian or Bajan Dollar"
            },
            BDT: {
                code: "050",
                denomination: 100,
                min_value: 168,
                min_auth_value: 100,
                symbol: "à§³",
                name: "Bangladeshi Taka"
            },
            BMD: {
                code: "060",
                denomination: 100,
                min_value: 10,
                min_auth_value: 100,
                symbol: "$",
                name: "Bermudian Dollar"
            },
            BND: {
                code: "096",
                denomination: 100,
                min_value: 10,
                min_auth_value: 100,
                symbol: "BND",
                name: "Bruneian Dollar"
            },
            BOB: {
                code: "068",
                denomination: 100,
                min_value: 14,
                min_auth_value: 100,
                symbol: "Bs",
                name: "Bolivian BolÃ­viano"
            },
            BSD: {
                code: "044",
                denomination: 100,
                min_value: 10,
                min_auth_value: 100,
                symbol: "BSD",
                name: "Bahamian Dollar"
            },
            BWP: {
                code: "072",
                denomination: 100,
                min_value: 22,
                min_auth_value: 100,
                symbol: "P",
                name: "Botswana Pula"
            },
            BZD: {
                code: "084",
                denomination: 100,
                min_value: 10,
                min_auth_value: 100,
                symbol: "BZ$",
                name: "Belizean Dollar"
            },
            CAD: {
                code: "124",
                denomination: 100,
                min_value: 50,
                min_auth_value: 100,
                symbol: "C$",
                name: "Canadian Dollar"
            },
            CHF: {
                code: "756",
                denomination: 100,
                min_value: 50,
                min_auth_value: 100,
                symbol: "CHf",
                name: "Swiss Franc"
            },
            CNY: {
                code: "156",
                denomination: 100,
                min_value: 14,
                min_auth_value: 100,
                symbol: "Â¥",
                name: "Chinese Yuan Renminbi"
            },
            COP: {
                code: "170",
                denomination: 100,
                min_value: 1e3,
                min_auth_value: 100,
                symbol: "COL$",
                name: "Colombian Peso"
            },
            CRC: {
                code: "188",
                denomination: 100,
                min_value: 1e3,
                min_auth_value: 100,
                symbol: "â‚¡",
                name: "Costa Rican Colon"
            },
            CUP: {
                code: "192",
                denomination: 100,
                min_value: 53,
                min_auth_value: 100,
                symbol: "$MN",
                name: "Cuban Peso"
            },
            CZK: {
                code: "203",
                denomination: 100,
                min_value: 46,
                min_auth_value: 100,
                symbol: "KÄ",
                name: "Czech Koruna"
            },
            DKK: {
                code: "208",
                denomination: 100,
                min_value: 250,
                min_auth_value: 100,
                symbol: "DKK",
                name: "Danish Krone"
            },
            DOP: {
                code: "214",
                denomination: 100,
                min_value: 102,
                min_auth_value: 100,
                symbol: "RD$",
                name: "Dominican Peso"
            },
            DZD: {
                code: "012",
                denomination: 100,
                min_value: 239,
                min_auth_value: 100,
                symbol: "Ø¯.Ø¬",
                name: "Algerian Dinar"
            },
            EGP: {
                code: "818",
                denomination: 100,
                min_value: 35,
                min_auth_value: 100,
                symbol: "EÂ£",
                name: "Egyptian Pound"
            },
            ETB: {
                code: "230",
                denomination: 100,
                min_value: 57,
                min_auth_value: 100,
                symbol: "á‰¥áˆ­",
                name: "Ethiopian Birr"
            },
            EUR: {
                code: "978",
                denomination: 100,
                min_value: 50,
                min_auth_value: 100,
                symbol: "â‚¬",
                name: "Euro"
            },
            FJD: {
                code: "242",
                denomination: 100,
                min_value: 10,
                min_auth_value: 100,
                symbol: "FJ$",
                name: "Fijian Dollar"
            },
            GBP: {
                code: "826",
                denomination: 100,
                min_value: 30,
                min_auth_value: 100,
                symbol: "Â£",
                name: "British Pound"
            },
            GIP: {
                code: "292",
                denomination: 100,
                min_value: 10,
                min_auth_value: 100,
                symbol: "GIP",
                name: "Gibraltar Pound"
            },
            GMD: {
                code: "270",
                denomination: 100,
                min_value: 100,
                min_auth_value: 100,
                symbol: "D",
                name: "Gambian Dalasi"
            },
            GTQ: {
                code: "320",
                denomination: 100,
                min_value: 16,
                min_auth_value: 100,
                symbol: "Q",
                name: "Guatemalan Quetzal"
            },
            GYD: {
                code: "328",
                denomination: 100,
                min_value: 418,
                min_auth_value: 100,
                symbol: "G$",
                name: "Guyanese Dollar"
            },
            HKD: {
                code: "344",
                denomination: 100,
                min_value: 400,
                min_auth_value: 100,
                symbol: "HK$",
                name: "Hong Kong Dollar"
            },
            HNL: {
                code: "340",
                denomination: 100,
                min_value: 49,
                min_auth_value: 100,
                symbol: "HNL",
                name: "Honduran Lempira"
            },
            HRK: {
                code: "191",
                denomination: 100,
                min_value: 14,
                min_auth_value: 100,
                symbol: "kn",
                name: "Croatian Kuna"
            },
            HTG: {
                code: "332",
                denomination: 100,
                min_value: 167,
                min_auth_value: 100,
                symbol: "G",
                name: "Haitian Gourde"
            },
            HUF: {
                code: "348",
                denomination: 100,
                min_value: 555,
                min_auth_value: 100,
                symbol: "Ft",
                name: "Hungarian Forint"
            },
            IDR: {
                code: "360",
                denomination: 100,
                min_value: 1e3,
                min_auth_value: 100,
                symbol: "Rp",
                name: "Indonesian Rupiah"
            },
            ILS: {
                code: "376",
                denomination: 100,
                min_value: 10,
                min_auth_value: 100,
                symbol: "â‚ª",
                name: "Israeli Shekel"
            },
            INR: {
                code: "356",
                denomination: 100,
                min_value: 100,
                min_auth_value: 100,
                symbol: "â‚¹",
                name: "Indian Rupee"
            },
            JMD: {
                code: "388",
                denomination: 100,
                min_value: 250,
                min_auth_value: 100,
                symbol: "J$",
                name: "Jamaican Dollar"
            },
            KES: {
                code: "404",
                denomination: 100,
                min_value: 201,
                min_auth_value: 100,
                symbol: "Ksh",
                name: "Kenyan Shilling"
            },
            KGS: {
                code: "417",
                denomination: 100,
                min_value: 140,
                min_auth_value: 100,
                symbol: "Ð›Ð²",
                name: "Kyrgyzstani Som"
            },
            KHR: {
                code: "116",
                denomination: 100,
                min_value: 1e3,
                min_auth_value: 100,
                symbol: "áŸ›",
                name: "Cambodian Riel"
            },
            KYD: {
                code: "136",
                denomination: 100,
                min_value: 10,
                min_auth_value: 100,
                symbol: "CI$",
                name: "Caymanian Dollar"
            },
            KZT: {
                code: "398",
                denomination: 100,
                min_value: 759,
                min_auth_value: 100,
                symbol: "â‚¸",
                name: "Kazakhstani Tenge"
            },
            LAK: {
                code: "418",
                denomination: 100,
                min_value: 1e3,
                min_auth_value: 100,
                symbol: "â‚­",
                name: "Lao Kip"
            },
            LBP: {
                code: "422",
                denomination: 100,
                min_value: 1e3,
                min_auth_value: 100,
                symbol: "&#1604;.&#1604;.",
                name: "Lebanese Pound"
            },
            LKR: {
                code: "144",
                denomination: 100,
                min_value: 358,
                min_auth_value: 100,
                symbol: "à¶»à·”",
                name: "Sri Lankan Rupee"
            },
            LRD: {
                code: "430",
                denomination: 100,
                min_value: 325,
                min_auth_value: 100,
                symbol: "L$",
                name: "Liberian Dollar"
            },
            LSL: {
                code: "426",
                denomination: 100,
                min_value: 29,
                min_auth_value: 100,
                symbol: "LSL",
                name: "Basotho Loti"
            },
            MAD: {
                code: "504",
                denomination: 100,
                min_value: 20,
                min_auth_value: 100,
                symbol: "Ø¯.Ù….",
                name: "Moroccan Dirham"
            },
            MDL: {
                code: "498",
                denomination: 100,
                min_value: 35,
                min_auth_value: 100,
                symbol: "MDL",
                name: "Moldovan Leu"
            },
            MKD: {
                code: "807",
                denomination: 100,
                min_value: 109,
                min_auth_value: 100,
                symbol: "Ð´ÐµÐ½",
                name: "Macedonian Denar"
            },
            MMK: {
                code: "104",
                denomination: 100,
                min_value: 1e3,
                min_auth_value: 100,
                symbol: "MMK",
                name: "Burmese Kyat"
            },
            MNT: {
                code: "496",
                denomination: 100,
                min_value: 1e3,
                min_auth_value: 100,
                symbol: "â‚®",
                name: "Mongolian Tughrik"
            },
            MOP: {
                code: "446",
                denomination: 100,
                min_value: 17,
                min_auth_value: 100,
                symbol: "MOP$",
                name: "Macau Pataca"
            },
            MUR: {
                code: "480",
                denomination: 100,
                min_value: 70,
                min_auth_value: 100,
                symbol: "â‚¨",
                name: "Mauritian Rupee"
            },
            MVR: {
                code: "462",
                denomination: 100,
                min_value: 31,
                min_auth_value: 100,
                symbol: "Rf",
                name: "Maldivian Rufiyaa"
            },
            MWK: {
                code: "454",
                denomination: 100,
                min_value: 1e3,
                min_auth_value: 100,
                symbol: "MK",
                name: "Malawian Kwacha"
            },
            MXN: {
                code: "484",
                denomination: 100,
                min_value: 39,
                min_auth_value: 100,
                symbol: "Mex$",
                name: "Mexican Peso"
            },
            MYR: {
                code: "458",
                denomination: 100,
                min_value: 10,
                min_auth_value: 100,
                symbol: "RM",
                name: "Malaysian Ringgit"
            },
            NAD: {
                code: "516",
                denomination: 100,
                min_value: 29,
                min_auth_value: 100,
                symbol: "N$",
                name: "Namibian Dollar"
            },
            NGN: {
                code: "566",
                denomination: 100,
                min_value: 723,
                min_auth_value: 100,
                symbol: "â‚¦",
                name: "Nigerian Naira"
            },
            NIO: {
                code: "558",
                denomination: 100,
                min_value: 66,
                min_auth_value: 100,
                symbol: "NIO",
                name: "Nicaraguan Cordoba"
            },
            NOK: {
                code: "578",
                denomination: 100,
                min_value: 300,
                min_auth_value: 100,
                symbol: "NOK",
                name: "Norwegian Krone"
            },
            NPR: {
                code: "524",
                denomination: 100,
                min_value: 221,
                min_auth_value: 100,
                symbol: "à¤°à¥‚",
                name: "Nepalese Rupee"
            },
            NZD: {
                code: "554",
                denomination: 100,
                min_value: 50,
                min_auth_value: 100,
                symbol: "NZ$",
                name: "New Zealand Dollar"
            },
            PEN: {
                code: "604",
                denomination: 100,
                min_value: 10,
                min_auth_value: 100,
                symbol: "S/",
                name: "Peruvian Sol"
            },
            PGK: {
                code: "598",
                denomination: 100,
                min_value: 10,
                min_auth_value: 100,
                symbol: "PGK",
                name: "Papua New Guinean Kina"
            },
            PHP: {
                code: "608",
                denomination: 100,
                min_value: 106,
                min_auth_value: 100,
                symbol: "â‚±",
                name: "Philippine Peso"
            },
            PKR: {
                code: "586",
                denomination: 100,
                min_value: 227,
                min_auth_value: 100,
                symbol: "â‚¨",
                name: "Pakistani Rupee"
            },
            QAR: {
                code: "634",
                denomination: 100,
                min_value: 10,
                min_auth_value: 100,
                symbol: "QR",
                name: "Qatari Riyal"
            },
            RUB: {
                code: "643",
                denomination: 100,
                min_value: 130,
                min_auth_value: 100,
                symbol: "â‚½",
                name: "Russian Ruble"
            },
            SAR: {
                code: "682",
                denomination: 100,
                min_value: 10,
                min_auth_value: 100,
                symbol: "SR",
                name: "Saudi Arabian Riyal"
            },
            SCR: {
                code: "690",
                denomination: 100,
                min_value: 28,
                min_auth_value: 100,
                symbol: "SRe",
                name: "Seychellois Rupee"
            },
            SEK: {
                code: "752",
                denomination: 100,
                min_value: 300,
                min_auth_value: 100,
                symbol: "SEK",
                name: "Swedish Krona"
            },
            SGD: {
                code: "702",
                denomination: 100,
                min_value: 50,
                min_auth_value: 100,
                symbol: "S$",
                name: "Singapore Dollar"
            },
            SLL: {
                code: "694",
                denomination: 100,
                min_value: 1e3,
                min_auth_value: 100,
                symbol: "Le",
                name: "Sierra Leonean Leone"
            },
            SOS: {
                code: "706",
                denomination: 100,
                min_value: 1e3,
                min_auth_value: 100,
                symbol: "Sh.so.",
                name: "Somali Shilling"
            },
            SSP: {
                code: "728",
                denomination: 100,
                min_value: 100,
                min_auth_value: 100,
                symbol: "SSÂ£",
                name: "South Sudanese Pound"
            },
            SVC: {
                code: "222",
                denomination: 100,
                min_value: 18,
                min_auth_value: 100,
                symbol: "â‚¡",
                name: "Salvadoran Colon"
            },
            SZL: {
                code: "748",
                denomination: 100,
                min_value: 29,
                min_auth_value: 100,
                symbol: "E",
                name: "Swazi Lilangeni"
            },
            THB: {
                code: "764",
                denomination: 100,
                min_value: 64,
                min_auth_value: 100,
                symbol: "à¸¿",
                name: "Thai Baht"
            },
            TTD: {
                code: "780",
                denomination: 100,
                min_value: 14,
                min_auth_value: 100,
                symbol: "TT$",
                name: "Trinidadian Dollar"
            },
            TZS: {
                code: "834",
                denomination: 100,
                min_value: 1e3,
                min_auth_value: 100,
                symbol: "Sh",
                name: "Tanzanian Shilling"
            },
            USD: {
                code: "840",
                denomination: 100,
                min_value: 50,
                min_auth_value: 100,
                symbol: "$",
                name: "US Dollar"
            },
            UYU: {
                code: "858",
                denomination: 100,
                min_value: 67,
                min_auth_value: 100,
                symbol: "$U",
                name: "Uruguayan Peso"
            },
            UZS: {
                code: "860",
                denomination: 100,
                min_value: 1e3,
                min_auth_value: 100,
                symbol: "so'm",
                name: "Uzbekistani Som"
            },
            YER: {
                code: "886",
                denomination: 100,
                min_value: 501,
                min_auth_value: 100,
                symbol: "ï·¼",
                name: "Yemeni Rial"
            },
            ZAR: {
                code: "710",
                denomination: 100,
                min_value: 29,
                min_auth_value: 100,
                symbol: "R",
                name: "South African Rand"
            }
        },
        nn = function(e, n) {
            return void 0 === n && (n = "."),
                function(t) {
                    for (var r = n, i = 0; i < e; i++) r += "0";
                    return t.replace(r, "")
                }
        },
        tn = function(e, n) {
            return void 0 === n && (n = ","), e.replace(/\./, n)
        },
        rn = {
            three: function(e, n) {
                var t;
                return t = a(e).replace(new RegExp("(.{1,3})(?=(...)+(\\..{" + n + "})$)", "g"), "$1,"), nn(n)(t)
            },
            threecommadecimal: function(e, n) {
                var t;
                return t = tn(a(e)).replace(new RegExp("(.{1,3})(?=(...)+(\\,.{" + n + "})$)", "g"), "$1."), nn(n, ",")(t)
            },
            threespaceseparator: function(e, n) {
                var t;
                return t = a(e).replace(new RegExp("(.{1,3})(?=(...)+(\\..{" + n + "})$)", "g"), "$1 "), nn(n)(t)
            },
            threespacecommadecimal: function(e, n) {
                var t;
                return t = tn(a(e)).replace(new RegExp("(.{1,3})(?=(...)+(\\,.{" + n + "})$)", "g"), "$1 "), nn(n, ",")(t)
            },
            szl: function(e, n) {
                var t;
                return t = a(e).replace(new RegExp("(.{1,3})(?=(...)+(\\..{" + n + "})$)", "g"), "$1, "), nn(n)(t)
            },
            chf: function(e, n) {
                var t;
                return t = a(e).replace(new RegExp("(.{1,3})(?=(...)+(\\..{" + n + "})$)", "g"), "$1'"), nn(n)(t)
            },
            inr: function(e, n) {
                var t;
                return t = a(e).replace(new RegExp("(.{1,2})(?=.(..)+(\\..{" + n + "})$)", "g"), "$1,"), nn(n)(t)
            },
            none: function(e) {
                return a(e)
            }
        },
        an = {
            default: {
                decimals: 2,
                format: rn.three,
                minimum: 100
            },
            AED: {
                minor: "fil",
                minimum: 10
            },
            AFN: {
                minor: "pul"
            },
            ALL: {
                minor: "qindarka",
                minimum: 221
            },
            AMD: {
                minor: "luma",
                minimum: 975
            },
            ANG: {
                minor: "cent"
            },
            AOA: {
                minor: "lwei"
            },
            ARS: {
                format: rn.threecommadecimal,
                minor: "centavo",
                minimum: 80
            },
            AUD: {
                format: rn.threespaceseparator,
                minimum: 50,
                minor: "cent"
            },
            AWG: {
                minor: "cent",
                minimum: 10
            },
            AZN: {
                minor: "qÃ¤pik"
            },
            BAM: {
                minor: "fenning"
            },
            BBD: {
                minor: "cent",
                minimum: 10
            },
            BDT: {
                minor: "paisa",
                minimum: 168
            },
            BGN: {
                minor: "stotinki"
            },
            BHD: {
                dir: "rtl",
                decimals: 3,
                minor: "fils"
            },
            BIF: {
                decimals: 0,
                major: "franc",
                minor: "centime"
            },
            BMD: {
                minor: "cent",
                minimum: 10
            },
            BND: {
                minor: "sen",
                minimum: 10
            },
            BOB: {
                minor: "centavo",
                minimum: 14
            },
            BRL: {
                format: rn.threecommadecimal,
                minimum: 50,
                minor: "centavo"
            },
            BSD: {
                minor: "cent",
                minimum: 10
            },
            BTN: {
                minor: "chetrum"
            },
            BWP: {
                minor: "thebe",
                minimum: 22
            },
            BYR: {
                decimals: 0,
                major: "ruble"
            },
            BZD: {
                minor: "cent",
                minimum: 10
            },
            CAD: {
                minimum: 50,
                minor: "cent"
            },
            CDF: {
                minor: "centime"
            },
            CHF: {
                format: rn.chf,
                minimum: 50,
                minor: "rappen"
            },
            CLP: {
                decimals: 0,
                format: rn.none,
                major: "peso",
                minor: "centavo"
            },
            CNY: {
                minor: "jiao",
                minimum: 14
            },
            COP: {
                format: rn.threecommadecimal,
                minor: "centavo",
                minimum: 1e3
            },
            CRC: {
                format: rn.threecommadecimal,
                minor: "centimo",
                minimum: 1e3
            },
            CUC: {
                minor: "centavo"
            },
            CUP: {
                minor: "centavo",
                minimum: 53
            },
            CVE: {
                minor: "centavo"
            },
            CZK: {
                format: rn.threecommadecimal,
                minor: "haler",
                minimum: 46
            },
            DJF: {
                decimals: 0,
                major: "franc",
                minor: "centime"
            },
            DKK: {
                minimum: 250,
                minor: "Ã¸re"
            },
            DOP: {
                minor: "centavo",
                minimum: 102
            },
            DZD: {
                minor: "centime",
                minimum: 239
            },
            EGP: {
                minor: "piaster",
                minimum: 35
            },
            ERN: {
                minor: "cent"
            },
            ETB: {
                minor: "cent",
                minimum: 57
            },
            EUR: {
                minimum: 50,
                minor: "cent"
            },
            FJD: {
                minor: "cent",
                minimum: 10
            },
            FKP: {
                minor: "pence"
            },
            GBP: {
                minimum: 30,
                minor: "pence"
            },
            GEL: {
                minor: "tetri"
            },
            GHS: {
                minor: "pesewas",
                minimum: 3
            },
            GIP: {
                minor: "pence",
                minimum: 10
            },
            GMD: {
                minor: "butut"
            },
            GTQ: {
                minor: "centavo",
                minimum: 16
            },
            GYD: {
                minor: "cent",
                minimum: 418
            },
            HKD: {
                minimum: 400,
                minor: "cent"
            },
            HNL: {
                minor: "centavo",
                minimum: 49
            },
            HRK: {
                format: rn.threecommadecimal,
                minor: "lipa",
                minimum: 14
            },
            HTG: {
                minor: "centime",
                minimum: 167
            },
            HUF: {
                decimals: 0,
                format: rn.none,
                major: "forint",
                minimum: 555
            },
            IDR: {
                format: rn.threecommadecimal,
                minor: "sen",
                minimum: 1e3
            },
            ILS: {
                minor: "agorot",
                minimum: 10
            },
            INR: {
                format: rn.inr,
                minor: "paise"
            },
            IQD: {
                decimals: 3,
                minor: "fil"
            },
            IRR: {
                minor: "rials"
            },
            ISK: {
                decimals: 0,
                format: rn.none,
                major: "krÃ³na",
                minor: "aurar"
            },
            JMD: {
                minor: "cent",
                minimum: 250
            },
            JOD: {
                decimals: 3,
                minor: "fil"
            },
            JPY: {
                decimals: 0,
                minimum: 50,
                minor: "sen"
            },
            KES: {
                minor: "cent",
                minimum: 201
            },
            KGS: {
                minor: "tyyn",
                minimum: 140
            },
            KHR: {
                minor: "sen",
                minimum: 1e3
            },
            KMF: {
                decimals: 0,
                major: "franc",
                minor: "centime"
            },
            KPW: {
                minor: "chon"
            },
            KRW: {
                decimals: 0,
                major: "won",
                minor: "chon"
            },
            KWD: {
                dir: "rtl",
                decimals: 3,
                minor: "fil"
            },
            KYD: {
                minor: "cent",
                minimum: 10
            },
            KZT: {
                minor: "tiyn",
                minimum: 759
            },
            LAK: {
                minor: "at",
                minimum: 1e3
            },
            LBP: {
                format: rn.threespaceseparator,
                minor: "piastre",
                minimum: 1e3
            },
            LKR: {
                minor: "cent",
                minimum: 358
            },
            LRD: {
                minor: "cent",
                minimum: 325
            },
            LSL: {
                minor: "lisente",
                minimum: 29
            },
            LTL: {
                format: rn.threespacecommadecimal,
                minor: "centu"
            },
            LVL: {
                minor: "santim"
            },
            LYD: {
                decimals: 3,
                minor: "dirham"
            },
            MAD: {
                minor: "centime",
                minimum: 20
            },
            MDL: {
                minor: "ban",
                minimum: 35
            },
            MGA: {
                decimals: 0,
                major: "ariary"
            },
            MKD: {
                minor: "deni"
            },
            MMK: {
                minor: "pya",
                minimum: 1e3
            },
            MNT: {
                minor: "mongo",
                minimum: 1e3
            },
            MOP: {
                minor: "avo",
                minimum: 17
            },
            MRO: {
                minor: "khoum"
            },
            MUR: {
                minor: "cent",
                minimum: 70
            },
            MVR: {
                minor: "lari",
                minimum: 31
            },
            MWK: {
                minor: "tambala",
                minimum: 1e3
            },
            MXN: {
                minor: "centavo",
                minimum: 39
            },
            MYR: {
                minor: "sen",
                minimum: 10
            },
            MZN: {
                decimals: 0,
                major: "metical"
            },
            NAD: {
                minor: "cent",
                minimum: 29
            },
            NGN: {
                minor: "kobo",
                minimum: 723
            },
            NIO: {
                minor: "centavo",
                minimum: 66
            },
            NOK: {
                format: rn.threecommadecimal,
                minimum: 300,
                minor: "Ã¸re"
            },
            NPR: {
                minor: "paise",
                minimum: 221
            },
            NZD: {
                minimum: 50,
                minor: "cent"
            },
            OMR: {
                dir: "rtl",
                minor: "baiza",
                decimals: 3
            },
            PAB: {
                minor: "centesimo"
            },
            PEN: {
                minor: "centimo",
                minimum: 10
            },
            PGK: {
                minor: "toea",
                minimum: 10
            },
            PHP: {
                minor: "centavo",
                minimum: 106
            },
            PKR: {
                minor: "paisa",
                minimum: 227
            },
            PLN: {
                format: rn.threespacecommadecimal,
                minor: "grosz"
            },
            PYG: {
                decimals: 0,
                major: "guarani",
                minor: "centimo"
            },
            QAR: {
                minor: "dirham",
                minimum: 10
            },
            RON: {
                format: rn.threecommadecimal,
                minor: "bani"
            },
            RUB: {
                format: rn.threecommadecimal,
                minor: "kopeck",
                minimum: 130
            },
            RWF: {
                decimals: 0,
                major: "franc",
                minor: "centime"
            },
            SAR: {
                minor: "halalat",
                minimum: 10
            },
            SBD: {
                minor: "cent"
            },
            SCR: {
                minor: "cent",
                minimum: 28
            },
            SEK: {
                format: rn.threespacecommadecimal,
                minimum: 300,
                minor: "Ã¶re"
            },
            SGD: {
                minimum: 50,
                minor: "cent"
            },
            SHP: {
                minor: "new pence"
            },
            SLL: {
                minor: "cent",
                minimum: 1e3
            },
            SOS: {
                minor: "centesimi",
                minimum: 1e3
            },
            SRD: {
                minor: "cent"
            },
            STD: {
                minor: "centimo"
            },
            SSP: {
                minor: "piaster"
            },
            SVC: {
                minor: "centavo",
                minimum: 18
            },
            SYP: {
                minor: "piaster"
            },
            SZL: {
                format: rn.szl,
                minor: "cent",
                minimum: 29
            },
            THB: {
                minor: "satang",
                minimum: 64
            },
            TJS: {
                minor: "diram"
            },
            TMT: {
                minor: "tenga"
            },
            TND: {
                decimals: 3,
                minor: "millime"
            },
            TOP: {
                minor: "seniti"
            },
            TRY: {
                minor: "kurus"
            },
            TTD: {
                minor: "cent",
                minimum: 14
            },
            TWD: {
                minor: "cent"
            },
            TZS: {
                minor: "cent",
                minimum: 1e3
            },
            UAH: {
                format: rn.threespacecommadecimal,
                minor: "kopiyka"
            },
            UGX: {
                minor: "cent"
            },
            USD: {
                minimum: 50,
                minor: "cent"
            },
            UYU: {
                format: rn.threecommadecimal,
                minor: "centÃ©",
                minimum: 67
            },
            UZS: {
                minor: "tiyin",
                minimum: 1e3
            },
            VND: {
                format: rn.none,
                minor: "hao,xu"
            },
            VUV: {
                decimals: 0,
                major: "vatu",
                minor: "centime"
            },
            WST: {
                minor: "sene"
            },
            XAF: {
                decimals: 0,
                major: "franc",
                minor: "centime"
            },
            XCD: {
                minor: "cent"
            },
            XPF: {
                decimals: 0,
                major: "franc",
                minor: "centime"
            },
            YER: {
                minor: "fil",
                minimum: 501
            },
            ZAR: {
                format: rn.threespaceseparator,
                minor: "cent",
                minimum: 29
            },
            ZMK: {
                minor: "ngwee"
            }
        },
        on = function(e) {
            return an[e] ? an[e] : an.default
        },
        un = ["AED", "ALL", "AMD", "ARS", "AUD", "AWG", "BBD", "BDT", "BHD", "BMD", "BND", "BOB", "BSD", "BWP", "BZD", "CAD", "CHF", "CNY", "COP", "CRC", "CUP", "CZK", "DKK", "DOP", "DZD", "EGP", "ETB", "EUR", "FJD", "GBP", "GHS", "GIP", "GMD", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "INR", "JMD", "KES", "KGS", "KHR", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "MAD", "MDL", "MKD", "MMK", "MNT", "MOP", "MUR", "MVR", "MWK", "MXN", "MYR", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PEN", "PGK", "PHP", "PKR", "QAR", "RUB", "SAR", "SCR", "SEK", "SGD", "SLL", "SOS", "SSP", "SVC", "SZL", "THB", "TTD", "TZS", "USD", "UYU", "UZS", "YER", "ZAR"],
        cn = {
            AED: "Ø¯.Ø¥",
            AFN: "&#x60b;",
            ALL: "Lek",
            AMD: "Ö",
            ANG: "NAÆ’",
            AOA: "Kz",
            ARS: "ARS",
            AUD: "A$",
            AWG: "Afl.",
            AZN: "Ð¼Ð°Ð½",
            BAM: "KM",
            BBD: "Bds$",
            BDT: "à§³",
            BGN: "Ð»Ð²",
            BHD: "Ø¯.Ø¨",
            BIF: "FBu",
            BMD: "$",
            BND: "BND",
            BOB: "Bs.",
            BRL: "R$",
            BSD: "BSD",
            BTN: "Nu.",
            BWP: "P",
            BYR: "Br",
            BZD: "BZ$",
            CAD: "C$",
            CDF: "FC",
            CHF: "CHf",
            CLP: "CLP$",
            CNY: "Â¥",
            COP: "COL$",
            CRC: "â‚¡",
            CUC: "&#x20b1;",
            CUP: "$MN",
            CVE: "Esc",
            CZK: "KÄ",
            DJF: "Fdj",
            DKK: "DKK",
            DOP: "RD$",
            DZD: "Ø¯.Ø¬",
            EGP: "EÂ£",
            ERN: "Nfa",
            ETB: "á‰¥áˆ­",
            EUR: "â‚¬",
            FJD: "FJ$",
            FKP: "FK&#163;",
            GBP: "Â£",
            GEL: "áƒš",
            GHS: "&#x20b5;",
            GIP: "GIP",
            GMD: "D",
            GNF: "FG",
            GTQ: "Q",
            GYD: "G$",
            HKD: "HK$",
            HNL: "HNL",
            HRK: "kn",
            HTG: "G",
            HUF: "Ft",
            IDR: "Rp",
            ILS: "â‚ª",
            INR: "â‚¹",
            IQD: "Ø¹.Ø¯",
            IRR: "&#xfdfc;",
            ISK: "ISK",
            JMD: "J$",
            JOD: "Ø¯.Ø§",
            JPY: "&#165;",
            KES: "Ksh",
            KGS: "Ð›Ð²",
            KHR: "áŸ›",
            KMF: "CF",
            KPW: "KPW",
            KRW: "KRW",
            KWD: "Ø¯.Ùƒ",
            KYD: "CI$",
            KZT: "â‚¸",
            LAK: "â‚­",
            LBP: "&#1604;.&#1604;.",
            LD: "LD",
            LKR: "à¶»à·”",
            LRD: "L$",
            LSL: "LSL",
            LTL: "Lt",
            LVL: "Ls",
            LYD: "LYD",
            MAD: "Ø¯.Ù….",
            MDL: "MDL",
            MGA: "Ar",
            MKD: "Ð´ÐµÐ½",
            MMK: "MMK",
            MNT: "â‚®",
            MOP: "MOP$",
            MRO: "UM",
            MUR: "â‚¨",
            MVR: "Rf",
            MWK: "MK",
            MXN: "Mex$",
            MYR: "RM",
            MZN: "MT",
            NAD: "N$",
            NGN: "â‚¦",
            NIO: "NIO",
            NOK: "NOK",
            NPR: "à¤°à¥‚",
            NZD: "NZ$",
            OMR: "Ø±.Ø¹.",
            PAB: "B/.",
            PEN: "S/",
            PGK: "PGK",
            PHP: "â‚±",
            PKR: "â‚¨",
            PLN: "ZÅ‚",
            PYG: "&#x20b2;",
            QAR: "QR",
            RON: "RON",
            RSD: "Ð”Ð¸Ð½.",
            RUB: "â‚½",
            RWF: "RF",
            SAR: "SR",
            SBD: "SI$",
            SCR: "SRe",
            SDG: "&#163;Sd",
            SEK: "SEK",
            SFR: "Fr",
            SGD: "S$",
            SHP: "&#163;",
            SLL: "Le",
            SOS: "Sh.so.",
            SRD: "Sr$",
            SSP: "SSÂ£",
            STD: "Db",
            SVC: "â‚¡",
            SYP: "S&#163;",
            SZL: "E",
            THB: "à¸¿",
            TJS: "SM",
            TMT: "M",
            TND: "Ø¯.Øª",
            TOP: "T$",
            TRY: "TL",
            TTD: "TT$",
            TWD: "NT$",
            TZS: "Sh",
            UAH: "&#x20b4;",
            UGX: "USh",
            USD: "$",
            UYU: "$U",
            UZS: "so'm",
            VEF: "Bs",
            VND: "&#x20ab;",
            VUV: "VT",
            WST: "T",
            XAF: "FCFA",
            XCD: "EC$",
            XOF: "CFA",
            XPF: "CFPF",
            YER: "ï·¼",
            ZAR: "R",
            ZMK: "ZK",
            ZWL: "Z$"
        },
        sn = function(e) {
            ve(e, (function(n, t) {
                var r, i;
                an[t] = (i = {}, r = be(an.default)(i), be(an[t] || {})(r)), an[t].code = t, e[t] && (an[t].symbol = e[t])
            }))
        };

    function ln(e, n) {
        var t = on(n),
            r = e / c.pow(10, t.decimals);
        return t.format(r.toFixed(t.decimals), t.decimals)
    }! function(e) {
        var n = {};
        ve(e, (function(t, r) {
            en[r] = t, an[r] = an[r] || {}, e[r].min_value && (an[r].minimum = e[r].min_value), e[r].denomination && (an[r].decimals = c.LOG10E * c.log(e[r].denomination)), n[r] = e[r].symbol
        })), be(cn, n), sn(n)
    }(en), sn(cn), un.reduce((function(e, n) {
        return e[n] = cn[n], e
    }), {});
    var mn = function(e, n) {
            return e ? Ve(Qe.preferences, e, n) : Qe.preferences
        },
        dn = function(e) {
            return e ? Qe.get(e) : Qe.triggerInstanceMethod("get")
        },
        fn = function() {
            return mn("invoice.order_id") || dn("order_id")
        },
        pn = e.Element,
        hn = function(e) {
            return n.createElement(e || "div")
        },
        vn = function(e) {
            return e.parentNode
        },
        _n = D(L),
        yn = D(L, L),
        gn = D(L, A),
        bn = D(L, A, (function() {
            return !0
        })),
        wn = D(L, O),
        kn = S(yn((function(e, n) {
            return n.appendChild(e)
        }))),
        Sn = S(yn((function(e, n) {
            return kn(n, e), e
        }))),
        En = _n((function(e) {
            var n = vn(e);
            return n && n.removeChild(e), e
        }));
    _n(x("selectionStart")), _n(x("selectionEnd")), S(D(L, P)((function(e, n) {
        return e.selectionStart = e.selectionEnd = n, e
    })));
    var Dn = E(bn((function(e, n, t) {
            return e.setAttribute(n, t), e
        }))),
        Rn = E(bn((function(e, n, t) {
            return e.style[n] = t, e
        }))),
        Cn = S(wn((function(e, n) {
            return ve(n, (function(n, t) {
                return Dn(e, t, n)
            })), e
        }))),
        Pn = S(wn((function(e, n) {
            return ve(n, (function(n, t) {
                return Rn(e, t, n)
            })), e
        }))),
        An = S(gn((function(e, n) {
            return e.innerHTML = n, e
        }))),
        Mn = S(gn((function(e, n) {
            return Rn(e, "display", n)
        })));
    Mn("none"), Mn("block"), Mn("inline-block");
    var In, Nn, Tn, Bn = x("offsetWidth"),
        Ln = x("offsetHeight"),
        On = z(pn),
        xn = On.matches || On.matchesSelector || On.webkitMatchesSelector || On.mozMatchesSelector || On.msMatchesSelector || On.oMatchesSelector,
        Kn = S(gn((function(e, n) {
            return xn.call(e, n)
        }))),
        zn = function(e, n, t, r) {
            if (!F(e, pn)) return function(i) {
                var a = n;
                return A(t) ? a = function(e) {
                        for (var r = e.target; !Kn(r, t) && r !== i;) r = vn(r);
                        r !== i && (e.delegateTarget = r, n(e))
                    } : r = t, r = !!r, i.addEventListener(e, a, r),
                    function() {
                        return i.removeEventListener(e, a, r)
                    }
            }
        },
        Fn = b,
        Hn = $("Network error"),
        jn = 0,
        Gn = !1,
        Un = 0;

    function Yn() {
        Gn && (Gn = !1), $n(0)
    }

    function $n(e) {
        isNaN(e) || (Un = +e)
    }

    function Vn(e) {
        return Yn(), this ? this(e) : null
    }

    function Zn(e, n) {
        return function(e, n, t) {
            var r;
            return n && t ? J(e, q(((r = {})[n] = t, r))) : e
        }(e, "keyless_header", n)
    }

    function Wn(e) {
        if (!F(this, Wn)) return new Wn(e);
        this.options = function(e) {
            var n = e;
            A(e) && (n = {
                url: e
            });
            if (n) {
                var t = n.method,
                    r = n.headers,
                    i = n.callback,
                    a = n.data;
                return r || (n.headers = {}), t || (n.method = "get"), i || (n.callback = function(e) {
                    return e
                }), O(a) && !F(a, k) && (a = q(a)), n.data = a, n
            }
            return e
        }(e), this.defer()
    }
    var qn = {
        options: {
            url: "",
            method: "get",
            callback: function(e) {
                return e
            }
        },
        setReq: function(e, n) {
            return this.abort(), this.type = e, this.req = n, this
        },
        till: function(e, n, t) {
            var r = this;
            if (void 0 === n && (n = 0), void 0 === t && (t = 3e3), !Gn) {
                var i = Un ? Un * t : t;
                return this.setReq("timeout", s((function() {
                    r.call((function(i) {
                        i.error && n > 0 ? r.till(e, n - 1, t) : e(i) ? r.till(e, n, t) : r.options.callback && r.options.callback(i)
                    }))
                }), i))
            }
            s((function() {
                r.till(e, n, t)
            }), t)
        },
        abort: function() {
            var n = this.req,
                t = this.type;
            n && ("ajax" === t ? n.abort() : "jsonp" === t ? e.Razorpay[n] = function(e) {
                return e
            } : m(n), this.req = null)
        },
        defer: function() {
            var e = this;
            this.req = s((function() {
                return e.call()
            }))
        },
        call: function(n) {
            void 0 === n && (n = this.options.callback);
            var t = this.options,
                r = t.method,
                i = t.data,
                a = t.headers,
                o = void 0 === a ? {} : a,
                u = this.options.url;
            u = Zn(u, Tn);
            var c = new Fn;
            this.setReq("ajax", c), c.open(r, u, !0), c.onreadystatechange = function() {
                if (4 === c.readyState && c.status) {
                    var t = Je(c.responseText);
                    t || ((t = $("Parsing error")).xhr = {
                        status: c.status,
                        text: c.responseText
                    }), t.error && e.dispatchEvent(X("rzp_network_error", {
                        detail: {
                            method: r,
                            url: u,
                            baseUrl: u.split("?")[0],
                            status: c.status,
                            xhrErrored: !1,
                            response: t
                        }
                    })), t.status_code = c.status, n(t)
                }
            }, c.onerror = function() {
                var t = Hn;
                t.xhr = {
                    status: 0
                }, e.dispatchEvent(X("rzp_network_error", {
                    detail: {
                        method: r,
                        url: u,
                        baseUrl: null == u ? void 0 : u.split("?")[0],
                        status: 0,
                        xhrErrored: !0,
                        response: t
                    }
                })), n(t)
            }, In && (o["X-Razorpay-SessionId"] = In), Nn && (o["X-Razorpay-TrackId"] = Nn), ve(o, (function(e, n) {
                return c.setRequestHeader(n, e)
            })), c.send(i)
        }
    };
    qn.constructor = Wn, Wn.prototype = qn, Wn.post = Vn.bind((function(e) {
        return e.method = "post", e.headers || (e.headers = {}), e.headers["Content-type"] || (e.headers["Content-type"] = "application/x-www-form-urlencoded"), Wn(e)
    })), Wn.patch = Vn.bind((function(e) {
        return e.method = "PATCH", e.headers || (e.headers = {}), e.headers["Content-type"] || (e.headers["Content-type"] = "application/x-www-form-urlencoded"), Wn(e)
    })), Wn.put = Vn.bind((function(e) {
        return e.method = "put", e.headers || (e.headers = {}), e.headers["Content-type"] || (e.headers["Content-type"] = "application/x-www-form-urlencoded"), Wn(e)
    })), Wn.setSessionId = function(e) {
        In = e
    }, Wn.setTrackId = function(e) {
        Nn = e
    }, Wn.setKeylessHeader = function(e) {
        Tn = e
    }, Wn.jsonp = Vn.bind((function(t) {
        t.data || (t.data = {});
        var r = jn++,
            i = 0,
            a = new Wn(t);
        return t = a.options, a.call = function(a) {
            void 0 === a && (a = t.callback), i++;
            var o = "jsonp".concat(r, "_").concat(i),
                u = !1,
                c = function() {
                    u || this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (u = !0, this.onload = this.onreadystatechange = null, En(this))
                },
                s = e.Razorpay[o] = function(n) {
                    delete n.http_status_code, a(n), delete e.Razorpay[o]
                };
            this.setReq("jsonp", s);
            var l = J(t.url, t.data);
            l = J(l = Zn(l, Tn), q({
                callback: "Razorpay.".concat(o)
            }));
            var m = hn("script");
            be(m, {
                src: l,
                async: !0,
                onerror: function() {
                    return a(Hn)
                },
                onload: c,
                onreadystatechange: c
            }), kn(m, n.documentElement)
        }, a
    })), Wn.pausePoll = function() {
        Gn || (Gn = !0)
    }, Wn.resumePoll = Yn, Wn.setPollDelayBy = $n;
    var Jn = "session_created",
        Xn = "session_errored",
        Qn = !1,
        et = !1;

    function nt(e, n) {
        var t = [{
            name: e === Jn ? "checkout.sessionCreated.metrics" : "checkout.sessionErrored.metrics",
            labels: [{
                type: e
            }]
        }];
        return n && (t[0].labels[0].severity = n), t
    }

    function tt(e, n) {
        var t, r, i, a, o, u = We(y, "sendBeacon"),
            c = {
                url: "https://lumberjack-metrics.razorpay.com/v1/frontend-metrics",
                data: {
                    key: "ZmY5N2M0YzVkN2JiYzkyMWM1ZmVmYWJk",
                    data: (o = {
                        metrics: nt(e, n)
                    }, a = ye(o), i = f(a), r = v(i), t = h(r), f(t))
                }
            },
            s = mn("merchant_key") || dn("key") || "";
        if (!(s && s.indexOf("test_") > -1) && (!Qn && e === Jn || !et && e === Xn)) try {
            u ? y.sendBeacon(c.url, ye(c.data)) : Wn.post(c), e === Jn && (Qn = !0), e === Xn && (et = !0)
        } catch (e) {}
    }
    var rt = 2670243619,
        it = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        at = it.split("").reduce((function(e, n, t) {
            var r;
            return Re({}, e, ((r = {})[n] = t, r))
        }), {});

    function ot(e) {
        for (var n = ""; e;) n = it[e % 62] + n, e = G(e / 62);
        return n
    }

    function ut() {
        var e, n = ot(a(H() - 13885344e5) + a("000000" + G(1e6 * j())).slice(-6)) + ot(G(238328 * j())) + "0",
            t = 0;
        return n.split("").forEach((function(r, i) {
            e = at[n[n.length - 1 - i]], (n.length - i) % 2 && (e *= 2), e >= 62 && (e = e % 62 + 1), t += e
        })), (e = t % 62) && (e = it[62 - e]), a(n).slice(0, 13) + e
    }
    var ct = ut(),
        st = {
            library: "checkoutjs",
            platform: "browser",
            referer: g.href
        };

    function lt(e) {
        var n = {
            checkout_id: e ? e.id : ct
        };
        return ["device", "env", "integration", "library", "os_version", "os", "platform_version", "platform", "referer"].forEach((function(e) {
            st[e] && (n[e] = st[e])
        })), n
    }
    var mt, dt, ft = [],
        pt = [],
        ht = function(e) {
            var n, t, r, i, a;
            if (e && (mt = e), ft.length && "live" === mt) {
                ft.forEach((function(e) {
                    ("open" === e.event || "submit" === e.event && "razorpayjs" === vt.props.library) && tt("session_created")
                }));
                var o = We(y, "sendBeacon"),
                    u = {
                        url: "https://lumberjack.razorpay.com/v1/track",
                        data: {
                            key: "ZmY5N2M0YzVkN2JiYzkyMWM1ZmVmYWJk",
                            data: (a = {
                                context: dt,
                                addons: [{
                                    name: "ua_parser",
                                    input_key: "user_agent",
                                    output_key: "user_agent_parsed"
                                }],
                                events: ft.splice(0, 5)
                            }, i = ye(a), r = f(i), t = v(r), n = h(t), f(n))
                        }
                    };
                try {
                    var c = !1;
                    o && (c = y.sendBeacon(u.url, ye(u.data))), c || Wn.post(u)
                } catch (e) {}
            }
        };

    function vt(e, n, t, r) {
        e ? "test" !== (mt = e.getMode()) && s((function() {
            t instanceof Error && (t = {
                message: t.message,
                stack: t.stack
            });
            var i = lt(e);
            i.user_agent = null, i.mode = "live";
            var a = fn();
            a && (i.order_id = a);
            var o = {},
                u = {
                    options: o
                };
            t && (u.data = t), o = be(o, we(e.get())), "function" == typeof e.get("handler") && (o.handler = !0);
            var c = e.get("callback_url");
            c && "string" == typeof c && (o.callback_url = !0), We(o, "prefill") && ["card"].forEach((function(e) {
                We(o.prefill, e) && (o.prefill[e] = !0)
            })), o.image && Z(o.image) && (o.image = "base64");
            var s, l = e.get("external.wallets") || [];
            o.external_wallets = l.reduce((function(e, n) {
                var t;
                return Re({}, e, ((t = {})[n] = !0, t))
            }), {}), ct && (u.local_order_id = ct), u.build_number = rt, u.experiments = Fe.getExperimentsFromStorage(), s = {
                event: n,
                properties: u,
                timestamp: H()
            }, ft.push(s), dt = i, r && ht()
        })) : pt.push([n, t, r])
    }
    l((function() {
        ht()
    }), 1e3), vt.dispatchPendingEvents = function(e) {
        if (e) {
            var n = vt.bind(vt, e);
            pt.splice(0, pt.length).forEach((function(e) {
                n.apply(vt, e)
            }))
        }
    }, vt.parseAnalyticsData = function(e) {
        var n;
        O(e) && (n = e, ve((function(e, n) {
            st[e] = n
        }))(n))
    }, vt.makeUid = ut, vt.common = lt, vt.props = st, vt.id = ct, vt.updateUid = function(e) {
        ct = e, vt.id = e
    }, vt.flush = ht;
    var _t, yt = {},
        gt = {},
        bt = function(e) {
            var n = ke(e);
            return ve(n, (function(e, t) {
                M(e) && (n[t] = e.call())
            })), n
        },
        wt = {
            setR: function(e) {
                _t = e, vt.dispatchPendingEvents(e)
            },
            track: function(e, n) {
                var t = void 0 === n ? {} : n,
                    r = t.type,
                    i = t.data,
                    a = void 0 === i ? {} : i,
                    o = t.r,
                    u = void 0 === o ? _t : o,
                    c = t.immediately,
                    s = void 0 !== c && c,
                    l = bt(yt);
                a = function(e) {
                    var n = ge(e || {});
                    return ["token"].forEach((function(e) {
                        n[e] && (n[e] = "__REDACTED__")
                    })), n
                }(a), (a = O(a) ? ge(a) : {
                    data: a
                }).meta && O(a.meta) && (l = be(l, a.meta)), a.meta = l, a.meta.request_index = gt[_t.id], r && (e = r + ":" + e), vt(u, e, a, s)
            },
            setMeta: function(e, n) {
                yt[e] = n
            },
            removeMeta: function(e) {
                delete yt[e]
            },
            getMeta: function() {
                return we(yt)
            },
            updateRequestIndex: function(e) {
                if (!_t || !e) return 0;
                We(gt, _t.id) || (gt[_t.id] = {});
                var n = gt[_t.id];
                return We(n, e) || (n[e] = -1), n[e] += 1, n[e]
            }
        },
        kt = function(e, n) {
            if (!e) return n;
            var t = {};
            return i.keys(n).forEach((function(r) {
                var i = n[r];
                "__PREFIX" !== r || "__PREFIX" !== i ? t[r] = e + ":" + i : t[e.toUpperCase()] = "" + e
            })), t
        },
        St = kt("card", Re({}, {
            ADD_NEW_CARD: "add_new"
        }, {
            APP_SELECT: "app:select",
            ADD_CARD_SCREEN_RENDERED: "1cc_payments_add_new_card_screen_loaded",
            SAVED_CARD_SCREEN_RENDERED: "1cc_payments_saved_card_screen_loaded"
        })),
        Et = kt("saved_cards", {
            __PREFIX: "__PREFIX",
            CHECK_SAVED_CARDS: "check",
            HIDE_SAVED_CARDS: "hide",
            SHOW_SAVED_CARDS: "show",
            SKIP_SAVED_CARDS: "skip",
            EMI_PLAN_VIEW_SAVED_CARDS: "emi:plans:view",
            OTP_SUBMIT_SAVED_CARDS: "save:otp:submit",
            ACCESS_OTP_SUBMIT_SAVED_CARDS: "access:otp:submit",
            USER_CONSENT_FOR_TOKENIZATION: "user_consent_for_tokenization",
            TOKENIZATION_KNOW_MORE_MODAL: "tokenization_know_more_modal"
        }),
        Dt = kt("emi", {
            VIEW_EMI_PLANS: "plans:view",
            EDIT_EMI_PLANS: "plans:edit",
            PAY_WITHOUT_EMI: "pay_without",
            VIEW_ALL_EMI_PLANS: "plans:view:all",
            SELECT_EMI_PLAN: "plan:select",
            CHOOSE_EMI_PLAN: "plan:choose",
            EMI_PLANS: "plans",
            EMI_CONTACT: "contact",
            EMI_CONTACT_FILLED: "contact:filled"
        }),
        Rt = Re({}, {
            SHOW_AVS_SCREEN: "avs_screen:show",
            LOAD_AVS_FORM: "avs_screen:load_form",
            AVS_FORM_DATA_INPUT: "avs_screen:form_data_input",
            AVS_FORM_SUBMIT: "avs_screen:form_submit"
        }, {
            HIDE_ADD_CARD_SCREEN: "add_cards:hide"
        }, {
            SHOW_PAYPAL_RETRY_SCREEN: "paypal_retry:show",
            SHOW_PAYPAL_RETRY_ON_OTP_SCREEN: "paypal_retry:show:otp_screen",
            PAYPAL_RETRY_CANCEL_BTN_CLICK: "paypal_retry:cancel_click",
            PAYPAL_RETRY_PAYPAL_BTN_CLICK: "paypal_retry:paypal_click",
            PAYPAL_RETRY_PAYPAL_ENABLED: "paypal_retry:paypal_enabled"
        });
    Re({}, St, Et, Dt, Rt);
    var Ct = kt("cred", {
        ELIGIBILITY_CHECK: "eligibility_check",
        SUBTEXT_OFFER_EXPERIMENT: "subtext_offer_experiment",
        EXPERIMENT_OFFER_SELECTED: "experiment_offer_selected"
    });
    kt("offer", Re({}, {
        APPLY: "apply"
    }));
    kt("p13n", Re({}, {
        INSTRUMENTS_SHOWN: "instruments_shown",
        INSTRUMENTS_LIST: "instruments:list"
    }));
    kt("home", Re({}, {
        HOME_LOADED: "checkoutHomeScreenLoaded",
        HOME_LOADED_V2: "1cc_payment_home_screen_loaded",
        PAYMENT_INSTRUMENT_SELECTED: "checkoutPaymentInstrumentSelected",
        PAYMENT_INSTRUMENT_SELECTED_V2: "1cc_payment_home_screen_instrument_selected",
        PAYMENT_METHOD_SELECTED: "checkoutPaymentMethodSelected",
        PAYMENT_METHOD_SELECTED_V2: "1cc_payment_home_screen_method_selected",
        METHODS_SHOWN: "methods:shown",
        METHODS_HIDE: "methods:hide",
        P13N_EXPERIMENT: "p13n:experiment",
        LANDING: "landing",
        PROCEED: "proceed"
    }));
    kt("order", Re({}, {
        INVALID_TPV: "invalid_tpv"
    }));
    var Pt = "automatic_checkout_open",
        At = "automatic_checkout_click";
    kt("downtime", Re({}, {
        ALERT_SHOW: "alert:show",
        CALLOUT_SHOW: "callout:show",
        DOWNTIME_ALERTSHOW: "alert:show"
    }));
    var Mt = "js_error",
        It = function() {
            var e = {};
            return i.keys(Le).forEach((function(n) {
                var t = Le[n],
                    r = "Track" + t.charAt(0).toUpperCase() + t.slice(1);
                e[r] = function(e, n) {
                    wt.track(e, {
                        type: t,
                        data: n
                    })
                }
            })), e.Track = function(e, n) {
                wt.track(e, {
                    data: n
                })
            }, e
        }();

    function Nt(e) {
        return e
    }

    function Tt() {
        return this._evts = {}, this._defs = {}, this
    }
    It = function(e) {
        return Re({}, e, {
            setMeta: wt.setMeta,
            removeMeta: wt.removeMeta,
            updateRequestIndex: wt.updateRequestIndex,
            setR: wt.setR
        })
    }(It), Tt.prototype = {
        onNew: Nt,
        def: function(e, n) {
            this._defs[e] = n
        },
        on: function(e, n) {
            if (A(e) && M(n)) {
                var t = this._evts;
                t[e] || (t[e] = []), !1 !== this.onNew(e, n) && t[e].push(n)
            }
            return this
        },
        once: function(e, n) {
            var t = n,
                r = this;
            return n = function n() {
                t.apply(r, arguments), r.off(e, n)
            }, this.on(e, n)
        },
        off: function(e, n) {
            var t = arguments.length;
            if (!t) return Tt.call(this);
            var r = this._evts;
            if (2 === t) {
                var i = r[e];
                if (!M(n) || !N(i)) return;
                if (i.splice(i.indexOf(n), 1), i.length) return
            }
            return r[e] ? delete r[e] : (e += ".", ve(r, (function(n, t) {
                t.indexOf(e) || delete r[t]
            }))), this
        },
        emit: function(e, n) {
            var t = this;
            return (this._evts[e] || []).forEach((function(e) {
                try {
                    e.call(t, n)
                } catch (e) {
                    console.error
                }
            })), this
        },
        emitter: function() {
            var e = arguments,
                n = this;
            return function() {
                n.emit.apply(n, e)
            }
        }
    };
    var Bt = y.userAgent,
        Lt = y.vendor;

    function Ot(e) {
        return e.test(Bt)
    }

    function xt(e) {
        return e.test(Lt)
    }
    var Kt = Ot(/MSIE |Trident\//),
        zt = Ot(/iPhone/),
        Ft = zt || Ot(/iPad/),
        Ht = Ot(/Android/),
        jt = Ot(/iPad/),
        Gt = Ot(/Windows NT/),
        Ut = Ot(/Linux/),
        Yt = Ot(/Mac OS/);
    Ot(/^((?!chrome|android).)*safari/i) || xt(/Apple/), Ot(/firefox/), Ot(/Chrome/) && xt(/Google Inc/), Ot(/; wv\) |Gecko\) Version\/[^ ]+ Chrome/);
    var $t = Ot(/Instagram/);
    Ot(/SamsungBrowser/);
    var Vt = Ot(/FB_IAB/),
        Zt = Ot(/FBAN/),
        Wt = Vt || Zt;
    var qt = Ot(/; wv\) |Gecko\) Version\/[^ ]+ Chrome|Windows Phone|Opera Mini|UCBrowser|CriOS/) || Wt || $t || Ft || Ot(/Android 4/);
    Ot(/iPhone/), Bt.match(/Chrome\/(\d+)/);
    Ot(/(Vivo|HeyTap|Realme|Oppo)Browser/);
    var Jt = function() {
            return zt ? "iPhone" : jt ? "iPad" : Ht ? "android" : e.matchMedia("(max-device-height: 485px),(max-device-width: 485px)").matches ? "mobile" : "desktop"
        },
        Xt = {
            key: "",
            account_id: "",
            image: "",
            amount: 100,
            currency: "INR",
            order_id: "",
            invoice_id: "",
            subscription_id: "",
            auth_link_id: "",
            payment_link_id: "",
            notes: null,
            callback_url: "",
            redirect: !1,
            description: "",
            customer_id: "",
            recurring: null,
            payout: null,
            contact_id: "",
            signature: "",
            retry: !0,
            target: "",
            subscription_card_change: null,
            display_currency: "",
            display_amount: "",
            recurring_token: {
                max_amount: 0,
                expire_by: 0
            },
            checkout_config_id: "",
            send_sms_hash: !1,
            show_address: !0,
            show_coupons: !0,
            mandatory_login: !1,
            enable_ga_analytics: !1,
            enable_fb_analytics: !1,
            customer_cart: {}
        };

    function Qt(e, n, t, r) {
        var i = n[t = t.toLowerCase()],
            u = typeof i;
        "object" === u && null === i ? A(r) && ("true" === r || "1" === r ? r = !0 : "false" !== r && "0" !== r || (r = !1)) : "string" === u && (P(r) || C(r)) ? r = a(r) : "number" === u ? r = o(r) : "boolean" === u && (A(r) ? "true" === r || "1" === r ? r = !0 : "false" !== r && "0" !== r || (r = !1) : P(r) && (r = !!r)), null !== i && u !== typeof r || (e[t] = r)
    }

    function er(e, n, t) {
        ve(e[n], (function(r, i) {
            var a = typeof r;
            "string" !== a && "number" !== a && "boolean" !== a || (i = n + t[0] + i, t.length > 1 && (i += t[1]), e[i] = r)
        })), delete e[n]
    }

    function nr(e, n) {
        var t = {};
        return ve(e, (function(e, r) {
            r in tr ? ve(e, (function(e, i) {
                Qt(t, n, r + "." + i, e)
            })) : Qt(t, n, r, e)
        })), t
    }
    var tr = {};

    function rr(e) {
        e = function(e) {
            return "object" == typeof e.retry && "boolean" == typeof e.retry.enabled && (e.retry = e.retry.enabled), e
        }(e), ve(Xt, (function(e, n) {
            var t;
            O(e) && (t = e, K(i.keys(t))) && (tr[n] = !0, ve(e, (function(e, t) {
                Xt[n + "." + t] = e
            })), delete Xt[n])
        })), (e = nr(e, Xt)).callback_url && qt && (e.redirect = !0), this.get = function(n) {
            return arguments.length ? n in e ? e[n] : Xt[n] : e
        }, this.set = function(n, t) {
            e[n] = t
        }, this.unset = function(n) {
            delete e[n]
        }
    }
    var ir, ar, or, ur = "rzp_device_id",
        cr = 1,
        sr = "",
        lr = "",
        mr = e.screen;
    try {
        (or = [y.userAgent, y.language, (new u).getTimezoneOffset(), y.platform, y.cpuClass, y.hardwareConcurrency, mr.colorDepth, y.deviceMemory, mr.width + mr.height, mr.width * mr.height, e.devicePixelRatio], ir = or.join(), ar = new e.TextEncoder("utf-8").encode(ir), e.crypto.subtle.digest("SHA-1", ar).then((function(n) {
            return sr = function(n) {
                for (var t = [], r = new e.DataView(n), i = 0; i < r.byteLength; i += 4) {
                    var a = "00000000",
                        o = (a + r.getUint32(i).toString(16)).slice(-a.length);
                    t.push(o)
                }
                return t.join("")
            }(n)
        }))).then((function(e) {
            e && (sr = e, function(e) {
                if (e) {
                    try {
                        lr = Ke.getItem(ur)
                    } catch (e) {}
                    if (!lr) {
                        lr = [cr, e, u.now(), c.random().toString().slice(-8)].join(".");
                        try {
                            Ke.setItem(ur, lr)
                        } catch (e) {}
                    }
                }
            }(e))
        })).catch(t)
    } catch (e) {}

    function dr() {
        var e;
        return null != (e = lr) ? e : null
    }
    var fr, pr = "com.google.android.apps.nbu.paisa.user",
        hr = function(e, n) {
            void 0 === n && (n = {});
            var t = ge(e);
            n.feesRedirect && (t.view = "html"), ["amount", "currency", "signature", "description", "order_id", "account_id", "notes", "subscription_id", "auth_link_id", "payment_link_id", "customer_id", "recurring", "subscription_card_change", "recurring_token.max_amount", "recurring_token.expire_by"].forEach((function(e) {
                if (!t.hasOwnProperty(e)) {
                    var n = "order_id" === e ? fn() : dn(e);
                    n && ("boolean" == typeof n && (n = 1), t[e.replace(/\.(\w+)/g, "[$1]")] = n)
                }
            }));
            var r = dn("key");
            !t.key_id && r && (t.key_id = r), n.avoidPopup && "wallet" === t.method && (t["_[source]"] = "checkoutjs"), (n.tez || n.gpay) && (t["_[flow]"] = "intent", t["_[app]"] || (t["_[app]"] = pr));
            ["integration", "integration_version", "integration_parent_version"].forEach((function(e) {
                var n = dn("_." + e);
                n && (t["_[" + e + "]"] = n)
            }));
            var i, a = null != (i = sr) ? i : null;
            a && (t["_[shield][fhash]"] = a);
            var o = dr();
            o && (t["_[device_id]"] = o), t["_[shield][tz]"] = -(new u).getTimezoneOffset(), t["_[build]"] = rt, er(t, "notes", "[]"), er(t, "card", "[]");
            var c = t["card[expiry]"];
            return A(c) && (t["card[expiry_month]"] = c.slice(0, 2), t["card[expiry_year]"] = c.slice(-2), delete t["card[expiry]"]), t._ = vt.common(), er(t, "_", "[]"), t
        },
        vr = "avoidPopup",
        _r = "forceIframeFlow",
        yr = "onlyPhoneRequired",
        gr = "forcePopupCustomCheckout",
        br = "disableWalletAmountCheck";
    (fr = {})[_r] = !0, fr[yr] = !0, fr[gr] = !0;
    var wr = {
        api: "https://api.razorpay.com/",
        version: "v1/",
        frameApi: "/",
        cdn: "https://cdn.razorpay.com/"
    };
    try {
        be(wr, e.Razorpay.config)
    } catch (e) {}

    function kr(e) {
        var n = e.doc,
            t = void 0 === n ? window.document : n,
            r = e.url,
            i = e.method,
            a = void 0 === i ? "post" : i,
            o = e.target,
            u = e.params,
            c = void 0 === u ? {} : u;
        if (c = Rr(c), a && "get" === a.toLowerCase()) {
            var s = Dr(r, c || "");
            o ? window.open(s, o) : t !== window.document ? t.location.assign(s) : window.location.assign(s)
        } else {
            var l = t.createElement("form");
            l.method = a, l.action = r, o && (l.target = o), Sr({
                doc: t,
                form: l,
                data: c
            }), t.body.appendChild(l), l.submit()
        }
    }

    function Sr(e) {
        var n = e.doc,
            t = void 0 === n ? window.document : n,
            r = e.form,
            i = e.data;
        if (Ze(i))
            for (var a in i)
                if (i.hasOwnProperty(a)) {
                    var o = Er({
                        doc: t,
                        name: a,
                        value: i[a]
                    });
                    r.appendChild(o)
                }
    }

    function Er(e) {
        var n = e.doc,
            t = void 0 === n ? window.document : n,
            r = e.name,
            i = e.value,
            a = t.createElement("input");
        return a.type = "hidden", a.name = r, a.value = i, a
    }

    function Dr(e, n) {
        return "object" == typeof n && null !== n && (n = function(e) {
            Ze(e) || (e = {});
            var n = [];
            for (var t in e) e.hasOwnProperty(t) && n.push(f(t) + "=" + f(e[t]));
            return n.join("&")
        }(n)), n && (e += e.indexOf("?") > 0 ? "&" : "?", e += n), e
    }

    function Rr(e) {
        var n = e;
        Ze(n) || (n = {});
        var t = {};
        if (0 === i.keys(n).length) return {};
        return function e(n, a) {
            if (i(n) !== n) t[a] = n;
            else if (r.isArray(n)) {
                for (var o = n.length, u = 0; u < o; u++) e(n[u], a + "[" + u + "]");
                0 === o && (t[a] = [])
            } else {
                var c = !0;
                for (var s in n) c = !1, e(n[s], a ? a + "[" + s + "]" : s);
                c && a && (t[a] = {})
            }
        }(n, ""), t
    }

    function Cr(n, t) {
        return void 0 === n && (n = ""), void 0 === t && (t = !0), ["checkoutjs", "hosted"].includes(vt.props.library) && e.session_token && t ? function(e, n) {
            return void 0 === e && (e = ""), Dr(wr.api + wr.version + "standard_checkout/" + e, {
                session_token: n
            })
        }(n, e.session_token) : wr.api + wr.version + n
    }
    var Pr = ["key", "order_id", "invoice_id", "subscription_id", "auth_link_id", "payment_link_id", "contact_id", "checkout_config_id"];
    Ue({}), Ue({}), Ue(""), Ue("");
    var Ar, Mr = wr.cdn + "bank/";
    Ar = {
        ICIC_C: "ICICI Corporate",
        UTIB_C: "Axis Corporate",
        SBIN: "SBI",
        HDFC: "HDFC",
        ICIC: "ICICI",
        UTIB: "Axis",
        KKBK: "Kotak",
        YESB: "Yes",
        IBKL: "IDBI",
        BARB_R: "BOB",
        PUNB_R: "PNB",
        IOBA: "IOB",
        FDRL: "Federal",
        CORP: "Corporate",
        IDFB: "IDFC",
        INDB: "IndusInd",
        VIJB: "Vijaya Bank"
    }, i.entries(Ar).map((function(e) {
        return {
            name: e[1],
            code: e[0],
            logo: (n = e[0], "" + Mr + n.slice(0, 4) + ".gif")
        };
        var n
    }));
    ([{
        code: "KKBK",
        name: "Kotak Mahindra Bank"
    }, {
        code: "HDFC_DC",
        name: "HDFC Debit Cards"
    }, {
        code: "HDFC",
        name: "HDFC Credit Cards"
    }, {
        code: "UTIB",
        name: "Axis Bank"
    }, {
        code: "INDB",
        name: "Indusind Bank"
    }, {
        code: "RATN",
        name: "RBL Bank"
    }, {
        code: "ICIC",
        name: "ICICI Bank"
    }, {
        code: "SCBL",
        name: "Standard Chartered Bank"
    }, {
        code: "YESB",
        name: "Yes Bank"
    }, {
        code: "AMEX",
        name: "American Express"
    }, {
        code: "SBIN",
        name: "State Bank of India"
    }, {
        code: "BARB",
        name: "Bank of Baroda"
    }, {
        code: "BAJAJ",
        name: "Bajaj Finserv"
    }, {
        code: "CITI",
        name: "CITI Bank"
    }, {
        code: "HSBC",
        name: "HSBC Credit Cards"
    }] || []).reduce((function(e, n) {
        return e[n.code] = n, e
    }), {});
    var Ir = wr.cdn,
        Nr = Ir + "cardless_emi/",
        Tr = Ir + "cardless_emi-sq/",
        Br = {
            min_amount: 3e5,
            headless: !0,
            fee_bearer_customer: !0
        };
    _e({
        walnut369: {
            name: "Axio",
            fee_bearer_customer: !1,
            headless: !1,
            pushToFirst: !0,
            min_amount: 100
        },
        bajaj: {
            name: "Bajaj Finserv"
        },
        sezzle: {
            name: "Sezzle",
            headless: !1,
            fee_bearer_customer: !1,
            min_amount: 2e4
        },
        earlysalary: {
            name: "EarlySalary",
            fee_bearer_customer: !1
        },
        zestmoney: {
            name: "ZestMoney",
            min_amount: 9900,
            fee_bearer_customer: !1
        },
        flexmoney: {
            name: "Cardless EMI by InstaCred",
            headless: !1,
            fee_bearer_customer: !1
        },
        barb: {
            name: "Bank of Baroda Cardless EMI",
            headless: !1
        },
        fdrl: {
            name: "Federal Bank Cardless EMI",
            headless: !1
        },
        hdfc: {
            name: "HDFC Bank Cardless EMI",
            headless: !1
        },
        idfb: {
            name: "IDFC First Bank Cardless EMI",
            headless: !1
        },
        kkbk: {
            name: "Kotak Mahindra Bank Cardless EMI",
            headless: !1
        },
        icic: {
            name: "ICICI Bank Cardless EMI",
            headless: !1
        },
        hcin: {
            name: "Home Credit Ujjwal Card",
            headless: !1,
            min_amount: 5e4
        }
    }, (function(e, n) {
        var t, r, i;
        return i = {}, r = be(Br)(i), t = be({
            code: n,
            logo: Nr + n + ".svg",
            sqLogo: Tr + n + ".svg"
        })(r), be(e)(t)
    }));
    var Lr = function(e, n) {
            var t = {
                tags: n
            };
            switch (!0) {
                case !e:
                    t.message = "NA";
                    break;
                case "string" == typeof e:
                    t.message = e;
                    break;
                case "object" == typeof e:
                    var r = e.name,
                        i = e.message,
                        a = e.stack,
                        o = e.fileName,
                        u = e.lineNumber,
                        c = e.columnNumber;
                    t = Re({}, JSON.parse(JSON.stringify(e)), {
                        name: r,
                        message: i,
                        stack: a,
                        fileName: o,
                        lineNumber: u,
                        columnNumber: c,
                        tags: n
                    });
                    break;
                default:
                    t.message = JSON.stringify(e)
            }
            return t
        },
        Or = "S0",
        xr = "S1",
        Kr = "S3",
        zr = wr.cdn,
        Fr = zr + "paylater/",
        Hr = zr + "paylater-sq/",
        jr = {
            min_amount: 3e5
        };
    _e({
        epaylater: {
            name: "ePayLater"
        },
        getsimpl: {
            name: "Simpl"
        },
        icic: {
            name: "ICICI Bank PayLater"
        },
        hdfc: {
            name: "FlexiPay by HDFC Bank"
        },
        lazypay: {
            name: "LazyPay"
        },
        kkbk: {
            name: "kkbk"
        }
    }, (function(e, n) {
        var t, r, i;
        return i = {}, r = be(jr)(i), t = be({
            code: n,
            logo: Fr + n + ".svg",
            sqLogo: Hr + n + ".svg"
        })(r), be(e)(t)
    }));
    var Gr = wr.cdn,
        Ur = {
            TRUSTLY: "trustly",
            POLI: "poli",
            SOFORT: "sofort",
            GIROPAY: "giropay"
        },
        Yr = wr.cdn;

    function $r(e) {
        this.name = e, this._exists = !1, this.platform = "", this.bridge = {}, this.init()
    }
    Re({
        google_pay: {
            code: "google_pay",
            logo: Yr + "app/googlepay.svg",
            card_logo: Yr + "card/googlepay.svg",
            verify_registration: !0,
            externalSDK: "googlepay",
            isCompatibleWithSDK: function(e) {
                return "android" === e.platform
            }
        },
        cred: {
            code: "cred",
            logo: Yr + "checkout/cred.png",
            uri: "credpay",
            package_name: "com.dreamplug.androidapp",
            isCompatibleWithSDK: function(e) {
                var n = e.platform;
                return "android" === n || "ios" === n
            }
        }
    }, function() {
        var e = {};
        return i.keys(Ur).forEach((function(n) {
            e[Ur[n]] = {
                code: Ur[n],
                logo: Gr + "international/" + Ur[n] + ".png",
                uri: "",
                package_name: "",
                isCompatibleWithSDK: function(e) {
                    var n = e.platform;
                    return "android" === n || "ios" === n
                }
            }
        })), e
    }()), $r.prototype = {
        init: function() {
            var e = this.name,
                n = window[e],
                t = ((window.webkit || {}).messageHandlers || {})[e];
            t ? (this._exists = !0, this.bridge = t, this.platform = "ios") : n && (this._exists = !0, this.bridge = n, this.platform = "android")
        },
        exists: function() {
            return this._exists
        },
        get: function(e) {
            if (this.exists())
                if ("android" === this.platform) {
                    if (M(this.bridge[e])) return this.bridge[e]
                } else if ("ios" === this.platform) return this.bridge.postMessage
        },
        has: function(e) {
            return !(!this.exists() || !this.get(e))
        },
        callAndroid: function(e) {
            for (var n = arguments.length, t = new r(n > 1 ? n - 1 : 0), i = 1; i < n; i++) t[i - 1] = arguments[i];
            t = t.map((function(e) {
                return "object" == typeof e ? ye(e) : e
            }));
            var a = this.get(e);
            if (a) return a.apply(this.bridge, t)
        },
        callIos: function(e) {
            var n = this.get(e);
            if (n) try {
                var t = {
                        action: e
                    },
                    r = arguments.length <= 1 ? void 0 : arguments[1];
                return r && (t.body = r), n.call(this.bridge, t)
            } catch (e) {}
        },
        call: function(e) {
            for (var n = arguments.length, t = new r(n > 1 ? n - 1 : 0), i = 1; i < n; i++) t[i - 1] = arguments[i];
            var a = this.get(e);
            t = [e].concat(t), a && (this.callAndroid.apply(this, t), this.callIos.apply(this, t))
        }
    };
    var Vr = n.body,
        Zr = e.innerHeight,
        Wr = e.pageYOffset,
        qr = window.scrollBy,
        Jr = window.scrollTo,
        Xr = window.requestAnimationFrame,
        Qr = n.querySelector.bind(n),
        ei = n.querySelectorAll.bind(n);
    n.getElementById.bind(n), e.getComputedStyle.bind(e);
    var ni, ti = function(e) {
        return "string" == typeof e ? Qr(e) : e
    };

    function ri(n) {
        if (!n.target && e !== e.parent) return e.Razorpay.sendMessage({
            event: "redirect",
            data: n
        });
        kr({
            url: n.url,
            params: n.content,
            method: n.method,
            target: n.target
        })
    }

    function ii(e) {
        var n = {};
        return null == e || e.querySelectorAll("[name]").forEach((function(e) {
            n[e.name] = e.value
        })), n
    }

    function ai(n) {
        ! function(n) {
            if (!e.requestAnimationFrame) return qr(0, n);
            ni && m(ni);
            ni = s((function() {
                var t = Wr,
                    r = c.min(t + n, Ln(Vr) - Zr);
                n = r - t;
                var i = 0,
                    a = e.performance.now();

                function o(e) {
                    if ((i += (e - a) / 300) >= 1) return Jr(0, r);
                    var u = c.sin(oi * i / 2);
                    Jr(0, t + c.round(n * u)), a = e, Xr(o)
                }
                Xr(o)
            }), 100)
        }(n - Wr)
    }
    var oi = c.PI;
    new $r("CheckoutBridge"), new $r("StorageBridge");
    var ui = wr.cdn,
        ci = ui + "wallet/",
        si = ui + "wallet-sq/",
        li = ["mobikwik", "freecharge", "payumoney"];
    _e({
        airtelmoney: ["Airtel Money", 32],
        amazonpay: ["Amazon Pay", 28],
        citrus: ["Citrus Wallet", 32],
        freecharge: ["Freecharge", 18],
        jiomoney: ["JioMoney", 68],
        mobikwik: ["Mobikwik", 20],
        olamoney: ["Ola Money (Postpaid + Wallet)", 22],
        paypal: ["PayPal", 20],
        paytm: ["Paytm", 18],
        payumoney: ["PayUMoney", 18],
        payzapp: ["PayZapp", 24],
        phonepe: ["PhonePe", 20],
        sbibuddy: ["SBI Buddy", 22],
        zeta: ["Zeta", 25],
        citibankrewards: ["Citibank Reward Points", 20],
        itzcash: ["Itz Cash", 20],
        paycash: ["PayCash", 20]
    }, (function(e, n) {
        return {
            power: -1 !== li.indexOf(n),
            name: e[0],
            h: e[1],
            code: n,
            logo: ci + n + ".png",
            sqLogo: si + n + ".png"
        }
    }));
    var mi, di, fi, pi = (void 0 === mi && (mi = g.search), A(mi) ? (di = mi.slice(1), fi = {}, di.split(/=|&/).forEach((function(e, n, t) {
        n % 2 && (fi[t[n - 1]] = p(e))
    })), fi) : {});

    function hi(e, n, t) {
        n = ge(n);
        var r = e.method,
            i = bi[r].payment;
        if (n.method = r, i.forEach((function(t) {
                var r = e[t];
                T(r) || (n[t] = r)
            })), e.token_id && t) {
            var a = Se(t, "tokens.items", []).find((function(n) {
                return n.id === e.token_id
            }));
            a && (n.token = a.token)
        }
        return n
    }

    function vi() {
        return !0
    }

    function _i(e) {
        return [e]
    }
    var yi = ["types", "iins", "issuers", "networks", "token_id"],
        gi = ["flows", "apps", "token_id", "vpas"],
        bi = {
            card: {
                properties: yi,
                payment: ["token"],
                groupedToIndividual: function(e, n) {
                    var t = Se(n, "tokens.items", []),
                        r = ge(e);
                    if (yi.forEach((function(e) {
                            delete r[e]
                        })), e.token_id) {
                        var i = e.token_id,
                            a = t.find((function(e) {
                                return e.id === i
                            }));
                        if (a) return [be({
                            token_id: i,
                            type: a.card.type,
                            issuer: a.card.issuer,
                            network: a.card.network
                        }, r)]
                    }
                    var o = function(e, n) {
                        void 0 === n && (n = []);
                        var t = [];
                        return n.forEach((function(n) {
                            var r = e[n];
                            if (r && r.length) {
                                var i = n.slice(0, -1);
                                if (0 === t.length) t = r.map((function(e) {
                                    var n;
                                    return (n = {})[i] = e, n
                                }));
                                else {
                                    var a = r.flatMap((function(e) {
                                        return t.map((function(n) {
                                            var t;
                                            return be(((t = {})[i] = e, t), n)
                                        }))
                                    }));
                                    t = a
                                }
                            }
                        })), t
                    }(e, ["issuers", "networks", "types", "iins"]);
                    return o.map((function(e) {
                        return be(e, r)
                    }))
                },
                isValid: function(e) {
                    var n = t(e.issuers),
                        r = t(e.networks),
                        i = t(e.types);
                    return !(n && !e.issuers.length) && (!(r && !e.networks.length) && !(i && !e.types.length))
                }
            },
            netbanking: {
                properties: ["banks"],
                payment: ["bank"],
                groupedToIndividual: function(e) {
                    var n = ge(e);
                    return delete n.banks, (e.banks || []).map((function(e) {
                        return be({
                            bank: e
                        }, n)
                    }))
                },
                isValid: function(e) {
                    return t(e.banks) && e.banks.length > 0
                }
            },
            wallet: {
                properties: ["wallets"],
                payment: ["wallet"],
                groupedToIndividual: function(e) {
                    var n = ge(e);
                    return delete n.wallets, (e.wallets || []).map((function(e) {
                        return be({
                            wallet: e
                        }, n)
                    }))
                },
                isValid: function(e) {
                    return t(e.wallets) && e.wallets.length > 0
                }
            },
            upi: {
                properties: gi,
                payment: ["flow", "app", "token", "vpa"],
                groupedToIndividual: function(e, n) {
                    var r = [],
                        i = [],
                        a = [],
                        o = [],
                        u = Se(n, "tokens.items", []),
                        c = ge(e);
                    if (gi.forEach((function(e) {
                            delete c[e]
                        })), e.flows && (r = e.flows), e.vpas && (a = e.vpas), e.apps && (i = e.apps), r.includes("collect") && a.length) {
                        var s = a.map((function(n) {
                            var t = be({
                                vpa: n,
                                flow: "collect"
                            }, c);
                            if (e.token_id) {
                                var r = e.token_id;
                                u.find((function(e) {
                                    return e.id === r
                                })) && (t.token_id = r)
                            }
                            return t
                        }));
                        o = o.concat(s)
                    }
                    if (r.includes("intent") && i.length) {
                        var l = i.map((function(e) {
                            return be({
                                app: e,
                                flow: "intent"
                            }, c)
                        }));
                        o = o.concat(l)
                    }
                    if (r.length > 0) {
                        var m = r.map((function(e) {
                            var n = be({
                                flow: e
                            }, c);
                            if (!("intent" === e && i.length || "collect" === e && a.length)) return n
                        })).filter(t);
                        o = o.concat(m)
                    }
                    return o
                },
                getPaymentPayload: function(e, n, t) {
                    return "collect" === (n = hi(e, n, t)).flow && (n.flow = "directpay", n.token && n.vpa && delete n.vpa), "qr" === n.flow && (n["_[upiqr]"] = 1, n.flow = "intent"), n.flow && (n["_[flow]"] = n.flow, delete n.flow), n.app && (n.upi_app = n.app, delete n.app), n
                },
                isValid: function(e) {
                    var n = t(e.flows),
                        r = t(e.apps);
                    if (!n || !e.flows.length) return !1;
                    if (r) {
                        if (!e.apps.length) return !1;
                        if (!n || !e.flows.includes("intent")) return !1
                    }
                    return !0
                }
            },
            cardless_emi: {
                properties: ["providers"],
                payment: ["provider"],
                groupedToIndividual: function(e) {
                    var n = ge(e);
                    return delete n.providers, (e.providers || []).map((function(e) {
                        return be({
                            provider: e
                        }, n)
                    }))
                },
                isValid: function(e) {
                    return t(e.providers) && e.providers.length > 0
                }
            },
            paylater: {
                properties: ["providers"],
                payment: ["provider"],
                groupedToIndividual: function(e) {
                    var n = ge(e);
                    return delete n.providers, (e.providers || []).map((function(e) {
                        return be({
                            provider: e
                        }, n)
                    }))
                },
                isValid: function(e) {
                    return t(e.providers) && e.providers.length > 0
                }
            },
            app: {
                properties: ["providers"],
                payment: ["provider"],
                groupedToIndividual: function(e) {
                    var n = ge(e);
                    return delete n.providers, (e.providers || []).map((function(e) {
                        return be({
                            provider: e
                        }, n)
                    }))
                },
                isValid: function(e) {
                    return t(e.providers) && e.providers.length > 0
                }
            },
            international: {
                properties: ["providers"],
                payment: ["provider"],
                groupedToIndividual: function(e) {
                    var n = ge(e);
                    return delete n.providers, (e.providers || []).map((function(e) {
                        return be({
                            provider: e
                        }, n)
                    }))
                },
                isValid: function(e) {
                    return t(e.providers) && e.providers.length > 0
                }
            }
        };

    function wi(e) {
        var n = e.method,
            t = bi[n];
        if (!t) return !1;
        var r = i.keys(e);
        return t.properties.every((function(e) {
            return !r.includes(e)
        }))
    }
    bi.emi = bi.card, bi.credit_card = bi.card, bi.debit_card = bi.card, bi.upi_otm = bi.upi, ["card", "upi", "netbanking", "wallet", "upi_otm", "gpay", "emi", "cardless_emi", "qr", "paylater", "paypal", "bank_transfer", "offline_challan", "nach", "app", "emandate", "cod", "international"].forEach((function(e) {
        bi[e] || (bi[e] = {})
    })), ve(bi, (function(e, n) {
        bi[n] = be({
            getPaymentPayload: hi,
            groupedToIndividual: _i,
            isValid: vi,
            properties: [],
            payment: []
        }, bi[n])
    }));
    var ki = Ue(""),
        Si = Ue("");
    Ue("");
    var Ei = Ye([ki, Si], (function(e) {
        var n = e[0],
            t = e[1];
        return t ? n + t : ""
    }));
    Ue({});
    var Di = Ue(""),
        Ri = Ue("");
    Ye([Di, Ri], (function(e) {
        var n = e[0],
            t = e[1];
        return t ? n + t : ""
    })), ki.subscribe((function(e) {
        Di.set(e)
    })), Si.subscribe((function(e) {
        Ri.set(e)
    })), Ue(""), Ue(""), Ue(""), Ue(""), Ue(""), Ue("netbanking"), Ue(), Ue("");
    var Ci = Ye(Ue([]), (function(e) {
        return e.flatMap((function(e) {
            return e.instruments
        }))
    }));
    Ue([]), Ue([]), Ue([]);
    var Pi = Ye([Ci, Ue(null)], (function(e) {
        var n = e[0],
            t = void 0 === n ? [] : n,
            r = e[1],
            i = void 0 === r ? null : r;
        return t.find((function(e) {
            return e.id === i
        }))
    }));
    Ye(Pi, (function(e) {
        return e && (wi(e) || function(e) {
            var n = wi(e),
                t = ["card", "emi"].includes(e.method);
            if (n) return !0;
            if (t) return !e.token_id;
            if ("upi" === e.method && e.flows) {
                if (e.flows.length > 1) return !0;
                if (e.flows.includes("omnichannel")) return !0;
                if (e.flows.includes("collect")) {
                    var r = e._ungrouped;
                    if (1 === r.length) {
                        var i = r[0],
                            a = i.flow,
                            o = i.vpa;
                        if ("collect" === a && o) return !1
                    }
                    return !0
                }
                if (e.flows.includes("intent") && !e.apps) return !0
            }
            return e._ungrouped.length > 1
        }(e)) ? e : null
    })), Ye(Ei, (function(e) {
        return e && "+91" !== e && "+" !== e
    })), Ue([]);
    var Ai = {};

    function Mi(e) {
        return {
            "_[agent][platform]": (Se(window, "webkit.messageHandlers.CheckoutBridge") ? {
                platform: "ios"
            } : {
                platform: pi.platform || "web",
                library: "checkoutjs",
                version: (pi.version || rt) + ""
            }).platform,
            "_[agent][device]": null != e && e.cred ? "desktop" !== Jt() ? "mobile" : "desktop" : Jt(),
            "_[agent][os]": zt || jt ? "iOS" : Ht ? "android" : Gt ? "windows" : Ut ? "linux" : Yt ? "macOS" : "other"
        }
    } [{
        package_name: pr,
        method: "upi"
    }, {
        package_name: "com.phonepe.app",
        method: "upi"
    }, {
        package_name: "cred",
        method: "app"
    }].forEach((function(e) {
        Ai[e.package_name] = !1
    }));
    var Ii = {};
    Ue(!1);
    var Ni;

    function Ti(n) {
        var t, r = this;
        if (!F(this, Ti)) return new Ti(n);
        Tt.call(this), this.id = vt.makeUid(), wt.setR(this);
        try {
            t = function(e) {
                e && "object" == typeof e || V("Invalid options");
                var n = new rr(e);
                return function(e, n) {
                        void 0 === n && (n = []);
                        var t = !0;
                        e = e.get(), ve(xi, (function(r, i) {
                            if (!n.includes(i) && i in e) {
                                var a = r(e[i], e);
                                a && (t = !1, V("Invalid " + i + " (" + a + ")"))
                            }
                        }))
                    }(n, ["amount"]),
                    function(e) {
                        ve(e, (function(n, t) {
                            A(n) ? n.length > 254 && (e[t] = n.slice(0, 254)) : P(n) || C(n) || delete e[t]
                        }))
                    }(n.get("notes")), n
            }(n), this.get = t.get, this.set = t.set
        } catch (t) {
            var i = t.message;
            this.get && this.isLiveMode() || Ze(n) && !n.parent && e.alert(i), V(i)
        } ["integration", "integration_version", "integration_parent_version"].forEach((function(e) {
            var n = r.get("_." + e);
            n && (vt.props[e] = n)
        })), Pr.every((function(e) {
            return !t.get(e)
        })) && V("No key passed"), Qe.updateInstance(this), this.postInit()
    }
    var Bi = Ti.prototype = new Tt;

    function Li(e, n) {
        return Wn.jsonp({
            url: Cr("preferences"),
            data: e,
            callback: function(e) {
                Qe.preferenceResponse = e, n(e)
            }
        })
    }

    function Oi(e) {
        if (e) {
            var n = {},
                t = dn("key");
            t && (n.key_id = t);
            var r = [dn("currency")],
                i = dn("display_currency"),
                a = dn("display_amount");
            i && ("" + a).length && r.push(i), n.currency = r, ["order_id", "customer_id", "invoice_id", "payment_link_id", "subscription_id", "auth_link_id", "recurring", "subscription_card_change", "account_id", "contact_id", "checkout_config_id", "amount"].forEach((function(e) {
                var t = dn(e);
                t && (n[e] = t)
            })), n["_[build]"] = rt, n["_[checkout_id]"] = e.id, n["_[library]"] = vt.props.library, n["_[platform]"] = vt.props.platform;
            var o = Mi() || {};
            return n = Re({}, n, o)
        }
    }
    Bi.postInit = Nt, Bi.onNew = function(e, n) {
        var t = this;
        "ready" === e && (this.prefs ? n(e, this.prefs) : Li(Oi(this), (function(e) {
            e.methods && (t.prefs = e, t.methods = e.methods), n(t.prefs, e)
        })))
    }, Bi.emi_calculator = function(e, n) {
        return Ti.emi.calculator(this.get("amount") / 100, e, n)
    }, Ti.emi = {
        calculator: function(e, n, t) {
            if (!t) return c.ceil(e / n);
            t /= 1200;
            var r = c.pow(1 + t, n);
            return d(e * t * r / (r - 1), 10)
        },
        calculatePlan: function(e, n, t) {
            var r = this.calculator(e, n, t);
            return {
                total: t ? r * n : e,
                installment: r
            }
        }
    }, Ti.payment = {
        getMethods: function(e) {
            return Li({
                key_id: Ti.defaults.key
            }, (function(n) {
                e(n.methods || n)
            }))
        },
        getPrefs: function(e, n) {
            var t = U();
            return wt.track("prefs:start", {
                type: Be
            }), Ze(e) && (e["_[request_index]"] = wt.updateRequestIndex("preferences")), qe(Ni) || qe(Ni.order) ? Wn({
                url: J(Cr("preferences"), e),
                callback: function(r) {
                    if (wt.track("prefs:end", {
                            type: Be,
                            data: {
                                time: t()
                            }
                        }), r.xhr && 0 === r.xhr.status) return Li(e, n);
                    n(r)
                }
            }) : (wt.track("prefs:end", {
                type: Be,
                data: {
                    time: t()
                }
            }), void n(Ni))
        },
        getRewards: function(e, n) {
            var t = U();
            return wt.track("rewards:start", {
                type: Be
            }), Wn({
                url: J(Cr("checkout/rewards"), e),
                callback: function(e) {
                    wt.track("rewards:end", {
                        type: Be,
                        data: {
                            time: t()
                        }
                    }), n(e)
                }
            })
        }
    }, Bi.isLiveMode = function() {
        var e = this.preferences;
        return !e && /^rzp_l/.test(this.get("key")) || e && "live" === e.mode
    }, Bi.getMode = function() {
        var e = this.preferences;
        return this.get("key") || e ? !e && /^rzp_l/.test(this.get("key")) || e && "live" === e.mode ? "live" : "test" : "pending"
    }, Bi.calculateFees = function(e) {
        var n = this;
        return new Promise((function(t, r) {
            e = hr(e, n), Wn.post({
                url: Cr("payments/calculate/fees"),
                data: e,
                callback: function(e) {
                    return e.error ? r(e) : t(e)
                }
            })
        }))
    }, Bi.fetchVirtualAccount = function(e) {
        var n = e.customer_id,
            t = e.order_id,
            r = e.notes;
        return new Promise((function(e, i) {
            if (t) {
                var a = {
                    customer_id: n,
                    notes: r
                };
                n || delete a.customer_id, r || delete a.notes;
                var o = Cr("orders/" + t + "/virtual_accounts?x_entity_id=" + t);
                Wn.post({
                    url: o,
                    data: a,
                    callback: function(n) {
                        return n.error ? i(n) : e(n)
                    }
                })
            } else i("Order ID is required to fetch the account details")
        }))
    }, Bi.checkCREDEligibility = function(e) {
        var n, t = this,
            r = (void 0 === n && (n = vt.id), Ii[n]),
            i = Mi({
                cred: !0
            }) || {},
            a = function(e, n) {
                n = Cr(n);
                for (var t = 0; t < Pr.length; t++) {
                    var r = Pr[t],
                        i = dn(r);
                    if (r = "key" === r ? "key_id" : "x_entity_id", i) {
                        var a = dn("account_id");
                        return a && (i += "&account_id=" + a), n + (n.indexOf("?") >= 0 ? "&" : "?") + r + "=" + i
                    }
                }
                return n
            }(r && r.r, "payments/validate/account"),
            o = new Promise((function(n, o) {
                if (!e) return o(new Error("contact is required to check eligibility"));
                Wn.post({
                    url: a,
                    data: Re({
                        entity: "cred",
                        value: e,
                        "_[checkout_id]": (null == r ? void 0 : r.id) || (null == t ? void 0 : t.id),
                        "_[build]": rt,
                        "_[library]": vt.props.library,
                        "_[platform]": vt.props.platform
                    }, i),
                    callback: function(e) {
                        var t, r = "ELIGIBLE" === (null == (t = e.data) ? void 0 : t.state);
                        return It.Track(Ct.ELIGIBILITY_CHECK, {
                            source: "validate_api",
                            isEligible: r
                        }), r ? n(e) : o(e)
                    }
                })
            }));
        return o
    };
    var xi = {
        notes: function(e) {
            if (Ze(e) && K(i.keys(e)) > 15) return "At most 15 notes are allowed"
        },
        amount: function(e, n) {
            var t, r, i = n.display_currency || n.currency || "INR",
                a = on(i),
                o = a.minimum,
                u = "";
            if (a.decimals && a.minor ? u = " " + a.minor : a.major && (u = " " + a.major), void 0 === (r = o) && (r = 100), (/[^0-9]/.test(t = e) || !((t = d(t, 10)) >= r)) && !n.recurring) return "should be passed in integer" + u + ". Minimum value is " + o + u + ", i.e. " + function(e, n, t) {
                return void 0 === t && (t = !0), [cn[n], ln(e, n)].join(t ? " " : "")
            }(o, i)
        },
        currency: function(e) {
            if (!un.includes(e)) return "The provided currency is not currently supported"
        },
        display_currency: function(e) {
            if (!(e in cn) && e !== Ti.defaults.display_currency) return "This display currency is not supported"
        },
        display_amount: function(e) {
            if (!(e = a(e).replace(/([^0-9.])/g, "")) && e !== Ti.defaults.display_amount) return ""
        },
        payout: function(e, n) {
            if (e) {
                if (!n.key) return "key is required for a Payout";
                if (!n.contact_id) return "contact_id is required for a Payout"
            }
        }
    };

    function Ki() {
        var e;
        e = "https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800&display=swap", new Promise((function(t, r) {
            var i = hn("link");
            i.rel = "stylesheet", i.href = e, i.onload = function() {
                return t(i)
            }, i.onerror = function() {
                return r(new Error("Failed to load ".concat(e)))
            }, n.head.appendChild(i)
        }))
    }
    Ti.configure = function(e, n) {
        void 0 === n && (n = {}), ve(nr(e, Xt), (function(e, n) {
            typeof Xt[n] == typeof e && (Xt[n] = e)
        })), n.library && (vt.props.library = n.library), n.referer && (vt.props.referer = n.referer)
    }, Ti.defaults = Xt, e.Razorpay = Ti, Xt.timeout = 0, Xt.name = "", Xt.partnership_logo = "", Xt.nativeotp = !0, Xt.remember_customer = !1, Xt.personalization = !1, Xt.paused = !1, Xt.fee_label = "", Xt.force_terminal_id = "", Xt.is_donation_checkout = !1, Xt.keyless_header = "", Xt.min_amount_label = "", Xt.partial_payment = {
        min_amount_label: "",
        full_amount_label: "",
        partial_amount_label: "",
        partial_amount_description: "",
        select_partial: !1
    }, Xt.method = {
        netbanking: null,
        card: !0,
        credit_card: !0,
        debit_card: !0,
        cardless_emi: null,
        wallet: null,
        emi: !0,
        upi: null,
        upi_intent: !0,
        qr: !0,
        bank_transfer: !0,
        offline_challan: !0,
        upi_otm: !0,
        cod: !0
    }, Xt.prefill = {
        amount: "",
        wallet: "",
        provider: "",
        method: "",
        name: "",
        contact: "",
        email: "",
        vpa: "",
        coupon_code: "",
        "card[number]": "",
        "card[expiry]": "",
        "card[cvv]": "",
        "billing_address[line1]": "",
        "billing_address[line2]": "",
        "billing_address[postal_code]": "",
        "billing_address[city]": "",
        "billing_address[country]": "",
        "billing_address[state]": "",
        "billing_address[first_name]": "",
        "billing_address[last_name]": "",
        bank: "",
        "bank_account[name]": "",
        "bank_account[account_number]": "",
        "bank_account[account_type]": "",
        "bank_account[ifsc]": "",
        auth_type: ""
    }, Xt.features = {
        cardsaving: !0
    }, Xt.readonly = {
        contact: !1,
        email: !1,
        name: !1
    }, Xt.hidden = {
        contact: !1,
        email: !1
    }, Xt.modal = {
        confirm_close: !1,
        ondismiss: Nt,
        onhidden: Nt,
        escape: !0,
        animation: !e.matchMedia("(prefers-reduced-motion: reduce)").matches,
        backdropclose: !1,
        handleback: !0
    }, Xt.external = {
        wallets: [],
        handler: Nt
    }, Xt.challan = {
        fields: [],
        disclaimers: [],
        expiry: {}
    }, Xt.theme = {
        upi_only: !1,
        color: "",
        backdrop_color: "rgba(0,0,0,0.6)",
        image_padding: !0,
        image_frame: !0,
        close_button: !0,
        close_method_back: !1,
        hide_topbar: !1,
        branding: "",
        debit_card: !1
    }, Xt._ = {
        integration: null,
        integration_version: null,
        integration_parent_version: null
    }, Xt.config = {
        display: {}
    };
    var zi = n.createElement("template");
    zi.innerHTML = '\n  <style>\n  * {\n    padding: 0px;\n    margin: 0px;\n    border: 0px;\n    box-sizing: border-box;\n  }\n\n  #razorpay-magic-btn {\n    width: 100% !important; \n    padding: 14px !important; \n    background-color: #0460F8 !important; \n    color: #fff !important; \n    border-radius: 4px !important;\n    cursor: pointer !important;\n  }\n\n  #razorpay-magic-btn slot {\n    font-family: \'Inter\' !important;\n    font-weight: bold !important;\n    font-size: 14px !important;\n  }\n  </style>\n  <button id="razorpay-magic-btn">\n    <svg\n      width="12"\n      height="15"\n      viewBox="0 0 12 15"\n      fill="none"\n      xmlns="http://www.w3.org/2000/svg"\n    >\n      <path\n        d="M5.14321 4.72412L4.47803 7.1758L8.28423 4.71034L5.7951 14.0119L8.32281 14.0142L11.9999 0.275635L5.14321 4.72412Z"\n        fill="#F4F6FE"\n      />\n      <path\n        d="M1.04646 10.1036L0 14.0138H5.18124C5.18124 14.0138 7.3005 6.06116 7.30109 6.05884C7.2991 6.06011 1.04646 10.1036 1.04646 10.1036Z"\n        fill="#F4F6FE"\n      />\n    </svg>\n    <slot name="title">\n      Checkout with Magic\n    </slot>\n  </button>\n';
    var Fi = "product",
        Hi = "product_sm",
        ji = "cart",
        Gi = "cart_sm";
    if (!Kt) {
        var Ui = function(e) {
            var n, t;

            function r() {
                var n;
                return (n = e.call(this) || this)._root = n.attachShadow({
                    mode: "closed"
                }), n._options = {}, n._rzp = null, n._button = null, Ki(), n._root.appendChild(zi.content.cloneNode(!0)), n
            }
            t = e, (n = r).prototype = Object.create(t.prototype), n.prototype.constructor = n, Pe(n, t);
            var i = r.prototype;
            return i.restyle = function() {
                this.getAttribute("width") && this._button.style.setProperty("width", this.getAttribute("width"), "important"), this.getAttribute("border-radius") && this._button.style.setProperty("border-radius", this.getAttribute("border-radius"), "important");
                var e = "";
                switch (this.getAttribute("page-type")) {
                    case Fi:
                        e = "Buy now with Magic";
                        break;
                    case Hi:
                        e = "Buy now";
                        break;
                    case ji:
                        e = "Checkout with Magic";
                        break;
                    case Gi:
                        e = "Checkout";
                        break;
                    default:
                        e = "Checkout with Magic"
                }
                this._root.querySelector("#razorpay-magic-btn slot").textContent = e
            }, i.attributeChangedCallback = function(e, n, t) {
                t !== n && this.restyle()
            }, i.openRzpModal = function(e) {
                e.stopPropagation();
                var n = this._options,
                    t = n.key,
                    r = n.order_id,
                    i = n.amount;
                "true" === this.getAttribute("auto-checkout") && (t && i || r) && (this._rzp = new window.Razorpay(this._options), this._rzp.open()), this.dispatchEvent(new CustomEvent("click", e))
            }, i.connectedCallback = function() {
                this._button = this._root.getElementById("razorpay-magic-btn"), this._button.addEventListener("click", this.openRzpModal.bind(this)), this.restyle()
            }, i.disconnectedCallback = function() {
                this._button.removeEventListener("click", this.openRzpModal.bind(this))
            }, De(r, [{
                key: "rzp",
                get: function() {
                    return this._rzp
                }
            }, {
                key: "options",
                set: function(e) {
                    this._options = e, this._rzp = new window.Razorpay(this._options)
                }
            }], [{
                key: "observedAttributes",
                get: function() {
                    return ["page-type", "width", "border-radius"]
                }
            }]), r
        }(Ie(HTMLElement));
        window.customElements.get("magic-checkout-btn") || window.customElements.define("magic-checkout-btn", Ui)
    }
    var Yi = "page_view",
        $i = "payment_successful",
        Vi = "payment_failed",
        Zi = "rzp_payments";

    function Wi(e, r, i) {
        var a;
        void 0 === e && (e = n.body), void 0 === i && (i = !1);
        try {
            if (i) {
                n.body.style.background = "#00000080";
                var o = hn("style");
                o.innerText = "@keyframes rzp-rot{to{transform: rotate(360deg);}}@-webkit-keyframes rzp-rot{to{-webkit-transform: rotate(360deg);}}", kn(o, e)
            }(a = n.createElement("div")).className = "razorpay-loader";
            var u = "margin:-25px 0 0 -25px;height:50px;width:50px;animation:rzp-rot 1s infinite linear;-webkit-animation:rzp-rot 1s infinite linear;border: 1px solid rgba(255, 255, 255, 0.2);border-top-color: rgba(255, 255, 255, 0.7);border-radius: 50%;";
            return u += r ? "margin: 100px auto -150px;border: 1px solid rgba(0, 0, 0, 0.2);border-top-color: rgba(0, 0, 0, 0.7);" : "position:absolute;left:50%;top:50%;", a.setAttribute("style", u), kn(a, e), a
        } catch (e) {
            ! function(e, n) {
                var r = n.analytics,
                    i = n.severity,
                    a = void 0 === i ? xr : i,
                    o = n.unhandled,
                    u = void 0 !== o && o;
                try {
                    var c = r || {},
                        s = c.event,
                        l = c.data,
                        m = c.immediately,
                        d = void 0 === m || m,
                        f = "string" == typeof s ? s : Mt;
                    a !== Or && a !== xr || tt("session_errored", a), wt.track(f, {
                        data: Re({}, "object" == typeof l ? l : {}, {
                            error: Lr(e, {
                                severity: a,
                                unhandled: u
                            })
                        }),
                        immediately: t(d)
                    })
                } catch (e) {}
            }(e, {
                severity: Kr,
                unhandled: !1
            })
        }
    }
    var qi, Ji, Xi, Qi, ea = e,
        na = ea.screen,
        ta = ea.scrollTo,
        ra = zt,
        ia = {
            overflow: "",
            metas: null,
            orientationchange: function() {
                ia.resize.call(this), ia.scroll.call(this)
            },
            resize: function() {
                var n = e.innerHeight || na.height;
                ca.container.style.position = n < 450 ? "absolute" : "fixed", this.el.style.height = c.max(n, 460) + "px"
            },
            scroll: function() {
                if ("number" == typeof e.pageYOffset)
                    if (e.innerHeight < 460) {
                        var n = 460 - e.innerHeight;
                        e.pageYOffset > n + 120 && ai(n)
                    } else this.isFocused || ai(0)
            }
        };

    function aa() {
        return ia.metas || (ia.metas = ei('head meta[name=viewport],head meta[name="theme-color"]')), ia.metas
    }

    function oa(e) {
        var n = wr.frame;
        if (!n) {
            n = Cr("checkout", !1);
            var t = Oi(e);
            t ? n = J(n, t) : n += "/public"
        }
        return n = J(n, {
            traffic_env: "production",
            build: "c97f3f265e11f810624fe50bbcaad5648ea516d0"
        })
    }

    function ua(e) {
        try {
            ca.backdrop.style.background = e
        } catch (e) {}
    }

    function ca(e) {
        if (qi = n.body, Ji = n.head, Xi = qi.style, e) return this.getEl(e), this.openRzp(e);
        this.getEl(), this.time = H()
    }
    ca.prototype = {
        getEl: function(e) {
            if (!this.el) {
                var n, t = {
                    style: "opacity: 1; height: 100%; position: relative; background: none; display: block; border: 0 none transparent; margin: 0px; padding: 0px; z-index: 2;",
                    allowtransparency: !0,
                    frameborder: 0,
                    width: "100%",
                    height: "100%",
                    allowpaymentrequest: !0,
                    src: oa(e),
                    class: "razorpay-checkout-frame"
                };
                this.el = (n = hn("iframe"), Cn(t)(n))
            }
            return this.el
        },
        openRzp: function(e) {
            var n, t = (n = this.el, Pn({
                    width: "100%",
                    height: "100%"
                })(n)),
                r = e.get("parent");
            r && (r = ti(r));
            var i, a, o, u = r || ca.container;
            (Qi || (Qi = Wi(u, r)), e !== this.rzp && (vn(t) !== u && Sn(u, t), this.rzp = e), r) ? (i = t, Rn("minHeight", "530px")(i), this.embedded = !0) : (o = u, a = Rn("display", "block")(o), Bn(a), ua(e.get("theme.backdrop_color")), /^rzp_t/.test(e.get("key")) && ca.ribbon && (ca.ribbon.style.opacity = 1), this.setMetaAndOverflow());
            this.bind(), this.onload()
        },
        makeMessage: function(e) {
            var n = this.rzp,
                t = n.get(),
                r = {
                    integration: vt.props.integration,
                    referer: vt.props.referer || g.href,
                    options: t,
                    library: vt.props.library,
                    id: n.id
                };
            return e && (r.event = e), n._order && (r._order = n._order), n.metadata && (r.metadata = n.metadata), ve(n.modal.options, (function(e, n) {
                    t["modal." + n] = e
                })), this.embedded && (delete t.parent, r.embedded = !0),
                function(e) {
                    var n = e.image;
                    if (n && A(n)) {
                        if (Z(n)) return;
                        if (n.indexOf("http")) {
                            var t = g.protocol + "//" + g.hostname + (g.port ? ":" + g.port : ""),
                                r = "";
                            "/" !== n[0] && "/" !== (r += g.pathname.replace(/[^/]*$/g, ""))[0] && (r = "/" + r), e.image = t + r + n
                        }
                    }
                }(t), r
        },
        close: function() {
            ua(""), ca.ribbon && (ca.ribbon.style.opacity = 0),
                function(e) {
                    e && e.forEach(En);
                    var n = aa();
                    n && n.forEach(kn(Ji))
                }(this.$metas), Xi.overflow = ia.overflow, this.unbind(), ra && ta(0, ia.oldY), vt.flush()
        },
        bind: function() {
            var e = this;
            if (!this.listeners) {
                this.listeners = [];
                var n = {};
                ra && (n.orientationchange = ia.orientationchange, this.rzp.get("parent") || (n.resize = ia.resize)), ve(n, (function(n, t) {
                    var r;
                    e.listeners.push((r = window, zn(t, n.bind(e))(r)))
                }))
            }
        },
        unbind: function() {
            this.listeners.forEach((function(e) {
                "function" == typeof e && e()
            })), this.listeners = null
        },
        setMetaAndOverflow: function() {
            var n, t;
            Ji && (aa().forEach((function(e) {
                return En(e)
            })), this.$metas = [(n = hn("meta"), Cn({
                name: "viewport",
                content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            })(n)), (t = hn("meta"), Cn({
                name: "theme-color",
                content: this.rzp.get("theme.color")
            })(t))], this.$metas.forEach(kn(Ji)), ia.overflow = Xi.overflow, Xi.overflow = "hidden", ra && (ia.oldY = e.pageYOffset, e.scrollTo(0, 0), ia.orientationchange.call(this)))
        },
        postMessage: function(e) {
            var n, t;
            e.id = this.rzp.id, e = ye(e), null == (n = this.el) || null == (t = n.contentWindow) || t.postMessage(e, "*")
        },
        prefetchPrefs: function(e) {
            e !== this.rzp && (this.rzp = e), this.postMessage(this.makeMessage("prefetch"))
        },
        onmessage: function(e) {
            var n = Je(e.data);
            if (n) {
                var t = n.event,
                    r = this.rzp;
                e.origin && "frame" === n.source && e.source === this.el.contentWindow && (n = n.data, this["on" + t](n), "dismiss" !== t && "fault" !== t || wt.track(t, {
                    data: n,
                    r: r,
                    immediately: !0
                }))
            }
        },
        onload: function() {
            this.rzp && this.postMessage(this.makeMessage())
        },
        onfocus: function() {
            this.isFocused = !0
        },
        onblur: function() {
            this.isFocused = !1, ia.orientationchange.call(this)
        },
        onrender: function() {
            Qi && (En(Qi), Qi = null);
            this.rzp.emit("render")
        },
        onevent: function(e) {
            this.rzp.emit(e.event, e.data)
        },
        ongaevent: function(e) {
            var n, t, r = e.event,
                i = e.category,
                a = e.params,
                o = void 0 === a ? {} : a;
            this.rzp.set("enable_ga_analytics", !0), null != (n = window) && n.gtag && "function" == typeof window.gtag ? window.gtag("event", r, Re({
                event_category: i
            }, o)) : null != (t = window) && t.ga && "function" == typeof window.ga && (r === Yi ? window.ga("send", {
                hitType: "pageview",
                title: i
            }) : window.ga("send", {
                hitType: "event",
                eventCategory: i,
                eventAction: r
            }))
        },
        onfbaevent: function(e) {
            var n, t = e.eventType,
                r = void 0 === t ? "trackCustom" : t,
                i = e.event,
                a = e.category,
                o = e.params,
                u = void 0 === o ? {} : o;
            null != (n = window) && n.fbq && "function" == typeof window.fbq && (this.rzp.set("enable_fb_analytics", !0), a && (u.page = a), window.fbq(r, i, u))
        },
        onredirect: function(e) {
            vt.flush(), e.target || (e.target = this.rzp.get("target") || "_top"), ri(e)
        },
        onsubmit: function(e) {
            vt.flush();
            var n = this.rzp;
            "wallet" === e.method && (n.get("external.wallets") || []).forEach((function(t) {
                if (t === e.wallet) try {
                    n.get("external.handler").call(n, e)
                } catch (e) {}
            })), n.emit("payment.submit", {
                method: e.method
            })
        },
        ondismiss: function(e) {
            this.close();
            var n = this.rzp.get("modal.ondismiss");
            M(n) && s((function() {
                return n(e)
            }))
        },
        onhidden: function() {
            vt.flush(), this.afterClose();
            var e = this.rzp.get("modal.onhidden");
            M(e) && e()
        },
        oncomplete: function(e) {
            var n = this.rzp.get(),
                t = n.enable_ga_analytics,
                r = n.enable_fb_analytics;
            t && this.ongaevent({
                event: $i,
                category: Zi
            }), r && this.onfbaevent({
                event: $i,
                category: Zi
            }), this.close();
            var i = this.rzp,
                a = i.get("handler");
            wt.track("checkout_success", {
                r: i,
                data: e,
                immediately: !0
            }), M(a) && s((function() {
                a.call(i, e)
            }), 200)
        },
        onpaymenterror: function(e) {
            vt.flush();
            var n = this.rzp.get(),
                t = n.enable_ga_analytics,
                r = n.enable_fb_analytics;
            t && this.ongaevent({
                event: Vi,
                category: Zi
            }), r && this.onfbaevent({
                event: Vi,
                category: Zi
            });
            try {
                var i, a = this.rzp.get("callback_url"),
                    o = this.rzp.get("redirect") || qt,
                    u = this.rzp.get("retry");
                if (o && a && !1 === u) return null != e && null != (i = e.error) && i.metadata && (e.error.metadata = JSON.stringify(e.error.metadata)), void ri({
                    url: a,
                    content: e,
                    method: "post",
                    target: this.rzp.get("target") || "_top"
                });
                this.rzp.emit("payment.error", e), this.rzp.emit("payment.failed", e)
            } catch (e) {}
        },
        onfailure: function(n) {
            var t = this.rzp.get(),
                r = t.enable_ga_analytics,
                i = t.enable_fb_analytics;
            r && this.ongaevent({
                event: Vi,
                category: Zi
            }), i && this.onfbaevent({
                event: Vi,
                category: Zi
            }), this.ondismiss(), e.alert("Payment Failed.\n" + n.error.description), this.onhidden()
        },
        onfault: function(n) {
            var t = "Something went wrong.";
            A(n) ? t = n : I(n) && (n.message || n.description) && (t = n.message || n.description), vt.flush(), this.rzp.close(), this.rzp.emit("fault.close");
            var r = this.rzp.get("callback_url");
            (this.rzp.get("redirect") || qt) && r ? kr({
                url: r,
                params: {
                    error: n
                },
                method: "POST"
            }) : e.alert("Oops! Something went wrong.\n" + t), this.afterClose()
        },
        afterClose: function() {
            ca.container.style.display = "none"
        },
        onflush: function(e) {
            vt.flush(e)
        }
    };
    var sa, la = z(Ti);

    function ma(e) {
        return function n() {
            return sa ? e.call(this) : (s(n.bind(this), 99), this)
        }
    }! function e() {
        (sa = n.body || n.getElementsByTagName("body")[0]) || s(e, 99)
    }();
    var da, fa = n.currentScript || (da = ei("script"))[da.length - 1];

    function pa(e) {
        var n = vn(fa);
        Sr({
            form: n,
            data: Rr(e)
        }), n.onsubmit = Nt, n.submit()
    }
    var ha, va;

    function _a() {
        var e = {};
        ve(fa.attributes, (function(n) {
            var t = n.name.toLowerCase();
            if (/^data-/.test(t)) {
                var r = e;
                t = t.replace(/^data-/, "");
                var i = n.value;
                "true" === i ? i = !0 : "false" === i && (i = !1), /^notes\./.test(t) && (e.notes || (e.notes = {}), r = e.notes, t = t.replace(/^notes\./, "")), r[t] = i
            }
        }));
        var n = e.key;
        if (n && n.length > 0) {
            e.handler = pa;
            var t = Ti(e);
            e.parent || (It.TrackRender(Pt, t), function(e) {
                var n = vn(fa);
                Sn(n, be(hn("input"), {
                    type: "submit",
                    value: e.get("buttontext"),
                    className: "razorpay-payment-button btn btn-outline-success form-control"
                })).onsubmit = function(n) {
                    n.preventDefault();
                    var t = this,
                        r = t.action,
                        i = t.method,
                        a = t.target,
                        o = e.get();
                    if (A(r) && r && !o.callback_url) {
                        var u = {
                            url: r,
                            content: ii(t),
                            method: A(i) ? i : "get",
                            target: A(a) && a
                        };
                        try {
                            var c = h(ye({
                                request: u,
                                options: ye(o),
                                back: g.href
                            }));
                            o.callback_url = Cr("checkout/onyx") + "?data=" + c
                        } catch (e) {}
                    }
                    return e.open(), It.TrackBehav(At), !1
                }
            }(t))
        }
    }

    function ya() {
        if (!ha) {
            var e = hn();
            e.className = "razorpay-container", An(e, "<style>@keyframes rzp-rot{to{transform: rotate(360deg);}}@-webkit-keyframes rzp-rot{to{-webkit-transform: rotate(360deg);}}</style>"), Pn(e, {
                zIndex: 2147483647,
                position: "fixed",
                top: 0,
                display: "none",
                left: 0,
                height: "100%",
                width: "100%",
                "-webkit-overflow-scrolling": "touch",
                "-webkit-backface-visibility": "hidden",
                "overflow-y": "visible"
            }), ha = kn(e, sa), ca.container = ha;
            var n = (r = ha, (i = hn()).className = "razorpay-backdrop", Pn(i, {
                "min-height": "100%",
                transition: "0.3s ease-out",
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%"
            }), kn(i, r));
            ca.backdrop = n;
            var t = function(e) {
                var n = "rotate(45deg)",
                    t = "opacity 0.3s ease-in",
                    r = hn("span");
                return r.textContent = "Test Mode", Pn(r, {
                    "text-decoration": "none",
                    background: "#D64444",
                    border: "1px dashed white",
                    padding: "3px",
                    opacity: "0",
                    "-webkit-transform": n,
                    "-moz-transform": n,
                    "-ms-transform": n,
                    "-o-transform": n,
                    transform: n,
                    "-webkit-transition": t,
                    "-moz-transition": t,
                    transition: t,
                    "font-family": "lato,ubuntu,helvetica,sans-serif",
                    color: "white",
                    position: "absolute",
                    width: "200px",
                    "text-align": "center",
                    right: "-50px",
                    top: "50px"
                }), kn(r, e)
            }(n);
            ca.ribbon = t
        }
        var r, i;
        return ha
    }
    var ga, ba = !1,
        wa = (ga = function(e) {
            try {
                var n = localStorage.getItem(e);
                if (!n) return null;
                var t = JSON.parse(n);
                return (new u).getTime() > t.expiry ? (localStorage.removeItem(e), null) : t
            } catch (e) {
                return null
            }
        }("razorpay_affordability_widget_fid"), (null == ga ? void 0 : ga.id) ? ga.id : null);

    function ka(n) {
        var t, r;
        va ? va.openRzp(n) : (va = new ca(n), t = e, zn("message", va.onmessage.bind(va))(t), r = ha, Sn(va.el)(r));
        return va
    }
    new Promise((function(e) {
        y.brave ? y.brave.isBrave().then((function(n) {
            e(n)
        })) : e(!1)
    })).then((function(e) {
        ba = e
    })), Ti.open = function(e) {
        return Ti(e).open()
    }, la.postInit = function() {
        this.modal = {
            options: {}
        }, this.get("parent") && this.open()
    };
    var Sa = la.onNew;
    la.onNew = function(e, n) {
        "payment.error" === e && vt(this, "event_paymenterror", g.href), M(Sa) && Sa.call(this, e, n)
    }, la.initAndPrefetchPrefs = function() {
        return va.prefetchPrefs(this), this
    }, la.open = ma((function() {
        this.metadata || (this.metadata = {
            isBrave: ba
        }, wa && (this.metadata.affordability_widget_fid = wa)), this.metadata.openedAt = u.now();
        var n = this.checkoutFrame = ka(this);
        return vt(this, "open"), n.el.contentWindow || (n.close(), n.afterClose(), e.alert("This browser is not supported.\nPlease try payment in another browser.")), "-new.js" === fa.src.slice(-7) && vt(this, "oldscript", g.href), this
    })), la.resume = function(e) {
        var n = this.checkoutFrame;
        n && n.postMessage({
            event: "resume",
            data: e
        })
    }, la.close = function() {
        var e = this.checkoutFrame;
        e && e.postMessage({
            event: "close"
        })
    };
    var Ea = ma((function() {
        ya(), va = ka();
        try {
            _a()
        } catch (e) {}
    }));
    return e.addEventListener("rzp_error", (function(e) {
        var n = e.detail;
        wt.track("cfu_error", {
            data: {
                error: n
            },
            immediately: !0
        })
    })), e.addEventListener("rzp_network_error", (function(e) {
        var n = e.detail;
        n && "https://lumberjack.razorpay.com/v1/track" === n.baseUrl || wt.track("network_error", {
            data: n,
            immediately: !0
        })
    })), vt.props.library = "checkoutjs", Xt.handler = function(e) {
        if (F(this, Ti)) {
            var n = this.get("callback_url");
            n && kr({
                url: n,
                params: e,
                method: "POST"
            })
        }
    }, Xt.buttontext = "Pay Now", Xt.parent = null, xi.parent = function(e) {
        if (!ti(e)) return "parent provided for embedded mode doesn't exist"
    }, Ea(), Ti
}();