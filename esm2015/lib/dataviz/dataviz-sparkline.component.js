/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ElementRef, HostBinding } from '@angular/core';
import { select as d3_select, line as d3_line, scaleLinear as d3_scaleLinear, min as d3_min, max as d3_max, area as d3_area } from 'd3';
export class PbdsDatavizSparklineComponent {
    /**
     * @param {?} _element
     */
    constructor(_element) {
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
    ngOnInit() {
        this.margin = { top: 1, right: 0, bottom: 1, left: 0 };
        if (this.type === 'bar') {
            this.margin = { top: 0, right: 0, bottom: 0, left: 0 };
        }
        /** @type {?} */
        let x = d3_scaleLinear().range([0, this.width - this.margin.left - this.margin.right]);
        /** @type {?} */
        let y = d3_scaleLinear().range([this.height - this.margin.top - this.margin.bottom, 0]);
        y.domain([+d3_min(this.data) - this.minBuffer, +d3_max(this.data) + this.maxBuffer]);
        x.domain([0, this.data.length]);
        /** @type {?} */
        let line = d3_line()
            .x((/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        (d, i) => x(i)))
            .y((/**
         * @param {?} d
         * @return {?}
         */
        (d) => y(d)));
        /** @type {?} */
        let area = d3_area()
            .x((/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        (d, i) => x(i)))
            .y0(this.height)
            .y1((/**
         * @param {?} d
         * @return {?}
         */
        (d) => y(d)));
        this.chart = d3_select(this._element.nativeElement).attr('aria-hidden', 'true');
        this.svg = this.chart
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('class', 'img-fluid')
            .attr('preserveAspectRatio', 'xMinYMin meet')
            .attr('viewBox', `-${this.margin.left} -${this.margin.top} ${this.width} ${this.height}`);
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
            const barWidth = (this.width - this.data.length) / this.data.length;
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
            (d, i) => x(i)))
                .attr('y', (/**
             * @param {?} d
             * @return {?}
             */
            d => (d > 0 ? y(d) : y(0))))
                .attr('width', barWidth)
                .attr('height', (/**
             * @param {?} d
             * @return {?}
             */
            d => Math.abs(y(d) - y(0))))
                .attr('fill', (/**
             * @param {?} d
             * @return {?}
             */
            d => (d > 0 ? this.color : this.colorNegative)));
        }
    }
}
PbdsDatavizSparklineComponent.decorators = [
    { type: Component, args: [{
                selector: 'pbds-dataviz-sparkline',
                template: ``
            }] }
];
/** @nocollapse */
PbdsDatavizSparklineComponent.ctorParameters = () => [
    { type: ElementRef }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXZpei1zcGFya2xpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcGItZGVzaWduLXN5c3RlbS8iLCJzb3VyY2VzIjpbImxpYi9kYXRhdml6L2RhdGF2aXotc3BhcmtsaW5lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVsRixPQUFPLEVBQ0wsTUFBTSxJQUFJLFNBQVMsRUFDbkIsSUFBSSxJQUFJLE9BQU8sRUFDZixXQUFXLElBQUksY0FBYyxFQUM3QixHQUFHLElBQUksTUFBTSxFQUNiLEdBQUcsSUFBSSxNQUFNLEVBQ2IsSUFBSSxJQUFJLE9BQU8sRUFDaEIsTUFBTSxJQUFJLENBQUM7QUFTWixNQUFNLE9BQU8sNkJBQTZCOzs7O0lBc0N4QyxZQUFvQixRQUFvQjtRQUFwQixhQUFRLEdBQVIsUUFBUSxDQUFZO1FBcEN4QyxlQUFVLEdBQUcsSUFBSSxDQUFDO1FBR2xCLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBTXRCLFVBQUssR0FBRyxHQUFHLENBQUM7UUFHWixXQUFNLEdBQUcsRUFBRSxDQUFDO1FBR1osVUFBSyxHQUFHLFNBQVMsQ0FBQztRQUdsQixrQkFBYSxHQUFHLFNBQVMsQ0FBQztRQUcxQixTQUFJLEdBQTRCLE1BQU0sQ0FBQztRQUd2QyxnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUdoQixjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBR2QsY0FBUyxHQUFHLENBQUMsQ0FBQztJQU02QixDQUFDOzs7O0lBRTVDLFFBQVE7UUFDTixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDO1FBRXZELElBQUksSUFBSSxDQUFDLElBQUksS0FB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LENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDO2lCQUNyQyxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQztpQkFDdkIsSUFBSSxDQUFDLFFBQVE7Ozs7WUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDO2lCQUMxQyxJQUFJLENBQUMsTUFBTTs7OztZQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUMsQ0FBQztTQUNqRTtJQUNILENBQUM7OztZQWxIRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsUUFBUSxFQUFFLEVBQUU7YUFFYjs7OztZQWpCa0MsVUFBVTs7O3lCQW1CMUMsV0FBVyxTQUFDLGtCQUFrQjs2QkFHOUIsV0FBVyxTQUFDLDRCQUE0QjttQkFHeEMsS0FBSztvQkFHTCxLQUFLO3FCQUdMLEtBQUs7b0JBR0wsS0FBSzs0QkFHTCxLQUFLO21CQUdMLEtBQUs7MEJBR0wsS0FBSzt3QkFHTCxLQUFLO3dCQUdMLEtBQUs7Ozs7SUE5Qk4sbURBQ2tCOztJQUVsQix1REFDc0I7O0lBRXRCLDZDQUMyQjs7SUFFM0IsOENBQ1k7O0lBRVosK0NBQ1k7O0lBRVosOENBQ2tCOztJQUVsQixzREFDMEI7O0lBRTFCLDZDQUN1Qzs7SUFFdkMsb0RBQ2dCOztJQUVoQixrREFDYzs7SUFFZCxrREFDYzs7Ozs7SUFFZCw4Q0FBYzs7Ozs7SUFDZCw0Q0FBWTs7Ozs7SUFDWiwrQ0FBZTs7Ozs7SUFFSCxpREFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIHNlbGVjdCBhcyBkM19zZWxlY3QsXG4gIGxpbmUgYXMgZDNfbGluZSxcbiAgc2NhbGVMaW5lYXIgYXMgZDNfc2NhbGVMaW5lYXIsXG4gIG1pbiBhcyBkM19taW4sXG4gIG1heCBhcyBkM19tYXgsXG4gIGFyZWEgYXMgZDNfYXJlYVxufSBmcm9tICdkMyc7XG5cbmltcG9ydCB7IFBiZHNEYXRhdml6U3BhcmtsaW5lIH0gZnJvbSAnLi9kYXRhdml6LmludGVyZmFjZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYmRzLWRhdGF2aXotc3BhcmtsaW5lJyxcbiAgdGVtcGxhdGU6IGBgLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIFBiZHNEYXRhdml6U3BhcmtsaW5lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5wYmRzLWNoYXJ0JylcbiAgY2hhcnRDbGFzcyA9IHRydWU7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5wYmRzLWNoYXJ0LXNwYXJrbGluZScpXG4gIHNwYXJrbGluZUNsYXNzID0gdHJ1ZTtcblxuICBASW5wdXQoKVxuICBkYXRhOiBQYmRzRGF0YXZpelNwYXJrbGluZTtcblxuICBASW5wdXQoKVxuICB3aWR0aCA9IDE2MDtcblxuICBASW5wdXQoKVxuICBoZWlnaHQgPSA4MDtcblxuICBASW5wdXQoKVxuICBjb2xvciA9ICcjY2YwOTg5JztcblxuICBASW5wdXQoKVxuICBjb2xvck5lZ2F0aXZlID0gJyMzZTUzYTQnO1xuXG4gIEBJbnB1dCgpXG4gIHR5cGU6ICdsaW5lJyB8ICdhcmVhJyB8ICdiYXInID0gJ2xpbmUnO1xuXG4gIEBJbnB1dCgpXG4gIHN0cm9rZVdpZHRoID0gMjtcblxuICBASW5wdXQoKVxuICBtaW5CdWZmZXIgPSAwO1xuXG4gIEBJbnB1dCgpXG4gIG1heEJ1ZmZlciA9IDA7XG5cbiAgcHJpdmF0ZSBjaGFydDtcbiAgcHJpdmF0ZSBzdmc7XG4gIHByaXZhdGUgbWFyZ2luO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5tYXJnaW4gPSB7IHRvcDogMSwgcmlnaHQ6IDAsIGJvdHRvbTogMSwgbGVmdDogMCB9O1xuXG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ2JhcicpIHtcbiAgICAgIHRoaXMubWFyZ2luID0geyB0b3A6IDAsIHJpZ2h0OiAwLCBib3R0b206IDAsIGxlZnQ6IDAgfTtcbiAgICB9XG5cbiAgICBsZXQgeCA9IGQzX3NjYWxlTGluZWFyKCkucmFuZ2UoWzAsIHRoaXMud2lkdGggLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXJnaW4ucmlnaHRdKTtcbiAgICBsZXQgeSA9IGQzX3NjYWxlTGluZWFyKCkucmFuZ2UoW3RoaXMuaGVpZ2h0IC0gdGhpcy5tYXJnaW4udG9wIC0gdGhpcy5tYXJnaW4uYm90dG9tLCAwXSk7XG5cbiAgICB5LmRvbWFpbihbK2QzX21pbih0aGlzLmRhdGEpIC0gdGhpcy5taW5CdWZmZXIsICtkM19tYXgodGhpcy5kYXRhKSArIHRoaXMubWF4QnVmZmVyXSk7XG4gICAgeC5kb21haW4oWzAsIHRoaXMuZGF0YS5sZW5ndGhdKTtcblxuICAgIGxldCBsaW5lID0gZDNfbGluZSgpXG4gICAgICAueCgoZCwgaSkgPT4geChpKSlcbiAgICAgIC55KChkOiBhbnkpID0+IHkoZCkpO1xuXG4gICAgbGV0IGFyZWEgPSBkM19hcmVhKClcbiAgICAgIC54KChkLCBpKSA9PiB4KGkpKVxuICAgICAgLnkwKHRoaXMuaGVpZ2h0KVxuICAgICAgLnkxKChkOiBhbnkpID0+IHkoZCkpO1xuXG4gICAgdGhpcy5jaGFydCA9IGQzX3NlbGVjdCh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuICAgIHRoaXMuc3ZnID0gdGhpcy5jaGFydFxuICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgIC5hdHRyKCd3aWR0aCcsIHRoaXMud2lkdGgpXG4gICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy5oZWlnaHQpXG4gICAgICAuYXR0cignY2xhc3MnLCAnaW1nLWZsdWlkJylcbiAgICAgIC5hdHRyKCdwcmVzZXJ2ZUFzcGVjdFJhdGlvJywgJ3hNaW5ZTWluIG1lZXQnKVxuICAgICAgLmF0dHIoJ3ZpZXdCb3gnLCBgLSR7dGhpcy5tYXJnaW4ubGVmdH0gLSR7dGhpcy5tYXJnaW4udG9wfSAke3RoaXMud2lkdGh9ICR7dGhpcy5oZWlnaHR9YCk7XG5cbiAgICBpZiAodGhpcy50eXBlID09PSAnbGluZScgfHwgdGhpcy50eXBlID09PSAnYXJlYScpIHtcbiAgICAgIHRoaXMuc3ZnXG4gICAgICAgIC5hcHBlbmQoJ3BhdGgnKVxuICAgICAgICAuZGF0dW0odGhpcy5kYXRhKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnc3BhcmtsaW5lJylcbiAgICAgICAgLmF0dHIoJ2ZpbGwnLCAnbm9uZScpXG4gICAgICAgIC5hdHRyKCdzdHJva2Utd2lkdGgnLCB0aGlzLnN0cm9rZVdpZHRoKVxuICAgICAgICAuYXR0cignc3Ryb2tlJywgdGhpcy5jb2xvcilcbiAgICAgICAgLmF0dHIoJ2QnLCBsaW5lKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy50eXBlID09PSAnYXJlYScpIHtcbiAgICAgIHRoaXMuc3ZnXG4gICAgICAgIC5hcHBlbmQoJ3BhdGgnKVxuICAgICAgICAuZGF0dW0odGhpcy5kYXRhKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnc3BhcmthcmVhJylcbiAgICAgICAgLmF0dHIoJ2ZpbGwnLCB0aGlzLmNvbG9yKVxuICAgICAgICAuYXR0cignZmlsbC1vcGFjaXR5JywgMC4zKVxuICAgICAgICAuYXR0cignZCcsIGFyZWEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnR5cGUgPT09ICdiYXInKSB7XG4gICAgICBjb25zdCBiYXJXaWR0aCA9ICh0aGlzLndpZHRoIC0gdGhpcy5kYXRhLmxlbmd0aCkgLyB0aGlzLmRhdGEubGVuZ3RoO1xuXG4gICAgICAvLyBoYW5kbGVzIG5lZ2F0aXZlIHZhbHVlcywgc2VlIGV4YW1wbGUgaHR0cHM6Ly93d3cuZXNzeWNvZGUuY29tL3Bvc3RzL2NyZWF0ZS1zcGFya2xpbmUtY2hhcnRzLWQzL1xuICAgICAgdGhpcy5zdmdcbiAgICAgICAgLnNlbGVjdEFsbCgnLmJhcicpXG4gICAgICAgIC5kYXRhKHRoaXMuZGF0YSlcbiAgICAgICAgLmVudGVyKClcbiAgICAgICAgLmFwcGVuZCgncmVjdCcpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdzcGFya2JhcicpXG4gICAgICAgIC5hdHRyKCd4JywgKGQsIGkpID0+IHgoaSkpXG4gICAgICAgIC5hdHRyKCd5JywgZCA9PiAoZCA+IDAgPyB5KGQpIDogeSgwKSkpXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIGJhcldpZHRoKVxuICAgICAgICAuYXR0cignaGVpZ2h0JywgZCA9PiBNYXRoLmFicyh5KGQpIC0geSgwKSkpXG4gICAgICAgIC5hdHRyKCdmaWxsJywgZCA9PiAoZCA+IDAgPyB0aGlzLmNvbG9yIDogdGhpcy5jb2xvck5lZ2F0aXZlKSk7XG4gICAgfVxuICB9XG59XG4iXX0=