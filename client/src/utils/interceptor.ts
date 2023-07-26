import { Store } from '../store';
import customFetch from './customFetch';
import { removeUserInfoFromLocalStorage } from './localStorageHelper';

const applyInteceptor = (store: Store) => {
  // customFetch.interceptors.request.use((request)=>{
  // })
  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      //invalid token
      if (error.response.status === 401) {
        removeUserInfoFromLocalStorage();
      }
      return Promise.reject(error);
    }
  );
};

export default applyInteceptor;
