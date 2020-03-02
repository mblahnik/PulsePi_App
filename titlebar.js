const { remote, ipcRenderer } = require("electron");

$(document).ready(function() {
  if (remote.getCurrentWindow().isMaximized())
    $("#icn").addClass("fa fa-window-restore");
  else $("#icn").addClass("fa fa-window-maximize");

  $("#min-btn").click(function() {
    remote.getCurrentWindow().minimize();
  });

  $("#max-btn").click(function() {
    const currentWindow = remote.getCurrentWindow();

    if (currentWindow.isMaximized()) {
      currentWindow.unmaximize();
      $("#icn")
        .removeClass("fa fa-window-restore")
        .addClass("fa fa-window-maximize");
    } else {
      currentWindow.maximize();
      $("#icn")
        .removeClass("fa fa-window-maximize")
        .addClass("fa fa-window-restore");
    }
  });

  $("#close-btn").click(function() {
    remote.app.quit();
  });
});
