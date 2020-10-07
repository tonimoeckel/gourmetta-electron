const { remote, ipcRenderer } = require('electron');
const { handleForm} = remote.require('./index');

const currentWindow = remote.getCurrentWindow();

const submitFormButton = document.querySelector("#form");
const responseParagraph = document.getElementById('response')

document.getElementById("username").value = localStorage.getItem("username");
document.getElementById("password").value = localStorage.getItem("password");

submitFormButton.addEventListener("submit", function(event){
    event.preventDefault();   // stop the form from submitting
    responseParagraph.innerHTML = `Bitte warten...`
    const credentials = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };
    localStorage.setItem("username", credentials.username);
    localStorage.setItem("password", credentials.password);

    handleForm(currentWindow, credentials)
});

ipcRenderer.on('form-received', function(event, args){
    if (args){

        responseParagraph.innerHTML = `Datei erstellt: ${args}`

    }
    /*
        you could choose to submit the form here after the main process completes
        and use this as a processing step
    */
});
