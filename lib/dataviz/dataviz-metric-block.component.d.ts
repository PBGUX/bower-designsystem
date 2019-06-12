import { OnInit, ElementRef } from '@angular/core';
export declare class PbdsDatavizMetricBlockComponent implements OnInit {
    class: string;
    heading: string;
    value: number;
    unit: string;
    description: string;
    centered: boolean;
    hideValueMargin: boolean;
    isPercentUnit: boolean;
    isUnit: boolean;
    readonly hostClasses: string;
    indicatorRef: ElementRef;
    constructor();
    ngOnInit(): void;
}
