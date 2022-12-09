const worksURI = "http://localhost:5678/api/works";
const categoriesURI = "http://localhost:5678/api/categories";

//get all the works from server
async function getWorks() {
    const works = [];
    await fetch(worksURI)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        value.forEach(value => {
            works.push(value);
        });
        })
    .catch(function(err) {
        console.log("Une erreur sur la récupération des travaux est survenue");
        console.log(err);
    });
    return works;
}

//add all the works to the DOM
function addWorks(works) {
    let gallery = document.getElementsByClassName("gallery")[0];

    for (let i = 0; i < works.length; i++) {
        let figure = document.createElement("figure");
        let img = document.createElement("img");
        let figcaption = document.createElement("figcaption");
    
        //Add image, attribute and title to the DOM
        gallery.appendChild(figure).appendChild(img).setAttribute('src', works[i].imageUrl);
        img.setAttribute('alt', works[i].title);
        img.setAttribute('crossorigin', 'anonymous');
        gallery.appendChild(figure).appendChild(figcaption).innerHTML = works[i].title;
    }

}

//get all categories from server
async function getCategories() {
    const categories = [];
     await fetch(categoriesURI)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        value.forEach(category => {
            categories.push(category);
        });
    })
    .catch(function(err) {
        console.log(err);
    });
    return categories;
}

//add categories to the DOM
function addCategories(categories) {
    let button = document.createElement("button");
    let categoryElt = document.getElementsByClassName("filters")[0];
    document.getElementsByClassName("filters")[0]
    .appendChild(button)
    .setAttribute('data-id', 0);
    button.innerHTML = "Tous";

    for (let i = 0; i < categories.length; i++) {
        let button = document.createElement("button");
        categoryElt.appendChild(button).setAttribute('data-id', categories[i].id);
        button.innerHTML = categories[i].name;
    }
}

//Add event listeners for click on all categories
function addEventToCategories() {
    document.querySelectorAll(".filters button")
    .forEach(filter => {
        filter.addEventListener('click', function(value) {
            let id = value.target.dataset.id;
            id = parseInt(id);
            console.log(id);
        })
    });
}

//Filters categories
function filtersCategories() {

}

let works = getWorks()
.then(function(works) {
    addWorks(works);
    return works;
})
.then(function(works) {
    getCategories()
    .then(function(categories) {
        addCategories(categories);
        addEventToCategories();
    });
})
.catch(function(err) {
    console.log(err);
});

/*
getCategories()
.then(function(categories) {
    addCategories(categories);
    addEventToCategories();
})
.catch(function(err) {
    console.log(err);
})
*/