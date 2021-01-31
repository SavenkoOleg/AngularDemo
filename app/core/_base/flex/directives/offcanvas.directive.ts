// Angular
import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

export interface OffcanvasOptions {
	baseClass: string;
	overlay?: boolean;
	closeBy: string;
	toggleBy?: any;
}

/**
 * Setup off Convas
 */
@Directive({
	selector: '[ktOffcanvas]',
	exportAs: 'ktOffcanvas',
})
export class OffcanvasDirective implements AfterViewInit {
	// Public properties
	@Input() options: OffcanvasOptions;
	// Private properties
	private offcanvas: any;
	constructor(private el: ElementRef) { }
	ngAfterViewInit(): void {
		this.offcanvas = new KTOffcanvas(this.el.nativeElement, this.options);
	}

	getOffcanvas() {
		return this.offcanvas;
	}
}
