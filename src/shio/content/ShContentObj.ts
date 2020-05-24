'use strict'

import { ShContentSystem } from "./ShContentSystem"
import { ShContentSite } from "./ShContentSite";

export class ShContentObj {
    constructor(augment: any = {}) {
        Object.assign(this, augment)
    }
    static create<T extends typeof ShContentObj, U>(this: T, augment?: U) {
        return new this(augment) as InstanceType<T> & U
    }
    public site: ShContentSite;

    public system: ShContentSystem;

}