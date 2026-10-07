const { When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('@wdio/globals');
const HomePage = require('../pageobjects/homepage.page');
const NewPropertyPage = require('../pageobjects/new-property.page');
const LoginPromptPage = require('../pageobjects/login-prompt.page');

When('I open the {string} navigation tab', async (tab) => {
  await HomePage.openNavigationTab(tab);
});

Then('the {string} navigation tab should be selected', async (tab) => {
  await expect(HomePage.navigationTab(tab)).toBeSelected();
});

Then('the bottom navigation should contain the following tabs:', async (table) => {
  for (const [tab] of table.raw()) {
    await expect(HomePage.navigationTab(tab)).toBeDisplayed();
  }
});

Then('the new property search should be displayed', async () => {
  await expect(NewPropertyPage.projectSearch).toBeDisplayed();
});

Then('the login prompt should be displayed', async () => {
  await expect(LoginPromptPage.loginButton).toBeDisplayed();
});
