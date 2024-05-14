
import Base from '../pageobjects/base.js'

import TestData from '../data/testdata.js'
import { User } from '../data/user.js';
import * as locators from '../pageobjects/locators.js';
import  Controls from '../pageobjects/actions.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


before(async ()=>{
    await Base.open("The Internet","login")        
})

let peoples: User[]; // Declare people here to have it available in the scope of the describe block
peoples = await TestData.readUserData(); // Await the Promise to get the actual data
describe("App login", () => {
    
    for (const people of peoples) {
        it(`valid login  for user ${people.username}, ${people.password}`, async () => {
            await Controls.setValueToTextBox(locators.userName, people.username)
            await Controls.setValueToTextBox(locators.password, people.password)
            await Controls.click(locators.submit)
            await Controls.isExisting(locators.flash, 5000, 1000)
            await Controls.isDisplayed(locators.flash)
            await Controls.isTextPresent(locators.flash, people.expected )
        })
    }
})


// after(async () => {
//     const fileName = path.basename(__filename);
//     await browser.saveScreenshot(fileName + ".png");
// });