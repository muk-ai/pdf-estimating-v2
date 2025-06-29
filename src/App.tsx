import React, { useState, useEffect } from 'react';
import { BarChart3 } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

import EstimationInput from './components/EstimationInput';
import ProbabilityChart from './components/ProbabilityChart';
import SummaryCard from './components/SummaryCard';
import InfoPanel from './components/InfoPanel';
import { EstimationData, ChartPoint } from './types';
import { 
  validateDays, 
  calculateBetaDistribution, 
  calculateExpectedValue,
  sanitizeNumericInput 
} from './utils/calculations';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function App() {
  const [estimation, setEstimation] = useState<EstimationData>({
    optimistic: '5',
    mostLikely: '8',
    pessimistic: '15'
  });
  
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const validationErrors = validateDays(estimation);
    setErrors(validationErrors);
    
    if (validationErrors.length === 0) {
      const optimistic = parseFloat(estimation.optimistic);
      const mostLikely = parseFloat(estimation.mostLikely);
      const pessimistic = parseFloat(estimation.pessimistic);
      
      const data = calculateBetaDistribution(optimistic, mostLikely, pessimistic);
      setChartData(data);
    } else {
      setChartData([]);
    }
  }, [estimation]);

  const handleInputChange = (field: keyof EstimationData, value: string) => {
    const sanitizedValue = sanitizeNumericInput(value);
    setEstimation(prev => ({
      ...prev,
      [field]: sanitizedValue
    }));
  };

  const handleIncrement = (field: keyof EstimationData) => {
    const currentValue = parseFloat(estimation[field]) || 0;
    const newValue = Math.max(0, currentValue + 1);
    setEstimation(prev => ({
      ...prev,
      [field]: newValue.toString()
    }));
  };

  const handleDecrement = (field: keyof EstimationData) => {
    const currentValue = parseFloat(estimation[field]) || 0;
    const newValue = Math.max(0, currentValue - 1);
    setEstimation(prev => ({
      ...prev,
      [field]: newValue.toString()
    }));
  };

  const expectedValue = errors.length === 0 ? calculateExpectedValue(estimation) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              作業見積もりツール
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            三点見積もりとベータ分布を使用してプロジェクト完了確率を可視化
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <EstimationInput
              estimation={estimation}
              onInputChange={handleInputChange}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              errors={errors}
            />
          </div>

          {/* Chart Section */}
          <div className="space-y-6">
            <ProbabilityChart
              chartData={chartData}
              estimation={estimation}
            />

            {/* Summary Card - Now below the chart */}
            {chartData.length > 0 && (
              <SummaryCard
                estimation={estimation}
                expectedValue={expectedValue}
              />
            )}
          </div>
        </div>
        
        <InfoPanel />
      </div>
    </div>
  );
}

export default App;