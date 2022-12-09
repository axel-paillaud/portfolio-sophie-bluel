const worksURI = "http://localhost:5678/api/works";
const categoriesURI = "http://localhost:5678/api/categories";

function addWork(gallery, value, urlImg) {
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    let figcaption = document.createElement("figcaption");

    //Add image, attribute and title to the DOM
    gallery.appendChild(figure).appendChild(img).setAttribute('src', urlImg);
    img.setAttribute('alt', value.title);
    img.setAttribute('crossorigin', 'anonymous');
    gallery.appendChild(figure).appendChild(figcaption).innerHTML = value.title;
}

//Get works from backend in JSON format, and add it to the DOM
function getAllWorks() {
    fetch(worksURI)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        let gallery = document.getElementsByClassName("gallery")[0];
        gallery.replaceChildren();
        value.forEach(value => {
            addWork(gallery, value, value.imageUrl);
        });
    })
    .catch(function(err) {
        console.log("Une erreur est survenue");
        console.log(err);
    });
}


function filtersWorks(categoriesId) {
    fetch(worksURI)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        let gallery = document.getElementsByClassName("gallery")[0];
        gallery.replaceChildren();
        value.forEach(value => {
            if (value.categoryId == categoriesId) {
                addWork(gallery, value, urlImg);
            }
        });
    })
    .catch(function(err) {
        console.log("Une erreur sur les filtres de catégories est survenue");
        console.log(err);
    });
}

//get categories froms backend, and listen for filters event
function getCategories(categoriesURI) {
    let categories = [];
    fetch(categoriesURI)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        const categoriesBackEnd = new Set();
        categories[0] = 1;
        value.forEach(value => {
            categoriesBackEnd.add(value.id);
        });
        //add listener for all filters button
        document.querySelectorAll(".filters button").forEach(filter => {
            filter.addEventListener('click', function(value) {
                let id = value.target.dataset.id;
                id = parseInt(id);
                if (categoriesBackEnd.has(id)) {
                    filtersWorks(id);
                }
                else {
                    getAllWorks();
                }
            });
        });
    })
    .catch(function(err) {
        console.log("Une erreur sur les catégories de travaux est survenue");
        console.log(err);
    })
}

getAllWorks();
getCategories(categoriesURI);

