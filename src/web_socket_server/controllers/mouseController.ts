import { mouse_down, mouse_left, mouse_position, mouse_right, mouse_up } from '../utils/commands.js';
import { down, left, mouse, right, up } from '@nut-tree/nut-js';
import WebSocket from 'ws';


export const mouseController = async (mouseCommand: string, movePx: number, ws?: WebSocket.WebSocket) => {
  switch (mouseCommand) {
    case mouse_up: {
      await mouse.move(up(movePx));
      break;
    }
    case mouse_down: {
      await mouse.move(down(movePx));
      break;
    }
    case mouse_left: {
      await mouse.move(left(movePx));
      break;
    }
    case mouse_right: {
      await mouse.move(right(movePx));
      break;
    }
    case mouse_position:{
      const coordinates = await mouse.getPosition()
      ws && ws.send(`${mouse_position} ${coordinates.x},${coordinates.y}`)
      console.log(`-> ${mouse_position} ${coordinates.x},${coordinates.y}`);
      break;
    }
  }
};
