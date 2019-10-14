/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ElementRef, HostBinding, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { select as d3_select, scaleOrdinal as d3_scaleOrdinal, pie as d3_pie, arc as d3_arc, interpolate as d3_interpolate, mouse as d3_mouse, format as d3_format, event as d3_event, timeFormat as d3_timeFormat, isoParse as d3_isoParse } from 'd3';
import { PbdsDatavizService } from './dataviz.service';
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
        this.hovered = new EventEmitter();
        this.clicked = new EventEmitter();
        this.currentData = [];
        this.updateChart = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var paths = _this.svg.selectAll('path').data(_this.pie(_this.data));
            paths
                .exit()
                .transition()
                .attr('pointer-events', 'none')
                .remove();
            //update existing items
            paths
                .each((/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return (d.outerRadius = _this.outerRadius); }))
                .attr('pointer-events', 'none')
                .transition()
                .duration(500)
                .attrTween('d', _this.arcTween)
                .transition()
                .attr('pointer-events', 'auto');
            // paths on enter
            /** @type {?} */
            var enterPaths = paths
                .enter()
                .append('path')
                .each((/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return (d.outerRadius = _this.outerRadius); }))
                .attr('d', _this.arc)
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
                enterPaths
                    .style('stroke', '#fff')
                    .style('stroke-width', 2)
                    .style('stroke-alignment', 'inner');
            }
            /** @type {?} */
            var legendItem = _this.chart
                .select('.legend')
                .selectAll('.legend-item')
                .data(_this.data);
            legendItem.exit().remove();
            // update existing items
            legendItem.select('.legend-label').html((/**
             * @param {?} d
             * @return {?}
             */
            function (d) {
                switch (_this.legendLabelFormatType) {
                    case 'time':
                        /** @type {?} */
                        var parsedTime = d3_isoParse(d.label);
                        return _this.legendLabelFormat(parsedTime);
                    default:
                        return d.label;
                }
            }));
            legendItem.select('.legend-value').html((/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return _this.legendValueFormat(d.value); }));
            // legend items on enter
            /** @type {?} */
            var enterLegendItem = legendItem
                .enter()
                .append('li')
                // .attr('tabindex', 0)
                .attr('class', 'legend-item');
            enterLegendItem
                .append('span')
                .attr('class', 'legend-key')
                .style('background-color', (/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return _this.colorRange(d.label); }));
            /** @type {?} */
            var legendDescription = enterLegendItem.append('span').attr('class', 'legend-description');
            legendDescription
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
                        var parsedTime = d3_isoParse(d.label);
                        return _this.legendLabelFormat(parsedTime);
                    default:
                        return d.label;
                }
            }));
            legendDescription
                .append('span')
                .attr('class', 'legend-value')
                .html((/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return _this.legendValueFormat(d.value); }));
            enterLegendItem
                .on('mouseover focus', (/**
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (data, index, nodes) {
                _this.legendMouseOverFocus(data, index, nodes);
                _this.pathMouseOver(d3_event, data, index, nodes);
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
                _this.clicked.emit(data);
            }));
            enterPaths
                .on('mouseover', (/**
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (data, index, nodes) {
                _this.pathMouseOver(d3_event, data, index, nodes);
                _this.tooltipShow(_this.chart.node(), data);
            }))
                .on('mousemove', (/**
             * @param {?} data
             * @param {?} index
             * @param {?} nodes
             * @return {?}
             */
            function (data, index, nodes) {
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
                _this.pathClick(d3_event, data, index, nodes);
            }));
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
            var i = d3_interpolate(_this.currentData[index], data);
            _this.currentData[index] = i(1);
            return (/**
             * @param {?} t
             * @return {?}
             */
            function (t) { return _this.arc(i(t)); });
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
                .attrTween('d', (/**
             * @param {?} d
             * @return {?}
             */
            function (d) {
                /** @type {?} */
                var i = d3_interpolate(d.outerRadius, _this.outerRadius + _this.arcZoom);
                return (/**
                 * @param {?} t
                 * @return {?}
                 */
                function (t) {
                    d.outerRadius = i(t);
                    return _this.arc(d);
                });
            }));
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
                .attrTween('d', (/**
             * @param {?} d
             * @return {?}
             */
            function (d) {
                /** @type {?} */
                var i = d3_interpolate(d.outerRadius, _this.outerRadius);
                return (/**
                 * @param {?} t
                 * @return {?}
                 */
                function (t) {
                    d.outerRadius = i(t);
                    return _this.arc(d);
                });
            }));
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
                    var parsedTime = d3_isoParse(data.data.label);
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
            var coordinates = d3_mouse(node);
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
        this.legendValueFormat = d3_format(this.legendValueFormatString);
        this.tooltipValueFormat = d3_format(this.tooltipValueFormatString);
        switch (this.legendLabelFormatType) {
            case 'time':
                this.legendLabelFormat = d3_timeFormat(this.legendLabelFormatString);
                break;
            default:
                this.legendLabelFormat = null;
                break;
        }
        switch (this.tooltipLabelFormatType) {
            case 'time':
                this.tooltipLabelFormat = d3_timeFormat(this.tooltipLabelFormatString);
                break;
            default:
                this.tooltipLabelFormat = null;
                break;
        }
        this.colorRange = d3_scaleOrdinal()
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
        this.pie = d3_pie()
            .padAngle(this.anglePad)
            .value((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.value; }))
            .sort(null);
        this.arc = d3_arc()
            .padRadius(this.outerRadius)
            .innerRadius(this.innerRadius);
        this.chart = d3_select(this._element.nativeElement).attr('aria-hidden', 'true');
        this.svg = this.chart
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('class', 'img-fluid')
            .attr('preserveAspectRatio', 'xMinYMin meet')
            .attr('viewBox', "-" + (this.width / 2 + this.margin.left) + " -" + (this.height / 2 + this.margin.top) + " " + (this.width +
            this.margin.left +
            this.margin.right) + " " + (this.height + this.margin.top + this.margin.bottom));
        this.legend = this.chart.append('ul').attr('class', 'legend legend-right');
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
            this.updateChart();
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
        { type: Component, args: [{
                    selector: 'pbds-dataviz-pie',
                    template: "",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    PbdsDatavizPieComponent.ctorParameters = function () { return [
        { type: PbdsDatavizService },
        { type: ElementRef }
    ]; };
    PbdsDatavizPieComponent.propDecorators = {
        chartClass: [{ type: HostBinding, args: ['class.pbds-chart',] }],
        pieClass: [{ type: HostBinding, args: ['class.pbds-chart-pie',] }],
        data: [{ type: Input }],
        width: [{ type: Input }],
        type: [{ type: Input }],
        monochrome: [{ type: Input }],
        legendLabelFormatType: [{ type: Input }],
        legendLabelFormatString: [{ type: Input }],
        legendValueFormatString: [{ type: Input }],
        tooltipLabelFormatType: [{ type: Input }],
        tooltipLabelFormatString: [{ type: Input }],
        tooltipValueFormatString: [{ type: Input }],
        theme: [{ type: Input }],
        hovered: [{ type: Output }],
        clicked: [{ type: Output }]
    };
    return PbdsDatavizPieComponent;
}());
export { PbdsDatavizPieComponent };
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
    PbdsDatavizPieComponent.prototype.legend;
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
    PbdsDatavizPieComponent.prototype.arcTween;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXZpei1waWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcGItZGVzaWduLXN5c3RlbS8iLCJzb3VyY2VzIjpbImxpYi9kYXRhdml6L2RhdGF2aXotcGllLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxLQUFLLEVBQ0wsVUFBVSxFQUNWLFdBQVcsRUFHWCxNQUFNLEVBQ04sWUFBWSxFQUNaLHVCQUF1QixFQUV4QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQ0wsTUFBTSxJQUFJLFNBQVMsRUFDbkIsWUFBWSxJQUFJLGVBQWUsRUFDL0IsR0FBRyxJQUFJLE1BQU0sRUFDYixHQUFHLElBQUksTUFBTSxFQUNiLFdBQVcsSUFBSSxjQUFjLEVBQzdCLEtBQUssSUFBSSxRQUFRLEVBQ2pCLE1BQU0sSUFBSSxTQUFTLEVBQ25CLEtBQUssSUFBSSxRQUFRLEVBQ2pCLFVBQVUsSUFBSSxhQUFhLEVBQzNCLFFBQVEsSUFBSSxXQUFXLEVBQ3hCLE1BQU0sSUFBSSxDQUFDO0FBRVosT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFHdkQ7SUF3RUUsaUNBQW9CLFFBQTRCLEVBQVUsUUFBb0I7UUFBOUUsaUJBQWtGO1FBQTlELGFBQVEsR0FBUixRQUFRLENBQW9CO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBWTtRQWhFOUUsZUFBVSxHQUFHLElBQUksQ0FBQztRQUdsQixhQUFRLEdBQUcsSUFBSSxDQUFDO1FBTWhCLFVBQUssR0FBRyxHQUFHLENBQUM7UUFHWixTQUFJLEdBQW9CLEtBQUssQ0FBQztRQUc5QixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBR25CLDBCQUFxQixHQUFXLElBQUksQ0FBQztRQUdyQyw0QkFBdUIsR0FBRyxFQUFFLENBQUM7UUFHN0IsNEJBQXVCLEdBQUcsRUFBRSxDQUFDO1FBRzdCLDJCQUFzQixHQUFXLElBQUksQ0FBQztRQUd0Qyw2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QUNoQixzQ0FBWTs7Ozs7SUFDWixzQ0FBWTs7Ozs7SUFDWix5Q0FBZTs7Ozs7SUFDZixvREFBMEI7Ozs7O0lBQzFCLG9EQUEwQjs7Ozs7SUFDMUIsOENBQW9COzs7OztJQUNwQiwyQ0FBaUI7Ozs7O0lBQ2pCLDhDQUFvQjs7Ozs7SUFDcEIsMENBQWdCOzs7OztJQUNoQixxREFBMkI7Ozs7O0lBQzNCLHFEQUEyQjs7SUF3RjNCLDhDQXdIRTs7Ozs7SUFFRiwyQ0FNRTs7Ozs7SUFFRix1REFLRTs7Ozs7SUFFRixxREFFRTs7Ozs7SUFFRixnREEyQkU7Ozs7O0lBRUYsK0NBc0JFOzs7OztJQUVGLDRDQUtFOzs7OztJQUVGLDhDQXdCRTs7Ozs7SUFFRiw4Q0FFRTs7Ozs7SUFFRiw4Q0FFRTs7Ozs7SUFFRixxREFLRTs7Ozs7SUF0VVUsMkNBQW9DOzs7OztJQUFFLDJDQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBJbnB1dCxcbiAgRWxlbWVudFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBPbkRlc3Ryb3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIHNlbGVjdCBhcyBkM19zZWxlY3QsXG4gIHNjYWxlT3JkaW5hbCBhcyBkM19zY2FsZU9yZGluYWwsXG4gIHBpZSBhcyBkM19waWUsXG4gIGFyYyBhcyBkM19hcmMsXG4gIGludGVycG9sYXRlIGFzIGQzX2ludGVycG9sYXRlLFxuICBtb3VzZSBhcyBkM19tb3VzZSxcbiAgZm9ybWF0IGFzIGQzX2Zvcm1hdCxcbiAgZXZlbnQgYXMgZDNfZXZlbnQsXG4gIHRpbWVGb3JtYXQgYXMgZDNfdGltZUZvcm1hdCxcbiAgaXNvUGFyc2UgYXMgZDNfaXNvUGFyc2Vcbn0gZnJvbSAnZDMnO1xuXG5pbXBvcnQgeyBQYmRzRGF0YXZpelNlcnZpY2UgfSBmcm9tICcuL2RhdGF2aXouc2VydmljZSc7XG5pbXBvcnQgeyBQYmRzRGF0YXZpelBpZSB9IGZyb20gJy4vZGF0YXZpei5pbnRlcmZhY2VzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncGJkcy1kYXRhdml6LXBpZScsXG4gIHRlbXBsYXRlOiBgYCxcbiAgc3R5bGVVcmxzOiBbXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgUGJkc0RhdGF2aXpQaWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5wYmRzLWNoYXJ0JylcbiAgY2hhcnRDbGFzcyA9IHRydWU7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5wYmRzLWNoYXJ0LXBpZScpXG4gIHBpZUNsYXNzID0gdHJ1ZTtcblxuICBASW5wdXQoKVxuICBkYXRhOiBBcnJheTxQYmRzRGF0YXZpelBpZT47XG5cbiAgQElucHV0KClcbiAgd2lkdGggPSAzMDA7XG5cbiAgQElucHV0KClcbiAgdHlwZTogJ3BpZScgfCAnZG9udXQnID0gJ3BpZSc7XG5cbiAgQElucHV0KClcbiAgbW9ub2Nocm9tZSA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIGxlZ2VuZExhYmVsRm9ybWF0VHlwZTogJ3RpbWUnID0gbnVsbDtcblxuICBASW5wdXQoKVxuICBsZWdlbmRMYWJlbEZvcm1hdFN0cmluZyA9ICcnO1xuXG4gIEBJbnB1dCgpXG4gIGxlZ2VuZFZhbHVlRm9ybWF0U3RyaW5nID0gJyc7XG5cbiAgQElucHV0KClcbiAgdG9vbHRpcExhYmVsRm9ybWF0VHlwZTogJ3RpbWUnID0gbnVsbDtcblxuICBASW5wdXQoKVxuICB0b29sdGlwTGFiZWxGb3JtYXRTdHJpbmcgPSAnJztcblxuICBASW5wdXQoKVxuICB0b29sdGlwVmFsdWVGb3JtYXRTdHJpbmcgPSAnJztcblxuICBASW5wdXQoKVxuICB0aGVtZTtcblxuICBAT3V0cHV0KClcbiAgaG92ZXJlZDogRXZlbnRFbWl0dGVyPG9iamVjdD4gPSBuZXcgRXZlbnRFbWl0dGVyPG9iamVjdD4oKTtcblxuICBAT3V0cHV0KClcbiAgY2xpY2tlZDogRXZlbnRFbWl0dGVyPG9iamVjdD4gPSBuZXcgRXZlbnRFbWl0dGVyPG9iamVjdD4oKTtcblxuICBwcml2YXRlIGN1cnJlbnREYXRhID0gW107XG4gIHByaXZhdGUgaGVpZ2h0O1xuICBwcml2YXRlIGNoYXJ0O1xuICBwcml2YXRlIG1hcmdpbjtcbiAgcHJpdmF0ZSBjb2xvcnM7XG4gIHByaXZhdGUgY29sb3JSYW5nZTtcbiAgcHJpdmF0ZSBhcmM7XG4gIHByaXZhdGUgYXJjWm9vbTtcbiAgcHJpdmF0ZSBzdmc7XG4gIHByaXZhdGUgcGllO1xuICBwcml2YXRlIGxlZ2VuZDtcbiAgcHJpdmF0ZSBsZWdlbmRMYWJlbEZvcm1hdDtcbiAgcHJpdmF0ZSBsZWdlbmRWYWx1ZUZvcm1hdDtcbiAgcHJpdmF0ZSBpbm5lclJhZGl1cztcbiAgcHJpdmF0ZSBhbmdsZVBhZDtcbiAgcHJpdmF0ZSBvdXRlclJhZGl1cztcbiAgcHJpdmF0ZSB0b29sdGlwO1xuICBwcml2YXRlIHRvb2x0aXBMYWJlbEZvcm1hdDtcbiAgcHJpdmF0ZSB0b29sdGlwVmFsdWVGb3JtYXQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZGF0YXZpejogUGJkc0RhdGF2aXpTZXJ2aWNlLCBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubWFyZ2luID0geyB0b3A6IDEwLCByaWdodDogMTAsIGJvdHRvbTogMTAsIGxlZnQ6IDEwIH07XG4gICAgdGhpcy53aWR0aCA9IHRoaXMud2lkdGggLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXJnaW4ucmlnaHQ7XG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLndpZHRoIC0gdGhpcy5tYXJnaW4udG9wIC0gdGhpcy5tYXJnaW4uYm90dG9tO1xuICAgIHRoaXMuY29sb3JzID0gdGhpcy5fZGF0YXZpei5nZXRDb2xvcnModGhpcy5tb25vY2hyb21lLCB0aGlzLnRoZW1lKTtcbiAgICB0aGlzLmlubmVyUmFkaXVzID0gTWF0aC5taW4odGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpIC8gMi41O1xuICAgIHRoaXMub3V0ZXJSYWRpdXMgPSBNYXRoLm1pbih0aGlzLndpZHRoLCB0aGlzLmhlaWdodCkgLyAyO1xuICAgIHRoaXMuYXJjWm9vbSA9IDEwO1xuICAgIHRoaXMuYW5nbGVQYWQgPSAwLjAyO1xuICAgIHRoaXMubGVnZW5kVmFsdWVGb3JtYXQgPSBkM19mb3JtYXQodGhpcy5sZWdlbmRWYWx1ZUZvcm1hdFN0cmluZyk7XG4gICAgdGhpcy50b29sdGlwVmFsdWVGb3JtYXQgPSBkM19mb3JtYXQodGhpcy50b29sdGlwVmFsdWVGb3JtYXRTdHJpbmcpO1xuXG4gICAgc3dpdGNoICh0aGlzLmxlZ2VuZExhYmVsRm9ybWF0VHlwZSkge1xuICAgICAgY2FzZSAndGltZSc6XG4gICAgICAgIHRoaXMubGVnZW5kTGFiZWxGb3JtYXQgPSBkM190aW1lRm9ybWF0KHRoaXMubGVnZW5kTGFiZWxGb3JtYXRTdHJpbmcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMubGVnZW5kTGFiZWxGb3JtYXQgPSBudWxsO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHRoaXMudG9vbHRpcExhYmVsRm9ybWF0VHlwZSkge1xuICAgICAgY2FzZSAndGltZSc6XG4gICAgICAgIHRoaXMudG9vbHRpcExhYmVsRm9ybWF0ID0gZDNfdGltZUZvcm1hdCh0aGlzLnRvb2x0aXBMYWJlbEZvcm1hdFN0cmluZyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy50b29sdGlwTGFiZWxGb3JtYXQgPSBudWxsO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICB0aGlzLmNvbG9yUmFuZ2UgPSBkM19zY2FsZU9yZGluYWwoKVxuICAgICAgLnJhbmdlKHRoaXMuY29sb3JzKVxuICAgICAgLmRvbWFpbih0aGlzLmRhdGEubWFwKGMgPT4gYy5sYWJlbCkpO1xuXG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ3BpZScpIHtcbiAgICAgIHRoaXMuaW5uZXJSYWRpdXMgPSAwO1xuICAgICAgdGhpcy5hbmdsZVBhZCA9IDA7XG4gICAgfVxuXG4gICAgdGhpcy5waWUgPSBkM19waWUoKVxuICAgICAgLnBhZEFuZ2xlKHRoaXMuYW5nbGVQYWQpXG4gICAgICAudmFsdWUoKGQ6IGFueSkgPT4gZC52YWx1ZSlcbiAgICAgIC5zb3J0KG51bGwpO1xuXG4gICAgdGhpcy5hcmMgPSBkM19hcmMoKVxuICAgICAgLnBhZFJhZGl1cyh0aGlzLm91dGVyUmFkaXVzKVxuICAgICAgLmlubmVyUmFkaXVzKHRoaXMuaW5uZXJSYWRpdXMpO1xuXG4gICAgdGhpcy5jaGFydCA9IGQzX3NlbGVjdCh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuICAgIHRoaXMuc3ZnID0gdGhpcy5jaGFydFxuICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgIC5hdHRyKCd3aWR0aCcsIHRoaXMud2lkdGgpXG4gICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy5oZWlnaHQpXG4gICAgICAuYXR0cignY2xhc3MnLCAnaW1nLWZsdWlkJylcbiAgICAgIC5hdHRyKCdwcmVzZXJ2ZUFzcGVjdFJhdGlvJywgJ3hNaW5ZTWluIG1lZXQnKVxuICAgICAgLmF0dHIoXG4gICAgICAgICd2aWV3Qm94JyxcbiAgICAgICAgYC0ke3RoaXMud2lkdGggLyAyICsgdGhpcy5tYXJnaW4ubGVmdH0gLSR7dGhpcy5oZWlnaHQgLyAyICsgdGhpcy5tYXJnaW4udG9wfSAke3RoaXMud2lkdGggK1xuICAgICAgICAgIHRoaXMubWFyZ2luLmxlZnQgK1xuICAgICAgICAgIHRoaXMubWFyZ2luLnJpZ2h0fSAke3RoaXMuaGVpZ2h0ICsgdGhpcy5tYXJnaW4udG9wICsgdGhpcy5tYXJnaW4uYm90dG9tfWBcbiAgICAgICk7XG5cbiAgICB0aGlzLmxlZ2VuZCA9IHRoaXMuY2hhcnQuYXBwZW5kKCd1bCcpLmF0dHIoJ2NsYXNzJywgJ2xlZ2VuZCBsZWdlbmQtcmlnaHQnKTtcblxuICAgIHRoaXMudG9vbHRpcCA9IHRoaXMuY2hhcnRcbiAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAuc3R5bGUoJ29wYWNpdHknLCAwKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BiZHMtdG9vbHRpcCcpXG4gICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4gICAgdGhpcy51cGRhdGVDaGFydCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmRhdGEgJiYgIWNoYW5nZXMuZGF0YS5maXJzdENoYW5nZSkge1xuICAgICAgdGhpcy51cGRhdGVDaGFydCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnRvb2x0aXApIHRoaXMudG9vbHRpcC5yZW1vdmUoKTtcbiAgfVxuXG4gIHVwZGF0ZUNoYXJ0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHBhdGhzID0gdGhpcy5zdmcuc2VsZWN0QWxsKCdwYXRoJykuZGF0YSh0aGlzLnBpZSh0aGlzLmRhdGEpKTtcblxuICAgIHBhdGhzXG4gICAgICAuZXhpdCgpXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuYXR0cigncG9pbnRlci1ldmVudHMnLCAnbm9uZScpXG4gICAgICAucmVtb3ZlKCk7XG5cbiAgICAvL3VwZGF0ZSBleGlzdGluZyBpdGVtc1xuICAgIHBhdGhzXG4gICAgICAuZWFjaCgoZDogYW55KSA9PiAoZC5vdXRlclJhZGl1cyA9IHRoaXMub3V0ZXJSYWRpdXMpKVxuICAgICAgLmF0dHIoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKVxuICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgLmR1cmF0aW9uKDUwMClcbiAgICAgIC5hdHRyVHdlZW4oJ2QnLCB0aGlzLmFyY1R3ZWVuKVxuICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgLmF0dHIoJ3BvaW50ZXItZXZlbnRzJywgJ2F1dG8nKTtcblxuICAgIC8vIHBhdGhzIG9uIGVudGVyXG4gICAgY29uc3QgZW50ZXJQYXRocyA9IHBhdGhzXG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAuZWFjaCgoZDogYW55KSA9PiAoZC5vdXRlclJhZGl1cyA9IHRoaXMub3V0ZXJSYWRpdXMpKVxuICAgICAgLmF0dHIoJ2QnLCB0aGlzLmFyYylcbiAgICAgIC5hdHRyKCdmaWxsJywgKGQ6IGFueSkgPT4gdGhpcy5jb2xvclJhbmdlKGQuZGF0YS5sYWJlbCkpXG4gICAgICAuYXR0cignY2xhc3MnLCAnc2xpY2UnKVxuICAgICAgLmVhY2goKGQsIGksIG5vZGVzKSA9PiB7XG4gICAgICAgIHRoaXMuY3VycmVudERhdGEuc3BsaWNlKGksIDEsIGQpO1xuICAgICAgfSk7XG5cbiAgICBpZiAodGhpcy50eXBlID09PSAncGllJykge1xuICAgICAgZW50ZXJQYXRoc1xuICAgICAgICAuc3R5bGUoJ3N0cm9rZScsICcjZmZmJylcbiAgICAgICAgLnN0eWxlKCdzdHJva2Utd2lkdGgnLCAyKVxuICAgICAgICAuc3R5bGUoJ3N0cm9rZS1hbGlnbm1lbnQnLCAnaW5uZXInKTtcbiAgICB9XG5cbiAgICBjb25zdCBsZWdlbmRJdGVtID0gdGhpcy5jaGFydFxuICAgICAgLnNlbGVjdCgnLmxlZ2VuZCcpXG4gICAgICAuc2VsZWN0QWxsKCcubGVnZW5kLWl0ZW0nKVxuICAgICAgLmRhdGEodGhpcy5kYXRhKTtcblxuICAgIGxlZ2VuZEl0ZW0uZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgLy8gdXBkYXRlIGV4aXN0aW5nIGl0ZW1zXG4gICAgbGVnZW5kSXRlbS5zZWxlY3QoJy5sZWdlbmQtbGFiZWwnKS5odG1sKChkOiBhbnkpID0+IHtcbiAgICAgIHN3aXRjaCAodGhpcy5sZWdlbmRMYWJlbEZvcm1hdFR5cGUpIHtcbiAgICAgICAgY2FzZSAndGltZSc6XG4gICAgICAgICAgY29uc3QgcGFyc2VkVGltZSA9IGQzX2lzb1BhcnNlKGQubGFiZWwpO1xuICAgICAgICAgIHJldHVybiB0aGlzLmxlZ2VuZExhYmVsRm9ybWF0KHBhcnNlZFRpbWUpO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuIGQubGFiZWw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBsZWdlbmRJdGVtLnNlbGVjdCgnLmxlZ2VuZC12YWx1ZScpLmh0bWwoKGQ6IGFueSkgPT4gdGhpcy5sZWdlbmRWYWx1ZUZvcm1hdChkLnZhbHVlKSk7XG5cbiAgICAvLyBsZWdlbmQgaXRlbXMgb24gZW50ZXJcbiAgICBjb25zdCBlbnRlckxlZ2VuZEl0ZW0gPSBsZWdlbmRJdGVtXG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZCgnbGknKVxuICAgICAgLy8gLmF0dHIoJ3RhYmluZGV4JywgMClcbiAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQtaXRlbScpO1xuXG4gICAgZW50ZXJMZWdlbmRJdGVtXG4gICAgICAuYXBwZW5kKCdzcGFuJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQta2V5JylcbiAgICAgIC5zdHlsZSgnYmFja2dyb3VuZC1jb2xvcicsIChkOiBhbnkpID0+IHRoaXMuY29sb3JSYW5nZShkLmxhYmVsKSk7XG5cbiAgICBjb25zdCBsZWdlbmREZXNjcmlwdGlvbiA9IGVudGVyTGVnZW5kSXRlbS5hcHBlbmQoJ3NwYW4nKS5hdHRyKCdjbGFzcycsICdsZWdlbmQtZGVzY3JpcHRpb24nKTtcblxuICAgIGxlZ2VuZERlc2NyaXB0aW9uXG4gICAgICAuYXBwZW5kKCdzcGFuJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQtbGFiZWwnKVxuICAgICAgLmh0bWwoKGQ6IGFueSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKHRoaXMubGVnZW5kTGFiZWxGb3JtYXRUeXBlKSB7XG4gICAgICAgICAgY2FzZSAndGltZSc6XG4gICAgICAgICAgICBjb25zdCBwYXJzZWRUaW1lID0gZDNfaXNvUGFyc2UoZC5sYWJlbCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sZWdlbmRMYWJlbEZvcm1hdChwYXJzZWRUaW1lKTtcblxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gZC5sYWJlbDtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICBsZWdlbmREZXNjcmlwdGlvblxuICAgICAgLmFwcGVuZCgnc3BhbicpXG4gICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kLXZhbHVlJylcbiAgICAgIC5odG1sKChkOiBhbnkpID0+IHRoaXMubGVnZW5kVmFsdWVGb3JtYXQoZC52YWx1ZSkpO1xuXG4gICAgZW50ZXJMZWdlbmRJdGVtXG4gICAgICAub24oJ21vdXNlb3ZlciBmb2N1cycsIChkYXRhLCBpbmRleCwgbm9kZXMpID0+IHtcbiAgICAgICAgdGhpcy5sZWdlbmRNb3VzZU92ZXJGb2N1cyhkYXRhLCBpbmRleCwgbm9kZXMpO1xuICAgICAgICB0aGlzLnBhdGhNb3VzZU92ZXIoZDNfZXZlbnQsIGRhdGEsIGluZGV4LCBub2Rlcyk7XG4gICAgICB9KVxuICAgICAgLm9uKCdtb3VzZW91dCBibHVyJywgKGRhdGEsIGluZGV4LCBub2RlcykgPT4ge1xuICAgICAgICB0aGlzLmxlZ2VuZE1vdXNlT3V0Qmx1cihkYXRhLCBpbmRleCwgbm9kZXMpO1xuICAgICAgICB0aGlzLnBhdGhNb3VzZU91dChkYXRhLCBpbmRleCwgbm9kZXMpO1xuICAgICAgfSlcbiAgICAgIC5vbignY2xpY2snLCAoZGF0YSwgaW5kZXgsIG5vZGVzKSA9PiB7XG4gICAgICAgIHRoaXMuY2xpY2tlZC5lbWl0KGRhdGEpO1xuICAgICAgfSk7XG5cbiAgICBlbnRlclBhdGhzXG4gICAgICAub24oJ21vdXNlb3ZlcicsIChkYXRhLCBpbmRleCwgbm9kZXMpID0+IHtcbiAgICAgICAgdGhpcy5wYXRoTW91c2VPdmVyKGQzX2V2ZW50LCBkYXRhLCBpbmRleCwgbm9kZXMpO1xuICAgICAgICB0aGlzLnRvb2x0aXBTaG93KHRoaXMuY2hhcnQubm9kZSgpLCBkYXRhKTtcbiAgICAgIH0pXG4gICAgICAub24oJ21vdXNlbW92ZScsIChkYXRhLCBpbmRleCwgbm9kZXMpID0+IHtcbiAgICAgICAgdGhpcy50b29sdGlwTW92ZSh0aGlzLmNoYXJ0Lm5vZGUoKSk7XG4gICAgICB9KVxuICAgICAgLm9uKCdtb3VzZW91dCcsIChkYXRhLCBpbmRleCwgbm9kZXMpID0+IHtcbiAgICAgICAgdGhpcy5wYXRoTW91c2VPdXQoZGF0YSwgaW5kZXgsIG5vZGVzKTtcbiAgICAgICAgdGhpcy50b29sdGlwSGlkZSgpO1xuICAgICAgfSlcbiAgICAgIC5vbignY2xpY2snLCAoZGF0YSwgaW5kZXgsIG5vZGVzKSA9PiB7XG4gICAgICAgIHRoaXMucGF0aENsaWNrKGQzX2V2ZW50LCBkYXRhLCBpbmRleCwgbm9kZXMpO1xuICAgICAgfSk7XG4gIH07XG5cbiAgcHJpdmF0ZSBhcmNUd2VlbiA9IChkYXRhLCBpbmRleCwgbm9kZXMpID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZygnQVJHUzogJywgZGF0YSwgaW5kZXgsIG5vZGVzKTtcbiAgICBjb25zdCBpID0gZDNfaW50ZXJwb2xhdGUodGhpcy5jdXJyZW50RGF0YVtpbmRleF0sIGRhdGEpO1xuXG4gICAgdGhpcy5jdXJyZW50RGF0YVtpbmRleF0gPSBpKDEpO1xuICAgIHJldHVybiB0ID0+IHRoaXMuYXJjKGkodCkpO1xuICB9O1xuXG4gIHByaXZhdGUgbGVnZW5kTW91c2VPdmVyRm9jdXMgPSAoZGF0YSwgaW5kZXgsIG5vZGVzKSA9PiB7XG4gICAgdGhpcy5jaGFydFxuICAgICAgLnNlbGVjdEFsbCgnLmxlZ2VuZC1pdGVtJylcbiAgICAgIC5maWx0ZXIoKGQsIGkpID0+IGkgIT09IGluZGV4KVxuICAgICAgLmNsYXNzZWQoJ2luYWN0aXZlJywgdHJ1ZSk7XG4gIH07XG5cbiAgcHJpdmF0ZSBsZWdlbmRNb3VzZU91dEJsdXIgPSAoZGF0YSwgaW5kZXgsIG5vZGVzKSA9PiB7XG4gICAgdGhpcy5jaGFydC5zZWxlY3RBbGwoJy5sZWdlbmQtaXRlbScpLmNsYXNzZWQoJ2luYWN0aXZlJywgZmFsc2UpO1xuICB9O1xuXG4gIHByaXZhdGUgcGF0aE1vdXNlT3ZlciA9IChldmVudCwgZGF0YSwgaW5kZXgsIG5vZGVzKSA9PiB7XG4gICAgY29uc3Qgc2xpY2VzID0gdGhpcy5jaGFydC5zZWxlY3RBbGwoJy5zbGljZScpO1xuICAgIGNvbnN0IHNsaWNlID0gc2xpY2VzLmZpbHRlcigoZCwgaSkgPT4gaSA9PT0gaW5kZXgpO1xuXG4gICAgdGhpcy5jaGFydFxuICAgICAgLnNlbGVjdEFsbCgnLmxlZ2VuZC1pdGVtJylcbiAgICAgIC5maWx0ZXIoKGQsIGkpID0+IGkgIT09IGluZGV4KVxuICAgICAgLmNsYXNzZWQoJ2luYWN0aXZlJywgdHJ1ZSk7XG5cbiAgICBzbGljZXMuZmlsdGVyKChkLCBpKSA9PiBpICE9PSBpbmRleCkuY2xhc3NlZCgnaW5hY3RpdmUnLCB0cnVlKTtcblxuICAgIHNsaWNlXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZHVyYXRpb24oMzAwKVxuICAgICAgLmRlbGF5KDApXG4gICAgICAuYXR0clR3ZWVuKCdkJywgKGQ6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBpID0gZDNfaW50ZXJwb2xhdGUoZC5vdXRlclJhZGl1cywgdGhpcy5vdXRlclJhZGl1cyArIHRoaXMuYXJjWm9vbSk7XG4gICAgICAgIHJldHVybiB0ID0+IHtcbiAgICAgICAgICBkLm91dGVyUmFkaXVzID0gaSh0KTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5hcmMoZCk7XG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgIHRoaXMuaG92ZXJlZC5lbWl0KHtcbiAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgIGRhdGE6IGRhdGEuZGF0YSA/IGRhdGEuZGF0YSA6IGRhdGEgLy8gbGVnZW5kIGhvdmVyIGRhdGEgaXMgZGlmZmVyZW50IHRoYW4gc2xpY2UgaG92ZXIgZGF0YVxuICAgIH0pO1xuICB9O1xuXG4gIHByaXZhdGUgcGF0aE1vdXNlT3V0ID0gKGRhdGEsIGluZGV4LCB2YWx1ZSkgPT4ge1xuICAgIGNvbnN0IHNsaWNlcyA9IHRoaXMuY2hhcnQuc2VsZWN0QWxsKCcuc2xpY2UnKTtcbiAgICBjb25zdCBzbGljZSA9IHNsaWNlcy5maWx0ZXIoKGQsIGkpID0+IGkgPT09IGluZGV4KTtcblxuICAgIHRoaXMuY2hhcnRcbiAgICAgIC5zZWxlY3RBbGwoJy5sZWdlbmQtaXRlbScpXG4gICAgICAuZmlsdGVyKChkLCBpKSA9PiBpICE9PSBpbmRleClcbiAgICAgIC5jbGFzc2VkKCdpbmFjdGl2ZScsIGZhbHNlKTtcblxuICAgIHNsaWNlcy5jbGFzc2VkKCdpbmFjdGl2ZScsIGZhbHNlKTtcblxuICAgIHNsaWNlXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZHVyYXRpb24oMzAwKVxuICAgICAgLmRlbGF5KDApXG4gICAgICAuYXR0clR3ZWVuKCdkJywgKGQ6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBpID0gZDNfaW50ZXJwb2xhdGUoZC5vdXRlclJhZGl1cywgdGhpcy5vdXRlclJhZGl1cyk7XG4gICAgICAgIHJldHVybiB0ID0+IHtcbiAgICAgICAgICBkLm91dGVyUmFkaXVzID0gaSh0KTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5hcmMoZCk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgfTtcblxuICBwcml2YXRlIHBhdGhDbGljayA9IChldmVudCwgZGF0YSwgaW5kZXgsIG5vZGVzKSA9PiB7XG4gICAgdGhpcy5jbGlja2VkLmVtaXQoe1xuICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgZGF0YTogZGF0YS5kYXRhXG4gICAgfSk7XG4gIH07XG5cbiAgcHJpdmF0ZSB0b29sdGlwU2hvdyA9IChub2RlLCBkYXRhKSA9PiB7XG4gICAgdGhpcy50b29sdGlwU2V0UG9zaXRpb24obm9kZSk7XG5cbiAgICBjb25zdCBwZXJjZW50YWdlID0gKGRhdGEuZW5kQW5nbGUgLSBkYXRhLnN0YXJ0QW5nbGUpIC8gKDIgKiBNYXRoLlBJKTtcbiAgICBsZXQgbGFiZWw7XG5cbiAgICBzd2l0Y2ggKHRoaXMudG9vbHRpcExhYmVsRm9ybWF0VHlwZSkge1xuICAgICAgY2FzZSAndGltZSc6XG4gICAgICAgIGNvbnN0IHBhcnNlZFRpbWUgPSBkM19pc29QYXJzZShkYXRhLmRhdGEubGFiZWwpO1xuICAgICAgICBsYWJlbCA9IHRoaXMudG9vbHRpcExhYmVsRm9ybWF0KHBhcnNlZFRpbWUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbGFiZWwgPSBkYXRhLmRhdGEubGFiZWw7XG4gICAgfVxuXG4gICAgdGhpcy50b29sdGlwLmh0bWwoXG4gICAgICBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0b29sdGlwLWxhYmVsXCI+JHtsYWJlbH08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRvb2x0aXAtdmFsdWVcIj4ke3RoaXMudG9vbHRpcFZhbHVlRm9ybWF0KHBlcmNlbnRhZ2UpfTwvZGl2PlxuICAgICAgYFxuICAgICk7XG5cbiAgICB0aGlzLnRvb2x0aXAuc3R5bGUoJ29wYWNpdHknLCAxKTtcbiAgfTtcblxuICBwcml2YXRlIHRvb2x0aXBNb3ZlID0gbm9kZSA9PiB7XG4gICAgdGhpcy50b29sdGlwU2V0UG9zaXRpb24obm9kZSk7XG4gIH07XG5cbiAgcHJpdmF0ZSB0b29sdGlwSGlkZSA9ICgpID0+IHtcbiAgICB0aGlzLnRvb2x0aXAuc3R5bGUoJ29wYWNpdHknLCAwKTtcbiAgfTtcblxuICBwcml2YXRlIHRvb2x0aXBTZXRQb3NpdGlvbiA9IG5vZGUgPT4ge1xuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gZDNfbW91c2Uobm9kZSk7XG5cbiAgICB0aGlzLnRvb2x0aXAuc3R5bGUoJ2xlZnQnLCBgJHtjb29yZGluYXRlc1swXSArIDE2fXB4YCk7XG4gICAgdGhpcy50b29sdGlwLnN0eWxlKCd0b3AnLCBgJHtjb29yZGluYXRlc1sxXSArIDE2fXB4YCk7XG4gIH07XG59XG4iXX0=