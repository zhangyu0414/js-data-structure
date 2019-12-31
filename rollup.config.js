import typescript from "@rollup/plugin-typescript";

export default [
  {
    input: "src/queue/index.ts",
    output: {
      file: "lib/queue/index.js",
      format: "umd",
      name: "Queue"
    },
    plugins: [typescript()]
  },
  {
    input: "src/linked-list/index.ts",
    output: {
      file: "lib/linked-list/index.js",
      format: "umd",
      name: "LinkedList"
    }
  },
  {
    input: "src/linked-list/index.ts",
    output: {
      file: "fragment/linked-list/index.js",
      format: "iife",
      name: "LinkedList"
    }
  },
  {
    input: "src/queue/index.ts",
    output: {
      file: "fragment/queue/index.js",
      format: "iife",
      name: "Queue"
    },
    plugins: [typescript()]
  }
];
