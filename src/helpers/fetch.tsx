import StoreData from '../data/StoreData.json'

// const URL = "127.0.0.1";
const URL = "192.168.0.120";
const PORT = "8080";
const API = "api";

function fetchData() {
    // const fetchRequest = async () => {
    //     const getData = await fetch(`http://${URL}:${PORT}/${API}`);
    //     const jsonData = await getData.json();

    //     return jsonData;
    // }
    const fetchRequest = () => {
        const getData = StoreData;

        return getData;
    }

    return fetchRequest();
}

export default fetchData;