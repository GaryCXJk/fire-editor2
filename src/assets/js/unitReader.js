import * as Data from './data.js'
import {Unit} from './unit.js'

export function readFileForUnits(){
	var blocks = [];
	Data.file.indexes = [];

	var characterBlock = Data.file.str.substring(Data.file.str.indexOf(Data.Offsets.characterHeader) + Data.Offsets.characterHeader.length, Data.file.str.indexOf(Data.Offsets.characterFooter));
	Data.file.unitNumberAlive = Data.Util.hextodec(characterBlock.substr(4, 2));
	Data.file.unitNumberDead = Data.Util.hextodec(characterBlock.substr(2, 2));
	for(var i = characterBlock.indexOf(Data.Offsets.characterId); i >= 0; i = characterBlock.indexOf(Data.Offsets.characterId, i + 1)) {
		var temp = characterBlock.substring(i - 48);
		if(temp.substring(0,2) == "07" && temp.substring(4,6) == "00"){
			Data.file.indexes.push(i - 48);
		}
	}
	Data.file.totalUnitID = Data.file.indexes.length
	for(var i = 0; i < Data.file.indexes.length; i++){
		if(i + 1 < Data.file.indexes.length){
			blocks[i] = new Unit(characterBlock.substring(Data.file.indexes[i], Data.file.indexes[i + 1]), i);
		} else {
			blocks[i] = new Unit(characterBlock.substring(Data.file.indexes[i], characterBlock.length), i);
		}

	}
	console.log(Data.file.unitNumberAlive);
	console.log(Data.file.unitNumberDead);
	return blocks;
}
