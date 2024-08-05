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
   
    capabilities: [
        {
          browserName: 'chrome',
          'goog:chromeOptions': {
            args: ['--headless', '--disable-gpu']
          }
        },
        {
          browserName: 'firefox',
          'moz:firefoxOptions': {
            args: ['-headless']
          }
        }
      ],

   
    logLevel: 'error',
   
    bail: 0,

  baseUrl: 'https://cnt-e4f2bd3c-6150-49ff-85ff-b87e4d810342.containerhub.tripleten-services.com',


    waitforTimeout: 12000,

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