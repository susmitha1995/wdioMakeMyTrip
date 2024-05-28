
class Library{
    static async waitTillElementClicked(loc : string){
       // Wait until the element is clickable
       await $(loc).waitUntil(async () => {
        await browser.pause(3000)
        return (await $(loc).isClickable());
        
    }, {
        timeout: 60000, // Timeout in milliseconds
        timeoutMsg: 'Element is not clickable within 30 seconds'
    });

    }


   
}

export default Library;