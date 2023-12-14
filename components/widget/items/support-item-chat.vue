<template lang="pug">
	.item-chat(:class="Mods")
		//form-checkbox.item-chat__checkbox(:checked="checked" @change.native="$emit('changeCheckbox')")
		component.item-chat__wrap.item-chat__wrap-without__checkbox(
			:is="to !== '' ? 'NuxtLink' : 'div'"
			:to="to !== '' ? to : false"
			:class="Mods"
			@click="$emit('change',conversation_id)"
		)
			span.item-chat__avatar(v-if="avatar")
				set-img(img-class="object-fit" :src="avatar" :default-img="avatar")
			span.item-chat__icon(v-else)
				svg-icon(name="headphones")
			span.item-chat__info
				span.item-chat__head
					span.item-chat__name.p.b {{name}}
					span.item-chat__status(v-if="status") {{status}}
					<!--span.item-chat__time(v-if="small == false") {{time}}-->
				span.item-chat__body
					span.item-chat__content
						span.item-chat__desc(v-if="desc") {{desc}}
						span.item-chat__text
							slot
					span.item-chat__counter(v-if="counter") {{counter}}
					<!--span.item-chat__time(v-if="small == true") {{time}}-->
</template>

<script>
    import {mapActions,mapGetters,mapMutations} from "vuex";
export default{
	props: {
		avatar: {
			type: String,
			default: ""
		},
		name: {
			type: String,
			default: "Support"
		},
		time: {
			type: String,
			default: "07:00 am"
		},
		status: {
			type: String,
			default: ""
		},
    conversation_id: {
			type: Number,
			default: 0
		},
		desc: {
			type: String,
			default: ""
		},
		counter: {
			type: Number,
			default: null
		},
		to: {
			type: String,
			default: ""
		},
    checked: {
			type: Boolean,
			default: false
		},
		button: {
			type: Boolean,
			default: false
		},
		small: {
			type: Boolean,
			default: false
		},
	},

	computed: {
        ...mapGetters({
          CONVERSATION_PAGE: 'chat/CONVERSATION_PAGE',
          ACTIVE_CONVERSATION_ID: 'chat/GET_ACTIVE_CONVERSATION_ID',
        }),
		Mods(){
			return {
				'item-chat_btn': this.button,
				'is-small': this.small,
			}
		}
	},
    methods:{
      ...mapMutations({
        SET_MESSAGE_TO_LIST: 'chat/SET_MESSAGE_TO_LIST',
        CHANGE_SIDEBAR_WHEN_SEND_MESSAGE: 'chat/CHANGE_SIDEBAR_WHEN_SEND_MESSAGE',
        CHANGE_CHAT_USERS_LIST: 'chat/CHANGE_CHAT_USERS_LIST',
        CHANGE_LIST_FROM_EVENT: 'chat/CHANGE_LIST_FROM_EVENT',
        SET_MESSAGES_SEEN: 'chat/SET_MESSAGES_SEEN',
      }),
      disconnect(conversation_id) {
        this.$echo.leave('send-message.' + conversation_id);
      },
    },
    beforeDestroy(){
      if (process.client && this.ACTIVE_CONVERSATION_ID) {
				this.disconnect(this.ACTIVE_CONVERSATION_ID);
			}
    },
    created() {
			if (process.client && this.conversation_id) {
				this.$echo.private(`chat-conversation-readAt-all.${this.conversation_id}-${this.$auth.user.id}`)
					.listen('.chat-conversation-readAt-all', (res) => {
						// this.CHANGE_SIDEBAR_WHEN_SEND_MESSAGE(res.message);
						this.SET_MESSAGES_SEEN(res.conversation)
					})
			}

    },
}
</script>

<style lang="scss">
.item-chat {
	position: relative;

	&_btn {
		cursor: pointer;

		.item-chat {
			&__wrap {
        padding: 13rem 18rem 13rem 18rem;

        border-radius: 7rem;
				transition: ease .15s;
        &:not(.item-chat__wrap-without__checkbox){
          padding: 13rem 18rem 13rem 54rem;
          @include large-mobile{
            padding: 15px 10px;
          }
        }
			}
			&__head {
				justify-content: space-between;
			}
			&__body {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			&__content {
				width: calc( 100% - 35rem );
			}
			&__desc {
				white-space: nowrap;
				overflow: hidden;
				max-width: 133rem;
				text-overflow: ellipsis;
			}
			&__text {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				width: 100%;
				max-width: 210rem;
			}
		}
		&:hover, &.isActive {
			.item-chat__wrap {
				background: #F5F7FB;
			}
		}

		&.is-small {
			.item-chat {
				&__wrap {
					padding-left: 20rem;
					padding-right: 4px;
				}
				&__content {
					margin-top: 5rem;
				}
				&__desc {
					max-width: 100%;
				}
				&__body {
					align-items: flex-end;
				}
			}
		}

		@include large-tablet {
			.item-chat {
				&__desc {
					max-width: 90%;
				}
				&__text {
					max-width: 90%;
				}
			}
		}

		@include large-mobile {
			.item-chat {
				&__wrap {
					padding: 15rem 10rem;
					border-radius: 0;
				}
				&__name {
					font-size: 17rem;
				}
				&__icon, &__avatar {
					width: 60rem;
					min-width: 60rem;
					height: 60rem;
					margin-right: 15rem;
				}
				&__info {
					width: calc( 100% - 75rem );
				}
			}
		}
	}

	&__wrap {
		display: flex;
		align-items: center;
	}

	&__checkbox {
    &.checkbox{
      position: absolute;
      left: 15rem;
      top: 50%;
      margin-top: -12rem;

      @include large-mobile {
        display: none;
      }
    }

	}

	&__icon, &__avatar {
		width: 60rem;
		min-width: 60rem;
		height: 60rem;
		border-radius: 100%;
		margin-right: 15rem;
		@include large-mobile {
			width: 40rem;
			min-width: 40rem;
			height: 40rem;
			margin-right: 10rem;
		}
	}

	&__avatar {
		position: relative;
		overflow: hidden;
	}

	&__icon {
		background: $blue;
		fill: none;
		stroke: #fff;
		stroke-width: 1.5;
		display: flex;
		align-items: center;
		justify-content: center;
		svg {
			width: 24rem;
			height: 24rem;
		}
	}

	&__info {
		width: 100%;
		display: block;
	}

	&__name {
		@include large-mobile {
			font-size: 16rem;
		}
	}

	&__head {
		display: flex;
		align-items: center;
    justify-content: space-between;
	}

	&__time {
		white-space: nowrap;
		margin-left: 13rem;
		padding-top: 3rem;
		color: #AEAEAE;
		@include large-mobile {
			padding-top: 1px;
			font-weight: 400;
		}
	}

	&__content {
		display: block;
		margin-top: 7rem;

		@include large-mobile {
			margin-top: 5rem;
		}
	}
	&__desc {
		font-size: 15rem;
		display: block;
		font-weight: 500;
		&:not(:last-child) {
			margin-bottom: 2px;
		}
	}

	&__text {
		color: #AEAEAE;
		display: block;
	}

	&__counter {
		width: 22rem;
		height: 22rem;
		flex-shrink: 0;
		background: $blue;
		border-radius: 100%;
		color: #fff;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		margin-top: 4rem;
	}

	&__status {
		display: inline-flex;
		align-items: center;
		height: 23rem;
		padding: 0 7rem;
		background: #F4F3F4;
		border-radius: 3px;
		font-size: 13rem;
		color: $gray;
	}

}
</style>
