document.addEventListener("DOMContentLoaded",()=>{

    
    function DisplayCheckout() {
        
        let cart=JSON.parse(localStorage.getItem("basket")) || []

        let checkoutItems=document.getElementById("checkout-items")
        checkoutItems.innerHTML='';
        cart.forEach((product,index) => {
                let cartElement=document.createElement("div")
                cartElement.innerHTML=`
                <div class="checkout-product" data-id=${product.id}>
                <img class="checkout-image" src=${product.image} alt="">
                <h3>${product.title}</h3>
                <button class="decrease">-</button>
                <span class="quantity">${product.quantity}</span>
                <button class="increase">+</button>
                <p>${product.price.toFixed(2)}</p>
                <span class="product-total-price">
                Total ${(product.quantity*product.price).toFixed(2)}</span>
                <button class="delete-checkout-product">Delete</button>
            </div>
                `
               
                checkoutItems.appendChild(cartElement)
                

                cartElement.querySelector(".increase").addEventListener("click",()=>{
                    updateProductQuantity(index,1)
                })
                cartElement.querySelector(".decrease").addEventListener("click",()=>{
                    updateProductQuantity(index,-1)
                    cart[index].quantity++
                })
                cartElement.querySelector(".delete-checkout-product").addEventListener("click",()=>{
                    deleteProductFromCheckout(index)
                    
                })

        });


    }

    function updateProductQuantity(index,change) {
        let cart=JSON.parse(localStorage.getItem("basket")) || []
        if(cart[index].quantity + change<=0){
            cart.splice(index,1)
        }
        else{
            cart[index].quantity+=change
        }

        localStorage.setItem("basket",JSON.stringify(cart))
        DisplayCheckout()
        updateCheckoutTotalPrice()
        
    }

    function updateCheckoutTotalPrice() {
        let cart=JSON.parse(localStorage.getItem("basket")) || []

        const total=cart.reduce((toplam,item)=>toplam+(item.price*item.quantity),0)

        document.getElementById("checkout-total-price").innerText=total.toFixed(2)
    }
    function deleteProductFromCheckout(index) {
        let cart=JSON.parse(localStorage.getItem("basket")) || []

        cart.splice(index,1)
        localStorage.setItem("basket",JSON.stringify(cart))

        DisplayCheckout()
        updateCheckoutTotalPrice()
    }


document.getElementById("checkout-delete-all").addEventListener("click",()=>{
    localStorage.removeItem("basket")
    DisplayCheckout()
    updateCheckoutTotalPrice()

})

DisplayCheckout()
updateCheckoutTotalPrice()

})