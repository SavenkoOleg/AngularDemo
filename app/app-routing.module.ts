import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{path: '', redirectTo: 'home/general', pathMatch: 'full'},
	{path: 'auth', loadChildren: 'app/views/pages/auth/auth.module#AuthModule'},
	{path: 'home', loadChildren: 'app/views/modules/home/home.module#HomeModule'},
	{path: 'test', loadChildren: 'app/views/modules/test/test.module#TestModule'},
	{path: 'error', loadChildren: 'app/views/pages/404/error.module#ErrorModule'},
	{path: '**', redirectTo: 'app/error/403', pathMatch: 'full'}
];

@NgModule({
	imports: [RouterModule.forRoot(routes,{ anchorScrolling: 'enabled' }) ],
	exports: [RouterModule]
})
export class AppRoutingModule { }
