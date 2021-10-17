"use strict";

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

require('./geotabApi');

let api = new GeotabApi(function (detailsCallback) {
  require('./geotabLogin')(api, detailsCallback);
}, {
  rememberMe: true
});
let state = {
  getState: function getState() {
    let hash = location.hash,
        hashLength = hash.length;
    return !hashLength ? {} : rison.decode(location.hash.substring(1, location.hash.length));
  },
  setState: function setState(s) {
    location.hash = Object.keys(s).length ? '#' + rison.encode(s) : '';
  },
  gotoPage: function gotoPage(page, args) {
    let getUrl = function getUrl(targetClass, targetState) {
      let lcClassHtml = location.pathname.replace(/\./g, '/').toLowerCase(),
          url = document.URL,
          pos = url.toLowerCase().indexOf(lcClassHtml),
          encodedState = targetState ? '#' + rison.encode(targetState) : '';

      if (targetClass.indexOf('.') === -1) {
        targetClass = 'geotab.checkmate.ui.' + targetClass;
      } // This is the default scheme for standalone pages.


      targetClass = targetClass.replace(/\./g, '/');

      if (targetClass.toLowerCase() === lcClassHtml) {
        //staying on the same page - just replace hash component
        return url.replace(/\.html.*$/i, '.html' + encodedState);
      }

      return url.slice(0, pos) + targetClass + '.html' + encodedState;
    };

    window.location = getUrl(page, args);
  },
  hasAccessToPage: function hasAccessToPage(page) {
    return !!page;
  },
  getGroupFilter: function getGroupFilter() {
    return [{
      id: 'GroupCompanyId'
    }];
  }
};
Object.keys(geotab.addin).forEach(function (name) {
  let addin = geotab.addin[name];

  if (addin.isInitialize) {
    addin.focus(api, state);
  } else {
    addin = typeof addin === 'function' ? geotab.addin[name] = addin(api, state) : addin;
    addin.initialize(api, state, function () {
      addin.isInitialize = true;
      addin.focus(api, state);
    });
  }
});