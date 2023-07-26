const worksURI = "http://localhost:5678/api/works";
const categoriesURI = "http://localhost:5678/api/categories";

//Global variable here to select this class only once, and not multiple time
//inside the forEach loop of addAllWorks
var gallery = document.getElementsByClassName("gallery")[0];
var works;

//delete all works in the DOM
function resetDOM(element) {
    element.replaceChildren();
}

//get all works from server
async function getWorks() {
    await fetch(worksURI)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        works = value;
        return works;
        })
    .catch(function(err) {
        console.log("Une erreur sur la récupération des travaux est survenue");
        console.log(err);
    });
}

//add all works to the DOM
function addAllWorks(works, element) {
    works.forEach(work => {
        addWork(work, element, work.title);
    });
}

//add work to the DOM
function addWork(works, element, title) {

    let figure = document.createElement("figure");
    let img = document.createElement("img");
    let figcaption = document.createElement("figcaption");

    //Add image, attribute and title to the DOM
    element.appendChild(figure).appendChild(img)
    .setAttribute('src', works.imageUrl);

    img.setAttribute('alt', works.title);
    img.setAttribute('crossorigin', 'anonymous');
    figure.appendChild(figcaption)
    .innerHTML = title;
    return figure;
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

//Add event listeners on click for all categories, and filters on click
function addEventToCategories(works, element) {
    document.querySelectorAll(".filters button")
    .forEach(filter => {
        filter.addEventListener('click', function(value) {
            let categoryId = value.target.dataset.id;
            categoryId = parseInt(categoryId);

            //filters categories on click
            filtersCategories(works, categoryId, element);
        })
    });
}

//filters categories
function filtersCategories(works, categoryId, element) {
    resetDOM(gallery);

    if (categoryId == 0) {
        addAllWorks(works, element);
    }
    else {
        works.forEach(work => {
        if (work["categoryId"] == categoryId) {
            addWork(work, element, work.title);
        }
        });
    }
}

//execution of functions goes here

const promiseWorks = getWorks()
.then(function() {
    addAllWorks(works, gallery);
    return works;
})
.then(function(works) {
    getCategories()
    .then(function(categories) {
        addCategories(categories);
        addEventToCategories(works, gallery);
    });
    return works;
})
.catch(function(err) {
    console.log(err);
});
