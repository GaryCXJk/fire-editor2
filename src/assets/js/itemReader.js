import * as Data from './data.js'


export function readConvoy() {
	const index = Data.file.str.indexOf(Data.Offsets.itemHeader) + Data.Offsets.itemHeader.length + 6;
	var convoy = []
	for(var i = 0; i < Data.Hex.items.length; i++){
		var temp = Data.file.str.substring(index + i * 4, index + i * 4 + 4);
		var trueVal = temp.substring(2, 4) + temp.substring(0, 2);
		convoy.push(trueVal)
		Data.file.items += temp;
	}
	return convoy
}
