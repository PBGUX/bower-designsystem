import { Component, Injectable, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { getLocaleDayNames, getLocaleMonthNames, getLocaleFirstDayOfWeek, FormStyle, TranslationWidth, getLocaleDateFormat, FormatWidth, formatDate } from '@angular/common';
import { NgbPopover, NgbDate, NgbCalendar, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { PbdsDaterangeService } from './daterange-popover.service';
// Define custom service providing the months and weekdays translations
export class CustomDatepickerI18n extends NgbDatepickerI18n {
    constructor(daterangeService) {
        super();
        this.daterangeService = daterangeService;
    }
    getWeekdayShortName(weekday) {
        // for ng-bootstrap, sunday number of 7 converted to 0
        weekday = weekday === 7 ? 0 : weekday;
        // console.log(
        //   'weekday: ',
        //   this.daterangeService.getCurrentLocale(),
        //   weekday,
        //   getLocaleDayNames(this.daterangeService.getCurrentLocale(), FormStyle.Standalone, TranslationWidth.Abbreviated)[weekday]
        // );
        return getLocaleDayNames(this.daterangeService.getCurrentLocale(), FormStyle.Standalone, TranslationWidth.Abbreviated)[weekday];
    }
    getMonthShortName(month) {
        return getLocaleMonthNames(this.daterangeService.getCurrentLocale(), FormStyle.Standalone, TranslationWidth.Wide)[month - 1];
    }
    getMonthFullName(month) {
        return getLocaleMonthNames(this.daterangeService.getCurrentLocale(), FormStyle.Standalone, TranslationWidth.Wide)[month - 1];
    }
    getDayAriaLabel(date) {
        return `${date.day}-${date.month}-${date.year}`;
    }
}
CustomDatepickerI18n.decorators = [
    { type: Injectable }
];
CustomDatepickerI18n.ctorParameters = () => [
    { type: PbdsDaterangeService }
];
export class PbdsDaterangePopoverComponent {
    constructor(calendar, daterangeService) {
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
        this.minDate = this.calendar.getPrev(this.calendar.getToday(), 'y');
        this.maxDate = this.calendar.getToday();
        this.fromDate = null;
        this.toDate = null;
        this.inputFormat = '{fromDate} to {toDate}';
        this.change = new EventEmitter();
        this.firstDayOfWeek = getLocaleFirstDayOfWeek(this.daterangeService.getCurrentLocale());
        this.dateRange = '';
        this.isDatepickerVisible = false;
        this.presetSelect = $event => {
            if ($event.value === 'custom') {
                this.presetSelected = 'custom';
                return false;
            }
            if ($event.value) {
                this.toDate = this.calendar.getToday();
                this.fromDate = this.calendar.getPrev(this.toDate, 'd', $event.value);
                this.presetSelected = $event.value;
            }
            else {
                this.fromDate = null;
                this.toDate = null;
                this.presetSelected = null;
            }
            this.isDatepickerVisible = false;
        };
        this.isHovered = (date) => this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
        this.isInside = (date) => date.after(this.fromDate) && date.before(this.toDate);
        this.isRange = (date) => date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
    }
    ngOnInit() {
        // china should start on a Monday, Angular locale returns incorrect 0
        this.firstDayOfWeek =
            this.daterangeService.getCurrentLocale() === 'zh-cn' ? this.firstDayOfWeek + 1 : this.firstDayOfWeek;
        if (this.presetSelected === 'custom') {
            this.showDatepicker();
        }
    }
    ngOnChanges(changes) {
        if (changes.filters && this.filters) {
            this.selectedFilter = this.filters[this.filterSelected];
        }
        if (changes.presets) {
            if (!this.filters && this.presetSelected) {
                this.presetClick(this.presets.find(p => p.value === this.presetSelected));
            }
            else if (this.presetSelected) {
                this.presetSelect({ value: this.presetSelected });
                this.apply();
            }
        }
        // if (changes.toText && changes.toText.firstChange === false) {
        //   this.setInputLabel();
        // }
        this.setInputLabel();
    }
    apply() {
        this.setInputLabel();
        this.change.emit({
            fromDate: this.fromDate,
            toDate: this.toDate,
            formattedDate: this.isDatepickerVisible ? this.dateFormat() : this.dateRange,
            filter: this.filters ? this.selectedFilter.field : null,
            value: this.presetSelected
        });
        this.datepickerPopup.close();
    }
    cancel() {
        this.datepickerPopup.close();
    }
    onDateSelection(date) {
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
    }
    presetClick(preset) {
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
    }
    getFormattedDate(date) {
        if (date) {
            const locale = this.daterangeService.getCurrentLocale();
            const dateFormat = getLocaleDateFormat(locale, FormatWidth.Short);
            const formattedDate = formatDate(`${date.month}/${date.day}/${date.year}`, dateFormat, locale);
            return formattedDate;
        }
    }
    showDatepicker() {
        this.isDatepickerVisible = true;
        this.presetSelect({ value: 'custom' });
    }
    onFilterChange(filter, index) {
        this.selectedFilter = this.filters[index];
    }
    setPreset(value) {
        this.presetSelected = value;
        this.presetSelect({ value: this.presetSelected });
        this.apply();
    }
    setFilter(index) {
        if (this.filters !== undefined) {
            this.selectedFilter = this.filters[index];
        }
    }
    setDateRange(value) {
        this.fromDate = new NgbDate(value.fromDate.year, value.fromDate.month, value.fromDate.day);
        this.toDate = new NgbDate(value.toDate.year, value.toDate.month, value.toDate.day);
        this.isDatepickerVisible = value.value === 'custom';
        this.presetSelected = value.value;
        if (this.filters) {
            this.filterSelected = this.filters.findIndex(f => f.field === value.filter);
            this.selectedFilter = this.filters[this.filterSelected];
        }
        this.apply();
    }
    setInputLabel() {
        if (this.presets) {
            const selected = this.presets.find(p => p.value === this.presetSelected);
            if (selected) {
                if (this.fromDate === null || this.toDate === null) {
                    this.dateRange = selected.label;
                }
                else if (this.presetSelected === null || (this.presetSelected !== null && this.presetSelected !== 'custom')) {
                    this.dateRange = selected.label;
                }
                else {
                    this.dateRange = this.dateFormat();
                }
            }
            else if (this.presetSelected === 'custom' && this.fromDate && this.toDate) {
                this.dateRange = this.dateFormat();
            }
        }
    }
    dateFormat() {
        return this.inputFormat
            .replace('{fromDate}', this.getFormattedDate(this.fromDate))
            .replace('{toDate}', this.getFormattedDate(this.toDate));
    }
}
PbdsDaterangePopoverComponent.decorators = [
    { type: Component, args: [{
                selector: 'pbds-daterange-popover',
                template: "<div class=\"input-group pbds-daterange-popover\">\n  <input\n    type=\"text\"\n    class=\"form-control\"\n    aria-describedby=\"daterange-button\"\n    [value]=\"dateRange\"\n    readonly=\"readonly\"\n    tabindex=\"-1\"\n  />\n\n  <div class=\"input-group-append\">\n    <button\n      class=\"btn btn-secondary\"\n      type=\"button\"\n      id=\"daterange-button\"\n      #datepickerPopup=\"ngbPopover\"\n      [ngbPopover]=\"daterangeContent\"\n      popoverClass=\"daterange-popover\"\n      autoClose=\"outside\"\n      container=\"body\"\n      placement=\"bottom-right auto\"\n      aria-label=\"Open Daterange Picker\"\n    >\n      <i class=\"pbi-icon-mini pbi-calendar\" aria-hidden=\"true\"></i>\n    </button>\n  </div>\n\n  <ng-template #daterangeContent>\n    <div>\n      <div class=\"d-block d-md-flex\">\n        <div *ngIf=\"isDatepickerVisible\">\n          <ngb-datepicker\n            #datepicker\n            [displayMonths]=\"'2'\"\n            [minDate]=\"minDate\"\n            [maxDate]=\"maxDate\"\n            navigation=\"select\"\n            outsideDays=\"hidden\"\n            [firstDayOfWeek]=\"firstDayOfWeek\"\n            [showWeekdays]=\"true\"\n            [dayTemplate]=\"t\"\n            (select)=\"onDateSelection($event)\"\n          >\n          </ngb-datepicker>\n          <!--  -->\n\n          <ng-template #t let-date let-focused=\"focused\">\n            <span\n              class=\"custom-day\"\n              [class.focused]=\"focused\"\n              [class.range]=\"isRange(date)\"\n              [class.faded]=\"isHovered(date) || isInside(date)\"\n              (mouseenter)=\"hoveredDate = date\"\n              (mouseleave)=\"hoveredDate = null\"\n            >\n              {{ date.day }}\n            </span>\n          </ng-template>\n        </div>\n\n        <div\n          class=\"d-flex flex-column justify-content-lg-between mt-md-0\"\n          [ngClass]=\"{ 'ml-md-4': isDatepickerVisible }\"\n        >\n          <!-- filters -->\n          <div *ngIf=\"filters\" class=\"mb-3\" ngbDropdown>\n            <button class=\"btn btn-sm btn-secondary btn-block\" id=\"dateFilter\" ngbDropdownToggle>\n              {{ selectedFilter.label }}\n            </button>\n            <div ngbDropdownMenu aria-labelledby=\"dateFilter\">\n              <button\n                class=\"dropdown-item\"\n                type=\"button\"\n                *ngFor=\"let filter of filters; let index = index\"\n                (click)=\"onFilterChange(filter, index)\"\n              >\n                {{ filter.label }}\n              </button>\n            </div>\n          </div>\n\n          <!-- presets radio buttons-->\n          <div *ngIf=\"presets && filters\" class=\"flex-grow-1\">\n            <mat-radio-group\n              aria-label=\"Select an option\"\n              class=\"stacked-radio-group\"\n              name=\"presets\"\n              [(ngModel)]=\"presetSelected\"\n              (change)=\"presetSelect($event)\"\n            >\n              <mat-radio-button *ngFor=\"let preset of presets\" [value]=\"preset.value\">{{\n                preset.label\n              }}</mat-radio-button>\n\n              <mat-radio-button *ngIf=\"showCustomPreset\" [value]=\"'custom'\" (change)=\"showDatepicker()\">{{\n                customRangeText\n              }}</mat-radio-button>\n            </mat-radio-group>\n          </div>\n\n          <!-- presets buttons-->\n          <div *ngIf=\"presets && !filters\" class=\"flex-grow-1\">\n            <button\n              type=\"button\"\n              class=\"btn btn-secondary btn-block btn-sm text-nowrap\"\n              *ngFor=\"let preset of presets\"\n              (click)=\"presetClick(preset)\"\n            >\n              {{ preset.label }}\n            </button>\n\n            <button\n              type=\"button\"\n              class=\"btn btn-secondary btn-block btn-sm text-nowrap\"\n              *ngIf=\"showCustomPreset\"\n              (click)=\"showDatepicker()\"\n            >\n              {{ customRangeText }}\n            </button>\n          </div>\n\n          <!-- buttons -->\n          <div *ngIf=\"filters || isDatepickerVisible\" class=\"d-flex justify-content-between mt-3\">\n            <button class=\"btn btn-primary btn-sm mr-1\" type=\"button\" (click)=\"apply()\">{{ applyText }}</button>\n            <button class=\"btn btn-secondary btn-sm ml-1\" type=\"button\" (click)=\"cancel()\">\n              {{ cancelText }}\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </ng-template>\n</div>\n",
                providers: [{ provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }]
            },] }
];
PbdsDaterangePopoverComponent.ctorParameters = () => [
    { type: NgbCalendar },
    { type: PbdsDaterangeService }
];
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
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    fromDate: [{ type: Input }],
    toDate: [{ type: Input }],
    inputFormat: [{ type: Input }],
    change: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXJhbmdlLXBvcG92ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9kYTA1N2NvL0Rlc2t0b3AvQ29kZS9uZy1kZXNpZ25zeXN0ZW0vY2xpZW50L3Byb2plY3RzL3BiLWRlc2lnbi1zeXN0ZW0vZGF0ZXJhbmdlLXBvcG92ZXIvIiwic291cmNlcyI6WyJkYXRlcmFuZ2UtcG9wb3Zlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBRVYsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUdiLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsbUJBQW1CLEVBQ25CLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLG1CQUFtQixFQUNuQixXQUFXLEVBQ1gsVUFBVSxFQUNYLE1BQU0saUJBQWlCLENBQUM7QUFFekIsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFpQixNQUFNLDRCQUE0QixDQUFDO0FBR2hILE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRW5FLHVFQUF1RTtBQUV2RSxNQUFNLE9BQU8sb0JBQXFCLFNBQVEsaUJBQWlCO0lBQ3pELFlBQW1CLGdCQUFzQztRQUN2RCxLQUFLLEVBQUUsQ0FBQztRQURTLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBc0I7SUFFekQsQ0FBQztJQUVELG1CQUFtQixDQUFDLE9BQWU7UUFDakMsc0RBQXNEO1FBQ3RELE9BQU8sR0FBRyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUV0QyxlQUFlO1FBQ2YsaUJBQWlCO1FBQ2pCLDhDQUE4QztRQUM5QyxhQUFhO1FBQ2IsNkhBQTZIO1FBQzdILEtBQUs7UUFFTCxPQUFPLGlCQUFpQixD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SUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzNELE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7OztZQS9QRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsb2hKQUFpRDtnQkFDakQsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFLENBQUM7YUFFNUU7OztZQXBENkIsV0FBVztZQUdoQyxvQkFBb0I7Ozs4QkFtRDFCLFNBQVMsU0FBQyxpQkFBaUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7c0JBRTdDLEtBQUs7NkJBb0JMLEtBQUs7c0JBR0wsS0FBSzs2QkFHTCxLQUFLOytCQUdMLEtBQUs7d0JBR0wsS0FBSzt5QkFHTCxLQUFLOzhCQUdMLEtBQUs7c0JBR0wsS0FBSztzQkFHTCxLQUFLO3VCQUdMLEtBQUs7cUJBR0wsS0FBSzswQkFHTCxLQUFLO3FCQUdMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEluamVjdGFibGUsXG4gIE9uSW5pdCxcbiAgVmlld0NoaWxkLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtcbiAgZ2V0TG9jYWxlRGF5TmFtZXMsXG4gIGdldExvY2FsZU1vbnRoTmFtZXMsXG4gIGdldExvY2FsZUZpcnN0RGF5T2ZXZWVrLFxuICBGb3JtU3R5bGUsXG4gIFRyYW5zbGF0aW9uV2lkdGgsXG4gIGdldExvY2FsZURhdGVGb3JtYXQsXG4gIEZvcm1hdFdpZHRoLFxuICBmb3JtYXREYXRlXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IE5nYlBvcG92ZXIsIE5nYkRhdGUsIE5nYkNhbGVuZGFyLCBOZ2JEYXRlcGlja2VySTE4biwgTmdiRGF0ZVN0cnVjdCB9IGZyb20gJ0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwJztcblxuaW1wb3J0IHsgUGJkc0RhdGVyYW5nZVByZXNldCwgUGJkc0RhdGVyYW5nZUZpbHRlciwgUGJkc0RhdGVyYW5nZUNoYW5nZSB9IGZyb20gJy4vZGF0ZXJhbmdlLXBvcG92ZXIuaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBQYmRzRGF0ZXJhbmdlU2VydmljZSB9IGZyb20gJy4vZGF0ZXJhbmdlLXBvcG92ZXIuc2VydmljZSc7XG5cbi8vIERlZmluZSBjdXN0b20gc2VydmljZSBwcm92aWRpbmcgdGhlIG1vbnRocyBhbmQgd2Vla2RheXMgdHJhbnNsYXRpb25zXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ3VzdG9tRGF0ZXBpY2tlckkxOG4gZXh0ZW5kcyBOZ2JEYXRlcGlja2VySTE4biB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkYXRlcmFuZ2VTZXJ2aWNlOiBQYmRzRGF0ZXJhbmdlU2VydmljZSkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBnZXRXZWVrZGF5U2hvcnROYW1lKHdlZWtkYXk6IG51bWJlcik6IHN0cmluZyB7XG4gICAgLy8gZm9yIG5nLWJvb3RzdHJhcCwgc3VuZGF5IG51bWJlciBvZiA3IGNvbnZlcnRlZCB0byAwXG4gICAgd2Vla2RheSA9IHdlZWtkYXkgPT09IDcgPyAwIDogd2Vla2RheTtcblxuICAgIC8vIGNvbnNvbGUubG9nKFxuICAgIC8vICAgJ3dlZWtkYXk6ICcsXG4gICAgLy8gICB0aGlzLmRhdGVyYW5nZVNlcnZpY2UuZ2V0Q3VycmVudExvY2FsZSgpLFxuICAgIC8vICAgd2Vla2RheSxcbiAgICAvLyAgIGdldExvY2FsZURheU5hbWVzKHRoaXMuZGF0ZXJhbmdlU2VydmljZS5nZXRDdXJyZW50TG9jYWxlKCksIEZvcm1TdHlsZS5TdGFuZGFsb25lLCBUcmFuc2xhdGlvbldpZHRoLkFiYnJldmlhdGVkKVt3ZWVrZGF5XVxuICAgIC8vICk7XG5cbiAgICByZXR1cm4gZ2V0TG9jYWxlRGF5TmFtZXMoXG4gICAgICB0aGlzLmRhdGVyYW5nZVNlcnZpY2UuZ2V0Q3VycmVudExvY2FsZSgpLFxuICAgICAgRm9ybVN0eWxlLlN0YW5kYWxvbmUsXG4gICAgICBUcmFuc2xhdGlvbldpZHRoLkFiYnJldmlhdGVkXG4gICAgKVt3ZWVrZGF5XTtcbiAgfVxuXG4gIGdldE1vbnRoU2hvcnROYW1lKG1vbnRoOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBnZXRMb2NhbGVNb250aE5hbWVzKHRoaXMuZGF0ZXJhbmdlU2VydmljZS5nZXRDdXJyZW50TG9jYWxlKCksIEZvcm1TdHlsZS5TdGFuZGFsb25lLCBUcmFuc2xhdGlvbldpZHRoLldpZGUpW1xuICAgICAgbW9udGggLSAxXG4gICAgXTtcbiAgfVxuXG4gIGdldE1vbnRoRnVsbE5hbWUobW9udGg6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGdldExvY2FsZU1vbnRoTmFtZXModGhpcy5kYXRlcmFuZ2VTZXJ2aWNlLmdldEN1cnJlbnRMb2NhbGUoKSwgRm9ybVN0eWxlLlN0YW5kYWxvbmUsIFRyYW5zbGF0aW9uV2lkdGguV2lkZSlbXG4gICAgICBtb250aCAtIDFcbiAgICBdO1xuICB9XG5cbiAgZ2V0RGF5QXJpYUxhYmVsKGRhdGU6IE5nYkRhdGVTdHJ1Y3QpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHtkYXRlLmRheX0tJHtkYXRlLm1vbnRofS0ke2RhdGUueWVhcn1gO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BiZHMtZGF0ZXJhbmdlLXBvcG92ZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vZGF0ZXJhbmdlLXBvcG92ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IE5nYkRhdGVwaWNrZXJJMThuLCB1c2VDbGFzczogQ3VzdG9tRGF0ZXBpY2tlckkxOG4gfV0sXG4gIHN0eWxlczogW11cbn0pXG5leHBvcnQgY2xhc3MgUGJkc0RhdGVyYW5nZVBvcG92ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBWaWV3Q2hpbGQoJ2RhdGVwaWNrZXJQb3B1cCcsIHsgc3RhdGljOiB0cnVlIH0pIHByaXZhdGUgZGF0ZXBpY2tlclBvcHVwOiBOZ2JQb3BvdmVyO1xuXG4gIEBJbnB1dCgpXG4gIHByZXNldHM6IEFycmF5PFBiZHNEYXRlcmFuZ2VQcmVzZXQ+ID0gW1xuICAgIHtcbiAgICAgIGxhYmVsOiAnQWxsIERhdGVzJyxcbiAgICAgIHZhbHVlOiBudWxsXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ0xhc3QgNyBEYXlzJyxcbiAgICAgIHZhbHVlOiA3XG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ0xhc3QgMzAgRGF5cycsXG4gICAgICB2YWx1ZTogMzBcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnWWVhciB0byBEYXRlJyxcbiAgICAgIHZhbHVlOiAzNjVcbiAgICB9XG4gIF07XG5cbiAgQElucHV0KClcbiAgcHJlc2V0U2VsZWN0ZWQ6IG51bWJlciB8IG51bGwgfCAnY3VzdG9tJyA9IG51bGw7XG5cbiAgQElucHV0KClcbiAgZmlsdGVyczogQXJyYXk8UGJkc0RhdGVyYW5nZUZpbHRlcj47XG5cbiAgQElucHV0KClcbiAgZmlsdGVyU2VsZWN0ZWQgPSAwO1xuXG4gIEBJbnB1dCgpXG4gIHNob3dDdXN0b21QcmVzZXQgPSB0cnVlO1xuXG4gIEBJbnB1dCgpXG4gIGFwcGx5VGV4dCA9ICdBcHBseSc7XG5cbiAgQElucHV0KClcbiAgY2FuY2VsVGV4dCA9ICdDYW5jZWwnO1xuXG4gIEBJbnB1dCgpXG4gIGN1c3RvbVJhbmdlVGV4dCA9ICdDdXN0b20gUmFuZ2UnO1xuXG4gIEBJbnB1dCgpXG4gIG1pbkRhdGU6IE5nYkRhdGUgPSB0aGlzLmNhbGVuZGFyLmdldFByZXYodGhpcy5jYWxlbmRhci5nZXRUb2RheSgpLCAneScpO1xuXG4gIEBJbnB1dCgpXG4gIG1heERhdGU6IE5nYkRhdGUgPSB0aGlzLmNhbGVuZGFyLmdldFRvZGF5KCk7XG5cbiAgQElucHV0KClcbiAgZnJvbURhdGU6IE5nYkRhdGUgfCBudWxsID0gbnVsbDtcblxuICBASW5wdXQoKVxuICB0b0RhdGU6IE5nYkRhdGUgfCBudWxsID0gbnVsbDtcblxuICBASW5wdXQoKVxuICBpbnB1dEZvcm1hdCA9ICd7ZnJvbURhdGV9IHRvIHt0b0RhdGV9JztcblxuICBAT3V0cHV0KClcbiAgcHJpdmF0ZSBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxQYmRzRGF0ZXJhbmdlQ2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8UGJkc0RhdGVyYW5nZUNoYW5nZT4oKTtcblxuICBmaXJzdERheU9mV2VlayA9IGdldExvY2FsZUZpcnN0RGF5T2ZXZWVrKHRoaXMuZGF0ZXJhbmdlU2VydmljZS5nZXRDdXJyZW50TG9jYWxlKCkpO1xuXG4gIGhvdmVyZWREYXRlOiBOZ2JEYXRlO1xuXG4gIGRhdGVSYW5nZSA9ICcnO1xuICBpc0RhdGVwaWNrZXJWaXNpYmxlID0gZmFsc2U7XG4gIHNlbGVjdGVkRmlsdGVyO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FsZW5kYXI6IE5nYkNhbGVuZGFyLCBwcml2YXRlIGRhdGVyYW5nZVNlcnZpY2U6IFBiZHNEYXRlcmFuZ2VTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIGNoaW5hIHNob3VsZCBzdGFydCBvbiBhIE1vbmRheSwgQW5ndWxhciBsb2NhbGUgcmV0dXJucyBpbmNvcnJlY3QgMFxuICAgIHRoaXMuZmlyc3REYXlPZldlZWsgPVxuICAgICAgdGhpcy5kYXRlcmFuZ2VTZXJ2aWNlLmdldEN1cnJlbnRMb2NhbGUoKSA9PT0gJ3poLWNuJyA/IHRoaXMuZmlyc3REYXlPZldlZWsgKyAxIDogdGhpcy5maXJzdERheU9mV2VlaztcblxuICAgIGlmICh0aGlzLnByZXNldFNlbGVjdGVkID09PSAnY3VzdG9tJykge1xuICAgICAgdGhpcy5zaG93RGF0ZXBpY2tlcigpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5maWx0ZXJzICYmIHRoaXMuZmlsdGVycykge1xuICAgICAgdGhpcy5zZWxlY3RlZEZpbHRlciA9IHRoaXMuZmlsdGVyc1t0aGlzLmZpbHRlclNlbGVjdGVkXTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy5wcmVzZXRzKSB7XG4gICAgICBpZiAoIXRoaXMuZmlsdGVycyAmJiB0aGlzLnByZXNldFNlbGVjdGVkKSB7XG4gICAgICAgIHRoaXMucHJlc2V0Q2xpY2sodGhpcy5wcmVzZXRzLmZpbmQocCA9PiBwLnZhbHVlID09PSB0aGlzLnByZXNldFNlbGVjdGVkKSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucHJlc2V0U2VsZWN0ZWQpIHtcbiAgICAgICAgdGhpcy5wcmVzZXRTZWxlY3QoeyB2YWx1ZTogdGhpcy5wcmVzZXRTZWxlY3RlZCB9KTtcbiAgICAgICAgdGhpcy5hcHBseSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGlmIChjaGFuZ2VzLnRvVGV4dCAmJiBjaGFuZ2VzLnRvVGV4dC5maXJzdENoYW5nZSA9PT0gZmFsc2UpIHtcbiAgICAvLyAgIHRoaXMuc2V0SW5wdXRMYWJlbCgpO1xuICAgIC8vIH1cblxuICAgIHRoaXMuc2V0SW5wdXRMYWJlbCgpO1xuICB9XG5cbiAgYXBwbHkoKSB7XG4gICAgdGhpcy5zZXRJbnB1dExhYmVsKCk7XG4gICAgdGhpcy5jaGFuZ2UuZW1pdCh7XG4gICAgICBmcm9tRGF0ZTogdGhpcy5mcm9tRGF0ZSxcbiAgICAgIHRvRGF0ZTogdGhpcy50b0RhdGUsXG4gICAgICBmb3JtYXR0ZWREYXRlOiB0aGlzLmlzRGF0ZXBpY2tlclZpc2libGUgPyB0aGlzLmRhdGVGb3JtYXQoKSA6IHRoaXMuZGF0ZVJhbmdlLFxuICAgICAgZmlsdGVyOiB0aGlzLmZpbHRlcnMgPyB0aGlzLnNlbGVjdGVkRmlsdGVyLmZpZWxkIDogbnVsbCxcbiAgICAgIHZhbHVlOiB0aGlzLnByZXNldFNlbGVjdGVkXG4gICAgfSk7XG5cbiAgICB0aGlzLmRhdGVwaWNrZXJQb3B1cC5jbG9zZSgpO1xuICB9XG5cbiAgY2FuY2VsKCkge1xuICAgIHRoaXMuZGF0ZXBpY2tlclBvcHVwLmNsb3NlKCk7XG4gIH1cblxuICBvbkRhdGVTZWxlY3Rpb24oZGF0ZTogTmdiRGF0ZSkge1xuICAgIGlmICghdGhpcy5mcm9tRGF0ZSAmJiAhdGhpcy50b0RhdGUpIHtcbiAgICAgIHRoaXMuZnJvbURhdGUgPSBkYXRlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5mcm9tRGF0ZSAmJiAhdGhpcy50b0RhdGUgJiYgZGF0ZS5hZnRlcih0aGlzLmZyb21EYXRlKSkge1xuICAgICAgdGhpcy50b0RhdGUgPSBkYXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRvRGF0ZSA9IG51bGw7XG4gICAgICB0aGlzLmZyb21EYXRlID0gZGF0ZTtcbiAgICB9XG5cbiAgICAvLyB0aGlzLnByZXNldFNlbGVjdGVkID0gbnVsbDtcbiAgfVxuXG4gIHByZXNldFNlbGVjdCA9ICRldmVudCA9PiB7XG4gICAgaWYgKCRldmVudC52YWx1ZSA9PT0gJ2N1c3RvbScpIHtcbiAgICAgIHRoaXMucHJlc2V0U2VsZWN0ZWQgPSAnY3VzdG9tJztcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoJGV2ZW50LnZhbHVlKSB7XG4gICAgICB0aGlzLnRvRGF0ZSA9IHRoaXMuY2FsZW5kYXIuZ2V0VG9kYXkoKTtcbiAgICAgIHRoaXMuZnJvbURhdGUgPSB0aGlzLmNhbGVuZGFyLmdldFByZXYodGhpcy50b0RhdGUsICdkJywgJGV2ZW50LnZhbHVlKTtcbiAgICAgIHRoaXMucHJlc2V0U2VsZWN0ZWQgPSAkZXZlbnQudmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZnJvbURhdGUgPSBudWxsO1xuICAgICAgdGhpcy50b0RhdGUgPSBudWxsO1xuICAgICAgdGhpcy5wcmVzZXRTZWxlY3RlZCA9IG51bGw7XG4gICAgfVxuXG4gICAgdGhpcy5pc0RhdGVwaWNrZXJWaXNpYmxlID0gZmFsc2U7XG4gIH07XG5cbiAgcHJlc2V0Q2xpY2socHJlc2V0KSB7XG4gICAgLy8gY29uc29sZS5sb2coJ1BSRVNFVCBDTElDSzogJywgcHJlc2V0KTtcbiAgICBpZiAocHJlc2V0KSB7XG4gICAgICBpZiAocHJlc2V0LnZhbHVlID09PSAnY3VzdG9tJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcmVzZXQudmFsdWUpIHtcbiAgICAgICAgdGhpcy50b0RhdGUgPSB0aGlzLmNhbGVuZGFyLmdldFRvZGF5KCk7XG4gICAgICAgIHRoaXMuZnJvbURhdGUgPSB0aGlzLmNhbGVuZGFyLmdldFByZXYodGhpcy50b0RhdGUsICdkJywgcHJlc2V0LnZhbHVlKTtcbiAgICAgICAgdGhpcy5wcmVzZXRTZWxlY3RlZCA9IHByZXNldC52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZnJvbURhdGUgPSBudWxsO1xuICAgICAgICB0aGlzLnRvRGF0ZSA9IG51bGw7XG4gICAgICAgIHRoaXMucHJlc2V0U2VsZWN0ZWQgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmlzRGF0ZXBpY2tlclZpc2libGUgPSBmYWxzZTtcbiAgICAgIHRoaXMuYXBwbHkoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldEZvcm1hdHRlZERhdGUoZGF0ZTogTmdiRGF0ZSkge1xuICAgIGlmIChkYXRlKSB7XG4gICAgICBjb25zdCBsb2NhbGUgPSB0aGlzLmRhdGVyYW5nZVNlcnZpY2UuZ2V0Q3VycmVudExvY2FsZSgpO1xuICAgICAgY29uc3QgZGF0ZUZvcm1hdCA9IGdldExvY2FsZURhdGVGb3JtYXQobG9jYWxlLCBGb3JtYXRXaWR0aC5TaG9ydCk7XG4gICAgICBjb25zdCBmb3JtYXR0ZWREYXRlID0gZm9ybWF0RGF0ZShgJHtkYXRlLm1vbnRofS8ke2RhdGUuZGF5fS8ke2RhdGUueWVhcn1gLCBkYXRlRm9ybWF0LCBsb2NhbGUpO1xuXG4gICAgICByZXR1cm4gZm9ybWF0dGVkRGF0ZTtcbiAgICB9XG4gIH1cblxuICBpc0hvdmVyZWQgPSAoZGF0ZTogTmdiRGF0ZSkgPT5cbiAgICB0aGlzLmZyb21EYXRlICYmICF0aGlzLnRvRGF0ZSAmJiB0aGlzLmhvdmVyZWREYXRlICYmIGRhdGUuYWZ0ZXIodGhpcy5mcm9tRGF0ZSkgJiYgZGF0ZS5iZWZvcmUodGhpcy5ob3ZlcmVkRGF0ZSk7XG5cbiAgaXNJbnNpZGUgPSAoZGF0ZTogTmdiRGF0ZSkgPT4gZGF0ZS5hZnRlcih0aGlzLmZyb21EYXRlKSAmJiBkYXRlLmJlZm9yZSh0aGlzLnRvRGF0ZSk7XG5cbiAgaXNSYW5nZSA9IChkYXRlOiBOZ2JEYXRlKSA9PlxuICAgIGRhdGUuZXF1YWxzKHRoaXMuZnJvbURhdGUpIHx8IGRhdGUuZXF1YWxzKHRoaXMudG9EYXRlKSB8fCB0aGlzLmlzSW5zaWRlKGRhdGUpIHx8IHRoaXMuaXNIb3ZlcmVkKGRhdGUpO1xuXG4gIHNob3dEYXRlcGlja2VyKCkge1xuICAgIHRoaXMuaXNEYXRlcGlja2VyVmlzaWJsZSA9IHRydWU7XG4gICAgdGhpcy5wcmVzZXRTZWxlY3QoeyB2YWx1ZTogJ2N1c3RvbScgfSk7XG4gIH1cblxuICBvbkZpbHRlckNoYW5nZShmaWx0ZXIsIGluZGV4KSB7XG4gICAgdGhpcy5zZWxlY3RlZEZpbHRlciA9IHRoaXMuZmlsdGVyc1tpbmRleF07XG4gIH1cblxuICBzZXRQcmVzZXQodmFsdWU6IG51bWJlciB8IG51bGwpIHtcbiAgICB0aGlzLnByZXNldFNlbGVjdGVkID0gdmFsdWU7XG4gICAgdGhpcy5wcmVzZXRTZWxlY3QoeyB2YWx1ZTogdGhpcy5wcmVzZXRTZWxlY3RlZCB9KTtcbiAgICB0aGlzLmFwcGx5KCk7XG4gIH1cblxuICBzZXRGaWx0ZXIoaW5kZXg6IG51bWJlcikge1xuICAgIGlmICh0aGlzLmZpbHRlcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5zZWxlY3RlZEZpbHRlciA9IHRoaXMuZmlsdGVyc1tpbmRleF07XG4gICAgfVxuICB9XG5cbiAgc2V0RGF0ZVJhbmdlKHZhbHVlKSB7XG4gICAgdGhpcy5mcm9tRGF0ZSA9IG5ldyBOZ2JEYXRlKHZhbHVlLmZyb21EYXRlLnllYXIsIHZhbHVlLmZyb21EYXRlLm1vbnRoLCB2YWx1ZS5mcm9tRGF0ZS5kYXkpO1xuICAgIHRoaXMudG9EYXRlID0gbmV3IE5nYkRhdGUodmFsdWUudG9EYXRlLnllYXIsIHZhbHVlLnRvRGF0ZS5tb250aCwgdmFsdWUudG9EYXRlLmRheSk7XG4gICAgdGhpcy5pc0RhdGVwaWNrZXJWaXNpYmxlID0gdmFsdWUudmFsdWUgPT09ICdjdXN0b20nO1xuICAgIHRoaXMucHJlc2V0U2VsZWN0ZWQgPSB2YWx1ZS52YWx1ZTtcblxuICAgIGlmICh0aGlzLmZpbHRlcnMpIHtcbiAgICAgIHRoaXMuZmlsdGVyU2VsZWN0ZWQgPSB0aGlzLmZpbHRlcnMuZmluZEluZGV4KGYgPT4gZi5maWVsZCA9PT0gdmFsdWUuZmlsdGVyKTtcbiAgICAgIHRoaXMuc2VsZWN0ZWRGaWx0ZXIgPSB0aGlzLmZpbHRlcnNbdGhpcy5maWx0ZXJTZWxlY3RlZF07XG4gICAgfVxuXG4gICAgdGhpcy5hcHBseSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbnB1dExhYmVsKCkge1xuICAgIGlmICh0aGlzLnByZXNldHMpIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5wcmVzZXRzLmZpbmQocCA9PiBwLnZhbHVlID09PSB0aGlzLnByZXNldFNlbGVjdGVkKTtcblxuICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgIGlmICh0aGlzLmZyb21EYXRlID09PSBudWxsIHx8IHRoaXMudG9EYXRlID09PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5kYXRlUmFuZ2UgPSBzZWxlY3RlZC5sYWJlbDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXNldFNlbGVjdGVkID09PSBudWxsIHx8ICh0aGlzLnByZXNldFNlbGVjdGVkICE9PSBudWxsICYmIHRoaXMucHJlc2V0U2VsZWN0ZWQgIT09ICdjdXN0b20nKSkge1xuICAgICAgICAgIHRoaXMuZGF0ZVJhbmdlID0gc2VsZWN0ZWQubGFiZWw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5kYXRlUmFuZ2UgPSB0aGlzLmRhdGVGb3JtYXQoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXNldFNlbGVjdGVkID09PSAnY3VzdG9tJyAmJiB0aGlzLmZyb21EYXRlICYmIHRoaXMudG9EYXRlKSB7XG4gICAgICAgIHRoaXMuZGF0ZVJhbmdlID0gdGhpcy5kYXRlRm9ybWF0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkYXRlRm9ybWF0KCkge1xuICAgIHJldHVybiB0aGlzLmlucHV0Rm9ybWF0XG4gICAgICAucmVwbGFjZSgne2Zyb21EYXRlfScsIHRoaXMuZ2V0Rm9ybWF0dGVkRGF0ZSh0aGlzLmZyb21EYXRlKSlcbiAgICAgIC5yZXBsYWNlKCd7dG9EYXRlfScsIHRoaXMuZ2V0Rm9ybWF0dGVkRGF0ZSh0aGlzLnRvRGF0ZSkpO1xuICB9XG59XG4iXX0=