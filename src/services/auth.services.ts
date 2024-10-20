// import { authKey } from '@/contants/authkey';
// import { instance as axiosInstance } from '@/helpers/axios/axiosInstance';
import { decodedToken } from '@/utils/jwt';

import {
   getFromLocalStorage,
   removeFromLocalStorage,
   setToLocalStorage,
} from '@/utils/local-storage';

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
   //   console.log(accessToken);
   return setToLocalStorage('accessToken', accessToken);
};

export const getUserInfo = () => {
   const authToken = getFromLocalStorage('accessToken');
   //   console.log(authToken);
   if (authToken) {
      const decodedData: any = decodedToken(authToken);
      return {
         ...decodedData,
         role: decodedData?.role?.toLowerCase(),
      };
   } else {
      return '';
   }
};

export const isLoggedIn = () => {
   const authToken = getFromLocalStorage('accessToken');
   if (authToken) {
      return !!authToken;
   }
};

export const removeUser = () => {
   return removeFromLocalStorage('accessToken');
};

// export const getNewAccessToken = async () => {
//    return await axiosInstance({
//       url: 'http://localhost:5000/api/v1/auth/refresh-token',
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       withCredentials: true,
//    });
// };