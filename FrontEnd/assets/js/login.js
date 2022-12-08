const loginURI = "http://localhost:5678/api/users/login";

//fake user for test, we have to get the input from the login form
const user = {
    email: 'sophie.bluel@test.tld',
    password: 'S0phie'
};

const form = document.getElementsByClassName("login")[0].elements;

form["submit-login"].addEventListener('click', function() {
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
            console.log("error");
            return 0;
        }
    })
    .then(function(value) {
        console.log(value.token);
    })
    .catch(function(err) {
        console.log(err);
    })
});