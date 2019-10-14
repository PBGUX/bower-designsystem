/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, HostBinding, Input, Output, ElementRef, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { PbdsDatavizService } from './dataviz.service';
import { select as d3_select, isoParse as d3_isoParse, timeFormat as d3_timeFormat, format as d3_format, scaleBand as d3_scaleBand, scaleThreshold as d3_scaleThreshold, scaleQuantile as d3_scaleQuantile, scaleQuantize as d3_scaleQuantize, min as d3_min, max as d3_max, axisBottom as d3_axisBottom, axisLeft as d3_axisLeft, event as d3_event } from 'd3';
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
        this.hovered = new EventEmitter();
        this.clicked = new EventEmitter();
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
            function (data, index, nodes) { return _this.blockMouseOver(d3_event, data, index, nodes); }))
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
            function (data, index, nodes) { return _this.blockMouseClick(d3_event, data, index, nodes); }));
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
                    return d.value < data || d.value >= +d3_select(nodes[index + 1]).data()[0];
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
                    var parsedTime = d3_isoParse(data.yLabel);
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
                    var parsedTime = d3_isoParse(data.xLabel);
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
                    var parseDate = d3_isoParse(item);
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
                    var parseDate = d3_isoParse(item);
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
        switch (this.yAxisFormatType) {
            case 'number':
                this.yAxisFormat = d3_format(this.yAxisFormatString);
                break;
            case 'time':
                this.yAxisFormat = d3_timeFormat(this.yAxisFormatString);
                break;
            default:
                this.yAxisFormat = null;
                break;
        }
        switch (this.xAxisFormatType) {
            case 'number':
                this.xAxisFormat = d3_format(this.xAxisFormatString);
                break;
            case 'time':
                this.xAxisFormat = d3_timeFormat(this.xAxisFormatString);
                break;
            default:
                this.xAxisFormat = null;
                break;
        }
        switch (this.legendLabelFormatType) {
            case 'number':
                this.legendLabelFormat = d3_format(this.legendLabelFormatString);
                break;
            default:
                this.legendLabelFormat = null;
                break;
        }
        switch (this.tooltipYLabelFormatType) {
            case 'number':
                this.tooltipYLabelFormat = d3_format(this.tooltipYLabelFormatString);
                break;
            case 'time':
                this.tooltipYLabelFormat = d3_timeFormat(this.tooltipYLabelFormatString);
                break;
            default:
                this.tooltipYLabelFormat = null;
                break;
        }
        switch (this.tooltipXLabelFormatType) {
            case 'number':
                this.tooltipXLabelFormat = d3_format(this.tooltipXLabelFormatString);
                break;
            case 'time':
                this.tooltipXLabelFormat = d3_timeFormat(this.tooltipXLabelFormatString);
                break;
            default:
                this.tooltipXLabelFormat = null;
                break;
        }
        switch (this.tooltipValueFormatType) {
            case 'number':
                this.tooltipValueFormat = d3_format(this.tooltipValueFormatString);
                break;
            default:
                this.tooltipValueFormat = null;
        }
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
        this.chart = d3_select(this._element.nativeElement).attr('aria-hidden', 'true');
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
            +d3_min(this.data, (/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return d.value; })),
            +d3_max(this.data, (/**
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
                this.colorRange = d3_scaleThreshold()
                    .domain(this.domain)
                    .range(colors);
                this.colorDomain = this.colorRange.domain();
                break;
            case 'quantile':
                this.colorRange = d3_scaleQuantile()
                    .domain(colorValues)
                    .range(colors);
                this.colorDomain = this.colorRange.quantiles();
                break;
            case 'quantize':
                this.colorRange = d3_scaleQuantize()
                    .domain(colorDomain)
                    .range(colors);
                this.colorDomain = this.colorRange.thresholds();
                break;
        }
        // console.log(colors, colorDomain, colorValues, this.scale, this.colorRange, this.colorDomain);
        // define axis labels
        /** @type {?} */
        var xAxisLabels = tslib_1.__spread(new Set(this.data.map((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.xLabel; }))));
        /** @type {?} */
        var yAxisLabels = tslib_1.__spread(new Set(this.data.map((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.yLabel; })))).reverse();
        // X axis
        this.xAxisScale = d3_scaleBand()
            .domain(xAxisLabels)
            .rangeRound([0, this.width - this.margin.left])
            .paddingInner(0.1);
        this.xAxisCall = d3_axisBottom(this.xAxisScale)
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
        this.yAxisScale = d3_scaleBand()
            .domain(yAxisLabels)
            .rangeRound([this.height, 0])
            .paddingInner(0.1);
        this.yAxisCall = d3_axisLeft(this.yAxisScale)
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
            this.tooltip = d3_select('body')
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
        { type: Component, args: [{
                    selector: 'pbds-dataviz-heatmap',
                    template: "",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    PbdsDatavizHeatmapComponent.ctorParameters = function () { return [
        { type: PbdsDatavizService },
        { type: ElementRef },
        { type: ViewportScroller }
    ]; };
    PbdsDatavizHeatmapComponent.propDecorators = {
        chartClass: [{ type: HostBinding, args: ['class.pbds-chart',] }],
        heatmapClass: [{ type: HostBinding, args: ['class.pbds-chart-heatmap',] }],
        data: [{ type: Input }],
        width: [{ type: Input }],
        height: [{ type: Input }],
        marginTop: [{ type: Input }],
        marginRight: [{ type: Input }],
        marginBottom: [{ type: Input }],
        marginLeft: [{ type: Input }],
        scale: [{ type: Input }],
        domain: [{ type: Input }],
        xAxisFormatType: [{ type: Input }],
        xAxisFormatString: [{ type: Input }],
        yAxisFormatType: [{ type: Input }],
        yAxisFormatString: [{ type: Input }],
        hideLegend: [{ type: Input }],
        legendWidth: [{ type: Input }],
        legendPosition: [{ type: Input }],
        legendLabelFormatType: [{ type: Input }],
        legendLabelFormatString: [{ type: Input }],
        tooltipXLabelFormatType: [{ type: Input }],
        tooltipXLabelFormatString: [{ type: Input }],
        tooltipYLabelFormatType: [{ type: Input }],
        tooltipYLabelFormatString: [{ type: Input }],
        tooltipValueFormatType: [{ type: Input }],
        tooltipValueFormatString: [{ type: Input }],
        theme: [{ type: Input }],
        hovered: [{ type: Output }],
        clicked: [{ type: Output }]
    };
    return PbdsDatavizHeatmapComponent;
}());
export { PbdsDatavizHeatmapComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXZpei1oZWF0bWFwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3BiLWRlc2lnbi1zeXN0ZW0vIiwic291cmNlcyI6WyJsaWIvZGF0YXZpei9kYXRhdml6LWhlYXRtYXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFHVCxXQUFXLEVBQ1gsS0FBSyxFQUNMLE1BQU0sRUFDTixVQUFVLEVBRVYsWUFBWSxFQUNaLHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUduRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUV2RCxPQUFPLEVBQ0wsTUFBTSxJQUFJLFNBQVMsRUFDbkIsUUFBUSxJQUFJLFdBQVcsRUFDdkIsVUFBVSxJQUFJLGFBQWEsRUFDM0IsTUFBTSxJQUFJLFNBQVMsRUFDbkIsU0FBUyxJQUFJLFlBQVksRUFDekIsY0FBYyxJQUFJLGlCQUFpQixFQUNuQyxhQUFhLElBQUksZ0JBQWdCLEVBQ2pDLGFBQWEsSUFBSSxnQkFBZ0IsRUFDakMsR0FBRyxJQUFJLE1BQU0sRUFDYixHQUFHLElBQUksTUFBTSxFQUNiLFVBQVUsSUFBSSxhQUFhLEVBQzNCLFFBQVEsSUFBSSxXQUFXLEVBQ3ZCLEtBQUssSUFBSSxRQUFRLEVBQ2xCLE1BQU0sSUFBSSxDQUFDO0FBRVo7SUE4SEUscUNBQW9CLFFBQTRCLEVBQVUsUUFBb0IsRUFBVSxPQUF5QjtRQUFqSCxpQkFBcUg7UUFBakcsYUFBUSxHQUFSLFFBQVEsQ0FBb0I7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFZO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUF0SGpILGVBQVUsR0FBRyxJQUFJLENBQUM7UUFHbEIsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFNcEIsVUFBSyxHQUFHLEdBQUcsQ0FBQztRQUdaLFdBQU0s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Q2tEOztJQUVsRCxnRUFDK0I7O0lBRS9CLDhEQUNrRDs7SUFFbEQsZ0VBQytCOztJQUUvQiw2REFDd0M7O0lBRXhDLCtEQUM4Qjs7SUFFOUIsNENBQytEOztJQUUvRCw4Q0FDMkQ7O0lBRTNELDhDQUMyRDs7Ozs7SUFFM0QsNENBQWM7Ozs7O0lBQ2QsMENBQVk7Ozs7O0lBQ1osNkNBQWU7Ozs7O0lBQ2YsaURBQW1COzs7OztJQUNuQixrREFBb0I7Ozs7O0lBQ3BCLGlEQUFtQjs7Ozs7SUFDbkIsZ0RBQWtCOzs7OztJQUNsQiw0Q0FBYzs7Ozs7SUFDZCxrREFBb0I7Ozs7O0lBQ3BCLG9EQUE4Qjs7Ozs7SUFDOUIseURBQW1DOzs7OztJQUNuQyxzREFBaUM7Ozs7O0lBQ2pDLG9EQUErQjs7Ozs7SUFDL0IscURBQWdDOzs7OztJQUNoQyxnREFBMkI7Ozs7O0lBQzNCLDRDQUFjOzs7OztJQUNkLGtEQUFvQjs7Ozs7SUFDcEIsb0RBQXNCOzs7OztJQUN0Qix5REFBMkI7Ozs7O0lBQzNCLGlEQUFtQjs7Ozs7SUFDbkIsZ0RBQWtCOzs7OztJQUNsQixnREFBMkI7Ozs7O0lBQzNCLHNEQUFpQzs7Ozs7SUFDakMsb0RBQStCOzs7OztJQUMvQixxREFBZ0M7Ozs7O0lBQ2hDLHdEQUEwQjs7Ozs7SUFDMUIsOENBQWdCOzs7OztJQUNoQiwwREFBNEI7Ozs7O0lBQzVCLDBEQUE0Qjs7Ozs7SUFDNUIsa0RBQW9COzs7OztJQUNwQix5REFBMkI7O0lBc04zQixrREF5RkU7O0lBRUYscURBUUU7O0lBRUYsb0RBRUU7O0lBRUYsc0RBRUU7O0lBRUYsc0RBa0JFOztJQUVGLHFEQUlFOztJQUVGLHVEQUVFOzs7OztJQUVGLGtEQXdERTs7Ozs7SUFFRixrREFFRTs7Ozs7SUFFRixxREFZRTs7Ozs7SUFFRixxREFZRTs7Ozs7SUF2YlUsK0NBQW9DOzs7OztJQUFFLCtDQUE0Qjs7Ozs7SUFBRSw4Q0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIE9uSW5pdCxcbiAgT25DaGFuZ2VzLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRWxlbWVudFJlZixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgRXZlbnRFbWl0dGVyLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgVmlld3BvcnRTY3JvbGxlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IFBiZHNEYXRhdml6SGVhdG1hcCB9IGZyb20gJy4vZGF0YXZpei5pbnRlcmZhY2VzJztcbmltcG9ydCB7IFBiZHNEYXRhdml6U2VydmljZSB9IGZyb20gJy4vZGF0YXZpei5zZXJ2aWNlJztcblxuaW1wb3J0IHtcbiAgc2VsZWN0IGFzIGQzX3NlbGVjdCxcbiAgaXNvUGFyc2UgYXMgZDNfaXNvUGFyc2UsXG4gIHRpbWVGb3JtYXQgYXMgZDNfdGltZUZvcm1hdCxcbiAgZm9ybWF0IGFzIGQzX2Zvcm1hdCxcbiAgc2NhbGVCYW5kIGFzIGQzX3NjYWxlQmFuZCxcbiAgc2NhbGVUaHJlc2hvbGQgYXMgZDNfc2NhbGVUaHJlc2hvbGQsXG4gIHNjYWxlUXVhbnRpbGUgYXMgZDNfc2NhbGVRdWFudGlsZSxcbiAgc2NhbGVRdWFudGl6ZSBhcyBkM19zY2FsZVF1YW50aXplLFxuICBtaW4gYXMgZDNfbWluLFxuICBtYXggYXMgZDNfbWF4LFxuICBheGlzQm90dG9tIGFzIGQzX2F4aXNCb3R0b20sXG4gIGF4aXNMZWZ0IGFzIGQzX2F4aXNMZWZ0LFxuICBldmVudCBhcyBkM19ldmVudFxufSBmcm9tICdkMyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BiZHMtZGF0YXZpei1oZWF0bWFwJyxcbiAgdGVtcGxhdGU6IGBgLFxuICBzdHlsZXM6IFtdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBQYmRzRGF0YXZpekhlYXRtYXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MucGJkcy1jaGFydCcpXG4gIGNoYXJ0Q2xhc3MgPSB0cnVlO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MucGJkcy1jaGFydC1oZWF0bWFwJylcbiAgaGVhdG1hcENsYXNzID0gdHJ1ZTtcblxuICBASW5wdXQoKVxuICBkYXRhOiBBcnJheTxQYmRzRGF0YXZpekhlYXRtYXA+O1xuXG4gIEBJbnB1dCgpXG4gIHdpZHRoID0gMzA2O1xuXG4gIEBJbnB1dCgpXG4gIGhlaWdodCA9IDQwMDtcblxuICBASW5wdXQoKVxuICBtYXJnaW5Ub3AgPSAwOyAvLyBoYXJkY29kZWQgb24gcHVycG9zZSwgZG8gbm90IGRvY3VtZW50IHVudGlsIGZlZWRiYWNrXG5cbiAgQElucHV0KClcbiAgbWFyZ2luUmlnaHQgPSAwOyAvLyBoYXJkY29kZWQgb24gcHVycG9zZSwgZG8gbm90IGRvY3VtZW50IHVudGlsIGZlZWRiYWNrXG5cbiAgQElucHV0KClcbiAgbWFyZ2luQm90dG9tID0gMzA7IC8vIGhhcmRjb2RlZCBvbiBwdXJwb3NlLCBkbyBub3QgZG9jdW1lbnQgdW50aWwgZmVlZGJhY2tcblxuICBASW5wdXQoKVxuICBtYXJnaW5MZWZ0ID0gNTU7XG5cbiAgQElucHV0KClcbiAgc2NhbGU6ICd0aHJlc2hvbGQnIHwgJ3F1YW50aWxlJyB8ICdxdWFudGl6ZScgPSAncXVhbnRpbGUnO1xuXG4gIEBJbnB1dCgpXG4gIGRvbWFpbjogQXJyYXk8bnVtYmVyPjtcblxuICBASW5wdXQoKVxuICB4QXhpc0Zvcm1hdFR5cGU6ICdudW1iZXInIHwgJ3RpbWUnID0gbnVsbDtcblxuICBASW5wdXQoKVxuICB4QXhpc0Zvcm1hdFN0cmluZyA9ICcnO1xuXG4gIEBJbnB1dCgpXG4gIHlBeGlzRm9ybWF0VHlwZTogJ251bWJlcicgfCAndGltZScgPSBudWxsO1xuXG4gIEBJbnB1dCgpXG4gIHlBeGlzRm9ybWF0U3RyaW5nID0gJyc7XG5cbiAgQElucHV0KClcbiAgaGlkZUxlZ2VuZCA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIGxlZ2VuZFdpZHRoID0gMTA1ICsgMjg7IC8vIGhhcmRjb2RlZCBsZWdlbmQgd2lkdGggKyBsZWZ0IG1hcmdpbiwgZG8gbm90IGRvY3VtZW50IHVudGlsIGZlZWRiYWNrXG5cbiAgQElucHV0KClcbiAgbGVnZW5kUG9zaXRpb246ICdyaWdodCcgfCAnYm90dG9tJyA9ICdyaWdodCc7XG5cbiAgQElucHV0KClcbiAgbGVnZW5kTGFiZWxGb3JtYXRUeXBlOiAnbnVtYmVyJyA9IG51bGw7XG5cbiAgQElucHV0KClcbiAgbGVnZW5kTGFiZWxGb3JtYXRTdHJpbmcgPSAnJztcblxuICBASW5wdXQoKVxuICB0b29sdGlwWExhYmVsRm9ybWF0VHlwZTogJ251bWJlcicgfCAndGltZScgPSBudWxsO1xuXG4gIEBJbnB1dCgpXG4gIHRvb2x0aXBYTGFiZWxGb3JtYXRTdHJpbmcgPSAnJztcblxuICBASW5wdXQoKVxuICB0b29sdGlwWUxhYmVsRm9ybWF0VHlwZTogJ251bWJlcicgfCAndGltZScgPSBudWxsO1xuXG4gIEBJbnB1dCgpXG4gIHRvb2x0aXBZTGFiZWxGb3JtYXRTdHJpbmcgPSAnJztcblxuICBASW5wdXQoKVxuICB0b29sdGlwVmFsdWVGb3JtYXRUeXBlOiAnbnVtYmVyJyA9IG51bGw7XG5cbiAgQElucHV0KClcbiAgdG9vbHRpcFZhbHVlRm9ybWF0U3RyaW5nID0gJyc7XG5cbiAgQElucHV0KClcbiAgdGhlbWU6ICdjbGFzc2ljJyB8ICdvY2VhbicgfCAnc3Vuc2V0JyB8ICd0d2lsaWdodCcgPSAnY2xhc3NpYyc7XG5cbiAgQE91dHB1dCgpXG4gIGhvdmVyZWQ6IEV2ZW50RW1pdHRlcjxvYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcjxvYmplY3Q+KCk7XG5cbiAgQE91dHB1dCgpXG4gIGNsaWNrZWQ6IEV2ZW50RW1pdHRlcjxvYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcjxvYmplY3Q+KCk7XG5cbiAgcHJpdmF0ZSBjaGFydDtcbiAgcHJpdmF0ZSBzdmc7XG4gIHByaXZhdGUgbWFyZ2luO1xuICBwcml2YXRlIGNvbG9yUmFuZ2U7XG4gIHByaXZhdGUgY29sb3JEb21haW47XG4gIHByaXZhdGUgeEF4aXNTY2FsZTtcbiAgcHJpdmF0ZSB4QXhpc0NhbGw7XG4gIHByaXZhdGUgeEF4aXM7XG4gIHByaXZhdGUgeEF4aXNGb3JtYXQ7XG4gIHByaXZhdGUgeEF4aXNUaWNrU2l6ZTogbnVtYmVyO1xuICBwcml2YXRlIHhBeGlzVGlja1NpemVPdXRlcjogbnVtYmVyO1xuICBwcml2YXRlIGhpZGVYQXhpc0RvbWFpbjogYm9vbGVhbjtcbiAgcHJpdmF0ZSBoaWRlWEF4aXNaZXJvOiBib29sZWFuO1xuICBwcml2YXRlIGhpZGVYQXhpc1RpY2tzOiBib29sZWFuO1xuICBwcml2YXRlIGhpZGVYQXhpczogYm9vbGVhbjtcbiAgcHJpdmF0ZSB5QXhpcztcbiAgcHJpdmF0ZSB5QXhpc0Zvcm1hdDtcbiAgcHJpdmF0ZSB5QXhpc1RpY2tTaXplO1xuICBwcml2YXRlIHlBeGlzVGlja1NpemVPdXRlcjtcbiAgcHJpdmF0ZSB5QXhpc1NjYWxlO1xuICBwcml2YXRlIHlBeGlzQ2FsbDtcbiAgcHJpdmF0ZSBoaWRlWUF4aXM6IGJvb2xlYW47XG4gIHByaXZhdGUgaGlkZVlBeGlzRG9tYWluOiBib29sZWFuO1xuICBwcml2YXRlIGhpZGVZQXhpc1plcm86IGJvb2xlYW47XG4gIHByaXZhdGUgaGlkZVlBeGlzVGlja3M6IGJvb2xlYW47XG4gIHByaXZhdGUgbGVnZW5kTGFiZWxGb3JtYXQ7XG4gIHByaXZhdGUgdG9vbHRpcDtcbiAgcHJpdmF0ZSB0b29sdGlwWUxhYmVsRm9ybWF0O1xuICBwcml2YXRlIHRvb2x0aXBYTGFiZWxGb3JtYXQ7XG4gIHByaXZhdGUgaGlkZVRvb2x0aXA7XG4gIHByaXZhdGUgdG9vbHRpcFZhbHVlRm9ybWF0O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2RhdGF2aXo6IFBiZHNEYXRhdml6U2VydmljZSwgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSBfc2Nyb2xsOiBWaWV3cG9ydFNjcm9sbGVyKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubWFyZ2luID0ge1xuICAgICAgdG9wOiArdGhpcy5tYXJnaW5Ub3AsXG4gICAgICByaWdodDogK3RoaXMubWFyZ2luUmlnaHQsXG4gICAgICBib3R0b206ICt0aGlzLm1hcmdpbkJvdHRvbSxcbiAgICAgIGxlZnQ6ICt0aGlzLm1hcmdpbkxlZnRcbiAgICB9O1xuXG4gICAgc3dpdGNoICh0aGlzLnlBeGlzRm9ybWF0VHlwZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgdGhpcy55QXhpc0Zvcm1hdCA9IGQzX2Zvcm1hdCh0aGlzLnlBeGlzRm9ybWF0U3RyaW5nKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0aW1lJzpcbiAgICAgICAgdGhpcy55QXhpc0Zvcm1hdCA9IGQzX3RpbWVGb3JtYXQodGhpcy55QXhpc0Zvcm1hdFN0cmluZyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy55QXhpc0Zvcm1hdCA9IG51bGw7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHN3aXRjaCAodGhpcy54QXhpc0Zvcm1hdFR5cGUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIHRoaXMueEF4aXNGb3JtYXQgPSBkM19mb3JtYXQodGhpcy54QXhpc0Zvcm1hdFN0cmluZyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndGltZSc6XG4gICAgICAgIHRoaXMueEF4aXNGb3JtYXQgPSBkM190aW1lRm9ybWF0KHRoaXMueEF4aXNGb3JtYXRTdHJpbmcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMueEF4aXNGb3JtYXQgPSBudWxsO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHRoaXMubGVnZW5kTGFiZWxGb3JtYXRUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICB0aGlzLmxlZ2VuZExhYmVsRm9ybWF0ID0gZDNfZm9ybWF0KHRoaXMubGVnZW5kTGFiZWxGb3JtYXRTdHJpbmcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMubGVnZW5kTGFiZWxGb3JtYXQgPSBudWxsO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHRoaXMudG9vbHRpcFlMYWJlbEZvcm1hdFR5cGUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIHRoaXMudG9vbHRpcFlMYWJlbEZvcm1hdCA9IGQzX2Zvcm1hdCh0aGlzLnRvb2x0aXBZTGFiZWxGb3JtYXRTdHJpbmcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgICB0aGlzLnRvb2x0aXBZTGFiZWxGb3JtYXQgPSBkM190aW1lRm9ybWF0KHRoaXMudG9vbHRpcFlMYWJlbEZvcm1hdFN0cmluZyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy50b29sdGlwWUxhYmVsRm9ybWF0ID0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgc3dpdGNoICh0aGlzLnRvb2x0aXBYTGFiZWxGb3JtYXRUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICB0aGlzLnRvb2x0aXBYTGFiZWxGb3JtYXQgPSBkM19mb3JtYXQodGhpcy50b29sdGlwWExhYmVsRm9ybWF0U3RyaW5nKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0aW1lJzpcbiAgICAgICAgdGhpcy50b29sdGlwWExhYmVsRm9ybWF0ID0gZDNfdGltZUZvcm1hdCh0aGlzLnRvb2x0aXBYTGFiZWxGb3JtYXRTdHJpbmcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMudG9vbHRpcFhMYWJlbEZvcm1hdCA9IG51bGw7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHN3aXRjaCAodGhpcy50b29sdGlwVmFsdWVGb3JtYXRUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICB0aGlzLnRvb2x0aXBWYWx1ZUZvcm1hdCA9IGQzX2Zvcm1hdCh0aGlzLnRvb2x0aXBWYWx1ZUZvcm1hdFN0cmluZyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy50b29sdGlwVmFsdWVGb3JtYXQgPSBudWxsO1xuICAgIH1cblxuICAgIC8vIGRlZmF1bHRzIGZvciBhbGwgY2hhcnQgdHlwZXNcbiAgICB0aGlzLmhpZGVYQXhpcyA9IGZhbHNlO1xuICAgIHRoaXMuaGlkZVhBeGlzWmVybyA9IGZhbHNlO1xuICAgIHRoaXMuaGlkZVhBeGlzRG9tYWluID0gdHJ1ZTtcbiAgICB0aGlzLmhpZGVZQXhpc0RvbWFpbiA9IHRydWU7XG4gICAgdGhpcy5oaWRlVG9vbHRpcCA9IGZhbHNlO1xuICAgIHRoaXMuaGlkZVhBeGlzVGlja3MgPSB0cnVlO1xuICAgIHRoaXMuaGlkZVlBeGlzVGlja3MgPSB0cnVlO1xuICAgIHRoaXMueEF4aXNUaWNrU2l6ZSA9IDg7XG4gICAgdGhpcy54QXhpc1RpY2tTaXplT3V0ZXIgPSAwO1xuICAgIHRoaXMueUF4aXNUaWNrU2l6ZSA9IDg7XG4gICAgdGhpcy55QXhpc1RpY2tTaXplT3V0ZXIgPSAwO1xuXG4gICAgLy8gY3JlYXRlIHRoZSBjaGFydFxuICAgIHRoaXMuY2hhcnQgPSBkM19zZWxlY3QodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50KS5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbiAgICAvLyBjcmVhdGUgY2hhcnQgc3ZnXG4gICAgdGhpcy5zdmcgPSB0aGlzLmNoYXJ0XG4gICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgLmF0dHIoJ3dpZHRoJywgK3RoaXMud2lkdGgpXG4gICAgICAuYXR0cignaGVpZ2h0JywgK3RoaXMuaGVpZ2h0ICsgdGhpcy5tYXJnaW4udG9wICsgdGhpcy5tYXJnaW4uYm90dG9tKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2ltZy1mbHVpZCcpXG4gICAgICAuYXR0cigncHJlc2VydmVBc3BlY3RSYXRpbycsICd4TWluWU1pbiBtZWV0JylcbiAgICAgIC5hdHRyKFxuICAgICAgICAndmlld0JveCcsXG4gICAgICAgIGAtJHt0aGlzLm1hcmdpbi5sZWZ0fSAtJHt0aGlzLm1hcmdpbi50b3B9ICR7K3RoaXMud2lkdGh9ICR7K3RoaXMuaGVpZ2h0ICsgdGhpcy5tYXJnaW4udG9wICsgdGhpcy5tYXJnaW4uYm90dG9tfWBcbiAgICAgICk7XG5cbiAgICAvLyBjb2xvciByYW5nZVxuICAgIGNvbnN0IGNvbG9ycyA9IHRoaXMuX2RhdGF2aXpcbiAgICAgIC5nZXRDb2xvcnModHJ1ZSwgdGhpcy50aGVtZSlcbiAgICAgIC5zbGljZSgpXG4gICAgICAucmV2ZXJzZSgpO1xuXG4gICAgY29uc3QgY29sb3JEb21haW46IGFueSA9IFtcbiAgICAgICtkM19taW4odGhpcy5kYXRhLCAoZDogUGJkc0RhdGF2aXpIZWF0bWFwKSA9PiBkLnZhbHVlKSxcbiAgICAgICtkM19tYXgodGhpcy5kYXRhLCAoZDogUGJkc0RhdGF2aXpIZWF0bWFwKSA9PiBkLnZhbHVlKVxuICAgIF07XG4gICAgY29uc3QgY29sb3JWYWx1ZXMgPSB0aGlzLmRhdGEubWFwKGQgPT4gZC52YWx1ZSk7XG5cbiAgICBzd2l0Y2ggKHRoaXMuc2NhbGUpIHtcbiAgICAgIGNhc2UgJ3RocmVzaG9sZCc6XG4gICAgICAgIHRoaXMuY29sb3JSYW5nZSA9IGQzX3NjYWxlVGhyZXNob2xkKClcbiAgICAgICAgICAuZG9tYWluKHRoaXMuZG9tYWluKVxuICAgICAgICAgIC5yYW5nZShjb2xvcnMpO1xuXG4gICAgICAgIHRoaXMuY29sb3JEb21haW4gPSB0aGlzLmNvbG9yUmFuZ2UuZG9tYWluKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdxdWFudGlsZSc6XG4gICAgICAgIHRoaXMuY29sb3JSYW5nZSA9IGQzX3NjYWxlUXVhbnRpbGUoKVxuICAgICAgICAgIC5kb21haW4oY29sb3JWYWx1ZXMpXG4gICAgICAgICAgLnJhbmdlKGNvbG9ycyk7XG5cbiAgICAgICAgdGhpcy5jb2xvckRvbWFpbiA9IHRoaXMuY29sb3JSYW5nZS5xdWFudGlsZXMoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ3F1YW50aXplJzpcbiAgICAgICAgdGhpcy5jb2xvclJhbmdlID0gZDNfc2NhbGVRdWFudGl6ZSgpXG4gICAgICAgICAgLmRvbWFpbihjb2xvckRvbWFpbilcbiAgICAgICAgICAucmFuZ2UoY29sb3JzKTtcblxuICAgICAgICB0aGlzLmNvbG9yRG9tYWluID0gdGhpcy5jb2xvclJhbmdlLnRocmVzaG9sZHMoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgLy8gY29uc29sZS5sb2coY29sb3JzLCBjb2xvckRvbWFpbiwgY29sb3JWYWx1ZXMsIHRoaXMuc2NhbGUsIHRoaXMuY29sb3JSYW5nZSwgdGhpcy5jb2xvckRvbWFpbik7XG5cbiAgICAvLyBkZWZpbmUgYXhpcyBsYWJlbHNcbiAgICBjb25zdCB4QXhpc0xhYmVsczogYW55ID0gWy4uLm5ldyBTZXQodGhpcy5kYXRhLm1hcChkID0+IGQueExhYmVsKSldO1xuICAgIGNvbnN0IHlBeGlzTGFiZWxzOiBhbnkgPSBbLi4ubmV3IFNldCh0aGlzLmRhdGEubWFwKGQgPT4gZC55TGFiZWwpKV0ucmV2ZXJzZSgpO1xuXG4gICAgLy8gWCBheGlzXG4gICAgdGhpcy54QXhpc1NjYWxlID0gZDNfc2NhbGVCYW5kKClcbiAgICAgIC5kb21haW4oeEF4aXNMYWJlbHMpXG4gICAgICAucmFuZ2VSb3VuZChbMCwgdGhpcy53aWR0aCAtIHRoaXMubWFyZ2luLmxlZnRdKVxuICAgICAgLnBhZGRpbmdJbm5lcigwLjEpO1xuXG4gICAgdGhpcy54QXhpc0NhbGwgPSBkM19heGlzQm90dG9tKHRoaXMueEF4aXNTY2FsZSlcbiAgICAgIC50aWNrU2l6ZSh0aGlzLnhBeGlzVGlja1NpemUpXG4gICAgICAudGlja1NpemVPdXRlcih0aGlzLnhBeGlzVGlja1NpemVPdXRlcilcbiAgICAgIC50aWNrRm9ybWF0KHRoaXMueEF4aXNGb3JtYXR0ZXIpO1xuXG4gICAgdGhpcy54QXhpcyA9IHRoaXMuc3ZnXG4gICAgICAuYXBwZW5kKCdnJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdheGlzIGF4aXMteCcpXG4gICAgICAuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgwLCAke3RoaXMuaGVpZ2h0fSlgKVxuICAgICAgLmNsYXNzZWQoJ2F4aXMtaGlkZGVuJywgdGhpcy5oaWRlWEF4aXMpXG4gICAgICAuY2xhc3NlZCgnYXhpcy16ZXJvLWhpZGRlbicsIHRoaXMuaGlkZVhBeGlzWmVybylcbiAgICAgIC5jbGFzc2VkKCdheGlzLWRvbWFpbi1oaWRkZW4nLCB0aGlzLmhpZGVYQXhpc0RvbWFpbilcbiAgICAgIC5jbGFzc2VkKCdheGlzLXRpY2tzLWhpZGRlbicsIHRoaXMuaGlkZVhBeGlzVGlja3MpXG4gICAgICAuY2FsbCh0aGlzLnhBeGlzQ2FsbCk7XG5cbiAgICAvLyBZIGF4aXNcbiAgICB0aGlzLnlBeGlzU2NhbGUgPSBkM19zY2FsZUJhbmQoKVxuICAgICAgLmRvbWFpbih5QXhpc0xhYmVscylcbiAgICAgIC5yYW5nZVJvdW5kKFt0aGlzLmhlaWdodCwgMF0pXG4gICAgICAucGFkZGluZ0lubmVyKDAuMSk7XG5cbiAgICB0aGlzLnlBeGlzQ2FsbCA9IGQzX2F4aXNMZWZ0KHRoaXMueUF4aXNTY2FsZSlcbiAgICAgIC50aWNrU2l6ZSh0aGlzLnlBeGlzVGlja1NpemUpXG4gICAgICAudGlja1NpemVPdXRlcih0aGlzLnlBeGlzVGlja1NpemVPdXRlcilcbiAgICAgIC50aWNrRm9ybWF0KHRoaXMueUF4aXNGb3JtYXR0ZXIpO1xuXG4gICAgdGhpcy55QXhpcyA9IHRoaXMuc3ZnXG4gICAgICAuYXBwZW5kKCdnJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdheGlzIGF4aXMteScpXG4gICAgICAuY2xhc3NlZCgnYXhpcy1oaWRkZW4nLCB0aGlzLmhpZGVZQXhpcylcbiAgICAgIC5jbGFzc2VkKCdheGlzLXplcm8taGlkZGVuJywgdGhpcy5oaWRlWUF4aXNaZXJvKVxuICAgICAgLmNsYXNzZWQoJ2F4aXMtZG9tYWluLWhpZGRlbicsIHRoaXMuaGlkZVlBeGlzRG9tYWluKVxuICAgICAgLmNsYXNzZWQoJ2F4aXMtdGlja3MtaGlkZGVuJywgdGhpcy5oaWRlWUF4aXNUaWNrcylcbiAgICAgIC5jYWxsKHRoaXMueUF4aXNDYWxsKTtcblxuICAgIC8vIFRPT0xUSVBcbiAgICBpZiAoIXRoaXMuaGlkZVRvb2x0aXApIHtcbiAgICAgIHRoaXMudG9vbHRpcCA9IGQzX3NlbGVjdCgnYm9keScpXG4gICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdwYmRzLXRvb2x0aXAgc291dGgnKVxuICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAwKVxuICAgICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpOyAvLyBoaWRlIHRvb2x0aXAgZm9yIGFjY2Vzc2liaWxpdHlcbiAgICB9XG5cbiAgICAvLyBhZGQgbGVnZW5kIGNsYXNzZXNcbiAgICBpZiAoIXRoaXMuaGlkZUxlZ2VuZCkge1xuICAgICAgdGhpcy5jaGFydC5jbGFzc2VkKCdwYmRzLWNoYXJ0LWxlZ2VuZC1ib3R0b20nLCB0aGlzLmxlZ2VuZFBvc2l0aW9uID09PSAnYm90dG9tJyA/IHRydWUgOiBmYWxzZSk7XG4gICAgICB0aGlzLmNoYXJ0LmFwcGVuZCgndWwnKS5hdHRyKCdjbGFzcycsIGBsZWdlbmQgbGVnZW5kLSR7dGhpcy5sZWdlbmRQb3NpdGlvbn1gKTtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZUNoYXJ0KCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMuZGF0YSAmJiAhY2hhbmdlcy5kYXRhLmZpcnN0Q2hhbmdlKSB7XG4gICAgICB0aGlzLnVwZGF0ZUNoYXJ0KCk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlQ2hhcnQgPSAoKSA9PiB7XG4gICAgdGhpcy5zdmdcbiAgICAgIC5zZWxlY3RBbGwoJ3JlY3QnKVxuICAgICAgLmRhdGEodGhpcy5kYXRhKVxuICAgICAgLmpvaW4oXG4gICAgICAgIGVudGVyID0+XG4gICAgICAgICAgZW50ZXJcbiAgICAgICAgICAgIC5hcHBlbmQoJ3JlY3QnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2Jsb2NrJylcbiAgICAgICAgICAgIC5jbGFzc2VkKCdlbXB0eScsIGQgPT4gZC52YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IGQudmFsdWUgPT09IG51bGwpXG4gICAgICAgICAgICAuYXR0cigneCcsIGQgPT4gdGhpcy54QXhpc1NjYWxlKGQueExhYmVsKSlcbiAgICAgICAgICAgIC5hdHRyKCd5JywgZCA9PiB0aGlzLnlBeGlzU2NhbGUoZC55TGFiZWwpKVxuICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgdGhpcy54QXhpc1NjYWxlLmJhbmR3aWR0aCgpKVxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHRoaXMueUF4aXNTY2FsZS5iYW5kd2lkdGgoKSlcbiAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsIGQgPT4gdGhpcy5jb2xvclJhbmdlKGQudmFsdWUpKSxcbiAgICAgICAgdXBkYXRlID0+XG4gICAgICAgICAgdXBkYXRlLmNhbGwodXBkYXRlID0+IHtcbiAgICAgICAgICAgIHVwZGF0ZVxuICAgICAgICAgICAgICAuY2xhc3NlZCgnZW1wdHknLCBkID0+IGQudmFsdWUgPT09IHVuZGVmaW5lZCB8fCBkLnZhbHVlID09PSBudWxsKVxuICAgICAgICAgICAgICAuYXR0cigncG9pbnRlci1ldmVudHMnLCAnbm9uZScpXG4gICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgLmR1cmF0aW9uKDEwMDApXG4gICAgICAgICAgICAgIC5hdHRyKCd4JywgZCA9PiB0aGlzLnhBeGlzU2NhbGUoZC54TGFiZWwpKVxuICAgICAgICAgICAgICAuYXR0cigneScsIGQgPT4gdGhpcy55QXhpc1NjYWxlKGQueUxhYmVsKSlcbiAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgdGhpcy54QXhpc1NjYWxlLmJhbmR3aWR0aCgpKVxuICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy55QXhpc1NjYWxlLmJhbmR3aWR0aCgpKVxuICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCBkID0+IHRoaXMuY29sb3JSYW5nZShkLnZhbHVlKSlcbiAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAuYXR0cigncG9pbnRlci1ldmVudHMnLCAnYXV0bycpO1xuXG4gICAgICAgICAgICByZXR1cm4gdXBkYXRlO1xuICAgICAgICAgIH0pLFxuICAgICAgICBleGl0ID0+XG4gICAgICAgICAgZXhpdFxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmF0dHIoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKVxuICAgICAgICAgICAgLnJlbW92ZSgpXG4gICAgICApXG4gICAgICAub24oJ21vdXNlb3ZlcicsIChkYXRhLCBpbmRleCwgbm9kZXMpID0+IHRoaXMuYmxvY2tNb3VzZU92ZXIoZDNfZXZlbnQsIGRhdGEsIGluZGV4LCBub2RlcykpXG4gICAgICAub24oJ21vdXNlb3V0JywgKGRhdGEsIGluZGV4LCBub2RlcykgPT4gdGhpcy5ibG9ja01vdXNlT3V0KCkpXG4gICAgICAub24oJ2NsaWNrJywgKGRhdGEsIGluZGV4LCBub2RlcykgPT4gdGhpcy5ibG9ja01vdXNlQ2xpY2soZDNfZXZlbnQsIGRhdGEsIGluZGV4LCBub2RlcykpO1xuXG4gICAgaWYgKCF0aGlzLmhpZGVMZWdlbmQpIHtcbiAgICAgIHRoaXMuY2hhcnRcbiAgICAgICAgLnNlbGVjdCgnLmxlZ2VuZCcpXG4gICAgICAgIC5zZWxlY3RBbGwoJy5sZWdlbmQtaXRlbScpXG4gICAgICAgIC5kYXRhKHRoaXMuY29sb3JEb21haW4pXG4gICAgICAgIC5qb2luKFxuICAgICAgICAgIGVudGVyID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxpID0gZW50ZXIuYXBwZW5kKCdsaScpLmF0dHIoJ2NsYXNzJywgJ2xlZ2VuZC1pdGVtJyk7XG5cbiAgICAgICAgICAgIGxpLmFwcGVuZCgnc3BhbicpXG4gICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQta2V5JylcbiAgICAgICAgICAgICAgLnN0eWxlKCdiYWNrZ3JvdW5kLWNvbG9yJywgZCA9PiB0aGlzLmNvbG9yUmFuZ2UoZCkpO1xuXG4gICAgICAgICAgICBsaS5hcHBlbmQoJ3NwYW4nKVxuICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kLWxhYmVsJylcbiAgICAgICAgICAgICAgLmh0bWwoZCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGxhYmVsOiBzdHJpbmcgPSBkO1xuXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmxlZ2VuZExhYmVsRm9ybWF0VHlwZSkge1xuICAgICAgICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwgPSB0aGlzLmxlZ2VuZExhYmVsRm9ybWF0KGQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gYCZnZTsgJHtsYWJlbH1gO1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGxpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdXBkYXRlID0+XG4gICAgICAgICAgICB1cGRhdGUuc2VsZWN0KCcubGVnZW5kLWxhYmVsJykuaHRtbChkID0+IHtcbiAgICAgICAgICAgICAgbGV0IGxhYmVsOiBzdHJpbmcgPSBkO1xuXG4gICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5sZWdlbmRMYWJlbEZvcm1hdFR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgICAgICAgbGFiZWwgPSB0aGlzLmxlZ2VuZExhYmVsRm9ybWF0KGQpO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4gYCZnZTsgJHtsYWJlbH1gO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgZXhpdCA9PiBleGl0LnJlbW92ZSgpXG4gICAgICAgIClcbiAgICAgICAgLm9uKCdtb3VzZW92ZXInLCAoZGF0YSwgaW5kZXgsIG5vZGVzKSA9PiB0aGlzLmxlZ2VuZE1vdXNlT3ZlcihkM19ldmVudCwgZGF0YSwgaW5kZXgsIG5vZGVzKSlcbiAgICAgICAgLm9uKCdtb3VzZW91dCcsICgpID0+IHRoaXMubGVnZW5kTW91c2VPdXQoKSlcbiAgICAgICAgLm9uKCdjbGljaycsIChkYXRhLCBpbmRleCwgbm9kZXMpID0+IHRoaXMubGVnZW5kTW91c2VDbGljayhkM19ldmVudCwgZGF0YSwgaW5kZXgsIG5vZGVzKSk7XG4gICAgfVxuICB9O1xuXG4gIGJsb2NrTW91c2VPdmVyID0gKGV2ZW50LCBkYXRhLCBpbmRleCwgbm9kZXMpID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZyhkYXRhLnZhbHVlLCBldmVudCwgZGF0YSwgaW5kZXgsIG5vZGVzKTtcblxuICAgIGlmIChkYXRhLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICB0aGlzLnRvb2x0aXBTaG93KGRhdGEsIGluZGV4LCBub2Rlc1tpbmRleF0pO1xuICAgIH1cblxuICAgIHRoaXMuaG92ZXJlZC5lbWl0KHsgZXZlbnQsIGRhdGEgfSk7XG4gIH07XG5cbiAgYmxvY2tNb3VzZU91dCA9ICgpID0+IHtcbiAgICB0aGlzLnRvb2x0aXBIaWRlKCk7XG4gIH07XG5cbiAgYmxvY2tNb3VzZUNsaWNrID0gKGV2ZW50LCBkYXRhLCBpbmRleCwgbm9kZXMpID0+IHtcbiAgICB0aGlzLmNsaWNrZWQuZW1pdCh7IGV2ZW50LCBkYXRhIH0pO1xuICB9O1xuXG4gIGxlZ2VuZE1vdXNlT3ZlciA9IChldmVudCwgZGF0YSwgaW5kZXgsIG5vZGVzKSA9PiB7XG4gICAgdGhpcy5jaGFydFxuICAgICAgLnNlbGVjdEFsbCgnLmxlZ2VuZC1pdGVtJylcbiAgICAgIC5maWx0ZXIoKGQsIGkpID0+IGkgIT09IGluZGV4KVxuICAgICAgLmNsYXNzZWQoJ2luYWN0aXZlJywgdHJ1ZSk7XG5cbiAgICB0aGlzLmNoYXJ0XG4gICAgICAuc2VsZWN0QWxsKCcuYmxvY2snKVxuICAgICAgLmZpbHRlcigoZCwgaSkgPT4ge1xuICAgICAgICBpZiAoaW5kZXggKyAxID09PSBub2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gZC52YWx1ZSA8IGRhdGE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGQudmFsdWUgPCBkYXRhIHx8IGQudmFsdWUgPj0gK2QzX3NlbGVjdChub2Rlc1tpbmRleCArIDFdKS5kYXRhKClbMF07XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuY2xhc3NlZCgnaW5hY3RpdmUnLCB0cnVlKTtcblxuICAgIHRoaXMuaG92ZXJlZC5lbWl0KHsgZXZlbnQsIGRhdGEgfSk7XG4gIH07XG5cbiAgbGVnZW5kTW91c2VPdXQgPSAoKSA9PiB7XG4gICAgdGhpcy5jaGFydC5zZWxlY3RBbGwoJy5sZWdlbmQtaXRlbScpLmNsYXNzZWQoJ2luYWN0aXZlJywgZmFsc2UpO1xuXG4gICAgdGhpcy5jaGFydC5zZWxlY3RBbGwoJy5ibG9jaycpLmNsYXNzZWQoJ2luYWN0aXZlJywgZmFsc2UpO1xuICB9O1xuXG4gIGxlZ2VuZE1vdXNlQ2xpY2sgPSAoZXZlbnQsIGRhdGEsIGluZGV4LCBub2RlcykgPT4ge1xuICAgIHRoaXMuY2xpY2tlZC5lbWl0KHsgZXZlbnQsIGRhdGEgfSk7XG4gIH07XG5cbiAgcHJpdmF0ZSB0b29sdGlwU2hvdyA9IChkYXRhLCBpbmRleCwgbm9kZSkgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKCdUT09MVElQOiAnLCBkYXRhLCBpbmRleCwgbm9kZSk7XG5cbiAgICBjb25zdCBkaW1lbnNpb25zID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBzY3JvbGwgPSB0aGlzLl9zY3JvbGwuZ2V0U2Nyb2xsUG9zaXRpb24oKTtcbiAgICBsZXQgeUxhYmVsO1xuICAgIGxldCB4TGFiZWw7XG5cbiAgICBzd2l0Y2ggKHRoaXMudG9vbHRpcFlMYWJlbEZvcm1hdFR5cGUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIHlMYWJlbCA9IHRoaXMudG9vbHRpcFlMYWJlbEZvcm1hdChkYXRhLnlMYWJlbCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICd0aW1lJzpcbiAgICAgICAgY29uc3QgcGFyc2VkVGltZSA9IGQzX2lzb1BhcnNlKGRhdGEueUxhYmVsKTtcbiAgICAgICAgeUxhYmVsID0gdGhpcy50b29sdGlwWUxhYmVsRm9ybWF0KHBhcnNlZFRpbWUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgeUxhYmVsID0gYCR7ZGF0YS55TGFiZWx9JHt0aGlzLnRvb2x0aXBZTGFiZWxGb3JtYXRTdHJpbmd9YDtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHRoaXMudG9vbHRpcFhMYWJlbEZvcm1hdFR5cGUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIHhMYWJlbCA9IHRoaXMudG9vbHRpcFhMYWJlbEZvcm1hdChkYXRhLnhMYWJlbCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICd0aW1lJzpcbiAgICAgICAgY29uc3QgcGFyc2VkVGltZSA9IGQzX2lzb1BhcnNlKGRhdGEueExhYmVsKTtcbiAgICAgICAgeExhYmVsID0gdGhpcy50b29sdGlwWExhYmVsRm9ybWF0KHBhcnNlZFRpbWUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgeExhYmVsID0gYCR7ZGF0YS54TGFiZWx9JHt0aGlzLnRvb2x0aXBYTGFiZWxGb3JtYXRTdHJpbmd9YDtcbiAgICB9XG5cbiAgICBjb25zdCB2YWx1ZSA9XG4gICAgICB0aGlzLnRvb2x0aXBWYWx1ZUZvcm1hdCA9PT0gbnVsbFxuICAgICAgICA/IGA8ZGl2IGNsYXNzPVwidG9vbHRpcC12YWx1ZVwiPiR7ZGF0YS52YWx1ZX08L2Rpdj5gXG4gICAgICAgIDogYDxkaXYgY2xhc3M9XCJ0b29sdGlwLXZhbHVlXCI+JHt0aGlzLnRvb2x0aXBWYWx1ZUZvcm1hdChkYXRhLnZhbHVlKX08L2Rpdj5gO1xuXG4gICAgdGhpcy50b29sdGlwLmh0bWwoXG4gICAgICBgXG4gICAgICAgICR7eUxhYmVsfSA6ICR7eExhYmVsfTxicj5cbiAgICAgICAgJHt2YWx1ZX1cbiAgICAgIGBcbiAgICApO1xuXG4gICAgY29uc3QgdG9vbHRpcE9mZnNldFdpZHRoID0gK3RoaXMudG9vbHRpcC5ub2RlKCkub2Zmc2V0V2lkdGggLyAyO1xuICAgIGNvbnN0IHRvb2x0aXBPZmZzZXRIZWlnaHQgPSArdGhpcy50b29sdGlwLm5vZGUoKS5vZmZzZXRIZWlnaHQgKyA4O1xuXG4gICAgdGhpcy50b29sdGlwLnN0eWxlKCd0b3AnLCBgJHsrc2Nyb2xsWzFdICsgK2RpbWVuc2lvbnMudG9wIC0gdG9vbHRpcE9mZnNldEhlaWdodH1weGApOyAvL1xuICAgIHRoaXMudG9vbHRpcC5zdHlsZSgnbGVmdCcsIGAkeytzY3JvbGxbMF0gKyArZGltZW5zaW9ucy5sZWZ0IC0gdG9vbHRpcE9mZnNldFdpZHRoICsgK2RpbWVuc2lvbnMud2lkdGggLyAyfXB4YCk7XG4gICAgdGhpcy50b29sdGlwLnN0eWxlKCdvcGFjaXR5JywgMSk7XG5cbiAgICB0aGlzLnRvb2x0aXAuc3R5bGUoJ29wYWNpdHknLCAxKTtcbiAgfTtcblxuICBwcml2YXRlIHRvb2x0aXBIaWRlID0gKCkgPT4ge1xuICAgIHRoaXMudG9vbHRpcC5zdHlsZSgnb3BhY2l0eScsIDApO1xuICB9O1xuXG4gIHByaXZhdGUgeEF4aXNGb3JtYXR0ZXIgPSBpdGVtID0+IHtcbiAgICBzd2l0Y2ggKHRoaXMueEF4aXNGb3JtYXRUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICByZXR1cm4gdGhpcy54QXhpc0Zvcm1hdChpdGVtKTtcblxuICAgICAgY2FzZSAndGltZSc6XG4gICAgICAgIGNvbnN0IHBhcnNlRGF0ZSA9IGQzX2lzb1BhcnNlKGl0ZW0pO1xuICAgICAgICByZXR1cm4gdGhpcy54QXhpc0Zvcm1hdChwYXJzZURhdGUpO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG4gIH07XG5cbiAgcHJpdmF0ZSB5QXhpc0Zvcm1hdHRlciA9IGl0ZW0gPT4ge1xuICAgIHN3aXRjaCAodGhpcy55QXhpc0Zvcm1hdFR5cGUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIHJldHVybiB0aGlzLnlBeGlzRm9ybWF0KGl0ZW0pO1xuXG4gICAgICBjYXNlICd0aW1lJzpcbiAgICAgICAgY29uc3QgcGFyc2VEYXRlID0gZDNfaXNvUGFyc2UoaXRlbSk7XG4gICAgICAgIHJldHVybiB0aGlzLnlBeGlzRm9ybWF0KHBhcnNlRGF0ZSk7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==