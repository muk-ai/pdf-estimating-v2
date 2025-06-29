import React from 'react';

interface EstimationData {
  optimistic: string;
  mostLikely: string;
  pessimistic: string;
}

interface SummaryCardProps {
  estimation: EstimationData;
  expectedValue: number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ estimation, expectedValue }) => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-xl p-8 text-white">
      <h3 className="text-xl font-semibold mb-4">見積もりサマリー</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="bg-white/20 rounded-xl p-4">
          <p className="text-blue-100 text-sm">期待値（PERT）</p>
          <p className="font-bold text-2xl">{expectedValue.toFixed(1)}日</p>
        </div>
        <div className="bg-white/20 rounded-xl p-4">
          <p className="text-blue-100 text-sm">範囲</p>
          <p className="font-bold text-2xl">{estimation.optimistic} - {estimation.pessimistic}日</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-blue-100 text-sm">楽観的</p>
          <p className="font-semibold">{estimation.optimistic}日</p>
        </div>
        <div className="text-center">
          <p className="text-blue-100 text-sm">最頻値</p>
          <p className="font-semibold">{estimation.mostLikely}日</p>
        </div>
        <div className="text-center">
          <p className="text-blue-100 text-sm">悲観的</p>
          <p className="font-semibold">{estimation.pessimistic}日</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;