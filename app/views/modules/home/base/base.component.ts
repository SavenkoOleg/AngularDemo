import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import * as objectPath from 'object-path';
import { LayoutConfigService, MenuConfigService } from '../../../../core/_base/layout';
import { HtmlClassService } from '../html-class.service';
import { LayoutConfig } from '../../../../core/_config/default/layout.config';
import { MenuConfig } from '../../../../core/_config/default/menu.config';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
import { IAppState } from '../../../../core/app.state';
import { ActiveAccount, currentUser } from '../../../../core/auth/auth.selectors';
import { VerifySuccess } from '../../../../core/auth/auth.actions';
import { GetAllData } from '../../../../core/general/general.actions';

@Component({
	selector: 'kt-base',
	templateUrl: './base.component.html',
	styleUrls: ['./base.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class BaseComponent implements OnInit, OnDestroy {
	selfLayout: string;
	asideDisplay: boolean;
	subheaderDisplay: boolean;
	currentUser;
	activeStatus: boolean = false;
	currentUser$ = this._store.pipe(select(currentUser));
	activeAccount$ = this._store.pipe(select(ActiveAccount));
	private unsubscribe: Subscription[] = [];

	constructor(
		private layoutConfigService: LayoutConfigService,
		private menuConfigService: MenuConfigService,
		private htmlClassService: HtmlClassService,
		private store: Store<AppState>,
		private _store: Store<IAppState>,
	) {
		this.layoutConfigService.loadConfigs(new LayoutConfig().configs);
		this.menuConfigService.loadConfigs(new MenuConfig().configs);
		this.htmlClassService.setConfig(this.layoutConfigService.getConfig());
		const layoutSubdscription = this.layoutConfigService.onConfigUpdated$.subscribe(layoutConfig => {
			document.body.className = '';
			this.htmlClassService.setConfig(layoutConfig);
		});
		this.unsubscribe.push(layoutSubdscription);
	}

	ngOnInit(): void {
		this._store.dispatch(new GetAllData());
		this.activeAccount$.subscribe(active => this.activeStatus = active);
		this.currentUser$.subscribe(user => this.currentUser = user);
		const config = this.layoutConfigService.getConfig();
		this.selfLayout = objectPath.get(config, 'self.layout');
		this.asideDisplay = objectPath.get(config, 'aside.self.display');
		this.subheaderDisplay = objectPath.get(config, 'subheader.display');

		const layoutConfigSubscription = this.layoutConfigService.onConfigUpdated$.subscribe(cfg => {
			setTimeout(() => {
				this.selfLayout = objectPath.get(cfg, 'self.layout');
			});
		});
		this.unsubscribe.push(layoutConfigSubscription);
	}

	ngOnDestroy(): void {
		this.unsubscribe.forEach(sb => sb.unsubscribe());
	}

}

