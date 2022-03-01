const hue = 240;
const saturation = 100;

export function calculateRectColor(rectHeatmap, heatmap) {
    const value = ((rectHeatmap - heatmap.min) / (heatmap.max - heatmap.min));
    const lightness = (1 - value) * 95;
    return {
        fill: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
        color: lightness > 50 ? 'rgb(0,0,0)' : 'rgb(255,255,255)'
    }
}