import Library from '../pageobjects/library.js'

 
 class Controls{
    static async setValueToTextBox(loc : string, txtToEnter : string){
        await $(loc).setValue(txtToEnter)
   }
   static async  click(loc : string){
    const elementSize = await $$(loc).then(elements => elements.length);
    if (elementSize>0) {
        Library.waitTillElementClicked(loc)
        await $(loc).click()
    }    
   }

   static async scrollTillTheElementVisible(loc: string){
    const element = await $(loc); // loc is the selector for the element you want to scroll to
    await element.scrollIntoView();
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
   static async getTexts(loc: string) {
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

}

export default Controls;