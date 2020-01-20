import React from 'react';
import CurrenciesTable from '../components/CurrenciesTable'
import { connect } from 'react-redux'
import actions from '../../data/redux/actions/currenciesActions'


class Home extends React.Component {
    componentDidMount(){
       this.props.fetchCurrencies()
    }

    render(){
        const { currencies } = this.props

        return (
            <div className="Home">
                <h1 className="center"> Cryptocurrency Market Data </h1>
                <CurrenciesTable currencies={currencies}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currencies: state.currencies
})

export default connect(mapStateToProps, { fetchCurrencies: actions.fetchCurrencies })(Home);
