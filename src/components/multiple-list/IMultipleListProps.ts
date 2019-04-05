import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import { ISPList } from "../multiple-list-pane/IMultipleListPaneProps";

export interface IMultipleListProps {
    title: string;
    lists: string[];
    getLists: () => Promise<IDropdownOption[]>;
    onChangeList: (lists: string[]) => void;
    onDeleteList: (idx: number) => void;
}