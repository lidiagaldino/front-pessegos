const getUsers = async () => {

    const url = `https://subtle-mochi-7b34b0.netlify.app/.netlify/functions/api/v1/usuario`

    const response = await fetch(url)

    const users = response.json()

    return users
}

const container = document.getElementById('container')

const createUsers = (data) => {

    const card = document.createElement('div')
    card.classList.add('card-user')
    const a = document.createElement('a')
    a.href = './editar_user.html'
    a.classList.add('link')

    const img = document.createElement('img')
    img.classList.add('icon-image')
    img.src = '../img/icon-user.png'

    const name = document.createElement('span')
    name.textContent = data.login

    a.id = data.id
    card.appendChild(a)
    card.appendChild(img)
    card.appendChild(name)

    return card
}

const loadUsers = async () => {

    const data = await getUsers()

    const cards = data.message.map(createUsers)

    container.replaceChildren(...cards)
}

loadUsers()

container.addEventListener('click', (event) => {
    if(event.target.classList.value == 'link'){
        localStorage.setItem('id', event.target.id)
    }
})