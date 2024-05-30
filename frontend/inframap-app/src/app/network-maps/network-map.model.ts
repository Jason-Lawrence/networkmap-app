import { Cloudpool } from "./cloudpools/cloudpool.model";

export interface NetworkMap {
    id?: number;
    name: string;
    description: string;
    cloudpools?: Cloudpool[];
    is_public?: boolean;
    is_editable?: boolean;
}