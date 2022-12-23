//manage modal window
const modalWrapper = document.getElementsByClassName('modal-wrapper')[0];
let modal = null;
let dropDownMenu = document.getElementById('js-dropdown'); //put this selector after DOM creation of add img, and create var to null like modal var
dropDownMenu.style.display = "none";

//load and execute only if we are logged in
if (token != null) {
    const openModal = function (e) {
        e.preventDefault();
        document.getElementById('edit-modal').dataset.show = "true"; //for animation play
        const target = document.getElementById("edit-modal");
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
        addImgButton.id = "add-img-btn";
        addImgButton.innerHTML = "Ajouter une photo";
        modalWrapper.appendChild(deleteGallery).classList.add("delete-link");
        deleteGallery.setAttribute('href', "#");
        deleteGallery.innerHTML = "Supprimer la galerie";
    }

    const deleteWorkAndRefresh = async function(e)  {
        let id = e.target.dataset.id;
        console.log(id);
        await fetch(worksURI + "/" + id, {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
        .then(function() {
            resetDOM(galleryModal);
            console.log(works);
            getWorks() //get new works array
            .then(function() { //then add this array to the DOM
            works.forEach(work => {
                let figure = addWork(work, galleryModal, "éditer");
                let iconButton = addDeleteIcons(figure, work);
        
                iconButton.addEventListener('click',deleteWorkAndRefresh);        
            });
            })
        })
        .catch(function(err) {
            console.log("Une erreur sur la suppression d'un travail est survenue");
            console.log(err);
        })
    }

    function addDeleteIcons(element, work) {
        let iconButton = document.createElement('button');
        let icon = document.createElement('i');

        element.appendChild(iconButton);
        iconButton.classList.add('delete-icons');
        iconButton.setAttribute('data-id', work.id);

        iconButton.appendChild(icon)
        .classList.add("fa-regular", "fa-trash-can");
        icon.style.pointerEvents = "none";

        return iconButton;
    }

    function openDropdownBtn() {
        let dropDownBtn = document.querySelector('.input-field.dropbtn');
        dropDownBtn.addEventListener('click', function(event) {
            dropDownMenu.style.display = "block";
            dropDownMenu.style.boxShadow = "0px 14px 16px rgba(0, 0, 0, 0.09)";

            document.querySelector('.js-modal-stop')
            .addEventListener('click', closeDropDown);
            
            document.querySelector('.dropdown')
            .addEventListener('click', stopPropagation);
        })
    }

    const closeDropDown = function(e) {
        if (dropDownMenu.style.display === "none") return;
        e.preventDefault();
        dropDownMenu.style.display = 'none';

        document.querySelector('.js-modal-stop')
        .removeEventListener('click', closeDropDown);
    }

    //add categories from server to the dropdown menu in modal window "add img"
    function dropDownCategories(dropDownMenu) {
        let categories = getCategories();
        categories.then(function(value) {
            value.forEach(category => {
                let listElement = document.createElement('li');
                dropDownMenu.appendChild(listElement);
                listElement.dataset.id = category.id;
                listElement.innerHTML = category.name;
                listElement.addEventListener('click', closeDropDown);
            });
            setCategory();
        })
    }

    //listen for click on categories from dropdown menu, and set it has a choice
    function setCategory() {
        dropDownMenu.addEventListener('click', function(event) {
            let dropbtn = document.querySelector('.input-field.dropbtn');
            let icon = "<i class='fa-solid fa-chevron-down'></i>"
            dropbtn.innerHTML = event.target.textContent + icon;
            dropbtn.dataset.id = event.target.dataset.id;
        });
    }

    //get image the user just add
    function getUserImage() {
        let imageInput = document.getElementById('image-file');
        imageInput.addEventListener('change', function(value) {
            let userInput = imageInput.files[0];
            if (userInput.type === "image/png" || userInput.type === "image/jpeg")
            {
                let imgElt = document.createElement('img');
                updateImg(imgElt, userInput);
            }
        });
    }

    //update thumbnails img
    function updateImg(imgElt, userInput) {
        imgElt.classList.add('img-thumbnails');
        imgElt.file = userInput;
        let addImgContener = document.getElementById('add-img');
        
        for (let child of addImgContener.children) {
            child.style.display = 'none';
        }

        addImgContener.appendChild(imgElt);

        const reader = new FileReader();
        reader.onload = (e) => {imgElt.src = e.target.result;};
        reader.readAsDataURL(userInput);
    }

   /*  addGalleryContent(); */
    const btnAddImg = document.getElementById('add-img-btn');
    const btnCloseModal = document.getElementById('close-modal');
    const galleryModal = document.getElementsByClassName('gallery-modal')[0];
    eventModal();
    
    //uncomment when add work feature is finish
/*     promiseWorks.then(function(works) {
        works.forEach(work => {
            let figure = addWork(work, galleryModal, "éditer");
            let iconButton = addDeleteIcons(figure, work);
    
            iconButton.addEventListener('click',deleteWorkAndRefresh);
        });
    })
    .catch(function(err) {
        console.log("L'erreur suivante sur l'ajout des travaux dans la fenêtre modale est survenue :");
        console.log(err);
    }); */
}

openDropdownBtn();
dropDownCategories(dropDownMenu);
getUserImage();