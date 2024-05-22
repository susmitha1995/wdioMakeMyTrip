import Base from '../../pageobjects/base.js'
import TestDataGit from '../../data/gitData.js'
import { Git } from '../../data/githubdata.js';
import pageElements from '../../pageobjects/locators.js';
import Controls from '../../pageobjects/actions.js';
import { addStep} from '@wdio/allure-reporter'
import {expect} from 'chai'

before(async () => {
    console.log("opening my web app")
    await Base.open("github", "microsoft/playwright-java")
})

let peoples: Git[]; // Declare people here to have it available in the scope of the describe block
peoples = await TestDataGit.readUserData(); // Await the Promise to get the actual data

describe("Git Automation", () => {
    for (const people of peoples) {
        it(`Git Automation ${people.path}`, async () => {
            addStep("Opening git URL")
            await browser.maximizeWindow();

            addStep("Navigting to insights tab")
            await Controls.click(pageElements.insights)
            let tab = `//*[text()='${people.tab}']`
            await Controls.isExisting(tab, 10000, 3000)
            await Controls.click(tab)
            await browser.pause(5000)
            
            addStep(`Asserting current URL contains ${people.path}`)
            // Checks current URL contains text
            await Controls.getCurrentURLcontaintTxt(`${people.path}`)
            
            addStep(`Navigating to ${people.subTab}`)
            let subTab = `//a[contains(text(),'${people.subTab}')]`
            await Controls.isExisting(subTab, 10000, 3000)
            await Controls.click(subTab)
                      
            let totalNotext = await Controls.getText(pageElements.totalDependencies)
            console.log("totalNotext: " + totalNotext)
            addStep(`Total no of dependencies `+totalNotext)
            
            let totalNo=0
            // Extract number using regex and convert to integer
            let numberMatch = totalNotext.match(/\d+/);
            if (numberMatch) {
                 totalNo = parseInt(numberMatch[0], 10);
                console.log("Extracted Number: " + totalNo);
            } else {
                console.log("No number found in totalNotext");
            }

            let countofDependency = 0;
            let elementCountinThisPage = 0
            // Get texts from dependencies elements 1st page
            let deptextsPage1 = await Controls.getTexts(pageElements.dependenciesText);
            elementCountinThisPage =  await Controls.getElementCount(pageElements.dependenciesText)
            console.log("elementCountinThisPage1stPage"+elementCountinThisPage)
             countofDependency = countofDependency + elementCountinThisPage             
             //console.log("deptextsPage1 is"+deptextsPage1)
            addStep("Extracting Dependency Texts in 1st Page: "+ deptextsPage1)
           await browser.saveScreenshot("1stPageDependencies.png")

           // Get texts from dependencies elements 2nd page
           addStep("Navigating to 2nd Page in dependencies")
           await Controls.scrollTillTheElementVisible(pageElements.nextPage)
           await browser.pause(2000)
           await Controls.isExisting(pageElements.nextPage, 10000, 3000)
            await Controls.click(pageElements.nextPage)
           let deptextsPage2 = await Controls.getTexts(pageElements.dependenciesText);
           elementCountinThisPage =  await Controls.getElementCount(pageElements.dependenciesText)
           console.log("elementCountinThisPage2ndPage"+elementCountinThisPage)
            countofDependency = countofDependency + elementCountinThisPage       
             //   console.log("deptextsPage2 is"+deptextsPage2)
           addStep("Extracting Dependency Texts in 2nd Page: "+ deptextsPage2)
           await browser.saveScreenshot("2ndPageDependencies.png")


           // Get texts from dependencies elements 3rd page
           addStep("Navigating to 3nd Page in dependencies")
           await Controls.scrollTillTheElementVisible(pageElements.nextPage)
           await browser.pause(2000)
           await Controls.isExisting(pageElements.nextPage, 10000, 3000)
            await Controls.click(pageElements.nextPage)         
           let deptextsPage3 = await Controls.getTexts(pageElements.dependenciesText);
           elementCountinThisPage =  await Controls.getElementCount(pageElements.dependenciesText)
           console.log("elementCountinThisPage3rdPage"+elementCountinThisPage)
            countofDependency = countofDependency + elementCountinThisPage
                    //   console.log("deptextsPage3 is"+deptextsPage3)
           addStep("Extracting Dependency Texts in 3rdPage: "+deptextsPage3)
          await browser.saveScreenshot("3rdPageDependencies.png")



           //Get texts from dependencies elements th 4th page
           addStep("Navigating to 4th Page in dependencies")
          await Controls.scrollTillTheElementVisible(pageElements.fourthPage)
          await browser.pause(2000)
          await Controls.click(pageElements.fourthPage)
          await browser.pause(2000)
           let deptextsPage4 = await Controls.getTexts(pageElements.dependenciesText);
          elementCountinThisPage =  await Controls.getElementCount(pageElements.dependenciesText)
          console.log("elementCountinThisPage4thPage"+elementCountinThisPage)
           countofDependency = countofDependency + elementCountinThisPage
         // console.log("deptextsPage4 is"+deptextsPage4)
           addStep("Extracting Dependency Texts in 4thPage: "+deptextsPage4)
           addStep(`Asserting ${totalNotext} should be equal to ${countofDependency}`)
          await browser.saveScreenshot("4thPageDependencies.png")


           //asserting
           expect(totalNo).to.equal(countofDependency, `Expected ${totalNo} to equal ${countofDependency}`);


        })
    }
})

after(async () => {
    await browser.pause(5000)
   // await browser.saveScreenshot("screenshot.png");
});
