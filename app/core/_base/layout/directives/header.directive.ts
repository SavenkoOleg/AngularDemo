import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import * as objectPath from 'object-path';

export interface HeaderOptions {
	classic?: any;
	offset?: any;
	minimize?: any;
}

@Directive({
	selector: '[ktHeader]',
	exportAs: 'ktHeader',
})
export class HeaderDirective implements AfterViewInit {
	@Input() options: HeaderOptions = {};

	constructor(private el: ElementRef) {}

	ngAfterViewInit(): void {
		this.setupOptions();
		const header = new KTHeader(this.el.nativeElement, this.options);
	}

	private setupOptions() {
		if (this.el.nativeElement.getAttribute('data-ktheader-minimize') === '1') {
			objectPath.set(this.options, 'minimize.desktop.on', 'kt-header--minimize');
			objectPath.set(this.options, 'offset.desktop', 150);
		}
	}
}