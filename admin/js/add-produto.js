const teorContainer = document.getElementById('teor')

const container = document.querySelector('.container-op')
const bebida = document.getElementById('bebida')
const pizza = document.getElementById('pizza')

import { uploadImage } from "./firebase.js"
import { preview } from "./preview.js"

const selectTipo = document.getElementById('dropdown-tipos')
let tipo = 0

const medio = document.querySelector('.input-medio')
const grande = document.querySelector('.input-grande')
const pequeno = document.querySelector('.input-pequeno')

const tamanho = []

const adicionarBebida = async(foto, teor, nome, ingredientes, tipo, desconto, tamanho) => {

    const url = `http://localhost:8080/v1/produtos/bebida`

    const produto = {
        imagem: foto,
        teor_alcoolico: teor, 
        nome: nome, 
        descricao: ingredientes,
        id_tipo_bebida: tipo,
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

const adicionarPizza = async (foto, nome, ingredientes, tipo, desconto, tamanho) => {
    const url = `http://localhost:8080/v1/produtos/pizza`

    const produto = {
        imagem: foto,
        nome: nome, 
        descricao: ingredientes,
        id_tipo_pizza: tipo, 
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

    if(formulario.reportValidity()){
        let result = false
        if (bebida.checked) {
            if (tipo == '') {
                tipo = 1
            }

            const teor = document.getElementById('teor').value
            result = await adicionarBebida(foto, teor, nome, ingredientes, tipo, desconto, tamanho)
        }
        else if (pizza.checked) {
            if (tipo == '') {
                tipo = 'Pizza doce'
            }
            result = await adicionarPizza(foto, nome, ingredientes, tipo, desconto, tamanho)
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


selectTipo.addEventListener('change', () => {
    tipo = selectTipo.options[selectTipo.selectedIndex].id
})

const imagePreview = () => {
    preview()

}

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

document.getElementById('foto').addEventListener('change', imagePreview)
