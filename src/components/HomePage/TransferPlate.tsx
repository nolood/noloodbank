import NInput from "../ui/NInput.tsx";
import {SyntheticEvent, useEffect, useState} from "react";
import NButton from "../ui/NButton.tsx";
import TransferList from "./TransferList.tsx";
import {useAppSelector} from "../../hooks/useRedux.ts";
import {get, getDatabase, ref, push, serverTimestamp, set} from "firebase/database";

const TransferPlate = () => {

    const activeCard = useAppSelector((state) => state.user.transferCard)
    const [cardNumber, setCardNumber] = useState("")
    const userId = useAppSelector((state) => state.user.id)
    const transferId = useAppSelector((state) => state.user.transferId)

    useEffect(() => {
        setCardNumber(activeCard)
    }, [activeCard])

    const transferMoney = (e: SyntheticEvent) => {
        e.preventDefault()
        const db = getDatabase()
        const currentUserRef = ref(db, `users/${userId}/card/balance`)

        get(currentUserRef).then((snapshot) => {
            const data = snapshot.val()
            const currentUserBalance = data
            const transferMoneyValue = Number(prompt('Enter the amount you want to transfer'))
            return {transferMoneyValue, currentUserBalance}
        }).then((data) => {
            if (data.currentUserBalance >= data.transferMoneyValue && data.transferMoneyValue > 0.1 && transferId !== '') {
                const transferUserRef = ref(db, `users/${transferId}/card/balance`)

                get(transferUserRef).then((snapshot) => {
                    let transferUserBalance = snapshot.val()
                    const currentUserBalance = Number(data.currentUserBalance) - Number(data.transferMoneyValue)
                    transferUserBalance += data.transferMoneyValue

                    set(currentUserRef, currentUserBalance)
                    set(transferUserRef, transferUserBalance)

                    return data.transferMoneyValue
                }).then((data) => {
                    const transferValue = data
                    const expenseRef = ref(db, `users/${userId}/transaction`)
                    const incomeRef = ref(db, `users/${transferId}/transaction`)

                    push(expenseRef, {
                        type: 'expense',
                        value: transferValue,
                        createdAt: serverTimestamp()
                    })

                    push(incomeRef, {
                        type: 'income',
                        value: transferValue,
                        createdAt: serverTimestamp()
                    })
                    return transferValue
                }).then((transferValue) => {
                    const expenseRef = ref(db, `users/${userId}/expense`)
                    const incomeTransRef = ref(db, `users/${transferId}/income`)

                    get(incomeTransRef).then((snapshot) => {
                        const data = snapshot.val()
                        set(incomeTransRef, data + transferValue)
                    })

                    get(expenseRef).then((snapshot) => {
                        const data = snapshot.val()
                        set(expenseRef, data + transferValue)
                    })

                })
            }
        }).catch((error) => {
            console.error(error)
        })
    }

    return (
        <div className='transfer__wrapper'>
            <h2 className='transfer-title'>Transfer money</h2>
            <form className='transfer__form'>
                <NInput
                    value={cardNumber}
                    setValue={setCardNumber}
                    placeholder={'xxxx-xxxx-xxxx-xxxx'}
                    type={'text'}
                    readonly={true}
                />
                <NButton variant={'purple'} func={transferMoney} title={'Send'}/>
            </form>
            <TransferList/>
        </div>
    );
};

export default TransferPlate;
