import MiCoolComponent from '../../micomponent-framework/MiCoolComponent.js'

class PageHeader extends MiCoolComponent {

    renderedCallback(){

        let homeBox = this.shadowRoot.querySelector('#home');
        homeBox.addEventListener('click', () => {
            window.location = '/pages/home';
        })

        let skillBox = this.shadowRoot.querySelector('#skills');
        skillBox.addEventListener('click', () => {
            location.hash = '';
            window.location.pathname = '/pages/home#skill-section';
        })

        let projectsBox = this.shadowRoot.querySelector('#projects');
        projectsBox.addEventListener('click', () => {
            location.hash = '';
            window.location.pathname = '/pages/home#project-section';
        })
        
        
        let contactBox = this.shadowRoot.querySelector('#contact');
        contactBox.addEventListener('click', () => {
            location.hash = '';
            window.location = '/pages/contact';
        });

    }
}

export default PageHeader;