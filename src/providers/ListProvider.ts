import { WebPartContext } from "@microsoft/sp-webpart-base";
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";
import { sp } from "@pnp/sp";

import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import { ISPList } from "../components/multiple-list-pane/IMultipleListPaneProps";
import { Mockup } from "./Mockup";
import { IList} from "../webparts/lists/components/IListsProps";

export class ListProvider {
    constructor(context: WebPartContext){
        sp.setup({
            spfxContext: context
        });
    }

    public getListsOptions(): Promise<IDropdownOption[]>{
        if(Environment.type == EnvironmentType.Local){
            return Mockup.getListsOptions();
        }
        else {
            return sp.web.lists.filter("Hidden eq false").select("Id", "Title").get().then(lists =>{
                return lists.map(list =>{
                    const option: IDropdownOption = { key: list.Id, text: list.Title };
                    return option;
                });
            });
        }
    }

    public getListsInfo(lists: string[]): Promise<IList[]> {
        if(Environment.type == EnvironmentType.Local){
            return Mockup.getListsInfo();
        }
        else {
            let finalLists: IList[] = [];
            return lists.reduce((promise, listId) =>{
                return promise.then(() =>{
                    if(!listId)
                        return Promise.resolve();
                    return sp.web.lists.getById(listId).select("Id", "Title", "ItemCount").get().then(listData =>{
                        finalLists.push({ id: listId, title: listData.Title, totalItems: listData.ItemCount });
                        return null;
                    });
                });
            }, Promise.resolve())
            .then(() => finalLists);
        }

    }
}