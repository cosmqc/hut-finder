// Method from MUI documentation for generating colours from a provided string.
// Have tweaked it a tiny bit to mute some of the colours.
export const stringToColour = (string: string, muteFactor: number = 0.5): string => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    const mutedValue = Math.round(value * muteFactor);
    color += `00${mutedValue.toString(16)}`.slice(-2);
  }

  return color;
}
