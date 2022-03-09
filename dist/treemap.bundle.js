/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["treemap"] = factory();
	else
		root["treemap"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/treemap.scss":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/treemap.scss ***!
  \*******************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n___CSS_LOADER_EXPORT___.push([module.id, \"@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap);\"]);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"* {\\n  user-select: none;\\n  padding: 0;\\n  margin: 0;\\n}\\n\\n.path {\\n  stroke-width: 1.5;\\n  fill-opacity: 1;\\n  stroke: white;\\n  stroke-opacity: 1;\\n  opacity: 1;\\n  fill: #e9e6e6;\\n  cursor: pointer;\\n}\\n\\n.path:hover {\\n  stroke: #363636;\\n  stroke-width: 2;\\n}\\n\\n.text {\\n  fill: #424242;\\n  fill-opacity: 1;\\n  font-family: \\\"Roboto\\\", sans-serif;\\n  cursor: pointer;\\n}\\n\\n.tooltip {\\n  pointer-events: none;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://treemap/./src/treemap.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n\n      content += cssWithMappingToString(item);\n\n      if (needLayer) {\n        content += \"}\";\n      }\n\n      if (item[2]) {\n        content += \"}\";\n      }\n\n      if (item[4]) {\n        content += \"}\";\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n\n\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://treemap/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://treemap/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/treemap.scss":
/*!**************************!*\
  !*** ./src/treemap.scss ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_treemap_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./treemap.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/treemap.scss\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_treemap_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_treemap_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_treemap_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_treemap_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://treemap/./src/treemap.scss?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n\n  return updater;\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://treemap/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n/* istanbul ignore next  */\n\n\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n\n  target.appendChild(style);\n}\n\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://treemap/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://treemap/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\n\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://treemap/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n\n  var needLayer = typeof obj.layer !== \"undefined\";\n\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n\n  css += obj.css;\n\n  if (needLayer) {\n    css += \"}\";\n  }\n\n  if (obj.media) {\n    css += \"}\";\n  }\n\n  if (obj.supports) {\n    css += \"}\";\n  }\n\n  var sourceMap = obj.sourceMap;\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, styleElement, options.options);\n}\n\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n\n  styleElement.parentNode.removeChild(styleElement);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://treemap/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\n\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://treemap/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"create\": () => (/* binding */ create),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"render\": () => (/* binding */ render)\n/* harmony export */ });\n/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/dom */ \"./src/utils/dom.js\");\n/* harmony import */ var _utils_heatmap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/heatmap */ \"./src/utils/heatmap.js\");\n/* harmony import */ var _treemap_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./treemap.scss */ \"./src/treemap.scss\");\n\r\n\r\n\r\n\r\nconst fontSize = 14;\r\nconst fontFamily = 'Roboto';\r\nconst events = {\r\n  ROOT_CHANGE: new Event('root-change')\r\n};\r\nconst heatmap = {\r\n  min: 0,\r\n  max: 0\r\n};\r\nconst margin = 5;\r\nconst expandedList = [];\r\nconst marginTop = fontSize + 8;\r\nconst toggleButtonHeight = fontSize + 20;\r\n\r\nlet rectangle = {data: []};\r\n\r\nvar root, currentRoot, count = null;\r\n\r\nfunction getJsonObject(data) {\r\n  return JSON.parse(data || '{}');\r\n}\r\n\r\nfunction createPathElement(className, fill, params = {}) {\r\n  const { x, y, width, height } = params;\r\n  const path = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.createSvgElement)('path');\r\n  path.classList.add(className);\r\n  path.setAttribute('style', `fill: ${fill}`);\r\n  path.setAttribute('d', `M${x},${y} L${width + x},${y} L${width + x},${height + y} L${x},${height + y} Z`);\r\n  return path; \r\n}\r\n\r\nfunction measureTextWidth(text) {\r\n  const canvas = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.createElement)('canvas');\r\n  const context = canvas.getContext('2d');\r\n  context.font = fontSize + 'px ' + fontFamily;\r\n\r\n  return context.measureText(text).width;\r\n}\r\n\r\nfunction createTextElement(className, node, color, isNode=true) {\r\n  const { coords, name } = node;\r\n  const textTag = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.createSvgElement)('text');\r\n\r\n  textTag.classList.add(className);\r\n  textTag.setAttribute('x', 0);\r\n  textTag.setAttribute('y', 0);\r\n  textTag.textContent = name;\r\n\r\n  const textPixelWidth = measureTextWidth(name) + margin;\r\n  let scale = coords.width/textPixelWidth;\r\n  if (scale > 1 && fontSize > coords.height || scale < 1 && scale * fontSize > coords.height) {\r\n    scale = 0;\r\n  }\r\n  const transform = scale > 1 ? `translate(${coords.x + margin}, ${coords.y + fontSize})` : `translate(${coords.x}, ${coords.y + scale*fontSize})scale(${scale})`;\r\n  textTag.setAttribute('style', `font-size: ${fontSize}px; fill: ${color}; fill-opacity: ${scale < 0.3 ? 0 : 1}; white-space: pre;`);\r\n  textTag.setAttribute('transform', transform);\r\n  if (isNode) {\r\n    node.topOffset = scale > 1 ? marginTop : scale * fontSize + 5;\r\n  }\r\n  return textTag;\r\n}\r\n\r\nfunction renderTooltip(node, fillColor, textColor) {\r\n  const { coords, name, proportion, type, heatmap } = node;\r\n  let top, bottom, right, left, middleOfTooltip = null;\r\n  const textContent = [\r\n    'label=' + name, \r\n    'value=' + proportion, \r\n    'type=' + type?.toLowerCase(), \r\n    'heatmap=' + Math.round(heatmap)\r\n  ]\r\n  const maxWidth = currentRoot.coords.width + currentRoot.coords.x;\r\n  const maxHeight = currentRoot.coords.height;\r\n  const maxTextPixelWidth = Math.max(...textContent.map(el => measureTextWidth(el)));\r\n  const container = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.createSvgElement)('g'), path = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.createSvgElement)('path');\r\n\r\n  path.setAttribute('style', `fill: ${fillColor}; stroke: rgb(54, 54, 54); stroke-width: 2;`);\r\n  container.classList.add('tooltip');\r\n  container.appendChild(path);\r\n\r\n  const triangle = {\r\n    width: 10, \r\n    top: 0, \r\n    bottom: 0,\r\n    left: 0,\r\n    right: 0,\r\n    middle: bottom > maxHeight ? coords.height + coords.y - fontSize/2  : coords.y + fontSize/2 \r\n  }\r\n\r\n  top = triangle.middle - (textContent.length * fontSize)/2 - margin;\r\n  bottom = triangle.middle + (textContent.length * fontSize)/2 + margin;\r\n  left = coords.width + coords.x;\r\n  right = left + maxTextPixelWidth;\r\n\r\n  top = bottom > maxHeight ? triangle.middle - (textContent.length * fontSize) - margin : top;\r\n  bottom = bottom > maxHeight ? triangle.middle + margin : bottom;\r\n\r\n  middleOfTooltip = top + (bottom - top) / 2 < coords.y ? (bottom - top) * 0.82 : (bottom - top) / 2;\r\n\r\n  triangle.top = top + (bottom - top) / 2 < coords.y ? bottom - 15 : top + middleOfTooltip*0.8;\r\n  triangle.bottom = top + (bottom - top) / 2 < coords.y ? bottom - 8 : bottom - middleOfTooltip*0.8;\r\n\r\n  if (right > maxWidth) {\r\n    right = coords.width + coords.x - triangle.width;\r\n    left = right - maxTextPixelWidth - triangle.width;\r\n    triangle.right = right + triangle.width;\r\n    path.setAttribute('d', `M${left},${top} L${right},${top} L${right},${triangle.top} L${triangle.right},${top + middleOfTooltip} L${right},${triangle.bottom} L${right},${bottom} L${left},${bottom} L${left},${top}Z`);\r\n  } else {\r\n    triangle.left = left - triangle.width;\r\n    path.setAttribute('d', `M${left},${top} L${right},${top} L${right},${bottom} L${left},${bottom} L${left},${triangle.bottom} L${triangle.left},${top + middleOfTooltip} L${left},${triangle.top} L${left},${top}Z`);\r\n  }\r\n\r\n  textContent.forEach((el, index) => {\r\n    let text = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.createSvgElement)('text');\r\n    text.setAttribute('x', 0);\r\n    text.setAttribute('y', 0);\r\n    text.classList.add('tooltip-text');\r\n    text.setAttribute('style', `font-size: ${fontSize}px; fill: ${textColor}; white-space: pre;`);\r\n    text.setAttribute('transform', `translate(${left + margin}, ${top + (index + 1 ) * fontSize})`);\r\n    text.textContent = el;\r\n\r\n    container.appendChild(text);\r\n  });\r\n\r\n  (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getElementById)('treemap').appendChild(container);\r\n}\r\n\r\nfunction removeTooltip() {\r\n  document.querySelectorAll('.tooltip').forEach((el) => el.remove());\r\n}\r\n\r\nfunction createRect(node) {\r\n  const { fill, color } = (0,_utils_heatmap__WEBPACK_IMPORTED_MODULE_1__.calculateRectColor)(node.heatmap, heatmap);\r\n  const container = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.createSvgElement)('g');\r\n  if(node.type === 'DIR') {\r\n    container.addEventListener('click', () => expand(node));\r\n  }\r\n  container.addEventListener('mouseover', () => renderTooltip(node, fill, color));\r\n  container.addEventListener('mouseout', () => removeTooltip());\r\n  container.appendChild(createPathElement('path', fill, node.coords));\r\n  container.appendChild(createTextElement('text', node, color));\r\n  return container;\r\n}\r\n\r\nfunction createNode(jsonData) {\r\n  return {\r\n      id: count || 0,\r\n      name: jsonData.hasOwnProperty('name') ? jsonData.name : null,\r\n      parent: jsonData.parent || null,\r\n      proportion: jsonData.proportion || 0,\r\n      children: jsonData.children || [],\r\n      topOffset: 0,\r\n      type: jsonData.type || null,\r\n      heatmap: jsonData.heatmap || null,\r\n      coords: jsonData.coords || {},\r\n      scaledProportion: 0\r\n    }\r\n}\r\n\r\nfunction createSubnode(data, parentNode) {\r\n  count++;\r\n  data.children.sort((first, second) => second.loc - first.loc);\r\n  data.children.forEach((child) => {\r\n      const node = { \r\n          id: count,\r\n          name: child.name,\r\n          parent: parentNode.id,\r\n          proportion: child.loc,\r\n          topOffset: 0,\r\n          type: child.type,\r\n          heatmap: child.heatmap,\r\n          children: [],\r\n          scaledProportion: 0\r\n      };\r\n      parentNode?.children?.push(node);\r\n      createSubnode(child, node);\r\n  });\r\n}\r\n\r\nfunction updateToggleButtonText() {\r\n  const textElement = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.getElementById)('collapse-button-text');\r\n  const textContent = expandedList.map((node) => node.name);\r\n  textContent.unshift(root.name);\r\n  const totalSize = textContent.length == 1 ? root.proportion : expandedList[expandedList.length - 1].proportion;\r\n  textElement.textContent = textContent.join(' / ') + ': ' + totalSize;\r\n}\r\n\r\nfunction isAlreadyExpanded(node) {\r\n  return expandedList.filter((item) => item.id == node.id).length > 0;\r\n}\r\n\r\nfunction getNodeById(id, node) {\r\n  if(node?.id == id){\r\n    return node;\r\n  } else {\r\n    if (node.children.length > 0) {\r\n      for(let i = 0; i < node.children.length; i++) {\r\n        let result = getNodeById(id, node.children[i]);\r\n        if (result != null) {\r\n          return result;\r\n        }\r\n      }\r\n    }\r\n    return null;\r\n  }\r\n}\r\n\r\nfunction getPathToNode(node) {\r\n  const path = [];\r\n  let parent = currentRoot.parent;\r\n\r\n  while(parent != null) {\r\n    let currentNode = getNodeById(parent, root);\r\n    if(isAlreadyExpanded(currentNode)) {\r\n      break;\r\n    }\r\n    path.push({ id: currentNode.id, name: currentNode.name, proportion: currentNode.proportion });\r\n    parent = currentNode.parent;\r\n  }\r\n  path.pop();\r\n  path.reverse();\r\n  path.push({ id: node.id, name: node.name, proportion: node.proportion });\r\n\r\n  return path;\r\n}\r\n\r\nfunction expand(node) {\r\n  if(node.parent == null || isAlreadyExpanded(node)) \r\n    return;\r\n  currentRoot = getNodeById(node.id, root);\r\n  expandedList.push(...getPathToNode(node));\r\n  window.dispatchEvent(events.ROOT_CHANGE);\r\n}\r\n\r\nfunction collapse() {\r\n  if(expandedList.length == 0)\r\n    return;\r\n  expandedList.pop();\r\n  const last = expandedList[expandedList.length - 1];\r\n  currentRoot = getNodeById(last ? last.id : root.id, root);\r\n  window.dispatchEvent(events.ROOT_CHANGE);\r\n}\r\n\r\nfunction createToggleButton(params = {}) {\r\n  const { x, y, width } = params;\r\n  const container = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.createSvgElement)('g');\r\n\r\n  const path = createPathElement('path', 'hsl(240, 100%, 92%)', { y, x, width: width, height: y + toggleButtonHeight });\r\n  path.addEventListener('click', () => collapse());\r\n  container.appendChild(path);\r\n\r\n  const text = createTextElement('text', { name: root.name + ': ' + root.proportion, coords: { y: y + (toggleButtonHeight - fontSize)/2, width, x } }, 'rgb(0,0,0)', false);\r\n  text.setAttribute('id', 'collapse-button-text');\r\n  container.appendChild(text);\r\n\r\n  return container;\r\n}\r\n\r\nfunction cerateTreemapContainer(targetElement, params = {}) {\r\n  const { top, bottom, left, right } = params;\r\n\r\n  const svg = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.createSvgElement)('svg');\r\n  svg.setAttribute('id', 'treemap');\r\n  svg.setAttribute('width', right + left);\r\n  svg.setAttribute('height', bottom + top);\r\n\r\n  svg.appendChild(createToggleButton(params));\r\n\r\n  const container = (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.createSvgElement)('g');\r\n  container.classList.add('treemap-rects');\r\n\r\n  svg.appendChild(container);\r\n  targetElement.appendChild(svg);\r\n\r\n  return container;\r\n}\r\n\r\nfunction clearTreemap(element) {\r\n  while(element.firstChild) {\r\n    element.removeChild(element.firstChild);\r\n  }\r\n}\r\n\r\nfunction getMinWidth() {\r\n  if (rectangle.height > rectangle.width) {\r\n    return { value: rectangle.width, vertical: false };\r\n  }\r\n  return { value: rectangle.height, vertical: true };\r\n}\r\n\r\nconst layoutRow = (row, width, vertical, element) => {\r\n  if(row.length === 0) {\r\n    return;\r\n  }\r\n  const rowHeight = row.map(each => each.scaledProportion).reduce((a,b) => a + b, 0) / width;\r\n  row.forEach((rowItem) => {\r\n    const rowWidth = rowItem.scaledProportion / rowHeight;\r\n    let data;\r\n    if (vertical) {\r\n      data = {\r\n        x: rectangle.x,\r\n        y: rectangle.y,\r\n        width: rowHeight,\r\n        height: rowWidth,\r\n      };\r\n      rectangle.y += rowWidth;\r\n    } else {\r\n      data = {\r\n        x: rectangle.x,\r\n        y: rectangle.y,\r\n        width: rowWidth,\r\n        height: rowHeight,\r\n      };\r\n      rectangle.x += rowWidth;\r\n    }\r\n\r\n    rowItem.coords = data;\r\n    if(data.y < data.height + data.y && data.x < data.width + data.x) {\r\n      element.appendChild(createRect(rowItem));\r\n    }\r\n  });\r\n\r\n  if (vertical) {\r\n    rectangle.x += rowHeight;\r\n    rectangle.y -= width;\r\n    rectangle.width -= rowHeight;\r\n  } else {\r\n    rectangle.x -= width;\r\n    rectangle.y += rowHeight;\r\n    rectangle.height -= rowHeight;\r\n  }\r\n};\r\n\r\nfunction worstRatio(row, width) {\r\n  const values = row.map(each => each.scaledProportion);\r\n  const sum = values.reduce((a, b) => a + b, 0);\r\n  const rowMax = Math.max(...values);\r\n  const rowMin = Math.min(...values);\r\n  return Math.max(\r\n    (width ** 2 * rowMax) / sum ** 2,\r\n    sum ** 2 / (width ** 2 * rowMin)\r\n  );\r\n}\r\n\r\nconst layoutLastRow = (rows, children, width, element) => {\r\n  const { vertical } = getMinWidth();\r\n  layoutRow(rows, width, vertical, element);\r\n  layoutRow(children, width, vertical, element);\r\n};\r\n\r\nconst squarify = (children, row, width, element) => {\r\n\r\n  if(children.length === 0){\r\n    return;\r\n  }\r\n\r\n  if (children.length === 1) {\r\n    return layoutLastRow(row, children, width, element);\r\n  }\r\n\r\n  const rowWithChild = [...row, children[0]];\r\n\r\n  if (\r\n    row.length === 0 ||\r\n    worstRatio(row, width) >= worstRatio(rowWithChild, width)\r\n  ) {\r\n    children.shift();\r\n    return squarify(children, rowWithChild, width, element);\r\n  }\r\n  layoutRow(row, width, getMinWidth().vertical, element);\r\n  return squarify(children, [], getMinWidth().value, element);\r\n};\r\n\r\nfunction traverse(node, element) {\r\n  const isRoot = node.id === currentRoot.id;\r\n  const totalValue = node.children.map((child) => child.proportion).reduce((a, b) => a + b, 0);\r\n  const width = isRoot ? node.coords.width : node.coords.width - 2*margin;\r\n  const height = isRoot ? node.coords.height - toggleButtonHeight : node.coords.height - node.topOffset - margin;\r\n  node.children.forEach((child) => { child.scaledProportion = (child.proportion * width * height) / totalValue });\r\n  const children = [...node.children];\r\n\r\n  rectangle = {\r\n    ...rectangle, \r\n    x: isRoot ? node.coords.x : node.coords.x + margin,\r\n    y: isRoot ? node.coords.y + toggleButtonHeight : node.coords.y + node.topOffset,\r\n    width: width,\r\n    height: height\r\n  };\r\n\r\n  squarify(children, [], getMinWidth().value, element);\r\n\r\n  node.children.forEach((child) => {\r\n    traverse(child, element);\r\n  })\r\n}\r\n\r\nfunction renderTreemap(targetElement, params) {\r\n  clearTreemap(targetElement);\r\n  currentRoot.coords = params;\r\n  traverse(currentRoot, targetElement);\r\n}\r\n\r\nfunction resize(targetElement) {\r\n  clearTreemap(targetElement);\r\n  const targetElementPosition = targetElement.getBoundingClientRect();\r\n  const treemapContainer = cerateTreemapContainer(targetElement, targetElementPosition);\r\n  renderTreemap(treemapContainer, targetElementPosition);\r\n}\r\n\r\nfunction calculateMinMaxHeatmap() {\r\n  const traverseForGetHeatmapValues = (node) => {\r\n    if(node?.heatmap) {\r\n      if(node.heatmap > heatmap.max) {\r\n        heatmap.max = node.heatmap;\r\n      } else if(node.heatmap < heatmap.min) {\r\n        heatmap.min = node.heatmap;\r\n      }\r\n    }\r\n\r\n    if (node.children.length > 0) {\r\n      node.children.forEach((child) => {\r\n        traverseForGetHeatmapValues(child);\r\n      });\r\n    }\r\n  }\r\n \r\n  traverseForGetHeatmapValues(currentRoot);\r\n}\r\n\r\nfunction create(jsonData) {\r\n  count = 0;\r\n  const parsedData = getJsonObject(jsonData);\r\n  const rootNode = createNode({\r\n      id: count,\r\n      name: parsedData.name,\r\n      proportion: parsedData.loc,\r\n      children: [],\r\n      type: parsedData.type,\r\n      heatmap: parsedData.heatmap,\r\n      topOffset: 0,\r\n      parent: null,\r\n      scaledProportion: 0\r\n  });\r\n  createSubnode(parsedData, rootNode);\r\n  return rootNode;\r\n}\r\n\r\nfunction render(rootNode, targetElement) {\r\n  currentRoot = rootNode; \r\n  root = rootNode;\r\n  const targetElementPosition = targetElement.getBoundingClientRect();\r\n  const treemapContainer = cerateTreemapContainer(targetElement, targetElementPosition);\r\n  calculateMinMaxHeatmap();\r\n\r\n  window.addEventListener('root-change', () => { \r\n    removeTooltip();\r\n    renderTreemap(treemapContainer, targetElementPosition); \r\n    updateToggleButtonText();\r\n  });\r\n\r\n  window.addEventListener('resize', () => { \r\n    resize(targetElement);\r\n  });\r\n\r\n  renderTreemap(treemapContainer, targetElementPosition);\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\r\n    create,\r\n    render\r\n});\r\n\n\n//# sourceURL=webpack://treemap/./src/index.js?");

/***/ }),

/***/ "./src/utils/dom.js":
/*!**************************!*\
  !*** ./src/utils/dom.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createElement\": () => (/* binding */ createElement),\n/* harmony export */   \"createSvgElement\": () => (/* binding */ createSvgElement),\n/* harmony export */   \"getElementById\": () => (/* binding */ getElementById)\n/* harmony export */ });\nfunction createSvgElement(element) {\r\n    return document.createElementNS('http://www.w3.org/2000/svg', element);\r\n};\r\n\r\nfunction createElement(element) {\r\n    return document.createElement(element);\r\n}\r\n\r\nfunction getElementById(element) {\r\n    return document.getElementById(element);\r\n}\n\n//# sourceURL=webpack://treemap/./src/utils/dom.js?");

/***/ }),

/***/ "./src/utils/heatmap.js":
/*!******************************!*\
  !*** ./src/utils/heatmap.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"calculateRectColor\": () => (/* binding */ calculateRectColor)\n/* harmony export */ });\nconst hue = 240;\r\nconst saturation = 100;\r\n\r\nfunction calculateRectColor(rectHeatmap, heatmap) {\r\n    const diff = heatmap.max - heatmap.min;\r\n    let lightness = 95;\r\n    if(diff > 0) {\r\n        const value = ((rectHeatmap - heatmap.min) / (heatmap.max - heatmap.min));\r\n        lightness = (1 - value) * lightness;\r\n    }\r\n    return {\r\n        fill: `hsl(${hue}, ${saturation}%, ${lightness}%)`,\r\n        color: lightness > 50 ? 'rgb(0,0,0)' : 'rgb(255,255,255)'\r\n    }\r\n}\n\n//# sourceURL=webpack://treemap/./src/utils/heatmap.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});