require = require("esm")(module);
const fs = require("fs");
const globby = require("globby");
const prettier = require("prettier");
const sass = require("sass");

let jscss = style =>
  prettier.format(String.raw`
    import {unsafeCSS} from 'lit-element';
    export default ${"unsafeCSS('" + style + "');"}
  `);

(async () => {
  let styles = await globby("../packages/[!node_modules]**/src/*.s{c|a}ss");
  console.log("styles", styles);
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
            fs.promises.writeFile(path.replace(/s[ac]ss$/, "style.js"), output),
            fs.promises.writeFile(
              path.replace("/src", "").replace(/s[ac]ss$/, "style.js"),
              output
            )
          ]);
        })
    )
  );
})();
