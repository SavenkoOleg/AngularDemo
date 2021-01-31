import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LayoutConfigService, SplashScreenService } from './core/_base/layout';
import { TranslationService } from './core/_base/flex';
import { locale as ruLang } from './core/_config/i18n/ru';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'body[kt-root]',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {

	title = 'HR result';
	loader: boolean;
	private unsubscribe: Subscription[] = [];

	constructor(private translationService: TranslationService,
	            private router: Router,
	            private layoutConfigService: LayoutConfigService,
	            private splashScreenService: SplashScreenService) {

		this.translationService.loadTranslations(ruLang);
	}

	ngOnInit(): void {
		this.loader = this.layoutConfigService.getConfig('loader.enabled');

		const routerSubscription = this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.splashScreenService.hide();
				window.scrollTo(0, 0);
			}
		});
		this.unsubscribe.push(routerSubscription);
	}

	ngOnDestroy() {
		this.unsubscribe.forEach(sb => sb.unsubscribe());
	}
}
