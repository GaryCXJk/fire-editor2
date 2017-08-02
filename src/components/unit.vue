<template lang="html">
	<div id="unit" v-show='active'>
		<h1>{{unit.name}}</h1>
		<div id="stats">
			<h2>stats (99 for max)</h2>
			<inputNum v-bind:num='unit.stats.lvl' v-bind:pos='unit.pos' label='LVL'></inputNum>
			<inputNum v-bind:num='unit.stats.exp' v-bind:pos='unit.pos' label='EXP'></inputNum>
			<inputNum v-bind:num='unit.stats.mov' v-bind:pos='unit.pos' label='Boots'></inputNum>
			<inputNum v-bind:num='unit.stats.hp' v-bind:pos='unit.pos' label='hp'></inputNum>
			<inputNum v-bind:num='unit.stats.str' v-bind:pos='unit.pos' label='str'></inputNum>
			<inputNum v-bind:num='unit.stats.mag' v-bind:pos='unit.pos' label='mag'></inputNum>
			<inputNum v-bind:num='unit.stats.skl' v-bind:pos='unit.pos' label='skl'></inputNum>
			<inputNum v-bind:num='unit.stats.spd' v-bind:pos='unit.pos' label='spd'></inputNum>
			<inputNum v-bind:num='unit.stats.lck' v-bind:pos='unit.pos' label='lck'></inputNum>
			<inputNum v-bind:num='unit.stats.def' v-bind:pos='unit.pos' label='def'></inputNum>
			<inputNum v-bind:num='unit.stats.res' v-bind:pos='unit.pos' label='res'></inputNum>
		</div>
		<div id="class">
			<h2>Class</h2>
			<inputSelect v-bind:options='classes' v-bind:pos='unit.pos' v-bind:active='unit.class' label='Class'></inputSelect>

		</div>
		<div id="weaponExp">
			<h2>weapon exp (A=90, B=60, C=35, D=15, E=0)</h2>
			<inputNum v-bind:num='unit.weaponExp.sword' v-bind:pos='unit.pos' label='sword'></inputNum>
			<inputNum v-bind:num='unit.weaponExp.spear' v-bind:pos='unit.pos' label='spear'></inputNum>
			<inputNum v-bind:num='unit.weaponExp.axe' v-bind:pos='unit.pos' label='axe'></inputNum>
			<inputNum v-bind:num='unit.weaponExp.bow' v-bind:pos='unit.pos' label='bow'></inputNum>
			<inputNum v-bind:num='unit.weaponExp.tomb' v-bind:pos='unit.pos' label='tomb'></inputNum>
			<inputNum v-bind:num='unit.weaponExp.stave' v-bind:pos='unit.pos' label='stave'></inputNum>
		</div>
		<div id="activeSkills">
			<h2>Active Skills</h2>
			<inputSelect v-bind:options='skills' v-bind:pos='unit.pos' v-bind:active='unit.activeSkills[0]' label='Skill 1'></inputSelect>
			<inputSelect v-bind:options='skills' v-bind:pos='unit.pos' v-bind:active='unit.activeSkills[1]' label='Skill 2'></inputSelect>
			<inputSelect v-bind:options='skills' v-bind:pos='unit.pos' v-bind:active='unit.activeSkills[2]' label='Skill 3'></inputSelect>
			<inputSelect v-bind:options='skills' v-bind:pos='unit.pos' v-bind:active='unit.activeSkills[3]' label='Skill 4'></inputSelect>
			<inputSelect v-bind:options='skills' v-bind:pos='unit.pos' v-bind:active='unit.activeSkills[4]' label='Skill 5'></inputSelect>
		</div>
		<div id="hairColor" v-show='unit.hairColor'>
			<h2>Hair Color</h2>
			<inputColor v-bind:hex='unit.hairColor' v-bind:pos='unit.pos'></inputColor>

		</div>
		<div id="learnedSkils">
			<h2>learned Skills (Don't add 'None')</h2>
			<skills v-bind:bin='unit.learnedSkills' v-bind:pos='unit.pos'></skills>
		</div>
		<div id="parent" v-if='unit.isChild()'>
			<h2>Parents</h2>
			<p>I do not recomend adding logbook units or MU's if you have multiples of them</p>
			<inputSelect v-bind:options='names' v-bind:pos='unit.pos' v-bind:active='unit.mother' label='Mother'></inputSelect>
			<inputSelect v-bind:options='names' v-bind:pos='unit.pos' v-bind:active='unit.father' label='Father'></inputSelect>

		</div>
		<div id="meta">
			<h2>Misc.</h2>
			<p>These features don't tend to work if you have any fallen units it can but it is very ify</p>
			<p>Deleting a unit can cause weirdness in the game. I do not recomend deleting a non-dlc logbook unit or the MU. If you can find definient paramiters for when the game screws up please tell me. It is mostly there in case you duplicate too many units</p>
			<button id="duplicate" v-on:click='duplicateUnit()'>Duplicate Unit</button>
			<button id="delete" v-on:click='deleteUnit()'>Delete Unit</button>
			<!--<button id="kill" v-if='unit.alive' v-on:click='killUnit()'>Kill unit</button>
			<button id="revive" v-else v-on:click='reviveUnit()'>Revive unit</button>-->
			<h3>Character String (does not update automaticly)</h3>

			<p id='charBlock'>{{unit.charBlock}}</p>
		</div>
	</div>
</template>

<script>

import * as Data from '../assets/js/data.js'
import {Unit} from '../assets/js/unit.js'
import InputNum from './inputNum.vue'
import InputSelect from './inputSelect.vue'
import InputColor from './inputColor.vue'
import Skills from './skills.vue'
import {EventBus} from '../assets/js/eventBus.js';

export default {
	components: {
		'inputNum': InputNum,
		'inputSelect': InputSelect,
		'inputColor': InputColor,

		'skills': Skills,

	},
	data () {
		return {
			skills: Data.Hex.skills,
			classes: Data.Hex.classes,
			names: Data.Hex.names,
		}
	},
	props: {
		unit: {
			required: true,
			type: Object
		},
		active: {
			required: true,
			type: Boolean
		}
	},
	methods: {
		duplicateUnit: function() {
			Data.file.unitNumberAlive++;
			Data.file.totalUnitID++;
			Data.file.units.push(new Unit(this.unit.charBlock, Data.file.totalUnitID));
		},
		deleteUnit: function() {
			Data.file.unitNumberAlive--;
			Data.file.totalUnitID++;

			var index = Data.file.units.findIndex(unit => this.unit.pos == unit.pos);
			Data.file.units.splice(index, 1);
		},
		reviveUnit: function() {
			this.unit.alive = true;
			Data.file.unitNumberAlive++;
			Data.file.unitNumberDead--;
			console.log(Data.file.unitNumberDead + ', ' + Data.file.unitNumberAlive)
		}
	},
	mounted () {
		EventBus.$on('learnedSkill' + this.unit.pos, n => {
			this.unit.learnedSkills = n;
		}),
		EventBus.$on('hp' + this.unit.pos, n => {
			this.unit.stats.hp = n;
		}),
		EventBus.$on('str' + this.unit.pos, n => {
			this.unit.stats.str = n;
		}),
		EventBus.$on('mag' + this.unit.pos, n => {
			this.unit.stats.mag = n;
		}),
		EventBus.$on('skl' + this.unit.pos, n => {
			this.unit.stats.skl = n;
		}),
		EventBus.$on('spd' + this.unit.pos, n => {
			this.unit.stats.spd = n;
		}),
		EventBus.$on('lck' + this.unit.pos, n => {
			this.unit.stats.lck = n;
		}),
		EventBus.$on('def' + this.unit.pos, n => {
			this.unit.stats.def = n;
		}),
		EventBus.$on('res' + this.unit.pos, n => {
			this.unit.stats.res = n;
		}),

		EventBus.$on('LVL' + this.unit.pos, n => {
			this.unit.stats.lvl = n;
		}),
		EventBus.$on('EXP' + this.unit.pos, n => {
			this.unit.stats.exp = n;
		}),
		EventBus.$on('Boots' + this.unit.pos, n => {
			this.unit.stats.mov = n;
		}),

		EventBus.$on('sword' + this.unit.pos, n => {
			this.unit.weaponExp.sword = n;
		}),
		EventBus.$on('spear' + this.unit.pos, n => {
			this.unit.weaponExp.spear = n;
		}),
		EventBus.$on('axe' + this.unit.pos, n => {
			this.unit.weaponExp.axe = n;
		}),
		EventBus.$on('bow' + this.unit.pos, n => {
			this.unit.weaponExp.bow = n;
		}),
		EventBus.$on('tomb' + this.unit.pos, n => {
			this.unit.weaponExp.tomb = n;
		}),
		EventBus.$on('stave' + this.unit.pos, n => {
			this.unit.weaponExp.stave = n;
		}),

		EventBus.$on('Skill 1' + this.unit.pos, n => {
			this.unit.activeSkills[0] = n;
		}),
		EventBus.$on('Skill 2' + this.unit.pos, n => {
			this.unit.activeSkills[1] = n;
		}),
		EventBus.$on('Skill 3' + this.unit.pos, n => {
			this.unit.activeSkills[2] = n;
		}),
		EventBus.$on('Skill 4' + this.unit.pos, n => {
			this.unit.activeSkills[3] = n;
		}),
		EventBus.$on('Skill 5' + this.unit.pos, n => {
			this.unit.activeSkills[4] = n;
		}),

		EventBus.$on('Class' + this.unit.pos, n => {
			this.unit.class = n;
		})
		EventBus.$on('Father' + this.unit.pos, n => {
			this.unit.father = n;
		})
		EventBus.$on('Mother' + this.unit.pos, n => {
			this.unit.mother = n;
		})
		EventBus.$on('hairColor' + this.unit.pos, n => {
			this.unit.hairColor = n;
		})
	}
}
</script>

<style scoped lang="sass">
	h1, h2, h3, h4, h5, h6, p
		color: rgba(white, 0.85)
	p
		padding: 8px
	#unit
		padding: 16px
		overflow-y: scroll
		height: 100%
		width: 100%
		>div
			padding: 16px
			>div
				display: inline-block
	button
		display: inline-block
		margin: 16px 4px
		padding: 8px 16px
		background-color: #b29dc7
		cursor: pointer
		border-radius: 2px
	#charBlock
		width: 540px
		word-wrap: break-word
		line-height: 1.6
		padding: 8px
		font-family: monospace
</style>
