import { createSvgElement, getElementById } from './utils/dom';
import { calculateRectColor } from './utils/heatmap';
import './treemap.scss';

var margin = 8;
var marginTop = 25;
var collapseButtonHeight = 40;
var currentRoot = null;
var expandedList = [];
var root = null;

const events = {
  ROOT_CHANGE: new Event('root-change')
}

function resize(params = {}) {
  const { height } = params;
  marginTop = height / 30;
}

function getJsonObject(data) {
  return JSON.parse(data || '{}');
}

function calculateRectCoordinates(params = {}) {
  const { left, top, right, bottom} = params;
  return {
    rect: { top, bottom, left, right },
    text: { top: top +  marginTop, left: left + margin }
  }
}

function calculateRootCoordinates(tree, params = {}) {
  const { top, bottom, left, right } = params;
  tree['coords'] = {
    rect: { top: top + collapseButtonHeight, bottom: bottom - top * margin, left, right: right - left * margin },
    text: { left: left + margin, top: top + marginTop + collapseButtonHeight }
  }
}

function fillTheRectangleVertically(node, totalLength) {
  const { children, coords, size } = node;
  const coordinates = [];
  let previous = coords;

  children?.forEach((child, index) => {
    let left = coords.rect.left + margin;
    let top = index > 0 ? previous.rect.bottom + margin : coords.rect.top + 1.5 * marginTop;
    let right = coords.rect.right - margin;
    let bottom = top + ((child.size * totalLength)/size);
    
    let newCoords = calculateRectCoordinates({ left, top, right, bottom });
    coordinates.push(newCoords);
    previous = newCoords;
  })

  return coordinates;
}

function fillTheRectangleHorizontally(node, totalLength) {
  const { children, coords, size } = node;
  const coordinates = [];
  let previous = coords;

  children?.forEach((child, index) => {
    let left = index > 0 ? previous.rect.right + margin : previous.rect.left + margin;
    let top = coords.rect.top + 1.5 * marginTop;
    let right = left + ((child.size * totalLength)/size);
    let bottom = coords.rect.bottom - margin;

    let newCoords = calculateRectCoordinates({ left, top, right, bottom });
    coordinates.push(newCoords);
    previous = newCoords;
  })
  return coordinates;
}

function traverse(node, element) {
  const coords = getCoordinatesOfChildren(node);
  if (node.children.length > 0) {
      node.children.forEach((child, index) => {
          child['coords'] = coords[index];
          element.appendChild(createRect(child));
          traverse(child, element);
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

function createTextElement(className, value, color, params = {}) {
  const { top, left } = params;
  const text = createSvgElement('text');
  text.classList.add(className);
  text.setAttribute('x', left);
  text.setAttribute('y', top);
  text.setAttribute('style', `fill: ${color};`)
  text.textContent = value;
  return text;
}

function getCoordinatesOfChildren(node) {
  const { coords, children } = node;
  const horizontalLength = coords.rect.right - coords.rect.left - ((children?.length + 1) * margin);
  const verticalLength = coords.rect.bottom - coords.rect.top - 1.5 * marginTop - (children?.length * margin);

  if (horizontalLength > verticalLength) {
    return fillTheRectangleHorizontally(node, horizontalLength);
  }

  return fillTheRectangleVertically(node, verticalLength);
}

function createRect(node) {
  const { value, coords } = node;
  const { fill, color } = calculateRectColor(root.size, node.size);
  const container = createSvgElement('g');
  container.addEventListener('click', () => expand(node));
  container.appendChild(createPathElement('path', fill, coords.rect));
  container.appendChild(createTextElement('text', value, color, coords.text));
  return container;
}

function createNode(jsonData) {
  return {
      parent: jsonData.parent || null,
      size: jsonData.size || 0,
      value: jsonData.hasOwnProperty('value') ? jsonData.value : null,
      children: jsonData.children || [],
      coords: jsonData.coords || {}
    }
}

function createSubnode(data, parentNode) {
  data?.children?.forEach((child) => {
      const node = createNode({ 
          value: child.value,
          parent: parentNode,
          size: child.size,
          children: []
      });
      parentNode?.children?.push(node);
      createSubnode(child, node);
  });
}

function updateCollapseButtonText() {
  const textElement = getElementById('collapse-button-text');
  const textContent = expandedList.map((node) => node.value);
  textContent.unshift('all');
  textElement.textContent = textContent.join(' - ');
}

function isAlreadyExpanded(node) {
  return expandedList.filter((item) => item.value == node.value).length > 0;
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

function createCollapseButton(params = {}) {
  const { top, left, right } = params;
  const { fill, color } = calculateRectColor(root.size, root.size);
  const container = createSvgElement('g');

  const path = createPathElement('path', fill, { top, left, right: right - left * margin, bottom: top + collapseButtonHeight });
  path.addEventListener('click', () => collapse());
  container.appendChild(path);

  const text = createTextElement('text', 'all', color, { top: top + marginTop, left: left + margin });
  text.setAttribute('id', 'collapse-button-text');
  container.appendChild(text);

  return container;
}

function cerateTreemapContainer(targetElement, params = {}) {
  const { top, bottom, left, right } = params;
  const svg = createSvgElement('svg');
  svg.setAttribute('width', right + left);
  svg.setAttribute('height', bottom + top);

  svg.appendChild(createCollapseButton(params));

  const container = createSvgElement('g');
  container.classList.add('treemap-rects');

  svg.appendChild(container);
  targetElement.appendChild(svg);

  return container;
}

function renderTreemap(targetElement, params) {
  targetElement.innerHTML = '';
  resize(params);
  calculateRootCoordinates(currentRoot, params);
  targetElement.appendChild(createRect(currentRoot));
  traverse(currentRoot, targetElement)
}

export function create(jsonData) {
  const parsedData = getJsonObject(jsonData);
  const rootNode = createNode({
      value: parsedData.value,
      size: parsedData.size,
      children: [],
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
    updateCollapseButtonText();
  });

  renderTreemap(treemapContainer, targetElementPosition);
}

export default {
    create,
    render
}
