import { CloudPool } from "./network-map/cloudpools/cloudpool.model";

export interface NetworkMap {
    name: string;
    description: string;
    cloudpools: CloudPool[];
}