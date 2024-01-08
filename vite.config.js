import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
// import fs from 'fs';
// import path from 'path';

// const __filename = new URL(import.meta.url).pathname;
// const __dirname = path.dirname(__filename);
// https://vitejs.dev/config/
export default defineConfig({
  server: {  
    host: '0.0.0.0', // 或者你的具体 IP 地址，比如 '192.168.1.100'  
    port: 3000, // 你可以更改为你想要的端口号  
    // 其他服务器配置...  
  },  
  plugins: [
    vue(),
    vueJsx(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          // 在这里添加自定义的Less配置
        },
      },
    },
  },
  // server: {
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, 'localhost.key')),
  //     cert: fs.readFileSync(path.resolve(__dirname, 'localhost.crt')),
  //   },
  // },
})
