const socketUrl = 'http://localhost:9000';

let connectButton;
let disconnectButton;
let socket;
let statusInput;
let tokenInput;

const connect = () => {
  let error = null;

  socket = io(socketUrl, {
    autoConnect: false,
  });

  socket.on('connect', () => {
    console.log('Connected');
    statusInput.value = 'Connected';
    connectButton.disabled = true;
    disconnectButton.disabled = false;

    socket.emit('authentication', {
      token: tokenInput.value,
    });
  });

  socket.on('unauthorized', (reason) => {
    console.log('Unauthorized:', reason);

    error = reason.message;

    socket.disconnect();
  });

  socket.on('disconnect', (reason) => {
    console.log(`Disconnected: ${error || reason}`);
    statusInput.value = `Disconnected: ${error || reason}`;
    connectButton.disabled = false;
    disconnectButton.disabled = true;
    error = null;
  });

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
