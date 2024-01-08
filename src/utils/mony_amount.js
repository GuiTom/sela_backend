const money_amount = function (value){
    if (typeof value === 'string') { 
        value = parseInt(value)
    } 
    if(value%100==0){
        return value/100;
    }
    return (value/100).toFixed(2)
}
export default money_amount