import * as React from 'react';
import styles from './Lists.module.scss';
import { IListsProps } from './IListsProps';
import { IListState } from "./IListsState";
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import * as strings from "ListsWebPartStrings";

export default class Lists extends React.Component<IListsProps, IListState> {
  
  constructor(props: IListsProps){
    super(props);
    this.state = {
      lists: [],
      loading: true
    };
  }

  public componentDidMount(): void {
    this.props.getLists().then(lists =>{
      this.setState({ 
        lists: lists,
        loading: false
      });
    });
  }
  
  public render(): React.ReactElement<IListsProps> {
    return (
      <div className={ styles.lists }>
      {this.state.loading && <Spinner label={strings.Loading} size={SpinnerSize.medium} />}
      {!this.state.loading &&
        <React.Fragment>
          <h4>Lists</h4>
          <div className="ms-Grid">
            <div className={`ms-Grid-row ${styles.header_list} ${styles.list_row}`}>
              <div className="ms-Grid-col ms-sm3 ms-md3 ms-lg3">Title</div>
              <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">Description</div>
              <div className="ms-Grid-col ms-sm3 ms-md3 ms-lg3">Total items</div>
            </div>
            {this.state.lists.map((list, idx) => 
              <div key={`${idx}_${list.id}`} className={`ms-Grid-row ${styles.list_row}`} >
                <div className="ms-Grid-col ms-sm3 ms-md3 ms-lg3">{list.title}</div>
                <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">{list.description}</div>
                <div className="ms-Grid-col ms-sm3 ms-md3 ms-lg3">{list.totalItems}</div>
              </div>
            )}
          </div>
        </React.Fragment>
      }
      </div>
    );
  }
}
