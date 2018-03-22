import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class PayorWallets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
    this.renderSelect.bind(this);
  }

  // this tracks which wallet is selected 
  handleChange (event, index, value) {
    this.setState({
      value: value,
    });
    let walletId = this.props.wallets[index].bal_id;
    this.props.updateState('currency_from_type', value);
    this.props.updateState('wallet_from_id', walletId);
  } 

  //show all available wallets of payor
  renderSelect () {
    return this.props.wallets.map(wallet => {
      return (
        <MenuItem 
        key={wallet.bal_id}
        value={wallet.currency_type} 
        primaryText={wallet.currency_type} 
        />
      )
    })
  }

  render() {
    return (
      <div>
        <SelectField
          floatingLabelText="From account"
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
        >
        {this.renderSelect()}
        </SelectField>
      </div>
    );
  }
}