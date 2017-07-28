<template lang="html">
  <div id="unitWrapper">
		<ul>
			<li v-for='unit in units' v-show='unit' v-on:click='setActive(unit.pos)'>{{unit.name}}</li>
		</ul>
		<div id="unitSpace">
			<unit v-for='unit in units' v-bind:active='(active == unit.pos)' v-bind:unit='unit' :key="unit.id"></unit>
		</div>
		<a id="importShow" v-on:click='overlayShow=true'>Import from hex</a>
		<a id='save' v-on:click='saveAll()'>Save all Units</a>
		<div id="overlay" v-show='overlayShow'>
			<span id="x" v-on:click='overlayShow=false'>X</span>
			<p>paste your character data into the box. Little validation happens so if you input screwy data it will break the app</p>
			<textarea id="importIn"></textarea>
			<button id="import" v-on:click='importCharacter()'>Import character</button>
		</div>
  </div>
</template>

<script>
import unit from './unit.vue'
import {Unit} from '../assets/js/unit.js'
import * as UnitReader from '../assets/js/unitReader.js'
import * as Data from '../assets/js/data.js'
import {EventBus} from '../assets/js/eventBus.js';

export default {
	components: {
		'unit': unit
	},
	data () {
		return {
			units: [],
			active: 0,
			overlayShow: false
		}
	},
	mounted () {
		EventBus.$on('readBlocks', n => {
			Data.file.units = UnitReader.readFileForUnits();
			this.units = Data.file.units;
			console.log(Data.file.units)
		})
	},
	methods: {
		setActive: function(i) {
			this.active = i;
		},
		saveAll: function() {
			EventBus.$emit('SaveAllUnits')
			for(var i = 0; i < this.units.length; i++) {
				this.units[i].buildNewUnitBlock();
			}
			Data.file.units = this.units;
		},
		importCharacter: function() {
			Data.file.unitNumber++;
			Data.file.units.push(new Unit($('#importIn')[0].value.replace(/ /g, ''), Data.file.unitNumber));
			this.overlayShow = false
		}
	}
}
</script>

<style scoped lang="sass">
	#unitWrapper
		height: 100%
		display: flex
		#unitSpace
			width: calc(100% - 200px)
	ul
		width: 200px
		box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)
		height: 100%
		overflow-y: scroll
		li
			padding: 16px 16px
			cursor: pointer
			color: rgba(#fff, 0.85)
			&:hover
				background-color: rgba(#fff,0.2)
	#save, #importShow
		padding: 8px 16px
		background-color: #b29dc7
		border-radius: 2px
		position: absolute
		bottom: 16px
		right: 16px
		color: #252830
		cursor: pointer
		text-decoration: none
	#save
		right: 16px
		bottom: 64px
	#overlay
		height: 100vh
		width: 100%
		background-color: rgba(#000, 0.8)
		position: absolute
		top: 0
		left: 0
		z-index: 1000
		display: flex
		align-items: center
		justify-content: center
		flex-direction: column
		p
			padding: 16px
			color: rgba(#fff,0.85)
			width: 540px
			text-align: center
			line-height: 1.6em
		button
			padding: 8px 16px
			background-color: #b29dc7
			border-radius: 2px
			color: #252830
			z-index: 1
			margin: 16px
			cursor: pointer
			text-decoration: none
		textarea
			padding: 8px
			font-family: 'Roboto Mono', monospace
			width: 540px
			height: 360px
		#x
			position: absolute
			top: 16px
			right: 16px
			color: rgba(#fff,0.85)
			cursor: pointer
			font-size: 24px
</style>
