module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!******************!*\
  !*** multi main ***!
  \******************/
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./src/index.js */1);
	module.exports = __webpack_require__(/*! /home/krash/Desktop/Reactjs-Chat-Component/Frontend/src/main.js */14);


/***/ }),
/* 1 */
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _socketIo = __webpack_require__(/*! ../socket.io/socket.io.js */ 3);
	
	var _socketIo2 = _interopRequireDefault(_socketIo);
	
	var _reactEmojione = __webpack_require__(/*! react-emojione */ 4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*I am really hacking this into react!*/
	//import params from "./config/config.js"
	
	
	//This function takes params from the configuration.
	//TODO this can be cleaned up a bit better
	
	
	// I wish we could make this conditional , like if user chooses a valid name, then connect...
	var socket = _socketIo2.default.connect();
	
	var Chatapp = function (_React$Component) {
	  _inherits(Chatapp, _React$Component);
	
	  function Chatapp() {
	    _classCallCheck(this, Chatapp);
	
	    var _this = _possibleConstructorReturn(this, (Chatapp.__proto__ || Object.getPrototypeOf(Chatapp)).call(this));
	
	    _this.state = {
	      ChatMessage: "",
	      Messages: [],
	      UsersinChat: [],
	      UpdatesFromServer: []
	    };
	    return _this;
	  }
	
	  _createClass(Chatapp, [{
	    key: "setup",
	    value: function setup() {
	      if (this.props.config) {}
	      //This is probably a bad practice , but at least I get access to make this controllable by props!
	      socket.io.uri = this.props.uri;
	      socket.io.opts.hostname = this.props.hostname;
	      socket.io.opts.path = this.props.hardpath;
	      socket.io.opts.resource = this.props.resource;
	      socket.io.opts.reconnect = this.props.reconnect;
	      socket.io.opts.secure = this.props.secure;
	    }
	  }, {
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      this.setup();
	    }
	  }, {
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      this.RecvMessage();
	      this.RecvUpdateFromServer();
	      this.recvUserListFromServer();
	    }
	  }, {
	    key: "recvUserListFromServer",
	    value: function recvUserListFromServer() {
	      socket.on('user list', function (msg) {
	        console.log("user list " + msg);
	        this.setState({ UsersinChat: msg });
	      }.bind(this));
	    }
	  }, {
	    key: "RecvUpdateFromServer",
	    value: function RecvUpdateFromServer() {
	      socket.on('chat update', function (msg) {
	        var parsedSMessage = JSON.parse(msg);
	        this.setState({ Messages: this.state.Messages.concat({ Username: this.props.servername, Message: parsedSMessage.ServerMessage }) });
	      }.bind(this));
	    }
	  }, {
	    key: "RecvMessage",
	    value: function RecvMessage() {
	      socket.on('chat message', function (msg) {
	        var parsedMessage = JSON.parse(msg);
	        this.setState({ Messages: this.state.Messages.concat({ Username: parsedMessage.Username, Message: parsedMessage.Message }) });
	      }.bind(this));
	    }
	
	    //This just checks if 'Enter' was pressed. then, sets state of Username to the value in box.
	
	  }, {
	    key: "UpdateUserName",
	    value: function UpdateUserName(evt) {
	      if (evt.key === 'Enter') {
	        if (evt.target.value == "") {
	          console.log("Enter A User Name");
	        } else {
	          this.setState({
	            Username: evt.target.value });
	          this.SendUpdate(evt.target.value, evt.target.value + " Has Joined Chat!");
	        }
	      }
	    }
	  }, {
	    key: "UpdateMessage",
	    value: function UpdateMessage(evt) {
	      this.setState({
	        ChatMessage: evt.target.value });
	      //	console.log(this.state.ChatMessage)
	    }
	  }, {
	    key: "SendUpdate",
	    value: function SendUpdate(User, ServerMessage) {
	      var username = this.state.Item;
	      socket.emit('chat update', JSON.stringify({ User: User, ServerMessage: ServerMessage }));
	    }
	  }, {
	    key: "SendMessage",
	    value: function SendMessage(e, Username, Message) {
	      e.preventDefault();
	      var username = this.state.Username;
	      var message = this.state.ChatMessage;
	
	      // Check if there message is empty. send if False then send
	      if (message == "") {
	        console.log("Type Something!");
	      } else {
	        socket.emit('chat message', JSON.stringify({ Username: username, Message: message }));
	        //socket.emit('chat message',this.state.Username +": "+ this.state.ChatMessage)
	        //  console.log(this.state.Messages)
	        this.setState({ Messages: this.state.Messages.concat({ Username: username, Message: message }) });
	        this.setState({ ChatMessage: "" });
	      }
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this2 = this;
	
	      if (this.state.Username) {
	        return _react2.default.createElement(
	          "div",
	          { className: "ChatApp" },
	          _react2.default.createElement(
	            "div",
	            { className: "chatNavbar center" },
	            _react2.default.createElement(
	              "h1",
	              null,
	              " ",
	              this.props.welcomemessage
	            )
	          ),
	          _react2.default.createElement(
	            "div",
	            { className: "container center" },
	            _react2.default.createElement(
	              "div",
	              { className: "RoomsList" },
	              _react2.default.createElement(
	                "ul",
	                { className: "ulRooms" },
	                _react2.default.createElement(
	                  "li",
	                  null,
	                  " ",
	                  this.props.MainRoom,
	                  " "
	                )
	              )
	            ),
	            _react2.default.createElement(
	              "div",
	              { className: "UsersList" },
	              _react2.default.createElement(
	                "ul",
	                { className: "ulUsers" },
	                this.state.UsersinChat.map(function (UsersinChat, index) {
	                  return _react2.default.createElement(
	                    "li",
	                    { key: index },
	                    JSON.parse(UsersinChat)['User'],
	                    " "
	                  );
	                })
	              )
	            )
	          ),
	          _react2.default.createElement(
	            "div",
	            { id: "box" },
	            _react2.default.createElement("p", { id: "messages", className: "left" }),
	            this.state.Messages.map(function (message, index) {
	              return _react2.default.createElement(
	                "div",
	                { className: "chatitem", key: index },
	                _react2.default.createElement(
	                  "ul",
	                  null,
	                  _react2.default.createElement(
	                    "div",
	                    { className: "ChatUsername" },
	                    _react2.default.createElement(
	                      "li",
	                      null,
	                      message.Username,
	                      ":"
	                    )
	                  ),
	                  _react2.default.createElement(
	                    "div",
	                    { className: "chatMessage" },
	                    _react2.default.createElement(
	                      "li",
	                      null,
	                      (0, _reactEmojione.emojify)(message.Message)
	                    )
	                  )
	                )
	              );
	            })
	          ),
	          _react2.default.createElement(
	            "div",
	            { className: "sender left" },
	            _react2.default.createElement(
	              "form",
	              { onSubmit: this.SendMessage.bind(this) },
	              " ",
	              _react2.default.createElement("input", { id: "myEmoji", className: "message", autoFocus: true, ref: "ChatInput", autoComplete: "off", value: this.state.ChatMessage, onChange: function onChange(evt) {
	                  return _this2.UpdateMessage(evt);
	                } }),
	              _react2.default.createElement("input", { autoComplete: "off", type: "submit", className: "button", value: "Send" })
	            )
	          )
	        );
	      } else {
	        return _react2.default.createElement(
	          "div",
	          { className: "ChatApp" },
	          _react2.default.createElement(
	            "div",
	            { className: "chatNavbar center" },
	            _react2.default.createElement(
	              "h1",
	              null,
	              this.props.welcomemessage
	            )
	          ),
	          _react2.default.createElement("div", { className: "container center" }),
	          _react2.default.createElement(
	            "div",
	            { id: "box" },
	            _react2.default.createElement("p", { id: "messages", className: "left" }),
	            _react2.default.createElement(
	              "p",
	              null,
	              "Select User name please"
	            ),
	            _react2.default.createElement("input", { className: "chatuserinput", autoFocus: true, ref: "usernameimput", autoComplete: "off", value: this.state.username, onKeyPress: function onKeyPress(evt) {
	                return _this2.UpdateUserName(evt);
	              } })
	          )
	        );
	      }
	    }
	  }]);
	
	  return Chatapp;
	}(_react2.default.Component);
	
	exports.default = Chatapp;

/***/ }),
/* 2 */
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ (function(module, exports) {

	module.exports = require("react");

/***/ }),
/* 3 */
/*!********************************!*\
  !*** ./socket.io/socket.io.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

	!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.io=e():t.io=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";function r(t,e){"object"===("undefined"==typeof t?"undefined":o(t))&&(e=t,t=void 0),e=e||{};var n,r=i(t),s=r.source,u=r.id,h=r.path,f=p[u]&&h in p[u].nsps,l=e.forceNew||e["force new connection"]||!1===e.multiplex||f;return l?(c("ignoring socket cache for %s",s),n=a(s,e)):(p[u]||(c("new io instance for %s",s),p[u]=a(s,e)),n=p[u]),r.query&&!e.query&&(e.query=r.query),n.socket(r.path,e)}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i=n(1),s=n(7),a=n(13),c=n(3)("socket.io-client");t.exports=e=r;var p=e.managers={};e.protocol=s.protocol,e.connect=r,e.Manager=n(13),e.Socket=n(37)},function(t,e,n){(function(e){"use strict";function r(t,n){var r=t;n=n||e.location,null==t&&(t=n.protocol+"//"+n.host),"string"==typeof t&&("/"===t.charAt(0)&&(t="/"===t.charAt(1)?n.protocol+t:n.host+t),/^(https?|wss?):\/\//.test(t)||(i("protocol-less url %s",t),t="undefined"!=typeof n?n.protocol+"//"+t:"https://"+t),i("parse %s",t),r=o(t)),r.port||(/^(http|ws)$/.test(r.protocol)?r.port="80":/^(http|ws)s$/.test(r.protocol)&&(r.port="443")),r.path=r.path||"/";var s=r.host.indexOf(":")!==-1,a=s?"["+r.host+"]":r.host;return r.id=r.protocol+"://"+a+":"+r.port,r.href=r.protocol+"://"+a+(n&&n.port===r.port?"":":"+r.port),r}var o=n(2),i=n(3)("socket.io-client:url");t.exports=r}).call(e,function(){return this}())},function(t,e){var n=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,r=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];t.exports=function(t){var e=t,o=t.indexOf("["),i=t.indexOf("]");o!=-1&&i!=-1&&(t=t.substring(0,o)+t.substring(o,i).replace(/:/g,";")+t.substring(i,t.length));for(var s=n.exec(t||""),a={},c=14;c--;)a[r[c]]=s[c]||"";return o!=-1&&i!=-1&&(a.source=e,a.host=a.host.substring(1,a.host.length-1).replace(/;/g,":"),a.authority=a.authority.replace("[","").replace("]","").replace(/;/g,":"),a.ipv6uri=!0),a}},function(t,e,n){(function(r){function o(){return!("undefined"==typeof window||!window.process||"renderer"!==window.process.type)||("undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))}function i(t){var n=this.useColors;if(t[0]=(n?"%c":"")+this.namespace+(n?" %c":" ")+t[0]+(n?"%c ":" ")+"+"+e.humanize(this.diff),n){var r="color: "+this.color;t.splice(1,0,r,"color: inherit");var o=0,i=0;t[0].replace(/%[a-zA-Z%]/g,function(t){"%%"!==t&&(o++,"%c"===t&&(i=o))}),t.splice(i,0,r)}}function s(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function a(t){try{null==t?e.storage.removeItem("debug"):e.storage.debug=t}catch(n){}}function c(){var t;try{t=e.storage.debug}catch(n){}return!t&&"undefined"!=typeof r&&"env"in r&&(t=r.env.DEBUG),t}function p(){try{return window.localStorage}catch(t){}}e=t.exports=n(5),e.log=s,e.formatArgs=i,e.save=a,e.load=c,e.useColors=o,e.storage="undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage?chrome.storage.local:p(),e.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],e.formatters.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}},e.enable(c())}).call(e,n(4))},function(t,e){function n(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function o(t){if(u===setTimeout)return setTimeout(t,0);if((u===n||!u)&&setTimeout)return u=setTimeout,setTimeout(t,0);try{return u(t,0)}catch(e){try{return u.call(null,t,0)}catch(e){return u.call(this,t,0)}}}function i(t){if(h===clearTimeout)return clearTimeout(t);if((h===r||!h)&&clearTimeout)return h=clearTimeout,clearTimeout(t);try{return h(t)}catch(e){try{return h.call(null,t)}catch(e){return h.call(this,t)}}}function s(){y&&l&&(y=!1,l.length?d=l.concat(d):m=-1,d.length&&a())}function a(){if(!y){var t=o(s);y=!0;for(var e=d.length;e;){for(l=d,d=[];++m<e;)l&&l[m].run();m=-1,e=d.length}l=null,y=!1,i(t)}}function c(t,e){this.fun=t,this.array=e}function p(){}var u,h,f=t.exports={};!function(){try{u="function"==typeof setTimeout?setTimeout:n}catch(t){u=n}try{h="function"==typeof clearTimeout?clearTimeout:r}catch(t){h=r}}();var l,d=[],y=!1,m=-1;f.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];d.push(new c(t,e)),1!==d.length||y||o(a)},c.prototype.run=function(){this.fun.apply(null,this.array)},f.title="browser",f.browser=!0,f.env={},f.argv=[],f.version="",f.versions={},f.on=p,f.addListener=p,f.once=p,f.off=p,f.removeListener=p,f.removeAllListeners=p,f.emit=p,f.prependListener=p,f.prependOnceListener=p,f.listeners=function(t){return[]},f.binding=function(t){throw new Error("process.binding is not supported")},f.cwd=function(){return"/"},f.chdir=function(t){throw new Error("process.chdir is not supported")},f.umask=function(){return 0}},function(t,e,n){function r(t){var n,r=0;for(n in t)r=(r<<5)-r+t.charCodeAt(n),r|=0;return e.colors[Math.abs(r)%e.colors.length]}function o(t){function n(){if(n.enabled){var t=n,r=+new Date,o=r-(p||r);t.diff=o,t.prev=p,t.curr=r,p=r;for(var i=new Array(arguments.length),s=0;s<i.length;s++)i[s]=arguments[s];i[0]=e.coerce(i[0]),"string"!=typeof i[0]&&i.unshift("%O");var a=0;i[0]=i[0].replace(/%([a-zA-Z%])/g,function(n,r){if("%%"===n)return n;a++;var o=e.formatters[r];if("function"==typeof o){var s=i[a];n=o.call(t,s),i.splice(a,1),a--}return n}),e.formatArgs.call(t,i);var c=n.log||e.log||console.log.bind(console);c.apply(t,i)}}return n.namespace=t,n.enabled=e.enabled(t),n.useColors=e.useColors(),n.color=r(t),"function"==typeof e.init&&e.init(n),n}function i(t){e.save(t),e.names=[],e.skips=[];for(var n=("string"==typeof t?t:"").split(/[\s,]+/),r=n.length,o=0;o<r;o++)n[o]&&(t=n[o].replace(/\*/g,".*?"),"-"===t[0]?e.skips.push(new RegExp("^"+t.substr(1)+"$")):e.names.push(new RegExp("^"+t+"$")))}function s(){e.enable("")}function a(t){var n,r;for(n=0,r=e.skips.length;n<r;n++)if(e.skips[n].test(t))return!1;for(n=0,r=e.names.length;n<r;n++)if(e.names[n].test(t))return!0;return!1}function c(t){return t instanceof Error?t.stack||t.message:t}e=t.exports=o.debug=o["default"]=o,e.coerce=c,e.disable=s,e.enable=i,e.enabled=a,e.humanize=n(6),e.names=[],e.skips=[],e.formatters={};var p},function(t,e){function n(t){if(t=String(t),!(t.length>100)){var e=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(t);if(e){var n=parseFloat(e[1]),r=(e[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*u;case"days":case"day":case"d":return n*p;case"hours":case"hour":case"hrs":case"hr":case"h":return n*c;case"minutes":case"minute":case"mins":case"min":case"m":return n*a;case"seconds":case"second":case"secs":case"sec":case"s":return n*s;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function r(t){return t>=p?Math.round(t/p)+"d":t>=c?Math.round(t/c)+"h":t>=a?Math.round(t/a)+"m":t>=s?Math.round(t/s)+"s":t+"ms"}function o(t){return i(t,p,"day")||i(t,c,"hour")||i(t,a,"minute")||i(t,s,"second")||t+" ms"}function i(t,e,n){if(!(t<e))return t<1.5*e?Math.floor(t/e)+" "+n:Math.ceil(t/e)+" "+n+"s"}var s=1e3,a=60*s,c=60*a,p=24*c,u=365.25*p;t.exports=function(t,e){e=e||{};var i=typeof t;if("string"===i&&t.length>0)return n(t);if("number"===i&&isNaN(t)===!1)return e["long"]?o(t):r(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))}},function(t,e,n){function r(){}function o(t){var n=""+t.type;return e.BINARY_EVENT!==t.type&&e.BINARY_ACK!==t.type||(n+=t.attachments+"-"),t.nsp&&"/"!==t.nsp&&(n+=t.nsp+","),null!=t.id&&(n+=t.id),null!=t.data&&(n+=JSON.stringify(t.data)),h("encoded %j as %s",t,n),n}function i(t,e){function n(t){var n=d.deconstructPacket(t),r=o(n.packet),i=n.buffers;i.unshift(r),e(i)}d.removeBlobs(t,n)}function s(){this.reconstructor=null}function a(t){var n=0,r={type:Number(t.charAt(0))};if(null==e.types[r.type])return u();if(e.BINARY_EVENT===r.type||e.BINARY_ACK===r.type){for(var o="";"-"!==t.charAt(++n)&&(o+=t.charAt(n),n!=t.length););if(o!=Number(o)||"-"!==t.charAt(n))throw new Error("Illegal attachments");r.attachments=Number(o)}if("/"===t.charAt(n+1))for(r.nsp="";++n;){var i=t.charAt(n);if(","===i)break;if(r.nsp+=i,n===t.length)break}else r.nsp="/";var s=t.charAt(n+1);if(""!==s&&Number(s)==s){for(r.id="";++n;){var i=t.charAt(n);if(null==i||Number(i)!=i){--n;break}if(r.id+=t.charAt(n),n===t.length)break}r.id=Number(r.id)}return t.charAt(++n)&&(r=c(r,t.substr(n))),h("decoded %s as %j",t,r),r}function c(t,e){try{t.data=JSON.parse(e)}catch(n){return u()}return t}function p(t){this.reconPack=t,this.buffers=[]}function u(){return{type:e.ERROR,data:"parser error"}}var h=n(3)("socket.io-parser"),f=n(8),l=n(9),d=n(11),y=n(12);e.protocol=4,e.types=["CONNECT","DISCONNECT","EVENT","ACK","ERROR","BINARY_EVENT","BINARY_ACK"],e.CONNECT=0,e.DISCONNECT=1,e.EVENT=2,e.ACK=3,e.ERROR=4,e.BINARY_EVENT=5,e.BINARY_ACK=6,e.Encoder=r,e.Decoder=s,r.prototype.encode=function(t,n){if(t.type!==e.EVENT&&t.type!==e.ACK||!l(t.data)||(t.type=t.type===e.EVENT?e.BINARY_EVENT:e.BINARY_ACK),h("encoding packet %j",t),e.BINARY_EVENT===t.type||e.BINARY_ACK===t.type)i(t,n);else{var r=o(t);n([r])}},f(s.prototype),s.prototype.add=function(t){var n;if("string"==typeof t)n=a(t),e.BINARY_EVENT===n.type||e.BINARY_ACK===n.type?(this.reconstructor=new p(n),0===this.reconstructor.reconPack.attachments&&this.emit("decoded",n)):this.emit("decoded",n);else{if(!y(t)&&!t.base64)throw new Error("Unknown type: "+t);if(!this.reconstructor)throw new Error("got binary data when not reconstructing a packet");n=this.reconstructor.takeBinaryData(t),n&&(this.reconstructor=null,this.emit("decoded",n))}},s.prototype.destroy=function(){this.reconstructor&&this.reconstructor.finishedReconstruction()},p.prototype.takeBinaryData=function(t){if(this.buffers.push(t),this.buffers.length===this.reconPack.attachments){var e=d.reconstructPacket(this.reconPack,this.buffers);return this.finishedReconstruction(),e}return null},p.prototype.finishedReconstruction=function(){this.reconPack=null,this.buffers=[]}},function(t,e,n){function r(t){if(t)return o(t)}function o(t){for(var e in r.prototype)t[e]=r.prototype[e];return t}t.exports=r,r.prototype.on=r.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e),this},r.prototype.once=function(t,e){function n(){this.off(t,n),e.apply(this,arguments)}return n.fn=e,this.on(t,n),this},r.prototype.off=r.prototype.removeListener=r.prototype.removeAllListeners=r.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var n=this._callbacks["$"+t];if(!n)return this;if(1==arguments.length)return delete this._callbacks["$"+t],this;for(var r,o=0;o<n.length;o++)if(r=n[o],r===e||r.fn===e){n.splice(o,1);break}return this},r.prototype.emit=function(t){this._callbacks=this._callbacks||{};var e=[].slice.call(arguments,1),n=this._callbacks["$"+t];if(n){n=n.slice(0);for(var r=0,o=n.length;r<o;++r)n[r].apply(this,e)}return this},r.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks["$"+t]||[]},r.prototype.hasListeners=function(t){return!!this.listeners(t).length}},function(t,e,n){(function(e){function r(t){if(!t||"object"!=typeof t)return!1;if(o(t)){for(var n=0,i=t.length;n<i;n++)if(r(t[n]))return!0;return!1}if("function"==typeof e.Buffer&&e.Buffer.isBuffer&&e.Buffer.isBuffer(t)||"function"==typeof e.ArrayBuffer&&t instanceof ArrayBuffer||s&&t instanceof Blob||a&&t instanceof File)return!0;if(t.toJSON&&"function"==typeof t.toJSON&&1===arguments.length)return r(t.toJSON(),!0);for(var c in t)if(Object.prototype.hasOwnProperty.call(t,c)&&r(t[c]))return!0;return!1}var o=n(10),i=Object.prototype.toString,s="function"==typeof e.Blob||"[object BlobConstructor]"===i.call(e.Blob),a="function"==typeof e.File||"[object FileConstructor]"===i.call(e.File);t.exports=r}).call(e,function(){return this}())},function(t,e){var n={}.toString;t.exports=Array.isArray||function(t){return"[object Array]"==n.call(t)}},function(t,e,n){(function(t){function r(t,e){if(!t)return t;if(s(t)){var n={_placeholder:!0,num:e.length};return e.push(t),n}if(i(t)){for(var o=new Array(t.length),a=0;a<t.length;a++)o[a]=r(t[a],e);return o}if("object"==typeof t&&!(t instanceof Date)){var o={};for(var c in t)o[c]=r(t[c],e);return o}return t}function o(t,e){if(!t)return t;if(t&&t._placeholder)return e[t.num];if(i(t))for(var n=0;n<t.length;n++)t[n]=o(t[n],e);else if("object"==typeof t)for(var r in t)t[r]=o(t[r],e);return t}var i=n(10),s=n(12),a=Object.prototype.toString,c="function"==typeof t.Blob||"[object BlobConstructor]"===a.call(t.Blob),p="function"==typeof t.File||"[object FileConstructor]"===a.call(t.File);e.deconstructPacket=function(t){var e=[],n=t.data,o=t;return o.data=r(n,e),o.attachments=e.length,{packet:o,buffers:e}},e.reconstructPacket=function(t,e){return t.data=o(t.data,e),t.attachments=void 0,t},e.removeBlobs=function(t,e){function n(t,a,u){if(!t)return t;if(c&&t instanceof Blob||p&&t instanceof File){r++;var h=new FileReader;h.onload=function(){u?u[a]=this.result:o=this.result,--r||e(o)},h.readAsArrayBuffer(t)}else if(i(t))for(var f=0;f<t.length;f++)n(t[f],f,t);else if("object"==typeof t&&!s(t))for(var l in t)n(t[l],l,t)}var r=0,o=t;n(o),r||e(o)}}).call(e,function(){return this}())},function(t,e){(function(e){function n(t){return e.Buffer&&e.Buffer.isBuffer(t)||e.ArrayBuffer&&t instanceof ArrayBuffer}t.exports=n}).call(e,function(){return this}())},function(t,e,n){"use strict";function r(t,e){if(!(this instanceof r))return new r(t,e);t&&"object"===("undefined"==typeof t?"undefined":o(t))&&(e=t,t=void 0),e=e||{},e.path=e.path||"/socket.io",this.nsps={},this.subs=[],this.opts=e,this.reconnection(e.reconnection!==!1),this.reconnectionAttempts(e.reconnectionAttempts||1/0),this.reconnectionDelay(e.reconnectionDelay||1e3),this.reconnectionDelayMax(e.reconnectionDelayMax||5e3),this.randomizationFactor(e.randomizationFactor||.5),this.backoff=new l({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(null==e.timeout?2e4:e.timeout),this.readyState="closed",this.uri=t,this.connecting=[],this.lastPing=null,this.encoding=!1,this.packetBuffer=[];var n=e.parser||c;this.encoder=new n.Encoder,this.decoder=new n.Decoder,this.autoConnect=e.autoConnect!==!1,this.autoConnect&&this.open()}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i=n(14),s=n(37),a=n(8),c=n(7),p=n(39),u=n(40),h=n(3)("socket.io-client:manager"),f=n(36),l=n(41),d=Object.prototype.hasOwnProperty;t.exports=r,r.prototype.emitAll=function(){this.emit.apply(this,arguments);for(var t in this.nsps)d.call(this.nsps,t)&&this.nsps[t].emit.apply(this.nsps[t],arguments)},r.prototype.updateSocketIds=function(){for(var t in this.nsps)d.call(this.nsps,t)&&(this.nsps[t].id=this.generateId(t))},r.prototype.generateId=function(t){return("/"===t?"":t+"#")+this.engine.id},a(r.prototype),r.prototype.reconnection=function(t){return arguments.length?(this._reconnection=!!t,this):this._reconnection},r.prototype.reconnectionAttempts=function(t){return arguments.length?(this._reconnectionAttempts=t,this):this._reconnectionAttempts},r.prototype.reconnectionDelay=function(t){return arguments.length?(this._reconnectionDelay=t,this.backoff&&this.backoff.setMin(t),this):this._reconnectionDelay},r.prototype.randomizationFactor=function(t){return arguments.length?(this._randomizationFactor=t,this.backoff&&this.backoff.setJitter(t),this):this._randomizationFactor},r.prototype.reconnectionDelayMax=function(t){return arguments.length?(this._reconnectionDelayMax=t,this.backoff&&this.backoff.setMax(t),this):this._reconnectionDelayMax},r.prototype.timeout=function(t){return arguments.length?(this._timeout=t,this):this._timeout},r.prototype.maybeReconnectOnOpen=function(){!this.reconnecting&&this._reconnection&&0===this.backoff.attempts&&this.reconnect()},r.prototype.open=r.prototype.connect=function(t,e){if(h("readyState %s",this.readyState),~this.readyState.indexOf("open"))return this;h("opening %s",this.uri),this.engine=i(this.uri,this.opts);var n=this.engine,r=this;this.readyState="opening",this.skipReconnect=!1;var o=p(n,"open",function(){r.onopen(),t&&t()}),s=p(n,"error",function(e){if(h("connect_error"),r.cleanup(),r.readyState="closed",r.emitAll("connect_error",e),t){var n=new Error("Connection error");n.data=e,t(n)}else r.maybeReconnectOnOpen()});if(!1!==this._timeout){var a=this._timeout;h("connect attempt will timeout after %d",a);var c=setTimeout(function(){h("connect attempt timed out after %d",a),o.destroy(),n.close(),n.emit("error","timeout"),r.emitAll("connect_timeout",a)},a);this.subs.push({destroy:function(){clearTimeout(c)}})}return this.subs.push(o),this.subs.push(s),this},r.prototype.onopen=function(){h("open"),this.cleanup(),this.readyState="open",this.emit("open");var t=this.engine;this.subs.push(p(t,"data",u(this,"ondata"))),this.subs.push(p(t,"ping",u(this,"onping"))),this.subs.push(p(t,"pong",u(this,"onpong"))),this.subs.push(p(t,"error",u(this,"onerror"))),this.subs.push(p(t,"close",u(this,"onclose"))),this.subs.push(p(this.decoder,"decoded",u(this,"ondecoded")))},r.prototype.onping=function(){this.lastPing=new Date,this.emitAll("ping")},r.prototype.onpong=function(){this.emitAll("pong",new Date-this.lastPing)},r.prototype.ondata=function(t){this.decoder.add(t)},r.prototype.ondecoded=function(t){this.emit("packet",t)},r.prototype.onerror=function(t){h("error",t),this.emitAll("error",t)},r.prototype.socket=function(t,e){function n(){~f(o.connecting,r)||o.connecting.push(r)}var r=this.nsps[t];if(!r){r=new s(this,t,e),this.nsps[t]=r;var o=this;r.on("connecting",n),r.on("connect",function(){r.id=o.generateId(t)}),this.autoConnect&&n()}return r},r.prototype.destroy=function(t){var e=f(this.connecting,t);~e&&this.connecting.splice(e,1),this.connecting.length||this.close()},r.prototype.packet=function(t){h("writing packet %j",t);var e=this;t.query&&0===t.type&&(t.nsp+="?"+t.query),e.encoding?e.packetBuffer.push(t):(e.encoding=!0,this.encoder.encode(t,function(n){for(var r=0;r<n.length;r++)e.engine.write(n[r],t.options);e.encoding=!1,e.processPacketQueue()}))},r.prototype.processPacketQueue=function(){if(this.packetBuffer.length>0&&!this.encoding){var t=this.packetBuffer.shift();this.packet(t)}},r.prototype.cleanup=function(){h("cleanup");for(var t=this.subs.length,e=0;e<t;e++){var n=this.subs.shift();n.destroy()}this.packetBuffer=[],this.encoding=!1,this.lastPing=null,this.decoder.destroy()},r.prototype.close=r.prototype.disconnect=function(){h("disconnect"),this.skipReconnect=!0,this.reconnecting=!1,"opening"===this.readyState&&this.cleanup(),this.backoff.reset(),this.readyState="closed",this.engine&&this.engine.close()},r.prototype.onclose=function(t){h("onclose"),this.cleanup(),this.backoff.reset(),this.readyState="closed",this.emit("close",t),this._reconnection&&!this.skipReconnect&&this.reconnect()},r.prototype.reconnect=function(){if(this.reconnecting||this.skipReconnect)return this;var t=this;if(this.backoff.attempts>=this._reconnectionAttempts)h("reconnect failed"),this.backoff.reset(),this.emitAll("reconnect_failed"),this.reconnecting=!1;else{var e=this.backoff.duration();h("will wait %dms before reconnect attempt",e),this.reconnecting=!0;var n=setTimeout(function(){t.skipReconnect||(h("attempting reconnect"),t.emitAll("reconnect_attempt",t.backoff.attempts),t.emitAll("reconnecting",t.backoff.attempts),t.skipReconnect||t.open(function(e){e?(h("reconnect attempt error"),t.reconnecting=!1,t.reconnect(),t.emitAll("reconnect_error",e.data)):(h("reconnect success"),t.onreconnect())}))},e);this.subs.push({destroy:function(){clearTimeout(n)}})}},r.prototype.onreconnect=function(){var t=this.backoff.attempts;this.reconnecting=!1,this.backoff.reset(),this.updateSocketIds(),this.emitAll("reconnect",t)}},function(t,e,n){t.exports=n(15),t.exports.parser=n(22)},function(t,e,n){(function(e){function r(t,n){if(!(this instanceof r))return new r(t,n);n=n||{},t&&"object"==typeof t&&(n=t,t=null),t?(t=u(t),n.hostname=t.host,n.secure="https"===t.protocol||"wss"===t.protocol,n.port=t.port,t.query&&(n.query=t.query)):n.host&&(n.hostname=u(n.host).host),this.secure=null!=n.secure?n.secure:e.location&&"https:"===location.protocol,n.hostname&&!n.port&&(n.port=this.secure?"443":"80"),this.agent=n.agent||!1,this.hostname=n.hostname||(e.location?location.hostname:"localhost"),this.port=n.port||(e.location&&location.port?location.port:this.secure?443:80),this.query=n.query||{},"string"==typeof this.query&&(this.query=h.decode(this.query)),this.upgrade=!1!==n.upgrade,this.path=(n.path||"/engine.io").replace(/\/$/,"")+"/",this.forceJSONP=!!n.forceJSONP,this.jsonp=!1!==n.jsonp,this.forceBase64=!!n.forceBase64,this.enablesXDR=!!n.enablesXDR,this.timestampParam=n.timestampParam||"t",this.timestampRequests=n.timestampRequests,this.transports=n.transports||["polling","websocket"],this.transportOptions=n.transportOptions||{},this.readyState="",this.writeBuffer=[],this.prevBufferLen=0,this.policyPort=n.policyPort||843,this.rememberUpgrade=n.rememberUpgrade||!1,this.binaryType=null,this.onlyBinaryUpgrades=n.onlyBinaryUpgrades,this.perMessageDeflate=!1!==n.perMessageDeflate&&(n.perMessageDeflate||{}),!0===this.perMessageDeflate&&(this.perMessageDeflate={}),this.perMessageDeflate&&null==this.perMessageDeflate.threshold&&(this.perMessageDeflate.threshold=1024),this.pfx=n.pfx||null,this.key=n.key||null,this.passphrase=n.passphrase||null,this.cert=n.cert||null,this.ca=n.ca||null,this.ciphers=n.ciphers||null,this.rejectUnauthorized=void 0===n.rejectUnauthorized||n.rejectUnauthorized,this.forceNode=!!n.forceNode;var o="object"==typeof e&&e;o.global===o&&(n.extraHeaders&&Object.keys(n.extraHeaders).length>0&&(this.extraHeaders=n.extraHeaders),n.localAddress&&(this.localAddress=n.localAddress)),this.id=null,this.upgrades=null,this.pingInterval=null,this.pingTimeout=null,this.pingIntervalTimer=null,this.pingTimeoutTimer=null,this.open()}function o(t){var e={};for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}var i=n(16),s=n(8),a=n(3)("engine.io-client:socket"),c=n(36),p=n(22),u=n(2),h=n(30);t.exports=r,r.priorWebsocketSuccess=!1,s(r.prototype),r.protocol=p.protocol,r.Socket=r,r.Transport=n(21),r.transports=n(16),r.parser=n(22),r.prototype.createTransport=function(t){a('creating transport "%s"',t);var e=o(this.query);e.EIO=p.protocol,e.transport=t;var n=this.transportOptions[t]||{};this.id&&(e.sid=this.id);var r=new i[t]({query:e,socket:this,agent:n.agent||this.agent,hostname:n.hostname||this.hostname,port:n.port||this.port,secure:n.secure||this.secure,path:n.path||this.path,forceJSONP:n.forceJSONP||this.forceJSONP,jsonp:n.jsonp||this.jsonp,forceBase64:n.forceBase64||this.forceBase64,enablesXDR:n.enablesXDR||this.enablesXDR,timestampRequests:n.timestampRequests||this.timestampRequests,timestampParam:n.timestampParam||this.timestampParam,policyPort:n.policyPort||this.policyPort,pfx:n.pfx||this.pfx,key:n.key||this.key,passphrase:n.passphrase||this.passphrase,cert:n.cert||this.cert,ca:n.ca||this.ca,ciphers:n.ciphers||this.ciphers,rejectUnauthorized:n.rejectUnauthorized||this.rejectUnauthorized,perMessageDeflate:n.perMessageDeflate||this.perMessageDeflate,extraHeaders:n.extraHeaders||this.extraHeaders,forceNode:n.forceNode||this.forceNode,localAddress:n.localAddress||this.localAddress,requestTimeout:n.requestTimeout||this.requestTimeout,protocols:n.protocols||void 0});return r},r.prototype.open=function(){var t;if(this.rememberUpgrade&&r.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1)t="websocket";else{if(0===this.transports.length){var e=this;return void setTimeout(function(){e.emit("error","No transports available")},0)}t=this.transports[0]}this.readyState="opening";try{t=this.createTransport(t)}catch(n){return this.transports.shift(),void this.open()}t.open(),this.setTransport(t)},r.prototype.setTransport=function(t){a("setting transport %s",t.name);var e=this;this.transport&&(a("clearing existing transport %s",this.transport.name),this.transport.removeAllListeners()),this.transport=t,t.on("drain",function(){e.onDrain()}).on("packet",function(t){e.onPacket(t)}).on("error",function(t){e.onError(t)}).on("close",function(){e.onClose("transport close")})},r.prototype.probe=function(t){function e(){if(f.onlyBinaryUpgrades){var e=!this.supportsBinary&&f.transport.supportsBinary;h=h||e}h||(a('probe transport "%s" opened',t),u.send([{type:"ping",data:"probe"}]),u.once("packet",function(e){if(!h)if("pong"===e.type&&"probe"===e.data){if(a('probe transport "%s" pong',t),f.upgrading=!0,f.emit("upgrading",u),!u)return;r.priorWebsocketSuccess="websocket"===u.name,a('pausing current transport "%s"',f.transport.name),f.transport.pause(function(){h||"closed"!==f.readyState&&(a("changing transport and sending upgrade packet"),p(),f.setTransport(u),u.send([{type:"upgrade"}]),f.emit("upgrade",u),u=null,f.upgrading=!1,f.flush())})}else{a('probe transport "%s" failed',t);var n=new Error("probe error");n.transport=u.name,f.emit("upgradeError",n)}}))}function n(){h||(h=!0,p(),u.close(),u=null)}function o(e){var r=new Error("probe error: "+e);r.transport=u.name,n(),a('probe transport "%s" failed because of error: %s',t,e),f.emit("upgradeError",r)}function i(){o("transport closed")}function s(){o("socket closed")}function c(t){u&&t.name!==u.name&&(a('"%s" works - aborting "%s"',t.name,u.name),n())}function p(){u.removeListener("open",e),u.removeListener("error",o),u.removeListener("close",i),f.removeListener("close",s),f.removeListener("upgrading",c)}a('probing transport "%s"',t);var u=this.createTransport(t,{probe:1}),h=!1,f=this;r.priorWebsocketSuccess=!1,u.once("open",e),u.once("error",o),u.once("close",i),this.once("close",s),this.once("upgrading",c),u.open()},r.prototype.onOpen=function(){if(a("socket open"),this.readyState="open",r.priorWebsocketSuccess="websocket"===this.transport.name,this.emit("open"),this.flush(),"open"===this.readyState&&this.upgrade&&this.transport.pause){a("starting upgrade probes");for(var t=0,e=this.upgrades.length;t<e;t++)this.probe(this.upgrades[t])}},r.prototype.onPacket=function(t){if("opening"===this.readyState||"open"===this.readyState||"closing"===this.readyState)switch(a('socket receive: type "%s", data "%s"',t.type,t.data),this.emit("packet",t),this.emit("heartbeat"),t.type){case"open":this.onHandshake(JSON.parse(t.data));break;case"pong":this.setPing(),this.emit("pong");break;case"error":var e=new Error("server error");e.code=t.data,this.onError(e);break;case"message":this.emit("data",t.data),this.emit("message",t.data)}else a('packet received with socket readyState "%s"',this.readyState)},r.prototype.onHandshake=function(t){this.emit("handshake",t),this.id=t.sid,this.transport.query.sid=t.sid,this.upgrades=this.filterUpgrades(t.upgrades),this.pingInterval=t.pingInterval,this.pingTimeout=t.pingTimeout,this.onOpen(),"closed"!==this.readyState&&(this.setPing(),this.removeListener("heartbeat",this.onHeartbeat),this.on("heartbeat",this.onHeartbeat))},r.prototype.onHeartbeat=function(t){clearTimeout(this.pingTimeoutTimer);var e=this;e.pingTimeoutTimer=setTimeout(function(){"closed"!==e.readyState&&e.onClose("ping timeout")},t||e.pingInterval+e.pingTimeout)},r.prototype.setPing=function(){var t=this;clearTimeout(t.pingIntervalTimer),t.pingIntervalTimer=setTimeout(function(){a("writing ping packet - expecting pong within %sms",t.pingTimeout),t.ping(),t.onHeartbeat(t.pingTimeout)},t.pingInterval)},r.prototype.ping=function(){var t=this;this.sendPacket("ping",function(){t.emit("ping")})},r.prototype.onDrain=function(){this.writeBuffer.splice(0,this.prevBufferLen),this.prevBufferLen=0,0===this.writeBuffer.length?this.emit("drain"):this.flush()},r.prototype.flush=function(){"closed"!==this.readyState&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length&&(a("flushing %d packets in socket",this.writeBuffer.length),this.transport.send(this.writeBuffer),this.prevBufferLen=this.writeBuffer.length,this.emit("flush"))},r.prototype.write=r.prototype.send=function(t,e,n){return this.sendPacket("message",t,e,n),this},r.prototype.sendPacket=function(t,e,n,r){if("function"==typeof e&&(r=e,e=void 0),"function"==typeof n&&(r=n,n=null),"closing"!==this.readyState&&"closed"!==this.readyState){n=n||{},n.compress=!1!==n.compress;var o={type:t,data:e,options:n};this.emit("packetCreate",o),this.writeBuffer.push(o),r&&this.once("flush",r),this.flush()}},r.prototype.close=function(){function t(){r.onClose("forced close"),a("socket closing - telling transport to close"),r.transport.close()}function e(){r.removeListener("upgrade",e),r.removeListener("upgradeError",e),t()}function n(){r.once("upgrade",e),r.once("upgradeError",e)}if("opening"===this.readyState||"open"===this.readyState){this.readyState="closing";var r=this;this.writeBuffer.length?this.once("drain",function(){this.upgrading?n():t()}):this.upgrading?n():t()}return this},r.prototype.onError=function(t){a("socket error %j",t),r.priorWebsocketSuccess=!1,this.emit("error",t),this.onClose("transport error",t)},r.prototype.onClose=function(t,e){if("opening"===this.readyState||"open"===this.readyState||"closing"===this.readyState){a('socket close with reason: "%s"',t);var n=this;clearTimeout(this.pingIntervalTimer),clearTimeout(this.pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),this.readyState="closed",this.id=null,this.emit("close",t,e),n.writeBuffer=[],n.prevBufferLen=0}},r.prototype.filterUpgrades=function(t){for(var e=[],n=0,r=t.length;n<r;n++)~c(this.transports,t[n])&&e.push(t[n]);return e}}).call(e,function(){return this}())},function(t,e,n){(function(t){function r(e){var n,r=!1,a=!1,c=!1!==e.jsonp;if(t.location){var p="https:"===location.protocol,u=location.port;u||(u=p?443:80),r=e.hostname!==location.hostname||u!==e.port,a=e.secure!==p}if(e.xdomain=r,e.xscheme=a,n=new o(e),"open"in n&&!e.forceJSONP)return new i(e);if(!c)throw new Error("JSONP disabled");return new s(e)}var o=n(17),i=n(19),s=n(33),a=n(34);e.polling=r,e.websocket=a}).call(e,function(){return this}())},function(t,e,n){(function(e){var r=n(18);t.exports=function(t){var n=t.xdomain,o=t.xscheme,i=t.enablesXDR;try{if("undefined"!=typeof XMLHttpRequest&&(!n||r))return new XMLHttpRequest}catch(s){}try{if("undefined"!=typeof XDomainRequest&&!o&&i)return new XDomainRequest}catch(s){}if(!n)try{return new(e[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP");
	}catch(s){}}}).call(e,function(){return this}())},function(t,e){try{t.exports="undefined"!=typeof XMLHttpRequest&&"withCredentials"in new XMLHttpRequest}catch(n){t.exports=!1}},function(t,e,n){(function(e){function r(){}function o(t){if(c.call(this,t),this.requestTimeout=t.requestTimeout,this.extraHeaders=t.extraHeaders,e.location){var n="https:"===location.protocol,r=location.port;r||(r=n?443:80),this.xd=t.hostname!==e.location.hostname||r!==t.port,this.xs=t.secure!==n}}function i(t){this.method=t.method||"GET",this.uri=t.uri,this.xd=!!t.xd,this.xs=!!t.xs,this.async=!1!==t.async,this.data=void 0!==t.data?t.data:null,this.agent=t.agent,this.isBinary=t.isBinary,this.supportsBinary=t.supportsBinary,this.enablesXDR=t.enablesXDR,this.requestTimeout=t.requestTimeout,this.pfx=t.pfx,this.key=t.key,this.passphrase=t.passphrase,this.cert=t.cert,this.ca=t.ca,this.ciphers=t.ciphers,this.rejectUnauthorized=t.rejectUnauthorized,this.extraHeaders=t.extraHeaders,this.create()}function s(){for(var t in i.requests)i.requests.hasOwnProperty(t)&&i.requests[t].abort()}var a=n(17),c=n(20),p=n(8),u=n(31),h=n(3)("engine.io-client:polling-xhr");t.exports=o,t.exports.Request=i,u(o,c),o.prototype.supportsBinary=!0,o.prototype.request=function(t){return t=t||{},t.uri=this.uri(),t.xd=this.xd,t.xs=this.xs,t.agent=this.agent||!1,t.supportsBinary=this.supportsBinary,t.enablesXDR=this.enablesXDR,t.pfx=this.pfx,t.key=this.key,t.passphrase=this.passphrase,t.cert=this.cert,t.ca=this.ca,t.ciphers=this.ciphers,t.rejectUnauthorized=this.rejectUnauthorized,t.requestTimeout=this.requestTimeout,t.extraHeaders=this.extraHeaders,new i(t)},o.prototype.doWrite=function(t,e){var n="string"!=typeof t&&void 0!==t,r=this.request({method:"POST",data:t,isBinary:n}),o=this;r.on("success",e),r.on("error",function(t){o.onError("xhr post error",t)}),this.sendXhr=r},o.prototype.doPoll=function(){h("xhr poll");var t=this.request(),e=this;t.on("data",function(t){e.onData(t)}),t.on("error",function(t){e.onError("xhr poll error",t)}),this.pollXhr=t},p(i.prototype),i.prototype.create=function(){var t={agent:this.agent,xdomain:this.xd,xscheme:this.xs,enablesXDR:this.enablesXDR};t.pfx=this.pfx,t.key=this.key,t.passphrase=this.passphrase,t.cert=this.cert,t.ca=this.ca,t.ciphers=this.ciphers,t.rejectUnauthorized=this.rejectUnauthorized;var n=this.xhr=new a(t),r=this;try{h("xhr open %s: %s",this.method,this.uri),n.open(this.method,this.uri,this.async);try{if(this.extraHeaders){n.setDisableHeaderCheck&&n.setDisableHeaderCheck(!0);for(var o in this.extraHeaders)this.extraHeaders.hasOwnProperty(o)&&n.setRequestHeader(o,this.extraHeaders[o])}}catch(s){}if("POST"===this.method)try{this.isBinary?n.setRequestHeader("Content-type","application/octet-stream"):n.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch(s){}try{n.setRequestHeader("Accept","*/*")}catch(s){}"withCredentials"in n&&(n.withCredentials=!0),this.requestTimeout&&(n.timeout=this.requestTimeout),this.hasXDR()?(n.onload=function(){r.onLoad()},n.onerror=function(){r.onError(n.responseText)}):n.onreadystatechange=function(){if(2===n.readyState){var t;try{t=n.getResponseHeader("Content-Type")}catch(e){}"application/octet-stream"===t&&(n.responseType="arraybuffer")}4===n.readyState&&(200===n.status||1223===n.status?r.onLoad():setTimeout(function(){r.onError(n.status)},0))},h("xhr data %s",this.data),n.send(this.data)}catch(s){return void setTimeout(function(){r.onError(s)},0)}e.document&&(this.index=i.requestsCount++,i.requests[this.index]=this)},i.prototype.onSuccess=function(){this.emit("success"),this.cleanup()},i.prototype.onData=function(t){this.emit("data",t),this.onSuccess()},i.prototype.onError=function(t){this.emit("error",t),this.cleanup(!0)},i.prototype.cleanup=function(t){if("undefined"!=typeof this.xhr&&null!==this.xhr){if(this.hasXDR()?this.xhr.onload=this.xhr.onerror=r:this.xhr.onreadystatechange=r,t)try{this.xhr.abort()}catch(n){}e.document&&delete i.requests[this.index],this.xhr=null}},i.prototype.onLoad=function(){var t;try{var e;try{e=this.xhr.getResponseHeader("Content-Type")}catch(n){}t="application/octet-stream"===e?this.xhr.response||this.xhr.responseText:this.xhr.responseText}catch(n){this.onError(n)}null!=t&&this.onData(t)},i.prototype.hasXDR=function(){return"undefined"!=typeof e.XDomainRequest&&!this.xs&&this.enablesXDR},i.prototype.abort=function(){this.cleanup()},i.requestsCount=0,i.requests={},e.document&&(e.attachEvent?e.attachEvent("onunload",s):e.addEventListener&&e.addEventListener("beforeunload",s,!1))}).call(e,function(){return this}())},function(t,e,n){function r(t){var e=t&&t.forceBase64;u&&!e||(this.supportsBinary=!1),o.call(this,t)}var o=n(21),i=n(30),s=n(22),a=n(31),c=n(32),p=n(3)("engine.io-client:polling");t.exports=r;var u=function(){var t=n(17),e=new t({xdomain:!1});return null!=e.responseType}();a(r,o),r.prototype.name="polling",r.prototype.doOpen=function(){this.poll()},r.prototype.pause=function(t){function e(){p("paused"),n.readyState="paused",t()}var n=this;if(this.readyState="pausing",this.polling||!this.writable){var r=0;this.polling&&(p("we are currently polling - waiting to pause"),r++,this.once("pollComplete",function(){p("pre-pause polling complete"),--r||e()})),this.writable||(p("we are currently writing - waiting to pause"),r++,this.once("drain",function(){p("pre-pause writing complete"),--r||e()}))}else e()},r.prototype.poll=function(){p("polling"),this.polling=!0,this.doPoll(),this.emit("poll")},r.prototype.onData=function(t){var e=this;p("polling got data %s",t);var n=function(t,n,r){return"opening"===e.readyState&&e.onOpen(),"close"===t.type?(e.onClose(),!1):void e.onPacket(t)};s.decodePayload(t,this.socket.binaryType,n),"closed"!==this.readyState&&(this.polling=!1,this.emit("pollComplete"),"open"===this.readyState?this.poll():p('ignoring poll - transport state "%s"',this.readyState))},r.prototype.doClose=function(){function t(){p("writing close packet"),e.write([{type:"close"}])}var e=this;"open"===this.readyState?(p("transport open - closing"),t()):(p("transport not open - deferring close"),this.once("open",t))},r.prototype.write=function(t){var e=this;this.writable=!1;var n=function(){e.writable=!0,e.emit("drain")};s.encodePayload(t,this.supportsBinary,function(t){e.doWrite(t,n)})},r.prototype.uri=function(){var t=this.query||{},e=this.secure?"https":"http",n="";!1!==this.timestampRequests&&(t[this.timestampParam]=c()),this.supportsBinary||t.sid||(t.b64=1),t=i.encode(t),this.port&&("https"===e&&443!==Number(this.port)||"http"===e&&80!==Number(this.port))&&(n=":"+this.port),t.length&&(t="?"+t);var r=this.hostname.indexOf(":")!==-1;return e+"://"+(r?"["+this.hostname+"]":this.hostname)+n+this.path+t}},function(t,e,n){function r(t){this.path=t.path,this.hostname=t.hostname,this.port=t.port,this.secure=t.secure,this.query=t.query,this.timestampParam=t.timestampParam,this.timestampRequests=t.timestampRequests,this.readyState="",this.agent=t.agent||!1,this.socket=t.socket,this.enablesXDR=t.enablesXDR,this.pfx=t.pfx,this.key=t.key,this.passphrase=t.passphrase,this.cert=t.cert,this.ca=t.ca,this.ciphers=t.ciphers,this.rejectUnauthorized=t.rejectUnauthorized,this.forceNode=t.forceNode,this.extraHeaders=t.extraHeaders,this.localAddress=t.localAddress}var o=n(22),i=n(8);t.exports=r,i(r.prototype),r.prototype.onError=function(t,e){var n=new Error(t);return n.type="TransportError",n.description=e,this.emit("error",n),this},r.prototype.open=function(){return"closed"!==this.readyState&&""!==this.readyState||(this.readyState="opening",this.doOpen()),this},r.prototype.close=function(){return"opening"!==this.readyState&&"open"!==this.readyState||(this.doClose(),this.onClose()),this},r.prototype.send=function(t){if("open"!==this.readyState)throw new Error("Transport not open");this.write(t)},r.prototype.onOpen=function(){this.readyState="open",this.writable=!0,this.emit("open")},r.prototype.onData=function(t){var e=o.decodePacket(t,this.socket.binaryType);this.onPacket(e)},r.prototype.onPacket=function(t){this.emit("packet",t)},r.prototype.onClose=function(){this.readyState="closed",this.emit("close")}},function(t,e,n){(function(t){function r(t,n){var r="b"+e.packets[t.type]+t.data.data;return n(r)}function o(t,n,r){if(!n)return e.encodeBase64Packet(t,r);var o=t.data,i=new Uint8Array(o),s=new Uint8Array(1+o.byteLength);s[0]=v[t.type];for(var a=0;a<i.length;a++)s[a+1]=i[a];return r(s.buffer)}function i(t,n,r){if(!n)return e.encodeBase64Packet(t,r);var o=new FileReader;return o.onload=function(){t.data=o.result,e.encodePacket(t,n,!0,r)},o.readAsArrayBuffer(t.data)}function s(t,n,r){if(!n)return e.encodeBase64Packet(t,r);if(g)return i(t,n,r);var o=new Uint8Array(1);o[0]=v[t.type];var s=new k([o.buffer,t.data]);return r(s)}function a(t){try{t=d.decode(t,{strict:!1})}catch(e){return!1}return t}function c(t,e,n){for(var r=new Array(t.length),o=l(t.length,n),i=function(t,n,o){e(n,function(e,n){r[t]=n,o(e,r)})},s=0;s<t.length;s++)i(s,t[s],o)}var p,u=n(23),h=n(9),f=n(24),l=n(25),d=n(26);t&&t.ArrayBuffer&&(p=n(28));var y="undefined"!=typeof navigator&&/Android/i.test(navigator.userAgent),m="undefined"!=typeof navigator&&/PhantomJS/i.test(navigator.userAgent),g=y||m;e.protocol=3;var v=e.packets={open:0,close:1,ping:2,pong:3,message:4,upgrade:5,noop:6},b=u(v),w={type:"error",data:"parser error"},k=n(29);e.encodePacket=function(e,n,i,a){"function"==typeof n&&(a=n,n=!1),"function"==typeof i&&(a=i,i=null);var c=void 0===e.data?void 0:e.data.buffer||e.data;if(t.ArrayBuffer&&c instanceof ArrayBuffer)return o(e,n,a);if(k&&c instanceof t.Blob)return s(e,n,a);if(c&&c.base64)return r(e,a);var p=v[e.type];return void 0!==e.data&&(p+=i?d.encode(String(e.data),{strict:!1}):String(e.data)),a(""+p)},e.encodeBase64Packet=function(n,r){var o="b"+e.packets[n.type];if(k&&n.data instanceof t.Blob){var i=new FileReader;return i.onload=function(){var t=i.result.split(",")[1];r(o+t)},i.readAsDataURL(n.data)}var s;try{s=String.fromCharCode.apply(null,new Uint8Array(n.data))}catch(a){for(var c=new Uint8Array(n.data),p=new Array(c.length),u=0;u<c.length;u++)p[u]=c[u];s=String.fromCharCode.apply(null,p)}return o+=t.btoa(s),r(o)},e.decodePacket=function(t,n,r){if(void 0===t)return w;if("string"==typeof t){if("b"===t.charAt(0))return e.decodeBase64Packet(t.substr(1),n);if(r&&(t=a(t),t===!1))return w;var o=t.charAt(0);return Number(o)==o&&b[o]?t.length>1?{type:b[o],data:t.substring(1)}:{type:b[o]}:w}var i=new Uint8Array(t),o=i[0],s=f(t,1);return k&&"blob"===n&&(s=new k([s])),{type:b[o],data:s}},e.decodeBase64Packet=function(t,e){var n=b[t.charAt(0)];if(!p)return{type:n,data:{base64:!0,data:t.substr(1)}};var r=p.decode(t.substr(1));return"blob"===e&&k&&(r=new k([r])),{type:n,data:r}},e.encodePayload=function(t,n,r){function o(t){return t.length+":"+t}function i(t,r){e.encodePacket(t,!!s&&n,!1,function(t){r(null,o(t))})}"function"==typeof n&&(r=n,n=null);var s=h(t);return n&&s?k&&!g?e.encodePayloadAsBlob(t,r):e.encodePayloadAsArrayBuffer(t,r):t.length?void c(t,i,function(t,e){return r(e.join(""))}):r("0:")},e.decodePayload=function(t,n,r){if("string"!=typeof t)return e.decodePayloadAsBinary(t,n,r);"function"==typeof n&&(r=n,n=null);var o;if(""===t)return r(w,0,1);for(var i,s,a="",c=0,p=t.length;c<p;c++){var u=t.charAt(c);if(":"===u){if(""===a||a!=(i=Number(a)))return r(w,0,1);if(s=t.substr(c+1,i),a!=s.length)return r(w,0,1);if(s.length){if(o=e.decodePacket(s,n,!1),w.type===o.type&&w.data===o.data)return r(w,0,1);var h=r(o,c+i,p);if(!1===h)return}c+=i,a=""}else a+=u}return""!==a?r(w,0,1):void 0},e.encodePayloadAsArrayBuffer=function(t,n){function r(t,n){e.encodePacket(t,!0,!0,function(t){return n(null,t)})}return t.length?void c(t,r,function(t,e){var r=e.reduce(function(t,e){var n;return n="string"==typeof e?e.length:e.byteLength,t+n.toString().length+n+2},0),o=new Uint8Array(r),i=0;return e.forEach(function(t){var e="string"==typeof t,n=t;if(e){for(var r=new Uint8Array(t.length),s=0;s<t.length;s++)r[s]=t.charCodeAt(s);n=r.buffer}e?o[i++]=0:o[i++]=1;for(var a=n.byteLength.toString(),s=0;s<a.length;s++)o[i++]=parseInt(a[s]);o[i++]=255;for(var r=new Uint8Array(n),s=0;s<r.length;s++)o[i++]=r[s]}),n(o.buffer)}):n(new ArrayBuffer(0))},e.encodePayloadAsBlob=function(t,n){function r(t,n){e.encodePacket(t,!0,!0,function(t){var e=new Uint8Array(1);if(e[0]=1,"string"==typeof t){for(var r=new Uint8Array(t.length),o=0;o<t.length;o++)r[o]=t.charCodeAt(o);t=r.buffer,e[0]=0}for(var i=t instanceof ArrayBuffer?t.byteLength:t.size,s=i.toString(),a=new Uint8Array(s.length+1),o=0;o<s.length;o++)a[o]=parseInt(s[o]);if(a[s.length]=255,k){var c=new k([e.buffer,a.buffer,t]);n(null,c)}})}c(t,r,function(t,e){return n(new k(e))})},e.decodePayloadAsBinary=function(t,n,r){"function"==typeof n&&(r=n,n=null);for(var o=t,i=[];o.byteLength>0;){for(var s=new Uint8Array(o),a=0===s[0],c="",p=1;255!==s[p];p++){if(c.length>310)return r(w,0,1);c+=s[p]}o=f(o,2+c.length),c=parseInt(c);var u=f(o,0,c);if(a)try{u=String.fromCharCode.apply(null,new Uint8Array(u))}catch(h){var l=new Uint8Array(u);u="";for(var p=0;p<l.length;p++)u+=String.fromCharCode(l[p])}i.push(u),o=f(o,c)}var d=i.length;i.forEach(function(t,o){r(e.decodePacket(t,n,!0),o,d)})}}).call(e,function(){return this}())},function(t,e){t.exports=Object.keys||function(t){var e=[],n=Object.prototype.hasOwnProperty;for(var r in t)n.call(t,r)&&e.push(r);return e}},function(t,e){t.exports=function(t,e,n){var r=t.byteLength;if(e=e||0,n=n||r,t.slice)return t.slice(e,n);if(e<0&&(e+=r),n<0&&(n+=r),n>r&&(n=r),e>=r||e>=n||0===r)return new ArrayBuffer(0);for(var o=new Uint8Array(t),i=new Uint8Array(n-e),s=e,a=0;s<n;s++,a++)i[a]=o[s];return i.buffer}},function(t,e){function n(t,e,n){function o(t,r){if(o.count<=0)throw new Error("after called too many times");--o.count,t?(i=!0,e(t),e=n):0!==o.count||i||e(null,r)}var i=!1;return n=n||r,o.count=t,0===t?e():o}function r(){}t.exports=n},function(t,e,n){var r;(function(t,o){!function(i){function s(t){for(var e,n,r=[],o=0,i=t.length;o<i;)e=t.charCodeAt(o++),e>=55296&&e<=56319&&o<i?(n=t.charCodeAt(o++),56320==(64512&n)?r.push(((1023&e)<<10)+(1023&n)+65536):(r.push(e),o--)):r.push(e);return r}function a(t){for(var e,n=t.length,r=-1,o="";++r<n;)e=t[r],e>65535&&(e-=65536,o+=w(e>>>10&1023|55296),e=56320|1023&e),o+=w(e);return o}function c(t,e){if(t>=55296&&t<=57343){if(e)throw Error("Lone surrogate U+"+t.toString(16).toUpperCase()+" is not a scalar value");return!1}return!0}function p(t,e){return w(t>>e&63|128)}function u(t,e){if(0==(4294967168&t))return w(t);var n="";return 0==(4294965248&t)?n=w(t>>6&31|192):0==(4294901760&t)?(c(t,e)||(t=65533),n=w(t>>12&15|224),n+=p(t,6)):0==(4292870144&t)&&(n=w(t>>18&7|240),n+=p(t,12),n+=p(t,6)),n+=w(63&t|128)}function h(t,e){e=e||{};for(var n,r=!1!==e.strict,o=s(t),i=o.length,a=-1,c="";++a<i;)n=o[a],c+=u(n,r);return c}function f(){if(b>=v)throw Error("Invalid byte index");var t=255&g[b];if(b++,128==(192&t))return 63&t;throw Error("Invalid continuation byte")}function l(t){var e,n,r,o,i;if(b>v)throw Error("Invalid byte index");if(b==v)return!1;if(e=255&g[b],b++,0==(128&e))return e;if(192==(224&e)){if(n=f(),i=(31&e)<<6|n,i>=128)return i;throw Error("Invalid continuation byte")}if(224==(240&e)){if(n=f(),r=f(),i=(15&e)<<12|n<<6|r,i>=2048)return c(i,t)?i:65533;throw Error("Invalid continuation byte")}if(240==(248&e)&&(n=f(),r=f(),o=f(),i=(7&e)<<18|n<<12|r<<6|o,i>=65536&&i<=1114111))return i;throw Error("Invalid UTF-8 detected")}function d(t,e){e=e||{};var n=!1!==e.strict;g=s(t),v=g.length,b=0;for(var r,o=[];(r=l(n))!==!1;)o.push(r);return a(o)}var y="object"==typeof e&&e,m=("object"==typeof t&&t&&t.exports==y&&t,"object"==typeof o&&o);m.global!==m&&m.window!==m||(i=m);var g,v,b,w=String.fromCharCode,k={version:"2.1.2",encode:h,decode:d};r=function(){return k}.call(e,n,e,t),!(void 0!==r&&(t.exports=r))}(this)}).call(e,n(27)(t),function(){return this}())},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children=[],t.webpackPolyfill=1),t}},function(t,e){!function(){"use strict";for(var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",n=new Uint8Array(256),r=0;r<t.length;r++)n[t.charCodeAt(r)]=r;e.encode=function(e){var n,r=new Uint8Array(e),o=r.length,i="";for(n=0;n<o;n+=3)i+=t[r[n]>>2],i+=t[(3&r[n])<<4|r[n+1]>>4],i+=t[(15&r[n+1])<<2|r[n+2]>>6],i+=t[63&r[n+2]];return o%3===2?i=i.substring(0,i.length-1)+"=":o%3===1&&(i=i.substring(0,i.length-2)+"=="),i},e.decode=function(t){var e,r,o,i,s,a=.75*t.length,c=t.length,p=0;"="===t[t.length-1]&&(a--,"="===t[t.length-2]&&a--);var u=new ArrayBuffer(a),h=new Uint8Array(u);for(e=0;e<c;e+=4)r=n[t.charCodeAt(e)],o=n[t.charCodeAt(e+1)],i=n[t.charCodeAt(e+2)],s=n[t.charCodeAt(e+3)],h[p++]=r<<2|o>>4,h[p++]=(15&o)<<4|i>>2,h[p++]=(3&i)<<6|63&s;return u}}()},function(t,e){(function(e){function n(t){for(var e=0;e<t.length;e++){var n=t[e];if(n.buffer instanceof ArrayBuffer){var r=n.buffer;if(n.byteLength!==r.byteLength){var o=new Uint8Array(n.byteLength);o.set(new Uint8Array(r,n.byteOffset,n.byteLength)),r=o.buffer}t[e]=r}}}function r(t,e){e=e||{};var r=new i;n(t);for(var o=0;o<t.length;o++)r.append(t[o]);return e.type?r.getBlob(e.type):r.getBlob()}function o(t,e){return n(t),new Blob(t,e||{})}var i=e.BlobBuilder||e.WebKitBlobBuilder||e.MSBlobBuilder||e.MozBlobBuilder,s=function(){try{var t=new Blob(["hi"]);return 2===t.size}catch(e){return!1}}(),a=s&&function(){try{var t=new Blob([new Uint8Array([1,2])]);return 2===t.size}catch(e){return!1}}(),c=i&&i.prototype.append&&i.prototype.getBlob;t.exports=function(){return s?a?e.Blob:o:c?r:void 0}()}).call(e,function(){return this}())},function(t,e){e.encode=function(t){var e="";for(var n in t)t.hasOwnProperty(n)&&(e.length&&(e+="&"),e+=encodeURIComponent(n)+"="+encodeURIComponent(t[n]));return e},e.decode=function(t){for(var e={},n=t.split("&"),r=0,o=n.length;r<o;r++){var i=n[r].split("=");e[decodeURIComponent(i[0])]=decodeURIComponent(i[1])}return e}},function(t,e){t.exports=function(t,e){var n=function(){};n.prototype=e.prototype,t.prototype=new n,t.prototype.constructor=t}},function(t,e){"use strict";function n(t){var e="";do e=s[t%a]+e,t=Math.floor(t/a);while(t>0);return e}function r(t){var e=0;for(u=0;u<t.length;u++)e=e*a+c[t.charAt(u)];return e}function o(){var t=n(+new Date);return t!==i?(p=0,i=t):t+"."+n(p++)}for(var i,s="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),a=64,c={},p=0,u=0;u<a;u++)c[s[u]]=u;o.encode=n,o.decode=r,t.exports=o},function(t,e,n){(function(e){function r(){}function o(t){i.call(this,t),this.query=this.query||{},a||(e.___eio||(e.___eio=[]),a=e.___eio),this.index=a.length;var n=this;a.push(function(t){n.onData(t)}),this.query.j=this.index,e.document&&e.addEventListener&&e.addEventListener("beforeunload",function(){n.script&&(n.script.onerror=r)},!1)}var i=n(20),s=n(31);t.exports=o;var a,c=/\n/g,p=/\\n/g;s(o,i),o.prototype.supportsBinary=!1,o.prototype.doClose=function(){this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),this.form&&(this.form.parentNode.removeChild(this.form),this.form=null,this.iframe=null),i.prototype.doClose.call(this)},o.prototype.doPoll=function(){var t=this,e=document.createElement("script");this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),e.async=!0,e.src=this.uri(),e.onerror=function(e){t.onError("jsonp poll error",e)};var n=document.getElementsByTagName("script")[0];n?n.parentNode.insertBefore(e,n):(document.head||document.body).appendChild(e),this.script=e;var r="undefined"!=typeof navigator&&/gecko/i.test(navigator.userAgent);r&&setTimeout(function(){var t=document.createElement("iframe");document.body.appendChild(t),document.body.removeChild(t)},100)},o.prototype.doWrite=function(t,e){function n(){r(),e()}function r(){if(o.iframe)try{o.form.removeChild(o.iframe)}catch(t){o.onError("jsonp polling iframe removal error",t)}try{var e='<iframe src="javascript:0" name="'+o.iframeId+'">';i=document.createElement(e)}catch(t){i=document.createElement("iframe"),i.name=o.iframeId,i.src="javascript:0"}i.id=o.iframeId,o.form.appendChild(i),o.iframe=i}var o=this;if(!this.form){var i,s=document.createElement("form"),a=document.createElement("textarea"),u=this.iframeId="eio_iframe_"+this.index;s.className="socketio",s.style.position="absolute",s.style.top="-1000px",s.style.left="-1000px",s.target=u,s.method="POST",s.setAttribute("accept-charset","utf-8"),a.name="d",s.appendChild(a),document.body.appendChild(s),this.form=s,this.area=a}this.form.action=this.uri(),r(),t=t.replace(p,"\\\n"),this.area.value=t.replace(c,"\\n");try{this.form.submit()}catch(h){}this.iframe.attachEvent?this.iframe.onreadystatechange=function(){"complete"===o.iframe.readyState&&n()}:this.iframe.onload=n}}).call(e,function(){return this}())},function(t,e,n){(function(e){function r(t){var e=t&&t.forceBase64;e&&(this.supportsBinary=!1),this.perMessageDeflate=t.perMessageDeflate,this.usingBrowserWebSocket=h&&!t.forceNode,this.protocols=t.protocols,this.usingBrowserWebSocket||(l=o),i.call(this,t)}var o,i=n(21),s=n(22),a=n(30),c=n(31),p=n(32),u=n(3)("engine.io-client:websocket"),h=e.WebSocket||e.MozWebSocket;if("undefined"==typeof window)try{o=n(35)}catch(f){}var l=h;l||"undefined"!=typeof window||(l=o),t.exports=r,c(r,i),r.prototype.name="websocket",r.prototype.supportsBinary=!0,r.prototype.doOpen=function(){if(this.check()){var t=this.uri(),e=this.protocols,n={agent:this.agent,perMessageDeflate:this.perMessageDeflate};n.pfx=this.pfx,n.key=this.key,n.passphrase=this.passphrase,n.cert=this.cert,n.ca=this.ca,n.ciphers=this.ciphers,n.rejectUnauthorized=this.rejectUnauthorized,this.extraHeaders&&(n.headers=this.extraHeaders),this.localAddress&&(n.localAddress=this.localAddress);try{this.ws=this.usingBrowserWebSocket?e?new l(t,e):new l(t):new l(t,e,n)}catch(r){return this.emit("error",r)}void 0===this.ws.binaryType&&(this.supportsBinary=!1),this.ws.supports&&this.ws.supports.binary?(this.supportsBinary=!0,this.ws.binaryType="nodebuffer"):this.ws.binaryType="arraybuffer",this.addEventListeners()}},r.prototype.addEventListeners=function(){var t=this;this.ws.onopen=function(){t.onOpen()},this.ws.onclose=function(){t.onClose()},this.ws.onmessage=function(e){t.onData(e.data)},this.ws.onerror=function(e){t.onError("websocket error",e)}},r.prototype.write=function(t){function n(){r.emit("flush"),setTimeout(function(){r.writable=!0,r.emit("drain")},0)}var r=this;this.writable=!1;for(var o=t.length,i=0,a=o;i<a;i++)!function(t){s.encodePacket(t,r.supportsBinary,function(i){if(!r.usingBrowserWebSocket){var s={};if(t.options&&(s.compress=t.options.compress),r.perMessageDeflate){var a="string"==typeof i?e.Buffer.byteLength(i):i.length;a<r.perMessageDeflate.threshold&&(s.compress=!1)}}try{r.usingBrowserWebSocket?r.ws.send(i):r.ws.send(i,s)}catch(c){u("websocket closed before onclose event")}--o||n()})}(t[i])},r.prototype.onClose=function(){i.prototype.onClose.call(this)},r.prototype.doClose=function(){"undefined"!=typeof this.ws&&this.ws.close()},r.prototype.uri=function(){var t=this.query||{},e=this.secure?"wss":"ws",n="";this.port&&("wss"===e&&443!==Number(this.port)||"ws"===e&&80!==Number(this.port))&&(n=":"+this.port),this.timestampRequests&&(t[this.timestampParam]=p()),this.supportsBinary||(t.b64=1),t=a.encode(t),t.length&&(t="?"+t);var r=this.hostname.indexOf(":")!==-1;return e+"://"+(r?"["+this.hostname+"]":this.hostname)+n+this.path+t},r.prototype.check=function(){return!(!l||"__initialize"in l&&this.name===r.prototype.name)}}).call(e,function(){return this}())},function(t,e){},function(t,e){var n=[].indexOf;t.exports=function(t,e){if(n)return t.indexOf(e);for(var r=0;r<t.length;++r)if(t[r]===e)return r;return-1}},function(t,e,n){"use strict";function r(t,e,n){this.io=t,this.nsp=e,this.json=this,this.ids=0,this.acks={},this.receiveBuffer=[],this.sendBuffer=[],this.connected=!1,this.disconnected=!0,n&&n.query&&(this.query=n.query),this.io.autoConnect&&this.open()}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i=n(7),s=n(8),a=n(38),c=n(39),p=n(40),u=n(3)("socket.io-client:socket"),h=n(30);t.exports=e=r;var f={connect:1,connect_error:1,connect_timeout:1,connecting:1,disconnect:1,error:1,reconnect:1,reconnect_attempt:1,reconnect_failed:1,reconnect_error:1,reconnecting:1,ping:1,pong:1},l=s.prototype.emit;s(r.prototype),r.prototype.subEvents=function(){if(!this.subs){var t=this.io;this.subs=[c(t,"open",p(this,"onopen")),c(t,"packet",p(this,"onpacket")),c(t,"close",p(this,"onclose"))]}},r.prototype.open=r.prototype.connect=function(){return this.connected?this:(this.subEvents(),this.io.open(),"open"===this.io.readyState&&this.onopen(),this.emit("connecting"),this)},r.prototype.send=function(){var t=a(arguments);return t.unshift("message"),this.emit.apply(this,t),this},r.prototype.emit=function(t){if(f.hasOwnProperty(t))return l.apply(this,arguments),this;var e=a(arguments),n={type:i.EVENT,data:e};return n.options={},n.options.compress=!this.flags||!1!==this.flags.compress,"function"==typeof e[e.length-1]&&(u("emitting packet with ack id %d",this.ids),this.acks[this.ids]=e.pop(),n.id=this.ids++),this.connected?this.packet(n):this.sendBuffer.push(n),delete this.flags,this},r.prototype.packet=function(t){t.nsp=this.nsp,this.io.packet(t)},r.prototype.onopen=function(){if(u("transport is open - connecting"),"/"!==this.nsp)if(this.query){var t="object"===o(this.query)?h.encode(this.query):this.query;u("sending connect packet with query %s",t),this.packet({type:i.CONNECT,query:t})}else this.packet({type:i.CONNECT})},r.prototype.onclose=function(t){u("close (%s)",t),this.connected=!1,this.disconnected=!0,delete this.id,this.emit("disconnect",t)},r.prototype.onpacket=function(t){if(t.nsp===this.nsp)switch(t.type){case i.CONNECT:this.onconnect();break;case i.EVENT:this.onevent(t);break;case i.BINARY_EVENT:this.onevent(t);break;case i.ACK:this.onack(t);break;case i.BINARY_ACK:this.onack(t);break;case i.DISCONNECT:this.ondisconnect();break;case i.ERROR:this.emit("error",t.data)}},r.prototype.onevent=function(t){var e=t.data||[];u("emitting event %j",e),null!=t.id&&(u("attaching ack callback to event"),e.push(this.ack(t.id))),this.connected?l.apply(this,e):this.receiveBuffer.push(e)},r.prototype.ack=function(t){var e=this,n=!1;return function(){if(!n){n=!0;var r=a(arguments);u("sending ack %j",r),e.packet({type:i.ACK,id:t,data:r})}}},r.prototype.onack=function(t){var e=this.acks[t.id];"function"==typeof e?(u("calling ack %s with %j",t.id,t.data),e.apply(this,t.data),delete this.acks[t.id]):u("bad ack %s",t.id)},r.prototype.onconnect=function(){this.connected=!0,this.disconnected=!1,this.emit("connect"),this.emitBuffered()},r.prototype.emitBuffered=function(){var t;for(t=0;t<this.receiveBuffer.length;t++)l.apply(this,this.receiveBuffer[t]);for(this.receiveBuffer=[],t=0;t<this.sendBuffer.length;t++)this.packet(this.sendBuffer[t]);this.sendBuffer=[]},r.prototype.ondisconnect=function(){u("server disconnect (%s)",this.nsp),this.destroy(),this.onclose("io server disconnect")},r.prototype.destroy=function(){if(this.subs){for(var t=0;t<this.subs.length;t++)this.subs[t].destroy();this.subs=null}this.io.destroy(this)},r.prototype.close=r.prototype.disconnect=function(){return this.connected&&(u("performing disconnect (%s)",this.nsp),this.packet({type:i.DISCONNECT})),this.destroy(),this.connected&&this.onclose("io client disconnect"),this},r.prototype.compress=function(t){return this.flags=this.flags||{},this.flags.compress=t,this}},function(t,e){function n(t,e){var n=[];e=e||0;for(var r=e||0;r<t.length;r++)n[r-e]=t[r];return n}t.exports=n},function(t,e){"use strict";function n(t,e,n){return t.on(e,n),{destroy:function(){t.removeListener(e,n)}}}t.exports=n},function(t,e){var n=[].slice;t.exports=function(t,e){if("string"==typeof e&&(e=t[e]),"function"!=typeof e)throw new Error("bind() requires a function");var r=n.call(arguments,2);return function(){return e.apply(t,r.concat(n.call(arguments)))}}},function(t,e){function n(t){t=t||{},this.ms=t.min||100,this.max=t.max||1e4,this.factor=t.factor||2,this.jitter=t.jitter>0&&t.jitter<=1?t.jitter:0,this.attempts=0}t.exports=n,n.prototype.duration=function(){var t=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var e=Math.random(),n=Math.floor(e*this.jitter*t);t=0==(1&Math.floor(10*e))?t-n:t+n}return 0|Math.min(t,this.max)},n.prototype.reset=function(){this.attempts=0},n.prototype.setMin=function(t){this.ms=t},n.prototype.setMax=function(t){this.max=t},n.prototype.setJitter=function(t){this.jitter=t}}])});
	//# sourceMappingURL=socket.io.js.map

/***/ }),
/* 4 */
/*!***********************************!*\
  !*** ./~/react-emojione/index.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./lib/react-emojione */ 5);


/***/ }),
/* 5 */
/*!************************************************!*\
  !*** ./~/react-emojione/lib/react-emojione.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.emojify = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /*!
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * react-emojione
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Copyright(c) 2017 Pedro Ladaria
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * MIT Licensed
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Emoji provided free by http://emojione.com
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */
	
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _asciiToUnicode = __webpack_require__(/*! ./data/ascii-to-unicode */ 6);
	
	var _asciiToUnicode2 = _interopRequireDefault(_asciiToUnicode);
	
	var _rendererFactory = __webpack_require__(/*! ./renderers/renderer-factory */ 7);
	
	var _rendererFactory2 = _interopRequireDefault(_rendererFactory);
	
	var _emojiFormatConversion = __webpack_require__(/*! ./utils/emoji-format-conversion */ 11);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DEFAULT_OPTIONS = {
	    convertShortnames: true,
	    convertUnicode: true,
	    convertAscii: true,
	    style: {
	        backgroundImage: 'url(https://github.com/pladaria/react-emojione/blob/emojione3/assets/sprites/emojione-3.1.2-64x64.png?raw=true)'
	    },
	    onClick: undefined,
	    output: 'emoji' // valid options: 'emoji', 'unicode'
	};
	
	var asciiToUnicodeCache = new Map();
	var asciiRegExpToUnicode = new Map();
	
	_asciiToUnicode2.default.forEach(function (_ref) {
	    var _ref2 = _slicedToArray(_ref, 2),
	        reStr = _ref2[0],
	        unicode = _ref2[1];
	
	    return asciiRegExpToUnicode.set(RegExp(reStr), unicode);
	});
	
	// Escape RegExp code borrowed from lodash
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	var reHasRegExpChar = RegExp(reRegExpChar.source);
	var escapeRegExp = function escapeRegExp(s) {
	    return s && reHasRegExpChar.test(s) ? s.replace(reRegExpChar, '\\$&') : s;
	};
	
	var convertAsciiToUnicodeOrNull = function convertAsciiToUnicodeOrNull(text) {
	    if (!text) {
	        return '';
	    }
	    var str = String(text);
	    if (asciiToUnicodeCache.has(str)) {
	        return asciiToUnicodeCache.get(str);
	    }
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	        for (var _iterator = asciiRegExpToUnicode.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var _step$value = _slicedToArray(_step.value, 2),
	                regExp = _step$value[0],
	                unicode = _step$value[1];
	
	            if (str.replace(regExp, unicode) === unicode) {
	                asciiToUnicodeCache.set(str, unicode);
	                return unicode;
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
	
	    return null;
	};
	
	var asciiRegexStr = _asciiToUnicode2.default.map(function (_ref3) {
	    var _ref4 = _slicedToArray(_ref3, 1),
	        reStr = _ref4[0];
	
	    return reStr;
	}).join('|');
	var unicodesRegexStr = _emojiFormatConversion.unicodes.map(escapeRegExp).join('|');
	var shortnamesRegexStr = ':[+-\\d\\w]+:';
	
	var REGEX_CACHE = [];
	
	var getRegex = function getRegex(withUnicode, withAscii, withShortnames) {
	    var index = (withUnicode ? 1 : 0) + (withAscii ? 2 : 0) + (withShortnames ? 4 : 0);
	    if (!REGEX_CACHE[index]) {
	        var parts = [withShortnames ? shortnamesRegexStr : '', withUnicode ? unicodesRegexStr : '', withAscii ? asciiRegexStr : ''].filter(Boolean);
	        REGEX_CACHE[index] = RegExp('(' + parts.join('|') + ')');
	    }
	    return REGEX_CACHE[index];
	};
	
	var startsWithSpace = function startsWithSpace(str) {
	    return (/^\s/.test(str)
	    );
	};
	var endsWithSpace = function endsWithSpace(str) {
	    return (/\s$/.test(str)
	    );
	};
	
	var shouldConvertAscii = function shouldConvertAscii(parts, index) {
	    if (parts.length === 1) {
	        return true;
	    }
	    if (index === 0) {
	        return startsWithSpace(parts[index + 1]);
	    }
	    if (index === parts.length - 1) {
	        return endsWithSpace(parts[index - 1]);
	    }
	    return endsWithSpace(parts[index - 1]) && startsWithSpace(parts[index + 1]);
	};
	
	var emojify = exports.emojify = function emojify(str) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	
	    var mergedOptions = Object.assign({}, DEFAULT_OPTIONS, options);
	
	    var convertShortnames = mergedOptions.convertShortnames,
	        convertUnicode = mergedOptions.convertUnicode,
	        convertAscii = mergedOptions.convertAscii;
	
	
	    var regExp = getRegex(convertUnicode, convertAscii, convertShortnames);
	
	    var renderCodepoint = (0, _rendererFactory2.default)(mergedOptions);
	
	    var convertedParts = str.split(regExp).filter(Boolean).map(function (part, index, parts) {
	        if (convertAscii && shouldConvertAscii(parts, index)) {
	            var unicode = convertAsciiToUnicodeOrNull(part);
	            if (unicode) {
	                return renderCodepoint(_emojiFormatConversion.unicodeToCodepoint.get(unicode), 'a-' + index);
	            }
	        }
	        if (convertShortnames && _emojiFormatConversion.shortToCodepoint.has(part)) {
	            return renderCodepoint(_emojiFormatConversion.shortToCodepoint.get(part), 's-' + index);
	        }
	        if (convertUnicode && _emojiFormatConversion.unicodeToCodepoint.has(part)) {
	            return renderCodepoint(_emojiFormatConversion.unicodeToCodepoint.get(part), 'u-' + index);
	        }
	        return part;
	    });
	
	    return mergedOptions.output === 'unicode' ? convertedParts.join('') : convertedParts;
	};
	
	var Emojify = function (_React$Component) {
	    _inherits(Emojify, _React$Component);
	
	    function Emojify() {
	        _classCallCheck(this, Emojify);
	
	        return _possibleConstructorReturn(this, (Emojify.__proto__ || Object.getPrototypeOf(Emojify)).apply(this, arguments));
	    }
	
	    _createClass(Emojify, [{
	        key: 'traverse',
	        value: function traverse(children, options) {
	            var _this2 = this;
	
	            return _react2.default.Children.map(children, function (child) {
	                if (_react2.default.isValidElement(child)) {
	                    return _react2.default.cloneElement(child, {}, _this2.traverse(child.props.children, options));
	                }
	                if (typeof child === 'string') {
	                    return emojify(child, options);
	                }
	                return child;
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var children = this.props.children;
	            return _react2.default.Children.count(children) ? this.traverse(children, this.props) : null;
	        }
	    }]);
	
	    return Emojify;
	}(_react2.default.Component);
	
	exports.default = Emojify;

/***/ }),
/* 6 */
/*!*******************************************************!*\
  !*** ./~/react-emojione/lib/data/ascii-to-unicode.js ***!
  \*******************************************************/
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Ascii smiley to unicode table
	 *
	 * The order is important! O:) must be before :)
	 */
	exports.default = [
	// angry
	['>?:-?\\[', '😡'], // >:[ >:-[ :[ :-[
	['>:-?\\(', '😠'], // >:( >:-(
	['\\]:-?[\\/]', '👿'], // ]:\ ]:/ ]:-\ ]:-/
	// sweat
	['-_+-[uU]', '😓'], // -_-u -__-u ...
	["':-?\\|", '😓'], // ':| ':-|
	["':-?\\[", '😰'], // ':[ ':-[
	["':-?\\(", '😥'], // ':( ':-(
	["':-?\\)", '😅'], // ':) ':-)
	['\\^_*\\^[uU]', '😅'], // ^_^u ^__^U ...
	["'=-?\\)", '😅'], // '=) '=-)
	// cool
	['B-?\\)', '😎'], // B) B-)
	[']:-?\\)', '😈'], ['[oO]:-?\\)', '😇'], // o:) O:) o:-) ...
	// happy
	[':-?\\)', '🙂'], // :) :-)
	[':-?D', '😃'], // :D :-D
	['=-?\\)', '😊'], // =) =-)
	[':-?>', '😁'], // :> :->
	['[xX]-?DDD+', '🤣'], // xDDD x-DDD
	['[xX]-?DD+', '😂'], // xDD x-DD
	['[xX]-?D', '😆'], // xD x-D
	['\\^_*\\^', '😄'], // ^^ ^_^ ^__^ ...
	// sad
	[':-?\\(', '🙁'], // :( :-(
	// wink
	[';-?\\)', '😉'], // ;) ;-)
	// tonge
	[':-?[pPÞþ]', '😛'], // :p :P :Þ :þ :-p :-P :-Þ :-þ
	[';-?[pPÞþ]', '😜'], // ;p ;P ;Þ ;þ ;-p ;-P ;-Þ ;-þ
	['[:;]-?[d]', '😋'], // :d :-d ;d ;-d
	['[xX]-[pPÞþd]', '😝'], // x-p X-P
	// love
	['<3', '❤️'], // <3
	['<[\\\\/]3', '💔'], // <\3 </3
	['=-?\\*', '😙'], //  =* =-*
	[';-?\\*+', '😘'], // ;* ;-* ;** ;-** ...
	[':-?\\*\\*+', '😘'], // :* :-*
	[':-?\\*+', '😗'], // :* :-*
	// cry
	['[:;=][\'_]-?\\(', '😢'], ['[xX][\'_]-?\\(', '😭'], ['T_+T', '😭'], // T_T T__T ...
	// confused / surprise
	[':-?[sS]', '😖'], // :s :-s :S :-S
	[':-?[oO]', '😮'], // :o :O :-o :-O
	// sleep
	['-_+-[zZ]+', '😪'], // -_-zZz ...
	['u_+u[zZ]+', '😴'], // u_uzZz ...
	// scared
	['D-?:', '😦'], // D: D-:
	[':-?[cC]', '😦'], // :c :-c :C :-C
	['D-X', '😫'], // D-X
	['[x]_+[xX]', '😲'], // x_x x__x ...
	['[X]_+[xX]', '😵'], // X_X X__X ...
	['[oO]_+[oO]', '😱'], // o_o o__O O___O ...
	// misc
	['-_+-', '😑'], // -_- -__- -___- ...
	[':-?\\\\', '😕'], // :\ :-\
	[':-?/(?!\\/)', '😕'], // :/ :-/
	[':-?\\|', '😐'], // :| :-|
	['[uv]_+[uv]', '😔'], // u_u v_v u__u v___v ...
	['[xX]-?\\(', '😣'], // x( x-( X( X-(
	['¬_*¬', '😒'] // ¬¬ ¬_¬ ¬__¬ ...
	];

/***/ }),
/* 7 */
/*!************************************************************!*\
  !*** ./~/react-emojione/lib/renderers/renderer-factory.js ***!
  \************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _emojiRenderer = __webpack_require__(/*! ./emoji-renderer */ 8);
	
	var _emojiRenderer2 = _interopRequireDefault(_emojiRenderer);
	
	var _unicodeRenderer = __webpack_require__(/*! ./unicode-renderer */ 13);
	
	var _unicodeRenderer2 = _interopRequireDefault(_unicodeRenderer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var rendererForOutputFormat = {
	    emoji: _emojiRenderer2.default,
	    unicode: _unicodeRenderer2.default
	};
	
	var getRenderer = function getRenderer(config) {
	    var renderer = rendererForOutputFormat[config.output] || rendererForOutputFormat.emoji;
	    return renderer(config);
	};
	
	exports.default = getRenderer;

/***/ }),
/* 8 */
/*!**********************************************************!*\
  !*** ./~/react-emojione/lib/renderers/emoji-renderer.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _emojioneSprite = __webpack_require__(/*! ../styles/emojione-sprite */ 9);
	
	var _emojiFormatConversion = __webpack_require__(/*! ../utils/emoji-format-conversion */ 11);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Emoji = function Emoji(_ref) {
	    var codepoint = _ref.codepoint,
	        _ref$style = _ref.style,
	        style = _ref$style === undefined ? {} : _ref$style,
	        onClick = _ref.onClick;
	    return _react2.default.createElement(
	        'span',
	        {
	            onClick: onClick,
	            style: (0, _emojioneSprite.sprite)(codepoint, style),
	            title: _emojiFormatConversion.codepointToShort.get(codepoint)
	        },
	        _emojiFormatConversion.codepointToUnicode.get(codepoint)
	    );
	};
	
	var getRenderer = function getRenderer(_ref2) {
	    var style = _ref2.style,
	        onClick = _ref2.onClick;
	    return function (codepoint, key) {
	        return _react2.default.createElement(Emoji, {
	            codepoint: codepoint,
	            style: style,
	            onClick: onClick,
	            key: key
	        });
	    };
	};
	
	exports.default = getRenderer;

/***/ }),
/* 9 */
/*!********************************************************!*\
  !*** ./~/react-emojione/lib/styles/emojione-sprite.js ***!
  \********************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.sprite = undefined;
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _emojioneSpritePositions = __webpack_require__(/*! ./emojione-sprite-positions */ 10);
	
	var _emojioneSpritePositions2 = _interopRequireDefault(_emojioneSpritePositions);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var SPRITE_WIDTH = 4160;
	var EMOJI_SIZE = 64;
	
	var base = {
	    textIndent: '-9999em',
	    imageRendering: 'optimizeQuality',
	    fontSize: 'inherit',
	    height: 32,
	    width: 32,
	    top: -3,
	    position: 'relative',
	    display: 'inline-block',
	    margin: '0 .15em',
	    lineHeight: 'normal',
	    verticalAlign: 'middle',
	    backgroundImage: 'url("https://github.com/pladaria/react-emojione/blob/emojione3/assets/sprites/emojione-3.1.2-64x64.png?raw=true")',
	    backgroundRepeat: 'no-repeat'
	};
	
	var sprite = exports.sprite = function sprite(codepoint) {
	    var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    var result = Object.assign({}, base, style);
	
	    // ensure square size
	    var size = parseInt(result.height);
	    result.height = size;
	    result.width = size;
	
	    var scale = size / EMOJI_SIZE;
	
	    var _ref = _emojioneSpritePositions2.default[codepoint] || [],
	        _ref2 = _slicedToArray(_ref, 2),
	        x = _ref2[0],
	        y = _ref2[1];
	
	    var left = x * EMOJI_SIZE + x;
	    var top = y * EMOJI_SIZE + y;
	
	    result.backgroundPosition = '-' + left * scale + 'px -' + top * scale + 'px';
	
	    result.backgroundSize = SPRITE_WIDTH * scale + 'px';
	
	    return result;
	};

/***/ }),
/* 10 */
/*!******************************************************************!*\
  !*** ./~/react-emojione/lib/styles/emojione-sprite-positions.js ***!
  \******************************************************************/
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/*eslint-disable*/
	// Do not edit!
	// This file was auto-generated by create-sprites.js
	exports.default = {
	  "2614": [25, 7],
	  "2615": [12, 28],
	  "2648": [14, 0],
	  "2649": [15, 0],
	  "2650": [16, 0],
	  "2651": [17, 0],
	  "2652": [18, 0],
	  "2653": [19, 0],
	  "2693": [47, 29],
	  "2705": [25, 0],
	  "2728": [27, 7],
	  "2753": [32, 0],
	  "2754": [33, 0],
	  "2755": [34, 0],
	  "2757": [35, 0],
	  "2795": [38, 0],
	  "2796": [39, 0],
	  "2797": [40, 0],
	  "2049-fe0f": [0, 0],
	  "2122-fe0f": [1, 0],
	  "2139-fe0f": [2, 0],
	  "2194-fe0f": [3, 0],
	  "2195-fe0f": [4, 0],
	  "2196-fe0f": [5, 0],
	  "2197-fe0f": [6, 0],
	  "2198-fe0f": [7, 0],
	  "2199-fe0f": [8, 0],
	  "2611-fe0f": [9, 0],
	  "2622-fe0f": [10, 0],
	  "2623-fe0f": [11, 0],
	  "2626-fe0f": [12, 0],
	  "2638-fe0f": [13, 0],
	  "2660-fe0f": [20, 0],
	  "2663-fe0f": [21, 0],
	  "2665-fe0f": [22, 0],
	  "2666-fe0f": [23, 0],
	  "2668-fe0f": [24, 0],
	  "2714-fe0f": [26, 0],
	  "2716-fe0f": [27, 0],
	  "2721-fe0f": [28, 0],
	  "2733-fe0f": [29, 0],
	  "2734-fe0f": [30, 0],
	  "2747-fe0f": [31, 0],
	  "2763-fe0f": [36, 0],
	  "2764-fe0f": [37, 0],
	  "2934-fe0f": [41, 0],
	  "2935-fe0f": [42, 0],
	  "3030-fe0f": [43, 0],
	  "3297-fe0f": [44, 0],
	  "3299-fe0f": [45, 0],
	  "1f49b": [46, 0],
	  "1f49a": [47, 0],
	  "1f499": [48, 0],
	  "1f49c": [49, 0],
	  "1f5a4": [50, 0],
	  "1f494": [51, 0],
	  "1f495": [52, 0],
	  "1f49e": [53, 0],
	  "1f493": [54, 0],
	  "1f497": [55, 0],
	  "1f496": [56, 0],
	  "1f498": [57, 0],
	  "1f49d": [58, 0],
	  "1f49f": [59, 0],
	  "262e-fe0f": [60, 0],
	  "271d-fe0f": [61, 0],
	  "262a-fe0f": [62, 0],
	  "1f549-fe0f": [63, 0],
	  "1f52f": [0, 1],
	  "1f54e": [1, 1],
	  "262f-fe0f": [2, 1],
	  "1f6d0": [3, 1],
	  "26ce": [4, 1],
	  "264a": [5, 1],
	  "264b": [6, 1],
	  "264c": [7, 1],
	  "264d": [8, 1],
	  "264e": [9, 1],
	  "264f": [10, 1],
	  "1f194": [11, 1],
	  "269b-fe0f": [12, 1],
	  "1f251": [13, 1],
	  "1f4f4": [14, 1],
	  "1f4f3": [15, 1],
	  "1f236": [16, 1],
	  "1f21a": [17, 1],
	  "1f238": [18, 1],
	  "1f23a": [19, 1],
	  "1f237-fe0f": [20, 1],
	  "1f19a": [21, 1],
	  "1f4ae": [22, 1],
	  "1f250": [23, 1],
	  "1f234": [24, 1],
	  "1f235": [25, 1],
	  "1f239": [26, 1],
	  "1f232": [27, 1],
	  "1f170-fe0f": [28, 1],
	  "1f171-fe0f": [29, 1],
	  "1f18e": [30, 1],
	  "1f191": [31, 1],
	  "1f17e-fe0f": [32, 1],
	  "1f198": [33, 1],
	  "274c": [34, 1],
	  "2b55": [35, 1],
	  "1f6d1": [36, 1],
	  "26d4": [37, 1],
	  "1f4db": [38, 1],
	  "1f6ab": [39, 1],
	  "1f4af": [40, 1],
	  "1f4a2": [41, 1],
	  "1f6b7": [42, 1],
	  "1f6af": [43, 1],
	  "1f6b3": [44, 1],
	  "1f6b1": [45, 1],
	  "1f51e": [46, 1],
	  "1f4f5": [47, 1],
	  "1f6ad": [48, 1],
	  "203c-fe0f": [49, 1],
	  "1f505": [50, 1],
	  "1f506": [51, 1],
	  "303d-fe0f": [52, 1],
	  "26a0-fe0f": [53, 1],
	  "1f6b8": [54, 1],
	  "1f531": [55, 1],
	  "269c-fe0f": [56, 1],
	  "1f530": [57, 1],
	  "267b-fe0f": [58, 1],
	  "1f22f": [59, 1],
	  "1f4b9": [60, 1],
	  "274e": [61, 1],
	  "1f310": [62, 1],
	  "1f4a0": [63, 1],
	  "24c2-fe0f": [0, 2],
	  "1f300": [1, 2],
	  "1f4a4": [2, 2],
	  "1f3e7": [3, 2],
	  "1f6be": [4, 2],
	  "267f": [5, 2],
	  "1f17f-fe0f": [6, 2],
	  "1f233": [7, 2],
	  "1f202-fe0f": [8, 2],
	  "1f6c2": [9, 2],
	  "1f6c3": [10, 2],
	  "1f6c4": [11, 2],
	  "1f6c5": [12, 2],
	  "1f6b9": [13, 2],
	  "1f6ba": [14, 2],
	  "1f6bc": [15, 2],
	  "1f6bb": [16, 2],
	  "1f6ae": [17, 2],
	  "1f3a6": [18, 2],
	  "1f4f6": [19, 2],
	  "1f201": [20, 2],
	  "1f523": [21, 2],
	  "1f524": [22, 2],
	  "1f521": [23, 2],
	  "1f520": [24, 2],
	  "1f196": [25, 2],
	  "1f197": [26, 2],
	  "1f199": [27, 2],
	  "1f192": [28, 2],
	  "1f195": [29, 2],
	  "1f193": [30, 2],
	  "0030-fe0f-20e3": [31, 2],
	  "0031-fe0f-20e3": [32, 2],
	  "0032-fe0f-20e3": [33, 2],
	  "0033-fe0f-20e3": [34, 2],
	  "0034-fe0f-20e3": [35, 2],
	  "0035-fe0f-20e3": [36, 2],
	  "0036-fe0f-20e3": [37, 2],
	  "0037-fe0f-20e3": [38, 2],
	  "0038-fe0f-20e3": [39, 2],
	  "0039-fe0f-20e3": [40, 2],
	  "1f51f": [41, 2],
	  "1f522": [42, 2],
	  "0023-fe0f-20e3": [43, 2],
	  "002a-fe0f-20e3": [44, 2],
	  "25b6-fe0f": [45, 2],
	  "23f8-fe0f": [46, 2],
	  "23ef-fe0f": [47, 2],
	  "23f9-fe0f": [48, 2],
	  "23fa-fe0f": [49, 2],
	  "23cf-fe0f": [50, 2],
	  "23ed-fe0f": [51, 2],
	  "23ee-fe0f": [52, 2],
	  "23e9": [53, 2],
	  "23ea": [54, 2],
	  "23eb": [55, 2],
	  "23ec": [56, 2],
	  "25c0-fe0f": [57, 2],
	  "1f53c": [58, 2],
	  "1f53d": [59, 2],
	  "27a1-fe0f": [60, 2],
	  "2b05-fe0f": [61, 2],
	  "2b06-fe0f": [62, 2],
	  "2b07-fe0f": [63, 2],
	  "21aa-fe0f": [0, 3],
	  "21a9-fe0f": [1, 3],
	  "1f500": [2, 3],
	  "1f501": [3, 3],
	  "1f502": [4, 3],
	  "1f504": [5, 3],
	  "1f503": [6, 3],
	  "1f3b5": [7, 3],
	  "1f3b6": [8, 3],
	  "1f4b2": [9, 3],
	  "1f4b1": [10, 3],
	  "00a9-fe0f": [11, 3],
	  "00ae-fe0f": [12, 3],
	  "27b0": [13, 3],
	  "27bf": [14, 3],
	  "1f51a": [15, 3],
	  "1f519": [16, 3],
	  "1f51b": [17, 3],
	  "1f51d": [18, 3],
	  "1f51c": [19, 3],
	  "1f518": [20, 3],
	  "26aa": [21, 3],
	  "26ab": [22, 3],
	  "1f534": [23, 3],
	  "1f535": [24, 3],
	  "1f53a": [25, 3],
	  "1f53b": [26, 3],
	  "1f538": [27, 3],
	  "1f539": [28, 3],
	  "1f536": [29, 3],
	  "1f537": [30, 3],
	  "1f533": [31, 3],
	  "1f532": [32, 3],
	  "25aa-fe0f": [33, 3],
	  "25ab-fe0f": [34, 3],
	  "25fe": [35, 3],
	  "25fd": [36, 3],
	  "25fc-fe0f": [37, 3],
	  "25fb-fe0f": [38, 3],
	  "2b1b": [39, 3],
	  "2b1c": [40, 3],
	  "1f508": [41, 3],
	  "1f507": [42, 3],
	  "1f509": [43, 3],
	  "1f50a": [44, 3],
	  "1f514": [45, 3],
	  "1f515": [46, 3],
	  "1f4e3": [47, 3],
	  "1f4e2": [48, 3],
	  "1f5e8-fe0f": [49, 3],
	  "1f441-fe0f-200d-1f5e8-fe0f": [50, 3],
	  "1f4ac": [51, 3],
	  "1f4ad": [52, 3],
	  "1f5ef-fe0f": [53, 3],
	  "1f0cf": [54, 3],
	  "1f3b4": [55, 3],
	  "1f004": [56, 3],
	  "1f550": [57, 3],
	  "1f551": [58, 3],
	  "1f552": [59, 3],
	  "1f553": [60, 3],
	  "1f554": [61, 3],
	  "1f555": [62, 3],
	  "1f556": [63, 3],
	  "1f557": [0, 4],
	  "1f558": [1, 4],
	  "1f559": [2, 4],
	  "1f55a": [3, 4],
	  "1f55b": [4, 4],
	  "1f55c": [5, 4],
	  "1f55d": [6, 4],
	  "1f55e": [7, 4],
	  "1f55f": [8, 4],
	  "1f560": [9, 4],
	  "1f561": [10, 4],
	  "1f562": [11, 4],
	  "1f563": [12, 4],
	  "1f564": [13, 4],
	  "1f565": [14, 4],
	  "1f566": [15, 4],
	  "1f567": [16, 4],
	  "002a-fe0f": [17, 4],
	  "0023-fe0f": [18, 4],
	  "0039-fe0f": [19, 4],
	  "0038-fe0f": [20, 4],
	  "0037-fe0f": [21, 4],
	  "0036-fe0f": [22, 4],
	  "0035-fe0f": [23, 4],
	  "0034-fe0f": [24, 4],
	  "0033-fe0f": [25, 4],
	  "0032-fe0f": [26, 4],
	  "0031-fe0f": [27, 4],
	  "0030-fe0f": [28, 4],
	  "2328-fe0f": [29, 4],
	  "2692-fe0f": [30, 4],
	  "2694-fe0f": [31, 4],
	  "2696-fe0f": [32, 4],
	  "2697-fe0f": [33, 4],
	  "2699-fe0f": [34, 4],
	  "2702-fe0f": [35, 4],
	  "2709-fe0f": [36, 4],
	  "2712-fe0f": [37, 4],
	  "231a": [38, 4],
	  "1f4f1": [39, 4],
	  "1f4f2": [40, 4],
	  "1f4bb": [41, 4],
	  "1f5a5-fe0f": [42, 4],
	  "1f5a8-fe0f": [43, 4],
	  "1f5b1-fe0f": [44, 4],
	  "1f5b2-fe0f": [45, 4],
	  "1f579-fe0f": [46, 4],
	  "1f5dc-fe0f": [47, 4],
	  "1f4bd": [48, 4],
	  "1f4be": [49, 4],
	  "1f4bf": [50, 4],
	  "1f4c0": [51, 4],
	  "1f4fc": [52, 4],
	  "1f4f7": [53, 4],
	  "1f4f8": [54, 4],
	  "1f4f9": [55, 4],
	  "1f3a5": [56, 4],
	  "1f4fd-fe0f": [57, 4],
	  "1f39e-fe0f": [58, 4],
	  "1f4de": [59, 4],
	  "260e-fe0f": [60, 4],
	  "1f4df": [61, 4],
	  "1f4e0": [62, 4],
	  "1f4fa": [63, 4],
	  "1f4fb": [0, 5],
	  "1f399-fe0f": [1, 5],
	  "1f39a-fe0f": [2, 5],
	  "1f39b-fe0f": [3, 5],
	  "23f1-fe0f": [4, 5],
	  "23f2-fe0f": [5, 5],
	  "23f0": [6, 5],
	  "1f570-fe0f": [7, 5],
	  "231b": [8, 5],
	  "23f3": [9, 5],
	  "1f4e1": [10, 5],
	  "1f50b": [11, 5],
	  "1f50c": [12, 5],
	  "1f4a1": [13, 5],
	  "1f526": [14, 5],
	  "1f56f-fe0f": [15, 5],
	  "1f5d1-fe0f": [16, 5],
	  "1f6e2-fe0f": [17, 5],
	  "1f4b8": [18, 5],
	  "1f4b5": [19, 5],
	  "1f4b4": [20, 5],
	  "1f4b6": [21, 5],
	  "1f4b7": [22, 5],
	  "1f4b0": [23, 5],
	  "1f4b3": [24, 5],
	  "1f48e": [25, 5],
	  "1f527": [26, 5],
	  "1f528": [27, 5],
	  "1f6e0-fe0f": [28, 5],
	  "26cf-fe0f": [29, 5],
	  "1f529": [30, 5],
	  "26d3-fe0f": [31, 5],
	  "1f52b": [32, 5],
	  "1f4a3": [33, 5],
	  "1f52a": [34, 5],
	  "1f5e1-fe0f": [35, 5],
	  "1f6e1-fe0f": [36, 5],
	  "1f6ac": [37, 5],
	  "26b0-fe0f": [38, 5],
	  "26b1-fe0f": [39, 5],
	  "1f3fa": [40, 5],
	  "1f52e": [41, 5],
	  "1f4ff": [42, 5],
	  "1f488": [43, 5],
	  "1f52d": [44, 5],
	  "1f52c": [45, 5],
	  "1f573-fe0f": [46, 5],
	  "1f48a": [47, 5],
	  "1f489": [48, 5],
	  "1f321-fe0f": [49, 5],
	  "1f6bd": [50, 5],
	  "1f6b0": [51, 5],
	  "1f6bf": [52, 5],
	  "1f6c1": [53, 5],
	  "1f6c0": [54, 5],
	  "1f6c0-1f3fb": [55, 5],
	  "1f6c0-1f3fc": [56, 5],
	  "1f6c0-1f3fd": [57, 5],
	  "1f6c0-1f3fe": [58, 5],
	  "1f6c0-1f3ff": [59, 5],
	  "1f6ce-fe0f": [60, 5],
	  "1f511": [61, 5],
	  "1f5dd-fe0f": [62, 5],
	  "1f6aa": [63, 5],
	  "1f6cb-fe0f": [0, 6],
	  "1f6cf-fe0f": [1, 6],
	  "1f6cc": [2, 6],
	  "1f6cc-1f3fb": [3, 6],
	  "1f6cc-1f3fc": [4, 6],
	  "1f6cc-1f3fd": [5, 6],
	  "1f6cc-1f3fe": [6, 6],
	  "1f6cc-1f3ff": [7, 6],
	  "1f5bc-fe0f": [8, 6],
	  "1f6cd-fe0f": [9, 6],
	  "1f6d2": [10, 6],
	  "1f381": [11, 6],
	  "1f388": [12, 6],
	  "1f38f": [13, 6],
	  "1f380": [14, 6],
	  "1f38a": [15, 6],
	  "1f389": [16, 6],
	  "1f38e": [17, 6],
	  "1f3ee": [18, 6],
	  "1f390": [19, 6],
	  "1f4e9": [20, 6],
	  "1f4e8": [21, 6],
	  "1f4e7": [22, 6],
	  "1f48c": [23, 6],
	  "1f4e5": [24, 6],
	  "1f4e4": [25, 6],
	  "1f4e6": [26, 6],
	  "1f3f7-fe0f": [27, 6],
	  "1f4ea": [28, 6],
	  "1f4eb": [29, 6],
	  "1f4ec": [30, 6],
	  "1f4ed": [31, 6],
	  "1f4ee": [32, 6],
	  "1f4ef": [33, 6],
	  "1f4dc": [34, 6],
	  "1f4c3": [35, 6],
	  "1f4c4": [36, 6],
	  "1f4d1": [37, 6],
	  "1f4ca": [38, 6],
	  "1f4c8": [39, 6],
	  "1f4c9": [40, 6],
	  "1f5d2-fe0f": [41, 6],
	  "1f5d3-fe0f": [42, 6],
	  "1f4c6": [43, 6],
	  "1f4c5": [44, 6],
	  "1f4c7": [45, 6],
	  "1f5c3-fe0f": [46, 6],
	  "1f5f3-fe0f": [47, 6],
	  "1f5c4-fe0f": [48, 6],
	  "1f4cb": [49, 6],
	  "1f4c1": [50, 6],
	  "1f4c2": [51, 6],
	  "1f5c2-fe0f": [52, 6],
	  "1f5de-fe0f": [53, 6],
	  "1f4f0": [54, 6],
	  "1f4d3": [55, 6],
	  "1f4d4": [56, 6],
	  "1f4d2": [57, 6],
	  "1f4d5": [58, 6],
	  "1f4d7": [59, 6],
	  "1f4d8": [60, 6],
	  "1f4d9": [61, 6],
	  "1f4da": [62, 6],
	  "1f4d6": [63, 6],
	  "1f516": [0, 7],
	  "1f517": [1, 7],
	  "1f4ce": [2, 7],
	  "1f587-fe0f": [3, 7],
	  "1f4d0": [4, 7],
	  "1f4cf": [5, 7],
	  "1f4cc": [6, 7],
	  "1f4cd": [7, 7],
	  "1f58a-fe0f": [8, 7],
	  "1f58b-fe0f": [9, 7],
	  "1f58c-fe0f": [10, 7],
	  "1f58d-fe0f": [11, 7],
	  "1f4dd": [12, 7],
	  "270f-fe0f": [13, 7],
	  "1f50d": [14, 7],
	  "1f50e": [15, 7],
	  "1f50f": [16, 7],
	  "1f510": [17, 7],
	  "1f512": [18, 7],
	  "1f513": [19, 7],
	  "1f9e1": [20, 7],
	  "2600-fe0f": [21, 7],
	  "2601-fe0f": [22, 7],
	  "2603-fe0f": [23, 7],
	  "2604-fe0f": [24, 7],
	  "2618-fe0f": [26, 7],
	  "2744-fe0f": [28, 7],
	  "1f436": [29, 7],
	  "1f431": [30, 7],
	  "1f42d": [31, 7],
	  "1f439": [32, 7],
	  "1f430": [33, 7],
	  "1f98a": [34, 7],
	  "1f43b": [35, 7],
	  "1f43c": [36, 7],
	  "1f428": [37, 7],
	  "1f42f": [38, 7],
	  "1f981": [39, 7],
	  "1f42e": [40, 7],
	  "1f437": [41, 7],
	  "1f43d": [42, 7],
	  "1f438": [43, 7],
	  "1f435": [44, 7],
	  "1f648": [45, 7],
	  "1f649": [46, 7],
	  "1f64a": [47, 7],
	  "1f412": [48, 7],
	  "1f414": [49, 7],
	  "1f427": [50, 7],
	  "1f426": [51, 7],
	  "1f424": [52, 7],
	  "1f423": [53, 7],
	  "1f425": [54, 7],
	  "1f986": [55, 7],
	  "1f985": [56, 7],
	  "1f989": [57, 7],
	  "1f987": [58, 7],
	  "1f43a": [59, 7],
	  "1f417": [60, 7],
	  "1f434": [61, 7],
	  "1f984": [62, 7],
	  "1f41d": [63, 7],
	  "1f41b": [0, 8],
	  "1f98b": [1, 8],
	  "1f40c": [2, 8],
	  "1f41a": [3, 8],
	  "1f41e": [4, 8],
	  "1f41c": [5, 8],
	  "1f577-fe0f": [6, 8],
	  "1f578-fe0f": [7, 8],
	  "1f422": [8, 8],
	  "1f40d": [9, 8],
	  "1f98e": [10, 8],
	  "1f982": [11, 8],
	  "1f980": [12, 8],
	  "1f991": [13, 8],
	  "1f419": [14, 8],
	  "1f990": [15, 8],
	  "1f420": [16, 8],
	  "1f41f": [17, 8],
	  "1f421": [18, 8],
	  "1f42c": [19, 8],
	  "1f988": [20, 8],
	  "1f433": [21, 8],
	  "1f40b": [22, 8],
	  "1f40a": [23, 8],
	  "1f406": [24, 8],
	  "1f405": [25, 8],
	  "1f403": [26, 8],
	  "1f402": [27, 8],
	  "1f404": [28, 8],
	  "1f98c": [29, 8],
	  "1f42a": [30, 8],
	  "1f42b": [31, 8],
	  "1f418": [32, 8],
	  "1f98f": [33, 8],
	  "1f98d": [34, 8],
	  "1f40e": [35, 8],
	  "1f416": [36, 8],
	  "1f410": [37, 8],
	  "1f40f": [38, 8],
	  "1f411": [39, 8],
	  "1f415": [40, 8],
	  "1f429": [41, 8],
	  "1f408": [42, 8],
	  "1f413": [43, 8],
	  "1f983": [44, 8],
	  "1f54a-fe0f": [45, 8],
	  "1f407": [46, 8],
	  "1f401": [47, 8],
	  "1f400": [48, 8],
	  "1f43f-fe0f": [49, 8],
	  "1f43e": [50, 8],
	  "1f409": [51, 8],
	  "1f432": [52, 8],
	  "1f335": [53, 8],
	  "1f384": [54, 8],
	  "1f332": [55, 8],
	  "1f333": [56, 8],
	  "1f334": [57, 8],
	  "1f331": [58, 8],
	  "1f33f": [59, 8],
	  "1f340": [60, 8],
	  "1f38d": [61, 8],
	  "1f38b": [62, 8],
	  "1f343": [63, 8],
	  "1f342": [0, 9],
	  "1f341": [1, 9],
	  "1f344": [2, 9],
	  "1f33e": [3, 9],
	  "1f490": [4, 9],
	  "1f337": [5, 9],
	  "1f339": [6, 9],
	  "1f940": [7, 9],
	  "1f33b": [8, 9],
	  "1f33c": [9, 9],
	  "1f338": [10, 9],
	  "1f33a": [11, 9],
	  "1f30e": [12, 9],
	  "1f30d": [13, 9],
	  "1f30f": [14, 9],
	  "1f315": [15, 9],
	  "1f316": [16, 9],
	  "1f317": [17, 9],
	  "1f318": [18, 9],
	  "1f311": [19, 9],
	  "1f312": [20, 9],
	  "1f313": [21, 9],
	  "1f314": [22, 9],
	  "1f31a": [23, 9],
	  "1f31d": [24, 9],
	  "1f31e": [25, 9],
	  "1f31b": [26, 9],
	  "1f31c": [27, 9],
	  "1f319": [28, 9],
	  "1f4ab": [29, 9],
	  "2b50": [30, 9],
	  "1f31f": [31, 9],
	  "26a1": [32, 9],
	  "1f525": [33, 9],
	  "1f4a5": [34, 9],
	  "1f324-fe0f": [35, 9],
	  "26c5": [36, 9],
	  "1f325-fe0f": [37, 9],
	  "1f326-fe0f": [38, 9],
	  "1f308": [39, 9],
	  "1f327-fe0f": [40, 9],
	  "26c8-fe0f": [41, 9],
	  "1f329-fe0f": [42, 9],
	  "1f328-fe0f": [43, 9],
	  "26c4": [44, 9],
	  "1f32c-fe0f": [45, 9],
	  "1f4a8": [46, 9],
	  "1f32a-fe0f": [47, 9],
	  "1f32b-fe0f": [48, 9],
	  "1f30a": [49, 9],
	  "1f4a7": [50, 9],
	  "1f4a6": [51, 9],
	  "1f992": [52, 9],
	  "1f993": [53, 9],
	  "1f994": [54, 9],
	  "1f995": [55, 9],
	  "1f996": [56, 9],
	  "1f997": [57, 9],
	  "2602-fe0f": [58, 9],
	  "2620-fe0f": [59, 9],
	  "2639-fe0f": [60, 9],
	  "2640-fe0f": [61, 9],
	  "2642-fe0f": [62, 9],
	  "2695-fe0f": [63, 9],
	  "1f600": [0, 10],
	  "1f603": [1, 10],
	  "1f604": [2, 10],
	  "1f601": [3, 10],
	  "1f606": [4, 10],
	  "1f605": [5, 10],
	  "1f602": [6, 10],
	  "1f923": [7, 10],
	  "263a-fe0f": [8, 10],
	  "1f60a": [9, 10],
	  "1f607": [10, 10],
	  "1f642": [11, 10],
	  "1f643": [12, 10],
	  "1f609": [13, 10],
	  "1f60c": [14, 10],
	  "1f60d": [15, 10],
	  "1f618": [16, 10],
	  "1f617": [17, 10],
	  "1f619": [18, 10],
	  "1f61a": [19, 10],
	  "1f60b": [20, 10],
	  "1f61c": [21, 10],
	  "1f61d": [22, 10],
	  "1f61b": [23, 10],
	  "1f911": [24, 10],
	  "1f917": [25, 10],
	  "1f913": [26, 10],
	  "1f60e": [27, 10],
	  "1f921": [28, 10],
	  "1f920": [29, 10],
	  "1f60f": [30, 10],
	  "1f612": [31, 10],
	  "1f61e": [32, 10],
	  "1f614": [33, 10],
	  "1f61f": [34, 10],
	  "1f615": [35, 10],
	  "1f641": [36, 10],
	  "1f623": [37, 10],
	  "1f616": [38, 10],
	  "1f62b": [39, 10],
	  "1f629": [40, 10],
	  "1f624": [41, 10],
	  "1f620": [42, 10],
	  "1f621": [43, 10],
	  "1f636": [44, 10],
	  "1f610": [45, 10],
	  "1f611": [46, 10],
	  "1f62f": [47, 10],
	  "1f626": [48, 10],
	  "1f627": [49, 10],
	  "1f62e": [50, 10],
	  "1f632": [51, 10],
	  "1f635": [52, 10],
	  "1f633": [53, 10],
	  "1f631": [54, 10],
	  "1f628": [55, 10],
	  "1f630": [56, 10],
	  "1f622": [57, 10],
	  "1f625": [58, 10],
	  "1f924": [59, 10],
	  "1f62d": [60, 10],
	  "1f613": [61, 10],
	  "1f62a": [62, 10],
	  "1f634": [63, 10],
	  "1f644": [0, 11],
	  "1f914": [1, 11],
	  "1f925": [2, 11],
	  "1f62c": [3, 11],
	  "1f910": [4, 11],
	  "1f922": [5, 11],
	  "1f927": [6, 11],
	  "1f637": [7, 11],
	  "1f912": [8, 11],
	  "1f915": [9, 11],
	  "1f608": [10, 11],
	  "1f47f": [11, 11],
	  "1f479": [12, 11],
	  "1f47a": [13, 11],
	  "1f4a9": [14, 11],
	  "1f47b": [15, 11],
	  "1f480": [16, 11],
	  "1f47d": [17, 11],
	  "1f47e": [18, 11],
	  "1f916": [19, 11],
	  "1f383": [20, 11],
	  "1f63a": [21, 11],
	  "1f638": [22, 11],
	  "1f639": [23, 11],
	  "1f63b": [24, 11],
	  "1f63c": [25, 11],
	  "1f63d": [26, 11],
	  "1f640": [27, 11],
	  "1f63f": [28, 11],
	  "1f63e": [29, 11],
	  "1f450": [30, 11],
	  "1f450-1f3fb": [31, 11],
	  "1f450-1f3fc": [32, 11],
	  "1f450-1f3fd": [33, 11],
	  "1f450-1f3fe": [34, 11],
	  "1f450-1f3ff": [35, 11],
	  "1f64c": [36, 11],
	  "1f64c-1f3fb": [37, 11],
	  "1f64c-1f3fc": [38, 11],
	  "1f64c-1f3fd": [39, 11],
	  "1f64c-1f3fe": [40, 11],
	  "1f64c-1f3ff": [41, 11],
	  "1f44f": [42, 11],
	  "1f44f-1f3fb": [43, 11],
	  "1f44f-1f3fc": [44, 11],
	  "1f44f-1f3fd": [45, 11],
	  "1f44f-1f3fe": [46, 11],
	  "1f44f-1f3ff": [47, 11],
	  "1f64f": [48, 11],
	  "1f64f-1f3fb": [49, 11],
	  "1f64f-1f3fc": [50, 11],
	  "1f64f-1f3fd": [51, 11],
	  "1f64f-1f3fe": [52, 11],
	  "1f64f-1f3ff": [53, 11],
	  "1f91d": [54, 11],
	  "1f44d": [55, 11],
	  "1f44d-1f3fb": [56, 11],
	  "1f44d-1f3fc": [57, 11],
	  "1f44d-1f3fd": [58, 11],
	  "1f44d-1f3fe": [59, 11],
	  "1f44d-1f3ff": [60, 11],
	  "1f44e": [61, 11],
	  "1f44e-1f3fb": [62, 11],
	  "1f44e-1f3fc": [63, 11],
	  "1f44e-1f3fd": [0, 12],
	  "1f44e-1f3fe": [1, 12],
	  "1f44e-1f3ff": [2, 12],
	  "1f44a": [3, 12],
	  "1f44a-1f3fb": [4, 12],
	  "1f44a-1f3fc": [5, 12],
	  "1f44a-1f3fd": [6, 12],
	  "1f44a-1f3fe": [7, 12],
	  "1f44a-1f3ff": [8, 12],
	  "270a": [9, 12],
	  "270a-1f3fb": [10, 12],
	  "270a-1f3fc": [11, 12],
	  "270a-1f3fd": [12, 12],
	  "270a-1f3fe": [13, 12],
	  "270a-1f3ff": [14, 12],
	  "1f91b": [15, 12],
	  "1f91b-1f3fb": [16, 12],
	  "1f91b-1f3fc": [17, 12],
	  "1f91b-1f3fd": [18, 12],
	  "1f91b-1f3fe": [19, 12],
	  "1f91b-1f3ff": [20, 12],
	  "1f91c": [21, 12],
	  "1f91c-1f3fb": [22, 12],
	  "1f91c-1f3fc": [23, 12],
	  "1f91c-1f3fd": [24, 12],
	  "1f91c-1f3fe": [25, 12],
	  "1f91c-1f3ff": [26, 12],
	  "1f91e": [27, 12],
	  "1f91e-1f3fb": [28, 12],
	  "1f91e-1f3fc": [29, 12],
	  "1f91e-1f3fd": [30, 12],
	  "1f91e-1f3fe": [31, 12],
	  "1f91e-1f3ff": [32, 12],
	  "270c-fe0f": [33, 12],
	  "270c-1f3fb": [34, 12],
	  "270c-1f3fc": [35, 12],
	  "270c-1f3fd": [36, 12],
	  "270c-1f3fe": [37, 12],
	  "270c-1f3ff": [38, 12],
	  "1f918": [39, 12],
	  "1f918-1f3fb": [40, 12],
	  "1f918-1f3fc": [41, 12],
	  "1f918-1f3fd": [42, 12],
	  "1f918-1f3fe": [43, 12],
	  "1f918-1f3ff": [44, 12],
	  "1f44c": [45, 12],
	  "1f44c-1f3fb": [46, 12],
	  "1f44c-1f3fc": [47, 12],
	  "1f44c-1f3fd": [48, 12],
	  "1f44c-1f3fe": [49, 12],
	  "1f44c-1f3ff": [50, 12],
	  "1f448": [51, 12],
	  "1f448-1f3fb": [52, 12],
	  "1f448-1f3fc": [53, 12],
	  "1f448-1f3fd": [54, 12],
	  "1f448-1f3fe": [55, 12],
	  "1f448-1f3ff": [56, 12],
	  "1f449": [57, 12],
	  "1f449-1f3fb": [58, 12],
	  "1f449-1f3fc": [59, 12],
	  "1f449-1f3fd": [60, 12],
	  "1f449-1f3fe": [61, 12],
	  "1f449-1f3ff": [62, 12],
	  "1f446": [63, 12],
	  "1f446-1f3fb": [0, 13],
	  "1f446-1f3fc": [1, 13],
	  "1f446-1f3fd": [2, 13],
	  "1f446-1f3fe": [3, 13],
	  "1f446-1f3ff": [4, 13],
	  "1f447": [5, 13],
	  "1f447-1f3fb": [6, 13],
	  "1f447-1f3fc": [7, 13],
	  "1f447-1f3fd": [8, 13],
	  "1f447-1f3fe": [9, 13],
	  "1f447-1f3ff": [10, 13],
	  "261d-fe0f": [11, 13],
	  "261d-1f3fb": [12, 13],
	  "261d-1f3fc": [13, 13],
	  "261d-1f3fd": [14, 13],
	  "261d-1f3fe": [15, 13],
	  "261d-1f3ff": [16, 13],
	  "270b": [17, 13],
	  "270b-1f3fb": [18, 13],
	  "270b-1f3fc": [19, 13],
	  "270b-1f3fd": [20, 13],
	  "270b-1f3fe": [21, 13],
	  "270b-1f3ff": [22, 13],
	  "1f91a": [23, 13],
	  "1f91a-1f3fb": [24, 13],
	  "1f91a-1f3fc": [25, 13],
	  "1f91a-1f3fd": [26, 13],
	  "1f91a-1f3fe": [27, 13],
	  "1f91a-1f3ff": [28, 13],
	  "1f590-fe0f": [29, 13],
	  "1f590-1f3fb": [30, 13],
	  "1f590-1f3fc": [31, 13],
	  "1f590-1f3fd": [32, 13],
	  "1f590-1f3fe": [33, 13],
	  "1f590-1f3ff": [34, 13],
	  "1f596": [35, 13],
	  "1f596-1f3fb": [36, 13],
	  "1f596-1f3fc": [37, 13],
	  "1f596-1f3fd": [38, 13],
	  "1f596-1f3fe": [39, 13],
	  "1f596-1f3ff": [40, 13],
	  "1f44b": [41, 13],
	  "1f44b-1f3fb": [42, 13],
	  "1f44b-1f3fc": [43, 13],
	  "1f44b-1f3fd": [44, 13],
	  "1f44b-1f3fe": [45, 13],
	  "1f44b-1f3ff": [46, 13],
	  "1f919": [47, 13],
	  "1f919-1f3fb": [48, 13],
	  "1f919-1f3fc": [49, 13],
	  "1f919-1f3fd": [50, 13],
	  "1f919-1f3fe": [51, 13],
	  "1f919-1f3ff": [52, 13],
	  "1f4aa": [53, 13],
	  "1f4aa-1f3fb": [54, 13],
	  "1f4aa-1f3fc": [55, 13],
	  "1f4aa-1f3fd": [56, 13],
	  "1f4aa-1f3fe": [57, 13],
	  "1f4aa-1f3ff": [58, 13],
	  "1f595": [59, 13],
	  "1f595-1f3fb": [60, 13],
	  "1f595-1f3fc": [61, 13],
	  "1f595-1f3fd": [62, 13],
	  "1f595-1f3fe": [63, 13],
	  "1f595-1f3ff": [0, 14],
	  "270d-fe0f": [1, 14],
	  "270d-1f3fb": [2, 14],
	  "270d-1f3fc": [3, 14],
	  "270d-1f3fd": [4, 14],
	  "270d-1f3fe": [5, 14],
	  "270d-1f3ff": [6, 14],
	  "1f933": [7, 14],
	  "1f933-1f3fb": [8, 14],
	  "1f933-1f3fc": [9, 14],
	  "1f933-1f3fd": [10, 14],
	  "1f933-1f3fe": [11, 14],
	  "1f933-1f3ff": [12, 14],
	  "1f485": [13, 14],
	  "1f485-1f3fb": [14, 14],
	  "1f485-1f3fc": [15, 14],
	  "1f485-1f3fd": [16, 14],
	  "1f485-1f3fe": [17, 14],
	  "1f485-1f3ff": [18, 14],
	  "1f48d": [19, 14],
	  "1f484": [20, 14],
	  "1f48b": [21, 14],
	  "1f444": [22, 14],
	  "1f445": [23, 14],
	  "1f442": [24, 14],
	  "1f442-1f3fb": [25, 14],
	  "1f442-1f3fc": [26, 14],
	  "1f442-1f3fd": [27, 14],
	  "1f442-1f3fe": [28, 14],
	  "1f442-1f3ff": [29, 14],
	  "1f443": [30, 14],
	  "1f443-1f3fb": [31, 14],
	  "1f443-1f3fc": [32, 14],
	  "1f443-1f3fd": [33, 14],
	  "1f443-1f3fe": [34, 14],
	  "1f443-1f3ff": [35, 14],
	  "1f463": [36, 14],
	  "1f441-fe0f": [37, 14],
	  "1f440": [38, 14],
	  "1f5e3-fe0f": [39, 14],
	  "1f464": [40, 14],
	  "1f465": [41, 14],
	  "1f476": [42, 14],
	  "1f476-1f3fb": [43, 14],
	  "1f476-1f3fc": [44, 14],
	  "1f476-1f3fd": [45, 14],
	  "1f476-1f3fe": [46, 14],
	  "1f476-1f3ff": [47, 14],
	  "1f466": [48, 14],
	  "1f466-1f3fb": [49, 14],
	  "1f466-1f3fc": [50, 14],
	  "1f466-1f3fd": [51, 14],
	  "1f466-1f3fe": [52, 14],
	  "1f466-1f3ff": [53, 14],
	  "1f467": [54, 14],
	  "1f467-1f3fb": [55, 14],
	  "1f467-1f3fc": [56, 14],
	  "1f467-1f3fd": [57, 14],
	  "1f467-1f3fe": [58, 14],
	  "1f467-1f3ff": [59, 14],
	  "1f468": [60, 14],
	  "1f468-1f3fb": [61, 14],
	  "1f468-1f3fc": [62, 14],
	  "1f468-1f3fd": [63, 14],
	  "1f468-1f3fe": [0, 15],
	  "1f468-1f3ff": [1, 15],
	  "1f469": [2, 15],
	  "1f469-1f3fb": [3, 15],
	  "1f469-1f3fc": [4, 15],
	  "1f469-1f3fd": [5, 15],
	  "1f469-1f3fe": [6, 15],
	  "1f469-1f3ff": [7, 15],
	  "1f471-200d-2640-fe0f": [8, 15],
	  "1f471-1f3fb-200d-2640-fe0f": [9, 15],
	  "1f471-1f3fc-200d-2640-fe0f": [10, 15],
	  "1f471-1f3fd-200d-2640-fe0f": [11, 15],
	  "1f471-1f3fe-200d-2640-fe0f": [12, 15],
	  "1f471-1f3ff-200d-2640-fe0f": [13, 15],
	  "1f471": [14, 15],
	  "1f471-1f3fb": [15, 15],
	  "1f471-1f3fc": [16, 15],
	  "1f471-1f3fd": [17, 15],
	  "1f471-1f3fe": [18, 15],
	  "1f471-1f3ff": [19, 15],
	  "1f471-200d-2642-fe0f": [20, 15],
	  "1f471-1f3ff-200d-2642-fe0f": [21, 15],
	  "1f471-1f3fe-200d-2642-fe0f": [22, 15],
	  "1f471-1f3fd-200d-2642-fe0f": [23, 15],
	  "1f471-1f3fc-200d-2642-fe0f": [24, 15],
	  "1f471-1f3fb-200d-2642-fe0f": [25, 15],
	  "1f474": [26, 15],
	  "1f474-1f3fb": [27, 15],
	  "1f474-1f3fc": [28, 15],
	  "1f474-1f3fd": [29, 15],
	  "1f474-1f3fe": [30, 15],
	  "1f474-1f3ff": [31, 15],
	  "1f475": [32, 15],
	  "1f475-1f3fb": [33, 15],
	  "1f475-1f3fc": [34, 15],
	  "1f475-1f3fd": [35, 15],
	  "1f475-1f3fe": [36, 15],
	  "1f475-1f3ff": [37, 15],
	  "1f472": [38, 15],
	  "1f472-1f3fb": [39, 15],
	  "1f472-1f3fc": [40, 15],
	  "1f472-1f3fd": [41, 15],
	  "1f472-1f3fe": [42, 15],
	  "1f472-1f3ff": [43, 15],
	  "1f473-200d-2640-fe0f": [44, 15],
	  "1f473-1f3fb-200d-2640-fe0f": [45, 15],
	  "1f473-1f3fc-200d-2640-fe0f": [46, 15],
	  "1f473-1f3fd-200d-2640-fe0f": [47, 15],
	  "1f473-1f3fe-200d-2640-fe0f": [48, 15],
	  "1f473-1f3ff-200d-2640-fe0f": [49, 15],
	  "1f473": [50, 15],
	  "1f473-1f3fb": [51, 15],
	  "1f473-1f3fc": [52, 15],
	  "1f473-1f3fd": [53, 15],
	  "1f473-1f3fe": [54, 15],
	  "1f473-1f3ff": [55, 15],
	  "1f473-200d-2642-fe0f": [56, 15],
	  "1f473-1f3ff-200d-2642-fe0f": [57, 15],
	  "1f473-1f3fe-200d-2642-fe0f": [58, 15],
	  "1f473-1f3fd-200d-2642-fe0f": [59, 15],
	  "1f473-1f3fc-200d-2642-fe0f": [60, 15],
	  "1f473-1f3fb-200d-2642-fe0f": [61, 15],
	  "1f46e-200d-2640-fe0f": [62, 15],
	  "1f46e-1f3fb-200d-2640-fe0f": [63, 15],
	  "1f46e-1f3fc-200d-2640-fe0f": [0, 16],
	  "1f46e-1f3fd-200d-2640-fe0f": [1, 16],
	  "1f46e-1f3fe-200d-2640-fe0f": [2, 16],
	  "1f46e-1f3ff-200d-2640-fe0f": [3, 16],
	  "1f46e": [4, 16],
	  "1f46e-1f3fb": [5, 16],
	  "1f46e-1f3fc": [6, 16],
	  "1f46e-1f3fd": [7, 16],
	  "1f46e-1f3fe": [8, 16],
	  "1f46e-1f3ff": [9, 16],
	  "1f46e-200d-2642-fe0f": [10, 16],
	  "1f46e-1f3ff-200d-2642-fe0f": [11, 16],
	  "1f46e-1f3fe-200d-2642-fe0f": [12, 16],
	  "1f46e-1f3fd-200d-2642-fe0f": [13, 16],
	  "1f46e-1f3fc-200d-2642-fe0f": [14, 16],
	  "1f46e-1f3fb-200d-2642-fe0f": [15, 16],
	  "1f477-200d-2640-fe0f": [16, 16],
	  "1f477-1f3fb-200d-2640-fe0f": [17, 16],
	  "1f477-1f3fc-200d-2640-fe0f": [18, 16],
	  "1f477-1f3fd-200d-2640-fe0f": [19, 16],
	  "1f477-1f3fe-200d-2640-fe0f": [20, 16],
	  "1f477-1f3ff-200d-2640-fe0f": [21, 16],
	  "1f477": [22, 16],
	  "1f477-1f3fb": [23, 16],
	  "1f477-1f3fc": [24, 16],
	  "1f477-1f3fd": [25, 16],
	  "1f477-1f3fe": [26, 16],
	  "1f477-1f3ff": [27, 16],
	  "1f477-200d-2642-fe0f": [28, 16],
	  "1f477-1f3ff-200d-2642-fe0f": [29, 16],
	  "1f477-1f3fe-200d-2642-fe0f": [30, 16],
	  "1f477-1f3fd-200d-2642-fe0f": [31, 16],
	  "1f477-1f3fc-200d-2642-fe0f": [32, 16],
	  "1f477-1f3fb-200d-2642-fe0f": [33, 16],
	  "1f482-200d-2640-fe0f": [34, 16],
	  "1f482-1f3fb-200d-2640-fe0f": [35, 16],
	  "1f482-1f3fc-200d-2640-fe0f": [36, 16],
	  "1f482-1f3fd-200d-2640-fe0f": [37, 16],
	  "1f482-1f3fe-200d-2640-fe0f": [38, 16],
	  "1f482-1f3ff-200d-2640-fe0f": [39, 16],
	  "1f482": [40, 16],
	  "1f482-1f3fb": [41, 16],
	  "1f482-1f3fc": [42, 16],
	  "1f482-1f3fd": [43, 16],
	  "1f482-1f3fe": [44, 16],
	  "1f482-1f3ff": [45, 16],
	  "1f482-200d-2642-fe0f": [46, 16],
	  "1f482-1f3ff-200d-2642-fe0f": [47, 16],
	  "1f482-1f3fe-200d-2642-fe0f": [48, 16],
	  "1f482-1f3fd-200d-2642-fe0f": [49, 16],
	  "1f482-1f3fc-200d-2642-fe0f": [50, 16],
	  "1f482-1f3fb-200d-2642-fe0f": [51, 16],
	  "1f575-fe0f-200d-2640-fe0f": [52, 16],
	  "1f575-1f3fb-200d-2640-fe0f": [53, 16],
	  "1f575-1f3fc-200d-2640-fe0f": [54, 16],
	  "1f575-1f3fd-200d-2640-fe0f": [55, 16],
	  "1f575-1f3fe-200d-2640-fe0f": [56, 16],
	  "1f575-1f3ff-200d-2640-fe0f": [57, 16],
	  "1f575-fe0f": [58, 16],
	  "1f575-1f3fb": [59, 16],
	  "1f575-1f3fc": [60, 16],
	  "1f575-1f3fd": [61, 16],
	  "1f575-1f3fe": [62, 16],
	  "1f575-1f3ff": [63, 16],
	  "1f575-fe0f-200d-2642-fe0f": [0, 17],
	  "1f575-1f3ff-200d-2642-fe0f": [1, 17],
	  "1f575-1f3fe-200d-2642-fe0f": [2, 17],
	  "1f575-1f3fd-200d-2642-fe0f": [3, 17],
	  "1f575-1f3fc-200d-2642-fe0f": [4, 17],
	  "1f575-1f3fb-200d-2642-fe0f": [5, 17],
	  "1f469-200d-2695-fe0f": [6, 17],
	  "1f469-1f3fb-200d-2695-fe0f": [7, 17],
	  "1f469-1f3fc-200d-2695-fe0f": [8, 17],
	  "1f469-1f3fd-200d-2695-fe0f": [9, 17],
	  "1f469-1f3fe-200d-2695-fe0f": [10, 17],
	  "1f469-1f3ff-200d-2695-fe0f": [11, 17],
	  "1f468-200d-2695-fe0f": [12, 17],
	  "1f468-1f3fb-200d-2695-fe0f": [13, 17],
	  "1f468-1f3fc-200d-2695-fe0f": [14, 17],
	  "1f468-1f3fd-200d-2695-fe0f": [15, 17],
	  "1f468-1f3fe-200d-2695-fe0f": [16, 17],
	  "1f468-1f3ff-200d-2695-fe0f": [17, 17],
	  "1f469-200d-1f33e": [18, 17],
	  "1f469-1f3fb-200d-1f33e": [19, 17],
	  "1f469-1f3fc-200d-1f33e": [20, 17],
	  "1f469-1f3fd-200d-1f33e": [21, 17],
	  "1f469-1f3fe-200d-1f33e": [22, 17],
	  "1f469-1f3ff-200d-1f33e": [23, 17],
	  "1f468-200d-1f33e": [24, 17],
	  "1f468-1f3fb-200d-1f33e": [25, 17],
	  "1f468-1f3fc-200d-1f33e": [26, 17],
	  "1f468-1f3fd-200d-1f33e": [27, 17],
	  "1f468-1f3fe-200d-1f33e": [28, 17],
	  "1f468-1f3ff-200d-1f33e": [29, 17],
	  "1f469-200d-1f373": [30, 17],
	  "1f469-1f3fb-200d-1f373": [31, 17],
	  "1f469-1f3fc-200d-1f373": [32, 17],
	  "1f469-1f3fd-200d-1f373": [33, 17],
	  "1f469-1f3fe-200d-1f373": [34, 17],
	  "1f469-1f3ff-200d-1f373": [35, 17],
	  "1f468-200d-1f373": [36, 17],
	  "1f468-1f3fb-200d-1f373": [37, 17],
	  "1f468-1f3fc-200d-1f373": [38, 17],
	  "1f468-1f3fd-200d-1f373": [39, 17],
	  "1f468-1f3fe-200d-1f373": [40, 17],
	  "1f468-1f3ff-200d-1f373": [41, 17],
	  "1f469-200d-1f393": [42, 17],
	  "1f469-1f3fb-200d-1f393": [43, 17],
	  "1f469-1f3fc-200d-1f393": [44, 17],
	  "1f469-1f3fd-200d-1f393": [45, 17],
	  "1f469-1f3fe-200d-1f393": [46, 17],
	  "1f469-1f3ff-200d-1f393": [47, 17],
	  "1f468-200d-1f393": [48, 17],
	  "1f468-1f3fb-200d-1f393": [49, 17],
	  "1f468-1f3fc-200d-1f393": [50, 17],
	  "1f468-1f3fd-200d-1f393": [51, 17],
	  "1f468-1f3fe-200d-1f393": [52, 17],
	  "1f468-1f3ff-200d-1f393": [53, 17],
	  "1f469-200d-1f3a4": [54, 17],
	  "1f469-1f3fb-200d-1f3a4": [55, 17],
	  "1f469-1f3fc-200d-1f3a4": [56, 17],
	  "1f469-1f3fd-200d-1f3a4": [57, 17],
	  "1f469-1f3fe-200d-1f3a4": [58, 17],
	  "1f469-1f3ff-200d-1f3a4": [59, 17],
	  "1f468-200d-1f3a4": [60, 17],
	  "1f468-1f3fb-200d-1f3a4": [61, 17],
	  "1f468-1f3fc-200d-1f3a4": [62, 17],
	  "1f468-1f3fd-200d-1f3a4": [63, 17],
	  "1f468-1f3fe-200d-1f3a4": [0, 18],
	  "1f468-1f3ff-200d-1f3a4": [1, 18],
	  "1f469-200d-1f3eb": [2, 18],
	  "1f469-1f3fb-200d-1f3eb": [3, 18],
	  "1f469-1f3fc-200d-1f3eb": [4, 18],
	  "1f469-1f3fd-200d-1f3eb": [5, 18],
	  "1f469-1f3fe-200d-1f3eb": [6, 18],
	  "1f469-1f3ff-200d-1f3eb": [7, 18],
	  "1f468-200d-1f3eb": [8, 18],
	  "1f468-1f3fb-200d-1f3eb": [9, 18],
	  "1f468-1f3fc-200d-1f3eb": [10, 18],
	  "1f468-1f3fd-200d-1f3eb": [11, 18],
	  "1f468-1f3fe-200d-1f3eb": [12, 18],
	  "1f468-1f3ff-200d-1f3eb": [13, 18],
	  "1f469-200d-1f3ed": [14, 18],
	  "1f469-1f3fb-200d-1f3ed": [15, 18],
	  "1f469-1f3fc-200d-1f3ed": [16, 18],
	  "1f469-1f3fd-200d-1f3ed": [17, 18],
	  "1f469-1f3fe-200d-1f3ed": [18, 18],
	  "1f469-1f3ff-200d-1f3ed": [19, 18],
	  "1f468-200d-1f3ed": [20, 18],
	  "1f468-1f3fb-200d-1f3ed": [21, 18],
	  "1f468-1f3fc-200d-1f3ed": [22, 18],
	  "1f468-1f3fd-200d-1f3ed": [23, 18],
	  "1f468-1f3fe-200d-1f3ed": [24, 18],
	  "1f468-1f3ff-200d-1f3ed": [25, 18],
	  "1f469-200d-1f4bb": [26, 18],
	  "1f469-1f3fb-200d-1f4bb": [27, 18],
	  "1f469-1f3fc-200d-1f4bb": [28, 18],
	  "1f469-1f3fd-200d-1f4bb": [29, 18],
	  "1f469-1f3fe-200d-1f4bb": [30, 18],
	  "1f469-1f3ff-200d-1f4bb": [31, 18],
	  "1f468-200d-1f4bb": [32, 18],
	  "1f468-1f3fb-200d-1f4bb": [33, 18],
	  "1f468-1f3fc-200d-1f4bb": [34, 18],
	  "1f468-1f3fd-200d-1f4bb": [35, 18],
	  "1f468-1f3fe-200d-1f4bb": [36, 18],
	  "1f468-1f3ff-200d-1f4bb": [37, 18],
	  "1f469-200d-1f4bc": [38, 18],
	  "1f469-1f3fb-200d-1f4bc": [39, 18],
	  "1f469-1f3fc-200d-1f4bc": [40, 18],
	  "1f469-1f3fd-200d-1f4bc": [41, 18],
	  "1f469-1f3fe-200d-1f4bc": [42, 18],
	  "1f469-1f3ff-200d-1f4bc": [43, 18],
	  "1f468-200d-1f4bc": [44, 18],
	  "1f468-1f3fb-200d-1f4bc": [45, 18],
	  "1f468-1f3fc-200d-1f4bc": [46, 18],
	  "1f468-1f3fd-200d-1f4bc": [47, 18],
	  "1f468-1f3fe-200d-1f4bc": [48, 18],
	  "1f468-1f3ff-200d-1f4bc": [49, 18],
	  "1f469-200d-1f527": [50, 18],
	  "1f469-1f3fb-200d-1f527": [51, 18],
	  "1f469-1f3fc-200d-1f527": [52, 18],
	  "1f469-1f3fd-200d-1f527": [53, 18],
	  "1f469-1f3fe-200d-1f527": [54, 18],
	  "1f469-1f3ff-200d-1f527": [55, 18],
	  "1f468-200d-1f527": [56, 18],
	  "1f468-1f3fb-200d-1f527": [57, 18],
	  "1f468-1f3fc-200d-1f527": [58, 18],
	  "1f468-1f3fd-200d-1f527": [59, 18],
	  "1f468-1f3fe-200d-1f527": [60, 18],
	  "1f468-1f3ff-200d-1f527": [61, 18],
	  "1f469-200d-1f52c": [62, 18],
	  "1f469-1f3fb-200d-1f52c": [63, 18],
	  "1f469-1f3fc-200d-1f52c": [0, 19],
	  "1f469-1f3fd-200d-1f52c": [1, 19],
	  "1f469-1f3fe-200d-1f52c": [2, 19],
	  "1f469-1f3ff-200d-1f52c": [3, 19],
	  "1f468-200d-1f52c": [4, 19],
	  "1f468-1f3fb-200d-1f52c": [5, 19],
	  "1f468-1f3fc-200d-1f52c": [6, 19],
	  "1f468-1f3fd-200d-1f52c": [7, 19],
	  "1f468-1f3fe-200d-1f52c": [8, 19],
	  "1f468-1f3ff-200d-1f52c": [9, 19],
	  "1f469-200d-1f3a8": [10, 19],
	  "1f469-1f3fb-200d-1f3a8": [11, 19],
	  "1f469-1f3fc-200d-1f3a8": [12, 19],
	  "1f469-1f3fd-200d-1f3a8": [13, 19],
	  "1f469-1f3fe-200d-1f3a8": [14, 19],
	  "1f469-1f3ff-200d-1f3a8": [15, 19],
	  "1f468-200d-1f3a8": [16, 19],
	  "1f468-1f3fb-200d-1f3a8": [17, 19],
	  "1f468-1f3fc-200d-1f3a8": [18, 19],
	  "1f468-1f3fd-200d-1f3a8": [19, 19],
	  "1f468-1f3fe-200d-1f3a8": [20, 19],
	  "1f468-1f3ff-200d-1f3a8": [21, 19],
	  "1f469-200d-1f692": [22, 19],
	  "1f469-1f3fb-200d-1f692": [23, 19],
	  "1f469-1f3fc-200d-1f692": [24, 19],
	  "1f469-1f3fd-200d-1f692": [25, 19],
	  "1f469-1f3fe-200d-1f692": [26, 19],
	  "1f469-1f3ff-200d-1f692": [27, 19],
	  "1f468-200d-1f692": [28, 19],
	  "1f468-1f3fb-200d-1f692": [29, 19],
	  "1f468-1f3fc-200d-1f692": [30, 19],
	  "1f468-1f3fd-200d-1f692": [31, 19],
	  "1f468-1f3fe-200d-1f692": [32, 19],
	  "1f468-1f3ff-200d-1f692": [33, 19],
	  "1f469-200d-2708-fe0f": [34, 19],
	  "1f469-1f3fb-200d-2708-fe0f": [35, 19],
	  "1f469-1f3fc-200d-2708-fe0f": [36, 19],
	  "1f469-1f3fd-200d-2708-fe0f": [37, 19],
	  "1f469-1f3fe-200d-2708-fe0f": [38, 19],
	  "1f469-1f3ff-200d-2708-fe0f": [39, 19],
	  "1f468-200d-2708-fe0f": [40, 19],
	  "1f468-1f3fb-200d-2708-fe0f": [41, 19],
	  "1f468-1f3fc-200d-2708-fe0f": [42, 19],
	  "1f468-1f3fd-200d-2708-fe0f": [43, 19],
	  "1f468-1f3fe-200d-2708-fe0f": [44, 19],
	  "1f468-1f3ff-200d-2708-fe0f": [45, 19],
	  "1f469-200d-1f680": [46, 19],
	  "1f469-1f3fb-200d-1f680": [47, 19],
	  "1f469-1f3fc-200d-1f680": [48, 19],
	  "1f469-1f3fd-200d-1f680": [49, 19],
	  "1f469-1f3fe-200d-1f680": [50, 19],
	  "1f469-1f3ff-200d-1f680": [51, 19],
	  "1f468-200d-1f680": [52, 19],
	  "1f468-1f3fb-200d-1f680": [53, 19],
	  "1f468-1f3fc-200d-1f680": [54, 19],
	  "1f468-1f3fd-200d-1f680": [55, 19],
	  "1f468-1f3fe-200d-1f680": [56, 19],
	  "1f468-1f3ff-200d-1f680": [57, 19],
	  "1f469-200d-2696-fe0f": [58, 19],
	  "1f469-1f3fb-200d-2696-fe0f": [59, 19],
	  "1f469-1f3fc-200d-2696-fe0f": [60, 19],
	  "1f469-1f3fd-200d-2696-fe0f": [61, 19],
	  "1f469-1f3fe-200d-2696-fe0f": [62, 19],
	  "1f469-1f3ff-200d-2696-fe0f": [63, 19],
	  "1f468-200d-2696-fe0f": [0, 20],
	  "1f468-1f3fb-200d-2696-fe0f": [1, 20],
	  "1f468-1f3fc-200d-2696-fe0f": [2, 20],
	  "1f468-1f3fd-200d-2696-fe0f": [3, 20],
	  "1f468-1f3fe-200d-2696-fe0f": [4, 20],
	  "1f468-1f3ff-200d-2696-fe0f": [5, 20],
	  "1f936": [6, 20],
	  "1f936-1f3fb": [7, 20],
	  "1f936-1f3fc": [8, 20],
	  "1f936-1f3fd": [9, 20],
	  "1f936-1f3fe": [10, 20],
	  "1f936-1f3ff": [11, 20],
	  "1f385": [12, 20],
	  "1f385-1f3fb": [13, 20],
	  "1f385-1f3fc": [14, 20],
	  "1f385-1f3fd": [15, 20],
	  "1f385-1f3fe": [16, 20],
	  "1f385-1f3ff": [17, 20],
	  "1f478": [18, 20],
	  "1f478-1f3fb": [19, 20],
	  "1f478-1f3fc": [20, 20],
	  "1f478-1f3fd": [21, 20],
	  "1f478-1f3fe": [22, 20],
	  "1f478-1f3ff": [23, 20],
	  "1f934": [24, 20],
	  "1f934-1f3fb": [25, 20],
	  "1f934-1f3fc": [26, 20],
	  "1f934-1f3fd": [27, 20],
	  "1f934-1f3fe": [28, 20],
	  "1f934-1f3ff": [29, 20],
	  "1f470": [30, 20],
	  "1f470-1f3fb": [31, 20],
	  "1f470-1f3fc": [32, 20],
	  "1f470-1f3fd": [33, 20],
	  "1f470-1f3fe": [34, 20],
	  "1f470-1f3ff": [35, 20],
	  "1f935": [36, 20],
	  "1f935-1f3fb": [37, 20],
	  "1f935-1f3fc": [38, 20],
	  "1f935-1f3fd": [39, 20],
	  "1f935-1f3fe": [40, 20],
	  "1f935-1f3ff": [41, 20],
	  "1f47c": [42, 20],
	  "1f47c-1f3fb": [43, 20],
	  "1f47c-1f3fc": [44, 20],
	  "1f47c-1f3fd": [45, 20],
	  "1f47c-1f3fe": [46, 20],
	  "1f47c-1f3ff": [47, 20],
	  "1f930": [48, 20],
	  "1f930-1f3fb": [49, 20],
	  "1f930-1f3fc": [50, 20],
	  "1f930-1f3fd": [51, 20],
	  "1f930-1f3fe": [52, 20],
	  "1f930-1f3ff": [53, 20],
	  "1f647-200d-2640-fe0f": [54, 20],
	  "1f647-1f3fb-200d-2640-fe0f": [55, 20],
	  "1f647-1f3fc-200d-2640-fe0f": [56, 20],
	  "1f647-1f3fd-200d-2640-fe0f": [57, 20],
	  "1f647-1f3fe-200d-2640-fe0f": [58, 20],
	  "1f647-1f3ff-200d-2640-fe0f": [59, 20],
	  "1f647": [60, 20],
	  "1f647-1f3fb": [61, 20],
	  "1f647-1f3fc": [62, 20],
	  "1f647-1f3fd": [63, 20],
	  "1f647-1f3fe": [0, 21],
	  "1f647-1f3ff": [1, 21],
	  "1f647-200d-2642-fe0f": [2, 21],
	  "1f647-1f3ff-200d-2642-fe0f": [3, 21],
	  "1f647-1f3fe-200d-2642-fe0f": [4, 21],
	  "1f647-1f3fd-200d-2642-fe0f": [5, 21],
	  "1f647-1f3fc-200d-2642-fe0f": [6, 21],
	  "1f647-1f3fb-200d-2642-fe0f": [7, 21],
	  "1f481": [8, 21],
	  "1f481-1f3fb": [9, 21],
	  "1f481-1f3fc": [10, 21],
	  "1f481-1f3fd": [11, 21],
	  "1f481-1f3fe": [12, 21],
	  "1f481-1f3ff": [13, 21],
	  "1f481-200d-2642-fe0f": [14, 21],
	  "1f481-1f3fb-200d-2642-fe0f": [15, 21],
	  "1f481-1f3fc-200d-2642-fe0f": [16, 21],
	  "1f481-1f3fd-200d-2642-fe0f": [17, 21],
	  "1f481-1f3fe-200d-2642-fe0f": [18, 21],
	  "1f481-1f3ff-200d-2642-fe0f": [19, 21],
	  "1f481-200d-2640-fe0f": [20, 21],
	  "1f481-1f3ff-200d-2640-fe0f": [21, 21],
	  "1f481-1f3fe-200d-2640-fe0f": [22, 21],
	  "1f481-1f3fd-200d-2640-fe0f": [23, 21],
	  "1f481-1f3fc-200d-2640-fe0f": [24, 21],
	  "1f481-1f3fb-200d-2640-fe0f": [25, 21],
	  "1f645": [26, 21],
	  "1f645-1f3fb": [27, 21],
	  "1f645-1f3fc": [28, 21],
	  "1f645-1f3fd": [29, 21],
	  "1f645-1f3fe": [30, 21],
	  "1f645-1f3ff": [31, 21],
	  "1f645-200d-2642-fe0f": [32, 21],
	  "1f645-1f3fb-200d-2642-fe0f": [33, 21],
	  "1f645-1f3fc-200d-2642-fe0f": [34, 21],
	  "1f645-1f3fd-200d-2642-fe0f": [35, 21],
	  "1f645-1f3fe-200d-2642-fe0f": [36, 21],
	  "1f645-1f3ff-200d-2642-fe0f": [37, 21],
	  "1f645-200d-2640-fe0f": [38, 21],
	  "1f645-1f3ff-200d-2640-fe0f": [39, 21],
	  "1f645-1f3fe-200d-2640-fe0f": [40, 21],
	  "1f645-1f3fd-200d-2640-fe0f": [41, 21],
	  "1f645-1f3fc-200d-2640-fe0f": [42, 21],
	  "1f645-1f3fb-200d-2640-fe0f": [43, 21],
	  "1f646": [44, 21],
	  "1f646-1f3fb": [45, 21],
	  "1f646-1f3fc": [46, 21],
	  "1f646-1f3fd": [47, 21],
	  "1f646-1f3fe": [48, 21],
	  "1f646-1f3ff": [49, 21],
	  "1f646-200d-2642-fe0f": [50, 21],
	  "1f646-1f3fb-200d-2642-fe0f": [51, 21],
	  "1f646-1f3fc-200d-2642-fe0f": [52, 21],
	  "1f646-1f3fd-200d-2642-fe0f": [53, 21],
	  "1f646-1f3fe-200d-2642-fe0f": [54, 21],
	  "1f646-1f3ff-200d-2642-fe0f": [55, 21],
	  "1f646-200d-2640-fe0f": [56, 21],
	  "1f646-1f3ff-200d-2640-fe0f": [57, 21],
	  "1f646-1f3fe-200d-2640-fe0f": [58, 21],
	  "1f646-1f3fd-200d-2640-fe0f": [59, 21],
	  "1f646-1f3fc-200d-2640-fe0f": [60, 21],
	  "1f646-1f3fb-200d-2640-fe0f": [61, 21],
	  "1f64b": [62, 21],
	  "1f64b-1f3fb": [63, 21],
	  "1f64b-1f3fc": [0, 22],
	  "1f64b-1f3fd": [1, 22],
	  "1f64b-1f3fe": [2, 22],
	  "1f64b-1f3ff": [3, 22],
	  "1f64b-200d-2642-fe0f": [4, 22],
	  "1f64b-1f3fb-200d-2642-fe0f": [5, 22],
	  "1f64b-1f3fc-200d-2642-fe0f": [6, 22],
	  "1f64b-1f3fd-200d-2642-fe0f": [7, 22],
	  "1f64b-1f3fe-200d-2642-fe0f": [8, 22],
	  "1f64b-1f3ff-200d-2642-fe0f": [9, 22],
	  "1f64b-200d-2640-fe0f": [10, 22],
	  "1f64b-1f3ff-200d-2640-fe0f": [11, 22],
	  "1f64b-1f3fe-200d-2640-fe0f": [12, 22],
	  "1f64b-1f3fd-200d-2640-fe0f": [13, 22],
	  "1f64b-1f3fc-200d-2640-fe0f": [14, 22],
	  "1f64b-1f3fb-200d-2640-fe0f": [15, 22],
	  "1f926-200d-2640-fe0f": [16, 22],
	  "1f926-1f3fb-200d-2640-fe0f": [17, 22],
	  "1f926-1f3fc-200d-2640-fe0f": [18, 22],
	  "1f926-1f3fd-200d-2640-fe0f": [19, 22],
	  "1f926-1f3fe-200d-2640-fe0f": [20, 22],
	  "1f926-1f3ff-200d-2640-fe0f": [21, 22],
	  "1f926-200d-2642-fe0f": [22, 22],
	  "1f926-1f3fb-200d-2642-fe0f": [23, 22],
	  "1f926-1f3fc-200d-2642-fe0f": [24, 22],
	  "1f926-1f3fd-200d-2642-fe0f": [25, 22],
	  "1f926-1f3fe-200d-2642-fe0f": [26, 22],
	  "1f926-1f3ff-200d-2642-fe0f": [27, 22],
	  "1f926": [28, 22],
	  "1f926-1f3fb": [29, 22],
	  "1f926-1f3fc": [30, 22],
	  "1f926-1f3fd": [31, 22],
	  "1f926-1f3fe": [32, 22],
	  "1f926-1f3ff": [33, 22],
	  "1f937-200d-2640-fe0f": [34, 22],
	  "1f937-1f3fb-200d-2640-fe0f": [35, 22],
	  "1f937-1f3fc-200d-2640-fe0f": [36, 22],
	  "1f937-1f3fd-200d-2640-fe0f": [37, 22],
	  "1f937-1f3fe-200d-2640-fe0f": [38, 22],
	  "1f937-1f3ff-200d-2640-fe0f": [39, 22],
	  "1f937-200d-2642-fe0f": [40, 22],
	  "1f937-1f3fb-200d-2642-fe0f": [41, 22],
	  "1f937-1f3fc-200d-2642-fe0f": [42, 22],
	  "1f937-1f3fd-200d-2642-fe0f": [43, 22],
	  "1f937-1f3fe-200d-2642-fe0f": [44, 22],
	  "1f937-1f3ff-200d-2642-fe0f": [45, 22],
	  "1f937": [46, 22],
	  "1f937-1f3fb": [47, 22],
	  "1f937-1f3fc": [48, 22],
	  "1f937-1f3fd": [49, 22],
	  "1f937-1f3fe": [50, 22],
	  "1f937-1f3ff": [51, 22],
	  "1f64e": [52, 22],
	  "1f64e-1f3fb": [53, 22],
	  "1f64e-1f3fc": [54, 22],
	  "1f64e-1f3fd": [55, 22],
	  "1f64e-1f3fe": [56, 22],
	  "1f64e-1f3ff": [57, 22],
	  "1f64e-200d-2642-fe0f": [58, 22],
	  "1f64e-1f3fb-200d-2642-fe0f": [59, 22],
	  "1f64e-1f3fc-200d-2642-fe0f": [60, 22],
	  "1f64e-1f3fd-200d-2642-fe0f": [61, 22],
	  "1f64e-1f3fe-200d-2642-fe0f": [62, 22],
	  "1f64e-1f3ff-200d-2642-fe0f": [63, 22],
	  "1f64e-200d-2640-fe0f": [0, 23],
	  "1f64e-1f3ff-200d-2640-fe0f": [1, 23],
	  "1f64e-1f3fe-200d-2640-fe0f": [2, 23],
	  "1f64e-1f3fd-200d-2640-fe0f": [3, 23],
	  "1f64e-1f3fc-200d-2640-fe0f": [4, 23],
	  "1f64e-1f3fb-200d-2640-fe0f": [5, 23],
	  "1f64d": [6, 23],
	  "1f64d-1f3fb": [7, 23],
	  "1f64d-1f3fc": [8, 23],
	  "1f64d-1f3fd": [9, 23],
	  "1f64d-1f3fe": [10, 23],
	  "1f64d-1f3ff": [11, 23],
	  "1f64d-200d-2642-fe0f": [12, 23],
	  "1f64d-1f3fb-200d-2642-fe0f": [13, 23],
	  "1f64d-1f3fc-200d-2642-fe0f": [14, 23],
	  "1f64d-1f3fd-200d-2642-fe0f": [15, 23],
	  "1f64d-1f3fe-200d-2642-fe0f": [16, 23],
	  "1f64d-1f3ff-200d-2642-fe0f": [17, 23],
	  "1f64d-200d-2640-fe0f": [18, 23],
	  "1f64d-1f3ff-200d-2640-fe0f": [19, 23],
	  "1f64d-1f3fe-200d-2640-fe0f": [20, 23],
	  "1f64d-1f3fd-200d-2640-fe0f": [21, 23],
	  "1f64d-1f3fc-200d-2640-fe0f": [22, 23],
	  "1f64d-1f3fb-200d-2640-fe0f": [23, 23],
	  "1f487": [24, 23],
	  "1f487-1f3fb": [25, 23],
	  "1f487-1f3fc": [26, 23],
	  "1f487-1f3fd": [27, 23],
	  "1f487-1f3fe": [28, 23],
	  "1f487-1f3ff": [29, 23],
	  "1f487-200d-2642-fe0f": [30, 23],
	  "1f487-1f3fb-200d-2642-fe0f": [31, 23],
	  "1f487-1f3fc-200d-2642-fe0f": [32, 23],
	  "1f487-1f3fd-200d-2642-fe0f": [33, 23],
	  "1f487-1f3fe-200d-2642-fe0f": [34, 23],
	  "1f487-1f3ff-200d-2642-fe0f": [35, 23],
	  "1f487-200d-2640-fe0f": [36, 23],
	  "1f487-1f3ff-200d-2640-fe0f": [37, 23],
	  "1f487-1f3fe-200d-2640-fe0f": [38, 23],
	  "1f487-1f3fd-200d-2640-fe0f": [39, 23],
	  "1f487-1f3fc-200d-2640-fe0f": [40, 23],
	  "1f487-1f3fb-200d-2640-fe0f": [41, 23],
	  "1f486": [42, 23],
	  "1f486-1f3fb": [43, 23],
	  "1f486-1f3fc": [44, 23],
	  "1f486-1f3fd": [45, 23],
	  "1f486-1f3fe": [46, 23],
	  "1f486-1f3ff": [47, 23],
	  "1f486-200d-2642-fe0f": [48, 23],
	  "1f486-1f3fb-200d-2642-fe0f": [49, 23],
	  "1f486-1f3fc-200d-2642-fe0f": [50, 23],
	  "1f486-1f3fd-200d-2642-fe0f": [51, 23],
	  "1f486-1f3fe-200d-2642-fe0f": [52, 23],
	  "1f486-1f3ff-200d-2642-fe0f": [53, 23],
	  "1f486-200d-2640-fe0f": [54, 23],
	  "1f486-1f3ff-200d-2640-fe0f": [55, 23],
	  "1f486-1f3fe-200d-2640-fe0f": [56, 23],
	  "1f486-1f3fd-200d-2640-fe0f": [57, 23],
	  "1f486-1f3fc-200d-2640-fe0f": [58, 23],
	  "1f486-1f3fb-200d-2640-fe0f": [59, 23],
	  "1f574-fe0f": [60, 23],
	  "1f574-1f3fb": [61, 23],
	  "1f574-1f3fc": [62, 23],
	  "1f574-1f3fd": [63, 23],
	  "1f574-1f3fe": [0, 24],
	  "1f574-1f3ff": [1, 24],
	  "1f483": [2, 24],
	  "1f483-1f3fb": [3, 24],
	  "1f483-1f3fc": [4, 24],
	  "1f483-1f3fd": [5, 24],
	  "1f483-1f3fe": [6, 24],
	  "1f483-1f3ff": [7, 24],
	  "1f57a": [8, 24],
	  "1f57a-1f3fb": [9, 24],
	  "1f57a-1f3fc": [10, 24],
	  "1f57a-1f3fd": [11, 24],
	  "1f57a-1f3fe": [12, 24],
	  "1f57a-1f3ff": [13, 24],
	  "1f46f": [14, 24],
	  "1f46f-200d-2642-fe0f": [15, 24],
	  "1f46f-200d-2640-fe0f": [16, 24],
	  "1f6b6-200d-2640-fe0f": [17, 24],
	  "1f6b6-1f3fb-200d-2640-fe0f": [18, 24],
	  "1f6b6-1f3fc-200d-2640-fe0f": [19, 24],
	  "1f6b6-1f3fd-200d-2640-fe0f": [20, 24],
	  "1f6b6-1f3fe-200d-2640-fe0f": [21, 24],
	  "1f6b6-1f3ff-200d-2640-fe0f": [22, 24],
	  "1f6b6": [23, 24],
	  "1f6b6-1f3fb": [24, 24],
	  "1f6b6-1f3fc": [25, 24],
	  "1f6b6-1f3fd": [26, 24],
	  "1f6b6-1f3fe": [27, 24],
	  "1f6b6-1f3ff": [28, 24],
	  "1f6b6-200d-2642-fe0f": [29, 24],
	  "1f6b6-1f3ff-200d-2642-fe0f": [30, 24],
	  "1f6b6-1f3fe-200d-2642-fe0f": [31, 24],
	  "1f6b6-1f3fd-200d-2642-fe0f": [32, 24],
	  "1f6b6-1f3fc-200d-2642-fe0f": [33, 24],
	  "1f6b6-1f3fb-200d-2642-fe0f": [34, 24],
	  "1f3c3-200d-2640-fe0f": [35, 24],
	  "1f3c3-1f3fb-200d-2640-fe0f": [36, 24],
	  "1f3c3-1f3fc-200d-2640-fe0f": [37, 24],
	  "1f3c3-1f3fd-200d-2640-fe0f": [38, 24],
	  "1f3c3-1f3fe-200d-2640-fe0f": [39, 24],
	  "1f3c3-1f3ff-200d-2640-fe0f": [40, 24],
	  "1f3c3": [41, 24],
	  "1f3c3-1f3fb": [42, 24],
	  "1f3c3-1f3fc": [43, 24],
	  "1f3c3-1f3fd": [44, 24],
	  "1f3c3-1f3fe": [45, 24],
	  "1f3c3-1f3ff": [46, 24],
	  "1f3c3-200d-2642-fe0f": [47, 24],
	  "1f3c3-1f3ff-200d-2642-fe0f": [48, 24],
	  "1f3c3-1f3fe-200d-2642-fe0f": [49, 24],
	  "1f3c3-1f3fd-200d-2642-fe0f": [50, 24],
	  "1f3c3-1f3fc-200d-2642-fe0f": [51, 24],
	  "1f3c3-1f3fb-200d-2642-fe0f": [52, 24],
	  "1f46b": [53, 24],
	  "1f46d": [54, 24],
	  "1f46c": [55, 24],
	  "1f491": [56, 24],
	  "1f469-200d-2764-fe0f-200d-1f469": [57, 24],
	  "1f468-200d-2764-fe0f-200d-1f468": [58, 24],
	  "1f48f": [59, 24],
	  "1f469-200d-2764-fe0f-200d-1f48b-200d-1f469": [60, 24],
	  "1f468-200d-2764-fe0f-200d-1f48b-200d-1f468": [61, 24],
	  "1f46a": [62, 24],
	  "1f468-200d-1f469-200d-1f467": [63, 24],
	  "1f468-200d-1f469-200d-1f467-200d-1f466": [0, 25],
	  "1f468-200d-1f469-200d-1f466-200d-1f466": [1, 25],
	  "1f468-200d-1f469-200d-1f467-200d-1f467": [2, 25],
	  "1f469-200d-1f469-200d-1f466": [3, 25],
	  "1f469-200d-1f469-200d-1f467": [4, 25],
	  "1f469-200d-1f469-200d-1f467-200d-1f466": [5, 25],
	  "1f469-200d-1f469-200d-1f466-200d-1f466": [6, 25],
	  "1f469-200d-1f469-200d-1f467-200d-1f467": [7, 25],
	  "1f468-200d-1f468-200d-1f466": [8, 25],
	  "1f468-200d-1f468-200d-1f467": [9, 25],
	  "1f468-200d-1f468-200d-1f467-200d-1f466": [10, 25],
	  "1f468-200d-1f468-200d-1f466-200d-1f466": [11, 25],
	  "1f468-200d-1f468-200d-1f467-200d-1f467": [12, 25],
	  "1f469-200d-1f466": [13, 25],
	  "1f469-200d-1f467": [14, 25],
	  "1f469-200d-1f467-200d-1f466": [15, 25],
	  "1f469-200d-1f466-200d-1f466": [16, 25],
	  "1f469-200d-1f467-200d-1f467": [17, 25],
	  "1f468-200d-1f466": [18, 25],
	  "1f468-200d-1f467": [19, 25],
	  "1f468-200d-1f467-200d-1f466": [20, 25],
	  "1f468-200d-1f466-200d-1f466": [21, 25],
	  "1f468-200d-1f467-200d-1f467": [22, 25],
	  "1f45a": [23, 25],
	  "1f455": [24, 25],
	  "1f456": [25, 25],
	  "1f454": [26, 25],
	  "1f457": [27, 25],
	  "1f459": [28, 25],
	  "1f458": [29, 25],
	  "1f460": [30, 25],
	  "1f461": [31, 25],
	  "1f462": [32, 25],
	  "1f45e": [33, 25],
	  "1f45f": [34, 25],
	  "1f452": [35, 25],
	  "1f3a9": [36, 25],
	  "1f393": [37, 25],
	  "1f451": [38, 25],
	  "26d1-fe0f": [39, 25],
	  "1f392": [40, 25],
	  "1f45d": [41, 25],
	  "1f45b": [42, 25],
	  "1f45c": [43, 25],
	  "1f4bc": [44, 25],
	  "1f453": [45, 25],
	  "1f576-fe0f": [46, 25],
	  "1f302": [47, 25],
	  "1f468-200d-1f469-200d-1f466": [48, 25],
	  "1f469-200d-2764-fe0f-200d-1f468": [49, 25],
	  "1f469-200d-2764-fe0f-200d-1f48b-200d-1f468": [50, 25],
	  "1f928": [51, 25],
	  "1f929": [52, 25],
	  "1f92a": [53, 25],
	  "1f92b": [54, 25],
	  "1f92c": [55, 25],
	  "1f92d": [56, 25],
	  "1f92e": [57, 25],
	  "1f92f": [58, 25],
	  "1f9d0": [59, 25],
	  "1f9d1": [60, 25],
	  "1f9d2": [61, 25],
	  "1f9d3": [62, 25],
	  "1f9d4": [63, 25],
	  "1f9d5": [0, 26],
	  "1f9e0": [1, 26],
	  "1f9e2": [2, 26],
	  "1f9d9": [3, 26],
	  "1f9da": [4, 26],
	  "1f9db": [5, 26],
	  "1f9dc": [6, 26],
	  "1f9dd": [7, 26],
	  "1f9de": [8, 26],
	  "1f9df": [9, 26],
	  "1f9e3": [10, 26],
	  "1f9e4": [11, 26],
	  "1f9e5": [12, 26],
	  "1f9e6": [13, 26],
	  "1f91f": [14, 26],
	  "1f91f-1f3fb": [15, 26],
	  "1f91f-1f3fc": [16, 26],
	  "1f91f-1f3fd": [17, 26],
	  "1f91f-1f3fe": [18, 26],
	  "1f91f-1f3ff": [19, 26],
	  "1f932": [20, 26],
	  "1f932-1f3fb": [21, 26],
	  "1f932-1f3fc": [22, 26],
	  "1f932-1f3fd": [23, 26],
	  "1f932-1f3fe": [24, 26],
	  "1f932-1f3ff": [25, 26],
	  "1f9d1-1f3fb": [26, 26],
	  "1f9d1-1f3fc": [27, 26],
	  "1f9d1-1f3fd": [28, 26],
	  "1f9d1-1f3fe": [29, 26],
	  "1f9d1-1f3ff": [30, 26],
	  "1f9d2-1f3fb": [31, 26],
	  "1f9d2-1f3fc": [32, 26],
	  "1f9d2-1f3fd": [33, 26],
	  "1f9d2-1f3fe": [34, 26],
	  "1f9d2-1f3ff": [35, 26],
	  "1f9d3-1f3fb": [36, 26],
	  "1f9d3-1f3fc": [37, 26],
	  "1f9d3-1f3fd": [38, 26],
	  "1f9d3-1f3fe": [39, 26],
	  "1f9d3-1f3ff": [40, 26],
	  "1f9d4-1f3fb": [41, 26],
	  "1f9d4-1f3fc": [42, 26],
	  "1f9d4-1f3fd": [43, 26],
	  "1f9d4-1f3fe": [44, 26],
	  "1f9d4-1f3ff": [45, 26],
	  "1f9d5-1f3fb": [46, 26],
	  "1f9d5-1f3fc": [47, 26],
	  "1f9d5-1f3fd": [48, 26],
	  "1f9d5-1f3fe": [49, 26],
	  "1f9d5-1f3ff": [50, 26],
	  "1f9d9-1f3fb": [51, 26],
	  "1f9d9-1f3fc": [52, 26],
	  "1f9d9-1f3fd": [53, 26],
	  "1f9d9-1f3fe": [54, 26],
	  "1f9d9-1f3ff": [55, 26],
	  "1f9da-1f3fb": [56, 26],
	  "1f9da-1f3fc": [57, 26],
	  "1f9da-1f3fd": [58, 26],
	  "1f9da-1f3fe": [59, 26],
	  "1f9da-1f3ff": [60, 26],
	  "1f9db-1f3fb": [61, 26],
	  "1f9db-1f3fc": [62, 26],
	  "1f9db-1f3fd": [63, 26],
	  "1f9db-1f3fe": [0, 27],
	  "1f9db-1f3ff": [1, 27],
	  "1f9dc-1f3fb": [2, 27],
	  "1f9dc-1f3fc": [3, 27],
	  "1f9dc-1f3fd": [4, 27],
	  "1f9dc-1f3fe": [5, 27],
	  "1f9dc-1f3ff": [6, 27],
	  "1f9dd-1f3fb": [7, 27],
	  "1f9dd-1f3fc": [8, 27],
	  "1f9dd-1f3fd": [9, 27],
	  "1f9dd-1f3fe": [10, 27],
	  "1f9dd-1f3ff": [11, 27],
	  "1f9d9-200d-2640-fe0f": [12, 27],
	  "1f9d9-200d-2642-fe0f": [13, 27],
	  "1f9d9-1f3fb-200d-2640-fe0f": [14, 27],
	  "1f9d9-1f3fb-200d-2642-fe0f": [15, 27],
	  "1f9d9-1f3fc-200d-2640-fe0f": [16, 27],
	  "1f9d9-1f3fc-200d-2642-fe0f": [17, 27],
	  "1f9d9-1f3fd-200d-2640-fe0f": [18, 27],
	  "1f9d9-1f3fd-200d-2642-fe0f": [19, 27],
	  "1f9d9-1f3fe-200d-2640-fe0f": [20, 27],
	  "1f9d9-1f3fe-200d-2642-fe0f": [21, 27],
	  "1f9d9-1f3ff-200d-2640-fe0f": [22, 27],
	  "1f9d9-1f3ff-200d-2642-fe0f": [23, 27],
	  "1f9da-200d-2640-fe0f": [24, 27],
	  "1f9da-200d-2642-fe0f": [25, 27],
	  "1f9da-1f3fb-200d-2640-fe0f": [26, 27],
	  "1f9da-1f3fb-200d-2642-fe0f": [27, 27],
	  "1f9da-1f3fc-200d-2640-fe0f": [28, 27],
	  "1f9da-1f3fc-200d-2642-fe0f": [29, 27],
	  "1f9da-1f3fd-200d-2640-fe0f": [30, 27],
	  "1f9da-1f3fd-200d-2642-fe0f": [31, 27],
	  "1f9da-1f3fe-200d-2640-fe0f": [32, 27],
	  "1f9da-1f3fe-200d-2642-fe0f": [33, 27],
	  "1f9da-1f3ff-200d-2640-fe0f": [34, 27],
	  "1f9da-1f3ff-200d-2642-fe0f": [35, 27],
	  "1f9db-200d-2640-fe0f": [36, 27],
	  "1f9db-200d-2642-fe0f": [37, 27],
	  "1f9db-1f3fb-200d-2640-fe0f": [38, 27],
	  "1f9db-1f3fb-200d-2642-fe0f": [39, 27],
	  "1f9db-1f3fc-200d-2640-fe0f": [40, 27],
	  "1f9db-1f3fc-200d-2642-fe0f": [41, 27],
	  "1f9db-1f3fd-200d-2640-fe0f": [42, 27],
	  "1f9db-1f3fd-200d-2642-fe0f": [43, 27],
	  "1f9db-1f3fe-200d-2640-fe0f": [44, 27],
	  "1f9db-1f3fe-200d-2642-fe0f": [45, 27],
	  "1f9db-1f3ff-200d-2640-fe0f": [46, 27],
	  "1f9db-1f3ff-200d-2642-fe0f": [47, 27],
	  "1f9dc-200d-2640-fe0f": [48, 27],
	  "1f9dc-200d-2642-fe0f": [49, 27],
	  "1f9dc-1f3fb-200d-2640-fe0f": [50, 27],
	  "1f9dc-1f3fb-200d-2642-fe0f": [51, 27],
	  "1f9dc-1f3fc-200d-2640-fe0f": [52, 27],
	  "1f9dc-1f3fc-200d-2642-fe0f": [53, 27],
	  "1f9dc-1f3fd-200d-2640-fe0f": [54, 27],
	  "1f9dc-1f3fd-200d-2642-fe0f": [55, 27],
	  "1f9dc-1f3fe-200d-2640-fe0f": [56, 27],
	  "1f9dc-1f3fe-200d-2642-fe0f": [57, 27],
	  "1f9dc-1f3ff-200d-2640-fe0f": [58, 27],
	  "1f9dc-1f3ff-200d-2642-fe0f": [59, 27],
	  "1f9dd-200d-2640-fe0f": [60, 27],
	  "1f9dd-200d-2642-fe0f": [61, 27],
	  "1f9dd-1f3fb-200d-2640-fe0f": [62, 27],
	  "1f9dd-1f3fb-200d-2642-fe0f": [63, 27],
	  "1f9dd-1f3fc-200d-2640-fe0f": [0, 28],
	  "1f9dd-1f3fc-200d-2642-fe0f": [1, 28],
	  "1f9dd-1f3fd-200d-2640-fe0f": [2, 28],
	  "1f9dd-1f3fd-200d-2642-fe0f": [3, 28],
	  "1f9dd-1f3fe-200d-2640-fe0f": [4, 28],
	  "1f9dd-1f3fe-200d-2642-fe0f": [5, 28],
	  "1f9dd-1f3ff-200d-2640-fe0f": [6, 28],
	  "1f9dd-1f3ff-200d-2642-fe0f": [7, 28],
	  "1f9de-200d-2640-fe0f": [8, 28],
	  "1f9de-200d-2642-fe0f": [9, 28],
	  "1f9df-200d-2640-fe0f": [10, 28],
	  "1f9df-200d-2642-fe0f": [11, 28],
	  "1f34f": [13, 28],
	  "1f34e": [14, 28],
	  "1f350": [15, 28],
	  "1f34a": [16, 28],
	  "1f34b": [17, 28],
	  "1f34c": [18, 28],
	  "1f349": [19, 28],
	  "1f347": [20, 28],
	  "1f353": [21, 28],
	  "1f348": [22, 28],
	  "1f352": [23, 28],
	  "1f351": [24, 28],
	  "1f34d": [25, 28],
	  "1f95d": [26, 28],
	  "1f951": [27, 28],
	  "1f345": [28, 28],
	  "1f346": [29, 28],
	  "1f952": [30, 28],
	  "1f955": [31, 28],
	  "1f33d": [32, 28],
	  "1f336-fe0f": [33, 28],
	  "1f954": [34, 28],
	  "1f360": [35, 28],
	  "1f330": [36, 28],
	  "1f95c": [37, 28],
	  "1f36f": [38, 28],
	  "1f950": [39, 28],
	  "1f35e": [40, 28],
	  "1f956": [41, 28],
	  "1f9c0": [42, 28],
	  "1f95a": [43, 28],
	  "1f373": [44, 28],
	  "1f953": [45, 28],
	  "1f95e": [46, 28],
	  "1f364": [47, 28],
	  "1f357": [48, 28],
	  "1f356": [49, 28],
	  "1f355": [50, 28],
	  "1f32d": [51, 28],
	  "1f354": [52, 28],
	  "1f35f": [53, 28],
	  "1f959": [54, 28],
	  "1f32e": [55, 28],
	  "1f32f": [56, 28],
	  "1f957": [57, 28],
	  "1f958": [58, 28],
	  "1f35d": [59, 28],
	  "1f35c": [60, 28],
	  "1f372": [61, 28],
	  "1f365": [62, 28],
	  "1f363": [63, 28],
	  "1f371": [0, 29],
	  "1f35b": [1, 29],
	  "1f359": [2, 29],
	  "1f35a": [3, 29],
	  "1f358": [4, 29],
	  "1f362": [5, 29],
	  "1f361": [6, 29],
	  "1f367": [7, 29],
	  "1f368": [8, 29],
	  "1f366": [9, 29],
	  "1f370": [10, 29],
	  "1f382": [11, 29],
	  "1f36e": [12, 29],
	  "1f36d": [13, 29],
	  "1f36c": [14, 29],
	  "1f36b": [15, 29],
	  "1f37f": [16, 29],
	  "1f369": [17, 29],
	  "1f36a": [18, 29],
	  "1f95b": [19, 29],
	  "1f37c": [20, 29],
	  "1f375": [21, 29],
	  "1f376": [22, 29],
	  "1f37a": [23, 29],
	  "1f37b": [24, 29],
	  "1f942": [25, 29],
	  "1f377": [26, 29],
	  "1f943": [27, 29],
	  "1f378": [28, 29],
	  "1f379": [29, 29],
	  "1f37e": [30, 29],
	  "1f944": [31, 29],
	  "1f374": [32, 29],
	  "1f37d-fe0f": [33, 29],
	  "1f95f": [34, 29],
	  "1f960": [35, 29],
	  "1f961": [36, 29],
	  "1f962": [37, 29],
	  "1f963": [38, 29],
	  "1f964": [39, 29],
	  "1f965": [40, 29],
	  "1f966": [41, 29],
	  "1f967": [42, 29],
	  "1f968": [43, 29],
	  "1f969": [44, 29],
	  "1f96a": [45, 29],
	  "1f96b": [46, 29],
	  "2708-fe0f": [48, 29],
	  "1f697": [49, 29],
	  "1f695": [50, 29],
	  "1f699": [51, 29],
	  "1f68c": [52, 29],
	  "1f68e": [53, 29],
	  "1f3ce-fe0f": [54, 29],
	  "1f693": [55, 29],
	  "1f691": [56, 29],
	  "1f692": [57, 29],
	  "1f690": [58, 29],
	  "1f69a": [59, 29],
	  "1f69b": [60, 29],
	  "1f69c": [61, 29],
	  "1f6f4": [62, 29],
	  "1f6b2": [63, 29],
	  "1f6f5": [0, 30],
	  "1f3cd-fe0f": [1, 30],
	  "1f6a8": [2, 30],
	  "1f694": [3, 30],
	  "1f68d": [4, 30],
	  "1f698": [5, 30],
	  "1f696": [6, 30],
	  "1f6a1": [7, 30],
	  "1f6a0": [8, 30],
	  "1f69f": [9, 30],
	  "1f683": [10, 30],
	  "1f68b": [11, 30],
	  "1f69e": [12, 30],
	  "1f69d": [13, 30],
	  "1f684": [14, 30],
	  "1f685": [15, 30],
	  "1f688": [16, 30],
	  "1f682": [17, 30],
	  "1f686": [18, 30],
	  "1f687": [19, 30],
	  "1f68a": [20, 30],
	  "1f689": [21, 30],
	  "1f681": [22, 30],
	  "1f6e9-fe0f": [23, 30],
	  "1f6eb": [24, 30],
	  "1f6ec": [25, 30],
	  "1f680": [26, 30],
	  "1f6f0-fe0f": [27, 30],
	  "1f4ba": [28, 30],
	  "1f6f6": [29, 30],
	  "26f5": [30, 30],
	  "1f6e5-fe0f": [31, 30],
	  "1f6a4": [32, 30],
	  "1f6f3-fe0f": [33, 30],
	  "26f4-fe0f": [34, 30],
	  "1f6a2": [35, 30],
	  "1f6a7": [36, 30],
	  "26fd": [37, 30],
	  "1f68f": [38, 30],
	  "1f6a6": [39, 30],
	  "1f6a5": [40, 30],
	  "1f5fa-fe0f": [41, 30],
	  "1f5ff": [42, 30],
	  "1f5fd": [43, 30],
	  "26f2": [44, 30],
	  "1f5fc": [45, 30],
	  "1f3f0": [46, 30],
	  "1f3ef": [47, 30],
	  "1f3df-fe0f": [48, 30],
	  "1f3a1": [49, 30],
	  "1f3a2": [50, 30],
	  "1f3a0": [51, 30],
	  "26f1-fe0f": [52, 30],
	  "1f3d6-fe0f": [53, 30],
	  "1f3dd-fe0f": [54, 30],
	  "26f0-fe0f": [55, 30],
	  "1f3d4-fe0f": [56, 30],
	  "1f5fb": [57, 30],
	  "1f30b": [58, 30],
	  "1f3dc-fe0f": [59, 30],
	  "1f3d5-fe0f": [60, 30],
	  "26fa": [61, 30],
	  "1f6e4-fe0f": [62, 30],
	  "1f6e3-fe0f": [63, 30],
	  "1f3d7-fe0f": [0, 31],
	  "1f3ed": [1, 31],
	  "1f3e0": [2, 31],
	  "1f3e1": [3, 31],
	  "1f3d8-fe0f": [4, 31],
	  "1f3da-fe0f": [5, 31],
	  "1f3e2": [6, 31],
	  "1f3ec": [7, 31],
	  "1f3e3": [8, 31],
	  "1f3e4": [9, 31],
	  "1f3e5": [10, 31],
	  "1f3e6": [11, 31],
	  "1f3e8": [12, 31],
	  "1f3ea": [13, 31],
	  "1f3eb": [14, 31],
	  "1f3e9": [15, 31],
	  "1f492": [16, 31],
	  "1f3db-fe0f": [17, 31],
	  "26ea": [18, 31],
	  "1f54c": [19, 31],
	  "1f54d": [20, 31],
	  "1f54b": [21, 31],
	  "26e9-fe0f": [22, 31],
	  "1f5fe": [23, 31],
	  "1f391": [24, 31],
	  "1f3de-fe0f": [25, 31],
	  "1f305": [26, 31],
	  "1f304": [27, 31],
	  "1f320": [28, 31],
	  "1f387": [29, 31],
	  "1f386": [30, 31],
	  "1f307": [31, 31],
	  "1f306": [32, 31],
	  "1f3d9-fe0f": [33, 31],
	  "1f303": [34, 31],
	  "1f30c": [35, 31],
	  "1f309": [36, 31],
	  "1f301": [37, 31],
	  "1f6f8": [38, 31],
	  "26bd": [39, 31],
	  "1f3c0": [40, 31],
	  "1f3c8": [41, 31],
	  "26be": [42, 31],
	  "1f3be": [43, 31],
	  "1f3d0": [44, 31],
	  "1f3c9": [45, 31],
	  "1f3b1": [46, 31],
	  "1f3d3": [47, 31],
	  "1f3f8": [48, 31],
	  "1f945": [49, 31],
	  "1f3d2": [50, 31],
	  "1f3d1": [51, 31],
	  "1f3cf": [52, 31],
	  "26f3": [53, 31],
	  "1f3f9": [54, 31],
	  "1f3a3": [55, 31],
	  "1f94a": [56, 31],
	  "1f94b": [57, 31],
	  "26f8-fe0f": [58, 31],
	  "1f3bf": [59, 31],
	  "26f7-fe0f": [60, 31],
	  "1f3c2": [61, 31],
	  "1f3c2-1f3fb": [62, 31],
	  "1f3c2-1f3fc": [63, 31],
	  "1f3c2-1f3fd": [0, 32],
	  "1f3c2-1f3fe": [1, 32],
	  "1f3c2-1f3ff": [2, 32],
	  "1f3cb-fe0f-200d-2640-fe0f": [3, 32],
	  "1f3cb-1f3fb-200d-2640-fe0f": [4, 32],
	  "1f3cb-1f3fc-200d-2640-fe0f": [5, 32],
	  "1f3cb-1f3fd-200d-2640-fe0f": [6, 32],
	  "1f3cb-1f3fe-200d-2640-fe0f": [7, 32],
	  "1f3cb-1f3ff-200d-2640-fe0f": [8, 32],
	  "1f3cb-fe0f": [9, 32],
	  "1f3cb-1f3fb": [10, 32],
	  "1f3cb-1f3fc": [11, 32],
	  "1f3cb-1f3fd": [12, 32],
	  "1f3cb-1f3fe": [13, 32],
	  "1f3cb-1f3ff": [14, 32],
	  "1f3cb-fe0f-200d-2642-fe0f": [15, 32],
	  "1f3cb-1f3ff-200d-2642-fe0f": [16, 32],
	  "1f3cb-1f3fe-200d-2642-fe0f": [17, 32],
	  "1f3cb-1f3fd-200d-2642-fe0f": [18, 32],
	  "1f3cb-1f3fc-200d-2642-fe0f": [19, 32],
	  "1f3cb-1f3fb-200d-2642-fe0f": [20, 32],
	  "1f93a": [21, 32],
	  "1f93c-200d-2640-fe0f": [22, 32],
	  "1f93c-200d-2642-fe0f": [23, 32],
	  "1f93c": [24, 32],
	  "1f938-200d-2640-fe0f": [25, 32],
	  "1f938-1f3fb-200d-2640-fe0f": [26, 32],
	  "1f938-1f3fc-200d-2640-fe0f": [27, 32],
	  "1f938-1f3fd-200d-2640-fe0f": [28, 32],
	  "1f938-1f3fe-200d-2640-fe0f": [29, 32],
	  "1f938-1f3ff-200d-2640-fe0f": [30, 32],
	  "1f938-200d-2642-fe0f": [31, 32],
	  "1f938-1f3fb-200d-2642-fe0f": [32, 32],
	  "1f938-1f3fc-200d-2642-fe0f": [33, 32],
	  "1f938-1f3fd-200d-2642-fe0f": [34, 32],
	  "1f938-1f3fe-200d-2642-fe0f": [35, 32],
	  "1f938-1f3ff-200d-2642-fe0f": [36, 32],
	  "1f938": [37, 32],
	  "1f938-1f3fb": [38, 32],
	  "1f938-1f3fc": [39, 32],
	  "1f938-1f3fd": [40, 32],
	  "1f938-1f3fe": [41, 32],
	  "1f938-1f3ff": [42, 32],
	  "26f9-fe0f-200d-2640-fe0f": [43, 32],
	  "26f9-1f3fb-200d-2640-fe0f": [44, 32],
	  "26f9-1f3fc-200d-2640-fe0f": [45, 32],
	  "26f9-1f3fd-200d-2640-fe0f": [46, 32],
	  "26f9-1f3fe-200d-2640-fe0f": [47, 32],
	  "26f9-1f3ff-200d-2640-fe0f": [48, 32],
	  "26f9-fe0f": [49, 32],
	  "26f9-1f3fb": [50, 32],
	  "26f9-1f3fc": [51, 32],
	  "26f9-1f3fd": [52, 32],
	  "26f9-1f3fe": [53, 32],
	  "26f9-1f3ff": [54, 32],
	  "26f9-fe0f-200d-2642-fe0f": [55, 32],
	  "26f9-1f3ff-200d-2642-fe0f": [56, 32],
	  "26f9-1f3fe-200d-2642-fe0f": [57, 32],
	  "26f9-1f3fd-200d-2642-fe0f": [58, 32],
	  "26f9-1f3fc-200d-2642-fe0f": [59, 32],
	  "26f9-1f3fb-200d-2642-fe0f": [60, 32],
	  "1f93e-200d-2640-fe0f": [61, 32],
	  "1f93e-1f3fb-200d-2640-fe0f": [62, 32],
	  "1f93e-1f3fc-200d-2640-fe0f": [63, 32],
	  "1f93e-1f3fd-200d-2640-fe0f": [0, 33],
	  "1f93e-1f3fe-200d-2640-fe0f": [1, 33],
	  "1f93e-1f3ff-200d-2640-fe0f": [2, 33],
	  "1f93e-200d-2642-fe0f": [3, 33],
	  "1f93e-1f3fb-200d-2642-fe0f": [4, 33],
	  "1f93e-1f3fc-200d-2642-fe0f": [5, 33],
	  "1f93e-1f3fd-200d-2642-fe0f": [6, 33],
	  "1f93e-1f3fe-200d-2642-fe0f": [7, 33],
	  "1f93e-1f3ff-200d-2642-fe0f": [8, 33],
	  "1f93e": [9, 33],
	  "1f93e-1f3fb": [10, 33],
	  "1f93e-1f3fc": [11, 33],
	  "1f93e-1f3fd": [12, 33],
	  "1f93e-1f3fe": [13, 33],
	  "1f93e-1f3ff": [14, 33],
	  "1f3cc-fe0f-200d-2640-fe0f": [15, 33],
	  "1f3cc-1f3fb-200d-2640-fe0f": [16, 33],
	  "1f3cc-1f3fc-200d-2640-fe0f": [17, 33],
	  "1f3cc-1f3fd-200d-2640-fe0f": [18, 33],
	  "1f3cc-1f3fe-200d-2640-fe0f": [19, 33],
	  "1f3cc-1f3ff-200d-2640-fe0f": [20, 33],
	  "1f3cc-fe0f": [21, 33],
	  "1f3cc-1f3fb": [22, 33],
	  "1f3cc-1f3fc": [23, 33],
	  "1f3cc-1f3fd": [24, 33],
	  "1f3cc-1f3fe": [25, 33],
	  "1f3cc-1f3ff": [26, 33],
	  "1f3cc-fe0f-200d-2642-fe0f": [27, 33],
	  "1f3cc-1f3fb-200d-2642-fe0f": [28, 33],
	  "1f3cc-1f3fc-200d-2642-fe0f": [29, 33],
	  "1f3cc-1f3fd-200d-2642-fe0f": [30, 33],
	  "1f3cc-1f3fe-200d-2642-fe0f": [31, 33],
	  "1f3cc-1f3ff-200d-2642-fe0f": [32, 33],
	  "1f3c4-200d-2640-fe0f": [33, 33],
	  "1f3c4-1f3fb-200d-2640-fe0f": [34, 33],
	  "1f3c4-1f3fc-200d-2640-fe0f": [35, 33],
	  "1f3c4-1f3fd-200d-2640-fe0f": [36, 33],
	  "1f3c4-1f3fe-200d-2640-fe0f": [37, 33],
	  "1f3c4-1f3ff-200d-2640-fe0f": [38, 33],
	  "1f3c4": [39, 33],
	  "1f3c4-1f3fb": [40, 33],
	  "1f3c4-1f3fc": [41, 33],
	  "1f3c4-1f3fd": [42, 33],
	  "1f3c4-1f3fe": [43, 33],
	  "1f3c4-1f3ff": [44, 33],
	  "1f3c4-200d-2642-fe0f": [45, 33],
	  "1f3c4-1f3ff-200d-2642-fe0f": [46, 33],
	  "1f3c4-1f3fe-200d-2642-fe0f": [47, 33],
	  "1f3c4-1f3fd-200d-2642-fe0f": [48, 33],
	  "1f3c4-1f3fc-200d-2642-fe0f": [49, 33],
	  "1f3c4-1f3fb-200d-2642-fe0f": [50, 33],
	  "1f3ca-200d-2640-fe0f": [51, 33],
	  "1f3ca-1f3fb-200d-2640-fe0f": [52, 33],
	  "1f3ca-1f3fc-200d-2640-fe0f": [53, 33],
	  "1f3ca-1f3fd-200d-2640-fe0f": [54, 33],
	  "1f3ca-1f3fe-200d-2640-fe0f": [55, 33],
	  "1f3ca-1f3ff-200d-2640-fe0f": [56, 33],
	  "1f3ca": [57, 33],
	  "1f3ca-1f3fb": [58, 33],
	  "1f3ca-1f3fc": [59, 33],
	  "1f3ca-1f3fd": [60, 33],
	  "1f3ca-1f3fe": [61, 33],
	  "1f3ca-1f3ff": [62, 33],
	  "1f3ca-200d-2642-fe0f": [63, 33],
	  "1f3ca-1f3ff-200d-2642-fe0f": [0, 34],
	  "1f3ca-1f3fe-200d-2642-fe0f": [1, 34],
	  "1f3ca-1f3fd-200d-2642-fe0f": [2, 34],
	  "1f3ca-1f3fc-200d-2642-fe0f": [3, 34],
	  "1f3ca-1f3fb-200d-2642-fe0f": [4, 34],
	  "1f93d-200d-2640-fe0f": [5, 34],
	  "1f93d-1f3fb-200d-2640-fe0f": [6, 34],
	  "1f93d-1f3fc-200d-2640-fe0f": [7, 34],
	  "1f93d-1f3fd-200d-2640-fe0f": [8, 34],
	  "1f93d-1f3fe-200d-2640-fe0f": [9, 34],
	  "1f93d-1f3ff-200d-2640-fe0f": [10, 34],
	  "1f93d-200d-2642-fe0f": [11, 34],
	  "1f93d-1f3fb-200d-2642-fe0f": [12, 34],
	  "1f93d-1f3fc-200d-2642-fe0f": [13, 34],
	  "1f93d-1f3fd-200d-2642-fe0f": [14, 34],
	  "1f93d-1f3fe-200d-2642-fe0f": [15, 34],
	  "1f93d-1f3ff-200d-2642-fe0f": [16, 34],
	  "1f93d": [17, 34],
	  "1f93d-1f3fb": [18, 34],
	  "1f93d-1f3fc": [19, 34],
	  "1f93d-1f3fd": [20, 34],
	  "1f93d-1f3fe": [21, 34],
	  "1f93d-1f3ff": [22, 34],
	  "1f6a3-200d-2640-fe0f": [23, 34],
	  "1f6a3-1f3fb-200d-2640-fe0f": [24, 34],
	  "1f6a3-1f3fc-200d-2640-fe0f": [25, 34],
	  "1f6a3-1f3fd-200d-2640-fe0f": [26, 34],
	  "1f6a3-1f3fe-200d-2640-fe0f": [27, 34],
	  "1f6a3-1f3ff-200d-2640-fe0f": [28, 34],
	  "1f6a3": [29, 34],
	  "1f6a3-1f3fb": [30, 34],
	  "1f6a3-1f3fc": [31, 34],
	  "1f6a3-1f3fd": [32, 34],
	  "1f6a3-1f3fe": [33, 34],
	  "1f6a3-1f3ff": [34, 34],
	  "1f6a3-200d-2642-fe0f": [35, 34],
	  "1f6a3-1f3ff-200d-2642-fe0f": [36, 34],
	  "1f6a3-1f3fe-200d-2642-fe0f": [37, 34],
	  "1f6a3-1f3fd-200d-2642-fe0f": [38, 34],
	  "1f6a3-1f3fc-200d-2642-fe0f": [39, 34],
	  "1f6a3-1f3fb-200d-2642-fe0f": [40, 34],
	  "1f3c7": [41, 34],
	  "1f3c7-1f3fb": [42, 34],
	  "1f3c7-1f3fc": [43, 34],
	  "1f3c7-1f3fd": [44, 34],
	  "1f3c7-1f3fe": [45, 34],
	  "1f3c7-1f3ff": [46, 34],
	  "1f6b4-200d-2640-fe0f": [47, 34],
	  "1f6b4-1f3fb-200d-2640-fe0f": [48, 34],
	  "1f6b4-1f3fc-200d-2640-fe0f": [49, 34],
	  "1f6b4-1f3fd-200d-2640-fe0f": [50, 34],
	  "1f6b4-1f3fe-200d-2640-fe0f": [51, 34],
	  "1f6b4-1f3ff-200d-2640-fe0f": [52, 34],
	  "1f6b4": [53, 34],
	  "1f6b4-1f3fb": [54, 34],
	  "1f6b4-1f3fc": [55, 34],
	  "1f6b4-1f3fd": [56, 34],
	  "1f6b4-1f3fe": [57, 34],
	  "1f6b4-1f3ff": [58, 34],
	  "1f6b4-200d-2642-fe0f": [59, 34],
	  "1f6b4-1f3ff-200d-2642-fe0f": [60, 34],
	  "1f6b4-1f3fe-200d-2642-fe0f": [61, 34],
	  "1f6b4-1f3fd-200d-2642-fe0f": [62, 34],
	  "1f6b4-1f3fc-200d-2642-fe0f": [63, 34],
	  "1f6b4-1f3fb-200d-2642-fe0f": [0, 35],
	  "1f6b5-200d-2640-fe0f": [1, 35],
	  "1f6b5-1f3fb-200d-2640-fe0f": [2, 35],
	  "1f6b5-1f3fc-200d-2640-fe0f": [3, 35],
	  "1f6b5-1f3fd-200d-2640-fe0f": [4, 35],
	  "1f6b5-1f3fe-200d-2640-fe0f": [5, 35],
	  "1f6b5-1f3ff-200d-2640-fe0f": [6, 35],
	  "1f6b5": [7, 35],
	  "1f6b5-1f3fb": [8, 35],
	  "1f6b5-1f3fc": [9, 35],
	  "1f6b5-1f3fd": [10, 35],
	  "1f6b5-1f3fe": [11, 35],
	  "1f6b5-1f3ff": [12, 35],
	  "1f6b5-200d-2642-fe0f": [13, 35],
	  "1f6b5-1f3ff-200d-2642-fe0f": [14, 35],
	  "1f6b5-1f3fe-200d-2642-fe0f": [15, 35],
	  "1f6b5-1f3fd-200d-2642-fe0f": [16, 35],
	  "1f6b5-1f3fc-200d-2642-fe0f": [17, 35],
	  "1f6b5-1f3fb-200d-2642-fe0f": [18, 35],
	  "1f3bd": [19, 35],
	  "1f3c5": [20, 35],
	  "1f396-fe0f": [21, 35],
	  "1f947": [22, 35],
	  "1f948": [23, 35],
	  "1f949": [24, 35],
	  "1f3c6": [25, 35],
	  "1f3f5-fe0f": [26, 35],
	  "1f397-fe0f": [27, 35],
	  "1f3ab": [28, 35],
	  "1f39f-fe0f": [29, 35],
	  "1f3aa": [30, 35],
	  "1f939-200d-2640-fe0f": [31, 35],
	  "1f939-1f3fb-200d-2640-fe0f": [32, 35],
	  "1f939-1f3fc-200d-2640-fe0f": [33, 35],
	  "1f939-1f3fd-200d-2640-fe0f": [34, 35],
	  "1f939-1f3fe-200d-2640-fe0f": [35, 35],
	  "1f939-1f3ff-200d-2640-fe0f": [36, 35],
	  "1f939-200d-2642-fe0f": [37, 35],
	  "1f939-1f3fb-200d-2642-fe0f": [38, 35],
	  "1f939-1f3fc-200d-2642-fe0f": [39, 35],
	  "1f939-1f3fd-200d-2642-fe0f": [40, 35],
	  "1f939-1f3fe-200d-2642-fe0f": [41, 35],
	  "1f939-1f3ff-200d-2642-fe0f": [42, 35],
	  "1f939": [43, 35],
	  "1f939-1f3fb": [44, 35],
	  "1f939-1f3fc": [45, 35],
	  "1f939-1f3fd": [46, 35],
	  "1f939-1f3fe": [47, 35],
	  "1f939-1f3ff": [48, 35],
	  "1f3ad": [49, 35],
	  "1f3a8": [50, 35],
	  "1f3ac": [51, 35],
	  "1f3a4": [52, 35],
	  "1f3a7": [53, 35],
	  "1f3bc": [54, 35],
	  "1f3b9": [55, 35],
	  "1f941": [56, 35],
	  "1f3b7": [57, 35],
	  "1f3ba": [58, 35],
	  "1f3b8": [59, 35],
	  "1f3bb": [60, 35],
	  "1f3b2": [61, 35],
	  "1f3af": [62, 35],
	  "1f3b3": [63, 35],
	  "1f3ae": [0, 36],
	  "1f3b0": [1, 36],
	  "1f6f7": [2, 36],
	  "1f931": [3, 36],
	  "1f94c": [4, 36],
	  "1f9d6": [5, 36],
	  "1f9d7": [6, 36],
	  "1f9d8": [7, 36],
	  "1f931-1f3fb": [8, 36],
	  "1f931-1f3fc": [9, 36],
	  "1f931-1f3fd": [10, 36],
	  "1f931-1f3fe": [11, 36],
	  "1f931-1f3ff": [12, 36],
	  "1f9d6-1f3fb": [13, 36],
	  "1f9d6-1f3fc": [14, 36],
	  "1f9d6-1f3fd": [15, 36],
	  "1f9d6-1f3fe": [16, 36],
	  "1f9d6-1f3ff": [17, 36],
	  "1f9d7-1f3fb": [18, 36],
	  "1f9d7-1f3fc": [19, 36],
	  "1f9d7-1f3fd": [20, 36],
	  "1f9d7-1f3fe": [21, 36],
	  "1f9d7-1f3ff": [22, 36],
	  "1f9d8-1f3fb": [23, 36],
	  "1f9d8-1f3fc": [24, 36],
	  "1f9d8-1f3fd": [25, 36],
	  "1f9d8-1f3fe": [26, 36],
	  "1f9d8-1f3ff": [27, 36],
	  "1f9d6-200d-2640-fe0f": [28, 36],
	  "1f9d6-200d-2642-fe0f": [29, 36],
	  "1f9d6-1f3fb-200d-2640-fe0f": [30, 36],
	  "1f9d6-1f3fb-200d-2642-fe0f": [31, 36],
	  "1f9d6-1f3fc-200d-2640-fe0f": [32, 36],
	  "1f9d6-1f3fc-200d-2642-fe0f": [33, 36],
	  "1f9d6-1f3fd-200d-2640-fe0f": [34, 36],
	  "1f9d6-1f3fd-200d-2642-fe0f": [35, 36],
	  "1f9d6-1f3fe-200d-2640-fe0f": [36, 36],
	  "1f9d6-1f3fe-200d-2642-fe0f": [37, 36],
	  "1f9d6-1f3ff-200d-2640-fe0f": [38, 36],
	  "1f9d6-1f3ff-200d-2642-fe0f": [39, 36],
	  "1f9d7-200d-2640-fe0f": [40, 36],
	  "1f9d7-200d-2642-fe0f": [41, 36],
	  "1f9d7-1f3fb-200d-2640-fe0f": [42, 36],
	  "1f9d7-1f3fb-200d-2642-fe0f": [43, 36],
	  "1f9d7-1f3fc-200d-2640-fe0f": [44, 36],
	  "1f9d7-1f3fc-200d-2642-fe0f": [45, 36],
	  "1f9d7-1f3fd-200d-2640-fe0f": [46, 36],
	  "1f9d7-1f3fd-200d-2642-fe0f": [47, 36],
	  "1f9d7-1f3fe-200d-2640-fe0f": [48, 36],
	  "1f9d7-1f3fe-200d-2642-fe0f": [49, 36],
	  "1f9d7-1f3ff-200d-2640-fe0f": [50, 36],
	  "1f9d7-1f3ff-200d-2642-fe0f": [51, 36],
	  "1f9d8-200d-2640-fe0f": [52, 36],
	  "1f9d8-200d-2642-fe0f": [53, 36],
	  "1f9d8-1f3fb-200d-2640-fe0f": [54, 36],
	  "1f9d8-1f3fb-200d-2642-fe0f": [55, 36],
	  "1f9d8-1f3fc-200d-2640-fe0f": [56, 36],
	  "1f9d8-1f3fc-200d-2642-fe0f": [57, 36],
	  "1f9d8-1f3fd-200d-2640-fe0f": [58, 36],
	  "1f9d8-1f3fd-200d-2642-fe0f": [59, 36],
	  "1f9d8-1f3fe-200d-2640-fe0f": [60, 36],
	  "1f9d8-1f3fe-200d-2642-fe0f": [61, 36],
	  "1f9d8-1f3ff-200d-2640-fe0f": [62, 36],
	  "1f9d8-1f3ff-200d-2642-fe0f": [63, 36],
	  "1f3f3-fe0f": [0, 37],
	  "1f3f4": [1, 37],
	  "1f3c1": [2, 37],
	  "1f6a9": [3, 37],
	  "1f3f3-fe0f-200d-1f308": [4, 37],
	  "1f1e6-1f1eb": [5, 37],
	  "1f1e6-1f1fd": [6, 37],
	  "1f1e6-1f1f1": [7, 37],
	  "1f1e9-1f1ff": [8, 37],
	  "1f1e6-1f1f8": [9, 37],
	  "1f1e6-1f1e9": [10, 37],
	  "1f1e6-1f1f4": [11, 37],
	  "1f1e6-1f1ee": [12, 37],
	  "1f1e6-1f1f6": [13, 37],
	  "1f1e6-1f1ec": [14, 37],
	  "1f1e6-1f1f7": [15, 37],
	  "1f1e6-1f1f2": [16, 37],
	  "1f1e6-1f1fc": [17, 37],
	  "1f1e6-1f1fa": [18, 37],
	  "1f1e6-1f1f9": [19, 37],
	  "1f1e6-1f1ff": [20, 37],
	  "1f1e7-1f1f8": [21, 37],
	  "1f1e7-1f1ed": [22, 37],
	  "1f1e7-1f1e9": [23, 37],
	  "1f1e7-1f1e7": [24, 37],
	  "1f1e7-1f1fe": [25, 37],
	  "1f1e7-1f1ea": [26, 37],
	  "1f1e7-1f1ff": [27, 37],
	  "1f1e7-1f1ef": [28, 37],
	  "1f1e7-1f1f2": [29, 37],
	  "1f1e7-1f1f9": [30, 37],
	  "1f1e7-1f1f4": [31, 37],
	  "1f1e7-1f1e6": [32, 37],
	  "1f1e7-1f1fc": [33, 37],
	  "1f1e7-1f1f7": [34, 37],
	  "1f1ee-1f1f4": [35, 37],
	  "1f1fb-1f1ec": [36, 37],
	  "1f1e7-1f1f3": [37, 37],
	  "1f1e7-1f1ec": [38, 37],
	  "1f1e7-1f1eb": [39, 37],
	  "1f1e7-1f1ee": [40, 37],
	  "1f1f0-1f1ed": [41, 37],
	  "1f1e8-1f1f2": [42, 37],
	  "1f1e8-1f1e6": [43, 37],
	  "1f1ee-1f1e8": [44, 37],
	  "1f1e8-1f1fb": [45, 37],
	  "1f1e7-1f1f6": [46, 37],
	  "1f1f0-1f1fe": [47, 37],
	  "1f1e8-1f1eb": [48, 37],
	  "1f1f9-1f1e9": [49, 37],
	  "1f1e8-1f1f1": [50, 37],
	  "1f1e8-1f1f3": [51, 37],
	  "1f1e8-1f1fd": [52, 37],
	  "1f1e8-1f1e8": [53, 37],
	  "1f1e8-1f1f4": [54, 37],
	  "1f1f0-1f1f2": [55, 37],
	  "1f1e8-1f1ec": [56, 37],
	  "1f1e8-1f1e9": [57, 37],
	  "1f1e8-1f1f0": [58, 37],
	  "1f1e8-1f1f7": [59, 37],
	  "1f1e8-1f1ee": [60, 37],
	  "1f1ed-1f1f7": [61, 37],
	  "1f1e8-1f1fa": [62, 37],
	  "1f1e8-1f1fc": [63, 37],
	  "1f1e8-1f1fe": [0, 38],
	  "1f1e8-1f1ff": [1, 38],
	  "1f1e9-1f1f0": [2, 38],
	  "1f1e9-1f1ef": [3, 38],
	  "1f1e9-1f1f2": [4, 38],
	  "1f1e9-1f1f4": [5, 38],
	  "1f1ea-1f1e8": [6, 38],
	  "1f1ea-1f1ec": [7, 38],
	  "1f1f8-1f1fb": [8, 38],
	  "1f1ec-1f1f6": [9, 38],
	  "1f1ea-1f1f7": [10, 38],
	  "1f1ea-1f1ea": [11, 38],
	  "1f1ea-1f1f9": [12, 38],
	  "1f1ea-1f1fa": [13, 38],
	  "1f1eb-1f1f0": [14, 38],
	  "1f1eb-1f1f4": [15, 38],
	  "1f1eb-1f1ef": [16, 38],
	  "1f1eb-1f1ee": [17, 38],
	  "1f1eb-1f1f7": [18, 38],
	  "1f1ec-1f1eb": [19, 38],
	  "1f1f5-1f1eb": [20, 38],
	  "1f1f9-1f1eb": [21, 38],
	  "1f1ec-1f1e6": [22, 38],
	  "1f1ec-1f1f2": [23, 38],
	  "1f1ec-1f1ea": [24, 38],
	  "1f1e9-1f1ea": [25, 38],
	  "1f1ec-1f1ed": [26, 38],
	  "1f1ec-1f1ee": [27, 38],
	  "1f1ec-1f1f7": [28, 38],
	  "1f1ec-1f1f1": [29, 38],
	  "1f1ec-1f1e9": [30, 38],
	  "1f1ec-1f1f5": [31, 38],
	  "1f1ec-1f1fa": [32, 38],
	  "1f1ec-1f1f9": [33, 38],
	  "1f1ec-1f1ec": [34, 38],
	  "1f1ec-1f1f3": [35, 38],
	  "1f1ec-1f1fc": [36, 38],
	  "1f1ec-1f1fe": [37, 38],
	  "1f1ed-1f1f9": [38, 38],
	  "1f1ed-1f1f3": [39, 38],
	  "1f1ed-1f1f0": [40, 38],
	  "1f1ed-1f1fa": [41, 38],
	  "1f1ee-1f1f8": [42, 38],
	  "1f1ee-1f1f3": [43, 38],
	  "1f1ee-1f1e9": [44, 38],
	  "1f1ee-1f1f7": [45, 38],
	  "1f1ee-1f1f6": [46, 38],
	  "1f1ee-1f1ea": [47, 38],
	  "1f1ee-1f1f2": [48, 38],
	  "1f1ee-1f1f1": [49, 38],
	  "1f1ee-1f1f9": [50, 38],
	  "1f1ef-1f1f2": [51, 38],
	  "1f1ef-1f1f5": [52, 38],
	  "1f38c": [53, 38],
	  "1f1ef-1f1ea": [54, 38],
	  "1f1ef-1f1f4": [55, 38],
	  "1f1f0-1f1ff": [56, 38],
	  "1f1f0-1f1ea": [57, 38],
	  "1f1f0-1f1ee": [58, 38],
	  "1f1fd-1f1f0": [59, 38],
	  "1f1f0-1f1fc": [60, 38],
	  "1f1f0-1f1ec": [61, 38],
	  "1f1f1-1f1e6": [62, 38],
	  "1f1f1-1f1fb": [63, 38],
	  "1f1f1-1f1e7": [0, 39],
	  "1f1f1-1f1f8": [1, 39],
	  "1f1f1-1f1f7": [2, 39],
	  "1f1f1-1f1fe": [3, 39],
	  "1f1f1-1f1ee": [4, 39],
	  "1f1f1-1f1f9": [5, 39],
	  "1f1f1-1f1fa": [6, 39],
	  "1f1f2-1f1f4": [7, 39],
	  "1f1f2-1f1f0": [8, 39],
	  "1f1f2-1f1ec": [9, 39],
	  "1f1f2-1f1fc": [10, 39],
	  "1f1f2-1f1fe": [11, 39],
	  "1f1f2-1f1fb": [12, 39],
	  "1f1f2-1f1f1": [13, 39],
	  "1f1f2-1f1f9": [14, 39],
	  "1f1f2-1f1ed": [15, 39],
	  "1f1f2-1f1f6": [16, 39],
	  "1f1f2-1f1f7": [17, 39],
	  "1f1f2-1f1fa": [18, 39],
	  "1f1fe-1f1f9": [19, 39],
	  "1f1f2-1f1fd": [20, 39],
	  "1f1eb-1f1f2": [21, 39],
	  "1f1f2-1f1e9": [22, 39],
	  "1f1f2-1f1e8": [23, 39],
	  "1f1f2-1f1f3": [24, 39],
	  "1f1f2-1f1ea": [25, 39],
	  "1f1f2-1f1f8": [26, 39],
	  "1f1f2-1f1e6": [27, 39],
	  "1f1f2-1f1ff": [28, 39],
	  "1f1f2-1f1f2": [29, 39],
	  "1f1f3-1f1e6": [30, 39],
	  "1f1f3-1f1f7": [31, 39],
	  "1f1f3-1f1f5": [32, 39],
	  "1f1f3-1f1f1": [33, 39],
	  "1f1f3-1f1e8": [34, 39],
	  "1f1f3-1f1ff": [35, 39],
	  "1f1f3-1f1ee": [36, 39],
	  "1f1f3-1f1ea": [37, 39],
	  "1f1f3-1f1ec": [38, 39],
	  "1f1f3-1f1fa": [39, 39],
	  "1f1f3-1f1eb": [40, 39],
	  "1f1f0-1f1f5": [41, 39],
	  "1f1f2-1f1f5": [42, 39],
	  "1f1f3-1f1f4": [43, 39],
	  "1f1f4-1f1f2": [44, 39],
	  "1f1f5-1f1f0": [45, 39],
	  "1f1f5-1f1fc": [46, 39],
	  "1f1f5-1f1f8": [47, 39],
	  "1f1f5-1f1e6": [48, 39],
	  "1f1f5-1f1ec": [49, 39],
	  "1f1f5-1f1fe": [50, 39],
	  "1f1f5-1f1ea": [51, 39],
	  "1f1f5-1f1ed": [52, 39],
	  "1f1f5-1f1f3": [53, 39],
	  "1f1f5-1f1f1": [54, 39],
	  "1f1f5-1f1f9": [55, 39],
	  "1f1f5-1f1f7": [56, 39],
	  "1f1f6-1f1e6": [57, 39],
	  "1f1f7-1f1ea": [58, 39],
	  "1f1f7-1f1f4": [59, 39],
	  "1f1f7-1f1fa": [60, 39],
	  "1f1f7-1f1fc": [61, 39],
	  "1f1fc-1f1f8": [62, 39],
	  "1f1f8-1f1f2": [63, 39],
	  "1f1f8-1f1f9": [0, 40],
	  "1f1f8-1f1e6": [1, 40],
	  "1f1f8-1f1f3": [2, 40],
	  "1f1f7-1f1f8": [3, 40],
	  "1f1f8-1f1e8": [4, 40],
	  "1f1f8-1f1f1": [5, 40],
	  "1f1f8-1f1ec": [6, 40],
	  "1f1f8-1f1fd": [7, 40],
	  "1f1f8-1f1f0": [8, 40],
	  "1f1f8-1f1ee": [9, 40],
	  "1f1ec-1f1f8": [10, 40],
	  "1f1f8-1f1e7": [11, 40],
	  "1f1f8-1f1f4": [12, 40],
	  "1f1ff-1f1e6": [13, 40],
	  "1f1f0-1f1f7": [14, 40],
	  "1f1f8-1f1f8": [15, 40],
	  "1f1ea-1f1f8": [16, 40],
	  "1f1f1-1f1f0": [17, 40],
	  "1f1e7-1f1f1": [18, 40],
	  "1f1f8-1f1ed": [19, 40],
	  "1f1f0-1f1f3": [20, 40],
	  "1f1f1-1f1e8": [21, 40],
	  "1f1f5-1f1f2": [22, 40],
	  "1f1fb-1f1e8": [23, 40],
	  "1f1f8-1f1e9": [24, 40],
	  "1f1f8-1f1f7": [25, 40],
	  "1f1f8-1f1ff": [26, 40],
	  "1f1f8-1f1ea": [27, 40],
	  "1f1e8-1f1ed": [28, 40],
	  "1f1f8-1f1fe": [29, 40],
	  "1f1f9-1f1fc": [30, 40],
	  "1f1f9-1f1ef": [31, 40],
	  "1f1f9-1f1ff": [32, 40],
	  "1f1f9-1f1ed": [33, 40],
	  "1f1f9-1f1f1": [34, 40],
	  "1f1f9-1f1ec": [35, 40],
	  "1f1f9-1f1f0": [36, 40],
	  "1f1f9-1f1f4": [37, 40],
	  "1f1f9-1f1f9": [38, 40],
	  "1f1f9-1f1f3": [39, 40],
	  "1f1f9-1f1f7": [40, 40],
	  "1f1f9-1f1f2": [41, 40],
	  "1f1f9-1f1e8": [42, 40],
	  "1f1f9-1f1fb": [43, 40],
	  "1f1fb-1f1ee": [44, 40],
	  "1f1fa-1f1ec": [45, 40],
	  "1f1fa-1f1e6": [46, 40],
	  "1f1e6-1f1ea": [47, 40],
	  "1f1ec-1f1e7": [48, 40],
	  "1f1fa-1f1f8": [49, 40],
	  "1f1fa-1f1fe": [50, 40],
	  "1f1fa-1f1ff": [51, 40],
	  "1f1fb-1f1fa": [52, 40],
	  "1f1fb-1f1e6": [53, 40],
	  "1f1fb-1f1ea": [54, 40],
	  "1f1fb-1f1f3": [55, 40],
	  "1f1fc-1f1eb": [56, 40],
	  "1f1ea-1f1ed": [57, 40],
	  "1f1fe-1f1ea": [58, 40],
	  "1f1ff-1f1f2": [59, 40],
	  "1f1ff-1f1fc": [60, 40],
	  "1f1e6-1f1e8": [61, 40],
	  "1f1f9-1f1e6": [62, 40],
	  "1f1e7-1f1fb": [63, 40],
	  "1f1ed-1f1f2": [0, 41],
	  "1f1f8-1f1ef": [1, 41],
	  "1f1fa-1f1f2": [2, 41],
	  "1f1ea-1f1e6": [3, 41],
	  "1f1e8-1f1f5": [4, 41],
	  "1f1e9-1f1ec": [5, 41],
	  "1f1f2-1f1eb": [6, 41],
	  "1f1fa-1f1f3": [7, 41],
	  "1f3f4-e0067-e0062-e0065-e006e-e0067-e007f": [8, 41],
	  "1f3f4-e0067-e0062-e0073-e0063-e0074-e007f": [9, 41],
	  "1f3f4-e0067-e0062-e0077-e006c-e0073-e007f": [10, 41],
	  "1f1ff": [11, 41],
	  "1f1fe": [12, 41],
	  "1f1fd": [13, 41],
	  "1f1fc": [14, 41],
	  "1f1fb": [15, 41],
	  "1f1fa": [16, 41],
	  "1f1f9": [17, 41],
	  "1f1f8": [18, 41],
	  "1f1f7": [19, 41],
	  "1f1f6": [20, 41],
	  "1f1f5": [21, 41],
	  "1f1f4": [22, 41],
	  "1f1f3": [23, 41],
	  "1f1f2": [24, 41],
	  "1f1f1": [25, 41],
	  "1f1f0": [26, 41],
	  "1f1ef": [27, 41],
	  "1f1ee": [28, 41],
	  "1f1ed": [29, 41],
	  "1f1ec": [30, 41],
	  "1f1eb": [31, 41],
	  "1f1ea": [32, 41],
	  "1f1e9": [33, 41],
	  "1f1e8": [34, 41],
	  "1f1e7": [35, 41],
	  "1f1e6": [36, 41],
	  "1f3fb": [37, 41],
	  "1f3fc": [38, 41],
	  "1f3fd": [39, 41],
	  "1f3fe": [40, 41],
	  "1f3ff": [41, 41]
	};

/***/ }),
/* 11 */
/*!***************************************************************!*\
  !*** ./~/react-emojione/lib/utils/emoji-format-conversion.js ***!
  \***************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.unicodeToCodepoint = exports.codepointToUnicode = exports.shortToCodepoint = exports.codepointToShort = exports.unicodes = undefined;
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _emojiData = __webpack_require__(/*! ../data/emoji-data */ 12);
	
	var _emojiData2 = _interopRequireDefault(_emojiData);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var unicodes = exports.unicodes = [];
	var codepointToShort = exports.codepointToShort = new Map();
	var shortToCodepoint = exports.shortToCodepoint = new Map();
	var codepointToUnicode = exports.codepointToUnicode = new Map();
	var unicodeToCodepoint = exports.unicodeToCodepoint = new Map();
	
	_emojiData2.default.forEach(function (_ref) {
	    var _ref2 = _slicedToArray(_ref, 3),
	        codepoint = _ref2[0],
	        shortnames = _ref2[1],
	        unicode = _ref2[2];
	
	    unicodes.push(unicode);
	    shortnames.slice().reverse().forEach(function (shortname) {
	        codepointToShort.set(codepoint, shortname);
	        shortToCodepoint.set(shortname, codepoint);
	    });
	    codepointToUnicode.set(codepoint, unicode);
	    unicodeToCodepoint.set(unicode, codepoint);
	});

/***/ }),
/* 12 */
/*!*************************************************!*\
  !*** ./~/react-emojione/lib/data/emoji-data.js ***!
  \*************************************************/
/***/ (function(module, exports) {

	"use strict";
	
	/*eslint-disable*/
	// Do not edit!
	// This file was auto-generated by create-emoji-data.js
	module.exports = [["1f468-200d-2764-fe0f-200d-1f48b-200d-1f468", [":kiss_mm:", ":couplekiss_mm:"], "👨‍❤️‍💋‍👨"], ["1f469-200d-2764-fe0f-200d-1f48b-200d-1f469", [":kiss_ww:", ":couplekiss_ww:"], "👩‍❤️‍💋‍👩"], ["1f469-200d-2764-fe0f-200d-1f48b-200d-1f468", [":kiss_woman_man:"], "👩‍❤️‍💋‍👨"], ["1f3f4-e0067-e0062-e0077-e006c-e0073-e007f", [":wales:"], "🏴󠁧󠁢󠁷󠁬󠁳󠁿"], ["1f3f4-e0067-e0062-e0073-e0063-e0074-e007f", [":scotland:"], "🏴󠁧󠁢󠁳󠁣󠁴󠁿"], ["1f3f4-e0067-e0062-e0065-e006e-e0067-e007f", [":england:"], "🏴󠁧󠁢󠁥󠁮󠁧󠁿"], ["1f468-200d-1f468-200d-1f467-200d-1f466", [":family_mmgb:"], "👨‍👨‍👧‍👦"], ["1f468-200d-1f469-200d-1f466-200d-1f466", [":family_mwbb:"], "👨‍👩‍👦‍👦"], ["1f468-200d-1f469-200d-1f467-200d-1f467", [":family_mwgg:"], "👨‍👩‍👧‍👧"], ["1f469-200d-1f469-200d-1f467-200d-1f466", [":family_wwgb:"], "👩‍👩‍👧‍👦"], ["1f469-200d-1f469-200d-1f466-200d-1f466", [":family_wwbb:"], "👩‍👩‍👦‍👦"], ["1f469-200d-1f469-200d-1f467-200d-1f467", [":family_wwgg:"], "👩‍👩‍👧‍👧"], ["1f468-200d-1f469-200d-1f467-200d-1f466", [":family_mwgb:"], "👨‍👩‍👧‍👦"], ["1f468-200d-1f468-200d-1f467-200d-1f467", [":family_mmgg:"], "👨‍👨‍👧‍👧"], ["1f468-200d-1f468-200d-1f466-200d-1f466", [":family_mmbb:"], "👨‍👨‍👦‍👦"], ["1f469-200d-2764-fe0f-200d-1f469", [":couple_ww:", ":couple_with_heart_ww:"], "👩‍❤️‍👩"], ["1f468-200d-2764-fe0f-200d-1f468", [":couple_mm:", ":couple_with_heart_mm:"], "👨‍❤️‍👨"], ["1f469-200d-2764-fe0f-200d-1f468", [":couple_with_heart_woman_man:"], "👩‍❤️‍👨"], ["1f468-200d-1f466-200d-1f466", [":family_man_boy_boy:"], "👨‍👦‍👦"], ["1f469-200d-1f467-200d-1f467", [":family_woman_girl_girl:"], "👩‍👧‍👧"], ["1f468-200d-1f467-200d-1f466", [":family_man_girl_boy:"], "👨‍👧‍👦"], ["1f469-200d-1f469-200d-1f467", [":family_wwg:"], "👩‍👩‍👧"], ["1f469-200d-1f469-200d-1f466", [":family_wwb:"], "👩‍👩‍👦"], ["1f468-200d-1f468-200d-1f467", [":family_mmg:"], "👨‍👨‍👧"], ["1f469-200d-1f467-200d-1f466", [":family_woman_girl_boy:"], "👩‍👧‍👦"], ["1f468-200d-1f468-200d-1f466", [":family_mmb:"], "👨‍👨‍👦"], ["1f468-200d-1f467-200d-1f467", [":family_man_girl_girl:"], "👨‍👧‍👧"], ["1f468-200d-1f469-200d-1f466", [":family_man_woman_boy:"], "👨‍👩‍👦"], ["1f468-200d-1f469-200d-1f467", [":family_mwg:"], "👨‍👩‍👧"], ["1f469-200d-1f466-200d-1f466", [":family_woman_boy_boy:"], "👩‍👦‍👦"], ["1f469-1f3fd-200d-2696-fe0f", [":woman_judge_tone3:"], "👩🏽‍⚖️"], ["1f9da-1f3ff-200d-2642-fe0f", [":man_fairy_tone5:"], "🧚🏿‍♂️"], ["1f9da-1f3ff-200d-2640-fe0f", [":woman_fairy_tone5:"], "🧚🏿‍♀️"], ["1f9da-1f3fe-200d-2642-fe0f", [":man_fairy_tone4:"], "🧚🏾‍♂️"], ["1f9da-1f3fe-200d-2640-fe0f", [":woman_fairy_tone4:"], "🧚🏾‍♀️"], ["1f9da-1f3fd-200d-2642-fe0f", [":man_fairy_tone3:"], "🧚🏽‍♂️"], ["1f9da-1f3fd-200d-2640-fe0f", [":woman_fairy_tone3:"], "🧚🏽‍♀️"], ["1f9da-1f3fc-200d-2642-fe0f", [":man_fairy_tone2:"], "🧚🏼‍♂️"], ["1f9da-1f3fc-200d-2640-fe0f", [":woman_fairy_tone2:"], "🧚🏼‍♀️"], ["1f9da-1f3fb-200d-2642-fe0f", [":man_fairy_tone1:"], "🧚🏻‍♂️"], ["1f9da-1f3fb-200d-2640-fe0f", [":woman_fairy_tone1:"], "🧚🏻‍♀️"], ["1f9d9-1f3ff-200d-2642-fe0f", [":man_mage_tone5:"], "🧙🏿‍♂️"], ["1f9d9-1f3ff-200d-2640-fe0f", [":woman_mage_tone5:"], "🧙🏿‍♀️"], ["1f9d9-1f3fe-200d-2642-fe0f", [":man_mage_tone4:"], "🧙🏾‍♂️"], ["1f9d9-1f3fe-200d-2640-fe0f", [":woman_mage_tone4:"], "🧙🏾‍♀️"], ["1f9d9-1f3fd-200d-2642-fe0f", [":man_mage_tone3:"], "🧙🏽‍♂️"], ["1f9d9-1f3fd-200d-2640-fe0f", [":woman_mage_tone3:"], "🧙🏽‍♀️"], ["1f9d9-1f3fc-200d-2642-fe0f", [":man_mage_tone2:"], "🧙🏼‍♂️"], ["1f9d9-1f3fc-200d-2640-fe0f", [":woman_mage_tone2:"], "🧙🏼‍♀️"], ["1f9d9-1f3fb-200d-2642-fe0f", [":man_mage_tone1:"], "🧙🏻‍♂️"], ["1f9d9-1f3fb-200d-2640-fe0f", [":woman_mage_tone1:"], "🧙🏻‍♀️"], ["1f3cc-1f3fc-200d-2642-fe0f", [":man_golfing_tone2:"], "🏌🏼‍♂️"], ["1f9dd-1f3ff-200d-2640-fe0f", [":woman_elf_tone5:"], "🧝🏿‍♀️"], ["1f9dd-1f3fe-200d-2642-fe0f", [":man_elf_tone4:"], "🧝🏾‍♂️"], ["1f9dd-1f3fe-200d-2640-fe0f", [":woman_elf_tone4:"], "🧝🏾‍♀️"], ["1f9dd-1f3fd-200d-2642-fe0f", [":man_elf_tone3:"], "🧝🏽‍♂️"], ["1f9dd-1f3fd-200d-2640-fe0f", [":woman_elf_tone3:"], "🧝🏽‍♀️"], ["1f471-1f3fb-200d-2640-fe0f", [":blond-haired_woman_tone1:"], "👱🏻‍♀️"], ["1f471-1f3fc-200d-2640-fe0f", [":blond-haired_woman_tone2:"], "👱🏼‍♀️"], ["1f471-1f3fd-200d-2640-fe0f", [":blond-haired_woman_tone3:"], "👱🏽‍♀️"], ["1f471-1f3fe-200d-2640-fe0f", [":blond-haired_woman_tone4:"], "👱🏾‍♀️"], ["1f471-1f3ff-200d-2640-fe0f", [":blond-haired_woman_tone5:"], "👱🏿‍♀️"], ["1f471-1f3ff-200d-2642-fe0f", [":blond-haired_man_tone5:"], "👱🏿‍♂️"], ["1f471-1f3fe-200d-2642-fe0f", [":blond-haired_man_tone4:"], "👱🏾‍♂️"], ["1f471-1f3fd-200d-2642-fe0f", [":blond-haired_man_tone3:"], "👱🏽‍♂️"], ["1f471-1f3fc-200d-2642-fe0f", [":blond-haired_man_tone2:"], "👱🏼‍♂️"], ["1f471-1f3fb-200d-2642-fe0f", [":blond-haired_man_tone1:"], "👱🏻‍♂️"], ["1f473-1f3fb-200d-2640-fe0f", [":woman_wearing_turban_tone1:"], "👳🏻‍♀️"], ["1f473-1f3fc-200d-2640-fe0f", [":woman_wearing_turban_tone2:"], "👳🏼‍♀️"], ["1f473-1f3fd-200d-2640-fe0f", [":woman_wearing_turban_tone3:"], "👳🏽‍♀️"], ["1f473-1f3fe-200d-2640-fe0f", [":woman_wearing_turban_tone4:"], "👳🏾‍♀️"], ["1f473-1f3ff-200d-2640-fe0f", [":woman_wearing_turban_tone5:"], "👳🏿‍♀️"], ["1f473-1f3ff-200d-2642-fe0f", [":man_wearing_turban_tone5:"], "👳🏿‍♂️"], ["1f473-1f3fe-200d-2642-fe0f", [":man_wearing_turban_tone4:"], "👳🏾‍♂️"], ["1f473-1f3fd-200d-2642-fe0f", [":man_wearing_turban_tone3:"], "👳🏽‍♂️"], ["1f473-1f3fc-200d-2642-fe0f", [":man_wearing_turban_tone2:"], "👳🏼‍♂️"], ["1f473-1f3fb-200d-2642-fe0f", [":man_wearing_turban_tone1:"], "👳🏻‍♂️"], ["1f46e-1f3fb-200d-2640-fe0f", [":woman_police_officer_tone1:"], "👮🏻‍♀️"], ["1f46e-1f3fc-200d-2640-fe0f", [":woman_police_officer_tone2:"], "👮🏼‍♀️"], ["1f46e-1f3fd-200d-2640-fe0f", [":woman_police_officer_tone3:"], "👮🏽‍♀️"], ["1f46e-1f3fe-200d-2640-fe0f", [":woman_police_officer_tone4:"], "👮🏾‍♀️"], ["1f46e-1f3ff-200d-2640-fe0f", [":woman_police_officer_tone5:"], "👮🏿‍♀️"], ["1f46e-1f3ff-200d-2642-fe0f", [":man_police_officer_tone5:"], "👮🏿‍♂️"], ["1f46e-1f3fe-200d-2642-fe0f", [":man_police_officer_tone4:"], "👮🏾‍♂️"], ["1f46e-1f3fd-200d-2642-fe0f", [":man_police_officer_tone3:"], "👮🏽‍♂️"], ["1f46e-1f3fc-200d-2642-fe0f", [":man_police_officer_tone2:"], "👮🏼‍♂️"], ["1f46e-1f3fb-200d-2642-fe0f", [":man_police_officer_tone1:"], "👮🏻‍♂️"], ["1f477-1f3fb-200d-2640-fe0f", [":woman_construction_worker_tone1:"], "👷🏻‍♀️"], ["1f477-1f3fc-200d-2640-fe0f", [":woman_construction_worker_tone2:"], "👷🏼‍♀️"], ["1f477-1f3fd-200d-2640-fe0f", [":woman_construction_worker_tone3:"], "👷🏽‍♀️"], ["1f477-1f3fe-200d-2640-fe0f", [":woman_construction_worker_tone4:"], "👷🏾‍♀️"], ["1f477-1f3ff-200d-2640-fe0f", [":woman_construction_worker_tone5:"], "👷🏿‍♀️"], ["1f477-1f3ff-200d-2642-fe0f", [":man_construction_worker_tone5:"], "👷🏿‍♂️"], ["1f477-1f3fe-200d-2642-fe0f", [":man_construction_worker_tone4:"], "👷🏾‍♂️"], ["1f477-1f3fd-200d-2642-fe0f", [":man_construction_worker_tone3:"], "👷🏽‍♂️"], ["1f477-1f3fc-200d-2642-fe0f", [":man_construction_worker_tone2:"], "👷🏼‍♂️"], ["1f477-1f3fb-200d-2642-fe0f", [":man_construction_worker_tone1:"], "👷🏻‍♂️"], ["1f482-1f3fb-200d-2640-fe0f", [":woman_guard_tone1:"], "💂🏻‍♀️"], ["1f482-1f3fc-200d-2640-fe0f", [":woman_guard_tone2:"], "💂🏼‍♀️"], ["1f482-1f3fd-200d-2640-fe0f", [":woman_guard_tone3:"], "💂🏽‍♀️"], ["1f482-1f3fe-200d-2640-fe0f", [":woman_guard_tone4:"], "💂🏾‍♀️"], ["1f482-1f3ff-200d-2640-fe0f", [":woman_guard_tone5:"], "💂🏿‍♀️"], ["1f482-1f3ff-200d-2642-fe0f", [":man_guard_tone5:"], "💂🏿‍♂️"], ["1f482-1f3fe-200d-2642-fe0f", [":man_guard_tone4:"], "💂🏾‍♂️"], ["1f482-1f3fd-200d-2642-fe0f", [":man_guard_tone3:"], "💂🏽‍♂️"], ["1f482-1f3fc-200d-2642-fe0f", [":man_guard_tone2:"], "💂🏼‍♂️"], ["1f482-1f3fb-200d-2642-fe0f", [":man_guard_tone1:"], "💂🏻‍♂️"], ["1f938-1f3fd-200d-2642-fe0f", [":man_cartwheeling_tone3:"], "🤸🏽‍♂️"], ["1f575-1f3fb-200d-2640-fe0f", [":woman_detective_tone1:"], "🕵🏻‍♀️"], ["1f575-1f3fc-200d-2640-fe0f", [":woman_detective_tone2:"], "🕵🏼‍♀️"], ["1f575-1f3fd-200d-2640-fe0f", [":woman_detective_tone3:"], "🕵🏽‍♀️"], ["1f575-1f3fe-200d-2640-fe0f", [":woman_detective_tone4:"], "🕵🏾‍♀️"], ["1f575-1f3ff-200d-2640-fe0f", [":woman_detective_tone5:"], "🕵🏿‍♀️"], ["1f938-1f3fc-200d-2642-fe0f", [":man_cartwheeling_tone2:"], "🤸🏼‍♂️"], ["1f575-1f3ff-200d-2642-fe0f", [":man_detective_tone5:"], "🕵🏿‍♂️"], ["1f575-1f3fe-200d-2642-fe0f", [":man_detective_tone4:"], "🕵🏾‍♂️"], ["1f575-1f3fd-200d-2642-fe0f", [":man_detective_tone3:"], "🕵🏽‍♂️"], ["1f575-1f3fc-200d-2642-fe0f", [":man_detective_tone2:"], "🕵🏼‍♂️"], ["1f575-1f3fb-200d-2642-fe0f", [":man_detective_tone1:"], "🕵🏻‍♂️"], ["1f469-1f3fb-200d-2695-fe0f", [":woman_health_worker_tone1:"], "👩🏻‍⚕️"], ["1f469-1f3fc-200d-2695-fe0f", [":woman_health_worker_tone2:"], "👩🏼‍⚕️"], ["1f469-1f3fd-200d-2695-fe0f", [":woman_health_worker_tone3:"], "👩🏽‍⚕️"], ["1f469-1f3fe-200d-2695-fe0f", [":woman_health_worker_tone4:"], "👩🏾‍⚕️"], ["1f469-1f3ff-200d-2695-fe0f", [":woman_health_worker_tone5:"], "👩🏿‍⚕️"], ["1f468-1f3fb-200d-2695-fe0f", [":man_health_worker_tone1:"], "👨🏻‍⚕️"], ["1f468-1f3fc-200d-2695-fe0f", [":man_health_worker_tone2:"], "👨🏼‍⚕️"], ["1f468-1f3fd-200d-2695-fe0f", [":man_health_worker_tone3:"], "👨🏽‍⚕️"], ["1f468-1f3fe-200d-2695-fe0f", [":man_health_worker_tone4:"], "👨🏾‍⚕️"], ["1f468-1f3ff-200d-2695-fe0f", [":man_health_worker_tone5:"], "👨🏿‍⚕️"], ["1f3cc-1f3fb-200d-2642-fe0f", [":man_golfing_tone1:"], "🏌🏻‍♂️"], ["1f938-1f3fb-200d-2642-fe0f", [":man_cartwheeling_tone1:"], "🤸🏻‍♂️"], ["1f938-1f3ff-200d-2640-fe0f", [":woman_cartwheeling_tone5:"], "🤸🏿‍♀️"], ["1f938-1f3fe-200d-2640-fe0f", [":woman_cartwheeling_tone4:"], "🤸🏾‍♀️"], ["1f938-1f3fd-200d-2640-fe0f", [":woman_cartwheeling_tone3:"], "🤸🏽‍♀️"], ["1f938-1f3fc-200d-2640-fe0f", [":woman_cartwheeling_tone2:"], "🤸🏼‍♀️"], ["1f938-1f3fb-200d-2640-fe0f", [":woman_cartwheeling_tone1:"], "🤸🏻‍♀️"], ["1f3cb-1f3fb-200d-2642-fe0f", [":man_lifting_weights_tone1:"], "🏋🏻‍♂️"], ["1f3cb-1f3fc-200d-2642-fe0f", [":man_lifting_weights_tone2:"], "🏋🏼‍♂️"], ["1f3cb-1f3fd-200d-2642-fe0f", [":man_lifting_weights_tone3:"], "🏋🏽‍♂️"], ["1f3cb-1f3fe-200d-2642-fe0f", [":man_lifting_weights_tone4:"], "🏋🏾‍♂️"], ["1f3cb-1f3ff-200d-2642-fe0f", [":man_lifting_weights_tone5:"], "🏋🏿‍♂️"], ["1f3cc-1f3fd-200d-2642-fe0f", [":man_golfing_tone3:"], "🏌🏽‍♂️"], ["1f3cb-1f3ff-200d-2640-fe0f", [":woman_lifting_weights_tone5:"], "🏋🏿‍♀️"], ["1f3cb-1f3fe-200d-2640-fe0f", [":woman_lifting_weights_tone4:"], "🏋🏾‍♀️"], ["1f3cb-1f3fd-200d-2640-fe0f", [":woman_lifting_weights_tone3:"], "🏋🏽‍♀️"], ["1f3cb-1f3fc-200d-2640-fe0f", [":woman_lifting_weights_tone2:"], "🏋🏼‍♀️"], ["1f3cb-1f3fb-200d-2640-fe0f", [":woman_lifting_weights_tone1:"], "🏋🏻‍♀️"], ["1f3cc-1f3ff-200d-2640-fe0f", [":woman_golfing_tone5:"], "🏌🏿‍♀️"], ["1f3c4-1f3ff-200d-2642-fe0f", [":man_surfing_tone5:"], "🏄🏿‍♂️"], ["1f3c4-1f3fe-200d-2642-fe0f", [":man_surfing_tone4:"], "🏄🏾‍♂️"], ["1f3c4-1f3fd-200d-2642-fe0f", [":man_surfing_tone3:"], "🏄🏽‍♂️"], ["1f3c4-1f3fc-200d-2642-fe0f", [":man_surfing_tone2:"], "🏄🏼‍♂️"], ["1f3c4-1f3fb-200d-2642-fe0f", [":man_surfing_tone1:"], "🏄🏻‍♂️"], ["1f3cc-1f3fe-200d-2640-fe0f", [":woman_golfing_tone4:"], "🏌🏾‍♀️"], ["1f3ca-1f3fb-200d-2640-fe0f", [":woman_swimming_tone1:"], "🏊🏻‍♀️"], ["1f3ca-1f3fc-200d-2640-fe0f", [":woman_swimming_tone2:"], "🏊🏼‍♀️"], ["1f3ca-1f3fd-200d-2640-fe0f", [":woman_swimming_tone3:"], "🏊🏽‍♀️"], ["1f3ca-1f3fe-200d-2640-fe0f", [":woman_swimming_tone4:"], "🏊🏾‍♀️"], ["1f3ca-1f3ff-200d-2640-fe0f", [":woman_swimming_tone5:"], "🏊🏿‍♀️"], ["1f3cc-1f3fd-200d-2640-fe0f", [":woman_golfing_tone3:"], "🏌🏽‍♀️"], ["1f3ca-1f3ff-200d-2642-fe0f", [":man_swimming_tone5:"], "🏊🏿‍♂️"], ["1f3ca-1f3fe-200d-2642-fe0f", [":man_swimming_tone4:"], "🏊🏾‍♂️"], ["1f3ca-1f3fd-200d-2642-fe0f", [":man_swimming_tone3:"], "🏊🏽‍♂️"], ["1f3ca-1f3fc-200d-2642-fe0f", [":man_swimming_tone2:"], "🏊🏼‍♂️"], ["1f3ca-1f3fb-200d-2642-fe0f", [":man_swimming_tone1:"], "🏊🏻‍♂️"], ["1f3cc-1f3fc-200d-2640-fe0f", [":woman_golfing_tone2:"], "🏌🏼‍♀️"], ["1f93d-1f3fb-200d-2640-fe0f", [":woman_playing_water_polo_tone1:"], "🤽🏻‍♀️"], ["1f93d-1f3fc-200d-2640-fe0f", [":woman_playing_water_polo_tone2:"], "🤽🏼‍♀️"], ["1f93d-1f3fd-200d-2640-fe0f", [":woman_playing_water_polo_tone3:"], "🤽🏽‍♀️"], ["1f93d-1f3fe-200d-2640-fe0f", [":woman_playing_water_polo_tone4:"], "🤽🏾‍♀️"], ["1f93d-1f3ff-200d-2640-fe0f", [":woman_playing_water_polo_tone5:"], "🤽🏿‍♀️"], ["1f3cc-1f3fb-200d-2640-fe0f", [":woman_golfing_tone1:"], "🏌🏻‍♀️"], ["1f93d-1f3fb-200d-2642-fe0f", [":man_playing_water_polo_tone1:"], "🤽🏻‍♂️"], ["1f93d-1f3fc-200d-2642-fe0f", [":man_playing_water_polo_tone2:"], "🤽🏼‍♂️"], ["1f93d-1f3fd-200d-2642-fe0f", [":man_playing_water_polo_tone3:"], "🤽🏽‍♂️"], ["1f93d-1f3fe-200d-2642-fe0f", [":man_playing_water_polo_tone4:"], "🤽🏾‍♂️"], ["1f93d-1f3ff-200d-2642-fe0f", [":man_playing_water_polo_tone5:"], "🤽🏿‍♂️"], ["1f6a3-1f3fb-200d-2640-fe0f", [":woman_rowing_boat_tone1:"], "🚣🏻‍♀️"], ["1f6a3-1f3fc-200d-2640-fe0f", [":woman_rowing_boat_tone2:"], "🚣🏼‍♀️"], ["1f6a3-1f3fd-200d-2640-fe0f", [":woman_rowing_boat_tone3:"], "🚣🏽‍♀️"], ["1f6a3-1f3fe-200d-2640-fe0f", [":woman_rowing_boat_tone4:"], "🚣🏾‍♀️"], ["1f6a3-1f3ff-200d-2640-fe0f", [":woman_rowing_boat_tone5:"], "🚣🏿‍♀️"], ["1f6a3-1f3ff-200d-2642-fe0f", [":man_rowing_boat_tone5:"], "🚣🏿‍♂️"], ["1f3cc-1f3fe-200d-2642-fe0f", [":man_golfing_tone4:"], "🏌🏾‍♂️"], ["1f6a3-1f3fe-200d-2642-fe0f", [":man_rowing_boat_tone4:"], "🚣🏾‍♂️"], ["1f6a3-1f3fd-200d-2642-fe0f", [":man_rowing_boat_tone3:"], "🚣🏽‍♂️"], ["1f6a3-1f3fc-200d-2642-fe0f", [":man_rowing_boat_tone2:"], "🚣🏼‍♂️"], ["1f6a3-1f3fb-200d-2642-fe0f", [":man_rowing_boat_tone1:"], "🚣🏻‍♂️"], ["1f6b4-1f3fb-200d-2640-fe0f", [":woman_biking_tone1:"], "🚴🏻‍♀️"], ["1f93e-1f3ff-200d-2642-fe0f", [":man_playing_handball_tone5:"], "🤾🏿‍♂️"], ["1f6b4-1f3fc-200d-2640-fe0f", [":woman_biking_tone2:"], "🚴🏼‍♀️"], ["1f6b4-1f3fd-200d-2640-fe0f", [":woman_biking_tone3:"], "🚴🏽‍♀️"], ["1f6b4-1f3fe-200d-2640-fe0f", [":woman_biking_tone4:"], "🚴🏾‍♀️"], ["1f6b4-1f3ff-200d-2640-fe0f", [":woman_biking_tone5:"], "🚴🏿‍♀️"], ["1f6b4-1f3ff-200d-2642-fe0f", [":man_biking_tone5:"], "🚴🏿‍♂️"], ["1f93e-1f3fe-200d-2642-fe0f", [":man_playing_handball_tone4:"], "🤾🏾‍♂️"], ["1f6b4-1f3fe-200d-2642-fe0f", [":man_biking_tone4:"], "🚴🏾‍♂️"], ["1f6b4-1f3fd-200d-2642-fe0f", [":man_biking_tone3:"], "🚴🏽‍♂️"], ["1f6b4-1f3fc-200d-2642-fe0f", [":man_biking_tone2:"], "🚴🏼‍♂️"], ["1f6b4-1f3fb-200d-2642-fe0f", [":man_biking_tone1:"], "🚴🏻‍♂️"], ["1f6b5-1f3fb-200d-2640-fe0f", [":woman_mountain_biking_tone1:"], "🚵🏻‍♀️"], ["1f93e-1f3fd-200d-2642-fe0f", [":man_playing_handball_tone3:"], "🤾🏽‍♂️"], ["1f6b5-1f3fc-200d-2640-fe0f", [":woman_mountain_biking_tone2:"], "🚵🏼‍♀️"], ["1f6b5-1f3fd-200d-2640-fe0f", [":woman_mountain_biking_tone3:"], "🚵🏽‍♀️"], ["1f6b5-1f3fe-200d-2640-fe0f", [":woman_mountain_biking_tone4:"], "🚵🏾‍♀️"], ["1f6b5-1f3ff-200d-2640-fe0f", [":woman_mountain_biking_tone5:"], "🚵🏿‍♀️"], ["1f6b5-1f3ff-200d-2642-fe0f", [":man_mountain_biking_tone5:"], "🚵🏿‍♂️"], ["1f93e-1f3fc-200d-2642-fe0f", [":man_playing_handball_tone2:"], "🤾🏼‍♂️"], ["1f6b5-1f3fe-200d-2642-fe0f", [":man_mountain_biking_tone4:"], "🚵🏾‍♂️"], ["1f6b5-1f3fd-200d-2642-fe0f", [":man_mountain_biking_tone3:"], "🚵🏽‍♂️"], ["1f6b5-1f3fc-200d-2642-fe0f", [":man_mountain_biking_tone2:"], "🚵🏼‍♂️"], ["1f6b5-1f3fb-200d-2642-fe0f", [":man_mountain_biking_tone1:"], "🚵🏻‍♂️"], ["1f939-1f3fb-200d-2640-fe0f", [":woman_juggling_tone1:"], "🤹🏻‍♀️"], ["1f93e-1f3fb-200d-2642-fe0f", [":man_playing_handball_tone1:"], "🤾🏻‍♂️"], ["1f939-1f3fc-200d-2640-fe0f", [":woman_juggling_tone2:"], "🤹🏼‍♀️"], ["1f939-1f3fd-200d-2640-fe0f", [":woman_juggling_tone3:"], "🤹🏽‍♀️"], ["1f939-1f3fe-200d-2640-fe0f", [":woman_juggling_tone4:"], "🤹🏾‍♀️"], ["1f939-1f3ff-200d-2640-fe0f", [":woman_juggling_tone5:"], "🤹🏿‍♀️"], ["1f939-1f3fb-200d-2642-fe0f", [":man_juggling_tone1:"], "🤹🏻‍♂️"], ["1f939-1f3fc-200d-2642-fe0f", [":man_juggling_tone2:"], "🤹🏼‍♂️"], ["1f939-1f3fd-200d-2642-fe0f", [":man_juggling_tone3:"], "🤹🏽‍♂️"], ["1f939-1f3fe-200d-2642-fe0f", [":man_juggling_tone4:"], "🤹🏾‍♂️"], ["1f939-1f3ff-200d-2642-fe0f", [":man_juggling_tone5:"], "🤹🏿‍♂️"], ["1f9d6-1f3fb-200d-2640-fe0f", [":woman_in_steamy_room_tone1:"], "🧖🏻‍♀️"], ["1f93e-1f3ff-200d-2640-fe0f", [":woman_playing_handball_tone5:"], "🤾🏿‍♀️"], ["1f9d6-1f3fb-200d-2642-fe0f", [":man_in_steamy_room_tone1:"], "🧖🏻‍♂️"], ["1f9d6-1f3fc-200d-2640-fe0f", [":woman_in_steamy_room_tone2:"], "🧖🏼‍♀️"], ["1f9d6-1f3fc-200d-2642-fe0f", [":man_in_steamy_room_tone2:"], "🧖🏼‍♂️"], ["1f9d6-1f3fd-200d-2640-fe0f", [":woman_in_steamy_room_tone3:"], "🧖🏽‍♀️"], ["1f9d6-1f3fd-200d-2642-fe0f", [":man_in_steamy_room_tone3:"], "🧖🏽‍♂️"], ["1f93e-1f3fe-200d-2640-fe0f", [":woman_playing_handball_tone4:"], "🤾🏾‍♀️"], ["1f9d6-1f3fe-200d-2640-fe0f", [":woman_in_steamy_room_tone4:"], "🧖🏾‍♀️"], ["1f9d6-1f3fe-200d-2642-fe0f", [":man_in_steamy_room_tone4:"], "🧖🏾‍♂️"], ["1f9d6-1f3ff-200d-2640-fe0f", [":woman_in_steamy_room_tone5:"], "🧖🏿‍♀️"], ["1f9d6-1f3ff-200d-2642-fe0f", [":man_in_steamy_room_tone5:"], "🧖🏿‍♂️"], ["1f9d7-1f3fb-200d-2640-fe0f", [":woman_climbing_tone1:"], "🧗🏻‍♀️"], ["1f93e-1f3fd-200d-2640-fe0f", [":woman_playing_handball_tone3:"], "🤾🏽‍♀️"], ["1f9d7-1f3fb-200d-2642-fe0f", [":man_climbing_tone1:"], "🧗🏻‍♂️"], ["1f9d7-1f3fc-200d-2640-fe0f", [":woman_climbing_tone2:"], "🧗🏼‍♀️"], ["1f9d7-1f3fc-200d-2642-fe0f", [":man_climbing_tone2:"], "🧗🏼‍♂️"], ["1f9d7-1f3fd-200d-2640-fe0f", [":woman_climbing_tone3:"], "🧗🏽‍♀️"], ["1f9d7-1f3fd-200d-2642-fe0f", [":man_climbing_tone3:"], "🧗🏽‍♂️"], ["1f93e-1f3fc-200d-2640-fe0f", [":woman_playing_handball_tone2:"], "🤾🏼‍♀️"], ["1f9d7-1f3fe-200d-2640-fe0f", [":woman_climbing_tone4:"], "🧗🏾‍♀️"], ["1f9d7-1f3fe-200d-2642-fe0f", [":man_climbing_tone4:"], "🧗🏾‍♂️"], ["1f9d7-1f3ff-200d-2640-fe0f", [":woman_climbing_tone5:"], "🧗🏿‍♀️"], ["1f9d7-1f3ff-200d-2642-fe0f", [":man_climbing_tone5:"], "🧗🏿‍♂️"], ["1f9d8-1f3fb-200d-2640-fe0f", [":woman_in_lotus_position_tone1:"], "🧘🏻‍♀️"], ["1f93e-1f3fb-200d-2640-fe0f", [":woman_playing_handball_tone1:"], "🤾🏻‍♀️"], ["1f9d8-1f3fb-200d-2642-fe0f", [":man_in_lotus_position_tone1:"], "🧘🏻‍♂️"], ["1f9d8-1f3fc-200d-2640-fe0f", [":woman_in_lotus_position_tone2:"], "🧘🏼‍♀️"], ["1f9d8-1f3fc-200d-2642-fe0f", [":man_in_lotus_position_tone2:"], "🧘🏼‍♂️"], ["1f9d8-1f3fd-200d-2640-fe0f", [":woman_in_lotus_position_tone3:"], "🧘🏽‍♀️"], ["1f9d8-1f3fd-200d-2642-fe0f", [":man_in_lotus_position_tone3:"], "🧘🏽‍♂️"], ["1f9d8-1f3fe-200d-2640-fe0f", [":woman_in_lotus_position_tone4:"], "🧘🏾‍♀️"], ["1f9d8-1f3fe-200d-2642-fe0f", [":man_in_lotus_position_tone4:"], "🧘🏾‍♂️"], ["1f9d8-1f3ff-200d-2640-fe0f", [":woman_in_lotus_position_tone5:"], "🧘🏿‍♀️"], ["1f9d8-1f3ff-200d-2642-fe0f", [":man_in_lotus_position_tone5:"], "🧘🏿‍♂️"], ["1f938-1f3ff-200d-2642-fe0f", [":man_cartwheeling_tone5:"], "🤸🏿‍♂️"], ["1f3c4-1f3ff-200d-2640-fe0f", [":woman_surfing_tone5:"], "🏄🏿‍♀️"], ["1f3c4-1f3fe-200d-2640-fe0f", [":woman_surfing_tone4:"], "🏄🏾‍♀️"], ["1f3c4-1f3fd-200d-2640-fe0f", [":woman_surfing_tone3:"], "🏄🏽‍♀️"], ["1f3c4-1f3fc-200d-2640-fe0f", [":woman_surfing_tone2:"], "🏄🏼‍♀️"], ["1f3c4-1f3fb-200d-2640-fe0f", [":woman_surfing_tone1:"], "🏄🏻‍♀️"], ["1f441-fe0f-200d-1f5e8-fe0f", [":eye_in_speech_bubble:"], "👁️‍🗨️"], ["1f9dd-1f3fc-200d-2642-fe0f", [":man_elf_tone2:"], "🧝🏼‍♂️"], ["1f9dd-1f3fc-200d-2640-fe0f", [":woman_elf_tone2:"], "🧝🏼‍♀️"], ["1f9dd-1f3fb-200d-2642-fe0f", [":man_elf_tone1:"], "🧝🏻‍♂️"], ["1f3cc-1f3ff-200d-2642-fe0f", [":man_golfing_tone5:"], "🏌🏿‍♂️"], ["1f9dd-1f3fb-200d-2640-fe0f", [":woman_elf_tone1:"], "🧝🏻‍♀️"], ["1f9dc-1f3ff-200d-2642-fe0f", [":merman_tone5:"], "🧜🏿‍♂️"], ["1f469-1f3fb-200d-2708-fe0f", [":woman_pilot_tone1:"], "👩🏻‍✈️"], ["1f469-1f3fc-200d-2708-fe0f", [":woman_pilot_tone2:"], "👩🏼‍✈️"], ["1f469-1f3fd-200d-2708-fe0f", [":woman_pilot_tone3:"], "👩🏽‍✈️"], ["1f469-1f3fe-200d-2708-fe0f", [":woman_pilot_tone4:"], "👩🏾‍✈️"], ["1f469-1f3ff-200d-2708-fe0f", [":woman_pilot_tone5:"], "👩🏿‍✈️"], ["1f468-1f3fb-200d-2708-fe0f", [":man_pilot_tone1:"], "👨🏻‍✈️"], ["1f468-1f3fc-200d-2708-fe0f", [":man_pilot_tone2:"], "👨🏼‍✈️"], ["1f468-1f3fd-200d-2708-fe0f", [":man_pilot_tone3:"], "👨🏽‍✈️"], ["1f468-1f3fe-200d-2708-fe0f", [":man_pilot_tone4:"], "👨🏾‍✈️"], ["1f468-1f3ff-200d-2708-fe0f", [":man_pilot_tone5:"], "👨🏿‍✈️"], ["1f9dc-1f3ff-200d-2640-fe0f", [":mermaid_tone5:"], "🧜🏿‍♀️"], ["1f9dc-1f3fe-200d-2642-fe0f", [":merman_tone4:"], "🧜🏾‍♂️"], ["1f9dc-1f3fe-200d-2640-fe0f", [":mermaid_tone4:"], "🧜🏾‍♀️"], ["1f9dc-1f3fd-200d-2642-fe0f", [":merman_tone3:"], "🧜🏽‍♂️"], ["1f9dc-1f3fd-200d-2640-fe0f", [":mermaid_tone3:"], "🧜🏽‍♀️"], ["1f9dc-1f3fc-200d-2642-fe0f", [":merman_tone2:"], "🧜🏼‍♂️"], ["1f9dc-1f3fc-200d-2640-fe0f", [":mermaid_tone2:"], "🧜🏼‍♀️"], ["1f9dc-1f3fb-200d-2642-fe0f", [":merman_tone1:"], "🧜🏻‍♂️"], ["1f9dc-1f3fb-200d-2640-fe0f", [":mermaid_tone1:"], "🧜🏻‍♀️"], ["1f9db-1f3ff-200d-2642-fe0f", [":man_vampire_tone5:"], "🧛🏿‍♂️"], ["1f9db-1f3ff-200d-2640-fe0f", [":woman_vampire_tone5:"], "🧛🏿‍♀️"], ["1f9db-1f3fe-200d-2642-fe0f", [":man_vampire_tone4:"], "🧛🏾‍♂️"], ["1f469-1f3fb-200d-2696-fe0f", [":woman_judge_tone1:"], "👩🏻‍⚖️"], ["1f469-1f3fc-200d-2696-fe0f", [":woman_judge_tone2:"], "👩🏼‍⚖️"], ["1f9dd-1f3ff-200d-2642-fe0f", [":man_elf_tone5:"], "🧝🏿‍♂️"], ["1f469-1f3fe-200d-2696-fe0f", [":woman_judge_tone4:"], "👩🏾‍⚖️"], ["1f469-1f3ff-200d-2696-fe0f", [":woman_judge_tone5:"], "👩🏿‍⚖️"], ["1f468-1f3fb-200d-2696-fe0f", [":man_judge_tone1:"], "👨🏻‍⚖️"], ["1f468-1f3fc-200d-2696-fe0f", [":man_judge_tone2:"], "👨🏼‍⚖️"], ["1f468-1f3fd-200d-2696-fe0f", [":man_judge_tone3:"], "👨🏽‍⚖️"], ["1f468-1f3fe-200d-2696-fe0f", [":man_judge_tone4:"], "👨🏾‍⚖️"], ["1f468-1f3ff-200d-2696-fe0f", [":man_judge_tone5:"], "👨🏿‍⚖️"], ["1f647-1f3fb-200d-2640-fe0f", [":woman_bowing_tone1:"], "🙇🏻‍♀️"], ["1f647-1f3fc-200d-2640-fe0f", [":woman_bowing_tone2:"], "🙇🏼‍♀️"], ["1f647-1f3fd-200d-2640-fe0f", [":woman_bowing_tone3:"], "🙇🏽‍♀️"], ["1f647-1f3fe-200d-2640-fe0f", [":woman_bowing_tone4:"], "🙇🏾‍♀️"], ["1f647-1f3ff-200d-2640-fe0f", [":woman_bowing_tone5:"], "🙇🏿‍♀️"], ["1f647-1f3ff-200d-2642-fe0f", [":man_bowing_tone5:"], "🙇🏿‍♂️"], ["1f647-1f3fe-200d-2642-fe0f", [":man_bowing_tone4:"], "🙇🏾‍♂️"], ["1f647-1f3fd-200d-2642-fe0f", [":man_bowing_tone3:"], "🙇🏽‍♂️"], ["1f647-1f3fc-200d-2642-fe0f", [":man_bowing_tone2:"], "🙇🏼‍♂️"], ["1f647-1f3fb-200d-2642-fe0f", [":man_bowing_tone1:"], "🙇🏻‍♂️"], ["1f481-1f3fb-200d-2642-fe0f", [":man_tipping_hand_tone1:"], "💁🏻‍♂️"], ["1f481-1f3fc-200d-2642-fe0f", [":man_tipping_hand_tone2:"], "💁🏼‍♂️"], ["1f481-1f3fd-200d-2642-fe0f", [":man_tipping_hand_tone3:"], "💁🏽‍♂️"], ["1f481-1f3fe-200d-2642-fe0f", [":man_tipping_hand_tone4:"], "💁🏾‍♂️"], ["1f481-1f3ff-200d-2642-fe0f", [":man_tipping_hand_tone5:"], "💁🏿‍♂️"], ["1f481-1f3ff-200d-2640-fe0f", [":woman_tipping_hand_tone5:"], "💁🏿‍♀️"], ["1f481-1f3fe-200d-2640-fe0f", [":woman_tipping_hand_tone4:"], "💁🏾‍♀️"], ["1f481-1f3fd-200d-2640-fe0f", [":woman_tipping_hand_tone3:"], "💁🏽‍♀️"], ["1f481-1f3fc-200d-2640-fe0f", [":woman_tipping_hand_tone2:"], "💁🏼‍♀️"], ["1f481-1f3fb-200d-2640-fe0f", [":woman_tipping_hand_tone1:"], "💁🏻‍♀️"], ["1f645-1f3fb-200d-2642-fe0f", [":man_gesturing_no_tone1:"], "🙅🏻‍♂️"], ["1f645-1f3fc-200d-2642-fe0f", [":man_gesturing_no_tone2:"], "🙅🏼‍♂️"], ["1f645-1f3fd-200d-2642-fe0f", [":man_gesturing_no_tone3:"], "🙅🏽‍♂️"], ["1f645-1f3fe-200d-2642-fe0f", [":man_gesturing_no_tone4:"], "🙅🏾‍♂️"], ["1f645-1f3ff-200d-2642-fe0f", [":man_gesturing_no_tone5:"], "🙅🏿‍♂️"], ["1f645-1f3ff-200d-2640-fe0f", [":woman_gesturing_no_tone5:"], "🙅🏿‍♀️"], ["1f645-1f3fe-200d-2640-fe0f", [":woman_gesturing_no_tone4:"], "🙅🏾‍♀️"], ["1f645-1f3fd-200d-2640-fe0f", [":woman_gesturing_no_tone3:"], "🙅🏽‍♀️"], ["1f645-1f3fc-200d-2640-fe0f", [":woman_gesturing_no_tone2:"], "🙅🏼‍♀️"], ["1f645-1f3fb-200d-2640-fe0f", [":woman_gesturing_no_tone1:"], "🙅🏻‍♀️"], ["1f646-1f3fb-200d-2642-fe0f", [":man_gesturing_ok_tone1:"], "🙆🏻‍♂️"], ["1f646-1f3fc-200d-2642-fe0f", [":man_gesturing_ok_tone2:"], "🙆🏼‍♂️"], ["1f646-1f3fd-200d-2642-fe0f", [":man_gesturing_ok_tone3:"], "🙆🏽‍♂️"], ["1f646-1f3fe-200d-2642-fe0f", [":man_gesturing_ok_tone4:"], "🙆🏾‍♂️"], ["1f646-1f3ff-200d-2642-fe0f", [":man_gesturing_ok_tone5:"], "🙆🏿‍♂️"], ["1f646-1f3ff-200d-2640-fe0f", [":woman_gesturing_ok_tone5:"], "🙆🏿‍♀️"], ["1f646-1f3fe-200d-2640-fe0f", [":woman_gesturing_ok_tone4:"], "🙆🏾‍♀️"], ["1f646-1f3fd-200d-2640-fe0f", [":woman_gesturing_ok_tone3:"], "🙆🏽‍♀️"], ["1f646-1f3fc-200d-2640-fe0f", [":woman_gesturing_ok_tone2:"], "🙆🏼‍♀️"], ["1f646-1f3fb-200d-2640-fe0f", [":woman_gesturing_ok_tone1:"], "🙆🏻‍♀️"], ["1f64b-1f3fb-200d-2642-fe0f", [":man_raising_hand_tone1:"], "🙋🏻‍♂️"], ["1f64b-1f3fc-200d-2642-fe0f", [":man_raising_hand_tone2:"], "🙋🏼‍♂️"], ["1f64b-1f3fd-200d-2642-fe0f", [":man_raising_hand_tone3:"], "🙋🏽‍♂️"], ["1f64b-1f3fe-200d-2642-fe0f", [":man_raising_hand_tone4:"], "🙋🏾‍♂️"], ["1f64b-1f3ff-200d-2642-fe0f", [":man_raising_hand_tone5:"], "🙋🏿‍♂️"], ["1f64b-1f3ff-200d-2640-fe0f", [":woman_raising_hand_tone5:"], "🙋🏿‍♀️"], ["1f64b-1f3fe-200d-2640-fe0f", [":woman_raising_hand_tone4:"], "🙋🏾‍♀️"], ["1f64b-1f3fd-200d-2640-fe0f", [":woman_raising_hand_tone3:"], "🙋🏽‍♀️"], ["1f64b-1f3fc-200d-2640-fe0f", [":woman_raising_hand_tone2:"], "🙋🏼‍♀️"], ["1f64b-1f3fb-200d-2640-fe0f", [":woman_raising_hand_tone1:"], "🙋🏻‍♀️"], ["1f926-1f3fb-200d-2640-fe0f", [":woman_facepalming_tone1:"], "🤦🏻‍♀️"], ["1f926-1f3fc-200d-2640-fe0f", [":woman_facepalming_tone2:"], "🤦🏼‍♀️"], ["1f926-1f3fd-200d-2640-fe0f", [":woman_facepalming_tone3:"], "🤦🏽‍♀️"], ["1f926-1f3fe-200d-2640-fe0f", [":woman_facepalming_tone4:"], "🤦🏾‍♀️"], ["1f926-1f3ff-200d-2640-fe0f", [":woman_facepalming_tone5:"], "🤦🏿‍♀️"], ["1f926-1f3fb-200d-2642-fe0f", [":man_facepalming_tone1:"], "🤦🏻‍♂️"], ["1f926-1f3fc-200d-2642-fe0f", [":man_facepalming_tone2:"], "🤦🏼‍♂️"], ["1f926-1f3fd-200d-2642-fe0f", [":man_facepalming_tone3:"], "🤦🏽‍♂️"], ["1f926-1f3fe-200d-2642-fe0f", [":man_facepalming_tone4:"], "🤦🏾‍♂️"], ["1f926-1f3ff-200d-2642-fe0f", [":man_facepalming_tone5:"], "🤦🏿‍♂️"], ["1f937-1f3fb-200d-2640-fe0f", [":woman_shrugging_tone1:"], "🤷🏻‍♀️"], ["1f937-1f3fc-200d-2640-fe0f", [":woman_shrugging_tone2:"], "🤷🏼‍♀️"], ["1f937-1f3fd-200d-2640-fe0f", [":woman_shrugging_tone3:"], "🤷🏽‍♀️"], ["1f937-1f3fe-200d-2640-fe0f", [":woman_shrugging_tone4:"], "🤷🏾‍♀️"], ["1f937-1f3ff-200d-2640-fe0f", [":woman_shrugging_tone5:"], "🤷🏿‍♀️"], ["1f937-1f3fb-200d-2642-fe0f", [":man_shrugging_tone1:"], "🤷🏻‍♂️"], ["1f937-1f3fc-200d-2642-fe0f", [":man_shrugging_tone2:"], "🤷🏼‍♂️"], ["1f937-1f3fd-200d-2642-fe0f", [":man_shrugging_tone3:"], "🤷🏽‍♂️"], ["1f937-1f3fe-200d-2642-fe0f", [":man_shrugging_tone4:"], "🤷🏾‍♂️"], ["1f937-1f3ff-200d-2642-fe0f", [":man_shrugging_tone5:"], "🤷🏿‍♂️"], ["1f64e-1f3fb-200d-2642-fe0f", [":man_pouting_tone1:"], "🙎🏻‍♂️"], ["1f64e-1f3fc-200d-2642-fe0f", [":man_pouting_tone2:"], "🙎🏼‍♂️"], ["1f64e-1f3fd-200d-2642-fe0f", [":man_pouting_tone3:"], "🙎🏽‍♂️"], ["1f64e-1f3fe-200d-2642-fe0f", [":man_pouting_tone4:"], "🙎🏾‍♂️"], ["1f64e-1f3ff-200d-2642-fe0f", [":man_pouting_tone5:"], "🙎🏿‍♂️"], ["1f64e-1f3ff-200d-2640-fe0f", [":woman_pouting_tone5:"], "🙎🏿‍♀️"], ["1f64e-1f3fe-200d-2640-fe0f", [":woman_pouting_tone4:"], "🙎🏾‍♀️"], ["1f64e-1f3fd-200d-2640-fe0f", [":woman_pouting_tone3:"], "🙎🏽‍♀️"], ["1f64e-1f3fc-200d-2640-fe0f", [":woman_pouting_tone2:"], "🙎🏼‍♀️"], ["1f64e-1f3fb-200d-2640-fe0f", [":woman_pouting_tone1:"], "🙎🏻‍♀️"], ["1f64d-1f3fb-200d-2642-fe0f", [":man_frowning_tone1:"], "🙍🏻‍♂️"], ["1f64d-1f3fc-200d-2642-fe0f", [":man_frowning_tone2:"], "🙍🏼‍♂️"], ["1f64d-1f3fd-200d-2642-fe0f", [":man_frowning_tone3:"], "🙍🏽‍♂️"], ["1f64d-1f3fe-200d-2642-fe0f", [":man_frowning_tone4:"], "🙍🏾‍♂️"], ["1f64d-1f3ff-200d-2642-fe0f", [":man_frowning_tone5:"], "🙍🏿‍♂️"], ["1f64d-1f3ff-200d-2640-fe0f", [":woman_frowning_tone5:"], "🙍🏿‍♀️"], ["1f64d-1f3fe-200d-2640-fe0f", [":woman_frowning_tone4:"], "🙍🏾‍♀️"], ["1f64d-1f3fd-200d-2640-fe0f", [":woman_frowning_tone3:"], "🙍🏽‍♀️"], ["1f64d-1f3fc-200d-2640-fe0f", [":woman_frowning_tone2:"], "🙍🏼‍♀️"], ["1f64d-1f3fb-200d-2640-fe0f", [":woman_frowning_tone1:"], "🙍🏻‍♀️"], ["1f487-1f3fb-200d-2642-fe0f", [":man_getting_haircut_tone1:"], "💇🏻‍♂️"], ["1f487-1f3fc-200d-2642-fe0f", [":man_getting_haircut_tone2:"], "💇🏼‍♂️"], ["1f487-1f3fd-200d-2642-fe0f", [":man_getting_haircut_tone3:"], "💇🏽‍♂️"], ["1f487-1f3fe-200d-2642-fe0f", [":man_getting_haircut_tone4:"], "💇🏾‍♂️"], ["1f487-1f3ff-200d-2642-fe0f", [":man_getting_haircut_tone5:"], "💇🏿‍♂️"], ["1f487-1f3ff-200d-2640-fe0f", [":woman_getting_haircut_tone5:"], "💇🏿‍♀️"], ["1f487-1f3fe-200d-2640-fe0f", [":woman_getting_haircut_tone4:"], "💇🏾‍♀️"], ["1f487-1f3fd-200d-2640-fe0f", [":woman_getting_haircut_tone3:"], "💇🏽‍♀️"], ["1f487-1f3fc-200d-2640-fe0f", [":woman_getting_haircut_tone2:"], "💇🏼‍♀️"], ["1f487-1f3fb-200d-2640-fe0f", [":woman_getting_haircut_tone1:"], "💇🏻‍♀️"], ["1f486-1f3fb-200d-2642-fe0f", [":man_getting_face_massage_tone1:"], "💆🏻‍♂️"], ["1f486-1f3fc-200d-2642-fe0f", [":man_getting_face_massage_tone2:"], "💆🏼‍♂️"], ["1f486-1f3fd-200d-2642-fe0f", [":man_getting_face_massage_tone3:"], "💆🏽‍♂️"], ["1f486-1f3fe-200d-2642-fe0f", [":man_getting_face_massage_tone4:"], "💆🏾‍♂️"], ["1f486-1f3ff-200d-2642-fe0f", [":man_getting_face_massage_tone5:"], "💆🏿‍♂️"], ["1f486-1f3ff-200d-2640-fe0f", [":woman_getting_face_massage_tone5:"], "💆🏿‍♀️"], ["1f486-1f3fe-200d-2640-fe0f", [":woman_getting_face_massage_tone4:"], "💆🏾‍♀️"], ["1f486-1f3fd-200d-2640-fe0f", [":woman_getting_face_massage_tone3:"], "💆🏽‍♀️"], ["1f486-1f3fc-200d-2640-fe0f", [":woman_getting_face_massage_tone2:"], "💆🏼‍♀️"], ["1f486-1f3fb-200d-2640-fe0f", [":woman_getting_face_massage_tone1:"], "💆🏻‍♀️"], ["1f6b6-1f3fb-200d-2640-fe0f", [":woman_walking_tone1:"], "🚶🏻‍♀️"], ["1f6b6-1f3fc-200d-2640-fe0f", [":woman_walking_tone2:"], "🚶🏼‍♀️"], ["1f6b6-1f3fd-200d-2640-fe0f", [":woman_walking_tone3:"], "🚶🏽‍♀️"], ["1f6b6-1f3fe-200d-2640-fe0f", [":woman_walking_tone4:"], "🚶🏾‍♀️"], ["1f6b6-1f3ff-200d-2640-fe0f", [":woman_walking_tone5:"], "🚶🏿‍♀️"], ["1f6b6-1f3ff-200d-2642-fe0f", [":man_walking_tone5:"], "🚶🏿‍♂️"], ["1f6b6-1f3fe-200d-2642-fe0f", [":man_walking_tone4:"], "🚶🏾‍♂️"], ["1f6b6-1f3fd-200d-2642-fe0f", [":man_walking_tone3:"], "🚶🏽‍♂️"], ["1f6b6-1f3fc-200d-2642-fe0f", [":man_walking_tone2:"], "🚶🏼‍♂️"], ["1f6b6-1f3fb-200d-2642-fe0f", [":man_walking_tone1:"], "🚶🏻‍♂️"], ["1f3c3-1f3fb-200d-2640-fe0f", [":woman_running_tone1:"], "🏃🏻‍♀️"], ["1f3c3-1f3fc-200d-2640-fe0f", [":woman_running_tone2:"], "🏃🏼‍♀️"], ["1f3c3-1f3fd-200d-2640-fe0f", [":woman_running_tone3:"], "🏃🏽‍♀️"], ["1f3c3-1f3fe-200d-2640-fe0f", [":woman_running_tone4:"], "🏃🏾‍♀️"], ["1f3c3-1f3ff-200d-2640-fe0f", [":woman_running_tone5:"], "🏃🏿‍♀️"], ["1f3c3-1f3ff-200d-2642-fe0f", [":man_running_tone5:"], "🏃🏿‍♂️"], ["1f3c3-1f3fe-200d-2642-fe0f", [":man_running_tone4:"], "🏃🏾‍♂️"], ["1f3c3-1f3fd-200d-2642-fe0f", [":man_running_tone3:"], "🏃🏽‍♂️"], ["1f3c3-1f3fc-200d-2642-fe0f", [":man_running_tone2:"], "🏃🏼‍♂️"], ["1f3c3-1f3fb-200d-2642-fe0f", [":man_running_tone1:"], "🏃🏻‍♂️"], ["1f9db-1f3fe-200d-2640-fe0f", [":woman_vampire_tone4:"], "🧛🏾‍♀️"], ["1f9db-1f3fd-200d-2642-fe0f", [":man_vampire_tone3:"], "🧛🏽‍♂️"], ["1f9db-1f3fd-200d-2640-fe0f", [":woman_vampire_tone3:"], "🧛🏽‍♀️"], ["1f9db-1f3fc-200d-2642-fe0f", [":man_vampire_tone2:"], "🧛🏼‍♂️"], ["1f9db-1f3fc-200d-2640-fe0f", [":woman_vampire_tone2:"], "🧛🏼‍♀️"], ["1f9db-1f3fb-200d-2642-fe0f", [":man_vampire_tone1:"], "🧛🏻‍♂️"], ["1f9db-1f3fb-200d-2640-fe0f", [":woman_vampire_tone1:"], "🧛🏻‍♀️"], ["1f938-1f3fe-200d-2642-fe0f", [":man_cartwheeling_tone4:"], "🤸🏾‍♂️"], ["1f575-fe0f-200d-2642-fe0f", [":man_detective:"], "🕵️‍♂️"], ["26f9-1f3ff-200d-2642-fe0f", [":man_bouncing_ball_tone5:"], "⛹🏿‍♂️"], ["1f3cc-fe0f-200d-2642-fe0f", [":man_golfing:"], "🏌️‍♂️"], ["26f9-1f3fd-200d-2642-fe0f", [":man_bouncing_ball_tone3:"], "⛹🏽‍♂️"], ["26f9-1f3fc-200d-2642-fe0f", [":man_bouncing_ball_tone2:"], "⛹🏼‍♂️"], ["1f575-fe0f-200d-2640-fe0f", [":woman_detective:"], "🕵️‍♀️"], ["26f9-1f3ff-200d-2640-fe0f", [":woman_bouncing_ball_tone5:"], "⛹🏿‍♀️"], ["26f9-1f3fe-200d-2640-fe0f", [":woman_bouncing_ball_tone4:"], "⛹🏾‍♀️"], ["26f9-1f3fe-200d-2642-fe0f", [":man_bouncing_ball_tone4:"], "⛹🏾‍♂️"], ["26f9-1f3fc-200d-2640-fe0f", [":woman_bouncing_ball_tone2:"], "⛹🏼‍♀️"], ["26f9-1f3fb-200d-2640-fe0f", [":woman_bouncing_ball_tone1:"], "⛹🏻‍♀️"], ["1f3cb-fe0f-200d-2642-fe0f", [":man_lifting_weights:"], "🏋️‍♂️"], ["26f9-1f3fb-200d-2642-fe0f", [":man_bouncing_ball_tone1:"], "⛹🏻‍♂️"], ["1f3cc-fe0f-200d-2640-fe0f", [":woman_golfing:"], "🏌️‍♀️"], ["1f3cb-fe0f-200d-2640-fe0f", [":woman_lifting_weights:"], "🏋️‍♀️"], ["26f9-1f3fd-200d-2640-fe0f", [":woman_bouncing_ball_tone3:"], "⛹🏽‍♀️"], ["26f9-fe0f-200d-2640-fe0f", [":woman_bouncing_ball:"], "⛹️‍♀️"], ["26f9-fe0f-200d-2642-fe0f", [":man_bouncing_ball:"], "⛹️‍♂️"], ["1f468-1f3ff-200d-1f680", [":man_astronaut_tone5:"], "👨🏿‍🚀"], ["1f469-1f3ff-200d-1f680", [":woman_astronaut_tone5:"], "👩🏿‍🚀"], ["1f469-1f3ff-200d-1f692", [":woman_firefighter_tone5:"], "👩🏿‍🚒"], ["1f469-1f3fe-200d-1f692", [":woman_firefighter_tone4:"], "👩🏾‍🚒"], ["1f469-1f3fd-200d-1f692", [":woman_firefighter_tone3:"], "👩🏽‍🚒"], ["1f469-1f3fc-200d-1f692", [":woman_firefighter_tone2:"], "👩🏼‍🚒"], ["1f469-1f3fb-200d-1f692", [":woman_firefighter_tone1:"], "👩🏻‍🚒"], ["1f469-1f3fe-200d-1f680", [":woman_astronaut_tone4:"], "👩🏾‍🚀"], ["1f469-1f3fd-200d-1f680", [":woman_astronaut_tone3:"], "👩🏽‍🚀"], ["1f469-1f3fc-200d-1f680", [":woman_astronaut_tone2:"], "👩🏼‍🚀"], ["1f469-1f3fb-200d-1f680", [":woman_astronaut_tone1:"], "👩🏻‍🚀"], ["1f468-1f3fd-200d-1f680", [":man_astronaut_tone3:"], "👨🏽‍🚀"], ["1f468-1f3fc-200d-1f680", [":man_astronaut_tone2:"], "👨🏼‍🚀"], ["1f468-1f3fb-200d-1f680", [":man_astronaut_tone1:"], "👨🏻‍🚀"], ["1f468-1f3ff-200d-1f3a8", [":man_artist_tone5:"], "👨🏿‍🎨"], ["1f468-1f3fe-200d-1f3a8", [":man_artist_tone4:"], "👨🏾‍🎨"], ["1f468-1f3fd-200d-1f3a8", [":man_artist_tone3:"], "👨🏽‍🎨"], ["1f468-1f3fc-200d-1f3a8", [":man_artist_tone2:"], "👨🏼‍🎨"], ["1f468-1f3fb-200d-1f3a8", [":man_artist_tone1:"], "👨🏻‍🎨"], ["1f469-1f3ff-200d-1f3a8", [":woman_artist_tone5:"], "👩🏿‍🎨"], ["1f469-1f3fe-200d-1f3a8", [":woman_artist_tone4:"], "👩🏾‍🎨"], ["1f469-1f3fd-200d-1f3a8", [":woman_artist_tone3:"], "👩🏽‍🎨"], ["1f469-1f3fc-200d-1f3a8", [":woman_artist_tone2:"], "👩🏼‍🎨"], ["1f469-1f3fb-200d-1f3a8", [":woman_artist_tone1:"], "👩🏻‍🎨"], ["1f468-1f3ff-200d-1f52c", [":man_scientist_tone5:"], "👨🏿‍🔬"], ["1f468-1f3fe-200d-1f52c", [":man_scientist_tone4:"], "👨🏾‍🔬"], ["1f468-1f3fd-200d-1f52c", [":man_scientist_tone3:"], "👨🏽‍🔬"], ["1f468-1f3fc-200d-1f52c", [":man_scientist_tone2:"], "👨🏼‍🔬"], ["1f468-1f3fb-200d-1f52c", [":man_scientist_tone1:"], "👨🏻‍🔬"], ["1f469-1f3ff-200d-1f52c", [":woman_scientist_tone5:"], "👩🏿‍🔬"], ["1f469-1f3fe-200d-1f52c", [":woman_scientist_tone4:"], "👩🏾‍🔬"], ["1f469-1f3fd-200d-1f52c", [":woman_scientist_tone3:"], "👩🏽‍🔬"], ["1f469-1f3fc-200d-1f52c", [":woman_scientist_tone2:"], "👩🏼‍🔬"], ["1f469-1f3fb-200d-1f52c", [":woman_scientist_tone1:"], "👩🏻‍🔬"], ["1f468-1f3ff-200d-1f527", [":man_mechanic_tone5:"], "👨🏿‍🔧"], ["1f468-1f3fe-200d-1f527", [":man_mechanic_tone4:"], "👨🏾‍🔧"], ["1f468-1f3fd-200d-1f527", [":man_mechanic_tone3:"], "👨🏽‍🔧"], ["1f468-1f3fc-200d-1f527", [":man_mechanic_tone2:"], "👨🏼‍🔧"], ["1f468-1f3fb-200d-1f527", [":man_mechanic_tone1:"], "👨🏻‍🔧"], ["1f469-1f3ff-200d-1f527", [":woman_mechanic_tone5:"], "👩🏿‍🔧"], ["1f469-1f3fe-200d-1f527", [":woman_mechanic_tone4:"], "👩🏾‍🔧"], ["1f469-1f3fd-200d-1f527", [":woman_mechanic_tone3:"], "👩🏽‍🔧"], ["1f469-1f3fc-200d-1f527", [":woman_mechanic_tone2:"], "👩🏼‍🔧"], ["1f469-1f3fb-200d-1f527", [":woman_mechanic_tone1:"], "👩🏻‍🔧"], ["1f468-1f3ff-200d-1f4bc", [":man_office_worker_tone5:"], "👨🏿‍💼"], ["1f468-1f3fe-200d-1f4bc", [":man_office_worker_tone4:"], "👨🏾‍💼"], ["1f468-1f3fd-200d-1f4bc", [":man_office_worker_tone3:"], "👨🏽‍💼"], ["1f468-1f3fc-200d-1f4bc", [":man_office_worker_tone2:"], "👨🏼‍💼"], ["1f468-1f3fb-200d-1f4bc", [":man_office_worker_tone1:"], "👨🏻‍💼"], ["1f469-1f3ff-200d-1f4bc", [":woman_office_worker_tone5:"], "👩🏿‍💼"], ["1f469-1f3fe-200d-1f4bc", [":woman_office_worker_tone4:"], "👩🏾‍💼"], ["1f469-1f3fd-200d-1f4bc", [":woman_office_worker_tone3:"], "👩🏽‍💼"], ["1f469-1f3fc-200d-1f4bc", [":woman_office_worker_tone2:"], "👩🏼‍💼"], ["1f469-1f3fb-200d-1f4bc", [":woman_office_worker_tone1:"], "👩🏻‍💼"], ["1f468-1f3ff-200d-1f4bb", [":man_technologist_tone5:"], "👨🏿‍💻"], ["1f468-1f3fe-200d-1f4bb", [":man_technologist_tone4:"], "👨🏾‍💻"], ["1f468-1f3fe-200d-1f680", [":man_astronaut_tone4:"], "👨🏾‍🚀"], ["1f468-1f3fc-200d-1f4bb", [":man_technologist_tone2:"], "👨🏼‍💻"], ["1f468-1f3fb-200d-1f4bb", [":man_technologist_tone1:"], "👨🏻‍💻"], ["1f469-1f3ff-200d-1f4bb", [":woman_technologist_tone5:"], "👩🏿‍💻"], ["1f469-1f3fe-200d-1f4bb", [":woman_technologist_tone4:"], "👩🏾‍💻"], ["1f469-1f3fd-200d-1f4bb", [":woman_technologist_tone3:"], "👩🏽‍💻"], ["1f469-1f3fc-200d-1f4bb", [":woman_technologist_tone2:"], "👩🏼‍💻"], ["1f469-1f3fb-200d-1f4bb", [":woman_technologist_tone1:"], "👩🏻‍💻"], ["1f468-1f3ff-200d-1f3ed", [":man_factory_worker_tone5:"], "👨🏿‍🏭"], ["1f468-1f3fe-200d-1f3ed", [":man_factory_worker_tone4:"], "👨🏾‍🏭"], ["1f468-1f3fd-200d-1f3ed", [":man_factory_worker_tone3:"], "👨🏽‍🏭"], ["1f468-1f3fc-200d-1f3ed", [":man_factory_worker_tone2:"], "👨🏼‍🏭"], ["1f468-1f3fb-200d-1f3ed", [":man_factory_worker_tone1:"], "👨🏻‍🏭"], ["1f469-1f3ff-200d-1f3ed", [":woman_factory_worker_tone5:"], "👩🏿‍🏭"], ["1f469-1f3fe-200d-1f3ed", [":woman_factory_worker_tone4:"], "👩🏾‍🏭"], ["1f469-1f3fd-200d-1f3ed", [":woman_factory_worker_tone3:"], "👩🏽‍🏭"], ["1f469-1f3fc-200d-1f3ed", [":woman_factory_worker_tone2:"], "👩🏼‍🏭"], ["1f469-1f3fb-200d-1f3ed", [":woman_factory_worker_tone1:"], "👩🏻‍🏭"], ["1f468-1f3ff-200d-1f3eb", [":man_teacher_tone5:"], "👨🏿‍🏫"], ["1f468-1f3fe-200d-1f3eb", [":man_teacher_tone4:"], "👨🏾‍🏫"], ["1f468-1f3fd-200d-1f3eb", [":man_teacher_tone3:"], "👨🏽‍🏫"], ["1f468-1f3fc-200d-1f3eb", [":man_teacher_tone2:"], "👨🏼‍🏫"], ["1f468-1f3fb-200d-1f3eb", [":man_teacher_tone1:"], "👨🏻‍🏫"], ["1f469-1f3ff-200d-1f3eb", [":woman_teacher_tone5:"], "👩🏿‍🏫"], ["1f469-1f3fe-200d-1f3eb", [":woman_teacher_tone4:"], "👩🏾‍🏫"], ["1f469-1f3fd-200d-1f3eb", [":woman_teacher_tone3:"], "👩🏽‍🏫"], ["1f469-1f3fc-200d-1f3eb", [":woman_teacher_tone2:"], "👩🏼‍🏫"], ["1f469-1f3fb-200d-1f3eb", [":woman_teacher_tone1:"], "👩🏻‍🏫"], ["1f468-1f3ff-200d-1f692", [":man_firefighter_tone5:"], "👨🏿‍🚒"], ["1f468-1f3ff-200d-1f3a4", [":man_singer_tone5:"], "👨🏿‍🎤"], ["1f468-1f3fe-200d-1f3a4", [":man_singer_tone4:"], "👨🏾‍🎤"], ["1f468-1f3fd-200d-1f3a4", [":man_singer_tone3:"], "👨🏽‍🎤"], ["1f468-1f3fc-200d-1f3a4", [":man_singer_tone2:"], "👨🏼‍🎤"], ["1f468-1f3fb-200d-1f3a4", [":man_singer_tone1:"], "👨🏻‍🎤"], ["1f469-1f3ff-200d-1f3a4", [":woman_singer_tone5:"], "👩🏿‍🎤"], ["1f469-1f3fe-200d-1f3a4", [":woman_singer_tone4:"], "👩🏾‍🎤"], ["1f469-1f3fd-200d-1f3a4", [":woman_singer_tone3:"], "👩🏽‍🎤"], ["1f469-1f3fc-200d-1f3a4", [":woman_singer_tone2:"], "👩🏼‍🎤"], ["1f469-1f3fb-200d-1f3a4", [":woman_singer_tone1:"], "👩🏻‍🎤"], ["1f468-1f3ff-200d-1f393", [":man_student_tone5:"], "👨🏿‍🎓"], ["1f468-1f3fe-200d-1f393", [":man_student_tone4:"], "👨🏾‍🎓"], ["1f468-1f3fd-200d-1f393", [":man_student_tone3:"], "👨🏽‍🎓"], ["1f468-1f3fc-200d-1f393", [":man_student_tone2:"], "👨🏼‍🎓"], ["1f468-1f3fb-200d-1f393", [":man_student_tone1:"], "👨🏻‍🎓"], ["1f469-1f3ff-200d-1f393", [":woman_student_tone5:"], "👩🏿‍🎓"], ["1f469-1f3fe-200d-1f393", [":woman_student_tone4:"], "👩🏾‍🎓"], ["1f469-1f3fd-200d-1f393", [":woman_student_tone3:"], "👩🏽‍🎓"], ["1f469-1f3fc-200d-1f393", [":woman_student_tone2:"], "👩🏼‍🎓"], ["1f469-1f3fb-200d-1f393", [":woman_student_tone1:"], "👩🏻‍🎓"], ["1f468-1f3ff-200d-1f373", [":man_cook_tone5:"], "👨🏿‍🍳"], ["1f468-1f3fe-200d-1f373", [":man_cook_tone4:"], "👨🏾‍🍳"], ["1f468-1f3fd-200d-1f373", [":man_cook_tone3:"], "👨🏽‍🍳"], ["1f468-1f3fc-200d-1f373", [":man_cook_tone2:"], "👨🏼‍🍳"], ["1f468-1f3fb-200d-1f373", [":man_cook_tone1:"], "👨🏻‍🍳"], ["1f468-1f3fe-200d-1f692", [":man_firefighter_tone4:"], "👨🏾‍🚒"], ["1f469-1f3ff-200d-1f373", [":woman_cook_tone5:"], "👩🏿‍🍳"], ["1f469-1f3fe-200d-1f373", [":woman_cook_tone4:"], "👩🏾‍🍳"], ["1f469-1f3fd-200d-1f373", [":woman_cook_tone3:"], "👩🏽‍🍳"], ["1f469-1f3fc-200d-1f373", [":woman_cook_tone2:"], "👩🏼‍🍳"], ["1f469-1f3fb-200d-1f373", [":woman_cook_tone1:"], "👩🏻‍🍳"], ["1f468-1f3fd-200d-1f692", [":man_firefighter_tone3:"], "👨🏽‍🚒"], ["1f468-1f3ff-200d-1f33e", [":man_farmer_tone5:"], "👨🏿‍🌾"], ["1f468-1f3fe-200d-1f33e", [":man_farmer_tone4:"], "👨🏾‍🌾"], ["1f468-1f3fd-200d-1f33e", [":man_farmer_tone3:"], "👨🏽‍🌾"], ["1f468-1f3fc-200d-1f33e", [":man_farmer_tone2:"], "👨🏼‍🌾"], ["1f468-1f3fb-200d-1f33e", [":man_farmer_tone1:"], "👨🏻‍🌾"], ["1f468-1f3fc-200d-1f692", [":man_firefighter_tone2:"], "👨🏼‍🚒"], ["1f469-1f3ff-200d-1f33e", [":woman_farmer_tone5:"], "👩🏿‍🌾"], ["1f469-1f3fe-200d-1f33e", [":woman_farmer_tone4:"], "👩🏾‍🌾"], ["1f469-1f3fd-200d-1f33e", [":woman_farmer_tone3:"], "👩🏽‍🌾"], ["1f469-1f3fc-200d-1f33e", [":woman_farmer_tone2:"], "👩🏼‍🌾"], ["1f469-1f3fb-200d-1f33e", [":woman_farmer_tone1:"], "👩🏻‍🌾"], ["1f468-1f3fb-200d-1f692", [":man_firefighter_tone1:"], "👨🏻‍🚒"], ["1f468-1f3fd-200d-1f4bb", [":man_technologist_tone3:"], "👨🏽‍💻"], ["1f3f3-fe0f-200d-1f308", [":rainbow_flag:", ":gay_pride_flag:"], "🏳️‍🌈"], ["1f645-200d-2640-fe0f", [":woman_gesturing_no:"], "🙅‍♀️"], ["1f468-200d-2696-fe0f", [":man_judge:"], "👨‍⚖️"], ["1f469-200d-2708-fe0f", [":woman_pilot:"], "👩‍✈️"], ["1f6b5-200d-2640-fe0f", [":woman_mountain_biking:"], "🚵‍♀️"], ["1f9dd-200d-2640-fe0f", [":woman_elf:"], "🧝‍♀️"], ["1f937-200d-2642-fe0f", [":man_shrugging:"], "🤷‍♂️"], ["1f46f-200d-2642-fe0f", [":men_with_bunny_ears_partying:"], "👯‍♂️"], ["1f46f-200d-2640-fe0f", [":women_with_bunny_ears_partying:"], "👯‍♀️"], ["1f6b6-200d-2640-fe0f", [":woman_walking:"], "🚶‍♀️"], ["1f6b4-200d-2642-fe0f", [":man_biking:"], "🚴‍♂️"], ["1f9dc-200d-2642-fe0f", [":merman:"], "🧜‍♂️"], ["1f46e-200d-2642-fe0f", [":man_police_officer:"], "👮‍♂️"], ["1f646-200d-2642-fe0f", [":man_gesturing_ok:"], "🙆‍♂️"], ["1f473-200d-2640-fe0f", [":woman_wearing_turban:"], "👳‍♀️"], ["1f647-200d-2640-fe0f", [":woman_bowing:"], "🙇‍♀️"], ["1f6b4-200d-2640-fe0f", [":woman_biking:"], "🚴‍♀️"], ["1f6b6-200d-2642-fe0f", [":man_walking:"], "🚶‍♂️"], ["1f64e-200d-2642-fe0f", [":man_pouting:"], "🙎‍♂️"], ["1f468-200d-2695-fe0f", [":man_health_worker:"], "👨‍⚕️"], ["1f468-200d-2708-fe0f", [":man_pilot:"], "👨‍✈️"], ["1f482-200d-2642-fe0f", [":man_guard:"], "💂‍♂️"], ["1f6a3-200d-2642-fe0f", [":man_rowing_boat:"], "🚣‍♂️"], ["1f646-200d-2640-fe0f", [":woman_gesturing_ok:"], "🙆‍♀️"], ["1f3c3-200d-2640-fe0f", [":woman_running:"], "🏃‍♀️"], ["1f9dc-200d-2640-fe0f", [":mermaid:"], "🧜‍♀️"], ["1f64e-200d-2640-fe0f", [":woman_pouting:"], "🙎‍♀️"], ["1f9de-200d-2642-fe0f", [":man_genie:"], "🧞‍♂️"], ["1f6a3-200d-2640-fe0f", [":woman_rowing_boat:"], "🚣‍♀️"], ["1f9d8-200d-2642-fe0f", [":man_in_lotus_position:"], "🧘‍♂️"], ["1f9d8-200d-2640-fe0f", [":woman_in_lotus_position:"], "🧘‍♀️"], ["1f647-200d-2642-fe0f", [":man_bowing:"], "🙇‍♂️"], ["1f9de-200d-2640-fe0f", [":woman_genie:"], "🧞‍♀️"], ["1f3c3-200d-2642-fe0f", [":man_running:"], "🏃‍♂️"], ["1f93d-200d-2642-fe0f", [":man_playing_water_polo:"], "🤽‍♂️"], ["1f93e-200d-2640-fe0f", [":woman_playing_handball:"], "🤾‍♀️"], ["1f64b-200d-2642-fe0f", [":man_raising_hand:"], "🙋‍♂️"], ["1f64d-200d-2642-fe0f", [":man_frowning:"], "🙍‍♂️"], ["1f471-200d-2640-fe0f", [":blond-haired_woman:"], "👱‍♀️"], ["1f477-200d-2640-fe0f", [":woman_construction_worker:"], "👷‍♀️"], ["1f93d-200d-2640-fe0f", [":woman_playing_water_polo:"], "🤽‍♀️"], ["1f9df-200d-2642-fe0f", [":man_zombie:"], "🧟‍♂️"], ["1f481-200d-2642-fe0f", [":man_tipping_hand:"], "💁‍♂️"], ["1f9d7-200d-2642-fe0f", [":man_climbing:"], "🧗‍♂️"], ["1f9d7-200d-2640-fe0f", [":woman_climbing:"], "🧗‍♀️"], ["1f473-200d-2642-fe0f", [":man_wearing_turban:"], "👳‍♂️"], ["1f3ca-200d-2642-fe0f", [":man_swimming:"], "🏊‍♂️"], ["1f64d-200d-2640-fe0f", [":woman_frowning:"], "🙍‍♀️"], ["1f64b-200d-2640-fe0f", [":woman_raising_hand:"], "🙋‍♀️"], ["1f9db-200d-2642-fe0f", [":man_vampire:"], "🧛‍♂️"], ["1f9db-200d-2640-fe0f", [":woman_vampire:"], "🧛‍♀️"], ["1f9dd-200d-2642-fe0f", [":man_elf:"], "🧝‍♂️"], ["1f3ca-200d-2640-fe0f", [":woman_swimming:"], "🏊‍♀️"], ["1f477-200d-2642-fe0f", [":man_construction_worker:"], "👷‍♂️"], ["1f487-200d-2642-fe0f", [":man_getting_haircut:"], "💇‍♂️"], ["1f481-200d-2640-fe0f", [":woman_tipping_hand:"], "💁‍♀️"], ["1f926-200d-2640-fe0f", [":woman_facepalming:"], "🤦‍♀️"], ["1f9d6-200d-2642-fe0f", [":man_in_steamy_room:"], "🧖‍♂️"], ["1f3c4-200d-2642-fe0f", [":man_surfing:"], "🏄‍♂️"], ["1f9d6-200d-2640-fe0f", [":woman_in_steamy_room:"], "🧖‍♀️"], ["1f9da-200d-2642-fe0f", [":man_fairy:"], "🧚‍♂️"], ["1f471-200d-2642-fe0f", [":blond-haired_man:"], "👱‍♂️"], ["1f46e-200d-2640-fe0f", [":woman_police_officer:"], "👮‍♀️"], ["1f487-200d-2640-fe0f", [":woman_getting_haircut:"], "💇‍♀️"], ["1f9d9-200d-2642-fe0f", [":man_mage:"], "🧙‍♂️"], ["1f939-200d-2642-fe0f", [":man_juggling:"], "🤹‍♂️"], ["1f469-200d-2696-fe0f", [":woman_judge:"], "👩‍⚖️"], ["1f926-200d-2642-fe0f", [":man_facepalming:"], "🤦‍♂️"], ["1f9df-200d-2640-fe0f", [":woman_zombie:"], "🧟‍♀️"], ["1f9d9-200d-2640-fe0f", [":woman_mage:"], "🧙‍♀️"], ["1f486-200d-2642-fe0f", [":man_getting_face_massage:"], "💆‍♂️"], ["1f93c-200d-2640-fe0f", [":women_wrestling:"], "🤼‍♀️"], ["1f93c-200d-2642-fe0f", [":men_wrestling:"], "🤼‍♂️"], ["1f938-200d-2640-fe0f", [":woman_cartwheeling:"], "🤸‍♀️"], ["1f939-200d-2640-fe0f", [":woman_juggling:"], "🤹‍♀️"], ["1f482-200d-2640-fe0f", [":woman_guard:"], "💂‍♀️"], ["1f469-200d-2695-fe0f", [":woman_health_worker:"], "👩‍⚕️"], ["1f3c4-200d-2640-fe0f", [":woman_surfing:"], "🏄‍♀️"], ["1f9da-200d-2640-fe0f", [":woman_fairy:"], "🧚‍♀️"], ["1f938-200d-2642-fe0f", [":man_cartwheeling:"], "🤸‍♂️"], ["1f937-200d-2640-fe0f", [":woman_shrugging:"], "🤷‍♀️"], ["1f6b5-200d-2642-fe0f", [":man_mountain_biking:"], "🚵‍♂️"], ["1f93e-200d-2642-fe0f", [":man_playing_handball:"], "🤾‍♂️"], ["1f486-200d-2640-fe0f", [":woman_getting_face_massage:"], "💆‍♀️"], ["1f645-200d-2642-fe0f", [":man_gesturing_no:"], "🙅‍♂️"], ["1f469-200d-1f3a8", [":woman_artist:"], "👩‍🎨"], ["1f469-200d-1f33e", [":woman_farmer:"], "👩‍🌾"], ["1f468-200d-1f33e", [":man_farmer:"], "👨‍🌾"], ["1f469-200d-1f373", [":woman_cook:"], "👩‍🍳"], ["1f468-200d-1f373", [":man_cook:"], "👨‍🍳"], ["1f469-200d-1f393", [":woman_student:"], "👩‍🎓"], ["1f468-200d-1f393", [":man_student:"], "👨‍🎓"], ["1f469-200d-1f3a4", [":woman_singer:"], "👩‍🎤"], ["1f468-200d-1f3a4", [":man_singer:"], "👨‍🎤"], ["1f469-200d-1f3eb", [":woman_teacher:"], "👩‍🏫"], ["1f468-200d-1f3eb", [":man_teacher:"], "👨‍🏫"], ["1f468-200d-1f467", [":family_man_girl:"], "👨‍👧"], ["1f468-200d-1f466", [":family_man_boy:"], "👨‍👦"], ["1f469-200d-1f467", [":family_woman_girl:"], "👩‍👧"], ["1f469-200d-1f466", [":family_woman_boy:"], "👩‍👦"], ["1f468-200d-1f680", [":man_astronaut:"], "👨‍🚀"], ["1f469-200d-1f680", [":woman_astronaut:"], "👩‍🚀"], ["1f468-200d-1f692", [":man_firefighter:"], "👨‍🚒"], ["1f469-200d-1f692", [":woman_firefighter:"], "👩‍🚒"], ["1f468-200d-1f3a8", [":man_artist:"], "👨‍🎨"], ["1f469-200d-1f3ed", [":woman_factory_worker:"], "👩‍🏭"], ["1f468-200d-1f52c", [":man_scientist:"], "👨‍🔬"], ["1f469-200d-1f52c", [":woman_scientist:"], "👩‍🔬"], ["1f468-200d-1f527", [":man_mechanic:"], "👨‍🔧"], ["1f469-200d-1f527", [":woman_mechanic:"], "👩‍🔧"], ["1f468-200d-1f4bc", [":man_office_worker:"], "👨‍💼"], ["1f469-200d-1f4bc", [":woman_office_worker:"], "👩‍💼"], ["1f468-200d-1f4bb", [":man_technologist:"], "👨‍💻"], ["1f469-200d-1f4bb", [":woman_technologist:"], "👩‍💻"], ["1f468-200d-1f3ed", [":man_factory_worker:"], "👨‍🏭"], ["0036-fe0f-20e3", [":six:"], "6️⃣"], ["0031-fe0f-20e3", [":one:"], "1️⃣"], ["0023-fe0f-20e3", [":hash:"], "#️⃣"], ["0039-fe0f-20e3", [":nine:"], "9️⃣"], ["0038-fe0f-20e3", [":eight:"], "8️⃣"], ["0037-fe0f-20e3", [":seven:"], "7️⃣"], ["002a-fe0f-20e3", [":asterisk:", ":keycap_asterisk:"], "*️⃣"], ["0035-fe0f-20e3", [":five:"], "5️⃣"], ["0034-fe0f-20e3", [":four:"], "4️⃣"], ["0033-fe0f-20e3", [":three:"], "3️⃣"], ["0032-fe0f-20e3", [":two:"], "2️⃣"], ["0030-fe0f-20e3", [":zero:"], "0️⃣"], ["1f1f5-1f1ec", [":flag_pg:", ":pg:"], "🇵🇬"], ["1f1f5-1f1e6", [":flag_pa:", ":pa:"], "🇵🇦"], ["1f1f2-1f1f7", [":flag_mr:", ":mr:"], "🇲🇷"], ["1f936-1f3fb", [":mrs_claus_tone1:"], "🤶🏻"], ["1f936-1f3fc", [":mrs_claus_tone2:"], "🤶🏼"], ["1f936-1f3fd", [":mrs_claus_tone3:"], "🤶🏽"], ["1f936-1f3fe", [":mrs_claus_tone4:"], "🤶🏾"], ["1f936-1f3ff", [":mrs_claus_tone5:"], "🤶🏿"], ["1f1f2-1f1f6", [":flag_mq:", ":mq:"], "🇲🇶"], ["1f385-1f3fb", [":santa_tone1:"], "🎅🏻"], ["1f385-1f3fc", [":santa_tone2:"], "🎅🏼"], ["1f385-1f3fd", [":santa_tone3:"], "🎅🏽"], ["1f385-1f3fe", [":santa_tone4:"], "🎅🏾"], ["1f385-1f3ff", [":santa_tone5:"], "🎅🏿"], ["1f1f2-1f1ed", [":flag_mh:", ":mh:"], "🇲🇭"], ["1f478-1f3fb", [":princess_tone1:"], "👸🏻"], ["1f478-1f3fc", [":princess_tone2:"], "👸🏼"], ["1f478-1f3fd", [":princess_tone3:"], "👸🏽"], ["1f478-1f3fe", [":princess_tone4:"], "👸🏾"], ["1f478-1f3ff", [":princess_tone5:"], "👸🏿"], ["1f1f2-1f1f9", [":flag_mt:", ":mt:"], "🇲🇹"], ["1f934-1f3fb", [":prince_tone1:"], "🤴🏻"], ["1f934-1f3fc", [":prince_tone2:"], "🤴🏼"], ["1f934-1f3fd", [":prince_tone3:"], "🤴🏽"], ["1f934-1f3fe", [":prince_tone4:"], "🤴🏾"], ["1f934-1f3ff", [":prince_tone5:"], "🤴🏿"], ["1f1f2-1f1f1", [":flag_ml:", ":ml:"], "🇲🇱"], ["1f470-1f3fb", [":bride_with_veil_tone1:"], "👰🏻"], ["1f470-1f3fc", [":bride_with_veil_tone2:"], "👰🏼"], ["1f470-1f3fd", [":bride_with_veil_tone3:"], "👰🏽"], ["1f470-1f3fe", [":bride_with_veil_tone4:"], "👰🏾"], ["1f470-1f3ff", [":bride_with_veil_tone5:"], "👰🏿"], ["1f1f2-1f1fb", [":flag_mv:", ":mv:"], "🇲🇻"], ["1f935-1f3fb", [":man_in_tuxedo_tone1:"], "🤵🏻"], ["1f935-1f3fc", [":man_in_tuxedo_tone2:"], "🤵🏼"], ["1f935-1f3fd", [":man_in_tuxedo_tone3:"], "🤵🏽"], ["1f935-1f3fe", [":man_in_tuxedo_tone4:"], "🤵🏾"], ["1f935-1f3ff", [":man_in_tuxedo_tone5:"], "🤵🏿"], ["1f1f2-1f1fe", [":flag_my:", ":my:"], "🇲🇾"], ["1f47c-1f3fb", [":angel_tone1:"], "👼🏻"], ["1f47c-1f3fc", [":angel_tone2:"], "👼🏼"], ["1f47c-1f3fd", [":angel_tone3:"], "👼🏽"], ["1f47c-1f3fe", [":angel_tone4:"], "👼🏾"], ["1f47c-1f3ff", [":angel_tone5:"], "👼🏿"], ["1f1f2-1f1fc", [":flag_mw:", ":mw:"], "🇲🇼"], ["1f930-1f3fb", [":pregnant_woman_tone1:"], "🤰🏻"], ["1f930-1f3fc", [":pregnant_woman_tone2:"], "🤰🏼"], ["1f930-1f3fd", [":pregnant_woman_tone3:"], "🤰🏽"], ["1f930-1f3fe", [":pregnant_woman_tone4:"], "🤰🏾"], ["1f930-1f3ff", [":pregnant_woman_tone5:"], "🤰🏿"], ["1f1f5-1f1f8", [":flag_ps:", ":ps:"], "🇵🇸"], ["1f1f5-1f1fc", [":flag_pw:", ":pw:"], "🇵🇼"], ["1f933-1f3fb", [":selfie_tone1:"], "🤳🏻"], ["1f933-1f3fc", [":selfie_tone2:"], "🤳🏼"], ["1f933-1f3fd", [":selfie_tone3:"], "🤳🏽"], ["1f933-1f3fe", [":selfie_tone4:"], "🤳🏾"], ["1f1f2-1f1ec", [":flag_mg:", ":mg:"], "🇲🇬"], ["1f647-1f3fb", [":person_bowing_tone1:"], "🙇🏻"], ["1f647-1f3fc", [":person_bowing_tone2:"], "🙇🏼"], ["1f647-1f3fd", [":person_bowing_tone3:"], "🙇🏽"], ["1f647-1f3fe", [":person_bowing_tone4:"], "🙇🏾"], ["1f647-1f3ff", [":person_bowing_tone5:"], "🙇🏿"], ["1f933-1f3ff", [":selfie_tone5:"], "🤳🏿"], ["1f1f5-1f1f0", [":flag_pk:", ":pk:"], "🇵🇰"], ["1f485-1f3fb", [":nail_care_tone1:"], "💅🏻"], ["1f485-1f3fc", [":nail_care_tone2:"], "💅🏼"], ["1f485-1f3fd", [":nail_care_tone3:"], "💅🏽"], ["1f485-1f3fe", [":nail_care_tone4:"], "💅🏾"], ["1f1f2-1f1f0", [":flag_mk:", ":mk:"], "🇲🇰"], ["1f481-1f3fb", [":person_tipping_hand_tone1:"], "💁🏻"], ["1f481-1f3fc", [":person_tipping_hand_tone2:"], "💁🏼"], ["1f481-1f3fd", [":person_tipping_hand_tone3:"], "💁🏽"], ["1f481-1f3fe", [":person_tipping_hand_tone4:"], "💁🏾"], ["1f481-1f3ff", [":person_tipping_hand_tone5:"], "💁🏿"], ["1f485-1f3ff", [":nail_care_tone5:"], "💅🏿"], ["1f1f4-1f1f2", [":flag_om:", ":om:"], "🇴🇲"], ["1f1f3-1f1f4", [":flag_no:", ":no:"], "🇳🇴"], ["1f1f2-1f1f5", [":flag_mp:", ":mp:"], "🇲🇵"], ["1f1f0-1f1f5", [":flag_kp:", ":kp:"], "🇰🇵"], ["1f1f3-1f1eb", [":flag_nf:", ":nf:"], "🇳🇫"], ["1f1f3-1f1fa", [":flag_nu:", ":nu:"], "🇳🇺"], ["1f442-1f3fb", [":ear_tone1:"], "👂🏻"], ["1f442-1f3fc", [":ear_tone2:"], "👂🏼"], ["1f442-1f3fd", [":ear_tone3:"], "👂🏽"], ["1f442-1f3fe", [":ear_tone4:"], "👂🏾"], ["1f442-1f3ff", [":ear_tone5:"], "👂🏿"], ["1f1f2-1f1f4", [":flag_mo:", ":mo:"], "🇲🇴"], ["1f645-1f3fb", [":person_gesturing_no_tone1:"], "🙅🏻"], ["1f645-1f3fc", [":person_gesturing_no_tone2:"], "🙅🏼"], ["1f645-1f3fd", [":person_gesturing_no_tone3:"], "🙅🏽"], ["1f645-1f3fe", [":person_gesturing_no_tone4:"], "🙅🏾"], ["1f645-1f3ff", [":person_gesturing_no_tone5:"], "🙅🏿"], ["1f1f3-1f1ec", [":flag_ng:", ":nigeria:"], "🇳🇬"], ["1f443-1f3fb", [":nose_tone1:"], "👃🏻"], ["1f443-1f3fc", [":nose_tone2:"], "👃🏼"], ["1f443-1f3fd", [":nose_tone3:"], "👃🏽"], ["1f443-1f3fe", [":nose_tone4:"], "👃🏾"], ["1f443-1f3ff", [":nose_tone5:"], "👃🏿"], ["1f1f3-1f1ea", [":flag_ne:", ":ne:"], "🇳🇪"], ["1f1f3-1f1ee", [":flag_ni:", ":ni:"], "🇳🇮"], ["1f1f3-1f1ff", [":flag_nz:", ":nz:"], "🇳🇿"], ["1f1f3-1f1e8", [":flag_nc:", ":nc:"], "🇳🇨"], ["1f1f3-1f1f1", [":flag_nl:", ":nl:"], "🇳🇱"], ["1f1f3-1f1f5", [":flag_np:", ":np:"], "🇳🇵"], ["1f1f1-1f1fa", [":flag_lu:", ":lu:"], "🇱🇺"], ["1f646-1f3fb", [":person_gesturing_ok_tone1:"], "🙆🏻"], ["1f646-1f3fc", [":person_gesturing_ok_tone2:"], "🙆🏼"], ["1f646-1f3fd", [":person_gesturing_ok_tone3:"], "🙆🏽"], ["1f646-1f3fe", [":person_gesturing_ok_tone4:"], "🙆🏾"], ["1f646-1f3ff", [":person_gesturing_ok_tone5:"], "🙆🏿"], ["1f1f3-1f1f7", [":flag_nr:", ":nr:"], "🇳🇷"], ["1f476-1f3fb", [":baby_tone1:"], "👶🏻"], ["1f476-1f3fc", [":baby_tone2:"], "👶🏼"], ["1f476-1f3fd", [":baby_tone3:"], "👶🏽"], ["1f476-1f3fe", [":baby_tone4:"], "👶🏾"], ["1f476-1f3ff", [":baby_tone5:"], "👶🏿"], ["1f1f3-1f1e6", [":flag_na:", ":na:"], "🇳🇦"], ["1f466-1f3fb", [":boy_tone1:"], "👦🏻"], ["1f466-1f3fc", [":boy_tone2:"], "👦🏼"], ["1f466-1f3fd", [":boy_tone3:"], "👦🏽"], ["1f466-1f3fe", [":boy_tone4:"], "👦🏾"], ["1f466-1f3ff", [":boy_tone5:"], "👦🏿"], ["1f1f1-1f1f9", [":flag_lt:", ":lt:"], "🇱🇹"], ["1f64b-1f3fb", [":person_raising_hand_tone1:"], "🙋🏻"], ["1f64b-1f3fc", [":person_raising_hand_tone2:"], "🙋🏼"], ["1f64b-1f3fd", [":person_raising_hand_tone3:"], "🙋🏽"], ["1f64b-1f3fe", [":person_raising_hand_tone4:"], "🙋🏾"], ["1f64b-1f3ff", [":person_raising_hand_tone5:"], "🙋🏿"], ["1f1f2-1f1f2", [":flag_mm:", ":mm:"], "🇲🇲"], ["1f467-1f3fb", [":girl_tone1:"], "👧🏻"], ["1f467-1f3fc", [":girl_tone2:"], "👧🏼"], ["1f467-1f3fd", [":girl_tone3:"], "👧🏽"], ["1f467-1f3fe", [":girl_tone4:"], "👧🏾"], ["1f467-1f3ff", [":girl_tone5:"], "👧🏿"], ["1f1f2-1f1ff", [":flag_mz:", ":mz:"], "🇲🇿"], ["1f468-1f3fb", [":man_tone1:"], "👨🏻"], ["1f468-1f3fc", [":man_tone2:"], "👨🏼"], ["1f468-1f3fd", [":man_tone3:"], "👨🏽"], ["1f468-1f3fe", [":man_tone4:"], "👨🏾"], ["1f468-1f3ff", [":man_tone5:"], "👨🏿"], ["1f1f2-1f1e6", [":flag_ma:", ":ma:"], "🇲🇦"], ["1f469-1f3fb", [":woman_tone1:"], "👩🏻"], ["1f469-1f3fc", [":woman_tone2:"], "👩🏼"], ["1f469-1f3fd", [":woman_tone3:"], "👩🏽"], ["1f469-1f3fe", [":woman_tone4:"], "👩🏾"], ["1f469-1f3ff", [":woman_tone5:"], "👩🏿"], ["1f9dc-1f3ff", [":merperson_tone5:"], "🧜🏿"], ["1f9dc-1f3fe", [":merperson_tone4:"], "🧜🏾"], ["1f9dc-1f3fd", [":merperson_tone3:"], "🧜🏽"], ["1f9dc-1f3fc", [":merperson_tone2:"], "🧜🏼"], ["1f9dc-1f3fb", [":merperson_tone1:"], "🧜🏻"], ["1f9db-1f3ff", [":vampire_tone5:"], "🧛🏿"], ["1f1f1-1f1ee", [":flag_li:", ":li:"], "🇱🇮"], ["1f926-1f3fb", [":person_facepalming_tone1:"], "🤦🏻"], ["1f926-1f3fc", [":person_facepalming_tone2:"], "🤦🏼"], ["1f926-1f3fd", [":person_facepalming_tone3:"], "🤦🏽"], ["1f926-1f3fe", [":person_facepalming_tone4:"], "🤦🏾"], ["1f926-1f3ff", [":person_facepalming_tone5:"], "🤦🏿"], ["1f1f2-1f1f8", [":flag_ms:", ":ms:"], "🇲🇸"], ["1f471-1f3fb", [":blond_haired_person_tone1:"], "👱🏻"], ["1f471-1f3fc", [":blond_haired_person_tone2:"], "👱🏼"], ["1f471-1f3fd", [":blond_haired_person_tone3:"], "👱🏽"], ["1f471-1f3fe", [":blond_haired_person_tone4:"], "👱🏾"], ["1f471-1f3ff", [":blond_haired_person_tone5:"], "👱🏿"], ["1f9db-1f3fe", [":vampire_tone4:"], "🧛🏾"], ["1f9db-1f3fd", [":vampire_tone3:"], "🧛🏽"], ["1f9db-1f3fc", [":vampire_tone2:"], "🧛🏼"], ["1f9db-1f3fb", [":vampire_tone1:"], "🧛🏻"], ["1f9da-1f3ff", [":fairy_tone5:"], "🧚🏿"], ["1f9da-1f3fe", [":fairy_tone4:"], "🧚🏾"], ["1f1f1-1f1fe", [":flag_ly:", ":ly:"], "🇱🇾"], ["1f937-1f3fb", [":person_shrugging_tone1:"], "🤷🏻"], ["1f937-1f3fc", [":person_shrugging_tone2:"], "🤷🏼"], ["1f937-1f3fd", [":person_shrugging_tone3:"], "🤷🏽"], ["1f937-1f3fe", [":person_shrugging_tone4:"], "🤷🏾"], ["1f937-1f3ff", [":person_shrugging_tone5:"], "🤷🏿"], ["1f1f1-1f1f7", [":flag_lr:", ":lr:"], "🇱🇷"], ["1f64e-1f3fb", [":person_pouting_tone1:"], "🙎🏻"], ["1f64e-1f3fc", [":person_pouting_tone2:"], "🙎🏼"], ["1f64e-1f3fd", [":person_pouting_tone3:"], "🙎🏽"], ["1f64e-1f3fe", [":person_pouting_tone4:"], "🙎🏾"], ["1f64e-1f3ff", [":person_pouting_tone5:"], "🙎🏿"], ["1f1f2-1f1ea", [":flag_me:", ":me:"], "🇲🇪"], ["1f474-1f3fb", [":older_man_tone1:"], "👴🏻"], ["1f474-1f3fc", [":older_man_tone2:"], "👴🏼"], ["1f474-1f3fd", [":older_man_tone3:"], "👴🏽"], ["1f474-1f3fe", [":older_man_tone4:"], "👴🏾"], ["1f474-1f3ff", [":older_man_tone5:"], "👴🏿"], ["1f1f2-1f1f3", [":flag_mn:", ":mn:"], "🇲🇳"], ["1f475-1f3fb", [":older_woman_tone1:"], "👵🏻"], ["1f475-1f3fc", [":older_woman_tone2:"], "👵🏼"], ["1f475-1f3fd", [":older_woman_tone3:"], "👵🏽"], ["1f475-1f3fe", [":older_woman_tone4:"], "👵🏾"], ["1f475-1f3ff", [":older_woman_tone5:"], "👵🏿"], ["1f1f1-1f1f8", [":flag_ls:", ":ls:"], "🇱🇸"], ["1f64d-1f3fb", [":person_frowning_tone1:"], "🙍🏻"], ["1f64d-1f3fc", [":person_frowning_tone2:"], "🙍🏼"], ["1f64d-1f3fd", [":person_frowning_tone3:"], "🙍🏽"], ["1f64d-1f3fe", [":person_frowning_tone4:"], "🙍🏾"], ["1f64d-1f3ff", [":person_frowning_tone5:"], "🙍🏿"], ["1f1f2-1f1e8", [":flag_mc:", ":mc:"], "🇲🇨"], ["1f472-1f3fb", [":man_with_chinese_cap_tone1:"], "👲🏻"], ["1f472-1f3fc", [":man_with_chinese_cap_tone2:"], "👲🏼"], ["1f472-1f3fd", [":man_with_chinese_cap_tone3:"], "👲🏽"], ["1f472-1f3fe", [":man_with_chinese_cap_tone4:"], "👲🏾"], ["1f472-1f3ff", [":man_with_chinese_cap_tone5:"], "👲🏿"], ["1f9da-1f3fd", [":fairy_tone3:"], "🧚🏽"], ["1f9da-1f3fc", [":fairy_tone2:"], "🧚🏼"], ["1f9da-1f3fb", [":fairy_tone1:"], "🧚🏻"], ["1f9d9-1f3ff", [":mage_tone5:"], "🧙🏿"], ["1f9d9-1f3fe", [":mage_tone4:"], "🧙🏾"], ["1f9d9-1f3fd", [":mage_tone3:"], "🧙🏽"], ["1f1f1-1f1e7", [":flag_lb:", ":lb:"], "🇱🇧"], ["1f487-1f3fb", [":person_getting_haircut_tone1:"], "💇🏻"], ["1f487-1f3fc", [":person_getting_haircut_tone2:"], "💇🏼"], ["1f487-1f3fd", [":person_getting_haircut_tone3:"], "💇🏽"], ["1f487-1f3fe", [":person_getting_haircut_tone4:"], "💇🏾"], ["1f487-1f3ff", [":person_getting_haircut_tone5:"], "💇🏿"], ["1f1f2-1f1e9", [":flag_md:", ":md:"], "🇲🇩"], ["1f473-1f3fb", [":person_wearing_turban_tone1:"], "👳🏻"], ["1f473-1f3fc", [":person_wearing_turban_tone2:"], "👳🏼"], ["1f473-1f3fd", [":person_wearing_turban_tone3:"], "👳🏽"], ["1f473-1f3fe", [":person_wearing_turban_tone4:"], "👳🏾"], ["1f473-1f3ff", [":person_wearing_turban_tone5:"], "👳🏿"], ["1f9d9-1f3fc", [":mage_tone2:"], "🧙🏼"], ["1f9d9-1f3fb", [":mage_tone1:"], "🧙🏻"], ["1f9d5-1f3ff", [":woman_with_headscarf_tone5:"], "🧕🏿"], ["1f9d5-1f3fe", [":woman_with_headscarf_tone4:"], "🧕🏾"], ["1f9d5-1f3fd", [":woman_with_headscarf_tone3:"], "🧕🏽"], ["1f9d5-1f3fc", [":woman_with_headscarf_tone2:"], "🧕🏼"], ["1f1f1-1f1fb", [":flag_lv:", ":lv:"], "🇱🇻"], ["1f486-1f3fb", [":person_getting_massage_tone1:"], "💆🏻"], ["1f486-1f3fc", [":person_getting_massage_tone2:"], "💆🏼"], ["1f486-1f3fd", [":person_getting_massage_tone3:"], "💆🏽"], ["1f486-1f3fe", [":person_getting_massage_tone4:"], "💆🏾"], ["1f486-1f3ff", [":person_getting_massage_tone5:"], "💆🏿"], ["1f9d5-1f3fb", [":woman_with_headscarf_tone1:"], "🧕🏻"], ["1f9d4-1f3ff", [":bearded_person_tone5:"], "🧔🏿"], ["1f9d4-1f3fe", [":bearded_person_tone4:"], "🧔🏾"], ["1f9d4-1f3fd", [":bearded_person_tone3:"], "🧔🏽"], ["1f9d4-1f3fc", [":bearded_person_tone2:"], "🧔🏼"], ["1f9d4-1f3fb", [":bearded_person_tone1:"], "🧔🏻"], ["1f1eb-1f1f2", [":flag_fm:", ":fm:"], "🇫🇲"], ["1f46e-1f3fb", [":police_officer_tone1:"], "👮🏻"], ["1f46e-1f3fc", [":police_officer_tone2:"], "👮🏼"], ["1f46e-1f3fd", [":police_officer_tone3:"], "👮🏽"], ["1f46e-1f3fe", [":police_officer_tone4:"], "👮🏾"], ["1f46e-1f3ff", [":police_officer_tone5:"], "👮🏿"], ["1f1f1-1f1e6", [":flag_la:", ":la:"], "🇱🇦"], ["1f574-1f3fb", [":man_in_business_suit_levitating_tone1:"], "🕴🏻"], ["1f574-1f3fc", [":man_in_business_suit_levitating_tone2:"], "🕴🏼"], ["1f574-1f3fd", [":man_in_business_suit_levitating_tone3:"], "🕴🏽"], ["1f574-1f3fe", [":man_in_business_suit_levitating_tone4:"], "🕴🏾"], ["1f574-1f3ff", [":man_in_business_suit_levitating_tone5:"], "🕴🏿"], ["1f1f0-1f1ec", [":flag_kg:", ":kg:"], "🇰🇬"], ["1f483-1f3fb", [":dancer_tone1:"], "💃🏻"], ["1f483-1f3fc", [":dancer_tone2:"], "💃🏼"], ["1f483-1f3fd", [":dancer_tone3:"], "💃🏽"], ["1f483-1f3fe", [":dancer_tone4:"], "💃🏾"], ["1f483-1f3ff", [":dancer_tone5:"], "💃🏿"], ["1f1f0-1f1fc", [":flag_kw:", ":kw:"], "🇰🇼"], ["1f57a-1f3fb", [":man_dancing_tone1:"], "🕺🏻"], ["1f57a-1f3fc", [":man_dancing_tone2:"], "🕺🏼"], ["1f57a-1f3fd", [":man_dancing_tone3:"], "🕺🏽"], ["1f57a-1f3fe", [":man_dancing_tone4:"], "🕺🏾"], ["1f57a-1f3ff", [":man_dancing_tone5:"], "🕺🏿"], ["1f1fd-1f1f0", [":flag_xk:", ":xk:"], "🇽🇰"], ["1f9d3-1f3ff", [":older_adult_tone5:"], "🧓🏿"], ["1f9d3-1f3fe", [":older_adult_tone4:"], "🧓🏾"], ["1f9d3-1f3fd", [":older_adult_tone3:"], "🧓🏽"], ["1f9d3-1f3fc", [":older_adult_tone2:"], "🧓🏼"], ["1f9d3-1f3fb", [":older_adult_tone1:"], "🧓🏻"], ["1f9d2-1f3ff", [":child_tone5:"], "🧒🏿"], ["1f9d2-1f3fe", [":child_tone4:"], "🧒🏾"], ["1f9d2-1f3fd", [":child_tone3:"], "🧒🏽"], ["1f1f0-1f1ee", [":flag_ki:", ":ki:"], "🇰🇮"], ["1f6b6-1f3fb", [":person_walking_tone1:"], "🚶🏻"], ["1f6b6-1f3fc", [":person_walking_tone2:"], "🚶🏼"], ["1f6b6-1f3fd", [":person_walking_tone3:"], "🚶🏽"], ["1f6b6-1f3fe", [":person_walking_tone4:"], "🚶🏾"], ["1f6b6-1f3ff", [":person_walking_tone5:"], "🚶🏿"], ["1f9d2-1f3fc", [":child_tone2:"], "🧒🏼"], ["1f9d2-1f3fb", [":child_tone1:"], "🧒🏻"], ["1f9d1-1f3ff", [":adult_tone5:"], "🧑🏿"], ["1f9d1-1f3fe", [":adult_tone4:"], "🧑🏾"], ["1f1f2-1f1fd", [":flag_mx:", ":mx:"], "🇲🇽"], ["1f477-1f3fb", [":construction_worker_tone1:"], "👷🏻"], ["1f477-1f3fc", [":construction_worker_tone2:"], "👷🏼"], ["1f477-1f3fd", [":construction_worker_tone3:"], "👷🏽"], ["1f477-1f3fe", [":construction_worker_tone4:"], "👷🏾"], ["1f477-1f3ff", [":construction_worker_tone5:"], "👷🏿"], ["1f9d1-1f3fd", [":adult_tone3:"], "🧑🏽"], ["1f9d1-1f3fc", [":adult_tone2:"], "🧑🏼"], ["1f1f0-1f1ea", [":flag_ke:", ":ke:"], "🇰🇪"], ["1f3c3-1f3fb", [":person_running_tone1:"], "🏃🏻"], ["1f3c3-1f3fc", [":person_running_tone2:"], "🏃🏼"], ["1f3c3-1f3fd", [":person_running_tone3:"], "🏃🏽"], ["1f3c3-1f3fe", [":person_running_tone4:"], "🏃🏾"], ["1f3c3-1f3ff", [":person_running_tone5:"], "🏃🏿"], ["1f9d1-1f3fb", [":adult_tone1:"], "🧑🏻"], ["1f932-1f3ff", [":palms_up_together_tone5:"], "🤲🏿"], ["1f932-1f3fe", [":palms_up_together_tone4:"], "🤲🏾"], ["1f932-1f3fd", [":palms_up_together_tone3:"], "🤲🏽"], ["1f932-1f3fc", [":palms_up_together_tone2:"], "🤲🏼"], ["1f932-1f3fb", [":palms_up_together_tone1:"], "🤲🏻"], ["1f1f0-1f1ff", [":flag_kz:", ":kz:"], "🇰🇿"], ["1f1ef-1f1f4", [":flag_jo:", ":jo:"], "🇯🇴"], ["1f1ef-1f1ea", [":flag_je:", ":je:"], "🇯🇪"], ["1f1ef-1f1f5", [":flag_jp:", ":jp:"], "🇯🇵"], ["1f91f-1f3ff", [":love_you_gesture_tone5:"], "🤟🏿"], ["1f91f-1f3fe", [":love_you_gesture_tone4:"], "🤟🏾"], ["1f1ef-1f1f2", [":flag_jm:", ":jm:"], "🇯🇲"], ["1f91f-1f3fd", [":love_you_gesture_tone3:"], "🤟🏽"], ["1f91f-1f3fc", [":love_you_gesture_tone2:"], "🤟🏼"], ["1f1ee-1f1f9", [":flag_it:", ":it:"], "🇮🇹"], ["1f1fe-1f1f9", [":flag_yt:", ":yt:"], "🇾🇹"], ["1f482-1f3fb", [":guard_tone1:"], "💂🏻"], ["1f482-1f3fc", [":guard_tone2:"], "💂🏼"], ["1f482-1f3fd", [":guard_tone3:"], "💂🏽"], ["1f482-1f3fe", [":guard_tone4:"], "💂🏾"], ["1f482-1f3ff", [":guard_tone5:"], "💂🏿"], ["1f91f-1f3fb", [":love_you_gesture_tone1:"], "🤟🏻"], ["1f1ee-1f1ea", [":flag_ie:", ":ie:"], "🇮🇪"], ["1f9dd-1f3ff", [":elf_tone5:"], "🧝🏿"], ["1f9dd-1f3fe", [":elf_tone4:"], "🧝🏾"], ["1f9dd-1f3fd", [":elf_tone3:"], "🧝🏽"], ["1f9dd-1f3fc", [":elf_tone2:"], "🧝🏼"], ["1f9dd-1f3fb", [":elf_tone1:"], "🧝🏻"], ["1f1fa-1f1f3", [":united_nations:"], "🇺🇳"], ["1f1f2-1f1eb", [":flag_mf:", ":mf:"], "🇲🇫"], ["1f1e9-1f1ec", [":flag_dg:", ":dg:"], "🇩🇬"], ["1f1e8-1f1f5", [":flag_cp:", ":cp:"], "🇨🇵"], ["1f1ea-1f1e6", [":flag_ea:", ":ea:"], "🇪🇦"], ["1f1f2-1f1fa", [":flag_mu:", ":mu:"], "🇲🇺"], ["1f575-1f3fb", [":detective_tone1:"], "🕵🏻"], ["1f575-1f3fc", [":detective_tone2:"], "🕵🏼"], ["1f575-1f3fd", [":detective_tone3:"], "🕵🏽"], ["1f575-1f3fe", [":detective_tone4:"], "🕵🏾"], ["1f575-1f3ff", [":detective_tone5:"], "🕵🏿"], ["1f1ee-1f1f1", [":flag_il:", ":il:"], "🇮🇱"], ["1f1ee-1f1f2", [":flag_im:", ":im:"], "🇮🇲"], ["1f1ee-1f1f6", [":flag_iq:", ":iq:"], "🇮🇶"], ["1f1ee-1f1f7", [":flag_ir:", ":ir:"], "🇮🇷"], ["1f1ee-1f1e9", [":flag_id:", ":indonesia:"], "🇮🇩"], ["1f1ee-1f1f3", [":flag_in:", ":in:"], "🇮🇳"], ["1f1ee-1f1f8", [":flag_is:", ":is:"], "🇮🇸"], ["1f1ed-1f1fa", [":flag_hu:", ":hu:"], "🇭🇺"], ["1f1ed-1f1f0", [":flag_hk:", ":hk:"], "🇭🇰"], ["1f1ed-1f1f3", [":flag_hn:", ":hn:"], "🇭🇳"], ["1f1ed-1f1f9", [":flag_ht:", ":ht:"], "🇭🇹"], ["1f1ec-1f1fe", [":flag_gy:", ":gy:"], "🇬🇾"], ["1f1ec-1f1fc", [":flag_gw:", ":gw:"], "🇬🇼"], ["1f1ec-1f1f3", [":flag_gn:", ":gn:"], "🇬🇳"], ["1f1ec-1f1ec", [":flag_gg:", ":gg:"], "🇬🇬"], ["1f1ec-1f1f9", [":flag_gt:", ":gt:"], "🇬🇹"], ["1f1ec-1f1fa", [":flag_gu:", ":gu:"], "🇬🇺"], ["1f1ec-1f1f5", [":flag_gp:", ":gp:"], "🇬🇵"], ["1f1ec-1f1e9", [":flag_gd:", ":gd:"], "🇬🇩"], ["1f1ec-1f1f1", [":flag_gl:", ":gl:"], "🇬🇱"], ["1f1ec-1f1f7", [":flag_gr:", ":gr:"], "🇬🇷"], ["1f1ec-1f1ee", [":flag_gi:", ":gi:"], "🇬🇮"], ["1f1ec-1f1ed", [":flag_gh:", ":gh:"], "🇬🇭"], ["1f1e9-1f1ea", [":flag_de:", ":de:"], "🇩🇪"], ["1f1ec-1f1ea", [":flag_ge:", ":ge:"], "🇬🇪"], ["1f1ec-1f1f2", [":flag_gm:", ":gm:"], "🇬🇲"], ["1f1ec-1f1e6", [":flag_ga:", ":ga:"], "🇬🇦"], ["1f1f9-1f1eb", [":flag_tf:", ":tf:"], "🇹🇫"], ["1f1f5-1f1eb", [":flag_pf:", ":pf:"], "🇵🇫"], ["1f1ec-1f1eb", [":flag_gf:", ":gf:"], "🇬🇫"], ["1f1eb-1f1f7", [":flag_fr:", ":fr:"], "🇫🇷"], ["1f1eb-1f1ee", [":flag_fi:", ":fi:"], "🇫🇮"], ["1f1eb-1f1ef", [":flag_fj:", ":fj:"], "🇫🇯"], ["1f1eb-1f1f4", [":flag_fo:", ":fo:"], "🇫🇴"], ["1f1eb-1f1f0", [":flag_fk:", ":fk:"], "🇫🇰"], ["1f1ea-1f1fa", [":flag_eu:", ":eu:"], "🇪🇺"], ["1f1ea-1f1f9", [":flag_et:", ":et:"], "🇪🇹"], ["1f1ea-1f1ea", [":flag_ee:", ":ee:"], "🇪🇪"], ["1f1ea-1f1f7", [":flag_er:", ":er:"], "🇪🇷"], ["1f1ec-1f1f6", [":flag_gq:", ":gq:"], "🇬🇶"], ["1f1f8-1f1fb", [":flag_sv:", ":sv:"], "🇸🇻"], ["1f1ea-1f1ec", [":flag_eg:", ":eg:"], "🇪🇬"], ["1f1ea-1f1e8", [":flag_ec:", ":ec:"], "🇪🇨"], ["1f1e9-1f1f4", [":flag_do:", ":do:"], "🇩🇴"], ["1f1e9-1f1f2", [":flag_dm:", ":dm:"], "🇩🇲"], ["1f1e9-1f1ef", [":flag_dj:", ":dj:"], "🇩🇯"], ["1f1e9-1f1f0", [":flag_dk:", ":dk:"], "🇩🇰"], ["1f1e8-1f1ff", [":flag_cz:", ":cz:"], "🇨🇿"], ["1f1e8-1f1fe", [":flag_cy:", ":cy:"], "🇨🇾"], ["1f1e8-1f1fc", [":flag_cw:", ":cw:"], "🇨🇼"], ["1f1e8-1f1fa", [":flag_cu:", ":cu:"], "🇨🇺"], ["1f1ed-1f1f7", [":flag_hr:", ":hr:"], "🇭🇷"], ["1f1e8-1f1ee", [":flag_ci:", ":ci:"], "🇨🇮"], ["1f1e8-1f1f7", [":flag_cr:", ":cr:"], "🇨🇷"], ["1f1e8-1f1f0", [":flag_ck:", ":ck:"], "🇨🇰"], ["1f1e8-1f1e9", [":flag_cd:", ":congo:"], "🇨🇩"], ["1f1e8-1f1ec", [":flag_cg:", ":cg:"], "🇨🇬"], ["1f1f0-1f1f2", [":flag_km:", ":km:"], "🇰🇲"], ["1f1e8-1f1f4", [":flag_co:", ":co:"], "🇨🇴"], ["1f1e8-1f1e8", [":flag_cc:", ":cc:"], "🇨🇨"], ["1f1e8-1f1fd", [":flag_cx:", ":cx:"], "🇨🇽"], ["1f1e8-1f1f3", [":flag_cn:", ":cn:"], "🇨🇳"], ["1f1e8-1f1f1", [":flag_cl:", ":chile:"], "🇨🇱"], ["1f1f9-1f1e9", [":flag_td:", ":td:"], "🇹🇩"], ["1f1e8-1f1eb", [":flag_cf:", ":cf:"], "🇨🇫"], ["1f1f0-1f1fe", [":flag_ky:", ":ky:"], "🇰🇾"], ["1f1e7-1f1f6", [":flag_bq:", ":bq:"], "🇧🇶"], ["1f1e8-1f1fb", [":flag_cv:", ":cv:"], "🇨🇻"], ["1f1ee-1f1e8", [":flag_ic:", ":ic:"], "🇮🇨"], ["1f1e8-1f1e6", [":flag_ca:", ":ca:"], "🇨🇦"], ["1f1e8-1f1f2", [":flag_cm:", ":cm:"], "🇨🇲"], ["1f1f0-1f1ed", [":flag_kh:", ":kh:"], "🇰🇭"], ["1f1e7-1f1ee", [":flag_bi:", ":bi:"], "🇧🇮"], ["1f1e7-1f1eb", [":flag_bf:", ":bf:"], "🇧🇫"], ["1f1e7-1f1ec", [":flag_bg:", ":bg:"], "🇧🇬"], ["1f1e7-1f1f3", [":flag_bn:", ":bn:"], "🇧🇳"], ["1f1fb-1f1ec", [":flag_vg:", ":vg:"], "🇻🇬"], ["1f1ee-1f1f4", [":flag_io:", ":io:"], "🇮🇴"], ["1f1e7-1f1f7", [":flag_br:", ":br:"], "🇧🇷"], ["1f1e7-1f1fc", [":flag_bw:", ":bw:"], "🇧🇼"], ["1f1e7-1f1e6", [":flag_ba:", ":ba:"], "🇧🇦"], ["1f1e7-1f1f4", [":flag_bo:", ":bo:"], "🇧🇴"], ["1f1e7-1f1f9", [":flag_bt:", ":bt:"], "🇧🇹"], ["1f1e7-1f1f2", [":flag_bm:", ":bm:"], "🇧🇲"], ["1f1e7-1f1ef", [":flag_bj:", ":bj:"], "🇧🇯"], ["1f1e7-1f1ff", [":flag_bz:", ":bz:"], "🇧🇿"], ["1f1e7-1f1ea", [":flag_be:", ":be:"], "🇧🇪"], ["1f1e7-1f1fe", [":flag_by:", ":by:"], "🇧🇾"], ["1f1e7-1f1e7", [":flag_bb:", ":bb:"], "🇧🇧"], ["1f1e7-1f1e9", [":flag_bd:", ":bd:"], "🇧🇩"], ["1f1e7-1f1ed", [":flag_bh:", ":bh:"], "🇧🇭"], ["1f1e7-1f1f8", [":flag_bs:", ":bs:"], "🇧🇸"], ["1f1e6-1f1ff", [":flag_az:", ":az:"], "🇦🇿"], ["1f1e6-1f1f9", [":flag_at:", ":at:"], "🇦🇹"], ["1f1e6-1f1fa", [":flag_au:", ":au:"], "🇦🇺"], ["1f1e6-1f1fc", [":flag_aw:", ":aw:"], "🇦🇼"], ["1f1e6-1f1f2", [":flag_am:", ":am:"], "🇦🇲"], ["1f1e6-1f1f7", [":flag_ar:", ":ar:"], "🇦🇷"], ["1f1e6-1f1ec", [":flag_ag:", ":ag:"], "🇦🇬"], ["1f1e6-1f1f6", [":flag_aq:", ":aq:"], "🇦🇶"], ["1f1e6-1f1ee", [":flag_ai:", ":ai:"], "🇦🇮"], ["1f1e6-1f1f4", [":flag_ao:", ":ao:"], "🇦🇴"], ["1f1e6-1f1e9", [":flag_ad:", ":ad:"], "🇦🇩"], ["1f1e6-1f1f8", [":flag_as:", ":as:"], "🇦🇸"], ["1f1e9-1f1ff", [":flag_dz:", ":dz:"], "🇩🇿"], ["1f1e6-1f1f1", [":flag_al:", ":al:"], "🇦🇱"], ["1f1e6-1f1fd", [":flag_ax:", ":ax:"], "🇦🇽"], ["1f1e6-1f1eb", [":flag_af:", ":af:"], "🇦🇫"], ["1f1fa-1f1f2", [":flag_um:", ":um:"], "🇺🇲"], ["1f1f8-1f1ef", [":flag_sj:", ":sj:"], "🇸🇯"], ["1f1ed-1f1f2", [":flag_hm:", ":hm:"], "🇭🇲"], ["1f1e7-1f1fb", [":flag_bv:", ":bv:"], "🇧🇻"], ["1f1f9-1f1e6", [":flag_ta:", ":ta:"], "🇹🇦"], ["1f1e6-1f1e8", [":flag_ac:", ":ac:"], "🇦🇨"], ["1f1ff-1f1fc", [":flag_zw:", ":zw:"], "🇿🇼"], ["1f1ff-1f1f2", [":flag_zm:", ":zm:"], "🇿🇲"], ["1f1fe-1f1ea", [":flag_ye:", ":ye:"], "🇾🇪"], ["1f1ea-1f1ed", [":flag_eh:", ":eh:"], "🇪🇭"], ["1f1fc-1f1eb", [":flag_wf:", ":wf:"], "🇼🇫"], ["1f1fb-1f1f3", [":flag_vn:", ":vn:"], "🇻🇳"], ["1f1fb-1f1ea", [":flag_ve:", ":ve:"], "🇻🇪"], ["1f1fb-1f1e6", [":flag_va:", ":va:"], "🇻🇦"], ["1f6cc-1f3ff", [":person_in_bed_tone5:"], "🛌🏿"], ["1f6cc-1f3fe", [":person_in_bed_tone4:"], "🛌🏾"], ["1f6cc-1f3fd", [":person_in_bed_tone3:"], "🛌🏽"], ["1f6cc-1f3fc", [":person_in_bed_tone2:"], "🛌🏼"], ["1f6cc-1f3fb", [":person_in_bed_tone1:"], "🛌🏻"], ["1f6c0-1f3ff", [":bath_tone5:"], "🛀🏿"], ["1f6c0-1f3fe", [":bath_tone4:"], "🛀🏾"], ["1f6c0-1f3fd", [":bath_tone3:"], "🛀🏽"], ["1f6c0-1f3fc", [":bath_tone2:"], "🛀🏼"], ["1f6c0-1f3fb", [":bath_tone1:"], "🛀🏻"], ["1f1fb-1f1fa", [":flag_vu:", ":vu:"], "🇻🇺"], ["1f1fa-1f1ff", [":flag_uz:", ":uz:"], "🇺🇿"], ["1f1fa-1f1fe", [":flag_uy:", ":uy:"], "🇺🇾"], ["1f1fa-1f1f8", [":flag_us:", ":us:"], "🇺🇸"], ["1f1ec-1f1e7", [":flag_gb:", ":gb:"], "🇬🇧"], ["1f1e6-1f1ea", [":flag_ae:", ":ae:"], "🇦🇪"], ["1f1fa-1f1e6", [":flag_ua:", ":ua:"], "🇺🇦"], ["1f1fa-1f1ec", [":flag_ug:", ":ug:"], "🇺🇬"], ["1f1fb-1f1ee", [":flag_vi:", ":vi:"], "🇻🇮"], ["1f1f9-1f1fb", [":flag_tv:", ":tuvalu:"], "🇹🇻"], ["1f1f9-1f1e8", [":flag_tc:", ":tc:"], "🇹🇨"], ["1f1f9-1f1f2", [":flag_tm:", ":turkmenistan:"], "🇹🇲"], ["1f1f9-1f1f7", [":flag_tr:", ":tr:"], "🇹🇷"], ["1f1f9-1f1f3", [":flag_tn:", ":tn:"], "🇹🇳"], ["1f1f9-1f1f9", [":flag_tt:", ":tt:"], "🇹🇹"], ["1f1f9-1f1f4", [":flag_to:", ":to:"], "🇹🇴"], ["1f1f9-1f1f0", [":flag_tk:", ":tk:"], "🇹🇰"], ["1f450-1f3fb", [":open_hands_tone1:"], "👐🏻"], ["1f450-1f3fc", [":open_hands_tone2:"], "👐🏼"], ["1f450-1f3fd", [":open_hands_tone3:"], "👐🏽"], ["1f450-1f3fe", [":open_hands_tone4:"], "👐🏾"], ["1f450-1f3ff", [":open_hands_tone5:"], "👐🏿"], ["1f1f9-1f1ec", [":flag_tg:", ":tg:"], "🇹🇬"], ["1f64c-1f3fb", [":raised_hands_tone1:"], "🙌🏻"], ["1f64c-1f3fc", [":raised_hands_tone2:"], "🙌🏼"], ["1f64c-1f3fd", [":raised_hands_tone3:"], "🙌🏽"], ["1f64c-1f3fe", [":raised_hands_tone4:"], "🙌🏾"], ["1f64c-1f3ff", [":raised_hands_tone5:"], "🙌🏿"], ["1f1f9-1f1f1", [":flag_tl:", ":tl:"], "🇹🇱"], ["1f44f-1f3fb", [":clap_tone1:"], "👏🏻"], ["1f44f-1f3fc", [":clap_tone2:"], "👏🏼"], ["1f44f-1f3fd", [":clap_tone3:"], "👏🏽"], ["1f44f-1f3fe", [":clap_tone4:"], "👏🏾"], ["1f44f-1f3ff", [":clap_tone5:"], "👏🏿"], ["1f1f9-1f1ed", [":flag_th:", ":th:"], "🇹🇭"], ["1f64f-1f3fb", [":pray_tone1:"], "🙏🏻"], ["1f9d8-1f3ff", [":person_in_lotus_position_tone5:"], "🧘🏿"], ["1f9d8-1f3fe", [":person_in_lotus_position_tone4:"], "🧘🏾"], ["1f9d8-1f3fd", [":person_in_lotus_position_tone3:"], "🧘🏽"], ["1f9d8-1f3fc", [":person_in_lotus_position_tone2:"], "🧘🏼"], ["1f9d8-1f3fb", [":person_in_lotus_position_tone1:"], "🧘🏻"], ["1f9d7-1f3ff", [":person_climbing_tone5:"], "🧗🏿"], ["1f9d7-1f3fe", [":person_climbing_tone4:"], "🧗🏾"], ["1f9d7-1f3fd", [":person_climbing_tone3:"], "🧗🏽"], ["1f9d7-1f3fc", [":person_climbing_tone2:"], "🧗🏼"], ["1f9d7-1f3fb", [":person_climbing_tone1:"], "🧗🏻"], ["1f9d6-1f3ff", [":person_in_steamy_room_tone5:"], "🧖🏿"], ["1f9d6-1f3fe", [":person_in_steamy_room_tone4:"], "🧖🏾"], ["1f9d6-1f3fd", [":person_in_steamy_room_tone3:"], "🧖🏽"], ["1f9d6-1f3fc", [":person_in_steamy_room_tone2:"], "🧖🏼"], ["1f9d6-1f3fb", [":person_in_steamy_room_tone1:"], "🧖🏻"], ["1f931-1f3ff", [":breast_feeding_tone5:"], "🤱🏿"], ["1f931-1f3fe", [":breast_feeding_tone4:"], "🤱🏾"], ["1f931-1f3fd", [":breast_feeding_tone3:"], "🤱🏽"], ["1f931-1f3fc", [":breast_feeding_tone2:"], "🤱🏼"], ["1f931-1f3fb", [":breast_feeding_tone1:"], "🤱🏻"], ["1f939-1f3ff", [":person_juggling_tone5:"], "🤹🏿"], ["1f939-1f3fe", [":person_juggling_tone4:"], "🤹🏾"], ["1f939-1f3fd", [":person_juggling_tone3:"], "🤹🏽"], ["1f939-1f3fc", [":person_juggling_tone2:"], "🤹🏼"], ["1f939-1f3fb", [":person_juggling_tone1:"], "🤹🏻"], ["1f64f-1f3fc", [":pray_tone2:"], "🙏🏼"], ["1f64f-1f3fd", [":pray_tone3:"], "🙏🏽"], ["1f64f-1f3fe", [":pray_tone4:"], "🙏🏾"], ["1f64f-1f3ff", [":pray_tone5:"], "🙏🏿"], ["1f1f9-1f1ff", [":flag_tz:", ":tz:"], "🇹🇿"], ["1f1f9-1f1ef", [":flag_tj:", ":tj:"], "🇹🇯"], ["1f44d-1f3fb", [":thumbsup_tone1:"], "👍🏻"], ["1f44d-1f3fc", [":thumbsup_tone2:"], "👍🏼"], ["1f44d-1f3fd", [":thumbsup_tone3:"], "👍🏽"], ["1f44d-1f3fe", [":thumbsup_tone4:"], "👍🏾"], ["1f44d-1f3ff", [":thumbsup_tone5:"], "👍🏿"], ["1f1f9-1f1fc", [":flag_tw:", ":tw:"], "🇹🇼"], ["1f44e-1f3fb", [":thumbsdown_tone1:"], "👎🏻"], ["1f44e-1f3fc", [":thumbsdown_tone2:"], "👎🏼"], ["1f44e-1f3fd", [":thumbsdown_tone3:"], "👎🏽"], ["1f44e-1f3fe", [":thumbsdown_tone4:"], "👎🏾"], ["1f44e-1f3ff", [":thumbsdown_tone5:"], "👎🏿"], ["1f1f8-1f1fe", [":flag_sy:", ":sy:"], "🇸🇾"], ["1f6b5-1f3ff", [":person_mountain_biking_tone5:"], "🚵🏿"], ["1f6b5-1f3fe", [":person_mountain_biking_tone4:"], "🚵🏾"], ["1f6b5-1f3fd", [":person_mountain_biking_tone3:"], "🚵🏽"], ["1f6b5-1f3fc", [":person_mountain_biking_tone2:"], "🚵🏼"], ["1f6b5-1f3fb", [":person_mountain_biking_tone1:"], "🚵🏻"], ["1f44a-1f3fb", [":punch_tone1:"], "👊🏻"], ["1f44a-1f3fc", [":punch_tone2:"], "👊🏼"], ["1f44a-1f3fd", [":punch_tone3:"], "👊🏽"], ["1f44a-1f3fe", [":punch_tone4:"], "👊🏾"], ["1f44a-1f3ff", [":punch_tone5:"], "👊🏿"], ["1f1e8-1f1ed", [":flag_ch:", ":ch:"], "🇨🇭"], ["1f1f8-1f1ea", [":flag_se:", ":se:"], "🇸🇪"], ["1f1f8-1f1ff", [":flag_sz:", ":sz:"], "🇸🇿"], ["1f1f8-1f1f7", [":flag_sr:", ":sr:"], "🇸🇷"], ["1f1f8-1f1e9", [":flag_sd:", ":sd:"], "🇸🇩"], ["1f1fb-1f1e8", [":flag_vc:", ":vc:"], "🇻🇨"], ["1f1f5-1f1f2", [":flag_pm:", ":pm:"], "🇵🇲"], ["1f6b4-1f3ff", [":person_biking_tone5:"], "🚴🏿"], ["1f6b4-1f3fe", [":person_biking_tone4:"], "🚴🏾"], ["1f6b4-1f3fd", [":person_biking_tone3:"], "🚴🏽"], ["1f6b4-1f3fc", [":person_biking_tone2:"], "🚴🏼"], ["1f6b4-1f3fb", [":person_biking_tone1:"], "🚴🏻"], ["1f91b-1f3fb", [":left_facing_fist_tone1:"], "🤛🏻"], ["1f91b-1f3fc", [":left_facing_fist_tone2:"], "🤛🏼"], ["1f91b-1f3fd", [":left_facing_fist_tone3:"], "🤛🏽"], ["1f91b-1f3fe", [":left_facing_fist_tone4:"], "🤛🏾"], ["1f91b-1f3ff", [":left_facing_fist_tone5:"], "🤛🏿"], ["1f1f1-1f1e8", [":flag_lc:", ":lc:"], "🇱🇨"], ["1f3c7-1f3ff", [":horse_racing_tone5:"], "🏇🏿"], ["1f3c7-1f3fe", [":horse_racing_tone4:"], "🏇🏾"], ["1f3c7-1f3fd", [":horse_racing_tone3:"], "🏇🏽"], ["1f3c7-1f3fc", [":horse_racing_tone2:"], "🏇🏼"], ["1f3c7-1f3fb", [":horse_racing_tone1:"], "🏇🏻"], ["1f91c-1f3fb", [":right_facing_fist_tone1:"], "🤜🏻"], ["1f91c-1f3fc", [":right_facing_fist_tone2:"], "🤜🏼"], ["1f91c-1f3fd", [":right_facing_fist_tone3:"], "🤜🏽"], ["1f91c-1f3fe", [":right_facing_fist_tone4:"], "🤜🏾"], ["1f91c-1f3ff", [":right_facing_fist_tone5:"], "🤜🏿"], ["1f1f0-1f1f3", [":flag_kn:", ":kn:"], "🇰🇳"], ["1f6a3-1f3ff", [":person_rowing_boat_tone5:"], "🚣🏿"], ["1f6a3-1f3fe", [":person_rowing_boat_tone4:"], "🚣🏾"], ["1f6a3-1f3fd", [":person_rowing_boat_tone3:"], "🚣🏽"], ["1f6a3-1f3fc", [":person_rowing_boat_tone2:"], "🚣🏼"], ["1f6a3-1f3fb", [":person_rowing_boat_tone1:"], "🚣🏻"], ["1f91e-1f3fb", [":fingers_crossed_tone1:"], "🤞🏻"], ["1f91e-1f3fc", [":fingers_crossed_tone2:"], "🤞🏼"], ["1f91e-1f3fd", [":fingers_crossed_tone3:"], "🤞🏽"], ["1f91e-1f3fe", [":fingers_crossed_tone4:"], "🤞🏾"], ["1f91e-1f3ff", [":fingers_crossed_tone5:"], "🤞🏿"], ["1f1f8-1f1ed", [":flag_sh:", ":sh:"], "🇸🇭"], ["1f93d-1f3ff", [":person_playing_water_polo_tone5:"], "🤽🏿"], ["1f93d-1f3fe", [":person_playing_water_polo_tone4:"], "🤽🏾"], ["1f93d-1f3fd", [":person_playing_water_polo_tone3:"], "🤽🏽"], ["1f93d-1f3fc", [":person_playing_water_polo_tone2:"], "🤽🏼"], ["1f93d-1f3fb", [":person_playing_water_polo_tone1:"], "🤽🏻"], ["1f1e7-1f1f1", [":flag_bl:", ":bl:"], "🇧🇱"], ["1f1f1-1f1f0", [":flag_lk:", ":lk:"], "🇱🇰"], ["1f1ea-1f1f8", [":flag_es:", ":es:"], "🇪🇸"], ["1f1f8-1f1f8", [":flag_ss:", ":ss:"], "🇸🇸"], ["1f1f0-1f1f7", [":flag_kr:", ":kr:"], "🇰🇷"], ["1f1ff-1f1e6", [":flag_za:", ":za:"], "🇿🇦"], ["1f918-1f3fb", [":metal_tone1:"], "🤘🏻"], ["1f918-1f3fc", [":metal_tone2:"], "🤘🏼"], ["1f918-1f3fd", [":metal_tone3:"], "🤘🏽"], ["1f918-1f3fe", [":metal_tone4:"], "🤘🏾"], ["1f918-1f3ff", [":metal_tone5:"], "🤘🏿"], ["1f1f8-1f1f4", [":flag_so:", ":so:"], "🇸🇴"], ["1f44c-1f3fb", [":ok_hand_tone1:"], "👌🏻"], ["1f44c-1f3fc", [":ok_hand_tone2:"], "👌🏼"], ["1f44c-1f3fd", [":ok_hand_tone3:"], "👌🏽"], ["1f44c-1f3fe", [":ok_hand_tone4:"], "👌🏾"], ["1f44c-1f3ff", [":ok_hand_tone5:"], "👌🏿"], ["1f1f8-1f1e7", [":flag_sb:", ":sb:"], "🇸🇧"], ["1f3ca-1f3ff", [":person_swimming_tone5:"], "🏊🏿"], ["1f3ca-1f3fe", [":person_swimming_tone4:"], "🏊🏾"], ["1f3ca-1f3fd", [":person_swimming_tone3:"], "🏊🏽"], ["1f3ca-1f3fc", [":person_swimming_tone2:"], "🏊🏼"], ["1f3ca-1f3fb", [":person_swimming_tone1:"], "🏊🏻"], ["1f448-1f3fb", [":point_left_tone1:"], "👈🏻"], ["1f448-1f3fc", [":point_left_tone2:"], "👈🏼"], ["1f448-1f3fd", [":point_left_tone3:"], "👈🏽"], ["1f448-1f3fe", [":point_left_tone4:"], "👈🏾"], ["1f448-1f3ff", [":point_left_tone5:"], "👈🏿"], ["1f1ec-1f1f8", [":flag_gs:", ":gs:"], "🇬🇸"], ["1f449-1f3fb", [":point_right_tone1:"], "👉🏻"], ["1f449-1f3fc", [":point_right_tone2:"], "👉🏼"], ["1f449-1f3fd", [":point_right_tone3:"], "👉🏽"], ["1f449-1f3fe", [":point_right_tone4:"], "👉🏾"], ["1f449-1f3ff", [":point_right_tone5:"], "👉🏿"], ["1f1f8-1f1ee", [":flag_si:", ":si:"], "🇸🇮"], ["1f3c4-1f3ff", [":person_surfing_tone5:"], "🏄🏿"], ["1f3c4-1f3fe", [":person_surfing_tone4:"], "🏄🏾"], ["1f3c2-1f3fb", [":snowboarder_tone1:"], "🏂🏻"], ["1f3c2-1f3fc", [":snowboarder_tone2:"], "🏂🏼"], ["1f3c2-1f3fd", [":snowboarder_tone3:"], "🏂🏽"], ["1f3c2-1f3fe", [":snowboarder_tone4:"], "🏂🏾"], ["1f3c2-1f3ff", [":snowboarder_tone5:"], "🏂🏿"], ["1f446-1f3fb", [":point_up_2_tone1:"], "👆🏻"], ["1f446-1f3fc", [":point_up_2_tone2:"], "👆🏼"], ["1f446-1f3fd", [":point_up_2_tone3:"], "👆🏽"], ["1f446-1f3fe", [":point_up_2_tone4:"], "👆🏾"], ["1f446-1f3ff", [":point_up_2_tone5:"], "👆🏿"], ["1f1f8-1f1f0", [":flag_sk:", ":sk:"], "🇸🇰"], ["1f3c4-1f3fd", [":person_surfing_tone3:"], "🏄🏽"], ["1f3cb-1f3fb", [":person_lifting_weights_tone1:"], "🏋🏻"], ["1f3cb-1f3fc", [":person_lifting_weights_tone2:"], "🏋🏼"], ["1f3cb-1f3fd", [":person_lifting_weights_tone3:"], "🏋🏽"], ["1f3cb-1f3fe", [":person_lifting_weights_tone4:"], "🏋🏾"], ["1f3cb-1f3ff", [":person_lifting_weights_tone5:"], "🏋🏿"], ["1f447-1f3fb", [":point_down_tone1:"], "👇🏻"], ["1f447-1f3fc", [":point_down_tone2:"], "👇🏼"], ["1f447-1f3fd", [":point_down_tone3:"], "👇🏽"], ["1f447-1f3fe", [":point_down_tone4:"], "👇🏾"], ["1f447-1f3ff", [":point_down_tone5:"], "👇🏿"], ["1f1f8-1f1fd", [":flag_sx:", ":sx:"], "🇸🇽"], ["1f3c4-1f3fc", [":person_surfing_tone2:"], "🏄🏼"], ["1f1f8-1f1ec", [":flag_sg:", ":sg:"], "🇸🇬"], ["1f1f8-1f1f1", [":flag_sl:", ":sl:"], "🇸🇱"], ["1f3c4-1f3fb", [":person_surfing_tone1:"], "🏄🏻"], ["1f1f8-1f1e8", [":flag_sc:", ":sc:"], "🇸🇨"], ["1f1f7-1f1f8", [":flag_rs:", ":rs:"], "🇷🇸"], ["1f1f8-1f1f3", [":flag_sn:", ":sn:"], "🇸🇳"], ["1f1f8-1f1e6", [":flag_sa:", ":saudiarabia:", ":saudi:"], "🇸🇦"], ["1f1f8-1f1f9", [":flag_st:", ":st:"], "🇸🇹"], ["1f1f8-1f1f2", [":flag_sm:", ":sm:"], "🇸🇲"], ["1f1fc-1f1f8", [":flag_ws:", ":ws:"], "🇼🇸"], ["1f1f7-1f1fc", [":flag_rw:", ":rw:"], "🇷🇼"], ["1f1f7-1f1fa", [":flag_ru:", ":ru:"], "🇷🇺"], ["1f1f7-1f1f4", [":flag_ro:", ":ro:"], "🇷🇴"], ["1f91a-1f3fb", [":raised_back_of_hand_tone1:"], "🤚🏻"], ["1f91a-1f3fc", [":raised_back_of_hand_tone2:"], "🤚🏼"], ["1f91a-1f3fd", [":raised_back_of_hand_tone3:"], "🤚🏽"], ["1f938-1f3fb", [":person_doing_cartwheel_tone1:"], "🤸🏻"], ["1f938-1f3fc", [":person_doing_cartwheel_tone2:"], "🤸🏼"], ["1f938-1f3fd", [":person_doing_cartwheel_tone3:"], "🤸🏽"], ["1f938-1f3fe", [":person_doing_cartwheel_tone4:"], "🤸🏾"], ["1f938-1f3ff", [":person_doing_cartwheel_tone5:"], "🤸🏿"], ["1f91a-1f3fe", [":raised_back_of_hand_tone4:"], "🤚🏾"], ["1f91a-1f3ff", [":raised_back_of_hand_tone5:"], "🤚🏿"], ["1f1f7-1f1ea", [":flag_re:", ":re:"], "🇷🇪"], ["1f590-1f3fb", [":hand_splayed_tone1:"], "🖐🏻"], ["1f590-1f3fc", [":hand_splayed_tone2:"], "🖐🏼"], ["1f590-1f3fd", [":hand_splayed_tone3:"], "🖐🏽"], ["1f590-1f3fe", [":hand_splayed_tone4:"], "🖐🏾"], ["1f590-1f3ff", [":hand_splayed_tone5:"], "🖐🏿"], ["1f1f6-1f1e6", [":flag_qa:", ":qa:"], "🇶🇦"], ["1f596-1f3fb", [":vulcan_tone1:"], "🖖🏻"], ["1f596-1f3fc", [":vulcan_tone2:"], "🖖🏼"], ["1f596-1f3fd", [":vulcan_tone3:"], "🖖🏽"], ["1f596-1f3fe", [":vulcan_tone4:"], "🖖🏾"], ["1f596-1f3ff", [":vulcan_tone5:"], "🖖🏿"], ["1f1f5-1f1f7", [":flag_pr:", ":pr:"], "🇵🇷"], ["1f44b-1f3fb", [":wave_tone1:"], "👋🏻"], ["1f44b-1f3fc", [":wave_tone2:"], "👋🏼"], ["1f44b-1f3fd", [":wave_tone3:"], "👋🏽"], ["1f44b-1f3fe", [":wave_tone4:"], "👋🏾"], ["1f44b-1f3ff", [":wave_tone5:"], "👋🏿"], ["1f1f5-1f1f9", [":flag_pt:", ":pt:"], "🇵🇹"], ["1f919-1f3fb", [":call_me_tone1:"], "🤙🏻"], ["1f919-1f3fc", [":call_me_tone2:"], "🤙🏼"], ["1f919-1f3fd", [":call_me_tone3:"], "🤙🏽"], ["1f919-1f3fe", [":call_me_tone4:"], "🤙🏾"], ["1f919-1f3ff", [":call_me_tone5:"], "🤙🏿"], ["1f1f5-1f1f1", [":flag_pl:", ":pl:"], "🇵🇱"], ["1f4aa-1f3fb", [":muscle_tone1:"], "💪🏻"], ["1f4aa-1f3fc", [":muscle_tone2:"], "💪🏼"], ["1f4aa-1f3fd", [":muscle_tone3:"], "💪🏽"], ["1f4aa-1f3fe", [":muscle_tone4:"], "💪🏾"], ["1f93e-1f3fb", [":person_playing_handball_tone1:"], "🤾🏻"], ["1f93e-1f3fc", [":person_playing_handball_tone2:"], "🤾🏼"], ["1f93e-1f3fd", [":person_playing_handball_tone3:"], "🤾🏽"], ["1f93e-1f3fe", [":person_playing_handball_tone4:"], "🤾🏾"], ["1f93e-1f3ff", [":person_playing_handball_tone5:"], "🤾🏿"], ["1f4aa-1f3ff", [":muscle_tone5:"], "💪🏿"], ["1f1f5-1f1f3", [":flag_pn:", ":pn:"], "🇵🇳"], ["1f595-1f3fb", [":middle_finger_tone1:"], "🖕🏻"], ["1f595-1f3fc", [":middle_finger_tone2:"], "🖕🏼"], ["1f595-1f3fd", [":middle_finger_tone3:"], "🖕🏽"], ["1f595-1f3fe", [":middle_finger_tone4:"], "🖕🏾"], ["1f595-1f3ff", [":middle_finger_tone5:"], "🖕🏿"], ["1f3cc-1f3fb", [":person_golfing_tone1:"], "🏌🏻"], ["1f3cc-1f3fc", [":person_golfing_tone2:"], "🏌🏼"], ["1f3cc-1f3fd", [":person_golfing_tone3:"], "🏌🏽"], ["1f3cc-1f3fe", [":person_golfing_tone4:"], "🏌🏾"], ["1f3cc-1f3ff", [":person_golfing_tone5:"], "🏌🏿"], ["1f1f5-1f1ed", [":flag_ph:", ":ph:"], "🇵🇭"], ["1f1f5-1f1ea", [":flag_pe:", ":pe:"], "🇵🇪"], ["1f1f5-1f1fe", [":flag_py:", ":py:"], "🇵🇾"], ["1f5de-fe0f", [":newspaper2:", ":rolled_up_newspaper:"], "🗞️"], ["1f3cc-fe0f", [":person_golfing:", ":golfer:"], "🏌️"], ["26f9-1f3fe", [":person_bouncing_ball_tone4:"], "⛹🏾"], ["26f9-1f3fd", [":person_bouncing_ball_tone3:"], "⛹🏽"], ["26f9-1f3fc", [":person_bouncing_ball_tone2:"], "⛹🏼"], ["26f9-1f3fb", [":person_bouncing_ball_tone1:"], "⛹🏻"], ["1f3cb-fe0f", [":person_lifting_weights:", ":lifter:", ":weight_lifter:"], "🏋️"], ["1f37d-fe0f", [":fork_knife_plate:", ":fork_and_knife_with_plate:"], "🍽️"], ["270a-1f3fb", [":fist_tone1:"], "✊🏻"], ["270a-1f3fc", [":fist_tone2:"], "✊🏼"], ["270a-1f3fd", [":fist_tone3:"], "✊🏽"], ["270a-1f3fe", [":fist_tone4:"], "✊🏾"], ["270a-1f3ff", [":fist_tone5:"], "✊🏿"], ["270c-1f3fb", [":v_tone1:"], "✌🏻"], ["270c-1f3fc", [":v_tone2:"], "✌🏼"], ["270c-1f3fd", [":v_tone3:"], "✌🏽"], ["270c-1f3fe", [":v_tone4:"], "✌🏾"], ["270c-1f3ff", [":v_tone5:"], "✌🏿"], ["261d-1f3fb", [":point_up_tone1:"], "☝🏻"], ["261d-1f3fc", [":point_up_tone2:"], "☝🏼"], ["261d-1f3fd", [":point_up_tone3:"], "☝🏽"], ["261d-1f3fe", [":point_up_tone4:"], "☝🏾"], ["261d-1f3ff", [":point_up_tone5:"], "☝🏿"], ["270b-1f3fb", [":raised_hand_tone1:"], "✋🏻"], ["270b-1f3fc", [":raised_hand_tone2:"], "✋🏼"], ["270b-1f3fd", [":raised_hand_tone3:"], "✋🏽"], ["270b-1f3fe", [":raised_hand_tone4:"], "✋🏾"], ["270b-1f3ff", [":raised_hand_tone5:"], "✋🏿"], ["1f590-fe0f", [":hand_splayed:", ":raised_hand_with_fingers_splayed:"], "🖐️"], ["270d-1f3fb", [":writing_hand_tone1:"], "✍🏻"], ["270d-1f3fc", [":writing_hand_tone2:"], "✍🏼"], ["270d-1f3fd", [":writing_hand_tone3:"], "✍🏽"], ["270d-1f3fe", [":writing_hand_tone4:"], "✍🏾"], ["270d-1f3ff", [":writing_hand_tone5:"], "✍🏿"], ["1f441-fe0f", [":eye:"], "👁️"], ["1f5e3-fe0f", [":speaking_head:", ":speaking_head_in_silhouette:"], "🗣️"], ["1f575-fe0f", [":detective:", ":spy:", ":sleuth_or_spy:"], "🕵️"], ["1f574-fe0f", [":levitate:"], "🕴️"], ["1f576-fe0f", [":dark_sunglasses:"], "🕶️"], ["1f577-fe0f", [":spider:"], "🕷️"], ["1f578-fe0f", [":spider_web:"], "🕸️"], ["1f54a-fe0f", [":dove:", ":dove_of_peace:"], "🕊️"], ["1f3f3-fe0f", [":flag_white:", ":waving_white_flag:"], "🏳️"], ["1f5ef-fe0f", [":anger_right:", ":right_anger_bubble:"], "🗯️"], ["1f43f-fe0f", [":chipmunk:"], "🐿️"], ["1f396-fe0f", [":military_medal:"], "🎖️"], ["1f5e8-fe0f", [":speech_left:", ":left_speech_bubble:"], "🗨️"], ["1f3f5-fe0f", [":rosette:"], "🏵️"], ["1f397-fe0f", [":reminder_ribbon:"], "🎗️"], ["1f39f-fe0f", [":tickets:", ":admission_tickets:"], "🎟️"], ["1f336-fe0f", [":hot_pepper:"], "🌶️"], ["1f202-fe0f", [":sa:"], "🈂️"], ["1f17f-fe0f", [":parking:"], "🅿️"], ["1f17e-fe0f", [":o2:"], "🅾️"], ["1f171-fe0f", [":b:"], "🅱️"], ["1f170-fe0f", [":a:"], "🅰️"], ["1f237-fe0f", [":u6708:"], "🈷️"], ["1f549-fe0f", [":om_symbol:"], "🕉️"], ["1f58d-fe0f", [":crayon:", ":lower_left_crayon:"], "🖍️"], ["1f58c-fe0f", [":paintbrush:", ":lower_left_paintbrush:"], "🖌️"], ["1f58b-fe0f", [":pen_fountain:", ":lower_left_fountain_pen:"], "🖋️"], ["1f58a-fe0f", [":pen_ballpoint:", ":lower_left_ballpoint_pen:"], "🖊️"], ["1f587-fe0f", [":paperclips:", ":linked_paperclips:"], "🖇️"], ["26f9-1f3ff", [":person_bouncing_ball_tone5:"], "⛹🏿"], ["1f5c2-fe0f", [":dividers:", ":card_index_dividers:"], "🗂️"], ["1f5c4-fe0f", [":file_cabinet:"], "🗄️"], ["1f5f3-fe0f", [":ballot_box:", ":ballot_box_with_ballot:"], "🗳️"], ["1f5c3-fe0f", [":card_box:", ":card_file_box:"], "🗃️"], ["1f5d3-fe0f", [":calendar_spiral:", ":spiral_calendar_pad:"], "🗓️"], ["1f5d2-fe0f", [":notepad_spiral:", ":spiral_note_pad:"], "🗒️"], ["1f3f7-fe0f", [":label:"], "🏷️"], ["1f6cd-fe0f", [":shopping_bags:"], "🛍️"], ["1f5bc-fe0f", [":frame_photo:", ":frame_with_picture:"], "🖼️"], ["1f6cf-fe0f", [":bed:"], "🛏️"], ["1f6cb-fe0f", [":couch:", ":couch_and_lamp:"], "🛋️"], ["1f5dd-fe0f", [":key2:", ":old_key:"], "🗝️"], ["1f6ce-fe0f", [":bellhop:", ":bellhop_bell:"], "🛎️"], ["1f321-fe0f", [":thermometer:"], "🌡️"], ["1f32b-fe0f", [":fog:"], "🌫️"], ["1f32a-fe0f", [":cloud_tornado:", ":cloud_with_tornado:"], "🌪️"], ["1f573-fe0f", [":hole:"], "🕳️"], ["1f32c-fe0f", [":wind_blowing_face:"], "🌬️"], ["1f328-fe0f", [":cloud_snow:", ":cloud_with_snow:"], "🌨️"], ["1f329-fe0f", [":cloud_lightning:", ":cloud_with_lightning:"], "🌩️"], ["1f327-fe0f", [":cloud_rain:", ":cloud_with_rain:"], "🌧️"], ["1f326-fe0f", [":white_sun_rain_cloud:", ":white_sun_behind_cloud_with_rain:"], "🌦️"], ["1f325-fe0f", [":white_sun_cloud:", ":white_sun_behind_cloud:"], "🌥️"], ["1f6e1-fe0f", [":shield:"], "🛡️"], ["1f324-fe0f", [":white_sun_small_cloud:", ":white_sun_with_small_cloud:"], "🌤️"], ["1f5e1-fe0f", [":dagger:", ":dagger_knife:"], "🗡️"], ["1f6e0-fe0f", [":tools:", ":hammer_and_wrench:"], "🛠️"], ["1f6e2-fe0f", [":oil:", ":oil_drum:"], "🛢️"], ["1f5d1-fe0f", [":wastebasket:"], "🗑️"], ["1f56f-fe0f", [":candle:"], "🕯️"], ["1f570-fe0f", [":clock:", ":mantlepiece_clock:"], "🕰️"], ["1f39b-fe0f", [":control_knobs:"], "🎛️"], ["1f39a-fe0f", [":level_slider:"], "🎚️"], ["1f399-fe0f", [":microphone2:", ":studio_microphone:"], "🎙️"], ["1f39e-fe0f", [":film_frames:"], "🎞️"], ["1f4fd-fe0f", [":projector:", ":film_projector:"], "📽️"], ["1f5dc-fe0f", [":compression:"], "🗜️"], ["1f579-fe0f", [":joystick:"], "🕹️"], ["1f5b2-fe0f", [":trackball:"], "🖲️"], ["1f5b1-fe0f", [":mouse_three_button:", ":three_button_mouse:"], "🖱️"], ["1f5a8-fe0f", [":printer:"], "🖨️"], ["1f5a5-fe0f", [":desktop:", ":desktop_computer:"], "🖥️"], ["1f3d9-fe0f", [":cityscape:"], "🏙️"], ["1f3de-fe0f", [":park:", ":national_park:"], "🏞️"], ["1f3db-fe0f", [":classical_building:"], "🏛️"], ["1f3da-fe0f", [":house_abandoned:", ":derelict_house_building:"], "🏚️"], ["1f3d8-fe0f", [":homes:", ":house_buildings:"], "🏘️"], ["1f3d7-fe0f", [":construction_site:", ":building_construction:"], "🏗️"], ["1f6e3-fe0f", [":motorway:"], "🛣️"], ["1f6e4-fe0f", [":railway_track:", ":railroad_track:"], "🛤️"], ["1f3d5-fe0f", [":camping:"], "🏕️"], ["1f3ce-fe0f", [":race_car:", ":racing_car:"], "🏎️"], ["1f3dc-fe0f", [":desert:"], "🏜️"], ["1f3d4-fe0f", [":mountain_snow:", ":snow_capped_mountain:"], "🏔️"], ["1f3dd-fe0f", [":island:", ":desert_island:"], "🏝️"], ["1f3d6-fe0f", [":beach:", ":beach_with_umbrella:"], "🏖️"], ["1f3df-fe0f", [":stadium:"], "🏟️"], ["1f5fa-fe0f", [":map:", ":world_map:"], "🗺️"], ["1f6f3-fe0f", [":cruise_ship:", ":passenger_ship:"], "🛳️"], ["1f3cd-fe0f", [":motorcycle:", ":racing_motorcycle:"], "🏍️"], ["1f6e5-fe0f", [":motorboat:"], "🛥️"], ["1f6f0-fe0f", [":satellite_orbital:"], "🛰️"], ["1f6e9-fe0f", [":airplane_small:", ":small_airplane:"], "🛩️"], ["2714-fe0f", [":heavy_check_mark:"], "✔️"], ["00ae-fe0f", [":registered:"], "®️"], ["00a9-fe0f", [":copyright:"], "©️"], ["21a9-fe0f", [":leftwards_arrow_with_hook:"], "↩️"], ["26f9-fe0f", [":person_bouncing_ball:", ":basketball_player:", ":person_with_ball:"], "⛹️"], ["21aa-fe0f", [":arrow_right_hook:"], "↪️"], ["2b07-fe0f", [":arrow_down:"], "⬇️"], ["2b06-fe0f", [":arrow_up:"], "⬆️"], ["2b05-fe0f", [":arrow_left:"], "⬅️"], ["27a1-fe0f", [":arrow_right:"], "➡️"], ["25c0-fe0f", [":arrow_backward:"], "◀️"], ["23ee-fe0f", [":track_previous:", ":previous_track:"], "⏮️"], ["23ed-fe0f", [":track_next:", ":next_track:"], "⏭️"], ["23cf-fe0f", [":eject:", ":eject_symbol:"], "⏏️"], ["23fa-fe0f", [":record_button:"], "⏺️"], ["23f9-fe0f", [":stop_button:"], "⏹️"], ["23ef-fe0f", [":play_pause:"], "⏯️"], ["23f8-fe0f", [":pause_button:", ":double_vertical_bar:"], "⏸️"], ["25b6-fe0f", [":arrow_forward:"], "▶️"], ["2716-fe0f", [":heavy_multiplication_x:"], "✖️"], ["2721-fe0f", [":star_of_david:"], "✡️"], ["24c2-fe0f", [":m:"], "Ⓜ️"], ["267b-fe0f", [":recycle:"], "♻️"], ["269c-fe0f", [":fleur-de-lis:"], "⚜️"], ["26a0-fe0f", [":warning:"], "⚠️"], ["303d-fe0f", [":part_alternation_mark:"], "〽️"], ["203c-fe0f", [":bangbang:"], "‼️"], ["2733-fe0f", [":eight_spoked_asterisk:"], "✳️"], ["2734-fe0f", [":eight_pointed_black_star:"], "✴️"], ["2744-fe0f", [":snowflake:"], "❄️"], ["2747-fe0f", [":sparkle:"], "❇️"], ["269b-fe0f", [":atom:", ":atom_symbol:"], "⚛️"], ["262f-fe0f", [":yin_yang:"], "☯️"], ["2763-fe0f", [":heart_exclamation:", ":heavy_heart_exclamation_mark_ornament:"], "❣️"], ["262a-fe0f", [":star_and_crescent:"], "☪️"], ["271d-fe0f", [":cross:", ":latin_cross:"], "✝️"], ["262e-fe0f", [":peace:", ":peace_symbol:"], "☮️"], ["270f-fe0f", [":pencil2:"], "✏️"], ["2764-fe0f", [":heart:"], "❤️"], ["2934-fe0f", [":arrow_heading_up:"], "⤴️"], ["2935-fe0f", [":arrow_heading_down:"], "⤵️"], ["3030-fe0f", [":wavy_dash:"], "〰️"], ["3297-fe0f", [":congratulations:"], "㊗️"], ["3299-fe0f", [":secret:"], "㊙️"], ["263a-fe0f", [":relaxed:"], "☺️"], ["0030-fe0f", [":digit_zero:"], "0️"], ["0031-fe0f", [":digit_one:"], "1️"], ["0032-fe0f", [":digit_two:"], "2️"], ["0033-fe0f", [":digit_three:"], "3️"], ["0034-fe0f", [":digit_four:"], "4️"], ["0035-fe0f", [":digit_five:"], "5️"], ["0036-fe0f", [":digit_six:"], "6️"], ["0037-fe0f", [":digit_seven:"], "7️"], ["0038-fe0f", [":digit_eight:"], "8️"], ["0039-fe0f", [":digit_nine:"], "9️"], ["0023-fe0f", [":pound_symbol:"], "#️"], ["002a-fe0f", [":asterisk_symbol:"], "*️"], ["2139-fe0f", [":information_source:"], "ℹ️"], ["2194-fe0f", [":left_right_arrow:"], "↔️"], ["2195-fe0f", [":arrow_up_down:"], "↕️"], ["2196-fe0f", [":arrow_upper_left:"], "↖️"], ["2049-fe0f", [":interrobang:"], "⁉️"], ["26b1-fe0f", [":urn:", ":funeral_urn:"], "⚱️"], ["270c-fe0f", [":v:"], "✌️"], ["2197-fe0f", [":arrow_upper_right:"], "↗️"], ["26c8-fe0f", [":thunder_cloud_rain:", ":thunder_cloud_and_rain:"], "⛈️"], ["26f7-fe0f", [":skier:"], "⛷️"], ["26b0-fe0f", [":coffin:"], "⚰️"], ["2198-fe0f", [":arrow_lower_right:"], "↘️"], ["26f8-fe0f", [":ice_skate:"], "⛸️"], ["2199-fe0f", [":arrow_lower_left:"], "↙️"], ["261d-fe0f", [":point_up:"], "☝️"], ["2328-fe0f", [":keyboard:"], "⌨️"], ["26d3-fe0f", [":chains:"], "⛓️"], ["26cf-fe0f", [":pick:"], "⛏️"], ["2600-fe0f", [":sunny:"], "☀️"], ["2601-fe0f", [":cloud:"], "☁️"], ["2602-fe0f", [":umbrella2:"], "☂️"], ["2603-fe0f", [":snowman2:"], "☃️"], ["2604-fe0f", [":comet:"], "☄️"], ["23f2-fe0f", [":timer:", ":timer_clock:"], "⏲️"], ["23f1-fe0f", [":stopwatch:"], "⏱️"], ["2611-fe0f", [":ballot_box_with_check:"], "☑️"], ["2618-fe0f", [":shamrock:"], "☘️"], ["2620-fe0f", [":skull_crossbones:", ":skull_and_crossbones:"], "☠️"], ["260e-fe0f", [":telephone:"], "☎️"], ["2622-fe0f", [":radioactive:", ":radioactive_sign:"], "☢️"], ["2623-fe0f", [":biohazard:", ":biohazard_sign:"], "☣️"], ["270d-fe0f", [":writing_hand:"], "✍️"], ["2626-fe0f", [":orthodox_cross:"], "☦️"], ["2638-fe0f", [":wheel_of_dharma:"], "☸️"], ["2639-fe0f", [":frowning2:", ":white_frowning_face:"], "☹️"], ["2640-fe0f", [":female_sign:"], "♀️"], ["2642-fe0f", [":male_sign:"], "♂️"], ["2660-fe0f", [":spades:"], "♠️"], ["2663-fe0f", [":clubs:"], "♣️"], ["26e9-fe0f", [":shinto_shrine:"], "⛩️"], ["2665-fe0f", [":hearts:"], "♥️"], ["2666-fe0f", [":diamonds:"], "♦️"], ["2122-fe0f", [":tm:"], "™️"], ["26d1-fe0f", [":helmet_with_cross:", ":helmet_with_white_cross:"], "⛑️"], ["2668-fe0f", [":hotsprings:"], "♨️"], ["2692-fe0f", [":hammer_pick:", ":hammer_and_pick:"], "⚒️"], ["2694-fe0f", [":crossed_swords:"], "⚔️"], ["2695-fe0f", [":medical_symbol:"], "⚕️"], ["2696-fe0f", [":scales:"], "⚖️"], ["2697-fe0f", [":alembic:"], "⚗️"], ["26f0-fe0f", [":mountain:"], "⛰️"], ["2699-fe0f", [":gear:"], "⚙️"], ["2702-fe0f", [":scissors:"], "✂️"], ["26f1-fe0f", [":beach_umbrella:", ":umbrella_on_ground:"], "⛱️"], ["2708-fe0f", [":airplane:"], "✈️"], ["25fb-fe0f", [":white_medium_square:"], "◻️"], ["26f4-fe0f", [":ferry:"], "⛴️"], ["25fc-fe0f", [":black_medium_square:"], "◼️"], ["25ab-fe0f", [":white_small_square:"], "▫️"], ["2709-fe0f", [":envelope:"], "✉️"], ["2712-fe0f", [":black_nib:"], "✒️"], ["25aa-fe0f", [":black_small_square:"], "▪️"], ["1f557", [":clock8:"], "🕗"], ["1f698", [":oncoming_automobile:"], "🚘"], ["1f6a1", [":aerial_tramway:"], "🚡"], ["1f6a0", [":mountain_cableway:"], "🚠"], ["1f69f", [":suspension_railway:"], "🚟"], ["1f683", [":railway_car:"], "🚃"], ["1f68b", [":train:"], "🚋"], ["1f69e", [":mountain_railway:"], "🚞"], ["1f69d", [":monorail:"], "🚝"], ["1f684", [":bullettrain_side:"], "🚄"], ["1f685", [":bullettrain_front:"], "🚅"], ["1f688", [":light_rail:"], "🚈"], ["1f682", [":steam_locomotive:"], "🚂"], ["1f686", [":train2:"], "🚆"], ["1f687", [":metro:"], "🚇"], ["1f68a", [":tram:"], "🚊"], ["1f689", [":station:"], "🚉"], ["1f681", [":helicopter:"], "🚁"], ["1f68d", [":oncoming_bus:"], "🚍"], ["1f6eb", [":airplane_departure:"], "🛫"], ["1f6ec", [":airplane_arriving:"], "🛬"], ["1f680", [":rocket:"], "🚀"], ["1f694", [":oncoming_police_car:"], "🚔"], ["1f4ba", [":seat:"], "💺"], ["1f6f6", [":canoe:", ":kayak:"], "🛶"], ["1f938", [":person_doing_cartwheel:", ":cartwheel:"], "🤸"], ["1f6a8", [":rotating_light:"], "🚨"], ["1f6a4", [":speedboat:"], "🚤"], ["1f6f5", [":motor_scooter:", ":motorbike:"], "🛵"], ["1f6b2", [":bike:"], "🚲"], ["1f6a2", [":ship:"], "🚢"], ["1f6a7", [":construction:"], "🚧"], ["1f3c4", [":person_surfing:", ":surfer:"], "🏄"], ["1f68f", [":busstop:"], "🚏"], ["1f6a6", [":vertical_traffic_light:"], "🚦"], ["1f6a5", [":traffic_light:"], "🚥"], ["1f6f4", [":scooter:"], "🛴"], ["1f5ff", [":moyai:"], "🗿"], ["1f5fd", [":statue_of_liberty:"], "🗽"], ["1f93c", [":people_wrestling:", ":wrestlers:", ":wrestling:"], "🤼"], ["1f5fc", [":tokyo_tower:"], "🗼"], ["1f3f0", [":european_castle:"], "🏰"], ["1f3ef", [":japanese_castle:"], "🏯"], ["1f69c", [":tractor:"], "🚜"], ["1f3a1", [":ferris_wheel:"], "🎡"], ["1f3a2", [":roller_coaster:"], "🎢"], ["1f3a0", [":carousel_horse:"], "🎠"], ["1f69b", [":articulated_lorry:"], "🚛"], ["1f69a", [":truck:"], "🚚"], ["1f690", [":minibus:"], "🚐"], ["1f692", [":fire_engine:"], "🚒"], ["1f691", [":ambulance:"], "🚑"], ["1f5fb", [":mount_fuji:"], "🗻"], ["1f30b", [":volcano:"], "🌋"], ["1f693", [":police_car:"], "🚓"], ["1f68e", [":trolleybus:"], "🚎"], ["1f93a", [":person_fencing:", ":fencer:", ":fencing:"], "🤺"], ["1f68c", [":bus:"], "🚌"], ["1f699", [":blue_car:"], "🚙"], ["1f695", [":taxi:"], "🚕"], ["1f3ed", [":factory:"], "🏭"], ["1f3e0", [":house:"], "🏠"], ["1f3e1", [":house_with_garden:"], "🏡"], ["1f697", [":red_car:"], "🚗"], ["1f33b", [":sunflower:"], "🌻"], ["1f3e2", [":office:"], "🏢"], ["1f3ec", [":department_store:"], "🏬"], ["1f3e3", [":post_office:"], "🏣"], ["1f3e4", [":european_post_office:"], "🏤"], ["1f3e5", [":hospital:"], "🏥"], ["1f3e6", [":bank:"], "🏦"], ["1f3e8", [":hotel:"], "🏨"], ["1f3ea", [":convenience_store:"], "🏪"], ["1f3eb", [":school:"], "🏫"], ["1f3e9", [":love_hotel:"], "🏩"], ["1f492", [":wedding:"], "💒"], ["1f33c", [":blossom:"], "🌼"], ["1f3c2", [":snowboarder:"], "🏂"], ["1f54c", [":mosque:"], "🕌"], ["1f54d", [":synagogue:"], "🕍"], ["1f54b", [":kaaba:"], "🕋"], ["1f338", [":cherry_blossom:"], "🌸"], ["1f5fe", [":japan:"], "🗾"], ["1f391", [":rice_scene:"], "🎑"], ["1f33a", [":hibiscus:"], "🌺"], ["1f305", [":sunrise:"], "🌅"], ["1f304", [":sunrise_over_mountains:"], "🌄"], ["1f320", [":stars:"], "🌠"], ["1f387", [":sparkler:"], "🎇"], ["1f386", [":fireworks:"], "🎆"], ["1f307", [":city_sunset:", ":city_sunrise:"], "🌇"], ["1f306", [":city_dusk:"], "🌆"], ["1f30e", [":earth_americas:"], "🌎"], ["1f303", [":night_with_stars:"], "🌃"], ["1f30c", [":milky_way:"], "🌌"], ["1f309", [":bridge_at_night:"], "🌉"], ["1f301", [":foggy:"], "🌁"], ["1f6f8", [":flying_saucer:"], "🛸"], ["1f3bf", [":ski:"], "🎿"], ["1f4f1", [":iphone:"], "📱"], ["1f4f2", [":calling:"], "📲"], ["1f4bb", [":computer:"], "💻"], ["1f30d", [":earth_africa:"], "🌍"], ["1f30f", [":earth_asia:"], "🌏"], ["1f315", [":full_moon:"], "🌕"], ["1f316", [":waning_gibbous_moon:"], "🌖"], ["1f317", [":last_quarter_moon:"], "🌗"], ["1f318", [":waning_crescent_moon:"], "🌘"], ["1f4bd", [":minidisc:"], "💽"], ["1f4be", [":floppy_disk:"], "💾"], ["1f4bf", [":cd:"], "💿"], ["1f4c0", [":dvd:"], "📀"], ["1f4fc", [":vhs:"], "📼"], ["1f4f7", [":camera:"], "📷"], ["1f4f8", [":camera_with_flash:"], "📸"], ["1f4f9", [":video_camera:"], "📹"], ["1f3a5", [":movie_camera:"], "🎥"], ["1f311", [":new_moon:"], "🌑"], ["1f312", [":waxing_crescent_moon:"], "🌒"], ["1f4de", [":telephone_receiver:"], "📞"], ["1f313", [":first_quarter_moon:"], "🌓"], ["1f4df", [":pager:"], "📟"], ["1f4e0", [":fax:"], "📠"], ["1f4fa", [":tv:"], "📺"], ["1f4fb", [":radio:"], "📻"], ["1f314", [":waxing_gibbous_moon:"], "🌔"], ["1f31a", [":new_moon_with_face:"], "🌚"], ["1f31d", [":full_moon_with_face:"], "🌝"], ["1f31e", [":sun_with_face:"], "🌞"], ["1f31b", [":first_quarter_moon_with_face:"], "🌛"], ["1f94b", [":martial_arts_uniform:", ":karate_uniform:"], "🥋"], ["1f31c", [":last_quarter_moon_with_face:"], "🌜"], ["1f94a", [":boxing_glove:", ":boxing_gloves:"], "🥊"], ["1f3a3", [":fishing_pole_and_fish:"], "🎣"], ["1f4e1", [":satellite:"], "📡"], ["1f50b", [":battery:"], "🔋"], ["1f50c", [":electric_plug:"], "🔌"], ["1f4a1", [":bulb:"], "💡"], ["1f526", [":flashlight:"], "🔦"], ["1f319", [":crescent_moon:"], "🌙"], ["1f4ab", [":dizzy:"], "💫"], ["1f3f9", [":bow_and_arrow:", ":archery:"], "🏹"], ["1f4b8", [":money_with_wings:"], "💸"], ["1f4b5", [":dollar:"], "💵"], ["1f4b4", [":yen:"], "💴"], ["1f4b6", [":euro:"], "💶"], ["1f4b7", [":pound:"], "💷"], ["1f4b0", [":moneybag:"], "💰"], ["1f4b3", [":credit_card:"], "💳"], ["1f48e", [":gem:"], "💎"], ["1f527", [":wrench:"], "🔧"], ["1f528", [":hammer:"], "🔨"], ["1f31f", [":star2:"], "🌟"], ["1f3cf", [":cricket_game:", ":cricket_bat_ball:"], "🏏"], ["1f529", [":nut_and_bolt:"], "🔩"], ["1f525", [":fire:", ":flame:"], "🔥"], ["1f52b", [":gun:"], "🔫"], ["1f4a3", [":bomb:"], "💣"], ["1f52a", [":knife:"], "🔪"], ["1f4a5", [":boom:"], "💥"], ["1f3d1", [":field_hockey:"], "🏑"], ["1f6ac", [":smoking:"], "🚬"], ["1f308", [":rainbow:"], "🌈"], ["1f3d2", [":hockey:"], "🏒"], ["1f3fa", [":amphora:"], "🏺"], ["1f52e", [":crystal_ball:"], "🔮"], ["1f4ff", [":prayer_beads:"], "📿"], ["1f488", [":barber:"], "💈"], ["1f52d", [":telescope:"], "🔭"], ["1f52c", [":microscope:"], "🔬"], ["1f4a8", [":dash:"], "💨"], ["1f48a", [":pill:"], "💊"], ["1f489", [":syringe:"], "💉"], ["1f30a", [":ocean:"], "🌊"], ["1f6bd", [":toilet:"], "🚽"], ["1f6b0", [":potable_water:"], "🚰"], ["1f6bf", [":shower:"], "🚿"], ["1f6c1", [":bathtub:"], "🛁"], ["1f6c0", [":bath:"], "🛀"], ["1f940", [":wilted_rose:", ":wilted_flower:"], "🥀"], ["1f339", [":rose:"], "🌹"], ["1f337", [":tulip:"], "🌷"], ["1f490", [":bouquet:"], "💐"], ["1f33e", [":ear_of_rice:"], "🌾"], ["1f4a7", [":droplet:"], "💧"], ["1f511", [":key:"], "🔑"], ["1f4a6", [":sweat_drops:"], "💦"], ["1f6aa", [":door:"], "🚪"], ["1f992", [":giraffe:"], "🦒"], ["1f993", [":zebra:"], "🦓"], ["1f6cc", [":sleeping_accommodation:"], "🛌"], ["1f344", [":mushroom:"], "🍄"], ["1f341", [":maple_leaf:"], "🍁"], ["1f342", [":fallen_leaf:"], "🍂"], ["1f343", [":leaves:"], "🍃"], ["1f38b", [":tanabata_tree:"], "🎋"], ["1f994", [":hedgehog:"], "🦔"], ["1f995", [":sauropod:"], "🦕"], ["1f6d2", [":shopping_cart:", ":shopping_trolley:"], "🛒"], ["1f381", [":gift:"], "🎁"], ["1f388", [":balloon:"], "🎈"], ["1f38f", [":flags:"], "🎏"], ["1f380", [":ribbon:"], "🎀"], ["1f38a", [":confetti_ball:"], "🎊"], ["1f389", [":tada:"], "🎉"], ["1f38e", [":dolls:"], "🎎"], ["1f3ee", [":izakaya_lantern:"], "🏮"], ["1f390", [":wind_chime:"], "🎐"], ["1f4e9", [":envelope_with_arrow:"], "📩"], ["1f4e8", [":incoming_envelope:"], "📨"], ["1f4e7", [":e-mail:", ":email:"], "📧"], ["1f48c", [":love_letter:"], "💌"], ["1f4e5", [":inbox_tray:"], "📥"], ["1f4e4", [":outbox_tray:"], "📤"], ["1f4e6", [":package:"], "📦"], ["1f996", [":t_rex:"], "🦖"], ["1f4ea", [":mailbox_closed:"], "📪"], ["1f4eb", [":mailbox:"], "📫"], ["1f4ec", [":mailbox_with_mail:"], "📬"], ["1f4ed", [":mailbox_with_no_mail:"], "📭"], ["1f4ee", [":postbox:"], "📮"], ["1f4ef", [":postal_horn:"], "📯"], ["1f4dc", [":scroll:"], "📜"], ["1f4c3", [":page_with_curl:"], "📃"], ["1f4c4", [":page_facing_up:"], "📄"], ["1f4d1", [":bookmark_tabs:"], "📑"], ["1f4ca", [":bar_chart:"], "📊"], ["1f4c8", [":chart_with_upwards_trend:"], "📈"], ["1f4c9", [":chart_with_downwards_trend:"], "📉"], ["1f997", [":cricket:"], "🦗"], ["1f34f", [":green_apple:"], "🍏"], ["1f4c6", [":calendar:"], "📆"], ["1f4c5", [":date:"], "📅"], ["1f4c7", [":card_index:"], "📇"], ["1f34e", [":apple:"], "🍎"], ["1f350", [":pear:"], "🍐"], ["1f34a", [":tangerine:"], "🍊"], ["1f4cb", [":clipboard:"], "📋"], ["1f4c1", [":file_folder:"], "📁"], ["1f4c2", [":open_file_folder:"], "📂"], ["1f34b", [":lemon:"], "🍋"], ["1f34c", [":banana:"], "🍌"], ["1f4f0", [":newspaper:"], "📰"], ["1f4d3", [":notebook:"], "📓"], ["1f4d4", [":notebook_with_decorative_cover:"], "📔"], ["1f4d2", [":ledger:"], "📒"], ["1f4d5", [":closed_book:"], "📕"], ["1f4d7", [":green_book:"], "📗"], ["1f4d8", [":blue_book:"], "📘"], ["1f4d9", [":orange_book:"], "📙"], ["1f4da", [":books:"], "📚"], ["1f4d6", [":book:"], "📖"], ["1f516", [":bookmark:"], "🔖"], ["1f517", [":link:"], "🔗"], ["1f4ce", [":paperclip:"], "📎"], ["1f9d8", [":person_in_lotus_position:"], "🧘"], ["1f4d0", [":triangular_ruler:"], "📐"], ["1f4cf", [":straight_ruler:"], "📏"], ["1f4cc", [":pushpin:"], "📌"], ["1f4cd", [":round_pushpin:"], "📍"], ["1f9d7", [":person_climbing:"], "🧗"], ["1f9d6", [":person_in_steamy_room:"], "🧖"], ["1f94c", [":curling_stone:"], "🥌"], ["1f931", [":breast_feeding:"], "🤱"], ["1f4dd", [":pencil:", ":memo:"], "📝"], ["1f6f7", [":sled:"], "🛷"], ["1f50d", [":mag:"], "🔍"], ["1f50e", [":mag_right:"], "🔎"], ["1f50f", [":lock_with_ink_pen:"], "🔏"], ["1f510", [":closed_lock_with_key:"], "🔐"], ["1f512", [":lock:"], "🔒"], ["1f513", [":unlock:"], "🔓"], ["1f9e1", [":orange_heart:"], "🧡"], ["1f49b", [":yellow_heart:"], "💛"], ["1f49a", [":green_heart:"], "💚"], ["1f499", [":blue_heart:"], "💙"], ["1f49c", [":purple_heart:"], "💜"], ["1f5a4", [":black_heart:"], "🖤"], ["1f494", [":broken_heart:"], "💔"], ["1f495", [":two_hearts:"], "💕"], ["1f49e", [":revolving_hearts:"], "💞"], ["1f493", [":heartbeat:"], "💓"], ["1f497", [":heartpulse:"], "💗"], ["1f496", [":sparkling_heart:"], "💖"], ["1f498", [":cupid:"], "💘"], ["1f49d", [":gift_heart:"], "💝"], ["1f49f", [":heart_decoration:"], "💟"], ["1f3b0", [":slot_machine:"], "🎰"], ["1f3ae", [":video_game:"], "🎮"], ["1f3b3", [":bowling:"], "🎳"], ["1f3af", [":dart:"], "🎯"], ["1f52f", [":six_pointed_star:"], "🔯"], ["1f54e", [":menorah:"], "🕎"], ["1f3b2", [":game_die:"], "🎲"], ["1f6d0", [":place_of_worship:", ":worship_symbol:"], "🛐"], ["1f945", [":goal:", ":goal_net:"], "🥅"], ["1f3f8", [":badminton:"], "🏸"], ["1f3ca", [":person_swimming:", ":swimmer:"], "🏊"], ["1f3d3", [":ping_pong:", ":table_tennis:"], "🏓"], ["1f3b1", [":8ball:"], "🎱"], ["1f3c9", [":rugby_football:"], "🏉"], ["1f3d0", [":volleyball:"], "🏐"], ["1f194", [":id:"], "🆔"], ["1f3bb", [":violin:"], "🎻"], ["1f251", [":accept:"], "🉑"], ["1f4f4", [":mobile_phone_off:"], "📴"], ["1f4f3", [":vibration_mode:"], "📳"], ["1f236", [":u6709:"], "🈶"], ["1f21a", [":u7121:"], "🈚"], ["1f238", [":u7533:"], "🈸"], ["1f23a", [":u55b6:"], "🈺"], ["1f3b8", [":guitar:"], "🎸"], ["1f19a", [":vs:"], "🆚"], ["1f4ae", [":white_flower:"], "💮"], ["1f250", [":ideograph_advantage:"], "🉐"], ["1f234", [":u5408:"], "🈴"], ["1f235", [":u6e80:"], "🈵"], ["1f239", [":u5272:"], "🈹"], ["1f232", [":u7981:"], "🈲"], ["1f3ba", [":trumpet:"], "🎺"], ["1f3b7", [":saxophone:"], "🎷"], ["1f18e", [":ab:"], "🆎"], ["1f191", [":cl:"], "🆑"], ["1f941", [":drum:", ":drum_with_drumsticks:"], "🥁"], ["1f198", [":sos:"], "🆘"], ["1f3be", [":tennis:"], "🎾"], ["1f3c8", [":football:"], "🏈"], ["1f6d1", [":octagonal_sign:", ":stop_sign:"], "🛑"], ["1f3c0", [":basketball:"], "🏀"], ["1f4db", [":name_badge:"], "📛"], ["1f6ab", [":no_entry_sign:"], "🚫"], ["1f4af", [":100:"], "💯"], ["1f4a2", [":anger:"], "💢"], ["1f6b7", [":no_pedestrians:"], "🚷"], ["1f6af", [":do_not_litter:"], "🚯"], ["1f6b3", [":no_bicycles:"], "🚳"], ["1f6b1", [":non-potable_water:"], "🚱"], ["1f51e", [":underage:"], "🔞"], ["1f4f5", [":no_mobile_phones:"], "📵"], ["1f6ad", [":no_smoking:"], "🚭"], ["1f3b9", [":musical_keyboard:"], "🎹"], ["1f505", [":low_brightness:"], "🔅"], ["1f506", [":high_brightness:"], "🔆"], ["1f3bc", [":musical_score:"], "🎼"], ["1f3a7", [":headphones:"], "🎧"], ["1f6b8", [":children_crossing:"], "🚸"], ["1f531", [":trident:"], "🔱"], ["1f3a4", [":microphone:"], "🎤"], ["1f530", [":beginner:"], "🔰"], ["1f3ac", [":clapper:"], "🎬"], ["1f22f", [":u6307:"], "🈯"], ["1f4b9", [":chart:"], "💹"], ["1f96b", [":canned_food:"], "🥫"], ["1f310", [":globe_with_meridians:"], "🌐"], ["1f4a0", [":diamond_shape_with_a_dot_inside:"], "💠"], ["1f3a8", [":art:"], "🎨"], ["1f300", [":cyclone:"], "🌀"], ["1f4a4", [":zzz:"], "💤"], ["1f3e7", [":atm:"], "🏧"], ["1f6be", [":wc:"], "🚾"], ["1f96a", [":sandwich:"], "🥪"], ["1f3ad", [":performing_arts:"], "🎭"], ["1f233", [":u7a7a:"], "🈳"], ["1f349", [":watermelon:"], "🍉"], ["1f6c2", [":passport_control:"], "🛂"], ["1f6c3", [":customs:"], "🛃"], ["1f6c4", [":baggage_claim:"], "🛄"], ["1f6c5", [":left_luggage:"], "🛅"], ["1f6b9", [":mens:"], "🚹"], ["1f6ba", [":womens:"], "🚺"], ["1f6bc", [":baby_symbol:"], "🚼"], ["1f6bb", [":restroom:"], "🚻"], ["1f6ae", [":put_litter_in_its_place:"], "🚮"], ["1f3a6", [":cinema:"], "🎦"], ["1f4f6", [":signal_strength:"], "📶"], ["1f201", [":koko:"], "🈁"], ["1f523", [":symbols:"], "🔣"], ["1f524", [":abc:"], "🔤"], ["1f521", [":abcd:"], "🔡"], ["1f520", [":capital_abcd:"], "🔠"], ["1f196", [":ng:"], "🆖"], ["1f197", [":ok:"], "🆗"], ["1f199", [":up:"], "🆙"], ["1f192", [":cool:"], "🆒"], ["1f195", [":new:"], "🆕"], ["1f193", [":free:"], "🆓"], ["1f38d", [":bamboo:"], "🎍"], ["1f340", [":four_leaf_clover:"], "🍀"], ["1f33f", [":herb:"], "🌿"], ["1f331", [":seedling:"], "🌱"], ["1f334", [":palm_tree:"], "🌴"], ["1f93e", [":person_playing_handball:", ":handball:"], "🤾"], ["1f332", [":evergreen_tree:"], "🌲"], ["1f384", [":christmas_tree:"], "🎄"], ["1f335", [":cactus:"], "🌵"], ["1f432", [":dragon_face:"], "🐲"], ["1f51f", [":keycap_ten:"], "🔟"], ["1f522", [":1234:"], "🔢"], ["1f409", [":dragon:"], "🐉"], ["1f43e", [":feet:", ":paw_prints:"], "🐾"], ["1f347", [":grapes:"], "🍇"], ["1f353", [":strawberry:"], "🍓"], ["1f348", [":melon:"], "🍈"], ["1f352", [":cherries:"], "🍒"], ["1f939", [":person_juggling:", ":juggling:", ":juggler:"], "🤹"], ["1f351", [":peach:"], "🍑"], ["1f34d", [":pineapple:"], "🍍"], ["1f95d", [":kiwi:", ":kiwifruit:"], "🥝"], ["1f969", [":cut_of_meat:"], "🥩"], ["1f968", [":pretzel:"], "🥨"], ["1f967", [":pie:"], "🥧"], ["1f966", [":broccoli:"], "🥦"], ["1f951", [":avocado:"], "🥑"], ["1f53c", [":arrow_up_small:"], "🔼"], ["1f53d", [":arrow_down_small:"], "🔽"], ["1f345", [":tomato:"], "🍅"], ["1f346", [":eggplant:"], "🍆"], ["1f952", [":cucumber:"], "🥒"], ["1f955", [":carrot:"], "🥕"], ["1f33d", [":corn:"], "🌽"], ["1f954", [":potato:"], "🥔"], ["1f500", [":twisted_rightwards_arrows:"], "🔀"], ["1f501", [":repeat:"], "🔁"], ["1f502", [":repeat_one:"], "🔂"], ["1f504", [":arrows_counterclockwise:"], "🔄"], ["1f503", [":arrows_clockwise:"], "🔃"], ["1f3b5", [":musical_note:"], "🎵"], ["1f3b6", [":notes:"], "🎶"], ["1f4b2", [":heavy_dollar_sign:"], "💲"], ["1f4b1", [":currency_exchange:"], "💱"], ["1f360", [":sweet_potato:"], "🍠"], ["1f3aa", [":circus_tent:"], "🎪"], ["1f965", [":coconut:"], "🥥"], ["1f964", [":cup_with_straw:"], "🥤"], ["1f51a", [":end:"], "🔚"], ["1f519", [":back:"], "🔙"], ["1f51b", [":on:"], "🔛"], ["1f51d", [":top:"], "🔝"], ["1f51c", [":soon:"], "🔜"], ["1f518", [":radio_button:"], "🔘"], ["1f963", [":bowl_with_spoon:"], "🥣"], ["1f962", [":chopsticks:"], "🥢"], ["1f534", [":red_circle:"], "🔴"], ["1f535", [":blue_circle:"], "🔵"], ["1f53a", [":small_red_triangle:"], "🔺"], ["1f53b", [":small_red_triangle_down:"], "🔻"], ["1f538", [":small_orange_diamond:"], "🔸"], ["1f539", [":small_blue_diamond:"], "🔹"], ["1f536", [":large_orange_diamond:"], "🔶"], ["1f537", [":large_blue_diamond:"], "🔷"], ["1f533", [":white_square_button:"], "🔳"], ["1f532", [":black_square_button:"], "🔲"], ["1f3ab", [":ticket:"], "🎫"], ["1f3c6", [":trophy:"], "🏆"], ["1f961", [":takeout_box:"], "🥡"], ["1f960", [":fortune_cookie:"], "🥠"], ["1f949", [":third_place:", ":third_place_medal:"], "🥉"], ["1f948", [":second_place:", ":second_place_medal:"], "🥈"], ["1f95f", [":dumpling:"], "🥟"], ["1f93d", [":person_playing_water_polo:", ":water_polo:"], "🤽"], ["1f508", [":speaker:"], "🔈"], ["1f507", [":mute:"], "🔇"], ["1f509", [":sound:"], "🔉"], ["1f50a", [":loud_sound:"], "🔊"], ["1f514", [":bell:"], "🔔"], ["1f515", [":no_bell:"], "🔕"], ["1f4e3", [":mega:"], "📣"], ["1f4e2", [":loudspeaker:"], "📢"], ["1f947", [":first_place:", ":first_place_medal:"], "🥇"], ["1f3c5", [":medal:", ":sports_medal:"], "🏅"], ["1f4ac", [":speech_balloon:"], "💬"], ["1f4ad", [":thought_balloon:"], "💭"], ["1f3bd", [":running_shirt_with_sash:"], "🎽"], ["1f0cf", [":black_joker:"], "🃏"], ["1f3b4", [":flower_playing_cards:"], "🎴"], ["1f004", [":mahjong:"], "🀄"], ["1f550", [":clock1:"], "🕐"], ["1f551", [":clock2:"], "🕑"], ["1f552", [":clock3:"], "🕒"], ["1f553", [":clock4:"], "🕓"], ["1f554", [":clock5:"], "🕔"], ["1f555", [":clock6:"], "🕕"], ["1f556", [":clock7:"], "🕖"], ["1f696", [":oncoming_taxi:"], "🚖"], ["1f558", [":clock9:"], "🕘"], ["1f559", [":clock10:"], "🕙"], ["1f55a", [":clock11:"], "🕚"], ["1f55b", [":clock12:"], "🕛"], ["1f55c", [":clock130:"], "🕜"], ["1f55d", [":clock230:"], "🕝"], ["1f55e", [":clock330:"], "🕞"], ["1f55f", [":clock430:"], "🕟"], ["1f560", [":clock530:"], "🕠"], ["1f561", [":clock630:"], "🕡"], ["1f562", [":clock730:"], "🕢"], ["1f563", [":clock830:"], "🕣"], ["1f564", [":clock930:"], "🕤"], ["1f565", [":clock1030:"], "🕥"], ["1f566", [":clock1130:"], "🕦"], ["1f567", [":clock1230:"], "🕧"], ["1f330", [":chestnut:"], "🌰"], ["1f3f4", [":flag_black:", ":waving_black_flag:"], "🏴"], ["1f3c1", [":checkered_flag:"], "🏁"], ["1f6a9", [":triangular_flag_on_post:"], "🚩"], ["1f400", [":rat:"], "🐀"], ["1f401", [":mouse2:"], "🐁"], ["1f407", [":rabbit2:"], "🐇"], ["1f95c", [":peanuts:", ":shelled_peanut:"], "🥜"], ["1f983", [":turkey:"], "🦃"], ["1f413", [":rooster:"], "🐓"], ["1f408", [":cat2:"], "🐈"], ["1f429", [":poodle:"], "🐩"], ["1f415", [":dog2:"], "🐕"], ["1f411", [":sheep:"], "🐑"], ["1f40f", [":ram:"], "🐏"], ["1f410", [":goat:"], "🐐"], ["1f416", [":pig2:"], "🐖"], ["1f40e", [":racehorse:"], "🐎"], ["1f98d", [":gorilla:"], "🦍"], ["1f98f", [":rhino:", ":rhinoceros:"], "🦏"], ["1f418", [":elephant:"], "🐘"], ["1f42b", [":camel:"], "🐫"], ["1f42a", [":dromedary_camel:"], "🐪"], ["1f98c", [":deer:"], "🦌"], ["1f404", [":cow2:"], "🐄"], ["1f402", [":ox:"], "🐂"], ["1f403", [":water_buffalo:"], "🐃"], ["1f405", [":tiger2:"], "🐅"], ["1f406", [":leopard:"], "🐆"], ["1f40a", [":crocodile:"], "🐊"], ["1f40b", [":whale2:"], "🐋"], ["1f433", [":whale:"], "🐳"], ["1f988", [":shark:"], "🦈"], ["1f42c", [":dolphin:"], "🐬"], ["1f421", [":blowfish:"], "🐡"], ["1f41f", [":fish:"], "🐟"], ["1f420", [":tropical_fish:"], "🐠"], ["1f990", [":shrimp:"], "🦐"], ["1f419", [":octopus:"], "🐙"], ["1f991", [":squid:"], "🦑"], ["1f980", [":crab:"], "🦀"], ["1f982", [":scorpion:"], "🦂"], ["1f98e", [":lizard:"], "🦎"], ["1f40d", [":snake:"], "🐍"], ["1f422", [":turtle:"], "🐢"], ["1f36f", [":honey_pot:"], "🍯"], ["1f950", [":croissant:"], "🥐"], ["1f41c", [":ant:"], "🐜"], ["1f41e", [":beetle:"], "🐞"], ["1f41a", [":shell:"], "🐚"], ["1f40c", [":snail:"], "🐌"], ["1f98b", [":butterfly:"], "🦋"], ["1f41b", [":bug:"], "🐛"], ["1f41d", [":bee:"], "🐝"], ["1f984", [":unicorn:", ":unicorn_face:"], "🦄"], ["1f434", [":horse:"], "🐴"], ["1f417", [":boar:"], "🐗"], ["1f43a", [":wolf:"], "🐺"], ["1f987", [":bat:"], "🦇"], ["1f989", [":owl:"], "🦉"], ["1f985", [":eagle:"], "🦅"], ["1f986", [":duck:"], "🦆"], ["1f425", [":hatched_chick:"], "🐥"], ["1f423", [":hatching_chick:"], "🐣"], ["1f424", [":baby_chick:"], "🐤"], ["1f426", [":bird:"], "🐦"], ["1f427", [":penguin:"], "🐧"], ["1f414", [":chicken:"], "🐔"], ["1f412", [":monkey:"], "🐒"], ["1f64a", [":speak_no_evil:"], "🙊"], ["1f649", [":hear_no_evil:"], "🙉"], ["1f648", [":see_no_evil:"], "🙈"], ["1f435", [":monkey_face:"], "🐵"], ["1f438", [":frog:"], "🐸"], ["1f43d", [":pig_nose:"], "🐽"], ["1f437", [":pig:"], "🐷"], ["1f42e", [":cow:"], "🐮"], ["1f981", [":lion_face:", ":lion:"], "🦁"], ["1f42f", [":tiger:"], "🐯"], ["1f428", [":koala:"], "🐨"], ["1f43c", [":panda_face:"], "🐼"], ["1f43b", [":bear:"], "🐻"], ["1f98a", [":fox:", ":fox_face:"], "🦊"], ["1f430", [":rabbit:"], "🐰"], ["1f439", [":hamster:"], "🐹"], ["1f42d", [":mouse:"], "🐭"], ["1f431", [":cat:"], "🐱"], ["1f436", [":dog:"], "🐶"], ["1f302", [":closed_umbrella:"], "🌂"], ["1f35e", [":bread:"], "🍞"], ["1f453", [":eyeglasses:"], "👓"], ["1f4bc", [":briefcase:"], "💼"], ["1f45c", [":handbag:"], "👜"], ["1f45b", [":purse:"], "👛"], ["1f45d", [":pouch:"], "👝"], ["1f392", [":school_satchel:"], "🎒"], ["1f956", [":french_bread:", ":baguette_bread:"], "🥖"], ["1f451", [":crown:"], "👑"], ["1f393", [":mortar_board:"], "🎓"], ["1f3a9", [":tophat:"], "🎩"], ["1f452", [":womans_hat:"], "👒"], ["1f45f", [":athletic_shoe:"], "👟"], ["1f45e", [":mans_shoe:"], "👞"], ["1f462", [":boot:"], "👢"], ["1f461", [":sandal:"], "👡"], ["1f460", [":high_heel:"], "👠"], ["1f458", [":kimono:"], "👘"], ["1f459", [":bikini:"], "👙"], ["1f457", [":dress:"], "👗"], ["1f454", [":necktie:"], "👔"], ["1f456", [":jeans:"], "👖"], ["1f9c0", [":cheese:", ":cheese_wedge:"], "🧀"], ["1f455", [":shirt:"], "👕"], ["1f45a", [":womans_clothes:"], "👚"], ["1f46a", [":family:"], "👪"], ["1f48f", [":couplekiss:"], "💏"], ["1f491", [":couple_with_heart:"], "💑"], ["1f38c", [":crossed_flags:"], "🎌"], ["1f46c", [":two_men_holding_hands:"], "👬"], ["1f46d", [":two_women_holding_hands:"], "👭"], ["1f46b", [":couple:"], "👫"], ["1f3c3", [":person_running:", ":runner:"], "🏃"], ["1f6b6", [":person_walking:", ":walking:"], "🚶"], ["1f46f", [":people_with_bunny_ears_partying:", ":dancers:"], "👯"], ["1f57a", [":man_dancing:", ":male_dancer:"], "🕺"], ["1f483", [":dancer:"], "💃"], ["1f95a", [":egg:"], "🥚"], ["1f486", [":person_getting_massage:", ":massage:"], "💆"], ["1f487", [":person_getting_haircut:", ":haircut:"], "💇"], ["1f64d", [":person_frowning:"], "🙍"], ["1f64e", [":person_pouting:", ":person_with_pouting_face:"], "🙎"], ["1f937", [":person_shrugging:", ":shrug:"], "🤷"], ["1f926", [":person_facepalming:", ":face_palm:", ":facepalm:"], "🤦"], ["1f64b", [":person_raising_hand:", ":raising_hand:"], "🙋"], ["1f646", [":person_gesturing_ok:", ":ok_woman:"], "🙆"], ["1f645", [":person_gesturing_no:", ":no_good:"], "🙅"], ["1f481", [":person_tipping_hand:", ":information_desk_person:"], "💁"], ["1f647", [":person_bowing:", ":bow:"], "🙇"], ["1f930", [":pregnant_woman:", ":expecting_woman:"], "🤰"], ["1f47c", [":angel:"], "👼"], ["1f935", [":man_in_tuxedo:"], "🤵"], ["1f470", [":bride_with_veil:"], "👰"], ["1f934", [":prince:"], "🤴"], ["1f478", [":princess:"], "👸"], ["1f385", [":santa:"], "🎅"], ["1f936", [":mrs_claus:", ":mother_christmas:"], "🤶"], ["1f373", [":cooking:"], "🍳"], ["1f482", [":guard:", ":guardsman:"], "💂"], ["1f477", [":construction_worker:"], "👷"], ["1f46e", [":police_officer:", ":cop:"], "👮"], ["1f473", [":person_wearing_turban:", ":man_with_turban:"], "👳"], ["1f472", [":man_with_chinese_cap:", ":man_with_gua_pi_mao:"], "👲"], ["1f475", [":older_woman:", ":grandma:"], "👵"], ["1f474", [":older_man:"], "👴"], ["1f471", [":blond_haired_person:", ":person_with_blond_hair:"], "👱"], ["1f469", [":woman:"], "👩"], ["1f468", [":man:"], "👨"], ["1f467", [":girl:"], "👧"], ["1f466", [":boy:"], "👦"], ["1f476", [":baby:"], "👶"], ["1f465", [":busts_in_silhouette:"], "👥"], ["1f464", [":bust_in_silhouette:"], "👤"], ["1f953", [":bacon:"], "🥓"], ["1f440", [":eyes:"], "👀"], ["1f95e", [":pancakes:"], "🥞"], ["1f463", [":footprints:"], "👣"], ["1f443", [":nose:"], "👃"], ["1f442", [":ear:"], "👂"], ["1f445", [":tongue:"], "👅"], ["1f444", [":lips:"], "👄"], ["1f48b", [":kiss:"], "💋"], ["1f484", [":lipstick:"], "💄"], ["1f48d", [":ring:"], "💍"], ["1f485", [":nail_care:"], "💅"], ["1f933", [":selfie:"], "🤳"], ["1f6b5", [":person_mountain_biking:", ":mountain_bicyclist:"], "🚵"], ["1f364", [":fried_shrimp:"], "🍤"], ["1f357", [":poultry_leg:"], "🍗"], ["1f356", [":meat_on_bone:"], "🍖"], ["1f355", [":pizza:"], "🍕"], ["1f32d", [":hotdog:", ":hot_dog:"], "🌭"], ["1f595", [":middle_finger:", ":reversed_hand_with_middle_finger_extended:"], "🖕"], ["1f4aa", [":muscle:"], "💪"], ["1f919", [":call_me:", ":call_me_hand:"], "🤙"], ["1f44b", [":wave:"], "👋"], ["1f596", [":vulcan:", ":raised_hand_with_part_between_middle_and_ring_fingers:"], "🖖"], ["1f354", [":hamburger:"], "🍔"], ["1f91a", [":raised_back_of_hand:", ":back_of_hand:"], "🤚"], ["1f35f", [":fries:"], "🍟"], ["1f959", [":stuffed_flatbread:", ":stuffed_pita:"], "🥙"], ["1f32e", [":taco:"], "🌮"], ["1f32f", [":burrito:"], "🌯"], ["1f957", [":salad:", ":green_salad:"], "🥗"], ["1f374", [":fork_and_knife:"], "🍴"], ["1f958", [":shallow_pan_of_food:", ":paella:"], "🥘"], ["1f35d", [":spaghetti:"], "🍝"], ["1f35c", [":ramen:"], "🍜"], ["1f372", [":stew:"], "🍲"], ["1f365", [":fish_cake:"], "🍥"], ["1f363", [":sushi:"], "🍣"], ["1f447", [":point_down:"], "👇"], ["1f446", [":point_up_2:"], "👆"], ["1f449", [":point_right:"], "👉"], ["1f448", [":point_left:"], "👈"], ["1f44c", [":ok_hand:"], "👌"], ["1f918", [":metal:", ":sign_of_the_horns:"], "🤘"], ["1f6b4", [":person_biking:", ":bicyclist:"], "🚴"], ["1f371", [":bento:"], "🍱"], ["1f35b", [":curry:"], "🍛"], ["1f359", [":rice_ball:"], "🍙"], ["1f35a", [":rice:"], "🍚"], ["1f358", [":rice_cracker:"], "🍘"], ["1f91e", [":fingers_crossed:", ":hand_with_index_and_middle_finger_crossed:"], "🤞"], ["1f91c", [":right_facing_fist:", ":right_fist:"], "🤜"], ["1f91b", [":left_facing_fist:", ":left_fist:"], "🤛"], ["1f362", [":oden:"], "🍢"], ["1f361", [":dango:"], "🍡"], ["1f367", [":shaved_ice:"], "🍧"], ["1f368", [":ice_cream:"], "🍨"], ["1f366", [":icecream:"], "🍦"], ["1f944", [":spoon:"], "🥄"], ["1f44a", [":punch:"], "👊"], ["1f44e", [":thumbsdown:", ":-1:", ":thumbdown:"], "👎"], ["1f44d", [":thumbsup:", ":+1:", ":thumbup:"], "👍"], ["1f91d", [":handshake:", ":shaking_hands:"], "🤝"], ["1f64f", [":pray:"], "🙏"], ["1f44f", [":clap:"], "👏"], ["1f64c", [":raised_hands:"], "🙌"], ["1f450", [":open_hands:"], "👐"], ["1f63e", [":pouting_cat:"], "😾"], ["1f63f", [":crying_cat_face:"], "😿"], ["1f640", [":scream_cat:"], "🙀"], ["1f63d", [":kissing_cat:"], "😽"], ["1f63c", [":smirk_cat:"], "😼"], ["1f63b", [":heart_eyes_cat:"], "😻"], ["1f639", [":joy_cat:"], "😹"], ["1f638", [":smile_cat:"], "😸"], ["1f63a", [":smiley_cat:"], "😺"], ["1f383", [":jack_o_lantern:"], "🎃"], ["1f916", [":robot:", ":robot_face:"], "🤖"], ["1f47e", [":space_invader:"], "👾"], ["1f47d", [":alien:"], "👽"], ["1f480", [":skull:", ":skeleton:"], "💀"], ["1f47b", [":ghost:"], "👻"], ["1f4a9", [":poop:", ":shit:", ":hankey:", ":poo:"], "💩"], ["1f47a", [":japanese_goblin:"], "👺"], ["1f479", [":japanese_ogre:"], "👹"], ["1f47f", [":imp:"], "👿"], ["1f608", [":smiling_imp:"], "😈"], ["1f915", [":head_bandage:", ":face_with_head_bandage:"], "🤕"], ["1f912", [":thermometer_face:", ":face_with_thermometer:"], "🤒"], ["1f637", [":mask:"], "😷"], ["1f927", [":sneezing_face:", ":sneeze:"], "🤧"], ["1f922", [":nauseated_face:", ":sick:"], "🤢"], ["1f910", [":zipper_mouth:", ":zipper_mouth_face:"], "🤐"], ["1f62c", [":grimacing:"], "😬"], ["1f925", [":lying_face:", ":liar:"], "🤥"], ["1f914", [":thinking:", ":thinking_face:"], "🤔"], ["1f644", [":rolling_eyes:", ":face_with_rolling_eyes:"], "🙄"], ["1f634", [":sleeping:"], "😴"], ["1f62a", [":sleepy:"], "😪"], ["1f613", [":sweat:"], "😓"], ["1f62d", [":sob:"], "😭"], ["1f924", [":drooling_face:", ":drool:"], "🤤"], ["1f625", [":disappointed_relieved:"], "😥"], ["1f622", [":cry:"], "😢"], ["1f630", [":cold_sweat:"], "😰"], ["1f370", [":cake:"], "🍰"], ["1f1ff", [":regional_indicator_z:"], "🇿"], ["1f1fe", [":regional_indicator_y:"], "🇾"], ["1f1fd", [":regional_indicator_x:"], "🇽"], ["1f3c7", [":horse_racing:"], "🏇"], ["1f3fb", [":tone1:"], "🏻"], ["1f3fc", [":tone2:"], "🏼"], ["1f3fd", [":tone3:"], "🏽"], ["1f3fe", [":tone4:"], "🏾"], ["1f3ff", [":tone5:"], "🏿"], ["1f1fc", [":regional_indicator_w:"], "🇼"], ["1f1fb", [":regional_indicator_v:"], "🇻"], ["1f1fa", [":regional_indicator_u:"], "🇺"], ["1f1f9", [":regional_indicator_t:"], "🇹"], ["1f1f8", [":regional_indicator_s:"], "🇸"], ["1f1f7", [":regional_indicator_r:"], "🇷"], ["1f1f6", [":regional_indicator_q:"], "🇶"], ["1f1f5", [":regional_indicator_p:"], "🇵"], ["1f1f4", [":regional_indicator_o:"], "🇴"], ["1f1f3", [":regional_indicator_n:"], "🇳"], ["1f1f2", [":regional_indicator_m:"], "🇲"], ["1f1f1", [":regional_indicator_l:"], "🇱"], ["1f1f0", [":regional_indicator_k:"], "🇰"], ["1f1ef", [":regional_indicator_j:"], "🇯"], ["1f1ee", [":regional_indicator_i:"], "🇮"], ["1f1ed", [":regional_indicator_h:"], "🇭"], ["1f1ec", [":regional_indicator_g:"], "🇬"], ["1f1eb", [":regional_indicator_f:"], "🇫"], ["1f1ea", [":regional_indicator_e:"], "🇪"], ["1f1e9", [":regional_indicator_d:"], "🇩"], ["1f1e8", [":regional_indicator_c:"], "🇨"], ["1f1e7", [":regional_indicator_b:"], "🇧"], ["1f1e6", [":regional_indicator_a:"], "🇦"], ["1f382", [":birthday:"], "🎂"], ["1f36e", [":custard:", ":pudding:", ":flan:"], "🍮"], ["1f36d", [":lollipop:"], "🍭"], ["1f36c", [":candy:"], "🍬"], ["1f36b", [":chocolate_bar:"], "🍫"], ["1f37f", [":popcorn:"], "🍿"], ["1f369", [":doughnut:"], "🍩"], ["1f36a", [":cookie:"], "🍪"], ["1f95b", [":milk:", ":glass_of_milk:"], "🥛"], ["1f37c", [":baby_bottle:"], "🍼"], ["1f628", [":fearful:"], "😨"], ["1f631", [":scream:"], "😱"], ["1f633", [":flushed:"], "😳"], ["1f928", [":face_with_raised_eyebrow:"], "🤨"], ["1f929", [":star_struck:"], "🤩"], ["1f92a", [":crazy_face:"], "🤪"], ["1f92b", [":shushing_face:"], "🤫"], ["1f92c", [":face_with_symbols_over_mouth:"], "🤬"], ["1f92d", [":face_with_hand_over_mouth:"], "🤭"], ["1f92e", [":face_vomiting:"], "🤮"], ["1f92f", [":exploding_head:"], "🤯"], ["1f9d0", [":face_with_monocle:"], "🧐"], ["1f9d1", [":adult:"], "🧑"], ["1f9d2", [":child:"], "🧒"], ["1f9d3", [":older_adult:"], "🧓"], ["1f9d4", [":bearded_person:"], "🧔"], ["1f9d5", [":woman_with_headscarf:"], "🧕"], ["1f9e0", [":brain:"], "🧠"], ["1f9e2", [":billed_cap:"], "🧢"], ["1f9d9", [":mage:"], "🧙"], ["1f9da", [":fairy:"], "🧚"], ["1f9db", [":vampire:"], "🧛"], ["1f9dc", [":merperson:"], "🧜"], ["1f9dd", [":elf:"], "🧝"], ["1f9de", [":genie:"], "🧞"], ["1f9df", [":zombie:"], "🧟"], ["1f9e3", [":scarf:"], "🧣"], ["1f9e4", [":gloves:"], "🧤"], ["1f9e5", [":coat:"], "🧥"], ["1f9e6", [":socks:"], "🧦"], ["1f91f", [":love_you_gesture:"], "🤟"], ["1f635", [":dizzy_face:"], "😵"], ["1f632", [":astonished:"], "😲"], ["1f62e", [":open_mouth:"], "😮"], ["1f627", [":anguished:"], "😧"], ["1f626", [":frowning:"], "😦"], ["1f932", [":palms_up_together:"], "🤲"], ["1f62f", [":hushed:"], "😯"], ["1f611", [":expressionless:"], "😑"], ["1f610", [":neutral_face:"], "😐"], ["1f636", [":no_mouth:"], "😶"], ["1f621", [":rage:"], "😡"], ["1f620", [":angry:"], "😠"], ["1f624", [":triumph:"], "😤"], ["1f629", [":weary:"], "😩"], ["1f62b", [":tired_face:"], "😫"], ["1f616", [":confounded:"], "😖"], ["1f623", [":persevere:"], "😣"], ["1f641", [":slight_frown:", ":slightly_frowning_face:"], "🙁"], ["1f615", [":confused:"], "😕"], ["1f61f", [":worried:"], "😟"], ["1f614", [":pensive:"], "😔"], ["1f61e", [":disappointed:"], "😞"], ["1f612", [":unamused:"], "😒"], ["1f60f", [":smirk:"], "😏"], ["1f920", [":cowboy:", ":face_with_cowboy_hat:"], "🤠"], ["1f921", [":clown:", ":clown_face:"], "🤡"], ["1f60e", [":sunglasses:"], "😎"], ["1f913", [":nerd:", ":nerd_face:"], "🤓"], ["1f917", [":hugging:", ":hugging_face:"], "🤗"], ["1f911", [":money_mouth:", ":money_mouth_face:"], "🤑"], ["1f61b", [":stuck_out_tongue:"], "😛"], ["1f61d", [":stuck_out_tongue_closed_eyes:"], "😝"], ["1f61c", [":stuck_out_tongue_winking_eye:"], "😜"], ["1f60b", [":yum:"], "😋"], ["1f61a", [":kissing_closed_eyes:"], "😚"], ["1f619", [":kissing_smiling_eyes:"], "😙"], ["1f617", [":kissing:"], "😗"], ["1f618", [":kissing_heart:"], "😘"], ["1f60d", [":heart_eyes:"], "😍"], ["1f60c", [":relieved:"], "😌"], ["1f609", [":wink:"], "😉"], ["1f643", [":upside_down:", ":upside_down_face:"], "🙃"], ["1f642", [":slight_smile:", ":slightly_smiling_face:"], "🙂"], ["1f607", [":innocent:"], "😇"], ["1f60a", [":blush:"], "😊"], ["1f375", [":tea:"], "🍵"], ["1f923", [":rofl:", ":rolling_on_the_floor_laughing:"], "🤣"], ["1f602", [":joy:"], "😂"], ["1f605", [":sweat_smile:"], "😅"], ["1f606", [":laughing:", ":satisfied:"], "😆"], ["1f601", [":grin:"], "😁"], ["1f604", [":smile:"], "😄"], ["1f603", [":smiley:"], "😃"], ["1f600", [":grinning:"], "😀"], ["1f6a3", [":person_rowing_boat:", ":rowboat:"], "🚣"], ["1f376", [":sake:"], "🍶"], ["1f37a", [":beer:"], "🍺"], ["1f37b", [":beers:"], "🍻"], ["1f942", [":champagne_glass:", ":clinking_glass:"], "🥂"], ["1f37e", [":champagne:", ":bottle_with_popping_cork:"], "🍾"], ["1f379", [":tropical_drink:"], "🍹"], ["1f378", [":cocktail:"], "🍸"], ["1f377", [":wine_glass:"], "🍷"], ["1f943", [":tumbler_glass:", ":whisky:"], "🥃"], ["1f333", [":deciduous_tree:"], "🌳"], ["2757", [":exclamation:"], "❗"], ["2754", [":grey_question:"], "❔"], ["2753", [":question:"], "❓"], ["2795", [":heavy_plus_sign:"], "➕"], ["2796", [":heavy_minus_sign:"], "➖"], ["2797", [":heavy_division_sign:"], "➗"], ["270a", [":fist:"], "✊"], ["2728", [":sparkles:"], "✨"], ["270b", [":raised_hand:"], "✋"], ["2b1c", [":white_large_square:"], "⬜"], ["2b1b", [":black_large_square:"], "⬛"], ["25fd", [":white_medium_small_square:"], "◽"], ["25fe", [":black_medium_small_square:"], "◾"], ["26ab", [":black_circle:"], "⚫"], ["2705", [":white_check_mark:"], "✅"], ["26aa", [":white_circle:"], "⚪"], ["27bf", [":loop:"], "➿"], ["27b0", [":curly_loop:"], "➰"], ["23ec", [":arrow_double_down:"], "⏬"], ["23eb", [":arrow_double_up:"], "⏫"], ["23ea", [":rewind:"], "⏪"], ["2693", [":anchor:"], "⚓"], ["23e9", [":fast_forward:"], "⏩"], ["267f", [":wheelchair:"], "♿"], ["274e", [":negative_squared_cross_mark:"], "❎"], ["26bd", [":soccer:"], "⚽"], ["26d4", [":no_entry:"], "⛔"], ["2b55", [":o:"], "⭕"], ["2653", [":pisces:"], "♓"], ["2755", [":grey_exclamation:"], "❕"], ["2651", [":capricorn:"], "♑"], ["2650", [":sagittarius:"], "♐"], ["2649", [":taurus:"], "♉"], ["2648", [":aries:"], "♈"], ["26be", [":baseball:"], "⚾"], ["274c", [":x:"], "❌"], ["264f", [":scorpius:"], "♏"], ["264e", [":libra:"], "♎"], ["264d", [":virgo:"], "♍"], ["264c", [":leo:"], "♌"], ["264b", [":cancer:"], "♋"], ["264a", [":gemini:"], "♊"], ["26ce", [":ophiuchus:"], "⛎"], ["2615", [":coffee:"], "☕"], ["2614", [":umbrella:"], "☔"], ["26c4", [":snowman:"], "⛄"], ["26c5", [":partly_sunny:"], "⛅"], ["26a1", [":zap:"], "⚡"], ["26f3", [":golf:"], "⛳"], ["2b50", [":star:"], "⭐"], ["23f3", [":hourglass_flowing_sand:"], "⏳"], ["231b", [":hourglass:"], "⌛"], ["23f0", [":alarm_clock:"], "⏰"], ["231a", [":watch:"], "⌚"], ["26ea", [":church:"], "⛪"], ["26fa", [":tent:"], "⛺"], ["26f2", [":fountain:"], "⛲"], ["26fd", [":fuelpump:"], "⛽"], ["26f5", [":sailboat:"], "⛵"], ["2652", [":aquarius:"], "♒"]];

/***/ }),
/* 13 */
/*!************************************************************!*\
  !*** ./~/react-emojione/lib/renderers/unicode-renderer.js ***!
  \************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _emojiFormatConversion = __webpack_require__(/*! ../utils/emoji-format-conversion */ 11);
	
	var getRenderer = function getRenderer() {
	  return function (codepoint) {
	    return _emojiFormatConversion.codepointToUnicode.get(codepoint);
	  };
	};
	
	exports.default = getRenderer;

/***/ }),
/* 14 */
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _chatapp = __webpack_require__(/*! ../chatapp */ 15);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var App = function (_Component) {
	  _inherits(App, _Component);
	
	  function App() {
	    _classCallCheck(this, App);
	
	    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
	  }
	
	  _createClass(App, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(_chatapp.Chatapp, { authenticated: 'true', MainRoom: 'Global Chat', servername: 'SlaBot', welcomemessage: 'Welcome to ChatApp (^=^)', uri: 'localhost:9000', hardpath: '/socket.io', reconnect: 'true', resource: '/', secure: 'false' });
	    }
	  }]);
	
	  return App;
	}(_react.Component);
	
	exports.default = App;

/***/ }),
/* 15 */
/*!********************!*\
  !*** ./chatapp.js ***!
  \********************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _socketIo = __webpack_require__(/*! ./socket.io/socket.io.js */ 3);
	
	var _socketIo2 = _interopRequireDefault(_socketIo);
	
	var _reactEmojione = __webpack_require__(/*! react-emojione */ 4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*I am really hacking this into react!*/
	//import params from "./config/config.js"
	
	
	//This function takes params from the configuration.
	//TODO this can be cleaned up a bit better
	
	
	// I wish we could make this conditional , like if user chooses a valid name, then connect...
	var socket = _socketIo2.default.connect();
	
	var Chatapp = function (_React$Component) {
	  _inherits(Chatapp, _React$Component);
	
	  function Chatapp() {
	    _classCallCheck(this, Chatapp);
	
	    var _this = _possibleConstructorReturn(this, (Chatapp.__proto__ || Object.getPrototypeOf(Chatapp)).call(this));
	
	    _this.state = {
	      ChatMessage: "",
	      Messages: [],
	      UsersinChat: [],
	      UpdatesFromServer: []
	    };
	    return _this;
	  }
	
	  _createClass(Chatapp, [{
	    key: "setup",
	    value: function setup() {
	      if (this.props.config) {}
	      //This is probably a bad practice , but at least I get access to make this controllable by props!
	      socket.io.uri = this.props.uri;
	      socket.io.opts.hostname = this.props.hostname;
	      socket.io.opts.path = this.props.hardpath;
	      socket.io.opts.resource = this.props.resource;
	      socket.io.opts.reconnect = this.props.reconnect;
	      socket.io.opts.secure = this.props.secure;
	    }
	  }, {
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      this.setup();
	    }
	  }, {
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      this.RecvMessage();
	      this.RecvUpdateFromServer();
	      this.recvUserListFromServer();
	    }
	  }, {
	    key: "recvUserListFromServer",
	    value: function recvUserListFromServer() {
	      socket.on('user list', function (msg) {
	        console.log("user list " + msg);
	        this.setState({ UsersinChat: msg });
	      }.bind(this));
	    }
	  }, {
	    key: "RecvUpdateFromServer",
	    value: function RecvUpdateFromServer() {
	      socket.on('chat update', function (msg) {
	        var parsedSMessage = JSON.parse(msg);
	        this.setState({ Messages: this.state.Messages.concat({ Username: this.props.servername, Message: parsedSMessage.ServerMessage }) });
	      }.bind(this));
	    }
	  }, {
	    key: "RecvMessage",
	    value: function RecvMessage() {
	      socket.on('chat message', function (msg) {
	        var parsedMessage = JSON.parse(msg);
	        this.setState({ Messages: this.state.Messages.concat({ Username: parsedMessage.Username, Message: parsedMessage.Message }) });
	      }.bind(this));
	    }
	
	    //This just checks if 'Enter' was pressed. then, sets state of Username to the value in box.
	
	  }, {
	    key: "UpdateUserName",
	    value: function UpdateUserName(evt) {
	      if (evt.key === 'Enter') {
	        this.setState({
	          Username: evt.target.value });
	        this.SendUpdate(evt.target.value, evt.target.value + " Has Joined Chat!");
	      }
	    }
	  }, {
	    key: "UpdateMessage",
	    value: function UpdateMessage(evt) {
	      this.setState({
	        ChatMessage: evt.target.value });
	      //	console.log(this.state.ChatMessage)
	    }
	  }, {
	    key: "SendUpdate",
	    value: function SendUpdate(User, ServerMessage) {
	      var username = this.state.Item;
	      socket.emit('chat update', JSON.stringify({ User: User, ServerMessage: ServerMessage }));
	    }
	  }, {
	    key: "SendMessage",
	    value: function SendMessage(e, Username, Message) {
	      e.preventDefault();
	      var username = this.state.Username;
	      var message = this.state.ChatMessage;
	
	      // Check if there message is empty. send if False then send
	      if (message == "") {
	        console.log("Type Something!");
	      } else {
	        socket.emit('chat message', JSON.stringify({ Username: username, Message: message }));
	        //socket.emit('chat message',this.state.Username +": "+ this.state.ChatMessage)
	        //  console.log(this.state.Messages)
	        this.setState({ Messages: this.state.Messages.concat({ Username: username, Message: message }) });
	        this.setState({ ChatMessage: "" });
	      }
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this2 = this;
	
	      if (this.state.Username) {
	        return _react2.default.createElement(
	          "div",
	          { className: "ChatApp" },
	          _react2.default.createElement(
	            "div",
	            { className: "chatNavbar center" },
	            _react2.default.createElement(
	              "h1",
	              null,
	              " ",
	              this.props.welcomemessage
	            )
	          ),
	          _react2.default.createElement(
	            "div",
	            { className: "container center" },
	            _react2.default.createElement(
	              "div",
	              { className: "RoomsList" },
	              _react2.default.createElement(
	                "ul",
	                { className: "ulRooms" },
	                _react2.default.createElement(
	                  "li",
	                  null,
	                  " ",
	                  this.props.MainRoom,
	                  " "
	                )
	              )
	            ),
	            _react2.default.createElement(
	              "div",
	              { className: "UsersList" },
	              _react2.default.createElement(
	                "ul",
	                { className: "ulUsers" },
	                this.state.UsersinChat.map(function (UsersinChat, index) {
	                  return _react2.default.createElement(
	                    "li",
	                    { key: index },
	                    JSON.parse(UsersinChat)['User'],
	                    " "
	                  );
	                })
	              )
	            )
	          ),
	          _react2.default.createElement(
	            "div",
	            { id: "box" },
	            _react2.default.createElement("p", { id: "messages", className: "left" }),
	            this.state.Messages.map(function (message, index) {
	              return _react2.default.createElement(
	                "div",
	                { className: "chatitem", key: index },
	                _react2.default.createElement(
	                  "ul",
	                  null,
	                  _react2.default.createElement(
	                    "div",
	                    { className: "ChatUsername" },
	                    _react2.default.createElement(
	                      "li",
	                      null,
	                      message.Username,
	                      ":"
	                    )
	                  ),
	                  _react2.default.createElement(
	                    "div",
	                    { className: "chatMessage" },
	                    _react2.default.createElement(
	                      "li",
	                      null,
	                      (0, _reactEmojione.emojify)(message.Message)
	                    )
	                  )
	                )
	              );
	            })
	          ),
	          _react2.default.createElement(
	            "div",
	            { className: "sender left" },
	            _react2.default.createElement(
	              "form",
	              { onSubmit: this.SendMessage.bind(this) },
	              " ",
	              _react2.default.createElement("input", { id: "myEmoji", className: "message", autoFocus: true, ref: "ChatInput", autoComplete: "off", value: this.state.ChatMessage, onChange: function onChange(evt) {
	                  return _this2.UpdateMessage(evt);
	                } }),
	              _react2.default.createElement("input", { autoComplete: "off", type: "submit", className: "button", value: "Send" })
	            )
	          )
	        );
	      } else {
	        return _react2.default.createElement(
	          "div",
	          { className: "ChatApp" },
	          _react2.default.createElement(
	            "div",
	            { className: "chatNavbar center" },
	            _react2.default.createElement(
	              "h1",
	              null,
	              this.props.welcomemessage
	            )
	          ),
	          _react2.default.createElement("div", { className: "container center" }),
	          _react2.default.createElement(
	            "div",
	            { id: "box" },
	            _react2.default.createElement("p", { id: "messages", className: "left" }),
	            _react2.default.createElement(
	              "p",
	              null,
	              "Select User name please"
	            ),
	            _react2.default.createElement("input", { className: "chatuserinput", autoFocus: true, ref: "usernameimput", autoComplete: "off", value: this.state.username, onKeyPress: function onKeyPress(evt) {
	                return _this2.UpdateUserName(evt);
	              } })
	          )
	        );
	      }
	    }
	  }]);
	
	  return Chatapp;
	}(_react2.default.Component);
	
	exports.default = Chatapp;

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map