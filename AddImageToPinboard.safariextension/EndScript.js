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
      window.resizeTo((parseInt(settings.windowWidth, 10) || 700),
                      (parseInt(settings.windowHeight, 10) || 550));
   }
}

if (/&extz=com[.]camazotz[.]addimagetopinboard$/.test(document.documentURI)) {
  safari.self.addEventListener("message", onMessage, false);
  safari.self.tab.dispatchMessage("getSettings");
}
else if (/pinboard[.]in[/]add$/.test(document.documentURI)) {
  var i = 0;
  var children = document.body.children;

  while (i < children.length && children[i].nodeName === "SCRIPT") {
    ++i;
  }

  if (i === document.body.children.length) {
    safari.self.tab.dispatchMessage("closeWindow");
  }
}
else {
  document.addEventListener("contextmenu", onContextMenu, false);
}
