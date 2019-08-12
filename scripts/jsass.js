const fs = require("fs");
const globby = require("globby");
const prettier = require("prettier");
const sass = require("sass");
const path = require("path");

let jscss = style =>
  prettier.format(String.raw`
    import {unsafeCSS} from 'lit-element';
    export default ${"unsafeCSS('" + style.css.toString() + "');"}
  `);

(async () => {
  let styles = globby.sync(
    path.join(__dirname, "../packages/*/src/*.s{a|c}ss")
  );
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
          return fs.promises.writeFile(
            path.replace("/src", "").replace(/s[ac]ss$/, "style.js"),
            output
          );
        })
    )
  );
})();
