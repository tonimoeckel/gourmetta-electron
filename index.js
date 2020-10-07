const { app, BrowserWindow } = require('electron')
var GourmettaParser = require("gourmetta-parser").default;

function createWindow () {
    // Erstelle das Browser-Fenster.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    })

    // und lade den Inhalt von index.html.
    win.loadFile('index.html')
    // win.webContents.openDevTools();


}

exports.handleForm = function handleForm(targetWindow, credentials) {

    const {username, password} = credentials;

    const parser = new GourmettaParser({username, password});

    parser.fetch().then((res) => {
        const filename = `${app.getAppPath()}/gourmetta-export-${new Date().toLocaleDateString().replace(/\//g,'_')}.xlsx`;
        const xlsx = parser.generateExcel(res, filename)
        targetWindow.webContents.send('form-received', filename);
    })

};


app.whenReady().then(createWindow)
