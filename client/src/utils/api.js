import axios from 'axios';
import { APIMessages, axiosAPICalls } from './config';
import { getAccessToken, getType } from './tokens';
import dotenv from 'dotenv';

dotenv.config();

// URL of server
const API_URL = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'content-type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.TYPE.params) {
      config.params = config.TYPE.params;
    } else if (config.TYPE.query) {
      config.url = config.url + '/' + config.TYPE.query;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return processResponse(response);
  },
  (error) => {
    return Promise.reject(processError(error));
  }
);

const processResponse = (response) => {
  if (response?.status === 200) {
    return { isSuccess: true, data: response.data };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      msg: response?.msg,
      code: response?.code
    };
  }
};

const processError = async (error) => {
  if (error.response) {
    // Request made and server responded with a status code that falls out of the range of 2xx
    if (error.response?.status === 403) {
      sessionStorage.clear();
    } else {
      console.log('Error in response ', error.toJSON());
      return {
        isError: true,
        msg: APIMessages.responseFailure,
        code: error.response.status
      };
    }
  } else if (error.request) {
    // The request was made but no response was received
    console.log('Error in response ', error.toJSON());
    return {
      isError: true,
      msg: APIMessages.requestFailure,
      code: ''
    };
  } else {
    // Something happened in setting up the request that triggered an error
    console.log('Error in response ', error.toJSON());
    return {
      isError: true,
      msg: APIMessages.networkError,
      code: ''
    };
  }
};

const API = {};

for (const [key, value] of Object.entries(axiosAPICalls)) {
  API[key] = (body) =>
    axiosInstance({
      method: value.method,
      url: value.url,
      data: value.method === 'DELETE' ? '' : body,
      TYPE: getType(value, body),
      headers: {
        authorization: getAccessToken(),
      }
    });
}

export { API };
