const loginURI = "http://localhost:5678/api/users/login";
const form = document.getElementsByClassName("login")[0].elements;
let alreadyMsgError = false;

//fake user for test, we have to get the input from the login form
const sophie = {
    email: 'sophie.bluel@test.tld',
    password: 'S0phie'
};

function getUserLog() {
    let email = form["email"].value;
    let password = form["password"].value;

    const user = {
        email: email,
        password: password
    }

    return user;
}

function showErrorMsg() {
    let errorMsg = "Erreur dans l'identifiant ou le mot de passe";
    let p = document.createElement("p");

    if (!alreadyMsgError) {
        document.getElementById('error-msg-log')
        .appendChild(p).classList.add("error-msg");
        p.innerHTML = errorMsg;
        alreadyMsgError = true;
    }
}

form["submit-login"].addEventListener('click', function(event) {
    event.preventDefault();
    let user = getUserLog();
    fetch(loginURI, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
        else {
            //here show the html error message
            showErrorMsg();
            return 0;
        }
    })
    .then(function(value) {
        if (value !== 0) {
            sessionStorage.setItem("token", value.token);
            location.href = "index.html";
        }
    })
    .catch(function(err) {
        console.log(err);
    })
}); 