"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MyGeotabProvider = MyGeotabProvider;
exports.useMyGeotab = useMyGeotab;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var React = _interopRequireWildcard(require("react"));

var _geotabService = require("./MyGeotab/geotabService");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const MyGeotabContext = /*#__PURE__*/React.createContext();

function mygeotabReducer(state, action) {
  switch (action.type) {
    case 'getApi':
      {
        return state;
      }

    case 'setApi':
      {
        state = action.payload;
        return state;
      }

    default:
      {
        throw new Error("Unhandled action type: ".concat(action.type));
      }
  }
}

function MyGeotabProvider(_ref) {
  let {
    children
  } = _ref;
  const [state, dispatch] = React.useReducer(mygeotabReducer, null);

  const setApi = _api => dispatch({
    type: 'setApi',
    payload: _api
  });

  const value = [state, setApi];
  return /*#__PURE__*/React.createElement(MyGeotabContext.Provider, {
    value: value
  }, children);
}

function useMyGeotab(_ref2) {
  let {
    addinName,
    production
  } = _ref2;
  const context = React.useContext(MyGeotabContext);
  const [api, setApi] = context;
  React.useEffect(() => {
    async function initApi() {
      try {
        const geotabService = new _geotabService.GeotabService();
        const apiRef = await geotabService.init(addinName, production);
        apiRef.getSession((credentials, server) => {
          if (credentials.database && server) {
            setApi(apiRef);
          }
        });
      } catch (error) {}
    }

    if (!api) initApi();
  }, []);

  if (context === undefined) {
    throw new Error('useMyGeotab must be used within a MyGeotabProvider');
  }

  return context;
}