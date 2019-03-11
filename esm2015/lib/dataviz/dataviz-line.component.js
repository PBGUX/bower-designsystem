/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.updateChart = (/**
         * @return {?}
         */
        () => {
            this.mouserect.data(this.data);
            // update the xScale
            this.xAxisScale.domain(d3_extent(this.data.dates, (/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => {
                return d3_isoParse(d);
            })));
            // update the yScale
            this.yAxisScale
                .domain([
                d3_min(this.data.series, (/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                (d, i) => {
                    return +d3_min(d.values);
                })),
                d3_max(this.data.series, (/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                (d, i) => {
                    return +d3_max(d.values);
                }))
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
                .attr('d', (/**
             * @param {?} d
             * @return {?}
             */
            d => this.d3line(d.values)));
            if (this.area) {
                group
                    .select('path.area')
                    .transition()
                    .duration(1000)
                    .attr('d', (/**
                 * @param {?} d
                 * @return {?}
                 */
                d => this.d3area(d.values)));
            }
            group
                .selectAll('circle')
                .data((/**
             * @param {?} d
             * @return {?}
             */
            d => d.values))
                .transition()
                .duration(1000)
                .attr('cx', (/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => this.xAxisScale(d3_isoParse(this.data.dates[i]))))
                .attr('cy', (/**
             * @param {?} d
             * @return {?}
             */
            d => this.yAxisScale(d)));
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
                .style('color', (/**
             * @param {?} d
             * @return {?}
             */
            d => this.colorRange(d.label)))
                .style('stroke-width', this.lineWidth)
                .transition()
                .duration(1000)
                .attr('d', (/**
             * @param {?} data
             * @return {?}
             */
            data => this.d3line(data.values)));
            if (this.area) {
                groupEnter
                    .append('path')
                    .attr('class', 'area')
                    .attr('d', (/**
                 * @param {?} data
                 * @return {?}
                 */
                data => this.d3area(data.values)))
                    .style('color', (/**
                 * @param {?} d
                 * @return {?}
                 */
                d => this.colorRange(d.label)));
            }
            // add points
            if (this.linePoints) {
                /** @type {?} */
                const points = groupEnter
                    .append('g')
                    .attr('class', 'points')
                    .style('color', (/**
                 * @param {?} d
                 * @return {?}
                 */
                d => this.colorRange(d.label)));
                /** @type {?} */
                const circles = points.selectAll('circle').data((/**
                 * @param {?} d
                 * @return {?}
                 */
                d => d.values));
                circles
                    .enter()
                    .append('circle')
                    .attr('cx', (/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                (d, i) => this.xAxisScale(d3_isoParse(this.data.dates[i]))))
                    .attr('cy', (/**
                 * @param {?} d
                 * @return {?}
                 */
                d => this.yAxisScale(d)))
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
                legendItem.select('.legend-label').html((/**
                 * @param {?} d
                 * @return {?}
                 */
                d => {
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
                }));
                // legend items on enter
                /** @type {?} */
                let enterLegendItem = legendItem
                    .enter()
                    .append('li')
                    .attr('class', 'legend-item');
                enterLegendItem
                    .append('span')
                    .attr('class', 'legend-key')
                    .style('background-color', (/**
                 * @param {?} d
                 * @return {?}
                 */
                d => this.colorRange(d.label)));
                enterLegendItem
                    .append('span')
                    .attr('class', 'legend-label')
                    .html((/**
                 * @param {?} d
                 * @return {?}
                 */
                d => {
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
                }));
                enterLegendItem
                    .on('mouseover', (/**
                 * @param {?} data
                 * @param {?} index
                 * @param {?} nodes
                 * @return {?}
                 */
                (data, index, nodes) => this.legendMouseOver(d3_event, data, index, nodes)))
                    .on('mouseout', (/**
                 * @return {?}
                 */
                () => this.legendMouseOut()))
                    .on('click', (/**
                 * @param {?} data
                 * @param {?} index
                 * @param {?} nodes
                 * @return {?}
                 */
                (data, index, nodes) => this.legendMouseClick(d3_event, data, index, nodes)));
            }
            if (!this.hideTooltip) {
                /** @type {?} */
                let tooltipItem = this.tooltip
                    .select('.tooltip-table')
                    .selectAll('tr')
                    .data(this.data.series);
                tooltipItem.exit().remove();
                // update existing items
                tooltipItem.select('.tooltip-label pr-2').html((/**
                 * @param {?} d
                 * @return {?}
                 */
                d => {
                    return this.tooltipHeadingFormat(d.label);
                }));
                // items on enter
                /** @type {?} */
                let entertooltipItem = tooltipItem
                    .enter()
                    .append('tr')
                    .attr('class', 'tooltip-item');
                entertooltipItem
                    .append('td')
                    .style('color', (/**
                 * @param {?} d
                 * @return {?}
                 */
                d => this.colorRange(d.label)))
                    .append('span')
                    .attr('class', 'pbds-tooltip-key');
                entertooltipItem
                    .append('td')
                    .attr('class', 'tooltip-label pr-2')
                    .html((/**
                 * @param {?} d
                 * @return {?}
                 */
                d => {
                    return this.tooltipLabelFormatType ? this.tooltipLabelFormat(d.label) : d.label;
                }));
                entertooltipItem
                    .append('td')
                    .attr('class', 'tooltip-value text-right')
                    .html((/**
                 * @param {?} d
                 * @return {?}
                 */
                d => ''));
            }
            this.mouserect.raise();
        });
        this.legendMouseOver = (/**
         * @param {?} event
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (event, data, index, nodes) => {
            this.chart
                .selectAll('.legend-item')
                .filter((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => i !== index))
                .classed('inactive', true);
            this.chart
                .selectAll('.line-group')
                .filter((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => i !== index))
                .classed('inactive', true);
            /** @type {?} */
            const line = this.chart.selectAll('.line-group').filter((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => i === index));
            line.classed('active', true);
            if (this.linePoints) {
                /** @type {?} */
                const circles = line.selectAll('circle');
                circles.classed('active', true);
            }
            this.hovered.emit({ event, data });
        });
        this.legendMouseOut = (/**
         * @return {?}
         */
        () => {
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
        });
        this.legendMouseClick = (/**
         * @param {?} event
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (event, data, index, nodes) => {
            this.clicked.emit({ event, data });
        });
        this.mouserectMouseMove = (/**
         * @param {?} event
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (event, index, nodes) => {
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
            circles.filter((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => i === closestIndex)).classed('active', true);
            circles.filter((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => i !== closestIndex)).classed('active', false);
            this.tooltipLine
                .attr('x1', this.xAxisScale(closestDate))
                .attr('x2', this.xAxisScale(closestDate))
                .classed('active', true);
            // console.log(this.tooltipLine.node().getBoundingClientRect(), this._scroll.getScrollPosition());
            this.tooltipShow(this.tooltipLine.node(), closestIndex);
            this.mousedata = {
                date: closestDate,
                series: this.data.series.map((/**
                 * @param {?} d
                 * @return {?}
                 */
                d => {
                    return {
                        label: d.label,
                        value: d.values[closestIndex]
                    };
                }))
            };
            this.tooltipHovered.emit({ event, data: this.mousedata });
        });
        this.mouserectMouseOut = (/**
         * @param {?} event
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (event, index, nodes) => {
            this.svg.selectAll('circle').classed('active', false);
            this.tooltipLine.classed('active', false);
            this.tooltipHide();
        });
        this.mouserectMouseClick = (/**
         * @return {?}
         */
        () => {
            this.tooltipClicked.emit({ event, data: this.mousedata });
        });
        this.tooltipShow = (/**
         * @param {?} node
         * @param {?} closestIndex
         * @return {?}
         */
        (node, closestIndex) => {
            /** @type {?} */
            let scroll = this._scroll.getScrollPosition();
            /** @type {?} */
            let dimensions = node.getBoundingClientRect();
            this.tooltip.select('.tooltip-header').html((/**
             * @param {?} d
             * @return {?}
             */
            d => {
                /** @type {?} */
                const parsedTime = d3_isoParse(this.data.dates[closestIndex]);
                return this.tooltipHeadingFormat(parsedTime);
            }));
            this.tooltip.selectAll('.tooltip-value').html((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => {
                return this.tooltipValueFormatType
                    ? this.tooltipValueFormat(this.data.series[i].values[closestIndex])
                    : this.data.series[i].values[closestIndex];
            }));
            /** @type {?} */
            let tooltipOffsetHeight = +this.tooltip.node().offsetHeight;
            this.tooltip.style('top', `${dimensions.y + dimensions.height / 2 - tooltipOffsetHeight / 2 + scroll[1]}px`);
            this.tooltip.style('left', `${dimensions.x + 8}px`);
            this.tooltip.style('opacity', 1);
        });
        this.tooltipHide = (/**
         * @return {?}
         */
        () => {
            this.tooltip.style('opacity', 0);
        });
        this.xAxisFormatter = (/**
         * @param {?} item
         * @return {?}
         */
        item => {
            /** @type {?} */
            const parseDate = d3_isoParse(item);
            return this.xAxisFormat(parseDate);
        });
        this.yAxisFormatter = (/**
         * @param {?} item
         * @return {?}
         */
        item => {
            return this.yAxisFormat(item);
        });
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
            .x((/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        (d, i) => this.xAxisScale(d3_isoParse(this.data.dates[i]))))
            .y((/**
         * @param {?} d
         * @return {?}
         */
        (d) => this.yAxisScale(d)));
        // define line curve
        if (this.lineCurved) {
            this.d3line.curve(d3_curveCatmullRom.alpha(0.5));
        }
        // define area
        if (this.area) {
            this.d3area = d3_area()
                .x((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => this.xAxisScale(d3_isoParse(this.data.dates[i]))))
                .y0(this.height)
                .y1((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => this.yAxisScale(d)));
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
            .on('mousemove', (/**
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (data, index, nodes) => this.mouserectMouseMove(d3_event, index, nodes)))
            .on('mouseout', (/**
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (data, index, nodes) => this.mouserectMouseOut(d3_event, index, nodes)))
            .on('click', (/**
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (data, index, nodes) => this.mouserectMouseClick()));
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
            .domain(d3_extent(this.data.dates, (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        (d, i) => {
            return d3_isoParse(d);
        })))
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
            d3_min(this.data.series, (/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => {
                return +d3_min(d.values);
            })),
            d3_max(this.data.series, (/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => {
                return +d3_max(d.values);
            }))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXZpei1saW5lLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3BiLWRlc2lnbi1zeXN0ZW0vIiwic291cmNlcyI6WyJsaWIvZGF0YXZpei9kYXRhdml6LWxpbmUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUdULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFVBQVUsRUFDVixXQUFXLEVBR1gsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRW5ELE9BQU8sRUFDTCxNQUFNLElBQUksU0FBUyxFQUNuQixRQUFRLElBQUksV0FBVyxFQUN2QixTQUFTLElBQUksWUFBWSxFQUN6QixVQUFVLElBQUksYUFBYSxFQUMzQixNQUFNLElBQUksU0FBUyxFQUNuQixZQUFZLElBQUksZUFBZSxFQUMvQixTQUFTLElBQUksWUFBWSxFQUN6QixJQUFJLElBQUksT0FBTyxFQUNmLFdBQVcsSUFBSSxjQUFjLEVBQzdCLE1BQU0sSUFBSSxTQUFTLEVBQ25CLEdBQUcsSUFBSSxNQUFNLEVBQ2IsR0FBRyxJQUFJLE1BQU0sRUFDYixVQUFVLElBQUksYUFBYSxFQUMzQixRQUFRLElBQUksV0FBVyxFQUN2QixLQUFLLElBQUksUUFBUSxFQUNqQixlQUFlLElBQUksa0JBQWtCLEVBQ3JDLEtBQUssSUFBSSxRQUFRLEVBQ2pCLFVBQVUsSUFBSSxhQUFhLEVBQzNCLElBQUksSUFBSSxPQUFPLEVBQ2hCLE1BQU0sSUFBSSxDQUFDO0FBRVosT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFTdkQsTUFBTSxPQUFPLHdCQUF3Qjs7Ozs7O0lBcUluQyxZQUFvQixRQUE0QixFQUFVLFFBQW9CLEVBQVUsT0FBeUI7UUFBN0YsYUFBUSxHQUFSLFFBQVEsQ0FBb0I7UUFBVSxhQUFRLEdBQVIsUUFB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Qjs7Ozs7SUFDbkIsOENBQW1COzs7OztJQUNuQiw2Q0FBa0I7Ozs7O0lBQ2xCLHlDQUFjOzs7OztJQUNkLCtDQUFvQjs7Ozs7SUFDcEIsOENBQW1COzs7OztJQUNuQiw2Q0FBa0I7Ozs7O0lBQ2xCLHlDQUFjOzs7OztJQUNkLCtDQUFvQjs7Ozs7SUFDcEIseUNBQWM7Ozs7O0lBQ2QsNkNBQWtCOzs7OztJQUNsQix5Q0FBYzs7Ozs7SUFDZCw2Q0FBa0I7Ozs7O0lBQ2xCLGlEQUE4Qjs7Ozs7SUFDOUIsc0RBQW1DOzs7OztJQUNuQyxpREFBOEI7Ozs7O0lBQzlCLHNEQUFtQzs7Ozs7SUFDbkMsNkNBQTJCOzs7OztJQUMzQiw2Q0FBMkI7Ozs7O0lBQzNCLG1EQUFpQzs7Ozs7SUFDakMsbURBQWlDOzs7OztJQUNqQyxpREFBK0I7Ozs7O0lBQy9CLGlEQUErQjs7Ozs7SUFDL0IsNkNBQTJCOzs7OztJQUMzQiw2Q0FBMkI7Ozs7O0lBQzNCLGtEQUFnQzs7Ozs7SUFDaEMsa0RBQWdDOzs7OztJQUNoQyxxREFBMEI7Ozs7O0lBQzFCLDJDQUFnQjs7Ozs7SUFDaEIsK0NBQTZCOzs7OztJQUM3Qix3REFBNkI7Ozs7O0lBQzdCLHNEQUEyQjs7Ozs7SUFDM0Isc0RBQTJCOzs7OztJQUMzQiw2Q0FBa0I7O0lBMFJsQiwrQ0F5TkU7O0lBRUYsbURBb0JFOztJQUVGLGtEQVlFOztJQUVGLG9EQUVFOztJQUVGLHNEQW9DRTs7SUFFRixxREFJRTs7SUFFRix1REFFRTs7Ozs7SUFFRiwrQ0FvQkU7Ozs7O0lBRUYsK0NBRUU7Ozs7O0lBRUYsa0RBR0U7Ozs7O0lBRUYsa0RBRUU7Ozs7O0lBNW1CVSw0Q0FBb0M7Ozs7O0lBQUUsNENBQTRCOzs7OztJQUFFLDJDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBPbkNoYW5nZXMsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgRWxlbWVudFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIE9uRGVzdHJveSxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFZpZXdwb3J0U2Nyb2xsZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQge1xuICBzZWxlY3QgYXMgZDNfc2VsZWN0LFxuICBpc29QYXJzZSBhcyBkM19pc29QYXJzZSxcbiAgaXNvRm9ybWF0IGFzIGQzX2lzb0Zvcm1hdCxcbiAgdGltZUZvcm1hdCBhcyBkM190aW1lRm9ybWF0LFxuICBmb3JtYXQgYXMgZDNfZm9ybWF0LFxuICBzY2FsZU9yZGluYWwgYXMgZDNfc2NhbGVPcmRpbmFsLFxuICBzY2FsZVRpbWUgYXMgZDNfc2NhbGVUaW1lLFxuICBsaW5lIGFzIGQzX2xpbmUsXG4gIHNjYWxlTGluZWFyIGFzIGQzX3NjYWxlTGluZWFyLFxuICBleHRlbnQgYXMgZDNfZXh0ZW50LFxuICBtaW4gYXMgZDNfbWluLFxuICBtYXggYXMgZDNfbWF4LFxuICBheGlzQm90dG9tIGFzIGQzX2F4aXNCb3R0b20sXG4gIGF4aXNMZWZ0IGFzIGQzX2F4aXNMZWZ0LFxuICBldmVudCBhcyBkM19ldmVudCxcbiAgY3VydmVDYXRtdWxsUm9tIGFzIGQzX2N1cnZlQ2F0bXVsbFJvbSxcbiAgbW91c2UgYXMgZDNfbW91c2UsXG4gIGJpc2VjdExlZnQgYXMgZDNfYmlzZWN0TGVmdCxcbiAgYXJlYSBhcyBkM19hcmVhXG59IGZyb20gJ2QzJztcblxuaW1wb3J0IHsgUGJkc0RhdGF2aXpTZXJ2aWNlIH0gZnJvbSAnLi9kYXRhdml6LnNlcnZpY2UnO1xuaW1wb3J0IHsgSVBiZHNEYXRhdml6TGluZSB9IGZyb20gJy4vZGF0YXZpei5pbnRlcmZhY2VzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncGJkcy1kYXRhdml6LWxpbmUnLFxuICB0ZW1wbGF0ZTogYGAsXG4gIHN0eWxlczogW10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFBiZHNEYXRhdml6TGluZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnBiZHMtY2hhcnQnKVxuICBjaGFydENsYXNzID0gdHJ1ZTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnBiZHMtY2hhcnQtbGluZScpXG4gIGxpbmVDbGFzcyA9IHRydWU7XG5cbiAgQElucHV0KClcbiAgZGF0YTogSVBiZHNEYXRhdml6TGluZTtcblxuICBASW5wdXQoKVxuICB3aWR0aCA9IDMwNjtcblxuICBASW5wdXQoKVxuICBoZWlnaHQgPSA0MDA7XG5cbiAgQElucHV0KClcbiAgdHlwZTogJ21lZGl1bScgfCAnaGlnaCcgfCAnZGVidWcnID0gJ21lZGl1bSc7IC8vIGRlYnVnIHRvIHNob3cgYWxsIGNoYXJ0IG9wdGlvbnNcblxuICBASW5wdXQoKVxuICBhcmVhID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgeEF4aXNGb3JtYXRTdHJpbmcgPSAnJztcblxuICBASW5wdXQoKVxuICB4QXhpc1RpY2tzID0gNjtcblxuICBASW5wdXQoKVxuICB5QXhpc0Zvcm1hdFN0cmluZyA9ICcnO1xuXG4gIEBJbnB1dCgpXG4gIHlBeGlzVGlja3MgPSA1O1xuXG4gIEBJbnB1dCgpXG4gIGhpZGVMZWdlbmQgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBsZWdlbmRXaWR0aCA9IDEwNSArIDI4OyAvLyBoYXJkY29kZWQgbGVnZW5kIHdpZHRoICsgbGVmdCBtYXJnaW4sIGRvIG5vdCBkb2N1bWVudCB1bnRpbCBmZWVkYmFja1xuXG4gIEBJbnB1dCgpXG4gIGxlZ2VuZFBvc2l0aW9uOiAncmlnaHQnIHwgJ2JvdHRvbScgPSAncmlnaHQnO1xuXG4gIEBJbnB1dCgpXG4gIGxlZ2VuZExhYmVsRm9ybWF0VHlwZTogJ251bWJlcicgfCAndGltZScgPSBudWxsO1xuXG4gIEBJbnB1dCgpXG4gIGxlZ2VuZExhYmVsRm9ybWF0U3RyaW5nID0gJyc7XG5cbiAgQElucHV0KClcbiAgdG9vbHRpcEhlYWRpbmdGb3JtYXRTdHJpbmcgPSAnJztcblxuICBASW5wdXQoKVxuICB0b29sdGlwTGFiZWxGb3JtYXRUeXBlOiAnbnVtYmVyJyB8ICd0aW1lJyA9IG51bGw7XG5cbiAgQElucHV0KClcbiAgdG9vbHRpcExhYmVsRm9ybWF0U3RyaW5nID0gJyc7XG5cbiAgQElucHV0KClcbiAgdG9vbHRpcFZhbHVlRm9ybWF0VHlwZTogJ251bWJlcicgfCAndGltZScgPSBudWxsO1xuXG4gIEBJbnB1dCgpXG4gIHRvb2x0aXBWYWx1ZUZvcm1hdFN0cmluZyA9ICcnO1xuXG4gIEBJbnB1dCgpXG4gIG1hcmdpblRvcCA9IDEwOyAvLyBoYXJkY29kZWQgb24gcHVycG9zZSwgZG8gbm90IGRvY3VtZW50IHVudGlsIGZlZWRiYWNrXG5cbiAgQElucHV0KClcbiAgbWFyZ2luUmlnaHQgPSAyMDsgLy8gaGFyZGNvZGVkIG9uIHB1cnBvc2UsIGRvIG5vdCBkb2N1bWVudCB1bnRpbCBmZWVkYmFja1xuXG4gIEBJbnB1dCgpXG4gIG1hcmdpbkJvdHRvbSA9IDMwOyAvLyBoYXJkY29kZWQgb24gcHVycG9zZSwgZG8gbm90IGRvY3VtZW50IHVudGlsIGZlZWRiYWNrXG5cbiAgQElucHV0KClcbiAgbWFyZ2luTGVmdCA9IDU1OyAvLyBoYXJkY29kZWQgb24gcHVycG9zZSwgZG8gbm90IGRvY3VtZW50IHVudGlsIGZlZWRiYWNrXG5cbiAgQE91dHB1dCgpXG4gIGhvdmVyZWQ6IEV2ZW50RW1pdHRlcjxvYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcjxvYmplY3Q+KCk7XG5cbiAgQE91dHB1dCgpXG4gIGNsaWNrZWQ6IEV2ZW50RW1pdHRlcjxvYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcjxvYmplY3Q+KCk7XG5cbiAgQE91dHB1dCgpXG4gIHRvb2x0aXBIb3ZlcmVkOiBFdmVudEVtaXR0ZXI8b2JqZWN0PiA9IG5ldyBFdmVudEVtaXR0ZXI8b2JqZWN0PigpO1xuXG4gIEBPdXRwdXQoKVxuICB0b29sdGlwQ2xpY2tlZDogRXZlbnRFbWl0dGVyPG9iamVjdD4gPSBuZXcgRXZlbnRFbWl0dGVyPG9iamVjdD4oKTtcblxuICBwcml2YXRlIGNoYXJ0O1xuICBwcml2YXRlIHN2ZztcbiAgcHJpdmF0ZSBtb3VzZXJlY3Q7XG4gIHByaXZhdGUgdG9vbHRpcExpbmU7XG4gIHByaXZhdGUgbWFyZ2luO1xuICBwcml2YXRlIGQzbGluZTtcbiAgcHJpdmF0ZSBkM2FyZWE7XG4gIHByaXZhdGUgbGluZVdpZHRoO1xuICBwcml2YXRlIGxpbmVDdXJ2ZWQ7XG4gIHByaXZhdGUgbGluZVBvaW50cztcbiAgcHJpdmF0ZSBjb2xvclJhbmdlO1xuICBwcml2YXRlIHhBeGlzU2NhbGU7XG4gIHByaXZhdGUgeEF4aXNDYWxsO1xuICBwcml2YXRlIHhBeGlzO1xuICBwcml2YXRlIHhBeGlzRm9ybWF0O1xuICBwcml2YXRlIHlBeGlzU2NhbGU7XG4gIHByaXZhdGUgeUF4aXNDYWxsO1xuICBwcml2YXRlIHlBeGlzO1xuICBwcml2YXRlIHlBeGlzRm9ybWF0O1xuICBwcml2YXRlIHhHcmlkO1xuICBwcml2YXRlIHhHcmlkQ2FsbDtcbiAgcHJpdmF0ZSB5R3JpZDtcbiAgcHJpdmF0ZSB5R3JpZENhbGw7XG4gIHByaXZhdGUgeEF4aXNUaWNrU2l6ZTogbnVtYmVyO1xuICBwcml2YXRlIHhBeGlzVGlja1NpemVPdXRlcjogbnVtYmVyO1xuICBwcml2YXRlIHlBeGlzVGlja1NpemU6IG51bWJlcjtcbiAgcHJpdmF0ZSB5QXhpc1RpY2tTaXplT3V0ZXI6IG51bWJlcjtcbiAgcHJpdmF0ZSBoaWRlWEF4aXM6IGJvb2xlYW47XG4gIHByaXZhdGUgaGlkZVlBeGlzOiBib29sZWFuO1xuICBwcml2YXRlIGhpZGVYQXhpc0RvbWFpbjogYm9vbGVhbjtcbiAgcHJpdmF0ZSBoaWRlWUF4aXNEb21haW46IGJvb2xlYW47XG4gIHByaXZhdGUgaGlkZVhBeGlzWmVybzogYm9vbGVhbjtcbiAgcHJpdmF0ZSBoaWRlWUF4aXNaZXJvOiBib29sZWFuO1xuICBwcml2YXRlIGhpZGVYR3JpZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBoaWRlWUdyaWQ6IGJvb2xlYW47XG4gIHByaXZhdGUgaGlkZVhBeGlzVGlja3M6IGJvb2xlYW47XG4gIHByaXZhdGUgaGlkZVlBeGlzVGlja3M6IGJvb2xlYW47XG4gIHByaXZhdGUgbGVnZW5kTGFiZWxGb3JtYXQ7XG4gIHByaXZhdGUgdG9vbHRpcDtcbiAgcHJpdmF0ZSBoaWRlVG9vbHRpcDogYm9vbGVhbjtcbiAgcHJpdmF0ZSB0b29sdGlwSGVhZGluZ0Zvcm1hdDtcbiAgcHJpdmF0ZSB0b29sdGlwVmFsdWVGb3JtYXQ7XG4gIHByaXZhdGUgdG9vbHRpcExhYmVsRm9ybWF0O1xuICBwcml2YXRlIG1vdXNlZGF0YTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9kYXRhdml6OiBQYmRzRGF0YXZpelNlcnZpY2UsIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3Njcm9sbDogVmlld3BvcnRTY3JvbGxlcikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm1hcmdpbiA9IHtcbiAgICAgIHRvcDogK3RoaXMubWFyZ2luVG9wLFxuICAgICAgcmlnaHQ6ICt0aGlzLm1hcmdpblJpZ2h0LFxuICAgICAgYm90dG9tOiArdGhpcy5tYXJnaW5Cb3R0b20sXG4gICAgICBsZWZ0OiArdGhpcy5tYXJnaW5MZWZ0XG4gICAgfTtcblxuICAgIHRoaXMueEF4aXNGb3JtYXQgPSBkM190aW1lRm9ybWF0KHRoaXMueEF4aXNGb3JtYXRTdHJpbmcpO1xuXG4gICAgdGhpcy55QXhpc0Zvcm1hdCA9IGQzX2Zvcm1hdCh0aGlzLnlBeGlzRm9ybWF0U3RyaW5nKTtcblxuICAgIHN3aXRjaCAodGhpcy5sZWdlbmRMYWJlbEZvcm1hdFR5cGUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIHRoaXMubGVnZW5kTGFiZWxGb3JtYXQgPSBkM19mb3JtYXQodGhpcy5sZWdlbmRMYWJlbEZvcm1hdFN0cmluZyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndGltZSc6XG4gICAgICAgIHRoaXMubGVnZW5kTGFiZWxGb3JtYXQgPSBkM190aW1lRm9ybWF0KHRoaXMubGVnZW5kTGFiZWxGb3JtYXRTdHJpbmcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMubGVnZW5kTGFiZWxGb3JtYXQgPSBudWxsO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICB0aGlzLnRvb2x0aXBIZWFkaW5nRm9ybWF0ID0gZDNfdGltZUZvcm1hdCh0aGlzLnRvb2x0aXBIZWFkaW5nRm9ybWF0U3RyaW5nKTtcblxuICAgIHN3aXRjaCAodGhpcy50b29sdGlwTGFiZWxGb3JtYXRUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICB0aGlzLnRvb2x0aXBMYWJlbEZvcm1hdCA9IGQzX2Zvcm1hdCh0aGlzLnRvb2x0aXBMYWJlbEZvcm1hdFN0cmluZyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndGltZSc6XG4gICAgICAgIHRoaXMudG9vbHRpcExhYmVsRm9ybWF0ID0gZDNfdGltZUZvcm1hdCh0aGlzLnRvb2x0aXBMYWJlbEZvcm1hdFN0cmluZyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy50b29sdGlwTGFiZWxGb3JtYXQgPSBudWxsO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHRoaXMudG9vbHRpcFZhbHVlRm9ybWF0VHlwZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgdGhpcy50b29sdGlwVmFsdWVGb3JtYXQgPSBkM19mb3JtYXQodGhpcy50b29sdGlwVmFsdWVGb3JtYXRTdHJpbmcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgICB0aGlzLnRvb2x0aXBWYWx1ZUZvcm1hdCA9IGQzX3RpbWVGb3JtYXQodGhpcy50b29sdGlwVmFsdWVGb3JtYXRTdHJpbmcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMudG9vbHRpcFZhbHVlRm9ybWF0ID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBkZWZhdWx0cyBmb3IgYWxsIGNoYXJ0IHR5cGVzXG4gICAgdGhpcy5saW5lV2lkdGggPSAzO1xuICAgIHRoaXMubGluZUN1cnZlZCA9IHRydWU7XG4gICAgdGhpcy5saW5lUG9pbnRzID0gdHJ1ZTtcbiAgICB0aGlzLmhpZGVYQXhpcyA9IGZhbHNlO1xuICAgIHRoaXMuaGlkZVlBeGlzID0gZmFsc2U7XG4gICAgdGhpcy5oaWRlWEF4aXNaZXJvID0gZmFsc2U7XG4gICAgdGhpcy5oaWRlWUF4aXNaZXJvID0gZmFsc2U7XG4gICAgdGhpcy5oaWRlWEdyaWQgPSBmYWxzZTtcbiAgICB0aGlzLmhpZGVZR3JpZCA9IGZhbHNlO1xuICAgIHRoaXMuaGlkZVhBeGlzRG9tYWluID0gZmFsc2U7XG4gICAgdGhpcy5oaWRlWUF4aXNEb21haW4gPSBmYWxzZTtcbiAgICB0aGlzLmhpZGVUb29sdGlwID0gZmFsc2U7XG4gICAgdGhpcy5oaWRlWEF4aXNUaWNrcyA9IGZhbHNlO1xuICAgIHRoaXMuaGlkZVlBeGlzVGlja3MgPSBmYWxzZTtcbiAgICB0aGlzLnhBeGlzVGlja1NpemUgPSA4O1xuICAgIHRoaXMueEF4aXNUaWNrU2l6ZU91dGVyID0gMDtcbiAgICB0aGlzLnlBeGlzVGlja1NpemUgPSA4O1xuICAgIHRoaXMueUF4aXNUaWNrU2l6ZU91dGVyID0gMDtcblxuICAgIGlmICh0aGlzLnR5cGUgIT09ICdkZWJ1ZycpIHtcbiAgICAgIC8vIHNldCB0eXBlIGRlZmF1bHRzXG4gICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgICBjYXNlICdtZWRpdW0nOlxuICAgICAgICAgIHRoaXMuaGlkZVhHcmlkID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLmhpZGVYQXhpc1RpY2tzID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLmhpZGVZQXhpc1RpY2tzID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLmhpZGVZR3JpZCA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnaGlnaCc6XG4gICAgICAgICAgdGhpcy5saW5lV2lkdGggPSAyO1xuICAgICAgICAgIHRoaXMubGluZUN1cnZlZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMubGluZVBvaW50cyA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuaGlkZVhBeGlzVGlja3MgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuaGlkZVlBeGlzVGlja3MgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGFkanVzdCBtYXJnaW4gaWYgeEF4aXMgaGlkZGVuXG4gICAgaWYgKHRoaXMuaGlkZVhBeGlzKSB0aGlzLm1hcmdpbi5ib3R0b20gPSAxMDsgLy8gbmVlZCBzbWFsbCBtYXJnaW4gZm9yIHlBeGlzIHdpdGggMCB0aWNrIGxhYmVsXG5cbiAgICBpZiAoIXRoaXMuaGlkZUxlZ2VuZCAmJiB0aGlzLmxlZ2VuZFBvc2l0aW9uID09PSAncmlnaHQnKSB7XG4gICAgICB0aGlzLndpZHRoID0gK3RoaXMud2lkdGggLSArdGhpcy5sZWdlbmRXaWR0aDtcbiAgICB9XG5cbiAgICAvLyBkZWZpbmUgbGluZVxuICAgIHRoaXMuZDNsaW5lID0gZDNfbGluZSgpXG4gICAgICAueCgoZDogYW55LCBpKSA9PiB0aGlzLnhBeGlzU2NhbGUoZDNfaXNvUGFyc2UodGhpcy5kYXRhLmRhdGVzW2ldKSkpXG4gICAgICAueSgoZDogYW55KSA9PiB0aGlzLnlBeGlzU2NhbGUoZCkpO1xuXG4gICAgLy8gZGVmaW5lIGxpbmUgY3VydmVcbiAgICBpZiAodGhpcy5saW5lQ3VydmVkKSB7XG4gICAgICB0aGlzLmQzbGluZS5jdXJ2ZShkM19jdXJ2ZUNhdG11bGxSb20uYWxwaGEoMC41KSk7XG4gICAgfVxuXG4gICAgLy8gZGVmaW5lIGFyZWFcbiAgICBpZiAodGhpcy5hcmVhKSB7XG4gICAgICB0aGlzLmQzYXJlYSA9IGQzX2FyZWEoKVxuICAgICAgICAueCgoZDogYW55LCBpKSA9PiB0aGlzLnhBeGlzU2NhbGUoZDNfaXNvUGFyc2UodGhpcy5kYXRhLmRhdGVzW2ldKSkpXG4gICAgICAgIC55MCh0aGlzLmhlaWdodClcbiAgICAgICAgLnkxKChkOiBhbnksIGkpID0+IHRoaXMueUF4aXNTY2FsZShkKSk7XG5cbiAgICAgIGlmICh0aGlzLmxpbmVDdXJ2ZWQpIHtcbiAgICAgICAgdGhpcy5kM2FyZWEuY3VydmUoZDNfY3VydmVDYXRtdWxsUm9tLmFscGhhKDAuNSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNyZWF0ZSB0aGUgY2hhcnRcbiAgICB0aGlzLmNoYXJ0ID0gZDNfc2VsZWN0KHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCkuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4gICAgLy8gY3JlYXRlIGNoYXJ0IHN2Z1xuICAgIHRoaXMuc3ZnID0gdGhpcy5jaGFydFxuICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgIC5hdHRyKCd3aWR0aCcsICt0aGlzLndpZHRoICsgdGhpcy5tYXJnaW4ucmlnaHQpXG4gICAgICAuYXR0cignaGVpZ2h0JywgK3RoaXMuaGVpZ2h0ICsgdGhpcy5tYXJnaW4udG9wICsgdGhpcy5tYXJnaW4uYm90dG9tKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2ltZy1mbHVpZCcpXG4gICAgICAuYXR0cigncHJlc2VydmVBc3BlY3RSYXRpbycsICd4TWluWU1pbiBtZWV0JylcbiAgICAgIC5hdHRyKFxuICAgICAgICAndmlld0JveCcsXG4gICAgICAgIGAtJHt0aGlzLm1hcmdpbi5sZWZ0fSAtJHt0aGlzLm1hcmdpbi50b3B9ICR7K3RoaXMud2lkdGggKyB0aGlzLm1hcmdpbi5yaWdodH0gJHsrdGhpcy5oZWlnaHQgK1xuICAgICAgICAgIHRoaXMubWFyZ2luLnRvcCArXG4gICAgICAgICAgdGhpcy5tYXJnaW4uYm90dG9tfWBcbiAgICAgICk7XG5cbiAgICAvLyBhZGQgcmVjdGFuZ2xlIHRvIGNhcHR1cmUgbW91c2VcbiAgICB0aGlzLm1vdXNlcmVjdCA9IHRoaXMuc3ZnXG4gICAgICAuYXBwZW5kKCdyZWN0JylcbiAgICAgIC5hdHRyKCd3aWR0aCcsIHRoaXMud2lkdGggLSB0aGlzLm1hcmdpbi5sZWZ0IC0gdGhpcy5tYXJnaW4ucmlnaHQpXG4gICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy5oZWlnaHQpXG4gICAgICAuYXR0cignY2xhc3MnLCAnbW91c2VyZWN0JylcbiAgICAgIC5vbignbW91c2Vtb3ZlJywgKGRhdGEsIGluZGV4LCBub2RlcykgPT4gdGhpcy5tb3VzZXJlY3RNb3VzZU1vdmUoZDNfZXZlbnQsIGluZGV4LCBub2RlcykpXG4gICAgICAub24oJ21vdXNlb3V0JywgKGRhdGEsIGluZGV4LCBub2RlcykgPT4gdGhpcy5tb3VzZXJlY3RNb3VzZU91dChkM19ldmVudCwgaW5kZXgsIG5vZGVzKSlcbiAgICAgIC5vbignY2xpY2snLCAoZGF0YSwgaW5kZXgsIG5vZGVzKSA9PiB0aGlzLm1vdXNlcmVjdE1vdXNlQ2xpY2soKSk7XG5cbiAgICB0aGlzLnRvb2x0aXBMaW5lID0gdGhpcy5zdmdcbiAgICAgIC5hcHBlbmQoJ2xpbmUnKVxuICAgICAgLmF0dHIoJ3kxJywgMClcbiAgICAgIC5hdHRyKCd5MicsIHRoaXMuaGVpZ2h0KVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Rvb2x0aXAtbGluZScpO1xuXG4gICAgLy8gZGVmaW5lIGNvbG9yIHJhbmdlXG4gICAgdGhpcy5jb2xvclJhbmdlID0gZDNfc2NhbGVPcmRpbmFsKCkucmFuZ2UodGhpcy5fZGF0YXZpei5nZXRDb2xvcnMoZmFsc2UpKTtcblxuICAgIC8vIGFkZCBnbG93IGRlZlxuICAgIHRoaXMuX2RhdGF2aXouY3JlYXRlR2xvd0ZpbHRlcih0aGlzLnN2Zyk7XG5cbiAgICAvLyBYIEFYSVNcbiAgICB0aGlzLnhBeGlzU2NhbGUgPSBkM19zY2FsZVRpbWUoKVxuICAgICAgLmRvbWFpbihcbiAgICAgICAgZDNfZXh0ZW50KHRoaXMuZGF0YS5kYXRlcywgKGQ6IGFueSwgaSkgPT4ge1xuICAgICAgICAgIHJldHVybiBkM19pc29QYXJzZShkKTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5yYW5nZShbMCwgdGhpcy53aWR0aCAtIHRoaXMubWFyZ2luLmxlZnQgLSB0aGlzLm1hcmdpbi5yaWdodF0pO1xuXG4gICAgdGhpcy54QXhpc0NhbGwgPSBkM19heGlzQm90dG9tKHRoaXMueEF4aXNTY2FsZSlcbiAgICAgIC50aWNrcygrdGhpcy54QXhpc1RpY2tzKVxuICAgICAgLnRpY2tTaXplKHRoaXMueEF4aXNUaWNrU2l6ZSlcbiAgICAgIC50aWNrU2l6ZU91dGVyKHRoaXMueEF4aXNUaWNrU2l6ZU91dGVyKVxuICAgICAgLnRpY2tGb3JtYXQodGhpcy54QXhpc0Zvcm1hdHRlcik7XG5cbiAgICB0aGlzLnhBeGlzID0gdGhpcy5zdmdcbiAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2F4aXMgYXhpcy14JylcbiAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKDAsICR7dGhpcy5oZWlnaHR9KWApIC8vJHstdGhpcy5tYXJnaW4ucmlnaHQgLyAyfVxuICAgICAgLmNsYXNzZWQoJ2F4aXMtaGlkZGVuJywgdGhpcy5oaWRlWEF4aXMpXG4gICAgICAuY2xhc3NlZCgnYXhpcy16ZXJvLWhpZGRlbicsIHRoaXMuaGlkZVhBeGlzWmVybylcbiAgICAgIC5jbGFzc2VkKCdheGlzLWRvbWFpbi1oaWRkZW4nLCB0aGlzLmhpZGVYQXhpc0RvbWFpbilcbiAgICAgIC5jbGFzc2VkKCdheGlzLXRpY2tzLWhpZGRlbicsIHRoaXMuaGlkZVhBeGlzVGlja3MpXG4gICAgICAuY2FsbCh0aGlzLnhBeGlzQ2FsbCk7XG5cbiAgICAvLyBYIEdSSURMSU5FU1xuICAgIGlmICghdGhpcy5oaWRlWEdyaWQpIHtcbiAgICAgIHRoaXMueEdyaWRDYWxsID0gZDNfYXhpc0JvdHRvbSh0aGlzLnhBeGlzU2NhbGUpLnRpY2tTaXplKC10aGlzLmhlaWdodCk7XG5cbiAgICAgIHRoaXMueEdyaWQgPSB0aGlzLnN2Z1xuICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyaWQgZ3JpZC14JylcbiAgICAgICAgLmNsYXNzZWQoJ2dyaWQtemVyby1oaWRkZW4nLCB0aGlzLmhpZGVYQXhpc1plcm8pXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKDAsICR7dGhpcy5oZWlnaHR9KWApIC8vJHstdGhpcy5tYXJnaW4ucmlnaHQgLyAyfVxuICAgICAgICAuY2FsbCh0aGlzLnhHcmlkQ2FsbCk7XG4gICAgfVxuXG4gICAgLy8gWSBBWElTXG4gICAgdGhpcy55QXhpc1NjYWxlID0gZDNfc2NhbGVMaW5lYXIoKVxuICAgICAgLmRvbWFpbihbXG4gICAgICAgIGQzX21pbih0aGlzLmRhdGEuc2VyaWVzLCAoZDogYW55LCBpKSA9PiB7XG4gICAgICAgICAgcmV0dXJuICtkM19taW4oZC52YWx1ZXMpO1xuICAgICAgICB9KSxcbiAgICAgICAgZDNfbWF4KHRoaXMuZGF0YS5zZXJpZXMsIChkOiBhbnksIGkpID0+IHtcbiAgICAgICAgICByZXR1cm4gK2QzX21heChkLnZhbHVlcyk7XG4gICAgICAgIH0pXG4gICAgICBdKVxuICAgICAgLm5pY2UoKVxuICAgICAgLnJhbmdlKFt0aGlzLmhlaWdodCwgMF0pO1xuXG4gICAgdGhpcy55QXhpc0NhbGwgPSBkM19heGlzTGVmdCh0aGlzLnlBeGlzU2NhbGUpXG4gICAgICAudGlja3ModGhpcy55QXhpc1RpY2tzKVxuICAgICAgLnRpY2tTaXplKHRoaXMueUF4aXNUaWNrU2l6ZSlcbiAgICAgIC50aWNrU2l6ZU91dGVyKHRoaXMueUF4aXNUaWNrU2l6ZU91dGVyKVxuICAgICAgLnRpY2tGb3JtYXQodGhpcy55QXhpc0Zvcm1hdHRlcik7XG5cbiAgICB0aGlzLnlBeGlzID0gdGhpcy5zdmdcbiAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2F4aXMgYXhpcy15JylcbiAgICAgIC5jbGFzc2VkKCdheGlzLWhpZGRlbicsIHRoaXMuaGlkZVlBeGlzKVxuICAgICAgLmNsYXNzZWQoJ2F4aXMtemVyby1oaWRkZW4nLCB0aGlzLmhpZGVZQXhpc1plcm8pXG4gICAgICAuY2xhc3NlZCgnYXhpcy1kb21haW4taGlkZGVuJywgdGhpcy5oaWRlWUF4aXNEb21haW4pXG4gICAgICAuY2xhc3NlZCgnYXhpcy10aWNrcy1oaWRkZW4nLCB0aGlzLmhpZGVZQXhpc1RpY2tzKVxuICAgICAgLmNhbGwodGhpcy55QXhpc0NhbGwpO1xuXG4gICAgLy8gWSBHUklETElORVNcbiAgICBpZiAoIXRoaXMuaGlkZVlHcmlkKSB7XG4gICAgICB0aGlzLnlHcmlkQ2FsbCA9IGQzX2F4aXNMZWZ0KHRoaXMueUF4aXNTY2FsZSlcbiAgICAgICAgLnRpY2tzKHRoaXMueUF4aXNUaWNrcylcbiAgICAgICAgLnRpY2tTaXplKC10aGlzLndpZHRoICsgdGhpcy5tYXJnaW4ubGVmdCArIHRoaXMubWFyZ2luLnJpZ2h0KTtcblxuICAgICAgdGhpcy55R3JpZCA9IHRoaXMuc3ZnXG4gICAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZCBncmlkLXknKVxuICAgICAgICAuY2xhc3NlZCgnZ3JpZC16ZXJvLWhpZGRlbicsIHRoaXMuaGlkZVlBeGlzWmVybylcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoMCwgMClgKVxuICAgICAgICAuY2FsbCh0aGlzLnlHcmlkQ2FsbCk7XG4gICAgfVxuXG4gICAgLy8gVE9PTFRJUFxuICAgIGlmICghdGhpcy5oaWRlVG9vbHRpcCkge1xuICAgICAgdGhpcy50b29sdGlwID0gZDNfc2VsZWN0KCdib2R5JylcbiAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BiZHMtdG9vbHRpcCB3ZXN0JylcbiAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMClcbiAgICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTsgLy8gaGlkZSB0b29sdGlwIGZvciBhY2Nlc3NpYmlsaXR5XG5cbiAgICAgIC8vIHRvb2x0aXAgaGVhZGVyXG4gICAgICB0aGlzLnRvb2x0aXAuYXBwZW5kKCdkaXYnKS5hdHRyKCdjbGFzcycsICd0b29sdGlwLWhlYWRlcicpO1xuXG4gICAgICAvLyB0b29sdGlwIHRhYmxlXG4gICAgICBjb25zdCB0b29sdGlwVGFibGUgPSB0aGlzLnRvb2x0aXAuYXBwZW5kKCd0YWJsZScpLmF0dHIoJ2NsYXNzJywgJ3Rvb2x0aXAtdGFibGUgdGV4dC1sZWZ0IHctMTAwJyk7XG5cbiAgICAgIGNvbnN0IHRvb2x0aXBUYWJsZVRib2R5ID0gdG9vbHRpcFRhYmxlLmFwcGVuZCgndGJvZHknKTtcblxuICAgICAgdG9vbHRpcFRhYmxlVGJvZHlcbiAgICAgICAgLnNlbGVjdEFsbCgndHInKVxuICAgICAgICAuZGF0YSh0aGlzLmRhdGEpXG4gICAgICAgIC5lbnRlcigpXG4gICAgICAgIC5hcHBlbmQoJ3RyJyk7XG4gICAgfVxuXG4gICAgLy8gYWRkIGxlZ2VuZCBjbGFzc2VzXG4gICAgaWYgKCF0aGlzLmhpZGVMZWdlbmQpIHtcbiAgICAgIHRoaXMuY2hhcnQuY2xhc3NlZCgncGJkcy1jaGFydC1sZWdlbmQtYm90dG9tJywgdGhpcy5sZWdlbmRQb3NpdGlvbiA9PT0gJ2JvdHRvbScgPyB0cnVlIDogZmFsc2UpO1xuICAgICAgdGhpcy5jaGFydC5hcHBlbmQoJ3VsJykuYXR0cignY2xhc3MnLCBgbGVnZW5kIGxlZ2VuZC0ke3RoaXMubGVnZW5kUG9zaXRpb259YCk7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVDaGFydCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmRhdGEgJiYgIWNoYW5nZXMuZGF0YS5maXJzdENoYW5nZSkge1xuICAgICAgdGhpcy51cGRhdGVDaGFydCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnRvb2x0aXApIHRoaXMudG9vbHRpcC5yZW1vdmUoKTtcbiAgfVxuXG4gIHVwZGF0ZUNoYXJ0ID0gKCkgPT4ge1xuICAgIHRoaXMubW91c2VyZWN0LmRhdGEodGhpcy5kYXRhKTtcblxuICAgIC8vIHVwZGF0ZSB0aGUgeFNjYWxlXG4gICAgdGhpcy54QXhpc1NjYWxlLmRvbWFpbihcbiAgICAgIGQzX2V4dGVudCh0aGlzLmRhdGEuZGF0ZXMsIChkOiBhbnksIGkpID0+IHtcbiAgICAgICAgcmV0dXJuIGQzX2lzb1BhcnNlKGQpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgLy8gdXBkYXRlIHRoZSB5U2NhbGVcbiAgICB0aGlzLnlBeGlzU2NhbGVcbiAgICAgIC5kb21haW4oW1xuICAgICAgICBkM19taW4odGhpcy5kYXRhLnNlcmllcywgKGQ6IGFueSwgaSkgPT4ge1xuICAgICAgICAgIHJldHVybiArZDNfbWluKGQudmFsdWVzKTtcbiAgICAgICAgfSksXG4gICAgICAgIGQzX21heCh0aGlzLmRhdGEuc2VyaWVzLCAoZDogYW55LCBpKSA9PiB7XG4gICAgICAgICAgcmV0dXJuICtkM19tYXgoZC52YWx1ZXMpO1xuICAgICAgICB9KVxuICAgICAgXSlcbiAgICAgIC5uaWNlKCk7XG5cbiAgICB0aGlzLnhBeGlzXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgIC5jYWxsKHRoaXMueEF4aXNDYWxsKTtcblxuICAgIHRoaXMueUF4aXNcbiAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgIC5kdXJhdGlvbigxMDAwKVxuICAgICAgLmNhbGwodGhpcy55QXhpc0NhbGwpO1xuXG4gICAgLy8gdXBkYXRlIHRoZSBncmlkc1xuICAgIGlmICghdGhpcy5oaWRlWEdyaWQpIHtcbiAgICAgIHRoaXMueEdyaWRcbiAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgICAgLmNhbGwodGhpcy54R3JpZENhbGwpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5oaWRlWUdyaWQpIHtcbiAgICAgIHRoaXMueUdyaWRcbiAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgICAgLmNhbGwodGhpcy55R3JpZENhbGwpO1xuICAgIH1cblxuICAgIGxldCBncm91cCA9IHRoaXMuc3ZnLnNlbGVjdEFsbCgnLmxpbmUtZ3JvdXAnKS5kYXRhKHRoaXMuZGF0YS5zZXJpZXMpO1xuXG4gICAgLy8gcmVtb3ZlIGxpbmVzXG4gICAgZ3JvdXAuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgLy8gdXBkYXRlIGV4aXN0aW5nXG4gICAgZ3JvdXBcbiAgICAgIC5zZWxlY3QoJ3BhdGgubGluZScpXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgIC5hdHRyKCdkJywgZCA9PiB0aGlzLmQzbGluZShkLnZhbHVlcykpO1xuXG4gICAgaWYgKHRoaXMuYXJlYSkge1xuICAgICAgZ3JvdXBcbiAgICAgICAgLnNlbGVjdCgncGF0aC5hcmVhJylcbiAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgICAgLmF0dHIoJ2QnLCBkID0+IHRoaXMuZDNhcmVhKGQudmFsdWVzKSk7XG4gICAgfVxuXG4gICAgZ3JvdXBcbiAgICAgIC5zZWxlY3RBbGwoJ2NpcmNsZScpXG4gICAgICAuZGF0YShkID0+IGQudmFsdWVzKVxuICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgLmR1cmF0aW9uKDEwMDApXG4gICAgICAuYXR0cignY3gnLCAoZCwgaSkgPT4gdGhpcy54QXhpc1NjYWxlKGQzX2lzb1BhcnNlKHRoaXMuZGF0YS5kYXRlc1tpXSkpKVxuICAgICAgLmF0dHIoJ2N5JywgZCA9PiB0aGlzLnlBeGlzU2NhbGUoZCkpO1xuXG4gICAgLy8gYWRkIGdyb3VwIG9uIGVudGVyXG4gICAgY29uc3QgZ3JvdXBFbnRlciA9IGdyb3VwXG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAuYXR0cignY2xhc3MnLCAnbGluZS1ncm91cCcpO1xuXG4gICAgLy8gYWRkIGxpbmUgb24gZW50ZXJcbiAgICBjb25zdCBsaW5lID0gZ3JvdXBFbnRlclxuICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAuYXR0cignY2xhc3MnLCAnbGluZScpXG4gICAgICAuc3R5bGUoJ2NvbG9yJywgZCA9PiB0aGlzLmNvbG9yUmFuZ2UoZC5sYWJlbCkpXG4gICAgICAuc3R5bGUoJ3N0cm9rZS13aWR0aCcsIHRoaXMubGluZVdpZHRoKVxuICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgLmR1cmF0aW9uKDEwMDApXG4gICAgICAuYXR0cignZCcsIGRhdGEgPT4gdGhpcy5kM2xpbmUoZGF0YS52YWx1ZXMpKTtcblxuICAgIGlmICh0aGlzLmFyZWEpIHtcbiAgICAgIGdyb3VwRW50ZXJcbiAgICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdhcmVhJylcbiAgICAgICAgLmF0dHIoJ2QnLCBkYXRhID0+IHRoaXMuZDNhcmVhKGRhdGEudmFsdWVzKSlcbiAgICAgICAgLnN0eWxlKCdjb2xvcicsIGQgPT4gdGhpcy5jb2xvclJhbmdlKGQubGFiZWwpKTtcbiAgICB9XG5cbiAgICAvLyBhZGQgcG9pbnRzXG4gICAgaWYgKHRoaXMubGluZVBvaW50cykge1xuICAgICAgY29uc3QgcG9pbnRzID0gZ3JvdXBFbnRlclxuICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BvaW50cycpXG4gICAgICAgIC5zdHlsZSgnY29sb3InLCBkID0+IHRoaXMuY29sb3JSYW5nZShkLmxhYmVsKSk7XG5cbiAgICAgIGNvbnN0IGNpcmNsZXMgPSBwb2ludHMuc2VsZWN0QWxsKCdjaXJjbGUnKS5kYXRhKGQgPT4gZC52YWx1ZXMpO1xuXG4gICAgICBjaXJjbGVzXG4gICAgICAgIC5lbnRlcigpXG4gICAgICAgIC5hcHBlbmQoJ2NpcmNsZScpXG4gICAgICAgIC5hdHRyKCdjeCcsIChkLCBpKSA9PiB0aGlzLnhBeGlzU2NhbGUoZDNfaXNvUGFyc2UodGhpcy5kYXRhLmRhdGVzW2ldKSkpXG4gICAgICAgIC5hdHRyKCdjeScsIGQgPT4gdGhpcy55QXhpc1NjYWxlKGQpKVxuICAgICAgICAuYXR0cigncicsIHRoaXMubGluZVdpZHRoICogMilcbiAgICAgICAgLnN0eWxlKCdzdHJva2Utd2lkdGgnLCB0aGlzLmxpbmVXaWR0aCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudHlwZSAhPT0gJ2hpZ2gnKSB7XG4gICAgICBsaW5lLmF0dHIoJ2ZpbHRlcicsICd1cmwoI2dsb3cpJyk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmhpZGVMZWdlbmQpIHtcbiAgICAgIGxldCBsZWdlbmRJdGVtID0gdGhpcy5jaGFydFxuICAgICAgICAuc2VsZWN0KCcubGVnZW5kJylcbiAgICAgICAgLnNlbGVjdEFsbCgnLmxlZ2VuZC1pdGVtJylcbiAgICAgICAgLmRhdGEodGhpcy5kYXRhLnNlcmllcyk7XG5cbiAgICAgIGxlZ2VuZEl0ZW0uZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgICAvLyB1cGRhdGUgZXhpc3RpbmcgaXRlbXNcbiAgICAgIGxlZ2VuZEl0ZW0uc2VsZWN0KCcubGVnZW5kLWxhYmVsJykuaHRtbChkID0+IHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmxlZ2VuZExhYmVsRm9ybWF0VHlwZSkge1xuICAgICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sZWdlbmRMYWJlbEZvcm1hdChkLmxhYmVsKTtcblxuICAgICAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgICAgICAgY29uc3QgcGFyc2VkVGltZSA9IGQzX2lzb1BhcnNlKGQubGFiZWwpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGVnZW5kTGFiZWxGb3JtYXQocGFyc2VkVGltZSk7XG5cbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIGQubGFiZWw7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBsZWdlbmQgaXRlbXMgb24gZW50ZXJcbiAgICAgIGxldCBlbnRlckxlZ2VuZEl0ZW0gPSBsZWdlbmRJdGVtXG4gICAgICAgIC5lbnRlcigpXG4gICAgICAgIC5hcHBlbmQoJ2xpJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xlZ2VuZC1pdGVtJyk7XG5cbiAgICAgIGVudGVyTGVnZW5kSXRlbVxuICAgICAgICAuYXBwZW5kKCdzcGFuJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xlZ2VuZC1rZXknKVxuICAgICAgICAuc3R5bGUoJ2JhY2tncm91bmQtY29sb3InLCBkID0+IHRoaXMuY29sb3JSYW5nZShkLmxhYmVsKSk7XG5cbiAgICAgIGVudGVyTGVnZW5kSXRlbVxuICAgICAgICAuYXBwZW5kKCdzcGFuJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xlZ2VuZC1sYWJlbCcpXG4gICAgICAgIC5odG1sKGQgPT4ge1xuICAgICAgICAgIHN3aXRjaCAodGhpcy5sZWdlbmRMYWJlbEZvcm1hdFR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLmxlZ2VuZExhYmVsRm9ybWF0KGQubGFiZWwpO1xuXG4gICAgICAgICAgICBjYXNlICd0aW1lJzpcbiAgICAgICAgICAgICAgY29uc3QgcGFyc2VkVGltZSA9IGQzX2lzb1BhcnNlKGQubGFiZWwpO1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sZWdlbmRMYWJlbEZvcm1hdChwYXJzZWRUaW1lKTtcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuIGQubGFiZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgZW50ZXJMZWdlbmRJdGVtXG4gICAgICAgIC5vbignbW91c2VvdmVyJywgKGRhdGEsIGluZGV4LCBub2RlcykgPT4gdGhpcy5sZWdlbmRNb3VzZU92ZXIoZDNfZXZlbnQsIGRhdGEsIGluZGV4LCBub2RlcykpXG4gICAgICAgIC5vbignbW91c2VvdXQnLCAoKSA9PiB0aGlzLmxlZ2VuZE1vdXNlT3V0KCkpXG4gICAgICAgIC5vbignY2xpY2snLCAoZGF0YSwgaW5kZXgsIG5vZGVzKSA9PiB0aGlzLmxlZ2VuZE1vdXNlQ2xpY2soZDNfZXZlbnQsIGRhdGEsIGluZGV4LCBub2RlcykpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5oaWRlVG9vbHRpcCkge1xuICAgICAgbGV0IHRvb2x0aXBJdGVtID0gdGhpcy50b29sdGlwXG4gICAgICAgIC5zZWxlY3QoJy50b29sdGlwLXRhYmxlJylcbiAgICAgICAgLnNlbGVjdEFsbCgndHInKVxuICAgICAgICAuZGF0YSh0aGlzLmRhdGEuc2VyaWVzKTtcblxuICAgICAgdG9vbHRpcEl0ZW0uZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgICAvLyB1cGRhdGUgZXhpc3RpbmcgaXRlbXNcbiAgICAgIHRvb2x0aXBJdGVtLnNlbGVjdCgnLnRvb2x0aXAtbGFiZWwgcHItMicpLmh0bWwoZCA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnRvb2x0aXBIZWFkaW5nRm9ybWF0KGQubGFiZWwpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIGl0ZW1zIG9uIGVudGVyXG4gICAgICBsZXQgZW50ZXJ0b29sdGlwSXRlbSA9IHRvb2x0aXBJdGVtXG4gICAgICAgIC5lbnRlcigpXG4gICAgICAgIC5hcHBlbmQoJ3RyJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Rvb2x0aXAtaXRlbScpO1xuXG4gICAgICBlbnRlcnRvb2x0aXBJdGVtXG4gICAgICAgIC5hcHBlbmQoJ3RkJylcbiAgICAgICAgLnN0eWxlKCdjb2xvcicsIGQgPT4gdGhpcy5jb2xvclJhbmdlKGQubGFiZWwpKVxuICAgICAgICAuYXBwZW5kKCdzcGFuJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BiZHMtdG9vbHRpcC1rZXknKTtcblxuICAgICAgZW50ZXJ0b29sdGlwSXRlbVxuICAgICAgICAuYXBwZW5kKCd0ZCcpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICd0b29sdGlwLWxhYmVsIHByLTInKVxuICAgICAgICAuaHRtbChkID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy50b29sdGlwTGFiZWxGb3JtYXRUeXBlID8gdGhpcy50b29sdGlwTGFiZWxGb3JtYXQoZC5sYWJlbCkgOiBkLmxhYmVsO1xuICAgICAgICB9KTtcblxuICAgICAgZW50ZXJ0b29sdGlwSXRlbVxuICAgICAgICAuYXBwZW5kKCd0ZCcpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICd0b29sdGlwLXZhbHVlIHRleHQtcmlnaHQnKVxuICAgICAgICAuaHRtbChkID0+ICcnKTtcbiAgICB9XG5cbiAgICB0aGlzLm1vdXNlcmVjdC5yYWlzZSgpO1xuICB9O1xuXG4gIGxlZ2VuZE1vdXNlT3ZlciA9IChldmVudCwgZGF0YSwgaW5kZXgsIG5vZGVzKSA9PiB7XG4gICAgdGhpcy5jaGFydFxuICAgICAgLnNlbGVjdEFsbCgnLmxlZ2VuZC1pdGVtJylcbiAgICAgIC5maWx0ZXIoKGQsIGkpID0+IGkgIT09IGluZGV4KVxuICAgICAgLmNsYXNzZWQoJ2luYWN0aXZlJywgdHJ1ZSk7XG5cbiAgICB0aGlzLmNoYXJ0XG4gICAgICAuc2VsZWN0QWxsKCcubGluZS1ncm91cCcpXG4gICAgICAuZmlsdGVyKChkLCBpKSA9PiBpICE9PSBpbmRleClcbiAgICAgIC5jbGFzc2VkKCdpbmFjdGl2ZScsIHRydWUpO1xuXG4gICAgY29uc3QgbGluZSA9IHRoaXMuY2hhcnQuc2VsZWN0QWxsKCcubGluZS1ncm91cCcpLmZpbHRlcigoZCwgaSkgPT4gaSA9PT0gaW5kZXgpO1xuICAgIGxpbmUuY2xhc3NlZCgnYWN0aXZlJywgdHJ1ZSk7XG5cbiAgICBpZiAodGhpcy5saW5lUG9pbnRzKSB7XG4gICAgICBjb25zdCBjaXJjbGVzID0gbGluZS5zZWxlY3RBbGwoJ2NpcmNsZScpO1xuICAgICAgY2lyY2xlcy5jbGFzc2VkKCdhY3RpdmUnLCB0cnVlKTtcbiAgICB9XG5cbiAgICB0aGlzLmhvdmVyZWQuZW1pdCh7IGV2ZW50LCBkYXRhIH0pO1xuICB9O1xuXG4gIGxlZ2VuZE1vdXNlT3V0ID0gKCkgPT4ge1xuICAgIHRoaXMuY2hhcnQuc2VsZWN0QWxsKCcubGVnZW5kLWl0ZW0nKS5jbGFzc2VkKCdpbmFjdGl2ZScsIGZhbHNlKTtcblxuICAgIHRoaXMuY2hhcnRcbiAgICAgIC5zZWxlY3RBbGwoJy5saW5lLWdyb3VwJylcbiAgICAgIC5jbGFzc2VkKCdpbmFjdGl2ZScsIGZhbHNlKVxuICAgICAgLmNsYXNzZWQoJ2FjdGl2ZScsIGZhbHNlKTtcblxuICAgIGlmICh0aGlzLmxpbmVQb2ludHMpIHtcbiAgICAgIGNvbnN0IGNpcmNsZXMgPSB0aGlzLmNoYXJ0LnNlbGVjdEFsbCgnY2lyY2xlJyk7XG4gICAgICBjaXJjbGVzLmNsYXNzZWQoJ2FjdGl2ZScsIGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgbGVnZW5kTW91c2VDbGljayA9IChldmVudCwgZGF0YSwgaW5kZXgsIG5vZGVzKSA9PiB7XG4gICAgdGhpcy5jbGlja2VkLmVtaXQoeyBldmVudCwgZGF0YSB9KTtcbiAgfTtcblxuICBtb3VzZXJlY3RNb3VzZU1vdmUgPSAoZXZlbnQsIGluZGV4LCBub2RlcykgPT4ge1xuICAgIGNvbnN0IG1vdXNlWERhdGUgPSB0aGlzLnhBeGlzU2NhbGUuaW52ZXJ0KGQzX21vdXNlKG5vZGVzWzBdKVswXSk7IC8vIHJldHVybiBkYXRlIGF0IG1vdXNlIHggcG9zaXRpb25cbiAgICBjb25zdCBsZWZ0SW5kZXggPSBkM19iaXNlY3RMZWZ0KHRoaXMuZGF0YS5kYXRlcywgZDNfaXNvRm9ybWF0KG1vdXNlWERhdGUpKTsgLy8gaW5kZXggb2YgbGVmdCBjbG9zZXN0IGRhdGVcblxuICAgIC8vIHByZXZlbnQgZXJyb3IgZm9yIDAgaW5kZXhcbiAgICBpZiAobGVmdEluZGV4ID09PSAwKSByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCBkYXRlTG93ZXIgPSBuZXcgRGF0ZSh0aGlzLmRhdGEuZGF0ZXNbbGVmdEluZGV4IC0gMV0pO1xuICAgIGNvbnN0IGRhdGVVcHBlciA9IG5ldyBEYXRlKHRoaXMuZGF0YS5kYXRlc1tsZWZ0SW5kZXhdKTtcbiAgICBjb25zdCBjbG9zZXN0RGF0ZSA9ICttb3VzZVhEYXRlIC0gK2RhdGVMb3dlciA+ICtkYXRlVXBwZXIgLSBtb3VzZVhEYXRlID8gZGF0ZVVwcGVyIDogZGF0ZUxvd2VyOyAvLyBkYXRlIG1vdXNlIGlzIGNsb3Nlc3QgdG9cbiAgICBjb25zdCBjbG9zZXN0SW5kZXggPSB0aGlzLmRhdGEuZGF0ZXMuaW5kZXhPZihkM19pc29Gb3JtYXQoY2xvc2VzdERhdGUpKTsgLy8gd2hpY2ggaW5kZXggdGhlIG1vdXNlIGlzIGNsb3Nlc3QgdG9cbiAgICAvLyBjb25zb2xlLmxvZygrbW91c2VYRGF0ZSwgbGVmdEluZGV4LCArZGF0ZUxvd2VyLCArZGF0ZVVwcGVyLCArY2xvc2VzdERhdGUsIGNsb3Nlc3RJbmRleCk7XG5cbiAgICBjb25zdCBjaXJjbGVzID0gdGhpcy5zdmcuc2VsZWN0QWxsKCcubGluZS1ncm91cCcpLnNlbGVjdEFsbCgnY2lyY2xlJyk7XG4gICAgY2lyY2xlcy5maWx0ZXIoKGQsIGkpID0+IGkgPT09IGNsb3Nlc3RJbmRleCkuY2xhc3NlZCgnYWN0aXZlJywgdHJ1ZSk7XG4gICAgY2lyY2xlcy5maWx0ZXIoKGQsIGkpID0+IGkgIT09IGNsb3Nlc3RJbmRleCkuY2xhc3NlZCgnYWN0aXZlJywgZmFsc2UpO1xuXG4gICAgdGhpcy50b29sdGlwTGluZVxuICAgICAgLmF0dHIoJ3gxJywgdGhpcy54QXhpc1NjYWxlKGNsb3Nlc3REYXRlKSlcbiAgICAgIC5hdHRyKCd4MicsIHRoaXMueEF4aXNTY2FsZShjbG9zZXN0RGF0ZSkpXG4gICAgICAuY2xhc3NlZCgnYWN0aXZlJywgdHJ1ZSk7XG5cbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnRvb2x0aXBMaW5lLm5vZGUoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSwgdGhpcy5fc2Nyb2xsLmdldFNjcm9sbFBvc2l0aW9uKCkpO1xuICAgIHRoaXMudG9vbHRpcFNob3codGhpcy50b29sdGlwTGluZS5ub2RlKCksIGNsb3Nlc3RJbmRleCk7XG5cbiAgICB0aGlzLm1vdXNlZGF0YSA9IHtcbiAgICAgIGRhdGU6IGNsb3Nlc3REYXRlLFxuICAgICAgc2VyaWVzOiB0aGlzLmRhdGEuc2VyaWVzLm1hcChkID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBsYWJlbDogZC5sYWJlbCxcbiAgICAgICAgICB2YWx1ZTogZC52YWx1ZXNbY2xvc2VzdEluZGV4XVxuICAgICAgICB9O1xuICAgICAgfSlcbiAgICB9O1xuXG4gICAgdGhpcy50b29sdGlwSG92ZXJlZC5lbWl0KHsgZXZlbnQsIGRhdGE6IHRoaXMubW91c2VkYXRhIH0pO1xuICB9O1xuXG4gIG1vdXNlcmVjdE1vdXNlT3V0ID0gKGV2ZW50LCBpbmRleCwgbm9kZXMpID0+IHtcbiAgICB0aGlzLnN2Zy5zZWxlY3RBbGwoJ2NpcmNsZScpLmNsYXNzZWQoJ2FjdGl2ZScsIGZhbHNlKTtcbiAgICB0aGlzLnRvb2x0aXBMaW5lLmNsYXNzZWQoJ2FjdGl2ZScsIGZhbHNlKTtcbiAgICB0aGlzLnRvb2x0aXBIaWRlKCk7XG4gIH07XG5cbiAgbW91c2VyZWN0TW91c2VDbGljayA9ICgpID0+IHtcbiAgICB0aGlzLnRvb2x0aXBDbGlja2VkLmVtaXQoeyBldmVudCwgZGF0YTogdGhpcy5tb3VzZWRhdGEgfSk7XG4gIH07XG5cbiAgcHJpdmF0ZSB0b29sdGlwU2hvdyA9IChub2RlLCBjbG9zZXN0SW5kZXgpID0+IHtcbiAgICBsZXQgc2Nyb2xsID0gdGhpcy5fc2Nyb2xsLmdldFNjcm9sbFBvc2l0aW9uKCk7XG4gICAgbGV0IGRpbWVuc2lvbnMgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgdGhpcy50b29sdGlwLnNlbGVjdCgnLnRvb2x0aXAtaGVhZGVyJykuaHRtbChkID0+IHtcbiAgICAgIGNvbnN0IHBhcnNlZFRpbWUgPSBkM19pc29QYXJzZSh0aGlzLmRhdGEuZGF0ZXNbY2xvc2VzdEluZGV4XSk7XG4gICAgICByZXR1cm4gdGhpcy50b29sdGlwSGVhZGluZ0Zvcm1hdChwYXJzZWRUaW1lKTtcbiAgICB9KTtcblxuICAgIHRoaXMudG9vbHRpcC5zZWxlY3RBbGwoJy50b29sdGlwLXZhbHVlJykuaHRtbCgoZCwgaSkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMudG9vbHRpcFZhbHVlRm9ybWF0VHlwZVxuICAgICAgICA/IHRoaXMudG9vbHRpcFZhbHVlRm9ybWF0KHRoaXMuZGF0YS5zZXJpZXNbaV0udmFsdWVzW2Nsb3Nlc3RJbmRleF0pXG4gICAgICAgIDogdGhpcy5kYXRhLnNlcmllc1tpXS52YWx1ZXNbY2xvc2VzdEluZGV4XTtcbiAgICB9KTtcblxuICAgIGxldCB0b29sdGlwT2Zmc2V0SGVpZ2h0ID0gK3RoaXMudG9vbHRpcC5ub2RlKCkub2Zmc2V0SGVpZ2h0O1xuXG4gICAgdGhpcy50b29sdGlwLnN0eWxlKCd0b3AnLCBgJHtkaW1lbnNpb25zLnkgKyBkaW1lbnNpb25zLmhlaWdodCAvIDIgLSB0b29sdGlwT2Zmc2V0SGVpZ2h0IC8gMiArIHNjcm9sbFsxXX1weGApO1xuICAgIHRoaXMudG9vbHRpcC5zdHlsZSgnbGVmdCcsIGAke2RpbWVuc2lvbnMueCArIDh9cHhgKTtcbiAgICB0aGlzLnRvb2x0aXAuc3R5bGUoJ29wYWNpdHknLCAxKTtcbiAgfTtcblxuICBwcml2YXRlIHRvb2x0aXBIaWRlID0gKCkgPT4ge1xuICAgIHRoaXMudG9vbHRpcC5zdHlsZSgnb3BhY2l0eScsIDApO1xuICB9O1xuXG4gIHByaXZhdGUgeEF4aXNGb3JtYXR0ZXIgPSBpdGVtID0+IHtcbiAgICBjb25zdCBwYXJzZURhdGUgPSBkM19pc29QYXJzZShpdGVtKTtcbiAgICByZXR1cm4gdGhpcy54QXhpc0Zvcm1hdChwYXJzZURhdGUpO1xuICB9O1xuXG4gIHByaXZhdGUgeUF4aXNGb3JtYXR0ZXIgPSBpdGVtID0+IHtcbiAgICByZXR1cm4gdGhpcy55QXhpc0Zvcm1hdChpdGVtKTtcbiAgfTtcbn1cbiJdfQ==