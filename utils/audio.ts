/**
 * 获取音频文件的完整 URL
 * 如果配置了 CDN，使用 CDN 地址；否则使用本地 assets 路径
 */
export function getAudioUrl(audioSource: string): string {
    // 如果已经是完整 URL，直接返回
    if (audioSource.startsWith('http://') || audioSource.startsWith('https://')) {
        return audioSource;
    }

    // 从环境变量读取 CDN 基础 URL
    const cdnBase = import.meta.env.VITE_AUDIO_BASE_URL;

    // 对于还未上传到 CDN 的本地音频（例如 CET-6 真题），强制走本地 assets
    // 目前已知的例子：2015.06_cet6_1.mp3
    const shouldUseLocalOnly = /2015\.06_cet6_/i.test(audioSource);

    if (cdnBase && !shouldUseLocalOnly) {
        // 确保 URL 末尾有斜杠
        const base = cdnBase.endsWith('/') ? cdnBase : `${cdnBase}/`;
        return `${base}${audioSource}`;
    }

    // 默认回退到本地 public/assets 目录
    return `assets/${audioSource}`;
}


