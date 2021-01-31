import { ChangeDetectionStrategy, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as objectPath from 'object-path';
import { LayoutConfigService, MenuConfigService, MenuOptions } from '../../../../../core/_base/layout';
import { OffcanvasOptions } from '../../../../../core/_base/flex';
import { HtmlClassService } from '../../html-class.service';
import {AppState} from '../../../../../core/reducers';
import {select, Store} from '@ngrx/store';
import {currentUser, User} from '../../../../../core/auth';

@Component({
	selector: 'kt-menu-horizontal',
	templateUrl: './menu-horizontal.component.html',
	styleUrls: ['./menu-horizontal.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuHorizontalComponent implements OnInit {
	// Public properties
	currentRouteUrl: any = '';
	rootArrowEnabled: boolean;
	menuOptions: MenuOptions = {
		submenu: {
			desktop: 'dropdown',
			tablet: 'accordion',
			mobile: 'accordion'
		},
		accordion: {
			slideSpeed: 200, // accordion toggle slide speed in milliseconds
			expandAll: false // allow having multiple expanded accordions in the menu
		}
	};
	offcanvasOptions: OffcanvasOptions = {
		overlay: true,
		baseClass: 'kt-header-menu-wrapper',
		closeBy: 'kt_header_menu_mobile_close_btn',
		toggleBy: {
			target: 'kt_header_mobile_toggler',
			state: 'kt-header-mobile__toolbar-toggler--active'
		}
	};

	constructor(
		private el: ElementRef,
		public htmlClassService: HtmlClassService,
		private menuConfigService: MenuConfigService,
		private layoutConfigService: LayoutConfigService,
		private _store: Store<AppState>,
		private router: Router,
		private render: Renderer2
	) {}

	private currentUser$ = this._store.pipe(select(currentUser));

	public menuHor = [
		{
			'title': 'Главная',
			'root': true,
			'icon-': 'flaticon-paper-plane',
			'toggle': 'click',
			'link': '/home/general',
			'alignment': 'left'
		},
		// {
		// 	'title': 'Направления бизнеса',
		// 	'root': true,
		// 	'alignment': 'left',
		// 	'submenu': [
		// 		{
		// 			title: 'Общие',
		// 			// bullet: 'dot',
		// 			// icon: 'flaticon-interface-7',
		// 			submenu: [
		// 				{
		// 					title: 'Менеджер отдела продаж',
		// 					page: '/home/general/1'
		// 				},
		// 				{
		// 					title: 'Руководитель отдела продаж',
		// 					page: '/home/general/2'
		// 				}
		// 			]
		// 		},
		// 		{
		// 			title: 'Авто-бизнес',
		// 			// bullet: 'dot',
		// 			// icon: 'flaticon-web',
		// 			submenu: [
		// 				{
		// 					title: 'Мастер-консультант сервиса (МК)',
		// 					page: '/home/general/3'
		// 				},
		// 				{
		// 					title: 'Авто-механик (АМ)',
		// 					page: '/home/general/4'
		// 				},
		// 				{
		// 					title: 'Руководитель сервиса (РС)',
		// 					page: '/home/general/5'
		// 				}
		// 			]
		// 		},
		// 	]
		// },
		// {
		// 	'title': 'Продукты',
		// 	'root': true,
		// 	'alignment': 'left',
		// 	submenu: [
		// 		{
		// 			title: 'Конструктор описания вакансий',
		// 			page: '/home/general/0'
		// 		},
		// 		// {
		// 		// 	title: 'Конструктор презентации вакансий',
		// 		// 	page: '/home/general/0'
		// 		// },
		// 		{
		// 			title: 'Собеседование',
		// 			page: '/home/general/0'
		// 		},
		// 		{
		// 			title: 'Тесты',
		// 			page: '/home/general/0'
		// 		}
		// 	]
		// },
		// {
		// 	'title': 'Обучение',
		// 	'root': true,
		// 	'alignment': 'left',
		// 	submenu: [
		// 		{
		// 			title: 'Инструкции',
		// 			page: '/home/instruction',
		// 			toggle: 'click'
		// 		},
		// 		{
		// 			title: 'Видео',
		// 			page: '/home/video'
		// 		},
		// 		{
		// 			title: 'FAQ',
		// 			page: '/home/faq'
		// 		}
		// 	]
		// },
		// {
		// 	'title': 'Пополнить счет',
		// 	'root': true,
		// 	'icon-': 'flaticon-paper-plane',
		// 	'toggle': 'click',
		// 	'link': 'home/payment',
		// 	'alignment': 'left'
		// },
		{
			'title': 'Настройки аккаунта',
			'root': true,
			// 'icon-': 'flaticon-paper-plane',
			'toggle': 'click',
			'link': '/home/account',
			'alignment': 'left'
		}
	];

	private admin = {
		'title': 'Панель администратора',
		'root': true,
		'icon-': 'flaticon-paper-plane',
		'toggle': 'click',
		'link': '/home/admin_panel',
		'alignment': 'left'
	};

	ngOnInit(): void {
		this.currentUser$.subscribe((user: User) => {
			if (user && user.accept === 'admin' && !this.menuHor.includes(this.admin)) {
				this.menuHor.push(this.admin);
			}
		});
		this.rootArrowEnabled = this.layoutConfigService.getConfig('header.menu.self.root-arrow');
		this.currentRouteUrl = this.router.url;
		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(event => {
				this.currentRouteUrl = this.router.url;
			});
	}
	mouseLeave(event: MouseEvent) {
		this.render.removeClass(event.target, 'kt-menu__item--hover');
	}
	rout(link) {
		if (link !== undefined) { this.router.navigateByUrl(link); }
	}
	getItemCssClasses(item) {
		let classes = 'kt-menu__item';

		if (objectPath.get(item, 'submenu')) {
			classes += ' kt-menu__item--submenu';
		}

		if (objectPath.get(item, 'resizer')) {
			classes += ' kt-menu__item--resize';
		}

		const menuType = objectPath.get(item, 'submenu.type') || 'classic';
		if ((objectPath.get(item, 'root') && menuType === 'classic')
			|| parseInt(objectPath.get(item, 'submenu.width'), 10) > 0) {
			classes += ' kt-menu__item--rel';
		}

		const customClass = objectPath.get(item, 'custom-class');
		if (customClass) {
			classes += ' ' + customClass;
		}

		if (objectPath.get(item, 'icon-only')) {
			classes += ' kt-menu__item--icon-only';
		}

		if (this.isMenuItemIsActive(item)) {
			classes += ' kt-menu__item--active kt-menu__item--here';
		}

		if (this.currentRouteUrl === '/' + item.link) {
			classes += ' kt-menu__item--active kt-menu__item--here';
		}

		return classes;
	}
	getItemAttrSubmenuToggle(item) {
		let toggle = 'hover';
		if (objectPath.get(item, 'toggle') === 'click') {
			toggle = 'click';
		} else if (objectPath.get(item, 'submenu.type') === 'tabs') {
			toggle = 'tabs';
		} else {
			// submenu toggle default to 'hover'
		}

		return toggle;
	}
	getItemMenuSubmenuClass(item) {
		let classes = '';

		const alignment = objectPath.get(item, 'alignment') || 'right';

		if (alignment) {
			classes += ' kt-menu__submenu--' + alignment;
		}

		const type = objectPath.get(item, 'type') || 'classic';
		if (type === 'classic') {
			classes += ' kt-menu__submenu--classic';
		}
		if (type === 'tabs') {
			classes += ' kt-menu__submenu--tabs';
		}
		if (type === 'mega') {
			if (objectPath.get(item, 'width')) {
				classes += ' kt-menu__submenu--fixed';
			}
		}

		if (objectPath.get(item, 'pull')) {
			classes += ' kt-menu__submenu--pull';
		}

		return classes;
	}
	isMenuItemIsActive(item): boolean {
		if (item.submenu) {
			return this.isMenuRootItemIsActive(item);
		}

		if (!item.page) {
			return false;
		}

		return this.currentRouteUrl.indexOf(item.page) !== -1;
	}
	isMenuRootItemIsActive(item): boolean {
		if (item.submenu.items) {
			for (const subItem of item.submenu.items) {
				if (this.isMenuItemIsActive(subItem)) {
					return true;
				}
			}
		}

		if (item.submenu) {
			for (const subItem of item.submenu) {
				if (this.isMenuItemIsActive(subItem)) {
					return true;
				}
			}
		}

		return false;
	}
}
