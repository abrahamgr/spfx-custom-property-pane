
import {
    IPropertyPaneCustomFieldProps
} from '@microsoft/sp-webpart-base';

export interface ISPList{
    id: string;
    title: string;
}

export interface IMultipleListPaneProps {
    label: string;
}

export interface ImultipleListPaneInternalProps extends IMultipleListPaneProps, IPropertyPaneCustomFieldProps  {
}