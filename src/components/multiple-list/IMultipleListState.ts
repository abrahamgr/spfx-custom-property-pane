import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import { ISPList } from "../multiple-list-pane/IMultipleListPaneProps";

export interface IMultipleListState {
    listsAvailable: IDropdownOption[];
    lists: string[];
    loading: boolean;
}