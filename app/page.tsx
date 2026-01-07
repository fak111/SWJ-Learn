'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Headphones, EyeOff, Mic, Sparkles, ArrowRight, Activity, Globe } from 'lucide-react';

export default function LandingPage() {
    const [activeModal, setActiveModal] = useState<'angel' | 'milk' | null>(null);

    const angelQrSrc = '/assets/wxq.png';
    const milkTeaQrSrc = '/assets/wxzf.png';
    const documentationUrl = 'https://ai.feishu.cn/wiki/FRYBw8zXUiv4nWkd9FOcXhWRnTc?from=from_copylink';
    const githubUrl = 'https://github.com/fak111/SWJ-Learn';

    return (
        <div className="min-h-screen font-sans bg-slate-50 text-slate-900 overflow-x-hidden selection:bg-indigo-200 selection:text-indigo-900">

            <div className="fixed top-4 right-4 z-50 flex flex-wrap justify-end gap-2">
                <button
                    onClick={() => setActiveModal('angel')}
                    className="flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm text-pink-700 border border-pink-200 px-3 py-1.5 text-sm font-medium transition hover:bg-pink-50 shadow-sm"
                >
                    <span>🎁</span>
                    <span className="hidden sm:inline">成为天使用户</span>
                </button>
                <button
                    onClick={() => setActiveModal('milk')}
                    className="flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm text-amber-700 border border-amber-200 px-3 py-1.5 text-sm font-medium transition hover:bg-amber-50 shadow-sm"
                >
                    <span>☕</span>
                    <span className="hidden sm:inline">请作者喝杯奶茶</span>
                </button>
                <a
                    href={documentationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 shadow-sm"
                >
                    Doc
                </a>
                <a
                    href={githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 shadow-sm"
                >
                    GitHub
                </a>
            </div>

            <div className="relative text-white pb-20 pt-12 sm:pt-24 px-6 overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-500 to-cyan-500">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none opacity-60"></div>
                <div className="absolute bottom-0 right-0 w-[800px] h-[400px] bg-indigo-400/15 rounded-full blur-[80px] pointer-events-none opacity-40"></div>

                <div className="relative max-w-4xl mx-auto text-center z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8 animate-fade-in-up">
                        <Headphones size={14} className="text-cyan-300" />
                        <span className="text-xs font-semibold tracking-wider uppercase text-white">Vibe Language</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6 drop-shadow-lg">
                        用AI重塑 <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-white">语言学习体验</span>
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg sm:text-xl text-white/90 leading-relaxed mb-10">
                        沉浸式AI对话 + 精听训练,让语言学习回归本能。突破听力瓶颈,培养真实语感,在对话中自然掌握语言。
                    </p>

                    <div className="grid grid-cols-3 gap-6 mb-10 max-w-2xl mx-auto">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">1K+</div>
                            <div className="text-white/80 text-sm">活跃用户</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">95%</div>
                            <div className="text-white/80 text-sm">学习效率提升</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">24/7</div>
                            <div className="text-white/80 text-sm">AI陪伴学习</div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                        <Link
                            href="/vibe"
                            className="group inline-flex items-center gap-3 bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300"
                        >
                            Vibe Language
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            href="/world"
                            className="group inline-flex items-center gap-3 border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-indigo-600 hover:scale-105 transition-all duration-300"
                        >
                            Listen to Stories
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>


            <section className="py-24 px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">为什么选择 Vibe Language?</h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            结合最新的AI技术与语言学习科学,为您打造个性化、高效率的学习体验
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-8 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
                            <div className="w-16 h-16 bg-indigo-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Sparkles className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">AI 智能剧场</h3>
                            <p className="text-slate-600 leading-relaxed">
                                在剧场AI练习,获得即时反馈和纠正,提升听力水平
                            </p>
                        </div>

                        <div className="text-center p-8 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
                            <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Headphones className="w-8 h-8 text-cyan-500" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">精听训练</h3>
                            <p className="text-slate-600 leading-relaxed">
                                通过分级听力材料和科学训练方法,系统提升听力理解能力
                            </p>
                        </div>

                        <div className="text-center p-8 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
                            <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Activity className="w-8 h-8 text-amber-500" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">个性化学习</h3>
                            <p className="text-slate-600 leading-relaxed">
                                AI分析学习数据,制定专属学习计划,让每一步都走在正确的道路上
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-32 px-6 text-white text-center relative overflow-hidden bg-gradient-to-br from-indigo-600 to-indigo-800">
                <div className="absolute inset-0 bg-indigo-900/20"></div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <Globe size={48} className="mx-auto mb-8 text-cyan-300 opacity-90" />
                    <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-8 drop-shadow-lg">
                        准备好开始您的语言学习之旅了吗?
                    </h2>
                    <p className="text-xl text-white/90 mb-8 leading-relaxed">
                        加入数万学习者的行列,用AI技术让语言学习变得更高效、更有趣
                    </p>
                    <Link
                        href="/world"
                        className="inline-block bg-white text-indigo-600 px-10 py-5 rounded-full font-bold text-xl shadow-lg hover:shadow-white/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                    >
                        免费开始
                    </Link>
                </div>
            </section>

            {activeModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-slate-900/60"
                        onClick={() => setActiveModal(null)}
                    />
                    <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
                        <div className="text-right">
                            <button
                                onClick={() => setActiveModal(null)}
                                className="text-slate-400 hover:text-slate-600"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="text-center space-y-3">
                            <h3 className="text-xl font-semibold text-slate-900">
                                {activeModal === 'angel' ? '成为天使用户' : '请作者喝杯奶茶'}
                            </h3>
                            <p className="text-sm text-slate-500">微信扫码完成支持</p>
                            <img
                                src={activeModal === 'angel' ? angelQrSrc : milkTeaQrSrc}
                                alt={activeModal === 'angel' ? '微信支付二维码' : '微信账号二维码'}
                                className="w-full rounded-xl border border-slate-100"
                            />
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
