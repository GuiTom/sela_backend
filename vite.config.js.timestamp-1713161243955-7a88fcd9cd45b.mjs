// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///Users/rinorino/Desktop/work/sela_backend/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/rinorino/Desktop/work/sela_backend/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///Users/rinorino/Desktop/work/sela_backend/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import Components from "file:///Users/rinorino/Desktop/work/sela_backend/node_modules/unplugin-vue-components/dist/vite.js";
import { VantResolver } from "file:///Users/rinorino/Desktop/work/sela_backend/node_modules/@vant/auto-import-resolver/dist/index.esm.mjs";
import legacy from "file:///Users/rinorino/Desktop/work/sela_backend/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///Users/rinorino/Desktop/work/sela_backend/vite.config.js";
var vite_config_default = defineConfig({
  server: {
    host: "0.0.0.0",
    // 或者你的具体 IP 地址，比如 '192.168.1.100'  
    port: 3e3
    // 你可以更改为你想要的端口号  
    // 其他服务器配置...  
  },
  build: {
    target: "es2015"
    // 或者根据需要选择 'es5'
  },
  dev: {
    target: "es2015"
    // 或者根据需要选择 'es5'
  },
  plugins: [
    vue(),
    vueJsx(),
    Components({
      resolvers: [VantResolver()]
    }),
    legacy({
      targets: ["ie >= 11"]
      // 根据实际需求配置目标浏览器
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          // 在这里添加自定义的Less配置
        }
      }
    }
  }
  // server: {
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, 'localhost.key')),
  //     cert: fs.readFileSync(path.resolve(__dirname, 'localhost.crt')),
  //   },
  // },
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvcmlub3Jpbm8vRGVza3RvcC93b3JrL3NlbGFfYmFja2VuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3Jpbm9yaW5vL0Rlc2t0b3Avd29yay9zZWxhX2JhY2tlbmQvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3Jpbm9yaW5vL0Rlc2t0b3Avd29yay9zZWxhX2JhY2tlbmQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcblxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSc7XG5pbXBvcnQgeyBWYW50UmVzb2x2ZXIgfSBmcm9tICdAdmFudC9hdXRvLWltcG9ydC1yZXNvbHZlcic7XG5pbXBvcnQgbGVnYWN5IGZyb20gJ0B2aXRlanMvcGx1Z2luLWxlZ2FjeSc7XG4vLyBpbXBvcnQgZnMgZnJvbSAnZnMnO1xuLy8gaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbi8vIGNvbnN0IF9fZmlsZW5hbWUgPSBuZXcgVVJMKGltcG9ydC5tZXRhLnVybCkucGF0aG5hbWU7XG4vLyBjb25zdCBfX2Rpcm5hbWUgPSBwYXRoLmRpcm5hbWUoX19maWxlbmFtZSk7XG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgc2VydmVyOiB7ICBcbiAgICBob3N0OiAnMC4wLjAuMCcsIC8vIFx1NjIxNlx1ODAwNVx1NEY2MFx1NzY4NFx1NTE3N1x1NEY1MyBJUCBcdTU3MzBcdTU3NDBcdUZGMENcdTZCRDRcdTU5ODIgJzE5Mi4xNjguMS4xMDAnICBcbiAgICBwb3J0OiAzMDAwLCAvLyBcdTRGNjBcdTUzRUZcdTRFRTVcdTY2RjRcdTY1MzlcdTRFM0FcdTRGNjBcdTYwRjNcdTg5ODFcdTc2ODRcdTdBRUZcdTUzRTNcdTUzRjcgIFxuICAgIC8vIFx1NTE3Nlx1NEVENlx1NjcwRFx1NTJBMVx1NTY2OFx1OTE0RFx1N0Y2RS4uLiAgXG4gIH0sICBcbiAgYnVpbGQ6IHtcbiAgICB0YXJnZXQ6ICdlczIwMTUnLCAvLyBcdTYyMTZcdTgwMDVcdTY4MzlcdTYzNkVcdTk3MDBcdTg5ODFcdTkwMDlcdTYyRTkgJ2VzNSdcbiAgfSxcbiAgZGV2OntcbiAgICB0YXJnZXQ6ICdlczIwMTUnLCAvLyBcdTYyMTZcdTgwMDVcdTY4MzlcdTYzNkVcdTk3MDBcdTg5ODFcdTkwMDlcdTYyRTkgJ2VzNSdcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSgpLFxuICAgIHZ1ZUpzeCgpLFxuICAgIENvbXBvbmVudHMoe1xuICAgICAgcmVzb2x2ZXJzOiBbVmFudFJlc29sdmVyKCldLFxuICAgIH0pLFxuICAgIGxlZ2FjeSh7XG4gICAgICB0YXJnZXRzOiBbJ2llID49IDExJ10sIC8vIFx1NjgzOVx1NjM2RVx1NUI5RVx1OTY0NVx1OTcwMFx1NkM0Mlx1OTE0RFx1N0Y2RVx1NzZFRVx1NjgwN1x1NkQ0Rlx1ODlDOFx1NTY2OFxuICAgIH0pLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXG4gICAgfVxuICB9LFxuICBjc3M6IHtcbiAgICBsb2FkZXJPcHRpb25zOiB7XG4gICAgICBsZXNzOiB7XG4gICAgICAgIGxlc3NPcHRpb25zOiB7XG4gICAgICAgICAgLy8gXHU1NzI4XHU4RkQ5XHU5MUNDXHU2REZCXHU1MkEwXHU4MUVBXHU1QjlBXHU0RTQ5XHU3Njg0TGVzc1x1OTE0RFx1N0Y2RVxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICAvLyBzZXJ2ZXI6IHtcbiAgLy8gICBodHRwczoge1xuICAvLyAgICAga2V5OiBmcy5yZWFkRmlsZVN5bmMocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2xvY2FsaG9zdC5rZXknKSksXG4gIC8vICAgICBjZXJ0OiBmcy5yZWFkRmlsZVN5bmMocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2xvY2FsaG9zdC5jcnQnKSksXG4gIC8vICAgfSxcbiAgLy8gfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZTLFNBQVMsZUFBZSxXQUFXO0FBRWhWLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxZQUFZO0FBUHVLLElBQU0sMkNBQTJDO0FBYzNPLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQTtBQUFBLElBQ04sTUFBTTtBQUFBO0FBQUE7QUFBQSxFQUVSO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUE7QUFBQSxFQUNWO0FBQUEsRUFDQSxLQUFJO0FBQUEsSUFDRixRQUFRO0FBQUE7QUFBQSxFQUNWO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxXQUFXO0FBQUEsTUFDVCxXQUFXLENBQUMsYUFBYSxDQUFDO0FBQUEsSUFDNUIsQ0FBQztBQUFBLElBQ0QsT0FBTztBQUFBLE1BQ0wsU0FBUyxDQUFDLFVBQVU7QUFBQTtBQUFBLElBQ3RCLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gsZUFBZTtBQUFBLE1BQ2IsTUFBTTtBQUFBLFFBQ0osYUFBYTtBQUFBO0FBQUEsUUFFYjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU9GLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
