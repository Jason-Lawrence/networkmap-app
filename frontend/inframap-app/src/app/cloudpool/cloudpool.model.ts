export class Cloudpool {
    public name: string;
    public description: string;
    public region: string;

    constructor(name: string, desc: string, region: string){
        this.name = name
        this.description = desc
        this.region = region
    }
}
