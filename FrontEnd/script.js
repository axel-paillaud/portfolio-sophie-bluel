function createWorkElt(gallery, value) {
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    let figcaption = document.createElement("figcaption");

    gallery.appendChild(figure).appendChild(img).setAttribute("src", value.imageUrl);
    gallery.appendChild(figure).appendChild(figcaption).innerHTML = value.title;
}

fetch("http://localhost:5678/api/works")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        value.forEach(value => {
            let gallery = document.getElementsByClassName("gallery")[0];
            createWorkElt(gallery, value);
        });
        console.log(value);
    })
    .catch(function(err) {
        console.log("Une erreur est survenue");
    });

