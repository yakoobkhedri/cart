if (document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else {
    ready()
}

function ready() {
    let removeCartItemsButtons=document.getElementsByClassName('btn-danger');
    for (let i=0;i<removeCartItemsButtons.length;i++){
         let button = removeCartItemsButtons[i];
         button.addEventListener('click',removeCartItem)
    }
    let quantityInput=document.getElementsByClassName('cartQty');
    for (let i=0;i<quantityInput.length;i++){
        let input=quantityInput[i];
        input.addEventListener('change',quantityChanged)
    }

    let addToCartBtn=document.getElementsByClassName('addToCartBtn');
    for (let i=0;i<addToCartBtn.length;i++){
        let addBtn=addToCartBtn[i];
        addBtn.addEventListener('click',addToCartClicked);
    }

    document.getElementsByClassName('btn-success')[0].addEventListener('click',purchaseClicked);
}

function purchaseClicked() {
    alert('thank you for your purchase');
    let cartItems=document.getElementsByClassName('cartItems')[0];
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
}

function removeCartItem(event) {
    let buttonClicked=event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChanged(event) {
    let input=event.target;
    if (isNaN(input.value) || input.value <=0){
        input.value=1;
    }
    updateCartTotal();
}

function addToCartClicked(event) {
    let addBtn=event.target;
    let shopItem=addBtn.parentElement.parentElement;
    let productName=shopItem.getElementsByClassName('productName')[0].innerText;
    let productPrice=shopItem.getElementsByClassName('productPrice')[0].innerText;
    let productImage=shopItem.getElementsByClassName('productImage')[0].src;
    addProductToCart(productName,productPrice,productImage);
    updateCartTotal();
}

function addProductToCart(productName,productPrice,productImage) {
    let cartRow=document.createElement('div');
    cartRow.classList.add('cartRow');
    let cartItems=document.getElementsByClassName('cartItems')[0];
    let cartItemNames=cartItems.getElementsByClassName('cartName');
    for (let i=0;i < cartItemNames.length;i++){
        if (cartItemNames[i].innerText==productName){
            alert('this item is already added to the cart');
        }
    }
    cartRow.innerHTML=`
             <div class="text-center">
                  <img src="${productImage}" class="w-50 img-thumbnail">
                  <span class="cartName d-block">${productName}</span>
             </div>
             <span class="cartPrice h3">${productPrice}</span>
             <div class="d-flex justify-content-center align-items-center">
                  <input type="number" value="1" class="cartQty form-control w-25">
                  <button class="btn btn-danger">remove</button>
             </div>
    `;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem);
    cartRow.getElementsByClassName('cartQty')[0].addEventListener('change',quantityChanged);
}

function updateCartTotal() {
   let cartItemsContainer=document.getElementsByClassName('cartItems')[0];
   let cartRows=cartItemsContainer.getElementsByClassName('cartRow');
   let total=0;
    for (let i=0;i<cartRows.length;i++){
        let cartRow=cartRows[i];
        let cartPrice=cartRow.getElementsByClassName('cartPrice')[0];
        let cartQuantity=cartRow.getElementsByClassName('cartQty')[0];
        let price=parseFloat(cartPrice.innerText.replace('$',''));
        let quantity=cartQuantity.value;
        total+=(price*quantity);
    }
    total=Math.round(total*100)/100;
    document.getElementsByClassName('cartTotalPrice')[0].innerText=total+'$';
}