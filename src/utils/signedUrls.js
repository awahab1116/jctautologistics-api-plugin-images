import AWS from "aws-sdk";
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION,
});
const s3 = new AWS.S3();

const bucket = process.env.BUCKET_NAME;
// const object_key = "public/user/test/large-1675672214390-9hbt8dzg0nt81.jpg";
const expires = 3600;

export default async function generateSignedUrl(object_key) {
  if (!object_key) {
    return "";
  }

  const signedUrl = await s3.getSignedUrlPromise("getObject", {
    Bucket: bucket,
    Key: object_key,
    Expires: expires,
  });

  return signedUrl;
}
