export interface EstimationData {
  optimistic: string;
  mostLikely: string;
  pessimistic: string;
}

export interface ChartPoint {
  day: number;
  probability: number;
}