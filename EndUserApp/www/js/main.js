// here we put the paths to all the libraries and framework we will use
require.config({
  paths: {
    jquery: '../lib/zepto/zepto', // ../lib/jquery/jquery', 
    underscore: '../lib/underscore/underscore',
    backbone: "../lib/backbone/backbone",
    text: '../lib/require/text',
    async: '../lib/require/async',
    handlebars: '../lib/handlebars/handlebars',
    templates: '../templates',
    leaflet: '../lib/leaflet/leaflet',
    spin: '../lib/spin/spin.min',
    utils: '../lib/utils/utils',
    parse: '../lib/parse/parse'
  },
  shim: {
    'jquery': {
      exports: '$'
    },
    'underscore': {
      exports: '_'
    },
    'handlebars': {
      exports: 'Handlebars'
    },
    'leaflet': {
      exports: 'L'
    },
    'parse': {
        deps: ['jquery', 'underscore'],
        exports: 'Parse'
      }
  }
});

// We launch the App
require(['underscore', 'backbone', 'utils', 'parse'], function(_, Backbone, Utils, Parse) {
  require(['router'], function(AppRouter) {
    
    document.addEventListener("deviceready", run, false);
    Parse.initialize("XQHAjjNapBF4mGOBO8WjsmS4fWSczsF7ArUNrGwW", "lkiax9JJi7MRsJTikHiXAJbpviXVwBf25tGpnxBD");

    function run() {

      // Here we precompile ALL the templates so that the app will be much quickier when switching views
      // see utils.js
      Utils.loadTemplates().once("templatesLoaded", function() {
        // launch the router
        var router = new AppRouter();
        Backbone.history.start();
      });
    }
  });
});