/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, HostListener, HostBinding, ElementRef, Input } from '@angular/core';
import { ViewportScroller } from '@angular/common';
var PbdsHeaderShadowDirective = /** @class */ (function () {
    function PbdsHeaderShadowDirective(_scroll, _element) {
        this._scroll = _scroll;
        this._element = _element;
    }
    /**
     * @return {?}
     */
    PbdsHeaderShadowDirective.prototype.onWindowScroll = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var offset = this._scroll.getScrollPosition();
        this.shadow = offset[1] > 20;
    };
    /**
     * @return {?}
     */
    PbdsHeaderShadowDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.item) {
            /** @type {?} */
            var div = document.body.querySelector("" + this.item);
            div.addEventListener('scroll', function (event) {
                _this.shadow = event.srcElement.scrollTop > 20;
            });
        }
    };
    PbdsHeaderShadowDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[pbdsHeaderShadow]'
                },] }
    ];
    /** @nocollapse */
    PbdsHeaderShadowDirective.ctorParameters = function () { return [
        { type: ViewportScroller },
        { type: ElementRef }
    ]; };
    PbdsHeaderShadowDirective.propDecorators = {
        shadow: [{ type: HostBinding, args: ['class.pbds-header-shadow',] }],
        item: [{ type: Input, args: ['pbdsHeaderShadow',] }],
        onWindowScroll: [{ type: HostListener, args: ['window:scroll', [],] }]
    };
    return PbdsHeaderShadowDirective;
}());
export { PbdsHeaderShadowDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLXNoYWRvdy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wYi1kZXNpZ24tc3lzdGVtLyIsInNvdXJjZXMiOlsibGliL2hlYWRlci1zaGFkb3cvaGVhZGVyLXNoYWRvdy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBaUIsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVuRDtJQWNFLG1DQUFvQixPQUF5QixFQUFVLFFBQW9CO1FBQXZELFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBWTtJQUFHLENBQUM7Ozs7SUFMNUMsa0RBQWM7OztJQUFqRDs7WUFDUSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRTtRQUMvQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDL0IsQ0FBQzs7OztJQUlELG1EQUFlOzs7SUFBZjtRQUFBLGlCQU9DO1FBTkMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFOztnQkFDUCxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBRyxJQUFJLENBQUMsSUFBTSxDQUFDO1lBQ3ZELEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsVUFBQSxLQUFLO2dCQUNsQyxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUNoRCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7Z0JBdkJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2lCQUMvQjs7OztnQkFKUSxnQkFBZ0I7Z0JBRHFDLFVBQVU7Ozt5QkFPckUsV0FBVyxTQUFDLDBCQUEwQjt1QkFHdEMsS0FBSyxTQUFDLGtCQUFrQjtpQ0FFeEIsWUFBWSxTQUFDLGVBQWUsRUFBRSxFQUFFOztJQWVuQyxnQ0FBQztDQUFBLEFBeEJELElBd0JDO1NBckJZLHlCQUF5Qjs7O0lBQ3BDLDJDQUNnQjs7SUFFaEIseUNBQXNDOzs7OztJQU8xQiw0Q0FBaUM7Ozs7O0lBQUUsNkNBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIEhvc3RCaW5kaW5nLCBBZnRlclZpZXdJbml0LCBFbGVtZW50UmVmLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmlld3BvcnRTY3JvbGxlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1twYmRzSGVhZGVyU2hhZG93XSdcbn0pXG5leHBvcnQgY2xhc3MgUGJkc0hlYWRlclNoYWRvd0RpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnBiZHMtaGVhZGVyLXNoYWRvdycpXG4gIHNoYWRvdzogYm9vbGVhbjtcblxuICBASW5wdXQoJ3BiZHNIZWFkZXJTaGFkb3cnKSBpdGVtOiBudWxsO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpzY3JvbGwnLCBbXSkgb25XaW5kb3dTY3JvbGwoKSB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5fc2Nyb2xsLmdldFNjcm9sbFBvc2l0aW9uKCk7XG4gICAgdGhpcy5zaGFkb3cgPSBvZmZzZXRbMV0gPiAyMDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3Njcm9sbDogVmlld3BvcnRTY3JvbGxlciwgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZikge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKHRoaXMuaXRlbSkge1xuICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKGAke3RoaXMuaXRlbX1gKTtcbiAgICAgIGRpdi5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBldmVudCA9PiB7XG4gICAgICAgIHRoaXMuc2hhZG93ID0gZXZlbnQuc3JjRWxlbWVudC5zY3JvbGxUb3AgPiAyMDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19