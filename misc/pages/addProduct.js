export default  {
  addGallery:{
    title: 'What do you want to sell?',
    skip1: 'Upload images or',
    skip2: 'this step',
    subTitle: 'Click to upload or drop a photo',
    description: 'The first photo will be displayed in the search results, choose the most successful one',
    list:[
      {text:'You can upload up to 10 photos'},
      {text:'Format JPG or PNG format'},
      {text:'Only upload media you own the rights to'},
      {text:'The maximum photo size is 25MB.'},
    ]
  },
  addGalleryModal:{
    title: 'Add photos?',
    description: 'Are you sure you want to continue without photos? People view ads with a photo more often by 60%',
    checkbox: 'Don’t ask me again ',
    btnClose:'Not now',
    btnSave:'Add a photo'
  },
  form:{
    title:{
      label:'Name advertise',
      placeholder:'Name of advertise'
    },
    description:{
      label:'Description',
      placeholder:'Tell us about the product'
    },
    price:{
      placeholder:'$ 0.00'
    },
    checkbox:'Availabale cost',
    nav: [
      {
        text: 'Cost',
        status:1,
      },
      {
        text: 'For free',
        status:0,
      },
      {
        text: 'Exchange',
        status:2,
      },
      {
        text: 'Contractual',
        status:3,
      },
    ],
    gallery:{
      pin:'сделать главной',
      main:'main photo',
      drop:'Drag to change the cover',
      error:'Max photo length 10, delete images'
    }
  },
  category:{
    title:'Choose category',
    back:'Choose category',
    search:'Search',
    cancel:'Cancel',
  },
  mainCategory:{
    title:'Main category',
    edit:'Edit',
    all:'All categories',
    create:'Creat Advertise',
    recommended:'Recommended category*',
    selected:'Selected',
    link:{
      label:'Youtube link',
      placeholder:'Sent the url on video'
    },
    address:{
      label:'Enter the address',
      map:'Map',
      placeholder:'Baker street NY 3290# 20001'
    },
    phone:{
      label:'Enter the address',
      list:[
        {text:'Phone and message',status:0,info:'Choose the way for contact with you' },
        {text:'Only phone',status:1,info:'Choose the way for contact with you'},
        {text:'Only message',status:2,info:'Choose the way for contact with you'},
      ]
    },
    renewal:{
      label:'Auto-renewal',
      placeholder:'Turn on',
      info:'Choose the way for contact with you',
    },
    buttons:{
      cancel:'Cancel',
      draft:'Save as Draft',
      draft1:'Draft',
      create:'Create',
      save:'Publish now',
      skip:'Skip',
      next:'Next',
    }
  }
}
