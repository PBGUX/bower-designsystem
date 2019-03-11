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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXZpei1nYXVnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wYi1kZXNpZ24tc3lzdGVtLyIsInNvdXJjZXMiOlsibGliL2RhdGF2aXovZGF0YXZpei1nYXVnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBRTVHLE9BQU8sRUFBRSxNQUFNLElBQUksU0FBUyxFQUFFLEdBQUcsSUFBSSxNQUFNLEVBQUUsV0FBVyxJQUFJLGNBQWMsRUFBRSxNQUFNLElBQUksU0FBUyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBRTVHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBR3ZEO0lBK0RFLG1DQUFvQixRQUE0QixFQUFVLFFBQW9CO1FBQTlFLGlCQUFrRjtRQUE5RCxhQUFRLEdBQVIsUUFBUSxDQUFvQjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVk7UUEvQzlFLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFHbEIsYUFBUSxHQUFHLElBQUksQ0FBQztRQU1oQixVQUFLLEdBQUcsR0FBRyxDQUFDO1FBR1osU0FBSSxHQUF3QyxVQUFVLENBQUM7UUFHdkQsVUFBSyxHQUFHLFNBQVMsQ0FBQztRQUdsQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBR2xCLHNCQUFpQixHQUFHLEVBQUUsQ0FBQztRQUd2QixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBTW5CLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFzRWhCLHFCQUFnQjs7OztRQUFHLFVBQUEsTUFBTTtZQUN2QixPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDbEMsQ0FBQyxFQUFDO1FBRUYsb0JBQWU7OztRQUFHOztnQkFDVixVQUFVLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxRQUFR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OztnQkFsSEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSwrVUFTVDtpQkFFRjs7OztnQkFoQlEsa0JBQWtCO2dCQUpRLFVBQVU7Ozs2QkFzQjFDLFdBQVcsU0FBQyxrQkFBa0I7MkJBRzlCLFdBQVcsU0FBQyx3QkFBd0I7dUJBR3BDLEtBQUs7d0JBR0wsS0FBSzt1QkFHTCxLQUFLO3dCQUdMLEtBQUs7NEJBR0wsS0FBSztvQ0FHTCxLQUFLOzZCQUdMLEtBQUs7OEJBR0wsS0FBSzs2QkFHTCxLQUFLOztJQTZMUixnQ0FBQztDQUFBLEFBMU9ELElBME9DO1NBNU5ZLHlCQUF5Qjs7O0lBQ3BDLCtDQUNrQjs7SUFFbEIsNkNBQ2dCOztJQUVoQix5Q0FDd0I7O0lBRXhCLDBDQUNZOztJQUVaLHlDQUN1RDs7SUFFdkQsMENBQ2tCOztJQUVsQiw4Q0FDa0I7O0lBRWxCLHNEQUN1Qjs7SUFFdkIsK0NBQ21COztJQUVuQixnREFDWTs7SUFFWiwrQ0FDZ0I7Ozs7O0lBRWhCLDBDQUFjOzs7OztJQUNkLHdDQUFZOzs7OztJQUNaLDBDQUFjOzs7OztJQUNkLCtDQUFtQjs7SUFDbkIsMENBQWE7Ozs7O0lBQ2IsK0NBQW1COzs7OztJQUNuQiw2Q0FBaUI7Ozs7O0lBQ2pCLDJDQUFlOzs7OztJQUNmLG9EQUF3Qjs7Ozs7SUFDeEIsd0NBQVk7Ozs7O0lBQ1osZ0RBQW9COzs7OztJQUNwQiw2Q0FBaUI7Ozs7O0lBQ2pCLDJDQUFlOzs7OztJQUNmLDRDQUFnQjs7SUF1RGhCLHFEQUVFOztJQUVGLG9EQUlFOztJQUVGLG1EQVVFOztJQUVGLDhDQTBDRTs7SUFFRixnREFlRTs7SUFFRiw2Q0FpQkU7O0lBRUYsOENBZUU7Ozs7O0lBMUtVLDZDQUFvQzs7Ozs7SUFBRSw2Q0FBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgc2VsZWN0IGFzIGQzX3NlbGVjdCwgYXJjIGFzIGQzX2FyYywgaW50ZXJwb2xhdGUgYXMgZDNfaW50ZXJwb2xhdGUsIGZvcm1hdCBhcyBkM19mb3JtYXQgfSBmcm9tICdkMyc7XG5cbmltcG9ydCB7IFBiZHNEYXRhdml6U2VydmljZSB9IGZyb20gJy4vZGF0YXZpei5zZXJ2aWNlJztcbmltcG9ydCB7IElQYmRzRGF0YXZpekdhdWdlIH0gZnJvbSAnLi9kYXRhdml6LmludGVyZmFjZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYmRzLWRhdGF2aXotZ2F1Z2UnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgICpuZ0lmPVwiIWhpZGVMYWJlbFwiXG4gICAgICBjbGFzcz1cImdhdWdlLWRldGFpbHNcIlxuICAgICAgW25nQ2xhc3NdPVwieyBoYWxmbW9vbjogdHlwZSA9PT0gJ2hhbGZtb29uJywgJ2dhdWdlLWRldGFpbHMtc21hbGwnOiBsYWJlbFNtYWxsIH1cIlxuICAgID5cbiAgICAgIDxkaXYgY2xhc3M9XCJnYXVnZS1udW1iZXJcIj57eyBsYWJlbCB9fTwvZGl2PlxuICAgICAgPGRpdiAqbmdJZj1cImRlc2NyaXB0aW9uXCIgY2xhc3M9XCJnYXVnZS1kZXNjcmlwdGlvbiB0ZXh0LWNlbnRlclwiPnt7IGRlc2NyaXB0aW9uIH19PC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlczogW11cbn0pXG5leHBvcnQgY2xhc3MgUGJkc0RhdGF2aXpHYXVnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5wYmRzLWNoYXJ0JylcbiAgY2hhcnRDbGFzcyA9IHRydWU7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5wYmRzLWNoYXJ0LWdhdWdlJylcbiAgcGllQ2xhc3MgPSB0cnVlO1xuXG4gIEBJbnB1dCgpXG4gIGRhdGE6IElQYmRzRGF0YXZpekdhdWdlO1xuXG4gIEBJbnB1dCgpXG4gIHdpZHRoID0gMzAwO1xuXG4gIEBJbnB1dCgpXG4gIHR5cGU6ICdoYWxmbW9vbicgfCAnaG9yc2VzaG9lJyB8ICdjaXJjbGUnID0gJ2hhbGZtb29uJztcblxuICBASW5wdXQoKVxuICBjb2xvciA9ICcjY2YwOTg5JztcblxuICBASW5wdXQoKVxuICBoaWRlTGFiZWwgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBsYWJlbEZvcm1hdFN0cmluZyA9ICcnO1xuXG4gIEBJbnB1dCgpXG4gIGxhYmVsU21hbGwgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBkZXNjcmlwdGlvbjtcblxuICBASW5wdXQoKVxuICBnYXVnZVdpZHRoID0gMjA7XG5cbiAgcHJpdmF0ZSBjaGFydDtcbiAgcHJpdmF0ZSBzdmc7XG4gIHByaXZhdGUgZ2F1Z2U7XG4gIHByaXZhdGUgbGFiZWxUd2VlbjsgLy8gVE9ETzogcmVuYW1lIHRoaXNcbiAgcHVibGljIGxhYmVsO1xuICBwcml2YXRlIHN0YXJ0QW5nbGU7XG4gIHByaXZhdGUgZW5kQW5nbGU7XG4gIHByaXZhdGUgcmFkaXVzO1xuICBwcml2YXRlIGJhY2tncm91bmRDb2xvcjsgLy8gVE9ETzogc2hvdWxkIHRoaXMgYmUgYW4gaW5wdXQ/XG4gIHByaXZhdGUgYXJjO1xuICBwcml2YXRlIGxhYmVsRm9ybWF0O1xuICBwcml2YXRlIG9sZFZhbHVlO1xuICBwcml2YXRlIGhlaWdodDtcbiAgcHJpdmF0ZSByb3VuZGVkO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2RhdGF2aXo6IFBiZHNEYXRhdml6U2VydmljZSwgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMud2lkdGg7XG4gICAgdGhpcy5yYWRpdXMgPSBNYXRoLm1heCh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCkgLyAyO1xuICAgIHRoaXMubGFiZWxGb3JtYXQgPSBkM19mb3JtYXQodGhpcy5sYWJlbEZvcm1hdFN0cmluZyk7XG4gICAgdGhpcy5iYWNrZ3JvdW5kQ29sb3IgPSAnI0YwRjBGMCc7XG4gICAgdGhpcy5sYWJlbCA9IHRoaXMubGFiZWxGb3JtYXQodGhpcy5kYXRhLnZhbHVlKTtcblxuICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICBjYXNlICdoYWxmbW9vbic6XG4gICAgICAgIHRoaXMuc3RhcnRBbmdsZSA9IC05MDtcbiAgICAgICAgdGhpcy5lbmRBbmdsZSA9IDkwO1xuICAgICAgICB0aGlzLnJvdW5kZWQgPSB0cnVlO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnaG9yc2VzaG9lJzpcbiAgICAgICAgdGhpcy5zdGFydEFuZ2xlID0gLTE0MDtcbiAgICAgICAgdGhpcy5lbmRBbmdsZSA9IDE0MDtcbiAgICAgICAgdGhpcy5yb3VuZGVkID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2NpcmNsZSc6XG4gICAgICAgIHRoaXMuc3RhcnRBbmdsZSA9IDA7XG4gICAgICAgIHRoaXMuZW5kQW5nbGUgPSAzNjA7XG4gICAgICAgIHRoaXMucm91bmRlZCA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICB0aGlzLmFyYyA9IGQzX2FyYygpLmNvcm5lclJhZGl1cyh0aGlzLnJvdW5kZWQgPyB0aGlzLmdhdWdlV2lkdGggOiAwKTtcblxuICAgIHRoaXMuY2hhcnQgPSBkM19zZWxlY3QodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50KS5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbiAgICB0aGlzLnN2ZyA9IHRoaXMuY2hhcnRcbiAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAuYXR0cignd2lkdGgnLCB0aGlzLndpZHRoKVxuICAgICAgLmF0dHIoJ2hlaWdodCcsIHRoaXMuaGVpZ2h0KVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2ltZy1mbHVpZCcpIC8vIHRvIHJlc2l6ZSBjaGFydFxuICAgICAgLmF0dHIoJ3ByZXNlcnZlQXNwZWN0UmF0aW8nLCAneE1pbllNaW4gbWVldCcpXG4gICAgICAuYXR0cigndmlld0JveCcsIGAtJHt0aGlzLndpZHRoIC8gMn0gLSR7dGhpcy5oZWlnaHQgLyAyfSAke3RoaXMud2lkdGh9ICR7dGhpcy5oZWlnaHR9YCk7XG5cbiAgICB0aGlzLmRyYXdDaGFydCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmRhdGEgJiYgIWNoYW5nZXMuZGF0YS5maXJzdENoYW5nZSkge1xuICAgICAgLy8gY29uc29sZS5sb2coY2hhbmdlcy5kYXRhLnByZXZpb3VzVmFsdWUudmFsdWUsIGNoYW5nZXMuZGF0YS5jdXJyZW50VmFsdWUudmFsdWUpO1xuXG4gICAgICB0aGlzLm9sZFZhbHVlID0gY2hhbmdlcy5kYXRhLnByZXZpb3VzVmFsdWUudmFsdWU7XG4gICAgICB0aGlzLnVwZGF0ZUNoYXJ0KCk7XG4gICAgfVxuICB9XG5cbiAgZGVncmVlc1RvUmFkaWFucyA9IGRlZ3JlZSA9PiB7XG4gICAgcmV0dXJuIChkZWdyZWUgKiBNYXRoLlBJKSAvIDE4MDtcbiAgfTtcblxuICBjYWxjdWxhdGVNaW5NYXggPSAoKSA9PiB7XG4gICAgY29uc3QgcGVyY2VudGFnZSA9IHRoaXMuZGF0YS5taW52YWx1ZSAvICh0aGlzLmRhdGEubWF4dmFsdWUgLSB0aGlzLmRhdGEubWludmFsdWUpO1xuXG4gICAgcmV0dXJuIHBlcmNlbnRhZ2UgKiAodGhpcy5kYXRhLnZhbHVlIC0gdGhpcy5kYXRhLm1pbnZhbHVlKSArICh0aGlzLmRhdGEudmFsdWUgLSB0aGlzLmRhdGEubWludmFsdWUpO1xuICB9O1xuXG4gIGNhbGN1bGF0ZUN1cnZlID0gZGF0YSA9PiB7XG4gICAgY29uc3Qgc3RhcnQgPSB0aGlzLmRlZ3JlZXNUb1JhZGlhbnModGhpcy5zdGFydEFuZ2xlKTtcbiAgICBjb25zdCBlbmQgPSBzdGFydCArIChkYXRhICogKHRoaXMuZGVncmVlc1RvUmFkaWFucyh0aGlzLmVuZEFuZ2xlKSAtIHN0YXJ0KSkgLyB0aGlzLmRhdGEubWF4dmFsdWU7XG5cbiAgICByZXR1cm4gW1xuICAgICAge1xuICAgICAgICBzdGFydEFuZ2xlOiBzdGFydCxcbiAgICAgICAgZW5kQW5nbGU6IGVuZFxuICAgICAgfVxuICAgIF07XG4gIH07XG5cbiAgZHJhd0NoYXJ0ID0gKCkgPT4ge1xuICAgIHRoaXMuZ2F1Z2UgPSB0aGlzLnN2Zy5hcHBlbmQoJ2cnKS5hdHRyKCdjbGFzcycsICdnYXVnZS1ncm91cCcpO1xuXG4gICAgLy8gYmFja2dyb3VuZCBhcmNcbiAgICBjb25zdCBiYWNrZ3JvdW5kID0gdGhpcy5nYXVnZVxuICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAuZGF0YSh0aGlzLmNhbGN1bGF0ZUN1cnZlKHRoaXMuZGF0YS5tYXh2YWx1ZSkpXG4gICAgICAuYXR0cignY2xhc3MnLCAnZ2F1Z2UtYmFja2dyb3VuZCcpXG4gICAgICAuYXR0cignZmlsbCcsIHRoaXMuYmFja2dyb3VuZENvbG9yKVxuICAgICAgLmF0dHIoJ2QnLCBkID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXJjKHtcbiAgICAgICAgICBpbm5lclJhZGl1czogdGhpcy5yYWRpdXMgLSB0aGlzLmdhdWdlV2lkdGgsXG4gICAgICAgICAgb3V0ZXJSYWRpdXM6IHRoaXMucmFkaXVzLFxuICAgICAgICAgIHN0YXJ0QW5nbGU6IGQuc3RhcnRBbmdsZSxcbiAgICAgICAgICBlbmRBbmdsZTogZC5lbmRBbmdsZVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgLy8gdmFsdWUgYXJjXG4gICAgdGhpcy5nYXVnZVxuICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAuZGF0YSh0aGlzLmNhbGN1bGF0ZUN1cnZlKHRoaXMuY2FsY3VsYXRlTWluTWF4KCkpKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dhdWdlLXZhbHVlJylcbiAgICAgIC5hdHRyKCdmaWxsJywgdGhpcy5jb2xvcilcbiAgICAgIC5hdHRyKCdkJywgZCA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmFyYyh7XG4gICAgICAgICAgaW5uZXJSYWRpdXM6IHRoaXMucmFkaXVzIC0gdGhpcy5nYXVnZVdpZHRoLFxuICAgICAgICAgIG91dGVyUmFkaXVzOiB0aGlzLnJhZGl1cyxcbiAgICAgICAgICBzdGFydEFuZ2xlOiBkLnN0YXJ0QW5nbGUsXG4gICAgICAgICAgZW5kQW5nbGU6IGQuZW5kQW5nbGVcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICBjYXNlICdob3JzZXNob2UnOlxuICAgICAgICB0aGlzLnN2Zy5hdHRyKCdoZWlnaHQnLCAyMzApLmF0dHIoJ3ZpZXdCb3gnLCBgLSR7dGhpcy53aWR0aCAvIDJ9IC0ke3RoaXMuaGVpZ2h0IC8gMn0gJHt0aGlzLmhlaWdodH0gMjMwYCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaGFsZm1vb24nOlxuICAgICAgICB0aGlzLnN2Zy5hdHRyKCdoZWlnaHQnLCB0aGlzLndpZHRoIC8gMik7XG4gICAgICAgIHRoaXMuc3ZnLmF0dHIoJ3ZpZXdCb3gnLCBgLSR7dGhpcy53aWR0aCAvIDJ9IC0ke3RoaXMud2lkdGggLyAyfSAke3RoaXMud2lkdGh9ICR7dGhpcy53aWR0aCAvIDJ9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfTtcblxuICB1cGRhdGVDaGFydCA9ICgpID0+IHtcbiAgICBsZXQgZ3JvdXAgPSB0aGlzLnN2Zy5zZWxlY3QoJy5nYXVnZS1ncm91cCcpO1xuXG4gICAgZ3JvdXBcbiAgICAgIC5zZWxlY3QoJy5nYXVnZS12YWx1ZScpXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZHVyYXRpb24oNzUwKVxuICAgICAgLmNhbGwodGhpcy5hcmNUd2VlbiwgdGhpcy5jYWxjdWxhdGVNaW5NYXgoKSk7XG5cbiAgICB0aGlzLmxhYmVsVHdlZW4gPSB0aGlzLmNoYXJ0LnNlbGVjdCgnLmdhdWdlLW51bWJlcicpO1xuXG4gICAgdGhpcy5sYWJlbFR3ZWVuXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZHVyYXRpb24oNzUwKVxuICAgICAgLmNhbGwodGhpcy50ZXh0VHdlZW4sIHRoaXMuZGF0YS52YWx1ZSk7XG4gIH07XG5cbiAgYXJjVHdlZW4gPSAodHJhbnNpdGlvbiwgdmFsdWUpID0+IHtcbiAgICBsZXQgbmV3QW5nbGUgPSB0aGlzLmNhbGN1bGF0ZUN1cnZlKHZhbHVlKTtcblxuICAgIHRyYW5zaXRpb24uYXR0clR3ZWVuKCdkJywgZCA9PiB7XG4gICAgICBsZXQgaW50ZXJwb2xhdGUgPSBkM19pbnRlcnBvbGF0ZShkLmVuZEFuZ2xlLCBuZXdBbmdsZVswXS5lbmRBbmdsZSk7XG5cbiAgICAgIHJldHVybiB0ID0+IHtcbiAgICAgICAgZC5lbmRBbmdsZSA9IGludGVycG9sYXRlKHQpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmFyYyh7XG4gICAgICAgICAgaW5uZXJSYWRpdXM6IHRoaXMucmFkaXVzIC0gdGhpcy5nYXVnZVdpZHRoLFxuICAgICAgICAgIG91dGVyUmFkaXVzOiB0aGlzLnJhZGl1cyxcbiAgICAgICAgICBzdGFydEFuZ2xlOiBkLnN0YXJ0QW5nbGUsXG4gICAgICAgICAgZW5kQW5nbGU6IGQuZW5kQW5nbGVcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9O1xuXG4gIHRleHRUd2VlbiA9ICh0cmFuc2l0aW9uLCB2YWx1ZSkgPT4ge1xuICAgIHZhbHVlID0gZDNfZm9ybWF0KCcuMmYnKSh2YWx1ZSk7IC8vIFRPRE86IGNoZWNrIHRoZXNlIC4xZiBmb3JtYXRzIGhlcmUsIHNob3VsZCB0aGV5IGJlIGlucHV0cz9cbiAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoLywvZywgJy4nKTtcblxuICAgIHRyYW5zaXRpb24udHdlZW4oJ3RleHQnLCAoKSA9PiB7XG4gICAgICBsZXQgaW50ZXJwb2xhdGUgPSBkM19pbnRlcnBvbGF0ZShkM19mb3JtYXQoJy4yZicpKCt0aGlzLm9sZFZhbHVlKSwgdmFsdWUpO1xuXG4gICAgICByZXR1cm4gdCA9PiB7XG4gICAgICAgIHRoaXMubGFiZWxUd2Vlbi50ZXh0KGQgPT4ge1xuICAgICAgICAgIGxldCB1cGRhdGVkTnVtYmVyID0gdGhpcy5sYWJlbEZvcm1hdChpbnRlcnBvbGF0ZSh0KSk7XG4gICAgICAgICAgdGhpcy5sYWJlbCA9IHVwZGF0ZWROdW1iZXI7XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZWROdW1iZXI7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfTtcbn1cbiJdfQ==