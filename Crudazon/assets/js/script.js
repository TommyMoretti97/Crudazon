const url = "https://striveschool-api.herokuapp.com/api/product/";
const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_API_KEY" 
});


    


window.onload = function() {
    showLoadingIndicator();
    fetch(url, { headers })
    .then(response => response.json())
    .then((data) => {
       
        let card = document.getElementById("cards");
        card.innerHTML = "";
        data.forEach(product => {
            card.innerHTML += `
            <div class="col">   
                <div class="card">
                <img src="${product.imageUrl}" class="card-img-top" height="343px" alt="...">
                <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <a class="btn btn-warning me-2 mb-2" href="back.html?id=${product._id}" >Modifica</a>
                <a class="btn btn-info mb-2" href="detail.html?id=${product._id}" >Scopri di più</a>
                </div>
                </div>
            </div>
            `;
        });
        })
        .catch(error => console.error('Error:', error))
        .finally(() =>{
        hideLoadingIndicator();
      })
        
        
        
}




function nascondiBottone() {
    const nascondiBottone = document.querySelector(".btn-primary");
    nascondiBottone.addEventListener("click", () => {
       const bottoneElimina = document.getElementById("eliminaProdotto");
       bottoneElimina.style.display = "none";
    });
}
nascondiBottone();

function showLoadingIndicator() {
    const loadingIndicator = document.getElementById("loadingIndicator");
    loadingIndicator.style.display = "block";
}

function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById("loadingIndicator");
    loadingIndicator.style.display = "none";
}