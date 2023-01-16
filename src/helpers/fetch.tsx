import { storeDB } from './firebase';

    function fetchData(args: string) {
        const fetchRequest = async () => {

                const data:Promise<any> = storeDB(args)!;
                const promiseData:Promise<any> = Promise.resolve(data);

                return promiseData;
        }

        return fetchRequest();
    }


export default fetchData;