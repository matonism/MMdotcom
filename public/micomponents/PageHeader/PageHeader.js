import MiCoolComponent from '../../micomponent-framework/MiCoolComponent.js'

class PageHeader extends MiCoolComponent {

    renderedCallback(){

        let contactLink = this.shadowRoot.querySelector('.contact-link-item');
        this.addNavigationClick(contactLink, '/pages/contact');

    }

    addNavigationClick(element, url){
        element.addEventListener('click', () => {
            location.hash = '';
            window.location = url;
        });
    }
}

export default PageHeader;