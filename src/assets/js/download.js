import * as Data from './data.js'

function download(filename, text) {
	$("#download")[0].setAttribute('href', 'data:application/octet-stream;base64,' + encodeURIComponent(text));
	$("#download")[0].setAttribute('download', filename);
}

export function buildFileStirngThenDownload() {
	Data.file.unitNumberAlive = 0;
	for(var i = 0; i < Data.file.units.length; i++) {
		if(Data.file.units[i].alive) {
			Data.file.unitNumberAlive++
		}
	}
	console.log(Data.file.unitNumberAlive)
	var newFileString = Data.file.str.substring(0, Data.file.str.indexOf(Data.Offsets.characterHeader) + Data.Offsets.characterHeader.length + 4)
										+ Data.Util.dectohex(Data.file.unitNumberAlive);

	for(var i = 0; i < Data.file.units.length; i++) {
		if(Data.file.units[i].alive) {
			newFileString += Data.file.units[i].charBlock;
		}
	}
	for(var i = 0; i < Data.file.units.length; i++) {
		if(!Data.file.units[i].alive) {
			newFileString += Data.file.units[i].charBlock;
		}
	}
	newFileString += Data.file.str.substring(Data.file.str.indexOf(Data.Offsets.characterFooter), Data.file.str.indexOf(Data.Offsets.itemHeader) + 6 + Data.Offsets.itemHeader.length)
	newFileString += Data.file.items;
	newFileString += Data.file.str.substring(Data.file.str.indexOf(Data.Offsets.itemHeader) + 6 + Data.file.items.length)

	var y=[];
	newFileString.replace(/.{1,2}/g,function(a){
		y.push(parseInt(a,16))
	});
	var compiledFile = btoa(String.fromCharCode.apply(!1,new Uint8Array(y)))
	download("chapter_42", compiledFile)

}
