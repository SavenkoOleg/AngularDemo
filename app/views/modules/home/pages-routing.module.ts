import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { ErrorPageComponent } from './content/error-page/error-page.component';
import { AuthGuard } from '../../../core/auth';
import { VideoComponent } from '../../pages/video/video.component';
import { AccountComponent } from '../../pages/account/account.component';
import { PaymentComponent } from '../../pages/payment/payment.component';
import { FaqComponent } from '../../pages/faq/faq.component';
import { InstructionComponent } from '../../pages/instruction/instruction.component';
import { GeneralComponent } from '../../pages/general/general.component';
import { ArchiveComponent } from '../../pages/archive/archive.component';
import { SettingComponent } from '../../pages/setting/setting.component';
import { CommonResultComponent } from '../../pages/common_result/common_result.component';
import { AdminPanelComponent } from '../../pages/admin_panel/admin_panel.component';
import { CommonModule } from '@angular/common';
import { PersonaResultComponent } from '../../pages/persona_result/persona_result.component';

const routes: Routes = [
	{
		path: '',
		component: BaseComponent,
		canActivate: [AuthGuard],
		children: [
			{ path: '', redirectTo: 'general', pathMatch: 'full' },
			{ path: 'general/:id', component: GeneralComponent },
			{ path: 'general', component: GeneralComponent },
			{ path: 'archive', component: ArchiveComponent },
			{ path: 'account', component: AccountComponent },
			{ path: 'payment', component: PaymentComponent },
			{ path: 'video', component: VideoComponent },
			{ path: 'faq', component: FaqComponent },
			{ path: 'instruction', component: InstructionComponent },
			{ path: 'setting', component: SettingComponent },
			{ path: 'common_result', component: CommonResultComponent },
			{ path: 'persona_result', component: PersonaResultComponent },
			{ path: 'admin_panel', component: AdminPanelComponent },
			{ path: 'error/403', component: ErrorPageComponent,
				data: {
					'type': 'error-v6',
					'code': 403,
					'title': '403... Access forbidden',
					'desc': 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator'
				}
			}
		]
	},
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagesRoutingModule {
}
