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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXZpei1waWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcGItZGVzaWduLXN5c3RlbS8iLCJzb3VyY2VzIjpbImxpYi9kYXRhdml6L2RhdGF2aXotcGllLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxLQUFLLEVBQ0wsVUFBVSxFQUNWLFdBQVcsRUFHWCxNQUFNLEVBQ04sWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFDTCxNQUFNLElBQUksU0FBUyxFQUNuQixZQUFZLElBQUksZUFBZSxFQUMvQixHQUFHLElBQUksTUFBTSxFQUNiLEdBQUcsSUFBSSxNQUFNLEVBQ2IsV0FBVyxJQUFJLGNBQWMsRUFDN0IsS0FBSyxJQUFJLFFBQVEsRUFDakIsTUFBTSxJQUFJLFNBQVMsRUFDcEIsTUFBTSxJQUFJLENBQUM7QUFFWixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQVF2RCxNQUFNLE9BQU8sdUJBQXVCOzs7OztJQXFEbEMsWUFBb0IsUUFBNEIsRUFBVSxRQUFvQjtRQUExRCxhQUFRLEdBQVIsUUFBUSxDQUFvQjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVk7UUFuRDlFLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFHbEIsYUFBUSxHQUFHLElBQUksQ0FBQztRQU1oQixVQUFLLEdBQUcsR0FBRyxDQUFDO1FBR1osU0FBSSxHQUFvQixLQUFLLENBQUM7UUFHOUIsU0FBSSxHQUFHLEtBQUssQ0FBQzs7UUFLYix3QkFBbUIsR0FBRyxFQUFFLENBQUM7O1FBS3pCLHVCQUFrQixHQUFHLEVBQUUsQ0FBQztRQUd4QixZQUFPLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFHM0QsWUFBTyxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBNkpuRCx5QkFBb0I7Ozs7OztRQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVB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Qjs7SUFJekIscURBQ3dCOztJQUV4QiwwQ0FDMkQ7O0lBRTNELDBDQUMyRDs7Ozs7SUFFM0QseUNBQWU7Ozs7O0lBQ2Ysd0NBQWM7Ozs7O0lBQ2QseUNBQWU7Ozs7O0lBQ2YseUNBQWU7Ozs7O0lBQ2YsNkNBQW1COzs7OztJQUNuQixzQ0FBWTs7Ozs7SUFDWiwwQ0FBZ0I7Ozs7O0lBQ2hCLHNDQUFZOzs7OztJQUNaLHNDQUFZOzs7OztJQUNaLHlDQUFlOzs7OztJQUNmLCtDQUFxQjs7Ozs7SUFDckIsOENBQW9COzs7OztJQUNwQiwyQ0FBaUI7Ozs7O0lBQ2pCLDhDQUFvQjs7Ozs7SUFDcEIsd0NBQWM7Ozs7O0lBQ2QsMENBQWdCOzs7OztJQUNoQixnREFBc0I7Ozs7O0lBMkl0Qix1REFLRTs7Ozs7SUFFRixxREFFRTs7Ozs7SUFFRixnREF3QkU7Ozs7O0lBRUYsK0NBc0JFOzs7OztJQUVGLDRDQUVFOzs7OztJQUVGLDhDQWFFOzs7OztJQUVGLDhDQUVFOzs7OztJQUVGLDhDQUVFOzs7OztJQUVGLHFEQUtFOzs7OztJQXRPVSwyQ0FBb0M7Ozs7O0lBQUUsMkNBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIElucHV0LFxuICBFbGVtZW50UmVmLFxuICBIb3N0QmluZGluZyxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtcbiAgc2VsZWN0IGFzIGQzX3NlbGVjdCxcbiAgc2NhbGVPcmRpbmFsIGFzIGQzX3NjYWxlT3JkaW5hbCxcbiAgcGllIGFzIGQzX3BpZSxcbiAgYXJjIGFzIGQzX2FyYyxcbiAgaW50ZXJwb2xhdGUgYXMgZDNfaW50ZXJwb2xhdGUsXG4gIG1vdXNlIGFzIGQzX21vdXNlLFxuICBmb3JtYXQgYXMgZDNfZm9ybWF0XG59IGZyb20gJ2QzJztcblxuaW1wb3J0IHsgUGJkc0RhdGF2aXpTZXJ2aWNlIH0gZnJvbSAnLi9kYXRhdml6LnNlcnZpY2UnO1xuaW1wb3J0IHsgSVBiZHNEYXRhdml6UGllIH0gZnJvbSAnLi9kYXRhdml6LmludGVyZmFjZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYmRzLWRhdGF2aXotcGllJyxcbiAgdGVtcGxhdGU6IGBgLFxuICBzdHlsZVVybHM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIFBiZHNEYXRhdml6UGllQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnBiZHMtY2hhcnQnKVxuICBjaGFydENsYXNzID0gdHJ1ZTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnBiZHMtY2hhcnQtcGllJylcbiAgcGllQ2xhc3MgPSB0cnVlO1xuXG4gIEBJbnB1dCgpXG4gIGRhdGE6IEFycmF5PElQYmRzRGF0YXZpelBpZT47XG5cbiAgQElucHV0KClcbiAgd2lkdGggPSAzMDA7XG5cbiAgQElucHV0KClcbiAgdHlwZTogJ3BpZScgfCAnZG9udXQnID0gJ3BpZSc7XG5cbiAgQElucHV0KClcbiAgbW9ubyA9IGZhbHNlO1xuXG4gIC8vIFRPRE86IGRvIHdlIG5lZWQgYSB0b29sdGlwRm9ybWF0VHlwZT9cblxuICBASW5wdXQoKVxuICB0b29sdGlwRm9ybWF0U3RyaW5nID0gJyc7XG5cbiAgLy8gVE9ETzogYWRkIGlucHV0IGZvciBsZWdlbmRGb3JtYXRUeXBlP1xuXG4gIEBJbnB1dCgpXG4gIGxlZ2VuZEZvcm1hdFN0cmluZyA9ICcnO1xuXG4gIEBPdXRwdXQoKVxuICBob3ZlcmVkOiBFdmVudEVtaXR0ZXI8b2JqZWN0PiA9IG5ldyBFdmVudEVtaXR0ZXI8b2JqZWN0PigpO1xuXG4gIEBPdXRwdXQoKVxuICBjbGlja2VkOiBFdmVudEVtaXR0ZXI8b2JqZWN0PiA9IG5ldyBFdmVudEVtaXR0ZXI8b2JqZWN0PigpO1xuXG4gIHByaXZhdGUgaGVpZ2h0O1xuICBwcml2YXRlIGNoYXJ0O1xuICBwcml2YXRlIG1hcmdpbjtcbiAgcHJpdmF0ZSBjb2xvcnM7XG4gIHByaXZhdGUgY29sb3JSYW5nZTtcbiAgcHJpdmF0ZSBhcmM7XG4gIHByaXZhdGUgYXJjWm9vbTtcbiAgcHJpdmF0ZSBzdmc7XG4gIHByaXZhdGUgcGllO1xuICBwcml2YXRlIGxlZ2VuZDtcbiAgcHJpdmF0ZSBsZWdlbmRGb3JtYXQ7XG4gIHByaXZhdGUgaW5uZXJSYWRpdXM7XG4gIHByaXZhdGUgYW5nbGVQYWQ7XG4gIHByaXZhdGUgb3V0ZXJSYWRpdXM7XG4gIHByaXZhdGUgcGF0aHM7XG4gIHByaXZhdGUgdG9vbHRpcDtcbiAgcHJpdmF0ZSB0b29sdGlwRm9ybWF0O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2RhdGF2aXo6IFBiZHNEYXRhdml6U2VydmljZSwgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm1hcmdpbiA9IHsgdG9wOiAxMCwgcmlnaHQ6IDEwLCBib3R0b206IDEwLCBsZWZ0OiAxMCB9O1xuICAgIHRoaXMud2lkdGggPSB0aGlzLndpZHRoIC0gdGhpcy5tYXJnaW4ubGVmdCAtIHRoaXMubWFyZ2luLnJpZ2h0O1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy53aWR0aCAtIHRoaXMubWFyZ2luLnRvcCAtIHRoaXMubWFyZ2luLmJvdHRvbTtcbiAgICB0aGlzLmNvbG9ycyA9IHRoaXMuX2RhdGF2aXouZ2V0Q29sb3JzKHRoaXMubW9ubyk7XG4gICAgdGhpcy5pbm5lclJhZGl1cyA9IE1hdGgubWluKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KSAvIDIuNTtcbiAgICB0aGlzLm91dGVyUmFkaXVzID0gTWF0aC5taW4odGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpIC8gMjtcbiAgICB0aGlzLmFyY1pvb20gPSAxMDtcbiAgICB0aGlzLmFuZ2xlUGFkID0gMC4wMjtcbiAgICB0aGlzLmxlZ2VuZEZvcm1hdCA9IGQzX2Zvcm1hdCh0aGlzLmxlZ2VuZEZvcm1hdFN0cmluZyk7XG4gICAgdGhpcy50b29sdGlwRm9ybWF0ID0gZDNfZm9ybWF0KHRoaXMudG9vbHRpcEZvcm1hdFN0cmluZyk7XG5cbiAgICB0aGlzLmNvbG9yUmFuZ2UgPSBkM19zY2FsZU9yZGluYWwoKVxuICAgICAgLnJhbmdlKHRoaXMuY29sb3JzKVxuICAgICAgLmRvbWFpbih0aGlzLmRhdGEubWFwKGMgPT4gYy5sYWJlbCkpO1xuXG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ3BpZScpIHtcbiAgICAgIHRoaXMuaW5uZXJSYWRpdXMgPSAwO1xuICAgICAgdGhpcy5hbmdsZVBhZCA9IDA7XG4gICAgfVxuXG4gICAgdGhpcy5jaGFydCA9IGQzX3NlbGVjdCh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuICAgIHRoaXMuc3ZnID0gdGhpcy5jaGFydFxuICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgIC5hdHRyKCd3aWR0aCcsIHRoaXMud2lkdGgpXG4gICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy5oZWlnaHQpXG4gICAgICAuYXR0cignY2xhc3MnLCAnaW1nLWZsdWlkJylcbiAgICAgIC5hdHRyKCdwcmVzZXJ2ZUFzcGVjdFJhdGlvJywgJ3hNaW5ZTWluIG1lZXQnKVxuICAgICAgLmF0dHIoXG4gICAgICAgICd2aWV3Qm94JyxcbiAgICAgICAgYC0ke3RoaXMud2lkdGggLyAyICsgdGhpcy5tYXJnaW4ubGVmdH0gLSR7dGhpcy5oZWlnaHQgLyAyICsgdGhpcy5tYXJnaW4udG9wfSAke3RoaXMud2lkdGggK1xuICAgICAgICAgIHRoaXMubWFyZ2luLmxlZnQgK1xuICAgICAgICAgIHRoaXMubWFyZ2luLnJpZ2h0fSAke3RoaXMuaGVpZ2h0ICsgdGhpcy5tYXJnaW4udG9wICsgdGhpcy5tYXJnaW4uYm90dG9tfWBcbiAgICAgICk7XG5cbiAgICB0aGlzLnBpZSA9IGQzX3BpZSgpXG4gICAgICAucGFkQW5nbGUodGhpcy5hbmdsZVBhZClcbiAgICAgIC52YWx1ZSgoZDogYW55KSA9PiBkLnZhbHVlKTtcblxuICAgIHRoaXMuYXJjID0gZDNfYXJjKClcbiAgICAgIC5wYWRSYWRpdXModGhpcy5vdXRlclJhZGl1cylcbiAgICAgIC5pbm5lclJhZGl1cyh0aGlzLmlubmVyUmFkaXVzKTtcblxuICAgIHRoaXMucGF0aHMgPSB0aGlzLnN2Z1xuICAgICAgLnNlbGVjdEFsbCgncGF0aCcpXG4gICAgICAuZGF0YSh0aGlzLnBpZSh0aGlzLmRhdGEpKVxuICAgICAgLmVudGVyKClcbiAgICAgIC5hcHBlbmQoJ3BhdGgnKVxuICAgICAgLmVhY2goKGQ6IGFueSkgPT4gKGQub3V0ZXJSYWRpdXMgPSB0aGlzLm91dGVyUmFkaXVzKSlcbiAgICAgIC5hdHRyKCdkJywgdGhpcy5hcmMpXG4gICAgICAuYXR0cignZmlsbCcsIChkOiBhbnkpID0+IHRoaXMuY29sb3JSYW5nZShkLmRhdGEubGFiZWwpKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ3NsaWNlJyk7XG5cbiAgICBpZiAodGhpcy50eXBlID09PSAncGllJykge1xuICAgICAgdGhpcy5wYXRoc1xuICAgICAgICAuc3R5bGUoJ3N0cm9rZScsICcjZmZmJylcbiAgICAgICAgLnN0eWxlKCdzdHJva2Utd2lkdGgnLCAyKVxuICAgICAgICAuc3R5bGUoJ3N0cm9rZS1hbGlnbm1lbnQnLCAnaW5uZXInKTtcbiAgICB9XG5cbiAgICB0aGlzLmxlZ2VuZCA9IHRoaXMuY2hhcnRcbiAgICAgIC5hcHBlbmQoJ3VsJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQgbGVnZW5kLXJpZ2h0JylcbiAgICAgIC5zZWxlY3RBbGwoJ2xpJylcbiAgICAgIC5kYXRhKHRoaXMuZGF0YSlcbiAgICAgIC5lbnRlcigpXG4gICAgICAuYXBwZW5kKCdsaScpXG4gICAgICAuYXR0cigndGFiaW5kZXgnLCAwKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xlZ2VuZC1pdGVtJyk7XG5cbiAgICB0aGlzLmxlZ2VuZFxuICAgICAgLmFwcGVuZCgnc3BhbicpXG4gICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kLWtleScpXG4gICAgICAuc3R5bGUoJ2JhY2tncm91bmQtY29sb3InLCAoZDogYW55KSA9PiB0aGlzLmNvbG9yUmFuZ2UoZC5sYWJlbCkpO1xuXG4gICAgbGV0IGxlZ2VuZERlc2NyaXB0aW9uID0gdGhpcy5sZWdlbmQuYXBwZW5kKCdzcGFuJykuYXR0cignY2xhc3MnLCAnbGVnZW5kLWRlc2NyaXB0aW9uJyk7XG5cbiAgICBsZWdlbmREZXNjcmlwdGlvblxuICAgICAgLmFwcGVuZCgnc3BhbicpXG4gICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kLWxhYmVsJylcbiAgICAgIC5odG1sKChkOiBhbnkpID0+IGQubGFiZWwpO1xuXG4gICAgbGVnZW5kRGVzY3JpcHRpb25cbiAgICAgIC5hcHBlbmQoJ3NwYW4nKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xlZ2VuZC12YWx1ZScpXG4gICAgICAuaHRtbCgoZDogYW55KSA9PiB0aGlzLmxlZ2VuZEZvcm1hdChkLnZhbHVlKSk7XG5cbiAgICB0aGlzLmxlZ2VuZFxuICAgICAgLm9uKCdtb3VzZW92ZXIgZm9jdXMnLCAoZGF0YSwgaW5kZXgsIG5vZGVzKSA9PiB7XG4gICAgICAgIHRoaXMubGVnZW5kTW91c2VPdmVyRm9jdXMoZGF0YSwgaW5kZXgsIG5vZGVzKTtcbiAgICAgICAgdGhpcy5wYXRoTW91c2VPdmVyKGRhdGEsIGluZGV4LCBub2Rlcyk7XG4gICAgICB9KVxuICAgICAgLm9uKCdtb3VzZW91dCBibHVyJywgKGRhdGEsIGluZGV4LCBub2RlcykgPT4ge1xuICAgICAgICB0aGlzLmxlZ2VuZE1vdXNlT3V0Qmx1cihkYXRhLCBpbmRleCwgbm9kZXMpO1xuICAgICAgICB0aGlzLnBhdGhNb3VzZU91dChkYXRhLCBpbmRleCwgbm9kZXMpO1xuICAgICAgfSlcbiAgICAgIC5vbignY2xpY2snLCAoZGF0YSwgaW5kZXgsIG5vZGVzKSA9PiB7XG4gICAgICAgIHRoaXMuY2xpY2tlZC5lbWl0KGRhdGEpO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLnBhdGhzXG4gICAgICAub24oJ21vdXNlb3ZlcicsIChkYXRhLCBpbmRleCwgbm9kZXMpID0+IHtcbiAgICAgICAgdGhpcy5wYXRoTW91c2VPdmVyKGRhdGEsIGluZGV4LCBub2Rlcyk7XG4gICAgICAgIHRoaXMudG9vbHRpcFNob3codGhpcy5jaGFydC5ub2RlKCksIGRhdGEpO1xuICAgICAgfSlcbiAgICAgIC5vbignbW91c2Vtb3ZlJywgKGRhdGEsIGluZGV4LCBub2RlcykgPT4ge1xuICAgICAgICB0aGlzLnRvb2x0aXBNb3ZlKHRoaXMuY2hhcnQubm9kZSgpKTtcbiAgICAgIH0pXG4gICAgICAub24oJ21vdXNlb3V0JywgKGRhdGEsIGluZGV4LCBub2RlcykgPT4ge1xuICAgICAgICB0aGlzLnBhdGhNb3VzZU91dChkYXRhLCBpbmRleCwgbm9kZXMpO1xuICAgICAgICB0aGlzLnRvb2x0aXBIaWRlKCk7XG4gICAgICB9KVxuICAgICAgLm9uKCdjbGljaycsIChkYXRhLCBpbmRleCwgbm9kZXMpID0+IHtcbiAgICAgICAgdGhpcy5wYXRoQ2xpY2soZGF0YSwgaW5kZXgsIG5vZGVzKTtcbiAgICAgIH0pO1xuXG4gICAgdGhpcy50b29sdGlwID0gdGhpcy5jaGFydFxuICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDApXG4gICAgICAuYXR0cignY2xhc3MnLCAncGJkcy10b29sdGlwJylcbiAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKChjaGFuZ2VzLmRhdGEgJiYgIWNoYW5nZXMuZGF0YS5maXJzdENoYW5nZSkgfHwgKGNoYW5nZXMubW9ubyAmJiAhY2hhbmdlcy5tb25vLmZpcnN0Q2hhbmdlKSkge1xuICAgICAgLy8gVE9ETzogcmVmYWN0b3IgdG8gdXNlIHVwZGF0ZSgpIGZ1bmN0aW9uIGluc3RlYWRcbiAgICAgIHRoaXMuY2hhcnQuc2VsZWN0QWxsKCdzdmcnKS5yZW1vdmUoKTtcbiAgICAgIHRoaXMuY2hhcnQuc2VsZWN0QWxsKCd1bCcpLnJlbW92ZSgpO1xuICAgICAgdGhpcy5jaGFydC5zZWxlY3RBbGwoJ2RpdicpLnJlbW92ZSgpO1xuXG4gICAgICB0aGlzLm5nT25Jbml0KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBsZWdlbmRNb3VzZU92ZXJGb2N1cyA9IChkYXRhLCBpbmRleCwgbm9kZXMpID0+IHtcbiAgICB0aGlzLmNoYXJ0XG4gICAgICAuc2VsZWN0QWxsKCcubGVnZW5kLWl0ZW0nKVxuICAgICAgLmZpbHRlcigoZCwgaSkgPT4gaSAhPT0gaW5kZXgpXG4gICAgICAuY2xhc3NlZCgnaW5hY3RpdmUnLCB0cnVlKTtcbiAgfTtcblxuICBwcml2YXRlIGxlZ2VuZE1vdXNlT3V0Qmx1ciA9IChkYXRhLCBpbmRleCwgbm9kZXMpID0+IHtcbiAgICB0aGlzLmNoYXJ0LnNlbGVjdEFsbCgnLmxlZ2VuZC1pdGVtJykuY2xhc3NlZCgnaW5hY3RpdmUnLCBmYWxzZSk7XG4gIH07XG5cbiAgcHJpdmF0ZSBwYXRoTW91c2VPdmVyID0gKGRhdGEsIGluZGV4LCBub2RlcykgPT4ge1xuICAgIGxldCBzbGljZXMgPSB0aGlzLmNoYXJ0LnNlbGVjdEFsbCgnLnNsaWNlJyk7XG4gICAgbGV0IHNsaWNlID0gc2xpY2VzLmZpbHRlcigoZCwgaSkgPT4gaSA9PT0gaW5kZXgpO1xuXG4gICAgdGhpcy5jaGFydFxuICAgICAgLnNlbGVjdEFsbCgnLmxlZ2VuZC1pdGVtJylcbiAgICAgIC5maWx0ZXIoKGQsIGkpID0+IGkgIT09IGluZGV4KVxuICAgICAgLmNsYXNzZWQoJ2luYWN0aXZlJywgdHJ1ZSk7XG5cbiAgICBzbGljZXMuZmlsdGVyKChkLCBpKSA9PiBpICE9PSBpbmRleCkuY2xhc3NlZCgnaW5hY3RpdmUnLCB0cnVlKTtcblxuICAgIHNsaWNlXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZHVyYXRpb24oMzAwKVxuICAgICAgLmRlbGF5KDApXG4gICAgICAuYXR0clR3ZWVuKCdkJywgKGQ6IGFueSkgPT4ge1xuICAgICAgICBsZXQgaSA9IGQzX2ludGVycG9sYXRlKGQub3V0ZXJSYWRpdXMsIHRoaXMub3V0ZXJSYWRpdXMgKyB0aGlzLmFyY1pvb20pO1xuICAgICAgICByZXR1cm4gdCA9PiB7XG4gICAgICAgICAgZC5vdXRlclJhZGl1cyA9IGkodCk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuYXJjKGQpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICB0aGlzLmhvdmVyZWQuZW1pdChkYXRhLmRhdGEgPyBkYXRhLmRhdGEgOiBkYXRhKTsgLy8gbGVnZW5kIGhvdmVyIGRhdGEgaXMgZGlmZmVyZW50IHRoYW4gc2xpY2UgaG92ZXIgZGF0YVxuICB9O1xuXG4gIHByaXZhdGUgcGF0aE1vdXNlT3V0ID0gKGRhdGEsIGluZGV4LCB2YWx1ZSkgPT4ge1xuICAgIGxldCBzbGljZXMgPSB0aGlzLmNoYXJ0LnNlbGVjdEFsbCgnLnNsaWNlJyk7XG4gICAgbGV0IHNsaWNlID0gc2xpY2VzLmZpbHRlcigoZCwgaSkgPT4gaSA9PT0gaW5kZXgpO1xuXG4gICAgdGhpcy5jaGFydFxuICAgICAgLnNlbGVjdEFsbCgnLmxlZ2VuZC1pdGVtJylcbiAgICAgIC5maWx0ZXIoKGQsIGkpID0+IGkgIT09IGluZGV4KVxuICAgICAgLmNsYXNzZWQoJ2luYWN0aXZlJywgZmFsc2UpO1xuXG4gICAgc2xpY2VzLmNsYXNzZWQoJ2luYWN0aXZlJywgZmFsc2UpO1xuXG4gICAgc2xpY2VcbiAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgIC5kdXJhdGlvbigzMDApXG4gICAgICAuZGVsYXkoMClcbiAgICAgIC5hdHRyVHdlZW4oJ2QnLCAoZDogYW55KSA9PiB7XG4gICAgICAgIGxldCBpID0gZDNfaW50ZXJwb2xhdGUoZC5vdXRlclJhZGl1cywgdGhpcy5vdXRlclJhZGl1cyk7XG4gICAgICAgIHJldHVybiB0ID0+IHtcbiAgICAgICAgICBkLm91dGVyUmFkaXVzID0gaSh0KTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5hcmMoZCk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgfTtcblxuICBwcml2YXRlIHBhdGhDbGljayA9IChkYXRhLCBpbmRleCwgbm9kZXMpID0+IHtcbiAgICB0aGlzLmNsaWNrZWQuZW1pdChkYXRhLmRhdGEpO1xuICB9O1xuXG4gIHByaXZhdGUgdG9vbHRpcFNob3cgPSAobm9kZSwgZGF0YSkgPT4ge1xuICAgIHRoaXMudG9vbHRpcFNldFBvc2l0aW9uKG5vZGUpO1xuXG4gICAgbGV0IHBlcmNlbnRhZ2UgPSAoZGF0YS5lbmRBbmdsZSAtIGRhdGEuc3RhcnRBbmdsZSkgLyAoMiAqIE1hdGguUEkpO1xuXG4gICAgdGhpcy50b29sdGlwLmh0bWwoXG4gICAgICBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0b29sdGlwLWxhYmVsXCI+JHtkYXRhLmRhdGEubGFiZWx9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0b29sdGlwLXZhbHVlXCI+JHt0aGlzLnRvb2x0aXBGb3JtYXQocGVyY2VudGFnZSl9PC9kaXY+XG4gICAgICBgXG4gICAgKTtcblxuICAgIHRoaXMudG9vbHRpcC5zdHlsZSgnb3BhY2l0eScsIDEpO1xuICB9O1xuXG4gIHByaXZhdGUgdG9vbHRpcE1vdmUgPSBub2RlID0+IHtcbiAgICB0aGlzLnRvb2x0aXBTZXRQb3NpdGlvbihub2RlKTtcbiAgfTtcblxuICBwcml2YXRlIHRvb2x0aXBIaWRlID0gKCkgPT4ge1xuICAgIHRoaXMudG9vbHRpcC5zdHlsZSgnb3BhY2l0eScsIDApO1xuICB9O1xuXG4gIHByaXZhdGUgdG9vbHRpcFNldFBvc2l0aW9uID0gbm9kZSA9PiB7XG4gICAgbGV0IGNvb3JkaW5hdGVzID0gZDNfbW91c2Uobm9kZSk7XG5cbiAgICB0aGlzLnRvb2x0aXAuc3R5bGUoJ2xlZnQnLCBgJHtjb29yZGluYXRlc1swXSArIDE2fXB4YCk7XG4gICAgdGhpcy50b29sdGlwLnN0eWxlKCd0b3AnLCBgJHtjb29yZGluYXRlc1sxXSArIDE2fXB4YCk7XG4gIH07XG59XG4iXX0=