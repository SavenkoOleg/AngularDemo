import { Injectable } from '@angular/core';
import * as objectPath from 'object-path';
import { BehaviorSubject } from 'rxjs';
import { LayoutConfigModel } from '../../../core/_base/layout';

export interface ClassType {
	header: string[];
	header_mobile: string[];
	header_menu: string[];
	aside_menu: string[];
}

@Injectable()
export class HtmlClassService {
	config: LayoutConfigModel;
	classes: ClassType;
	onClassesUpdated$: BehaviorSubject<ClassType>;

	private loaded: string[] = [];

	constructor() {
		this.onClassesUpdated$ = new BehaviorSubject(this.classes);
	}

	setConfig(layoutConfig: LayoutConfigModel) {
		this.config = layoutConfig;

		this.classes = {
			header: [],
			header_mobile: [],
			header_menu: [],
			aside_menu: [],
		};

		this.initLayout();
		this.initLoader();
		this.initHeader();
		this.initFooter();

		this.onClassesUpdated$.next(this.classes);
	}

	getClasses(path?: string, toString?: boolean): ClassType | string[] | string {
		if (path) {
			const classes = objectPath.get(this.classes, path) || '';
			if (toString && Array.isArray(classes)) {
				return classes.join(' ');
			}
			return classes.toString();
		}
		return this.classes;
	}

	private initLayout() {
		if (objectPath.has(this.config, 'self.body.class')) {
			document.body.classList.add(objectPath.get(this.config, 'self.body.class'));
		}
		if (objectPath.get(this.config, 'self.layout') === 'boxed' && objectPath.has(this.config, 'self.body.background-image')) {
			document.body.style.backgroundImage = 'url("' + objectPath.get(this.config, 'self.body.background-image') + '")';
		}
	}

	private initLoader() {
	}

	private initHeader() {
		// Fixed header
		if (objectPath.get(this.config, 'header.self.fixed.desktop')) {
			document.body.classList.add('kt-header--fixed');
			objectPath.push(this.classes, 'header', 'kt-header--fixed');
		} else {
			document.body.classList.add('kt-header--static');
		}

		if (objectPath.get(this.config, 'header.self.fixed.mobile')) {
			document.body.classList.add('kt-header-mobile--fixed');
			objectPath.push(this.classes, 'header_mobile', 'kt-header-mobile--fixed');
		}

		if (objectPath.get(this.config, 'header.menu.self.layout')) {
			objectPath.push(this.classes, 'header_menu', 'kt-header-menu--layout-' + objectPath.get(this.config, 'header.menu.self.layout'));
		}
	}

	private initFooter() {
		if (objectPath.get(this.config, 'footer.self.fixed')) {
			document.body.classList.add('kt-footer--fixed');
		}
	}
}
