'use strict'

const fs = require('fs');
const iconvLite = require('iconv-lite');

const message = process.argv.slice(2).join(' ');

const template = JSON.parse(fs.readFileSync('Template.json').toString());
const lastTemplateArray = template.texts[template.texts.length - 1].text;

lastTemplateArray.pop;
lastTemplateArray.unshift(message);

fs.writeFileSync('Template.json', JSON.stringify(template, null, '\t'))

process.stdout.write(iconvLite.encode(message, 'SJIS'))