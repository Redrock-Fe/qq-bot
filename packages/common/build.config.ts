export default {
  entries: ["./src/index"],
  // Generates .d.ts declaration file
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
};
