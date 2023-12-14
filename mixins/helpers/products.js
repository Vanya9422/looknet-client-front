const filter = "filter=id;name;created_at;price_policy;show_details;contact_phone;description;price;slug;user_id;city_id;category_id;contacts;status;longitude;latitude"
const withField = "with=city:id,name;author:id,created_at,first_name,last_name;author.avatar;gallery"
const vip = "vip_products=true"
const noVip = "vip_products=false"

export {
  filter,
  withField,
  vip,
  noVip
}
