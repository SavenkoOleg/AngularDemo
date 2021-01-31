import { Component, OnInit, TemplateRef } from '@angular/core';
import { makeID } from '../../../../core/_base/utils/tools';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
	IAssessmentPosition,
	ICase, IFormCandidateInfo, IFormCaseInfo, IFormGeneralBlockInfo, IFormInterviewInfo,
	IFormVacancyInfo, IFromQualificationInfo, IInterview,
	IList,
	IListContact, IListVacancy,
	typeTest
} from '../../../../core/_base/flex/models/interface';
import { select, Store } from '@ngrx/store';
import { IAppState} from '../../../../core/app.state';
import { selectContact, selectCurrentVacancy, selectInterviewBalance, selectListContacts, selectListTests, selectTestBalance } from '../../../../core/general/general.selector';
import { GetAllData, ResetCheckFolder, SendTest } from '../../../../core/general/general.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { currentUser, User } from '../../../../core/auth';
import { environment } from '../../../../../environments/environment';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {PerfectScrollbar} from '../../../../core/_config/default/config.common';
import {getReactiveFormData} from '../../../../core/_base/utils/tools';

@Component({
	templateUrl: './testingVacancy.component.html',
	styleUrls: ['../general.component.scss'],
	selector: 'kt-testing-vacancy'
})
export class TestingVacancyComponent implements OnInit {

	constructor(
		private modalService: NgbModal,
		private _store: Store<IAppState>,
		public _fb: FormBuilder
	) {}

	user$ = this._store.pipe(select(currentUser));
	listTests$ = this._store.pipe(select(selectListTests));
	listContacts$ = this._store.pipe(select(selectListContacts));
	testBalance$ = this._store.pipe(select(selectTestBalance));
	currentVacancy$ = this._store.pipe(select(selectCurrentVacancy));
	currentContact$ = this._store.pipe(select(selectContact));
	interviewBalance$ = this._store.pipe(select(selectInterviewBalance));
	public config: PerfectScrollbarConfigInterface = PerfectScrollbar;
	searchContact: FormGroup;
	VacancyInfo: FormGroup;
	CandidateInfo: FormGroup;
	InterviewInfo: FormGroup;
	CaseInfo: FormGroup;
	QualificationInfo: FormGroup;
	GeneralBlockInfo: FormGroup;

	link: string = '';
	userID: string = '';
	vacancyID: string = '';

	currentTypeTest: typeTest = 'intel';
	listContacts: IListContact[] = [];
	currentContact: IListContact = {} as IListContact;
	currentVacancy: IListVacancy = {} as IListVacancy;
	modal: boolean = false;
	linkNotifi: boolean = false;
	windowInterview: boolean = false;
	saveStatusInterview: boolean = false;

	forms: { f: number }[] = [{f: 1}, {f: 2}, {f: 3}, {f: 4}, {f: 5}, {f: 6}, {f: 7}];
	input: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	assessmentPosition: IAssessmentPosition[] = [
		{ id: 1, criterion: 'Приветствие', left: 'пропустил', right: 'отлично' },
		{ id: 2, criterion: 'Потребность', left: 'не выявил', right: 'более 3-х' },
		{ id: 3, criterion: 'Презентация', left: 'без ценностей', right: 'не менее 3-х' },
		{ id: 4, criterion: 'Возражения', left: 'не отработал', right: 'отработал' },
		{ id: 5, criterion: 'Креативность', left: 'без креатива', right: 'оригинально' },
		{ id: 6, criterion: 'Закрытие сделки', left: 'не закрыл', right: 'закрыл' },
		{ id: 7, criterion: 'Контроль над ситуацией', left: 'растерялся', right: 'не растерялся' },
		{ id: 8, criterion: 'Нестандартное решение', left: 'не дал', right: 'более 2-х' },
		{ id: 9, criterion: 'Возражения', left: 'не обошел', right: 'обошел' },
		{ id: 10, criterion: 'Угроза срыва', left: 'срыв есть', right: 'срыва нет' },
		{ id: 11, criterion: 'Итог ситуации', left: 'отрицательный', right: 'положительный' },
		{ id: 12, criterion: 'Правильный ход решения', left: 'не дает', right: 'дает' },
		{ id: 13, criterion: 'Дает решение', left: 'не верное', right: 'верное' },
	];
	currentAssessmentPosition: IAssessmentPosition[] = null;

	statusList: IList[] = [
		{name: 'Отправлен на тест', id: '1'},
		{name: 'В резерв', id: '2'},
		{name: 'Подумать', id: '3'},
		{name: 'Положительное', id: '4'},
		{name: 'Отказ', id: '5'},
	];
	casesList: ICase[] = [
		{
			name: 'Итальянское пальто',
			id: 0,
			type: 'Продажи',
			caseTypeID: 0,
			situation: 'Представим, что ВЫ продавец-консультант в бутике элитных мужских пальто. Утром директор бутика дал мотивацию - тому кто продаст ИТАЛЬЯНСКОЕ пальто с витрины за 50 000 рублей, дает путевку на двоих в Турцию на неделю. В салон заходит дорого одетый мужчина и присмотрел отечественное пальто за 15000 рублей.',
			task: 'Продать нужное пальто.',
			result: ['Был на днях в Италии и у меня сложилось настолько негативное впечатление о данной стране, что зарекся ничего больше итальянского не покупать.', 'Тут дело принципа, Страна тут не при чем.', 'У меня всего 5 минут, я спешу.', 'Не хочу отвечать, что там случилось.', 'Пойду-ка я в другой магазин, где не впаривают все подряд.', 'Я подумаю', 'Дорого'],
			assessment: [1, 2, 3, 4, 5, 6]
		},
		{
			name: 'Участок в антактиде',
			id: 1,
			type: 'Продажи',
			caseTypeID: 0,
			situation: 'У Вас есть участок в АНТАРКТИДЕ 160 гектар. Так же есть мои контактные данные. Имя и номер телефона. Вводные данные по участку - Просто участок, нет ни нефти, ни чего интересного для бизнеса.Вводные данные по мне - Три года назад брал участок, не известно для чего. Прошлая сделка закрыта была со входящего за 1 день. Деньги значит есть.',
			task: 'Продать по телефону за 1 разговор участок в Антарктиде 160 Га.',
			result: ['Зачем он мне', 'Сейчас нет денег', 'Издеваетесь', 'Это лохотрон', 'Высылайте на почту', 'Я подумаю', 'Дорого', 'Мне некогда', 'Это не интересно'],
			assessment: [1, 2, 3, 4, 5, 6]
		},
		{
			name: 'Любой предмет под рукой',
			id: 2,
			type: 'Продажи',
			caseTypeID: 0,
			situation: 'Необходимо продать мне все что угодно, сто находится в этом офисе, выбор большой',
			task: 'Продать за один разговор, получить от меня согласие на оплату',
			result: ['Зачем он мне', 'Сейчас нет денег', 'Издеваетесь', 'Это лохотрон', 'Высылайте на почту', 'Я подумаю', 'Дорого', 'Мне некогда', 'Это не интересно'],
			assessment: [1, 2, 3, 4, 5, 6]
		},
		{
			name: 'Скидка на покупку',
			id: 3,
			type: 'Продажи',
			caseTypeID: 0,
			situation: 'Вы продавец консультант бытовой техники в известном сетевом магазине. Клиент с супругой присмотрел себе паровую станцию за 10 000 рублей. Подходит и задает Вам вопрос, не сможете ли Вы сделать скидку в 25%?',
			task: 'Продать клиенту паровую станцию по нормальным условиям для магазина.',
			result: ['Тогда я куплю в другом магазине', 'Я подумаю','У меня принцип, я всегда покупаю со скидкой, не вижу смысла переплачивать','А в интернете дешевле','Дорого','Надо посоветоваться с женой','Да или нет, мне некогда','Надо посоветоваться с женой', 'За доставку/гарантию еще платить? Вы с ума сошли?', 'Я подумаю', 'Мне некогда'],
			assessment: [1, 2, 3, 4, 5, 6]
		},
		{
			name: 'Бармен без алкоголя',
			id: 4,
			type: 'Креативность',
			caseTypeID: 1,
			situation: 'Представим, что Вы бармен с пятилетним стажем работы в крутом ресторане. Сейчас понедельник 10-00. За выходные был большой праздник и на нем все под чистую смели. Не осталось ни чего. Нет всех алкогольных и безалкогольных напитков, нет ни какой еды. СОВСЕМ ни чего не осталось. Есть ТОЛЬКО безалкогольное пиво и вода из под крана. В бар заходит посетитель. Вы видите его впервые, по всем признакам - похмельный синдром. Он подходит к барной стойке и заказывает 100 грамм виски.',
			task: 'Ваши действия?',
			result: ['Не хочу экспериментировать','Я и сам бы смог купить в соседнем магазине.','У меня всего 10 минут','Кроме виски ничего не нужно','У меня и так опыт более 20 лет, не надо меня лечить'],
			assessment: [7, 8, 9, 10, 11]
		},
		{
			name: 'Участок в антарктиде',
			id: 5,
			type: 'Креативность',
			caseTypeID: 1,
			situation: 'У Вас есть участок в АНТАРКТИДЕ 160 гектар. Так же есть мои контактные данные. Имя и номер телефона. Вводные данные по участку - Просто участок, нет ни нефти, ни чего интересного для бизнеса. Вводные данные по мне - Три года назад брал участок, неизвестно для чего. Прошлая сделка закрыта была со входящего за 1 день. Деньги значит есть.',
			task: 'Продать по телефону за 1 разговор участок в Антарктиде 160 Га.',
			result: ['Зачем он мне', 'Сейчас нет денег', 'Издеваетесь', 'Это лохотрон', 'Высылайте на почту','Я подумаю', 'Дорого', 'Мне некогда', 'Это не интересно'],
			assessment: [7, 8, 9, 10, 11]
		},
		{
			name: 'Директор в лифте',
			id: 6,
			type: 'Креативность',
			caseTypeID: 1,
			situation: 'Вы пытаетесь устроиться в компанию своей мечты на протяжении года. Уже проходили 6 раз собеседование в эту компанию и каждый раз сдавали 100 тестов и девочки в HR - отеле всегда говорили, что позвонят, как примут решение. Как вдруг Вы зашли в один лифт с создателем данной компании. Вы его, конечно, знаете. Видели не раз, он очень известный в бизнес кругах. Вот он шанс один на миллиард устроиться на работу. Лифт едет всего 1 минуту.',
			task: 'Устроиться на работу.',
			result: ['У меня нет времени','Ни чем не могу Вам помочь','Обращайтесь в наш отдел кадров','Я сам написал эти тесты','Эти вопросы решает отдел кадров','Пишите на почту через сайт','Я уже приехал, удачи'],
			assessment: [7, 8, 9, 10, 11]
		},
		{
			name: 'Любой предмет под рукой',
			id: 7,
			type: 'Креативность',
			caseTypeID: 1,
			situation: 'Необходимо продать мне все что угодно, сто находится в этом офисе, выбор большой.',
			task: 'Продать за один разговор, получить от меня согласие на оплату',
			result: ['Зачем он мне', 'Сейчас нет денег', 'Издеваетесь', 'Это лохотрон', 'Высылайте на почту', 'Я подумаю', 'Дорого', 'Мне некогда', 'Это не интересно' ],
			assessment: [7, 8, 9, 10, 11]
		},
		{
			name: 'Потеря документов',
			id: 8,
			type: 'Ответственность',
			caseTypeID: 2,
			situation: 'Вы проживаете и работаете в Пятигорске. По телефону заключили крупную сделку на 300 млн. Договорились о встрече с клиентом в офисе в Москве в 9-00 в нужную дату, чтобы подписать все документы и согласовать смету. Прибываете поездом в Москву в 6-00 и обнаруживаете, что документы, деньги, ноутбук, телефон, все вещи, все украдено. Вы в тапочках на вокзале. До встречи 3 часа',
			task: 'Ваши действия?',
			result: ['Телефона нет', 'Контакты клиента и адрес в ноутбуке, а его тоже нет', 'Денег на такси нет', 'Денег на звонок нет', 'Документов нет',
			'Печати и подписи на них нет', 'Охрана без документов не пускает', 'На Вас не презентабельна одежда и внешний вид - сутки в поезде' ],
			assessment: [7, 8, 9, 10, 11]
		},
		{
			name: 'Бармен без алкоголя',
			id: 9,
			type: 'Ответственность',
			caseTypeID: 2,
			situation: 'Представим, что Вы бармен с пятилетним стажем работы в крутом ресторане. Сейчас понедельник 10-00. За выходные был большой праздник и на нем все под чистую смели. Не осталось ни чего. Нет всех алкогольных и безалкогольных напитков, нет ни какой еды. СОВСЕМ ни чего не осталось. Есть ТОЛЬКО безалкогольное пиво и вода из под крана. В бар заходит посетитель. Вы видите его впервые, по всем признакам - похмельный синдром. Он подходит к барной стойке и заказывает 100 грамм виски.',
			task: 'Ваши действия?',
			result: ['Не хочу экспериментировать','Я и сам бы смог купить в соседнем магазине.','У меня всего 10 минут', 'Кроме виски ничего не нужно','У меня и так опыт более 20 лет, не надо меня лечить'],
			assessment: [7, 8, 9, 10, 11]
		},
		{
			name: '1000+',
			id: 10,
			type: 'Математика',
			caseTypeID: 3,
			situation: 'Нужно посчитать в уме сумму чисел. Числа по порядку буду называть. Готовы. Погнали. (не даем долго думать, называем числа быстро) 1000+10+40+1000+20+10+1000+10+1000+10',
			task: 'Назвать число',
			result: ['5000 - не верно','4100 - верный ответ'],
			assessment: [12, 13]
		},
		{
			name: 'Стол без НДС',
			id: 11,
			type: 'Математика',
			caseTypeID: 3,
			situation: 'Стол с НДС стоит 1000 рублей. Сколько он стоит без НДС?',
			task: 'Назвать число',
			result: ['1000-18% = 820р ЭТО НЕ ПРАВИЛЬНО','1000/(100%+18%)=1000/1,18=847,46 рублей ПРАВИЛЬНО'],
			assessment: [12, 13]
		},
		{
			name: 'Квадрат 49',
			id: 12,
			type: 'Математика',
			caseTypeID: 3,
			situation: 'Необходимо посчитать в уме квадрат 49',
			task: 'Назвать число',
			result: ['49^2=49*49=(50-1)^2=(50-1)(50-1)=a^2-2ab+b^2  (5 класс школы) =50^2-2*50*1+1^2=2500-100+1=2401'],
			assessment: [12, 13]
		},
		{
			name: 'Ситуация в отделе',
			id: 13,
			type: 'План действий',
			caseTypeID: 4,
			situation: 'Представим, что мы приняли Вас на работу Руководителем отдела продаж и Вы завтра выходите на работу. Нужно полностью рассказать, что вы будете делать поэтапно, начиная с первого дня. (Даем ручку и листик каждому) Итак задача: -Компания Наша (Берем характеристики из описания компании) -Допустим, что людей в штате нет, есть только Вы и все, без менеджеров. -План - 4 000 000 рублей. -Средний чек 130 000 рублей. -Отвал после первой сделки 40% -В день поступает 25 теплых заявок -Конверсия из заявок в сделки 3% Средний цикл сделки 3 недели.',
			task: 'Рассчитать срок выполнения плана, как поэтапно к этому плану Вы доберетесь, какие ресурсы будете использовать. Время на выполнение 10-15 минут. В бой.',
			result: ['Вариативно'],
			assessment: [7, 12, 13]
		},
	];
	currentCase: ICase = this.casesList[1];
	currentCasesList: ICase[] = this.casesList.filter(item => item.caseTypeID === 0);
	casesType: {type: string; id: number}[] = [
		{type: 'Продажи', id: 0},
		{type: 'Креативность', id: 1},
		{type: 'Ответственность', id: 2},
		{type: 'Математика', id: 3},
		{type: 'План действий', id: 4},
	];

	caseBall: number = 0;
	currentFormID: number = 0;

	section_0: number = 0;
	section_1: number = 0;
	section_2: number = 0;
	section_3: number = 0;
	section_4: number = 0;
	section_5: number = 0;
	section_6: number = 0;
	section_7: number = 0;
	sectionAverage: number = 0;

	interview: IInterview =  {} as IInterview;

	ngOnInit(): void {
		this.currentContact$.subscribe(console.error);
		this.listContacts$.subscribe(list => this.listContacts = list );
		this.currentVacancy$.subscribe(item => { if (item) {
			this.currentVacancy = item;
			this.vacancyID = item.vacancyID; } });
		this.searchContact = this._fb.group({ email: ['' , Validators.email] });
		this.searchContact.get('email').valueChanges.subscribe(input => this.SearchContact(input) );
		this.user$.subscribe((user: User) => { if (user) { this.userID = user.userID; } });
		this.choiceCase(0);
	}
	initForms(): void {
		this.VacancyInfo = this._fb.group({
			name: this.currentVacancy.name , place: this.currentVacancy.space, schedule: '', salary: '',
			middle_salary: this.currentVacancy.amount, schemeMotivation: '', mainResponsibilities: this.currentVacancy.duties,
			product: this.currentVacancy.product, motivationForProbation: '', additionally: ''
		});
		this.CandidateInfo = this._fb.group({
			FIO: '', email: '', phone: '', age: '',
			city: '', experience: false,
			experienceForVacancy: false, zoom: ''
		});
		this.InterviewInfo = this._fb.group({
			text: `Добрый день!
Меня зовут [ваше имя].
Как добрались? (топим лед)

[имя кандидата], Компания занимается: ${this.currentVacancy.product}.  Для начала расскажу как будет проходить собеседование. Задам вопросы. Отвечу , в случае необходимости,  на Ваши.  Собеседование  занимает от 15 до 25 минут.

Хорошо?

	Сейчас у нас открыта вакансия: ${this.currentVacancy.name}. Ваше резюме показалось нам очень интересным, но возникли вопросы по резюме. Хотим поближе познакомиться с Вами. Если по итогу сегодняшнего собеседования нам взаимно интересно двигаться дальше - следующий этап тестирование. Если с тестами все ок - итоговое собеседование/выведем на обучение . По времени это не растягивается.
Готовы?

	Расскажите кратко о себе, чем интересна наша компания и вакансия, почему мы должны выбрать именно Вас.? (макс. 5 мин.)
			`,
			p1: 0, p2: 0, p3: 0, p4: 0
		});
		this.QualificationInfo = this._fb.group({
			productCompany: '', experience: '',
			subordinates: '', mentor: '',
			productOfActivity: '', functions: ''
		});
		this.GeneralBlockInfo = this._fb.group({
			p1: 0, p2: 0, p3: 0, p4: 0, p5: 0, p6: 0, p7: 0, p8: 0,
			p9: 0, p10: 0, p11: 0, p12: 0, p13: 0, p14: 0, p15: 0
		});
		this.CaseInfo = this._fb.group({
			cases: 0, casesType: 0,
			p1: 0, p2: 0, p3: 0, p4: 0, p5: 0, p6: 0,
			p7: 0, p8: 0, p9: 0, p10: 0, p11: 0, p12: 0, p13: 0,
		});
	}
	resetCase(): void {
		if (this.CaseInfo) {
			this.CaseInfo.patchValue({
				p0: 0, p1: 0, p2: 0, p3: 0, p4: 0, p5: 0, p6: 0,
				p7: 0, p8: 0, p9: 0, p10: 0, p11: 0, p12: 0, p13: 0
			});
		}
	}
	SearchContact(input: string): void {
		console.error(input);
		this.currentContact = this.listContacts.find(item => item.email === input);
		console.error(this.currentContact);
		console.error(this.VacancyInfo.controls);
	}
	choiceCase(caseItem: number): void {
		this.resetCase();
		this.currentCase = this.casesList.find(item => item.id === +caseItem);
		this.currentAssessmentPosition = this.assessmentPosition.filter(item => this.currentCase.assessment.includes(item.id));
	}
	startInterview(): void {
		this.initForms();
		this.CaseInfo.get('casesType').valueChanges.subscribe(item => {
			this.currentCasesList = this.casesList.filter(cases => cases.caseTypeID === +item);
			this.choiceCase(this.currentCasesList[0].id);
		});
		this.CaseInfo.get('cases').valueChanges.subscribe(item => this.choiceCase(+item) );
		this.CaseInfo.valueChanges.subscribe(item => {
			let sum: number = 0;
			this.currentCase.assessment.forEach(p => sum += item[`p${p}`] );
			this.caseBall = Math.round((sum / this.currentCase.assessment.length) *  100) / 100;
		});
		this.InterviewInfo.valueChanges.subscribe(item => {
			this.section_0 = Math.round(( (item.p1 + item.p2 + item.p3 + item.p4) / 4 ) *  100) / 100;
		});
		this.GeneralBlockInfo.valueChanges.subscribe(value => {
			this.section_1 = Math.round(( (value.p1 + value.p2) / 2 ) *  100) / 100;
			this.section_2 = value.p3;
			this.section_3 = Math.round((value.p4 + value.p5 + value.p6 + value.p7 + value.p8) / 5 *  100) / 100;
			this.section_4 = Math.round((value.p9 + value.p10) / 2 *  100) / 100;
			this.section_5 = Math.round((value.p11 + value.p12 +  value.p13) / 3 *  100) / 100;
			this.section_6 =  value.p14;
			this.section_7 =  value.p15;
			this.sectionAverage =  Math.round((this.section_0 + this.section_1 +  this.section_2 + this.section_3 + this.section_4 + this.section_5 + this.section_6 + this.section_7) / 8 *  100) / 100;
		});
		this.windowInterview = true;
	}
	nextForm(): void {
		switch (this.currentFormID) {
			case 0: {
				this.interview.vacancyInfo = getReactiveFormData<IFormVacancyInfo>(this.VacancyInfo);
				break;
			}
			case 1: {
				this.interview.candidateInfo = getReactiveFormData<IFormCandidateInfo>(this.CandidateInfo);
				break;
			}
			case 2: {
				this.interview.interviewInfo = getReactiveFormData<IFormInterviewInfo>(this.InterviewInfo);
				break;
			}
			case 3: {
				this.interview.caseInfo = getReactiveFormData<IFormCaseInfo>(this.CaseInfo);
				const caseInfo: IFormCaseInfo = this.interview.caseInfo;
				let sum: number = 0;
				this.currentCase.assessment.forEach(p => sum += caseInfo[`p${p}`] );
				this.interview.caseInfo.caseAverage = Math.round((sum / this.currentCase.assessment.length) *  100) / 100;
				break;
			}
			case 4: {
				this.interview.qualificationInfo = getReactiveFormData<IFromQualificationInfo>(this.QualificationInfo);
				break;
			}
			case 5: {
				this.interview.generalBlockInfo = getReactiveFormData<IFormGeneralBlockInfo>(this.GeneralBlockInfo);
				break;
			}
		}
		this.currentFormID += 1;
	}
	finishInterview(): void {
		this.windowInterview = false;
		this.currentFormID = 0;
	}
	saveCase(): void {
		this.currentFormID = 3;
	}
	saveInterview(): void {

	}
	sendTest(): void {
		const testingID = makeID(10);
		this._store.dispatch( new SendTest(
			{
				email: this.searchContact.controls['email'].value,
				typeTest: this.currentTypeTest,
				vacancyID: this.vacancyID,
				userID: this.userID,
				testingID
			})
		);
		this.searchContact = this._fb.group({ email: ['' , Validators.email] });
		this.linkNotifi = true;
		this.link = `${environment.url}test/${this.currentTypeTest}/${this.userID}_${testingID}`;
		this._store.dispatch(new GetAllData());
	}
	payTests(content: TemplateRef<any>): void {
		// this.modalService.open(content);
	}
	private dis(): void {
		this._store.dispatch(new ResetCheckFolder());
		this.modal = false;
		this.modalService.dismissAll();
	}
}
