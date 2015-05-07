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
      type: Home.panels.View.GRID,
      itemType: Home.panels.Item.ICON,
    }],
    default: true,
    position: 3
  };
}

let createDataset = Task.async(function* () {
  let items = [
    {
      url: "http://example.com/1",
      title: "First Example",
      image_url: "chrome://speeddial/content/icons/1.jpg"
    },
    {
      url: "http://example.com/2",
      title: "Second Example",
      image_url: "chrome://speeddial/content/icons/2.jpg"
    },
    {
      url: "http://example.com/3",
      title: "Third Example",
      image_url: "chrome://speeddial/content/icons/3.jpg"
    },
    {
      url: "http://example.com/4",
      title: "Fourth Example",
      image_url: "chrome://speeddial/content/icons/4.jpg"
    },
    {
      url: "http://example.com/5",
      title: "Fifth Example",
      image_url: "chrome://speeddial/content/icons/5.jpg"
    },
    {
      url: "http://example.com/6",
      title: "Sixth Example",
      image_url: "chrome://speeddial/content/icons/6.jpg"
    },
  ];

  yield HomeProvider.getStorage(DATASET_ID).save(items);
});

let deleteDataset = Task.async(function* () {
  yield HomeProvider.getStorage(DATASET_ID).deleteAll();
});

/**
 * bootstrap.js API
 * https://developer.mozilla.org/en-US/Add-ons/Bootstrapped_extensions
 */
function startup(data, reason) {
  Home.panels.register(PANEL_ID, optionsCallback);

  if (reason == ADDON_INSTALL || reason == ADDON_ENABLE) {
    Home.panels.install(PANEL_ID);
    createDataset();
  }
}

function shutdown(data, reason) {
  if (reason == ADDON_UNINSTALL || reason == ADDON_DISABLE) {
    Home.panels.uninstall(PANEL_ID);
    deleteDataset();
  }

  Home.panels.unregister(PANEL_ID);
}

function install(data, reason) {}

function uninstall(data, reason) {}
