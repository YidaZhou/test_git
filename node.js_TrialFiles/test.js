// var fs = require('fs');

// // 打开一个流:
// var rs = fs.createReadStream('sample.txt', 'utf-8');

// rs.on('data', function (chunk) {
//     console.log('DATA:')
//     console.log(chunk);
// });

// rs.on('end', function () {
//     console.log('END');
// });

// rs.on('error', function (err) {
//     console.log('ERROR: ' + err);
// });

const h = "hello";
const w = "world";


setTimeout(() => {
    console.log(w);
}, 2000);

setTimeout(() => {
    console.log(h);
}, 1000);