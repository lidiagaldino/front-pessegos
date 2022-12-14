const nome = document.getElementById('nome')
const ingredientes = document.getElementById('ingredientes')
const preco = document.getElementById('preco')
const desconto = document.getElementById('desconto')
const foto = document.getElementById('file')

const medio = document.querySelector('.input-medio')
const grande = document.querySelector('.input-grande')
const pequeno = document.querySelector('.input-pequeno')

const selectTipo = document.getElementById('dropdown-tipos')

let medioCheck = ''
let grandeCheck = ''
let pequenoCheck = ''

const tamanhosExistentes = []

let tipo = 0

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

    console.log(response);

    if (response.ok) {
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
    const foto = produto[0].imagem

    if(troca){
        foto = await saveImage()
    } 
    
    if (medioCheck.classList.contains('show-input')) {
        tamanho.push({id_tamanho: 3, preco: medio.value.replace(',', '.'), desconto: desconto})
    }

    if (grandeCheck.classList.contains('show-input')) {
        tamanho.push({id_tamanho: 1, preco: grande.value.replace(',', '.'), desconto: desconto})
    }

    if (pequenoCheck.classList.contains('show-input')) {
        tamanho.push({id_tamanho: 2, preco: pequeno.value.replace(',', '.'), desconto: desconto})
    }

    if(formulario.reportValidity()){
        let result = false

        if (tipo == 0) {
            tipo = 1
        }

        const produto = {
            imagem: foto,
            nome: nome,
            descricao: ingredientes,
            id_produto: localStorage.getItem('id_produto').split('-')[1],
            preco: tamanho
        }

        if (localStorage.getItem('tipo') == 'bebida') {
            produto.id_tipo_bebida = tipo
            const teor = document.getElementById('teor').value
            produto.teor_alcoolico = teor
            result = await updateProduto(localStorage.getItem('id_produto').split('-')[0], produto)
        } else{
            produto.id_tipo_pizza = tipo
            console.log(produto);
            result = await updateProduto(localStorage.getItem('id_produto').split('-')[0], produto)
        }
        
        

        if (result) {
            alert('Produto criado com sucesso')
            open('./dash.html', '_self')
        }else{
            alert('Não foi possível criar')
        }
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

const produto = await getProdutoById(localStorage.getItem('id_produto').split('-')[0]);
console.log(produto);

nome.value = produto[0].nome
ingredientes.value = produto[0].descricao
desconto.value = produto[0].desconto
foto.style.background = `url(${produto[0].imagem}) center no-repeat`
foto.style.backgroundSize = 'cover'

const loadInputs = () => {

    medioCheck = document.querySelector('.input-medio')
    grandeCheck = document.querySelector('.input-grande')
    pequenoCheck = document.querySelector('.input-pequeno')

    produto.forEach(item => {
        console.log(item.tamanho);
        if (item.tamanho == 'Grande') {
            grande.classList.remove('hide-input')
            grande.classList.add('show-input')
            grande.value = item.preco
        }
        if (item.tamanho == 'Médio') {
            medio.classList.remove('hide-input')
            medio.classList.add('show-input')
            medio.value = item.preco
        }
        if (item.tamanho == 'Pequeno') {
            pequeno.classList.remove('hide-input')
            pequeno.classList.add('show-input')
            pequeno.value = item.preco
        }
    })
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

    const data = await getTipos(localStorage.getItem('tipo'))

    const cards = data.message.map(createTipos)

    container.replaceChildren(...cards)

}

const createTamanhos = (data) => {

    const op = document.createElement('span')
    const label = document.createElement('span')
    label.textContent = 'Excluir'
    label.style.color = 'red'
    label.style.cursor = 'pointer'

    label.classList.add('label-op')
    label.classList.add(data.tamanho.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase())

    
    op.classList.add(`${data.tamanho.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()}-op`)

    op.textContent = data.tamanho
    op.style.color = 'black'
    op.style.cursor = 'default'

    label.id = data.id_tamanho

    tamanhosExistentes.push(data.tamanho)
    
    label.appendChild(op)

    if (produto.length != 1) {
        return label
    } else{
        return op
    }
    
}

const loadTamanhosProduto = async () => {

    const add = document.getElementById('adicionar-tamanho')
    const container = document.getElementById('check')

    const cards = produto.map(createTamanhos)

    container.replaceChildren(...cards)
    
    const tamanhos = await getTamanhos()
    
    if(produto.length == tamanhos.message.length){
        add.style.display = 'none'
    }
}

const createTamanhosList = (data) => {

    const op = document.createElement('option')

    op.textContent = data.nome
    op.id = data.id

    return op
}

const tamanhosFaltantesList = async () => {

    const faltantes = []

    const tamanhos = await getTamanhos()

    tamanhos.message.forEach(element => {
        let existente = false
        tamanhosExistentes.forEach(item => {
            if (element.nome == item) {
                existente = true
            }
        })

        if (!existente) {
            faltantes.push(element)
        }
    });

    const container = document.getElementById('tamanho')

    const cards = faltantes.map(createTamanhosList)

    container.replaceChildren(...cards)

    return faltantes
}



loadTamanhosProduto()
loadTipos()
tamanhosFaltantesList()

const saveImage = async () => {
    const image = document.getElementById('foto').files[0]
    
    const name = document.getElementById('nome').value
    const namePhoto = name.replace(' ', '-').toLowerCase()

    const urlImage = await uploadImage(image, namePhoto)

    return urlImage
}

const troca = false

const imagePreview = () => {
    troca = true
    preview()
}

const deleteProdutoTamanho = async (idProduto, idTamanho) => {

    const url = `http://localhost:8080/v1/produto/tamanho/${idProduto}/${idTamanho}`

    const response = await fetch(url, {method: 'delete'})
    const result = await response.json()

    return result
}

document.getElementById('container-tamanho').addEventListener('click', async (event) => {

    if (event.target.classList.contains('label-op')) {
        const resultado = confirm('Deseja realmente deletar este tamanho?')

        if (resultado) {
            await deleteProdutoTamanho(localStorage.getItem('id_produto').split('-')[1], event.target.id)
            document.location.reload()
        }
    }
})

const dialog = document.getElementById('dialog')
dialog.style.display ='none'

const select = document.getElementById('tamanho')

const addTamanho = async (preco, id_tamanho) => {

    const url = `https://subtle-mochi-7b34b0.netlify.app/.netlify/functions/api/v1/produto/tamanho/${localStorage.getItem('id_produto').split('-')[1]}`

    const tamanho = {
        preco: preco,
        id_tamanho: id_tamanho,
        desconto: produto[0].desconto
    }

    console.log(tamanho);
    const options = {
        method: 'POST',
        body: JSON.stringify(tamanho),
        headers: {
            'content-type': 'application/json'
        }
        
    }

    const result = await fetch(url, options)
    console.log(result);

    if (result.ok) {
        return true
    } else{
        return false
    }
}

document.getElementById('adicionar-tamanho').addEventListener('click', () => {
    dialog.style.display ='flex'
    dialog.showModal()
})
document.getElementById('cancel').addEventListener('click', () => {
    dialog.style.display ='none'
    dialog.close()
})
document.getElementById('send').addEventListener('click', async () => {
    const valor = select.options[select.selectedIndex].id

    const preco = document.getElementById('precoNovo').value

    const result = await addTamanho(preco, valor)
    
    if (result) {
        dialog.style.display ='none'
        dialog.close()
        document.location.reload()
    }

    
})

document.getElementById('enviar').addEventListener('click', createProduto)

document.getElementById('foto').addEventListener('change', imagePreview)

selectTipo.addEventListener('change', () => {
    tipo = selectTipo.options[selectTipo.selectedIndex].id
})

const desativarProduto = async (id) => {

    const url = `https://subtle-mochi-7b34b0.netlify.app/.netlify/functions/api/v1/produtos/${id}`

    const response = await fetch(url, {method: 'PUT'})
    const result = await response.json()

    return result
}

document.getElementById('desativar').addEventListener('click', async () => {
    const resultado = confirm('Deseja realmente desativar/reativar esse produto?')

    if (resultado) {
        const result = await desativarProduto(localStorage.getItem('id_produto').split('-')[1])

        if (result) {
            alert('Produto atualizado com sucesso')
            open('./listar_produtos.html')
        }else{
            alert('Falha ao tentar atualizar')
        }
    }
})

loadInputs()