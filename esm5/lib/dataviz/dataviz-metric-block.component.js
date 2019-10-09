/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, HostBinding, ElementRef, ContentChild } from '@angular/core';
import { PbdsDatavizMetricIndicatorComponent } from './dataviz-metric-indicator.component';
var PbdsDatavizMetricBlockComponent = /** @class */ (function () {
    function PbdsDatavizMetricBlockComponent() {
        this.class = '';
        this.heading = null;
        this.value = 0;
        this.unit = null;
        this.description = null;
        this.centered = false;
        this.centeredText = false;
        this.hideValueMargin = false;
        this.isPercentUnit = false;
        this.isUnit = false;
    }
    Object.defineProperty(PbdsDatavizMetricBlockComponent.prototype, "hostClasses", {
        get: /**
         * @return {?}
         */
        function () {
            return [
                'metric-block',
                this.centered ? 'metric-block-centered' : '',
                this.centeredText ? 'metric-block-centered-text' : '',
                this.class
            ].join(' ');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PbdsDatavizMetricBlockComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.indicatorRef) {
            this.hideValueMargin = true;
        }
        if (this.unit !== '%' && this.unit !== null) {
            this.isUnit = true;
        }
        else if (this.unit === '%') {
            this.isPercentUnit = true;
        }
    };
    PbdsDatavizMetricBlockComponent.decorators = [
        { type: Component, args: [{
                    selector: 'pbds-dataviz-metric-block',
                    template: "\n    <div class=\"metric-block-inner\">\n      <div *ngIf=\"heading\" class=\"metric-block-heading\">{{ heading }}</div>\n      <div class=\"metric-block-data-block\">\n        <div class=\"metric-block-contents\">\n          <div class=\"metric-block-value\" [ngClass]=\"{ 'mr-0': hideValueMargin }\">\n            {{ value\n            }}<span [ngClass]=\"{ 'metric-block-unit': isUnit, 'metric-block-percentage': isPercentUnit }\">{{\n              unit\n            }}</span>\n          </div>\n\n          <div *ngIf=\"description\" class=\"metric-block-description\">{{ description }}</div>\n          <div>\n            <ng-content select=\"pbds-dataviz-metric-indicator\"></ng-content>\n          </div>\n        </div>\n        <ng-content select=\"pbds-dataviz-sparkline\"></ng-content>\n      </div>\n    </div>\n  "
                }] }
    ];
    PbdsDatavizMetricBlockComponent.propDecorators = {
        class: [{ type: Input }],
        heading: [{ type: Input }],
        value: [{ type: Input }],
        unit: [{ type: Input }],
        description: [{ type: Input }],
        centered: [{ type: Input }],
        centeredText: [{ type: Input }],
        hostClasses: [{ type: HostBinding, args: ['class',] }],
        indicatorRef: [{ type: ContentChild, args: [PbdsDatavizMetricIndicatorComponent, { static: true },] }]
    };
    return PbdsDatavizMetricBlockComponent;
}());
export { PbdsDatavizMetricBlockComponent };
if (false) {
    /** @type {?} */
    PbdsDatavizMetricBlockComponent.prototype.class;
    /** @type {?} */
    PbdsDatavizMetricBlockComponent.prototype.heading;
    /** @type {?} */
    PbdsDatavizMetricBlockComponent.prototype.value;
    /** @type {?} */
    PbdsDatavizMetricBlockComponent.prototype.unit;
    /** @type {?} */
    PbdsDatavizMetricBlockComponent.prototype.description;
    /** @type {?} */
    PbdsDatavizMetricBlockComponent.prototype.centered;
    /** @type {?} */
    PbdsDatavizMetricBlockComponent.prototype.centeredText;
    /** @type {?} */
    PbdsDatavizMetricBlockComponent.prototype.hideValueMargin;
    /** @type {?} */
    PbdsDatavizMetricBlockComponent.prototype.isPercentUnit;
    /** @type {?} */
    PbdsDatavizMetricBlockComponent.prototype.isUnit;
    /** @type {?} */
    PbdsDatavizMetricBlockComponent.prototype.indicatorRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXZpei1tZXRyaWMtYmxvY2suY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcGItZGVzaWduLXN5c3RlbS8iLCJzb3VyY2VzIjpbImxpYi9kYXRhdml6L2RhdGF2aXotbWV0cmljLWJsb2NrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFaEcsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFFM0Y7SUFBQTtRQTJCRSxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBR1gsWUFBTyxHQUFXLElBQUksQ0FBQztRQUd2QixVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBR1YsU0FBSSxHQUFXLElBQUksQ0FBQztRQUdwQixnQkFBVyxHQUFXLElBQUksQ0FBQztRQUczQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBR2pCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBRXJCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLFdBQU0sR0FBRyxLQUFLLENBQUM7SUF5QmpCLENBQUM7SUF2QkMsc0JBQ0ksd0RBQVc7Ozs7UUFEZjtZQUVFLE9BQU87Z0JBQ0wsY0FBYztnQkFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDNUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3JELElBQUksQ0FBQyxLQUFLO2FBQ1gsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDZCxDQUFDOzs7T0FBQTs7OztJQUlELGtEQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1NBQzdCO1FBRUQsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRTtZQUMzQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUNwQjthQUFNLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxHQUFHLEVBQUU7WUFDNUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7U0FDM0I7SUFDSCxDQUFDOztnQkF6RUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLFFBQVEsRUFBRSw2ekJBb0JUO2lCQUVGOzs7d0JBRUUsS0FBSzswQkFHTCxLQUFLO3dCQUdMLEtBQUs7dUJBR0wsS0FBSzs4QkFHTCxLQUFLOzJCQUdMLEtBQUs7K0JBR0wsS0FBSzs4QkFPTCxXQUFXLFNBQUMsT0FBTzsrQkFVbkIsWUFBWSxTQUFDLG1DQUFtQyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7SUFhckUsc0NBQUM7Q0FBQSxBQTFFRCxJQTBFQztTQWpEWSwrQkFBK0I7OztJQUMxQyxnREFDVzs7SUFFWCxrREFDdUI7O0lBRXZCLGdEQUNVOztJQUVWLCtDQUNvQjs7SUFFcEIsc0RBQzJCOztJQUUzQixtREFDaUI7O0lBRWpCLHVEQUNxQjs7SUFFckIsMERBQXdCOztJQUN4Qix3REFBc0I7O0lBQ3RCLGlEQUFlOztJQVlmLHVEQUE4RiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgSG9zdEJpbmRpbmcsIEVsZW1lbnRSZWYsIENvbnRlbnRDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQYmRzRGF0YXZpek1ldHJpY0luZGljYXRvckNvbXBvbmVudCB9IGZyb20gJy4vZGF0YXZpei1tZXRyaWMtaW5kaWNhdG9yLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BiZHMtZGF0YXZpei1tZXRyaWMtYmxvY2snLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJtZXRyaWMtYmxvY2staW5uZXJcIj5cbiAgICAgIDxkaXYgKm5nSWY9XCJoZWFkaW5nXCIgY2xhc3M9XCJtZXRyaWMtYmxvY2staGVhZGluZ1wiPnt7IGhlYWRpbmcgfX08L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtZXRyaWMtYmxvY2stZGF0YS1ibG9ja1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibWV0cmljLWJsb2NrLWNvbnRlbnRzXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm1ldHJpYy1ibG9jay12YWx1ZVwiIFtuZ0NsYXNzXT1cInsgJ21yLTAnOiBoaWRlVmFsdWVNYXJnaW4gfVwiPlxuICAgICAgICAgICAge3sgdmFsdWVcbiAgICAgICAgICAgIH19PHNwYW4gW25nQ2xhc3NdPVwieyAnbWV0cmljLWJsb2NrLXVuaXQnOiBpc1VuaXQsICdtZXRyaWMtYmxvY2stcGVyY2VudGFnZSc6IGlzUGVyY2VudFVuaXQgfVwiPnt7XG4gICAgICAgICAgICAgIHVuaXRcbiAgICAgICAgICAgIH19PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiAqbmdJZj1cImRlc2NyaXB0aW9uXCIgY2xhc3M9XCJtZXRyaWMtYmxvY2stZGVzY3JpcHRpb25cIj57eyBkZXNjcmlwdGlvbiB9fTwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwYmRzLWRhdGF2aXotbWV0cmljLWluZGljYXRvclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInBiZHMtZGF0YXZpei1zcGFya2xpbmVcIj48L25nLWNvbnRlbnQ+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBQYmRzRGF0YXZpek1ldHJpY0Jsb2NrQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KClcbiAgY2xhc3MgPSAnJztcblxuICBASW5wdXQoKVxuICBoZWFkaW5nOiBzdHJpbmcgPSBudWxsO1xuXG4gIEBJbnB1dCgpXG4gIHZhbHVlID0gMDtcblxuICBASW5wdXQoKVxuICB1bml0OiBzdHJpbmcgPSBudWxsO1xuXG4gIEBJbnB1dCgpXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBudWxsO1xuXG4gIEBJbnB1dCgpXG4gIGNlbnRlcmVkID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgY2VudGVyZWRUZXh0ID0gZmFsc2U7XG5cbiAgaGlkZVZhbHVlTWFyZ2luID0gZmFsc2U7XG4gIGlzUGVyY2VudFVuaXQgPSBmYWxzZTtcbiAgaXNVbml0ID0gZmFsc2U7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIGdldCBob3N0Q2xhc3NlcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ21ldHJpYy1ibG9jaycsXG4gICAgICB0aGlzLmNlbnRlcmVkID8gJ21ldHJpYy1ibG9jay1jZW50ZXJlZCcgOiAnJyxcbiAgICAgIHRoaXMuY2VudGVyZWRUZXh0ID8gJ21ldHJpYy1ibG9jay1jZW50ZXJlZC10ZXh0JyA6ICcnLFxuICAgICAgdGhpcy5jbGFzc1xuICAgIF0uam9pbignICcpO1xuICB9XG5cbiAgQENvbnRlbnRDaGlsZChQYmRzRGF0YXZpek1ldHJpY0luZGljYXRvckNvbXBvbmVudCwgeyBzdGF0aWM6IHRydWUgfSkgaW5kaWNhdG9yUmVmOiBFbGVtZW50UmVmO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghdGhpcy5pbmRpY2F0b3JSZWYpIHtcbiAgICAgIHRoaXMuaGlkZVZhbHVlTWFyZ2luID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy51bml0ICE9PSAnJScgJiYgdGhpcy51bml0ICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmlzVW5pdCA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh0aGlzLnVuaXQgPT09ICclJykge1xuICAgICAgdGhpcy5pc1BlcmNlbnRVbml0ID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==