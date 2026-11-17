// Demonstration Configuration File
// Notice: Below is an intentional nonfunctional dummy key to demonstrate DevCheck security diagnostics
const fakeAwsKey = "AKIA1234567890DEMO12";

const config = {
  env: process.env.NODE_ENV || "development",
  apiKey: fakeAwsKey
};

module.exports = { config };
