const submenuItem = document.querySelectorAll(".menu__item")
const searchHeaderIcon = document.querySelector(".search-header__icon")
const headerBurger = document.querySelector(".burger-menu")
const headerMenu = document.querySelector(".menu__nav")
const formHeader = document.querySelector(".form-header")
for (let i = 0; i < submenuItem.length;
     i++
) {
    if (document.size = 768 && isMobile.any()) {
        const arrowDown = document.querySelectorAll(".menu__arrow")
        for (let j = 0; j < arrowDown.length; j++) {
            arrowDown[j].addEventListener("click", e => {
                submenuItem[j].classList.toggle("active")
            })
            document.documentElement.addEventListener("click", e => {
                if (!e.target.closest(".menu__submenu") && !e.target.closest(".menu__arrow")) {
                    submenuItem[j].classList.remove("active")
                }
                if (!e.target.closest(".form-header") && !e.target.closest(".search-header__icon")) {
                    formHeader.classList.remove("active")
                    searchHeaderIcon.classList.remove("active")
                }
            })
        }

    } else {
        submenuItem[i].addEventListener("mouseenter", e => {
            submenuItem[i].classList.add("active")
        })

        submenuItem[i].addEventListener("mouseleave", e => {
            submenuItem[i].classList.remove("active")
        })
    }
}

searchHeaderIcon.addEventListener("click", e => {
    searchHeaderIcon.classList.toggle("active")
    formHeader.classList.toggle("active")
})

headerBurger.addEventListener("click", e => {
    headerBurger.classList.toggle("active")
    document.body.classList.toggle("lock")
    headerMenu.classList.toggle("active")
})


//Header

const headerElem = document.querySelector(".header")

const callback = function (entries, observer) {
    if (entries[0].isIntersecting) {
        headerElem.classList.remove("scroll")
    } else {
        headerElem.classList.add("scroll")
    }
}

const headerObserver = new IntersectionObserver(callback)
headerObserver.observe(headerElem)

//Product

const productButt = document.querySelector(".products__butt")

productButt.addEventListener("click", e => {
    const button = e.currentTarget
    getProduct(button);
    e.preventDefault()
})


async function getProduct(button) {
    if (!button.classList.contains("hold")) {
        button.classList.add("hold")
        let responce = await fetch("../JSON/product.json")
        if (responce.ok) {
            let objectText = await responce.text()
            let objectProducts = JSON.parse(objectText)
            button.classList.remove("hold")
            loadProduct(objectProducts);
            button.remove();
            ibg();
        } else {
            alert("Error")
        }
    }
}

function loadProduct(object) {
    const productItems = document.querySelector(".products__body")
    object.product.forEach(item => {
        let id = item.id
        let lables = item.lables
        let img = item.img
        let title = item.title
        let text = item.text
        let price = item.price
        let oldPrice = item.priceOld

        let productStart = `<div data-pid="${id}" class="products__item item-product">`
        let productEnd = `</div>`
        let productBody = `<div class="item-product__body">`
        let productBodyEnd = `</div>`
        let productLables = ""
        if (lables) {
            let productLablesStart = `<div class="item-product__lables">`
            let productLablesEnd = `</div>`
            let productLablesContent = ""
            lables.forEach(lable => {
                productLablesContent += `<div class="item-product__lable item-product__lable_${lable.type}">${lable.text}</div>`
            })
            productLables += productLablesStart
            productLables += productLablesContent
            productLables += productLablesEnd
        }

        let productImg = `<a href="#" class="item-product__img ibg"><img src="${img}" alt=""></a>`


        let productContentStart = `<div class="item-product__content">`
        let productContentEnd = `</div>`
        let productContentBody = ""
        let productContentTitle = `<div class="item-product__title">${title}</div>`
        let productContentText = `<div class="item-product__text">${text}</div>`
        let productContentPricesStart = `<div class="item-product__prices">`
        let productContentPricesEnd = `</div>`
        let productContentPrice = `<div class="item-product__price">${price}</div>`
        let productOldPrice = ""
        if (oldPrice) {
            productOldPrice = `<div class="item-product__price item-product__price_old">${oldPrice}</div>`
        }
        productContentBody += productContentTitle
        productContentBody += productContentText
        productContentBody += productContentPricesStart
        productContentBody += productContentPrice
        productContentBody += productOldPrice
        productContentBody += productContentPricesEnd
        let productContent = productContentStart
        productContent += productContentBody
        productContent += productContentEnd

        let productAction =
            `
             <div class="item-product__actions action-product">
                                    <div class="action-product__body">
                                        <a href="#" class="action-product__butt butt butt_w">Add to cart</a>
                                        <a href="#" class="action-product__link action-product__link_share">Share</a>
                                        <a href="#" class="action-product__link action-product__link_like">Like</a>
                                    </div>
                                </div>
        `

        let product = productStart
        product += productBody
        product += productLables
        product += productImg
        product += productContent
        product += productAction
        product += productBodyEnd
        product += productEnd

        productItems.insertAdjacentHTML(
            "beforeend",
            product
        )

    })
}

const furniture = document.querySelector(".furniture__body")

if (furniture && !isMobile.any()) {
    const item = document.querySelector(".furniture__items")
    const column = document.querySelectorAll(".furniture__column")

    const speed = item.dataset.speed

    let positionX = 0;
    let cordXProcent = 0;

    function setMouseParallaxStyle() {
        let widthContent = 0;
        for (let i = 0; i < column.length; i++) {
            widthContent += column[i].offsetWidth
        }
        let differentWidth = widthContent - furniture.offsetWidth

        let distX = Math.floor(cordXProcent - positionX)
        console.log(distX)
        positionX = positionX + (distX * speed)
        let position = differentWidth / 200 * positionX

        item.style.cssText = `transform: translate3d(${-position}px, 0, 0);`;

        if (Math.abs(distX) > 0) {
            requestAnimationFrame(setMouseParallaxStyle)
        } else {
            furniture.classList.remove("hide")
        }
    }

    furniture.addEventListener("mousemove", e => {
        const furnitureWidth = furniture.offsetWidth

        const cordX = e.pageX - furnitureWidth / 2

        cordXProcent = cordX / furnitureWidth * 200

        if (!furniture.classList.contains("hide")) {
            requestAnimationFrame(setMouseParallaxStyle)
            furniture.classList.add("hide")
        }
    })
}

document.documentElement.addEventListener("click", e => {
    if (e.target.classList.contains("action-product__butt")) {
        const addCartButt = e.target
        if (!addCartButt.classList.contains("hold")) {
            const button = addCartButt
            const product = button.closest("[data-pid]")
            flyToCart(product, button);
        }
        e.preventDefault();
    }
})

document.documentElement.addEventListener("click", e => {
    const items = document.querySelector(".list-cart").querySelectorAll("li")
    console.log(items.length)
    if (items.length == 1) {
        document.querySelector(".list-cart").classList.remove("active")
    }
    if (e.target.classList.contains("icon-cart__icon") || e.target.classList.contains("icon-cart span")) {
        if (items.length > 0) {
            document.querySelector(".list-cart").classList.toggle("active")
        }
    }
    if (e.target.classList.contains("list-cart__delete")) {
        const butt = e.target
        addToCart(butt, null, false);
        e.preventDefault();
    }
})


function flyToCart(product, butt) {

    butt.classList.add("hold")
    const productImg = product.querySelector(".item-product__img")
    const productImgWidth = productImg.offsetWidth
    const productImgHeight = productImg.offsetHeight
    const productImgTop = productImg.getBoundingClientRect().top
    const productImgleft = productImg.getBoundingClientRect().left
    const productImgFly = productImg.cloneNode(true)

    productImgFly.style.cssText = `width: ${productImgWidth}px; height: ${productImgHeight}px; top: ${productImgTop}px; left: ${productImgleft}px`
    productImgFly.setAttribute("class", "ibg flyImg")
    document.body.append(productImgFly)

    const cart = document.querySelector(".cart-header")
    cartLeft = cart.getBoundingClientRect().left
    cartTop = cart.getBoundingClientRect().top
    productImgFly.style.cssText = `
    width: 0px;
    height: 0px;
    top: ${cartTop}px;
    left: ${cartLeft}px;
    opacity: 0;
    `

    productImgFly.addEventListener("transitionend", function () {
        if (butt.classList.contains("hold")) {
            productImgFly.remove()
            addToCart(butt, product);
            butt.classList.remove("hold")
        }
    })
}

function addToCart(butt, product, productAdd = true) {
    const productSpan = document.querySelector(".icon-cart span")
    const iconCart = document.querySelector(".icon-cart")
    const listCart = document.querySelector(".list-cart")
    if (productAdd) {
        const productId = product.dataset.pid
        const productTitle = product.querySelector(".item-product__title").innerText
        const productImg = product.querySelector(".item-product__img img").getAttribute("src")
        const productCart = document.querySelector(`[data-cart-pid="${productId}"]`)
        if (!productSpan) {
            iconCart.insertAdjacentHTML("beforeend", `<span>1</span>`)
        } else {
            productSpan.innerHTML = Number(productSpan.innerHTML) + 1
        }
        if (productCart) {
            const productElemQuality = productCart.querySelector(".list-cart__quality span")
            productElemQuality.innerHTML = Number(productCart.querySelector(".list-cart__quality span").innerHTML) + 1
        } else {
            listCart.insertAdjacentHTML(
                "beforeend",
                `
                               <li>
                                    <div data-cart-pid="${productId}" class="list-cart__item">
                                        <div class="list-cart__row">
                                            <div class="list-cart__img"><img src="${productImg}" alt=""></div>
                                            <div class="list-cart__body">
                                                <div class="list-cart__title">${productTitle}</div>
                                                <div class="list-cart__quality">Quality:<span>1</span></div>
                                                <a href="#" class="list-cart__delete">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                `
            )
        }
    } else {
        const productButtDelete = butt.closest("[data-cart-pid]")
        const productButtDeleteQuality = productButtDelete.querySelector(".list-cart__quality span")
        let productSpanValue = Number(productSpan.innerHTML)
        productSpan.innerHTML = productSpanValue - 1
        if (productSpan.innerText < 1) {
            productSpan.remove()
        }
        if (productButtDeleteQuality.innerText == 1) {
            productButtDelete.parentElement.remove();
        } else {
            productButtDeleteQuality.innerText = productButtDeleteQuality.innerText - 1
        }
    }
    // if (listCart.querySelector("li")) {
    //     iconCart.addEventListener("click", e => {
    //         listCart.classList.toggle("active")
    //     })
    // }
}




