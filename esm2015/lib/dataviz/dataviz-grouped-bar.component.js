/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ElementRef, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { ViewportScroller, Location } from '@angular/common';
import { select as d3_select, isoParse as d3_isoParse, timeFormat as d3_timeFormat, format as d3_format, scaleOrdinal as d3_scaleOrdinal, scaleBand as d3_scaleBand, scaleLinear as d3_scaleLinear, max as d3_max, axisBottom as d3_axisBottom, axisLeft as d3_axisLeft, event as d3_event, values as d3_values } from 'd3';
import { PbdsDatavizService } from './dataviz.service';
export class PbdsDatavizGroupedBarComponent {
    /**
     * @param {?} _dataviz
     * @param {?} _element
     * @param {?} _scroll
     * @param {?} _location
     */
    constructor(_dataviz, _element, _scroll, _location) {
        this._dataviz = _dataviz;
        this._element = _element;
        this._scroll = _scroll;
        this._location = _location;
        this.chartClass = true;
        this.groupedBarClass = true;
        this.width = 306;
        this.height = 400;
        this.vertical = true;
        this.hideXAxis = false;
        this.xAxisMaxBuffer = 0.01;
        this.xAxisFormatType = null;
        this.xAxisFormatString = '';
        this.xAxisTicks = 5;
        this.hideYAxis = false;
        this.yAxisMaxBuffer = 0.01;
        this.yAxisFormatType = null;
        this.yAxisFormatString = '';
        this.yAxisTicks = 5;
        this.marginTop = 10;
        this.marginRight = this.vertical ? 0 : 55;
        this.marginBottom = 30;
        this.marginLeft = 55;
        this.hideLegend = false;
        this.legendWidth = 105 + 28; // hardcoded legend width + left margin, do not document until feedback
        // hardcoded legend width + left margin, do not document until feedback
        this.legendPosition = 'right';
        this.legendLabelFormatType = null;
        this.legendLabelFormatString = '';
        this.hideTooltip = false;
        this.tooltipLabelFormatType = null;
        this.tooltipLabelFormatString = '';
        this.tooltipValueFormatType = null;
        this.tooltipValueFormatString = '';
        this.showGrid = false;
        this.theme = 'classic';
        this.hovered = new EventEmitter();
        this.clicked = new EventEmitter();
        this.barMouseOver = (/**
         * @param {?} event
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (event, data, index, nodes) => {
            /** @type {?} */
            const node = d3_select(nodes[index]);
            this.chart
                .selectAll('.bar-group')
                .selectAll('.bar')
                .classed('inactive', true);
            node.classed('inactive', false).style('fill', node.attr('data-color'));
            this.tooltipShow(data, nodes[index]);
            this.hovered.emit({ event, data });
        });
        this.barMouseOut = (/**
         * @return {?}
         */
        () => {
            this.chart
                .selectAll('.bar')
                .classed('inactive', false)
                .style('fill', null);
            this.tooltipHide();
        });
        this.barMouseClick = (/**
         * @param {?} event
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (event, data, index, nodes) => {
            this.clicked.emit({ event, data });
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
                .selectAll('.bar-group')
                .selectAll('.bar')
                .filter((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => i !== index))
                .classed('inactive', true);
            /** @type {?} */
            const bar = this.chart
                .selectAll('.bar-group')
                .selectAll('.bar')
                .filter((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => i === index))
                .classed('inactive', null);
            /** @type {?} */
            const barColor = bar.attr('data-color');
            bar.style('fill', (/**
             * @return {?}
             */
            () => barColor));
            this.hovered.emit({ event, data });
        });
        this.legendMouseOut = (/**
         * @return {?}
         */
        () => {
            this.chart.selectAll('.legend-item').classed('inactive', false);
            this.chart
                .selectAll('.bar-group')
                .selectAll('.bar')
                .classed('inactive', false)
                .style('fill', null);
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
        this.tooltipShow = (/**
         * @param {?} data
         * @param {?} node
         * @return {?}
         */
        (data, node) => {
            /** @type {?} */
            const dimensions = node.getBoundingClientRect();
            /** @type {?} */
            const scroll = this._scroll.getScrollPosition();
            /** @type {?} */
            let label;
            switch (this.tooltipLabelFormatType) {
                case 'number':
                    label = this.tooltipLabelFormat(data.label);
                    break;
                case 'time':
                    /** @type {?} */
                    const parsedTime = d3_isoParse(data.label);
                    label = this.tooltipLabelFormat(parsedTime);
                    break;
                default:
                    label = data.label;
            }
            /** @type {?} */
            const value = this.tooltipValueFormat === null
                ? `<div class="tooltip-value">${data.value}</div>`
                : `<div class="tooltip-value">${this.tooltipValueFormat(data.value)}</div>`;
            this.tooltip.html(`
        ${label}
        ${value}
      `);
            /** @type {?} */
            const tooltipOffsetWidth = +this.tooltip.node().offsetWidth / 2;
            /** @type {?} */
            const tooltipOffsetHeight = +this.tooltip.node().offsetHeight;
            /** @type {?} */
            const tooltipTipSize = 8;
            if (this.vertical) {
                this.tooltip.style('top', `${+scroll[1] + +dimensions.top - tooltipOffsetHeight - tooltipTipSize}px`);
                this.tooltip.style('left', `${+scroll[0] + +dimensions.left - tooltipOffsetWidth + +dimensions.width / 2}px`);
            }
            else {
                this.tooltip.style('top', `${+scroll[1] + +dimensions.top + +dimensions.height / 2 - tooltipOffsetHeight / 2}px`);
                this.tooltip.style('left', `${+scroll[0] + +dimensions.right + tooltipTipSize}px`);
            }
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
            switch (this.xAxisFormatType) {
                case 'number':
                    return this.xAxisFormat(item);
                case 'time':
                    /** @type {?} */
                    const parseDate = d3_isoParse(item);
                    return this.xAxisFormat(parseDate);
                default:
                    return item;
            }
        });
        this.yAxisFormatter = (/**
         * @param {?} item
         * @return {?}
         */
        item => {
            switch (this.yAxisFormatType) {
                case 'number':
                    return this.yAxisFormat(item);
                case 'time':
                    /** @type {?} */
                    const parseDate = d3_isoParse(item);
                    return this.yAxisFormat(parseDate);
                default:
                    return item;
            }
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
        switch (this.xAxisFormatType) {
            case 'number':
                this.xAxisFormat = d3_format(this.xAxisFormatString);
                break;
            case 'time':
                this.xAxisFormat = d3_timeFormat(this.xAxisFormatString);
                break;
        }
        switch (this.yAxisFormatType) {
            case 'number':
                this.yAxisFormat = d3_format(this.yAxisFormatString);
                break;
            case 'time':
                this.yAxisFormat = d3_timeFormat(this.yAxisFormatString);
                break;
        }
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
        switch (this.tooltipLabelFormatType) {
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
            default:
                this.tooltipValueFormat = null;
        }
        // defaults for all chart types
        this.hideGrayBars = false;
        this.hideXAxisZero = false;
        this.hideXAxisDomain = false;
        this.hideXAxisTicks = true;
        this.xAxisTickSize = 8;
        this.xAxisTickSizeOuter = 0;
        this.hideYAxisZero = false;
        this.hideYAxisDomain = false;
        this.hideYAxisTicks = true;
        this.yAxisTickSize = 8;
        this.yAxisTickSizeOuter = 0;
        if (!this.hideLegend && this.legendPosition === 'right') {
            this.width = +this.width - +this.legendWidth;
        }
        // create the chart
        this.chart = d3_select(this._element.nativeElement).attr('aria-hidden', 'true');
        // create chart svg
        this.svg = this.chart
            .append('svg')
            .attr('width', (/**
         * @return {?}
         */
        () => {
            if (this.vertical) {
                return +this.width;
            }
            else {
                return +this.width + this.margin.left + this.margin.right;
            }
        }))
            .attr('height', +this.height + this.margin.top + this.margin.bottom)
            .attr('class', 'img-fluid')
            .attr('preserveAspectRatio', 'xMinYMin meet')
            .attr('viewBox', (/**
         * @return {?}
         */
        () => {
            if (this.vertical) {
                return `-${this.margin.left} -${this.margin.top} ${+this.width} ${+this.height +
                    this.margin.top +
                    this.margin.bottom}`;
            }
            else {
                return `-${this.margin.left} -${this.margin.top} ${+this.width + this.margin.left + this.margin.right} ${+this
                    .height +
                    this.margin.top +
                    this.margin.bottom}`;
            }
        }));
        // TOOLTIP
        if (!this.hideTooltip) {
            this.tooltip = d3_select('body')
                .append('div')
                .attr('class', (/**
             * @return {?}
             */
            () => {
                return this.vertical ? 'pbds-tooltip south' : 'pbds-tooltip west';
            }))
                .style('opacity', 0)
                .attr('aria-hidden', 'true'); // hide tooltip for accessibility
        }
        // add legend classes
        if (!this.hideLegend) {
            this.chart.classed('pbds-chart-legend-bottom', this.legendPosition === 'bottom' ? true : false);
            this.chart.append('ul').attr('class', `legend legend-${this.legendPosition}`);
        }
        // build color ranges
        this.colorRange = d3_scaleOrdinal().range(this._dataviz.createGradientDefs(this.svg, false, this.theme, this.vertical));
        if (this.vertical) {
            // X AXIS
            this.xAxisScale = d3_scaleBand()
                .domain(this.data.map((/**
             * @param {?} d
             * @return {?}
             */
            d => d.key)))
                .rangeRound([0, this.width - this.margin.left])
                .align(0);
            // add padding to the scale for gray bars
            !this.hideGrayBars
                ? this.xAxisScale.paddingInner(0.1).paddingOuter(0)
                : this.xAxisScale.paddingInner(0).paddingOuter(0);
            this.xAxisCall = d3_axisBottom(this.xAxisScale)
                .tickSize(this.xAxisTickSize)
                .tickSizeOuter(this.xAxisTickSizeOuter)
                .tickFormat(this.xAxisFormatter);
            this.xAxis = this.svg
                .append('g')
                .attr('class', 'axis axis-x')
                .attr('transform', `translate(0, ${this.height})`)
                .classed('axis-hidden', this.hideXAxis)
                .classed('axis-zero-hidden', this.hideXAxisZero)
                .classed('axis-domain-hidden', this.hideXAxisDomain)
                .classed('axis-ticks-hidden', this.hideXAxisTicks)
                .call(this.xAxisCall);
            // X GRIDLINES
            // if (!this.hideXGrid) {
            //   this.xGridCall = d3_axisBottom(this.xAxisScale).tickSize(-this.height);
            //   this.xGrid = this.svg
            //     .append('g')
            //     .attr('class', 'grid grid-x')
            //     .classed('grid-zero-hidden', this.hideXAxisZero)
            //     .attr('transform', `translate(0, ${this.height})`)
            //     .call(this.xGridCall);
            // }
            // Y AXIS
            this.yAxisMax = d3_max(this.data, (/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                /** @type {?} */
                const clone = Object.assign({}, data);
                delete clone.key;
                return d3_max(d3_values(clone));
            }));
            this.yAxisMax = this.yAxisMax + this.yAxisMax * this.yAxisMaxBuffer;
            this.yAxisScale = d3_scaleLinear()
                .domain([0, this.yAxisMax])
                .nice()
                .rangeRound([this.height, 0]);
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
            if (this.showGrid) {
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
            // color bar scale
            this.barScale = d3_scaleBand()
                .domain(Object.keys(this.data[0]).slice(1))
                .rangeRound([0, this.xAxisScale.bandwidth()])
                .paddingInner(0.1)
                .paddingOuter(0.5);
            this.updateChartVertical();
        }
        else {
            // X AXIS
            this.xAxisMax = d3_max(this.data, (/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                /** @type {?} */
                const clone = Object.assign({}, data);
                delete clone.key;
                return d3_max(d3_values(clone));
            }));
            this.xAxisMax = this.xAxisMax + this.xAxisMax * this.xAxisMaxBuffer;
            this.xAxisScale = d3_scaleLinear()
                .domain([0, this.xAxisMax])
                .rangeRound([0, this.width])
                .nice();
            this.xAxisCall = d3_axisBottom(this.xAxisScale)
                .ticks(this.xAxisTicks)
                .tickSize(this.xAxisTickSize)
                .tickSizeOuter(this.xAxisTickSizeOuter)
                .tickFormat(this.xAxisFormatter);
            this.xAxis = this.svg
                .append('g')
                .attr('class', 'axis axis-x')
                .attr('transform', `translate(0, ${this.height})`)
                .classed('axis-hidden', this.hideXAxis)
                .classed('axis-zero-hidden', this.hideXAxisZero)
                .classed('axis-domain-hidden', this.hideXAxisDomain)
                .classed('axis-ticks-hidden', this.hideXAxisTicks)
                .call(this.xAxisCall);
            // Y AXIS
            this.yAxisScale = d3_scaleBand()
                .domain(this.data.map((/**
             * @param {?} d
             * @return {?}
             */
            d => d.key)))
                .rangeRound([0, this.height])
                .align(1);
            // add padding to the scale for gray bars
            !this.hideGrayBars
                ? this.yAxisScale.paddingInner(0.1).paddingOuter(0)
                : this.yAxisScale.paddingInner(0).paddingOuter(0);
            this.yAxisCall = d3_axisLeft(this.yAxisScale)
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
            // X GRIDLINES
            if (this.showGrid) {
                this.xGridCall = d3_axisBottom(this.xAxisScale).tickSize(-this.height);
                this.xGrid = this.svg
                    .append('g')
                    .attr('class', 'grid grid-x')
                    .classed('grid-zero-hidden', this.hideXAxisZero)
                    .attr('transform', `translate(0, ${this.height})`)
                    .call(this.xGridCall);
            }
            // Y GRIDLINES
            // if (!this.hideYGrid) {
            //   this.yGridCall = d3_axisLeft(this.yAxisScale)
            //     .ticks(this.yAxisTicks)
            //     .tickSize(-this.width);
            //   this.yGrid = this.svg
            //     .append('g')
            //     .attr('class', 'grid grid-y')
            //     .classed('grid-zero-hidden', this.hideYAxisZero)
            //     .attr('transform', `translate(0, 0)`)
            //     .call(this.yGridCall);
            // }
            // color bar scale
            this.barScale = d3_scaleBand()
                .domain(Object.keys(this.data[0]).slice(1))
                .rangeRound([this.yAxisScale.bandwidth(), 0])
                .paddingInner(0.1)
                .paddingOuter(0.5);
            this.updateChartHorizontal();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.tooltip)
            this.tooltip.remove();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.data && !changes.data.firstChange) {
            if (this.vertical) {
                this.updateChartVertical();
            }
            else {
                this.updateChartHorizontal();
            }
        }
    }
    /**
     * @return {?}
     */
    updateChartVertical() {
        // update the xScale
        this.xAxisScale.domain(this.data.map((/**
         * @param {?} d
         * @return {?}
         */
        d => d.key)));
        // update the yScale
        this.yAxisMax = d3_max(this.data, (/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            /** @type {?} */
            const clone = Object.assign({}, data);
            delete clone.key;
            return d3_max(d3_values(clone));
        }));
        this.yAxisMax = this.yAxisMax + this.yAxisMax * this.yAxisMaxBuffer;
        this.yAxisScale
            .domain([0, this.yAxisMax])
            .rangeRound([this.height, 0])
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
        // if (!this.hideXGrid) {
        //   this.xGrid
        //     .transition()
        //     .duration(1000)
        //     .call(this.xGridCall);
        // }
        if (this.showGrid) {
            this.yGrid
                .transition()
                .duration(1000)
                .call(this.yGridCall);
        }
        // update the color bar scale
        this.barScale.domain(Object.keys(this.data[0]).slice(1)).rangeRound([0, this.xAxisScale.bandwidth()]);
        this.svg
            .selectAll('.gray-bar')
            .data(this.data)
            .join((/**
         * @param {?} enter
         * @return {?}
         */
        enter => enter
            .append('rect')
            .attr('class', 'gray-bar')
            .attr('x', (/**
         * @param {?} d
         * @return {?}
         */
        d => this.xAxisScale(d.key)))
            .attr('y', (/**
         * @param {?} d
         * @return {?}
         */
        d => this.yAxisScale(d.value)))
            .attr('width', this.xAxisScale.bandwidth())
            .attr('height', this.height)), (/**
         * @param {?} update
         * @return {?}
         */
        update => update
            .transition()
            .duration(1000)
            .attr('x', (/**
         * @param {?} d
         * @return {?}
         */
        d => this.xAxisScale(d.key)))
            .attr('y', (/**
         * @param {?} d
         * @return {?}
         */
        d => this.yAxisScale(d.value)))
            .attr('width', this.xAxisScale.bandwidth())
            .attr('height', this.height)));
        this.svg
            .selectAll('.bar-group')
            .data(this.data)
            .join((/**
         * @param {?} enter
         * @return {?}
         */
        enter => enter
            .append('g')
            .attr('class', 'bar-group')
            .attr('transform', (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        (d, i) => {
            return `translate(${this.xAxisScale(d.key)}, 0)`;
        }))), (/**
         * @param {?} update
         * @return {?}
         */
        update => update
            .transition()
            .duration(1000)
            .attr('transform', (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        (d, i) => {
            return `translate(${this.xAxisScale(d.key)}, 0)`;
        }))));
        this.svg
            .selectAll('.bar-group')
            .selectAll('.bar')
            .data((/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        (d, i) => {
            /** @type {?} */
            const clone = Object.assign({}, d);
            delete clone.key;
            /** @type {?} */
            const keys = Object.keys(clone);
            /** @type {?} */
            const keyData = keys.map((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                return { label: key, value: d[key], parentIndex: i };
            }));
            return keyData;
        }))
            .join((/**
         * @param {?} enter
         * @return {?}
         */
        enter => enter
            .append('rect')
            .attr('class', 'bar')
            .attr('fill', (/**
         * @param {?} d
         * @return {?}
         */
        d => `url(${this._location.path()}#gradient-${this.colorRange(d.label).substr(1)})`))
            .attr('data-color', (/**
         * @param {?} d
         * @return {?}
         */
        d => this.colorRange(d.label)))
            .attr('data-parent-index', (/**
         * @param {?} d
         * @return {?}
         */
        d => d.parentIndex))
            .attr('x', (/**
         * @param {?} d
         * @return {?}
         */
        d => this.barScale(d.label)))
            .attr('width', this.barScale.bandwidth())
            .attr('y', this.height)
            .attr('height', 0)
            .call((/**
         * @param {?} enter
         * @return {?}
         */
        enter => {
            return enter
                .transition()
                .duration(500)
                .attr('height', (/**
             * @param {?} d
             * @return {?}
             */
            d => this.height - this.yAxisScale(d.value)))
                .attr('y', (/**
             * @param {?} d
             * @return {?}
             */
            d => this.yAxisScale(d.value)));
        }))), (/**
         * @param {?} update
         * @return {?}
         */
        update => update
            .transition()
            .duration(1000)
            .attr('x', (/**
         * @param {?} d
         * @return {?}
         */
        d => this.barScale(d.label)))
            .attr('width', this.barScale.bandwidth())
            .attr('height', (/**
         * @param {?} d
         * @return {?}
         */
        d => this.height - this.yAxisScale(d.value)))
            .attr('y', (/**
         * @param {?} d
         * @return {?}
         */
        d => this.yAxisScale(d.value)))), (/**
         * @param {?} exit
         * @return {?}
         */
        exit => exit
            .transition()
            .duration(100)
            .attr('height', 0)
            .attr('y', this.height)))
            .on('mouseover', (/**
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (data, index, nodes) => this.barMouseOver(d3_event, data, index, nodes)))
            .on('mouseout', (/**
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (data, index, nodes) => this.barMouseOut()))
            .on('click', (/**
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (data, index, nodes) => this.barMouseClick(d3_event, data, index, nodes)));
        this.updateLegend();
        this.svg.selectAll('.axis').raise();
    }
    /**
     * @return {?}
     */
    updateChartHorizontal() {
        // update the xScale
        this.xAxisMax = d3_max(this.data, (/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            /** @type {?} */
            const clone = Object.assign({}, data);
            delete clone.key;
            return d3_max(d3_values(clone));
        }));
        this.xAxisMax = this.xAxisMax + this.xAxisMax * this.xAxisMaxBuffer;
        this.xAxisScale
            .domain([0, this.xAxisMax])
            .rangeRound([0, this.width])
            .nice();
        // update the yScale
        this.yAxisScale.domain(this.data.map((/**
         * @param {?} d
         * @return {?}
         */
        d => d.key)));
        this.xAxis
            .transition()
            .duration(1000)
            .call(this.xAxisCall);
        this.yAxis
            .transition()
            .duration(1000)
            .call(this.yAxisCall);
        // update the grids
        if (this.showGrid) {
            this.xGrid
                .transition()
                .duration(1000)
                .call(this.xGridCall);
        }
        // if (!this.hideYGrid) {
        //   this.yGrid
        //     .transition()
        //     .duration(1000)
        //     .call(this.yGridCall);
        // }
        // update the color bar scale
        this.barScale.domain(Object.keys(this.data[0]).slice(1)).rangeRound([0, this.yAxisScale.bandwidth()]);
        this.svg
            .selectAll('.gray-bar')
            .data(this.data)
            .join((/**
         * @param {?} enter
         * @return {?}
         */
        enter => enter
            .append('rect')
            .attr('class', 'gray-bar')
            .attr('y', (/**
         * @param {?} d
         * @return {?}
         */
        d => this.yAxisScale(d.key)))
            .attr('width', this.width)
            .attr('height', this.yAxisScale.bandwidth())), (/**
         * @param {?} update
         * @return {?}
         */
        update => update
            .transition()
            .duration(1000)
            .attr('y', (/**
         * @param {?} d
         * @return {?}
         */
        d => this.yAxisScale(d.key)))
            .attr('width', this.width)
            .attr('height', this.yAxisScale.bandwidth())));
        this.svg
            .selectAll('.bar-group')
            .data(this.data)
            .join((/**
         * @param {?} enter
         * @return {?}
         */
        enter => enter
            .append('g')
            .attr('class', 'bar-group')
            .attr('transform', (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        (d, i) => {
            return `translate(0, ${this.yAxisScale(d.key)})`;
        }))), (/**
         * @param {?} update
         * @return {?}
         */
        update => update
            .transition()
            .duration(1000)
            .attr('transform', (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        (d, i) => {
            return `translate(0, ${this.yAxisScale(d.key)})`;
        }))));
        this.svg
            .selectAll('.bar-group')
            .selectAll('.bar')
            .data((/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        (d, i) => {
            /** @type {?} */
            const clone = Object.assign({}, d);
            delete clone.key;
            /** @type {?} */
            const keys = Object.keys(clone);
            /** @type {?} */
            const keyData = keys.map((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                return { label: key, value: d[key], parentIndex: i };
            }));
            return keyData;
        }))
            .join((/**
         * @param {?} enter
         * @return {?}
         */
        enter => enter
            .append('rect')
            .attr('class', 'bar')
            .attr('fill', (/**
         * @param {?} d
         * @return {?}
         */
        d => `url(${this._location.path()}#gradient-horizontal-${this.colorRange(d.label).substr(1)})`))
            .attr('data-color', (/**
         * @param {?} d
         * @return {?}
         */
        d => this.colorRange(d.label)))
            .attr('data-parent-index', (/**
         * @param {?} d
         * @return {?}
         */
        d => d.parentIndex))
            .attr('x', 0)
            .attr('width', 0)
            .attr('y', (/**
         * @param {?} d
         * @return {?}
         */
        d => this.barScale(d.label)))
            .attr('height', this.barScale.bandwidth())
            .call((/**
         * @param {?} enter
         * @return {?}
         */
        enter => {
            return enter
                .transition()
                .duration(500)
                .attr('width', (/**
             * @param {?} d
             * @return {?}
             */
            d => this.xAxisScale(d.value)));
        }))), (/**
         * @param {?} update
         * @return {?}
         */
        update => update
            .transition()
            .duration(1000)
            .attr('width', (/**
         * @param {?} d
         * @return {?}
         */
        d => this.xAxisScale(d.value)))
            .attr('height', this.barScale.bandwidth())
            .attr('y', (/**
         * @param {?} d
         * @return {?}
         */
        d => this.barScale(d.label)))), (/**
         * @param {?} exit
         * @return {?}
         */
        exit => exit
            .transition()
            .duration(100)
            .attr('width', 0)))
            .on('mouseover', (/**
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (data, index, nodes) => this.barMouseOver(d3_event, data, index, nodes)))
            .on('mouseout', (/**
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (data, index, nodes) => this.barMouseOut()))
            .on('click', (/**
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (data, index, nodes) => this.barMouseClick(d3_event, data, index, nodes)));
        this.updateLegend();
        this.svg.selectAll('.axis').raise();
    }
    /**
     * @return {?}
     */
    updateLegend() {
        // legend
        if (!this.hideLegend) {
            /** @type {?} */
            const legendData = Object.assign({}, this.data[0]);
            delete legendData.key;
            /** @type {?} */
            const legendKeys = Object.keys(legendData).map((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                return { label: key };
            }));
            this.chart
                .select('.legend')
                .selectAll('.legend-item')
                .data(legendKeys)
                .join((/**
             * @param {?} enter
             * @return {?}
             */
            enter => {
                /** @type {?} */
                const li = enter.append('li').attr('class', 'legend-item');
                li.insert('span')
                    .attr('class', 'legend-key')
                    .style('background-color', (/**
                 * @param {?} d
                 * @return {?}
                 */
                d => this.colorRange(d.label)));
                li.insert('span', '.legend-item')
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
                return li;
            }), (/**
             * @param {?} update
             * @return {?}
             */
            update => {
                update.select('.legend-label').html((/**
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
                return update;
            }), (/**
             * @param {?} exit
             * @return {?}
             */
            exit => exit.remove()))
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
    }
}
PbdsDatavizGroupedBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'pbds-dataviz-grouped-bar',
                template: ``,
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
PbdsDatavizGroupedBarComponent.ctorParameters = () => [
    { type: PbdsDatavizService },
    { type: ElementRef },
    { type: ViewportScroller },
    { type: Location }
];
PbdsDatavizGroupedBarComponent.propDecorators = {
    chartClass: [{ type: HostBinding, args: ['class.pbds-chart',] }],
    groupedBarClass: [{ type: HostBinding, args: ['class.pbds-chart-grouped-bar',] }],
    data: [{ type: Input }],
    width: [{ type: Input }],
    height: [{ type: Input }],
    vertical: [{ type: Input }],
    hideXAxis: [{ type: Input }],
    xAxisMaxBuffer: [{ type: Input }],
    xAxisFormatType: [{ type: Input }],
    xAxisFormatString: [{ type: Input }],
    xAxisTicks: [{ type: Input }],
    hideYAxis: [{ type: Input }],
    yAxisMaxBuffer: [{ type: Input }],
    yAxisFormatType: [{ type: Input }],
    yAxisFormatString: [{ type: Input }],
    yAxisTicks: [{ type: Input }],
    marginTop: [{ type: Input }],
    marginRight: [{ type: Input }],
    marginBottom: [{ type: Input }],
    marginLeft: [{ type: Input }],
    hideLegend: [{ type: Input }],
    legendWidth: [{ type: Input }],
    legendPosition: [{ type: Input }],
    legendLabelFormatType: [{ type: Input }],
    legendLabelFormatString: [{ type: Input }],
    hideTooltip: [{ type: Input }],
    tooltipLabelFormatType: [{ type: Input }],
    tooltipLabelFormatString: [{ type: Input }],
    tooltipValueFormatType: [{ type: Input }],
    tooltipValueFormatString: [{ type: Input }],
    showGrid: [{ type: Input }],
    theme: [{ type: Input }],
    hovered: [{ type: Output }],
    clicked: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.chartClass;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.groupedBarClass;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.data;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.width;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.height;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.vertical;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.hideXAxis;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.xAxisMaxBuffer;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.xAxisFormatType;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.xAxisFormatString;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.xAxisTicks;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.hideYAxis;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.yAxisMaxBuffer;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.yAxisFormatType;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.yAxisFormatString;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.yAxisTicks;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.marginTop;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.marginRight;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.marginBottom;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.marginLeft;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.hideLegend;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.legendWidth;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.legendPosition;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.legendLabelFormatType;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.legendLabelFormatString;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.hideTooltip;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.tooltipLabelFormatType;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.tooltipLabelFormatString;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.tooltipValueFormatType;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.tooltipValueFormatString;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.showGrid;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.theme;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.hovered;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.clicked;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.barScale;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.chart;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.svg;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.margin;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.colorRange;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.xAxisMax;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.xAxisScale;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.xAxisCall;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.xAxis;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.xAxisTickSize;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.xAxisTickSizeOuter;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.xAxisFormat;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.hideXAxisDomain;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.hideXAxisZero;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.hideXAxisTicks;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.xGrid;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.xGridCall;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.yAxisMax;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.yAxisScale;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.yAxisCall;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.yAxis;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.yAxisFormat;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.yAxisTickSize;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.yAxisTickSizeOuter;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.hideYAxisZero;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.hideYAxisDomain;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.hideYAxisTicks;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.yGrid;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.yGridCall;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.legendLabelFormat;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.hideGrayBars;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.tooltip;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.tooltipValueFormat;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.tooltipLabelFormat;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.barMouseOver;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.barMouseOut;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.barMouseClick;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.legendMouseOver;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.legendMouseOut;
    /** @type {?} */
    PbdsDatavizGroupedBarComponent.prototype.legendMouseClick;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.tooltipShow;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.tooltipHide;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.xAxisFormatter;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype.yAxisFormatter;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype._dataviz;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype._element;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype._scroll;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizGroupedBarComponent.prototype._location;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXZpei1ncm91cGVkLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wYi1kZXNpZ24tc3lzdGVtLyIsInNvdXJjZXMiOlsibGliL2RhdGF2aXovZGF0YXZpei1ncm91cGVkLWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBR1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osVUFBVSxFQUNWLFdBQVcsRUFHWCx1QkFBdUIsRUFDeEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTdELE9BQU8sRUFDTCxNQUFNLElBQUksU0FBUyxFQUNuQixRQUFRLElBQUksV0FBVyxFQUN2QixVQUFVLElBQUksYUFBYSxFQUMzQixNQUFNLElBQUksU0FBUyxFQUNuQixZQUFZLElBQUksZUFBZSxFQUMvQixTQUFTLElBQUksWUFBWSxFQUN6QixXQUFXLElBQUksY0FBYyxFQUM3QixHQUFHLElBQUksTUFBTSxFQUNiLFVBQVUsSUFBSSxhQUFhLEVBQzNCLFFBQVEsSUFBSSxXQUFXLEVBQ3ZCLEtBQUssSUFBSSxRQUFRLEVBQ2pCLE1BQU0sSUFBSSxTQUFTLEVBQ3BCLE1BQU0sSUFBSSxDQUFDO0FBRVosT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFTdkQsTUFBTSxPQUFPLDhCQUE4Qjs7Ozs7OztJQTBJekMsWUFDVSxRQUE0QixFQUM1QixRQUFvQixFQUNwQixPQUF5QixFQUN6QixTQUFtQjtRQUhuQixhQUFRLEdBQVIsUUFBUSxDQUFvQjtRQUM1QixhQUFRLEdBQVIsUUFBUSxDQUFZO1FBQ3BCLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBQ3pCLGNBQVMsR0FBVCxTQUFTLENBQVU7UUE1STdCLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFHbEIsb0JBQWUsR0FBRyxJQUFJ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QU9FOztJQUVGLHVEQUVFOztJQUVGLHlEQXVCRTs7SUFFRix3REFRRTs7SUFFRiwwREFFRTs7Ozs7SUFFRixxREE0Q0U7Ozs7O0lBRUYscURBRUU7Ozs7O0lBRUYsd0RBWUU7Ozs7O0lBRUYsd0RBWUU7Ozs7O0lBeHpCQSxrREFBb0M7Ozs7O0lBQ3BDLGtEQUE0Qjs7Ozs7SUFDNUIsaURBQWlDOzs7OztJQUNqQyxtREFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIE9uSW5pdCxcbiAgT25DaGFuZ2VzLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBPbkRlc3Ryb3ksXG4gIFNpbXBsZUNoYW5nZXMsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBWaWV3cG9ydFNjcm9sbGVyLCBMb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7XG4gIHNlbGVjdCBhcyBkM19zZWxlY3QsXG4gIGlzb1BhcnNlIGFzIGQzX2lzb1BhcnNlLFxuICB0aW1lRm9ybWF0IGFzIGQzX3RpbWVGb3JtYXQsXG4gIGZvcm1hdCBhcyBkM19mb3JtYXQsXG4gIHNjYWxlT3JkaW5hbCBhcyBkM19zY2FsZU9yZGluYWwsXG4gIHNjYWxlQmFuZCBhcyBkM19zY2FsZUJhbmQsXG4gIHNjYWxlTGluZWFyIGFzIGQzX3NjYWxlTGluZWFyLFxuICBtYXggYXMgZDNfbWF4LFxuICBheGlzQm90dG9tIGFzIGQzX2F4aXNCb3R0b20sXG4gIGF4aXNMZWZ0IGFzIGQzX2F4aXNMZWZ0LFxuICBldmVudCBhcyBkM19ldmVudCxcbiAgdmFsdWVzIGFzIGQzX3ZhbHVlc1xufSBmcm9tICdkMyc7XG5cbmltcG9ydCB7IFBiZHNEYXRhdml6U2VydmljZSB9IGZyb20gJy4vZGF0YXZpei5zZXJ2aWNlJztcbmltcG9ydCB7IFBiZHNEYXRhdml6R3JvdXBlZEJhciB9IGZyb20gJy4vZGF0YXZpei5pbnRlcmZhY2VzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncGJkcy1kYXRhdml6LWdyb3VwZWQtYmFyJyxcbiAgdGVtcGxhdGU6IGBgLFxuICBzdHlsZXM6IFtdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBQYmRzRGF0YXZpekdyb3VwZWRCYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5wYmRzLWNoYXJ0JylcbiAgY2hhcnRDbGFzcyA9IHRydWU7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5wYmRzLWNoYXJ0LWdyb3VwZWQtYmFyJylcbiAgZ3JvdXBlZEJhckNsYXNzID0gdHJ1ZTtcblxuICBASW5wdXQoKVxuICBkYXRhOiBBcnJheTxQYmRzRGF0YXZpekdyb3VwZWRCYXI+O1xuXG4gIEBJbnB1dCgpXG4gIHdpZHRoID0gMzA2O1xuXG4gIEBJbnB1dCgpXG4gIGhlaWdodCA9IDQwMDtcblxuICBASW5wdXQoKVxuICB2ZXJ0aWNhbCA9IHRydWU7XG5cbiAgQElucHV0KClcbiAgaGlkZVhBeGlzID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgeEF4aXNNYXhCdWZmZXIgPSAwLjAxO1xuXG4gIEBJbnB1dCgpXG4gIHhBeGlzRm9ybWF0VHlwZTogJ251bWJlcicgfCAndGltZScgPSBudWxsO1xuXG4gIEBJbnB1dCgpXG4gIHhBeGlzRm9ybWF0U3RyaW5nID0gJyc7XG5cbiAgQElucHV0KClcbiAgeEF4aXNUaWNrcyA9IDU7XG5cbiAgQElucHV0KClcbiAgaGlkZVlBeGlzID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgeUF4aXNNYXhCdWZmZXIgPSAwLjAxO1xuXG4gIEBJbnB1dCgpXG4gIHlBeGlzRm9ybWF0VHlwZTogJ251bWJlcicgfCAndGltZScgPSBudWxsO1xuXG4gIEBJbnB1dCgpXG4gIHlBeGlzRm9ybWF0U3RyaW5nID0gJyc7XG5cbiAgQElucHV0KClcbiAgeUF4aXNUaWNrcyA9IDU7XG5cbiAgQElucHV0KClcbiAgbWFyZ2luVG9wID0gMTA7XG5cbiAgQElucHV0KClcbiAgbWFyZ2luUmlnaHQgPSB0aGlzLnZlcnRpY2FsID8gMCA6IDU1O1xuXG4gIEBJbnB1dCgpXG4gIG1hcmdpbkJvdHRvbSA9IDMwO1xuXG4gIEBJbnB1dCgpXG4gIG1hcmdpbkxlZnQgPSA1NTtcblxuICBASW5wdXQoKVxuICBoaWRlTGVnZW5kID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgbGVnZW5kV2lkdGggPSAxMDUgKyAyODsgLy8gaGFyZGNvZGVkIGxlZ2VuZCB3aWR0aCArIGxlZnQgbWFyZ2luLCBkbyBub3QgZG9jdW1lbnQgdW50aWwgZmVlZGJhY2tcblxuICBASW5wdXQoKVxuICBsZWdlbmRQb3NpdGlvbjogJ3JpZ2h0JyB8ICdib3R0b20nID0gJ3JpZ2h0JztcblxuICBASW5wdXQoKVxuICBsZWdlbmRMYWJlbEZvcm1hdFR5cGU6ICdudW1iZXInIHwgJ3RpbWUnID0gbnVsbDtcblxuICBASW5wdXQoKVxuICBsZWdlbmRMYWJlbEZvcm1hdFN0cmluZyA9ICcnO1xuXG4gIEBJbnB1dCgpXG4gIGhpZGVUb29sdGlwID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgdG9vbHRpcExhYmVsRm9ybWF0VHlwZTogJ251bWJlcicgfCAndGltZScgPSBudWxsO1xuXG4gIEBJbnB1dCgpXG4gIHRvb2x0aXBMYWJlbEZvcm1hdFN0cmluZyA9ICcnO1xuXG4gIEBJbnB1dCgpXG4gIHRvb2x0aXBWYWx1ZUZvcm1hdFR5cGU6ICdudW1iZXInID0gbnVsbDtcblxuICBASW5wdXQoKVxuICB0b29sdGlwVmFsdWVGb3JtYXRTdHJpbmcgPSAnJztcblxuICBASW5wdXQoKVxuICBzaG93R3JpZCA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIHRoZW1lOiAnY2xhc3NpYycgfCAnc3Vuc2V0JyB8ICdvY2VhbicgfCAndHdpbGlnaHQnID0gJ2NsYXNzaWMnO1xuXG4gIEBPdXRwdXQoKVxuICBob3ZlcmVkOiBFdmVudEVtaXR0ZXI8b2JqZWN0PiA9IG5ldyBFdmVudEVtaXR0ZXI8b2JqZWN0PigpO1xuXG4gIEBPdXRwdXQoKVxuICBjbGlja2VkOiBFdmVudEVtaXR0ZXI8b2JqZWN0PiA9IG5ldyBFdmVudEVtaXR0ZXI8b2JqZWN0PigpO1xuXG4gIHByaXZhdGUgYmFyU2NhbGU7XG4gIHByaXZhdGUgY2hhcnQ7XG4gIHByaXZhdGUgc3ZnO1xuICBwcml2YXRlIG1hcmdpbjtcbiAgcHJpdmF0ZSBjb2xvclJhbmdlO1xuICBwcml2YXRlIHhBeGlzTWF4O1xuICBwcml2YXRlIHhBeGlzU2NhbGU7XG4gIHByaXZhdGUgeEF4aXNDYWxsO1xuICBwcml2YXRlIHhBeGlzO1xuICBwcml2YXRlIHhBeGlzVGlja1NpemU6IG51bWJlcjtcbiAgcHJpdmF0ZSB4QXhpc1RpY2tTaXplT3V0ZXI6IG51bWJlcjtcbiAgcHJpdmF0ZSB4QXhpc0Zvcm1hdDtcbiAgcHJpdmF0ZSBoaWRlWEF4aXNEb21haW46IGJvb2xlYW47XG4gIHByaXZhdGUgaGlkZVhBeGlzWmVybzogYm9vbGVhbjtcbiAgcHJpdmF0ZSBoaWRlWEF4aXNUaWNrczogYm9vbGVhbjtcbiAgcHJpdmF0ZSB4R3JpZDtcbiAgcHJpdmF0ZSB4R3JpZENhbGw7XG4gIHByaXZhdGUgeUF4aXNNYXg7XG4gIHByaXZhdGUgeUF4aXNTY2FsZTtcbiAgcHJpdmF0ZSB5QXhpc0NhbGw7XG4gIHByaXZhdGUgeUF4aXM7XG4gIHByaXZhdGUgeUF4aXNGb3JtYXQ7XG4gIHByaXZhdGUgeUF4aXNUaWNrU2l6ZTogbnVtYmVyO1xuICBwcml2YXRlIHlBeGlzVGlja1NpemVPdXRlcjogbnVtYmVyO1xuICBwcml2YXRlIGhpZGVZQXhpc1plcm86IGJvb2xlYW47XG4gIHByaXZhdGUgaGlkZVlBeGlzRG9tYWluOiBib29sZWFuO1xuICBwcml2YXRlIGhpZGVZQXhpc1RpY2tzOiBib29sZWFuO1xuICBwcml2YXRlIHlHcmlkO1xuICBwcml2YXRlIHlHcmlkQ2FsbDtcbiAgcHJpdmF0ZSBsZWdlbmRMYWJlbEZvcm1hdDtcbiAgcHJpdmF0ZSBoaWRlR3JheUJhcnM6IGJvb2xlYW47XG4gIHByaXZhdGUgdG9vbHRpcDtcbiAgcHJpdmF0ZSB0b29sdGlwVmFsdWVGb3JtYXQ7XG4gIHByaXZhdGUgdG9vbHRpcExhYmVsRm9ybWF0O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2RhdGF2aXo6IFBiZHNEYXRhdml6U2VydmljZSxcbiAgICBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgX3Njcm9sbDogVmlld3BvcnRTY3JvbGxlcixcbiAgICBwcml2YXRlIF9sb2NhdGlvbjogTG9jYXRpb25cbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubWFyZ2luID0ge1xuICAgICAgdG9wOiArdGhpcy5tYXJnaW5Ub3AsXG4gICAgICByaWdodDogK3RoaXMubWFyZ2luUmlnaHQsXG4gICAgICBib3R0b206ICt0aGlzLm1hcmdpbkJvdHRvbSxcbiAgICAgIGxlZnQ6ICt0aGlzLm1hcmdpbkxlZnRcbiAgICB9O1xuXG4gICAgc3dpdGNoICh0aGlzLnhBeGlzRm9ybWF0VHlwZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgdGhpcy54QXhpc0Zvcm1hdCA9IGQzX2Zvcm1hdCh0aGlzLnhBeGlzRm9ybWF0U3RyaW5nKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0aW1lJzpcbiAgICAgICAgdGhpcy54QXhpc0Zvcm1hdCA9IGQzX3RpbWVGb3JtYXQodGhpcy54QXhpc0Zvcm1hdFN0cmluZyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHN3aXRjaCAodGhpcy55QXhpc0Zvcm1hdFR5cGUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIHRoaXMueUF4aXNGb3JtYXQgPSBkM19mb3JtYXQodGhpcy55QXhpc0Zvcm1hdFN0cmluZyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndGltZSc6XG4gICAgICAgIHRoaXMueUF4aXNGb3JtYXQgPSBkM190aW1lRm9ybWF0KHRoaXMueUF4aXNGb3JtYXRTdHJpbmcpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHRoaXMubGVnZW5kTGFiZWxGb3JtYXRUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICB0aGlzLmxlZ2VuZExhYmVsRm9ybWF0ID0gZDNfZm9ybWF0KHRoaXMubGVnZW5kTGFiZWxGb3JtYXRTdHJpbmcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgICB0aGlzLmxlZ2VuZExhYmVsRm9ybWF0ID0gZDNfdGltZUZvcm1hdCh0aGlzLmxlZ2VuZExhYmVsRm9ybWF0U3RyaW5nKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmxlZ2VuZExhYmVsRm9ybWF0ID0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgc3dpdGNoICh0aGlzLnRvb2x0aXBMYWJlbEZvcm1hdFR5cGUpIHtcbiAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgICB0aGlzLnRvb2x0aXBMYWJlbEZvcm1hdCA9IGQzX3RpbWVGb3JtYXQodGhpcy50b29sdGlwTGFiZWxGb3JtYXRTdHJpbmcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMudG9vbHRpcExhYmVsRm9ybWF0ID0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgc3dpdGNoICh0aGlzLnRvb2x0aXBWYWx1ZUZvcm1hdFR5cGUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIHRoaXMudG9vbHRpcFZhbHVlRm9ybWF0ID0gZDNfZm9ybWF0KHRoaXMudG9vbHRpcFZhbHVlRm9ybWF0U3RyaW5nKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLnRvb2x0aXBWYWx1ZUZvcm1hdCA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gZGVmYXVsdHMgZm9yIGFsbCBjaGFydCB0eXBlc1xuICAgIHRoaXMuaGlkZUdyYXlCYXJzID0gZmFsc2U7XG4gICAgdGhpcy5oaWRlWEF4aXNaZXJvID0gZmFsc2U7XG4gICAgdGhpcy5oaWRlWEF4aXNEb21haW4gPSBmYWxzZTtcbiAgICB0aGlzLmhpZGVYQXhpc1RpY2tzID0gdHJ1ZTtcbiAgICB0aGlzLnhBeGlzVGlja1NpemUgPSA4O1xuICAgIHRoaXMueEF4aXNUaWNrU2l6ZU91dGVyID0gMDtcbiAgICB0aGlzLmhpZGVZQXhpc1plcm8gPSBmYWxzZTtcbiAgICB0aGlzLmhpZGVZQXhpc0RvbWFpbiA9IGZhbHNlO1xuICAgIHRoaXMuaGlkZVlBeGlzVGlja3MgPSB0cnVlO1xuICAgIHRoaXMueUF4aXNUaWNrU2l6ZSA9IDg7XG4gICAgdGhpcy55QXhpc1RpY2tTaXplT3V0ZXIgPSAwO1xuXG4gICAgaWYgKCF0aGlzLmhpZGVMZWdlbmQgJiYgdGhpcy5sZWdlbmRQb3NpdGlvbiA9PT0gJ3JpZ2h0Jykge1xuICAgICAgdGhpcy53aWR0aCA9ICt0aGlzLndpZHRoIC0gK3RoaXMubGVnZW5kV2lkdGg7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIHRoZSBjaGFydFxuICAgIHRoaXMuY2hhcnQgPSBkM19zZWxlY3QodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50KS5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbiAgICAvLyBjcmVhdGUgY2hhcnQgc3ZnXG4gICAgdGhpcy5zdmcgPSB0aGlzLmNoYXJ0XG4gICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgLmF0dHIoJ3dpZHRoJywgKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy52ZXJ0aWNhbCkge1xuICAgICAgICAgIHJldHVybiArdGhpcy53aWR0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gK3RoaXMud2lkdGggKyB0aGlzLm1hcmdpbi5sZWZ0ICsgdGhpcy5tYXJnaW4ucmlnaHQ7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuYXR0cignaGVpZ2h0JywgK3RoaXMuaGVpZ2h0ICsgdGhpcy5tYXJnaW4udG9wICsgdGhpcy5tYXJnaW4uYm90dG9tKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2ltZy1mbHVpZCcpXG4gICAgICAuYXR0cigncHJlc2VydmVBc3BlY3RSYXRpbycsICd4TWluWU1pbiBtZWV0JylcbiAgICAgIC5hdHRyKCd2aWV3Qm94JywgKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy52ZXJ0aWNhbCkge1xuICAgICAgICAgIHJldHVybiBgLSR7dGhpcy5tYXJnaW4ubGVmdH0gLSR7dGhpcy5tYXJnaW4udG9wfSAkeyt0aGlzLndpZHRofSAkeyt0aGlzLmhlaWdodCArXG4gICAgICAgICAgICB0aGlzLm1hcmdpbi50b3AgK1xuICAgICAgICAgICAgdGhpcy5tYXJnaW4uYm90dG9tfWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGAtJHt0aGlzLm1hcmdpbi5sZWZ0fSAtJHt0aGlzLm1hcmdpbi50b3B9ICR7K3RoaXMud2lkdGggKyB0aGlzLm1hcmdpbi5sZWZ0ICsgdGhpcy5tYXJnaW4ucmlnaHR9ICR7K3RoaXNcbiAgICAgICAgICAgIC5oZWlnaHQgK1xuICAgICAgICAgICAgdGhpcy5tYXJnaW4udG9wICtcbiAgICAgICAgICAgIHRoaXMubWFyZ2luLmJvdHRvbX1gO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIC8vIFRPT0xUSVBcbiAgICBpZiAoIXRoaXMuaGlkZVRvb2x0aXApIHtcbiAgICAgIHRoaXMudG9vbHRpcCA9IGQzX3NlbGVjdCgnYm9keScpXG4gICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICgpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy52ZXJ0aWNhbCA/ICdwYmRzLXRvb2x0aXAgc291dGgnIDogJ3BiZHMtdG9vbHRpcCB3ZXN0JztcbiAgICAgICAgfSlcbiAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMClcbiAgICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTsgLy8gaGlkZSB0b29sdGlwIGZvciBhY2Nlc3NpYmlsaXR5XG4gICAgfVxuXG4gICAgLy8gYWRkIGxlZ2VuZCBjbGFzc2VzXG4gICAgaWYgKCF0aGlzLmhpZGVMZWdlbmQpIHtcbiAgICAgIHRoaXMuY2hhcnQuY2xhc3NlZCgncGJkcy1jaGFydC1sZWdlbmQtYm90dG9tJywgdGhpcy5sZWdlbmRQb3NpdGlvbiA9PT0gJ2JvdHRvbScgPyB0cnVlIDogZmFsc2UpO1xuICAgICAgdGhpcy5jaGFydC5hcHBlbmQoJ3VsJykuYXR0cignY2xhc3MnLCBgbGVnZW5kIGxlZ2VuZC0ke3RoaXMubGVnZW5kUG9zaXRpb259YCk7XG4gICAgfVxuXG4gICAgLy8gYnVpbGQgY29sb3IgcmFuZ2VzXG4gICAgdGhpcy5jb2xvclJhbmdlID0gZDNfc2NhbGVPcmRpbmFsKCkucmFuZ2UoXG4gICAgICB0aGlzLl9kYXRhdml6LmNyZWF0ZUdyYWRpZW50RGVmcyh0aGlzLnN2ZywgZmFsc2UsIHRoaXMudGhlbWUsIHRoaXMudmVydGljYWwpXG4gICAgKTtcblxuICAgIGlmICh0aGlzLnZlcnRpY2FsKSB7XG4gICAgICAvLyBYIEFYSVNcbiAgICAgIHRoaXMueEF4aXNTY2FsZSA9IGQzX3NjYWxlQmFuZCgpXG4gICAgICAgIC5kb21haW4odGhpcy5kYXRhLm1hcChkID0+IGQua2V5KSlcbiAgICAgICAgLnJhbmdlUm91bmQoWzAsIHRoaXMud2lkdGggLSB0aGlzLm1hcmdpbi5sZWZ0XSlcbiAgICAgICAgLmFsaWduKDApO1xuXG4gICAgICAvLyBhZGQgcGFkZGluZyB0byB0aGUgc2NhbGUgZm9yIGdyYXkgYmFyc1xuICAgICAgIXRoaXMuaGlkZUdyYXlCYXJzXG4gICAgICAgID8gdGhpcy54QXhpc1NjYWxlLnBhZGRpbmdJbm5lcigwLjEpLnBhZGRpbmdPdXRlcigwKVxuICAgICAgICA6IHRoaXMueEF4aXNTY2FsZS5wYWRkaW5nSW5uZXIoMCkucGFkZGluZ091dGVyKDApO1xuXG4gICAgICB0aGlzLnhBeGlzQ2FsbCA9IGQzX2F4aXNCb3R0b20odGhpcy54QXhpc1NjYWxlKVxuICAgICAgICAudGlja1NpemUodGhpcy54QXhpc1RpY2tTaXplKVxuICAgICAgICAudGlja1NpemVPdXRlcih0aGlzLnhBeGlzVGlja1NpemVPdXRlcilcbiAgICAgICAgLnRpY2tGb3JtYXQodGhpcy54QXhpc0Zvcm1hdHRlcik7XG5cbiAgICAgIHRoaXMueEF4aXMgPSB0aGlzLnN2Z1xuICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2F4aXMgYXhpcy14JylcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoMCwgJHt0aGlzLmhlaWdodH0pYClcbiAgICAgICAgLmNsYXNzZWQoJ2F4aXMtaGlkZGVuJywgdGhpcy5oaWRlWEF4aXMpXG4gICAgICAgIC5jbGFzc2VkKCdheGlzLXplcm8taGlkZGVuJywgdGhpcy5oaWRlWEF4aXNaZXJvKVxuICAgICAgICAuY2xhc3NlZCgnYXhpcy1kb21haW4taGlkZGVuJywgdGhpcy5oaWRlWEF4aXNEb21haW4pXG4gICAgICAgIC5jbGFzc2VkKCdheGlzLXRpY2tzLWhpZGRlbicsIHRoaXMuaGlkZVhBeGlzVGlja3MpXG4gICAgICAgIC5jYWxsKHRoaXMueEF4aXNDYWxsKTtcblxuICAgICAgLy8gWCBHUklETElORVNcbiAgICAgIC8vIGlmICghdGhpcy5oaWRlWEdyaWQpIHtcbiAgICAgIC8vICAgdGhpcy54R3JpZENhbGwgPSBkM19heGlzQm90dG9tKHRoaXMueEF4aXNTY2FsZSkudGlja1NpemUoLXRoaXMuaGVpZ2h0KTtcblxuICAgICAgLy8gICB0aGlzLnhHcmlkID0gdGhpcy5zdmdcbiAgICAgIC8vICAgICAuYXBwZW5kKCdnJylcbiAgICAgIC8vICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZCBncmlkLXgnKVxuICAgICAgLy8gICAgIC5jbGFzc2VkKCdncmlkLXplcm8taGlkZGVuJywgdGhpcy5oaWRlWEF4aXNaZXJvKVxuICAgICAgLy8gICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKDAsICR7dGhpcy5oZWlnaHR9KWApXG4gICAgICAvLyAgICAgLmNhbGwodGhpcy54R3JpZENhbGwpO1xuICAgICAgLy8gfVxuXG4gICAgICAvLyBZIEFYSVNcbiAgICAgIHRoaXMueUF4aXNNYXggPSBkM19tYXgodGhpcy5kYXRhLCAoZGF0YTogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IGNsb25lID0geyAuLi5kYXRhIH07XG4gICAgICAgIGRlbGV0ZSBjbG9uZS5rZXk7XG5cbiAgICAgICAgcmV0dXJuIGQzX21heChkM192YWx1ZXMoY2xvbmUpKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnlBeGlzTWF4ID0gdGhpcy55QXhpc01heCArIHRoaXMueUF4aXNNYXggKiB0aGlzLnlBeGlzTWF4QnVmZmVyO1xuXG4gICAgICB0aGlzLnlBeGlzU2NhbGUgPSBkM19zY2FsZUxpbmVhcigpXG4gICAgICAgIC5kb21haW4oWzAsIHRoaXMueUF4aXNNYXhdKVxuICAgICAgICAubmljZSgpXG4gICAgICAgIC5yYW5nZVJvdW5kKFt0aGlzLmhlaWdodCwgMF0pO1xuXG4gICAgICB0aGlzLnlBeGlzQ2FsbCA9IGQzX2F4aXNMZWZ0KHRoaXMueUF4aXNTY2FsZSlcbiAgICAgICAgLnRpY2tzKHRoaXMueUF4aXNUaWNrcylcbiAgICAgICAgLnRpY2tTaXplKHRoaXMueUF4aXNUaWNrU2l6ZSlcbiAgICAgICAgLnRpY2tTaXplT3V0ZXIodGhpcy55QXhpc1RpY2tTaXplT3V0ZXIpXG4gICAgICAgIC50aWNrRm9ybWF0KHRoaXMueUF4aXNGb3JtYXR0ZXIpO1xuXG4gICAgICB0aGlzLnlBeGlzID0gdGhpcy5zdmdcbiAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdheGlzIGF4aXMteScpXG4gICAgICAgIC5jbGFzc2VkKCdheGlzLWhpZGRlbicsIHRoaXMuaGlkZVlBeGlzKVxuICAgICAgICAuY2xhc3NlZCgnYXhpcy16ZXJvLWhpZGRlbicsIHRoaXMuaGlkZVlBeGlzWmVybylcbiAgICAgICAgLmNsYXNzZWQoJ2F4aXMtZG9tYWluLWhpZGRlbicsIHRoaXMuaGlkZVlBeGlzRG9tYWluKVxuICAgICAgICAuY2xhc3NlZCgnYXhpcy10aWNrcy1oaWRkZW4nLCB0aGlzLmhpZGVZQXhpc1RpY2tzKVxuICAgICAgICAuY2FsbCh0aGlzLnlBeGlzQ2FsbCk7XG5cbiAgICAgIC8vIFkgR1JJRExJTkVTXG4gICAgICBpZiAodGhpcy5zaG93R3JpZCkge1xuICAgICAgICB0aGlzLnlHcmlkQ2FsbCA9IGQzX2F4aXNMZWZ0KHRoaXMueUF4aXNTY2FsZSlcbiAgICAgICAgICAudGlja3ModGhpcy55QXhpc1RpY2tzKVxuICAgICAgICAgIC50aWNrU2l6ZSgtdGhpcy53aWR0aCArIHRoaXMubWFyZ2luLmxlZnQgKyB0aGlzLm1hcmdpbi5yaWdodCk7XG5cbiAgICAgICAgdGhpcy55R3JpZCA9IHRoaXMuc3ZnXG4gICAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyaWQgZ3JpZC15JylcbiAgICAgICAgICAuY2xhc3NlZCgnZ3JpZC16ZXJvLWhpZGRlbicsIHRoaXMuaGlkZVlBeGlzWmVybylcbiAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgwLCAwKWApXG4gICAgICAgICAgLmNhbGwodGhpcy55R3JpZENhbGwpO1xuICAgICAgfVxuXG4gICAgICAvLyBjb2xvciBiYXIgc2NhbGVcbiAgICAgIHRoaXMuYmFyU2NhbGUgPSBkM19zY2FsZUJhbmQoKVxuICAgICAgICAuZG9tYWluKE9iamVjdC5rZXlzKHRoaXMuZGF0YVswXSkuc2xpY2UoMSkpXG4gICAgICAgIC5yYW5nZVJvdW5kKFswLCB0aGlzLnhBeGlzU2NhbGUuYmFuZHdpZHRoKCldKVxuICAgICAgICAucGFkZGluZ0lubmVyKDAuMSlcbiAgICAgICAgLnBhZGRpbmdPdXRlcigwLjUpO1xuXG4gICAgICB0aGlzLnVwZGF0ZUNoYXJ0VmVydGljYWwoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gWCBBWElTXG4gICAgICB0aGlzLnhBeGlzTWF4ID0gZDNfbWF4KHRoaXMuZGF0YSwgKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBjbG9uZSA9IHsgLi4uZGF0YSB9O1xuICAgICAgICBkZWxldGUgY2xvbmUua2V5O1xuICAgICAgICByZXR1cm4gZDNfbWF4KGQzX3ZhbHVlcyhjbG9uZSkpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMueEF4aXNNYXggPSB0aGlzLnhBeGlzTWF4ICsgdGhpcy54QXhpc01heCAqIHRoaXMueEF4aXNNYXhCdWZmZXI7XG5cbiAgICAgIHRoaXMueEF4aXNTY2FsZSA9IGQzX3NjYWxlTGluZWFyKClcbiAgICAgICAgLmRvbWFpbihbMCwgdGhpcy54QXhpc01heF0pXG4gICAgICAgIC5yYW5nZVJvdW5kKFswLCB0aGlzLndpZHRoXSlcbiAgICAgICAgLm5pY2UoKTtcblxuICAgICAgdGhpcy54QXhpc0NhbGwgPSBkM19heGlzQm90dG9tKHRoaXMueEF4aXNTY2FsZSlcbiAgICAgICAgLnRpY2tzKHRoaXMueEF4aXNUaWNrcylcbiAgICAgICAgLnRpY2tTaXplKHRoaXMueEF4aXNUaWNrU2l6ZSlcbiAgICAgICAgLnRpY2tTaXplT3V0ZXIodGhpcy54QXhpc1RpY2tTaXplT3V0ZXIpXG4gICAgICAgIC50aWNrRm9ybWF0KHRoaXMueEF4aXNGb3JtYXR0ZXIpO1xuXG4gICAgICB0aGlzLnhBeGlzID0gdGhpcy5zdmdcbiAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdheGlzIGF4aXMteCcpXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKDAsICR7dGhpcy5oZWlnaHR9KWApXG4gICAgICAgIC5jbGFzc2VkKCdheGlzLWhpZGRlbicsIHRoaXMuaGlkZVhBeGlzKVxuICAgICAgICAuY2xhc3NlZCgnYXhpcy16ZXJvLWhpZGRlbicsIHRoaXMuaGlkZVhBeGlzWmVybylcbiAgICAgICAgLmNsYXNzZWQoJ2F4aXMtZG9tYWluLWhpZGRlbicsIHRoaXMuaGlkZVhBeGlzRG9tYWluKVxuICAgICAgICAuY2xhc3NlZCgnYXhpcy10aWNrcy1oaWRkZW4nLCB0aGlzLmhpZGVYQXhpc1RpY2tzKVxuICAgICAgICAuY2FsbCh0aGlzLnhBeGlzQ2FsbCk7XG5cbiAgICAgIC8vIFkgQVhJU1xuICAgICAgdGhpcy55QXhpc1NjYWxlID0gZDNfc2NhbGVCYW5kKClcbiAgICAgICAgLmRvbWFpbih0aGlzLmRhdGEubWFwKGQgPT4gZC5rZXkpKVxuICAgICAgICAucmFuZ2VSb3VuZChbMCwgdGhpcy5oZWlnaHRdKVxuICAgICAgICAuYWxpZ24oMSk7XG5cbiAgICAgIC8vIGFkZCBwYWRkaW5nIHRvIHRoZSBzY2FsZSBmb3IgZ3JheSBiYXJzXG4gICAgICAhdGhpcy5oaWRlR3JheUJhcnNcbiAgICAgICAgPyB0aGlzLnlBeGlzU2NhbGUucGFkZGluZ0lubmVyKDAuMSkucGFkZGluZ091dGVyKDApXG4gICAgICAgIDogdGhpcy55QXhpc1NjYWxlLnBhZGRpbmdJbm5lcigwKS5wYWRkaW5nT3V0ZXIoMCk7XG5cbiAgICAgIHRoaXMueUF4aXNDYWxsID0gZDNfYXhpc0xlZnQodGhpcy55QXhpc1NjYWxlKVxuICAgICAgICAudGlja1NpemUodGhpcy55QXhpc1RpY2tTaXplKVxuICAgICAgICAudGlja1NpemVPdXRlcih0aGlzLnlBeGlzVGlja1NpemVPdXRlcilcbiAgICAgICAgLnRpY2tGb3JtYXQodGhpcy55QXhpc0Zvcm1hdHRlcik7XG5cbiAgICAgIHRoaXMueUF4aXMgPSB0aGlzLnN2Z1xuICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2F4aXMgYXhpcy15JylcbiAgICAgICAgLmNsYXNzZWQoJ2F4aXMtaGlkZGVuJywgdGhpcy5oaWRlWUF4aXMpXG4gICAgICAgIC5jbGFzc2VkKCdheGlzLXplcm8taGlkZGVuJywgdGhpcy5oaWRlWUF4aXNaZXJvKVxuICAgICAgICAuY2xhc3NlZCgnYXhpcy1kb21haW4taGlkZGVuJywgdGhpcy5oaWRlWUF4aXNEb21haW4pXG4gICAgICAgIC5jbGFzc2VkKCdheGlzLXRpY2tzLWhpZGRlbicsIHRoaXMuaGlkZVlBeGlzVGlja3MpXG4gICAgICAgIC5jYWxsKHRoaXMueUF4aXNDYWxsKTtcblxuICAgICAgLy8gWCBHUklETElORVNcbiAgICAgIGlmICh0aGlzLnNob3dHcmlkKSB7XG4gICAgICAgIHRoaXMueEdyaWRDYWxsID0gZDNfYXhpc0JvdHRvbSh0aGlzLnhBeGlzU2NhbGUpLnRpY2tTaXplKC10aGlzLmhlaWdodCk7XG4gICAgICAgIHRoaXMueEdyaWQgPSB0aGlzLnN2Z1xuICAgICAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdncmlkIGdyaWQteCcpXG4gICAgICAgICAgLmNsYXNzZWQoJ2dyaWQtemVyby1oaWRkZW4nLCB0aGlzLmhpZGVYQXhpc1plcm8pXG4gICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoMCwgJHt0aGlzLmhlaWdodH0pYClcbiAgICAgICAgICAuY2FsbCh0aGlzLnhHcmlkQ2FsbCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFkgR1JJRExJTkVTXG4gICAgICAvLyBpZiAoIXRoaXMuaGlkZVlHcmlkKSB7XG4gICAgICAvLyAgIHRoaXMueUdyaWRDYWxsID0gZDNfYXhpc0xlZnQodGhpcy55QXhpc1NjYWxlKVxuICAgICAgLy8gICAgIC50aWNrcyh0aGlzLnlBeGlzVGlja3MpXG4gICAgICAvLyAgICAgLnRpY2tTaXplKC10aGlzLndpZHRoKTtcblxuICAgICAgLy8gICB0aGlzLnlHcmlkID0gdGhpcy5zdmdcbiAgICAgIC8vICAgICAuYXBwZW5kKCdnJylcbiAgICAgIC8vICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZCBncmlkLXknKVxuICAgICAgLy8gICAgIC5jbGFzc2VkKCdncmlkLXplcm8taGlkZGVuJywgdGhpcy5oaWRlWUF4aXNaZXJvKVxuICAgICAgLy8gICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKDAsIDApYClcbiAgICAgIC8vICAgICAuY2FsbCh0aGlzLnlHcmlkQ2FsbCk7XG4gICAgICAvLyB9XG5cbiAgICAgIC8vIGNvbG9yIGJhciBzY2FsZVxuICAgICAgdGhpcy5iYXJTY2FsZSA9IGQzX3NjYWxlQmFuZCgpXG4gICAgICAgIC5kb21haW4oT2JqZWN0LmtleXModGhpcy5kYXRhWzBdKS5zbGljZSgxKSlcbiAgICAgICAgLnJhbmdlUm91bmQoW3RoaXMueUF4aXNTY2FsZS5iYW5kd2lkdGgoKSwgMF0pXG4gICAgICAgIC5wYWRkaW5nSW5uZXIoMC4xKVxuICAgICAgICAucGFkZGluZ091dGVyKDAuNSk7XG5cbiAgICAgIHRoaXMudXBkYXRlQ2hhcnRIb3Jpem9udGFsKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMudG9vbHRpcCkgdGhpcy50b29sdGlwLnJlbW92ZSgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmRhdGEgJiYgIWNoYW5nZXMuZGF0YS5maXJzdENoYW5nZSkge1xuICAgICAgaWYgKHRoaXMudmVydGljYWwpIHtcbiAgICAgICAgdGhpcy51cGRhdGVDaGFydFZlcnRpY2FsKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnVwZGF0ZUNoYXJ0SG9yaXpvbnRhbCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUNoYXJ0VmVydGljYWwoKSB7XG4gICAgLy8gdXBkYXRlIHRoZSB4U2NhbGVcbiAgICB0aGlzLnhBeGlzU2NhbGUuZG9tYWluKHRoaXMuZGF0YS5tYXAoZCA9PiBkLmtleSkpO1xuXG4gICAgLy8gdXBkYXRlIHRoZSB5U2NhbGVcbiAgICB0aGlzLnlBeGlzTWF4ID0gZDNfbWF4KHRoaXMuZGF0YSwgKGRhdGE6IGFueSkgPT4ge1xuICAgICAgY29uc3QgY2xvbmUgPSB7IC4uLmRhdGEgfTtcbiAgICAgIGRlbGV0ZSBjbG9uZS5rZXk7XG5cbiAgICAgIHJldHVybiBkM19tYXgoZDNfdmFsdWVzKGNsb25lKSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnlBeGlzTWF4ID0gdGhpcy55QXhpc01heCArIHRoaXMueUF4aXNNYXggKiB0aGlzLnlBeGlzTWF4QnVmZmVyO1xuXG4gICAgdGhpcy55QXhpc1NjYWxlXG4gICAgICAuZG9tYWluKFswLCB0aGlzLnlBeGlzTWF4XSlcbiAgICAgIC5yYW5nZVJvdW5kKFt0aGlzLmhlaWdodCwgMF0pXG4gICAgICAubmljZSgpO1xuXG4gICAgdGhpcy54QXhpc1xuICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgLmR1cmF0aW9uKDEwMDApXG4gICAgICAuY2FsbCh0aGlzLnhBeGlzQ2FsbCk7XG5cbiAgICB0aGlzLnlBeGlzXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgIC5jYWxsKHRoaXMueUF4aXNDYWxsKTtcblxuICAgIC8vIHVwZGF0ZSB0aGUgZ3JpZHNcbiAgICAvLyBpZiAoIXRoaXMuaGlkZVhHcmlkKSB7XG4gICAgLy8gICB0aGlzLnhHcmlkXG4gICAgLy8gICAgIC50cmFuc2l0aW9uKClcbiAgICAvLyAgICAgLmR1cmF0aW9uKDEwMDApXG4gICAgLy8gICAgIC5jYWxsKHRoaXMueEdyaWRDYWxsKTtcbiAgICAvLyB9XG5cbiAgICBpZiAodGhpcy5zaG93R3JpZCkge1xuICAgICAgdGhpcy55R3JpZFxuICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgIC5kdXJhdGlvbigxMDAwKVxuICAgICAgICAuY2FsbCh0aGlzLnlHcmlkQ2FsbCk7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIHRoZSBjb2xvciBiYXIgc2NhbGVcbiAgICB0aGlzLmJhclNjYWxlLmRvbWFpbihPYmplY3Qua2V5cyh0aGlzLmRhdGFbMF0pLnNsaWNlKDEpKS5yYW5nZVJvdW5kKFswLCB0aGlzLnhBeGlzU2NhbGUuYmFuZHdpZHRoKCldKTtcblxuICAgIHRoaXMuc3ZnXG4gICAgICAuc2VsZWN0QWxsKCcuZ3JheS1iYXInKVxuICAgICAgLmRhdGEodGhpcy5kYXRhKVxuICAgICAgLmpvaW4oXG4gICAgICAgIGVudGVyID0+XG4gICAgICAgICAgZW50ZXJcbiAgICAgICAgICAgIC5hcHBlbmQoJ3JlY3QnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyYXktYmFyJylcbiAgICAgICAgICAgIC5hdHRyKCd4JywgZCA9PiB0aGlzLnhBeGlzU2NhbGUoZC5rZXkpKVxuICAgICAgICAgICAgLmF0dHIoJ3knLCBkID0+IHRoaXMueUF4aXNTY2FsZShkLnZhbHVlKSlcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHRoaXMueEF4aXNTY2FsZS5iYW5kd2lkdGgoKSlcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmhlaWdodCksXG4gICAgICAgIHVwZGF0ZSA9PlxuICAgICAgICAgIHVwZGF0ZVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDEwMDApXG4gICAgICAgICAgICAuYXR0cigneCcsIGQgPT4gdGhpcy54QXhpc1NjYWxlKGQua2V5KSlcbiAgICAgICAgICAgIC5hdHRyKCd5JywgZCA9PiB0aGlzLnlBeGlzU2NhbGUoZC52YWx1ZSkpXG4gICAgICAgICAgICAuYXR0cignd2lkdGgnLCB0aGlzLnhBeGlzU2NhbGUuYmFuZHdpZHRoKCkpXG4gICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy5oZWlnaHQpXG4gICAgICApO1xuXG4gICAgdGhpcy5zdmdcbiAgICAgIC5zZWxlY3RBbGwoJy5iYXItZ3JvdXAnKVxuICAgICAgLmRhdGEodGhpcy5kYXRhKVxuICAgICAgLmpvaW4oXG4gICAgICAgIGVudGVyID0+XG4gICAgICAgICAgZW50ZXJcbiAgICAgICAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2Jhci1ncm91cCcpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgKGQsIGkpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGB0cmFuc2xhdGUoJHt0aGlzLnhBeGlzU2NhbGUoZC5rZXkpfSwgMClgO1xuICAgICAgICAgICAgfSksXG4gICAgICAgIHVwZGF0ZSA9PlxuICAgICAgICAgIHVwZGF0ZVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDEwMDApXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgKGQsIGkpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGB0cmFuc2xhdGUoJHt0aGlzLnhBeGlzU2NhbGUoZC5rZXkpfSwgMClgO1xuICAgICAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICB0aGlzLnN2Z1xuICAgICAgLnNlbGVjdEFsbCgnLmJhci1ncm91cCcpXG4gICAgICAuc2VsZWN0QWxsKCcuYmFyJylcbiAgICAgIC5kYXRhKChkLCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IGNsb25lID0geyAuLi5kIH07XG4gICAgICAgIGRlbGV0ZSBjbG9uZS5rZXk7XG5cbiAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGNsb25lKTtcblxuICAgICAgICBjb25zdCBrZXlEYXRhID0ga2V5cy5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgcmV0dXJuIHsgbGFiZWw6IGtleSwgdmFsdWU6IGRba2V5XSwgcGFyZW50SW5kZXg6IGkgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGtleURhdGE7XG4gICAgICB9KVxuICAgICAgLmpvaW4oXG4gICAgICAgIGVudGVyID0+XG4gICAgICAgICAgZW50ZXJcbiAgICAgICAgICAgIC5hcHBlbmQoJ3JlY3QnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2JhcicpXG4gICAgICAgICAgICAuYXR0cignZmlsbCcsIGQgPT4gYHVybCgke3RoaXMuX2xvY2F0aW9uLnBhdGgoKX0jZ3JhZGllbnQtJHt0aGlzLmNvbG9yUmFuZ2UoZC5sYWJlbCkuc3Vic3RyKDEpfSlgKVxuICAgICAgICAgICAgLmF0dHIoJ2RhdGEtY29sb3InLCBkID0+IHRoaXMuY29sb3JSYW5nZShkLmxhYmVsKSlcbiAgICAgICAgICAgIC5hdHRyKCdkYXRhLXBhcmVudC1pbmRleCcsIGQgPT4gZC5wYXJlbnRJbmRleClcbiAgICAgICAgICAgIC5hdHRyKCd4JywgZCA9PiB0aGlzLmJhclNjYWxlKGQubGFiZWwpKVxuICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgdGhpcy5iYXJTY2FsZS5iYW5kd2lkdGgoKSlcbiAgICAgICAgICAgIC5hdHRyKCd5JywgdGhpcy5oZWlnaHQpXG4gICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgMClcbiAgICAgICAgICAgIC5jYWxsKGVudGVyID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGVudGVyXG4gICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgICAgIC5kdXJhdGlvbig1MDApXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGQgPT4gdGhpcy5oZWlnaHQgLSB0aGlzLnlBeGlzU2NhbGUoZC52YWx1ZSkpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3knLCBkID0+IHRoaXMueUF4aXNTY2FsZShkLnZhbHVlKSk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgdXBkYXRlID0+XG4gICAgICAgICAgdXBkYXRlXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgICAgICAgIC5hdHRyKCd4JywgZCA9PiB0aGlzLmJhclNjYWxlKGQubGFiZWwpKVxuICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgdGhpcy5iYXJTY2FsZS5iYW5kd2lkdGgoKSlcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCBkID0+IHRoaXMuaGVpZ2h0IC0gdGhpcy55QXhpc1NjYWxlKGQudmFsdWUpKVxuICAgICAgICAgICAgLmF0dHIoJ3knLCBkID0+IHRoaXMueUF4aXNTY2FsZShkLnZhbHVlKSksXG4gICAgICAgIGV4aXQgPT5cbiAgICAgICAgICBleGl0XG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMTAwKVxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIDApXG4gICAgICAgICAgICAuYXR0cigneScsIHRoaXMuaGVpZ2h0KVxuICAgICAgKVxuICAgICAgLm9uKCdtb3VzZW92ZXInLCAoZGF0YSwgaW5kZXgsIG5vZGVzKSA9PiB0aGlzLmJhck1vdXNlT3ZlcihkM19ldmVudCwgZGF0YSwgaW5kZXgsIG5vZGVzKSlcbiAgICAgIC5vbignbW91c2VvdXQnLCAoZGF0YSwgaW5kZXgsIG5vZGVzKSA9PiB0aGlzLmJhck1vdXNlT3V0KCkpXG4gICAgICAub24oJ2NsaWNrJywgKGRhdGEsIGluZGV4LCBub2RlcykgPT4gdGhpcy5iYXJNb3VzZUNsaWNrKGQzX2V2ZW50LCBkYXRhLCBpbmRleCwgbm9kZXMpKTtcblxuICAgIHRoaXMudXBkYXRlTGVnZW5kKCk7XG5cbiAgICB0aGlzLnN2Zy5zZWxlY3RBbGwoJy5heGlzJykucmFpc2UoKTtcbiAgfVxuXG4gIHVwZGF0ZUNoYXJ0SG9yaXpvbnRhbCgpIHtcbiAgICAvLyB1cGRhdGUgdGhlIHhTY2FsZVxuICAgIHRoaXMueEF4aXNNYXggPSBkM19tYXgodGhpcy5kYXRhLCAoZGF0YTogYW55KSA9PiB7XG4gICAgICBjb25zdCBjbG9uZSA9IHsgLi4uZGF0YSB9O1xuICAgICAgZGVsZXRlIGNsb25lLmtleTtcbiAgICAgIHJldHVybiBkM19tYXgoZDNfdmFsdWVzKGNsb25lKSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnhBeGlzTWF4ID0gdGhpcy54QXhpc01heCArIHRoaXMueEF4aXNNYXggKiB0aGlzLnhBeGlzTWF4QnVmZmVyO1xuXG4gICAgdGhpcy54QXhpc1NjYWxlXG4gICAgICAuZG9tYWluKFswLCB0aGlzLnhBeGlzTWF4XSlcbiAgICAgIC5yYW5nZVJvdW5kKFswLCB0aGlzLndpZHRoXSlcbiAgICAgIC5uaWNlKCk7XG5cbiAgICAvLyB1cGRhdGUgdGhlIHlTY2FsZVxuICAgIHRoaXMueUF4aXNTY2FsZS5kb21haW4odGhpcy5kYXRhLm1hcChkID0+IGQua2V5KSk7XG5cbiAgICB0aGlzLnhBeGlzXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgIC5jYWxsKHRoaXMueEF4aXNDYWxsKTtcblxuICAgIHRoaXMueUF4aXNcbiAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgIC5kdXJhdGlvbigxMDAwKVxuICAgICAgLmNhbGwodGhpcy55QXhpc0NhbGwpO1xuXG4gICAgLy8gdXBkYXRlIHRoZSBncmlkc1xuICAgIGlmICh0aGlzLnNob3dHcmlkKSB7XG4gICAgICB0aGlzLnhHcmlkXG4gICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgLmR1cmF0aW9uKDEwMDApXG4gICAgICAgIC5jYWxsKHRoaXMueEdyaWRDYWxsKTtcbiAgICB9XG5cbiAgICAvLyBpZiAoIXRoaXMuaGlkZVlHcmlkKSB7XG4gICAgLy8gICB0aGlzLnlHcmlkXG4gICAgLy8gICAgIC50cmFuc2l0aW9uKClcbiAgICAvLyAgICAgLmR1cmF0aW9uKDEwMDApXG4gICAgLy8gICAgIC5jYWxsKHRoaXMueUdyaWRDYWxsKTtcbiAgICAvLyB9XG5cbiAgICAvLyB1cGRhdGUgdGhlIGNvbG9yIGJhciBzY2FsZVxuICAgIHRoaXMuYmFyU2NhbGUuZG9tYWluKE9iamVjdC5rZXlzKHRoaXMuZGF0YVswXSkuc2xpY2UoMSkpLnJhbmdlUm91bmQoWzAsIHRoaXMueUF4aXNTY2FsZS5iYW5kd2lkdGgoKV0pO1xuXG4gICAgdGhpcy5zdmdcbiAgICAgIC5zZWxlY3RBbGwoJy5ncmF5LWJhcicpXG4gICAgICAuZGF0YSh0aGlzLmRhdGEpXG4gICAgICAuam9pbihcbiAgICAgICAgZW50ZXIgPT5cbiAgICAgICAgICBlbnRlclxuICAgICAgICAgICAgLmFwcGVuZCgncmVjdCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JheS1iYXInKVxuICAgICAgICAgICAgLmF0dHIoJ3knLCBkID0+IHRoaXMueUF4aXNTY2FsZShkLmtleSkpXG4gICAgICAgICAgICAuYXR0cignd2lkdGgnLCB0aGlzLndpZHRoKVxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHRoaXMueUF4aXNTY2FsZS5iYW5kd2lkdGgoKSksXG4gICAgICAgIHVwZGF0ZSA9PlxuICAgICAgICAgIHVwZGF0ZVxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDEwMDApXG4gICAgICAgICAgICAuYXR0cigneScsIGQgPT4gdGhpcy55QXhpc1NjYWxlKGQua2V5KSlcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHRoaXMud2lkdGgpXG4gICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgdGhpcy55QXhpc1NjYWxlLmJhbmR3aWR0aCgpKVxuICAgICAgKTtcblxuICAgIHRoaXMuc3ZnXG4gICAgICAuc2VsZWN0QWxsKCcuYmFyLWdyb3VwJylcbiAgICAgIC5kYXRhKHRoaXMuZGF0YSlcbiAgICAgIC5qb2luKFxuICAgICAgICBlbnRlciA9PlxuICAgICAgICAgIGVudGVyXG4gICAgICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdiYXItZ3JvdXAnKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIChkLCBpKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBgdHJhbnNsYXRlKDAsICR7dGhpcy55QXhpc1NjYWxlKGQua2V5KX0pYDtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICB1cGRhdGUgPT5cbiAgICAgICAgICB1cGRhdGVcbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbigxMDAwKVxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIChkLCBpKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBgdHJhbnNsYXRlKDAsICR7dGhpcy55QXhpc1NjYWxlKGQua2V5KX0pYDtcbiAgICAgICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgdGhpcy5zdmdcbiAgICAgIC5zZWxlY3RBbGwoJy5iYXItZ3JvdXAnKVxuICAgICAgLnNlbGVjdEFsbCgnLmJhcicpXG4gICAgICAuZGF0YSgoZCwgaSkgPT4ge1xuICAgICAgICBjb25zdCBjbG9uZSA9IHsgLi4uZCB9O1xuICAgICAgICBkZWxldGUgY2xvbmUua2V5O1xuXG4gICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhjbG9uZSk7XG5cbiAgICAgICAgY29uc3Qga2V5RGF0YSA9IGtleXMubWFwKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgIHJldHVybiB7IGxhYmVsOiBrZXksIHZhbHVlOiBkW2tleV0sIHBhcmVudEluZGV4OiBpIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBrZXlEYXRhO1xuICAgICAgfSlcbiAgICAgIC5qb2luKFxuICAgICAgICBlbnRlciA9PlxuICAgICAgICAgIGVudGVyXG4gICAgICAgICAgICAuYXBwZW5kKCdyZWN0JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdiYXInKVxuICAgICAgICAgICAgLmF0dHIoXG4gICAgICAgICAgICAgICdmaWxsJyxcbiAgICAgICAgICAgICAgZCA9PiBgdXJsKCR7dGhpcy5fbG9jYXRpb24ucGF0aCgpfSNncmFkaWVudC1ob3Jpem9udGFsLSR7dGhpcy5jb2xvclJhbmdlKGQubGFiZWwpLnN1YnN0cigxKX0pYFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLmF0dHIoJ2RhdGEtY29sb3InLCBkID0+IHRoaXMuY29sb3JSYW5nZShkLmxhYmVsKSlcbiAgICAgICAgICAgIC5hdHRyKCdkYXRhLXBhcmVudC1pbmRleCcsIGQgPT4gZC5wYXJlbnRJbmRleClcbiAgICAgICAgICAgIC5hdHRyKCd4JywgMClcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIDApXG4gICAgICAgICAgICAuYXR0cigneScsIGQgPT4gdGhpcy5iYXJTY2FsZShkLmxhYmVsKSlcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB0aGlzLmJhclNjYWxlLmJhbmR3aWR0aCgpKVxuICAgICAgICAgICAgLmNhbGwoZW50ZXIgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gZW50ZXJcbiAgICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgLmR1cmF0aW9uKDUwMClcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCBkID0+IHRoaXMueEF4aXNTY2FsZShkLnZhbHVlKSk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgdXBkYXRlID0+XG4gICAgICAgICAgdXBkYXRlXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIGQgPT4gdGhpcy54QXhpc1NjYWxlKGQudmFsdWUpKVxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHRoaXMuYmFyU2NhbGUuYmFuZHdpZHRoKCkpXG4gICAgICAgICAgICAuYXR0cigneScsIGQgPT4gdGhpcy5iYXJTY2FsZShkLmxhYmVsKSksXG4gICAgICAgIGV4aXQgPT5cbiAgICAgICAgICBleGl0XG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMTAwKVxuICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgMClcbiAgICAgIClcbiAgICAgIC5vbignbW91c2VvdmVyJywgKGRhdGEsIGluZGV4LCBub2RlcykgPT4gdGhpcy5iYXJNb3VzZU92ZXIoZDNfZXZlbnQsIGRhdGEsIGluZGV4LCBub2RlcykpXG4gICAgICAub24oJ21vdXNlb3V0JywgKGRhdGEsIGluZGV4LCBub2RlcykgPT4gdGhpcy5iYXJNb3VzZU91dCgpKVxuICAgICAgLm9uKCdjbGljaycsIChkYXRhLCBpbmRleCwgbm9kZXMpID0+IHRoaXMuYmFyTW91c2VDbGljayhkM19ldmVudCwgZGF0YSwgaW5kZXgsIG5vZGVzKSk7XG5cbiAgICB0aGlzLnVwZGF0ZUxlZ2VuZCgpO1xuXG4gICAgdGhpcy5zdmcuc2VsZWN0QWxsKCcuYXhpcycpLnJhaXNlKCk7XG4gIH1cblxuICB1cGRhdGVMZWdlbmQoKSB7XG4gICAgLy8gbGVnZW5kXG4gICAgaWYgKCF0aGlzLmhpZGVMZWdlbmQpIHtcbiAgICAgIGNvbnN0IGxlZ2VuZERhdGEgPSB7IC4uLnRoaXMuZGF0YVswXSB9O1xuICAgICAgZGVsZXRlIGxlZ2VuZERhdGEua2V5O1xuICAgICAgY29uc3QgbGVnZW5kS2V5cyA9IE9iamVjdC5rZXlzKGxlZ2VuZERhdGEpLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgcmV0dXJuIHsgbGFiZWw6IGtleSB9O1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuY2hhcnRcbiAgICAgICAgLnNlbGVjdCgnLmxlZ2VuZCcpXG4gICAgICAgIC5zZWxlY3RBbGwoJy5sZWdlbmQtaXRlbScpXG4gICAgICAgIC5kYXRhKGxlZ2VuZEtleXMpXG4gICAgICAgIC5qb2luKFxuICAgICAgICAgIGVudGVyID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxpID0gZW50ZXIuYXBwZW5kKCdsaScpLmF0dHIoJ2NsYXNzJywgJ2xlZ2VuZC1pdGVtJyk7XG5cbiAgICAgICAgICAgIGxpLmluc2VydCgnc3BhbicpXG4gICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsZWdlbmQta2V5JylcbiAgICAgICAgICAgICAgLnN0eWxlKCdiYWNrZ3JvdW5kLWNvbG9yJywgZCA9PiB0aGlzLmNvbG9yUmFuZ2UoZC5sYWJlbCkpO1xuXG4gICAgICAgICAgICBsaS5pbnNlcnQoJ3NwYW4nLCAnLmxlZ2VuZC1pdGVtJylcbiAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xlZ2VuZC1sYWJlbCcpXG4gICAgICAgICAgICAgIC5odG1sKGQgPT4ge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5sZWdlbmRMYWJlbEZvcm1hdFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxlZ2VuZExhYmVsRm9ybWF0KGQubGFiZWwpO1xuXG4gICAgICAgICAgICAgICAgICBjYXNlICd0aW1lJzpcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyc2VkVGltZSA9IGQzX2lzb1BhcnNlKGQubGFiZWwpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sZWdlbmRMYWJlbEZvcm1hdChwYXJzZWRUaW1lKTtcblxuICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQubGFiZWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGxpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdXBkYXRlID0+IHtcbiAgICAgICAgICAgIHVwZGF0ZS5zZWxlY3QoJy5sZWdlbmQtbGFiZWwnKS5odG1sKGQgPT4ge1xuICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMubGVnZW5kTGFiZWxGb3JtYXRUeXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxlZ2VuZExhYmVsRm9ybWF0KGQubGFiZWwpO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAndGltZSc6XG4gICAgICAgICAgICAgICAgICBjb25zdCBwYXJzZWRUaW1lID0gZDNfaXNvUGFyc2UoZC5sYWJlbCk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sZWdlbmRMYWJlbEZvcm1hdChwYXJzZWRUaW1lKTtcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZC5sYWJlbDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB1cGRhdGU7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBleGl0ID0+IGV4aXQucmVtb3ZlKClcbiAgICAgICAgKVxuICAgICAgICAub24oJ21vdXNlb3ZlcicsIChkYXRhLCBpbmRleCwgbm9kZXMpID0+IHRoaXMubGVnZW5kTW91c2VPdmVyKGQzX2V2ZW50LCBkYXRhLCBpbmRleCwgbm9kZXMpKVxuICAgICAgICAub24oJ21vdXNlb3V0JywgKCkgPT4gdGhpcy5sZWdlbmRNb3VzZU91dCgpKVxuICAgICAgICAub24oJ2NsaWNrJywgKGRhdGEsIGluZGV4LCBub2RlcykgPT4gdGhpcy5sZWdlbmRNb3VzZUNsaWNrKGQzX2V2ZW50LCBkYXRhLCBpbmRleCwgbm9kZXMpKTtcbiAgICB9XG4gIH1cblxuICBiYXJNb3VzZU92ZXIgPSAoZXZlbnQsIGRhdGEsIGluZGV4LCBub2RlcykgPT4ge1xuICAgIGNvbnN0IG5vZGUgPSBkM19zZWxlY3Qobm9kZXNbaW5kZXhdKTtcblxuICAgIHRoaXMuY2hhcnRcbiAgICAgIC5zZWxlY3RBbGwoJy5iYXItZ3JvdXAnKVxuICAgICAgLnNlbGVjdEFsbCgnLmJhcicpXG4gICAgICAuY2xhc3NlZCgnaW5hY3RpdmUnLCB0cnVlKTtcblxuICAgIG5vZGUuY2xhc3NlZCgnaW5hY3RpdmUnLCBmYWxzZSkuc3R5bGUoJ2ZpbGwnLCBub2RlLmF0dHIoJ2RhdGEtY29sb3InKSk7XG5cbiAgICB0aGlzLnRvb2x0aXBTaG93KGRhdGEsIG5vZGVzW2luZGV4XSk7XG5cbiAgICB0aGlzLmhvdmVyZWQuZW1pdCh7IGV2ZW50LCBkYXRhIH0pO1xuICB9O1xuXG4gIGJhck1vdXNlT3V0ID0gKCkgPT4ge1xuICAgIHRoaXMuY2hhcnRcbiAgICAgIC5zZWxlY3RBbGwoJy5iYXInKVxuICAgICAgLmNsYXNzZWQoJ2luYWN0aXZlJywgZmFsc2UpXG4gICAgICAuc3R5bGUoJ2ZpbGwnLCBudWxsKTtcblxuICAgIHRoaXMudG9vbHRpcEhpZGUoKTtcbiAgfTtcblxuICBiYXJNb3VzZUNsaWNrID0gKGV2ZW50LCBkYXRhLCBpbmRleCwgbm9kZXMpID0+IHtcbiAgICB0aGlzLmNsaWNrZWQuZW1pdCh7IGV2ZW50LCBkYXRhIH0pO1xuICB9O1xuXG4gIGxlZ2VuZE1vdXNlT3ZlciA9IChldmVudCwgZGF0YSwgaW5kZXgsIG5vZGVzKSA9PiB7XG4gICAgdGhpcy5jaGFydFxuICAgICAgLnNlbGVjdEFsbCgnLmxlZ2VuZC1pdGVtJylcbiAgICAgIC5maWx0ZXIoKGQsIGkpID0+IGkgIT09IGluZGV4KVxuICAgICAgLmNsYXNzZWQoJ2luYWN0aXZlJywgdHJ1ZSk7XG5cbiAgICB0aGlzLmNoYXJ0XG4gICAgICAuc2VsZWN0QWxsKCcuYmFyLWdyb3VwJylcbiAgICAgIC5zZWxlY3RBbGwoJy5iYXInKVxuICAgICAgLmZpbHRlcigoZCwgaSkgPT4gaSAhPT0gaW5kZXgpXG4gICAgICAuY2xhc3NlZCgnaW5hY3RpdmUnLCB0cnVlKTtcblxuICAgIGNvbnN0IGJhciA9IHRoaXMuY2hhcnRcbiAgICAgIC5zZWxlY3RBbGwoJy5iYXItZ3JvdXAnKVxuICAgICAgLnNlbGVjdEFsbCgnLmJhcicpXG4gICAgICAuZmlsdGVyKChkLCBpKSA9PiBpID09PSBpbmRleClcbiAgICAgIC5jbGFzc2VkKCdpbmFjdGl2ZScsIG51bGwpO1xuXG4gICAgY29uc3QgYmFyQ29sb3IgPSBiYXIuYXR0cignZGF0YS1jb2xvcicpO1xuXG4gICAgYmFyLnN0eWxlKCdmaWxsJywgKCkgPT4gYmFyQ29sb3IpO1xuXG4gICAgdGhpcy5ob3ZlcmVkLmVtaXQoeyBldmVudCwgZGF0YSB9KTtcbiAgfTtcblxuICBsZWdlbmRNb3VzZU91dCA9ICgpID0+IHtcbiAgICB0aGlzLmNoYXJ0LnNlbGVjdEFsbCgnLmxlZ2VuZC1pdGVtJykuY2xhc3NlZCgnaW5hY3RpdmUnLCBmYWxzZSk7XG5cbiAgICB0aGlzLmNoYXJ0XG4gICAgICAuc2VsZWN0QWxsKCcuYmFyLWdyb3VwJylcbiAgICAgIC5zZWxlY3RBbGwoJy5iYXInKVxuICAgICAgLmNsYXNzZWQoJ2luYWN0aXZlJywgZmFsc2UpXG4gICAgICAuc3R5bGUoJ2ZpbGwnLCBudWxsKTtcbiAgfTtcblxuICBsZWdlbmRNb3VzZUNsaWNrID0gKGV2ZW50LCBkYXRhLCBpbmRleCwgbm9kZXMpID0+IHtcbiAgICB0aGlzLmNsaWNrZWQuZW1pdCh7IGV2ZW50LCBkYXRhIH0pO1xuICB9O1xuXG4gIHByaXZhdGUgdG9vbHRpcFNob3cgPSAoZGF0YSwgbm9kZSkgPT4ge1xuICAgIGNvbnN0IGRpbWVuc2lvbnMgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHNjcm9sbCA9IHRoaXMuX3Njcm9sbC5nZXRTY3JvbGxQb3NpdGlvbigpO1xuICAgIGxldCBsYWJlbDtcblxuICAgIHN3aXRjaCAodGhpcy50b29sdGlwTGFiZWxGb3JtYXRUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICBsYWJlbCA9IHRoaXMudG9vbHRpcExhYmVsRm9ybWF0KGRhdGEubGFiZWwpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAndGltZSc6XG4gICAgICAgIGNvbnN0IHBhcnNlZFRpbWUgPSBkM19pc29QYXJzZShkYXRhLmxhYmVsKTtcbiAgICAgICAgbGFiZWwgPSB0aGlzLnRvb2x0aXBMYWJlbEZvcm1hdChwYXJzZWRUaW1lKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxhYmVsID0gZGF0YS5sYWJlbDtcbiAgICB9XG5cbiAgICBjb25zdCB2YWx1ZSA9XG4gICAgICB0aGlzLnRvb2x0aXBWYWx1ZUZvcm1hdCA9PT0gbnVsbFxuICAgICAgICA/IGA8ZGl2IGNsYXNzPVwidG9vbHRpcC12YWx1ZVwiPiR7ZGF0YS52YWx1ZX08L2Rpdj5gXG4gICAgICAgIDogYDxkaXYgY2xhc3M9XCJ0b29sdGlwLXZhbHVlXCI+JHt0aGlzLnRvb2x0aXBWYWx1ZUZvcm1hdChkYXRhLnZhbHVlKX08L2Rpdj5gO1xuXG4gICAgdGhpcy50b29sdGlwLmh0bWwoXG4gICAgICBgXG4gICAgICAgICR7bGFiZWx9XG4gICAgICAgICR7dmFsdWV9XG4gICAgICBgXG4gICAgKTtcblxuICAgIGNvbnN0IHRvb2x0aXBPZmZzZXRXaWR0aCA9ICt0aGlzLnRvb2x0aXAubm9kZSgpLm9mZnNldFdpZHRoIC8gMjtcbiAgICBjb25zdCB0b29sdGlwT2Zmc2V0SGVpZ2h0ID0gK3RoaXMudG9vbHRpcC5ub2RlKCkub2Zmc2V0SGVpZ2h0O1xuICAgIGNvbnN0IHRvb2x0aXBUaXBTaXplID0gODtcblxuICAgIGlmICh0aGlzLnZlcnRpY2FsKSB7XG4gICAgICB0aGlzLnRvb2x0aXAuc3R5bGUoJ3RvcCcsIGAkeytzY3JvbGxbMV0gKyArZGltZW5zaW9ucy50b3AgLSB0b29sdGlwT2Zmc2V0SGVpZ2h0IC0gdG9vbHRpcFRpcFNpemV9cHhgKTtcbiAgICAgIHRoaXMudG9vbHRpcC5zdHlsZSgnbGVmdCcsIGAkeytzY3JvbGxbMF0gKyArZGltZW5zaW9ucy5sZWZ0IC0gdG9vbHRpcE9mZnNldFdpZHRoICsgK2RpbWVuc2lvbnMud2lkdGggLyAyfXB4YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudG9vbHRpcC5zdHlsZSgndG9wJywgYCR7K3Njcm9sbFsxXSArICtkaW1lbnNpb25zLnRvcCArICtkaW1lbnNpb25zLmhlaWdodCAvIDIgLSB0b29sdGlwT2Zmc2V0SGVpZ2h0IC8gMn1weGApO1xuICAgICAgdGhpcy50b29sdGlwLnN0eWxlKCdsZWZ0JywgYCR7K3Njcm9sbFswXSArICtkaW1lbnNpb25zLnJpZ2h0ICsgdG9vbHRpcFRpcFNpemV9cHhgKTtcbiAgICB9XG5cbiAgICB0aGlzLnRvb2x0aXAuc3R5bGUoJ29wYWNpdHknLCAxKTtcbiAgfTtcblxuICBwcml2YXRlIHRvb2x0aXBIaWRlID0gKCkgPT4ge1xuICAgIHRoaXMudG9vbHRpcC5zdHlsZSgnb3BhY2l0eScsIDApO1xuICB9O1xuXG4gIHByaXZhdGUgeEF4aXNGb3JtYXR0ZXIgPSBpdGVtID0+IHtcbiAgICBzd2l0Y2ggKHRoaXMueEF4aXNGb3JtYXRUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICByZXR1cm4gdGhpcy54QXhpc0Zvcm1hdChpdGVtKTtcblxuICAgICAgY2FzZSAndGltZSc6XG4gICAgICAgIGNvbnN0IHBhcnNlRGF0ZSA9IGQzX2lzb1BhcnNlKGl0ZW0pO1xuICAgICAgICByZXR1cm4gdGhpcy54QXhpc0Zvcm1hdChwYXJzZURhdGUpO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG4gIH07XG5cbiAgcHJpdmF0ZSB5QXhpc0Zvcm1hdHRlciA9IGl0ZW0gPT4ge1xuICAgIHN3aXRjaCAodGhpcy55QXhpc0Zvcm1hdFR5cGUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIHJldHVybiB0aGlzLnlBeGlzRm9ybWF0KGl0ZW0pO1xuXG4gICAgICBjYXNlICd0aW1lJzpcbiAgICAgICAgY29uc3QgcGFyc2VEYXRlID0gZDNfaXNvUGFyc2UoaXRlbSk7XG4gICAgICAgIHJldHVybiB0aGlzLnlBeGlzRm9ybWF0KHBhcnNlRGF0ZSk7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==