import {FormGroup} from '@angular/forms';

export function makeID(n: number): string {
	let text: string = '';
	const possible: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < n; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)); }
	return text;
}

export function copyState<T>(state): T {
	const _state: T = JSON.parse(JSON.stringify(state));
	return _state;
}

export function getReactiveFormData<T>(form: FormGroup): T {
	const controls = form.controls;
	let data: T = {} as T;
	Object.keys(controls).forEach(prop => { data[prop] = +controls[prop].value ? +controls[prop].value : controls[prop].value; });
	return data;
}
