const  BASE_URL = 'https://api.exchangerate-api.com/v4/latest/';
let dropdowns = document.querySelectorAll('.dropdown select');
let fromCurr = document.querySelector("select[name='from']")
let toCurr = document.querySelector("select[name='to']")
let btn = document.querySelector("button")
let result = document.querySelector(".msg")

for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement('option')
        newOption.innerHTML = currCode;
        newOption.value = currCode;
        if(select.name === 'from' && currCode === 'USD'){
            newOption.selected = 'selected'
        } else if(select.name === 'to' && currCode === 'PKR'){
            newOption.selected = 'selected'
        } 
        select.append(newOption)
    }
    select.addEventListener('change', (evt) => {
        updateFlag(evt.target)
    })
}
 const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img')
    img.src = newSrc;
 }

 btn.addEventListener('click',  async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector('.amount input')
    let amtVal = amount.value;

    let url = `${BASE_URL}/${fromCurr.value}`;
    let res = await fetch(url);
    if(res.status === 200){
        let data = await res. json();
        if(data && data.rates && data.rates[toCurr.value]){
            let rate = data.rates[toCurr.value];
             let finalVal = rate * amtVal;
             result.innerHTML = `${amtVal} ${fromCurr.value} = ${finalVal} ${toCurr.value}`;

        } else{
            result.innerHTML = "Some errors are in the code"
        }
    } else{
         result.innerHTML = "Some errors are in the code"
    }
 });