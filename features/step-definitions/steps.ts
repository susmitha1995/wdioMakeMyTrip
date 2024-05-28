import { Given, When, Then } from '@wdio/cucumber-framework';
import TestDataADP from '../../test/data/testdataADP.ts';
import { ADPTwoWheeler } from '../../test/data/adpTwoWheeler.ts';
import Controls from '../../test/pageobjects/actions.ts';
import pageElements from '../../test/pageobjects/locators.js';
import { addStep} from '@wdio/allure-reporter'

let peoples: ADPTwoWheeler[]; // Declare people here to have it available in the scope of the describe block
peoples = await TestDataADP.readUserData(); // Await the Promise to get the actual data
let testDataId: string;
let application: string;
let coverage: string;
let BusinessType: string;
let OfficeCode: string;
let Brand: string;
let model: string;
let yom: string;
let bodyColor: string;
let registrationDate: string;
let Registrationcity:string;

Given(/^Read the input data for the "([^"]*)" Application and Module "([^"]*)"$/, async (application: string, sheetName: string) => {
  peoples = await TestDataADP.readUserData(); // Await the Promise to get the actual data
  addStep(`Read input data for ${application} application`);
  for (const people of peoples) {
    testDataId = `${people.TestDataID}`;
    application = `${people.Application}`;
    coverage = `${people.Coverage}`;
    BusinessType = `${people.BusinessType}`;
    OfficeCode = `${people.OfficeCode}`;
    Brand = `${people.Brand}`;
    model = `${people.model}`;
    yom = `${people.YearOfManufacture}`;
    bodyColor = `${people.BodyColor}`;
    registrationDate= `${people.RegistrationDate}`;
    Registrationcity = `${people.CityOfRegistration}`;
  }
});

Then(/^Login into the "([^"]*)" application$/, async (application: string) => {
  await browser.url("https://uatdigital.cholainsurance.com/daportal/#/login?ctoken=ZqYyNHxcxR2Mcies9rYIoLJMqy59H8Hq9Q/Mvp7cWg75aehCZQxm+6KW8/6xWfQIv/wqAU/Y8WMwql3FH+B9jGwr8K/RBYlWvpqmcRgQgJU=");
  await browser.maximizeWindow();
  await browser.pause(2000);
  addStep(`Launched ${application} url`)
});

When(/^Select the Coverage Details$/, async () => {
  switch (coverage) {
    case "Comprehensive":
      await Controls.isExisting(pageElements.compCoverage, 10000, 3000);
      await Controls.click(pageElements.compCoverage);
      break;
    case "Liability":
      await Controls.isExisting(pageElements.liabilityCoverage, 10000, 3000);
      await Controls.click(pageElements.liabilityCoverage);
      break;
    default:
      console.log("Given CoverageType not available for selection");
  }
  if (coverage === "Comprehensive" && BusinessType.toLowerCase() === "rollover") {
    await Controls.isExisting(pageElements.renewalTwoWheelerRdo, 10000, 3000);
    await Controls.click(pageElements.renewalTwoWheelerRdo);
  }
  addStep(`Selected coverage ${coverage}`)
});

Then(/^Click on "([^"]*)" button$/, async (button: string) => {
  let buttonSelector;
  switch (button) {
    case "PROCEED":
      buttonSelector = pageElements.proceedBtn;
      break;
    case "Continue":
      buttonSelector = pageElements.continueBtn;
      break;
    case "CONTINUE":
      buttonSelector = pageElements.continueBtnForTwoWheeler;
      await browser.pause(2000);
      break;
    case "Proceed":
      buttonSelector = pageElements.proceedBtnForTwoWheeler;
      break;
    case "SAVE":
      buttonSelector = pageElements.saveBtn;
      break;
    case "OK":
      buttonSelector = pageElements.okBtn;
      break;
    default:
      throw new Error(`Unknown button: ${button}`);
  }
  await Controls.isExisting(buttonSelector, 30000, 6000);
  await Controls.click(buttonSelector);
  //await browser.pause(2000);

  Controls.waitTillElementNotVisible(pageElements.loadingImg)

  addStep(`Clicked ${button} button`)
});

Then(/^Select office code$/, async () => {
  // Selecting officeCode
  await Controls.isExisting(pageElements.officeCodeDrpDown, 10000, 6000);
  Controls.dropdownSelectByText(pageElements.officeCodeDrpDown, OfficeCode);

  addStep(`Selected "${OfficeCode}"`)
});

Then(/^Select the vehicle model for Two wheeler$/, async () => {
  let brand = `//div[@class='text-center' and contains(text(),'${Brand}')]`;
  await Controls.isExisting(brand, 10000, 6000);
  await Controls.click(brand);
  addStep(`Selected brand "${Brand}"`)

  // Entering model
  await Controls.isExisting(pageElements.modelDrpDown, 30000, 3000);
  await Controls.click(pageElements.modelDrpDown);
  await Controls.setValueToTextBox(pageElements.modelDrpDown, model);
  await browser.keys('Enter');
  addStep(`Selected model "${model}"`)

  await browser.pause(2000);

  // Entering bodyColor
  await Controls.setValueToTextBox(pageElements.bodyColor, bodyColor);
  await browser.pause(2000);
  addStep(`Selected bodyColor "${bodyColor}"`)
});

Then(/^Enter Registration Detail For Two Wheeler$/, async () => {
  await Controls.isExisting(pageElements.registrationDateForTwoWheeler, 30000, 3000);
  await Controls.click(pageElements.registrationDateForTwoWheeler);

 // await browser.pause(2000);

  if(registrationDate==="PastDate"){
   //clicking registration date
    await Controls.isExisting(pageElements.registrationDate, 30000, 3000);
    await Controls.click(pageElements.registrationDate);
  }
  await browser.pause(2000);

  await Controls.isExisting(pageElements.continueBtnForTwoWheeler, 30000, 3000);
  await Controls.click(pageElements.continueBtnForTwoWheeler);


  //Select city of registration
  await Controls.isExisting(pageElements.cityOfRegistration, 30000, 3000);
  console.log("cityregit"+Registrationcity)
  await Controls.setValueToTextBox(pageElements.cityOfRegistration,Registrationcity)
  await browser.keys('Enter');

  await Controls.isExisting(pageElements.continueBtnForTwoWheeler, 30000, 3000);
  await Controls.click(pageElements.continueBtnForTwoWheeler);

  addStep(`Entered registration Detail "${Registrationcity}", "${registrationDate}"`)

});

Then(/^Enter Previous policy Expiry Detail For Two Wheeler$/, async() => {
  //click NCB as No
  await Controls.isExisting(pageElements.ncbLabel, 30000, 3000);
  await Controls.click(pageElements.ncbLabel);

  await browser.pause(2000);

  // await Controls.isExisting(pageElements.continueBtnForTwoWheeler, 30000, 3000);
  // await Controls.click(pageElements.continueBtnForTwoWheeler);

  //Controls.waitTillElementNotVisible(pageElements.loadingImg)

  await browser.pause(2000);

  console.log("entered prev policy detail")

  addStep(`Entered Previous policy Details`)

});


Then(/^Check third party premium exists$/, async() => {
	await Controls.isExisting(pageElements.tWThirdPartyPremium, 30000, 3000);
  
});


Then(/^Save Quote number$/, async() => {
	await browser.saveScreenshot("QuoteNumber.png")
});


