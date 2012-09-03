var onMessage = chrome.extension.onMessage || chrome.extension.onRequest;
var sendMessage = chrome.tabs.sendMessage || chrome.tabs.sendRequest;

onMessage.addListener(function(request, sender, sendResponse) {
    //console.log('msg');
    if (request.id === 'run') {
        sendMessage(sender.tab.id, {id:"tabrun", js:request.js});
    } else if (request.id === 'print') {
        sendMessage(sender.tab.id, {id:"tabprint", str:request.str});
    } else if (request.id === 'clear') {
        sendMessage(sender.tab.id, {id:"tabclear"});
    } else if (request.id === 'toggle') {
        sendMessage(sender.tab.id, {id:"tabtoggle"});
    }
});