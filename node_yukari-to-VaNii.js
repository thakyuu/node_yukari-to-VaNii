'use strict'

//Library
const fs = require('fs');
const iconvLite = require('iconv-lite');
const osc = require('node-osc')

//Static
const config = JSON.parse(fs.readFileSync(__dirname + '/config.json').toString());
const message = process.argv.slice(2).join(' ');

let template = JSON.parse(fs.readFileSync(config.template.path).toString());
let lastTemplateArray = template.texts[template.texts.length - 1].text;

//Initialize
const osc_client = new osc.Client(config.osc.targetAddress, config.osc.targetPort)

lastTemplateArray.unshift(message);
template.texts[template.texts.length - 1].text = lastTemplateArray.slice(0, 9)

fs.writeFileSync(config.template.path, JSON.stringify(template, null, '\t'));
osc_client.send(config.osc.address.reload, 'reload')

process.stdout.write(iconvLite.encode(message, 'SJIS'));

setTimeout(() => {
	process.exit(0);
}, 400)

