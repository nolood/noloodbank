import {FC} from "react";
import {ITransactions} from "../../types/TransactionsType.ts";
import TransactionListItem from "./TransactionListItem.tsx";
import MainLoader from "../Loaders/MainLoader.tsx";

interface TransactionListProps {
    list: Array<ITransactions> | null
}

const TransactionsList: FC<TransactionListProps> = ({list}) => {
    return (
        <ul className='transaction__list'>
            {list === null && <MainLoader/>}
            {list !== null && list.length > 0 && list.map((item, index) =>
                    <TransactionListItem key={item.createdAt} item={item} index={index}/>
                )
            }

            {list !== null && list.length === 0 && <span className='transaction__list-title'>There are no transactions</span>}
        </ul>
    );
};

export default TransactionsList;