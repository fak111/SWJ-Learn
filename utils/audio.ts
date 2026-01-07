/**
 * 获取音频文件的完整 URL
 * 如果配置了 CDN，使用 CDN 地址；否则使用本地 assets 路径
 */
export function getAudioUrl(audioSource: string): string {
    if (audioSource.startsWith('http://') || audioSource.startsWith('https://')) {
        return audioSource;
    }

    const cdnBase = process.env.NEXT_PUBLIC_AUDIO_BASE_URL;

    const shouldUseLocalOnly = /2015\.06_cet6_/i.test(audioSource);

    if (cdnBase && !shouldUseLocalOnly) {
        const base = cdnBase.endsWith('/') ? cdnBase : `${cdnBase}/`;
        return `${base}${audioSource}`;
    }

    return `assets/${audioSource}`;
}
