function getTime(t) {
    var d = /(\d+):(\d+)/g.exec(t);
    if (d == null) return 0;
    return Number(d[1])*60+Number(d[2]);
}

App = React.createClass({
  getInitialState() {
    return {speakers: [{name: "", id: Date.now(), key: Date.now(), checked: false}],
      startTime: Date.now(),
      endTime: Date.now(),
      breakTime: 0,
      breakTimeOver: false,
      sikumTime: 0,
      speakerTimeInitial: 0,
      speakerTime: 0,
      activeSpeaker: 0
    };
  },
  
  getSpeakerTime() {
      return this.state.speakerTime;
  },

  setSpeakerTime() {
    var newState = this.state;
    var speakersCount = $(this.state.speakers).map(function() {if (!this.checked) return this}).length;
    var curDate = new Date();
    var startTime = curDate.getHours()*60+curDate.getMinutes();
    startTime = Math.max(startTime, getTime(newState.startTime))
    var timeRemains = getTime(newState.endTime)-startTime - (newState.breakTimeOver ? 0 : newState.breakTime) - newState.sikumTime;
    newState.speakerTime = Math.min(timeRemains / speakersCount, newState.speakerTimeInitial);
    this.setState(newState);
  },

  addSpeaker() {
    console.log('addSpeaker');
    this.state.speakers = this.state.speakers.concat([{
        name: "",
        id: Date.now(),
        key: Date.now(),
        checked: false
    }]);
    this.setState(this.state);
  },

    checkSpeaker(id) {
        var newState = this.state; 
        $(newState.speakers).each(function() {
            if (id == this.id) {
                this.checked = !this.checked;
                return false;
            }
        });
        newState.activeSpeaker = -1;
        $(newState.speakers).each(function(indx, sp) {
            if (!this.checked) {
                newState.activeSpeaker = indx;
                return false;
            }
        });
        this.setState(newState);
        setTimeout(this.setSpeakerTime);
    },

  filterChanged(filter) {
    var newState = this.state;
    newState.startTime = filter.startTime;
    newState.endTime = filter.endTime;
    newState.breakTime = filter.breakTime;
    newState.breakTimeOver = filter.breakTimeOver;
    newState.sikumTime = filter.sikumTime;
    newState.speakerTimeInitial = filter.speakerTimeInitial;
    this.setState(newState);
    setTimeout(this.setSpeakerTime);
  },

  renderFilter() {
    return (<Filters filterChanged={this.filterChanged} />);
  },

  renderSpeakers() {
    return (<Speakers speakers={this.state.speakers} checkSpeaker={this.checkSpeaker} getSpeakerTime={this.getSpeakerTime}
        activeSpeaker={this.state.activeSpeaker} />);
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
          <span>speaker time:{this.state.speakerTime}</span>
        </div>
      </div>
    );
  }
});
