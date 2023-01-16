import { Product, ProductArray } from "../interfaces";
import { Route } from "react-router-dom";
import ProductPage from "../components/ProductPage";

function GenerateSubroutes(data: ProductArray<Product>){

    let routes:Array<any> = [];

    console.log(data);

    Object.keys(data).map((key: string) => {
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