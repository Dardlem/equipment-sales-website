import { placeOrderToDatabase } from "./firebase";

function placeOrder(customerId: string, data: {id: string, quantity: number}){
    placeOrderToDatabase('orders/' + customerId + '/' + Date.now(), data);
}

export default placeOrder;