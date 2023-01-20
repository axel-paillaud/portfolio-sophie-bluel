//This JavaScript file load all admins modules and panels, in case we are login
const token = sessionStorage.getItem("token");

//when logged in, change text, for example 'login' to 'logout'
function changeInnerHtml(element, newInnerHtml) {
    element.innerHTML = newInnerHtml;
}

function logOut(element) {
    element.setAttribute('href', 'index.html');
    element.addEventListener('click', function() {
        sessionStorage.clear();
    })   
}

//add black header on top of the page when logged in
function addHeaderEditionMode(element) {
    let button = document.createElement('button');
    let icon = document.createElement('i');
    let span = document.createElement('span');

    element.classList.add('header-edition');

    element.appendChild(span)
    addIconWord(span, icon, 'Mode édition');

    element.appendChild(button).innerHTML = "publier les changements";
}

//add "edit" with icon button to all class 'js-edit'
function addEditButtons() {
    let elements = document.querySelectorAll('.js-edit');

    elements.forEach(a => {
        let icon = document.createElement('i');
        addIconWord(a, icon, 'modifier');
    });
}

//to add the same "modifier" mode with edit icon
function addIconWord(element, icon, string) {
    element.appendChild(icon)
    .classList.add('fa-solid', 'fa-pen-to-square');
    icon.style.margin = "8px 8px 8px 0";
    icon.insertAdjacentHTML('afterend', string);
}

if (token != null) {
    let login = document.querySelector("nav ul li a[href='login.html']");
    let headerEditionElt = document.getElementById('header-edition-mode');

    changeInnerHtml(login, "logout");
    logOut(login);
    addHeaderEditionMode(headerEditionElt);
    addEditButtons();
};
