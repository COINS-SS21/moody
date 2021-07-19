export function movingAverage(arr: number[], n: number = 5): number[] {
  if (arr.length - n < 0) {
    return [];
  }
  const result = new Array<number>(arr.length - n);

  for (let i = n; i < arr.length; i++) {
    let meanLastN: number = 0.0;
    for (let j = i - n; j < i; j++) {
      meanLastN += arr[j];
    }
    result[i] = meanLastN / n;
  }

  return result;
}

export function guessGoodMovingAverage(arr: number[]) {
  if (arr.length === 0) {
    return 1;
  }

  return Math.floor(10 * arrStd(arr) + Math.log(arr.length));
}

export function softmax(arr: number[]): number[] {
  const C = Math.max(...arr);
  const d = arr.map((y) => Math.exp(y - C)).reduce((a, b) => a + b);
  return arr.map((value) => {
    return Math.exp(value - C) / d;
  });
}

function arrMean(arr: number[]): number {
  const length: number = arr.length;
  if (length === 0) {
    return 0.0;
  }
  const sum: number = arr.reduce(
    (prev: number, curr: number) => prev + curr,
    0
  );

  return sum / length;
}

function arrStd(arr: number[]): number {
  const length: number = arr.length;
  if (length < 2) {
    return 0.0;
  }
  const mean: number = arrMean(arr);
  const variance: number = arr.reduce(
    (prev: number, curr: number) => prev + (curr - mean) ** 2,
    0
  );
  return Math.sqrt(variance / (length - 1));
}

export function standardize(arr: number[]): number[] {
  const mean = arrMean(arr);
  const std = arrStd(arr);
  if (std === 0) {
    return arr;
  }
  return arr.map((val: number) => (val - mean) / std);
}

export function meanNormalize(arr: number[]): number[] {
  const min: number = Math.min(...arr);
  const max: number = Math.max(...arr);
  const mean: number = arrMean(arr);
  return arr.map((val: number) => (val - mean) / (max - min));
}

export function rmsNormalize(arr: number[], rmsLevel: number = 0.0): number[] {
  const r = 10 ** (rmsLevel / 10.0);
  const squaredSum = arr.reduce(
    (prev: number, curr: number) => prev + curr ** 2,
    0
  );
  const a = Math.sqrt((arr.length * r ** 2) / squaredSum);

  return arr.map((val: number) => val * a || 0);
}

export function peakNormalize(arr: number[]): number[] {
  const max: number = Math.max(...arr);
  if (max === 0.0) {
    return arr;
  }

  return arr.map((val: number) => val / max);
}
