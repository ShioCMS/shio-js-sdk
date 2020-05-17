import { ShRegion } from './shio/ShRegion';
import { ShObject } from './shio/ShObject';
import { ShPageLayout } from './shio/ShPageLayout';
export declare const shContent: () => {
    system: {
        id: string;
    };
    test: string;
};
export declare const shObject: () => typeof ShObject;
export declare const shRegion: () => typeof ShRegion;
export declare const shPageLayout: () => typeof ShPageLayout;
