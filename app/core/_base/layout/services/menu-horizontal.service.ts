// Angular
import { Injectable } from '@angular/core';
// RxJS
import { BehaviorSubject } from 'rxjs';
// Object-Path
import * as objectPath from 'object-path';
// Service
import { MenuConfigService } from './menu-config.service';

@Injectable()
export class MenuHorizontalService {
	// Public properties
	menuList$: BehaviorSubject<any> = new BehaviorSubject({});
	menuListProject$: BehaviorSubject<any> = new BehaviorSubject({});
	constructor(private menuConfigService: MenuConfigService) {
		this.loadMenu();
	}

	loadMenu() {
		const menuItems = objectPath.get(this.menuConfigService.getMenus(), 'header.items');
		const menuItemsProject = objectPath.get(this.menuConfigService.getMenus(), 'header.project');
		this.menuListProject$.next(menuItemsProject);
		this.menuList$.next(menuItems);
	}
}
