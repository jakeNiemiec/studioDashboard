import {SimpleGridData} from "./SimpleGridData";
import {SimpleGridTable} from "./SimpleGridTable";
import {SimpleGridSortableHeader} from "./SimpleGridSortableHeader";
import {SimpleGridRecord} from "./SimpleGridRecord";
import {SimpleGridDataImage} from "./SimpleGridDataImage";
import {StoreModel} from "../../models/StoreModel";
import {SimpleGridDataChecks} from "./SimpleGridDataChecks";
import {SimpleGridDataDropdown} from "./SimpleGridDataDropdown";

export const SIMPLEGRID_DIRECTIVES:Array<any> = [SimpleGridTable, SimpleGridSortableHeader, SimpleGridRecord, SimpleGridData, SimpleGridDataImage, SimpleGridDataChecks, SimpleGridDataDropdown];

export interface ISimpleGridEdit {
    value:string;
    item:StoreModel;
}
