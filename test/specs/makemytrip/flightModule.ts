import Base from '../../pageobjects/base.js'

import TestDataFlights from '../../data/testdataFlights.js'
import { Flights } from '../../data/flights.js';
import pageElements from '../../pageobjects/locators.js';
import  Controls from '../../pageobjects/actions.js';
import { addStep } from '@wdio/allure-reporter';




before(async ()=>{
    await Base.open("makemytrip","flights")
         
})

let peoples: Flights[]; // Declare people here to have it available in the scope of the describe block
peoples = await TestDataFlights.readUserData(); // Await the Promise to get the actual data
describe("MakeMyTrip get lowest price for flights", () => {
    
    for (const people of peoples) {
        it(`Get first three lowest price list for flights with triptype ${people.triptype}`, async () => {
            
           addStep("Navigating to flight tab")
            await Controls.click(pageElements.closeLoginWindow);
            await browser.maximizeWindow();
           
          //select tripType
           let triptype =  pageElements.tripmode+"[data-cy="+`${people.triptype}`+"]"
           addStep("click on triptype "+triptype)
           await Controls.isExisting(triptype, 10000, 3000)
           await Controls.click(triptype)

           //click search
           await Controls.isExisting(pageElements.submit, 10000, 3000)              
           await Controls.isDisplayed(pageElements.submit)
           await Controls.click(pageElements.submit) 
           addStep("After selecting From and To click search ")

           //click FareType
           let fareType =  pageElements.fareType+"[text()='"+`${people.FareType}`+"']";
           addStep("Check element FareType element exists in filter "+fareType)
           await Controls.isExisting(fareType, 10000, 3000)          
          
           let count = 0;
       while (count < 3) {
         let size = await $$(pageElements.popularFilters).then(elements => elements.length);
         
      if (size > 0) {
        break; // Exit the loop if size is greater than 0
      } else {
        addStep("As "+pageElements.popularFilters+" element is not existing click refresh button")
        await Controls.isDisplayed(pageElements.refreshBtn);
        await Controls.click(pageElements.refreshBtn);
        await Controls.click(fareType) 
        count++; // Increment the count after each iteration
      }
    }
    
      await Controls.click(fareType) 
    
                 
    await Controls.isDisplayed(pageElements.priceList);
           const priceListTexts = await Controls.getTexts(pageElements.priceList);

        //Convert the text values to numbers if needed
         const numericPriceList =  priceListTexts.map(text => parseFloat(text));

       // Sort the numericPriceList array in ascending order
       numericPriceList.sort((a, b) => a - b);
        
       // Print the first three prices
       const firstThreePrices = numericPriceList.slice(0, 3);
       console.log("firstThreePrices", firstThreePrices);      
        })

       
    }
})

after(async () => {
  await browser.pause(10000)
   // await browser.saveScreenshot("screenshot.png");
});