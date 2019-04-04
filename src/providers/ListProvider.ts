import { WebPartContext } from "@microsoft/sp-webpart-base";
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";
import { ISPList } from "../components/multiple-list-pane/IMultipleListPaneProps";
import { Mockup } from "./Mockup";

export class ListProvider {
    constructor(context: WebPartContext){

    }

    public getLists(): Promise<ISPList[]>{
        if(Environment.type == EnvironmentType.Local){
            return Mockup.getLists();
        }
        else {
            return new Promise(resolve =>{
                setTimeout(() => {
                    resolve([]);
                }, 1000);
            });
        }
    }
}