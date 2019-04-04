import { ISPList } from "../components/multiple-list-pane/IMultipleListPaneProps";

export class Mockup{
    public static getLists(): Promise<ISPList[]>{        
        return new Promise(resolve =>{
            setTimeout(() => {
                const items: ISPList[] = [
                    {
                        id: "1",
                        title: "Documents"
                    },
                    {
                        id: "2",
                        title: "Images"
                    }
                ];
                resolve(items);
            }, 1000);
        });
    }
}