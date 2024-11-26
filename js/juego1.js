const elementosBasura = [
    { id: 1, tipo: 'reciclable', nombre: 'Botella de plástico' },
    { id: 2, tipo: 'organico', nombre: 'man' },
    { id: 3, tipo: 'general', nombre: 'Envoltura de caramelo' },
    { id: 4, tipo: 'reciclable', nombre: 'Lata de refresco' },
    { id: 5, tipo: 'organico', nombre: 'Cáscara de plátano' },
    { id: 6, tipo: 'general', nombre: 'Papel de regalo' },
    { id: 7, tipo: 'reciclable', nombre: 'Botella de vidrio' },
    { id: 8, tipo: 'organico', nombre: 'Restos de comida' },
    { id: 9, tipo: 'general', nombre: 'Envase de yogur' },
]

function mezclar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
}

function iniciarJuego() {
    const contenedorBasura = document.getElementById('elementos-basura')
    contenedorBasura.innerHTML = ''
    mezclar(elementosBasura)
    elementosBasura.forEach(item => {
        const div = document.createElement('div')
        div.className = 'elemento-basura'
        div.draggable = true
        div.dataset.tipo = item.tipo
        div.ondragstart = iniciarArrastre
        contenedorBasura.appendChild(div)
        const img = document.createElement('img')
        img.src = `../images/${item.nombre}.png`
        img.alt = item.tipo
        img.style = 'pointer-events: none;'
        div.appendChild(img)
    })
}

function iniciarArrastre(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.tipo)
}

function permitirSoltar(event) {
    event.preventDefault()
}

function soltar(event) {
    event.preventDefault()
    const tipo = event.dataTransfer.getData('text/plain')
    if (event.target.dataset.tipo === tipo) {
        const draggedElement = document.querySelector(`.elemento-basura[data-tipo="${tipo}"][draggable="true"]`)
        event.target.appendChild(draggedElement)
        draggedElement.classList.add('oculto')
        verificarVictoria()
    }
}
function verificarVictoria() {
    const contenedores = document.querySelectorAll('.contenedor')
    let todoClasificado = true
    contenedores.forEach(contenedor => {
        Array.from(contenedor.children).forEach(child => {
            if (child.dataset.tipo !== contenedor.dataset.tipo) {
                todoClasificado = false
            }
        })
    })
    if (todoClasificado) {
        const pantallaVictoria = document.getElementById('pantalla-victoria')
        pantallaVictoria.style.display = 'flex'
        setTimeout(() => {
            pantallaVictoria.style.display = 'none'
        }, 1500)
    }
}

function reiniciarJuego() {
    document.getElementById('pantalla-victoria').style.display = 'none'
    document.getElementById('contenedor-juego').style.display = 'block'
    iniciarJuego()
}

document.querySelectorAll('.contenedor').forEach(contenedor => {
    contenedor.ondragover = permitirSoltar
    contenedor.ondrop = soltar
})

iniciarJuego()
