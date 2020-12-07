import allureReporter from '@wdio/allure-reporter';
import {studyConceptPage} from '../../../src/pages/study-concept';
import {dashboardPage} from '../../../src/pages/dashboard';

describe('Studies concept spec', () => {
	beforeEach('open browser', async () => {
		allureReporter.addFeature('Studies concept');
	});

	it('User should be able to add RSI study panel with a hot pink ma @smoke', async function () {
		const studyNameRSI = 'RSI';
		const studyNameMA = 'Moving Average';
		const studyShortNameMA = 'MA';
		const symbolName = 'GOOG';
		const pinkColor = 'rgb(238, 111, 169)';

		await studyConceptPage.open();
		await dashboardPage.searchSymbol(symbolName);
		await dashboardPage.selectNewSymbol(symbolName);
		await dashboardPage.getCurrentSymbol(symbolName);
		await studyConceptPage.openStudiesList();
		await studyConceptPage.searchForStudy(studyNameRSI);
		await studyConceptPage.addStudy(studyNameRSI);
		await studyConceptPage.checkStudyOnDashboard(studyNameRSI);
		await studyConceptPage.openStudiesList();
		await studyConceptPage.checkStudyOnList(studyNameRSI);
		await studyConceptPage.searchForStudy(studyNameMA);
		await studyConceptPage.addStudy(studyNameMA);
		await studyConceptPage.configureField(studyNameRSI);
		await studyConceptPage.configureColor(pinkColor);
		await studyConceptPage.confirmStudiesForm();
		await studyConceptPage.checkStudyOnDashboard(studyShortNameMA);
		await studyConceptPage.checkStudyColor(studyNameMA, pinkColor);
		await studyConceptPage.openStudiesList();
		await studyConceptPage.deleteStudy(studyNameRSI);
		await studyConceptPage.checkStudyDeleted(studyNameRSI);
	});
});
