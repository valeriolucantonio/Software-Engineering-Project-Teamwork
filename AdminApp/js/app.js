var app = app || {};
  var ENTER_KEY = 13;

  $(function() {

    // Kick things off by creating the **App**.
    //new app.AppView();
   Parse.initialize("XQHAjjNapBF4mGOBO8WjsmS4fWSczsF7ArUNrGwW", "lkiax9JJi7MRsJTikHiXAJbpviXVwBf25tGpnxBD");

    new app.TabView();
  });