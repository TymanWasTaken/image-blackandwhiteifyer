var Jimp = require('Jimp');
var fs = require('fs');

function lord(r,g,b) {
  var hsp;
  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp>127.5) {

        return 'light';
    } 
    else {

        return 'dark';
    }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp>127.5) {

        return 'light';
    } 
    else {

        return 'dark';
    }
}

// Create two-dimensional pixels rgb array based on png image
Jimp.read('240p.png')
  .then(image => {
    var width = image.bitmap.width;
    var height = image.bitmap.height;
    var pixels = [];
    for (var y = 0; y < height; y++) {
      var rowPixels = [];
      for (var x = 0; x < width; x++) {
        var pixel = Jimp.intToRGBA(image.getPixelColor(x, y));
        rowPixels.push(`${pixel.r}, ${pixel.g}, ${pixel.b}`);
      }
      pixels.push(rowPixels);
    }
    fs.writeFile('INPUT_DATA.json', JSON.stringify({ data: pixels }), 'utf8', err => {
        if (err) { throw err; }
      }
    );
  })
  .catch(err => { throw err; });

// Create png image based on two-dimensional pixels rgb array
fs.readFile('INPUT_DATA.json', 'utf8', (err, file) => {
    if (err) { throw err; }
    var pixelsData = JSON.parse(file);
    var pixels = pixelsData.data;
    new Jimp(pixels[0].length, pixels.length, (err, image) => {
        if (err) { throw err; }
        pixels.forEach((rowPixels, y) => {
            rowPixels.forEach((pixel, x) => {
                var rgb = pixel.split(',');
                var r = Number(rgb[0]);
                var g = Number(rgb[1]);
                var b = Number(rgb[2]);
                var color = Jimp.rgbaToInt(r, g, b, 255);
                image.setPixelColor(color, x, y)
            })
        })
        image.write('OUTPUT_IMAGE.png', (err) => {
            if (err) { throw err; }
        });
    });
})