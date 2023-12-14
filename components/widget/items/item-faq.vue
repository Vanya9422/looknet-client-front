<template lang="pug">
	.item-faq(:class="Mods" ref="item")
		.item-faq__head(@click="ToggleFaq")
			.item-faq__title.h5 {{title}}
			.item-faq__arrow
				svg-icon(name="close" viewBox="0 0 10 9")
		b-collapse.item-faq__body(
			v-model="active" 
			:accordion="groupName" 
			role="tabpanel" 
		)
			.item-faq__content.content(v-html="content")
</template>

<script>
export default{
	props: {
		title: {
			type: String
		},
		content: {
			type: String
		},
		visible: {
			type: Boolean,
			default: false
		},
		groupName: {
			type: String,
			default: null
		},
	},
	data(){
		return {
			active: this.visible
		}
	},
	computed: {
		Mods(){
			return {
				'isActive': this.active,
			}
		}
	},
	methods:{
		/*toggle() {

			if ( this.$refs.item.classList.contains('isActive') ) {
				this.$refs.item.classList.remove('isActive');
			} else {

				var matches = document.querySelectorAll('.item-faq');
	       		for(var i = 0; i < matches.length; i++) {
	       			matches[i].classList.remove('isActive');
	      		}

	      		this.$refs.item.classList.add('isActive');

			}
		},*/
		ToggleFaq(){
			this.active = !this.active
		}
	}
}
</script>

<style lang="scss">
.item-faq{
	border-bottom: 1px solid $light-gray;
	&.isActive {
		.item-faq {
			&__head {
				color: $blue;
			}
			&__arrow {
				svg {
					transform: rotate(0);
					stroke: $blue;
				}
			}
		}
	}
	&__head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rem 15rem 20rem 0;
		min-height: 76rem;
		cursor: pointer;
		transition: ease .15s;
    &:hover{
      color: $blue;
    }

		@include large-mobile {
			min-height: 56rem;
			padding-right: 5rem;
			padding-left: 10rem;
		}
	}
	&__title {
		@include large-mobile {
			font-size: 16rem;
			font-weight: 600;
			line-height: 1;
		}
	}
	&__arrow {
		width: 20rem;
		height: 20rem;
		display: flex;
		align-items: center;
		justify-content: center;
		svg {
			width: 13rem;
			height: 13rem;
			stroke: $gray;
			stroke-width: 1;
			transform: rotate(-45deg);
			transition: ease .2s;
		}
	}

	&__body {

		transform: translateY(-10rem);
		@include large-mobile {
			padding-left: 10rem;
			transform: translateY(-5rem);
		}
	}

	&__content {
		max-width: 790rem;
		color: $gray;
		line-height: 1.4;
		padding-bottom: 20rem;
		p {
			&:not(:first-child) {
				margin-top: 10rem;
			}
		}

		@include large-mobile {
			font-size: 14rem;
			font-family: 'Gilroy';
			padding-bottom: 15rem;
		}
	}
}
</style>