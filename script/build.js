const rollup = require("rollup");
const fs = require('fs');
const path = require('path');
const typescript = require("@rollup/plugin-typescript");

// 忽略的文件夹
const EXCLUDS_DIRS = ['_util']

const resolve = (str) => path.resolve(__dirname, str)

// linke-list => LinkedList
const toCamelCase = (str) => {
  return str
    .split("-")
    .reduce((a, c) => a + c.substr(0, 1).toLocaleUpperCase() + c.substr(1), "");
}

// 生成需构建的配置数组
const getBuilds = () => {
  const dirs = fs.readdirSync(resolve('../src'));
  const builds = [];

  dirs.forEach((name) => {
    if (EXCLUDS_DIRS.includes(name)) {
      return
    }
    const inputOpt = {
      input: resolve(`../src/${name}/index.ts`),
      plugins: [typescript()]
    }
    builds.push(
      {
        inputOpt,
        outputOpt: {
          file: resolve(`../lib/${name}.js`),
          name: toCamelCase(name),
          format: "umd"
        },
      },
      {
        inputOpt,
        outputOpt: {
          file: resolve(`../fragment/${name}.js`),
          name: toCamelCase(name),
          format: "iife"
        },
      },
    );
  })

  return builds;
}

async function run() {
  const builds = getBuilds()

  builds.forEach(async (config) => {
    const bundle = await rollup.rollup(config.inputOpt);
    await bundle.write(config.outputOpt);
  })
}

run();
