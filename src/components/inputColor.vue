<template lang="html">
	<div class="">
		<input type='color' id="picker" v-model='value'/>
		<input type="text" v-model='value'>
	</div>
</template>
<script type="text/javascript" src="../assets/js/spectrum.js"></script>
<script>
import {EventBus} from '../assets/js/eventBus.js';

export default {
	props: {
		hex: {
			required: true,
			type: String
		},
		pos: {
			type: Number,
			required: true,
		}
	},
	data () {
		return {
			value: this.hex
		}
	},
	mounted () {
		EventBus.$on('SaveAllUnits', n => {
			if(this.value != this.hex){
				EventBus.$emit('hairColor' + this.pos, this.value)
			}
		})
	},

}
</script>

<style scoped lang="sass">
	div
		padding: 16px
	#picker
		width: 200px
		height: 30px
		border: none
		&::-webkit-color-swatch
			border: none

		&::-webkit-color-swatch-wrapper
			padding: 0

	input
		background: transparent
		border-bottom: 2px solid rgba(#fff, 0.35)
		color: rgba(#fff, 0.85)
		padding: 2px
		display: block
		&:focus, &:active
			border-bottom: 2px solid rgba(#fff, 0.85)
</style>
