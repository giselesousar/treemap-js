const hue = 240;
const saturation = 100;

export function calculateRectColor(rectHeatmap, heatmap) {
    const diff = heatmap.max - heatmap.min;
    let lightness = 95;
    if(diff > 0) {
        const value = ((rectHeatmap - heatmap.min) / diff);
        lightness = (1 - value) * lightness;
    }
    return {
        fill: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
        color: lightness > 50 ? 'rgb(0,0,0)' : 'rgb(255,255,255)'
    }
}