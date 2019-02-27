/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.degreesToRadians = degree => {
            return (degree * Math.PI) / 180;
        };
        this.calculateMinMax = () => {
            /** @type {?} */
            const percentage = this.data.minvalue / (this.data.maxvalue - this.data.minvalue);
            return percentage * (this.data.value - this.data.minvalue) + (this.data.value - this.data.minvalue);
        };
        this.calculateCurve = data => {
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
        };
        this.drawChart = () => {
            this.gauge = this.svg.append('g').attr('class', 'gauge-group');
            // background arc
            /** @type {?} */
            const background = this.gauge
                .append('path')
                .data(this.calculateCurve(this.data.maxvalue))
                .attr('class', 'gauge-background')
                .attr('fill', this.backgroundColor)
                .attr('d', d => {
                return this.arc({
                    innerRadius: this.radius - this.gaugeWidth,
                    outerRadius: this.radius,
                    startAngle: d.startAngle,
                    endAngle: d.endAngle
                });
            });
            // value arc
            this.gauge
                .append('path')
                .data(this.calculateCurve(this.calculateMinMax()))
                .attr('class', 'gauge-value')
                .attr('fill', this.color)
                .attr('d', d => {
                return this.arc({
                    innerRadius: this.radius - this.gaugeWidth,
                    outerRadius: this.radius,
                    startAngle: d.startAngle,
                    endAngle: d.endAngle
                });
            });
            switch (this.type) {
                case 'horseshoe':
                    this.svg.attr('height', 230).attr('viewBox', `-${this.width / 2} -${this.height / 2} ${this.height} 230`);
                    break;
                case 'halfmoon':
                    this.svg.attr('height', this.width / 2);
                    this.svg.attr('viewBox', `-${this.width / 2} -${this.width / 2} ${this.width} ${this.width / 2}`);
                    break;
            }
        };
        this.updateChart = () => {
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
        };
        this.arcTween = (transition, value) => {
            /** @type {?} */
            let newAngle = this.calculateCurve(value);
            transition.attrTween('d', d => {
                /** @type {?} */
                let interpolate = d3_interpolate(d.endAngle, newAngle[0].endAngle);
                return t => {
                    d.endAngle = interpolate(t);
                    return this.arc({
                        innerRadius: this.radius - this.gaugeWidth,
                        outerRadius: this.radius,
                        startAngle: d.startAngle,
                        endAngle: d.endAngle
                    });
                };
            });
        };
        this.textTween = (transition, value) => {
            value = d3_format('.2f')(value); // TODO: check these .1f formats here, should they be inputs?
            value = value.replace(/,/g, '.');
            transition.tween('text', () => {
                /** @type {?} */
                let interpolate = d3_interpolate(d3_format('.2f')(+this.oldValue), value);
                return t => {
                    this.labelTween.text(d => {
                        /** @type {?} */
                        let updatedNumber = this.labelFormat(interpolate(t));
                        this.label = updatedNumber;
                        return updatedNumber;
                    });
                };
            });
        };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXZpei1nYXVnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wYi1kZXNpZ24tc3lzdGVtLyIsInNvdXJjZXMiOlsibGliL2RhdGF2aXovZGF0YXZpei1nYXVnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBRTVHLE9BQU8sRUFBRSxNQUFNLElBQUksU0FBUyxFQUFFLEdBQUcsSUFBSSxNQUFNLEVBQUUsV0FBVyxJQUFJLGNBQWMsRUFBRSxNQUFNLElBQUksU0FBUyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBRTVHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBaUJ2RCxNQUFNLE9BQU8seUJBQXlCOzs7OztJQWlEcEMsWUFBb0IsUUFBNEIsRUFBVSxRQUFvQjtRQUExRCxhQUFRLEdBQVIsUUFBUSxDQUFvQjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVk7UUEvQzlFLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFHbEIsYUFBUSxHQUFHLElBQUksQ0FBQztRQU1oQixVQUFLLEdBQUcsR0FBRyxDQUFDO1FBR1osU0FBSSxHQUF3QyxVQUFVLENBQUM7UUFHdkQsVUFBSyxHQUFHLFNBQVMsQ0FBQztRQUdsQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBR2xCLHNCQUFpQixHQUFHLEVBQUUsQ0FBQztRQUd2QixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBTW5CLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFzRWhCLHFCQUFnQixHQUFHLE1BQU0sQ0FBQyxFQUFFO1lBQzFCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxDQUFDLENBQUM7UUFFRixvQkFBZSxHQUFHLEdBQUcsRUFBRTs7a0JBQ2YsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFFakYsT0FBTyxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0RyxDQUFDLENBQUM7UUFFRixtQkFBYyxHQUFHLElBQUksQ0FBQyxFQUFFOztrQkFDaEIsS0FBSyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDOztrQkFDOUMsR0FBRyxHQUFHLEtBQUssR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7WUFFaEcsT0FBTztnQkFDTDtvQkFDRSxVQUFVLEVBQUUsS0FBSztvQkFDakIsUUFBUSxFQUFFLEdBQUc7aUJBQ2Q7YUFDRixDQUFDO1FBQ0osQ0FBQyxDQUFDO1FBRUYsY0FBUyxHQUFHLEdBQUcsRUFBRTtZQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQzs7O2tCQUd6RCxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUs7aUJBQzFCLE1BQU0sQ0FBQyxNQUFNLENBQUM7aUJBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDN0MsSUFBSSxDQUFDLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQztpQkFDakMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDO2lCQUNsQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFO2dCQUNiLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFDZCxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVTtvQkFDMUMsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNO29CQUN4QixVQUFVLEVBQUUsQ0FBQyxDQUFDLFVBQVU7b0JBQ3hCLFFBQVEsRUFBRSxDQUFDLENBQUMsUUFBUTtpQkFDckIsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDO1lBRUosWUFBWTtZQUNaLElBQUksQ0FBQyxLQUFLO2lCQUNQLE1BQU0sQ0FBQyxNQUFNLENBQUM7aUJBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7aUJBQ2pELElBQUksQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDO2lCQUM1QixJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7aUJBQ3hCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2IsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO29CQUNkLFdBQVcsRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVO29CQUMxQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU07b0JBQ3hCLFVBQVUsRUFBRSxDQUFDLENBQUMsVUFBVTtvQkFDeEIsUUFBUSxFQUFFLENBQUMsQ0FBQyxRQUFRO2lCQUNyQixDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVMLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDakIsS0FBSyxXQUFXO29CQUNkLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sTUFBTSxDQUFDLENBQUM7b0JBQzFHLE1BQU07Z0JBQ1IsS0FBSyxVQUFVO29CQUNiLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUN4QyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDbEcsTUFBTTthQUNUO1FBQ0gsQ0FBQyxDQUFDO1FBRUYsZ0JBQVcsR0FBRyxHQUFHLEVBQUU7O2dCQUNiLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUM7WUFFM0MsS0FBSztpQkFDRixNQUFNLENBQUMsY0FBYyxDQUFDO2lCQUN0QixVQUFVLEVBQUU7aUJBQ1osUUFBUSxDQUFDLEdBQUcsQ0FBQztpQkFDYixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztZQUUvQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBRXJELElBQUksQ0FBQyxVQUFVO2lCQUNaLFVBQVUsRUFBRTtpQkFDWixRQUFRLENBQUMsR0FBRyxDQUFDO2lCQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDO1FBRUYsYUFBUSxHQUFHLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxFQUFFOztnQkFDM0IsUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDO1lBRXpDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFOztvQkFDeEIsV0FBVyxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7Z0JBRWxFLE9BQU8sQ0FBQyxDQUFDLEVBQUU7b0JBQ1QsQ0FBQyxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRTVCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQzt3QkFDZCxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVTt3QkFDMUMsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNO3dCQUN4QixVQUFVLEVBQUUsQ0FBQyxDQUFDLFVBQVU7d0JBQ3hCLFFBQVEsRUFBRSxDQUFDLENBQUMsUUFBUTtxQkFDckIsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDO1FBRUYsY0FBUyxHQUFHLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ2hDLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyw2REFBNkQ7WUFDOUYsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRWpDLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTs7b0JBQ3hCLFdBQVcsR0FBRyxjQUFjLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEtBQUssQ0FBQztnQkFFekUsT0FBTyxDQUFDLENBQUMsRUFBRTtvQkFDVCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTs7NEJBQ25CLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDcEQsSUFBSSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUM7d0JBQzNCLE9BQU8sYUFBYSxDQUFDO29CQUN2QixDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQztJQTFLK0UsQ0FBQzs7OztJQUVsRixRQUFRO1FBQ04sSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFL0MsUUFBUSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2pCLEtBQUssVUFBVTtnQkFDYixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ3BCLE1BQU07WUFFUixLQUFLLFdBQVc7Z0JBQ2QsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNwQixNQUFNO1lBRVIsS0FBSyxRQUFRO2dCQUNYLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO2dCQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLE1BQU07U0FDVDtRQUVELElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXJFLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVoRixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLO2FBQ2xCLE1BQU0sQ0FBQyxLQUFLLENBQUM7YUFDYixJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7YUFDekIsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQzNCLElBQUksQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUMsa0JBQWtCO2FBQzdDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxlQUFlLENBQUM7YUFDNUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFFMUYsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQzdDLGtGQUFrRjtZQUVsRixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztZQUNqRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDcEI7SUFDSCxDQUFDOzs7WUFsSEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLFFBQVEsRUFBRTs7Ozs7Ozs7O0dBU1Q7YUFFRjs7OztZQWhCUSxrQkFBa0I7WUFKUSxVQUFVOzs7eUJBc0IxQyxXQUFXLFNBQUMsa0JBQWtCO3VCQUc5QixXQUFXLFNBQUMsd0JBQXdCO21CQUdwQyxLQUFLO29CQUdMLEtBQUs7bUJBR0wsS0FBSztvQkFHTCxLQUFLO3dCQUdMLEtBQUs7Z0NBR0wsS0FBSzt5QkFHTCxLQUFLOzBCQUdMLEtBQUs7eUJBR0wsS0FBSzs7OztJQTlCTiwrQ0FDa0I7O0lBRWxCLDZDQUNnQjs7SUFFaEIseUNBQ3dCOztJQUV4QiwwQ0FDWTs7SUFFWix5Q0FDdUQ7O0lBRXZELDBDQUNrQjs7SUFFbEIsOENBQ2tCOztJQUVsQixzREFDdUI7O0lBRXZCLCtDQUNtQjs7SUFFbkIsZ0RBQ1k7O0lBRVosK0NBQ2dCOzs7OztJQUVoQiwwQ0FBYzs7Ozs7SUFDZCx3Q0FBWTs7Ozs7SUFDWiwwQ0FBYzs7Ozs7SUFDZCwrQ0FBbUI7O0lBQ25CLDBDQUFhOzs7OztJQUNiLCtDQUFtQjs7Ozs7SUFDbkIsNkNBQWlCOzs7OztJQUNqQiwyQ0FBZTs7Ozs7SUFDZixvREFBd0I7Ozs7O0lBQ3hCLHdDQUFZOzs7OztJQUNaLGdEQUFvQjs7Ozs7SUFDcEIsNkNBQWlCOzs7OztJQUNqQiwyQ0FBZTs7Ozs7SUFDZiw0Q0FBZ0I7O0lBdURoQixxREFFRTs7SUFFRixvREFJRTs7SUFFRixtREFVRTs7SUFFRiw4Q0EwQ0U7O0lBRUYsZ0RBZUU7O0lBRUYsNkNBaUJFOztJQUVGLDhDQWVFOzs7OztJQTFLVSw2Q0FBb0M7Ozs7O0lBQUUsNkNBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IHNlbGVjdCBhcyBkM19zZWxlY3QsIGFyYyBhcyBkM19hcmMsIGludGVycG9sYXRlIGFzIGQzX2ludGVycG9sYXRlLCBmb3JtYXQgYXMgZDNfZm9ybWF0IH0gZnJvbSAnZDMnO1xuXG5pbXBvcnQgeyBQYmRzRGF0YXZpelNlcnZpY2UgfSBmcm9tICcuL2RhdGF2aXouc2VydmljZSc7XG5pbXBvcnQgeyBJUGJkc0RhdGF2aXpHYXVnZSB9IGZyb20gJy4vZGF0YXZpei5pbnRlcmZhY2VzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncGJkcy1kYXRhdml6LWdhdWdlJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICAqbmdJZj1cIiFoaWRlTGFiZWxcIlxuICAgICAgY2xhc3M9XCJnYXVnZS1kZXRhaWxzXCJcbiAgICAgIFtuZ0NsYXNzXT1cInsgaGFsZm1vb246IHR5cGUgPT09ICdoYWxmbW9vbicsICdnYXVnZS1kZXRhaWxzLXNtYWxsJzogbGFiZWxTbWFsbCB9XCJcbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzPVwiZ2F1Z2UtbnVtYmVyXCI+e3sgbGFiZWwgfX08L2Rpdj5cbiAgICAgIDxkaXYgKm5nSWY9XCJkZXNjcmlwdGlvblwiIGNsYXNzPVwiZ2F1Z2UtZGVzY3JpcHRpb24gdGV4dC1jZW50ZXJcIj57eyBkZXNjcmlwdGlvbiB9fTwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIFBiZHNEYXRhdml6R2F1Z2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MucGJkcy1jaGFydCcpXG4gIGNoYXJ0Q2xhc3MgPSB0cnVlO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MucGJkcy1jaGFydC1nYXVnZScpXG4gIHBpZUNsYXNzID0gdHJ1ZTtcblxuICBASW5wdXQoKVxuICBkYXRhOiBJUGJkc0RhdGF2aXpHYXVnZTtcblxuICBASW5wdXQoKVxuICB3aWR0aCA9IDMwMDtcblxuICBASW5wdXQoKVxuICB0eXBlOiAnaGFsZm1vb24nIHwgJ2hvcnNlc2hvZScgfCAnY2lyY2xlJyA9ICdoYWxmbW9vbic7XG5cbiAgQElucHV0KClcbiAgY29sb3IgPSAnI2NmMDk4OSc7XG5cbiAgQElucHV0KClcbiAgaGlkZUxhYmVsID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgbGFiZWxGb3JtYXRTdHJpbmcgPSAnJztcblxuICBASW5wdXQoKVxuICBsYWJlbFNtYWxsID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgZGVzY3JpcHRpb247XG5cbiAgQElucHV0KClcbiAgZ2F1Z2VXaWR0aCA9IDIwO1xuXG4gIHByaXZhdGUgY2hhcnQ7XG4gIHByaXZhdGUgc3ZnO1xuICBwcml2YXRlIGdhdWdlO1xuICBwcml2YXRlIGxhYmVsVHdlZW47IC8vIFRPRE86IHJlbmFtZSB0aGlzXG4gIHB1YmxpYyBsYWJlbDtcbiAgcHJpdmF0ZSBzdGFydEFuZ2xlO1xuICBwcml2YXRlIGVuZEFuZ2xlO1xuICBwcml2YXRlIHJhZGl1cztcbiAgcHJpdmF0ZSBiYWNrZ3JvdW5kQ29sb3I7IC8vIFRPRE86IHNob3VsZCB0aGlzIGJlIGFuIGlucHV0P1xuICBwcml2YXRlIGFyYztcbiAgcHJpdmF0ZSBsYWJlbEZvcm1hdDtcbiAgcHJpdmF0ZSBvbGRWYWx1ZTtcbiAgcHJpdmF0ZSBoZWlnaHQ7XG4gIHByaXZhdGUgcm91bmRlZDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9kYXRhdml6OiBQYmRzRGF0YXZpelNlcnZpY2UsIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLndpZHRoO1xuICAgIHRoaXMucmFkaXVzID0gTWF0aC5tYXgodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpIC8gMjtcbiAgICB0aGlzLmxhYmVsRm9ybWF0ID0gZDNfZm9ybWF0KHRoaXMubGFiZWxGb3JtYXRTdHJpbmcpO1xuICAgIHRoaXMuYmFja2dyb3VuZENvbG9yID0gJyNGMEYwRjAnO1xuICAgIHRoaXMubGFiZWwgPSB0aGlzLmxhYmVsRm9ybWF0KHRoaXMuZGF0YS52YWx1ZSk7XG5cbiAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgY2FzZSAnaGFsZm1vb24nOlxuICAgICAgICB0aGlzLnN0YXJ0QW5nbGUgPSAtOTA7XG4gICAgICAgIHRoaXMuZW5kQW5nbGUgPSA5MDtcbiAgICAgICAgdGhpcy5yb3VuZGVkID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2hvcnNlc2hvZSc6XG4gICAgICAgIHRoaXMuc3RhcnRBbmdsZSA9IC0xNDA7XG4gICAgICAgIHRoaXMuZW5kQW5nbGUgPSAxNDA7XG4gICAgICAgIHRoaXMucm91bmRlZCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdjaXJjbGUnOlxuICAgICAgICB0aGlzLnN0YXJ0QW5nbGUgPSAwO1xuICAgICAgICB0aGlzLmVuZEFuZ2xlID0gMzYwO1xuICAgICAgICB0aGlzLnJvdW5kZWQgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgdGhpcy5hcmMgPSBkM19hcmMoKS5jb3JuZXJSYWRpdXModGhpcy5yb3VuZGVkID8gdGhpcy5nYXVnZVdpZHRoIDogMCk7XG5cbiAgICB0aGlzLmNoYXJ0ID0gZDNfc2VsZWN0KHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCkuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4gICAgdGhpcy5zdmcgPSB0aGlzLmNoYXJ0XG4gICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgLmF0dHIoJ3dpZHRoJywgdGhpcy53aWR0aClcbiAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmhlaWdodClcbiAgICAgIC5hdHRyKCdjbGFzcycsICdpbWctZmx1aWQnKSAvLyB0byByZXNpemUgY2hhcnRcbiAgICAgIC5hdHRyKCdwcmVzZXJ2ZUFzcGVjdFJhdGlvJywgJ3hNaW5ZTWluIG1lZXQnKVxuICAgICAgLmF0dHIoJ3ZpZXdCb3gnLCBgLSR7dGhpcy53aWR0aCAvIDJ9IC0ke3RoaXMuaGVpZ2h0IC8gMn0gJHt0aGlzLndpZHRofSAke3RoaXMuaGVpZ2h0fWApO1xuXG4gICAgdGhpcy5kcmF3Q2hhcnQoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5kYXRhICYmICFjaGFuZ2VzLmRhdGEuZmlyc3RDaGFuZ2UpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGNoYW5nZXMuZGF0YS5wcmV2aW91c1ZhbHVlLnZhbHVlLCBjaGFuZ2VzLmRhdGEuY3VycmVudFZhbHVlLnZhbHVlKTtcblxuICAgICAgdGhpcy5vbGRWYWx1ZSA9IGNoYW5nZXMuZGF0YS5wcmV2aW91c1ZhbHVlLnZhbHVlO1xuICAgICAgdGhpcy51cGRhdGVDaGFydCgpO1xuICAgIH1cbiAgfVxuXG4gIGRlZ3JlZXNUb1JhZGlhbnMgPSBkZWdyZWUgPT4ge1xuICAgIHJldHVybiAoZGVncmVlICogTWF0aC5QSSkgLyAxODA7XG4gIH07XG5cbiAgY2FsY3VsYXRlTWluTWF4ID0gKCkgPT4ge1xuICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSB0aGlzLmRhdGEubWludmFsdWUgLyAodGhpcy5kYXRhLm1heHZhbHVlIC0gdGhpcy5kYXRhLm1pbnZhbHVlKTtcblxuICAgIHJldHVybiBwZXJjZW50YWdlICogKHRoaXMuZGF0YS52YWx1ZSAtIHRoaXMuZGF0YS5taW52YWx1ZSkgKyAodGhpcy5kYXRhLnZhbHVlIC0gdGhpcy5kYXRhLm1pbnZhbHVlKTtcbiAgfTtcblxuICBjYWxjdWxhdGVDdXJ2ZSA9IGRhdGEgPT4ge1xuICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5kZWdyZWVzVG9SYWRpYW5zKHRoaXMuc3RhcnRBbmdsZSk7XG4gICAgY29uc3QgZW5kID0gc3RhcnQgKyAoZGF0YSAqICh0aGlzLmRlZ3JlZXNUb1JhZGlhbnModGhpcy5lbmRBbmdsZSkgLSBzdGFydCkpIC8gdGhpcy5kYXRhLm1heHZhbHVlO1xuXG4gICAgcmV0dXJuIFtcbiAgICAgIHtcbiAgICAgICAgc3RhcnRBbmdsZTogc3RhcnQsXG4gICAgICAgIGVuZEFuZ2xlOiBlbmRcbiAgICAgIH1cbiAgICBdO1xuICB9O1xuXG4gIGRyYXdDaGFydCA9ICgpID0+IHtcbiAgICB0aGlzLmdhdWdlID0gdGhpcy5zdmcuYXBwZW5kKCdnJykuYXR0cignY2xhc3MnLCAnZ2F1Z2UtZ3JvdXAnKTtcblxuICAgIC8vIGJhY2tncm91bmQgYXJjXG4gICAgY29uc3QgYmFja2dyb3VuZCA9IHRoaXMuZ2F1Z2VcbiAgICAgIC5hcHBlbmQoJ3BhdGgnKVxuICAgICAgLmRhdGEodGhpcy5jYWxjdWxhdGVDdXJ2ZSh0aGlzLmRhdGEubWF4dmFsdWUpKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dhdWdlLWJhY2tncm91bmQnKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCB0aGlzLmJhY2tncm91bmRDb2xvcilcbiAgICAgIC5hdHRyKCdkJywgZCA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmFyYyh7XG4gICAgICAgICAgaW5uZXJSYWRpdXM6IHRoaXMucmFkaXVzIC0gdGhpcy5nYXVnZVdpZHRoLFxuICAgICAgICAgIG91dGVyUmFkaXVzOiB0aGlzLnJhZGl1cyxcbiAgICAgICAgICBzdGFydEFuZ2xlOiBkLnN0YXJ0QW5nbGUsXG4gICAgICAgICAgZW5kQW5nbGU6IGQuZW5kQW5nbGVcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIC8vIHZhbHVlIGFyY1xuICAgIHRoaXMuZ2F1Z2VcbiAgICAgIC5hcHBlbmQoJ3BhdGgnKVxuICAgICAgLmRhdGEodGhpcy5jYWxjdWxhdGVDdXJ2ZSh0aGlzLmNhbGN1bGF0ZU1pbk1heCgpKSlcbiAgICAgIC5hdHRyKCdjbGFzcycsICdnYXVnZS12YWx1ZScpXG4gICAgICAuYXR0cignZmlsbCcsIHRoaXMuY29sb3IpXG4gICAgICAuYXR0cignZCcsIGQgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5hcmMoe1xuICAgICAgICAgIGlubmVyUmFkaXVzOiB0aGlzLnJhZGl1cyAtIHRoaXMuZ2F1Z2VXaWR0aCxcbiAgICAgICAgICBvdXRlclJhZGl1czogdGhpcy5yYWRpdXMsXG4gICAgICAgICAgc3RhcnRBbmdsZTogZC5zdGFydEFuZ2xlLFxuICAgICAgICAgIGVuZEFuZ2xlOiBkLmVuZEFuZ2xlXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgY2FzZSAnaG9yc2VzaG9lJzpcbiAgICAgICAgdGhpcy5zdmcuYXR0cignaGVpZ2h0JywgMjMwKS5hdHRyKCd2aWV3Qm94JywgYC0ke3RoaXMud2lkdGggLyAyfSAtJHt0aGlzLmhlaWdodCAvIDJ9ICR7dGhpcy5oZWlnaHR9IDIzMGApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2hhbGZtb29uJzpcbiAgICAgICAgdGhpcy5zdmcuYXR0cignaGVpZ2h0JywgdGhpcy53aWR0aCAvIDIpO1xuICAgICAgICB0aGlzLnN2Zy5hdHRyKCd2aWV3Qm94JywgYC0ke3RoaXMud2lkdGggLyAyfSAtJHt0aGlzLndpZHRoIC8gMn0gJHt0aGlzLndpZHRofSAke3RoaXMud2lkdGggLyAyfWApO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH07XG5cbiAgdXBkYXRlQ2hhcnQgPSAoKSA9PiB7XG4gICAgbGV0IGdyb3VwID0gdGhpcy5zdmcuc2VsZWN0KCcuZ2F1Z2UtZ3JvdXAnKTtcblxuICAgIGdyb3VwXG4gICAgICAuc2VsZWN0KCcuZ2F1Z2UtdmFsdWUnKVxuICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgLmR1cmF0aW9uKDc1MClcbiAgICAgIC5jYWxsKHRoaXMuYXJjVHdlZW4sIHRoaXMuY2FsY3VsYXRlTWluTWF4KCkpO1xuXG4gICAgdGhpcy5sYWJlbFR3ZWVuID0gdGhpcy5jaGFydC5zZWxlY3QoJy5nYXVnZS1udW1iZXInKTtcblxuICAgIHRoaXMubGFiZWxUd2VlblxuICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgLmR1cmF0aW9uKDc1MClcbiAgICAgIC5jYWxsKHRoaXMudGV4dFR3ZWVuLCB0aGlzLmRhdGEudmFsdWUpO1xuICB9O1xuXG4gIGFyY1R3ZWVuID0gKHRyYW5zaXRpb24sIHZhbHVlKSA9PiB7XG4gICAgbGV0IG5ld0FuZ2xlID0gdGhpcy5jYWxjdWxhdGVDdXJ2ZSh2YWx1ZSk7XG5cbiAgICB0cmFuc2l0aW9uLmF0dHJUd2VlbignZCcsIGQgPT4ge1xuICAgICAgbGV0IGludGVycG9sYXRlID0gZDNfaW50ZXJwb2xhdGUoZC5lbmRBbmdsZSwgbmV3QW5nbGVbMF0uZW5kQW5nbGUpO1xuXG4gICAgICByZXR1cm4gdCA9PiB7XG4gICAgICAgIGQuZW5kQW5nbGUgPSBpbnRlcnBvbGF0ZSh0KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5hcmMoe1xuICAgICAgICAgIGlubmVyUmFkaXVzOiB0aGlzLnJhZGl1cyAtIHRoaXMuZ2F1Z2VXaWR0aCxcbiAgICAgICAgICBvdXRlclJhZGl1czogdGhpcy5yYWRpdXMsXG4gICAgICAgICAgc3RhcnRBbmdsZTogZC5zdGFydEFuZ2xlLFxuICAgICAgICAgIGVuZEFuZ2xlOiBkLmVuZEFuZ2xlXG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfTtcblxuICB0ZXh0VHdlZW4gPSAodHJhbnNpdGlvbiwgdmFsdWUpID0+IHtcbiAgICB2YWx1ZSA9IGQzX2Zvcm1hdCgnLjJmJykodmFsdWUpOyAvLyBUT0RPOiBjaGVjayB0aGVzZSAuMWYgZm9ybWF0cyBoZXJlLCBzaG91bGQgdGhleSBiZSBpbnB1dHM/XG4gICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC8sL2csICcuJyk7XG5cbiAgICB0cmFuc2l0aW9uLnR3ZWVuKCd0ZXh0JywgKCkgPT4ge1xuICAgICAgbGV0IGludGVycG9sYXRlID0gZDNfaW50ZXJwb2xhdGUoZDNfZm9ybWF0KCcuMmYnKSgrdGhpcy5vbGRWYWx1ZSksIHZhbHVlKTtcblxuICAgICAgcmV0dXJuIHQgPT4ge1xuICAgICAgICB0aGlzLmxhYmVsVHdlZW4udGV4dChkID0+IHtcbiAgICAgICAgICBsZXQgdXBkYXRlZE51bWJlciA9IHRoaXMubGFiZWxGb3JtYXQoaW50ZXJwb2xhdGUodCkpO1xuICAgICAgICAgIHRoaXMubGFiZWwgPSB1cGRhdGVkTnVtYmVyO1xuICAgICAgICAgIHJldHVybiB1cGRhdGVkTnVtYmVyO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH07XG59XG4iXX0=