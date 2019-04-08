import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import { IList } from '../webparts/lists/components/IListsProps';

export class Mockup{
    public static getListsOptions(): Promise<IDropdownOption[]>{        
        return new Promise(resolve =>{
            setTimeout(() => {
                const items: IDropdownOption[] = [
                    {
                        key: "1", 
                        text: "Documents"
                    },
                    {
                        key: "2",
                        text: "Images"
                    }
                ];
                resolve(items);
            }, 1000);
        });
    }

    public static getListsInfo(): Promise<IList[]>{        
        return new Promise(resolve =>{
            setTimeout(() => {
                const items: IList[] = [
                    {
                        id: "1",
                        title: "Dcuments",
                        totalItems: 1,
                        description: "Documents for web"
                    },
                    {
                        id: "2",
                        title: "Images",
                        totalItems: 2,
                        description: "Local images"
                    }
                ];
                resolve(items);
            }, 1000);
        });
    }
}