import {publicRoutes, authRoutes} from "../routes.ts";
import {Route, Routes} from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.tsx";
import {useAppDispatch, useAppSelector} from "../hooks/useRedux.ts";
import {useEffect} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {setId, setIsAuth} from "../store/userSlice/userSlice.ts";


const AppRouter = () => {

    const isAuth = useAppSelector((state) => state.user.isAuth);
    const dispatch = useAppDispatch()

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setIsAuth(true));
                dispatch(setId(user.uid))
            } else {
                dispatch(setIsAuth(false));
            }
        });
        return unsubscribe;
    }, [])


    return (
        <Routes>
            {isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            <Route path={'*'} element={<NotFoundPage/>}/>
        </Routes>
    );
};

export default AppRouter;