import MiComponent from "../../micomponent-framework/MiCoolComponent.js";

class Popup extends MiComponent {

    constructor(){
        super();
    }

    connectedCallback(){
        super.connectedCallback();
    }

    renderedCallback(){
        let closeButton = this.shadowRoot.querySelector('.close-button');
        closeButton.addEventListener('click', (event) => {
            this.closePopup();
        });
    }

    
    showPopup(){
        let popup = this.shadowRoot.querySelector('.popup');
        let backdrop = this.shadowRoot.querySelector('.backdrop');
        // popup.classList.remove('hide');
        backdrop.classList.remove('hide');
    }
    closePopup(){
        let popup = this.shadowRoot.querySelector('.popup');
        let backdrop = this.shadowRoot.querySelector('.backdrop');
        // popup.classList.add('hide');
        backdrop.classList.add('hide');
    }

}

export default Popup;