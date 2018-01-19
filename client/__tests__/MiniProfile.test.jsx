import React from 'react';
import ReactDOM from 'react-dom';
import MiniProfile from '../src/components/MiniProfile.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';

const userInfo = {
  avatarUrl: "",
  createdAt: "Thu Jan 18 2018 12:04:05 GMT-0800 (PST)",
  displayName: "Santi Iraola",
  userId: 31,
  username: "blam92",
  verified: true
}
it('Miniprofile renders without crashing (needs to be wrapped in MuiThemeProvider)', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <MuiThemeProvider>
    <MiniProfile 
      balance={"100.00"}
      userInfo={userInfo} />
  </MuiThemeProvider>, div);
});

it('renders a snapshot of miniprofile', () => {
  const tree = renderer.create(
  <MuiThemeProvider>
    <MiniProfile 
      balance={"100.00"}
      userInfo={userInfo} />
  </MuiThemeProvider>).toJSON();
  expect(tree).toMatchSnapshot();
});
let miniProfileComp = (<MuiThemeProvider>
    <MiniProfile 
      balance={"100.00"}
      userInfo={userInfo} />
  </MuiThemeProvider>);

it('should mount in a full DOM', function() {
  // expect(shallow(miniProfileComp)
  // .contains(<span></span>)).toBe(true);
  console.log(shallow(miniProfileComp).state());
});
