/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "__barrel_optimize__?names=User!=!./node_modules/lucide-react/dist/esm/lucide-react.js":
/*!*********************************************************************************************!*\
  !*** __barrel_optimize__?names=User!=!./node_modules/lucide-react/dist/esm/lucide-react.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   User: () => (/* reexport safe */ _icons_user_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _icons_user_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./icons/user.js */ "./node_modules/lucide-react/dist/esm/icons/user.js");



/***/ }),

/***/ "./components/TopNav.tsx":
/*!*******************************!*\
  !*** ./components/TopNav.tsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ TopNav)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _barrel_optimize_names_User_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! __barrel_optimize__?names=User!=!lucide-react */ \"__barrel_optimize__?names=User!=!./node_modules/lucide-react/dist/esm/lucide-react.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \n\n\n\nfunction TopNav() {\n    const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);\n    // Chanje ak logic verifikasyon itilizatè konekte ou\n    const isLoggedIn = false;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"header\", {\n        className: \"border-b bg-white px-4 py-3 flex justify-between items-center sticky top-0 z-50 backdrop-blur\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n                className: \"flex gap-6 text-sm font-medium\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                        href: \"/\",\n                        className: \"hover:text-blue-600\",\n                        children: \"Home\"\n                    }, void 0, false, {\n                        fileName: \"/workspaces/unlocktap-site/components/TopNav.tsx\",\n                        lineNumber: 18,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                        href: \"/pricing\",\n                        className: \"hover:text-blue-600\",\n                        children: \"Pricing\"\n                    }, void 0, false, {\n                        fileName: \"/workspaces/unlocktap-site/components/TopNav.tsx\",\n                        lineNumber: 19,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                        href: \"/order-unlock-test\",\n                        className: \"hover:text-blue-600\",\n                        children: \"Order Unlock\"\n                    }, void 0, false, {\n                        fileName: \"/workspaces/unlocktap-site/components/TopNav.tsx\",\n                        lineNumber: 20,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/workspaces/unlocktap-site/components/TopNav.tsx\",\n                lineNumber: 17,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex items-center gap-4 text-sm font-medium\",\n                children: !isLoggedIn ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                            href: \"/login\",\n                            className: \"px-3 py-1 border rounded hover:bg-gray-100\",\n                            children: \"Login\"\n                        }, void 0, false, {\n                            fileName: \"/workspaces/unlocktap-site/components/TopNav.tsx\",\n                            lineNumber: 27,\n                            columnNumber: 13\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                            href: \"/register\",\n                            className: \"px-3 py-1 border rounded hover:bg-gray-100\",\n                            children: \"Register\"\n                        }, void 0, false, {\n                            fileName: \"/workspaces/unlocktap-site/components/TopNav.tsx\",\n                            lineNumber: 28,\n                            columnNumber: 13\n                        }, this)\n                    ]\n                }, void 0, true) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"relative\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            onClick: ()=>setOpen(!open),\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_User_lucide_react__WEBPACK_IMPORTED_MODULE_3__.User, {\n                                size: 20\n                            }, void 0, false, {\n                                fileName: \"/workspaces/unlocktap-site/components/TopNav.tsx\",\n                                lineNumber: 33,\n                                columnNumber: 15\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"/workspaces/unlocktap-site/components/TopNav.tsx\",\n                            lineNumber: 32,\n                            columnNumber: 13\n                        }, this),\n                        open && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"absolute right-0 mt-2 w-40 bg-white border rounded shadow\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                                    href: \"/dashboard\",\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                        className: \"block px-4 py-2 hover:bg-gray-100 cursor-pointer\",\n                                        children: \"Dashboard\"\n                                    }, void 0, false, {\n                                        fileName: \"/workspaces/unlocktap-site/components/TopNav.tsx\",\n                                        lineNumber: 39,\n                                        columnNumber: 19\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"/workspaces/unlocktap-site/components/TopNav.tsx\",\n                                    lineNumber: 38,\n                                    columnNumber: 17\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                    className: \"w-full text-left px-4 py-2 hover:bg-gray-100\",\n                                    children: \"Logout\"\n                                }, void 0, false, {\n                                    fileName: \"/workspaces/unlocktap-site/components/TopNav.tsx\",\n                                    lineNumber: 41,\n                                    columnNumber: 17\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/workspaces/unlocktap-site/components/TopNav.tsx\",\n                            lineNumber: 37,\n                            columnNumber: 15\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/workspaces/unlocktap-site/components/TopNav.tsx\",\n                    lineNumber: 31,\n                    columnNumber: 11\n                }, this)\n            }, void 0, false, {\n                fileName: \"/workspaces/unlocktap-site/components/TopNav.tsx\",\n                lineNumber: 24,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/workspaces/unlocktap-site/components/TopNav.tsx\",\n        lineNumber: 14,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL1RvcE5hdi50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBRTZCO0FBQ0k7QUFDRztBQUVyQixTQUFTRztJQUN0QixNQUFNLENBQUNDLE1BQU1DLFFBQVEsR0FBR0osK0NBQVFBLENBQUM7SUFFakMsb0RBQW9EO0lBQ3BELE1BQU1LLGFBQWE7SUFFbkIscUJBQ0UsOERBQUNDO1FBQU9DLFdBQVU7OzBCQUdoQiw4REFBQ0M7Z0JBQUlELFdBQVU7O2tDQUNiLDhEQUFDUixrREFBSUE7d0JBQUNVLE1BQUs7d0JBQUlGLFdBQVU7a0NBQXNCOzs7Ozs7a0NBQy9DLDhEQUFDUixrREFBSUE7d0JBQUNVLE1BQUs7d0JBQVdGLFdBQVU7a0NBQXNCOzs7Ozs7a0NBQ3RELDhEQUFDUixrREFBSUE7d0JBQUNVLE1BQUs7d0JBQXFCRixXQUFVO2tDQUFzQjs7Ozs7Ozs7Ozs7OzBCQUlsRSw4REFBQ0c7Z0JBQUlILFdBQVU7MEJBQ1osQ0FBQ0YsMkJBQ0E7O3NDQUNFLDhEQUFDTixrREFBSUE7NEJBQUNVLE1BQUs7NEJBQVNGLFdBQVU7c0NBQTZDOzs7Ozs7c0NBQzNFLDhEQUFDUixrREFBSUE7NEJBQUNVLE1BQUs7NEJBQVlGLFdBQVU7c0NBQTZDOzs7Ozs7O2lEQUdoRiw4REFBQ0c7b0JBQUlILFdBQVU7O3NDQUNiLDhEQUFDSTs0QkFBT0MsU0FBUyxJQUFNUixRQUFRLENBQUNEO3NDQUM5Qiw0RUFBQ0YsMEVBQUlBO2dDQUFDWSxNQUFNOzs7Ozs7Ozs7Ozt3QkFHYlYsc0JBQ0MsOERBQUNPOzRCQUFJSCxXQUFVOzs4Q0FDYiw4REFBQ1Isa0RBQUlBO29DQUFDVSxNQUFLOzhDQUNULDRFQUFDSzt3Q0FBS1AsV0FBVTtrREFBbUQ7Ozs7Ozs7Ozs7OzhDQUVyRSw4REFBQ0k7b0NBQU9KLFdBQVU7OENBQStDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVFqRiIsInNvdXJjZXMiOlsid2VicGFjazovL3VubG9ja3RhcC8uL2NvbXBvbmVudHMvVG9wTmF2LnRzeD9kZjU2Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCJsdWNpZGUtcmVhY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVG9wTmF2KCkge1xuICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgLy8gQ2hhbmplIGFrIGxvZ2ljIHZlcmlmaWthc3lvbiBpdGlsaXphdMOoIGtvbmVrdGUgb3VcbiAgY29uc3QgaXNMb2dnZWRJbiA9IGZhbHNlOyBcblxuICByZXR1cm4gKFxuICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwiYm9yZGVyLWIgYmctd2hpdGUgcHgtNCBweS0zIGZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciBzdGlja3kgdG9wLTAgei01MCBiYWNrZHJvcC1ibHVyXCI+XG4gICAgICBcbiAgICAgIHsvKiBMZWZ0IE1lbnUgKi99XG4gICAgICA8bmF2IGNsYXNzTmFtZT1cImZsZXggZ2FwLTYgdGV4dC1zbSBmb250LW1lZGl1bVwiPlxuICAgICAgICA8TGluayBocmVmPVwiL1wiIGNsYXNzTmFtZT1cImhvdmVyOnRleHQtYmx1ZS02MDBcIj5Ib21lPC9MaW5rPlxuICAgICAgICA8TGluayBocmVmPVwiL3ByaWNpbmdcIiBjbGFzc05hbWU9XCJob3Zlcjp0ZXh0LWJsdWUtNjAwXCI+UHJpY2luZzwvTGluaz5cbiAgICAgICAgPExpbmsgaHJlZj1cIi9vcmRlci11bmxvY2stdGVzdFwiIGNsYXNzTmFtZT1cImhvdmVyOnRleHQtYmx1ZS02MDBcIj5PcmRlciBVbmxvY2s8L0xpbms+XG4gICAgICA8L25hdj5cblxuICAgICAgey8qIFJpZ2h0IE1lbnUgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC00IHRleHQtc20gZm9udC1tZWRpdW1cIj5cbiAgICAgICAgeyFpc0xvZ2dlZEluID8gKFxuICAgICAgICAgIDw+XG4gICAgICAgICAgICA8TGluayBocmVmPVwiL2xvZ2luXCIgY2xhc3NOYW1lPVwicHgtMyBweS0xIGJvcmRlciByb3VuZGVkIGhvdmVyOmJnLWdyYXktMTAwXCI+TG9naW48L0xpbms+XG4gICAgICAgICAgICA8TGluayBocmVmPVwiL3JlZ2lzdGVyXCIgY2xhc3NOYW1lPVwicHgtMyBweS0xIGJvcmRlciByb3VuZGVkIGhvdmVyOmJnLWdyYXktMTAwXCI+UmVnaXN0ZXI8L0xpbms+XG4gICAgICAgICAgPC8+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRPcGVuKCFvcGVuKX0+XG4gICAgICAgICAgICAgIDxVc2VyIHNpemU9ezIwfSAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIHtvcGVuICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSByaWdodC0wIG10LTIgdy00MCBiZy13aGl0ZSBib3JkZXIgcm91bmRlZCBzaGFkb3dcIj5cbiAgICAgICAgICAgICAgICA8TGluayBocmVmPVwiL2Rhc2hib2FyZFwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmxvY2sgcHgtNCBweS0yIGhvdmVyOmJnLWdyYXktMTAwIGN1cnNvci1wb2ludGVyXCI+RGFzaGJvYXJkPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LWxlZnQgcHgtNCBweS0yIGhvdmVyOmJnLWdyYXktMTAwXCI+TG9nb3V0PC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvaGVhZGVyPlxuICApO1xufSJdLCJuYW1lcyI6WyJMaW5rIiwidXNlU3RhdGUiLCJVc2VyIiwiVG9wTmF2Iiwib3BlbiIsInNldE9wZW4iLCJpc0xvZ2dlZEluIiwiaGVhZGVyIiwiY2xhc3NOYW1lIiwibmF2IiwiaHJlZiIsImRpdiIsImJ1dHRvbiIsIm9uQ2xpY2siLCJzaXplIiwic3BhbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/TopNav.tsx\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MyApp)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_TopNav__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/TopNav */ \"./components/TopNav.tsx\");\n\n\n\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_TopNav__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n                fileName: \"/workspaces/unlocktap-site/pages/_app.tsx\",\n                lineNumber: 10,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"/workspaces/unlocktap-site/pages/_app.tsx\",\n                lineNumber: 11,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQytCO0FBRVU7QUFHMUIsU0FBU0MsTUFBTSxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBWTtJQUM5RCxxQkFDRTs7MEJBQ0UsOERBQUNILDBEQUFNQTs7Ozs7MEJBQ1AsOERBQUNFO2dCQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7O0FBRzlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdW5sb2NrdGFwLy4vcGFnZXMvX2FwcC50c3g/MmZiZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IEFwcFByb3BzIH0gZnJvbSBcIm5leHQvYXBwXCI7XG5pbXBvcnQgXCIuLi9zdHlsZXMvZ2xvYmFscy5jc3NcIjtcblxuaW1wb3J0IFRvcE5hdiBmcm9tIFwiLi4vY29tcG9uZW50cy9Ub3BOYXZcIlxuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfTogQXBwUHJvcHMpIHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPFRvcE5hdiAvPlxuICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgIDwvPlxuICApO1xufVxuIl0sIm5hbWVzIjpbIlRvcE5hdiIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc","vendor-chunks/lucide-react"], () => (__webpack_exec__("./pages/_app.tsx")));
module.exports = __webpack_exports__;

})();