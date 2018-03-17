import React from 'react'
import {BarChart, Bar, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import axios from 'axios'
import AutoComplete from 'material-ui/AutoComplete';

// const data = [
//       {name: 'Jarrod', uv: 41, pv: -20},
//       {name: 'Cody', uv: 20, pv: -60},
//       {name: 'Cherry', uv: 101, pv: -130},
//       {name: 'Santiago', uv: 47, pv: -65},
//       {name: 'Other', uv: 40, pv: -91},
// ]

const style = {
  form: {
  },
  input: {
    background: '#fff',
    flex: 'auto',
  },
  button: {
    label: {
      color: '#fff',
      position: 'relative'
    },
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    width: 30,
  }
}

class UserBarChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      amountSpent: 0,
      chart: [],
      compareUser: '',
      usernames: []
    }
  }

  componentDidMount () {
    axios.get(`userData/totaltransactions/${this.props.userInfo.username}`, 
      {params: {username: this.state.username}})
    .then ( ({data}) => {

      var payTotal = data.payList.reduce( (accumulator, amountObj) => {
        return accumulator + parseFloat(amountObj.amount);
      }, 0)
      var payeeTotal = data.payeeList.reduce( (accumulator, amountObj) => {
        return accumulator + parseFloat(amountObj.amount);
      }, 0)

      this.setState({
        chart: [{Name: this.props.userInfo.username, Spent: payTotal, Earned: payeeTotal}]
      })

    })
    .catch( (err) => {
      console.log(err.message)
    })  
  }

  onDropdownInput(searchText) {
    this.setState({
      compareUser: searchText
    })
  }  

  searchUserStats () {
    var userToCompare = this.state.compareUser;
    axios.get(`userData/totaltransactions/${userToCompare}`, {params: {userId: this.props.userId}})
    .then ( ({data}) => {
      var payTotal = data.payList.reduce( (accumulator, amountObj) => {
        return accumulator + parseFloat(amountObj.amount);
      }, 0)
      var payeeTotal = data.payeeList.reduce( (accumulator, amountObj) => {
        return accumulator + parseFloat(amountObj.amount);
      }, 0)

      // var newChart = this.state.chart;
      // newChart.push({name: userToCompare, spent: -total, paid: 50})
      var thisChart = {Name: userToCompare, Spent: payTotal, Earned: payeeTotal};
      this.setState({
        chart: [thisChart]
      })

    })
  }

  render () {
    return (
      <div className="form-box">
        <div className="payment-username home-rightColumn">
          <h3 className="form">Payment Statistics</h3>
          <AutoComplete
            hintText="Type Username: "
            floatingLabelText="Find a Friend's Pay Stats"
            style={style.input}
            name='payeeUsername'
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={this.props.usernames ? this.props.usernames : []}
            maxSearchResults={7}
            searchText={this.state.payeeUsername}
            onUpdateInput = {this.onDropdownInput.bind(this)}
          />
          <button className='btn' onClick={this.searchUserStats.bind(this)}>Search Friend</button>
        </div>      
        <div>
          <BarChart width={600} height={300} data={this.state.chart}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
             <XAxis dataKey="Name"/>
             <YAxis 
               label={{value: 'Dollars', angle: -90, position: 'insideLeft'}}/>
             <CartesianGrid strokeDasharray="3 3"/>
             <Tooltip/>
             <Legend verticalAlign="bottom" height={36}/>/>
             <Bar dataKey="Earned" fill="#8884d8" />
             <Bar dataKey="Spent" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    );
  }


}

export default UserBarChart