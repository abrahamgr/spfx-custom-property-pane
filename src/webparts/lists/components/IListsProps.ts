import { ISPList } from "../../../components/multiple-list-pane/IMultipleListPaneProps";

export interface IList extends ISPList{
  totalItems: number;
  description: string;
}

export interface IListsProps {
  lists: ISPList[];
  getLists: () => Promise<IList[]>;
}
