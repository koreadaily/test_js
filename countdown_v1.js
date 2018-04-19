- function () {
    "use strict";
    var d;
    var e = function (a, b, c) {
        a = parseInt(a.getAttribute(b), 10);
        isNaN(a) && (a = c);
        return a
    };
    var f = function (a, b) {
        var c;
        c = document.createEvent("Event");
        c.initEvent(a, !0, !0);
        b.dispatchEvent(c)
    },
        h = function (a, b) {
            var c = function (g) {
                a.removeEventListener("load", c);
                b(g)
            };
            a.addEventListener("load", c)
        };
    function k(a, b) {
        this.F = a;
        a = b.split(".");
        b = window;
        for (var c = 0; b && c < a.length; c++) b = b[a[c]];
        this.c = b ? 0 : 2;
        this.f = []
    }
    k.prototype.A = function () {
        for (var a = this.c = 0; a < this.f.length; a++) this.f[a]();
        this.f = []
    };
    k.prototype.load = function (a) {
        a && (0 == this.c ? a() : this.f.push(a));
        if (2 == this.c) {
            this.c = 1;
            a = document.createElement("script");
            a.type = "text/javascript";
            a.async = !0;
            a.src = this.F;
            h(a, this.A.bind(this));
            var b = document.getElementsByTagName("script")[0];
            b ? b.parentNode.insertBefore(a, b) : document.getElementsByTagName("head")[0].appendChild(a)
        }
    };
    var n = new RegExp(/DD/g),
        p = new RegExp(/HH/g),
        q = new RegExp(/mm/g),
        r = new RegExp(/ss/g),
        t = new RegExp(/SSS/g),
        u = function (a, b) {
            return Math.abs(a.getTime() - b.getTime())
        },
        w = function (a) {
            var b = "HH:mm:ss";
            if (0 > a) throw Error("Negative milliseconds, please provide a positive value.");
            var c = 0,
                g = 0,
                l = 0,
                m = 0,
                A = 0;
            n.test(b) && (c = Math.floor(a / 864E5), a -= 864E5 * c);
            p.test(b) && (g = Math.floor(a / 36E5), a -= 36E5 * g);
            q.test(b) && (l = Math.floor(a / 6E4), a -= 6E4 * l);
            r.test(b) && (m = Math.floor(a / 1E3), a -= 1E3 * m);
            t.test(b) && (A = a);
            return b = b.replace(r,
                "<span class='dt-seconds'>" + v(m.toString()) + "</span>");
        },
        v = function (a) {
            return 1 < a.length ? a : "0" + a
        };
    var x = function () { };
    goog.inherits(x, HTMLElement);
    d = x.prototype;
    d.i = !1;
    d.b = -1;
    d.g = null;
    d.o = 0;
    d.a = 0;
    d.v = 500;
    d.w = "";
    d.j = 0;
    d.createdCallback = function () {
        var a = document.createElement("span");
        a.className = "countdown-timer";
        this.appendChild(a);
        y(this)
    };
    d.attachedCallback = function () {
        y(this);
        this.u || (f("ready", this), this.l && this.start())
    };
    d.detachedCallback = function () {
        this.pause()
    };
    d.attributeChangedCallback = function () {
        y(this)
    };
    var y = function (a) {
        a.G = e(a, "step", a.v);
        var b;
        b = a.w;
        b = a.hasAttribute("target-date") ? a.getAttribute("target-date") : b;
        a.s = b;
        a.h = 1E3 * Math.max(0, e(a, "start-at", a.j));
        a.l = a.hasAttribute("auto-start");
        a.u = a.hasAttribute("use-server-time");
        a.u && !a.i && (a.i ? a.m() : (a.i = !0, a.C = new k("https://dcrmstrat-timestamp.appspot.com/timestamp.js", "serverTime"), a.C.load(a.m.bind(a))));
        a.a = z(a);
        b = a.a;
        B(a).innerHTML = w(b)
    },
        B = function (a) {
            a = a.getElementsByClassName("countdown-timer");
            if (0 < a.length) return a[0];
            throw Error("No container found.");
        };
    x.prototype.m = function () {
        typeof window.rmTimestamp && typeof window.rmTimestamp.getTime && window.rmTimestamp.getTime(this.D.bind(this))
    };
    x.prototype.D = function (a, b) {
        b = b || new Date;
        this.o = a = 1E3 * a - b.getTime();
        f("ready", this);
        this.l && this.start();
        return a
    };
    var C = function (a) {
        var b = new Date;
        a = isNaN(Date.parse(a.s)) ? null : new Date(a.s);
        return null !== a && a.getTime() > b.getTime() ? a : null
    },
        z = function (a) {
            var b = new Date,
                c = C(a);
            null !== c ? c = u(c, new Date(b.getTime() - a.o)) : (c = a.h, a.g && (c -= u(a.g, b)));
            return c = Math.max(0, c)
        };
    d = x.prototype;
    d.B = function () {
        f("on-tick", this);
        var a = this.a = z(this);
        B(this).innerHTML = w(a);
        0 === this.a && (f("ended", this), this.pause())
    };
    d.start = function () {
        this.g = new Date; -1 == this.b && (this.b = setInterval(this.B.bind(this), this.G), f("started", this))
    };
    d.pause = function () {
        clearInterval(this.b);
        this.b = -1;
        this.h = this.a / 1E3;
        f("paused", this)
    };
    d.reset = function () {
        this.g = C(this);
        this.h = 1E3 * e(this, "start-at", this.j);
        var a = this.a = z(this);
        B(this).innerHTML = w(a)
    };
    d.getTimeLeft = function () {
        return Math.floor(this.a / 1E3)
    };
    document.registerElement("ci-countdown-timer", {
        prototype: x.prototype
    });
}()