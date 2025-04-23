import randomNumber from './randomNumber';

export const sandColorPalette: Array<string> = [
  '#F4E2D8',
  '#E0C5A1',
  '#CFA670',
  '#B88B4A',
  // "#8B5E3C",
  '#FFF6B3',
  '#FFE066',
  '#FFCB47',
  '#E0A340',
  '#A66E2E',
];

export default function pickSandColorPalette(index?: number): string {
  if (index === undefined) {
    return sandColorPalette[randomNumber(0, sandColorPalette.length - 1)];
  } else if (index < 0) {
    return sandColorPalette[0];
  } else if (index >= sandColorPalette.length) {
    return sandColorPalette[sandColorPalette.length - 1];
  } else {
    return sandColorPalette[index];
  }
}
