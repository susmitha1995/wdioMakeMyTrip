
class Library{
    static async waitTillElementClicked(loc : string){
       // Wait until the element is clickable
       await $(loc).waitUntil(async () => {
        return (await $(loc).isClickable());
    }, {
        timeout: 5000, // Timeout in milliseconds
        timeoutMsg: 'Element is not clickable within 5 seconds'
    });

    }


   
}

export default Library;