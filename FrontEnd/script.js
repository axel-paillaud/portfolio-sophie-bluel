function createElt(type) {
    return elt = document.createElement(type);
}

fetch("http://localhost:5678/api/works")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        console.log(value);
        let elt = createElt("figure");
        document.getElementsByClassName("gallery")[0].appendChild(elt);
    })
    .catch(function(err) {
        console.log("Une erreur est survenue");
    });


    /*
async function getArticle() {
    let article = await fetch("http://localhost:5678/api/works");
    return article;
}

let article = getArticle();
setTimeout(function() {
    console.log(article);
}, 5000);
*/