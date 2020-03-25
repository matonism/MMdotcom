import MiCoolComponent from '../../micomponent-framework/MiCoolComponent.js'

class PageFooter extends MiCoolComponent {

    renderedCallback(){
        let contactButton = this.shadowRoot.querySelector('.contact-here-button');
        contactButton.addEventListener('click', () => {
            window.location.pathname = '/pages/contact';
        })
    }
}

export default PageFooter;