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
        ws = new WebSocket("wss://wss.minesweeper.ziekujemynev.me:443");

    	ws.onopen = function() {
            ws.send(`0.${nickname}`);
        }

        ws.onmessage = function (evt) { 
            const data = evt.data;
            console.log(`Recieved: ${data}`)
            const opcode = data.split(".")[0];
            const content = data.split(".").slice(1).join(".");
            switch(opcode)
            {
                case "1":
                    token = content;
                    break;
            }
        }

        ws.onclose = function() { 
            console.log("Closed")
        };

    } else {
        alert("WebSocket NOT supported by your Browser!");
    }
}