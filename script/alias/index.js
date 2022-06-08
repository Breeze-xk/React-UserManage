const path = require("path");
function resolve(dir) {
  return path.join(__dirname, "../..", dir);
}
debugger;
module.exports = function (env) {
  return {
    "@": resolve("src"),
    serverEnvConfig: resolve("src/serverEnvConfig/" + env),
    utils: resolve("src/utils"),
  };
};