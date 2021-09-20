import fs from "fs";
import Jimp = require("jimp");
import axios from "axios";

export async function filterImageFromURL(inputURL: string): Promise<string> {
  const imageBuffer = await axios({
    method: "get",
    url: inputURL,
    responseType: "arraybuffer",
  });

  return new Promise((resolve, reject) => {
    Jimp.read(imageBuffer.data)
      .then((photo) => {
        const outpath = "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
        photo
          .resize(256, 256) // resize
          .quality(60) // set JPEG quality
          .greyscale() // set greyscale
          .write(__dirname + outpath, (img) => {
            resolve(__dirname + outpath);
          });
      })
      .catch((err) => {
        console.error("error found", err);
        reject("Could not read image.");
      });
  });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files: Array<string>) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}
