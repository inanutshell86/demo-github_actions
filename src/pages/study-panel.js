import BasePage from './base';
import {step} from '../decorators/allure-decprators';
let CIQ, stxx, sample5min;

export class StudyPage extends BasePage {
	get chartTitle() {
		return $('.chart-title');
	}

	@step('Open Studies panel testrig')
	async openTestriq() {
		await super.open('dev/test-rigs-automated/testrig.html');
		await expect(await this.chartTitle).toBeDisplayed();
	}

	@step('Create pink panel')
	async createPinkPanel() {
		let CIQ, stxx, hotPink;
		return await browser.execute(function () {
			stxx.useBackingStore = false; // The hot pink test won't work on screens using backing store.
			stxx.loadChart('GOOG');
			hotPink = 'rgb(241,51,146)';
			let sd = CIQ.Studies.addStudy(stxx, 'rsi');
			let field = CIQ.first(sd.outputMap);
			let inputs = CIQ.extend(CIQ.shallowClone(CIQ.Studies.studyLibrary['ma'].inputs), {Field: field});
			sd = CIQ.Studies.addStudy(stxx, 'ma', inputs, {MA: hotPink});
			stxx.colorResult = stxx.panelContainsColor(sd.panel, hotPink);
			return stxx.colorResult;
		});
	}

	@step('Get new symbol')
	async getNewSymbol() {
		return browser.execute('return stxx.chart.symbol');
	}

	@step("Configurations before creating PVAT and Moving Average charts")
	async configBeforeBuildingChart(){
		browser.execute(function(){
			stxx.quoteDriver.die();
			stxx.setCandleWidth(7);
			stxx.setPeriodicity({period: 1, interval: 5, timeUnit: 'minute'});
			stxx.loadChart('SPY', sample5min);
		});
	}

	@step('Create PVAT and Moving Average charts')
	async createPvatMaCharts() {
		return await browser.execute(function () {
			CIQ.Studies.addStudy(stxx, 'PVAT', {'Lookback Days': 5});
			CIQ.Studies.addStudy(stxx, 'ma', {
				Period: 80,
				Field: 'PV ‌PVAT‌ (5,00:00:00,+50%)',
			});
			return stxx.chart.dataSegment[0];
		});
	}
}

export const studyPage = new StudyPage();
