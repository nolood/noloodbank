import {useEffect, useState} from "react";
import {getDatabase, onValue, ref} from "firebase/database";
import {useAppSelector} from "../../hooks/useRedux.ts";
import SecondaryLoader from "../Loaders/SecondaryLoader.tsx";

const StatisticsPlate = () => {

    const userId = useAppSelector((state) => state.user.id)
    const [income, setIncome] = useState<number | null>(null)
    const [expense, setExpense] = useState<number | null>(null)

    useEffect(() => {
        const db = getDatabase()
        const incomeRef = ref(db, `users/${userId}/income`)
        const expenseRef = ref(db, `users/${userId}/expense`)
        onValue(incomeRef, (snapshot) => {
            const data = snapshot.val()
            if (data) {
                setIncome(data)
            } else {
                setIncome(0)
            }

        })
        onValue(expenseRef, (snapshot) => {
            const data = snapshot.val()
            if (data) {
                setExpense(data)
            } else {
                setExpense(0)
            }
        })

    }, [])

    return (
        <div className='statistics__wrapper'>
            <h2 className='statistics-title'>Statistics</h2>
            {income !== null && expense !== null &&
                <>
                    <div className='statistics__income'>
                        <span className='statistics__text'>Income: <strong>{income ? income.toFixed(2) : '0.00'} &#x20bd;</strong></span>
                    </div>
                    <div className='statistics__expense'>
                        <span className='statistics__text'>Expense: <strong>{expense ? expense.toFixed(2) : '0.00'} &#x20bd;</strong></span>
                    </div>
                </>
            }
            {income === null && expense === null && <SecondaryLoader/>}
        </div>
    );
};

export default StatisticsPlate;