import React from 'react'
import {Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis} from 'recharts'
import axios from 'axios'
import AutoComplete from 'material-ui/AutoComplete';
const data = [
    { Emoji: String.fromCodePoint(0x1F604), Amount: 120},
    { Emoji: String.fromCodePoint(0x1f635), Amount: 98},
    { Emoji: String.fromCodePoint(0x1f609), Amount: 86},
    { Emoji: String.fromCodePoint(0x1f61a), Amount: 99},
    { Emoji: String.fromCodePoint(0x1f61b), Amount: 85},
    { Emoji: String.fromCodePoint(0x1f615), Amount: 65},
];

const style = {
  height: 500,
  width: 600,
  margin: 50,
  textAlign: 'center',
  display: 'inline-block',
  color: 'primary'
};


class RadialEmojiChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      data: [],
      compareUser: ''
    }
  }

  componentDidMount () {
    this.getRadialData(this.props.userInfo.username)
  }

  getRadialData (username) {
    axios.get(`userData/totalwordcount/${username}`, 
      {params: {username: this.state.username}})
      .then( ({data}) => {
        this.formatRadialData(data)
      })

      .catch( (err) => {
        console.log(err.message);
      })    
  }

  formatRadialData(data) {
    //convert data to an array of all emojis used
    var arrayOfWords = data.rows
    .map( (wordObj) => {
      if (wordObj.note) {
        return wordObj.note.toLowerCase().split(' ');
      } else {
        return 'empty'
      }
    })
    .reduce( (a, b) => a.concat(b))
    //count emoji instances
    var countedWords = arrayOfWords.reduce( (allWords, word) => {
      if (word in allWords) {
        allWords[word]++;
      } else {
        allWords[word] = 1;
      }
      return allWords;
    }, {})

    //convert emoji count to an array of emoji objects
    var radialData = [];

    var cleanUpWord = function(word) {
      var truth = false
      var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
      letters.forEach( (letter) => {
        if (word.startsWith(letter)) {
          truth = true;
        }
      })
      return truth;
    }
    
    for (var word in countedWords)  {
      if (!cleanUpWord(word)) {
        var wordCount = {};
        wordCount.word = word;
        wordCount.amount = countedWords[word];
        radialData.push(wordCount);    
      }
    };

    //sort data
    radialData.sort( (a, b) =>  b.amount - a.amount)

    //display top 5
    this.setState({
      data: radialData.slice(0, 6)
    })
  }

  onDropdownInput(searchText) {
    this.setState({
      compareUser: searchText
    })
  }  

  searchUserStats() {
    this.getRadialData(this.state.compareUser)
  }

  render() {

    return (
      <div>   
        <h3>Most used emojis</h3>
          <AutoComplete
            hintText="Type Username: "
            floatingLabelText="Find a Friend's Most Used Words"
            style={style.input}
            name='payeeUsername'
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={this.props.usernames ? this.props.usernames : []}
            maxSearchResults={7}
            searchText={this.state.compareUser}
            onUpdateInput = {this.onDropdownInput.bind(this)}
          />
          <button className='btn' onClick={this.searchUserStats.bind(this)}>Search Friend</button>

          <RadarChart cx={300} cy={180} outerRadius={150} width={600} height={500} data={this.state.data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="word" />
            <PolarRadiusAxis/>
            <Radar name="Mike" dataKey="amount" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
          </RadarChart>
      </div>
        );
  }
}

export default RadialEmojiChart;