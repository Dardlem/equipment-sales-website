enum CURRENCY{
    USD = "$",
    EUR = "€",
    UAH = "₴",
}

function DisplayCurrency(amount: number, currency: string = '$'){
    console.log(amount, currency);
    switch(currency){
        case CURRENCY.USD:
            return CURRENCY.USD + (amount.toFixed(2));
        case CURRENCY.EUR:
            return CURRENCY.EUR + (amount * 0.93).toFixed(2);
        case CURRENCY.UAH:
            return CURRENCY.UAH + (amount * 36.77).toFixed(2);
    }
    return currency + amount.toFixed(2)
}

export default DisplayCurrency;