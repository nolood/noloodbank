import {FC} from "react";
import {IUsers} from "../../types/UsersType.ts";
import {motion} from "framer-motion";
import {useAppDispatch} from "../../hooks/useRedux.ts";
import {setTransferCard, setTransferId} from "../../store/userSlice/userSlice.ts";

interface SearchItemProps extends IUsers{
    index: number,
}

const SearchItem: FC<SearchItemProps> = ({index, card, id, username}) => {

    const dispatch = useAppDispatch()

    const transferMoney = () => {
        dispatch(setTransferId(id))
        dispatch(setTransferCard(card.id))
    }

    return (
        <motion.div
            onClick={() => transferMoney()}
            className='search__item'
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
                duration: 0.2,
                delay: index * 0.1
            }}
        >
            {username}
        </motion.div>
    );
};

export default SearchItem;