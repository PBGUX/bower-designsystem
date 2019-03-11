/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, HostListener, HostBinding, ElementRef, Input } from '@angular/core';
import { ViewportScroller } from '@angular/common';
export class PbdsHeaderShadowDirective {
    /**
     * @param {?} _scroll
     * @param {?} _element
     */
    constructor(_scroll, _element) {
        this._scroll = _scroll;
        this._element = _element;
    }
    /**
     * @return {?}
     */
    onWindowScroll() {
        /** @type {?} */
        const offset = this._scroll.getScrollPosition();
        this.shadow = offset[1] > 20;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.item) {
            /** @type {?} */
            const div = document.body.querySelector(`${this.item}`);
            div.addEventListener('scroll', (/**
             * @param {?} event
             * @return {?}
             */
            event => {
                this.shadow = event.srcElement.scrollTop > 20;
            }));
        }
    }
}
PbdsHeaderShadowDirective.decorators = [
    { type: Directive, args: [{
                selector: '[pbdsHeaderShadow]'
            },] }
];
/** @nocollapse */
PbdsHeaderShadowDirective.ctorParameters = () => [
    { type: ViewportScroller },
    { type: ElementRef }
];
PbdsHeaderShadowDirective.propDecorators = {
    shadow: [{ type: HostBinding, args: ['class.pbds-header-shadow',] }],
    item: [{ type: Input, args: ['pbdsHeaderShadow',] }],
    onWindowScroll: [{ type: HostListener, args: ['window:scroll', [],] }]
};
if (false) {
    /** @type {?} */
    PbdsHeaderShadowDirective.prototype.shadow;
    /** @type {?} */
    PbdsHeaderShadowDirective.prototype.item;
    /**
     * @type {?}
     * @private
     */
    PbdsHeaderShadowDirective.prototype._scroll;
    /**
     * @type {?}
     * @private
     */
    PbdsHeaderShadowDirective.prototype._element;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLXNoYWRvdy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wYi1kZXNpZ24tc3lzdGVtLyIsInNvdXJjZXMiOlsibGliL2hlYWRlci1zaGFkb3cvaGVhZGVyLXNoYWRvdy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBaUIsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUtuRCxNQUFNLE9BQU8seUJBQXlCOzs7OztJQVdwQyxZQUFvQixPQUF5QixFQUFVLFFBQW9CO1FBQXZELFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBWTtJQUFHLENBQUM7Ozs7SUFMNUMsY0FBYzs7Y0FDekMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUU7UUFDL0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQy9CLENBQUM7Ozs7SUFJRCxlQUFlO1FBQ2IsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFOztrQkFDUCxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdkQsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFFBQVE7Ozs7WUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDckMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7WUFDaEQsQ0FBQyxFQUFDLENBQUM7U0FDSjtJQUNILENBQUM7OztZQXZCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjthQUMvQjs7OztZQUpRLGdCQUFnQjtZQURxQyxVQUFVOzs7cUJBT3JFLFdBQVcsU0FBQywwQkFBMEI7bUJBR3RDLEtBQUssU0FBQyxrQkFBa0I7NkJBRXhCLFlBQVksU0FBQyxlQUFlLEVBQUUsRUFBRTs7OztJQUxqQywyQ0FDZ0I7O0lBRWhCLHlDQUFzQzs7Ozs7SUFPMUIsNENBQWlDOzs7OztJQUFFLDZDQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBIb3N0QmluZGluZywgQWZ0ZXJWaWV3SW5pdCwgRWxlbWVudFJlZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZpZXdwb3J0U2Nyb2xsZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcGJkc0hlYWRlclNoYWRvd10nXG59KVxuZXhwb3J0IGNsYXNzIFBiZHNIZWFkZXJTaGFkb3dEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5wYmRzLWhlYWRlci1zaGFkb3cnKVxuICBzaGFkb3c6IGJvb2xlYW47XG5cbiAgQElucHV0KCdwYmRzSGVhZGVyU2hhZG93JykgaXRlbTogbnVsbDtcblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6c2Nyb2xsJywgW10pIG9uV2luZG93U2Nyb2xsKCkge1xuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMuX3Njcm9sbC5nZXRTY3JvbGxQb3NpdGlvbigpO1xuICAgIHRoaXMuc2hhZG93ID0gb2Zmc2V0WzFdID4gMjA7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zY3JvbGw6IFZpZXdwb3J0U2Nyb2xsZXIsIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYpIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmICh0aGlzLml0ZW0pIHtcbiAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcihgJHt0aGlzLml0ZW19YCk7XG4gICAgICBkaXYuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZXZlbnQgPT4ge1xuICAgICAgICB0aGlzLnNoYWRvdyA9IGV2ZW50LnNyY0VsZW1lbnQuc2Nyb2xsVG9wID4gMjA7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==