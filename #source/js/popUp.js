function getElemPopUp() {
    const popUpElem = document.querySelector(".pop-up")
    const links = popUpElem.querySelectorAll("a")
    const popUpClose = document.querySelector(".popUp__close")
    const popUp = document.querySelector(".popUp")
    const arrowLeft = document.querySelector(".popUp__arrow_prev")
    const arrowRight = document.querySelector(".popUp__arrow_next")
    const popUpImg = document.querySelector(".popUp__img")
// const links = Array.from(linksPop)
    popUpClose.addEventListener("click", e => {
        document.querySelector(".popUp").classList.remove("active")
    })

    let index = 0

    links.forEach((link, i) => {
        link.addEventListener("click", e => {
            const href = link.getAttribute("href")
            getElemPop(i);
            e.preventDefault()
        })
    })

    function getElemPop(i) {
        popUpImg.querySelector("img").src = `img/furniture/0${i + 1}.jpg`
        popUp.classList.add("active")
        console.log(i)
        index = i
    }

    arrowLeft.addEventListener("click", e => {
        if (index > 0) {
            getElemPop(index - 1)
        } else {
            return false
        }
    })

    arrowRight.addEventListener("click", e => {
        if (index < links.length - 1) {
            getElemPop(index + 1)
        }else {
            return false
        }
    })

}
getElemPopUp();