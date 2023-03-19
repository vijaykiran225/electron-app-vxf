/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

async function doClickAction(x) {
    // body...
    let titleInput=document.getElementById("search");
    let responseDiv=document.getElementById("response");
    const title = titleInput.value;
    let response = await window.pipeline.trigger(title);
    responseDiv.innerHTML=response;
}
async function doHttpAction(x) {
    // body...
    let titleInput=document.getElementById("search");
    let responseDiv=document.getElementById("response");
    const title = titleInput.value;
    let response = await window.pipeline.http(title);
    responseDiv.innerHTML=response;
}

document.getElementById("submit").addEventListener("click",doClickAction);
document.getElementById("submitHttp").addEventListener("click",doHttpAction);