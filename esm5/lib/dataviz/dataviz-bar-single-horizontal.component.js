/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, ElementRef, HostBinding, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ViewportScroller, Location } from '@angular/common';
import { select as d3_select, scaleLinear as d3_scaleLinear, scaleOrdinal as d3_scaleOrdinal, format as d3_format, event as d3_event, timeFormat as d3_timeFormat, isoParse as d3_isoParse, sum as d3_sum, axisBottom as d3_axisBottom, easeLinear as d3_easeLinear } from 'd3';
import { PbdsDatavizService } from './dataviz.service';
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
        this.hovered = new EventEmitter();
        this.clicked = new EventEmitter();
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
            var node = d3_select(nodes[index]);
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
            var percentage = data.value / d3_sum(_this.data, (/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return d.value; }));
            /** @type {?} */
            var comparePercentage = data.compareValue / d3_sum(_this.data, (/**
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
                        var parsedTime = d3_isoParse(data.label);
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
                tooltipCompareDaterange = _this.tooltipDateFormat(d3_isoParse(data.compareStartDate)) + " - " + _this.tooltipDateFormat(d3_isoParse(data.compareEndDate));
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
                tooltipDaterange = _this.tooltipDateFormat(d3_isoParse(data.startDate)) + " - " + _this.tooltipDateFormat(d3_isoParse(data.endDate));
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
        switch (this.xAxisFormatType) {
            case 'number':
                this.xAxisFormat = d3_format(this.xAxisFormatString);
                break;
        }
        switch (this.legendLabelFormatType) {
            case 'number':
                this.legendLabelFormat = d3_format(this.legendLabelFormatString);
                break;
            case 'time':
                this.legendLabelFormat = d3_timeFormat(this.legendLabelFormatString);
                break;
            default:
                this.legendLabelFormat = null;
                break;
        }
        switch (this.tooltipValueFormatType) {
            case 'number':
                this.tooltipValueFormat = d3_format(this.tooltipValueFormatString);
                break;
            default:
                this.tooltipValueFormat = null;
        }
        this.tooltipDateFormat = d3_timeFormat(this.tooltipDateFormatString);
        this.tooltipPercentFormat = d3_format(this.tooltipPercentFormatString);
        this.tooltipCompareChangeFormat = d3_format(this.compareChangeFormatString);
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
        this.chart = d3_select(this._element.nativeElement).attr('aria-hidden', 'true');
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
            this.tooltip = d3_select('body')
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
        this.xAxisScale = d3_scaleLinear()
            .domain([0, Math.ceil(d3_sum(this.data, (/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return d.value; })))])
            .range([0, +this.width]);
        this.xAxisCall = d3_axisBottom(this.xAxisScale)
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
            this.xGridCall = d3_axisBottom(this.xAxisScale).tickSize(-this.height);
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
        this.colorRange = d3_scaleOrdinal().range(colors);
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
        var sumValues = d3_sum(this.data, (/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.value; }));
        /** @type {?} */
        var isLastBarZero = this.data[this.data.length - 1].value === 0 || this.data[this.data.length - 1].value === null ? true : false;
        /** @type {?} */
        var lastBarZeroCount = 0;
        /** @type {?} */
        var cloneData = tslib_1.__spread(this.data);
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
                var format = d3_format('.0%');
                return format(i * 0.25);
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
                var format = d3_format('.0%');
                return format(i * 0.25);
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
                    .ease(d3_easeLinear)
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
        function (data, index, nodes) { return _this.barMouseOver(d3_event, data, index, nodes); }))
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
        function (data, index, nodes) { return _this.barMouseClick(d3_event, data, index, nodes); }));
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
                            var parsedTime = d3_isoParse(d.label);
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
                            var parsedTime = d3_isoParse(d.label);
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
            function (data, index, nodes) { return _this.legendMouseOver(d3_event, data, index, nodes); }))
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
            function (data, index, nodes) { return _this.legendMouseClick(d3_event, data, index, nodes); }));
        }
    };
    PbdsDatavizBarSingleHorizontalComponent.decorators = [
        { type: Component, args: [{
                    selector: 'pbds-dataviz-bar-single-horizontal',
                    template: "",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    PbdsDatavizBarSingleHorizontalComponent.ctorParameters = function () { return [
        { type: PbdsDatavizService },
        { type: ElementRef },
        { type: ViewportScroller },
        { type: Location }
    ]; };
    PbdsDatavizBarSingleHorizontalComponent.propDecorators = {
        chartClass: [{ type: HostBinding, args: ['class.pbds-chart',] }],
        singleStackedBarClass: [{ type: HostBinding, args: ['class.pbds-chart-bar-single-horizontal',] }],
        data: [{ type: Input }],
        width: [{ type: Input }],
        height: [{ type: Input }],
        nullValueText: [{ type: Input }],
        percentage: [{ type: Input }],
        marginTop: [{ type: Input }],
        marginRight: [{ type: Input }],
        marginBottom: [{ type: Input }],
        marginLeft: [{ type: Input }],
        barMargin: [{ type: Input }],
        hideXAxis: [{ type: Input }],
        xAxisTicks: [{ type: Input }],
        xAxisTitle: [{ type: Input }],
        xAxisFormatType: [{ type: Input }],
        xAxisFormatString: [{ type: Input }],
        xAxisTickLabelSuffix: [{ type: Input }],
        hideXGrid: [{ type: Input }],
        hideLegend: [{ type: Input }],
        hideLegendTooltip: [{ type: Input }],
        legendWidth: [{ type: Input }],
        legendPosition: [{ type: Input }],
        legendLabelFormatType: [{ type: Input }],
        legendLabelFormatString: [{ type: Input }],
        hideTooltip: [{ type: Input }],
        tooltipLabelFormatType: [{ type: Input }],
        tooltipLabelFormatString: [{ type: Input }],
        tooltipDateFormatString: [{ type: Input }],
        tooltipValueFormatType: [{ type: Input }],
        tooltipValueFormatString: [{ type: Input }],
        tooltipValueSuffix: [{ type: Input }],
        tooltipPercentFormatString: [{ type: Input }],
        compareChangeFormatString: [{ type: Input }],
        monochrome: [{ type: Input }],
        theme: [{ type: Input }],
        hovered: [{ type: Output }],
        clicked: [{ type: Output }]
    };
    return PbdsDatavizBarSingleHorizontalComponent;
}());
export { PbdsDatavizBarSingleHorizontalComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXZpei1iYXItc2luZ2xlLWhvcml6b250YWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcGItZGVzaWduLXN5c3RlbS8iLCJzb3VyY2VzIjpbImxpYi9kYXRhdml6L2RhdGF2aXotYmFyLXNpbmdsZS1ob3Jpem9udGFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBRVQsS0FBSyxFQUNMLFVBQVUsRUFDVixXQUFXLEVBR1gsTUFBTSxFQUNOLFlBQVksRUFDWix1QkFBdUIsRUFFeEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTdELE9BQU8sRUFDTCxNQUFNLElBQUksU0FBUyxFQUNuQixXQUFXLElBQUksY0FBYyxFQUM3QixZQUFZLElBQUksZUFBZSxFQUMvQixNQUFNLElBQUksU0FBUyxFQUNuQixLQUFLLElBQUksUUFBUSxFQUNqQixVQUFVLElBQUksYUFBYSxFQUMzQixRQUFRLElBQUksV0FBVyxFQUN2QixHQUFHLElBQUksTUFBTSxFQUNiLFVBQVUsSUFBSSxhQUFhLEVBQzNCLFVBQVUsSUFBSSxhQUFhLEVBQzVCLE1BQU0sSUFBSSxDQUFDO0FBRVosT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFHdkQ7SUFvSkUsaURBQ1UsUUFBNEIsRUFDNUIsUUFBb0IsRUFDcEIsT0FBeUIsRUFDekIsU0FBbUI7UUFKN0IsaUJBS0k7UUFKTSxhQUFRLEdBQVIsUUFBUSxDQUFvQjtRQUM1QixhQUFRLEdBQVIsUUFBUSxDQUFZO1FBQ3BCLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBQ3pCLGNBQVMsR0FBVCxTQUFTLENBQVU7UUFoSjdCLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFHbEIsMEJBQXFCLEdBQUcsSUFBSSxDQUFDO1FBTTdCLFVBQUssR0FBRyxHQUFHLENBQUM7UUFHWixXQUFNLEdBQUcsRUFBRSxDQUFDO1FBR1osa0JBQWEsR0FBRyxtQkFBbUIsQ0FBQztRQUdwQyxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBR25CLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFHZixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUdqQixpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUdsQixlQUFVLEdBQUcsRUFBRSxDQUFDO1FBR2hCLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFHZCxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBR2xCLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFHZixlQUFVLEdBQWtCLElBQUksQ0FBQztRQUdqQyxvQkFBZSxHQUFhLElBQUksQ0FBQztRQUdqQyxzQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFHdkIseUJBQW9CLEdBQUcsRUFBRSxDQUFDO1FBRzFCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFHbEIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUduQixzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFHekIsZ0JBQVcsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsdUVBQXVFOztRQUcvRixtQkFBYyxHQUF1QixRQUFRLENBQUM7UUFHOUMsMEJBQXFCLEdBQXNCLElBQUksQ0FBQztRQUdoRCw0QkFBdUIsR0FBRyxFQUFFLENBQUM7UUFHN0IsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFHcEIsMkJBQXNCLEdBQXNCLElBQUksQ0FBQztRQUdqRCw2QkFBd0IsR0FBRyxFQUFFLENBQUM7UUFHOUIsNEJBQXVCLEdBQUcsV0FBVyxDQUFDO1FBR3RDLDJCQUFzQixHQUFhLElBQUksQ0FBQztRQUd4Qyw2QkFBd0IsR0FBRyxFQUFFLENBQUM7UUFHOUIsdUJBQWtCLEdBQUcsRUFBRSxDQUFDO1FBR3hCLCtCQUEwQixHQUFHLEtBQUssQ0FBQztRQUduQyw4QkFBeUIsR0FBRyxLQUFLLENBQUM7UUFHbEMsZUFBVSxHQUFHLEtBQUssQ0FBQztRQU1uQixZQUFPLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFHM0QsWUFBTyxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBRW5ELGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFLbEIsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQThheEIsaUJBQVk7Ozs7Ozs7UUFBRyxVQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUs7O2dCQUNqQyxJQUFJLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVwQyxLQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRXZELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRWhDLEtBQUksQ0FBQyxLQUFLO2lCQUNQLFNBQVMsQ0FBQyxjQUFjLENBQUM7aUJBQ3pCLE1BQU07Ozs7O1lBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQztnQkFDWCxZQUFZO2dCQUNaLE9BQU8sQ0FBQyxLQUFLLEtBQUssQ0FBQztZQUNyQixDQUFDLEVBQUM7aUJBQ0QsT0FBTyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUU3QixLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUVyQyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssT0FBQSxFQUFFLElBQUksTUFBQSxFQUFFLENBQUMsQ0FBQztRQUNyQyxDQUFDLEVBQUM7UUFFRixnQkFBVzs7O1FBQUc7WUFDWixLQUFJLENBQUMsS0FBSztpQkFDUCxTQUFTLENBQUMsTUFBTSxDQUFDO2lCQUNqQixPQUFPLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQztpQkFDMUIsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUV2QixLQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRWhFLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQixDQUFDLEVBQUM7UUFFRixrQkFBYTs7Ozs7OztRQUFHLFVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSztZQUN4QyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssT0FBQSxFQUFFLElBQUksTUFBQSxFQUFFLENBQUMsQ0FBQztRQUNyQyxDQUFDLEVBQUM7UUFFTSxnQkFBVzs7Ozs7UUFBRyxVQUFDLElBQUksRUFBRSxJQUFJOztnQkFDekIsVUFBVSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRTs7Z0JBQ3pDLE1BQU0sR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFOztnQkFFekMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUksQ0FBQyxJQUFJOzs7O1lBQUUsVUFBQyxDQUFNLElBQUssT0FBQSxDQUFDLENBQUMsS0FBSyxFQUFQLENBQU8sRUFBQzs7Z0JBQ2hFLGlCQUFpQixHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLEtBQUksQ0FBQyxJQUFJOzs7O1lBQUUsVUFBQyxDQUFNLElBQUssT0FBQSxDQUFDLENBQUMsWUFBWSxFQUFkLENBQWMsRUFBQzs7Z0JBRXZGLFlBQVksR0FBRyxFQUFFOztnQkFDakIsNkJBQTZCLEdBQUcsRUFBRTs7Z0JBQ2xDLHVCQUF1QixHQUFHLEVBQUU7O2dCQUM1QixtQkFBbUIsR0FBRyxFQUFFOztnQkFDeEIsc0JBQXNCLEdBQUcsRUFBRTs7Z0JBQzNCLGdCQUFnQixHQUFHLEVBQUU7O2dCQUNyQixZQUFZLEdBQUcsS0FBRyxLQUFJLENBQUMsYUFBZTs7Z0JBQ3RDLGdCQUFnQixHQUFHLEVBQUU7WUFFekIsZ0JBQWdCO1lBQ2hCLElBQUksQ0FBQyxLQUFJLENBQUMsWUFBWSxFQUFFO2dCQUN0QixLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFFbkQsUUFBUSxLQUFJLENBQUMsc0JBQXNCLEVBQUU7b0JBQ25DLEtBQUssUUFBUTt3QkFDWCxZQUFZLEdBQUcsS0FBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDbkQsTUFBTTtvQkFFUixLQUFLLE1BQU07OzRCQUNILFVBQVUsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzt3QkFDMUMsWUFBWSxHQUFHLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFDbkQsTUFBTTtvQkFFUjt3QkFDRSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztpQkFDN0I7YUFDRjtZQUVELDRCQUE0QjtZQUM1QixJQUFJLEtBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ2xFLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLHNCQUFzQixFQUFFLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDN0QsNkJBQTZCLEdBQUcsTUFBTSxDQUFDO2dCQUV2Qyx1QkFBdUIsR0FBTSxLQUFJLENBQUMsaUJBQWlCLENBQ2pELFdBQVcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FDbkMsV0FBTSxLQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBRyxDQUFDO2FBQ25FO1lBRUQsd0JBQXdCO1lBQ3hCLElBQUksS0FBSSxDQUFDLFVBQVUsSUFBSSxLQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQzFELG1CQUFtQjtvQkFDakIsS0FBSSxDQUFDLGtCQUFrQixLQUFLLElBQUk7d0JBQzlCLENBQUMsQ0FBSSxLQUFJLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCLENBQUMsVUFBSyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUksQ0FBQyxrQkFBa0IsTUFBRzt3QkFDckcsQ0FBQyxDQUFJLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFLLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQzVGLEtBQUksQ0FBQyxrQkFBa0IsTUFDdEIsQ0FBQzthQUNYO2lCQUFNLElBQUksS0FBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksRUFBRTtnQkFDdkQsbUJBQW1CO29CQUNqQixLQUFJLENBQUMsa0JBQWtCLEtBQUssSUFBSTt3QkFDOUIsQ0FBQyxDQUFDLEtBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFJLENBQUMsa0JBQWtCLFVBQUssS0FBSSxDQUFDLG9CQUFvQixDQUFDLGlCQUFpQixDQUFDLE1BQUc7d0JBQ3BHLENBQUMsQ0FBQyxLQUFHLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsS0FBSSxDQUFDLGtCQUFrQixVQUFLLEtBQUksQ0FBQyxvQkFBb0IsQ0FDbkcsaUJBQWlCLENBQ2xCLE1BQUcsQ0FBQzthQUNaO2lCQUFNLElBQUksS0FBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksRUFBRTtnQkFDdkQsbUJBQW1CLEdBQUcsS0FBRyxLQUFJLENBQUMsYUFBZSxDQUFDO2FBQy9DO1lBRUQsb0JBQW9CO1lBQ3BCLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNsQyxnQkFBZ0IsR0FBTSxLQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFNLEtBQUksQ0FBQyxpQkFBaUIsQ0FDbkcsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FDeEIsQ0FBQzthQUNMO1lBRUQsMEJBQTBCO1lBQzFCLElBQUksWUFBWSxLQUFLLEVBQUUsRUFBRTtnQkFDdkIsc0JBQXNCLEdBQUcsTUFBTSxDQUFDO2FBQ2pDO1lBRUQsZ0JBQWdCO1lBQ2hCLElBQUksS0FBSSxDQUFDLFlBQVksSUFBSSxLQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ3RELFlBQVksR0FBRyxLQUFJLENBQUMsa0JBQWtCLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFHLElBQUksQ0FBQyxLQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUcsS0FBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUcsQ0FBQzthQUM5RztpQkFBTSxJQUFJLEtBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLEVBQUU7Z0JBQ25ELFlBQVk7b0JBQ1YsS0FBSSxDQUFDLGtCQUFrQixLQUFLLElBQUk7d0JBQzlCLENBQUMsQ0FBQyxLQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSSxDQUFDLGtCQUFvQjt3QkFDM0MsQ0FBQyxDQUFDLEtBQUcsS0FBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFJLENBQUMsa0JBQW9CLENBQUM7YUFDMUU7aUJBQU0sSUFBSSxDQUFDLEtBQUksQ0FBQyxZQUFZLElBQUksS0FBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksRUFBRTtnQkFDdkUsWUFBWTtvQkFDVixLQUFJLENBQUMsa0JBQWtCLEtBQUssSUFBSTt3QkFDOUIsQ0FBQyxDQUFJLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsVUFBSyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxrQkFBa0IsTUFBRzt3QkFDdEYsQ0FBQyxDQUFJLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsVUFBSyxLQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUM5RSxLQUFJLENBQUMsa0JBQWtCLE1BQ3RCLENBQUM7YUFDWDtpQkFBTSxJQUFJLENBQUMsS0FBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksRUFBRTtnQkFDcEQsWUFBWTtvQkFDVixLQUFJLENBQUMsa0JBQWtCLEtBQUssSUFBSTt3QkFDOUIsQ0FBQyxDQUFDLEtBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsa0JBQWtCLFVBQUssS0FBSSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxNQUFHO3dCQUN0RixDQUFDLENBQUMsS0FBRyxLQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUksQ0FBQyxrQkFBa0IsVUFBSyxLQUFJLENBQUMsb0JBQW9CLENBQzVGLFVBQVUsQ0FDWCxNQUFHLENBQUM7YUFDWjtZQUVELDJCQUEyQjtZQUMzQixJQUFJLENBQUMsS0FBSSxDQUFDLFlBQVksSUFBSSxLQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssSUFBSSxFQUFFO2dCQUM3RixnQkFBZ0IsR0FBRyx5Q0FBc0MsSUFBSSxDQUFDLHNCQUFzQixVQUNsRixJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSx1QkFDNUIsS0FBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBZSxDQUFDO2FBQ3pGO1lBRUQsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJOzs7WUFBQztnQkFDaEIsT0FBTyw2REFDeUMsWUFBWSxxQ0FDNUMsNkJBQTZCLFdBQUssdUJBQXVCLHNFQUN6QixtQkFBbUIscUNBQ25ELHNCQUFzQixXQUFLLGdCQUFnQixzRkFDRyxZQUFZLHNCQUFpQixnQkFBZ0IsMEJBQzFHLENBQUM7WUFDSixDQUFDLEVBQUMsQ0FBQzs7Z0JBRUcsa0JBQWtCLEdBQUcsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLFdBQVcsR0FBRyxDQUFDOztnQkFDekQsbUJBQW1CLEdBQUcsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLFlBQVk7O2dCQUN2RCxjQUFjLEdBQUcsQ0FBQztZQUV4QixLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLG1CQUFtQixHQUFHLGNBQWMsT0FBSSxDQUFDLENBQUM7WUFFdEcsSUFBSSxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3hCLEtBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsa0JBQWtCLEdBQUcsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsT0FBSSxDQUFDLENBQUM7YUFDL0c7aUJBQU07Z0JBQ0wsS0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLGtCQUFrQixHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssT0FBSSxDQUFDLENBQUM7YUFDeEY7WUFFRCxLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkMsQ0FBQyxFQUFDO1FBRU0sZ0JBQVc7OztRQUFHO1lBQ3BCLEtBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNuQyxDQUFDLEVBQUM7UUFFRixvQkFBZTs7Ozs7OztRQUFHLFVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSztZQUMxQyxJQUFJLENBQUMsS0FBSSxDQUFDLGlCQUFpQixFQUFFOztvQkFDckIsUUFBUSxHQUFHLEtBQUksQ0FBQyxHQUFHO3FCQUN0QixTQUFTLENBQUMsTUFBTSxDQUFDO3FCQUNqQixNQUFNOzs7OztnQkFBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxDQUFDLEtBQUssS0FBSyxFQUFYLENBQVcsRUFBQztxQkFDN0IsSUFBSSxFQUFFO2dCQUVULEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQ2xDO1lBRUQsS0FBSSxDQUFDLEtBQUs7aUJBQ1AsU0FBUyxDQUFDLGNBQWMsQ0FBQztpQkFDekIsTUFBTTs7Ozs7WUFBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxDQUFDLEtBQUssS0FBSyxFQUFYLENBQVcsRUFBQztpQkFDN0IsT0FBTyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUU3QixLQUFJLENBQUMsS0FBSztpQkFDUCxTQUFTLENBQUMsTUFBTSxDQUFDO2lCQUNqQixNQUFNOzs7OztZQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLENBQUMsS0FBSyxLQUFLLEVBQVgsQ0FBVyxFQUFDO2lCQUM3QixPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRTdCLEtBQUksQ0FBQyxLQUFLO2lCQUNQLFNBQVMsQ0FBQyxNQUFNLENBQUM7aUJBQ2pCLE1BQU07Ozs7O1lBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxLQUFLLEtBQUssRUFBWCxDQUFXLEVBQUM7aUJBQzdCLE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFN0IsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLE9BQUEsRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDLENBQUM7UUFDckMsQ0FBQyxFQUFDO1FBRUYsbUJBQWM7OztRQUFHO1lBQ2YsS0FBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUVoRSxLQUFJLENBQUMsS0FBSztpQkFDUCxTQUFTLENBQUMsTUFBTSxDQUFDO2lCQUNqQixPQUFPLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQztpQkFDMUIsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUV2QixvQ0FBb0M7WUFDcEMsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JCLENBQUMsRUFBQztRQUVGLHFCQUFnQjs7Ozs7OztRQUFHLFVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSztZQUMzQyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssT0FBQSxFQUFFLElBQUksTUFBQSxFQUFFLENBQUMsQ0FBQztRQUNyQyxDQUFDLEVBQUM7UUFFTSxtQkFBYzs7OztRQUFHLFVBQUEsSUFBSTtZQUMzQixRQUFRLEtBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQzVCLEtBQUssUUFBUTtvQkFDWCxPQUFPLEtBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFJLENBQUMsb0JBQXNCLENBQUM7Z0JBRWpFO29CQUNFLE9BQU8sS0FBRyxJQUFJLEdBQUcsS0FBSSxDQUFDLG9CQUFzQixDQUFDO2FBQ2hEO1FBQ0gsQ0FBQyxFQUFDO0lBbm5CQyxDQUFDOzs7O0lBRUosMERBQVE7OztJQUFSO1FBQUEsaUJBcUpDO1FBcEpDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFFN0MsSUFBSSxDQUFDLE1BQU0sR0FBRztZQUNaLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTO1lBQ3BCLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXO1lBQ3hCLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZO1lBQzFCLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVO1NBQ3ZCLENBQUM7UUFFRixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDMUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFcEUsUUFBUSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQzVCLEtBQUssUUFBUTtnQkFDWCxJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDckQsTUFBTTtTQUNUO1FBRUQsUUFBUSxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDbEMsS0FBSyxRQUFRO2dCQUNYLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7Z0JBQ2pFLE1BQU07WUFDUixLQUFLLE1BQU07Z0JBQ1QsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztnQkFDckUsTUFBTTtZQUNSO2dCQUNFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7Z0JBQzlCLE1BQU07U0FDVDtRQUVELFFBQVEsSUFBSSxDQUFDLHNCQUFzQixFQUFFO1lBQ25DLEtBQUssUUFBUTtnQkFDWCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2dCQUNuRSxNQUFNO1lBQ1I7Z0JBQ0UsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztTQUNsQztRQUVELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLG9CQUFvQixHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsMEJBQTBCLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBRTVFLCtCQUErQjtRQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVqRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLE9BQU8sRUFBRTtZQUN2RCxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDOUM7UUFFRCxtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRWhGLG1CQUFtQjtRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLO2FBQ2xCLE1BQU0sQ0FBQyxLQUFLLENBQUM7YUFDYixJQUFJLENBQUMsT0FBTzs7O1FBQUU7WUFDYixPQUFPLENBQUMsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUM1RCxDQUFDLEVBQUM7YUFDRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7YUFDM0YsSUFBSSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUM7YUFDMUIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLGVBQWUsQ0FBQzthQUM1QyxJQUFJLENBQUMsU0FBUzs7O1FBQUU7WUFDZixPQUFPLE1BQUksS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFVBQUssS0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLFVBQUksQ0FBQyxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxXQUFJLENBQUMsS0FBSTtpQkFDM0csTUFBTTtnQkFDUCxLQUFJLENBQUMsTUFBTSxDQUFDLEdBQUc7Z0JBQ2YsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO2dCQUNsQixLQUFJLENBQUMsZ0JBQWdCLENBQUUsQ0FBQztRQUM1QixDQUFDLEVBQUMsQ0FBQztRQUVMLFVBQVU7UUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7aUJBQzdCLE1BQU0sQ0FBQyxLQUFLLENBQUM7aUJBQ2IsSUFBSSxDQUFDLE9BQU8sRUFBRSxvQkFBb0IsQ0FBQztpQkFDbkMsT0FBTyxDQUFDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7aUJBQy9DLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO2lCQUNuQixJQUFJLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsaUNBQWlDO1NBQ2xFO1FBRUQscUJBQXFCO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUM1QyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsRUFBRSxJQUFJLENBQUMsY0FBYyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLG1CQUFpQixJQUFJLENBQUMsY0FBZ0IsQ0FBQyxDQUFDO1NBQy9FO1FBRUQsU0FBUztRQUNULElBQUksQ0FBQyxVQUFVLEdBQUcsY0FBYyxFQUFFO2FBQy9CLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSTs7OztZQUFFLFVBQUMsQ0FBTSxJQUFLLE9BQUEsQ0FBQyxDQUFDLEtBQUssRUFBUCxDQUFPLEVBQUMsQ0FBQyxDQUFDLENBQUM7YUFDOUQsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUM3QywyREFBMkQ7YUFDMUQsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7YUFDdEIsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7YUFDNUIsYUFBYSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQzthQUN0QyxVQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRW5DLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUc7YUFDbEIsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNYLElBQUksQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDO2FBQzVCLElBQUksQ0FBQyxXQUFXLEVBQUUsa0JBQWdCLElBQUksQ0FBQyxNQUFNLE1BQUcsQ0FBQzthQUNqRCxPQUFPLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7YUFDdEMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxhQUFhLENBQUM7YUFDL0MsT0FBTyxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxlQUFlLENBQUM7YUFDbkQsT0FBTyxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNyRCx5QkFBeUI7UUFFekIsY0FBYztRQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFdkUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRztpQkFDbEIsTUFBTSxDQUFDLEdBQUcsQ0FBQztpQkFDWCxJQUFJLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQztpQkFDNUIsT0FBTyxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxhQUFhLENBQUM7aUJBQy9DLElBQUksQ0FBQyxXQUFXLEVBQUUsa0JBQWdCLElBQUksQ0FBQyxNQUFNLE1BQUcsQ0FBQztpQkFDakQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUN6QjtRQUVELElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsR0FBRztpQkFDTCxNQUFNLENBQUMsTUFBTSxDQUFDO2lCQUNkLElBQUksQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDO2lCQUMzQixJQUFJLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQztpQkFDN0IsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztpQkFDNUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNyRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzFCOzs7WUFHRyxNQUFNO1FBRVYsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3pGO2FBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQzFCLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN6RTthQUFNO1lBQ0wsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9EO1FBRUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxlQUFlLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFbEQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBRUQsNkRBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQzdDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNwQjtJQUNILENBQUM7Ozs7SUFFRCw2REFBVzs7O0lBQVg7UUFDRSxJQUFJLElBQUksQ0FBQyxPQUFPO1lBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUMxQyxDQUFDOzs7O0lBRUQsNkRBQVc7OztJQUFYO1FBQUEsaUJBK09DO1FBOU9DLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUMxRCxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQzs7WUFFOUQsU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSTs7OztRQUFFLFVBQUMsQ0FBTSxJQUFLLE9BQUEsQ0FBQyxDQUFDLEtBQUssRUFBUCxDQUFPLEVBQUM7O1lBQ2xELGFBQWEsR0FDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLOztZQUUxRyxnQkFBZ0IsR0FBRyxDQUFDOztZQUNsQixTQUFTLG9CQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7O1lBQzVCLE1BQU0sR0FBRyxLQUFLO1FBRWxCLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPOzs7Ozs7UUFBQyxVQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSztZQUM5QyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDMUQsZ0JBQWdCLEVBQUUsQ0FBQzthQUNwQjtpQkFBTTtnQkFDTCxNQUFNLEdBQUcsSUFBSSxDQUFDO2FBQ2Y7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUVILElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDekMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMvRCxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLEdBQUcsSUFBSSxFQUFFLFNBQVMsR0FBRyxHQUFHLEVBQUUsU0FBUyxHQUFHLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQy9GLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUVoQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLEdBQUcsSUFBSSxFQUFFLFNBQVMsR0FBRyxHQUFHLEVBQUUsU0FBUyxHQUFHLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQy9GLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUVoQyxJQUFJLENBQUMsR0FBRztpQkFDTCxNQUFNLENBQUMsU0FBUyxDQUFDO2lCQUNqQixTQUFTLENBQUMsTUFBTSxDQUFDO2lCQUNqQixJQUFJOzs7OztZQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUM7O29CQUNILE1BQU0sR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDO2dCQUMvQixPQUFPLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDMUIsQ0FBQyxFQUFDLENBQUM7U0FDTjthQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQy9DLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDekQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFaEMsSUFBSSxDQUFDLEdBQUc7aUJBQ0wsTUFBTSxDQUFDLFNBQVMsQ0FBQztpQkFDakIsU0FBUyxDQUFDLE1BQU0sQ0FBQztpQkFDakIsSUFBSTs7Ozs7WUFBQyxVQUFDLENBQUMsRUFBRSxDQUFDOztvQkFDSCxNQUFNLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQztnQkFDL0IsT0FBTyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQzFCLENBQUMsRUFBQyxDQUFDO1NBQ047YUFBTTtZQUNMLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzFFLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBTTs7OztZQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBbkIsQ0FBbUIsRUFBQyxDQUFDLENBQUMsQ0FBQyw2QkFBNkI7WUFFbEgsSUFBSSxDQUFDLEtBQUs7aUJBQ1AsVUFBVSxFQUFFO2lCQUNaLFFBQVEsQ0FBQyxJQUFJLENBQUM7aUJBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUV4QixtQkFBbUI7WUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxLQUFLO3FCQUNQLFVBQVUsRUFBRTtxQkFDWixRQUFRLENBQUMsSUFBSSxDQUFDO3FCQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDekI7U0FDRjtRQUVELElBQUksQ0FBQyxHQUFHO2FBQ0wsU0FBUyxDQUFDLE1BQU0sQ0FBQzthQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNmLElBQUk7Ozs7UUFDSCxVQUFBLEtBQUs7WUFDSCxPQUFBLEtBQUs7aUJBQ0YsTUFBTSxDQUFDLE1BQU0sQ0FBQztpQkFDZCxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQztpQkFDcEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7aUJBQ2hCLElBQUksQ0FBQyxRQUFROzs7WUFBRTtnQkFDZCxPQUFPLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQztZQUN2QyxDQUFDLEVBQUM7aUJBQ0QsSUFBSSxDQUFDLE1BQU07Ozs7WUFBRSxVQUFBLENBQUM7Z0JBQ2IsSUFBSSxLQUFJLENBQUMsWUFBWSxFQUFFO29CQUNyQixPQUFPLFNBQU8sS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsNkJBQXdCLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBRyxDQUFDO2lCQUNsRztxQkFBTTtvQkFDTCxPQUFPLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNqQztZQUNILENBQUMsRUFBQztpQkFDRCxJQUFJLENBQUMsR0FBRzs7O1lBQUU7Z0JBQ1QsT0FBTyxLQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztZQUM3QixDQUFDLEVBQUM7aUJBQ0QsSUFBSSxDQUFDLEdBQUc7Ozs7O1lBQUUsVUFBQyxDQUFDLEVBQUUsQ0FBQztnQkFDZCxPQUFPLEtBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNOzs7OztnQkFBQyxVQUFDLEdBQUcsRUFBRSxJQUFJO29CQUM1Qyw4RUFBOEU7b0JBQzlFLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDN0MsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ1IsQ0FBQyxFQUFDO2lCQUNELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUM7aUJBQzlCLElBQUk7Ozs7WUFBQyxVQUFBLEtBQUs7Z0JBQ1QsT0FBTyxDQUNMLEtBQUs7cUJBQ0YsVUFBVSxFQUFFO29CQUNiLGVBQWU7cUJBQ2QsS0FBSzs7Ozs7Z0JBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxHQUFHLEdBQUcsRUFBUCxDQUFPLEVBQUM7cUJBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUM7cUJBQ25CLElBQUksQ0FBQyxPQUFPOzs7OztnQkFBRSxVQUFDLENBQUMsRUFBRSxDQUFDO29CQUNsQixZQUFZO29CQUNaLElBQUksQ0FBQyxLQUFLLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLGdCQUFnQixHQUFHLENBQUMsSUFBSSxhQUFhLEVBQUU7d0JBQ2xFLE9BQU8sS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ2pDO3lCQUFNLElBQUksQ0FBQyxLQUFLLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs7NEJBQ2pDLEtBQUssR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxTQUFTO3dCQUN0RCxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyx5QkFBeUI7d0JBQ3RFLE9BQU8sS0FBSyxDQUFDO3FCQUNkO3lCQUFNO3dCQUNMLE9BQU8sS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ2pDO2dCQUNILENBQUMsRUFBQztxQkFDRCxVQUFVLEVBQUU7cUJBQ1osSUFBSSxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUNsQyxDQUFDO1lBQ0osQ0FBQyxFQUFDO1FBOUNKLENBOENJOzs7O1FBQ04sVUFBQSxNQUFNO1lBQ0osT0FBQSxNQUFNO2lCQUNILElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUM7aUJBQzlCLFVBQVUsRUFBRTtpQkFDWixRQUFRLENBQUMsSUFBSSxDQUFDO2lCQUNkLElBQUksQ0FBQyxPQUFPOzs7OztZQUFFLFVBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ2xCLFlBQVk7Z0JBQ1osSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsRUFBRTtvQkFDckMsT0FBTyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUMzQjtxQkFBTSxJQUFJLENBQUMsS0FBSyxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ3JDLE9BQU8sS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2pDO3FCQUFNO29CQUNMLE9BQU8sS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQztpQkFDbEQ7WUFDSCxDQUFDLEVBQUM7aUJBQ0QsSUFBSSxDQUFDLEdBQUc7Ozs7O1lBQUUsVUFBQyxDQUFDLEVBQUUsQ0FBQztnQkFDZCxPQUFPLEtBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNOzs7OztnQkFBQyxVQUFDLEdBQUcsRUFBRSxJQUFJO29CQUM1QyxPQUFPLEdBQUcsR0FBRyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM1QyxDQUFDLEdBQUUsQ0FBQyxDQUFDLENBQUM7WUFDUixDQUFDLEVBQUM7aUJBQ0QsVUFBVSxFQUFFO2lCQUNaLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUM7UUFwQmpDLENBb0JpQzs7OztRQUNuQyxVQUFBLElBQUk7WUFDRixPQUFBLElBQUk7aUJBQ0QsVUFBVSxFQUFFO2lCQUNaLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUM7aUJBQzlCLE1BQU0sRUFBRTtRQUhYLENBR1csRUFDZDthQUNBLEVBQUUsQ0FBQyxXQUFXOzs7Ozs7UUFBRSxVQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxJQUFLLE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBL0MsQ0FBK0MsRUFBQzthQUN4RixFQUFFLENBQUMsVUFBVTs7Ozs7O1FBQUUsVUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssSUFBSyxPQUFBLEtBQUksQ0FBQyxXQUFXLEVBQUUsRUFBbEIsQ0FBa0IsRUFBQzthQUMxRCxFQUFFLENBQUMsT0FBTzs7Ozs7O1FBQUUsVUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssSUFBSyxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQWhELENBQWdELEVBQUMsQ0FBQztRQUV6RixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQixJQUFJLENBQUMsS0FBSztpQkFDUCxNQUFNLENBQUMsU0FBUyxDQUFDO2lCQUNqQixTQUFTLENBQUMsY0FBYyxDQUFDO2lCQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztpQkFDZixJQUFJOzs7O1lBQ0gsVUFBQSxLQUFLOztvQkFDRyxFQUFFLEdBQUcsS0FBSztxQkFDYixNQUFNLENBQUMsSUFBSSxDQUFDO3FCQUNaLElBQUksQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDO3FCQUM1QixPQUFPLENBQUMsbUJBQW1CLEVBQUUsS0FBSSxDQUFDLFNBQVMsQ0FBQztnQkFFL0MsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7cUJBQ2QsSUFBSSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUM7cUJBQzNCLEtBQUssQ0FBQyxrQkFBa0I7Ozs7Z0JBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBeEIsQ0FBd0IsRUFBQztxQkFDeEQsT0FBTyxDQUFDLE1BQU0sRUFBRSxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBRW5DLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO3FCQUNkLElBQUksQ0FBQyxPQUFPLEVBQUUsb0JBQW9CLENBQUM7cUJBQ25DLE9BQU8sQ0FBQyxRQUFRLEVBQUUsS0FBSSxDQUFDLFNBQVMsQ0FBQztxQkFDakMsT0FBTyxDQUFDLGFBQWEsRUFBRSxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBRTFDLEVBQUUsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUM7cUJBQzdCLE1BQU0sQ0FBQyxNQUFNLENBQUM7cUJBQ2QsSUFBSSxDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUM7cUJBQzdCLElBQUk7Ozs7Z0JBQUMsVUFBQSxDQUFDO29CQUNMLFFBQVEsS0FBSSxDQUFDLHFCQUFxQixFQUFFO3dCQUNsQyxLQUFLLFFBQVE7NEJBQ1gsT0FBTyxLQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUV6QyxLQUFLLE1BQU07O2dDQUNILFVBQVUsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQzs0QkFDdkMsT0FBTyxLQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBRTVDOzRCQUNFLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQztxQkFDbEI7Z0JBQ0gsQ0FBQyxFQUFDLENBQUM7Z0JBRUwsRUFBRSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQztxQkFDN0IsTUFBTSxDQUFDLEtBQUssQ0FBQztxQkFDYixJQUFJLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQztxQkFDOUIsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFFdEMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUk7Ozs7Z0JBQUMsVUFBQSxDQUFDO29CQUNoQyxPQUFPLHlDQUFzQyxDQUFDLENBQUMsc0JBQXNCLFVBQ25FLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLHVCQUN6QixLQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLGtCQUFlLENBQUM7Z0JBQ3ZGLENBQUMsRUFBQyxDQUFDO2dCQUVILE9BQU8sRUFBRSxDQUFDO1lBQ1osQ0FBQzs7OztZQUNELFVBQUEsTUFBTTtnQkFDSixNQUFNLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDcEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDN0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBRW5FLElBQUksS0FBSSxDQUFDLFNBQVMsRUFBRTtvQkFDbEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUk7Ozs7b0JBQUMsVUFBQSxDQUFDO3dCQUNwQyxPQUFPLHlDQUFzQyxDQUFDLENBQUMsc0JBQXNCLFVBQ25FLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLHVCQUN6QixLQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLGtCQUFlLENBQUM7b0JBQ3ZGLENBQUMsRUFBQyxDQUFDO2lCQUNKO2dCQUVELE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSTs7OztnQkFBQyxVQUFBLENBQUM7b0JBQ25DLFFBQVEsS0FBSSxDQUFDLHFCQUFxQixFQUFFO3dCQUNsQyxLQUFLLFFBQVE7NEJBQ1gsT0FBTyxLQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUV6QyxLQUFLLE1BQU07O2dDQUNILFVBQVUsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQzs0QkFDdkMsT0FBTyxLQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBRTVDOzRCQUNFLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQztxQkFDbEI7Z0JBQ0gsQ0FBQyxFQUFDLENBQUM7Z0JBRUgsT0FBTyxNQUFNLENBQUM7WUFDaEIsQ0FBQzs7OztZQUNELFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFiLENBQWEsRUFDdEI7aUJBQ0EsRUFBRSxDQUFDLFdBQVc7Ozs7OztZQUFFLFVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLElBQUssT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFsRCxDQUFrRCxFQUFDO2lCQUMzRixFQUFFLENBQUMsVUFBVTs7O1lBQUUsY0FBTSxPQUFBLEtBQUksQ0FBQyxjQUFjLEVBQUUsRUFBckIsQ0FBcUIsRUFBQztpQkFDM0MsRUFBRSxDQUFDLE9BQU87Ozs7OztZQUFFLFVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLElBQUssT0FBQSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQW5ELENBQW1ELEVBQUMsQ0FBQztTQUM3RjtJQUNILENBQUM7O2dCQTNpQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQ0FBb0M7b0JBQzlDLFFBQVEsRUFBRSxFQUFFO29CQUVaLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs7OztnQkFSUSxrQkFBa0I7Z0JBekJ6QixVQUFVO2dCQVVILGdCQUFnQjtnQkFBRSxRQUFROzs7NkJBeUJoQyxXQUFXLFNBQUMsa0JBQWtCO3dDQUc5QixXQUFXLFNBQUMsd0NBQXdDO3VCQUdwRCxLQUFLO3dCQUdMLEtBQUs7eUJBR0wsS0FBSztnQ0FHTCxLQUFLOzZCQUdMLEtBQUs7NEJBR0wsS0FBSzs4QkFHTCxLQUFLOytCQUdMLEtBQUs7NkJBR0wsS0FBSzs0QkFHTCxLQUFLOzRCQUdMLEtBQUs7NkJBR0wsS0FBSzs2QkFHTCxLQUFLO2tDQUdMLEtBQUs7b0NBR0wsS0FBSzt1Q0FHTCxLQUFLOzRCQUdMLEtBQUs7NkJBR0wsS0FBSztvQ0FHTCxLQUFLOzhCQUdMLEtBQUs7aUNBR0wsS0FBSzt3Q0FHTCxLQUFLOzBDQUdMLEtBQUs7OEJBR0wsS0FBSzt5Q0FHTCxLQUFLOzJDQUdMLEtBQUs7MENBR0wsS0FBSzt5Q0FHTCxLQUFLOzJDQUdMLEtBQUs7cUNBR0wsS0FBSzs2Q0FHTCxLQUFLOzRDQUdMLEtBQUs7NkJBR0wsS0FBSzt3QkFHTCxLQUFLOzBCQUdMLE1BQU07MEJBR04sTUFBTTs7SUF1cEJULDhDQUFDO0NBQUEsQUE3d0JELElBNndCQztTQXZ3QlksdUNBQXVDOzs7SUFDbEQsNkRBQ2tCOztJQUVsQix3RUFDNkI7O0lBRTdCLHVEQUNvRjs7SUFFcEYsd0RBQ1k7O0lBRVoseURBQ1k7O0lBRVosZ0VBQ29DOztJQUVwQyw2REFDbUI7O0lBRW5CLDREQUNlOztJQUVmLDhEQUNpQjs7SUFFakIsK0RBQ2tCOztJQUVsQiw2REFDZ0I7O0lBRWhCLDREQUNjOztJQUVkLDREQUNrQjs7SUFFbEIsNkRBQ2U7O0lBRWYsNkRBQ2lDOztJQUVqQyxrRUFDaUM7O0lBRWpDLG9FQUN1Qjs7SUFFdkIsdUVBQzBCOztJQUUxQiw0REFDa0I7O0lBRWxCLDZEQUNtQjs7SUFFbkIsb0VBQ3lCOztJQUV6Qiw4REFDdUI7O0lBRXZCLGlFQUM4Qzs7SUFFOUMsd0VBQ2dEOztJQUVoRCwwRUFDNkI7O0lBRTdCLDhEQUNvQjs7SUFFcEIseUVBQ2lEOztJQUVqRCwyRUFDOEI7O0lBRTlCLDBFQUNzQzs7SUFFdEMseUVBQ3dDOztJQUV4QywyRUFDOEI7O0lBRTlCLHFFQUN3Qjs7SUFFeEIsNkVBQ21DOztJQUVuQyw0RUFDa0M7O0lBRWxDLDZEQUNtQjs7SUFFbkIsd0RBQ21EOztJQUVuRCwwREFDMkQ7O0lBRTNELDBEQUMyRDs7Ozs7SUFFM0QsK0RBQTZCOzs7OztJQUM3Qiw0REFBMEI7Ozs7O0lBQzFCLHdEQUFjOzs7OztJQUNkLHNEQUFZOzs7OztJQUNaLHlEQUFlOzs7OztJQUNmLDZEQUFtQjs7Ozs7SUFDbkIsNkRBQXdCOzs7OztJQUN4Qiw0REFBa0I7Ozs7O0lBQ2xCLHdEQUFjOzs7OztJQUNkLDZEQUFtQjs7Ozs7SUFDbkIsZ0VBQThCOzs7OztJQUM5QixxRUFBbUM7Ozs7O0lBQ25DLDhEQUFvQjs7Ozs7SUFDcEIsbUVBQWlDOzs7OztJQUNqQyxrRUFBaUM7Ozs7O0lBQ2pDLGdFQUErQjs7Ozs7SUFDL0IsaUVBQWdDOzs7OztJQUNoQyx3REFBYzs7Ozs7SUFDZCw0REFBa0I7Ozs7O0lBQ2xCLG9FQUEwQjs7Ozs7SUFDMUIsMERBQWdCOzs7OztJQUNoQixxRUFBMkI7Ozs7O0lBQzNCLHFFQUEyQjs7Ozs7SUFDM0Isb0VBQTBCOzs7OztJQUMxQix1RUFBNkI7Ozs7O0lBQzdCLDZFQUFtQzs7SUEyWm5DLCtEQWtCRTs7SUFFRiw4REFTRTs7SUFFRixnRUFFRTs7Ozs7SUFFRiw4REFrSUU7Ozs7O0lBRUYsOERBRUU7O0lBRUYsa0VBMEJFOztJQUVGLGlFQVVFOztJQUVGLG1FQUVFOzs7OztJQUVGLGlFQVFFOzs7OztJQXZuQkEsMkRBQW9DOzs7OztJQUNwQywyREFBNEI7Ozs7O0lBQzVCLDBEQUFpQzs7Ozs7SUFDakMsNERBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIElucHV0LFxuICBFbGVtZW50UmVmLFxuICBIb3N0QmluZGluZyxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIE9uRGVzdHJveVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgVmlld3BvcnRTY3JvbGxlciwgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQge1xuICBzZWxlY3QgYXMgZDNfc2VsZWN0LFxuICBzY2FsZUxpbmVhciBhcyBkM19zY2FsZUxpbmVhcixcbiAgc2NhbGVPcmRpbmFsIGFzIGQzX3NjYWxlT3JkaW5hbCxcbiAgZm9ybWF0IGFzIGQzX2Zvcm1hdCxcbiAgZXZlbnQgYXMgZDNfZXZlbnQsXG4gIHRpbWVGb3JtYXQgYXMgZDNfdGltZUZvcm1hdCxcbiAgaXNvUGFyc2UgYXMgZDNfaXNvUGFyc2UsXG4gIHN1bSBhcyBkM19zdW0sXG4gIGF4aXNCb3R0b20gYXMgZDNfYXhpc0JvdHRvbSxcbiAgZWFzZUxpbmVhciBhcyBkM19lYXNlTGluZWFyXG59IGZyb20gJ2QzJztcblxuaW1wb3J0IHsgUGJkc0RhdGF2aXpTZXJ2aWNlIH0gZnJvbSAnLi9kYXRhdml6LnNlcnZpY2UnO1xuaW1wb3J0IHsgUGJkc0RhdGF2aXpCYXJTaW5nbGVIb3Jpem9udGFsLCBQYmRzRGF0YXZpekJhclNpbmdsZUhvcml6b250YWxDb21wYXJlIH0gZnJvbSAnLi9kYXRhdml6LmludGVyZmFjZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYmRzLWRhdGF2aXotYmFyLXNpbmdsZS1ob3Jpem9udGFsJyxcbiAgdGVtcGxhdGU6IGBgLFxuICBzdHlsZXM6IFtdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBQYmRzRGF0YXZpekJhclNpbmdsZUhvcml6b250YWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5wYmRzLWNoYXJ0JylcbiAgY2hhcnRDbGFzcyA9IHRydWU7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5wYmRzLWNoYXJ0LWJhci1zaW5nbGUtaG9yaXpvbnRhbCcpXG4gIHNpbmdsZVN0YWNrZWRCYXJDbGFzcyA9IHRydWU7XG5cbiAgQElucHV0KClcbiAgZGF0YTogQXJyYXk8UGJkc0RhdGF2aXpCYXJTaW5nbGVIb3Jpem9udGFsIHwgUGJkc0RhdGF2aXpCYXJTaW5nbGVIb3Jpem9udGFsQ29tcGFyZT47XG5cbiAgQElucHV0KClcbiAgd2lkdGggPSAzMDA7XG5cbiAgQElucHV0KClcbiAgaGVpZ2h0ID0gNDA7XG5cbiAgQElucHV0KClcbiAgbnVsbFZhbHVlVGV4dCA9ICdObyBkYXRhIGF2YWlsYWJsZSc7XG5cbiAgQElucHV0KClcbiAgcGVyY2VudGFnZSA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIG1hcmdpblRvcCA9IDEwO1xuXG4gIEBJbnB1dCgpXG4gIG1hcmdpblJpZ2h0ID0gMjA7XG5cbiAgQElucHV0KClcbiAgbWFyZ2luQm90dG9tID0gMzU7XG5cbiAgQElucHV0KClcbiAgbWFyZ2luTGVmdCA9IDE1O1xuXG4gIEBJbnB1dCgpXG4gIGJhck1hcmdpbiA9IDI7XG5cbiAgQElucHV0KClcbiAgaGlkZVhBeGlzID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgeEF4aXNUaWNrcyA9IDY7XG5cbiAgQElucHV0KClcbiAgeEF4aXNUaXRsZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgQElucHV0KClcbiAgeEF4aXNGb3JtYXRUeXBlOiAnbnVtYmVyJyA9IG51bGw7XG5cbiAgQElucHV0KClcbiAgeEF4aXNGb3JtYXRTdHJpbmcgPSAnJztcblxuICBASW5wdXQoKVxuICB4QXhpc1RpY2tMYWJlbFN1ZmZpeCA9ICcnO1xuXG4gIEBJbnB1dCgpXG4gIGhpZGVYR3JpZCA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIGhpZGVMZWdlbmQgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBoaWRlTGVnZW5kVG9vbHRpcCA9IHRydWU7XG5cbiAgQElucHV0KClcbiAgbGVnZW5kV2lkdGggPSAxMDUgKyAyODsgLy8gaGFyZGNvZGVkIGxlZ2VuZCB3aWR0aCArIGxlZnQgbWFyZ2luLCBkbyBub3QgZG9jdW1lbnQgdW50aWwgZmVlZGJhY2tcblxuICBASW5wdXQoKVxuICBsZWdlbmRQb3NpdGlvbjogJ3JpZ2h0JyB8ICdib3R0b20nID0gJ2JvdHRvbSc7XG5cbiAgQElucHV0KClcbiAgbGVnZW5kTGFiZWxGb3JtYXRUeXBlOiAnbnVtYmVyJyB8ICd0aW1lJyA9IG51bGw7XG5cbiAgQElucHV0KClcbiAgbGVnZW5kTGFiZWxGb3JtYXRTdHJpbmcgPSAnJztcblxuICBASW5wdXQoKVxuICBoaWRlVG9vbHRpcCA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIHRvb2x0aXBMYWJlbEZvcm1hdFR5cGU6ICdudW1iZXInIHwgJ3RpbWUnID0gbnVsbDtcblxuICBASW5wdXQoKVxuICB0b29sdGlwTGFiZWxGb3JtYXRTdHJpbmcgPSAnJztcblxuICBASW5wdXQoKVxuICB0b29sdGlwRGF0ZUZvcm1hdFN0cmluZyA9ICclYiAlZSwgJVknO1xuXG4gIEBJbnB1dCgpXG4gIHRvb2x0aXBWYWx1ZUZvcm1hdFR5cGU6ICdudW1iZXInID0gbnVsbDtcblxuICBASW5wdXQoKVxuICB0b29sdGlwVmFsdWVGb3JtYXRTdHJpbmcgPSAnJztcblxuICBASW5wdXQoKVxuICB0b29sdGlwVmFsdWVTdWZmaXggPSAnJztcblxuICBASW5wdXQoKVxuICB0b29sdGlwUGVyY2VudEZvcm1hdFN0cmluZyA9ICcuMiUnO1xuXG4gIEBJbnB1dCgpXG4gIGNvbXBhcmVDaGFuZ2VGb3JtYXRTdHJpbmcgPSAnLjIlJztcblxuICBASW5wdXQoKVxuICBtb25vY2hyb21lID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgdGhlbWU6ICdjbGFzc2ljJyB8ICdvY2VhbicgfCAnc3Vuc2V0JyB8ICd0d2lsaWdodCc7XG5cbiAgQE91dHB1dCgpXG4gIGhvdmVyZWQ6IEV2ZW50RW1pdHRlcjxvYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcjxvYmplY3Q+KCk7XG5cbiAgQE91dHB1dCgpXG4gIGNsaWNrZWQ6IEV2ZW50RW1pdHRlcjxvYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcjxvYmplY3Q+KCk7XG5cbiAgcHJpdmF0ZSBpc1NpbmdsZURhdGEgPSBmYWxzZTtcbiAgcHJpdmF0ZSBpc0NvbXBhcmUgPSBmYWxzZTtcbiAgcHJpdmF0ZSBjaGFydDtcbiAgcHJpdmF0ZSBzdmc7XG4gIHByaXZhdGUgbWFyZ2luO1xuICBwcml2YXRlIGNvbG9yUmFuZ2U7XG4gIHByaXZhdGUgYmFyUGFkZGluZyA9IDQwO1xuICBwcml2YXRlIHhBeGlzQ2FsbDtcbiAgcHJpdmF0ZSB4QXhpcztcbiAgcHJpdmF0ZSB4QXhpc1NjYWxlO1xuICBwcml2YXRlIHhBeGlzVGlja1NpemU6IG51bWJlcjtcbiAgcHJpdmF0ZSB4QXhpc1RpY2tTaXplT3V0ZXI6IG51bWJlcjtcbiAgcHJpdmF0ZSB4QXhpc0Zvcm1hdDtcbiAgcHJpdmF0ZSB4QXhpc1RpdGxlTWFyZ2luOiBudW1iZXI7XG4gIHByaXZhdGUgaGlkZVhBeGlzRG9tYWluOiBib29sZWFuO1xuICBwcml2YXRlIGhpZGVYQXhpc1plcm86IGJvb2xlYW47XG4gIHByaXZhdGUgaGlkZVhBeGlzVGlja3M6IGJvb2xlYW47XG4gIHByaXZhdGUgeEdyaWQ7XG4gIHByaXZhdGUgeEdyaWRDYWxsO1xuICBwcml2YXRlIGxlZ2VuZExhYmVsRm9ybWF0O1xuICBwcml2YXRlIHRvb2x0aXA7XG4gIHByaXZhdGUgdG9vbHRpcExhYmVsRm9ybWF0O1xuICBwcml2YXRlIHRvb2x0aXBWYWx1ZUZvcm1hdDtcbiAgcHJpdmF0ZSB0b29sdGlwRGF0ZUZvcm1hdDtcbiAgcHJpdmF0ZSB0b29sdGlwUGVyY2VudEZvcm1hdDtcbiAgcHJpdmF0ZSB0b29sdGlwQ29tcGFyZUNoYW5nZUZvcm1hdDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9kYXRhdml6OiBQYmRzRGF0YXZpelNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF9zY3JvbGw6IFZpZXdwb3J0U2Nyb2xsZXIsXG4gICAgcHJpdmF0ZSBfbG9jYXRpb246IExvY2F0aW9uXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmhlaWdodCA9ICt0aGlzLmhlaWdodCArIHRoaXMuYmFyUGFkZGluZztcblxuICAgIHRoaXMubWFyZ2luID0ge1xuICAgICAgdG9wOiArdGhpcy5tYXJnaW5Ub3AsXG4gICAgICByaWdodDogK3RoaXMubWFyZ2luUmlnaHQsXG4gICAgICBib3R0b206ICt0aGlzLm1hcmdpbkJvdHRvbSxcbiAgICAgIGxlZnQ6ICt0aGlzLm1hcmdpbkxlZnRcbiAgICB9O1xuXG4gICAgdGhpcy5pc1NpbmdsZURhdGEgPSB0aGlzLmRhdGEubGVuZ3RoID09PSAxID8gdHJ1ZSA6IGZhbHNlO1xuICAgIHRoaXMuaXNDb21wYXJlID0gT2JqZWN0LmtleXModGhpcy5kYXRhWzBdKS5pbmNsdWRlcygnY29tcGFyZVZhbHVlJyk7XG5cbiAgICBzd2l0Y2ggKHRoaXMueEF4aXNGb3JtYXRUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICB0aGlzLnhBeGlzRm9ybWF0ID0gZDNfZm9ybWF0KHRoaXMueEF4aXNGb3JtYXRTdHJpbmcpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHRoaXMubGVnZW5kTGFiZWxGb3JtYXRUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICB0aGlzLmxlZ2VuZExhYmVsRm9ybWF0ID0gZDNfZm9ybWF0KHRoaXMubGVnZW5kTGFiZWxGb3JtYXRTdHJpbmcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgICB0aGlzLmxlZ2VuZExhYmVsRm9ybWF0ID0gZDNfdGltZUZvcm1hdCh0aGlzLmxlZ2VuZExhYmVsRm9ybWF0U3RyaW5nKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmxlZ2VuZExhYmVsRm9ybWF0ID0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgc3dpdGNoICh0aGlzLnRvb2x0aXBWYWx1ZUZvcm1hdFR5cGUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIHRoaXMudG9vbHRpcFZhbHVlRm9ybWF0ID0gZDNfZm9ybWF0KHRoaXMudG9vbHRpcFZhbHVlRm9ybWF0U3RyaW5nKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLnRvb2x0aXBWYWx1ZUZvcm1hdCA9IG51bGw7XG4gICAgfVxuXG4gICAgdGhpcy50b29sdGlwRGF0ZUZvcm1hdCA9IGQzX3RpbWVGb3JtYXQodGhpcy50b29sdGlwRGF0ZUZvcm1hdFN0cmluZyk7XG4gICAgdGhpcy50b29sdGlwUGVyY2VudEZvcm1hdCA9IGQzX2Zvcm1hdCh0aGlzLnRvb2x0aXBQZXJjZW50Rm9ybWF0U3RyaW5nKTtcbiAgICB0aGlzLnRvb2x0aXBDb21wYXJlQ2hhbmdlRm9ybWF0ID0gZDNfZm9ybWF0KHRoaXMuY29tcGFyZUNoYW5nZUZvcm1hdFN0cmluZyk7XG5cbiAgICAvLyBkZWZhdWx0cyBmb3IgYWxsIGNoYXJ0IHR5cGVzXG4gICAgdGhpcy5oaWRlWEF4aXNaZXJvID0gZmFsc2U7XG4gICAgdGhpcy5oaWRlWEF4aXNEb21haW4gPSB0cnVlO1xuICAgIHRoaXMuaGlkZVhBeGlzVGlja3MgPSB0cnVlO1xuICAgIHRoaXMueEF4aXNUaWNrU2l6ZSA9IDg7XG4gICAgdGhpcy54QXhpc1RpY2tTaXplT3V0ZXIgPSAwO1xuICAgIHRoaXMueEF4aXNUaXRsZU1hcmdpbiA9IHRoaXMueEF4aXNUaXRsZSA/IDIwIDogMDtcblxuICAgIGlmICghdGhpcy5oaWRlTGVnZW5kICYmIHRoaXMubGVnZW5kUG9zaXRpb24gPT09ICdyaWdodCcpIHtcbiAgICAgIHRoaXMud2lkdGggPSArdGhpcy53aWR0aCAtICt0aGlzLmxlZ2VuZFdpZHRoO1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZSB0aGUgY2hhcnRcbiAgICB0aGlzLmNoYXJ0ID0gZDNfc2VsZWN0KHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCkuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4gICAgLy8gY3JlYXRlIGNoYXJ0IHN2Z1xuICAgIHRoaXMuc3ZnID0gdGhpcy5jaGFydFxuICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgIC5hdHRyKCd3aWR0aCcsICgpID0+IHtcbiAgICAgICAgcmV0dXJuICt0aGlzLndpZHRoICsgdGhpcy5tYXJnaW4ubGVmdCArIHRoaXMubWFyZ2luLnJpZ2h0O1xuICAgICAgfSlcbiAgICAgIC5hdHRyKCdoZWlnaHQnLCArdGhpcy5oZWlnaHQgKyB0aGlzLm1hcmdpbi50b3AgKyB0aGlzLm1hcmdpbi5ib3R0b20gKyB0aGlzLnhBeGlzVGl0bGVNYXJnaW4pXG4gICAgICAuYXR0cignY2xhc3MnLCAnaW1nLWZsdWlkJylcbiAgICAgIC5hdHRyKCdwcmVzZXJ2ZUFzcGVjdFJhdGlvJywgJ3hNaW5ZTWluIG1lZXQnKVxuICAgICAgLmF0dHIoJ3ZpZXdCb3gnLCAoKSA9PiB7XG4gICAgICAgIHJldHVybiBgLSR7dGhpcy5tYXJnaW4ubGVmdH0gLSR7dGhpcy5tYXJnaW4udG9wfSAkeyt0aGlzLndpZHRoICsgdGhpcy5tYXJnaW4ubGVmdCArIHRoaXMubWFyZ2luLnJpZ2h0fSAkeyt0aGlzXG4gICAgICAgICAgLmhlaWdodCArXG4gICAgICAgICAgdGhpcy5tYXJnaW4udG9wICtcbiAgICAgICAgICB0aGlzLm1hcmdpbi5ib3R0b20gK1xuICAgICAgICAgIHRoaXMueEF4aXNUaXRsZU1hcmdpbn1gO1xuICAgICAgfSk7XG5cbiAgICAvLyBUT09MVElQXG4gICAgaWYgKCF0aGlzLmhpZGVUb29sdGlwKSB7XG4gICAgICB0aGlzLnRvb2x0aXAgPSBkM19zZWxlY3QoJ2JvZHknKVxuICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAncGJkcy10b29sdGlwIHNvdXRoJylcbiAgICAgICAgLmNsYXNzZWQoJ3BiZHMtdG9vbHRpcC1jb21wYXJlJywgdGhpcy5pc0NvbXBhcmUpXG4gICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDApXG4gICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7IC8vIGhpZGUgdG9vbHRpcCBmb3IgYWNjZXNzaWJpbGl0eVxuICAgIH1cblxuICAgIC8vIGFkZCBsZWdlbmQgY2xhc3Nlc1xuICAgIGlmICghdGhpcy5oaWRlTGVnZW5kICYmIHRoaXMuZGF0YS5sZW5ndGggPiAxKSB7XG4gICAgICB0aGlzLmNoYXJ0LmNsYXNzZWQoJ3BiZHMtY2hhcnQtbGVnZW5kLWJvdHRvbScsIHRoaXMubGVnZW5kUG9zaXRpb24gPT09ICdib3R0b20nID8gdHJ1ZSA6IGZhbHNlKTtcbiAgICAgIHRoaXMuY2hhcnQuYXBwZW5kKCd1bCcpLmF0dHIoJ2NsYXNzJywgYGxlZ2VuZCBsZWdlbmQtJHt0aGlzLmxlZ2VuZFBvc2l0aW9ufWApO1xuICAgIH1cblxuICAgIC8vIFggQVhJU1xuICAgIHRoaXMueEF4aXNTY2FsZSA9IGQzX3NjYWxlTGluZWFyKClcbiAgICAgIC5kb21haW4oWzAsIE1hdGguY2VpbChkM19zdW0odGhpcy5kYXRhLCAoZDogYW55KSA9PiBkLnZhbHVlKSldKVxuICAgICAgLnJhbmdlKFswLCArdGhpcy53aWR0aF0pO1xuXG4gICAgdGhpcy54QXhpc0NhbGwgPSBkM19heGlzQm90dG9tKHRoaXMueEF4aXNTY2FsZSlcbiAgICAgIC8vIC50aWNrVmFsdWVzKFswLCBkM19zdW0odGhpcy5kYXRhLCAoZDogYW55KSA9PiBkLnZhbHVlKV0pXG4gICAgICAudGlja3ModGhpcy54QXhpc1RpY2tzKVxuICAgICAgLnRpY2tTaXplKHRoaXMueEF4aXNUaWNrU2l6ZSlcbiAgICAgIC50aWNrU2l6ZU91dGVyKHRoaXMueEF4aXNUaWNrU2l6ZU91dGVyKVxuICAgICAgLnRpY2tGb3JtYXQodGhpcy54QXhpc0Zvcm1hdHRlcik7XG5cbiAgICB0aGlzLnhBeGlzID0gdGhpcy5zdmdcbiAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2F4aXMgYXhpcy14JylcbiAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKDAsICR7dGhpcy5oZWlnaHR9KWApXG4gICAgICAuY2xhc3NlZCgnYXhpcy1oaWRkZW4nLCB0aGlzLmhpZGVYQXhpcylcbiAgICAgIC5jbGFzc2VkKCdheGlzLXplcm8taGlkZGVuJywgdGhpcy5oaWRlWEF4aXNaZXJvKVxuICAgICAgLmNsYXNzZWQoJ2F4aXMtZG9tYWluLWhpZGRlbicsIHRoaXMuaGlkZVhBeGlzRG9tYWluKVxuICAgICAgLmNsYXNzZWQoJ2F4aXMtdGlja3MtaGlkZGVuJywgdGhpcy5oaWRlWEF4aXNUaWNrcyk7XG4gICAgLy8gLmNhbGwodGhpcy54QXhpc0NhbGwpO1xuXG4gICAgLy8gWCBHUklETElORVNcbiAgICBpZiAoIXRoaXMuaGlkZVhHcmlkKSB7XG4gICAgICB0aGlzLnhHcmlkQ2FsbCA9IGQzX2F4aXNCb3R0b20odGhpcy54QXhpc1NjYWxlKS50aWNrU2l6ZSgtdGhpcy5oZWlnaHQpO1xuXG4gICAgICB0aGlzLnhHcmlkID0gdGhpcy5zdmdcbiAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdncmlkIGdyaWQteCcpXG4gICAgICAgIC5jbGFzc2VkKCdncmlkLXplcm8taGlkZGVuJywgdGhpcy5oaWRlWEF4aXNaZXJvKVxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgwLCAke3RoaXMuaGVpZ2h0fSlgKVxuICAgICAgICAuY2FsbCh0aGlzLnhHcmlkQ2FsbCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMueEF4aXNUaXRsZSkge1xuICAgICAgdGhpcy5zdmdcbiAgICAgICAgLmFwcGVuZCgndGV4dCcpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdheGlzLXRpdGxlJylcbiAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ2NlbnRlcicpXG4gICAgICAgIC5hdHRyKCd4JywgdGhpcy53aWR0aCAvIDIgLSB0aGlzLm1hcmdpbi5sZWZ0KVxuICAgICAgICAuYXR0cigneScsIHRoaXMuaGVpZ2h0ICsgdGhpcy5tYXJnaW4udG9wICsgKCF0aGlzLmhpZGVYQXhpcyA/IDQwIDogMCkpXG4gICAgICAgIC50ZXh0KHRoaXMueEF4aXNUaXRsZSk7XG4gICAgfVxuXG4gICAgLy8gYnVpbGQgY29sb3IgcmFuZ2VzXG4gICAgbGV0IGNvbG9ycztcblxuICAgIGlmICh0aGlzLmlzU2luZ2xlRGF0YSkge1xuICAgICAgY29sb3JzID0gdGhpcy5fZGF0YXZpei5jcmVhdGVHcmFkaWVudERlZnModGhpcy5zdmcsIHRoaXMubW9ub2Nocm9tZSwgdGhpcy50aGVtZSwgZmFsc2UpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5tb25vY2hyb21lKSB7XG4gICAgICBjb2xvcnMgPSB0aGlzLl9kYXRhdml6LmdldENvbG9ycyh0aGlzLm1vbm9jaHJvbWUsIHRoaXMudGhlbWUpLnJldmVyc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29sb3JzID0gdGhpcy5fZGF0YXZpei5nZXRDb2xvcnModGhpcy5tb25vY2hyb21lLCB0aGlzLnRoZW1lKTtcbiAgICB9XG5cbiAgICB0aGlzLmNvbG9yUmFuZ2UgPSBkM19zY2FsZU9yZGluYWwoKS5yYW5nZShjb2xvcnMpO1xuXG4gICAgdGhpcy51cGRhdGVDaGFydCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmRhdGEgJiYgIWNoYW5nZXMuZGF0YS5maXJzdENoYW5nZSkge1xuICAgICAgdGhpcy51cGRhdGVDaGFydCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnRvb2x0aXApIHRoaXMudG9vbHRpcC5yZW1vdmUoKTtcbiAgfVxuXG4gIHVwZGF0ZUNoYXJ0KCkge1xuICAgIHRoaXMuaXNTaW5nbGVEYXRhID0gdGhpcy5kYXRhLmxlbmd0aCA9PT0gMSA/IHRydWUgOiBmYWxzZTtcbiAgICB0aGlzLmlzQ29tcGFyZSA9IE9iamVjdC5rZXlzKHRoaXMuZGF0YVswXSkuaW5jbHVkZXMoJ2NvbXBhcmVWYWx1ZScpO1xuXG4gICAgY29uc3Qgc3VtVmFsdWVzID0gZDNfc3VtKHRoaXMuZGF0YSwgKGQ6IGFueSkgPT4gZC52YWx1ZSk7XG4gICAgY29uc3QgaXNMYXN0QmFyWmVybyA9XG4gICAgICB0aGlzLmRhdGFbdGhpcy5kYXRhLmxlbmd0aCAtIDFdLnZhbHVlID09PSAwIHx8IHRoaXMuZGF0YVt0aGlzLmRhdGEubGVuZ3RoIC0gMV0udmFsdWUgPT09IG51bGwgPyB0cnVlIDogZmFsc2U7XG5cbiAgICBsZXQgbGFzdEJhclplcm9Db3VudCA9IDA7XG4gICAgY29uc3QgY2xvbmVEYXRhID0gWy4uLnRoaXMuZGF0YV07XG4gICAgbGV0IGlzTGFzdCA9IGZhbHNlO1xuXG4gICAgY2xvbmVEYXRhLnJldmVyc2UoKS5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgsIGFycmF5KSA9PiB7XG4gICAgICBpZiAoKHZhbHVlLnZhbHVlID09PSAwIHx8IHZhbHVlLnZhbHVlID09PSBudWxsKSAmJiAhaXNMYXN0KSB7XG4gICAgICAgIGxhc3RCYXJaZXJvQ291bnQrKztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlzTGFzdCA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5wZXJjZW50YWdlICYmICF0aGlzLmlzU2luZ2xlRGF0YSkge1xuICAgICAgdGhpcy54QXhpc1NjYWxlLmRvbWFpbihbMCwgc3VtVmFsdWVzXSkucmFuZ2UoWzAsICt0aGlzLndpZHRoXSk7XG4gICAgICB0aGlzLnhBeGlzQ2FsbC50aWNrVmFsdWVzKFswLCBzdW1WYWx1ZXMgKiAwLjI1LCBzdW1WYWx1ZXMgKiAwLjUsIHN1bVZhbHVlcyAqIDAuNzUsIHN1bVZhbHVlc10pO1xuICAgICAgdGhpcy54QXhpcy5jYWxsKHRoaXMueEF4aXNDYWxsKTtcblxuICAgICAgdGhpcy54R3JpZENhbGwudGlja1ZhbHVlcyhbMCwgc3VtVmFsdWVzICogMC4yNSwgc3VtVmFsdWVzICogMC41LCBzdW1WYWx1ZXMgKiAwLjc1LCBzdW1WYWx1ZXNdKTtcbiAgICAgIHRoaXMueEdyaWQuY2FsbCh0aGlzLnhHcmlkQ2FsbCk7XG5cbiAgICAgIHRoaXMuc3ZnXG4gICAgICAgIC5zZWxlY3QoJy5heGlzLXgnKVxuICAgICAgICAuc2VsZWN0QWxsKCd0ZXh0JylcbiAgICAgICAgLmh0bWwoKGQsIGkpID0+IHtcbiAgICAgICAgICBjb25zdCBmb3JtYXQgPSBkM19mb3JtYXQoJy4wJScpO1xuICAgICAgICAgIHJldHVybiBmb3JtYXQoaSAqIDAuMjUpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucGVyY2VudGFnZSAmJiB0aGlzLmlzU2luZ2xlRGF0YSkge1xuICAgICAgdGhpcy54QXhpc1NjYWxlLmRvbWFpbihbMCwgMS4wXSkucmFuZ2UoWzAsICt0aGlzLndpZHRoXSk7XG4gICAgICB0aGlzLnhBeGlzQ2FsbC50aWNrVmFsdWVzKFswLCAwLjI1LCAwLjUsIDAuNzUsIDEuMF0pO1xuICAgICAgdGhpcy54QXhpcy5jYWxsKHRoaXMueEF4aXNDYWxsKTtcblxuICAgICAgdGhpcy54R3JpZENhbGwudGlja1ZhbHVlcyhbMCwgMC4yNSwgMC41LCAwLjc1LCAxLjBdKTtcbiAgICAgIHRoaXMueEdyaWQuY2FsbCh0aGlzLnhHcmlkQ2FsbCk7XG5cbiAgICAgIHRoaXMuc3ZnXG4gICAgICAgIC5zZWxlY3QoJy5heGlzLXgnKVxuICAgICAgICAuc2VsZWN0QWxsKCd0ZXh0JylcbiAgICAgICAgLmh0bWwoKGQsIGkpID0+IHtcbiAgICAgICAgICBjb25zdCBmb3JtYXQgPSBkM19mb3JtYXQoJy4wJScpO1xuICAgICAgICAgIHJldHVybiBmb3JtYXQoaSAqIDAuMjUpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy54QXhpc1NjYWxlLmRvbWFpbihbMCwgTWF0aC5jZWlsKHN1bVZhbHVlcyldKS5yYW5nZShbMCwgK3RoaXMud2lkdGhdKTtcbiAgICAgIHRoaXMueEdyaWRDYWxsLnRpY2tWYWx1ZXModGhpcy54QXhpc1NjYWxlLnRpY2tzKCkuZmlsdGVyKG4gPT4gTnVtYmVyLmlzSW50ZWdlcihuKSkpOyAvLyByZW1vdmUgZGVjaW1hbCBncmlkIHZhbHVlc1xuXG4gICAgICB0aGlzLnhBeGlzXG4gICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgLmR1cmF0aW9uKDEwMDApXG4gICAgICAgIC5jYWxsKHRoaXMueEF4aXNDYWxsKTtcblxuICAgICAgLy8gdXBkYXRlIHRoZSBncmlkc1xuICAgICAgaWYgKCF0aGlzLmhpZGVYR3JpZCkge1xuICAgICAgICB0aGlzLnhHcmlkXG4gICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgIC5kdXJhdGlvbigxMDAwKVxuICAgICAgICAgIC5jYWxsKHRoaXMueEdyaWRDYWxsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnN2Z1xuICAgICAgLnNlbGVjdEFsbCgnLmJhcicpXG4gICAgICAuZGF0YSh0aGlzLmRhdGEpXG4gICAgICAuam9pbihcbiAgICAgICAgZW50ZXIgPT5cbiAgICAgICAgICBlbnRlclxuICAgICAgICAgICAgLmFwcGVuZCgncmVjdCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnYmFyJylcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIDApXG4gICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgKCkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQgLSB0aGlzLmJhclBhZGRpbmc7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ2ZpbGwnLCBkID0+IHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVEYXRhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGB1cmwoJHt0aGlzLl9sb2NhdGlvbi5wYXRoKCl9I2dyYWRpZW50LWhvcml6b250YWwtJHt0aGlzLmNvbG9yUmFuZ2UoZC5sYWJlbCkuc3Vic3RyKDEpfSlgO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbG9yUmFuZ2UoZC5sYWJlbCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cigneScsICgpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYmFyUGFkZGluZyAvIDI7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAoZCwgaSkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhLnNsaWNlKDAsIGkpLnJlZHVjZSgoYWNjLCBpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYWNjLCBpdGVtLCBhY2MgKyB0aGlzLnhBeGlzU2NhbGUoaXRlbS52YWx1ZSkgKyB0aGlzLmJhck1hcmdpbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuICthY2MgKyArdGhpcy54QXhpc1NjYWxlKGl0ZW0udmFsdWUpO1xuICAgICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cigncG9pbnRlci1ldmVudHMnLCAnbm9uZScpXG4gICAgICAgICAgICAuY2FsbChlbnRlciA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgZW50ZXJcbiAgICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAgIC8vIC5kdXJhdGlvbigwKVxuICAgICAgICAgICAgICAgICAgLmRlbGF5KChkLCBpKSA9PiBpICogMjUwKVxuICAgICAgICAgICAgICAgICAgLmVhc2UoZDNfZWFzZUxpbmVhcilcbiAgICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIChkLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGRlYnVnZ2VyO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gdGhpcy5kYXRhLmxlbmd0aCAtIGxhc3RCYXJaZXJvQ291bnQgLSAxICYmIGlzTGFzdEJhclplcm8pIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy54QXhpc1NjYWxlKGQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGkgIT09IHRoaXMuZGF0YS5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgbGV0IHdpZHRoID0gdGhpcy54QXhpc1NjYWxlKGQudmFsdWUpIC0gK3RoaXMuYmFyTWFyZ2luO1xuICAgICAgICAgICAgICAgICAgICAgIHdpZHRoID0gTWF0aC5zaWduKHdpZHRoKSA9PT0gLTEgPyAwIDogd2lkdGg7IC8vIGhhbmRsZSBuZWdhdGl2ZSB2YWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMueEF4aXNTY2FsZShkLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAgIC5hdHRyKCdwb2ludGVyLWV2ZW50cycsICdhdXRvJylcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICB1cGRhdGUgPT5cbiAgICAgICAgICB1cGRhdGVcbiAgICAgICAgICAgIC5hdHRyKCdwb2ludGVyLWV2ZW50cycsICdub25lJylcbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbigxMDAwKVxuICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgKGQsIGkpID0+IHtcbiAgICAgICAgICAgICAgLy8gZGVidWdnZXI7XG4gICAgICAgICAgICAgIGlmIChkLnZhbHVlID09PSBudWxsIHx8IGQudmFsdWUgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy54QXhpc1NjYWxlKDApO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGkgPT09IHRoaXMuZGF0YS5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMueEF4aXNTY2FsZShkLnZhbHVlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy54QXhpc1NjYWxlKGQudmFsdWUpIC0gdGhpcy5iYXJNYXJnaW47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cigneCcsIChkLCBpKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGEuc2xpY2UoMCwgaSkucmVkdWNlKChhY2MsIGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjICsgK3RoaXMueEF4aXNTY2FsZShpdGVtLnZhbHVlKTtcbiAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmF0dHIoJ3BvaW50ZXItZXZlbnRzJywgJ2F1dG8nKSxcbiAgICAgICAgZXhpdCA9PlxuICAgICAgICAgIGV4aXRcbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5hdHRyKCdwb2ludGVyLWV2ZW50cycsICdub25lJylcbiAgICAgICAgICAgIC5yZW1vdmUoKVxuICAgICAgKVxuICAgICAgLm9uKCdtb3VzZW92ZXInLCAoZGF0YSwgaW5kZXgsIG5vZGVzKSA9PiB0aGlzLmJhck1vdXNlT3ZlcihkM19ldmVudCwgZGF0YSwgaW5kZXgsIG5vZGVzKSlcbiAgICAgIC5vbignbW91c2VvdXQnLCAoZGF0YSwgaW5kZXgsIG5vZGVzKSA9PiB0aGlzLmJhck1vdXNlT3V0KCkpXG4gICAgICAub24oJ2NsaWNrJywgKGRhdGEsIGluZGV4LCBub2RlcykgPT4gdGhpcy5iYXJNb3VzZUNsaWNrKGQzX2V2ZW50LCBkYXRhLCBpbmRleCwgbm9kZXMpKTtcblxuICAgIGlmICghdGhpcy5oaWRlTGVnZW5kKSB7XG4gICAgICB0aGlzLmNoYXJ0XG4gICAgICAgIC5zZWxlY3QoJy5sZWdlbmQnKVxuICAgICAgICAuc2VsZWN0QWxsKCcubGVnZW5kLWl0ZW0nKVxuICAgICAgICAuZGF0YSh0aGlzLmRhdGEpXG4gICAgICAgIC5qb2luKFxuICAgICAgICAgIGVudGVyID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxpID0gZW50ZXJcbiAgICAgICAgICAgICAgLmFwcGVuZCgnbGknKVxuICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kLWl0ZW0nKVxuICAgICAgICAgICAgICAuY2xhc3NlZCgnYWxpZ24taXRlbXMtc3RhcnQnLCB0aGlzLmlzQ29tcGFyZSk7XG5cbiAgICAgICAgICAgIGxpLmluc2VydCgnc3BhbicpXG4gICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQta2V5JylcbiAgICAgICAgICAgICAgLnN0eWxlKCdiYWNrZ3JvdW5kLWNvbG9yJywgZCA9PiB0aGlzLmNvbG9yUmFuZ2UoZC5sYWJlbCkpXG4gICAgICAgICAgICAgIC5jbGFzc2VkKCdtdC0xJywgdGhpcy5pc0NvbXBhcmUpO1xuXG4gICAgICAgICAgICBsaS5pbnNlcnQoJ3NwYW4nKVxuICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kLWRlc2NyaXB0aW9uJylcbiAgICAgICAgICAgICAgLmNsYXNzZWQoJ2QtZmxleCcsIHRoaXMuaXNDb21wYXJlKVxuICAgICAgICAgICAgICAuY2xhc3NlZCgnZmxleC1jb2x1bW4nLCB0aGlzLmlzQ29tcGFyZSk7XG5cbiAgICAgICAgICAgIGxpLnNlbGVjdCgnLmxlZ2VuZC1kZXNjcmlwdGlvbicpXG4gICAgICAgICAgICAgIC5pbnNlcnQoJ3NwYW4nKVxuICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kLWxhYmVsJylcbiAgICAgICAgICAgICAgLmh0bWwoZCA9PiB7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmxlZ2VuZExhYmVsRm9ybWF0VHlwZSkge1xuICAgICAgICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubGVnZW5kTGFiZWxGb3JtYXQoZC5sYWJlbCk7XG5cbiAgICAgICAgICAgICAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJzZWRUaW1lID0gZDNfaXNvUGFyc2UoZC5sYWJlbCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxlZ2VuZExhYmVsRm9ybWF0KHBhcnNlZFRpbWUpO1xuXG4gICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5sYWJlbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBsaS5zZWxlY3QoJy5sZWdlbmQtZGVzY3JpcHRpb24nKVxuICAgICAgICAgICAgICAuaW5zZXJ0KCdkaXYnKVxuICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kLWNoYW5nZScpXG4gICAgICAgICAgICAgIC5jbGFzc2VkKCdkLW5vbmUnLCAhdGhpcy5pc0NvbXBhcmUpO1xuXG4gICAgICAgICAgICBsaS5zZWxlY3QoJy5sZWdlbmQtY2hhbmdlJykuaHRtbChkID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwibWV0cmljLWJsb2NrLWluZGljYXRvciAke2QuY29tcGFyZUNoYW5nZURpcmVjdGlvbn0gJHtcbiAgICAgICAgICAgICAgICBkLmNvbXBhcmVDaGFuZ2VJbnZlcnNlID8gJ2ludmVyc2UnIDogJydcbiAgICAgICAgICAgICAgfSBtdC0xXCI+PHNwYW4+JHt0aGlzLnRvb2x0aXBDb21wYXJlQ2hhbmdlRm9ybWF0KGQuY29tcGFyZUNoYW5nZVZhbHVlKX08L3NwYW4+PC9kaXY+YDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gbGk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICB1cGRhdGUgPT4ge1xuICAgICAgICAgICAgdXBkYXRlLmNsYXNzZWQoJ2FsaWduLWl0ZW1zLXN0YXJ0JywgdGhpcy5pc0NvbXBhcmUpO1xuICAgICAgICAgICAgdXBkYXRlLnNlbGVjdCgnLmxlZ2VuZC1rZXknKS5jbGFzc2VkKCdtdC0xJywgdGhpcy5pc0NvbXBhcmUpO1xuICAgICAgICAgICAgdXBkYXRlLnNlbGVjdCgnLmxlZ2VuZC1jaGFuZ2UnKS5jbGFzc2VkKCdkLW5vbmUnLCAhdGhpcy5pc0NvbXBhcmUpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pc0NvbXBhcmUpIHtcbiAgICAgICAgICAgICAgdXBkYXRlLnNlbGVjdCgnLmxlZ2VuZC1jaGFuZ2UnKS5odG1sKGQgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cIm1ldHJpYy1ibG9jay1pbmRpY2F0b3IgJHtkLmNvbXBhcmVDaGFuZ2VEaXJlY3Rpb259ICR7XG4gICAgICAgICAgICAgICAgICBkLmNvbXBhcmVDaGFuZ2VJbnZlcnNlID8gJ2ludmVyc2UnIDogJydcbiAgICAgICAgICAgICAgICB9IG10LTFcIj48c3Bhbj4ke3RoaXMudG9vbHRpcENvbXBhcmVDaGFuZ2VGb3JtYXQoZC5jb21wYXJlQ2hhbmdlVmFsdWUpfTwvc3Bhbj48L2Rpdj5gO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdXBkYXRlLnNlbGVjdCgnLmxlZ2VuZC1sYWJlbCcpLmh0bWwoZCA9PiB7XG4gICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5sZWdlbmRMYWJlbEZvcm1hdFR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubGVnZW5kTGFiZWxGb3JtYXQoZC5sYWJlbCk7XG5cbiAgICAgICAgICAgICAgICBjYXNlICd0aW1lJzpcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnNlZFRpbWUgPSBkM19pc29QYXJzZShkLmxhYmVsKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxlZ2VuZExhYmVsRm9ybWF0KHBhcnNlZFRpbWUpO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgIHJldHVybiBkLmxhYmVsO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHVwZGF0ZTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGV4aXQgPT4gZXhpdC5yZW1vdmUoKVxuICAgICAgICApXG4gICAgICAgIC5vbignbW91c2VvdmVyJywgKGRhdGEsIGluZGV4LCBub2RlcykgPT4gdGhpcy5sZWdlbmRNb3VzZU92ZXIoZDNfZXZlbnQsIGRhdGEsIGluZGV4LCBub2RlcykpXG4gICAgICAgIC5vbignbW91c2VvdXQnLCAoKSA9PiB0aGlzLmxlZ2VuZE1vdXNlT3V0KCkpXG4gICAgICAgIC5vbignY2xpY2snLCAoZGF0YSwgaW5kZXgsIG5vZGVzKSA9PiB0aGlzLmxlZ2VuZE1vdXNlQ2xpY2soZDNfZXZlbnQsIGRhdGEsIGluZGV4LCBub2RlcykpO1xuICAgIH1cbiAgfVxuXG4gIGJhck1vdXNlT3ZlciA9IChldmVudCwgZGF0YSwgaW5kZXgsIG5vZGVzKSA9PiB7XG4gICAgY29uc3Qgbm9kZSA9IGQzX3NlbGVjdChub2Rlc1tpbmRleF0pO1xuXG4gICAgdGhpcy5jaGFydC5zZWxlY3RBbGwoJy5iYXInKS5jbGFzc2VkKCdpbmFjdGl2ZScsIHRydWUpO1xuXG4gICAgbm9kZS5jbGFzc2VkKCdpbmFjdGl2ZScsIGZhbHNlKTtcblxuICAgIHRoaXMuY2hhcnRcbiAgICAgIC5zZWxlY3RBbGwoJy5sZWdlbmQtaXRlbScpXG4gICAgICAuZmlsdGVyKChkLCBpKSA9PiB7XG4gICAgICAgIC8vIGRlYnVnZ2VyO1xuICAgICAgICByZXR1cm4gaSAhPT0gaW5kZXg7XG4gICAgICB9KVxuICAgICAgLmNsYXNzZWQoJ2luYWN0aXZlJywgdHJ1ZSk7XG5cbiAgICB0aGlzLnRvb2x0aXBTaG93KGRhdGEsIG5vZGVzW2luZGV4XSk7XG5cbiAgICB0aGlzLmhvdmVyZWQuZW1pdCh7IGV2ZW50LCBkYXRhIH0pO1xuICB9O1xuXG4gIGJhck1vdXNlT3V0ID0gKCkgPT4ge1xuICAgIHRoaXMuY2hhcnRcbiAgICAgIC5zZWxlY3RBbGwoJy5iYXInKVxuICAgICAgLmNsYXNzZWQoJ2luYWN0aXZlJywgZmFsc2UpXG4gICAgICAuc3R5bGUoJ2ZpbGwnLCBudWxsKTtcblxuICAgIHRoaXMuY2hhcnQuc2VsZWN0QWxsKCcubGVnZW5kLWl0ZW0nKS5jbGFzc2VkKCdpbmFjdGl2ZScsIGZhbHNlKTtcblxuICAgIHRoaXMudG9vbHRpcEhpZGUoKTtcbiAgfTtcblxuICBiYXJNb3VzZUNsaWNrID0gKGV2ZW50LCBkYXRhLCBpbmRleCwgbm9kZXMpID0+IHtcbiAgICB0aGlzLmNsaWNrZWQuZW1pdCh7IGV2ZW50LCBkYXRhIH0pO1xuICB9O1xuXG4gIHByaXZhdGUgdG9vbHRpcFNob3cgPSAoZGF0YSwgbm9kZSkgPT4ge1xuICAgIGNvbnN0IGRpbWVuc2lvbnMgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHNjcm9sbCA9IHRoaXMuX3Njcm9sbC5nZXRTY3JvbGxQb3NpdGlvbigpO1xuXG4gICAgY29uc3QgcGVyY2VudGFnZSA9IGRhdGEudmFsdWUgLyBkM19zdW0odGhpcy5kYXRhLCAoZDogYW55KSA9PiBkLnZhbHVlKTtcbiAgICBjb25zdCBjb21wYXJlUGVyY2VudGFnZSA9IGRhdGEuY29tcGFyZVZhbHVlIC8gZDNfc3VtKHRoaXMuZGF0YSwgKGQ6IGFueSkgPT4gZC5jb21wYXJlVmFsdWUpO1xuXG4gICAgbGV0IHRvb2x0aXBMYWJlbCA9IGBgO1xuICAgIGxldCB0b29sdGlwQ29tcGFyZURhdGVyYW5nZU1hcmdpbiA9IGBgO1xuICAgIGxldCB0b29sdGlwQ29tcGFyZURhdGVyYW5nZSA9IGBgO1xuICAgIGxldCB0b29sdGlwQ29tcGFyZVZhbHVlID0gYGA7XG4gICAgbGV0IHRvb2x0aXBEYXRlcmFuZ2VNYXJnaW4gPSBgYDtcbiAgICBsZXQgdG9vbHRpcERhdGVyYW5nZSA9IGBgO1xuICAgIGxldCB0b29sdGlwVmFsdWUgPSBgJHt0aGlzLm51bGxWYWx1ZVRleHR9YDtcbiAgICBsZXQgdG9vbHRpcEluZGljYXRvciA9ICcnO1xuXG4gICAgLy8gdG9vbHRpcCBsYWJlbFxuICAgIGlmICghdGhpcy5pc1NpbmdsZURhdGEpIHtcbiAgICAgIHRoaXMudG9vbHRpcC5jbGFzc2VkKCdwYmRzLXRvb2x0aXAtY29tcGFyZScsIG51bGwpO1xuXG4gICAgICBzd2l0Y2ggKHRoaXMudG9vbHRpcExhYmVsRm9ybWF0VHlwZSkge1xuICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgIHRvb2x0aXBMYWJlbCA9IHRoaXMudG9vbHRpcExhYmVsRm9ybWF0KGRhdGEubGFiZWwpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgICAgIGNvbnN0IHBhcnNlZFRpbWUgPSBkM19pc29QYXJzZShkYXRhLmxhYmVsKTtcbiAgICAgICAgICB0b29sdGlwTGFiZWwgPSB0aGlzLnRvb2x0aXBMYWJlbEZvcm1hdChwYXJzZWRUaW1lKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRvb2x0aXBMYWJlbCA9IGRhdGEubGFiZWw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gdG9vbHRpcCBjb21wYXJlIGRhdGVyYW5nZVxuICAgIGlmICh0aGlzLmlzQ29tcGFyZSAmJiBkYXRhLmNvbXBhcmVTdGFydERhdGUgJiYgZGF0YS5jb21wYXJlRW5kRGF0ZSkge1xuICAgICAgdGhpcy50b29sdGlwLmNsYXNzZWQoJ3BiZHMtdG9vbHRpcC1jb21wYXJlJywgdGhpcy5pc0NvbXBhcmUpO1xuICAgICAgdG9vbHRpcENvbXBhcmVEYXRlcmFuZ2VNYXJnaW4gPSBgbXQtMmA7XG5cbiAgICAgIHRvb2x0aXBDb21wYXJlRGF0ZXJhbmdlID0gYCR7dGhpcy50b29sdGlwRGF0ZUZvcm1hdChcbiAgICAgICAgZDNfaXNvUGFyc2UoZGF0YS5jb21wYXJlU3RhcnREYXRlKVxuICAgICAgKX0gLSAke3RoaXMudG9vbHRpcERhdGVGb3JtYXQoZDNfaXNvUGFyc2UoZGF0YS5jb21wYXJlRW5kRGF0ZSkpfWA7XG4gICAgfVxuXG4gICAgLy8gdG9vbHRpcCBjb21wYXJlIHZhbHVlXG4gICAgaWYgKHRoaXMucGVyY2VudGFnZSAmJiB0aGlzLmlzQ29tcGFyZSAmJiBkYXRhLmNvbXBhcmVWYWx1ZSkge1xuICAgICAgdG9vbHRpcENvbXBhcmVWYWx1ZSA9XG4gICAgICAgIHRoaXMudG9vbHRpcFZhbHVlRm9ybWF0ID09PSBudWxsXG4gICAgICAgICAgPyBgJHt0aGlzLnRvb2x0aXBQZXJjZW50Rm9ybWF0KGNvbXBhcmVQZXJjZW50YWdlKX0gKCR7ZGF0YS5jb21wYXJ2ZVZhbHVlfSR7dGhpcy50b29sdGlwVmFsdWVTdWZmaXh9KWBcbiAgICAgICAgICA6IGAke3RoaXMudG9vbHRpcFBlcmNlbnRGb3JtYXQoY29tcGFyZVBlcmNlbnRhZ2UpfSAoJHt0aGlzLnRvb2x0aXBWYWx1ZUZvcm1hdChkYXRhLmNvbXBhcmVWYWx1ZSl9JHtcbiAgICAgICAgICAgICAgdGhpcy50b29sdGlwVmFsdWVTdWZmaXhcbiAgICAgICAgICAgIH0pYDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNDb21wYXJlICYmIGRhdGEuY29tcGFyZVZhbHVlICE9PSBudWxsKSB7XG4gICAgICB0b29sdGlwQ29tcGFyZVZhbHVlID1cbiAgICAgICAgdGhpcy50b29sdGlwVmFsdWVGb3JtYXQgPT09IG51bGxcbiAgICAgICAgICA/IGAke2RhdGEuY29tcGFyZVZhbHVlfSR7dGhpcy50b29sdGlwVmFsdWVTdWZmaXh9ICgke3RoaXMudG9vbHRpcFBlcmNlbnRGb3JtYXQoY29tcGFyZVBlcmNlbnRhZ2UpfSlgXG4gICAgICAgICAgOiBgJHt0aGlzLnRvb2x0aXBWYWx1ZUZvcm1hdChkYXRhLmNvbXBhcmVWYWx1ZSl9JHt0aGlzLnRvb2x0aXBWYWx1ZVN1ZmZpeH0gKCR7dGhpcy50b29sdGlwUGVyY2VudEZvcm1hdChcbiAgICAgICAgICAgICAgY29tcGFyZVBlcmNlbnRhZ2VcbiAgICAgICAgICAgICl9KWA7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzQ29tcGFyZSAmJiBkYXRhLmNvbXBhcmVWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgdG9vbHRpcENvbXBhcmVWYWx1ZSA9IGAke3RoaXMubnVsbFZhbHVlVGV4dH1gO1xuICAgIH1cblxuICAgIC8vIHRvb2x0aXAgZGF0ZXJhbmdlXG4gICAgaWYgKGRhdGEuc3RhcnREYXRlICYmIGRhdGEuZW5kRGF0ZSkge1xuICAgICAgdG9vbHRpcERhdGVyYW5nZSA9IGAke3RoaXMudG9vbHRpcERhdGVGb3JtYXQoZDNfaXNvUGFyc2UoZGF0YS5zdGFydERhdGUpKX0gLSAke3RoaXMudG9vbHRpcERhdGVGb3JtYXQoXG4gICAgICAgIGQzX2lzb1BhcnNlKGRhdGEuZW5kRGF0ZSlcbiAgICAgICl9YDtcbiAgICB9XG5cbiAgICAvL3Rvb2x0aXAgZGF0ZXJhbmdlIG1hcmdpblxuICAgIGlmICh0b29sdGlwTGFiZWwgIT09ICcnKSB7XG4gICAgICB0b29sdGlwRGF0ZXJhbmdlTWFyZ2luID0gYG10LTJgO1xuICAgIH1cblxuICAgIC8vIHRvb2x0aXAgdmFsdWVcbiAgICBpZiAodGhpcy5pc1NpbmdsZURhdGEgJiYgdGhpcy5wZXJjZW50YWdlICYmIGRhdGEudmFsdWUpIHtcbiAgICAgIHRvb2x0aXBWYWx1ZSA9IHRoaXMudG9vbHRpcFZhbHVlRm9ybWF0ID09PSBudWxsID8gYCR7ZGF0YS52YWx1ZX1gIDogYCR7dGhpcy50b29sdGlwVmFsdWVGb3JtYXQoZGF0YS52YWx1ZSl9YDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNTaW5nbGVEYXRhICYmIGRhdGEudmFsdWUgIT09IG51bGwpIHtcbiAgICAgIHRvb2x0aXBWYWx1ZSA9XG4gICAgICAgIHRoaXMudG9vbHRpcFZhbHVlRm9ybWF0ID09PSBudWxsXG4gICAgICAgICAgPyBgJHtkYXRhLnZhbHVlfSR7dGhpcy50b29sdGlwVmFsdWVTdWZmaXh9YFxuICAgICAgICAgIDogYCR7dGhpcy50b29sdGlwVmFsdWVGb3JtYXQoZGF0YS52YWx1ZSl9JHt0aGlzLnRvb2x0aXBWYWx1ZVN1ZmZpeH1gO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuaXNTaW5nbGVEYXRhICYmIHRoaXMucGVyY2VudGFnZSAmJiBkYXRhLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICB0b29sdGlwVmFsdWUgPVxuICAgICAgICB0aGlzLnRvb2x0aXBWYWx1ZUZvcm1hdCA9PT0gbnVsbFxuICAgICAgICAgID8gYCR7dGhpcy50b29sdGlwUGVyY2VudEZvcm1hdChwZXJjZW50YWdlKX0gKCR7ZGF0YS52YWx1ZX0ke3RoaXMudG9vbHRpcFZhbHVlU3VmZml4fSlgXG4gICAgICAgICAgOiBgJHt0aGlzLnRvb2x0aXBQZXJjZW50Rm9ybWF0KHBlcmNlbnRhZ2UpfSAoJHt0aGlzLnRvb2x0aXBWYWx1ZUZvcm1hdChkYXRhLnZhbHVlKX0ke1xuICAgICAgICAgICAgICB0aGlzLnRvb2x0aXBWYWx1ZVN1ZmZpeFxuICAgICAgICAgICAgfSlgO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuaXNTaW5nbGVEYXRhICYmIGRhdGEudmFsdWUgIT09IG51bGwpIHtcbiAgICAgIHRvb2x0aXBWYWx1ZSA9XG4gICAgICAgIHRoaXMudG9vbHRpcFZhbHVlRm9ybWF0ID09PSBudWxsXG4gICAgICAgICAgPyBgJHtkYXRhLnZhbHVlfSR7dGhpcy50b29sdGlwVmFsdWVTdWZmaXh9ICgke3RoaXMudG9vbHRpcFBlcmNlbnRGb3JtYXQocGVyY2VudGFnZSl9KWBcbiAgICAgICAgICA6IGAke3RoaXMudG9vbHRpcFZhbHVlRm9ybWF0KGRhdGEudmFsdWUpfSR7dGhpcy50b29sdGlwVmFsdWVTdWZmaXh9ICgke3RoaXMudG9vbHRpcFBlcmNlbnRGb3JtYXQoXG4gICAgICAgICAgICAgIHBlcmNlbnRhZ2VcbiAgICAgICAgICAgICl9KWA7XG4gICAgfVxuXG4gICAgLy8gdG9vbHRpcCBtZXRyaWMgaW5kaWNhdG9yXG4gICAgaWYgKCF0aGlzLmlzU2luZ2xlRGF0YSAmJiB0aGlzLmlzQ29tcGFyZSAmJiBkYXRhLnZhbHVlICE9PSBudWxsICYmIGRhdGEuY29tcGFyZVZhbHVlICE9PSBudWxsKSB7XG4gICAgICB0b29sdGlwSW5kaWNhdG9yID0gYDxkaXYgY2xhc3M9XCJtZXRyaWMtYmxvY2staW5kaWNhdG9yICR7ZGF0YS5jb21wYXJlQ2hhbmdlRGlyZWN0aW9ufSAke1xuICAgICAgICBkYXRhLmNvbXBhcmVDaGFuZ2VJbnZlcnNlID8gJ2ludmVyc2UnIDogJydcbiAgICAgIH0gbWwtMlwiPjxzcGFuPiR7dGhpcy50b29sdGlwQ29tcGFyZUNoYW5nZUZvcm1hdChkYXRhLmNvbXBhcmVDaGFuZ2VWYWx1ZSl9PC9zcGFuPjwvZGl2PmA7XG4gICAgfVxuXG4gICAgdGhpcy50b29sdGlwLmh0bWwoKCkgPT4ge1xuICAgICAgcmV0dXJuIGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInRvb2x0aXAtbGFiZWwgZm9udC13ZWlnaHQtYm9sZFwiPiR7dG9vbHRpcExhYmVsfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiJHt0b29sdGlwQ29tcGFyZURhdGVyYW5nZU1hcmdpbn1cIj4ke3Rvb2x0aXBDb21wYXJlRGF0ZXJhbmdlfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidG9vbHRpcC12YWx1ZSBmb250LXdlaWdodC1ib2xkXCI+JHt0b29sdGlwQ29tcGFyZVZhbHVlfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiJHt0b29sdGlwRGF0ZXJhbmdlTWFyZ2lufVwiPiR7dG9vbHRpcERhdGVyYW5nZX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRvb2x0aXAtdmFsdWVcIj48c3BhbiBjbGFzcz1cImZvbnQtd2VpZ2h0LWJvbGRcIj4ke3Rvb2x0aXBWYWx1ZX08L3NwYW4+IDxzcGFuPiR7dG9vbHRpcEluZGljYXRvcn08L3NwYW4+PC9kaXY+XG4gICAgICBgO1xuICAgIH0pO1xuXG4gICAgY29uc3QgdG9vbHRpcE9mZnNldFdpZHRoID0gK3RoaXMudG9vbHRpcC5ub2RlKCkub2Zmc2V0V2lkdGggLyAyO1xuICAgIGNvbnN0IHRvb2x0aXBPZmZzZXRIZWlnaHQgPSArdGhpcy50b29sdGlwLm5vZGUoKS5vZmZzZXRIZWlnaHQ7XG4gICAgY29uc3QgdG9vbHRpcFRpcFNpemUgPSA4O1xuXG4gICAgdGhpcy50b29sdGlwLnN0eWxlKCd0b3AnLCBgJHsrc2Nyb2xsWzFdICsgK2RpbWVuc2lvbnMudG9wIC0gdG9vbHRpcE9mZnNldEhlaWdodCAtIHRvb2x0aXBUaXBTaXplfXB4YCk7XG5cbiAgICBpZiAodGhpcy5kYXRhLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRoaXMudG9vbHRpcC5zdHlsZSgnbGVmdCcsIGAkeytzY3JvbGxbMF0gKyArZGltZW5zaW9ucy5sZWZ0IC0gdG9vbHRpcE9mZnNldFdpZHRoICsgK2RpbWVuc2lvbnMud2lkdGggLyAyfXB4YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudG9vbHRpcC5zdHlsZSgnbGVmdCcsIGAkeytzY3JvbGxbMF0gLSB0b29sdGlwT2Zmc2V0V2lkdGggKyArZGltZW5zaW9ucy5yaWdodH1weGApO1xuICAgIH1cblxuICAgIHRoaXMudG9vbHRpcC5zdHlsZSgnb3BhY2l0eScsIDEpO1xuICB9O1xuXG4gIHByaXZhdGUgdG9vbHRpcEhpZGUgPSAoKSA9PiB7XG4gICAgdGhpcy50b29sdGlwLnN0eWxlKCdvcGFjaXR5JywgMCk7XG4gIH07XG5cbiAgbGVnZW5kTW91c2VPdmVyID0gKGV2ZW50LCBkYXRhLCBpbmRleCwgbm9kZXMpID0+IHtcbiAgICBpZiAoIXRoaXMuaGlkZUxlZ2VuZFRvb2x0aXApIHtcbiAgICAgIGNvbnN0IGJhckhvdmVyID0gdGhpcy5zdmdcbiAgICAgICAgLnNlbGVjdEFsbCgnLmJhcicpXG4gICAgICAgIC5maWx0ZXIoKGQsIGkpID0+IGkgPT09IGluZGV4KVxuICAgICAgICAubm9kZSgpO1xuXG4gICAgICB0aGlzLnRvb2x0aXBTaG93KGRhdGEsIGJhckhvdmVyKTtcbiAgICB9XG5cbiAgICB0aGlzLmNoYXJ0XG4gICAgICAuc2VsZWN0QWxsKCcubGVnZW5kLWl0ZW0nKVxuICAgICAgLmZpbHRlcigoZCwgaSkgPT4gaSAhPT0gaW5kZXgpXG4gICAgICAuY2xhc3NlZCgnaW5hY3RpdmUnLCB0cnVlKTtcblxuICAgIHRoaXMuY2hhcnRcbiAgICAgIC5zZWxlY3RBbGwoJy5iYXInKVxuICAgICAgLmZpbHRlcigoZCwgaSkgPT4gaSAhPT0gaW5kZXgpXG4gICAgICAuY2xhc3NlZCgnaW5hY3RpdmUnLCB0cnVlKTtcblxuICAgIHRoaXMuY2hhcnRcbiAgICAgIC5zZWxlY3RBbGwoJy5iYXInKVxuICAgICAgLmZpbHRlcigoZCwgaSkgPT4gaSA9PT0gaW5kZXgpXG4gICAgICAuY2xhc3NlZCgnaW5hY3RpdmUnLCBudWxsKTtcblxuICAgIHRoaXMuaG92ZXJlZC5lbWl0KHsgZXZlbnQsIGRhdGEgfSk7XG4gIH07XG5cbiAgbGVnZW5kTW91c2VPdXQgPSAoKSA9PiB7XG4gICAgdGhpcy5jaGFydC5zZWxlY3RBbGwoJy5sZWdlbmQtaXRlbScpLmNsYXNzZWQoJ2luYWN0aXZlJywgZmFsc2UpO1xuXG4gICAgdGhpcy5jaGFydFxuICAgICAgLnNlbGVjdEFsbCgnLmJhcicpXG4gICAgICAuY2xhc3NlZCgnaW5hY3RpdmUnLCBmYWxzZSlcbiAgICAgIC5zdHlsZSgnZmlsbCcsIG51bGwpO1xuXG4gICAgLy8gaGlkZSB0b29sdGlwIGZvciB6ZXJvL251bGwgdmFsdWVzXG4gICAgdGhpcy50b29sdGlwSGlkZSgpO1xuICB9O1xuXG4gIGxlZ2VuZE1vdXNlQ2xpY2sgPSAoZXZlbnQsIGRhdGEsIGluZGV4LCBub2RlcykgPT4ge1xuICAgIHRoaXMuY2xpY2tlZC5lbWl0KHsgZXZlbnQsIGRhdGEgfSk7XG4gIH07XG5cbiAgcHJpdmF0ZSB4QXhpc0Zvcm1hdHRlciA9IGl0ZW0gPT4ge1xuICAgIHN3aXRjaCAodGhpcy54QXhpc0Zvcm1hdFR5cGUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIHJldHVybiBgJHt0aGlzLnhBeGlzRm9ybWF0KGl0ZW0pfSR7dGhpcy54QXhpc1RpY2tMYWJlbFN1ZmZpeH1gO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gYCR7aXRlbX0ke3RoaXMueEF4aXNUaWNrTGFiZWxTdWZmaXh9YDtcbiAgICB9XG4gIH07XG59XG4iXX0=