// console.log('running');
let cats = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Product Title-1',
        tag: 'product1',
        price: 100,
        inCart: 0
    },
    {
        name: 'Product Title-2',
        tag: 'product2',
        price: 200,
        inCart: 0
    },
    {
        name: 'Product Title-3',
        tag: 'product3',
        price: 300,
        inCart: 0
    },
    {
        name: 'Product Title-4',
        tag: 'product4',
        price: 400,
        inCart: 0
    }
];

for(let i = 0; i< cats.length; i++){
    cats[i].addEventListener('click', ()=>{
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.cart sup').textContent= productNumbers;
    }
}

function cartNumbers(product){
    // console.log("The product click is ", product);
    // localStorage.setItem('cartNumbers',1);
    let productNumbers = localStorage.getItem('cartNumbers');
    // console.log(productNumbers);
    // console.log(typeof productNumbers);
    productNumbers = parseInt(productNumbers);
    // console.log(typeof productNumbers);
    // console.log(productNumbers);
    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart sup').textContent= productNumbers + 1;
    } else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cart sup').textContent= 1;
    }
    setItems(product);
    
}

function setItems(product){
    // console.log("inside of setitems product");
    // console.log('My product is ', product);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    console.log('My cart items is ', cartItems);
    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else{
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        };
    }
    
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}
function totalCost(product){
    // console.log('The product price is ', product.price);
    let cartCost = localStorage.getItem('totalCost');
    // console.log("my cart cost is ", cartCost);
    if(cartCost != null){
        // console.log(typeof cartCost);
        cartCost = parseInt(cartCost);
        // console.log(typeof cartCost);
        localStorage.setItem('totalCost', cartCost+product.price);
    }else{
        localStorage.setItem('totalCost', product.price);
    }
    
}
function displayCart(){
   let cartItems = localStorage.getItem('productsInCart');
   cartItems = JSON.parse(cartItems);
    // console.log (cartItems);
    let cartProducts = document.querySelector('.cart-show');
    if(cartItems && cartProducts){
        // console.log('running');
        cartProducts.innerHTML = '';
        Object.values(cartItems).map(item =>{
            cartProducts.innerHTML +=
            `
            <tr>
                <span><img height="100px" width="100px" src="./image/${item.tag}.jpg" alt=""></span>
                <span class='ms-5'>${item.name}</span>
                <span class='ms-5'>$${item.price}</span>
                <span class='ms-5'>${item.inCart}</span>
                <span class='ms-5'>${item.inCart * item.price}</span>
                <span class='ms-5 bg-warning p-2'>x</span>
            </tr></br>
            <hr class="mb-3">
            `;
        });
        cartProducts.innerHTML +=
        `
            <tr>
                <span>$${cartCost}</span>
            </tr>
        `;
    }


}
onLoadCartNumbers();
displayCart();