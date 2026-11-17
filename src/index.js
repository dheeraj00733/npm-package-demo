// Main application entry point
const { config } = require("./config");

function main() {
  console.log("Demo application running. Environment:", config.env);
}

module.exports = { main };
