// Original brand colors for certificate providers.
// `light` is used in the light theme when the brand color is too pale on white.
export type ProviderBrand = {
  color: string;
  light?: string;
};

const fallback: ProviderBrand = { color: '#818cf8', light: '#4f46e5' };

const providerBrands: Record<string, ProviderBrand> = {
  udemy: { color: '#a435f0' },
  codechef: { color: '#c89b6d', light: '#5b4638' },
  hackerrank: { color: '#00ea64', light: '#00a050' },
  linkedin: { color: '#3b8ede', light: '#0a66c2' },
  coursera: { color: '#4d8eff', light: '#0056d2' },
  kaggle: { color: '#20beff', light: '#0e8fc4' },
  datacamp: { color: '#03ef62', light: '#05192d' },
  edx: { color: '#e43d55', light: '#b8213a' },
  google: { color: '#4285f4' },
  ibm: { color: '#4589ff', light: '#0f62fe' },
  microsoft: { color: '#00a4ef', light: '#0078d4' },
  aws: { color: '#ff9900', light: '#e47911' },
  nvidia: { color: '#76b900', light: '#5a8f00' },
  'deeplearning.ai': { color: '#f65b66', light: '#d9364a' },
  freecodecamp: { color: '#a8a8ff', light: '#0a0a23' },
  geeksforgeeks: { color: '#2f8d46' },
  nptel: { color: '#f5a623', light: '#c97f00' },
  'great learning': { color: '#4f8df5', light: '#1a56db' },
  simplilearn: { color: '#ff7a3d', light: '#e85d1c' },
  'analytics vidhya': { color: '#3fa9f5', light: '#1b75bc' },
  'infosys springboard': { color: '#3d8ff2', light: '#007cc3' },
};

/** Brand color for a provider (case-insensitive); unknown providers get the site accent color. */
export function getProviderBrand(provider: string): ProviderBrand {
  return providerBrands[provider.trim().toLowerCase()] ?? fallback;
}
