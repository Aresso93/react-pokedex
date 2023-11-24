import axios from "axios";

export function useAxios(){
    const instance = axios.create({
        baseURL: 'https://pokeapi.co/api/v2/',
        timeout: 4000
      });

    return instance
}
