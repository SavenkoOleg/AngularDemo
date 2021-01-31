export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			'items': [
				{
					'title': 'Проекты',
					'root': true,
					'icon-': 'flaticon-paper-plane',
					'toggle': 'click',
					'custom-class': 'kt-menu__item--active',
					'link': '/home',
					'alignment': 'left'
				},
			],
			'project': [
				{
					'title': 'Главная',
					'root': true,
					'icon-': 'flaticon-paper-plane',
					'toggle': 'click',
					'link': '/home/general',
					'alignment': 'left'
				},
				{
					'title': 'Направления бизнеса',
					'root': true,
					'alignment': 'left',
					'submenu': [
						{
							title: 'Общие',
							bullet: 'dot',
							icon: 'flaticon-interface-7',
							submenu: [
								{
									title: 'Менеджер отдела продаж',
									page: '/home'
								},
								{
									title: 'Руководитель отдела продаж',
									page: '/home'
								}
							]
						},
						{
							title: 'Авто-бизнес',
							bullet: 'dot',
							icon: 'flaticon-web',
							submenu: [
								{
									title: 'Мастер-консультант сервиса (МК)',
									page: '/home'
								},
								{
									title: 'Авто-механик (АМ)',
									page: '/home'
								},
								{
									title: 'Руководитель сервиса (РС)',
									page: '/home'
								}
							]
						},
					]
				},
				{
					'title': 'Продукты',
					'root': true,
					'alignment': 'left',
					submenu: [
						{
							title: 'Конструктор описания вакансий',
							page: '/home'
						},
						{
							title: 'Конструктор презентации вакансий',
							page: '/home'
						},
						{
							title: 'Собеседование',
							page: '/home/'
						},
						{
							title: 'Тесты',
							page: '/home/'
						}
					]
				},
				{
					'title': 'Обучение',
					'root': true,
					'alignment': 'left',
					 submenu: [
					 	{
							 title: 'Инструкции',
							 page: '/home/instruction',
							 toggle: 'click'
						},
						{
							title: 'Видео',
							page: '/home/video'
						},
						 {
							 title: 'FAQ',
							 page: '/home/faq'
						 }
					]
				},
				{
					'title': 'Пополнить счет',
					'root': true,
					'icon-': 'flaticon-paper-plane',
					'toggle': 'click',
					'link': 'home/payment',
					'alignment': 'left'
				},
				// {
				// 	'title': 'Настройки',
				// 	'root': true,
				// 	'alignment': 'left',
				// 	submenu: [
				// 		{
				// 			title: 'Настройки аккаунта',
				// 			page: '/home/account'
				// 		},
				// 		// {
				// 		// 	title: 'Дочерние аккаунты',
				// 		// 	page: '/home'
				// 		// },
				// 		// {
				// 		// 	title: 'Анкеты',
				// 		// 	page: '/home'
				// 		// }
				// 	]
				// },
				{
					'title': 'Настройки аккаунта',
					'root': true,
					'icon-': 'flaticon-paper-plane',
					'toggle': 'click',
					'link': '/home/account',
					'alignment': 'left'
				},
				{
					'title': 'Панель администратора',
					'root': true,
					'icon-': 'flaticon-paper-plane',
					'toggle': 'click',
					'link': '/home',
					'alignment': 'left'
				}
			]
		},
		aside: {
			self: {},
			items: [
				{
					title: 'Аналитика',
					root: true,
					icon: 'flaticon-diagram',
					page: 'admin_panel',
					translate: 'MENU.DASHBOARD',
					bullet: 'dot',
				},
				{
					title: 'Конструктор',
					root: true,
					icon: 'flaticon-app',
					page: 'builder',
					translate: 'MENU.DASHBOARD',
					bullet: 'dot',
				},
				// {
				// 	title: 'Туннели',
				// 	root: true,
				// 	icon: 'flaticon-background',
				// 	page: 'flow_builder',
				// 	translate: 'MENU.DASHBOARD',
				// 	bullet: 'dot',
				// },
				{
					title: 'Рассылки',
					root: true,
					icon: 'flaticon-paper-plane',
					page: 'distributions',
					translate: 'MENU.DASHBOARD',
					bullet: 'dot',
				},
				{
					title: 'Сбор данных',
					root: true,
					icon: 'flaticon-profile',
					page: 'data',
					translate: 'MENU.DASHBOARD',
					bullet: 'dot',
				},
				{
					title: 'Подписчики',
					root: true,
					icon: 'flaticon-users',
					page: 'subscribers',
					translate: 'MENU.DASHBOARD',
					bullet: 'dot',
				},
				// {
				// 	title: 'Сегментация',
				// 	root: true,
				// 	icon: 'flaticon-pie-chart',
				// 	page: 'segmentation',
				// 	translate: 'MENU.DASHBOARD',
				// 	bullet: 'dot',
				// },
				//  {
				// 	title: 'Чат с подписчиками',
				// 	root: true,
				// 	icon: 'flaticon-comment',
				// 	page: 'chat',
				// 	translate: 'MENU.DASHBOARD',
				// 	bullet: 'dot',
				// },
				// {
				// 	title: 'CRM',
				// 	root: true,
				// 	icon: 'flaticon-network',
				// 	page: 'admin_panel',
				// 	translate: 'MENU.DASHBOARD',
				// 	bullet: 'dot',
				// }
			]
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
