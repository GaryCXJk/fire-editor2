<template lang="html">
  <div id="unitWrapper">
		<ul>
			<li v-for='unit in units' v-show='unit' v-on:click='setActive(unit.pos)'>{{unit.name}} <p v-if='!unit.alive' id='fallen'>Fallen</p></li>
		</ul>
		<div id="unitSpace">
			<unit v-for='unit in units' v-bind:active='(active == unit.pos)' v-bind:unit='unit' :key="unit.id"></unit>
		</div>
		<a id="importShow" v-on:click='overlayShow=true'>Import from hex</a>
		<a id='save' v-on:click='saveAll()'>Save all Units</a>
		<inject v-show='overlayShow'></inject>
  </div>
</template>

<script>
import unit from './unit.vue'
import Inject from './inject.vue'
import {Unit} from '../assets/js/unit.js'
import * as UnitReader from '../assets/js/unitReader.js'
import * as Data from '../assets/js/data.js'
import {EventBus} from '../assets/js/eventBus.js';

export default {
	components: {
		'unit': unit,
		'inject': Inject
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
		EventBus.$on('hideInjectOverlay', n => {
			this.overlayShow = false
		})
		EventBus.$on('injectCharacter', n => {
			this.importCharacter(n);
		})
		EventBus.$on('heyDeleteAunitWouldYa', n => {

		})
	},
	methods: {
		setActive: function(i) {
			this.active = i;
		},
		saveAll: function() {
			EventBus.$emit('SaveAllUnits');
			for(var i = 0; i < this.units.length; i++) {
				this.units[i].buildNewUnitBlock();
			}
			Data.file.units = this.units;
		},
		importCharacter: function(n) {
			Data.file.unitNumberAlive++;
			Data.file.totalUnitID++;
			Data.file.units.push(new Unit(n.replace(/ /g, ''), Data.file.totalUnitID));
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
			#fallen
				color: #e06c75
				display: inline-block
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

</style>
