const hue = 240;
const saturation = 100;

export function calculateRectColor(rootSize, rectSize) {
    const rate = rectSize/rootSize;
    const lightness = (rate < 1 ? 1 - rate : 0.3) * 95;
    return {
        fill: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
        color: lightness > 50 ? 'rgb(0,0,0)' : 'rgb(255,255,255)'
    }
}