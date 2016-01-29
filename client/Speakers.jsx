Speaker = new React.createClass({
  render() {
    return (
      <div>
        <hr>baa</hr>
        <input type="text" value={this.props.name} id={this.props.id}
                key={this.props.key} className="speakerName" />
              <span>{this.props.id}</span>
      </div>
    );
  }
});

Speakers = new React.createClass({

  getSpeakers() {
    return this.props.speakers.map(function(item) {
      return (<Speaker name={item.name} id={item.id} key={item.id} />);
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
