// const BASE_URL =
//   "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

/*Here this is new URL since author migrated it to new one */
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns=document.querySelectorAll('.dropdown select');

const btn=document.querySelector('form button');

const fromCurr=document.querySelector('.from select');
const toCurr=document.querySelector('.to select');
const msg=document.querySelector('.msg p');

/*We are adding currency code options to dropdown select */
for(let select of dropdowns){
    for(currCode in countryList){
        let newopt=document.createElement('option');
        newopt.innerText=currCode;
        newopt.value=currCode;
        /*To add default currency to from & to as USD and INR */
        if(select.name==='from' && currCode==='USD'){    
            newopt.selected='selected';
        }else
        if(select.name==='to' && currCode==='INR'){
            newopt.selected='selected';
        }
        select.append(newopt);
    }
    select.addEventListener('change',(evt)=>{
        updateFlag(evt.target);
    });
}  

/*To update flag according to option in currency code*/
const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
    let img=element.parentElement.querySelector('img');
    img.src=newSrc;
}

/*Here i added function to give us exchange rate according to selected countries */
const updateExchangeRate=async ()=>{ 
    let amount=document.querySelector('.amount input');
    let amtVal=amount.value;
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value='1';
    }
    // const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    /*Here this is new URL since author migrated it to new one */
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response;
    try{
        response=await fetch(URL);
        if(!response.ok) throw new Error("Primary API failed");
    }catch{
        const fallbackURL=`https://latest.currency-api.pages.dev/v1/currencies/${fromCurr.value.toLowerCase()}.json`;
        response=await fetch(fallbackURL);
    }
    let data=await response.json();

    let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalAmt=amtVal*rate;
    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}

/*Now we want exchange rate as we click button, so first we preventDefault 
i.e. once form gets submitted it gets refreshed or link becomes likes this
http://127.0.0.1:5500/Currency%20Converter/index.html?from=USD&to=INR
'from USD to INR'
so add preventDefault and remove this part from link  */

btn.addEventListener('click',async (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

/*I added this to automatically call when loaded to give us exchange rate */
window.addEventListener('load',()=>{
    updateExchangeRate();
});



/* API:- https://github.com/fawazahmed0/exchange-api?tab=readme-ov-file */