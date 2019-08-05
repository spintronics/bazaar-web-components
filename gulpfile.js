require = require("esm")(module);
const { task, series, parallel, src, dest, watch } = require("gulp");
const globby = require("globby");
const fs = require("fs");
const path = require("path");
const child = require("child_process");
const pkg = require("./package.json");
const sass = require("sass");
const { promisify } = require("util");
const prettier = require("prettier");
const { converge } = require("ramda");

let { unlink, writeFile, readFile } = fs.promises;

task("clean", _ => {
  return globby([
    "packages/[!node_modules]**/*{.js|.js.map|.d.ts|.ts.map}",
    "packages/**/.tsbuildinfo"
  ]).then(files => Promise.all(files.map(unlink)));
});

task("styl", async _ => {
  let jscss = style =>
    prettier.format(String.raw`
    import {unsafeCSS} from 'lit-element';
    export default ${"unsafeCSS('" + style + "');"}
  `);
  let styles = await globby("packages/[!node_modules]**/src/*.s{c|a}ss");
  return Promise.all(
    styles.map(path =>
      new Promise((resolve, reject) => {
        sass.render(
          {
            file: path,
            outputStyle: "compressed"
          },
          (err, result) => {
            if (err) reject(err);
            resolve(result);
          }
        );
      })
        .then(jscss)
        .then(output => {
          return Promise.all([
            writeFile(path.replace(/s[ac]ss$/, "style.js"), output),
            writeFile(
              path.replace("/src", "").replace(/s[ac]ss$/, "style.js"),
              output
            )
          ]);
        })
    )
  );
});

task("build", series("clean", "styl"));
