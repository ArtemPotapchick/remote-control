import { WebSocketServer } from 'ws';
import { mouseController } from './controllers/mouseController.js';
import { drawController } from './controllers/drawController.js';
import { mouse_position, prnt_scrn } from './utils/commands.js';
import { printScreenController } from './controllers/printScreenController.js';

const webSocketPort = 8080;
const wss = new WebSocketServer({
  port: webSocketPort,
});
console.log(`Websocket server running on port:${wss.options.port}`);
wss.on('connection', (ws, req) => {
  console.log('New websocket connection from %s:%d', req.socket.remoteAddress, req.socket.remotePort);
  ws.on('message', async (data) => {
    const command = data.toString();
    if (command.startsWith('mouse')) {
      const mouseCommand = command.split(' ')[0];
      const movePx = +command.split(' ')[1];
      await mouseController(mouseCommand, movePx, ws);
    }
    if (command.startsWith('draw')) {
      const drawCommand = command.split(' ')[0];
      const width = +command.split(' ')[1];
      const length = +command.split(' ')[2];
      await drawController(drawCommand, width, length);
    }
    if (command.startsWith('prnt')) {
      const prntCommand = command.split(' ')[0];
      await printScreenController(prntCommand, ws);
    }
    if (command.trim() !== mouse_position && command.trim() !== prnt_scrn) {
      ws.send(String(`${command.split(' ').join('_')}`));
    }
    console.log(`<- ${command}`);
  });
});

process.on('SIGINT', () => {
  console.log('Websocket connection is closed');
  wss.clients.forEach( (socket) => {
    socket.close();
    process.nextTick(() => {
      const socketStatus = [socket.OPEN, socket.CLOSING]
      // @ts-ignore
      if (socketStatus.includes(socket?.readyState)) {
        socket.terminate();
      }
    });
  });
  process.exit();
});
