// import node from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested';
// import replace from 'rollup-plugin-replace';
import typescript from 'rollup-plugin-typescript';

// import includePaths from "rollup-plugin-includepaths";
import globby from 'globby';

// let includePathOptions = {
//   include: {},
//   paths: ["./src"],
//   external: [],
//   extensions: [".js", ".json", ".less"]
// };

const globals = {
  require: 'require',
};

var env = process.env;

console.log(env);

var ifProduction = (is, otherwise) =>
  env.BUILD === 'production' ? is || true : otherwise || false;

var plugins = [
  typescript({ lib: ['es5', 'es6', 'es7', 'dom'], target: 'es5', tsconfig: 'tsconfig.json' }),
  commonjs({
    extensions: ['.js'],
  }),
  // node({ browser: true, preferBuiltins: false }),
  // includePaths(includePathOptions),
  // replace({
  //   'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV || 'developement'),
  // }),
  postcss({
    modules: true,
    minimize: ifProduction(),
    sourceMap: ifProduction(false, 'inline'),
    plugins: [
      postcssNested,
      autoprefixer({
        browsers: ['> 0.04%'],
      }),
    ],
  }),
];

if (ifProduction()) {
  plugins.push(terser());
}

let output = {
  exports: 'named',
  format: 'esm',
  sourcemap: true,
  compact: true,
};

let elements = globby.sync('./packages/**/src/*[^d].ts');
export default elements.map(el => ({
  input: el,
  output: Object.assign({ file: el.replace('/src', '') }, output),
  plugins,
}));
