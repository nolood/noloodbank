import {FC} from "react";
import {IUsers} from "../../types/UsersType.ts";
import {motion} from "framer-motion";
import UserIcon from "../icons/UserIcon.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks/useRedux.ts";
import {setTransferCard, setTransferId} from "../../store/userSlice/userSlice.ts";

interface TransferListItemProps extends IUsers {
    index: number
}

const TransferListItem: FC<TransferListItemProps> = ({id, card,username, index}) => {

    const dispatch = useAppDispatch()
    const userId = useAppSelector((state) => state.user.id)

    const setActiveCard = () => {
        dispatch(setTransferCard(card.id))
        dispatch(setTransferId(id))
    }

    if (userId === id) {
        return <></>
    } else {
        return (
            <motion.div
                onClick={() => setActiveCard()}
                className='transfer__item'
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
                <UserIcon/>
                <span>{username}</span>
            </motion.div>
        );
    }
};

export default TransferListItem;
