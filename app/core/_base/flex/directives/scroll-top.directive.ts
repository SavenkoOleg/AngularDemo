// Angular
import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

export interface ScrollTopOptions {
	offset: number;
	speed: number;
}

/**
 * Scroll to top
 */
@Directive({
	selector: '[ktScrollTop]'
})
export class ScrollTopDirective implements AfterViewInit {
	// Public properties
	@Input() options: ScrollTopOptions;
	// Private properites
	private scrollTop: any;

	constructor(private el: ElementRef) { }

	ngAfterViewInit(): void {
		this.scrollTop = new KTScrolltop(this.el.nativeElement, this.options);
	}

	getScrollTop() {
		return this.scrollTop;
	}
}
