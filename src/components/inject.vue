<template lang="html">
	<div id="overlay">
		<span id="x" v-on:click='hide()'>X</span>
		<p>paste your character data into the box. Little validation happens so if you input screwy data it will break the app. A bunch of preloads can be found <a href="https://gbatemp.net/attachments/base-character-blocks-zip.94091/">here</a> courtesy of <a href="https://gbatemp.net/members/cercity.380501/">cercity</a></p>
		<p>This feature doesn't tend to work if you have any fallen units, it can but it is very ify</p>
		<textarea id="importIn"></textarea>
		<button id="import" v-on:click='injectUnit()'>Import character</button>
	</div>
</template>

<script>
import {EventBus} from '../assets/js/eventBus.js';
import * as Data from '../assets/js/data.js'
export default {
	methods: {
		hide: function() {
			EventBus.$emit('hideInjectOverlay')
		},
		injectUnit: function() {
			var n = 0;
			for(var i = 0; i < Data.file.units.length; i++) {
				if(Data.file.units[i].charID == '02') {
					n++
				}
			}
			if(n > 20 && $('#importIn')[0].value.substring(2, 2) == '02') {
				alert('you already have 20 logbook units adding this one can screw your game. \nIf you have more than 20 DLC units the game will crash but if this is an MU you are probably fine')
			}

			EventBus.$emit('injectCharacter', $('#importIn')[0].value);

		}
	}
}
</script>

<style scoped lang="sass">
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
			width: 720px
			text-align: center
			line-height: 1.6em
		a
			color: rgba(#fff,0.85)
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
			height: 240px
		#x
			position: absolute
			top: 16px
			right: 16px
			color: rgba(#fff,0.85)
			cursor: pointer
			font-size: 24px

</style>
