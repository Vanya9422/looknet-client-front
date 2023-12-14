<template lang="pug">
  section.section-contacts
    .wrap
      part-page-preview.section-contacts__preview(
        :title="content.title"
        :img="background_images.background"
      )
      .section-contacts__row.flex.flex_justify
        .section-contacts__column.section-contacts__column_left
          .section-contacts__list
            item-contact.section-contacts__item(
              v-for="(contact, i) in contacts"
              :key="i"
              :title="contact.title"
              :row="contact.row"
            )
        .section-contacts__column.section-contacts__column_right
          .section-contacts__map
            .section-contacts__map-title.h3 {{ content.map.title}}
            .section-contacts__map-img
              client-only
                google-map(:lat="content.map.latitude" :lng="content.map.longitude")
      part-need-help.section-contacts__help(
        :title="content.banner.name"
        :btn="content.banner.btn"
        :default-img="require(`~/assets/img/Support.jpg`)"
        :img="background_images.bannerBackground"
      ) {{content.banner.desc}}
    modal-form-contact
    modal-thank
</template>

<script>
export default {
  props: {
    contacts: {
      type: Array,
      default: () => ([])
    },
    background_images: {
      type: Array,
      default: () => ([])
    },
    content: {
      type: Object,
      default: () => ({})
    }
  },
}
</script>
