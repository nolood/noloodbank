import {useEffect, useState} from "react";
import {get, getDatabase, ref} from "firebase/database";
import {IUsers} from "../../types/UsersType.ts";
import TransferListItem from "./TransferListItem.tsx";
import MainLoader from "../Loaders/MainLoader.tsx";
import {useAppDispatch} from "../../hooks/useRedux.ts";
import {setUsersData} from "../../store/userSlice/userSlice.ts";

const TransferList = () => {

    const [users, setUsers] = useState<Array<IUsers>>([])
    const dispatch = useAppDispatch()

    useEffect(() => {
        const db = getDatabase()
        const usersRef = ref(db, 'users')
        get(usersRef).then((snapshot) => {
            const data = snapshot.val()
            setUsers(Object.values(data))
            dispatch(setUsersData(Object.values(data)))
        })

    }, [])

    return (
        <ul className='transfer__list'>
            {users?.length > 0 ? users.map((user, index) => (
                <TransferListItem
                    key={user.id}
                    id={user.id}
                    card={user.card}
                    username={user.username}
                    index={index}
                />
            ))
            :
                <MainLoader/>
            }
        </ul>
    );
};

export default TransferList;
