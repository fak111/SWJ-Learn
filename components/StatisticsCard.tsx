'use client';

import React, { useState, useEffect } from 'react';
import { Headphones, PenTool } from 'lucide-react';
import { getTotalListeningTime, formatTime, getStatistics } from '../utils/statistics';

const StatisticsCard: React.FC = () => {
    const [listeningTime, setListeningTime] = useState(0);
    const [dictatedWords, setDictatedWords] = useState(0);

    useEffect(() => {
        // 加载统计数据
        const loadStatistics = () => {
            const totalTime = getTotalListeningTime();
            const stats = getStatistics();
            setListeningTime(totalTime);
            setDictatedWords(stats.totalDictatedWords);
        };

        loadStatistics();

        // 监听 localStorage 变化
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'swj-statistics') {
                loadStatistics();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        // 定期检查（用于同一标签页内的更新）
        const interval = setInterval(loadStatistics, 2000);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="bg-white rounded-2xl shadow-lg p-5 mb-2 border border-slate-100">
            <h3 className="text-sm font-semibold text-slate-700 mb-4 text-center">Statistics</h3>

            <div className="space-y-4">
                {/* Listening Time */}
                <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <Headphones className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-xs text-slate-500 mb-1">Total Listening Time</div>
                        <div className="text-base font-semibold text-slate-800">
                            {formatTime(listeningTime)}
                        </div>
                    </div>
                </div>

                {/* Dictated Words */}
                <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <PenTool className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-xs text-slate-500 mb-1">Total Dictated Words</div>
                        <div className="text-base font-semibold text-slate-800">
                            {dictatedWords.toLocaleString()} words
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticsCard;

