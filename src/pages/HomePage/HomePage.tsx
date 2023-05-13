import './HomePageStyles.scss'
import CardPlate from "../../components/HomePage/CardPlate.tsx";
import TransactionsPlate from "../../components/HomePage/TransactionsPlate.tsx";
import StatisticsPlate from "../../components/HomePage/StatisticsPlate.tsx";
import ChangePlate from "../../components/HomePage/ChangePlate.tsx";
import TransferPlate from "../../components/HomePage/TransferPlate.tsx";
const HomePage = () => {
    return (
        <section className='section'>
            <div className='container home__wrapper'>
                <div className='home__leftside'>
                    <CardPlate/>
                    <TransactionsPlate/>
                </div>
                <div className='home__rightside'>
                    <StatisticsPlate/>
                    <ChangePlate/>
                    <TransferPlate/>
                </div>
            </div>
        </section>
    );
};

export default HomePage;