/*
Create and export configuration variables for different environments
Set the ENV_NAME variable in command line using
  NODE_ENV=XXX node index.js
*/

// Container for all environments
let environments = {};

// Staging (default) environment
environments.staging = {
    envName: 'staging',
    httpPort: 3000,
    httpsPort: 3001
};

// Production environment
environments.production = {
    envName: 'production',
    httpPort: 5000,
    httpsPort: 5001
};

// Export exvironment
let currentEnv = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';
let env = typeof(environments[currentEnv]) === 'object' ? environments[currentEnv] : environments.staging;
module.exports = env;
