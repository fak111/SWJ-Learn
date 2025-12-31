import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, Sparkles, Headphones, ArrowRight } from 'lucide-react';

export default function CategoryPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-950 to-slate-900 text-white">
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_#4f46e5_0,_transparent_55%),_radial-gradient(circle_at_bottom,_#f97316_0,_transparent_55%)]" />
                <div className="relative max-w-5xl mx-auto px-6 py-16 sm:py-24 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/60 border border-indigo-500/40 backdrop-blur-md mb-7">
                        <Headphones size={14} className="text-indigo-300" />
                        <span className="text-xs font-semibold tracking-wider uppercase text-slate-100">
                            Listening Worlds
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
                        选一段声音，
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-white">
                            开始一场小小的冒险
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg text-slate-200/90 max-w-2xl mx-auto mb-10 leading-relaxed">
                        从经典故事到考试真题，让耳朵先适应这个世界。
                        不只是“做题”，而是一次次和真实英语世界对线。
                    </p>
                </div>
            </section>

            {/* Category cards */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
                <div className="flex items-baseline justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">听力世界地图</h2>
                        <p className="text-sm text-slate-500">
                            先选一个世界，再在里面刷关卡。每个世界，都有自己的一套节奏和光。
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Little Prince World */}
                    <Link
                        to="/world/little-prince/"
                        className="group relative overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-slate-50 to-amber-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_top,_#4f46e5_0,_transparent_55%),_radial-gradient(circle_at_bottom_right,_#fb923c_0,_transparent_55%)] pointer-events-none" />
                        <div className="relative p-6 sm:p-7 flex flex-col h-full">
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-2xl bg-indigo-600/90 flex items-center justify-center shadow-lg shadow-indigo-300/50">
                                        <BookOpen className="text-amber-100" size={22} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                                            小王子：星球间的低语
                                            <Sparkles size={16} className="text-amber-400" />
                                        </h3>
                                        <p className="text-xs text-slate-600">
                                            经典英文原著 · 温柔语速 · 适合重建“听得懂”的自信
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-sm text-slate-700 leading-relaxed mb-4">
                                不再盯着字幕，而是第一次真正听见
                                <span className="font-semibold text-indigo-700 bg-indigo-50 px-1 rounded">
                                    每一句温柔
                                </span>
                                。每一章都是一个小星球，适合在睡前或清晨慢慢精听。
                            </p>

                            <div className="mt-auto flex items-center justify-between pt-3 border-t border-indigo-100/70">
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                                    <span className="px-2 py-0.5 rounded-full bg-white/80 border border-indigo-100 text-indigo-700">
                                        难度：中等
                                    </span>
                                    <span className="px-2 py-0.5 rounded-full bg-white/80 border border-slate-100">
                                        场景：故事沉浸
                                    </span>
                                    <span className="px-2 py-0.5 rounded-full bg-white/80 border border-slate-100">
                                        适合：重启听力 / 情绪低负担
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 text-xs font-bold text-indigo-700 group-hover:text-indigo-800">
                                    进入世界
                                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* CET-6 World */}
                    <Link
                        to="/world/cet6/"
                        className="group relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-slate-50 to-amber-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_top,_#10b981_0,_transparent_55%),_radial-gradient(circle_at_bottom_left,_#f97316_0,_transparent_55%)] pointer-events-none" />
                        <div className="relative p-6 sm:p-7 flex flex-col h-full">
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-2xl bg-emerald-600/90 flex items-center justify-center shadow-lg shadow-emerald-300/50">
                                        <GraduationCap className="text-emerald-50" size={22} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                                            六级听力：考场实战训练营
                                        </h3>
                                        <p className="text-xs text-slate-600">
                                            2015.06 真题音频 · 精听 + 听写 · 靠前的是你的耳朵
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-sm text-slate-700 leading-relaxed mb-4">
                                在正式考试前，让耳朵先经历
                                <span className="font-semibold text-emerald-700 bg-emerald-50 px-1 rounded">
                                    10 次考场
                                </span>
                                。盲听、学习、听写三种模式自由切换，让“听不清”的压力，在训练中慢慢被拆解。
                            </p>

                            <div className="mt-auto flex items-center justify-between pt-3 border-t border-emerald-100/70">
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                                    <span className="px-2 py-0.5 rounded-full bg-white/80 border border-emerald-100 text-emerald-700">
                                        难度：略高
                                    </span>
                                    <span className="px-2 py-0.5 rounded-full bg-white/80 border border-slate-100">
                                        场景：考试实战
                                    </span>
                                    <span className="px-2 py-0.5 rounded-full bg-white/80 border border-slate-100">
                                        适合：四六级备考 / 回炉强化
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
                                    进入世界
                                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Easy Stories World */}
                    <Link
                        to="/world/eazy-stories/"
                        className="group relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-slate-50 to-cyan-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_top,_#3b82f6_0,_transparent_55%),_radial-gradient(circle_at_bottom_left,_#06b6d4_0,_transparent_55%)] pointer-events-none" />
                        <div className="relative p-6 sm:p-7 flex flex-col h-full">
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-2xl bg-blue-600/90 flex items-center justify-center shadow-lg shadow-blue-300/50">
                                        <BookOpen className="text-blue-50" size={22} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                                            初中短篇故事
                                        </h3>
                                        <p className="text-xs text-slate-600">
                                            轻松短篇 · 语速适中 · 适合初学者建立信心
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-sm text-slate-700 leading-relaxed mb-4">
                                从简单的日常对话开始，让耳朵先适应
                                <span className="font-semibold text-blue-700 bg-blue-50 px-1 rounded">
                                    英语的节奏
                                </span>
                                。每个故事都很短，适合每天花几分钟精听，慢慢培养语感。
                            </p>

                            <div className="mt-auto flex items-center justify-between pt-3 border-t border-blue-100/70">
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                                    <span className="px-2 py-0.5 rounded-full bg-white/80 border border-blue-100 text-blue-700">
                                        难度：容易
                                    </span>
                                    <span className="px-2 py-0.5 rounded-full bg-white/80 border border-slate-100">
                                        场景：日常故事
                                    </span>
                                    <span className="px-2 py-0.5 rounded-full bg-white/80 border border-slate-100">
                                        适合：初学者 / 建立基础
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 text-xs font-bold text-blue-700 group-hover:text-blue-800">
                                    进入世界
                                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* IELTS 18 World */}
                    <Link
                        to="/world/ielts18/"
                        className="group relative overflow-hidden rounded-3xl border border-amber-100 bg-gradient-to-br from-amber-50 via-slate-50 to-orange-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_top,_#f59e0b_0,_transparent_55%),_radial-gradient(circle_at_bottom_left,_#f97316_0,_transparent_55%)] pointer-events-none" />
                        <div className="relative p-6 sm:p-7 flex flex-col h-full">
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-2xl bg-amber-600/90 flex items-center justify-center shadow-lg shadow-amber-300/50">
                                        <GraduationCap className="text-amber-50" size={22} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                                            Cambridge IELTS 18
                                        </h3>
                                        <p className="text-xs text-slate-600">
                                            剑桥雅思真题 · 精听训练 · 考试模式跳转
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-sm text-slate-700 leading-relaxed mb-4">
                                体验真实的雅思听力场景，通过精听训练提升听力水平。
                                <span className="font-semibold text-amber-700 bg-amber-50 px-1 rounded">
                                    支持考试模式跳转
                                </span>
                                ，让你在精听和考试模式之间自由切换。
                            </p>

                            <div className="mt-auto flex items-center justify-between pt-3 border-t border-amber-100/70">
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                                    <span className="px-2 py-0.5 rounded-full bg-white/80 border border-amber-100 text-amber-700">
                                        难度：高
                                    </span>
                                    <span className="px-2 py-0.5 rounded-full bg-white/80 border border-slate-100">
                                        场景：雅思考试
                                    </span>
                                    <span className="px-2 py-0.5 rounded-full bg-white/80 border border-slate-100">
                                        适合：雅思备考 / 精听训练
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 text-xs font-bold text-amber-700 group-hover:text-amber-800">
                                    进入世界
                                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

            </section>
        </div>
    );
}





