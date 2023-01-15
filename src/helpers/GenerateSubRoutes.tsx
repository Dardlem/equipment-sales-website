import fetchData from "./fetch";
import { Product, ProductArray, ProductList } from "../interfaces";
import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import ProductPage from "../components/ProductPage";

function GenerateSubroutes(data: ProductArray<Product>){
    // const [data, setData] = useState<ProductList>({
    //     products: {
    //         "product1": {
    //             name: "default",
    //             price: 0,
    //             description: "default",
    //             preview: "default.jpg"
    //         }
    //     }
    // });

    let routes:Array<any> = [];

    console.log(data);

    Object.keys(data).map((key: string) => {
    console.log(data[key])
        routes.push(
            <Route
                key={key}
                path={`/Products/${key}`}
                element={<ProductPage product={data[key]} />} />
        )
    })

    return routes;
}

export default GenerateSubroutes;