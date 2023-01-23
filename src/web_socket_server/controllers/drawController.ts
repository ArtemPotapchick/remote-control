import {
  draw_circle,
  draw_rectangle,
  draw_square,
  mouse_down,
  mouse_left,
  mouse_right,
  mouse_up,
} from '../utils/commands.js';
import { Button, mouse, Point } from '@nut-tree/nut-js';
import { mouseController } from './mouseController.js';

export const drawController = async (drawCommand: string, width: number, length: number) => {
  switch (drawCommand) {
    case draw_square:
    case draw_rectangle: {
      await mouse.pressButton(Button.LEFT);
      await
        mouseController(mouse_up, width);
      await mouse.releaseButton(Button.LEFT);
      await mouse.pressButton(Button.LEFT);
      await mouseController(mouse_right, length ? length : width);
      await mouse.releaseButton(Button.LEFT);
      await mouse.pressButton(Button.LEFT);
      await mouseController(mouse_down, width);
      await mouse.releaseButton(Button.LEFT);
      await mouse.pressButton(Button.LEFT);
      await mouseController(mouse_left, length ? length : width);
      await mouse.releaseButton(Button.LEFT);
      break;
    }
    case draw_circle: {
      const startCoordinates = await mouse.getPosition();
      const points = [] as Point[];
      for (let i = 0; i < 360; i++) {
        let rad = i / 180 * 3.14;
        let x = startCoordinates.x + width * Math.cos(rad);
        let y = startCoordinates.y + width * Math.sin(rad);
        points.push({ x, y } as Point);
      }
      await mouse.setPosition(points[0])
      await mouse.drag(points);
      break;
    }
  }

};
