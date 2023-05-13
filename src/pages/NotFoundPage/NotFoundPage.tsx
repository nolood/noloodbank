import './NotFoundPageStyle.scss'
import {useNavigate} from "react-router-dom";
import {AUTH_ROUTE, HOME_ROUTE} from "../../utils/const.ts";
const NotFoundPage = () => {

    const navigate = useNavigate()

    return (
        <section className='section'>
            <div className='container'>
                <span className='notfound'>
                    Page not found. Go back <strong onClick={() => navigate(HOME_ROUTE)}>home</strong> or <strong onClick={() => navigate(AUTH_ROUTE)}>log in</strong>
                </span>
            </div>
        </section>
    );
};

export default NotFoundPage;