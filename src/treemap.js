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

var root, currentRoot = null;

function getJsonObject(data) {
  return JSON.parse(data || '{}');
}

function calculateRootCoordinates(params = {}) {
  const { top, bottom, left, right } = params;
  return { top: top + toggleButtonHeight, bottom: bottom - top * margin, left, right: right - left * margin }
}

function calculateNextCoordinateVertically(params = {}) {
  const { previousCoords, previousMode, proportion, parentProportion, parentCoords, maxLength, isFirst, maxLengthOfLastHorizontalRect, topText } = params;
  let top, bottom, left, right = null;

  if (!isFirst && previousMode != modes.VERTICAL ) {
    left = previousCoords.right + margin;
    top = previousCoords.top;
    right = parentCoords.right - margin;
    bottom = top + ((proportion * maxLengthOfLastHorizontalRect)/parentProportion);
  } else { 
    left = isFirst ? previousCoords.left + margin : previousCoords.left;
    top = isFirst ? previousCoords.top + topText : previousCoords.bottom + margin;
    right = isFirst ? previousCoords.right - margin : previousCoords.right;
    bottom = maxLengthOfLastHorizontalRect > 0 ? top + ((proportion * maxLengthOfLastHorizontalRect)/parentProportion) :  top + ((proportion * maxLength)/parentProportion) - topText;
  }
  
  return { left, top, right, bottom };
}

function calculateNextCoordinateHorizontally(params = {}) {
  const { previousCoords, proportion, parentProportion, parentCoords, maxLength, previousMode, maxLengthOfLastVerticalRect, isFirst, topText } = params;
  let top, bottom, left, right = null;

  if (!isFirst && previousMode != modes.HORIZONTAL) {
    left = previousCoords.left;
    top = previousCoords.bottom + margin;
    right = left + ((proportion * maxLengthOfLastVerticalRect)/parentProportion);
    bottom = parentCoords.bottom - margin;
  } else {
    left = isFirst ? previousCoords.left + margin : previousCoords.right + margin;
    top = isFirst ? previousCoords.top + topText : previousCoords.top;
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
        topText: parent.topText,
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
        topText: parent.topText,
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

function createTextElement(className, node, color, isNode=true) {
  const { coords, name } = node;
  const height = coords.bottom - coords.top, width = coords.right - coords.left;
  const textTag = createSvgElement('text');
  const canvas = createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = fontSize + 'px ' + fontFamily;

  textTag.classList.add(className);
  textTag.setAttribute('x', 0);
  textTag.setAttribute('y', 0);
  textTag.textContent = name;

  const textPixelWidth = context.measureText(name).width + margin;
  let scale = width/textPixelWidth;
  if (scale > 1 && fontSize > height || scale < 1 && scale * fontSize > height) {
    scale = 0;
  }
  const transform = scale > 1 ? `translate(${coords.left + margin}, ${coords.top + fontSize})` : `translate(${coords.left}, ${coords.top + scale*fontSize})scale(${scale})`;
  textTag.setAttribute('style', `font-size: ${fontSize}px; fill: ${color}; fill-opacity: ${scale < 0.3 ? 0 : 1}; white-space: pre;`);
  textTag.setAttribute('transform', transform);
  if (isNode) {
    node.topText = scale > 1 ? marginTop : scale * fontSize + 5;
  }
  return textTag;
}

function createRect(node) {
  const { fill, color } = calculateRectColor(root.proportion, node.proportion);
  const container = createSvgElement('g');
  container.addEventListener('click', () => expand(node));
  container.appendChild(createPathElement('path', fill, node.coords));
  container.appendChild(createTextElement('text', node, color));
  return container;
}

function createNode(jsonData) {
  return {
      name: jsonData.hasOwnProperty('name') ? jsonData.name : null,
      parent: jsonData.parent || null,
      proportion: jsonData.proportion || 0,
      children: jsonData.children || [],
      topText: 0,
      coords: jsonData.coords || {}
    }
}

function createSubnode(data, parentNode) {
  data.children.sort((first, second) => second.proportion - first.proportion);
  data.children.forEach((child) => {
      const node = createNode({ 
          name: child.name,
          parent: parentNode,
          proportion: child.proportion,
          topText: 0,
          children: []
      });
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
  return expandedList.filter((item) => item.name == node.name).length > 0;
}

function expand(node) {
  if(!node.parent || isAlreadyExpanded(node)) 
    return;
  currentRoot = node;
  expandedList.push(node);
  window.dispatchEvent(events.ROOT_CHANGE);
}

function collapse() {
  if(expandedList.length === 0)
    return;
  expandedList.pop();
  currentRoot = expandedList[expandedList.length - 1] ?? root;
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
  svg.setAttribute('width', right + left);
  svg.setAttribute('height', bottom + top);

  svg.appendChild(createToggleButton(params));

  const container = createSvgElement('g');
  container.classList.add('treemap-rects');

  svg.appendChild(container);
  targetElement.appendChild(svg);

  return container;
}

function renderTreemap(targetElement, params) {
  targetElement.innerHTML = '';
  currentRoot.coords = calculateRootCoordinates(params);
  targetElement.appendChild(createRect(currentRoot));
  traverse(currentRoot, targetElement)
}

export function create(jsonData) {
  const parsedData = getJsonObject(jsonData);
  const rootNode = createNode({
      name: parsedData.name,
      proportion: parsedData.proportion,
      children: [],
      topText: 0,
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
    renderTreemap(treemapContainer, targetElementPosition); 
    updateToggleButtonText();
  });

  renderTreemap(treemapContainer, targetElementPosition);
}

export default {
    create,
    render
}
