"use strict";

const { classes: Cc, interfaces: Ci, utils: Cu } = Components;

Cu.import("resource://gre/modules/Home.jsm");
Cu.import("resource://gre/modules/HomeProvider.jsm");
Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/Task.jsm");

// Make these IDs unique, preferably tied to a domain that you own.
const PANEL_ID = "speed.dial@margaretleibovic.com";
const DATASET_ID = "speed.dial@margaretleibovic.com";

function optionsCallback() {
  return {
    title: "Speed dial",
    views: [{
      dataset: DATASET_ID,
      type: Home.panels.View.WEB,
      url: "https://mozilla.org"
    }],
    default: true,
    position: 3
  };
}

/**
 * bootstrap.js API
 * https://developer.mozilla.org/en-US/Add-ons/Bootstrapped_extensions
 */
function startup(data, reason) {
  Home.panels.register(PANEL_ID, optionsCallback);

  if (reason == ADDON_INSTALL || reason == ADDON_ENABLE) {
    Home.panels.install(PANEL_ID);
  }
}

function shutdown(data, reason) {
  if (reason == ADDON_UNINSTALL || reason == ADDON_DISABLE) {
    Home.panels.uninstall(PANEL_ID);
  }

  Home.panels.unregister(PANEL_ID);
}

function install(data, reason) {}

function uninstall(data, reason) {}
