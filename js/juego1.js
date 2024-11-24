window.addEventListener('load', function () {
    const canvas = document.getElementById('gameCanvas')
    const trashItems = document.querySelectorAll('.trash')

    trashItems.forEach(function (item) {
        const padding = 140
        const maxX = canvas.offsetWidth - item.offsetWidth - padding
        const maxY = canvas.offsetHeight - item.offsetHeight - padding

        const randomX = Math.floor(Math.random() * (maxX - padding)) + padding
        const randomY = Math.floor(Math.random() * (maxY - padding)) + padding

        item.style.left = randomX + 'px'
        item.style.top = randomY + 'px'
    })
})

function allowDrop(ev) {
    ev.preventDefault()
}

function drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id)
}

function drop(ev) {
    ev.preventDefault()
    const data = ev.dataTransfer.getData('text')
    const element = document.getElementById(data)
    const trashType = element.getAttribute('data-type')

    const targetBin = ev.target.closest('.bin')
    const binId = targetBin ? targetBin.id : ev.target.id

    const feedbackImage = document.getElementById('feedbackImage')

    const trashBinMap = {
        organic: 'organic',
        inorganic: 'inorganic',
        recyclable: 'recyclable',
        'non-recyclable': 'non-recyclable',
    }

    if (trashBinMap[trashType] === binId) {
        element.remove()
        feedbackImage.src = 'images/focaFeliz.png'
    } else {
        feedbackImage.src = 'images/focaTriste.jpg'
    }

    feedbackImage.style.display = 'block'

    setTimeout(function () {
        feedbackImage.style.display = 'none'
    }, 1000)
}

document.addEventListener('touchstart', handleTouchStart, false)
document.addEventListener('touchmove', handleTouchMove, false)
document.addEventListener('touchend', handleTouchEnd, false)

function handleTouchStart(ev) {
    if (ev.target.classList.contains('trash')) {
        ev.target.ontouchmove = handleTouchMove
        ev.target.ontouchend = handleTouchEnd
        drag(ev)
    }
}

function handleTouchMove(ev) {
    ev.preventDefault()
    const touch = ev.touches[0]
    const element = document.getElementById(ev.target.id)
    element.style.left = touch.pageX - element.offsetWidth / 2 + 'px'
    element.style.top = touch.pageY - element.offsetHeight / 2 + 'px'
}

function handleTouchEnd(ev) {
    ev.preventDefault()
    drop(ev)
    ev.target.ontouchmove = null
    ev.target.ontouchend = null
}
