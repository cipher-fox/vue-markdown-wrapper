/**
 * vue-markdown-wrapper v2.1.1 - Vue Markdown component based on marked library
 * Copyright (c) 2025, Marc Jorge Gonzalez. (MIT Licensed)
 * https://github.com/mjorgegulab/vue-markdown-wrapper
 */
var Bn = Object.defineProperty;
var Fn = (n, e, t) => e in n ? Bn(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var w = (n, e, t) => Fn(n, typeof e != "symbol" ? e + "" : e, t);
import { defineComponent as Hn, ref as Gn, computed as jt, watch as Wn, createElementBlock as qn, createCommentVNode as Zn, openBlock as jn } from "vue";
function ft() {
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
var te = ft();
function cn(n) {
  te = n;
}
var we = { exec: () => null };
function b(n, e = "") {
  let t = typeof n == "string" ? n : n.source;
  const r = {
    replace: (s, a) => {
      let u = typeof a == "string" ? a : a.source;
      return u = u.replace(N.caret, "$1"), t = t.replace(s, u), r;
    },
    getRegex: () => new RegExp(t, e)
  };
  return r;
}
var N = {
  codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
  outputLinkReplace: /\\([\[\]])/g,
  indentCodeCompensation: /^(\s+)(?:```)/,
  beginningSpace: /^\s+/,
  endingHash: /#$/,
  startingSpaceChar: /^ /,
  endingSpaceChar: / $/,
  nonSpaceChar: /[^ ]/,
  newLineCharGlobal: /\n/g,
  tabCharGlobal: /\t/g,
  multipleSpaceGlobal: /\s+/g,
  blankLine: /^[ \t]*$/,
  doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
  blockquoteStart: /^ {0,3}>/,
  blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
  blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
  listReplaceTabs: /^\t+/,
  listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
  listIsTask: /^\[[ xX]\] /,
  listReplaceTask: /^\[[ xX]\] +/,
  anyLine: /\n.*\n/,
  hrefBrackets: /^<(.*)>$/,
  tableDelimiter: /[:|]/,
  tableAlignChars: /^\||\| *$/g,
  tableRowBlankLine: /\n[ \t]*$/,
  tableAlignRight: /^ *-+: *$/,
  tableAlignCenter: /^ *:-+: *$/,
  tableAlignLeft: /^ *:-+ *$/,
  startATag: /^<a /i,
  endATag: /^<\/a>/i,
  startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
  endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
  startAngleBracket: /^</,
  endAngleBracket: />$/,
  pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
  unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
  escapeTest: /[&<>"']/,
  escapeReplace: /[&<>"']/g,
  escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
  escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
  unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,
  caret: /(^|[^\[])\^/g,
  percentDecode: /%25/g,
  findPipe: /\|/g,
  splitPipe: / \|/,
  slashPipe: /\\\|/g,
  carriageReturn: /\r\n|\r/g,
  spaceLine: /^ +$/gm,
  notSpaceStart: /^\S*/,
  endingNewline: /\n$/,
  listItemRegex: (n) => new RegExp(`^( {0,3}${n})((?:[	 ][^\\n]*)?(?:\\n|$))`),
  nextBulletRegex: (n) => new RegExp(`^ {0,${Math.min(3, n - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),
  hrRegex: (n) => new RegExp(`^ {0,${Math.min(3, n - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
  fencesBeginRegex: (n) => new RegExp(`^ {0,${Math.min(3, n - 1)}}(?:\`\`\`|~~~)`),
  headingBeginRegex: (n) => new RegExp(`^ {0,${Math.min(3, n - 1)}}#`),
  htmlBeginRegex: (n) => new RegExp(`^ {0,${Math.min(3, n - 1)}}<(?:[a-z].*>|!--)`, "i")
}, Yn = /^(?:[ \t]*(?:\n|$))+/, Xn = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, Vn = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, _e = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Qn = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, gt = /(?:[*+-]|\d{1,9}[.)])/, un = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, pn = b(un).replace(/bull/g, gt).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), Kn = b(un).replace(/bull/g, gt).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), dt = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, Jn = /^[^\n]+/, mt = /(?!\s*\])(?:\\.|[^\[\]\\])+/, er = b(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", mt).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), tr = b(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, gt).getRegex(), Be = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", kt = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, nr = b(
  "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))",
  "i"
).replace("comment", kt).replace("tag", Be).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), hn = b(dt).replace("hr", _e).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Be).getRegex(), rr = b(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", hn).getRegex(), bt = {
  blockquote: rr,
  code: Xn,
  def: er,
  fences: Vn,
  heading: Qn,
  hr: _e,
  html: nr,
  lheading: pn,
  list: tr,
  newline: Yn,
  paragraph: hn,
  table: we,
  text: Jn
}, Yt = b(
  "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
).replace("hr", _e).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Be).getRegex(), ir = {
  ...bt,
  lheading: Kn,
  table: Yt,
  paragraph: b(dt).replace("hr", _e).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Yt).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Be).getRegex()
}, sr = {
  ...bt,
  html: b(
    `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
  ).replace("comment", kt).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: we,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: b(dt).replace("hr", _e).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", pn).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, ar = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, or = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, fn = /^( {2,}|\\)\n(?!\s*$)/, lr = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, Fe = /[\p{P}\p{S}]/u, xt = /[\s\p{P}\p{S}]/u, gn = /[^\s\p{P}\p{S}]/u, cr = b(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, xt).getRegex(), dn = /(?!~)[\p{P}\p{S}]/u, ur = /(?!~)[\s\p{P}\p{S}]/u, pr = /(?:[^\s\p{P}\p{S}]|~)/u, hr = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g, mn = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, fr = b(mn, "u").replace(/punct/g, Fe).getRegex(), gr = b(mn, "u").replace(/punct/g, dn).getRegex(), kn = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", dr = b(kn, "gu").replace(/notPunctSpace/g, gn).replace(/punctSpace/g, xt).replace(/punct/g, Fe).getRegex(), mr = b(kn, "gu").replace(/notPunctSpace/g, pr).replace(/punctSpace/g, ur).replace(/punct/g, dn).getRegex(), kr = b(
  "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)",
  "gu"
).replace(/notPunctSpace/g, gn).replace(/punctSpace/g, xt).replace(/punct/g, Fe).getRegex(), br = b(/\\(punct)/, "gu").replace(/punct/g, Fe).getRegex(), xr = b(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), Tr = b(kt).replace("(?:-->|$)", "-->").getRegex(), wr = b(
  "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>"
).replace("comment", Tr).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), ze = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, _r = b(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", ze).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), bn = b(/^!?\[(label)\]\[(ref)\]/).replace("label", ze).replace("ref", mt).getRegex(), xn = b(/^!?\[(ref)\](?:\[\])?/).replace("ref", mt).getRegex(), Ar = b("reflink|nolink(?!\\()", "g").replace("reflink", bn).replace("nolink", xn).getRegex(), Tt = {
  _backpedal: we,
  // only used for GFM url
  anyPunctuation: br,
  autolink: xr,
  blockSkip: hr,
  br: fn,
  code: or,
  del: we,
  emStrongLDelim: fr,
  emStrongRDelimAst: dr,
  emStrongRDelimUnd: kr,
  escape: ar,
  link: _r,
  nolink: xn,
  punctuation: cr,
  reflink: bn,
  reflinkSearch: Ar,
  tag: wr,
  text: lr,
  url: we
}, Er = {
  ...Tt,
  link: b(/^!?\[(label)\]\((.*?)\)/).replace("label", ze).getRegex(),
  reflink: b(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", ze).getRegex()
}, lt = {
  ...Tt,
  emStrongRDelimAst: mr,
  emStrongLDelim: gr,
  url: b(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
}, Sr = {
  ...lt,
  br: b(fn).replace("{2,}", "*").getRegex(),
  text: b(lt.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, Oe = {
  normal: bt,
  gfm: ir,
  pedantic: sr
}, ge = {
  normal: Tt,
  gfm: lt,
  breaks: Sr,
  pedantic: Er
}, yr = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, Xt = (n) => yr[n];
function H(n, e) {
  if (e) {
    if (N.escapeTest.test(n))
      return n.replace(N.escapeReplace, Xt);
  } else if (N.escapeTestNoEncode.test(n))
    return n.replace(N.escapeReplaceNoEncode, Xt);
  return n;
}
function Vt(n) {
  try {
    n = encodeURI(n).replace(N.percentDecode, "%");
  } catch {
    return null;
  }
  return n;
}
function Qt(n, e) {
  var a;
  const t = n.replace(N.findPipe, (u, o, h) => {
    let l = !1, c = o;
    for (; --c >= 0 && h[c] === "\\"; ) l = !l;
    return l ? "|" : " |";
  }), r = t.split(N.splitPipe);
  let s = 0;
  if (r[0].trim() || r.shift(), r.length > 0 && !((a = r.at(-1)) != null && a.trim()) && r.pop(), e)
    if (r.length > e)
      r.splice(e);
    else
      for (; r.length < e; ) r.push("");
  for (; s < r.length; s++)
    r[s] = r[s].trim().replace(N.slashPipe, "|");
  return r;
}
function de(n, e, t) {
  const r = n.length;
  if (r === 0)
    return "";
  let s = 0;
  for (; s < r && n.charAt(r - s - 1) === e; )
    s++;
  return n.slice(0, r - s);
}
function Rr(n, e) {
  if (n.indexOf(e[1]) === -1)
    return -1;
  let t = 0;
  for (let r = 0; r < n.length; r++)
    if (n[r] === "\\")
      r++;
    else if (n[r] === e[0])
      t++;
    else if (n[r] === e[1] && (t--, t < 0))
      return r;
  return t > 0 ? -2 : -1;
}
function Kt(n, e, t, r, s) {
  const a = e.href, u = e.title || null, o = n[1].replace(s.other.outputLinkReplace, "$1");
  r.state.inLink = !0;
  const h = {
    type: n[0].charAt(0) === "!" ? "image" : "link",
    raw: t,
    href: a,
    title: u,
    text: o,
    tokens: r.inlineTokens(o)
  };
  return r.state.inLink = !1, h;
}
function Lr(n, e, t) {
  const r = n.match(t.other.indentCodeCompensation);
  if (r === null)
    return e;
  const s = r[1];
  return e.split(`
`).map((a) => {
    const u = a.match(t.other.beginningSpace);
    if (u === null)
      return a;
    const [o] = u;
    return o.length >= s.length ? a.slice(s.length) : a;
  }).join(`
`);
}
var $e = class {
  // set by the lexer
  constructor(n) {
    w(this, "options");
    w(this, "rules");
    // set by the lexer
    w(this, "lexer");
    this.options = n || te;
  }
  space(n) {
    const e = this.rules.block.newline.exec(n);
    if (e && e[0].length > 0)
      return {
        type: "space",
        raw: e[0]
      };
  }
  code(n) {
    const e = this.rules.block.code.exec(n);
    if (e) {
      const t = e[0].replace(this.rules.other.codeRemoveIndent, "");
      return {
        type: "code",
        raw: e[0],
        codeBlockStyle: "indented",
        text: this.options.pedantic ? t : de(t, `
`)
      };
    }
  }
  fences(n) {
    const e = this.rules.block.fences.exec(n);
    if (e) {
      const t = e[0], r = Lr(t, e[3] || "", this.rules);
      return {
        type: "code",
        raw: t,
        lang: e[2] ? e[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : e[2],
        text: r
      };
    }
  }
  heading(n) {
    const e = this.rules.block.heading.exec(n);
    if (e) {
      let t = e[2].trim();
      if (this.rules.other.endingHash.test(t)) {
        const r = de(t, "#");
        (this.options.pedantic || !r || this.rules.other.endingSpaceChar.test(r)) && (t = r.trim());
      }
      return {
        type: "heading",
        raw: e[0],
        depth: e[1].length,
        text: t,
        tokens: this.lexer.inline(t)
      };
    }
  }
  hr(n) {
    const e = this.rules.block.hr.exec(n);
    if (e)
      return {
        type: "hr",
        raw: de(e[0], `
`)
      };
  }
  blockquote(n) {
    const e = this.rules.block.blockquote.exec(n);
    if (e) {
      let t = de(e[0], `
`).split(`
`), r = "", s = "";
      const a = [];
      for (; t.length > 0; ) {
        let u = !1;
        const o = [];
        let h;
        for (h = 0; h < t.length; h++)
          if (this.rules.other.blockquoteStart.test(t[h]))
            o.push(t[h]), u = !0;
          else if (!u)
            o.push(t[h]);
          else
            break;
        t = t.slice(h);
        const l = o.join(`
`), c = l.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        r = r ? `${r}
${l}` : l, s = s ? `${s}
${c}` : c;
        const T = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(c, a, !0), this.lexer.state.top = T, t.length === 0)
          break;
        const f = a.at(-1);
        if ((f == null ? void 0 : f.type) === "code")
          break;
        if ((f == null ? void 0 : f.type) === "blockquote") {
          const A = f, k = A.raw + `
` + t.join(`
`), I = this.blockquote(k);
          a[a.length - 1] = I, r = r.substring(0, r.length - A.raw.length) + I.raw, s = s.substring(0, s.length - A.text.length) + I.text;
          break;
        } else if ((f == null ? void 0 : f.type) === "list") {
          const A = f, k = A.raw + `
` + t.join(`
`), I = this.list(k);
          a[a.length - 1] = I, r = r.substring(0, r.length - f.raw.length) + I.raw, s = s.substring(0, s.length - A.raw.length) + I.raw, t = k.substring(a.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return {
        type: "blockquote",
        raw: r,
        tokens: a,
        text: s
      };
    }
  }
  list(n) {
    let e = this.rules.block.list.exec(n);
    if (e) {
      let t = e[1].trim();
      const r = t.length > 1, s = {
        type: "list",
        raw: "",
        ordered: r,
        start: r ? +t.slice(0, -1) : "",
        loose: !1,
        items: []
      };
      t = r ? `\\d{1,9}\\${t.slice(-1)}` : `\\${t}`, this.options.pedantic && (t = r ? t : "[*+-]");
      const a = this.rules.other.listItemRegex(t);
      let u = !1;
      for (; n; ) {
        let h = !1, l = "", c = "";
        if (!(e = a.exec(n)) || this.rules.block.hr.test(n))
          break;
        l = e[0], n = n.substring(l.length);
        let T = e[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (ce) => " ".repeat(3 * ce.length)), f = n.split(`
`, 1)[0], A = !T.trim(), k = 0;
        if (this.options.pedantic ? (k = 2, c = T.trimStart()) : A ? k = e[1].length + 1 : (k = e[2].search(this.rules.other.nonSpaceChar), k = k > 4 ? 1 : k, c = T.slice(k), k += e[1].length), A && this.rules.other.blankLine.test(f) && (l += f + `
`, n = n.substring(f.length + 1), h = !0), !h) {
          const ce = this.rules.other.nextBulletRegex(k), Ee = this.rules.other.hrRegex(k), X = this.rules.other.fencesBeginRegex(k), y = this.rules.other.headingBeginRegex(k), V = this.rules.other.htmlBeginRegex(k);
          for (; n; ) {
            const Q = n.split(`
`, 1)[0];
            let K;
            if (f = Q, this.options.pedantic ? (f = f.replace(this.rules.other.listReplaceNesting, "  "), K = f) : K = f.replace(this.rules.other.tabCharGlobal, "    "), X.test(f) || y.test(f) || V.test(f) || ce.test(f) || Ee.test(f))
              break;
            if (K.search(this.rules.other.nonSpaceChar) >= k || !f.trim())
              c += `
` + K.slice(k);
            else {
              if (A || T.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || X.test(T) || y.test(T) || Ee.test(T))
                break;
              c += `
` + f;
            }
            !A && !f.trim() && (A = !0), l += Q + `
`, n = n.substring(Q.length + 1), T = K.slice(k);
          }
        }
        s.loose || (u ? s.loose = !0 : this.rules.other.doubleBlankLine.test(l) && (u = !0));
        let I = null, Ae;
        this.options.gfm && (I = this.rules.other.listIsTask.exec(c), I && (Ae = I[0] !== "[ ] ", c = c.replace(this.rules.other.listReplaceTask, ""))), s.items.push({
          type: "list_item",
          raw: l,
          task: !!I,
          checked: Ae,
          loose: !1,
          text: c,
          tokens: []
        }), s.raw += l;
      }
      const o = s.items.at(-1);
      if (o)
        o.raw = o.raw.trimEnd(), o.text = o.text.trimEnd();
      else
        return;
      s.raw = s.raw.trimEnd();
      for (let h = 0; h < s.items.length; h++)
        if (this.lexer.state.top = !1, s.items[h].tokens = this.lexer.blockTokens(s.items[h].text, []), !s.loose) {
          const l = s.items[h].tokens.filter((T) => T.type === "space"), c = l.length > 0 && l.some((T) => this.rules.other.anyLine.test(T.raw));
          s.loose = c;
        }
      if (s.loose)
        for (let h = 0; h < s.items.length; h++)
          s.items[h].loose = !0;
      return s;
    }
  }
  html(n) {
    const e = this.rules.block.html.exec(n);
    if (e)
      return {
        type: "html",
        block: !0,
        raw: e[0],
        pre: e[1] === "pre" || e[1] === "script" || e[1] === "style",
        text: e[0]
      };
  }
  def(n) {
    const e = this.rules.block.def.exec(n);
    if (e) {
      const t = e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), r = e[2] ? e[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", s = e[3] ? e[3].substring(1, e[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : e[3];
      return {
        type: "def",
        tag: t,
        raw: e[0],
        href: r,
        title: s
      };
    }
  }
  table(n) {
    var u;
    const e = this.rules.block.table.exec(n);
    if (!e || !this.rules.other.tableDelimiter.test(e[2]))
      return;
    const t = Qt(e[1]), r = e[2].replace(this.rules.other.tableAlignChars, "").split("|"), s = (u = e[3]) != null && u.trim() ? e[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], a = {
      type: "table",
      raw: e[0],
      header: [],
      align: [],
      rows: []
    };
    if (t.length === r.length) {
      for (const o of r)
        this.rules.other.tableAlignRight.test(o) ? a.align.push("right") : this.rules.other.tableAlignCenter.test(o) ? a.align.push("center") : this.rules.other.tableAlignLeft.test(o) ? a.align.push("left") : a.align.push(null);
      for (let o = 0; o < t.length; o++)
        a.header.push({
          text: t[o],
          tokens: this.lexer.inline(t[o]),
          header: !0,
          align: a.align[o]
        });
      for (const o of s)
        a.rows.push(Qt(o, a.header.length).map((h, l) => ({
          text: h,
          tokens: this.lexer.inline(h),
          header: !1,
          align: a.align[l]
        })));
      return a;
    }
  }
  lheading(n) {
    const e = this.rules.block.lheading.exec(n);
    if (e)
      return {
        type: "heading",
        raw: e[0],
        depth: e[2].charAt(0) === "=" ? 1 : 2,
        text: e[1],
        tokens: this.lexer.inline(e[1])
      };
  }
  paragraph(n) {
    const e = this.rules.block.paragraph.exec(n);
    if (e) {
      const t = e[1].charAt(e[1].length - 1) === `
` ? e[1].slice(0, -1) : e[1];
      return {
        type: "paragraph",
        raw: e[0],
        text: t,
        tokens: this.lexer.inline(t)
      };
    }
  }
  text(n) {
    const e = this.rules.block.text.exec(n);
    if (e)
      return {
        type: "text",
        raw: e[0],
        text: e[0],
        tokens: this.lexer.inline(e[0])
      };
  }
  escape(n) {
    const e = this.rules.inline.escape.exec(n);
    if (e)
      return {
        type: "escape",
        raw: e[0],
        text: e[1]
      };
  }
  tag(n) {
    const e = this.rules.inline.tag.exec(n);
    if (e)
      return !this.lexer.state.inLink && this.rules.other.startATag.test(e[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(e[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(e[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(e[0]) && (this.lexer.state.inRawBlock = !1), {
        type: "html",
        raw: e[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        block: !1,
        text: e[0]
      };
  }
  link(n) {
    const e = this.rules.inline.link.exec(n);
    if (e) {
      const t = e[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(t)) {
        if (!this.rules.other.endAngleBracket.test(t))
          return;
        const a = de(t.slice(0, -1), "\\");
        if ((t.length - a.length) % 2 === 0)
          return;
      } else {
        const a = Rr(e[2], "()");
        if (a === -2)
          return;
        if (a > -1) {
          const o = (e[0].indexOf("!") === 0 ? 5 : 4) + e[1].length + a;
          e[2] = e[2].substring(0, a), e[0] = e[0].substring(0, o).trim(), e[3] = "";
        }
      }
      let r = e[2], s = "";
      if (this.options.pedantic) {
        const a = this.rules.other.pedanticHrefTitle.exec(r);
        a && (r = a[1], s = a[3]);
      } else
        s = e[3] ? e[3].slice(1, -1) : "";
      return r = r.trim(), this.rules.other.startAngleBracket.test(r) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(t) ? r = r.slice(1) : r = r.slice(1, -1)), Kt(e, {
        href: r && r.replace(this.rules.inline.anyPunctuation, "$1"),
        title: s && s.replace(this.rules.inline.anyPunctuation, "$1")
      }, e[0], this.lexer, this.rules);
    }
  }
  reflink(n, e) {
    let t;
    if ((t = this.rules.inline.reflink.exec(n)) || (t = this.rules.inline.nolink.exec(n))) {
      const r = (t[2] || t[1]).replace(this.rules.other.multipleSpaceGlobal, " "), s = e[r.toLowerCase()];
      if (!s) {
        const a = t[0].charAt(0);
        return {
          type: "text",
          raw: a,
          text: a
        };
      }
      return Kt(t, s, t[0], this.lexer, this.rules);
    }
  }
  emStrong(n, e, t = "") {
    let r = this.rules.inline.emStrongLDelim.exec(n);
    if (!r || r[3] && t.match(this.rules.other.unicodeAlphaNumeric)) return;
    if (!(r[1] || r[2] || "") || !t || this.rules.inline.punctuation.exec(t)) {
      const a = [...r[0]].length - 1;
      let u, o, h = a, l = 0;
      const c = r[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (c.lastIndex = 0, e = e.slice(-1 * n.length + a); (r = c.exec(e)) != null; ) {
        if (u = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !u) continue;
        if (o = [...u].length, r[3] || r[4]) {
          h += o;
          continue;
        } else if ((r[5] || r[6]) && a % 3 && !((a + o) % 3)) {
          l += o;
          continue;
        }
        if (h -= o, h > 0) continue;
        o = Math.min(o, o + h + l);
        const T = [...r[0]][0].length, f = n.slice(0, a + r.index + T + o);
        if (Math.min(a, o) % 2) {
          const k = f.slice(1, -1);
          return {
            type: "em",
            raw: f,
            text: k,
            tokens: this.lexer.inlineTokens(k)
          };
        }
        const A = f.slice(2, -2);
        return {
          type: "strong",
          raw: f,
          text: A,
          tokens: this.lexer.inlineTokens(A)
        };
      }
    }
  }
  codespan(n) {
    const e = this.rules.inline.code.exec(n);
    if (e) {
      let t = e[2].replace(this.rules.other.newLineCharGlobal, " ");
      const r = this.rules.other.nonSpaceChar.test(t), s = this.rules.other.startingSpaceChar.test(t) && this.rules.other.endingSpaceChar.test(t);
      return r && s && (t = t.substring(1, t.length - 1)), {
        type: "codespan",
        raw: e[0],
        text: t
      };
    }
  }
  br(n) {
    const e = this.rules.inline.br.exec(n);
    if (e)
      return {
        type: "br",
        raw: e[0]
      };
  }
  del(n) {
    const e = this.rules.inline.del.exec(n);
    if (e)
      return {
        type: "del",
        raw: e[0],
        text: e[2],
        tokens: this.lexer.inlineTokens(e[2])
      };
  }
  autolink(n) {
    const e = this.rules.inline.autolink.exec(n);
    if (e) {
      let t, r;
      return e[2] === "@" ? (t = e[1], r = "mailto:" + t) : (t = e[1], r = t), {
        type: "link",
        raw: e[0],
        text: t,
        href: r,
        tokens: [
          {
            type: "text",
            raw: t,
            text: t
          }
        ]
      };
    }
  }
  url(n) {
    var t;
    let e;
    if (e = this.rules.inline.url.exec(n)) {
      let r, s;
      if (e[2] === "@")
        r = e[0], s = "mailto:" + r;
      else {
        let a;
        do
          a = e[0], e[0] = ((t = this.rules.inline._backpedal.exec(e[0])) == null ? void 0 : t[0]) ?? "";
        while (a !== e[0]);
        r = e[0], e[1] === "www." ? s = "http://" + e[0] : s = e[0];
      }
      return {
        type: "link",
        raw: e[0],
        text: r,
        href: s,
        tokens: [
          {
            type: "text",
            raw: r,
            text: r
          }
        ]
      };
    }
  }
  inlineText(n) {
    const e = this.rules.inline.text.exec(n);
    if (e) {
      const t = this.lexer.state.inRawBlock;
      return {
        type: "text",
        raw: e[0],
        text: e[0],
        escaped: t
      };
    }
  }
}, j = class ct {
  constructor(e) {
    w(this, "tokens");
    w(this, "options");
    w(this, "state");
    w(this, "tokenizer");
    w(this, "inlineQueue");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || te, this.options.tokenizer = this.options.tokenizer || new $e(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
      inLink: !1,
      inRawBlock: !1,
      top: !0
    };
    const t = {
      other: N,
      block: Oe.normal,
      inline: ge.normal
    };
    this.options.pedantic ? (t.block = Oe.pedantic, t.inline = ge.pedantic) : this.options.gfm && (t.block = Oe.gfm, this.options.breaks ? t.inline = ge.breaks : t.inline = ge.gfm), this.tokenizer.rules = t;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block: Oe,
      inline: ge
    };
  }
  /**
   * Static Lex Method
   */
  static lex(e, t) {
    return new ct(t).lex(e);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(e, t) {
    return new ct(t).inlineTokens(e);
  }
  /**
   * Preprocessing
   */
  lex(e) {
    e = e.replace(N.carriageReturn, `
`), this.blockTokens(e, this.tokens);
    for (let t = 0; t < this.inlineQueue.length; t++) {
      const r = this.inlineQueue[t];
      this.inlineTokens(r.src, r.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, t = [], r = !1) {
    var s, a, u;
    for (this.options.pedantic && (e = e.replace(N.tabCharGlobal, "    ").replace(N.spaceLine, "")); e; ) {
      let o;
      if ((a = (s = this.options.extensions) == null ? void 0 : s.block) != null && a.some((l) => (o = l.call({ lexer: this }, e, t)) ? (e = e.substring(o.raw.length), t.push(o), !0) : !1))
        continue;
      if (o = this.tokenizer.space(e)) {
        e = e.substring(o.raw.length);
        const l = t.at(-1);
        o.raw.length === 1 && l !== void 0 ? l.raw += `
` : t.push(o);
        continue;
      }
      if (o = this.tokenizer.code(e)) {
        e = e.substring(o.raw.length);
        const l = t.at(-1);
        (l == null ? void 0 : l.type) === "paragraph" || (l == null ? void 0 : l.type) === "text" ? (l.raw += `
` + o.raw, l.text += `
` + o.text, this.inlineQueue.at(-1).src = l.text) : t.push(o);
        continue;
      }
      if (o = this.tokenizer.fences(e)) {
        e = e.substring(o.raw.length), t.push(o);
        continue;
      }
      if (o = this.tokenizer.heading(e)) {
        e = e.substring(o.raw.length), t.push(o);
        continue;
      }
      if (o = this.tokenizer.hr(e)) {
        e = e.substring(o.raw.length), t.push(o);
        continue;
      }
      if (o = this.tokenizer.blockquote(e)) {
        e = e.substring(o.raw.length), t.push(o);
        continue;
      }
      if (o = this.tokenizer.list(e)) {
        e = e.substring(o.raw.length), t.push(o);
        continue;
      }
      if (o = this.tokenizer.html(e)) {
        e = e.substring(o.raw.length), t.push(o);
        continue;
      }
      if (o = this.tokenizer.def(e)) {
        e = e.substring(o.raw.length);
        const l = t.at(-1);
        (l == null ? void 0 : l.type) === "paragraph" || (l == null ? void 0 : l.type) === "text" ? (l.raw += `
` + o.raw, l.text += `
` + o.raw, this.inlineQueue.at(-1).src = l.text) : this.tokens.links[o.tag] || (this.tokens.links[o.tag] = {
          href: o.href,
          title: o.title
        });
        continue;
      }
      if (o = this.tokenizer.table(e)) {
        e = e.substring(o.raw.length), t.push(o);
        continue;
      }
      if (o = this.tokenizer.lheading(e)) {
        e = e.substring(o.raw.length), t.push(o);
        continue;
      }
      let h = e;
      if ((u = this.options.extensions) != null && u.startBlock) {
        let l = 1 / 0;
        const c = e.slice(1);
        let T;
        this.options.extensions.startBlock.forEach((f) => {
          T = f.call({ lexer: this }, c), typeof T == "number" && T >= 0 && (l = Math.min(l, T));
        }), l < 1 / 0 && l >= 0 && (h = e.substring(0, l + 1));
      }
      if (this.state.top && (o = this.tokenizer.paragraph(h))) {
        const l = t.at(-1);
        r && (l == null ? void 0 : l.type) === "paragraph" ? (l.raw += `
` + o.raw, l.text += `
` + o.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = l.text) : t.push(o), r = h.length !== e.length, e = e.substring(o.raw.length);
        continue;
      }
      if (o = this.tokenizer.text(e)) {
        e = e.substring(o.raw.length);
        const l = t.at(-1);
        (l == null ? void 0 : l.type) === "text" ? (l.raw += `
` + o.raw, l.text += `
` + o.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = l.text) : t.push(o);
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
    var o, h, l;
    let r = e, s = null;
    if (this.tokens.links) {
      const c = Object.keys(this.tokens.links);
      if (c.length > 0)
        for (; (s = this.tokenizer.rules.inline.reflinkSearch.exec(r)) != null; )
          c.includes(s[0].slice(s[0].lastIndexOf("[") + 1, -1)) && (r = r.slice(0, s.index) + "[" + "a".repeat(s[0].length - 2) + "]" + r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (s = this.tokenizer.rules.inline.anyPunctuation.exec(r)) != null; )
      r = r.slice(0, s.index) + "++" + r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    for (; (s = this.tokenizer.rules.inline.blockSkip.exec(r)) != null; )
      r = r.slice(0, s.index) + "[" + "a".repeat(s[0].length - 2) + "]" + r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    let a = !1, u = "";
    for (; e; ) {
      a || (u = ""), a = !1;
      let c;
      if ((h = (o = this.options.extensions) == null ? void 0 : o.inline) != null && h.some((f) => (c = f.call({ lexer: this }, e, t)) ? (e = e.substring(c.raw.length), t.push(c), !0) : !1))
        continue;
      if (c = this.tokenizer.escape(e)) {
        e = e.substring(c.raw.length), t.push(c);
        continue;
      }
      if (c = this.tokenizer.tag(e)) {
        e = e.substring(c.raw.length), t.push(c);
        continue;
      }
      if (c = this.tokenizer.link(e)) {
        e = e.substring(c.raw.length), t.push(c);
        continue;
      }
      if (c = this.tokenizer.reflink(e, this.tokens.links)) {
        e = e.substring(c.raw.length);
        const f = t.at(-1);
        c.type === "text" && (f == null ? void 0 : f.type) === "text" ? (f.raw += c.raw, f.text += c.text) : t.push(c);
        continue;
      }
      if (c = this.tokenizer.emStrong(e, r, u)) {
        e = e.substring(c.raw.length), t.push(c);
        continue;
      }
      if (c = this.tokenizer.codespan(e)) {
        e = e.substring(c.raw.length), t.push(c);
        continue;
      }
      if (c = this.tokenizer.br(e)) {
        e = e.substring(c.raw.length), t.push(c);
        continue;
      }
      if (c = this.tokenizer.del(e)) {
        e = e.substring(c.raw.length), t.push(c);
        continue;
      }
      if (c = this.tokenizer.autolink(e)) {
        e = e.substring(c.raw.length), t.push(c);
        continue;
      }
      if (!this.state.inLink && (c = this.tokenizer.url(e))) {
        e = e.substring(c.raw.length), t.push(c);
        continue;
      }
      let T = e;
      if ((l = this.options.extensions) != null && l.startInline) {
        let f = 1 / 0;
        const A = e.slice(1);
        let k;
        this.options.extensions.startInline.forEach((I) => {
          k = I.call({ lexer: this }, A), typeof k == "number" && k >= 0 && (f = Math.min(f, k));
        }), f < 1 / 0 && f >= 0 && (T = e.substring(0, f + 1));
      }
      if (c = this.tokenizer.inlineText(T)) {
        e = e.substring(c.raw.length), c.raw.slice(-1) !== "_" && (u = c.raw.slice(-1)), a = !0;
        const f = t.at(-1);
        (f == null ? void 0 : f.type) === "text" ? (f.raw += c.raw, f.text += c.text) : t.push(c);
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
}, Ue = class {
  // set by the parser
  constructor(n) {
    w(this, "options");
    w(this, "parser");
    this.options = n || te;
  }
  space(n) {
    return "";
  }
  code({ text: n, lang: e, escaped: t }) {
    var a;
    const r = (a = (e || "").match(N.notSpaceStart)) == null ? void 0 : a[0], s = n.replace(N.endingNewline, "") + `
`;
    return r ? '<pre><code class="language-' + H(r) + '">' + (t ? s : H(s, !0)) + `</code></pre>
` : "<pre><code>" + (t ? s : H(s, !0)) + `</code></pre>
`;
  }
  blockquote({ tokens: n }) {
    return `<blockquote>
${this.parser.parse(n)}</blockquote>
`;
  }
  html({ text: n }) {
    return n;
  }
  heading({ tokens: n, depth: e }) {
    return `<h${e}>${this.parser.parseInline(n)}</h${e}>
`;
  }
  hr(n) {
    return `<hr>
`;
  }
  list(n) {
    const e = n.ordered, t = n.start;
    let r = "";
    for (let u = 0; u < n.items.length; u++) {
      const o = n.items[u];
      r += this.listitem(o);
    }
    const s = e ? "ol" : "ul", a = e && t !== 1 ? ' start="' + t + '"' : "";
    return "<" + s + a + `>
` + r + "</" + s + `>
`;
  }
  listitem(n) {
    var t;
    let e = "";
    if (n.task) {
      const r = this.checkbox({ checked: !!n.checked });
      n.loose ? ((t = n.tokens[0]) == null ? void 0 : t.type) === "paragraph" ? (n.tokens[0].text = r + " " + n.tokens[0].text, n.tokens[0].tokens && n.tokens[0].tokens.length > 0 && n.tokens[0].tokens[0].type === "text" && (n.tokens[0].tokens[0].text = r + " " + H(n.tokens[0].tokens[0].text), n.tokens[0].tokens[0].escaped = !0)) : n.tokens.unshift({
        type: "text",
        raw: r + " ",
        text: r + " ",
        escaped: !0
      }) : e += r + " ";
    }
    return e += this.parser.parse(n.tokens, !!n.loose), `<li>${e}</li>
`;
  }
  checkbox({ checked: n }) {
    return "<input " + (n ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph({ tokens: n }) {
    return `<p>${this.parser.parseInline(n)}</p>
`;
  }
  table(n) {
    let e = "", t = "";
    for (let s = 0; s < n.header.length; s++)
      t += this.tablecell(n.header[s]);
    e += this.tablerow({ text: t });
    let r = "";
    for (let s = 0; s < n.rows.length; s++) {
      const a = n.rows[s];
      t = "";
      for (let u = 0; u < a.length; u++)
        t += this.tablecell(a[u]);
      r += this.tablerow({ text: t });
    }
    return r && (r = `<tbody>${r}</tbody>`), `<table>
<thead>
` + e + `</thead>
` + r + `</table>
`;
  }
  tablerow({ text: n }) {
    return `<tr>
${n}</tr>
`;
  }
  tablecell(n) {
    const e = this.parser.parseInline(n.tokens), t = n.header ? "th" : "td";
    return (n.align ? `<${t} align="${n.align}">` : `<${t}>`) + e + `</${t}>
`;
  }
  /**
   * span level renderer
   */
  strong({ tokens: n }) {
    return `<strong>${this.parser.parseInline(n)}</strong>`;
  }
  em({ tokens: n }) {
    return `<em>${this.parser.parseInline(n)}</em>`;
  }
  codespan({ text: n }) {
    return `<code>${H(n, !0)}</code>`;
  }
  br(n) {
    return "<br>";
  }
  del({ tokens: n }) {
    return `<del>${this.parser.parseInline(n)}</del>`;
  }
  link({ href: n, title: e, tokens: t }) {
    const r = this.parser.parseInline(t), s = Vt(n);
    if (s === null)
      return r;
    n = s;
    let a = '<a href="' + n + '"';
    return e && (a += ' title="' + H(e) + '"'), a += ">" + r + "</a>", a;
  }
  image({ href: n, title: e, text: t, tokens: r }) {
    r && (t = this.parser.parseInline(r, this.parser.textRenderer));
    const s = Vt(n);
    if (s === null)
      return H(t);
    n = s;
    let a = `<img src="${n}" alt="${t}"`;
    return e && (a += ` title="${H(e)}"`), a += ">", a;
  }
  text(n) {
    return "tokens" in n && n.tokens ? this.parser.parseInline(n.tokens) : "escaped" in n && n.escaped ? n.text : H(n.text);
  }
}, wt = class {
  // no need for block level renderers
  strong({ text: n }) {
    return n;
  }
  em({ text: n }) {
    return n;
  }
  codespan({ text: n }) {
    return n;
  }
  del({ text: n }) {
    return n;
  }
  html({ text: n }) {
    return n;
  }
  text({ text: n }) {
    return n;
  }
  link({ text: n }) {
    return "" + n;
  }
  image({ text: n }) {
    return "" + n;
  }
  br() {
    return "";
  }
}, Y = class ut {
  constructor(e) {
    w(this, "options");
    w(this, "renderer");
    w(this, "textRenderer");
    this.options = e || te, this.options.renderer = this.options.renderer || new Ue(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new wt();
  }
  /**
   * Static Parse Method
   */
  static parse(e, t) {
    return new ut(t).parse(e);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(e, t) {
    return new ut(t).parseInline(e);
  }
  /**
   * Parse Loop
   */
  parse(e, t = !0) {
    var s, a;
    let r = "";
    for (let u = 0; u < e.length; u++) {
      const o = e[u];
      if ((a = (s = this.options.extensions) == null ? void 0 : s.renderers) != null && a[o.type]) {
        const l = o, c = this.options.extensions.renderers[l.type].call({ parser: this }, l);
        if (c !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(l.type)) {
          r += c || "";
          continue;
        }
      }
      const h = o;
      switch (h.type) {
        case "space": {
          r += this.renderer.space(h);
          continue;
        }
        case "hr": {
          r += this.renderer.hr(h);
          continue;
        }
        case "heading": {
          r += this.renderer.heading(h);
          continue;
        }
        case "code": {
          r += this.renderer.code(h);
          continue;
        }
        case "table": {
          r += this.renderer.table(h);
          continue;
        }
        case "blockquote": {
          r += this.renderer.blockquote(h);
          continue;
        }
        case "list": {
          r += this.renderer.list(h);
          continue;
        }
        case "html": {
          r += this.renderer.html(h);
          continue;
        }
        case "paragraph": {
          r += this.renderer.paragraph(h);
          continue;
        }
        case "text": {
          let l = h, c = this.renderer.text(l);
          for (; u + 1 < e.length && e[u + 1].type === "text"; )
            l = e[++u], c += `
` + this.renderer.text(l);
          t ? r += this.renderer.paragraph({
            type: "paragraph",
            raw: c,
            text: c,
            tokens: [{ type: "text", raw: c, text: c, escaped: !0 }]
          }) : r += c;
          continue;
        }
        default: {
          const l = 'Token with "' + h.type + '" type was not found.';
          if (this.options.silent)
            return console.error(l), "";
          throw new Error(l);
        }
      }
    }
    return r;
  }
  /**
   * Parse Inline Tokens
   */
  parseInline(e, t = this.renderer) {
    var s, a;
    let r = "";
    for (let u = 0; u < e.length; u++) {
      const o = e[u];
      if ((a = (s = this.options.extensions) == null ? void 0 : s.renderers) != null && a[o.type]) {
        const l = this.options.extensions.renderers[o.type].call({ parser: this }, o);
        if (l !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(o.type)) {
          r += l || "";
          continue;
        }
      }
      const h = o;
      switch (h.type) {
        case "escape": {
          r += t.text(h);
          break;
        }
        case "html": {
          r += t.html(h);
          break;
        }
        case "link": {
          r += t.link(h);
          break;
        }
        case "image": {
          r += t.image(h);
          break;
        }
        case "strong": {
          r += t.strong(h);
          break;
        }
        case "em": {
          r += t.em(h);
          break;
        }
        case "codespan": {
          r += t.codespan(h);
          break;
        }
        case "br": {
          r += t.br(h);
          break;
        }
        case "del": {
          r += t.del(h);
          break;
        }
        case "text": {
          r += t.text(h);
          break;
        }
        default: {
          const l = 'Token with "' + h.type + '" type was not found.';
          if (this.options.silent)
            return console.error(l), "";
          throw new Error(l);
        }
      }
    }
    return r;
  }
}, ot, Ne = (ot = class {
  constructor(n) {
    w(this, "options");
    w(this, "block");
    this.options = n || te;
  }
  /**
   * Process markdown before marked
   */
  preprocess(n) {
    return n;
  }
  /**
   * Process HTML after marked is finished
   */
  postprocess(n) {
    return n;
  }
  /**
   * Process all tokens before walk tokens
   */
  processAllTokens(n) {
    return n;
  }
  /**
   * Provide function to tokenize markdown
   */
  provideLexer() {
    return this.block ? j.lex : j.lexInline;
  }
  /**
   * Provide function to parse tokens
   */
  provideParser() {
    return this.block ? Y.parse : Y.parseInline;
  }
}, w(ot, "passThroughHooks", /* @__PURE__ */ new Set([
  "preprocess",
  "postprocess",
  "processAllTokens"
])), ot), vr = class {
  constructor(...n) {
    w(this, "defaults", ft());
    w(this, "options", this.setOptions);
    w(this, "parse", this.parseMarkdown(!0));
    w(this, "parseInline", this.parseMarkdown(!1));
    w(this, "Parser", Y);
    w(this, "Renderer", Ue);
    w(this, "TextRenderer", wt);
    w(this, "Lexer", j);
    w(this, "Tokenizer", $e);
    w(this, "Hooks", Ne);
    this.use(...n);
  }
  /**
   * Run callback for every token
   */
  walkTokens(n, e) {
    var r, s;
    let t = [];
    for (const a of n)
      switch (t = t.concat(e.call(this, a)), a.type) {
        case "table": {
          const u = a;
          for (const o of u.header)
            t = t.concat(this.walkTokens(o.tokens, e));
          for (const o of u.rows)
            for (const h of o)
              t = t.concat(this.walkTokens(h.tokens, e));
          break;
        }
        case "list": {
          const u = a;
          t = t.concat(this.walkTokens(u.items, e));
          break;
        }
        default: {
          const u = a;
          (s = (r = this.defaults.extensions) == null ? void 0 : r.childTokens) != null && s[u.type] ? this.defaults.extensions.childTokens[u.type].forEach((o) => {
            const h = u[o].flat(1 / 0);
            t = t.concat(this.walkTokens(h, e));
          }) : u.tokens && (t = t.concat(this.walkTokens(u.tokens, e)));
        }
      }
    return t;
  }
  use(...n) {
    const e = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return n.forEach((t) => {
      const r = { ...t };
      if (r.async = this.defaults.async || r.async || !1, t.extensions && (t.extensions.forEach((s) => {
        if (!s.name)
          throw new Error("extension name required");
        if ("renderer" in s) {
          const a = e.renderers[s.name];
          a ? e.renderers[s.name] = function(...u) {
            let o = s.renderer.apply(this, u);
            return o === !1 && (o = a.apply(this, u)), o;
          } : e.renderers[s.name] = s.renderer;
        }
        if ("tokenizer" in s) {
          if (!s.level || s.level !== "block" && s.level !== "inline")
            throw new Error("extension level must be 'block' or 'inline'");
          const a = e[s.level];
          a ? a.unshift(s.tokenizer) : e[s.level] = [s.tokenizer], s.start && (s.level === "block" ? e.startBlock ? e.startBlock.push(s.start) : e.startBlock = [s.start] : s.level === "inline" && (e.startInline ? e.startInline.push(s.start) : e.startInline = [s.start]));
        }
        "childTokens" in s && s.childTokens && (e.childTokens[s.name] = s.childTokens);
      }), r.extensions = e), t.renderer) {
        const s = this.defaults.renderer || new Ue(this.defaults);
        for (const a in t.renderer) {
          if (!(a in s))
            throw new Error(`renderer '${a}' does not exist`);
          if (["options", "parser"].includes(a))
            continue;
          const u = a, o = t.renderer[u], h = s[u];
          s[u] = (...l) => {
            let c = o.apply(s, l);
            return c === !1 && (c = h.apply(s, l)), c || "";
          };
        }
        r.renderer = s;
      }
      if (t.tokenizer) {
        const s = this.defaults.tokenizer || new $e(this.defaults);
        for (const a in t.tokenizer) {
          if (!(a in s))
            throw new Error(`tokenizer '${a}' does not exist`);
          if (["options", "rules", "lexer"].includes(a))
            continue;
          const u = a, o = t.tokenizer[u], h = s[u];
          s[u] = (...l) => {
            let c = o.apply(s, l);
            return c === !1 && (c = h.apply(s, l)), c;
          };
        }
        r.tokenizer = s;
      }
      if (t.hooks) {
        const s = this.defaults.hooks || new Ne();
        for (const a in t.hooks) {
          if (!(a in s))
            throw new Error(`hook '${a}' does not exist`);
          if (["options", "block"].includes(a))
            continue;
          const u = a, o = t.hooks[u], h = s[u];
          Ne.passThroughHooks.has(a) ? s[u] = (l) => {
            if (this.defaults.async)
              return Promise.resolve(o.call(s, l)).then((T) => h.call(s, T));
            const c = o.call(s, l);
            return h.call(s, c);
          } : s[u] = (...l) => {
            let c = o.apply(s, l);
            return c === !1 && (c = h.apply(s, l)), c;
          };
        }
        r.hooks = s;
      }
      if (t.walkTokens) {
        const s = this.defaults.walkTokens, a = t.walkTokens;
        r.walkTokens = function(u) {
          let o = [];
          return o.push(a.call(this, u)), s && (o = o.concat(s.call(this, u))), o;
        };
      }
      this.defaults = { ...this.defaults, ...r };
    }), this;
  }
  setOptions(n) {
    return this.defaults = { ...this.defaults, ...n }, this;
  }
  lexer(n, e) {
    return j.lex(n, e ?? this.defaults);
  }
  parser(n, e) {
    return Y.parse(n, e ?? this.defaults);
  }
  parseMarkdown(n) {
    return (t, r) => {
      const s = { ...r }, a = { ...this.defaults, ...s }, u = this.onError(!!a.silent, !!a.async);
      if (this.defaults.async === !0 && s.async === !1)
        return u(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof t > "u" || t === null)
        return u(new Error("marked(): input parameter is undefined or null"));
      if (typeof t != "string")
        return u(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(t) + ", string expected"));
      a.hooks && (a.hooks.options = a, a.hooks.block = n);
      const o = a.hooks ? a.hooks.provideLexer() : n ? j.lex : j.lexInline, h = a.hooks ? a.hooks.provideParser() : n ? Y.parse : Y.parseInline;
      if (a.async)
        return Promise.resolve(a.hooks ? a.hooks.preprocess(t) : t).then((l) => o(l, a)).then((l) => a.hooks ? a.hooks.processAllTokens(l) : l).then((l) => a.walkTokens ? Promise.all(this.walkTokens(l, a.walkTokens)).then(() => l) : l).then((l) => h(l, a)).then((l) => a.hooks ? a.hooks.postprocess(l) : l).catch(u);
      try {
        a.hooks && (t = a.hooks.preprocess(t));
        let l = o(t, a);
        a.hooks && (l = a.hooks.processAllTokens(l)), a.walkTokens && this.walkTokens(l, a.walkTokens);
        let c = h(l, a);
        return a.hooks && (c = a.hooks.postprocess(c)), c;
      } catch (l) {
        return u(l);
      }
    };
  }
  onError(n, e) {
    return (t) => {
      if (t.message += `
Please report this to https://github.com/markedjs/marked.`, n) {
        const r = "<p>An error occurred:</p><pre>" + H(t.message + "", !0) + "</pre>";
        return e ? Promise.resolve(r) : r;
      }
      if (e)
        return Promise.reject(t);
      throw t;
    };
  }
}, ee = new vr();
function x(n, e) {
  return ee.parse(n, e);
}
x.options = x.setOptions = function(n) {
  return ee.setOptions(n), x.defaults = ee.defaults, cn(x.defaults), x;
};
x.getDefaults = ft;
x.defaults = te;
x.use = function(...n) {
  return ee.use(...n), x.defaults = ee.defaults, cn(x.defaults), x;
};
x.walkTokens = function(n, e) {
  return ee.walkTokens(n, e);
};
x.parseInline = ee.parseInline;
x.Parser = Y;
x.parser = Y.parse;
x.Renderer = Ue;
x.TextRenderer = wt;
x.Lexer = j;
x.lexer = j.lex;
x.Tokenizer = $e;
x.Hooks = Ne;
x.parse = x;
x.options;
x.setOptions;
x.use;
x.walkTokens;
x.parseInline;
Y.parse;
j.lex;
/*! @license DOMPurify 3.2.6 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.2.6/LICENSE */
const {
  entries: Tn,
  setPrototypeOf: Jt,
  isFrozen: Ir,
  getPrototypeOf: Cr,
  getOwnPropertyDescriptor: Or
} = Object;
let {
  freeze: P,
  seal: U,
  create: wn
} = Object, {
  apply: pt,
  construct: ht
} = typeof Reflect < "u" && Reflect;
P || (P = function(e) {
  return e;
});
U || (U = function(e) {
  return e;
});
pt || (pt = function(e, t, r) {
  return e.apply(t, r);
});
ht || (ht = function(e, t) {
  return new e(...t);
});
const De = z(Array.prototype.forEach), Dr = z(Array.prototype.lastIndexOf), en = z(Array.prototype.pop), me = z(Array.prototype.push), Mr = z(Array.prototype.splice), Pe = z(String.prototype.toLowerCase), nt = z(String.prototype.toString), tn = z(String.prototype.match), ke = z(String.prototype.replace), Nr = z(String.prototype.indexOf), Pr = z(String.prototype.trim), B = z(Object.prototype.hasOwnProperty), M = z(RegExp.prototype.test), be = zr(TypeError);
function z(n) {
  return function(e) {
    e instanceof RegExp && (e.lastIndex = 0);
    for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)
      r[s - 1] = arguments[s];
    return pt(n, e, r);
  };
}
function zr(n) {
  return function() {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
      t[r] = arguments[r];
    return ht(n, t);
  };
}
function m(n, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Pe;
  Jt && Jt(n, null);
  let r = e.length;
  for (; r--; ) {
    let s = e[r];
    if (typeof s == "string") {
      const a = t(s);
      a !== s && (Ir(e) || (e[r] = a), s = a);
    }
    n[s] = !0;
  }
  return n;
}
function $r(n) {
  for (let e = 0; e < n.length; e++)
    B(n, e) || (n[e] = null);
  return n;
}
function Z(n) {
  const e = wn(null);
  for (const [t, r] of Tn(n))
    B(n, t) && (Array.isArray(r) ? e[t] = $r(r) : r && typeof r == "object" && r.constructor === Object ? e[t] = Z(r) : e[t] = r);
  return e;
}
function xe(n, e) {
  for (; n !== null; ) {
    const r = Or(n, e);
    if (r) {
      if (r.get)
        return z(r.get);
      if (typeof r.value == "function")
        return z(r.value);
    }
    n = Cr(n);
  }
  function t() {
    return null;
  }
  return t;
}
const nn = P(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), rt = P(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), it = P(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Ur = P(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), st = P(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), Br = P(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), rn = P(["#text"]), sn = P(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), at = P(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), an = P(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), Me = P(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Fr = U(/\{\{[\w\W]*|[\w\W]*\}\}/gm), Hr = U(/<%[\w\W]*|[\w\W]*%>/gm), Gr = U(/\$\{[\w\W]*/gm), Wr = U(/^data-[\-\w.\u00B7-\uFFFF]+$/), qr = U(/^aria-[\-\w]+$/), _n = U(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Zr = U(/^(?:\w+script|data):/i), jr = U(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), An = U(/^html$/i), Yr = U(/^[a-z][.\w]*(-[.\w]+)+$/i);
var on = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: qr,
  ATTR_WHITESPACE: jr,
  CUSTOM_ELEMENT: Yr,
  DATA_ATTR: Wr,
  DOCTYPE_NAME: An,
  ERB_EXPR: Hr,
  IS_ALLOWED_URI: _n,
  IS_SCRIPT_OR_DATA: Zr,
  MUSTACHE_EXPR: Fr,
  TMPLIT_EXPR: Gr
});
const Te = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, Xr = function() {
  return typeof window > "u" ? null : window;
}, Vr = function(e, t) {
  if (typeof e != "object" || typeof e.createPolicy != "function")
    return null;
  let r = null;
  const s = "data-tt-policy-suffix";
  t && t.hasAttribute(s) && (r = t.getAttribute(s));
  const a = "dompurify" + (r ? "#" + r : "");
  try {
    return e.createPolicy(a, {
      createHTML(u) {
        return u;
      },
      createScriptURL(u) {
        return u;
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
function En() {
  let n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Xr();
  const e = (d) => En(d);
  if (e.version = "3.2.6", e.removed = [], !n || !n.document || n.document.nodeType !== Te.document || !n.Element)
    return e.isSupported = !1, e;
  let {
    document: t
  } = n;
  const r = t, s = r.currentScript, {
    DocumentFragment: a,
    HTMLTemplateElement: u,
    Node: o,
    Element: h,
    NodeFilter: l,
    NamedNodeMap: c = n.NamedNodeMap || n.MozNamedAttrMap,
    HTMLFormElement: T,
    DOMParser: f,
    trustedTypes: A
  } = n, k = h.prototype, I = xe(k, "cloneNode"), Ae = xe(k, "remove"), ce = xe(k, "nextSibling"), Ee = xe(k, "childNodes"), X = xe(k, "parentNode");
  if (typeof u == "function") {
    const d = t.createElement("template");
    d.content && d.content.ownerDocument && (t = d.content.ownerDocument);
  }
  let y, V = "";
  const {
    implementation: Q,
    createNodeIterator: K,
    createDocumentFragment: Sn,
    getElementsByTagName: yn
  } = t, {
    importNode: Rn
  } = r;
  let D = ln();
  e.isSupported = typeof Tn == "function" && typeof X == "function" && Q && Q.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: He,
    ERB_EXPR: Ge,
    TMPLIT_EXPR: We,
    DATA_ATTR: Ln,
    ARIA_ATTR: vn,
    IS_SCRIPT_OR_DATA: In,
    ATTR_WHITESPACE: _t,
    CUSTOM_ELEMENT: Cn
  } = on;
  let {
    IS_ALLOWED_URI: At
  } = on, R = null;
  const Et = m({}, [...nn, ...rt, ...it, ...st, ...rn]);
  let v = null;
  const St = m({}, [...sn, ...at, ...an, ...Me]);
  let E = Object.seal(wn(null, {
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
  })), ue = null, qe = null, yt = !0, Ze = !0, Rt = !1, Lt = !0, ne = !1, Se = !0, J = !1, je = !1, Ye = !1, re = !1, ye = !1, Re = !1, vt = !0, It = !1;
  const On = "user-content-";
  let Xe = !0, pe = !1, ie = {}, se = null;
  const Ct = m({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let Ot = null;
  const Dt = m({}, ["audio", "video", "img", "source", "image", "track"]);
  let Ve = null;
  const Mt = m({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), Le = "http://www.w3.org/1998/Math/MathML", ve = "http://www.w3.org/2000/svg", G = "http://www.w3.org/1999/xhtml";
  let ae = G, Qe = !1, Ke = null;
  const Dn = m({}, [Le, ve, G], nt);
  let Ie = m({}, ["mi", "mo", "mn", "ms", "mtext"]), Ce = m({}, ["annotation-xml"]);
  const Mn = m({}, ["title", "style", "font", "a", "script"]);
  let he = null;
  const Nn = ["application/xhtml+xml", "text/html"], Pn = "text/html";
  let L = null, oe = null;
  const zn = t.createElement("form"), Nt = function(i) {
    return i instanceof RegExp || i instanceof Function;
  }, Je = function() {
    let i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(oe && oe === i)) {
      if ((!i || typeof i != "object") && (i = {}), i = Z(i), he = // eslint-disable-next-line unicorn/prefer-includes
      Nn.indexOf(i.PARSER_MEDIA_TYPE) === -1 ? Pn : i.PARSER_MEDIA_TYPE, L = he === "application/xhtml+xml" ? nt : Pe, R = B(i, "ALLOWED_TAGS") ? m({}, i.ALLOWED_TAGS, L) : Et, v = B(i, "ALLOWED_ATTR") ? m({}, i.ALLOWED_ATTR, L) : St, Ke = B(i, "ALLOWED_NAMESPACES") ? m({}, i.ALLOWED_NAMESPACES, nt) : Dn, Ve = B(i, "ADD_URI_SAFE_ATTR") ? m(Z(Mt), i.ADD_URI_SAFE_ATTR, L) : Mt, Ot = B(i, "ADD_DATA_URI_TAGS") ? m(Z(Dt), i.ADD_DATA_URI_TAGS, L) : Dt, se = B(i, "FORBID_CONTENTS") ? m({}, i.FORBID_CONTENTS, L) : Ct, ue = B(i, "FORBID_TAGS") ? m({}, i.FORBID_TAGS, L) : Z({}), qe = B(i, "FORBID_ATTR") ? m({}, i.FORBID_ATTR, L) : Z({}), ie = B(i, "USE_PROFILES") ? i.USE_PROFILES : !1, yt = i.ALLOW_ARIA_ATTR !== !1, Ze = i.ALLOW_DATA_ATTR !== !1, Rt = i.ALLOW_UNKNOWN_PROTOCOLS || !1, Lt = i.ALLOW_SELF_CLOSE_IN_ATTR !== !1, ne = i.SAFE_FOR_TEMPLATES || !1, Se = i.SAFE_FOR_XML !== !1, J = i.WHOLE_DOCUMENT || !1, re = i.RETURN_DOM || !1, ye = i.RETURN_DOM_FRAGMENT || !1, Re = i.RETURN_TRUSTED_TYPE || !1, Ye = i.FORCE_BODY || !1, vt = i.SANITIZE_DOM !== !1, It = i.SANITIZE_NAMED_PROPS || !1, Xe = i.KEEP_CONTENT !== !1, pe = i.IN_PLACE || !1, At = i.ALLOWED_URI_REGEXP || _n, ae = i.NAMESPACE || G, Ie = i.MATHML_TEXT_INTEGRATION_POINTS || Ie, Ce = i.HTML_INTEGRATION_POINTS || Ce, E = i.CUSTOM_ELEMENT_HANDLING || {}, i.CUSTOM_ELEMENT_HANDLING && Nt(i.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (E.tagNameCheck = i.CUSTOM_ELEMENT_HANDLING.tagNameCheck), i.CUSTOM_ELEMENT_HANDLING && Nt(i.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (E.attributeNameCheck = i.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), i.CUSTOM_ELEMENT_HANDLING && typeof i.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (E.allowCustomizedBuiltInElements = i.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), ne && (Ze = !1), ye && (re = !0), ie && (R = m({}, rn), v = [], ie.html === !0 && (m(R, nn), m(v, sn)), ie.svg === !0 && (m(R, rt), m(v, at), m(v, Me)), ie.svgFilters === !0 && (m(R, it), m(v, at), m(v, Me)), ie.mathMl === !0 && (m(R, st), m(v, an), m(v, Me))), i.ADD_TAGS && (R === Et && (R = Z(R)), m(R, i.ADD_TAGS, L)), i.ADD_ATTR && (v === St && (v = Z(v)), m(v, i.ADD_ATTR, L)), i.ADD_URI_SAFE_ATTR && m(Ve, i.ADD_URI_SAFE_ATTR, L), i.FORBID_CONTENTS && (se === Ct && (se = Z(se)), m(se, i.FORBID_CONTENTS, L)), Xe && (R["#text"] = !0), J && m(R, ["html", "head", "body"]), R.table && (m(R, ["tbody"]), delete ue.tbody), i.TRUSTED_TYPES_POLICY) {
        if (typeof i.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw be('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof i.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw be('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        y = i.TRUSTED_TYPES_POLICY, V = y.createHTML("");
      } else
        y === void 0 && (y = Vr(A, s)), y !== null && typeof V == "string" && (V = y.createHTML(""));
      P && P(i), oe = i;
    }
  }, Pt = m({}, [...rt, ...it, ...Ur]), zt = m({}, [...st, ...Br]), $n = function(i) {
    let p = X(i);
    (!p || !p.tagName) && (p = {
      namespaceURI: ae,
      tagName: "template"
    });
    const g = Pe(i.tagName), _ = Pe(p.tagName);
    return Ke[i.namespaceURI] ? i.namespaceURI === ve ? p.namespaceURI === G ? g === "svg" : p.namespaceURI === Le ? g === "svg" && (_ === "annotation-xml" || Ie[_]) : !!Pt[g] : i.namespaceURI === Le ? p.namespaceURI === G ? g === "math" : p.namespaceURI === ve ? g === "math" && Ce[_] : !!zt[g] : i.namespaceURI === G ? p.namespaceURI === ve && !Ce[_] || p.namespaceURI === Le && !Ie[_] ? !1 : !zt[g] && (Mn[g] || !Pt[g]) : !!(he === "application/xhtml+xml" && Ke[i.namespaceURI]) : !1;
  }, F = function(i) {
    me(e.removed, {
      element: i
    });
    try {
      X(i).removeChild(i);
    } catch {
      Ae(i);
    }
  }, le = function(i, p) {
    try {
      me(e.removed, {
        attribute: p.getAttributeNode(i),
        from: p
      });
    } catch {
      me(e.removed, {
        attribute: null,
        from: p
      });
    }
    if (p.removeAttribute(i), i === "is")
      if (re || ye)
        try {
          F(p);
        } catch {
        }
      else
        try {
          p.setAttribute(i, "");
        } catch {
        }
  }, $t = function(i) {
    let p = null, g = null;
    if (Ye)
      i = "<remove></remove>" + i;
    else {
      const S = tn(i, /^[\r\n\t ]+/);
      g = S && S[0];
    }
    he === "application/xhtml+xml" && ae === G && (i = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + i + "</body></html>");
    const _ = y ? y.createHTML(i) : i;
    if (ae === G)
      try {
        p = new f().parseFromString(_, he);
      } catch {
      }
    if (!p || !p.documentElement) {
      p = Q.createDocument(ae, "template", null);
      try {
        p.documentElement.innerHTML = Qe ? V : _;
      } catch {
      }
    }
    const C = p.body || p.documentElement;
    return i && g && C.insertBefore(t.createTextNode(g), C.childNodes[0] || null), ae === G ? yn.call(p, J ? "html" : "body")[0] : J ? p.documentElement : C;
  }, Ut = function(i) {
    return K.call(
      i.ownerDocument || i,
      i,
      // eslint-disable-next-line no-bitwise
      l.SHOW_ELEMENT | l.SHOW_COMMENT | l.SHOW_TEXT | l.SHOW_PROCESSING_INSTRUCTION | l.SHOW_CDATA_SECTION,
      null
    );
  }, et = function(i) {
    return i instanceof T && (typeof i.nodeName != "string" || typeof i.textContent != "string" || typeof i.removeChild != "function" || !(i.attributes instanceof c) || typeof i.removeAttribute != "function" || typeof i.setAttribute != "function" || typeof i.namespaceURI != "string" || typeof i.insertBefore != "function" || typeof i.hasChildNodes != "function");
  }, Bt = function(i) {
    return typeof o == "function" && i instanceof o;
  };
  function W(d, i, p) {
    De(d, (g) => {
      g.call(e, i, p, oe);
    });
  }
  const Ft = function(i) {
    let p = null;
    if (W(D.beforeSanitizeElements, i, null), et(i))
      return F(i), !0;
    const g = L(i.nodeName);
    if (W(D.uponSanitizeElement, i, {
      tagName: g,
      allowedTags: R
    }), Se && i.hasChildNodes() && !Bt(i.firstElementChild) && M(/<[/\w!]/g, i.innerHTML) && M(/<[/\w!]/g, i.textContent) || i.nodeType === Te.progressingInstruction || Se && i.nodeType === Te.comment && M(/<[/\w]/g, i.data))
      return F(i), !0;
    if (!R[g] || ue[g]) {
      if (!ue[g] && Gt(g) && (E.tagNameCheck instanceof RegExp && M(E.tagNameCheck, g) || E.tagNameCheck instanceof Function && E.tagNameCheck(g)))
        return !1;
      if (Xe && !se[g]) {
        const _ = X(i) || i.parentNode, C = Ee(i) || i.childNodes;
        if (C && _) {
          const S = C.length;
          for (let $ = S - 1; $ >= 0; --$) {
            const q = I(C[$], !0);
            q.__removalCount = (i.__removalCount || 0) + 1, _.insertBefore(q, ce(i));
          }
        }
      }
      return F(i), !0;
    }
    return i instanceof h && !$n(i) || (g === "noscript" || g === "noembed" || g === "noframes") && M(/<\/no(script|embed|frames)/i, i.innerHTML) ? (F(i), !0) : (ne && i.nodeType === Te.text && (p = i.textContent, De([He, Ge, We], (_) => {
      p = ke(p, _, " ");
    }), i.textContent !== p && (me(e.removed, {
      element: i.cloneNode()
    }), i.textContent = p)), W(D.afterSanitizeElements, i, null), !1);
  }, Ht = function(i, p, g) {
    if (vt && (p === "id" || p === "name") && (g in t || g in zn))
      return !1;
    if (!(Ze && !qe[p] && M(Ln, p))) {
      if (!(yt && M(vn, p))) {
        if (!v[p] || qe[p]) {
          if (
            // First condition does a very basic check if a) it's basically a valid custom element tagname AND
            // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
            !(Gt(i) && (E.tagNameCheck instanceof RegExp && M(E.tagNameCheck, i) || E.tagNameCheck instanceof Function && E.tagNameCheck(i)) && (E.attributeNameCheck instanceof RegExp && M(E.attributeNameCheck, p) || E.attributeNameCheck instanceof Function && E.attributeNameCheck(p)) || // Alternative, second condition checks if it's an `is`-attribute, AND
            // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
            p === "is" && E.allowCustomizedBuiltInElements && (E.tagNameCheck instanceof RegExp && M(E.tagNameCheck, g) || E.tagNameCheck instanceof Function && E.tagNameCheck(g)))
          ) return !1;
        } else if (!Ve[p]) {
          if (!M(At, ke(g, _t, ""))) {
            if (!((p === "src" || p === "xlink:href" || p === "href") && i !== "script" && Nr(g, "data:") === 0 && Ot[i])) {
              if (!(Rt && !M(In, ke(g, _t, "")))) {
                if (g)
                  return !1;
              }
            }
          }
        }
      }
    }
    return !0;
  }, Gt = function(i) {
    return i !== "annotation-xml" && tn(i, Cn);
  }, Wt = function(i) {
    W(D.beforeSanitizeAttributes, i, null);
    const {
      attributes: p
    } = i;
    if (!p || et(i))
      return;
    const g = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: v,
      forceKeepAttr: void 0
    };
    let _ = p.length;
    for (; _--; ) {
      const C = p[_], {
        name: S,
        namespaceURI: $,
        value: q
      } = C, fe = L(S), tt = q;
      let O = S === "value" ? tt : Pr(tt);
      if (g.attrName = fe, g.attrValue = O, g.keepAttr = !0, g.forceKeepAttr = void 0, W(D.uponSanitizeAttribute, i, g), O = g.attrValue, It && (fe === "id" || fe === "name") && (le(S, i), O = On + O), Se && M(/((--!?|])>)|<\/(style|title)/i, O)) {
        le(S, i);
        continue;
      }
      if (g.forceKeepAttr)
        continue;
      if (!g.keepAttr) {
        le(S, i);
        continue;
      }
      if (!Lt && M(/\/>/i, O)) {
        le(S, i);
        continue;
      }
      ne && De([He, Ge, We], (Zt) => {
        O = ke(O, Zt, " ");
      });
      const qt = L(i.nodeName);
      if (!Ht(qt, fe, O)) {
        le(S, i);
        continue;
      }
      if (y && typeof A == "object" && typeof A.getAttributeType == "function" && !$)
        switch (A.getAttributeType(qt, fe)) {
          case "TrustedHTML": {
            O = y.createHTML(O);
            break;
          }
          case "TrustedScriptURL": {
            O = y.createScriptURL(O);
            break;
          }
        }
      if (O !== tt)
        try {
          $ ? i.setAttributeNS($, S, O) : i.setAttribute(S, O), et(i) ? F(i) : en(e.removed);
        } catch {
          le(S, i);
        }
    }
    W(D.afterSanitizeAttributes, i, null);
  }, Un = function d(i) {
    let p = null;
    const g = Ut(i);
    for (W(D.beforeSanitizeShadowDOM, i, null); p = g.nextNode(); )
      W(D.uponSanitizeShadowNode, p, null), Ft(p), Wt(p), p.content instanceof a && d(p.content);
    W(D.afterSanitizeShadowDOM, i, null);
  };
  return e.sanitize = function(d) {
    let i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, p = null, g = null, _ = null, C = null;
    if (Qe = !d, Qe && (d = "<!-->"), typeof d != "string" && !Bt(d))
      if (typeof d.toString == "function") {
        if (d = d.toString(), typeof d != "string")
          throw be("dirty is not a string, aborting");
      } else
        throw be("toString is not a function");
    if (!e.isSupported)
      return d;
    if (je || Je(i), e.removed = [], typeof d == "string" && (pe = !1), pe) {
      if (d.nodeName) {
        const q = L(d.nodeName);
        if (!R[q] || ue[q])
          throw be("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (d instanceof o)
      p = $t("<!---->"), g = p.ownerDocument.importNode(d, !0), g.nodeType === Te.element && g.nodeName === "BODY" || g.nodeName === "HTML" ? p = g : p.appendChild(g);
    else {
      if (!re && !ne && !J && // eslint-disable-next-line unicorn/prefer-includes
      d.indexOf("<") === -1)
        return y && Re ? y.createHTML(d) : d;
      if (p = $t(d), !p)
        return re ? null : Re ? V : "";
    }
    p && Ye && F(p.firstChild);
    const S = Ut(pe ? d : p);
    for (; _ = S.nextNode(); )
      Ft(_), Wt(_), _.content instanceof a && Un(_.content);
    if (pe)
      return d;
    if (re) {
      if (ye)
        for (C = Sn.call(p.ownerDocument); p.firstChild; )
          C.appendChild(p.firstChild);
      else
        C = p;
      return (v.shadowroot || v.shadowrootmode) && (C = Rn.call(r, C, !0)), C;
    }
    let $ = J ? p.outerHTML : p.innerHTML;
    return J && R["!doctype"] && p.ownerDocument && p.ownerDocument.doctype && p.ownerDocument.doctype.name && M(An, p.ownerDocument.doctype.name) && ($ = "<!DOCTYPE " + p.ownerDocument.doctype.name + `>
` + $), ne && De([He, Ge, We], (q) => {
      $ = ke($, q, " ");
    }), y && Re ? y.createHTML($) : $;
  }, e.setConfig = function() {
    let d = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    Je(d), je = !0;
  }, e.clearConfig = function() {
    oe = null, je = !1;
  }, e.isValidAttribute = function(d, i, p) {
    oe || Je({});
    const g = L(d), _ = L(i);
    return Ht(g, _, p);
  }, e.addHook = function(d, i) {
    typeof i == "function" && me(D[d], i);
  }, e.removeHook = function(d, i) {
    if (i !== void 0) {
      const p = Dr(D[d], i);
      return p === -1 ? void 0 : Mr(D[d], p, 1)[0];
    }
    return en(D[d]);
  }, e.removeHooks = function(d) {
    D[d] = [];
  }, e.removeAllHooks = function() {
    D = ln();
  }, e;
}
var Qr = En();
const Kr = ["innerHTML"], ti = /* @__PURE__ */ Hn({
  __name: "VueMarkdown",
  props: {
    md: { default: null },
    silent: { type: Boolean, default: !1 },
    breaks: { type: Boolean, default: !1 },
    gfm: { type: Boolean, default: !0 },
    pedantic: { type: Boolean, default: !1 }
  },
  setup(n) {
    const e = n, t = Gn(""), r = jt(() => e.md), s = jt(() => ({
      ...typeof e.silent == "boolean" ? { silent: e.silent } : { silent: !1 },
      ...typeof e.breaks == "boolean" ? { breaks: e.breaks } : { breaks: !1 },
      ...typeof e.gfm == "boolean" ? { gfm: e.gfm } : { gfm: !0 },
      ...typeof e.pedantic == "boolean" ? { pedantic: e.pedantic } : { pedantic: !1 }
    })), a = (u) => Qr.sanitize(u);
    return Wn(r, async (u) => {
      u && (t.value = a(await x.parse(u, { async: !0, ...s.value })));
    }), (u, o) => t.value ? (jn(), qn("div", {
      key: 0,
      innerHTML: t.value
    }, null, 8, Kr)) : Zn("", !0);
  }
});
export {
  ti as VueMarkdown
};
//# sourceMappingURL=vue-markdown.mjs.map
