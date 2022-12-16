//manage modal window
const modalWrapper = document.getElementsByClassName('modal-wrapper')[0];
let modal = null;

//execute only if we are logged in
if (token != null) {
    const openModal = function (e) {
        e.preventDefault();
        document.getElementById('edit-modal').dataset.show = "true"; //for animation play
        const target = document.querySelector(e.target.getAttribute('href'));
        target.style.display = null; //remove the display : none
        modal = target;
        modal.addEventListener('click', closeModal);
        btnCloseModal.addEventListener('click', closeModal);
        document.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
    }
    
    const closeModal = function(e) {
        if (modal === null) return; //if already no modal, stop the function
        e.preventDefault();
        document.getElementById('edit-modal').dataset.show = "false";
        window.setTimeout(function() { //to delay and let time for animation close
            modal.style.display = 'none';
            modal = null;
        }, 500);
        modal.removeEventListener('click', closeModal);
        btnCloseModal.removeEventListener('click', closeModal);
        document.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
    }
    
    //close modal only when click outside the .modal-wrapper
    const stopPropagation = function(e) {
        e.stopPropagation();
    }

    //add eventListener to the modal "edit" button with 'js-modal' class
    function eventModal() {
        document.querySelector('.js-modal').addEventListener('click', openModal);
    }

    //add title, div and button to edit gallery inside the modal window
    function addGalleryContent() {
        let closeButton = document.createElement('button');
        let iconClose = document.createElement('i');
        let addImgButton = document.createElement('button');
        let title = document.createElement('h2');
        let galleryContener = document.createElement('div');
        let lineBreak = document.createElement('hr');
        let deleteGallery = document.createElement('a');

        modalWrapper.appendChild(closeButton).id = "close-modal";
        closeButton.appendChild(iconClose).classList.add("fa-solid", "fa-xmark");

        modalWrapper.appendChild(title).innerHTML = "Galerie photo";
        modalWrapper.appendChild(galleryContener).classList.add("gallery-modal");
        modalWrapper.appendChild(lineBreak);
        modalWrapper.appendChild(addImgButton).classList.add("btn-primary");
        addImgButton.innerHTML = "Ajouter une photo";
        modalWrapper.appendChild(deleteGallery).classList.add("delete-link");
        deleteGallery.setAttribute('href', "#");
        deleteGallery.innerHTML = "Supprimer la galerie";
    }

    addGalleryContent();
    const btnCloseModal = document.getElementById('close-modal');
    const galleryModal = document.getElementsByClassName('gallery-modal')[0];
    eventModal();
    
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
}
