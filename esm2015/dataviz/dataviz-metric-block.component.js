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
        this.vertical = false;
        this.infoMessage = null;
        this.hideValueMargin = false;
        this.isPercentUnit = false;
        this.isUnit = false;
    }
    get hostClasses() {
        return [
            'metric-block',
            this.centered ? 'metric-block-centered' : '',
            this.centeredText ? 'metric-block-centered-text' : '',
            this.vertical ? 'metric-block-vertical' : '',
            this.class
        ].join(' ');
    }
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
      <div *ngIf="heading" class="metric-block-heading">
        {{ heading }}
        <i
          *ngIf="infoMessage"
          class="pbi-icon-mini pbi-info-circle-open ml-1 align-middle"
          ngbTooltip="{{ infoMessage }}"
          container="body"
        ></i>
      </div>
      <div class="metric-block-data-block">
        <div class="metric-block-contents">
          <div class="metric-block-value" [ngClass]="{ 'mr-0': hideValueMargin }">
            {{ value
            }}<span [ngClass]="{ 'metric-block-unit': isUnit, 'metric-block-percentage': isPercentUnit }">{{
              unit
            }}</span>
          </div>

          <div>
            <ng-content select="pbds-dataviz-metric-indicator"></ng-content>
          </div>
          <div *ngIf="description" class="metric-block-description">{{ description }}</div>
        </div>
        <ng-content select="pbds-dataviz-sparkline"></ng-content>
      </div>
    </div>
  `
            },] }
];
PbdsDatavizMetricBlockComponent.propDecorators = {
    class: [{ type: Input }],
    heading: [{ type: Input }],
    value: [{ type: Input }],
    unit: [{ type: Input }],
    description: [{ type: Input }],
    centered: [{ type: Input }],
    centeredText: [{ type: Input }],
    vertical: [{ type: Input }],
    infoMessage: [{ type: Input }],
    hostClasses: [{ type: HostBinding, args: ['class',] }],
    indicatorRef: [{ type: ContentChild, args: [PbdsDatavizMetricIndicatorComponent, { static: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXZpei1tZXRyaWMtYmxvY2suY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9kYTA1N2NvL0Rlc2t0b3AvQ29kZS9uZy1kZXNpZ25zeXN0ZW0vY2xpZW50L3Byb2plY3RzL3BiLWRlc2lnbi1zeXN0ZW0vZGF0YXZpei8iLCJzb3VyY2VzIjpbImRhdGF2aXotbWV0cmljLWJsb2NrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVoRyxPQUFPLEVBQUUsbUNBQW1DLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQW1DM0YsTUFBTSxPQUFPLCtCQUErQjtJQWpDNUM7UUFtQ0UsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUdYLFlBQU8sR0FBVyxJQUFJLENBQUM7UUFHdkIsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUdWLFNBQUksR0FBVyxJQUFJLENBQUM7UUFHcEIsZ0JBQVcsR0FBVyxJQUFJLENBQUM7UUFHM0IsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUdqQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUdyQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBR2pCLGdCQUFXLEdBQWtCLElBQUksQ0FBQztRQUVsQyxvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUN4QixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixXQUFNLEdBQUcsS0FBSyxDQUFDO0lBMEJqQixDQUFDO0lBeEJDLElBQ0ksV0FBVztRQUNiLE9BQU87WUFDTCxjQUFjO1lBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDNUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDckQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDNUMsSUFBSSxDQUFDLEtBQUs7U0FDWCxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNkLENBQUM7SUFJRCxRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDdEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7U0FDN0I7UUFFRCxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFO1lBQzNDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQ3BCO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEdBQUcsRUFBRTtZQUM1QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztTQUMzQjtJQUNILENBQUM7OztZQXhGRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJUO2FBRUY7OztvQkFFRSxLQUFLO3NCQUdMLEtBQUs7b0JBR0wsS0FBSzttQkFHTCxLQUFLOzBCQUdMLEtBQUs7dUJBR0wsS0FBSzsyQkFHTCxLQUFLO3VCQUdMLEtBQUs7MEJBR0wsS0FBSzswQkFPTCxXQUFXLFNBQUMsT0FBTzsyQkFXbkIsWUFBWSxTQUFDLG1DQUFtQyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgSG9zdEJpbmRpbmcsIEVsZW1lbnRSZWYsIENvbnRlbnRDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQYmRzRGF0YXZpek1ldHJpY0luZGljYXRvckNvbXBvbmVudCB9IGZyb20gJy4vZGF0YXZpei1tZXRyaWMtaW5kaWNhdG9yLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BiZHMtZGF0YXZpei1tZXRyaWMtYmxvY2snLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJtZXRyaWMtYmxvY2staW5uZXJcIj5cbiAgICAgIDxkaXYgKm5nSWY9XCJoZWFkaW5nXCIgY2xhc3M9XCJtZXRyaWMtYmxvY2staGVhZGluZ1wiPlxuICAgICAgICB7eyBoZWFkaW5nIH19XG4gICAgICAgIDxpXG4gICAgICAgICAgKm5nSWY9XCJpbmZvTWVzc2FnZVwiXG4gICAgICAgICAgY2xhc3M9XCJwYmktaWNvbi1taW5pIHBiaS1pbmZvLWNpcmNsZS1vcGVuIG1sLTEgYWxpZ24tbWlkZGxlXCJcbiAgICAgICAgICBuZ2JUb29sdGlwPVwie3sgaW5mb01lc3NhZ2UgfX1cIlxuICAgICAgICAgIGNvbnRhaW5lcj1cImJvZHlcIlxuICAgICAgICA+PC9pPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwibWV0cmljLWJsb2NrLWRhdGEtYmxvY2tcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1ldHJpYy1ibG9jay1jb250ZW50c1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJtZXRyaWMtYmxvY2stdmFsdWVcIiBbbmdDbGFzc109XCJ7ICdtci0wJzogaGlkZVZhbHVlTWFyZ2luIH1cIj5cbiAgICAgICAgICAgIHt7IHZhbHVlXG4gICAgICAgICAgICB9fTxzcGFuIFtuZ0NsYXNzXT1cInsgJ21ldHJpYy1ibG9jay11bml0JzogaXNVbml0LCAnbWV0cmljLWJsb2NrLXBlcmNlbnRhZ2UnOiBpc1BlcmNlbnRVbml0IH1cIj57e1xuICAgICAgICAgICAgICB1bml0XG4gICAgICAgICAgICB9fTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwYmRzLWRhdGF2aXotbWV0cmljLWluZGljYXRvclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwiZGVzY3JpcHRpb25cIiBjbGFzcz1cIm1ldHJpYy1ibG9jay1kZXNjcmlwdGlvblwiPnt7IGRlc2NyaXB0aW9uIH19PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwYmRzLWRhdGF2aXotc3BhcmtsaW5lXCI+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlczogW11cbn0pXG5leHBvcnQgY2xhc3MgUGJkc0RhdGF2aXpNZXRyaWNCbG9ja0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIGNsYXNzID0gJyc7XG5cbiAgQElucHV0KClcbiAgaGVhZGluZzogc3RyaW5nID0gbnVsbDtcblxuICBASW5wdXQoKVxuICB2YWx1ZSA9IDA7XG5cbiAgQElucHV0KClcbiAgdW5pdDogc3RyaW5nID0gbnVsbDtcblxuICBASW5wdXQoKVxuICBkZXNjcmlwdGlvbjogc3RyaW5nID0gbnVsbDtcblxuICBASW5wdXQoKVxuICBjZW50ZXJlZCA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIGNlbnRlcmVkVGV4dCA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIHZlcnRpY2FsID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgaW5mb01lc3NhZ2U6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIGhpZGVWYWx1ZU1hcmdpbiA9IGZhbHNlO1xuICBpc1BlcmNlbnRVbml0ID0gZmFsc2U7XG4gIGlzVW5pdCA9IGZhbHNlO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBnZXQgaG9zdENsYXNzZXMoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdtZXRyaWMtYmxvY2snLFxuICAgICAgdGhpcy5jZW50ZXJlZCA/ICdtZXRyaWMtYmxvY2stY2VudGVyZWQnIDogJycsXG4gICAgICB0aGlzLmNlbnRlcmVkVGV4dCA/ICdtZXRyaWMtYmxvY2stY2VudGVyZWQtdGV4dCcgOiAnJyxcbiAgICAgIHRoaXMudmVydGljYWwgPyAnbWV0cmljLWJsb2NrLXZlcnRpY2FsJyA6ICcnLFxuICAgICAgdGhpcy5jbGFzc1xuICAgIF0uam9pbignICcpO1xuICB9XG5cbiAgQENvbnRlbnRDaGlsZChQYmRzRGF0YXZpek1ldHJpY0luZGljYXRvckNvbXBvbmVudCwgeyBzdGF0aWM6IHRydWUgfSkgaW5kaWNhdG9yUmVmOiBFbGVtZW50UmVmO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghdGhpcy5pbmRpY2F0b3JSZWYpIHtcbiAgICAgIHRoaXMuaGlkZVZhbHVlTWFyZ2luID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy51bml0ICE9PSAnJScgJiYgdGhpcy51bml0ICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmlzVW5pdCA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh0aGlzLnVuaXQgPT09ICclJykge1xuICAgICAgdGhpcy5pc1BlcmNlbnRVbml0ID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==