'use strict'

//Library
const fs = require('fs');
const iconvLite = require('iconv-lite');
const osc = require('node-osc');

process.on('uncaughtException', err => {
	console.log(err);
	process.exit(1);
})

//Static
const config = JSON.parse(fs.readFileSync(__dirname + '/config.json').toString());
const message = process.argv.slice(2).join(' ');
const template = JSON.parse(fs.readFileSync(config.template.path).toString());
const osc_client = new osc.Client(config.osc.targetAddress, config.osc.targetPort);


if(template.texts.length < config.template.page){
	for(let i = template.texts.length; i < config.template.page; i++){
		template.texts.push({"text": ["", "", "", "", "", "", "", "", ""]});
	}
}

let targetTemplateArray = template.texts[config.template.page - 1].text;

targetTemplateArray.unshift(message);
template.texts[config.template.page - 1].text = targetTemplateArray.slice(0, 9);

fs.writeFileSync(config.template.path, JSON.stringify(template, null, '\t'));
osc_client.send(config.osc.address.reload, 'reload', () => {
	process.stdout.write(iconvLite.encode(message, 'SJIS'));
	osc_client.close();
});

