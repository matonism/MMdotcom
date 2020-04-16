//TODO: Implement real links or figure out why anchor tags arent working
//Home
//Github
//Linkedin
//Resume

import MiCoolComponent from '../../micomponent-framework/MiCoolComponent.js'

class PageHeader extends MiCoolComponent {

    renderedCallback(){

        let contactLink = this.shadowRoot.querySelector('.contact-link-item');
        this.addNavigationClick(contactLink, '/pages/contact');

        let homeBox = this.shadowRoot.querySelector('#home');
        this.addNavigationClick(homeBox, '/pages/home');

        let skillBox = this.shadowRoot.querySelector('#skills');
        this.addNavigationClick(skillBox, '/pages/home#skill-section');

        let projectsBox = this.shadowRoot.querySelector('#projects');
        this.addNavigationClick(projectsBox, '/pages/home#project-section');
        
        let contactBox = this.shadowRoot.querySelector('#contact');
        this.addNavigationClick(contactBox, '/pages/contact');

    }

    addNavigationClick(element, url){
        element.addEventListener('click', () => {
            location.hash = '';
            window.location = url;
        });
    }
}

export default PageHeader;