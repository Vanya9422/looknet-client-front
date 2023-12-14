<template lang="pug">
  main.main.favorites-page-main
    .wrap.favorites-page-wrap
      section-favorites-ad.favorites-ad-page
</template>

<script>
export default {
  middleware:['auth-favorite']
}
</script>
