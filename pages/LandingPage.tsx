import React from 'react';
import { Link } from 'react-router-dom';
import { Headphones, EyeOff, Mic, Sparkles, ArrowRight, Activity, Globe } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="min-h-screen font-sans bg-slate-50 text-slate-900 overflow-x-hidden selection:bg-indigo-200 selection:text-indigo-900">

            {/* --- HERO SECTION --- */}
            <div className="relative text-white pb-20 pt-12 sm:pt-24 px-6 overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/assets/listen-freedom.png)' }}>
                {/* Warm overlay for readability and tone matching */}
                <div className="absolute inset-0 bg-amber-900/40"></div>
                {/* Abstract Background Effects - warm tones */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-amber-500/20 rounded-full blur-[100px] pointer-events-none opacity-60"></div>
                <div className="absolute bottom-0 right-0 w-[800px] h-[400px] bg-orange-500/15 rounded-full blur-[80px] pointer-events-none opacity-40"></div>

                <div className="relative max-w-4xl mx-auto text-center z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/50 border border-amber-700/50 backdrop-blur-md mb-8 animate-fade-in-up">
                        <Headphones size={14} className="text-amber-300" />
                        <span className="text-xs font-semibold tracking-wider uppercase text-amber-100">Listening Freedom</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight mb-8 drop-shadow-lg">
                        别再"学"英语了，<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-white">
                            去听懂这个世界。
                        </span>
                    </h1>

                    <p className="text-lg sm:text-2xl text-amber-50/90 max-w-2xl mx-auto mb-12 font-light leading-relaxed drop-shadow-md">
                        当你不再依赖翻译，你拥有的不只是英语，<br className="hidden sm:block" />
                        而是连接世界的自由。
                    </p>

                    <Link
                        to="/levels"
                        className="group inline-flex items-center gap-3 bg-white text-amber-900 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300"
                    >
                        Start Your Journey
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* --- THE VISION (The Light in Eyes) --- */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="flex justify-center mb-8">
                        <div className="bg-indigo-50 p-4 rounded-2xl">
                            <Sparkles size={32} className="text-indigo-600" />
                        </div>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 leading-snug">
                        真正的语言魔力
                    </h2>
                    <div className="prose prose-lg prose-indigo mx-auto text-slate-600 leading-8">
                        <p className="mb-6">
                            想象一下，当你再次打开一部美剧，你不再焦虑地盯着屏幕下方的字幕，而是第一次真正看见了<span className="text-slate-900 font-semibold bg-indigo-50 px-1">演员眼里的光</span>。
                        </p>
                        <p>
                            这不是为了分数，而是为了那种<span className="text-indigo-600 font-bold">“我终于听懂了”</span>的战栗感。通过每一个词的极致力透，那些曾经模糊的连读、吞音，突然变得像母语一样清晰。
                        </p>
                    </div>
                </div>
            </section>

            {/* --- THE METHOD (Ears vs Eyes) --- */}
            <section className="py-24 px-6 bg-slate-50 border-y border-slate-200">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 text-slate-600 text-sm font-bold">1</span>
                                        Blind Listening
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed ml-11">
                                        大多数人还在用眼睛死记硬背，而我们带你回到原点——<span className="font-semibold text-indigo-700">用耳朵去战斗</span>。隐藏文本，纯粹依靠听觉捕捉信息的流动。
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 text-slate-600 text-sm font-bold">2</span>
                                        Active Study
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed ml-11">
                                        内置 AI 字典与卡拉OK高亮。不只是查词，而是理解单词在语流中的真实形态。
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 text-slate-600 text-sm font-bold">3</span>
                                        Intensive Dictation
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed ml-11">
                                        通过 50% 甚至 100% 的挖空练习，强迫大脑补全声音链条的缺失环节。每一个填空的瞬间，都是神经突触的重新连接。
                                    </p>
                                </div>

                            </div>
                        </div>

                        <div className="order-1 md:order-2 relative">
                            {/* Visual abstraction of the interface */}
                            <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 rotate-3 hover:rotate-0 transition-all duration-500">
                                <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                                        <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                                    </div>
                                    <div className="text-xs font-mono text-slate-400">ECHO MODE: DICTATION</div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-2 text-xl font-mono text-slate-300">
                                        <span className="bg-slate-100 text-transparent rounded animate-pulse">Word</span>
                                        <span className="text-indigo-600 border-b-2 border-indigo-200">connection</span>
                                        <span className="bg-slate-100 text-transparent rounded animate-pulse">hidden</span>
                                        <span className="text-green-600">freedom</span>
                                        <span>world.</span>
                                    </div>
                                    <div className="h-16 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 mt-8">
                                        <Activity className="text-indigo-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FOOTER CTA --- */}
            <section className="py-32 px-6 text-white text-center relative overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/assets/embrace-freedom.png)' }}>
                {/* Sunset overlay for readability and tone matching */}
                <div className="absolute inset-0 bg-slate-900/50"></div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <Globe size={48} className="mx-auto mb-8 text-orange-300 opacity-90" />
                    <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-8 drop-shadow-lg">
                        拥抱连接世界的自由
                    </h2>
                    <Link
                        to="/levels"
                        className="inline-block bg-orange-500 hover:bg-orange-400 text-white px-10 py-5 rounded-full font-bold text-xl shadow-lg hover:shadow-orange-500/50 transition-all duration-300 hover:-translate-y-1"
                    >
                        Start Listening Now
                    </Link>
                    <p className="mt-8 text-orange-100/80 text-sm">
                        Designed for serious learners. No distractions.
                    </p>
                </div>
            </section>

        </div>
    );
}
