import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    IPropertyPaneField,
    PropertyPaneFieldType
  } from '@microsoft/sp-webpart-base';

import { IMultipleListPaneProps, ImultipleListPaneInternalProps } from "./IMultipleListPaneProps";
import MultipleList from "../multiple-list/MultipleList";
import { IMultipleListProps } from "../multiple-list/IMultipleListProps";

export default class MultipleListPane implements IPropertyPaneField<IMultipleListPaneProps>{

    public properties: ImultipleListPaneInternalProps;
    public targetProperty: string;
    public type = PropertyPaneFieldType.Custom;

    private elem: HTMLElement;

    constructor(targetProperty: string, properties: IMultipleListPaneProps){
        this.targetProperty = targetProperty;
        this.properties = {
            key: `${targetProperty}_${(new Date()).getSeconds()}`,
            onRender: this.onRender.bind(this),
            label: properties.label,
            lists : properties.lists,
            getLists: properties.getLists
        };
    }

    public render(): void {
        if(!this.elem)
            return;
        this.onRender(this.elem);
    }

    private onRender(elem: HTMLElement): void {
        if(!this.elem)
            this.elem = elem;
        
        const component = React.createElement<IMultipleListProps>(MultipleList, {
            title: this.properties.label,
            lists: this.properties.lists,
            getLists: this.properties.getLists
        });

        ReactDOM.render(component, this.elem);
    }

    private onDismount(): void {
        ReactDOM.unmountComponentAtNode(this.elem);
    }

}