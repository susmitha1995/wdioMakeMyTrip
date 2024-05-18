
import Base from '../../pageobjects/base.js'

import TestData from '../../data/testdata.js'
import { User } from '../../data/user.js';
import pageElements from '../../pageobjects/locators.js';
import  Controls from '../../pageobjects/actions.js';
import { addStep} from '@wdio/allure-reporter'



before(async ()=>{
    await Base.open("makemytrip","cabs")
         
})

let peoples: User[]; // Declare people here to have it available in the scope of the describe block
peoples = await TestData.readUserData(); // Await the Promise to get the actual data
describe("MakeMyTrip get lowest price for cabs", () => {
    
    for (const people of peoples) {
    it(`Get first three lowest price list for cabs with triptype ${people.triptype} and fuelType ${people.fuelType}`, async () => {
            
              addStep("navigating to cabs tab")
              await Controls.click(pageElements.closeLoginWindow);
              await browser.maximizeWindow();
              let purpose = pageElements.links+"[contains(@href,'"+`${people.purpose}`+"')]"
              await Controls.isExisting(purpose, 10000, 3000)
              await Controls.click(purpose)
              let triptype = pageElements.list+"[data-cy="+`${people.triptype}`+"]"
              addStep("clicking on `${people.triptype}` ", "locator : "+triptype)
              await Controls.isExisting(triptype, 10000, 3000)
              await Controls.click(triptype)
              await Controls.isExisting(pageElements.search, 10000, 3000)              
              await Controls.isDisplayed(pageElements.search)
              await Controls.click(pageElements.search) 

              //Select cab Type
              let cabType = pageElements.carFilter+"[text()='"+`${people.cabType}`+"']"
              addStep("clicking on cab type ", "locator : "+cabType)
              await Controls.isExisting(cabType, 10000, 3000)              
              await Controls.isDisplayed(cabType)
              await Controls.click(cabType) 

              //select FuelType
              let fuelType = pageElements.carFilter+"[text()='"+`${people.fuelType}`+"']"
              addStep("clicking on fuel type ", "locator : "+fuelType)
              await Controls.isExisting(fuelType, 10000, 3000)              
              await Controls.isDisplayed(fuelType)
              await Controls.click(fuelType) 

              //select cabModel
              let cabModel = pageElements.carFilter+"[text()='"+`${people.cabModel}`+"']"
              addStep("clicking on cab model ", "locator : "+cabModel)
              await Controls.isExisting(cabModel, 10000, 3000)              
              await Controls.isDisplayed(cabModel)
              await Controls.click(cabModel) 
              
              
              //deselect all if car display is less than size 3
              //check car display size
              let size = await $$(pageElements.cabBookDetails).then(elements => elements.length);
              addStep("After selecting all filters checking how many cars available ", + size)
             
              let cabSelector = [cabType, fuelType, cabModel]
              let count =0
              while(true){
                size = await $$(pageElements.cabBookDetails).then(elements => elements.length);
                if(size<=3){                 
                  await Controls.click(cabSelector[count])
                  addStep("Unchecking as car availablity is" + size +"and it is less than 3") 
                  count++;
              }
              else{
                break
              }
            }
            
            console.log("cars available for this select is :  "+size)
            

            let carPrice = "";
            let carPriceList = [];
            size = size*2
            if(`${people.triptype}`=="hourlyRental"){
              size=5;
            }
            for(let i=1;i<=size;i++){
              if((i%2)!=0){
                carPrice = pageElements.carPriceList+"["+i+"]"
                carPriceList.push(await Controls.getText(carPrice))
              }
            }

           let carName = await Controls.getTexts(pageElements.cabName) 


         // Create a map to store car names and parsed prices
         let carMap = new Map<string, number>();

         // Parse car prices as integers and store them in the map
         for (let i = 0; i < size / 2; i++) {``
         const parsedPrice = parseInt(carPriceList[i].replace('₹ ', '').replace(/,/g, ''), 10); // Parse price string to integer
         carMap.set(carName[i], parsedPrice); // Store car name and parsed price in the map
}

// Sort the map by value (parsed prices) in ascending order
const sortedCarMap = new Map([...carMap.entries()].sort((a, b) => a[1] - b[1]));


// Convert the sorted map to an array of entries and select the first three entries
const firstThreeEntries = [...sortedCarMap.entries()].slice(0, 3);

// Print the first three entries
addStep("Printing first 3 lowest price car names in console: ", )
console.log("Lowest price list (First three):");
firstThreeEntries.forEach(([car, price]) => {
    console.log(car + " : ₹ " + price);
});     
             
       })
    }
})

after(async () => {
  await browser.pause(10000)
   // await browser.saveScreenshot("screenshot.png");
});