/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ElementRef, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { select as d3_select, isoParse as d3_isoParse, isoFormat as d3_isoFormat, timeFormat as d3_timeFormat, format as d3_format, scaleOrdinal as d3_scaleOrdinal, scaleTime as d3_scaleTime, line as d3_line, scaleLinear as d3_scaleLinear, extent as d3_extent, min as d3_min, max as d3_max, axisBottom as d3_axisBottom, axisLeft as d3_axisLeft, event as d3_event, curveCatmullRom as d3_curveCatmullRom, mouse as d3_mouse, bisectLeft as d3_bisectLeft, area as d3_area } from 'd3';
import { PbdsDatavizService } from './dataviz.service';
export class PbdsDatavizLineComponent {
    /**
     * @param {?} _dataviz
     * @param {?} _element
     * @param {?} _scroll
     */
    constructor(_dataviz, _element, _scroll) {
        this._dataviz = _dataviz;
        this._element = _element;
        this._scroll = _scroll;
        this.chartClass = true;
        this.lineClass = true;
        this.width = 306;
        this.height = 400;
        this.type = 'medium'; // debug to show all chart options
        // debug to show all chart options
        this.area = false;
        this.xAxisFormatString = '';
        this.xAxisTicks = 6;
        this.yAxisFormatString = '';
        this.yAxisTicks = 5;
        this.hideLegend = false;
        this.legendWidth = 105 + 28; // hardcoded legend width + left margin, do not document until feedback
        // hardcoded legend width + left margin, do not document until feedback
        this.legendPosition = 'right';
        this.legendLabelFormatType = null;
        this.legendLabelFormatString = '';
        this.tooltipHeadingFormatString = '';
        this.tooltipLabelFormatType = null;
        this.tooltipLabelFormatString = '';
        this.tooltipValueFormatType = null;
        this.tooltipValueFormatString = '';
        this.marginTop = 10; // hardcoded on purpose, do not document until feedback
        // hardcoded on purpose, do not document until feedback
        this.marginRight = 20; // hardcoded on purpose, do not document until feedback
        // hardcoded on purpose, do not document until feedback
        this.marginBottom = 30; // hardcoded on purpose, do not document until feedback
        // hardcoded on purpose, do not document until feedback
        this.marginLeft = 55; // hardcoded on purpose, do not document until feedback
        // hardcoded on purpose, do not document until feedback
        this.hovered = new EventEmitter();
        this.clicked = new EventEmitter();
        this.tooltipHovered = new EventEmitter();
        this.tooltipClicked = new EventEmitter();
        this.updateChart = () => {
            this.mouserect.data(this.data);
            // update the xScale
            this.xAxisScale.domain(d3_extent(this.data.dates, (d, i) => {
                return d3_isoParse(d);
            }));
            // update the yScale
            this.yAxisScale
                .domain([
                d3_min(this.data.series, (d, i) => {
                    return +d3_min(d.values);
                }),
                d3_max(this.data.series, (d, i) => {
                    return +d3_max(d.values);
                })
            ])
                .nice();
            this.xAxis
                .transition()
                .duration(1000)
                .call(this.xAxisCall);
            this.yAxis
                .transition()
                .duration(1000)
                .call(this.yAxisCall);
            // update the grids
            if (!this.hideXGrid) {
                this.xGrid
                    .transition()
                    .duration(1000)
                    .call(this.xGridCall);
            }
            if (!this.hideYGrid) {
                this.yGrid
                    .transition()
                    .duration(1000)
                    .call(this.yGridCall);
            }
            /** @type {?} */
            let group = this.svg.selectAll('.line-group').data(this.data.series);
            // remove lines
            group.exit().remove();
            // update existing
            group
                .select('path.line')
                .transition()
                .duration(1000)
                .attr('d', d => this.d3line(d.values));
            if (this.area) {
                group
                    .select('path.area')
                    .transition()
                    .duration(1000)
                    .attr('d', d => this.d3area(d.values));
            }
            group
                .selectAll('circle')
                .data(d => d.values)
                .transition()
                .duration(1000)
                .attr('cx', (d, i) => this.xAxisScale(d3_isoParse(this.data.dates[i])))
                .attr('cy', d => this.yAxisScale(d));
            // add group on enter
            /** @type {?} */
            const groupEnter = group
                .enter()
                .append('g')
                .attr('class', 'line-group');
            // add line on enter
            /** @type {?} */
            const line = groupEnter
                .append('path')
                .attr('class', 'line')
                .style('color', d => this.colorRange(d.label))
                .style('stroke-width', this.lineWidth)
                .transition()
                .duration(1000)
                .attr('d', data => this.d3line(data.values));
            if (this.area) {
                groupEnter
                    .append('path')
                    .attr('class', 'area')
                    .attr('d', data => this.d3area(data.values))
                    .style('color', d => this.colorRange(d.label));
            }
            // add points
            if (this.linePoints) {
                /** @type {?} */
                const points = groupEnter
                    .append('g')
                    .attr('class', 'points')
                    .style('color', d => this.colorRange(d.label));
                /** @type {?} */
                const circles = points.selectAll('circle').data(d => d.values);
                circles
                    .enter()
                    .append('circle')
                    .attr('cx', (d, i) => this.xAxisScale(d3_isoParse(this.data.dates[i])))
                    .attr('cy', d => this.yAxisScale(d))
                    .attr('r', this.lineWidth * 2)
                    .style('stroke-width', this.lineWidth);
            }
            if (this.type !== 'high') {
                line.attr('filter', 'url(#glow)');
            }
            if (!this.hideLegend) {
                /** @type {?} */
                let legendItem = this.chart
                    .select('.legend')
                    .selectAll('.legend-item')
                    .data(this.data.series);
                legendItem.exit().remove();
                // update existing items
                legendItem.select('.legend-label').html(d => {
                    switch (this.legendLabelFormatType) {
                        case 'number':
                            return this.legendLabelFormat(d.label);
                        case 'time':
                            /** @type {?} */
                            const parsedTime = d3_isoParse(d.label);
                            return this.legendLabelFormat(parsedTime);
                        default:
                            return d.label;
                    }
                });
                // legend items on enter
                /** @type {?} */
                let enterLegendItem = legendItem
                    .enter()
                    .append('li')
                    .attr('class', 'legend-item');
                enterLegendItem
                    .append('span')
                    .attr('class', 'legend-key')
                    .style('background-color', d => this.colorRange(d.label));
                enterLegendItem
                    .append('span')
                    .attr('class', 'legend-label')
                    .html(d => {
                    switch (this.legendLabelFormatType) {
                        case 'number':
                            return this.legendLabelFormat(d.label);
                        case 'time':
                            /** @type {?} */
                            const parsedTime = d3_isoParse(d.label);
                            return this.legendLabelFormat(parsedTime);
                        default:
                            return d.label;
                    }
                });
                enterLegendItem
                    .on('mouseover', (data, index, nodes) => this.legendMouseOver(d3_event, data, index, nodes))
                    .on('mouseout', () => this.legendMouseOut())
                    .on('click', (data, index, nodes) => this.legendMouseClick(d3_event, data, index, nodes));
            }
            if (!this.hideTooltip) {
                /** @type {?} */
                let tooltipItem = this.tooltip
                    .select('.tooltip-table')
                    .selectAll('tr')
                    .data(this.data.series);
                tooltipItem.exit().remove();
                // update existing items
                tooltipItem.select('.tooltip-label pr-2').html(d => {
                    return this.tooltipHeadingFormat(d.label);
                });
                // items on enter
                /** @type {?} */
                let entertooltipItem = tooltipItem
                    .enter()
                    .append('tr')
                    .attr('class', 'tooltip-item');
                entertooltipItem
                    .append('td')
                    .style('color', d => this.colorRange(d.label))
                    .append('span')
                    .attr('class', 'pbds-tooltip-key');
                entertooltipItem
                    .append('td')
                    .attr('class', 'tooltip-label pr-2')
                    .html(d => {
                    return this.tooltipLabelFormatType ? this.tooltipLabelFormat(d.label) : d.label;
                });
                entertooltipItem
                    .append('td')
                    .attr('class', 'tooltip-value text-right')
                    .html(d => '');
            }
            this.mouserect.raise();
        };
        this.legendMouseOver = (event, data, index, nodes) => {
            this.chart
                .selectAll('.legend-item')
                .filter((d, i) => i !== index)
                .classed('inactive', true);
            this.chart
                .selectAll('.line-group')
                .filter((d, i) => i !== index)
                .classed('inactive', true);
            /** @type {?} */
            const line = this.chart.selectAll('.line-group').filter((d, i) => i === index);
            line.classed('active', true);
            if (this.linePoints) {
                /** @type {?} */
                const circles = line.selectAll('circle');
                circles.classed('active', true);
            }
            this.hovered.emit({ event, data });
        };
        this.legendMouseOut = () => {
            this.chart.selectAll('.legend-item').classed('inactive', false);
            this.chart
                .selectAll('.line-group')
                .classed('inactive', false)
                .classed('active', false);
            if (this.linePoints) {
                /** @type {?} */
                const circles = this.chart.selectAll('circle');
                circles.classed('active', false);
            }
        };
        this.legendMouseClick = (event, data, index, nodes) => {
            this.clicked.emit({ event, data });
        };
        this.mouserectMouseMove = (event, index, nodes) => {
            /** @type {?} */
            const mouseXDate = this.xAxisScale.invert(d3_mouse(nodes[0])[0]);
            // return date at mouse x position
            /** @type {?} */
            const leftIndex = d3_bisectLeft(this.data.dates, d3_isoFormat(mouseXDate));
            // prevent error for 0 index
            if (leftIndex === 0)
                return false;
            /** @type {?} */
            const dateLower = new Date(this.data.dates[leftIndex - 1]);
            /** @type {?} */
            const dateUpper = new Date(this.data.dates[leftIndex]);
            /** @type {?} */
            const closestDate = +mouseXDate - +dateLower > +dateUpper - mouseXDate ? dateUpper : dateLower;
            // date mouse is closest to
            /** @type {?} */
            const closestIndex = this.data.dates.indexOf(d3_isoFormat(closestDate));
            // which index the mouse is closest to
            // console.log(+mouseXDate, leftIndex, +dateLower, +dateUpper, +closestDate, closestIndex);
            /** @type {?} */
            const circles = this.svg.selectAll('.line-group').selectAll('circle');
            circles.filter((d, i) => i === closestIndex).classed('active', true);
            circles.filter((d, i) => i !== closestIndex).classed('active', false);
            this.tooltipLine
                .attr('x1', this.xAxisScale(closestDate))
                .attr('x2', this.xAxisScale(closestDate))
                .classed('active', true);
            // console.log(this.tooltipLine.node().getBoundingClientRect(), this._scroll.getScrollPosition());
            this.tooltipShow(this.tooltipLine.node(), closestIndex);
            this.mousedata = {
                date: closestDate,
                series: this.data.series.map(d => {
                    return {
                        label: d.label,
                        value: d.values[closestIndex]
                    };
                })
            };
            this.tooltipHovered.emit({ event, data: this.mousedata });
        };
        this.mouserectMouseOut = (event, index, nodes) => {
            this.svg.selectAll('circle').classed('active', false);
            this.tooltipLine.classed('active', false);
            this.tooltipHide();
        };
        this.mouserectMouseClick = () => {
            this.tooltipClicked.emit({ event, data: this.mousedata });
        };
        this.tooltipShow = (node, closestIndex) => {
            /** @type {?} */
            let scroll = this._scroll.getScrollPosition();
            /** @type {?} */
            let dimensions = node.getBoundingClientRect();
            this.tooltip.select('.tooltip-header').html(d => {
                /** @type {?} */
                const parsedTime = d3_isoParse(this.data.dates[closestIndex]);
                return this.tooltipHeadingFormat(parsedTime);
            });
            this.tooltip.selectAll('.tooltip-value').html((d, i) => {
                return this.tooltipValueFormatType
                    ? this.tooltipValueFormat(this.data.series[i].values[closestIndex])
                    : this.data.series[i].values[closestIndex];
            });
            /** @type {?} */
            let tooltipOffsetHeight = +this.tooltip.node().offsetHeight;
            this.tooltip.style('top', `${dimensions.y + dimensions.height / 2 - tooltipOffsetHeight / 2 + scroll[1]}px`);
            this.tooltip.style('left', `${dimensions.x + 8}px`);
            this.tooltip.style('opacity', 1);
        };
        this.tooltipHide = () => {
            this.tooltip.style('opacity', 0);
        };
        this.xAxisFormatter = item => {
            /** @type {?} */
            const parseDate = d3_isoParse(item);
            return this.xAxisFormat(parseDate);
        };
        this.yAxisFormatter = item => {
            return this.yAxisFormat(item);
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.margin = {
            top: +this.marginTop,
            right: +this.marginRight,
            bottom: +this.marginBottom,
            left: +this.marginLeft
        };
        this.xAxisFormat = d3_timeFormat(this.xAxisFormatString);
        this.yAxisFormat = d3_format(this.yAxisFormatString);
        switch (this.legendLabelFormatType) {
            case 'number':
                this.legendLabelFormat = d3_format(this.legendLabelFormatString);
                break;
            case 'time':
                this.legendLabelFormat = d3_timeFormat(this.legendLabelFormatString);
                break;
            default:
                this.legendLabelFormat = null;
                break;
        }
        this.tooltipHeadingFormat = d3_timeFormat(this.tooltipHeadingFormatString);
        switch (this.tooltipLabelFormatType) {
            case 'number':
                this.tooltipLabelFormat = d3_format(this.tooltipLabelFormatString);
                break;
            case 'time':
                this.tooltipLabelFormat = d3_timeFormat(this.tooltipLabelFormatString);
                break;
            default:
                this.tooltipLabelFormat = null;
                break;
        }
        switch (this.tooltipValueFormatType) {
            case 'number':
                this.tooltipValueFormat = d3_format(this.tooltipValueFormatString);
                break;
            case 'time':
                this.tooltipValueFormat = d3_timeFormat(this.tooltipValueFormatString);
                break;
            default:
                this.tooltipValueFormat = null;
        }
        // defaults for all chart types
        this.lineWidth = 3;
        this.lineCurved = true;
        this.linePoints = true;
        this.hideXAxis = false;
        this.hideYAxis = false;
        this.hideXAxisZero = false;
        this.hideYAxisZero = false;
        this.hideXGrid = false;
        this.hideYGrid = false;
        this.hideXAxisDomain = false;
        this.hideYAxisDomain = false;
        this.hideTooltip = false;
        this.hideXAxisTicks = false;
        this.hideYAxisTicks = false;
        this.xAxisTickSize = 8;
        this.xAxisTickSizeOuter = 0;
        this.yAxisTickSize = 8;
        this.yAxisTickSizeOuter = 0;
        if (this.type !== 'debug') {
            // set type defaults
            switch (this.type) {
                case 'medium':
                    this.hideXGrid = true;
                    this.hideXAxisTicks = true;
                    this.hideYAxisTicks = true;
                    this.hideYGrid = true;
                    break;
                case 'high':
                    this.lineWidth = 2;
                    this.lineCurved = false;
                    this.linePoints = false;
                    this.hideXAxisTicks = true;
                    this.hideYAxisTicks = true;
                    break;
            }
        }
        // adjust margin if xAxis hidden
        if (this.hideXAxis)
            this.margin.bottom = 10; // need small margin for yAxis with 0 tick label
        if (!this.hideLegend && this.legendPosition === 'right') {
            this.width = +this.width - +this.legendWidth;
        }
        // define line
        this.d3line = d3_line()
            .x((d, i) => this.xAxisScale(d3_isoParse(this.data.dates[i])))
            .y((d) => this.yAxisScale(d));
        // define line curve
        if (this.lineCurved) {
            this.d3line.curve(d3_curveCatmullRom.alpha(0.5));
        }
        // define area
        if (this.area) {
            this.d3area = d3_area()
                .x((d, i) => this.xAxisScale(d3_isoParse(this.data.dates[i])))
                .y0(this.height)
                .y1((d, i) => this.yAxisScale(d));
            if (this.lineCurved) {
                this.d3area.curve(d3_curveCatmullRom.alpha(0.5));
            }
        }
        // create the chart
        this.chart = d3_select(this._element.nativeElement).attr('aria-hidden', 'true');
        // create chart svg
        this.svg = this.chart
            .append('svg')
            .attr('width', +this.width + this.margin.right)
            .attr('height', +this.height + this.margin.top + this.margin.bottom)
            .attr('class', 'img-fluid')
            .attr('preserveAspectRatio', 'xMinYMin meet')
            .attr('viewBox', `-${this.margin.left} -${this.margin.top} ${+this.width + this.margin.right} ${+this.height +
            this.margin.top +
            this.margin.bottom}`);
        // add rectangle to capture mouse
        this.mouserect = this.svg
            .append('rect')
            .attr('width', this.width - this.margin.left - this.margin.right)
            .attr('height', this.height)
            .attr('class', 'mouserect')
            .on('mousemove', (data, index, nodes) => this.mouserectMouseMove(d3_event, index, nodes))
            .on('mouseout', (data, index, nodes) => this.mouserectMouseOut(d3_event, index, nodes))
            .on('click', (data, index, nodes) => this.mouserectMouseClick());
        this.tooltipLine = this.svg
            .append('line')
            .attr('y1', 0)
            .attr('y2', this.height)
            .attr('class', 'tooltip-line');
        // define color range
        this.colorRange = d3_scaleOrdinal().range(this._dataviz.getColors(false));
        // add glow def
        this._dataviz.createGlowFilter(this.svg);
        // X AXIS
        this.xAxisScale = d3_scaleTime()
            .domain(d3_extent(this.data.dates, (d, i) => {
            return d3_isoParse(d);
        }))
            .range([0, this.width - this.margin.left - this.margin.right]);
        this.xAxisCall = d3_axisBottom(this.xAxisScale)
            .ticks(+this.xAxisTicks)
            .tickSize(this.xAxisTickSize)
            .tickSizeOuter(this.xAxisTickSizeOuter)
            .tickFormat(this.xAxisFormatter);
        this.xAxis = this.svg
            .append('g')
            .attr('class', 'axis axis-x')
            .attr('transform', `translate(0, ${this.height})`) //${-this.margin.right / 2}
            .classed('axis-hidden', this.hideXAxis)
            .classed('axis-zero-hidden', this.hideXAxisZero)
            .classed('axis-domain-hidden', this.hideXAxisDomain)
            .classed('axis-ticks-hidden', this.hideXAxisTicks)
            .call(this.xAxisCall);
        // X GRIDLINES
        if (!this.hideXGrid) {
            this.xGridCall = d3_axisBottom(this.xAxisScale).tickSize(-this.height);
            this.xGrid = this.svg
                .append('g')
                .attr('class', 'grid grid-x')
                .classed('grid-zero-hidden', this.hideXAxisZero)
                .attr('transform', `translate(0, ${this.height})`) //${-this.margin.right / 2}
                .call(this.xGridCall);
        }
        // Y AXIS
        this.yAxisScale = d3_scaleLinear()
            .domain([
            d3_min(this.data.series, (d, i) => {
                return +d3_min(d.values);
            }),
            d3_max(this.data.series, (d, i) => {
                return +d3_max(d.values);
            })
        ])
            .nice()
            .range([this.height, 0]);
        this.yAxisCall = d3_axisLeft(this.yAxisScale)
            .ticks(this.yAxisTicks)
            .tickSize(this.yAxisTickSize)
            .tickSizeOuter(this.yAxisTickSizeOuter)
            .tickFormat(this.yAxisFormatter);
        this.yAxis = this.svg
            .append('g')
            .attr('class', 'axis axis-y')
            .classed('axis-hidden', this.hideYAxis)
            .classed('axis-zero-hidden', this.hideYAxisZero)
            .classed('axis-domain-hidden', this.hideYAxisDomain)
            .classed('axis-ticks-hidden', this.hideYAxisTicks)
            .call(this.yAxisCall);
        // Y GRIDLINES
        if (!this.hideYGrid) {
            this.yGridCall = d3_axisLeft(this.yAxisScale)
                .ticks(this.yAxisTicks)
                .tickSize(-this.width + this.margin.left + this.margin.right);
            this.yGrid = this.svg
                .append('g')
                .attr('class', 'grid grid-y')
                .classed('grid-zero-hidden', this.hideYAxisZero)
                .attr('transform', `translate(0, 0)`)
                .call(this.yGridCall);
        }
        // TOOLTIP
        if (!this.hideTooltip) {
            this.tooltip = d3_select('body')
                .append('div')
                .attr('class', 'pbds-tooltip west')
                .style('opacity', 0)
                .attr('aria-hidden', 'true'); // hide tooltip for accessibility
            // tooltip header
            this.tooltip.append('div').attr('class', 'tooltip-header');
            // tooltip table
            /** @type {?} */
            const tooltipTable = this.tooltip.append('table').attr('class', 'tooltip-table text-left w-100');
            /** @type {?} */
            const tooltipTableTbody = tooltipTable.append('tbody');
            tooltipTableTbody
                .selectAll('tr')
                .data(this.data)
                .enter()
                .append('tr');
        }
        // add legend classes
        if (!this.hideLegend) {
            this.chart.classed('pbds-chart-legend-bottom', this.legendPosition === 'bottom' ? true : false);
            this.chart.append('ul').attr('class', `legend legend-${this.legendPosition}`);
        }
        this.updateChart();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.data && !changes.data.firstChange) {
            this.updateChart();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.tooltip)
            this.tooltip.remove();
    }
}
PbdsDatavizLineComponent.decorators = [
    { type: Component, args: [{
                selector: 'pbds-dataviz-line',
                template: ``,
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
PbdsDatavizLineComponent.ctorParameters = () => [
    { type: PbdsDatavizService },
    { type: ElementRef },
    { type: ViewportScroller }
];
PbdsDatavizLineComponent.propDecorators = {
    chartClass: [{ type: HostBinding, args: ['class.pbds-chart',] }],
    lineClass: [{ type: HostBinding, args: ['class.pbds-chart-line',] }],
    data: [{ type: Input }],
    width: [{ type: Input }],
    height: [{ type: Input }],
    type: [{ type: Input }],
    area: [{ type: Input }],
    xAxisFormatString: [{ type: Input }],
    xAxisTicks: [{ type: Input }],
    yAxisFormatString: [{ type: Input }],
    yAxisTicks: [{ type: Input }],
    hideLegend: [{ type: Input }],
    legendWidth: [{ type: Input }],
    legendPosition: [{ type: Input }],
    legendLabelFormatType: [{ type: Input }],
    legendLabelFormatString: [{ type: Input }],
    tooltipHeadingFormatString: [{ type: Input }],
    tooltipLabelFormatType: [{ type: Input }],
    tooltipLabelFormatString: [{ type: Input }],
    tooltipValueFormatType: [{ type: Input }],
    tooltipValueFormatString: [{ type: Input }],
    marginTop: [{ type: Input }],
    marginRight: [{ type: Input }],
    marginBottom: [{ type: Input }],
    marginLeft: [{ type: Input }],
    hovered: [{ type: Output }],
    clicked: [{ type: Output }],
    tooltipHovered: [{ type: Output }],
    tooltipClicked: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.chartClass;
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.lineClass;
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.data;
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.width;
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.height;
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.type;
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.area;
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.xAxisFormatString;
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.xAxisTicks;
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.yAxisFormatString;
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.yAxisTicks;
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.hideLegend;
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.legendWidth;
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.legendPosition;
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.legendLabelFormatType;
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.legendLabelFormatString;
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.tooltipHeadingFormatString;
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.tooltipLabelFormatType;
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.tooltipLabelFormatString;
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.tooltipValueFormatType;
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.tooltipValueFormatString;
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.marginTop;
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.marginRight;
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.marginBottom;
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.marginLeft;
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.hovered;
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.clicked;
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.tooltipHovered;
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.tooltipClicked;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.chart;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.svg;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.mouserect;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.tooltipLine;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.margin;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.d3line;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.d3area;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.lineWidth;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.lineCurved;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.linePoints;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.colorRange;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.xAxisScale;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.xAxisCall;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.xAxis;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.xAxisFormat;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.yAxisScale;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.yAxisCall;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.yAxis;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.yAxisFormat;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.xGrid;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.xGridCall;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.yGrid;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.yGridCall;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.xAxisTickSize;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.xAxisTickSizeOuter;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.yAxisTickSize;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.yAxisTickSizeOuter;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.hideXAxis;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.hideYAxis;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.hideXAxisDomain;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.hideYAxisDomain;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.hideXAxisZero;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.hideYAxisZero;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.hideXGrid;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.hideYGrid;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.hideXAxisTicks;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.hideYAxisTicks;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.legendLabelFormat;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.tooltip;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.hideTooltip;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.tooltipHeadingFormat;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.tooltipValueFormat;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.tooltipLabelFormat;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.mousedata;
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.updateChart;
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.legendMouseOver;
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.legendMouseOut;
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.legendMouseClick;
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.mouserectMouseMove;
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.mouserectMouseOut;
    /** @type {?} */
    PbdsDatavizLineComponent.prototype.mouserectMouseClick;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.tooltipShow;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.tooltipHide;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.xAxisFormatter;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype.yAxisFormatter;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype._dataviz;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype._element;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizLineComponent.prototype._scroll;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXZpei1saW5lLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3BiLWRlc2lnbi1zeXN0ZW0vIiwic291cmNlcyI6WyJsaWIvZGF0YXZpei9kYXRhdml6LWxpbmUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUdULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFVBQVUsRUFDVixXQUFXLEVBR1gsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRW5ELE9BQU8sRUFDTCxNQUFNLElBQUksU0FBUyxFQUNuQixRQUFRLElBQUksV0FBVyxFQUN2QixTQUFTLElBQUksWUFBWSxFQUN6QixVQUFVLElBQUksYUFBYSxFQUMzQixNQUFNLElBQUksU0FBUyxFQUNuQixZQUFZLElBQUksZUFBZSxFQUMvQixTQUFTLElBQUksWUFBWSxFQUN6QixJQUFJLElBQUksT0FBTyxFQUNmLFdBQVcsSUFBSSxjQUFjLEVBQzdCLE1BQU0sSUFBSSxTQUFTLEVBQ25CLEdBQUcsSUFBSSxNQUFNLEVBQ2IsR0FBRyxJQUFJLE1BQU0sRUFDYixVQUFVLElBQUksYUFBYSxFQUMzQixRQUFRLElBQUksV0FBVyxFQUN2QixLQUFLLElBQUksUUFBUSxFQUNqQixlQUFlLElBQUksa0JBQWtCLEVBQ3JDLEtBQUssSUFBSSxRQUFRLEVBQ2pCLFVBQVUsSUFBSSxhQUFhLEVBQzNCLElBQUksSUFBSSxPQUFPLEVBQ2hCLE1BQU0sSUFBSSxDQUFDO0FBRVosT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFTdkQsTUFBTSxPQUFPLHdCQUF3Qjs7Ozs7O0lBcUluQyxZQUFvQixRQUE0QixFQUFVLFFBQW9CLEVBQVUsT0FBeUI7UUFBN0YsYUFBUSxHQUFSLFFBQVEsQ0FBb0I7UUFBVSxhQUFRLEdBQVIsUUFB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O0lBQzlCLHNEQUFtQzs7Ozs7SUFDbkMsaURBQThCOzs7OztJQUM5QixzREFBbUM7Ozs7O0lBQ25DLDZDQUEyQjs7Ozs7SUFDM0IsNkNBQTJCOzs7OztJQUMzQixtREFBaUM7Ozs7O0lBQ2pDLG1EQUFpQzs7Ozs7SUFDakMsaURBQStCOzs7OztJQUMvQixpREFBK0I7Ozs7O0lBQy9CLDZDQUEyQjs7Ozs7SUFDM0IsNkNBQTJCOzs7OztJQUMzQixrREFBZ0M7Ozs7O0lBQ2hDLGtEQUFnQzs7Ozs7SUFDaEMscURBQTBCOzs7OztJQUMxQiwyQ0FBZ0I7Ozs7O0lBQ2hCLCtDQUE2Qjs7Ozs7SUFDN0Isd0RBQTZCOzs7OztJQUM3QixzREFBMkI7Ozs7O0lBQzNCLHNEQUEyQjs7Ozs7SUFDM0IsNkNBQWtCOztJQTBSbEIsK0NBeU5FOztJQUVGLG1EQW9CRTs7SUFFRixrREFZRTs7SUFFRixvREFFRTs7SUFFRixzREFvQ0U7O0lBRUYscURBSUU7O0lBRUYsdURBRUU7Ozs7O0lBRUYsK0NBb0JFOzs7OztJQUVGLCtDQUVFOzs7OztJQUVGLGtEQUdFOzs7OztJQUVGLGtEQUVFOzs7OztJQTVtQlUsNENBQW9DOzs7OztJQUFFLDRDQUE0Qjs7Ozs7SUFBRSwyQ0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIE9uSW5pdCxcbiAgT25DaGFuZ2VzLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBPbkRlc3Ryb3ksXG4gIFNpbXBsZUNoYW5nZXMsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBWaWV3cG9ydFNjcm9sbGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHtcbiAgc2VsZWN0IGFzIGQzX3NlbGVjdCxcbiAgaXNvUGFyc2UgYXMgZDNfaXNvUGFyc2UsXG4gIGlzb0Zvcm1hdCBhcyBkM19pc29Gb3JtYXQsXG4gIHRpbWVGb3JtYXQgYXMgZDNfdGltZUZvcm1hdCxcbiAgZm9ybWF0IGFzIGQzX2Zvcm1hdCxcbiAgc2NhbGVPcmRpbmFsIGFzIGQzX3NjYWxlT3JkaW5hbCxcbiAgc2NhbGVUaW1lIGFzIGQzX3NjYWxlVGltZSxcbiAgbGluZSBhcyBkM19saW5lLFxuICBzY2FsZUxpbmVhciBhcyBkM19zY2FsZUxpbmVhcixcbiAgZXh0ZW50IGFzIGQzX2V4dGVudCxcbiAgbWluIGFzIGQzX21pbixcbiAgbWF4IGFzIGQzX21heCxcbiAgYXhpc0JvdHRvbSBhcyBkM19heGlzQm90dG9tLFxuICBheGlzTGVmdCBhcyBkM19heGlzTGVmdCxcbiAgZXZlbnQgYXMgZDNfZXZlbnQsXG4gIGN1cnZlQ2F0bXVsbFJvbSBhcyBkM19jdXJ2ZUNhdG11bGxSb20sXG4gIG1vdXNlIGFzIGQzX21vdXNlLFxuICBiaXNlY3RMZWZ0IGFzIGQzX2Jpc2VjdExlZnQsXG4gIGFyZWEgYXMgZDNfYXJlYVxufSBmcm9tICdkMyc7XG5cbmltcG9ydCB7IFBiZHNEYXRhdml6U2VydmljZSB9IGZyb20gJy4vZGF0YXZpei5zZXJ2aWNlJztcbmltcG9ydCB7IElQYmRzRGF0YXZpekxpbmUgfSBmcm9tICcuL2RhdGF2aXouaW50ZXJmYWNlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BiZHMtZGF0YXZpei1saW5lJyxcbiAgdGVtcGxhdGU6IGBgLFxuICBzdHlsZXM6IFtdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBQYmRzRGF0YXZpekxpbmVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5wYmRzLWNoYXJ0JylcbiAgY2hhcnRDbGFzcyA9IHRydWU7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5wYmRzLWNoYXJ0LWxpbmUnKVxuICBsaW5lQ2xhc3MgPSB0cnVlO1xuXG4gIEBJbnB1dCgpXG4gIGRhdGE6IElQYmRzRGF0YXZpekxpbmU7XG5cbiAgQElucHV0KClcbiAgd2lkdGggPSAzMDY7XG5cbiAgQElucHV0KClcbiAgaGVpZ2h0ID0gNDAwO1xuXG4gIEBJbnB1dCgpXG4gIHR5cGU6ICdtZWRpdW0nIHwgJ2hpZ2gnIHwgJ2RlYnVnJyA9ICdtZWRpdW0nOyAvLyBkZWJ1ZyB0byBzaG93IGFsbCBjaGFydCBvcHRpb25zXG5cbiAgQElucHV0KClcbiAgYXJlYSA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIHhBeGlzRm9ybWF0U3RyaW5nID0gJyc7XG5cbiAgQElucHV0KClcbiAgeEF4aXNUaWNrcyA9IDY7XG5cbiAgQElucHV0KClcbiAgeUF4aXNGb3JtYXRTdHJpbmcgPSAnJztcblxuICBASW5wdXQoKVxuICB5QXhpc1RpY2tzID0gNTtcblxuICBASW5wdXQoKVxuICBoaWRlTGVnZW5kID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgbGVnZW5kV2lkdGggPSAxMDUgKyAyODsgLy8gaGFyZGNvZGVkIGxlZ2VuZCB3aWR0aCArIGxlZnQgbWFyZ2luLCBkbyBub3QgZG9jdW1lbnQgdW50aWwgZmVlZGJhY2tcblxuICBASW5wdXQoKVxuICBsZWdlbmRQb3NpdGlvbjogJ3JpZ2h0JyB8ICdib3R0b20nID0gJ3JpZ2h0JztcblxuICBASW5wdXQoKVxuICBsZWdlbmRMYWJlbEZvcm1hdFR5cGU6ICdudW1iZXInIHwgJ3RpbWUnID0gbnVsbDtcblxuICBASW5wdXQoKVxuICBsZWdlbmRMYWJlbEZvcm1hdFN0cmluZyA9ICcnO1xuXG4gIEBJbnB1dCgpXG4gIHRvb2x0aXBIZWFkaW5nRm9ybWF0U3RyaW5nID0gJyc7XG5cbiAgQElucHV0KClcbiAgdG9vbHRpcExhYmVsRm9ybWF0VHlwZTogJ251bWJlcicgfCAndGltZScgPSBudWxsO1xuXG4gIEBJbnB1dCgpXG4gIHRvb2x0aXBMYWJlbEZvcm1hdFN0cmluZyA9ICcnO1xuXG4gIEBJbnB1dCgpXG4gIHRvb2x0aXBWYWx1ZUZvcm1hdFR5cGU6ICdudW1iZXInIHwgJ3RpbWUnID0gbnVsbDtcblxuICBASW5wdXQoKVxuICB0b29sdGlwVmFsdWVGb3JtYXRTdHJpbmcgPSAnJztcblxuICBASW5wdXQoKVxuICBtYXJnaW5Ub3AgPSAxMDsgLy8gaGFyZGNvZGVkIG9uIHB1cnBvc2UsIGRvIG5vdCBkb2N1bWVudCB1bnRpbCBmZWVkYmFja1xuXG4gIEBJbnB1dCgpXG4gIG1hcmdpblJpZ2h0ID0gMjA7IC8vIGhhcmRjb2RlZCBvbiBwdXJwb3NlLCBkbyBub3QgZG9jdW1lbnQgdW50aWwgZmVlZGJhY2tcblxuICBASW5wdXQoKVxuICBtYXJnaW5Cb3R0b20gPSAzMDsgLy8gaGFyZGNvZGVkIG9uIHB1cnBvc2UsIGRvIG5vdCBkb2N1bWVudCB1bnRpbCBmZWVkYmFja1xuXG4gIEBJbnB1dCgpXG4gIG1hcmdpbkxlZnQgPSA1NTsgLy8gaGFyZGNvZGVkIG9uIHB1cnBvc2UsIGRvIG5vdCBkb2N1bWVudCB1bnRpbCBmZWVkYmFja1xuXG4gIEBPdXRwdXQoKVxuICBob3ZlcmVkOiBFdmVudEVtaXR0ZXI8b2JqZWN0PiA9IG5ldyBFdmVudEVtaXR0ZXI8b2JqZWN0PigpO1xuXG4gIEBPdXRwdXQoKVxuICBjbGlja2VkOiBFdmVudEVtaXR0ZXI8b2JqZWN0PiA9IG5ldyBFdmVudEVtaXR0ZXI8b2JqZWN0PigpO1xuXG4gIEBPdXRwdXQoKVxuICB0b29sdGlwSG92ZXJlZDogRXZlbnRFbWl0dGVyPG9iamVjdD4gPSBuZXcgRXZlbnRFbWl0dGVyPG9iamVjdD4oKTtcblxuICBAT3V0cHV0KClcbiAgdG9vbHRpcENsaWNrZWQ6IEV2ZW50RW1pdHRlcjxvYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcjxvYmplY3Q+KCk7XG5cbiAgcHJpdmF0ZSBjaGFydDtcbiAgcHJpdmF0ZSBzdmc7XG4gIHByaXZhdGUgbW91c2VyZWN0O1xuICBwcml2YXRlIHRvb2x0aXBMaW5lO1xuICBwcml2YXRlIG1hcmdpbjtcbiAgcHJpdmF0ZSBkM2xpbmU7XG4gIHByaXZhdGUgZDNhcmVhO1xuICBwcml2YXRlIGxpbmVXaWR0aDtcbiAgcHJpdmF0ZSBsaW5lQ3VydmVkO1xuICBwcml2YXRlIGxpbmVQb2ludHM7XG4gIHByaXZhdGUgY29sb3JSYW5nZTtcbiAgcHJpdmF0ZSB4QXhpc1NjYWxlO1xuICBwcml2YXRlIHhBeGlzQ2FsbDtcbiAgcHJpdmF0ZSB4QXhpcztcbiAgcHJpdmF0ZSB4QXhpc0Zvcm1hdDtcbiAgcHJpdmF0ZSB5QXhpc1NjYWxlO1xuICBwcml2YXRlIHlBeGlzQ2FsbDtcbiAgcHJpdmF0ZSB5QXhpcztcbiAgcHJpdmF0ZSB5QXhpc0Zvcm1hdDtcbiAgcHJpdmF0ZSB4R3JpZDtcbiAgcHJpdmF0ZSB4R3JpZENhbGw7XG4gIHByaXZhdGUgeUdyaWQ7XG4gIHByaXZhdGUgeUdyaWRDYWxsO1xuICBwcml2YXRlIHhBeGlzVGlja1NpemU6IG51bWJlcjtcbiAgcHJpdmF0ZSB4QXhpc1RpY2tTaXplT3V0ZXI6IG51bWJlcjtcbiAgcHJpdmF0ZSB5QXhpc1RpY2tTaXplOiBudW1iZXI7XG4gIHByaXZhdGUgeUF4aXNUaWNrU2l6ZU91dGVyOiBudW1iZXI7XG4gIHByaXZhdGUgaGlkZVhBeGlzOiBib29sZWFuO1xuICBwcml2YXRlIGhpZGVZQXhpczogYm9vbGVhbjtcbiAgcHJpdmF0ZSBoaWRlWEF4aXNEb21haW46IGJvb2xlYW47XG4gIHByaXZhdGUgaGlkZVlBeGlzRG9tYWluOiBib29sZWFuO1xuICBwcml2YXRlIGhpZGVYQXhpc1plcm86IGJvb2xlYW47XG4gIHByaXZhdGUgaGlkZVlBeGlzWmVybzogYm9vbGVhbjtcbiAgcHJpdmF0ZSBoaWRlWEdyaWQ6IGJvb2xlYW47XG4gIHByaXZhdGUgaGlkZVlHcmlkOiBib29sZWFuO1xuICBwcml2YXRlIGhpZGVYQXhpc1RpY2tzOiBib29sZWFuO1xuICBwcml2YXRlIGhpZGVZQXhpc1RpY2tzOiBib29sZWFuO1xuICBwcml2YXRlIGxlZ2VuZExhYmVsRm9ybWF0O1xuICBwcml2YXRlIHRvb2x0aXA7XG4gIHByaXZhdGUgaGlkZVRvb2x0aXA6IGJvb2xlYW47XG4gIHByaXZhdGUgdG9vbHRpcEhlYWRpbmdGb3JtYXQ7XG4gIHByaXZhdGUgdG9vbHRpcFZhbHVlRm9ybWF0O1xuICBwcml2YXRlIHRvb2x0aXBMYWJlbEZvcm1hdDtcbiAgcHJpdmF0ZSBtb3VzZWRhdGE7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZGF0YXZpejogUGJkc0RhdGF2aXpTZXJ2aWNlLCBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIF9zY3JvbGw6IFZpZXdwb3J0U2Nyb2xsZXIpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5tYXJnaW4gPSB7XG4gICAgICB0b3A6ICt0aGlzLm1hcmdpblRvcCxcbiAgICAgIHJpZ2h0OiArdGhpcy5tYXJnaW5SaWdodCxcbiAgICAgIGJvdHRvbTogK3RoaXMubWFyZ2luQm90dG9tLFxuICAgICAgbGVmdDogK3RoaXMubWFyZ2luTGVmdFxuICAgIH07XG5cbiAgICB0aGlzLnhBeGlzRm9ybWF0ID0gZDNfdGltZUZvcm1hdCh0aGlzLnhBeGlzRm9ybWF0U3RyaW5nKTtcblxuICAgIHRoaXMueUF4aXNGb3JtYXQgPSBkM19mb3JtYXQodGhpcy55QXhpc0Zvcm1hdFN0cmluZyk7XG5cbiAgICBzd2l0Y2ggKHRoaXMubGVnZW5kTGFiZWxGb3JtYXRUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICB0aGlzLmxlZ2VuZExhYmVsRm9ybWF0ID0gZDNfZm9ybWF0KHRoaXMubGVnZW5kTGFiZWxGb3JtYXRTdHJpbmcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgICB0aGlzLmxlZ2VuZExhYmVsRm9ybWF0ID0gZDNfdGltZUZvcm1hdCh0aGlzLmxlZ2VuZExhYmVsRm9ybWF0U3RyaW5nKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmxlZ2VuZExhYmVsRm9ybWF0ID0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgdGhpcy50b29sdGlwSGVhZGluZ0Zvcm1hdCA9IGQzX3RpbWVGb3JtYXQodGhpcy50b29sdGlwSGVhZGluZ0Zvcm1hdFN0cmluZyk7XG5cbiAgICBzd2l0Y2ggKHRoaXMudG9vbHRpcExhYmVsRm9ybWF0VHlwZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgdGhpcy50b29sdGlwTGFiZWxGb3JtYXQgPSBkM19mb3JtYXQodGhpcy50b29sdGlwTGFiZWxGb3JtYXRTdHJpbmcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgICB0aGlzLnRvb2x0aXBMYWJlbEZvcm1hdCA9IGQzX3RpbWVGb3JtYXQodGhpcy50b29sdGlwTGFiZWxGb3JtYXRTdHJpbmcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMudG9vbHRpcExhYmVsRm9ybWF0ID0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgc3dpdGNoICh0aGlzLnRvb2x0aXBWYWx1ZUZvcm1hdFR5cGUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIHRoaXMudG9vbHRpcFZhbHVlRm9ybWF0ID0gZDNfZm9ybWF0KHRoaXMudG9vbHRpcFZhbHVlRm9ybWF0U3RyaW5nKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0aW1lJzpcbiAgICAgICAgdGhpcy50b29sdGlwVmFsdWVGb3JtYXQgPSBkM190aW1lRm9ybWF0KHRoaXMudG9vbHRpcFZhbHVlRm9ybWF0U3RyaW5nKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLnRvb2x0aXBWYWx1ZUZvcm1hdCA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gZGVmYXVsdHMgZm9yIGFsbCBjaGFydCB0eXBlc1xuICAgIHRoaXMubGluZVdpZHRoID0gMztcbiAgICB0aGlzLmxpbmVDdXJ2ZWQgPSB0cnVlO1xuICAgIHRoaXMubGluZVBvaW50cyA9IHRydWU7XG4gICAgdGhpcy5oaWRlWEF4aXMgPSBmYWxzZTtcbiAgICB0aGlzLmhpZGVZQXhpcyA9IGZhbHNlO1xuICAgIHRoaXMuaGlkZVhBeGlzWmVybyA9IGZhbHNlO1xuICAgIHRoaXMuaGlkZVlBeGlzWmVybyA9IGZhbHNlO1xuICAgIHRoaXMuaGlkZVhHcmlkID0gZmFsc2U7XG4gICAgdGhpcy5oaWRlWUdyaWQgPSBmYWxzZTtcbiAgICB0aGlzLmhpZGVYQXhpc0RvbWFpbiA9IGZhbHNlO1xuICAgIHRoaXMuaGlkZVlBeGlzRG9tYWluID0gZmFsc2U7XG4gICAgdGhpcy5oaWRlVG9vbHRpcCA9IGZhbHNlO1xuICAgIHRoaXMuaGlkZVhBeGlzVGlja3MgPSBmYWxzZTtcbiAgICB0aGlzLmhpZGVZQXhpc1RpY2tzID0gZmFsc2U7XG4gICAgdGhpcy54QXhpc1RpY2tTaXplID0gODtcbiAgICB0aGlzLnhBeGlzVGlja1NpemVPdXRlciA9IDA7XG4gICAgdGhpcy55QXhpc1RpY2tTaXplID0gODtcbiAgICB0aGlzLnlBeGlzVGlja1NpemVPdXRlciA9IDA7XG5cbiAgICBpZiAodGhpcy50eXBlICE9PSAnZGVidWcnKSB7XG4gICAgICAvLyBzZXQgdHlwZSBkZWZhdWx0c1xuICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnbWVkaXVtJzpcbiAgICAgICAgICB0aGlzLmhpZGVYR3JpZCA9IHRydWU7XG4gICAgICAgICAgdGhpcy5oaWRlWEF4aXNUaWNrcyA9IHRydWU7XG4gICAgICAgICAgdGhpcy5oaWRlWUF4aXNUaWNrcyA9IHRydWU7XG4gICAgICAgICAgdGhpcy5oaWRlWUdyaWQgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2hpZ2gnOlxuICAgICAgICAgIHRoaXMubGluZVdpZHRoID0gMjtcbiAgICAgICAgICB0aGlzLmxpbmVDdXJ2ZWQgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmxpbmVQb2ludHMgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmhpZGVYQXhpc1RpY2tzID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLmhpZGVZQXhpc1RpY2tzID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBhZGp1c3QgbWFyZ2luIGlmIHhBeGlzIGhpZGRlblxuICAgIGlmICh0aGlzLmhpZGVYQXhpcykgdGhpcy5tYXJnaW4uYm90dG9tID0gMTA7IC8vIG5lZWQgc21hbGwgbWFyZ2luIGZvciB5QXhpcyB3aXRoIDAgdGljayBsYWJlbFxuXG4gICAgaWYgKCF0aGlzLmhpZGVMZWdlbmQgJiYgdGhpcy5sZWdlbmRQb3NpdGlvbiA9PT0gJ3JpZ2h0Jykge1xuICAgICAgdGhpcy53aWR0aCA9ICt0aGlzLndpZHRoIC0gK3RoaXMubGVnZW5kV2lkdGg7XG4gICAgfVxuXG4gICAgLy8gZGVmaW5lIGxpbmVcbiAgICB0aGlzLmQzbGluZSA9IGQzX2xpbmUoKVxuICAgICAgLngoKGQ6IGFueSwgaSkgPT4gdGhpcy54QXhpc1NjYWxlKGQzX2lzb1BhcnNlKHRoaXMuZGF0YS5kYXRlc1tpXSkpKVxuICAgICAgLnkoKGQ6IGFueSkgPT4gdGhpcy55QXhpc1NjYWxlKGQpKTtcblxuICAgIC8vIGRlZmluZSBsaW5lIGN1cnZlXG4gICAgaWYgKHRoaXMubGluZUN1cnZlZCkge1xuICAgICAgdGhpcy5kM2xpbmUuY3VydmUoZDNfY3VydmVDYXRtdWxsUm9tLmFscGhhKDAuNSkpO1xuICAgIH1cblxuICAgIC8vIGRlZmluZSBhcmVhXG4gICAgaWYgKHRoaXMuYXJlYSkge1xuICAgICAgdGhpcy5kM2FyZWEgPSBkM19hcmVhKClcbiAgICAgICAgLngoKGQ6IGFueSwgaSkgPT4gdGhpcy54QXhpc1NjYWxlKGQzX2lzb1BhcnNlKHRoaXMuZGF0YS5kYXRlc1tpXSkpKVxuICAgICAgICAueTAodGhpcy5oZWlnaHQpXG4gICAgICAgIC55MSgoZDogYW55LCBpKSA9PiB0aGlzLnlBeGlzU2NhbGUoZCkpO1xuXG4gICAgICBpZiAodGhpcy5saW5lQ3VydmVkKSB7XG4gICAgICAgIHRoaXMuZDNhcmVhLmN1cnZlKGQzX2N1cnZlQ2F0bXVsbFJvbS5hbHBoYSgwLjUpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgdGhlIGNoYXJ0XG4gICAgdGhpcy5jaGFydCA9IGQzX3NlbGVjdCh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuICAgIC8vIGNyZWF0ZSBjaGFydCBzdmdcbiAgICB0aGlzLnN2ZyA9IHRoaXMuY2hhcnRcbiAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAuYXR0cignd2lkdGgnLCArdGhpcy53aWR0aCArIHRoaXMubWFyZ2luLnJpZ2h0KVxuICAgICAgLmF0dHIoJ2hlaWdodCcsICt0aGlzLmhlaWdodCArIHRoaXMubWFyZ2luLnRvcCArIHRoaXMubWFyZ2luLmJvdHRvbSlcbiAgICAgIC5hdHRyKCdjbGFzcycsICdpbWctZmx1aWQnKVxuICAgICAgLmF0dHIoJ3ByZXNlcnZlQXNwZWN0UmF0aW8nLCAneE1pbllNaW4gbWVldCcpXG4gICAgICAuYXR0cihcbiAgICAgICAgJ3ZpZXdCb3gnLFxuICAgICAgICBgLSR7dGhpcy5tYXJnaW4ubGVmdH0gLSR7dGhpcy5tYXJnaW4udG9wfSAkeyt0aGlzLndpZHRoICsgdGhpcy5tYXJnaW4ucmlnaHR9ICR7K3RoaXMuaGVpZ2h0ICtcbiAgICAgICAgICB0aGlzLm1hcmdpbi50b3AgK1xuICAgICAgICAgIHRoaXMubWFyZ2luLmJvdHRvbX1gXG4gICAgICApO1xuXG4gICAgLy8gYWRkIHJlY3RhbmdsZSB0byBjYXB0dXJlIG1vdXNlXG4gICAgdGhpcy5tb3VzZXJlY3QgPSB0aGlzLnN2Z1xuICAgICAgLmFwcGVuZCgncmVjdCcpXG4gICAgICAuYXR0cignd2lkdGgnLCB0aGlzLndpZHRoIC0gdGhpcy5tYXJnaW4ubGVmdCAtIHRoaXMubWFyZ2luLnJpZ2h0KVxuICAgICAgLmF0dHIoJ2hlaWdodCcsIHRoaXMuaGVpZ2h0KVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ21vdXNlcmVjdCcpXG4gICAgICAub24oJ21vdXNlbW92ZScsIChkYXRhLCBpbmRleCwgbm9kZXMpID0+IHRoaXMubW91c2VyZWN0TW91c2VNb3ZlKGQzX2V2ZW50LCBpbmRleCwgbm9kZXMpKVxuICAgICAgLm9uKCdtb3VzZW91dCcsIChkYXRhLCBpbmRleCwgbm9kZXMpID0+IHRoaXMubW91c2VyZWN0TW91c2VPdXQoZDNfZXZlbnQsIGluZGV4LCBub2RlcykpXG4gICAgICAub24oJ2NsaWNrJywgKGRhdGEsIGluZGV4LCBub2RlcykgPT4gdGhpcy5tb3VzZXJlY3RNb3VzZUNsaWNrKCkpO1xuXG4gICAgdGhpcy50b29sdGlwTGluZSA9IHRoaXMuc3ZnXG4gICAgICAuYXBwZW5kKCdsaW5lJylcbiAgICAgIC5hdHRyKCd5MScsIDApXG4gICAgICAuYXR0cigneTInLCB0aGlzLmhlaWdodClcbiAgICAgIC5hdHRyKCdjbGFzcycsICd0b29sdGlwLWxpbmUnKTtcblxuICAgIC8vIGRlZmluZSBjb2xvciByYW5nZVxuICAgIHRoaXMuY29sb3JSYW5nZSA9IGQzX3NjYWxlT3JkaW5hbCgpLnJhbmdlKHRoaXMuX2RhdGF2aXouZ2V0Q29sb3JzKGZhbHNlKSk7XG5cbiAgICAvLyBhZGQgZ2xvdyBkZWZcbiAgICB0aGlzLl9kYXRhdml6LmNyZWF0ZUdsb3dGaWx0ZXIodGhpcy5zdmcpO1xuXG4gICAgLy8gWCBBWElTXG4gICAgdGhpcy54QXhpc1NjYWxlID0gZDNfc2NhbGVUaW1lKClcbiAgICAgIC5kb21haW4oXG4gICAgICAgIGQzX2V4dGVudCh0aGlzLmRhdGEuZGF0ZXMsIChkOiBhbnksIGkpID0+IHtcbiAgICAgICAgICByZXR1cm4gZDNfaXNvUGFyc2UoZCk7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAucmFuZ2UoWzAsIHRoaXMud2lkdGggLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXJnaW4ucmlnaHRdKTtcblxuICAgIHRoaXMueEF4aXNDYWxsID0gZDNfYXhpc0JvdHRvbSh0aGlzLnhBeGlzU2NhbGUpXG4gICAgICAudGlja3MoK3RoaXMueEF4aXNUaWNrcylcbiAgICAgIC50aWNrU2l6ZSh0aGlzLnhBeGlzVGlja1NpemUpXG4gICAgICAudGlja1NpemVPdXRlcih0aGlzLnhBeGlzVGlja1NpemVPdXRlcilcbiAgICAgIC50aWNrRm9ybWF0KHRoaXMueEF4aXNGb3JtYXR0ZXIpO1xuXG4gICAgdGhpcy54QXhpcyA9IHRoaXMuc3ZnXG4gICAgICAuYXBwZW5kKCdnJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdheGlzIGF4aXMteCcpXG4gICAgICAuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgwLCAke3RoaXMuaGVpZ2h0fSlgKSAvLyR7LXRoaXMubWFyZ2luLnJpZ2h0IC8gMn1cbiAgICAgIC5jbGFzc2VkKCdheGlzLWhpZGRlbicsIHRoaXMuaGlkZVhBeGlzKVxuICAgICAgLmNsYXNzZWQoJ2F4aXMtemVyby1oaWRkZW4nLCB0aGlzLmhpZGVYQXhpc1plcm8pXG4gICAgICAuY2xhc3NlZCgnYXhpcy1kb21haW4taGlkZGVuJywgdGhpcy5oaWRlWEF4aXNEb21haW4pXG4gICAgICAuY2xhc3NlZCgnYXhpcy10aWNrcy1oaWRkZW4nLCB0aGlzLmhpZGVYQXhpc1RpY2tzKVxuICAgICAgLmNhbGwodGhpcy54QXhpc0NhbGwpO1xuXG4gICAgLy8gWCBHUklETElORVNcbiAgICBpZiAoIXRoaXMuaGlkZVhHcmlkKSB7XG4gICAgICB0aGlzLnhHcmlkQ2FsbCA9IGQzX2F4aXNCb3R0b20odGhpcy54QXhpc1NjYWxlKS50aWNrU2l6ZSgtdGhpcy5oZWlnaHQpO1xuXG4gICAgICB0aGlzLnhHcmlkID0gdGhpcy5zdmdcbiAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdncmlkIGdyaWQteCcpXG4gICAgICAgIC5jbGFzc2VkKCdncmlkLXplcm8taGlkZGVuJywgdGhpcy5oaWRlWEF4aXNaZXJvKVxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgwLCAke3RoaXMuaGVpZ2h0fSlgKSAvLyR7LXRoaXMubWFyZ2luLnJpZ2h0IC8gMn1cbiAgICAgICAgLmNhbGwodGhpcy54R3JpZENhbGwpO1xuICAgIH1cblxuICAgIC8vIFkgQVhJU1xuICAgIHRoaXMueUF4aXNTY2FsZSA9IGQzX3NjYWxlTGluZWFyKClcbiAgICAgIC5kb21haW4oW1xuICAgICAgICBkM19taW4odGhpcy5kYXRhLnNlcmllcywgKGQ6IGFueSwgaSkgPT4ge1xuICAgICAgICAgIHJldHVybiArZDNfbWluKGQudmFsdWVzKTtcbiAgICAgICAgfSksXG4gICAgICAgIGQzX21heCh0aGlzLmRhdGEuc2VyaWVzLCAoZDogYW55LCBpKSA9PiB7XG4gICAgICAgICAgcmV0dXJuICtkM19tYXgoZC52YWx1ZXMpO1xuICAgICAgICB9KVxuICAgICAgXSlcbiAgICAgIC5uaWNlKClcbiAgICAgIC5yYW5nZShbdGhpcy5oZWlnaHQsIDBdKTtcblxuICAgIHRoaXMueUF4aXNDYWxsID0gZDNfYXhpc0xlZnQodGhpcy55QXhpc1NjYWxlKVxuICAgICAgLnRpY2tzKHRoaXMueUF4aXNUaWNrcylcbiAgICAgIC50aWNrU2l6ZSh0aGlzLnlBeGlzVGlja1NpemUpXG4gICAgICAudGlja1NpemVPdXRlcih0aGlzLnlBeGlzVGlja1NpemVPdXRlcilcbiAgICAgIC50aWNrRm9ybWF0KHRoaXMueUF4aXNGb3JtYXR0ZXIpO1xuXG4gICAgdGhpcy55QXhpcyA9IHRoaXMuc3ZnXG4gICAgICAuYXBwZW5kKCdnJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdheGlzIGF4aXMteScpXG4gICAgICAuY2xhc3NlZCgnYXhpcy1oaWRkZW4nLCB0aGlzLmhpZGVZQXhpcylcbiAgICAgIC5jbGFzc2VkKCdheGlzLXplcm8taGlkZGVuJywgdGhpcy5oaWRlWUF4aXNaZXJvKVxuICAgICAgLmNsYXNzZWQoJ2F4aXMtZG9tYWluLWhpZGRlbicsIHRoaXMuaGlkZVlBeGlzRG9tYWluKVxuICAgICAgLmNsYXNzZWQoJ2F4aXMtdGlja3MtaGlkZGVuJywgdGhpcy5oaWRlWUF4aXNUaWNrcylcbiAgICAgIC5jYWxsKHRoaXMueUF4aXNDYWxsKTtcblxuICAgIC8vIFkgR1JJRExJTkVTXG4gICAgaWYgKCF0aGlzLmhpZGVZR3JpZCkge1xuICAgICAgdGhpcy55R3JpZENhbGwgPSBkM19heGlzTGVmdCh0aGlzLnlBeGlzU2NhbGUpXG4gICAgICAgIC50aWNrcyh0aGlzLnlBeGlzVGlja3MpXG4gICAgICAgIC50aWNrU2l6ZSgtdGhpcy53aWR0aCArIHRoaXMubWFyZ2luLmxlZnQgKyB0aGlzLm1hcmdpbi5yaWdodCk7XG5cbiAgICAgIHRoaXMueUdyaWQgPSB0aGlzLnN2Z1xuICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyaWQgZ3JpZC15JylcbiAgICAgICAgLmNsYXNzZWQoJ2dyaWQtemVyby1oaWRkZW4nLCB0aGlzLmhpZGVZQXhpc1plcm8pXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKDAsIDApYClcbiAgICAgICAgLmNhbGwodGhpcy55R3JpZENhbGwpO1xuICAgIH1cblxuICAgIC8vIFRPT0xUSVBcbiAgICBpZiAoIXRoaXMuaGlkZVRvb2x0aXApIHtcbiAgICAgIHRoaXMudG9vbHRpcCA9IGQzX3NlbGVjdCgnYm9keScpXG4gICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdwYmRzLXRvb2x0aXAgd2VzdCcpXG4gICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDApXG4gICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7IC8vIGhpZGUgdG9vbHRpcCBmb3IgYWNjZXNzaWJpbGl0eVxuXG4gICAgICAvLyB0b29sdGlwIGhlYWRlclxuICAgICAgdGhpcy50b29sdGlwLmFwcGVuZCgnZGl2JykuYXR0cignY2xhc3MnLCAndG9vbHRpcC1oZWFkZXInKTtcblxuICAgICAgLy8gdG9vbHRpcCB0YWJsZVxuICAgICAgY29uc3QgdG9vbHRpcFRhYmxlID0gdGhpcy50b29sdGlwLmFwcGVuZCgndGFibGUnKS5hdHRyKCdjbGFzcycsICd0b29sdGlwLXRhYmxlIHRleHQtbGVmdCB3LTEwMCcpO1xuXG4gICAgICBjb25zdCB0b29sdGlwVGFibGVUYm9keSA9IHRvb2x0aXBUYWJsZS5hcHBlbmQoJ3Rib2R5Jyk7XG5cbiAgICAgIHRvb2x0aXBUYWJsZVRib2R5XG4gICAgICAgIC5zZWxlY3RBbGwoJ3RyJylcbiAgICAgICAgLmRhdGEodGhpcy5kYXRhKVxuICAgICAgICAuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCd0cicpO1xuICAgIH1cblxuICAgIC8vIGFkZCBsZWdlbmQgY2xhc3Nlc1xuICAgIGlmICghdGhpcy5oaWRlTGVnZW5kKSB7XG4gICAgICB0aGlzLmNoYXJ0LmNsYXNzZWQoJ3BiZHMtY2hhcnQtbGVnZW5kLWJvdHRvbScsIHRoaXMubGVnZW5kUG9zaXRpb24gPT09ICdib3R0b20nID8gdHJ1ZSA6IGZhbHNlKTtcbiAgICAgIHRoaXMuY2hhcnQuYXBwZW5kKCd1bCcpLmF0dHIoJ2NsYXNzJywgYGxlZ2VuZCBsZWdlbmQtJHt0aGlzLmxlZ2VuZFBvc2l0aW9ufWApO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlQ2hhcnQoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5kYXRhICYmICFjaGFuZ2VzLmRhdGEuZmlyc3RDaGFuZ2UpIHtcbiAgICAgIHRoaXMudXBkYXRlQ2hhcnQoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy50b29sdGlwKSB0aGlzLnRvb2x0aXAucmVtb3ZlKCk7XG4gIH1cblxuICB1cGRhdGVDaGFydCA9ICgpID0+IHtcbiAgICB0aGlzLm1vdXNlcmVjdC5kYXRhKHRoaXMuZGF0YSk7XG5cbiAgICAvLyB1cGRhdGUgdGhlIHhTY2FsZVxuICAgIHRoaXMueEF4aXNTY2FsZS5kb21haW4oXG4gICAgICBkM19leHRlbnQodGhpcy5kYXRhLmRhdGVzLCAoZDogYW55LCBpKSA9PiB7XG4gICAgICAgIHJldHVybiBkM19pc29QYXJzZShkKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIC8vIHVwZGF0ZSB0aGUgeVNjYWxlXG4gICAgdGhpcy55QXhpc1NjYWxlXG4gICAgICAuZG9tYWluKFtcbiAgICAgICAgZDNfbWluKHRoaXMuZGF0YS5zZXJpZXMsIChkOiBhbnksIGkpID0+IHtcbiAgICAgICAgICByZXR1cm4gK2QzX21pbihkLnZhbHVlcyk7XG4gICAgICAgIH0pLFxuICAgICAgICBkM19tYXgodGhpcy5kYXRhLnNlcmllcywgKGQ6IGFueSwgaSkgPT4ge1xuICAgICAgICAgIHJldHVybiArZDNfbWF4KGQudmFsdWVzKTtcbiAgICAgICAgfSlcbiAgICAgIF0pXG4gICAgICAubmljZSgpO1xuXG4gICAgdGhpcy54QXhpc1xuICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgLmR1cmF0aW9uKDEwMDApXG4gICAgICAuY2FsbCh0aGlzLnhBeGlzQ2FsbCk7XG5cbiAgICB0aGlzLnlBeGlzXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgIC5jYWxsKHRoaXMueUF4aXNDYWxsKTtcblxuICAgIC8vIHVwZGF0ZSB0aGUgZ3JpZHNcbiAgICBpZiAoIXRoaXMuaGlkZVhHcmlkKSB7XG4gICAgICB0aGlzLnhHcmlkXG4gICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgLmR1cmF0aW9uKDEwMDApXG4gICAgICAgIC5jYWxsKHRoaXMueEdyaWRDYWxsKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaGlkZVlHcmlkKSB7XG4gICAgICB0aGlzLnlHcmlkXG4gICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgLmR1cmF0aW9uKDEwMDApXG4gICAgICAgIC5jYWxsKHRoaXMueUdyaWRDYWxsKTtcbiAgICB9XG5cbiAgICBsZXQgZ3JvdXAgPSB0aGlzLnN2Zy5zZWxlY3RBbGwoJy5saW5lLWdyb3VwJykuZGF0YSh0aGlzLmRhdGEuc2VyaWVzKTtcblxuICAgIC8vIHJlbW92ZSBsaW5lc1xuICAgIGdyb3VwLmV4aXQoKS5yZW1vdmUoKTtcblxuICAgIC8vIHVwZGF0ZSBleGlzdGluZ1xuICAgIGdyb3VwXG4gICAgICAuc2VsZWN0KCdwYXRoLmxpbmUnKVxuICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgLmR1cmF0aW9uKDEwMDApXG4gICAgICAuYXR0cignZCcsIGQgPT4gdGhpcy5kM2xpbmUoZC52YWx1ZXMpKTtcblxuICAgIGlmICh0aGlzLmFyZWEpIHtcbiAgICAgIGdyb3VwXG4gICAgICAgIC5zZWxlY3QoJ3BhdGguYXJlYScpXG4gICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgLmR1cmF0aW9uKDEwMDApXG4gICAgICAgIC5hdHRyKCdkJywgZCA9PiB0aGlzLmQzYXJlYShkLnZhbHVlcykpO1xuICAgIH1cblxuICAgIGdyb3VwXG4gICAgICAuc2VsZWN0QWxsKCdjaXJjbGUnKVxuICAgICAgLmRhdGEoZCA9PiBkLnZhbHVlcylcbiAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgIC5kdXJhdGlvbigxMDAwKVxuICAgICAgLmF0dHIoJ2N4JywgKGQsIGkpID0+IHRoaXMueEF4aXNTY2FsZShkM19pc29QYXJzZSh0aGlzLmRhdGEuZGF0ZXNbaV0pKSlcbiAgICAgIC5hdHRyKCdjeScsIGQgPT4gdGhpcy55QXhpc1NjYWxlKGQpKTtcblxuICAgIC8vIGFkZCBncm91cCBvbiBlbnRlclxuICAgIGNvbnN0IGdyb3VwRW50ZXIgPSBncm91cFxuICAgICAgLmVudGVyKClcbiAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmUtZ3JvdXAnKTtcblxuICAgIC8vIGFkZCBsaW5lIG9uIGVudGVyXG4gICAgY29uc3QgbGluZSA9IGdyb3VwRW50ZXJcbiAgICAgIC5hcHBlbmQoJ3BhdGgnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpbmUnKVxuICAgICAgLnN0eWxlKCdjb2xvcicsIGQgPT4gdGhpcy5jb2xvclJhbmdlKGQubGFiZWwpKVxuICAgICAgLnN0eWxlKCdzdHJva2Utd2lkdGgnLCB0aGlzLmxpbmVXaWR0aClcbiAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgIC5kdXJhdGlvbigxMDAwKVxuICAgICAgLmF0dHIoJ2QnLCBkYXRhID0+IHRoaXMuZDNsaW5lKGRhdGEudmFsdWVzKSk7XG5cbiAgICBpZiAodGhpcy5hcmVhKSB7XG4gICAgICBncm91cEVudGVyXG4gICAgICAgIC5hcHBlbmQoJ3BhdGgnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnYXJlYScpXG4gICAgICAgIC5hdHRyKCdkJywgZGF0YSA9PiB0aGlzLmQzYXJlYShkYXRhLnZhbHVlcykpXG4gICAgICAgIC5zdHlsZSgnY29sb3InLCBkID0+IHRoaXMuY29sb3JSYW5nZShkLmxhYmVsKSk7XG4gICAgfVxuXG4gICAgLy8gYWRkIHBvaW50c1xuICAgIGlmICh0aGlzLmxpbmVQb2ludHMpIHtcbiAgICAgIGNvbnN0IHBvaW50cyA9IGdyb3VwRW50ZXJcbiAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdwb2ludHMnKVxuICAgICAgICAuc3R5bGUoJ2NvbG9yJywgZCA9PiB0aGlzLmNvbG9yUmFuZ2UoZC5sYWJlbCkpO1xuXG4gICAgICBjb25zdCBjaXJjbGVzID0gcG9pbnRzLnNlbGVjdEFsbCgnY2lyY2xlJykuZGF0YShkID0+IGQudmFsdWVzKTtcblxuICAgICAgY2lyY2xlc1xuICAgICAgICAuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCdjaXJjbGUnKVxuICAgICAgICAuYXR0cignY3gnLCAoZCwgaSkgPT4gdGhpcy54QXhpc1NjYWxlKGQzX2lzb1BhcnNlKHRoaXMuZGF0YS5kYXRlc1tpXSkpKVxuICAgICAgICAuYXR0cignY3knLCBkID0+IHRoaXMueUF4aXNTY2FsZShkKSlcbiAgICAgICAgLmF0dHIoJ3InLCB0aGlzLmxpbmVXaWR0aCAqIDIpXG4gICAgICAgIC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgdGhpcy5saW5lV2lkdGgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnR5cGUgIT09ICdoaWdoJykge1xuICAgICAgbGluZS5hdHRyKCdmaWx0ZXInLCAndXJsKCNnbG93KScpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5oaWRlTGVnZW5kKSB7XG4gICAgICBsZXQgbGVnZW5kSXRlbSA9IHRoaXMuY2hhcnRcbiAgICAgICAgLnNlbGVjdCgnLmxlZ2VuZCcpXG4gICAgICAgIC5zZWxlY3RBbGwoJy5sZWdlbmQtaXRlbScpXG4gICAgICAgIC5kYXRhKHRoaXMuZGF0YS5zZXJpZXMpO1xuXG4gICAgICBsZWdlbmRJdGVtLmV4aXQoKS5yZW1vdmUoKTtcblxuICAgICAgLy8gdXBkYXRlIGV4aXN0aW5nIGl0ZW1zXG4gICAgICBsZWdlbmRJdGVtLnNlbGVjdCgnLmxlZ2VuZC1sYWJlbCcpLmh0bWwoZCA9PiB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5sZWdlbmRMYWJlbEZvcm1hdFR5cGUpIHtcbiAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGVnZW5kTGFiZWxGb3JtYXQoZC5sYWJlbCk7XG5cbiAgICAgICAgICBjYXNlICd0aW1lJzpcbiAgICAgICAgICAgIGNvbnN0IHBhcnNlZFRpbWUgPSBkM19pc29QYXJzZShkLmxhYmVsKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxlZ2VuZExhYmVsRm9ybWF0KHBhcnNlZFRpbWUpO1xuXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBkLmxhYmVsO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gbGVnZW5kIGl0ZW1zIG9uIGVudGVyXG4gICAgICBsZXQgZW50ZXJMZWdlbmRJdGVtID0gbGVnZW5kSXRlbVxuICAgICAgICAuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCdsaScpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQtaXRlbScpO1xuXG4gICAgICBlbnRlckxlZ2VuZEl0ZW1cbiAgICAgICAgLmFwcGVuZCgnc3BhbicpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQta2V5JylcbiAgICAgICAgLnN0eWxlKCdiYWNrZ3JvdW5kLWNvbG9yJywgZCA9PiB0aGlzLmNvbG9yUmFuZ2UoZC5sYWJlbCkpO1xuXG4gICAgICBlbnRlckxlZ2VuZEl0ZW1cbiAgICAgICAgLmFwcGVuZCgnc3BhbicpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQtbGFiZWwnKVxuICAgICAgICAuaHRtbChkID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKHRoaXMubGVnZW5kTGFiZWxGb3JtYXRUeXBlKSB7XG4gICAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sZWdlbmRMYWJlbEZvcm1hdChkLmxhYmVsKTtcblxuICAgICAgICAgICAgY2FzZSAndGltZSc6XG4gICAgICAgICAgICAgIGNvbnN0IHBhcnNlZFRpbWUgPSBkM19pc29QYXJzZShkLmxhYmVsKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubGVnZW5kTGFiZWxGb3JtYXQocGFyc2VkVGltZSk7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiBkLmxhYmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgIGVudGVyTGVnZW5kSXRlbVxuICAgICAgICAub24oJ21vdXNlb3ZlcicsIChkYXRhLCBpbmRleCwgbm9kZXMpID0+IHRoaXMubGVnZW5kTW91c2VPdmVyKGQzX2V2ZW50LCBkYXRhLCBpbmRleCwgbm9kZXMpKVxuICAgICAgICAub24oJ21vdXNlb3V0JywgKCkgPT4gdGhpcy5sZWdlbmRNb3VzZU91dCgpKVxuICAgICAgICAub24oJ2NsaWNrJywgKGRhdGEsIGluZGV4LCBub2RlcykgPT4gdGhpcy5sZWdlbmRNb3VzZUNsaWNrKGQzX2V2ZW50LCBkYXRhLCBpbmRleCwgbm9kZXMpKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaGlkZVRvb2x0aXApIHtcbiAgICAgIGxldCB0b29sdGlwSXRlbSA9IHRoaXMudG9vbHRpcFxuICAgICAgICAuc2VsZWN0KCcudG9vbHRpcC10YWJsZScpXG4gICAgICAgIC5zZWxlY3RBbGwoJ3RyJylcbiAgICAgICAgLmRhdGEodGhpcy5kYXRhLnNlcmllcyk7XG5cbiAgICAgIHRvb2x0aXBJdGVtLmV4aXQoKS5yZW1vdmUoKTtcblxuICAgICAgLy8gdXBkYXRlIGV4aXN0aW5nIGl0ZW1zXG4gICAgICB0b29sdGlwSXRlbS5zZWxlY3QoJy50b29sdGlwLWxhYmVsIHByLTInKS5odG1sKGQgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy50b29sdGlwSGVhZGluZ0Zvcm1hdChkLmxhYmVsKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBpdGVtcyBvbiBlbnRlclxuICAgICAgbGV0IGVudGVydG9vbHRpcEl0ZW0gPSB0b29sdGlwSXRlbVxuICAgICAgICAuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCd0cicpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICd0b29sdGlwLWl0ZW0nKTtcblxuICAgICAgZW50ZXJ0b29sdGlwSXRlbVxuICAgICAgICAuYXBwZW5kKCd0ZCcpXG4gICAgICAgIC5zdHlsZSgnY29sb3InLCBkID0+IHRoaXMuY29sb3JSYW5nZShkLmxhYmVsKSlcbiAgICAgICAgLmFwcGVuZCgnc3BhbicpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdwYmRzLXRvb2x0aXAta2V5Jyk7XG5cbiAgICAgIGVudGVydG9vbHRpcEl0ZW1cbiAgICAgICAgLmFwcGVuZCgndGQnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAndG9vbHRpcC1sYWJlbCBwci0yJylcbiAgICAgICAgLmh0bWwoZCA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudG9vbHRpcExhYmVsRm9ybWF0VHlwZSA/IHRoaXMudG9vbHRpcExhYmVsRm9ybWF0KGQubGFiZWwpIDogZC5sYWJlbDtcbiAgICAgICAgfSk7XG5cbiAgICAgIGVudGVydG9vbHRpcEl0ZW1cbiAgICAgICAgLmFwcGVuZCgndGQnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAndG9vbHRpcC12YWx1ZSB0ZXh0LXJpZ2h0JylcbiAgICAgICAgLmh0bWwoZCA9PiAnJyk7XG4gICAgfVxuXG4gICAgdGhpcy5tb3VzZXJlY3QucmFpc2UoKTtcbiAgfTtcblxuICBsZWdlbmRNb3VzZU92ZXIgPSAoZXZlbnQsIGRhdGEsIGluZGV4LCBub2RlcykgPT4ge1xuICAgIHRoaXMuY2hhcnRcbiAgICAgIC5zZWxlY3RBbGwoJy5sZWdlbmQtaXRlbScpXG4gICAgICAuZmlsdGVyKChkLCBpKSA9PiBpICE9PSBpbmRleClcbiAgICAgIC5jbGFzc2VkKCdpbmFjdGl2ZScsIHRydWUpO1xuXG4gICAgdGhpcy5jaGFydFxuICAgICAgLnNlbGVjdEFsbCgnLmxpbmUtZ3JvdXAnKVxuICAgICAgLmZpbHRlcigoZCwgaSkgPT4gaSAhPT0gaW5kZXgpXG4gICAgICAuY2xhc3NlZCgnaW5hY3RpdmUnLCB0cnVlKTtcblxuICAgIGNvbnN0IGxpbmUgPSB0aGlzLmNoYXJ0LnNlbGVjdEFsbCgnLmxpbmUtZ3JvdXAnKS5maWx0ZXIoKGQsIGkpID0+IGkgPT09IGluZGV4KTtcbiAgICBsaW5lLmNsYXNzZWQoJ2FjdGl2ZScsIHRydWUpO1xuXG4gICAgaWYgKHRoaXMubGluZVBvaW50cykge1xuICAgICAgY29uc3QgY2lyY2xlcyA9IGxpbmUuc2VsZWN0QWxsKCdjaXJjbGUnKTtcbiAgICAgIGNpcmNsZXMuY2xhc3NlZCgnYWN0aXZlJywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5ob3ZlcmVkLmVtaXQoeyBldmVudCwgZGF0YSB9KTtcbiAgfTtcblxuICBsZWdlbmRNb3VzZU91dCA9ICgpID0+IHtcbiAgICB0aGlzLmNoYXJ0LnNlbGVjdEFsbCgnLmxlZ2VuZC1pdGVtJykuY2xhc3NlZCgnaW5hY3RpdmUnLCBmYWxzZSk7XG5cbiAgICB0aGlzLmNoYXJ0XG4gICAgICAuc2VsZWN0QWxsKCcubGluZS1ncm91cCcpXG4gICAgICAuY2xhc3NlZCgnaW5hY3RpdmUnLCBmYWxzZSlcbiAgICAgIC5jbGFzc2VkKCdhY3RpdmUnLCBmYWxzZSk7XG5cbiAgICBpZiAodGhpcy5saW5lUG9pbnRzKSB7XG4gICAgICBjb25zdCBjaXJjbGVzID0gdGhpcy5jaGFydC5zZWxlY3RBbGwoJ2NpcmNsZScpO1xuICAgICAgY2lyY2xlcy5jbGFzc2VkKCdhY3RpdmUnLCBmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIGxlZ2VuZE1vdXNlQ2xpY2sgPSAoZXZlbnQsIGRhdGEsIGluZGV4LCBub2RlcykgPT4ge1xuICAgIHRoaXMuY2xpY2tlZC5lbWl0KHsgZXZlbnQsIGRhdGEgfSk7XG4gIH07XG5cbiAgbW91c2VyZWN0TW91c2VNb3ZlID0gKGV2ZW50LCBpbmRleCwgbm9kZXMpID0+IHtcbiAgICBjb25zdCBtb3VzZVhEYXRlID0gdGhpcy54QXhpc1NjYWxlLmludmVydChkM19tb3VzZShub2Rlc1swXSlbMF0pOyAvLyByZXR1cm4gZGF0ZSBhdCBtb3VzZSB4IHBvc2l0aW9uXG4gICAgY29uc3QgbGVmdEluZGV4ID0gZDNfYmlzZWN0TGVmdCh0aGlzLmRhdGEuZGF0ZXMsIGQzX2lzb0Zvcm1hdChtb3VzZVhEYXRlKSk7IC8vIGluZGV4IG9mIGxlZnQgY2xvc2VzdCBkYXRlXG5cbiAgICAvLyBwcmV2ZW50IGVycm9yIGZvciAwIGluZGV4XG4gICAgaWYgKGxlZnRJbmRleCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgY29uc3QgZGF0ZUxvd2VyID0gbmV3IERhdGUodGhpcy5kYXRhLmRhdGVzW2xlZnRJbmRleCAtIDFdKTtcbiAgICBjb25zdCBkYXRlVXBwZXIgPSBuZXcgRGF0ZSh0aGlzLmRhdGEuZGF0ZXNbbGVmdEluZGV4XSk7XG4gICAgY29uc3QgY2xvc2VzdERhdGUgPSArbW91c2VYRGF0ZSAtICtkYXRlTG93ZXIgPiArZGF0ZVVwcGVyIC0gbW91c2VYRGF0ZSA/IGRhdGVVcHBlciA6IGRhdGVMb3dlcjsgLy8gZGF0ZSBtb3VzZSBpcyBjbG9zZXN0IHRvXG4gICAgY29uc3QgY2xvc2VzdEluZGV4ID0gdGhpcy5kYXRhLmRhdGVzLmluZGV4T2YoZDNfaXNvRm9ybWF0KGNsb3Nlc3REYXRlKSk7IC8vIHdoaWNoIGluZGV4IHRoZSBtb3VzZSBpcyBjbG9zZXN0IHRvXG4gICAgLy8gY29uc29sZS5sb2coK21vdXNlWERhdGUsIGxlZnRJbmRleCwgK2RhdGVMb3dlciwgK2RhdGVVcHBlciwgK2Nsb3Nlc3REYXRlLCBjbG9zZXN0SW5kZXgpO1xuXG4gICAgY29uc3QgY2lyY2xlcyA9IHRoaXMuc3ZnLnNlbGVjdEFsbCgnLmxpbmUtZ3JvdXAnKS5zZWxlY3RBbGwoJ2NpcmNsZScpO1xuICAgIGNpcmNsZXMuZmlsdGVyKChkLCBpKSA9PiBpID09PSBjbG9zZXN0SW5kZXgpLmNsYXNzZWQoJ2FjdGl2ZScsIHRydWUpO1xuICAgIGNpcmNsZXMuZmlsdGVyKChkLCBpKSA9PiBpICE9PSBjbG9zZXN0SW5kZXgpLmNsYXNzZWQoJ2FjdGl2ZScsIGZhbHNlKTtcblxuICAgIHRoaXMudG9vbHRpcExpbmVcbiAgICAgIC5hdHRyKCd4MScsIHRoaXMueEF4aXNTY2FsZShjbG9zZXN0RGF0ZSkpXG4gICAgICAuYXR0cigneDInLCB0aGlzLnhBeGlzU2NhbGUoY2xvc2VzdERhdGUpKVxuICAgICAgLmNsYXNzZWQoJ2FjdGl2ZScsIHRydWUpO1xuXG4gICAgLy8gY29uc29sZS5sb2codGhpcy50b29sdGlwTGluZS5ub2RlKCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIHRoaXMuX3Njcm9sbC5nZXRTY3JvbGxQb3NpdGlvbigpKTtcbiAgICB0aGlzLnRvb2x0aXBTaG93KHRoaXMudG9vbHRpcExpbmUubm9kZSgpLCBjbG9zZXN0SW5kZXgpO1xuXG4gICAgdGhpcy5tb3VzZWRhdGEgPSB7XG4gICAgICBkYXRlOiBjbG9zZXN0RGF0ZSxcbiAgICAgIHNlcmllczogdGhpcy5kYXRhLnNlcmllcy5tYXAoZCA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbGFiZWw6IGQubGFiZWwsXG4gICAgICAgICAgdmFsdWU6IGQudmFsdWVzW2Nsb3Nlc3RJbmRleF1cbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgfTtcblxuICAgIHRoaXMudG9vbHRpcEhvdmVyZWQuZW1pdCh7IGV2ZW50LCBkYXRhOiB0aGlzLm1vdXNlZGF0YSB9KTtcbiAgfTtcblxuICBtb3VzZXJlY3RNb3VzZU91dCA9IChldmVudCwgaW5kZXgsIG5vZGVzKSA9PiB7XG4gICAgdGhpcy5zdmcuc2VsZWN0QWxsKCdjaXJjbGUnKS5jbGFzc2VkKCdhY3RpdmUnLCBmYWxzZSk7XG4gICAgdGhpcy50b29sdGlwTGluZS5jbGFzc2VkKCdhY3RpdmUnLCBmYWxzZSk7XG4gICAgdGhpcy50b29sdGlwSGlkZSgpO1xuICB9O1xuXG4gIG1vdXNlcmVjdE1vdXNlQ2xpY2sgPSAoKSA9PiB7XG4gICAgdGhpcy50b29sdGlwQ2xpY2tlZC5lbWl0KHsgZXZlbnQsIGRhdGE6IHRoaXMubW91c2VkYXRhIH0pO1xuICB9O1xuXG4gIHByaXZhdGUgdG9vbHRpcFNob3cgPSAobm9kZSwgY2xvc2VzdEluZGV4KSA9PiB7XG4gICAgbGV0IHNjcm9sbCA9IHRoaXMuX3Njcm9sbC5nZXRTY3JvbGxQb3NpdGlvbigpO1xuICAgIGxldCBkaW1lbnNpb25zID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIHRoaXMudG9vbHRpcC5zZWxlY3QoJy50b29sdGlwLWhlYWRlcicpLmh0bWwoZCA9PiB7XG4gICAgICBjb25zdCBwYXJzZWRUaW1lID0gZDNfaXNvUGFyc2UodGhpcy5kYXRhLmRhdGVzW2Nsb3Nlc3RJbmRleF0pO1xuICAgICAgcmV0dXJuIHRoaXMudG9vbHRpcEhlYWRpbmdGb3JtYXQocGFyc2VkVGltZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnRvb2x0aXAuc2VsZWN0QWxsKCcudG9vbHRpcC12YWx1ZScpLmh0bWwoKGQsIGkpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnRvb2x0aXBWYWx1ZUZvcm1hdFR5cGVcbiAgICAgICAgPyB0aGlzLnRvb2x0aXBWYWx1ZUZvcm1hdCh0aGlzLmRhdGEuc2VyaWVzW2ldLnZhbHVlc1tjbG9zZXN0SW5kZXhdKVxuICAgICAgICA6IHRoaXMuZGF0YS5zZXJpZXNbaV0udmFsdWVzW2Nsb3Nlc3RJbmRleF07XG4gICAgfSk7XG5cbiAgICBsZXQgdG9vbHRpcE9mZnNldEhlaWdodCA9ICt0aGlzLnRvb2x0aXAubm9kZSgpLm9mZnNldEhlaWdodDtcblxuICAgIHRoaXMudG9vbHRpcC5zdHlsZSgndG9wJywgYCR7ZGltZW5zaW9ucy55ICsgZGltZW5zaW9ucy5oZWlnaHQgLyAyIC0gdG9vbHRpcE9mZnNldEhlaWdodCAvIDIgKyBzY3JvbGxbMV19cHhgKTtcbiAgICB0aGlzLnRvb2x0aXAuc3R5bGUoJ2xlZnQnLCBgJHtkaW1lbnNpb25zLnggKyA4fXB4YCk7XG4gICAgdGhpcy50b29sdGlwLnN0eWxlKCdvcGFjaXR5JywgMSk7XG4gIH07XG5cbiAgcHJpdmF0ZSB0b29sdGlwSGlkZSA9ICgpID0+IHtcbiAgICB0aGlzLnRvb2x0aXAuc3R5bGUoJ29wYWNpdHknLCAwKTtcbiAgfTtcblxuICBwcml2YXRlIHhBeGlzRm9ybWF0dGVyID0gaXRlbSA9PiB7XG4gICAgY29uc3QgcGFyc2VEYXRlID0gZDNfaXNvUGFyc2UoaXRlbSk7XG4gICAgcmV0dXJuIHRoaXMueEF4aXNGb3JtYXQocGFyc2VEYXRlKTtcbiAgfTtcblxuICBwcml2YXRlIHlBeGlzRm9ybWF0dGVyID0gaXRlbSA9PiB7XG4gICAgcmV0dXJuIHRoaXMueUF4aXNGb3JtYXQoaXRlbSk7XG4gIH07XG59XG4iXX0=