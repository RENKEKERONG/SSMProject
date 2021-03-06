var template = function(d, h) {
    return template["object" === typeof h ? "render": "compile"].apply(template, arguments)
}; (function(d, h) {
    d.version = "1.1";
    d.openTag = "<%";
    d.closeTag = "%>";
    d.parser = null;
    d.render = function(a, c) {
        var b;
        b = g[a];
        void 0 === b && !v ? ((b = document.getElementById(a)) && d.compile(a, b.value || b.innerHTML), b = g[a]) : b = g.hasOwnProperty(a) ? b: void 0;
        return void 0 === b ? m({
            id: a,
            name: "Render Error",
            message: "Not Cache"
        }) : b(c)
    };
    d.compile = function(a, c, b) {
        function j(b) {
            try {
                return (new n(b)).template
            } catch(e) {
                if (!f) return d.compile(a, c, !0)(b);
                e.id = a || c;
                e.name = "Render Error";
                e.source = c;
                return m(e)
            }
        }
        var f = b;
        "string" !== typeof c && (f = c, c = a, a = null);
        try {
            var n = w(c, f)
        } catch(k) {
            return k.id = a || c,
            k.name = "Syntax Error",
            m(k)
        }
        j.prototype = n.prototype;
        j.toString = function() {
            return n.toString()
        };
        a && (g[a] = j);
        return j
    };
    d.helper = function(a, c) {
        r[a] = c
    };
    var g = {},
    p = "".trim,
    v = p && !h.document,
    s = {},
    q = function() {
        var a = Array.prototype.forEach ||
        function(a, b) {
            for (var d = this.length >>> 0,
            f = 0; f < d; f++) f in this && a.call(b, this[f], f, this)
        };
        return function(c, b) {
            a.call(c, b)
        }
    } (),
    x = Object.create ||
    function(a) {
        function c() {}
        c.prototype = a;
        return new c
    },
    r = d.prototype = {
        $forEach: q,
        $render: d.render,
        $getValue: function(a) {
            return void 0 === a ? "": a
        }
    };
    q("break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield".split(","),
    function(a) {
        s[a] = !0
    });
    var w = function(a, c) {
        function b(a) {
            o += a.split(/\n/).length - 1;
            a = a.replace(/('|"|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n");
            a = l[1] + "'" + a + "'" + l[2];
            return a + "\n"
        }
        function j(a) {
            var b = o;
            k ? a = k(a) : c && (a = a.replace(/\n/g,
            function() {
                o++;
                return "$line=" + o + ";"
            }));
            0 === a.indexOf("=") && (a = l[1] + (p ? "$getValue(": "") + a.substring(1).replace(/[\s;]*$/, "") + (p ? ")": "") + l[2]);
            c && (a = "$line=" + b + ";" + a);
            f(a);
            return a + "\n"
        }
        function f(a) {
            a = a.replace(/\/\*.*?\*\/|'[^']*'|"[^"]*"|\.[\$\w]+/g, "");
            q(a.split(/[^\$\w\d]+/),
            function(a) {
                if (/^this$/.test(a)) throw {
                    message: 'Prohibit the use of the "' + a + '"'
                };
                if (a && !s.hasOwnProperty(a) && !/^\d/.test(a) && !h.hasOwnProperty(a)) {
                    var b;
                    b = "include" === a ? m: r.hasOwnProperty(a) ? "$helpers." + a: "$data." + a;
                    g += a + "=" + b + ",";
                    h[a] = !0
                }
            })
        }
        var n = d.closeTag,
        k = d.parser,
        i, e = "",
        o = 1,
        h = {
            $out: !0,
            $line: !0
        },
        g = "var $helpers=this," + (c ? "$line=0,": ""),
        l = p ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"],
        m = "function(id,data){if(data===undefined){data=$data}return $helpers.$render(id,data)}";
        q(a.split(d.openTag),
        function(a) {
            var a = a.split(n),
            c = a[0],
            d = a[1];
            1 === a.length ? e += b(c) : (e += j(c), d && (e += b(d)))
        });
        i = e;
        c && (i = "try{" + i + "}catch(e){e.line=$line;throw e}");
        i = g + l[0] + i + "this.template=" + l[3];
        try {
            var t = new Function("$data", i); (t.prototype = x(r)).toString = function() {
                return this.template
            };
            return t
        } catch(u) {
            throw u.temp = "function anonymous($data) {" + i + "}",
            u;
        }
    },
    m = function(a) {
        function c() {
            return c + ""
        }
        var b = "[template]:\n" + a.id + "\n\n[name]:\n" + a.name;
        a.message && (b += "\n\n[message]:\n" + a.message);
        a.line && (b += "\n\n[line]:\n" + a.line, b += "\n\n[source]:\n" + a.source.split(/\n/)[a.line - 1].replace(/^[\s\t]+/, ""));
        a.temp && (b += "\n\n[temp]:\n" + a.temp);
        h.console && console.error(b);
        c.toString = function() {
            return "[JS模板解析错误]"
        };
        return c
    }
})(template, this);
if ("undefined" !== typeof module && module.exports) module.exports = template; (function(d) {
    var e = d.prototype,
    h = e.$forEach,
    i = Object.prototype.toString,
    j = Array.isArray ||
    function(a) {
        return "[object Array]" === i.call(a)
    };
    d.openTag = "{";
    d.closeTag = "}";
    d.parser = function(a) {
        var a = a.replace(/^\s/, ""),
        b = a.split(" "),
        c = b.shift(),
        f = d.keywords,
        g = f[c];
        g && f.hasOwnProperty(c) ? (b = b.join(" "), a = g.call(a, b)) : e.hasOwnProperty(c) ? (b = b.join(","), a = "=" + c + "(" + b + ");") : a = "=$escape(" + a + ");";
        return a
    };
    d.keywords = {
        "if": function(a) {
            return "if(" + a + "){"
        },
        "else": function(a) {
            a = a.split(" ");
            a = "if" === a.shift() ? " if(" + a.join(" ") + ")": "";
            return "}else" + a + "{"
        },
        "/if": function() {
            return "}"
        },
        each: function(a) {
            var a = a.split(" "),
            b = a[0] || "$data",
            c = (a[2] || "$value") + "," + (a[3] || "$index");
            "as" !== (a[1] || "as") && (b = "[]");
            return "$each(" + b + ",function(" + c + "){"
        },
        "/each": function() {
            return "});"
        },
        echo: function(a) {
            return "=" + a
        },
        include: function(a) {
            a = a.split(" ");
            return "=include(" + a[0] + "," + a[1] + ")"
        }
    };
    d.helper("$each",
    function(a, b) {
        if (j(a)) h(a, b);
        else for (var c in a) b.call(a, a[c], c)
    });
    d.helper("$escape",
    function() {
        var a = /&(?!\w+;)|[<>"']/g,
        b = {
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "&": "&amp;"
        },
        c = function(a) {
            return b[a]
        };
        return function(b) {
            return "string" === typeof b ? b.replace(a, c) : b
        }
    } ())
})(template);
$.template = template;