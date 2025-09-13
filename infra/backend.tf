terraform {
  backend "s3" {
    bucket         = "tfstate-inmobiliaria-admin-eu-south-2"
    key            = "spa/terraform.tfstate"
    region         = "eu-south-2"
    dynamodb_table = "tf-locks"
    encrypt        = true
  }
}