import { instance as axios } from 'app/config/axios/index';
import { handleResponse, handleError } from './response';

/** @param {string} resource */
const get = resource => axios.get(resource).then(handleResponse).catch(handleError);

/** @param {string} resource */
/** @param {object} model */
const post = (resource, model) =>
  axios.post(resource, model).then(handleResponse).catch(handleError);

/** @param {string} resource */
/** @param {object} model */
const put = (resource, model) => axios.put(resource, model).then(handleResponse).catch(handleError);

/** @param {string} resource */
/** @param {object} model */
const patch = (resource, model) =>
  axios.patch(resource, model).then(handleResponse).catch(handleError);

/** @param {string} resource */
/** @param {string} id */
const remove = (resource, id) => axios.delete(resource, id).then(handleResponse).catch(handleError);

const exportedObject = {
  get,
  post,
  put,
  patch,
  remove
};

export default exportedObject;
