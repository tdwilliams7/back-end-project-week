import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
  Redirect
} from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { addUser, login, signout } from '../../store/actions/actions';
import { connect } from 'react-redux';
// components
import NoteList from '../NoteList/NoteList';
import Note from '../Note/Note';
import Auth from '../Auth/Auth';

import './App.css';

class App extends Component {
  state = {
    authenticated: '',
    uName: 'TroyW',
    uPass: 'Open',
    username: '',
    password: '',
    attempted: false,
    user: ''
  };

  // inputChangeHandler = ({ target }) => {
  //   this.setState({
  //     [target.name]: target.value
  //   });
  // };

  // checkAuthorization = event => {
  //   event.preventDefault();
  //   this.props.login(this.state.username, this.state.password);
  //   this.setState({
  //     username: '',
  //     password: '',
  //     attempted: true
  //   });
  // };

  signOutHandler = () => {
    this.props.signout();
  };

  render() {
    return (
      <div className="App">
        <Container>
          <header className="App-header">
            <h1>Troy's Note List Project</h1>
            {this.props.authenticated ? (
              <Button onClick={this.signOutHandler}>Sign out</Button>
            ) : null}
          </header>
          <Router>
            <Switch>
              <Route exact path="/notes" component={NoteList} />
              <Route path="/notes/:id" component={Note} />
              <Route path="/" component={Auth} />
            </Switch>
          </Router>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.reducer.authenticated
  };
};

export default connect(mapStateToProps, { addUser, login, signout })(App);
