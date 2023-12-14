<template lang="pug">
  .single-recommend(v-if="products")
    h3.single-recommend__title.h3 {{recommendTitle}}

    .single-recommend__list.flex
      item-card.single-recommend__item(
        v-for="(item, i) in products"
        :key="i"
        :name="item.name"
        :city="item.city_name"
        :coordinates="{longitude:item.longitude,latitude:item.latitude}"
        :date="item.created_at"
        :phoneNumber="item.contact_phone"
        :price="item.price"
        :pricePolicy="item.price_policy",
        :gallery="$galleryList(item.gallery)"
        :status="item.status"
        :to="item.slug",
        :id="item.id",
        :author_id="item.user_id",
        @show="openProductModal(i,products)"
      )

    button-primary.single-recommend__button(gray v-if="showMore" @click.prevent.native="$emit('more')") {{moreText}}
</template>

<script>
import openProductModal from "@/mixins/openProductModal";

export default {
  props: {
    products: {
      type: Array,
      default: () => ({})
    },
    showMore:{
      type:Boolean,
      default:false
    },
    recommendTitle:{
      type:String,
      default:'Recomend'
    },
    moreText:{
      type:String,
      default:'Показать еще'
    }
  },
  data() {
    return {
      catalog: [
        {
          name: 'Объектив SLR Magic. Sony E. 25mm f1.4 2',
          city: 'New Your',
          distance: '2 km near you',
          date: '4 days ago',
          price: 22228,
          phoneNumber: '+ 1 376 266 5353',
          status: 'VIP',
          gallery: [
            'item-card__img1.jpg',
            'item-card__img2.jpg',
            'item-card__img3.jpg',
            'item-card__img4.jpg',
            'item-card__img5.jpg'
          ]
        },
        {
          name: 'Объектив SLR Magic. Sony E. 25mm f1.2',
          city: 'New Your',
          distance: '3 km near you',
          date: '5 days ago',
          price: 128,
          phoneNumber: '+ 1 379 266 5353',
          status: 'VIP',
          gallery: [
            'item-card__img2.jpg',
          ]
        },
        {
          status: 'VIP',
          gallery: [
            'item-card__img3.jpg',
          ]
        },

        {
          name: 'Объектив SLR Magic. Sony E. 25mm f1.4 2',
          city: 'New Your',
          distance: '2 km near you',
          date: '4 days ago',
          price: 22228,
          phoneNumber: '+ 1 376 266 5353',
          status: 'VIP',
          gallery: [
            'item-card__img1.jpg',
            'item-card__img2.jpg',
            'item-card__img3.jpg',
            'item-card__img4.jpg',
            'item-card__img5.jpg'
          ]
        },
        {
          name: 'Объектив SLR Magic. Sony E. 25mm f1.2',
          city: 'New Your',
          distance: '3 km near you',
          date: '5 days ago',
          price: 128,
          phoneNumber: '+ 1 379 266 5353',
          status: 'VIP',
          gallery: [
            'item-card__img2.jpg',
          ]
        },
        {
          status: 'VIP',
          gallery: [
            'item-card__img3.jpg',
          ]
        },
      ]
    }
  },
  mixins:[openProductModal],
}
</script>

<style lang="scss">
.single-recommend {

  &__title {
    margin-bottom: 0;

    //@include large-mobile {
    //  margin-bottom: 0rem;
    //}
  }

  &__list {
    @include min-large-mobile {
      @include items(3, 5);
    }

    @include large-mobile {
      @include items(2, 5);
    }
  }
  &__item{
    margin-top: 40px;
    @include large-mobile {
      margin-top: 20px;
    }
  }

  &__button {
    width: 100%;
    margin-top: 45rem;
    @include large-mobile {
      margin-top: 30rem;
    }
  }
}
</style>
