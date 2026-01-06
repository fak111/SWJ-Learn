import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { WebSocketServer, WebSocket } from 'ws';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      react(),
      {
        name: 'minimax-ws-proxy',
        configureServer(server) {
          const wss = new WebSocketServer({ noServer: true });
          server.httpServer?.on('upgrade', (req, socket, head) => {
            if (req.url?.startsWith('/ws-minimax')) {
              wss.handleUpgrade(req, socket, head, (ws) => {
                const apiKey = env.VITE_MINIMAXI_API_KEY;
                console.log('🔌 代理连接到 MiniMax API...');
                const minimaxWs = new WebSocket('wss://api.minimaxi.com/ws/v1/t2a_v2', {
                  headers: { 'Authorization': `Bearer ${apiKey}` },
                  handshakeTimeout: 10000,
                });
                
                minimaxWs.on('open', () => {
                  console.log('✅ MiniMax WebSocket 已连接');
                });
                
                minimaxWs.on('message', (data) => {
                  if (ws.readyState === WebSocket.OPEN) {
                    ws.send(data);
                  }
                });
                
                minimaxWs.on('error', (err) => {
                  console.error('❌ MiniMax WebSocket 错误:', err.message);
                  if (ws.readyState === WebSocket.OPEN) {
                    ws.close(1011, err.message);
                  }
                });
                
                minimaxWs.on('close', () => {
                  if (ws.readyState === WebSocket.OPEN) {
                    ws.close();
                  }
                });
                
                ws.on('message', (data) => {
                  if (minimaxWs.readyState === WebSocket.OPEN) {
                    minimaxWs.send(data);
                  }
                });
                
                ws.on('close', () => {
                  if (minimaxWs.readyState === WebSocket.OPEN) {
                    minimaxWs.close();
                  }
                });
              });
            }
          });
        }
      }
    ],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.DEEPSEEK_API_KEY': JSON.stringify(env.VITE_DEEPSEEK_API_KEY),
      'process.env.MINIMAXI_API_KEY': JSON.stringify(env.VITE_MINIMAXI_API_KEY),
      'import.meta.env.VITE_DEEPSEEK_API_KEY': JSON.stringify(env.VITE_DEEPSEEK_API_KEY),
      'import.meta.env.VITE_DEEPSEEK_BASE_URL': JSON.stringify(env.VITE_DEEPSEEK_BASE_URL),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
