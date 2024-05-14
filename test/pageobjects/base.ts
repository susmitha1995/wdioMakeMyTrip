
import dotenv from 'dotenv';

class Base {
    async open(applicationName: string, pathVar: string): Promise<void> {
        switch(applicationName) {
            case "The Internet":
                await browser.url(process.env.baseURLInternetHerokuApp + pathVar);
                break;
               // Add other cases as needed for different applications
            case "makemytrip":
                await browser.url(process.env.baseURLMakeMyTrip+pathVar);
        }
    }
}

// Load environment variables from the specified path
dotenv.config({ path: './test/env/loginCredentials.env' });

// Export an instance of the Base class
export default new Base();