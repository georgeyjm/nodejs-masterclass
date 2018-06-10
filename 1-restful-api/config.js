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
    port: 3000,
};

// Production environment
environments.production = {
    envName: 'production',
    port: 5000
};

// Export exvironment
let currentEnv = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';
let env = typeof(environments[currentEnv]) === 'object' ? environments[currentEnv] : environments.staging;
module.exports = env;
