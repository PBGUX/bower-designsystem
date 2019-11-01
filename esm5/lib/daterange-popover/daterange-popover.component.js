/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Injectable, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { getLocaleDayNames, getLocaleMonthNames, getLocaleFirstDayOfWeek, FormStyle, TranslationWidth, getLocaleDateFormat, FormatWidth, formatDate } from '@angular/common';
import { NgbPopover, NgbDate, NgbCalendar, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { PbdsDaterangeService } from './daterange-popover.service';
// Define custom service providing the months and weekdays translations
var CustomDatepickerI18n = /** @class */ (function (_super) {
    tslib_1.__extends(CustomDatepickerI18n, _super);
    function CustomDatepickerI18n(daterangeService) {
        var _this = _super.call(this) || this;
        _this.daterangeService = daterangeService;
        return _this;
    }
    /**
     * @param {?} weekday
     * @return {?}
     */
    CustomDatepickerI18n.prototype.getWeekdayShortName = /**
     * @param {?} weekday
     * @return {?}
     */
    function (weekday) {
        // for ng-bootstrap, sunday number of 7 converted to 0
        weekday = weekday === 7 ? 0 : weekday;
        // console.log(
        //   'weekday: ',
        //   this.daterangeService.getCurrentLocale(),
        //   weekday,
        //   getLocaleDayNames(this.daterangeService.getCurrentLocale(), FormStyle.Standalone, TranslationWidth.Abbreviated)[weekday]
        // );
        return getLocaleDayNames(this.daterangeService.getCurrentLocale(), FormStyle.Standalone, TranslationWidth.Abbreviated)[weekday];
    };
    /**
     * @param {?} month
     * @return {?}
     */
    CustomDatepickerI18n.prototype.getMonthShortName = /**
     * @param {?} month
     * @return {?}
     */
    function (month) {
        return getLocaleMonthNames(this.daterangeService.getCurrentLocale(), FormStyle.Standalone, TranslationWidth.Wide)[month - 1];
    };
    /**
     * @param {?} month
     * @return {?}
     */
    CustomDatepickerI18n.prototype.getMonthFullName = /**
     * @param {?} month
     * @return {?}
     */
    function (month) {
        return getLocaleMonthNames(this.daterangeService.getCurrentLocale(), FormStyle.Standalone, TranslationWidth.Wide)[month - 1];
    };
    /**
     * @param {?} date
     * @return {?}
     */
    CustomDatepickerI18n.prototype.getDayAriaLabel = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.day + "-" + date.month + "-" + date.year;
    };
    CustomDatepickerI18n.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    CustomDatepickerI18n.ctorParameters = function () { return [
        { type: PbdsDaterangeService }
    ]; };
    return CustomDatepickerI18n;
}(NgbDatepickerI18n));
export { CustomDatepickerI18n };
if (false) {
    /** @type {?} */
    CustomDatepickerI18n.prototype.daterangeService;
}
var PbdsDaterangePopoverComponent = /** @class */ (function () {
    function PbdsDaterangePopoverComponent(calendar, daterangeService) {
        var _this = this;
        this.calendar = calendar;
        this.daterangeService = daterangeService;
        this.presets = [
            {
                label: 'All Dates',
                value: null
            },
            {
                label: 'Last 7 Days',
                value: 7
            },
            {
                label: 'Last 30 Days',
                value: 30
            },
            {
                label: 'Year to Date',
                value: 365
            }
        ];
        this.presetSelected = null;
        this.filterSelected = 0;
        this.showCustomPreset = true;
        this.applyText = 'Apply';
        this.cancelText = 'Cancel';
        this.customRangeText = 'Custom Range';
        this.toText = 'to';
        this.minDate = this.calendar.getPrev(this.calendar.getToday(), 'y');
        this.maxDate = this.calendar.getToday();
        this.fromDate = null;
        this.toDate = null;
        this.change = new EventEmitter();
        this.firstDayOfWeek = getLocaleFirstDayOfWeek(this.daterangeService.getCurrentLocale());
        this.dateRange = '';
        this.isDatepickerVisible = false;
        this.presetSelect = (/**
         * @param {?} $event
         * @return {?}
         */
        function ($event) {
            if ($event.value === 'custom') {
                _this.presetSelected = 'custom';
                return false;
            }
            if ($event.value) {
                _this.toDate = _this.calendar.getToday();
                _this.fromDate = _this.calendar.getPrev(_this.toDate, 'd', $event.value);
                _this.presetSelected = $event.value;
            }
            else {
                _this.fromDate = null;
                _this.toDate = null;
                _this.presetSelected = null;
            }
            _this.isDatepickerVisible = false;
        });
        this.isHovered = (/**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return _this.fromDate && !_this.toDate && _this.hoveredDate && date.after(_this.fromDate) && date.before(_this.hoveredDate);
        });
        this.isInside = (/**
         * @param {?} date
         * @return {?}
         */
        function (date) { return date.after(_this.fromDate) && date.before(_this.toDate); });
        this.isRange = (/**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return date.equals(_this.fromDate) || date.equals(_this.toDate) || _this.isInside(date) || _this.isHovered(date);
        });
    }
    /**
     * @return {?}
     */
    PbdsDaterangePopoverComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // china should start on a Monday, Angular locale returns incorrect 0
        this.firstDayOfWeek =
            this.daterangeService.getCurrentLocale() === 'zh-cn' ? this.firstDayOfWeek + 1 : this.firstDayOfWeek;
        if (this.presetSelected === 'custom') {
            this.showDatepicker();
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    PbdsDaterangePopoverComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (changes.filters && this.filters) {
            this.selectedFilter = this.filters[this.filterSelected];
        }
        if (changes.presets) {
            if (!this.filters && this.presetSelected) {
                this.presetClick(this.presets.find((/**
                 * @param {?} p
                 * @return {?}
                 */
                function (p) { return p.value === _this.presetSelected; })));
            }
            else if (this.presetSelected) {
                this.presetSelect({ value: this.presetSelected });
                this.apply();
            }
        }
        if (changes.toText && changes.toText.firstChange === false) {
            this.setInputLabel();
        }
        this.setInputLabel();
    };
    /**
     * @return {?}
     */
    PbdsDaterangePopoverComponent.prototype.apply = /**
     * @return {?}
     */
    function () {
        this.setInputLabel();
        this.change.emit({
            fromDate: this.fromDate,
            toDate: this.toDate,
            formattedDate: this.isDatepickerVisible
                ? this.getFormattedDate(this.fromDate) + " " + this.toText + " " + this.getFormattedDate(this.toDate)
                : this.dateRange,
            filter: this.filters ? this.selectedFilter.field : null,
            value: this.presetSelected
        });
        this.datepickerPopup.close();
    };
    /**
     * @return {?}
     */
    PbdsDaterangePopoverComponent.prototype.cancel = /**
     * @return {?}
     */
    function () {
        this.datepickerPopup.close();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    PbdsDaterangePopoverComponent.prototype.onDateSelection = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (!this.fromDate && !this.toDate) {
            this.fromDate = date;
        }
        else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
            this.toDate = date;
        }
        else {
            this.toDate = null;
            this.fromDate = date;
        }
        // this.presetSelected = null;
    };
    /**
     * @param {?} preset
     * @return {?}
     */
    PbdsDaterangePopoverComponent.prototype.presetClick = /**
     * @param {?} preset
     * @return {?}
     */
    function (preset) {
        // console.log('PRESET CLICK: ', preset);
        if (preset) {
            if (preset.value === 'custom') {
                return false;
            }
            if (preset.value) {
                this.toDate = this.calendar.getToday();
                this.fromDate = this.calendar.getPrev(this.toDate, 'd', preset.value);
                this.presetSelected = preset.value;
            }
            else {
                this.fromDate = null;
                this.toDate = null;
                this.presetSelected = null;
            }
            this.isDatepickerVisible = false;
            this.apply();
        }
    };
    /**
     * @private
     * @param {?} date
     * @return {?}
     */
    PbdsDaterangePopoverComponent.prototype.getFormattedDate = /**
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (date) {
            /** @type {?} */
            var locale = this.daterangeService.getCurrentLocale();
            /** @type {?} */
            var dateFormat = getLocaleDateFormat(locale, FormatWidth.Short);
            /** @type {?} */
            var formattedDate = formatDate(date.month + "/" + date.day + "/" + date.year, dateFormat, locale);
            return formattedDate;
        }
    };
    /**
     * @return {?}
     */
    PbdsDaterangePopoverComponent.prototype.showDatepicker = /**
     * @return {?}
     */
    function () {
        this.isDatepickerVisible = true;
        this.presetSelect({ value: 'custom' });
    };
    /**
     * @param {?} filter
     * @param {?} index
     * @return {?}
     */
    PbdsDaterangePopoverComponent.prototype.onFilterChange = /**
     * @param {?} filter
     * @param {?} index
     * @return {?}
     */
    function (filter, index) {
        this.selectedFilter = this.filters[index];
    };
    /**
     * @param {?} value
     * @return {?}
     */
    PbdsDaterangePopoverComponent.prototype.setPreset = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.presetSelected = value;
        this.presetSelect({ value: this.presetSelected });
        this.apply();
    };
    /**
     * @param {?} index
     * @return {?}
     */
    PbdsDaterangePopoverComponent.prototype.setFilter = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (this.filters !== undefined) {
            this.selectedFilter = this.filters[index];
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    PbdsDaterangePopoverComponent.prototype.setDateRange = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.fromDate = new NgbDate(value.fromDate.year, value.fromDate.month, value.fromDate.day);
        this.toDate = new NgbDate(value.toDate.year, value.toDate.month, value.toDate.day);
        this.isDatepickerVisible = value.value === 'custom';
        this.presetSelected = value.value;
        if (this.filters) {
            this.filterSelected = this.filters.findIndex((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return f.field === value.filter; }));
            this.selectedFilter = this.filters[this.filterSelected];
        }
        this.apply();
    };
    /**
     * @private
     * @return {?}
     */
    PbdsDaterangePopoverComponent.prototype.setInputLabel = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.presets) {
            /** @type {?} */
            var selected = this.presets.find((/**
             * @param {?} p
             * @return {?}
             */
            function (p) { return p.value === _this.presetSelected; }));
            if (selected) {
                if (this.fromDate === null || this.toDate === null) {
                    this.dateRange = selected.label;
                }
                else if (this.presetSelected === null || (this.presetSelected !== null && this.presetSelected !== 'custom')) {
                    this.dateRange = selected.label;
                }
                else {
                    this.dateRange = this.getFormattedDate(this.fromDate) + " " + this.toText + " " + this.getFormattedDate(this.toDate);
                }
            }
            else if (this.presetSelected === 'custom' && this.fromDate && this.toDate) {
                this.dateRange = this.getFormattedDate(this.fromDate) + " " + this.toText + " " + this.getFormattedDate(this.toDate);
            }
        }
    };
    PbdsDaterangePopoverComponent.decorators = [
        { type: Component, args: [{
                    selector: 'pbds-daterange-popover',
                    template: "<div class=\"input-group pbds-daterange-popover\">\n  <input\n    type=\"text\"\n    class=\"form-control\"\n    aria-describedby=\"daterange-button\"\n    [value]=\"dateRange\"\n    readonly=\"readonly\"\n    tabindex=\"-1\"\n  />\n\n  <div class=\"input-group-append\">\n    <button\n      class=\"btn btn-secondary\"\n      type=\"button\"\n      id=\"daterange-button\"\n      #datepickerPopup=\"ngbPopover\"\n      [ngbPopover]=\"daterangeContent\"\n      popoverClass=\"daterange-popover\"\n      autoClose=\"outside\"\n      placement=\"bottom-right auto\"\n      aria-label=\"Open Daterange Picker\"\n    >\n      <i class=\"pbi-icon-mini pbi-calendar\" aria-hidden=\"true\"></i>\n    </button>\n  </div>\n\n  <ng-template #daterangeContent>\n    <div>\n      <div class=\"d-block d-md-flex\">\n        <div *ngIf=\"isDatepickerVisible\">\n          <ngb-datepicker\n            #datepicker\n            [displayMonths]=\"'2'\"\n            [minDate]=\"minDate\"\n            [maxDate]=\"maxDate\"\n            navigation=\"select\"\n            outsideDays=\"hidden\"\n            [firstDayOfWeek]=\"firstDayOfWeek\"\n            [showWeekdays]=\"true\"\n            [dayTemplate]=\"t\"\n            (select)=\"onDateSelection($event)\"\n          >\n          </ngb-datepicker>\n          <!--  -->\n\n          <ng-template #t let-date let-focused=\"focused\">\n            <span\n              class=\"custom-day\"\n              [class.focused]=\"focused\"\n              [class.range]=\"isRange(date)\"\n              [class.faded]=\"isHovered(date) || isInside(date)\"\n              (mouseenter)=\"hoveredDate = date\"\n              (mouseleave)=\"hoveredDate = null\"\n            >\n              {{ date.day }}\n            </span>\n          </ng-template>\n        </div>\n\n        <div\n          class=\"d-flex flex-column justify-content-lg-between mt-md-0\"\n          [ngClass]=\"{ 'ml-md-4': isDatepickerVisible }\"\n        >\n          <!-- filters -->\n          <div *ngIf=\"filters\" class=\"mb-3\" ngbDropdown>\n            <button class=\"btn btn-sm btn-secondary btn-block\" id=\"dateFilter\" ngbDropdownToggle>\n              {{ selectedFilter.label }}\n            </button>\n            <div ngbDropdownMenu aria-labelledby=\"dateFilter\">\n              <button\n                class=\"dropdown-item\"\n                type=\"button\"\n                *ngFor=\"let filter of filters; let index = index\"\n                (click)=\"onFilterChange(filter, index)\"\n              >\n                {{ filter.label }}\n              </button>\n            </div>\n          </div>\n\n          <!-- presets radio buttons-->\n          <div *ngIf=\"presets && filters\" class=\"flex-grow-1\">\n            <mat-radio-group\n              aria-label=\"Select an option\"\n              class=\"stacked-radio-group\"\n              name=\"presets\"\n              [(ngModel)]=\"presetSelected\"\n              (change)=\"presetSelect($event)\"\n            >\n              <mat-radio-button *ngFor=\"let preset of presets\" [value]=\"preset.value\">{{\n                preset.label\n              }}</mat-radio-button>\n\n              <mat-radio-button *ngIf=\"showCustomPreset\" [value]=\"'custom'\" (change)=\"showDatepicker()\">{{\n                customRangeText\n              }}</mat-radio-button>\n            </mat-radio-group>\n          </div>\n\n          <!-- presets buttons-->\n          <div *ngIf=\"presets && !filters\" class=\"flex-grow-1\">\n            <button\n              type=\"button\"\n              class=\"btn btn-secondary btn-block btn-sm text-nowrap\"\n              *ngFor=\"let preset of presets\"\n              (click)=\"presetClick(preset)\"\n            >\n              {{ preset.label }}\n            </button>\n\n            <button\n              type=\"button\"\n              class=\"btn btn-secondary btn-block btn-sm text-nowrap\"\n              *ngIf=\"showCustomPreset\"\n              (click)=\"showDatepicker()\"\n            >\n              {{ customRangeText }}\n            </button>\n          </div>\n\n          <!-- buttons -->\n          <div *ngIf=\"filters || isDatepickerVisible\" class=\"d-flex justify-content-between mt-3\">\n            <button class=\"btn btn-primary btn-sm mr-1\" type=\"button\" (click)=\"apply()\">{{ applyText }}</button>\n            <button class=\"btn btn-secondary btn-sm ml-1\" type=\"button\" (click)=\"cancel()\">\n              {{ cancelText }}\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </ng-template>\n</div>\n",
                    providers: [{ provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }]
                }] }
    ];
    /** @nocollapse */
    PbdsDaterangePopoverComponent.ctorParameters = function () { return [
        { type: NgbCalendar },
        { type: PbdsDaterangeService }
    ]; };
    PbdsDaterangePopoverComponent.propDecorators = {
        datepickerPopup: [{ type: ViewChild, args: ['datepickerPopup', { static: true },] }],
        presets: [{ type: Input }],
        presetSelected: [{ type: Input }],
        filters: [{ type: Input }],
        filterSelected: [{ type: Input }],
        showCustomPreset: [{ type: Input }],
        applyText: [{ type: Input }],
        cancelText: [{ type: Input }],
        customRangeText: [{ type: Input }],
        toText: [{ type: Input }],
        minDate: [{ type: Input }],
        maxDate: [{ type: Input }],
        fromDate: [{ type: Input }],
        toDate: [{ type: Input }],
        change: [{ type: Output }]
    };
    return PbdsDaterangePopoverComponent;
}());
export { PbdsDaterangePopoverComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    PbdsDaterangePopoverComponent.prototype.datepickerPopup;
    /** @type {?} */
    PbdsDaterangePopoverComponent.prototype.presets;
    /** @type {?} */
    PbdsDaterangePopoverComponent.prototype.presetSelected;
    /** @type {?} */
    PbdsDaterangePopoverComponent.prototype.filters;
    /** @type {?} */
    PbdsDaterangePopoverComponent.prototype.filterSelected;
    /** @type {?} */
    PbdsDaterangePopoverComponent.prototype.showCustomPreset;
    /** @type {?} */
    PbdsDaterangePopoverComponent.prototype.applyText;
    /** @type {?} */
    PbdsDaterangePopoverComponent.prototype.cancelText;
    /** @type {?} */
    PbdsDaterangePopoverComponent.prototype.customRangeText;
    /** @type {?} */
    PbdsDaterangePopoverComponent.prototype.toText;
    /** @type {?} */
    PbdsDaterangePopoverComponent.prototype.minDate;
    /** @type {?} */
    PbdsDaterangePopoverComponent.prototype.maxDate;
    /** @type {?} */
    PbdsDaterangePopoverComponent.prototype.fromDate;
    /** @type {?} */
    PbdsDaterangePopoverComponent.prototype.toDate;
    /**
     * @type {?}
     * @private
     */
    PbdsDaterangePopoverComponent.prototype.change;
    /** @type {?} */
    PbdsDaterangePopoverComponent.prototype.firstDayOfWeek;
    /** @type {?} */
    PbdsDaterangePopoverComponent.prototype.hoveredDate;
    /** @type {?} */
    PbdsDaterangePopoverComponent.prototype.dateRange;
    /** @type {?} */
    PbdsDaterangePopoverComponent.prototype.isDatepickerVisible;
    /** @type {?} */
    PbdsDaterangePopoverComponent.prototype.selectedFilter;
    /** @type {?} */
    PbdsDaterangePopoverComponent.prototype.presetSelect;
    /** @type {?} */
    PbdsDaterangePopoverComponent.prototype.isHovered;
    /** @type {?} */
    PbdsDaterangePopoverComponent.prototype.isInside;
    /** @type {?} */
    PbdsDaterangePopoverComponent.prototype.isRange;
    /**
     * @type {?}
     * @private
     */
    PbdsDaterangePopoverComponent.prototype.calendar;
    /**
     * @type {?}
     * @private
     */
    PbdsDaterangePopoverComponent.prototype.daterangeService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXJhbmdlLXBvcG92ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcGItZGVzaWduLXN5c3RlbS8iLCJzb3VyY2VzIjpbImxpYi9kYXRlcmFuZ2UtcG9wb3Zlci9kYXRlcmFuZ2UtcG9wb3Zlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFFVixTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBR2IsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixtQkFBbUIsRUFDbkIsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsbUJBQW1CLEVBQ25CLFdBQVcsRUFDWCxVQUFVLEVBQ1gsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QixPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQWlCLE1BQU0sNEJBQTRCLENBQUM7QUFHaEgsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7O0FBR25FO0lBQzBDLGdEQUFpQjtJQUN6RCw4QkFBbUIsZ0JBQXNDO1FBQXpELFlBQ0UsaUJBQU8sU0FDUjtRQUZrQixzQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXNCOztJQUV6RCxDQUFDOzs7OztJQUVELGtEQUFtQjs7OztJQUFuQixVQUFvQixPQUFlO1FBQ2pDLHNEQUFzRDtRQUN0RCxPQUFPLEdBQUcsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFFdEMsZUFBZTtRQUNmLGlCQUFpQjtRQUNqQiw4Q0FBOEM7UUFDOUMsYUFBYTtRQUNiLDZIQUE2SDtRQUM3SCxLQUFLO1FBRUwsT0FBTyxpQkFBaUIsQ0FDdEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixFQUFFLEVBQ3hDLFNBQVMsQ0FBQyxV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TCxNQUFNOztJQTZMVCxvQ0FBQztDQUFBLEFBOVBELElBOFBDO1NBeFBZLDZCQUE2Qjs7Ozs7O0lBQ3hDLHdEQUFvRjs7SUFFcEYsZ0RBa0JFOztJQUVGLHVEQUNnRDs7SUFFaEQsZ0RBQ29DOztJQUVwQyx1REFDbUI7O0lBRW5CLHlEQUN3Qjs7SUFFeEIsa0RBQ29COztJQUVwQixtREFDc0I7O0lBRXRCLHdEQUNpQzs7SUFFakMsK0NBQ2M7O0lBRWQsZ0RBQ3dFOztJQUV4RSxnREFDNEM7O0lBRTVDLGlEQUNnQzs7SUFFaEMsK0NBQzhCOzs7OztJQUU5QiwrQ0FDNEY7O0lBRTVGLHVEQUFtRjs7SUFFbkYsb0RBQXFCOztJQUVyQixrREFBZTs7SUFDZiw0REFBNEI7O0lBQzVCLHVEQUFlOztJQW1FZixxREFpQkU7O0lBa0NGLGtEQUNrSDs7SUFFbEgsaURBQW9GOztJQUVwRixnREFDd0c7Ozs7O0lBMUg1RixpREFBNkI7Ozs7O0lBQUUseURBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbmplY3RhYmxlLFxuICBPbkluaXQsXG4gIFZpZXdDaGlsZCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIGdldExvY2FsZURheU5hbWVzLFxuICBnZXRMb2NhbGVNb250aE5hbWVzLFxuICBnZXRMb2NhbGVGaXJzdERheU9mV2VlayxcbiAgRm9ybVN0eWxlLFxuICBUcmFuc2xhdGlvbldpZHRoLFxuICBnZXRMb2NhbGVEYXRlRm9ybWF0LFxuICBGb3JtYXRXaWR0aCxcbiAgZm9ybWF0RGF0ZVxufSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBOZ2JQb3BvdmVyLCBOZ2JEYXRlLCBOZ2JDYWxlbmRhciwgTmdiRGF0ZXBpY2tlckkxOG4sIE5nYkRhdGVTdHJ1Y3QgfSBmcm9tICdAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcCc7XG5cbmltcG9ydCB7IFBiZHNEYXRlcmFuZ2VQcmVzZXQsIFBiZHNEYXRlcmFuZ2VGaWx0ZXIsIFBiZHNEYXRlcmFuZ2VDaGFuZ2UgfSBmcm9tICcuL2RhdGVyYW5nZS1wb3BvdmVyLmludGVyZmFjZXMnO1xuaW1wb3J0IHsgUGJkc0RhdGVyYW5nZVNlcnZpY2UgfSBmcm9tICcuL2RhdGVyYW5nZS1wb3BvdmVyLnNlcnZpY2UnO1xuXG4vLyBEZWZpbmUgY3VzdG9tIHNlcnZpY2UgcHJvdmlkaW5nIHRoZSBtb250aHMgYW5kIHdlZWtkYXlzIHRyYW5zbGF0aW9uc1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEN1c3RvbURhdGVwaWNrZXJJMThuIGV4dGVuZHMgTmdiRGF0ZXBpY2tlckkxOG4ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZGF0ZXJhbmdlU2VydmljZTogUGJkc0RhdGVyYW5nZVNlcnZpY2UpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgZ2V0V2Vla2RheVNob3J0TmFtZSh3ZWVrZGF5OiBudW1iZXIpOiBzdHJpbmcge1xuICAgIC8vIGZvciBuZy1ib290c3RyYXAsIHN1bmRheSBudW1iZXIgb2YgNyBjb252ZXJ0ZWQgdG8gMFxuICAgIHdlZWtkYXkgPSB3ZWVrZGF5ID09PSA3ID8gMCA6IHdlZWtkYXk7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhcbiAgICAvLyAgICd3ZWVrZGF5OiAnLFxuICAgIC8vICAgdGhpcy5kYXRlcmFuZ2VTZXJ2aWNlLmdldEN1cnJlbnRMb2NhbGUoKSxcbiAgICAvLyAgIHdlZWtkYXksXG4gICAgLy8gICBnZXRMb2NhbGVEYXlOYW1lcyh0aGlzLmRhdGVyYW5nZVNlcnZpY2UuZ2V0Q3VycmVudExvY2FsZSgpLCBGb3JtU3R5bGUuU3RhbmRhbG9uZSwgVHJhbnNsYXRpb25XaWR0aC5BYmJyZXZpYXRlZClbd2Vla2RheV1cbiAgICAvLyApO1xuXG4gICAgcmV0dXJuIGdldExvY2FsZURheU5hbWVzKFxuICAgICAgdGhpcy5kYXRlcmFuZ2VTZXJ2aWNlLmdldEN1cnJlbnRMb2NhbGUoKSxcbiAgICAgIEZvcm1TdHlsZS5TdGFuZGFsb25lLFxuICAgICAgVHJhbnNsYXRpb25XaWR0aC5BYmJyZXZpYXRlZFxuICAgIClbd2Vla2RheV07XG4gIH1cblxuICBnZXRNb250aFNob3J0TmFtZShtb250aDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZ2V0TG9jYWxlTW9udGhOYW1lcyh0aGlzLmRhdGVyYW5nZVNlcnZpY2UuZ2V0Q3VycmVudExvY2FsZSgpLCBGb3JtU3R5bGUuU3RhbmRhbG9uZSwgVHJhbnNsYXRpb25XaWR0aC5XaWRlKVtcbiAgICAgIG1vbnRoIC0gMVxuICAgIF07XG4gIH1cblxuICBnZXRNb250aEZ1bGxOYW1lKG1vbnRoOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBnZXRMb2NhbGVNb250aE5hbWVzKHRoaXMuZGF0ZXJhbmdlU2VydmljZS5nZXRDdXJyZW50TG9jYWxlKCksIEZvcm1TdHlsZS5TdGFuZGFsb25lLCBUcmFuc2xhdGlvbldpZHRoLldpZGUpW1xuICAgICAgbW9udGggLSAxXG4gICAgXTtcbiAgfVxuXG4gIGdldERheUFyaWFMYWJlbChkYXRlOiBOZ2JEYXRlU3RydWN0KTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7ZGF0ZS5kYXl9LSR7ZGF0ZS5tb250aH0tJHtkYXRlLnllYXJ9YDtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYmRzLWRhdGVyYW5nZS1wb3BvdmVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2RhdGVyYW5nZS1wb3BvdmVyLmNvbXBvbmVudC5odG1sJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBOZ2JEYXRlcGlja2VySTE4biwgdXNlQ2xhc3M6IEN1c3RvbURhdGVwaWNrZXJJMThuIH1dLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIFBiZHNEYXRlcmFuZ2VQb3BvdmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBAVmlld0NoaWxkKCdkYXRlcGlja2VyUG9wdXAnLCB7IHN0YXRpYzogdHJ1ZSB9KSBwcml2YXRlIGRhdGVwaWNrZXJQb3B1cDogTmdiUG9wb3ZlcjtcblxuICBASW5wdXQoKVxuICBwcmVzZXRzOiBBcnJheTxQYmRzRGF0ZXJhbmdlUHJlc2V0PiA9IFtcbiAgICB7XG4gICAgICBsYWJlbDogJ0FsbCBEYXRlcycsXG4gICAgICB2YWx1ZTogbnVsbFxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdMYXN0IDcgRGF5cycsXG4gICAgICB2YWx1ZTogN1xuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdMYXN0IDMwIERheXMnLFxuICAgICAgdmFsdWU6IDMwXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ1llYXIgdG8gRGF0ZScsXG4gICAgICB2YWx1ZTogMzY1XG4gICAgfVxuICBdO1xuXG4gIEBJbnB1dCgpXG4gIHByZXNldFNlbGVjdGVkOiBudW1iZXIgfCBudWxsIHwgJ2N1c3RvbScgPSBudWxsO1xuXG4gIEBJbnB1dCgpXG4gIGZpbHRlcnM6IEFycmF5PFBiZHNEYXRlcmFuZ2VGaWx0ZXI+O1xuXG4gIEBJbnB1dCgpXG4gIGZpbHRlclNlbGVjdGVkID0gMDtcblxuICBASW5wdXQoKVxuICBzaG93Q3VzdG9tUHJlc2V0ID0gdHJ1ZTtcblxuICBASW5wdXQoKVxuICBhcHBseVRleHQgPSAnQXBwbHknO1xuXG4gIEBJbnB1dCgpXG4gIGNhbmNlbFRleHQgPSAnQ2FuY2VsJztcblxuICBASW5wdXQoKVxuICBjdXN0b21SYW5nZVRleHQgPSAnQ3VzdG9tIFJhbmdlJztcblxuICBASW5wdXQoKVxuICB0b1RleHQgPSAndG8nO1xuXG4gIEBJbnB1dCgpXG4gIG1pbkRhdGU6IE5nYkRhdGUgPSB0aGlzLmNhbGVuZGFyLmdldFByZXYodGhpcy5jYWxlbmRhci5nZXRUb2RheSgpLCAneScpO1xuXG4gIEBJbnB1dCgpXG4gIG1heERhdGU6IE5nYkRhdGUgPSB0aGlzLmNhbGVuZGFyLmdldFRvZGF5KCk7XG5cbiAgQElucHV0KClcbiAgZnJvbURhdGU6IE5nYkRhdGUgfCBudWxsID0gbnVsbDtcblxuICBASW5wdXQoKVxuICB0b0RhdGU6IE5nYkRhdGUgfCBudWxsID0gbnVsbDtcblxuICBAT3V0cHV0KClcbiAgcHJpdmF0ZSBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxQYmRzRGF0ZXJhbmdlQ2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8UGJkc0RhdGVyYW5nZUNoYW5nZT4oKTtcblxuICBmaXJzdERheU9mV2VlayA9IGdldExvY2FsZUZpcnN0RGF5T2ZXZWVrKHRoaXMuZGF0ZXJhbmdlU2VydmljZS5nZXRDdXJyZW50TG9jYWxlKCkpO1xuXG4gIGhvdmVyZWREYXRlOiBOZ2JEYXRlO1xuXG4gIGRhdGVSYW5nZSA9ICcnO1xuICBpc0RhdGVwaWNrZXJWaXNpYmxlID0gZmFsc2U7XG4gIHNlbGVjdGVkRmlsdGVyO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FsZW5kYXI6IE5nYkNhbGVuZGFyLCBwcml2YXRlIGRhdGVyYW5nZVNlcnZpY2U6IFBiZHNEYXRlcmFuZ2VTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIGNoaW5hIHNob3VsZCBzdGFydCBvbiBhIE1vbmRheSwgQW5ndWxhciBsb2NhbGUgcmV0dXJucyBpbmNvcnJlY3QgMFxuICAgIHRoaXMuZmlyc3REYXlPZldlZWsgPVxuICAgICAgdGhpcy5kYXRlcmFuZ2VTZXJ2aWNlLmdldEN1cnJlbnRMb2NhbGUoKSA9PT0gJ3poLWNuJyA/IHRoaXMuZmlyc3REYXlPZldlZWsgKyAxIDogdGhpcy5maXJzdERheU9mV2VlaztcblxuICAgIGlmICh0aGlzLnByZXNldFNlbGVjdGVkID09PSAnY3VzdG9tJykge1xuICAgICAgdGhpcy5zaG93RGF0ZXBpY2tlcigpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5maWx0ZXJzICYmIHRoaXMuZmlsdGVycykge1xuICAgICAgdGhpcy5zZWxlY3RlZEZpbHRlciA9IHRoaXMuZmlsdGVyc1t0aGlzLmZpbHRlclNlbGVjdGVkXTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy5wcmVzZXRzKSB7XG4gICAgICBpZiAoIXRoaXMuZmlsdGVycyAmJiB0aGlzLnByZXNldFNlbGVjdGVkKSB7XG4gICAgICAgIHRoaXMucHJlc2V0Q2xpY2sodGhpcy5wcmVzZXRzLmZpbmQocCA9PiBwLnZhbHVlID09PSB0aGlzLnByZXNldFNlbGVjdGVkKSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucHJlc2V0U2VsZWN0ZWQpIHtcbiAgICAgICAgdGhpcy5wcmVzZXRTZWxlY3QoeyB2YWx1ZTogdGhpcy5wcmVzZXRTZWxlY3RlZCB9KTtcbiAgICAgICAgdGhpcy5hcHBseSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzLnRvVGV4dCAmJiBjaGFuZ2VzLnRvVGV4dC5maXJzdENoYW5nZSA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuc2V0SW5wdXRMYWJlbCgpO1xuICAgIH1cblxuICAgIHRoaXMuc2V0SW5wdXRMYWJlbCgpO1xuICB9XG5cbiAgYXBwbHkoKSB7XG4gICAgdGhpcy5zZXRJbnB1dExhYmVsKCk7XG4gICAgdGhpcy5jaGFuZ2UuZW1pdCh7XG4gICAgICBmcm9tRGF0ZTogdGhpcy5mcm9tRGF0ZSxcbiAgICAgIHRvRGF0ZTogdGhpcy50b0RhdGUsXG4gICAgICBmb3JtYXR0ZWREYXRlOiB0aGlzLmlzRGF0ZXBpY2tlclZpc2libGVcbiAgICAgICAgPyBgJHt0aGlzLmdldEZvcm1hdHRlZERhdGUodGhpcy5mcm9tRGF0ZSl9ICR7dGhpcy50b1RleHR9ICR7dGhpcy5nZXRGb3JtYXR0ZWREYXRlKHRoaXMudG9EYXRlKX1gXG4gICAgICAgIDogdGhpcy5kYXRlUmFuZ2UsXG4gICAgICBmaWx0ZXI6IHRoaXMuZmlsdGVycyA/IHRoaXMuc2VsZWN0ZWRGaWx0ZXIuZmllbGQgOiBudWxsLFxuICAgICAgdmFsdWU6IHRoaXMucHJlc2V0U2VsZWN0ZWRcbiAgICB9KTtcblxuICAgIHRoaXMuZGF0ZXBpY2tlclBvcHVwLmNsb3NlKCk7XG4gIH1cblxuICBjYW5jZWwoKSB7XG4gICAgdGhpcy5kYXRlcGlja2VyUG9wdXAuY2xvc2UoKTtcbiAgfVxuXG4gIG9uRGF0ZVNlbGVjdGlvbihkYXRlOiBOZ2JEYXRlKSB7XG4gICAgaWYgKCF0aGlzLmZyb21EYXRlICYmICF0aGlzLnRvRGF0ZSkge1xuICAgICAgdGhpcy5mcm9tRGF0ZSA9IGRhdGU7XG4gICAgfSBlbHNlIGlmICh0aGlzLmZyb21EYXRlICYmICF0aGlzLnRvRGF0ZSAmJiBkYXRlLmFmdGVyKHRoaXMuZnJvbURhdGUpKSB7XG4gICAgICB0aGlzLnRvRGF0ZSA9IGRhdGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudG9EYXRlID0gbnVsbDtcbiAgICAgIHRoaXMuZnJvbURhdGUgPSBkYXRlO1xuICAgIH1cblxuICAgIC8vIHRoaXMucHJlc2V0U2VsZWN0ZWQgPSBudWxsO1xuICB9XG5cbiAgcHJlc2V0U2VsZWN0ID0gJGV2ZW50ID0+IHtcbiAgICBpZiAoJGV2ZW50LnZhbHVlID09PSAnY3VzdG9tJykge1xuICAgICAgdGhpcy5wcmVzZXRTZWxlY3RlZCA9ICdjdXN0b20nO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICgkZXZlbnQudmFsdWUpIHtcbiAgICAgIHRoaXMudG9EYXRlID0gdGhpcy5jYWxlbmRhci5nZXRUb2RheSgpO1xuICAgICAgdGhpcy5mcm9tRGF0ZSA9IHRoaXMuY2FsZW5kYXIuZ2V0UHJldih0aGlzLnRvRGF0ZSwgJ2QnLCAkZXZlbnQudmFsdWUpO1xuICAgICAgdGhpcy5wcmVzZXRTZWxlY3RlZCA9ICRldmVudC52YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5mcm9tRGF0ZSA9IG51bGw7XG4gICAgICB0aGlzLnRvRGF0ZSA9IG51bGw7XG4gICAgICB0aGlzLnByZXNldFNlbGVjdGVkID0gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLmlzRGF0ZXBpY2tlclZpc2libGUgPSBmYWxzZTtcbiAgfTtcblxuICBwcmVzZXRDbGljayhwcmVzZXQpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnUFJFU0VUIENMSUNLOiAnLCBwcmVzZXQpO1xuICAgIGlmIChwcmVzZXQpIHtcbiAgICAgIGlmIChwcmVzZXQudmFsdWUgPT09ICdjdXN0b20nKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHByZXNldC52YWx1ZSkge1xuICAgICAgICB0aGlzLnRvRGF0ZSA9IHRoaXMuY2FsZW5kYXIuZ2V0VG9kYXkoKTtcbiAgICAgICAgdGhpcy5mcm9tRGF0ZSA9IHRoaXMuY2FsZW5kYXIuZ2V0UHJldih0aGlzLnRvRGF0ZSwgJ2QnLCBwcmVzZXQudmFsdWUpO1xuICAgICAgICB0aGlzLnByZXNldFNlbGVjdGVkID0gcHJlc2V0LnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5mcm9tRGF0ZSA9IG51bGw7XG4gICAgICAgIHRoaXMudG9EYXRlID0gbnVsbDtcbiAgICAgICAgdGhpcy5wcmVzZXRTZWxlY3RlZCA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaXNEYXRlcGlja2VyVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgdGhpcy5hcHBseSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0Rm9ybWF0dGVkRGF0ZShkYXRlOiBOZ2JEYXRlKSB7XG4gICAgaWYgKGRhdGUpIHtcbiAgICAgIGNvbnN0IGxvY2FsZSA9IHRoaXMuZGF0ZXJhbmdlU2VydmljZS5nZXRDdXJyZW50TG9jYWxlKCk7XG4gICAgICBjb25zdCBkYXRlRm9ybWF0ID0gZ2V0TG9jYWxlRGF0ZUZvcm1hdChsb2NhbGUsIEZvcm1hdFdpZHRoLlNob3J0KTtcbiAgICAgIGNvbnN0IGZvcm1hdHRlZERhdGUgPSBmb3JtYXREYXRlKGAke2RhdGUubW9udGh9LyR7ZGF0ZS5kYXl9LyR7ZGF0ZS55ZWFyfWAsIGRhdGVGb3JtYXQsIGxvY2FsZSk7XG5cbiAgICAgIHJldHVybiBmb3JtYXR0ZWREYXRlO1xuICAgIH1cbiAgfVxuXG4gIGlzSG92ZXJlZCA9IChkYXRlOiBOZ2JEYXRlKSA9PlxuICAgIHRoaXMuZnJvbURhdGUgJiYgIXRoaXMudG9EYXRlICYmIHRoaXMuaG92ZXJlZERhdGUgJiYgZGF0ZS5hZnRlcih0aGlzLmZyb21EYXRlKSAmJiBkYXRlLmJlZm9yZSh0aGlzLmhvdmVyZWREYXRlKTtcblxuICBpc0luc2lkZSA9IChkYXRlOiBOZ2JEYXRlKSA9PiBkYXRlLmFmdGVyKHRoaXMuZnJvbURhdGUpICYmIGRhdGUuYmVmb3JlKHRoaXMudG9EYXRlKTtcblxuICBpc1JhbmdlID0gKGRhdGU6IE5nYkRhdGUpID0+XG4gICAgZGF0ZS5lcXVhbHModGhpcy5mcm9tRGF0ZSkgfHwgZGF0ZS5lcXVhbHModGhpcy50b0RhdGUpIHx8IHRoaXMuaXNJbnNpZGUoZGF0ZSkgfHwgdGhpcy5pc0hvdmVyZWQoZGF0ZSk7XG5cbiAgc2hvd0RhdGVwaWNrZXIoKSB7XG4gICAgdGhpcy5pc0RhdGVwaWNrZXJWaXNpYmxlID0gdHJ1ZTtcbiAgICB0aGlzLnByZXNldFNlbGVjdCh7IHZhbHVlOiAnY3VzdG9tJyB9KTtcbiAgfVxuXG4gIG9uRmlsdGVyQ2hhbmdlKGZpbHRlciwgaW5kZXgpIHtcbiAgICB0aGlzLnNlbGVjdGVkRmlsdGVyID0gdGhpcy5maWx0ZXJzW2luZGV4XTtcbiAgfVxuXG4gIHNldFByZXNldCh2YWx1ZTogbnVtYmVyIHwgbnVsbCkge1xuICAgIHRoaXMucHJlc2V0U2VsZWN0ZWQgPSB2YWx1ZTtcbiAgICB0aGlzLnByZXNldFNlbGVjdCh7IHZhbHVlOiB0aGlzLnByZXNldFNlbGVjdGVkIH0pO1xuICAgIHRoaXMuYXBwbHkoKTtcbiAgfVxuXG4gIHNldEZpbHRlcihpbmRleDogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuZmlsdGVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkRmlsdGVyID0gdGhpcy5maWx0ZXJzW2luZGV4XTtcbiAgICB9XG4gIH1cblxuICBzZXREYXRlUmFuZ2UodmFsdWUpIHtcbiAgICB0aGlzLmZyb21EYXRlID0gbmV3IE5nYkRhdGUodmFsdWUuZnJvbURhdGUueWVhciwgdmFsdWUuZnJvbURhdGUubW9udGgsIHZhbHVlLmZyb21EYXRlLmRheSk7XG4gICAgdGhpcy50b0RhdGUgPSBuZXcgTmdiRGF0ZSh2YWx1ZS50b0RhdGUueWVhciwgdmFsdWUudG9EYXRlLm1vbnRoLCB2YWx1ZS50b0RhdGUuZGF5KTtcbiAgICB0aGlzLmlzRGF0ZXBpY2tlclZpc2libGUgPSB2YWx1ZS52YWx1ZSA9PT0gJ2N1c3RvbSc7XG4gICAgdGhpcy5wcmVzZXRTZWxlY3RlZCA9IHZhbHVlLnZhbHVlO1xuXG4gICAgaWYgKHRoaXMuZmlsdGVycykge1xuICAgICAgdGhpcy5maWx0ZXJTZWxlY3RlZCA9IHRoaXMuZmlsdGVycy5maW5kSW5kZXgoZiA9PiBmLmZpZWxkID09PSB2YWx1ZS5maWx0ZXIpO1xuICAgICAgdGhpcy5zZWxlY3RlZEZpbHRlciA9IHRoaXMuZmlsdGVyc1t0aGlzLmZpbHRlclNlbGVjdGVkXTtcbiAgICB9XG5cbiAgICB0aGlzLmFwcGx5KCk7XG4gIH1cblxuICBwcml2YXRlIHNldElucHV0TGFiZWwoKSB7XG4gICAgaWYgKHRoaXMucHJlc2V0cykge1xuICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByZXNldHMuZmluZChwID0+IHAudmFsdWUgPT09IHRoaXMucHJlc2V0U2VsZWN0ZWQpO1xuXG4gICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgaWYgKHRoaXMuZnJvbURhdGUgPT09IG51bGwgfHwgdGhpcy50b0RhdGUgPT09IG51bGwpIHtcbiAgICAgICAgICB0aGlzLmRhdGVSYW5nZSA9IHNlbGVjdGVkLmxhYmVsO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJlc2V0U2VsZWN0ZWQgPT09IG51bGwgfHwgKHRoaXMucHJlc2V0U2VsZWN0ZWQgIT09IG51bGwgJiYgdGhpcy5wcmVzZXRTZWxlY3RlZCAhPT0gJ2N1c3RvbScpKSB7XG4gICAgICAgICAgdGhpcy5kYXRlUmFuZ2UgPSBzZWxlY3RlZC5sYWJlbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmRhdGVSYW5nZSA9IGAke3RoaXMuZ2V0Rm9ybWF0dGVkRGF0ZSh0aGlzLmZyb21EYXRlKX0gJHt0aGlzLnRvVGV4dH0gJHt0aGlzLmdldEZvcm1hdHRlZERhdGUoXG4gICAgICAgICAgICB0aGlzLnRvRGF0ZVxuICAgICAgICAgICl9YDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXNldFNlbGVjdGVkID09PSAnY3VzdG9tJyAmJiB0aGlzLmZyb21EYXRlICYmIHRoaXMudG9EYXRlKSB7XG4gICAgICAgIHRoaXMuZGF0ZVJhbmdlID0gYCR7dGhpcy5nZXRGb3JtYXR0ZWREYXRlKHRoaXMuZnJvbURhdGUpfSAke3RoaXMudG9UZXh0fSAke3RoaXMuZ2V0Rm9ybWF0dGVkRGF0ZSh0aGlzLnRvRGF0ZSl9YDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==