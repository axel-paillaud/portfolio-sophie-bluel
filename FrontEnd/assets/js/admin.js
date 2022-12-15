const token = sessionStorage.getItem("token");
const galleryModal = document.getElementsByClassName('gallery-modal')[0];
const btnCloseModal = document.getElementById('close-modal');
let modal = null;


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

const openModal = function (e) {
    e.preventDefault();
    document.getElementById('edit-modal').dataset.show = "true";
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = null;
    modal = target;
    modal.addEventListener('click', closeModal);
    btnCloseModal.addEventListener('click', closeModal);
    document.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
}

const closeModal = function(e) {
    if (modal === null) return;
    e.preventDefault();
    document.getElementById('edit-modal').dataset.show = "false";
    window.setTimeout(function() {
        modal.style.display = 'none';
        modal = null;
    }, 500);
    modal.removeEventListener('click', closeModal);
    btnCloseModal.removeEventListener('click', closeModal);
    document.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
}

const stopPropagation = function(e) {
    e.stopPropagation();
}

function addEditProject() {
    let elements = document.querySelectorAll('.js-edit-project');

    elements.forEach(a => {
        let icon = document.createElement('i');
        addIconWord(a, icon, 'modifier');
        a.addEventListener('click', openModal);
    });
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

promiseWorks.then(function(works) {
    works.forEach(work => {
        let iconButton = document.createElement('button');
        let icon = document.createElement('i');
        let figure = addWork(work, galleryModal, "éditer");

        figure.appendChild(iconButton);
        iconButton.classList.add('edit-icons');

        iconButton.appendChild(icon)
        .classList.add("fa-regular", "fa-trash-can");
    });
})