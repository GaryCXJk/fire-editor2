<template lang="html">
	<div id="num">
		<p>{{label}}</p>
		<input type="number" v-model='value' :placeholder='label' :min='min' :max='max'>
	</div>
</template>

<script>

import * as Data from '../assets/js/data.js'
import {EventBus} from '../assets/js/eventBus.js';

export default {
	props: {
		num: {
			required: true,
			type: String
		},
		label: {
			type: String
		},
		min: {
			type: Number,
			default: 0
		},
		max: {
			type: Number,
			default: 255
		},
		pos: {
			type: Number,
			required: true,
		}
	},
	data () {
		return {
			value: Data.Util.hextodec(this.num)
		}
	},
	mounted () {
		EventBus.$on('SaveAllUnits', n => {
			if(this.value != Data.Util.hextodec(this.num)){
				EventBus.$emit(this.label + this.pos, Data.Util.dectohex(this.value))
			}
		})
		EventBus.$on('SaveAllConvoy', n => {
			if(this.value != Data.Util.hextodec(this.num)){
				EventBus.$emit('updateValue', [Data.Util.dectohex(this.value, 4), this.pos])

			}
		})
	},

}
</script>

<style scoped lang="sass">
	#num
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
