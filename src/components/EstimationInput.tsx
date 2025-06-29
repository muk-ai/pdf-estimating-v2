import React from 'react';
import { Clock, Plus, Minus } from 'lucide-react';

interface EstimationData {
  optimistic: string;
  mostLikely: string;
  pessimistic: string;
}

interface EstimationInputProps {
  estimation: EstimationData;
  onInputChange: (field: keyof EstimationData, value: string) => void;
  onIncrement: (field: keyof EstimationData) => void;
  onDecrement: (field: keyof EstimationData) => void;
  errors: string[];
}

const InputField: React.FC<{
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onIncrement: () => void;
  onDecrement: () => void;
  focusColor: string;
}> = ({ label, value, placeholder, onChange, onIncrement, onDecrement, focusColor }) => (
  <div className="group">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <div className="flex items-center gap-2">
      <button
        onClick={onDecrement}
        className="flex-shrink-0 w-10 h-12 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors duration-200 border border-gray-200"
      >
        <Minus className="w-4 h-4 text-gray-600" />
      </button>
      <div className="relative flex-1">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-${focusColor}-500 focus:border-transparent transition-all duration-200 group-hover:border-${focusColor}-300`}
        />
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">日</span>
      </div>
      <button
        onClick={onIncrement}
        className="flex-shrink-0 w-10 h-12 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors duration-200 border border-gray-200"
      >
        <Plus className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  </div>
);

const EstimationInput: React.FC<EstimationInputProps> = ({
  estimation,
  onInputChange,
  onIncrement,
  onDecrement,
  errors
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-semibold text-gray-800">見積もり入力</h2>
      </div>
      
      <div className="space-y-6">
        <InputField
          label="楽観的見積もり（最短日数）"
          value={estimation.optimistic}
          placeholder="例: 5"
          onChange={(value) => onInputChange('optimistic', value)}
          onIncrement={() => onIncrement('optimistic')}
          onDecrement={() => onDecrement('optimistic')}
          focusColor="blue"
        />
        
        <InputField
          label="最頻値（最も可能性の高い日数）"
          value={estimation.mostLikely}
          placeholder="例: 10"
          onChange={(value) => onInputChange('mostLikely', value)}
          onIncrement={() => onIncrement('mostLikely')}
          onDecrement={() => onDecrement('mostLikely')}
          focusColor="emerald"
        />
        
        <InputField
          label="悲観的見積もり（最長日数）"
          value={estimation.pessimistic}
          placeholder="例: 20"
          onChange={(value) => onInputChange('pessimistic', value)}
          onIncrement={() => onIncrement('pessimistic')}
          onDecrement={() => onDecrement('pessimistic')}
          focusColor="amber"
        />
      </div>
      
      {errors.length > 0 && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          {errors.map((error, index) => (
            <p key={index} className="text-red-700 text-sm flex items-center gap-2">
              <span className="w-4 h-4 text-red-500">⚠</span>
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default EstimationInput;