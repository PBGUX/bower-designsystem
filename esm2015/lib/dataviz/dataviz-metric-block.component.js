/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, HostBinding, ElementRef, ContentChild } from '@angular/core';
import { PbdsDatavizMetricIndicatorComponent } from './dataviz-metric-indicator.component';
export class PbdsDatavizMetricBlockComponent {
    constructor() {
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
    /**
     * @return {?}
     */
    get hostClasses() {
        return [
            'metric-block',
            this.centered ? 'metric-block-centered' : '',
            this.centeredText ? 'metric-block-centered-text' : '',
            this.class
        ].join(' ');
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.indicatorRef) {
            this.hideValueMargin = true;
        }
        if (this.unit !== '%' && this.unit !== null) {
            this.isUnit = true;
        }
        else if (this.unit === '%') {
            this.isPercentUnit = true;
        }
    }
}
PbdsDatavizMetricBlockComponent.decorators = [
    { type: Component, args: [{
                selector: 'pbds-dataviz-metric-block',
                template: `
    <div class="metric-block-inner">
      <div *ngIf="heading" class="metric-block-heading">{{ heading }}</div>
      <div class="metric-block-data-block">
        <div class="metric-block-contents">
          <div class="metric-block-value" [ngClass]="{ 'mr-0': hideValueMargin }">
            {{ value
            }}<span [ngClass]="{ 'metric-block-unit': isUnit, 'metric-block-percentage': isPercentUnit }">{{
              unit
            }}</span>
          </div>

          <div *ngIf="description" class="metric-block-description">{{ description }}</div>
          <div>
            <ng-content select="pbds-dataviz-metric-indicator"></ng-content>
          </div>
        </div>
        <ng-content select="pbds-dataviz-sparkline"></ng-content>
      </div>
    </div>
  `
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXZpei1tZXRyaWMtYmxvY2suY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcGItZGVzaWduLXN5c3RlbS8iLCJzb3VyY2VzIjpbImxpYi9kYXRhdml6L2RhdGF2aXotbWV0cmljLWJsb2NrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFaEcsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUEyQjNGLE1BQU0sT0FBTywrQkFBK0I7SUF6QjVDO1FBMkJFLFVBQUssR0FBRyxFQUFFLENBQUM7UUFHWCxZQUFPLEdBQVcsSUFBSSxDQUFDO1FBR3ZCLFVBQUssR0FBRyxDQUFDLENBQUM7UUFHVixTQUFJLEdBQVcsSUFBSSxDQUFDO1FBR3BCLGdCQUFXLEdBQVcsSUFBSSxDQUFDO1FBRzNCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFHakIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFFckIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsV0FBTSxHQUFHLEtBQUssQ0FBQztJQXlCakIsQ0FBQzs7OztJQXZCQyxJQUNJLFdBQVc7UUFDYixPQUFPO1lBQ0wsY0FBYztZQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzVDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3JELElBQUksQ0FBQyxLQUFLO1NBQ1gsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDZCxDQUFDOzs7O0lBSUQsUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1NBQzdCO1FBRUQsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRTtZQUMzQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUNwQjthQUFNLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxHQUFHLEVBQUU7WUFDNUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7U0FDM0I7SUFDSCxDQUFDOzs7WUF6RUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwyQkFBMkI7Z0JBQ3JDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQlQ7YUFFRjs7O29CQUVFLEtBQUs7c0JBR0wsS0FBSztvQkFHTCxLQUFLO21CQUdMLEtBQUs7MEJBR0wsS0FBSzt1QkFHTCxLQUFLOzJCQUdMLEtBQUs7MEJBT0wsV0FBVyxTQUFDLE9BQU87MkJBVW5CLFlBQVksU0FBQyxtQ0FBbUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Ozs7SUFuQ25FLGdEQUNXOztJQUVYLGtEQUN1Qjs7SUFFdkIsZ0RBQ1U7O0lBRVYsK0NBQ29COztJQUVwQixzREFDMkI7O0lBRTNCLG1EQUNpQjs7SUFFakIsdURBQ3FCOztJQUVyQiwwREFBd0I7O0lBQ3hCLHdEQUFzQjs7SUFDdEIsaURBQWU7O0lBWWYsdURBQThGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBIb3N0QmluZGluZywgRWxlbWVudFJlZiwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFBiZHNEYXRhdml6TWV0cmljSW5kaWNhdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRhdml6LW1ldHJpYy1pbmRpY2F0b3IuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncGJkcy1kYXRhdml6LW1ldHJpYy1ibG9jaycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cIm1ldHJpYy1ibG9jay1pbm5lclwiPlxuICAgICAgPGRpdiAqbmdJZj1cImhlYWRpbmdcIiBjbGFzcz1cIm1ldHJpYy1ibG9jay1oZWFkaW5nXCI+e3sgaGVhZGluZyB9fTwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm1ldHJpYy1ibG9jay1kYXRhLWJsb2NrXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtZXRyaWMtYmxvY2stY29udGVudHNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibWV0cmljLWJsb2NrLXZhbHVlXCIgW25nQ2xhc3NdPVwieyAnbXItMCc6IGhpZGVWYWx1ZU1hcmdpbiB9XCI+XG4gICAgICAgICAgICB7eyB2YWx1ZVxuICAgICAgICAgICAgfX08c3BhbiBbbmdDbGFzc109XCJ7ICdtZXRyaWMtYmxvY2stdW5pdCc6IGlzVW5pdCwgJ21ldHJpYy1ibG9jay1wZXJjZW50YWdlJzogaXNQZXJjZW50VW5pdCB9XCI+e3tcbiAgICAgICAgICAgICAgdW5pdFxuICAgICAgICAgICAgfX08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwiZGVzY3JpcHRpb25cIiBjbGFzcz1cIm1ldHJpYy1ibG9jay1kZXNjcmlwdGlvblwiPnt7IGRlc2NyaXB0aW9uIH19PC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInBiZHMtZGF0YXZpei1tZXRyaWMtaW5kaWNhdG9yXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwicGJkcy1kYXRhdml6LXNwYXJrbGluZVwiPjwvbmctY29udGVudD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIFBiZHNEYXRhdml6TWV0cmljQmxvY2tDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKVxuICBjbGFzcyA9ICcnO1xuXG4gIEBJbnB1dCgpXG4gIGhlYWRpbmc6IHN0cmluZyA9IG51bGw7XG5cbiAgQElucHV0KClcbiAgdmFsdWUgPSAwO1xuXG4gIEBJbnB1dCgpXG4gIHVuaXQ6IHN0cmluZyA9IG51bGw7XG5cbiAgQElucHV0KClcbiAgZGVzY3JpcHRpb246IHN0cmluZyA9IG51bGw7XG5cbiAgQElucHV0KClcbiAgY2VudGVyZWQgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBjZW50ZXJlZFRleHQgPSBmYWxzZTtcblxuICBoaWRlVmFsdWVNYXJnaW4gPSBmYWxzZTtcbiAgaXNQZXJjZW50VW5pdCA9IGZhbHNlO1xuICBpc1VuaXQgPSBmYWxzZTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgZ2V0IGhvc3RDbGFzc2VzKCkge1xuICAgIHJldHVybiBbXG4gICAgICAnbWV0cmljLWJsb2NrJyxcbiAgICAgIHRoaXMuY2VudGVyZWQgPyAnbWV0cmljLWJsb2NrLWNlbnRlcmVkJyA6ICcnLFxuICAgICAgdGhpcy5jZW50ZXJlZFRleHQgPyAnbWV0cmljLWJsb2NrLWNlbnRlcmVkLXRleHQnIDogJycsXG4gICAgICB0aGlzLmNsYXNzXG4gICAgXS5qb2luKCcgJyk7XG4gIH1cblxuICBAQ29udGVudENoaWxkKFBiZHNEYXRhdml6TWV0cmljSW5kaWNhdG9yQ29tcG9uZW50LCB7IHN0YXRpYzogdHJ1ZSB9KSBpbmRpY2F0b3JSZWY6IEVsZW1lbnRSZWY7XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKCF0aGlzLmluZGljYXRvclJlZikge1xuICAgICAgdGhpcy5oaWRlVmFsdWVNYXJnaW4gPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnVuaXQgIT09ICclJyAmJiB0aGlzLnVuaXQgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuaXNVbml0ID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMudW5pdCA9PT0gJyUnKSB7XG4gICAgICB0aGlzLmlzUGVyY2VudFVuaXQgPSB0cnVlO1xuICAgIH1cbiAgfVxufVxuIl19