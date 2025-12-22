"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["customizer"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/common/customizer.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/common/customizer.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      isOpen: false,
      langs: ["en", "fr", "ar", "de", "es", "it", "Ind", "thai", "tr_ch", "sm_ch", "tur", "ru", "hn", "vn", "kr", "ba", "br", "da"]
    };
  },
  computed: _objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_0__.mapGetters)(["getThemeMode", "getcompactLeftSideBarBgColor"])),
  methods: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_0__.mapActions)(["changeThemeRtl", "changeThemeLayout", "changeThemeMode", "changecompactLeftSideBarBgColor"])), {}, {
    SetLocal: function SetLocal(locale) {
      this.$i18n.locale = locale;
      this.$store.dispatch("language/setLanguage", locale);
      Fire.$emit("ChangeLanguage");
    }
  })
});

/***/ }),

/***/ "./resources/src/components/common/customizer.vue":
/*!********************************************************!*\
  !*** ./resources/src/components/common/customizer.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _customizer_vue_vue_type_template_id_525a0006_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./customizer.vue?vue&type=template&id=525a0006&scoped=true& */ "./resources/src/components/common/customizer.vue?vue&type=template&id=525a0006&scoped=true&");
/* harmony import */ var _customizer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./customizer.vue?vue&type=script&lang=js& */ "./resources/src/components/common/customizer.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _customizer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _customizer_vue_vue_type_template_id_525a0006_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _customizer_vue_vue_type_template_id_525a0006_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "525a0006",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/components/common/customizer.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/components/common/customizer.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/src/components/common/customizer.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_customizer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./customizer.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/common/customizer.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_customizer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/components/common/customizer.vue?vue&type=template&id=525a0006&scoped=true&":
/*!***************************************************************************************************!*\
  !*** ./resources/src/components/common/customizer.vue?vue&type=template&id=525a0006&scoped=true& ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_customizer_vue_vue_type_template_id_525a0006_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_customizer_vue_vue_type_template_id_525a0006_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_customizer_vue_vue_type_template_id_525a0006_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./customizer.vue?vue&type=template&id=525a0006&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/common/customizer.vue?vue&type=template&id=525a0006&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/common/customizer.vue?vue&type=template&id=525a0006&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/common/customizer.vue?vue&type=template&id=525a0006&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"customizer",class:{ open: _vm.isOpen }},[_c('div',{staticClass:"handle",on:{"click":function($event){_vm.isOpen = !_vm.isOpen}}},[_c('i',{staticClass:"i-Gear spin"})]),_vm._v(" "),_c('vue-perfect-scrollbar',{staticClass:"customizer-body ps rtl-ps-none",attrs:{"settings":{ suppressScrollX: true, wheelPropagation: false }}},[(_vm.getThemeMode.layout != 'vertical-sidebar' && _vm.getThemeMode.layout != 'vertical-sidebar-two')?_c('div',{},[_c('div',{staticClass:"card-header",attrs:{"id":"headingOne"}},[_c('p',{staticClass:"mb-0"},[_vm._v("RTL")])]),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('label',{staticClass:"checkbox checkbox-primary"},[_c('input',{attrs:{"type":"checkbox","id":"rtl-checkbox"},on:{"change":_vm.changeThemeRtl}}),_vm._v(" "),_c('span',[_vm._v("Enable RTL")]),_vm._v(" "),_c('span',{staticClass:"checkmark"})])])]):_vm._e(),_vm._v(" "),_c('div',{},[_c('div',{staticClass:"card-header"},[_c('p',{staticClass:"mb-0"},[_vm._v("Dark Mode")])]),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('label',{directives:[{name:"b-popover",rawName:"v-b-popover.hover.left",value:('Dark Mode'),expression:"'Dark Mode'",modifiers:{"hover":true,"left":true}}],staticClass:"switch switch-primary mr-3 mt-2"},[_c('input',{attrs:{"type":"checkbox"},on:{"click":_vm.changeThemeMode}}),_vm._v(" "),_c('span',{staticClass:"slider"})])])]),_vm._v(" "),_c('div',{},[_c('div',{staticClass:"card-header"},[_c('p',{staticClass:"mb-0"},[_vm._v("Language")])]),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"menu-icon-language"},[_c('a',{on:{"click":function($event){return _vm.SetLocal('en')}}},[_c('i',{staticClass:"flag-icon flag-icon-squared flag-icon-gb",attrs:{"title":"en"}}),_vm._v(" English\n            ")]),_vm._v(" "),_c('a',{on:{"click":function($event){return _vm.SetLocal('mm')}}},[_c('i',{staticClass:"flag-icon flag-icon-squared flag-icon-mm",attrs:{"title":"mm"}}),_vm._v(" "),_c('span',{staticClass:"title-lang"},[_vm._v("Myanmar")])]),_vm._v(" "),_c('a',{on:{"click":function($event){return _vm.SetLocal('sm_ch')}}},[_c('i',{staticClass:"flag-icon flag-icon-squared flag-icon-cn",attrs:{"title":"sa"}}),_vm._v(" "),_c('span',{staticClass:"title-lang"},[_vm._v("Simplified Chinese")])]),_vm._v(" "),_c('a',{on:{"click":function($event){return _vm.SetLocal('thai')}}},[_c('i',{staticClass:"flag-icon flag-icon-squared flag-icon-th",attrs:{"title":"sa"}}),_vm._v(" "),_c('span',{staticClass:"title-lang"},[_vm._v("Thaï")])]),_vm._v(" "),_c('a',{on:{"click":function($event){return _vm.SetLocal('tr_ch')}}},[_c('i',{staticClass:"flag-icon flag-icon-squared flag-icon-cn",attrs:{"title":"sa"}}),_vm._v(" "),_c('span',{staticClass:"title-lang"},[_vm._v("Traditional Chinese")])]),_vm._v(" "),_c('a',{on:{"click":function($event){return _vm.SetLocal('ru')}}},[_c('i',{staticClass:"flag-icon flag-icon-squared flag-icon-ru",attrs:{"title":"sa"}}),_vm._v(" "),_c('span',{staticClass:"title-lang"},[_vm._v("Russian")])])])])])])],1)])}
var staticRenderFns = []
render._withStripped = true


/***/ })

}]);