

export default function MoneyForm({value}){
    value = Number(value).toFixed(0);
    if (isNaN(value)) {
        return 'Invalid input';
    }
    let formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return(
        <span>{formattedValue}đ</span>
    )
}