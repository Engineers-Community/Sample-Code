const { app, BrowserWindow, shell } = require("electron");
const path = require("path");
let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // load the index.html of the app.
  win.loadFile("index.html");

  // Open the DevTools.
  win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on("closed", () => {
    win = null;
  });
}

app.on("ready", createWindow);

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("will-finish-launching", () => {
  app.on("open-url", (event, url) => {
    event.preventDefault();
    const gitBashPath = path.join(
      process.env.LOCALAPPDATA,
      "Programs/Git/git-bash.exe"
    );
    shell.openItem(gitBashPath);
  });
});
