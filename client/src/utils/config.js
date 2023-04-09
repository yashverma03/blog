// Axios API calls { name of API: { url: '/', method: 'post/get/put/delete' } }
export const axiosAPICalls = {
  userLogin: { url: 'login', method: 'post' },
  userSignup: { url: 'signup', method: 'post' },
  getAllPosts: { url: 'posts', method: 'get', params: true },
  getRefreshToken: { url: 'token', method: 'post' },
  uploadFile: { url: 'file/upload', method: 'post' },
  createPost: { url: 'create', method: 'post' },
  deletePost: { url: 'delete', method: 'delete', query: true },
  getPostById: { url: 'post', method: 'get', query: true },
  newComment: { url: 'comment/new', method: 'post' },
  getAllComments: { url: 'comments', method: 'get', query: true },
  deleteComment: { url: 'comment/delete', method: 'delete', query: true },
  updatePost: { url: 'update', method: 'put', query: true }
};

export const APIMessages = {
  loading: {
    title: 'Loading...',
    message: 'Data is being loaded. Please wait'
  },
  success: {
    title: 'Success',
    message: 'Data successfully loaded'
  },
  requestFailure: {
    title: 'Error!',
    message: 'An error occur while parsing request data'
  },
  responseFailure: {
    title: 'Error!',
    message: 'An error occur while fetching response from server. Please try again'
  },
  networkError: {
    title: 'Error!',
    message: 'Unable to connect to the server. Please check internet connectivity and try again.'
  }
};
