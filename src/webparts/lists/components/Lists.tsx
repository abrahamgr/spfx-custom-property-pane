import * as React from 'react';
import styles from './Lists.module.scss';
import { IListsProps } from './IListsProps';
import { IListState } from "./IListsState";

export default class Lists extends React.Component<IListsProps, IListState> {
  
  constructor(props: IListsProps){
    super(props);
    this.state = {
      lists: []
    };
  }
  
  public render(): React.ReactElement<IListsProps> {
    return (
      <div className={ styles.lists }>
        <h4>Lists</h4>
        <ul>
          {this.state.lists.map((list, idx) => 
            <li key={`li_${idx}`}>
              <span>{list.title}</span>
              <span className={styles.total}>{list.totalItems}</span>
            </li>
            )}
        </ul>
      </div>
    );
  }
}
