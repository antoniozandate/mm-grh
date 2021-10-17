"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeotabService = void 0;

require("core-js/modules/es.promise.js");

let geotabApiReference;

class GeotabService {
  init(addinName, prod) {
    require('./geotabChecker')(prod);

    return new Promise((resolve, reject) => {
      if (geotabApiReference) {
        resolve(geotabApiReference);
      } else {
        if (geotab && !geotab.addin[addinName]) {
          geotab.addin[addinName] = function (api, state) {
            return {
              initialize: function initialize(api, state, callback) {
                geotabApiReference = api;
                callback();
                resolve(geotabApiReference);
              },
              focus: function focus() {// User interface is available
              },
              blur: function blur() {// Save any addin state
              }
            };
          };

          if (!prod) {
            require('./geotabInitializer');
          }
        }
      }
    });
  }

}

exports.GeotabService = GeotabService;