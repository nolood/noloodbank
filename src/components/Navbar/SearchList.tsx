import {FC, useEffect, useState} from "react";
import {useAppSelector} from "../../hooks/useRedux.ts";
import SearchItem from "./SearchItem.tsx";
import {IUsers} from "../../types/UsersType.ts";

interface SearchListProps {
    searchValue: string
}

const SearchList: FC<SearchListProps> = ({searchValue}) => {

    const users = useAppSelector((state) => state.user.users)
    const userId = useAppSelector((state) => state.user.id)
    const [usersData, setUsersData] = useState<Array<IUsers>>([])

    useEffect(() => {
        setUsersData(users.filter((user) => user.username.includes(searchValue) && user.id !== userId))
    }, [searchValue])

    return (
        <ul
            className='navbar__search'
            style={{bottom: -usersData.length * 75}}
        >
            {usersData.length > 0 && usersData.map((item, index) =>
                <SearchItem
                    index={index}
                    key={item.id}
                    username={item.username}
                    id={item.id}
                    card={item.card}
                />
            )}
        </ul>
    );
};

export default SearchList;