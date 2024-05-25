import { IFetchData } from "@/models";
import axios, { AxiosError, AxiosResponse } from "axios";

const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_APP_API_URL_PROD
   : import.meta.env.VITE_APP_API_URL_LOCAL;

export const fetchData = async <T>({
   radius = 2,
   body,
   abortSignal
}: IFetchData<T>, ): Promise<AxiosResponse<T[]> | undefined> => {
   try {
      const res = await axios.post<T>(`${apiUrl}/${radius}`, body, { signal: abortSignal, });
      if (res.status !== 200) {
         const errorMessage = `An error has occurred: ${res.status}`;
         throw new Error(errorMessage);
      }
      return res as AxiosResponse<T[]>;
   } catch (e) {
      const errorMassage = (e as AxiosError).message;
      console.error(errorMassage);
   }
};

