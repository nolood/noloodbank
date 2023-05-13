import './AuthPageStyle.scss'
import NInput from "../../components/ui/NInput.tsx";
import NButton from "../../components/ui/NButton.tsx";
import {SyntheticEvent, useState} from "react";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks/useRedux.ts";
import {getDatabase, ref, serverTimestamp, set} from "firebase/database";
import {setId, setUsername} from "../../store/userSlice/userSlice.ts";
import {HOME_ROUTE} from "../../utils/const.ts";
import {generateCardExpireDate, generateCardNumber, generateCvcCode} from "../../hooks/useGenCard.ts";

const AuthPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLogin, setIsLogin] = useState(false)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const auth = (e: SyntheticEvent) => {
        e.preventDefault()
        if (!isLogin) {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user
                    const db = getDatabase()
                    const userRef = ref(db, `users/${user.uid}`)

                    set(userRef, {
                        id: user.uid,
                        email: email,
                        password: password,
                        username: email.split('@')[0],
                        role: 'user',
                        createdAt: serverTimestamp()
                    }).then(() => {
                        const cardRef = ref(db, `users/${user.uid}/card`)
                        const cardNum = generateCardNumber()
                        const cardExpireDate = generateCardExpireDate()
                        const cardCvcCode = generateCvcCode()

                        set(cardRef, {
                            id: cardNum,
                            expireDate: cardExpireDate,
                            cvc: cardCvcCode,
                            balance: 0
                        })
                    })

                    dispatch(setId(user.uid));
                    dispatch(setUsername(email.split('@')[0]))
                    navigate(HOME_ROUTE)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error(errorMessage);
                    console.error(errorCode);
                });
        } else {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    dispatch(setId(user.uid));
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error(errorMessage);
                    console.error(errorCode);
                });
            navigate(HOME_ROUTE)
        }
        setEmail('')
        setPassword('')
    }

    return (
        <section className='section'>
            <div className='container auth__wrapper'>
                <div className='auth__plate'>
                    <h1>{isLogin ? 'Login' : 'Register'}</h1>
                    <form className='auth__form'>
                        <div className='auth__input'>
                            <NInput type={'text'} placeholder={'Enter Email'} value={email} setValue={setEmail}/>
                        </div>
                        <div className='auth__input'>
                            <NInput type={'password'} placeholder={'Enter Password'} value={password} setValue={setPassword}/>
                        </div>
                        <div className='auth__btn'>
                            <NButton title='Submit' func={auth}/>
                        </div>
                    </form>
                    <div className='auth__change'>
                        <button onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Sign in' : 'Log in'}</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AuthPage;