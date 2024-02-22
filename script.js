document.addEventListener("DOMContentLoaded", function (params) {
    document.getElementById("go-to-checkout").addEventListener("click",()=>{
          window.location.href="./checkout.html"})
  const deleteAll=document.getElementById("delete-all")

          deleteAll.addEventListener("click",()=>{
              localStorage.removeItem("basket")
              const cartItems=document.getElementById("cart-items")
              cartItems.innerText="Empty"
              document.getElementById("total-price").innerText="0"
              updateCartCount()
          })

const addtocartButton = document.querySelectorAll(".add-to-cart");
addtocartButton.forEach((button) => { button.addEventListener("click", (e) => {
 const card = e.target.closest(".card");
 const product = {
       id: card.dataset.id,
       image: card.querySelector("img").src,
       title: card.querySelector("h2").innerText,
       price: parseFloat(
       card.querySelector(".price").innerText.replace("$", "")
          ),
          quantity: 1,
        };
        addToCart(product);
        DisplayCart();
      });
    });
    function addToCart(addproduct) {
      let cart=JSON.parse(localStorage.getItem("basket")) || [] 
      const existingProductIndex=cart.findIndex((product)=>product.id===addproduct.id)

      if(existingProductIndex > -1){
          cart[existingProductIndex].quantity+=1
      }
      else{
          cart.push(addproduct)}
        localStorage.setItem("basket", JSON.stringify(cart));
        updateCartCount();
      }
    function DisplayCart() {
        let cart = JSON.parse(localStorage.getItem("basket")) || [];
        const cartItems = document.getElementById("cart-items");
        cartItems.innerHTML = "";
        cart.forEach((product)=>{

          const pro=document.createElement("div")
          pro.innerHTML=`<div class="cartProduct" data-id=${product.id}>
          <img class="cart-img" src=${product.image} alt="bags">
           ${product.title}-${product.quantity} eded -Price:
            ${(product.quantity*product.price).toFixed(2)}
            <i class="fa-solid fa-trash delete-product" ></i></div>`
           cartItems.appendChild(pro)
       })
        const totalPrice=cart.reduce((toplam,item)=>toplam+(item.price*item.quantity),0)
        document.getElementById("total-price").textContent = totalPrice.toFixed(2);

        const deleteProduct=document.querySelectorAll(".delete-product")

        deleteProduct.forEach(delPro=>{
        
            delPro.addEventListener("click",(e)=>{
                const card=e.target.closest(".cartProduct")
                console.log(card);
                const productId=card.dataset.id
                RemoveProduct(productId)
                
            })
        })

        function RemoveProduct(productID) {
          const cart=JSON.parse(localStorage.getItem("basket")) || []
          const updateCart=cart.filter(item=>item.id !==productID)

          localStorage.setItem("basket",JSON.stringify(updateCart))
          updateCartCount()
          DisplayCart()


  }
       /// Səbətdəki fərqli məhsul sayını  göstərmek///
        const differentproductsCount = new Set(cart.map((product) => product.id)).size;
        document.getElementById("displayCount").textContent = differentproductsCount;
      
      }
    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem("basket")) || [];
        const totalCount = cart.reduce(
          (toplam, item) => (toplam += item.quantity),
          0
        );
        document.getElementById("cart-count").innerText = totalCount;
      }
      updateCartCount();
      DisplayCart();
    });

    // wishlist///
    document.addEventListener("DOMContentLoaded", function () {
      const addToWishlistButtons = document.querySelectorAll(".add-to-wishlist");
      addToWishlistButtons.forEach(button => {
          button.addEventListener("click", function (e) {
              const card = e.target.closest(".card");
              const product = {
                  id: card.dataset.id,
                  image: card.querySelector("img").src,
                  title: card.querySelector("h2").innerText,
                  price:parseFloat(
                    card.querySelector(".price").innerText.replace("$", ""))
                  
              };
              addToWishlist(product);
              displayWishlist();
          });
      });
  
      function addToWishlist(product) {
          let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
          const existingProductIndex = wishlist.findIndex((item) => item.id === product.id);
          if (existingProductIndex === -1) { 
              wishlist.push(product);
          }
          localStorage.setItem("wishlist", JSON.stringify(wishlist));
      }
  
      function displayWishlist() {
          let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
          const wishlistItems = document.getElementById("wish-items");
          wishlistItems.innerHTML = ""; 
          wishlist.forEach(product => {
              const productElement = document.createElement("div");
              productElement.innerHTML = `
                  <img class="wishlist-img" src="${product.image}" alt="${product.title}">
                  <div>${product.title}</div>
                  <div>${product.price}</div>
                  <button class="remove-from-wishlist" data-id="${product.id}">Remove</button>
                  <button class="add-to-cart-from-wishlist" data-id="${product.id}">Add to Cart</button>
              `;
              wishlistItems.appendChild(productElement);
          });
  
          attachEventListenersToWishlistButtons();
      }
  
      function attachEventListenersToWishlistButtons() {
          document.querySelectorAll('.remove-from-wishlist').forEach(button => {
              button.addEventListener('click', function () {
                  removeFromWishlist(this.getAttribute('data-id'));
                  displayWishlist();
              });
          });
          document.querySelectorAll('.add-to-cart-from-wishlist').forEach(button => {
            button.addEventListener('click', function () {
              const productId = this.getAttribute('data-id');
              const product = JSON.parse(localStorage.getItem("wishlist")).find(product => product.id === productId);
              
              
              addToCart(product);
              
              
              removeFromWishlist(productId);
              displayWishlist();
              DisplayCart();
              
            });
          });
      }
  
      function removeFromWishlist(productId) {
          let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
          const filteredWishlist = wishlist.filter(product => product.id !== productId);
          localStorage.setItem("wishlist", JSON.stringify(filteredWishlist));
      }
  });

 
  



      








    