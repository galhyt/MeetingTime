App = React.createClass({
  getInitialState() {
    return {speakers: [{name: "", id: Date.now(), key: Date.now()}]};
  },

  addSpeaker() {
    console.log('addSpeaker');
    var nextSpeakers = this.state.speakers.concat([{
        name: "fdasfsd",
        id: Date.now(),
        key: Date.now()
    }]);
    this.setState({speakers: nextSpeakers});
  },

  renderFilter() {
    return (<Filters />);
  },

  renderSpeakers() {
    return (<Speakers speakers={this.state.speakers} />);
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>Times Table</h1>
        </header>

        <span className="addSpeaker" onClick={this.addSpeaker}>+</span>

        <div>
          {this.renderFilter()}
        </div>
        <div>
          {this.renderSpeakers()}
        </div>
      </div>
    );
  }
});
