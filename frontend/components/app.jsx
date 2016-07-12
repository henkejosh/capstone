const React = require('react');
const SessionApiUtil = require('../util/session_api_util.js');
const SessionActions = require('../actions/session_actions.js');
const SessionStore = require('../stores/session_store.js');
const Modal = require('react-modal');
const Header = require('./header.jsx');
const Router = require('react-router').Router;
const hashHistory = require('react-router').hashHistory;
const SongIndex = require('./song_index.jsx');
const SongActions = require('../actions/song_actions.js');
const CurrentSongPlayer = require('./current_song_player.jsx');
const CurrentSongStore = require('../stores/current_song_store.js');
const ReactPlayer = require('./react_player.jsx');

const App = React.createClass({
  getInitialState: function() {
    return {currentSong: "false"};
  },

  componentDidMount: function() {
    this.sessionListener = SessionStore.addListener(this.isUserLoggedIn);
    this.currentSongListener = CurrentSongStore.addListener(this.isCurrentSong);
    SongActions.getAllSongs();
  },

  isCurrentSong: function() {
    if(CurrentSongStore.isCurrentSong()) {
      this.setState({ currentSong: "true"});
    } else {
      this.setState({ currentSong: "false"});
    }
  },

  isUserLoggedIn: function() {
    if(SessionStore.isUserLoggedIn()) {
      hashHistory.push(`/songs`);
    }
  },

 componentWillMount() {
    Modal.setAppElement(document.getElementById("root"));
 },

  render: function() {
    let currSong;
    if(this.state.currentSong === "true") {
      currSong = <CurrentSongPlayer/>;
    }

    return (
      <div>
        <Header/>

        <div className="define-content-area">
          <div className="content-start">

          {this.props.children}
          {currSong}

          </div>
        </div>
      </div>
    );
  }
});

module.exports = App;
