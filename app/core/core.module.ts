import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentAnimateDirective, HeaderDirective, MenuDirective, StickyDirective } from './_base/layout';
import { OffcanvasDirective, ScrollTopDirective } from './_base/flex';

@NgModule({
	imports: [CommonModule],
	declarations: [
		// directives
		ScrollTopDirective,
		HeaderDirective,
		OffcanvasDirective,
		MenuDirective,
		ContentAnimateDirective,
		StickyDirective
	],
	exports: [
		// directives
		ScrollTopDirective,
		HeaderDirective,
		OffcanvasDirective,
		MenuDirective,
		ContentAnimateDirective,
		StickyDirective
	],
	providers: []
})
export class CoreModule {
}
