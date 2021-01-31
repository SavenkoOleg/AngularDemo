import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { CoreModule } from '../../../core/core.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuHorizontalComponent } from './header/menu-horizontal/menu-horizontal.component';
import { PartialsModule } from '../../partials/partials.module';
import { BaseComponent } from './base/base.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesModule } from '../../pages/pages.module';
import { HtmlClassService } from './html-class.service';
import { ErrorPageComponent } from './content/error-page/error-page.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptHome } from '../../../core/_base/utils/intercept.home';
// import {environment} from '../../../../environments/environment';
import { StoreModule } from '@ngrx/store';
import { generalReducers } from '../../../core/general/general.reducers';
import { EffectsModule } from '@ngrx/effects';
import { GeneralEffects } from '../../../core/general/general.effects';
import { GeneralService } from '../../../core/general/general.service';
import { educationReducers } from '../../../core/education/education.reduces';
import { EducationEffects } from '../../../core/education/education.effects';
import { EducationServices } from '../../../core/education/education.services';
import { AuthModule } from '../../pages/auth/auth.module';
import { AuthService } from '../../../core/auth';
import { AdminPanelServices } from '../../../core/admin_panel/admin_panel.services';
import { adminPanelReducers } from '../../../core/admin_panel/admin_panel.reduces';
import { AdminPanelEffects } from '../../../core/admin_panel/admin_panel.effects';


@NgModule({
	declarations: [
		BaseComponent,
		FooterComponent,
		HeaderComponent,
		MenuHorizontalComponent,
		ErrorPageComponent
	],
	exports: [
		BaseComponent,
		FooterComponent,
		HeaderComponent,
		MenuHorizontalComponent,
		ErrorPageComponent
	],
	providers: [
		AuthService,
		HtmlClassService,
		GeneralService,
		AdminPanelServices,
		EducationServices,
		InterceptHome,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: InterceptHome,
			multi: true
		},
	],
	imports: [
		AuthModule.forRoot(),
		EffectsModule.forRoot([GeneralEffects, EducationEffects, AdminPanelEffects]),
		StoreModule.forFeature('general', generalReducers),
		StoreModule.forFeature('education', educationReducers),
		StoreModule.forFeature('admin', adminPanelReducers),
		CommonModule,
		RouterModule,
		PagesRoutingModule,
		PartialsModule,
		CoreModule,
		NgbModule,
		FormsModule,
		PagesModule,
		LoadingBarModule,
	]
})
export class HomeModule {
}
