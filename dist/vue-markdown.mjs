/**
 * vue-markdown-wrapper v1.1.0 - Vue Markdown component based on marked library
 * Copyright (c) 2024, Marc Jorge Gonzalez. (MIT Licensed)
 * https://github.com/mjorgegulab/vue-markdown-wrapper
 */
var zn = Object.defineProperty;
var Pn = (a, e, t) => e in a ? zn(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t;
var w = (a, e, t) => (Pn(a, typeof e != "symbol" ? e + "" : e, t), t), $n = (a, e, t) => {
  if (!e.has(a))
    throw TypeError("Cannot " + t);
};
var Qe = (a, e, t) => {
  if (e.has(a))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(a) : e.set(a, t);
};
var ye = (a, e, t) => ($n(a, e, "access private method"), t);
import { defineComponent as vn, ref as Un, computed as Bt, watch as Fn, openBlock as Bn, createElementBlock as Hn, createCommentVNode as Wn } from "vue";
function ot() {
  return {
    async: !1,
    breaks: !1,
    extensions: null,
    gfm: !0,
    hooks: null,
    pedantic: !1,
    renderer: null,
    silent: !1,
    tokenizer: null,
    walkTokens: null
  };
}
let J = ot();
function tn(a) {
  J = a;
}
const nn = /[&<>"']/, Gn = new RegExp(nn.source, "g"), sn = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, qn = new RegExp(sn.source, "g"), Zn = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, Ht = (a) => Zn[a];
function P(a, e) {
  if (e) {
    if (nn.test(a))
      return a.replace(Gn, Ht);
  } else if (sn.test(a))
    return a.replace(qn, Ht);
  return a;
}
const Yn = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
function jn(a) {
  return a.replace(Yn, (e, t) => (t = t.toLowerCase(), t === "colon" ? ":" : t.charAt(0) === "#" ? t.charAt(1) === "x" ? String.fromCharCode(parseInt(t.substring(2), 16)) : String.fromCharCode(+t.substring(1)) : ""));
}
const Xn = /(^|[^\[])\^/g;
function x(a, e) {
  let t = typeof a == "string" ? a : a.source;
  e = e || "";
  const n = {
    replace: (s, r) => {
      let i = typeof r == "string" ? r : r.source;
      return i = i.replace(Xn, "$1"), t = t.replace(s, i), n;
    },
    getRegex: () => new RegExp(t, e)
  };
  return n;
}
function Wt(a) {
  try {
    a = encodeURI(a).replace(/%25/g, "%");
  } catch {
    return null;
  }
  return a;
}
const de = { exec: () => null };
function Gt(a, e) {
  const t = a.replace(/\|/g, (r, i, l) => {
    let c = !1, g = i;
    for (; --g >= 0 && l[g] === "\\"; )
      c = !c;
    return c ? "|" : " |";
  }), n = t.split(/ \|/);
  let s = 0;
  if (n[0].trim() || n.shift(), n.length > 0 && !n[n.length - 1].trim() && n.pop(), e)
    if (n.length > e)
      n.splice(e);
    else
      for (; n.length < e; )
        n.push("");
  for (; s < n.length; s++)
    n[s] = n[s].trim().replace(/\\\|/g, "|");
  return n;
}
function Re(a, e, t) {
  const n = a.length;
  if (n === 0)
    return "";
  let s = 0;
  for (; s < n; ) {
    const r = a.charAt(n - s - 1);
    if (r === e && !t)
      s++;
    else if (r !== e && t)
      s++;
    else
      break;
  }
  return a.slice(0, n - s);
}
function Qn(a, e) {
  if (a.indexOf(e[1]) === -1)
    return -1;
  let t = 0;
  for (let n = 0; n < a.length; n++)
    if (a[n] === "\\")
      n++;
    else if (a[n] === e[0])
      t++;
    else if (a[n] === e[1] && (t--, t < 0))
      return n;
  return -1;
}
function qt(a, e, t, n) {
  const s = e.href, r = e.title ? P(e.title) : null, i = a[1].replace(/\\([\[\]])/g, "$1");
  if (a[0].charAt(0) !== "!") {
    n.state.inLink = !0;
    const l = {
      type: "link",
      raw: t,
      href: s,
      title: r,
      text: i,
      tokens: n.inlineTokens(i)
    };
    return n.state.inLink = !1, l;
  }
  return {
    type: "image",
    raw: t,
    href: s,
    title: r,
    text: P(i)
  };
}
function Vn(a, e) {
  const t = a.match(/^(\s+)(?:```)/);
  if (t === null)
    return e;
  const n = t[1];
  return e.split(`
`).map((s) => {
    const r = s.match(/^\s+/);
    if (r === null)
      return s;
    const [i] = r;
    return i.length >= n.length ? s.slice(n.length) : s;
  }).join(`
`);
}
class De {
  // set by the lexer
  constructor(e) {
    w(this, "options");
    w(this, "rules");
    // set by the lexer
    w(this, "lexer");
    this.options = e || J;
  }
  space(e) {
    const t = this.rules.block.newline.exec(e);
    if (t && t[0].length > 0)
      return {
        type: "space",
        raw: t[0]
      };
  }
  code(e) {
    const t = this.rules.block.code.exec(e);
    if (t) {
      const n = t[0].replace(/^ {1,4}/gm, "");
      return {
        type: "code",
        raw: t[0],
        codeBlockStyle: "indented",
        text: this.options.pedantic ? n : Re(n, `
`)
      };
    }
  }
  fences(e) {
    const t = this.rules.block.fences.exec(e);
    if (t) {
      const n = t[0], s = Vn(n, t[3] || "");
      return {
        type: "code",
        raw: n,
        lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2],
        text: s
      };
    }
  }
  heading(e) {
    const t = this.rules.block.heading.exec(e);
    if (t) {
      let n = t[2].trim();
      if (/#$/.test(n)) {
        const s = Re(n, "#");
        (this.options.pedantic || !s || / $/.test(s)) && (n = s.trim());
      }
      return {
        type: "heading",
        raw: t[0],
        depth: t[1].length,
        text: n,
        tokens: this.lexer.inline(n)
      };
    }
  }
  hr(e) {
    const t = this.rules.block.hr.exec(e);
    if (t)
      return {
        type: "hr",
        raw: t[0]
      };
  }
  blockquote(e) {
    const t = this.rules.block.blockquote.exec(e);
    if (t) {
      const n = Re(t[0].replace(/^ *>[ \t]?/gm, ""), `
`), s = this.lexer.state.top;
      this.lexer.state.top = !0;
      const r = this.lexer.blockTokens(n);
      return this.lexer.state.top = s, {
        type: "blockquote",
        raw: t[0],
        tokens: r,
        text: n
      };
    }
  }
  list(e) {
    let t = this.rules.block.list.exec(e);
    if (t) {
      let n = t[1].trim();
      const s = n.length > 1, r = {
        type: "list",
        raw: "",
        ordered: s,
        start: s ? +n.slice(0, -1) : "",
        loose: !1,
        items: []
      };
      n = s ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = s ? n : "[*+-]");
      const i = new RegExp(`^( {0,3}${n})((?:[	 ][^\\n]*)?(?:\\n|$))`);
      let l = "", c = "", g = !1;
      for (; e; ) {
        let f = !1;
        if (!(t = i.exec(e)) || this.rules.block.hr.test(e))
          break;
        l = t[0], e = e.substring(l.length);
        let d = t[2].split(`
`, 1)[0].replace(/^\t+/, (le) => " ".repeat(3 * le.length)), m = e.split(`
`, 1)[0], T = 0;
        this.options.pedantic ? (T = 2, c = d.trimStart()) : (T = t[2].search(/[^ ]/), T = T > 4 ? 1 : T, c = d.slice(T), T += t[1].length);
        let M = !1;
        if (!d && /^ *$/.test(m) && (l += m + `
`, e = e.substring(m.length + 1), f = !0), !f) {
          const le = new RegExp(`^ {0,${Math.min(3, T - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), ee = new RegExp(`^ {0,${Math.min(3, T - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), A = new RegExp(`^ {0,${Math.min(3, T - 1)}}(?:\`\`\`|~~~)`), Y = new RegExp(`^ {0,${Math.min(3, T - 1)}}#`);
          for (; e; ) {
            const j = e.split(`
`, 1)[0];
            if (m = j, this.options.pedantic && (m = m.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")), A.test(m) || Y.test(m) || le.test(m) || ee.test(e))
              break;
            if (m.search(/[^ ]/) >= T || !m.trim())
              c += `
` + m.slice(T);
            else {
              if (M || d.search(/[^ ]/) >= 4 || A.test(d) || Y.test(d) || ee.test(d))
                break;
              c += `
` + m;
            }
            !M && !m.trim() && (M = !0), l += j + `
`, e = e.substring(j.length + 1), d = m.slice(T);
          }
        }
        r.loose || (g ? r.loose = !0 : /\n *\n *$/.test(l) && (g = !0));
        let z = null, W;
        this.options.gfm && (z = /^\[[ xX]\] /.exec(c), z && (W = z[0] !== "[ ] ", c = c.replace(/^\[[ xX]\] +/, ""))), r.items.push({
          type: "list_item",
          raw: l,
          task: !!z,
          checked: W,
          loose: !1,
          text: c,
          tokens: []
        }), r.raw += l;
      }
      r.items[r.items.length - 1].raw = l.trimEnd(), r.items[r.items.length - 1].text = c.trimEnd(), r.raw = r.raw.trimEnd();
      for (let f = 0; f < r.items.length; f++)
        if (this.lexer.state.top = !1, r.items[f].tokens = this.lexer.blockTokens(r.items[f].text, []), !r.loose) {
          const d = r.items[f].tokens.filter((T) => T.type === "space"), m = d.length > 0 && d.some((T) => /\n.*\n/.test(T.raw));
          r.loose = m;
        }
      if (r.loose)
        for (let f = 0; f < r.items.length; f++)
          r.items[f].loose = !0;
      return r;
    }
  }
  html(e) {
    const t = this.rules.block.html.exec(e);
    if (t)
      return {
        type: "html",
        block: !0,
        raw: t[0],
        pre: t[1] === "pre" || t[1] === "script" || t[1] === "style",
        text: t[0]
      };
  }
  def(e) {
    const t = this.rules.block.def.exec(e);
    if (t) {
      const n = t[1].toLowerCase().replace(/\s+/g, " "), s = t[2] ? t[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", r = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
      return {
        type: "def",
        tag: n,
        raw: t[0],
        href: s,
        title: r
      };
    }
  }
  table(e) {
    const t = this.rules.block.table.exec(e);
    if (!t || !/[:|]/.test(t[2]))
      return;
    const n = Gt(t[1]), s = t[2].replace(/^\||\| *$/g, "").split("|"), r = t[3] && t[3].trim() ? t[3].replace(/\n[ \t]*$/, "").split(`
`) : [], i = {
      type: "table",
      raw: t[0],
      header: [],
      align: [],
      rows: []
    };
    if (n.length === s.length) {
      for (const l of s)
        /^ *-+: *$/.test(l) ? i.align.push("right") : /^ *:-+: *$/.test(l) ? i.align.push("center") : /^ *:-+ *$/.test(l) ? i.align.push("left") : i.align.push(null);
      for (const l of n)
        i.header.push({
          text: l,
          tokens: this.lexer.inline(l)
        });
      for (const l of r)
        i.rows.push(Gt(l, i.header.length).map((c) => ({
          text: c,
          tokens: this.lexer.inline(c)
        })));
      return i;
    }
  }
  lheading(e) {
    const t = this.rules.block.lheading.exec(e);
    if (t)
      return {
        type: "heading",
        raw: t[0],
        depth: t[2].charAt(0) === "=" ? 1 : 2,
        text: t[1],
        tokens: this.lexer.inline(t[1])
      };
  }
  paragraph(e) {
    const t = this.rules.block.paragraph.exec(e);
    if (t) {
      const n = t[1].charAt(t[1].length - 1) === `
` ? t[1].slice(0, -1) : t[1];
      return {
        type: "paragraph",
        raw: t[0],
        text: n,
        tokens: this.lexer.inline(n)
      };
    }
  }
  text(e) {
    const t = this.rules.block.text.exec(e);
    if (t)
      return {
        type: "text",
        raw: t[0],
        text: t[0],
        tokens: this.lexer.inline(t[0])
      };
  }
  escape(e) {
    const t = this.rules.inline.escape.exec(e);
    if (t)
      return {
        type: "escape",
        raw: t[0],
        text: P(t[1])
      };
  }
  tag(e) {
    const t = this.rules.inline.tag.exec(e);
    if (t)
      return !this.lexer.state.inLink && /^<a /i.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && /^<\/a>/i.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
        type: "html",
        raw: t[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        block: !1,
        text: t[0]
      };
  }
  link(e) {
    const t = this.rules.inline.link.exec(e);
    if (t) {
      const n = t[2].trim();
      if (!this.options.pedantic && /^</.test(n)) {
        if (!/>$/.test(n))
          return;
        const i = Re(n.slice(0, -1), "\\");
        if ((n.length - i.length) % 2 === 0)
          return;
      } else {
        const i = Qn(t[2], "()");
        if (i > -1) {
          const c = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + i;
          t[2] = t[2].substring(0, i), t[0] = t[0].substring(0, c).trim(), t[3] = "";
        }
      }
      let s = t[2], r = "";
      if (this.options.pedantic) {
        const i = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(s);
        i && (s = i[1], r = i[3]);
      } else
        r = t[3] ? t[3].slice(1, -1) : "";
      return s = s.trim(), /^</.test(s) && (this.options.pedantic && !/>$/.test(n) ? s = s.slice(1) : s = s.slice(1, -1)), qt(t, {
        href: s && s.replace(this.rules.inline.anyPunctuation, "$1"),
        title: r && r.replace(this.rules.inline.anyPunctuation, "$1")
      }, t[0], this.lexer);
    }
  }
  reflink(e, t) {
    let n;
    if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
      const s = (n[2] || n[1]).replace(/\s+/g, " "), r = t[s.toLowerCase()];
      if (!r) {
        const i = n[0].charAt(0);
        return {
          type: "text",
          raw: i,
          text: i
        };
      }
      return qt(n, r, n[0], this.lexer);
    }
  }
  emStrong(e, t, n = "") {
    let s = this.rules.inline.emStrongLDelim.exec(e);
    if (!s || s[3] && n.match(/[\p{L}\p{N}]/u))
      return;
    if (!(s[1] || s[2] || "") || !n || this.rules.inline.punctuation.exec(n)) {
      const i = [...s[0]].length - 1;
      let l, c, g = i, f = 0;
      const d = s[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (d.lastIndex = 0, t = t.slice(-1 * e.length + i); (s = d.exec(t)) != null; ) {
        if (l = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !l)
          continue;
        if (c = [...l].length, s[3] || s[4]) {
          g += c;
          continue;
        } else if ((s[5] || s[6]) && i % 3 && !((i + c) % 3)) {
          f += c;
          continue;
        }
        if (g -= c, g > 0)
          continue;
        c = Math.min(c, c + g + f);
        const m = [...s[0]][0].length, T = e.slice(0, i + s.index + m + c);
        if (Math.min(i, c) % 2) {
          const z = T.slice(1, -1);
          return {
            type: "em",
            raw: T,
            text: z,
            tokens: this.lexer.inlineTokens(z)
          };
        }
        const M = T.slice(2, -2);
        return {
          type: "strong",
          raw: T,
          text: M,
          tokens: this.lexer.inlineTokens(M)
        };
      }
    }
  }
  codespan(e) {
    const t = this.rules.inline.code.exec(e);
    if (t) {
      let n = t[2].replace(/\n/g, " ");
      const s = /[^ ]/.test(n), r = /^ /.test(n) && / $/.test(n);
      return s && r && (n = n.substring(1, n.length - 1)), n = P(n, !0), {
        type: "codespan",
        raw: t[0],
        text: n
      };
    }
  }
  br(e) {
    const t = this.rules.inline.br.exec(e);
    if (t)
      return {
        type: "br",
        raw: t[0]
      };
  }
  del(e) {
    const t = this.rules.inline.del.exec(e);
    if (t)
      return {
        type: "del",
        raw: t[0],
        text: t[2],
        tokens: this.lexer.inlineTokens(t[2])
      };
  }
  autolink(e) {
    const t = this.rules.inline.autolink.exec(e);
    if (t) {
      let n, s;
      return t[2] === "@" ? (n = P(t[1]), s = "mailto:" + n) : (n = P(t[1]), s = n), {
        type: "link",
        raw: t[0],
        text: n,
        href: s,
        tokens: [
          {
            type: "text",
            raw: n,
            text: n
          }
        ]
      };
    }
  }
  url(e) {
    var n;
    let t;
    if (t = this.rules.inline.url.exec(e)) {
      let s, r;
      if (t[2] === "@")
        s = P(t[0]), r = "mailto:" + s;
      else {
        let i;
        do
          i = t[0], t[0] = ((n = this.rules.inline._backpedal.exec(t[0])) == null ? void 0 : n[0]) ?? "";
        while (i !== t[0]);
        s = P(t[0]), t[1] === "www." ? r = "http://" + t[0] : r = t[0];
      }
      return {
        type: "link",
        raw: t[0],
        text: s,
        href: r,
        tokens: [
          {
            type: "text",
            raw: s,
            text: s
          }
        ]
      };
    }
  }
  inlineText(e) {
    const t = this.rules.inline.text.exec(e);
    if (t) {
      let n;
      return this.lexer.state.inRawBlock ? n = t[0] : n = P(t[0]), {
        type: "text",
        raw: t[0],
        text: n
      };
    }
  }
}
const Kn = /^(?: *(?:\n|$))+/, Jn = /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/, ei = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, be = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, ti = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, rn = /(?:[*+-]|\d{1,9}[.)])/, on = x(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, rn).replace(/blockCode/g, / {4}/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).getRegex(), lt = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, ni = /^[^\n]+/, at = /(?!\s*\])(?:\\.|[^\[\]\\])+/, ii = x(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label", at).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), si = x(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, rn).getRegex(), Pe = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", ct = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, ri = x("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))", "i").replace("comment", ct).replace("tag", Pe).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), ln = x(lt).replace("hr", be).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Pe).getRegex(), oi = x(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", ln).getRegex(), ut = {
  blockquote: oi,
  code: Jn,
  def: ii,
  fences: ei,
  heading: ti,
  hr: be,
  html: ri,
  lheading: on,
  list: si,
  newline: Kn,
  paragraph: ln,
  table: de,
  text: ni
}, Zt = x("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", be).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Pe).getRegex(), li = {
  ...ut,
  table: Zt,
  paragraph: x(lt).replace("hr", be).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Zt).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Pe).getRegex()
}, ai = {
  ...ut,
  html: x(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", ct).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: de,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: x(lt).replace("hr", be).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", on).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, an = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, ci = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, cn = /^( {2,}|\\)\n(?!\s*$)/, ui = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, xe = "\\p{P}\\p{S}", pi = x(/^((?![*_])[\spunctuation])/, "u").replace(/punctuation/g, xe).getRegex(), fi = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g, hi = x(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/, "u").replace(/punct/g, xe).getRegex(), gi = x("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])", "gu").replace(/punct/g, xe).getRegex(), mi = x("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])", "gu").replace(/punct/g, xe).getRegex(), di = x(/\\([punct])/, "gu").replace(/punct/g, xe).getRegex(), ki = x(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), Ti = x(ct).replace("(?:-->|$)", "-->").getRegex(), bi = x("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", Ti).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Ne = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, xi = x(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", Ne).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), un = x(/^!?\[(label)\]\[(ref)\]/).replace("label", Ne).replace("ref", at).getRegex(), pn = x(/^!?\[(ref)\](?:\[\])?/).replace("ref", at).getRegex(), _i = x("reflink|nolink(?!\\()", "g").replace("reflink", un).replace("nolink", pn).getRegex(), pt = {
  _backpedal: de,
  // only used for GFM url
  anyPunctuation: di,
  autolink: ki,
  blockSkip: fi,
  br: cn,
  code: ci,
  del: de,
  emStrongLDelim: hi,
  emStrongRDelimAst: gi,
  emStrongRDelimUnd: mi,
  escape: an,
  link: xi,
  nolink: pn,
  punctuation: pi,
  reflink: un,
  reflinkSearch: _i,
  tag: bi,
  text: ui,
  url: de
}, wi = {
  ...pt,
  link: x(/^!?\[(label)\]\((.*?)\)/).replace("label", Ne).getRegex(),
  reflink: x(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Ne).getRegex()
}, nt = {
  ...pt,
  escape: x(an).replace("])", "~|])").getRegex(),
  url: x(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
}, Ei = {
  ...nt,
  br: x(cn).replace("{2,}", "*").getRegex(),
  text: x(nt.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, Se = {
  normal: ut,
  gfm: li,
  pedantic: ai
}, fe = {
  normal: pt,
  gfm: nt,
  breaks: Ei,
  pedantic: wi
};
class B {
  constructor(e) {
    w(this, "tokens");
    w(this, "options");
    w(this, "state");
    w(this, "tokenizer");
    w(this, "inlineQueue");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || J, this.options.tokenizer = this.options.tokenizer || new De(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
      inLink: !1,
      inRawBlock: !1,
      top: !0
    };
    const t = {
      block: Se.normal,
      inline: fe.normal
    };
    this.options.pedantic ? (t.block = Se.pedantic, t.inline = fe.pedantic) : this.options.gfm && (t.block = Se.gfm, this.options.breaks ? t.inline = fe.breaks : t.inline = fe.gfm), this.tokenizer.rules = t;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block: Se,
      inline: fe
    };
  }
  /**
   * Static Lex Method
   */
  static lex(e, t) {
    return new B(t).lex(e);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(e, t) {
    return new B(t).inlineTokens(e);
  }
  /**
   * Preprocessing
   */
  lex(e) {
    e = e.replace(/\r\n|\r/g, `
`), this.blockTokens(e, this.tokens);
    for (let t = 0; t < this.inlineQueue.length; t++) {
      const n = this.inlineQueue[t];
      this.inlineTokens(n.src, n.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, t = []) {
    this.options.pedantic ? e = e.replace(/\t/g, "    ").replace(/^ +$/gm, "") : e = e.replace(/^( *)(\t+)/gm, (l, c, g) => c + "    ".repeat(g.length));
    let n, s, r, i;
    for (; e; )
      if (!(this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((l) => (n = l.call({ lexer: this }, e, t)) ? (e = e.substring(n.raw.length), t.push(n), !0) : !1))) {
        if (n = this.tokenizer.space(e)) {
          e = e.substring(n.raw.length), n.raw.length === 1 && t.length > 0 ? t[t.length - 1].raw += `
` : t.push(n);
          continue;
        }
        if (n = this.tokenizer.code(e)) {
          e = e.substring(n.raw.length), s = t[t.length - 1], s && (s.type === "paragraph" || s.type === "text") ? (s.raw += `
` + n.raw, s.text += `
` + n.text, this.inlineQueue[this.inlineQueue.length - 1].src = s.text) : t.push(n);
          continue;
        }
        if (n = this.tokenizer.fences(e)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (n = this.tokenizer.heading(e)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (n = this.tokenizer.hr(e)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (n = this.tokenizer.blockquote(e)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (n = this.tokenizer.list(e)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (n = this.tokenizer.html(e)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (n = this.tokenizer.def(e)) {
          e = e.substring(n.raw.length), s = t[t.length - 1], s && (s.type === "paragraph" || s.type === "text") ? (s.raw += `
` + n.raw, s.text += `
` + n.raw, this.inlineQueue[this.inlineQueue.length - 1].src = s.text) : this.tokens.links[n.tag] || (this.tokens.links[n.tag] = {
            href: n.href,
            title: n.title
          });
          continue;
        }
        if (n = this.tokenizer.table(e)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (n = this.tokenizer.lheading(e)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (r = e, this.options.extensions && this.options.extensions.startBlock) {
          let l = 1 / 0;
          const c = e.slice(1);
          let g;
          this.options.extensions.startBlock.forEach((f) => {
            g = f.call({ lexer: this }, c), typeof g == "number" && g >= 0 && (l = Math.min(l, g));
          }), l < 1 / 0 && l >= 0 && (r = e.substring(0, l + 1));
        }
        if (this.state.top && (n = this.tokenizer.paragraph(r))) {
          s = t[t.length - 1], i && s.type === "paragraph" ? (s.raw += `
` + n.raw, s.text += `
` + n.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = s.text) : t.push(n), i = r.length !== e.length, e = e.substring(n.raw.length);
          continue;
        }
        if (n = this.tokenizer.text(e)) {
          e = e.substring(n.raw.length), s = t[t.length - 1], s && s.type === "text" ? (s.raw += `
` + n.raw, s.text += `
` + n.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = s.text) : t.push(n);
          continue;
        }
        if (e) {
          const l = "Infinite loop on byte: " + e.charCodeAt(0);
          if (this.options.silent) {
            console.error(l);
            break;
          } else
            throw new Error(l);
        }
      }
    return this.state.top = !0, t;
  }
  inline(e, t = []) {
    return this.inlineQueue.push({ src: e, tokens: t }), t;
  }
  /**
   * Lexing/Compiling
   */
  inlineTokens(e, t = []) {
    let n, s, r, i = e, l, c, g;
    if (this.tokens.links) {
      const f = Object.keys(this.tokens.links);
      if (f.length > 0)
        for (; (l = this.tokenizer.rules.inline.reflinkSearch.exec(i)) != null; )
          f.includes(l[0].slice(l[0].lastIndexOf("[") + 1, -1)) && (i = i.slice(0, l.index) + "[" + "a".repeat(l[0].length - 2) + "]" + i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (l = this.tokenizer.rules.inline.blockSkip.exec(i)) != null; )
      i = i.slice(0, l.index) + "[" + "a".repeat(l[0].length - 2) + "]" + i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    for (; (l = this.tokenizer.rules.inline.anyPunctuation.exec(i)) != null; )
      i = i.slice(0, l.index) + "++" + i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    for (; e; )
      if (c || (g = ""), c = !1, !(this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((f) => (n = f.call({ lexer: this }, e, t)) ? (e = e.substring(n.raw.length), t.push(n), !0) : !1))) {
        if (n = this.tokenizer.escape(e)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (n = this.tokenizer.tag(e)) {
          e = e.substring(n.raw.length), s = t[t.length - 1], s && n.type === "text" && s.type === "text" ? (s.raw += n.raw, s.text += n.text) : t.push(n);
          continue;
        }
        if (n = this.tokenizer.link(e)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (n = this.tokenizer.reflink(e, this.tokens.links)) {
          e = e.substring(n.raw.length), s = t[t.length - 1], s && n.type === "text" && s.type === "text" ? (s.raw += n.raw, s.text += n.text) : t.push(n);
          continue;
        }
        if (n = this.tokenizer.emStrong(e, i, g)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (n = this.tokenizer.codespan(e)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (n = this.tokenizer.br(e)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (n = this.tokenizer.del(e)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (n = this.tokenizer.autolink(e)) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (!this.state.inLink && (n = this.tokenizer.url(e))) {
          e = e.substring(n.raw.length), t.push(n);
          continue;
        }
        if (r = e, this.options.extensions && this.options.extensions.startInline) {
          let f = 1 / 0;
          const d = e.slice(1);
          let m;
          this.options.extensions.startInline.forEach((T) => {
            m = T.call({ lexer: this }, d), typeof m == "number" && m >= 0 && (f = Math.min(f, m));
          }), f < 1 / 0 && f >= 0 && (r = e.substring(0, f + 1));
        }
        if (n = this.tokenizer.inlineText(r)) {
          e = e.substring(n.raw.length), n.raw.slice(-1) !== "_" && (g = n.raw.slice(-1)), c = !0, s = t[t.length - 1], s && s.type === "text" ? (s.raw += n.raw, s.text += n.text) : t.push(n);
          continue;
        }
        if (e) {
          const f = "Infinite loop on byte: " + e.charCodeAt(0);
          if (this.options.silent) {
            console.error(f);
            break;
          } else
            throw new Error(f);
        }
      }
    return t;
  }
}
class Me {
  constructor(e) {
    w(this, "options");
    this.options = e || J;
  }
  code(e, t, n) {
    var r;
    const s = (r = (t || "").match(/^\S*/)) == null ? void 0 : r[0];
    return e = e.replace(/\n$/, "") + `
`, s ? '<pre><code class="language-' + P(s) + '">' + (n ? e : P(e, !0)) + `</code></pre>
` : "<pre><code>" + (n ? e : P(e, !0)) + `</code></pre>
`;
  }
  blockquote(e) {
    return `<blockquote>
${e}</blockquote>
`;
  }
  html(e, t) {
    return e;
  }
  heading(e, t, n) {
    return `<h${t}>${e}</h${t}>
`;
  }
  hr() {
    return `<hr>
`;
  }
  list(e, t, n) {
    const s = t ? "ol" : "ul", r = t && n !== 1 ? ' start="' + n + '"' : "";
    return "<" + s + r + `>
` + e + "</" + s + `>
`;
  }
  listitem(e, t, n) {
    return `<li>${e}</li>
`;
  }
  checkbox(e) {
    return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph(e) {
    return `<p>${e}</p>
`;
  }
  table(e, t) {
    return t && (t = `<tbody>${t}</tbody>`), `<table>
<thead>
` + e + `</thead>
` + t + `</table>
`;
  }
  tablerow(e) {
    return `<tr>
${e}</tr>
`;
  }
  tablecell(e, t) {
    const n = t.header ? "th" : "td";
    return (t.align ? `<${n} align="${t.align}">` : `<${n}>`) + e + `</${n}>
`;
  }
  /**
   * span level renderer
   */
  strong(e) {
    return `<strong>${e}</strong>`;
  }
  em(e) {
    return `<em>${e}</em>`;
  }
  codespan(e) {
    return `<code>${e}</code>`;
  }
  br() {
    return "<br>";
  }
  del(e) {
    return `<del>${e}</del>`;
  }
  link(e, t, n) {
    const s = Wt(e);
    if (s === null)
      return n;
    e = s;
    let r = '<a href="' + e + '"';
    return t && (r += ' title="' + t + '"'), r += ">" + n + "</a>", r;
  }
  image(e, t, n) {
    const s = Wt(e);
    if (s === null)
      return n;
    e = s;
    let r = `<img src="${e}" alt="${n}"`;
    return t && (r += ` title="${t}"`), r += ">", r;
  }
  text(e) {
    return e;
  }
}
class ft {
  // no need for block level renderers
  strong(e) {
    return e;
  }
  em(e) {
    return e;
  }
  codespan(e) {
    return e;
  }
  del(e) {
    return e;
  }
  html(e) {
    return e;
  }
  text(e) {
    return e;
  }
  link(e, t, n) {
    return "" + n;
  }
  image(e, t, n) {
    return "" + n;
  }
  br() {
    return "";
  }
}
class H {
  constructor(e) {
    w(this, "options");
    w(this, "renderer");
    w(this, "textRenderer");
    this.options = e || J, this.options.renderer = this.options.renderer || new Me(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.textRenderer = new ft();
  }
  /**
   * Static Parse Method
   */
  static parse(e, t) {
    return new H(t).parse(e);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(e, t) {
    return new H(t).parseInline(e);
  }
  /**
   * Parse Loop
   */
  parse(e, t = !0) {
    let n = "";
    for (let s = 0; s < e.length; s++) {
      const r = e[s];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[r.type]) {
        const i = r, l = this.options.extensions.renderers[i.type].call({ parser: this }, i);
        if (l !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(i.type)) {
          n += l || "";
          continue;
        }
      }
      switch (r.type) {
        case "space":
          continue;
        case "hr": {
          n += this.renderer.hr();
          continue;
        }
        case "heading": {
          const i = r;
          n += this.renderer.heading(this.parseInline(i.tokens), i.depth, jn(this.parseInline(i.tokens, this.textRenderer)));
          continue;
        }
        case "code": {
          const i = r;
          n += this.renderer.code(i.text, i.lang, !!i.escaped);
          continue;
        }
        case "table": {
          const i = r;
          let l = "", c = "";
          for (let f = 0; f < i.header.length; f++)
            c += this.renderer.tablecell(this.parseInline(i.header[f].tokens), { header: !0, align: i.align[f] });
          l += this.renderer.tablerow(c);
          let g = "";
          for (let f = 0; f < i.rows.length; f++) {
            const d = i.rows[f];
            c = "";
            for (let m = 0; m < d.length; m++)
              c += this.renderer.tablecell(this.parseInline(d[m].tokens), { header: !1, align: i.align[m] });
            g += this.renderer.tablerow(c);
          }
          n += this.renderer.table(l, g);
          continue;
        }
        case "blockquote": {
          const i = r, l = this.parse(i.tokens);
          n += this.renderer.blockquote(l);
          continue;
        }
        case "list": {
          const i = r, l = i.ordered, c = i.start, g = i.loose;
          let f = "";
          for (let d = 0; d < i.items.length; d++) {
            const m = i.items[d], T = m.checked, M = m.task;
            let z = "";
            if (m.task) {
              const W = this.renderer.checkbox(!!T);
              g ? m.tokens.length > 0 && m.tokens[0].type === "paragraph" ? (m.tokens[0].text = W + " " + m.tokens[0].text, m.tokens[0].tokens && m.tokens[0].tokens.length > 0 && m.tokens[0].tokens[0].type === "text" && (m.tokens[0].tokens[0].text = W + " " + m.tokens[0].tokens[0].text)) : m.tokens.unshift({
                type: "text",
                text: W + " "
              }) : z += W + " ";
            }
            z += this.parse(m.tokens, g), f += this.renderer.listitem(z, M, !!T);
          }
          n += this.renderer.list(f, l, c);
          continue;
        }
        case "html": {
          const i = r;
          n += this.renderer.html(i.text, i.block);
          continue;
        }
        case "paragraph": {
          const i = r;
          n += this.renderer.paragraph(this.parseInline(i.tokens));
          continue;
        }
        case "text": {
          let i = r, l = i.tokens ? this.parseInline(i.tokens) : i.text;
          for (; s + 1 < e.length && e[s + 1].type === "text"; )
            i = e[++s], l += `
` + (i.tokens ? this.parseInline(i.tokens) : i.text);
          n += t ? this.renderer.paragraph(l) : l;
          continue;
        }
        default: {
          const i = 'Token with "' + r.type + '" type was not found.';
          if (this.options.silent)
            return console.error(i), "";
          throw new Error(i);
        }
      }
    }
    return n;
  }
  /**
   * Parse Inline Tokens
   */
  parseInline(e, t) {
    t = t || this.renderer;
    let n = "";
    for (let s = 0; s < e.length; s++) {
      const r = e[s];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[r.type]) {
        const i = this.options.extensions.renderers[r.type].call({ parser: this }, r);
        if (i !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(r.type)) {
          n += i || "";
          continue;
        }
      }
      switch (r.type) {
        case "escape": {
          const i = r;
          n += t.text(i.text);
          break;
        }
        case "html": {
          const i = r;
          n += t.html(i.text);
          break;
        }
        case "link": {
          const i = r;
          n += t.link(i.href, i.title, this.parseInline(i.tokens, t));
          break;
        }
        case "image": {
          const i = r;
          n += t.image(i.href, i.title, i.text);
          break;
        }
        case "strong": {
          const i = r;
          n += t.strong(this.parseInline(i.tokens, t));
          break;
        }
        case "em": {
          const i = r;
          n += t.em(this.parseInline(i.tokens, t));
          break;
        }
        case "codespan": {
          const i = r;
          n += t.codespan(i.text);
          break;
        }
        case "br": {
          n += t.br();
          break;
        }
        case "del": {
          const i = r;
          n += t.del(this.parseInline(i.tokens, t));
          break;
        }
        case "text": {
          const i = r;
          n += t.text(i.text);
          break;
        }
        default: {
          const i = 'Token with "' + r.type + '" type was not found.';
          if (this.options.silent)
            return console.error(i), "";
          throw new Error(i);
        }
      }
    }
    return n;
  }
}
class ke {
  constructor(e) {
    w(this, "options");
    this.options = e || J;
  }
  /**
   * Process markdown before marked
   */
  preprocess(e) {
    return e;
  }
  /**
   * Process HTML after marked is finished
   */
  postprocess(e) {
    return e;
  }
  /**
   * Process all tokens before walk tokens
   */
  processAllTokens(e) {
    return e;
  }
}
w(ke, "passThroughHooks", /* @__PURE__ */ new Set([
  "preprocess",
  "postprocess",
  "processAllTokens"
]));
var Te, it, ze, fn;
class Ai {
  constructor(...e) {
    Qe(this, Te);
    Qe(this, ze);
    w(this, "defaults", ot());
    w(this, "options", this.setOptions);
    w(this, "parse", ye(this, Te, it).call(this, B.lex, H.parse));
    w(this, "parseInline", ye(this, Te, it).call(this, B.lexInline, H.parseInline));
    w(this, "Parser", H);
    w(this, "Renderer", Me);
    w(this, "TextRenderer", ft);
    w(this, "Lexer", B);
    w(this, "Tokenizer", De);
    w(this, "Hooks", ke);
    this.use(...e);
  }
  /**
   * Run callback for every token
   */
  walkTokens(e, t) {
    var s, r;
    let n = [];
    for (const i of e)
      switch (n = n.concat(t.call(this, i)), i.type) {
        case "table": {
          const l = i;
          for (const c of l.header)
            n = n.concat(this.walkTokens(c.tokens, t));
          for (const c of l.rows)
            for (const g of c)
              n = n.concat(this.walkTokens(g.tokens, t));
          break;
        }
        case "list": {
          const l = i;
          n = n.concat(this.walkTokens(l.items, t));
          break;
        }
        default: {
          const l = i;
          (r = (s = this.defaults.extensions) == null ? void 0 : s.childTokens) != null && r[l.type] ? this.defaults.extensions.childTokens[l.type].forEach((c) => {
            const g = l[c].flat(1 / 0);
            n = n.concat(this.walkTokens(g, t));
          }) : l.tokens && (n = n.concat(this.walkTokens(l.tokens, t)));
        }
      }
    return n;
  }
  use(...e) {
    const t = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return e.forEach((n) => {
      const s = { ...n };
      if (s.async = this.defaults.async || s.async || !1, n.extensions && (n.extensions.forEach((r) => {
        if (!r.name)
          throw new Error("extension name required");
        if ("renderer" in r) {
          const i = t.renderers[r.name];
          i ? t.renderers[r.name] = function(...l) {
            let c = r.renderer.apply(this, l);
            return c === !1 && (c = i.apply(this, l)), c;
          } : t.renderers[r.name] = r.renderer;
        }
        if ("tokenizer" in r) {
          if (!r.level || r.level !== "block" && r.level !== "inline")
            throw new Error("extension level must be 'block' or 'inline'");
          const i = t[r.level];
          i ? i.unshift(r.tokenizer) : t[r.level] = [r.tokenizer], r.start && (r.level === "block" ? t.startBlock ? t.startBlock.push(r.start) : t.startBlock = [r.start] : r.level === "inline" && (t.startInline ? t.startInline.push(r.start) : t.startInline = [r.start]));
        }
        "childTokens" in r && r.childTokens && (t.childTokens[r.name] = r.childTokens);
      }), s.extensions = t), n.renderer) {
        const r = this.defaults.renderer || new Me(this.defaults);
        for (const i in n.renderer) {
          if (!(i in r))
            throw new Error(`renderer '${i}' does not exist`);
          if (i === "options")
            continue;
          const l = i, c = n.renderer[l], g = r[l];
          r[l] = (...f) => {
            let d = c.apply(r, f);
            return d === !1 && (d = g.apply(r, f)), d || "";
          };
        }
        s.renderer = r;
      }
      if (n.tokenizer) {
        const r = this.defaults.tokenizer || new De(this.defaults);
        for (const i in n.tokenizer) {
          if (!(i in r))
            throw new Error(`tokenizer '${i}' does not exist`);
          if (["options", "rules", "lexer"].includes(i))
            continue;
          const l = i, c = n.tokenizer[l], g = r[l];
          r[l] = (...f) => {
            let d = c.apply(r, f);
            return d === !1 && (d = g.apply(r, f)), d;
          };
        }
        s.tokenizer = r;
      }
      if (n.hooks) {
        const r = this.defaults.hooks || new ke();
        for (const i in n.hooks) {
          if (!(i in r))
            throw new Error(`hook '${i}' does not exist`);
          if (i === "options")
            continue;
          const l = i, c = n.hooks[l], g = r[l];
          ke.passThroughHooks.has(i) ? r[l] = (f) => {
            if (this.defaults.async)
              return Promise.resolve(c.call(r, f)).then((m) => g.call(r, m));
            const d = c.call(r, f);
            return g.call(r, d);
          } : r[l] = (...f) => {
            let d = c.apply(r, f);
            return d === !1 && (d = g.apply(r, f)), d;
          };
        }
        s.hooks = r;
      }
      if (n.walkTokens) {
        const r = this.defaults.walkTokens, i = n.walkTokens;
        s.walkTokens = function(l) {
          let c = [];
          return c.push(i.call(this, l)), r && (c = c.concat(r.call(this, l))), c;
        };
      }
      this.defaults = { ...this.defaults, ...s };
    }), this;
  }
  setOptions(e) {
    return this.defaults = { ...this.defaults, ...e }, this;
  }
  lexer(e, t) {
    return B.lex(e, t ?? this.defaults);
  }
  parser(e, t) {
    return H.parse(e, t ?? this.defaults);
  }
}
Te = new WeakSet(), it = function(e, t) {
  return (n, s) => {
    const r = { ...s }, i = { ...this.defaults, ...r };
    this.defaults.async === !0 && r.async === !1 && (i.silent || console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."), i.async = !0);
    const l = ye(this, ze, fn).call(this, !!i.silent, !!i.async);
    if (typeof n > "u" || n === null)
      return l(new Error("marked(): input parameter is undefined or null"));
    if (typeof n != "string")
      return l(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n) + ", string expected"));
    if (i.hooks && (i.hooks.options = i), i.async)
      return Promise.resolve(i.hooks ? i.hooks.preprocess(n) : n).then((c) => e(c, i)).then((c) => i.hooks ? i.hooks.processAllTokens(c) : c).then((c) => i.walkTokens ? Promise.all(this.walkTokens(c, i.walkTokens)).then(() => c) : c).then((c) => t(c, i)).then((c) => i.hooks ? i.hooks.postprocess(c) : c).catch(l);
    try {
      i.hooks && (n = i.hooks.preprocess(n));
      let c = e(n, i);
      i.hooks && (c = i.hooks.processAllTokens(c)), i.walkTokens && this.walkTokens(c, i.walkTokens);
      let g = t(c, i);
      return i.hooks && (g = i.hooks.postprocess(g)), g;
    } catch (c) {
      return l(c);
    }
  };
}, ze = new WeakSet(), fn = function(e, t) {
  return (n) => {
    if (n.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
      const s = "<p>An error occurred:</p><pre>" + P(n.message + "", !0) + "</pre>";
      return t ? Promise.resolve(s) : s;
    }
    if (t)
      return Promise.reject(n);
    throw n;
  };
};
const K = new Ai();
function b(a, e) {
  return K.parse(a, e);
}
b.options = b.setOptions = function(a) {
  return K.setOptions(a), b.defaults = K.defaults, tn(b.defaults), b;
};
b.getDefaults = ot;
b.defaults = J;
b.use = function(...a) {
  return K.use(...a), b.defaults = K.defaults, tn(b.defaults), b;
};
b.walkTokens = function(a, e) {
  return K.walkTokens(a, e);
};
b.parseInline = K.parseInline;
b.Parser = H;
b.parser = H.parse;
b.Renderer = Me;
b.TextRenderer = ft;
b.Lexer = B;
b.lexer = B.lex;
b.Tokenizer = De;
b.Hooks = ke;
b.parse = b;
b.options;
b.setOptions;
b.use;
b.walkTokens;
b.parseInline;
H.parse;
B.lex;
/*! @license DOMPurify 3.1.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.1.0/LICENSE */
const {
  entries: hn,
  setPrototypeOf: Yt,
  isFrozen: yi,
  getPrototypeOf: Ri,
  getOwnPropertyDescriptor: Si
} = Object;
let {
  freeze: O,
  seal: v,
  create: gn
} = Object, {
  apply: st,
  construct: rt
} = typeof Reflect < "u" && Reflect;
O || (O = function(e) {
  return e;
});
v || (v = function(e) {
  return e;
});
st || (st = function(e, t, n) {
  return e.apply(t, n);
});
rt || (rt = function(e, t) {
  return new e(...t);
});
const Le = $(Array.prototype.forEach), jt = $(Array.prototype.pop), he = $(Array.prototype.push), Ce = $(String.prototype.toLowerCase), Ve = $(String.prototype.toString), Xt = $(String.prototype.match), ge = $(String.prototype.replace), Li = $(String.prototype.indexOf), Ii = $(String.prototype.trim), U = $(Object.prototype.hasOwnProperty), N = $(RegExp.prototype.test), me = Oi(TypeError);
function $(a) {
  return function(e) {
    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)
      n[s - 1] = arguments[s];
    return st(a, e, n);
  };
}
function Oi(a) {
  return function() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    return rt(a, t);
  };
}
function k(a, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Ce;
  Yt && Yt(a, null);
  let n = e.length;
  for (; n--; ) {
    let s = e[n];
    if (typeof s == "string") {
      const r = t(s);
      r !== s && (yi(e) || (e[n] = r), s = r);
    }
    a[s] = !0;
  }
  return a;
}
function Ci(a) {
  for (let e = 0; e < a.length; e++)
    U(a, e) || (a[e] = null);
  return a;
}
function V(a) {
  const e = gn(null);
  for (const [t, n] of hn(a))
    U(a, t) && (Array.isArray(n) ? e[t] = Ci(n) : n && typeof n == "object" && n.constructor === Object ? e[t] = V(n) : e[t] = n);
  return e;
}
function Ie(a, e) {
  for (; a !== null; ) {
    const n = Si(a, e);
    if (n) {
      if (n.get)
        return $(n.get);
      if (typeof n.value == "function")
        return $(n.value);
    }
    a = Ri(a);
  }
  function t() {
    return null;
  }
  return t;
}
const Qt = O(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), Ke = O(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Je = O(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Di = O(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), et = O(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), Ni = O(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), Vt = O(["#text"]), Kt = O(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), tt = O(["accent-height", "accumulate", "additive", "alignment-baseline", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Jt = O(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), Oe = O(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Mi = v(/\{\{[\w\W]*|[\w\W]*\}\}/gm), zi = v(/<%[\w\W]*|[\w\W]*%>/gm), Pi = v(/\${[\w\W]*}/gm), $i = v(/^data-[\-\w.\u00B7-\uFFFF]/), vi = v(/^aria-[\-\w]+$/), mn = v(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Ui = v(/^(?:\w+script|data):/i), Fi = v(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), dn = v(/^html$/i), Bi = v(/^[a-z][.\w]*(-[.\w]+)+$/i);
var en = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  MUSTACHE_EXPR: Mi,
  ERB_EXPR: zi,
  TMPLIT_EXPR: Pi,
  DATA_ATTR: $i,
  ARIA_ATTR: vi,
  IS_ALLOWED_URI: mn,
  IS_SCRIPT_OR_DATA: Ui,
  ATTR_WHITESPACE: Fi,
  DOCTYPE_NAME: dn,
  CUSTOM_ELEMENT: Bi
});
const Hi = function() {
  return typeof window > "u" ? null : window;
}, Wi = function(e, t) {
  if (typeof e != "object" || typeof e.createPolicy != "function")
    return null;
  let n = null;
  const s = "data-tt-policy-suffix";
  t && t.hasAttribute(s) && (n = t.getAttribute(s));
  const r = "dompurify" + (n ? "#" + n : "");
  try {
    return e.createPolicy(r, {
      createHTML(i) {
        return i;
      },
      createScriptURL(i) {
        return i;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + r + " could not be created."), null;
  }
};
function kn() {
  let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Hi();
  const e = (h) => kn(h);
  if (e.version = "3.1.0", e.removed = [], !a || !a.document || a.document.nodeType !== 9)
    return e.isSupported = !1, e;
  let {
    document: t
  } = a;
  const n = t, s = n.currentScript, {
    DocumentFragment: r,
    HTMLTemplateElement: i,
    Node: l,
    Element: c,
    NodeFilter: g,
    NamedNodeMap: f = a.NamedNodeMap || a.MozNamedAttrMap,
    HTMLFormElement: d,
    DOMParser: m,
    trustedTypes: T
  } = a, M = c.prototype, z = Ie(M, "cloneNode"), W = Ie(M, "nextSibling"), le = Ie(M, "childNodes"), ee = Ie(M, "parentNode");
  if (typeof i == "function") {
    const h = t.createElement("template");
    h.content && h.content.ownerDocument && (t = h.content.ownerDocument);
  }
  let A, Y = "";
  const {
    implementation: j,
    createNodeIterator: Tn,
    createDocumentFragment: bn,
    getElementsByTagName: xn
  } = t, {
    importNode: _n
  } = n;
  let F = {};
  e.isSupported = typeof hn == "function" && typeof ee == "function" && j && j.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: $e,
    ERB_EXPR: ve,
    TMPLIT_EXPR: Ue,
    DATA_ATTR: wn,
    ARIA_ATTR: En,
    IS_SCRIPT_OR_DATA: An,
    ATTR_WHITESPACE: ht,
    CUSTOM_ELEMENT: yn
  } = en;
  let {
    IS_ALLOWED_URI: gt
  } = en, y = null;
  const mt = k({}, [...Qt, ...Ke, ...Je, ...et, ...Vt]);
  let R = null;
  const dt = k({}, [...Kt, ...tt, ...Jt, ...Oe]);
  let E = Object.seal(gn(null, {
    tagNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: !1
    }
  })), ae = null, Fe = null, kt = !0, Be = !0, Tt = !1, bt = !0, te = !1, xt = !0, X = !1, He = !1, We = !1, ne = !1, _e = !1, we = !1, _t = !0, wt = !1;
  const Rn = "user-content-";
  let Ge = !0, ce = !1, ie = {}, se = null;
  const Et = k({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let At = null;
  const yt = k({}, ["audio", "video", "img", "source", "image", "track"]);
  let qe = null;
  const Rt = k({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), Ee = "http://www.w3.org/1998/Math/MathML", Ae = "http://www.w3.org/2000/svg", G = "http://www.w3.org/1999/xhtml";
  let re = G, Ze = !1, Ye = null;
  const Sn = k({}, [Ee, Ae, G], Ve);
  let ue = null;
  const Ln = ["application/xhtml+xml", "text/html"], In = "text/html";
  let S = null, oe = null;
  const On = t.createElement("form"), St = function(o) {
    return o instanceof RegExp || o instanceof Function;
  }, je = function() {
    let o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(oe && oe === o)) {
      if ((!o || typeof o != "object") && (o = {}), o = V(o), ue = // eslint-disable-next-line unicorn/prefer-includes
      Ln.indexOf(o.PARSER_MEDIA_TYPE) === -1 ? In : o.PARSER_MEDIA_TYPE, S = ue === "application/xhtml+xml" ? Ve : Ce, y = U(o, "ALLOWED_TAGS") ? k({}, o.ALLOWED_TAGS, S) : mt, R = U(o, "ALLOWED_ATTR") ? k({}, o.ALLOWED_ATTR, S) : dt, Ye = U(o, "ALLOWED_NAMESPACES") ? k({}, o.ALLOWED_NAMESPACES, Ve) : Sn, qe = U(o, "ADD_URI_SAFE_ATTR") ? k(
        V(Rt),
        // eslint-disable-line indent
        o.ADD_URI_SAFE_ATTR,
        // eslint-disable-line indent
        S
        // eslint-disable-line indent
      ) : Rt, At = U(o, "ADD_DATA_URI_TAGS") ? k(
        V(yt),
        // eslint-disable-line indent
        o.ADD_DATA_URI_TAGS,
        // eslint-disable-line indent
        S
        // eslint-disable-line indent
      ) : yt, se = U(o, "FORBID_CONTENTS") ? k({}, o.FORBID_CONTENTS, S) : Et, ae = U(o, "FORBID_TAGS") ? k({}, o.FORBID_TAGS, S) : {}, Fe = U(o, "FORBID_ATTR") ? k({}, o.FORBID_ATTR, S) : {}, ie = U(o, "USE_PROFILES") ? o.USE_PROFILES : !1, kt = o.ALLOW_ARIA_ATTR !== !1, Be = o.ALLOW_DATA_ATTR !== !1, Tt = o.ALLOW_UNKNOWN_PROTOCOLS || !1, bt = o.ALLOW_SELF_CLOSE_IN_ATTR !== !1, te = o.SAFE_FOR_TEMPLATES || !1, xt = o.SAFE_FOR_XML !== !1, X = o.WHOLE_DOCUMENT || !1, ne = o.RETURN_DOM || !1, _e = o.RETURN_DOM_FRAGMENT || !1, we = o.RETURN_TRUSTED_TYPE || !1, We = o.FORCE_BODY || !1, _t = o.SANITIZE_DOM !== !1, wt = o.SANITIZE_NAMED_PROPS || !1, Ge = o.KEEP_CONTENT !== !1, ce = o.IN_PLACE || !1, gt = o.ALLOWED_URI_REGEXP || mn, re = o.NAMESPACE || G, E = o.CUSTOM_ELEMENT_HANDLING || {}, o.CUSTOM_ELEMENT_HANDLING && St(o.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (E.tagNameCheck = o.CUSTOM_ELEMENT_HANDLING.tagNameCheck), o.CUSTOM_ELEMENT_HANDLING && St(o.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (E.attributeNameCheck = o.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), o.CUSTOM_ELEMENT_HANDLING && typeof o.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (E.allowCustomizedBuiltInElements = o.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), te && (Be = !1), _e && (ne = !0), ie && (y = k({}, Vt), R = [], ie.html === !0 && (k(y, Qt), k(R, Kt)), ie.svg === !0 && (k(y, Ke), k(R, tt), k(R, Oe)), ie.svgFilters === !0 && (k(y, Je), k(R, tt), k(R, Oe)), ie.mathMl === !0 && (k(y, et), k(R, Jt), k(R, Oe))), o.ADD_TAGS && (y === mt && (y = V(y)), k(y, o.ADD_TAGS, S)), o.ADD_ATTR && (R === dt && (R = V(R)), k(R, o.ADD_ATTR, S)), o.ADD_URI_SAFE_ATTR && k(qe, o.ADD_URI_SAFE_ATTR, S), o.FORBID_CONTENTS && (se === Et && (se = V(se)), k(se, o.FORBID_CONTENTS, S)), Ge && (y["#text"] = !0), X && k(y, ["html", "head", "body"]), y.table && (k(y, ["tbody"]), delete ae.tbody), o.TRUSTED_TYPES_POLICY) {
        if (typeof o.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw me('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof o.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw me('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        A = o.TRUSTED_TYPES_POLICY, Y = A.createHTML("");
      } else
        A === void 0 && (A = Wi(T, s)), A !== null && typeof Y == "string" && (Y = A.createHTML(""));
      O && O(o), oe = o;
    }
  }, Lt = k({}, ["mi", "mo", "mn", "ms", "mtext"]), It = k({}, ["foreignobject", "desc", "title", "annotation-xml"]), Cn = k({}, ["title", "style", "font", "a", "script"]), Ot = k({}, [...Ke, ...Je, ...Di]), Ct = k({}, [...et, ...Ni]), Dn = function(o) {
    let u = ee(o);
    (!u || !u.tagName) && (u = {
      namespaceURI: re,
      tagName: "template"
    });
    const p = Ce(o.tagName), _ = Ce(u.tagName);
    return Ye[o.namespaceURI] ? o.namespaceURI === Ae ? u.namespaceURI === G ? p === "svg" : u.namespaceURI === Ee ? p === "svg" && (_ === "annotation-xml" || Lt[_]) : !!Ot[p] : o.namespaceURI === Ee ? u.namespaceURI === G ? p === "math" : u.namespaceURI === Ae ? p === "math" && It[_] : !!Ct[p] : o.namespaceURI === G ? u.namespaceURI === Ae && !It[_] || u.namespaceURI === Ee && !Lt[_] ? !1 : !Ct[p] && (Cn[p] || !Ot[p]) : !!(ue === "application/xhtml+xml" && Ye[o.namespaceURI]) : !1;
  }, q = function(o) {
    he(e.removed, {
      element: o
    });
    try {
      o.parentNode.removeChild(o);
    } catch {
      o.remove();
    }
  }, Xe = function(o, u) {
    try {
      he(e.removed, {
        attribute: u.getAttributeNode(o),
        from: u
      });
    } catch {
      he(e.removed, {
        attribute: null,
        from: u
      });
    }
    if (u.removeAttribute(o), o === "is" && !R[o])
      if (ne || _e)
        try {
          q(u);
        } catch {
        }
      else
        try {
          u.setAttribute(o, "");
        } catch {
        }
  }, Dt = function(o) {
    let u = null, p = null;
    if (We)
      o = "<remove></remove>" + o;
    else {
      const I = Xt(o, /^[\r\n\t ]+/);
      p = I && I[0];
    }
    ue === "application/xhtml+xml" && re === G && (o = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + o + "</body></html>");
    const _ = A ? A.createHTML(o) : o;
    if (re === G)
      try {
        u = new m().parseFromString(_, ue);
      } catch {
      }
    if (!u || !u.documentElement) {
      u = j.createDocument(re, "template", null);
      try {
        u.documentElement.innerHTML = Ze ? Y : _;
      } catch {
      }
    }
    const L = u.body || u.documentElement;
    return o && p && L.insertBefore(t.createTextNode(p), L.childNodes[0] || null), re === G ? xn.call(u, X ? "html" : "body")[0] : X ? u.documentElement : L;
  }, Nt = function(o) {
    return Tn.call(
      o.ownerDocument || o,
      o,
      // eslint-disable-next-line no-bitwise
      g.SHOW_ELEMENT | g.SHOW_COMMENT | g.SHOW_TEXT | g.SHOW_PROCESSING_INSTRUCTION | g.SHOW_CDATA_SECTION,
      null
    );
  }, Nn = function(o) {
    return o instanceof d && (typeof o.nodeName != "string" || typeof o.textContent != "string" || typeof o.removeChild != "function" || !(o.attributes instanceof f) || typeof o.removeAttribute != "function" || typeof o.setAttribute != "function" || typeof o.namespaceURI != "string" || typeof o.insertBefore != "function" || typeof o.hasChildNodes != "function");
  }, Mt = function(o) {
    return typeof l == "function" && o instanceof l;
  }, Z = function(o, u, p) {
    F[o] && Le(F[o], (_) => {
      _.call(e, u, p, oe);
    });
  }, zt = function(o) {
    let u = null;
    if (Z("beforeSanitizeElements", o, null), Nn(o))
      return q(o), !0;
    const p = S(o.nodeName);
    if (Z("uponSanitizeElement", o, {
      tagName: p,
      allowedTags: y
    }), o.hasChildNodes() && !Mt(o.firstElementChild) && N(/<[/\w]/g, o.innerHTML) && N(/<[/\w]/g, o.textContent) || o.nodeType === 7 || xt && o.nodeType === 8 && N(/<[/\w]/g, o.data))
      return q(o), !0;
    if (!y[p] || ae[p]) {
      if (!ae[p] && $t(p) && (E.tagNameCheck instanceof RegExp && N(E.tagNameCheck, p) || E.tagNameCheck instanceof Function && E.tagNameCheck(p)))
        return !1;
      if (Ge && !se[p]) {
        const _ = ee(o) || o.parentNode, L = le(o) || o.childNodes;
        if (L && _) {
          const I = L.length;
          for (let C = I - 1; C >= 0; --C)
            _.insertBefore(z(L[C], !0), W(o));
        }
      }
      return q(o), !0;
    }
    return o instanceof c && !Dn(o) || (p === "noscript" || p === "noembed" || p === "noframes") && N(/<\/no(script|embed|frames)/i, o.innerHTML) ? (q(o), !0) : (te && o.nodeType === 3 && (u = o.textContent, Le([$e, ve, Ue], (_) => {
      u = ge(u, _, " ");
    }), o.textContent !== u && (he(e.removed, {
      element: o.cloneNode()
    }), o.textContent = u)), Z("afterSanitizeElements", o, null), !1);
  }, Pt = function(o, u, p) {
    if (_t && (u === "id" || u === "name") && (p in t || p in On))
      return !1;
    if (!(Be && !Fe[u] && N(wn, u))) {
      if (!(kt && N(En, u))) {
        if (!R[u] || Fe[u]) {
          if (
            // First condition does a very basic check if a) it's basically a valid custom element tagname AND
            // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
            !($t(o) && (E.tagNameCheck instanceof RegExp && N(E.tagNameCheck, o) || E.tagNameCheck instanceof Function && E.tagNameCheck(o)) && (E.attributeNameCheck instanceof RegExp && N(E.attributeNameCheck, u) || E.attributeNameCheck instanceof Function && E.attributeNameCheck(u)) || // Alternative, second condition checks if it's an `is`-attribute, AND
            // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            u === "is" && E.allowCustomizedBuiltInElements && (E.tagNameCheck instanceof RegExp && N(E.tagNameCheck, p) || E.tagNameCheck instanceof Function && E.tagNameCheck(p)))
          )
            return !1;
        } else if (!qe[u]) {
          if (!N(gt, ge(p, ht, ""))) {
            if (!((u === "src" || u === "xlink:href" || u === "href") && o !== "script" && Li(p, "data:") === 0 && At[o])) {
              if (!(Tt && !N(An, ge(p, ht, "")))) {
                if (p)
                  return !1;
              }
            }
          }
        }
      }
    }
    return !0;
  }, $t = function(o) {
    return o !== "annotation-xml" && Xt(o, yn);
  }, vt = function(o) {
    Z("beforeSanitizeAttributes", o, null);
    const {
      attributes: u
    } = o;
    if (!u)
      return;
    const p = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: R
    };
    let _ = u.length;
    for (; _--; ) {
      const L = u[_], {
        name: I,
        namespaceURI: C,
        value: Q
      } = L, pe = S(I);
      let D = I === "value" ? Q : Ii(Q);
      if (p.attrName = pe, p.attrValue = D, p.keepAttr = !0, p.forceKeepAttr = void 0, Z("uponSanitizeAttribute", o, p), D = p.attrValue, p.forceKeepAttr || (Xe(I, o), !p.keepAttr))
        continue;
      if (!bt && N(/\/>/i, D)) {
        Xe(I, o);
        continue;
      }
      te && Le([$e, ve, Ue], (Ft) => {
        D = ge(D, Ft, " ");
      });
      const Ut = S(o.nodeName);
      if (Pt(Ut, pe, D)) {
        if (wt && (pe === "id" || pe === "name") && (Xe(I, o), D = Rn + D), A && typeof T == "object" && typeof T.getAttributeType == "function" && !C)
          switch (T.getAttributeType(Ut, pe)) {
            case "TrustedHTML": {
              D = A.createHTML(D);
              break;
            }
            case "TrustedScriptURL": {
              D = A.createScriptURL(D);
              break;
            }
          }
        try {
          C ? o.setAttributeNS(C, I, D) : o.setAttribute(I, D), jt(e.removed);
        } catch {
        }
      }
    }
    Z("afterSanitizeAttributes", o, null);
  }, Mn = function h(o) {
    let u = null;
    const p = Nt(o);
    for (Z("beforeSanitizeShadowDOM", o, null); u = p.nextNode(); )
      Z("uponSanitizeShadowNode", u, null), !zt(u) && (u.content instanceof r && h(u.content), vt(u));
    Z("afterSanitizeShadowDOM", o, null);
  };
  return e.sanitize = function(h) {
    let o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, u = null, p = null, _ = null, L = null;
    if (Ze = !h, Ze && (h = "<!-->"), typeof h != "string" && !Mt(h))
      if (typeof h.toString == "function") {
        if (h = h.toString(), typeof h != "string")
          throw me("dirty is not a string, aborting");
      } else
        throw me("toString is not a function");
    if (!e.isSupported)
      return h;
    if (He || je(o), e.removed = [], typeof h == "string" && (ce = !1), ce) {
      if (h.nodeName) {
        const Q = S(h.nodeName);
        if (!y[Q] || ae[Q])
          throw me("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (h instanceof l)
      u = Dt("<!---->"), p = u.ownerDocument.importNode(h, !0), p.nodeType === 1 && p.nodeName === "BODY" || p.nodeName === "HTML" ? u = p : u.appendChild(p);
    else {
      if (!ne && !te && !X && // eslint-disable-next-line unicorn/prefer-includes
      h.indexOf("<") === -1)
        return A && we ? A.createHTML(h) : h;
      if (u = Dt(h), !u)
        return ne ? null : we ? Y : "";
    }
    u && We && q(u.firstChild);
    const I = Nt(ce ? h : u);
    for (; _ = I.nextNode(); )
      zt(_) || (_.content instanceof r && Mn(_.content), vt(_));
    if (ce)
      return h;
    if (ne) {
      if (_e)
        for (L = bn.call(u.ownerDocument); u.firstChild; )
          L.appendChild(u.firstChild);
      else
        L = u;
      return (R.shadowroot || R.shadowrootmode) && (L = _n.call(n, L, !0)), L;
    }
    let C = X ? u.outerHTML : u.innerHTML;
    return X && y["!doctype"] && u.ownerDocument && u.ownerDocument.doctype && u.ownerDocument.doctype.name && N(dn, u.ownerDocument.doctype.name) && (C = "<!DOCTYPE " + u.ownerDocument.doctype.name + `>
` + C), te && Le([$e, ve, Ue], (Q) => {
      C = ge(C, Q, " ");
    }), A && we ? A.createHTML(C) : C;
  }, e.setConfig = function() {
    let h = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    je(h), He = !0;
  }, e.clearConfig = function() {
    oe = null, He = !1;
  }, e.isValidAttribute = function(h, o, u) {
    oe || je({});
    const p = S(h), _ = S(o);
    return Pt(p, _, u);
  }, e.addHook = function(h, o) {
    typeof o == "function" && (F[h] = F[h] || [], he(F[h], o));
  }, e.removeHook = function(h) {
    if (F[h])
      return jt(F[h]);
  }, e.removeHooks = function(h) {
    F[h] && (F[h] = []);
  }, e.removeAllHooks = function() {
    F = {};
  }, e;
}
var Gi = kn();
const qi = ["innerHTML"], ji = /* @__PURE__ */ vn({
  __name: "VueMarkdown",
  props: {
    md: { default: null },
    silent: { type: Boolean, default: !1 },
    breaks: { type: Boolean, default: !1 },
    gfm: { type: Boolean, default: !0 },
    pedantic: { type: Boolean, default: !1 }
  },
  setup(a) {
    const e = a, t = Un(""), n = Bt(() => e.md), s = Bt(() => ({
      ...typeof e.silent == "boolean" ? { silent: e.silent } : { silent: !1 },
      ...typeof e.breaks == "boolean" ? { breaks: e.breaks } : { breaks: !1 },
      ...typeof e.gfm == "boolean" ? { gfm: e.gfm } : { gfm: !0 },
      ...typeof e.pedantic == "boolean" ? { pedantic: e.pedantic } : { pedantic: !1 }
    })), r = (i) => Gi.sanitize(i);
    return Fn(n, async (i) => {
      i && (t.value = r(await b.parse(i, { async: !0, ...s.value })));
    }), (i, l) => t.value ? (Bn(), Hn("div", {
      key: 0,
      innerHTML: t.value
    }, null, 8, qi)) : Wn("", !0);
  }
});
export {
  ji as VueMarkdown
};
//# sourceMappingURL=vue-markdown.mjs.map
