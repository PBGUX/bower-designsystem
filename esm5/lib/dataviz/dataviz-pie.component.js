/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ElementRef, HostBinding, Output, EventEmitter } from '@angular/core';
import { select as d3_select, scaleOrdinal as d3_scaleOrdinal, pie as d3_pie, arc as d3_arc, interpolate as d3_interpolate, mouse as d3_mouse, format as d3_format } from 'd3';
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
        this.mono = false;
        // TODO: do we need a tooltipFormatType?
        this.tooltipFormatString = '';
        // TODO: add input for legendFormatType?
        this.legendFormatString = '';
        this.hovered = new EventEmitter();
        this.clicked = new EventEmitter();
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
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        function (data, index, nodes) {
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
            _this.hovered.emit(data.data ? data.data : data); // legend hover data is different than slice hover data
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
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        function (data, index, nodes) {
            _this.clicked.emit(data.data);
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
            _this.tooltip.html("\n        <div class=\"tooltip-label\">" + data.data.label + "</div>\n        <div class=\"tooltip-value\">" + _this.tooltipFormat(percentage) + "</div>\n      ");
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
        var _this = this;
        this.margin = { top: 10, right: 10, bottom: 10, left: 10 };
        this.width = this.width - this.margin.left - this.margin.right;
        this.height = this.width - this.margin.top - this.margin.bottom;
        this.colors = this._dataviz.getColors(this.mono);
        this.innerRadius = Math.min(this.width, this.height) / 2.5;
        this.outerRadius = Math.min(this.width, this.height) / 2;
        this.arcZoom = 10;
        this.anglePad = 0.02;
        this.legendFormat = d3_format(this.legendFormatString);
        this.tooltipFormat = d3_format(this.tooltipFormatString);
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
        this.pie = d3_pie()
            .padAngle(this.anglePad)
            .value((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.value; }));
        this.arc = d3_arc()
            .padRadius(this.outerRadius)
            .innerRadius(this.innerRadius);
        this.paths = this.svg
            .selectAll('path')
            .data(this.pie(this.data))
            .enter()
            .append('path')
            .each((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return (d.outerRadius = _this.outerRadius); }))
            .attr('d', this.arc)
            .attr('fill', (/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return _this.colorRange(d.data.label); }))
            .attr('class', 'slice');
        if (this.type === 'pie') {
            this.paths
                .style('stroke', '#fff')
                .style('stroke-width', 2)
                .style('stroke-alignment', 'inner');
        }
        this.legend = this.chart
            .append('ul')
            .attr('class', 'legend legend-right')
            .selectAll('li')
            .data(this.data)
            .enter()
            .append('li')
            .attr('tabindex', 0)
            .attr('class', 'legend-item');
        this.legend
            .append('span')
            .attr('class', 'legend-key')
            .style('background-color', (/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return _this.colorRange(d.label); }));
        /** @type {?} */
        var legendDescription = this.legend.append('span').attr('class', 'legend-description');
        legendDescription
            .append('span')
            .attr('class', 'legend-label')
            .html((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.label; }));
        legendDescription
            .append('span')
            .attr('class', 'legend-value')
            .html((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return _this.legendFormat(d.value); }));
        this.legend
            .on('mouseover focus', (/**
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        function (data, index, nodes) {
            _this.legendMouseOverFocus(data, index, nodes);
            _this.pathMouseOver(data, index, nodes);
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
        this.paths
            .on('mouseover', (/**
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        function (data, index, nodes) {
            _this.pathMouseOver(data, index, nodes);
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
            _this.pathClick(data, index, nodes);
        }));
        this.tooltip = this.chart
            .append('div')
            .style('opacity', 0)
            .attr('class', 'pbds-tooltip')
            .attr('aria-hidden', 'true');
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
        if ((changes.data && !changes.data.firstChange) || (changes.mono && !changes.mono.firstChange)) {
            // TODO: refactor to use update() function instead
            this.chart.selectAll('svg').remove();
            this.chart.selectAll('ul').remove();
            this.chart.selectAll('div').remove();
            this.ngOnInit();
        }
    };
    PbdsDatavizPieComponent.decorators = [
        { type: Component, args: [{
                    selector: 'pbds-dataviz-pie',
                    template: ""
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
        mono: [{ type: Input }],
        tooltipFormatString: [{ type: Input }],
        legendFormatString: [{ type: Input }],
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
    PbdsDatavizPieComponent.prototype.mono;
    /** @type {?} */
    PbdsDatavizPieComponent.prototype.tooltipFormatString;
    /** @type {?} */
    PbdsDatavizPieComponent.prototype.legendFormatString;
    /** @type {?} */
    PbdsDatavizPieComponent.prototype.hovered;
    /** @type {?} */
    PbdsDatavizPieComponent.prototype.clicked;
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
    PbdsDatavizPieComponent.prototype.legendFormat;
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
    PbdsDatavizPieComponent.prototype.paths;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizPieComponent.prototype.tooltip;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizPieComponent.prototype.tooltipFormat;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXZpei1waWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcGItZGVzaWduLXN5c3RlbS8iLCJzb3VyY2VzIjpbImxpYi9kYXRhdml6L2RhdGF2aXotcGllLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxLQUFLLEVBQ0wsVUFBVSxFQUNWLFdBQVcsRUFHWCxNQUFNLEVBQ04sWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFDTCxNQUFNLElBQUksU0FBUyxFQUNuQixZQUFZLElBQUksZUFBZSxFQUMvQixHQUFHLElBQUksTUFBTSxFQUNiLEdBQUcsSUFBSSxNQUFNLEVBQ2IsV0FBVyxJQUFJLGNBQWMsRUFDN0IsS0FBSyxJQUFJLFFBQVEsRUFDakIsTUFBTSxJQUFJLFNBQVMsRUFDcEIsTUFBTSxJQUFJLENBQUM7QUFFWixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUd2RDtJQTBERSxpQ0FBb0IsUUFBNEIsRUFBVSxRQUFvQjtRQUE5RSxpQkFBa0Y7UUFBOUQsYUFBUSxHQUFSLFFBQVEsQ0FBb0I7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFZO1FBbkQ5RSxlQUFVLEdBQUcsSUFBSSxDQUFDO1FBR2xCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFNaEIsVUFBSyxHQUFHLEdBQUcsQ0FBQztRQUdaLFNBQUksR0FBb0IsS0FBSyxDQUFDO1FBRzlCLFNBQUksR0FBRyxLQUFLLENBQUM7O1FBS2Isd0JBQW1CLEdBQUcsRUFBRSxDQUFDOztRQUt6Qix1QkFBa0IsR0FBRyxFQUFFLENBQUM7UUFHeEIsWUFBTyxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBRzNELFlBQU8sR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQTZKbkQseUJBQW9COzs7Ozs7UUFBRyxVQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSztZQUNoRCxLQUFJ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Ozs7O0lBRTNELHlDQUFlOzs7OztJQUNmLHdDQUFjOzs7OztJQUNkLHlDQUFlOzs7OztJQUNmLHlDQUFlOzs7OztJQUNmLDZDQUFtQjs7Ozs7SUFDbkIsc0NBQVk7Ozs7O0lBQ1osMENBQWdCOzs7OztJQUNoQixzQ0FBWTs7Ozs7SUFDWixzQ0FBWTs7Ozs7SUFDWix5Q0FBZTs7Ozs7SUFDZiwrQ0FBcUI7Ozs7O0lBQ3JCLDhDQUFvQjs7Ozs7SUFDcEIsMkNBQWlCOzs7OztJQUNqQiw4Q0FBb0I7Ozs7O0lBQ3BCLHdDQUFjOzs7OztJQUNkLDBDQUFnQjs7Ozs7SUFDaEIsZ0RBQXNCOzs7OztJQTJJdEIsdURBS0U7Ozs7O0lBRUYscURBRUU7Ozs7O0lBRUYsZ0RBd0JFOzs7OztJQUVGLCtDQXNCRTs7Ozs7SUFFRiw0Q0FFRTs7Ozs7SUFFRiw4Q0FhRTs7Ozs7SUFFRiw4Q0FFRTs7Ozs7SUFFRiw4Q0FFRTs7Ozs7SUFFRixxREFLRTs7Ozs7SUF0T1UsMkNBQW9DOzs7OztJQUFFLDJDQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBJbnB1dCxcbiAgRWxlbWVudFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIHNlbGVjdCBhcyBkM19zZWxlY3QsXG4gIHNjYWxlT3JkaW5hbCBhcyBkM19zY2FsZU9yZGluYWwsXG4gIHBpZSBhcyBkM19waWUsXG4gIGFyYyBhcyBkM19hcmMsXG4gIGludGVycG9sYXRlIGFzIGQzX2ludGVycG9sYXRlLFxuICBtb3VzZSBhcyBkM19tb3VzZSxcbiAgZm9ybWF0IGFzIGQzX2Zvcm1hdFxufSBmcm9tICdkMyc7XG5cbmltcG9ydCB7IFBiZHNEYXRhdml6U2VydmljZSB9IGZyb20gJy4vZGF0YXZpei5zZXJ2aWNlJztcbmltcG9ydCB7IFBiZHNEYXRhdml6UGllIH0gZnJvbSAnLi9kYXRhdml6LmludGVyZmFjZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYmRzLWRhdGF2aXotcGllJyxcbiAgdGVtcGxhdGU6IGBgLFxuICBzdHlsZVVybHM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIFBiZHNEYXRhdml6UGllQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnBiZHMtY2hhcnQnKVxuICBjaGFydENsYXNzID0gdHJ1ZTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnBiZHMtY2hhcnQtcGllJylcbiAgcGllQ2xhc3MgPSB0cnVlO1xuXG4gIEBJbnB1dCgpXG4gIGRhdGE6IEFycmF5PFBiZHNEYXRhdml6UGllPjtcblxuICBASW5wdXQoKVxuICB3aWR0aCA9IDMwMDtcblxuICBASW5wdXQoKVxuICB0eXBlOiAncGllJyB8ICdkb251dCcgPSAncGllJztcblxuICBASW5wdXQoKVxuICBtb25vID0gZmFsc2U7XG5cbiAgLy8gVE9ETzogZG8gd2UgbmVlZCBhIHRvb2x0aXBGb3JtYXRUeXBlP1xuXG4gIEBJbnB1dCgpXG4gIHRvb2x0aXBGb3JtYXRTdHJpbmcgPSAnJztcblxuICAvLyBUT0RPOiBhZGQgaW5wdXQgZm9yIGxlZ2VuZEZvcm1hdFR5cGU/XG5cbiAgQElucHV0KClcbiAgbGVnZW5kRm9ybWF0U3RyaW5nID0gJyc7XG5cbiAgQE91dHB1dCgpXG4gIGhvdmVyZWQ6IEV2ZW50RW1pdHRlcjxvYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcjxvYmplY3Q+KCk7XG5cbiAgQE91dHB1dCgpXG4gIGNsaWNrZWQ6IEV2ZW50RW1pdHRlcjxvYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcjxvYmplY3Q+KCk7XG5cbiAgcHJpdmF0ZSBoZWlnaHQ7XG4gIHByaXZhdGUgY2hhcnQ7XG4gIHByaXZhdGUgbWFyZ2luO1xuICBwcml2YXRlIGNvbG9ycztcbiAgcHJpdmF0ZSBjb2xvclJhbmdlO1xuICBwcml2YXRlIGFyYztcbiAgcHJpdmF0ZSBhcmNab29tO1xuICBwcml2YXRlIHN2ZztcbiAgcHJpdmF0ZSBwaWU7XG4gIHByaXZhdGUgbGVnZW5kO1xuICBwcml2YXRlIGxlZ2VuZEZvcm1hdDtcbiAgcHJpdmF0ZSBpbm5lclJhZGl1cztcbiAgcHJpdmF0ZSBhbmdsZVBhZDtcbiAgcHJpdmF0ZSBvdXRlclJhZGl1cztcbiAgcHJpdmF0ZSBwYXRocztcbiAgcHJpdmF0ZSB0b29sdGlwO1xuICBwcml2YXRlIHRvb2x0aXBGb3JtYXQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZGF0YXZpejogUGJkc0RhdGF2aXpTZXJ2aWNlLCBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubWFyZ2luID0geyB0b3A6IDEwLCByaWdodDogMTAsIGJvdHRvbTogMTAsIGxlZnQ6IDEwIH07XG4gICAgdGhpcy53aWR0aCA9IHRoaXMud2lkdGggLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXJnaW4ucmlnaHQ7XG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLndpZHRoIC0gdGhpcy5tYXJnaW4udG9wIC0gdGhpcy5tYXJnaW4uYm90dG9tO1xuICAgIHRoaXMuY29sb3JzID0gdGhpcy5fZGF0YXZpei5nZXRDb2xvcnModGhpcy5tb25vKTtcbiAgICB0aGlzLmlubmVyUmFkaXVzID0gTWF0aC5taW4odGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpIC8gMi41O1xuICAgIHRoaXMub3V0ZXJSYWRpdXMgPSBNYXRoLm1pbih0aGlzLndpZHRoLCB0aGlzLmhlaWdodCkgLyAyO1xuICAgIHRoaXMuYXJjWm9vbSA9IDEwO1xuICAgIHRoaXMuYW5nbGVQYWQgPSAwLjAyO1xuICAgIHRoaXMubGVnZW5kRm9ybWF0ID0gZDNfZm9ybWF0KHRoaXMubGVnZW5kRm9ybWF0U3RyaW5nKTtcbiAgICB0aGlzLnRvb2x0aXBGb3JtYXQgPSBkM19mb3JtYXQodGhpcy50b29sdGlwRm9ybWF0U3RyaW5nKTtcblxuICAgIHRoaXMuY29sb3JSYW5nZSA9IGQzX3NjYWxlT3JkaW5hbCgpXG4gICAgICAucmFuZ2UodGhpcy5jb2xvcnMpXG4gICAgICAuZG9tYWluKHRoaXMuZGF0YS5tYXAoYyA9PiBjLmxhYmVsKSk7XG5cbiAgICBpZiAodGhpcy50eXBlID09PSAncGllJykge1xuICAgICAgdGhpcy5pbm5lclJhZGl1cyA9IDA7XG4gICAgICB0aGlzLmFuZ2xlUGFkID0gMDtcbiAgICB9XG5cbiAgICB0aGlzLmNoYXJ0ID0gZDNfc2VsZWN0KHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCkuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4gICAgdGhpcy5zdmcgPSB0aGlzLmNoYXJ0XG4gICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgLmF0dHIoJ3dpZHRoJywgdGhpcy53aWR0aClcbiAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmhlaWdodClcbiAgICAgIC5hdHRyKCdjbGFzcycsICdpbWctZmx1aWQnKVxuICAgICAgLmF0dHIoJ3ByZXNlcnZlQXNwZWN0UmF0aW8nLCAneE1pbllNaW4gbWVldCcpXG4gICAgICAuYXR0cihcbiAgICAgICAgJ3ZpZXdCb3gnLFxuICAgICAgICBgLSR7dGhpcy53aWR0aCAvIDIgKyB0aGlzLm1hcmdpbi5sZWZ0fSAtJHt0aGlzLmhlaWdodCAvIDIgKyB0aGlzLm1hcmdpbi50b3B9ICR7dGhpcy53aWR0aCArXG4gICAgICAgICAgdGhpcy5tYXJnaW4ubGVmdCArXG4gICAgICAgICAgdGhpcy5tYXJnaW4ucmlnaHR9ICR7dGhpcy5oZWlnaHQgKyB0aGlzLm1hcmdpbi50b3AgKyB0aGlzLm1hcmdpbi5ib3R0b219YFxuICAgICAgKTtcblxuICAgIHRoaXMucGllID0gZDNfcGllKClcbiAgICAgIC5wYWRBbmdsZSh0aGlzLmFuZ2xlUGFkKVxuICAgICAgLnZhbHVlKChkOiBhbnkpID0+IGQudmFsdWUpO1xuXG4gICAgdGhpcy5hcmMgPSBkM19hcmMoKVxuICAgICAgLnBhZFJhZGl1cyh0aGlzLm91dGVyUmFkaXVzKVxuICAgICAgLmlubmVyUmFkaXVzKHRoaXMuaW5uZXJSYWRpdXMpO1xuXG4gICAgdGhpcy5wYXRocyA9IHRoaXMuc3ZnXG4gICAgICAuc2VsZWN0QWxsKCdwYXRoJylcbiAgICAgIC5kYXRhKHRoaXMucGllKHRoaXMuZGF0YSkpXG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAuZWFjaCgoZDogYW55KSA9PiAoZC5vdXRlclJhZGl1cyA9IHRoaXMub3V0ZXJSYWRpdXMpKVxuICAgICAgLmF0dHIoJ2QnLCB0aGlzLmFyYylcbiAgICAgIC5hdHRyKCdmaWxsJywgKGQ6IGFueSkgPT4gdGhpcy5jb2xvclJhbmdlKGQuZGF0YS5sYWJlbCkpXG4gICAgICAuYXR0cignY2xhc3MnLCAnc2xpY2UnKTtcblxuICAgIGlmICh0aGlzLnR5cGUgPT09ICdwaWUnKSB7XG4gICAgICB0aGlzLnBhdGhzXG4gICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgJyNmZmYnKVxuICAgICAgICAuc3R5bGUoJ3N0cm9rZS13aWR0aCcsIDIpXG4gICAgICAgIC5zdHlsZSgnc3Ryb2tlLWFsaWdubWVudCcsICdpbm5lcicpO1xuICAgIH1cblxuICAgIHRoaXMubGVnZW5kID0gdGhpcy5jaGFydFxuICAgICAgLmFwcGVuZCgndWwnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xlZ2VuZCBsZWdlbmQtcmlnaHQnKVxuICAgICAgLnNlbGVjdEFsbCgnbGknKVxuICAgICAgLmRhdGEodGhpcy5kYXRhKVxuICAgICAgLmVudGVyKClcbiAgICAgIC5hcHBlbmQoJ2xpJylcbiAgICAgIC5hdHRyKCd0YWJpbmRleCcsIDApXG4gICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kLWl0ZW0nKTtcblxuICAgIHRoaXMubGVnZW5kXG4gICAgICAuYXBwZW5kKCdzcGFuJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQta2V5JylcbiAgICAgIC5zdHlsZSgnYmFja2dyb3VuZC1jb2xvcicsIChkOiBhbnkpID0+IHRoaXMuY29sb3JSYW5nZShkLmxhYmVsKSk7XG5cbiAgICBsZXQgbGVnZW5kRGVzY3JpcHRpb24gPSB0aGlzLmxlZ2VuZC5hcHBlbmQoJ3NwYW4nKS5hdHRyKCdjbGFzcycsICdsZWdlbmQtZGVzY3JpcHRpb24nKTtcblxuICAgIGxlZ2VuZERlc2NyaXB0aW9uXG4gICAgICAuYXBwZW5kKCdzcGFuJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQtbGFiZWwnKVxuICAgICAgLmh0bWwoKGQ6IGFueSkgPT4gZC5sYWJlbCk7XG5cbiAgICBsZWdlbmREZXNjcmlwdGlvblxuICAgICAgLmFwcGVuZCgnc3BhbicpXG4gICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kLXZhbHVlJylcbiAgICAgIC5odG1sKChkOiBhbnkpID0+IHRoaXMubGVnZW5kRm9ybWF0KGQudmFsdWUpKTtcblxuICAgIHRoaXMubGVnZW5kXG4gICAgICAub24oJ21vdXNlb3ZlciBmb2N1cycsIChkYXRhLCBpbmRleCwgbm9kZXMpID0+IHtcbiAgICAgICAgdGhpcy5sZWdlbmRNb3VzZU92ZXJGb2N1cyhkYXRhLCBpbmRleCwgbm9kZXMpO1xuICAgICAgICB0aGlzLnBhdGhNb3VzZU92ZXIoZGF0YSwgaW5kZXgsIG5vZGVzKTtcbiAgICAgIH0pXG4gICAgICAub24oJ21vdXNlb3V0IGJsdXInLCAoZGF0YSwgaW5kZXgsIG5vZGVzKSA9PiB7XG4gICAgICAgIHRoaXMubGVnZW5kTW91c2VPdXRCbHVyKGRhdGEsIGluZGV4LCBub2Rlcyk7XG4gICAgICAgIHRoaXMucGF0aE1vdXNlT3V0KGRhdGEsIGluZGV4LCBub2Rlcyk7XG4gICAgICB9KVxuICAgICAgLm9uKCdjbGljaycsIChkYXRhLCBpbmRleCwgbm9kZXMpID0+IHtcbiAgICAgICAgdGhpcy5jbGlja2VkLmVtaXQoZGF0YSk7XG4gICAgICB9KTtcblxuICAgIHRoaXMucGF0aHNcbiAgICAgIC5vbignbW91c2VvdmVyJywgKGRhdGEsIGluZGV4LCBub2RlcykgPT4ge1xuICAgICAgICB0aGlzLnBhdGhNb3VzZU92ZXIoZGF0YSwgaW5kZXgsIG5vZGVzKTtcbiAgICAgICAgdGhpcy50b29sdGlwU2hvdyh0aGlzLmNoYXJ0Lm5vZGUoKSwgZGF0YSk7XG4gICAgICB9KVxuICAgICAgLm9uKCdtb3VzZW1vdmUnLCAoZGF0YSwgaW5kZXgsIG5vZGVzKSA9PiB7XG4gICAgICAgIHRoaXMudG9vbHRpcE1vdmUodGhpcy5jaGFydC5ub2RlKCkpO1xuICAgICAgfSlcbiAgICAgIC5vbignbW91c2VvdXQnLCAoZGF0YSwgaW5kZXgsIG5vZGVzKSA9PiB7XG4gICAgICAgIHRoaXMucGF0aE1vdXNlT3V0KGRhdGEsIGluZGV4LCBub2Rlcyk7XG4gICAgICAgIHRoaXMudG9vbHRpcEhpZGUoKTtcbiAgICAgIH0pXG4gICAgICAub24oJ2NsaWNrJywgKGRhdGEsIGluZGV4LCBub2RlcykgPT4ge1xuICAgICAgICB0aGlzLnBhdGhDbGljayhkYXRhLCBpbmRleCwgbm9kZXMpO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLnRvb2x0aXAgPSB0aGlzLmNoYXJ0XG4gICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMClcbiAgICAgIC5hdHRyKCdjbGFzcycsICdwYmRzLXRvb2x0aXAnKVxuICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoKGNoYW5nZXMuZGF0YSAmJiAhY2hhbmdlcy5kYXRhLmZpcnN0Q2hhbmdlKSB8fCAoY2hhbmdlcy5tb25vICYmICFjaGFuZ2VzLm1vbm8uZmlyc3RDaGFuZ2UpKSB7XG4gICAgICAvLyBUT0RPOiByZWZhY3RvciB0byB1c2UgdXBkYXRlKCkgZnVuY3Rpb24gaW5zdGVhZFxuICAgICAgdGhpcy5jaGFydC5zZWxlY3RBbGwoJ3N2ZycpLnJlbW92ZSgpO1xuICAgICAgdGhpcy5jaGFydC5zZWxlY3RBbGwoJ3VsJykucmVtb3ZlKCk7XG4gICAgICB0aGlzLmNoYXJ0LnNlbGVjdEFsbCgnZGl2JykucmVtb3ZlKCk7XG5cbiAgICAgIHRoaXMubmdPbkluaXQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGxlZ2VuZE1vdXNlT3ZlckZvY3VzID0gKGRhdGEsIGluZGV4LCBub2RlcykgPT4ge1xuICAgIHRoaXMuY2hhcnRcbiAgICAgIC5zZWxlY3RBbGwoJy5sZWdlbmQtaXRlbScpXG4gICAgICAuZmlsdGVyKChkLCBpKSA9PiBpICE9PSBpbmRleClcbiAgICAgIC5jbGFzc2VkKCdpbmFjdGl2ZScsIHRydWUpO1xuICB9O1xuXG4gIHByaXZhdGUgbGVnZW5kTW91c2VPdXRCbHVyID0gKGRhdGEsIGluZGV4LCBub2RlcykgPT4ge1xuICAgIHRoaXMuY2hhcnQuc2VsZWN0QWxsKCcubGVnZW5kLWl0ZW0nKS5jbGFzc2VkKCdpbmFjdGl2ZScsIGZhbHNlKTtcbiAgfTtcblxuICBwcml2YXRlIHBhdGhNb3VzZU92ZXIgPSAoZGF0YSwgaW5kZXgsIG5vZGVzKSA9PiB7XG4gICAgbGV0IHNsaWNlcyA9IHRoaXMuY2hhcnQuc2VsZWN0QWxsKCcuc2xpY2UnKTtcbiAgICBsZXQgc2xpY2UgPSBzbGljZXMuZmlsdGVyKChkLCBpKSA9PiBpID09PSBpbmRleCk7XG5cbiAgICB0aGlzLmNoYXJ0XG4gICAgICAuc2VsZWN0QWxsKCcubGVnZW5kLWl0ZW0nKVxuICAgICAgLmZpbHRlcigoZCwgaSkgPT4gaSAhPT0gaW5kZXgpXG4gICAgICAuY2xhc3NlZCgnaW5hY3RpdmUnLCB0cnVlKTtcblxuICAgIHNsaWNlcy5maWx0ZXIoKGQsIGkpID0+IGkgIT09IGluZGV4KS5jbGFzc2VkKCdpbmFjdGl2ZScsIHRydWUpO1xuXG4gICAgc2xpY2VcbiAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgIC5kdXJhdGlvbigzMDApXG4gICAgICAuZGVsYXkoMClcbiAgICAgIC5hdHRyVHdlZW4oJ2QnLCAoZDogYW55KSA9PiB7XG4gICAgICAgIGxldCBpID0gZDNfaW50ZXJwb2xhdGUoZC5vdXRlclJhZGl1cywgdGhpcy5vdXRlclJhZGl1cyArIHRoaXMuYXJjWm9vbSk7XG4gICAgICAgIHJldHVybiB0ID0+IHtcbiAgICAgICAgICBkLm91dGVyUmFkaXVzID0gaSh0KTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5hcmMoZCk7XG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgIHRoaXMuaG92ZXJlZC5lbWl0KGRhdGEuZGF0YSA/IGRhdGEuZGF0YSA6IGRhdGEpOyAvLyBsZWdlbmQgaG92ZXIgZGF0YSBpcyBkaWZmZXJlbnQgdGhhbiBzbGljZSBob3ZlciBkYXRhXG4gIH07XG5cbiAgcHJpdmF0ZSBwYXRoTW91c2VPdXQgPSAoZGF0YSwgaW5kZXgsIHZhbHVlKSA9PiB7XG4gICAgbGV0IHNsaWNlcyA9IHRoaXMuY2hhcnQuc2VsZWN0QWxsKCcuc2xpY2UnKTtcbiAgICBsZXQgc2xpY2UgPSBzbGljZXMuZmlsdGVyKChkLCBpKSA9PiBpID09PSBpbmRleCk7XG5cbiAgICB0aGlzLmNoYXJ0XG4gICAgICAuc2VsZWN0QWxsKCcubGVnZW5kLWl0ZW0nKVxuICAgICAgLmZpbHRlcigoZCwgaSkgPT4gaSAhPT0gaW5kZXgpXG4gICAgICAuY2xhc3NlZCgnaW5hY3RpdmUnLCBmYWxzZSk7XG5cbiAgICBzbGljZXMuY2xhc3NlZCgnaW5hY3RpdmUnLCBmYWxzZSk7XG5cbiAgICBzbGljZVxuICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgLmR1cmF0aW9uKDMwMClcbiAgICAgIC5kZWxheSgwKVxuICAgICAgLmF0dHJUd2VlbignZCcsIChkOiBhbnkpID0+IHtcbiAgICAgICAgbGV0IGkgPSBkM19pbnRlcnBvbGF0ZShkLm91dGVyUmFkaXVzLCB0aGlzLm91dGVyUmFkaXVzKTtcbiAgICAgICAgcmV0dXJuIHQgPT4ge1xuICAgICAgICAgIGQub3V0ZXJSYWRpdXMgPSBpKHQpO1xuICAgICAgICAgIHJldHVybiB0aGlzLmFyYyhkKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICB9O1xuXG4gIHByaXZhdGUgcGF0aENsaWNrID0gKGRhdGEsIGluZGV4LCBub2RlcykgPT4ge1xuICAgIHRoaXMuY2xpY2tlZC5lbWl0KGRhdGEuZGF0YSk7XG4gIH07XG5cbiAgcHJpdmF0ZSB0b29sdGlwU2hvdyA9IChub2RlLCBkYXRhKSA9PiB7XG4gICAgdGhpcy50b29sdGlwU2V0UG9zaXRpb24obm9kZSk7XG5cbiAgICBsZXQgcGVyY2VudGFnZSA9IChkYXRhLmVuZEFuZ2xlIC0gZGF0YS5zdGFydEFuZ2xlKSAvICgyICogTWF0aC5QSSk7XG5cbiAgICB0aGlzLnRvb2x0aXAuaHRtbChcbiAgICAgIGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInRvb2x0aXAtbGFiZWxcIj4ke2RhdGEuZGF0YS5sYWJlbH08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRvb2x0aXAtdmFsdWVcIj4ke3RoaXMudG9vbHRpcEZvcm1hdChwZXJjZW50YWdlKX08L2Rpdj5cbiAgICAgIGBcbiAgICApO1xuXG4gICAgdGhpcy50b29sdGlwLnN0eWxlKCdvcGFjaXR5JywgMSk7XG4gIH07XG5cbiAgcHJpdmF0ZSB0b29sdGlwTW92ZSA9IG5vZGUgPT4ge1xuICAgIHRoaXMudG9vbHRpcFNldFBvc2l0aW9uKG5vZGUpO1xuICB9O1xuXG4gIHByaXZhdGUgdG9vbHRpcEhpZGUgPSAoKSA9PiB7XG4gICAgdGhpcy50b29sdGlwLnN0eWxlKCdvcGFjaXR5JywgMCk7XG4gIH07XG5cbiAgcHJpdmF0ZSB0b29sdGlwU2V0UG9zaXRpb24gPSBub2RlID0+IHtcbiAgICBsZXQgY29vcmRpbmF0ZXMgPSBkM19tb3VzZShub2RlKTtcblxuICAgIHRoaXMudG9vbHRpcC5zdHlsZSgnbGVmdCcsIGAke2Nvb3JkaW5hdGVzWzBdICsgMTZ9cHhgKTtcbiAgICB0aGlzLnRvb2x0aXAuc3R5bGUoJ3RvcCcsIGAke2Nvb3JkaW5hdGVzWzFdICsgMTZ9cHhgKTtcbiAgfTtcbn1cbiJdfQ==