/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ElementRef, HostBinding, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ViewportScroller, Location } from '@angular/common';
import { select as d3_select, scaleLinear as d3_scaleLinear, scaleOrdinal as d3_scaleOrdinal, format as d3_format, event as d3_event, timeFormat as d3_timeFormat, isoParse as d3_isoParse, sum as d3_sum, axisBottom as d3_axisBottom, easeLinear as d3_easeLinear } from 'd3';
import { PbdsDatavizService } from './dataviz.service';
export class PbdsDatavizSingleStackedBarComponent {
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
        this.singleStackedBarClass = true;
        this.width = 300;
        this.height = 40;
        this.nullValueText = 'No data available';
        this.percentage = false;
        this.marginTop = 10;
        this.marginRight = 20;
        this.marginBottom = 35;
        this.marginLeft = 15;
        this.barMargin = 2;
        this.hideXAxis = false;
        this.xAxisTicks = 6;
        this.xAxisTitle = null;
        this.xAxisFormatType = null;
        this.xAxisFormatString = '';
        this.xAxisTickLabelSuffix = '';
        this.hideXGrid = false;
        this.hideLegend = false;
        this.hideLegendTooltip = true;
        this.legendWidth = 105 + 28; // hardcoded legend width + left margin, do not document until feedback
        // hardcoded legend width + left margin, do not document until feedback
        this.legendPosition = 'bottom';
        this.legendLabelFormatType = null;
        this.legendLabelFormatString = '';
        this.hideTooltip = false;
        this.tooltipLabelFormatType = null;
        this.tooltipLabelFormatString = '';
        this.tooltipDateFormatString = '%b %e, %Y';
        this.tooltipValueFormatType = null;
        this.tooltipValueFormatString = '';
        this.tooltipValueSuffix = '';
        this.tooltipPercentFormatString = '.2%';
        this.compareChangeFormatString = '.2%';
        this.monochrome = false;
        this.hovered = new EventEmitter();
        this.clicked = new EventEmitter();
        this.isSingleData = false;
        this.isCompare = false;
        this.barPadding = 40;
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
            this.chart.selectAll('.bar').classed('inactive', true);
            node.classed('inactive', false);
            this.chart
                .selectAll('.legend-item')
                .filter((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => {
                // debugger;
                return i !== index;
            }))
                .classed('inactive', true);
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
            this.chart.selectAll('.legend-item').classed('inactive', false);
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
            const percentage = data.value / d3_sum(this.data, (/**
             * @param {?} d
             * @return {?}
             */
            (d) => d.value));
            /** @type {?} */
            const comparePercentage = data.compareValue / d3_sum(this.data, (/**
             * @param {?} d
             * @return {?}
             */
            (d) => d.compareValue));
            /** @type {?} */
            let tooltipLabel = ``;
            /** @type {?} */
            let tooltipCompareDaterangeMargin = ``;
            /** @type {?} */
            let tooltipCompareDaterange = ``;
            /** @type {?} */
            let tooltipCompareValue = ``;
            /** @type {?} */
            let tooltipDaterangeMargin = ``;
            /** @type {?} */
            let tooltipDaterange = ``;
            /** @type {?} */
            let tooltipValue = `${this.nullValueText}`;
            /** @type {?} */
            let tooltipIndicator = '';
            // tooltip label
            if (!this.isSingleData) {
                switch (this.tooltipLabelFormatType) {
                    case 'number':
                        tooltipLabel = this.tooltipLabelFormat(data.label);
                        break;
                    case 'time':
                        /** @type {?} */
                        const parsedTime = d3_isoParse(data.label);
                        tooltipLabel = this.tooltipLabelFormat(parsedTime);
                        break;
                    default:
                        tooltipLabel = data.label;
                }
            }
            // tooltip compare daterange
            if (this.isCompare && data.compareStartDate && data.compareEndDate) {
                tooltipCompareDaterangeMargin = `mt-2`;
                tooltipCompareDaterange = `${this.tooltipDateFormat(d3_isoParse(data.compareStartDate))} - ${this.tooltipDateFormat(d3_isoParse(data.compareEndDate))}`;
            }
            // tooltip compare value
            if (this.percentage && this.isCompare && data.compareValue) {
                tooltipCompareValue =
                    this.tooltipValueFormat === null
                        ? `${this.tooltipPercentFormat(comparePercentage)} (${data.comparveValue}${this.tooltipValueSuffix})`
                        : `${this.tooltipPercentFormat(comparePercentage)} (${this.tooltipValueFormat(data.compareValue)}${this.tooltipValueSuffix})`;
            }
            else if (this.isCompare && data.compareValue !== null) {
                tooltipCompareValue =
                    this.tooltipValueFormat === null
                        ? `${data.compareValue}${this.tooltipValueSuffix} (${this.tooltipPercentFormat(comparePercentage)})`
                        : `${this.tooltipValueFormat(data.compareValue)}${this.tooltipValueSuffix} (${this.tooltipPercentFormat(comparePercentage)})`;
            }
            else if (this.isCompare && data.compareValue === null) {
                tooltipCompareValue = `${this.nullValueText}`;
            }
            // tooltip daterange
            if (data.startDate && data.endDate) {
                tooltipDaterange = `${this.tooltipDateFormat(d3_isoParse(data.startDate))} - ${this.tooltipDateFormat(d3_isoParse(data.endDate))}`;
            }
            //tooltip daterange margin
            if (tooltipLabel !== '') {
                tooltipDaterangeMargin = `mt-2`;
            }
            // tooltip value
            if (this.isSingleData && this.percentage && data.value) {
                tooltipValue = this.tooltipValueFormat === null ? `${data.value}` : `${this.tooltipValueFormat(data.value)}`;
            }
            else if (this.isSingleData && data.value !== null) {
                tooltipValue =
                    this.tooltipValueFormat === null
                        ? `${data.value}${this.tooltipValueSuffix}`
                        : `${this.tooltipValueFormat(data.value)}${this.tooltipValueSuffix}`;
            }
            else if (!this.isSingleData && this.percentage && data.value !== null) {
                tooltipValue =
                    this.tooltipValueFormat === null
                        ? `${this.tooltipPercentFormat(percentage)} (${data.value}${this.tooltipValueSuffix})`
                        : `${this.tooltipPercentFormat(percentage)} (${this.tooltipValueFormat(data.value)}${this.tooltipValueSuffix})`;
            }
            else if (!this.isSingleData && data.value !== null) {
                tooltipValue =
                    this.tooltipValueFormat === null
                        ? `${data.value}${this.tooltipValueSuffix} (${this.tooltipPercentFormat(percentage)})`
                        : `${this.tooltipValueFormat(data.value)}${this.tooltipValueSuffix} (${this.tooltipPercentFormat(percentage)})`;
            }
            // tooltip metric indicator
            if (!this.isSingleData && this.isCompare && data.value !== null && data.compareValue !== null) {
                tooltipIndicator = `<div class="metric-block-indicator ${data.compareChangeDirection} ${data.compareChangeInverse ? 'inverse' : ''} ml-2"><span>${this.tooltipCompareChangeFormat(data.compareChangeValue)}</span></div>`;
            }
            this.tooltip.html((/**
             * @return {?}
             */
            () => {
                return `
        <div class="tooltip-label font-weight-bold">${tooltipLabel}</div>
        <div class="${tooltipCompareDaterangeMargin}">${tooltipCompareDaterange}</div>
        <div class="tooltip-value font-weight-bold">${tooltipCompareValue}</div>
        <div class="${tooltipDaterangeMargin}">${tooltipDaterange}</div>
        <div class="tooltip-value"><span class="font-weight-bold">${tooltipValue}</span> <span>${tooltipIndicator}</span></div>
      `;
            }));
            /** @type {?} */
            const tooltipOffsetWidth = +this.tooltip.node().offsetWidth / 2;
            /** @type {?} */
            const tooltipOffsetHeight = +this.tooltip.node().offsetHeight;
            /** @type {?} */
            const tooltipTipSize = 8;
            this.tooltip.style('top', `${+scroll[1] + +dimensions.top - tooltipOffsetHeight - tooltipTipSize}px`);
            if (this.data.length > 1) {
                this.tooltip.style('left', `${+scroll[0] + +dimensions.left - tooltipOffsetWidth + +dimensions.width / 2}px`);
            }
            else {
                this.tooltip.style('left', `${+scroll[0] - tooltipOffsetWidth + +dimensions.right}px`);
            }
            this.tooltip.style('opacity', 1);
        });
        this.tooltipHide = (/**
         * @return {?}
         */
        () => {
            this.tooltip.style('opacity', 0);
        });
        this.legendMouseOver = (/**
         * @param {?} event
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (event, data, index, nodes) => {
            if (!this.hideLegendTooltip) {
                /** @type {?} */
                const barHover = this.svg
                    .selectAll('.bar')
                    .filter((/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                (d, i) => i === index))
                    .node();
                this.tooltipShow(data, barHover);
            }
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
                .selectAll('.bar')
                .filter((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => i !== index))
                .classed('inactive', true);
            this.chart
                .selectAll('.bar')
                .filter((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => i === index))
                .classed('inactive', null);
            this.hovered.emit({ event, data });
        });
        this.legendMouseOut = (/**
         * @return {?}
         */
        () => {
            this.chart.selectAll('.legend-item').classed('inactive', false);
            this.chart
                .selectAll('.bar')
                .classed('inactive', false)
                .style('fill', null);
            // hide tooltip for zero/null values
            this.tooltipHide();
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
        this.xAxisFormatter = (/**
         * @param {?} item
         * @return {?}
         */
        item => {
            switch (this.xAxisFormatType) {
                case 'number':
                    return `${this.xAxisFormat(item)}${this.xAxisTickLabelSuffix}`;
                default:
                    return `${item}${this.xAxisTickLabelSuffix}`;
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.height = +this.height + this.barPadding;
        this.margin = {
            top: +this.marginTop,
            right: +this.marginRight,
            bottom: +this.marginBottom,
            left: +this.marginLeft
        };
        this.isSingleData = this.data.length === 1 ? true : false;
        this.isCompare = Object.keys(this.data[0]).includes('compareValue');
        switch (this.xAxisFormatType) {
            case 'number':
                this.xAxisFormat = d3_format(this.xAxisFormatString);
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
        switch (this.tooltipValueFormatType) {
            case 'number':
                this.tooltipValueFormat = d3_format(this.tooltipValueFormatString);
                break;
            default:
                this.tooltipValueFormat = null;
        }
        this.tooltipDateFormat = d3_timeFormat(this.tooltipDateFormatString);
        this.tooltipPercentFormat = d3_format(this.tooltipPercentFormatString);
        this.tooltipCompareChangeFormat = d3_format(this.compareChangeFormatString);
        // defaults for all chart types
        this.hideXAxisZero = false;
        this.hideXAxisDomain = true;
        this.hideXAxisTicks = true;
        this.xAxisTickSize = 8;
        this.xAxisTickSizeOuter = 0;
        this.xAxisTitleMargin = this.xAxisTitle ? 20 : 0;
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
            return +this.width + this.margin.left + this.margin.right;
        }))
            .attr('height', +this.height + this.margin.top + this.margin.bottom + this.xAxisTitleMargin)
            .attr('class', 'img-fluid')
            .attr('preserveAspectRatio', 'xMinYMin meet')
            .attr('viewBox', (/**
         * @return {?}
         */
        () => {
            return `-${this.margin.left} -${this.margin.top} ${+this.width + this.margin.left + this.margin.right} ${+this
                .height +
                this.margin.top +
                this.margin.bottom +
                this.xAxisTitleMargin}`;
        }));
        // TOOLTIP
        if (!this.hideTooltip) {
            this.tooltip = d3_select('body')
                .append('div')
                .attr('class', 'pbds-tooltip south')
                .classed('pbds-tooltip-compare', this.isCompare)
                .style('opacity', 0)
                .attr('aria-hidden', 'true'); // hide tooltip for accessibility
        }
        // add legend classes
        if (!this.hideLegend && this.data.length > 1) {
            this.chart.classed('pbds-chart-legend-bottom', this.legendPosition === 'bottom' ? true : false);
            this.chart.append('ul').attr('class', `legend legend-${this.legendPosition}`);
        }
        // X AXIS
        this.xAxisScale = d3_scaleLinear()
            .domain([0, Math.ceil(d3_sum(this.data, (/**
             * @param {?} d
             * @return {?}
             */
            (d) => d.value)))])
            .range([0, +this.width]);
        this.xAxisCall = d3_axisBottom(this.xAxisScale)
            // .tickValues([0, d3_sum(this.data, (d: any) => d.value)])
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
            .classed('axis-ticks-hidden', this.hideXAxisTicks);
        // .call(this.xAxisCall);
        // X GRIDLINES
        if (!this.hideXGrid) {
            this.xGridCall = d3_axisBottom(this.xAxisScale).tickSize(-this.height);
            this.xGrid = this.svg
                .append('g')
                .attr('class', 'grid grid-x')
                .classed('grid-zero-hidden', this.hideXAxisZero)
                .attr('transform', `translate(0, ${this.height})`)
                .call(this.xGridCall);
        }
        if (this.xAxisTitle) {
            this.svg
                .append('text')
                .attr('class', 'axis-title')
                .attr('text-anchor', 'center')
                .attr('x', this.width / 2 - this.margin.left)
                .attr('y', this.height + this.margin.top + (!this.hideXAxis ? 40 : 0))
                .text(this.xAxisTitle);
        }
        // build color ranges
        /** @type {?} */
        let colors;
        if (this.isSingleData) {
            colors = this._dataviz.createGradientDefs(this.svg, this.monochrome, this.theme, false);
        }
        else if (this.monochrome) {
            colors = this._dataviz.getColors(this.monochrome, this.theme).reverse();
        }
        else {
            colors = this._dataviz.getColors(this.monochrome, this.theme);
        }
        this.colorRange = d3_scaleOrdinal().range(colors);
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
    /**
     * @return {?}
     */
    updateChart() {
        /** @type {?} */
        const sumValues = d3_sum(this.data, (/**
         * @param {?} d
         * @return {?}
         */
        (d) => d.value));
        /** @type {?} */
        const isLastBarZero = this.data[this.data.length - 1].value === 0 || this.data[this.data.length - 1].value === null ? true : false;
        /** @type {?} */
        let lastBarZeroCount = 0;
        /** @type {?} */
        const cloneData = [...this.data];
        /** @type {?} */
        let isLast = false;
        cloneData.reverse().forEach((/**
         * @param {?} value
         * @param {?} index
         * @param {?} array
         * @return {?}
         */
        (value, index, array) => {
            if ((value.value === 0 || value.value === null) && !isLast) {
                lastBarZeroCount++;
            }
            else {
                isLast = true;
            }
        }));
        if (this.percentage && !this.isSingleData) {
            this.xAxisScale.domain([0, sumValues]).range([0, +this.width]);
            this.xAxisCall.tickValues([0, sumValues * 0.25, sumValues * 0.5, sumValues * 0.75, sumValues]);
            this.xAxis.call(this.xAxisCall);
            this.xGridCall.tickValues([0, sumValues * 0.25, sumValues * 0.5, sumValues * 0.75, sumValues]);
            this.xGrid.call(this.xGridCall);
            this.svg
                .select('.axis-x')
                .selectAll('text')
                .html((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => {
                /** @type {?} */
                const format = d3_format('.0%');
                return format(i * 0.25);
            }));
        }
        else if (this.percentage && this.isSingleData) {
            this.xAxisScale.domain([0, 1.0]).range([0, +this.width]);
            this.xAxisCall.tickValues([0, 0.25, 0.5, 0.75, 1.0]);
            this.xAxis.call(this.xAxisCall);
            this.xGridCall.tickValues([0, 0.25, 0.5, 0.75, 1.0]);
            this.xGrid.call(this.xGridCall);
            this.svg
                .select('.axis-x')
                .selectAll('text')
                .html((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => {
                /** @type {?} */
                const format = d3_format('.0%');
                return format(i * 0.25);
            }));
        }
        else {
            this.xAxisScale.domain([0, Math.ceil(sumValues)]).range([0, +this.width]);
            this.xGridCall.tickValues(this.xAxisScale.ticks().filter((/**
             * @param {?} n
             * @return {?}
             */
            n => Number.isInteger(n)))); // remove decimal grid values
            this.xAxis
                .transition()
                .duration(1000)
                .call(this.xAxisCall);
            // update the grids
            if (!this.hideXGrid) {
                this.xGrid
                    .transition()
                    .duration(1000)
                    .call(this.xGridCall);
            }
        }
        this.svg
            .selectAll('.bar')
            .data(this.data)
            .join((/**
         * @param {?} enter
         * @return {?}
         */
        enter => enter
            .append('rect')
            .attr('class', 'bar')
            .attr('width', 0)
            .attr('height', (/**
         * @return {?}
         */
        () => {
            return this.height - this.barPadding;
        }))
            .attr('fill', (/**
         * @param {?} d
         * @return {?}
         */
        d => {
            if (this.isSingleData) {
                return `url(${this._location.path()}#gradient-horizontal-${this.colorRange(d.label).substr(1)})`;
            }
            else {
                return this.colorRange(d.label);
            }
        }))
            .attr('y', (/**
         * @return {?}
         */
        () => {
            return this.barPadding / 2;
        }))
            .attr('x', (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        (d, i) => {
            return this.data.slice(0, i).reduce((/**
             * @param {?} acc
             * @param {?} item
             * @return {?}
             */
            (acc, item) => {
                // console.log(acc, item, acc + this.xAxisScale(item.value) + this.barMargin);
                return +acc + +this.xAxisScale(item.value);
            }), 1);
        }))
            .attr('pointer-events', 'none')
            .call((/**
         * @param {?} enter
         * @return {?}
         */
        enter => {
            return (enter
                .transition()
                // .duration(1000)
                .delay((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => i * 250))
                .ease(d3_easeLinear)
                .attr('width', (/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => {
                // debugger;
                if (i === this.data.length - lastBarZeroCount - 1 && isLastBarZero) {
                    return this.xAxisScale(d.value);
                }
                else if (i !== this.data.length - 1) {
                    /** @type {?} */
                    let width = this.xAxisScale(d.value) - +this.barMargin;
                    width = Math.sign(width) === -1 ? 0 : width; // handle negative values
                    return width;
                }
                else {
                    return this.xAxisScale(d.value);
                }
            }))
                .transition()
                .attr('pointer-events', 'auto'));
        }))), (/**
         * @param {?} update
         * @return {?}
         */
        update => update
            .attr('pointer-events', 'none')
            .transition()
            .duration(1000)
            .attr('width', (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        (d, i) => {
            if (i === this.data.length - 1) {
                return this.xAxisScale(d.value);
            }
            else {
                return this.xAxisScale(d.value) - this.barMargin;
            }
        }))
            .attr('x', (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        (d, i) => {
            return this.data.slice(0, i).reduce((/**
             * @param {?} acc
             * @param {?} item
             * @return {?}
             */
            (acc, item) => {
                return acc + +this.xAxisScale(item.value);
            }), 0);
        }))
            .transition()
            .attr('pointer-events', 'auto')), (/**
         * @param {?} exit
         * @return {?}
         */
        exit => exit
            .transition()
            .attr('pointer-events', 'none')
            .remove()))
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
        if (!this.hideLegend) {
            this.chart
                .select('.legend')
                .selectAll('.legend-item')
                .data(this.data)
                .join((/**
             * @param {?} enter
             * @return {?}
             */
            enter => {
                /** @type {?} */
                const li = enter
                    .append('li')
                    .attr('class', 'legend-item')
                    .classed('align-items-start', this.isCompare);
                li.insert('span')
                    .attr('class', 'legend-key')
                    .style('background-color', (/**
                 * @param {?} d
                 * @return {?}
                 */
                d => this.colorRange(d.label)))
                    .classed('mt-1', this.isCompare);
                li.insert('span')
                    .attr('class', 'legend-description')
                    .classed('d-flex', this.isCompare)
                    .classed('flex-column', this.isCompare);
                li.select('.legend-description')
                    .insert('span')
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
                if (this.isCompare) {
                    li.select('.legend-description')
                        .insert('div')
                        .attr('class', 'legend-change');
                    li.select('.legend-change').html((/**
                     * @param {?} d
                     * @return {?}
                     */
                    d => {
                        return `<div class="metric-block-indicator ${d.compareChangeDirection} ${d.compareChangeInverse ? 'inverse' : ''} mt-1"><span>${this.tooltipCompareChangeFormat(d.compareChangeValue)}</span></div>`;
                    }));
                }
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
PbdsDatavizSingleStackedBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'pbds-dataviz-single-stacked-bar',
                template: ``,
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
PbdsDatavizSingleStackedBarComponent.ctorParameters = () => [
    { type: PbdsDatavizService },
    { type: ElementRef },
    { type: ViewportScroller },
    { type: Location }
];
PbdsDatavizSingleStackedBarComponent.propDecorators = {
    chartClass: [{ type: HostBinding, args: ['class.pbds-chart',] }],
    singleStackedBarClass: [{ type: HostBinding, args: ['class.pbds-chart-single-stacked-bar',] }],
    data: [{ type: Input }],
    width: [{ type: Input }],
    height: [{ type: Input }],
    nullValueText: [{ type: Input }],
    percentage: [{ type: Input }],
    marginTop: [{ type: Input }],
    marginRight: [{ type: Input }],
    marginBottom: [{ type: Input }],
    marginLeft: [{ type: Input }],
    barMargin: [{ type: Input }],
    hideXAxis: [{ type: Input }],
    xAxisTicks: [{ type: Input }],
    xAxisTitle: [{ type: Input }],
    xAxisFormatType: [{ type: Input }],
    xAxisFormatString: [{ type: Input }],
    xAxisTickLabelSuffix: [{ type: Input }],
    hideXGrid: [{ type: Input }],
    hideLegend: [{ type: Input }],
    hideLegendTooltip: [{ type: Input }],
    legendWidth: [{ type: Input }],
    legendPosition: [{ type: Input }],
    legendLabelFormatType: [{ type: Input }],
    legendLabelFormatString: [{ type: Input }],
    hideTooltip: [{ type: Input }],
    tooltipLabelFormatType: [{ type: Input }],
    tooltipLabelFormatString: [{ type: Input }],
    tooltipDateFormatString: [{ type: Input }],
    tooltipValueFormatType: [{ type: Input }],
    tooltipValueFormatString: [{ type: Input }],
    tooltipValueSuffix: [{ type: Input }],
    tooltipPercentFormatString: [{ type: Input }],
    compareChangeFormatString: [{ type: Input }],
    monochrome: [{ type: Input }],
    theme: [{ type: Input }],
    hovered: [{ type: Output }],
    clicked: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.chartClass;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.singleStackedBarClass;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.data;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.width;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.height;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.nullValueText;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.percentage;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.marginTop;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.marginRight;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.marginBottom;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.marginLeft;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.barMargin;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.hideXAxis;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.xAxisTicks;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.xAxisTitle;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.xAxisFormatType;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.xAxisFormatString;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.xAxisTickLabelSuffix;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.hideXGrid;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.hideLegend;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.hideLegendTooltip;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.legendWidth;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.legendPosition;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.legendLabelFormatType;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.legendLabelFormatString;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.hideTooltip;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.tooltipLabelFormatType;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.tooltipLabelFormatString;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.tooltipDateFormatString;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.tooltipValueFormatType;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.tooltipValueFormatString;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.tooltipValueSuffix;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.tooltipPercentFormatString;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.compareChangeFormatString;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.monochrome;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.theme;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.hovered;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.clicked;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizSingleStackedBarComponent.prototype.isSingleData;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizSingleStackedBarComponent.prototype.isCompare;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizSingleStackedBarComponent.prototype.chart;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizSingleStackedBarComponent.prototype.svg;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizSingleStackedBarComponent.prototype.margin;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizSingleStackedBarComponent.prototype.colorRange;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizSingleStackedBarComponent.prototype.barPadding;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizSingleStackedBarComponent.prototype.xAxisCall;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizSingleStackedBarComponent.prototype.xAxis;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizSingleStackedBarComponent.prototype.xAxisScale;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizSingleStackedBarComponent.prototype.xAxisTickSize;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizSingleStackedBarComponent.prototype.xAxisTickSizeOuter;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizSingleStackedBarComponent.prototype.xAxisFormat;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizSingleStackedBarComponent.prototype.xAxisTitleMargin;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizSingleStackedBarComponent.prototype.hideXAxisDomain;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizSingleStackedBarComponent.prototype.hideXAxisZero;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizSingleStackedBarComponent.prototype.hideXAxisTicks;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizSingleStackedBarComponent.prototype.xGrid;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizSingleStackedBarComponent.prototype.xGridCall;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizSingleStackedBarComponent.prototype.legendLabelFormat;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizSingleStackedBarComponent.prototype.tooltip;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizSingleStackedBarComponent.prototype.tooltipLabelFormat;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizSingleStackedBarComponent.prototype.tooltipValueFormat;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizSingleStackedBarComponent.prototype.tooltipDateFormat;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizSingleStackedBarComponent.prototype.tooltipPercentFormat;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizSingleStackedBarComponent.prototype.tooltipCompareChangeFormat;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.barMouseOver;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.barMouseOut;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.barMouseClick;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizSingleStackedBarComponent.prototype.tooltipShow;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizSingleStackedBarComponent.prototype.tooltipHide;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.legendMouseOver;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.legendMouseOut;
    /** @type {?} */
    PbdsDatavizSingleStackedBarComponent.prototype.legendMouseClick;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizSingleStackedBarComponent.prototype.xAxisFormatter;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizSingleStackedBarComponent.prototype._dataviz;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizSingleStackedBarComponent.prototype._element;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizSingleStackedBarComponent.prototype._scroll;
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizSingleStackedBarComponent.prototype._location;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXZpei1zaW5nbGUtc3RhY2tlZC1iYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcGItZGVzaWduLXN5c3RlbS8iLCJzb3VyY2VzIjpbImxpYi9kYXRhdml6L2RhdGF2aXotc2luZ2xlLXN0YWNrZWQtYmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxLQUFLLEVBQ0wsVUFBVSxFQUNWLFdBQVcsRUFHWCxNQUFNLEVBQ04sWUFBWSxFQUNaLHVCQUF1QixFQUV4QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFN0QsT0FBTyxFQUNMLE1BQU0sSUFBSSxTQUFTLEVBQ25CLFdBQVcsSUFBSSxjQUFjLEVBQzdCLFlBQVksSUFBSSxlQUFlLEVBQy9CLE1BQU0sSUFBSSxTQUFTLEVBQ25CLEtBQUssSUFBSSxRQUFRLEVBQ2pCLFVBQVUsSUFBSSxhQUFhLEVBQzNCLFFBQVEsSUFBSSxXQUFXLEVBQ3ZCLEdBQUcsSUFBSSxNQUFNLEVBQ2IsVUFBVSxJQUFJLGFBQWEsRUFDM0IsVUFBVSxJQUFJLGFBQWEsRUFDNUIsTUFBTSxJQUFJLENBQUM7QUFFWixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQVN2RCxNQUFNLE9BQU8sb0NBQW9DOzs7Ozs7O0lBOEkvQyxZQUNVLFFBQTRCLEVBQzVCLFFBQW9CLEVBQ3BCLE9BQXlCLEVBQ3pCLFNBQW1CO1FBSG5CLGFBQVEsR0FBUixRQUFRLENBQW9CO1FBQzVCLGFBQVEsR0FBUixRQUFRLENBQVk7UUFDcEIsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUFDekIsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQWhKN0IsZUFBVSxHQUFHLElBQUksQ0FBQztRQUdsQiwwQkFBcUIsR0FBRyxJQUFJLENBQUM7UUFNN0IsVUFBSyxHQUFHLEdBQUcs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LDhEQVVFOztJQUVGLGdFQUVFOzs7OztJQUVGLDhEQVFFOzs7OztJQW5tQkEsd0RBQW9DOzs7OztJQUNwQyx3REFBNEI7Ozs7O0lBQzVCLHVEQUFpQzs7Ozs7SUFDakMseURBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIElucHV0LFxuICBFbGVtZW50UmVmLFxuICBIb3N0QmluZGluZyxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIE9uRGVzdHJveVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgVmlld3BvcnRTY3JvbGxlciwgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQge1xuICBzZWxlY3QgYXMgZDNfc2VsZWN0LFxuICBzY2FsZUxpbmVhciBhcyBkM19zY2FsZUxpbmVhcixcbiAgc2NhbGVPcmRpbmFsIGFzIGQzX3NjYWxlT3JkaW5hbCxcbiAgZm9ybWF0IGFzIGQzX2Zvcm1hdCxcbiAgZXZlbnQgYXMgZDNfZXZlbnQsXG4gIHRpbWVGb3JtYXQgYXMgZDNfdGltZUZvcm1hdCxcbiAgaXNvUGFyc2UgYXMgZDNfaXNvUGFyc2UsXG4gIHN1bSBhcyBkM19zdW0sXG4gIGF4aXNCb3R0b20gYXMgZDNfYXhpc0JvdHRvbSxcbiAgZWFzZUxpbmVhciBhcyBkM19lYXNlTGluZWFyXG59IGZyb20gJ2QzJztcblxuaW1wb3J0IHsgUGJkc0RhdGF2aXpTZXJ2aWNlIH0gZnJvbSAnLi9kYXRhdml6LnNlcnZpY2UnO1xuaW1wb3J0IHsgUGJkc0RhdGF2aXpTaW5nbGVTdGFja2VkQmFyLCBQYmRzRGF0YXZpelNpbmdsZVN0YWNrZWRCYXJDb21wYXJlIH0gZnJvbSAnLi9kYXRhdml6LmludGVyZmFjZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYmRzLWRhdGF2aXotc2luZ2xlLXN0YWNrZWQtYmFyJyxcbiAgdGVtcGxhdGU6IGBgLFxuICBzdHlsZXM6IFtdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBQYmRzRGF0YXZpelNpbmdsZVN0YWNrZWRCYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5wYmRzLWNoYXJ0JylcbiAgY2hhcnRDbGFzcyA9IHRydWU7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5wYmRzLWNoYXJ0LXNpbmdsZS1zdGFja2VkLWJhcicpXG4gIHNpbmdsZVN0YWNrZWRCYXJDbGFzcyA9IHRydWU7XG5cbiAgQElucHV0KClcbiAgZGF0YTogQXJyYXk8UGJkc0RhdGF2aXpTaW5nbGVTdGFja2VkQmFyIHwgUGJkc0RhdGF2aXpTaW5nbGVTdGFja2VkQmFyQ29tcGFyZT47XG5cbiAgQElucHV0KClcbiAgd2lkdGggPSAzMDA7XG5cbiAgQElucHV0KClcbiAgaGVpZ2h0ID0gNDA7XG5cbiAgQElucHV0KClcbiAgbnVsbFZhbHVlVGV4dCA9ICdObyBkYXRhIGF2YWlsYWJsZSc7XG5cbiAgQElucHV0KClcbiAgcGVyY2VudGFnZSA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIG1hcmdpblRvcCA9IDEwO1xuXG4gIEBJbnB1dCgpXG4gIG1hcmdpblJpZ2h0ID0gMjA7XG5cbiAgQElucHV0KClcbiAgbWFyZ2luQm90dG9tID0gMzU7XG5cbiAgQElucHV0KClcbiAgbWFyZ2luTGVmdCA9IDE1O1xuXG4gIEBJbnB1dCgpXG4gIGJhck1hcmdpbiA9IDI7XG5cbiAgQElucHV0KClcbiAgaGlkZVhBeGlzID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgeEF4aXNUaWNrcyA9IDY7XG5cbiAgQElucHV0KClcbiAgeEF4aXNUaXRsZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgQElucHV0KClcbiAgeEF4aXNGb3JtYXRUeXBlOiAnbnVtYmVyJyA9IG51bGw7XG5cbiAgQElucHV0KClcbiAgeEF4aXNGb3JtYXRTdHJpbmcgPSAnJztcblxuICBASW5wdXQoKVxuICB4QXhpc1RpY2tMYWJlbFN1ZmZpeCA9ICcnO1xuXG4gIEBJbnB1dCgpXG4gIGhpZGVYR3JpZCA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIGhpZGVMZWdlbmQgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBoaWRlTGVnZW5kVG9vbHRpcCA9IHRydWU7XG5cbiAgQElucHV0KClcbiAgbGVnZW5kV2lkdGggPSAxMDUgKyAyODsgLy8gaGFyZGNvZGVkIGxlZ2VuZCB3aWR0aCArIGxlZnQgbWFyZ2luLCBkbyBub3QgZG9jdW1lbnQgdW50aWwgZmVlZGJhY2tcblxuICBASW5wdXQoKVxuICBsZWdlbmRQb3NpdGlvbjogJ3JpZ2h0JyB8ICdib3R0b20nID0gJ2JvdHRvbSc7XG5cbiAgQElucHV0KClcbiAgbGVnZW5kTGFiZWxGb3JtYXRUeXBlOiAnbnVtYmVyJyB8ICd0aW1lJyA9IG51bGw7XG5cbiAgQElucHV0KClcbiAgbGVnZW5kTGFiZWxGb3JtYXRTdHJpbmcgPSAnJztcblxuICBASW5wdXQoKVxuICBoaWRlVG9vbHRpcCA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIHRvb2x0aXBMYWJlbEZvcm1hdFR5cGU6ICdudW1iZXInIHwgJ3RpbWUnID0gbnVsbDtcblxuICBASW5wdXQoKVxuICB0b29sdGlwTGFiZWxGb3JtYXRTdHJpbmcgPSAnJztcblxuICBASW5wdXQoKVxuICB0b29sdGlwRGF0ZUZvcm1hdFN0cmluZyA9ICclYiAlZSwgJVknO1xuXG4gIEBJbnB1dCgpXG4gIHRvb2x0aXBWYWx1ZUZvcm1hdFR5cGU6ICdudW1iZXInID0gbnVsbDtcblxuICBASW5wdXQoKVxuICB0b29sdGlwVmFsdWVGb3JtYXRTdHJpbmcgPSAnJztcblxuICBASW5wdXQoKVxuICB0b29sdGlwVmFsdWVTdWZmaXggPSAnJztcblxuICBASW5wdXQoKVxuICB0b29sdGlwUGVyY2VudEZvcm1hdFN0cmluZyA9ICcuMiUnO1xuXG4gIEBJbnB1dCgpXG4gIGNvbXBhcmVDaGFuZ2VGb3JtYXRTdHJpbmcgPSAnLjIlJztcblxuICBASW5wdXQoKVxuICBtb25vY2hyb21lID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgdGhlbWU6ICdjbGFzc2ljJyB8ICdvY2VhbicgfCAnc3Vuc2V0JyB8ICd0d2lsaWdodCc7XG5cbiAgQE91dHB1dCgpXG4gIGhvdmVyZWQ6IEV2ZW50RW1pdHRlcjxvYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcjxvYmplY3Q+KCk7XG5cbiAgQE91dHB1dCgpXG4gIGNsaWNrZWQ6IEV2ZW50RW1pdHRlcjxvYmplY3Q+ID0gbmV3IEV2ZW50RW1pdHRlcjxvYmplY3Q+KCk7XG5cbiAgcHJpdmF0ZSBpc1NpbmdsZURhdGEgPSBmYWxzZTtcbiAgcHJpdmF0ZSBpc0NvbXBhcmUgPSBmYWxzZTtcbiAgcHJpdmF0ZSBjaGFydDtcbiAgcHJpdmF0ZSBzdmc7XG4gIHByaXZhdGUgbWFyZ2luO1xuICBwcml2YXRlIGNvbG9yUmFuZ2U7XG4gIHByaXZhdGUgYmFyUGFkZGluZyA9IDQwO1xuICBwcml2YXRlIHhBeGlzQ2FsbDtcbiAgcHJpdmF0ZSB4QXhpcztcbiAgcHJpdmF0ZSB4QXhpc1NjYWxlO1xuICBwcml2YXRlIHhBeGlzVGlja1NpemU6IG51bWJlcjtcbiAgcHJpdmF0ZSB4QXhpc1RpY2tTaXplT3V0ZXI6IG51bWJlcjtcbiAgcHJpdmF0ZSB4QXhpc0Zvcm1hdDtcbiAgcHJpdmF0ZSB4QXhpc1RpdGxlTWFyZ2luOiBudW1iZXI7XG4gIHByaXZhdGUgaGlkZVhBeGlzRG9tYWluOiBib29sZWFuO1xuICBwcml2YXRlIGhpZGVYQXhpc1plcm86IGJvb2xlYW47XG4gIHByaXZhdGUgaGlkZVhBeGlzVGlja3M6IGJvb2xlYW47XG4gIHByaXZhdGUgeEdyaWQ7XG4gIHByaXZhdGUgeEdyaWRDYWxsO1xuICBwcml2YXRlIGxlZ2VuZExhYmVsRm9ybWF0O1xuICBwcml2YXRlIHRvb2x0aXA7XG4gIHByaXZhdGUgdG9vbHRpcExhYmVsRm9ybWF0O1xuICBwcml2YXRlIHRvb2x0aXBWYWx1ZUZvcm1hdDtcbiAgcHJpdmF0ZSB0b29sdGlwRGF0ZUZvcm1hdDtcbiAgcHJpdmF0ZSB0b29sdGlwUGVyY2VudEZvcm1hdDtcbiAgcHJpdmF0ZSB0b29sdGlwQ29tcGFyZUNoYW5nZUZvcm1hdDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9kYXRhdml6OiBQYmRzRGF0YXZpelNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF9zY3JvbGw6IFZpZXdwb3J0U2Nyb2xsZXIsXG4gICAgcHJpdmF0ZSBfbG9jYXRpb246IExvY2F0aW9uXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmhlaWdodCA9ICt0aGlzLmhlaWdodCArIHRoaXMuYmFyUGFkZGluZztcblxuICAgIHRoaXMubWFyZ2luID0ge1xuICAgICAgdG9wOiArdGhpcy5tYXJnaW5Ub3AsXG4gICAgICByaWdodDogK3RoaXMubWFyZ2luUmlnaHQsXG4gICAgICBib3R0b206ICt0aGlzLm1hcmdpbkJvdHRvbSxcbiAgICAgIGxlZnQ6ICt0aGlzLm1hcmdpbkxlZnRcbiAgICB9O1xuXG4gICAgdGhpcy5pc1NpbmdsZURhdGEgPSB0aGlzLmRhdGEubGVuZ3RoID09PSAxID8gdHJ1ZSA6IGZhbHNlO1xuICAgIHRoaXMuaXNDb21wYXJlID0gT2JqZWN0LmtleXModGhpcy5kYXRhWzBdKS5pbmNsdWRlcygnY29tcGFyZVZhbHVlJyk7XG5cbiAgICBzd2l0Y2ggKHRoaXMueEF4aXNGb3JtYXRUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICB0aGlzLnhBeGlzRm9ybWF0ID0gZDNfZm9ybWF0KHRoaXMueEF4aXNGb3JtYXRTdHJpbmcpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHRoaXMubGVnZW5kTGFiZWxGb3JtYXRUeXBlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICB0aGlzLmxlZ2VuZExhYmVsRm9ybWF0ID0gZDNfZm9ybWF0KHRoaXMubGVnZW5kTGFiZWxGb3JtYXRTdHJpbmcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgICB0aGlzLmxlZ2VuZExhYmVsRm9ybWF0ID0gZDNfdGltZUZvcm1hdCh0aGlzLmxlZ2VuZExhYmVsRm9ybWF0U3RyaW5nKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmxlZ2VuZExhYmVsRm9ybWF0ID0gbnVsbDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgc3dpdGNoICh0aGlzLnRvb2x0aXBWYWx1ZUZvcm1hdFR5cGUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIHRoaXMudG9vbHRpcFZhbHVlRm9ybWF0ID0gZDNfZm9ybWF0KHRoaXMudG9vbHRpcFZhbHVlRm9ybWF0U3RyaW5nKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLnRvb2x0aXBWYWx1ZUZvcm1hdCA9IG51bGw7XG4gICAgfVxuXG4gICAgdGhpcy50b29sdGlwRGF0ZUZvcm1hdCA9IGQzX3RpbWVGb3JtYXQodGhpcy50b29sdGlwRGF0ZUZvcm1hdFN0cmluZyk7XG4gICAgdGhpcy50b29sdGlwUGVyY2VudEZvcm1hdCA9IGQzX2Zvcm1hdCh0aGlzLnRvb2x0aXBQZXJjZW50Rm9ybWF0U3RyaW5nKTtcbiAgICB0aGlzLnRvb2x0aXBDb21wYXJlQ2hhbmdlRm9ybWF0ID0gZDNfZm9ybWF0KHRoaXMuY29tcGFyZUNoYW5nZUZvcm1hdFN0cmluZyk7XG5cbiAgICAvLyBkZWZhdWx0cyBmb3IgYWxsIGNoYXJ0IHR5cGVzXG4gICAgdGhpcy5oaWRlWEF4aXNaZXJvID0gZmFsc2U7XG4gICAgdGhpcy5oaWRlWEF4aXNEb21haW4gPSB0cnVlO1xuICAgIHRoaXMuaGlkZVhBeGlzVGlja3MgPSB0cnVlO1xuICAgIHRoaXMueEF4aXNUaWNrU2l6ZSA9IDg7XG4gICAgdGhpcy54QXhpc1RpY2tTaXplT3V0ZXIgPSAwO1xuICAgIHRoaXMueEF4aXNUaXRsZU1hcmdpbiA9IHRoaXMueEF4aXNUaXRsZSA/IDIwIDogMDtcblxuICAgIGlmICghdGhpcy5oaWRlTGVnZW5kICYmIHRoaXMubGVnZW5kUG9zaXRpb24gPT09ICdyaWdodCcpIHtcbiAgICAgIHRoaXMud2lkdGggPSArdGhpcy53aWR0aCAtICt0aGlzLmxlZ2VuZFdpZHRoO1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZSB0aGUgY2hhcnRcbiAgICB0aGlzLmNoYXJ0ID0gZDNfc2VsZWN0KHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCkuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4gICAgLy8gY3JlYXRlIGNoYXJ0IHN2Z1xuICAgIHRoaXMuc3ZnID0gdGhpcy5jaGFydFxuICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgIC5hdHRyKCd3aWR0aCcsICgpID0+IHtcbiAgICAgICAgcmV0dXJuICt0aGlzLndpZHRoICsgdGhpcy5tYXJnaW4ubGVmdCArIHRoaXMubWFyZ2luLnJpZ2h0O1xuICAgICAgfSlcbiAgICAgIC5hdHRyKCdoZWlnaHQnLCArdGhpcy5oZWlnaHQgKyB0aGlzLm1hcmdpbi50b3AgKyB0aGlzLm1hcmdpbi5ib3R0b20gKyB0aGlzLnhBeGlzVGl0bGVNYXJnaW4pXG4gICAgICAuYXR0cignY2xhc3MnLCAnaW1nLWZsdWlkJylcbiAgICAgIC5hdHRyKCdwcmVzZXJ2ZUFzcGVjdFJhdGlvJywgJ3hNaW5ZTWluIG1lZXQnKVxuICAgICAgLmF0dHIoJ3ZpZXdCb3gnLCAoKSA9PiB7XG4gICAgICAgIHJldHVybiBgLSR7dGhpcy5tYXJnaW4ubGVmdH0gLSR7dGhpcy5tYXJnaW4udG9wfSAkeyt0aGlzLndpZHRoICsgdGhpcy5tYXJnaW4ubGVmdCArIHRoaXMubWFyZ2luLnJpZ2h0fSAkeyt0aGlzXG4gICAgICAgICAgLmhlaWdodCArXG4gICAgICAgICAgdGhpcy5tYXJnaW4udG9wICtcbiAgICAgICAgICB0aGlzLm1hcmdpbi5ib3R0b20gK1xuICAgICAgICAgIHRoaXMueEF4aXNUaXRsZU1hcmdpbn1gO1xuICAgICAgfSk7XG5cbiAgICAvLyBUT09MVElQXG4gICAgaWYgKCF0aGlzLmhpZGVUb29sdGlwKSB7XG4gICAgICB0aGlzLnRvb2x0aXAgPSBkM19zZWxlY3QoJ2JvZHknKVxuICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAncGJkcy10b29sdGlwIHNvdXRoJylcbiAgICAgICAgLmNsYXNzZWQoJ3BiZHMtdG9vbHRpcC1jb21wYXJlJywgdGhpcy5pc0NvbXBhcmUpXG4gICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDApXG4gICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7IC8vIGhpZGUgdG9vbHRpcCBmb3IgYWNjZXNzaWJpbGl0eVxuICAgIH1cblxuICAgIC8vIGFkZCBsZWdlbmQgY2xhc3Nlc1xuICAgIGlmICghdGhpcy5oaWRlTGVnZW5kICYmIHRoaXMuZGF0YS5sZW5ndGggPiAxKSB7XG4gICAgICB0aGlzLmNoYXJ0LmNsYXNzZWQoJ3BiZHMtY2hhcnQtbGVnZW5kLWJvdHRvbScsIHRoaXMubGVnZW5kUG9zaXRpb24gPT09ICdib3R0b20nID8gdHJ1ZSA6IGZhbHNlKTtcbiAgICAgIHRoaXMuY2hhcnQuYXBwZW5kKCd1bCcpLmF0dHIoJ2NsYXNzJywgYGxlZ2VuZCBsZWdlbmQtJHt0aGlzLmxlZ2VuZFBvc2l0aW9ufWApO1xuICAgIH1cblxuICAgIC8vIFggQVhJU1xuICAgIHRoaXMueEF4aXNTY2FsZSA9IGQzX3NjYWxlTGluZWFyKClcbiAgICAgIC5kb21haW4oWzAsIE1hdGguY2VpbChkM19zdW0odGhpcy5kYXRhLCAoZDogYW55KSA9PiBkLnZhbHVlKSldKVxuICAgICAgLnJhbmdlKFswLCArdGhpcy53aWR0aF0pO1xuXG4gICAgdGhpcy54QXhpc0NhbGwgPSBkM19heGlzQm90dG9tKHRoaXMueEF4aXNTY2FsZSlcbiAgICAgIC8vIC50aWNrVmFsdWVzKFswLCBkM19zdW0odGhpcy5kYXRhLCAoZDogYW55KSA9PiBkLnZhbHVlKV0pXG4gICAgICAudGlja3ModGhpcy54QXhpc1RpY2tzKVxuICAgICAgLnRpY2tTaXplKHRoaXMueEF4aXNUaWNrU2l6ZSlcbiAgICAgIC50aWNrU2l6ZU91dGVyKHRoaXMueEF4aXNUaWNrU2l6ZU91dGVyKVxuICAgICAgLnRpY2tGb3JtYXQodGhpcy54QXhpc0Zvcm1hdHRlcik7XG5cbiAgICB0aGlzLnhBeGlzID0gdGhpcy5zdmdcbiAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2F4aXMgYXhpcy14JylcbiAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKDAsICR7dGhpcy5oZWlnaHR9KWApXG4gICAgICAuY2xhc3NlZCgnYXhpcy1oaWRkZW4nLCB0aGlzLmhpZGVYQXhpcylcbiAgICAgIC5jbGFzc2VkKCdheGlzLXplcm8taGlkZGVuJywgdGhpcy5oaWRlWEF4aXNaZXJvKVxuICAgICAgLmNsYXNzZWQoJ2F4aXMtZG9tYWluLWhpZGRlbicsIHRoaXMuaGlkZVhBeGlzRG9tYWluKVxuICAgICAgLmNsYXNzZWQoJ2F4aXMtdGlja3MtaGlkZGVuJywgdGhpcy5oaWRlWEF4aXNUaWNrcyk7XG4gICAgLy8gLmNhbGwodGhpcy54QXhpc0NhbGwpO1xuXG4gICAgLy8gWCBHUklETElORVNcbiAgICBpZiAoIXRoaXMuaGlkZVhHcmlkKSB7XG4gICAgICB0aGlzLnhHcmlkQ2FsbCA9IGQzX2F4aXNCb3R0b20odGhpcy54QXhpc1NjYWxlKS50aWNrU2l6ZSgtdGhpcy5oZWlnaHQpO1xuXG4gICAgICB0aGlzLnhHcmlkID0gdGhpcy5zdmdcbiAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdncmlkIGdyaWQteCcpXG4gICAgICAgIC5jbGFzc2VkKCdncmlkLXplcm8taGlkZGVuJywgdGhpcy5oaWRlWEF4aXNaZXJvKVxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgwLCAke3RoaXMuaGVpZ2h0fSlgKVxuICAgICAgICAuY2FsbCh0aGlzLnhHcmlkQ2FsbCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMueEF4aXNUaXRsZSkge1xuICAgICAgdGhpcy5zdmdcbiAgICAgICAgLmFwcGVuZCgndGV4dCcpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdheGlzLXRpdGxlJylcbiAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ2NlbnRlcicpXG4gICAgICAgIC5hdHRyKCd4JywgdGhpcy53aWR0aCAvIDIgLSB0aGlzLm1hcmdpbi5sZWZ0KVxuICAgICAgICAuYXR0cigneScsIHRoaXMuaGVpZ2h0ICsgdGhpcy5tYXJnaW4udG9wICsgKCF0aGlzLmhpZGVYQXhpcyA/IDQwIDogMCkpXG4gICAgICAgIC50ZXh0KHRoaXMueEF4aXNUaXRsZSk7XG4gICAgfVxuXG4gICAgLy8gYnVpbGQgY29sb3IgcmFuZ2VzXG4gICAgbGV0IGNvbG9ycztcblxuICAgIGlmICh0aGlzLmlzU2luZ2xlRGF0YSkge1xuICAgICAgY29sb3JzID0gdGhpcy5fZGF0YXZpei5jcmVhdGVHcmFkaWVudERlZnModGhpcy5zdmcsIHRoaXMubW9ub2Nocm9tZSwgdGhpcy50aGVtZSwgZmFsc2UpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5tb25vY2hyb21lKSB7XG4gICAgICBjb2xvcnMgPSB0aGlzLl9kYXRhdml6LmdldENvbG9ycyh0aGlzLm1vbm9jaHJvbWUsIHRoaXMudGhlbWUpLnJldmVyc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29sb3JzID0gdGhpcy5fZGF0YXZpei5nZXRDb2xvcnModGhpcy5tb25vY2hyb21lLCB0aGlzLnRoZW1lKTtcbiAgICB9XG5cbiAgICB0aGlzLmNvbG9yUmFuZ2UgPSBkM19zY2FsZU9yZGluYWwoKS5yYW5nZShjb2xvcnMpO1xuXG4gICAgdGhpcy51cGRhdGVDaGFydCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmRhdGEgJiYgIWNoYW5nZXMuZGF0YS5maXJzdENoYW5nZSkge1xuICAgICAgdGhpcy51cGRhdGVDaGFydCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnRvb2x0aXApIHRoaXMudG9vbHRpcC5yZW1vdmUoKTtcbiAgfVxuXG4gIHVwZGF0ZUNoYXJ0KCkge1xuICAgIGNvbnN0IHN1bVZhbHVlcyA9IGQzX3N1bSh0aGlzLmRhdGEsIChkOiBhbnkpID0+IGQudmFsdWUpO1xuICAgIGNvbnN0IGlzTGFzdEJhclplcm8gPVxuICAgICAgdGhpcy5kYXRhW3RoaXMuZGF0YS5sZW5ndGggLSAxXS52YWx1ZSA9PT0gMCB8fCB0aGlzLmRhdGFbdGhpcy5kYXRhLmxlbmd0aCAtIDFdLnZhbHVlID09PSBudWxsID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgbGV0IGxhc3RCYXJaZXJvQ291bnQgPSAwO1xuICAgIGNvbnN0IGNsb25lRGF0YSA9IFsuLi50aGlzLmRhdGFdO1xuICAgIGxldCBpc0xhc3QgPSBmYWxzZTtcblxuICAgIGNsb25lRGF0YS5yZXZlcnNlKCkuZm9yRWFjaCgodmFsdWUsIGluZGV4LCBhcnJheSkgPT4ge1xuICAgICAgaWYgKCh2YWx1ZS52YWx1ZSA9PT0gMCB8fCB2YWx1ZS52YWx1ZSA9PT0gbnVsbCkgJiYgIWlzTGFzdCkge1xuICAgICAgICBsYXN0QmFyWmVyb0NvdW50Kys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpc0xhc3QgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMucGVyY2VudGFnZSAmJiAhdGhpcy5pc1NpbmdsZURhdGEpIHtcbiAgICAgIHRoaXMueEF4aXNTY2FsZS5kb21haW4oWzAsIHN1bVZhbHVlc10pLnJhbmdlKFswLCArdGhpcy53aWR0aF0pO1xuICAgICAgdGhpcy54QXhpc0NhbGwudGlja1ZhbHVlcyhbMCwgc3VtVmFsdWVzICogMC4yNSwgc3VtVmFsdWVzICogMC41LCBzdW1WYWx1ZXMgKiAwLjc1LCBzdW1WYWx1ZXNdKTtcbiAgICAgIHRoaXMueEF4aXMuY2FsbCh0aGlzLnhBeGlzQ2FsbCk7XG5cbiAgICAgIHRoaXMueEdyaWRDYWxsLnRpY2tWYWx1ZXMoWzAsIHN1bVZhbHVlcyAqIDAuMjUsIHN1bVZhbHVlcyAqIDAuNSwgc3VtVmFsdWVzICogMC43NSwgc3VtVmFsdWVzXSk7XG4gICAgICB0aGlzLnhHcmlkLmNhbGwodGhpcy54R3JpZENhbGwpO1xuXG4gICAgICB0aGlzLnN2Z1xuICAgICAgICAuc2VsZWN0KCcuYXhpcy14JylcbiAgICAgICAgLnNlbGVjdEFsbCgndGV4dCcpXG4gICAgICAgIC5odG1sKChkLCBpKSA9PiB7XG4gICAgICAgICAgY29uc3QgZm9ybWF0ID0gZDNfZm9ybWF0KCcuMCUnKTtcbiAgICAgICAgICByZXR1cm4gZm9ybWF0KGkgKiAwLjI1KTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnBlcmNlbnRhZ2UgJiYgdGhpcy5pc1NpbmdsZURhdGEpIHtcbiAgICAgIHRoaXMueEF4aXNTY2FsZS5kb21haW4oWzAsIDEuMF0pLnJhbmdlKFswLCArdGhpcy53aWR0aF0pO1xuICAgICAgdGhpcy54QXhpc0NhbGwudGlja1ZhbHVlcyhbMCwgMC4yNSwgMC41LCAwLjc1LCAxLjBdKTtcbiAgICAgIHRoaXMueEF4aXMuY2FsbCh0aGlzLnhBeGlzQ2FsbCk7XG5cbiAgICAgIHRoaXMueEdyaWRDYWxsLnRpY2tWYWx1ZXMoWzAsIDAuMjUsIDAuNSwgMC43NSwgMS4wXSk7XG4gICAgICB0aGlzLnhHcmlkLmNhbGwodGhpcy54R3JpZENhbGwpO1xuXG4gICAgICB0aGlzLnN2Z1xuICAgICAgICAuc2VsZWN0KCcuYXhpcy14JylcbiAgICAgICAgLnNlbGVjdEFsbCgndGV4dCcpXG4gICAgICAgIC5odG1sKChkLCBpKSA9PiB7XG4gICAgICAgICAgY29uc3QgZm9ybWF0ID0gZDNfZm9ybWF0KCcuMCUnKTtcbiAgICAgICAgICByZXR1cm4gZm9ybWF0KGkgKiAwLjI1KTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMueEF4aXNTY2FsZS5kb21haW4oWzAsIE1hdGguY2VpbChzdW1WYWx1ZXMpXSkucmFuZ2UoWzAsICt0aGlzLndpZHRoXSk7XG4gICAgICB0aGlzLnhHcmlkQ2FsbC50aWNrVmFsdWVzKHRoaXMueEF4aXNTY2FsZS50aWNrcygpLmZpbHRlcihuID0+IE51bWJlci5pc0ludGVnZXIobikpKTsgLy8gcmVtb3ZlIGRlY2ltYWwgZ3JpZCB2YWx1ZXNcblxuICAgICAgdGhpcy54QXhpc1xuICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgIC5kdXJhdGlvbigxMDAwKVxuICAgICAgICAuY2FsbCh0aGlzLnhBeGlzQ2FsbCk7XG5cbiAgICAgIC8vIHVwZGF0ZSB0aGUgZ3JpZHNcbiAgICAgIGlmICghdGhpcy5oaWRlWEdyaWQpIHtcbiAgICAgICAgdGhpcy54R3JpZFxuICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgICAgICAuY2FsbCh0aGlzLnhHcmlkQ2FsbCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zdmdcbiAgICAgIC5zZWxlY3RBbGwoJy5iYXInKVxuICAgICAgLmRhdGEodGhpcy5kYXRhKVxuICAgICAgLmpvaW4oXG4gICAgICAgIGVudGVyID0+XG4gICAgICAgICAgZW50ZXJcbiAgICAgICAgICAgIC5hcHBlbmQoJ3JlY3QnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2JhcicpXG4gICAgICAgICAgICAuYXR0cignd2lkdGgnLCAwKVxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsICgpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0IC0gdGhpcy5iYXJQYWRkaW5nO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCdmaWxsJywgZCA9PiB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmlzU2luZ2xlRGF0YSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBgdXJsKCR7dGhpcy5fbG9jYXRpb24ucGF0aCgpfSNncmFkaWVudC1ob3Jpem9udGFsLSR7dGhpcy5jb2xvclJhbmdlKGQubGFiZWwpLnN1YnN0cigxKX0pYDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb2xvclJhbmdlKGQubGFiZWwpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ3knLCAoKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLmJhclBhZGRpbmcgLyAyO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCd4JywgKGQsIGkpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zbGljZSgwLCBpKS5yZWR1Y2UoKGFjYywgaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGFjYywgaXRlbSwgYWNjICsgdGhpcy54QXhpc1NjYWxlKGl0ZW0udmFsdWUpICsgdGhpcy5iYXJNYXJnaW4pO1xuICAgICAgICAgICAgICAgIHJldHVybiArYWNjICsgK3RoaXMueEF4aXNTY2FsZShpdGVtLnZhbHVlKTtcbiAgICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKVxuICAgICAgICAgICAgLmNhbGwoZW50ZXIgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIGVudGVyXG4gICAgICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgICAvLyAuZHVyYXRpb24oMTAwMClcbiAgICAgICAgICAgICAgICAgIC5kZWxheSgoZCwgaSkgPT4gaSAqIDI1MClcbiAgICAgICAgICAgICAgICAgIC5lYXNlKGQzX2Vhc2VMaW5lYXIpXG4gICAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCAoZCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBkZWJ1Z2dlcjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IHRoaXMuZGF0YS5sZW5ndGggLSBsYXN0QmFyWmVyb0NvdW50IC0gMSAmJiBpc0xhc3RCYXJaZXJvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMueEF4aXNTY2FsZShkLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpICE9PSB0aGlzLmRhdGEubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgIGxldCB3aWR0aCA9IHRoaXMueEF4aXNTY2FsZShkLnZhbHVlKSAtICt0aGlzLmJhck1hcmdpbjtcbiAgICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IE1hdGguc2lnbih3aWR0aCkgPT09IC0xID8gMCA6IHdpZHRoOyAvLyBoYW5kbGUgbmVnYXRpdmUgdmFsdWVzXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpZHRoO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnhBeGlzU2NhbGUoZC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgICAuYXR0cigncG9pbnRlci1ldmVudHMnLCAnYXV0bycpXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgdXBkYXRlID0+XG4gICAgICAgICAgdXBkYXRlXG4gICAgICAgICAgICAuYXR0cigncG9pbnRlci1ldmVudHMnLCAnbm9uZScpXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIChkLCBpKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChpID09PSB0aGlzLmRhdGEubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnhBeGlzU2NhbGUoZC52YWx1ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMueEF4aXNTY2FsZShkLnZhbHVlKSAtIHRoaXMuYmFyTWFyZ2luO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ3gnLCAoZCwgaSkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhLnNsaWNlKDAsIGkpLnJlZHVjZSgoYWNjLCBpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYyArICt0aGlzLnhBeGlzU2NhbGUoaXRlbS52YWx1ZSk7XG4gICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5hdHRyKCdwb2ludGVyLWV2ZW50cycsICdhdXRvJyksXG4gICAgICAgIGV4aXQgPT5cbiAgICAgICAgICBleGl0XG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuYXR0cigncG9pbnRlci1ldmVudHMnLCAnbm9uZScpXG4gICAgICAgICAgICAucmVtb3ZlKClcbiAgICAgIClcbiAgICAgIC5vbignbW91c2VvdmVyJywgKGRhdGEsIGluZGV4LCBub2RlcykgPT4gdGhpcy5iYXJNb3VzZU92ZXIoZDNfZXZlbnQsIGRhdGEsIGluZGV4LCBub2RlcykpXG4gICAgICAub24oJ21vdXNlb3V0JywgKGRhdGEsIGluZGV4LCBub2RlcykgPT4gdGhpcy5iYXJNb3VzZU91dCgpKVxuICAgICAgLm9uKCdjbGljaycsIChkYXRhLCBpbmRleCwgbm9kZXMpID0+IHRoaXMuYmFyTW91c2VDbGljayhkM19ldmVudCwgZGF0YSwgaW5kZXgsIG5vZGVzKSk7XG5cbiAgICBpZiAoIXRoaXMuaGlkZUxlZ2VuZCkge1xuICAgICAgdGhpcy5jaGFydFxuICAgICAgICAuc2VsZWN0KCcubGVnZW5kJylcbiAgICAgICAgLnNlbGVjdEFsbCgnLmxlZ2VuZC1pdGVtJylcbiAgICAgICAgLmRhdGEodGhpcy5kYXRhKVxuICAgICAgICAuam9pbihcbiAgICAgICAgICBlbnRlciA9PiB7XG4gICAgICAgICAgICBjb25zdCBsaSA9IGVudGVyXG4gICAgICAgICAgICAgIC5hcHBlbmQoJ2xpJylcbiAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xlZ2VuZC1pdGVtJylcbiAgICAgICAgICAgICAgLmNsYXNzZWQoJ2FsaWduLWl0ZW1zLXN0YXJ0JywgdGhpcy5pc0NvbXBhcmUpO1xuXG4gICAgICAgICAgICBsaS5pbnNlcnQoJ3NwYW4nKVxuICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kLWtleScpXG4gICAgICAgICAgICAgIC5zdHlsZSgnYmFja2dyb3VuZC1jb2xvcicsIGQgPT4gdGhpcy5jb2xvclJhbmdlKGQubGFiZWwpKVxuICAgICAgICAgICAgICAuY2xhc3NlZCgnbXQtMScsIHRoaXMuaXNDb21wYXJlKTtcblxuICAgICAgICAgICAgbGkuaW5zZXJ0KCdzcGFuJylcbiAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xlZ2VuZC1kZXNjcmlwdGlvbicpXG4gICAgICAgICAgICAgIC5jbGFzc2VkKCdkLWZsZXgnLCB0aGlzLmlzQ29tcGFyZSlcbiAgICAgICAgICAgICAgLmNsYXNzZWQoJ2ZsZXgtY29sdW1uJywgdGhpcy5pc0NvbXBhcmUpO1xuXG4gICAgICAgICAgICBsaS5zZWxlY3QoJy5sZWdlbmQtZGVzY3JpcHRpb24nKVxuICAgICAgICAgICAgICAuaW5zZXJ0KCdzcGFuJylcbiAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xlZ2VuZC1sYWJlbCcpXG4gICAgICAgICAgICAgIC5odG1sKGQgPT4ge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5sZWdlbmRMYWJlbEZvcm1hdFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxlZ2VuZExhYmVsRm9ybWF0KGQubGFiZWwpO1xuXG4gICAgICAgICAgICAgICAgICBjYXNlICd0aW1lJzpcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyc2VkVGltZSA9IGQzX2lzb1BhcnNlKGQubGFiZWwpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sZWdlbmRMYWJlbEZvcm1hdChwYXJzZWRUaW1lKTtcblxuICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQubGFiZWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNDb21wYXJlKSB7XG4gICAgICAgICAgICAgIGxpLnNlbGVjdCgnLmxlZ2VuZC1kZXNjcmlwdGlvbicpXG4gICAgICAgICAgICAgICAgLmluc2VydCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGVnZW5kLWNoYW5nZScpO1xuXG4gICAgICAgICAgICAgIGxpLnNlbGVjdCgnLmxlZ2VuZC1jaGFuZ2UnKS5odG1sKGQgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cIm1ldHJpYy1ibG9jay1pbmRpY2F0b3IgJHtkLmNvbXBhcmVDaGFuZ2VEaXJlY3Rpb259ICR7XG4gICAgICAgICAgICAgICAgICBkLmNvbXBhcmVDaGFuZ2VJbnZlcnNlID8gJ2ludmVyc2UnIDogJydcbiAgICAgICAgICAgICAgICB9IG10LTFcIj48c3Bhbj4ke3RoaXMudG9vbHRpcENvbXBhcmVDaGFuZ2VGb3JtYXQoZC5jb21wYXJlQ2hhbmdlVmFsdWUpfTwvc3Bhbj48L2Rpdj5gO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGxpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdXBkYXRlID0+IHtcbiAgICAgICAgICAgIHVwZGF0ZS5zZWxlY3QoJy5sZWdlbmQtbGFiZWwnKS5odG1sKGQgPT4ge1xuICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMubGVnZW5kTGFiZWxGb3JtYXRUeXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxlZ2VuZExhYmVsRm9ybWF0KGQubGFiZWwpO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAndGltZSc6XG4gICAgICAgICAgICAgICAgICBjb25zdCBwYXJzZWRUaW1lID0gZDNfaXNvUGFyc2UoZC5sYWJlbCk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sZWdlbmRMYWJlbEZvcm1hdChwYXJzZWRUaW1lKTtcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZC5sYWJlbDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB1cGRhdGU7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBleGl0ID0+IGV4aXQucmVtb3ZlKClcbiAgICAgICAgKVxuICAgICAgICAub24oJ21vdXNlb3ZlcicsIChkYXRhLCBpbmRleCwgbm9kZXMpID0+IHRoaXMubGVnZW5kTW91c2VPdmVyKGQzX2V2ZW50LCBkYXRhLCBpbmRleCwgbm9kZXMpKVxuICAgICAgICAub24oJ21vdXNlb3V0JywgKCkgPT4gdGhpcy5sZWdlbmRNb3VzZU91dCgpKVxuICAgICAgICAub24oJ2NsaWNrJywgKGRhdGEsIGluZGV4LCBub2RlcykgPT4gdGhpcy5sZWdlbmRNb3VzZUNsaWNrKGQzX2V2ZW50LCBkYXRhLCBpbmRleCwgbm9kZXMpKTtcbiAgICB9XG4gIH1cblxuICBiYXJNb3VzZU92ZXIgPSAoZXZlbnQsIGRhdGEsIGluZGV4LCBub2RlcykgPT4ge1xuICAgIGNvbnN0IG5vZGUgPSBkM19zZWxlY3Qobm9kZXNbaW5kZXhdKTtcblxuICAgIHRoaXMuY2hhcnQuc2VsZWN0QWxsKCcuYmFyJykuY2xhc3NlZCgnaW5hY3RpdmUnLCB0cnVlKTtcblxuICAgIG5vZGUuY2xhc3NlZCgnaW5hY3RpdmUnLCBmYWxzZSk7XG5cbiAgICB0aGlzLmNoYXJ0XG4gICAgICAuc2VsZWN0QWxsKCcubGVnZW5kLWl0ZW0nKVxuICAgICAgLmZpbHRlcigoZCwgaSkgPT4ge1xuICAgICAgICAvLyBkZWJ1Z2dlcjtcbiAgICAgICAgcmV0dXJuIGkgIT09IGluZGV4O1xuICAgICAgfSlcbiAgICAgIC5jbGFzc2VkKCdpbmFjdGl2ZScsIHRydWUpO1xuXG4gICAgdGhpcy50b29sdGlwU2hvdyhkYXRhLCBub2Rlc1tpbmRleF0pO1xuXG4gICAgdGhpcy5ob3ZlcmVkLmVtaXQoeyBldmVudCwgZGF0YSB9KTtcbiAgfTtcblxuICBiYXJNb3VzZU91dCA9ICgpID0+IHtcbiAgICB0aGlzLmNoYXJ0XG4gICAgICAuc2VsZWN0QWxsKCcuYmFyJylcbiAgICAgIC5jbGFzc2VkKCdpbmFjdGl2ZScsIGZhbHNlKVxuICAgICAgLnN0eWxlKCdmaWxsJywgbnVsbCk7XG5cbiAgICB0aGlzLmNoYXJ0LnNlbGVjdEFsbCgnLmxlZ2VuZC1pdGVtJykuY2xhc3NlZCgnaW5hY3RpdmUnLCBmYWxzZSk7XG5cbiAgICB0aGlzLnRvb2x0aXBIaWRlKCk7XG4gIH07XG5cbiAgYmFyTW91c2VDbGljayA9IChldmVudCwgZGF0YSwgaW5kZXgsIG5vZGVzKSA9PiB7XG4gICAgdGhpcy5jbGlja2VkLmVtaXQoeyBldmVudCwgZGF0YSB9KTtcbiAgfTtcblxuICBwcml2YXRlIHRvb2x0aXBTaG93ID0gKGRhdGEsIG5vZGUpID0+IHtcbiAgICBjb25zdCBkaW1lbnNpb25zID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBzY3JvbGwgPSB0aGlzLl9zY3JvbGwuZ2V0U2Nyb2xsUG9zaXRpb24oKTtcblxuICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSBkYXRhLnZhbHVlIC8gZDNfc3VtKHRoaXMuZGF0YSwgKGQ6IGFueSkgPT4gZC52YWx1ZSk7XG4gICAgY29uc3QgY29tcGFyZVBlcmNlbnRhZ2UgPSBkYXRhLmNvbXBhcmVWYWx1ZSAvIGQzX3N1bSh0aGlzLmRhdGEsIChkOiBhbnkpID0+IGQuY29tcGFyZVZhbHVlKTtcblxuICAgIGxldCB0b29sdGlwTGFiZWwgPSBgYDtcbiAgICBsZXQgdG9vbHRpcENvbXBhcmVEYXRlcmFuZ2VNYXJnaW4gPSBgYDtcbiAgICBsZXQgdG9vbHRpcENvbXBhcmVEYXRlcmFuZ2UgPSBgYDtcbiAgICBsZXQgdG9vbHRpcENvbXBhcmVWYWx1ZSA9IGBgO1xuICAgIGxldCB0b29sdGlwRGF0ZXJhbmdlTWFyZ2luID0gYGA7XG4gICAgbGV0IHRvb2x0aXBEYXRlcmFuZ2UgPSBgYDtcbiAgICBsZXQgdG9vbHRpcFZhbHVlID0gYCR7dGhpcy5udWxsVmFsdWVUZXh0fWA7XG4gICAgbGV0IHRvb2x0aXBJbmRpY2F0b3IgPSAnJztcblxuICAgIC8vIHRvb2x0aXAgbGFiZWxcbiAgICBpZiAoIXRoaXMuaXNTaW5nbGVEYXRhKSB7XG4gICAgICBzd2l0Y2ggKHRoaXMudG9vbHRpcExhYmVsRm9ybWF0VHlwZSkge1xuICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgIHRvb2x0aXBMYWJlbCA9IHRoaXMudG9vbHRpcExhYmVsRm9ybWF0KGRhdGEubGFiZWwpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgICAgIGNvbnN0IHBhcnNlZFRpbWUgPSBkM19pc29QYXJzZShkYXRhLmxhYmVsKTtcbiAgICAgICAgICB0b29sdGlwTGFiZWwgPSB0aGlzLnRvb2x0aXBMYWJlbEZvcm1hdChwYXJzZWRUaW1lKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRvb2x0aXBMYWJlbCA9IGRhdGEubGFiZWw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gdG9vbHRpcCBjb21wYXJlIGRhdGVyYW5nZVxuICAgIGlmICh0aGlzLmlzQ29tcGFyZSAmJiBkYXRhLmNvbXBhcmVTdGFydERhdGUgJiYgZGF0YS5jb21wYXJlRW5kRGF0ZSkge1xuICAgICAgdG9vbHRpcENvbXBhcmVEYXRlcmFuZ2VNYXJnaW4gPSBgbXQtMmA7XG5cbiAgICAgIHRvb2x0aXBDb21wYXJlRGF0ZXJhbmdlID0gYCR7dGhpcy50b29sdGlwRGF0ZUZvcm1hdChcbiAgICAgICAgZDNfaXNvUGFyc2UoZGF0YS5jb21wYXJlU3RhcnREYXRlKVxuICAgICAgKX0gLSAke3RoaXMudG9vbHRpcERhdGVGb3JtYXQoZDNfaXNvUGFyc2UoZGF0YS5jb21wYXJlRW5kRGF0ZSkpfWA7XG4gICAgfVxuXG4gICAgLy8gdG9vbHRpcCBjb21wYXJlIHZhbHVlXG4gICAgaWYgKHRoaXMucGVyY2VudGFnZSAmJiB0aGlzLmlzQ29tcGFyZSAmJiBkYXRhLmNvbXBhcmVWYWx1ZSkge1xuICAgICAgdG9vbHRpcENvbXBhcmVWYWx1ZSA9XG4gICAgICAgIHRoaXMudG9vbHRpcFZhbHVlRm9ybWF0ID09PSBudWxsXG4gICAgICAgICAgPyBgJHt0aGlzLnRvb2x0aXBQZXJjZW50Rm9ybWF0KGNvbXBhcmVQZXJjZW50YWdlKX0gKCR7ZGF0YS5jb21wYXJ2ZVZhbHVlfSR7dGhpcy50b29sdGlwVmFsdWVTdWZmaXh9KWBcbiAgICAgICAgICA6IGAke3RoaXMudG9vbHRpcFBlcmNlbnRGb3JtYXQoY29tcGFyZVBlcmNlbnRhZ2UpfSAoJHt0aGlzLnRvb2x0aXBWYWx1ZUZvcm1hdChkYXRhLmNvbXBhcmVWYWx1ZSl9JHtcbiAgICAgICAgICAgIHRoaXMudG9vbHRpcFZhbHVlU3VmZml4XG4gICAgICAgICAgfSlgO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pc0NvbXBhcmUgJiYgZGF0YS5jb21wYXJlVmFsdWUgIT09IG51bGwpIHtcbiAgICAgIHRvb2x0aXBDb21wYXJlVmFsdWUgPVxuICAgICAgICB0aGlzLnRvb2x0aXBWYWx1ZUZvcm1hdCA9PT0gbnVsbFxuICAgICAgICAgID8gYCR7ZGF0YS5jb21wYXJlVmFsdWV9JHt0aGlzLnRvb2x0aXBWYWx1ZVN1ZmZpeH0gKCR7dGhpcy50b29sdGlwUGVyY2VudEZvcm1hdChjb21wYXJlUGVyY2VudGFnZSl9KWBcbiAgICAgICAgICA6IGAke3RoaXMudG9vbHRpcFZhbHVlRm9ybWF0KGRhdGEuY29tcGFyZVZhbHVlKX0ke3RoaXMudG9vbHRpcFZhbHVlU3VmZml4fSAoJHt0aGlzLnRvb2x0aXBQZXJjZW50Rm9ybWF0KFxuICAgICAgICAgICAgY29tcGFyZVBlcmNlbnRhZ2VcbiAgICAgICAgICApfSlgO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pc0NvbXBhcmUgJiYgZGF0YS5jb21wYXJlVmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHRvb2x0aXBDb21wYXJlVmFsdWUgPSBgJHt0aGlzLm51bGxWYWx1ZVRleHR9YDtcbiAgICB9XG5cbiAgICAvLyB0b29sdGlwIGRhdGVyYW5nZVxuICAgIGlmIChkYXRhLnN0YXJ0RGF0ZSAmJiBkYXRhLmVuZERhdGUpIHtcbiAgICAgIHRvb2x0aXBEYXRlcmFuZ2UgPSBgJHt0aGlzLnRvb2x0aXBEYXRlRm9ybWF0KGQzX2lzb1BhcnNlKGRhdGEuc3RhcnREYXRlKSl9IC0gJHt0aGlzLnRvb2x0aXBEYXRlRm9ybWF0KFxuICAgICAgICBkM19pc29QYXJzZShkYXRhLmVuZERhdGUpXG4gICAgICApfWA7XG4gICAgfVxuXG4gICAgLy90b29sdGlwIGRhdGVyYW5nZSBtYXJnaW5cbiAgICBpZiAodG9vbHRpcExhYmVsICE9PSAnJykge1xuICAgICAgdG9vbHRpcERhdGVyYW5nZU1hcmdpbiA9IGBtdC0yYDtcbiAgICB9XG5cbiAgICAvLyB0b29sdGlwIHZhbHVlXG4gICAgaWYgKHRoaXMuaXNTaW5nbGVEYXRhICYmIHRoaXMucGVyY2VudGFnZSAmJiBkYXRhLnZhbHVlKSB7XG4gICAgICB0b29sdGlwVmFsdWUgPSB0aGlzLnRvb2x0aXBWYWx1ZUZvcm1hdCA9PT0gbnVsbCA/IGAke2RhdGEudmFsdWV9YCA6IGAke3RoaXMudG9vbHRpcFZhbHVlRm9ybWF0KGRhdGEudmFsdWUpfWA7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzU2luZ2xlRGF0YSAmJiBkYXRhLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICB0b29sdGlwVmFsdWUgPVxuICAgICAgICB0aGlzLnRvb2x0aXBWYWx1ZUZvcm1hdCA9PT0gbnVsbFxuICAgICAgICAgID8gYCR7ZGF0YS52YWx1ZX0ke3RoaXMudG9vbHRpcFZhbHVlU3VmZml4fWBcbiAgICAgICAgICA6IGAke3RoaXMudG9vbHRpcFZhbHVlRm9ybWF0KGRhdGEudmFsdWUpfSR7dGhpcy50b29sdGlwVmFsdWVTdWZmaXh9YDtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLmlzU2luZ2xlRGF0YSAmJiB0aGlzLnBlcmNlbnRhZ2UgJiYgZGF0YS52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgdG9vbHRpcFZhbHVlID1cbiAgICAgICAgdGhpcy50b29sdGlwVmFsdWVGb3JtYXQgPT09IG51bGxcbiAgICAgICAgICA/IGAke3RoaXMudG9vbHRpcFBlcmNlbnRGb3JtYXQocGVyY2VudGFnZSl9ICgke2RhdGEudmFsdWV9JHt0aGlzLnRvb2x0aXBWYWx1ZVN1ZmZpeH0pYFxuICAgICAgICAgIDogYCR7dGhpcy50b29sdGlwUGVyY2VudEZvcm1hdChwZXJjZW50YWdlKX0gKCR7dGhpcy50b29sdGlwVmFsdWVGb3JtYXQoZGF0YS52YWx1ZSl9JHtcbiAgICAgICAgICAgIHRoaXMudG9vbHRpcFZhbHVlU3VmZml4XG4gICAgICAgICAgfSlgO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuaXNTaW5nbGVEYXRhICYmIGRhdGEudmFsdWUgIT09IG51bGwpIHtcbiAgICAgIHRvb2x0aXBWYWx1ZSA9XG4gICAgICAgIHRoaXMudG9vbHRpcFZhbHVlRm9ybWF0ID09PSBudWxsXG4gICAgICAgICAgPyBgJHtkYXRhLnZhbHVlfSR7dGhpcy50b29sdGlwVmFsdWVTdWZmaXh9ICgke3RoaXMudG9vbHRpcFBlcmNlbnRGb3JtYXQocGVyY2VudGFnZSl9KWBcbiAgICAgICAgICA6IGAke3RoaXMudG9vbHRpcFZhbHVlRm9ybWF0KGRhdGEudmFsdWUpfSR7dGhpcy50b29sdGlwVmFsdWVTdWZmaXh9ICgke3RoaXMudG9vbHRpcFBlcmNlbnRGb3JtYXQoXG4gICAgICAgICAgICBwZXJjZW50YWdlXG4gICAgICAgICAgKX0pYDtcbiAgICB9XG5cbiAgICAvLyB0b29sdGlwIG1ldHJpYyBpbmRpY2F0b3JcbiAgICBpZiAoIXRoaXMuaXNTaW5nbGVEYXRhICYmIHRoaXMuaXNDb21wYXJlICYmIGRhdGEudmFsdWUgIT09IG51bGwgJiYgZGF0YS5jb21wYXJlVmFsdWUgIT09IG51bGwpIHtcbiAgICAgIHRvb2x0aXBJbmRpY2F0b3IgPSBgPGRpdiBjbGFzcz1cIm1ldHJpYy1ibG9jay1pbmRpY2F0b3IgJHtkYXRhLmNvbXBhcmVDaGFuZ2VEaXJlY3Rpb259ICR7XG4gICAgICAgIGRhdGEuY29tcGFyZUNoYW5nZUludmVyc2UgPyAnaW52ZXJzZScgOiAnJ1xuICAgICAgfSBtbC0yXCI+PHNwYW4+JHt0aGlzLnRvb2x0aXBDb21wYXJlQ2hhbmdlRm9ybWF0KGRhdGEuY29tcGFyZUNoYW5nZVZhbHVlKX08L3NwYW4+PC9kaXY+YDtcbiAgICB9XG5cbiAgICB0aGlzLnRvb2x0aXAuaHRtbCgoKSA9PiB7XG4gICAgICByZXR1cm4gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwidG9vbHRpcC1sYWJlbCBmb250LXdlaWdodC1ib2xkXCI+JHt0b29sdGlwTGFiZWx9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCIke3Rvb2x0aXBDb21wYXJlRGF0ZXJhbmdlTWFyZ2lufVwiPiR7dG9vbHRpcENvbXBhcmVEYXRlcmFuZ2V9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0b29sdGlwLXZhbHVlIGZvbnQtd2VpZ2h0LWJvbGRcIj4ke3Rvb2x0aXBDb21wYXJlVmFsdWV9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCIke3Rvb2x0aXBEYXRlcmFuZ2VNYXJnaW59XCI+JHt0b29sdGlwRGF0ZXJhbmdlfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidG9vbHRpcC12YWx1ZVwiPjxzcGFuIGNsYXNzPVwiZm9udC13ZWlnaHQtYm9sZFwiPiR7dG9vbHRpcFZhbHVlfTwvc3Bhbj4gPHNwYW4+JHt0b29sdGlwSW5kaWNhdG9yfTwvc3Bhbj48L2Rpdj5cbiAgICAgIGA7XG4gICAgfSk7XG5cbiAgICBjb25zdCB0b29sdGlwT2Zmc2V0V2lkdGggPSArdGhpcy50b29sdGlwLm5vZGUoKS5vZmZzZXRXaWR0aCAvIDI7XG4gICAgY29uc3QgdG9vbHRpcE9mZnNldEhlaWdodCA9ICt0aGlzLnRvb2x0aXAubm9kZSgpLm9mZnNldEhlaWdodDtcbiAgICBjb25zdCB0b29sdGlwVGlwU2l6ZSA9IDg7XG5cbiAgICB0aGlzLnRvb2x0aXAuc3R5bGUoJ3RvcCcsIGAkeytzY3JvbGxbMV0gKyArZGltZW5zaW9ucy50b3AgLSB0b29sdGlwT2Zmc2V0SGVpZ2h0IC0gdG9vbHRpcFRpcFNpemV9cHhgKTtcblxuICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoID4gMSkge1xuICAgICAgdGhpcy50b29sdGlwLnN0eWxlKCdsZWZ0JywgYCR7K3Njcm9sbFswXSArICtkaW1lbnNpb25zLmxlZnQgLSB0b29sdGlwT2Zmc2V0V2lkdGggKyArZGltZW5zaW9ucy53aWR0aCAvIDJ9cHhgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50b29sdGlwLnN0eWxlKCdsZWZ0JywgYCR7K3Njcm9sbFswXSAtIHRvb2x0aXBPZmZzZXRXaWR0aCArICtkaW1lbnNpb25zLnJpZ2h0fXB4YCk7XG4gICAgfVxuXG4gICAgdGhpcy50b29sdGlwLnN0eWxlKCdvcGFjaXR5JywgMSk7XG4gIH07XG5cbiAgcHJpdmF0ZSB0b29sdGlwSGlkZSA9ICgpID0+IHtcbiAgICB0aGlzLnRvb2x0aXAuc3R5bGUoJ29wYWNpdHknLCAwKTtcbiAgfTtcblxuICBsZWdlbmRNb3VzZU92ZXIgPSAoZXZlbnQsIGRhdGEsIGluZGV4LCBub2RlcykgPT4ge1xuICAgIGlmICghdGhpcy5oaWRlTGVnZW5kVG9vbHRpcCkge1xuICAgICAgY29uc3QgYmFySG92ZXIgPSB0aGlzLnN2Z1xuICAgICAgICAuc2VsZWN0QWxsKCcuYmFyJylcbiAgICAgICAgLmZpbHRlcigoZCwgaSkgPT4gaSA9PT0gaW5kZXgpXG4gICAgICAgIC5ub2RlKCk7XG5cbiAgICAgIHRoaXMudG9vbHRpcFNob3coZGF0YSwgYmFySG92ZXIpO1xuICAgIH1cblxuICAgIHRoaXMuY2hhcnRcbiAgICAgIC5zZWxlY3RBbGwoJy5sZWdlbmQtaXRlbScpXG4gICAgICAuZmlsdGVyKChkLCBpKSA9PiBpICE9PSBpbmRleClcbiAgICAgIC5jbGFzc2VkKCdpbmFjdGl2ZScsIHRydWUpO1xuXG4gICAgdGhpcy5jaGFydFxuICAgICAgLnNlbGVjdEFsbCgnLmJhcicpXG4gICAgICAuZmlsdGVyKChkLCBpKSA9PiBpICE9PSBpbmRleClcbiAgICAgIC5jbGFzc2VkKCdpbmFjdGl2ZScsIHRydWUpO1xuXG4gICAgdGhpcy5jaGFydFxuICAgICAgLnNlbGVjdEFsbCgnLmJhcicpXG4gICAgICAuZmlsdGVyKChkLCBpKSA9PiBpID09PSBpbmRleClcbiAgICAgIC5jbGFzc2VkKCdpbmFjdGl2ZScsIG51bGwpO1xuXG4gICAgdGhpcy5ob3ZlcmVkLmVtaXQoeyBldmVudCwgZGF0YSB9KTtcbiAgfTtcblxuICBsZWdlbmRNb3VzZU91dCA9ICgpID0+IHtcbiAgICB0aGlzLmNoYXJ0LnNlbGVjdEFsbCgnLmxlZ2VuZC1pdGVtJykuY2xhc3NlZCgnaW5hY3RpdmUnLCBmYWxzZSk7XG5cbiAgICB0aGlzLmNoYXJ0XG4gICAgICAuc2VsZWN0QWxsKCcuYmFyJylcbiAgICAgIC5jbGFzc2VkKCdpbmFjdGl2ZScsIGZhbHNlKVxuICAgICAgLnN0eWxlKCdmaWxsJywgbnVsbCk7XG5cbiAgICAvLyBoaWRlIHRvb2x0aXAgZm9yIHplcm8vbnVsbCB2YWx1ZXNcbiAgICB0aGlzLnRvb2x0aXBIaWRlKCk7XG4gIH07XG5cbiAgbGVnZW5kTW91c2VDbGljayA9IChldmVudCwgZGF0YSwgaW5kZXgsIG5vZGVzKSA9PiB7XG4gICAgdGhpcy5jbGlja2VkLmVtaXQoeyBldmVudCwgZGF0YSB9KTtcbiAgfTtcblxuICBwcml2YXRlIHhBeGlzRm9ybWF0dGVyID0gaXRlbSA9PiB7XG4gICAgc3dpdGNoICh0aGlzLnhBeGlzRm9ybWF0VHlwZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgcmV0dXJuIGAke3RoaXMueEF4aXNGb3JtYXQoaXRlbSl9JHt0aGlzLnhBeGlzVGlja0xhYmVsU3VmZml4fWA7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBgJHtpdGVtfSR7dGhpcy54QXhpc1RpY2tMYWJlbFN1ZmZpeH1gO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==