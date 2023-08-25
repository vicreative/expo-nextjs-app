// The initialization code follows the Smart Script code below

var AF_URL_SCHEME = '(https:\\/\\/)(([^\\.]+).)(.*\\/)(.*)',
  VALID_AF_URL_PARTS_LENGTH = 5,
  GOOGLE_CLICK_ID = 'gclid',
  ASSOCIATED_AD_KEYWORD = 'keyword',
  AF_KEYWORDS = 'af_keywords',
  AF_CUSTOM_EXCLUDE_PARAMS_KEYS = [
    'pid',
    'c',
    'af_channel',
    'af_ad',
    'af_adset',
    'deep_link_value',
    'af_sub1',
    'af_sub2',
    'af_sub3',
    'af_sub4',
    'af_sub5'
  ],
  GCLID_EXCLUDE_PARAMS_KEYS = ['pid', 'c', 'af_channel', 'af_ad', 'af_adset', 'deep_link_value'],
  stringifyParameters = function () {
    var o = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
      t = Object.keys(o).reduce(function (t, e) {
        return o[e] && (t += '&'.concat(e, '=').concat(o[e])), t;
      }, '');
    return console.debug('Generated OneLink parameters', t), t;
  },
  getParameterValue = function (e) {
    var t =
      1 < arguments.length && void 0 !== arguments[1]
        ? arguments[1]
        : { keys: [], overrideValues: {}, defaultValue: '' };
    if (!((null != t && t.keys && Array.isArray(t.keys)) || (null != t && t.defaultValue)))
      return console.error('Parameter config structure is wrong', t), null;
    var o = t.keys,
      o = void 0 === o ? [] : o,
      i = t.overrideValues,
      i = void 0 === i ? {} : i,
      t = t.defaultValue,
      t = void 0 === t ? '' : t,
      o = o.find(function (t) {
        return !!e[t];
      });
    return (o && (i[(i = e[o])] || i)) || t;
  },
  getURLParametersKV = function (t) {
    t = t
      .replace('?', '')
      .split('&')
      .reduce(function (t, e) {
        e = e.split('=');
        return e[0] && e[1] && (t[[e[0]]] = e[1]), t;
      }, {});
    return console.debug('Generated current parameters object', t), t;
  },
  isSkippedURL = function (t) {
    var e = t.url,
      o = t.skipKeys,
      t = t.errorMsg;
    if (e) {
      var i = e.toLowerCase();
      if (i)
        return (
          (e = o.find(function (t) {
            return i.includes(t.toLowerCase());
          })) && console.debug(t, e),
          !!e
        );
    }
    return !1;
  },
  getGoogleClickIdParameters = function (t, e) {
    var o = e[GOOGLE_CLICK_ID],
      i = {};
    return (
      o
        ? (console.debug('This user comes from Google AdWords'),
          (i[t] = o),
          (t = e[ASSOCIATED_AD_KEYWORD]) &&
            (console.debug('There is a keyword associated with the ad'), (i[AF_KEYWORDS] = t)))
        : console.debug('This user comes from SRN or custom network'),
      i
    );
  };
function _typeof(t) {
  return (_typeof =
    'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
      ? function (t) {
          return typeof t;
        }
      : function (t) {
          return t &&
            'function' == typeof Symbol &&
            t.constructor === Symbol &&
            t !== Symbol.prototype
            ? 'symbol'
            : typeof t;
        })(t);
}
function QRCode() {
  var u,
    t,
    e =
      'object' == ('undefined' == typeof global ? 'undefined' : _typeof(global)) &&
      global &&
      global.Object === Object &&
      global,
    o =
      'object' == ('undefined' == typeof self ? 'undefined' : _typeof(self)) &&
      self &&
      self.Object === Object &&
      self,
    i = e || o || Function('return this')(),
    e =
      'object' == ('undefined' == typeof exports ? 'undefined' : _typeof(exports)) &&
      exports &&
      !exports.nodeType &&
      exports,
    o =
      e &&
      'object' == ('undefined' == typeof module ? 'undefined' : _typeof(module)) &&
      module &&
      !module.nodeType &&
      module,
    n = i.QRCode;
  function r(t, e, o) {
    (this.mode = l.MODE_8BIT_BYTE), (this.data = t), (this.parsedData = []);
    for (var i = 0, n = this.data.length; i < n; i++) {
      var r = [],
        a = this.data.charCodeAt(i);
      e
        ? (r[0] = a)
        : 65536 < a
        ? ((r[0] = 240 | ((1835008 & a) >>> 18)),
          (r[1] = 128 | ((258048 & a) >>> 12)),
          (r[2] = 128 | ((4032 & a) >>> 6)),
          (r[3] = 128 | (63 & a)))
        : 2048 < a
        ? ((r[0] = 224 | ((61440 & a) >>> 12)),
          (r[1] = 128 | ((4032 & a) >>> 6)),
          (r[2] = 128 | (63 & a)))
        : 128 < a
        ? ((r[0] = 192 | ((1984 & a) >>> 6)), (r[1] = 128 | (63 & a)))
        : (r[0] = a),
        this.parsedData.push(r);
    }
    (this.parsedData = Array.prototype.concat.apply([], this.parsedData)),
      o ||
        this.parsedData.length == this.data.length ||
        (this.parsedData.unshift(191), this.parsedData.unshift(187), this.parsedData.unshift(239));
  }
  function s(t, e) {
    (this.typeNumber = t),
      (this.errorCorrectLevel = e),
      (this.modules = null),
      (this.moduleCount = 0),
      (this.dataCache = null),
      (this.dataList = []);
  }
  (r.prototype = {
    getLength: function (t) {
      return this.parsedData.length;
    },
    write: function (t) {
      for (var e = 0, o = this.parsedData.length; e < o; e++) t.put(this.parsedData[e], 8);
    }
  }),
    (s.prototype = {
      addData: function (t, e, o) {
        t = new r(t, e, o);
        this.dataList.push(t), (this.dataCache = null);
      },
      isDark: function (t, e) {
        if (t < 0 || this.moduleCount <= t || e < 0 || this.moduleCount <= e)
          throw new Error(t + ',' + e);
        return this.modules[t][e][0];
      },
      getEye: function (t, e) {
        if (t < 0 || this.moduleCount <= t || e < 0 || this.moduleCount <= e)
          throw new Error(t + ',' + e);
        t = this.modules[t][e];
        return t[1]
          ? ((e = 'P' + t[1] + '_' + t[2]),
            'A' == t[2] && (e = 'A' + t[1]),
            { isDark: t[0], type: e })
          : null;
      },
      getModuleCount: function () {
        return this.moduleCount;
      },
      make: function () {
        this.makeImpl(!1, this.getBestMaskPattern());
      },
      makeImpl: function (t, e) {
        (this.moduleCount = 4 * this.typeNumber + 17), (this.modules = new Array(this.moduleCount));
        for (var o = 0; o < this.moduleCount; o++) {
          this.modules[o] = new Array(this.moduleCount);
          for (var i = 0; i < this.moduleCount; i++) this.modules[o][i] = [];
        }
        this.setupPositionProbePattern(0, 0, 'TL'),
          this.setupPositionProbePattern(this.moduleCount - 7, 0, 'BL'),
          this.setupPositionProbePattern(0, this.moduleCount - 7, 'TR'),
          this.setupPositionAdjustPattern('A'),
          this.setupTimingPattern(),
          this.setupTypeInfo(t, e),
          7 <= this.typeNumber && this.setupTypeNumber(t),
          null == this.dataCache &&
            (this.dataCache = s.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)),
          this.mapData(this.dataCache, e);
      },
      setupPositionProbePattern: function (t, e, o) {
        for (var i = -1; i <= 7; i++)
          if (!(t + i <= -1 || this.moduleCount <= t + i))
            for (var n = -1; n <= 7; n++)
              e + n <= -1 ||
                this.moduleCount <= e + n ||
                ((0 <= i && i <= 6 && (0 == n || 6 == n)) ||
                (0 <= n && n <= 6 && (0 == i || 6 == i)) ||
                (2 <= i && i <= 4 && 2 <= n && n <= 4)
                  ? ((this.modules[t + i][e + n][0] = !0),
                    (this.modules[t + i][e + n][2] = o),
                    (this.modules[t + i][e + n][1] =
                      -0 == i || -0 == n || 6 == i || 6 == n ? 'O' : 'I'))
                  : (this.modules[t + i][e + n][0] = !1));
      },
      getBestMaskPattern: function () {
        for (var t = 0, e = 0, o = 0; o < 8; o++) {
          this.makeImpl(!0, o);
          var i = v.getLostPoint(this);
          (0 == o || i < t) && ((t = i), (e = o));
        }
        return e;
      },
      createMovieClip: function (t, e, o) {
        var i = t.createEmptyMovieClip(e, o);
        this.make();
        for (var n = 0; n < this.modules.length; n++)
          for (var r = +n, a = 0; a < this.modules[n].length; a++) {
            var l = +a;
            this.modules[n][a][0] &&
              (i.beginFill(0, 100),
              i.moveTo(l, r),
              i.lineTo(1 + l, r),
              i.lineTo(1 + l, 1 + r),
              i.lineTo(l, 1 + r),
              i.endFill());
          }
        return i;
      },
      setupTimingPattern: function () {
        for (var t = 8; t < this.moduleCount - 8; t++)
          null == this.modules[t][6][0] && (this.modules[t][6][0] = t % 2 == 0);
        for (var e = 8; e < this.moduleCount - 8; e++)
          null == this.modules[6][e][0] && (this.modules[6][e][0] = e % 2 == 0);
      },
      setupPositionAdjustPattern: function (t) {
        for (var e = v.getPatternPosition(this.typeNumber), o = 0; o < e.length; o++)
          for (var i = 0; i < e.length; i++) {
            var n = e[o],
              r = e[i];
            if (null == this.modules[n][r][0])
              for (var a = -2; a <= 2; a++)
                for (var l = -2; l <= 2; l++)
                  -2 == a || 2 == a || -2 == l || 2 == l || (0 == a && 0 == l)
                    ? ((this.modules[n + a][r + l][0] = !0),
                      (this.modules[n + a][r + l][2] = t),
                      (this.modules[n + a][r + l][1] =
                        -2 == a || -2 == l || 2 == a || 2 == l ? 'O' : 'I'))
                    : (this.modules[n + a][r + l][0] = !1);
          }
      },
      setupTypeNumber: function (t) {
        for (var e = v.getBCHTypeNumber(this.typeNumber), o = 0; o < 18; o++) {
          var i = !t && 1 == ((e >> o) & 1);
          this.modules[Math.floor(o / 3)][(o % 3) + this.moduleCount - 8 - 3][0] = i;
        }
        for (o = 0; o < 18; o++) {
          i = !t && 1 == ((e >> o) & 1);
          this.modules[(o % 3) + this.moduleCount - 8 - 3][Math.floor(o / 3)][0] = i;
        }
      },
      setupTypeInfo: function (t, e) {
        for (
          var e = (this.errorCorrectLevel << 3) | e, o = v.getBCHTypeInfo(e), i = 0;
          i < 15;
          i++
        ) {
          var n = !t && 1 == ((o >> i) & 1);
          i < 6
            ? (this.modules[i][8][0] = n)
            : i < 8
            ? (this.modules[i + 1][8][0] = n)
            : (this.modules[this.moduleCount - 15 + i][8][0] = n);
        }
        for (i = 0; i < 15; i++) {
          n = !t && 1 == ((o >> i) & 1);
          i < 8
            ? (this.modules[8][this.moduleCount - i - 1][0] = n)
            : i < 9
            ? (this.modules[8][15 - i - 1 + 1][0] = n)
            : (this.modules[8][15 - i - 1][0] = n);
        }
        this.modules[this.moduleCount - 8][8][0] = !t;
      },
      mapData: function (t, e) {
        for (
          var o = -1, i = this.moduleCount - 1, n = 7, r = 0, a = this.moduleCount - 1;
          0 < a;
          a -= 2
        )
          for (6 == a && a--; ; ) {
            for (var l, s, h = 0; h < 2; h++)
              null == this.modules[i][a - h][0] &&
                ((l = !1),
                r < t.length && (l = 1 == ((t[r] >>> n) & 1)),
                (s = v.getMask(e, i, a - h)),
                (this.modules[i][a - h][0] = l = s ? !l : l),
                -1 == --n && (r++, (n = 7)));
            if ((i += o) < 0 || this.moduleCount <= i) {
              (i -= o), (o = -o);
              break;
            }
          }
      }
    }),
    (s.PAD0 = 236),
    (s.PAD1 = 17),
    (s.createData = function (t, e, o) {
      for (var i = A.getRSBlocks(t, e), n = new S(), r = 0; r < o.length; r++) {
        var a = o[r];
        n.put(a.mode, 4), n.put(a.getLength(), v.getLengthInBits(a.mode, t)), a.write(n);
      }
      for (var l = 0, r = 0; r < i.length; r++) l += i[r].dataCount;
      if (n.getLengthInBits() > 8 * l)
        throw new Error('code length overflow. (' + n.getLengthInBits() + '>' + 8 * l + ')');
      for (n.getLengthInBits() + 4 <= 8 * l && n.put(0, 4); n.getLengthInBits() % 8 != 0; )
        n.putBit(!1);
      for (;;) {
        if (n.getLengthInBits() >= 8 * l) break;
        if ((n.put(s.PAD0, 8), n.getLengthInBits() >= 8 * l)) break;
        n.put(s.PAD1, 8);
      }
      return s.createBytes(n, i);
    }),
    (s.createBytes = function (t, e) {
      for (
        var o = 0, i = 0, n = 0, r = new Array(e.length), a = new Array(e.length), l = 0;
        l < e.length;
        l++
      ) {
        var s = e[l].dataCount,
          h = e[l].totalCount - s,
          i = Math.max(i, s),
          n = Math.max(n, h);
        r[l] = new Array(s);
        for (var u = 0; u < r[l].length; u++) r[l][u] = 255 & t.buffer[u + o];
        o += s;
        var s = v.getErrorCorrectPolynomial(h),
          d = new y(r[l], s.getLength() - 1).mod(s);
        a[l] = new Array(s.getLength() - 1);
        for (u = 0; u < a[l].length; u++) {
          var g = u + d.getLength() - a[l].length;
          a[l][u] = 0 <= g ? d.get(g) : 0;
        }
      }
      for (var c = 0, u = 0; u < e.length; u++) c += e[u].totalCount;
      for (var p = new Array(c), f = 0, u = 0; u < i; u++)
        for (l = 0; l < e.length; l++) u < r[l].length && (p[f++] = r[l][u]);
      for (u = 0; u < n; u++) for (l = 0; l < e.length; l++) u < a[l].length && (p[f++] = a[l][u]);
      return p;
    });
  for (
    var l = { MODE_NUMBER: 1, MODE_ALPHA_NUM: 2, MODE_8BIT_BYTE: 4, MODE_KANJI: 8 },
      h = { L: 1, M: 0, Q: 3, H: 2 },
      a = 0,
      d = 1,
      g = 2,
      c = 3,
      p = 4,
      f = 5,
      m = 6,
      _ = 7,
      v = {
        PATTERN_POSITION_TABLE: [
          [],
          [6, 18],
          [6, 22],
          [6, 26],
          [6, 30],
          [6, 34],
          [6, 22, 38],
          [6, 24, 42],
          [6, 26, 46],
          [6, 28, 50],
          [6, 30, 54],
          [6, 32, 58],
          [6, 34, 62],
          [6, 26, 46, 66],
          [6, 26, 48, 70],
          [6, 26, 50, 74],
          [6, 30, 54, 78],
          [6, 30, 56, 82],
          [6, 30, 58, 86],
          [6, 34, 62, 90],
          [6, 28, 50, 72, 94],
          [6, 26, 50, 74, 98],
          [6, 30, 54, 78, 102],
          [6, 28, 54, 80, 106],
          [6, 32, 58, 84, 110],
          [6, 30, 58, 86, 114],
          [6, 34, 62, 90, 118],
          [6, 26, 50, 74, 98, 122],
          [6, 30, 54, 78, 102, 126],
          [6, 26, 52, 78, 104, 130],
          [6, 30, 56, 82, 108, 134],
          [6, 34, 60, 86, 112, 138],
          [6, 30, 58, 86, 114, 142],
          [6, 34, 62, 90, 118, 146],
          [6, 30, 54, 78, 102, 126, 150],
          [6, 24, 50, 76, 102, 128, 154],
          [6, 28, 54, 80, 106, 132, 158],
          [6, 32, 58, 84, 110, 136, 162],
          [6, 26, 54, 82, 110, 138, 166],
          [6, 30, 58, 86, 114, 142, 170]
        ],
        G15: 1335,
        G18: 7973,
        G15_MASK: 21522,
        getBCHTypeInfo: function (t) {
          for (var e = t << 10; 0 <= v.getBCHDigit(e) - v.getBCHDigit(v.G15); )
            e ^= v.G15 << (v.getBCHDigit(e) - v.getBCHDigit(v.G15));
          return ((t << 10) | e) ^ v.G15_MASK;
        },
        getBCHTypeNumber: function (t) {
          for (var e = t << 12; 0 <= v.getBCHDigit(e) - v.getBCHDigit(v.G18); )
            e ^= v.G18 << (v.getBCHDigit(e) - v.getBCHDigit(v.G18));
          return (t << 12) | e;
        },
        getBCHDigit: function (t) {
          for (var e = 0; 0 != t; ) e++, (t >>>= 1);
          return e;
        },
        getPatternPosition: function (t) {
          return v.PATTERN_POSITION_TABLE[t - 1];
        },
        getMask: function (t, e, o) {
          switch (t) {
            case a:
              return (e + o) % 2 == 0;
            case d:
              return e % 2 == 0;
            case g:
              return o % 3 == 0;
            case c:
              return (e + o) % 3 == 0;
            case p:
              return (Math.floor(e / 2) + Math.floor(o / 3)) % 2 == 0;
            case f:
              return ((e * o) % 2) + ((e * o) % 3) == 0;
            case m:
              return (((e * o) % 2) + ((e * o) % 3)) % 2 == 0;
            case _:
              return (((e * o) % 3) + ((e + o) % 2)) % 2 == 0;
            default:
              throw new Error('bad maskPattern:' + t);
          }
        },
        getErrorCorrectPolynomial: function (t) {
          for (var e = new y([1], 0), o = 0; o < t; o++) e = e.multiply(new y([1, C.gexp(o)], 0));
          return e;
        },
        getLengthInBits: function (t, e) {
          if (1 <= e && e < 10)
            switch (t) {
              case l.MODE_NUMBER:
                return 10;
              case l.MODE_ALPHA_NUM:
                return 9;
              case l.MODE_8BIT_BYTE:
              case l.MODE_KANJI:
                return 8;
              default:
                throw new Error('mode:' + t);
            }
          else if (e < 27)
            switch (t) {
              case l.MODE_NUMBER:
                return 12;
              case l.MODE_ALPHA_NUM:
                return 11;
              case l.MODE_8BIT_BYTE:
                return 16;
              case l.MODE_KANJI:
                return 10;
              default:
                throw new Error('mode:' + t);
            }
          else {
            if (!(e < 41)) throw new Error('type:' + e);
            switch (t) {
              case l.MODE_NUMBER:
                return 14;
              case l.MODE_ALPHA_NUM:
                return 13;
              case l.MODE_8BIT_BYTE:
                return 16;
              case l.MODE_KANJI:
                return 12;
              default:
                throw new Error('mode:' + t);
            }
          }
        },
        getLostPoint: function (t) {
          for (var e = t.getModuleCount(), o = 0, i = 0; i < e; i++)
            for (var n = 0; n < e; n++) {
              for (var r = 0, a = t.isDark(i, n), l = -1; l <= 1; l++)
                if (!(i + l < 0 || e <= i + l))
                  for (var s = -1; s <= 1; s++)
                    n + s < 0 ||
                      e <= n + s ||
                      (0 == l && 0 == s) ||
                      (a == t.isDark(i + l, n + s) && r++);
              5 < r && (o += 3 + r - 5);
            }
          for (i = 0; i < e - 1; i++)
            for (n = 0; n < e - 1; n++) {
              var h = 0;
              t.isDark(i, n) && h++,
                t.isDark(i + 1, n) && h++,
                t.isDark(i, n + 1) && h++,
                t.isDark(i + 1, n + 1) && h++,
                (0 != h && 4 != h) || (o += 3);
            }
          for (i = 0; i < e; i++)
            for (n = 0; n < e - 6; n++)
              t.isDark(i, n) &&
                !t.isDark(i, n + 1) &&
                t.isDark(i, n + 2) &&
                t.isDark(i, n + 3) &&
                t.isDark(i, n + 4) &&
                !t.isDark(i, n + 5) &&
                t.isDark(i, n + 6) &&
                (o += 40);
          for (n = 0; n < e; n++)
            for (i = 0; i < e - 6; i++)
              t.isDark(i, n) &&
                !t.isDark(i + 1, n) &&
                t.isDark(i + 2, n) &&
                t.isDark(i + 3, n) &&
                t.isDark(i + 4, n) &&
                !t.isDark(i + 5, n) &&
                t.isDark(i + 6, n) &&
                (o += 40);
          for (var u = 0, n = 0; n < e; n++) for (i = 0; i < e; i++) t.isDark(i, n) && u++;
          return (o += 10 * (Math.abs((100 * u) / e / e - 50) / 5));
        }
      },
      C = {
        glog: function (t) {
          if (t < 1) throw new Error('glog(' + t + ')');
          return C.LOG_TABLE[t];
        },
        gexp: function (t) {
          for (; t < 0; ) t += 255;
          for (; 256 <= t; ) t -= 255;
          return C.EXP_TABLE[t];
        },
        EXP_TABLE: new Array(256),
        LOG_TABLE: new Array(256)
      },
      b = 0;
    b < 8;
    b++
  )
    C.EXP_TABLE[b] = 1 << b;
  for (b = 8; b < 256; b++)
    C.EXP_TABLE[b] =
      C.EXP_TABLE[b - 4] ^ C.EXP_TABLE[b - 5] ^ C.EXP_TABLE[b - 6] ^ C.EXP_TABLE[b - 8];
  for (b = 0; b < 255; b++) C.LOG_TABLE[C.EXP_TABLE[b]] = b;
  function y(t, e) {
    if (t.length == u) throw new Error(t.length + '/' + e);
    for (var o = 0; o < t.length && 0 == t[o]; ) o++;
    this.num = new Array(t.length - o + e);
    for (var i = 0; i < t.length - o; i++) this.num[i] = t[i + o];
  }
  function A(t, e) {
    (this.totalCount = t), (this.dataCount = e);
  }
  function S() {
    (this.buffer = []), (this.length = 0);
  }
  (y.prototype = {
    get: function (t) {
      return this.num[t];
    },
    getLength: function () {
      return this.num.length;
    },
    multiply: function (t) {
      for (
        var e = new Array(this.getLength() + t.getLength() - 1), o = 0;
        o < this.getLength();
        o++
      )
        for (var i = 0; i < t.getLength(); i++)
          e[o + i] ^= C.gexp(C.glog(this.get(o)) + C.glog(t.get(i)));
      return new y(e, 0);
    },
    mod: function (t) {
      if (this.getLength() - t.getLength() < 0) return this;
      for (
        var e = C.glog(this.get(0)) - C.glog(t.get(0)), o = new Array(this.getLength()), i = 0;
        i < this.getLength();
        i++
      )
        o[i] = this.get(i);
      for (i = 0; i < t.getLength(); i++) o[i] ^= C.gexp(C.glog(t.get(i)) + e);
      return new y(o, 0).mod(t);
    }
  }),
    (A.RS_BLOCK_TABLE = [
      [1, 26, 19],
      [1, 26, 16],
      [1, 26, 13],
      [1, 26, 9],
      [1, 44, 34],
      [1, 44, 28],
      [1, 44, 22],
      [1, 44, 16],
      [1, 70, 55],
      [1, 70, 44],
      [2, 35, 17],
      [2, 35, 13],
      [1, 100, 80],
      [2, 50, 32],
      [2, 50, 24],
      [4, 25, 9],
      [1, 134, 108],
      [2, 67, 43],
      [2, 33, 15, 2, 34, 16],
      [2, 33, 11, 2, 34, 12],
      [2, 86, 68],
      [4, 43, 27],
      [4, 43, 19],
      [4, 43, 15],
      [2, 98, 78],
      [4, 49, 31],
      [2, 32, 14, 4, 33, 15],
      [4, 39, 13, 1, 40, 14],
      [2, 121, 97],
      [2, 60, 38, 2, 61, 39],
      [4, 40, 18, 2, 41, 19],
      [4, 40, 14, 2, 41, 15],
      [2, 146, 116],
      [3, 58, 36, 2, 59, 37],
      [4, 36, 16, 4, 37, 17],
      [4, 36, 12, 4, 37, 13],
      [2, 86, 68, 2, 87, 69],
      [4, 69, 43, 1, 70, 44],
      [6, 43, 19, 2, 44, 20],
      [6, 43, 15, 2, 44, 16],
      [4, 101, 81],
      [1, 80, 50, 4, 81, 51],
      [4, 50, 22, 4, 51, 23],
      [3, 36, 12, 8, 37, 13],
      [2, 116, 92, 2, 117, 93],
      [6, 58, 36, 2, 59, 37],
      [4, 46, 20, 6, 47, 21],
      [7, 42, 14, 4, 43, 15],
      [4, 133, 107],
      [8, 59, 37, 1, 60, 38],
      [8, 44, 20, 4, 45, 21],
      [12, 33, 11, 4, 34, 12],
      [3, 145, 115, 1, 146, 116],
      [4, 64, 40, 5, 65, 41],
      [11, 36, 16, 5, 37, 17],
      [11, 36, 12, 5, 37, 13],
      [5, 109, 87, 1, 110, 88],
      [5, 65, 41, 5, 66, 42],
      [5, 54, 24, 7, 55, 25],
      [11, 36, 12, 7, 37, 13],
      [5, 122, 98, 1, 123, 99],
      [7, 73, 45, 3, 74, 46],
      [15, 43, 19, 2, 44, 20],
      [3, 45, 15, 13, 46, 16],
      [1, 135, 107, 5, 136, 108],
      [10, 74, 46, 1, 75, 47],
      [1, 50, 22, 15, 51, 23],
      [2, 42, 14, 17, 43, 15],
      [5, 150, 120, 1, 151, 121],
      [9, 69, 43, 4, 70, 44],
      [17, 50, 22, 1, 51, 23],
      [2, 42, 14, 19, 43, 15],
      [3, 141, 113, 4, 142, 114],
      [3, 70, 44, 11, 71, 45],
      [17, 47, 21, 4, 48, 22],
      [9, 39, 13, 16, 40, 14],
      [3, 135, 107, 5, 136, 108],
      [3, 67, 41, 13, 68, 42],
      [15, 54, 24, 5, 55, 25],
      [15, 43, 15, 10, 44, 16],
      [4, 144, 116, 4, 145, 117],
      [17, 68, 42],
      [17, 50, 22, 6, 51, 23],
      [19, 46, 16, 6, 47, 17],
      [2, 139, 111, 7, 140, 112],
      [17, 74, 46],
      [7, 54, 24, 16, 55, 25],
      [34, 37, 13],
      [4, 151, 121, 5, 152, 122],
      [4, 75, 47, 14, 76, 48],
      [11, 54, 24, 14, 55, 25],
      [16, 45, 15, 14, 46, 16],
      [6, 147, 117, 4, 148, 118],
      [6, 73, 45, 14, 74, 46],
      [11, 54, 24, 16, 55, 25],
      [30, 46, 16, 2, 47, 17],
      [8, 132, 106, 4, 133, 107],
      [8, 75, 47, 13, 76, 48],
      [7, 54, 24, 22, 55, 25],
      [22, 45, 15, 13, 46, 16],
      [10, 142, 114, 2, 143, 115],
      [19, 74, 46, 4, 75, 47],
      [28, 50, 22, 6, 51, 23],
      [33, 46, 16, 4, 47, 17],
      [8, 152, 122, 4, 153, 123],
      [22, 73, 45, 3, 74, 46],
      [8, 53, 23, 26, 54, 24],
      [12, 45, 15, 28, 46, 16],
      [3, 147, 117, 10, 148, 118],
      [3, 73, 45, 23, 74, 46],
      [4, 54, 24, 31, 55, 25],
      [11, 45, 15, 31, 46, 16],
      [7, 146, 116, 7, 147, 117],
      [21, 73, 45, 7, 74, 46],
      [1, 53, 23, 37, 54, 24],
      [19, 45, 15, 26, 46, 16],
      [5, 145, 115, 10, 146, 116],
      [19, 75, 47, 10, 76, 48],
      [15, 54, 24, 25, 55, 25],
      [23, 45, 15, 25, 46, 16],
      [13, 145, 115, 3, 146, 116],
      [2, 74, 46, 29, 75, 47],
      [42, 54, 24, 1, 55, 25],
      [23, 45, 15, 28, 46, 16],
      [17, 145, 115],
      [10, 74, 46, 23, 75, 47],
      [10, 54, 24, 35, 55, 25],
      [19, 45, 15, 35, 46, 16],
      [17, 145, 115, 1, 146, 116],
      [14, 74, 46, 21, 75, 47],
      [29, 54, 24, 19, 55, 25],
      [11, 45, 15, 46, 46, 16],
      [13, 145, 115, 6, 146, 116],
      [14, 74, 46, 23, 75, 47],
      [44, 54, 24, 7, 55, 25],
      [59, 46, 16, 1, 47, 17],
      [12, 151, 121, 7, 152, 122],
      [12, 75, 47, 26, 76, 48],
      [39, 54, 24, 14, 55, 25],
      [22, 45, 15, 41, 46, 16],
      [6, 151, 121, 14, 152, 122],
      [6, 75, 47, 34, 76, 48],
      [46, 54, 24, 10, 55, 25],
      [2, 45, 15, 64, 46, 16],
      [17, 152, 122, 4, 153, 123],
      [29, 74, 46, 14, 75, 47],
      [49, 54, 24, 10, 55, 25],
      [24, 45, 15, 46, 46, 16],
      [4, 152, 122, 18, 153, 123],
      [13, 74, 46, 32, 75, 47],
      [48, 54, 24, 14, 55, 25],
      [42, 45, 15, 32, 46, 16],
      [20, 147, 117, 4, 148, 118],
      [40, 75, 47, 7, 76, 48],
      [43, 54, 24, 22, 55, 25],
      [10, 45, 15, 67, 46, 16],
      [19, 148, 118, 6, 149, 119],
      [18, 75, 47, 31, 76, 48],
      [34, 54, 24, 34, 55, 25],
      [20, 45, 15, 61, 46, 16]
    ]),
    (A.getRSBlocks = function (t, e) {
      var o = A.getRsBlockTable(t, e);
      if (o == u) throw new Error('bad rs block @ typeNumber:' + t + '/errorCorrectLevel:' + e);
      for (var i = o.length / 3, n = [], r = 0; r < i; r++)
        for (var a = o[3 * r + 0], l = o[3 * r + 1], s = o[3 * r + 2], h = 0; h < a; h++)
          n.push(new A(l, s));
      return n;
    }),
    (A.getRsBlockTable = function (t, e) {
      switch (e) {
        case h.L:
          return A.RS_BLOCK_TABLE[4 * (t - 1) + 0];
        case h.M:
          return A.RS_BLOCK_TABLE[4 * (t - 1) + 1];
        case h.Q:
          return A.RS_BLOCK_TABLE[4 * (t - 1) + 2];
        case h.H:
          return A.RS_BLOCK_TABLE[4 * (t - 1) + 3];
        default:
          return u;
      }
    }),
    (S.prototype = {
      get: function (t) {
        var e = Math.floor(t / 8);
        return 1 == ((this.buffer[e] >>> (7 - (t % 8))) & 1);
      },
      put: function (t, e) {
        for (var o = 0; o < e; o++) this.putBit(1 == ((t >>> (e - o - 1)) & 1));
      },
      getLengthInBits: function () {
        return this.length;
      },
      putBit: function (t) {
        var e = Math.floor(this.length / 8);
        this.buffer.length <= e && this.buffer.push(0),
          t && (this.buffer[e] |= 128 >>> this.length % 8),
          this.length++;
      }
    });
  var w = [
    [17, 14, 11, 7],
    [32, 26, 20, 14],
    [53, 42, 32, 24],
    [78, 62, 46, 34],
    [106, 84, 60, 44],
    [134, 106, 74, 58],
    [154, 122, 86, 64],
    [192, 152, 108, 84],
    [230, 180, 130, 98],
    [271, 213, 151, 119],
    [321, 251, 177, 137],
    [367, 287, 203, 155],
    [425, 331, 241, 177],
    [458, 362, 258, 194],
    [520, 412, 292, 220],
    [586, 450, 322, 250],
    [644, 504, 364, 280],
    [718, 560, 394, 310],
    [792, 624, 442, 338],
    [858, 666, 482, 382],
    [929, 711, 509, 403],
    [1003, 779, 565, 439],
    [1091, 857, 611, 461],
    [1171, 911, 661, 511],
    [1273, 997, 715, 535],
    [1367, 1059, 751, 593],
    [1465, 1125, 805, 625],
    [1528, 1190, 868, 658],
    [1628, 1264, 908, 698],
    [1732, 1370, 982, 742],
    [1840, 1452, 1030, 790],
    [1952, 1538, 1112, 842],
    [2068, 1628, 1168, 898],
    [2188, 1722, 1228, 958],
    [2303, 1809, 1283, 983],
    [2431, 1911, 1351, 1051],
    [2563, 1989, 1423, 1093],
    [2699, 2099, 1499, 1139],
    [2809, 2213, 1579, 1219],
    [2953, 2331, 1663, 1273]
  ];
  function O() {
    var t = !1,
      e = navigator.userAgent;
    return (
      /android/i.test(e) &&
        ((t = !0),
        (e = e.toString().match(/android ([0-9]\.[0-9])/i)) && e[1] && (t = parseFloat(e[1]))),
      t
    );
  }
  var k =
    'undefined' == typeof CanvasRenderingContext2D
      ? ((L.prototype.draw = function (t) {
          var e = this._htOption,
            o = this._el,
            i = t.getModuleCount(),
            n = Math.round(e.width / i),
            r = Math.round((e.height - e.titleHeight) / i),
            a =
              (r <= 1 && (r = 1),
              (this._htOption.width = (n = n <= 1 ? 1 : n) * i),
              (this._htOption.height = r * i + e.titleHeight),
              (this._htOption.quietZone = Math.round(this._htOption.quietZone)),
              []),
            l = '',
            s = Math.round(n * e.dotScale),
            h = Math.round(r * e.dotScale),
            u = (s < 4 && (h = s = 4), e.colorDark),
            d = e.colorLight;
          e.backgroundImage &&
            (e.autoColor
              ? ((e.colorDark =
                  "rgba(0, 0, 0, .6);filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr='#99000000', EndColorStr='#99000000');"),
                (e.colorLight =
                  "rgba(255, 255, 255, .7);filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr='#B2FFFFFF', EndColorStr='#B2FFFFFF');"))
              : (e.colorLight = 'rgba(0,0,0,0)'),
            (_ =
              '<div style="display:inline-block; z-index:-10;position:absolute;"><img src="' +
              e.backgroundImage +
              '" widht="' +
              (e.width + 2 * e.quietZone) +
              '" height="' +
              (e.height + 2 * e.quietZone) +
              '" style="opacity:' +
              e.backgroundImageAlpha +
              ';filter:alpha(opacity=' +
              100 * e.backgroundImageAlpha +
              '); "/></div>'),
            a.push(_)),
            e.quietZone &&
              (l =
                'display:inline-block; width:' +
                (e.width + 2 * e.quietZone) +
                'px; height:' +
                (e.width + 2 * e.quietZone) +
                'px;background:' +
                e.quietZoneColor +
                '; text-align:center;'),
            a.push('<div style="font-size:0;' + l + '">'),
            a.push(
              '<table  style="font-size:0;border:0;border-collapse:collapse; margin-top:' +
                e.quietZone +
                'px;" border="0" cellspacing="0" cellspadding="0" align="center" valign="middle">'
            ),
            a.push(
              '<tr height="' +
                e.titleHeight +
                '" align="center"><td style="border:0;border-collapse:collapse;margin:0;padding:0" colspan="' +
                i +
                '">'
            ),
            e.title &&
              ((_ = e.titleColor),
              (l = e.titleFont),
              a.push(
                '<div style="width:100%;margin-top:' +
                  e.titleTop +
                  'px;color:' +
                  _ +
                  ';font:' +
                  l +
                  ';background:' +
                  e.titleBackgroundColor +
                  '">' +
                  e.title +
                  '</div>'
              )),
            e.subTitle &&
              a.push(
                '<div style="width:100%;margin-top:' +
                  (e.subTitleTop - e.titleTop) +
                  'px;color:' +
                  e.subTitleColor +
                  '; font:' +
                  e.subTitleFont +
                  '">' +
                  e.subTitle +
                  '</div>'
              ),
            a.push('</td></tr>');
          for (var g = 0; g < i; g++) {
            a.push('<tr style="border:0; padding:0; margin:0;" height="7">');
            for (var c = 0; c < i; c++) {
              var p = t.isDark(g, c),
                f = t.getEye(g, c);
              f
                ? ((p = f.isDark),
                  (f = e[(f = f.type)] || e[f.substring(0, 2)] || u),
                  a.push(
                    '<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' +
                      n +
                      'px;height:' +
                      r +
                      'px;"><span style="width:' +
                      n +
                      'px;height:' +
                      r +
                      'px;background-color:' +
                      (p ? f : d) +
                      ';display:inline-block"></span></td>'
                  ))
                : ((f = e.colorDark),
                  6 == g
                    ? ((f = e.timing_H || e.timing || u),
                      a.push(
                        '<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' +
                          n +
                          'px;height:' +
                          r +
                          'px;background-color:' +
                          (p ? f : d) +
                          ';"></td>'
                      ))
                    : 6 == c
                    ? ((f = e.timing_V || e.timing || u),
                      a.push(
                        '<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' +
                          n +
                          'px;height:' +
                          r +
                          'px;background-color:' +
                          (p ? f : d) +
                          ';"></td>'
                      ))
                    : a.push(
                        '<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' +
                          n +
                          'px;height:' +
                          r +
                          'px;"><div style="display:inline-block;width:' +
                          s +
                          'px;height:' +
                          h +
                          'px;background-color:' +
                          (p ? f : e.colorLight) +
                          ';"></div></td>'
                      ));
            }
            a.push('</tr>');
          }
          a.push('</table>'),
            a.push('</div>'),
            e.logo &&
              ((_ = new Image()),
              null != e.crossOrigin && (_.crossOrigin = e.crossOrigin),
              (_.src = e.logo),
              (l = e.width / 3.5) != (_ = e.height / 3.5) && (l = _),
              e.logoWidth && (l = e.logoWidth),
              e.logoHeight && (_ = e.logoHeight),
              (m =
                'position:relative; z-index:1;display:table-cell;top:-' +
                ((e.height - e.titleHeight) / 2 + _ / 2 + e.quietZone) +
                'px;text-align:center; width:' +
                l +
                'px; height:' +
                _ +
                'px;line-height:' +
                l +
                'px; vertical-align: middle;'),
              e.logoBackgroundTransparent || (m += 'background:' + e.logoBackgroundColor),
              a.push(
                '<div style="' +
                  m +
                  '"><img  src="' +
                  e.logo +
                  '"  style="max-width: ' +
                  l +
                  'px; max-height: ' +
                  _ +
                  'px;" /> <div style=" display: none; width:1px;margin-left: -1px;"></div></div>'
              )),
            e.onRenderingStart && e.onRenderingStart(e),
            (o.innerHTML = a.join(''));
          var m = o.childNodes[0],
            l = (e.width - m.offsetWidth) / 2,
            _ = (e.height - m.offsetHeight) / 2;
          0 < l && 0 < _ && (m.style.margin = _ + 'px ' + l + 'px'),
            this._htOption.onRenderingEnd && this._htOption.onRenderingEnd(this._htOption, null);
        }),
        (L.prototype.clear = function () {
          this._el.innerHTML = '';
        }),
        L)
      : (function () {
          function t() {
            if ('svg' == this._htOption.drawer) {
              var t = this._oContext.getSerializedSvg(!0);
              (this.dataURL = t), (this._el.innerHTML = t);
            } else
              try {
                var e = this._elCanvas.toDataURL('image/png');
                this.dataURL = e;
              } catch (t) {
                console.error(t);
              }
            this._htOption.onRenderingEnd &&
              (this.dataURL ||
                console.error(
                  "Can not get base64 data, please check: 1. Published the page and image to the server 2. The image request support CORS 3. Configured `crossOrigin:'anonymous'` option"
                ),
              this._htOption.onRenderingEnd(this._htOption, this.dataURL));
          }
          var u, d;
          i._android &&
            i._android <= 2.1 &&
            ((u = 1 / window.devicePixelRatio),
            (d = CanvasRenderingContext2D.prototype.drawImage),
            (CanvasRenderingContext2D.prototype.drawImage = function (t, e, o, i, n, r, a, l, s) {
              if ('nodeName' in t && /img/i.test(t.nodeName))
                for (var h = arguments.length - 1; 1 <= h; h--) arguments[h] = arguments[h] * u;
              else
                void 0 === l &&
                  ((arguments[1] *= u),
                  (arguments[2] *= u),
                  (arguments[3] *= u),
                  (arguments[4] *= u));
              d.apply(this, arguments);
            }));
          function e(t, e) {
            (this._bIsPainted = !1),
              (this._android = O()),
              (this._el = t),
              (this._htOption = e),
              'svg' == this._htOption.drawer
                ? ((this._oContext = {}), (this._elCanvas = {}))
                : ((this._elCanvas = document.createElement('canvas')),
                  this._el?.appendChild(this._elCanvas),
                  (this._oContext = this._elCanvas.getContext('2d'))),
              (this._bSupportDataURI = null),
              (this.dataURL = null);
          }
          return (
            (e.prototype.draw = function (o) {
              var i,
                g = this._htOption,
                c =
                  (g.title || g.subTitle || ((g.height -= g.titleHeight), (g.titleHeight = 0)),
                  o.getModuleCount()),
                p = Math.round(g.width / c),
                f = Math.round((g.height - g.titleHeight) / c),
                m =
                  (p <= 1 && (p = 1),
                  f <= 1 && (f = 1),
                  (g.width = p * c),
                  (g.height = f * c + g.titleHeight),
                  (g.quietZone = Math.round(g.quietZone)),
                  (this._elCanvas.width = g.width + 2 * g.quietZone),
                  (this._elCanvas.height = g.height + 2 * g.quietZone),
                  'canvas' != this._htOption.drawer &&
                    (this._oContext = new C2S(this._elCanvas.width, this._elCanvas.height)),
                  this.clear(),
                  this._oContext),
                n =
                  ((m.lineWidth = 0),
                  (m.fillStyle = g.colorLight),
                  m.fillRect(0, 0, this._elCanvas.width, this._elCanvas.height),
                  this);
              function _() {
                0 < g.quietZone &&
                  g.quietZoneColor &&
                  ((m.lineWidth = 0),
                  (m.fillStyle = g.quietZoneColor),
                  m.fillRect(0, 0, n._elCanvas.width, g.quietZone),
                  m.fillRect(0, g.quietZone, g.quietZone, n._elCanvas.height - 2 * g.quietZone),
                  m.fillRect(
                    n._elCanvas.width - g.quietZone,
                    g.quietZone,
                    g.quietZone,
                    n._elCanvas.height - 2 * g.quietZone
                  ),
                  m.fillRect(0, n._elCanvas.height - g.quietZone, n._elCanvas.width, g.quietZone));
              }
              function r(t) {
                g.onRenderingStart && g.onRenderingStart(g);
                for (var h, u, e = 0; e < c; e++)
                  for (var o = 0; o < c; o++) {
                    var i,
                      n,
                      r = o * p + g.quietZone,
                      a = e * f + g.quietZone,
                      l = t.isDark(e, o),
                      s = t.getEye(e, o),
                      d = g.dotScale;
                    (m.lineWidth = 0),
                      s
                        ? ((i = g[s.type] || g[s.type.substring(0, 2)] || g.colorDark),
                          (n = g.colorLight))
                        : g.backgroundImage
                        ? ((n = 'rgba(0,0,0,0)'),
                          6 == e
                            ? g.autoColor
                              ? ((i = g.timing_H || g.timing || g.autoColorDark),
                                (n = g.autoColorLight))
                              : (i = g.timing_H || g.timing || g.colorDark)
                            : 6 == o
                            ? g.autoColor
                              ? ((i = g.timing_V || g.timing || g.autoColorDark),
                                (n = g.autoColorLight))
                              : (i = g.timing_V || g.timing || g.colorDark)
                            : g.autoColor
                            ? ((i = g.autoColorDark), (n = g.autoColorLight))
                            : (i = g.colorDark))
                        : ((i =
                            6 == e
                              ? g.timing_H || g.timing || g.colorDark
                              : (6 == o && (g.timing_V || g.timing)) || g.colorDark),
                          (n = g.colorLight)),
                      (m.strokeStyle = l ? i : n),
                      (m.fillStyle = l ? i : n),
                      s
                        ? ((d = 'AO' == s.type ? g.dotScaleAO : 'AI' == s.type ? g.dotScaleAI : 1),
                          g.backgroundImage && g.autoColor
                            ? ((i = ('AO' == s.type ? g.AI : g.AO) || g.autoColorDark),
                              (n = g.autoColorLight))
                            : (i = ('AO' == s.type ? g.AI : g.AO) || i),
                          s.isDark)
                        : 6 == e
                        ? (d = g.dotScaleTiming_H)
                        : 6 == o
                        ? (d = g.dotScaleTiming_V)
                        : g.backgroundImage,
                      m.fillRect(
                        r + (p * (1 - d)) / 2,
                        g.titleHeight + a + (f * (1 - d)) / 2,
                        p * d,
                        f * d
                      ),
                      1 == g.dotScale || s || (m.strokeStyle = g.colorLight);
                  }
                g.title &&
                  ((m.fillStyle = g.titleBackgroundColor),
                  m.fillRect(0, 0, this._elCanvas.width, g.titleHeight + g.quietZone),
                  (m.font = g.titleFont),
                  (m.fillStyle = g.titleColor),
                  (m.textAlign = 'center'),
                  m.fillText(g.title, this._elCanvas.width / 2, +g.quietZone + g.titleTop)),
                  g.subTitle &&
                    ((m.font = g.subTitleFont),
                    (m.fillStyle = g.subTitleColor),
                    m.fillText(g.subTitle, this._elCanvas.width / 2, +g.quietZone + g.subTitleTop)),
                  g.logo
                    ? ((h = new Image()),
                      (u = this),
                      (h.onload = function () {
                        var t, e, o, i, n, r, a, l, s;
                        (t = h),
                          (e = Math.round(g.width / 3.5)),
                          (o = Math.round(g.height / 3.5)),
                          e !== o && (e = o),
                          g.logoMaxWidth
                            ? (e = Math.round(g.logoMaxWidth))
                            : g.logoWidth && (e = Math.round(g.logoWidth)),
                          g.logoMaxHeight
                            ? (o = Math.round(g.logoMaxHeight))
                            : g.logoHeight && (o = Math.round(g.logoHeight)),
                          (l =
                            void 0 === t.naturalWidth
                              ? ((a = t.width), t.height)
                              : ((a = t.naturalWidth), t.naturalHeight)),
                          (g.logoMaxWidth || g.logoMaxHeight) &&
                            (g.logoMaxWidth && a <= e && (e = a),
                            g.logoMaxHeight && l <= o && (o = l),
                            a <= e && l <= o && ((e = a), (o = l))),
                          (i = (g.width + 2 * g.quietZone - e) / 2),
                          (n = (g.height + g.titleHeight + 2 * g.quietZone - o) / 2),
                          (r = Math.min(e / a, o / l)),
                          (a *= r),
                          (l *= r),
                          (g.logoMaxWidth || g.logoMaxHeight) &&
                            ((i = (g.width + 2 * g.quietZone - (e = a)) / 2),
                            (n = (g.height + g.titleHeight + 2 * g.quietZone - (o = l)) / 2)),
                          g.logoBackgroundTransparent ||
                            ((m.fillStyle = g.logoBackgroundColor), m.fillRect(i, n, e, o)),
                          (r = m.imageSmoothingQuality),
                          (s = m.imageSmoothingEnabled),
                          (m.imageSmoothingEnabled = !0),
                          (m.imageSmoothingQuality = 'high'),
                          m.drawImage(t, i + (e - a) / 2, n + (o - l) / 2, a, l),
                          (m.imageSmoothingEnabled = s),
                          (m.imageSmoothingQuality = r),
                          _(),
                          (u._bIsPainted = !0),
                          u.makeImage();
                      }),
                      (h.onerror = function (t) {
                        console.error(t);
                      }),
                      null != g.crossOrigin && (h.crossOrigin = g.crossOrigin),
                      (h.originalSrc = g.logo),
                      (h.src = g.logo))
                    : (_(), (this._bIsPainted = !0), this.makeImage());
              }
              g.backgroundImage
                ? (((i = new Image()).onload = function () {
                    (m.globalAlpha = 1), (m.globalAlpha = g.backgroundImageAlpha);
                    var t = m.imageSmoothingQuality,
                      e = m.imageSmoothingEnabled;
                    (m.imageSmoothingEnabled = !0),
                      (m.imageSmoothingQuality = 'high'),
                      m.drawImage(
                        i,
                        0,
                        g.titleHeight,
                        g.width + 2 * g.quietZone,
                        g.height + 2 * g.quietZone - g.titleHeight
                      ),
                      (m.imageSmoothingEnabled = e),
                      (m.imageSmoothingQuality = t),
                      (m.globalAlpha = 1),
                      r.call(n, o);
                  }),
                  null != g.crossOrigin && (i.crossOrigin = g.crossOrigin),
                  (i.originalSrc = g.backgroundImage),
                  (i.src = g.backgroundImage))
                : r.call(n, o);
            }),
            (e.prototype.makeImage = function () {
              this._bIsPainted &&
                !function (t, e) {
                  var o = this;
                  (o._fFail = e),
                    (o._fSuccess = t),
                    null === o._bSupportDataURI
                      ? (((e = document.createElement('img')).onabort = t =
                          function () {
                            (o._bSupportDataURI = !1), o._fFail && o._fFail.call(o);
                          }),
                        (e.onerror = t),
                        (e.onload = function () {
                          (o._bSupportDataURI = !0), o._fSuccess && o._fSuccess.call(o);
                        }),
                        (e.src =
                          'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='))
                      : !0 === o._bSupportDataURI && o._fSuccess
                      ? o._fSuccess.call(o)
                      : !1 === o._bSupportDataURI && o._fFail && o._fFail.call(o);
                }.call(this, t);
            }),
            (e.prototype.isPainted = function () {
              return this._bIsPainted;
            }),
            (e.prototype.clear = function () {
              this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height),
                (this._bIsPainted = !1);
            }),
            (e.prototype.remove = function () {
              this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height),
                (this._bIsPainted = !1),
                (this._el.innerHTML = '');
            }),
            (e.prototype.round = function (t) {
              return t && Math.floor(1e3 * t) / 1e3;
            }),
            e
          );
        })();
  function L(t, e) {
    (this._el = t), (this._htOption = e);
  }
  function T(t, e) {
    for (
      var o,
        i = e.correctLevel,
        n = 1,
        r =
          ((t = t),
          (o = encodeURI(t)
            .toString()
            .replace(/\%[0-9a-fA-F]{2}/g, 'a')).length + (o.length != t.length ? 3 : 0)),
        a = 0,
        l = w.length;
      a < l;
      a++
    ) {
      var s = 0;
      switch (i) {
        case h.L:
          s = w[a][0];
          break;
        case h.M:
          s = w[a][1];
          break;
        case h.Q:
          s = w[a][2];
          break;
        case h.H:
          s = w[a][3];
      }
      if (r <= s) break;
      n++;
    }
    if (w.length < n)
      throw new Error(
        'Too long data. the CorrectLevel.' + ['M', 'L', 'H', 'Q'][i] + ' limit length is ' + s
      );
    return (
      0 != e.version &&
        (n <= e.version
          ? (n = e.version)
          : console.warn('QR Code version ' + e.version + ' too small, run version use ' + n),
        (e.runVersion = n)),
      n
    );
  }
  ((t = function (t, e) {
    if (
      ((this._htOption = {
        width: 256,
        height: 256,
        typeNumber: 4,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: h.H,
        dotScale: 1,
        dotScaleTiming: 1,
        dotScaleTiming_H: u,
        dotScaleTiming_V: u,
        dotScaleA: 1,
        dotScaleAO: u,
        dotScaleAI: u,
        quietZone: 0,
        quietZoneColor: 'rgba(0,0,0,0)',
        title: '',
        titleFont: 'normal normal bold 16px Arial',
        titleColor: '#000000',
        titleBackgroundColor: '#ffffff',
        titleHeight: 0,
        titleTop: 30,
        subTitle: '',
        subTitleFont: 'normal normal normal 14px Arial',
        subTitleColor: '#4F4F4F',
        subTitleTop: 60,
        logo: u,
        logoWidth: u,
        logoHeight: u,
        logoMaxWidth: u,
        logoMaxHeight: u,
        logoBackgroundColor: '#ffffff',
        logoBackgroundTransparent: !1,
        PO: u,
        PI: u,
        PO_TL: u,
        PI_TL: u,
        PO_TR: u,
        PI_TR: u,
        PO_BL: u,
        PI_BL: u,
        AO: u,
        AI: u,
        timing: u,
        timing_H: u,
        timing_V: u,
        backgroundImage: u,
        backgroundImageAlpha: 1,
        autoColor: !1,
        autoColorDark: 'rgba(0, 0, 0, .6)',
        autoColorLight: 'rgba(255, 255, 255, .7)',
        onRenderingStart: u,
        onRenderingEnd: u,
        version: 0,
        tooltip: !1,
        binary: !1,
        drawer: 'canvas',
        crossOrigin: null,
        utf8WithoutBOM: !0
      }),
      (e = 'string' == typeof e ? { text: e } : e))
    )
      for (var o in e) this._htOption[o] = e[o];
    (this._htOption.version < 0 || 40 < this._htOption.version) &&
      (console.warn("QR Code version '" + this._htOption.version + "' is invalidate, reset to 0"),
      (this._htOption.version = 0)),
      (this._htOption.dotScale < 0 || 1 < this._htOption.dotScale) &&
        (console.warn(
          this._htOption.dotScale +
            ' , is invalidate, dotScale must greater than 0, less than or equal to 1, now reset to 1. '
        ),
        (this._htOption.dotScale = 1)),
      (this._htOption.dotScaleTiming < 0 || 1 < this._htOption.dotScaleTiming) &&
        (console.warn(
          this._htOption.dotScaleTiming +
            ' , is invalidate, dotScaleTiming must greater than 0, less than or equal to 1, now reset to 1. '
        ),
        (this._htOption.dotScaleTiming = 1)),
      this._htOption.dotScaleTiming_H
        ? (this._htOption.dotScaleTiming_H < 0 || 1 < this._htOption.dotScaleTiming_H) &&
          (console.warn(
            this._htOption.dotScaleTiming_H +
              ' , is invalidate, dotScaleTiming_H must greater than 0, less than or equal to 1, now reset to 1. '
          ),
          (this._htOption.dotScaleTiming_H = 1))
        : (this._htOption.dotScaleTiming_H = this._htOption.dotScaleTiming),
      this._htOption.dotScaleTiming_V
        ? (this._htOption.dotScaleTiming_V < 0 || 1 < this._htOption.dotScaleTiming_V) &&
          (console.warn(
            this._htOption.dotScaleTiming_V +
              ' , is invalidate, dotScaleTiming_V must greater than 0, less than or equal to 1, now reset to 1. '
          ),
          (this._htOption.dotScaleTiming_V = 1))
        : (this._htOption.dotScaleTiming_V = this._htOption.dotScaleTiming),
      (this._htOption.dotScaleA < 0 || 1 < this._htOption.dotScaleA) &&
        (console.warn(
          this._htOption.dotScaleA +
            ' , is invalidate, dotScaleA must greater than 0, less than or equal to 1, now reset to 1. '
        ),
        (this._htOption.dotScaleA = 1)),
      this._htOption.dotScaleAO
        ? (this._htOption.dotScaleAO < 0 || 1 < this._htOption.dotScaleAO) &&
          (console.warn(
            this._htOption.dotScaleAO +
              ' , is invalidate, dotScaleAO must greater than 0, less than or equal to 1, now reset to 1. '
          ),
          (this._htOption.dotScaleAO = 1))
        : (this._htOption.dotScaleAO = this._htOption.dotScaleA),
      this._htOption.dotScaleAI
        ? (this._htOption.dotScaleAI < 0 || 1 < this._htOption.dotScaleAI) &&
          (console.warn(
            this._htOption.dotScaleAI +
              ' , is invalidate, dotScaleAI must greater than 0, less than or equal to 1, now reset to 1. '
          ),
          (this._htOption.dotScaleAI = 1))
        : (this._htOption.dotScaleAI = this._htOption.dotScaleA),
      (this._htOption.backgroundImageAlpha < 0 || 1 < this._htOption.backgroundImageAlpha) &&
        (console.warn(
          this._htOption.backgroundImageAlpha +
            ' , is invalidate, backgroundImageAlpha must between 0 and 1, now reset to 1. '
        ),
        (this._htOption.backgroundImageAlpha = 1)),
      (this._htOption.height = this._htOption.height + this._htOption.titleHeight),
      'string' == typeof t && (t = document.getElementById(t)),
      (this._htOption.drawer &&
        ('svg' == this._htOption.drawer || 'canvas' == this._htOption.drawer)) ||
        (this._htOption.drawer = 'canvas'),
      (this._android = O()),
      (this._el = t),
      (this._oQRCode = null);
    var i = {};
    for (o in this._htOption) i[o] = this._htOption[o];
    (this._oDrawing = new k(this._el, i)),
      this._htOption.text && this.makeCode(this._htOption.text);
  }).prototype.makeCode = function (t) {
    (this._oQRCode = new s(T(t, this._htOption), this._htOption.correctLevel)),
      this._oQRCode.addData(t, this._htOption.binary, this._htOption.utf8WithoutBOM),
      this._oQRCode.make(),
      this._htOption.tooltip && (this._el.title = t),
      this._oDrawing.draw(this._oQRCode);
  }),
    (t.prototype.makeImage = function () {
      'function' == typeof this._oDrawing.makeImage &&
        (!this._android || 3 <= this._android) &&
        this._oDrawing.makeImage();
    }),
    (t.prototype.clear = function () {
      this._oDrawing.remove();
    }),
    (t.prototype.resize = function (t, e) {
      (this._oDrawing._htOption.width = t),
        (this._oDrawing._htOption.height = e),
        this._oDrawing.draw(this._oQRCode);
    }),
    (t.prototype.noConflict = function () {
      return i.QRCode === this && (i.QRCode = n), t;
    }),
    (t.CorrectLevel = h),
    'function' == typeof define && (define.amd || define.cmd)
      ? define([], function () {
          return t;
        })
      : o
      ? (((o.exports = t).QRCode = t), (e.QRCode = t))
      : (i.QRCode = t);
}
var version = '2.2.1',
  formatVersion = version.replace(/\./g, '_');
QRCode(),
  (window.AF_SMART_SCRIPT = {
    generateOneLinkURL: function () {
      var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : { afParameters: {} },
        e = t.oneLinkURL,
        o = t.afParameters,
        i = (o = void 0 === o ? {} : o).mediaSource,
        n = o.campaign,
        r = o.channel,
        a = o.ad,
        l = o.adSet,
        s = o.deepLinkValue,
        h = o.afSub1,
        u = o.afSub2,
        d = o.afSub3,
        g = o.afSub4,
        c = o.afSub5,
        p = o.afCustom,
        f = o.googleClickIdKey,
        o = t.referrerSkipList,
        o = void 0 === o ? [] : o,
        t = t.urlSkipList,
        t = void 0 === t ? [] : t,
        m = null == (m = e || '') ? void 0 : m.toString().match(AF_URL_SCHEME);
      if (!m || (null == m ? void 0 : m.length) < VALID_AF_URL_PARTS_LENGTH)
        return (
          console.error(
            "oneLinkURL is missing or not in the correct format, can't generate URL",
            e
          ),
          null
        );
      if (
        0 === (null == i || null == (m = i.keys) ? void 0 : m.length) &&
        (null == i || !i.defaultValue)
      )
        return (
          console.error(
            "mediaSource is missing (default value was not supplied), can't generate URL",
            i
          ),
          null
        );
      if (
        isSkippedURL({
          url: document.referrer,
          skipKeys: o,
          errorMsg: 'Generate url is skipped. HTTP referrer contains key:'
        })
      )
        return null;
      if (
        isSkippedURL({
          url: document.URL,
          skipKeys: t,
          errorMsg: 'Generate url is skipped. URL contains string:'
        })
      )
        return null;
      var _,
        v = { af_js_web: !0, af_ss_ver: window.AF_SMART_SCRIPT.version },
        C = getURLParametersKV(window.location.search);
      if (i) {
        m = getParameterValue(C, i);
        if (!m)
          return (
            console.error(
              "mediaSource was not found in the URL and default value was not supplied, can't generate URL",
              i
            ),
            null
          );
        v.pid = m;
      }
      n && (v.c = getParameterValue(C, n)),
        r && (v.af_channel = getParameterValue(C, r)),
        a && (v.af_ad = getParameterValue(C, a)),
        l && (v.af_adset = getParameterValue(C, l)),
        s && (v.deep_link_value = getParameterValue(C, s)),
        [h, u, d, g, c].forEach(function (t, e) {
          t && (v['af_sub'.concat(e + 1)] = getParameterValue(C, t));
        }),
        f &&
          (GCLID_EXCLUDE_PARAMS_KEYS.find(function (t) {
            return t === f;
          })
            ? console.debug("Google Click Id ParamKey can't override AF Parameters keys", f)
            : ((_ = getGoogleClickIdParameters(f, C)),
              Object.keys(_).forEach(function (t) {
                v[t] = _[t];
              }))),
        Array.isArray(p) &&
          p.forEach(function (e) {
            var t;
            null != e &&
              e.paramKey &&
              ((t = AF_CUSTOM_EXCLUDE_PARAMS_KEYS.find(function (t) {
                return t === (null == e ? void 0 : e.paramKey);
              })),
              (null == e ? void 0 : e.paramKey) === f || t
                ? console.debug(
                    "Custom parameter ParamKey can't override Google-Click-Id or AF Parameters keys",
                    e
                  )
                : (v[[e.paramKey]] = getParameterValue(C, e)));
          });
      var b = e + stringifyParameters(v).replace('&', '?'),
        y =
          (console.debug('Generated OneLink URL', b),
          (window.AF_SMART_SCRIPT.displayQrCode = function (t) {
            return b
              ? new QRCode(document.getElementById(t), { text: ''.concat(b, '&af_ss_qr=true') })
              : (console.debug('ClickURL is not valid'), null);
          }),
          (function () {
            if (!b) return console.debug('ClickURL is not valid'), null;
            var t = new URL(b);
            return (t.hostname = 'impressions.onelink.me'), t.href;
          })());
      return (
        y &&
          (window.AF_SMART_SCRIPT.fireImpressionsLink = function () {
            var t = new Image(1, 1);
            (t.style.display = 'none'),
              (t.style.position = 'absolute'),
              (t.style.left = '-1px'),
              (t.style.top = '-1px'),
              (t.src = y);
          }),
        { clickURL: b }
      );
    },
    version: formatVersion
  });

//Initializing Smart Script arguments
var oneLinkURL =
  window.location.hostname === 'localhost'
    ? `https://expitradev.onelink.me/qyHH`
    : window.location.hostname === 'dev.app.expitra.com'
    ? `https://expitradev.onelink.me/KPCq`
    : `https://expitra.onelink.me/42Yx`;
var mediaSource = { defaultValue: 'any_source' };
var custom_ss_ui = { paramKey: 'af_ss_ui', defaultValue: 'true' };

//Onelink URL is generated.
var result = window?.AF_SMART_SCRIPT?.generateOneLinkURL({
  oneLinkURL: oneLinkURL,
  afParameters: {
    mediaSource: mediaSource,
    afCustom: [custom_ss_ui]
  }
});

if (result) {
  var resultUrl = result.clickURL;
  document.getElementById('andrd_link')?.setAttribute('href', resultUrl);
  document.getElementById('ios_link')?.setAttribute('href', resultUrl);
  window.AF_SMART_SCRIPT?.displayQrCode('my_qr_code_div_id');
}

// If needed, you can download the script from: https://onelinksmartscript.appsflyer.com/onelink-smart-script-latest.js

// See an example of implementation and how to place the URL result behind a CTA on your website: https://appsflyersdk.github.io/appsflyer-onelink-smart-script/examples/utm_parameters.html?utm_campaign=mycmpn&utm_source=mysource

// See an example of how to display a QR code: https://appsflyersdk.github.io/appsflyer-onelink-smart-script/examples/qr_code.html?inmedia=my_email&incmp=my_campaign
