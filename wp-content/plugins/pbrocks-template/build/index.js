/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/block-template/edit.js":
/*!************************************!*\
  !*** ./src/block-template/edit.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Edit; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);


/**
 * WordPress components that create the necessary UI elements for the block
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-components/
 */

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */

function Edit(_ref) {
  let {
    attributes,
    setAttributes
  } = _ref;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: attributes.message,
    onChange: val => setAttributes({
      message: val
    })
  }));
}

/***/ }),

/***/ "./src/block-template/index.js":
/*!*************************************!*\
  !*** ./src/block-template/index.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/block-template/style.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editor.scss */ "./src/block-template/editor.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/block-template/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./save */ "./src/block-template/save.js");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor. All other files
 * get applied to the editor only.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */



/**
 * Internal dependencies
 */



/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */

(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)('create-block-tutorial/pbrocks-template', {
  /**
   * Used to construct a preview for the block to be shown in the block inserter.
   */
  example: {
    attributes: {
      message: 'PBrocks Template'
    }
  },

  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],

  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_4__["default"]
});

/***/ }),

/***/ "./src/block-template/save.js":
/*!************************************!*\
  !*** ./src/block-template/save.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ save; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @param {Object} props            Properties passed to the function.
 * @param {Object} props.attributes Available block attributes.
 * @return {WPElement} Element to render.
 */

function save(_ref) {
  let {
    attributes
  } = _ref;
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", blockProps, attributes.message);
}

/***/ }),

/***/ "./src/block-template/editor.scss":
/*!****************************************!*\
  !*** ./src/block-template/editor.scss ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/block-template/style.scss":
/*!***************************************!*\
  !*** ./src/block-template/style.scss ***!
  \***************************************/
/***/ (function() {

throw new Error("Module build failed (from ./node_modules/mini-css-extract-plugin/dist/loader.js):\nHookWebpackError: Cannot find module '../assets/gilbert-color.otf'\n    at tryRunOrWebpackError (/Users/apple/Local/blocks/app/public/wp-content/plugins/pbrocks-block-starter/wp-content/plugins/pbrocks-template/node_modules/webpack/lib/HookWebpackError.js:88:9)\n    at __webpack_require_module__ (/Users/apple/Local/blocks/app/public/wp-content/plugins/pbrocks-block-starter/wp-content/plugins/pbrocks-template/node_modules/webpack/lib/Compilation.js:5025:12)\n    at __webpack_require__ (/Users/apple/Local/blocks/app/public/wp-content/plugins/pbrocks-block-starter/wp-content/plugins/pbrocks-template/node_modules/webpack/lib/Compilation.js:4982:18)\n    at /Users/apple/Local/blocks/app/public/wp-content/plugins/pbrocks-block-starter/wp-content/plugins/pbrocks-template/node_modules/webpack/lib/Compilation.js:5053:20\n    at symbolIterator (/Users/apple/Local/blocks/app/public/wp-content/plugins/pbrocks-block-starter/wp-content/plugins/pbrocks-template/node_modules/neo-async/async.js:3485:9)\n    at timesSync (/Users/apple/Local/blocks/app/public/wp-content/plugins/pbrocks-block-starter/wp-content/plugins/pbrocks-template/node_modules/neo-async/async.js:2297:7)\n    at Object.eachLimit (/Users/apple/Local/blocks/app/public/wp-content/plugins/pbrocks-block-starter/wp-content/plugins/pbrocks-template/node_modules/neo-async/async.js:3463:5)\n    at /Users/apple/Local/blocks/app/public/wp-content/plugins/pbrocks-block-starter/wp-content/plugins/pbrocks-template/node_modules/webpack/lib/Compilation.js:4925:16\n    at symbolIterator (/Users/apple/Local/blocks/app/public/wp-content/plugins/pbrocks-block-starter/wp-content/plugins/pbrocks-template/node_modules/neo-async/async.js:3485:9)\n    at timesSync (/Users/apple/Local/blocks/app/public/wp-content/plugins/pbrocks-block-starter/wp-content/plugins/pbrocks-template/node_modules/neo-async/async.js:2297:7)\n-- inner error --\nError: Cannot find module '../assets/gilbert-color.otf'\n    at webpackMissingModule (/Users/apple/Local/blocks/app/public/wp-content/plugins/pbrocks-block-starter/wp-content/plugins/pbrocks-template/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!/Users/apple/Local/blocks/app/public/wp-content/plugins/pbrocks-block-starter/wp-content/plugins/pbrocks-template/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!/Users/apple/Local/blocks/app/public/wp-content/plugins/pbrocks-block-starter/wp-content/plugins/pbrocks-template/node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!/Users/apple/Local/blocks/app/public/wp-content/plugins/pbrocks-block-starter/wp-content/plugins/pbrocks-template/src/block-template/style.scss:12:113)\n    at Module.<anonymous> (/Users/apple/Local/blocks/app/public/wp-content/plugins/pbrocks-block-starter/wp-content/plugins/pbrocks-template/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!/Users/apple/Local/blocks/app/public/wp-content/plugins/pbrocks-block-starter/wp-content/plugins/pbrocks-template/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!/Users/apple/Local/blocks/app/public/wp-content/plugins/pbrocks-block-starter/wp-content/plugins/pbrocks-template/node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!/Users/apple/Local/blocks/app/public/wp-content/plugins/pbrocks-block-starter/wp-content/plugins/pbrocks-template/src/block-template/style.scss:12:215)\n    at /Users/apple/Local/blocks/app/public/wp-content/plugins/pbrocks-block-starter/wp-content/plugins/pbrocks-template/node_modules/webpack/lib/javascript/JavascriptModulesPlugin.js:441:11\n    at Hook.eval [as call] (eval at create (/Users/apple/Local/blocks/app/public/wp-content/plugins/pbrocks-block-starter/wp-content/plugins/pbrocks-template/node_modules/tapable/lib/HookCodeFactory.js:19:10), <anonymous>:7:1)\n    at /Users/apple/Local/blocks/app/public/wp-content/plugins/pbrocks-block-starter/wp-content/plugins/pbrocks-template/node_modules/webpack/lib/Compilation.js:5027:39\n    at tryRunOrWebpackError (/Users/apple/Local/blocks/app/public/wp-content/plugins/pbrocks-block-starter/wp-content/plugins/pbrocks-template/node_modules/webpack/lib/HookWebpackError.js:83:7)\n    at __webpack_require_module__ (/Users/apple/Local/blocks/app/public/wp-content/plugins/pbrocks-block-starter/wp-content/plugins/pbrocks-template/node_modules/webpack/lib/Compilation.js:5025:12)\n    at __webpack_require__ (/Users/apple/Local/blocks/app/public/wp-content/plugins/pbrocks-block-starter/wp-content/plugins/pbrocks-template/node_modules/webpack/lib/Compilation.js:4982:18)\n    at /Users/apple/Local/blocks/app/public/wp-content/plugins/pbrocks-block-starter/wp-content/plugins/pbrocks-template/node_modules/webpack/lib/Compilation.js:5053:20\n    at symbolIterator (/Users/apple/Local/blocks/app/public/wp-content/plugins/pbrocks-block-starter/wp-content/plugins/pbrocks-template/node_modules/neo-async/async.js:3485:9)\n\nGenerated code for /Users/apple/Local/blocks/app/public/wp-content/plugins/pbrocks-block-starter/wp-content/plugins/pbrocks-template/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[3].use[1]!/Users/apple/Local/blocks/app/public/wp-content/plugins/pbrocks-block-starter/wp-content/plugins/pbrocks-template/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[3].use[2]!/Users/apple/Local/blocks/app/public/wp-content/plugins/pbrocks-block-starter/wp-content/plugins/pbrocks-template/node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[3].use[3]!/Users/apple/Local/blocks/app/public/wp-content/plugins/pbrocks-block-starter/wp-content/plugins/pbrocks-template/src/block-template/style.scss\n 1 | __webpack_require__.r(__webpack_exports__);\n 2 | /* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ \"/Users/apple/Local/blocks/app/public/wp-content/plugins/pbrocks-block-starter/wp-content/plugins/pbrocks-template/node_modules/css-loader/dist/runtime/sourceMaps.js\");\n 3 | /* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n 4 | /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"/Users/apple/Local/blocks/app/public/wp-content/plugins/pbrocks-block-starter/wp-content/plugins/pbrocks-template/node_modules/css-loader/dist/runtime/api.js\");\n 5 | /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n 6 | /* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ \"/Users/apple/Local/blocks/app/public/wp-content/plugins/pbrocks-block-starter/wp-content/plugins/pbrocks-template/node_modules/css-loader/dist/runtime/getUrl.js\");\n 7 | /* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);\n 8 | // Imports\n 9 | \n10 | \n11 | \n12 | var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '../assets/gilbert-color.otf'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), __webpack_require__.b);\n13 | var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n14 | var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);\n15 | // Module\n16 | ___CSS_LOADER_EXPORT___.push([module.id, \"/**\\n * The following styles get applied both on the front of your site\\n * and in the editor.\\n *\\n * Replace them with your own styles or remove the file completely.\\n */\\n@font-face {\\n  font-family: Gilbert;\\n  src: url(\" + ___CSS_LOADER_URL_REPLACEMENT_0___ + \");\\n  font-weight: 700;\\n}\\n.wp-block-create-block-tutorial-pbrocks-template {\\n  font-family: Gilbert, sans-serif;\\n  font-size: 64px;\\n}\", \"\",{\"version\":3,\"sources\":[\"webpack://./src/block-template/style.scss\"],\"names\":[],\"mappings\":\"AAAA;;;;;EAAA;AAOA;EACC,oBAAA;EACA,4CAAA;EACA,gBAAA;AAAD;AAGA;EACC,gCAAA;EACA,eAAA;AADD\",\"sourcesContent\":[\"/**\\n * The following styles get applied both on the front of your site\\n * and in the editor.\\n *\\n * Replace them with your own styles or remove the file completely.\\n */\\n\\n@font-face {\\n\\tfont-family: Gilbert;\\n\\tsrc: url(../assets/gilbert-color.otf);\\n\\tfont-weight: 700;\\n}\\n\\n.wp-block-create-block-tutorial-pbrocks-template {\\n\\tfont-family: Gilbert, sans-serif;\\n\\tfont-size: 64px;\\n}\\n\"],\"sourceRoot\":\"\"}]);\n17 | // Exports\n18 | /* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n19 | ");

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["element"];

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
/******/ 			// no module.id needed
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
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _block_template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block-template */ "./src/block-template/index.js");

}();
/******/ })()
;
//# sourceMappingURL=index.js.map