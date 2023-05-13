import {useEffect, useState} from "react";
import {useAppSelector} from "../../hooks/useRedux.ts";
import {getDatabase, onValue, ref, query, limitToLast} from "firebase/database";
import TransactionsList from "./TransactionsList.tsx";
import {ITransactions} from "../../types/TransactionsType.ts";

const TransactionsPlate = () => {

    const userId = useAppSelector((state) => state.user.id)
    const [transactions, setTransactions] = useState<Array<ITransactions> | null>(null)

    useEffect(() => {
        const db = getDatabase()
        const transactionRef = ref(db, `users/${userId}/transaction`)
        const sortTransaction = query(transactionRef, limitToLast(6))
        onValue(sortTransaction, (snapshot) => {
            const data = snapshot.val()
            if (data) {
                setTransactions(Object.values(data))
            } else {
                setTransactions([])
            }
        })
    }, [])

    return (
        <div className='transactions__wrapper'>
            <h2 className='transactions-title'>Recent transactions</h2>
            <TransactionsList list={transactions}/>
        </div>
    );
};

export default TransactionsPlate;