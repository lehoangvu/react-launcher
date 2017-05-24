webpackJsonp([0],{

/***/ 0:
/*!***********************!*\
  !*** ./src/bundle.js ***!
  \***********************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 36);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 182);
	
	var _WithStylesContext = __webpack_require__(/*! ./global/WithStylesContext */ 214);
	
	var _WithStylesContext2 = _interopRequireDefault(_WithStylesContext);
	
	var _store = __webpack_require__(/*! ./store */ 215);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _routes = __webpack_require__(/*! ./routes */ 232);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 233);
	
	var _jquery = __webpack_require__(/*! jquery */ 670);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _config = __webpack_require__(/*! ./config */ 671);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _helper = __webpack_require__(/*! ./global/helper */ 541);
	
	var _helper2 = _interopRequireDefault(_helper);
	
	var _reactRouterRedux = __webpack_require__(/*! react-router-redux */ 227);
	
	var _reactGa = __webpack_require__(/*! react-ga */ 672);
	
	var _reactGa2 = _interopRequireDefault(_reactGa);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_reactGa2.default.initialize('UA-71598875-1');
	var logPageView = function logPageView() {
	    _reactGa2.default.set({ page: window.location.pathname + window.location.search });
	    _reactGa2.default.pageview(window.location.pathname + window.location.search);
	};
	
	window.config = _config2.default;
	window.Helper = _helper2.default;
	window.$ = _jquery2.default;
	
	var history = (0, _reactRouterRedux.syncHistoryWithStore)(_reactRouter.browserHistory, _store2.default);
	
	(0, _reactDom.render)(_react2.default.createElement(
	    _WithStylesContext2.default,
	    { onInsertCss: function onInsertCss(styles) {
	            return Array.isArray(styles) ? styles.map(function (style) {
	                style._insertCss();
	            }) : styles._insertCss();
	        } },
	    _react2.default.createElement(
	        _reactRedux.Provider,
	        { store: _store2.default },
	        _react2.default.createElement(
	            _reactRouter.Router,
	            { history: history, onUpdate: logPageView },
	            _routes2.default
	        )
	    )
	), document.getElementById('root'));

/***/ }),

/***/ 214:
/*!*****************************************!*\
  !*** ./src/global/WithStylesContext.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var WithStylesContext = function (_React$Component) {
	    _inherits(WithStylesContext, _React$Component);
	
	    function WithStylesContext() {
	        _classCallCheck(this, WithStylesContext);
	
	        return _possibleConstructorReturn(this, (WithStylesContext.__proto__ || Object.getPrototypeOf(WithStylesContext)).apply(this, arguments));
	    }
	
	    _createClass(WithStylesContext, [{
	        key: 'getChildContext',
	        value: function getChildContext() {
	            return { insertCss: this.props.onInsertCss };
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react.Children.only(this.props.children);
	        }
	    }]);
	
	    return WithStylesContext;
	}(_react2.default.Component);
	
	WithStylesContext.childContextTypes = {
	    insertCss: _react.PropTypes.func.isRequired
	};
	
	WithStylesContext.propTypes = {
	    children: _react.PropTypes.element.isRequired,
	    onInsertCss: _react.PropTypes.func.isRequired
	};
	
	exports.default = WithStylesContext;

/***/ }),

/***/ 215:
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _redux = __webpack_require__(/*! redux */ 191);
	
	var _reduxThunk = __webpack_require__(/*! redux-thunk */ 216);
	
	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
	
	var _reduxLogger = __webpack_require__(/*! redux-logger */ 217);
	
	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);
	
	var _reducer = __webpack_require__(/*! ./reducer */ 223);
	
	var _reducer2 = _interopRequireDefault(_reducer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var promiseMiddleware = function promiseMiddleware() {
	    return function (next) {
	        return function (action) {
	            if (typeof action !== 'undefined') {
	                var promise = action.promise,
	                    type = action.type,
	                    rest = _objectWithoutProperties(action, ['promise', 'type']);
	
	                if (!promise) return next(action);
	
	                var SUCCESS = type;
	                var REQUEST = type + '_REQUEST';
	                var FAILURE = type + '_FAILURE';
	                next(_extends({}, rest, { type: REQUEST }));
	
	                return promise.then(function (res) {
	                    next(_extends({}, rest, { res: res, type: SUCCESS }));
	                    return true;
	                }).catch(function (error) {
	                    next(_extends({}, rest, { error: error, type: FAILURE }));
	                    console.log(error);
	                    return false;
	                });
	            }
	            return false;
	        };
	    };
	};
	
	var preloadedState = {};
	
	var middleWare = [_reduxThunk2.default, promiseMiddleware, (0, _reduxLogger2.default)()];
	
	var store = (0, _redux.createStore)(_reducer2.default, preloadedState, _redux.applyMiddleware.apply(undefined, middleWare));
	
	exports.default = store;

/***/ }),

/***/ 223:
/*!******************************!*\
  !*** ./src/store/reducer.js ***!
  \******************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	   value: true
	});
	
	var _redux = __webpack_require__(/*! redux */ 191);
	
	var _reducer = __webpack_require__(/*! ./../home/reducer */ 224);
	
	var _reducer2 = _interopRequireDefault(_reducer);
	
	var _reducer3 = __webpack_require__(/*! ./../app/reducer */ 225);
	
	var _reducer4 = _interopRequireDefault(_reducer3);
	
	var _reducer5 = __webpack_require__(/*! ./../question/reducer */ 226);
	
	var _reducer6 = _interopRequireDefault(_reducer5);
	
	var _reactRouterRedux = __webpack_require__(/*! react-router-redux */ 227);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var reducer = (0, _redux.combineReducers)({
	   home: _reducer2.default,
	   app: _reducer4.default,
	   question: _reducer6.default,
	   routing: _reactRouterRedux.routerReducer
	});
	
	exports.default = reducer;

/***/ }),

/***/ 224:
/*!*****************************!*\
  !*** ./src/home/reducer.js ***!
  \*****************************/
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var intinalState = {
	    list: {
	        data: [],
	        loading: true,
	        total: 0,
	        limit: 20,
	        current: 1
	    },
	    q: '',
	    tabs: [{
	        title: 'Mới nhất',
	        query: 'newest',
	        current: true
	    }, {
	        title: 'Hữu ích',
	        query: 'useful',
	        current: false
	    }, {
	        title: 'Phản hồi',
	        query: 'feedback',
	        current: false
	    }]
	};
	
	exports.default = function () {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : intinalState;
	    var action = arguments[1];
	
	    switch (action.type) {
	        case 'GET_LIST_SUCCESS':
	            return _extends({}, state, {
	                list: _extends({}, state.list, action.data)
	            });
	            break;
	        case 'SET_CURRENT_TAB':
	            if (['newest', 'useful', 'feedback'].indexOf(action.query) !== -1) {
	                return _extends({}, state, {
	                    q: action.q,
	                    tabs: state.tabs.map(function (item, index) {
	                        if (item.query === action.query) {
	                            return _extends({}, item, {
	                                current: true
	                            });
	                        }
	                        return _extends({}, item, {
	                            current: false
	                        });
	                    })
	                });
	            }
	            return state;
	            break;
	
	        default:
	            return state;
	    }
	};

/***/ }),

/***/ 225:
/*!****************************!*\
  !*** ./src/app/reducer.js ***!
  \****************************/
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var intinalState = {
	    user: false
	};
	var saveToken = function saveToken(token) {
	    $.ajaxSetup({
	        headers: { 'x-customer-token': token.value }
	    });
	    if (localStorage) {
	        localStorage.setItem('customer_token', JSON.stringify(token));
	    }
	};
	
	exports.default = function () {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : intinalState;
	    var action = arguments[1];
	
	    switch (action.type) {
	        case 'LOGIN_SUCCESS':
	            saveToken(action.token);
	            return _extends({}, state, {
	                fetched: true,
	                user: action.user
	            });
	            break;
	        case 'FETCH_SUCCESS':
	            if (action.user !== null) {
	                saveToken(action.token);
	            }
	            return _extends({}, state, {
	                fetched: true,
	                user: action.user
	            });
	            break;
	
	        case 'LOGOUT':
	            $.ajaxSetup({
	                headers: {}
	            });
	            if (localStorage) {
	                localStorage.removeItem('customer_token');
	            }
	            return _extends({}, state, {
	                fetched: true,
	                user: null
	            });
	            break;
	
	        default:
	            return state;
	    }
	};

/***/ }),

/***/ 226:
/*!*********************************!*\
  !*** ./src/question/reducer.js ***!
  \*********************************/
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var intinalState = {
	    add: {
	        form: {
	            data: {
	                title: '',
	                content: '## markdown me ^_^ ',
	                tags: ''
	            },
	            error: []
	        }
	    },
	    detail: false,
	    search: {
	        list: {
	            data: [],
	            loading: true,
	            total: 0,
	            limit: 20,
	            current: 1
	        },
	        q: '',
	        tabs: [{
	            title: 'Mới nhất',
	            query: 'newest',
	            current: true
	        }, {
	            title: 'Hữu ích',
	            query: 'useful',
	            current: false
	        }, {
	            title: 'Phản hồi',
	            query: 'feedback',
	            current: false
	        }]
	    }
	};
	
	exports.default = function () {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : intinalState;
	    var action = arguments[1];
	
	    switch (action.type) {
	        case 'VOTE_SUCCESS':
	            var appendVote = {};
	            if (action.vote === 1) {
	                appendVote['voted'] = true;
	                appendVote['down_voted'] = false;
	                appendVote['vote'] = state.detail.vote + 1;
	            } else {
	                appendVote['voted'] = false;
	                appendVote['down_voted'] = true;
	                appendVote['down_vote'] = state.detail.down_vote + 1;
	            }
	            return _extends({}, state, {
	                detail: _extends({}, state.detail, appendVote)
	            });
	            break;
	        case 'CREATE_SUCCESS':
	            return state;
	            break;
	        case 'ANSWER_SUCCESS':
	            return _extends({}, state, {
	                detail: _extends({}, state.detail, {
	                    answers: _extends({}, state.detail.answers, state.detail.answers.data.push(action.answer))
	                })
	            });
	            break;
	        case 'CREATE_FAIL':
	            return state;
	        case 'GET_DETAIL_SUCCESS':
	            return _extends({}, state, {
	                detail: action.data
	            });
	            break;
	        case 'GET_DETAIL_FAIL':
	            return state;
	
	            break;
	        case 'SEARCH_GET_LIST_SUCCESS':
	            return _extends({}, state, {
	                search: _extends({}, state.search, {
	                    list: _extends({}, state.search.list, action.data)
	                })
	            });
	            break;
	        case 'SEARCH_SET_CURRENT_TAB':
	            if (['newest', 'useful', 'feedback'].indexOf(action.query) !== -1) {
	                return _extends({}, state, {
	                    search: _extends({}, state.search, {
	                        q: action.q,
	                        tabs: state.search.tabs.map(function (item, index) {
	                            if (item.query === action.query) {
	                                return _extends({}, item, {
	                                    current: true
	                                });
	                            }
	                            return _extends({}, item, {
	                                current: false
	                            });
	                        })
	                    })
	                });
	            }
	            return state;
	            break;
	        default:
	            return state;
	    }
	};

/***/ }),

/***/ 232:
/*!*****************************!*\
  !*** ./src/routes/index.js ***!
  \*****************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 233);
	
	var _app = __webpack_require__(/*! ./../app */ 294);
	
	var _app2 = _interopRequireDefault(_app);
	
	var _NotFoundContainer = __webpack_require__(/*! ./../app/containers/NotFoundContainer */ 618);
	
	var _NotFoundContainer2 = _interopRequireDefault(_NotFoundContainer);
	
	var _home = __webpack_require__(/*! ./../home */ 620);
	
	var _home2 = _interopRequireDefault(_home);
	
	var _question = __webpack_require__(/*! ./../question */ 626);
	
	var _question2 = _interopRequireDefault(_question);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var basePath = typeof _basePath !== 'undefined' ? _basePath : '/';
	
	var Routes = _react2.default.createElement(
	    _reactRouter.Route,
	    { path: basePath, component: _app2.default },
	    _react2.default.createElement(_reactRouter.IndexRoute, { component: _home2.default }),
	    _question2.default,
	    _react2.default.createElement(_reactRouter.Route, { path: '*', component: _NotFoundContainer2.default })
	);
	
	exports.default = Routes;

/***/ }),

/***/ 294:
/*!**************************!*\
  !*** ./src/app/index.js ***!
  \**************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 182);
	
	var _redux = __webpack_require__(/*! redux */ 191);
	
	var _App = __webpack_require__(/*! ./components/App */ 295);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _action = __webpack_require__(/*! ./action */ 617);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	    return {
	        user: state.app.user
	    };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return {
	        actions: (0, _redux.bindActionCreators)({
	            loginWithToken: _action.loginWithToken,
	            fetchInfo: _action.fetchInfo,
	            logout: _action.logout
	        }, dispatch)
	    };
	};
	
	var AppContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_App2.default);
	exports.default = AppContainer;

/***/ }),

/***/ 295:
/*!***********************************!*\
  !*** ./src/app/components/App.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Header = __webpack_require__(/*! ./Header */ 296);
	
	var _Header2 = _interopRequireDefault(_Header);
	
	var _withStyles = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 297);
	
	var _withStyles2 = _interopRequireDefault(_withStyles);
	
	var _app = __webpack_require__(/*! ./../styles/app.scss */ 615);
	
	var _app2 = _interopRequireDefault(_app);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var App = function (_React$Component) {
	  _inherits(App, _React$Component);
	
	  function App(props) {
	    _classCallCheck(this, App);
	
	    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
	  }
	
	  _createClass(App, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {}
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        { className: _app2.default.rootApp },
	        _react2.default.createElement(_Header2.default, { user: this.props.user, logout: this.props.actions.logout, loginWithToken: this.props.actions.loginWithToken, fetchInfo: this.props.actions.fetchInfo }),
	        _react2.default.createElement(
	          'div',
	          { className: _app2.default.mainContent },
	          this.props.user !== false && this.props.children
	        )
	      );
	    }
	  }]);
	
	  return App;
	}(_react2.default.Component);
	
	exports.default = (0, _withStyles2.default)(_app2.default)(App);

/***/ }),

/***/ 296:
/*!**************************************!*\
  !*** ./src/app/components/Header.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 233);
	
	var _withStyles = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 297);
	
	var _withStyles2 = _interopRequireDefault(_withStyles);
	
	var _header = __webpack_require__(/*! ./../styles/header.scss */ 384);
	
	var _header2 = _interopRequireDefault(_header);
	
	var _Search = __webpack_require__(/*! ./Search */ 399);
	
	var _Search2 = _interopRequireDefault(_Search);
	
	var _UserBar = __webpack_require__(/*! ./UserBar */ 402);
	
	var _UserBar2 = _interopRequireDefault(_UserBar);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Header = function (_React$Component) {
	    _inherits(Header, _React$Component);
	
	    function Header(props) {
	        _classCallCheck(this, Header);
	
	        return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));
	    }
	
	    _createClass(Header, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: _header2.default.root },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'container' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: _header2.default.menu },
	                        _react2.default.createElement(
	                            _reactRouter.Link,
	                            { to: '/', className: _header2.default.logoLink },
	                            _react2.default.createElement('img', { src: '/public/img/logo.svg' })
	                        ),
	                        _react2.default.createElement(
	                            'ul',
	                            { className: _header2.default.menuList },
	                            _react2.default.createElement(
	                                'li',
	                                null,
	                                _react2.default.createElement(
	                                    _reactRouter.Link,
	                                    { to: '/tagged/javascript' },
	                                    'Javascript'
	                                )
	                            ),
	                            _react2.default.createElement(
	                                'li',
	                                null,
	                                _react2.default.createElement(
	                                    _reactRouter.Link,
	                                    { to: '/tagged/php' },
	                                    'PHP'
	                                )
	                            ),
	                            _react2.default.createElement(
	                                'li',
	                                null,
	                                _react2.default.createElement(
	                                    _reactRouter.Link,
	                                    { to: '/tagged/css' },
	                                    'CSS'
	                                )
	                            )
	                        )
	                    ),
	                    _react2.default.createElement(_Search2.default, null),
	                    _react2.default.createElement(_UserBar2.default, { logout: this.props.logout, user: this.props.user, loginWithToken: this.props.loginWithToken, fetchInfo: this.props.fetchInfo })
	                )
	            );
	        }
	    }]);
	
	    return Header;
	}(_react2.default.Component);
	
	exports.default = (0, _withStyles2.default)(_header2.default)(Header);

/***/ }),

/***/ 384:
/*!************************************!*\
  !*** ./src/app/styles/header.scss ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

	
	    var content = __webpack_require__(/*! !../../../~/css-loader?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../~/postcss-loader!../../../~/sass-loader!./header.scss */ 385);
	    var insertCss = __webpack_require__(/*! ../../../~/isomorphic-style-loader/lib/insertCss.js */ 387);
	
	    if (typeof content === 'string') {
	      content = [[module.id, content, '']];
	    }
	
	    module.exports = content.locals || {};
	    module.exports._getContent = function() { return content; };
	    module.exports._getCss = function() { return content.toString(); };
	    module.exports._insertCss = function(options) { return insertCss(content, options) };
	    
	    // Hot Module Replacement
	    // https://webpack.github.io/docs/hot-module-replacement
	    // Only activated in browser context
	    if (false) {
	      var removeCss = function() {};
	      module.hot.accept("!!../../../node_modules/css-loader/index.js?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./header.scss", function() {
	        content = require("!!../../../node_modules/css-loader/index.js?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./header.scss");
	
	        if (typeof content === 'string') {
	          content = [[module.id, content, '']];
	        }
	
	        removeCss = insertCss(content, { replace: true });
	      });
	      module.hot.dispose(function() { removeCss(); });
	    }
	  

/***/ }),

/***/ 385:
/*!***********************************************************************************************************************************************************!*\
  !*** ./~/css-loader?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!./~/postcss-loader!./~/sass-loader!./src/app/styles/header.scss ***!
  \***********************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ../../../~/css-loader/lib/css-base.js */ 386)();
	// imports
	
	
	// module
	exports.push([module.id, ".header_root_2wV {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  z-index: 1;\n  background: #fff;\n  border-top: 2px solid #ffa400;\n  box-shadow: 0 1px 0 rgba(12, 13, 14, 0.1), 0 1px 3px rgba(12, 13, 14, 0.1), 0 4px 20px rgba(12, 13, 14, 0.035), 0 1px 1px rgba(12, 13, 14, 0.025);\n  height: 46px; }\n\n.header_menu_3aC {\n  width: 40%;\n  display: inline-block; }\n\n.header_menuList_2cu {\n  font-size: 0;\n  list-style-type: none;\n  display: inline-block; }\n\n.header_menuList_2cu li {\n    display: inline-block; }\n\n.header_menuList_2cu li a {\n      display: table-cell;\n      line-height: 1;\n      font-size: 14px;\n      height: 44px;\n      padding: 0px 10px;\n      vertical-align: middle;\n      color: #333; }\n\n.header_menuList_2cu li a:hover, .header_menuList_2cu li a:active {\n        background: #f4f4f4;\n        box-shadow: 0px -1px 0 0px #ffa400 inset; }\n\n.header_logoLink_3VZ {\n  display: inline-block;\n  line-height: 1;\n  font-size: 14px;\n  height: 44px;\n  padding: 7px 10px;\n  vertical-align: top;\n  color: #333; }\n\n.header_logoLink_3VZ:hover, .header_logoLink_3VZ:active {\n    background: #fff !important;\n    box-shadow: none !important; }\n\n.header_logoLink_3VZ img {\n    height: 100%;\n    float: left; }\n", ""]);
	
	// exports
	exports.locals = {
		"root": "header_root_2wV",
		"root": "header_root_2wV",
		"menu": "header_menu_3aC",
		"menu": "header_menu_3aC",
		"menuList": "header_menuList_2cu",
		"menuList": "header_menuList_2cu",
		"logoLink": "header_logoLink_3VZ",
		"logoLink": "header_logoLink_3VZ"
	};

/***/ }),

/***/ 386:
/*!**************************************!*\
  !*** ./~/css-loader/lib/css-base.js ***!
  \**************************************/
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),

/***/ 387:
/*!****************************************************!*\
  !*** ./~/isomorphic-style-loader/lib/insertCss.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ 388);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _slicedToArray2 = __webpack_require__(/*! babel-runtime/helpers/slicedToArray */ 390);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _getIterator2 = __webpack_require__(/*! babel-runtime/core-js/get-iterator */ 395);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Isomorphic CSS style loader for Webpack
	 *
	 * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE.txt file in the root directory of this source tree.
	 */
	
	var prefix = 's';
	var inserted = {};
	
	// Base64 encoding and decoding - The "Unicode Problem"
	// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
	function b64EncodeUnicode(str) {
	  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
	    return String.fromCharCode('0x' + p1);
	  }));
	}
	
	/**
	 * Remove style/link elements for specified node IDs
	 * if they are no longer referenced by UI components.
	 */
	function removeCss(ids) {
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	    for (var _iterator = (0, _getIterator3.default)(ids), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var id = _step.value;
	
	      if (--inserted[id] <= 0) {
	        var elem = document.getElementById(prefix + id);
	        if (elem) {
	          elem.parentNode.removeChild(elem);
	        }
	      }
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	}
	
	/**
	 * Example:
	 *   // Insert CSS styles object generated by `css-loader` into DOM
	 *   var removeCss = insertCss([[1, 'body { color: red; }']]);
	 *
	 *   // Remove it from the DOM
	 *   removeCss();
	 */
	function insertCss(styles) {
	  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      _ref$replace = _ref.replace,
	      replace = _ref$replace === undefined ? false : _ref$replace,
	      _ref$prepend = _ref.prepend,
	      prepend = _ref$prepend === undefined ? false : _ref$prepend;
	
	  var ids = [];
	  for (var i = 0; i < styles.length; i++) {
	    var _styles$i = (0, _slicedToArray3.default)(styles[i], 4),
	        moduleId = _styles$i[0],
	        css = _styles$i[1],
	        media = _styles$i[2],
	        sourceMap = _styles$i[3];
	
	    var id = moduleId + '-' + i;
	
	    ids.push(id);
	
	    if (inserted[id]) {
	      if (!replace) {
	        inserted[id]++;
	        continue;
	      }
	    }
	
	    inserted[id] = 1;
	
	    var elem = document.getElementById(prefix + id);
	    var create = false;
	
	    if (!elem) {
	      create = true;
	
	      elem = document.createElement('style');
	      elem.setAttribute('type', 'text/css');
	      elem.id = prefix + id;
	
	      if (media) {
	        elem.setAttribute('media', media);
	      }
	    }
	
	    var cssText = css;
	    if (sourceMap && btoa) {
	      // skip IE9 and below, see http://caniuse.com/atob-btoa
	      cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
	      cssText += '\n/*# sourceURL=' + sourceMap.file + '?' + id + '*/';
	    }
	
	    if ('textContent' in elem) {
	      elem.textContent = cssText;
	    } else {
	      elem.styleSheet.cssText = cssText;
	    }
	
	    if (create) {
	      if (prepend) {
	        document.head.insertBefore(elem, document.head.childNodes[0]);
	      } else {
	        document.head.appendChild(elem);
	      }
	    }
	  }
	
	  return removeCss.bind(null, ids);
	}
	
	module.exports = insertCss;

/***/ }),

/***/ 388:
/*!***************************************************!*\
  !*** ./~/babel-runtime/core-js/json/stringify.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/json/stringify */ 389), __esModule: true };

/***/ }),

/***/ 389:
/*!************************************************!*\
  !*** ./~/core-js/library/fn/json/stringify.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(/*! ../../modules/_core */ 311)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ }),

/***/ 390:
/*!**************************************************!*\
  !*** ./~/babel-runtime/helpers/slicedToArray.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _isIterable2 = __webpack_require__(/*! ../core-js/is-iterable */ 391);
	
	var _isIterable3 = _interopRequireDefault(_isIterable2);
	
	var _getIterator2 = __webpack_require__(/*! ../core-js/get-iterator */ 395);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;
	
	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);
	
	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }
	
	    return _arr;
	  }
	
	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

/***/ }),

/***/ 391:
/*!************************************************!*\
  !*** ./~/babel-runtime/core-js/is-iterable.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/is-iterable */ 392), __esModule: true };

/***/ }),

/***/ 392:
/*!*********************************************!*\
  !*** ./~/core-js/library/fn/is-iterable.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../modules/web.dom.iterable */ 355);
	__webpack_require__(/*! ../modules/es6.string.iterator */ 333);
	module.exports = __webpack_require__(/*! ../modules/core.is-iterable */ 393);

/***/ }),

/***/ 393:
/*!*******************************************************!*\
  !*** ./~/core-js/library/modules/core.is-iterable.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(/*! ./_classof */ 394)
	  , ITERATOR  = __webpack_require__(/*! ./_wks */ 354)('iterator')
	  , Iterators = __webpack_require__(/*! ./_iterators */ 339);
	module.exports = __webpack_require__(/*! ./_core */ 311).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ }),

/***/ 394:
/*!***********************************************!*\
  !*** ./~/core-js/library/modules/_classof.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(/*! ./_cof */ 347)
	  , TAG = __webpack_require__(/*! ./_wks */ 354)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ }),

/***/ 395:
/*!*************************************************!*\
  !*** ./~/babel-runtime/core-js/get-iterator.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/get-iterator */ 396), __esModule: true };

/***/ }),

/***/ 396:
/*!**********************************************!*\
  !*** ./~/core-js/library/fn/get-iterator.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../modules/web.dom.iterable */ 355);
	__webpack_require__(/*! ../modules/es6.string.iterator */ 333);
	module.exports = __webpack_require__(/*! ../modules/core.get-iterator */ 397);

/***/ }),

/***/ 397:
/*!********************************************************!*\
  !*** ./~/core-js/library/modules/core.get-iterator.js ***!
  \********************************************************/
/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(/*! ./_an-object */ 316)
	  , get      = __webpack_require__(/*! ./core.get-iterator-method */ 398);
	module.exports = __webpack_require__(/*! ./_core */ 311).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ }),

/***/ 398:
/*!***************************************************************!*\
  !*** ./~/core-js/library/modules/core.get-iterator-method.js ***!
  \***************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(/*! ./_classof */ 394)
	  , ITERATOR  = __webpack_require__(/*! ./_wks */ 354)('iterator')
	  , Iterators = __webpack_require__(/*! ./_iterators */ 339);
	module.exports = __webpack_require__(/*! ./_core */ 311).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ }),

/***/ 399:
/*!**************************************!*\
  !*** ./src/app/components/Search.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _withStyles = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 297);
	
	var _withStyles2 = _interopRequireDefault(_withStyles);
	
	var _search = __webpack_require__(/*! ./../styles/search.scss */ 400);
	
	var _search2 = _interopRequireDefault(_search);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 233);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Search = function (_React$Component) {
	    _inherits(Search, _React$Component);
	
	    function Search(props) {
	        _classCallCheck(this, Search);
	
	        var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, props));
	
	        _this.state = {
	            q: _this.props.q || ''
	        };
	        return _this;
	    }
	
	    _createClass(Search, [{
	        key: 'onSubmitSearch',
	        value: function onSubmitSearch(e) {
	            e.preventDefault();
	            _reactRouter.browserHistory.push('/search?q=' + this.state.q);
	        }
	    }, {
	        key: 'handleInputChange',
	        value: function handleInputChange(e) {
	            this.setState({ q: e.currentTarget.value });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: _search2.default.root },
	                _react2.default.createElement(
	                    'form',
	                    { onSubmit: this.onSubmitSearch.bind(this) },
	                    _react2.default.createElement(
	                        'div',
	                        { className: _search2.default.form },
	                        _react2.default.createElement('input', { value: this.state.q, type: 'text', placeholder: 'T\xECm ki\u1EBFm...', className: _search2.default.searchInput, onChange: this.handleInputChange.bind(this) }),
	                        _react2.default.createElement(
	                            'span',
	                            { className: _search2.default.submitBtn },
	                            _react2.default.createElement('i', { className: 'ion-ios-search-strong' })
	                        )
	                    )
	                )
	            );
	        }
	    }]);
	
	    return Search;
	}(_react2.default.Component);
	
	exports.default = (0, _withStyles2.default)(_search2.default)(Search);

/***/ }),

/***/ 400:
/*!************************************!*\
  !*** ./src/app/styles/search.scss ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

	
	    var content = __webpack_require__(/*! !../../../~/css-loader?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../~/postcss-loader!../../../~/sass-loader!./search.scss */ 401);
	    var insertCss = __webpack_require__(/*! ../../../~/isomorphic-style-loader/lib/insertCss.js */ 387);
	
	    if (typeof content === 'string') {
	      content = [[module.id, content, '']];
	    }
	
	    module.exports = content.locals || {};
	    module.exports._getContent = function() { return content; };
	    module.exports._getCss = function() { return content.toString(); };
	    module.exports._insertCss = function(options) { return insertCss(content, options) };
	    
	    // Hot Module Replacement
	    // https://webpack.github.io/docs/hot-module-replacement
	    // Only activated in browser context
	    if (false) {
	      var removeCss = function() {};
	      module.hot.accept("!!../../../node_modules/css-loader/index.js?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./search.scss", function() {
	        content = require("!!../../../node_modules/css-loader/index.js?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./search.scss");
	
	        if (typeof content === 'string') {
	          content = [[module.id, content, '']];
	        }
	
	        removeCss = insertCss(content, { replace: true });
	      });
	      module.hot.dispose(function() { removeCss(); });
	    }
	  

/***/ }),

/***/ 401:
/*!***********************************************************************************************************************************************************!*\
  !*** ./~/css-loader?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!./~/postcss-loader!./~/sass-loader!./src/app/styles/search.scss ***!
  \***********************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ../../../~/css-loader/lib/css-base.js */ 386)();
	// imports
	
	
	// module
	exports.push([module.id, ".search_root_3D3 {\n  width: 335px;\n  display: inline-block;\n  vertical-align: top;\n  margin-top: 8px;\n  position: relative; }\n\n.search_form_2ZK {\n  position: relative;\n  width: 100%;\n  border: 1px solid #ddd;\n  height: 28px; }\n\n.search_searchInput_1sU {\n  border: 0;\n  line-height: 26px;\n  padding: 0 10px;\n  outline: none;\n  width: 100%;\n  padding-right: 28px; }\n\n.search_searchInput_1sU:focus + span {\n    background: #0095ff;\n    color: #fff; }\n\n.search_searchInput_1sU:focus + span i {\n      color: #fff; }\n\n.search_submitBtn_2mh {\n  position: absolute;\n  top: -1px;\n  right: -1px;\n  width: 28px;\n  height: 28px;\n  text-align: center;\n  line-height: 28px; }\n\n.search_submitBtn_2mh i {\n    font-size: 20px; }\n\n.search_submitBtn_2mh:hover {\n    background: #0095ff;\n    color: #fff; }\n\n.search_submitBtn_2mh:hover i {\n      color: #fff; }\n", ""]);
	
	// exports
	exports.locals = {
		"root": "search_root_3D3",
		"root": "search_root_3D3",
		"form": "search_form_2ZK",
		"form": "search_form_2ZK",
		"searchInput": "search_searchInput_1sU",
		"searchInput": "search_searchInput_1sU",
		"submitBtn": "search_submitBtn_2mh",
		"submitBtn": "search_submitBtn_2mh"
	};

/***/ }),

/***/ 402:
/*!***************************************!*\
  !*** ./src/app/components/UserBar.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 233);
	
	var _GoogleLoginBtn = __webpack_require__(/*! ./GoogleLoginBtn */ 403);
	
	var _GoogleLoginBtn2 = _interopRequireDefault(_GoogleLoginBtn);
	
	var _FacebookLoginBtn = __webpack_require__(/*! ./FacebookLoginBtn */ 406);
	
	var _FacebookLoginBtn2 = _interopRequireDefault(_FacebookLoginBtn);
	
	var _withStyles = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 297);
	
	var _withStyles2 = _interopRequireDefault(_withStyles);
	
	var _userBar = __webpack_require__(/*! ./../styles/user-bar.scss */ 409);
	
	var _userBar2 = _interopRequireDefault(_userBar);
	
	var _global = __webpack_require__(/*! ./../../global */ 411);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var UserBar = function (_React$Component) {
	    _inherits(UserBar, _React$Component);
	
	    function UserBar(props) {
	        _classCallCheck(this, UserBar);
	
	        var _this = _possibleConstructorReturn(this, (UserBar.__proto__ || Object.getPrototypeOf(UserBar)).call(this, props));
	
	        _this.state = {
	            showSigninPopup: false,
	            showUserMenu: false
	        };
	        return _this;
	    }
	
	    _createClass(UserBar, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this2 = this;
	
	            if (localStorage) {
	                var tokenData = localStorage.getItem('customer_token');
	                this.props.fetchInfo(JSON.parse(tokenData));
	            }
	
	            var state = _extends({}, this.state, {
	                isLogin: this.props.user !== null,
	                user: this.props.user
	            });
	            this.setState(state);
	            window.showSigninPopup = function () {
	                _this2.showLogin(true);
	            };
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            var state = _extends({}, this.state, {
	                isLogin: nextProps.user !== null && nextProps.user !== false,
	                user: nextProps.user,
	                showUserMenu: false
	            });
	            this.setState(state);
	        }
	    }, {
	        key: 'responseGoogleLogin',
	        value: function responseGoogleLogin(info) {
	            this.props.loginWithToken(info.access_token, 'google');
	        }
	    }, {
	        key: 'responseFacebookLogin',
	        value: function responseFacebookLogin(info) {
	            this.props.loginWithToken(info.accessToken, 'facebook');
	        }
	    }, {
	        key: 'getLoginTooltip',
	        value: function getLoginTooltip() {
	            var _this3 = this;
	
	            if (this.state.showSigninPopup) return _react2.default.createElement(
	                'div',
	                { className: _userBar2.default.popup },
	                _react2.default.createElement('div', { className: _userBar2.default.popupBackDrop, onClick: function onClick() {
	                        _this3.showLogin(false);
	                    } }),
	                _react2.default.createElement(
	                    'div',
	                    { className: _userBar2.default.popup },
	                    _react2.default.createElement(
	                        'div',
	                        { className: _userBar2.default.signinTitle },
	                        '\u0110\u0103ng nh\u1EADp'
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: _userBar2.default.signinNote },
	                        'Hi\u1EC7n t\u1EA1i b\u1EA1n ch\u1EC9 c\xF3 th\u1EC3 \u0111\u0103ng nh\u1EADp th\xF4ng qua t\xE0i kho\u1EA3n Google ho\u1EB7c Facebook.'
	                    ),
	                    _react2.default.createElement(_GoogleLoginBtn2.default, { onClick: this.loginTolltipToggle.bind(this), socialId: '60036624360-59ceaveq0votucv9inc7fvn2u70c6cg8.apps.googleusercontent.com',
	                        scope: 'profile email openid',
	                        responseHandler: this.responseGoogleLogin.bind(this) }),
	                    _react2.default.createElement(_FacebookLoginBtn2.default, { onClick: this.loginTolltipToggle.bind(this),
	                        appId: '580525262157720'
	                        // autoLoad={true}
	                        , fields: 'name,email,picture',
	                        callback: this.responseFacebookLogin.bind(this),
	                        cssClass: 'my-facebook-button-class',
	                        redirectUri: 'http://localhost:5000',
	                        icon: 'fa-facebook' })
	                )
	            );
	        }
	    }, {
	        key: 'showLogin',
	        value: function showLogin(show) {
	            this.setState({
	                showSigninPopup: show
	            });
	        }
	    }, {
	        key: 'loginTolltipToggle',
	        value: function loginTolltipToggle() {
	            this.setState({
	                showSigninPopup: !this.state.showSigninPopup
	            });
	        }
	    }, {
	        key: 'menuToggle',
	        value: function menuToggle() {
	            var show = !this.state.showUserMenu;
	            this.setState({
	                showUserMenu: show
	            });
	        }
	    }, {
	        key: 'logout',
	        value: function logout(e) {
	            e.preventDefault();
	            this.props.logout();
	        }
	    }, {
	        key: 'getMenu',
	        value: function getMenu() {
	            if (this.state.showUserMenu) {
	                return _react2.default.createElement(
	                    'div',
	                    { className: _userBar2.default.userMenuContent },
	                    _react2.default.createElement(
	                        'a',
	                        { href: 'javascript:', onClick: this.logout.bind(this) },
	                        'Tho\xE1t t\xE0i kho\u1EA3n: ',
	                        this.state.user.fullname
	                    )
	                );
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this4 = this;
	
	            if (this.state.user === false) {
	                return _react2.default.createElement(
	                    'div',
	                    { className: _userBar2.default.root },
	                    _react2.default.createElement(_global.Skeleton, { w: '75px', h: '26px', fl: 'right' })
	                );
	            }
	            if (this.state.isLogin) {
	                var user = this.props.user;
	                return _react2.default.createElement(
	                    'div',
	                    { className: _userBar2.default.root },
	                    _react2.default.createElement(
	                        _reactRouter.Link,
	                        { to: 'notice', title: 'Th\xF4ng b\xE1o c\u1EE7a b\u1EA1n' },
	                        _react2.default.createElement('i', { className: 'ion-android-notifications' })
	                    ),
	                    _react2.default.createElement(
	                        _reactRouter.Link,
	                        { to: '/me', className: _userBar2.default.userLink },
	                        _react2.default.createElement('img', { src: user.image })
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: _userBar2.default.userMenu },
	                        _react2.default.createElement(
	                            'button',
	                            { onClick: this.menuToggle.bind(this) },
	                            _react2.default.createElement('i', { className: 'ion-navicon' })
	                        ),
	                        this.getMenu()
	                    )
	                );
	            } else return _react2.default.createElement(
	                'div',
	                { className: _userBar2.default.root },
	                _react2.default.createElement(
	                    'a',
	                    { title: '\u0110\u0103ng nh\xE2p', className: _userBar2.default.showLogin, href: 'javascript:', onClick: function onClick() {
	                            _this4.showLogin(true);
	                        } },
	                    '\u0110\u0103ng nh\u1EADp v\u1EDBi ',
	                    _react2.default.createElement(
	                        'span',
	                        { className: _userBar2.default.loginGoogleIcon },
	                        _react2.default.createElement('i', { className: 'ion-social-google-outline' })
	                    ),
	                    ' ho\u1EB7c ',
	                    _react2.default.createElement(
	                        'span',
	                        { className: _userBar2.default.loginFacebookIcon },
	                        _react2.default.createElement('i', { className: 'ion-social-facebook' })
	                    )
	                ),
	                this.getLoginTooltip()
	            );
	        }
	    }]);
	
	    return UserBar;
	}(_react2.default.Component);
	
	exports.default = (0, _withStyles2.default)(_userBar2.default)(UserBar);

/***/ }),

/***/ 403:
/*!**********************************************!*\
  !*** ./src/app/components/GoogleLoginBtn.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _withStyles = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 297);
	
	var _withStyles2 = _interopRequireDefault(_withStyles);
	
	var _googleLogin = __webpack_require__(/*! ./../styles/googleLogin.scss */ 404);
	
	var _googleLogin2 = _interopRequireDefault(_googleLogin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var GoogleLoginBtn = function (_React$Component) {
		_inherits(GoogleLoginBtn, _React$Component);
	
		function GoogleLoginBtn(props) {
			_classCallCheck(this, GoogleLoginBtn);
	
			return _possibleConstructorReturn(this, (GoogleLoginBtn.__proto__ || Object.getPrototypeOf(GoogleLoginBtn)).call(this, props));
		}
	
		_createClass(GoogleLoginBtn, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				(function (d, s, id) {
					var js,
					    gs = d.getElementsByTagName(s)[0];
					if (d.getElementById(id)) {
						return;
					}
					js = d.createElement(s);js.id = id;
					js.src = 'https://apis.google.com/js/platform.js';
					gs.parentNode.insertBefore(js, gs);
				})(document, 'script', 'google-platform');
			}
		}, {
			key: 'checkLoginState',
			value: function checkLoginState(response) {
				if (auth2.isSignedIn.get()) {
					var profile = auth2.currentUser.get().getBasicProfile();
				} else {
					if (this.props.responseHandler) {
						this.props.responseHandler({ status: response.status });
					}
				}
			}
		}, {
			key: 'clickHandler',
			value: function clickHandler() {
				var socialId = this.props.socialId,
				    responseHandler = this.props.responseHandler,
				    scope = this.props.scope;
	
				gapi.load('auth2', function () {
					var auth2 = gapi.auth2.init({
						client_id: socialId,
						fetch_basic_profile: false,
						scope: scope
					});
					auth2.signIn().then(function (response) {
						responseHandler(response.getAuthResponse());
					});
				});
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{ onClick: this.clickHandler.bind(this), className: _googleLogin2.default.root },
					_react2.default.createElement('i', { className: 'ion-social-google-outline' }),
					_react2.default.createElement(
						'span',
						null,
						'Google'
					)
				);
			}
		}]);
	
		return GoogleLoginBtn;
	}(_react2.default.Component);
	
	exports.default = (0, _withStyles2.default)(_googleLogin2.default)(GoogleLoginBtn);

/***/ }),

/***/ 404:
/*!*****************************************!*\
  !*** ./src/app/styles/googleLogin.scss ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

	
	    var content = __webpack_require__(/*! !../../../~/css-loader?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../~/postcss-loader!../../../~/sass-loader!./googleLogin.scss */ 405);
	    var insertCss = __webpack_require__(/*! ../../../~/isomorphic-style-loader/lib/insertCss.js */ 387);
	
	    if (typeof content === 'string') {
	      content = [[module.id, content, '']];
	    }
	
	    module.exports = content.locals || {};
	    module.exports._getContent = function() { return content; };
	    module.exports._getCss = function() { return content.toString(); };
	    module.exports._insertCss = function(options) { return insertCss(content, options) };
	    
	    // Hot Module Replacement
	    // https://webpack.github.io/docs/hot-module-replacement
	    // Only activated in browser context
	    if (false) {
	      var removeCss = function() {};
	      module.hot.accept("!!../../../node_modules/css-loader/index.js?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./googleLogin.scss", function() {
	        content = require("!!../../../node_modules/css-loader/index.js?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./googleLogin.scss");
	
	        if (typeof content === 'string') {
	          content = [[module.id, content, '']];
	        }
	
	        removeCss = insertCss(content, { replace: true });
	      });
	      module.hot.dispose(function() { removeCss(); });
	    }
	  

/***/ }),

/***/ 405:
/*!****************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!./~/postcss-loader!./~/sass-loader!./src/app/styles/googleLogin.scss ***!
  \****************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ../../../~/css-loader/lib/css-base.js */ 386)();
	// imports
	
	
	// module
	exports.push([module.id, ".googleLogin_root_30q {\n  background: #ea4335;\n  color: #fff;\n  cursor: pointer;\n  width: 136px;\n  height: 38px;\n  line-height: 36px;\n  border: 1px solid transparent;\n  text-align: center;\n  font-weight: 500;\n  display: inline-block; }\n  .googleLogin_root_30q i {\n    border-right: 1px solid rgba(12, 13, 14, 0.1);\n    box-sizing: border-box;\n    width: 38px;\n    height: 100%;\n    line-height: 1;\n    padding: 7px 0 13px 0;\n    font-size: 24px;\n    float: left;\n    color: #fff; }\n", ""]);
	
	// exports
	exports.locals = {
		"root": "googleLogin_root_30q",
		"root": "googleLogin_root_30q"
	};

/***/ }),

/***/ 406:
/*!************************************************!*\
  !*** ./src/app/components/FacebookLoginBtn.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _withStyles = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 297);
	
	var _withStyles2 = _interopRequireDefault(_withStyles);
	
	var _facebookLogin = __webpack_require__(/*! ./../styles/facebookLogin.scss */ 407);
	
	var _facebookLogin2 = _interopRequireDefault(_facebookLogin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var FacebookLoginBtn = function (_React$Component) {
		_inherits(FacebookLoginBtn, _React$Component);
	
		function FacebookLoginBtn(props) {
			_classCallCheck(this, FacebookLoginBtn);
	
			var _this = _possibleConstructorReturn(this, (FacebookLoginBtn.__proto__ || Object.getPrototypeOf(FacebookLoginBtn)).call(this, props));
	
			_this.state = {
				isSdkLoaded: false,
				isProcessing: false
			};
	
			return _this;
		}
	
		_createClass(FacebookLoginBtn, [{
			key: 'sdkLoaded',
			value: function sdkLoaded() {
				this.setState({ isSdkLoaded: true });
			}
		}, {
			key: 'setFbAsyncInit',
			value: function setFbAsyncInit() {
				var _this2 = this;
	
				var _props = this.props,
				    appId = _props.appId,
				    xfbml = _props.xfbml,
				    cookie = _props.cookie,
				    version = _props.version,
				    autoLoad = _props.autoLoad;
	
				window.fbAsyncInit = function () {
					window.FB.init({
						version: 'v' + version,
						appId: appId,
						xfbml: xfbml,
						cookie: cookie
					});
					_this2.setState({ isSdkLoaded: true });
					if (autoLoad || window.location.search.includes('facebookdirect')) {
						window.FB.getLoginStatus(_this2.checkLoginAfterRefresh.bind(_this2));
					}
				};
			}
		}, {
			key: 'checkLoginAfterRefresh',
			value: function checkLoginAfterRefresh(response) {
				var _this3 = this;
	
				if (response.status === 'connected') {
					this.checkLoginState(response);
				} else {
					window.FB.login(function (loginResponse) {
						return _this3.checkLoginState(loginResponse);
					}, true);
				}
			}
		}, {
			key: 'responseApi',
			value: function responseApi(authResponse) {
				var _this4 = this;
	
				window.FB.api('/me', { locale: this.props.language, fields: this.props.fields }, function (me) {
					Object.assign(me, authResponse);
					_this4.props.callback(me);
				});
			}
		}, {
			key: 'checkLoginState',
			value: function checkLoginState(response) {
				this.setState({ isProcessing: false });
				if (response.authResponse) {
					this.responseApi(response.authResponse);
				} else {
					if (this.props.callback) {
						this.props.callback({ status: response.status });
					}
				}
			}
		}, {
			key: 'loadSdkAsynchronously',
			value: function loadSdkAsynchronously() {
				var language = this.props.language;
	
				(function (d, s, id) {
					var element = d.getElementsByTagName(s)[0];
					var fjs = element;
					var js = element;
					if (d.getElementById(id)) {
						return;
					}
					js = d.createElement(s);js.id = id;
					js.src = '//connect.facebook.net/' + language + '/all.js';
					fjs.parentNode.insertBefore(js, fjs);
				})(document, 'script', 'facebook-jssdk');
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				if (document.getElementById('facebook-jssdk')) {
					this.sdkLoaded();
					return;
				}
				this.setFbAsyncInit();
				this.loadSdkAsynchronously();
				var fbRoot = document.getElementById('fb-root');
				if (!fbRoot) {
					fbRoot = document.createElement('div');
					fbRoot.id = 'fb-root';
					document.body.appendChild(fbRoot);
				}
			}
		}, {
			key: 'clickHandler',
			value: function clickHandler(e) {
				var _this5 = this;
	
				if (!this.state.isSdkLoaded || this.state.isProcessing || this.props.isDisabled) {
					return;
				}
				this.setState({ isProcessing: true });
				var _props2 = this.props,
				    scope = _props2.scope,
				    appId = _props2.appId,
				    onClick = _props2.onClick,
				    reAuthenticate = _props2.reAuthenticate,
				    redirectUri = _props2.redirectUri,
				    disableMobileRedirect = _props2.disableMobileRedirect;
	
	
				if (typeof onClick === 'function') {
					onClick(e);
					if (e.defaultPrevented) {
						return;
					}
				}
	
				var params = {
					client_id: appId,
					redirect_uri: redirectUri,
					state: 'facebookdirect',
					scope: scope
				};
	
				if (reAuthenticate) {
					params.auth_type = 'reauthenticate';
				}
	
				if (this.props.isMobile && !disableMobileRedirect) {
					window.location.href = '//www.facebook.com/dialog/oauth?' + objectToParams(params);
				} else {
					window.FB.login(function (loginResponse) {
						return _this5.checkLoginState(loginResponse);
					}, { scope: scope, auth_type: params.auth_type });
				}
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{ onClick: this.clickHandler.bind(this), className: _facebookLogin2.default.root },
					_react2.default.createElement('i', { className: 'ion-social-facebook' }),
					_react2.default.createElement(
						'span',
						null,
						'Facebook'
					)
				);
			}
		}]);
	
		return FacebookLoginBtn;
	}(_react2.default.Component);
	
	exports.default = (0, _withStyles2.default)(_facebookLogin2.default)(FacebookLoginBtn);

/***/ }),

/***/ 407:
/*!*******************************************!*\
  !*** ./src/app/styles/facebookLogin.scss ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

	
	    var content = __webpack_require__(/*! !../../../~/css-loader?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../~/postcss-loader!../../../~/sass-loader!./facebookLogin.scss */ 408);
	    var insertCss = __webpack_require__(/*! ../../../~/isomorphic-style-loader/lib/insertCss.js */ 387);
	
	    if (typeof content === 'string') {
	      content = [[module.id, content, '']];
	    }
	
	    module.exports = content.locals || {};
	    module.exports._getContent = function() { return content; };
	    module.exports._getCss = function() { return content.toString(); };
	    module.exports._insertCss = function(options) { return insertCss(content, options) };
	    
	    // Hot Module Replacement
	    // https://webpack.github.io/docs/hot-module-replacement
	    // Only activated in browser context
	    if (false) {
	      var removeCss = function() {};
	      module.hot.accept("!!../../../node_modules/css-loader/index.js?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./facebookLogin.scss", function() {
	        content = require("!!../../../node_modules/css-loader/index.js?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./facebookLogin.scss");
	
	        if (typeof content === 'string') {
	          content = [[module.id, content, '']];
	        }
	
	        removeCss = insertCss(content, { replace: true });
	      });
	      module.hot.dispose(function() { removeCss(); });
	    }
	  

/***/ }),

/***/ 408:
/*!******************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!./~/postcss-loader!./~/sass-loader!./src/app/styles/facebookLogin.scss ***!
  \******************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ../../../~/css-loader/lib/css-base.js */ 386)();
	// imports
	
	
	// module
	exports.push([module.id, ".facebookLogin_root_JL2 {\n  background: #3b5998;\n  color: #fff;\n  cursor: pointer;\n  width: 136px;\n  height: 38px;\n  line-height: 36px;\n  border: 1px solid transparent;\n  text-align: center;\n  font-weight: 500;\n  display: inline-block;\n  margin-left: 10px; }\n  .facebookLogin_root_JL2 i {\n    border-right: 1px solid rgba(12, 13, 14, 0.1);\n    box-sizing: border-box;\n    width: 38px;\n    height: 100%;\n    line-height: 1;\n    padding: 7px 0 13px 0;\n    font-size: 24px;\n    float: left;\n    color: #fff; }\n", ""]);
	
	// exports
	exports.locals = {
		"root": "facebookLogin_root_JL2",
		"root": "facebookLogin_root_JL2"
	};

/***/ }),

/***/ 409:
/*!**************************************!*\
  !*** ./src/app/styles/user-bar.scss ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

	
	    var content = __webpack_require__(/*! !../../../~/css-loader?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../~/postcss-loader!../../../~/sass-loader!./user-bar.scss */ 410);
	    var insertCss = __webpack_require__(/*! ../../../~/isomorphic-style-loader/lib/insertCss.js */ 387);
	
	    if (typeof content === 'string') {
	      content = [[module.id, content, '']];
	    }
	
	    module.exports = content.locals || {};
	    module.exports._getContent = function() { return content; };
	    module.exports._getCss = function() { return content.toString(); };
	    module.exports._insertCss = function(options) { return insertCss(content, options) };
	    
	    // Hot Module Replacement
	    // https://webpack.github.io/docs/hot-module-replacement
	    // Only activated in browser context
	    if (false) {
	      var removeCss = function() {};
	      module.hot.accept("!!../../../node_modules/css-loader/index.js?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./user-bar.scss", function() {
	        content = require("!!../../../node_modules/css-loader/index.js?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./user-bar.scss");
	
	        if (typeof content === 'string') {
	          content = [[module.id, content, '']];
	        }
	
	        removeCss = insertCss(content, { replace: true });
	      });
	      module.hot.dispose(function() { removeCss(); });
	    }
	  

/***/ }),

/***/ 410:
/*!*************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!./~/postcss-loader!./~/sass-loader!./src/app/styles/user-bar.scss ***!
  \*************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ../../../~/css-loader/lib/css-base.js */ 386)();
	// imports
	
	
	// module
	exports.push([module.id, ".user-bar_root_qWW {\n  width: 366px;\n  display: inline-block;\n  vertical-align: top;\n  margin-top: 8px;\n  position: relative;\n  text-align: right; }\n  .user-bar_root_qWW a {\n    display: inline-block;\n    vertical-align: middle;\n    margin-left: 15px; }\n  .user-bar_root_qWW a i {\n      font-size: 18px;\n      color: #9E9E9E; }\n  .user-bar_userLink_2lL img {\n  width: 28px;\n  height: 28px;\n  float: left; }\n  .user-bar_showLogin_2sh {\n  border: 2px solid #0095ff;\n  padding: 1px 9px 2px 9px;\n  line-height: 20px; }\n  .user-bar_loginGoogleIcon_6Sx i {\n  color: #ea4335 !important; }\n  .user-bar_loginFacebookIcon_m45 i {\n  color: #3b5998 !important; }\n  .user-bar_popupBackDrop_1dz {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 1; }\n  .user-bar_popup_3oa {\n  position: fixed;\n  z-index: 2;\n  right: 0;\n  left: 0;\n  margin: auto;\n  top: 30%;\n  background: #fff;\n  padding: 10px 30px 25px;\n  width: 348px;\n  border: 1px solid #d0d0d0;\n  box-shadow: 15px 20px 15px rgba(0, 0, 0, 0.28); }\n  .user-bar_signinTitle_l30 {\n  text-align: center;\n  font-size: 20px;\n  border-bottom: 1px solid #ddd;\n  padding-bottom: 8px;\n  margin-bottom: 10px; }\n  .user-bar_signinNote_3aa {\n  text-align: center;\n  font-size: 12px;\n  margin-bottom: 15px;\n  color: #757575; }\n  .user-bar_userMenu_2QK {\n  float: right; }\n  .user-bar_userMenu_2QK button {\n    border: 0;\n    background: transparent;\n    font-size: 30px;\n    margin-top: -2px;\n    margin-left: 25px;\n    position: relative;\n    cursor: pointer;\n    outline: none; }\n  .user-bar_userMenuContent_3fI {\n  position: absolute;\n  width: 300px;\n  max-height: 600px;\n  padding: 10px 15px 20px 15px;\n  background: #fff;\n  top: 37px;\n  right: 0;\n  box-shadow: 0 0 5px #ccc;\n  border-bottom: 5px solid #2196F3; }\n", ""]);
	
	// exports
	exports.locals = {
		"root": "user-bar_root_qWW",
		"root": "user-bar_root_qWW",
		"userLink": "user-bar_userLink_2lL",
		"userLink": "user-bar_userLink_2lL",
		"showLogin": "user-bar_showLogin_2sh",
		"showLogin": "user-bar_showLogin_2sh",
		"loginGoogleIcon": "user-bar_loginGoogleIcon_6Sx",
		"loginGoogleIcon": "user-bar_loginGoogleIcon_6Sx",
		"loginFacebookIcon": "user-bar_loginFacebookIcon_m45",
		"loginFacebookIcon": "user-bar_loginFacebookIcon_m45",
		"popupBackDrop": "user-bar_popupBackDrop_1dz",
		"popupBackDrop": "user-bar_popupBackDrop_1dz",
		"popup": "user-bar_popup_3oa",
		"popup": "user-bar_popup_3oa",
		"signinTitle": "user-bar_signinTitle_l30",
		"signinTitle": "user-bar_signinTitle_l30",
		"signinNote": "user-bar_signinNote_3aa",
		"signinNote": "user-bar_signinNote_3aa",
		"userMenu": "user-bar_userMenu_2QK",
		"userMenu": "user-bar_userMenu_2QK",
		"userMenuContent": "user-bar_userMenuContent_3fI",
		"userMenuContent": "user-bar_userMenuContent_3fI"
	};

/***/ }),

/***/ 411:
/*!*****************************!*\
  !*** ./src/global/index.js ***!
  \*****************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Tabs = exports.Tags = exports.VoteButton = exports.UserBox = exports.Skeleton = exports.Pagination = exports.QuestionItem = undefined;
	
	var _Tabs = __webpack_require__(/*! ./components/Tabs */ 412);
	
	var _Tabs2 = _interopRequireDefault(_Tabs);
	
	var _QuestionItem = __webpack_require__(/*! ./components/QuestionItem */ 418);
	
	var _QuestionItem2 = _interopRequireDefault(_QuestionItem);
	
	var _Pagination = __webpack_require__(/*! ./components/Pagination */ 610);
	
	var _Pagination2 = _interopRequireDefault(_Pagination);
	
	var _Skeleton = __webpack_require__(/*! ./components/Skeleton */ 415);
	
	var _Skeleton2 = _interopRequireDefault(_Skeleton);
	
	var _Tags = __webpack_require__(/*! ./components/Tags */ 538);
	
	var _Tags2 = _interopRequireDefault(_Tags);
	
	var _UserBox = __webpack_require__(/*! ./components/UserBox */ 613);
	
	var _UserBox2 = _interopRequireDefault(_UserBox);
	
	var _VoteButton = __webpack_require__(/*! ./components/VoteButton */ 614);
	
	var _VoteButton2 = _interopRequireDefault(_VoteButton);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.QuestionItem = _QuestionItem2.default;
	exports.Pagination = _Pagination2.default;
	exports.Skeleton = _Skeleton2.default;
	exports.UserBox = _UserBox2.default;
	exports.VoteButton = _VoteButton2.default;
	exports.Tags = _Tags2.default;
	exports.Tabs = _Tabs2.default;

/***/ }),

/***/ 412:
/*!***************************************!*\
  !*** ./src/global/components/Tabs.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _withStyles = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 297);
	
	var _withStyles2 = _interopRequireDefault(_withStyles);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 233);
	
	var _tabs = __webpack_require__(/*! ./styles/tabs.scss */ 413);
	
	var _tabs2 = _interopRequireDefault(_tabs);
	
	var _Skeleton = __webpack_require__(/*! ./Skeleton */ 415);
	
	var _Skeleton2 = _interopRequireDefault(_Skeleton);
	
	var _QuestionItem = __webpack_require__(/*! ./QuestionItem */ 418);
	
	var _QuestionItem2 = _interopRequireDefault(_QuestionItem);
	
	var _Pagination = __webpack_require__(/*! ./Pagination */ 610);
	
	var _Pagination2 = _interopRequireDefault(_Pagination);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Tabs = function (_React$Component) {
	    _inherits(Tabs, _React$Component);
	
	    function Tabs(props) {
	        _classCallCheck(this, Tabs);
	
	        return _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));
	    }
	
	    _createClass(Tabs, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.props.setCurentTab(this.props.q || '', this.props.tab, this.props.page);
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            if (nextProps.tab !== this.props.tab || nextProps.q !== this.props.q || this.props.page !== nextProps.page) {
	                return this.props.setCurentTab(nextProps.q, nextProps.tab, nextProps.page);
	            }
	        }
	    }, {
	        key: 'createTabLink',
	        value: function createTabLink(item) {
	            return this.props.base_url + '?q=' + this.props.q + '&tab=' + item.query;
	        }
	    }, {
	        key: 'getTabNav',
	        value: function getTabNav() {
	            var _this2 = this;
	
	            var tabNav = this.props.tabs.map(function (item, index) {
	                return item.current ? _react2.default.createElement(
	                    'li',
	                    { key: index, className: _tabs2.default.tabNavActive },
	                    _react2.default.createElement(
	                        'span',
	                        { className: _tabs2.default.link },
	                        item.title
	                    )
	                ) : _react2.default.createElement(
	                    'li',
	                    { key: index },
	                    _react2.default.createElement(
	                        _reactRouter.Link,
	                        { className: _tabs2.default.link, to: _this2.createTabLink(item) },
	                        item.title
	                    )
	                );
	            });
	            return _react2.default.createElement(
	                'div',
	                { className: _tabs2.default.tabNav },
	                _react2.default.createElement(
	                    'label',
	                    { className: _tabs2.default.bigLabel },
	                    this.props.navText || 'Top c\xE2u h\u1ECFi'
	                ),
	                _react2.default.createElement(
	                    'ul',
	                    null,
	                    tabNav
	                )
	            );
	        }
	    }, {
	        key: 'generateUri',
	        value: function generateUri() {
	            var tab = void 0;
	            this.props.tabs.map(function (item) {
	                if (item.current) tab = item.query;
	            });
	            return '/?tab=' + tab;
	        }
	    }, {
	        key: 'renderList',
	        value: function renderList() {
	            if (this.props.list.loading) {
	                return [1, 2, 3, 4].map(function (i) {
	                    return _react2.default.createElement(
	                        _Skeleton2.default,
	                        { key: i, wrap: true, mb: '30px', mt: '20px' },
	                        _react2.default.createElement(_Skeleton2.default, { w: '168px', h: '60px', mr: '10px' }),
	                        _react2.default.createElement(_Skeleton2.default, { w: 'calc(100% - 178px)', h: '15px', mb: '20px' }),
	                        _react2.default.createElement(_Skeleton2.default, { w: '200px', h: '25px' }),
	                        _react2.default.createElement(_Skeleton2.default, { w: '200px', h: '15px', fl: 'right' })
	                    );
	                });
	            }
	            if (this.props.list.data.length === 0) {
	                if (this.props.q === '') {
	                    return _react2.default.createElement(
	                        'p',
	                        { className: _tabs2.default.noResult },
	                        'Ch\u01B0a c\xF3 c\xE2u h\u1ECFi n\xE0o, h\xE3y ',
	                        _react2.default.createElement(
	                            _reactRouter.Link,
	                            { to: '/questions/add' },
	                            '\u0111\u1EB7t c\xE2u h\u1ECFi'
	                        )
	                    );
	                } else {
	                    return _react2.default.createElement(
	                        'p',
	                        { className: _tabs2.default.noResult },
	                        'Ch\u01B0a c\xF3 ai th\u1EAFc m\u1EAFc v\u1EC1 ',
	                        _react2.default.createElement(
	                            'code',
	                            null,
	                            this.props.q
	                        ),
	                        ', h\xE3y ',
	                        _react2.default.createElement(
	                            _reactRouter.Link,
	                            { to: '/questions/add' },
	                            '\u0111\u1EB7t c\xE2u h\u1ECFi'
	                        )
	                    );
	                }
	            }
	            return this.props.list.data.map(function (item, index) {
	                return _react2.default.createElement(_QuestionItem2.default, { key: index, item: item });
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: _tabs2.default.root },
	                this.getTabNav(),
	                _react2.default.createElement(
	                    'div',
	                    { className: _tabs2.default.tabContent },
	                    this.renderList(),
	                    _react2.default.createElement(_Pagination2.default, { uri: this.generateUri(), total: this.props.list.total, limit: this.props.list.limit, current: this.props.list.current })
	                )
	            );
	        }
	    }]);
	
	    return Tabs;
	}(_react2.default.Component);
	
	exports.default = (0, _withStyles2.default)(_tabs2.default)(Tabs);

/***/ }),

/***/ 413:
/*!************************************************!*\
  !*** ./src/global/components/styles/tabs.scss ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

	
	    var content = __webpack_require__(/*! !../../../../~/css-loader?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../../~/postcss-loader!../../../../~/sass-loader!./tabs.scss */ 414);
	    var insertCss = __webpack_require__(/*! ../../../../~/isomorphic-style-loader/lib/insertCss.js */ 387);
	
	    if (typeof content === 'string') {
	      content = [[module.id, content, '']];
	    }
	
	    module.exports = content.locals || {};
	    module.exports._getContent = function() { return content; };
	    module.exports._getCss = function() { return content.toString(); };
	    module.exports._insertCss = function(options) { return insertCss(content, options) };
	    
	    // Hot Module Replacement
	    // https://webpack.github.io/docs/hot-module-replacement
	    // Only activated in browser context
	    if (false) {
	      var removeCss = function() {};
	      module.hot.accept("!!../../../../node_modules/css-loader/index.js?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js!../../../../node_modules/sass-loader/index.js!./tabs.scss", function() {
	        content = require("!!../../../../node_modules/css-loader/index.js?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js!../../../../node_modules/sass-loader/index.js!./tabs.scss");
	
	        if (typeof content === 'string') {
	          content = [[module.id, content, '']];
	        }
	
	        removeCss = insertCss(content, { replace: true });
	      });
	      module.hot.dispose(function() { removeCss(); });
	    }
	  

/***/ }),

/***/ 414:
/*!***********************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!./~/postcss-loader!./~/sass-loader!./src/global/components/styles/tabs.scss ***!
  \***********************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ../../../../~/css-loader/lib/css-base.js */ 386)();
	// imports
	
	
	// module
	exports.push([module.id, ".tabs_root_3St {\n  width: 70%;\n  float: left; }\n\n.tabs_bigLabel_3o_ {\n  font-size: 24px; }\n\n.tabs_tabNav_3uC {\n  display: table;\n  width: 100%;\n  border-bottom: 1px solid #e4e6e8; }\n\n.tabs_tabNav_3uC ul {\n    float: right;\n    list-style: none; }\n\n.tabs_tabNav_3uC ul li {\n      display: inline-block; }\n\n.tabs_link_xbj {\n  color: #9E9E9E;\n  line-height: 1;\n  padding: 15px 10px;\n  display: inline-block;\n  margin-left: 10px;\n  background: #fff; }\n\n.tabs_link_xbj:hover {\n    background: #f4f4f4;\n    color: #333; }\n\n.tabs_tabNavActive_2Bp span {\n  margin-bottom: -1px;\n  box-shadow: 0px 2px 0 0px #ffa400 inset;\n  color: #333;\n  border-left: 1px solid #e4e6e8;\n  border-right: 1px solid #e4e6e8;\n  -webkit-transform: translateY(1px);\n          transform: translateY(1px); }\n\n.tabs_tabNavActive_2Bp span:hover {\n    color: inherit !important; }\n\n.tabs_noResult_3qG {\n  margin: 24px 0;\n  font-size: 14px; }\n", ""]);
	
	// exports
	exports.locals = {
		"root": "tabs_root_3St",
		"root": "tabs_root_3St",
		"bigLabel": "tabs_bigLabel_3o_",
		"bigLabel": "tabs_bigLabel_3o_",
		"tabNav": "tabs_tabNav_3uC",
		"tabNav": "tabs_tabNav_3uC",
		"link": "tabs_link_xbj",
		"link": "tabs_link_xbj",
		"tabNavActive": "tabs_tabNavActive_2Bp",
		"tabNavActive": "tabs_tabNavActive_2Bp",
		"noResult": "tabs_noResult_3qG",
		"noResult": "tabs_noResult_3qG"
	};

/***/ }),

/***/ 415:
/*!*******************************************!*\
  !*** ./src/global/components/Skeleton.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _withStyles = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 297);
	
	var _withStyles2 = _interopRequireDefault(_withStyles);
	
	var _skeleton = __webpack_require__(/*! ./styles/skeleton.scss */ 416);
	
	var _skeleton2 = _interopRequireDefault(_skeleton);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Skeleton = function (_React$Component) {
	    _inherits(Skeleton, _React$Component);
	
	    function Skeleton(props) {
	        _classCallCheck(this, Skeleton);
	
	        return _possibleConstructorReturn(this, (Skeleton.__proto__ || Object.getPrototypeOf(Skeleton)).call(this, props));
	    }
	
	    _createClass(Skeleton, [{
	        key: 'render',
	        value: function render() {
	            var styles = {};
	            if (this.props.w) styles['width'] = this.props.w;
	            if (this.props.h) styles['height'] = this.props.h;
	            if (this.props.ml) styles['marginLeft'] = this.props.ml;
	            if (this.props.mr) styles['marginRight'] = this.props.mr;
	            if (this.props.mb) styles['marginBottom'] = this.props.mb;
	            if (this.props.mt) styles['marginTop'] = this.props.mt;
	            if (this.props.fl) styles['float'] = this.props.fl;
	            return _react2.default.createElement(
	                'div',
	                { className: this.props.wrap ? _skeleton2.default.rootWrap : _skeleton2.default.root, style: styles },
	                this.props.children
	            );
	        }
	    }]);
	
	    return Skeleton;
	}(_react2.default.Component);
	
	exports.default = (0, _withStyles2.default)(_skeleton2.default)(Skeleton);

/***/ }),

/***/ 416:
/*!****************************************************!*\
  !*** ./src/global/components/styles/skeleton.scss ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

	
	    var content = __webpack_require__(/*! !../../../../~/css-loader?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../../~/postcss-loader!../../../../~/sass-loader!./skeleton.scss */ 417);
	    var insertCss = __webpack_require__(/*! ../../../../~/isomorphic-style-loader/lib/insertCss.js */ 387);
	
	    if (typeof content === 'string') {
	      content = [[module.id, content, '']];
	    }
	
	    module.exports = content.locals || {};
	    module.exports._getContent = function() { return content; };
	    module.exports._getCss = function() { return content.toString(); };
	    module.exports._insertCss = function(options) { return insertCss(content, options) };
	    
	    // Hot Module Replacement
	    // https://webpack.github.io/docs/hot-module-replacement
	    // Only activated in browser context
	    if (false) {
	      var removeCss = function() {};
	      module.hot.accept("!!../../../../node_modules/css-loader/index.js?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js!../../../../node_modules/sass-loader/index.js!./skeleton.scss", function() {
	        content = require("!!../../../../node_modules/css-loader/index.js?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js!../../../../node_modules/sass-loader/index.js!./skeleton.scss");
	
	        if (typeof content === 'string') {
	          content = [[module.id, content, '']];
	        }
	
	        removeCss = insertCss(content, { replace: true });
	      });
	      module.hot.dispose(function() { removeCss(); });
	    }
	  

/***/ }),

/***/ 417:
/*!***************************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!./~/postcss-loader!./~/sass-loader!./src/global/components/styles/skeleton.scss ***!
  \***************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ../../../../~/css-loader/lib/css-base.js */ 386)();
	// imports
	
	
	// module
	exports.push([module.id, ".skeleton_rootWrap_5yl {\n  width: 100%;\n  display: table; }\n\n.skeleton_root_XRi {\n  display: inline-block;\n  vertical-align: top;\n  width: 100%;\n  height: 10px;\n  float: left;\n  -webkit-animation-duration: 1s;\n          animation-duration: 1s;\n  -webkit-animation-fill-mode: forwards;\n          animation-fill-mode: forwards;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n  -webkit-animation-name: skeleton_placeHolderShimmer_1qM;\n          animation-name: skeleton_placeHolderShimmer_1qM;\n  -webkit-animation-timing-function: linear;\n          animation-timing-function: linear;\n  background: #eff0f1;\n  background: -webkit-linear-gradient(left, #eff0f1 8%, #F5F5F5 18%, #eff0f1 33%);\n  background: linear-gradient(to right, #eff0f1 8%, #F5F5F5 18%, #eff0f1 33%);\n  background-size: 800px 100px; }\n\n@-webkit-keyframes skeleton_placeHolderShimmer_1qM {\n  0% {\n    background-position: -468px 0; }\n  100% {\n    background-position: 468px 0; } }\n\n@keyframes skeleton_placeHolderShimmer_1qM {\n  0% {\n    background-position: -468px 0; }\n  100% {\n    background-position: 468px 0; } }\n", ""]);
	
	// exports
	exports.locals = {
		"rootWrap": "skeleton_rootWrap_5yl",
		"rootWrap": "skeleton_rootWrap_5yl",
		"root": "skeleton_root_XRi",
		"root": "skeleton_root_XRi",
		"placeHolderShimmer": "skeleton_placeHolderShimmer_1qM",
		"placeHolderShimmer": "skeleton_placeHolderShimmer_1qM"
	};

/***/ }),

/***/ 418:
/*!***********************************************!*\
  !*** ./src/global/components/QuestionItem.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 233);
	
	var _moment = __webpack_require__(/*! moment */ 419);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _withStyles = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 297);
	
	var _withStyles2 = _interopRequireDefault(_withStyles);
	
	var _questionItem = __webpack_require__(/*! ./styles/question-item.scss */ 536);
	
	var _questionItem2 = _interopRequireDefault(_questionItem);
	
	var _Tags = __webpack_require__(/*! ./Tags */ 538);
	
	var _Tags2 = _interopRequireDefault(_Tags);
	
	var _helper = __webpack_require__(/*! ./../helper */ 541);
	
	var _helper2 = _interopRequireDefault(_helper);
	
	var _markdownIt = __webpack_require__(/*! markdown-it */ 542);
	
	var _markdownIt2 = _interopRequireDefault(_markdownIt);
	
	var _striptags = __webpack_require__(/*! striptags */ 609);
	
	var _striptags2 = _interopRequireDefault(_striptags);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// import 
	var QuestionItem = function (_React$Component) {
	    _inherits(QuestionItem, _React$Component);
	
	    function QuestionItem(props) {
	        _classCallCheck(this, QuestionItem);
	
	        return _possibleConstructorReturn(this, (QuestionItem.__proto__ || Object.getPrototypeOf(QuestionItem)).call(this, props));
	    }
	
	    _createClass(QuestionItem, [{
	        key: 'renderTag',
	        value: function renderTag() {
	            var tags = this.props.item.tags && this.props.item.tags.map(function (tag, index) {
	                return _react2.default.createElement(
	                    _reactRouter.Link,
	                    { key: index, to: '/tagged/' + _helper2.default.removeSigh(tag), title: '' },
	                    tag
	                );
	            });
	            return _react2.default.createElement(
	                _Tags2.default,
	                null,
	                tags
	            );
	        }
	    }, {
	        key: 'getCreateText',
	        value: function getCreateText() {
	            var item = this.props.item;
	            _moment2.default.locale('vi');
	            var dateString = _moment2.default.unix(Math.round(item.create_at / 1000)).format("YYYYMMDD");
	            var create_at = (0, _moment2.default)(dateString, 'YYYYMMDD').fromNow();
	            return '\u0110\u0103ng ' + create_at;
	        }
	    }, {
	        key: 'getLink',
	        value: function getLink() {
	            var slug = this.props.item.url || _helper2.default.slugify(this.props.item.title);
	            var id = this.props.item.id;
	            return '/questions/' + id + '/' + slug;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var item = this.props.item;
	            var user = item.user;
	            var content = (0, _striptags2.default)(new _markdownIt2.default().render(item.content));
	            var preview = content.substr(0, 200);
	            if (content.length >= 200) {
	                preview += '...';
	            }
	            return _react2.default.createElement(
	                'div',
	                { className: _questionItem2.default.root },
	                _react2.default.createElement(
	                    'div',
	                    { className: _questionItem2.default.attributeWrap },
	                    _react2.default.createElement(
	                        'span',
	                        { className: _questionItem2.default.vote },
	                        _react2.default.createElement(
	                            'span',
	                            null,
	                            item.vote
	                        ),
	                        _react2.default.createElement(
	                            'span',
	                            null,
	                            'votes'
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'span',
	                        { className: _questionItem2.default.reply },
	                        _react2.default.createElement(
	                            'span',
	                            null,
	                            item.reply
	                        ),
	                        _react2.default.createElement(
	                            'span',
	                            null,
	                            'replies'
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'span',
	                        { className: _questionItem2.default.view },
	                        _react2.default.createElement(
	                            'span',
	                            null,
	                            item.view
	                        ),
	                        _react2.default.createElement(
	                            'span',
	                            null,
	                            'views'
	                        )
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: _questionItem2.default.summary },
	                    _react2.default.createElement(
	                        'h3',
	                        null,
	                        _react2.default.createElement(
	                            _reactRouter.Link,
	                            { to: this.getLink() },
	                            item.title
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'p',
	                        { className: _questionItem2.default.description },
	                        preview
	                    ),
	                    this.renderTag(),
	                    _react2.default.createElement(
	                        'div',
	                        { className: _questionItem2.default.meta },
	                        _react2.default.createElement(
	                            'span',
	                            { className: _questionItem2.default.update_at },
	                            this.getCreateText()
	                        ),
	                        ' b\u1EDFi ',
	                        _react2.default.createElement(
	                            _reactRouter.Link,
	                            { to: "/user/" + user.nickname, className: _questionItem2.default.author },
	                            user.fullname
	                        )
	                    )
	                )
	            );
	        }
	    }]);
	
	    return QuestionItem;
	}(_react2.default.Component);
	
	exports.default = (0, _withStyles2.default)(_questionItem2.default)(QuestionItem);

/***/ }),

/***/ 536:
/*!*********************************************************!*\
  !*** ./src/global/components/styles/question-item.scss ***!
  \*********************************************************/
/***/ (function(module, exports, __webpack_require__) {

	
	    var content = __webpack_require__(/*! !../../../../~/css-loader?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../../~/postcss-loader!../../../../~/sass-loader!./question-item.scss */ 537);
	    var insertCss = __webpack_require__(/*! ../../../../~/isomorphic-style-loader/lib/insertCss.js */ 387);
	
	    if (typeof content === 'string') {
	      content = [[module.id, content, '']];
	    }
	
	    module.exports = content.locals || {};
	    module.exports._getContent = function() { return content; };
	    module.exports._getCss = function() { return content.toString(); };
	    module.exports._insertCss = function(options) { return insertCss(content, options) };
	    
	    // Hot Module Replacement
	    // https://webpack.github.io/docs/hot-module-replacement
	    // Only activated in browser context
	    if (false) {
	      var removeCss = function() {};
	      module.hot.accept("!!../../../../node_modules/css-loader/index.js?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js!../../../../node_modules/sass-loader/index.js!./question-item.scss", function() {
	        content = require("!!../../../../node_modules/css-loader/index.js?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js!../../../../node_modules/sass-loader/index.js!./question-item.scss");
	
	        if (typeof content === 'string') {
	          content = [[module.id, content, '']];
	        }
	
	        removeCss = insertCss(content, { replace: true });
	      });
	      module.hot.dispose(function() { removeCss(); });
	    }
	  

/***/ }),

/***/ 537:
/*!********************************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!./~/postcss-loader!./~/sass-loader!./src/global/components/styles/question-item.scss ***!
  \********************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ../../../../~/css-loader/lib/css-base.js */ 386)();
	// imports
	
	
	// module
	exports.push([module.id, ".question-item_root_3ON {\n  position: relative;\n  border-bottom: 1px solid #e4e6e8;\n  display: table;\n  width: 100%;\n  padding: 15px 0 10px 0; }\n\n.question-item_attributeWrap_SHc {\n  width: 170px;\n  float: left; }\n\n.question-item_attributeWrap_SHc > span {\n    width: 33.3333%;\n    float: left;\n    text-align: center;\n    font-size: 12px;\n    padding: 12px 0; }\n\n.question-item_attributeWrap_SHc > span span {\n      width: 100%;\n      display: inline-block; }\n\n.question-item_vote_36a {\n  color: #6a737c; }\n\n.question-item_reply_2of {\n  background: #5fba7d;\n  color: #fff; }\n\n.question-item_view_3Jd {\n  color: #9B764F; }\n\n.question-item_summary_1Q0 {\n  width: 647px;\n  float: left;\n  padding-left: 15px;\n  display: table; }\n\n.question-item_summary_1Q0 h3 {\n    margin-bottom: 20px;\n    font-size: 16px;\n    font-weight: 400; }\n\n.question-item_meta_1CX {\n  display: inline-block;\n  float: right;\n  font-size: 11px; }\n\n.question-item_update_at_K3f {\n  color: #9199a1; }\n\n.question-item_description_2He {\n  margin-bottom: 20px; }\n", ""]);
	
	// exports
	exports.locals = {
		"root": "question-item_root_3ON",
		"root": "question-item_root_3ON",
		"attributeWrap": "question-item_attributeWrap_SHc",
		"attributeWrap": "question-item_attributeWrap_SHc",
		"vote": "question-item_vote_36a",
		"vote": "question-item_vote_36a",
		"reply": "question-item_reply_2of",
		"reply": "question-item_reply_2of",
		"view": "question-item_view_3Jd",
		"view": "question-item_view_3Jd",
		"summary": "question-item_summary_1Q0",
		"summary": "question-item_summary_1Q0",
		"meta": "question-item_meta_1CX",
		"meta": "question-item_meta_1CX",
		"update_at": "question-item_update_at_K3f",
		"updateAt": "question-item_update_at_K3f",
		"description": "question-item_description_2He",
		"description": "question-item_description_2He"
	};

/***/ }),

/***/ 538:
/*!***************************************!*\
  !*** ./src/global/components/Tags.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _withStyles = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 297);
	
	var _withStyles2 = _interopRequireDefault(_withStyles);
	
	var _snippet = __webpack_require__(/*! ./styles/snippet.scss */ 539);
	
	var _snippet2 = _interopRequireDefault(_snippet);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Tags = function (_React$Component) {
	    _inherits(Tags, _React$Component);
	
	    function Tags(props) {
	        _classCallCheck(this, Tags);
	
	        return _possibleConstructorReturn(this, (Tags.__proto__ || Object.getPrototypeOf(Tags)).call(this, props));
	    }
	
	    _createClass(Tags, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: _snippet2.default.tags },
	                this.props.children
	            );
	        }
	    }]);
	
	    return Tags;
	}(_react2.default.Component);
	
	exports.default = (0, _withStyles2.default)(_snippet2.default)(Tags);

/***/ }),

/***/ 539:
/*!***************************************************!*\
  !*** ./src/global/components/styles/snippet.scss ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

	
	    var content = __webpack_require__(/*! !../../../../~/css-loader?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../../~/postcss-loader!../../../../~/sass-loader!./snippet.scss */ 540);
	    var insertCss = __webpack_require__(/*! ../../../../~/isomorphic-style-loader/lib/insertCss.js */ 387);
	
	    if (typeof content === 'string') {
	      content = [[module.id, content, '']];
	    }
	
	    module.exports = content.locals || {};
	    module.exports._getContent = function() { return content; };
	    module.exports._getCss = function() { return content.toString(); };
	    module.exports._insertCss = function(options) { return insertCss(content, options) };
	    
	    // Hot Module Replacement
	    // https://webpack.github.io/docs/hot-module-replacement
	    // Only activated in browser context
	    if (false) {
	      var removeCss = function() {};
	      module.hot.accept("!!../../../../node_modules/css-loader/index.js?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js!../../../../node_modules/sass-loader/index.js!./snippet.scss", function() {
	        content = require("!!../../../../node_modules/css-loader/index.js?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js!../../../../node_modules/sass-loader/index.js!./snippet.scss");
	
	        if (typeof content === 'string') {
	          content = [[module.id, content, '']];
	        }
	
	        removeCss = insertCss(content, { replace: true });
	      });
	      module.hot.dispose(function() { removeCss(); });
	    }
	  

/***/ }),

/***/ 540:
/*!**************************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!./~/postcss-loader!./~/sass-loader!./src/global/components/styles/snippet.scss ***!
  \**************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ../../../../~/css-loader/lib/css-base.js */ 386)();
	// imports
	
	
	// module
	exports.push([module.id, ".snippet_tags_14y {\n  display: inline-block; }\n  .snippet_tags_14y a {\n    margin-bottom: 5px;\n    color: #39739d;\n    background-color: #E1ECF4;\n    border-color: transparent;\n    margin-right: 5px;\n    padding: 5px 8px;\n    font-size: 12px;\n    display: inline-block; }\n  .snippet_tags_14y a:hover {\n      color: #33658a;\n      background-color: #cee0ed;\n      border-color: transparent; }\n  .snippet_userBox_1S1 {\n  display: table; }\n  .snippet_userBox_1S1 img {\n    display: inline-block;\n    float: left;\n    width: 32px;\n    height: 32px;\n    border-radius: 1px; }\n  .snippet_userBoxMeta_3gm {\n  display: inline-block;\n  float: left;\n  margin-left: 8px; }\n  .snippet_userBoxName_3TD {\n  font-size: 12px; }\n  .snippet_voteBtn_1e3 {\n  width: 80px;\n  height: 85px;\n  padding-top: 8px;\n  text-align: center;\n  display: table;\n  vertical-align: middle;\n  position: relative; }\n  .snippet_voteBtn_1e3 > span {\n    width: 100%;\n    display: inline-block; }\n  .snippet_voteBtn_1e3 > span:nth-child(1) {\n      font-size: 22px; }\n  .snippet_voteBtnAct_2d7 {\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  border-top: 1px solid #e4e6e8; }\n  .snippet_voteBtnAct_2d7 span, .snippet_voteBtnAct_2d7 a {\n    width: 50%;\n    display: inline-block;\n    float: left;\n    color: #5fba7d;\n    padding: 2px 0;\n    font-size: 22px;\n    cursor: pointer;\n    opacity: 0.8; }\n  .snippet_voteBtnAct_2d7 a {\n    color: #9E9E9E; }\n  .snippet_voteBtnAct_2d7 a:hover {\n      opacity: 1; }\n", ""]);
	
	// exports
	exports.locals = {
		"tags": "snippet_tags_14y",
		"tags": "snippet_tags_14y",
		"userBox": "snippet_userBox_1S1",
		"userBox": "snippet_userBox_1S1",
		"userBoxMeta": "snippet_userBoxMeta_3gm",
		"userBoxMeta": "snippet_userBoxMeta_3gm",
		"userBoxName": "snippet_userBoxName_3TD",
		"userBoxName": "snippet_userBoxName_3TD",
		"voteBtn": "snippet_voteBtn_1e3",
		"voteBtn": "snippet_voteBtn_1e3",
		"voteBtnAct": "snippet_voteBtnAct_2d7",
		"voteBtnAct": "snippet_voteBtnAct_2d7"
	};

/***/ }),

/***/ 541:
/*!******************************!*\
  !*** ./src/global/helper.js ***!
  \******************************/
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		removeSigh: function removeSigh(str) {
			str = str.toLowerCase();
			str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
			str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
			str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
			str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
			str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
			str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
			str = str.replace(/đ/g, "d");
			return str;
		},
		slugify: function slugify(str) {
			str = str.toLowerCase();
			str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
			str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
			str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
			str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
			str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
			str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
			str = str.replace(/đ/g, "d");
			return str.toString().toLowerCase().replace(/\s+/g, '-') // Replace spaces with -
			.replace(/[^\w\-]+/g, '') // Remove all non-word chars
			.replace(/\-\-+/g, '-') // Replace multiple - with single -
			.replace(/^-+/, '') // Trim - from start of text
			.replace(/-+$/, ''); // Trim - from end of text
		}
	};

/***/ }),

/***/ 610:
/*!*********************************************!*\
  !*** ./src/global/components/Pagination.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 233);
	
	var _pagination = __webpack_require__(/*! ./styles/pagination.scss */ 611);
	
	var _pagination2 = _interopRequireDefault(_pagination);
	
	var _withStyles = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 297);
	
	var _withStyles2 = _interopRequireDefault(_withStyles);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Pagination = function (_React$Component) {
	    _inherits(Pagination, _React$Component);
	
	    function Pagination(props) {
	        _classCallCheck(this, Pagination);
	
	        return _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call(this, props));
	    }
	
	    _createClass(Pagination, [{
	        key: 'onPageClick',
	        value: function onPageClick() {
	            if (this.props.onChange) {
	                this.props.onChange();
	            }
	        }
	    }, {
	        key: 'getPageUri',
	        value: function getPageUri(page) {
	            var uri = this.props.uri;
	            if (uri.indexOf('?') !== -1) {
	                return uri + ('&page=' + page);
	            }
	            return uri + ('?page=' + page);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _props = this.props,
	                current = _props.current,
	                limit = _props.limit,
	                total = _props.total;
	
	            current = parseInt(current);
	            var num_page = Math.ceil(total / limit);
	
	            var preview = void 0;
	            var next = void 0;
	            var previewDot = void 0;
	            var nextDot = void 0;
	            var begin = void 0;
	            var to = void 0;
	            var cache = 8;
	
	            if (current - cache > 1) {
	                begin = current - cache;
	                previewDot = _react2.default.createElement(
	                    'div',
	                    { className: _pagination2.default.empty },
	                    '...'
	                );
	            } else {
	                begin = 1;
	            }
	
	            if (current + cache < num_page) {
	                to = current + cache;
	                nextDot = _react2.default.createElement(
	                    'div',
	                    { className: _pagination2.default.empty },
	                    '...'
	                );
	            } else {
	                to = num_page;
	            }
	
	            if (current > 2) {
	                preview = _react2.default.createElement(
	                    _reactRouter.Link,
	                    { to: this.getPageUri(current - 1) },
	                    'Trang tr\u01B0\u1EDBc'
	                );
	            }
	            if (current < num_page - 1) {
	                next = _react2.default.createElement(
	                    _reactRouter.Link,
	                    { to: this.getPageUri(current + 1) },
	                    'Trang sau'
	                );
	            }
	
	            var pages = [];
	            for (var i = begin; i <= to; i++) {
	                if (i !== current) {
	                    pages.push(_react2.default.createElement(
	                        _reactRouter.Link,
	                        { key: i, to: this.getPageUri(i) },
	                        i
	                    ));
	                } else {
	                    pages.push(_react2.default.createElement(
	                        'span',
	                        { key: i },
	                        i
	                    ));
	                }
	            }
	
	            return _react2.default.createElement(
	                'div',
	                { className: _pagination2.default.root },
	                preview,
	                previewDot,
	                pages,
	                nextDot,
	                next
	            );
	        }
	    }]);
	
	    return Pagination;
	}(_react2.default.Component);
	
	exports.default = (0, _withStyles2.default)(_pagination2.default)(Pagination);

/***/ }),

/***/ 611:
/*!******************************************************!*\
  !*** ./src/global/components/styles/pagination.scss ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

	
	    var content = __webpack_require__(/*! !../../../../~/css-loader?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../../~/postcss-loader!../../../../~/sass-loader!./pagination.scss */ 612);
	    var insertCss = __webpack_require__(/*! ../../../../~/isomorphic-style-loader/lib/insertCss.js */ 387);
	
	    if (typeof content === 'string') {
	      content = [[module.id, content, '']];
	    }
	
	    module.exports = content.locals || {};
	    module.exports._getContent = function() { return content; };
	    module.exports._getCss = function() { return content.toString(); };
	    module.exports._insertCss = function(options) { return insertCss(content, options) };
	    
	    // Hot Module Replacement
	    // https://webpack.github.io/docs/hot-module-replacement
	    // Only activated in browser context
	    if (false) {
	      var removeCss = function() {};
	      module.hot.accept("!!../../../../node_modules/css-loader/index.js?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js!../../../../node_modules/sass-loader/index.js!./pagination.scss", function() {
	        content = require("!!../../../../node_modules/css-loader/index.js?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../../node_modules/postcss-loader/index.js!../../../../node_modules/sass-loader/index.js!./pagination.scss");
	
	        if (typeof content === 'string') {
	          content = [[module.id, content, '']];
	        }
	
	        removeCss = insertCss(content, { replace: true });
	      });
	      module.hot.dispose(function() { removeCss(); });
	    }
	  

/***/ }),

/***/ 612:
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!./~/postcss-loader!./~/sass-loader!./src/global/components/styles/pagination.scss ***!
  \*****************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ../../../../~/css-loader/lib/css-base.js */ 386)();
	// imports
	
	
	// module
	exports.push([module.id, ".pagination_root_2a5 {\n  position: relative;\n  display: table;\n  width: 100%;\n  margin: 20px 0; }\n  .pagination_root_2a5 a, .pagination_root_2a5 span {\n    margin: 0 2px;\n    display: inline-block;\n    padding: 4px 8px;\n    font-size: 12px;\n    color: #848d95;\n    border: 1px solid #e4e6e8;\n    background-color: transparent;\n    text-decoration: none;\n    -webkit-transition: all .15s ease-in-out;\n    transition: all .15s ease-in-out; }\n  .pagination_root_2a5 span, .pagination_root_2a5 a:hover {\n    color: #FFF;\n    background-color: #ffa400;\n    border-color: #ffa400; }\n  .pagination_empty_3M9 {\n  margin: 0 2px;\n  display: inline-block;\n  padding: 4px 8px;\n  font-size: 12px;\n  color: #848d95; }\n", ""]);
	
	// exports
	exports.locals = {
		"root": "pagination_root_2a5",
		"root": "pagination_root_2a5",
		"empty": "pagination_empty_3M9",
		"empty": "pagination_empty_3M9"
	};

/***/ }),

/***/ 613:
/*!******************************************!*\
  !*** ./src/global/components/UserBox.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 233);
	
	var _withStyles = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 297);
	
	var _withStyles2 = _interopRequireDefault(_withStyles);
	
	var _snippet = __webpack_require__(/*! ./styles/snippet.scss */ 539);
	
	var _snippet2 = _interopRequireDefault(_snippet);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var UserBox = function (_React$Component) {
	    _inherits(UserBox, _React$Component);
	
	    function UserBox(props) {
	        _classCallCheck(this, UserBox);
	
	        return _possibleConstructorReturn(this, (UserBox.__proto__ || Object.getPrototypeOf(UserBox)).call(this, props));
	    }
	
	    _createClass(UserBox, [{
	        key: 'render',
	        value: function render() {
	            var user = this.props.user;
	            return _react2.default.createElement(
	                'div',
	                { className: _snippet2.default.userBox },
	                _react2.default.createElement(
	                    _reactRouter.Link,
	                    { to: "/user/" + user.nickname },
	                    _react2.default.createElement('img', { src: user.image }),
	                    _react2.default.createElement(
	                        'span',
	                        { className: _snippet2.default.userBoxMeta },
	                        _react2.default.createElement(
	                            'span',
	                            { className: _snippet2.default.userBoxName },
	                            user.fullname
	                        )
	                    )
	                )
	            );
	        }
	    }]);
	
	    return UserBox;
	}(_react2.default.Component);
	
	exports.default = UserBox;

/***/ }),

/***/ 614:
/*!*********************************************!*\
  !*** ./src/global/components/VoteButton.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _withStyles = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 297);
	
	var _withStyles2 = _interopRequireDefault(_withStyles);
	
	var _snippet = __webpack_require__(/*! ./styles/snippet.scss */ 539);
	
	var _snippet2 = _interopRequireDefault(_snippet);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var VoteButton = function (_React$Component) {
	    _inherits(VoteButton, _React$Component);
	
	    function VoteButton(props) {
	        _classCallCheck(this, VoteButton);
	
	        var _this = _possibleConstructorReturn(this, (VoteButton.__proto__ || Object.getPrototypeOf(VoteButton)).call(this, props));
	
	        _this.state = {
	            loading: false
	        };
	        return _this;
	    }
	
	    _createClass(VoteButton, [{
	        key: 'handleClick',
	        value: function handleClick(vote) {
	            if (!this.props.user && typeof showSigninPopup !== 'undefined') {
	                showSigninPopup();
	                return;
	            }
	            this.setState({
	                loading: true
	            });
	            this.props.onVote(this.props.id, vote);
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            this.setState({
	                loading: false
	            });
	        }
	    }, {
	        key: 'renderButton',
	        value: function renderButton() {
	            var _this2 = this;
	
	            var btn1 = void 0,
	                btn2 = void 0;
	            if (this.props.down_voted) {
	                btn1 = _react2.default.createElement('span', { className: 'ion-thumbsdown' });
	            } else {
	                btn1 = _react2.default.createElement('a', { onClick: function onClick() {
	                        _this2.handleClick(-1);
	                    }, className: 'ion-thumbsdown' });
	            }
	            if (this.props.voted) {
	                btn2 = _react2.default.createElement('span', { className: 'ion-thumbsup' });
	            } else {
	                btn2 = _react2.default.createElement('a', { onClick: function onClick() {
	                        _this2.handleClick(1);
	                    }, className: 'ion-thumbsup' });
	            }
	            return _react2.default.createElement(
	                'div',
	                { className: _snippet2.default.voteBtnAct },
	                btn1,
	                btn2
	            );
	        }
	    }, {
	        key: 'renderLoading',
	        value: function renderLoading() {
	            if (this.state.loading) {
	                return _react2.default.createElement('div', { className: 'loadingLayer' });
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: _snippet2.default.voteBtn },
	                _react2.default.createElement(
	                    'span',
	                    null,
	                    parseInt(this.props.vote) - parseInt(this.props.down_vote)
	                ),
	                _react2.default.createElement(
	                    'span',
	                    null,
	                    'votes'
	                ),
	                this.renderButton(),
	                this.renderLoading()
	            );
	        }
	    }]);
	
	    return VoteButton;
	}(_react2.default.Component);
	
	exports.default = (0, _withStyles2.default)(_snippet2.default)(VoteButton);
	// login
	// voted
	// downvoted

/***/ }),

/***/ 615:
/*!*********************************!*\
  !*** ./src/app/styles/app.scss ***!
  \*********************************/
/***/ (function(module, exports, __webpack_require__) {

	
	    var content = __webpack_require__(/*! !../../../~/css-loader?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../~/postcss-loader!../../../~/sass-loader!./app.scss */ 616);
	    var insertCss = __webpack_require__(/*! ../../../~/isomorphic-style-loader/lib/insertCss.js */ 387);
	
	    if (typeof content === 'string') {
	      content = [[module.id, content, '']];
	    }
	
	    module.exports = content.locals || {};
	    module.exports._getContent = function() { return content; };
	    module.exports._getCss = function() { return content.toString(); };
	    module.exports._insertCss = function(options) { return insertCss(content, options) };
	    
	    // Hot Module Replacement
	    // https://webpack.github.io/docs/hot-module-replacement
	    // Only activated in browser context
	    if (false) {
	      var removeCss = function() {};
	      module.hot.accept("!!../../../node_modules/css-loader/index.js?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./app.scss", function() {
	        content = require("!!../../../node_modules/css-loader/index.js?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./app.scss");
	
	        if (typeof content === 'string') {
	          content = [[module.id, content, '']];
	        }
	
	        removeCss = insertCss(content, { replace: true });
	      });
	      module.hot.dispose(function() { removeCss(); });
	    }
	  

/***/ }),

/***/ 616:
/*!********************************************************************************************************************************************************!*\
  !*** ./~/css-loader?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!./~/postcss-loader!./~/sass-loader!./src/app/styles/app.scss ***!
  \********************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ../../../~/css-loader/lib/css-base.js */ 386)();
	// imports
	
	
	// module
	exports.push([module.id, "/*! normalize.css v4.2.0 | MIT License | github.com/necolas/normalize.css */\n/**\r\n * 1. Change the default font family in all browsers (opinionated).\r\n * 2. Correct the line height in all browsers.\r\n * 3. Prevent adjustments of font size after orientation changes in IE and iOS.\r\n */\n/* Document\r\n     ========================================================================== */\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  line-height: 1.15;\n  /* 2 */\n  -ms-text-size-adjust: 100%;\n  /* 3 */\n  -webkit-text-size-adjust: 100%;\n  /* 3 */ }\n/* Sections\r\n     ========================================================================== */\n/**\r\n * Remove the margin in all browsers (opinionated).\r\n */\nbody {\n  margin: 0; }\n/**\r\n * Add the correct display in IE 9-.\r\n */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block; }\n/**\r\n * Correct the font size and margin on `h1` elements within `section` and\r\n * `article` contexts in Chrome, Firefox, and Safari.\r\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n/* Grouping content\r\n     ========================================================================== */\n/**\r\n * Add the correct display in IE 9-.\r\n * 1. Add the correct display in IE.\r\n */\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block; }\n/**\r\n * Add the correct margin in IE 8.\r\n */\nfigure {\n  margin: 1em 40px; }\n/**\r\n * 1. Add the correct box sizing in Firefox.\r\n * 2. Show the overflow in Edge and IE.\r\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */ }\n/**\r\n * 1. Correct the inheritance and scaling of font size in all browsers.\r\n * 2. Correct the odd `em` font sizing in all browsers.\r\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n/* Text-level semantics\r\n     ========================================================================== */\n/**\r\n * 1. Remove the gray background on active links in IE 10.\r\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\r\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */ }\n/**\r\n * Remove the outline on focused links when they are also active or hovered\r\n * in all browsers (opinionated).\r\n */\na:active,\na:hover {\n  outline-width: 0; }\n/**\r\n * 1. Remove the bottom border in Firefox 39-.\r\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\r\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */ }\n/**\r\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\r\n */\nb,\nstrong {\n  font-weight: inherit; }\n/**\r\n * Add the correct font weight in Chrome, Edge, and Safari.\r\n */\nb,\nstrong {\n  font-weight: bolder; }\n/**\r\n * 1. Correct the inheritance and scaling of font size in all browsers.\r\n * 2. Correct the odd `em` font sizing in all browsers.\r\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n/**\r\n * Add the correct font style in Android 4.3-.\r\n */\ndfn {\n  font-style: italic; }\n/**\r\n * Add the correct background and color in IE 9-.\r\n */\nmark {\n  background-color: #ff0;\n  color: #000; }\n/**\r\n * Add the correct font size in all browsers.\r\n */\nsmall {\n  font-size: 80%; }\n/**\r\n * Prevent `sub` and `sup` elements from affecting the line height in\r\n * all browsers.\r\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\nsub {\n  bottom: -0.25em; }\nsup {\n  top: -0.5em; }\n/* Embedded content\r\n     ========================================================================== */\n/**\r\n * Add the correct display in IE 9-.\r\n */\naudio,\nvideo {\n  display: inline-block; }\n/**\r\n * Add the correct display in iOS 4-7.\r\n */\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n/**\r\n * Remove the border on images inside links in IE 10-.\r\n */\nimg {\n  border-style: none; }\n/**\r\n * Hide the overflow in IE.\r\n */\nsvg:not(:root) {\n  overflow: hidden; }\n/* Forms\r\n     ========================================================================== */\n/**\r\n * 1. Change the font styles in all browsers (opinionated).\r\n * 2. Remove the margin in Firefox and Safari.\r\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */ }\n/**\r\n * Show the overflow in IE.\r\n * 1. Show the overflow in Edge.\r\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible; }\n/**\r\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\r\n * 1. Remove the inheritance of text transform in Firefox.\r\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none; }\n/**\r\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\r\n *    controls in Android 4.\r\n * 2. Correct the inability to style clickable types in iOS and Safari.\r\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */ }\n/**\r\n * Remove the inner border and padding in Firefox.\r\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0; }\n/**\r\n * Restore the focus styles unset by the previous rule.\r\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText; }\n/**\r\n * Change the border, margin, and padding in all browsers (opinionated).\r\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em; }\n/**\r\n * 1. Correct the text wrapping in Edge and IE.\r\n * 2. Correct the color inheritance from `fieldset` elements in IE.\r\n * 3. Remove the padding so developers are not caught out when they zero out\r\n *    `fieldset` elements in all browsers.\r\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */ }\n/**\r\n * 1. Add the correct display in IE 9-.\r\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\r\n */\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */ }\n/**\r\n * Remove the default vertical scrollbar in IE.\r\n */\ntextarea {\n  overflow: auto; }\n/**\r\n * 1. Add the correct box sizing in IE 10-.\r\n * 2. Remove the padding in IE 10-.\r\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */ }\n/**\r\n * Correct the cursor style of increment and decrement buttons in Chrome.\r\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n/**\r\n * 1. Correct the odd appearance in Chrome and Safari.\r\n * 2. Correct the outline style in Safari.\r\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */ }\n/**\r\n * Remove the inner padding and cancel buttons in Chrome and Safari on OS X.\r\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n/**\r\n * 1. Correct the inability to style clickable types in iOS and Safari.\r\n * 2. Change font properties to `inherit` in Safari.\r\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */ }\n/* Interactive\r\n     ========================================================================== */\n/*\r\n * Add the correct display in IE 9-.\r\n * 1. Add the correct display in Edge, IE, and Firefox.\r\n */\ndetails,\nmenu {\n  display: block; }\n/*\r\n * Add the correct display in all browsers.\r\n */\nsummary {\n  display: list-item; }\n/* Scripting\r\n     ========================================================================== */\n/**\r\n * Add the correct display in IE 9-.\r\n */\ncanvas {\n  display: inline-block; }\n/**\r\n * Add the correct display in IE.\r\n */\ntemplate {\n  display: none; }\n/* Hidden\r\n     ========================================================================== */\n/**\r\n * Add the correct display in IE 10-.\r\n */\n[hidden] {\n  display: none; }\n.FormInput.-hasError .FormError {\n  font-weight: 500;\n  margin: 5px 0;\n  color: #F44336; }\n.markdown-render p {\n  margin: 2px 0 6px 0; }\n.markdown-render pre {\n  margin-bottom: 1em;\n  padding: 5px;\n  width: auto;\n  max-height: 600px;\n  overflow: auto;\n  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, sans-serif;\n  font-size: 13px;\n  background-color: #f7f3d1; }\n.markdown-render pre code {\n    border: 0px;\n    border-radius: 0px;\n    padding: 0; }\n.markdown-render h1,\n.markdown-render h2,\n.markdown-render h3,\n.markdown-render h4,\n.markdown-render h5,\n.markdown-render h6 {\n  word-wrap: break-word; }\n.markdown-render ul p:last-of-type,\n.markdown-render ul p:last-of-type,\n.markdown-render ol p:last-of-type,\n.markdown-render ol p:last-of-type {\n  margin-bottom: 0; }\n.markdown-render li > ul,\n.markdown-render li > ul,\n.markdown-render li > ol,\n.markdown-render li > ol {\n  padding-top: .5em; }\n.markdown-render pre {\n  word-wrap: normal; }\n.markdown-render code {\n  font-size: 13px;\n  padding: 0 5px;\n  color: #2f2f2f;\n  background-color: #f7f3d1;\n  border: 1px solid #d8d4b1;\n  border-radius: 2px; }\n.markdown-render hr {\n  background-color: #d6d9dc;\n  color: #d6d9dc; }\n.markdown-render li {\n  word-wrap: break-word; }\n.markdown-render h1,\n.markdown-render h1,\n.markdown-render h2,\n.markdown-render h2,\n.markdown-render h3,\n.markdown-render h3,\n.markdown-render h4,\n.markdown-render h4,\n.markdown-render h5,\n.markdown-render h5,\n.markdown-render h6,\n.markdown-render h6 {\n  font-weight: bold !important; }\n.markdown-render h1 code,\n.markdown-render h1 code,\n.markdown-render h2 code,\n.markdown-render h2 code,\n.markdown-render h3 code,\n.markdown-render h3 code,\n.markdown-render h4 code,\n.markdown-render h4 code,\n.markdown-render h5 code,\n.markdown-render h5 code,\n.markdown-render h6 code,\n.markdown-render h6 code {\n  margin-bottom: .5em; }\n.markdown-render h1,\n.markdown-render h1,\n.markdown-render h1 code,\n.markdown-render h1 code {\n  font-size: 21px; }\n.markdown-render h2,\n.markdown-render h2,\n.markdown-render h2 code,\n.markdown-render h2 code {\n  font-size: 19px; }\n.markdown-render h3,\n.markdown-render h3,\n.markdown-render h3 code,\n.markdown-render h3 code {\n  font-size: 17px; }\n.markdown-render h4,\n.markdown-render h4,\n.markdown-render h4 code,\n.markdown-render h4 code {\n  font-size: 15px; }\n.markdown-render p img,\n.markdown-render p img,\n.markdown-render li img,\n.markdown-render li img,\n.markdown-render blockquote img,\n.markdown-render blockquote img {\n  margin-bottom: 0; }\n.markdown-render ul li,\n.markdown-render ul li,\n.markdown-render ol li,\n.markdown-render ol li {\n  margin-bottom: .5em; }\n.markdown-render ul li:last-child,\n.markdown-render ul li:last-child,\n.markdown-render ol li:last-child,\n.markdown-render ol li:last-child {\n  margin-bottom: 0; }\n.markdown-render h1,\n.markdown-render h2,\n.markdown-render h3,\n.markdown-render h4,\n.markdown-render h5,\n.markdown-render h6 {\n  word-wrap: break-word; }\nbody {\n  color: #333;\n  font-family: 'Roboto', sans-serif;\n  font-size: 13px; }\n* {\n  margin: 0;\n  padding: 0;\n  outline: none; }\n*, ::after, ::before {\n  box-sizing: border-box; }\n.container {\n  width: 1170px;\n  margin: auto; }\na {\n  color: #07C;\n  text-decoration: none;\n  cursor: pointer; }\na:hover, a:active {\n    color: #3af;\n    text-decoration: none; }\n.app_mainContent_29i {\n  padding-top: 80px; }\n.btn {\n  text-decoration: none;\n  border: 0px;\n  padding: 8px 15px;\n  background: #0095ff;\n  color: #fff;\n  display: inline-block;\n  cursor: pointer; }\n.btn:hover, .btn.active, .btn.focus {\n    color: #fff;\n    text-decoration: none;\n    background: #048bea; }\n.btn.loading {\n    background: -webkit-linear-gradient(315deg, #0095ff 0%, #0095ff 25%, #0f83d6 25%, #0f83d6 50%, #0095ff 50%, #0095ff 75%, #0f83d6 75%);\n    background: linear-gradient(135deg, #0095ff 0%, #0095ff 25%, #0f83d6 25%, #0f83d6 50%, #0095ff 50%, #0095ff 75%, #0f83d6 75%);\n    background-position: 122px center;\n    background-size: 30px 30px;\n    -webkit-animation-duration: 10s;\n            animation-duration: 10s;\n    -webkit-animation-fill-mode: forwards;\n            animation-fill-mode: forwards;\n    -webkit-animation-iteration-count: infinite;\n            animation-iteration-count: infinite;\n    -webkit-animation-name: placeHolderShimmer;\n            animation-name: placeHolderShimmer;\n    -webkit-animation-timing-function: linear;\n            animation-timing-function: linear;\n    opacity: 0.9; }\ndiv:after, div:before {\n  display: table;\n  content: \" \"; }\n.loadingLayer {\n  background: -webkit-linear-gradient(315deg, #ccc 0%, #ccc 25%, #fff 25%, #fff 50%, #ccc 50%, #ccc 75%, #fff 75%) !important;\n  background: linear-gradient(135deg, #ccc 0%, #ccc 25%, #fff 25%, #fff 50%, #ccc 50%, #ccc 75%, #fff 75%) !important;\n  background-position: 122px center !important;\n  background-size: 50px 50px !important;\n  -webkit-animation-duration: 10s !important;\n          animation-duration: 10s !important;\n  -webkit-animation-fill-mode: forwards !important;\n          animation-fill-mode: forwards !important;\n  -webkit-animation-iteration-count: infinite !important;\n          animation-iteration-count: infinite !important;\n  -webkit-animation-name: placeHolderShimmer !important;\n          animation-name: placeHolderShimmer !important;\n  -webkit-animation-timing-function: linear !important;\n          animation-timing-function: linear !important;\n  opacity: 0.9 !important;\n  position: absolute !important;\n  top: 0 !important;\n  left: 0 !important;\n  width: 100% !important;\n  height: 100% !important;\n  z-index: 1 !important;\n  opacity: 0.2 !important;\n  cursor: not-allowed !important; }\n@-webkit-keyframes placeHolderShimmer {\n  0% {\n    background-position: -468px 0; }\n  100% {\n    background-position: 468px 0; } }\n@keyframes placeHolderShimmer {\n  0% {\n    background-position: -468px 0; }\n  100% {\n    background-position: 468px 0; } }\n.text-left {\n  text-align: left; }\n.text-center {\n  text-align: center; }\n.text-right {\n  text-align: right; }\n", ""]);
	
	// exports
	exports.locals = {
		"mainContent": "app_mainContent_29i",
		"mainContent": "app_mainContent_29i"
	};

/***/ }),

/***/ 617:
/*!***************************!*\
  !*** ./src/app/action.js ***!
  \***************************/
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var loginWithToken = exports.loginWithToken = function loginWithToken(token, type) {
	    var API_LOGIN = false;
	    if (type === 'google') {
	        API_LOGIN = 'auth/login-google';
	    }
	    if (type === 'facebook') {
	        API_LOGIN = 'auth/login-facebook';
	    }
	    if (API_LOGIN) return function (dispatch) {
	        $.ajax({
	            url: config.API_URL + API_LOGIN,
	            data: {
	                token: token
	            },
	            type: 'POST'
	        }).done(function (response) {
	            dispatch({
	                type: 'LOGIN_SUCCESS',
	                user: response.me,
	                token: response.token
	            });
	        }).fail(function (error) {});
	    };
	};
	
	var fetchInfo = exports.fetchInfo = function fetchInfo(token) {
	    if (token && token.expire > new Date().getTime()) {
	        return function (dispatch) {
	            $.ajax({
	                url: config.API_URL + 'customer/me',
	                data: {
	                    token: token.value
	                },
	                type: 'POST'
	            }).done(function (response) {
	                dispatch({
	                    type: 'FETCH_SUCCESS',
	                    token: token,
	                    user: response
	                });
	            }).fail(function (error) {
	                dispatch({
	                    type: 'FETCH_SUCCESS',
	                    user: null
	                });
	            });
	        };
	    } else {
	        return {
	            type: 'FETCH_SUCCESS',
	            user: null
	        };
	    }
	};
	
	var logout = exports.logout = function logout() {
	    return {
	        type: 'LOGOUT'
	    };
	};

/***/ }),

/***/ 618:
/*!*************************************************!*\
  !*** ./src/app/containers/NotFoundContainer.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 182);
	
	var _redux = __webpack_require__(/*! redux */ 191);
	
	var _NotFound = __webpack_require__(/*! ../components/NotFound */ 619);
	
	var _NotFound2 = _interopRequireDefault(_NotFound);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state) {
	    return {};
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return {
	        actions: (0, _redux.bindActionCreators)({}, dispatch)
	    };
	};
	
	var NotFoundContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_NotFound2.default);
	exports.default = NotFoundContainer;

/***/ }),

/***/ 619:
/*!****************************************!*\
  !*** ./src/app/components/NotFound.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _withStyles = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 297);
	
	var _withStyles2 = _interopRequireDefault(_withStyles);
	
	var _app = __webpack_require__(/*! ./../styles/app.scss */ 615);
	
	var _app2 = _interopRequireDefault(_app);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var NotFound = function (_React$Component) {
		_inherits(NotFound, _React$Component);
	
		function NotFound(props) {
			_classCallCheck(this, NotFound);
	
			return _possibleConstructorReturn(this, (NotFound.__proto__ || Object.getPrototypeOf(NotFound)).call(this, props));
		}
	
		_createClass(NotFound, [{
			key: 'componentDidMount',
			value: function componentDidMount() {}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{ className: _app2.default.root404 },
					'Notfound'
				);
			}
		}]);
	
		return NotFound;
	}(_react2.default.Component);
	
	exports.default = (0, _withStyles2.default)(_app2.default)(NotFound);

/***/ }),

/***/ 620:
/*!***************************!*\
  !*** ./src/home/index.js ***!
  \***************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 182);
	
	var _redux = __webpack_require__(/*! redux */ 191);
	
	var _action = __webpack_require__(/*! ./action */ 621);
	
	var _Home2 = __webpack_require__(/*! ./components/Home */ 622);
	
	var _Home3 = _interopRequireDefault(_Home2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state, ownProps) {
	    return _extends({}, state.home, {
	        query: ownProps.location.query
	    });
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return {
	        actions: (0, _redux.bindActionCreators)({
	            getTabList: _action.getTabList,
	            setCurentTab: _action.setCurentTab
	        }, dispatch)
	    };
	};
	
	var Home = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Home3.default);
	exports.default = Home;

/***/ }),

/***/ 621:
/*!****************************!*\
  !*** ./src/home/action.js ***!
  \****************************/
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var getTabList = exports.getTabList = function getTabList() {
		var q = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
		var sort = arguments[1];
		var page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
	
		return function (dispatch) {
			dispatch({
				data: {
					data: [],
					total: 0,
					limit: 20,
					current: 1,
					loading: true
				},
				type: 'GET_LIST_SUCCESS'
			});
			$.ajax({
				url: config.API_URL + 'qna/search',
				data: {
					q: q,
					sort: sort,
					page: page
				}
			}).done(function (json) {
				dispatch({
					data: _extends({}, json, {
						loading: false,
						current: page
					}),
					type: 'GET_LIST_SUCCESS'
				});
			}).fail(function (error) {});
		};
	};
	var setCurentTab = exports.setCurentTab = function setCurentTab() {
		var q = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
		var query = arguments[1];
		var page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
	
		return function (dispatch) {
			dispatch(getTabList(q, query, page));
			dispatch({
				q: q,
				query: query,
				type: 'SET_CURRENT_TAB'
			});
		};
	};

/***/ }),

/***/ 622:
/*!*************************************!*\
  !*** ./src/home/components/Home.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _global = __webpack_require__(/*! ./../../global */ 411);
	
	var _Sidebar = __webpack_require__(/*! ./Sidebar */ 623);
	
	var _Sidebar2 = _interopRequireDefault(_Sidebar);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Home = function (_React$Component) {
		_inherits(Home, _React$Component);
	
		function Home(props) {
			_classCallCheck(this, Home);
	
			return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));
		}
	
		_createClass(Home, [{
			key: 'handleTab',
			value: function handleTab() {
				var query = this.props.query;
				var tab = typeof query.tab !== 'undefined' ? query.tab : 'newest';
				var page = typeof query.page !== 'undefined' ? parseInt(query.page) : 1;
				return _react2.default.createElement(_global.Tabs, {
					base_url: '/',
					q: '',
					tab: tab,
					page: page,
					tabs: this.props.tabs,
					list: this.props.list,
					getTabList: this.props.actions.getTabList,
					setCurentTab: this.props.actions.setCurentTab });
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{ className: 'root' },
					_react2.default.createElement(
						'div',
						{ className: 'container' },
						this.handleTab(),
						_react2.default.createElement(_Sidebar2.default, null)
					)
				);
			}
		}]);
	
		return Home;
	}(_react2.default.Component);
	
	exports.default = Home;

/***/ }),

/***/ 623:
/*!****************************************!*\
  !*** ./src/home/components/Sidebar.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 233);
	
	var _withStyles = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 297);
	
	var _withStyles2 = _interopRequireDefault(_withStyles);
	
	var _sidebar = __webpack_require__(/*! ./../styles/sidebar.scss */ 624);
	
	var _sidebar2 = _interopRequireDefault(_sidebar);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Sidebar = function (_React$Component) {
	    _inherits(Sidebar, _React$Component);
	
	    function Sidebar(props) {
	        _classCallCheck(this, Sidebar);
	
	        return _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).call(this, props));
	    }
	
	    _createClass(Sidebar, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: _sidebar2.default.root },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'text-right' },
	                    _react2.default.createElement(
	                        _reactRouter.Link,
	                        { className: 'btn', to: '/questions/add' },
	                        'H\u1ECFi ngay!'
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: _sidebar2.default.rootDiscussFeed },
	                    _react2.default.createElement(
	                        'h3',
	                        null,
	                        'Ph\u1EA3n h\u1ED3i m\u1EDBi nh\u1EA5t'
	                    )
	                )
	            );
	        }
	    }]);
	
	    return Sidebar;
	}(_react2.default.Component);
	
	exports.default = (0, _withStyles2.default)(_sidebar2.default)(Sidebar);

/***/ }),

/***/ 624:
/*!**************************************!*\
  !*** ./src/home/styles/sidebar.scss ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

	
	    var content = __webpack_require__(/*! !../../../~/css-loader?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../~/postcss-loader!../../../~/sass-loader!./sidebar.scss */ 625);
	    var insertCss = __webpack_require__(/*! ../../../~/isomorphic-style-loader/lib/insertCss.js */ 387);
	
	    if (typeof content === 'string') {
	      content = [[module.id, content, '']];
	    }
	
	    module.exports = content.locals || {};
	    module.exports._getContent = function() { return content; };
	    module.exports._getCss = function() { return content.toString(); };
	    module.exports._insertCss = function(options) { return insertCss(content, options) };
	    
	    // Hot Module Replacement
	    // https://webpack.github.io/docs/hot-module-replacement
	    // Only activated in browser context
	    if (false) {
	      var removeCss = function() {};
	      module.hot.accept("!!../../../node_modules/css-loader/index.js?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./sidebar.scss", function() {
	        content = require("!!../../../node_modules/css-loader/index.js?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./sidebar.scss");
	
	        if (typeof content === 'string') {
	          content = [[module.id, content, '']];
	        }
	
	        removeCss = insertCss(content, { replace: true });
	      });
	      module.hot.dispose(function() { removeCss(); });
	    }
	  

/***/ }),

/***/ 625:
/*!*************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!./~/postcss-loader!./~/sass-loader!./src/home/styles/sidebar.scss ***!
  \*************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ../../../~/css-loader/lib/css-base.js */ 386)();
	// imports
	
	
	// module
	exports.push([module.id, ".sidebar_root_3jx {\n  width: calc(30% - 20px);\n  margin-left: 20px;\n  float: right; }\n", ""]);
	
	// exports
	exports.locals = {
		"root": "sidebar_root_3jx",
		"root": "sidebar_root_3jx"
	};

/***/ }),

/***/ 626:
/*!*******************************!*\
  !*** ./src/question/index.js ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 233);
	
	var _containers = __webpack_require__(/*! question/containers */ 627);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// const params = {
	//     id: string({}),
	//     slug: string({})
	// };
	
	exports.default = _react2.default.createElement(
		_reactRouter.Route,
		null,
		_react2.default.createElement(_reactRouter.Route, { path: 'search', component: _containers.SearchContainer }),
		_react2.default.createElement(_reactRouter.Route, { path: '/tagged/:tag', component: _containers.SearchContainer }),
		_react2.default.createElement(_reactRouter.Route, { path: 'questions/:id/:slug', component: _containers.DetailContainer }),
		_react2.default.createElement(_reactRouter.Route, { path: 'questions/delete', component: _containers.AddContainer }),
		_react2.default.createElement(_reactRouter.Route, { path: 'questions/update', component: _containers.AddContainer }),
		_react2.default.createElement(_reactRouter.Route, { path: 'questions/add', component: _containers.AddContainer })
	);

/***/ }),

/***/ 627:
/*!******************************************!*\
  !*** ./src/question/containers/index.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _AddContainer = __webpack_require__(/*! ./AddContainer */ 628);
	
	Object.defineProperty(exports, 'AddContainer', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_AddContainer).default;
	  }
	});
	
	var _DetailContainer = __webpack_require__(/*! ./DetailContainer */ 648);
	
	Object.defineProperty(exports, 'DetailContainer', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_DetailContainer).default;
	  }
	});
	
	var _SearchContainer = __webpack_require__(/*! ./SearchContainer */ 668);
	
	Object.defineProperty(exports, 'SearchContainer', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_SearchContainer).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 628:
/*!*************************************************!*\
  !*** ./src/question/containers/AddContainer.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 182);
	
	var _redux = __webpack_require__(/*! redux */ 191);
	
	var _AddQuestion = __webpack_require__(/*! ../components/AddQuestion */ 629);
	
	var _AddQuestion2 = _interopRequireDefault(_AddQuestion);
	
	var _action = __webpack_require__(/*! ../action */ 647);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state, ownProps) {
	    return {
	        form: state.question.add.form
	    };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return {
	        actions: (0, _redux.bindActionCreators)({
	            create: _action.create
	        }, dispatch)
	    };
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_AddQuestion2.default);

/***/ }),

/***/ 629:
/*!************************************************!*\
  !*** ./src/question/components/AddQuestion.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactForm = __webpack_require__(/*! react-form */ 630);
	
	var _withStyles = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 297);
	
	var _withStyles2 = _interopRequireDefault(_withStyles);
	
	var _addForm = __webpack_require__(/*! ../styles/add-form.scss */ 645);
	
	var _addForm2 = _interopRequireDefault(_addForm);
	
	var _markdownIt = __webpack_require__(/*! markdown-it */ 542);
	
	var _markdownIt2 = _interopRequireDefault(_markdownIt);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var AddQuestion = function (_React$Component) {
	    _inherits(AddQuestion, _React$Component);
	
	    function AddQuestion(props) {
	        _classCallCheck(this, AddQuestion);
	
	        var _this = _possibleConstructorReturn(this, (AddQuestion.__proto__ || Object.getPrototypeOf(AddQuestion)).call(this, props));
	
	        _this.handleValidate = _this.handleValidate.bind(_this);
	        _this.handleSubmit = _this.handleSubmit.bind(_this);
	        _this.state = {
	            markdown_code: _this.props.form.data.content,
	            disable_form: false,
	            loading_form: false
	        };
	        return _this;
	    }
	
	    _createClass(AddQuestion, [{
	        key: '_onChange',
	        value: function _onChange() {}
	    }, {
	        key: 'validTitle',
	        value: function validTitle(value) {
	            if (!value || value.trim().length === 0) {
	                return 'Hãy nhập tiêu đề';
	            }
	            value = value.trim();
	            if (value.length < 10 || value.length > 80) {
	                return 'Tiêu đề từ 10 đến 80 ký tự';
	            }
	        }
	    }, {
	        key: 'validContent',
	        value: function validContent(value) {
	            console.log(value);
	            if (!value || value.length === 0) {
	                return 'Hãy nhập nội dung';
	            }
	            if (value.length < 60) {
	                return 'Nội dung dài hơn 80 ký tự';
	            }
	        }
	    }, {
	        key: 'handleValidate',
	        value: function handleValidate(values) {
	            var title = values.title,
	                content = values.content,
	                tag = values.tag;
	
	            return {
	                title: this.validTitle(title),
	                content: this.validContent(content)
	            };
	        }
	    }, {
	        key: 'handleValidateFail',
	        value: function handleValidateFail() {
	            alert('fail');
	        }
	    }, {
	        key: 'renderMarkDown',
	        value: function renderMarkDown() {
	            return {
	                '__html': new _markdownIt2.default().render(this.state.markdown_code)
	            };
	        }
	    }, {
	        key: 'handleSubmit',
	        value: function handleSubmit(values) {
	
	            this.setState({
	                disable_form: true,
	                loading_form: true
	            });
	
	            this.props.actions.create(_extends({}, values));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            return _react2.default.createElement(
	                'div',
	                { className: _addForm2.default.root },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'container' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: _addForm2.default.form },
	                        _react2.default.createElement(
	                            _reactForm.Form,
	                            {
	                                onSubmit: this.handleSubmit,
	                                validate: this.handleValidate,
	                                onValidationFail: this.handleValidateFail },
	                            function (_ref) {
	                                var values = _ref.values,
	                                    submitForm = _ref.submitForm,
	                                    addValue = _ref.addValue,
	                                    removeValue = _ref.removeValue,
	                                    getError = _ref.getError;
	
	                                return _react2.default.createElement(
	                                    'form',
	                                    { onSubmit: submitForm },
	                                    _react2.default.createElement(
	                                        'div',
	                                        { className: _addForm2.default.formGroup },
	                                        _react2.default.createElement(
	                                            'label',
	                                            null,
	                                            'B\u1EA1n mu\u1ED1n h\u1ECFi g\xEC ?'
	                                        ),
	                                        _react2.default.createElement(_reactForm.Text, { disabled: _this2.state.disable_form, field: 'title', placeholder: 'Nh\u1EADp n\u1ED9i dung ng\u1EAFn g\u1ECDn c\u1EE7a c\xE2u h\u1ECFi ?' })
	                                    ),
	                                    _react2.default.createElement(
	                                        'div',
	                                        { className: _addForm2.default.formGroup },
	                                        _react2.default.createElement(
	                                            'label',
	                                            null,
	                                            'N\u1ED9i dung chi ti\u1EBFt'
	                                        ),
	                                        _react2.default.createElement(_reactForm.Textarea, { disabled: _this2.state.disable_form, field: 'content', placeholder: 'Nh\u1EADp n\u1ED9i dung chi ti\u1EBFt ?', onChange: function onChange(val, _onChange2) {
	                                                _this2.setState({ markdown_code: val.currentTarget.value });_onChange2();
	                                            } }),
	                                        _react2.default.createElement(
	                                            'div',
	                                            { className: _addForm2.default.preview, style: { display: _this2.state.markdown_code.length > 0 ? 'block' : 'nones' } },
	                                            _react2.default.createElement('div', { className: 'markdown-render', dangerouslySetInnerHTML: _this2.renderMarkDown() })
	                                        )
	                                    ),
	                                    _react2.default.createElement(
	                                        'div',
	                                        { className: _addForm2.default.formGroup },
	                                        _react2.default.createElement(
	                                            'label',
	                                            null,
	                                            'Th\xEAm tag cho c\xE2u h\u1ECFi \u0111\u1EC3 d\u1EC5 d\xE0ng t\xECm ki\u1EBFm'
	                                        ),
	                                        _react2.default.createElement(_reactForm.Text, { disabled: _this2.state.disable_form, field: 'tags', placeholder: 'Nh\u1EADp c\xE1c tag c\xE1ch nhau b\u1EDFi d\u1EA5u ","' })
	                                    ),
	                                    _react2.default.createElement(
	                                        'div',
	                                        { className: _addForm2.default.formGroup },
	                                        _react2.default.createElement(
	                                            'button',
	                                            { disabled: _this2.state.disable_form, className: _this2.state.loading_form ? "btn loading" : "btn", type: 'submit' },
	                                            'G\u1EEDi c\xE2u h\u1ECFi'
	                                        )
	                                    )
	                                );
	                            }
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: _addForm2.default.tip },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'markdown-render' },
	                            _react2.default.createElement('br', null),
	                            _react2.default.createElement(
	                                'h4',
	                                null,
	                                'Ti\xEAu \u0111\u1EC1 r\xF5 r\xE0ng'
	                            ),
	                            _react2.default.createElement(
	                                'p',
	                                null,
	                                '\u0110\xF4i khi sau khi ngh\u0129 k\u1EF9 h\u01A1n v\u1EC1 c\xE2u h\u1ECFi, b\u1EA1n s\u1EBD t\xECm ra c\xE2u tr\u1EA3 l\u1EDDi :)'
	                            ),
	                            _react2.default.createElement('br', null),
	                            _react2.default.createElement('br', null),
	                            _react2.default.createElement(
	                                'h4',
	                                null,
	                                'N\u1ED9i dung \u0111\u01B0\u1EE3c vi\u1EBFt b\u1EB1ng ',
	                                _react2.default.createElement(
	                                    'a',
	                                    { target: '_blank', href: '#' },
	                                    'Markdown'
	                                )
	                            ),
	                            _react2.default.createElement(
	                                'p',
	                                null,
	                                'C\xE1c code hay \u0111\u01B0\u1EE3c d\xF9ng l\xE0 :'
	                            ),
	                            _react2.default.createElement(
	                                'ul',
	                                null,
	                                _react2.default.createElement(
	                                    'li',
	                                    null,
	                                    _react2.default.createElement(
	                                        'code',
	                                        null,
	                                        '#'
	                                    ),
	                                    ' cho H1'
	                                ),
	                                _react2.default.createElement(
	                                    'li',
	                                    null,
	                                    _react2.default.createElement(
	                                        'code',
	                                        null,
	                                        '```'
	                                    ),
	                                    ' cho code'
	                                ),
	                                _react2.default.createElement(
	                                    'li',
	                                    null,
	                                    _react2.default.createElement(
	                                        'code',
	                                        null,
	                                        '`'
	                                    ),
	                                    ' \u0111\u1EC3 b\xF4i \u0111\u1EADm'
	                                )
	                            )
	                        )
	                    )
	                )
	            );
	        }
	    }]);
	
	    return AddQuestion;
	}(_react2.default.Component);
	
	exports.default = (0, _withStyles2.default)(_addForm2.default)(AddQuestion);

/***/ }),

/***/ 645:
/*!*******************************************!*\
  !*** ./src/question/styles/add-form.scss ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

	
	    var content = __webpack_require__(/*! !../../../~/css-loader?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../~/postcss-loader!../../../~/sass-loader!./add-form.scss */ 646);
	    var insertCss = __webpack_require__(/*! ../../../~/isomorphic-style-loader/lib/insertCss.js */ 387);
	
	    if (typeof content === 'string') {
	      content = [[module.id, content, '']];
	    }
	
	    module.exports = content.locals || {};
	    module.exports._getContent = function() { return content; };
	    module.exports._getCss = function() { return content.toString(); };
	    module.exports._insertCss = function(options) { return insertCss(content, options) };
	    
	    // Hot Module Replacement
	    // https://webpack.github.io/docs/hot-module-replacement
	    // Only activated in browser context
	    if (false) {
	      var removeCss = function() {};
	      module.hot.accept("!!../../../node_modules/css-loader/index.js?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./add-form.scss", function() {
	        content = require("!!../../../node_modules/css-loader/index.js?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./add-form.scss");
	
	        if (typeof content === 'string') {
	          content = [[module.id, content, '']];
	        }
	
	        removeCss = insertCss(content, { replace: true });
	      });
	      module.hot.dispose(function() { removeCss(); });
	    }
	  

/***/ }),

/***/ 646:
/*!******************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!./~/postcss-loader!./~/sass-loader!./src/question/styles/add-form.scss ***!
  \******************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ../../../~/css-loader/lib/css-base.js */ 386)();
	// imports
	
	
	// module
	exports.push([module.id, ".add-form_form_1JB {\n  width: 70%;\n  float: left; }\n\n.add-form_tip_2rW {\n  width: calc(30% - 20px);\n  float: right; }\n\n.add-form_formGroup_OS2 {\n  display: inline-block;\n  width: 100%;\n  margin: 5px 0; }\n\n.add-form_formGroup_OS2 label {\n    font-size: 14px;\n    padding: 5px 0;\n    margin: 0;\n    display: block;\n    font-weight: 500; }\n\n.add-form_formGroup_OS2 input,\n  .add-form_formGroup_OS2 input[type=\"text\"],\n  .add-form_formGroup_OS2 input[type=\"password\"],\n  .add-form_formGroup_OS2 input[type=\"email\"] {\n    width: 100%;\n    border: 1px solid #ddd;\n    font-size: 13px;\n    padding: 5px; }\n\n.add-form_formGroup_OS2 textarea {\n    width: 100%;\n    height: 130px;\n    border: 1px solid #ddd;\n    font-size: 13px;\n    padding: 5px; }\n\n.add-form_preview_2QX {\n  padding: 20px; }\n", ""]);
	
	// exports
	exports.locals = {
		"form": "add-form_form_1JB",
		"form": "add-form_form_1JB",
		"tip": "add-form_tip_2rW",
		"tip": "add-form_tip_2rW",
		"formGroup": "add-form_formGroup_OS2",
		"formGroup": "add-form_formGroup_OS2",
		"preview": "add-form_preview_2QX",
		"preview": "add-form_preview_2QX"
	};

/***/ }),

/***/ 647:
/*!********************************!*\
  !*** ./src/question/action.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.setCurentTab = exports.getTabList = exports.vote = exports.getDetail = exports.answer = exports.create = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _reactRouter = __webpack_require__(/*! react-router */ 233);
	
	var create = exports.create = function create(data) {
		return function (dispatch) {
			$.ajax({
				url: config.API_URL + 'qna/create',
				data: data,
				type: 'PUT'
			}).done(function (json) {
				_reactRouter.browserHistory.push('/questions/' + json.id + '/' + json.url);
			}).fail(function (err) {
				dispatch({
					type: 'CREATE_FAIL',
					error: error
				});
			});
		};
	};
	var answer = exports.answer = function answer(question_id, content) {
		return function (dispatch) {
			$.ajax({
				url: config.API_URL + ('qna/questions/' + question_id + '/answer'),
				data: {
					content: content
				},
				type: 'PUT'
			}).done(function (json) {
				// dispatch(getDetail(question_id));
				dispatch({
					type: 'ANSWER_SUCCESS',
					answer: json
				});
			}).fail(function (err) {
				dispatch({
					type: 'ANSWER_FAIL',
					error: error
				});
			});
		};
	};
	
	var getDetail = exports.getDetail = function getDetail(id) {
		return function (dispatch) {
			dispatch({
				type: 'GET_DETAIL_SUCCESS',
				data: false
			});
			$.ajax({
				url: config.API_URL + 'qna/questions/' + id,
				type: 'GET'
			}).done(function (json) {
				dispatch({
					type: 'GET_DETAIL_SUCCESS',
					data: json
				});
			}).fail(function (err) {
				dispatch({
					type: 'GET_DETAIL_FAIL',
					error: error
				});
			});
		};
	};
	
	var vote = exports.vote = function vote(question_id, value) {
		return function (dispatch) {
			$.ajax({
				url: config.API_URL + ('qna/questions/' + question_id + '/vote'),
				data: {
					vote: value
				},
				type: 'POST'
			}).done(function (json) {
				dispatch({
					type: 'VOTE_SUCCESS',
					vote: json.vote
				});
			}).fail(function (err) {
				dispatch({
					type: 'VOTE_FAIL'
				});
			});
		};
	};
	
	var getTabList = exports.getTabList = function getTabList() {
		var q = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
		var sort = arguments[1];
		var page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
	
		return function (dispatch) {
			dispatch({
				data: {
					data: [],
					total: 0,
					limit: 20,
					current: 1,
					loading: true
				},
				type: 'SEARCH_GET_LIST_SUCCESS'
			});
			$.ajax({
				url: config.API_URL + 'qna/search',
				data: {
					q: q,
					sort: sort,
					page: page
				}
			}).done(function (json) {
				dispatch({
					data: _extends({}, json, {
						loading: false,
						current: page
					}),
					type: 'SEARCH_GET_LIST_SUCCESS'
				});
			}).fail(function (error) {});
		};
	};
	var setCurentTab = exports.setCurentTab = function setCurentTab() {
		var q = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
		var query = arguments[1];
		var page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
	
		return function (dispatch) {
			dispatch(getTabList(q, query, page));
			dispatch({
				q: q,
				query: query,
				type: 'SEARCH_SET_CURRENT_TAB'
			});
		};
	};

/***/ }),

/***/ 648:
/*!****************************************************!*\
  !*** ./src/question/containers/DetailContainer.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 182);
	
	var _redux = __webpack_require__(/*! redux */ 191);
	
	var _DetailQuestion = __webpack_require__(/*! ../components/DetailQuestion */ 649);
	
	var _DetailQuestion2 = _interopRequireDefault(_DetailQuestion);
	
	var _action = __webpack_require__(/*! ../action */ 647);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mapStateToProps = function mapStateToProps(state, ownProps) {
	    return {
	        detail: state.question.detail,
	        user: state.app.user
	    };
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return {
	        actions: (0, _redux.bindActionCreators)({
	            getDetail: _action.getDetail,
	            answer: _action.answer,
	            vote: _action.vote
	        }, dispatch)
	    };
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_DetailQuestion2.default);

/***/ }),

/***/ 649:
/*!***************************************************!*\
  !*** ./src/question/components/DetailQuestion.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactForm = __webpack_require__(/*! react-form */ 630);
	
	var _moment = __webpack_require__(/*! moment */ 419);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _withStyles = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 297);
	
	var _withStyles2 = _interopRequireDefault(_withStyles);
	
	var _detail = __webpack_require__(/*! ../styles/detail.scss */ 650);
	
	var _detail2 = _interopRequireDefault(_detail);
	
	var _global = __webpack_require__(/*! ./../../global */ 411);
	
	var _markdownIt = __webpack_require__(/*! markdown-it */ 542);
	
	var _markdownIt2 = _interopRequireDefault(_markdownIt);
	
	var _reactHelmet = __webpack_require__(/*! react-helmet */ 652);
	
	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);
	
	var _striptags = __webpack_require__(/*! striptags */ 609);
	
	var _striptags2 = _interopRequireDefault(_striptags);
	
	var _AddAnswer = __webpack_require__(/*! ./AddAnswer */ 662);
	
	var _AddAnswer2 = _interopRequireDefault(_AddAnswer);
	
	var _DetailQUestionItem = __webpack_require__(/*! ./DetailQUestionItem */ 665);
	
	var _DetailQUestionItem2 = _interopRequireDefault(_DetailQUestionItem);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DetailQuestion = function (_React$Component) {
	    _inherits(DetailQuestion, _React$Component);
	
	    function DetailQuestion(props) {
	        _classCallCheck(this, DetailQuestion);
	
	        return _possibleConstructorReturn(this, (DetailQuestion.__proto__ || Object.getPrototypeOf(DetailQuestion)).call(this, props));
	    }
	
	    _createClass(DetailQuestion, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.props.actions.getDetail(this.props.params.id);
	        }
	    }, {
	        key: 'getCreateText',
	        value: function getCreateText() {
	            var item = this.props.detail;
	            _moment2.default.locale('vi');
	            var dateString = _moment2.default.unix(Math.round(item.create_at / 1000)).format("lll");
	            return '\u0110\u0103ng l\xFAc ' + dateString;
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            // this.props.actions.getDetail(this.props.params.id);
	        }
	    }, {
	        key: 'renderTag',
	        value: function renderTag() {
	            var tags = this.props.detail.tags && this.props.detail.tags.map(function (tag, index) {
	                return _react2.default.createElement(
	                    'a',
	                    { key: index, href: Helper.removeSigh(tag), title: '' },
	                    tag
	                );
	            });
	            return _react2.default.createElement(
	                _global.Tags,
	                null,
	                tags
	            );
	        }
	    }, {
	        key: 'helmetRender',
	        value: function helmetRender() {
	            var detail = this.props.detail;
	            return _react2.default.createElement(_reactHelmet2.default, {
	                title: detail.title,
	                link: [{ "rel": "canonical", "href": config.BASE_URL + ('questions/' + detail.id + '/' + detail.url) }],
	                meta: [{ name: 'description', content: (0, _striptags2.default)(new _markdownIt2.default().render(detail.content)) }] });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            var detail = this.props.detail;
	            if (!detail) {
	                return _react2.default.createElement(
	                    'div',
	                    { className: 'container' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: _detail2.default.summary },
	                        _react2.default.createElement(_global.Skeleton, { w: '80%', h: '20px', mb: '30px' }),
	                        _react2.default.createElement(
	                            _global.Skeleton,
	                            { wrap: true, mb: '20px' },
	                            _react2.default.createElement(_global.Skeleton, { w: '100px', h: '100px', mr: '20px' }),
	                            _react2.default.createElement(_global.Skeleton, { w: 'calc(100% - 120px)', h: '120px', mb: '20px' }),
	                            _react2.default.createElement(_global.Skeleton, { fl: 'right', w: '100px', h: '40px' })
	                        ),
	                        _react2.default.createElement(
	                            _global.Skeleton,
	                            { wrap: true, mb: '20px' },
	                            _react2.default.createElement(_global.Skeleton, { w: '100px', h: '100px', mr: '20px' }),
	                            _react2.default.createElement(_global.Skeleton, { w: 'calc(100% - 120px)', h: '120px', mb: '20px' }),
	                            _react2.default.createElement(_global.Skeleton, { fl: 'right', w: '100px', h: '40px' })
	                        ),
	                        _react2.default.createElement(
	                            _global.Skeleton,
	                            { wrap: true, mb: '20px' },
	                            _react2.default.createElement(_global.Skeleton, { w: '100px', h: '100px', mr: '20px' }),
	                            _react2.default.createElement(_global.Skeleton, { w: 'calc(100% - 120px)', h: '120px', mb: '20px' }),
	                            _react2.default.createElement(_global.Skeleton, { fl: 'right', w: '100px', h: '40px' })
	                        )
	                    )
	                );
	            }
	            var last_ans_id = '';
	            return _react2.default.createElement(
	                'div',
	                { className: _detail2.default.root },
	                this.helmetRender(),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'container' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: _detail2.default.summary },
	                        _react2.default.createElement(_DetailQUestionItem2.default, { user: this.props.user, detail: detail, onVote: this.props.actions.vote }),
	                        detail.answers.data.map(function (answer) {
	                            last_ans_id = answer.id;
	                            return _react2.default.createElement(_DetailQUestionItem2.default, { user: _this2.props.user, key: answer.id, detail: answer, onVote: _this2.props.actions.vote });
	                        }),
	                        _react2.default.createElement(_AddAnswer2.default, { key: last_ans_id, onAnswer: function onAnswer(content) {
	                                return _this2.props.actions.answer(detail.id, content);
	                            } })
	                    ),
	                    _react2.default.createElement('div', { className: _detail2.default.sidebar })
	                )
	            );
	        }
	    }]);
	
	    return DetailQuestion;
	}(_react2.default.Component);
	
	exports.default = (0, _withStyles2.default)(_detail2.default)(DetailQuestion);

/***/ }),

/***/ 650:
/*!*****************************************!*\
  !*** ./src/question/styles/detail.scss ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

	
	    var content = __webpack_require__(/*! !../../../~/css-loader?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../~/postcss-loader!../../../~/sass-loader!./detail.scss */ 651);
	    var insertCss = __webpack_require__(/*! ../../../~/isomorphic-style-loader/lib/insertCss.js */ 387);
	
	    if (typeof content === 'string') {
	      content = [[module.id, content, '']];
	    }
	
	    module.exports = content.locals || {};
	    module.exports._getContent = function() { return content; };
	    module.exports._getCss = function() { return content.toString(); };
	    module.exports._insertCss = function(options) { return insertCss(content, options) };
	    
	    // Hot Module Replacement
	    // https://webpack.github.io/docs/hot-module-replacement
	    // Only activated in browser context
	    if (false) {
	      var removeCss = function() {};
	      module.hot.accept("!!../../../node_modules/css-loader/index.js?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./detail.scss", function() {
	        content = require("!!../../../node_modules/css-loader/index.js?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./detail.scss");
	
	        if (typeof content === 'string') {
	          content = [[module.id, content, '']];
	        }
	
	        removeCss = insertCss(content, { replace: true });
	      });
	      module.hot.dispose(function() { removeCss(); });
	    }
	  

/***/ }),

/***/ 651:
/*!****************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!./~/postcss-loader!./~/sass-loader!./src/question/styles/detail.scss ***!
  \****************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ../../../~/css-loader/lib/css-base.js */ 386)();
	// imports
	
	
	// module
	exports.push([module.id, ".detail_summary_1XD {\n  width: 70%;\n  float: left;\n  padding: 10px 0 20px 0;\n  border-bottom: 1px solid #ddd; }\n\n.detail_sidebar_zUn {\n  width: calc(30% - 20px);\n  float: right; }\n", ""]);
	
	// exports
	exports.locals = {
		"summary": "detail_summary_1XD",
		"summary": "detail_summary_1XD",
		"sidebar": "detail_sidebar_zUn",
		"sidebar": "detail_sidebar_zUn"
	};

/***/ }),

/***/ 662:
/*!**********************************************!*\
  !*** ./src/question/components/AddAnswer.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactForm = __webpack_require__(/*! react-form */ 630);
	
	var _withStyles = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 297);
	
	var _withStyles2 = _interopRequireDefault(_withStyles);
	
	var _addAnswer = __webpack_require__(/*! ../styles/add-answer.scss */ 663);
	
	var _addAnswer2 = _interopRequireDefault(_addAnswer);
	
	var _markdownIt = __webpack_require__(/*! markdown-it */ 542);
	
	var _markdownIt2 = _interopRequireDefault(_markdownIt);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var AddAnswer = function (_React$Component) {
	    _inherits(AddAnswer, _React$Component);
	
	    function AddAnswer(props) {
	        _classCallCheck(this, AddAnswer);
	
	        var _this = _possibleConstructorReturn(this, (AddAnswer.__proto__ || Object.getPrototypeOf(AddAnswer)).call(this, props));
	
	        _this.handleValidate = _this.handleValidate.bind(_this);
	        _this.handleSubmit = _this.handleSubmit.bind(_this);
	        _this.state = {
	            markdown_code: '',
	            disable_form: false,
	            loading_form: false
	        };
	        return _this;
	    }
	
	    _createClass(AddAnswer, [{
	        key: '_onChange',
	        value: function _onChange() {}
	    }, {
	        key: 'validContent',
	        value: function validContent(value) {
	            if (!value || value.length === 0) {
	                return 'Hãy nhập nội dung';
	            }
	            if (value.length < 60) {
	                return 'Nội dung dài hơn 60 ký tự';
	            }
	        }
	    }, {
	        key: 'handleValidate',
	        value: function handleValidate(values) {
	            var content = values.content;
	
	            return {
	                content: this.validContent(content)
	            };
	        }
	    }, {
	        key: 'handleValidateFail',
	        value: function handleValidateFail() {}
	    }, {
	        key: 'renderMarkDown',
	        value: function renderMarkDown() {
	            return {
	                '__html': new _markdownIt2.default().render(this.state.markdown_code)
	            };
	        }
	    }, {
	        key: 'handleSubmit',
	        value: function handleSubmit(values) {
	
	            this.setState({
	                disable_form: true,
	                loading_form: true
	            });
	
	            this.props.onAnswer(values.content);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            return _react2.default.createElement(
	                'div',
	                { className: _addAnswer2.default.root },
	                _react2.default.createElement(
	                    'h3',
	                    { className: _addAnswer2.default.title },
	                    'Tr\u1EA3 l\u1EDDi'
	                ),
	                _react2.default.createElement(
	                    _reactForm.Form,
	                    {
	                        onSubmit: this.handleSubmit,
	                        validate: this.handleValidate,
	                        onValidationFail: this.handleValidateFail },
	                    function (_ref) {
	                        var values = _ref.values,
	                            submitForm = _ref.submitForm,
	                            addValue = _ref.addValue,
	                            removeValue = _ref.removeValue,
	                            getError = _ref.getError;
	
	                        return _react2.default.createElement(
	                            'form',
	                            { onSubmit: submitForm },
	                            _react2.default.createElement(
	                                'div',
	                                { className: _addAnswer2.default.formGroup },
	                                _react2.default.createElement(_reactForm.Textarea, { disabled: _this2.state.disable_form, field: 'content', placeholder: 'Nh\u1EADp n\u1ED9i dung chi ti\u1EBFt ?', onChange: function onChange(val, _onChange2) {
	                                        _this2.setState({ markdown_code: val.currentTarget.value });_onChange2();
	                                    } }),
	                                _react2.default.createElement(
	                                    'div',
	                                    { className: _addAnswer2.default.preview, style: { display: _this2.state.markdown_code.length > 0 ? 'block' : 'none' } },
	                                    _react2.default.createElement('div', { className: 'markdown-render', dangerouslySetInnerHTML: _this2.renderMarkDown() })
	                                )
	                            ),
	                            _react2.default.createElement(
	                                'div',
	                                { className: _addAnswer2.default.formGroup },
	                                _react2.default.createElement(
	                                    'button',
	                                    { disabled: _this2.state.disable_form, className: _this2.state.loading_form ? "btn loading" : "btn", type: 'submit' },
	                                    'G\u1EEDi c\xE2u h\u1ECFi'
	                                )
	                            )
	                        );
	                    }
	                )
	            );
	        }
	    }]);
	
	    return AddAnswer;
	}(_react2.default.Component);
	
	exports.default = (0, _withStyles2.default)(_addAnswer2.default)(AddAnswer);

/***/ }),

/***/ 663:
/*!*********************************************!*\
  !*** ./src/question/styles/add-answer.scss ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

	
	    var content = __webpack_require__(/*! !../../../~/css-loader?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../~/postcss-loader!../../../~/sass-loader!./add-answer.scss */ 664);
	    var insertCss = __webpack_require__(/*! ../../../~/isomorphic-style-loader/lib/insertCss.js */ 387);
	
	    if (typeof content === 'string') {
	      content = [[module.id, content, '']];
	    }
	
	    module.exports = content.locals || {};
	    module.exports._getContent = function() { return content; };
	    module.exports._getCss = function() { return content.toString(); };
	    module.exports._insertCss = function(options) { return insertCss(content, options) };
	    
	    // Hot Module Replacement
	    // https://webpack.github.io/docs/hot-module-replacement
	    // Only activated in browser context
	    if (false) {
	      var removeCss = function() {};
	      module.hot.accept("!!../../../node_modules/css-loader/index.js?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./add-answer.scss", function() {
	        content = require("!!../../../node_modules/css-loader/index.js?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./add-answer.scss");
	
	        if (typeof content === 'string') {
	          content = [[module.id, content, '']];
	        }
	
	        removeCss = insertCss(content, { replace: true });
	      });
	      module.hot.dispose(function() { removeCss(); });
	    }
	  

/***/ }),

/***/ 664:
/*!********************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!./~/postcss-loader!./~/sass-loader!./src/question/styles/add-answer.scss ***!
  \********************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ../../../~/css-loader/lib/css-base.js */ 386)();
	// imports
	
	
	// module
	exports.push([module.id, ".add-answer_root_f7V {\n  margin: 20px 0 0 0; }\n\n.add-answer_title_2q8 {\n  font-weight: 300;\n  font-size: 26px;\n  margin-bottom: 15px;\n  display: table;\n  width: 100%; }\n\n.add-answer_formGroup_1tf {\n  display: inline-block;\n  width: 100%;\n  margin: 5px 0; }\n\n.add-answer_formGroup_1tf label {\n    font-size: 14px;\n    padding: 5px 0;\n    margin: 0;\n    display: block;\n    font-weight: 500; }\n\n.add-answer_formGroup_1tf input,\n  .add-answer_formGroup_1tf input[type=\"text\"],\n  .add-answer_formGroup_1tf input[type=\"password\"],\n  .add-answer_formGroup_1tf input[type=\"email\"] {\n    width: 100%;\n    border: 1px solid #ddd;\n    font-size: 13px;\n    padding: 5px; }\n\n.add-answer_formGroup_1tf textarea {\n    width: 100%;\n    height: 130px;\n    border: 1px solid #ddd;\n    font-size: 13px;\n    padding: 5px; }\n\n.add-answer_preview_qoj {\n  padding: 20px; }\n", ""]);
	
	// exports
	exports.locals = {
		"root": "add-answer_root_f7V",
		"root": "add-answer_root_f7V",
		"title": "add-answer_title_2q8",
		"title": "add-answer_title_2q8",
		"formGroup": "add-answer_formGroup_1tf",
		"formGroup": "add-answer_formGroup_1tf",
		"preview": "add-answer_preview_qoj",
		"preview": "add-answer_preview_qoj"
	};

/***/ }),

/***/ 665:
/*!*******************************************************!*\
  !*** ./src/question/components/DetailQUestionItem.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 233);
	
	var _moment = __webpack_require__(/*! moment */ 419);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _withStyles = __webpack_require__(/*! isomorphic-style-loader/lib/withStyles */ 297);
	
	var _withStyles2 = _interopRequireDefault(_withStyles);
	
	var _detailItem = __webpack_require__(/*! ../styles/detail-item.scss */ 666);
	
	var _detailItem2 = _interopRequireDefault(_detailItem);
	
	var _global = __webpack_require__(/*! ./../../global */ 411);
	
	var _markdownIt = __webpack_require__(/*! markdown-it */ 542);
	
	var _markdownIt2 = _interopRequireDefault(_markdownIt);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DetailQuestionItem = function (_React$Component) {
	    _inherits(DetailQuestionItem, _React$Component);
	
	    function DetailQuestionItem(props) {
	        _classCallCheck(this, DetailQuestionItem);
	
	        return _possibleConstructorReturn(this, (DetailQuestionItem.__proto__ || Object.getPrototypeOf(DetailQuestionItem)).call(this, props));
	    }
	
	    _createClass(DetailQuestionItem, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {}
	    }, {
	        key: 'getCreateText',
	        value: function getCreateText() {
	            var item = this.props.detail;
	            _moment2.default.locale('vi');
	            var dateString = _moment2.default.unix(Math.round(item.create_at / 1000)).format("lll");
	            return '\u0110\u0103ng l\xFAc ' + dateString;
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {}
	    }, {
	        key: 'renderMarkDown',
	        value: function renderMarkDown(content) {
	            return {
	                '__html': new _markdownIt2.default().render(content)
	            };
	        }
	    }, {
	        key: 'renderTag',
	        value: function renderTag() {
	            var tags = this.props.detail.tags && this.props.detail.tags.map(function (tag, index) {
	                return _react2.default.createElement(
	                    _reactRouter.Link,
	                    { key: index, to: "/tagged/" + Helper.removeSigh(tag), title: '' },
	                    tag
	                );
	            });
	            return _react2.default.createElement(
	                _global.Tags,
	                null,
	                tags
	            );
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var detail = this.props.detail;
	            return _react2.default.createElement(
	                'div',
	                { className: _detailItem2.default.root },
	                detail.type === 'question' ? _react2.default.createElement(
	                    'h1',
	                    { className: _detailItem2.default.title },
	                    detail.title
	                ) : '',
	                _react2.default.createElement(
	                    'div',
	                    { className: _detailItem2.default.left },
	                    _react2.default.createElement(_global.VoteButton, {
	                        user: this.props.user,
	                        id: detail.id,
	                        onVote: this.props.onVote,
	                        voted: detail.voted,
	                        down_voted: detail.down_voted,
	                        vote: detail.vote,
	                        down_vote: detail.down_vote
	                    })
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: _detailItem2.default.right },
	                    _react2.default.createElement(
	                        'div',
	                        { className: _detailItem2.default.contentWrap },
	                        _react2.default.createElement('div', { className: 'markdown-render', dangerouslySetInnerHTML: this.renderMarkDown(detail.content) })
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: _detailItem2.default.tagWrap },
	                        this.renderTag()
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: _detailItem2.default.metaWrap },
	                        _react2.default.createElement(
	                            'div',
	                            { className: _detailItem2.default.authorBox },
	                            _react2.default.createElement(
	                                'span',
	                                null,
	                                this.getCreateText()
	                            ),
	                            _react2.default.createElement(_global.UserBox, { user: detail.user })
	                        )
	                    )
	                )
	            );
	        }
	    }]);
	
	    return DetailQuestionItem;
	}(_react2.default.Component);
	
	exports.default = (0, _withStyles2.default)(_detailItem2.default)(DetailQuestionItem);

/***/ }),

/***/ 666:
/*!**********************************************!*\
  !*** ./src/question/styles/detail-item.scss ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

	
	    var content = __webpack_require__(/*! !../../../~/css-loader?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../~/postcss-loader!../../../~/sass-loader!./detail-item.scss */ 667);
	    var insertCss = __webpack_require__(/*! ../../../~/isomorphic-style-loader/lib/insertCss.js */ 387);
	
	    if (typeof content === 'string') {
	      content = [[module.id, content, '']];
	    }
	
	    module.exports = content.locals || {};
	    module.exports._getContent = function() { return content; };
	    module.exports._getCss = function() { return content.toString(); };
	    module.exports._insertCss = function(options) { return insertCss(content, options) };
	    
	    // Hot Module Replacement
	    // https://webpack.github.io/docs/hot-module-replacement
	    // Only activated in browser context
	    if (false) {
	      var removeCss = function() {};
	      module.hot.accept("!!../../../node_modules/css-loader/index.js?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./detail-item.scss", function() {
	        content = require("!!../../../node_modules/css-loader/index.js?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!../../../node_modules/postcss-loader/index.js!../../../node_modules/sass-loader/index.js!./detail-item.scss");
	
	        if (typeof content === 'string') {
	          content = [[module.id, content, '']];
	        }
	
	        removeCss = insertCss(content, { replace: true });
	      });
	      module.hot.dispose(function() { removeCss(); });
	    }
	  

/***/ }),

/***/ 667:
/*!*********************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?modules&camelCase&-url&localIdentName=[name]_[local]_[hash:base64:3]!./~/postcss-loader!./~/sass-loader!./src/question/styles/detail-item.scss ***!
  \*********************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ../../../~/css-loader/lib/css-base.js */ 386)();
	// imports
	
	
	// module
	exports.push([module.id, ".detail-item_root_1Tm {\n  padding: 15px 0;\n  display: table;\n  width: 100%;\n  border-bottom: 1px solid #e4e6e8; }\n\n.detail-item_title_2bE {\n  font-size: 20px;\n  font-weight: 500;\n  border-bottom: 1px solid #ddd;\n  padding-bottom: 20px;\n  margin-bottom: 20px; }\n\n.detail-item_metaWrap_1tN {\n  display: table;\n  width: 100%; }\n\n.detail-item_left_2SU {\n  width: 100px;\n  float: left; }\n\n.detail-item_right_2j6 {\n  width: calc(100% - 100px);\n  float: left; }\n\n.detail-item_authorBox_ZFY {\n  float: right;\n  display: table;\n  padding: 10px;\n  background: #e1ecf4; }\n\n.detail-item_authorBox_ZFY > span {\n    font-size: 12px;\n    color: #616161;\n    margin-bottom: 4px;\n    display: block; }\n", ""]);
	
	// exports
	exports.locals = {
		"root": "detail-item_root_1Tm",
		"root": "detail-item_root_1Tm",
		"title": "detail-item_title_2bE",
		"title": "detail-item_title_2bE",
		"metaWrap": "detail-item_metaWrap_1tN",
		"metaWrap": "detail-item_metaWrap_1tN",
		"left": "detail-item_left_2SU",
		"left": "detail-item_left_2SU",
		"right": "detail-item_right_2j6",
		"right": "detail-item_right_2j6",
		"authorBox": "detail-item_authorBox_ZFY",
		"authorBox": "detail-item_authorBox_ZFY"
	};

/***/ }),

/***/ 668:
/*!****************************************************!*\
  !*** ./src/question/containers/SearchContainer.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 182);
	
	var _redux = __webpack_require__(/*! redux */ 191);
	
	var _SearchQuestion = __webpack_require__(/*! ../components/SearchQuestion */ 669);
	
	var _SearchQuestion2 = _interopRequireDefault(_SearchQuestion);
	
	var _action = __webpack_require__(/*! ./../action */ 647);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	console.log(1);
	var mapStateToProps = function mapStateToProps(state, ownProps) {
	    return _extends({}, state.question.search, {
	        query: ownProps.location.query
	    });
	};
	
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return {
	        actions: (0, _redux.bindActionCreators)({
	            getTabList: _action.getTabList,
	            setCurentTab: _action.setCurentTab
	        }, dispatch)
	    };
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_SearchQuestion2.default);

/***/ }),

/***/ 669:
/*!***************************************************!*\
  !*** ./src/question/components/SearchQuestion.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _global = __webpack_require__(/*! ./../../global */ 411);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SearchQuestion = function (_React$Component) {
	    _inherits(SearchQuestion, _React$Component);
	
	    function SearchQuestion(props) {
	        _classCallCheck(this, SearchQuestion);
	
	        var _this = _possibleConstructorReturn(this, (SearchQuestion.__proto__ || Object.getPrototypeOf(SearchQuestion)).call(this, props));
	
	        console.log(props);
	        return _this;
	    }
	
	    _createClass(SearchQuestion, [{
	        key: 'handleTab',
	        value: function handleTab() {
	            var query = this.props.query;
	            var tab = typeof query.tab !== 'undefined' ? query.tab : 'newest';
	            var page = typeof query.page !== 'undefined' ? parseInt(query.page) : 1;
	            var q = typeof query.q !== 'undefined' ? query.q : '';
	            q = typeof this.props.params.tag !== 'undefined' ? this.props.params.tag : q;
	            return _react2.default.createElement(_global.Tabs, {
	                base_url: '/search',
	                navText: 'T\xECm ki\u1EBFm: `' + q + '`',
	                q: q,
	                tab: tab,
	                page: page,
	                tabs: this.props.tabs,
	                list: this.props.list,
	                getTabList: this.props.actions.getTabList,
	                setCurentTab: this.props.actions.setCurentTab });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: 'root' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'container' },
	                    this.handleTab()
	                )
	            );
	        }
	    }]);
	
	    return SearchQuestion;
	}(_react2.default.Component);
	
	exports.default = SearchQuestion;

/***/ }),

/***/ 671:
/*!*****************************!*\
  !*** ./src/config/index.js ***!
  \*****************************/
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		API_URL: 'https://hoi-dap-api.herokuapp.com/api/',
		BASE_URL: 'https://hoi-dap.herokuapp.com'
	};

/***/ })

});
//# sourceMappingURL=bundle.js.map