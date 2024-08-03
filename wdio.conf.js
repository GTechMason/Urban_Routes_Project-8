exports.config = {

    runner: 'local',

    specs: [
        './test/specs/**/*.js'
    ],

    exclude: [
        // 'path/to/excluded/files'
    ],

    maxInstances: 10,

    capabilities: [{
        browserName: 'chrome'
    }, {
        browserName: 'firefox'
    }],

    logLevel: 'error',

    bail: 0,

  baseUrl: 'https://cnt-69b22599-c95e-46d0-81b7-cb8b3993602b.containerhub.tripleten-services.com',

    waitforTimeout: 10000,
 
    connectionRetryTimeout: 120000,
   
    connectionRetryCount: 3,
   
    services: ['visual', 'firefox-profile', 'intercept'],

    framework: 'mocha',
 
    reporters: ['spec'],


    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

}
