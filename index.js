const sock = new WebSocket("ws://localhost:5001");
const logElem = document.getElementById("log");
const sendButtonElem = document.querySelector("button");
let typeBox = document.querySelector("input");

let name = prompt("Enter your name");

sock.onopen = function() {
  sock.send(JSON.stringify({
    type: "name",
    data: name
  }));
}

sock.onmessage = function(event) {
  const json = JSON.parse(event.data);
  logElem.innerHTML += json.name + ": " + json.data + "<br />";
};
sendButtonElem.onclick = function() {
  const text = typeBox.value;
  sock.send(JSON.stringify({
    type: "message",
    data: text
  }));
  typeBox.value = "";
  typeBox.focus();
  logElem.innerHTML += "You: " + text + "<br />";
}
typeBox.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    sendButtonElem.click();
  }
});