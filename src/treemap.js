import { createElement, createSvgElement, getElementById } from './utils/dom';
import { calculateRectColor } from './utils/heatmap';
import './treemap.scss';

const fontSize = 14;
const fontFamily = 'Roboto';
const limit = 2.2;
const events = {
  ROOT_CHANGE: new Event('root-change')
};
const modes = {
  HORIZONTAL: 0,
  VERTICAL: 1
};
const margin = 5;
const expandedList = [];
const marginTop = fontSize + 8;
const toggleButtonHeight = fontSize + 20;

var root, currentRoot, count = null;

function getJsonObject(data) {
  return JSON.parse(data || '{}');
}

function calculateRootCoordinates(params = {}) {
  const { top, bottom, left, right } = params;
  return { top: top + toggleButtonHeight, bottom: bottom - top * margin, left, right: right - left * margin }
}

function calculateNextCoordinateVertically(params = {}) {
  const { previousCoords, previousMode, proportion, parentProportion, parentCoords, maxLength, isFirst, maxLengthOfLastHorizontalRect, topOffset } = params;
  let top, bottom, left, right = null;

  if (!isFirst && previousMode != modes.VERTICAL ) {
    left = previousCoords.right + margin;
    top = previousCoords.top;
    right = parentCoords.right - margin;
    bottom = top + ((proportion * maxLengthOfLastHorizontalRect)/parentProportion);
  } else { 
    left = isFirst ? previousCoords.left + margin : previousCoords.left;
    top = isFirst ? previousCoords.top + topOffset : previousCoords.bottom + margin;
    right = isFirst ? previousCoords.right - margin : previousCoords.right;
    bottom = maxLengthOfLastHorizontalRect > 0 ? top + ((proportion * maxLengthOfLastHorizontalRect)/parentProportion) :  top + ((proportion * maxLength)/parentProportion) - topOffset;
  }
  
  return { left, top, right, bottom };
}

function calculateNextCoordinateHorizontally(params = {}) {
  const { previousCoords, proportion, parentProportion, parentCoords, maxLength, previousMode, maxLengthOfLastVerticalRect, isFirst, topOffset } = params;
  let top, bottom, left, right = null;

  if (!isFirst && previousMode != modes.HORIZONTAL) {
    left = previousCoords.left;
    top = previousCoords.bottom + margin;
    right = left + ((proportion * maxLengthOfLastVerticalRect)/parentProportion);
    bottom = parentCoords.bottom - margin;
  } else {
    left = isFirst ? previousCoords.left + margin : previousCoords.right + margin;
    top = isFirst ? previousCoords.top + topOffset : previousCoords.top;
    right = maxLengthOfLastVerticalRect > 0 ? left + ((proportion * maxLengthOfLastVerticalRect)/parentProportion) : left + ((proportion * maxLength)/parentProportion) - margin;
    bottom = isFirst ? previousCoords.bottom - margin : previousCoords.bottom;
  }

  return { left, top, right, bottom };
}

function calculateCoordinatesOfChildren(parent) {
  let horizontalLength, verticalLength, childCoords, current, previousMode = null;
  let maxLengthOfLastHorizontalRect, maxLengthOfLastVerticalRect = 0;
  let coords = parent.coords;
  let currentMaxHorizontalLength = coords.right - coords.left;
  let currentMaxVerticalLength = coords.bottom - coords.top;
  let currentParentProportion = parent.proportion;
  let children = [...parent.children];
  let isFirst = true;

  const coordinates = [];

  while (children.length > 0) {
    horizontalLength = currentMaxHorizontalLength - margin;
    verticalLength = currentMaxVerticalLength - margin;

    current = children.shift();

    if (horizontalLength > verticalLength) {
      childCoords = calculateNextCoordinateHorizontally({ 
        parentProportion: isFirst ? parent.proportion : currentParentProportion,
        proportion: current.proportion, 
        maxLength: horizontalLength, 
        parentCoords: parent.coords,
        maxLengthOfLastVerticalRect,
        topOffset: parent.topOffset,
        previousCoords: coords, 
        previousMode, 
        isFirst 
      });
      previousMode = modes.HORIZONTAL;
      currentMaxHorizontalLength -= childCoords.right - childCoords.left + margin;
      maxLengthOfLastVerticalRect -= childCoords.right - childCoords.left + margin;
      maxLengthOfLastHorizontalRect = childCoords.bottom - childCoords.top;
    } else {
      childCoords = calculateNextCoordinateVertically({
        parentProportion: isFirst ? parent.proportion : currentParentProportion, 
        maxLengthOfLastHorizontalRect,
        proportion: current.proportion, 
        maxLength: verticalLength,
        parentCoords: parent.coords,
        topOffset: parent.topOffset,
        previousCoords: coords, 
        previousMode, 

        isFirst
      });
      previousMode = modes.VERTICAL;
      currentMaxVerticalLength -= childCoords.bottom - childCoords.top + margin;
      maxLengthOfLastVerticalRect = childCoords.right - childCoords.left;
      maxLengthOfLastHorizontalRect -= childCoords.bottom - childCoords.top + margin;
    }

    coordinates.push(childCoords);
    coords = childCoords;
    isFirst = false;
    currentParentProportion -= current.proportion;
  }
  return coordinates;
}

function shouldRenderRectangle(coords) {
  return coords.bottom > coords.top && coords.right > coords.left && coords.bottom - coords.top >= limit && coords.right - coords.left >= limit;
}

function traverse(node, element) {
  const coords = calculateCoordinatesOfChildren(node);
  if (node.children.length > 0) {
      node.children.forEach((child, index) => {
          child.coords = coords[index];
          if(shouldRenderRectangle(coords[index])){
            element.appendChild(createRect(child));
            traverse(child, element);
          }
      });
  }
}

function createPathElement(className, fill, params = {}) {
  const { top, bottom, left, right } = params;
  const path = createSvgElement('path');
  path.classList.add(className);
  path.setAttribute('style', `fill: ${fill}`);
  path.setAttribute('d', `M${left},${top} L${right},${top} L${right},${bottom} L${left},${bottom} Z`);
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
  const height = coords.bottom - coords.top, width = coords.right - coords.left;
  const textTag = createSvgElement('text');

  textTag.classList.add(className);
  textTag.setAttribute('x', 0);
  textTag.setAttribute('y', 0);
  textTag.textContent = name;

  const textPixelWidth = measureTextWidth(name) + margin;
  let scale = width/textPixelWidth;
  if (scale > 1 && fontSize > height || scale < 1 && scale * fontSize > height) {
    scale = 0;
  }
  const transform = scale > 1 ? `translate(${coords.left + margin}, ${coords.top + fontSize})` : `translate(${coords.left}, ${coords.top + scale*fontSize})scale(${scale})`;
  textTag.setAttribute('style', `font-size: ${fontSize}px; fill: ${color}; fill-opacity: ${scale < 0.3 ? 0 : 1}; white-space: pre;`);
  textTag.setAttribute('transform', transform);
  if (isNode) {
    node.topOffset = scale > 1 ? marginTop : scale * fontSize + 5;
  }
  return textTag;
}

function renderTooltip(node, fillColor, textColor) {
  const { coords, name, proportion, type, heatmap } = node;
  let top, bottom, right, left, middleOfTooltip = null;
  const textContent = [
    'label=' + name, 
    'value=' + proportion, 
    'type=' + type?.toLowerCase(), 
    'heatmap=' + heatmap
  ]
  const maxRight = currentRoot.coords.right;
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
    middle: coords.top + fontSize/2 
  }

  top = triangle.middle - (textContent.length * fontSize)/2 - margin;
  bottom =  triangle.middle + (textContent.length * fontSize)/2 + margin;
  left = coords.right;
  right = left + maxTextPixelWidth;
  middleOfTooltip = (bottom - top) / 2;

  triangle.top = top + middleOfTooltip*0.8;
  triangle.bottom = bottom - middleOfTooltip*0.8;

  if (right > maxRight) {
    right = coords.right - triangle.width;
    left = right - maxTextPixelWidth - triangle.width;
    triangle.right = right + triangle.width;
    path.setAttribute('d', `M${left},${top} L${right},${top} L${right},${triangle.top} L${triangle.right},${top + middleOfTooltip} L${right},${triangle.bottom} L${right},${bottom} L${left},${bottom} L${left},${top}Z`);
  } else {
    left = coords.right;
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
  const { fill, color } = calculateRectColor(root.proportion, node.proportion);
  const container = createSvgElement('g');
  container.addEventListener('click', () => expand(node));
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
      proportion: jsonData.proportion || 0,
      children: jsonData.children || [],
      topOffset: 0,
      type: jsonData.type || null,
      heatmap: jsonData.heatmap || null,
      coords: jsonData.coords || {}
    }
}

function createSubnode(data, parentNode) {
  count++;
  data.children.sort((first, second) => second.loc - first.loc);
  data.children.forEach((child) => {
      const node = { 
          id: count,
          name: child.name,
          parent: parentNode.id,
          proportion: child.loc,
          topOffset: 0,
          type: child.type,
          heatmap: child.heatmap,
          children: []
      };
      parentNode?.children?.push(node);
      createSubnode(child, node);
  });
}

function updateToggleButtonText() {
  const textElement = getElementById('collapse-button-text');
  const textContent = expandedList.map((node) => node.name);
  textContent.unshift('all');
  const totalSize = textContent.length == 1 ? root.proportion : expandedList[expandedList.length - 1].proportion;
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

function expand(node) {
  if(node.parent == null || isAlreadyExpanded(node)) 
    return;
  currentRoot = getNodeById(node.id, root);
  expandedList.push({ id: node.id, name: node.name, proportion: node.proportion });
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
  const { top, left, right } = params;
  const { fill, color } = calculateRectColor(root.proportion, root.proportion);
  const container = createSvgElement('g');

  const path = createPathElement('path', fill, { top, left, right: right - left * margin, bottom: top + toggleButtonHeight });
  path.addEventListener('click', () => collapse());
  container.appendChild(path);

  const text = createTextElement('text', { name: 'all: ' + root.proportion, coords: { top: top + (toggleButtonHeight - fontSize)/2, right, left } }, color, false);
  text.setAttribute('id', 'collapse-button-text');
  container.appendChild(text);

  return container;
}

function cerateTreemapContainer(targetElement, params = {}) {
  const { top, bottom, left, right } = params;
  const svg = createSvgElement('svg');
  svg.setAttribute('id', 'treemap');
  svg.setAttribute('width', right + left);
  svg.setAttribute('height', bottom + top);

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

function renderTreemap(targetElement, params) {
  clearTreemap(targetElement);
  currentRoot.coords = calculateRootCoordinates(params);
  targetElement.appendChild(createRect(currentRoot));
  traverse(currentRoot, targetElement)
}

function resize(targetElement) {
  clearTreemap(targetElement);
  const targetElementPosition = targetElement.getBoundingClientRect();
  const treemapContainer = cerateTreemapContainer(targetElement, targetElementPosition);
  renderTreemap(treemapContainer, targetElementPosition);
}

export function create(jsonData) {
  count = 0;
  const parsedData = getJsonObject(jsonData);
  const rootNode = createNode({
      id: count,
      name: parsedData.name,
      proportion: parsedData.loc,
      children: [],
      type: parsedData.type,
      heatmap: parsedData.heatmap,
      topOffset: 0,
      parent: null
  });
  createSubnode(parsedData, rootNode);
  return rootNode;
}

export function render(rootNode, targetElement) {
  currentRoot = rootNode; 
  root = rootNode;
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
    create,
    render
}
