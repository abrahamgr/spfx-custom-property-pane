import * as React from "react";
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon';
import styles from "./MultipleList.module.scss";
import { IMultipleListProps } from "./IMultipleListProps";
import { IMultipleListState } from "./IMultipleListState";
import * as strings from "ListsWebPartStrings"; 

export default class MultipleLists extends React.Component<IMultipleListProps, IMultipleListState>{
    constructor(props: IMultipleListProps){
        super(props);
        this.state = {
            lists: props.lists,
            listsAvailable: [],
            loading: true
        };
        this._addList =this._addList.bind(this);
        this._onChangeList =this._onChangeList.bind(this);
        this._deleteList = this._deleteList.bind(this);
    }

    public componentDidMount(): void {
        this.props.getLists().then(lists =>{
            this.setState({
                listsAvailable: lists,
                loading: false
            });
        });
    }

    public componentWillReceiveProps(nextProps: IMultipleListProps): void {
        if(nextProps.lists.length != this.state.lists.length)
            this.setState({ lists: nextProps.lists });
    }

    private _addList(): void {
        this.setState(prevState =>{
            prevState.lists.push("");
            return prevState;
        });
    }

    private _onChangeList(idx: number, listId: string): void {
        let lists = this.state.lists;
        lists[idx] = listId;
        this.props.onChangeList(lists);
    }

    private _deleteList(idx: number): void {
        this.setState(prevState =>{
            prevState.lists.splice(idx, 1);
            return prevState;
        });
        this.props.onDeleteList(idx);
    }

    public render(): JSX.Element{
        return <div className={styles.multiple_list}>
            <Icon iconName="CirclePlus" className={styles.add} onClick={this._addList} />
            <label className={styles.title} onClick={this._addList}>{this.props.title}</label>
            <div>
                {this.state.lists.map((list, idx) => {
                    return <div key={`list_${idx}`}>
                        <div className={styles.dropdown}>
                            <Dropdown                            
                                label={`${strings.List} ${idx + 1}`}
                                options={this.state.listsAvailable}
                                onChanged={(option: IDropdownOption) => this._onChangeList(idx, option.key as string)}
                                selectedKey={list}
                                disabled={this.state.loading}
                            />
                        </div>
                        <Icon iconName="Delete" className={styles.delete} onClick={() => this._deleteList(idx)} />
                    </div>;
                })}
            </div>
        </div>;
    }
}