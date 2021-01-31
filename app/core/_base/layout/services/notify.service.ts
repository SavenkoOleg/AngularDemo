import { Injectable } from '@angular/core';
// import * as jQuery from 'jquery';
import 'bootstrap-notify';
// let $: any = jQuery;

@Injectable()
export class NotifyService {
	constructor() { }
	//
	// Notify(message: string, type: string) {
	// 	$.notify(
	// 		{
	// 			title: 'Уведомление',
	// 			message,
	// 			icon: null,
	// 			url: null,
	// 			target: null
	// 		},
	// 		{
	// 			type,
	// 			allow_dismiss: true,
	// 			newest_on_top: false,
	// 			mouse_over:  true,
	// 			showProgressbar: false,
	// 			spacing: 10,
	// 			timer: 2000,
	// 			placement: {
	// 				from: 'bottom',
	// 				align: 'right'
	// 			},
	// 			offset: {
	// 				x: 30,
	// 				y: 30
	// 			},
	// 			delay: 1000,
	// 			z_index: 20000,
	// 			animate: {
	// 				enter: 'animated ' + 'bounce',
	// 				exit: 'animated ' + 'bounce'
	// 			}
	// 		});
	// }
}
