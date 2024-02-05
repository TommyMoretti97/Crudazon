const url = "https://striveschool-api.herokuapp.com/api/product/";
const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_API_KEY" 
});


window.onload = () =>{
    popolaBackPage();
    resetProdotto(); 
    setupSalvaButton();
}

function popolaBackPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const productUrl = `${url}/${productId}`;

    fetch(productUrl, {
        method: 'GET',
        headers: headers,
    })
    .then(response => response.json())
    .then(product => {
        document.getElementById("name").value = product.name;
        document.getElementById("descrizione").value = product.description;
        document.getElementById("brand").value = product.brand;
        document.getElementById("urlimg").value = product.imageUrl;
        document.getElementById("prezzo").value = product.price;
    })
    .catch(error => console.error('Error:', error));
}

function eliminaProdotto() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const productUrl = `${url}/${productId}`;
    alert("sei sicuro di voler eliminare il prodotto?");
    fetch(productUrl, {
        method: 'DELETE',
        headers: headers,
    })
    .then(response => response.json())
    .then(product => {
        console.log("Prodotto eliminato con successo");
        console.log(product);
        window.location.href = "index.html";
})
}
document.getElementById("eliminaProdotto").addEventListener("click", eliminaProdotto);

function resetProdotto() {
    const resetButton = document.getElementById("resetProdotto");
    resetButton.addEventListener("click", () => {
        alert("sei sicuro di voler rimuovere tutti i dati?");
        document.getElementById("name").value = "";
        document.getElementById("descrizione").value = "";
        document.getElementById("brand").value = "";
        document.getElementById("urlimg").value = "";
        document.getElementById("prezzo").value = "";
    });
}
function setupSalvaButton() {
    const salvaButton = document.getElementById("salvaProdotto");
    salvaButton.addEventListener("click", () => {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        const productUrl = productId ? `${url}/${productId}` : url;

        const productData = {
            name: document.getElementById("name").value,
            description: document.getElementById("descrizione").value,
            brand: document.getElementById("brand").value,
            imageUrl: document.getElementById("urlimg").value,
            price: document.getElementById("prezzo").value,
        };

        if (productId) {
            updateProduct(productUrl, productData);
        } else {
            addNewProduct(productUrl, productData);
        }
    });
}

function updateProduct(productUrl, updatedProduct) {
    fetch(productUrl, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(updatedProduct),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
       
    })
    .catch(error => console.error('Error:', error));
}

function addNewProduct(productUrl, newProduct) {
    fetch(productUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(newProduct),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
      
        
    })
    .catch(error => console.error('Error:', error));
}

