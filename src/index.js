import { createElement, createSvgElement, getElementById } from './utils/dom';
import { calculateRectColor } from './utils/heatmap';
import './styles.scss';

const fontSize = 14;
const fontFamily = 'Roboto';
const events = {
  ROOT_CHANGE: new Event('root-change')
};
const heatmap = {
  min: 0,
  max: 0
};
const margin = 5;
const expandedList = [];
const marginTop = fontSize + 8;
const toggleButtonHeight = fontSize + 20;
const heatmapScaleWidth = 30;
const heatmapScalePadding = 30;
let heatmapScaleTitle = '';

let rectangle = {data: []};

var root, currentRoot, count = null;

function getJsonObject(data) {
  return JSON.parse(data || '{}');
}

function createPathElement(className, fill, params = {}) {
  const { x, y, width, height } = params;
  const path = createSvgElement('path');
  path.classList.add(className);
  path.setAttribute('style', `fill: ${fill}`);
  path.setAttribute('d', `M${x},${y} L${width + x},${y} L${width + x},${height + y} L${x},${height + y} Z`);
  return path; 
}

function measureTextWidth(text) {
  const canvas = createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = fontSize + 'px ' + fontFamily;

  return context.measureText(text).width;
}

function createTextElement(className, node, color, isNode=true) {
  const { coords, name } = node;
  const textTag = createSvgElement('text');

  textTag.classList.add(className);
  textTag.setAttribute('x', 0);
  textTag.setAttribute('y', 0);
  textTag.textContent = name;

  const textPixelWidth = measureTextWidth(name) + margin;
  let scale = coords.width/textPixelWidth;
  if (scale > 1 && fontSize > coords.height || scale < 1 && scale * fontSize > coords.height) {
    scale = 0;
  }
  const transform = scale > 1 ? `translate(${coords.x + margin}, ${coords.y + fontSize})` : `translate(${coords.x}, ${coords.y + scale*fontSize})scale(${scale})`;
  textTag.setAttribute('style', `font-size: ${fontSize}px; fill: ${color}; fill-opacity: ${scale < 0.3 ? 0 : 1}; white-space: pre;`);
  textTag.setAttribute('transform', transform);
  if (isNode) {
    node.topOffset = scale > 1 ? marginTop : scale * fontSize + 5;
  }
  return textTag;
}

function renderTooltip(node, fillColor, textColor) {
  const { coords, name, weight, type, heatmap } = node;
  let top, bottom, right, left, middleOfTooltip = null;
  const textContent = [
    'label=' + name, 
    'weight=' + weight, 
    'type=' + type?.toLowerCase(), 
    heatmapScaleTitle + '=' + Math.round(heatmap)
  ]
  const maxWidth = currentRoot.coords.width + currentRoot.coords.x;
  const maxHeight = currentRoot.coords.height;
  const maxTextPixelWidth = Math.max(...textContent.map(el => measureTextWidth(el)));
  const container = createSvgElement('g'), path = createSvgElement('path');

  path.setAttribute('style', `fill: ${fillColor}; stroke: rgb(54, 54, 54); stroke-width: 2;`);
  container.classList.add('tooltip');
  container.appendChild(path);

  const triangle = {
    width: 10, 
    top: 0, 
    bottom: 0,
    left: 0,
    right: 0,
    middle: bottom > maxHeight ? coords.height + coords.y - fontSize/2  : coords.y + fontSize/2 
  }

  top = triangle.middle - (textContent.length * fontSize)/2 - margin;
  bottom = triangle.middle + (textContent.length * fontSize)/2 + margin;
  left = coords.width + coords.x;
  right = left + maxTextPixelWidth;

  top = bottom > maxHeight ? triangle.middle - (textContent.length * fontSize) - margin : top;
  bottom = bottom > maxHeight ? triangle.middle + margin : bottom;

  middleOfTooltip = top + (bottom - top) / 2 < coords.y ? (bottom - top) * 0.82 : (bottom - top) / 2;

  triangle.top = top + (bottom - top) / 2 < coords.y ? bottom - 15 : top + middleOfTooltip*0.8;
  triangle.bottom = top + (bottom - top) / 2 < coords.y ? bottom - 8 : bottom - middleOfTooltip*0.8;

  if (right > maxWidth) {
    right = coords.width + coords.x - triangle.width;
    left = right - maxTextPixelWidth - triangle.width;
    triangle.right = right + triangle.width;
    path.setAttribute('d', `M${left},${top} L${right},${top} L${right},${triangle.top} L${triangle.right},${top + middleOfTooltip} L${right},${triangle.bottom} L${right},${bottom} L${left},${bottom} L${left},${top}Z`);
  } else {
    triangle.left = left - triangle.width;
    path.setAttribute('d', `M${left},${top} L${right},${top} L${right},${bottom} L${left},${bottom} L${left},${triangle.bottom} L${triangle.left},${top + middleOfTooltip} L${left},${triangle.top} L${left},${top}Z`);
  }

  textContent.forEach((el, index) => {
    let text = createSvgElement('text');
    text.setAttribute('x', 0);
    text.setAttribute('y', 0);
    text.classList.add('tooltip-text');
    text.setAttribute('style', `font-size: ${fontSize}px; fill: ${textColor}; white-space: pre;`);
    text.setAttribute('transform', `translate(${left + margin}, ${top + (index + 1 ) * fontSize})`);
    text.textContent = el;

    container.appendChild(text);
  });

  getElementById('treemap').appendChild(container);
}

function removeTooltip() {
  document.querySelectorAll('.tooltip').forEach((el) => el.remove());
}

function createRect(node) {
  const { fill, color } = calculateRectColor(node.heatmap, heatmap);
  const container = createSvgElement('g');
  if(node.type === 'DIR') {
    container.addEventListener('click', () => expand(node));
  }
  container.addEventListener('mouseover', () => renderTooltip(node, fill, color));
  container.addEventListener('mouseout', () => removeTooltip());
  container.appendChild(createPathElement('path', fill, node.coords));
  container.appendChild(createTextElement('text', node, color));
  return container;
}

function createNode(jsonData) {
  return {
      id: count || 0,
      name: jsonData.hasOwnProperty('name') ? jsonData.name : null,
      parent: jsonData.parent || null,
      weight: jsonData.weight || 0,
      children: jsonData.children || [],
      topOffset: 0,
      type: jsonData.type || null,
      heatmap: jsonData.heatmap || null,
      coords: jsonData.coords || {},
      scaledWeight: 0
    }
}

function createSubnode(data, parentNode) {
  count++;
  data.children.sort((first, second) => second.weight - first.weight);
  data.children.forEach((child) => {
      const node = { 
          id: count,
          name: child.name,
          parent: parentNode.id,
          weight: child.weight,
          topOffset: 0,
          type: child.type,
          heatmap: child.heatmap,
          children: [],
          scaledWeight: 0
      };
      parentNode?.children?.push(node);
      createSubnode(child, node);
  });
}

function updateToggleButtonText() {
  const textElement = getElementById('collapse-button-text');
  const textContent = expandedList.map((node) => node.name);
  textContent.unshift(root.name);
  const totalSize = textContent.length == 1 ? root.weight : expandedList[expandedList.length - 1].weight;
  textElement.textContent = textContent.join(' / ') + ': ' + totalSize;
}

function isAlreadyExpanded(node) {
  return expandedList.filter((item) => item.id == node.id).length > 0;
}

function getNodeById(id, node) {
  if(node?.id == id){
    return node;
  } else {
    if (node.children.length > 0) {
      for(let i = 0; i < node.children.length; i++) {
        let result = getNodeById(id, node.children[i]);
        if (result != null) {
          return result;
        }
      }
    }
    return null;
  }
}

function getPathToNode(node) {
  const path = [];
  let parent = currentRoot.parent;

  while(parent != null) {
    let currentNode = getNodeById(parent, root);
    if(isAlreadyExpanded(currentNode)) {
      break;
    }
    path.push({ id: currentNode.id, name: currentNode.name, weight: currentNode.weight });
    parent = currentNode.parent;
  }
  path.pop();
  path.reverse();
  path.push({ id: node.id, name: node.name, weight: node.weight });

  return path;
}

function expand(node) {
  if(node.parent == null || isAlreadyExpanded(node)) 
    return;
  currentRoot = getNodeById(node.id, root);
  expandedList.push(...getPathToNode(node));
  window.dispatchEvent(events.ROOT_CHANGE);
}

function collapse() {
  if(expandedList.length == 0)
    return;
  expandedList.pop();
  const last = expandedList[expandedList.length - 1];
  currentRoot = getNodeById(last ? last.id : root.id, root);
  window.dispatchEvent(events.ROOT_CHANGE);
}

function createToggleButton(params = {}) {
  const { x, y, width } = params;
  const container = createSvgElement('g');

  const path = createPathElement('path', 'hsl(240, 100%, 92%)', { y, x, width: width, height: y + toggleButtonHeight });
  path.addEventListener('click', () => collapse());
  container.appendChild(path);

  const text = createTextElement('text', { name: root.name + ': ' + root.weight, coords: { y: y + (toggleButtonHeight - fontSize)/2, width, x } }, 'rgb(0,0,0)', false);
  text.setAttribute('id', 'collapse-button-text');
  container.appendChild(text);

  return container;
}

function createHeatmapScale(params = {}) {
  const { y, width, height } = params;

  const container = createSvgElement('g');
  const containerText = createSvgElement('g');
  const defs = createSvgElement("defs");
  const linearGradient = createSvgElement("linearGradient");
  const title = createSvgElement('text');

  linearGradient.setAttribute("id", "Gradient");
  linearGradient.setAttribute("x1", "0");
  linearGradient.setAttribute("x2", "0");
  linearGradient.setAttribute("y1", "0");
  linearGradient.setAttribute("y1", "1");

  const points = [5, 20, 30, 40, 50, 60, 70, 80, 90];

  points.forEach((point, index) => {
    let stop = createSvgElement("stop");

    stop.setAttribute("offset", `${point}%`);
    stop.setAttribute("stop-color", `hsl(240,100%,${points[points.length - index - 1]}%)`); 

    linearGradient.appendChild(stop);
  });

  defs.appendChild(linearGradient);
  container.appendChild(defs);

  const scaleParams = {
    y: y + toggleButtonHeight + heatmapScalePadding, 
    x: width + 15, 
    width: heatmapScaleWidth, 
    height: height - (y + toggleButtonHeight + 2*heatmapScalePadding) 
  }

  title.classList.add('text-scale');
  title.setAttribute('x', scaleParams.x + 20);
  title.setAttribute('y', scaleParams.y - 20);
  title.setAttribute('text-anchor', 'middle');
  title.setAttribute('style', `font-size: ${fontSize - 3}px; fill: rgb(0,0,0); fill-opacity: 1; white-space: pre;`);
  title.textContent = heatmapScaleTitle;

  container.appendChild(title)

  const path = createPathElement('scale', "url('#Gradient')", scaleParams);
  container.appendChild(path);

  const diff = heatmap.max - heatmap.min;
  const textValues = [heatmap.min, Math.round(diff/4), Math.round(diff/2), Math.round(diff/2 + diff/4), heatmap.max];
  
  textValues.forEach((value) => {

    const weight = ((value - heatmap.min) / (heatmap.max - heatmap.min));

    let text = createSvgElement('text');

    text.classList.add('text-scale');
    text.setAttribute('x', 0);
    text.setAttribute('y', 0);
    text.textContent = value;
   
    const y = (1 - weight)*(scaleParams.height);

    text.setAttribute('style', `font-size: ${fontSize - 3}px; fill: rgb(0,0,0); fill-opacity: 1; white-space: pre;`);
    text.setAttribute('transform', `translate(${scaleParams.x + scaleParams.width + margin}, ${y == 0 ? scaleParams.y + margin : y + scaleParams.y})`);

    containerText.appendChild(text);
  })

  container.appendChild(containerText);
  return container;
}

function cerateTreemapContainer(targetElement, params = {}) {
  const { top, bottom, left, right } = params;

  params.width = params.width - heatmapScaleWidth - 2*heatmapScalePadding;

  const svg = createSvgElement('svg');
  svg.setAttribute('id', 'treemap');
  svg.setAttribute('width', right + left);
  svg.setAttribute('height', bottom + top);

  svg.appendChild(createHeatmapScale(params));
  svg.appendChild(createToggleButton(params));

  const container = createSvgElement('g');
  container.classList.add('treemap-rects');

  svg.appendChild(container);
  targetElement.appendChild(svg);

  return container;
}

function clearTreemap(element) {
  while(element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function getMinWidth() {
  if (rectangle.height > rectangle.width) {
    return { value: rectangle.width, vertical: false };
  }
  return { value: rectangle.height, vertical: true };
}

function shouldRenderRectangle(params = {}) {
  const { y, x, width, height } = params;
  return y < height + y && x < width + x;
}

function layoutRow(row, width, vertical, element) {

  if(row.length === 0) {
    return;
  }

  const rowHeight = row.map(each => each.scaledWeight).reduce((a,b) => a + b, 0) / width;

  row.forEach((rowItem) => {

    const rowWidth = rowItem.scaledWeight / rowHeight;

    let coords = {
      x: rectangle.x,
      y: rectangle.y
    };

    if (vertical) {
      coords = {
        ...coords,
        width: rowHeight,
        height: rowWidth,
      };
      rectangle.y += rowWidth;
    } else {
      coords = {
        ...coords,
        width: rowWidth,
        height: rowHeight,
      };
      rectangle.x += rowWidth;
    }

    rowItem.coords = coords;

    if(shouldRenderRectangle(coords)) {
      element.appendChild(createRect(rowItem));
    }
  });

  if (vertical) {
    rectangle.x += rowHeight;
    rectangle.y -= width;
    rectangle.width -= rowHeight;
  } else {
    rectangle.x -= width;
    rectangle.y += rowHeight;
    rectangle.height -= rowHeight;
  }
};

function worstRatio(row, width) {
  const weights = row.map(each => each.scaledWeight);
  const sum = weights.reduce((a, b) => a + b, 0);
  const rowMax = Math.max(...weights);
  const rowMin = Math.min(...weights);
  return Math.max(
    (width ** 2 * rowMax) / sum ** 2,
    sum ** 2 / (width ** 2 * rowMin)
  );
}

function layoutLastRow(rows, children, width, element) {
  const { vertical } = getMinWidth();
  layoutRow(rows, width, vertical, element);
  layoutRow(children, width, vertical, element);
};

function squarify(children, row, width, element) {

  if(children.length === 0){
    return;
  }

  if (children.length === 1) {
    return layoutLastRow(row, children, width, element);
  }

  const rowWithChild = [...row, children[0]];

  if (
    row.length === 0 ||
    worstRatio(row, width) >= worstRatio(rowWithChild, width)
  ) {
    children.shift();
    return squarify(children, rowWithChild, width, element);
  }
  layoutRow(row, width, getMinWidth().vertical, element);
  return squarify(children, [], getMinWidth().value, element);
};

function traverse(node, element) {
  const isRoot = node.id === currentRoot.id;
  const totalValue = node.children.map((child) => child.weight).reduce((a, b) => a + b, 0);
  const width = isRoot ? node.coords.width : node.coords.width - 2*margin;
  const height = isRoot ? node.coords.height - toggleButtonHeight : node.coords.height - node.topOffset - margin;
  node.children.forEach((child) => { child.scaledWeight = (child.weight * width * height) / totalValue });
  const children = [...node.children];

  rectangle = {
    ...rectangle, 
    x: isRoot ? node.coords.x : node.coords.x + margin,
    y: isRoot ? node.coords.y + toggleButtonHeight : node.coords.y + node.topOffset,
    width: width,
    height: height
  };

  squarify(children, [], getMinWidth().value, element);

  node.children.forEach((child) => {
    traverse(child, element);
  })
}

function renderTreemap(targetElement, params) {
  clearTreemap(targetElement);
  currentRoot.coords = params;
  traverse(currentRoot, targetElement);
}

function resize(targetElement) {
  clearTreemap(targetElement);
  const targetElementPosition = targetElement.getBoundingClientRect();
  const treemapContainer = cerateTreemapContainer(targetElement, targetElementPosition);
  renderTreemap(treemapContainer, targetElementPosition);
}

function calculateMinMaxHeatmap() {
  const traverseForGetHeatmapValues = (node) => {
    if(node?.heatmap) {
      if(node.heatmap > heatmap.max) {
        heatmap.max = node.heatmap;
      } else if(node.heatmap < heatmap.min) {
        heatmap.min = node.heatmap;
      }
    }

    if (node.children.length > 0) {
      node.children.forEach((child) => {
        traverseForGetHeatmapValues(child);
      });
    }
  }
 
  traverseForGetHeatmapValues(currentRoot);
}

function create(jsonData) {
  count = 0;
  const parsedData = getJsonObject(jsonData);
  const rootNode = createNode({
      id: count,
      name: parsedData.name,
      weight: parsedData.weight,
      children: [],
      type: parsedData.type,
      heatmap: parsedData.heatmap,
      topOffset: 0,
      parent: null,
      scaledWeight: 0
  });
  createSubnode(parsedData, rootNode);
  return rootNode;
}

export function render(jsonData, targetElement, heatmapMetricName) {

  const rootNode = create(jsonData);

  heatmapScaleTitle = heatmapMetricName;
  currentRoot = rootNode; 
  root = rootNode;
  calculateMinMaxHeatmap();
  const targetElementPosition = targetElement.getBoundingClientRect();
  const treemapContainer = cerateTreemapContainer(targetElement, targetElementPosition);

  window.addEventListener('root-change', () => { 
    removeTooltip();
    renderTreemap(treemapContainer, targetElementPosition); 
    updateToggleButtonText();
  });

  window.addEventListener('resize', () => { 
    resize(targetElement);
  });

  renderTreemap(treemapContainer, targetElementPosition);
}

export default {
    render
}
