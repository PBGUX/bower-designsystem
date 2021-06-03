import { Component, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

class PbdsProgressSpinnerComponent {
}
PbdsProgressSpinnerComponent.decorators = [
    { type: Component, args: [{
                selector: 'pbds-progress-spinner',
                template: `
    <span role="alert" aria-live="assertive">
      <span
        class="sbl-circ"
        [style.width.px]="size"
        [style.height.px]="size"
        [style.border-width.px]="size / 8"
        aria-hidden="true"
      ></span>
      <span class="sr-only">Loading</span>
    </span>
  `,
                styles: [".sbl-circ{height:48px;width:48px;color:var(--primary);position:relative;display:inline-block;border-style:solid;border-radius:50%;border-top:solid transparent;border-width:6px;-webkit-animation:rotate 1.5s linear infinite;animation:rotate 1.5s linear infinite}@-webkit-keyframes rotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes rotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}"]
            },] }
];
PbdsProgressSpinnerComponent.propDecorators = {
    size: [{ type: Input }]
};

class PbdsProgressSpinnerModule {
}
PbdsProgressSpinnerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [PbdsProgressSpinnerComponent],
                imports: [CommonModule],
                exports: [PbdsProgressSpinnerComponent]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { PbdsProgressSpinnerComponent, PbdsProgressSpinnerModule };
//# sourceMappingURL=pb-design-system-progress-spinner.js.map
