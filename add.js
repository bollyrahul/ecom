let carts = document.querySelectorAll(".btn-secondary");
let products = [

  {
    name: "J B Fashion Women's Regular fit Top",
    tag: "wf1",
    price: 325,
    inCart: 0
  },
  {
    name: "The Leotude Men's Cotton Printed T-Shirt Half Sleeve Black Maroon Colour",
    tag: "mf1",
    price: 329,
    inCart: 0
  },
  {
    name: "J B Fashion Women's Regular fit Top",
    tag: "wf1",
    price: 299,
    inCart: 0
  },
  {
    name: "The Subtle Art Of Not Giving A Fuck",
    tag: "onsale1",
    price: 99,
    inCart: 0
  },
  {
    name: "Main Kampf",
    tag: "onsale2",
    price: 399,
    inCart: 0
  },
  {
    name: "The Rudest Book Ever",
    tag: "onsale3",
    price: 199,
    inCart: 0
  }

];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector(".fa-shopping-cart").textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");

  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".fa-shopping-cart").textContent =
      productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".fa-shopping-cart").textContent = 1;
  }
  setItems(product);
}
function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
function totalCost(product) {
  let cartCost=Number(localStorage.getItem("totalCost")) !== 0
    ? localStorage.setItem(
        "totalCost",
        Number(localStorage.getItem("totalCost")) + Number(product.price)
      )
    : Number(localStorage.setItem("totalCost", product.price));

  console.log(product.price);
  console.log("the produt price is ", product.price);
}
function displayCart(){
  let cartItems=localStorage.getItem("productsInCart");
  cartItems=JSON.parse(cartItems);
  let productContainer =document.querySelector(".products");
  let cartCost=Number(localStorage.getItem("totalCost"));
  console.log(cartItems);

  if(cartItems && productContainer){
    productContainer.innerHTML='';
    Object.values(cartItems).map(item =>{
        productContainer.innerHTML +=`
        <div class="product">

          <img src="D:/${item.tag}.jpg">
          <span>${item.name}</span>
          </div>
          <div class="price">Rs. ${item.price}.00</div>
          <div class="quantity">
          
          <span>${item.inCart}</span>
          
          </div>
          <div class="total">Rs. ${item.inCart*item.price}.00</div>
        `;

    });
    productContainer.innerHTML +=`
    <div class="basketTotalContainer"></div>
      <h4 class="basketTotalTitle">Basket Total</h4>
      <h4 class=basketTotal>Rs.${cartCost}.00</h4>

    `
  }
}
onLoadCartNumbers();
displayCart();
