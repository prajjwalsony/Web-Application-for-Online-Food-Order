localStorage.setItem("biteQuick_userInfo", JSON.stringify({
    "username": "aman@gmail.com", "name": "aman", "contact": "1234567890", "address": {
        "pin": "123456",
        "city": "chennai",
        "others": "hdhdhd"
    }
}));
localStorage.getItem("biteQuick_userInfo");
// localStorage.removeItem("biteQuick_userInfo");


$('.profile').on("click", function () {
    let status = document.querySelector(".dropdown");
    if (status.style.display === "none") {
        status.style.display = "block";
    }
    else {
        status.style.display = "none";
    }
});

window.onclick = function (event) {

    if (!event.target.closest(".form-container") && !event.target.closest(".profile")) {
        let status = document.querySelector(".form-container");
        if (status.style.display === "block") {
            status.style.display = "none";
        }
    }
    if (!event.target.closest(".profile")) {
        let status = document.querySelector(".dropdown");
        if (status.style.display === "block") {
            status.style.display = "none";
        }
    }
    if (!event.target.closest("#loginContainer") && !event.target.closest(".profile")) {
        let status = document.getElementById("loginContainer");
        if (status.style.display === "block") {
            status.style.display = "none";
        }
    }
    if(event.target.closest(".profile-container") === null && event.target.closest(".profile") === null){
        let status = document.querySelector(".profile-container");
        if(status.style.display === "block"){
            status.style.display = "none";
        }
    }
    if (!event.target.closest(".editProfileForm") && !event.target.closest(".edit-button")) {
        let status = document.querySelector(".editProfileForm");
        let message = document.getElementById("editProfileMessage");
        message.textContent = "";
        if (status.style.display === "block") {
            status.style.display = "none";
        }
    }
    
}


document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let mobile = document.getElementById("contact").value;
    let pin = document.getElementById("pin").value;
    let message = document.getElementById("message");
    console.log(password);
    console.log(confirmPassword);
    message.textContent = "";

    if (mobile.length !== 10) {
        message.textContent = "Mobile number must be 10 digit long";
        return;
    }
    if (pin.length !== 6) {
        message.textContent = "Pin must be 6 digit long";
        return;
    }

    if (password !== confirmPassword) {
        message.textContent = "Password do not match!";
        return;
    }

    if (password.length < 6) {
        message.textContent = "Password must be at least 6 characters!";
        return;
    }
    message.style.color = "green";
    message.textContent = "Registration successful!";
});




function xyza() {
    if (localStorage.getItem("biteQuick_userInfo") === null) {
        let dropdownDetail = document.getElementById("dropdownMenu");
        dropdownDetail.innerHTML = "";
        dropdownDetail.innerHTML = '<a href="#" class="register options">Register</a> <a href="#" class="login options">Login</a>';


    }
    else {
        let dropdownDetail = document.getElementsByClassName('options');
        dropdownDetail[0].remove();
        dropdownDetail[0].remove();
        let parent = document.getElementById("dropdownMenu");
        let newOption = document.createElement("a");
        newOption.classList.add("options", "profileTab");
        newOption.textContent = "Profile";
        parent.insertBefore(newOption, dropdownDetail[0]);
        newOption.addEventListener("click", function () {
            let profileTab = document.querySelector(".profile-container");
            addDetails();
            if (window.getComputedStyle(profileTab).display === "none") {
                profileTab.style.display = "block";
            }
        });
    }
}
document.getElementById("dropdownMenu").addEventListener("click", function (event) {
    if (event.target.classList.contains('register')) {
        let registerForm = document.querySelector(".form-container");
        if (registerForm.style.display === "none" || registerForm.style.display === "") {
            registerForm.style.display = "block";
        }
    }
    if (event.target.classList.contains('login')) {
        let status = document.getElementById("loginContainer");
        if (status.style.display === "none" || status.style.display === "") {
            status.style.display = "block";
        }
    }
});


document.addEventListener("DOMContentLoaded", xyza);


function addDetails(){
    let userInfo = localStorage.getItem("biteQuick_userInfo");
    userInfo = JSON.parse(userInfo);
    let user_username = document.getElementById("profile-detail-username");
    let user_mobile = document.getElementById("profile-detail-mobile");
    let user_name = document.getElementById("profile-detail-name");
    let user_address = document.getElementById("profile-detail-address");
    let user_pin = document.getElementById("profile-detail-pin");
    let user_city = document.getElementById("profile-detail-city");

    user_username.textContent = userInfo.username;
    user_name.textContent = userInfo.name;
    user_mobile.textContent = userInfo.contact;
    user_address.textContent = userInfo.address.others;
    user_pin.textContent = userInfo.address.pin;
    user_city.textContent = userInfo.address.city;
}


document.querySelector(".logout").addEventListener("click",function(){
    localStorage.removeItem("biteQuick_userInfo");
    let gifDisplay = document.querySelector("#gif");
    gifDisplay.style.display = "block";
    setTimeout(function () {
        gifDisplay.style.display = "none";
    }, 1500);
    xyza();
});

function editProfile(){
    console.log("1");
    let editMail = document.getElementById("edit-email");
    let editName = document.getElementById("edit-name");
    let editContact = document.getElementById("edit-contact");
    let editAddress = document.getElementById("edit-address");
    let editPin = document.getElementById("edit-pin");
    let editCity = document.getElementById("edit-city");
    let userInfo = localStorage.getItem("biteQuick_userInfo");
    userInfo = JSON.parse(userInfo);
    editMail.value = userInfo.username;
    editName.value = userInfo.name;
    editContact.value = userInfo.contact;
    editAddress.value = userInfo.address.others;
    editPin.value = userInfo.address.pin;
    editCity.value = userInfo.address.city;
    // console.log(editCity.value);
    let editProfileForm = document.querySelector(".editProfileForm");
    editProfileForm.style.display = "block";
}

document.getElementById("editProfileForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let username = document.getElementById("edit-email").value;
    let name = document.getElementById("edit-name").value;
    let mobile = document.getElementById("edit-contact").value;
    let address = document.getElementById("edit-address").value;
    let pin = document.getElementById("edit-pin").value;
    let city = document.getElementById("edit-city").value;
    let message = document.getElementById("editProfileMessage");
    message.textContent = "";

    if (mobile.length !== 10) {
        message.textContent = "Mobile number must be 10 digit long";
        return;
    }
    if (pin.length !== 6) {
        message.textContent = "Pin must be 6 digit long";
        return;
    }

    message.style.color = "green";
    message.textContent = "Profile Details Changed!";

    let userInfo = localStorage.getItem("biteQuick_userInfo");
    userInfo = JSON.parse(userInfo);

    userInfo.username = username;
    userInfo.name = name;
    userInfo.contact = mobile;
    userInfo.address.others = address;
    userInfo.address.pin = pin;
    userInfo.address.city = city;
    localStorage.setItem("biteQuick_userInfo", JSON.stringify(userInfo));
});

