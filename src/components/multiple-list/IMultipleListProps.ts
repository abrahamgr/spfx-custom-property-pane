import { ISPList } from "../multiple-list-pane/IMultipleListPaneProps";

export interface IMultipleListProps {
    title: string;
    lists: ISPList[];
    getLists: () => Promise<ISPList[]>;
}