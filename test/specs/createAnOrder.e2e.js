const page = require('../../page');
const helper = require('../../helper')

const fromAddress = 'East 2nd Street, 601';
const toAddress = '1300 1st St';
const message = 'Oh boy, here we go again';
const iceCream = 2;


describe('Create an order', () => {

    it('should enter correct addresses', async () => {
        await browser.url(`/`)
        await page.fillAddresses(fromAddress, toAddress);

        await expect(await $(page.fromField)).toHaveValue(fromAddress);
        await expect(await $(page.toField)).toHaveValue(toAddress);
    })

    it('should select supportive ride', async () => {
        await browser.url(`/`);
        await page.fillAddresses(fromAddress, toAddress);
        await page.callATaxi();
       
        if (!(await page.isSupportivePlanSelected())) {
            await page.selectSupportivePlan();
        }

        await expect(await page.isSupportivePlanSelected()).toBe(true);
    })

    it('should enter phone number', async () => {
        await browser.url(`/`)
        await page.fillAddresses(fromAddress, toAddress);
        await page.callATaxi();
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })

    it('should enter credit card', async () => {
        await browser.url(`/`)
        await page.fillAddresses(fromAddress, toAddress);
        await page.callATaxi();
        await page.addCard(123400004321, 12);

        const cardRow =await $(page.cardRow);
        await cardRow.waitForDisplayed();

        await expect(cardRow).toBeDisplayed();
    })

})
