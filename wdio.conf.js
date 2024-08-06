exports.config = {

    runner: 'local',
    
    specs: [
        './test/specs/**/*.js'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
   
    maxInstances: 5,
   
    capabilities: [
        {
          browserName: 'firefox',
          'moz:firefoxOptions': {
            args: ['-headless']
          }
        }
      ],

   
    logLevel: 'error',
   
    bail: 0,

  baseUrl: 'https://cnt-c89acd26-b5dc-4979-9804-dd169aeec790.containerhub.tripleten-services.com',


    waitforTimeout: 12000,

    connectionRetryTimeout: 120000,

    connectionRetryCount: 3,

    services: [ 'firefox-profile', 'intercept'],


    framework: 'mocha',
  
    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
}