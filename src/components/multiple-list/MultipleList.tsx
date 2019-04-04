import * as React from "react";
// import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import styles from "./MultipleList.module.scss";
import { IMultipleListProps } from "./IMultipleListProps";

export default class MultipleLists extends React.Component<IMultipleListProps, {}>{
    constructor(props: IMultipleListProps){
        super(props);
    }

    public render(): JSX.Element{
        return <div className={styles.multiple_list}>
            <i className={`ms-Icon ms-Icon--CirclePlus ${styles.add}`} ></i>
            <label className={styles.title}>{this.props.title}</label>
            <div></div>
        </div>;
    }
}