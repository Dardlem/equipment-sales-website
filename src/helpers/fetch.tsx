import { useEffect } from 'react';
import StoreData from '../data/StoreData.json'
import { storeDB } from './firebase';

// const URL = "127.0.0.1";
// const URL = "192.168.0.120";
// const PORT = "8080";
// const API = "api";

// function fetchData(args: string) {
    // useEffect(() => {
    //     const dataRequest = async () => {
    //         const data = await storeDB();
    //     }

    //     dataRequest();
    // }, [])

    // const dataRequest = async () => {
    //     const data:any = await storeDB();
    // }

    // console.log(dataRequest());

    // const fetchRequest = async () => {
    //     let data:Promise<any> = await storeDB()!;

    //     return data;
    // }

    function fetchData(args: string) {
        const fetchRequest = async () => {

                const data:Promise<any> = storeDB(args)!;
                const promiseData:Promise<any> = Promise.resolve(data);

                return promiseData;
        }

        return fetchRequest();
    }


export default fetchData;