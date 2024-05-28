import Library from '../pageobjects/library.js'

 
 class Controls{
    static async setValueToTextBox(loc : string, txtToEnter : string){
        await $(loc).setValue(txtToEnter)
   }

   static async waitTillElementNotVisible(loc : string){
    const elementSize = await $$(loc).then(elements => elements.length);
    if (elementSize>0) {
        Controls.isExisting(loc,60000, 3000)
    }        
   }
   
   static async  click(loc : string){
    const elementSize = await $$(loc).then(elements => elements.length);
    if (elementSize>0) {
        Library.waitTillElementClicked(loc)
        await $(loc).click()
    }    
   }
   static async getCurrentURLcontaintTxt(text: string){
      // Get the current URL
      const currentUrl = await browser.getUrl();
      // Check if the URL contains the specified text
      const isTextInUrl =  currentUrl.includes(text);
      // Assert that the URL contains the text
      await expect(isTextInUrl).toBe(true);
   }

   static async scrollTillTheElementVisible(loc: string){
    const element = await $(loc); // loc is the selector for the element you want to scroll to
    await element.scrollIntoView();
   }

   static async getElementCount(loc: string){
    const elements = await $$(loc);
    return elements.length;
}
   static async isDisplayed(loc : string){
    await expect($(loc)).toBeDisplayed();
   }
   static async isExisting(loc : string, timeout : number, interval : number){
    await browser.waitUntil(async () => {
        return (await $(loc).isExisting());
    }, {
        timeout: timeout,
        interval: interval,
        timeoutMsg: 'Element did not exist within 60 seconds'
    });
   }


   static async isTextPresent(loc : string, txtToCheck: string){
    await expect($(loc)).toHaveText(expect.stringContaining(txtToCheck))
   }
   static async getTexts(loc: string): Promise<string[]> {
    const elements = await $$(loc);
    let texts: string[] = [];
    for (const element of elements) {
        const text = await element.getText();
        texts.push(text);
    }
    return texts;
}


static async getText(loc:string){
    return $(loc).getText();
}



// Method to select a dropdown option by visible text
static async dropdownSelectByText(selector: string, text: string) {
  
    const element = await $(selector);
    await element.selectByVisibleText(text);
    
}

}




export default Controls;