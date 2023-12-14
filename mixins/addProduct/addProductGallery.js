import collect from "collect.js";

export default {
  data() {
    return {
      files: [],
      dt: process.client ? new DataTransfer() : null,
      idx: 0
    }
  },
  methods: {
    changeFiles(id = 'files') {
      if (!process.client) return;
      const oldFiles = document.getElementById(id).files
      this.getFileObject(id)
    },
    getFileObject(id = 'files') {
      if (!process.client) return;
      const files = document.getElementById(id).files
      const fileArray = Array.from(files);
      let index = this.allFiles.length - 1;
      const fileObjects = fileArray.map((file) => {
        return new Promise(resolve => {
          let reader = new FileReader();
          reader.onload = e => {
            resolve({
              _id: this._.uniqueId('new-'),
              size: file.size,
              type: file.type,
              file: e.target.result,
              original_full_url: e.target.result,
              name: file.name,
              order_column: ++index
            });
          };
          reader.readAsDataURL(file);
        });
      });
      Promise.all(fileObjects).then(items => {
        items.map(item => {
          const el = this.allFiles.find(e => e._id === item._id)
          if (!el) this.allFiles.push(item)
        })
      });

    },
    deleteItem(index, id = 'files') {
      if (!process.client) return;
      this.dt.items.remove(index);
      document.getElementById(id).files = this.dt.files;
      this.getFileObject(id)
    },
    deleteItemAll() {
      if (!process.client) return;
      this.dt = new DataTransfer()
      document.getElementById('files').files = this.dt.files;
      this.getFileObject()
    },
    orderFiles(files) {
      if (!process.client) return;
      const dt_array = Object.values(this.dt.files);
      this.dt = new DataTransfer()
      files.map((item, index) => {
        item.order_column = index
        const element = dt_array.find(el => el._id === item._id);
        if (element) this.dt.items.add(element);
      })
      this.allFiles = files
    },
    changeFilesDt(id) {
      this.changeFiles(id);
      this.$root.$emit('bv::hide::modal', 'modal-question');
      this.step++;
      if (process.client && document.getElementById('test')) {
        document.getElementById('test').files = this.dt.files;
      }
    },
    deleteItemDt() {
      const idx = this.deleteIndex
      if (this.allFiles[idx].id) {
        this.$axios.$delete(`/products/${this.$route.params.product}/${this.allFiles[idx].id}`)
            .then(() => {
              this.allFiles.splice(idx, 1)
              if (this.activeImag === this.allFiles.length) this.activeImag =  this.allFiles.length - 1
            })
      } else {
        // const dt_array = Object.values(this.dt.files);
        // const element = dt_array.findIndex(el => el._id === this.allFiles[idx]._id);
        // this.dt.items.remove(element);
        this.allFiles.splice(idx, 1)
        if (this.activeImag === this.allFiles.length) this.activeImag = this.allFiles.length - 1
      }
    },
    fileToTop(index) {
      if (!process.client) return;
      const new_idx = this.allFiles[index].order_column;

      this.allFiles[index].order_column = 0;
      this.allFiles[0].order_column = new_idx;
      this.allFiles = collect(this.allFiles).sortBy('order_column').all()


      const dt_array = Object.values(this.dt.files);
      this.dt = new DataTransfer()
      this.allFiles.map((item, index) => {
        item.order_column = index
        const element = dt_array.find(el => el._id === item._id);
        if (element) this.dt.items.add(element);
      })


      // const oldFiles = this.dt.files
      // const newList = new DataTransfer()
      // newList.items.add(oldFiles[index]);
      // this.deleteItemDt(index)
      // for (let file of oldFiles) {
      //   newList.items.add(file);
      // }
      // document.getElementById('test').files = newList.files;
      // this.dt = newList
      // const files = document.getElementById('test').files
      // let arr = []
      // const readFile = (index) => {
      //   let item = {}
      //   if (index >= files.length) {
      //     this.files = arr
      //     return;
      //   }
      //   let file = files[index];
      //   let reader = new FileReader();
      //   reader.onload = function (e) {
      //     if (file.type.search("image") >= 0) {
      //       item.file = e.target.result
      //     }
      //     item.name = file.name
      //     readFile(index + 1)
      //   }
      //   arr.push(item)
      //   reader.readAsDataURL(file);
      // }
      // readFile(0);
    },
  }
}
