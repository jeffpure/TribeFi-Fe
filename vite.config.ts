import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  server: {
    hmr: true,
    cors: true,
    // proxy: {
    //   '/api': {
    //     target: ``,
    //     changeOrigin: true,
    //     // rewrite: path => path.replace(/^\/api/, ''),
    //   },
    // },
  },
  plugins: [
    react(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        // manualChunks 配置
        manualChunks: {
          // 将 React 相关库打包成单独的 chunk 中
          'react-vendor': ['react', 'react-dom', 'react-router-dom', 'react-redux', 'redux-persist'],
          // 将 Lodash 库的代码单独打包
          lodash: ['lodash'],
          // 将组件库的代码打包
          library: [
            'antd',
            '@ant-design/pro-components',
            '@emotion/core',
            '@emotion/css',
            '@emotion/react'
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1600,
  },
});
