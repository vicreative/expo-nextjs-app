import generateRandomString from 'app/utils/generateRandomString';
import env from 'app/config/env';
import { RNS3 } from 'react-native-aws3';
import * as mime from 'react-native-mime-types';

const options = {
  bucket: env.AWS_S3_BUCKET,
  region: env.AWS_S3_BUCKET_REGION,
  accessKey: env.AWS_ACCESS_KEY_ID,
  secretKey: env.AWS_SECRET_ACCESS_KEY,
  successActionStatus: 201
};

export default function uploadToAws(file, onSuccess = () => {}, onError = () => {}) {
  const randomString = generateRandomString(64);
  let fileMime;

  if (typeof file === 'string') {
    fileMime = mime.lookup(file);
  } else if (!file.base64) {
    fileMime = mime.lookup(file.uri);
  } else {
    fileMime = file.base64.split(';')[0].split(':')[1];
  }

  const fileExt = fileMime.split('/').pop();
  const fileName = `${randomString}.${fileExt}`;

  const dataToUpload = {
    uri: typeof file === 'string' ? file : file.uri,
    name: fileName,
    type: fileMime
  };

  const handleError = async error => {
    console.warn('Failed to upload file to S3', error);
    onError(error);
  };

  return RNS3.put(dataToUpload, options)
    .then(response => {
      if (response.status !== 201) {
        handleError(response);
      } else {
        const data = {
          fileName: response.body.postResponse.key,
          uploadUrl: response.body.postResponse.location,
          location: response.body.postResponse.location,
          fileMime
        };
        console.log('Successfully uploaded file to s3 bucket url: ', data.location);
        onSuccess(data);
      }
    })
    .catch(error => {
      handleError(error);
    });
}
