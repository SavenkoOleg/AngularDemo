import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {makeID} from '../../../../core/_base/utils/tools';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {
	IList,
	IListVacancy,
	typeSection,
} from '../../../../core/_base/flex/models/interface';
import {select, Store} from '@ngrx/store';
import {IAppState} from '../../../../core/app.state';
import {

	selectApp,
	selectCurrentFolder, selectCurrentFolderID,
	selectCurrentListVacancy,
	selectCurrentVacancy,
	selectDeleteFolderWithVacancy,
	selectListFolderVacancy,
	selectSection
} from '../../../../core/general/general.selector';
import {
	AddFolder,
	AddVacancy,
	ArchiveVacancy,
	CheckFolder,
	DeleteFolder, EditVacancy,
	GetAllData,
	OpenFolder,
	OpenSection,
	OpenVacancy,
	ResetCheckFolder,
	SearchVacancy,
} from '../../../../core/general/general.actions';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
	templateUrl: './managementVacancy.component.html',
	styleUrls: ['../general.component.scss'],
	selector: 'kt-management-vacancy'
})
export class ManagementVacancyComponent implements OnInit {

	constructor(
		private modalService: NgbModal,
		private router: Router,
		private _store: Store<IAppState>,
		public _fb: FormBuilder
	) {}

	@ViewChild('new_vacancy') new_vacancy: ElementRef;

	rout$ = this._store.pipe(select(selectApp));
	section$ = this._store.pipe(select(selectSection));
	// countDemo$ = this._store.pipe(select(selectCountDemo));
	// accountStatus$ = this._store.pipe(select(selectAccountStatus));
	currentFolder$ = this._store.pipe(select(selectCurrentFolder));
	currentVacancy$ = this._store.pipe(select(selectCurrentVacancy));
	currentFolderID$ = this._store.pipe(select(selectCurrentFolderID));
	listFolderVacancy$ = this._store.pipe(select(selectListFolderVacancy));
	currentListVacancy$ = this._store.pipe(select(selectCurrentListVacancy));
	deleteFolderWithVacancy$ = this._store.pipe(select(selectDeleteFolderWithVacancy));

	searchVacancy: FormGroup;
	newVacancyForm: FormGroup;

	maxFolder: number = 4;

	userID: string = '';
	vacancyID: string = '';
	deleteFoldID: string = '';
	deleteVacancyID: string = '';
	currentFolderID: string = '0';
	editVacancyID: string = '0';

	nameNewFolder: string = 'Новый раздел';

	newFolder: boolean = false;
	blockTable: boolean = false;
	newVacancyFlag: boolean = false;
	editVacancyFlag: boolean = false;

	listVacancy: IListVacancy[] = [];
	listTypeVacancy: IList[] = [
		{name: 'Общие/Менеджер отдела продаж', id: '1' },
		{name: 'Общие/Руководитель отдела продаж', id: '2' },
		{name: 'Авто-бизнес/Мастер-консультант сервиса (МК)', id: '3' },
		{name: 'Авто-бизнес/Авто-механик (АМ)', id: '4' },
		{name: 'Авто-бизнес/Руководитель сервиса (РС)', id: '5' }
	];

	param: string = '1';
	modal: boolean = false;

	ngOnInit(): void {
		this.currentVacancy$.subscribe(item => { if (item) {this.vacancyID = item.vacancyID; } });
		this.currentListVacancy$.subscribe( item => this.listVacancy = item );
		this.searchVacancy = this._fb.group({ input: '' });
		this.currentFolder$.subscribe(folder => this.currentFolderID = folder.folderID);
		this.searchVacancy.get('input').valueChanges.subscribe(input => this._store.dispatch(new SearchVacancy(input)) );
		this.initNewVacancyForm(this.param);
		// this.rout$.subscribe(rout => {
		// 	const url = rout.state.url;
		// 	const p = url.split('/')[3];
		// 	if (p && !this.modal) {
		// 		this.initNewVacancyForm(p);
		// 		this.modalService.open(this.new_vacancy);
		// 		this.modal = true;
		// 	}
		// });
	}

	private initNewVacancyForm(param: string): void {
		this.newVacancyForm = this._fb.group({
			name: 'Новая вакансия',
			space: '',
			amount: '',
			product: '',
			duties: '',
			type: param
		});
	}

	openNewVacancy(content: TemplateRef<any>): void {
		this.initNewVacancyForm(this.param);
		this.modalService.open(content);
		this._store.dispatch(new GetAllData());
	}
	selectVacancy(vacancyID: string): void {
		this._store.dispatch(new OpenVacancy(vacancyID));
		// this.currentStepRecruit = 'interview';
		// this.currentTypeTest = 'result';
	}

	saveVacancy(): void {
		let controls = this.newVacancyForm.controls;
		let type = this.listTypeVacancy.find(item => item.id === controls['type'].value);

		let vacancy: IListVacancy = {
			name: controls['name'].value,
			space: controls['space'].value,
			amount: controls['amount'].value,
			product: controls['product'].value,
			duties: controls['duties'].value,
			folderID: this.currentFolderID,
			section:  'unparsed',
			vacancyID: this.editVacancyFlag ? this.editVacancyID : makeID(5),
			type
		};
		if (this.editVacancyFlag) {
			this.editVacancyFlag = false;
			this._store.dispatch(new EditVacancy(vacancy));
		} else {
			this.newVacancyFlag = false;
			this._store.dispatch(new AddVacancy(vacancy));
		}
		this.updateCurrentListVacancy(this.currentFolderID); // ?
		this.dis();
	}

	editVacancy(vacancyID: string, content): void {
		const vacancy = this.listVacancy.filter(item => item.vacancyID === vacancyID)[0];
		this.newVacancyForm = this._fb.group({
			name: vacancy.name,
			space: vacancy.space,
			amount: vacancy.amount,
			product: vacancy.product,
			duties: vacancy.duties,
			type: vacancy.type.id
		});
		this.editVacancyID = vacancyID;
		this.editVacancyFlag = true;
		this.modalService.open(content);
	}

	deleteVacancy(): void {
		if (this.deleteVacancyID !== '') {
			this._store.dispatch(new ArchiveVacancy(this.deleteVacancyID));
			this.updateCurrentListVacancy(this.currentFolderID);
			this.dis();
		}
	}
	deleteVacancyAccept(content, vacancyID: string): void {
		this.deleteVacancyID = vacancyID;
		this.modalService.open(content);
	}
	updateCurrentListVacancy(foldID: string): void {
		this._store.dispatch(new OpenFolder(foldID));
	}
	openSection(section: typeSection): void {
		this._store.dispatch(new OpenSection(section));
	}
	deleteFoldAccept(content, foldID: string): void {
		this.deleteFoldID = foldID;
		this._store.dispatch(new CheckFolder(foldID));
		this.modalService.open(content);
	}
	createFolder(): void {
		this._store.dispatch(new AddFolder({name: this.nameNewFolder, folderID: makeID(5), all: 0, unparsed: 0}));
		this.newFolder = false;
		this.nameNewFolder = 'Новый раздел';
	}
	deleteFold(): void {
		if (this.deleteFoldID !== '') {
			this._store.dispatch(new DeleteFolder(this.deleteFoldID));
			this.deleteFoldID = '';
			this.dis();
		}
	}

	routSetting(vacancyID: string) {
		this.router.navigateByUrl('/home/setting');
	}
	statisticOpen(content: string): void {
		this.modalService.open(content);
	}
	openStatistic(content, vacancyID: string): void {
		this.vacancyID = vacancyID;
		this.modalService.open(content);
	}

	private dis(): void {
		this._store.dispatch(new ResetCheckFolder());
		this.modal = false;
		this.modalService.dismissAll();
	}
}
