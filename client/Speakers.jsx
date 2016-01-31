Speaker = new React.createClass({
  render() {
    return (
      <div>
        <hr></hr>
        <input type="checkbox" className="SpeakerCheck" id={"check_"+this.props.id} onClick={this.props.checkSpeaker} />
        <input type="text" value={this.props.name} id={this.props.id}
                key={this.props.key} className="speakerName" />
      </div>
    );
  }
});

Speakers = new React.createClass({
  getSpeakers() {
    var checkSpeaker = this.props.checkSpeaker;
    return this.props.speakers.map(function(item) {
      return (<Speaker name={item.name} id={item.id} key={item.id} checkSpeaker={checkSpeaker} />);
    });
  },


  render() {
    return (
      <div className="SpeakersSec">
        {this.getSpeakers()}
      </div>
    );
  }
});
