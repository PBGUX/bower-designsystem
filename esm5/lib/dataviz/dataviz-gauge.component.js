/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.degreesToRadians = (/**
         * @param {?} degree
         * @return {?}
         */
        function (degree) {
            return (degree * Math.PI) / 180;
        });
        this.calculateMinMax = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var percentage = _this.data.minvalue / (_this.data.maxvalue - _this.data.minvalue);
            return percentage * (_this.data.value - _this.data.minvalue) + (_this.data.value - _this.data.minvalue);
        });
        this.calculateCurve = (/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
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
        });
        this.drawChart = (/**
         * @return {?}
         */
        function () {
            _this.gauge = _this.svg.append('g').attr('class', 'gauge-group');
            // background arc
            /** @type {?} */
            var background = _this.gauge
                .append('path')
                .data(_this.calculateCurve(_this.data.maxvalue))
                .attr('class', 'gauge-background')
                .attr('fill', _this.backgroundColor)
                .attr('d', (/**
             * @param {?} d
             * @return {?}
             */
            function (d) {
                return _this.arc({
                    innerRadius: _this.radius - _this.gaugeWidth,
                    outerRadius: _this.radius,
                    startAngle: d.startAngle,
                    endAngle: d.endAngle
                });
            }));
            // value arc
            _this.gauge
                .append('path')
                .data(_this.calculateCurve(_this.calculateMinMax()))
                .attr('class', 'gauge-value')
                .attr('fill', _this.color)
                .attr('d', (/**
             * @param {?} d
             * @return {?}
             */
            function (d) {
                return _this.arc({
                    innerRadius: _this.radius - _this.gaugeWidth,
                    outerRadius: _this.radius,
                    startAngle: d.startAngle,
                    endAngle: d.endAngle
                });
            }));
            switch (_this.type) {
                case 'horseshoe':
                    _this.svg.attr('height', 230).attr('viewBox', "-" + _this.width / 2 + " -" + _this.height / 2 + " " + _this.height + " 230");
                    break;
                case 'halfmoon':
                    _this.svg.attr('height', _this.width / 2);
                    _this.svg.attr('viewBox', "-" + _this.width / 2 + " -" + _this.width / 2 + " " + _this.width + " " + _this.width / 2);
                    break;
            }
        });
        this.updateChart = (/**
         * @return {?}
         */
        function () {
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
        });
        this.arcTween = (/**
         * @param {?} transition
         * @param {?} value
         * @return {?}
         */
        function (transition, value) {
            /** @type {?} */
            var newAngle = _this.calculateCurve(value);
            transition.attrTween('d', (/**
             * @param {?} d
             * @return {?}
             */
            function (d) {
                /** @type {?} */
                var interpolate = d3_interpolate(d.endAngle, newAngle[0].endAngle);
                return (/**
                 * @param {?} t
                 * @return {?}
                 */
                function (t) {
                    d.endAngle = interpolate(t);
                    return _this.arc({
                        innerRadius: _this.radius - _this.gaugeWidth,
                        outerRadius: _this.radius,
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
        function (transition, value) {
            value = d3_format('.2f')(value); // TODO: check these .1f formats here, should they be inputs?
            value = value.replace(/,/g, '.');
            transition.tween('text', (/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var interpolate = d3_interpolate(d3_format('.2f')(+_this.oldValue), value);
                return (/**
                 * @param {?} t
                 * @return {?}
                 */
                function (t) {
                    _this.labelTween.text((/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) {
                        /** @type {?} */
                        var updatedNumber = _this.labelFormat(interpolate(t));
                        _this.label = updatedNumber;
                        return updatedNumber;
                    }));
                });
            }));
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXZpei1nYXVnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wYi1kZXNpZ24tc3lzdGVtLyIsInNvdXJjZXMiOlsibGliL2RhdGF2aXovZGF0YXZpei1nYXVnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBRTVHLE9BQU8sRUFBRSxNQUFNLElBQUksU0FBUyxFQUFFLEdBQUcsSUFBSSxNQUFNLEVBQUUsV0FBVyxJQUFJLGNBQWMsRUFBRSxNQUFNLElBQUksU0FBUyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBRTVHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBR3ZEO0lBK0RFLG1DQUFvQixRQUE0QixFQUFVLFFBQW9CO1FBQTlFLGlCQUFrRjtRQUE5RCxhQUFRLEdBQVIsUUFBUSxDQUFvQjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVk7UUEvQzlFLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFHbEIsYUFBUSxHQUFHLElBQUksQ0FBQztRQU1oQixVQUFLLEdBQUcsR0FBRyxDQUFDO1FBR1osU0FBSSxHQUF3QyxVQUFVLENBQUM7UUFHdkQsVUFBSyxHQUFHLFNBQVMsQ0FBQztRQUdsQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBR2xCLHNCQUFpQixHQUFHLEVBQUUsQ0FBQztRQUd2QixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBTW5CLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFzRWhCLHFCQUFnQjs7OztRQUFHLFVBQUEsTUFBTTtZQUN2QixPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDbEMsQ0FBQyxFQUFDO1FBRUYsb0JBQWU7OztRQUFHOztnQkFDVixVQUFVLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxRQUFR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OztnQkFsSEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSwrVUFTVDtpQkFFRjs7OztnQkFoQlEsa0JBQWtCO2dCQUpRLFVBQVU7Ozs2QkFzQjFDLFdBQVcsU0FBQyxrQkFBa0I7MkJBRzlCLFdBQVcsU0FBQyx3QkFBd0I7dUJBR3BDLEtBQUs7d0JBR0wsS0FBSzt1QkFHTCxLQUFLO3dCQUdMLEtBQUs7NEJBR0wsS0FBSztvQ0FHTCxLQUFLOzZCQUdMLEtBQUs7OEJBR0wsS0FBSzs2QkFHTCxLQUFLOztJQTZMUixnQ0FBQztDQUFBLEFBMU9ELElBME9DO1NBNU5ZLHlCQUF5Qjs7O0lBQ3BDLCtDQUNrQjs7SUFFbEIsNkNBQ2dCOztJQUVoQix5Q0FDdUI7O0lBRXZCLDBDQUNZOztJQUVaLHlDQUN1RDs7SUFFdkQsMENBQ2tCOztJQUVsQiw4Q0FDa0I7O0lBRWxCLHNEQUN1Qjs7SUFFdkIsK0NBQ21COztJQUVuQixnREFDWTs7SUFFWiwrQ0FDZ0I7Ozs7O0lBRWhCLDBDQUFjOzs7OztJQUNkLHdDQUFZOzs7OztJQUNaLDBDQUFjOzs7OztJQUNkLCtDQUFtQjs7SUFDbkIsMENBQWE7Ozs7O0lBQ2IsK0NBQW1COzs7OztJQUNuQiw2Q0FBaUI7Ozs7O0lBQ2pCLDJDQUFlOzs7OztJQUNmLG9EQUF3Qjs7Ozs7SUFDeEIsd0NBQVk7Ozs7O0lBQ1osZ0RBQW9COzs7OztJQUNwQiw2Q0FBaUI7Ozs7O0lBQ2pCLDJDQUFlOzs7OztJQUNmLDRDQUFnQjs7SUF1RGhCLHFEQUVFOztJQUVGLG9EQUlFOztJQUVGLG1EQVVFOztJQUVGLDhDQTBDRTs7SUFFRixnREFlRTs7SUFFRiw2Q0FpQkU7O0lBRUYsOENBZUU7Ozs7O0lBMUtVLDZDQUFvQzs7Ozs7SUFBRSw2Q0FBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgc2VsZWN0IGFzIGQzX3NlbGVjdCwgYXJjIGFzIGQzX2FyYywgaW50ZXJwb2xhdGUgYXMgZDNfaW50ZXJwb2xhdGUsIGZvcm1hdCBhcyBkM19mb3JtYXQgfSBmcm9tICdkMyc7XG5cbmltcG9ydCB7IFBiZHNEYXRhdml6U2VydmljZSB9IGZyb20gJy4vZGF0YXZpei5zZXJ2aWNlJztcbmltcG9ydCB7IFBiZHNEYXRhdml6R2F1Z2UgfSBmcm9tICcuL2RhdGF2aXouaW50ZXJmYWNlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BiZHMtZGF0YXZpei1nYXVnZScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgKm5nSWY9XCIhaGlkZUxhYmVsXCJcbiAgICAgIGNsYXNzPVwiZ2F1Z2UtZGV0YWlsc1wiXG4gICAgICBbbmdDbGFzc109XCJ7IGhhbGZtb29uOiB0eXBlID09PSAnaGFsZm1vb24nLCAnZ2F1Z2UtZGV0YWlscy1zbWFsbCc6IGxhYmVsU21hbGwgfVwiXG4gICAgPlxuICAgICAgPGRpdiBjbGFzcz1cImdhdWdlLW51bWJlclwiPnt7IGxhYmVsIH19PC9kaXY+XG4gICAgICA8ZGl2ICpuZ0lmPVwiZGVzY3JpcHRpb25cIiBjbGFzcz1cImdhdWdlLWRlc2NyaXB0aW9uIHRleHQtY2VudGVyXCI+e3sgZGVzY3JpcHRpb24gfX08L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBQYmRzRGF0YXZpekdhdWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnBiZHMtY2hhcnQnKVxuICBjaGFydENsYXNzID0gdHJ1ZTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnBiZHMtY2hhcnQtZ2F1Z2UnKVxuICBwaWVDbGFzcyA9IHRydWU7XG5cbiAgQElucHV0KClcbiAgZGF0YTogUGJkc0RhdGF2aXpHYXVnZTtcblxuICBASW5wdXQoKVxuICB3aWR0aCA9IDMwMDtcblxuICBASW5wdXQoKVxuICB0eXBlOiAnaGFsZm1vb24nIHwgJ2hvcnNlc2hvZScgfCAnY2lyY2xlJyA9ICdoYWxmbW9vbic7XG5cbiAgQElucHV0KClcbiAgY29sb3IgPSAnI2NmMDk4OSc7XG5cbiAgQElucHV0KClcbiAgaGlkZUxhYmVsID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgbGFiZWxGb3JtYXRTdHJpbmcgPSAnJztcblxuICBASW5wdXQoKVxuICBsYWJlbFNtYWxsID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgZGVzY3JpcHRpb247XG5cbiAgQElucHV0KClcbiAgZ2F1Z2VXaWR0aCA9IDIwO1xuXG4gIHByaXZhdGUgY2hhcnQ7XG4gIHByaXZhdGUgc3ZnO1xuICBwcml2YXRlIGdhdWdlO1xuICBwcml2YXRlIGxhYmVsVHdlZW47IC8vIFRPRE86IHJlbmFtZSB0aGlzXG4gIHB1YmxpYyBsYWJlbDtcbiAgcHJpdmF0ZSBzdGFydEFuZ2xlO1xuICBwcml2YXRlIGVuZEFuZ2xlO1xuICBwcml2YXRlIHJhZGl1cztcbiAgcHJpdmF0ZSBiYWNrZ3JvdW5kQ29sb3I7IC8vIFRPRE86IHNob3VsZCB0aGlzIGJlIGFuIGlucHV0P1xuICBwcml2YXRlIGFyYztcbiAgcHJpdmF0ZSBsYWJlbEZvcm1hdDtcbiAgcHJpdmF0ZSBvbGRWYWx1ZTtcbiAgcHJpdmF0ZSBoZWlnaHQ7XG4gIHByaXZhdGUgcm91bmRlZDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9kYXRhdml6OiBQYmRzRGF0YXZpelNlcnZpY2UsIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLndpZHRoO1xuICAgIHRoaXMucmFkaXVzID0gTWF0aC5tYXgodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpIC8gMjtcbiAgICB0aGlzLmxhYmVsRm9ybWF0ID0gZDNfZm9ybWF0KHRoaXMubGFiZWxGb3JtYXRTdHJpbmcpO1xuICAgIHRoaXMuYmFja2dyb3VuZENvbG9yID0gJyNGMEYwRjAnO1xuICAgIHRoaXMubGFiZWwgPSB0aGlzLmxhYmVsRm9ybWF0KHRoaXMuZGF0YS52YWx1ZSk7XG5cbiAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgY2FzZSAnaGFsZm1vb24nOlxuICAgICAgICB0aGlzLnN0YXJ0QW5nbGUgPSAtOTA7XG4gICAgICAgIHRoaXMuZW5kQW5nbGUgPSA5MDtcbiAgICAgICAgdGhpcy5yb3VuZGVkID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2hvcnNlc2hvZSc6XG4gICAgICAgIHRoaXMuc3RhcnRBbmdsZSA9IC0xNDA7XG4gICAgICAgIHRoaXMuZW5kQW5nbGUgPSAxNDA7XG4gICAgICAgIHRoaXMucm91bmRlZCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdjaXJjbGUnOlxuICAgICAgICB0aGlzLnN0YXJ0QW5nbGUgPSAwO1xuICAgICAgICB0aGlzLmVuZEFuZ2xlID0gMzYwO1xuICAgICAgICB0aGlzLnJvdW5kZWQgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgdGhpcy5hcmMgPSBkM19hcmMoKS5jb3JuZXJSYWRpdXModGhpcy5yb3VuZGVkID8gdGhpcy5nYXVnZVdpZHRoIDogMCk7XG5cbiAgICB0aGlzLmNoYXJ0ID0gZDNfc2VsZWN0KHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCkuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4gICAgdGhpcy5zdmcgPSB0aGlzLmNoYXJ0XG4gICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgLmF0dHIoJ3dpZHRoJywgdGhpcy53aWR0aClcbiAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmhlaWdodClcbiAgICAgIC5hdHRyKCdjbGFzcycsICdpbWctZmx1aWQnKSAvLyB0byByZXNpemUgY2hhcnRcbiAgICAgIC5hdHRyKCdwcmVzZXJ2ZUFzcGVjdFJhdGlvJywgJ3hNaW5ZTWluIG1lZXQnKVxuICAgICAgLmF0dHIoJ3ZpZXdCb3gnLCBgLSR7dGhpcy53aWR0aCAvIDJ9IC0ke3RoaXMuaGVpZ2h0IC8gMn0gJHt0aGlzLndpZHRofSAke3RoaXMuaGVpZ2h0fWApO1xuXG4gICAgdGhpcy5kcmF3Q2hhcnQoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5kYXRhICYmICFjaGFuZ2VzLmRhdGEuZmlyc3RDaGFuZ2UpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGNoYW5nZXMuZGF0YS5wcmV2aW91c1ZhbHVlLnZhbHVlLCBjaGFuZ2VzLmRhdGEuY3VycmVudFZhbHVlLnZhbHVlKTtcblxuICAgICAgdGhpcy5vbGRWYWx1ZSA9IGNoYW5nZXMuZGF0YS5wcmV2aW91c1ZhbHVlLnZhbHVlO1xuICAgICAgdGhpcy51cGRhdGVDaGFydCgpO1xuICAgIH1cbiAgfVxuXG4gIGRlZ3JlZXNUb1JhZGlhbnMgPSBkZWdyZWUgPT4ge1xuICAgIHJldHVybiAoZGVncmVlICogTWF0aC5QSSkgLyAxODA7XG4gIH07XG5cbiAgY2FsY3VsYXRlTWluTWF4ID0gKCkgPT4ge1xuICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSB0aGlzLmRhdGEubWludmFsdWUgLyAodGhpcy5kYXRhLm1heHZhbHVlIC0gdGhpcy5kYXRhLm1pbnZhbHVlKTtcblxuICAgIHJldHVybiBwZXJjZW50YWdlICogKHRoaXMuZGF0YS52YWx1ZSAtIHRoaXMuZGF0YS5taW52YWx1ZSkgKyAodGhpcy5kYXRhLnZhbHVlIC0gdGhpcy5kYXRhLm1pbnZhbHVlKTtcbiAgfTtcblxuICBjYWxjdWxhdGVDdXJ2ZSA9IGRhdGEgPT4ge1xuICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5kZWdyZWVzVG9SYWRpYW5zKHRoaXMuc3RhcnRBbmdsZSk7XG4gICAgY29uc3QgZW5kID0gc3RhcnQgKyAoZGF0YSAqICh0aGlzLmRlZ3JlZXNUb1JhZGlhbnModGhpcy5lbmRBbmdsZSkgLSBzdGFydCkpIC8gdGhpcy5kYXRhLm1heHZhbHVlO1xuXG4gICAgcmV0dXJuIFtcbiAgICAgIHtcbiAgICAgICAgc3RhcnRBbmdsZTogc3RhcnQsXG4gICAgICAgIGVuZEFuZ2xlOiBlbmRcbiAgICAgIH1cbiAgICBdO1xuICB9O1xuXG4gIGRyYXdDaGFydCA9ICgpID0+IHtcbiAgICB0aGlzLmdhdWdlID0gdGhpcy5zdmcuYXBwZW5kKCdnJykuYXR0cignY2xhc3MnLCAnZ2F1Z2UtZ3JvdXAnKTtcblxuICAgIC8vIGJhY2tncm91bmQgYXJjXG4gICAgY29uc3QgYmFja2dyb3VuZCA9IHRoaXMuZ2F1Z2VcbiAgICAgIC5hcHBlbmQoJ3BhdGgnKVxuICAgICAgLmRhdGEodGhpcy5jYWxjdWxhdGVDdXJ2ZSh0aGlzLmRhdGEubWF4dmFsdWUpKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dhdWdlLWJhY2tncm91bmQnKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCB0aGlzLmJhY2tncm91bmRDb2xvcilcbiAgICAgIC5hdHRyKCdkJywgZCA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmFyYyh7XG4gICAgICAgICAgaW5uZXJSYWRpdXM6IHRoaXMucmFkaXVzIC0gdGhpcy5nYXVnZVdpZHRoLFxuICAgICAgICAgIG91dGVyUmFkaXVzOiB0aGlzLnJhZGl1cyxcbiAgICAgICAgICBzdGFydEFuZ2xlOiBkLnN0YXJ0QW5nbGUsXG4gICAgICAgICAgZW5kQW5nbGU6IGQuZW5kQW5nbGVcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIC8vIHZhbHVlIGFyY1xuICAgIHRoaXMuZ2F1Z2VcbiAgICAgIC5hcHBlbmQoJ3BhdGgnKVxuICAgICAgLmRhdGEodGhpcy5jYWxjdWxhdGVDdXJ2ZSh0aGlzLmNhbGN1bGF0ZU1pbk1heCgpKSlcbiAgICAgIC5hdHRyKCdjbGFzcycsICdnYXVnZS12YWx1ZScpXG4gICAgICAuYXR0cignZmlsbCcsIHRoaXMuY29sb3IpXG4gICAgICAuYXR0cignZCcsIGQgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5hcmMoe1xuICAgICAgICAgIGlubmVyUmFkaXVzOiB0aGlzLnJhZGl1cyAtIHRoaXMuZ2F1Z2VXaWR0aCxcbiAgICAgICAgICBvdXRlclJhZGl1czogdGhpcy5yYWRpdXMsXG4gICAgICAgICAgc3RhcnRBbmdsZTogZC5zdGFydEFuZ2xlLFxuICAgICAgICAgIGVuZEFuZ2xlOiBkLmVuZEFuZ2xlXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgY2FzZSAnaG9yc2VzaG9lJzpcbiAgICAgICAgdGhpcy5zdmcuYXR0cignaGVpZ2h0JywgMjMwKS5hdHRyKCd2aWV3Qm94JywgYC0ke3RoaXMud2lkdGggLyAyfSAtJHt0aGlzLmhlaWdodCAvIDJ9ICR7dGhpcy5oZWlnaHR9IDIzMGApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2hhbGZtb29uJzpcbiAgICAgICAgdGhpcy5zdmcuYXR0cignaGVpZ2h0JywgdGhpcy53aWR0aCAvIDIpO1xuICAgICAgICB0aGlzLnN2Zy5hdHRyKCd2aWV3Qm94JywgYC0ke3RoaXMud2lkdGggLyAyfSAtJHt0aGlzLndpZHRoIC8gMn0gJHt0aGlzLndpZHRofSAke3RoaXMud2lkdGggLyAyfWApO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH07XG5cbiAgdXBkYXRlQ2hhcnQgPSAoKSA9PiB7XG4gICAgbGV0IGdyb3VwID0gdGhpcy5zdmcuc2VsZWN0KCcuZ2F1Z2UtZ3JvdXAnKTtcblxuICAgIGdyb3VwXG4gICAgICAuc2VsZWN0KCcuZ2F1Z2UtdmFsdWUnKVxuICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgLmR1cmF0aW9uKDc1MClcbiAgICAgIC5jYWxsKHRoaXMuYXJjVHdlZW4sIHRoaXMuY2FsY3VsYXRlTWluTWF4KCkpO1xuXG4gICAgdGhpcy5sYWJlbFR3ZWVuID0gdGhpcy5jaGFydC5zZWxlY3QoJy5nYXVnZS1udW1iZXInKTtcblxuICAgIHRoaXMubGFiZWxUd2VlblxuICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgLmR1cmF0aW9uKDc1MClcbiAgICAgIC5jYWxsKHRoaXMudGV4dFR3ZWVuLCB0aGlzLmRhdGEudmFsdWUpO1xuICB9O1xuXG4gIGFyY1R3ZWVuID0gKHRyYW5zaXRpb24sIHZhbHVlKSA9PiB7XG4gICAgbGV0IG5ld0FuZ2xlID0gdGhpcy5jYWxjdWxhdGVDdXJ2ZSh2YWx1ZSk7XG5cbiAgICB0cmFuc2l0aW9uLmF0dHJUd2VlbignZCcsIGQgPT4ge1xuICAgICAgbGV0IGludGVycG9sYXRlID0gZDNfaW50ZXJwb2xhdGUoZC5lbmRBbmdsZSwgbmV3QW5nbGVbMF0uZW5kQW5nbGUpO1xuXG4gICAgICByZXR1cm4gdCA9PiB7XG4gICAgICAgIGQuZW5kQW5nbGUgPSBpbnRlcnBvbGF0ZSh0KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5hcmMoe1xuICAgICAgICAgIGlubmVyUmFkaXVzOiB0aGlzLnJhZGl1cyAtIHRoaXMuZ2F1Z2VXaWR0aCxcbiAgICAgICAgICBvdXRlclJhZGl1czogdGhpcy5yYWRpdXMsXG4gICAgICAgICAgc3RhcnRBbmdsZTogZC5zdGFydEFuZ2xlLFxuICAgICAgICAgIGVuZEFuZ2xlOiBkLmVuZEFuZ2xlXG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfTtcblxuICB0ZXh0VHdlZW4gPSAodHJhbnNpdGlvbiwgdmFsdWUpID0+IHtcbiAgICB2YWx1ZSA9IGQzX2Zvcm1hdCgnLjJmJykodmFsdWUpOyAvLyBUT0RPOiBjaGVjayB0aGVzZSAuMWYgZm9ybWF0cyBoZXJlLCBzaG91bGQgdGhleSBiZSBpbnB1dHM/XG4gICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC8sL2csICcuJyk7XG5cbiAgICB0cmFuc2l0aW9uLnR3ZWVuKCd0ZXh0JywgKCkgPT4ge1xuICAgICAgbGV0IGludGVycG9sYXRlID0gZDNfaW50ZXJwb2xhdGUoZDNfZm9ybWF0KCcuMmYnKSgrdGhpcy5vbGRWYWx1ZSksIHZhbHVlKTtcblxuICAgICAgcmV0dXJuIHQgPT4ge1xuICAgICAgICB0aGlzLmxhYmVsVHdlZW4udGV4dChkID0+IHtcbiAgICAgICAgICBsZXQgdXBkYXRlZE51bWJlciA9IHRoaXMubGFiZWxGb3JtYXQoaW50ZXJwb2xhdGUodCkpO1xuICAgICAgICAgIHRoaXMubGFiZWwgPSB1cGRhdGVkTnVtYmVyO1xuICAgICAgICAgIHJldHVybiB1cGRhdGVkTnVtYmVyO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH07XG59XG4iXX0=