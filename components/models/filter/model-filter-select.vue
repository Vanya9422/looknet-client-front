<template>  
  <div class="form-select-filter" :class="parentMods" v-click-outside="leaveBodyHandler">
    <div class="form-select-filter__header" @click="toggleVisibleState">{{ currentLabel }}
      <svg-icon class="form-select-filter__icon" name="arrowDown" viewBox="0 0 11 7"></svg-icon>
    </div>
    <div class="form-select-filter__body">
      <fieldset class="form-select-filter__list" v-if="filter && filter.answers && filter.answers.length > 0" :id="filter.slug">
        <ul class="form-select-filter__list-inner css-scrollbar">
          <li class="label form-select-filter__list-item">
            <label class="form-select-filter__list-target" v-for="answer in filter.answers" :key="answer.id">
              <input class="form-select-filter__input" type="radio" :name="filter.slug" :true-value="{id: answer.id, filterId: filter.id}" :value="{id: answer.id, filterId: filter.id}" v-model="result"><span class="form-select-filter__list-text">{{ answer.name }}</span>
            </label>
          </li>
        </ul>
      </fieldset>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';

export default {
	directives: {
		ClickOutside
	},
	props: {
		value: {
			type: [Object],
			default: null
		},
        filter: {
            type: Object,
            default: null
        },
        error: {
            type: Boolean,
            default: false
        }
	},
	data(){
		return {
			visibleState: false
		}
	},
	computed: {
        result: {
            get(){
                return this.value
            },
            set(value){
                this.$emit('input', value)
				this.disableVisibleState()
            }
        },
        isDisabled(){
            return this.filter === null || this.filter === undefined || Object.keys(this.filter).length === 0
        },
		selectionAnswer(){
			if(this.isDisabled || !this.value) return null;
			const filterAnswers = this.filter?.answers || [];
			const answer = filterAnswers.find(filterAnswer => filterAnswer.id === this.value?.id)
			return answer;
		},
		currentLabel(){
			if(!this.selectionAnswer || !this.selectionAnswer?.name) return 'Choose'
			return this.selectionAnswer.name
		},
        parentMods(){
            return {
                'is-disabled' : this.isDisabled,
				'is-open': this.visibleState,
				'is-error': this.error
            }
        }
	},
	methods: {
		disableVisibleState(){
			this.visibleState = false
		},
		toggleVisibleState(){
			this.visibleState = !this.visibleState
		},
		leaveBodyHandler(){
			if(!this.visibleState) return false;
			this.disableVisibleState()
		}
	}
}
</script>

<style lang="scss">
.form-select-filter{
	position: relative;

	@include large-mobile{
		margin-top: 10px;
	}

	&.is-open{
		.form-select-filter{
			&__body{
				display: block;
			}
			&__icon{
				transform: rotate(-180deg);
			}
		}
	}

	&.is-disabled{
		.form-select-filter{
			&__header{
				background: #F4F3F4;
				color: #83929D;

			}
			&__icon{
				stroke: $light-gray;
			}
		}
	}

	&.is-error{
		.form-select-filter{
			&__header{
				border-color: $red;

			}
		}
	}

    &__header{
		display: flex;
		align-items: center;
		height: 60rem;
		padding: 0 54rem 0 25rem;
		font-weight: 500;
		border: 1px solid $light-gray;
		border-radius: 10rem;
		color: $gray;

		@include large-mobile{
			height: 50px !important;

			padding: 0 40px 0 15px;
		}
	}

	&__body{
		position: absolute;
		left: 0;
		z-index: 10;
		top: 100%;
		width: 100%;
		padding-top: 10rem;
		display: none;
	}

	&__list{
		background: #fff;
		padding: 10rem;
		border: 1px solid #D2D2D7;
		border-radius: 5px 5px 15rem 15rem;
	}

	&__list-inner{
		padding: 10rem 10rem 10rem 0;
		max-height: 300rem;
	}

	&__list-item{
		display: block;
	}

	&__list-target{
		cursor: pointer;
		display: block;
	}

	&__list-text{
		display: block;
		padding: 10rem 20rem;
		border-radius: 5px;
		transition: ease .2s;
		font-size: 17rem;
		&:hover {
			color: $blue;
		}

		@include large-mobile{
			font-size: 16px;
		}
	}

	&__input{
		display: none;
		&:checked {
			& + .form-select-filter__list-text {
				background: #F5F5F7;
				color: $default;
			}
		}
	}

	&__icon{
		position: absolute;
		right: 22rem;
		width: 12rem;
		top: 50%;
		margin-top: -3rem;
		fill: transparent;
		stroke-width: 1.4;
		stroke: $gray;

		@include large-mobile{
			right: 15px;
			width: 9rem;
		}
	}
}

</style>
