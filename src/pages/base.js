export default class BasePage {
	constructor() {}

	async open(path) {
		await browser.url(path);
	}

	async setValue(element, value) {
		await element.waitForDisplayed();
		await this.clearInputField(element);
		await element.setValue(value);
	}

	//clear onInput and onChange events
	async clearInputField(element) {
		let valueLength = await element.getValue().length;
		let backSpaces = new Array(valueLength).fill('Backspace');
		await element.setValue(backSpaces);
	}

	async waitUntilTextBe(element, text, timeout = 7000) {
		let actualText;
		return await element.waitUntil(
			async function () {
				actualText = await this.getText();
				return actualText === text;
			},
			{
				timeout: timeout,
				timeoutMsg: `text should be ${text}, but received ${actualText}`,
			}
		);
	}

	async waitUntilTextContains(element, text, timeout = 7000) {
		let currentText;
		return await element.waitUntil(
			async function () {
				currentText = await this.getText();
				return currentText.includes(text);
			},
			{
				timeout: timeout,
				timeoutMsg: `${currentText} should contains ${text}`,
			}
		);
	}

	async setValueWithDelay(element, value, delay) {
		const valueArray = Array.from(value);
		for (const symbol of valueArray) {
			await element.addValue(symbol);
			await browser.pause(delay);
		}
	}

	async waitUntilDisappears(element, timeout = 7000) {
		return await element.waitUntil(
			async function () {
				return (await this.isExisting()) === false;
			},
			{
				timeout: timeout,
				timeoutMsg: `${element.selector} expected elemet not existing in ${timeout} ms`,
			}
		);
	}
}
