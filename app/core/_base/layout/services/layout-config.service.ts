import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as objectPath from 'object-path';
import { merge } from 'lodash';
import { LayoutConfigModel } from '../models/layout-config.model';

@Injectable()
export class LayoutConfigService {

	constructor() {
		this.onConfigUpdated$ = new Subject();
	}

	onConfigUpdated$: Subject<LayoutConfigModel>;
	layoutConfig: LayoutConfigModel;

	saveConfig(layoutConfig: LayoutConfigModel): void {
		if (layoutConfig) {
			localStorage.setItem('layoutConfig', JSON.stringify(layoutConfig));
		}
	}

	getSavedConfig(): LayoutConfigModel {
		const config = localStorage.getItem('layoutConfig');
		try {
			return JSON.parse(config);
		} catch (e) {
		}
	}

	getConfig(path?: string): LayoutConfigModel | any {
		this.layoutConfig = this.getSavedConfig();

		if (path) {
			return objectPath.get(this.layoutConfig, path);
		}

		return this.layoutConfig;
	}

	setConfig(value: any, save?: boolean): void {
		this.layoutConfig = merge(this.layoutConfig, value);

		if (save) {
			this.saveConfig(this.layoutConfig);
		}

		this.onConfigUpdated$.next(this.layoutConfig);
	}

	getLogo(): string {
		const menuAsideLeftSkin = objectPath.get(this.layoutConfig, 'brand.self.skin');
		const logoObject = objectPath.get(this.layoutConfig, 'self.logo');

		let logo;
		if (typeof logoObject === 'string') {
			logo = logoObject;
		}
		if (typeof logoObject === 'object') {
			logo = objectPath.get(logoObject, menuAsideLeftSkin + '');
		}
		if (typeof logo === 'undefined') {
			try {
				const logos = objectPath.get(this.layoutConfig, 'self.logo');
				logo = logos[Object.keys(logos)[0]];
			} catch (e) {
			}
		}
		return logo;
	}

	getStickyLogo(): string {
		let logo = objectPath.get(this.layoutConfig, 'self.logo.sticky');
		if (typeof logo === 'undefined') {
			logo = this.getLogo();
		}
		return logo + '';
	}

	loadConfigs(config: LayoutConfigModel) {
		this.layoutConfig = this.getSavedConfig();
		if (!this.layoutConfig || objectPath.get(this.layoutConfig, 'demo') !== config.demo) {
			this.layoutConfig = config;
		}
		this.saveConfig(this.layoutConfig);
	}

	reloadConfigs(): LayoutConfigModel {
		this.layoutConfig = this.getSavedConfig();
		this.onConfigUpdated$.next(this.layoutConfig);
		return this.layoutConfig;
	}
}
