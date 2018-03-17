import React from 'react'
import ReactDOM from 'react-dom'
import {PieChart, Pie, Sector, Cell} from 'recharts'
import axios from 'axios';
// const {PieChart, Pie, Sector, Cell } = Recharts;
const data = [{name: 'Cody', value: 2}, {name: 'Cherry', value: 3},
                  {name: 'Santiago', value: 2}, {name: 'Other', value: 2}];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const RADIAN = Math.PI / 180;   


const displayNames = ({ name, cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
  return (
        <text x={x} y={y} fill="black" textAnchor={x > cx ? 'middle' : 'middle'}  dominantBaseline="central">
      {`${name}: ${(percent * 100).toFixed(0)}%`}
    </text>
    )
}

class SimplePieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      transactions: []
    }
  }

  componentDidMount () {
    axios.get(`/userData/mosttransactions/${this.props.userId}`, { params: {userId: this.props.userId}})
    .then( ({data}) => {
      var amountOfTransactions = data.length;
      var counter = data.reduce(function(allNames, name) {
        if (name.username in allNames) {
          allNames[name.username]++;
        } else {
          allNames[name.username] = 1
        }
        return allNames
      }, {})
      var myTransactionData = [];
      for (name in counter) {
        var thisName = {};
        thisName.name = name;
        thisName.value = counter[name];
        myTransactionData.push(thisName);
      }

      this.setState({
        transactions: myTransactionData,
        amountOfTransactions: amountOfTransactions
      });
    })
    .catch( (err) => {
      console.log(err.message);
    })
  }
  
  render () {
    console.log('pie rendering')
    return (
      <div>
      &nbsp;&nbsp;
      <h3>Users You Have Paid The Most</h3>
      <h5>{`Total Amount of Transactions: ${this.state.amountOfTransactions}`}</h5>
      <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
        <Pie
          data={this.state.transactions || data} 
          cx={300} 
          cy={170} 
          labelLine={false}
          outerRadius={160} 
          fill="#8884d8"
          label={displayNames}
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}/>)
            }
          }
        </Pie>
      </PieChart>
      </div>
    );
  }
}



export default SimplePieChart;