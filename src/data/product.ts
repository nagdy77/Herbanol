// Exact supplied approximate analysis. Keep numeric strings locale-independent.
export const productAnalysis = [
  { key: 'moisture', value: '49%' },
  { key: 'ph', value: '6–6.5' },
  { key: 'ec', value: '0.5 dS/m' },
  { key: 'ammonium', value: '62 ppm' },
  { key: 'nitrate', value: '355 ppm' },
  { key: 'nitrogen', value: '0.9%' },
  { key: 'organic', value: '90%' },
  { key: 'carbon', value: '51%' },
  { key: 'ratio', value: '60:1' },
  { key: 'phosphorus', value: '0.05%' },
  { key: 'potassium', value: '0.03%' },
  { key: 'water', value: '642%' },
  { key: 'ash', value: '11.73%' },
] as const

export const productFeatures = [
  'lightweight',
  'aeration',
  'water',
  'moisture',
  'salinity',
  'stable',
  'eco',
  'biodegradable',
] as const
