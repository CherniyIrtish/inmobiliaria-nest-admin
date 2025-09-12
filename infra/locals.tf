resource "random_id" "suffix" { byte_length = 2 }

locals {
  bucket_name = "vue-spa-${random_id.suffix.hex}"
}