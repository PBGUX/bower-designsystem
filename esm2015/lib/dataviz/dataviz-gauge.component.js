/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ElementRef, HostBinding } from '@angular/core';
import { select as d3_select, arc as d3_arc, interpolate as d3_interpolate, format as d3_format } from 'd3';
import { PbdsDatavizService } from './dataviz.service';
export class PbdsDatavizGaugeComponent {
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
        this.type = 'halfmoon';
        this.color = '#cf0989';
        this.hideLabel = false;
        this.labelFormatString = '';
        this.labelSmall = false;
        this.gaugeWidth = 20;
        this.degreesToRadians = (/**
         * @param {?} degree
         * @return {?}
         */
        degree => {
            return (degree * Math.PI) / 180;
        });
        this.calculateMinMax = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const percentage = this.data.minvalue / (this.data.maxvalue - this.data.minvalue);
            return percentage * (this.data.value - this.data.minvalue) + (this.data.value - this.data.minvalue);
        });
        this.calculateCurve = (/**
         * @param {?} data
         * @return {?}
         */
        data => {
            /** @type {?} */
            const start = this.degreesToRadians(this.startAngle);
            /** @type {?} */
            const end = start + (data * (this.degreesToRadians(this.endAngle) - start)) / this.data.maxvalue;
            return [
                {
                    startAngle: start,
                    endAngle: end
                }
            ];
        });
        this.drawChart = (/**
         * @return {?}
         */
        () => {
            this.gauge = this.svg.append('g').attr('class', 'gauge-group');
            // background arc
            /** @type {?} */
            const background = this.gauge
                .append('path')
                .data(this.calculateCurve(this.data.maxvalue))
                .attr('class', 'gauge-background')
                .attr('fill', this.backgroundColor)
                .attr('d', (/**
             * @param {?} d
             * @return {?}
             */
            d => {
                return this.arc({
                    innerRadius: this.radius - this.gaugeWidth,
                    outerRadius: this.radius,
                    startAngle: d.startAngle,
                    endAngle: d.endAngle
                });
            }));
            // value arc
            this.gauge
                .append('path')
                .data(this.calculateCurve(this.calculateMinMax()))
                .attr('class', 'gauge-value')
                .attr('fill', this.color)
                .attr('d', (/**
             * @param {?} d
             * @return {?}
             */
            d => {
                return this.arc({
                    innerRadius: this.radius - this.gaugeWidth,
                    outerRadius: this.radius,
                    startAngle: d.startAngle,
                    endAngle: d.endAngle
                });
            }));
            switch (this.type) {
                case 'horseshoe':
                    this.svg.attr('height', 230).attr('viewBox', `-${this.width / 2} -${this.height / 2} ${this.height} 230`);
                    break;
                case 'halfmoon':
                    this.svg.attr('height', this.width / 2);
                    this.svg.attr('viewBox', `-${this.width / 2} -${this.width / 2} ${this.width} ${this.width / 2}`);
                    break;
            }
        });
        this.updateChart = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            let group = this.svg.select('.gauge-group');
            group
                .select('.gauge-value')
                .transition()
                .duration(750)
                .call(this.arcTween, this.calculateMinMax());
            this.labelTween = this.chart.select('.gauge-number');
            this.labelTween
                .transition()
                .duration(750)
                .call(this.textTween, this.data.value);
        });
        this.arcTween = (/**
         * @param {?} transition
         * @param {?} value
         * @return {?}
         */
        (transition, value) => {
            /** @type {?} */
            let newAngle = this.calculateCurve(value);
            transition.attrTween('d', (/**
             * @param {?} d
             * @return {?}
             */
            d => {
                /** @type {?} */
                let interpolate = d3_interpolate(d.endAngle, newAngle[0].endAngle);
                return (/**
                 * @param {?} t
                 * @return {?}
                 */
                t => {
                    d.endAngle = interpolate(t);
                    return this.arc({
                        innerRadius: this.radius - this.gaugeWidth,
                        outerRadius: this.radius,
                        startAngle: d.startAngle,
                        endAngle: d.endAngle
                    });
                });
            }));
        });
        this.textTween = (/**
         * @param {?} transition
         * @param {?} value
         * @return {?}
         */
        (transition, value) => {
            value = d3_format('.2f')(value); // TODO: check these .1f formats here, should they be inputs?
            value = value.replace(/,/g, '.');
            transition.tween('text', (/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                let interpolate = d3_interpolate(d3_format('.2f')(+this.oldValue), value);
                return (/**
                 * @param {?} t
                 * @return {?}
                 */
                t => {
                    this.labelTween.text((/**
                     * @param {?} d
                     * @return {?}
                     */
                    d => {
                        /** @type {?} */
                        let updatedNumber = this.labelFormat(interpolate(t));
                        this.label = updatedNumber;
                        return updatedNumber;
                    }));
                });
            }));
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.height = this.width;
        this.radius = Math.max(this.width, this.height) / 2;
        this.labelFormat = d3_format(this.labelFormatString);
        this.backgroundColor = '#F0F0F0';
        this.label = this.labelFormat(this.data.value);
        switch (this.type) {
            case 'halfmoon':
                this.startAngle = -90;
                this.endAngle = 90;
                this.rounded = true;
                break;
            case 'horseshoe':
                this.startAngle = -140;
                this.endAngle = 140;
                this.rounded = true;
                break;
            case 'circle':
                this.startAngle = 0;
                this.endAngle = 360;
                this.rounded = false;
                break;
        }
        this.arc = d3_arc().cornerRadius(this.rounded ? this.gaugeWidth : 0);
        this.chart = d3_select(this._element.nativeElement).attr('aria-hidden', 'true');
        this.svg = this.chart
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('class', 'img-fluid') // to resize chart
            .attr('preserveAspectRatio', 'xMinYMin meet')
            .attr('viewBox', `-${this.width / 2} -${this.height / 2} ${this.width} ${this.height}`);
        this.drawChart();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.data && !changes.data.firstChange) {
            // console.log(changes.data.previousValue.value, changes.data.currentValue.value);
            this.oldValue = changes.data.previousValue.value;
            this.updateChart();
        }
    }
}
PbdsDatavizGaugeComponent.decorators = [
    { type: Component, args: [{
                selector: 'pbds-dataviz-gauge',
                template: `
    <div
      *ngIf="!hideLabel"
      class="gauge-details"
      [ngClass]="{ halfmoon: type === 'halfmoon', 'gauge-details-small': labelSmall }"
    >
      <div class="gauge-number">{{ label }}</div>
      <div *ngIf="description" class="gauge-description text-center">{{ description }}</div>
    </div>
  `
            }] }
];
/** @nocollapse */
PbdsDatavizGaugeComponent.ctorParameters = () => [
    { type: PbdsDatavizService },
    { type: ElementRef }
];
PbdsDatavizGaugeComponent.propDecorators = {
    chartClass: [{ type: HostBinding, args: ['class.pbds-chart',] }],
    pieClass: [{ type: HostBinding, args: ['class.pbds-chart-gauge',] }],
    data: [{ type: Input }],
    width: [{ type: Input }],
    type: [{ type: Input }],
    color: [{ type: Input }],
    hideLabel: [{ type: Input }],
    labelFormatString: [{ type: Input }],
    labelSmall: [{ type: Input }],
    description: [{ type: Input }],
    gaugeWidth: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    PbdsDatavizGaugeComponent.prototype.chartClass;
    /** @type {?} */
    PbdsDatavizGaugeComponent.prototype.pieClass;
    /** @type {?} */
    PbdsDatavizGaugeComponent.prototype.data;
    /** @type {?} */
    PbdsDatavizGaugeComponent.prototype.width;
    /** @type {?} */
    PbdsDatavizGaugeComponent.prototype.type;
    /** @type {?} */
    PbdsDatavizGaugeComponent.prototype.color;
    /** @type {?} */
    PbdsDatavizGaugeComponent.prototype.hideLabel;
    /** @type {?} */
    PbdsDatavizGaugeComponent.prototype.labelFormatString;
    /** @type {?} */
    PbdsDatavizGaugeComponent.prototype.labelSmall;
    /** @type {?} */
    PbdsDatavizGaugeComponent.prototype.description;
    /** @type {?} */
    PbdsDatavizGaugeComponent.prototype.gaugeWidth;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGaugeComponent.prototype.chart;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGaugeComponent.prototype.svg;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGaugeComponent.prototype.gauge;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGaugeComponent.prototype.labelTween;
    /** @type {?} */
    PbdsDatavizGaugeComponent.prototype.label;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGaugeComponent.prototype.startAngle;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGaugeComponent.prototype.endAngle;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGaugeComponent.prototype.radius;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGaugeComponent.prototype.backgroundColor;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGaugeComponent.prototype.arc;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGaugeComponent.prototype.labelFormat;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGaugeComponent.prototype.oldValue;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGaugeComponent.prototype.height;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGaugeComponent.prototype.rounded;
    /** @type {?} */
    PbdsDatavizGaugeComponent.prototype.degreesToRadians;
    /** @type {?} */
    PbdsDatavizGaugeComponent.prototype.calculateMinMax;
    /** @type {?} */
    PbdsDatavizGaugeComponent.prototype.calculateCurve;
    /** @type {?} */
    PbdsDatavizGaugeComponent.prototype.drawChart;
    /** @type {?} */
    PbdsDatavizGaugeComponent.prototype.updateChart;
    /** @type {?} */
    PbdsDatavizGaugeComponent.prototype.arcTween;
    /** @type {?} */
    PbdsDatavizGaugeComponent.prototype.textTween;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGaugeComponent.prototype._dataviz;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGaugeComponent.prototype._element;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXZpei1nYXVnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wYi1kZXNpZ24tc3lzdGVtLyIsInNvdXJjZXMiOlsibGliL2RhdGF2aXovZGF0YXZpei1nYXVnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBRTVHLE9BQU8sRUFBRSxNQUFNLElBQUksU0FBUyxFQUFFLEdBQUcsSUFBSSxNQUFNLEVBQUUsV0FBVyxJQUFJLGNBQWMsRUFBRSxNQUFNLElBQUksU0FBUyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBRTVHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBaUJ2RCxNQUFNLE9BQU8seUJBQXlCOzs7OztJQWlEcEMsWUFBb0IsUUFBNEIsRUFBVSxRQUFvQjtRQUExRCxhQUFRLEdBQVIsUUFBUSxDQUFvQjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVk7UUEvQzlFLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFHbEIsYUFBUSxHQUFHLElBQUksQ0FBQztRQU1oQixVQUFLLEdBQUcsR0FBRyxDQUFDO1FBR1osU0FBSSxHQUF3QyxVQUFVLENBQUM7UUFHdkQsVUFBSyxHQUFHLFNBQVMsQ0FBQztRQUdsQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBR2xCLHNCQUFpQixHQUFHLEVBQUUsQ0FBQztRQUd2QixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBTW5CLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFzRWhCLHFCQUFnQjs7OztRQUFHLE1BQU0sQ0FBQyxFQUFFO1lBQzFCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxDQUFDLEVBQUM7UUFFRixvQkFBZTs7O1FBQUcsR0FBRyxFQUFFOztrQkFDZixVQUFVLEdBQUcs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bnB1dCwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBzZWxlY3QgYXMgZDNfc2VsZWN0LCBhcmMgYXMgZDNfYXJjLCBpbnRlcnBvbGF0ZSBhcyBkM19pbnRlcnBvbGF0ZSwgZm9ybWF0IGFzIGQzX2Zvcm1hdCB9IGZyb20gJ2QzJztcblxuaW1wb3J0IHsgUGJkc0RhdGF2aXpTZXJ2aWNlIH0gZnJvbSAnLi9kYXRhdml6LnNlcnZpY2UnO1xuaW1wb3J0IHsgUGJkc0RhdGF2aXpHYXVnZSB9IGZyb20gJy4vZGF0YXZpei5pbnRlcmZhY2VzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncGJkcy1kYXRhdml6LWdhdWdlJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICAqbmdJZj1cIiFoaWRlTGFiZWxcIlxuICAgICAgY2xhc3M9XCJnYXVnZS1kZXRhaWxzXCJcbiAgICAgIFtuZ0NsYXNzXT1cInsgaGFsZm1vb246IHR5cGUgPT09ICdoYWxmbW9vbicsICdnYXVnZS1kZXRhaWxzLXNtYWxsJzogbGFiZWxTbWFsbCB9XCJcbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzPVwiZ2F1Z2UtbnVtYmVyXCI+e3sgbGFiZWwgfX08L2Rpdj5cbiAgICAgIDxkaXYgKm5nSWY9XCJkZXNjcmlwdGlvblwiIGNsYXNzPVwiZ2F1Z2UtZGVzY3JpcHRpb24gdGV4dC1jZW50ZXJcIj57eyBkZXNjcmlwdGlvbiB9fTwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIFBiZHNEYXRhdml6R2F1Z2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MucGJkcy1jaGFydCcpXG4gIGNoYXJ0Q2xhc3MgPSB0cnVlO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MucGJkcy1jaGFydC1nYXVnZScpXG4gIHBpZUNsYXNzID0gdHJ1ZTtcblxuICBASW5wdXQoKVxuICBkYXRhOiBQYmRzRGF0YXZpekdhdWdlO1xuXG4gIEBJbnB1dCgpXG4gIHdpZHRoID0gMzAwO1xuXG4gIEBJbnB1dCgpXG4gIHR5cGU6ICdoYWxmbW9vbicgfCAnaG9yc2VzaG9lJyB8ICdjaXJjbGUnID0gJ2hhbGZtb29uJztcblxuICBASW5wdXQoKVxuICBjb2xvciA9ICcjY2YwOTg5JztcblxuICBASW5wdXQoKVxuICBoaWRlTGFiZWwgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBsYWJlbEZvcm1hdFN0cmluZyA9ICcnO1xuXG4gIEBJbnB1dCgpXG4gIGxhYmVsU21hbGwgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBkZXNjcmlwdGlvbjtcblxuICBASW5wdXQoKVxuICBnYXVnZVdpZHRoID0gMjA7XG5cbiAgcHJpdmF0ZSBjaGFydDtcbiAgcHJpdmF0ZSBzdmc7XG4gIHByaXZhdGUgZ2F1Z2U7XG4gIHByaXZhdGUgbGFiZWxUd2VlbjsgLy8gVE9ETzogcmVuYW1lIHRoaXNcbiAgcHVibGljIGxhYmVsO1xuICBwcml2YXRlIHN0YXJ0QW5nbGU7XG4gIHByaXZhdGUgZW5kQW5nbGU7XG4gIHByaXZhdGUgcmFkaXVzO1xuICBwcml2YXRlIGJhY2tncm91bmRDb2xvcjsgLy8gVE9ETzogc2hvdWxkIHRoaXMgYmUgYW4gaW5wdXQ/XG4gIHByaXZhdGUgYXJjO1xuICBwcml2YXRlIGxhYmVsRm9ybWF0O1xuICBwcml2YXRlIG9sZFZhbHVlO1xuICBwcml2YXRlIGhlaWdodDtcbiAgcHJpdmF0ZSByb3VuZGVkO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2RhdGF2aXo6IFBiZHNEYXRhdml6U2VydmljZSwgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMud2lkdGg7XG4gICAgdGhpcy5yYWRpdXMgPSBNYXRoLm1heCh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCkgLyAyO1xuICAgIHRoaXMubGFiZWxGb3JtYXQgPSBkM19mb3JtYXQodGhpcy5sYWJlbEZvcm1hdFN0cmluZyk7XG4gICAgdGhpcy5iYWNrZ3JvdW5kQ29sb3IgPSAnI0YwRjBGMCc7XG4gICAgdGhpcy5sYWJlbCA9IHRoaXMubGFiZWxGb3JtYXQodGhpcy5kYXRhLnZhbHVlKTtcblxuICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICBjYXNlICdoYWxmbW9vbic6XG4gICAgICAgIHRoaXMuc3RhcnRBbmdsZSA9IC05MDtcbiAgICAgICAgdGhpcy5lbmRBbmdsZSA9IDkwO1xuICAgICAgICB0aGlzLnJvdW5kZWQgPSB0cnVlO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnaG9yc2VzaG9lJzpcbiAgICAgICAgdGhpcy5zdGFydEFuZ2xlID0gLTE0MDtcbiAgICAgICAgdGhpcy5lbmRBbmdsZSA9IDE0MDtcbiAgICAgICAgdGhpcy5yb3VuZGVkID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2NpcmNsZSc6XG4gICAgICAgIHRoaXMuc3RhcnRBbmdsZSA9IDA7XG4gICAgICAgIHRoaXMuZW5kQW5nbGUgPSAzNjA7XG4gICAgICAgIHRoaXMucm91bmRlZCA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICB0aGlzLmFyYyA9IGQzX2FyYygpLmNvcm5lclJhZGl1cyh0aGlzLnJvdW5kZWQgPyB0aGlzLmdhdWdlV2lkdGggOiAwKTtcblxuICAgIHRoaXMuY2hhcnQgPSBkM19zZWxlY3QodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50KS5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbiAgICB0aGlzLnN2ZyA9IHRoaXMuY2hhcnRcbiAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAuYXR0cignd2lkdGgnLCB0aGlzLndpZHRoKVxuICAgICAgLmF0dHIoJ2hlaWdodCcsIHRoaXMuaGVpZ2h0KVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2ltZy1mbHVpZCcpIC8vIHRvIHJlc2l6ZSBjaGFydFxuICAgICAgLmF0dHIoJ3ByZXNlcnZlQXNwZWN0UmF0aW8nLCAneE1pbllNaW4gbWVldCcpXG4gICAgICAuYXR0cigndmlld0JveCcsIGAtJHt0aGlzLndpZHRoIC8gMn0gLSR7dGhpcy5oZWlnaHQgLyAyfSAke3RoaXMud2lkdGh9ICR7dGhpcy5oZWlnaHR9YCk7XG5cbiAgICB0aGlzLmRyYXdDaGFydCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmRhdGEgJiYgIWNoYW5nZXMuZGF0YS5maXJzdENoYW5nZSkge1xuICAgICAgLy8gY29uc29sZS5sb2coY2hhbmdlcy5kYXRhLnByZXZpb3VzVmFsdWUudmFsdWUsIGNoYW5nZXMuZGF0YS5jdXJyZW50VmFsdWUudmFsdWUpO1xuXG4gICAgICB0aGlzLm9sZFZhbHVlID0gY2hhbmdlcy5kYXRhLnByZXZpb3VzVmFsdWUudmFsdWU7XG4gICAgICB0aGlzLnVwZGF0ZUNoYXJ0KCk7XG4gICAgfVxuICB9XG5cbiAgZGVncmVlc1RvUmFkaWFucyA9IGRlZ3JlZSA9PiB7XG4gICAgcmV0dXJuIChkZWdyZWUgKiBNYXRoLlBJKSAvIDE4MDtcbiAgfTtcblxuICBjYWxjdWxhdGVNaW5NYXggPSAoKSA9PiB7XG4gICAgY29uc3QgcGVyY2VudGFnZSA9IHRoaXMuZGF0YS5taW52YWx1ZSAvICh0aGlzLmRhdGEubWF4dmFsdWUgLSB0aGlzLmRhdGEubWludmFsdWUpO1xuXG4gICAgcmV0dXJuIHBlcmNlbnRhZ2UgKiAodGhpcy5kYXRhLnZhbHVlIC0gdGhpcy5kYXRhLm1pbnZhbHVlKSArICh0aGlzLmRhdGEudmFsdWUgLSB0aGlzLmRhdGEubWludmFsdWUpO1xuICB9O1xuXG4gIGNhbGN1bGF0ZUN1cnZlID0gZGF0YSA9PiB7XG4gICAgY29uc3Qgc3RhcnQgPSB0aGlzLmRlZ3JlZXNUb1JhZGlhbnModGhpcy5zdGFydEFuZ2xlKTtcbiAgICBjb25zdCBlbmQgPSBzdGFydCArIChkYXRhICogKHRoaXMuZGVncmVlc1RvUmFkaWFucyh0aGlzLmVuZEFuZ2xlKSAtIHN0YXJ0KSkgLyB0aGlzLmRhdGEubWF4dmFsdWU7XG5cbiAgICByZXR1cm4gW1xuICAgICAge1xuICAgICAgICBzdGFydEFuZ2xlOiBzdGFydCxcbiAgICAgICAgZW5kQW5nbGU6IGVuZFxuICAgICAgfVxuICAgIF07XG4gIH07XG5cbiAgZHJhd0NoYXJ0ID0gKCkgPT4ge1xuICAgIHRoaXMuZ2F1Z2UgPSB0aGlzLnN2Zy5hcHBlbmQoJ2cnKS5hdHRyKCdjbGFzcycsICdnYXVnZS1ncm91cCcpO1xuXG4gICAgLy8gYmFja2dyb3VuZCBhcmNcbiAgICBjb25zdCBiYWNrZ3JvdW5kID0gdGhpcy5nYXVnZVxuICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAuZGF0YSh0aGlzLmNhbGN1bGF0ZUN1cnZlKHRoaXMuZGF0YS5tYXh2YWx1ZSkpXG4gICAgICAuYXR0cignY2xhc3MnLCAnZ2F1Z2UtYmFja2dyb3VuZCcpXG4gICAgICAuYXR0cignZmlsbCcsIHRoaXMuYmFja2dyb3VuZENvbG9yKVxuICAgICAgLmF0dHIoJ2QnLCBkID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXJjKHtcbiAgICAgICAgICBpbm5lclJhZGl1czogdGhpcy5yYWRpdXMgLSB0aGlzLmdhdWdlV2lkdGgsXG4gICAgICAgICAgb3V0ZXJSYWRpdXM6IHRoaXMucmFkaXVzLFxuICAgICAgICAgIHN0YXJ0QW5nbGU6IGQuc3RhcnRBbmdsZSxcbiAgICAgICAgICBlbmRBbmdsZTogZC5lbmRBbmdsZVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgLy8gdmFsdWUgYXJjXG4gICAgdGhpcy5nYXVnZVxuICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAuZGF0YSh0aGlzLmNhbGN1bGF0ZUN1cnZlKHRoaXMuY2FsY3VsYXRlTWluTWF4KCkpKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dhdWdlLXZhbHVlJylcbiAgICAgIC5hdHRyKCdmaWxsJywgdGhpcy5jb2xvcilcbiAgICAgIC5hdHRyKCdkJywgZCA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmFyYyh7XG4gICAgICAgICAgaW5uZXJSYWRpdXM6IHRoaXMucmFkaXVzIC0gdGhpcy5nYXVnZVdpZHRoLFxuICAgICAgICAgIG91dGVyUmFkaXVzOiB0aGlzLnJhZGl1cyxcbiAgICAgICAgICBzdGFydEFuZ2xlOiBkLnN0YXJ0QW5nbGUsXG4gICAgICAgICAgZW5kQW5nbGU6IGQuZW5kQW5nbGVcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICBjYXNlICdob3JzZXNob2UnOlxuICAgICAgICB0aGlzLnN2Zy5hdHRyKCdoZWlnaHQnLCAyMzApLmF0dHIoJ3ZpZXdCb3gnLCBgLSR7dGhpcy53aWR0aCAvIDJ9IC0ke3RoaXMuaGVpZ2h0IC8gMn0gJHt0aGlzLmhlaWdodH0gMjMwYCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaGFsZm1vb24nOlxuICAgICAgICB0aGlzLnN2Zy5hdHRyKCdoZWlnaHQnLCB0aGlzLndpZHRoIC8gMik7XG4gICAgICAgIHRoaXMuc3ZnLmF0dHIoJ3ZpZXdCb3gnLCBgLSR7dGhpcy53aWR0aCAvIDJ9IC0ke3RoaXMud2lkdGggLyAyfSAke3RoaXMud2lkdGh9ICR7dGhpcy53aWR0aCAvIDJ9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfTtcblxuICB1cGRhdGVDaGFydCA9ICgpID0+IHtcbiAgICBsZXQgZ3JvdXAgPSB0aGlzLnN2Zy5zZWxlY3QoJy5nYXVnZS1ncm91cCcpO1xuXG4gICAgZ3JvdXBcbiAgICAgIC5zZWxlY3QoJy5nYXVnZS12YWx1ZScpXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZHVyYXRpb24oNzUwKVxuICAgICAgLmNhbGwodGhpcy5hcmNUd2VlbiwgdGhpcy5jYWxjdWxhdGVNaW5NYXgoKSk7XG5cbiAgICB0aGlzLmxhYmVsVHdlZW4gPSB0aGlzLmNoYXJ0LnNlbGVjdCgnLmdhdWdlLW51bWJlcicpO1xuXG4gICAgdGhpcy5sYWJlbFR3ZWVuXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZHVyYXRpb24oNzUwKVxuICAgICAgLmNhbGwodGhpcy50ZXh0VHdlZW4sIHRoaXMuZGF0YS52YWx1ZSk7XG4gIH07XG5cbiAgYXJjVHdlZW4gPSAodHJhbnNpdGlvbiwgdmFsdWUpID0+IHtcbiAgICBsZXQgbmV3QW5nbGUgPSB0aGlzLmNhbGN1bGF0ZUN1cnZlKHZhbHVlKTtcblxuICAgIHRyYW5zaXRpb24uYXR0clR3ZWVuKCdkJywgZCA9PiB7XG4gICAgICBsZXQgaW50ZXJwb2xhdGUgPSBkM19pbnRlcnBvbGF0ZShkLmVuZEFuZ2xlLCBuZXdBbmdsZVswXS5lbmRBbmdsZSk7XG5cbiAgICAgIHJldHVybiB0ID0+IHtcbiAgICAgICAgZC5lbmRBbmdsZSA9IGludGVycG9sYXRlKHQpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmFyYyh7XG4gICAgICAgICAgaW5uZXJSYWRpdXM6IHRoaXMucmFkaXVzIC0gdGhpcy5nYXVnZVdpZHRoLFxuICAgICAgICAgIG91dGVyUmFkaXVzOiB0aGlzLnJhZGl1cyxcbiAgICAgICAgICBzdGFydEFuZ2xlOiBkLnN0YXJ0QW5nbGUsXG4gICAgICAgICAgZW5kQW5nbGU6IGQuZW5kQW5nbGVcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9O1xuXG4gIHRleHRUd2VlbiA9ICh0cmFuc2l0aW9uLCB2YWx1ZSkgPT4ge1xuICAgIHZhbHVlID0gZDNfZm9ybWF0KCcuMmYnKSh2YWx1ZSk7IC8vIFRPRE86IGNoZWNrIHRoZXNlIC4xZiBmb3JtYXRzIGhlcmUsIHNob3VsZCB0aGV5IGJlIGlucHV0cz9cbiAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoLywvZywgJy4nKTtcblxuICAgIHRyYW5zaXRpb24udHdlZW4oJ3RleHQnLCAoKSA9PiB7XG4gICAgICBsZXQgaW50ZXJwb2xhdGUgPSBkM19pbnRlcnBvbGF0ZShkM19mb3JtYXQoJy4yZicpKCt0aGlzLm9sZFZhbHVlKSwgdmFsdWUpO1xuXG4gICAgICByZXR1cm4gdCA9PiB7XG4gICAgICAgIHRoaXMubGFiZWxUd2Vlbi50ZXh0KGQgPT4ge1xuICAgICAgICAgIGxldCB1cGRhdGVkTnVtYmVyID0gdGhpcy5sYWJlbEZvcm1hdChpbnRlcnBvbGF0ZSh0KSk7XG4gICAgICAgICAgdGhpcy5sYWJlbCA9IHVwZGF0ZWROdW1iZXI7XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZWROdW1iZXI7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfTtcbn1cbiJdfQ==