// Function to create a sleep timer
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

//ADDING ITEMS TO MENU FROM LOCALSTORAGE
async function addMenu(){
    let cartInfo = JSON.parse(localStorage.getItem('bitequick_cart_items'));
    if(cartInfo == null){
        clearCart(document.querySelector(".clear-button"));
        return;
    }
    let menu = cartInfo['menu'];
    let element = document.querySelector(".payment");
    element.innerHTML = "";
    let restName = document.createElement("div");
    restName.className = "topone";
    restName.innerHTML = `<h4>${cartInfo['name']}</h4><p>Vandalur</p>`
    element.appendChild(restName)

    let total = 0;
    for(let item in menu){
        let i = document.createElement("div");
        i.className = "orders";
        i.innerHTML = `<div class="order-name">${item}</div><div class="quantity">&times;${menu[item]['count']}</div><div class="price">&#x20b9;${Number(menu[item]['count'])*Number(menu[item]['price'])}</div>`;
        total+=Number(menu[item]['count'])*Number(menu[item]['price']);
        element.appendChild(i);
    }

    let i = document.createElement("div");
    i.className = "orders";
    i.setAttribute('href', '')
    i.innerHTML = `<div class="order-name"><h4>Total</h4></div><div class="quantity">&#x20b9;${total}</div>`;
    element.appendChild(i);

    i = document.createElement("div");
    i.id = "place-order-btn";
    i.innerHTML = `<div class="button deliver" style="margin: 0; margin-top: 20px; margin-left: 130px;">
                    <p style="color: white; font-size: 0.85em;">Place Order</p>
            </div>`;
    element.appendChild(i);
    document.querySelector("#place-order-btn").addEventListener("click", placeorder)
}
document.addEventListener("DOMContentLoaded", addMenu);

//CLEAR CART BUTTON LOGIC
function clearCart(btn){
    localStorage.removeItem("bitequick_cart_items");
    let element = document.querySelector(".payment");
    element.innerHTML = "";
    btn.style.backgroundColor = "grey";
    i = document.createElement("div");
    i.id = "place-order-btn";
    i.innerHTML = `<div class="button deliver" style="margin: 0; margin-top: 20px; margin-left: 130px;">
                    <p style="color: white; font-size: 0.85em;">Place Order</p>
            </div>`;
    element.appendChild(i);
    document.querySelector("#place-order-btn").addEventListener("click", placeorder)
}

//FETCH RESTURENT INFO
async function fetchResturentInfo(restId){
    return fetch('http://localhost:3000/restaurantInfo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "restaurantId": restId }),
    })
    .then(response => {
        return response.json(); // Parse the JSON from the response
    })
    .catch((error) => {
        return {'STATUS':'UNREACHABLE'};
    });
};


//MENU VARIFICATION LOGIC
async function varifyMenu(menu, restId){
    return fetch('http://localhost:3000/varifyMenu', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "restaurantId": restId , 'menu':menu}),
    })
    .then(response => {
        return response.json(); // Parse the JSON from the response
    })
    .catch((error) => {
        return {'STATUS':'UNREACHABLE'};
    });
};


//ENCODING TEXT MESSAGE
function encode(menu){
    let total=0
    estr="";
    for(let item in menu){
            let itemNo = menu[item]['count'];
            let price = menu[item]['price'];
            let totalprice = Number(price)*Number(itemNo);
            estr+=`${item}%20%20${itemNo}%20%20${totalprice}%0A`;
            total+=totalprice;
        }
    
    estr+=`Total%20${total}`;
    return estr;
}


//PLACE ORDER LOGIC
document.querySelector("#place-order-btn").addEventListener("click", ()=>{
    alert("fsdnsf");
})




async function placeorder(){
    let cartInfo = await JSON.parse(localStorage.getItem('bitequick_cart_items'));
    let spinner = document.querySelector("#spinner");
    spinner.style.display = "flex";
    if(cartInfo != null){
        try{
            if(JSON.stringify(cartInfo['menu']) == "{}"){
                spinner.style.display = "none";
                popup = document.querySelector("#popup");
                popup.innerHTML = "add item in cart!!!";
                popup.style.width = "250px"
                popup.style.backgroundColor = "red";
                popup.style.display = "flex"
                await sleep(3000);
                popup.style.display = "none"
                return;
            }
            let responseInfo = await fetchResturentInfo(cartInfo['restaurant_id'])
            if(responseInfo['STATUS'] === "FAILED"){
                spinner.style.display = "none";
                popup = document.querySelector("#popup");
                popup.innerHTML = "Please select correct restaurant or menu!!!";
                popup.style.width = "400px"
                popup.style.backgroundColor = "red";
                popup.style.display = "flex"
                await sleep(3000);
                popup.style.display = "none"
                return;
            }
            if(responseInfo['STATUS'] === "UNREACHABLE"){
                spinner.style.display = "none";
                popup = document.querySelector("#popup");
                popup.innerHTML = "Server is not responding!!!";
                popup.style.backgroundColor = "red";
                popup.style.width = "270px"
                popup.style.display = "flex"
                await sleep(3000);
                popup.style.display = "none"
                return;
            }
            let responseVarification = await varifyMenu(JSON.stringify(cartInfo['menu']), cartInfo['restaurant_id']);
            if(responseVarification['STATUS'] !== 'SUCCESSFUL'){
                spinner.style.display = "none";
                popup = document.querySelector("#popup");
                popup.innerHTML = "Please Select Correct Menue!!!";
                popup.style.backgroundColor = "red";
                popup.style.width = "310px"
                popup.style.display = "flex"
                await sleep(3000);
                popup.style.display = "none"
                return;
            }
            spinner.style.display = "none";
            let url = `https://wa.me/+911234567890?text=${encode(cartInfo['menu'])}`;
            open(url);
            // let button = document.querySelector("#place-order-btn");
            // button.setAttribute("href", url);
            // button.click();

        }
        catch(error){
            spinner.style.display = "none";
            popup = document.querySelector("#popup");
            popup.innerHTML = "Error in fetching";
            popup.style.width = "250px"
            popup.style.backgroundColor = "red";
            popup.style.display = "flex"
            await sleep(3000);
            popup.style.display = "none"
        }
    }
    else{
        spinner.style.display = "none";
        popup = document.querySelector("#popup");
        popup.innerHTML = "add item in cart!!!";
        popup.style.width = "250px"
        popup.style.backgroundColor = "red";
        popup.style.display = "flex"
        await sleep(3000);
        popup.style.display = "none"
    }
};
