"use strict";

module.exports = function (api, authenticationCallback) {
  const loginString = '<div id="loginDialog" style="position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: 999999; background: rgba(0, 0, 0, 0.75); color: #fff;"><form style="margin: auto; width: 175px; height: 180px; position: absolute; top: 0; bottom: 0; left: 0; right: 0;"><div><label for="email">Email</label><input type="text" id="email" placeholder="Your email address"></div><div><label for="password">Password</label><input type="password" id="password" placeholder="Password"></div><div><label for="server">Server</label><input type="text" id="server" placeholder="Server name"></div><div><label for="database">Database</label><input type="text" id="database" placeholder="The database name"></div><div><button id="loginBtn">Login</button></div></form></div>';

  const elementGenerator = domString => {
    let html = new DOMParser().parseFromString(domString, 'text/html');
    return html.body.firstChild;
  };

  const addDialog = () => {
    const loginElement = elementGenerator(loginString);
    document.body.appendChild(loginElement);
    const elLoginDialog = document.querySelector('#loginDialog');
    const elLoginBtn = elLoginDialog.querySelector('#loginBtn');
    const elEmail = elLoginDialog.querySelector('#email');
    const elPassword = elLoginDialog.querySelector('#password');
    const elServer = elLoginDialog.querySelector('#server');
    const elDatabase = elLoginDialog.querySelector('#database');
    elLoginBtn.addEventListener('click', event => {
      let server = elServer.value || 'my.geotab.com',
          database = elDatabase.value,
          email = elEmail.value,
          password = elPassword.value;
      event.preventDefault();
      api.user = email;
      authenticationCallback(server, database, email, password, function (err) {
        if (err) {
          alert(err);
          addDialog();
        }
      });
      document.body.removeChild(loginElement);
    });
  };

  if (!document.getElementById('loginDialog')) {
    addDialog();
  }
};