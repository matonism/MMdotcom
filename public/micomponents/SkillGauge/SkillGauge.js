import MiCoolComponent from "../../micomponent-framework/MiCoolComponent.js";

class SkillGauge extends MiCoolComponent {

    static get observedAttributes(){
        return ['label', 'level'];
    }

    renderedCallback(){
        if(!!this.getAttribute('image')){
            let skillImage = this.shadowRoot.querySelector('.skill-image');
            skillImage.style.backgroundImage = this.getAttribute('image');
        }
        
        this.setSkillLevel(this.getAttribute('color'));
    }

    setSkillLevel(color){
        let level = this.getAttribute('level');
        let bars = this.shadowRoot.querySelectorAll('.skill-bar');
        for(let i = 0; i < 5; i++){
            if(i >= level){
                bars[i].style.opacity = 0;
            }else{
                if(!!color){
                    bars[i].style.backgroundColor = color;
                }
            }
        }
    }

}

export default SkillGauge;