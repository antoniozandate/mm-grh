"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mygeotabContext = require("./mygeotab-context");

Object.keys(_mygeotabContext).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _mygeotabContext[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _mygeotabContext[key];
    }
  });
});