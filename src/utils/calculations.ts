import { betaPDF } from './betaDistribution';

export interface ChartPoint {
  day: number;
  probability: number;
}

export interface EstimationData {
  optimistic: string;
  mostLikely: string;
  pessimistic: string;
}

export const validateDays = (data: EstimationData): string[] => {
  const errors: string[] = [];
  
  if (!data.optimistic || !data.mostLikely || !data.pessimistic) {
    errors.push('すべての項目を入力してください');
    return errors;
  }

  const optimistic = parseFloat(data.optimistic);
  const mostLikely = parseFloat(data.mostLikely);
  const pessimistic = parseFloat(data.pessimistic);

  if (isNaN(optimistic) || isNaN(mostLikely) || isNaN(pessimistic)) {
    errors.push('数値を入力してください');
    return errors;
  }

  if (optimistic <= 0 || mostLikely <= 0 || pessimistic <= 0) {
    errors.push('正の数値を入力してください');
  }

  if (optimistic >= mostLikely) {
    errors.push('楽観的見積もりは最頻値より小さくしてください');
  }
  
  if (mostLikely >= pessimistic) {
    errors.push('最頻値は悲観的見積もりより小さくしてください');
  }

  return errors;
};

export const calculateBetaDistribution = (a: number, b: number, c: number): ChartPoint[] => {
  const points: ChartPoint[] = [];
  
  // Calculate display range (slightly wider than estimation range)
  const range = c - a;
  const extension = Math.max(1, Math.ceil(range * 0.1));
  const displayMin = Math.max(0, a - extension);
  const displayMax = c + extension;
  
  // Convert three-point estimates to beta distribution parameters
  const mean = (a + 4 * b + c) / 6; // PERT estimate
  const variance = Math.pow((c - a) / 6, 2);
  
  // Normalize to [0,1] range for beta distribution
  const normalizedMean = (mean - a) / (c - a);
  const normalizedVariance = variance / Math.pow(c - a, 2);
  
  // Calculate beta parameters
  const temp = normalizedMean * (1 - normalizedMean) / normalizedVariance - 1;
  const alpha = Math.max(0.5, normalizedMean * temp);
  const beta = Math.max(0.5, (1 - normalizedMean) * temp);
  
  // Generate points with 0.1 day precision
  for (let day = displayMin; day <= displayMax; day += 0.1) {
    let probability = 0;
    
    // Only calculate probability within estimation range
    if (day >= a && day <= c) {
      const t = (day - a) / (c - a); // Normalize to [0,1]
      if (t > 0 && t < 1) {
        probability = betaPDF(t, alpha, beta) / (c - a);
      }
    }
    
    points.push({
      day: Math.round(day * 10) / 10, // Round to 1 decimal place
      probability: probability
    });
  }
  
  return points;
};

export const calculateExpectedValue = (estimation: EstimationData): number => {
  const a = parseFloat(estimation.optimistic);
  const b = parseFloat(estimation.mostLikely);
  const c = parseFloat(estimation.pessimistic);
  return (a + 4 * b + c) / 6;
};

export const sanitizeNumericInput = (value: string): string => {
  return value.replace(/[^0-9.]/g, '');
};