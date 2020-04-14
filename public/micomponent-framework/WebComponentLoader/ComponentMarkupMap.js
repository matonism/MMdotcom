

class ComponentMarkupMap {

    static hasResource(key){
        let hasResource = false;
        Object.keys(ComponentMarkupMap.prototype.resources).find(keyCheck => {
            if(keyCheck == key){
                hasResource = true;
            }
        });

        return hasResource;
    }

    static getResource(key){
        return ComponentMarkupMap.prototype.resources[key];
    }


    static createResourceEntry(key, resourceType){
        let resourceEntry = {
            key: key,
            status: 'loading',
            components: [],
            resourceType: resourceType
        }
        ComponentMarkupMap.prototype.resources[key] = resourceEntry;
    }

    static loadResource(key, resource){
        let resourceEntry = this.getResource(key);
        if(resourceEntry){
            resourceEntry.resource = resource;
            resourceEntry.status = 'loaded';
        }else{
            console.log('couldnt find entry');
        }

    }

}
ComponentMarkupMap.prototype.resources = {};
export default ComponentMarkupMap;