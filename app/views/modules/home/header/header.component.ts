import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { LayoutRefService } from '../../../../core/_base/layout';
import { HtmlClassService } from '../html-class.service';
import {Logout} from '../../../../core/auth';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../core/reducers';

@Component({
	selector: 'kt-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit {
	@ViewChild('ktHeader') ktHeader: ElementRef;

	constructor(
		private router: Router,
		private layoutRefService: LayoutRefService,
		public loader: LoadingBarService,
		public htmlClassService: HtmlClassService,
		private store: Store<AppState>
	) {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationStart) { this.loader.start(); }
			if (event instanceof RouteConfigLoadStart) { this.loader.increment(35); }
			if (event instanceof RouteConfigLoadEnd) { this.loader.increment(75); }
			if (event instanceof NavigationEnd || event instanceof NavigationCancel) { this.loader.complete(); }
		});
	}

	logout() {
		this.store.dispatch(new Logout());
	}

	ngAfterViewInit(): void {
		this.layoutRefService.addElement('header', this.ktHeader.nativeElement);
	}
}
