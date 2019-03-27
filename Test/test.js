const pug = require('pug')

const compiledFunction = pug.complieFile('template.pug');

console.log(compiledFunction({
  name: 'Timothy'
}));

console.log(compiledFunction({
  name: 'Forbes'
}));
