import CardIcon from "../icons/CardIcon.tsx";
import {useEffect, useState} from "react";
import {getDatabase, ref, onValue} from "firebase/database";
import {useAppSelector} from "../../hooks/useRedux.ts";
import {ICard} from "../../types/CardType.ts";
import SecondaryLoader from "../Loaders/SecondaryLoader.tsx";
import EyeIcon from "../icons/EyeIcon.tsx";

const CardPlate = () => {

    const [isVisible, setIsVisible] = useState(false)
    const userId = useAppSelector((state) => state.user.id)
    const [cardData, setCardData] = useState<ICard>();

    useEffect(() => {
        const db = getDatabase()
        const cardRef = ref(db, `users/${userId}/card`)
        onValue(cardRef, (snapshot) => {
            const data = snapshot.val()
            const newExpireDate = new Date(data.expireDate)
            const month = newExpireDate.getMonth() + 1
            const year = newExpireDate.getFullYear() % 100
            const formattedDate = `${month > 10 ? month : '0' + month}/${year}`
            const newData = {
                ...data,
                expireDate: formattedDate
            }
            setCardData(newData)
        })
    }, [])
    return (
        <div className='cardplate'>
            <div className='cardplate__icon'>
                <CardIcon/>
            </div>
            <table className='cardplate__table'>
                <thead>
                <tr className='table__head'>
                    <th className='thead'>Card number</th>
                    <th className='thead'>Expire date</th>
                    <th className='thead'>Cvc</th>
                    <th className='thead'>Balance</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className='tbody'>{cardData ? cardData.id : <SecondaryLoader/>}</td>
                    <td className='tbody'>{cardData ? cardData.expireDate : <SecondaryLoader/>}</td>
                    <td className='tbody cvc'>{cardData ? <>{isVisible ? cardData.cvc : '*****'} <EyeIcon setVisible={setIsVisible} visible={isVisible}/></> : <SecondaryLoader/>}</td>
                    <td className='tbody'>{cardData ? cardData.balance.toFixed(2) + '₽' : <SecondaryLoader/>}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CardPlate;