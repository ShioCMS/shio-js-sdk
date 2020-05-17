import { ShRegion } from './shio/ShRegion';
import { ShContent } from './shio/ShContent';
import { ShObject } from './shio/ShObject';
import { ShPageLayout } from './shio/ShPageLayout';

export const shContent = () => {
    let shContent = new ShContent("region").getContent();
    return shContent;
}

export const shObject = () => {
    return ShObject;
}
export const shRegion = () => {
    return ShRegion;
}

export const shPageLayout = () => {
    return ShPageLayout;
}