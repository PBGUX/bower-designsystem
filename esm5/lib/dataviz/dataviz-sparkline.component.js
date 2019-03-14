/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ElementRef, HostBinding } from '@angular/core';
import { select as d3_select, line as d3_line, scaleLinear as d3_scaleLinear, min as d3_min, max as d3_max, area as d3_area } from 'd3';
var PbdsDatavizSparklineComponent = /** @class */ (function () {
    function PbdsDatavizSparklineComponent(_element) {
        this._element = _element;
        this.chartClass = true;
        this.sparklineClass = true;
        this.width = 160;
        this.height = 80;
        this.color = '#cf0989';
        this.colorNegative = '#3e53a4';
        this.type = 'line';
        this.strokeWidth = 2;
        this.minBuffer = 0;
        this.maxBuffer = 0;
    }
    /**
     * @return {?}
     */
    PbdsDatavizSparklineComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.margin = { top: 1, right: 0, bottom: 1, left: 0 };
        if (this.type === 'bar') {
            this.margin = { top: 0, right: 0, bottom: 0, left: 0 };
        }
        /** @type {?} */
        var x = d3_scaleLinear().range([0, this.width - this.margin.left - this.margin.right]);
        /** @type {?} */
        var y = d3_scaleLinear().range([this.height - this.margin.top - this.margin.bottom, 0]);
        y.domain([+d3_min(this.data) - this.minBuffer, +d3_max(this.data) + this.maxBuffer]);
        x.domain([0, this.data.length]);
        /** @type {?} */
        var line = d3_line()
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
        var area = d3_area()
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
        this.chart = d3_select(this._element.nativeElement).attr('aria-hidden', 'true');
        this.svg = this.chart
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('class', 'img-fluid')
            .attr('preserveAspectRatio', 'xMinYMin meet')
            .attr('viewBox', "-" + this.margin.left + " -" + this.margin.top + " " + this.width + " " + this.height);
        if (this.type === 'line' || this.type === 'area') {
            this.svg
                .append('path')
                .datum(this.data)
                .attr('class', 'sparkline')
                .attr('fill', 'none')
                .attr('stroke-width', this.strokeWidth)
                .attr('stroke', this.color)
                .attr('d', line);
        }
        if (this.type === 'area') {
            this.svg
                .append('path')
                .datum(this.data)
                .attr('class', 'sparkarea')
                .attr('fill', this.color)
                .attr('fill-opacity', 0.3)
                .attr('d', area);
        }
        if (this.type === 'bar') {
            /** @type {?} */
            var barWidth = (this.width - this.data.length) / this.data.length;
            // handles negative values, see example https://www.essycode.com/posts/create-sparkline-charts-d3/
            this.svg
                .selectAll('.bar')
                .data(this.data)
                .enter()
                .append('rect')
                .attr('class', 'sparkbar')
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
                .attr('width', barWidth)
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
        }
    };
    PbdsDatavizSparklineComponent.decorators = [
        { type: Component, args: [{
                    selector: 'pbds-dataviz-sparkline',
                    template: ""
                }] }
    ];
    /** @nocollapse */
    PbdsDatavizSparklineComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    PbdsDatavizSparklineComponent.propDecorators = {
        chartClass: [{ type: HostBinding, args: ['class.pbds-chart',] }],
        sparklineClass: [{ type: HostBinding, args: ['class.pbds-chart-sparkline',] }],
        data: [{ type: Input }],
        width: [{ type: Input }],
        height: [{ type: Input }],
        color: [{ type: Input }],
        colorNegative: [{ type: Input }],
        type: [{ type: Input }],
        strokeWidth: [{ type: Input }],
        minBuffer: [{ type: Input }],
        maxBuffer: [{ type: Input }]
    };
    return PbdsDatavizSparklineComponent;
}());
export { PbdsDatavizSparklineComponent };
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
    PbdsDatavizSparklineComponent.prototype.color;
    /** @type {?} */
    PbdsDatavizSparklineComponent.prototype.colorNegative;
    /** @type {?} */
    PbdsDatavizSparklineComponent.prototype.type;
    /** @type {?} */
    PbdsDatavizSparklineComponent.prototype.strokeWidth;
    /** @type {?} */
    PbdsDatavizSparklineComponent.prototype.minBuffer;
    /** @type {?} */
    PbdsDatavizSparklineComponent.prototype.maxBuffer;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXZpei1zcGFya2xpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcGItZGVzaWduLXN5c3RlbS8iLCJzb3VyY2VzIjpbImxpYi9kYXRhdml6L2RhdGF2aXotc3BhcmtsaW5lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVsRixPQUFPLEVBQ0wsTUFBTSxJQUFJLFNBQVMsRUFDbkIsSUFBSSxJQUFJLE9BQU8sRUFDZixXQUFXLElBQUksY0FBYyxFQUM3QixHQUFHLElBQUksTUFBTSxFQUNiLEdBQUcsSUFBSSxNQUFNLEVBQ2IsSUFBSSxJQUFJLE9BQU8sRUFDaEIsTUFBTSxJQUFJLENBQUM7QUFJWjtJQTJDRSx1Q0FBb0IsUUFBb0I7UUFBcEIsYUFBUSxHQUFSLFFBQVEsQ0FBWTtRQXBDeEMsZUFBVSxHQUFHLElBQUksQ0FBQztRQUdsQixtQkFBYyxHQUFHLElBQUksQ0FBQztRQU10QixVQUFLLEdBQUcsR0FBRyxDQUFDO1FBR1osV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUdaLFVBQUssR0FBRyxTQUFTLENBQUM7UUFHbEIsa0JBQWEsR0FBRyxTQUFTLENBQUM7UUFHMUIsU0FBSSxHQUE0QixNQUFNLENBQUM7UUFHdkMsZ0JBQVcsR0FBRyxDQUFDLENBQUM7UUFHaEIsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUdkLGNBQVMsR0FBRyxDQUFDLENBQUM7SUFNNkIsQ0FBQzs7OztJQUU1QyxnREFBUTs7O0lBQVI7UUFBQSxpQkFxRUM7UUFwRUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUV2RCxJQUFJLElBQUksQ0FBQyxJQUFJLEtB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OztJQUVILGlEQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtcbiAgc2VsZWN0IGFzIGQzX3NlbGVjdCxcbiAgbGluZSBhcyBkM19saW5lLFxuICBzY2FsZUxpbmVhciBhcyBkM19zY2FsZUxpbmVhcixcbiAgbWluIGFzIGQzX21pbixcbiAgbWF4IGFzIGQzX21heCxcbiAgYXJlYSBhcyBkM19hcmVhXG59IGZyb20gJ2QzJztcblxuaW1wb3J0IHsgUGJkc0RhdGF2aXpTcGFya2xpbmUgfSBmcm9tICcuL2RhdGF2aXouaW50ZXJmYWNlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BiZHMtZGF0YXZpei1zcGFya2xpbmUnLFxuICB0ZW1wbGF0ZTogYGAsXG4gIHN0eWxlczogW11cbn0pXG5leHBvcnQgY2xhc3MgUGJkc0RhdGF2aXpTcGFya2xpbmVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnBiZHMtY2hhcnQnKVxuICBjaGFydENsYXNzID0gdHJ1ZTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnBiZHMtY2hhcnQtc3BhcmtsaW5lJylcbiAgc3BhcmtsaW5lQ2xhc3MgPSB0cnVlO1xuXG4gIEBJbnB1dCgpXG4gIGRhdGE6IFBiZHNEYXRhdml6U3BhcmtsaW5lO1xuXG4gIEBJbnB1dCgpXG4gIHdpZHRoID0gMTYwO1xuXG4gIEBJbnB1dCgpXG4gIGhlaWdodCA9IDgwO1xuXG4gIEBJbnB1dCgpXG4gIGNvbG9yID0gJyNjZjA5ODknO1xuXG4gIEBJbnB1dCgpXG4gIGNvbG9yTmVnYXRpdmUgPSAnIzNlNTNhNCc7XG5cbiAgQElucHV0KClcbiAgdHlwZTogJ2xpbmUnIHwgJ2FyZWEnIHwgJ2JhcicgPSAnbGluZSc7XG5cbiAgQElucHV0KClcbiAgc3Ryb2tlV2lkdGggPSAyO1xuXG4gIEBJbnB1dCgpXG4gIG1pbkJ1ZmZlciA9IDA7XG5cbiAgQElucHV0KClcbiAgbWF4QnVmZmVyID0gMDtcblxuICBwcml2YXRlIGNoYXJ0O1xuICBwcml2YXRlIHN2ZztcbiAgcHJpdmF0ZSBtYXJnaW47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm1hcmdpbiA9IHsgdG9wOiAxLCByaWdodDogMCwgYm90dG9tOiAxLCBsZWZ0OiAwIH07XG5cbiAgICBpZiAodGhpcy50eXBlID09PSAnYmFyJykge1xuICAgICAgdGhpcy5tYXJnaW4gPSB7IHRvcDogMCwgcmlnaHQ6IDAsIGJvdHRvbTogMCwgbGVmdDogMCB9O1xuICAgIH1cblxuICAgIGxldCB4ID0gZDNfc2NhbGVMaW5lYXIoKS5yYW5nZShbMCwgdGhpcy53aWR0aCAtIHRoaXMubWFyZ2luLmxlZnQgLSB0aGlzLm1hcmdpbi5yaWdodF0pO1xuICAgIGxldCB5ID0gZDNfc2NhbGVMaW5lYXIoKS5yYW5nZShbdGhpcy5oZWlnaHQgLSB0aGlzLm1hcmdpbi50b3AgLSB0aGlzLm1hcmdpbi5ib3R0b20sIDBdKTtcblxuICAgIHkuZG9tYWluKFsrZDNfbWluKHRoaXMuZGF0YSkgLSB0aGlzLm1pbkJ1ZmZlciwgK2QzX21heCh0aGlzLmRhdGEpICsgdGhpcy5tYXhCdWZmZXJdKTtcbiAgICB4LmRvbWFpbihbMCwgdGhpcy5kYXRhLmxlbmd0aF0pO1xuXG4gICAgbGV0IGxpbmUgPSBkM19saW5lKClcbiAgICAgIC54KChkLCBpKSA9PiB4KGkpKVxuICAgICAgLnkoKGQ6IGFueSkgPT4geShkKSk7XG5cbiAgICBsZXQgYXJlYSA9IGQzX2FyZWEoKVxuICAgICAgLngoKGQsIGkpID0+IHgoaSkpXG4gICAgICAueTAodGhpcy5oZWlnaHQpXG4gICAgICAueTEoKGQ6IGFueSkgPT4geShkKSk7XG5cbiAgICB0aGlzLmNoYXJ0ID0gZDNfc2VsZWN0KHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCkuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4gICAgdGhpcy5zdmcgPSB0aGlzLmNoYXJ0XG4gICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgLmF0dHIoJ3dpZHRoJywgdGhpcy53aWR0aClcbiAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmhlaWdodClcbiAgICAgIC5hdHRyKCdjbGFzcycsICdpbWctZmx1aWQnKVxuICAgICAgLmF0dHIoJ3ByZXNlcnZlQXNwZWN0UmF0aW8nLCAneE1pbllNaW4gbWVldCcpXG4gICAgICAuYXR0cigndmlld0JveCcsIGAtJHt0aGlzLm1hcmdpbi5sZWZ0fSAtJHt0aGlzLm1hcmdpbi50b3B9ICR7dGhpcy53aWR0aH0gJHt0aGlzLmhlaWdodH1gKTtcblxuICAgIGlmICh0aGlzLnR5cGUgPT09ICdsaW5lJyB8fCB0aGlzLnR5cGUgPT09ICdhcmVhJykge1xuICAgICAgdGhpcy5zdmdcbiAgICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAgIC5kYXR1bSh0aGlzLmRhdGEpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdzcGFya2xpbmUnKVxuICAgICAgICAuYXR0cignZmlsbCcsICdub25lJylcbiAgICAgICAgLmF0dHIoJ3N0cm9rZS13aWR0aCcsIHRoaXMuc3Ryb2tlV2lkdGgpXG4gICAgICAgIC5hdHRyKCdzdHJva2UnLCB0aGlzLmNvbG9yKVxuICAgICAgICAuYXR0cignZCcsIGxpbmUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnR5cGUgPT09ICdhcmVhJykge1xuICAgICAgdGhpcy5zdmdcbiAgICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAgIC5kYXR1bSh0aGlzLmRhdGEpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdzcGFya2FyZWEnKVxuICAgICAgICAuYXR0cignZmlsbCcsIHRoaXMuY29sb3IpXG4gICAgICAgIC5hdHRyKCdmaWxsLW9wYWNpdHknLCAwLjMpXG4gICAgICAgIC5hdHRyKCdkJywgYXJlYSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ2JhcicpIHtcbiAgICAgIGNvbnN0IGJhcldpZHRoID0gKHRoaXMud2lkdGggLSB0aGlzLmRhdGEubGVuZ3RoKSAvIHRoaXMuZGF0YS5sZW5ndGg7XG5cbiAgICAgIC8vIGhhbmRsZXMgbmVnYXRpdmUgdmFsdWVzLCBzZWUgZXhhbXBsZSBodHRwczovL3d3dy5lc3N5Y29kZS5jb20vcG9zdHMvY3JlYXRlLXNwYXJrbGluZS1jaGFydHMtZDMvXG4gICAgICB0aGlzLnN2Z1xuICAgICAgICAuc2VsZWN0QWxsKCcuYmFyJylcbiAgICAgICAgLmRhdGEodGhpcy5kYXRhKVxuICAgICAgICAuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCdyZWN0JylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3NwYXJrYmFyJylcbiAgICAgICAgLmF0dHIoJ3gnLCAoZCwgaSkgPT4geChpKSlcbiAgICAgICAgLmF0dHIoJ3knLCBkID0+IChkID4gMCA/IHkoZCkgOiB5KDApKSlcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgYmFyV2lkdGgpXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCBkID0+IE1hdGguYWJzKHkoZCkgLSB5KDApKSlcbiAgICAgICAgLmF0dHIoJ2ZpbGwnLCBkID0+IChkID4gMCA/IHRoaXMuY29sb3IgOiB0aGlzLmNvbG9yTmVnYXRpdmUpKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==