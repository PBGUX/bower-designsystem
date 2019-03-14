import { OnInit, ElementRef } from '@angular/core';
import { PbdsDatavizSparkline } from './dataviz.interfaces';
export declare class PbdsDatavizSparklineComponent implements OnInit {
    private _element;
    chartClass: boolean;
    sparklineClass: boolean;
    data: PbdsDatavizSparkline;
    width: number;
    height: number;
    color: string;
    colorNegative: string;
    type: 'line' | 'area' | 'bar';
    strokeWidth: number;
    minBuffer: number;
    maxBuffer: number;
    private chart;
    private svg;
    private margin;
    constructor(_element: ElementRef);
    ngOnInit(): void;
}
