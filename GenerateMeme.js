const Jimp = require('jimp');
const { sleep } = require('./helper');
const config = require('./config.json');

class GeneratorMeme {
  async generateMeme(type, caption) {
    let image,
      outputImage = null;

    if (type === 'mocthistweet') {
      image = config.image_file.mockthistweet.original;
      outputImage = config.image_file.mockthistweet.output;
    } else if (type === 'jokowi') {
      image = config.image_file.jokowi.original;
      outputImage = config.image_file.jokowi.output;
    } else if (type === 'tubirfess') {
      image = config.image_file.tubirfess.original;
      outputImage = config.image_file.tubirfess.output;
    }

    await Jimp.read(image)
      .then(async image => {
        await Jimp.loadFont('./font/segoeui.fnt').then(font => {
          // 65, 140
          image.print(
            font,
            65,
            140,
            {
              text: caption,
            },
            image.bitmap.width,
            image.bitmap.height
          );
          image.write(outputImage);
        });
      })
      .catch(err => {
        console.log('Generate meme: ' + err);
      });
    await sleep(100);
    return outputImage;
  }
}

module.exports = GeneratorMeme;
