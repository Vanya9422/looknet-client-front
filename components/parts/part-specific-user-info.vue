<template lang="pug">
.part-specific-user-info
    .part-specific-user-info__header.flex.flex_justify.flex_vertical 
        .part-specific-user-info__title.h4
            | Account info 
        .part-specific-user-info__field
            //- :checked="available_cost" 
            //- @change="$emit('changeCost')"
            form-radio-switch.part-specific-user-info__switcher(
                :checked='enable'
                @change='toggleVisibleState'
            ) 
                | Use other name
    
    .part-specific-user-info__body(v-if='enabled')
        .part-specific-user-info__row.flex
            .part-specific-user-info__cell
                //- v-model="form.name"
                //- @input="$v.form.name.$touch()"
                //- :error="$v.form.name.$error"
                form-input(
                    placeholder="Name"
                    v-model='form.name'
                    @input="validation.name.$touch()"
                    :error="validation.name.$error"
                )
            .part-specific-user-info__cell
                form-input(
                    placeholder="Second name"
                    v-model='form.secondName'
                    @input="validation.secondName.$touch()"
                    :error="validation.secondName.$error"
                )

        .part-specific-user-info__bottom
            //- :img="img" @change="changeAvatar"
            //- modal-avatar-user
            //- :img="img"
            //- :error="errorFile"
            //- @click.native.prevent="$bvModal.show('modal-avatar-user')"
            //- :title="PAGE_REGISTER_DONE.avatar.title"
            //- name="file-no-go"
            modal-avatar-user(
                :prop-img="previewImage" 
                @change="changeAvatar"
            )
            module-add-avatar.part-specific-user-info__avatar(
                :img='previewImage'
                @click.native.prevent="$bvModal.show('modal-avatar-user')"
            )
                | add your photo for answers
                br
                | photos and reviews
</template>

<script>
export default {
    props: {
        enable: {
            type: Boolean,
            default: false
        },  
        preview: {
            type: String,
            default: ""
        },
        validation: {
            type: Object,
            default: () => ({})
        },
        value: {
            type: Object,
            default: () => ({
                name: '',
                secondName: '',
                image: null
            })
        }
    },

    data(){
        return {
            previewImage: this.preview,
            form: this.value
        }
    },

    watch: {
        value(value){
            if(JSON.stringify(value) === JSON.stringify(this.form)) return false;
            this.form = value

            if(!value?.image){
                this.previewImage = ''
            }
        },
        form(value){
            this.$emit('input', value)
        },
        preview(value){
            this.previewImage = value
        }
    },  

    computed: {
        enabled: {
            get(){
                return this.enable
            },
            set(value){
                this.$emit('changeEnable', value)
            }
        }
    },

    methods: {
        toggleVisibleState(){
            this.enabled = !this.enabled
        },
        changeAvatar(val) {
            // this.errorFile = null
            if (!process.client) return;

            if(val){
                let urlCreator = window.URL || window.webkitURL;
                this.previewImage = urlCreator.createObjectURL(val);
                this.form.image = val             
                return false;   
            }

            this.resetAvatar()
        },

        resetAvatar(){
            this.previewImage = ''
            this.form.image = null            
        }
    }
}
</script>

<style lang="scss">
.part-specific-user-info{
    &__header{
        margin-bottom: 25rem;
    }

    &__row{
        margin: -10rem;
    }

    &__cell{
        flex: 1 1 auto;
        margin: 10rem;
    }

    &__avatar{
        .button-photo{
            height: 120rem;
        }
    }

    &__bottom{
        margin-top: 20rem;
    }
}
</style>