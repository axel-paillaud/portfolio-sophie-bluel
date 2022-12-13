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

function addHeaderEditionMode(element) {
    let button = document.createElement('button');
    let icon = document.createElement('i');
    let span = document.createElement('span');

    element.classList.add('header-edition');

    element.appendChild(span)
    addIconWord(span, icon, 'Mode édition');

    element.appendChild(button).innerHTML = "publier les changements";
}

function addEditProject() {
    let element = document.getElementById('edit-project');
    let icon = document.createElement('i');

    addIconWord(element, icon, 'modifier');
}

//For adding the same "modifier" mode with edit icon
function addIconWord(element, icon, string) {
    element.appendChild(icon).classList.add('fa-solid', 'fa-pen-to-square');
    icon.insertAdjacentHTML('afterend', string);
}

if (token != null) {
    console.log("You are logged in as administrator");
    let login = document.querySelector("nav ul li a[href='login.html']");
    let headerEditionElt = document.getElementById('header-edition-mode');

    changeInnerHtml(login, "logout");
    logOut(login);
    addHeaderEditionMode(headerEditionElt);
    addEditProject();
};
