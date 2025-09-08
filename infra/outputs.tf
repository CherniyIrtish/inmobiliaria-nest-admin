output "cloudfront_domain" {
  description = "Домен CloudFront"
  value       = aws_cloudfront_distribution.cdn.domain_name
}

output "cloudfront_url" {
  description = "Открывай SPA по этому URL"
  value       = "https://${aws_cloudfront_distribution.cdn.domain_name}"
}

output "distribution_id" {
  value = aws_cloudfront_distribution.cdn.id
}

output "bucket_name_out" {
  description = "Имя S3 бакета со статикой"
  value       = aws_s3_bucket.frontend.bucket
}