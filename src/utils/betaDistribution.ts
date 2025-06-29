// Gamma function approximation using Stirling's approximation
export const gammaFunction = (z: number): number => {
  if (z < 0.5) {
    return Math.PI / (Math.sin(Math.PI * z) * gammaFunction(1 - z));
  }
  z -= 1;
  const g = 7;
  const C = [
    0.99999999999980993,
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.13857109526572012,
    9.9843695780195716e-6,
    1.5056327351493116e-7
  ];
  
  let x = C[0];
  for (let i = 1; i < g + 2; i++) {
    x += C[i] / (z + i);
  }
  
  const t = z + g + 0.5;
  const sqrt2pi = Math.sqrt(2 * Math.PI);
  
  return sqrt2pi * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
};

// Beta function
export const betaFunction = (alpha: number, beta: number): number => {
  return (gammaFunction(alpha) * gammaFunction(beta)) / gammaFunction(alpha + beta);
};

// Beta distribution PDF
export const betaPDF = (x: number, alpha: number, beta: number): number => {
  if (x <= 0 || x >= 1) return 0;
  return (Math.pow(x, alpha - 1) * Math.pow(1 - x, beta - 1)) / betaFunction(alpha, beta);
};