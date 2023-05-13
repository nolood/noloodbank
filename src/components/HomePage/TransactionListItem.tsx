import {FC, useEffect, useState} from "react";
import {ITransactions} from "../../types/TransactionsType.ts";
import {motion} from "framer-motion";
import ExpenseIcon from "../icons/ExpenseIcon.tsx";
import IncomeIcon from "../icons/IncomeIcon.tsx";
import CalendarIcon from "../icons/CalendarIcon.tsx";

interface TransactionListItemProps {
    item: ITransactions,
    index: number
}

const TransactionListItem: FC<TransactionListItemProps> = ({item, index}) => {

    const [date, setDate] = useState('')

    useEffect(() => {
        const createdAt = item.createdAt
        const newDate = new Date(createdAt)
        const formattedDate = newDate.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        setDate(formattedDate)
    }, [])


    return (
        <motion.div
            className='transaction__item'
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1
            }}
            exit={{
                opacity: 0
            }}
            transition={{
                type: 'tween',
                duration: 1,
                delay: index * 0.05
            }}
        >
            <div className='transaction__type'>
                <div className={item.type === 'expense' ? 'transaction__icon expense' : 'transaction__icon income'}>
                    {item.type === 'expense' ? <ExpenseIcon/> : <IncomeIcon/>}
                </div>
                <span className='transaction-title'>{item.type[0].toUpperCase() + item.type.slice(1)}</span>
            </div>
            <div className='transaction__date'>
                <div className='date__icon'>
                    <CalendarIcon/>
                </div>
                <span className='date-title'>{date}</span>
            </div>
            <span className='transaction-value'>{item.value.toFixed(2)} ₽</span>
        </motion.div>
    );
};

export default TransactionListItem;