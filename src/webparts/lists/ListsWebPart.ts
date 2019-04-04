import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
} from '@microsoft/sp-webpart-base';

import * as strings from 'ListsWebPartStrings';
import Lists from './components/Lists';
import { IListsProps } from './components/IListsProps';
import MultipleListPane, {} from "../../components/multiple-list-pane/MultipleListPane";
import { ISPList } from "../../components/multiple-list-pane/IMultipleListPaneProps";

export interface IListsWebPartProps {
  lists: ISPList[];
}

export default class ListsWebPart extends BaseClientSideWebPart<IListsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IListsProps > = React.createElement(
      Lists, {
        lists: []
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

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
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
                new MultipleListPane("lists", {
                  label: "Add list"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
