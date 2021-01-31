// Angular
import { Injectable } from '@angular/core';
// RxJS
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LayoutRefService {

	public layoutRefs$: BehaviorSubject<any> = new BehaviorSubject<any>({});
	public layoutRefs: any = {};

	addElement(name, element) {
		const obj = {};
		obj[name] = element;

		this.layoutRefs = Object.assign({}, this.layoutRefs, obj);
		this.layoutRefs$.next(this.layoutRefs);
	}
}
