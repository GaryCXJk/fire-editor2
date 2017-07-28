<template lang="html">
	<div id="itemEditor">
		<h1>Items</h1>
		<p>65535 is the max number of any given item (recorded in uses not items eg. if you wanted 20 bronze swords you would multiply 50 (the duribility) by 20 getting you 1000.)</p>
		<div id="item" v-for='(item, i) in items'>
			<inputNum v-bind:num='item' v-bind:pos='i' :label='itemNames[i]' :max='65535'></inputNum>
		</div>
		<a id='save' v-on:click='saveAll()'>Save Items</a>
	</div>
</template>

<script>
import * as Data from '../assets/js/data.js'
import * as itemReader from '../assets/js/itemReader.js'
import InputNum from './inputNum.vue'
import {EventBus} from '../assets/js/eventBus.js'

export default {
	components: {
		'inputNum': InputNum,
	},
	data () {
		return {
			items: [],
			itemNames: Data.Hex.items
		}
	},
	created () {
		EventBus.$on('readItems', n => {
			this.items = itemReader.readConvoy()
			console.log(this.items)

		}),
		EventBus.$on('updateValue', n => {
			this.items[n[1]] = n[0]
		})

	},
	methods: {
		saveAll: function() {
			EventBus.$emit('SaveAllConvoy');
			var t = '';
			for(var i = 0; i < this.items.length; i++) {
				t += this.items[i].substring(2, 4) + this.items[i].substring(0, 2);
			}
			Data.file.items = t;
		}

	}
}
</script>

<style lang="sass">
	#itemEditor
		overflow-y: scroll
		padding: 16px
		height: 100%
		h1, p
			color: rgba(#fff, 0.85)
			margin-bottom: 16px
		>div
			width: 200px
			display: inline-block
	#save
		padding: 8px 16px
		background-color: #b29dc7
		border-radius: 2px
		position: absolute
		bottom: 16px
		right: 16px
		color: #252830
		cursor: pointer
		text-decoration: none
</style>
