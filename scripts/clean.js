const globby = require("globby");
const fs = require("fs");
const path = require("path");

l = (...a) => {
  console.log(a);
  return a[0];
};
globby("../packages/**/*{.js|.js.map|.d.ts}").then((err, files) =>
  Promise.all(l(err, files).map(fs.promises.unlink.bind(fs)))
);
