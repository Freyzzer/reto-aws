// aws-exports.d.ts
declare const awsmobile: {
  "aws_project_region": "us-east-2",
  "aws_cognito_identity_pool_id": "us-east-2:6a85b660-f793-4ea0-8a3b-e75417246a28",
  "aws_cognito_region": "us-east-2",
  "aws_user_pools_id": "us-east-2_OupbFXPUD",
  "aws_user_pools_web_client_id": "3oo8q2q8jhq6v6m9iq4276bkub",
  "oauth": object,
  "aws_cognito_username_attributes": [
      "EMAIL"
  ],
  "aws_cognito_social_providers": [],
  "aws_cognito_signup_attributes": [
      "EMAIL"
  ],
  "aws_cognito_mfa_configuration": "OFF",
  "aws_cognito_mfa_types": [
      "SMS"
  ],
  "aws_cognito_password_protection_settings": {
      "passwordPolicyMinLength": 8,
      "passwordPolicyCharacters": []
  },
  "aws_cognito_verification_mechanisms": [
      "EMAIL"
  ],
  "aws_content_delivery_bucket": "retoaws-20250204172646-hostingbucket-dev",
  "aws_content_delivery_bucket_region": "us-east-2",
  "aws_content_delivery_url": "https://d3juxqcahohx7f.cloudfront.net"
};
  
  export default awsmobile;