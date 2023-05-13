import NInput from "../ui/NInput.tsx";
import {SyntheticEvent, useState} from "react";
import NButton from "../ui/NButton.tsx";
import {getDatabase, ref, set, get} from "firebase/database";
import {useAppSelector} from "../../hooks/useRedux.ts";

const ChangePlate = () => {

    const [balanceValue, setBalanceValue] = useState('')
    const userId = useAppSelector((state) => state.user.id)


    const addBalance = (e: SyntheticEvent) => {
        e.preventDefault()
        if (!isNaN(Number(balanceValue)) && balanceValue !== '') {
            const db = getDatabase()
            const balanceRef = ref(db, `users/${userId}/card/balance`)
            get(balanceRef).then((snapshot) => {
                const data = snapshot.val()
                set(balanceRef, Number(balanceValue) + data)
                setBalanceValue('')
            })

        }
    }

    const collectBalance = (e: SyntheticEvent) => {
        e.preventDefault()
        if (!isNaN(Number(balanceValue)) && balanceValue !== '') {
            const db = getDatabase()
            const balanceRef = ref(db, `users/${userId}/card/balance`)
            get(balanceRef).then((snapshot) => {
                const data = snapshot.val()
                if (data - Number(balanceValue) > 0) {
                    set(balanceRef, data - Number(balanceValue))
                    setBalanceValue('')
                }
            })
        }
    }

    return (
        <div className='change__wrapper'>
            <NInput value={balanceValue} setValue={setBalanceValue} type={'text'} placeholder={'Enter amount:'}/>
            <div className='change__btns'>
                <NButton variant={'green'} func={addBalance} title={'Top-up'}/>
                <NButton variant={'purple'} func={collectBalance} title={'Withdrawal'}/>
            </div>
        </div>
    );
};

export default ChangePlate;