import typescript from "@rollup/plugin-typescript";

export default {
  input: 'src/app.ts',
  output: {
    file: 'dist/js.txt',
    format: 'cjs'
  },
  plugins: [typescript()]
};
