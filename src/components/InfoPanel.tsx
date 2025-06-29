import React from 'react';
import { Info } from 'lucide-react';

const InfoPanel: React.FC = () => {
  return (
    <div className="mt-12 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8 border border-indigo-100">
      <div className="flex items-start gap-4">
        <Info className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
        <div>
          <h3 className="text-xl font-semibold text-indigo-900 mb-3">三点見積もりについて</h3>
          <p className="text-indigo-800 mb-4">
            このツールはベータ分布を使用して、3つの重要な見積もりに基づいてプロジェクト完了確率をモデル化します。
            正規分布に似た滑らかな曲線で、より現実的な作業見積もりを表現します：
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/60 rounded-xl p-4">
              <h4 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                楽観的見積もり（最短）
              </h4>
              <p className="text-sm text-red-600">すべてが完璧に進んだ場合の最短完了日数です。</p>
            </div>
            <div className="bg-white/60 rounded-xl p-4">
              <h4 className="font-semibold text-emerald-700 mb-2 flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                最頻値
              </h4>
              <p className="text-sm text-emerald-600">通常の状況下で最も可能性の高い完了日数です。</p>
            </div>
            <div className="bg-white/60 rounded-xl p-4">
              <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                悲観的見積もり（最長）
              </h4>
              <p className="text-sm text-blue-600">重大な問題が発生した場合の最長完了日数です。</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-white/60 rounded-xl">
            <h4 className="font-semibold text-purple-700 mb-2">PERT期待値</h4>
            <p className="text-sm text-purple-600">
              期待値は PERT 公式 (楽観的 + 4×最頻値 + 悲観的) ÷ 6 で計算され、
              最頻値により重みを置いた現実的な見積もりを提供します。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;