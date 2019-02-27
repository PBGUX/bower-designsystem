import { AfterViewInit, ElementRef } from '@angular/core';
import { ViewportScroller } from '@angular/common';
export declare class PbdsHeaderShadowDirective implements AfterViewInit {
    private _scroll;
    private _element;
    shadow: boolean;
    item: null;
    onWindowScroll(): void;
    constructor(_scroll: ViewportScroller, _element: ElementRef);
    ngAfterViewInit(): void;
}
