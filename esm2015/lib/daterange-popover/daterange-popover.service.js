import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import * as i0 from "@angular/core";
export class PbdsDaterangeService {
    constructor(localeId) {
        this.localeId = localeId;
        this.locale = this.localeId.toLowerCase();
    }
    setLocale(locale) {
        this.locale = `${locale.language}-${locale.country}`.toLowerCase();
        // set the angular LOCALE_ID dynamically for ng-bootstrap datepicker
        registerLocaleData(locale.locale, this.locale);
    }
    getCurrentLocale() {
        return this.locale;
    }
}
PbdsDaterangeService.ɵprov = i0.ɵɵdefineInjectable({ factory: function PbdsDaterangeService_Factory() { return new PbdsDaterangeService(i0.ɵɵinject(i0.LOCALE_ID)); }, token: PbdsDaterangeService, providedIn: "root" });
PbdsDaterangeService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
PbdsDaterangeService.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXJhbmdlLXBvcG92ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvZGEwNTdjby9EZXNrdG9wL0NvZGUvbmctZGVzaWduc3lzdGVtL2NsaWVudC9wcm9qZWN0cy9wYi1kZXNpZ24tc3lzdGVtL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9kYXRlcmFuZ2UtcG9wb3Zlci9kYXRlcmFuZ2UtcG9wb3Zlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFPckQsTUFBTSxPQUFPLG9CQUFvQjtJQUcvQixZQUF1QyxRQUFnQjtRQUFoQixhQUFRLEdBQVIsUUFBUSxDQUFRO1FBRi9DLFdBQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBRWEsQ0FBQztJQUUzRCxTQUFTLENBQUMsTUFBMkI7UUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRW5FLG9FQUFvRTtRQUNwRSxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsZ0JBQWdCO1FBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7Ozs7WUFqQkYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7eUNBSWMsTUFBTSxTQUFDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIExPQ0FMRV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgcmVnaXN0ZXJMb2NhbGVEYXRhIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgUGJkc0RhdGVyYW5nZUxvY2FsZSB9IGZyb20gJy4vZGF0ZXJhbmdlLXBvcG92ZXIuaW50ZXJmYWNlcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFBiZHNEYXRlcmFuZ2VTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBsb2NhbGUgPSB0aGlzLmxvY2FsZUlkLnRvTG93ZXJDYXNlKCk7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChMT0NBTEVfSUQpIHByaXZhdGUgbG9jYWxlSWQ6IHN0cmluZykge31cblxuICBzZXRMb2NhbGUobG9jYWxlOiBQYmRzRGF0ZXJhbmdlTG9jYWxlKSB7XG4gICAgdGhpcy5sb2NhbGUgPSBgJHtsb2NhbGUubGFuZ3VhZ2V9LSR7bG9jYWxlLmNvdW50cnl9YC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgLy8gc2V0IHRoZSBhbmd1bGFyIExPQ0FMRV9JRCBkeW5hbWljYWxseSBmb3IgbmctYm9vdHN0cmFwIGRhdGVwaWNrZXJcbiAgICByZWdpc3RlckxvY2FsZURhdGEobG9jYWxlLmxvY2FsZSwgdGhpcy5sb2NhbGUpO1xuICB9XG5cbiAgZ2V0Q3VycmVudExvY2FsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5sb2NhbGU7XG4gIH1cbn1cbiJdfQ==