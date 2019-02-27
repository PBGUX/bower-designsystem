export interface IPbdsDatavizPie {
    label: string;
    value: number;
}
export interface IPbdsDatavizBar {
    label: string;
    value: number;
}
export interface IPbdsDatavizGauge {
    minvalue: number;
    maxvalue: number;
    value: number;
}
export interface IPbdsDatavizSparkline {
    [index: number]: number;
    length: number;
}
export interface IPbdsDatavizLine {
    dates: Array<string>;
    series: Array<IPbdsDatavizLineSeries>;
}
export interface IPbdsDatavizLineSeries {
    label: string;
    values: Array<number>;
}
