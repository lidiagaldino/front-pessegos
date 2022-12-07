const teorContainer = document.getElementById('teor')

const container = document.querySelector('.container-op')
const bebida = document.getElementById('bebida')
const pizza = document.getElementById('pizza')

import { uploadImage } from "./firebase.js"
import { preview } from "./preview.js"

const selectTipo = document.getElementById('dropdown-tipos')
const selectTamanho = document.getElementById('dropdown-tamanhos')
let tipo = 0
let tamanho = 0

const adicionarBebida = async(foto, teor, nome, ingredientes, tipo, preco, desconto, tamanho) => {

    const url = `http://localhost:8080/v1/produtos/bebida`

    const produto = {
        imagem: foto,
        teor_alcoolico: teor, 
        nome: nome, 
        descricao: ingredientes,
        id_tipo_bebida: tipo,
        preco: preco, 
        desconto: desconto, 
        id_tamanho: tamanho
    }

    const options = {
        method: 'POST',
        body: JSON.stringify(produto),
        headers: {
            'content-type': 'application/json'
        }
    }

    const result = await fetch(url, options)
    console.log(result);

    if (result) {
        return true
    } else{
        return false
    }

} 

const adicionarPizza = async (foto, nome, ingredientes, tipo, preco, desconto, tamanho) => {
    const url = `http://localhost:8080/v1/produtos/pizza`

    const produto = {
        imagem: foto,
        nome: nome, 
        descricao: ingredientes,
        id_tipo_pizza: tipo,
        preco: preco, 
        desconto: desconto, 
        id_tamanho: tamanho
    }

    const options = {
        method: 'POST',
        body: JSON.stringify(produto),
        headers: {
            'content-type': 'application/json'
        }
    }

    const result = await fetch(url, options)

    if (result) {
        return true
    } else{
        return false
    }
}

const criarProduto = async () => {

    const formulario = document.getElementById('form')
    const nome = document.getElementById('nome').value
    const ingredientes = document.getElementById('ingredientes').value
    const preco = document.getElementById('preco').value
    const desconto = document.getElementById('desconto').value
    const foto = await saveImage()

    if (tamanho == '') {
        tamanho = 1
    }

    if(formulario.reportValidity()){
        let result = false
        if (bebida.checked) {
            if (tipo == '') {
                tipo = 1
            }

            
            const teor = document.getElementById('teor').value
            result = await adicionarBebida(foto, teor, nome, ingredientes, tipo, preco, desconto, tamanho)
        }
        else if (pizza.checked) {
            if (tipo == '') {
                tipo = 'Pizza doce'
            }
            result = await adicionarPizza(foto, nome, ingredientes, tipo, preco, desconto, tamanho)
        }
        else{
            alert('Escolha se é pizza ou bebida')
            return false
        }


        if (result) {
            alert('Produto criado com sucesso')
            open('./dash.html', '_self')
        }else{
            alert('Não foi possível criar')
        }
    }


}

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
    let tipo = ''

    if (bebida.checked) {
        tipo = 'bebida'
    } else{
        tipo = 'pizza'
    }

    const data = await getTipos(tipo)

    const cards = data.message.map(createTipos)

    container.replaceChildren(...cards)

}

const createTamanhos = (data) => {

    const op = document.createElement('option')

    op.textContent = data.nome
    op.id = data.id
    op.value = data.nome

    return op
}

const loadTamanhos = async () => {

    const container = document.getElementById('dropdown-tamanhos')

    const data = await getTamanhos()

    const cards = data.message.map(createTamanhos)

    container.replaceChildren(...cards)

}

const saveImage = async () => {
    const image = document.getElementById('foto').files[0]
    
    const name = document.getElementById('nome').value
    const namePhoto = name.replace(' ', '-').toLowerCase()

    const urlImage = await uploadImage(image, namePhoto)

    console.log(urlImage);
    return urlImage
}

document.getElementById('enviar').addEventListener('click', criarProduto)
loadTamanhos()
loadTipos()

container.addEventListener('change', () => {
    if(bebida.checked){
        teorContainer.classList.remove('hide-input')
        teorContainer.classList.add('show-input')
    }
    if (pizza.checked) {
        teorContainer.classList.add('hide-input')
        teorContainer.classList.remove('show-input')
    }

    loadTipos()
})

selectTamanho.addEventListener('change', () => {
    tamanho = selectTamanho.options[selectTamanho.selectedIndex].id
})

selectTipo.addEventListener('change', () => {
    tipo = selectTipo.options[selectTipo.selectedIndex].id
})

const imagePreview = () => {
    preview()
}

document.getElementById('foto').addEventListener('change', imagePreview)
