import axios, { AxiosError, AxiosResponse } from "axios";

const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_APP_API_URL_PROD
   : import.meta.env.VITE_APP_API_URL_LOCAL;

interface IFetchData<T> {
   radius?: number,
   body: T[] | [],
}

export const fetchData = async <T>({
   radius = 2,
   body
}: IFetchData<T>): Promise<AxiosResponse<T[]> | undefined> => {
   try {
      const data = await axios.post(`${apiUrl}/${radius}`, body);
      return await data as AxiosResponse<T[]>;
   } catch (e) {
      const errorMassage = (e as AxiosError).message;
      console.log(errorMassage);
   }
};
