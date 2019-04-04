
import {
    IPropertyPaneCustomFieldProps
} from '@microsoft/sp-webpart-base';

export interface ISPList{
    id: string;
    title: string;
}

export interface IMultipleListPaneProps {
    label: string;
    lists: ISPList[];
    getLists: () => Promise<ISPList[]>;
}

export interface ImultipleListPaneInternalProps extends IMultipleListPaneProps, IPropertyPaneCustomFieldProps  {
}