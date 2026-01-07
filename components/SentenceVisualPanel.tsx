'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { AppMode, Conversation } from '../types';

interface SentenceVisualPanelProps {
    conversation: Conversation;
    activeSentenceIndex: number;
    mode: AppMode;
}

// 简单埋点包装，后续可接入真实埋点系统
const track = (event: string, payload?: Record<string, any>) => {
    // eslint-disable-next-line no-console
    console.log('[analytics]', event, payload);
};

const resolveImageUrl = (raw?: string): string | null => {
    if (!raw) return null;
    // 兼容已经带 / 前缀的完整路径
    if (raw.startsWith('/')) return raw;
    return `/${raw}`;
};

const GLOBAL_FALLBACK_IMAGE = '/assets/free-listen.png';
const ERROR_FALLBACK_IMAGE = '/assets/embrace-freedom.png';

const SentenceVisualPanel: React.FC<SentenceVisualPanelProps> = ({
    conversation,
    activeSentenceIndex,
    mode,
}) => {
    // 仅在 Study 模式下展示
    if (mode !== AppMode.STUDY) {
        return null;
    }

    const [displayedUrl, setDisplayedUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);

    // 计算当前期望展示的图片 URL（包含各种回退逻辑）
    const targetImageUrl = useMemo(() => {
        let url: string | null = null;

        // 优先使用当前激活句的专属图片
        if (
            activeSentenceIndex >= 0 &&
            activeSentenceIndex < conversation.sentences.length
        ) {
            const sentence = conversation.sentences[activeSentenceIndex];
            url = resolveImageUrl(sentence.img);
        }

        // 若当前句没有图，尝试使用 lesson 级封面
        if (!url && conversation.coverImg) {
            url = resolveImageUrl(conversation.coverImg);
        }

        // 再没有则兜底使用全局占位图
        if (!url) {
            url = GLOBAL_FALLBACK_IMAGE;
        }

        return url;
    }, [activeSentenceIndex, conversation]);

    // 当 targetImageUrl 变化时，更新展示图片并触发加载状态
    useEffect(() => {
        if (!targetImageUrl) return;

        setIsLoading(true);
        setHasError(false);
        setDisplayedUrl(targetImageUrl);

        const sentence =
            activeSentenceIndex >= 0 &&
                activeSentenceIndex < conversation.sentences.length
                ? conversation.sentences[activeSentenceIndex]
                : null;

        track('study_sentence_image_show', {
            lessonId: conversation.id,
            sentenceIndex: activeSentenceIndex,
            hasCustomImg: !!sentence?.img,
        });
    }, [targetImageUrl, activeSentenceIndex, conversation]);

    // 预加载相邻句子的图片，减少切换白屏
    useEffect(() => {
        const offsets = [-2, -1, 1, 2];
        offsets.forEach((offset) => {
            const idx = activeSentenceIndex + offset;
            if (idx < 0 || idx >= conversation.sentences.length) return;
            const img = conversation.sentences[idx].img;
            const url = resolveImageUrl(img || undefined);
            if (!url) return;
            const image = new Image();
            image.src = url;
        });
    }, [activeSentenceIndex, conversation]);

    if (!displayedUrl) {
        return null;
    }

    const showUrl = hasError ? ERROR_FALLBACK_IMAGE : displayedUrl;

    return (
        <div className="w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-slate-900/80 max-w-[420px] mx-auto aspect-square flex items-center justify-center">
                {/* 图片本身 */}
                <img
                    key={showUrl}
                    src={showUrl}
                    alt={conversation.title}
                    className={`w-full h-full object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'
                        } animate-fade-in`}
                    onLoad={() => {
                        setIsLoading(false);
                        setHasError(false);
                    }}
                    onError={() => {
                        setIsLoading(false);
                        setHasError(true);
                    }}
                />

                {/* 加载骨架屏 */}
                {isLoading && (
                    <div className="absolute inset-0 bg-slate-800/60 animate-pulse" />
                )}

                {/* 电影感暗角蒙层 */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/30 to-transparent" />

                {/* 左下角场景信息 */}
                <div className="absolute bottom-3 left-4 text-xs sm:text-sm text-slate-100/80">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/60 backdrop-blur-md border border-slate-700/60">
                        <span className="font-semibold">
                            {conversation.title}
                        </span>
                        {activeSentenceIndex >= 0 && (
                            <span className="text-slate-300/80">
                                Scene {activeSentenceIndex + 1}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SentenceVisualPanel;


