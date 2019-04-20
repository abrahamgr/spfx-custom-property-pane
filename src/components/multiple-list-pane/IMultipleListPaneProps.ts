import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import { IPropertyPaneCustomFieldProps } from "@microsoft/sp-property-pane";

export interface ISPList{
    id: string;
    title: string;
}

export interface IMultipleListPaneProps {
    label: string;
    lists: string[];
    getLists: () => Promise<IDropdownOption[]>;    
    onChangeList: (property: string, lists: string[]) => void;    
    onDeleteList: (property: string, idx: number) => void;
}

export interface ImultipleListPaneInternalProps extends IMultipleListPaneProps, IPropertyPaneCustomFieldProps  {
}