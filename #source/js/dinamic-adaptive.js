function DinamicAdaptive() {
    const element = document.querySelectorAll("[data-da]")

    for (let elem of element) {
        dataValue = elem.dataset.da
        let arr = dataValue.split(",")
        const toMoveClass = arr[0]
        const coordinate = arr[1]
        const media = arr[2]
        const toMove = document.querySelector(toMoveClass)
        const parentElement = elem.parentElement
        const positionParent = [...parentElement.children].indexOf(elem)

        if (matchMedia) {
            let screen = window.matchMedia(`(max-width:${media}px)`)
            screen.addListener(adaptive)
            adaptive(screen)
        }

        function adaptive(screen) {
            if (screen.matches) {
                if (!elem.classList.contains("done")) {
                    toMove.insertBefore(elem, toMove.children[Number(coordinate)])
                    elem.classList.add("done")
                }
            } else {
                if (elem.classList.contains("done")) {
                    parentElement.insertBefore(elem, parentElement.children[positionParent])
                    elem.classList.remove("done")
                }
            }
        }
    }
}

DinamicAdaptive();