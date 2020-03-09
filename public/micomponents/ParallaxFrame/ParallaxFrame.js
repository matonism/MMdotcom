import MiCoolComponent from "../../micomponent-framework/MiCoolComponent.js";

class ParallaxFrame extends MiCoolComponent {

    static get observedAttributes(){
        return ['height', 'background-image'];
    }
    
    constructor(){
        super();
    }

    connectedCallback(){
        super.connectedCallback();
    }

    renderedCallback(){
        let parallax = this.shadowRoot.querySelector('.parallax');
        parallax.style.backgroundImage = 'url(' + this.getAttribute('background-image') + ')';
        parallax.style.height = this.getAttribute('height');


    }
        
}

export default ParallaxFrame;