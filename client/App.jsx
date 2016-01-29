App = React.createClass({
  getInitialState() {
    return {speakers: [{name: "", id: Date.now(), key: Date.now()}],
      startTime: Date.now(),
      endTime: Date.now(),
      breakTime: 0,
      sikumTime: 0,
      speakerTimeInitial: 0,
      speakerTime: 0,
      speakersCount: 0
    };
  },

  setSpeakerTime() {
    var newState = this.state;
    var timeRemains = Date(newState.endTime)-Date(newState.startTime)-newState.breakTime-newState.sikumTime;
    newState.speakerTime = timeRemains / newState.speakersCount;
    this.setState(newState);
  },

  addSpeaker() {
    console.log('addSpeaker');
    var nextSpeakers = this.state.speakers.concat([{
        name: "",
        id: Date.now(),
        key: Date.now()
    }]);
    this.setState({speakers: nextSpeakers});
  },

  filterChanged() {
    var newState = this.state;
    newState.startTime = $('#startTime').val();
    newState.endTime = $('#endTime').val();
    newState.breakTime = $('#breakTime').val();
    newState.sikumTime = $('#sikumTime').val();
    this.setState(newState);
    this.setSpeakerTime();
  },

  changeSpeakersCount() {
    var newState = this.state;
    newState.speakersCount = $('.SpeakerCheck:not([checked])').length;
    this.setState(newState);
    this.setSpeakerTime();
  },

  renderFilter() {
    return (<Filters filterChanged={this.filterChanged} />);
  },

  renderSpeakers() {
    return (<Speakers speakers={this.state.speakers} changeSpeakersCount={this.changeSpeakersCount} />);
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>Times Table</h1>
        </header>

        <div>
          {this.renderFilter()}
        </div>
        <div>
          {this.renderSpeakers()}
          <span className="addSpeaker" onClick={this.addSpeaker}>+</span>
        </div>
      </div>
    );
  }
});
