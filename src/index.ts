import { ShRegion as Region } from './shio/ShRegion';
import { ShContent as Content} from './shio/ShContent';
import { ShObject as Object } from './shio/ShObject';
import { ShPageLayout as PageLayout } from './shio/ShPageLayout';

export const shContent = new Content().getContent();

export const ShObject = Object;

export const ShRegion = Region;

export const ShPageLayout = PageLayout;