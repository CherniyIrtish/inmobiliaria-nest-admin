terraform {
  backend "s3" {
    bucket       = "tfstate-inmobiliaria-admin-eu-south-2"
    key          = "spa/terraform.tfstate"
    region       = "eu-south-2"
    encrypt      = true
    use_lockfile = true
  }
}