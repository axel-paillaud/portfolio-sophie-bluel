const loginURI = "http://localhost:5678/api/users/login";
const form = document.getElementsByClassName("login")[0].elements;

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

    console.log(user);
    return user;
}

form["submit-login"].addEventListener('click', function() {
    getUserLog();
    fetch(loginURI, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(sophie)
    })
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
        else {
            console.log("error");
            return 0;
        }
    })
    .then(function(value) {
        sessionStorage.setItem("token", value.token);
    })
    .catch(function(err) {
        console.log(err);
    })
});