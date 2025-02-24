
// Function to create a sleep timer
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };


// SEARCH LOGIC
function search(){
    console.log("WORKING")
    let arr=document.getElementsByClassName("restaurant-card");
    let searchText=document.querySelector("#searchBar").value.toLowerCase();
    for(let i=0; i<arr.length; i++){
        let restName=arr[i].querySelector("h3").textContent.toLowerCase();
        console.log(restName)
        if(searchText===""){
            console.log(1)
            arr[i].style.visibility = "visible";
            arr[i].style.removeProperty("display")
            continue;
        }
        if(restName.includes(searchText)==true){
            console.log(2)
            arr[i].style.visibility = "visible";
            arr[i].style.removeProperty("display")
        }
        else{
            console.log(3)
            arr[i].style.visibility = "hidden";
            arr[i].style.display = "none"
        }
    }
}

document.querySelector("#searchBar").addEventListener("keyup", search);



// RESTURENT LIST LOADING LOGIC
document.addEventListener('DOMContentLoaded', async function loadResturent(){
    let spinner = document.querySelector("#spinner");
    spinner.style.display = "flex";
    try{
        let response = await fetch('http://localhost:3000/restaurantList');
        data = await response.json();
        // if(data['STATUS'] == 'FAILED'){
        //     let popup = document.querySelector("#popup");
        //     popup.innerHTML = "Server didn't respond!!!";
        //     popup.style.backgroundColor = "#FF3C3C";
        //     popup.style.width = "300px";
        //     // console.log("Server didn't responded");
        //     popup.style.display = "flex";
        // }
        // else{
            // data.remove('STATUS');
            for( let restId in data){
                let card = addRestaurant(data[restId], restId);

                document.querySelector("#restaurant-container").appendChild(card)
            // }
        }
    }
    catch{
        let popup = document.querySelector("#popup");
        popup.innerHTML = "Server didn't respond!!!";
        popup.style.backgroundColor = "#FF3C3C";
        popup.style.width = "300px";
        // console.log("Server didn't responded");
        popup.style.display = "flex";
    }
    spinner.style.display = "none";
    await sleep(3000);
    popup.style.display = "none";
});

    function addRestaurant(name, id){
    let card = document.createElement('div');
    card.className = "restaurant-card";
    card.setAttribute("data-id", id);
    let div2 = document.createElement('div');
    let h3 = document.createElement('h3');
    h3.textContent = name;
    card.appendChild(div2);
    card.appendChild(h3);
    return card;
}



// MENU LOADING LOGIC

document.querySelector("#restaurant-container").addEventListener("click", async (event)=>{
    let spinner = document.querySelector("#spinner");
    spinner.style.display = "flex";
    let savedItemList = JSON.parse(localStorage.getItem("bitequick_cart_items"));
    let element = event.target.closest('.restaurant-card');
    if(element == null) {
        spinner.style.display = "none";
        return;
    }
    if(element.className === "restaurant-card"){
        let data = await fetchMenu(element.getAttribute('data-id'));
        spinner.style.display = "none";
        // document.querySelector("#second-main-div").innerHTML = JSON.stringify(data);
        if(data["STATUS"]==="FAILED"){
            // document.querySelector("#second-main-div").innerHTML = "<h2 style='color: red'>There is some unknown Error!!!</h2>"
            // document.querySelector("#main-menu-div").style.display = "flex";
            let popup = document.querySelector("#popup");
            popup.innerHTML = "There is some unknown Error!!!";
            popup.style.backgroundColor = "#FF3C3C";
            popup.style.width = "300px";
            popup.style.display = "flex";
            await sleep(3000);
            popup.style.display = "none";
            return;
        }
        if(data['STATUS']==="UNREACHABLE"){
            // document.querySelector("#second-main-div").innerHTML = "<h2 style='color: red'>Server didn't responded!!!</h2>"
            // document.querySelector("#main-menu-div").style.display = "flex";
            let popup = document.querySelector("#popup");
            popup.innerHTML = "Server didn't responded!!!";
            popup.style.backgroundColor = "#FF3C3C";
            popup.style.width = "300px";
            popup.style.display = "flex";
            await sleep(3000);
            popup.style.display = "none";
            return;
        }
        document.querySelector("#main-menu-div").setAttribute('data-restId', element.getAttribute('data-id'));  //setting resturent id in menue
        document.querySelector("#main-menu-div").setAttribute('data-restName', element.querySelector("h3").innerHTML);
        delete data["STATUS"];
        renderMenu(data, savedItemList, element.getAttribute('data-id'));   
        // document.querySelector("#cartfilled").style.display = "none";
        document.querySelector("#main-menu-div").style.display = "flex";
    }
});

function renderMenu(menu, savedItemList, id){
    document.querySelector("#second-main-div").innerHTML = "";
    // if(savedItemList !== null){
    //     let savedMenu = savedItemList['menu'];
    //     let savedId = savedItemList['restaurant_id'];
    // }
    for(let category in menu){
        let menuCategory = document.createElement("h2");
        menuCategory.className = "menu-category";
        menuCategory.setAttribute("data-category", category);
        menuCategory.innerHTML = category;
        document.querySelector("#second-main-div").appendChild(menuCategory);
        let jsonCategory = menu[category];
        for(let item in jsonCategory){
            let itemElement = document.createElement("div");
            itemElement.className = "item";
            itemElement.setAttribute("data-item", item);
            let count=0
            if(savedItemList != null){
                let savedMenu = savedItemList['menu'];
                let savedId = savedItemList['restaurant_id'];
                if(savedId == id) count = findCount(item ,savedMenu);
            }
            let elementData = `<h3>${item}</h3>
                <h3 class="price" data-price="${jsonCategory[item]}">&#x20b9 ${jsonCategory[item]}</h3>
                <div class="button-group">
                    <button class="add" onclick="add(this)">ADD</button>
                    <button class="remove" onclick="remove(this)">REMOVE</button>
                    </div>
                    <h4 class="count" data-count="0">${count} Items Added</h4>`;
            itemElement.innerHTML = elementData;
            document.querySelector("#second-main-div").appendChild(itemElement);
        }
    }
}
function findCount(item, menu){
    if(menu == null || menu == "") return 0;
    for(let newItem in menu){
        if(newItem === item) return menu[newItem]['count'];
    }
    return 0;
}




// FETCHING MENUE
function fetchMenu(restId) {
    return fetch('http://localhost:3000/getMenu', {
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
}


// MENU LIST HIDING LOGIC

document.querySelector("#main-menu-div").addEventListener("click", (event)=>{
    if(event.target.id === "main-menu-div"){
        document.querySelector("#main-menu-div").style.display = "none";
    }
})



//ADD and REMOVE function
function add(button) {
    const itemDiv = button.closest('.item');
    const countElement = itemDiv.querySelector('.count');
    let currentCount = Number(countElement.getAttribute('data-count'));
    currentCount += 1;
    countElement.setAttribute('data-count', currentCount);
    countElement.textContent = `${currentCount} Items Added`;
}

function remove(button) {
    const itemDiv = button.closest('.item');
    const countElement = itemDiv.querySelector('.count');
    let currentCount = Number(countElement.getAttribute('data-count'));
    if (currentCount > 0) {
        currentCount -= 1;
    }
    countElement.setAttribute('data-count', currentCount);
    countElement.textContent = `${currentCount} Items Added`;
}


//ADD to CART logic

async function addtocart(){
    let itemlist={'restaurant_id': (document.querySelector("#main-menu-div")).getAttribute('data-restId'),
                'cartStatus' : 'filled',  //filled or empty
                'name' : (document.querySelector("#main-menu-div")).getAttribute('data-restName'),
                'menu':{}
    };
    let cart = JSON.parse(localStorage.getItem('bitequick_cart_items'));
    if(cart != null){
        if(cart['restaurant_id'] !== itemlist['restaurant_id']){
            // document.querySelector("#cartfilled").style.display = "flex";
            // document.querySelector("#second-main-div").innerHTML = `<h2 style='color: red'>Cart Already have ${cart['name']} items</h2>`
            let popup = document.querySelector("#popup");
            popup.innerHTML = `Cart Already have "${cart['name']}" items`;
            popup.style.backgroundColor = "#FF3C3C";
            popup.style.width = "500px";
            popup.style.display = "flex";
            document.querySelector("#gotocart").style.display = "flex";
            await sleep(3000);
            popup.style.display = "none";
            await sleep(2000);
            document.querySelector("#gotocart").style.display = "none";
            return;
        }
    }
    let items = document.querySelectorAll(".item");
    for(let j=0; j<items.length; j++){
        let i=items[j];
        let count = i.querySelector(".count").getAttribute('data-count');
        if(count>0){
            itemlist['menu'][i.getAttribute('data-item')] = {'count':count, 'price':i.querySelector(".price").getAttribute('data-price')};
        }
    }
    localStorage.removeItem('bitequick_cart_items');
    localStorage.setItem('bitequick_cart_items', JSON.stringify(itemlist));
    // console.log(localStorage.getItem('bitequick_cart_items'));
    // document.querySelector("#second-main-div").innerHTML = `<h2 style='color: green'>Successfully Added</h2>`
    let popup = document.querySelector("#popup");
    popup.innerHTML = "Successfully Added To Cart";
    popup.style.backgroundColor = "#2BCF2E";
    popup.style.width = "300px";
    popup.style.display = "flex";
    document.querySelector("#gotocart").style.display = "flex";
    await sleep(3000);
    popup.style.display = "none";
    await sleep(2000);
    document.querySelector("#gotocart").style.display = "none";
}