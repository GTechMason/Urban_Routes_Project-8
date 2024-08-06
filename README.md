20240805

<h1>Urban Routes Tests:</h1>
    <p>In <a href ="https://webdriver.io/">WDIO</a> and using Describe and It statements we are able to create a series of automated tests.</p> <h6>NOTE: This is <a href = "https://www.mozilla.org/en-US/firefox/new/?redirect_source=firefox-com">Firefox</a> ONLY. Chrome has given multiple errors with modals exceeding wait times.</h6>
    <br>

<h3>1. Setting the address:</h3>
    <p>For this test we are finding the selectors "to" and "from" using their ID's and filling the address forms with constants at the top of the createAnOrder script for easy access to customize this variable for future testing. Utilizing page.js to assist us in filling out the form and cleaning up our repetitive functions. We are also using the await and expect functions to tell WDIO that we need to wait for certain conditions to be met before moving to the next step.</p>

<h3>2. Selecting Supportive plan:</h3>
    <p>For this test we are building on what we have set before and adding the use of the <button>Call a taxi</button> button. We are also using page.js to select a "Supportive" ride and confirm that its status changes.</p>

<h3>3. Filling in the phone number:</h3>
    <p>Building on what we've set before, though leaving behind selecting a plan, we add a helper.js to assist us in generating a unigue phone number and to help us get element by text. Then use intercept to recieve the verification code and then we enter the code received. The countryCode is a variable set at the top of the test for ease of use and customization.</p>

<h3>4. Adding a credit card:</h3>
    <p>Again building on our previous tests, we add a few steps to "Add" a credit card to the client account. In doing this we need to simulate the User clicking away to loose focus on the “Adding a card” modal to make the “link” button become active. Additionally we have the credit cardNumber and cvvCode set as variables at the top for customization.</p>

<h3>5. Writing a message for the driver:</h3>
    <p>Similarly as above, we are using the same steps as before. To add a custom message to the driver we are interfacing with a "Label" function to this form. This message is also a variable at the top of the test page.</p>

<h3>6. Ordering a Blanket and handkerchiefs:</h3>
    <p>We are also adding the function of a "switch" to this section of the tests, to select an available option. There are two separate selectors per "switch", one selector to click on and one to run an expect function to verify that the status changed.</3>

<h3>7. Ordering 2 Ice creams:</h3>
    <p>Similar to the "Message to the Driver". To add a number of "Ice Creams" we interface with a "Label" function on this form. Additionally similar to the Blanket and Hankerchief test, we verify the condition has been met. This number is also a variable at the top of the test page.</p>

<h3>8. The car search modal appears:</h3>
    <p>For the last test we apply all of the above and "Click" the <button>Order</button> button to complete the order process.</p>
    <br>

<h1>To run the series of tests:</h1> 
<p>Simply enter the prompt "npm run wdio" in Terminal within <a href = "https://code.visualstudio.com/">VS Code</a>.</p> 
<br>
<p>These tests were created an implemented in:</p>

VS Code Version: 1.92.0;

Commit: b1c0a14de1414fcdaa400695b4db1c0799bc3124;

Date: 2024-07-31T23:26:45.634Z;

Electron: 30.1.2;

ElectronBuildId: 9870757;

Chromium: 124.0.6367.243;

Node.js: 20.14.0;

V8: 12.4.254.20-electron.0;

OS: Darwin arm64 23.6.0;

<br>

<h4>QA Engineer</h4>
<h6>Graham Mason</h6>