import {Injectable} from "angular2/core";
import {Actions, AppStore} from "angular2-redux-util";
import {Http, Jsonp} from "angular2/http";
import {FlagsAuth} from "../services/AuthService";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/debounceTime';

export const APP_INIT = 'APP_INIT';
export const SERVERS_STATUS = 'SERVERS_STATUS';
export const CLOUD_SERVERS = 'CLOUD_SERVERS';
export const AUTH_PASS = 'AUTH_PASS';
export const AUTH_FAIL = 'AUTH_FAIL';

@Injectable()
export class AppdbAction extends Actions {
    parseString;

    constructor(private appStore:AppStore, private _http:Http, private jsonp:Jsonp) {
        super(appStore);
        this.parseString = require('xml2js').parseString;
    }

    public authenticateUser(i_user, i_pass, i_remember) {
        return (dispatch) => {
            const baseUrl = this.appStore.getState().appdb.get('appBaseUrl');
            const url = `${baseUrl}?command=GetCustomers&resellerUserName=${i_user}&resellerPassword=${i_pass}`;
            this._http.get(url)
                .map(result => {
                    var xmlData:string = result.text()
                    this.parseString(xmlData, {attrkey: 'attr'}, function (err, result) {
                        if (!result) {
                            dispatch({
                                type: AUTH_FAIL,
                                authenticated: false,
                                user: i_user,
                                pass: i_pass,
                                remember: i_remember,
                                reason: FlagsAuth.WrongPass
                            });
                        } else if (result && !result.Businesses) {
                            dispatch({
                                type: AUTH_PASS,
                                authenticated: false,
                                user: i_user,
                                pass: i_pass,
                                remember: i_remember,
                                reason: FlagsAuth.NotEnterprise
                            });
                        } else {
                            dispatch({
                                type: AUTH_FAIL,
                                authenticated: true,
                                user: i_user,
                                pass: i_pass,
                                remember: i_remember,
                                reason: FlagsAuth.Enterprise
                            });
                        }
                    });
                }).subscribe()
        };
    }

    public serverStatus() {
        return (dispatch) => {
            this._http.get(`https://secure.digitalsignage.com/msPingServersGuest`)
                .map(result => {
                    result = result.json();
                    dispatch({type: SERVERS_STATUS, payload: result});
                }).subscribe();
            return;
        };
    }

    public getCloudServers() {
        return (dispatch) => {
            this._http.get('https://secure.digitalsignage.com/getActiveCloudServers')
                .map(result => {
                    result = result.json();
                    dispatch({type: CLOUD_SERVERS, payload: result});
                }).subscribe();
            return;
        };
    }

    public initAppDb() {
        return {type: APP_INIT, value: Date.now()};
    }
}
