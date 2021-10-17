"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _mygeotabContext = require("./mygeotab-context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function App() {
  const [api] = (0, _mygeotabContext.useMyGeotab)({
    addinName: 'test',
    production: false
  });
  const [devices, setDevices] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    async function getDevices() {
      const devs = await api.callAsync('Get', {
        typeName: 'Device'
      });
      setDevices(devs);
    }

    if (api !== null) getDevices();
  }, [api]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "App"
  }, /*#__PURE__*/_react.default.createElement("header", {
    className: "App-header"
  }, /*#__PURE__*/_react.default.createElement("h1", null, "Geotab app"), devices.map(dev => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("p", null, dev.name)))));
}

_reactDom.default.render( /*#__PURE__*/_react.default.createElement(_mygeotabContext.MyGeotabProvider, null, /*#__PURE__*/_react.default.createElement(App, null)), document.getElementById('root'));