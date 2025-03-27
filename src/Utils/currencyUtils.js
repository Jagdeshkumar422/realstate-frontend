import accounting from "accounting";

    export const priceConverter=(inputPrice)=>{

// const type=localStorage.getItem("currType")
// if(type==="AED"){
    const formattedPrice = accounting.formatNumber(inputPrice);
    return  formattedPrice
// }else if (type==="USD"){
    // let convertedprice=inputPrice*0.27
    // const formattedPrice = accounting.formatNumber(convertedprice);
    // return formattedPrice
// }
}