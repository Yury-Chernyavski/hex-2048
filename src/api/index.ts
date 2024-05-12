import { IHexCoord } from "@/models";
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
      const res = await axios.post(`${apiUrl}/${radius}`, body);
      if (res?.status !== 200) {
         const errorMessage = `An error has occurred: ${res?.status}`;
         throw new Error(errorMessage);
      }
      return res as AxiosResponse<T[]>;
   } catch (e) {
      const errorMassage = (e as AxiosError).message;
      console.error(errorMassage);
   }
};

export const getNewCells = async (radius: number, hexCells: IHexCoord[]) => {
   try {
      const res = await fetchData<IHexCoord>({
         radius,
         body: hexCells,
      });
      return res?.data;
   } catch (e) {
      console.error(e);
   }
};
