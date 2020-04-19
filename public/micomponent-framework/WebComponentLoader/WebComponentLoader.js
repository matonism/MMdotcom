import ComponentMarkupMap from './ComponentMarkupMap.js';

function WebComponentLoader(component, directoryName, loadComponentsAtInit){

	this.baseMarkup;
	this.nodeMap;
	this.component = component;
	this.directoryName = directoryName;
	if(!component.rootNode){
		component.rootNode = component.shadowRoot;
	}


	this.loadWebComponentResources = (component, directoryName) => {
		this.importCSSFile(directoryName);

		this.importHTMLTemplate(directoryName).then((markupText) => {
			if(this.component.renderedCallback != null){
				this.component.renderedCallback();
			}
		});
	};

	this.importCSSFile = function(directoryName){
		
		var cssFile = document.createElement("link");
		cssFile.href = "/micomponents/" + directoryName + ".css";
		cssFile.rel = "stylesheet";
		this.component.rootNode.appendChild(cssFile);
	}

	this.importHTMLTemplate = function(directoryName){

		if(ComponentMarkupMap.hasResource(directoryName + '-html')){
			//leverage template that will already be loaded from the first call for each component
			return new Promise((resolve, reject) => {
				let iteration = 0;
				let interval = setInterval(() => {
					
					let resourceEntry = ComponentMarkupMap.getResource(directoryName + '-html');

					if(iteration++ == 100){
						clearInterval(interval);
						console.log('The interval ran too many times. Something went wrong loading micomponents');
						reject('The interval ran too many times. Something went wrong loading micomponents');
					}

					if(resourceEntry.status == 'loaded'){  
						clearInterval(interval);
						this.setComponentMarkup(resourceEntry.resource);
						resolve(resourceEntry.resource);
					}
				}, 10);
			});

		}else{
			//load the template file for the first call to each given component
			ComponentMarkupMap.createResourceEntry(directoryName + '-html');
			return fetch("/micomponents/" + directoryName + ".html").then(response => response.text()).then(text => {
				ComponentMarkupMap.loadResource(directoryName + '-html', text);
				this.setComponentMarkup(text);
				return text;
			});

		}
	}

	this.setComponentMarkup = function(text){
		let markup = this.createElementsFromHTML(text);
		this.component.rootNode.appendChild(markup.content.cloneNode(true));
		this.setMergeFieldsOnInit();
	}

	this.createElementsFromHTML = function(htmlString) {
		var markup = new DOMParser().parseFromString(htmlString, "text/html");
		return markup.querySelector('template');
	}

	this.loadRemoteJavascript = function(url){

		var jsFile = document.createElement("script");
		jsFile.src = url;
		this.component.rootNode.appendChild(jsFile);
	}

	this.loadRemoteCSS = function(url){
		var cssFile = document.createElement("link");
		cssFile.href = url;
		cssFile.rel = "stylesheet";
		this.component.rootNode.appendChild(cssFile);

	}

	
	/** ******************** Start Merge Field Methods *********************************** */

	//Originally tried just resetting the whole innerHTML which caused issues for persistent changes like input boxes in child components that rerender after one letter change
	//Now am traversing the tree for nodes that contain the merge field
	//Currently only handling output text
	//Should expand functionality to handle tag attributes and properties
	//Could face performance issues because we are traversing the whole tree
	//Could also face potential issues if the dom changes dynamically (adding a component after rendered callback (unless connected callback is called afterwards)
	this.setMergeFieldsOnInit = function(){
		
		this.setBaseMarkupForMergeFieldReference();

		let nodeTree = this.component.rootNode;
		let childNodes = nodeTree.childNodes;

		this.component.constructor.observedAttributes.forEach((attribute) => {
			this.setMergeFieldOnAllNodes(childNodes, attribute, this.component.getAttribute(attribute));
		});
		return nodeTree;
	}

	this.setBaseMarkupForMergeFieldReference = function(){
			
		let templateClone = document.createElement('template');
		this.component.rootNode.childNodes.forEach(node => {
			let clone = node.cloneNode(true);
			templateClone.appendChild(clone);
		});

		this.component.baseMarkup = templateClone.cloneNode(true);
	}

	this.setMergeFieldOnAllNodes = function(elements, mergeField, newValue){
		let mergeFieldSyntax = '{!' + mergeField + '}';
		let regex = new RegExp(mergeFieldSyntax, "g");
		let attributeValue = (!!newValue) ? newValue : '';

		elements.forEach((element) => {
			
			if(element.nodeName == '#text'){
				if(element.nodeValue.includes(mergeFieldSyntax)){
					element.nodeValue = element.nodeValue.replace(regex, attributeValue);
				}
			}else {
				for(let i = 0; i < element.attributes.length; i++){
					let attribute = element.attributes[i];
					if(attribute.value.includes(mergeFieldSyntax)){
						attribute.value = attribute.value.replace(regex, attributeValue);
					}
				}
			}
			if(!!element.childNodes && element.childNodes.length > 0){
				this.setMergeFieldOnAllNodes(element.childNodes, mergeField, newValue);
			}

		});
	}

	/** ******************** End Merge Field Methods *********************************** */

	if(loadComponentsAtInit == null || loadComponentsAtInit){
		this.loadWebComponentResources(component, directoryName);
	}
}

export default WebComponentLoader;
