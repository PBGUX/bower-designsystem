/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ElementRef, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { select as d3_select, format as d3_format, scaleLinear as d3_scaleLinear, min as d3_min, max as d3_max, event as d3_event, geoPath as d3_geoPath, geoAlbers as d3_geoAlbers, geoAlbersUsa as d3_geoAlbersUsa, geoMercator as d3_geoMercator } from 'd3';
import * as topojson from 'topojson';
var DatavizBubbleMapComponent = /** @class */ (function () {
    function DatavizBubbleMapComponent(_element, _scroll) {
        var _this = this;
        this._element = _element;
        this._scroll = _scroll;
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
        this.hovered = new EventEmitter();
        this.clicked = new EventEmitter();
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
                function (data, index, nodes) { return _this.bubbleMouseOver(d3_event, data, index, nodes); }))
                    .on('mouseout', (/**
                 * @param {?} data
                 * @param {?} index
                 * @param {?} nodes
                 * @return {?}
                 */
                function (data, index, nodes) { return _this.bubbleMouseOut(d3_event, data, index, nodes); }))
                    .on('click', (/**
                 * @param {?} data
                 * @param {?} index
                 * @param {?} nodes
                 * @return {?}
                 */
                function (data, index, nodes) { return _this.bubbleMouseClick(d3_event, data, index, nodes); }));
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
                this.projection = d3_geoAlbers();
                break;
            case 'geoAlbersUsa':
                this.projection = d3_geoAlbersUsa();
                break;
            case 'geoMercator':
                this.projection = d3_geoMercator();
                break;
            default:
                break;
        }
        switch (this.bubbleLabelFormatType) {
            case 'number':
                this.bubbleLabelFormat = d3_format(this.bubbleLabelFormatString);
                break;
            default:
                this.bubbleLabelFormat = null;
                break;
        }
        switch (this.tooltipValueFormatType) {
            case 'number':
                this.tooltipValueFormat = d3_format(this.tooltipValueFormatString);
                break;
            default:
                this.tooltipValueFormat = null;
        }
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
        this.geoPath = d3_geoPath().projection(this.projection);
        // bubble radius range
        if (this.data && !this.dot) {
            this.bubbleRadius = d3_scaleLinear()
                .range(this.bubbleSizeRange)
                .domain([d3_min(this.data, (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return +d.value; })), d3_max(this.data, (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return +d.value; }))]);
            // font range
            this.fontRange = d3_scaleLinear()
                .range(this.textSizeRange)
                .domain([d3_min(this.data, (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return +d.value; })), d3_max(this.data, (/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return +d.value; }))]);
        }
        // TOOLTIP
        if (!this.hideTooltip) {
            this.tooltip = d3_select('body')
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
        this.chart = d3_select(this._element.nativeElement).attr('aria-hidden', 'true');
        // create chart svg
        this.svg = this.chart
            .append('svg')
            .attr('width', +this.width)
            .attr('height', +this.height + this.margin.top + this.margin.bottom)
            .attr('class', 'img-fluid')
            .attr('preserveAspectRatio', 'xMinYMin meet')
            .attr('viewBox', "-" + this.margin.left + " -" + this.margin.top + " " + +this.width + " " + (+this.height + this.margin.top + this.margin.bottom))
            .append('g')
            .attr('class', 'container');
        // map
        this.svg
            .append('g')
            .attr('class', 'map')
            .selectAll('path')
            .data(this.topojsonFeature.features)
            .enter()
            .append('path')
            .attr('class', 'feature')
            .attr('d', this.geoPath);
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
        { type: Component, args: [{
                    selector: 'pbds-dataviz-bubble-map',
                    template: "",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    DatavizBubbleMapComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ViewportScroller }
    ]; };
    DatavizBubbleMapComponent.propDecorators = {
        chartClass: [{ type: HostBinding, args: ['class.pbds-chart',] }],
        bubbleMapClass: [{ type: HostBinding, args: ['class.pbds-chart-bubble-map',] }],
        data: [{ type: Input }],
        topojson: [{ type: Input }],
        feature: [{ type: Input }],
        projectionType: [{ type: Input }],
        scale: [{ type: Input }],
        center: [{ type: Input }],
        width: [{ type: Input }],
        height: [{ type: Input }],
        type: [{ type: Input }],
        dot: [{ type: Input }],
        marginTop: [{ type: Input }],
        marginRight: [{ type: Input }],
        marginBottom: [{ type: Input }],
        marginLeft: [{ type: Input }],
        color: [{ type: Input }],
        textColor: [{ type: Input }],
        textSizeRange: [{ type: Input }],
        dotSize: [{ type: Input }],
        bubbleSizeRange: [{ type: Input }],
        bubbleLabelFormatType: [{ type: Input }],
        bubbleLabelFormatString: [{ type: Input }],
        hideTooltip: [{ type: Input }],
        hideTooltipValue: [{ type: Input }],
        tooltipValueFormatType: [{ type: Input }],
        tooltipValueFormatString: [{ type: Input }],
        hovered: [{ type: Output }],
        clicked: [{ type: Output }]
    };
    return DatavizBubbleMapComponent;
}());
export { DatavizBubbleMapComponent };
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXZpei1idWJibGUtbWFwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3BiLWRlc2lnbi1zeXN0ZW0vIiwic291cmNlcyI6WyJsaWIvZGF0YXZpei9kYXRhdml6LWJ1YmJsZS1tYXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUdULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFVBQVUsRUFDVixXQUFXLEVBR1gsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRW5ELE9BQU8sRUFDTCxNQUFNLElBQUksU0FBUyxFQUNuQixNQUFNLElBQUksU0FBUyxFQUNuQixXQUFXLElBQUksY0FBYyxFQUM3QixHQUFHLElBQUksTUFBTSxFQUNiLEdBQUcsSUFBSSxNQUFNLEVBQ2IsS0FBSyxJQUFJLFFBQVEsRUFDakIsT0FBTyxJQUFJLFVBQVUsRUFDckIsU0FBUyxJQUFJLFlBQVksRUFDekIsWUFBWSxJQUFJLGVBQWUsRUFDL0IsV0FBVyxJQUFJLGNBQWMsRUFDOUIsTUFBTSxJQUFJLENBQUM7QUFFWixPQUFPLEtBQUssUUFBUSxNQUFNLFVBQVUsQ0FBQztBQUlyQztJQTJHRSxtQ0FBb0IsUUFBb0IsRUFBVSxPQUF5QjtRQUEzRSxpQkFBK0U7UUFBM0QsYUFBUSxHQUFSLFFBQVEsQ0FBWTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBbkczRSxlQUFVLEdBQUcsSUFBSSxDQUFDO1FBR2xCLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBU3RCLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFNYixVQUFLLEdBQUcsSUFBSSxDQUFDO1FBR2IsV0FBTSxHQUFHLElBQUksQ0FBQztRQUdkLFVBQUssR0FBRyxHQUFHLENBQUM7UUFHWixXQUFNLEdBQUcsR0FBRyxDQUFDO1FBR2IsU0FBSSxHQUFnQyxRQUFRLENBQUMsQ0FBQyxrQ0FBa0M7O1FBR2hGLFFBQUcsR0FBRyxLQUFLLENBQUM7UUFHWixjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBR2QsZ0JBQVcsR0FBRyxDQUFDLENBQUM7UUFHaEIsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFHakIsZUFBVSxHQUFHLENBQUMsQ0FBQztRQUdmLFVBQUssR0FBRyxTQUFTLENBQUM7UUFHbEIsY0FBUyxHQUFHLE1BQU0sQ0FBQztRQUduQixrQkFBYSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBR3pCLFlBQU8sR0FBRyxDQUFDLENBQUM7UUFHWixvQkFBZSxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRzlCLDBCQUFxQixHQUFhLElBQUksQ0FBQztRQUd2Qyw0QkFBdUIsR0FBRyxFQUFFLENBQUM7UUFHN0IsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFHcEIscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBR3pCLDJCQUFzQixHQUFhLElBQUksQ0FBQztRQUd4Qyw2QkFBd0IsR0FBRyxFQUFFLENBQUM7UUFHOUIsWUFBTyxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBRzNELFlBQU8sR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQXlLM0QsZ0JBQVc7OztRQUFHO1lBQ1osVUFBVTtZQUVWLEtBQUksQ0FBQyxlQUFlO2lCQUNqQixTQUFTLENBQUMsUUFBUSxDQUFDO2lCQUNuQixJQUFJLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQztpQkFDZixJQUFJOzs7O1lBQ0gsVUFBQSxLQUFLO2dCQUNILE9BQUEsS0FBSztxQkFDRixNQUFNLENBQUMsUUFBUSxDQUFDO3FCQUNoQixJQUFJLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQztxQkFDM0IsT0FBTyxDQUFDLE9BQU8sRUFBRSxLQUFJLENBQUMsR0FBRyxDQUFDO3FCQUMxQixJQUFJLENBQUMsSUFBSTs7OztnQkFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUE3QyxDQUE2QyxFQUFDO3FCQUM5RCxJQUFJLENBQUMsSUFBSTs7OztnQkFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUE3QyxDQUE2QyxFQUFDO3FCQUM5RCxJQUFJLENBQUMsR0FBRzs7OztnQkFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxLQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFJLEtBQUksQ0FBQyxPQUFPLE9BQUksQ0FBQyxFQUF6RSxDQUF5RSxFQUFDO1lBTjVGLENBTTRGOzs7O1lBQzlGLFVBQUEsTUFBTTtnQkFDSixPQUFBLE1BQU07cUJBQ0gsVUFBVSxFQUFFO3FCQUNaLFFBQVEsQ0FBQyxJQUFJLENBQUM7cUJBQ2QsSUFBSSxDQUFDLElBQUk7Ozs7Z0JBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBN0MsQ0FBNkMsRUFBQztxQkFDOUQsSUFBSSxDQUFDLElBQUk7Ozs7Z0JBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBN0MsQ0FBNkMsRUFBQztxQkFDOUQsSUFBSSxDQUFDLEdBQUc7Ozs7Z0JBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBSSxLQUFJLENBQUMsT0FBTyxPQUFJLENBQUMsRUFBekUsQ0FBeUUsRUFBQztxQkFDekYsVUFBVSxFQUFFO3FCQUNaLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUM7WUFQakMsQ0FPaUM7Ozs7WUFDbkMsVUFBQSxJQUFJO2dCQUNGLE9BQUEsSUFBSTtxQkFDRCxVQUFVLEVBQUU7cUJBQ1osSUFBSSxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQztxQkFDOUIsTUFBTSxFQUFFO1lBSFgsQ0FHVyxFQUNkLENBQUM7WUFFSixJQUFJLENBQUMsS0FBSSxDQUFDLFdBQVcsRUFBRTtnQkFDckIsS0FBSSxDQUFDLGVBQWU7cUJBQ2pCLFNBQVMsQ0FBQyxRQUFRLENBQUM7cUJBQ25CLEVBQUUsQ0FBQyxXQUFXOzs7Ozs7Z0JBQUUsVUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssSUFBSyxPQUFBLEtBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQWxELENBQWtELEVBQUM7cUJBQzNGLEVBQUUsQ0FBQyxVQUFVOzs7Ozs7Z0JBQUUsVUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssSUFBSyxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQWpELENBQWlELEVBQUM7cUJBQ3pGLEVBQUUsQ0FBQyxPQUFPOzs7Ozs7Z0JBQUUsVUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssSUFBSyxPQUFBLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBbkQsQ0FBbUQsRUFBQyxDQUFDO2dCQUU1RixjQUFjO2dCQUNkLElBQUksS0FBSSxDQUFDLElBQUksS0FBSyxNQUFNLElBQUksQ0FBQyxLQUFJLENBQUMsR0FBRyxFQUFFO29CQUNyQyxLQUFJLENBQUMsZUFBZTt5QkFDakIsU0FBUyxDQUFDLE1BQU0sQ0FBQzt5QkFDakIsSUFBSSxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUM7eUJBQ2YsSUFBSTs7OztvQkFDSCxVQUFBLEtBQUs7d0JBQ0gsT0FBQSxLQUFLOzZCQUNGLE1BQU0sQ0FBQyxNQUFNLENBQUM7NkJBQ2QsSUFBSTs7Ozt3QkFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQXBFLENBQW9FLEVBQUM7NkJBQy9FLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDOzZCQUN6QixLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUksQ0FBQyxTQUFTLENBQUM7NkJBQzdCLEtBQUssQ0FBQyxXQUFXOzs7O3dCQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFJLEVBQTFDLENBQTBDLEVBQUM7NkJBQ25FLElBQUksQ0FBQyxHQUFHOzs7O3dCQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQTdDLENBQTZDLEVBQUM7NkJBQzdELElBQUksQ0FBQyxHQUFHOzs7O3dCQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQTdDLENBQTZDLEVBQUM7NkJBQzdELElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDO29CQVJyQixDQVFxQjs7OztvQkFDdkIsVUFBQSxNQUFNO3dCQUNKLE9BQUEsTUFBTTs2QkFDSCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDOzZCQUM5QixVQUFVLEVBQUU7NkJBQ1osUUFBUSxDQUFDLElBQUksQ0FBQzs2QkFDZCxJQUFJOzs7O3dCQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBcEUsQ0FBb0UsRUFBQzs2QkFDL0UsS0FBSyxDQUFDLFdBQVc7Ozs7d0JBQUUsVUFBQSxDQUFDLElBQUksT0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQUksRUFBMUMsQ0FBMEMsRUFBQzs2QkFDbkUsSUFBSSxDQUFDLEdBQUc7Ozs7d0JBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBN0MsQ0FBNkMsRUFBQzs2QkFDN0QsSUFBSSxDQUFDLEdBQUc7Ozs7d0JBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBN0MsQ0FBNkMsRUFBQzs2QkFDN0QsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUM7NkJBQ2xCLFVBQVUsRUFBRTs2QkFDWixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDO29CQVZqQyxDQVVpQzs7OztvQkFDbkMsVUFBQSxJQUFJO3dCQUNGLE9BQUEsSUFBSTs2QkFDRCxVQUFVLEVBQUU7NkJBQ1osSUFBSSxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQzs2QkFDOUIsTUFBTSxFQUFFO29CQUhYLENBR1csRUFDZCxDQUFDO2lCQUNMO2FBQ0Y7UUFDSCxDQUFDLEVBQUM7UUFFRixvQkFBZTs7Ozs7OztRQUFHLFVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSztZQUMxQyxLQUFJLENBQUMsS0FBSztpQkFDUCxTQUFTLENBQUMsYUFBYSxDQUFDO2lCQUN4QixNQUFNOzs7OztZQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLENBQUMsS0FBSyxLQUFLLEVBQVgsQ0FBVyxFQUFDO2lCQUM3QixPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRTdCLEtBQUksQ0FBQyxLQUFLO2lCQUNQLFNBQVMsQ0FBQyxhQUFhLENBQUM7aUJBQ3hCLE1BQU07Ozs7O1lBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxLQUFLLEtBQUssRUFBWCxDQUFXLEVBQUM7aUJBQzdCLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFM0IsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFFckMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLE9BQUEsRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDLENBQUM7UUFDckMsQ0FBQyxFQUFDO1FBRUYsbUJBQWM7Ozs7Ozs7UUFBRyxVQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUs7WUFDekMsS0FBSSxDQUFDLEtBQUs7aUJBQ1AsU0FBUyxDQUFDLGFBQWEsQ0FBQztpQkFDeEIsT0FBTyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUM7aUJBQ3hCLE9BQU8sQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFFOUIsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JCLENBQUMsRUFBQztRQUVGLHFCQUFnQjs7Ozs7OztRQUFHLFVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSztZQUMzQyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssT0FBQSxFQUFFLElBQUksTUFBQSxFQUFFLENBQUMsQ0FBQztRQUNyQyxDQUFDLEVBQUM7UUFFTSxnQkFBVzs7Ozs7UUFBRyxVQUFDLElBQUksRUFBRSxJQUFJOztnQkFDekIsVUFBVSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRTs7Z0JBQ3pDLE1BQU0sR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFO1lBRS9DLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSTs7OztZQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBRyxJQUFJLENBQUMsS0FBTyxFQUFmLENBQWUsRUFBQyxDQUFDO1lBRWxFLElBQUksQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQzFCLEtBQUksQ0FBQyxPQUFPO3FCQUNULE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztxQkFDeEIsSUFBSTs7OztnQkFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsS0FBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxLQUFHLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUcsSUFBSSxDQUFDLEtBQU8sQ0FBQyxFQUF0RixDQUFzRixFQUFDLENBQUM7YUFDdEc7O2dCQUVLLGtCQUFrQixHQUFHLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLEdBQUcsQ0FBQzs7Z0JBQ3pELG1CQUFtQixHQUFHLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxZQUFZLEdBQUcsQ0FBQztZQUVqRSxLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLG1CQUFtQixPQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDeEYsS0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxrQkFBa0IsR0FBRyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxPQUFJLENBQUMsQ0FBQztZQUM5RyxLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkMsQ0FBQyxFQUFDO1FBRU0sZ0JBQVc7OztRQUFHO1lBQ3BCLEtBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNuQyxDQUFDLEVBQUM7SUF6UjRFLENBQUM7Ozs7SUFFL0UsNENBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLE1BQU0sR0FBRztZQUNaLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTO1lBQ3BCLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXO1lBQ3hCLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZO1lBQzFCLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVO1NBQ3ZCLENBQUM7UUFFRixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO1lBQ3pCLG9CQUFvQjtZQUNwQixRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ2pCLEtBQUssUUFBUTtvQkFDWCxNQUFNO2dCQUVSLEtBQUssTUFBTTtvQkFDVCxNQUFNO2FBQ1Q7U0FDRjtRQUVELFFBQVEsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUMzQixLQUFLLFdBQVc7Z0JBQ2QsSUFBSSxDQUFDLFVBQVUsR0FBRyxZQUFZLEVBQUUsQ0FBQztnQkFDakMsTUFBTTtZQUVSLEtBQUssY0FBYztnQkFDakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxlQUFlLEVBQUUsQ0FBQztnQkFDcEMsTUFBTTtZQUVSLEtBQUssYUFBYTtnQkFDaEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxjQUFjLEVBQUUsQ0FBQztnQkFDbkMsTUFBTTtZQUVSO2dCQUNFLE1BQU07U0FDVDtRQUVELFFBQVEsSUFBSSxDQUFDLHFCQUFxQixFQUFFO1lBQ2xDLEtBQUssUUFBUTtnQkFDWCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO2dCQUNqRSxNQUFNO1lBRVI7Z0JBQ0UsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztnQkFDOUIsTUFBTTtTQUNUO1FBRUQsUUFBUSxJQUFJLENBQUMsc0JBQXNCLEVBQUU7WUFDbkMsS0FBSyxRQUFRO2dCQUNYLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7Z0JBQ25FLE1BQU07WUFFUjtnQkFDRSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1NBQ2xDO1FBRUQsNENBQTRDO1FBRTVDLElBQUksQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzVGLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUUzRSwyREFBMkQ7UUFDM0QsK0dBQStHO1FBQy9HLG9DQUFvQztRQUVwQyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwQztRQUVELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNyQztRQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUV4RCxzQkFBc0I7UUFDdEIsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLGNBQWMsRUFBRTtpQkFDakMsS0FBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7aUJBQzNCLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSTs7OztnQkFBRSxVQUFDLENBQU0sSUFBSyxPQUFBLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBUixDQUFRLEVBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUk7Ozs7Z0JBQUUsVUFBQyxDQUFNLElBQUssT0FBQSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQVIsQ0FBUSxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTlGLGFBQWE7WUFDYixJQUFJLENBQUMsU0FBUyxHQUFHLGNBQWMsRUFBRTtpQkFDOUIsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7aUJBQ3pCLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSTs7OztnQkFBRSxVQUFDLENBQU0sSUFBSyxPQUFBLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBUixDQUFRLEVBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUk7Ozs7Z0JBQUUsVUFBQyxDQUFNLElBQUssT0FBQSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQVIsQ0FBUSxFQUFDLENBQUMsQ0FBQyxDQUFDO1NBQy9GO1FBRUQsVUFBVTtRQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztpQkFDN0IsTUFBTSxDQUFDLEtBQUssQ0FBQztpQkFDYixJQUFJLENBQUMsT0FBTyxFQUFFLG9CQUFvQixDQUFDO2lCQUNuQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztpQkFDbkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLGlDQUFpQztZQUVqRSxpQkFBaUI7WUFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCO2dCQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7U0FDdkY7UUFFRCxtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRWhGLG1CQUFtQjtRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLO2FBQ2xCLE1BQU0sQ0FBQyxLQUFLLENBQUM7YUFDYixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUMxQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQzthQUNuRSxJQUFJLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQzthQUMxQixJQUFJLENBQUMscUJBQXFCLEVBQUUsZUFBZSxDQUFDO2FBQzVDLElBQUksQ0FDSCxTQUFTLEVBQ1QsTUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksVUFBSyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsU0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLFVBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFFLENBQ2pIO2FBQ0EsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNYLElBQUksQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFOUIsTUFBTTtRQUNOLElBQUksQ0FBQyxHQUFHO2FBQ0wsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNYLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDO2FBQ3BCLFNBQVMsQ0FBQyxNQUFNLENBQUM7YUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDO2FBQ25DLEtBQUssRUFBRTthQUNQLE1BQU0sQ0FBQyxNQUFNLENBQUM7YUFDZCxJQUFJLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQzthQUN4QixJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUzQixVQUFVO1FBQ1YsSUFBSSxDQUFDLEdBQUc7YUFDTCxNQUFNLENBQUMsTUFBTSxDQUFDO2FBQ2QsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7YUFDckIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDOzs7OztRQUFFLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLENBQUMsS0FBSyxDQUFDLEVBQVAsQ0FBTyxFQUFDLENBQUM7YUFDM0YsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFM0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsR0FBRzthQUM1QixNQUFNLENBQUMsR0FBRyxDQUFDO2FBQ1gsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7YUFDckIsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFOUIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBRUQsK0NBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQzdDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNwQjtJQUNILENBQUM7Ozs7SUFFRCwrQ0FBVzs7O0lBQVg7UUFDRSxJQUFJLElBQUksQ0FBQyxPQUFPO1lBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUMxQyxDQUFDOztnQkFuUUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLFFBQVEsRUFBRSxFQUFFO29CQUVaLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs7OztnQkEvQkMsVUFBVTtnQkFPSCxnQkFBZ0I7Ozs2QkEwQnRCLFdBQVcsU0FBQyxrQkFBa0I7aUNBRzlCLFdBQVcsU0FBQyw2QkFBNkI7dUJBR3pDLEtBQUs7MkJBR0wsS0FBSzswQkFHTCxLQUFLO2lDQUdMLEtBQUs7d0JBR0wsS0FBSzt5QkFHTCxLQUFLO3dCQUdMLEtBQUs7eUJBR0wsS0FBSzt1QkFHTCxLQUFLO3NCQUdMLEtBQUs7NEJBR0wsS0FBSzs4QkFHTCxLQUFLOytCQUdMLEtBQUs7NkJBR0wsS0FBSzt3QkFHTCxLQUFLOzRCQUdMLEtBQUs7Z0NBR0wsS0FBSzswQkFHTCxLQUFLO2tDQUdMLEtBQUs7d0NBR0wsS0FBSzswQ0FHTCxLQUFLOzhCQUdMLEtBQUs7bUNBR0wsS0FBSzt5Q0FHTCxLQUFLOzJDQUdMLEtBQUs7MEJBR0wsTUFBTTswQkFHTixNQUFNOztJQTBTVCxnQ0FBQztDQUFBLEFBcllELElBcVlDO1NBL1hZLHlCQUF5Qjs7O0lBQ3BDLCtDQUNrQjs7SUFFbEIsbURBQ3NCOztJQUV0Qix5Q0FDZ0M7O0lBRWhDLDZDQUNTOztJQUVULDRDQUNhOztJQUViLG1EQUNlOztJQUVmLDBDQUNhOztJQUViLDJDQUNjOztJQUVkLDBDQUNZOztJQUVaLDJDQUNhOztJQUViLHlDQUM2Qzs7SUFFN0Msd0NBQ1k7O0lBRVosOENBQ2M7O0lBRWQsZ0RBQ2dCOztJQUVoQixpREFDaUI7O0lBRWpCLCtDQUNlOztJQUVmLDBDQUNrQjs7SUFFbEIsOENBQ21COztJQUVuQixrREFDeUI7O0lBRXpCLDRDQUNZOztJQUVaLG9EQUM4Qjs7SUFFOUIsMERBQ3VDOztJQUV2Qyw0REFDNkI7O0lBRTdCLGdEQUNvQjs7SUFFcEIscURBQ3lCOztJQUV6QiwyREFDd0M7O0lBRXhDLDZEQUM4Qjs7SUFFOUIsNENBQzJEOztJQUUzRCw0Q0FDMkQ7Ozs7O0lBRTNELCtDQUFtQjs7Ozs7SUFDbkIsNENBQWdCOzs7OztJQUNoQixvREFBd0I7Ozs7O0lBQ3hCLDBDQUFjOzs7OztJQUNkLHdDQUFZOzs7OztJQUNaLDJDQUFlOzs7OztJQUNmLG9EQUF3Qjs7Ozs7SUFDeEIsaURBQXFCOzs7OztJQUNyQiw4Q0FBa0I7Ozs7O0lBQ2xCLHNEQUEwQjs7Ozs7SUFDMUIsNENBQWdCOzs7OztJQUNoQix1REFBMkI7O0lBNEozQixnREEwRUU7O0lBRUYsb0RBY0U7O0lBRUYsbURBT0U7O0lBRUYscURBRUU7Ozs7O0lBRUYsZ0RBa0JFOzs7OztJQUVGLGdEQUVFOzs7OztJQXpSVSw2Q0FBNEI7Ozs7O0lBQUUsNENBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIE9uQ2hhbmdlcyxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBFbGVtZW50UmVmLFxuICBIb3N0QmluZGluZyxcbiAgT25EZXN0cm95LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgVmlld3BvcnRTY3JvbGxlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7XG4gIHNlbGVjdCBhcyBkM19zZWxlY3QsXG4gIGZvcm1hdCBhcyBkM19mb3JtYXQsXG4gIHNjYWxlTGluZWFyIGFzIGQzX3NjYWxlTGluZWFyLFxuICBtaW4gYXMgZDNfbWluLFxuICBtYXggYXMgZDNfbWF4LFxuICBldmVudCBhcyBkM19ldmVudCxcbiAgZ2VvUGF0aCBhcyBkM19nZW9QYXRoLFxuICBnZW9BbGJlcnMgYXMgZDNfZ2VvQWxiZXJzLFxuICBnZW9BbGJlcnNVc2EgYXMgZDNfZ2VvQWxiZXJzVXNhLFxuICBnZW9NZXJjYXRvciBhcyBkM19nZW9NZXJjYXRvclxufSBmcm9tICdkMyc7XG5cbmltcG9ydCAqIGFzIHRvcG9qc29uIGZyb20gJ3RvcG9qc29uJztcblxuaW1wb3J0IHsgUGJkc0RhdGF2aXpNYXBEYXRhIH0gZnJvbSAnLi9kYXRhdml6LmludGVyZmFjZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYmRzLWRhdGF2aXotYnViYmxlLW1hcCcsXG4gIHRlbXBsYXRlOiBgYCxcbiAgc3R5bGVzOiBbXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgRGF0YXZpekJ1YmJsZU1hcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnBiZHMtY2hhcnQnKVxuICBjaGFydENsYXNzID0gdHJ1ZTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnBiZHMtY2hhcnQtYnViYmxlLW1hcCcpXG4gIGJ1YmJsZU1hcENsYXNzID0gdHJ1ZTtcblxuICBASW5wdXQoKVxuICBkYXRhOiBBcnJheTxQYmRzRGF0YXZpek1hcERhdGE+O1xuXG4gIEBJbnB1dCgpXG4gIHRvcG9qc29uO1xuXG4gIEBJbnB1dCgpXG4gIGZlYXR1cmUgPSAnJztcblxuICBASW5wdXQoKVxuICBwcm9qZWN0aW9uVHlwZTtcblxuICBASW5wdXQoKVxuICBzY2FsZSA9IG51bGw7XG5cbiAgQElucHV0KClcbiAgY2VudGVyID0gbnVsbDtcblxuICBASW5wdXQoKVxuICB3aWR0aCA9IDMwNjtcblxuICBASW5wdXQoKVxuICBoZWlnaHQgPSA0MDA7XG5cbiAgQElucHV0KClcbiAgdHlwZTogJ21lZGl1bScgfCAnaGlnaCcgfCAnZGVidWcnID0gJ21lZGl1bSc7IC8vIGRlYnVnIHRvIHNob3cgYWxsIGNoYXJ0IG9wdGlvbnNcblxuICBASW5wdXQoKVxuICBkb3QgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBtYXJnaW5Ub3AgPSAwO1xuXG4gIEBJbnB1dCgpXG4gIG1hcmdpblJpZ2h0ID0gMDtcblxuICBASW5wdXQoKVxuICBtYXJnaW5Cb3R0b20gPSAwO1xuXG4gIEBJbnB1dCgpXG4gIG1hcmdpbkxlZnQgPSAwO1xuXG4gIEBJbnB1dCgpXG4gIGNvbG9yID0gJyNlZjgyMDAnO1xuXG4gIEBJbnB1dCgpXG4gIHRleHRDb2xvciA9ICcjZmZmJztcblxuICBASW5wdXQoKVxuICB0ZXh0U2l6ZVJhbmdlID0gWzE0LCAyNF07XG5cbiAgQElucHV0KClcbiAgZG90U2l6ZSA9IDQ7XG5cbiAgQElucHV0KClcbiAgYnViYmxlU2l6ZVJhbmdlID0gWzUwMCwgMjAwMF07XG5cbiAgQElucHV0KClcbiAgYnViYmxlTGFiZWxGb3JtYXRUeXBlOiAnbnVtYmVyJyA9IG51bGw7XG5cbiAgQElucHV0KClcbiAgYnViYmxlTGFiZWxGb3JtYXRTdHJpbmcgPSAnJztcblxuICBASW5wdXQoKVxuICBoaWRlVG9vbHRpcCA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIGhpZGVUb29sdGlwVmFsdWUgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICB0b29sdGlwVmFsdWVGb3JtYXRUeXBlOiAnbnVtYmVyJyA9IG51bGw7XG5cbiAgQElucHV0KClcbiAgdG9vbHRpcFZhbHVlRm9ybWF0U3RyaW5nID0gJyc7XG5cbiAgQE91dHB1dCgpXG4gIGhvdmVyZWQ6IEV2ZW50RW1pdHRlcjxvYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcjxvYmplY3Q+KCk7XG5cbiAgQE91dHB1dCgpXG4gIGNsaWNrZWQ6IEV2ZW50RW1pdHRlcjxvYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcjxvYmplY3Q+KCk7XG5cbiAgcHJpdmF0ZSBwcm9qZWN0aW9uO1xuICBwcml2YXRlIGdlb1BhdGg7XG4gIHByaXZhdGUgdG9wb2pzb25GZWF0dXJlO1xuICBwcml2YXRlIGNoYXJ0O1xuICBwcml2YXRlIHN2ZztcbiAgcHJpdmF0ZSBtYXJnaW47XG4gIHByaXZhdGUgYnViYmxlQ29udGFpbmVyO1xuICBwcml2YXRlIGJ1YmJsZVJhZGl1cztcbiAgcHJpdmF0ZSBmb250UmFuZ2U7XG4gIHByaXZhdGUgYnViYmxlTGFiZWxGb3JtYXQ7XG4gIHByaXZhdGUgdG9vbHRpcDtcbiAgcHJpdmF0ZSB0b29sdGlwVmFsdWVGb3JtYXQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSBfc2Nyb2xsOiBWaWV3cG9ydFNjcm9sbGVyKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubWFyZ2luID0ge1xuICAgICAgdG9wOiArdGhpcy5tYXJnaW5Ub3AsXG4gICAgICByaWdodDogK3RoaXMubWFyZ2luUmlnaHQsXG4gICAgICBib3R0b206ICt0aGlzLm1hcmdpbkJvdHRvbSxcbiAgICAgIGxlZnQ6ICt0aGlzLm1hcmdpbkxlZnRcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMudHlwZSAhPT0gJ2RlYnVnJykge1xuICAgICAgLy8gc2V0IHR5cGUgZGVmYXVsdHNcbiAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICAgIGNhc2UgJ21lZGl1bSc6XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnaGlnaCc6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3dpdGNoICh0aGlzLnByb2plY3Rpb25UeXBlKSB7XG4gICAgICBjYXNlICdnZW9BbGJlcnMnOlxuICAgICAgICB0aGlzLnByb2plY3Rpb24gPSBkM19nZW9BbGJlcnMoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2dlb0FsYmVyc1VzYSc6XG4gICAgICAgIHRoaXMucHJvamVjdGlvbiA9IGQzX2dlb0FsYmVyc1VzYSgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnZ2VvTWVyY2F0b3InOlxuICAgICAgICB0aGlzLnByb2plY3Rpb24gPSBkM19nZW9NZXJjYXRvcigpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgc3dpdGNoICh0aGlzLmJ1YmJsZUxhYmVsRm9ybWF0VHlwZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgdGhpcy5idWJibGVMYWJlbEZvcm1hdCA9IGQzX2Zvcm1hdCh0aGlzLmJ1YmJsZUxhYmVsRm9ybWF0U3RyaW5nKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuYnViYmxlTGFiZWxGb3JtYXQgPSBudWxsO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHRoaXMudG9vbHRpcFZhbHVlRm9ybWF0VHlwZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgdGhpcy50b29sdGlwVmFsdWVGb3JtYXQgPSBkM19mb3JtYXQodGhpcy50b29sdGlwVmFsdWVGb3JtYXRTdHJpbmcpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy50b29sdGlwVmFsdWVGb3JtYXQgPSBudWxsO1xuICAgIH1cblxuICAgIC8vIGNvbnNvbGUubG9nKCdUT1BPSlNPTjogJywgdGhpcy50b3BvanNvbik7XG5cbiAgICB0aGlzLnRvcG9qc29uRmVhdHVyZSA9IHRvcG9qc29uLmZlYXR1cmUodGhpcy50b3BvanNvbiwgdGhpcy50b3BvanNvbi5vYmplY3RzW3RoaXMuZmVhdHVyZV0pO1xuICAgIHRoaXMucHJvamVjdGlvbi5maXRTaXplKFsrdGhpcy53aWR0aCwgK3RoaXMuaGVpZ2h0XSwgdGhpcy50b3BvanNvbkZlYXR1cmUpO1xuXG4gICAgLy8gY29uc29sZS5sb2coJ1RPUE9KU09OIEZFQVRVUkU6ICcsIHRoaXMudG9wb2pzb25GZWF0dXJlKTtcbiAgICAvLyBjb25zb2xlLmxvZygnTUVTSDogJywgdG9wb2pzb24ubWVzaCh0aGlzLnRvcG9qc29uLCB0aGlzLnRvcG9qc29uLm9iamVjdHNbdGhpcy5mZWF0dXJlXSwgKGEsIGIpID0+IGEgIT09IGIpKTtcbiAgICAvLyBjb25zb2xlLmxvZygnREFUQTogJywgdGhpcy5kYXRhKTtcblxuICAgIGlmICh0aGlzLnNjYWxlKSB7XG4gICAgICB0aGlzLnByb2plY3Rpb24uc2NhbGUoK3RoaXMuc2NhbGUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNlbnRlcikge1xuICAgICAgdGhpcy5wcm9qZWN0aW9uLmNlbnRlcih0aGlzLmNlbnRlcik7XG4gICAgfVxuXG4gICAgdGhpcy5nZW9QYXRoID0gZDNfZ2VvUGF0aCgpLnByb2plY3Rpb24odGhpcy5wcm9qZWN0aW9uKTtcblxuICAgIC8vIGJ1YmJsZSByYWRpdXMgcmFuZ2VcbiAgICBpZiAodGhpcy5kYXRhICYmICF0aGlzLmRvdCkge1xuICAgICAgdGhpcy5idWJibGVSYWRpdXMgPSBkM19zY2FsZUxpbmVhcigpXG4gICAgICAgIC5yYW5nZSh0aGlzLmJ1YmJsZVNpemVSYW5nZSlcbiAgICAgICAgLmRvbWFpbihbZDNfbWluKHRoaXMuZGF0YSwgKGQ6IGFueSkgPT4gK2QudmFsdWUpLCBkM19tYXgodGhpcy5kYXRhLCAoZDogYW55KSA9PiArZC52YWx1ZSldKTtcblxuICAgICAgLy8gZm9udCByYW5nZVxuICAgICAgdGhpcy5mb250UmFuZ2UgPSBkM19zY2FsZUxpbmVhcigpXG4gICAgICAgIC5yYW5nZSh0aGlzLnRleHRTaXplUmFuZ2UpXG4gICAgICAgIC5kb21haW4oW2QzX21pbih0aGlzLmRhdGEsIChkOiBhbnkpID0+ICtkLnZhbHVlKSwgZDNfbWF4KHRoaXMuZGF0YSwgKGQ6IGFueSkgPT4gK2QudmFsdWUpXSk7XG4gICAgfVxuXG4gICAgLy8gVE9PTFRJUFxuICAgIGlmICghdGhpcy5oaWRlVG9vbHRpcCkge1xuICAgICAgdGhpcy50b29sdGlwID0gZDNfc2VsZWN0KCdib2R5JylcbiAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BiZHMtdG9vbHRpcCBzb3V0aCcpXG4gICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDApXG4gICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7IC8vIGhpZGUgdG9vbHRpcCBmb3IgYWNjZXNzaWJpbGl0eVxuXG4gICAgICAvLyB0b29sdGlwIGhlYWRlclxuICAgICAgdGhpcy50b29sdGlwLmFwcGVuZCgnZGl2JykuYXR0cignY2xhc3MnLCAndG9vbHRpcC1oZWFkZXInKTtcbiAgICAgIGlmICghdGhpcy5oaWRlVG9vbHRpcFZhbHVlKSB0aGlzLnRvb2x0aXAuYXBwZW5kKCdkaXYnKS5hdHRyKCdjbGFzcycsICd0b29sdGlwLXZhbHVlJyk7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIHRoZSBjaGFydFxuICAgIHRoaXMuY2hhcnQgPSBkM19zZWxlY3QodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50KS5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbiAgICAvLyBjcmVhdGUgY2hhcnQgc3ZnXG4gICAgdGhpcy5zdmcgPSB0aGlzLmNoYXJ0XG4gICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgLmF0dHIoJ3dpZHRoJywgK3RoaXMud2lkdGgpXG4gICAgICAuYXR0cignaGVpZ2h0JywgK3RoaXMuaGVpZ2h0ICsgdGhpcy5tYXJnaW4udG9wICsgdGhpcy5tYXJnaW4uYm90dG9tKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2ltZy1mbHVpZCcpXG4gICAgICAuYXR0cigncHJlc2VydmVBc3BlY3RSYXRpbycsICd4TWluWU1pbiBtZWV0JylcbiAgICAgIC5hdHRyKFxuICAgICAgICAndmlld0JveCcsXG4gICAgICAgIGAtJHt0aGlzLm1hcmdpbi5sZWZ0fSAtJHt0aGlzLm1hcmdpbi50b3B9ICR7K3RoaXMud2lkdGh9ICR7K3RoaXMuaGVpZ2h0ICsgdGhpcy5tYXJnaW4udG9wICsgdGhpcy5tYXJnaW4uYm90dG9tfWBcbiAgICAgIClcbiAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NvbnRhaW5lcicpO1xuXG4gICAgLy8gbWFwXG4gICAgdGhpcy5zdmdcbiAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ21hcCcpXG4gICAgICAuc2VsZWN0QWxsKCdwYXRoJylcbiAgICAgIC5kYXRhKHRoaXMudG9wb2pzb25GZWF0dXJlLmZlYXR1cmVzKVxuICAgICAgLmVudGVyKClcbiAgICAgIC5hcHBlbmQoJ3BhdGgnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2ZlYXR1cmUnKVxuICAgICAgLmF0dHIoJ2QnLCB0aGlzLmdlb1BhdGgpO1xuXG4gICAgLy8gYm9yZGVyc1xuICAgIHRoaXMuc3ZnXG4gICAgICAuYXBwZW5kKCdwYXRoJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdtZXNoJylcbiAgICAgIC5kYXR1bSh0b3BvanNvbi5tZXNoKHRoaXMudG9wb2pzb24sIHRoaXMudG9wb2pzb24ub2JqZWN0c1t0aGlzLmZlYXR1cmVdLCAoYSwgYikgPT4gYSAhPT0gYikpXG4gICAgICAuYXR0cignZCcsIHRoaXMuZ2VvUGF0aCk7XG5cbiAgICB0aGlzLmJ1YmJsZUNvbnRhaW5lciA9IHRoaXMuc3ZnXG4gICAgICAuYXBwZW5kKCdnJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdkb3RzJylcbiAgICAgIC5zdHlsZSgnY29sb3InLCB0aGlzLmNvbG9yKTtcblxuICAgIHRoaXMudXBkYXRlQ2hhcnQoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5kYXRhICYmICFjaGFuZ2VzLmRhdGEuZmlyc3RDaGFuZ2UpIHtcbiAgICAgIHRoaXMudXBkYXRlQ2hhcnQoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy50b29sdGlwKSB0aGlzLnRvb2x0aXAucmVtb3ZlKCk7XG4gIH1cblxuICB1cGRhdGVDaGFydCA9ICgpID0+IHtcbiAgICAvLyBidWJibGVzXG5cbiAgICB0aGlzLmJ1YmJsZUNvbnRhaW5lclxuICAgICAgLnNlbGVjdEFsbCgnY2lyY2xlJylcbiAgICAgIC5kYXRhKHRoaXMuZGF0YSlcbiAgICAgIC5qb2luKFxuICAgICAgICBlbnRlciA9PlxuICAgICAgICAgIGVudGVyXG4gICAgICAgICAgICAuYXBwZW5kKCdjaXJjbGUnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2RvdC1jaXJjbGUnKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NvbGlkJywgdGhpcy5kb3QpXG4gICAgICAgICAgICAuYXR0cignY3gnLCBkID0+IHRoaXMucHJvamVjdGlvbihbZC5sb25naXR1ZGUsIGQubGF0aXR1ZGVdKVswXSlcbiAgICAgICAgICAgIC5hdHRyKCdjeScsIGQgPT4gdGhpcy5wcm9qZWN0aW9uKFtkLmxvbmdpdHVkZSwgZC5sYXRpdHVkZV0pWzFdKVxuICAgICAgICAgICAgLmF0dHIoJ3InLCBkID0+ICghdGhpcy5kb3QgPyBNYXRoLnNxcnQodGhpcy5idWJibGVSYWRpdXMoZC52YWx1ZSkpIDogYCR7dGhpcy5kb3RTaXplfXB4YCkpLFxuICAgICAgICB1cGRhdGUgPT5cbiAgICAgICAgICB1cGRhdGVcbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbigxMDAwKVxuICAgICAgICAgICAgLmF0dHIoJ2N4JywgZCA9PiB0aGlzLnByb2plY3Rpb24oW2QubG9uZ2l0dWRlLCBkLmxhdGl0dWRlXSlbMF0pXG4gICAgICAgICAgICAuYXR0cignY3knLCBkID0+IHRoaXMucHJvamVjdGlvbihbZC5sb25naXR1ZGUsIGQubGF0aXR1ZGVdKVsxXSlcbiAgICAgICAgICAgIC5hdHRyKCdyJywgZCA9PiAoIXRoaXMuZG90ID8gTWF0aC5zcXJ0KHRoaXMuYnViYmxlUmFkaXVzKGQudmFsdWUpKSA6IGAke3RoaXMuZG90U2l6ZX1weGApKVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmF0dHIoJ3BvaW50ZXItZXZlbnRzJywgJ2F1dG8nKSxcbiAgICAgICAgZXhpdCA9PlxuICAgICAgICAgIGV4aXRcbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5hdHRyKCdwb2ludGVyLWV2ZW50cycsICdub25lJylcbiAgICAgICAgICAgIC5yZW1vdmUoKVxuICAgICAgKTtcblxuICAgIGlmICghdGhpcy5oaWRlVG9vbHRpcCkge1xuICAgICAgdGhpcy5idWJibGVDb250YWluZXJcbiAgICAgICAgLnNlbGVjdEFsbCgnY2lyY2xlJylcbiAgICAgICAgLm9uKCdtb3VzZW92ZXInLCAoZGF0YSwgaW5kZXgsIG5vZGVzKSA9PiB0aGlzLmJ1YmJsZU1vdXNlT3ZlcihkM19ldmVudCwgZGF0YSwgaW5kZXgsIG5vZGVzKSlcbiAgICAgICAgLm9uKCdtb3VzZW91dCcsIChkYXRhLCBpbmRleCwgbm9kZXMpID0+IHRoaXMuYnViYmxlTW91c2VPdXQoZDNfZXZlbnQsIGRhdGEsIGluZGV4LCBub2RlcykpXG4gICAgICAgIC5vbignY2xpY2snLCAoZGF0YSwgaW5kZXgsIG5vZGVzKSA9PiB0aGlzLmJ1YmJsZU1vdXNlQ2xpY2soZDNfZXZlbnQsIGRhdGEsIGluZGV4LCBub2RlcykpO1xuXG4gICAgICAvLyBidWJibGUgdGV4dFxuICAgICAgaWYgKHRoaXMudHlwZSAhPT0gJ2hpZ2gnICYmICF0aGlzLmRvdCkge1xuICAgICAgICB0aGlzLmJ1YmJsZUNvbnRhaW5lclxuICAgICAgICAgIC5zZWxlY3RBbGwoJ3RleHQnKVxuICAgICAgICAgIC5kYXRhKHRoaXMuZGF0YSlcbiAgICAgICAgICAuam9pbihcbiAgICAgICAgICAgIGVudGVyID0+XG4gICAgICAgICAgICAgIGVudGVyXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgndGV4dCcpXG4gICAgICAgICAgICAgICAgLnRleHQoZCA9PiAodGhpcy5idWJibGVMYWJlbEZvcm1hdCA/IHRoaXMuYnViYmxlTGFiZWxGb3JtYXQoZC52YWx1ZSkgOiBkLnZhbHVlKSlcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZG90LXRleHQnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsIHRoaXMudGV4dENvbG9yKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZm9udC1zaXplJywgZCA9PiBgJHtNYXRoLnJvdW5kKHRoaXMuZm9udFJhbmdlKGQudmFsdWUpKX1weGApXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCBkID0+IHRoaXMucHJvamVjdGlvbihbZC5sb25naXR1ZGUsIGQubGF0aXR1ZGVdKVswXSlcbiAgICAgICAgICAgICAgICAuYXR0cigneScsIGQgPT4gdGhpcy5wcm9qZWN0aW9uKFtkLmxvbmdpdHVkZSwgZC5sYXRpdHVkZV0pWzFdKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdkeScsICcuNGVtJyksXG4gICAgICAgICAgICB1cGRhdGUgPT5cbiAgICAgICAgICAgICAgdXBkYXRlXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKVxuICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgICAgICAgICAgICAudGV4dChkID0+ICh0aGlzLmJ1YmJsZUxhYmVsRm9ybWF0ID8gdGhpcy5idWJibGVMYWJlbEZvcm1hdChkLnZhbHVlKSA6IGQudmFsdWUpKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZm9udC1zaXplJywgZCA9PiBgJHtNYXRoLnJvdW5kKHRoaXMuZm9udFJhbmdlKGQudmFsdWUpKX1weGApXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCBkID0+IHRoaXMucHJvamVjdGlvbihbZC5sb25naXR1ZGUsIGQubGF0aXR1ZGVdKVswXSlcbiAgICAgICAgICAgICAgICAuYXR0cigneScsIGQgPT4gdGhpcy5wcm9qZWN0aW9uKFtkLmxvbmdpdHVkZSwgZC5sYXRpdHVkZV0pWzFdKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdkeScsICcuNGVtJylcbiAgICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3BvaW50ZXItZXZlbnRzJywgJ2F1dG8nKSxcbiAgICAgICAgICAgIGV4aXQgPT5cbiAgICAgICAgICAgICAgZXhpdFxuICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAuYXR0cigncG9pbnRlci1ldmVudHMnLCAnbm9uZScpXG4gICAgICAgICAgICAgICAgLnJlbW92ZSgpXG4gICAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgYnViYmxlTW91c2VPdmVyID0gKGV2ZW50LCBkYXRhLCBpbmRleCwgbm9kZXMpID0+IHtcbiAgICB0aGlzLmNoYXJ0XG4gICAgICAuc2VsZWN0QWxsKCcuZG90LWNpcmNsZScpXG4gICAgICAuZmlsdGVyKChkLCBpKSA9PiBpICE9PSBpbmRleClcbiAgICAgIC5jbGFzc2VkKCdpbmFjdGl2ZScsIHRydWUpO1xuXG4gICAgdGhpcy5jaGFydFxuICAgICAgLnNlbGVjdEFsbCgnLmRvdC1jaXJjbGUnKVxuICAgICAgLmZpbHRlcigoZCwgaSkgPT4gaSA9PT0gaW5kZXgpXG4gICAgICAuY2xhc3NlZCgnYWN0aXZlJywgdHJ1ZSk7XG5cbiAgICB0aGlzLnRvb2x0aXBTaG93KGRhdGEsIG5vZGVzW2luZGV4XSk7XG5cbiAgICB0aGlzLmhvdmVyZWQuZW1pdCh7IGV2ZW50LCBkYXRhIH0pO1xuICB9O1xuXG4gIGJ1YmJsZU1vdXNlT3V0ID0gKGV2ZW50LCBkYXRhLCBpbmRleCwgbm9kZXMpID0+IHtcbiAgICB0aGlzLmNoYXJ0XG4gICAgICAuc2VsZWN0QWxsKCcuZG90LWNpcmNsZScpXG4gICAgICAuY2xhc3NlZCgnYWN0aXZlJywgZmFsc2UpXG4gICAgICAuY2xhc3NlZCgnaW5hY3RpdmUnLCBmYWxzZSk7XG5cbiAgICB0aGlzLnRvb2x0aXBIaWRlKCk7XG4gIH07XG5cbiAgYnViYmxlTW91c2VDbGljayA9IChldmVudCwgZGF0YSwgaW5kZXgsIG5vZGVzKSA9PiB7XG4gICAgdGhpcy5jbGlja2VkLmVtaXQoeyBldmVudCwgZGF0YSB9KTtcbiAgfTtcblxuICBwcml2YXRlIHRvb2x0aXBTaG93ID0gKGRhdGEsIG5vZGUpID0+IHtcbiAgICBjb25zdCBkaW1lbnNpb25zID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBzY3JvbGwgPSB0aGlzLl9zY3JvbGwuZ2V0U2Nyb2xsUG9zaXRpb24oKTtcblxuICAgIHRoaXMudG9vbHRpcC5zZWxlY3QoJy50b29sdGlwLWhlYWRlcicpLmh0bWwoZCA9PiBgJHtkYXRhLmxhYmVsfWApO1xuXG4gICAgaWYgKCF0aGlzLmhpZGVUb29sdGlwVmFsdWUpIHtcbiAgICAgIHRoaXMudG9vbHRpcFxuICAgICAgICAuc2VsZWN0KCcudG9vbHRpcC12YWx1ZScpXG4gICAgICAgIC5odG1sKGQgPT4gKHRoaXMudG9vbHRpcFZhbHVlRm9ybWF0ID8gYCR7dGhpcy50b29sdGlwVmFsdWVGb3JtYXQoZGF0YS52YWx1ZSl9YCA6IGAke2RhdGEudmFsdWV9YCkpO1xuICAgIH1cblxuICAgIGNvbnN0IHRvb2x0aXBPZmZzZXRXaWR0aCA9ICt0aGlzLnRvb2x0aXAubm9kZSgpLm9mZnNldFdpZHRoIC8gMjtcbiAgICBjb25zdCB0b29sdGlwT2Zmc2V0SGVpZ2h0ID0gK3RoaXMudG9vbHRpcC5ub2RlKCkub2Zmc2V0SGVpZ2h0ICsgODtcblxuICAgIHRoaXMudG9vbHRpcC5zdHlsZSgndG9wJywgYCR7K3Njcm9sbFsxXSArICtkaW1lbnNpb25zLnRvcCAtIHRvb2x0aXBPZmZzZXRIZWlnaHR9cHhgKTsgLy9cbiAgICB0aGlzLnRvb2x0aXAuc3R5bGUoJ2xlZnQnLCBgJHsrc2Nyb2xsWzBdICsgK2RpbWVuc2lvbnMubGVmdCAtIHRvb2x0aXBPZmZzZXRXaWR0aCArICtkaW1lbnNpb25zLndpZHRoIC8gMn1weGApO1xuICAgIHRoaXMudG9vbHRpcC5zdHlsZSgnb3BhY2l0eScsIDEpO1xuICB9O1xuXG4gIHByaXZhdGUgdG9vbHRpcEhpZGUgPSAoKSA9PiB7XG4gICAgdGhpcy50b29sdGlwLnN0eWxlKCdvcGFjaXR5JywgMCk7XG4gIH07XG59XG4iXX0=