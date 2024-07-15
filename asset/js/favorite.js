let favorites= [];

products.forEach(product=>{
    if(product.fav == true){
        favorites.push(product)
    }
})


function stockStatus(title){
    const item = favorites.find(product=>product.title == title);
    return item.stock>0 ? 'In Stock':'Out of stock';
}

let content = "";
const container = document.querySelector(".favorite-content")

function loadFavorite(){
    favorites.forEach(favorite=>{
        content += '<div class="tr">';
        content += '<div class="products">';
        content += `<img src="${favorite.imageUrl}" alt="">`
        content += `<div> <h1>${favorite.category}</h1> <h3>${favorite.title}</h3></div>`;
        content += `</div>`
        content += `<h1>Rp${favorite.price}</h1>`
        content += `<h1>${stockStatus(favorite.title)}</>`
        content += `<h1>${new Date().toJSON().slice(0, 10)}</h1>`
        content += ` <div class="button">`;
        content += `<button>Add To Cart </button>`
        content += `</div> </div>`;
    });
    container.innerHTML = content;
}

document.onload = loadFavorite();


