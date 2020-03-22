import MiCoolComponent from '../../micomponent-framework/MiCoolComponent.js';

class HoverBox extends MiCoolComponent {

    static get observedAttributes(){
        return ['label'];
    }

    renderedCallback(){
        let box = this.shadowRoot.querySelector('.box');
        let hoverText = this.shadowRoot.querySelector('.hover-text');
        box.style.backgroundImage = 'url(' + this.getAttribute('image') + ')';


        if(!!this.getAttribute('size')){
            box.style.height = this.getAttribute('size');
            box.style.width = this.getAttribute('size');
            hoverText.style.top = 'calc(' + this.getAttribute('size') + '/2 - ' + this.getAttribute('size') + '/4/2)';
            //hoverText.style.fontSize = 'calc(' + this.getAttribute('size') + '/4)';
        }
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