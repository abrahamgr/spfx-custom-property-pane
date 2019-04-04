import { ISPList } from "../../../components/multiple-list-pane/IMultipleListPaneProps";

export interface IList extends ISPList{
  totalItems: number;
}

export interface IListsProps {
  lists: ISPList[];
}
