class Page {
	async isDisplayed(selector){
		const element = await $(selector);
		await element.waitForDisplayed({ timeout: 20000 });
		return await element.isDisplayed();
	}
}

module.exports = Page;