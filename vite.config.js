import { defineConfig } from 'vite';
import { resolve } from 'path';
import { glob } from 'glob';

const root = 'src';
const htmlFiles = glob.sync('src/**/*.html');

const transformedObject = htmlFiles.reduce((acc, item) => {
  const directory = item.split('/')[1];
  const fileName = item.split('/').pop().replace('.html', '');
  const key = `${directory}_${fileName}`;
  acc[key] = resolve(__dirname, `${item}`);
  return acc;
}, {});

export default defineConfig({
  root: root,
  publicDir: '../public',
  build: {
    outDir: '../dist',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.')[1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }
          if (extType === 'css') {
            return `assets/css/[name].css`;
          }
          return `assets/${extType}/[name][extname]`;
        },
        chunkFileNames: `assets/js/[name].js`,
        entryFileNames: `assets/js/[name].js`,
      },
      input: {
        ...transformedObject,
      },
    },
    server: {
      port: 3000,
    },
  },
});
