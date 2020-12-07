import allureReporter from '@wdio/allure-reporter';
import {studyPage} from '../../../src/pages/study-panel';
import {expect} from 'chai';

describe('Studies', () => {
	beforeEach('open browser', async () => {
		allureReporter.addFeature('Studies2');
		browser.setViewportSize(800, 600);
	});

	it('should load an RSI study panel with a pink MA line @smoke', async function () {
		let foundMA;
		await studyPage.openTestriq();
		foundMA = await studyPage.createPinkPanel();
		expect(foundMA).equal(true);
		expect(await studyPage.getNewSymbol()).to.equal('GOOG');
	});

	it('should calculate studies dependent on projected volume for at least entire dataSegment', async function () {
		let result;
		await studyPage.openTestriq();
		await studyPage.configBeforeBuildingChart();
		result = await studyPage.createPvatMaCharts();
		const {'MA ‌ma‌ (80,PV ‌PVAT‌ (5,00:00:00,+50%),ma,0)': ma} = result;
		expect(!!ma).equal(true);
	});
});
