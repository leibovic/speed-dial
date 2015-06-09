"use strict";

const { classes: Cc, interfaces: Ci, utils: Cu } = Components;

Cu.import("resource://gre/modules/Home.jsm");
Cu.import("resource://gre/modules/HomeProvider.jsm");
Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/Task.jsm");

// Make these IDs unique, preferably tied to a domain that you own.
const PANEL_ID = "speed.dial@androidzeitgeist.com";
const DATASET_ID = "speed.dial@androidzeitgeist.com";

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
  function getRandomColor() {
    let letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  let icons = [
    "http://people.mozilla.org/~mleibovic/icons/sun.png",
    "http://people.mozilla.org/~mleibovic/icons/waves.png",
    "http://people.mozilla.org/~mleibovic/icons/tram.png"
  ];
  function getRandomIcon() {
    return icons[Math.floor(Math.random() * 3)];
  }

  let backgrounds = [
    "http://fennec.androidzeitgeist.com/speeddial/background01.png",
    "http://fennec.androidzeitgeist.com/speeddial/background02.png",
    "http://fennec.androidzeitgeist.com/speeddial/background03.png",
    "http://fennec.androidzeitgeist.com/speeddial/background04.png",
    "http://fennec.androidzeitgeist.com/speeddial/background05.png"
  ];
  function getRandomBackground() {
    return backgrounds[Math.floor(Math.random() * 5)];
  }

  let items = [];
  for (let i = 0; i < 18; i++) {
    let item = {
        url: "http://example.com/" + i,
        title: "Example " + i,
        image_url: getRandomIcon(),
    };

    let showBackground = Math.random() >= 0.7;
    if (showBackground) {
        item.background_url = getRandomBackground();
    } else {
        item.bgcolor = getRandomColor();
    }

    items.push(item);
  }

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
