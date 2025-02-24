const mysql = require('mysql2/promise');

var restaurant_data; 

async function fetchRestaurantData() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'password',
            database: 'bytequick'
        });
        [restaurant_data] = await connection.query('SELECT * FROM RESTAURANT');

        // Close the connection
        await connection.end();
        // console.log('Connection closed.');
    } catch (err) {
        // console.error('Error: ' + err.message);
    }
}

let restIDsList = ['sahu123', 'rahul456', 'sita789', 'arjun101', 'maya202', 'ravi303', 'neha404']



async function getRestaurantList() {
    try{
        return fetchRestaurantData()
        .then(() => {
            let data = {};
            for (let i = 0; i < restaurant_data.length; i++) {
                data[String(restaurant_data[i].RESTAURANT_ID)] = String(restaurant_data[i].NAME);
            }
            return data;

        })
        .catch((error) => {
            return { 'STATUS': 'FAILED' };
        });
    }
    catch(error){
        return { 'STATUS': 'FAILED' };
    }
}




async function getMenu(restaurantId){
    try{
        return fetchRestaurantData()
        .then(() => {
            let data = {};
            for (let i = 0; i < restaurant_data.length; i++) {
                let menu = restaurant_data[i].MENU;
                if(restaurant_data[i].RESTAURANT_ID == restaurantId){
                    for(let category in menu){
                        data[String(category)] = menu[category];
                    }
                    data['STATUS'] = 'SUCCESSFUL';
                    return data
                }
            }
            return { 'STATUS': 'FAILED' };

        })
        .catch((error) => {
            console.log(error);
            return { 'STATUS': 'FAILED' };
        });
    }
    catch(error){
        return { 'STATUS': 'FAILED' };
    }
}

function getRestaurantInfo(restaurantId){
    if(restIDsList.includes(restaurantId)){
        return {'STATUS':'SUCCESSFUL', 'name':'sahu ke ande', 'contact':'1234567890', 'address':{'pin':'123456', 'city':'chennai', 'other':'chennai'}};
    }
    return {'STATUS':'FAILED'};
}

function varifyMenu(menu, restaurantId){
    let MENU={'Main Course':{'paneer':'180', 'chicken':'200', 'sabji':'180', 'bhindi':'150'}, 'Starter':{'tikka':'200', 'maggi':'50', 'choumin':'50', 'paneer':'150'}}
    try{
        if(restIDsList.includes(restaurantId)){
            let allfound=true;
            for( let item in menu){
                let itemfound = false;
                for(let category in MENU){
                    for(let original_item in MENU[category]){
                        if(item === original_item){
                            itemfound = true;
                            break;
                        }
                    }
                    if(itemfound) break;
                }
                allfound = allfound && itemfound;
                if(!allfound) return {'STATUS':'FAILED'};
            }
            return {'STATUS':'SUCCESSFUL'};
        }
    }
    catch(error){
        return {'STATUS':'FAILED'};
    }
}

module.exports = {
    getRestaurantList : getRestaurantList,
    getMenu : getMenu,
    getRestaurantInfo: getRestaurantInfo,
    varifyMenu: varifyMenu
}