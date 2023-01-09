import fetchData from "./fetch";
import { ProductList } from "../interfaces";
import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import ProductPage from "../components/ProductPage";

function GenerateSubroutes(){
    const [data, setData] = useState<ProductList>({
        products: [],
    });

    useEffect(() => {
        // let promiseData:Promise<any> = fetchData();

        // promiseData.then((value) => {
        //     setData(value);
        // });

        setData(fetchData());

    }, []);

    let routes:Array<any> = [];

    data.products.map((e) => {
        return routes.push(
            <Route
                key={e.id}
                path={`/Products/${e.id}`}
                element={<ProductPage product={e} />} />
        )
    })

    return routes;
}

export default GenerateSubroutes;