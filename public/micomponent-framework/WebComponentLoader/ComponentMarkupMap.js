

class ComponentMarkupMap {

    static hasResource(key){
        let hasResource = false;
        Object.keys(ComponentMarkupMap.resources).find(keyCheck => {
            if(keyCheck == key){
                hasResource = true;
            }
        });

        return hasResource;
    }

    static getResource(key){
        return ComponentMarkupMap.resources[key];
    }


    static createResourceEntry(key, resourceType){
        let resourceEntry = {
            key: key,
            status: 'loading',
            components: [],
            resourceType: resourceType
        }
        ComponentMarkupMap.resources[key] = resourceEntry;
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
ComponentMarkupMap.resources = {};
export default ComponentMarkupMap;