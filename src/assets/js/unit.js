import * as Data from './data.js'

/*function Unit(charStr, i) {
	this.charBlock = charStr;
	this.charID;
	this.pos = i;
	this.name;
	this.class;
	this.stats = {
		lvl: null,
		exp: null,
		mov: null,
		hp: null,
		str: null,
		def: null,
		skl: null,
		spd: null,
		mag: null,
		res: null,
		lck: null
	}
	this.weaponExp = {
		sword: null,
		spear: null,
		axe: null,
		bow: null,
		tomb: null,
		stave: null,
	}
	this.activeSkills = {
		'0': null,
		'1': null,
		'2': null,
		'3': null,
		'4': null,
	},
	this.learnedSkills;
	this.hairColor;
	this.isAvatar = function() {
		if(this.charID === '00' || this.charID === '01' || this.charID === '02') return true;
		else return false
	}
	this.isDLC = function(){
		var offset = this.charBlock.indexOf(Data.Offsets.fBlock) + Data.Offsets.fBlock.length + 38 + 48;
		if(Data.Util.hextodec(this.charBlock.substr(offset + 4, 2)) > 5) {
			return true;
		} else return false;
	}
	this.isChild = function(){
		if(Data.Util.hextodec(this.charID) >= 32 && Data.Util.hextodec(this.charID) <= 44){
			return true;
		} else return false;
	}

	this.setValues = function() {
		this.fileCharBlock = this.charBlock;
		this.charID = this.charBlock.substr(2,2);
		this.class = this.charBlock.substr(6,2);

		this.activeSkills[1] = this.charBlock.substr(102, 2);
		this.activeSkills[2] = this.charBlock.substr(106, 2);
		this.activeSkills[3] = this.charBlock.substr(110, 2);
		this.activeSkills[4] = this.charBlock.substr(114, 2);
		this.activeSkills[5] = this.charBlock.substr(118, 2);

		this.stats.hp = this.charBlock.substr(20,2);
		this.stats.str = this.charBlock.substr(22,2);
		this.stats.mag = this.charBlock.substr(24,2);
		this.stats.skl = this.charBlock.substr(26,2);
		this.stats.spd = this.charBlock.substr(28,2);
		this.stats.lck = this.charBlock.substr(30,2);
		this.stats.def = this.charBlock.substr(32,2);
		this.stats.res = this.charBlock.substr(34,2);
		this.stats.exp = this.charBlock.substr(38,2);
		this.stats.mov = this.charBlock.substr(42,2);
		this.stats.lvl = this.charBlock.substr(36,2);

		this.weaponExp.sword = this.charBlock.substr(122,2);
		this.weaponExp.spear = this.charBlock.substr(124,2);
		this.weaponExp.axe = this.charBlock.substr(126,2);
		this.weaponExp.bow = this.charBlock.substr(128,2);
		this.weaponExp.tomb = this.charBlock.substr(130,2);
		this.weaponExp.stave = this.charBlock.substr(132,2);

		this.activeSkills[0] = this.charBlock.substr(102, 2);
		this.activeSkills[1] = this.charBlock.substr(106, 2);
		this.activeSkills[2] = this.charBlock.substr(110, 2);
		this.activeSkills[3] = this.charBlock.substr(114, 2);
		this.activeSkills[4] = this.charBlock.substr(118, 2);

		this.learnedSkills = Data.Util.reversebin(Data.Util.hextobin(this.charBlock.substr(this.charBlock.indexOf('ffff0000000002') + 46, 26)))

		if(this.isAvatar()){
			this.name = Data.Util.hextoascii(this.charBlock.substr(this.charBlock.indexOf(Data.Offsets.fBlock) + Data.Offsets.fBlock.length + 30, 48).replace(/00/g, ""));;
		} else {
			this.name = Data.Hex.names[Data.Util.hextodec(this.charID)]
		}
		if(this.isChild() || (this.isAvatar() && !this.isDLC())) {
			if(this.isChild()) {
				this.hairColor = "#" + this.charBlock.substr(this.charBlock.indexOf(Data.Offsets.fBlockStart) + 90 + Data.Offsets.fBlockStart.length, 6);
			} else if(this.isAvatar()) {
				var offset = this.charBlock.indexOf(Data.Offsets.fBlock) + Data.Offsets.fBlock.length + 38 + 48;
				this.hairColor = "#" + this.charBlock.substr(offset - 68, 6);
			}
		}
	}
	this.replace = function(b, r){
		this.charBlock = this.charBlock.substring(0, b) + r + this.charBlock.substring(b + r.length, this.charBlock.length);
	}
	this.buildNewUnitBlock = function() {
		this.replace(20, this.stats.hp);
		this.replace(22, this.stats.str);
		this.replace(24, this.stats.mag);
		this.replace(26, this.stats.skl);
		this.replace(28, this.stats.spd);
		this.replace(30, this.stats.lck);
		this.replace(32, this.stats.def);
		this.replace(34, this.stats.res);
		this.replace(38, this.stats.exp);
		this.replace(42, this.stats.mov);
		this.replace(36, this.stats.lvl);

		this.replace(122, this.weaponExp.sword);
		this.replace(124, this.weaponExp.spear);
		this.replace(126, this.weaponExp.axe);
		this.replace(128, this.weaponExp.bow);
		this.replace(130, this.weaponExp.tomb);
		this.replace(132, this.weaponExp.stave);

		this.replace(102, this.activeSkills[0]);
		this.replace(106, this.activeSkills[1]);
		this.replace(110, this.activeSkills[2]);
		this.replace(114, this.activeSkills[3]);
		this.replace(118, this.activeSkills[4]);

		this.replace(6, this.class);

		this.replace(this.charBlock.indexOf('ffff0000000002') + 46, Data.Util.bintohex(Data.Util.reversebin(this.learnedSkills)))
	}
}*/



class Unit {
	constructor(str, p) {
		this.charBlock = str;
		this.pos = p;
		this.charID = this.charBlock.substr(2,2);
		this.class = this.charBlock.substr(6,2);

		this.activeSkills = {'0':null,'1':null,'2':null,'3':null,'4':null}
		this.activeSkills[0] = this.charBlock.substr(102, 2);
		this.activeSkills[1] = this.charBlock.substr(106, 2);
		this.activeSkills[2] = this.charBlock.substr(110, 2);
		this.activeSkills[3] = this.charBlock.substr(114, 2);
		this.activeSkills[4] = this.charBlock.substr(118, 2);

		this.stats = {lvl: null,exp: null,mov: null,hp: null,str: null,def: null,skl: null,spd: null,mag: null,res: null,lck: null};
		this.stats.hp = this.charBlock.substr(20,2);
		this.stats.str = this.charBlock.substr(22,2);
		this.stats.mag = this.charBlock.substr(24,2);
		this.stats.skl = this.charBlock.substr(26,2);
		this.stats.spd = this.charBlock.substr(28,2);
		this.stats.lck = this.charBlock.substr(30,2);
		this.stats.def = this.charBlock.substr(32,2);
		this.stats.res = this.charBlock.substr(34,2);
		this.stats.exp = this.charBlock.substr(38,2);
		this.stats.mov = this.charBlock.substr(42,2);
		this.stats.lvl = this.charBlock.substr(36,2);

		this.weaponExp = {sword: null,spear: null,axe: null,bow: null,tomb: null,stave: null}
		this.weaponExp.sword = this.charBlock.substr(122,2);
		this.weaponExp.spear = this.charBlock.substr(124,2);
		this.weaponExp.axe = this.charBlock.substr(126,2);
		this.weaponExp.bow = this.charBlock.substr(128,2);
		this.weaponExp.tomb = this.charBlock.substr(130,2);
		this.weaponExp.stave = this.charBlock.substr(132,2);


		this.learnedSkills = Data.Util.reversebin(Data.Util.hextobin(this.charBlock.substr(this.charBlock.indexOf('ffff0000000002') + 46, 26)))

		if(this.isAvatar()){
			this.name = Data.Util.hextoascii(this.charBlock.substr(this.charBlock.indexOf(Data.Offsets.fBlock) + Data.Offsets.fBlock.length + 30, 48).replace(/00/g, ""));;
		} else {
			this.name = Data.Hex.names[Data.Util.hextodec(this.charID)]
		}
		if(this.isChild() || (this.isAvatar() && !this.isDLC())) {
			if(this.isChild()) {
				this.hairColor = "#" + this.charBlock.substr(this.charBlock.indexOf(Data.Offsets.fBlockStart) + 90 + Data.Offsets.fBlockStart.length, 6);
			} else if(this.isAvatar()) {
				var offset = this.charBlock.indexOf(Data.Offsets.fBlock) + Data.Offsets.fBlock.length + 38 + 48;
				this.hairColor = "#" + this.charBlock.substr(offset - 68, 6);
			}
		}
	}
	isAvatar() {
		if(this.charID === '00' || this.charID === '01' || this.charID === '02') return true;
		else return false
	}
	isDLC() {
		var offset = this.charBlock.indexOf(Data.Offsets.fBlock) + Data.Offsets.fBlock.length + 38 + 48;
		if(Data.Util.hextodec(this.charBlock.substr(offset + 4, 2)) > 5) {
			return true;
		} else return false;
	}
	isChild() {
		if(Data.Util.hextodec(this.charID) >= 32 && Data.Util.hextodec(this.charID) <= 44){
			return true;
		} else return false;
	}
	replace(b, r) {
		this.charBlock = this.charBlock.substring(0, b) + r + this.charBlock.substring(b + r.length, this.charBlock.length);
	}
	buildNewUnitBlock() {
		this.replace(20, this.stats.hp);
		this.replace(22, this.stats.str);
		this.replace(24, this.stats.mag);
		this.replace(26, this.stats.skl);
		this.replace(28, this.stats.spd);
		this.replace(30, this.stats.lck);
		this.replace(32, this.stats.def);
		this.replace(34, this.stats.res);
		this.replace(38, this.stats.exp);
		this.replace(42, this.stats.mov);
		this.replace(36, this.stats.lvl);

		this.replace(122, this.weaponExp.sword);
		this.replace(124, this.weaponExp.spear);
		this.replace(126, this.weaponExp.axe);
		this.replace(128, this.weaponExp.bow);
		this.replace(130, this.weaponExp.tomb);
		this.replace(132, this.weaponExp.stave);

		this.replace(102, this.activeSkills[0]);
		this.replace(106, this.activeSkills[1]);
		this.replace(110, this.activeSkills[2]);
		this.replace(114, this.activeSkills[3]);
		this.replace(118, this.activeSkills[4]);

		this.replace(6, this.class);

		this.replace(this.charBlock.indexOf('ffff0000000002') + 46, Data.Util.bintohex(Data.Util.reversebin(this.learnedSkills)))
	}
}
export {Unit}
