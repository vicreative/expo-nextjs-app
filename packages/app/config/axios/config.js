import { getAuthToken } from 'app/utils/auth';

export default function axiosConfig(instance) {
  instance.interceptors.request.use(async config => {
    const token = await getAuthToken();

    // eslint-disable-next-line no-prototype-builtins
    if (token && !config.headers.hasOwnProperty('Authorization')) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  instance.interceptors.response.use(
    response => {
      return response;
    },
    function (error) {
      if (!error.response || !error.response.data || !error.response.data.message) {
        error = {
          response: {
            data: {
              ...error.response.data,
              message: 'Unable to complete request'
            }
          }
        };
      } else if (401 === error.response.status) {
        // Add a 401 response interceptor

        error = {
          response: {
            data: {
              ...error.response.data,
              message:
                error.response.data.message === 'Unauthorized, please provide a jwt token'
                  ? 'Unauthorized access! please login first'
                  : error.response.data.message
            }
          }
        };
        // RootNavigation.reset(0, [{ name: 'Login' }]);
      } else if (404 === error.response.status) {
        // Add a 404 response interceptor

        error = {
          response: {
            data: error.response.data
          }
        };
        // RootNavigation.reset(0, [{ name: 'NotFound' }]);
      } else if (409 === error.response.status) {
        // Add a 409 response interceptor

        error = {
          response: {
            data: error.response.data
          }
        };
      } else if (500 === error.response.status) {
        error = {
          response: {
            data: {
              ...error.response.data,
              message: 'Ooops! an error occurred'
            }
          }
        };
      } else {
        return Promise.reject(error);
      }
      throw error;
    }
  );
}
