/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            .x((d, i) => x(i))
            .y((d) => y(d));
        /** @type {?} */
        let area = d3_area()
            .x((d, i) => x(i))
            .y0(this.height)
            .y1((d) => y(d));
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
                .attr('x', (d, i) => x(i))
                .attr('y', d => (d > 0 ? y(d) : y(0)))
                .attr('width', barWidth)
                .attr('height', d => Math.abs(y(d) - y(0)))
                .attr('fill', d => (d > 0 ? this.color : this.colorNegative));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXZpei1zcGFya2xpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcGItZGVzaWduLXN5c3RlbS8iLCJzb3VyY2VzIjpbImxpYi9kYXRhdml6L2RhdGF2aXotc3BhcmtsaW5lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVsRixPQUFPLEVBQ0wsTUFBTSxJQUFJLFNBQVMsRUFDbkIsSUFBSSxJQUFJLE9BQU8sRUFDZixXQUFXLElBQUksY0FBYyxFQUM3QixHQUFHLElBQUksTUFBTSxFQUNiLEdBQUcsSUFBSSxNQUFNLEVBQ2IsSUFBSSxJQUFJLE9BQU8sRUFDaEIsTUFBTSxJQUFJLENBQUM7QUFTWixNQUFNLE9BQU8sNkJBQTZCOzs7O0lBc0N4QyxZQUFvQixRQUFvQjtRQUFwQixhQUFRLEdBQVIsUUFBUSxDQUFZO1FBcEN4QyxlQUFVLEdBQUcsSUFBSSxDQUFDO1FBR2xCLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBTXRCLFVBQUssR0FBRyxHQUFHLENBQUM7UUFHWixXQUFNLEdBQUcsRUFBRSxDQUFDO1FBR1osVUFBSyxHQUFHLFNBQVMsQ0FBQztRQUdsQixrQkFBYSxHQUFHLFNBQVMsQ0FBQztRQUcxQixTQUFJLEdBQTRCLE1BQU0sQ0FBQztRQUd2QyxnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUdoQixjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBR2QsY0FBUyxHQUFHLENBQUMsQ0FBQztJQU02QixDQUFDOzs7O0lBRTVDLFFBQVE7UUFDTixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDO1FBRXZELElBQUksSUFBSSxDQUFDLElBQUksS0FB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Q0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNyQyxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQztpQkFDdkIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUMxQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztTQUNqRTtJQUNILENBQUM7OztZQWxIRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsUUFBUSxFQUFFLEVBQUU7YUFFYjs7OztZQWpCa0MsVUFBVTs7O3lCQW1CMUMsV0FBVyxTQUFDLGtCQUFrQjs2QkFHOUIsV0FBVyxTQUFDLDRCQUE0QjttQkFHeEMsS0FBSztvQkFHTCxLQUFLO3FCQUdMLEtBQUs7b0JBR0wsS0FBSzs0QkFHTCxLQUFLO21CQUdMLEtBQUs7MEJBR0wsS0FBSzt3QkFHTCxLQUFLO3dCQUdMLEtBQUs7Ozs7SUE5Qk4sbURBQ2tCOztJQUVsQix1REFDc0I7O0lBRXRCLDZDQUM0Qjs7SUFFNUIsOENBQ1k7O0lBRVosK0NBQ1k7O0lBRVosOENBQ2tCOztJQUVsQixzREFDMEI7O0lBRTFCLDZDQUN1Qzs7SUFFdkMsb0RBQ2dCOztJQUVoQixrREFDYzs7SUFFZCxrREFDYzs7Ozs7SUFFZCw4Q0FBYzs7Ozs7SUFDZCw0Q0FBWTs7Ozs7SUFDWiwrQ0FBZTs7Ozs7SUFFSCxpREFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIHNlbGVjdCBhcyBkM19zZWxlY3QsXG4gIGxpbmUgYXMgZDNfbGluZSxcbiAgc2NhbGVMaW5lYXIgYXMgZDNfc2NhbGVMaW5lYXIsXG4gIG1pbiBhcyBkM19taW4sXG4gIG1heCBhcyBkM19tYXgsXG4gIGFyZWEgYXMgZDNfYXJlYVxufSBmcm9tICdkMyc7XG5cbmltcG9ydCB7IElQYmRzRGF0YXZpelNwYXJrbGluZSB9IGZyb20gJy4vZGF0YXZpei5pbnRlcmZhY2VzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncGJkcy1kYXRhdml6LXNwYXJrbGluZScsXG4gIHRlbXBsYXRlOiBgYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBQYmRzRGF0YXZpelNwYXJrbGluZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MucGJkcy1jaGFydCcpXG4gIGNoYXJ0Q2xhc3MgPSB0cnVlO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MucGJkcy1jaGFydC1zcGFya2xpbmUnKVxuICBzcGFya2xpbmVDbGFzcyA9IHRydWU7XG5cbiAgQElucHV0KClcbiAgZGF0YTogSVBiZHNEYXRhdml6U3BhcmtsaW5lO1xuXG4gIEBJbnB1dCgpXG4gIHdpZHRoID0gMTYwO1xuXG4gIEBJbnB1dCgpXG4gIGhlaWdodCA9IDgwO1xuXG4gIEBJbnB1dCgpXG4gIGNvbG9yID0gJyNjZjA5ODknO1xuXG4gIEBJbnB1dCgpXG4gIGNvbG9yTmVnYXRpdmUgPSAnIzNlNTNhNCc7XG5cbiAgQElucHV0KClcbiAgdHlwZTogJ2xpbmUnIHwgJ2FyZWEnIHwgJ2JhcicgPSAnbGluZSc7XG5cbiAgQElucHV0KClcbiAgc3Ryb2tlV2lkdGggPSAyO1xuXG4gIEBJbnB1dCgpXG4gIG1pbkJ1ZmZlciA9IDA7XG5cbiAgQElucHV0KClcbiAgbWF4QnVmZmVyID0gMDtcblxuICBwcml2YXRlIGNoYXJ0O1xuICBwcml2YXRlIHN2ZztcbiAgcHJpdmF0ZSBtYXJnaW47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm1hcmdpbiA9IHsgdG9wOiAxLCByaWdodDogMCwgYm90dG9tOiAxLCBsZWZ0OiAwIH07XG5cbiAgICBpZiAodGhpcy50eXBlID09PSAnYmFyJykge1xuICAgICAgdGhpcy5tYXJnaW4gPSB7IHRvcDogMCwgcmlnaHQ6IDAsIGJvdHRvbTogMCwgbGVmdDogMCB9O1xuICAgIH1cblxuICAgIGxldCB4ID0gZDNfc2NhbGVMaW5lYXIoKS5yYW5nZShbMCwgdGhpcy53aWR0aCAtIHRoaXMubWFyZ2luLmxlZnQgLSB0aGlzLm1hcmdpbi5yaWdodF0pO1xuICAgIGxldCB5ID0gZDNfc2NhbGVMaW5lYXIoKS5yYW5nZShbdGhpcy5oZWlnaHQgLSB0aGlzLm1hcmdpbi50b3AgLSB0aGlzLm1hcmdpbi5ib3R0b20sIDBdKTtcblxuICAgIHkuZG9tYWluKFsrZDNfbWluKHRoaXMuZGF0YSkgLSB0aGlzLm1pbkJ1ZmZlciwgK2QzX21heCh0aGlzLmRhdGEpICsgdGhpcy5tYXhCdWZmZXJdKTtcbiAgICB4LmRvbWFpbihbMCwgdGhpcy5kYXRhLmxlbmd0aF0pO1xuXG4gICAgbGV0IGxpbmUgPSBkM19saW5lKClcbiAgICAgIC54KChkLCBpKSA9PiB4KGkpKVxuICAgICAgLnkoKGQ6IGFueSkgPT4geShkKSk7XG5cbiAgICBsZXQgYXJlYSA9IGQzX2FyZWEoKVxuICAgICAgLngoKGQsIGkpID0+IHgoaSkpXG4gICAgICAueTAodGhpcy5oZWlnaHQpXG4gICAgICAueTEoKGQ6IGFueSkgPT4geShkKSk7XG5cbiAgICB0aGlzLmNoYXJ0ID0gZDNfc2VsZWN0KHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCkuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4gICAgdGhpcy5zdmcgPSB0aGlzLmNoYXJ0XG4gICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgLmF0dHIoJ3dpZHRoJywgdGhpcy53aWR0aClcbiAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmhlaWdodClcbiAgICAgIC5hdHRyKCdjbGFzcycsICdpbWctZmx1aWQnKVxuICAgICAgLmF0dHIoJ3ByZXNlcnZlQXNwZWN0UmF0aW8nLCAneE1pbllNaW4gbWVldCcpXG4gICAgICAuYXR0cigndmlld0JveCcsIGAtJHt0aGlzLm1hcmdpbi5sZWZ0fSAtJHt0aGlzLm1hcmdpbi50b3B9ICR7dGhpcy53aWR0aH0gJHt0aGlzLmhlaWdodH1gKTtcblxuICAgIGlmICh0aGlzLnR5cGUgPT09ICdsaW5lJyB8fCB0aGlzLnR5cGUgPT09ICdhcmVhJykge1xuICAgICAgdGhpcy5zdmdcbiAgICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAgIC5kYXR1bSh0aGlzLmRhdGEpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdzcGFya2xpbmUnKVxuICAgICAgICAuYXR0cignZmlsbCcsICdub25lJylcbiAgICAgICAgLmF0dHIoJ3N0cm9rZS13aWR0aCcsIHRoaXMuc3Ryb2tlV2lkdGgpXG4gICAgICAgIC5hdHRyKCdzdHJva2UnLCB0aGlzLmNvbG9yKVxuICAgICAgICAuYXR0cignZCcsIGxpbmUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnR5cGUgPT09ICdhcmVhJykge1xuICAgICAgdGhpcy5zdmdcbiAgICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAgIC5kYXR1bSh0aGlzLmRhdGEpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdzcGFya2FyZWEnKVxuICAgICAgICAuYXR0cignZmlsbCcsIHRoaXMuY29sb3IpXG4gICAgICAgIC5hdHRyKCdmaWxsLW9wYWNpdHknLCAwLjMpXG4gICAgICAgIC5hdHRyKCdkJywgYXJlYSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ2JhcicpIHtcbiAgICAgIGNvbnN0IGJhcldpZHRoID0gKHRoaXMud2lkdGggLSB0aGlzLmRhdGEubGVuZ3RoKSAvIHRoaXMuZGF0YS5sZW5ndGg7XG5cbiAgICAgIC8vIGhhbmRsZXMgbmVnYXRpdmUgdmFsdWVzLCBzZWUgZXhhbXBsZSBodHRwczovL3d3dy5lc3N5Y29kZS5jb20vcG9zdHMvY3JlYXRlLXNwYXJrbGluZS1jaGFydHMtZDMvXG4gICAgICB0aGlzLnN2Z1xuICAgICAgICAuc2VsZWN0QWxsKCcuYmFyJylcbiAgICAgICAgLmRhdGEodGhpcy5kYXRhKVxuICAgICAgICAuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCdyZWN0JylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3NwYXJrYmFyJylcbiAgICAgICAgLmF0dHIoJ3gnLCAoZCwgaSkgPT4geChpKSlcbiAgICAgICAgLmF0dHIoJ3knLCBkID0+IChkID4gMCA/IHkoZCkgOiB5KDApKSlcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgYmFyV2lkdGgpXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCBkID0+IE1hdGguYWJzKHkoZCkgLSB5KDApKSlcbiAgICAgICAgLmF0dHIoJ2ZpbGwnLCBkID0+IChkID4gMCA/IHRoaXMuY29sb3IgOiB0aGlzLmNvbG9yTmVnYXRpdmUpKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==