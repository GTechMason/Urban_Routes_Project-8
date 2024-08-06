const page = require('../../page');
const helper = require('../../helper')

const fromAddress = 'East 2nd Street, 601';
const toAddress = '1300 1st St';
const countryCode = "+1";
const cardNumber = 123400004321;
const cvvCode = 12;
const message = 'Here we go again!';
const iceCreamCount = 2;

describe('Create an order', () => {
    
    it('should enter address', async () => {
        await browser.url(`/`);
        await page.fillAddresses(fromAddress, toAddress);
        
        await expect(await $(page.fromField)).toHaveValue(fromAddress);
        await expect(await $(page.toField)).toHaveValue(toAddress);
    })

    it('should select Supportive ride', async () => {
        await browser.url(`/`);
        await page.fillAddresses(fromAddress, toAddress);
        await page.callATaxi();
       
        if (!(await page.isSupportivePlanActive())) {
            await page.selectSupportivePlan();
        }

        await expect(await page.isSupportivePlanActive()).toBe(true);
    })

    it('should enter phone number', async () => {
        await browser.url(`/`);
        await page.fillAddresses(fromAddress, toAddress);
        await page.callATaxi();

        const phoneNumber = helper.getPhoneNumber(countryCode);
        await page.submitPhoneNumber(phoneNumber);

        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })

    it('should add a credit card', async () => {
        await browser.url(`/`);
        await page.fillAddresses(fromAddress, toAddress);
        await page.callATaxi();
        await page.addCard(cardNumber, cvvCode);

        const cardRow = await $(page.cardRow);
        await cardRow.waitForDisplayed();

        await expect(cardRow).toBeDisplayed();
    })

    it('should write a message to the driver', async () => {
        await browser.url(`/`);
        await page.fillAddresses(fromAddress, toAddress);
        await page.callATaxi();
        await page.fillMessageToTheDriver(message);

        const messageToTheDriverField = await $(page.messageToTheDriverField);
        await messageToTheDriverField.waitForDisplayed();

        await expect(await messageToTheDriverField.getValue()).toBe(message);
    })

    it('should select Blanket and Handkerchiefs', async () => {
        await browser.url(`/`);
        await page.fillAddresses(fromAddress, toAddress);
        await page.callATaxi();

        if (!(await page.isSupportivePlanActive())) {
            await page.selectSupportivePlan();
        }
        
        if (!(await page.isBlanketAndHandkerchiefsSwitchChecked())) {
            await page.selectBlanketsAndHandkerchief();
        }

        await expect(await page.isBlanketAndHandkerchiefsSwitchChecked()).toBe(true);
    })

    it('should add two ice creams', async () => {
        await browser.url(`/`);
        await page.fillAddresses(fromAddress, toAddress);
        await page.callATaxi();

        if (!(await page.isSupportivePlanActive())) {
            await page.selectSupportivePlan();
        }

        if (await page.getIceCreamCount() === 0) {
            await page.addIceCream(iceCreamCount)
        }

        await expect(await page.getIceCreamCount()).toBe(iceCreamCount);
    })

    it('should make car search modal appear', async () => {
        await browser.url(`/`)
        await page.fillAddresses(fromAddress, toAddress);
        await page.callATaxi();

        if (!(await page.isSupportivePlanActive())) {
            await page.selectSupportivePlan();
        }

        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await page.addCard(cardNumber, cvvCode);
        await page.closeCardModal()
        await page.fillMessageToTheDriver(message);    
        
        if (!(await page.isBlanketAndHandkerchiefsSwitchChecked())) {
            await page.selectBlanketsAndHandkerchief();
        }
        
        if (await page.getIceCreamCount() === 0) {
            await page.addIceCream(iceCreamCount)
        }

        await page.clickOrderButton();

        const orderBody = await $(page.orderBody);
        await orderBody.waitForDisplayed();
        
        await expect(orderBody).toBeDisplayed();
    })
})