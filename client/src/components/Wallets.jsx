import React from 'react';
import FlatButton from 'material-ui/FlatButton';

class Wallets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wallets: [],
      currentWallet: {},
    };
    this.renderWallets.bind(this);
  }

  //set the wallets state to all the wallets a user has
  componentDidMount () {
    this.setState({
      wallets: this.props.wallets,
    });
  }

  // as amount in wallet is updated, this will trigger a rerender of this component to reflect changes
  componentWillReceiveProps(nextProps) {
    if(this.props.wallets !== nextProps.wallets) {
      this.setState({
        wallets: nextProps.wallets,
        currentWallet: nextProps.wallets[0]
      });
    }  
  } 
  
  // show the current wallet that is displayed
  renderCurrentWallet (currencyType) {
    let wallet = this.state.wallets.filter(wallet =>
      wallet.currency_type === currencyType
    )

    this.setState ({
      currentWallet: wallet[0]
    });
  }

  //show all the wallets a user has
  //when a wallet is clicked the current wallet will show the active wallet
  renderWallets () {
    return this.state.wallets.map((wallet, idx) => {
      return (
        <div key={idx} className='wallet-button'>
          <button 
            style={{width: 330 / this.state.wallets.length}}
            onClick={(e) => this.renderCurrentWallet(e.target.value)} 
            value={wallet.currency_type}>
            {wallet.currency_type}
          </button>
        </div>
      )
    });
  }


  render () {
    return (
      <div className='wallet-wrapper'>
        <div id='my-wallet'>My Wallets</div>

        //show all wallets
        <div id='wallet-buttons'>
          {this.renderWallets()}
        </div>

        //active wallet balance
        <div id='wallet-balance'>
          <span id='currency-type'>{this.state.currentWallet.currency_type}</span>
          <span id='amount'>{this.state.currentWallet.amount}</span>
        </div>
      </div>
    )
  }
}

export default Wallets;