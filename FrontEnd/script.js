function createWorkElt(gallery) {
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    let figcaption = document.createElement("figcaption");

    gallery.appendChild(figure).appendChild(img);
    gallery.appendChild(figure).appendChild(figcaption);
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
            createWorkElt(gallery);
            console.log(value.imageUrl);
        });
    })
    .catch(function(err) {
        console.log("Une erreur est survenue");
    });

