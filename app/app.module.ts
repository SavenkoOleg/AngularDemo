import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { metaReducers, reducers } from './core/reducers';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { PartialsModule } from './views/partials/partials.module';
import { LayoutConfigService, LayoutRefService, MenuAsideService, MenuConfigService, MenuHorizontalService, PageConfigService, SplashScreenService } from './core/_base/layout';
import { LayoutConfig } from './core/_config/default/layout.config';
import {InterceptService} from "./core/_base/utils/intercept.service";

export function initializeLayoutConfig(appConfig: LayoutConfigService) {
	return () => {
		if (appConfig.getConfig() === null) {
			appConfig.loadConfigs(new LayoutConfig().configs);
		}
	};
}


@NgModule({
	declarations: [AppComponent],
	imports: [
		CoreModule,
		NgbModule,
		BrowserModule,
		OverlayModule,
		AppRoutingModule,
		HttpClientModule,
		PartialsModule,
		BrowserAnimationsModule,
		MatProgressSpinnerModule,
		TranslateModule.forRoot(),
		EffectsModule.forRoot([]),
		StoreModule.forRoot(reducers, {metaReducers}),
		StoreDevtoolsModule.instrument(),
		StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
	],
	exports: [],
	providers: [
		LayoutConfigService,
		LayoutRefService,
		MenuConfigService,
		PageConfigService,
		SplashScreenService,
		MenuHorizontalService,
		MenuAsideService,
		InterceptService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: InterceptService,
			multi: true
		},
		{
			provide: APP_INITIALIZER,
			useFactory: initializeLayoutConfig,
			deps: [LayoutConfigService],
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
