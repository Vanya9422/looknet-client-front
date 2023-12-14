import {mapGetters} from "vuex";
import filterController from "~/core/controllers/filterController";
import { findRouteIndex } from "~/tools/location.function";

export default {
  data() {
    return {
      serverFiles: [],
      serverFilesLength: 0,
      allFiles: [],
      activeCategoryParentId: 0,
    }
  },
  computed: {
    ...mapGetters({
      LOCATION: 'location/LOCATION',
      GOOGLE_KEY: 'location/GOOGLE_KEY',
    }),
    getFiles() {
      return this.$collect(this.allFiles).sortBy('order_column').all()
    }
  },
  async mounted() {
    const slug = this.$route.params.product
    if (slug) await this.getActiveProduct(slug)
    else {
      const city = this.LOCATION
      if (city && city.id !== 'c1') {
        this.form.city_id = city.id
        this.form.latitude = city.latitude
        this.form.longitude = city.longitude
        this.city = city
        this.city.latitude = city.latitude
        this.city.longitude = city.longitude
        const key = this.GOOGLE_KEY
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${city.latitude},${city.longitude}&key=${key}`).then(async data => {
          const result = await data.json()
          const routeIndex = findRouteIndex(result.results);
          this.form.address = result.results[routeIndex].formatted_address
        })
      }
    }

    this.allFiles = [...this.serverFiles, ...this.files]

  },
  methods: {
    async getActiveProduct(slug) {
      try {
        const { data } = await this.$axios.$get(`/products/${slug}?with=category;author.avatar;gallery;city.state_minimal_select;answers.filter`);
        const form = {
          id: data.id,
          name: data.name,
          description: data.description,
          price: data.price,
          available_cost: data.available_cost || 0,
          price_policy: data.price_policy || 1,
          answers: [],
          link: data.link,
          address: data.address,
          contact_phone: data.contact_phone,
          contacts: data.contacts,
          auto_renewal: data.auto_renewal,
          city_id: data.city.id,
          latitude: data.latitude,
          longitude: data.longitude,
          hide_address: data.hide_address,
        }

        // fake
        this.enableAnotherUser = data?.is_fake || false;
        this.anotherUser = {
          name: data?.fake_data?.first_name  || '',
          secondName: data?.fake_data?.last_name || '',
        }
        this.anotherUserPreviewImage = data?.fake_image?.original_full_url || '';

        this.city = data.city
        this.city.latitude = data.latitude
        this.city.longitude = data.longitude
        this.serverFiles = data.gallery
        this.serverFilesLength = data.gallery.length
        this.answers = data.answers
        const filterField = `filter=id;slug;name;parent_id`
        const withField = `with=picture;allSubCategories;parentCategories.allSubCategories`
        const category = await this.$axios.$get(`/categories?searchFields=id:=&search=${data.category.id}&${filterField}&${withField}`)
        this.category = category.data[0]
        if (this.category.parentCategories) {
          this.activeCategoryParentId = this.category.id;
        }
        this.breadcrumbs = this.$categoryBreadcrumbs(category.data[0])

        form.answers = data.answers.map((answer) => {
          let editAnswer = {};
          const filter = answer?.filter;
          const filterType = filter?.type || 0;
          if (filterType === 2 || filterType === 3) {
            const answerTemp = {};
            if (answer?.boolean_value !== null && answer?.boolean_value !== undefined) {
              answerTemp.id = answer.id
            } else {
              if(answer?.id) answerTemp.id = answer?.id;
              if(answer?.number_value) answerTemp.number_value = answer?.number_value;
              if(answer?.string_value) answerTemp.string_value = answer?.string_value;
              if(filter?.id) answerTemp.filterId = filter?.id;
              // if(filter?.id) answerTemp.filter_id = filter?.id;
            }
            editAnswer = answerTemp
          } else {
            editAnswer.id = answer.id
          }
          return editAnswer
        })

        this.form = form
        this.active = this.content.form.nav.findIndex(item => item.status === data.price_policy)
        this.step = 2
      } catch (error) {
        console.error(error);
      }
    }
  }
}
