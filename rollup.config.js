import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/app.ts',
  output: {
    file: 'dist/js.txt',
    format: 'cjs'
  },
  external: [],
  plugins: [typescript({ tsconfig: './tsconfig.json' }), commonjs(), nodeResolve()]
};
