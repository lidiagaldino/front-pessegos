const nome = document.getElementById('nome')
const ingredientes = document.getElementById('ingredientes')
const preco = document.getElementById('preco')
const desconto = document.getElementById('desconto')
const foto = document.getElementById('file')

const medio = document.querySelector('.input-medio')
const grande = document.querySelector('.input-grande')
const pequeno = document.querySelector('.input-pequeno')

import { uploadImage } from "./firebase.js"
import { preview } from "./preview.js"

const tamanho = []

const updateProduto = async (id, produto) => {

    let url = ''

    if (localStorage.getItem('tipo') == 'bebida') {
        url = `http://localhost:8080/v1/produtos/bebida/${id}`
    } else{
        url = `http://localhost:8080/v1/produtos/pizza/${id}`
    }

    const options = {
        method: 'PUT',
        body: JSON.stringify(produto),
        headers: {
            'content-type': 'application/json'
        }
    }

    const response = await fetch (url, options)

    if (response) {
        return true
    } else{
        return false
    }
}

const createProduto = async () => {

    const formulario = document.getElementById('form')
    const nome = document.getElementById('nome').value
    const ingredientes = document.getElementById('ingredientes').value
    const desconto = document.getElementById('desconto').value
    const foto = await saveImage()

    if (medioCheck.checked) {
        tamanho.push({id: medioCheck.id, preco: medio.value.replace(',', '.')})
    }

    if (grandeCheck.checked) {
        tamanho.push({id: grandeCheck.id, preco: grande.value})
    }

    if (pequenoCheck.checked) {
        tamanho.push({id: pequenoCheck.id, preco: pequeno.value})
    }
}

const getProdutoById = async (id) => {

    let url = ''

    if (localStorage.getItem('tipo') == 'bebida') {
        url = `http://localhost:8080/v1/produtos/bebida/${id}`
    } else{
        url = `http://localhost:8080/v1/produtos/pizza/${id}`
    }

    const response = await fetch(url)

    const produto = response.json()

    return produto
}

const produto = await getProdutoById(localStorage.getItem('id_produto'));

nome.value = produto[0].nome
ingredientes.value = produto[0].descricao
desconto.value = produto[0].desconto
console.log(produto)
foto.style.background = `url(${produto[0].imagem}) center no-repeat`
foto.style.backgroundSize = 'cover'

const getTipos = async (tipo) => {

    const url = `http://localhost:8080/v1/tipo/${tipo}`

    const response = await fetch(url)

    const tipos = await response.json()

    return tipos
}

const getTamanhos = async () => {

    const url = `http://localhost:8080/v1/produtos/tamanho`

    const response = await fetch(url)

    const tamanhos = await response.json()

    return tamanhos
}

const createTipos = (data) => {

    const op = document.createElement('option')
    op.textContent = data.tipo
    op.id = data.id
    op.value = data.tipo

    return op
}

const loadTipos = async () => {

    const container = document.getElementById('dropdown-tipos')

    const data = await getTipos(localStorage.getItem('tipo'))

    const cards = data.message.map(createTipos)

    container.replaceChildren(...cards)

}

const createTamanhos = (data) => {

    const op = document.createElement('input')
    const label = document.createElement('label')
    label.textContent = data.nome
    
    label.classList.add('label-op')
    label.classList.add(data.nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase())
    op.classList.add(data.nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase())
    op.classList.add('label-op')
    op.classList.add(`${data.nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()}-op`)

    op.type = "checkbox"

    op.id = data.id
    op.value = data.nome

    label.appendChild(op)
    return label
}

const loadTamanhos = async () => {

    const container = document.getElementById('check')

    const data = await getTamanhos()

    const cards = data.message.map(createTamanhos)

    container.replaceChildren(...cards)

}



loadTamanhos()
loadTipos()

let medioCheck = ''
let grandeCheck = ''
let pequenoCheck = ''

document.getElementById('check').addEventListener('click', (event) => {
    console.log(event.target)
    if (event.target.classList.contains('label-op')) {

        medioCheck = document.querySelector('.medio-op')
        grandeCheck = document.querySelector('.grande-op')
        pequenoCheck = document.querySelector('.pequeno-op')
        console.log(medioCheck)

        if (medioCheck.checked) {
            medio.classList.remove('hide-input')
            medio.classList.add('show-input')
        } else{
            medio.classList.add('hide-input')
            medio.classList.remove('show-input')
            medio.value = null
        }

        if (grandeCheck.checked) {
            grande.classList.remove('hide-input')
            grande.classList.add('show-input')
        } else{
            grande.classList.add('hide-input')
            grande.classList.remove('show-input')
            grande.value = null
        }

        if (pequenoCheck.checked) {
            pequeno.classList.remove('hide-input')
            pequeno.classList.add('show-input')
        } else{
            pequeno.classList.add('hide-input')
            pequeno.classList.remove('show-input')
            pequeno.value = null
        }
       
    }
})

const saveImage = async () => {
    const image = document.getElementById('foto').files[0]
    
    const name = document.getElementById('nome').value
    const namePhoto = name.replace(' ', '-').toLowerCase()

    const urlImage = await uploadImage(image, namePhoto)

    console.log(urlImage);
    return urlImage
}


document.getElementById('foto').addEventListener('change', imagePreview)