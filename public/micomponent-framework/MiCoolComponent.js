import WebComponentLoader from './WebComponentLoader/WebComponentLoader.js';

class MiCoolComponent extends HTMLElement {

	//******************* BEGIN SETUP ******************
	static get observedAttributes(){
		return [];
	}
	
	constructor() {
		super();
	}

	//If you are going to override this method in a child class, you must call the following from you child class
	//super.connectedCallback();
	connectedCallback() {
		let fileName = this.getComponentFileName();
		var shadowRoot = this.attachShadow({mode: 'open'});
		var wc = new WebComponentLoader(this, fileName + '/' + fileName);
		console.log('connected ' + fileName);

	}

	//If you override this method in a child class and want merge field functionality, call the following class
	//super.attributeChangedCallback(name, oldValue, newValue);
	attributeChangedCallback(name, oldValue, newValue){
		if(!!this.constructor.observedAttributes && !!this.baseMarkup){
			this.setMergeFieldOnAllNodes(this.baseMarkup.childNodes, this.shadowRoot.childNodes, name, newValue);
			
			//TODO: Figure out a better solution to identify when all linked css files have had their style's applied
			window.setTimeout(() => {
				this.rerenderedCallback(name, oldValue, newValue);
        	}, 10);
		}
	}

	renderedCallback(){

	}

	rerenderedCallback(name, oldValue, newValue){

	}

	/************** Private methods ******************/

	setMergeFieldOnAllNodes(baseNodeTree, trueNodeTree, mergeField, newValue){
		let mergeFieldSyntax = '{!' + mergeField + '}';

		baseNodeTree.forEach((baseNode, index) => {

			let trueNode = trueNodeTree[index];
			
			let regex = new RegExp(mergeFieldSyntax, "g");
			let attributeValue = (!!newValue) ? newValue : '';

			if(baseNode.nodeName == '#text'){
				if(baseNode.nodeValue.includes(mergeFieldSyntax)){
					trueNode.nodeValue = baseNode.nodeValue.replace(regex, attributeValue);
				}
			}else{
				for(let i = 0; i < baseNode.attributes.length; i++){
					let attribute = baseNode.attributes[i];
					if(attribute.value.includes(mergeFieldSyntax)){
						trueNode.attributes[i].value = attribute.value.replace(regex, attributeValue);
					}
				}
			}
			if(!!baseNode.childNodes && baseNode.childNodes.length > 0){
				this.setMergeFieldOnAllNodes(baseNode.childNodes, trueNode.childNodes, mergeField, newValue);
			}

		});
	}

	createElementsFromHTML(htmlString) {
		var markup = new DOMParser().parseFromString(htmlString, "text/html");
		return markup.querySelector('template');
	}

	getComponentFileName(){
		let tagName = this.localName;
		let fileName = '';
		for(let i = 0; i < tagName.length; i++){
			let character = tagName[i];
			if(i == 0){
				fileName += character.toUpperCase();
			}else if(tagName[i - 1] == '-'){
				fileName += tagName[i].toUpperCase();
			}else{
				fileName += tagName[i].toLowerCase();
			}
		};

		return fileName.replace(/-/gi, '');
	}
}

export default MiCoolComponent;