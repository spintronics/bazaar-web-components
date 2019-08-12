pkg = require("../package.json");
glob = require("globby");
path = require("path");
fs = require("fs");

packages = glob
  .sync(path.join(__dirname, "../packages/*/package.json"))
  .map(path => ({ path, json: require(path) }));

packages.forEach(({ path, json }) => {
  json.config = Object.assign(json.config || {}, pkg.config);
  fs.writeFileSync(path, JSON.stringify(json, null, 2), "utf8");
});
