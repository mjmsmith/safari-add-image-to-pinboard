function onContextMenu(event) {
}

function onValidate(event) {
  if (!event.userInfo) {
    event.target.disabled = true;
  }
}

function onCommand(event) {
  var title = event.userInfo.alt || event.userInfo.documentTitle;
  var tab = safari.application.openBrowserWindow().activeTab;

  tab.url = "https://pinboard.in/add" +
            "?url=" + encodeURIComponent(event.userInfo.src) +
            "&title=" + encodeURIComponent(title) +
            "&description=[source " + encodeURIComponent(event.userInfo.baseURI) + "]" +
            "&tags=" + encodeURIComponent(safari.extension.settings.defaultTags + " ") +
            "&extz=com.camazotz.addimagetopinboard";
}

function onMessage(event) {
  if (event.name === "getSettings") {
    event.target.page.dispatchMessage("setSettings", {
      windowWidth: safari.extension.settings.windowWidth,
      windowHeight: safari.extension.settings.windowHeight
    });
  }
}

safari.application.addEventListener("contextmenu", onContextMenu, false);
safari.application.addEventListener("validate", onValidate, false);
safari.application.addEventListener("command", onCommand, false);
safari.application.addEventListener("message", onMessage, false);