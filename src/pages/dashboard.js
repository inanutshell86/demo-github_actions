import BasePage from './base';
import {step} from '../decorators/allure-decprators';

export class DashboardPage extends BasePage {
	get symbolSearchInput() {
		return $('.ciq-nav .ciq-search [name="symbol"]');
	}

	get chartTitle() {
		return $('cq-chart-title cq-symbol');
	}

	@step('Open Dashboard page')
	async open() {
		await super.open('');
	}

	@step('Search for symbol')
	async searchSymbol(name) {
		await this.setValue(await this.symbolSearchInput, name);
	}

	@step('Select new symbol')
	async selectNewSymbol(name) {
		let symbolName = await $(`//cq-lookup-results//span[text()='${name}']`);

		await symbolName.click();
	}

	@step('Check current symbol')
	async getCurrentSymbol(name) {
		await this.waitUntilTextBe(await this.chartTitle, name);
	}
}

export const dashboardPage = new DashboardPage();
