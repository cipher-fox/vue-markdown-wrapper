/**
 * vue-markdown-wrapper v2.1.3 - Vue Markdown component based on marked library
 * Copyright (c) 2025, Marc Jorge Gonzalez. (MIT Licensed)
 * https://github.com/cipher-fox/vue-markdown-wrapper
 */
import { defineComponent as $n, ref as Un, computed as Zt, watch as Bn, createElementBlock as Fn, createCommentVNode as Hn, openBlock as Gn } from "vue";
function ht() {
  return { async: !1, breaks: !1, extensions: null, gfm: !0, hooks: null, pedantic: !1, renderer: null, silent: !1, tokenizer: null, walkTokens: null };
}
var te = ht();
function an(r) {
  te = r;
}
var we = { exec: () => null };
function k(r, e = "") {
  let n = typeof r == "string" ? r : r.source, s = { replace: (t, a) => {
    let l = typeof a == "string" ? a : a.source;
    return l = l.replace(M.caret, "$1"), n = n.replace(t, l), s;
  }, getRegex: () => new RegExp(n, e) };
  return s;
}
var M = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceTabs: /^\t+/, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] /, listReplaceTask: /^\[[ xX]\] +/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (r) => new RegExp(`^( {0,3}${r})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}#`), htmlBeginRegex: (r) => new RegExp(`^ {0,${Math.min(3, r - 1)}}<(?:[a-z].*>|!--)`, "i") }, Wn = /^(?:[ \t]*(?:\n|$))+/, qn = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, Zn = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, _e = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Yn = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, ft = /(?:[*+-]|\d{1,9}[.)])/, on = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, cn = k(on).replace(/bull/g, ft).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), jn = k(on).replace(/bull/g, ft).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), gt = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, Xn = /^[^\n]+/, dt = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, Vn = k(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", dt).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), Qn = k(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, ft).getRegex(), Ue = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", mt = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, Kn = k("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", mt).replace("tag", Ue).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), un = k(gt).replace("hr", _e).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Ue).getRegex(), Jn = k(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", un).getRegex(), kt = { blockquote: Jn, code: qn, def: Vn, fences: Zn, heading: Yn, hr: _e, html: Kn, lheading: cn, list: Qn, newline: Wn, paragraph: un, table: we, text: Xn }, Yt = k("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", _e).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Ue).getRegex(), er = { ...kt, lheading: jn, table: Yt, paragraph: k(gt).replace("hr", _e).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Yt).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Ue).getRegex() }, tr = { ...kt, html: k(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", mt).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: we, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: k(gt).replace("hr", _e).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", cn).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, nr = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, rr = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, pn = /^( {2,}|\\)\n(?!\s*$)/, sr = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, Be = /[\p{P}\p{S}]/u, bt = /[\s\p{P}\p{S}]/u, hn = /[^\s\p{P}\p{S}]/u, ir = k(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, bt).getRegex(), fn = /(?!~)[\p{P}\p{S}]/u, lr = /(?!~)[\s\p{P}\p{S}]/u, ar = /(?:[^\s\p{P}\p{S}]|~)/u, or = /\[[^\[\]]*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)|`[^`]*?`|<(?! )[^<>]*?>/g, gn = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, cr = k(gn, "u").replace(/punct/g, Be).getRegex(), ur = k(gn, "u").replace(/punct/g, fn).getRegex(), dn = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", pr = k(dn, "gu").replace(/notPunctSpace/g, hn).replace(/punctSpace/g, bt).replace(/punct/g, Be).getRegex(), hr = k(dn, "gu").replace(/notPunctSpace/g, ar).replace(/punctSpace/g, lr).replace(/punct/g, fn).getRegex(), fr = k("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, hn).replace(/punctSpace/g, bt).replace(/punct/g, Be).getRegex(), gr = k(/\\(punct)/, "gu").replace(/punct/g, Be).getRegex(), dr = k(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), mr = k(mt).replace("(?:-->|$)", "-->").getRegex(), kr = k("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", mr).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), ve = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`[^`]*`|[^\[\]\\`])*?/, br = k(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", ve).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), mn = k(/^!?\[(label)\]\[(ref)\]/).replace("label", ve).replace("ref", dt).getRegex(), kn = k(/^!?\[(ref)\](?:\[\])?/).replace("ref", dt).getRegex(), xr = k("reflink|nolink(?!\\()", "g").replace("reflink", mn).replace("nolink", kn).getRegex(), xt = { _backpedal: we, anyPunctuation: gr, autolink: dr, blockSkip: or, br: pn, code: rr, del: we, emStrongLDelim: cr, emStrongRDelimAst: pr, emStrongRDelimUnd: fr, escape: nr, link: br, nolink: kn, punctuation: ir, reflink: mn, reflinkSearch: xr, tag: kr, text: sr, url: we }, Tr = { ...xt, link: k(/^!?\[(label)\]\((.*?)\)/).replace("label", ve).getRegex(), reflink: k(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", ve).getRegex() }, at = { ...xt, emStrongRDelimAst: hr, emStrongLDelim: ur, url: k(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/ }, wr = { ...at, br: k(pn).replace("{2,}", "*").getRegex(), text: k(at.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, De = { normal: kt, gfm: er, pedantic: tr }, fe = { normal: xt, gfm: at, breaks: wr, pedantic: Tr }, _r = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, jt = (r) => _r[r];
function F(r, e) {
  if (e) {
    if (M.escapeTest.test(r)) return r.replace(M.escapeReplace, jt);
  } else if (M.escapeTestNoEncode.test(r)) return r.replace(M.escapeReplaceNoEncode, jt);
  return r;
}
function Xt(r) {
  try {
    r = encodeURI(r).replace(M.percentDecode, "%");
  } catch {
    return null;
  }
  return r;
}
function Vt(r, e) {
  let n = r.replace(M.findPipe, (a, l, o) => {
    let u = !1, p = l;
    for (; --p >= 0 && o[p] === "\\"; ) u = !u;
    return u ? "|" : " |";
  }), s = n.split(M.splitPipe), t = 0;
  if (s[0].trim() || s.shift(), s.length > 0 && !s.at(-1)?.trim() && s.pop(), e) if (s.length > e) s.splice(e);
  else for (; s.length < e; ) s.push("");
  for (; t < s.length; t++) s[t] = s[t].trim().replace(M.slashPipe, "|");
  return s;
}
function ge(r, e, n) {
  let s = r.length;
  if (s === 0) return "";
  let t = 0;
  for (; t < s && r.charAt(s - t - 1) === e; )
    t++;
  return r.slice(0, s - t);
}
function Ar(r, e) {
  if (r.indexOf(e[1]) === -1) return -1;
  let n = 0;
  for (let s = 0; s < r.length; s++) if (r[s] === "\\") s++;
  else if (r[s] === e[0]) n++;
  else if (r[s] === e[1] && (n--, n < 0)) return s;
  return n > 0 ? -2 : -1;
}
function Qt(r, e, n, s, t) {
  let a = e.href, l = e.title || null, o = r[1].replace(t.other.outputLinkReplace, "$1");
  s.state.inLink = !0;
  let u = { type: r[0].charAt(0) === "!" ? "image" : "link", raw: n, href: a, title: l, text: o, tokens: s.inlineTokens(o) };
  return s.state.inLink = !1, u;
}
function Er(r, e, n) {
  let s = r.match(n.other.indentCodeCompensation);
  if (s === null) return e;
  let t = s[1];
  return e.split(`
`).map((a) => {
    let l = a.match(n.other.beginningSpace);
    if (l === null) return a;
    let [o] = l;
    return o.length >= t.length ? a.slice(t.length) : a;
  }).join(`
`);
}
var ze = class {
  options;
  rules;
  lexer;
  constructor(r) {
    this.options = r || te;
  }
  space(r) {
    let e = this.rules.block.newline.exec(r);
    if (e && e[0].length > 0) return { type: "space", raw: e[0] };
  }
  code(r) {
    let e = this.rules.block.code.exec(r);
    if (e) {
      let n = e[0].replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: e[0], codeBlockStyle: "indented", text: this.options.pedantic ? n : ge(n, `
`) };
    }
  }
  fences(r) {
    let e = this.rules.block.fences.exec(r);
    if (e) {
      let n = e[0], s = Er(n, e[3] || "", this.rules);
      return { type: "code", raw: n, lang: e[2] ? e[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : e[2], text: s };
    }
  }
  heading(r) {
    let e = this.rules.block.heading.exec(r);
    if (e) {
      let n = e[2].trim();
      if (this.rules.other.endingHash.test(n)) {
        let s = ge(n, "#");
        (this.options.pedantic || !s || this.rules.other.endingSpaceChar.test(s)) && (n = s.trim());
      }
      return { type: "heading", raw: e[0], depth: e[1].length, text: n, tokens: this.lexer.inline(n) };
    }
  }
  hr(r) {
    let e = this.rules.block.hr.exec(r);
    if (e) return { type: "hr", raw: ge(e[0], `
`) };
  }
  blockquote(r) {
    let e = this.rules.block.blockquote.exec(r);
    if (e) {
      let n = ge(e[0], `
`).split(`
`), s = "", t = "", a = [];
      for (; n.length > 0; ) {
        let l = !1, o = [], u;
        for (u = 0; u < n.length; u++) if (this.rules.other.blockquoteStart.test(n[u])) o.push(n[u]), l = !0;
        else if (!l) o.push(n[u]);
        else break;
        n = n.slice(u);
        let p = o.join(`
`), d = p.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        s = s ? `${s}
${p}` : p, t = t ? `${t}
${d}` : d;
        let x = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(d, a, !0), this.lexer.state.top = x, n.length === 0) break;
        let m = a.at(-1);
        if (m?.type === "code") break;
        if (m?.type === "blockquote") {
          let A = m, T = A.raw + `
` + n.join(`
`), v = this.blockquote(T);
          a[a.length - 1] = v, s = s.substring(0, s.length - A.raw.length) + v.raw, t = t.substring(0, t.length - A.text.length) + v.text;
          break;
        } else if (m?.type === "list") {
          let A = m, T = A.raw + `
` + n.join(`
`), v = this.list(T);
          a[a.length - 1] = v, s = s.substring(0, s.length - m.raw.length) + v.raw, t = t.substring(0, t.length - A.raw.length) + v.raw, n = T.substring(a.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return { type: "blockquote", raw: s, tokens: a, text: t };
    }
  }
  list(r) {
    let e = this.rules.block.list.exec(r);
    if (e) {
      let n = e[1].trim(), s = n.length > 1, t = { type: "list", raw: "", ordered: s, start: s ? +n.slice(0, -1) : "", loose: !1, items: [] };
      n = s ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = s ? n : "[*+-]");
      let a = this.rules.other.listItemRegex(n), l = !1;
      for (; r; ) {
        let u = !1, p = "", d = "";
        if (!(e = a.exec(r)) || this.rules.block.hr.test(r)) break;
        p = e[0], r = r.substring(p.length);
        let x = e[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (ce) => " ".repeat(3 * ce.length)), m = r.split(`
`, 1)[0], A = !x.trim(), T = 0;
        if (this.options.pedantic ? (T = 2, d = x.trimStart()) : A ? T = e[1].length + 1 : (T = e[2].search(this.rules.other.nonSpaceChar), T = T > 4 ? 1 : T, d = x.slice(T), T += e[1].length), A && this.rules.other.blankLine.test(m) && (p += m + `
`, r = r.substring(m.length + 1), u = !0), !u) {
          let ce = this.rules.other.nextBulletRegex(T), Ee = this.rules.other.hrRegex(T), j = this.rules.other.fencesBeginRegex(T), S = this.rules.other.headingBeginRegex(T), X = this.rules.other.htmlBeginRegex(T);
          for (; r; ) {
            let V = r.split(`
`, 1)[0], Q;
            if (m = V, this.options.pedantic ? (m = m.replace(this.rules.other.listReplaceNesting, "  "), Q = m) : Q = m.replace(this.rules.other.tabCharGlobal, "    "), j.test(m) || S.test(m) || X.test(m) || ce.test(m) || Ee.test(m)) break;
            if (Q.search(this.rules.other.nonSpaceChar) >= T || !m.trim()) d += `
` + Q.slice(T);
            else {
              if (A || x.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || j.test(x) || S.test(x) || Ee.test(x)) break;
              d += `
` + m;
            }
            !A && !m.trim() && (A = !0), p += V + `
`, r = r.substring(V.length + 1), x = Q.slice(T);
          }
        }
        t.loose || (l ? t.loose = !0 : this.rules.other.doubleBlankLine.test(p) && (l = !0));
        let v = null, Ae;
        this.options.gfm && (v = this.rules.other.listIsTask.exec(d), v && (Ae = v[0] !== "[ ] ", d = d.replace(this.rules.other.listReplaceTask, ""))), t.items.push({ type: "list_item", raw: p, task: !!v, checked: Ae, loose: !1, text: d, tokens: [] }), t.raw += p;
      }
      let o = t.items.at(-1);
      if (o) o.raw = o.raw.trimEnd(), o.text = o.text.trimEnd();
      else return;
      t.raw = t.raw.trimEnd();
      for (let u = 0; u < t.items.length; u++) if (this.lexer.state.top = !1, t.items[u].tokens = this.lexer.blockTokens(t.items[u].text, []), !t.loose) {
        let p = t.items[u].tokens.filter((x) => x.type === "space"), d = p.length > 0 && p.some((x) => this.rules.other.anyLine.test(x.raw));
        t.loose = d;
      }
      if (t.loose) for (let u = 0; u < t.items.length; u++) t.items[u].loose = !0;
      return t;
    }
  }
  html(r) {
    let e = this.rules.block.html.exec(r);
    if (e) return { type: "html", block: !0, raw: e[0], pre: e[1] === "pre" || e[1] === "script" || e[1] === "style", text: e[0] };
  }
  def(r) {
    let e = this.rules.block.def.exec(r);
    if (e) {
      let n = e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), s = e[2] ? e[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", t = e[3] ? e[3].substring(1, e[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : e[3];
      return { type: "def", tag: n, raw: e[0], href: s, title: t };
    }
  }
  table(r) {
    let e = this.rules.block.table.exec(r);
    if (!e || !this.rules.other.tableDelimiter.test(e[2])) return;
    let n = Vt(e[1]), s = e[2].replace(this.rules.other.tableAlignChars, "").split("|"), t = e[3]?.trim() ? e[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], a = { type: "table", raw: e[0], header: [], align: [], rows: [] };
    if (n.length === s.length) {
      for (let l of s) this.rules.other.tableAlignRight.test(l) ? a.align.push("right") : this.rules.other.tableAlignCenter.test(l) ? a.align.push("center") : this.rules.other.tableAlignLeft.test(l) ? a.align.push("left") : a.align.push(null);
      for (let l = 0; l < n.length; l++) a.header.push({ text: n[l], tokens: this.lexer.inline(n[l]), header: !0, align: a.align[l] });
      for (let l of t) a.rows.push(Vt(l, a.header.length).map((o, u) => ({ text: o, tokens: this.lexer.inline(o), header: !1, align: a.align[u] })));
      return a;
    }
  }
  lheading(r) {
    let e = this.rules.block.lheading.exec(r);
    if (e) return { type: "heading", raw: e[0], depth: e[2].charAt(0) === "=" ? 1 : 2, text: e[1], tokens: this.lexer.inline(e[1]) };
  }
  paragraph(r) {
    let e = this.rules.block.paragraph.exec(r);
    if (e) {
      let n = e[1].charAt(e[1].length - 1) === `
` ? e[1].slice(0, -1) : e[1];
      return { type: "paragraph", raw: e[0], text: n, tokens: this.lexer.inline(n) };
    }
  }
  text(r) {
    let e = this.rules.block.text.exec(r);
    if (e) return { type: "text", raw: e[0], text: e[0], tokens: this.lexer.inline(e[0]) };
  }
  escape(r) {
    let e = this.rules.inline.escape.exec(r);
    if (e) return { type: "escape", raw: e[0], text: e[1] };
  }
  tag(r) {
    let e = this.rules.inline.tag.exec(r);
    if (e) return !this.lexer.state.inLink && this.rules.other.startATag.test(e[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(e[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(e[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(e[0]) && (this.lexer.state.inRawBlock = !1), { type: "html", raw: e[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: !1, text: e[0] };
  }
  link(r) {
    let e = this.rules.inline.link.exec(r);
    if (e) {
      let n = e[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(n)) {
        if (!this.rules.other.endAngleBracket.test(n)) return;
        let a = ge(n.slice(0, -1), "\\");
        if ((n.length - a.length) % 2 === 0) return;
      } else {
        let a = Ar(e[2], "()");
        if (a === -2) return;
        if (a > -1) {
          let l = (e[0].indexOf("!") === 0 ? 5 : 4) + e[1].length + a;
          e[2] = e[2].substring(0, a), e[0] = e[0].substring(0, l).trim(), e[3] = "";
        }
      }
      let s = e[2], t = "";
      if (this.options.pedantic) {
        let a = this.rules.other.pedanticHrefTitle.exec(s);
        a && (s = a[1], t = a[3]);
      } else t = e[3] ? e[3].slice(1, -1) : "";
      return s = s.trim(), this.rules.other.startAngleBracket.test(s) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n) ? s = s.slice(1) : s = s.slice(1, -1)), Qt(e, { href: s && s.replace(this.rules.inline.anyPunctuation, "$1"), title: t && t.replace(this.rules.inline.anyPunctuation, "$1") }, e[0], this.lexer, this.rules);
    }
  }
  reflink(r, e) {
    let n;
    if ((n = this.rules.inline.reflink.exec(r)) || (n = this.rules.inline.nolink.exec(r))) {
      let s = (n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " "), t = e[s.toLowerCase()];
      if (!t) {
        let a = n[0].charAt(0);
        return { type: "text", raw: a, text: a };
      }
      return Qt(n, t, n[0], this.lexer, this.rules);
    }
  }
  emStrong(r, e, n = "") {
    let s = this.rules.inline.emStrongLDelim.exec(r);
    if (!(!s || s[3] && n.match(this.rules.other.unicodeAlphaNumeric)) && (!(s[1] || s[2]) || !n || this.rules.inline.punctuation.exec(n))) {
      let t = [...s[0]].length - 1, a, l, o = t, u = 0, p = s[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (p.lastIndex = 0, e = e.slice(-1 * r.length + t); (s = p.exec(e)) != null; ) {
        if (a = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !a) continue;
        if (l = [...a].length, s[3] || s[4]) {
          o += l;
          continue;
        } else if ((s[5] || s[6]) && t % 3 && !((t + l) % 3)) {
          u += l;
          continue;
        }
        if (o -= l, o > 0) continue;
        l = Math.min(l, l + o + u);
        let d = [...s[0]][0].length, x = r.slice(0, t + s.index + d + l);
        if (Math.min(t, l) % 2) {
          let A = x.slice(1, -1);
          return { type: "em", raw: x, text: A, tokens: this.lexer.inlineTokens(A) };
        }
        let m = x.slice(2, -2);
        return { type: "strong", raw: x, text: m, tokens: this.lexer.inlineTokens(m) };
      }
    }
  }
  codespan(r) {
    let e = this.rules.inline.code.exec(r);
    if (e) {
      let n = e[2].replace(this.rules.other.newLineCharGlobal, " "), s = this.rules.other.nonSpaceChar.test(n), t = this.rules.other.startingSpaceChar.test(n) && this.rules.other.endingSpaceChar.test(n);
      return s && t && (n = n.substring(1, n.length - 1)), { type: "codespan", raw: e[0], text: n };
    }
  }
  br(r) {
    let e = this.rules.inline.br.exec(r);
    if (e) return { type: "br", raw: e[0] };
  }
  del(r) {
    let e = this.rules.inline.del.exec(r);
    if (e) return { type: "del", raw: e[0], text: e[2], tokens: this.lexer.inlineTokens(e[2]) };
  }
  autolink(r) {
    let e = this.rules.inline.autolink.exec(r);
    if (e) {
      let n, s;
      return e[2] === "@" ? (n = e[1], s = "mailto:" + n) : (n = e[1], s = n), { type: "link", raw: e[0], text: n, href: s, tokens: [{ type: "text", raw: n, text: n }] };
    }
  }
  url(r) {
    let e;
    if (e = this.rules.inline.url.exec(r)) {
      let n, s;
      if (e[2] === "@") n = e[0], s = "mailto:" + n;
      else {
        let t;
        do
          t = e[0], e[0] = this.rules.inline._backpedal.exec(e[0])?.[0] ?? "";
        while (t !== e[0]);
        n = e[0], e[1] === "www." ? s = "http://" + e[0] : s = e[0];
      }
      return { type: "link", raw: e[0], text: n, href: s, tokens: [{ type: "text", raw: n, text: n }] };
    }
  }
  inlineText(r) {
    let e = this.rules.inline.text.exec(r);
    if (e) {
      let n = this.lexer.state.inRawBlock;
      return { type: "text", raw: e[0], text: e[0], escaped: n };
    }
  }
}, Z = class ot {
  tokens;
  options;
  state;
  tokenizer;
  inlineQueue;
  constructor(e) {
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || te, this.options.tokenizer = this.options.tokenizer || new ze(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: !1, inRawBlock: !1, top: !0 };
    let n = { other: M, block: De.normal, inline: fe.normal };
    this.options.pedantic ? (n.block = De.pedantic, n.inline = fe.pedantic) : this.options.gfm && (n.block = De.gfm, this.options.breaks ? n.inline = fe.breaks : n.inline = fe.gfm), this.tokenizer.rules = n;
  }
  static get rules() {
    return { block: De, inline: fe };
  }
  static lex(e, n) {
    return new ot(n).lex(e);
  }
  static lexInline(e, n) {
    return new ot(n).inlineTokens(e);
  }
  lex(e) {
    e = e.replace(M.carriageReturn, `
`), this.blockTokens(e, this.tokens);
    for (let n = 0; n < this.inlineQueue.length; n++) {
      let s = this.inlineQueue[n];
      this.inlineTokens(s.src, s.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, n = [], s = !1) {
    for (this.options.pedantic && (e = e.replace(M.tabCharGlobal, "    ").replace(M.spaceLine, "")); e; ) {
      let t;
      if (this.options.extensions?.block?.some((l) => (t = l.call({ lexer: this }, e, n)) ? (e = e.substring(t.raw.length), n.push(t), !0) : !1)) continue;
      if (t = this.tokenizer.space(e)) {
        e = e.substring(t.raw.length);
        let l = n.at(-1);
        t.raw.length === 1 && l !== void 0 ? l.raw += `
` : n.push(t);
        continue;
      }
      if (t = this.tokenizer.code(e)) {
        e = e.substring(t.raw.length);
        let l = n.at(-1);
        l?.type === "paragraph" || l?.type === "text" ? (l.raw += (l.raw.endsWith(`
`) ? "" : `
`) + t.raw, l.text += `
` + t.text, this.inlineQueue.at(-1).src = l.text) : n.push(t);
        continue;
      }
      if (t = this.tokenizer.fences(e)) {
        e = e.substring(t.raw.length), n.push(t);
        continue;
      }
      if (t = this.tokenizer.heading(e)) {
        e = e.substring(t.raw.length), n.push(t);
        continue;
      }
      if (t = this.tokenizer.hr(e)) {
        e = e.substring(t.raw.length), n.push(t);
        continue;
      }
      if (t = this.tokenizer.blockquote(e)) {
        e = e.substring(t.raw.length), n.push(t);
        continue;
      }
      if (t = this.tokenizer.list(e)) {
        e = e.substring(t.raw.length), n.push(t);
        continue;
      }
      if (t = this.tokenizer.html(e)) {
        e = e.substring(t.raw.length), n.push(t);
        continue;
      }
      if (t = this.tokenizer.def(e)) {
        e = e.substring(t.raw.length);
        let l = n.at(-1);
        l?.type === "paragraph" || l?.type === "text" ? (l.raw += (l.raw.endsWith(`
`) ? "" : `
`) + t.raw, l.text += `
` + t.raw, this.inlineQueue.at(-1).src = l.text) : this.tokens.links[t.tag] || (this.tokens.links[t.tag] = { href: t.href, title: t.title }, n.push(t));
        continue;
      }
      if (t = this.tokenizer.table(e)) {
        e = e.substring(t.raw.length), n.push(t);
        continue;
      }
      if (t = this.tokenizer.lheading(e)) {
        e = e.substring(t.raw.length), n.push(t);
        continue;
      }
      let a = e;
      if (this.options.extensions?.startBlock) {
        let l = 1 / 0, o = e.slice(1), u;
        this.options.extensions.startBlock.forEach((p) => {
          u = p.call({ lexer: this }, o), typeof u == "number" && u >= 0 && (l = Math.min(l, u));
        }), l < 1 / 0 && l >= 0 && (a = e.substring(0, l + 1));
      }
      if (this.state.top && (t = this.tokenizer.paragraph(a))) {
        let l = n.at(-1);
        s && l?.type === "paragraph" ? (l.raw += (l.raw.endsWith(`
`) ? "" : `
`) + t.raw, l.text += `
` + t.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = l.text) : n.push(t), s = a.length !== e.length, e = e.substring(t.raw.length);
        continue;
      }
      if (t = this.tokenizer.text(e)) {
        e = e.substring(t.raw.length);
        let l = n.at(-1);
        l?.type === "text" ? (l.raw += (l.raw.endsWith(`
`) ? "" : `
`) + t.raw, l.text += `
` + t.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = l.text) : n.push(t);
        continue;
      }
      if (e) {
        let l = "Infinite loop on byte: " + e.charCodeAt(0);
        if (this.options.silent) {
          console.error(l);
          break;
        } else throw new Error(l);
      }
    }
    return this.state.top = !0, n;
  }
  inline(e, n = []) {
    return this.inlineQueue.push({ src: e, tokens: n }), n;
  }
  inlineTokens(e, n = []) {
    let s = e, t = null;
    if (this.tokens.links) {
      let o = Object.keys(this.tokens.links);
      if (o.length > 0) for (; (t = this.tokenizer.rules.inline.reflinkSearch.exec(s)) != null; ) o.includes(t[0].slice(t[0].lastIndexOf("[") + 1, -1)) && (s = s.slice(0, t.index) + "[" + "a".repeat(t[0].length - 2) + "]" + s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (t = this.tokenizer.rules.inline.anyPunctuation.exec(s)) != null; ) s = s.slice(0, t.index) + "++" + s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    for (; (t = this.tokenizer.rules.inline.blockSkip.exec(s)) != null; ) s = s.slice(0, t.index) + "[" + "a".repeat(t[0].length - 2) + "]" + s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    s = this.options.hooks?.emStrongMask?.call({ lexer: this }, s) ?? s;
    let a = !1, l = "";
    for (; e; ) {
      a || (l = ""), a = !1;
      let o;
      if (this.options.extensions?.inline?.some((p) => (o = p.call({ lexer: this }, e, n)) ? (e = e.substring(o.raw.length), n.push(o), !0) : !1)) continue;
      if (o = this.tokenizer.escape(e)) {
        e = e.substring(o.raw.length), n.push(o);
        continue;
      }
      if (o = this.tokenizer.tag(e)) {
        e = e.substring(o.raw.length), n.push(o);
        continue;
      }
      if (o = this.tokenizer.link(e)) {
        e = e.substring(o.raw.length), n.push(o);
        continue;
      }
      if (o = this.tokenizer.reflink(e, this.tokens.links)) {
        e = e.substring(o.raw.length);
        let p = n.at(-1);
        o.type === "text" && p?.type === "text" ? (p.raw += o.raw, p.text += o.text) : n.push(o);
        continue;
      }
      if (o = this.tokenizer.emStrong(e, s, l)) {
        e = e.substring(o.raw.length), n.push(o);
        continue;
      }
      if (o = this.tokenizer.codespan(e)) {
        e = e.substring(o.raw.length), n.push(o);
        continue;
      }
      if (o = this.tokenizer.br(e)) {
        e = e.substring(o.raw.length), n.push(o);
        continue;
      }
      if (o = this.tokenizer.del(e)) {
        e = e.substring(o.raw.length), n.push(o);
        continue;
      }
      if (o = this.tokenizer.autolink(e)) {
        e = e.substring(o.raw.length), n.push(o);
        continue;
      }
      if (!this.state.inLink && (o = this.tokenizer.url(e))) {
        e = e.substring(o.raw.length), n.push(o);
        continue;
      }
      let u = e;
      if (this.options.extensions?.startInline) {
        let p = 1 / 0, d = e.slice(1), x;
        this.options.extensions.startInline.forEach((m) => {
          x = m.call({ lexer: this }, d), typeof x == "number" && x >= 0 && (p = Math.min(p, x));
        }), p < 1 / 0 && p >= 0 && (u = e.substring(0, p + 1));
      }
      if (o = this.tokenizer.inlineText(u)) {
        e = e.substring(o.raw.length), o.raw.slice(-1) !== "_" && (l = o.raw.slice(-1)), a = !0;
        let p = n.at(-1);
        p?.type === "text" ? (p.raw += o.raw, p.text += o.text) : n.push(o);
        continue;
      }
      if (e) {
        let p = "Infinite loop on byte: " + e.charCodeAt(0);
        if (this.options.silent) {
          console.error(p);
          break;
        } else throw new Error(p);
      }
    }
    return n;
  }
}, $e = class {
  options;
  parser;
  constructor(r) {
    this.options = r || te;
  }
  space(r) {
    return "";
  }
  code({ text: r, lang: e, escaped: n }) {
    let s = (e || "").match(M.notSpaceStart)?.[0], t = r.replace(M.endingNewline, "") + `
`;
    return s ? '<pre><code class="language-' + F(s) + '">' + (n ? t : F(t, !0)) + `</code></pre>
` : "<pre><code>" + (n ? t : F(t, !0)) + `</code></pre>
`;
  }
  blockquote({ tokens: r }) {
    return `<blockquote>
${this.parser.parse(r)}</blockquote>
`;
  }
  html({ text: r }) {
    return r;
  }
  def(r) {
    return "";
  }
  heading({ tokens: r, depth: e }) {
    return `<h${e}>${this.parser.parseInline(r)}</h${e}>
`;
  }
  hr(r) {
    return `<hr>
`;
  }
  list(r) {
    let e = r.ordered, n = r.start, s = "";
    for (let l = 0; l < r.items.length; l++) {
      let o = r.items[l];
      s += this.listitem(o);
    }
    let t = e ? "ol" : "ul", a = e && n !== 1 ? ' start="' + n + '"' : "";
    return "<" + t + a + `>
` + s + "</" + t + `>
`;
  }
  listitem(r) {
    let e = "";
    if (r.task) {
      let n = this.checkbox({ checked: !!r.checked });
      r.loose ? r.tokens[0]?.type === "paragraph" ? (r.tokens[0].text = n + " " + r.tokens[0].text, r.tokens[0].tokens && r.tokens[0].tokens.length > 0 && r.tokens[0].tokens[0].type === "text" && (r.tokens[0].tokens[0].text = n + " " + F(r.tokens[0].tokens[0].text), r.tokens[0].tokens[0].escaped = !0)) : r.tokens.unshift({ type: "text", raw: n + " ", text: n + " ", escaped: !0 }) : e += n + " ";
    }
    return e += this.parser.parse(r.tokens, !!r.loose), `<li>${e}</li>
`;
  }
  checkbox({ checked: r }) {
    return "<input " + (r ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph({ tokens: r }) {
    return `<p>${this.parser.parseInline(r)}</p>
`;
  }
  table(r) {
    let e = "", n = "";
    for (let t = 0; t < r.header.length; t++) n += this.tablecell(r.header[t]);
    e += this.tablerow({ text: n });
    let s = "";
    for (let t = 0; t < r.rows.length; t++) {
      let a = r.rows[t];
      n = "";
      for (let l = 0; l < a.length; l++) n += this.tablecell(a[l]);
      s += this.tablerow({ text: n });
    }
    return s && (s = `<tbody>${s}</tbody>`), `<table>
<thead>
` + e + `</thead>
` + s + `</table>
`;
  }
  tablerow({ text: r }) {
    return `<tr>
${r}</tr>
`;
  }
  tablecell(r) {
    let e = this.parser.parseInline(r.tokens), n = r.header ? "th" : "td";
    return (r.align ? `<${n} align="${r.align}">` : `<${n}>`) + e + `</${n}>
`;
  }
  strong({ tokens: r }) {
    return `<strong>${this.parser.parseInline(r)}</strong>`;
  }
  em({ tokens: r }) {
    return `<em>${this.parser.parseInline(r)}</em>`;
  }
  codespan({ text: r }) {
    return `<code>${F(r, !0)}</code>`;
  }
  br(r) {
    return "<br>";
  }
  del({ tokens: r }) {
    return `<del>${this.parser.parseInline(r)}</del>`;
  }
  link({ href: r, title: e, tokens: n }) {
    let s = this.parser.parseInline(n), t = Xt(r);
    if (t === null) return s;
    r = t;
    let a = '<a href="' + r + '"';
    return e && (a += ' title="' + F(e) + '"'), a += ">" + s + "</a>", a;
  }
  image({ href: r, title: e, text: n, tokens: s }) {
    s && (n = this.parser.parseInline(s, this.parser.textRenderer));
    let t = Xt(r);
    if (t === null) return F(n);
    r = t;
    let a = `<img src="${r}" alt="${n}"`;
    return e && (a += ` title="${F(e)}"`), a += ">", a;
  }
  text(r) {
    return "tokens" in r && r.tokens ? this.parser.parseInline(r.tokens) : "escaped" in r && r.escaped ? r.text : F(r.text);
  }
}, Tt = class {
  strong({ text: r }) {
    return r;
  }
  em({ text: r }) {
    return r;
  }
  codespan({ text: r }) {
    return r;
  }
  del({ text: r }) {
    return r;
  }
  html({ text: r }) {
    return r;
  }
  text({ text: r }) {
    return r;
  }
  link({ text: r }) {
    return "" + r;
  }
  image({ text: r }) {
    return "" + r;
  }
  br() {
    return "";
  }
}, Y = class ct {
  options;
  renderer;
  textRenderer;
  constructor(e) {
    this.options = e || te, this.options.renderer = this.options.renderer || new $e(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new Tt();
  }
  static parse(e, n) {
    return new ct(n).parse(e);
  }
  static parseInline(e, n) {
    return new ct(n).parseInline(e);
  }
  parse(e, n = !0) {
    let s = "";
    for (let t = 0; t < e.length; t++) {
      let a = e[t];
      if (this.options.extensions?.renderers?.[a.type]) {
        let o = a, u = this.options.extensions.renderers[o.type].call({ parser: this }, o);
        if (u !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "def", "paragraph", "text"].includes(o.type)) {
          s += u || "";
          continue;
        }
      }
      let l = a;
      switch (l.type) {
        case "space": {
          s += this.renderer.space(l);
          continue;
        }
        case "hr": {
          s += this.renderer.hr(l);
          continue;
        }
        case "heading": {
          s += this.renderer.heading(l);
          continue;
        }
        case "code": {
          s += this.renderer.code(l);
          continue;
        }
        case "table": {
          s += this.renderer.table(l);
          continue;
        }
        case "blockquote": {
          s += this.renderer.blockquote(l);
          continue;
        }
        case "list": {
          s += this.renderer.list(l);
          continue;
        }
        case "html": {
          s += this.renderer.html(l);
          continue;
        }
        case "def": {
          s += this.renderer.def(l);
          continue;
        }
        case "paragraph": {
          s += this.renderer.paragraph(l);
          continue;
        }
        case "text": {
          let o = l, u = this.renderer.text(o);
          for (; t + 1 < e.length && e[t + 1].type === "text"; ) o = e[++t], u += `
` + this.renderer.text(o);
          n ? s += this.renderer.paragraph({ type: "paragraph", raw: u, text: u, tokens: [{ type: "text", raw: u, text: u, escaped: !0 }] }) : s += u;
          continue;
        }
        default: {
          let o = 'Token with "' + l.type + '" type was not found.';
          if (this.options.silent) return console.error(o), "";
          throw new Error(o);
        }
      }
    }
    return s;
  }
  parseInline(e, n = this.renderer) {
    let s = "";
    for (let t = 0; t < e.length; t++) {
      let a = e[t];
      if (this.options.extensions?.renderers?.[a.type]) {
        let o = this.options.extensions.renderers[a.type].call({ parser: this }, a);
        if (o !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(a.type)) {
          s += o || "";
          continue;
        }
      }
      let l = a;
      switch (l.type) {
        case "escape": {
          s += n.text(l);
          break;
        }
        case "html": {
          s += n.html(l);
          break;
        }
        case "link": {
          s += n.link(l);
          break;
        }
        case "image": {
          s += n.image(l);
          break;
        }
        case "strong": {
          s += n.strong(l);
          break;
        }
        case "em": {
          s += n.em(l);
          break;
        }
        case "codespan": {
          s += n.codespan(l);
          break;
        }
        case "br": {
          s += n.br(l);
          break;
        }
        case "del": {
          s += n.del(l);
          break;
        }
        case "text": {
          s += n.text(l);
          break;
        }
        default: {
          let o = 'Token with "' + l.type + '" type was not found.';
          if (this.options.silent) return console.error(o), "";
          throw new Error(o);
        }
      }
    }
    return s;
  }
}, Te = class {
  options;
  block;
  constructor(r) {
    this.options = r || te;
  }
  static passThroughHooks = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"]);
  static passThroughHooksRespectAsync = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"]);
  preprocess(r) {
    return r;
  }
  postprocess(r) {
    return r;
  }
  processAllTokens(r) {
    return r;
  }
  emStrongMask(r) {
    return r;
  }
  provideLexer() {
    return this.block ? Z.lex : Z.lexInline;
  }
  provideParser() {
    return this.block ? Y.parse : Y.parseInline;
  }
}, Sr = class {
  defaults = ht();
  options = this.setOptions;
  parse = this.parseMarkdown(!0);
  parseInline = this.parseMarkdown(!1);
  Parser = Y;
  Renderer = $e;
  TextRenderer = Tt;
  Lexer = Z;
  Tokenizer = ze;
  Hooks = Te;
  constructor(...r) {
    this.use(...r);
  }
  walkTokens(r, e) {
    let n = [];
    for (let s of r) switch (n = n.concat(e.call(this, s)), s.type) {
      case "table": {
        let t = s;
        for (let a of t.header) n = n.concat(this.walkTokens(a.tokens, e));
        for (let a of t.rows) for (let l of a) n = n.concat(this.walkTokens(l.tokens, e));
        break;
      }
      case "list": {
        let t = s;
        n = n.concat(this.walkTokens(t.items, e));
        break;
      }
      default: {
        let t = s;
        this.defaults.extensions?.childTokens?.[t.type] ? this.defaults.extensions.childTokens[t.type].forEach((a) => {
          let l = t[a].flat(1 / 0);
          n = n.concat(this.walkTokens(l, e));
        }) : t.tokens && (n = n.concat(this.walkTokens(t.tokens, e)));
      }
    }
    return n;
  }
  use(...r) {
    let e = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return r.forEach((n) => {
      let s = { ...n };
      if (s.async = this.defaults.async || s.async || !1, n.extensions && (n.extensions.forEach((t) => {
        if (!t.name) throw new Error("extension name required");
        if ("renderer" in t) {
          let a = e.renderers[t.name];
          a ? e.renderers[t.name] = function(...l) {
            let o = t.renderer.apply(this, l);
            return o === !1 && (o = a.apply(this, l)), o;
          } : e.renderers[t.name] = t.renderer;
        }
        if ("tokenizer" in t) {
          if (!t.level || t.level !== "block" && t.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let a = e[t.level];
          a ? a.unshift(t.tokenizer) : e[t.level] = [t.tokenizer], t.start && (t.level === "block" ? e.startBlock ? e.startBlock.push(t.start) : e.startBlock = [t.start] : t.level === "inline" && (e.startInline ? e.startInline.push(t.start) : e.startInline = [t.start]));
        }
        "childTokens" in t && t.childTokens && (e.childTokens[t.name] = t.childTokens);
      }), s.extensions = e), n.renderer) {
        let t = this.defaults.renderer || new $e(this.defaults);
        for (let a in n.renderer) {
          if (!(a in t)) throw new Error(`renderer '${a}' does not exist`);
          if (["options", "parser"].includes(a)) continue;
          let l = a, o = n.renderer[l], u = t[l];
          t[l] = (...p) => {
            let d = o.apply(t, p);
            return d === !1 && (d = u.apply(t, p)), d || "";
          };
        }
        s.renderer = t;
      }
      if (n.tokenizer) {
        let t = this.defaults.tokenizer || new ze(this.defaults);
        for (let a in n.tokenizer) {
          if (!(a in t)) throw new Error(`tokenizer '${a}' does not exist`);
          if (["options", "rules", "lexer"].includes(a)) continue;
          let l = a, o = n.tokenizer[l], u = t[l];
          t[l] = (...p) => {
            let d = o.apply(t, p);
            return d === !1 && (d = u.apply(t, p)), d;
          };
        }
        s.tokenizer = t;
      }
      if (n.hooks) {
        let t = this.defaults.hooks || new Te();
        for (let a in n.hooks) {
          if (!(a in t)) throw new Error(`hook '${a}' does not exist`);
          if (["options", "block"].includes(a)) continue;
          let l = a, o = n.hooks[l], u = t[l];
          Te.passThroughHooks.has(a) ? t[l] = (p) => {
            if (this.defaults.async && Te.passThroughHooksRespectAsync.has(a)) return Promise.resolve(o.call(t, p)).then((x) => u.call(t, x));
            let d = o.call(t, p);
            return u.call(t, d);
          } : t[l] = (...p) => {
            let d = o.apply(t, p);
            return d === !1 && (d = u.apply(t, p)), d;
          };
        }
        s.hooks = t;
      }
      if (n.walkTokens) {
        let t = this.defaults.walkTokens, a = n.walkTokens;
        s.walkTokens = function(l) {
          let o = [];
          return o.push(a.call(this, l)), t && (o = o.concat(t.call(this, l))), o;
        };
      }
      this.defaults = { ...this.defaults, ...s };
    }), this;
  }
  setOptions(r) {
    return this.defaults = { ...this.defaults, ...r }, this;
  }
  lexer(r, e) {
    return Z.lex(r, e ?? this.defaults);
  }
  parser(r, e) {
    return Y.parse(r, e ?? this.defaults);
  }
  parseMarkdown(r) {
    return (e, n) => {
      let s = { ...n }, t = { ...this.defaults, ...s }, a = this.onError(!!t.silent, !!t.async);
      if (this.defaults.async === !0 && s.async === !1) return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof e > "u" || e === null) return a(new Error("marked(): input parameter is undefined or null"));
      if (typeof e != "string") return a(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected"));
      t.hooks && (t.hooks.options = t, t.hooks.block = r);
      let l = t.hooks ? t.hooks.provideLexer() : r ? Z.lex : Z.lexInline, o = t.hooks ? t.hooks.provideParser() : r ? Y.parse : Y.parseInline;
      if (t.async) return Promise.resolve(t.hooks ? t.hooks.preprocess(e) : e).then((u) => l(u, t)).then((u) => t.hooks ? t.hooks.processAllTokens(u) : u).then((u) => t.walkTokens ? Promise.all(this.walkTokens(u, t.walkTokens)).then(() => u) : u).then((u) => o(u, t)).then((u) => t.hooks ? t.hooks.postprocess(u) : u).catch(a);
      try {
        t.hooks && (e = t.hooks.preprocess(e));
        let u = l(e, t);
        t.hooks && (u = t.hooks.processAllTokens(u)), t.walkTokens && this.walkTokens(u, t.walkTokens);
        let p = o(u, t);
        return t.hooks && (p = t.hooks.postprocess(p)), p;
      } catch (u) {
        return a(u);
      }
    };
  }
  onError(r, e) {
    return (n) => {
      if (n.message += `
Please report this to https://github.com/markedjs/marked.`, r) {
        let s = "<p>An error occurred:</p><pre>" + F(n.message + "", !0) + "</pre>";
        return e ? Promise.resolve(s) : s;
      }
      if (e) return Promise.reject(n);
      throw n;
    };
  }
}, ee = new Sr();
function b(r, e) {
  return ee.parse(r, e);
}
b.options = b.setOptions = function(r) {
  return ee.setOptions(r), b.defaults = ee.defaults, an(b.defaults), b;
};
b.getDefaults = ht;
b.defaults = te;
b.use = function(...r) {
  return ee.use(...r), b.defaults = ee.defaults, an(b.defaults), b;
};
b.walkTokens = function(r, e) {
  return ee.walkTokens(r, e);
};
b.parseInline = ee.parseInline;
b.Parser = Y;
b.parser = Y.parse;
b.Renderer = $e;
b.TextRenderer = Tt;
b.Lexer = Z;
b.lexer = Z.lex;
b.Tokenizer = ze;
b.Hooks = Te;
b.parse = b;
b.options;
b.setOptions;
b.use;
b.walkTokens;
b.parseInline;
Y.parse;
Z.lex;
/*! @license DOMPurify 3.2.7 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.2.7/LICENSE */
const {
  entries: bn,
  setPrototypeOf: Kt,
  isFrozen: yr,
  getPrototypeOf: Rr,
  getOwnPropertyDescriptor: Lr
} = Object;
let {
  freeze: N,
  seal: $,
  create: xn
} = Object, {
  apply: ut,
  construct: pt
} = typeof Reflect < "u" && Reflect;
N || (N = function(e) {
  return e;
});
$ || ($ = function(e) {
  return e;
});
ut || (ut = function(e, n) {
  for (var s = arguments.length, t = new Array(s > 2 ? s - 2 : 0), a = 2; a < s; a++)
    t[a - 2] = arguments[a];
  return e.apply(n, t);
});
pt || (pt = function(e) {
  for (var n = arguments.length, s = new Array(n > 1 ? n - 1 : 0), t = 1; t < n; t++)
    s[t - 1] = arguments[t];
  return new e(...s);
});
const Me = P(Array.prototype.forEach), Ir = P(Array.prototype.lastIndexOf), Jt = P(Array.prototype.pop), de = P(Array.prototype.push), Or = P(Array.prototype.splice), Pe = P(String.prototype.toLowerCase), tt = P(String.prototype.toString), nt = P(String.prototype.match), me = P(String.prototype.replace), Cr = P(String.prototype.indexOf), Dr = P(String.prototype.trim), U = P(Object.prototype.hasOwnProperty), D = P(RegExp.prototype.test), ke = Mr(TypeError);
function P(r) {
  return function(e) {
    e instanceof RegExp && (e.lastIndex = 0);
    for (var n = arguments.length, s = new Array(n > 1 ? n - 1 : 0), t = 1; t < n; t++)
      s[t - 1] = arguments[t];
    return ut(r, e, s);
  };
}
function Mr(r) {
  return function() {
    for (var e = arguments.length, n = new Array(e), s = 0; s < e; s++)
      n[s] = arguments[s];
    return pt(r, n);
  };
}
function g(r, e) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Pe;
  Kt && Kt(r, null);
  let s = e.length;
  for (; s--; ) {
    let t = e[s];
    if (typeof t == "string") {
      const a = n(t);
      a !== t && (yr(e) || (e[s] = a), t = a);
    }
    r[t] = !0;
  }
  return r;
}
function Nr(r) {
  for (let e = 0; e < r.length; e++)
    U(r, e) || (r[e] = null);
  return r;
}
function q(r) {
  const e = xn(null);
  for (const [n, s] of bn(r))
    U(r, n) && (Array.isArray(s) ? e[n] = Nr(s) : s && typeof s == "object" && s.constructor === Object ? e[n] = q(s) : e[n] = s);
  return e;
}
function be(r, e) {
  for (; r !== null; ) {
    const s = Lr(r, e);
    if (s) {
      if (s.get)
        return P(s.get);
      if (typeof s.value == "function")
        return P(s.value);
    }
    r = Rr(r);
  }
  function n() {
    return null;
  }
  return n;
}
const en = N(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), rt = N(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "slot", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), st = N(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Pr = N(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), it = N(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), vr = N(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), tn = N(["#text"]), nn = N(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), lt = N(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), rn = N(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), Ne = N(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), zr = $(/\{\{[\w\W]*|[\w\W]*\}\}/gm), $r = $(/<%[\w\W]*|[\w\W]*%>/gm), Ur = $(/\$\{[\w\W]*/gm), Br = $(/^data-[\-\w.\u00B7-\uFFFF]+$/), Fr = $(/^aria-[\-\w]+$/), Tn = $(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Hr = $(/^(?:\w+script|data):/i), Gr = $(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), wn = $(/^html$/i), Wr = $(/^[a-z][.\w]*(-[.\w]+)+$/i);
var sn = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: Fr,
  ATTR_WHITESPACE: Gr,
  CUSTOM_ELEMENT: Wr,
  DATA_ATTR: Br,
  DOCTYPE_NAME: wn,
  ERB_EXPR: $r,
  IS_ALLOWED_URI: Tn,
  IS_SCRIPT_OR_DATA: Hr,
  MUSTACHE_EXPR: zr,
  TMPLIT_EXPR: Ur
});
const xe = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, qr = function() {
  return typeof window > "u" ? null : window;
}, Zr = function(e, n) {
  if (typeof e != "object" || typeof e.createPolicy != "function")
    return null;
  let s = null;
  const t = "data-tt-policy-suffix";
  n && n.hasAttribute(t) && (s = n.getAttribute(t));
  const a = "dompurify" + (s ? "#" + s : "");
  try {
    return e.createPolicy(a, {
      createHTML(l) {
        return l;
      },
      createScriptURL(l) {
        return l;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + a + " could not be created."), null;
  }
}, ln = function() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
};
function _n() {
  let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : qr();
  const e = (f) => _n(f);
  if (e.version = "3.2.7", e.removed = [], !r || !r.document || r.document.nodeType !== xe.document || !r.Element)
    return e.isSupported = !1, e;
  let {
    document: n
  } = r;
  const s = n, t = s.currentScript, {
    DocumentFragment: a,
    HTMLTemplateElement: l,
    Node: o,
    Element: u,
    NodeFilter: p,
    NamedNodeMap: d = r.NamedNodeMap || r.MozNamedAttrMap,
    HTMLFormElement: x,
    DOMParser: m,
    trustedTypes: A
  } = r, T = u.prototype, v = be(T, "cloneNode"), Ae = be(T, "remove"), ce = be(T, "nextSibling"), Ee = be(T, "childNodes"), j = be(T, "parentNode");
  if (typeof l == "function") {
    const f = n.createElement("template");
    f.content && f.content.ownerDocument && (n = f.content.ownerDocument);
  }
  let S, X = "";
  const {
    implementation: V,
    createNodeIterator: Q,
    createDocumentFragment: An,
    getElementsByTagName: En
  } = n, {
    importNode: Sn
  } = s;
  let C = ln();
  e.isSupported = typeof bn == "function" && typeof j == "function" && V && V.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: Fe,
    ERB_EXPR: He,
    TMPLIT_EXPR: Ge,
    DATA_ATTR: yn,
    ARIA_ATTR: Rn,
    IS_SCRIPT_OR_DATA: Ln,
    ATTR_WHITESPACE: wt,
    CUSTOM_ELEMENT: In
  } = sn;
  let {
    IS_ALLOWED_URI: _t
  } = sn, y = null;
  const At = g({}, [...en, ...rt, ...st, ...it, ...tn]);
  let L = null;
  const Et = g({}, [...nn, ...lt, ...rn, ...Ne]);
  let _ = Object.seal(xn(null, {
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
  })), ue = null, We = null, St = !0, qe = !0, yt = !1, Rt = !0, ne = !1, Se = !0, K = !1, Ze = !1, Ye = !1, re = !1, ye = !1, Re = !1, Lt = !0, It = !1;
  const On = "user-content-";
  let je = !0, pe = !1, se = {}, ie = null;
  const Ot = g({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let Ct = null;
  const Dt = g({}, ["audio", "video", "img", "source", "image", "track"]);
  let Xe = null;
  const Mt = g({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), Le = "http://www.w3.org/1998/Math/MathML", Ie = "http://www.w3.org/2000/svg", H = "http://www.w3.org/1999/xhtml";
  let le = H, Ve = !1, Qe = null;
  const Cn = g({}, [Le, Ie, H], tt);
  let Oe = g({}, ["mi", "mo", "mn", "ms", "mtext"]), Ce = g({}, ["annotation-xml"]);
  const Dn = g({}, ["title", "style", "font", "a", "script"]);
  let he = null;
  const Mn = ["application/xhtml+xml", "text/html"], Nn = "text/html";
  let R = null, ae = null;
  const Pn = n.createElement("form"), Nt = function(i) {
    return i instanceof RegExp || i instanceof Function;
  }, Ke = function() {
    let i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(ae && ae === i)) {
      if ((!i || typeof i != "object") && (i = {}), i = q(i), he = // eslint-disable-next-line unicorn/prefer-includes
      Mn.indexOf(i.PARSER_MEDIA_TYPE) === -1 ? Nn : i.PARSER_MEDIA_TYPE, R = he === "application/xhtml+xml" ? tt : Pe, y = U(i, "ALLOWED_TAGS") ? g({}, i.ALLOWED_TAGS, R) : At, L = U(i, "ALLOWED_ATTR") ? g({}, i.ALLOWED_ATTR, R) : Et, Qe = U(i, "ALLOWED_NAMESPACES") ? g({}, i.ALLOWED_NAMESPACES, tt) : Cn, Xe = U(i, "ADD_URI_SAFE_ATTR") ? g(q(Mt), i.ADD_URI_SAFE_ATTR, R) : Mt, Ct = U(i, "ADD_DATA_URI_TAGS") ? g(q(Dt), i.ADD_DATA_URI_TAGS, R) : Dt, ie = U(i, "FORBID_CONTENTS") ? g({}, i.FORBID_CONTENTS, R) : Ot, ue = U(i, "FORBID_TAGS") ? g({}, i.FORBID_TAGS, R) : q({}), We = U(i, "FORBID_ATTR") ? g({}, i.FORBID_ATTR, R) : q({}), se = U(i, "USE_PROFILES") ? i.USE_PROFILES : !1, St = i.ALLOW_ARIA_ATTR !== !1, qe = i.ALLOW_DATA_ATTR !== !1, yt = i.ALLOW_UNKNOWN_PROTOCOLS || !1, Rt = i.ALLOW_SELF_CLOSE_IN_ATTR !== !1, ne = i.SAFE_FOR_TEMPLATES || !1, Se = i.SAFE_FOR_XML !== !1, K = i.WHOLE_DOCUMENT || !1, re = i.RETURN_DOM || !1, ye = i.RETURN_DOM_FRAGMENT || !1, Re = i.RETURN_TRUSTED_TYPE || !1, Ye = i.FORCE_BODY || !1, Lt = i.SANITIZE_DOM !== !1, It = i.SANITIZE_NAMED_PROPS || !1, je = i.KEEP_CONTENT !== !1, pe = i.IN_PLACE || !1, _t = i.ALLOWED_URI_REGEXP || Tn, le = i.NAMESPACE || H, Oe = i.MATHML_TEXT_INTEGRATION_POINTS || Oe, Ce = i.HTML_INTEGRATION_POINTS || Ce, _ = i.CUSTOM_ELEMENT_HANDLING || {}, i.CUSTOM_ELEMENT_HANDLING && Nt(i.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (_.tagNameCheck = i.CUSTOM_ELEMENT_HANDLING.tagNameCheck), i.CUSTOM_ELEMENT_HANDLING && Nt(i.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (_.attributeNameCheck = i.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), i.CUSTOM_ELEMENT_HANDLING && typeof i.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (_.allowCustomizedBuiltInElements = i.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), ne && (qe = !1), ye && (re = !0), se && (y = g({}, tn), L = [], se.html === !0 && (g(y, en), g(L, nn)), se.svg === !0 && (g(y, rt), g(L, lt), g(L, Ne)), se.svgFilters === !0 && (g(y, st), g(L, lt), g(L, Ne)), se.mathMl === !0 && (g(y, it), g(L, rn), g(L, Ne))), i.ADD_TAGS && (y === At && (y = q(y)), g(y, i.ADD_TAGS, R)), i.ADD_ATTR && (L === Et && (L = q(L)), g(L, i.ADD_ATTR, R)), i.ADD_URI_SAFE_ATTR && g(Xe, i.ADD_URI_SAFE_ATTR, R), i.FORBID_CONTENTS && (ie === Ot && (ie = q(ie)), g(ie, i.FORBID_CONTENTS, R)), je && (y["#text"] = !0), K && g(y, ["html", "head", "body"]), y.table && (g(y, ["tbody"]), delete ue.tbody), i.TRUSTED_TYPES_POLICY) {
        if (typeof i.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw ke('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof i.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw ke('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        S = i.TRUSTED_TYPES_POLICY, X = S.createHTML("");
      } else
        S === void 0 && (S = Zr(A, t)), S !== null && typeof X == "string" && (X = S.createHTML(""));
      N && N(i), ae = i;
    }
  }, Pt = g({}, [...rt, ...st, ...Pr]), vt = g({}, [...it, ...vr]), vn = function(i) {
    let c = j(i);
    (!c || !c.tagName) && (c = {
      namespaceURI: le,
      tagName: "template"
    });
    const h = Pe(i.tagName), w = Pe(c.tagName);
    return Qe[i.namespaceURI] ? i.namespaceURI === Ie ? c.namespaceURI === H ? h === "svg" : c.namespaceURI === Le ? h === "svg" && (w === "annotation-xml" || Oe[w]) : !!Pt[h] : i.namespaceURI === Le ? c.namespaceURI === H ? h === "math" : c.namespaceURI === Ie ? h === "math" && Ce[w] : !!vt[h] : i.namespaceURI === H ? c.namespaceURI === Ie && !Ce[w] || c.namespaceURI === Le && !Oe[w] ? !1 : !vt[h] && (Dn[h] || !Pt[h]) : !!(he === "application/xhtml+xml" && Qe[i.namespaceURI]) : !1;
  }, B = function(i) {
    de(e.removed, {
      element: i
    });
    try {
      j(i).removeChild(i);
    } catch {
      Ae(i);
    }
  }, J = function(i, c) {
    try {
      de(e.removed, {
        attribute: c.getAttributeNode(i),
        from: c
      });
    } catch {
      de(e.removed, {
        attribute: null,
        from: c
      });
    }
    if (c.removeAttribute(i), i === "is")
      if (re || ye)
        try {
          B(c);
        } catch {
        }
      else
        try {
          c.setAttribute(i, "");
        } catch {
        }
  }, zt = function(i) {
    let c = null, h = null;
    if (Ye)
      i = "<remove></remove>" + i;
    else {
      const E = nt(i, /^[\r\n\t ]+/);
      h = E && E[0];
    }
    he === "application/xhtml+xml" && le === H && (i = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + i + "</body></html>");
    const w = S ? S.createHTML(i) : i;
    if (le === H)
      try {
        c = new m().parseFromString(w, he);
      } catch {
      }
    if (!c || !c.documentElement) {
      c = V.createDocument(le, "template", null);
      try {
        c.documentElement.innerHTML = Ve ? X : w;
      } catch {
      }
    }
    const O = c.body || c.documentElement;
    return i && h && O.insertBefore(n.createTextNode(h), O.childNodes[0] || null), le === H ? En.call(c, K ? "html" : "body")[0] : K ? c.documentElement : O;
  }, $t = function(i) {
    return Q.call(
      i.ownerDocument || i,
      i,
      // eslint-disable-next-line no-bitwise
      p.SHOW_ELEMENT | p.SHOW_COMMENT | p.SHOW_TEXT | p.SHOW_PROCESSING_INSTRUCTION | p.SHOW_CDATA_SECTION,
      null
    );
  }, Je = function(i) {
    return i instanceof x && (typeof i.nodeName != "string" || typeof i.textContent != "string" || typeof i.removeChild != "function" || !(i.attributes instanceof d) || typeof i.removeAttribute != "function" || typeof i.setAttribute != "function" || typeof i.namespaceURI != "string" || typeof i.insertBefore != "function" || typeof i.hasChildNodes != "function");
  }, Ut = function(i) {
    return typeof o == "function" && i instanceof o;
  };
  function G(f, i, c) {
    Me(f, (h) => {
      h.call(e, i, c, ae);
    });
  }
  const Bt = function(i) {
    let c = null;
    if (G(C.beforeSanitizeElements, i, null), Je(i))
      return B(i), !0;
    const h = R(i.nodeName);
    if (G(C.uponSanitizeElement, i, {
      tagName: h,
      allowedTags: y
    }), Se && i.hasChildNodes() && !Ut(i.firstElementChild) && D(/<[/\w!]/g, i.innerHTML) && D(/<[/\w!]/g, i.textContent) || i.nodeType === xe.progressingInstruction || Se && i.nodeType === xe.comment && D(/<[/\w]/g, i.data))
      return B(i), !0;
    if (!y[h] || ue[h]) {
      if (!ue[h] && Ht(h) && (_.tagNameCheck instanceof RegExp && D(_.tagNameCheck, h) || _.tagNameCheck instanceof Function && _.tagNameCheck(h)))
        return !1;
      if (je && !ie[h]) {
        const w = j(i) || i.parentNode, O = Ee(i) || i.childNodes;
        if (O && w) {
          const E = O.length;
          for (let z = E - 1; z >= 0; --z) {
            const W = v(O[z], !0);
            W.__removalCount = (i.__removalCount || 0) + 1, w.insertBefore(W, ce(i));
          }
        }
      }
      return B(i), !0;
    }
    return i instanceof u && !vn(i) || (h === "noscript" || h === "noembed" || h === "noframes") && D(/<\/no(script|embed|frames)/i, i.innerHTML) ? (B(i), !0) : (ne && i.nodeType === xe.text && (c = i.textContent, Me([Fe, He, Ge], (w) => {
      c = me(c, w, " ");
    }), i.textContent !== c && (de(e.removed, {
      element: i.cloneNode()
    }), i.textContent = c)), G(C.afterSanitizeElements, i, null), !1);
  }, Ft = function(i, c, h) {
    if (Lt && (c === "id" || c === "name") && (h in n || h in Pn))
      return !1;
    if (!(qe && !We[c] && D(yn, c))) {
      if (!(St && D(Rn, c))) {
        if (!L[c] || We[c]) {
          if (
            // First condition does a very basic check if a) it's basically a valid custom element tagname AND
            // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
            !(Ht(i) && (_.tagNameCheck instanceof RegExp && D(_.tagNameCheck, i) || _.tagNameCheck instanceof Function && _.tagNameCheck(i)) && (_.attributeNameCheck instanceof RegExp && D(_.attributeNameCheck, c) || _.attributeNameCheck instanceof Function && _.attributeNameCheck(c, i)) || // Alternative, second condition checks if it's an `is`-attribute, AND
            // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            c === "is" && _.allowCustomizedBuiltInElements && (_.tagNameCheck instanceof RegExp && D(_.tagNameCheck, h) || _.tagNameCheck instanceof Function && _.tagNameCheck(h)))
          ) return !1;
        } else if (!Xe[c]) {
          if (!D(_t, me(h, wt, ""))) {
            if (!((c === "src" || c === "xlink:href" || c === "href") && i !== "script" && Cr(h, "data:") === 0 && Ct[i])) {
              if (!(yt && !D(Ln, me(h, wt, "")))) {
                if (h)
                  return !1;
              }
            }
          }
        }
      }
    }
    return !0;
  }, Ht = function(i) {
    return i !== "annotation-xml" && nt(i, In);
  }, Gt = function(i) {
    G(C.beforeSanitizeAttributes, i, null);
    const {
      attributes: c
    } = i;
    if (!c || Je(i))
      return;
    const h = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: L,
      forceKeepAttr: void 0
    };
    let w = c.length;
    for (; w--; ) {
      const O = c[w], {
        name: E,
        namespaceURI: z,
        value: W
      } = O, oe = R(E), et = W;
      let I = E === "value" ? et : Dr(et);
      if (h.attrName = oe, h.attrValue = I, h.keepAttr = !0, h.forceKeepAttr = void 0, G(C.uponSanitizeAttribute, i, h), I = h.attrValue, It && (oe === "id" || oe === "name") && (J(E, i), I = On + I), Se && D(/((--!?|])>)|<\/(style|title|textarea)/i, I)) {
        J(E, i);
        continue;
      }
      if (oe === "attributename" && nt(I, "href")) {
        J(E, i);
        continue;
      }
      if (h.forceKeepAttr)
        continue;
      if (!h.keepAttr) {
        J(E, i);
        continue;
      }
      if (!Rt && D(/\/>/i, I)) {
        J(E, i);
        continue;
      }
      ne && Me([Fe, He, Ge], (qt) => {
        I = me(I, qt, " ");
      });
      const Wt = R(i.nodeName);
      if (!Ft(Wt, oe, I)) {
        J(E, i);
        continue;
      }
      if (S && typeof A == "object" && typeof A.getAttributeType == "function" && !z)
        switch (A.getAttributeType(Wt, oe)) {
          case "TrustedHTML": {
            I = S.createHTML(I);
            break;
          }
          case "TrustedScriptURL": {
            I = S.createScriptURL(I);
            break;
          }
        }
      if (I !== et)
        try {
          z ? i.setAttributeNS(z, E, I) : i.setAttribute(E, I), Je(i) ? B(i) : Jt(e.removed);
        } catch {
          J(E, i);
        }
    }
    G(C.afterSanitizeAttributes, i, null);
  }, zn = function f(i) {
    let c = null;
    const h = $t(i);
    for (G(C.beforeSanitizeShadowDOM, i, null); c = h.nextNode(); )
      G(C.uponSanitizeShadowNode, c, null), Bt(c), Gt(c), c.content instanceof a && f(c.content);
    G(C.afterSanitizeShadowDOM, i, null);
  };
  return e.sanitize = function(f) {
    let i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, c = null, h = null, w = null, O = null;
    if (Ve = !f, Ve && (f = "<!-->"), typeof f != "string" && !Ut(f))
      if (typeof f.toString == "function") {
        if (f = f.toString(), typeof f != "string")
          throw ke("dirty is not a string, aborting");
      } else
        throw ke("toString is not a function");
    if (!e.isSupported)
      return f;
    if (Ze || Ke(i), e.removed = [], typeof f == "string" && (pe = !1), pe) {
      if (f.nodeName) {
        const W = R(f.nodeName);
        if (!y[W] || ue[W])
          throw ke("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (f instanceof o)
      c = zt("<!---->"), h = c.ownerDocument.importNode(f, !0), h.nodeType === xe.element && h.nodeName === "BODY" || h.nodeName === "HTML" ? c = h : c.appendChild(h);
    else {
      if (!re && !ne && !K && // eslint-disable-next-line unicorn/prefer-includes
      f.indexOf("<") === -1)
        return S && Re ? S.createHTML(f) : f;
      if (c = zt(f), !c)
        return re ? null : Re ? X : "";
    }
    c && Ye && B(c.firstChild);
    const E = $t(pe ? f : c);
    for (; w = E.nextNode(); )
      Bt(w), Gt(w), w.content instanceof a && zn(w.content);
    if (pe)
      return f;
    if (re) {
      if (ye)
        for (O = An.call(c.ownerDocument); c.firstChild; )
          O.appendChild(c.firstChild);
      else
        O = c;
      return (L.shadowroot || L.shadowrootmode) && (O = Sn.call(s, O, !0)), O;
    }
    let z = K ? c.outerHTML : c.innerHTML;
    return K && y["!doctype"] && c.ownerDocument && c.ownerDocument.doctype && c.ownerDocument.doctype.name && D(wn, c.ownerDocument.doctype.name) && (z = "<!DOCTYPE " + c.ownerDocument.doctype.name + `>
` + z), ne && Me([Fe, He, Ge], (W) => {
      z = me(z, W, " ");
    }), S && Re ? S.createHTML(z) : z;
  }, e.setConfig = function() {
    let f = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    Ke(f), Ze = !0;
  }, e.clearConfig = function() {
    ae = null, Ze = !1;
  }, e.isValidAttribute = function(f, i, c) {
    ae || Ke({});
    const h = R(f), w = R(i);
    return Ft(h, w, c);
  }, e.addHook = function(f, i) {
    typeof i == "function" && de(C[f], i);
  }, e.removeHook = function(f, i) {
    if (i !== void 0) {
      const c = Ir(C[f], i);
      return c === -1 ? void 0 : Or(C[f], c, 1)[0];
    }
    return Jt(C[f]);
  }, e.removeHooks = function(f) {
    C[f] = [];
  }, e.removeAllHooks = function() {
    C = ln();
  }, e;
}
var Yr = _n();
const jr = ["innerHTML"], Vr = /* @__PURE__ */ $n({
  __name: "VueMarkdown",
  props: {
    md: { default: null },
    silent: { type: Boolean, default: !1 },
    breaks: { type: Boolean, default: !1 },
    gfm: { type: Boolean, default: !0 },
    pedantic: { type: Boolean, default: !1 }
  },
  setup(r) {
    const e = r, n = Un(""), s = Zt(() => e.md), t = Zt(() => ({
      ...typeof e.silent == "boolean" ? { silent: e.silent } : { silent: !1 },
      ...typeof e.breaks == "boolean" ? { breaks: e.breaks } : { breaks: !1 },
      ...typeof e.gfm == "boolean" ? { gfm: e.gfm } : { gfm: !0 },
      ...typeof e.pedantic == "boolean" ? { pedantic: e.pedantic } : { pedantic: !1 }
    })), a = (l) => Yr.sanitize(l);
    return Bn(s, async (l) => {
      l && (n.value = a(await b.parse(l, { async: !0, ...t.value })));
    }), (l, o) => n.value ? (Gn(), Fn("div", {
      key: 0,
      innerHTML: n.value
    }, null, 8, jr)) : Hn("", !0);
  }
});
export {
  Vr as VueMarkdown
};
//# sourceMappingURL=vue-markdown.mjs.map
