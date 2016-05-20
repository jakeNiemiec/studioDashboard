import {Component} from "angular2/core";
import {CanActivate, ComponentInstruction} from "angular2/router";
import {AppStore} from "angular2-redux-util/dist/index";
import {BusinessAction} from "../../../business/BusinessAction";
import {BusinessModel} from "../../../business/BusinessModel";
import {AuthService} from "../../../services/AuthService";
import {appInjService} from "../../../services/AppInjService";
import {List} from "immutable";
import * as bootbox from 'bootbox';
import * as _ from 'lodash'

@Component({
    selector: 'Orders',
    moduleId: module.id,
    styleUrls: ['Orders.css'],
    templateUrl: 'Orders.html'
})

@CanActivate((to:ComponentInstruction, from:ComponentInstruction) => {
    let authService:AuthService = appInjService().get(AuthService);
    return authService.checkAccess(to, from, ['/Login/Login']);
})

export class Orders {

    constructor(private appStore:AppStore, private businessAction:BusinessAction) {
        var i_businesses = this.appStore.getState().business;

        this.businessesList = i_businesses.getIn(['businesses']);
        this.unsub = this.appStore.sub((i_businesses:List<BusinessModel>) => {
            this.businessesList = i_businesses;
        }, 'business.businesses');

    }

    // @ViewChild(SimpleList)
    // simpleList:SimpleList;

    private unsub:Function;
    private businessesList:List<BusinessModel> = List<BusinessModel>();

    private ngOnDestroy() {
        this.unsub();
    }
}

