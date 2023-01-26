import WebSocket from 'ws';
import { prnt_scrn } from '../utils/commands.js';
import { mouse, Region, screen } from '@nut-tree/nut-js';
import Jimp from 'jimp';

export const printScreenController = async (printScreenCommand: string, ws: WebSocket.WebSocket) => {
  switch (printScreenCommand) {
    case prnt_scrn: {
      const mousePosition = await mouse.getPosition();
      const region = new Region(mousePosition.x, mousePosition.y, 100, 100);
      const img = await screen.grabRegion(region);
      const imgToRgb = await img.toRGB();
      const jimpImage: Jimp = new Jimp({ data: imgToRgb.data, width: region.width, height: region.height });
      let imageBuffer: any = await jimpImage.getBufferAsync(Jimp.MIME_PNG);
      ws.send(`${prnt_scrn} ${imageBuffer.toString('base64')}`);
      console.log(`-> ${prnt_scrn} ${imageBuffer.toString('base64')}`);
    }
  }
};
