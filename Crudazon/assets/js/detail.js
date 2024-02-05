const url = "https://striveschool-api.herokuapp.com/api/product/";
const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_API_KEY" 
});


function popolaDetailPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const productUrl = `${url}/${productId}`;

    fetch(productUrl, {
        method: 'GET',  
        headers: headers,
    })
    .then(response => response.json())
    .then(product => {
        const imgDettagli = document.getElementById("imgDettagli");
        const descrizioneDettagli = document.getElementById("descrizioneDettagli");

        if (imgDettagli && descrizioneDettagli) {
            
            imgDettagli.innerHTML = `<img src="${product.imageUrl}" class="img-fluid" alt="Product Image">`;
            descrizioneDettagli.innerHTML = ` ${product.brand} <div class="h3"> ${product.name}</div> <div class="bg-dark text-warning w-25"> Prezzo: ${product.price} $</div> <div > Descrizione: ${product.description} </div> `;
        }
    })
    .catch(error => console.error('Error:', error));
}


window.onload = function() {
    popolaDetailPage();
}