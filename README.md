# Javascript-games s3 doc with aws cli


## Create a bucket command

`aws s3api create-bucket --bucket test-bucket-989282 --region eu-central-1`

if not works due to location constraint then use
`aws s3 mb s3://mybucket` 
 this will handle the location constraint automatically

## Remove a bucket (not needed now, but in case you need another bucket name then delete it first)
`aws s3 rb s3://bucket-name --force` 

## Command to create a variable with an existing bucket on s3
``mybucket=$(aws s3api list-buckets --output text --query 'Buckets[?contains(Name, `some-letters-included-in-bucket-name`) == `true`].Name')``

## Command to copy static website files to that bucket
`aws s3 sync ~/your-files-location/ s3://$mybucket/`

## Create a `website.json` file and copy this content in it

you can use `touch file-name` to create a new file and edit with any editor you like 
```
{
  "IndexDocument": {
      "Suffix": "index.html"
  },
  "ErrorDocument": {
      "Key": "error.html"
  }
}
```

## Command for website hosting from the above s3
`aws s3api put-bucket-website --bucket $mybucket --website-configuration file://~/your-files-location/website.json `

## Create a `policy.json` file with the following content this creates a policy so that the contents of bucket can be publicly accessible
```
{
  "Version": "2012-10-17",
  "Statement": [{
      "Effect": "Allow",
      "Principal": "*",
      "Action": ["s3:GetObject"],
      "Resource": "arn:aws:s3:::[BUCKET]/*"
    }]
}
```

## Command for current placeholder for s3 bucket name
`sed -i "s/\[BUCKET\]/$mybucket/g" ~/your-files-location/policy.json `

## Verify that the update is correct
`cat ~/your-files-location/policy.json` 

## Apply the bucket policy
`aws s3api put-bucket-policy --bucket $mybucket --policy file://~/your-files-location/policy.json` 

## Set the region value to a variable
`region=$(curl http://169.254.169.254/latest/meta-data/placement/region -s) `

## Print the url
`printf "\nYou can now access the website at:\nhttp://$mybucket.s3-website.$region.amazonaws.com\n\n"`
