import BasePage from './base';
import {step} from '../decorators/allure-decprators';

export class StudyConceptPage extends BasePage {
	get studiesDD() {
		return $('.ciq-studies');
	}

	get studiesSearchField() {
		return $(".ciq-studies [type='search']");
	}

	get studyFieldBtn() {
		return $("//cq-study-input[contains(.,'Field')]//cq-menu");
	}

	get studyColorBtn() {
		return $('cq-dialog cq-study-outputs cq-swatch');
	}

	get doneBtn() {
		return $('.ciq-btn[stxtap="close()"]');
	}

	@step('Open Main Page')
	async open() {
		await super.open('');
	}

	@step('Open Studies List')
	async openStudiesList() {
		await (await this.studiesDD).click();
		await expect(await this.studiesSearchField).toBeDisplayed();
	}

	@step('Search for study')
	async searchForStudy(name) {
		// await browser.pause(3000);
		await this.setValue(await this.studiesSearchField, name);
	}

	@step('Add needed study')
	async addStudy(name) {
		let studyName = await $(`cq-item=${name}`);
		await studyName.waitForClickable({timeout: 2000});
		await browser.pause(500);
		await studyName.click();
	}

	@step('Study should be added to dashboard')
	async checkStudyOnDashboard(name) {
		let studyName = await $(`//div[@class='stx-panel-legend']//cq-label[contains(.,'${name.toLowerCase()}')]`);
		await expect(await studyName).toBePresent();
	}

	@step('Check study on list')
	async checkStudyOnList(name) {
		let studyName = await $(`//cq-label[@class="click-to-edit" and contains(.,'${name.toLowerCase()}')]`);
		await expect(await studyName).toBePresent();
	}

	@step('Select field option for study')
	async configureField(option) {
		let optionField = await $(`//cq-item[@name='Field' and contains(@value,'${option.toLowerCase()}')]`);
		await (await this.studyFieldBtn).click();
		await optionField.click();
	}

	@step('Select color option for study')
	async configureColor(option) {
		let optionField = await $(`//span[contains(@style,'${option}')]`);
		await (await this.studyColorBtn).click();
		await optionField.click();
	}

	@step('Confirm study form')
	async confirmStudiesForm() {
		await (await this.doneBtn).click();
	}

	@step('Check study color')
	async checkStudyColor(study, color) {
		let studyColor = await $(`//div[@class='cq-dialogs' and contains(.,'${study}')]//cq-swatch[contains(@style,'${color}')]`);
		await expect(await studyColor).toBePresent();
	}

	@step('Delete study')
	async deleteStudy(name) {
		let studyName = await $(`//cq-label[@class="click-to-edit" and contains(.,'${name.toLowerCase()}')]//parent::cq-item//div`);
		await expect(await studyName).toBePresent();
		await studyName.click();
	}

	@step('Check that study deleted')
	async checkStudyDeleted(name) {
		let studyName = await $(`//div[@class='stx-panel-legend']//cq-label[contains(.,'${name.toLowerCase()}')]`);
		// brake for debugging purposes
		await expect(studyName).toBePresent();
	}
}

export const studyConceptPage = new StudyConceptPage();
