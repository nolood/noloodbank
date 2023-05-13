import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {Provider} from "react-redux";
import store from "./store";
import { initializeApp } from "firebase/app";
import {Suspense} from "react";
import MainLoader from "./components/Loaders/MainLoader.tsx";
import './styles/index.scss'

const firebaseConfig = {
    apiKey: "AIzaSyCe1RwxjdooDCIYRip7xMOoWApNpLWIF3k",
    authDomain: "noloodbank.firebaseapp.com",
    projectId: "noloodbank",
    storageBucket: "noloodbank.appspot.com",
    messagingSenderId: "310080433416",
    appId: "1:310080433416:web:b05817b816c55af37590bd"
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <Suspense fallback={<MainLoader/>}>
            <App />
        </Suspense>
    </Provider>
)
