import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {makeID} from '../../../../core/_base/utils/tools';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {
	IList,
	IListTesting,
	stepRecriut,
	typeSection,
	typeTest
} from '../../../../core/_base/flex/models/interface';
import {select, Store} from '@ngrx/store';
import {IAppState} from '../../../../core/app.state';
import {
	selectAccountStatus,
	selectApp,
	selectCountDemo,
	selectCurrentFolder,
	selectCurrentFolderID,
	selectCurrentListTestings,
	selectCurrentListVacancy,
	selectCurrentVacancy,
	selectDeleteFolderWithVacancy,
	selectInterviewBalance, selectListContacts,
	selectListFolderVacancy,
	selectListTests,
	selectSection,
	selectTestBalance
} from '../../../../core/general/general.selector';
import {
	AddFolder,
	DeleteSomeResultTest,
	GetAllData,
	OpenSection,
	ResetCheckFolder, SearchTesting,
	SearchVacancy,
	SendTest, SetCurrentTestResult
} from '../../../../core/general/general.actions';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {currentUser, User} from '../../../../core/auth';
import {environment} from '../../../../../environments/environment';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {PerfectScrollbar} from '../../../../core/_config/default/config.common';


@Component({
	templateUrl: './resultVacancy.component.html',
	styleUrls: ['../general.component.scss'],
	selector: 'kt-result-vacancy'
})
export class ResultVacancyComponent implements OnInit {

	constructor(
		private modalService: NgbModal,
		private router: Router,
		private _store: Store<IAppState>,
		public _fb: FormBuilder
	){}

	@ViewChild('new_vacancy') new_vacancy: ElementRef;

	public config: PerfectScrollbarConfigInterface = PerfectScrollbar;

	rout$ = this._store.pipe(select(selectApp));
	user$ = this._store.pipe(select(currentUser));
	section$ = this._store.pipe(select(selectSection));
	listTests$ = this._store.pipe(select(selectListTests));
	countDemo$ = this._store.pipe(select(selectCountDemo));
	testBalance$ = this._store.pipe(select(selectTestBalance));
	listContacts$ = this._store.pipe(select(selectListContacts));
	accountStatus$ = this._store.pipe(select(selectAccountStatus));
	currentFolder$ = this._store.pipe(select(selectCurrentFolder));
	currentVacancy$ = this._store.pipe(select(selectCurrentVacancy));
	currentFolderID$ = this._store.pipe(select(selectCurrentFolderID));
	interviewBalance$ = this._store.pipe(select(selectInterviewBalance));
	listFolderVacancy$ = this._store.pipe(select(selectListFolderVacancy));
	currentListVacancy$ = this._store.pipe(select(selectCurrentListVacancy));
	currentListTesting$ = this._store.pipe(select(selectCurrentListTestings));
	deleteFolderWithVacancy$ = this._store.pipe(select(selectDeleteFolderWithVacancy));

	searchVacancy: FormGroup;
	searchTesting: FormGroup;
	newVacancyForm: FormGroup;
	sendTestForm: FormGroup;

	maxFolder: number = 4;

	deleteFoldID: string = '';
	vacancyID: string = '';
	userID: string = '';
	deleteVacancyID: string = '';
	currentFolderID: string = '0';
	deleteTestingID: string = '';

	nameNewFolder: string = 'Новый раздел';

	currentStepRecruit: stepRecriut = 'test';
	currentTypeTest: typeTest = 'intel';
	currentListTesting: IListTesting[] = [];

	linkNotifi: boolean = false;
	link: string = 'http://';

	newFolder: boolean = false;
	blockTable: boolean = false;
	newVacancyFlag: boolean = false;

	listTestingDelete: string[] = [];
	listTestDelIsEmpty: boolean = true;

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
		this.currentListTesting$.subscribe(item => this.currentListTesting = item);
		this.currentVacancy$.subscribe(item => { if (item) {this.vacancyID = item.vacancyID; } });
		this.searchVacancy = this._fb.group({ input: '' });
		this.searchTesting = this._fb.group({ input: '' });
		this.currentFolderID$.subscribe(id => this.currentFolderID = id);
		this.searchVacancy.get('input').valueChanges.subscribe(input => this._store.dispatch(new SearchVacancy(input)) );
		this.searchTesting.get('input').valueChanges.subscribe(input => this._store.dispatch(new SearchTesting(input)) );
		// this.initNewVacancyForm(this.param);
		this.rout$.subscribe(rout => {
			let url = rout.state.url;
			let p = url.split('/')[3];
			if (p && !this.modal) {
				// this.initNewVacancyForm(p);
				this.modalService.open(this.new_vacancy);
				this.modal = true;
			}
		});
		this.sendTestForm = this._fb.group({ email: ['' , Validators.email] });
		this.user$.subscribe((user: User) => { if (user) { this.userID = user.userID; } });
	}

	openSection(section: typeSection): void {
		this._store.dispatch(new OpenSection(section));
	}

	sendTest(): void {
		const testingID = makeID(10);
		this._store.dispatch( new SendTest(
			{
				email: this.sendTestForm.controls['email'].value,
				typeTest: this.currentTypeTest,
				vacancyID: this.vacancyID,
				userID: this.userID,
				testingID
			})
		);
		this.sendTestForm = this._fb.group({ email: ['' , Validators.email] });
		this.linkNotifi = true;
		this.link = `${environment.url}test/${this.currentTypeTest}/${this.userID}_${testingID}`;
		this._store.dispatch(new GetAllData());
	}

	update(): void {
		this._store.dispatch(new GetAllData());
	}
	routSetting(vacancyID: string) {
		this.router.navigateByUrl('/home/setting');
	}
	private dis(): void {
		this._store.dispatch(new ResetCheckFolder());
		this.modal = false;
		this.modalService.dismissAll();
	}
	changeAll(): void {
		this.listTestingDelete = [];
		if (this.listTestingDelete.length < this.currentListTesting.length) {
			this.currentListTesting.forEach(item => {
				this.listTestingDelete.push(item.testingID);
			});
		}
	}
	change(testingID): void {
		let index = this.listTestingDelete.indexOf(testingID);

		if (index === -1) { this.listTestingDelete.push(testingID);
		} else { this.listTestingDelete.splice(index, 1); }

		if (this.listTestingDelete.length) { this.listTestDelIsEmpty = false;
		} else { this.listTestDelIsEmpty = true; }
	}
	createFolder(): void {
		this._store.dispatch(new AddFolder({name: this.nameNewFolder, folderID: makeID(5), all: 0, unparsed: 0}));
		this.newFolder = false;
		this.nameNewFolder = 'Новый раздел';
	}
	deleteSomeResultTests(): void {
		if (this.listTestingDelete.length) {
			this._store.dispatch(new DeleteSomeResultTest(this.listTestingDelete));
		}
		this.listTestingDelete = [];
		this.listTestDelIsEmpty = true;
	}
	deleteResultTest(): void {
		if (this.deleteTestingID !== '') {
			this._store.dispatch(new DeleteSomeResultTest([this.deleteTestingID]));
			this.dis();
		}
	}
	deleteResultTestAccept(content, testingID: string): void {
		this.deleteTestingID = testingID;
		this.modalService.open(content);
	}
	routTestResult(link: string, testingID: string) {
		this._store.dispatch(new SetCurrentTestResult(testingID));
		this.router.navigateByUrl(link);
	}
	payTests(content: TemplateRef<any>): void {
		this.modalService.open(content);
	}

}
