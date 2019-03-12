import { select, scaleOrdinal, pie, arc, interpolate, mouse, format, isoParse, timeFormat, scaleBand, scaleLinear, min, max, axisBottom, axisLeft, event as event$1, isoFormat, scaleTime, line, extent, curveCatmullRom, bisectLeft, area } from 'd3';
import { Injectable, NgModule, Directive, HostListener, HostBinding, ElementRef, Input, Component, Output, EventEmitter, ChangeDetectionStrategy, defineInjectable } from '@angular/core';
import { ViewportScroller, CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PbdsDatavizService {
    constructor() {
        this.colors = {
            mono: ['#00436e', '#005a93', '#0072b8', '#66aad4', '#cce3f1', '#e5f1f8'],
            theme: [
                '#3e53a4',
                '#cf0989',
                '#009bdf',
                '#ee6b0b',
                '#edb700',
                '#a03f9b',
                '#00b140',
                '#66c3ec',
                '#c0c0c0',
                '#f5a66d',
                '#8b98c8',
                '#aad88f'
            ]
        };
        this.getColors = (/**
         * @param {?} mono
         * @return {?}
         */
        mono => {
            return mono ? this.colors.mono : this.colors.theme;
        });
        this.createGradientDefs = (/**
         * @param {?} svg
         * @param {?} mono
         * @return {?}
         */
        (svg, mono) => {
            /** @type {?} */
            const colors = mono ? [this.colors.mono[2]] : this.colors.theme;
            for (let i = 0; i < colors.length; i++) {
                /** @type {?} */
                const color = mono ? this.colors.mono[2] : this.colors.theme[i];
                /** @type {?} */
                const gradient = svg
                    .append('defs')
                    .append('linearGradient')
                    .attr('id', `gradient-${color.replace('#', '')}`)
                    .attr('x1', '0')
                    .attr('y1', '0')
                    .attr('x2', '0')
                    .attr('y2', '1')
                    .attr('spreadMethod', 'pad');
                gradient
                    .append('stop')
                    .attr('offset', '0%')
                    .attr('stop-color', color)
                    .attr('stop-opacity', '1'); // top of bar will be full opacity
                gradient
                    .append('stop')
                    .attr('offset', '100%')
                    .attr('stop-color', color)
                    .attr('stop-opacity', '.3'); // bottom of bar will be .3 opacity
            }
            return colors;
        });
        this.createGlowFilter = (/**
         * @param {?} svg
         * @return {?}
         */
        svg => {
            // add a new definition
            /** @type {?} */
            const glow = svg
                .append('defs')
                .append('filter')
                .attr('id', 'glow')
                .attr('width', '200%')
                .attr('height', '200%');
            glow
                .append('feGaussianBlur')
                .attr('in', 'SourceGraphic')
                .attr('stdDeviation', 4);
            // build two dropshadows with different intensities
            /** @type {?} */
            const feOffsets = [
                {
                    dy: 2,
                    slope: 0.2
                },
                {
                    dy: 5,
                    slope: 0.05
                }
            ];
            for (let i = 0; i < feOffsets.length; i++) {
                glow
                    .append('feOffset')
                    .attr('result', 'offsetBlur' + i)
                    .attr('dx', 0)
                    .attr('dy', feOffsets[i].dy);
            }
            for (let y = 0; y < feOffsets.length; y++) {
                glow
                    .append('feComponentTransfer')
                    .attr('result', 'coloredBlur' + y)
                    .attr('in', 'offsetBlur' + y)
                    .append('feFuncA')
                    .attr('type', 'linear')
                    .attr('slope', feOffsets[y].slope);
            }
            /** @type {?} */
            let merge = glow.append('feMerge');
            merge.append('feMergeNode').attr('in', 'SourceGraphic');
            for (let x = 0; x < feOffsets.length; x++) {
                merge.append('feMergeNode').attr('in', 'coloredBlur' + x);
            }
        });
    }
}
PbdsDatavizService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
PbdsDatavizService.ctorParameters = () => [];
/** @nocollapse */ PbdsDatavizService.ngInjectableDef = defineInjectable({ factory: function PbdsDatavizService_Factory() { return new PbdsDatavizService(); }, token: PbdsDatavizService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PbdsDatavizPieComponent {
    /**
     * @param {?} _dataviz
     * @param {?} _element
     */
    constructor(_dataviz, _element) {
        this._dataviz = _dataviz;
        this._element = _element;
        this.chartClass = true;
        this.pieClass = true;
        this.width = 300;
        this.type = 'pie';
        this.mono = false;
        // TODO: do we need a tooltipFormatType?
        this.tooltipFormatString = '';
        // TODO: add input for legendFormatType?
        this.legendFormatString = '';
        this.hovered = new EventEmitter();
        this.clicked = new EventEmitter();
        this.legendMouseOverFocus = (/**
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (data, index, nodes) => {
            this.chart
                .selectAll('.legend-item')
                .filter((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => i !== index))
                .classed('inactive', true);
        });
        this.legendMouseOutBlur = (/**
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (data, index, nodes) => {
            this.chart.selectAll('.legend-item').classed('inactive', false);
        });
        this.pathMouseOver = (/**
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (data, index, nodes) => {
            /** @type {?} */
            let slices = this.chart.selectAll('.slice');
            /** @type {?} */
            let slice = slices.filter((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => i === index));
            this.chart
                .selectAll('.legend-item')
                .filter((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => i !== index))
                .classed('inactive', true);
            slices.filter((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => i !== index)).classed('inactive', true);
            slice
                .transition()
                .duration(300)
                .delay(0)
                .attrTween('d', (/**
             * @param {?} d
             * @return {?}
             */
            (d) => {
                /** @type {?} */
                let i = interpolate(d.outerRadius, this.outerRadius + this.arcZoom);
                return (/**
                 * @param {?} t
                 * @return {?}
                 */
                t => {
                    d.outerRadius = i(t);
                    return this.arc(d);
                });
            }));
            this.hovered.emit(data.data ? data.data : data); // legend hover data is different than slice hover data
        });
        this.pathMouseOut = (/**
         * @param {?} data
         * @param {?} index
         * @param {?} value
         * @return {?}
         */
        (data, index, value) => {
            /** @type {?} */
            let slices = this.chart.selectAll('.slice');
            /** @type {?} */
            let slice = slices.filter((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => i === index));
            this.chart
                .selectAll('.legend-item')
                .filter((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => i !== index))
                .classed('inactive', false);
            slices.classed('inactive', false);
            slice
                .transition()
                .duration(300)
                .delay(0)
                .attrTween('d', (/**
             * @param {?} d
             * @return {?}
             */
            (d) => {
                /** @type {?} */
                let i = interpolate(d.outerRadius, this.outerRadius);
                return (/**
                 * @param {?} t
                 * @return {?}
                 */
                t => {
                    d.outerRadius = i(t);
                    return this.arc(d);
                });
            }));
        });
        this.pathClick = (/**
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (data, index, nodes) => {
            this.clicked.emit(data.data);
        });
        this.tooltipShow = (/**
         * @param {?} node
         * @param {?} data
         * @return {?}
         */
        (node, data) => {
            this.tooltipSetPosition(node);
            /** @type {?} */
            let percentage = (data.endAngle - data.startAngle) / (2 * Math.PI);
            this.tooltip.html(`
        <div class="tooltip-label">${data.data.label}</div>
        <div class="tooltip-value">${this.tooltipFormat(percentage)}</div>
      `);
            this.tooltip.style('opacity', 1);
        });
        this.tooltipMove = (/**
         * @param {?} node
         * @return {?}
         */
        node => {
            this.tooltipSetPosition(node);
        });
        this.tooltipHide = (/**
         * @return {?}
         */
        () => {
            this.tooltip.style('opacity', 0);
        });
        this.tooltipSetPosition = (/**
         * @param {?} node
         * @return {?}
         */
        node => {
            /** @type {?} */
            let coordinates = mouse(node);
            this.tooltip.style('left', `${coordinates[0] + 16}px`);
            this.tooltip.style('top', `${coordinates[1] + 16}px`);
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.margin = { top: 10, right: 10, bottom: 10, left: 10 };
        this.width = this.width - this.margin.left - this.margin.right;
        this.height = this.width - this.margin.top - this.margin.bottom;
        this.colors = this._dataviz.getColors(this.mono);
        this.innerRadius = Math.min(this.width, this.height) / 2.5;
        this.outerRadius = Math.min(this.width, this.height) / 2;
        this.arcZoom = 10;
        this.anglePad = 0.02;
        this.legendFormat = format(this.legendFormatString);
        this.tooltipFormat = format(this.tooltipFormatString);
        this.colorRange = scaleOrdinal()
            .range(this.colors)
            .domain(this.data.map((/**
         * @param {?} c
         * @return {?}
         */
        c => c.label)));
        if (this.type === 'pie') {
            this.innerRadius = 0;
            this.anglePad = 0;
        }
        this.chart = select(this._element.nativeElement).attr('aria-hidden', 'true');
        this.svg = this.chart
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('class', 'img-fluid')
            .attr('preserveAspectRatio', 'xMinYMin meet')
            .attr('viewBox', `-${this.width / 2 + this.margin.left} -${this.height / 2 + this.margin.top} ${this.width +
            this.margin.left +
            this.margin.right} ${this.height + this.margin.top + this.margin.bottom}`);
        this.pie = pie()
            .padAngle(this.anglePad)
            .value((/**
         * @param {?} d
         * @return {?}
         */
        (d) => d.value));
        this.arc = arc()
            .padRadius(this.outerRadius)
            .innerRadius(this.innerRadius);
        this.paths = this.svg
            .selectAll('path')
            .data(this.pie(this.data))
            .enter()
            .append('path')
            .each((/**
         * @param {?} d
         * @return {?}
         */
        (d) => (d.outerRadius = this.outerRadius)))
            .attr('d', this.arc)
            .attr('fill', (/**
         * @param {?} d
         * @return {?}
         */
        (d) => this.colorRange(d.data.label)))
            .attr('class', 'slice');
        if (this.type === 'pie') {
            this.paths
                .style('stroke', '#fff')
                .style('stroke-width', 2)
                .style('stroke-alignment', 'inner');
        }
        this.legend = this.chart
            .append('ul')
            .attr('class', 'legend legend-right')
            .selectAll('li')
            .data(this.data)
            .enter()
            .append('li')
            .attr('tabindex', 0)
            .attr('class', 'legend-item');
        this.legend
            .append('span')
            .attr('class', 'legend-key')
            .style('background-color', (/**
         * @param {?} d
         * @return {?}
         */
        (d) => this.colorRange(d.label)));
        /** @type {?} */
        let legendDescription = this.legend.append('span').attr('class', 'legend-description');
        legendDescription
            .append('span')
            .attr('class', 'legend-label')
            .html((/**
         * @param {?} d
         * @return {?}
         */
        (d) => d.label));
        legendDescription
            .append('span')
            .attr('class', 'legend-value')
            .html((/**
         * @param {?} d
         * @return {?}
         */
        (d) => this.legendFormat(d.value)));
        this.legend
            .on('mouseover focus', (/**
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (data, index, nodes) => {
            this.legendMouseOverFocus(data, index, nodes);
            this.pathMouseOver(data, index, nodes);
        }))
            .on('mouseout blur', (/**
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (data, index, nodes) => {
            this.legendMouseOutBlur(data, index, nodes);
            this.pathMouseOut(data, index, nodes);
        }))
            .on('click', (/**
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (data, index, nodes) => {
            this.clicked.emit(data);
        }));
        this.paths
            .on('mouseover', (/**
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (data, index, nodes) => {
            this.pathMouseOver(data, index, nodes);
            this.tooltipShow(this.chart.node(), data);
        }))
            .on('mousemove', (/**
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (data, index, nodes) => {
            this.tooltipMove(this.chart.node());
        }))
            .on('mouseout', (/**
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (data, index, nodes) => {
            this.pathMouseOut(data, index, nodes);
            this.tooltipHide();
        }))
            .on('click', (/**
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (data, index, nodes) => {
            this.pathClick(data, index, nodes);
        }));
        this.tooltip = this.chart
            .append('div')
            .style('opacity', 0)
            .attr('class', 'pbds-tooltip')
            .attr('aria-hidden', 'true');
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if ((changes.data && !changes.data.firstChange) || (changes.mono && !changes.mono.firstChange)) {
            // TODO: refactor to use update() function instead
            this.chart.selectAll('svg').remove();
            this.chart.selectAll('ul').remove();
            this.chart.selectAll('div').remove();
            this.ngOnInit();
        }
    }
}
PbdsDatavizPieComponent.decorators = [
    { type: Component, args: [{
                selector: 'pbds-dataviz-pie',
                template: ``
            }] }
];
/** @nocollapse */
PbdsDatavizPieComponent.ctorParameters = () => [
    { type: PbdsDatavizService },
    { type: ElementRef }
];
PbdsDatavizPieComponent.propDecorators = {
    chartClass: [{ type: HostBinding, args: ['class.pbds-chart',] }],
    pieClass: [{ type: HostBinding, args: ['class.pbds-chart-pie',] }],
    data: [{ type: Input }],
    width: [{ type: Input }],
    type: [{ type: Input }],
    mono: [{ type: Input }],
    tooltipFormatString: [{ type: Input }],
    legendFormatString: [{ type: Input }],
    hovered: [{ type: Output }],
    clicked: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PbdsDatavizBarComponent {
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
        this.barClass = true;
        this.width = 306;
        this.height = 400;
        this.type = 'medium'; // debug to show all chart options
        // debug to show all chart options
        this.singleSeries = false;
        this.xAxisFormatType = null;
        this.xAxisFormatString = '';
        this.xAxisBuffer = 0.01;
        this.yAxisFormatType = null;
        this.yAxisFormatString = '';
        this.yAxisTicks = 5;
        this.yAxisBuffer = 0.01;
        this.hideLegend = false;
        this.legendWidth = 105 + 28; // hardcoded legend width + left margin, do not document until feedback
        // hardcoded legend width + left margin, do not document until feedback
        this.legendPosition = 'right';
        this.legendLabelFormatType = null;
        this.legendLabelFormatString = '';
        this.tooltipLabelFormatType = null;
        this.tooltipLabelFormatString = '';
        this.tooltipValueFormatType = null;
        this.tooltipValueFormatString = '';
        this.marginTop = 0; // hardcoded on purpose, do not document until feedback
        // hardcoded on purpose, do not document until feedback
        this.marginRight = 0; // hardcoded on purpose, do not document until feedback
        // hardcoded on purpose, do not document until feedback
        this.marginBottom = 30; // hardcoded on purpose, do not document until feedback
        // hardcoded on purpose, do not document until feedback
        this.marginLeft = 55; // hardcoded on purpose, do not document until feedback
        // hardcoded on purpose, do not document until feedback
        this.threshold = null;
        this.average = null;
        this.hovered = new EventEmitter();
        this.clicked = new EventEmitter();
        this.updateChart = (/**
         * @return {?}
         */
        () => {
            // update the xScale
            this.xAxisScale.domain(this.data.map((/**
             * @param {?} d
             * @return {?}
             */
            d => d.label)));
            // update the yScale
            this.yAxisScale
                .domain([
                min(this.data, (/**
                 * @param {?} d
                 * @return {?}
                 */
                d => d.value - d.value * +this.xAxisBuffer)),
                max(this.data, (/**
                 * @param {?} d
                 * @return {?}
                 */
                d => d.value + d.value * +this.yAxisBuffer))
            ])
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
            if (!this.hideGrayBars) {
                // rebind data to groups
                /** @type {?} */
                let group = this.svg.selectAll('.bar-group').data(this.data);
                // remove bars
                group.exit().remove();
                // update gray bars
                group
                    .select('.gray-bar')
                    .transition()
                    .duration(1000)
                    .attr('x', (/**
                 * @param {?} d
                 * @return {?}
                 */
                d => this.xAxisScale(d.label)))
                    .attr('width', this.xAxisScale.bandwidth());
                // update the existing bars
                group
                    .select('.bar')
                    .transition()
                    .duration(1000)
                    .attr('x', (/**
                 * @param {?} d
                 * @return {?}
                 */
                d => this.xAxisScale(d.label) + this.xAxisScale.bandwidth() / 4))
                    .attr('width', this.xAxisScale.bandwidth() / 2)
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
                // add group on enter
                /** @type {?} */
                const groupEnter = group
                    .enter()
                    .append('g')
                    .attr('class', 'bar-group');
                // add gray bars on enter
                groupEnter
                    .append('rect')
                    .attr('class', 'gray-bar')
                    .attr('rx', 0)
                    .attr('height', 0)
                    .attr('x', (/**
                 * @param {?} d
                 * @return {?}
                 */
                d => this.xAxisScale(d.label)))
                    .attr('width', this.xAxisScale.bandwidth())
                    .transition()
                    // .delay(1000)
                    .attr('height', this.height)
                    .attr('width', this.xAxisScale.bandwidth());
                // add bars on enter
                groupEnter
                    .append('rect')
                    .attr('class', 'bar')
                    .attr('rx', 2)
                    .attr('fill', (/**
                 * @param {?} d
                 * @return {?}
                 */
                d => `url(#gradient-${this.colorRange(d.label).substr(1)})`)) // removes hash to prevent safari bug;
                    .attr('x', (/**
                 * @param {?} d
                 * @return {?}
                 */
                d => this.xAxisScale(d.label) + this.xAxisScale.bandwidth() / 4))
                    .attr('width', this.xAxisScale.bandwidth() / 2)
                    .attr('y', this.height)
                    .attr('height', 0)
                    .transition()
                    .duration(1000)
                    // .delay(1000)
                    .attr('y', (/**
                 * @param {?} d
                 * @return {?}
                 */
                d => this.yAxisScale(d.value)))
                    .attr('height', (/**
                 * @param {?} d
                 * @return {?}
                 */
                d => this.height - this.yAxisScale(d.value)))
                    .attr('data-color', (/**
                 * @param {?} d
                 * @return {?}
                 */
                d => this.colorRange(d.label)));
                groupEnter
                    .select('.bar')
                    .on('mouseover focus', (/**
                 * @param {?} data
                 * @param {?} index
                 * @param {?} nodes
                 * @return {?}
                 */
                (data, index, nodes) => this.barMouseOverFocus(event$1, data, index, nodes)))
                    .on('mouseout blur', (/**
                 * @param {?} data
                 * @param {?} index
                 * @param {?} nodes
                 * @return {?}
                 */
                (data, index, nodes) => this.barMouseOutBlur()))
                    .on('click', (/**
                 * @param {?} data
                 * @param {?} index
                 * @param {?} nodes
                 * @return {?}
                 */
                (data, index, nodes) => this.barMouseClick(event$1, data, index, nodes)));
            }
            else {
                // rebind data to groups
                /** @type {?} */
                let group = this.svg.selectAll('.bar-group').data(this.data);
                // remove bars
                group.exit().remove();
                // update the existing bars
                group
                    .select('.bar')
                    .attr('x', (/**
                 * @param {?} d
                 * @return {?}
                 */
                d => this.xAxisScale(d.label) + this.xAxisScale.bandwidth() / 5.5))
                    .attr('width', this.xAxisScale.bandwidth() / 1.5)
                    .transition()
                    .duration(1000)
                    .attr('y', (/**
                 * @param {?} d
                 * @return {?}
                 */
                d => this.yAxisScale(d.value)))
                    .attr('height', (/**
                 * @param {?} d
                 * @return {?}
                 */
                d => this.height - this.yAxisScale(d.value)));
                // add group on enter
                /** @type {?} */
                const groupEnter = group
                    .enter()
                    .append('g')
                    .attr('class', 'bar-group');
                // add bars on enter
                groupEnter
                    .append('rect')
                    .attr('class', 'bar')
                    .attr('rx', 2)
                    .attr('fill', (/**
                 * @param {?} d
                 * @return {?}
                 */
                d => `url(#gradient-${this.colorRange(d.label).substr(1)})`)) // removes hash to prevent safari bug;
                    .attr('x', (/**
                 * @param {?} d
                 * @return {?}
                 */
                d => this.xAxisScale(d.label) + this.xAxisScale.bandwidth() / 5.5))
                    .attr('width', this.xAxisScale.bandwidth() / 1.5)
                    .attr('y', this.height)
                    .attr('height', 0)
                    .transition()
                    .duration(1000)
                    .attr('y', (/**
                 * @param {?} d
                 * @return {?}
                 */
                d => this.yAxisScale(d.value)))
                    .attr('height', (/**
                 * @param {?} d
                 * @return {?}
                 */
                d => this.height - this.yAxisScale(d.value)))
                    .attr('data-color', (/**
                 * @param {?} d
                 * @return {?}
                 */
                d => this.colorRange(d.label)));
                groupEnter
                    .select('.bar')
                    .on('mouseover focus', (/**
                 * @param {?} data
                 * @param {?} index
                 * @param {?} nodes
                 * @return {?}
                 */
                (data, index, nodes) => this.barMouseOverFocus(event$1, data, index, nodes)))
                    .on('mouseout blur', (/**
                 * @return {?}
                 */
                () => this.barMouseOutBlur()))
                    .on('click', (/**
                 * @param {?} data
                 * @param {?} index
                 * @param {?} nodes
                 * @return {?}
                 */
                (data, index, nodes) => this.barMouseClick(event$1, data, index, nodes)));
            }
            if (!this.hideLegend) {
                /** @type {?} */
                let legendItem = this.chart
                    .select('.legend')
                    .selectAll('.legend-item')
                    .data(this.data);
                legendItem.exit().remove();
                // update existing items
                legendItem.select('.legend-label').html((/**
                 * @param {?} d
                 * @return {?}
                 */
                d => {
                    // return this.legendLabelFormat === null ? d.label : this.legendLabelFormat(d.label);
                    switch (this.legendLabelFormatType) {
                        case 'number':
                            return this.legendLabelFormat(d.label);
                        case 'time':
                            /** @type {?} */
                            const parsedTime = isoParse(d.label);
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
                    // return this.legendLabelFormat === null ? d.label : this.legendLabelFormat(d.label);
                    switch (this.legendLabelFormatType) {
                        case 'number':
                            return this.legendLabelFormat(d.label);
                        case 'time':
                            /** @type {?} */
                            const parsedTime = isoParse(d.label);
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
                (data, index, nodes) => this.legendMouseOver(event$1, data, index, nodes)))
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
                (data, index, nodes) => this.legendMouseClick(event$1, data, index, nodes)));
            }
            if (this.threshold) {
                this.yThreshold
                    .raise()
                    .transition()
                    .duration(1000)
                    .attr('transform', `translate(0,  ${this.yAxisScale(+this.threshold)})`);
            }
            if (this.average) {
                this.yAverage
                    .raise()
                    .transition()
                    .duration(1000)
                    .attr('transform', `translate(0,  ${this.yAxisScale(+this.average)})`);
            }
        });
        this.barMouseOverFocus = (/**
         * @param {?} event
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (event, data, index, nodes) => {
            this.chart
                .selectAll('.bar-group')
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
                .filter((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => i === index))
                .select('.bar');
            /** @type {?} */
            const barColor = bar.attr('data-color');
            bar.style('fill', (/**
             * @return {?}
             */
            () => barColor));
            this.chart
                .selectAll('.legend-item')
                .filter((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => i !== index))
                .classed('inactive', true);
            this.tooltipShow(data, nodes.filter((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => i === index)));
            this.hovered.emit({ event, data });
        });
        this.barMouseOutBlur = (/**
         * @return {?}
         */
        () => {
            this.chart
                .selectAll('.bar-group')
                .classed('inactive', false)
                .select('.bar')
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
                .filter((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => i === index))
                .select('.bar');
            /** @type {?} */
            const barColor = bar.attr('data-color');
            bar.style('fill', (/**
             * @return {?}
             */
            () => barColor));
            this.tooltipShow(data, this.chart.selectAll('.bar').filter((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => i === index))._groups[0]); // TODO: find better way than using _groups
            this.hovered.emit({ event, data });
        });
        this.legendMouseOut = (/**
         * @return {?}
         */
        () => {
            this.chart.selectAll('.legend-item').classed('inactive', false);
            this.chart
                .selectAll('.bar-group')
                .classed('inactive', false)
                .select('.bar')
                .style('fill', null);
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
        this.tooltipShow = (/**
         * @param {?} data
         * @param {?} node
         * @return {?}
         */
        (data, node) => {
            /** @type {?} */
            let dimensions = node[0].getBoundingClientRect();
            /** @type {?} */
            let scroll = this._scroll.getScrollPosition();
            /** @type {?} */
            let label;
            switch (this.tooltipLabelFormatType) {
                case 'number':
                    label = this.legendLabelFormat(data.label);
                    break;
                case 'time':
                    /** @type {?} */
                    const parsedTime = isoParse(data.label);
                    label = this.legendLabelFormat(parsedTime);
                    break;
                default:
                    label = data.label;
            }
            /** @type {?} */
            let value = this.tooltipValueFormat === null
                ? `<div class="tooltip-value">${data.value}</div>`
                : `<div class="tooltip-value">${this.tooltipValueFormat(data.value)}</div>`;
            this.tooltip.html(`
        ${this.hideTooltipLabel ? '' : `${label}`}
        ${value}
      `);
            /** @type {?} */
            let tooltipOffsetWidth = +this.tooltip.node().offsetWidth / 2;
            /** @type {?} */
            let tooltipOffsetHeight = +this.tooltip.node().offsetHeight + 8;
            this.tooltip.style('top', `${+scroll[1] + +dimensions.top - tooltipOffsetHeight}px`); //
            this.tooltip.style('left', `${+scroll[0] + +dimensions.left - tooltipOffsetWidth + +dimensions.width / 2}px`);
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
                    const parseDate = isoParse(item);
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
                    const parseDate = isoParse(item);
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
                this.xAxisFormat = format(this.xAxisFormatString);
                break;
            case 'time':
                this.xAxisFormat = timeFormat(this.xAxisFormatString);
                break;
        }
        switch (this.yAxisFormatType) {
            case 'number':
                this.yAxisFormat = format(this.yAxisFormatString);
                break;
            case 'time':
                this.yAxisFormat = timeFormat(this.yAxisFormatString);
                break;
        }
        switch (this.legendLabelFormatType) {
            case 'number':
                this.legendLabelFormat = format(this.legendLabelFormatString);
                break;
            case 'time':
                this.legendLabelFormat = timeFormat(this.legendLabelFormatString);
                break;
            default:
                this.legendLabelFormat = null;
                break;
        }
        switch (this.tooltipLabelFormatType) {
            case 'number':
                this.tooltipLabelFormat = format(this.tooltipLabelFormatString);
                break;
            case 'time':
                this.tooltipLabelFormat = timeFormat(this.tooltipLabelFormatString);
                break;
            default:
                this.tooltipLabelFormat = null;
                break;
        }
        switch (this.tooltipValueFormatType) {
            case 'number':
                this.tooltipValueFormat = format(this.tooltipValueFormatString);
                break;
            case 'time':
                this.tooltipValueFormat = timeFormat(this.tooltipValueFormatString);
                break;
            default:
                this.tooltipValueFormat = null;
        }
        // defaults for all chart types
        this.hideGrayBars = false;
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
        this.hideTooltipLabel = false;
        if (this.type !== 'debug') {
            // set type defaults
            switch (this.type) {
                case 'low':
                    this.hideGrayBars = true;
                    this.hideXAxis = !this.hideLegend;
                    this.hideXAxisTicks = true;
                    this.hideXGrid = true;
                    this.hideYAxisDomain = false;
                    this.hideYAxisTicks = true;
                    this.legendPosition = 'bottom';
                    this.hideTooltipLabel = true;
                    break;
                case 'medium':
                    this.hideXAxisDomain = true;
                    this.hideXAxis = !this.hideLegend;
                    this.hideXGrid = true;
                    this.hideXAxisTicks = true;
                    this.hideYAxisDomain = true;
                    this.hideYAxisTicks = true;
                    this.hideYGrid = true;
                    this.hideTooltipLabel = true;
                    break;
                case 'high':
                    this.hideXAxis = true;
                    this.hideXAxisDomain = true;
                    this.hideXGrid = true;
                    this.hideYAxisDomain = true;
                    this.hideYAxisTicks = true;
                    this.hideYGrid = true;
                    this.hideLegend = true;
                    this.hideTooltipLabel = false;
                    break;
            }
            // single series overrides
            if (this.singleSeries) {
                this.hideLegend = true;
                this.hideXAxis = true;
                this.hideXGrid = true;
                this.hideTooltipLabel = false;
            }
        }
        // adjust margin if xAxis hidden
        if (this.hideXAxis)
            this.margin.bottom = 10; // need small margin for yAxis with 0 tick label
        if (!this.hideLegend && this.legendPosition === 'right') {
            this.width = +this.width - +this.legendWidth;
        }
        // create the chart
        this.chart = select(this._element.nativeElement).attr('aria-hidden', 'true');
        // create chart svg
        this.svg = this.chart
            .append('svg')
            .attr('width', +this.width)
            .attr('height', +this.height + this.margin.top + this.margin.bottom)
            .attr('class', 'img-fluid')
            .attr('preserveAspectRatio', 'xMinYMin meet')
            .attr('viewBox', `-${this.margin.left} -${this.margin.top} ${+this.width} ${+this.height + this.margin.top + this.margin.bottom}`);
        // build color ranges
        this.colorRange = scaleOrdinal().range(this._dataviz.createGradientDefs(this.svg, this.singleSeries));
        // X AXIS
        this.xAxisScale = scaleBand()
            .domain(this.data.map((/**
         * @param {?} d
         * @return {?}
         */
        d => d.label)))
            .rangeRound([0, this.width - this.margin.left])
            .align(0);
        // add padding to the scale for gray bars
        !this.hideGrayBars
            ? this.xAxisScale.paddingInner(0.1).paddingOuter(0)
            : this.xAxisScale.paddingInner(0).paddingOuter(0);
        this.xAxisCall = axisBottom(this.xAxisScale)
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
        if (!this.hideXGrid) {
            this.xGridCall = axisBottom(this.xAxisScale).tickSize(-this.height);
            this.xGrid = this.svg
                .append('g')
                .attr('class', 'grid grid-x')
                .classed('grid-zero-hidden', this.hideXAxisZero)
                .attr('transform', `translate(0, ${this.height})`)
                .call(this.xGridCall);
        }
        // Y AXIS
        this.yAxisScale = scaleLinear()
            .domain([
            min(this.data, (/**
             * @param {?} d
             * @return {?}
             */
            d => d.value - d.value * +this.xAxisBuffer)),
            max(this.data, (/**
             * @param {?} d
             * @return {?}
             */
            d => d.value + d.value * +this.yAxisBuffer))
        ])
            .nice()
            .rangeRound([this.height, 0]);
        this.yAxisCall = axisLeft(this.yAxisScale)
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
            this.yGridCall = axisLeft(this.yAxisScale)
                .ticks(this.yAxisTicks)
                .tickSize(-this.width + this.margin.left + this.margin.right);
            this.yGrid = this.svg
                .append('g')
                .attr('class', 'grid grid-y')
                .classed('grid-zero-hidden', this.hideYAxisZero)
                .attr('transform', `translate(0, 0)`)
                .call(this.yGridCall);
        }
        // Y THRESHOLD
        if (this.threshold) {
            this.yThreshold = this.svg
                .append('line')
                .attr('class', 'threshold')
                .attr('x2', +this.width)
                .attr('transform', `translate(0,  ${this.yAxisScale(+this.threshold)})`);
        }
        // Y AVERAGE
        if (this.average) {
            this.yAverage = this.svg
                .append('line')
                .attr('class', 'average')
                .attr('x2', +this.width)
                .attr('transform', `translate(0,  ${this.yAxisScale(+this.average)})`);
        }
        // TOOLTIP
        if (!this.hideTooltip) {
            this.tooltip = select('body')
                .append('div')
                .attr('class', 'pbds-tooltip south')
                .style('opacity', 0)
                .attr('aria-hidden', 'true'); // hide tooltip for accessibility
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
PbdsDatavizBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'pbds-dataviz-bar',
                template: ``,
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
PbdsDatavizBarComponent.ctorParameters = () => [
    { type: PbdsDatavizService },
    { type: ElementRef },
    { type: ViewportScroller }
];
PbdsDatavizBarComponent.propDecorators = {
    chartClass: [{ type: HostBinding, args: ['class.pbds-chart',] }],
    barClass: [{ type: HostBinding, args: ['class.pbds-chart-bar',] }],
    data: [{ type: Input }],
    width: [{ type: Input }],
    height: [{ type: Input }],
    type: [{ type: Input }],
    singleSeries: [{ type: Input }],
    xAxisFormatType: [{ type: Input }],
    xAxisFormatString: [{ type: Input }],
    xAxisBuffer: [{ type: Input }],
    yAxisFormatType: [{ type: Input }],
    yAxisFormatString: [{ type: Input }],
    yAxisTicks: [{ type: Input }],
    yAxisBuffer: [{ type: Input }],
    hideLegend: [{ type: Input }],
    legendWidth: [{ type: Input }],
    legendPosition: [{ type: Input }],
    legendLabelFormatType: [{ type: Input }],
    legendLabelFormatString: [{ type: Input }],
    tooltipLabelFormatType: [{ type: Input }],
    tooltipLabelFormatString: [{ type: Input }],
    tooltipValueFormatType: [{ type: Input }],
    tooltipValueFormatString: [{ type: Input }],
    marginTop: [{ type: Input }],
    marginRight: [{ type: Input }],
    marginBottom: [{ type: Input }],
    marginLeft: [{ type: Input }],
    threshold: [{ type: Input }],
    average: [{ type: Input }],
    hovered: [{ type: Output }],
    clicked: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PbdsDatavizLineComponent {
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
            this.xAxisScale.domain(extent(this.data.dates, (/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => {
                return isoParse(d);
            })));
            // update the yScale
            this.yAxisScale
                .domain([
                min(this.data.series, (/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                (d, i) => {
                    return +min(d.values);
                })),
                max(this.data.series, (/**
                 * @param {?} d
                 * @param {?} i
                 * @return {?}
                 */
                (d, i) => {
                    return +max(d.values);
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
            (d, i) => this.xAxisScale(isoParse(this.data.dates[i]))))
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
            const line$$1 = groupEnter
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
                (d, i) => this.xAxisScale(isoParse(this.data.dates[i]))))
                    .attr('cy', (/**
                 * @param {?} d
                 * @return {?}
                 */
                d => this.yAxisScale(d)))
                    .attr('r', this.lineWidth * 2)
                    .style('stroke-width', this.lineWidth);
            }
            if (this.type !== 'high') {
                line$$1.attr('filter', 'url(#glow)');
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
                            const parsedTime = isoParse(d.label);
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
                            const parsedTime = isoParse(d.label);
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
                (data, index, nodes) => this.legendMouseOver(event$1, data, index, nodes)))
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
                (data, index, nodes) => this.legendMouseClick(event$1, data, index, nodes)));
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
            const line$$1 = this.chart.selectAll('.line-group').filter((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => i === index));
            line$$1.classed('active', true);
            if (this.linePoints) {
                /** @type {?} */
                const circles = line$$1.selectAll('circle');
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
            const mouseXDate = this.xAxisScale.invert(mouse(nodes[0])[0]);
            // return date at mouse x position
            /** @type {?} */
            const leftIndex = bisectLeft(this.data.dates, isoFormat(mouseXDate));
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
            const closestIndex = this.data.dates.indexOf(isoFormat(closestDate));
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
                const parsedTime = isoParse(this.data.dates[closestIndex]);
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
            const parseDate = isoParse(item);
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
        this.xAxisFormat = timeFormat(this.xAxisFormatString);
        this.yAxisFormat = format(this.yAxisFormatString);
        switch (this.legendLabelFormatType) {
            case 'number':
                this.legendLabelFormat = format(this.legendLabelFormatString);
                break;
            case 'time':
                this.legendLabelFormat = timeFormat(this.legendLabelFormatString);
                break;
            default:
                this.legendLabelFormat = null;
                break;
        }
        this.tooltipHeadingFormat = timeFormat(this.tooltipHeadingFormatString);
        switch (this.tooltipLabelFormatType) {
            case 'number':
                this.tooltipLabelFormat = format(this.tooltipLabelFormatString);
                break;
            case 'time':
                this.tooltipLabelFormat = timeFormat(this.tooltipLabelFormatString);
                break;
            default:
                this.tooltipLabelFormat = null;
                break;
        }
        switch (this.tooltipValueFormatType) {
            case 'number':
                this.tooltipValueFormat = format(this.tooltipValueFormatString);
                break;
            case 'time':
                this.tooltipValueFormat = timeFormat(this.tooltipValueFormatString);
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
        this.d3line = line()
            .x((/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        (d, i) => this.xAxisScale(isoParse(this.data.dates[i]))))
            .y((/**
         * @param {?} d
         * @return {?}
         */
        (d) => this.yAxisScale(d)));
        // define line curve
        if (this.lineCurved) {
            this.d3line.curve(curveCatmullRom.alpha(0.5));
        }
        // define area
        if (this.area) {
            this.d3area = area()
                .x((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => this.xAxisScale(isoParse(this.data.dates[i]))))
                .y0(this.height)
                .y1((/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => this.yAxisScale(d)));
            if (this.lineCurved) {
                this.d3area.curve(curveCatmullRom.alpha(0.5));
            }
        }
        // create the chart
        this.chart = select(this._element.nativeElement).attr('aria-hidden', 'true');
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
        (data, index, nodes) => this.mouserectMouseMove(event$1, index, nodes)))
            .on('mouseout', (/**
         * @param {?} data
         * @param {?} index
         * @param {?} nodes
         * @return {?}
         */
        (data, index, nodes) => this.mouserectMouseOut(event$1, index, nodes)))
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
        this.colorRange = scaleOrdinal().range(this._dataviz.getColors(false));
        // add glow def
        this._dataviz.createGlowFilter(this.svg);
        // X AXIS
        this.xAxisScale = scaleTime()
            .domain(extent(this.data.dates, (/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        (d, i) => {
            return isoParse(d);
        })))
            .range([0, this.width - this.margin.left - this.margin.right]);
        this.xAxisCall = axisBottom(this.xAxisScale)
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
            this.xGridCall = axisBottom(this.xAxisScale).tickSize(-this.height);
            this.xGrid = this.svg
                .append('g')
                .attr('class', 'grid grid-x')
                .classed('grid-zero-hidden', this.hideXAxisZero)
                .attr('transform', `translate(0, ${this.height})`) //${-this.margin.right / 2}
                .call(this.xGridCall);
        }
        // Y AXIS
        this.yAxisScale = scaleLinear()
            .domain([
            min(this.data.series, (/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => {
                return +min(d.values);
            })),
            max(this.data.series, (/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => {
                return +max(d.values);
            }))
        ])
            .nice()
            .range([this.height, 0]);
        this.yAxisCall = axisLeft(this.yAxisScale)
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
            this.yGridCall = axisLeft(this.yAxisScale)
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
            this.tooltip = select('body')
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PbdsDatavizGaugeComponent {
    /**
     * @param {?} _dataviz
     * @param {?} _element
     */
    constructor(_dataviz, _element) {
        this._dataviz = _dataviz;
        this._element = _element;
        this.chartClass = true;
        this.pieClass = true;
        this.width = 300;
        this.type = 'halfmoon';
        this.color = '#cf0989';
        this.hideLabel = false;
        this.labelFormatString = '';
        this.labelSmall = false;
        this.gaugeWidth = 20;
        this.degreesToRadians = (/**
         * @param {?} degree
         * @return {?}
         */
        degree => {
            return (degree * Math.PI) / 180;
        });
        this.calculateMinMax = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const percentage = this.data.minvalue / (this.data.maxvalue - this.data.minvalue);
            return percentage * (this.data.value - this.data.minvalue) + (this.data.value - this.data.minvalue);
        });
        this.calculateCurve = (/**
         * @param {?} data
         * @return {?}
         */
        data => {
            /** @type {?} */
            const start = this.degreesToRadians(this.startAngle);
            /** @type {?} */
            const end = start + (data * (this.degreesToRadians(this.endAngle) - start)) / this.data.maxvalue;
            return [
                {
                    startAngle: start,
                    endAngle: end
                }
            ];
        });
        this.drawChart = (/**
         * @return {?}
         */
        () => {
            this.gauge = this.svg.append('g').attr('class', 'gauge-group');
            // background arc
            /** @type {?} */
            const background = this.gauge
                .append('path')
                .data(this.calculateCurve(this.data.maxvalue))
                .attr('class', 'gauge-background')
                .attr('fill', this.backgroundColor)
                .attr('d', (/**
             * @param {?} d
             * @return {?}
             */
            d => {
                return this.arc({
                    innerRadius: this.radius - this.gaugeWidth,
                    outerRadius: this.radius,
                    startAngle: d.startAngle,
                    endAngle: d.endAngle
                });
            }));
            // value arc
            this.gauge
                .append('path')
                .data(this.calculateCurve(this.calculateMinMax()))
                .attr('class', 'gauge-value')
                .attr('fill', this.color)
                .attr('d', (/**
             * @param {?} d
             * @return {?}
             */
            d => {
                return this.arc({
                    innerRadius: this.radius - this.gaugeWidth,
                    outerRadius: this.radius,
                    startAngle: d.startAngle,
                    endAngle: d.endAngle
                });
            }));
            switch (this.type) {
                case 'horseshoe':
                    this.svg.attr('height', 230).attr('viewBox', `-${this.width / 2} -${this.height / 2} ${this.height} 230`);
                    break;
                case 'halfmoon':
                    this.svg.attr('height', this.width / 2);
                    this.svg.attr('viewBox', `-${this.width / 2} -${this.width / 2} ${this.width} ${this.width / 2}`);
                    break;
            }
        });
        this.updateChart = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            let group = this.svg.select('.gauge-group');
            group
                .select('.gauge-value')
                .transition()
                .duration(750)
                .call(this.arcTween, this.calculateMinMax());
            this.labelTween = this.chart.select('.gauge-number');
            this.labelTween
                .transition()
                .duration(750)
                .call(this.textTween, this.data.value);
        });
        this.arcTween = (/**
         * @param {?} transition
         * @param {?} value
         * @return {?}
         */
        (transition, value) => {
            /** @type {?} */
            let newAngle = this.calculateCurve(value);
            transition.attrTween('d', (/**
             * @param {?} d
             * @return {?}
             */
            d => {
                /** @type {?} */
                let interpolate$$1 = interpolate(d.endAngle, newAngle[0].endAngle);
                return (/**
                 * @param {?} t
                 * @return {?}
                 */
                t => {
                    d.endAngle = interpolate$$1(t);
                    return this.arc({
                        innerRadius: this.radius - this.gaugeWidth,
                        outerRadius: this.radius,
                        startAngle: d.startAngle,
                        endAngle: d.endAngle
                    });
                });
            }));
        });
        this.textTween = (/**
         * @param {?} transition
         * @param {?} value
         * @return {?}
         */
        (transition, value) => {
            value = format('.2f')(value); // TODO: check these .1f formats here, should they be inputs?
            value = value.replace(/,/g, '.');
            transition.tween('text', (/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                let interpolate$$1 = interpolate(format('.2f')(+this.oldValue), value);
                return (/**
                 * @param {?} t
                 * @return {?}
                 */
                t => {
                    this.labelTween.text((/**
                     * @param {?} d
                     * @return {?}
                     */
                    d => {
                        /** @type {?} */
                        let updatedNumber = this.labelFormat(interpolate$$1(t));
                        this.label = updatedNumber;
                        return updatedNumber;
                    }));
                });
            }));
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.height = this.width;
        this.radius = Math.max(this.width, this.height) / 2;
        this.labelFormat = format(this.labelFormatString);
        this.backgroundColor = '#F0F0F0';
        this.label = this.labelFormat(this.data.value);
        switch (this.type) {
            case 'halfmoon':
                this.startAngle = -90;
                this.endAngle = 90;
                this.rounded = true;
                break;
            case 'horseshoe':
                this.startAngle = -140;
                this.endAngle = 140;
                this.rounded = true;
                break;
            case 'circle':
                this.startAngle = 0;
                this.endAngle = 360;
                this.rounded = false;
                break;
        }
        this.arc = arc().cornerRadius(this.rounded ? this.gaugeWidth : 0);
        this.chart = select(this._element.nativeElement).attr('aria-hidden', 'true');
        this.svg = this.chart
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('class', 'img-fluid') // to resize chart
            .attr('preserveAspectRatio', 'xMinYMin meet')
            .attr('viewBox', `-${this.width / 2} -${this.height / 2} ${this.width} ${this.height}`);
        this.drawChart();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.data && !changes.data.firstChange) {
            // console.log(changes.data.previousValue.value, changes.data.currentValue.value);
            this.oldValue = changes.data.previousValue.value;
            this.updateChart();
        }
    }
}
PbdsDatavizGaugeComponent.decorators = [
    { type: Component, args: [{
                selector: 'pbds-dataviz-gauge',
                template: `
    <div
      *ngIf="!hideLabel"
      class="gauge-details"
      [ngClass]="{ halfmoon: type === 'halfmoon', 'gauge-details-small': labelSmall }"
    >
      <div class="gauge-number">{{ label }}</div>
      <div *ngIf="description" class="gauge-description text-center">{{ description }}</div>
    </div>
  `
            }] }
];
/** @nocollapse */
PbdsDatavizGaugeComponent.ctorParameters = () => [
    { type: PbdsDatavizService },
    { type: ElementRef }
];
PbdsDatavizGaugeComponent.propDecorators = {
    chartClass: [{ type: HostBinding, args: ['class.pbds-chart',] }],
    pieClass: [{ type: HostBinding, args: ['class.pbds-chart-gauge',] }],
    data: [{ type: Input }],
    width: [{ type: Input }],
    type: [{ type: Input }],
    color: [{ type: Input }],
    hideLabel: [{ type: Input }],
    labelFormatString: [{ type: Input }],
    labelSmall: [{ type: Input }],
    description: [{ type: Input }],
    gaugeWidth: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PbdsDatavizSparklineComponent {
    /**
     * @param {?} _element
     */
    constructor(_element) {
        this._element = _element;
        this.chartClass = true;
        this.sparklineClass = true;
        this.width = 160;
        this.height = 80;
        this.color = '#cf0989';
        this.colorNegative = '#3e53a4';
        this.type = 'line';
        this.strokeWidth = 2;
        this.minBuffer = 0;
        this.maxBuffer = 0;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.margin = { top: 1, right: 0, bottom: 1, left: 0 };
        if (this.type === 'bar') {
            this.margin = { top: 0, right: 0, bottom: 0, left: 0 };
        }
        /** @type {?} */
        let x = scaleLinear().range([0, this.width - this.margin.left - this.margin.right]);
        /** @type {?} */
        let y = scaleLinear().range([this.height - this.margin.top - this.margin.bottom, 0]);
        y.domain([+min(this.data) - this.minBuffer, +max(this.data) + this.maxBuffer]);
        x.domain([0, this.data.length]);
        /** @type {?} */
        let line$$1 = line()
            .x((/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        (d, i) => x(i)))
            .y((/**
         * @param {?} d
         * @return {?}
         */
        (d) => y(d)));
        /** @type {?} */
        let area$$1 = area()
            .x((/**
         * @param {?} d
         * @param {?} i
         * @return {?}
         */
        (d, i) => x(i)))
            .y0(this.height)
            .y1((/**
         * @param {?} d
         * @return {?}
         */
        (d) => y(d)));
        this.chart = select(this._element.nativeElement).attr('aria-hidden', 'true');
        this.svg = this.chart
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('class', 'img-fluid')
            .attr('preserveAspectRatio', 'xMinYMin meet')
            .attr('viewBox', `-${this.margin.left} -${this.margin.top} ${this.width} ${this.height}`);
        if (this.type === 'line' || this.type === 'area') {
            this.svg
                .append('path')
                .datum(this.data)
                .attr('class', 'sparkline')
                .attr('fill', 'none')
                .attr('stroke-width', this.strokeWidth)
                .attr('stroke', this.color)
                .attr('d', line$$1);
        }
        if (this.type === 'area') {
            this.svg
                .append('path')
                .datum(this.data)
                .attr('class', 'sparkarea')
                .attr('fill', this.color)
                .attr('fill-opacity', 0.3)
                .attr('d', area$$1);
        }
        if (this.type === 'bar') {
            /** @type {?} */
            const barWidth = (this.width - this.data.length) / this.data.length;
            // handles negative values, see example https://www.essycode.com/posts/create-sparkline-charts-d3/
            this.svg
                .selectAll('.bar')
                .data(this.data)
                .enter()
                .append('rect')
                .attr('class', 'sparkbar')
                .attr('x', (/**
             * @param {?} d
             * @param {?} i
             * @return {?}
             */
            (d, i) => x(i)))
                .attr('y', (/**
             * @param {?} d
             * @return {?}
             */
            d => (d > 0 ? y(d) : y(0))))
                .attr('width', barWidth)
                .attr('height', (/**
             * @param {?} d
             * @return {?}
             */
            d => Math.abs(y(d) - y(0))))
                .attr('fill', (/**
             * @param {?} d
             * @return {?}
             */
            d => (d > 0 ? this.color : this.colorNegative)));
        }
    }
}
PbdsDatavizSparklineComponent.decorators = [
    { type: Component, args: [{
                selector: 'pbds-dataviz-sparkline',
                template: ``
            }] }
];
/** @nocollapse */
PbdsDatavizSparklineComponent.ctorParameters = () => [
    { type: ElementRef }
];
PbdsDatavizSparklineComponent.propDecorators = {
    chartClass: [{ type: HostBinding, args: ['class.pbds-chart',] }],
    sparklineClass: [{ type: HostBinding, args: ['class.pbds-chart-sparkline',] }],
    data: [{ type: Input }],
    width: [{ type: Input }],
    height: [{ type: Input }],
    color: [{ type: Input }],
    colorNegative: [{ type: Input }],
    type: [{ type: Input }],
    strokeWidth: [{ type: Input }],
    minBuffer: [{ type: Input }],
    maxBuffer: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PbdsDatavizModule {
}
PbdsDatavizModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    PbdsDatavizPieComponent,
                    PbdsDatavizBarComponent,
                    PbdsDatavizLineComponent,
                    PbdsDatavizGaugeComponent,
                    PbdsDatavizSparklineComponent
                ],
                imports: [CommonModule],
                exports: [
                    PbdsDatavizPieComponent,
                    PbdsDatavizBarComponent,
                    PbdsDatavizLineComponent,
                    PbdsDatavizGaugeComponent,
                    PbdsDatavizSparklineComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PbdsHeaderShadowDirective {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PbdsHeaderShadowModule {
}
PbdsHeaderShadowModule.decorators = [
    { type: NgModule, args: [{
                declarations: [PbdsHeaderShadowDirective],
                imports: [CommonModule],
                exports: [PbdsHeaderShadowDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { PbdsDatavizModule, PbdsDatavizService, PbdsDatavizBarComponent, PbdsDatavizLineComponent, PbdsDatavizPieComponent, PbdsDatavizGaugeComponent, PbdsDatavizSparklineComponent, PbdsHeaderShadowModule, PbdsHeaderShadowDirective };

//# sourceMappingURL=pb-design-system.js.map