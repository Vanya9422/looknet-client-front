<template lang="pug">
.form-range-input
    .input.form-range-input__field(
        v-for="(number, index) in 2"
        :key='index'
        v-click-outside="(evt) => clickOutsideHandler(evt, index)"
    )
      input.input__field(
          :type="type"
          ref="field"
          v-model="result[index]"
          @input='inputHandler(index)'
          @focus='focusHandler(index)'
          @blur='blurHandler(index)'
          :placeholder="placeholder[index]"
          autocomplete="off"
      )
      client-only(
        v-if="!!$slots[getSlotNameByIndex(index, 'tippy')]"
      )
        .form-range-input__tippy-hack.absolute
          tippy.tippy-hide(
            interactive
            :delay="[0,0]"
            :duration="[0,0]"
            :animation="[false, false]"
            :animate-fill="false"
            :distance="6"
            max-width="none"
            theme="light"
            animation="fade"
            trigger="manual"
            :hide-on-click="false"
            :visible="tippyVisible[index]"
            :arrow="false"
            append-to="parent"
            :placement="`${index === 0 ? 'bottom-start' : 'bottom-end'}`"
            @hide="tippyHideHandler(index)"
          )
            slot(:name="getSlotNameByIndex(index, 'tippy')")
</template>
<script>
import ClickOutside from 'vue-click-outside';

export default {
    directives: {
      ClickOutside
    },
    data(){
        return {
            tippyVisible: [false, false]
        }
    },
    props: {
        value: {
            type: Array,
            default: () => [
                '', ''
            ]
        },
        type: {
          type: String,
          default: "text"
        },
        placeholder: {
            type: Array,
            default: () => [
                'From', 'To'
            ]
        },
        useNumberControll: {
          type: Boolean,
          default: true
        },
    },
    computed: {
        result: {
            get(){
                return this.value
            },
            set(value){
                this.$emit('input', value)
            }
        }
    },
    methods: {
        emitInput(index, name){
          if(index === 0){
            this.$emit(`${name}From`, index, this.result[0])
          }else{
            this.$emit(`${name}To`, index, this.result[1])
          }
        },
        inputHandler(index){
          this.beautifyNumber(index);
          this.emitInput(index, 'input')
        },
        focusHandler(index){
          this.showTippy(index)
          this.emitInput(index, 'focus')
        },
        blurHandler(index){
          this.emitInput(index, 'blur')
          this.numberControll(index)
        },
        tippyHideHandler(index){
          this.emitInput(index, 'tippyHide')
        },
        clickOutsideHandler(evt,index){
          if(!this.tippyVisible[index]) return false;
          this.hideTippy(index)
        },
        showTippy(index){
          this.$set(this.tippyVisible, index, true)
        },
        hideTippy(index){
          this.$set(this.tippyVisible, index, false)
        },
        hideAllTippy(){
          this.tippyVisible = [false, false];
        },
        getSlotNameByIndex(index, name){
          const slot = index === 0 ? `${name}From` : `${name}To`;
          return slot;
        },
        getTippyName(index){
          if(!this.$slots[this.getSlotNameByIndex(index , 'tippy')]) return null;
          return this.getSlotNameByIndex(index, 'tippy')
        },
        numberControll(index){
            if(!this.useNumberControll) return false;

            const minValue = this.result[0] !== '' ? Number(this.result[0]) : 0;
            const maxValue = this.result[1] !== '' ? Number(this.result[1]) : 0;

            if(index === 0 && minValue > maxValue && maxValue){
                this.$set(this.result, 0, '')
            }
            if(index === 1 && minValue > maxValue && minValue){
                this.$set(this.result, 1, '')
            }

        },
        beautifyNumber(index){
            let value = this.result[index].replace(/[^0-9.]/g, "")

            if(value.split('.').length>2) {
                value =value.replace(/\.+$/, "");
            }

            // Удаляет первый символ "0"
            // if (value[0] === '0') {
            //     value = value.substring(1);
            // }

            this.$set(this.result, index, value)
        }
    }
}
</script>
<style lang="scss">
.form-range-input{
    display: flex;
    position: relative;
    // margin-bottom: 20rem;
    margin-top: 20rem;

    &::before{
        position: absolute;
        content: '';
        display: block;
        width: 1px;
        height: 30rem;
        top: 50%;
        left: 50%;
        z-index: 1;
        margin-top: -15rem;
        background: #D2D2D7;
    }
    &__tippy-hack{
      z-index: -1;
    }
    &__field{
        flex: 1 1 auto;

        .input__field{
            border-color: #D2D2D7!important;
        }

        &:first-child{

            .input__field{
                border-right: none;
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
            }
        }

        &:last-child{
            .input__field{
                border-left: none;
                border-bottom-left-radius: 0;
                border-top-left-radius: 0;
            }

        }
    }
}
</style>
