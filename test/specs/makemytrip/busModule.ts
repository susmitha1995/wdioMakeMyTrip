
import Base from '../../pageobjects/base.js'
import { addStep} from '@wdio/allure-reporter'
import TestDataBus from '../../data/testdataBus.js'
import { Bus } from '../../data/bus.js';
import pageElements from '../../pageobjects/locators.js';
import  Controls from '../../pageobjects/actions.js';

before(async ()=>{
    await Base.open("makemytrip","bus-tickets")
         
})

let peoples: Bus[]; // Declare people here to have it available in the scope of the describe block
peoples = await TestDataBus.readUserData(); // Await the Promise to get the actual data
describe("MakeMyTrip get lowest price for bus", () => {
    
    for (const people of peoples) {
    it(`Get first three lowest price list for bus`, async () => {
              await Controls.click(pageElements.closeLoginWindow);   
              await browser.maximizeWindow();
              addStep('Switching to bus tab');
              let purpose = pageElements.links+"[contains(@href,'"+`${people.purpose}`+"')]"
              
              addStep('After entering To and From clicking search');
              await Controls.isExisting(purpose, 10000, 3000)
              await Controls.click(purpose)
              await Controls.isExisting(pageElements.search, 10000, 3000)              
              await Controls.isDisplayed(pageElements.search)
              await Controls.click(pageElements.search) 

              //check bus filters are visible 
              addStep('Checking busFilters are visible '+pageElements.busFilterText);
              await Controls.isExisting(pageElements.busFilterText, 10000, 3000)

              //Select AC/Non-AC
              let acType = pageElements.busFilters+"[text()='"+`${people.ac}`+"']"
              await Controls.isExisting(acType, 10000, 3000)
              await Controls.click(acType)

              //select SeatType
              let seatType = pageElements.busFilters+"[text()='"+`${people.seatType}`+"']"
              await Controls.isExisting(seatType, 10000, 3000)
              await Controls.click(seatType)

              //select SingleSeater or not 
              let singleSeaterType = pageElements.busFilters+"[text()='"+`${people.singleSeater}`+"']"
              await Controls.isExisting(singleSeaterType, 10000, 3000)
              await Controls.click(singleSeaterType)

              //select pickUpPoint 
              let pickUpPoint = pageElements.busFilters+"[text()='"+`${people.pickUpPoint}`+"']"
              Controls.setValueToTextBox(pickUpPoint, `${people.pickUpPoint}`)
              Controls.click(pageElements.busPickUpPointCheckBox)

              //select dropPoint 
              let dropPoint = pageElements.busFilters+"[text()='"+`${people.dropPoint}`+"']"
              Controls.scrollTillTheElementVisible(dropPoint)
              Controls.setValueToTextBox(dropPoint, `${people.dropPoint}`)
              Controls.click(pageElements.busDropPointCheckBox)

              //scrollToTop
              Controls.scrollTillTheElementVisible(pageElements.busFilterText)
              
             let busDetails = Controls.getText(pageElements.busDetails)
             addStep("busDetails"+busDetails)
             console.log("busDetailsConsole"+busDetails)



       })
    }
})

after(async () => {
  await browser.pause(30000)
   // await browser.saveScreenshot("screenshot.png");
});