import MiCoolComponent from '../../micomponent-framework/MiCoolComponent.js';

class HoverBox extends MiCoolComponent {

    static get observedAttributes(){
        return ['label'];
    }

    renderedCallback(){
        let box = this.shadowRoot.querySelector('.box');
        box.style.backgroundImage = 'url(' + this.getAttribute('image') + ')';

        if(!!this.getAttribute('height')){
            box.style.height = this.getAttribute('height');
        }

        if(!!this.getAttribute('width')){
            box.style.width = this.getAttribute('width');
        }

        box.addEventListener('click', (event) => {

            let boxClicked = new CustomEvent('boxclick', {
                composed: true,
                cancelable: true,
                bubbles: true,
                detail: {id: this.id}
            });

            this.dispatchEvent(boxClicked);
        });

    }
    
}

export default HoverBox;