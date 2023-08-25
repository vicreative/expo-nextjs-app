import env from 'app/config/env';
import { dataURLtoFile } from 'app/utils/index';
import axios from 'axios';
import e from 'app/constants/endpoints';
import { getAuthToken } from 'app/utils/auth';
import * as mime from 'react-native-mime-types';

export default async function uploadToAws(file, onSuccess = () => {}, onError = () => {}) {
  const token = await getAuthToken();
  let fileMime;

  if (typeof file === 'string') {
    fileMime = mime.lookup(file);
  } else if (!file.base64) {
    fileMime = mime.lookup(file.uri);
  } else {
    fileMime = file.base64.split(';')[0].split(':')[1];
  }

  const fileExt = fileMime.split('/').pop();

  const initiatedUploadData = {
    contentType: fileMime,
    extension: fileExt
  };

  const handleError = async error => {
    console.warn('Failed to upload file to S3');
    onError(error);
  };

  const handleSuccess = async data => {
    const fileToUpload = dataURLtoFile(
      typeof file === 'string' ? file : file.base64 ? file.base64 : file.uri,
      data.fileName
    );

    const res = await axios.put(data.uploadUrl, fileToUpload, {
      headers: { 'Content-Type': fileMime }
    });

    if (res.status === 200) {
      const successRes = {
        fileName: data.fileName,
        uploadUrl: data.uploadUrl,
        location: data.uploadUrl.split('?')[0],
        fileMime
      };
      console.log('Successfully uploaded file to s3 bucket url: ', successRes.location);
      onSuccess(successRes);
    } else {
      handleError(res.data);
    }
  };

  const options = {
    url: `${env.API_URL}${e.INITIATE_UPLOAD}`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: initiatedUploadData
  };

  return axios(options)
    .then(function (response) {
      if (response.status === 201) {
        handleSuccess(response.data);
      } else {
        handleError(response.data);
      }
    })
    .catch(function (error) {
      handleError(error.data);
    });
}
