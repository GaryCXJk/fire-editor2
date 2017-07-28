<template lang="html">
	<div id="select">
		<p>{{label}}</p>
		<select v-model='value'>
			<option disabled>{{label}}</option>
			<option v-for='(option, index) in options' v-bind:value="index">{{option}}</option>
		</select>

	</div>
</template>

<script>

import * as Data from '../assets/js/data.js'
import {EventBus} from '../assets/js/eventBus.js'

export default {
	props: {
		options: {
			required: true,
			type: Array
		},
		active: {
			type: String,
			required: true
		},
		label: {
			type: String,
		},
		pos: {
			required: true
		}
	},
	data () {
		return {
			value: Data.Util.hextodec(this.active)
		}
	},
	mounted () {
		EventBus.$on('SaveAllUnits', n => {
			if(Data.Util.dectohex(this.value) != this.active){
				EventBus.$emit(this.label + this.pos, Data.Util.dectohex(this.value))
			}
		})
	},
}
</script>

<style scoped lang="sass">
	#select
		padding: 4px
		margin: 2px
	p
		color: rgba(#fff, 0.85)
	input
		background: transparent
		border-bottom: 2px solid rgba(#fff, 0.35)
		color: rgba(#fff, 0.85)
		padding: 2px
		&:focus, &:active
			border-bottom: 2px solid rgba(#fff, 0.85)
</style>
