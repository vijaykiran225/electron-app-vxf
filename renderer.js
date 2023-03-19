/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

async function doClickAction(x) {
    // body...
    let titleInput = document.getElementById("search");
    let responseDiv = document.getElementById("response");
    const title = titleInput.value;
    let response = await window.pipeline.trigger(title);
    responseDiv.innerHTML = response;
}
async function doHttpAction(x) {
    // body...
    let titleInput = document.getElementById("search");
    let responseDiv = document.getElementById("response");
    const title = titleInput.value;
    let response = await window.pipeline.http(title);
    responseDiv.innerHTML = response;
}

async function mvnBuild(x) {
    // body...
    let titleInput = document.getElementById("services");
    let responseDiv = document.getElementById("response");
    const title = titleInput.value;
    let response = await window.pipeline.mvnBuild(title);
    // responseDiv.innerHTML = response;
}

function parseResponse(x) {
    let y = x.split("\n");
    return y;
    // return y.map(val => val.replace("/Users/vj/Code/java/", "")).filter(val => val != ",");

}

async function fillServices() {
    // body...
    let selectBox = document.getElementById("services");

    let response = await window.pipeline.fillServices("/Users/vj/Code/java");
    let folders = parseResponse(response);
    console.log(folders);

    for (let folderName of folders) {

        let optTag = document.createElement("option");
        optTag.setAttribute("value", folderName)
        const newContent = document.createTextNode(folderName);
        optTag.appendChild(newContent);
        selectBox.appendChild(optTag);
    }
    // responseDiv.innerHTML = response;
}


document.getElementById("submit").addEventListener("click", doClickAction);
document.getElementById("submitHttp").addEventListener("click", doHttpAction);
document.getElementById("mvnBuild").addEventListener("click", mvnBuild);
// document.getElementById("services").addEventListener("click", fillServices);

window.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    fillServices();
});

window.pipeline.handleMvnResponse((_event, value) => {
    let responseDiv = document.getElementById("response");
    console.log("received status in renderer");
    responseDiv.innerHTML = value;
})