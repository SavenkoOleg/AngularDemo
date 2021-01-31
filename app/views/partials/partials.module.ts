import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CoreModule } from '../../core/core.module';
import { SplashScreenComponent } from './layout';
import { ErrorComponent } from './content/general/error/error.component';


@NgModule({
	declarations: [
		SplashScreenComponent,
		ErrorComponent
	],
	exports: [
		SplashScreenComponent,
		ErrorComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		NgbModule,
		PerfectScrollbarModule,
		CoreModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
	]
})
export class PartialsModule {
}
