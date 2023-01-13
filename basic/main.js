// main.js
const { app, BrowserWindow } = require("electron");
const edge = require("electron-edge-js");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadFile("index.html");
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});

const exePath = "C:\\path\\to\\exe\\file.exe";
const start = edge.func(`
    using System.Diagnostics;
    using System.Threading.Tasks;

    class Startup
    {
        public async Task<object> Invoke(string exePath)
        {
            var process = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = exePath,
                    UseShellExecute = true,
                    CreateNoWindow = false
                }
            };
            process.Start();
            return null;
        }
    }
`);

start(exePath, (error, result) => {
  if (error) throw error;
});
