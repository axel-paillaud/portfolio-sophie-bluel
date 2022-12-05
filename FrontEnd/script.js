function addWorkElt(gallery, value, relativeUrlImg) {
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    let figcaption = document.createElement("figcaption");

    //Add image, attribute and title to the DOM
    gallery.appendChild(figure).appendChild(img).setAttribute("src", '../Backend' + relativeUrlImg);
    img.setAttribute('alt', value.title);
    gallery.appendChild(figure).appendChild(figcaption).innerHTML = value.title;
}

//Get works from backend in JSON format
fetch("http://localhost:5678/api/works")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        value.forEach(value => {
            let gallery = document.getElementsByClassName("gallery")[0];
            const relativeUrlImg = new URL(value.imageUrl).pathname;
            addWorkElt(gallery, value, relativeUrlImg);
        });
    })
    .catch(function(err) {
        console.log("Une erreur est survenue");
    });
