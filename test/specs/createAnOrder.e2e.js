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
       
        if (!(await page.isSupportivePlanSelected())) {
            await page.selectSupportivePlan();
        }

        await expect(await page.isSupportivePlanSelected()).toBe(true);
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

        if (!(await page.isSupportivePlanSelected())) {
            await page.selectSupportivePlan();
        }
        
        if (!(await page.isBlanketAndHandkerchiefsSwitchInputChecked())) {
            await page.selectBlanketsAndHandkerchief();
        }

        await expect(await page.isBlanketAndHandkerchiefsSwitchInputChecked()).toBe(true);
    })

    it('should add two ice creams', async () => {
        await browser.url(`/`);
        await page.fillAddresses(fromAddress, toAddress);
        await page.callATaxi();

        if (!(await page.isSupportivePlanSelected())) {
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

        if (!(await page.isSupportivePlanSelected())) {
            await page.selectSupportivePlan();
        }

        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await page.addCard(cardNumber, cvvCode);
        await page.closeCardModal()
        await page.fillMessageToTheDriver(message);    
        
        if (!(await page.isBlanketAndHandkerchiefsSwitchInputChecked())) {
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
    
    it('should make driver info appear', async () => {
        await browser.url(`/`)
        await page.fillAddresses(fromAddress, toAddress);
        await page.callATaxi();

        if (!(await page.isSupportivePlanSelected())) {
            await page.selectSupportivePlan();
        }

        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await page.addCard(cardNumber, cvvCode);
        await page.closeCardModal()
        await page.fillMessageToTheDriver(message);    
        
        if (!(await page.isBlanketAndHandkerchiefsSwitchInputChecked())) {
            await page.selectBlanketsAndHandkerchief();
        }
        
        if (await page.getIceCreamCount() === 0) {
            await page.addIceCream(iceCreamCount)
        }

        await page.clickOrderButton();

        const orderBody = await $(page.orderBody);
        await orderBody.waitForDisplayed();
        
        const orderHeaderTime = await $(page.orderHeaderTime);
        await orderHeaderTime.waitForDisplayed();

        const waitingTimeText = await orderHeaderTime.getText();
        const watingTimeTextArray = waitingTimeText.split(':');
        const watingTimeMinutes = Number(watingTimeTextArray[0]);
        const watingTimeSeconds = Number(watingTimeTextArray[1]);
        const totalWatingTimeMilliseconds = (watingTimeMinutes * 60 + watingTimeSeconds) * 1000;

        await orderHeaderTime.waitUntil(async function() {
                return (await this.getText()) === "00:01";
            }, {timeout: totalWatingTimeMilliseconds});

        const theDriverWillArriveLabel = await $(page.theDriverWillArriveLabel);
        await theDriverWillArriveLabel.waitForDisplayed();

        await expect(theDriverWillArriveLabel).toBeDisplayed();
    })
})