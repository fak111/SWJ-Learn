/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEEPSEEK_API_KEY: string
  readonly VITE_DEEPSEEK_BASE_URL: string
  readonly VITE_AUDIO_BASE_URL: string  // 添加这一行
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

