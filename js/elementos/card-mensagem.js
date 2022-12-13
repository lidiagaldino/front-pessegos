class CardMensagem extends HTMLElement{

    constructor(){
        super()
        this.shadow = this.attachShadow({mode: 'open'})
    }

    static get observedAttributes() {
        return ['nome', 'email', 'mensagem', 'code']
    }

    attributeChangedCallback(nameAttr, oldValue, newValue) {
        this[nameAttr] = newValue
    }

    connectedCallback() {
        this.shadow.appendChild(this.component())
        this.shadow.appendChild(this.styles())
    }

    component(){
        const card = document.createElement('div')
        card.classList.add('card')

        card.innerHTML = `
            <span class="nome">${this.nome}</span>
            <span class="email">${this.email}</span>
            <span class="message">${this.mensagem}</span>
        `

        return card
    }

    styles() {
        const style = document.createElement('style')

        style.textContent = `
            .card{
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 10px;
                height: 200px;
                width: 400px;
                border: 3px solid rgba(94, 30, 124, 0.5);
                border-radius: 45px;
                gap: 20px;
            }
            .nome, .email{
                text-align: center;
                width: 90%;
                border-bottom: 2px solid rgba(0, 0, 0, 0.5);
            }

            @media only screen and (max-device-width: 700px){
                .card{
                    height: 200px;
                    width: 300px
                }
            }
        `

        return style
    }

}

customElements.define('card-mensagem', CardMensagem)