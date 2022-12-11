let token = sessionStorage.getItem("token");

function changeInnerHtml(element, newInnerHtml) {
    element.innerHTML = newInnerHtml;
}

function logOut(element) {
    element.setAttribute('href', 'index.html');
    element.addEventListener('click', function() {
        sessionStorage.clear();
    })   
}

function headerEditionMode(element) {
    let span = document.createElement('span');
    let icon = document.createElement('i');
    let button = document.createElement('button');

    element.classList.add('header-edition');

    element.appendChild(span)
    .appendChild(icon)
    .classList.add('fa-solid', 'fa-pen-to-square');

    icon.insertAdjacentHTML('afterend', 'Mode édition');
    element.appendChild(button).innerHTML = "publier les changements";
}

if (token != null) {
    console.log("You are logged in as administrator");
    let login = document.querySelector("nav ul li a[href='login.html']");
    let headerEditionElt = document.getElementById('header-edition-mode');
    console.log(headerEditionElt);


    changeInnerHtml(login, "logout");
    logOut(login);
    headerEditionMode(headerEditionElt);
};
