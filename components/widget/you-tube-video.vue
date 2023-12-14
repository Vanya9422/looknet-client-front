<template lang="pug">
  iframe(
    class="form-create-youTube"
    :src="`https://www.youtube.com/embed/${newLink}${disabled ? '?modestbranding=1&controls=0' : ''}`"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  )
</template>
<script>
import {getIdFromUrl} from 'vue-youtube'


export default {
  props: {
    link: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed:{
    newLink(){
      return getIdFromUrl(this.link)
    }
  }
}
</script>

<style lang="scss">
.form-create-youTube.object-fit{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
}
</style>
