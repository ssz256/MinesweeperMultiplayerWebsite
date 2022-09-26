const ipAPI = "https://api64.ipify.org/";
let ws;
let token;

function isNicknameValid(nick)
{
    return nick.match(/[a-zA-Z0-9]/g).length == nick.length 
}

function login(nickname)
{
    if(!isNicknameValid(nickname))
    {
        alert("Illegal nickname!");
        return;
    }

    if ("WebSocket" in window) {
        ws = new WebSocket("ws://localhost:2137");

    	ws.onopen = function() {
            ws.send(`0.${nickname}`);
        }

        ws.onmessage = function (evt) { 
            const received_msg = evt.data;
            console.log(`Recieved: ${received_msg}`)
        }

        ws.onclose = function() { 
            console.log("Closed")
        };

    } else {
        alert("WebSocket NOT supported by your Browser!");
    }
}