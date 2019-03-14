/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ElementRef, HostBinding, Output, EventEmitter } from '@angular/core';
import { select as d3_select, scaleOrdinal as d3_scaleOrdinal, pie as d3_pie, arc as d3_arc, interpolate as d3_interpolate, mouse as d3_mouse, format as d3_format } from 'd3';
import { PbdsDatavizService } from './dataviz.service';
export class PbdsDatavizPieComponent {
    /**
     * @param {?} _dataviz
     * @param {?} _element
     */
    constructor(_dataviz, _element) {
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
        (data, index, nodes) => {
            this.chart
                .selectAll('.legend-item')
                .filter((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => i !== index))
                .classed('inactive', true);
        });
        this.legendMouseOutBlur = (/**
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (data, index, nodes) => {
            this.chart.selectAll('.legend-item').classed('inactive', false);
        });
        this.pathMouseOver = (/**
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (data, index, nodes) => {
            /** @type {?} */
            let slices = this.chart.selectAll('.slice');
            /** @type {?} */
            let slice = slices.filter((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => i === index));
            this.chart
                .selectAll('.legend-item')
                .filter((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => i !== index))
                .classed('inactive', true);
            slices.filter((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => i !== index)).classed('inactive', true);
            slice
                .transition()
                .duration(300)
                .delay(0)
                .attrTween('d', (/**
             * @param {?} d
             * @return {?}
             */
            (d) => {
                /** @type {?} */
                let i = d3_interpolate(d.outerRadius, this.outerRadius + this.arcZoom);
                return (/**
                 * @param {?} t
                 * @return {?}
                 */
                t => {
                    d.outerRadius = i(t);
                    return this.arc(d);
                });
            }));
            this.hovered.emit(data.data ? data.data : data); // legend hover data is different than slice hover data
        });
        this.pathMouseOut = (/**
         * @param {?} data
         * @param {?} index
         * @param {?} value
         * @return {?}
         */
        (data, index, value) => {
            /** @type {?} */
            let slices = this.chart.selectAll('.slice');
            /** @type {?} */
            let slice = slices.filter((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => i === index));
            this.chart
                .selectAll('.legend-item')
                .filter((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => i !== index))
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
            (d) => {
                /** @type {?} */
                let i = d3_interpolate(d.outerRadius, this.outerRadius);
                return (/**
                 * @param {?} t
                 * @return {?}
                 */
                t => {
                    d.outerRadius = i(t);
                    return this.arc(d);
                });
            }));
        });
        this.pathClick = (/**
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (data, index, nodes) => {
            this.clicked.emit(data.data);
        });
        this.tooltipShow = (/**
         * @param {?} node
         * @param {?} data
         * @return {?}
         */
        (node, data) => {
            this.tooltipSetPosition(node);
            /** @type {?} */
            let percentage = (data.endAngle - data.startAngle) / (2 * Math.PI);
            this.tooltip.html(`
        <div class="tooltip-label">${data.data.label}</div>
        <div class="tooltip-value">${this.tooltipFormat(percentage)}</div>
      `);
            this.tooltip.style('opacity', 1);
        });
        this.tooltipMove = (/**
         * @param {?} node
         * @return {?}
         */
        node => {
            this.tooltipSetPosition(node);
        });
        this.tooltipHide = (/**
         * @return {?}
         */
        () => {
            this.tooltip.style('opacity', 0);
        });
        this.tooltipSetPosition = (/**
         * @param {?} node
         * @return {?}
         */
        node => {
            /** @type {?} */
            let coordinates = d3_mouse(node);
            this.tooltip.style('left', `${coordinates[0] + 16}px`);
            this.tooltip.style('top', `${coordinates[1] + 16}px`);
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
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
        c => c.label)));
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
            .attr('viewBox', `-${this.width / 2 + this.margin.left} -${this.height / 2 + this.margin.top} ${this.width +
            this.margin.left +
            this.margin.right} ${this.height + this.margin.top + this.margin.bottom}`);
        this.pie = d3_pie()
            .padAngle(this.anglePad)
            .value((/**
         * @param {?} d
         * @return {?}
         */
        (d) => d.value));
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
        (d) => (d.outerRadius = this.outerRadius)))
            .attr('d', this.arc)
            .attr('fill', (/**
         * @param {?} d
         * @return {?}
         */
        (d) => this.colorRange(d.data.label)))
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
        (d) => this.colorRange(d.label)));
        /** @type {?} */
        let legendDescription = this.legend.append('span').attr('class', 'legend-description');
        legendDescription
            .append('span')
            .attr('class', 'legend-label')
            .html((/**
         * @param {?} d
         * @return {?}
         */
        (d) => d.label));
        legendDescription
            .append('span')
            .attr('class', 'legend-value')
            .html((/**
         * @param {?} d
         * @return {?}
         */
        (d) => this.legendFormat(d.value)));
        this.legend
            .on('mouseover focus', (/**
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (data, index, nodes) => {
            this.legendMouseOverFocus(data, index, nodes);
            this.pathMouseOver(data, index, nodes);
        }))
            .on('mouseout blur', (/**
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (data, index, nodes) => {
            this.legendMouseOutBlur(data, index, nodes);
            this.pathMouseOut(data, index, nodes);
        }))
            .on('click', (/**
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (data, index, nodes) => {
            this.clicked.emit(data);
        }));
        this.paths
            .on('mouseover', (/**
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (data, index, nodes) => {
            this.pathMouseOver(data, index, nodes);
            this.tooltipShow(this.chart.node(), data);
        }))
            .on('mousemove', (/**
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (data, index, nodes) => {
            this.tooltipMove(this.chart.node());
        }))
            .on('mouseout', (/**
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (data, index, nodes) => {
            this.pathMouseOut(data, index, nodes);
            this.tooltipHide();
        }))
            .on('click', (/**
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (data, index, nodes) => {
            this.pathClick(data, index, nodes);
        }));
        this.tooltip = this.chart
            .append('div')
            .style('opacity', 0)
            .attr('class', 'pbds-tooltip')
            .attr('aria-hidden', 'true');
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if ((changes.data && !changes.data.firstChange) || (changes.mono && !changes.mono.firstChange)) {
            // TODO: refactor to use update() function instead
            this.chart.selectAll('svg').remove();
            this.chart.selectAll('ul').remove();
            this.chart.selectAll('div').remove();
            this.ngOnInit();
        }
    }
}
PbdsDatavizPieComponent.decorators = [
    { type: Component, args: [{
                selector: 'pbds-dataviz-pie',
                template: ``
            }] }
];
/** @nocollapse */
PbdsDatavizPieComponent.ctorParameters = () => [
    { type: PbdsDatavizService },
    { type: ElementRef }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXZpei1waWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcGItZGVzaWduLXN5c3RlbS8iLCJzb3VyY2VzIjpbImxpYi9kYXRhdml6L2RhdGF2aXotcGllLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxLQUFLLEVBQ0wsVUFBVSxFQUNWLFdBQVcsRUFHWCxNQUFNLEVBQ04sWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFDTCxNQUFNLElBQUksU0FBUyxFQUNuQixZQUFZLElBQUksZUFBZSxFQUMvQixHQUFHLElBQUksTUFBTSxFQUNiLEdBQUcsSUFBSSxNQUFNLEVBQ2IsV0FBVyxJQUFJLGNBQWMsRUFDN0IsS0FBSyxJQUFJLFFBQVEsRUFDakIsTUFBTSxJQUFJLFNBQVMsRUFDcEIsTUFBTSxJQUFJLENBQUM7QUFFWixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQVF2RCxNQUFNLE9BQU8sdUJBQXVCOzs7OztJQXFEbEMsWUFBb0IsUUFBNEIsRUFBVSxRQUFvQjtRQUExRCxhQUFRLEdBQVIsUUFBUSxDQUFvQjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVk7UUFuRDlFLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFHbEIsYUFBUSxHQUFHLElBQUksQ0FBQztRQU1oQixVQUFLLEdBQUcsR0FBRyxDQUFDO1FBR1osU0FBSSxHQUFvQixLQUFLLENBQUM7UUFHOUIsU0FBSSxHQUFHLEtBQUssQ0FBQzs7UUFLYix3QkFBbUIsR0FBRyxFQUFFLENBQUM7O1FBS3pCLHVCQUFrQixHQUFHLEVBQUUsQ0FBQztRQUd4QixZQUFPLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFHM0QsWUFBTyxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBNkpuRCx5QkFBb0I7Ozs7OztRQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVB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Qjs7SUFJekIscURBQ3dCOztJQUV4QiwwQ0FDMkQ7O0lBRTNELDBDQUMyRDs7Ozs7SUFFM0QseUNBQWU7Ozs7O0lBQ2Ysd0NBQWM7Ozs7O0lBQ2QseUNBQWU7Ozs7O0lBQ2YseUNBQWU7Ozs7O0lBQ2YsNkNBQW1COzs7OztJQUNuQixzQ0FBWTs7Ozs7SUFDWiwwQ0FBZ0I7Ozs7O0lBQ2hCLHNDQUFZOzs7OztJQUNaLHNDQUFZOzs7OztJQUNaLHlDQUFlOzs7OztJQUNmLCtDQUFxQjs7Ozs7SUFDckIsOENBQW9COzs7OztJQUNwQiwyQ0FBaUI7Ozs7O0lBQ2pCLDhDQUFvQjs7Ozs7SUFDcEIsd0NBQWM7Ozs7O0lBQ2QsMENBQWdCOzs7OztJQUNoQixnREFBc0I7Ozs7O0lBMkl0Qix1REFLRTs7Ozs7SUFFRixxREFFRTs7Ozs7SUFFRixnREF3QkU7Ozs7O0lBRUYsK0NBc0JFOzs7OztJQUVGLDRDQUVFOzs7OztJQUVGLDhDQWFFOzs7OztJQUVGLDhDQUVFOzs7OztJQUVGLDhDQUVFOzs7OztJQUVGLHFEQUtFOzs7OztJQXRPVSwyQ0FBb0M7Ozs7O0lBQUUsMkNBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIElucHV0LFxuICBFbGVtZW50UmVmLFxuICBIb3N0QmluZGluZyxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtcbiAgc2VsZWN0IGFzIGQzX3NlbGVjdCxcbiAgc2NhbGVPcmRpbmFsIGFzIGQzX3NjYWxlT3JkaW5hbCxcbiAgcGllIGFzIGQzX3BpZSxcbiAgYXJjIGFzIGQzX2FyYyxcbiAgaW50ZXJwb2xhdGUgYXMgZDNfaW50ZXJwb2xhdGUsXG4gIG1vdXNlIGFzIGQzX21vdXNlLFxuICBmb3JtYXQgYXMgZDNfZm9ybWF0XG59IGZyb20gJ2QzJztcblxuaW1wb3J0IHsgUGJkc0RhdGF2aXpTZXJ2aWNlIH0gZnJvbSAnLi9kYXRhdml6LnNlcnZpY2UnO1xuaW1wb3J0IHsgUGJkc0RhdGF2aXpQaWUgfSBmcm9tICcuL2RhdGF2aXouaW50ZXJmYWNlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BiZHMtZGF0YXZpei1waWUnLFxuICB0ZW1wbGF0ZTogYGAsXG4gIHN0eWxlVXJsczogW11cbn0pXG5leHBvcnQgY2xhc3MgUGJkc0RhdGF2aXpQaWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MucGJkcy1jaGFydCcpXG4gIGNoYXJ0Q2xhc3MgPSB0cnVlO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MucGJkcy1jaGFydC1waWUnKVxuICBwaWVDbGFzcyA9IHRydWU7XG5cbiAgQElucHV0KClcbiAgZGF0YTogQXJyYXk8UGJkc0RhdGF2aXpQaWU+O1xuXG4gIEBJbnB1dCgpXG4gIHdpZHRoID0gMzAwO1xuXG4gIEBJbnB1dCgpXG4gIHR5cGU6ICdwaWUnIHwgJ2RvbnV0JyA9ICdwaWUnO1xuXG4gIEBJbnB1dCgpXG4gIG1vbm8gPSBmYWxzZTtcblxuICAvLyBUT0RPOiBkbyB3ZSBuZWVkIGEgdG9vbHRpcEZvcm1hdFR5cGU/XG5cbiAgQElucHV0KClcbiAgdG9vbHRpcEZvcm1hdFN0cmluZyA9ICcnO1xuXG4gIC8vIFRPRE86IGFkZCBpbnB1dCBmb3IgbGVnZW5kRm9ybWF0VHlwZT9cblxuICBASW5wdXQoKVxuICBsZWdlbmRGb3JtYXRTdHJpbmcgPSAnJztcblxuICBAT3V0cHV0KClcbiAgaG92ZXJlZDogRXZlbnRFbWl0dGVyPG9iamVjdD4gPSBuZXcgRXZlbnRFbWl0dGVyPG9iamVjdD4oKTtcblxuICBAT3V0cHV0KClcbiAgY2xpY2tlZDogRXZlbnRFbWl0dGVyPG9iamVjdD4gPSBuZXcgRXZlbnRFbWl0dGVyPG9iamVjdD4oKTtcblxuICBwcml2YXRlIGhlaWdodDtcbiAgcHJpdmF0ZSBjaGFydDtcbiAgcHJpdmF0ZSBtYXJnaW47XG4gIHByaXZhdGUgY29sb3JzO1xuICBwcml2YXRlIGNvbG9yUmFuZ2U7XG4gIHByaXZhdGUgYXJjO1xuICBwcml2YXRlIGFyY1pvb207XG4gIHByaXZhdGUgc3ZnO1xuICBwcml2YXRlIHBpZTtcbiAgcHJpdmF0ZSBsZWdlbmQ7XG4gIHByaXZhdGUgbGVnZW5kRm9ybWF0O1xuICBwcml2YXRlIGlubmVyUmFkaXVzO1xuICBwcml2YXRlIGFuZ2xlUGFkO1xuICBwcml2YXRlIG91dGVyUmFkaXVzO1xuICBwcml2YXRlIHBhdGhzO1xuICBwcml2YXRlIHRvb2x0aXA7XG4gIHByaXZhdGUgdG9vbHRpcEZvcm1hdDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9kYXRhdml6OiBQYmRzRGF0YXZpelNlcnZpY2UsIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5tYXJnaW4gPSB7IHRvcDogMTAsIHJpZ2h0OiAxMCwgYm90dG9tOiAxMCwgbGVmdDogMTAgfTtcbiAgICB0aGlzLndpZHRoID0gdGhpcy53aWR0aCAtIHRoaXMubWFyZ2luLmxlZnQgLSB0aGlzLm1hcmdpbi5yaWdodDtcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMud2lkdGggLSB0aGlzLm1hcmdpbi50b3AgLSB0aGlzLm1hcmdpbi5ib3R0b207XG4gICAgdGhpcy5jb2xvcnMgPSB0aGlzLl9kYXRhdml6LmdldENvbG9ycyh0aGlzLm1vbm8pO1xuICAgIHRoaXMuaW5uZXJSYWRpdXMgPSBNYXRoLm1pbih0aGlzLndpZHRoLCB0aGlzLmhlaWdodCkgLyAyLjU7XG4gICAgdGhpcy5vdXRlclJhZGl1cyA9IE1hdGgubWluKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KSAvIDI7XG4gICAgdGhpcy5hcmNab29tID0gMTA7XG4gICAgdGhpcy5hbmdsZVBhZCA9IDAuMDI7XG4gICAgdGhpcy5sZWdlbmRGb3JtYXQgPSBkM19mb3JtYXQodGhpcy5sZWdlbmRGb3JtYXRTdHJpbmcpO1xuICAgIHRoaXMudG9vbHRpcEZvcm1hdCA9IGQzX2Zvcm1hdCh0aGlzLnRvb2x0aXBGb3JtYXRTdHJpbmcpO1xuXG4gICAgdGhpcy5jb2xvclJhbmdlID0gZDNfc2NhbGVPcmRpbmFsKClcbiAgICAgIC5yYW5nZSh0aGlzLmNvbG9ycylcbiAgICAgIC5kb21haW4odGhpcy5kYXRhLm1hcChjID0+IGMubGFiZWwpKTtcblxuICAgIGlmICh0aGlzLnR5cGUgPT09ICdwaWUnKSB7XG4gICAgICB0aGlzLmlubmVyUmFkaXVzID0gMDtcbiAgICAgIHRoaXMuYW5nbGVQYWQgPSAwO1xuICAgIH1cblxuICAgIHRoaXMuY2hhcnQgPSBkM19zZWxlY3QodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50KS5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbiAgICB0aGlzLnN2ZyA9IHRoaXMuY2hhcnRcbiAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAuYXR0cignd2lkdGgnLCB0aGlzLndpZHRoKVxuICAgICAgLmF0dHIoJ2hlaWdodCcsIHRoaXMuaGVpZ2h0KVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2ltZy1mbHVpZCcpXG4gICAgICAuYXR0cigncHJlc2VydmVBc3BlY3RSYXRpbycsICd4TWluWU1pbiBtZWV0JylcbiAgICAgIC5hdHRyKFxuICAgICAgICAndmlld0JveCcsXG4gICAgICAgIGAtJHt0aGlzLndpZHRoIC8gMiArIHRoaXMubWFyZ2luLmxlZnR9IC0ke3RoaXMuaGVpZ2h0IC8gMiArIHRoaXMubWFyZ2luLnRvcH0gJHt0aGlzLndpZHRoICtcbiAgICAgICAgICB0aGlzLm1hcmdpbi5sZWZ0ICtcbiAgICAgICAgICB0aGlzLm1hcmdpbi5yaWdodH0gJHt0aGlzLmhlaWdodCArIHRoaXMubWFyZ2luLnRvcCArIHRoaXMubWFyZ2luLmJvdHRvbX1gXG4gICAgICApO1xuXG4gICAgdGhpcy5waWUgPSBkM19waWUoKVxuICAgICAgLnBhZEFuZ2xlKHRoaXMuYW5nbGVQYWQpXG4gICAgICAudmFsdWUoKGQ6IGFueSkgPT4gZC52YWx1ZSk7XG5cbiAgICB0aGlzLmFyYyA9IGQzX2FyYygpXG4gICAgICAucGFkUmFkaXVzKHRoaXMub3V0ZXJSYWRpdXMpXG4gICAgICAuaW5uZXJSYWRpdXModGhpcy5pbm5lclJhZGl1cyk7XG5cbiAgICB0aGlzLnBhdGhzID0gdGhpcy5zdmdcbiAgICAgIC5zZWxlY3RBbGwoJ3BhdGgnKVxuICAgICAgLmRhdGEodGhpcy5waWUodGhpcy5kYXRhKSlcbiAgICAgIC5lbnRlcigpXG4gICAgICAuYXBwZW5kKCdwYXRoJylcbiAgICAgIC5lYWNoKChkOiBhbnkpID0+IChkLm91dGVyUmFkaXVzID0gdGhpcy5vdXRlclJhZGl1cykpXG4gICAgICAuYXR0cignZCcsIHRoaXMuYXJjKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCAoZDogYW55KSA9PiB0aGlzLmNvbG9yUmFuZ2UoZC5kYXRhLmxhYmVsKSlcbiAgICAgIC5hdHRyKCdjbGFzcycsICdzbGljZScpO1xuXG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ3BpZScpIHtcbiAgICAgIHRoaXMucGF0aHNcbiAgICAgICAgLnN0eWxlKCdzdHJva2UnLCAnI2ZmZicpXG4gICAgICAgIC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgMilcbiAgICAgICAgLnN0eWxlKCdzdHJva2UtYWxpZ25tZW50JywgJ2lubmVyJyk7XG4gICAgfVxuXG4gICAgdGhpcy5sZWdlbmQgPSB0aGlzLmNoYXJ0XG4gICAgICAuYXBwZW5kKCd1bCcpXG4gICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kIGxlZ2VuZC1yaWdodCcpXG4gICAgICAuc2VsZWN0QWxsKCdsaScpXG4gICAgICAuZGF0YSh0aGlzLmRhdGEpXG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZCgnbGknKVxuICAgICAgLmF0dHIoJ3RhYmluZGV4JywgMClcbiAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQtaXRlbScpO1xuXG4gICAgdGhpcy5sZWdlbmRcbiAgICAgIC5hcHBlbmQoJ3NwYW4nKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xlZ2VuZC1rZXknKVxuICAgICAgLnN0eWxlKCdiYWNrZ3JvdW5kLWNvbG9yJywgKGQ6IGFueSkgPT4gdGhpcy5jb2xvclJhbmdlKGQubGFiZWwpKTtcblxuICAgIGxldCBsZWdlbmREZXNjcmlwdGlvbiA9IHRoaXMubGVnZW5kLmFwcGVuZCgnc3BhbicpLmF0dHIoJ2NsYXNzJywgJ2xlZ2VuZC1kZXNjcmlwdGlvbicpO1xuXG4gICAgbGVnZW5kRGVzY3JpcHRpb25cbiAgICAgIC5hcHBlbmQoJ3NwYW4nKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xlZ2VuZC1sYWJlbCcpXG4gICAgICAuaHRtbCgoZDogYW55KSA9PiBkLmxhYmVsKTtcblxuICAgIGxlZ2VuZERlc2NyaXB0aW9uXG4gICAgICAuYXBwZW5kKCdzcGFuJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQtdmFsdWUnKVxuICAgICAgLmh0bWwoKGQ6IGFueSkgPT4gdGhpcy5sZWdlbmRGb3JtYXQoZC52YWx1ZSkpO1xuXG4gICAgdGhpcy5sZWdlbmRcbiAgICAgIC5vbignbW91c2VvdmVyIGZvY3VzJywgKGRhdGEsIGluZGV4LCBub2RlcykgPT4ge1xuICAgICAgICB0aGlzLmxlZ2VuZE1vdXNlT3ZlckZvY3VzKGRhdGEsIGluZGV4LCBub2Rlcyk7XG4gICAgICAgIHRoaXMucGF0aE1vdXNlT3ZlcihkYXRhLCBpbmRleCwgbm9kZXMpO1xuICAgICAgfSlcbiAgICAgIC5vbignbW91c2VvdXQgYmx1cicsIChkYXRhLCBpbmRleCwgbm9kZXMpID0+IHtcbiAgICAgICAgdGhpcy5sZWdlbmRNb3VzZU91dEJsdXIoZGF0YSwgaW5kZXgsIG5vZGVzKTtcbiAgICAgICAgdGhpcy5wYXRoTW91c2VPdXQoZGF0YSwgaW5kZXgsIG5vZGVzKTtcbiAgICAgIH0pXG4gICAgICAub24oJ2NsaWNrJywgKGRhdGEsIGluZGV4LCBub2RlcykgPT4ge1xuICAgICAgICB0aGlzLmNsaWNrZWQuZW1pdChkYXRhKTtcbiAgICAgIH0pO1xuXG4gICAgdGhpcy5wYXRoc1xuICAgICAgLm9uKCdtb3VzZW92ZXInLCAoZGF0YSwgaW5kZXgsIG5vZGVzKSA9PiB7XG4gICAgICAgIHRoaXMucGF0aE1vdXNlT3ZlcihkYXRhLCBpbmRleCwgbm9kZXMpO1xuICAgICAgICB0aGlzLnRvb2x0aXBTaG93KHRoaXMuY2hhcnQubm9kZSgpLCBkYXRhKTtcbiAgICAgIH0pXG4gICAgICAub24oJ21vdXNlbW92ZScsIChkYXRhLCBpbmRleCwgbm9kZXMpID0+IHtcbiAgICAgICAgdGhpcy50b29sdGlwTW92ZSh0aGlzLmNoYXJ0Lm5vZGUoKSk7XG4gICAgICB9KVxuICAgICAgLm9uKCdtb3VzZW91dCcsIChkYXRhLCBpbmRleCwgbm9kZXMpID0+IHtcbiAgICAgICAgdGhpcy5wYXRoTW91c2VPdXQoZGF0YSwgaW5kZXgsIG5vZGVzKTtcbiAgICAgICAgdGhpcy50b29sdGlwSGlkZSgpO1xuICAgICAgfSlcbiAgICAgIC5vbignY2xpY2snLCAoZGF0YSwgaW5kZXgsIG5vZGVzKSA9PiB7XG4gICAgICAgIHRoaXMucGF0aENsaWNrKGRhdGEsIGluZGV4LCBub2Rlcyk7XG4gICAgICB9KTtcblxuICAgIHRoaXMudG9vbHRpcCA9IHRoaXMuY2hhcnRcbiAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAuc3R5bGUoJ29wYWNpdHknLCAwKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BiZHMtdG9vbHRpcCcpXG4gICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICgoY2hhbmdlcy5kYXRhICYmICFjaGFuZ2VzLmRhdGEuZmlyc3RDaGFuZ2UpIHx8IChjaGFuZ2VzLm1vbm8gJiYgIWNoYW5nZXMubW9uby5maXJzdENoYW5nZSkpIHtcbiAgICAgIC8vIFRPRE86IHJlZmFjdG9yIHRvIHVzZSB1cGRhdGUoKSBmdW5jdGlvbiBpbnN0ZWFkXG4gICAgICB0aGlzLmNoYXJ0LnNlbGVjdEFsbCgnc3ZnJykucmVtb3ZlKCk7XG4gICAgICB0aGlzLmNoYXJ0LnNlbGVjdEFsbCgndWwnKS5yZW1vdmUoKTtcbiAgICAgIHRoaXMuY2hhcnQuc2VsZWN0QWxsKCdkaXYnKS5yZW1vdmUoKTtcblxuICAgICAgdGhpcy5uZ09uSW5pdCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbGVnZW5kTW91c2VPdmVyRm9jdXMgPSAoZGF0YSwgaW5kZXgsIG5vZGVzKSA9PiB7XG4gICAgdGhpcy5jaGFydFxuICAgICAgLnNlbGVjdEFsbCgnLmxlZ2VuZC1pdGVtJylcbiAgICAgIC5maWx0ZXIoKGQsIGkpID0+IGkgIT09IGluZGV4KVxuICAgICAgLmNsYXNzZWQoJ2luYWN0aXZlJywgdHJ1ZSk7XG4gIH07XG5cbiAgcHJpdmF0ZSBsZWdlbmRNb3VzZU91dEJsdXIgPSAoZGF0YSwgaW5kZXgsIG5vZGVzKSA9PiB7XG4gICAgdGhpcy5jaGFydC5zZWxlY3RBbGwoJy5sZWdlbmQtaXRlbScpLmNsYXNzZWQoJ2luYWN0aXZlJywgZmFsc2UpO1xuICB9O1xuXG4gIHByaXZhdGUgcGF0aE1vdXNlT3ZlciA9IChkYXRhLCBpbmRleCwgbm9kZXMpID0+IHtcbiAgICBsZXQgc2xpY2VzID0gdGhpcy5jaGFydC5zZWxlY3RBbGwoJy5zbGljZScpO1xuICAgIGxldCBzbGljZSA9IHNsaWNlcy5maWx0ZXIoKGQsIGkpID0+IGkgPT09IGluZGV4KTtcblxuICAgIHRoaXMuY2hhcnRcbiAgICAgIC5zZWxlY3RBbGwoJy5sZWdlbmQtaXRlbScpXG4gICAgICAuZmlsdGVyKChkLCBpKSA9PiBpICE9PSBpbmRleClcbiAgICAgIC5jbGFzc2VkKCdpbmFjdGl2ZScsIHRydWUpO1xuXG4gICAgc2xpY2VzLmZpbHRlcigoZCwgaSkgPT4gaSAhPT0gaW5kZXgpLmNsYXNzZWQoJ2luYWN0aXZlJywgdHJ1ZSk7XG5cbiAgICBzbGljZVxuICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgLmR1cmF0aW9uKDMwMClcbiAgICAgIC5kZWxheSgwKVxuICAgICAgLmF0dHJUd2VlbignZCcsIChkOiBhbnkpID0+IHtcbiAgICAgICAgbGV0IGkgPSBkM19pbnRlcnBvbGF0ZShkLm91dGVyUmFkaXVzLCB0aGlzLm91dGVyUmFkaXVzICsgdGhpcy5hcmNab29tKTtcbiAgICAgICAgcmV0dXJuIHQgPT4ge1xuICAgICAgICAgIGQub3V0ZXJSYWRpdXMgPSBpKHQpO1xuICAgICAgICAgIHJldHVybiB0aGlzLmFyYyhkKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgdGhpcy5ob3ZlcmVkLmVtaXQoZGF0YS5kYXRhID8gZGF0YS5kYXRhIDogZGF0YSk7IC8vIGxlZ2VuZCBob3ZlciBkYXRhIGlzIGRpZmZlcmVudCB0aGFuIHNsaWNlIGhvdmVyIGRhdGFcbiAgfTtcblxuICBwcml2YXRlIHBhdGhNb3VzZU91dCA9IChkYXRhLCBpbmRleCwgdmFsdWUpID0+IHtcbiAgICBsZXQgc2xpY2VzID0gdGhpcy5jaGFydC5zZWxlY3RBbGwoJy5zbGljZScpO1xuICAgIGxldCBzbGljZSA9IHNsaWNlcy5maWx0ZXIoKGQsIGkpID0+IGkgPT09IGluZGV4KTtcblxuICAgIHRoaXMuY2hhcnRcbiAgICAgIC5zZWxlY3RBbGwoJy5sZWdlbmQtaXRlbScpXG4gICAgICAuZmlsdGVyKChkLCBpKSA9PiBpICE9PSBpbmRleClcbiAgICAgIC5jbGFzc2VkKCdpbmFjdGl2ZScsIGZhbHNlKTtcblxuICAgIHNsaWNlcy5jbGFzc2VkKCdpbmFjdGl2ZScsIGZhbHNlKTtcblxuICAgIHNsaWNlXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZHVyYXRpb24oMzAwKVxuICAgICAgLmRlbGF5KDApXG4gICAgICAuYXR0clR3ZWVuKCdkJywgKGQ6IGFueSkgPT4ge1xuICAgICAgICBsZXQgaSA9IGQzX2ludGVycG9sYXRlKGQub3V0ZXJSYWRpdXMsIHRoaXMub3V0ZXJSYWRpdXMpO1xuICAgICAgICByZXR1cm4gdCA9PiB7XG4gICAgICAgICAgZC5vdXRlclJhZGl1cyA9IGkodCk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuYXJjKGQpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gIH07XG5cbiAgcHJpdmF0ZSBwYXRoQ2xpY2sgPSAoZGF0YSwgaW5kZXgsIG5vZGVzKSA9PiB7XG4gICAgdGhpcy5jbGlja2VkLmVtaXQoZGF0YS5kYXRhKTtcbiAgfTtcblxuICBwcml2YXRlIHRvb2x0aXBTaG93ID0gKG5vZGUsIGRhdGEpID0+IHtcbiAgICB0aGlzLnRvb2x0aXBTZXRQb3NpdGlvbihub2RlKTtcblxuICAgIGxldCBwZXJjZW50YWdlID0gKGRhdGEuZW5kQW5nbGUgLSBkYXRhLnN0YXJ0QW5nbGUpIC8gKDIgKiBNYXRoLlBJKTtcblxuICAgIHRoaXMudG9vbHRpcC5odG1sKFxuICAgICAgYFxuICAgICAgICA8ZGl2IGNsYXNzPVwidG9vbHRpcC1sYWJlbFwiPiR7ZGF0YS5kYXRhLmxhYmVsfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidG9vbHRpcC12YWx1ZVwiPiR7dGhpcy50b29sdGlwRm9ybWF0KHBlcmNlbnRhZ2UpfTwvZGl2PlxuICAgICAgYFxuICAgICk7XG5cbiAgICB0aGlzLnRvb2x0aXAuc3R5bGUoJ29wYWNpdHknLCAxKTtcbiAgfTtcblxuICBwcml2YXRlIHRvb2x0aXBNb3ZlID0gbm9kZSA9PiB7XG4gICAgdGhpcy50b29sdGlwU2V0UG9zaXRpb24obm9kZSk7XG4gIH07XG5cbiAgcHJpdmF0ZSB0b29sdGlwSGlkZSA9ICgpID0+IHtcbiAgICB0aGlzLnRvb2x0aXAuc3R5bGUoJ29wYWNpdHknLCAwKTtcbiAgfTtcblxuICBwcml2YXRlIHRvb2x0aXBTZXRQb3NpdGlvbiA9IG5vZGUgPT4ge1xuICAgIGxldCBjb29yZGluYXRlcyA9IGQzX21vdXNlKG5vZGUpO1xuXG4gICAgdGhpcy50b29sdGlwLnN0eWxlKCdsZWZ0JywgYCR7Y29vcmRpbmF0ZXNbMF0gKyAxNn1weGApO1xuICAgIHRoaXMudG9vbHRpcC5zdHlsZSgndG9wJywgYCR7Y29vcmRpbmF0ZXNbMV0gKyAxNn1weGApO1xuICB9O1xufVxuIl19