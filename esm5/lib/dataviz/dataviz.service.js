/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
var PbdsDatavizService = /** @class */ (function () {
    function PbdsDatavizService() {
        var _this = this;
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
        function (mono) {
            return mono ? _this.colors.mono : _this.colors.theme;
        });
        this.createGradientDefs = (/**
         * @param {?} svg
         * @param {?} mono
         * @return {?}
         */
        function (svg, mono) {
            /** @type {?} */
            var colors = mono ? [_this.colors.mono[2]] : _this.colors.theme;
            for (var i = 0; i < colors.length; i++) {
                /** @type {?} */
                var color = mono ? _this.colors.mono[2] : _this.colors.theme[i];
                /** @type {?} */
                var gradient = svg
                    .append('defs')
                    .append('linearGradient')
                    .attr('id', "gradient-" + color.replace('#', ''))
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
        function (svg) {
            // add a new definition
            /** @type {?} */
            var glow = svg
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
            var feOffsets = [
                {
                    dy: 2,
                    slope: 0.2
                },
                {
                    dy: 5,
                    slope: 0.05
                }
            ];
            for (var i = 0; i < feOffsets.length; i++) {
                glow
                    .append('feOffset')
                    .attr('result', 'offsetBlur' + i)
                    .attr('dx', 0)
                    .attr('dy', feOffsets[i].dy);
            }
            for (var y = 0; y < feOffsets.length; y++) {
                glow
                    .append('feComponentTransfer')
                    .attr('result', 'coloredBlur' + y)
                    .attr('in', 'offsetBlur' + y)
                    .append('feFuncA')
                    .attr('type', 'linear')
                    .attr('slope', feOffsets[y].slope);
            }
            /** @type {?} */
            var merge = glow.append('feMerge');
            merge.append('feMergeNode').attr('in', 'SourceGraphic');
            for (var x = 0; x < feOffsets.length; x++) {
                merge.append('feMergeNode').attr('in', 'coloredBlur' + x);
            }
        });
    }
    PbdsDatavizService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    PbdsDatavizService.ctorParameters = function () { return []; };
    /** @nocollapse */ PbdsDatavizService.ngInjectableDef = i0.defineInjectable({ factory: function PbdsDatavizService_Factory() { return new PbdsDatavizService(); }, token: PbdsDatavizService, providedIn: "root" });
    return PbdsDatavizService;
}());
export { PbdsDatavizService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    PbdsDatavizService.prototype.colors;
    /** @type {?} */
    PbdsDatavizService.prototype.getColors;
    /** @type {?} */
    PbdsDatavizService.prototype.createGradientDefs;
    /** @type {?} */
    PbdsDatavizService.prototype.createGlowFilter;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXZpei5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcGItZGVzaWduLXN5c3RlbS8iLCJzb3VyY2VzIjpbImxpYi9kYXRhdml6L2RhdGF2aXouc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFFM0M7SUFzQkU7UUFBQSxpQkFBZ0I7UUFsQlIsV0FBTSxHQUFHO1lBQ2YsSUFBSSxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUM7WUFDeEUsS0FBSyxFQUFFO2dCQUNMLFNBQVM7Z0JBQ1QsU0FBUztnQkFDVCxTQUFTO2dCQUNULFNBQVM7Z0JBQ1QsU0FBUztnQkFDVCxTQUFTO2dCQUNULFNBQVM7Z0JBQ1QsU0FBUztnQkFDVCxTQUFTO2dCQUNULFNBQVM7Z0JBQ1QsU0FBUztnQkFDVCxTQUFTO2FBQ1Y7U0FDRixDQUFDO1FBSUYsY0FBUzs7OztRQUFHLFVBQUEsSUFBSTtZQUNkLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDckQsQ0FBQyxFQUFDO1FBRUYsdUJBQWtCOzs7OztRQUFHLFVBQUMsR0FBRyxFQUFFLElBQUk7O2dCQUN2QixNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSztZQUUvRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs7b0JBQ2hDLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FB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QUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQztxQkFDdEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEM7O2dCQUVHLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUVsQyxLQUFLLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUM7WUFFeEQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3pDLEtBQUssQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDM0Q7UUFDSCxDQUFDLEVBQUM7SUF6RmEsQ0FBQzs7Z0JBdEJqQixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7Ozs2QkFKRDtDQWtIQyxBQWhIRCxJQWdIQztTQTdHWSxrQkFBa0I7Ozs7OztJQUM3QixvQ0FnQkU7O0lBSUYsdUNBRUU7O0lBRUYsZ0RBOEJFOztJQUVGLDhDQW1ERSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUGJkc0RhdGF2aXpTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBjb2xvcnMgPSB7XG4gICAgbW9ubzogWycjMDA0MzZlJywgJyMwMDVhOTMnLCAnIzAwNzJiOCcsICcjNjZhYWQ0JywgJyNjY2UzZjEnLCAnI2U1ZjFmOCddLFxuICAgIHRoZW1lOiBbXG4gICAgICAnIzNlNTNhNCcsXG4gICAgICAnI2NmMDk4OScsXG4gICAgICAnIzAwOWJkZicsXG4gICAgICAnI2VlNmIwYicsXG4gICAgICAnI2VkYjcwMCcsXG4gICAgICAnI2EwM2Y5YicsXG4gICAgICAnIzAwYjE0MCcsXG4gICAgICAnIzY2YzNlYycsXG4gICAgICAnI2MwYzBjMCcsXG4gICAgICAnI2Y1YTY2ZCcsXG4gICAgICAnIzhiOThjOCcsXG4gICAgICAnI2FhZDg4ZidcbiAgICBdXG4gIH07XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGdldENvbG9ycyA9IG1vbm8gPT4ge1xuICAgIHJldHVybiBtb25vID8gdGhpcy5jb2xvcnMubW9ubyA6IHRoaXMuY29sb3JzLnRoZW1lO1xuICB9O1xuXG4gIGNyZWF0ZUdyYWRpZW50RGVmcyA9IChzdmcsIG1vbm8pID0+IHtcbiAgICBjb25zdCBjb2xvcnMgPSBtb25vID8gW3RoaXMuY29sb3JzLm1vbm9bMl1dIDogdGhpcy5jb2xvcnMudGhlbWU7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgY29sb3IgPSBtb25vID8gdGhpcy5jb2xvcnMubW9ub1syXSA6IHRoaXMuY29sb3JzLnRoZW1lW2ldO1xuXG4gICAgICBjb25zdCBncmFkaWVudCA9IHN2Z1xuICAgICAgICAuYXBwZW5kKCdkZWZzJylcbiAgICAgICAgLmFwcGVuZCgnbGluZWFyR3JhZGllbnQnKVxuICAgICAgICAuYXR0cignaWQnLCBgZ3JhZGllbnQtJHtjb2xvci5yZXBsYWNlKCcjJywgJycpfWApXG4gICAgICAgIC5hdHRyKCd4MScsICcwJylcbiAgICAgICAgLmF0dHIoJ3kxJywgJzAnKVxuICAgICAgICAuYXR0cigneDInLCAnMCcpXG4gICAgICAgIC5hdHRyKCd5MicsICcxJylcbiAgICAgICAgLmF0dHIoJ3NwcmVhZE1ldGhvZCcsICdwYWQnKTtcblxuICAgICAgZ3JhZGllbnRcbiAgICAgICAgLmFwcGVuZCgnc3RvcCcpXG4gICAgICAgIC5hdHRyKCdvZmZzZXQnLCAnMCUnKVxuICAgICAgICAuYXR0cignc3RvcC1jb2xvcicsIGNvbG9yKVxuICAgICAgICAuYXR0cignc3RvcC1vcGFjaXR5JywgJzEnKTsgLy8gdG9wIG9mIGJhciB3aWxsIGJlIGZ1bGwgb3BhY2l0eVxuXG4gICAgICBncmFkaWVudFxuICAgICAgICAuYXBwZW5kKCdzdG9wJylcbiAgICAgICAgLmF0dHIoJ29mZnNldCcsICcxMDAlJylcbiAgICAgICAgLmF0dHIoJ3N0b3AtY29sb3InLCBjb2xvcilcbiAgICAgICAgLmF0dHIoJ3N0b3Atb3BhY2l0eScsICcuMycpOyAvLyBib3R0b20gb2YgYmFyIHdpbGwgYmUgLjMgb3BhY2l0eVxuICAgIH1cblxuICAgIHJldHVybiBjb2xvcnM7XG4gIH07XG5cbiAgY3JlYXRlR2xvd0ZpbHRlciA9IHN2ZyA9PiB7XG4gICAgLy8gYWRkIGEgbmV3IGRlZmluaXRpb25cbiAgICBjb25zdCBnbG93ID0gc3ZnXG4gICAgICAuYXBwZW5kKCdkZWZzJylcbiAgICAgIC5hcHBlbmQoJ2ZpbHRlcicpXG4gICAgICAuYXR0cignaWQnLCAnZ2xvdycpXG4gICAgICAuYXR0cignd2lkdGgnLCAnMjAwJScpXG4gICAgICAuYXR0cignaGVpZ2h0JywgJzIwMCUnKTtcblxuICAgIGdsb3dcbiAgICAgIC5hcHBlbmQoJ2ZlR2F1c3NpYW5CbHVyJylcbiAgICAgIC5hdHRyKCdpbicsICdTb3VyY2VHcmFwaGljJylcbiAgICAgIC5hdHRyKCdzdGREZXZpYXRpb24nLCA0KTtcblxuICAgIC8vIGJ1aWxkIHR3byBkcm9wc2hhZG93cyB3aXRoIGRpZmZlcmVudCBpbnRlbnNpdGllc1xuICAgIGNvbnN0IGZlT2Zmc2V0cyA9IFtcbiAgICAgIHtcbiAgICAgICAgZHk6IDIsXG4gICAgICAgIHNsb3BlOiAwLjJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGR5OiA1LFxuICAgICAgICBzbG9wZTogMC4wNVxuICAgICAgfVxuICAgIF07XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZlT2Zmc2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgZ2xvd1xuICAgICAgICAuYXBwZW5kKCdmZU9mZnNldCcpXG4gICAgICAgIC5hdHRyKCdyZXN1bHQnLCAnb2Zmc2V0Qmx1cicgKyBpKVxuICAgICAgICAuYXR0cignZHgnLCAwKVxuICAgICAgICAuYXR0cignZHknLCBmZU9mZnNldHNbaV0uZHkpO1xuICAgIH1cblxuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgZmVPZmZzZXRzLmxlbmd0aDsgeSsrKSB7XG4gICAgICBnbG93XG4gICAgICAgIC5hcHBlbmQoJ2ZlQ29tcG9uZW50VHJhbnNmZXInKVxuICAgICAgICAuYXR0cigncmVzdWx0JywgJ2NvbG9yZWRCbHVyJyArIHkpXG4gICAgICAgIC5hdHRyKCdpbicsICdvZmZzZXRCbHVyJyArIHkpXG4gICAgICAgIC5hcHBlbmQoJ2ZlRnVuY0EnKVxuICAgICAgICAuYXR0cigndHlwZScsICdsaW5lYXInKVxuICAgICAgICAuYXR0cignc2xvcGUnLCBmZU9mZnNldHNbeV0uc2xvcGUpO1xuICAgIH1cblxuICAgIGxldCBtZXJnZSA9IGdsb3cuYXBwZW5kKCdmZU1lcmdlJyk7XG5cbiAgICBtZXJnZS5hcHBlbmQoJ2ZlTWVyZ2VOb2RlJykuYXR0cignaW4nLCAnU291cmNlR3JhcGhpYycpO1xuXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCBmZU9mZnNldHMubGVuZ3RoOyB4KyspIHtcbiAgICAgIG1lcmdlLmFwcGVuZCgnZmVNZXJnZU5vZGUnKS5hdHRyKCdpbicsICdjb2xvcmVkQmx1cicgKyB4KTtcbiAgICB9XG4gIH07XG59XG4iXX0=