'use server';

import { NextApiRequest, NextApiResponse } from "next";
import * as formidable from 'formidable';
import { convertRGB565 } from "@Server/lib/convert-rgb565";

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const form = new formidable.IncomingForm();
  form.parse(req, (err: Error, fields: formidable.Fields, files: formidable.Files) => {
    if (err) {
      console.error(err);
      return;
    }

    // Convert image to C bytes array RGB565
    const imageDotC = convertRGB565(files.image);

    res.status(200).json({ imageDotC });
  });
}