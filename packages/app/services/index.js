import { instance as axios } from 'app/config/axios/index';
// import { instance as chatAxios } from 'app/config/axios/chat';
import { handleResponse, handleError } from './response';

/** @param {string} resource */
/** @param {string} resourceType */
const get = (resource, resourceType) => {
  if (resourceType === 'chat') {
    return axios.get(resource).then(handleResponse).catch(handleError);
  } else {
    return axios.get(resource).then(handleResponse).catch(handleError);
  }
};

/** @param {string} resource */
/** @param {object} model */
/** @param {string} resourceType */
const post = (resource, model, resourceType) => {
  if (resourceType === 'chat') {
    return axios.post(resource, model).then(handleResponse).catch(handleError);
  } else {
    return axios.post(resource, model).then(handleResponse).catch(handleError);
  }
};

/** @param {string} resource */
/** @param {object} model */
/** @param {string} resourceType */
const put = (resource, model, resourceType) => {
  if (resourceType === 'chat') {
    return axios.put(resource, model).then(handleResponse).catch(handleError);
  } else {
    return axios.put(resource, model).then(handleResponse).catch(handleError);
  }
};

/** @param {string} resource */
/** @param {object} model */
/** @param {string} resourceType */
const patch = (resource, model, resourceType) => {
  if (resourceType === 'chat') {
    return axios.patch(resource, model).then(handleResponse).catch(handleError);
  } else {
    return axios.patch(resource, model).then(handleResponse).catch(handleError);
  }
};

/** @param {string} resource */
/** @param {string} id */
/** @param {string} resourceType */
const remove = (resource, id, resourceType) => {
  if (resourceType === 'chat') {
    return axios.delete(resource, id).then(handleResponse).catch(handleError);
  } else {
    return axios.delete(resource, id).then(handleResponse).catch(handleError);
  }
};

const exportedObject = {
  get,
  post,
  put,
  patch,
  remove
};

export default exportedObject;
