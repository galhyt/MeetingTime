Filters = new React.createClass({
  render() {
    return (
      <div className="FiltersSec">
      <div><h3>Start:</h3> <input type="time" id="startTime" defaultValue="00:00" onChange={this.props.filterChanged} /></div>
      <div><h3>End:</h3> <input type="time" id="endTime" defaultValue="00:00" onChange={this.props.filterChanged} /></div>
      <div><h3>Break Time:</h3> <input type="number" id="breakTime" defaultValue="0" onChange={this.props.filterChanged} /></div>
      <div><h3>Sikum Time:</h3> <input type="number" id="sikumTime" defaultValue="0" onChange={this.props.filterChanged} /></div>
      <div><h3>Speaker Time:</h3> <input type="number" id="speakerTime" defaultValue="0" onChange={this.props.filterChanged} /></div>
      </div>
    )
  }
});
