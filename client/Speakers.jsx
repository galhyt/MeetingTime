Speaker = new React.createClass({
  render() {
    return (
      <div>
        <hr></hr>
        <input type="checkbox" className="SpeakerCheck" id={"check_"+this.props.id} onClick={this.props.changeSpeakersCount} />
        <input type="text" value={this.props.name} id={this.props.id}
                key={this.props.key} className="speakerName" />
      </div>
    );
  }
});

Speakers = new React.createClass({
  getSpeakers() {
    var changeSpeakersCount = this.props.changeSpeakersCount;
    return this.props.speakers.map(function(item) {
      return (<Speaker name={item.name} id={item.id} key={item.id} changeSpeakersCount={changeSpeakersCount} />);
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
