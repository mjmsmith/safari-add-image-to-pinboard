var settings = {};

function onContextMenu(event) {
  if (event.target.nodeName === "IMG") {
    safari.self.tab.setContextMenuEventUserInfo(event, {
      alt: event.target.alt,
      baseURI: event.target.baseURI,
      src: event.target.src,
      documentTitle: document.title 
    });
  }
}

function onMessage(event) {
   if (event.name === "setSettings") {
      settings = event.message;
      window.resizeTo((parseInt(settings.windowWidth, 10) || 500),
                      (parseInt(settings.windowHeight, 10) || 750));
   }
}

if (/&extz=com.camazotz.addimagetopinboard$/.test(document.documentURI)) {
  safari.self.addEventListener("message", onMessage, false);
  safari.self.tab.dispatchMessage("getSettings");
}
else {
  document.addEventListener("contextmenu", onContextMenu, false);
}