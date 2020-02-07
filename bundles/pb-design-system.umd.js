(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@ng-bootstrap/ng-bootstrap'), require('d3'), require('topojson'), require('@angular/forms'), require('@angular/material/radio')) :
    typeof define === 'function' && define.amd ? define('pb-design-system', ['exports', '@angular/core', '@angular/common', '@ng-bootstrap/ng-bootstrap', 'd3', 'topojson', '@angular/forms', '@angular/material/radio'], factory) :
    (global = global || self, factory(global['pb-design-system'] = {}, global.ng.core, global.ng.common, global['^5']['1']['0'], global['^5']['9']['0'], global['^3']['0']['0'], global.ng.forms, global.ng.material.radio));
}(this, (function (exports, core, common, ngBootstrap, d3, topojson, forms, radio) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PbdsDatavizService = /** @class */ (function () {
        function PbdsDatavizService() {
            var _this = this;
            this.colors = {
                classic: {
                    full: [
                        '#B70077',
                        '#0384D4',
                        '#EE6B0B',
                        '#A319B1',
                        '#11A611',
                        '#1BB9FF',
                        '#495A9C',
                        '#EDB700',
                        '#8B98C8',
                        '#E6C49C',
                        '#CCB8CE',
                        '#9B9B9B'
                    ],
                    mono: ['#001D56', '#003296', '#4B74C5', '#89A1D0', '#A3BCEE', '#C9D7F3'] // blue
                },
                twilight: {
                    full: [
                        '#A319B1',
                        '#11A611',
                        '#1BB9FF',
                        '#EE6B0B',
                        '#B70077',
                        '#0384D4',
                        '#495A9C',
                        '#EDB700',
                        '#8B98C8',
                        '#E6C49C',
                        '#CCB8CE',
                        '#9B9B9B'
                    ],
                    mono: ['#05395C', '#0A5B92', '#0072B8', '#5DA9DC', '#A5D4F3', '#D1EDFF'] // light blue
                },
                ocean: {
                    full: [
                        '#0384D4',
                        '#B70077',
                        '#1BB9FF',
                        '#495A9C',
                        '#EDB700',
                        '#A319B1',
                        '#EE6B0B',
                        '#11A611',
                        '#8B98C8',
                        '#E6C49C',
                        '#CCB8CE',
                        '#9B9B9B'
                    ],
                    mono: ['#394B4D', '#3A6B6E', '#14767D', '#99BFC2', '#C9E6E8', '#DEECED'] // blue-green
                },
                sunset: {
                    full: [
                        '#B70077',
                        '#EE6B0B',
                        '#1BB9FF',
                        '#EDB700',
                        '#11A611',
                        '#A319B1',
                        '#0384D4',
                        '#CCB8CE',
                        '#495A9C',
                        '#E6C49C',
                        '#8B98C8',
                        '#9B9B9B'
                    ],
                    mono: ['#31254A', '#50248F', '#7945C4', '#9A79E2', '#C4A8FF', '#D9C7FF'] // purple
                }
            };
            this.getColors = (/**
             * @param {?=} mono
             * @param {?=} theme
             * @return {?}
             */
            function (mono, theme) {
                if (mono === void 0) { mono = false; }
                if (theme === void 0) { theme = 'classic'; }
                return mono ? _this.colors[theme].mono : _this.colors[theme].full;
            });
            this.createGradientDefs = (/**
             * @param {?} svg
             * @param {?=} mono
             * @param {?=} theme
             * @param {?=} vertical
             * @return {?}
             */
            function (svg, mono, theme, vertical) {
                if (mono === void 0) { mono = false; }
                if (theme === void 0) { theme = 'classic'; }
                if (vertical === void 0) { vertical = true; }
                /** @type {?} */
                var colors = mono ? [_this.colors[theme].mono[2]] : _this.colors[theme].full;
                for (var i = 0; i < colors.length; i++) {
                    /** @type {?} */
                    var color = mono ? _this.colors[theme].mono[2] : _this.colors[theme].full[i];
                    /** @type {?} */
                    var gradient = void 0;
                    if (vertical) {
                        gradient = svg
                            .append('defs')
                            .append('linearGradient')
                            .attr('id', "gradient-" + color.replace('#', ''))
                            .attr('x1', '0')
                            .attr('y1', '0')
                            .attr('x2', '0')
                            .attr('y2', '1')
                            .attr('spreadMethod', 'pad');
                        gradient
                            .append('stop')
                            .attr('offset', '0%')
                            .attr('stop-color', color)
                            .attr('stop-opacity', '1'); // top of bar will be full opacity
                        gradient
                            .append('stop')
                            .attr('offset', '100%')
                            .attr('stop-color', color)
                            .attr('stop-opacity', '.3'); // bottom of bar will be .3 opacity
                    }
                    else {
                        gradient = svg
                            .append('defs')
                            .append('linearGradient')
                            .attr('id', "gradient-horizontal-" + color.replace('#', ''))
                            .attr('x1', '1')
                            .attr('y1', '0')
                            .attr('x2', '0')
                            .attr('y2', '0')
                            .attr('spreadMethod', 'pad');
                        gradient
                            .append('stop')
                            .attr('offset', '0%')
                            .attr('stop-color', color)
                            .attr('stop-opacity', '1'); // top of bar will be full opacity
                        gradient
                            .append('stop')
                            .attr('offset', '100%')
                            .attr('stop-color', color)
                            .attr('stop-opacity', '.3'); // bottom of bar will be .3 opacity
                    }
                }
                return colors;
            });
            this.createGlowFilter = (/**
             * @param {?} svg
             * @return {?}
             */
            function (svg) {
                // add a new definition
                /** @type {?} */
                var glow = svg
                    .append('defs')
                    .append('filter')
                    .attr('id', 'glow')
                    .attr('width', '200%')
                    .attr('height', '200%');
                glow
                    .append('feGaussianBlur')
                    .attr('in', 'SourceGraphic')
                    .attr('stdDeviation', 4);
                // build two dropshadows with different intensities
                /** @type {?} */
                var feOffsets = [
                    {
                        dy: 2,
                        slope: 0.2
                    },
                    {
                        dy: 5,
                        slope: 0.05
                    }
                ];
                for (var i = 0; i < feOffsets.length; i++) {
                    glow
                        .append('feOffset')
                        .attr('result', 'offsetBlur' + i)
                        .attr('dx', 0)
                        .attr('dy', feOffsets[i].dy);
                }
                for (var y = 0; y < feOffsets.length; y++) {
                    glow
                        .append('feComponentTransfer')
                        .attr('result', 'coloredBlur' + y)
                        .attr('in', 'offsetBlur' + y)
                        .append('feFuncA')
                        .attr('type', 'linear')
                        .attr('slope', feOffsets[y].slope);
                }
                /** @type {?} */
                var merge = glow.append('feMerge');
                merge.append('feMergeNode').attr('in', 'SourceGraphic');
                for (var x = 0; x < feOffsets.length; x++) {
                    merge.append('feMergeNode').attr('in', 'coloredBlur' + x);
                }
            });
        }
        /**
         * @param {?} type
         * @param {?} string
         * @return {?}
         */
        PbdsDatavizService.prototype.d3Format = /**
         * @param {?} type
         * @param {?} string
         * @return {?}
         */
        function (type, string) {
            /** @type {?} */
            var format$1;
            switch (type) {
                case 'number':
                    format$1 = d3.format(string);
                    break;
                case 'time':
                    format$1 = d3.timeFormat(string);
                    break;
                default:
                    format$1 = null;
                    break;
            }
            return format$1;
        };
        PbdsDatavizService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        PbdsDatavizService.ctorParameters = function () { return []; };
        /** @nocollapse */ PbdsDatavizService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function PbdsDatavizService_Factory() { return new PbdsDatavizService(); }, token: PbdsDatavizService, providedIn: "root" });
        return PbdsDatavizService;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizService.prototype.colors;
        /** @type {?} */
        PbdsDatavizService.prototype.getColors;
        /** @type {?} */
        PbdsDatavizService.prototype.createGradientDefs;
        /** @type {?} */
        PbdsDatavizService.prototype.createGlowFilter;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PbdsDatavizPieComponent = /** @class */ (function () {
        function PbdsDatavizPieComponent(_dataviz, _element) {
            var _this = this;
            this._dataviz = _dataviz;
            this._element = _element;
            this.chartClass = true;
            this.pieClass = true;
            this.width = 300;
            this.type = 'pie';
            this.monochrome = false;
            this.legendLabelFormatType = null;
            this.legendLabelFormatString = '';
            this.legendValueFormatString = '';
            this.tooltipLabelFormatType = null;
            this.tooltipLabelFormatString = '';
            this.tooltipValueFormatString = '';
            this.hovered = new core.EventEmitter();
            this.clicked = new core.EventEmitter();
            this.currentData = [];
            this.updateChart = (/**
             * @param {?=} firstRun
             * @return {?}
             */
            function (firstRun) {
                if (firstRun === void 0) { firstRun = true; }
                // slices
                _this.svg
                    .selectAll('path')
                    .data(_this.pie(_this.data))
                    .join((/**
                 * @param {?} enter
                 * @return {?}
                 */
                function (enter) {
                    /** @type {?} */
                    var path = enter.append('path');
                    path
                        .each((/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return (d.outerRadius = _this.outerRadius); }))
                        .attr('fill', (/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return _this.colorRange(d.data.label); }))
                        .attr('class', 'slice')
                        .each((/**
                     * @param {?} d
                     * @param {?} i
                     * @param {?} nodes
                     * @return {?}
                     */
                    function (d, i, nodes) {
                        _this.currentData.splice(i, 1, d);
                    }));
                    if (_this.type === 'pie') {
                        path
                            .style('stroke', '#fff')
                            .style('stroke-width', 2)
                            .style('stroke-alignment', 'inner');
                    }
                    path.call((/**
                     * @param {?} path
                     * @return {?}
                     */
                    function (path) {
                        return path
                            .transition()
                            .duration((/**
                         * @param {?} d
                         * @param {?} i
                         * @param {?} n
                         * @return {?}
                         */
                        function (d, i, n) { return (firstRun ? 0 : 500); }))
                            .attrTween('d', _this.arcEnterTween);
                    }));
                    return path;
                }), (/**
                 * @param {?} update
                 * @return {?}
                 */
                function (update) {
                    _this.tooltipHide();
                    update
                        .each((/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return (d.outerRadius = _this.outerRadius); }))
                        .call((/**
                     * @param {?} update
                     * @return {?}
                     */
                    function (update) {
                        return update
                            .transition()
                            .duration(500)
                            .attrTween('d', _this.arcTween);
                    }));
                    return update;
                }), (/**
                 * @param {?} exit
                 * @return {?}
                 */
                function (exit) { return exit.remove(); }))
                    .on('mouseover', (/**
                 * @param {?} data
                 * @param {?} index
                 * @param {?} nodes
                 * @return {?}
                 */
                function (data, index, nodes) {
                    _this.pathMouseOver(d3.event, data, index, nodes);
                    // this.tooltipShow(this.chart.node(), data);
                }))
                    .on('mousemove', (/**
                 * @param {?} data
                 * @param {?} index
                 * @param {?} nodes
                 * @return {?}
                 */
                function (data, index, nodes) {
                    _this.tooltipShow(_this.chart.node(), data);
                    _this.tooltipMove(_this.chart.node());
                }))
                    .on('mouseout', (/**
                 * @param {?} data
                 * @param {?} index
                 * @param {?} nodes
                 * @return {?}
                 */
                function (data, index, nodes) {
                    _this.pathMouseOut(data, index, nodes);
                    _this.tooltipHide();
                }))
                    .on('click', (/**
                 * @param {?} data
                 * @param {?} index
                 * @param {?} nodes
                 * @return {?}
                 */
                function (data, index, nodes) {
                    _this.pathClick(d3.event, data, index, nodes);
                }));
                // legend
                _this.chart
                    .select('.legend')
                    .selectAll('.legend-item')
                    .data(_this.data)
                    .join((/**
                 * @param {?} enter
                 * @return {?}
                 */
                function (enter) {
                    /** @type {?} */
                    var li = enter.append('li').attr('class', 'legend-item');
                    li.append('span')
                        .attr('class', 'legend-key')
                        .style('background-color', (/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return _this.colorRange(d.label); }));
                    /** @type {?} */
                    var description = li.append('span').attr('class', 'legend-description');
                    description
                        .append('span')
                        .attr('class', 'legend-label')
                        .html((/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) {
                        switch (_this.legendLabelFormatType) {
                            case 'time':
                                /** @type {?} */
                                var parsedTime = d3.isoParse(d.label);
                                return _this.legendLabelFormat(parsedTime);
                            default:
                                return d.label;
                        }
                    }));
                    description
                        .append('span')
                        .attr('class', 'legend-value')
                        .html((/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return _this.legendValueFormat(d.value); }));
                    return li;
                }), (/**
                 * @param {?} update
                 * @return {?}
                 */
                function (update) {
                    update.selectAll('.legend-key').style('background-color', (/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return _this.colorRange(d.label); }));
                    update.select('.legend-label').html((/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) {
                        switch (_this.legendLabelFormatType) {
                            case 'time':
                                /** @type {?} */
                                var parsedTime = d3.isoParse(d.label);
                                return _this.legendLabelFormat(parsedTime);
                            default:
                                return d.label;
                        }
                    }));
                    update.select('.legend-value').html((/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return _this.legendValueFormat(d.value); }));
                    return update;
                }), (/**
                 * @param {?} exit
                 * @return {?}
                 */
                function (exit) { return exit.remove(); }))
                    .on('mouseover focus', (/**
                 * @param {?} data
                 * @param {?} index
                 * @param {?} nodes
                 * @return {?}
                 */
                function (data, index, nodes) {
                    _this.legendMouseOverFocus(data, index, nodes);
                    _this.pathMouseOver(d3.event, data, index, nodes);
                }))
                    .on('mouseout blur', (/**
                 * @param {?} data
                 * @param {?} index
                 * @param {?} nodes
                 * @return {?}
                 */
                function (data, index, nodes) {
                    _this.legendMouseOutBlur(data, index, nodes);
                    _this.pathMouseOut(data, index, nodes);
                }))
                    .on('click', (/**
                 * @param {?} data
                 * @param {?} index
                 * @param {?} nodes
                 * @return {?}
                 */
                function (data, index, nodes) {
                    _this.clicked.emit({ event: d3.event, data: data });
                }));
            });
            this.arcEnterTween = (/**
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (data, index, nodes) {
                /** @type {?} */
                var i = d3.interpolate(data.startAngle, data.endAngle);
                return (/**
                 * @param {?} t
                 * @return {?}
                 */
                function (t) {
                    data.endAngle = i(t);
                    return _this.arc(data);
                });
            });
            this.arcTween = (/**
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (data, index, nodes) {
                // console.log('ARGS: ', data, index, nodes);
                /** @type {?} */
                var i = d3.interpolate(_this.currentData[index], data);
                _this.currentData[index] = i(1);
                return (/**
                 * @param {?} t
                 * @return {?}
                 */
                function (t) { return _this.arc(i(t)); });
            });
            this.arcExitTween = (/**
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (data, index, nodes) {
                /** @type {?} */
                var end = Object.assign({}, _this.currentData[index], { startAngle: _this.currentData[index].endAngle });
                /** @type {?} */
                var i = d3.interpolate(data, end);
                return (/**
                 * @param {?} t
                 * @return {?}
                 */
                function (t) {
                    return _this.arc(i(t));
                });
            });
            this.arcMouseOverTween = (/**
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (data, index, nodes) {
                /** @type {?} */
                var i = d3.interpolate(data.outerRadius, _this.outerRadius + _this.arcZoom);
                return (/**
                 * @param {?} t
                 * @return {?}
                 */
                function (t) {
                    data.outerRadius = i(t);
                    return _this.arc(data);
                });
            });
            this.arcMouseOutTween = (/**
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (data, index, nodes) {
                /** @type {?} */
                var i = d3.interpolate(data.outerRadius, _this.outerRadius);
                return (/**
                 * @param {?} t
                 * @return {?}
                 */
                function (t) {
                    data.outerRadius = i(t);
                    return _this.arc(data);
                });
            });
            this.legendMouseOverFocus = (/**
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (data, index, nodes) {
                _this.chart
                    .selectAll('.legend-item')
                    .filter((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return i !== index; }))
                    .classed('inactive', true);
            });
            this.legendMouseOutBlur = (/**
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (data, index, nodes) {
                _this.chart.selectAll('.legend-item').classed('inactive', false);
            });
            this.pathMouseOver = (/**
             * @param {?} event
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (event, data, index, nodes) {
                /** @type {?} */
                var slices = _this.chart.selectAll('.slice');
                /** @type {?} */
                var slice = slices.filter((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return i === index; }));
                _this.chart
                    .selectAll('.legend-item')
                    .filter((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return i !== index; }))
                    .classed('inactive', true);
                slices.filter((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return i !== index; })).classed('inactive', true);
                slice
                    .transition()
                    .duration(300)
                    .delay(0)
                    .attrTween('d', _this.arcMouseOverTween);
                _this.hovered.emit({
                    event: event,
                    data: data.data ? data.data : data // legend hover data is different than slice hover data
                });
            });
            this.pathMouseOut = (/**
             * @param {?} data
             * @param {?} index
             * @param {?} value
             * @return {?}
             */
            function (data, index, value) {
                /** @type {?} */
                var slices = _this.chart.selectAll('.slice');
                /** @type {?} */
                var slice = slices.filter((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return i === index; }));
                _this.chart
                    .selectAll('.legend-item')
                    .filter((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return i !== index; }))
                    .classed('inactive', false);
                slices.classed('inactive', false);
                slice
                    .transition()
                    .duration(300)
                    .delay(0)
                    .attrTween('d', _this.arcMouseOutTween);
            });
            this.pathClick = (/**
             * @param {?} event
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (event, data, index, nodes) {
                _this.clicked.emit({
                    event: event,
                    data: data.data
                });
            });
            this.tooltipShow = (/**
             * @param {?} node
             * @param {?} data
             * @return {?}
             */
            function (node, data) {
                _this.tooltipSetPosition(node);
                /** @type {?} */
                var percentage = (data.endAngle - data.startAngle) / (2 * Math.PI);
                /** @type {?} */
                var label;
                switch (_this.tooltipLabelFormatType) {
                    case 'time':
                        /** @type {?} */
                        var parsedTime = d3.isoParse(data.data.label);
                        label = _this.tooltipLabelFormat(parsedTime);
                        break;
                    default:
                        label = data.data.label;
                }
                _this.tooltip.html("\n        <div class=\"tooltip-label\">" + label + "</div>\n        <div class=\"tooltip-value\">" + _this.tooltipValueFormat(percentage) + "</div>\n      ");
                _this.tooltip.style('opacity', 1);
            });
            this.tooltipMove = (/**
             * @param {?} node
             * @return {?}
             */
            function (node) {
                _this.tooltipSetPosition(node);
            });
            this.tooltipHide = (/**
             * @return {?}
             */
            function () {
                _this.tooltip.style('opacity', 0);
            });
            this.tooltipSetPosition = (/**
             * @param {?} node
             * @return {?}
             */
            function (node) {
                /** @type {?} */
                var coordinates = d3.mouse(node);
                _this.tooltip.style('left', coordinates[0] + 16 + "px");
                _this.tooltip.style('top', coordinates[1] + 16 + "px");
            });
        }
        /**
         * @return {?}
         */
        PbdsDatavizPieComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.margin = { top: 10, right: 10, bottom: 10, left: 10 };
            this.width = this.width - this.margin.left - this.margin.right;
            this.height = this.width - this.margin.top - this.margin.bottom;
            this.colors = this._dataviz.getColors(this.monochrome, this.theme);
            this.innerRadius = Math.min(this.width, this.height) / 2.5;
            this.outerRadius = Math.min(this.width, this.height) / 2;
            this.arcZoom = 10;
            this.anglePad = 0.02;
            this.legendValueFormat = d3.format(this.legendValueFormatString);
            this.tooltipValueFormat = d3.format(this.tooltipValueFormatString);
            // create formatters
            this.legendLabelFormat = this._dataviz.d3Format(this.legendLabelFormatType, this.legendLabelFormatString);
            this.tooltipLabelFormat = this._dataviz.d3Format(this.tooltipLabelFormatType, this.tooltipLabelFormatString);
            this.colorRange = d3.scaleOrdinal()
                .range(this.colors)
                .domain(this.data.map((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return c.label; })));
            if (this.type === 'pie') {
                this.innerRadius = 0;
                this.anglePad = 0;
            }
            this.pie = d3.pie()
                .padAngle(this.anglePad)
                .value((/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return d.value; }))
                .sort(null);
            this.arc = d3.arc()
                .padRadius(this.outerRadius)
                .innerRadius(this.innerRadius);
            this.chart = d3.select(this._element.nativeElement).attr('aria-hidden', 'true');
            this.svg = this.chart
                .append('svg')
                .attr('width', this.width)
                .attr('height', this.height)
                .attr('class', 'img-fluid')
                .attr('preserveAspectRatio', 'xMinYMin meet')
                .attr('viewBox', "-" + (this.width / 2 + this.margin.left) + " -" + (this.height / 2 + this.margin.top) + " " + (this.width +
                this.margin.left +
                this.margin.right) + " " + (this.height + this.margin.top + this.margin.bottom));
            this.chart.append('ul').attr('class', 'legend legend-right');
            this.tooltip = this.chart
                .append('div')
                .style('opacity', 0)
                .attr('class', 'pbds-tooltip')
                .attr('aria-hidden', 'true');
            this.updateChart();
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        PbdsDatavizPieComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes.data && !changes.data.firstChange) {
                this.updateChart(false);
            }
        };
        /**
         * @return {?}
         */
        PbdsDatavizPieComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            if (this.tooltip)
                this.tooltip.remove();
        };
        PbdsDatavizPieComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pbds-dataviz-pie',
                        template: "",
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        PbdsDatavizPieComponent.ctorParameters = function () { return [
            { type: PbdsDatavizService },
            { type: core.ElementRef }
        ]; };
        PbdsDatavizPieComponent.propDecorators = {
            chartClass: [{ type: core.HostBinding, args: ['class.pbds-chart',] }],
            pieClass: [{ type: core.HostBinding, args: ['class.pbds-chart-pie',] }],
            data: [{ type: core.Input }],
            width: [{ type: core.Input }],
            type: [{ type: core.Input }],
            monochrome: [{ type: core.Input }],
            legendLabelFormatType: [{ type: core.Input }],
            legendLabelFormatString: [{ type: core.Input }],
            legendValueFormatString: [{ type: core.Input }],
            tooltipLabelFormatType: [{ type: core.Input }],
            tooltipLabelFormatString: [{ type: core.Input }],
            tooltipValueFormatString: [{ type: core.Input }],
            theme: [{ type: core.Input }],
            hovered: [{ type: core.Output }],
            clicked: [{ type: core.Output }]
        };
        return PbdsDatavizPieComponent;
    }());
    if (false) {
        /** @type {?} */
        PbdsDatavizPieComponent.prototype.chartClass;
        /** @type {?} */
        PbdsDatavizPieComponent.prototype.pieClass;
        /** @type {?} */
        PbdsDatavizPieComponent.prototype.data;
        /** @type {?} */
        PbdsDatavizPieComponent.prototype.width;
        /** @type {?} */
        PbdsDatavizPieComponent.prototype.type;
        /** @type {?} */
        PbdsDatavizPieComponent.prototype.monochrome;
        /** @type {?} */
        PbdsDatavizPieComponent.prototype.legendLabelFormatType;
        /** @type {?} */
        PbdsDatavizPieComponent.prototype.legendLabelFormatString;
        /** @type {?} */
        PbdsDatavizPieComponent.prototype.legendValueFormatString;
        /** @type {?} */
        PbdsDatavizPieComponent.prototype.tooltipLabelFormatType;
        /** @type {?} */
        PbdsDatavizPieComponent.prototype.tooltipLabelFormatString;
        /** @type {?} */
        PbdsDatavizPieComponent.prototype.tooltipValueFormatString;
        /** @type {?} */
        PbdsDatavizPieComponent.prototype.theme;
        /** @type {?} */
        PbdsDatavizPieComponent.prototype.hovered;
        /** @type {?} */
        PbdsDatavizPieComponent.prototype.clicked;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizPieComponent.prototype.currentData;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizPieComponent.prototype.height;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizPieComponent.prototype.chart;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizPieComponent.prototype.margin;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizPieComponent.prototype.colors;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizPieComponent.prototype.colorRange;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizPieComponent.prototype.arc;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizPieComponent.prototype.arcZoom;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizPieComponent.prototype.svg;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizPieComponent.prototype.pie;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizPieComponent.prototype.legendLabelFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizPieComponent.prototype.legendValueFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizPieComponent.prototype.innerRadius;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizPieComponent.prototype.anglePad;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizPieComponent.prototype.outerRadius;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizPieComponent.prototype.tooltip;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizPieComponent.prototype.tooltipLabelFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizPieComponent.prototype.tooltipValueFormat;
        /** @type {?} */
        PbdsDatavizPieComponent.prototype.updateChart;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizPieComponent.prototype.arcEnterTween;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizPieComponent.prototype.arcTween;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizPieComponent.prototype.arcExitTween;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizPieComponent.prototype.arcMouseOverTween;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizPieComponent.prototype.arcMouseOutTween;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizPieComponent.prototype.legendMouseOverFocus;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizPieComponent.prototype.legendMouseOutBlur;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizPieComponent.prototype.pathMouseOver;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizPieComponent.prototype.pathMouseOut;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizPieComponent.prototype.pathClick;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizPieComponent.prototype.tooltipShow;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizPieComponent.prototype.tooltipMove;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizPieComponent.prototype.tooltipHide;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizPieComponent.prototype.tooltipSetPosition;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizPieComponent.prototype._dataviz;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizPieComponent.prototype._element;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PbdsDatavizBarComponent = /** @class */ (function () {
        function PbdsDatavizBarComponent(_dataviz, _element, _scroll, _location) {
            var _this = this;
            this._dataviz = _dataviz;
            this._element = _element;
            this._scroll = _scroll;
            this._location = _location;
            this.chartClass = true;
            this.barClass = true;
            this.width = 306;
            this.height = 400;
            this.type = 'medium'; // debug to show all chart options
            // debug to show all chart options
            this.singleSeries = false;
            this.xAxisFormatType = null;
            this.xAxisFormatString = '';
            this.xAxisTitle = null;
            this.yAxisFormatType = null;
            this.yAxisFormatString = '';
            this.yAxisTicks = 5;
            this.yAxisMinBuffer = 0.01;
            this.yAxisMaxBuffer = 0.01;
            this.hideLegend = false;
            this.legendWidth = 105 + 28; // hardcoded legend width + left margin, do not document until feedback
            // hardcoded legend width + left margin, do not document until feedback
            this.legendPosition = 'right';
            this.legendLabelFormatType = null;
            this.legendLabelFormatString = '';
            this.tooltipLabelFormatType = null;
            this.tooltipLabelFormatString = '';
            this.tooltipValueFormatType = null;
            this.tooltipValueFormatString = '';
            this.marginTop = 10; // hardcoded on purpose, do not document until feedback
            // hardcoded on purpose, do not document until feedback
            this.marginRight = 0; // hardcoded on purpose, do not document until feedback
            // hardcoded on purpose, do not document until feedback
            this.marginBottom = 30; // hardcoded on purpose, do not document until feedback
            // hardcoded on purpose, do not document until feedback
            this.marginLeft = 55; // hardcoded on purpose, do not document until feedback
            // hardcoded on purpose, do not document until feedback
            this.threshold = null;
            this.thresholdLabel = 'Threshold';
            this.average = null;
            this.averageLabel = 'Average';
            this.hovered = new core.EventEmitter();
            this.clicked = new core.EventEmitter();
            this.updateChart = (/**
             * @return {?}
             */
            function () {
                // update the xScale
                _this.xAxisScale.domain(_this.data.map((/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return d.label; })));
                // update the yScale
                _this.yAxisScale
                    .domain([
                    d3.min(_this.data, (/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return d.value - d.value * +_this.yAxisMinBuffer; })),
                    d3.max(_this.data, (/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return d.value + d.value * +_this.yAxisMaxBuffer; }))
                ])
                    .rangeRound([_this.height, 0])
                    .nice();
                _this.xAxis
                    .transition()
                    .duration(1000)
                    .call(_this.xAxisCall);
                _this.yAxis
                    .transition()
                    .duration(1000)
                    .call(_this.yAxisCall);
                // update the grids
                if (!_this.hideXGrid) {
                    _this.xGrid
                        .transition()
                        .duration(1000)
                        .call(_this.xGridCall);
                }
                if (!_this.hideYGrid) {
                    _this.yGrid
                        .transition()
                        .duration(1000)
                        .call(_this.yGridCall);
                }
                if (!_this.hideGrayBars) {
                    // gray bars
                    _this.svg
                        .selectAll('.gray-bar')
                        .data(_this.data)
                        .join((/**
                     * @param {?} enter
                     * @return {?}
                     */
                    function (enter) {
                        return enter
                            .append('rect')
                            .attr('class', 'gray-bar')
                            .attr('height', 0)
                            .attr('x', (/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return _this.xAxisScale(d.label); }))
                            .attr('width', _this.xAxisScale.bandwidth())
                            .call((/**
                         * @param {?} enter
                         * @return {?}
                         */
                        function (enter) {
                            return enter
                                .transition()
                                .duration(500)
                                .attr('height', _this.height);
                        }));
                    }), (/**
                     * @param {?} update
                     * @return {?}
                     */
                    function (update) {
                        return update
                            .transition()
                            .duration(1000)
                            .attr('x', (/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return _this.xAxisScale(d.label); }))
                            .attr('width', _this.xAxisScale.bandwidth());
                    }), (/**
                     * @param {?} exit
                     * @return {?}
                     */
                    function (exit) {
                        return exit
                            .transition()
                            .attr('pointer-events', 'none')
                            .remove();
                    }));
                    // color bars
                    _this.svg
                        .selectAll('.bar')
                        .data(_this.data)
                        .join((/**
                     * @param {?} enter
                     * @return {?}
                     */
                    function (enter) {
                        return enter
                            .append('rect')
                            .attr('class', 'bar')
                            .attr('fill', (/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return "url(" + _this._location.path() + "#gradient-" + _this.colorRange(d.label).substr(1) + ")"; })) // removes hash to prevent safari bug;
                            .attr('x', (/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return _this.xAxisScale(d.label) + _this.xAxisScale.bandwidth() / 4; }))
                            .attr('width', _this.xAxisScale.bandwidth() / 2)
                            .attr('y', _this.height)
                            .attr('height', 0)
                            .attr('pointer-events', 'none')
                            .call((/**
                         * @param {?} enter
                         * @return {?}
                         */
                        function (enter) {
                            return enter
                                .transition()
                                .duration(1000)
                                .attr('y', (/**
                             * @param {?} d
                             * @return {?}
                             */
                            function (d) { return _this.yAxisScale(d.value); }))
                                .attr('height', (/**
                             * @param {?} d
                             * @return {?}
                             */
                            function (d) { return _this.height - _this.yAxisScale(d.value); }))
                                .attr('data-color', (/**
                             * @param {?} d
                             * @return {?}
                             */
                            function (d) { return _this.colorRange(d.label); }))
                                .transition()
                                .attr('pointer-events', 'auto');
                        }));
                    }), (/**
                     * @param {?} update
                     * @return {?}
                     */
                    function (update) {
                        return update
                            .attr('pointer-events', 'none')
                            .transition()
                            .duration(1000)
                            .attr('x', (/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return _this.xAxisScale(d.label) + _this.xAxisScale.bandwidth() / 4; }))
                            .attr('width', _this.xAxisScale.bandwidth() / 2)
                            .attr('height', (/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return _this.height - _this.yAxisScale(d.value); }))
                            .attr('y', (/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return _this.yAxisScale(d.value); }))
                            .transition()
                            .attr('pointer-events', 'auto');
                    }), (/**
                     * @param {?} exit
                     * @return {?}
                     */
                    function (exit) {
                        return exit
                            .transition()
                            .attr('pointer-events', 'none')
                            .remove();
                    }))
                        .on('mouseover', (/**
                     * @param {?} data
                     * @param {?} index
                     * @param {?} nodes
                     * @return {?}
                     */
                    function (data, index, nodes) { return _this.barMouseOver(d3.event, data, index, nodes); }))
                        .on('mouseout', (/**
                     * @param {?} data
                     * @param {?} index
                     * @param {?} nodes
                     * @return {?}
                     */
                    function (data, index, nodes) { return _this.barMouseOut(); }))
                        .on('click', (/**
                     * @param {?} data
                     * @param {?} index
                     * @param {?} nodes
                     * @return {?}
                     */
                    function (data, index, nodes) { return _this.barMouseClick(d3.event, data, index, nodes); }));
                }
                else {
                    // color bars
                    _this.svg
                        .selectAll('.bar')
                        .data(_this.data)
                        .join((/**
                     * @param {?} enter
                     * @return {?}
                     */
                    function (enter) {
                        return enter
                            .append('rect')
                            .attr('class', 'bar')
                            .attr('fill', (/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return "url(" + _this._location.path() + "#gradient-" + _this.colorRange(d.label).substr(1) + ")"; }))
                            .attr('x', (/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return _this.xAxisScale(d.label) + _this.xAxisScale.bandwidth() / 5.5; }))
                            .attr('width', _this.xAxisScale.bandwidth() / 1.5)
                            .attr('y', _this.height)
                            .attr('height', 0)
                            .attr('pointer-events', 'none')
                            .call((/**
                         * @param {?} enter
                         * @return {?}
                         */
                        function (enter) {
                            return enter
                                .transition()
                                .duration(1000)
                                .attr('y', (/**
                             * @param {?} d
                             * @return {?}
                             */
                            function (d) { return _this.yAxisScale(d.value); }))
                                .attr('height', (/**
                             * @param {?} d
                             * @return {?}
                             */
                            function (d) { return _this.height - _this.yAxisScale(d.value); }))
                                .attr('data-color', (/**
                             * @param {?} d
                             * @return {?}
                             */
                            function (d) { return _this.colorRange(d.label); }))
                                .transition()
                                .attr('pointer-events', 'auto');
                        }));
                    }), (/**
                     * @param {?} update
                     * @return {?}
                     */
                    function (update) {
                        return update
                            .attr('pointer-events', 'none')
                            .transition()
                            .duration(1000)
                            .attr('x', (/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return _this.xAxisScale(d.label) + _this.xAxisScale.bandwidth() / 5.5; }))
                            .attr('width', _this.xAxisScale.bandwidth() / 1.5)
                            .attr('height', (/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return _this.height - _this.yAxisScale(d.value); }))
                            .attr('y', (/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return _this.yAxisScale(d.value); }))
                            .transition()
                            .attr('pointer-events', 'auto');
                    }), (/**
                     * @param {?} exit
                     * @return {?}
                     */
                    function (exit) {
                        return exit
                            .transition()
                            .attr('pointer-events', 'none')
                            .remove();
                    }))
                        .on('mouseover', (/**
                     * @param {?} data
                     * @param {?} index
                     * @param {?} nodes
                     * @return {?}
                     */
                    function (data, index, nodes) { return _this.barMouseOver(d3.event, data, index, nodes); }))
                        .on('mouseout', (/**
                     * @param {?} data
                     * @param {?} index
                     * @param {?} nodes
                     * @return {?}
                     */
                    function (data, index, nodes) { return _this.barMouseOut(); }))
                        .on('click', (/**
                     * @param {?} data
                     * @param {?} index
                     * @param {?} nodes
                     * @return {?}
                     */
                    function (data, index, nodes) { return _this.barMouseClick(d3.event, data, index, nodes); }));
                }
                if (!_this.hideLegend) {
                    _this.chart
                        .select('.legend')
                        .selectAll('.legend-item')
                        .data(_this.data)
                        .join((/**
                     * @param {?} enter
                     * @return {?}
                     */
                    function (enter) {
                        /** @type {?} */
                        var li = enter.insert('li', 'li.legend-static').attr('class', 'legend-item');
                        li.append('span')
                            .attr('class', 'legend-key')
                            .style('background-color', (/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return _this.colorRange(d.label); }));
                        li.append('span')
                            .attr('class', 'legend-label')
                            .html((/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) {
                            switch (_this.legendLabelFormatType) {
                                case 'number':
                                    return _this.legendLabelFormat(d.label);
                                case 'time':
                                    /** @type {?} */
                                    var parsedTime = d3.isoParse(d.label);
                                    return _this.legendLabelFormat(parsedTime);
                                default:
                                    return d.label;
                            }
                        }));
                        return li;
                    }), (/**
                     * @param {?} update
                     * @return {?}
                     */
                    function (update) {
                        return update.select('.legend-label').html((/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) {
                            switch (_this.legendLabelFormatType) {
                                case 'number':
                                    return _this.legendLabelFormat(d.label);
                                case 'time':
                                    /** @type {?} */
                                    var parsedTime = d3.isoParse(d.label);
                                    return _this.legendLabelFormat(parsedTime);
                                default:
                                    return d.label;
                            }
                        }));
                    }), (/**
                     * @param {?} exit
                     * @return {?}
                     */
                    function (exit) { return exit.remove(); }))
                        .on('mouseover', (/**
                     * @param {?} data
                     * @param {?} index
                     * @param {?} nodes
                     * @return {?}
                     */
                    function (data, index, nodes) { return _this.legendMouseOver(d3.event, data, index, nodes); }))
                        .on('mouseout', (/**
                     * @return {?}
                     */
                    function () { return _this.legendMouseOut(); }))
                        .on('click', (/**
                     * @param {?} data
                     * @param {?} index
                     * @param {?} nodes
                     * @return {?}
                     */
                    function (data, index, nodes) { return _this.legendMouseClick(d3.event, data, index, nodes); }));
                }
                if (_this.threshold) {
                    _this.yThreshold
                        .raise()
                        .transition()
                        .duration(1000)
                        .attr('transform', "translate(0,  " + _this.yAxisScale(+_this.threshold) + ")");
                }
                if (_this.average) {
                    _this.yAverage
                        .raise()
                        .transition()
                        .duration(1000)
                        .attr('transform', "translate(0,  " + _this.yAxisScale(+_this.average) + ")");
                }
            });
            this.barMouseOver = (/**
             * @param {?} event
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (event, data, index, nodes) {
                _this.chart
                    .selectAll('.bar')
                    .filter((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return i !== index; }))
                    .classed('inactive', true);
                /** @type {?} */
                var bar = _this.chart.selectAll('.bar').filter((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return i === index; }));
                /** @type {?} */
                var barColor = bar.attr('data-color');
                bar.style('fill', barColor);
                _this.chart
                    .selectAll('.legend-item')
                    .filter((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return i !== index; }))
                    .classed('inactive', true);
                _this.tooltipShow(data, nodes.filter((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return i === index; }))[0]);
                _this.hovered.emit({ event: event, data: data });
            });
            this.barMouseOut = (/**
             * @return {?}
             */
            function () {
                _this.chart
                    .selectAll('.bar')
                    .classed('inactive', false)
                    .style('fill', null);
                _this.chart.selectAll('.legend-item').classed('inactive', false);
                _this.tooltipHide();
            });
            this.barMouseClick = (/**
             * @param {?} event
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (event, data, index, nodes) {
                _this.clicked.emit({ event: event, data: data });
            });
            this.legendMouseOver = (/**
             * @param {?} event
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (event, data, index, nodes) {
                _this.chart
                    .selectAll('.legend-item')
                    .filter((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return i !== index; }))
                    .classed('inactive', true);
                _this.chart
                    .selectAll('.bar')
                    .filter((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return i !== index; }))
                    .classed('inactive', true);
                /** @type {?} */
                var bar = _this.chart.selectAll('.bar').filter((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return i === index; }));
                /** @type {?} */
                var barColor = bar.attr('data-color');
                bar.style('fill', barColor);
                _this.tooltipShow(data, _this.chart
                    .selectAll('.bar')
                    .filter((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return i === index; }))
                    .node());
                _this.hovered.emit({ event: event, data: data });
            });
            this.legendMouseOut = (/**
             * @return {?}
             */
            function () {
                _this.chart.selectAll('.legend-item').classed('inactive', false);
                _this.chart
                    .selectAll('.bar')
                    .classed('inactive', false)
                    .style('fill', null);
                _this.tooltipHide();
            });
            this.legendMouseClick = (/**
             * @param {?} event
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (event, data, index, nodes) {
                _this.clicked.emit({ event: event, data: data });
            });
            this.tooltipShow = (/**
             * @param {?} data
             * @param {?} node
             * @return {?}
             */
            function (data, node) {
                /** @type {?} */
                var dimensions = node.getBoundingClientRect();
                /** @type {?} */
                var scroll = _this._scroll.getScrollPosition();
                /** @type {?} */
                var label;
                switch (_this.tooltipLabelFormatType) {
                    case 'number':
                        label = _this.tooltipLabelFormat(data.label);
                        break;
                    case 'time':
                        /** @type {?} */
                        var parsedTime = d3.isoParse(data.label);
                        label = _this.tooltipLabelFormat(parsedTime);
                        break;
                    default:
                        label = data.label;
                }
                /** @type {?} */
                var value = _this.tooltipValueFormat === null
                    ? "<div class=\"tooltip-value\">" + data.value + "</div>"
                    : "<div class=\"tooltip-value\">" + _this.tooltipValueFormat(data.value) + "</div>";
                _this.tooltip.html("\n        " + (_this.hideTooltipLabel ? '' : "" + label) + "\n        " + value + "\n      ");
                /** @type {?} */
                var tooltipOffsetWidth = +_this.tooltip.node().offsetWidth / 2;
                /** @type {?} */
                var tooltipOffsetHeight = +_this.tooltip.node().offsetHeight + 8;
                _this.tooltip.style('top', +scroll[1] + +dimensions.top - tooltipOffsetHeight + "px"); //
                _this.tooltip.style('left', +scroll[0] + +dimensions.left - tooltipOffsetWidth + +dimensions.width / 2 + "px");
                _this.tooltip.style('opacity', 1);
            });
            this.tooltipHide = (/**
             * @return {?}
             */
            function () {
                _this.tooltip.style('opacity', 0);
            });
            this.xAxisFormatter = (/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                switch (_this.xAxisFormatType) {
                    case 'number':
                        return _this.xAxisFormat(item);
                    case 'time':
                        /** @type {?} */
                        var parseDate = d3.isoParse(item);
                        return _this.xAxisFormat(parseDate);
                    default:
                        return item;
                }
            });
            this.yAxisFormatter = (/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                switch (_this.yAxisFormatType) {
                    case 'number':
                        return _this.yAxisFormat(item);
                    case 'time':
                        /** @type {?} */
                        var parseDate = d3.isoParse(item);
                        return _this.yAxisFormat(parseDate);
                    default:
                        return item;
                }
            });
        }
        /**
         * @return {?}
         */
        PbdsDatavizBarComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.margin = {
                top: +this.marginTop,
                right: +this.marginRight,
                bottom: +this.marginBottom,
                left: +this.marginLeft
            };
            // create formatters
            this.xAxisFormat = this._dataviz.d3Format(this.xAxisFormatType, this.xAxisFormatString);
            this.yAxisFormat = this._dataviz.d3Format(this.yAxisFormatType, this.yAxisFormatString);
            this.legendLabelFormat = this._dataviz.d3Format(this.legendLabelFormatType, this.legendLabelFormatString);
            this.tooltipLabelFormat = this._dataviz.d3Format(this.tooltipLabelFormatType, this.tooltipLabelFormatString);
            this.tooltipValueFormat = this._dataviz.d3Format(this.tooltipValueFormatType, this.tooltipValueFormatString);
            // defaults for all chart types
            this.hideGrayBars = false;
            this.hideXAxis = false;
            this.hideYAxis = false;
            this.hideXAxisZero = false;
            this.hideYAxisZero = false;
            this.hideXGrid = false;
            this.hideYGrid = false;
            this.hideXAxisDomain = false;
            this.hideYAxisDomain = false;
            this.hideTooltip = false;
            this.hideXAxisTicks = false;
            this.hideYAxisTicks = false;
            this.xAxisTickSize = 8;
            this.xAxisTickSizeOuter = 0;
            this.xAxisTitleMargin = this.xAxisTitle ? 20 : 0;
            this.yAxisTickSize = 8;
            this.yAxisTickSizeOuter = 0;
            this.hideTooltipLabel = false;
            if (this.type !== 'debug') {
                // set type defaults
                switch (this.type) {
                    case 'low':
                        this.hideGrayBars = true;
                        this.hideXAxis = !this.hideLegend;
                        this.hideXAxisTicks = true;
                        this.hideXGrid = true;
                        this.hideYAxisDomain = false;
                        this.hideYAxisTicks = true;
                        this.legendPosition = 'bottom';
                        this.hideTooltipLabel = true;
                        break;
                    case 'medium':
                        this.hideXAxisDomain = true;
                        this.hideXAxis = !this.hideLegend;
                        this.hideXGrid = true;
                        this.hideXAxisTicks = true;
                        this.hideYAxisDomain = true;
                        this.hideYAxisTicks = true;
                        this.hideYGrid = true;
                        this.hideTooltipLabel = true;
                        break;
                    case 'high':
                        this.hideXAxis = true;
                        this.hideXAxisDomain = true;
                        this.hideXGrid = true;
                        this.hideYAxisDomain = true;
                        this.hideYAxisTicks = true;
                        this.hideYGrid = true;
                        this.hideLegend = true;
                        this.hideTooltipLabel = false;
                        break;
                }
                // single series overrides
                if (this.singleSeries) {
                    this.hideLegend = true;
                    this.hideXAxis = true;
                    this.hideXGrid = true;
                    this.hideTooltipLabel = false;
                }
            }
            // adjust margin if xAxis hidden
            if (this.hideXAxis)
                this.margin.bottom = 10; // need small margin for yAxis with 0 tick label
            if (!this.hideLegend && this.legendPosition === 'right') {
                this.width = +this.width - +this.legendWidth;
            }
            // create the chart
            this.chart = d3.select(this._element.nativeElement).attr('aria-hidden', 'true');
            // create chart svg
            this.svg = this.chart
                .append('svg')
                .attr('width', +this.width)
                .attr('height', +this.height + this.margin.top + this.margin.bottom + this.xAxisTitleMargin)
                .attr('class', 'img-fluid')
                .attr('preserveAspectRatio', 'xMinYMin meet')
                .attr('viewBox', "-" + this.margin.left + " -" + this.margin.top + " " + +this.width + " " + (+this.height +
                this.margin.top +
                this.margin.bottom +
                this.xAxisTitleMargin));
            // build color ranges
            this.colorRange = d3.scaleOrdinal().range(this._dataviz.createGradientDefs(this.svg, this.singleSeries, this.theme));
            // X AXIS
            this.xAxisScale = d3.scaleBand()
                .domain(this.data.map((/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return d.label; })))
                .rangeRound([0, this.width - this.margin.left])
                .align(0);
            // add padding to the scale for gray bars
            !this.hideGrayBars
                ? this.xAxisScale.paddingInner(0.1).paddingOuter(0)
                : this.xAxisScale.paddingInner(0).paddingOuter(0);
            this.xAxisCall = d3.axisBottom(this.xAxisScale)
                .tickSize(this.xAxisTickSize)
                .tickSizeOuter(this.xAxisTickSizeOuter)
                .tickFormat(this.xAxisFormatter);
            this.xAxis = this.svg
                .append('g')
                .attr('class', 'axis axis-x')
                .attr('transform', "translate(0, " + this.height + ")")
                .classed('axis-hidden', this.hideXAxis)
                .classed('axis-zero-hidden', this.hideXAxisZero)
                .classed('axis-domain-hidden', this.hideXAxisDomain)
                .classed('axis-ticks-hidden', this.hideXAxisTicks)
                .call(this.xAxisCall);
            // X GRIDLINES
            if (!this.hideXGrid) {
                this.xGridCall = d3.axisBottom(this.xAxisScale).tickSize(-this.height);
                this.xGrid = this.svg
                    .append('g')
                    .attr('class', 'grid grid-x')
                    .classed('grid-zero-hidden', this.hideXAxisZero)
                    .attr('transform', "translate(0, " + this.height + ")")
                    .call(this.xGridCall);
            }
            // X AXIS TITLE
            if (this.xAxisTitle) {
                this.svg
                    .append('text')
                    .attr('class', 'axis-title')
                    .attr('text-anchor', 'center')
                    .attr('x', this.width / 2 - this.margin.left)
                    .attr('y', this.height + this.margin.top + (this.hideXAxis ? 15 : 0))
                    .text(this.xAxisTitle);
            }
            // Y AXIS
            this.yAxisScale = d3.scaleLinear()
                .domain([
                d3.min(this.data, (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return d.value - d.value * +_this.yAxisMinBuffer; })),
                d3.max(this.data, (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return d.value + d.value * +_this.yAxisMaxBuffer; }))
            ])
                .nice()
                .rangeRound([this.height, 0]);
            this.yAxisCall = d3.axisLeft(this.yAxisScale)
                .ticks(this.yAxisTicks)
                .tickSize(this.yAxisTickSize)
                .tickSizeOuter(this.yAxisTickSizeOuter)
                .tickFormat(this.yAxisFormatter);
            this.yAxis = this.svg
                .append('g')
                .attr('class', 'axis axis-y')
                .classed('axis-hidden', this.hideYAxis)
                .classed('axis-zero-hidden', this.hideYAxisZero)
                .classed('axis-domain-hidden', this.hideYAxisDomain)
                .classed('axis-ticks-hidden', this.hideYAxisTicks)
                .call(this.yAxisCall);
            // Y GRIDLINES
            if (!this.hideYGrid) {
                this.yGridCall = d3.axisLeft(this.yAxisScale)
                    .ticks(this.yAxisTicks)
                    .tickSize(-this.width + this.margin.left + this.margin.right);
                this.yGrid = this.svg
                    .append('g')
                    .attr('class', 'grid grid-y')
                    .classed('grid-zero-hidden', this.hideYAxisZero)
                    .attr('transform', "translate(0, 0)")
                    .call(this.yGridCall);
            }
            // Y THRESHOLD
            if (this.threshold) {
                this.yThreshold = this.svg
                    .append('line')
                    .attr('class', 'threshold')
                    .attr('x2', +this.width - this.margin.right - this.margin.left)
                    .attr('transform', "translate(0,  " + this.yAxisScale(+this.threshold) + ")");
            }
            // Y AVERAGE
            if (this.average) {
                this.yAverage = this.svg
                    .append('line')
                    .attr('class', 'average')
                    .attr('x2', +this.width - this.margin.right - this.margin.left)
                    .attr('transform', "translate(0,  " + this.yAxisScale(+this.average) + ")");
            }
            // TOOLTIP
            if (!this.hideTooltip) {
                this.tooltip = d3.select('body')
                    .append('div')
                    .attr('class', 'pbds-tooltip south')
                    .style('opacity', 0)
                    .attr('aria-hidden', 'true'); // hide tooltip for accessibility
            }
            // add legend classes
            if (!this.hideLegend) {
                this.chart.classed('pbds-chart-legend-bottom', this.legendPosition === 'bottom' ? true : false);
                this.chart.append('ul').attr('class', "legend legend-" + this.legendPosition);
            }
            // add average to legend
            if (this.average && !this.hideLegend) {
                this.chart
                    .select('.legend')
                    .append('li')
                    .attr('class', 'legend-static legend-average')
                    .html((/**
                 * @return {?}
                 */
                function () {
                    return "\n          <span class=\"legend-key\"></span>\n          <span class=\"legend-label\">" + _this.averageLabel + "</span>\n        ";
                }));
            }
            // add threshold to legend
            if (this.threshold && !this.hideLegend) {
                this.chart
                    .select('.legend')
                    .append('li')
                    .attr('class', 'legend-static legend-threshold')
                    .html((/**
                 * @return {?}
                 */
                function () {
                    return "\n          <span class=\"legend-key\"></span>\n          <span class=\"legend-label\">" + _this.thresholdLabel + "</span>\n        ";
                }));
            }
            this.updateChart();
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        PbdsDatavizBarComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes.data && !changes.data.firstChange) {
                this.updateChart();
            }
        };
        /**
         * @return {?}
         */
        PbdsDatavizBarComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            if (this.tooltip)
                this.tooltip.remove();
        };
        PbdsDatavizBarComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pbds-dataviz-bar',
                        template: "",
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        PbdsDatavizBarComponent.ctorParameters = function () { return [
            { type: PbdsDatavizService },
            { type: core.ElementRef },
            { type: common.ViewportScroller },
            { type: common.Location }
        ]; };
        PbdsDatavizBarComponent.propDecorators = {
            chartClass: [{ type: core.HostBinding, args: ['class.pbds-chart',] }],
            barClass: [{ type: core.HostBinding, args: ['class.pbds-chart-bar',] }],
            data: [{ type: core.Input }],
            width: [{ type: core.Input }],
            height: [{ type: core.Input }],
            type: [{ type: core.Input }],
            singleSeries: [{ type: core.Input }],
            xAxisFormatType: [{ type: core.Input }],
            xAxisFormatString: [{ type: core.Input }],
            xAxisTitle: [{ type: core.Input }],
            yAxisFormatType: [{ type: core.Input }],
            yAxisFormatString: [{ type: core.Input }],
            yAxisTicks: [{ type: core.Input }],
            yAxisMinBuffer: [{ type: core.Input }],
            yAxisMaxBuffer: [{ type: core.Input }],
            hideLegend: [{ type: core.Input }],
            legendWidth: [{ type: core.Input }],
            legendPosition: [{ type: core.Input }],
            legendLabelFormatType: [{ type: core.Input }],
            legendLabelFormatString: [{ type: core.Input }],
            tooltipLabelFormatType: [{ type: core.Input }],
            tooltipLabelFormatString: [{ type: core.Input }],
            tooltipValueFormatType: [{ type: core.Input }],
            tooltipValueFormatString: [{ type: core.Input }],
            marginTop: [{ type: core.Input }],
            marginRight: [{ type: core.Input }],
            marginBottom: [{ type: core.Input }],
            marginLeft: [{ type: core.Input }],
            threshold: [{ type: core.Input }],
            thresholdLabel: [{ type: core.Input }],
            average: [{ type: core.Input }],
            averageLabel: [{ type: core.Input }],
            theme: [{ type: core.Input }],
            hovered: [{ type: core.Output }],
            clicked: [{ type: core.Output }]
        };
        return PbdsDatavizBarComponent;
    }());
    if (false) {
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.chartClass;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.barClass;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.data;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.width;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.height;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.type;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.singleSeries;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.xAxisFormatType;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.xAxisFormatString;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.xAxisTitle;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.yAxisFormatType;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.yAxisFormatString;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.yAxisTicks;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.yAxisMinBuffer;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.yAxisMaxBuffer;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.hideLegend;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.legendWidth;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.legendPosition;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.legendLabelFormatType;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.legendLabelFormatString;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.tooltipLabelFormatType;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.tooltipLabelFormatString;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.tooltipValueFormatType;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.tooltipValueFormatString;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.marginTop;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.marginRight;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.marginBottom;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.marginLeft;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.threshold;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.thresholdLabel;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.average;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.averageLabel;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.theme;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.hovered;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.clicked;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.chart;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.svg;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.margin;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.colorRange;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.hideGrayBars;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.yThreshold;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.yAverage;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.xAxisScale;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.xAxisCall;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.xAxis;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.xAxisFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.xAxisTitleMargin;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.yAxisScale;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.yAxisCall;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.yAxis;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.yAxisFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.xGrid;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.xGridCall;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.yGrid;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.yGridCall;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.xAxisTickSize;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.xAxisTickSizeOuter;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.yAxisTickSize;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.yAxisTickSizeOuter;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.hideXAxis;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.hideYAxis;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.hideXAxisDomain;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.hideYAxisDomain;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.hideXAxisZero;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.hideYAxisZero;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.hideXGrid;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.hideYGrid;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.hideXAxisTicks;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.hideYAxisTicks;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.legendLabelFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.tooltip;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.hideTooltip;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.hideTooltipLabel;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.tooltipValueFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.tooltipLabelFormat;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.updateChart;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.barMouseOver;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.barMouseOut;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.barMouseClick;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.legendMouseOver;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.legendMouseOut;
        /** @type {?} */
        PbdsDatavizBarComponent.prototype.legendMouseClick;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.tooltipShow;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.tooltipHide;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.xAxisFormatter;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype.yAxisFormatter;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype._dataviz;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype._element;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype._scroll;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarComponent.prototype._location;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // assign an ID for each component instance
    /** @type {?} */
    var nextId = 0;
    var PbdsDatavizLineComponent = /** @class */ (function () {
        function PbdsDatavizLineComponent(_dataviz, _element, _scroll, _location) {
            var _this = this;
            this._dataviz = _dataviz;
            this._element = _element;
            this._scroll = _scroll;
            this._location = _location;
            this.chartClass = true;
            this.lineClass = true;
            this.width = 306;
            this.height = 400;
            this.type = 'medium'; // debug to show all chart options
            // debug to show all chart options
            this.area = false;
            this.xAxisFormatString = '';
            this.xAxisTicks = 6;
            this.yAxisFormatString = '';
            this.yAxisTicks = 5;
            this.yAxisMinBuffer = 0.01;
            this.yAxisMaxBuffer = 0.01;
            this.hideXGrid = true;
            this.hideYGrid = true;
            this.hideLegend = false;
            this.legendWidth = 105 + 28; // hardcoded legend width + left margin, do not document until feedback
            // hardcoded legend width + left margin, do not document until feedback
            this.legendPosition = 'right';
            this.legendLabelFormatType = null;
            this.legendLabelFormatString = '';
            this.tooltipHeadingFormatString = '';
            this.tooltipLabelFormatType = null;
            this.tooltipLabelFormatString = '';
            this.tooltipValueFormatType = null;
            this.tooltipValueFormatString = '';
            this.marginTop = 10; // hardcoded on purpose, do not document until feedback
            // hardcoded on purpose, do not document until feedback
            this.marginRight = 20; // hardcoded on purpose, do not document until feedback
            // hardcoded on purpose, do not document until feedback
            this.marginBottom = 30; // hardcoded on purpose, do not document until feedback
            // hardcoded on purpose, do not document until feedback
            this.marginLeft = 55; // hardcoded on purpose, do not document until feedback
            this.hovered = new core.EventEmitter();
            this.clicked = new core.EventEmitter();
            this.tooltipHovered = new core.EventEmitter();
            this.tooltipClicked = new core.EventEmitter();
            this.updateChart = (/**
             * @return {?}
             */
            function () {
                _this.mouserect.data(_this.data);
                // update the xScale
                _this.xAxisScale.domain(d3.extent(_this.data.dates, (/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) {
                    return d3.isoParse(d);
                })));
                // update the yScale
                _this.yAxisScale
                    .domain([
                    d3.min(_this.data.series, (/**
                     * @param {?} d
                     * @param {?} i
                     * @return {?}
                     */
                    function (d, i) {
                        /** @type {?} */
                        var minVal = +d3.min(d.values);
                        return minVal - minVal * +_this.yAxisMinBuffer;
                    })),
                    d3.max(_this.data.series, (/**
                     * @param {?} d
                     * @param {?} i
                     * @return {?}
                     */
                    function (d, i) {
                        /** @type {?} */
                        var maxVal = +d3.max(d.values);
                        return maxVal + maxVal * _this.yAxisMaxBuffer;
                    }))
                ])
                    .nice();
                _this.xAxis
                    .transition()
                    .duration(1000)
                    .call(_this.xAxisCall);
                _this.yAxis
                    .transition()
                    .duration(1000)
                    .call(_this.yAxisCall);
                // update the grids
                if (!_this.hideXGrid) {
                    _this.xGrid
                        .transition()
                        .duration(1000)
                        .call(_this.xGridCall);
                }
                if (!_this.hideYGrid) {
                    _this.yGrid
                        .transition()
                        .duration(1000)
                        .call(_this.yGridCall);
                }
                // lines
                _this.svg
                    .selectAll('path.line')
                    .attr('filter', (/**
                 * @return {?}
                 */
                function () { return (_this.type !== 'high' ? "url(" + _this._location.path() + "#glow)" : null); }))
                    .data(_this.data.series)
                    .join((/**
                 * @param {?} enter
                 * @return {?}
                 */
                function (enter) {
                    enter
                        .append('path')
                        .attr('clip-path', "url(" + _this._location.path() + "#clip-path-" + _this.clipPathId + ")")
                        .attr('class', 'line')
                        .style('stroke', (/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return _this.colorRange(d.label); }))
                        .style('stroke-width', _this.lineWidth)
                        .attr('d', (/**
                     * @param {?} data
                     * @return {?}
                     */
                    function (data) {
                        /** @type {?} */
                        var array = new Array(data.values.length).fill(0);
                        return _this.d3line(array);
                    }))
                        .call((/**
                     * @param {?} enter
                     * @return {?}
                     */
                    function (enter) {
                        return enter
                            .transition()
                            .duration(1000)
                            .ease(d3.easeQuadInOut)
                            .attr('d', (/**
                         * @param {?} data
                         * @return {?}
                         */
                        function (data) { return _this.d3line(data.values); }));
                    }));
                }), (/**
                 * @param {?} update
                 * @return {?}
                 */
                function (update) {
                    return update.call((/**
                     * @param {?} update
                     * @return {?}
                     */
                    function (update) {
                        return update
                            .transition()
                            .duration(1000)
                            .ease(d3.easeQuadInOut)
                            .attr('d', (/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return _this.d3line(d.values); }));
                    }));
                }), (/**
                 * @param {?} exit
                 * @return {?}
                 */
                function (exit) { return exit.remove(); }));
                // area
                if (_this.area) {
                    _this.svg
                        .selectAll('path.area')
                        .data(_this.data.series)
                        .join((/**
                     * @param {?} enter
                     * @return {?}
                     */
                    function (enter) {
                        return enter
                            .append('path')
                            .attr('clip-path', "url(" + _this._location.path() + "#clip-path-" + _this.clipPathId + ")")
                            .attr('class', 'area')
                            .attr('d', (/**
                         * @param {?} data
                         * @return {?}
                         */
                        function (data) {
                            /** @type {?} */
                            var array = new Array(data.values.length).fill(0);
                            return _this.d3area(array);
                        }))
                            .style('color', (/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return _this.colorRange(d.label); }))
                            .call((/**
                         * @param {?} enter
                         * @return {?}
                         */
                        function (enter) {
                            return enter
                                .transition()
                                .duration(1000)
                                .ease(d3.easeQuadInOut)
                                .attr('d', (/**
                             * @param {?} data
                             * @return {?}
                             */
                            function (data) { return _this.d3area(data.values); }));
                        }));
                    }), (/**
                     * @param {?} update
                     * @return {?}
                     */
                    function (update) {
                        return update.call((/**
                         * @param {?} update
                         * @return {?}
                         */
                        function (update) {
                            return update
                                .transition()
                                .duration(1000)
                                .ease(d3.easeQuadInOut)
                                .attr('d', (/**
                             * @param {?} d
                             * @return {?}
                             */
                            function (d) { return _this.d3area(d.values); }));
                        }));
                    }), (/**
                     * @param {?} exit
                     * @return {?}
                     */
                    function (exit) { return exit.remove(); }));
                }
                // circles
                if (_this.linePoints) {
                    // add points
                    _this.svg
                        .selectAll('g.points')
                        .data(_this.data.series)
                        .join((/**
                     * @param {?} enter
                     * @return {?}
                     */
                    function (enter) {
                        return enter
                            .append('g')
                            .attr('class', 'points')
                            .attr('clip-path', "url(" + _this._location.path() + "#clip-path-points-" + _this.clipPathId + ")")
                            .style('color', (/**
                         * @param {?} d
                         * @param {?} i
                         * @return {?}
                         */
                        function (d, i) { return _this.colorRange(d.label); }))
                            .selectAll('circle')
                            .data((/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return d.values; }))
                            .join((/**
                         * @param {?} enter
                         * @return {?}
                         */
                        function (enter) {
                            return enter
                                .append('circle')
                                .attr('cx', (/**
                             * @param {?} d
                             * @param {?} i
                             * @return {?}
                             */
                            function (d, i) { return _this.xAxisScale(d3.isoParse(_this.data.dates[i])); }))
                                .attr('cy', (/**
                             * @param {?} d
                             * @return {?}
                             */
                            function (d) { return _this.yAxisScale(0); }))
                                .attr('r', _this.lineWidth * 2)
                                .style('stroke-width', _this.lineWidth)
                                .call((/**
                             * @param {?} enter
                             * @return {?}
                             */
                            function (enter) {
                                return enter
                                    .transition()
                                    .duration(1000)
                                    .ease(d3.easeQuadInOut)
                                    .attr('cy', (/**
                                 * @param {?} d
                                 * @return {?}
                                 */
                                function (d) { return _this.yAxisScale(d); }));
                            }));
                        }), (/**
                         * @return {?}
                         */
                        function () { }), (/**
                         * @param {?} exit
                         * @return {?}
                         */
                        function (exit) { return exit.remove(); }));
                    }), (/**
                     * @param {?} update
                     * @return {?}
                     */
                    function (update) {
                        return update
                            .selectAll('circle')
                            .data((/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return d.values; }))
                            .join((/**
                         * @param {?} enter
                         * @return {?}
                         */
                        function (enter) {
                            return enter
                                .append('circle')
                                .attr('cx', (/**
                             * @param {?} d
                             * @param {?} i
                             * @return {?}
                             */
                            function (d, i) { return _this.xAxisScale(d3.isoParse(_this.data.dates[i])); }))
                                .attr('cy', (/**
                             * @param {?} d
                             * @return {?}
                             */
                            function (d) { return _this.yAxisScale(d); }))
                                .attr('r', _this.lineWidth * 2)
                                .style('stroke-width', _this.lineWidth);
                        }), (/**
                         * @param {?} update
                         * @return {?}
                         */
                        function (update) {
                            return update.call((/**
                             * @param {?} update
                             * @return {?}
                             */
                            function (update) {
                                return update
                                    .transition()
                                    .duration(1000)
                                    .ease(d3.easeQuadInOut)
                                    .attr('cx', (/**
                                 * @param {?} d
                                 * @param {?} i
                                 * @return {?}
                                 */
                                function (d, i) { return _this.xAxisScale(d3.isoParse(_this.data.dates[i])); }))
                                    .attr('cy', (/**
                                 * @param {?} d
                                 * @return {?}
                                 */
                                function (d) { return _this.yAxisScale(d); }));
                            }));
                        }), (/**
                         * @param {?} exit
                         * @return {?}
                         */
                        function (exit) { return exit.remove(); }));
                    }), (/**
                     * @param {?} exit
                     * @return {?}
                     */
                    function (exit) { return exit.remove(); }));
                }
                if (!_this.hideLegend) {
                    _this.chart
                        .select('.legend')
                        .selectAll('.legend-item')
                        .data(_this.data.series)
                        .join((/**
                     * @param {?} enter
                     * @return {?}
                     */
                    function (enter) {
                        /** @type {?} */
                        var li = enter.append('li').attr('class', 'legend-item');
                        li.append('span')
                            .attr('class', 'legend-key')
                            .style('background-color', (/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return _this.colorRange(d.label); }));
                        li.append('span')
                            .attr('class', 'legend-label')
                            .html((/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) {
                            switch (_this.legendLabelFormatType) {
                                case 'number':
                                    return _this.legendLabelFormat(d.label);
                                case 'time':
                                    /** @type {?} */
                                    var parsedTime = d3.isoParse(d.label);
                                    return _this.legendLabelFormat(parsedTime);
                                default:
                                    return d.label;
                            }
                        }));
                        return li;
                    }), (/**
                     * @param {?} update
                     * @return {?}
                     */
                    function (update) {
                        update.select('.legend-label').html((/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) {
                            switch (_this.legendLabelFormatType) {
                                case 'number':
                                    return _this.legendLabelFormat(d.label);
                                case 'time':
                                    /** @type {?} */
                                    var parsedTime = d3.isoParse(d.label);
                                    return _this.legendLabelFormat(parsedTime);
                                default:
                                    return d.label;
                            }
                        }));
                        return update;
                    }), (/**
                     * @param {?} exit
                     * @return {?}
                     */
                    function (exit) { return exit.remove(); }))
                        .on('mouseover', (/**
                     * @param {?} data
                     * @param {?} index
                     * @param {?} nodes
                     * @return {?}
                     */
                    function (data, index, nodes) { return _this.legendMouseOver(d3.event, data, index, nodes); }))
                        .on('mouseout', (/**
                     * @return {?}
                     */
                    function () { return _this.legendMouseOut(); }))
                        .on('click', (/**
                     * @param {?} data
                     * @param {?} index
                     * @param {?} nodes
                     * @return {?}
                     */
                    function (data, index, nodes) { return _this.legendMouseClick(d3.event, data, index, nodes); }));
                }
                if (!_this.hideTooltip) {
                    _this.tooltip
                        .select('.tooltip-table')
                        .selectAll('tr')
                        .data(_this.data.series)
                        .join((/**
                     * @param {?} enter
                     * @return {?}
                     */
                    function (enter) {
                        /** @type {?} */
                        var tooltipItem = enter.append('tr').attr('class', 'tooltip-item');
                        tooltipItem
                            .append('td')
                            .style('color', (/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return _this.colorRange(d.label); }))
                            .append('span')
                            .attr('class', 'pbds-tooltip-key');
                        tooltipItem
                            .append('td')
                            .attr('class', 'tooltip-label pr-2 text-nowrap')
                            .html((/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) {
                            return _this.tooltipLabelFormatType ? _this.tooltipLabelFormat(d.label) : d.label;
                        }));
                        tooltipItem
                            .append('td')
                            .attr('class', 'tooltip-value text-right text-nowrap')
                            .html((/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return ''; }));
                        return tooltipItem;
                    }), (/**
                     * @return {?}
                     */
                    function () { }), (/**
                     * @param {?} exit
                     * @return {?}
                     */
                    function (exit) { return exit.remove(); }));
                }
                _this.svg.selectAll('.points').raise();
                _this.mouserect.raise();
            });
            this.legendMouseOver = (/**
             * @param {?} event
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (event, data, index, nodes) {
                _this.chart
                    .selectAll('.legend-item')
                    .filter((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return i !== index; }))
                    .classed('inactive', true);
                _this.svg
                    .selectAll('.line')
                    .filter((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return i !== index; }))
                    .classed('inactive', true);
                _this.svg
                    .selectAll('.line')
                    .filter((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return i === index; }))
                    .classed('active', true);
                if (_this.area) {
                    _this.svg
                        .selectAll('.area')
                        .filter((/**
                     * @param {?} d
                     * @param {?} i
                     * @return {?}
                     */
                    function (d, i) { return i !== index; }))
                        .classed('inactive', true);
                }
                if (_this.linePoints) {
                    _this.svg
                        .selectAll('.points')
                        .filter((/**
                     * @param {?} d
                     * @param {?} i
                     * @return {?}
                     */
                    function (d, i) { return i !== index; }))
                        .selectAll('circle')
                        .classed('inactive', true);
                }
                _this.hovered.emit({ event: event, data: data });
            });
            this.legendMouseOut = (/**
             * @return {?}
             */
            function () {
                _this.chart.selectAll('.legend-item').classed('inactive', false);
                _this.chart
                    .selectAll('.line')
                    .classed('inactive', false)
                    .classed('active', false);
                if (_this.linePoints) {
                    _this.svg
                        .selectAll('circle')
                        .classed('active', false)
                        .classed('inactive', false);
                }
                if (_this.area) {
                    _this.svg.selectAll('.area').classed('inactive', false);
                }
            });
            this.legendMouseClick = (/**
             * @param {?} event
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (event, data, index, nodes) {
                _this.clicked.emit({ event: event, data: data });
            });
            this.mouserectMouseMove = (/**
             * @param {?} event
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (event, index, nodes) {
                /** @type {?} */
                var mouseXDate = _this.xAxisScale.invert(d3.mouse(nodes[0])[0]);
                // return date at mouse x position
                /** @type {?} */
                var leftIndex = d3.bisectLeft(_this.data.dates, d3.isoFormat(mouseXDate));
                // prevent error for 0 index
                if (leftIndex === 0)
                    return false;
                /** @type {?} */
                var dateLower = new Date(_this.data.dates[leftIndex - 1]);
                /** @type {?} */
                var dateUpper = new Date(_this.data.dates[leftIndex]);
                /** @type {?} */
                var closestDate = +mouseXDate - +dateLower > +dateUpper - mouseXDate ? dateUpper : dateLower;
                // date mouse is closest to
                /** @type {?} */
                var closestIndex = _this.data.dates.indexOf(d3.isoFormat(closestDate));
                // which index the mouse is closest to
                // console.log(+mouseXDate, leftIndex, +dateLower, +dateUpper, +closestDate, closestIndex);
                /** @type {?} */
                var circles = _this.svg.selectAll('.line-group').selectAll('circle');
                circles.filter((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return i === closestIndex; })).classed('active', true);
                circles.filter((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return i !== closestIndex; })).classed('active', false);
                _this.tooltipLine
                    .attr('x1', _this.xAxisScale(closestDate))
                    .attr('x2', _this.xAxisScale(closestDate))
                    .classed('active', true);
                // console.log(this.tooltipLine.node().getBoundingClientRect(), this._scroll.getScrollPosition());
                _this.tooltipShow(_this.tooltipLine.node(), closestIndex);
                _this.mousedata = {
                    date: closestDate,
                    series: _this.data.series.map((/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) {
                        return {
                            label: d.label,
                            value: d.values[closestIndex]
                        };
                    }))
                };
                _this.tooltipHovered.emit({ event: event, data: _this.mousedata });
            });
            this.mouserectMouseOut = (/**
             * @param {?} event
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (event, index, nodes) {
                _this.svg.selectAll('circle').classed('active', false);
                _this.tooltipLine.classed('active', false);
                _this.tooltipHide();
            });
            this.mouserectMouseClick = (/**
             * @return {?}
             */
            function () {
                _this.tooltipClicked.emit({ event: event, data: _this.mousedata });
            });
            this.tooltipShow = (/**
             * @param {?} node
             * @param {?} closestIndex
             * @return {?}
             */
            function (node, closestIndex) {
                /** @type {?} */
                var scroll = _this._scroll.getScrollPosition();
                /** @type {?} */
                var mouserectDimensions = node.getBoundingClientRect();
                /** @type {?} */
                var tooltipOffsetHeight = +_this.tooltip.node().offsetHeight;
                /** @type {?} */
                var tooltipDimensions = _this.tooltip.node().getBoundingClientRect();
                /** @type {?} */
                var dimensionCalculated = mouserectDimensions.left + tooltipDimensions.width + 8;
                /** @type {?} */
                var clientWidth = document.body.clientWidth - 10;
                /** @type {?} */
                var position;
                // console.log(scroll, mouserectDimensions, tooltipOffsetHeight, tooltipDimensions, dimensionCalculated, clientWidth);
                _this.tooltip.select('.tooltip-header').html((/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) {
                    /** @type {?} */
                    var parsedTime = d3.isoParse(_this.data.dates[closestIndex]);
                    return _this.tooltipHeadingFormat(parsedTime);
                }));
                _this.tooltip.selectAll('.tooltip-value').html((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) {
                    return _this.tooltipValueFormatType
                        ? _this.tooltipValueFormat(_this.data.series[i].values[closestIndex])
                        : _this.data.series[i].values[closestIndex];
                }));
                // flip the tooltip positions if near the right edge of the screen
                if (dimensionCalculated > clientWidth) {
                    _this.tooltip.classed('east', true);
                    _this.tooltip.classed('west', false);
                    position = mouserectDimensions.left - tooltipDimensions.width - 8 + "px";
                }
                else if (dimensionCalculated < clientWidth) {
                    _this.tooltip.classed('east', false);
                    _this.tooltip.classed('west', true);
                    position = mouserectDimensions.left + 8 + "px";
                }
                // console.log('POSITION: ', position, mouserectDimensions);
                // set the tooltip styles
                _this.tooltip.style('top', mouserectDimensions.top + mouserectDimensions.height / 2 - tooltipOffsetHeight / 2 + scroll[1] + "px");
                _this.tooltip.style('left', position);
                _this.tooltip.style('opacity', 1);
            });
            this.tooltipHide = (/**
             * @return {?}
             */
            function () {
                _this.tooltip.style('opacity', 0);
            });
            this.xAxisFormatter = (/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                /** @type {?} */
                var parseDate = d3.isoParse(item);
                return _this.xAxisFormat(parseDate);
            });
            this.yAxisFormatter = (/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                return _this.yAxisFormat(item);
            });
        }
        /**
         * @return {?}
         */
        PbdsDatavizLineComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.margin = {
                top: +this.marginTop,
                right: +this.marginRight,
                bottom: +this.marginBottom,
                left: +this.marginLeft
            };
            this.clipPathId = nextId;
            // create formatters
            this.xAxisFormat = d3.timeFormat(this.xAxisFormatString);
            this.yAxisFormat = d3.format(this.yAxisFormatString);
            this.legendLabelFormat = this._dataviz.d3Format(this.legendLabelFormatType, this.legendLabelFormatString);
            this.tooltipHeadingFormat = d3.timeFormat(this.tooltipHeadingFormatString);
            this.tooltipLabelFormat = this._dataviz.d3Format(this.tooltipLabelFormatType, this.tooltipLabelFormatString);
            this.tooltipValueFormat = this._dataviz.d3Format(this.tooltipValueFormatType, this.tooltipValueFormatString);
            // defaults for all chart types
            this.lineWidth = 3;
            this.lineCurved = true;
            this.linePoints = true;
            this.hideXAxis = false;
            this.hideYAxis = false;
            this.hideXAxisZero = false;
            this.hideYAxisZero = false;
            this.hideXAxisDomain = false;
            this.hideYAxisDomain = false;
            this.hideTooltip = false;
            this.hideXAxisTicks = false;
            this.hideYAxisTicks = false;
            this.xAxisTickSize = 8;
            this.xAxisTickSizeOuter = 0;
            this.yAxisTickSize = 8;
            this.yAxisTickSizeOuter = 0;
            if (this.type !== 'debug') {
                // set type defaults
                switch (this.type) {
                    case 'medium':
                        this.hideXAxisTicks = true;
                        this.hideYAxisTicks = true;
                        break;
                    case 'high':
                        this.lineWidth = 2;
                        this.lineCurved = false;
                        this.linePoints = false;
                        this.hideXAxisTicks = true;
                        this.hideYAxisTicks = true;
                        this.hideXGrid = false;
                        this.hideYGrid = false;
                        break;
                }
            }
            // adjust margin if xAxis hidden
            if (this.hideXAxis)
                this.margin.bottom = 10; // need small margin for yAxis with 0 tick label
            if (!this.hideLegend && this.legendPosition === 'right') {
                this.width = +this.width - +this.legendWidth;
            }
            // define line
            this.d3line = d3.line()
                .x((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            function (d, i) { return _this.xAxisScale(d3.isoParse(_this.data.dates[i])); }))
                .y((/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return _this.yAxisScale(d); }));
            // define line curve
            if (this.lineCurved) {
                this.d3line.curve(d3.curveCatmullRom.alpha(0.5));
            }
            // define area
            if (this.area) {
                this.d3area = d3.area()
                    .x((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return _this.xAxisScale(d3.isoParse(_this.data.dates[i])); }))
                    .y0(this.height)
                    .y1((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return _this.yAxisScale(d); }));
                if (this.lineCurved) {
                    this.d3area.curve(d3.curveCatmullRom.alpha(0.5));
                }
            }
            // create the chart
            this.chart = d3.select(this._element.nativeElement).attr('aria-hidden', 'true');
            // create chart svg
            this.svg = this.chart
                .append('svg')
                .attr('width', +this.width + this.margin.right)
                .attr('height', +this.height + this.margin.top + this.margin.bottom)
                .attr('class', 'img-fluid')
                .attr('preserveAspectRatio', 'xMinYMin meet')
                .attr('viewBox', "-" + this.margin.left + " -" + this.margin.top + " " + (+this.width + this.margin.right) + " " + (+this.height +
                this.margin.top +
                this.margin.bottom));
            // add rectangle to capture mouse
            this.mouserect = this.svg
                .append('rect')
                .attr('width', this.width - this.margin.left - this.margin.right)
                .attr('height', this.height)
                .attr('class', 'mouserect')
                .on('mousemove', (/**
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (data, index, nodes) { return _this.mouserectMouseMove(d3.event, index, nodes); }))
                .on('mouseout', (/**
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (data, index, nodes) { return _this.mouserectMouseOut(d3.event, index, nodes); }))
                .on('click', (/**
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (data, index, nodes) { return _this.mouserectMouseClick(); }));
            this.tooltipLine = this.svg
                .append('line')
                .attr('y1', 0)
                .attr('y2', this.height)
                .attr('class', 'tooltip-line');
            // define color range
            this.colorRange = d3.scaleOrdinal().range(this._dataviz.getColors(false, this.theme));
            // add glow def
            this._dataviz.createGlowFilter(this.svg);
            // X AXIS
            this.xAxisScale = d3.scaleTime()
                .domain(d3.extent(this.data.dates, (/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            function (d, i) {
                return d3.isoParse(d);
            })))
                .range([0, this.width - this.margin.left - this.margin.right]);
            this.xAxisCall = d3.axisBottom(this.xAxisScale)
                .ticks(+this.xAxisTicks)
                .tickSize(this.xAxisTickSize)
                .tickSizeOuter(this.xAxisTickSizeOuter)
                .tickFormat(this.xAxisFormatter);
            this.xAxis = this.svg
                .append('g')
                .attr('class', 'axis axis-x')
                .attr('transform', "translate(0, " + this.height + ")") //${-this.margin.right / 2}
                .classed('axis-hidden', this.hideXAxis)
                .classed('axis-zero-hidden', this.hideXAxisZero)
                .classed('axis-domain-hidden', this.hideXAxisDomain)
                .classed('axis-ticks-hidden', this.hideXAxisTicks)
                .call(this.xAxisCall);
            // X GRIDLINES
            if (!this.hideXGrid) {
                this.xGridCall = d3.axisBottom(this.xAxisScale).tickSize(-this.height);
                this.xGrid = this.svg
                    .append('g')
                    .attr('class', 'grid grid-x')
                    .classed('grid-zero-hidden', this.hideXAxisZero)
                    .attr('transform', "translate(0, " + this.height + ")") //${-this.margin.right / 2}
                    .call(this.xGridCall);
            }
            // Y AXIS
            this.yAxisScale = d3.scaleLinear()
                .domain([
                d3.min(this.data.series, (/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) {
                    /** @type {?} */
                    var minVal = +d3.min(d.values);
                    return minVal - minVal * +_this.yAxisMinBuffer;
                })),
                d3.max(this.data.series, (/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) {
                    /** @type {?} */
                    var maxVal = +d3.max(d.values);
                    return maxVal + maxVal * _this.yAxisMaxBuffer;
                }))
            ])
                .nice()
                .range([this.height, 0]);
            this.yAxisCall = d3.axisLeft(this.yAxisScale)
                .ticks(this.yAxisTicks)
                .tickSize(this.yAxisTickSize)
                .tickSizeOuter(this.yAxisTickSizeOuter)
                .tickFormat(this.yAxisFormatter);
            this.yAxis = this.svg
                .append('g')
                .attr('class', 'axis axis-y')
                .classed('axis-hidden', this.hideYAxis)
                .classed('axis-zero-hidden', this.hideYAxisZero)
                .classed('axis-domain-hidden', this.hideYAxisDomain)
                .classed('axis-ticks-hidden', this.hideYAxisTicks)
                .call(this.yAxisCall);
            // Y GRIDLINES
            if (!this.hideYGrid) {
                this.yGridCall = d3.axisLeft(this.yAxisScale)
                    .ticks(this.yAxisTicks)
                    .tickSize(-this.width + this.margin.left + this.margin.right);
                this.yGrid = this.svg
                    .append('g')
                    .attr('class', 'grid grid-y')
                    .classed('grid-zero-hidden', this.hideYAxisZero)
                    .attr('transform', "translate(0, 0)")
                    .call(this.yGridCall);
            }
            // TOOLTIP
            if (!this.hideTooltip) {
                this.tooltip = d3.select('body')
                    .append('div')
                    .attr('class', 'pbds-tooltip west')
                    .style('opacity', 0)
                    .attr('aria-hidden', 'true'); // hide tooltip for accessibility
                // tooltip header
                this.tooltip.append('div').attr('class', 'tooltip-header');
                // tooltip table
                /** @type {?} */
                var tooltipTable = this.tooltip.append('table').attr('class', 'tooltip-table text-left w-100');
                /** @type {?} */
                var tooltipTableTbody = tooltipTable.append('tbody');
                tooltipTableTbody
                    .selectAll('tr')
                    .data(this.data)
                    .join((/**
                 * @param {?} enter
                 * @return {?}
                 */
                function (enter) { return enter.append('tr'); }));
            }
            // add legend classes
            if (!this.hideLegend) {
                this.chart.classed('pbds-chart-legend-bottom', this.legendPosition === 'bottom' ? true : false);
                this.chart.append('ul').attr('class', "legend legend-" + this.legendPosition);
            }
            // add clip path for line animation
            this.svg
                .append('clipPath')
                .attr('id', "clip-path-" + this.clipPathId)
                .append('rect')
                .attr('width', +this.width - +this.margin.left - +this.margin.right)
                .attr('height', +this.height);
            // add clip path for points animation
            this.svg
                .append('clipPath')
                .attr('id', "clip-path-points-" + this.clipPathId)
                .append('rect')
                .attr('width', +this.width + +this.margin.left - +this.margin.right)
                .attr('height', +this.height)
                .attr('transform', "translate(-" + this.margin.left + ", 0)");
            this.updateChart();
            nextId++;
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        PbdsDatavizLineComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes.data && !changes.data.firstChange) {
                this.updateChart();
            }
        };
        /**
         * @return {?}
         */
        PbdsDatavizLineComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            if (this.tooltip)
                this.tooltip.remove();
        };
        PbdsDatavizLineComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pbds-dataviz-line',
                        template: "",
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        PbdsDatavizLineComponent.ctorParameters = function () { return [
            { type: PbdsDatavizService },
            { type: core.ElementRef },
            { type: common.ViewportScroller },
            { type: common.Location }
        ]; };
        PbdsDatavizLineComponent.propDecorators = {
            chartClass: [{ type: core.HostBinding, args: ['class.pbds-chart',] }],
            lineClass: [{ type: core.HostBinding, args: ['class.pbds-chart-line',] }],
            data: [{ type: core.Input }],
            width: [{ type: core.Input }],
            height: [{ type: core.Input }],
            type: [{ type: core.Input }],
            area: [{ type: core.Input }],
            xAxisFormatString: [{ type: core.Input }],
            xAxisTicks: [{ type: core.Input }],
            yAxisFormatString: [{ type: core.Input }],
            yAxisTicks: [{ type: core.Input }],
            yAxisMinBuffer: [{ type: core.Input }],
            yAxisMaxBuffer: [{ type: core.Input }],
            hideXGrid: [{ type: core.Input }],
            hideYGrid: [{ type: core.Input }],
            hideLegend: [{ type: core.Input }],
            legendWidth: [{ type: core.Input }],
            legendPosition: [{ type: core.Input }],
            legendLabelFormatType: [{ type: core.Input }],
            legendLabelFormatString: [{ type: core.Input }],
            tooltipHeadingFormatString: [{ type: core.Input }],
            tooltipLabelFormatType: [{ type: core.Input }],
            tooltipLabelFormatString: [{ type: core.Input }],
            tooltipValueFormatType: [{ type: core.Input }],
            tooltipValueFormatString: [{ type: core.Input }],
            marginTop: [{ type: core.Input }],
            marginRight: [{ type: core.Input }],
            marginBottom: [{ type: core.Input }],
            marginLeft: [{ type: core.Input }],
            theme: [{ type: core.Input }],
            hovered: [{ type: core.Output }],
            clicked: [{ type: core.Output }],
            tooltipHovered: [{ type: core.Output }],
            tooltipClicked: [{ type: core.Output }]
        };
        return PbdsDatavizLineComponent;
    }());
    if (false) {
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.chartClass;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.lineClass;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.data;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.width;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.height;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.type;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.area;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.xAxisFormatString;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.xAxisTicks;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.yAxisFormatString;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.yAxisTicks;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.yAxisMinBuffer;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.yAxisMaxBuffer;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.hideXGrid;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.hideYGrid;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.hideLegend;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.legendWidth;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.legendPosition;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.legendLabelFormatType;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.legendLabelFormatString;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.tooltipHeadingFormatString;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.tooltipLabelFormatType;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.tooltipLabelFormatString;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.tooltipValueFormatType;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.tooltipValueFormatString;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.marginTop;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.marginRight;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.marginBottom;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.marginLeft;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.theme;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.hovered;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.clicked;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.tooltipHovered;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.tooltipClicked;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.chart;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.svg;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.mouserect;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.tooltipLine;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.margin;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.clipPathId;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.d3line;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.d3area;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.lineWidth;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.lineCurved;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.linePoints;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.colorRange;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.xAxisScale;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.xAxisCall;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.xAxis;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.xAxisFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.yAxisScale;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.yAxisCall;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.yAxis;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.yAxisFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.xGrid;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.xGridCall;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.yGrid;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.yGridCall;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.xAxisTickSize;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.xAxisTickSizeOuter;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.yAxisTickSize;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.yAxisTickSizeOuter;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.hideXAxis;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.hideYAxis;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.hideXAxisDomain;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.hideYAxisDomain;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.hideXAxisZero;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.hideYAxisZero;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.hideXAxisTicks;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.hideYAxisTicks;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.legendLabelFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.tooltip;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.hideTooltip;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.tooltipHeadingFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.tooltipValueFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.tooltipLabelFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.mousedata;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.updateChart;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.legendMouseOver;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.legendMouseOut;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.legendMouseClick;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.mouserectMouseMove;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.mouserectMouseOut;
        /** @type {?} */
        PbdsDatavizLineComponent.prototype.mouserectMouseClick;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.tooltipShow;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.tooltipHide;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.xAxisFormatter;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype.yAxisFormatter;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype._dataviz;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype._element;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype._scroll;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizLineComponent.prototype._location;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PbdsDatavizGaugeComponent = /** @class */ (function () {
        function PbdsDatavizGaugeComponent(_dataviz, _element) {
            var _this = this;
            this._dataviz = _dataviz;
            this._element = _element;
            this.chartClass = true;
            this.gaugeClass = true;
            this.width = 300;
            this.type = 'halfmoon';
            this.color = '#E23DA8';
            this.hideLabel = false;
            this.labelFormatString = '';
            this.gaugeWidth = 20;
            this.degreesToRadians = (/**
             * @param {?} degree
             * @return {?}
             */
            function (degree) {
                return (degree * Math.PI) / 180;
            });
            this.calculateMinMax = (/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var percentage = _this.data.minvalue / (_this.data.maxvalue - _this.data.minvalue);
                return percentage * (_this.data.value - _this.data.minvalue) + (_this.data.value - _this.data.minvalue);
            });
            this.calculateCurve = (/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                /** @type {?} */
                var start = _this.degreesToRadians(_this.startAngle);
                /** @type {?} */
                var end = start + (data * (_this.degreesToRadians(_this.endAngle) - start)) / _this.data.maxvalue;
                return [
                    {
                        startAngle: start,
                        endAngle: end
                    }
                ];
            });
            this.drawChart = (/**
             * @return {?}
             */
            function () {
                _this.gauge = _this.svg.append('g').attr('class', 'gauge-group');
                // background arc
                _this.gauge
                    .append('path')
                    .data(_this.calculateCurve(_this.data.maxvalue))
                    .attr('class', 'gauge-background')
                    .attr('d', (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) {
                    return _this.arc({
                        innerRadius: _this.radius - _this.gaugeWidth,
                        outerRadius: _this.radius,
                        startAngle: d.startAngle,
                        endAngle: d.endAngle
                    });
                }));
                // value arc
                _this.gauge
                    .append('path')
                    .data(_this.calculateCurve(_this.calculateMinMax()))
                    .attr('class', 'gauge-value')
                    .attr('fill', _this.color)
                    .attr('d', (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) {
                    return _this.arc({
                        innerRadius: _this.radius - _this.gaugeWidth,
                        outerRadius: _this.radius,
                        startAngle: d.startAngle,
                        endAngle: d.endAngle
                    });
                }));
                switch (_this.type) {
                    case 'horseshoe':
                        _this.svg.attr('height', 230).attr('viewBox', "-" + _this.width / 2 + " -" + _this.height / 2 + " " + _this.height + " 230");
                        break;
                    case 'halfmoon':
                        _this.svg.attr('height', _this.width / 2);
                        _this.svg.attr('viewBox', "-" + _this.width / 2 + " -" + _this.width / 2 + " " + _this.width + " " + _this.width / 2);
                        break;
                }
            });
            this.updateChart = (/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var group = _this.svg.select('.gauge-group');
                group
                    .select('.gauge-value')
                    .transition()
                    .duration(750)
                    .call(_this.arcTween, _this.calculateMinMax());
                _this.labelTween = _this.chart.select('.gauge-number');
                _this.labelTween
                    .transition()
                    .duration(750)
                    .call(_this.textTween, _this.data.value);
            });
            this.arcTween = (/**
             * @param {?} transition
             * @param {?} value
             * @return {?}
             */
            function (transition, value) {
                /** @type {?} */
                var newAngle = _this.calculateCurve(value);
                transition.attrTween('d', (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) {
                    /** @type {?} */
                    var interpolate$1 = d3.interpolate(d.endAngle, newAngle[0].endAngle);
                    return (/**
                     * @param {?} t
                     * @return {?}
                     */
                    function (t) {
                        d.endAngle = interpolate$1(t);
                        return _this.arc({
                            innerRadius: _this.radius - _this.gaugeWidth,
                            outerRadius: _this.radius,
                            startAngle: d.startAngle,
                            endAngle: d.endAngle
                        });
                    });
                }));
            });
            this.textTween = (/**
             * @param {?} transition
             * @param {?} value
             * @return {?}
             */
            function (transition, value) {
                value = d3.format('.4f')(value);
                value = value.replace(/,/g, '.');
                transition.tween('text', (/**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var interpolate$1 = d3.interpolate(d3.format('.4f')(+_this.oldValue), value);
                    return (/**
                     * @param {?} t
                     * @return {?}
                     */
                    function (t) {
                        _this.labelTween.text((/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) {
                            /** @type {?} */
                            var updatedNumber = _this.labelFormat(interpolate$1(t));
                            _this.label = updatedNumber;
                            return updatedNumber;
                        }));
                    });
                }));
            });
        }
        /**
         * @return {?}
         */
        PbdsDatavizGaugeComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.height = this.width;
            this.radius = Math.max(this.width, this.height) / 2;
            this.labelFormat = d3.format(this.labelFormatString);
            this.label = this.labelFormat(this.data.value);
            switch (this.type) {
                case 'halfmoon':
                    this.startAngle = -90;
                    this.endAngle = 90;
                    this.rounded = true;
                    break;
                case 'horseshoe':
                    this.startAngle = -140;
                    this.endAngle = 140;
                    this.rounded = true;
                    break;
                case 'circle':
                    this.startAngle = 0;
                    this.endAngle = 360;
                    this.rounded = false;
                    break;
            }
            this.arc = d3.arc().cornerRadius(this.rounded ? this.gaugeWidth : 0);
            this.chart = d3.select(this._element.nativeElement).attr('aria-hidden', 'true');
            this.svg = this.chart
                .append('svg')
                .attr('width', this.width)
                .attr('height', this.height)
                .attr('class', 'img-fluid')
                .attr('preserveAspectRatio', 'xMinYMin meet')
                .attr('viewBox', "-" + this.width / 2 + " -" + this.height / 2 + " " + this.width + " " + this.height);
            this.drawChart();
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        PbdsDatavizGaugeComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes.data && !changes.data.firstChange) {
                this.oldValue = changes.data.previousValue.value;
                this.updateChart();
            }
        };
        PbdsDatavizGaugeComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pbds-dataviz-gauge',
                        template: "\n    <div\n      *ngIf=\"!hideLabel\"\n      class=\"gauge-details\"\n      [ngClass]=\"{ halfmoon: type === 'halfmoon', 'gauge-details-small': type === 'halfmoon' }\"\n      [ngStyle]=\"{ 'max-width.px': width - 3 * gaugeWidth }\"\n    >\n      <div class=\"gauge-number\">{{ label }}</div>\n      <div *ngIf=\"description\" class=\"gauge-description text-center\">{{ description }}</div>\n    </div>\n  "
                    }] }
        ];
        /** @nocollapse */
        PbdsDatavizGaugeComponent.ctorParameters = function () { return [
            { type: PbdsDatavizService },
            { type: core.ElementRef }
        ]; };
        PbdsDatavizGaugeComponent.propDecorators = {
            chartClass: [{ type: core.HostBinding, args: ['class.pbds-chart',] }],
            gaugeClass: [{ type: core.HostBinding, args: ['class.pbds-chart-gauge',] }],
            data: [{ type: core.Input }],
            width: [{ type: core.Input }],
            type: [{ type: core.Input }],
            color: [{ type: core.Input }],
            hideLabel: [{ type: core.Input }],
            labelFormatString: [{ type: core.Input }],
            description: [{ type: core.Input }],
            gaugeWidth: [{ type: core.Input }]
        };
        return PbdsDatavizGaugeComponent;
    }());
    if (false) {
        /** @type {?} */
        PbdsDatavizGaugeComponent.prototype.chartClass;
        /** @type {?} */
        PbdsDatavizGaugeComponent.prototype.gaugeClass;
        /** @type {?} */
        PbdsDatavizGaugeComponent.prototype.data;
        /** @type {?} */
        PbdsDatavizGaugeComponent.prototype.width;
        /** @type {?} */
        PbdsDatavizGaugeComponent.prototype.type;
        /** @type {?} */
        PbdsDatavizGaugeComponent.prototype.color;
        /** @type {?} */
        PbdsDatavizGaugeComponent.prototype.hideLabel;
        /** @type {?} */
        PbdsDatavizGaugeComponent.prototype.labelFormatString;
        /** @type {?} */
        PbdsDatavizGaugeComponent.prototype.description;
        /** @type {?} */
        PbdsDatavizGaugeComponent.prototype.gaugeWidth;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizGaugeComponent.prototype.chart;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizGaugeComponent.prototype.svg;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizGaugeComponent.prototype.gauge;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizGaugeComponent.prototype.labelTween;
        /** @type {?} */
        PbdsDatavizGaugeComponent.prototype.label;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizGaugeComponent.prototype.startAngle;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizGaugeComponent.prototype.endAngle;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizGaugeComponent.prototype.radius;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizGaugeComponent.prototype.arc;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizGaugeComponent.prototype.labelFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizGaugeComponent.prototype.oldValue;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizGaugeComponent.prototype.height;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizGaugeComponent.prototype.rounded;
        /** @type {?} */
        PbdsDatavizGaugeComponent.prototype.degreesToRadians;
        /** @type {?} */
        PbdsDatavizGaugeComponent.prototype.calculateMinMax;
        /** @type {?} */
        PbdsDatavizGaugeComponent.prototype.calculateCurve;
        /** @type {?} */
        PbdsDatavizGaugeComponent.prototype.drawChart;
        /** @type {?} */
        PbdsDatavizGaugeComponent.prototype.updateChart;
        /** @type {?} */
        PbdsDatavizGaugeComponent.prototype.arcTween;
        /** @type {?} */
        PbdsDatavizGaugeComponent.prototype.textTween;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizGaugeComponent.prototype._dataviz;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizGaugeComponent.prototype._element;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PbdsDatavizSparklineComponent = /** @class */ (function () {
        function PbdsDatavizSparklineComponent(_element) {
            this._element = _element;
            this.chartClass = true;
            this.sparklineClass = true;
            this.width = 160;
            this.height = 40;
            this.type = 'line';
            this.color = '#E23DA8';
            this.colorNegative = null; // undocumented, may add if needed
            // undocumented, may add if needed
            this.strokeWidth = 2; // undocumented, width is automatically set by the type
            // undocumented, width is automatically set by the type
            this.yAxisMinBuffer = 0;
            this.yAxisMaxBuffer = 0;
        }
        /**
         * @return {?}
         */
        PbdsDatavizSparklineComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.margin = { top: 1, right: 0, bottom: 1, left: 0 };
            if (this.type === 'bar') {
                this.margin = { top: 0, right: 0, bottom: 0, left: 0 };
            }
            if (this.type === 'line-high' || this.type === 'area-high') {
                this.strokeWidth = 1;
            }
            if (this.colorNegative === null) {
                this.colorNegative = this.color;
            }
            this.chart = d3.select(this._element.nativeElement).attr('aria-hidden', 'true');
            this.svg = this.chart
                .append('svg')
                .attr('width', this.width)
                .attr('height', this.height)
                .attr('class', 'img-fluid')
                .attr('preserveAspectRatio', 'xMinYMin meet')
                .attr('viewBox', "-" + this.margin.left + " -" + this.margin.top + " " + this.width + " " + this.height);
            if (this.type === 'line' || this.type === 'line-high' || this.type === 'area' || this.type === 'area-high') {
                this.svg
                    .append('path')
                    .attr('class', 'sparkline')
                    .attr('fill', 'none')
                    .attr('stroke-width', this.strokeWidth)
                    .attr('stroke', this.color);
            }
            if (this.type === 'area' || this.type === 'area-high') {
                this.svg
                    .append('path')
                    .attr('class', 'sparkarea')
                    .attr('fill', this.color)
                    .attr('fill-opacity', 0.3);
            }
            this.updateChart();
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        PbdsDatavizSparklineComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes.data && !changes.data.firstChange) {
                this.updateChart();
            }
        };
        /**
         * @return {?}
         */
        PbdsDatavizSparklineComponent.prototype.updateChart = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var data = this.data;
            /** @type {?} */
            var x = d3.scaleLinear()
                .domain([0, this.data.length])
                .range([0, this.width - this.margin.left - this.margin.right]);
            /** @type {?} */
            var y = d3.scaleLinear()
                .domain([+d3.min(this.data) - this.yAxisMinBuffer, +d3.max(this.data) + this.yAxisMaxBuffer])
                .range([this.height - this.margin.top - this.margin.bottom, 0]);
            /** @type {?} */
            var line$1 = d3.line()
                .x((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            function (d, i) { return x(i); }))
                .y((/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return y(d); }));
            /** @type {?} */
            var area$1 = d3.area()
                .x((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            function (d, i) { return x(i); }))
                .y0(this.height)
                .y1((/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return y(d); }));
            if (this.type === 'line' || this.type === 'line-high' || this.type === 'area' || this.type === 'area-high') {
                this.svg
                    .selectAll('.sparkline')
                    .transition()
                    .duration(1000)
                    .attr('d', (/**
                 * @return {?}
                 */
                function () { return line$1(data); }));
            }
            if (this.type === 'area' || this.type === 'area-high') {
                this.svg
                    .selectAll('.sparkarea')
                    .transition()
                    .duration(1000)
                    .attr('d', (/**
                 * @return {?}
                 */
                function () { return area$1(data); }));
            }
            if (this.type === 'bar') {
                /** @type {?} */
                var barWidth_1 = (this.width - this.data.length) / this.data.length;
                // handles negative values, see example https://www.essycode.com/posts/create-sparkline-charts-d3/
                this.svg
                    .selectAll('.sparkbar')
                    .data(this.data)
                    .join((/**
                 * @param {?} enter
                 * @return {?}
                 */
                function (enter) {
                    return enter
                        .append('rect')
                        .attr('class', 'sparkbar')
                        .attr('x', (/**
                     * @param {?} d
                     * @param {?} i
                     * @return {?}
                     */
                    function (d, i) { return x(i); }))
                        .attr('y', _this.height)
                        .attr('width', barWidth_1)
                        .attr('fill', (/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return (d > 0 ? _this.color : _this.colorNegative); })) // still uses undocumented negative color values
                        .attr('height', 0)
                        .call((/**
                     * @param {?} enter
                     * @return {?}
                     */
                    function (enter) {
                        enter
                            .transition()
                            .duration(1000)
                            .attr('y', (/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return (d > 0 ? y(d) : y(0)); }))
                            .attr('height', (/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return Math.abs(y(d) - y(0)); }));
                        return enter;
                    }));
                }), (/**
                 * @param {?} update
                 * @return {?}
                 */
                function (update) {
                    return update
                        .transition()
                        .duration(1000)
                        .attr('x', (/**
                     * @param {?} d
                     * @param {?} i
                     * @return {?}
                     */
                    function (d, i) { return x(i); }))
                        .attr('y', (/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return (d > 0 ? y(d) : y(0)); }))
                        .attr('width', barWidth_1)
                        .attr('height', (/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return Math.abs(y(d) - y(0)); }))
                        .attr('fill', (/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return (d > 0 ? _this.color : _this.colorNegative); }));
                }), (/**
                 * @param {?} exit
                 * @return {?}
                 */
                function (exit) { return exit.remove(); }));
            }
        };
        PbdsDatavizSparklineComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pbds-dataviz-sparkline',
                        template: "",
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        PbdsDatavizSparklineComponent.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        PbdsDatavizSparklineComponent.propDecorators = {
            chartClass: [{ type: core.HostBinding, args: ['class.pbds-chart',] }],
            sparklineClass: [{ type: core.HostBinding, args: ['class.pbds-chart-sparkline',] }],
            data: [{ type: core.Input }],
            width: [{ type: core.Input }],
            height: [{ type: core.Input }],
            type: [{ type: core.Input }],
            color: [{ type: core.Input }],
            colorNegative: [{ type: core.Input }],
            strokeWidth: [{ type: core.Input }],
            yAxisMinBuffer: [{ type: core.Input }],
            yAxisMaxBuffer: [{ type: core.Input }]
        };
        return PbdsDatavizSparklineComponent;
    }());
    if (false) {
        /** @type {?} */
        PbdsDatavizSparklineComponent.prototype.chartClass;
        /** @type {?} */
        PbdsDatavizSparklineComponent.prototype.sparklineClass;
        /** @type {?} */
        PbdsDatavizSparklineComponent.prototype.data;
        /** @type {?} */
        PbdsDatavizSparklineComponent.prototype.width;
        /** @type {?} */
        PbdsDatavizSparklineComponent.prototype.height;
        /** @type {?} */
        PbdsDatavizSparklineComponent.prototype.type;
        /** @type {?} */
        PbdsDatavizSparklineComponent.prototype.color;
        /** @type {?} */
        PbdsDatavizSparklineComponent.prototype.colorNegative;
        /** @type {?} */
        PbdsDatavizSparklineComponent.prototype.strokeWidth;
        /** @type {?} */
        PbdsDatavizSparklineComponent.prototype.yAxisMinBuffer;
        /** @type {?} */
        PbdsDatavizSparklineComponent.prototype.yAxisMaxBuffer;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizSparklineComponent.prototype.chart;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizSparklineComponent.prototype.svg;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizSparklineComponent.prototype.margin;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizSparklineComponent.prototype._element;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PbdsDatavizBarStackedComponent = /** @class */ (function () {
        function PbdsDatavizBarStackedComponent(_dataviz, _element, _scroll) {
            var _this = this;
            this._dataviz = _dataviz;
            this._element = _element;
            this._scroll = _scroll;
            this.chartClass = true;
            this.stackedBarClass = true;
            this.width = 306;
            this.height = 400;
            this.type = 'medium'; // debug to show all chart options
            // debug to show all chart options
            this.marginTop = 10; // hardcoded on purpose, do not document until feedback
            // hardcoded on purpose, do not document until feedback
            this.marginRight = 0; // hardcoded on purpose, do not document until feedback
            // hardcoded on purpose, do not document until feedback
            this.marginBottom = 30; // hardcoded on purpose, do not document until feedback
            // hardcoded on purpose, do not document until feedback
            this.marginLeft = 55; // hardcoded on purpose, do not document until feedback
            // hardcoded on purpose, do not document until feedback
            this.hideXAxis = false;
            this.xAxisFormatType = null;
            this.xAxisFormatString = '';
            this.yAxisFormatType = null;
            this.yAxisFormatString = '';
            this.yAxisTicks = 5;
            this.yAxisMaxBuffer = 0.01;
            this.hideLegend = false;
            this.legendWidth = 105 + 28; // hardcoded legend width + left margin, do not document until feedback
            // hardcoded legend width + left margin, do not document until feedback
            this.legendPosition = 'right';
            this.legendLabelFormatType = null;
            this.legendLabelFormatString = '';
            this.tooltipHeadingFormatType = null;
            this.tooltipHeadingFormatString = '';
            this.tooltipHeadingValueFormatType = null;
            this.tooltipHeadingValueFormatString = '';
            this.tooltipLabelFormatType = null;
            this.tooltipLabelFormatString = '';
            this.tooltipValueFormatType = null;
            this.tooltipValueFormatString = '';
            this.hovered = new core.EventEmitter();
            this.clicked = new core.EventEmitter();
            this.updateChart = (/**
             * @param {?=} firstRun
             * @return {?}
             */
            function (firstRun) {
                if (firstRun === void 0) { firstRun = true; }
                _this.dataKeys = Object.keys(_this.data[0]).filter((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return item !== 'key'; }));
                // create the D3 stack data
                _this.dataStack = d3.stack()
                    .keys(_this.dataKeys)
                    .order(d3.stackOrderNone)(_this.data);
                // update the xScale
                _this.xAxisScale.domain(_this.data.map((/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return d.key; })));
                // update the yScale
                _this.yAxisMax = d3.max(_this.dataStack, (/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) {
                    return d3.max(data, (/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) {
                        return d[1];
                    }));
                }));
                _this.yAxisMax = _this.yAxisMax + _this.yAxisMax * _this.yAxisMaxBuffer;
                _this.yAxisScale
                    .domain([0, _this.yAxisMax])
                    .rangeRound([_this.height, 0])
                    .nice();
                _this.xAxis
                    .transition()
                    .duration(0) // 1000
                    .call(_this.xAxisCall);
                _this.yAxis
                    .transition()
                    .duration(0) // 1000
                    .call(_this.yAxisCall);
                // update the grids
                if (!_this.hideXGrid) {
                    _this.xGrid
                        .transition()
                        .duration(0) // 1000
                        .call(_this.xGridCall);
                }
                if (!_this.hideYGrid) {
                    _this.yGrid
                        .transition()
                        .duration(0) // 1000
                        .call(_this.yGridCall);
                }
                // add gray bars
                if (!_this.hideGrayBars) {
                    _this.grayBars
                        .selectAll('.gray-bar')
                        .data(_this.data)
                        .join((/**
                     * @param {?} enter
                     * @return {?}
                     */
                    function (enter) {
                        return enter
                            .append('rect')
                            .attr('class', 'gray-bar')
                            .attr('x', (/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return _this.xAxisScale(d.key); }))
                            .attr('width', _this.xAxisScale.bandwidth())
                            .attr('height', _this.height);
                    }), (/**
                     * @param {?} update
                     * @return {?}
                     */
                    function (update) {
                        return update
                            .transition()
                            .duration((/**
                         * @param {?} d
                         * @param {?} i
                         * @param {?} n
                         * @return {?}
                         */
                        function (d, i, n) { return (firstRun ? 0 : 1000); }))
                            .attr('x', (/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return _this.xAxisScale(d.key); }))
                            .attr('width', _this.xAxisScale.bandwidth())
                            .attr('height', _this.height);
                    }), (/**
                     * @param {?} exit
                     * @return {?}
                     */
                    function (exit) { return exit.remove(); }));
                }
                // add colored bars
                /** @type {?} */
                var barGroups = _this.bars
                    .selectAll('.bar-group')
                    .data(_this.dataStack)
                    .join((/**
                 * @param {?} enter
                 * @return {?}
                 */
                function (enter) {
                    return enter
                        .append('g')
                        .attr('class', 'bar-group')
                        .attr('fill', (/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return _this.colorRange(d.index); }));
                }), (/**
                 * @param {?} update
                 * @return {?}
                 */
                function (update) { return update.attr('fill', (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return _this.colorRange(d.index); })); }), (/**
                 * @param {?} exit
                 * @return {?}
                 */
                function (exit) { return exit.remove(); }));
                barGroups
                    .selectAll('.bar')
                    .data((/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return d; }))
                    .join((/**
                 * @param {?} enter
                 * @return {?}
                 */
                function (enter) {
                    return enter
                        .append('rect')
                        .attr('class', 'bar')
                        .classed('bar-divided', _this.type !== 'high')
                        .classed('bar-divided-low', _this.type === 'low')
                        .attr('x', (/**
                     * @param {?} d
                     * @param {?} i
                     * @return {?}
                     */
                    function (d, i) {
                        /** @type {?} */
                        var x;
                        if (_this.type === 'medium') {
                            x = _this.xAxisScale(d.data.key) + (_this.xAxisScale.bandwidth() / 8) * 3;
                        }
                        else {
                            x = _this.xAxisScale(d.data.key) + (_this.xAxisScale.bandwidth() / 4) * 1;
                        }
                        return x;
                    }))
                        .attr('y', (/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return _this.yAxisScale(d[0]); }))
                        .attr('width', (/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) {
                        /** @type {?} */
                        var width;
                        if (_this.type === 'medium') {
                            width = _this.xAxisScale.bandwidth() / 4;
                        }
                        else {
                            width = _this.xAxisScale.bandwidth() / 2;
                        }
                        return width;
                    }))
                        .attr('height', 0)
                        .call((/**
                     * @param {?} enter
                     * @return {?}
                     */
                    function (enter) {
                        enter
                            .transition()
                            .duration((/**
                         * @param {?} d
                         * @param {?} i
                         * @param {?} n
                         * @return {?}
                         */
                        function (d, i, n) { return (firstRun ? 0 : 500); }))
                            .delay((/**
                         * @param {?} d
                         * @param {?} i
                         * @param {?} n
                         * @return {?}
                         */
                        function (d, i, n) { return (firstRun ? 0 : 750); }))
                            .attr('y', (/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return _this.yAxisScale(d[1]); }))
                            .attr('height', (/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) {
                            return _this.yAxisScale(d[0]) - _this.yAxisScale(d[1]);
                        }));
                        return enter;
                    }));
                }), (/**
                 * @param {?} update
                 * @return {?}
                 */
                function (update) {
                    return update.call((/**
                     * @param {?} update
                     * @return {?}
                     */
                    function (update) {
                        // let width;
                        // if (this.type === 'medium') {
                        //   width = this.xAxisScale.bandwidth() / 4;
                        // } else {
                        //   width = this.xAxisScale.bandwidth() / 2;
                        // }
                        update
                            .transition()
                            .duration(1000)
                            .attr('width', _this.xAxisScale.bandwidth() / 4)
                            .attr('x', (/**
                         * @param {?} d
                         * @param {?} i
                         * @return {?}
                         */
                        function (d, i) { return _this.xAxisScale(d.data.key) + (_this.xAxisScale.bandwidth() / 8) * 3; }))
                            .attr('y', (/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return _this.yAxisScale(d[1]); }))
                            .attr('height', (/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return _this.yAxisScale(d[0]) - _this.yAxisScale(d[1]); }));
                        return update;
                    }));
                }), (/**
                 * @param {?} exit
                 * @return {?}
                 */
                function (exit) { return exit.remove(); }));
                // mouseover bars
                _this.mouseBars
                    .selectAll('.mouseover-bar')
                    .data(_this.data)
                    .join((/**
                 * @param {?} enter
                 * @return {?}
                 */
                function (enter) {
                    return enter
                        .append('rect')
                        .attr('class', 'mouseover-bar')
                        .style('opacity', 0)
                        .attr('x', (/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return _this.xAxisScale(d.key); }))
                        .attr('width', _this.xAxisScale.bandwidth())
                        .attr('height', _this.height);
                }), (/**
                 * @param {?} update
                 * @return {?}
                 */
                function (update) {
                    return update
                        .attr('pointer-events', 'none')
                        .attr('x', (/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return _this.xAxisScale(d.key); }))
                        .attr('width', _this.xAxisScale.bandwidth())
                        .attr('height', _this.height)
                        .transition()
                        .attr('pointer-events', 'auto');
                }), (/**
                 * @param {?} exit
                 * @return {?}
                 */
                function (exit) {
                    return exit
                        .transition()
                        .attr('pointer-events', 'none')
                        .remove();
                }))
                    .on('mouseover', (/**
                 * @param {?} data
                 * @param {?} index
                 * @param {?} nodes
                 * @return {?}
                 */
                function (data, index, nodes) { return _this.barMouseOver(d3.event, data, index, nodes); }))
                    .on('mouseout', (/**
                 * @param {?} data
                 * @param {?} index
                 * @param {?} nodes
                 * @return {?}
                 */
                function (data, index, nodes) { return _this.barMouseOut(); }))
                    .on('click', (/**
                 * @param {?} data
                 * @param {?} index
                 * @param {?} nodes
                 * @return {?}
                 */
                function (data, index, nodes) { return _this.barMouseClick(d3.event, data, index, nodes); }));
                _this.bars.raise();
                _this.xAxis.raise();
                _this.mouseBars.raise();
                if (!_this.hideLegend) {
                    _this.chart
                        .select('.legend')
                        .selectAll('.legend-item')
                        .data(_this.dataStack)
                        .join((/**
                     * @param {?} enter
                     * @return {?}
                     */
                    function (enter) {
                        /** @type {?} */
                        var li = enter.append('li').attr('class', 'legend-item');
                        li.append('span')
                            .attr('class', 'legend-key')
                            .style('background-color', (/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return _this.colorRange(d.index); }));
                        li.append('span')
                            .attr('class', 'legend-label')
                            .html((/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) {
                            switch (_this.legendLabelFormatType) {
                                case 'number':
                                    return _this.legendLabelFormat(d.key);
                                case 'time':
                                    /** @type {?} */
                                    var parsedTime = d3.isoParse(d.key);
                                    return _this.legendLabelFormat(parsedTime);
                                default:
                                    return d.key;
                            }
                        }));
                        return li;
                    }), (/**
                     * @param {?} update
                     * @return {?}
                     */
                    function (update) {
                        update.select('.legend-label').html((/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) {
                            switch (_this.legendLabelFormatType) {
                                case 'number':
                                    return _this.legendLabelFormat(d.key);
                                case 'time':
                                    /** @type {?} */
                                    var parsedTime = d3.isoParse(d.key);
                                    return _this.legendLabelFormat(parsedTime);
                                default:
                                    return d.key;
                            }
                        }));
                        return update;
                    }), (/**
                     * @param {?} exit
                     * @return {?}
                     */
                    function (exit) { return exit.remove(); }))
                        .on('mouseover', (/**
                     * @param {?} data
                     * @param {?} index
                     * @param {?} nodes
                     * @return {?}
                     */
                    function (data, index, nodes) { return _this.legendMouseOver(d3.event, data, index, nodes); }))
                        .on('mouseout', (/**
                     * @return {?}
                     */
                    function () { return _this.legendMouseOut(); }))
                        .on('click', (/**
                     * @param {?} data
                     * @param {?} index
                     * @param {?} nodes
                     * @return {?}
                     */
                    function (data, index, nodes) { return _this.legendMouseClick(d3.event, data, index, nodes); }));
                }
            });
            this.barMouseOver = (/**
             * @param {?} event
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (event, data, index, nodes) {
                _this.chart
                    .selectAll('.bar-group')
                    .selectAll('.bar')
                    .filter((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return i !== index; }))
                    .classed('inactive', true);
                _this.tooltipShow(data, index, nodes[index]);
                _this.hovered.emit({ event: event, data: data });
            });
            this.barMouseOut = (/**
             * @return {?}
             */
            function () {
                _this.chart.selectAll('.bar').classed('inactive', false);
                _this.tooltipHide();
            });
            this.barMouseClick = (/**
             * @param {?} event
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (event, data, index, nodes) {
                _this.clicked.emit({ event: event, data: data });
            });
            this.legendMouseOver = (/**
             * @param {?} event
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (event, data, index, nodes) {
                _this.chart
                    .selectAll('.legend-item')
                    .filter((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return i !== index; }))
                    .classed('inactive', true);
                _this.chart
                    .selectAll('.bar-group')
                    .filter((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return i !== index; }))
                    .classed('inactive', true);
                _this.hovered.emit({ event: event, data: data });
            });
            this.legendMouseOut = (/**
             * @return {?}
             */
            function () {
                _this.chart.selectAll('.legend-item').classed('inactive', false);
                _this.chart.selectAll('.bar-group').classed('inactive', false);
                _this.tooltipHide();
            });
            this.legendMouseClick = (/**
             * @param {?} event
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (event, data, index, nodes) {
                _this.clicked.emit({ event: event, data: data });
            });
            this.xAxisFormatter = (/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                switch (_this.xAxisFormatType) {
                    case 'number':
                        return _this.xAxisFormat(item);
                    case 'time':
                        /** @type {?} */
                        var parseDate = d3.isoParse(item);
                        return _this.xAxisFormat(parseDate);
                    default:
                        return item;
                }
            });
            this.tooltipShow = (/**
             * @param {?} data
             * @param {?} index
             * @param {?} node
             * @return {?}
             */
            function (data, index, node) {
                // console.log('TOOLTIP: ', data, index, node);
                // console.log('TOOLTIP: ', data, index, node);
                /** @type {?} */
                var scroll = _this._scroll.getScrollPosition();
                /** @type {?} */
                var mouserectDimensions = node.getBoundingClientRect();
                /** @type {?} */
                var clientWidth = document.body.clientWidth - 10;
                /** @type {?} */
                var dimensionCalculated;
                /** @type {?} */
                var tooltipDimensions;
                /** @type {?} */
                var tooltipOffsetHeight;
                /** @type {?} */
                var yPosition;
                /** @type {?} */
                var xPosition;
                // console.log(scroll, mouserectDimensions, tooltipOffsetHeight, tooltipDimensions, dimensionCalculated, clientWidth);
                _this.tooltip.select('.tooltip-header').html((/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) {
                    switch (_this.tooltipHeadingFormatType) {
                        case 'time':
                            /** @type {?} */
                            var parseDate = d3.isoParse(data.key);
                            return _this.tooltipHeadingFormat(parseDate);
                        default:
                            return data.key;
                    }
                }));
                _this.tooltip.select('.tooltip-header-value').html((/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) {
                    /** @type {?} */
                    var total = 0;
                    Object.keys(data).map((/**
                     * @param {?} e
                     * @return {?}
                     */
                    function (e) {
                        if (e !== 'key') {
                            total = total + data[e];
                        }
                    }));
                    return _this.tooltipHeadingValueFormat(total);
                }));
                _this.tooltip
                    .select('.tooltip-table')
                    .select('tbody')
                    .html((/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) {
                    /** @type {?} */
                    var html = "";
                    /** @type {?} */
                    var label;
                    /** @type {?} */
                    var value;
                    Object.keys(data).map((/**
                     * @param {?} key
                     * @param {?} index
                     * @return {?}
                     */
                    function (key, index) {
                        switch (_this.tooltipLabelFormatType) {
                            case 'time':
                                /** @type {?} */
                                var parseDate = d3.isoParse(key);
                                label = _this.tooltipHeadingFormat(parseDate);
                                break;
                            default:
                                label = key;
                        }
                        switch (_this.tooltipValueFormatType) {
                            case 'number':
                                value = _this.tooltipValueFormat(data[key]);
                                break;
                            default:
                                value = data[key];
                        }
                        if (key !== 'key') {
                            html += "\n              <tr class='tooltip-item'>\n                <td style=\"color: " + _this.colorRange(index - 1) + "\">\n                  <span class=\"pbds-tooltip-key\"></span>\n                </td>\n                <td class=\"tooltip-label pr-2 text-nowrap\">" + label + "</td>\n                <td class=\"tooltip-value text-right text-nowrap\">" + value + "</td>\n              </tr>\n            ";
                        }
                    }));
                    return html;
                }));
                tooltipDimensions = _this.tooltip.node().getBoundingClientRect();
                dimensionCalculated = mouserectDimensions.left + mouserectDimensions.width + tooltipDimensions.width + 8;
                tooltipOffsetHeight = +_this.tooltip.node().offsetHeight;
                // flip the tooltip positions if near the right edge of the screen
                if (dimensionCalculated > clientWidth) {
                    _this.tooltip.classed('east', true);
                    _this.tooltip.classed('west', false);
                    if (_this.type === 'medium') {
                        xPosition = mouserectDimensions.left + (mouserectDimensions.width / 8) * 3 - tooltipDimensions.width - 8 + "px";
                    }
                    else {
                        xPosition = mouserectDimensions.left + (mouserectDimensions.width / 4) * 1 - tooltipDimensions.width - 8 + "px";
                    }
                }
                else if (dimensionCalculated < clientWidth) {
                    _this.tooltip.classed('east', false);
                    _this.tooltip.classed('west', true);
                    if (_this.type === 'medium') {
                        xPosition = mouserectDimensions.left + (mouserectDimensions.width / 8) * 5 + 8 + "px";
                    }
                    else {
                        xPosition = mouserectDimensions.left + (mouserectDimensions.width / 4) * 3 + 8 + "px";
                    }
                }
                yPosition = _this.svg
                    .selectAll('.bar-group')
                    .filter(':last-child')
                    .selectAll('.bar')
                    .filter((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return i === index; }))
                    .node()
                    .getBoundingClientRect();
                // set the tooltip styles
                _this.tooltip.style('top', yPosition.top - tooltipOffsetHeight / 2 + scroll[1] + "px");
                _this.tooltip.style('left', xPosition);
                _this.tooltip.style('opacity', 1);
            });
            this.tooltipHide = (/**
             * @return {?}
             */
            function () {
                _this.tooltip.style('opacity', 0);
            });
            this.yAxisFormatter = (/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                switch (_this.yAxisFormatType) {
                    case 'number':
                        return _this.yAxisFormat(item);
                    case 'time':
                        /** @type {?} */
                        var parseDate = d3.isoParse(item);
                        return _this.yAxisFormat(parseDate);
                    default:
                        return item;
                }
            });
        }
        /**
         * @return {?}
         */
        PbdsDatavizBarStackedComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            // extract keys for stack data
            this.dataKeys = Object.keys(this.data[0]).filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item !== 'key'; }));
            // create the D3 stack data
            this.dataStack = d3.stack()
                .keys(this.dataKeys)
                .order(d3.stackOrderNone)(this.data);
            //////////////////////////////////////////
            this.margin = {
                top: +this.marginTop,
                right: +this.marginRight,
                bottom: +this.marginBottom,
                left: +this.marginLeft
            };
            // create formatters
            this.xAxisFormat = this._dataviz.d3Format(this.xAxisFormatType, this.xAxisFormatString);
            this.yAxisFormat = this._dataviz.d3Format(this.yAxisFormatType, this.yAxisFormatString);
            this.legendLabelFormat = this._dataviz.d3Format(this.legendLabelFormatType, this.legendLabelFormatString);
            this.tooltipHeadingFormat = this._dataviz.d3Format(this.tooltipHeadingFormatType, this.tooltipHeadingFormatString);
            this.tooltipHeadingValueFormat = this._dataviz.d3Format(this.tooltipHeadingValueFormatType, this.tooltipHeadingValueFormatString);
            this.tooltipLabelFormat = this._dataviz.d3Format(this.tooltipLabelFormatType, this.tooltipLabelFormatString);
            this.tooltipValueFormat = this._dataviz.d3Format(this.tooltipValueFormatType, this.tooltipValueFormatString);
            // defaults for all chart types
            this.hideGrayBars = false;
            this.hideYAxis = false;
            this.hideXAxisZero = false;
            this.hideYAxisZero = false;
            this.hideXGrid = false;
            this.hideYGrid = false;
            this.hideXAxisDomain = false;
            this.hideYAxisDomain = false;
            this.hideTooltip = false;
            this.hideXAxisTicks = false;
            this.hideYAxisTicks = false;
            this.xAxisTickSize = 8;
            this.xAxisTickSizeOuter = 0;
            this.yAxisTickSize = 8;
            this.yAxisTickSizeOuter = 0;
            // this.hideTooltipLabel = false;
            if (this.type !== 'debug') {
                // set type defaults
                switch (this.type) {
                    case 'low':
                        this.hideGrayBars = true;
                        this.hideXAxisTicks = true;
                        this.hideXGrid = true;
                        this.hideYAxisDomain = false;
                        this.hideYAxisTicks = true;
                        this.legendPosition = 'bottom';
                        break;
                    case 'medium':
                        this.hideXAxisDomain = true;
                        this.hideXGrid = true;
                        this.hideXAxisTicks = true;
                        this.hideYAxisDomain = true;
                        this.hideYAxisTicks = true;
                        this.hideYGrid = true;
                        break;
                    case 'high':
                        this.hideXAxis = true;
                        this.hideXAxisTicks = true;
                        this.hideXAxisDomain = true;
                        this.hideXGrid = true;
                        this.hideYAxisDomain = true;
                        this.hideYAxisTicks = true;
                        this.hideYGrid = true;
                        this.hideLegend = false;
                        this.legendPosition = 'bottom';
                        break;
                }
            }
            // adjust margin if xAxis hidden
            if (this.hideXAxis)
                this.margin.bottom = 10; // need small margin for yAxis with 0 tick label
            if (!this.hideLegend && this.legendPosition === 'right') {
                this.width = +this.width - +this.legendWidth;
            }
            // create the chart
            this.chart = d3.select(this._element.nativeElement).attr('aria-hidden', 'true');
            // create chart svg
            this.svg = this.chart
                .append('svg')
                .attr('width', +this.width)
                .attr('height', +this.height + this.margin.top + this.margin.bottom)
                .attr('class', 'img-fluid')
                .attr('preserveAspectRatio', 'xMinYMin meet')
                .attr('viewBox', "-" + this.margin.left + " -" + this.margin.top + " " + +this.width + " " + (+this.height + this.margin.top + this.margin.bottom));
            this.grayBars = this.svg.append('g').attr('class', 'gray-bars');
            this.mouseBars = this.svg.append('g').attr('class', 'mouseover-bars');
            this.bars = this.svg.append('g').attr('class', 'bars');
            // build color ranges
            this.colorRange = d3.scaleOrdinal().range(this._dataviz.getColors(false, this.theme));
            // X AXIS
            this.xAxisScale = d3.scaleBand()
                .domain(this.data.map((/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return d.key; })))
                .rangeRound([0, this.width - this.margin.left])
                .align(0);
            // add padding to the scale for gray bars
            !this.hideGrayBars
                ? this.xAxisScale.paddingInner(0.1).paddingOuter(0)
                : this.xAxisScale.paddingInner(0).paddingOuter(0);
            this.xAxisCall = d3.axisBottom(this.xAxisScale)
                .tickSize(this.xAxisTickSize)
                .tickSizeOuter(this.xAxisTickSizeOuter)
                .tickFormat(this.xAxisFormatter);
            this.xAxis = this.svg
                .append('g')
                .attr('class', 'axis axis-x')
                .attr('transform', "translate(0, " + this.height + ")")
                .classed('axis-hidden', this.hideXAxis)
                .classed('axis-zero-hidden', this.hideXAxisZero)
                .classed('axis-domain-hidden', this.hideXAxisDomain)
                .classed('axis-ticks-hidden', this.hideXAxisTicks)
                .call(this.xAxisCall);
            // X GRIDLINES
            if (!this.hideXGrid) {
                this.xGridCall = d3.axisBottom(this.xAxisScale).tickSize(-this.height);
                this.xGrid = this.svg
                    .append('g')
                    .attr('class', 'grid grid-x')
                    .classed('grid-zero-hidden', this.hideXAxisZero)
                    .attr('transform', "translate(0, " + this.height + ")")
                    .call(this.xGridCall);
            }
            // KEEP: use this block to debug yAxisMax
            // console.log(
            //   d3_max(this.dataStack, (data: any) => {
            //     // console.log(data);
            //     return d3_max(data, (d: any) => {
            //       // console.log('D: ', d);
            //       return d[1];
            //     });
            //   })
            // );
            // Y AXIS
            this.yAxisMax = d3.max(this.dataStack, (/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                return d3.max(data, (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) {
                    return d[1];
                }));
            }));
            this.yAxisMax = this.yAxisMax + this.yAxisMax * this.yAxisMaxBuffer;
            this.yAxisScale = d3.scaleLinear()
                .domain([0, this.yAxisMax])
                .nice()
                .rangeRound([this.height, 0]);
            this.yAxisCall = d3.axisLeft(this.yAxisScale)
                .ticks(this.yAxisTicks)
                .tickSize(this.yAxisTickSize)
                .tickSizeOuter(this.yAxisTickSizeOuter)
                .tickFormat(this.yAxisFormatter);
            this.yAxis = this.svg
                .append('g')
                .attr('class', 'axis axis-y')
                .classed('axis-hidden', this.hideYAxis)
                .classed('axis-zero-hidden', this.hideYAxisZero)
                .classed('axis-domain-hidden', this.hideYAxisDomain)
                .classed('axis-ticks-hidden', this.hideYAxisTicks)
                .call(this.yAxisCall);
            // Y GRIDLINES
            if (!this.hideYGrid) {
                this.yGridCall = d3.axisLeft(this.yAxisScale)
                    .ticks(this.yAxisTicks)
                    .tickSize(-this.width + this.margin.left + this.margin.right);
                this.yGrid = this.svg
                    .append('g')
                    .attr('class', 'grid grid-y')
                    .classed('grid-zero-hidden', this.hideYAxisZero)
                    .attr('transform', "translate(0, 0)")
                    .call(this.yGridCall);
            }
            // TOOLTIP
            if (!this.hideTooltip) {
                this.tooltip = d3.select('body')
                    .append('div')
                    .attr('class', 'pbds-tooltip west')
                    .style('opacity', 0)
                    .attr('aria-hidden', 'true'); // hide tooltip for accessibility
                // tooltip header
                this.tooltip.append('div').attr('class', 'tooltip-header');
                this.tooltip.append('div').attr('class', 'tooltip-header-value');
                // tooltip table
                this.tooltip
                    .append('table')
                    .attr('class', 'tooltip-table text-left w-100')
                    .append('tbody');
            }
            // add legend classes
            if (!this.hideLegend) {
                this.chart.classed('pbds-chart-legend-bottom', this.legendPosition === 'bottom' ? true : false);
                this.chart.append('ul').attr('class', "legend legend-" + this.legendPosition);
            }
            this.updateChart();
        };
        /**
         * @return {?}
         */
        PbdsDatavizBarStackedComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            if (this.tooltip)
                this.tooltip.remove();
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        PbdsDatavizBarStackedComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes.data && !changes.data.firstChange) {
                this.updateChart(false);
            }
        };
        PbdsDatavizBarStackedComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pbds-dataviz-bar-stacked',
                        template: "",
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        PbdsDatavizBarStackedComponent.ctorParameters = function () { return [
            { type: PbdsDatavizService },
            { type: core.ElementRef },
            { type: common.ViewportScroller }
        ]; };
        PbdsDatavizBarStackedComponent.propDecorators = {
            chartClass: [{ type: core.HostBinding, args: ['class.pbds-chart',] }],
            stackedBarClass: [{ type: core.HostBinding, args: ['class.pbds-chart-stacked-bar',] }],
            data: [{ type: core.Input }],
            width: [{ type: core.Input }],
            height: [{ type: core.Input }],
            type: [{ type: core.Input }],
            marginTop: [{ type: core.Input }],
            marginRight: [{ type: core.Input }],
            marginBottom: [{ type: core.Input }],
            marginLeft: [{ type: core.Input }],
            hideXAxis: [{ type: core.Input }],
            xAxisFormatType: [{ type: core.Input }],
            xAxisFormatString: [{ type: core.Input }],
            yAxisFormatType: [{ type: core.Input }],
            yAxisFormatString: [{ type: core.Input }],
            yAxisTicks: [{ type: core.Input }],
            yAxisMaxBuffer: [{ type: core.Input }],
            hideLegend: [{ type: core.Input }],
            legendWidth: [{ type: core.Input }],
            legendPosition: [{ type: core.Input }],
            legendLabelFormatType: [{ type: core.Input }],
            legendLabelFormatString: [{ type: core.Input }],
            tooltipHeadingFormatType: [{ type: core.Input }],
            tooltipHeadingFormatString: [{ type: core.Input }],
            tooltipHeadingValueFormatType: [{ type: core.Input }],
            tooltipHeadingValueFormatString: [{ type: core.Input }],
            tooltipLabelFormatType: [{ type: core.Input }],
            tooltipLabelFormatString: [{ type: core.Input }],
            tooltipValueFormatType: [{ type: core.Input }],
            tooltipValueFormatString: [{ type: core.Input }],
            theme: [{ type: core.Input }],
            hovered: [{ type: core.Output }],
            clicked: [{ type: core.Output }]
        };
        return PbdsDatavizBarStackedComponent;
    }());
    if (false) {
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.chartClass;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.stackedBarClass;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.data;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.width;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.height;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.type;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.marginTop;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.marginRight;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.marginBottom;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.marginLeft;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.hideXAxis;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.xAxisFormatType;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.xAxisFormatString;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.yAxisFormatType;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.yAxisFormatString;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.yAxisTicks;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.yAxisMaxBuffer;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.hideLegend;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.legendWidth;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.legendPosition;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.legendLabelFormatType;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.legendLabelFormatString;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.tooltipHeadingFormatType;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.tooltipHeadingFormatString;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.tooltipHeadingValueFormatType;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.tooltipHeadingValueFormatString;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.tooltipLabelFormatType;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.tooltipLabelFormatString;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.tooltipValueFormatType;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.tooltipValueFormatString;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.theme;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.hovered;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.clicked;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.dataStack;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.dataKeys;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.chart;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.svg;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.grayBars;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.mouseBars;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.bars;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.margin;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.colorRange;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.hideGrayBars;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.xAxisScale;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.xAxisCall;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.xAxis;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.xAxisFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.xAxisTickSize;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.xAxisTickSizeOuter;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.hideXAxisDomain;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.hideXAxisZero;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.hideXAxisTicks;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.hideXGrid;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.hideYGrid;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.yAxisMax;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.yAxisScale;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.yAxisCall;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.yAxis;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.yAxisFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.yAxisTickSize;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.yAxisTickSizeOuter;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.xGrid;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.xGridCall;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.yGrid;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.yGridCall;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.hideYAxis;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.hideYAxisZero;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.hideYAxisDomain;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.hideYAxisTicks;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.legendLabelFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.tooltip;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.hideTooltip;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.tooltipHeadingFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.tooltipHeadingValueFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.tooltipValueFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.tooltipLabelFormat;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.updateChart;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.barMouseOver;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.barMouseOut;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.barMouseClick;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.legendMouseOver;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.legendMouseOut;
        /** @type {?} */
        PbdsDatavizBarStackedComponent.prototype.legendMouseClick;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.xAxisFormatter;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.tooltipShow;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.tooltipHide;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype.yAxisFormatter;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype._dataviz;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype._element;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarStackedComponent.prototype._scroll;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PbdsDatavizMetricIndicatorComponent = /** @class */ (function () {
        function PbdsDatavizMetricIndicatorComponent() {
            this.value = 0;
            this.class = '';
            this.indicator = 'flat';
            this.inverse = false;
        }
        Object.defineProperty(PbdsDatavizMetricIndicatorComponent.prototype, "hostClasses", {
            get: /**
             * @return {?}
             */
            function () {
                return ['metric-block-indicator', this.indicator, this.inverse ? 'inverse' : '', this.class].join(' ');
            },
            enumerable: true,
            configurable: true
        });
        PbdsDatavizMetricIndicatorComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pbds-dataviz-metric-indicator',
                        template: "\n    <span>{{ value }}</span>\n  "
                    }] }
        ];
        PbdsDatavizMetricIndicatorComponent.propDecorators = {
            value: [{ type: core.Input }],
            class: [{ type: core.Input }],
            indicator: [{ type: core.Input }],
            inverse: [{ type: core.Input }],
            hostClasses: [{ type: core.HostBinding, args: ['class',] }]
        };
        return PbdsDatavizMetricIndicatorComponent;
    }());
    if (false) {
        /** @type {?} */
        PbdsDatavizMetricIndicatorComponent.prototype.value;
        /** @type {?} */
        PbdsDatavizMetricIndicatorComponent.prototype.class;
        /** @type {?} */
        PbdsDatavizMetricIndicatorComponent.prototype.indicator;
        /** @type {?} */
        PbdsDatavizMetricIndicatorComponent.prototype.inverse;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PbdsDatavizMetricBlockComponent = /** @class */ (function () {
        function PbdsDatavizMetricBlockComponent() {
            this.class = '';
            this.heading = null;
            this.value = 0;
            this.unit = null;
            this.description = null;
            this.centered = false;
            this.centeredText = false;
            this.vertical = false;
            this.infoMessage = null;
            this.hideValueMargin = false;
            this.isPercentUnit = false;
            this.isUnit = false;
        }
        Object.defineProperty(PbdsDatavizMetricBlockComponent.prototype, "hostClasses", {
            get: /**
             * @return {?}
             */
            function () {
                return [
                    'metric-block',
                    this.centered ? 'metric-block-centered' : '',
                    this.centeredText ? 'metric-block-centered-text' : '',
                    this.vertical ? 'metric-block-vertical' : '',
                    this.class
                ].join(' ');
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        PbdsDatavizMetricBlockComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            if (!this.indicatorRef) {
                this.hideValueMargin = true;
            }
            if (this.unit !== '%' && this.unit !== null) {
                this.isUnit = true;
            }
            else if (this.unit === '%') {
                this.isPercentUnit = true;
            }
        };
        PbdsDatavizMetricBlockComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pbds-dataviz-metric-block',
                        template: "\n    <div class=\"metric-block-inner\">\n      <div *ngIf=\"heading\" class=\"metric-block-heading\">\n        {{ heading }}\n        <i\n          *ngIf=\"infoMessage\"\n          class=\"pbi-icon-mini pbi-info-circle-open ml-1 align-middle\"\n          ngbTooltip=\"{{ infoMessage }}\"\n          container=\"body\"\n        ></i>\n      </div>\n      <div class=\"metric-block-data-block\">\n        <div class=\"metric-block-contents\">\n          <div class=\"metric-block-value\" [ngClass]=\"{ 'mr-0': hideValueMargin }\">\n            {{ value\n            }}<span [ngClass]=\"{ 'metric-block-unit': isUnit, 'metric-block-percentage': isPercentUnit }\">{{\n              unit\n            }}</span>\n          </div>\n\n          <div>\n            <ng-content select=\"pbds-dataviz-metric-indicator\"></ng-content>\n          </div>\n          <div *ngIf=\"description\" class=\"metric-block-description\">{{ description }}</div>\n        </div>\n        <ng-content select=\"pbds-dataviz-sparkline\"></ng-content>\n      </div>\n    </div>\n  "
                    }] }
        ];
        PbdsDatavizMetricBlockComponent.propDecorators = {
            class: [{ type: core.Input }],
            heading: [{ type: core.Input }],
            value: [{ type: core.Input }],
            unit: [{ type: core.Input }],
            description: [{ type: core.Input }],
            centered: [{ type: core.Input }],
            centeredText: [{ type: core.Input }],
            vertical: [{ type: core.Input }],
            infoMessage: [{ type: core.Input }],
            hostClasses: [{ type: core.HostBinding, args: ['class',] }],
            indicatorRef: [{ type: core.ContentChild, args: [PbdsDatavizMetricIndicatorComponent, { static: true },] }]
        };
        return PbdsDatavizMetricBlockComponent;
    }());
    if (false) {
        /** @type {?} */
        PbdsDatavizMetricBlockComponent.prototype.class;
        /** @type {?} */
        PbdsDatavizMetricBlockComponent.prototype.heading;
        /** @type {?} */
        PbdsDatavizMetricBlockComponent.prototype.value;
        /** @type {?} */
        PbdsDatavizMetricBlockComponent.prototype.unit;
        /** @type {?} */
        PbdsDatavizMetricBlockComponent.prototype.description;
        /** @type {?} */
        PbdsDatavizMetricBlockComponent.prototype.centered;
        /** @type {?} */
        PbdsDatavizMetricBlockComponent.prototype.centeredText;
        /** @type {?} */
        PbdsDatavizMetricBlockComponent.prototype.vertical;
        /** @type {?} */
        PbdsDatavizMetricBlockComponent.prototype.infoMessage;
        /** @type {?} */
        PbdsDatavizMetricBlockComponent.prototype.hideValueMargin;
        /** @type {?} */
        PbdsDatavizMetricBlockComponent.prototype.isPercentUnit;
        /** @type {?} */
        PbdsDatavizMetricBlockComponent.prototype.isUnit;
        /** @type {?} */
        PbdsDatavizMetricBlockComponent.prototype.indicatorRef;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DatavizBubbleMapComponent = /** @class */ (function () {
        function DatavizBubbleMapComponent(_element, _scroll, _dataviz) {
            var _this = this;
            this._element = _element;
            this._scroll = _scroll;
            this._dataviz = _dataviz;
            this.chartClass = true;
            this.bubbleMapClass = true;
            this.feature = '';
            this.scale = null;
            this.center = null;
            this.width = 306;
            this.height = 400;
            this.type = 'medium'; // debug to show all chart options
            // debug to show all chart options
            this.dot = false;
            this.marginTop = 0;
            this.marginRight = 0;
            this.marginBottom = 0;
            this.marginLeft = 0;
            this.color = '#ef8200';
            this.textColor = '#fff';
            this.textSizeRange = [14, 24];
            this.dotSize = 4;
            this.bubbleSizeRange = [500, 2000];
            this.bubbleLabelFormatType = null;
            this.bubbleLabelFormatString = '';
            this.hideTooltip = false;
            this.hideTooltipValue = false;
            this.tooltipValueFormatType = null;
            this.tooltipValueFormatString = '';
            this.hovered = new core.EventEmitter();
            this.clicked = new core.EventEmitter();
            this.updateChart = (/**
             * @return {?}
             */
            function () {
                // bubbles
                _this.bubbleContainer
                    .selectAll('circle')
                    .data(_this.data)
                    .join((/**
                 * @param {?} enter
                 * @return {?}
                 */
                function (enter) {
                    return enter
                        .append('circle')
                        .attr('class', 'dot-circle')
                        .classed('solid', _this.dot)
                        .attr('cx', (/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return _this.projection([d.longitude, d.latitude])[0]; }))
                        .attr('cy', (/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return _this.projection([d.longitude, d.latitude])[1]; }))
                        .attr('r', (/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return (!_this.dot ? Math.sqrt(_this.bubbleRadius(d.value)) : _this.dotSize + "px"); }));
                }), (/**
                 * @param {?} update
                 * @return {?}
                 */
                function (update) {
                    return update
                        .transition()
                        .duration(1000)
                        .attr('cx', (/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return _this.projection([d.longitude, d.latitude])[0]; }))
                        .attr('cy', (/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return _this.projection([d.longitude, d.latitude])[1]; }))
                        .attr('r', (/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return (!_this.dot ? Math.sqrt(_this.bubbleRadius(d.value)) : _this.dotSize + "px"); }))
                        .transition()
                        .attr('pointer-events', 'auto');
                }), (/**
                 * @param {?} exit
                 * @return {?}
                 */
                function (exit) {
                    return exit
                        .transition()
                        .attr('pointer-events', 'none')
                        .remove();
                }));
                if (!_this.hideTooltip) {
                    _this.bubbleContainer
                        .selectAll('circle')
                        .on('mouseover', (/**
                     * @param {?} data
                     * @param {?} index
                     * @param {?} nodes
                     * @return {?}
                     */
                    function (data, index, nodes) { return _this.bubbleMouseOver(d3.event, data, index, nodes); }))
                        .on('mouseout', (/**
                     * @param {?} data
                     * @param {?} index
                     * @param {?} nodes
                     * @return {?}
                     */
                    function (data, index, nodes) { return _this.bubbleMouseOut(d3.event, data, index, nodes); }))
                        .on('click', (/**
                     * @param {?} data
                     * @param {?} index
                     * @param {?} nodes
                     * @return {?}
                     */
                    function (data, index, nodes) { return _this.bubbleMouseClick(d3.event, data, index, nodes); }));
                    // bubble text
                    if (_this.type !== 'high' && !_this.dot) {
                        _this.bubbleContainer
                            .selectAll('text')
                            .data(_this.data)
                            .join((/**
                         * @param {?} enter
                         * @return {?}
                         */
                        function (enter) {
                            return enter
                                .append('text')
                                .text((/**
                             * @param {?} d
                             * @return {?}
                             */
                            function (d) { return (_this.bubbleLabelFormat ? _this.bubbleLabelFormat(d.value) : d.value); }))
                                .attr('class', 'dot-text')
                                .style('fill', _this.textColor)
                                .style('font-size', (/**
                             * @param {?} d
                             * @return {?}
                             */
                            function (d) { return Math.round(_this.fontRange(d.value)) + "px"; }))
                                .attr('x', (/**
                             * @param {?} d
                             * @return {?}
                             */
                            function (d) { return _this.projection([d.longitude, d.latitude])[0]; }))
                                .attr('y', (/**
                             * @param {?} d
                             * @return {?}
                             */
                            function (d) { return _this.projection([d.longitude, d.latitude])[1]; }))
                                .attr('dy', '.4em');
                        }), (/**
                         * @param {?} update
                         * @return {?}
                         */
                        function (update) {
                            return update
                                .attr('pointer-events', 'none')
                                .transition()
                                .duration(1000)
                                .text((/**
                             * @param {?} d
                             * @return {?}
                             */
                            function (d) { return (_this.bubbleLabelFormat ? _this.bubbleLabelFormat(d.value) : d.value); }))
                                .style('font-size', (/**
                             * @param {?} d
                             * @return {?}
                             */
                            function (d) { return Math.round(_this.fontRange(d.value)) + "px"; }))
                                .attr('x', (/**
                             * @param {?} d
                             * @return {?}
                             */
                            function (d) { return _this.projection([d.longitude, d.latitude])[0]; }))
                                .attr('y', (/**
                             * @param {?} d
                             * @return {?}
                             */
                            function (d) { return _this.projection([d.longitude, d.latitude])[1]; }))
                                .attr('dy', '.4em')
                                .transition()
                                .attr('pointer-events', 'auto');
                        }), (/**
                         * @param {?} exit
                         * @return {?}
                         */
                        function (exit) {
                            return exit
                                .transition()
                                .attr('pointer-events', 'none')
                                .remove();
                        }));
                    }
                }
            });
            this.bubbleMouseOver = (/**
             * @param {?} event
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (event, data, index, nodes) {
                _this.chart
                    .selectAll('.dot-circle')
                    .filter((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return i !== index; }))
                    .classed('inactive', true);
                _this.chart
                    .selectAll('.dot-circle')
                    .filter((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return i === index; }))
                    .classed('active', true);
                _this.tooltipShow(data, nodes[index]);
                _this.hovered.emit({ event: event, data: data });
            });
            this.bubbleMouseOut = (/**
             * @param {?} event
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (event, data, index, nodes) {
                _this.chart
                    .selectAll('.dot-circle')
                    .classed('active', false)
                    .classed('inactive', false);
                _this.tooltipHide();
            });
            this.bubbleMouseClick = (/**
             * @param {?} event
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (event, data, index, nodes) {
                _this.clicked.emit({ event: event, data: data });
            });
            this.tooltipShow = (/**
             * @param {?} data
             * @param {?} node
             * @return {?}
             */
            function (data, node) {
                /** @type {?} */
                var dimensions = node.getBoundingClientRect();
                /** @type {?} */
                var scroll = _this._scroll.getScrollPosition();
                _this.tooltip.select('.tooltip-header').html((/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return "" + data.label; }));
                if (!_this.hideTooltipValue) {
                    _this.tooltip
                        .select('.tooltip-value')
                        .html((/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return (_this.tooltipValueFormat ? "" + _this.tooltipValueFormat(data.value) : "" + data.value); }));
                }
                /** @type {?} */
                var tooltipOffsetWidth = +_this.tooltip.node().offsetWidth / 2;
                /** @type {?} */
                var tooltipOffsetHeight = +_this.tooltip.node().offsetHeight + 8;
                _this.tooltip.style('top', +scroll[1] + +dimensions.top - tooltipOffsetHeight + "px"); //
                _this.tooltip.style('left', +scroll[0] + +dimensions.left - tooltipOffsetWidth + +dimensions.width / 2 + "px");
                _this.tooltip.style('opacity', 1);
            });
            this.tooltipHide = (/**
             * @return {?}
             */
            function () {
                _this.tooltip.style('opacity', 0);
            });
        }
        /**
         * @return {?}
         */
        DatavizBubbleMapComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.margin = {
                top: +this.marginTop,
                right: +this.marginRight,
                bottom: +this.marginBottom,
                left: +this.marginLeft
            };
            if (this.type !== 'debug') {
                // set type defaults
                switch (this.type) {
                    case 'medium':
                        break;
                    case 'high':
                        break;
                }
            }
            switch (this.projectionType) {
                case 'geoAlbers':
                    this.projection = d3.geoAlbers();
                    break;
                case 'geoAlbersUsa':
                    this.projection = d3.geoAlbersUsa();
                    break;
                case 'geoMercator':
                    this.projection = d3.geoMercator();
                    break;
                default:
                    break;
            }
            // dreate formatters
            this.bubbleLabelFormat = this._dataviz.d3Format(this.bubbleLabelFormatType, this.bubbleLabelFormatString);
            this.tooltipValueFormat = this._dataviz.d3Format(this.tooltipValueFormatType, this.tooltipValueFormatString);
            // console.log('TOPOJSON: ', this.topojson);
            this.topojsonFeature = topojson.feature(this.topojson, this.topojson.objects[this.feature]);
            this.projection.fitSize([+this.width, +this.height], this.topojsonFeature);
            // console.log('TOPOJSON FEATURE: ', this.topojsonFeature);
            // console.log('MESH: ', topojson.mesh(this.topojson, this.topojson.objects[this.feature], (a, b) => a !== b));
            // console.log('DATA: ', this.data);
            if (this.scale) {
                this.projection.scale(+this.scale);
            }
            if (this.center) {
                this.projection.center(this.center);
            }
            this.geoPath = d3.geoPath().projection(this.projection);
            // bubble radius range
            if (this.data && !this.dot) {
                this.bubbleRadius = d3.scaleLinear()
                    .range(this.bubbleSizeRange)
                    .domain([d3.min(this.data, (/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return +d.value; })), d3.max(this.data, (/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return +d.value; }))]);
                // font range
                this.fontRange = d3.scaleLinear()
                    .range(this.textSizeRange)
                    .domain([d3.min(this.data, (/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return +d.value; })), d3.max(this.data, (/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return +d.value; }))]);
            }
            // TOOLTIP
            if (!this.hideTooltip) {
                this.tooltip = d3.select('body')
                    .append('div')
                    .attr('class', 'pbds-tooltip south')
                    .style('opacity', 0)
                    .attr('aria-hidden', 'true'); // hide tooltip for accessibility
                // tooltip header
                this.tooltip.append('div').attr('class', 'tooltip-header');
                if (!this.hideTooltipValue)
                    this.tooltip.append('div').attr('class', 'tooltip-value');
            }
            // create the chart
            this.chart = d3.select(this._element.nativeElement).attr('aria-hidden', 'true');
            // create chart svg
            this.svg = this.chart
                .append('svg')
                .attr('width', +this.width + this.margin.left + this.margin.right)
                .attr('height', +this.height + this.margin.top + this.margin.bottom)
                .attr('class', 'img-fluid')
                .attr('preserveAspectRatio', 'xMinYMin meet')
                .attr('viewBox', "-" + this.margin.left + " -" + this.margin.top + " " + (+this.width + this.margin.left + this.margin.right) + " " + (+this.height +
                this.margin.top +
                this.margin.bottom))
                .append('g')
                .attr('class', 'container');
            // map
            this.svg
                .append('g')
                .attr('class', 'map')
                .selectAll('path')
                .data(this.topojsonFeature.features)
                .join((/**
             * @param {?} enter
             * @return {?}
             */
            function (enter) {
                return enter
                    .append('path')
                    .attr('class', 'feature')
                    .attr('d', _this.geoPath);
            }));
            // borders
            this.svg
                .append('path')
                .attr('class', 'mesh')
                .datum(topojson.mesh(this.topojson, this.topojson.objects[this.feature], (/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) { return a !== b; })))
                .attr('d', this.geoPath);
            this.bubbleContainer = this.svg
                .append('g')
                .attr('class', 'dots')
                .style('color', this.color);
            this.updateChart();
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        DatavizBubbleMapComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes.data && !changes.data.firstChange) {
                this.updateChart();
            }
        };
        /**
         * @return {?}
         */
        DatavizBubbleMapComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            if (this.tooltip)
                this.tooltip.remove();
        };
        DatavizBubbleMapComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pbds-dataviz-bubble-map',
                        template: "",
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        DatavizBubbleMapComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: common.ViewportScroller },
            { type: PbdsDatavizService }
        ]; };
        DatavizBubbleMapComponent.propDecorators = {
            chartClass: [{ type: core.HostBinding, args: ['class.pbds-chart',] }],
            bubbleMapClass: [{ type: core.HostBinding, args: ['class.pbds-chart-bubble-map',] }],
            data: [{ type: core.Input }],
            topojson: [{ type: core.Input }],
            feature: [{ type: core.Input }],
            projectionType: [{ type: core.Input }],
            scale: [{ type: core.Input }],
            center: [{ type: core.Input }],
            width: [{ type: core.Input }],
            height: [{ type: core.Input }],
            type: [{ type: core.Input }],
            dot: [{ type: core.Input }],
            marginTop: [{ type: core.Input }],
            marginRight: [{ type: core.Input }],
            marginBottom: [{ type: core.Input }],
            marginLeft: [{ type: core.Input }],
            color: [{ type: core.Input }],
            textColor: [{ type: core.Input }],
            textSizeRange: [{ type: core.Input }],
            dotSize: [{ type: core.Input }],
            bubbleSizeRange: [{ type: core.Input }],
            bubbleLabelFormatType: [{ type: core.Input }],
            bubbleLabelFormatString: [{ type: core.Input }],
            hideTooltip: [{ type: core.Input }],
            hideTooltipValue: [{ type: core.Input }],
            tooltipValueFormatType: [{ type: core.Input }],
            tooltipValueFormatString: [{ type: core.Input }],
            hovered: [{ type: core.Output }],
            clicked: [{ type: core.Output }]
        };
        return DatavizBubbleMapComponent;
    }());
    if (false) {
        /** @type {?} */
        DatavizBubbleMapComponent.prototype.chartClass;
        /** @type {?} */
        DatavizBubbleMapComponent.prototype.bubbleMapClass;
        /** @type {?} */
        DatavizBubbleMapComponent.prototype.data;
        /** @type {?} */
        DatavizBubbleMapComponent.prototype.topojson;
        /** @type {?} */
        DatavizBubbleMapComponent.prototype.feature;
        /** @type {?} */
        DatavizBubbleMapComponent.prototype.projectionType;
        /** @type {?} */
        DatavizBubbleMapComponent.prototype.scale;
        /** @type {?} */
        DatavizBubbleMapComponent.prototype.center;
        /** @type {?} */
        DatavizBubbleMapComponent.prototype.width;
        /** @type {?} */
        DatavizBubbleMapComponent.prototype.height;
        /** @type {?} */
        DatavizBubbleMapComponent.prototype.type;
        /** @type {?} */
        DatavizBubbleMapComponent.prototype.dot;
        /** @type {?} */
        DatavizBubbleMapComponent.prototype.marginTop;
        /** @type {?} */
        DatavizBubbleMapComponent.prototype.marginRight;
        /** @type {?} */
        DatavizBubbleMapComponent.prototype.marginBottom;
        /** @type {?} */
        DatavizBubbleMapComponent.prototype.marginLeft;
        /** @type {?} */
        DatavizBubbleMapComponent.prototype.color;
        /** @type {?} */
        DatavizBubbleMapComponent.prototype.textColor;
        /** @type {?} */
        DatavizBubbleMapComponent.prototype.textSizeRange;
        /** @type {?} */
        DatavizBubbleMapComponent.prototype.dotSize;
        /** @type {?} */
        DatavizBubbleMapComponent.prototype.bubbleSizeRange;
        /** @type {?} */
        DatavizBubbleMapComponent.prototype.bubbleLabelFormatType;
        /** @type {?} */
        DatavizBubbleMapComponent.prototype.bubbleLabelFormatString;
        /** @type {?} */
        DatavizBubbleMapComponent.prototype.hideTooltip;
        /** @type {?} */
        DatavizBubbleMapComponent.prototype.hideTooltipValue;
        /** @type {?} */
        DatavizBubbleMapComponent.prototype.tooltipValueFormatType;
        /** @type {?} */
        DatavizBubbleMapComponent.prototype.tooltipValueFormatString;
        /** @type {?} */
        DatavizBubbleMapComponent.prototype.hovered;
        /** @type {?} */
        DatavizBubbleMapComponent.prototype.clicked;
        /**
         * @type {?}
         * @private
         */
        DatavizBubbleMapComponent.prototype.projection;
        /**
         * @type {?}
         * @private
         */
        DatavizBubbleMapComponent.prototype.geoPath;
        /**
         * @type {?}
         * @private
         */
        DatavizBubbleMapComponent.prototype.topojsonFeature;
        /**
         * @type {?}
         * @private
         */
        DatavizBubbleMapComponent.prototype.chart;
        /**
         * @type {?}
         * @private
         */
        DatavizBubbleMapComponent.prototype.svg;
        /**
         * @type {?}
         * @private
         */
        DatavizBubbleMapComponent.prototype.margin;
        /**
         * @type {?}
         * @private
         */
        DatavizBubbleMapComponent.prototype.bubbleContainer;
        /**
         * @type {?}
         * @private
         */
        DatavizBubbleMapComponent.prototype.bubbleRadius;
        /**
         * @type {?}
         * @private
         */
        DatavizBubbleMapComponent.prototype.fontRange;
        /**
         * @type {?}
         * @private
         */
        DatavizBubbleMapComponent.prototype.bubbleLabelFormat;
        /**
         * @type {?}
         * @private
         */
        DatavizBubbleMapComponent.prototype.tooltip;
        /**
         * @type {?}
         * @private
         */
        DatavizBubbleMapComponent.prototype.tooltipValueFormat;
        /** @type {?} */
        DatavizBubbleMapComponent.prototype.updateChart;
        /** @type {?} */
        DatavizBubbleMapComponent.prototype.bubbleMouseOver;
        /** @type {?} */
        DatavizBubbleMapComponent.prototype.bubbleMouseOut;
        /** @type {?} */
        DatavizBubbleMapComponent.prototype.bubbleMouseClick;
        /**
         * @type {?}
         * @private
         */
        DatavizBubbleMapComponent.prototype.tooltipShow;
        /**
         * @type {?}
         * @private
         */
        DatavizBubbleMapComponent.prototype.tooltipHide;
        /**
         * @type {?}
         * @private
         */
        DatavizBubbleMapComponent.prototype._element;
        /**
         * @type {?}
         * @private
         */
        DatavizBubbleMapComponent.prototype._scroll;
        /**
         * @type {?}
         * @private
         */
        DatavizBubbleMapComponent.prototype._dataviz;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PbdsDatavizHeatmapComponent = /** @class */ (function () {
        function PbdsDatavizHeatmapComponent(_dataviz, _element, _scroll) {
            var _this = this;
            this._dataviz = _dataviz;
            this._element = _element;
            this._scroll = _scroll;
            this.chartClass = true;
            this.heatmapClass = true;
            this.width = 306;
            this.height = 400;
            this.marginTop = 0; // hardcoded on purpose, do not document until feedback
            // hardcoded on purpose, do not document until feedback
            this.marginRight = 0; // hardcoded on purpose, do not document until feedback
            // hardcoded on purpose, do not document until feedback
            this.marginBottom = 30; // hardcoded on purpose, do not document until feedback
            // hardcoded on purpose, do not document until feedback
            this.marginLeft = 55;
            this.scale = 'quantile';
            this.xAxisFormatType = null;
            this.xAxisFormatString = '';
            this.yAxisFormatType = null;
            this.yAxisFormatString = '';
            this.hideLegend = false;
            this.legendWidth = 105 + 28; // hardcoded legend width + left margin, do not document until feedback
            // hardcoded legend width + left margin, do not document until feedback
            this.legendPosition = 'right';
            this.legendLabelFormatType = null;
            this.legendLabelFormatString = '';
            this.tooltipXLabelFormatType = null;
            this.tooltipXLabelFormatString = '';
            this.tooltipYLabelFormatType = null;
            this.tooltipYLabelFormatString = '';
            this.tooltipValueFormatType = null;
            this.tooltipValueFormatString = '';
            this.theme = 'classic';
            this.hovered = new core.EventEmitter();
            this.clicked = new core.EventEmitter();
            this.updateChart = (/**
             * @return {?}
             */
            function () {
                _this.svg
                    .selectAll('rect')
                    .data(_this.data)
                    .join((/**
                 * @param {?} enter
                 * @return {?}
                 */
                function (enter) {
                    return enter
                        .append('rect')
                        .attr('class', 'block')
                        .classed('empty', (/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return d.value === undefined || d.value === null; }))
                        .attr('x', (/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return _this.xAxisScale(d.xLabel); }))
                        .attr('y', (/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return _this.yAxisScale(d.yLabel); }))
                        .attr('width', _this.xAxisScale.bandwidth())
                        .attr('height', _this.yAxisScale.bandwidth())
                        .style('fill', (/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return _this.colorRange(d.value); }));
                }), (/**
                 * @param {?} update
                 * @return {?}
                 */
                function (update) {
                    return update.call((/**
                     * @param {?} update
                     * @return {?}
                     */
                    function (update) {
                        update
                            .classed('empty', (/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return d.value === undefined || d.value === null; }))
                            .attr('pointer-events', 'none')
                            .transition()
                            .duration(1000)
                            .attr('x', (/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return _this.xAxisScale(d.xLabel); }))
                            .attr('y', (/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return _this.yAxisScale(d.yLabel); }))
                            .attr('width', _this.xAxisScale.bandwidth())
                            .attr('height', _this.yAxisScale.bandwidth())
                            .style('fill', (/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return _this.colorRange(d.value); }))
                            .transition()
                            .attr('pointer-events', 'auto');
                        return update;
                    }));
                }), (/**
                 * @param {?} exit
                 * @return {?}
                 */
                function (exit) {
                    return exit
                        .transition()
                        .attr('pointer-events', 'none')
                        .remove();
                }))
                    .on('mouseover', (/**
                 * @param {?} data
                 * @param {?} index
                 * @param {?} nodes
                 * @return {?}
                 */
                function (data, index, nodes) { return _this.blockMouseOver(d3.event, data, index, nodes); }))
                    .on('mouseout', (/**
                 * @param {?} data
                 * @param {?} index
                 * @param {?} nodes
                 * @return {?}
                 */
                function (data, index, nodes) { return _this.blockMouseOut(); }))
                    .on('click', (/**
                 * @param {?} data
                 * @param {?} index
                 * @param {?} nodes
                 * @return {?}
                 */
                function (data, index, nodes) { return _this.blockMouseClick(d3.event, data, index, nodes); }));
                if (!_this.hideLegend) {
                    _this.chart
                        .select('.legend')
                        .selectAll('.legend-item')
                        .data(_this.colorDomain)
                        .join((/**
                     * @param {?} enter
                     * @return {?}
                     */
                    function (enter) {
                        /** @type {?} */
                        var li = enter.append('li').attr('class', 'legend-item');
                        li.append('span')
                            .attr('class', 'legend-key')
                            .style('background-color', (/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) { return _this.colorRange(d); }));
                        li.append('span')
                            .attr('class', 'legend-label')
                            .html((/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) {
                            /** @type {?} */
                            var label = d;
                            switch (_this.legendLabelFormatType) {
                                case 'number':
                                    label = _this.legendLabelFormat(d);
                                    break;
                            }
                            return "&ge; " + label;
                        }));
                        return li;
                    }), (/**
                     * @param {?} update
                     * @return {?}
                     */
                    function (update) {
                        return update.select('.legend-label').html((/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) {
                            /** @type {?} */
                            var label = d;
                            switch (_this.legendLabelFormatType) {
                                case 'number':
                                    label = _this.legendLabelFormat(d);
                                    break;
                            }
                            return "&ge; " + label;
                        }));
                    }), (/**
                     * @param {?} exit
                     * @return {?}
                     */
                    function (exit) { return exit.remove(); }))
                        .on('mouseover', (/**
                     * @param {?} data
                     * @param {?} index
                     * @param {?} nodes
                     * @return {?}
                     */
                    function (data, index, nodes) { return _this.legendMouseOver(d3.event, data, index, nodes); }))
                        .on('mouseout', (/**
                     * @return {?}
                     */
                    function () { return _this.legendMouseOut(); }))
                        .on('click', (/**
                     * @param {?} data
                     * @param {?} index
                     * @param {?} nodes
                     * @return {?}
                     */
                    function (data, index, nodes) { return _this.legendMouseClick(d3.event, data, index, nodes); }));
                }
            });
            this.blockMouseOver = (/**
             * @param {?} event
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (event, data, index, nodes) {
                // console.log(data.value, event, data, index, nodes);
                if (data.value !== null) {
                    _this.tooltipShow(data, index, nodes[index]);
                }
                _this.hovered.emit({ event: event, data: data });
            });
            this.blockMouseOut = (/**
             * @return {?}
             */
            function () {
                _this.tooltipHide();
            });
            this.blockMouseClick = (/**
             * @param {?} event
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (event, data, index, nodes) {
                _this.clicked.emit({ event: event, data: data });
            });
            this.legendMouseOver = (/**
             * @param {?} event
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (event, data, index, nodes) {
                _this.chart
                    .selectAll('.legend-item')
                    .filter((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return i !== index; }))
                    .classed('inactive', true);
                _this.chart
                    .selectAll('.block')
                    .filter((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) {
                    if (index + 1 === nodes.length) {
                        return d.value < data;
                    }
                    else {
                        return d.value < data || d.value >= +d3.select(nodes[index + 1]).data()[0];
                    }
                }))
                    .classed('inactive', true);
                _this.hovered.emit({ event: event, data: data });
            });
            this.legendMouseOut = (/**
             * @return {?}
             */
            function () {
                _this.chart.selectAll('.legend-item').classed('inactive', false);
                _this.chart.selectAll('.block').classed('inactive', false);
            });
            this.legendMouseClick = (/**
             * @param {?} event
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (event, data, index, nodes) {
                _this.clicked.emit({ event: event, data: data });
            });
            this.tooltipShow = (/**
             * @param {?} data
             * @param {?} index
             * @param {?} node
             * @return {?}
             */
            function (data, index, node) {
                // console.log('TOOLTIP: ', data, index, node);
                // console.log('TOOLTIP: ', data, index, node);
                /** @type {?} */
                var dimensions = node.getBoundingClientRect();
                /** @type {?} */
                var scroll = _this._scroll.getScrollPosition();
                /** @type {?} */
                var yLabel;
                /** @type {?} */
                var xLabel;
                switch (_this.tooltipYLabelFormatType) {
                    case 'number':
                        yLabel = _this.tooltipYLabelFormat(data.yLabel);
                        break;
                    case 'time':
                        /** @type {?} */
                        var parsedTime = d3.isoParse(data.yLabel);
                        yLabel = _this.tooltipYLabelFormat(parsedTime);
                        break;
                    default:
                        yLabel = "" + data.yLabel + _this.tooltipYLabelFormatString;
                }
                switch (_this.tooltipXLabelFormatType) {
                    case 'number':
                        xLabel = _this.tooltipXLabelFormat(data.xLabel);
                        break;
                    case 'time':
                        /** @type {?} */
                        var parsedTime = d3.isoParse(data.xLabel);
                        xLabel = _this.tooltipXLabelFormat(parsedTime);
                        break;
                    default:
                        xLabel = "" + data.xLabel + _this.tooltipXLabelFormatString;
                }
                /** @type {?} */
                var value = _this.tooltipValueFormat === null
                    ? "<div class=\"tooltip-value\">" + data.value + "</div>"
                    : "<div class=\"tooltip-value\">" + _this.tooltipValueFormat(data.value) + "</div>";
                _this.tooltip.html("\n        " + yLabel + " : " + xLabel + "<br>\n        " + value + "\n      ");
                /** @type {?} */
                var tooltipOffsetWidth = +_this.tooltip.node().offsetWidth / 2;
                /** @type {?} */
                var tooltipOffsetHeight = +_this.tooltip.node().offsetHeight + 8;
                _this.tooltip.style('top', +scroll[1] + +dimensions.top - tooltipOffsetHeight + "px"); //
                _this.tooltip.style('left', +scroll[0] + +dimensions.left - tooltipOffsetWidth + +dimensions.width / 2 + "px");
                _this.tooltip.style('opacity', 1);
                _this.tooltip.style('opacity', 1);
            });
            this.tooltipHide = (/**
             * @return {?}
             */
            function () {
                _this.tooltip.style('opacity', 0);
            });
            this.xAxisFormatter = (/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                switch (_this.xAxisFormatType) {
                    case 'number':
                        return _this.xAxisFormat(item);
                    case 'time':
                        /** @type {?} */
                        var parseDate = d3.isoParse(item);
                        return _this.xAxisFormat(parseDate);
                    default:
                        return item;
                }
            });
            this.yAxisFormatter = (/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                switch (_this.yAxisFormatType) {
                    case 'number':
                        return _this.yAxisFormat(item);
                    case 'time':
                        /** @type {?} */
                        var parseDate = d3.isoParse(item);
                        return _this.yAxisFormat(parseDate);
                    default:
                        return item;
                }
            });
        }
        /**
         * @return {?}
         */
        PbdsDatavizHeatmapComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.margin = {
                top: +this.marginTop,
                right: +this.marginRight,
                bottom: +this.marginBottom,
                left: +this.marginLeft
            };
            // create formatters
            this.yAxisFormat = this._dataviz.d3Format(this.yAxisFormatType, this.yAxisFormatString);
            this.xAxisFormat = this._dataviz.d3Format(this.xAxisFormatType, this.xAxisFormatString);
            this.legendLabelFormat = this._dataviz.d3Format(this.legendLabelFormatType, this.legendLabelFormatString);
            this.tooltipYLabelFormat = this._dataviz.d3Format(this.tooltipYLabelFormatType, this.tooltipYLabelFormatString);
            this.tooltipXLabelFormat = this._dataviz.d3Format(this.tooltipXLabelFormatType, this.tooltipXLabelFormatString);
            this.tooltipValueFormat = this._dataviz.d3Format(this.tooltipValueFormatType, this.tooltipValueFormatString);
            // defaults for all chart types
            this.hideXAxis = false;
            this.hideXAxisZero = false;
            this.hideXAxisDomain = true;
            this.hideYAxisDomain = true;
            this.hideTooltip = false;
            this.hideXAxisTicks = true;
            this.hideYAxisTicks = true;
            this.xAxisTickSize = 8;
            this.xAxisTickSizeOuter = 0;
            this.yAxisTickSize = 8;
            this.yAxisTickSizeOuter = 0;
            // create the chart
            this.chart = d3.select(this._element.nativeElement).attr('aria-hidden', 'true');
            // create chart svg
            this.svg = this.chart
                .append('svg')
                .attr('width', +this.width)
                .attr('height', +this.height + this.margin.top + this.margin.bottom)
                .attr('class', 'img-fluid')
                .attr('preserveAspectRatio', 'xMinYMin meet')
                .attr('viewBox', "-" + this.margin.left + " -" + this.margin.top + " " + +this.width + " " + (+this.height + this.margin.top + this.margin.bottom));
            // color range
            /** @type {?} */
            var colors = this._dataviz
                .getColors(true, this.theme)
                .slice()
                .reverse();
            /** @type {?} */
            var colorDomain = [
                +d3.min(this.data, (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return d.value; })),
                +d3.max(this.data, (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return d.value; }))
            ];
            /** @type {?} */
            var colorValues = this.data.map((/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return d.value; }));
            switch (this.scale) {
                case 'threshold':
                    this.colorRange = d3.scaleThreshold()
                        .domain(this.domain)
                        .range(colors);
                    this.colorDomain = this.colorRange.domain();
                    break;
                case 'quantile':
                    this.colorRange = d3.scaleQuantile()
                        .domain(colorValues)
                        .range(colors);
                    this.colorDomain = this.colorRange.quantiles();
                    break;
                case 'quantize':
                    this.colorRange = d3.scaleQuantize()
                        .domain(colorDomain)
                        .range(colors);
                    this.colorDomain = this.colorRange.thresholds();
                    break;
            }
            // console.log(colors, colorDomain, colorValues, this.scale, this.colorRange, this.colorDomain);
            // define axis labels
            /** @type {?} */
            var xAxisLabels = __spread(new Set(this.data.map((/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return d.xLabel; }))));
            /** @type {?} */
            var yAxisLabels = __spread(new Set(this.data.map((/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return d.yLabel; })))).reverse();
            // X axis
            this.xAxisScale = d3.scaleBand()
                .domain(xAxisLabels)
                .rangeRound([0, this.width - this.margin.left])
                .paddingInner(0.1);
            this.xAxisCall = d3.axisBottom(this.xAxisScale)
                .tickSize(this.xAxisTickSize)
                .tickSizeOuter(this.xAxisTickSizeOuter)
                .tickFormat(this.xAxisFormatter);
            this.xAxis = this.svg
                .append('g')
                .attr('class', 'axis axis-x')
                .attr('transform', "translate(0, " + this.height + ")")
                .classed('axis-hidden', this.hideXAxis)
                .classed('axis-zero-hidden', this.hideXAxisZero)
                .classed('axis-domain-hidden', this.hideXAxisDomain)
                .classed('axis-ticks-hidden', this.hideXAxisTicks)
                .call(this.xAxisCall);
            // Y axis
            this.yAxisScale = d3.scaleBand()
                .domain(yAxisLabels)
                .rangeRound([this.height, 0])
                .paddingInner(0.1);
            this.yAxisCall = d3.axisLeft(this.yAxisScale)
                .tickSize(this.yAxisTickSize)
                .tickSizeOuter(this.yAxisTickSizeOuter)
                .tickFormat(this.yAxisFormatter);
            this.yAxis = this.svg
                .append('g')
                .attr('class', 'axis axis-y')
                .classed('axis-hidden', this.hideYAxis)
                .classed('axis-zero-hidden', this.hideYAxisZero)
                .classed('axis-domain-hidden', this.hideYAxisDomain)
                .classed('axis-ticks-hidden', this.hideYAxisTicks)
                .call(this.yAxisCall);
            // TOOLTIP
            if (!this.hideTooltip) {
                this.tooltip = d3.select('body')
                    .append('div')
                    .attr('class', 'pbds-tooltip south')
                    .style('opacity', 0)
                    .attr('aria-hidden', 'true'); // hide tooltip for accessibility
            }
            // add legend classes
            if (!this.hideLegend) {
                this.chart.classed('pbds-chart-legend-bottom', this.legendPosition === 'bottom' ? true : false);
                this.chart.append('ul').attr('class', "legend legend-" + this.legendPosition);
            }
            this.updateChart();
        };
        /**
         * @return {?}
         */
        PbdsDatavizHeatmapComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            if (this.tooltip)
                this.tooltip.remove();
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        PbdsDatavizHeatmapComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes.data && !changes.data.firstChange) {
                this.updateChart();
            }
        };
        PbdsDatavizHeatmapComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pbds-dataviz-heatmap',
                        template: "",
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        PbdsDatavizHeatmapComponent.ctorParameters = function () { return [
            { type: PbdsDatavizService },
            { type: core.ElementRef },
            { type: common.ViewportScroller }
        ]; };
        PbdsDatavizHeatmapComponent.propDecorators = {
            chartClass: [{ type: core.HostBinding, args: ['class.pbds-chart',] }],
            heatmapClass: [{ type: core.HostBinding, args: ['class.pbds-chart-heatmap',] }],
            data: [{ type: core.Input }],
            width: [{ type: core.Input }],
            height: [{ type: core.Input }],
            marginTop: [{ type: core.Input }],
            marginRight: [{ type: core.Input }],
            marginBottom: [{ type: core.Input }],
            marginLeft: [{ type: core.Input }],
            scale: [{ type: core.Input }],
            domain: [{ type: core.Input }],
            xAxisFormatType: [{ type: core.Input }],
            xAxisFormatString: [{ type: core.Input }],
            yAxisFormatType: [{ type: core.Input }],
            yAxisFormatString: [{ type: core.Input }],
            hideLegend: [{ type: core.Input }],
            legendWidth: [{ type: core.Input }],
            legendPosition: [{ type: core.Input }],
            legendLabelFormatType: [{ type: core.Input }],
            legendLabelFormatString: [{ type: core.Input }],
            tooltipXLabelFormatType: [{ type: core.Input }],
            tooltipXLabelFormatString: [{ type: core.Input }],
            tooltipYLabelFormatType: [{ type: core.Input }],
            tooltipYLabelFormatString: [{ type: core.Input }],
            tooltipValueFormatType: [{ type: core.Input }],
            tooltipValueFormatString: [{ type: core.Input }],
            theme: [{ type: core.Input }],
            hovered: [{ type: core.Output }],
            clicked: [{ type: core.Output }]
        };
        return PbdsDatavizHeatmapComponent;
    }());
    if (false) {
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.chartClass;
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.heatmapClass;
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.data;
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.width;
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.height;
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.marginTop;
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.marginRight;
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.marginBottom;
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.marginLeft;
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.scale;
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.domain;
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.xAxisFormatType;
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.xAxisFormatString;
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.yAxisFormatType;
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.yAxisFormatString;
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.hideLegend;
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.legendWidth;
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.legendPosition;
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.legendLabelFormatType;
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.legendLabelFormatString;
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.tooltipXLabelFormatType;
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.tooltipXLabelFormatString;
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.tooltipYLabelFormatType;
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.tooltipYLabelFormatString;
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.tooltipValueFormatType;
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.tooltipValueFormatString;
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.theme;
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.hovered;
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.clicked;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype.chart;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype.svg;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype.margin;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype.colorRange;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype.colorDomain;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype.xAxisScale;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype.xAxisCall;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype.xAxis;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype.xAxisFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype.xAxisTickSize;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype.xAxisTickSizeOuter;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype.hideXAxisDomain;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype.hideXAxisZero;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype.hideXAxisTicks;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype.hideXAxis;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype.yAxis;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype.yAxisFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype.yAxisTickSize;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype.yAxisTickSizeOuter;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype.yAxisScale;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype.yAxisCall;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype.hideYAxis;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype.hideYAxisDomain;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype.hideYAxisZero;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype.hideYAxisTicks;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype.legendLabelFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype.tooltip;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype.tooltipYLabelFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype.tooltipXLabelFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype.hideTooltip;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype.tooltipValueFormat;
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.updateChart;
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.blockMouseOver;
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.blockMouseOut;
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.blockMouseClick;
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.legendMouseOver;
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.legendMouseOut;
        /** @type {?} */
        PbdsDatavizHeatmapComponent.prototype.legendMouseClick;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype.tooltipShow;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype.tooltipHide;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype.xAxisFormatter;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype.yAxisFormatter;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype._dataviz;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype._element;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizHeatmapComponent.prototype._scroll;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PbdsDatavizChoroplethMapComponent = /** @class */ (function () {
        function PbdsDatavizChoroplethMapComponent(_dataviz, _element, _scroll) {
            var _this = this;
            this._dataviz = _dataviz;
            this._element = _element;
            this._scroll = _scroll;
            this.chartClass = true;
            this.choroplethMapClass = true;
            this.feature = '';
            this.dataField = 'id';
            this.mesh = null;
            this.scale = null;
            this.center = null;
            this.width = 960;
            this.height = 500;
            this.marginTop = 0;
            this.marginRight = 0;
            this.marginBottom = 0;
            this.marginLeft = 0;
            this.theme = 'classic';
            this.colorScale = 'quantile';
            this.hideTooltip = false;
            this.tooltipValueFormatType = null;
            this.tooltipValueFormatString = '';
            this.hideLegend = false;
            this.legendWidth = 260;
            this.legendLabel = null;
            this.legendValueFormatType = null;
            this.legendValueFormatString = '';
            this.legendLeft = 20;
            this.legendTop = 20;
            this.hovered = new core.EventEmitter();
            this.clicked = new core.EventEmitter();
            this.updateChart = (/**
             * @return {?}
             */
            function () {
                _this.svg
                    .select('.map')
                    .selectAll('path')
                    .style('fill', (/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) {
                    /** @type {?} */
                    var match = _this.data.find((/**
                     * @param {?} obj
                     * @return {?}
                     */
                    function (obj) { return obj[_this.dataField] === d[_this.dataField]; }));
                    if (match) {
                        return _this.colorRange(match.value);
                    }
                }))
                    .classed('hasData', (/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) {
                    return _this.data.some((/**
                     * @param {?} obj
                     * @return {?}
                     */
                    function (obj) { return obj[_this.dataField] === d[_this.dataField]; }));
                }));
                if (!_this.hideTooltip) {
                    _this.svg
                        .select('.map')
                        .selectAll('path')
                        .on('mouseover', (/**
                     * @param {?} data
                     * @param {?} index
                     * @param {?} nodes
                     * @return {?}
                     */
                    function (data, index, nodes) {
                        return _this.featureMouseOver(d3.event, _this.data.find((/**
                         * @param {?} obj
                         * @return {?}
                         */
                        function (obj) { return obj[_this.dataField] === data[_this.dataField]; })), index, nodes);
                    }))
                        .on('mouseout', (/**
                     * @param {?} data
                     * @param {?} index
                     * @param {?} nodes
                     * @return {?}
                     */
                    function (data, index, nodes) { return _this.featureMouseOut(d3.event, _this.data, index, nodes); }))
                        .on('mousemove', (/**
                     * @param {?} data
                     * @param {?} index
                     * @param {?} nodes
                     * @return {?}
                     */
                    function (data, index, nodes) { return _this.tooltipMove(_this.chart.node()); }))
                        .on('click', (/**
                     * @param {?} data
                     * @param {?} index
                     * @param {?} nodes
                     * @return {?}
                     */
                    function (data, index, nodes) {
                        return _this.featureMouseClick(d3.event, _this.data.find((/**
                         * @param {?} obj
                         * @return {?}
                         */
                        function (obj) { return obj[_this.dataField] === data[_this.dataField]; })), index, nodes);
                    }));
                }
            });
            this.featureMouseOver = (/**
             * @param {?} event
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (event, data, index, nodes) {
                if (data) {
                    _this.tooltipShow(data, nodes[index]);
                    _this.hovered.emit({ event: event, data: data });
                }
            });
            this.featureMouseOut = (/**
             * @param {?} event
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (event, data, index, nodes) {
                _this.tooltipHide();
            });
            this.featureMouseClick = (/**
             * @param {?} event
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (event, data, index, nodes) {
                if (data) {
                    _this.clicked.emit({ event: event, data: data });
                }
            });
            this.tooltipShow = (/**
             * @param {?} data
             * @param {?} node
             * @return {?}
             */
            function (data, node) {
                // console.log('TOOLTIP: ', data, node);
                _this.tooltipSetPosition(node);
                if (data.label) {
                    _this.tooltip.select('.tooltip-header').html((/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return "" + data.label; }));
                }
                _this.tooltip
                    .select('.tooltip-value')
                    .html((/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return (_this.tooltipValueFormat ? "" + _this.tooltipValueFormat(data.value) : "" + data.value); }));
                _this.tooltip.style('opacity', 1);
            });
            this.tooltipHide = (/**
             * @return {?}
             */
            function () {
                _this.tooltip.style('opacity', 0);
            });
            this.tooltipMove = (/**
             * @param {?} node
             * @return {?}
             */
            function (node) {
                _this.tooltipSetPosition(node);
            });
            this.tooltipSetPosition = (/**
             * @param {?} node
             * @return {?}
             */
            function (node) {
                /** @type {?} */
                var mouse$1 = d3.mouse(node);
                /** @type {?} */
                var mouseLeft = +mouse$1[0];
                /** @type {?} */
                var mouseTop = +mouse$1[1];
                /** @type {?} */
                var geometry = node.getBoundingClientRect();
                /** @type {?} */
                var geometryLeft = +geometry.left;
                /** @type {?} */
                var geometryTop = +geometry.top;
                /** @type {?} */
                var scroll = _this._scroll.getScrollPosition();
                // const scrollLeft = +scroll[0];
                /** @type {?} */
                var scrollTop = +scroll[1];
                /** @type {?} */
                var tooltipOffsetWidth = +_this.tooltip.node().offsetWidth / 2;
                /** @type {?} */
                var tooltipOffsetHeight = +_this.tooltip.node().offsetHeight;
                _this.tooltip.style('top', scrollTop + mouseTop + geometryTop - tooltipOffsetHeight - 14 + "px");
                _this.tooltip.style('left', mouseLeft + geometryLeft - tooltipOffsetWidth + "px");
            });
            this.legend = (/**
             * @param {?} g
             * @return {?}
             */
            function (g) {
                /** @type {?} */
                var length = _this.colorRange.range().length;
                // console.log(this.colorRange.range().length, this.colorDomain);
                /** @type {?} */
                var x = d3.scaleLinear()
                    .domain([1, length - 1])
                    .rangeRound([+_this.legendWidth / length, (_this.legendWidth * (length - 1)) / length]);
                g.attr('class', 'legend')
                    .selectAll('rect')
                    .data(_this.colorRange.range())
                    .join('rect')
                    .attr('height', 8)
                    .attr('x', (/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return x(i); }))
                    .attr('width', (/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return x(i + 1) - x(i); }))
                    .attr('fill', (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return d; }));
                if (_this.legendLabel) {
                    g.append('text')
                        .attr('y', -6)
                        .attr('text-anchor', 'start')
                        .attr('class', 'legend-label')
                        .text(_this.legendLabel);
                }
                g.call(d3.axisBottom(x)
                    .tickSize(13)
                    .tickValues(d3.range(1, length))
                    .tickFormat((/**
                 * @param {?} i
                 * @return {?}
                 */
                function (i) {
                    return _this.legendValueFormat ? "" + _this.legendValueFormat(_this.colorDomain[i - 1]) : "" + _this.colorDomain[i - 1];
                })))
                    .select('.domain')
                    .remove();
            });
        }
        /**
         * @return {?}
         */
        PbdsDatavizChoroplethMapComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.margin = {
                top: +this.marginTop,
                right: +this.marginRight,
                bottom: +this.marginBottom,
                left: +this.marginLeft
            };
            // color range
            /** @type {?} */
            var colors = this._dataviz
                .getColors(true, this.theme)
                .slice()
                .reverse();
            /** @type {?} */
            var colorDomain = [+d3.min(this.data, (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return d.value; })), +d3.max(this.data, (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return d.value; }))];
            /** @type {?} */
            var colorValues = this.data.map((/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return d.value; }));
            switch (this.colorScale) {
                case 'threshold':
                    this.colorRange = d3.scaleThreshold()
                        .domain(this.domain)
                        .range(colors);
                    this.colorDomain = this.colorRange.domain();
                    break;
                case 'quantile':
                    this.colorRange = d3.scaleQuantile()
                        .domain(colorValues)
                        .range(colors);
                    this.colorDomain = this.colorRange.quantiles();
                    break;
                case 'quantize':
                    this.colorRange = d3.scaleQuantize()
                        .domain(colorDomain)
                        .range(colors);
                    this.colorDomain = this.colorRange.thresholds();
                    break;
            }
            // create formatters
            this.tooltipValueFormat = this._dataviz.d3Format(this.tooltipValueFormatType, this.tooltipValueFormatString);
            this.legendValueFormat = this._dataviz.d3Format(this.legendValueFormatType, this.legendValueFormatString);
            switch (this.projectionType) {
                case 'geoAlbers':
                    this.projection = d3.geoAlbers();
                    break;
                case 'geoAlbersUsa':
                    this.projection = d3.geoAlbersUsa();
                    break;
                case 'geoMercator':
                    this.projection = d3.geoMercator();
                    break;
            }
            this.topojsonFeature = topojson.feature(this.topojson, this.topojson.objects[this.feature]);
            this.projection.fitSize([+this.width, +this.height], this.topojsonFeature);
            if (this.scale) {
                this.projection.scale(+this.scale);
            }
            if (this.center) {
                this.projection.center(this.center);
            }
            this.geoPath = d3.geoPath().projection(this.projection);
            // console.log('TOPOJSON: ', this.topojson);
            // console.log('TOPOJSON FEATURE: ', this.topojsonFeature);
            // console.log('MESH: ', topojson.mesh(this.topojson, this.topojson.objects[this.feature], (a, b) => a !== b));
            // console.log('DATA: ', this.data);
            // create the chart
            this.chart = d3.select(this._element.nativeElement).attr('aria-hidden', 'true');
            // TOOLTIP
            if (!this.hideTooltip) {
                this.tooltip = d3.select('body')
                    .append('div')
                    .attr('class', 'pbds-tooltip south')
                    .style('opacity', 0)
                    .attr('aria-hidden', 'true'); // hide tooltip for accessibility
                // tooltip header
                this.tooltip.append('div').attr('class', 'tooltip-header');
                this.tooltip.append('div').attr('class', 'tooltip-value');
            }
            // create chart svg
            this.svg = this.chart
                .append('svg')
                .attr('width', +this.width)
                .attr('height', +this.height + this.margin.top + this.margin.bottom)
                .attr('class', 'img-fluid')
                .attr('preserveAspectRatio', 'xMinYMin meet')
                .attr('viewBox', "-" + this.margin.left + " -" + this.margin.top + " " + +this.width + " " + (+this.height + this.margin.top + this.margin.bottom));
            // map
            this.svg
                .append('g')
                .attr('class', 'map')
                .selectAll('path')
                .data(this.topojsonFeature.features)
                .join((/**
             * @param {?} enter
             * @return {?}
             */
            function (enter) {
                return enter
                    .append('path')
                    .attr('class', 'feature')
                    .attr('d', _this.geoPath);
            }));
            // borders
            this.svg
                .append('path')
                .attr('class', 'mesh')
                .datum(topojson.mesh(this.topojson, this.topojson.objects[this.mesh || this.feature], (/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) { return a !== b; })))
                .attr('d', this.geoPath);
            // legend
            if (!this.hideLegend) {
                this.svg
                    .append('g')
                    .attr('transform', "translate(" + +this.legendLeft + ", " + +this.legendTop + ")")
                    .call(this.legend);
            }
            this.updateChart();
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        PbdsDatavizChoroplethMapComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes.data && !changes.data.firstChange) {
                this.updateChart();
            }
        };
        /**
         * @return {?}
         */
        PbdsDatavizChoroplethMapComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            if (this.tooltip)
                this.tooltip.remove();
        };
        PbdsDatavizChoroplethMapComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pbds-dataviz-choropleth-map',
                        template: "",
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        PbdsDatavizChoroplethMapComponent.ctorParameters = function () { return [
            { type: PbdsDatavizService },
            { type: core.ElementRef },
            { type: common.ViewportScroller }
        ]; };
        PbdsDatavizChoroplethMapComponent.propDecorators = {
            chartClass: [{ type: core.HostBinding, args: ['class.pbds-chart',] }],
            choroplethMapClass: [{ type: core.HostBinding, args: ['class.pbds-chart-choropleth-map',] }],
            data: [{ type: core.Input }],
            topojson: [{ type: core.Input }],
            feature: [{ type: core.Input }],
            projectionType: [{ type: core.Input }],
            dataField: [{ type: core.Input }],
            mesh: [{ type: core.Input }],
            scale: [{ type: core.Input }],
            center: [{ type: core.Input }],
            width: [{ type: core.Input }],
            height: [{ type: core.Input }],
            marginTop: [{ type: core.Input }],
            marginRight: [{ type: core.Input }],
            marginBottom: [{ type: core.Input }],
            marginLeft: [{ type: core.Input }],
            theme: [{ type: core.Input }],
            colorScale: [{ type: core.Input }],
            domain: [{ type: core.Input }],
            hideTooltip: [{ type: core.Input }],
            tooltipValueFormatType: [{ type: core.Input }],
            tooltipValueFormatString: [{ type: core.Input }],
            hideLegend: [{ type: core.Input }],
            legendWidth: [{ type: core.Input }],
            legendLabel: [{ type: core.Input }],
            legendValueFormatType: [{ type: core.Input }],
            legendValueFormatString: [{ type: core.Input }],
            legendLeft: [{ type: core.Input }],
            legendTop: [{ type: core.Input }],
            hovered: [{ type: core.Output }],
            clicked: [{ type: core.Output }]
        };
        return PbdsDatavizChoroplethMapComponent;
    }());
    if (false) {
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.chartClass;
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.choroplethMapClass;
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.data;
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.topojson;
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.feature;
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.projectionType;
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.dataField;
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.mesh;
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.scale;
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.center;
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.width;
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.height;
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.marginTop;
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.marginRight;
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.marginBottom;
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.marginLeft;
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.theme;
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.colorScale;
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.domain;
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.hideTooltip;
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.tooltipValueFormatType;
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.tooltipValueFormatString;
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.hideLegend;
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.legendWidth;
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.legendLabel;
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.legendValueFormatType;
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.legendValueFormatString;
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.legendLeft;
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.legendTop;
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.hovered;
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.clicked;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizChoroplethMapComponent.prototype.projection;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizChoroplethMapComponent.prototype.geoPath;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizChoroplethMapComponent.prototype.topojsonFeature;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizChoroplethMapComponent.prototype.chart;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizChoroplethMapComponent.prototype.svg;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizChoroplethMapComponent.prototype.margin;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizChoroplethMapComponent.prototype.colorRange;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizChoroplethMapComponent.prototype.colorDomain;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizChoroplethMapComponent.prototype.tooltip;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizChoroplethMapComponent.prototype.tooltipValueFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizChoroplethMapComponent.prototype.legendValueFormat;
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.updateChart;
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.featureMouseOver;
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.featureMouseOut;
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.featureMouseClick;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizChoroplethMapComponent.prototype.tooltipShow;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizChoroplethMapComponent.prototype.tooltipHide;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizChoroplethMapComponent.prototype.tooltipMove;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizChoroplethMapComponent.prototype.tooltipSetPosition;
        /** @type {?} */
        PbdsDatavizChoroplethMapComponent.prototype.legend;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizChoroplethMapComponent.prototype._dataviz;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizChoroplethMapComponent.prototype._element;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizChoroplethMapComponent.prototype._scroll;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PbdsDatavizBarGroupedComponent = /** @class */ (function () {
        function PbdsDatavizBarGroupedComponent(_dataviz, _element, _scroll, _location) {
            var _this = this;
            this._dataviz = _dataviz;
            this._element = _element;
            this._scroll = _scroll;
            this._location = _location;
            this.chartClass = true;
            this.groupedBarClass = true;
            this.width = 306;
            this.height = 400;
            this.vertical = true;
            this.hideXAxis = false;
            this.xAxisMaxBuffer = 0.01;
            this.xAxisFormatType = null;
            this.xAxisFormatString = '';
            this.xAxisTicks = 5;
            this.hideYAxis = false;
            this.yAxisMaxBuffer = 0.01;
            this.yAxisFormatType = null;
            this.yAxisFormatString = '';
            this.yAxisTicks = 5;
            this.marginTop = 10;
            this.marginRight = this.vertical ? 0 : 55;
            this.marginBottom = 30;
            this.marginLeft = 55;
            this.hideLegend = false;
            this.legendWidth = 105 + 28; // hardcoded legend width + left margin, do not document until feedback
            // hardcoded legend width + left margin, do not document until feedback
            this.legendPosition = 'right';
            this.legendLabelFormatType = null;
            this.legendLabelFormatString = '';
            this.hideTooltip = false;
            this.tooltipLabelFormatType = null;
            this.tooltipLabelFormatString = '';
            this.tooltipValueFormatType = null;
            this.tooltipValueFormatString = '';
            this.showGrid = false;
            this.theme = 'classic';
            this.hovered = new core.EventEmitter();
            this.clicked = new core.EventEmitter();
            this.barMouseOver = (/**
             * @param {?} event
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (event, data, index, nodes) {
                /** @type {?} */
                var node = d3.select(nodes[index]);
                _this.chart
                    .selectAll('.bar-group')
                    .selectAll('.bar')
                    .classed('inactive', true);
                node.classed('inactive', false).style('fill', node.attr('data-color'));
                _this.tooltipShow(data, nodes[index]);
                _this.hovered.emit({ event: event, data: data });
            });
            this.barMouseOut = (/**
             * @return {?}
             */
            function () {
                _this.chart
                    .selectAll('.bar')
                    .classed('inactive', false)
                    .style('fill', null);
                _this.tooltipHide();
            });
            this.barMouseClick = (/**
             * @param {?} event
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (event, data, index, nodes) {
                _this.clicked.emit({ event: event, data: data });
            });
            this.legendMouseOver = (/**
             * @param {?} event
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (event, data, index, nodes) {
                _this.chart
                    .selectAll('.legend-item')
                    .filter((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return i !== index; }))
                    .classed('inactive', true);
                _this.chart
                    .selectAll('.bar-group')
                    .selectAll('.bar')
                    .filter((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return i !== index; }))
                    .classed('inactive', true);
                /** @type {?} */
                var bar = _this.chart
                    .selectAll('.bar-group')
                    .selectAll('.bar')
                    .filter((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return i === index; }))
                    .classed('inactive', null);
                /** @type {?} */
                var barColor = bar.attr('data-color');
                bar.style('fill', (/**
                 * @return {?}
                 */
                function () { return barColor; }));
                _this.hovered.emit({ event: event, data: data });
            });
            this.legendMouseOut = (/**
             * @return {?}
             */
            function () {
                _this.chart.selectAll('.legend-item').classed('inactive', false);
                _this.chart
                    .selectAll('.bar-group')
                    .selectAll('.bar')
                    .classed('inactive', false)
                    .style('fill', null);
            });
            this.legendMouseClick = (/**
             * @param {?} event
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (event, data, index, nodes) {
                _this.clicked.emit({ event: event, data: data });
            });
            this.tooltipShow = (/**
             * @param {?} data
             * @param {?} node
             * @return {?}
             */
            function (data, node) {
                /** @type {?} */
                var dimensions = node.getBoundingClientRect();
                /** @type {?} */
                var scroll = _this._scroll.getScrollPosition();
                /** @type {?} */
                var label;
                switch (_this.tooltipLabelFormatType) {
                    case 'number':
                        label = _this.tooltipLabelFormat(data.label);
                        break;
                    case 'time':
                        /** @type {?} */
                        var parsedTime = d3.isoParse(data.label);
                        label = _this.tooltipLabelFormat(parsedTime);
                        break;
                    default:
                        label = data.label;
                }
                /** @type {?} */
                var value = _this.tooltipValueFormat === null
                    ? "<div class=\"tooltip-value\">" + data.value + "</div>"
                    : "<div class=\"tooltip-value\">" + _this.tooltipValueFormat(data.value) + "</div>";
                _this.tooltip.html("\n        " + label + "\n        " + value + "\n      ");
                /** @type {?} */
                var tooltipOffsetWidth = +_this.tooltip.node().offsetWidth / 2;
                /** @type {?} */
                var tooltipOffsetHeight = +_this.tooltip.node().offsetHeight;
                /** @type {?} */
                var tooltipTipSize = 8;
                if (_this.vertical) {
                    _this.tooltip.style('top', +scroll[1] + +dimensions.top - tooltipOffsetHeight - tooltipTipSize + "px");
                    _this.tooltip.style('left', +scroll[0] + +dimensions.left - tooltipOffsetWidth + +dimensions.width / 2 + "px");
                }
                else {
                    _this.tooltip.style('top', +scroll[1] + +dimensions.top + +dimensions.height / 2 - tooltipOffsetHeight / 2 + "px");
                    _this.tooltip.style('left', +scroll[0] + +dimensions.right + tooltipTipSize + "px");
                }
                _this.tooltip.style('opacity', 1);
            });
            this.tooltipHide = (/**
             * @return {?}
             */
            function () {
                _this.tooltip.style('opacity', 0);
            });
            this.xAxisFormatter = (/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                switch (_this.xAxisFormatType) {
                    case 'number':
                        return _this.xAxisFormat(item);
                    case 'time':
                        /** @type {?} */
                        var parseDate = d3.isoParse(item);
                        return _this.xAxisFormat(parseDate);
                    default:
                        return item;
                }
            });
            this.yAxisFormatter = (/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                switch (_this.yAxisFormatType) {
                    case 'number':
                        return _this.yAxisFormat(item);
                    case 'time':
                        /** @type {?} */
                        var parseDate = d3.isoParse(item);
                        return _this.yAxisFormat(parseDate);
                    default:
                        return item;
                }
            });
        }
        /**
         * @return {?}
         */
        PbdsDatavizBarGroupedComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.margin = {
                top: +this.marginTop,
                right: +this.marginRight,
                bottom: +this.marginBottom,
                left: +this.marginLeft
            };
            // create formatters
            this.xAxisFormat = this._dataviz.d3Format(this.xAxisFormatType, this.xAxisFormatString);
            this.yAxisFormat = this._dataviz.d3Format(this.yAxisFormatType, this.yAxisFormatString);
            this.legendLabelFormat = this._dataviz.d3Format(this.legendLabelFormatType, this.legendLabelFormatString);
            this.tooltipLabelFormat = this._dataviz.d3Format(this.tooltipLabelFormatType, this.tooltipLabelFormatString);
            this.tooltipValueFormat = this._dataviz.d3Format(this.tooltipValueFormatType, this.tooltipValueFormatString);
            // defaults for all chart types
            this.hideGrayBars = false;
            this.hideXAxisZero = false;
            this.hideXAxisDomain = false;
            this.hideXAxisTicks = true;
            this.xAxisTickSize = 8;
            this.xAxisTickSizeOuter = 0;
            this.hideYAxisZero = false;
            this.hideYAxisDomain = false;
            this.hideYAxisTicks = true;
            this.yAxisTickSize = 8;
            this.yAxisTickSizeOuter = 0;
            if (!this.hideLegend && this.legendPosition === 'right') {
                this.width = +this.width - +this.legendWidth;
            }
            // create the chart
            this.chart = d3.select(this._element.nativeElement).attr('aria-hidden', 'true');
            // create chart svg
            this.svg = this.chart
                .append('svg')
                .attr('width', (/**
             * @return {?}
             */
            function () {
                if (_this.vertical) {
                    return +_this.width;
                }
                else {
                    return +_this.width + _this.margin.left + _this.margin.right;
                }
            }))
                .attr('height', +this.height + this.margin.top + this.margin.bottom)
                .attr('class', 'img-fluid')
                .attr('preserveAspectRatio', 'xMinYMin meet')
                .attr('viewBox', (/**
             * @return {?}
             */
            function () {
                if (_this.vertical) {
                    return "-" + _this.margin.left + " -" + _this.margin.top + " " + +_this.width + " " + (+_this.height +
                        _this.margin.top +
                        _this.margin.bottom);
                }
                else {
                    return "-" + _this.margin.left + " -" + _this.margin.top + " " + (+_this.width + _this.margin.left + _this.margin.right) + " " + (+_this
                        .height +
                        _this.margin.top +
                        _this.margin.bottom);
                }
            }));
            // TOOLTIP
            if (!this.hideTooltip) {
                this.tooltip = d3.select('body')
                    .append('div')
                    .attr('class', (/**
                 * @return {?}
                 */
                function () {
                    return _this.vertical ? 'pbds-tooltip south' : 'pbds-tooltip west';
                }))
                    .style('opacity', 0)
                    .attr('aria-hidden', 'true'); // hide tooltip for accessibility
            }
            // add legend classes
            if (!this.hideLegend) {
                this.chart.classed('pbds-chart-legend-bottom', this.legendPosition === 'bottom' ? true : false);
                this.chart.append('ul').attr('class', "legend legend-" + this.legendPosition);
            }
            // build color ranges
            this.colorRange = d3.scaleOrdinal().range(this._dataviz.createGradientDefs(this.svg, false, this.theme, this.vertical));
            if (this.vertical) {
                // X AXIS
                this.xAxisScale = d3.scaleBand()
                    .domain(this.data.map((/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return d.key; })))
                    .rangeRound([0, this.width - this.margin.left])
                    .align(0);
                // add padding to the scale for gray bars
                !this.hideGrayBars
                    ? this.xAxisScale.paddingInner(0.1).paddingOuter(0)
                    : this.xAxisScale.paddingInner(0).paddingOuter(0);
                this.xAxisCall = d3.axisBottom(this.xAxisScale)
                    .tickSize(this.xAxisTickSize)
                    .tickSizeOuter(this.xAxisTickSizeOuter)
                    .tickFormat(this.xAxisFormatter);
                this.xAxis = this.svg
                    .append('g')
                    .attr('class', 'axis axis-x')
                    .attr('transform', "translate(0, " + this.height + ")")
                    .classed('axis-hidden', this.hideXAxis)
                    .classed('axis-zero-hidden', this.hideXAxisZero)
                    .classed('axis-domain-hidden', this.hideXAxisDomain)
                    .classed('axis-ticks-hidden', this.hideXAxisTicks)
                    .call(this.xAxisCall);
                // X GRIDLINES
                // if (!this.hideXGrid) {
                //   this.xGridCall = d3_axisBottom(this.xAxisScale).tickSize(-this.height);
                //   this.xGrid = this.svg
                //     .append('g')
                //     .attr('class', 'grid grid-x')
                //     .classed('grid-zero-hidden', this.hideXAxisZero)
                //     .attr('transform', `translate(0, ${this.height})`)
                //     .call(this.xGridCall);
                // }
                // Y AXIS
                this.yAxisMax = d3.max(this.data, (/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) {
                    /** @type {?} */
                    var clone = __assign({}, data);
                    delete clone.key;
                    return d3.max(d3.values(clone));
                }));
                this.yAxisMax = this.yAxisMax + this.yAxisMax * this.yAxisMaxBuffer;
                this.yAxisScale = d3.scaleLinear()
                    .domain([0, this.yAxisMax])
                    .nice()
                    .rangeRound([this.height, 0]);
                this.yAxisCall = d3.axisLeft(this.yAxisScale)
                    .ticks(this.yAxisTicks)
                    .tickSize(this.yAxisTickSize)
                    .tickSizeOuter(this.yAxisTickSizeOuter)
                    .tickFormat(this.yAxisFormatter);
                this.yAxis = this.svg
                    .append('g')
                    .attr('class', 'axis axis-y')
                    .classed('axis-hidden', this.hideYAxis)
                    .classed('axis-zero-hidden', this.hideYAxisZero)
                    .classed('axis-domain-hidden', this.hideYAxisDomain)
                    .classed('axis-ticks-hidden', this.hideYAxisTicks)
                    .call(this.yAxisCall);
                // Y GRIDLINES
                if (this.showGrid) {
                    this.yGridCall = d3.axisLeft(this.yAxisScale)
                        .ticks(this.yAxisTicks)
                        .tickSize(-this.width + this.margin.left + this.margin.right);
                    this.yGrid = this.svg
                        .append('g')
                        .attr('class', 'grid grid-y')
                        .classed('grid-zero-hidden', this.hideYAxisZero)
                        .attr('transform', "translate(0, 0)")
                        .call(this.yGridCall);
                }
                // color bar scale
                this.barScale = d3.scaleBand()
                    .domain(Object.keys(this.data[0]).slice(1))
                    .rangeRound([0, this.xAxisScale.bandwidth()])
                    .paddingInner(0.2)
                    .paddingOuter(0.5);
                this.updateChartVertical();
            }
            else {
                // X AXIS
                this.xAxisMax = d3.max(this.data, (/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) {
                    /** @type {?} */
                    var clone = __assign({}, data);
                    delete clone.key;
                    return d3.max(d3.values(clone));
                }));
                this.xAxisMax = this.xAxisMax + this.xAxisMax * this.xAxisMaxBuffer;
                this.xAxisScale = d3.scaleLinear()
                    .domain([0, this.xAxisMax])
                    .rangeRound([0, this.width])
                    .nice();
                this.xAxisCall = d3.axisBottom(this.xAxisScale)
                    .ticks(this.xAxisTicks)
                    .tickSize(this.xAxisTickSize)
                    .tickSizeOuter(this.xAxisTickSizeOuter)
                    .tickFormat(this.xAxisFormatter);
                this.xAxis = this.svg
                    .append('g')
                    .attr('class', 'axis axis-x')
                    .attr('transform', "translate(0, " + this.height + ")")
                    .classed('axis-hidden', this.hideXAxis)
                    .classed('axis-zero-hidden', this.hideXAxisZero)
                    .classed('axis-domain-hidden', this.hideXAxisDomain)
                    .classed('axis-ticks-hidden', this.hideXAxisTicks)
                    .call(this.xAxisCall);
                // Y AXIS
                this.yAxisScale = d3.scaleBand()
                    .domain(this.data.map((/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return d.key; })))
                    .rangeRound([0, this.height])
                    .align(1);
                // add padding to the scale for gray bars
                !this.hideGrayBars
                    ? this.yAxisScale.paddingInner(0.1).paddingOuter(0)
                    : this.yAxisScale.paddingInner(0).paddingOuter(0);
                this.yAxisCall = d3.axisLeft(this.yAxisScale)
                    .tickSize(this.yAxisTickSize)
                    .tickSizeOuter(this.yAxisTickSizeOuter)
                    .tickFormat(this.yAxisFormatter);
                this.yAxis = this.svg
                    .append('g')
                    .attr('class', 'axis axis-y')
                    .classed('axis-hidden', this.hideYAxis)
                    .classed('axis-zero-hidden', this.hideYAxisZero)
                    .classed('axis-domain-hidden', this.hideYAxisDomain)
                    .classed('axis-ticks-hidden', this.hideYAxisTicks)
                    .call(this.yAxisCall);
                // X GRIDLINES
                if (this.showGrid) {
                    this.xGridCall = d3.axisBottom(this.xAxisScale).tickSize(-this.height);
                    this.xGrid = this.svg
                        .append('g')
                        .attr('class', 'grid grid-x')
                        .classed('grid-zero-hidden', this.hideXAxisZero)
                        .attr('transform', "translate(0, " + this.height + ")")
                        .call(this.xGridCall);
                }
                // Y GRIDLINES
                // if (!this.hideYGrid) {
                //   this.yGridCall = d3_axisLeft(this.yAxisScale)
                //     .ticks(this.yAxisTicks)
                //     .tickSize(-this.width);
                //   this.yGrid = this.svg
                //     .append('g')
                //     .attr('class', 'grid grid-y')
                //     .classed('grid-zero-hidden', this.hideYAxisZero)
                //     .attr('transform', `translate(0, 0)`)
                //     .call(this.yGridCall);
                // }
                // color bar scale
                this.barScale = d3.scaleBand()
                    .domain(Object.keys(this.data[0]).slice(1))
                    .rangeRound([this.yAxisScale.bandwidth(), 0])
                    .paddingInner(0.2)
                    .paddingOuter(0.5);
                this.updateChartHorizontal();
            }
        };
        /**
         * @return {?}
         */
        PbdsDatavizBarGroupedComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            if (this.tooltip)
                this.tooltip.remove();
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        PbdsDatavizBarGroupedComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes.data && !changes.data.firstChange) {
                if (this.vertical) {
                    this.updateChartVertical();
                }
                else {
                    this.updateChartHorizontal();
                }
            }
        };
        /**
         * @return {?}
         */
        PbdsDatavizBarGroupedComponent.prototype.updateChartVertical = /**
         * @return {?}
         */
        function () {
            var _this = this;
            // update the xScale
            this.xAxisScale.domain(this.data.map((/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return d.key; })));
            // update the yScale
            this.yAxisMax = d3.max(this.data, (/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                /** @type {?} */
                var clone = __assign({}, data);
                delete clone.key;
                return d3.max(d3.values(clone));
            }));
            this.yAxisMax = this.yAxisMax + this.yAxisMax * this.yAxisMaxBuffer;
            this.yAxisScale
                .domain([0, this.yAxisMax])
                .rangeRound([this.height, 0])
                .nice();
            this.xAxis
                .transition()
                .duration(1000)
                .call(this.xAxisCall);
            this.yAxis
                .transition()
                .duration(1000)
                .call(this.yAxisCall);
            // update the grids
            // if (!this.hideXGrid) {
            //   this.xGrid
            //     .transition()
            //     .duration(1000)
            //     .call(this.xGridCall);
            // }
            if (this.showGrid) {
                this.yGrid
                    .transition()
                    .duration(1000)
                    .call(this.yGridCall);
            }
            // update the color bar scale
            this.barScale.domain(Object.keys(this.data[0]).slice(1)).rangeRound([0, this.xAxisScale.bandwidth()]);
            this.svg
                .selectAll('.gray-bar')
                .data(this.data)
                .join((/**
             * @param {?} enter
             * @return {?}
             */
            function (enter) {
                return enter
                    .append('rect')
                    .attr('class', 'gray-bar')
                    .attr('x', (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return _this.xAxisScale(d.key); }))
                    .attr('y', (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return _this.yAxisScale(d.value); }))
                    .attr('width', _this.xAxisScale.bandwidth())
                    .attr('height', _this.height);
            }), (/**
             * @param {?} update
             * @return {?}
             */
            function (update) {
                return update
                    .transition()
                    .duration(1000)
                    .attr('x', (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return _this.xAxisScale(d.key); }))
                    .attr('y', (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return _this.yAxisScale(d.value); }))
                    .attr('width', _this.xAxisScale.bandwidth())
                    .attr('height', _this.height);
            }));
            this.svg
                .selectAll('.bar-group')
                .data(this.data)
                .join((/**
             * @param {?} enter
             * @return {?}
             */
            function (enter) {
                return enter
                    .append('g')
                    .attr('class', 'bar-group')
                    .attr('transform', (/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) {
                    return "translate(" + _this.xAxisScale(d.key) + ", 0)";
                }));
            }), (/**
             * @param {?} update
             * @return {?}
             */
            function (update) {
                return update
                    .transition()
                    .duration(1000)
                    .attr('transform', (/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) {
                    return "translate(" + _this.xAxisScale(d.key) + ", 0)";
                }));
            }));
            this.svg
                .selectAll('.bar-group')
                .selectAll('.bar')
                .data((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            function (d, i) {
                /** @type {?} */
                var clone = __assign({}, d);
                delete clone.key;
                /** @type {?} */
                var keys = Object.keys(clone);
                /** @type {?} */
                var keyData = keys.map((/**
                 * @param {?} key
                 * @return {?}
                 */
                function (key) {
                    return { label: key, value: d[key], parentIndex: i };
                }));
                return keyData;
            }))
                .join((/**
             * @param {?} enter
             * @return {?}
             */
            function (enter) {
                return enter
                    .append('rect')
                    .attr('class', 'bar')
                    .attr('fill', (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return "url(" + _this._location.path() + "#gradient-" + _this.colorRange(d.label).substr(1) + ")"; }))
                    .attr('data-color', (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return _this.colorRange(d.label); }))
                    .attr('data-parent-index', (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return d.parentIndex; }))
                    .attr('x', (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return _this.barScale(d.label); }))
                    .attr('width', _this.barScale.bandwidth())
                    .attr('y', _this.height)
                    .attr('height', 0)
                    .call((/**
                 * @param {?} enter
                 * @return {?}
                 */
                function (enter) {
                    return enter
                        .attr('pointer-events', 'none')
                        .transition()
                        .duration(0) // 500
                        .attr('height', (/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return _this.height - _this.yAxisScale(d.value); }))
                        .attr('y', (/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return _this.yAxisScale(d.value); }))
                        .transition()
                        .attr('pointer-events', 'auto');
                }));
            }), (/**
             * @param {?} update
             * @return {?}
             */
            function (update) {
                return update
                    .attr('pointer-events', 'none')
                    .transition()
                    .duration(1000)
                    .attr('x', (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return _this.barScale(d.label); }))
                    .attr('width', _this.barScale.bandwidth())
                    .attr('height', (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return _this.height - _this.yAxisScale(d.value); }))
                    .attr('y', (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return _this.yAxisScale(d.value); }))
                    .transition()
                    .attr('pointer-events', 'auto');
            }), (/**
             * @param {?} exit
             * @return {?}
             */
            function (exit) {
                return exit
                    .transition()
                    .duration(0) // 100
                    .attr('pointer-events', 'none')
                    .attr('height', 0)
                    .attr('y', _this.height);
            }))
                .on('mouseover', (/**
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (data, index, nodes) { return _this.barMouseOver(d3.event, data, index, nodes); }))
                .on('mouseout', (/**
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (data, index, nodes) { return _this.barMouseOut(); }))
                .on('click', (/**
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (data, index, nodes) { return _this.barMouseClick(d3.event, data, index, nodes); }));
            this.updateLegend();
            this.svg.selectAll('.axis').raise();
        };
        /**
         * @return {?}
         */
        PbdsDatavizBarGroupedComponent.prototype.updateChartHorizontal = /**
         * @return {?}
         */
        function () {
            var _this = this;
            // update the xScale
            this.xAxisMax = d3.max(this.data, (/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                /** @type {?} */
                var clone = __assign({}, data);
                delete clone.key;
                return d3.max(d3.values(clone));
            }));
            this.xAxisMax = this.xAxisMax + this.xAxisMax * this.xAxisMaxBuffer;
            this.xAxisScale
                .domain([0, this.xAxisMax])
                .rangeRound([0, this.width])
                .nice();
            // update the yScale
            this.yAxisScale.domain(this.data.map((/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return d.key; })));
            this.xAxis
                .transition()
                .duration(1000)
                .call(this.xAxisCall);
            this.yAxis
                .transition()
                .duration(1000)
                .call(this.yAxisCall);
            // update the grids
            if (this.showGrid) {
                this.xGrid
                    .transition()
                    .duration(1000)
                    .call(this.xGridCall);
            }
            // if (!this.hideYGrid) {
            //   this.yGrid
            //     .transition()
            //     .duration(1000)
            //     .call(this.yGridCall);
            // }
            // update the color bar scale
            this.barScale.domain(Object.keys(this.data[0]).slice(1)).rangeRound([0, this.yAxisScale.bandwidth()]);
            this.svg
                .selectAll('.gray-bar')
                .data(this.data)
                .join((/**
             * @param {?} enter
             * @return {?}
             */
            function (enter) {
                return enter
                    .append('rect')
                    .attr('class', 'gray-bar')
                    .attr('y', (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return _this.yAxisScale(d.key); }))
                    .attr('width', _this.width)
                    .attr('height', _this.yAxisScale.bandwidth());
            }), (/**
             * @param {?} update
             * @return {?}
             */
            function (update) {
                return update
                    .transition()
                    .duration(1000)
                    .attr('y', (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return _this.yAxisScale(d.key); }))
                    .attr('width', _this.width)
                    .attr('height', _this.yAxisScale.bandwidth());
            }));
            this.svg
                .selectAll('.bar-group')
                .data(this.data)
                .join((/**
             * @param {?} enter
             * @return {?}
             */
            function (enter) {
                return enter
                    .append('g')
                    .attr('class', 'bar-group')
                    .attr('transform', (/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) {
                    return "translate(0, " + _this.yAxisScale(d.key) + ")";
                }));
            }), (/**
             * @param {?} update
             * @return {?}
             */
            function (update) {
                return update
                    .transition()
                    .duration(1000)
                    .attr('transform', (/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) {
                    return "translate(0, " + _this.yAxisScale(d.key) + ")";
                }));
            }));
            this.svg
                .selectAll('.bar-group')
                .selectAll('.bar')
                .data((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            function (d, i) {
                /** @type {?} */
                var clone = __assign({}, d);
                delete clone.key;
                /** @type {?} */
                var keys = Object.keys(clone);
                /** @type {?} */
                var keyData = keys.map((/**
                 * @param {?} key
                 * @return {?}
                 */
                function (key) {
                    return { label: key, value: d[key], parentIndex: i };
                }));
                return keyData;
            }))
                .join((/**
             * @param {?} enter
             * @return {?}
             */
            function (enter) {
                return enter
                    .append('rect')
                    .attr('class', 'bar')
                    .attr('fill', (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return "url(" + _this._location.path() + "#gradient-horizontal-" + _this.colorRange(d.label).substr(1) + ")"; }))
                    .attr('data-color', (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return _this.colorRange(d.label); }))
                    .attr('data-parent-index', (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return d.parentIndex; }))
                    .attr('x', 0)
                    .attr('width', 0)
                    .attr('y', (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return _this.barScale(d.label); }))
                    .attr('height', _this.barScale.bandwidth())
                    .call((/**
                 * @param {?} enter
                 * @return {?}
                 */
                function (enter) {
                    return enter
                        .attr('pointer-events', 'none')
                        .transition()
                        .duration(0) // 500
                        .attr('width', (/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return _this.xAxisScale(d.value); }))
                        .transition()
                        .attr('pointer-events', 'auto');
                }));
            }), (/**
             * @param {?} update
             * @return {?}
             */
            function (update) {
                return update
                    .attr('pointer-events', 'none')
                    .transition()
                    .duration(1000)
                    .attr('width', (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return _this.xAxisScale(d.value); }))
                    .attr('height', _this.barScale.bandwidth())
                    .attr('y', (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return _this.barScale(d.label); }))
                    .transition()
                    .attr('pointer-events', 'auto');
            }), (/**
             * @param {?} exit
             * @return {?}
             */
            function (exit) {
                return exit
                    .transition()
                    .duration(0) // 100
                    .attr('pointer-events', 'none')
                    .attr('width', 0);
            }))
                .on('mouseover', (/**
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (data, index, nodes) { return _this.barMouseOver(d3.event, data, index, nodes); }))
                .on('mouseout', (/**
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (data, index, nodes) { return _this.barMouseOut(); }))
                .on('click', (/**
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (data, index, nodes) { return _this.barMouseClick(d3.event, data, index, nodes); }));
            this.updateLegend();
            this.svg.selectAll('.axis').raise();
        };
        /**
         * @return {?}
         */
        PbdsDatavizBarGroupedComponent.prototype.updateLegend = /**
         * @return {?}
         */
        function () {
            var _this = this;
            // legend
            if (!this.hideLegend) {
                /** @type {?} */
                var legendData = __assign({}, this.data[0]);
                delete legendData.key;
                /** @type {?} */
                var legendKeys = Object.keys(legendData).map((/**
                 * @param {?} key
                 * @return {?}
                 */
                function (key) {
                    return { label: key };
                }));
                this.chart
                    .select('.legend')
                    .selectAll('.legend-item')
                    .data(legendKeys)
                    .join((/**
                 * @param {?} enter
                 * @return {?}
                 */
                function (enter) {
                    /** @type {?} */
                    var li = enter.append('li').attr('class', 'legend-item');
                    li.insert('span')
                        .attr('class', 'legend-key')
                        .style('background-color', (/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return _this.colorRange(d.label); }));
                    li.insert('span', '.legend-item')
                        .attr('class', 'legend-label')
                        .html((/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) {
                        switch (_this.legendLabelFormatType) {
                            case 'number':
                                return _this.legendLabelFormat(d.label);
                            case 'time':
                                /** @type {?} */
                                var parsedTime = d3.isoParse(d.label);
                                return _this.legendLabelFormat(parsedTime);
                            default:
                                return d.label;
                        }
                    }));
                    return li;
                }), (/**
                 * @param {?} update
                 * @return {?}
                 */
                function (update) {
                    update.select('.legend-label').html((/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) {
                        switch (_this.legendLabelFormatType) {
                            case 'number':
                                return _this.legendLabelFormat(d.label);
                            case 'time':
                                /** @type {?} */
                                var parsedTime = d3.isoParse(d.label);
                                return _this.legendLabelFormat(parsedTime);
                            default:
                                return d.label;
                        }
                    }));
                    return update;
                }), (/**
                 * @param {?} exit
                 * @return {?}
                 */
                function (exit) { return exit.remove(); }))
                    .on('mouseover', (/**
                 * @param {?} data
                 * @param {?} index
                 * @param {?} nodes
                 * @return {?}
                 */
                function (data, index, nodes) { return _this.legendMouseOver(d3.event, data, index, nodes); }))
                    .on('mouseout', (/**
                 * @return {?}
                 */
                function () { return _this.legendMouseOut(); }))
                    .on('click', (/**
                 * @param {?} data
                 * @param {?} index
                 * @param {?} nodes
                 * @return {?}
                 */
                function (data, index, nodes) { return _this.legendMouseClick(d3.event, data, index, nodes); }));
            }
        };
        PbdsDatavizBarGroupedComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pbds-dataviz-bar-grouped',
                        template: "",
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        PbdsDatavizBarGroupedComponent.ctorParameters = function () { return [
            { type: PbdsDatavizService },
            { type: core.ElementRef },
            { type: common.ViewportScroller },
            { type: common.Location }
        ]; };
        PbdsDatavizBarGroupedComponent.propDecorators = {
            chartClass: [{ type: core.HostBinding, args: ['class.pbds-chart',] }],
            groupedBarClass: [{ type: core.HostBinding, args: ['class.pbds-chart-bar-grouped',] }],
            data: [{ type: core.Input }],
            width: [{ type: core.Input }],
            height: [{ type: core.Input }],
            vertical: [{ type: core.Input }],
            hideXAxis: [{ type: core.Input }],
            xAxisMaxBuffer: [{ type: core.Input }],
            xAxisFormatType: [{ type: core.Input }],
            xAxisFormatString: [{ type: core.Input }],
            xAxisTicks: [{ type: core.Input }],
            hideYAxis: [{ type: core.Input }],
            yAxisMaxBuffer: [{ type: core.Input }],
            yAxisFormatType: [{ type: core.Input }],
            yAxisFormatString: [{ type: core.Input }],
            yAxisTicks: [{ type: core.Input }],
            marginTop: [{ type: core.Input }],
            marginRight: [{ type: core.Input }],
            marginBottom: [{ type: core.Input }],
            marginLeft: [{ type: core.Input }],
            hideLegend: [{ type: core.Input }],
            legendWidth: [{ type: core.Input }],
            legendPosition: [{ type: core.Input }],
            legendLabelFormatType: [{ type: core.Input }],
            legendLabelFormatString: [{ type: core.Input }],
            hideTooltip: [{ type: core.Input }],
            tooltipLabelFormatType: [{ type: core.Input }],
            tooltipLabelFormatString: [{ type: core.Input }],
            tooltipValueFormatType: [{ type: core.Input }],
            tooltipValueFormatString: [{ type: core.Input }],
            showGrid: [{ type: core.Input }],
            theme: [{ type: core.Input }],
            hovered: [{ type: core.Output }],
            clicked: [{ type: core.Output }]
        };
        return PbdsDatavizBarGroupedComponent;
    }());
    if (false) {
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.chartClass;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.groupedBarClass;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.data;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.width;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.height;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.vertical;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.hideXAxis;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.xAxisMaxBuffer;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.xAxisFormatType;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.xAxisFormatString;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.xAxisTicks;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.hideYAxis;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.yAxisMaxBuffer;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.yAxisFormatType;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.yAxisFormatString;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.yAxisTicks;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.marginTop;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.marginRight;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.marginBottom;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.marginLeft;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.hideLegend;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.legendWidth;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.legendPosition;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.legendLabelFormatType;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.legendLabelFormatString;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.hideTooltip;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.tooltipLabelFormatType;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.tooltipLabelFormatString;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.tooltipValueFormatType;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.tooltipValueFormatString;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.showGrid;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.theme;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.hovered;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.clicked;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.barScale;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.chart;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.svg;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.margin;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.colorRange;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.xAxisMax;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.xAxisScale;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.xAxisCall;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.xAxis;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.xAxisTickSize;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.xAxisTickSizeOuter;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.xAxisFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.hideXAxisDomain;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.hideXAxisZero;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.hideXAxisTicks;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.xGrid;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.xGridCall;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.yAxisMax;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.yAxisScale;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.yAxisCall;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.yAxis;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.yAxisFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.yAxisTickSize;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.yAxisTickSizeOuter;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.hideYAxisZero;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.hideYAxisDomain;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.hideYAxisTicks;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.yGrid;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.yGridCall;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.legendLabelFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.hideGrayBars;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.tooltip;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.tooltipValueFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.tooltipLabelFormat;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.barMouseOver;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.barMouseOut;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.barMouseClick;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.legendMouseOver;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.legendMouseOut;
        /** @type {?} */
        PbdsDatavizBarGroupedComponent.prototype.legendMouseClick;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.tooltipShow;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.tooltipHide;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.xAxisFormatter;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype.yAxisFormatter;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype._dataviz;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype._element;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype._scroll;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarGroupedComponent.prototype._location;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PbdsDatavizBarSingleHorizontalComponent = /** @class */ (function () {
        function PbdsDatavizBarSingleHorizontalComponent(_dataviz, _element, _scroll, _location) {
            var _this = this;
            this._dataviz = _dataviz;
            this._element = _element;
            this._scroll = _scroll;
            this._location = _location;
            this.chartClass = true;
            this.singleStackedBarClass = true;
            this.width = 300;
            this.height = 40;
            this.nullValueText = 'No data available';
            this.percentage = false;
            this.marginTop = 10;
            this.marginRight = 20;
            this.marginBottom = 35;
            this.marginLeft = 15;
            this.barMargin = 2;
            this.hideXAxis = false;
            this.xAxisTicks = 6;
            this.xAxisTitle = null;
            this.xAxisFormatType = null;
            this.xAxisFormatString = '';
            this.xAxisTickLabelSuffix = '';
            this.hideXGrid = false;
            this.hideLegend = false;
            this.hideLegendTooltip = true;
            this.legendWidth = 105 + 28; // hardcoded legend width + left margin, do not document until feedback
            // hardcoded legend width + left margin, do not document until feedback
            this.legendPosition = 'bottom';
            this.legendLabelFormatType = null;
            this.legendLabelFormatString = '';
            this.hideTooltip = false;
            this.tooltipLabelFormatType = null;
            this.tooltipLabelFormatString = '';
            this.tooltipDateFormatString = '%b %e, %Y';
            this.tooltipValueFormatType = null;
            this.tooltipValueFormatString = '';
            this.tooltipValueSuffix = '';
            this.tooltipPercentFormatString = '.2%';
            this.compareChangeFormatString = '.2%';
            this.monochrome = false;
            this.hovered = new core.EventEmitter();
            this.clicked = new core.EventEmitter();
            this.isSingleData = false;
            this.isCompare = false;
            this.barPadding = 40;
            this.barMouseOver = (/**
             * @param {?} event
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (event, data, index, nodes) {
                /** @type {?} */
                var node = d3.select(nodes[index]);
                _this.chart.selectAll('.bar').classed('inactive', true);
                node.classed('inactive', false);
                _this.chart
                    .selectAll('.legend-item')
                    .filter((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) {
                    // debugger;
                    return i !== index;
                }))
                    .classed('inactive', true);
                _this.tooltipShow(data, nodes[index]);
                _this.hovered.emit({ event: event, data: data });
            });
            this.barMouseOut = (/**
             * @return {?}
             */
            function () {
                _this.chart
                    .selectAll('.bar')
                    .classed('inactive', false)
                    .style('fill', null);
                _this.chart.selectAll('.legend-item').classed('inactive', false);
                _this.tooltipHide();
            });
            this.barMouseClick = (/**
             * @param {?} event
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (event, data, index, nodes) {
                _this.clicked.emit({ event: event, data: data });
            });
            this.tooltipShow = (/**
             * @param {?} data
             * @param {?} node
             * @return {?}
             */
            function (data, node) {
                /** @type {?} */
                var dimensions = node.getBoundingClientRect();
                /** @type {?} */
                var scroll = _this._scroll.getScrollPosition();
                /** @type {?} */
                var percentage = data.value / d3.sum(_this.data, (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return d.value; }));
                /** @type {?} */
                var comparePercentage = data.compareValue / d3.sum(_this.data, (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return d.compareValue; }));
                /** @type {?} */
                var tooltipLabel = "";
                /** @type {?} */
                var tooltipCompareDaterangeMargin = "";
                /** @type {?} */
                var tooltipCompareDaterange = "";
                /** @type {?} */
                var tooltipCompareValue = "";
                /** @type {?} */
                var tooltipDaterangeMargin = "";
                /** @type {?} */
                var tooltipDaterange = "";
                /** @type {?} */
                var tooltipValue = "" + _this.nullValueText;
                /** @type {?} */
                var tooltipIndicator = '';
                // tooltip label
                if (!_this.isSingleData) {
                    _this.tooltip.classed('pbds-tooltip-compare', null);
                    switch (_this.tooltipLabelFormatType) {
                        case 'number':
                            tooltipLabel = _this.tooltipLabelFormat(data.label);
                            break;
                        case 'time':
                            /** @type {?} */
                            var parsedTime = d3.isoParse(data.label);
                            tooltipLabel = _this.tooltipLabelFormat(parsedTime);
                            break;
                        default:
                            tooltipLabel = data.label;
                    }
                }
                // tooltip compare daterange
                if (_this.isCompare && data.compareStartDate && data.compareEndDate) {
                    _this.tooltip.classed('pbds-tooltip-compare', _this.isCompare);
                    tooltipCompareDaterangeMargin = "mt-2";
                    tooltipCompareDaterange = _this.tooltipDateFormat(d3.isoParse(data.compareStartDate)) + " - " + _this.tooltipDateFormat(d3.isoParse(data.compareEndDate));
                }
                // tooltip compare value
                if (_this.percentage && _this.isCompare && data.compareValue) {
                    tooltipCompareValue =
                        _this.tooltipValueFormat === null
                            ? _this.tooltipPercentFormat(comparePercentage) + " (" + data.comparveValue + _this.tooltipValueSuffix + ")"
                            : _this.tooltipPercentFormat(comparePercentage) + " (" + _this.tooltipValueFormat(data.compareValue) + _this.tooltipValueSuffix + ")";
                }
                else if (_this.isCompare && data.compareValue !== null) {
                    tooltipCompareValue =
                        _this.tooltipValueFormat === null
                            ? "" + data.compareValue + _this.tooltipValueSuffix + " (" + _this.tooltipPercentFormat(comparePercentage) + ")"
                            : "" + _this.tooltipValueFormat(data.compareValue) + _this.tooltipValueSuffix + " (" + _this.tooltipPercentFormat(comparePercentage) + ")";
                }
                else if (_this.isCompare && data.compareValue === null) {
                    tooltipCompareValue = "" + _this.nullValueText;
                }
                // tooltip daterange
                if (data.startDate && data.endDate) {
                    tooltipDaterange = _this.tooltipDateFormat(d3.isoParse(data.startDate)) + " - " + _this.tooltipDateFormat(d3.isoParse(data.endDate));
                }
                //tooltip daterange margin
                if (tooltipLabel !== '') {
                    tooltipDaterangeMargin = "mt-2";
                }
                // tooltip value
                if (_this.isSingleData && _this.percentage && data.value) {
                    tooltipValue = _this.tooltipValueFormat === null ? "" + data.value : "" + _this.tooltipValueFormat(data.value);
                }
                else if (_this.isSingleData && data.value !== null) {
                    tooltipValue =
                        _this.tooltipValueFormat === null
                            ? "" + data.value + _this.tooltipValueSuffix
                            : "" + _this.tooltipValueFormat(data.value) + _this.tooltipValueSuffix;
                }
                else if (!_this.isSingleData && _this.percentage && data.value !== null) {
                    tooltipValue =
                        _this.tooltipValueFormat === null
                            ? _this.tooltipPercentFormat(percentage) + " (" + data.value + _this.tooltipValueSuffix + ")"
                            : _this.tooltipPercentFormat(percentage) + " (" + _this.tooltipValueFormat(data.value) + _this.tooltipValueSuffix + ")";
                }
                else if (!_this.isSingleData && data.value !== null) {
                    tooltipValue =
                        _this.tooltipValueFormat === null
                            ? "" + data.value + _this.tooltipValueSuffix + " (" + _this.tooltipPercentFormat(percentage) + ")"
                            : "" + _this.tooltipValueFormat(data.value) + _this.tooltipValueSuffix + " (" + _this.tooltipPercentFormat(percentage) + ")";
                }
                // tooltip metric indicator
                if (!_this.isSingleData && _this.isCompare && data.value !== null && data.compareValue !== null) {
                    tooltipIndicator = "<div class=\"metric-block-indicator " + data.compareChangeDirection + " " + (data.compareChangeInverse ? 'inverse' : '') + " ml-2\"><span>" + _this.tooltipCompareChangeFormat(data.compareChangeValue) + "</span></div>";
                }
                _this.tooltip.html((/**
                 * @return {?}
                 */
                function () {
                    return "\n        <div class=\"tooltip-label font-weight-bold\">" + tooltipLabel + "</div>\n        <div class=\"" + tooltipCompareDaterangeMargin + "\">" + tooltipCompareDaterange + "</div>\n        <div class=\"tooltip-value font-weight-bold\">" + tooltipCompareValue + "</div>\n        <div class=\"" + tooltipDaterangeMargin + "\">" + tooltipDaterange + "</div>\n        <div class=\"tooltip-value\"><span class=\"font-weight-bold\">" + tooltipValue + "</span> <span>" + tooltipIndicator + "</span></div>\n      ";
                }));
                /** @type {?} */
                var tooltipOffsetWidth = +_this.tooltip.node().offsetWidth / 2;
                /** @type {?} */
                var tooltipOffsetHeight = +_this.tooltip.node().offsetHeight;
                /** @type {?} */
                var tooltipTipSize = 8;
                _this.tooltip.style('top', +scroll[1] + +dimensions.top - tooltipOffsetHeight - tooltipTipSize + "px");
                if (_this.data.length > 1) {
                    _this.tooltip.style('left', +scroll[0] + +dimensions.left - tooltipOffsetWidth + +dimensions.width / 2 + "px");
                }
                else {
                    _this.tooltip.style('left', +scroll[0] - tooltipOffsetWidth + +dimensions.right + "px");
                }
                _this.tooltip.style('opacity', 1);
            });
            this.tooltipHide = (/**
             * @return {?}
             */
            function () {
                _this.tooltip.style('opacity', 0);
            });
            this.legendMouseOver = (/**
             * @param {?} event
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (event, data, index, nodes) {
                if (!_this.hideLegendTooltip) {
                    /** @type {?} */
                    var barHover = _this.svg
                        .selectAll('.bar')
                        .filter((/**
                     * @param {?} d
                     * @param {?} i
                     * @return {?}
                     */
                    function (d, i) { return i === index; }))
                        .node();
                    _this.tooltipShow(data, barHover);
                }
                _this.chart
                    .selectAll('.legend-item')
                    .filter((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return i !== index; }))
                    .classed('inactive', true);
                _this.chart
                    .selectAll('.bar')
                    .filter((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return i !== index; }))
                    .classed('inactive', true);
                _this.chart
                    .selectAll('.bar')
                    .filter((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) { return i === index; }))
                    .classed('inactive', null);
                _this.hovered.emit({ event: event, data: data });
            });
            this.legendMouseOut = (/**
             * @return {?}
             */
            function () {
                _this.chart.selectAll('.legend-item').classed('inactive', false);
                _this.chart
                    .selectAll('.bar')
                    .classed('inactive', false)
                    .style('fill', null);
                // hide tooltip for zero/null values
                _this.tooltipHide();
            });
            this.legendMouseClick = (/**
             * @param {?} event
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (event, data, index, nodes) {
                _this.clicked.emit({ event: event, data: data });
            });
            this.xAxisFormatter = (/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                switch (_this.xAxisFormatType) {
                    case 'number':
                        return "" + _this.xAxisFormat(item) + _this.xAxisTickLabelSuffix;
                    default:
                        return "" + item + _this.xAxisTickLabelSuffix;
                }
            });
        }
        /**
         * @return {?}
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.height = +this.height + this.barPadding;
            this.margin = {
                top: +this.marginTop,
                right: +this.marginRight,
                bottom: +this.marginBottom,
                left: +this.marginLeft
            };
            this.isSingleData = this.data.length === 1 ? true : false;
            this.isCompare = Object.keys(this.data[0]).includes('compareValue');
            // create formatters
            this.xAxisFormat = this._dataviz.d3Format(this.xAxisFormatType, this.xAxisFormatString);
            this.legendLabelFormat = this._dataviz.d3Format(this.legendLabelFormatType, this.legendLabelFormatString);
            this.tooltipValueFormat = this._dataviz.d3Format(this.tooltipValueFormatType, this.tooltipValueFormatString);
            this.tooltipDateFormat = d3.timeFormat(this.tooltipDateFormatString);
            this.tooltipPercentFormat = d3.format(this.tooltipPercentFormatString);
            this.tooltipCompareChangeFormat = d3.format(this.compareChangeFormatString);
            // defaults for all chart types
            this.hideXAxisZero = false;
            this.hideXAxisDomain = true;
            this.hideXAxisTicks = true;
            this.xAxisTickSize = 8;
            this.xAxisTickSizeOuter = 0;
            this.xAxisTitleMargin = this.xAxisTitle ? 20 : 0;
            if (!this.hideLegend && this.legendPosition === 'right') {
                this.width = +this.width - +this.legendWidth;
            }
            // create the chart
            this.chart = d3.select(this._element.nativeElement).attr('aria-hidden', 'true');
            // create chart svg
            this.svg = this.chart
                .append('svg')
                .attr('width', (/**
             * @return {?}
             */
            function () {
                return +_this.width + _this.margin.left + _this.margin.right;
            }))
                .attr('height', +this.height + this.margin.top + this.margin.bottom + this.xAxisTitleMargin)
                .attr('class', 'img-fluid')
                .attr('preserveAspectRatio', 'xMinYMin meet')
                .attr('viewBox', (/**
             * @return {?}
             */
            function () {
                return "-" + _this.margin.left + " -" + _this.margin.top + " " + (+_this.width + _this.margin.left + _this.margin.right) + " " + (+_this
                    .height +
                    _this.margin.top +
                    _this.margin.bottom +
                    _this.xAxisTitleMargin);
            }));
            // TOOLTIP
            if (!this.hideTooltip) {
                this.tooltip = d3.select('body')
                    .append('div')
                    .attr('class', 'pbds-tooltip south')
                    .classed('pbds-tooltip-compare', this.isCompare)
                    .style('opacity', 0)
                    .attr('aria-hidden', 'true'); // hide tooltip for accessibility
            }
            // add legend classes
            if (!this.hideLegend && this.data.length > 1) {
                this.chart.classed('pbds-chart-legend-bottom', this.legendPosition === 'bottom' ? true : false);
                this.chart.append('ul').attr('class', "legend legend-" + this.legendPosition);
            }
            // X AXIS
            this.xAxisScale = d3.scaleLinear()
                .domain([0, Math.ceil(d3.sum(this.data, (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return d.value; })))])
                .range([0, +this.width]);
            this.xAxisCall = d3.axisBottom(this.xAxisScale)
                // .tickValues([0, d3_sum(this.data, (d: any) => d.value)])
                .ticks(this.xAxisTicks)
                .tickSize(this.xAxisTickSize)
                .tickSizeOuter(this.xAxisTickSizeOuter)
                .tickFormat(this.xAxisFormatter);
            this.xAxis = this.svg
                .append('g')
                .attr('class', 'axis axis-x')
                .attr('transform', "translate(0, " + this.height + ")")
                .classed('axis-hidden', this.hideXAxis)
                .classed('axis-zero-hidden', this.hideXAxisZero)
                .classed('axis-domain-hidden', this.hideXAxisDomain)
                .classed('axis-ticks-hidden', this.hideXAxisTicks);
            // .call(this.xAxisCall);
            // X GRIDLINES
            if (!this.hideXGrid) {
                this.xGridCall = d3.axisBottom(this.xAxisScale).tickSize(-this.height);
                this.xGrid = this.svg
                    .append('g')
                    .attr('class', 'grid grid-x')
                    .classed('grid-zero-hidden', this.hideXAxisZero)
                    .attr('transform', "translate(0, " + this.height + ")")
                    .call(this.xGridCall);
            }
            if (this.xAxisTitle) {
                this.svg
                    .append('text')
                    .attr('class', 'axis-title')
                    .attr('text-anchor', 'center')
                    .attr('x', this.width / 2 - this.margin.left)
                    .attr('y', this.height + this.margin.top + (!this.hideXAxis ? 40 : 0))
                    .text(this.xAxisTitle);
            }
            // build color ranges
            /** @type {?} */
            var colors;
            if (this.isSingleData) {
                colors = this._dataviz.createGradientDefs(this.svg, this.monochrome, this.theme, false);
            }
            else if (this.monochrome) {
                colors = this._dataviz.getColors(this.monochrome, this.theme).reverse();
            }
            else {
                colors = this._dataviz.getColors(this.monochrome, this.theme);
            }
            this.colorRange = d3.scaleOrdinal().range(colors);
            this.updateChart();
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes.data && !changes.data.firstChange) {
                this.updateChart();
            }
        };
        /**
         * @return {?}
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            if (this.tooltip)
                this.tooltip.remove();
        };
        /**
         * @return {?}
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype.updateChart = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.isSingleData = this.data.length === 1 ? true : false;
            this.isCompare = Object.keys(this.data[0]).includes('compareValue');
            /** @type {?} */
            var sumValues = d3.sum(this.data, (/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return d.value; }));
            /** @type {?} */
            var isLastBarZero = this.data[this.data.length - 1].value === 0 || this.data[this.data.length - 1].value === null ? true : false;
            /** @type {?} */
            var lastBarZeroCount = 0;
            /** @type {?} */
            var cloneData = __spread(this.data);
            /** @type {?} */
            var isLast = false;
            cloneData.reverse().forEach((/**
             * @param {?} value
             * @param {?} index
             * @param {?} array
             * @return {?}
             */
            function (value, index, array) {
                if ((value.value === 0 || value.value === null) && !isLast) {
                    lastBarZeroCount++;
                }
                else {
                    isLast = true;
                }
            }));
            if (this.percentage && !this.isSingleData) {
                this.xAxisScale.domain([0, sumValues]).range([0, +this.width]);
                this.xAxisCall.tickValues([0, sumValues * 0.25, sumValues * 0.5, sumValues * 0.75, sumValues]);
                this.xAxis.call(this.xAxisCall);
                this.xGridCall.tickValues([0, sumValues * 0.25, sumValues * 0.5, sumValues * 0.75, sumValues]);
                this.xGrid.call(this.xGridCall);
                this.svg
                    .select('.axis-x')
                    .selectAll('text')
                    .html((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) {
                    /** @type {?} */
                    var format$1 = d3.format('.0%');
                    return format$1(i * 0.25);
                }));
            }
            else if (this.percentage && this.isSingleData) {
                this.xAxisScale.domain([0, 1.0]).range([0, +this.width]);
                this.xAxisCall.tickValues([0, 0.25, 0.5, 0.75, 1.0]);
                this.xAxis.call(this.xAxisCall);
                this.xGridCall.tickValues([0, 0.25, 0.5, 0.75, 1.0]);
                this.xGrid.call(this.xGridCall);
                this.svg
                    .select('.axis-x')
                    .selectAll('text')
                    .html((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) {
                    /** @type {?} */
                    var format$1 = d3.format('.0%');
                    return format$1(i * 0.25);
                }));
            }
            else {
                this.xAxisScale.domain([0, Math.ceil(sumValues)]).range([0, +this.width]);
                this.xGridCall.tickValues(this.xAxisScale.ticks().filter((/**
                 * @param {?} n
                 * @return {?}
                 */
                function (n) { return Number.isInteger(n); }))); // remove decimal grid values
                this.xAxis
                    .transition()
                    .duration(1000)
                    .call(this.xAxisCall);
                // update the grids
                if (!this.hideXGrid) {
                    this.xGrid
                        .transition()
                        .duration(1000)
                        .call(this.xGridCall);
                }
            }
            this.svg
                .selectAll('.bar')
                .data(this.data)
                .join((/**
             * @param {?} enter
             * @return {?}
             */
            function (enter) {
                return enter
                    .append('rect')
                    .attr('class', 'bar')
                    .attr('width', 0)
                    .attr('height', (/**
                 * @return {?}
                 */
                function () {
                    return _this.height - _this.barPadding;
                }))
                    .attr('fill', (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) {
                    if (_this.isSingleData) {
                        return "url(" + _this._location.path() + "#gradient-horizontal-" + _this.colorRange(d.label).substr(1) + ")";
                    }
                    else {
                        return _this.colorRange(d.label);
                    }
                }))
                    .attr('y', (/**
                 * @return {?}
                 */
                function () {
                    return _this.barPadding / 2;
                }))
                    .attr('x', (/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) {
                    return _this.data.slice(0, i).reduce((/**
                     * @param {?} acc
                     * @param {?} item
                     * @return {?}
                     */
                    function (acc, item) {
                        // console.log(acc, item, acc + this.xAxisScale(item.value) + this.barMargin);
                        return +acc + +_this.xAxisScale(item.value);
                    }), 1);
                }))
                    .attr('pointer-events', 'none')
                    .call((/**
                 * @param {?} enter
                 * @return {?}
                 */
                function (enter) {
                    return (enter
                        .transition()
                        // .duration(0)
                        .delay((/**
                     * @param {?} d
                     * @param {?} i
                     * @return {?}
                     */
                    function (d, i) { return i * 250; }))
                        .ease(d3.easeLinear)
                        .attr('width', (/**
                     * @param {?} d
                     * @param {?} i
                     * @return {?}
                     */
                    function (d, i) {
                        // debugger;
                        if (i === _this.data.length - lastBarZeroCount - 1 && isLastBarZero) {
                            return _this.xAxisScale(d.value);
                        }
                        else if (i !== _this.data.length - 1) {
                            /** @type {?} */
                            var width = _this.xAxisScale(d.value) - +_this.barMargin;
                            width = Math.sign(width) === -1 ? 0 : width; // handle negative values
                            return width;
                        }
                        else {
                            return _this.xAxisScale(d.value);
                        }
                    }))
                        .transition()
                        .attr('pointer-events', 'auto'));
                }));
            }), (/**
             * @param {?} update
             * @return {?}
             */
            function (update) {
                return update
                    .attr('pointer-events', 'none')
                    .transition()
                    .duration(1000)
                    .attr('width', (/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) {
                    // debugger;
                    if (d.value === null || d.value === 0) {
                        return _this.xAxisScale(0);
                    }
                    else if (i === _this.data.length - 1) {
                        return _this.xAxisScale(d.value);
                    }
                    else {
                        return _this.xAxisScale(d.value) - _this.barMargin;
                    }
                }))
                    .attr('x', (/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                function (d, i) {
                    return _this.data.slice(0, i).reduce((/**
                     * @param {?} acc
                     * @param {?} item
                     * @return {?}
                     */
                    function (acc, item) {
                        return acc + +_this.xAxisScale(item.value);
                    }), 0);
                }))
                    .transition()
                    .attr('pointer-events', 'auto');
            }), (/**
             * @param {?} exit
             * @return {?}
             */
            function (exit) {
                return exit
                    .transition()
                    .attr('pointer-events', 'none')
                    .remove();
            }))
                .on('mouseover', (/**
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (data, index, nodes) { return _this.barMouseOver(d3.event, data, index, nodes); }))
                .on('mouseout', (/**
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (data, index, nodes) { return _this.barMouseOut(); }))
                .on('click', (/**
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (data, index, nodes) { return _this.barMouseClick(d3.event, data, index, nodes); }));
            if (!this.hideLegend) {
                this.chart
                    .select('.legend')
                    .selectAll('.legend-item')
                    .data(this.data)
                    .join((/**
                 * @param {?} enter
                 * @return {?}
                 */
                function (enter) {
                    /** @type {?} */
                    var li = enter
                        .append('li')
                        .attr('class', 'legend-item')
                        .classed('align-items-start', _this.isCompare);
                    li.insert('span')
                        .attr('class', 'legend-key')
                        .style('background-color', (/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return _this.colorRange(d.label); }))
                        .classed('mt-1', _this.isCompare);
                    li.insert('span')
                        .attr('class', 'legend-description')
                        .classed('d-flex', _this.isCompare)
                        .classed('flex-column', _this.isCompare);
                    li.select('.legend-description')
                        .insert('span')
                        .attr('class', 'legend-label')
                        .html((/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) {
                        switch (_this.legendLabelFormatType) {
                            case 'number':
                                return _this.legendLabelFormat(d.label);
                            case 'time':
                                /** @type {?} */
                                var parsedTime = d3.isoParse(d.label);
                                return _this.legendLabelFormat(parsedTime);
                            default:
                                return d.label;
                        }
                    }));
                    li.select('.legend-description')
                        .insert('div')
                        .attr('class', 'legend-change')
                        .classed('d-none', !_this.isCompare);
                    li.select('.legend-change').html((/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) {
                        return "<div class=\"metric-block-indicator " + d.compareChangeDirection + " " + (d.compareChangeInverse ? 'inverse' : '') + " mt-1\"><span>" + _this.tooltipCompareChangeFormat(d.compareChangeValue) + "</span></div>";
                    }));
                    return li;
                }), (/**
                 * @param {?} update
                 * @return {?}
                 */
                function (update) {
                    update.classed('align-items-start', _this.isCompare);
                    update.select('.legend-key').classed('mt-1', _this.isCompare);
                    update.select('.legend-change').classed('d-none', !_this.isCompare);
                    if (_this.isCompare) {
                        update.select('.legend-change').html((/**
                         * @param {?} d
                         * @return {?}
                         */
                        function (d) {
                            return "<div class=\"metric-block-indicator " + d.compareChangeDirection + " " + (d.compareChangeInverse ? 'inverse' : '') + " mt-1\"><span>" + _this.tooltipCompareChangeFormat(d.compareChangeValue) + "</span></div>";
                        }));
                    }
                    update.select('.legend-label').html((/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) {
                        switch (_this.legendLabelFormatType) {
                            case 'number':
                                return _this.legendLabelFormat(d.label);
                            case 'time':
                                /** @type {?} */
                                var parsedTime = d3.isoParse(d.label);
                                return _this.legendLabelFormat(parsedTime);
                            default:
                                return d.label;
                        }
                    }));
                    return update;
                }), (/**
                 * @param {?} exit
                 * @return {?}
                 */
                function (exit) { return exit.remove(); }))
                    .on('mouseover', (/**
                 * @param {?} data
                 * @param {?} index
                 * @param {?} nodes
                 * @return {?}
                 */
                function (data, index, nodes) { return _this.legendMouseOver(d3.event, data, index, nodes); }))
                    .on('mouseout', (/**
                 * @return {?}
                 */
                function () { return _this.legendMouseOut(); }))
                    .on('click', (/**
                 * @param {?} data
                 * @param {?} index
                 * @param {?} nodes
                 * @return {?}
                 */
                function (data, index, nodes) { return _this.legendMouseClick(d3.event, data, index, nodes); }));
            }
        };
        PbdsDatavizBarSingleHorizontalComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pbds-dataviz-bar-single-horizontal',
                        template: "",
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        PbdsDatavizBarSingleHorizontalComponent.ctorParameters = function () { return [
            { type: PbdsDatavizService },
            { type: core.ElementRef },
            { type: common.ViewportScroller },
            { type: common.Location }
        ]; };
        PbdsDatavizBarSingleHorizontalComponent.propDecorators = {
            chartClass: [{ type: core.HostBinding, args: ['class.pbds-chart',] }],
            singleStackedBarClass: [{ type: core.HostBinding, args: ['class.pbds-chart-bar-single-horizontal',] }],
            data: [{ type: core.Input }],
            width: [{ type: core.Input }],
            height: [{ type: core.Input }],
            nullValueText: [{ type: core.Input }],
            percentage: [{ type: core.Input }],
            marginTop: [{ type: core.Input }],
            marginRight: [{ type: core.Input }],
            marginBottom: [{ type: core.Input }],
            marginLeft: [{ type: core.Input }],
            barMargin: [{ type: core.Input }],
            hideXAxis: [{ type: core.Input }],
            xAxisTicks: [{ type: core.Input }],
            xAxisTitle: [{ type: core.Input }],
            xAxisFormatType: [{ type: core.Input }],
            xAxisFormatString: [{ type: core.Input }],
            xAxisTickLabelSuffix: [{ type: core.Input }],
            hideXGrid: [{ type: core.Input }],
            hideLegend: [{ type: core.Input }],
            hideLegendTooltip: [{ type: core.Input }],
            legendWidth: [{ type: core.Input }],
            legendPosition: [{ type: core.Input }],
            legendLabelFormatType: [{ type: core.Input }],
            legendLabelFormatString: [{ type: core.Input }],
            hideTooltip: [{ type: core.Input }],
            tooltipLabelFormatType: [{ type: core.Input }],
            tooltipLabelFormatString: [{ type: core.Input }],
            tooltipDateFormatString: [{ type: core.Input }],
            tooltipValueFormatType: [{ type: core.Input }],
            tooltipValueFormatString: [{ type: core.Input }],
            tooltipValueSuffix: [{ type: core.Input }],
            tooltipPercentFormatString: [{ type: core.Input }],
            compareChangeFormatString: [{ type: core.Input }],
            monochrome: [{ type: core.Input }],
            theme: [{ type: core.Input }],
            hovered: [{ type: core.Output }],
            clicked: [{ type: core.Output }]
        };
        return PbdsDatavizBarSingleHorizontalComponent;
    }());
    if (false) {
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.chartClass;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.singleStackedBarClass;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.data;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.width;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.height;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.nullValueText;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.percentage;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.marginTop;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.marginRight;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.marginBottom;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.marginLeft;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.barMargin;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.hideXAxis;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.xAxisTicks;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.xAxisTitle;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.xAxisFormatType;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.xAxisFormatString;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.xAxisTickLabelSuffix;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.hideXGrid;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.hideLegend;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.hideLegendTooltip;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.legendWidth;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.legendPosition;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.legendLabelFormatType;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.legendLabelFormatString;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.hideTooltip;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.tooltipLabelFormatType;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.tooltipLabelFormatString;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.tooltipDateFormatString;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.tooltipValueFormatType;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.tooltipValueFormatString;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.tooltipValueSuffix;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.tooltipPercentFormatString;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.compareChangeFormatString;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.monochrome;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.theme;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.hovered;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.clicked;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype.isSingleData;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype.isCompare;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype.chart;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype.svg;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype.margin;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype.colorRange;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype.barPadding;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype.xAxisCall;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype.xAxis;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype.xAxisScale;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype.xAxisTickSize;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype.xAxisTickSizeOuter;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype.xAxisFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype.xAxisTitleMargin;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype.hideXAxisDomain;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype.hideXAxisZero;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype.hideXAxisTicks;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype.xGrid;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype.xGridCall;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype.legendLabelFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype.tooltip;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype.tooltipLabelFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype.tooltipValueFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype.tooltipDateFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype.tooltipPercentFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype.tooltipCompareChangeFormat;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.barMouseOver;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.barMouseOut;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.barMouseClick;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype.tooltipShow;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype.tooltipHide;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.legendMouseOver;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.legendMouseOut;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalComponent.prototype.legendMouseClick;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype.xAxisFormatter;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype._dataviz;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype._element;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype._scroll;
        /**
         * @type {?}
         * @private
         */
        PbdsDatavizBarSingleHorizontalComponent.prototype._location;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PbdsDatavizModule = /** @class */ (function () {
        function PbdsDatavizModule() {
        }
        PbdsDatavizModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            PbdsDatavizPieComponent,
                            PbdsDatavizBarComponent,
                            PbdsDatavizLineComponent,
                            PbdsDatavizGaugeComponent,
                            PbdsDatavizSparklineComponent,
                            PbdsDatavizBarStackedComponent,
                            PbdsDatavizMetricBlockComponent,
                            DatavizBubbleMapComponent,
                            PbdsDatavizMetricIndicatorComponent,
                            PbdsDatavizHeatmapComponent,
                            PbdsDatavizChoroplethMapComponent,
                            PbdsDatavizBarGroupedComponent,
                            PbdsDatavizBarSingleHorizontalComponent
                        ],
                        imports: [common.CommonModule, ngBootstrap.NgbTooltipModule],
                        exports: [
                            PbdsDatavizPieComponent,
                            PbdsDatavizBarComponent,
                            PbdsDatavizLineComponent,
                            PbdsDatavizGaugeComponent,
                            PbdsDatavizSparklineComponent,
                            PbdsDatavizBarStackedComponent,
                            PbdsDatavizMetricBlockComponent,
                            DatavizBubbleMapComponent,
                            PbdsDatavizMetricIndicatorComponent,
                            PbdsDatavizHeatmapComponent,
                            PbdsDatavizChoroplethMapComponent,
                            PbdsDatavizBarGroupedComponent,
                            PbdsDatavizBarSingleHorizontalComponent
                        ]
                    },] }
        ];
        return PbdsDatavizModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function PbdsDatavizPie() { }
    if (false) {
        /** @type {?} */
        PbdsDatavizPie.prototype.label;
        /** @type {?} */
        PbdsDatavizPie.prototype.value;
    }
    /**
     * @record
     */
    function PbdsDatavizBar() { }
    if (false) {
        /** @type {?} */
        PbdsDatavizBar.prototype.label;
        /** @type {?} */
        PbdsDatavizBar.prototype.value;
    }
    /**
     * @record
     */
    function PbdsDatavizGauge() { }
    if (false) {
        /** @type {?} */
        PbdsDatavizGauge.prototype.minvalue;
        /** @type {?} */
        PbdsDatavizGauge.prototype.maxvalue;
        /** @type {?} */
        PbdsDatavizGauge.prototype.value;
    }
    /**
     * @record
     */
    function PbdsDatavizSparkline() { }
    if (false) {
        /** @type {?} */
        PbdsDatavizSparkline.prototype.length;
        /* Skipping unhandled member: [index: number]: number;*/
    }
    /**
     * @record
     */
    function PbdsDatavizLine() { }
    if (false) {
        /** @type {?} */
        PbdsDatavizLine.prototype.dates;
        /** @type {?} */
        PbdsDatavizLine.prototype.series;
    }
    /**
     * @record
     */
    function PbdsDatavizLineSeries() { }
    if (false) {
        /** @type {?} */
        PbdsDatavizLineSeries.prototype.label;
        /** @type {?} */
        PbdsDatavizLineSeries.prototype.values;
    }
    /**
     * @record
     */
    function PbdsDatavizBarStacked() { }
    if (false) {
        /** @type {?} */
        PbdsDatavizBarStacked.prototype.key;
        /* Skipping unhandled member: [propName: string]: any;*/
    }
    /**
     * @record
     */
    function PbdsDatavizMapData() { }
    if (false) {
        /** @type {?} */
        PbdsDatavizMapData.prototype.label;
        /** @type {?} */
        PbdsDatavizMapData.prototype.longitude;
        /** @type {?} */
        PbdsDatavizMapData.prototype.latitude;
        /** @type {?} */
        PbdsDatavizMapData.prototype.value;
        /* Skipping unhandled member: [propName: string]: any;*/
    }
    /**
     * @record
     */
    function PbdsDatavizChoroplethMapData() { }
    if (false) {
        /** @type {?} */
        PbdsDatavizChoroplethMapData.prototype.id;
        /** @type {?} */
        PbdsDatavizChoroplethMapData.prototype.value;
        /** @type {?|undefined} */
        PbdsDatavizChoroplethMapData.prototype.label;
        /* Skipping unhandled member: [propName: string]: any;*/
    }
    /**
     * @record
     */
    function PbdsDatavizHeatmap() { }
    if (false) {
        /** @type {?} */
        PbdsDatavizHeatmap.prototype.yLabel;
        /** @type {?} */
        PbdsDatavizHeatmap.prototype.xLabel;
        /** @type {?} */
        PbdsDatavizHeatmap.prototype.value;
    }
    /**
     * @record
     */
    function PbdsDatavizBarGrouped() { }
    if (false) {
        /** @type {?} */
        PbdsDatavizBarGrouped.prototype.key;
        /* Skipping unhandled member: [propName: string]: any;*/
    }
    /**
     * @record
     */
    function PbdsDatavizBarSingleHorizontal() { }
    if (false) {
        /** @type {?} */
        PbdsDatavizBarSingleHorizontal.prototype.label;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontal.prototype.value;
        /** @type {?|undefined} */
        PbdsDatavizBarSingleHorizontal.prototype.startDate;
        /** @type {?|undefined} */
        PbdsDatavizBarSingleHorizontal.prototype.endDate;
    }
    /**
     * @record
     */
    function PbdsDatavizBarSingleHorizontalCompare() { }
    if (false) {
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalCompare.prototype.label;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalCompare.prototype.value;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalCompare.prototype.startDate;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalCompare.prototype.endDate;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalCompare.prototype.compareValue;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalCompare.prototype.compareStartDate;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalCompare.prototype.compareEndDate;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalCompare.prototype.compareChangeValue;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalCompare.prototype.compareChangeDirection;
        /** @type {?} */
        PbdsDatavizBarSingleHorizontalCompare.prototype.compareChangeInverse;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PbdsHeaderShadowDirective = /** @class */ (function () {
        function PbdsHeaderShadowDirective(_scroll) {
            this._scroll = _scroll;
        }
        /**
         * @return {?}
         */
        PbdsHeaderShadowDirective.prototype.onWindowScroll = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var offset = this._scroll.getScrollPosition();
            this.shadow = offset[1] > 20;
        };
        PbdsHeaderShadowDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'header.bg-brand-header'
                    },] }
        ];
        /** @nocollapse */
        PbdsHeaderShadowDirective.ctorParameters = function () { return [
            { type: common.ViewportScroller }
        ]; };
        PbdsHeaderShadowDirective.propDecorators = {
            shadow: [{ type: core.HostBinding, args: ['class.pbds-header-shadow',] }],
            onWindowScroll: [{ type: core.HostListener, args: ['window:scroll', [],] }]
        };
        return PbdsHeaderShadowDirective;
    }());
    if (false) {
        /** @type {?} */
        PbdsHeaderShadowDirective.prototype.shadow;
        /**
         * @type {?}
         * @private
         */
        PbdsHeaderShadowDirective.prototype._scroll;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PbdsHeaderShadowModule = /** @class */ (function () {
        function PbdsHeaderShadowModule() {
        }
        PbdsHeaderShadowModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [PbdsHeaderShadowDirective],
                        imports: [common.CommonModule],
                        exports: [PbdsHeaderShadowDirective]
                    },] }
        ];
        return PbdsHeaderShadowModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PbdsDaterangeService = /** @class */ (function () {
        function PbdsDaterangeService(localeId) {
            this.localeId = localeId;
            this.locale = this.localeId.toLowerCase();
        }
        /**
         * @param {?} locale
         * @return {?}
         */
        PbdsDaterangeService.prototype.setLocale = /**
         * @param {?} locale
         * @return {?}
         */
        function (locale) {
            this.locale = (locale.language + "-" + locale.country).toLowerCase();
            // set the angular LOCALE_ID dynamically for ng-bootstrap datepicker
            common.registerLocaleData(locale.locale, this.locale);
        };
        /**
         * @return {?}
         */
        PbdsDaterangeService.prototype.getCurrentLocale = /**
         * @return {?}
         */
        function () {
            return this.locale;
        };
        PbdsDaterangeService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        PbdsDaterangeService.ctorParameters = function () { return [
            { type: String, decorators: [{ type: core.Inject, args: [core.LOCALE_ID,] }] }
        ]; };
        /** @nocollapse */ PbdsDaterangeService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function PbdsDaterangeService_Factory() { return new PbdsDaterangeService(core.ɵɵinject(core.LOCALE_ID)); }, token: PbdsDaterangeService, providedIn: "root" });
        return PbdsDaterangeService;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        PbdsDaterangeService.prototype.locale;
        /**
         * @type {?}
         * @private
         */
        PbdsDaterangeService.prototype.localeId;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // Define custom service providing the months and weekdays translations
    var CustomDatepickerI18n = /** @class */ (function (_super) {
        __extends(CustomDatepickerI18n, _super);
        function CustomDatepickerI18n(daterangeService) {
            var _this = _super.call(this) || this;
            _this.daterangeService = daterangeService;
            return _this;
        }
        /**
         * @param {?} weekday
         * @return {?}
         */
        CustomDatepickerI18n.prototype.getWeekdayShortName = /**
         * @param {?} weekday
         * @return {?}
         */
        function (weekday) {
            // for ng-bootstrap, sunday number of 7 converted to 0
            weekday = weekday === 7 ? 0 : weekday;
            // console.log(
            //   'weekday: ',
            //   this.daterangeService.getCurrentLocale(),
            //   weekday,
            //   getLocaleDayNames(this.daterangeService.getCurrentLocale(), FormStyle.Standalone, TranslationWidth.Abbreviated)[weekday]
            // );
            return common.getLocaleDayNames(this.daterangeService.getCurrentLocale(), common.FormStyle.Standalone, common.TranslationWidth.Abbreviated)[weekday];
        };
        /**
         * @param {?} month
         * @return {?}
         */
        CustomDatepickerI18n.prototype.getMonthShortName = /**
         * @param {?} month
         * @return {?}
         */
        function (month) {
            return common.getLocaleMonthNames(this.daterangeService.getCurrentLocale(), common.FormStyle.Standalone, common.TranslationWidth.Wide)[month - 1];
        };
        /**
         * @param {?} month
         * @return {?}
         */
        CustomDatepickerI18n.prototype.getMonthFullName = /**
         * @param {?} month
         * @return {?}
         */
        function (month) {
            return common.getLocaleMonthNames(this.daterangeService.getCurrentLocale(), common.FormStyle.Standalone, common.TranslationWidth.Wide)[month - 1];
        };
        /**
         * @param {?} date
         * @return {?}
         */
        CustomDatepickerI18n.prototype.getDayAriaLabel = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return date.day + "-" + date.month + "-" + date.year;
        };
        CustomDatepickerI18n.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        CustomDatepickerI18n.ctorParameters = function () { return [
            { type: PbdsDaterangeService }
        ]; };
        return CustomDatepickerI18n;
    }(ngBootstrap.NgbDatepickerI18n));
    if (false) {
        /** @type {?} */
        CustomDatepickerI18n.prototype.daterangeService;
    }
    var PbdsDaterangePopoverComponent = /** @class */ (function () {
        function PbdsDaterangePopoverComponent(calendar, daterangeService) {
            var _this = this;
            this.calendar = calendar;
            this.daterangeService = daterangeService;
            this.presets = [
                {
                    label: 'All Dates',
                    value: null
                },
                {
                    label: 'Last 7 Days',
                    value: 7
                },
                {
                    label: 'Last 30 Days',
                    value: 30
                },
                {
                    label: 'Year to Date',
                    value: 365
                }
            ];
            this.presetSelected = null;
            this.filterSelected = 0;
            this.showCustomPreset = true;
            this.applyText = 'Apply';
            this.cancelText = 'Cancel';
            this.customRangeText = 'Custom Range';
            this.minDate = this.calendar.getPrev(this.calendar.getToday(), 'y');
            this.maxDate = this.calendar.getToday();
            this.fromDate = null;
            this.toDate = null;
            this.inputFormat = '{fromDate} to {toDate}';
            this.change = new core.EventEmitter();
            this.firstDayOfWeek = common.getLocaleFirstDayOfWeek(this.daterangeService.getCurrentLocale());
            this.dateRange = '';
            this.isDatepickerVisible = false;
            this.presetSelect = (/**
             * @param {?} $event
             * @return {?}
             */
            function ($event) {
                if ($event.value === 'custom') {
                    _this.presetSelected = 'custom';
                    return false;
                }
                if ($event.value) {
                    _this.toDate = _this.calendar.getToday();
                    _this.fromDate = _this.calendar.getPrev(_this.toDate, 'd', $event.value);
                    _this.presetSelected = $event.value;
                }
                else {
                    _this.fromDate = null;
                    _this.toDate = null;
                    _this.presetSelected = null;
                }
                _this.isDatepickerVisible = false;
            });
            this.isHovered = (/**
             * @param {?} date
             * @return {?}
             */
            function (date) {
                return _this.fromDate && !_this.toDate && _this.hoveredDate && date.after(_this.fromDate) && date.before(_this.hoveredDate);
            });
            this.isInside = (/**
             * @param {?} date
             * @return {?}
             */
            function (date) { return date.after(_this.fromDate) && date.before(_this.toDate); });
            this.isRange = (/**
             * @param {?} date
             * @return {?}
             */
            function (date) {
                return date.equals(_this.fromDate) || date.equals(_this.toDate) || _this.isInside(date) || _this.isHovered(date);
            });
        }
        /**
         * @return {?}
         */
        PbdsDaterangePopoverComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            // china should start on a Monday, Angular locale returns incorrect 0
            this.firstDayOfWeek =
                this.daterangeService.getCurrentLocale() === 'zh-cn' ? this.firstDayOfWeek + 1 : this.firstDayOfWeek;
            if (this.presetSelected === 'custom') {
                this.showDatepicker();
            }
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        PbdsDaterangePopoverComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var _this = this;
            if (changes.filters && this.filters) {
                this.selectedFilter = this.filters[this.filterSelected];
            }
            if (changes.presets) {
                if (!this.filters && this.presetSelected) {
                    this.presetClick(this.presets.find((/**
                     * @param {?} p
                     * @return {?}
                     */
                    function (p) { return p.value === _this.presetSelected; })));
                }
                else if (this.presetSelected) {
                    this.presetSelect({ value: this.presetSelected });
                    this.apply();
                }
            }
            // if (changes.toText && changes.toText.firstChange === false) {
            //   this.setInputLabel();
            // }
            this.setInputLabel();
        };
        /**
         * @return {?}
         */
        PbdsDaterangePopoverComponent.prototype.apply = /**
         * @return {?}
         */
        function () {
            this.setInputLabel();
            this.change.emit({
                fromDate: this.fromDate,
                toDate: this.toDate,
                formattedDate: this.isDatepickerVisible ? this.dateFormat() : this.dateRange,
                filter: this.filters ? this.selectedFilter.field : null,
                value: this.presetSelected
            });
            this.datepickerPopup.close();
        };
        /**
         * @return {?}
         */
        PbdsDaterangePopoverComponent.prototype.cancel = /**
         * @return {?}
         */
        function () {
            this.datepickerPopup.close();
        };
        /**
         * @param {?} date
         * @return {?}
         */
        PbdsDaterangePopoverComponent.prototype.onDateSelection = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            if (!this.fromDate && !this.toDate) {
                this.fromDate = date;
            }
            else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
                this.toDate = date;
            }
            else {
                this.toDate = null;
                this.fromDate = date;
            }
            // this.presetSelected = null;
        };
        /**
         * @param {?} preset
         * @return {?}
         */
        PbdsDaterangePopoverComponent.prototype.presetClick = /**
         * @param {?} preset
         * @return {?}
         */
        function (preset) {
            // console.log('PRESET CLICK: ', preset);
            if (preset) {
                if (preset.value === 'custom') {
                    return false;
                }
                if (preset.value) {
                    this.toDate = this.calendar.getToday();
                    this.fromDate = this.calendar.getPrev(this.toDate, 'd', preset.value);
                    this.presetSelected = preset.value;
                }
                else {
                    this.fromDate = null;
                    this.toDate = null;
                    this.presetSelected = null;
                }
                this.isDatepickerVisible = false;
                this.apply();
            }
        };
        /**
         * @private
         * @param {?} date
         * @return {?}
         */
        PbdsDaterangePopoverComponent.prototype.getFormattedDate = /**
         * @private
         * @param {?} date
         * @return {?}
         */
        function (date) {
            if (date) {
                /** @type {?} */
                var locale = this.daterangeService.getCurrentLocale();
                /** @type {?} */
                var dateFormat = common.getLocaleDateFormat(locale, common.FormatWidth.Short);
                /** @type {?} */
                var formattedDate = common.formatDate(date.month + "/" + date.day + "/" + date.year, dateFormat, locale);
                return formattedDate;
            }
        };
        /**
         * @return {?}
         */
        PbdsDaterangePopoverComponent.prototype.showDatepicker = /**
         * @return {?}
         */
        function () {
            this.isDatepickerVisible = true;
            this.presetSelect({ value: 'custom' });
        };
        /**
         * @param {?} filter
         * @param {?} index
         * @return {?}
         */
        PbdsDaterangePopoverComponent.prototype.onFilterChange = /**
         * @param {?} filter
         * @param {?} index
         * @return {?}
         */
        function (filter, index) {
            this.selectedFilter = this.filters[index];
        };
        /**
         * @param {?} value
         * @return {?}
         */
        PbdsDaterangePopoverComponent.prototype.setPreset = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.presetSelected = value;
            this.presetSelect({ value: this.presetSelected });
            this.apply();
        };
        /**
         * @param {?} index
         * @return {?}
         */
        PbdsDaterangePopoverComponent.prototype.setFilter = /**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            if (this.filters !== undefined) {
                this.selectedFilter = this.filters[index];
            }
        };
        /**
         * @param {?} value
         * @return {?}
         */
        PbdsDaterangePopoverComponent.prototype.setDateRange = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.fromDate = new ngBootstrap.NgbDate(value.fromDate.year, value.fromDate.month, value.fromDate.day);
            this.toDate = new ngBootstrap.NgbDate(value.toDate.year, value.toDate.month, value.toDate.day);
            this.isDatepickerVisible = value.value === 'custom';
            this.presetSelected = value.value;
            if (this.filters) {
                this.filterSelected = this.filters.findIndex((/**
                 * @param {?} f
                 * @return {?}
                 */
                function (f) { return f.field === value.filter; }));
                this.selectedFilter = this.filters[this.filterSelected];
            }
            this.apply();
        };
        /**
         * @private
         * @return {?}
         */
        PbdsDaterangePopoverComponent.prototype.setInputLabel = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.presets) {
                /** @type {?} */
                var selected = this.presets.find((/**
                 * @param {?} p
                 * @return {?}
                 */
                function (p) { return p.value === _this.presetSelected; }));
                if (selected) {
                    if (this.fromDate === null || this.toDate === null) {
                        this.dateRange = selected.label;
                    }
                    else if (this.presetSelected === null || (this.presetSelected !== null && this.presetSelected !== 'custom')) {
                        this.dateRange = selected.label;
                    }
                    else {
                        this.dateRange = this.dateFormat();
                    }
                }
                else if (this.presetSelected === 'custom' && this.fromDate && this.toDate) {
                    this.dateRange = this.dateFormat();
                }
            }
        };
        /**
         * @private
         * @return {?}
         */
        PbdsDaterangePopoverComponent.prototype.dateFormat = /**
         * @private
         * @return {?}
         */
        function () {
            return this.inputFormat
                .replace('{fromDate}', this.getFormattedDate(this.fromDate))
                .replace('{toDate}', this.getFormattedDate(this.toDate));
        };
        PbdsDaterangePopoverComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pbds-daterange-popover',
                        template: "<div class=\"input-group pbds-daterange-popover\">\n  <input\n    type=\"text\"\n    class=\"form-control\"\n    aria-describedby=\"daterange-button\"\n    [value]=\"dateRange\"\n    readonly=\"readonly\"\n    tabindex=\"-1\"\n  />\n\n  <div class=\"input-group-append\">\n    <button\n      class=\"btn btn-secondary\"\n      type=\"button\"\n      id=\"daterange-button\"\n      #datepickerPopup=\"ngbPopover\"\n      [ngbPopover]=\"daterangeContent\"\n      popoverClass=\"daterange-popover\"\n      autoClose=\"outside\"\n      container=\"body\"\n      placement=\"bottom-right auto\"\n      aria-label=\"Open Daterange Picker\"\n    >\n      <i class=\"pbi-icon-mini pbi-calendar\" aria-hidden=\"true\"></i>\n    </button>\n  </div>\n\n  <ng-template #daterangeContent>\n    <div>\n      <div class=\"d-block d-md-flex\">\n        <div *ngIf=\"isDatepickerVisible\">\n          <ngb-datepicker\n            #datepicker\n            [displayMonths]=\"'2'\"\n            [minDate]=\"minDate\"\n            [maxDate]=\"maxDate\"\n            navigation=\"select\"\n            outsideDays=\"hidden\"\n            [firstDayOfWeek]=\"firstDayOfWeek\"\n            [showWeekdays]=\"true\"\n            [dayTemplate]=\"t\"\n            (select)=\"onDateSelection($event)\"\n          >\n          </ngb-datepicker>\n          <!--  -->\n\n          <ng-template #t let-date let-focused=\"focused\">\n            <span\n              class=\"custom-day\"\n              [class.focused]=\"focused\"\n              [class.range]=\"isRange(date)\"\n              [class.faded]=\"isHovered(date) || isInside(date)\"\n              (mouseenter)=\"hoveredDate = date\"\n              (mouseleave)=\"hoveredDate = null\"\n            >\n              {{ date.day }}\n            </span>\n          </ng-template>\n        </div>\n\n        <div\n          class=\"d-flex flex-column justify-content-lg-between mt-md-0\"\n          [ngClass]=\"{ 'ml-md-4': isDatepickerVisible }\"\n        >\n          <!-- filters -->\n          <div *ngIf=\"filters\" class=\"mb-3\" ngbDropdown>\n            <button class=\"btn btn-sm btn-secondary btn-block\" id=\"dateFilter\" ngbDropdownToggle>\n              {{ selectedFilter.label }}\n            </button>\n            <div ngbDropdownMenu aria-labelledby=\"dateFilter\">\n              <button\n                class=\"dropdown-item\"\n                type=\"button\"\n                *ngFor=\"let filter of filters; let index = index\"\n                (click)=\"onFilterChange(filter, index)\"\n              >\n                {{ filter.label }}\n              </button>\n            </div>\n          </div>\n\n          <!-- presets radio buttons-->\n          <div *ngIf=\"presets && filters\" class=\"flex-grow-1\">\n            <mat-radio-group\n              aria-label=\"Select an option\"\n              class=\"stacked-radio-group\"\n              name=\"presets\"\n              [(ngModel)]=\"presetSelected\"\n              (change)=\"presetSelect($event)\"\n            >\n              <mat-radio-button *ngFor=\"let preset of presets\" [value]=\"preset.value\">{{\n                preset.label\n              }}</mat-radio-button>\n\n              <mat-radio-button *ngIf=\"showCustomPreset\" [value]=\"'custom'\" (change)=\"showDatepicker()\">{{\n                customRangeText\n              }}</mat-radio-button>\n            </mat-radio-group>\n          </div>\n\n          <!-- presets buttons-->\n          <div *ngIf=\"presets && !filters\" class=\"flex-grow-1\">\n            <button\n              type=\"button\"\n              class=\"btn btn-secondary btn-block btn-sm text-nowrap\"\n              *ngFor=\"let preset of presets\"\n              (click)=\"presetClick(preset)\"\n            >\n              {{ preset.label }}\n            </button>\n\n            <button\n              type=\"button\"\n              class=\"btn btn-secondary btn-block btn-sm text-nowrap\"\n              *ngIf=\"showCustomPreset\"\n              (click)=\"showDatepicker()\"\n            >\n              {{ customRangeText }}\n            </button>\n          </div>\n\n          <!-- buttons -->\n          <div *ngIf=\"filters || isDatepickerVisible\" class=\"d-flex justify-content-between mt-3\">\n            <button class=\"btn btn-primary btn-sm mr-1\" type=\"button\" (click)=\"apply()\">{{ applyText }}</button>\n            <button class=\"btn btn-secondary btn-sm ml-1\" type=\"button\" (click)=\"cancel()\">\n              {{ cancelText }}\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </ng-template>\n</div>\n",
                        providers: [{ provide: ngBootstrap.NgbDatepickerI18n, useClass: CustomDatepickerI18n }]
                    }] }
        ];
        /** @nocollapse */
        PbdsDaterangePopoverComponent.ctorParameters = function () { return [
            { type: ngBootstrap.NgbCalendar },
            { type: PbdsDaterangeService }
        ]; };
        PbdsDaterangePopoverComponent.propDecorators = {
            datepickerPopup: [{ type: core.ViewChild, args: ['datepickerPopup', { static: true },] }],
            presets: [{ type: core.Input }],
            presetSelected: [{ type: core.Input }],
            filters: [{ type: core.Input }],
            filterSelected: [{ type: core.Input }],
            showCustomPreset: [{ type: core.Input }],
            applyText: [{ type: core.Input }],
            cancelText: [{ type: core.Input }],
            customRangeText: [{ type: core.Input }],
            minDate: [{ type: core.Input }],
            maxDate: [{ type: core.Input }],
            fromDate: [{ type: core.Input }],
            toDate: [{ type: core.Input }],
            inputFormat: [{ type: core.Input }],
            change: [{ type: core.Output }]
        };
        return PbdsDaterangePopoverComponent;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        PbdsDaterangePopoverComponent.prototype.datepickerPopup;
        /** @type {?} */
        PbdsDaterangePopoverComponent.prototype.presets;
        /** @type {?} */
        PbdsDaterangePopoverComponent.prototype.presetSelected;
        /** @type {?} */
        PbdsDaterangePopoverComponent.prototype.filters;
        /** @type {?} */
        PbdsDaterangePopoverComponent.prototype.filterSelected;
        /** @type {?} */
        PbdsDaterangePopoverComponent.prototype.showCustomPreset;
        /** @type {?} */
        PbdsDaterangePopoverComponent.prototype.applyText;
        /** @type {?} */
        PbdsDaterangePopoverComponent.prototype.cancelText;
        /** @type {?} */
        PbdsDaterangePopoverComponent.prototype.customRangeText;
        /** @type {?} */
        PbdsDaterangePopoverComponent.prototype.minDate;
        /** @type {?} */
        PbdsDaterangePopoverComponent.prototype.maxDate;
        /** @type {?} */
        PbdsDaterangePopoverComponent.prototype.fromDate;
        /** @type {?} */
        PbdsDaterangePopoverComponent.prototype.toDate;
        /** @type {?} */
        PbdsDaterangePopoverComponent.prototype.inputFormat;
        /**
         * @type {?}
         * @private
         */
        PbdsDaterangePopoverComponent.prototype.change;
        /** @type {?} */
        PbdsDaterangePopoverComponent.prototype.firstDayOfWeek;
        /** @type {?} */
        PbdsDaterangePopoverComponent.prototype.hoveredDate;
        /** @type {?} */
        PbdsDaterangePopoverComponent.prototype.dateRange;
        /** @type {?} */
        PbdsDaterangePopoverComponent.prototype.isDatepickerVisible;
        /** @type {?} */
        PbdsDaterangePopoverComponent.prototype.selectedFilter;
        /** @type {?} */
        PbdsDaterangePopoverComponent.prototype.presetSelect;
        /** @type {?} */
        PbdsDaterangePopoverComponent.prototype.isHovered;
        /** @type {?} */
        PbdsDaterangePopoverComponent.prototype.isInside;
        /** @type {?} */
        PbdsDaterangePopoverComponent.prototype.isRange;
        /**
         * @type {?}
         * @private
         */
        PbdsDaterangePopoverComponent.prototype.calendar;
        /**
         * @type {?}
         * @private
         */
        PbdsDaterangePopoverComponent.prototype.daterangeService;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PbdsDaterangePopoverModule = /** @class */ (function () {
        function PbdsDaterangePopoverModule() {
        }
        PbdsDaterangePopoverModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [PbdsDaterangePopoverComponent],
                        imports: [common.CommonModule, forms.FormsModule, radio.MatRadioModule, ngBootstrap.NgbDatepickerModule, ngBootstrap.NgbPopoverModule, ngBootstrap.NgbDropdownModule],
                        exports: [PbdsDaterangePopoverComponent]
                    },] }
        ];
        return PbdsDaterangePopoverModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function PbdsDaterangePreset() { }
    if (false) {
        /** @type {?} */
        PbdsDaterangePreset.prototype.label;
        /** @type {?} */
        PbdsDaterangePreset.prototype.value;
    }
    /**
     * @record
     */
    function PbdsDaterangeFilter() { }
    if (false) {
        /** @type {?} */
        PbdsDaterangeFilter.prototype.field;
        /** @type {?} */
        PbdsDaterangeFilter.prototype.label;
    }
    /**
     * @record
     */
    function PbdsDaterangeChange() { }
    if (false) {
        /** @type {?} */
        PbdsDaterangeChange.prototype.fromDate;
        /** @type {?} */
        PbdsDaterangeChange.prototype.toDate;
        /** @type {?} */
        PbdsDaterangeChange.prototype.formattedDate;
        /** @type {?} */
        PbdsDaterangeChange.prototype.filter;
        /** @type {?} */
        PbdsDaterangeChange.prototype.value;
    }
    /**
     * @record
     */
    function PbdsDaterangeLocale() { }
    if (false) {
        /** @type {?} */
        PbdsDaterangeLocale.prototype.language;
        /** @type {?} */
        PbdsDaterangeLocale.prototype.country;
        /** @type {?} */
        PbdsDaterangeLocale.prototype.locale;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PbdsProgressSpinnerComponent = /** @class */ (function () {
        function PbdsProgressSpinnerComponent() {
        }
        PbdsProgressSpinnerComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pbds-progress-spinner',
                        template: "\n    <span role=\"alert\" aria-live=\"assertive\">\n      <span\n        class=\"sbl-circ\"\n        [style.width.px]=\"size\"\n        [style.height.px]=\"size\"\n        [style.border-width.px]=\"size / 8\"\n        aria-hidden=\"true\"\n      ></span>\n      <span class=\"sr-only\">Loading</span>\n    </span>\n  ",
                        styles: [".sbl-circ{height:48px;width:48px;color:var(--primary);position:relative;display:inline-block;border-width:6px;border-style:solid;border-radius:50%;border-top-color:transparent;-webkit-animation:1.5s linear infinite rotate;animation:1.5s linear infinite rotate}@-webkit-keyframes rotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}"]
                    }] }
        ];
        PbdsProgressSpinnerComponent.propDecorators = {
            size: [{ type: core.Input }]
        };
        return PbdsProgressSpinnerComponent;
    }());
    if (false) {
        /** @type {?} */
        PbdsProgressSpinnerComponent.prototype.size;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PbdsProgressSpinnerModule = /** @class */ (function () {
        function PbdsProgressSpinnerModule() {
        }
        PbdsProgressSpinnerModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [PbdsProgressSpinnerComponent],
                        imports: [common.CommonModule],
                        exports: [PbdsProgressSpinnerComponent]
                    },] }
        ];
        return PbdsProgressSpinnerModule;
    }());

    exports.CustomDatepickerI18n = CustomDatepickerI18n;
    exports.DatavizBubbleMapComponent = DatavizBubbleMapComponent;
    exports.PbdsDatavizBarComponent = PbdsDatavizBarComponent;
    exports.PbdsDatavizBarGroupedComponent = PbdsDatavizBarGroupedComponent;
    exports.PbdsDatavizBarSingleHorizontalComponent = PbdsDatavizBarSingleHorizontalComponent;
    exports.PbdsDatavizBarStackedComponent = PbdsDatavizBarStackedComponent;
    exports.PbdsDatavizChoroplethMapComponent = PbdsDatavizChoroplethMapComponent;
    exports.PbdsDatavizGaugeComponent = PbdsDatavizGaugeComponent;
    exports.PbdsDatavizHeatmapComponent = PbdsDatavizHeatmapComponent;
    exports.PbdsDatavizLineComponent = PbdsDatavizLineComponent;
    exports.PbdsDatavizMetricBlockComponent = PbdsDatavizMetricBlockComponent;
    exports.PbdsDatavizMetricIndicatorComponent = PbdsDatavizMetricIndicatorComponent;
    exports.PbdsDatavizModule = PbdsDatavizModule;
    exports.PbdsDatavizPieComponent = PbdsDatavizPieComponent;
    exports.PbdsDatavizService = PbdsDatavizService;
    exports.PbdsDatavizSparklineComponent = PbdsDatavizSparklineComponent;
    exports.PbdsDaterangePopoverComponent = PbdsDaterangePopoverComponent;
    exports.PbdsDaterangePopoverModule = PbdsDaterangePopoverModule;
    exports.PbdsDaterangeService = PbdsDaterangeService;
    exports.PbdsHeaderShadowDirective = PbdsHeaderShadowDirective;
    exports.PbdsHeaderShadowModule = PbdsHeaderShadowModule;
    exports.PbdsProgressSpinnerComponent = PbdsProgressSpinnerComponent;
    exports.PbdsProgressSpinnerModule = PbdsProgressSpinnerModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pb-design-system.umd.js.map
