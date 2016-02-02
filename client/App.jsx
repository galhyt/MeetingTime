function getTime(t) {
    var d = /(\d+):(\d+)/g.exec(t);
    if (d == null) return 0;
    return Number(d[1])*60+Number(d[2]);
}

function minutuesToTimeFormat(min) {
    var t = "";
    var m = Math.floor(min);
    var s = Math.floor((min-m)*60);
    t += (m < 10 ? "0" : "") + m;
    t += ":" + (s < 10 ? "0" : "") + s;
    return t;
}

App = React.createClass({
  getInitialState() {
      setInterval(this.setSpeakerTime, 30000);
      var startTime = new Date();
      var endTime = new Date(startTime.getTime()+2*3600*1000);
      var reminder = endTime.getMinutes()%15;
      endTime = new Date(endTime.getTime()-reminder*60000);
      
    return {speakers: [{name: "", id: Date.now(), key: Date.now(), checked: false}],
      startTime: startTime,
      endTime: endTime,
      breakTime: 15,
      breakTimeOver: false,
      sikumTime: 10,
      speakerTimeInitial: 7,
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
    this.state.activeSpeaker = this.getActiveSpeaker(this.state.speakers);
    this.setState(this.state);
    setTimeout(this.setSpeakerTime);
  },
  
  removeSpeaker(id) {
      this.state.speakers = $.makeArray($(this.state.speakers).map(function() {
         if (this.id != id) return this; 
      }));
        this.setState(this.state);
    setTimeout(this.setSpeakerTime);
  },

    checkSpeaker(id) {
        var newState = this.state; 
        $(newState.speakers).each(function() {
            if (id == this.id) {
                this.checked = !this.checked;
                return false;
            }
        });
        newState.activeSpeaker = this.getActiveSpeaker(newState.speakers);
        this.setState(newState);
        setTimeout(this.setSpeakerTime);
    },
    
    getActiveSpeaker(speakers) {
        var activeSpeaker = -1;
        $(speakers).each(function(indx, sp) {
            if (!this.checked) {
                activeSpeaker = indx;
                return false;
            }
        });
        return activeSpeaker;
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
    return (<Filters filterChanged={this.filterChanged} startTime={this.state.startTime} endTime={this.state.endTime} 
        breakTime={this.state.breakTime} sikumTime={this.state.sikumTime} speakerTimeInitial={this.state.speakerTimeInitial} />);
  },

  renderSpeakers() {
    return (<Speakers speakers={this.state.speakers} checkSpeaker={this.checkSpeaker} getSpeakerTime={this.getSpeakerTime}
        activeSpeaker={this.state.activeSpeaker} removeSpeaker={this.removeSpeaker} />);
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>Times Table</h1>
        </header>

        <div>
          {this.renderFilter()}
          <span>speaker time:{minutuesToTimeFormat(this.state.speakerTime)}</span>
        </div>
        <div>
          {this.renderSpeakers()}
          <button className="addSpeaker" onClick={this.addSpeaker}>+</button>
        </div>
      </div>
    );
  }
});
