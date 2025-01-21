import vue from 'rollup-plugin-vue';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  external: ['axios', 'lodash.debounce', 'vue'],
  output: [
    {
      file: 'dist/vue2-dynamic-data-table.umd.js',
      format: 'umd',
      name: 'Vue2DynamicDataTable',
    },
    {
      file: 'dist/vue2-dynamic-data-table.esm.js',
      format: 'esm',
    },
  ],
  plugins: [
    vue({
      css: true, // Ensure styles are bundled correctly
      style: {
        preprocessors: {
          scss: true, // Enable SCSS support (optional)
        },
      },
    }),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env'],
      babelHelpers: 'bundled',
    }),
    terser(), // Optional: minify the output
  ],
};
