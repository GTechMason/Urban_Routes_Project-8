module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    cardNumberField: '#number',
    cvvCodeField: '//input[@name="code"]',
    messageToTheDriverField: '#comment',

    // Labels
    messageToTheDriverLabel: '//label[starts-with(text(), "Message to the driver...")]',
    iceCreamCountLabel: '//div[starts-with(text(), "Ice cream")]/..//div[@class="r-counter"]//div[@class="counter"]//div[@class="counter-value"]',
    orderHeaderTime: '.order-header-time',
    theDriverWillArriveLabel: '//div[starts-with(text(), "The driver will arrive ")]',

    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: 'div.np-text=Phone number',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    paymentMethodButton: 'div.pp-text=Payment method',
        //finds element whether it's active or not
    supportivePlanCard: '//div[@class="tcard"]//div[starts-with(text(), "Supportive")]',
        //finds element if it's actvie only
    supportivePlanCardActive: '//div[@class="tcard active"]//div[starts-with(text(), "Supportive")]',
    submitButton: '//button[starts-with(text(), "Link")]',
    addIceCreamButton: '//div[starts-with(text(), "Ice cream")]/..//div[@class="r-counter"]//div[@class="counter"]//div[@class="counter-plus"]',
    closeAddCardButton: '.payment-picker .section.active .close-button',
    orderButton: '.smart-button-wrapper',

    // Switches 
    blanketAndHandkerchiefsSwitch: '//div[starts-with(text(), "Blanket and handkerchiefs")]/..//div[@class="r-sw"]',
    blanketAndHandkerchiefsSwitchInput: '.switch-input',

    // Rows
    addCardRow: '//div[@class="pp-row disabled"]//div[starts-with(text(), "Add card")]',
    cardRow: '//div[@class="pp-row"]//div[starts-with(text(), "Card")]',

    // Modals
    phoneNumberModal: '.modal',
    orderBody: '.order-body',
    

    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
    },
    callATaxi: async function() {
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    selectSupportivePlan: async function() {
        const supportivePlanCard = await $(this.supportivePlanCard);
        await supportivePlanCard.waitForDisplayed();
        await supportivePlanCard.click();
    },
    isSupportivePlanSelected: async function() {
        const supportivePlanCardActive = await $(this.supportivePlanCardActive);
        return supportivePlanCardActive.isDisplayed();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    fillMessageToTheDriver: async function(message) {
        const messageToTheDriverLabel = await $(this.messageToTheDriverLabel);
        await messageToTheDriverLabel.waitForDisplayed();
        await messageToTheDriverLabel.waitForClickable();
        await messageToTheDriverLabel.click();
        
        const messageToTheDriverField = await $(this.messageToTheDriverField);
        await messageToTheDriverField.waitForDisplayed();
        await messageToTheDriverField.setValue(message);
    },
    addCard: async function(cardNumber, cvvCode) {
        const paymentMethodButton = await $(this.paymentMethodButton);
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();

        const addCardRow = await $(this.addCardRow);
        await addCardRow.waitForDisplayed();
        await addCardRow.click();

        const cardNumberField = await $(this.cardNumberField);
        await cardNumberField.waitForDisplayed();
        await cardNumberField.setValue(cardNumber);

        const cvvCodeField = await $(this.cvvCodeField);
        await cvvCodeField.waitForDisplayed();
        await cvvCodeField.setValue(cvvCode);

        await browser.keys(['Tab']);

        const submitButton = await $(this.submitButton);
        await submitButton.waitForDisplayed();
        await submitButton.click();
    },
    closeCardModal: async function() {
        const closeAddCardButton = await $(this.closeAddCardButton);
        await closeAddCardButton.waitForDisplayed();
        await closeAddCardButton.click();
    },
    selectBlanketsAndHandkerchief: async function() {
        const blanketAndHandkerchiefsSwitch = await $(this.blanketAndHandkerchiefsSwitch);
        await blanketAndHandkerchiefsSwitch.waitForDisplayed();
        await blanketAndHandkerchiefsSwitch.click();
    },
    clickOrderButton: async function() {
        const orderButton = await $(this.orderButton);
        await orderButton.waitForDisplayed();
        await orderButton.click();
    },
    addIceCream : async function(count) {
        const addIceCreamButton = await $(this.addIceCreamButton);
        await addIceCreamButton.waitForDisplayed();
        
        for (let i = 0; i < count; i++) {
            await addIceCreamButton.click();
        }
    },
    getIceCreamCount : async function() {
        const iceCreamCountLabel = await $(this.iceCreamCountLabel);
        iceCreamCountLabel.waitForDisplayed();
        return Number(await iceCreamCountLabel.getText());
    },
    isBlanketAndHandkerchiefsSwitchInputChecked : async function() {
        const blanketAndHandkerchiefsSwitchInput = await $(this.blanketAndHandkerchiefsSwitchInput);
        return await blanketAndHandkerchiefsSwitchInput.isSelected();
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        //await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
};