const socketUrl = 'http://localhost:9000';

let connectButton;
let disconnectButton;
let socket;
let statusInput;
let tokenInput;

const connect = () => {
  socket = io(socketUrl, {
    autoConnect: false,
  });

  socket.on('connect', () => {
    console.log('Connected');
    statusInput.value = 'Connected';
    connectButton.disabled = true;
    disconnectButton.disabled = false;
  });

  socket.on('disconnect', (reason) => {
    console.log(`Disconnected: ${reason}`);
    statusInput.value = `Disconnected: ${reason}`;
    connectButton.disabled = false;
    disconnectButton.disabled = true;
  })

  socket.open();
};

const disconnect = () => {
  socket.disconnect();
}

document.addEventListener('DOMContentLoaded', () => {
  connectButton = document.getElementById('connect');
  disconnectButton = document.getElementById('disconnect');
  statusInput = document.getElementById('status');
  tokenInput = document.getElementById('token');
});
