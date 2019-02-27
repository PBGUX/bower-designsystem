/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ElementRef, HostBinding } from '@angular/core';
import { select as d3_select, arc as d3_arc, interpolate as d3_interpolate, format as d3_format } from 'd3';
import { PbdsDatavizService } from './dataviz.service';
var PbdsDatavizGaugeComponent = /** @class */ (function () {
    function PbdsDatavizGaugeComponent(_dataviz, _element) {
        var _this = this;
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
        this.degreesToRadians = function (degree) {
            return (degree * Math.PI) / 180;
        };
        this.calculateMinMax = function () {
            /** @type {?} */
            var percentage = _this.data.minvalue / (_this.data.maxvalue - _this.data.minvalue);
            return percentage * (_this.data.value - _this.data.minvalue) + (_this.data.value - _this.data.minvalue);
        };
        this.calculateCurve = function (data) {
            /** @type {?} */
            var start = _this.degreesToRadians(_this.startAngle);
            /** @type {?} */
            var end = start + (data * (_this.degreesToRadians(_this.endAngle) - start)) / _this.data.maxvalue;
            return [
                {
                    startAngle: start,
                    endAngle: end
                }
            ];
        };
        this.drawChart = function () {
            _this.gauge = _this.svg.append('g').attr('class', 'gauge-group');
            // background arc
            /** @type {?} */
            var background = _this.gauge
                .append('path')
                .data(_this.calculateCurve(_this.data.maxvalue))
                .attr('class', 'gauge-background')
                .attr('fill', _this.backgroundColor)
                .attr('d', function (d) {
                return _this.arc({
                    innerRadius: _this.radius - _this.gaugeWidth,
                    outerRadius: _this.radius,
                    startAngle: d.startAngle,
                    endAngle: d.endAngle
                });
            });
            // value arc
            _this.gauge
                .append('path')
                .data(_this.calculateCurve(_this.calculateMinMax()))
                .attr('class', 'gauge-value')
                .attr('fill', _this.color)
                .attr('d', function (d) {
                return _this.arc({
                    innerRadius: _this.radius - _this.gaugeWidth,
                    outerRadius: _this.radius,
                    startAngle: d.startAngle,
                    endAngle: d.endAngle
                });
            });
            switch (_this.type) {
                case 'horseshoe':
                    _this.svg.attr('height', 230).attr('viewBox', "-" + _this.width / 2 + " -" + _this.height / 2 + " " + _this.height + " 230");
                    break;
                case 'halfmoon':
                    _this.svg.attr('height', _this.width / 2);
                    _this.svg.attr('viewBox', "-" + _this.width / 2 + " -" + _this.width / 2 + " " + _this.width + " " + _this.width / 2);
                    break;
            }
        };
        this.updateChart = function () {
            /** @type {?} */
            var group = _this.svg.select('.gauge-group');
            group
                .select('.gauge-value')
                .transition()
                .duration(750)
                .call(_this.arcTween, _this.calculateMinMax());
            _this.labelTween = _this.chart.select('.gauge-number');
            _this.labelTween
                .transition()
                .duration(750)
                .call(_this.textTween, _this.data.value);
        };
        this.arcTween = function (transition, value) {
            /** @type {?} */
            var newAngle = _this.calculateCurve(value);
            transition.attrTween('d', function (d) {
                /** @type {?} */
                var interpolate = d3_interpolate(d.endAngle, newAngle[0].endAngle);
                return function (t) {
                    d.endAngle = interpolate(t);
                    return _this.arc({
                        innerRadius: _this.radius - _this.gaugeWidth,
                        outerRadius: _this.radius,
                        startAngle: d.startAngle,
                        endAngle: d.endAngle
                    });
                };
            });
        };
        this.textTween = function (transition, value) {
            value = d3_format('.2f')(value); // TODO: check these .1f formats here, should they be inputs?
            value = value.replace(/,/g, '.');
            transition.tween('text', function () {
                /** @type {?} */
                var interpolate = d3_interpolate(d3_format('.2f')(+_this.oldValue), value);
                return function (t) {
                    _this.labelTween.text(function (d) {
                        /** @type {?} */
                        var updatedNumber = _this.labelFormat(interpolate(t));
                        _this.label = updatedNumber;
                        return updatedNumber;
                    });
                };
            });
        };
    }
    /**
     * @return {?}
     */
    PbdsDatavizGaugeComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
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
            .attr('viewBox', "-" + this.width / 2 + " -" + this.height / 2 + " " + this.width + " " + this.height);
        this.drawChart();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    PbdsDatavizGaugeComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.data && !changes.data.firstChange) {
            // console.log(changes.data.previousValue.value, changes.data.currentValue.value);
            this.oldValue = changes.data.previousValue.value;
            this.updateChart();
        }
    };
    PbdsDatavizGaugeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'pbds-dataviz-gauge',
                    template: "\n    <div\n      *ngIf=\"!hideLabel\"\n      class=\"gauge-details\"\n      [ngClass]=\"{ halfmoon: type === 'halfmoon', 'gauge-details-small': labelSmall }\"\n    >\n      <div class=\"gauge-number\">{{ label }}</div>\n      <div *ngIf=\"description\" class=\"gauge-description text-center\">{{ description }}</div>\n    </div>\n  "
                }] }
    ];
    /** @nocollapse */
    PbdsDatavizGaugeComponent.ctorParameters = function () { return [
        { type: PbdsDatavizService },
        { type: ElementRef }
    ]; };
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
    return PbdsDatavizGaugeComponent;
}());
export { PbdsDatavizGaugeComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXZpei1nYXVnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wYi1kZXNpZ24tc3lzdGVtLyIsInNvdXJjZXMiOlsibGliL2RhdGF2aXovZGF0YXZpei1nYXVnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBRTVHLE9BQU8sRUFBRSxNQUFNLElBQUksU0FBUyxFQUFFLEdBQUcsSUFBSSxNQUFNLEVBQUUsV0FBVyxJQUFJLGNBQWMsRUFBRSxNQUFNLElBQUksU0FBUyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBRTVHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBR3ZEO0lBK0RFLG1DQUFvQixRQUE0QixFQUFVLFFBQW9CO1FBQTlFLGlCQUFrRjtRQUE5RCxhQUFRLEdBQVIsUUFBUSxDQUFvQjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVk7UUEvQzlFLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFHbEIsYUFBUSxHQUFHLElBQUksQ0FBQztRQU1oQixVQUFLLEdBQUcsR0FBRyxDQUFDO1FBR1osU0FBSSxHQUF3QyxVQUFVLENBQUM7UUFHdkQsVUFBSyxHQUFHLFNBQVMsQ0FBQztRQUdsQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBR2xCLHNCQUFpQixHQUFHLEVBQUUsQ0FBQztRQUd2QixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBTW5CLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFzRWhCLHFCQUFnQixHQUFHLFVBQUEsTUFBTTtZQUN2QixPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDbEMsQ0FBQyxDQUFDO1FBRUYsb0JBQWUsR0FBRzs7Z0JBQ1YsVUFBVSxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFH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QkFDOUIsUUFBUSxFQUFFLCtVQVNUO2lCQUVGOzs7O2dCQWhCUSxrQkFBa0I7Z0JBSlEsVUFBVTs7OzZCQXNCMUMsV0FBVyxTQUFDLGtCQUFrQjsyQkFHOUIsV0FBVyxTQUFDLHdCQUF3Qjt1QkFHcEMsS0FBSzt3QkFHTCxLQUFLO3VCQUdMLEtBQUs7d0JBR0wsS0FBSzs0QkFHTCxLQUFLO29DQUdMLEtBQUs7NkJBR0wsS0FBSzs4QkFHTCxLQUFLOzZCQUdMLEtBQUs7O0lBNkxSLGdDQUFDO0NBQUEsQUExT0QsSUEwT0M7U0E1TlkseUJBQXlCOzs7SUFDcEMsK0NBQ2tCOztJQUVsQiw2Q0FDZ0I7O0lBRWhCLHlDQUN3Qjs7SUFFeEIsMENBQ1k7O0lBRVoseUNBQ3VEOztJQUV2RCwwQ0FDa0I7O0lBRWxCLDhDQUNrQjs7SUFFbEIsc0RBQ3VCOztJQUV2QiwrQ0FDbUI7O0lBRW5CLGdEQUNZOztJQUVaLCtDQUNnQjs7Ozs7SUFFaEIsMENBQWM7Ozs7O0lBQ2Qsd0NBQVk7Ozs7O0lBQ1osMENBQWM7Ozs7O0lBQ2QsK0NBQW1COztJQUNuQiwwQ0FBYTs7Ozs7SUFDYiwrQ0FBbUI7Ozs7O0lBQ25CLDZDQUFpQjs7Ozs7SUFDakIsMkNBQWU7Ozs7O0lBQ2Ysb0RBQXdCOzs7OztJQUN4Qix3Q0FBWTs7Ozs7SUFDWixnREFBb0I7Ozs7O0lBQ3BCLDZDQUFpQjs7Ozs7SUFDakIsMkNBQWU7Ozs7O0lBQ2YsNENBQWdCOztJQXVEaEIscURBRUU7O0lBRUYsb0RBSUU7O0lBRUYsbURBVUU7O0lBRUYsOENBMENFOztJQUVGLGdEQWVFOztJQUVGLDZDQWlCRTs7SUFFRiw4Q0FlRTs7Ozs7SUExS1UsNkNBQW9DOzs7OztJQUFFLDZDQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBzZWxlY3QgYXMgZDNfc2VsZWN0LCBhcmMgYXMgZDNfYXJjLCBpbnRlcnBvbGF0ZSBhcyBkM19pbnRlcnBvbGF0ZSwgZm9ybWF0IGFzIGQzX2Zvcm1hdCB9IGZyb20gJ2QzJztcblxuaW1wb3J0IHsgUGJkc0RhdGF2aXpTZXJ2aWNlIH0gZnJvbSAnLi9kYXRhdml6LnNlcnZpY2UnO1xuaW1wb3J0IHsgSVBiZHNEYXRhdml6R2F1Z2UgfSBmcm9tICcuL2RhdGF2aXouaW50ZXJmYWNlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BiZHMtZGF0YXZpei1nYXVnZScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgKm5nSWY9XCIhaGlkZUxhYmVsXCJcbiAgICAgIGNsYXNzPVwiZ2F1Z2UtZGV0YWlsc1wiXG4gICAgICBbbmdDbGFzc109XCJ7IGhhbGZtb29uOiB0eXBlID09PSAnaGFsZm1vb24nLCAnZ2F1Z2UtZGV0YWlscy1zbWFsbCc6IGxhYmVsU21hbGwgfVwiXG4gICAgPlxuICAgICAgPGRpdiBjbGFzcz1cImdhdWdlLW51bWJlclwiPnt7IGxhYmVsIH19PC9kaXY+XG4gICAgICA8ZGl2ICpuZ0lmPVwiZGVzY3JpcHRpb25cIiBjbGFzcz1cImdhdWdlLWRlc2NyaXB0aW9uIHRleHQtY2VudGVyXCI+e3sgZGVzY3JpcHRpb24gfX08L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBQYmRzRGF0YXZpekdhdWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnBiZHMtY2hhcnQnKVxuICBjaGFydENsYXNzID0gdHJ1ZTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnBiZHMtY2hhcnQtZ2F1Z2UnKVxuICBwaWVDbGFzcyA9IHRydWU7XG5cbiAgQElucHV0KClcbiAgZGF0YTogSVBiZHNEYXRhdml6R2F1Z2U7XG5cbiAgQElucHV0KClcbiAgd2lkdGggPSAzMDA7XG5cbiAgQElucHV0KClcbiAgdHlwZTogJ2hhbGZtb29uJyB8ICdob3JzZXNob2UnIHwgJ2NpcmNsZScgPSAnaGFsZm1vb24nO1xuXG4gIEBJbnB1dCgpXG4gIGNvbG9yID0gJyNjZjA5ODknO1xuXG4gIEBJbnB1dCgpXG4gIGhpZGVMYWJlbCA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIGxhYmVsRm9ybWF0U3RyaW5nID0gJyc7XG5cbiAgQElucHV0KClcbiAgbGFiZWxTbWFsbCA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIGRlc2NyaXB0aW9uO1xuXG4gIEBJbnB1dCgpXG4gIGdhdWdlV2lkdGggPSAyMDtcblxuICBwcml2YXRlIGNoYXJ0O1xuICBwcml2YXRlIHN2ZztcbiAgcHJpdmF0ZSBnYXVnZTtcbiAgcHJpdmF0ZSBsYWJlbFR3ZWVuOyAvLyBUT0RPOiByZW5hbWUgdGhpc1xuICBwdWJsaWMgbGFiZWw7XG4gIHByaXZhdGUgc3RhcnRBbmdsZTtcbiAgcHJpdmF0ZSBlbmRBbmdsZTtcbiAgcHJpdmF0ZSByYWRpdXM7XG4gIHByaXZhdGUgYmFja2dyb3VuZENvbG9yOyAvLyBUT0RPOiBzaG91bGQgdGhpcyBiZSBhbiBpbnB1dD9cbiAgcHJpdmF0ZSBhcmM7XG4gIHByaXZhdGUgbGFiZWxGb3JtYXQ7XG4gIHByaXZhdGUgb2xkVmFsdWU7XG4gIHByaXZhdGUgaGVpZ2h0O1xuICBwcml2YXRlIHJvdW5kZWQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZGF0YXZpejogUGJkc0RhdGF2aXpTZXJ2aWNlLCBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy53aWR0aDtcbiAgICB0aGlzLnJhZGl1cyA9IE1hdGgubWF4KHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KSAvIDI7XG4gICAgdGhpcy5sYWJlbEZvcm1hdCA9IGQzX2Zvcm1hdCh0aGlzLmxhYmVsRm9ybWF0U3RyaW5nKTtcbiAgICB0aGlzLmJhY2tncm91bmRDb2xvciA9ICcjRjBGMEYwJztcbiAgICB0aGlzLmxhYmVsID0gdGhpcy5sYWJlbEZvcm1hdCh0aGlzLmRhdGEudmFsdWUpO1xuXG4gICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgIGNhc2UgJ2hhbGZtb29uJzpcbiAgICAgICAgdGhpcy5zdGFydEFuZ2xlID0gLTkwO1xuICAgICAgICB0aGlzLmVuZEFuZ2xlID0gOTA7XG4gICAgICAgIHRoaXMucm91bmRlZCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdob3JzZXNob2UnOlxuICAgICAgICB0aGlzLnN0YXJ0QW5nbGUgPSAtMTQwO1xuICAgICAgICB0aGlzLmVuZEFuZ2xlID0gMTQwO1xuICAgICAgICB0aGlzLnJvdW5kZWQgPSB0cnVlO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnY2lyY2xlJzpcbiAgICAgICAgdGhpcy5zdGFydEFuZ2xlID0gMDtcbiAgICAgICAgdGhpcy5lbmRBbmdsZSA9IDM2MDtcbiAgICAgICAgdGhpcy5yb3VuZGVkID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHRoaXMuYXJjID0gZDNfYXJjKCkuY29ybmVyUmFkaXVzKHRoaXMucm91bmRlZCA/IHRoaXMuZ2F1Z2VXaWR0aCA6IDApO1xuXG4gICAgdGhpcy5jaGFydCA9IGQzX3NlbGVjdCh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuICAgIHRoaXMuc3ZnID0gdGhpcy5jaGFydFxuICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgIC5hdHRyKCd3aWR0aCcsIHRoaXMud2lkdGgpXG4gICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy5oZWlnaHQpXG4gICAgICAuYXR0cignY2xhc3MnLCAnaW1nLWZsdWlkJykgLy8gdG8gcmVzaXplIGNoYXJ0XG4gICAgICAuYXR0cigncHJlc2VydmVBc3BlY3RSYXRpbycsICd4TWluWU1pbiBtZWV0JylcbiAgICAgIC5hdHRyKCd2aWV3Qm94JywgYC0ke3RoaXMud2lkdGggLyAyfSAtJHt0aGlzLmhlaWdodCAvIDJ9ICR7dGhpcy53aWR0aH0gJHt0aGlzLmhlaWdodH1gKTtcblxuICAgIHRoaXMuZHJhd0NoYXJ0KCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMuZGF0YSAmJiAhY2hhbmdlcy5kYXRhLmZpcnN0Q2hhbmdlKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhjaGFuZ2VzLmRhdGEucHJldmlvdXNWYWx1ZS52YWx1ZSwgY2hhbmdlcy5kYXRhLmN1cnJlbnRWYWx1ZS52YWx1ZSk7XG5cbiAgICAgIHRoaXMub2xkVmFsdWUgPSBjaGFuZ2VzLmRhdGEucHJldmlvdXNWYWx1ZS52YWx1ZTtcbiAgICAgIHRoaXMudXBkYXRlQ2hhcnQoKTtcbiAgICB9XG4gIH1cblxuICBkZWdyZWVzVG9SYWRpYW5zID0gZGVncmVlID0+IHtcbiAgICByZXR1cm4gKGRlZ3JlZSAqIE1hdGguUEkpIC8gMTgwO1xuICB9O1xuXG4gIGNhbGN1bGF0ZU1pbk1heCA9ICgpID0+IHtcbiAgICBjb25zdCBwZXJjZW50YWdlID0gdGhpcy5kYXRhLm1pbnZhbHVlIC8gKHRoaXMuZGF0YS5tYXh2YWx1ZSAtIHRoaXMuZGF0YS5taW52YWx1ZSk7XG5cbiAgICByZXR1cm4gcGVyY2VudGFnZSAqICh0aGlzLmRhdGEudmFsdWUgLSB0aGlzLmRhdGEubWludmFsdWUpICsgKHRoaXMuZGF0YS52YWx1ZSAtIHRoaXMuZGF0YS5taW52YWx1ZSk7XG4gIH07XG5cbiAgY2FsY3VsYXRlQ3VydmUgPSBkYXRhID0+IHtcbiAgICBjb25zdCBzdGFydCA9IHRoaXMuZGVncmVlc1RvUmFkaWFucyh0aGlzLnN0YXJ0QW5nbGUpO1xuICAgIGNvbnN0IGVuZCA9IHN0YXJ0ICsgKGRhdGEgKiAodGhpcy5kZWdyZWVzVG9SYWRpYW5zKHRoaXMuZW5kQW5nbGUpIC0gc3RhcnQpKSAvIHRoaXMuZGF0YS5tYXh2YWx1ZTtcblxuICAgIHJldHVybiBbXG4gICAgICB7XG4gICAgICAgIHN0YXJ0QW5nbGU6IHN0YXJ0LFxuICAgICAgICBlbmRBbmdsZTogZW5kXG4gICAgICB9XG4gICAgXTtcbiAgfTtcblxuICBkcmF3Q2hhcnQgPSAoKSA9PiB7XG4gICAgdGhpcy5nYXVnZSA9IHRoaXMuc3ZnLmFwcGVuZCgnZycpLmF0dHIoJ2NsYXNzJywgJ2dhdWdlLWdyb3VwJyk7XG5cbiAgICAvLyBiYWNrZ3JvdW5kIGFyY1xuICAgIGNvbnN0IGJhY2tncm91bmQgPSB0aGlzLmdhdWdlXG4gICAgICAuYXBwZW5kKCdwYXRoJylcbiAgICAgIC5kYXRhKHRoaXMuY2FsY3VsYXRlQ3VydmUodGhpcy5kYXRhLm1heHZhbHVlKSlcbiAgICAgIC5hdHRyKCdjbGFzcycsICdnYXVnZS1iYWNrZ3JvdW5kJylcbiAgICAgIC5hdHRyKCdmaWxsJywgdGhpcy5iYWNrZ3JvdW5kQ29sb3IpXG4gICAgICAuYXR0cignZCcsIGQgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5hcmMoe1xuICAgICAgICAgIGlubmVyUmFkaXVzOiB0aGlzLnJhZGl1cyAtIHRoaXMuZ2F1Z2VXaWR0aCxcbiAgICAgICAgICBvdXRlclJhZGl1czogdGhpcy5yYWRpdXMsXG4gICAgICAgICAgc3RhcnRBbmdsZTogZC5zdGFydEFuZ2xlLFxuICAgICAgICAgIGVuZEFuZ2xlOiBkLmVuZEFuZ2xlXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAvLyB2YWx1ZSBhcmNcbiAgICB0aGlzLmdhdWdlXG4gICAgICAuYXBwZW5kKCdwYXRoJylcbiAgICAgIC5kYXRhKHRoaXMuY2FsY3VsYXRlQ3VydmUodGhpcy5jYWxjdWxhdGVNaW5NYXgoKSkpXG4gICAgICAuYXR0cignY2xhc3MnLCAnZ2F1Z2UtdmFsdWUnKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCB0aGlzLmNvbG9yKVxuICAgICAgLmF0dHIoJ2QnLCBkID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXJjKHtcbiAgICAgICAgICBpbm5lclJhZGl1czogdGhpcy5yYWRpdXMgLSB0aGlzLmdhdWdlV2lkdGgsXG4gICAgICAgICAgb3V0ZXJSYWRpdXM6IHRoaXMucmFkaXVzLFxuICAgICAgICAgIHN0YXJ0QW5nbGU6IGQuc3RhcnRBbmdsZSxcbiAgICAgICAgICBlbmRBbmdsZTogZC5lbmRBbmdsZVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgIGNhc2UgJ2hvcnNlc2hvZSc6XG4gICAgICAgIHRoaXMuc3ZnLmF0dHIoJ2hlaWdodCcsIDIzMCkuYXR0cigndmlld0JveCcsIGAtJHt0aGlzLndpZHRoIC8gMn0gLSR7dGhpcy5oZWlnaHQgLyAyfSAke3RoaXMuaGVpZ2h0fSAyMzBgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdoYWxmbW9vbic6XG4gICAgICAgIHRoaXMuc3ZnLmF0dHIoJ2hlaWdodCcsIHRoaXMud2lkdGggLyAyKTtcbiAgICAgICAgdGhpcy5zdmcuYXR0cigndmlld0JveCcsIGAtJHt0aGlzLndpZHRoIC8gMn0gLSR7dGhpcy53aWR0aCAvIDJ9ICR7dGhpcy53aWR0aH0gJHt0aGlzLndpZHRoIC8gMn1gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9O1xuXG4gIHVwZGF0ZUNoYXJ0ID0gKCkgPT4ge1xuICAgIGxldCBncm91cCA9IHRoaXMuc3ZnLnNlbGVjdCgnLmdhdWdlLWdyb3VwJyk7XG5cbiAgICBncm91cFxuICAgICAgLnNlbGVjdCgnLmdhdWdlLXZhbHVlJylcbiAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgIC5kdXJhdGlvbig3NTApXG4gICAgICAuY2FsbCh0aGlzLmFyY1R3ZWVuLCB0aGlzLmNhbGN1bGF0ZU1pbk1heCgpKTtcblxuICAgIHRoaXMubGFiZWxUd2VlbiA9IHRoaXMuY2hhcnQuc2VsZWN0KCcuZ2F1Z2UtbnVtYmVyJyk7XG5cbiAgICB0aGlzLmxhYmVsVHdlZW5cbiAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgIC5kdXJhdGlvbig3NTApXG4gICAgICAuY2FsbCh0aGlzLnRleHRUd2VlbiwgdGhpcy5kYXRhLnZhbHVlKTtcbiAgfTtcblxuICBhcmNUd2VlbiA9ICh0cmFuc2l0aW9uLCB2YWx1ZSkgPT4ge1xuICAgIGxldCBuZXdBbmdsZSA9IHRoaXMuY2FsY3VsYXRlQ3VydmUodmFsdWUpO1xuXG4gICAgdHJhbnNpdGlvbi5hdHRyVHdlZW4oJ2QnLCBkID0+IHtcbiAgICAgIGxldCBpbnRlcnBvbGF0ZSA9IGQzX2ludGVycG9sYXRlKGQuZW5kQW5nbGUsIG5ld0FuZ2xlWzBdLmVuZEFuZ2xlKTtcblxuICAgICAgcmV0dXJuIHQgPT4ge1xuICAgICAgICBkLmVuZEFuZ2xlID0gaW50ZXJwb2xhdGUodCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYXJjKHtcbiAgICAgICAgICBpbm5lclJhZGl1czogdGhpcy5yYWRpdXMgLSB0aGlzLmdhdWdlV2lkdGgsXG4gICAgICAgICAgb3V0ZXJSYWRpdXM6IHRoaXMucmFkaXVzLFxuICAgICAgICAgIHN0YXJ0QW5nbGU6IGQuc3RhcnRBbmdsZSxcbiAgICAgICAgICBlbmRBbmdsZTogZC5lbmRBbmdsZVxuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH07XG5cbiAgdGV4dFR3ZWVuID0gKHRyYW5zaXRpb24sIHZhbHVlKSA9PiB7XG4gICAgdmFsdWUgPSBkM19mb3JtYXQoJy4yZicpKHZhbHVlKTsgLy8gVE9ETzogY2hlY2sgdGhlc2UgLjFmIGZvcm1hdHMgaGVyZSwgc2hvdWxkIHRoZXkgYmUgaW5wdXRzP1xuICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvLC9nLCAnLicpO1xuXG4gICAgdHJhbnNpdGlvbi50d2VlbigndGV4dCcsICgpID0+IHtcbiAgICAgIGxldCBpbnRlcnBvbGF0ZSA9IGQzX2ludGVycG9sYXRlKGQzX2Zvcm1hdCgnLjJmJykoK3RoaXMub2xkVmFsdWUpLCB2YWx1ZSk7XG5cbiAgICAgIHJldHVybiB0ID0+IHtcbiAgICAgICAgdGhpcy5sYWJlbFR3ZWVuLnRleHQoZCA9PiB7XG4gICAgICAgICAgbGV0IHVwZGF0ZWROdW1iZXIgPSB0aGlzLmxhYmVsRm9ybWF0KGludGVycG9sYXRlKHQpKTtcbiAgICAgICAgICB0aGlzLmxhYmVsID0gdXBkYXRlZE51bWJlcjtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlZE51bWJlcjtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9O1xufVxuIl19