var __run__ = __run__ || (function() {
    var sendMessage = chrome.extension.sendMessage || chrome.extension.sendRequest;
    var onMessage = chrome.extension.onMessage || chrome.extension.onRequest;
        
    function init() { 
        $(function() {
            var src = chrome.extension.getURL('frame.html');
            $('body').append(
                "<style>"
                + "#__run_frame {"
                + "    position:fixed;"
                + "    width:100%;"
                + "    height:400px;"
                + "    top:50%;"
                + "    left:0;"
                + "    margin:0;"
                + "    margin-top:-250px;"
                + "    border:0;"
                + "    z-index:50000;"
                + "    display:none;"
                + "}"
                + "</style>"
                + "<iframe id='__run_frame' src='" + src + "'></iframe>"
                + "<textarea id='__run_text_ext' style='display:none;'></textarea>"
            );
        });
                
        onMessage.addListener(function(request, sender, sendResponse) {
            if (request.id === 'tabrun') {
                eval(request.js);
            } else if (request.id === 'tabtoggle') {
                $('#__run_frame').toggle();
            }
        });
    }
    
    document.body.addEventListener('keydown', function (e) {
        console.log(e.ctrlKey + ", " + e.altKey + ", " + e.keyCode);
        if ((e.ctrlKey === true ) && (e.altKey === true) && (e.keyCode === 90)) {
            // ctrl+alt+z
            if ($('#__run_frame').length === 0) {
                init();
            }
            
            $('#__run_frame').toggle();
        }
        
        return true;
    });
    
    function reqPrint(str) {
        if (str && (typeof str === 'string'))
            sendMessage({id:'print', 'str':str});
        else if (str && (typeof str === 'object')) {
            if (!str.prototype)
                sendMessage({id:'print', 'str':JSON.stringify(str)});
            else
                sendMessage({id:'print', 'str':str.toString()});
        } else
            sendMessage({id:'print', 'str':String(str)});
    }
    
    function reqClear() {
        sendMessage({id:'clear'});
    }

    return {
        print: function (str, clear) {
            if (clear === true) {
                reqClear();
            }
            reqPrint(str);
        },
        clear: function() {
            reqClear();
        }
    };
})();
