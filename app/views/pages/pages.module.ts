import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from '../../core/core.module';
import { AdminPanelComponent } from './admin_panel/admin_panel.component';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	wheelPropagation: true
};
import { VideoComponent } from './video/video.component';
import { EdModuleComponent } from './module_ed/ed_module.component';
import { RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { PaymentComponent } from './payment/payment.component';
import { FaqComponent } from './faq/faq.component';
import { InstructionComponent } from './instruction/instruction.component';
import { SmoothScrollDirective, SmoothScrollToDirective } from '../../core/_base/flex';
import { GeneralComponent } from './general/general.component';
import { ArchiveComponent } from './archive/archive.component';
import { SettingComponent } from './setting/setting.component';
import { CommonResultComponent } from './common_result/common_result.component';
import { PersonaResultComponent } from './persona_result/persona_result.component';
import {ManagementVacancyComponent} from './general/managementVacancy/managementVacancy.component';
import {TestingVacancyComponent} from './general/testingVacancy/testingVacancy.component';
import {ResultVacancyComponent} from './general/resultVacancy/resultVacancy.component';

@NgModule({
	declarations: [
		SmoothScrollToDirective,
		GeneralComponent,
		ManagementVacancyComponent,
		TestingVacancyComponent,
		ResultVacancyComponent,
		SmoothScrollDirective,
		AccountComponent,
		ArchiveComponent,
		VideoComponent,
		EdModuleComponent,
		FaqComponent,
		AdminPanelComponent,
		PaymentComponent,
		InstructionComponent,
		SettingComponent,
		CommonResultComponent,
		PersonaResultComponent
	],
	exports: [

	],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		NgbModule,
		CoreModule,
		ReactiveFormsModule,
		PerfectScrollbarModule,
		RouterModule
	],
	providers: [
		{
		provide: PERFECT_SCROLLBAR_CONFIG,
		useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
	}]
})
export class PagesModule {
}

