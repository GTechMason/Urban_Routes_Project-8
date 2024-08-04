exports.config = {

    runner: 'local',
    
    specs: [
        './test/specs/**/*.js'
    ],
    // Patterns to exclude.
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

  baseUrl: 'https://cnt-6db80b83-2f4e-4f51-9f41-c6149bfab9d5.containerhub.tripleten-services.com',


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