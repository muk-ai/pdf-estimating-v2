import React from 'react';
import { BarChart3 } from 'lucide-react';
import { Line } from 'react-chartjs-2';

interface ChartPoint {
  day: number;
  probability: number;
}

interface EstimationData {
  optimistic: string;
  mostLikely: string;
  pessimistic: string;
}

interface ProbabilityChartProps {
  chartData: ChartPoint[];
  estimation: EstimationData;
}

const ProbabilityChart: React.FC<ProbabilityChartProps> = ({ chartData, estimation }) => {
  // Find the closest data point index for a given day value
  const findClosestDataIndex = (targetDay: number): number => {
    let closestIndex = 0;
    let minDifference = Math.abs(chartData[0].day - targetDay);
    
    for (let i = 1; i < chartData.length; i++) {
      const difference = Math.abs(chartData[i].day - targetDay);
      if (difference < minDifference) {
        minDifference = difference;
        closestIndex = i;
      }
    }
    
    return closestIndex;
  };

  // Prepare Chart.js data
  const getChartJSData = () => {
    if (chartData.length === 0) return null;

    const optimistic = parseFloat(estimation.optimistic);
    const mostLikely = parseFloat(estimation.mostLikely);
    const pessimistic = parseFloat(estimation.pessimistic);

    // Find the indices for our estimation points
    const optimisticIndex = findClosestDataIndex(optimistic);
    const mostLikelyIndex = findClosestDataIndex(mostLikely);
    const pessimisticIndex = findClosestDataIndex(pessimistic);

    // Create point data arrays - only show points at specific indices
    const optimisticPoints = chartData.map((_, index) => 
      index === optimisticIndex ? chartData[index].probability : null
    );
    
    const mostLikelyPoints = chartData.map((_, index) => 
      index === mostLikelyIndex ? chartData[index].probability : null
    );
    
    const pessimisticPoints = chartData.map((_, index) => 
      index === pessimisticIndex ? chartData[index].probability : null
    );

    return {
      labels: chartData.map(p => p.day.toString()),
      datasets: [
        {
          label: '確率密度',
          data: chartData.map(p => p.probability),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 4,
        },
        {
          label: '楽観的見積もり',
          data: optimisticPoints,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgb(59, 130, 246)',
          pointRadius: 8,
          pointHoverRadius: 10,
          showLine: false,
          pointStyle: 'circle',
        },
        {
          label: '最頻値',
          data: mostLikelyPoints,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgb(59, 130, 246)',
          pointRadius: 8,
          pointHoverRadius: 10,
          showLine: false,
          pointStyle: 'circle',
        },
        {
          label: '悲観的見積もり',
          data: pessimisticPoints,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgb(59, 130, 246)',
          pointRadius: 8,
          pointHoverRadius: 10,
          showLine: false,
          pointStyle: 'circle',
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        filter: function(tooltipItem: any) {
          return tooltipItem.parsed.y !== null;
        },
        callbacks: {
          label: function(context: any) {
            if (context.datasetIndex === 0) {
              return `確率密度: ${context.parsed.y.toFixed(4)}`;
            }
            return `${context.dataset.label}: ${chartData[context.dataIndex].day}日`;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: '日数',
          font: {
            size: 14,
            weight: 'bold' as const,
          },
        },
        ticks: {
          callback: function(value: any, index: number) {
            const step = Math.max(1, Math.floor(chartData.length / 10));
            if (index % step === 0) {
              return chartData[index]?.day || '';
            }
            return '';
          },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: '確率密度',
          font: {
            size: 14,
            weight: 'bold' as const,
          },
        },
        beginAtZero: true,
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="w-6 h-6 text-indigo-600" />
        <h2 className="text-2xl font-semibold text-gray-800">確率密度分布</h2>
      </div>
      
      {chartData.length > 0 && getChartJSData() ? (
        <div className="h-80">
          <Line data={getChartJSData()!} options={chartOptions} />
        </div>
      ) : (
        <div className="h-80 flex items-center justify-center text-gray-500 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p className="text-lg font-medium">すべての項目を入力してください</p>
            <p className="text-sm">確率密度分布を表示します</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProbabilityChart;