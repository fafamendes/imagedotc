import type { File } from "formidable";
import fs from 'fs'

export const convertRGB565 = (image: File[] | undefined): string => {
  let imageDotC = 'const imageDotC = [\n';

  if (image) {
    const buffer = fs.readFileSync(image[0].filepath);
    const data = new Uint8Array(buffer);
    for (let i = 0; i < data.length; i += 2) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const rgb565 = ((r & 0xF8) << 8) | ((g & 0xFC) << 3) | (b >> 3);
      imageDotC += `0x${rgb565.toString(16)}${rgb565 < 16 ? '0' : ''},`;
      if (i % 16 == 0) imageDotC += '\t//16 pixels \n'
    }
    imageDotC += '];';

    return imageDotC;
  }
  return 'Algo de errado não deu certo :(';
}