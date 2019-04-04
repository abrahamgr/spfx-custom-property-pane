import * as React from "react";
// import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import styles from "./MultipleList.module.scss";
import { IMultipleListProps } from "./IMultipleListProps";
import { IMultipleListState } from "./IMultipleListState";

export default class MultipleLists extends React.Component<IMultipleListProps, IMultipleListState>{
    constructor(props: IMultipleListProps){
        super(props);
        this.state = {
            lists: [],
            listsAvailable: []
        };
        this._addList =this._addList.bind(this);
    }

    public componentDidMount(): void {
        this.props.getLists().then(lists =>{
            this.setState({
                listsAvailable: lists
            });
        });
    }

    private _addList(): void {
        this.setState(prevState =>{
            prevState.lists.push({ id: "", title: "" });
            return prevState;
        });
    }

    public render(): JSX.Element{
        return <div className={styles.multiple_list}>
            <i className={`ms-Icon ms-Icon--CirclePlus ${styles.add}`} onClick={this._addList}></i>
            <label className={styles.title} onClick={this._addList}>{this.props.title}</label>
            <div>
                {this.state.lists.map((list, i) =>{
                    return <div key={`list_${i}`}>
                        <select>
                            {this.state.listsAvailable.map((option, j) =>
                                <option value={option.id}>{option.title}</option>
                            )}
                        </select>
                    </div>;
                })}
            </div>
        </div>;
    }
}