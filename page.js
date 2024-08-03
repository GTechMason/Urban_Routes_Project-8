module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    ppButton: 'div.pp-button.filled',
    paymentMethodButton: 'div.pp-text=Payment method',
    //finds element whether it's active or not
supportivePlanCard: '//div[@class="tcard"]//div[starts-with(text(), "Supportive")]',
    //finds element if it's actvie only
supportivePlanCardActive: '//div[@class="tcard active"]//div[starts-with(text(), "Supportive")]',
    // Modals
    phoneNumberModal: '.modal',
     // Rows
    addCardRow: '//div[@class="pp-row disabled"]//div[starts-with(text(), "Add card")]',
    cardRow: '//div[@class="pp-row"]//div[starts-with(text(), "Card")]',
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
    },
    callATaxi: async function(){
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
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
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
};
