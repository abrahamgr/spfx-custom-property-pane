import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart
} from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import { update } from '@microsoft/sp-lodash-subset';

import * as strings from 'ListsWebPartStrings';
import Lists from './components/Lists';
import { IListsProps, IList } from './components/IListsProps';
import MultipleListPane, {} from "../../components/multiple-list-pane/MultipleListPane";
import { ISPList } from "../../components/multiple-list-pane/IMultipleListPaneProps";
import { ListProvider } from "../../providers/ListProvider";

export interface IListsWebPartProps {
  lists: string[];
}

export default class ListsWebPart extends BaseClientSideWebPart<IListsWebPartProps> {

  private _provider: ListProvider;
  private _listPane: MultipleListPane;

  public onInit(): Promise<void>{
    this._provider = new ListProvider(this.context);
    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IListsProps > = React.createElement(
      Lists, {
        lists: [],
        getLists: this._getListsInfo.bind(this)
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  private _getListsInfo(): Promise<IList[]>{
    return this._provider.getListsInfo(this.properties.lists);
  }

  private _getListsOptions(): Promise<IDropdownOption[]>{
    return this._provider.getListsOptions();
  }

  private _onChangeList(property: string, lists: string[]): void {
    update(this.properties, property, () =>{ return lists; });
    this._listPane.render();
  }

  private _onDeleteList(property: string, idx: number): void {
    let lists = this.properties.lists.concat([]);
    lists.splice(idx, 1);
    update(this.properties, property, () =>{ return lists; });
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    this._listPane = new MultipleListPane("lists", {
      label: "Add list",
      lists: this.properties.lists,
      getLists: this._getListsOptions.bind(this),
      onChangeList: this._onChangeList.bind(this),
      onDeleteList: this._onDeleteList.bind(this)
    });

    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                this._listPane
              ]
            }
          ]
        }
      ]
    };
  }
}
