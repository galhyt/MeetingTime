Filters = new React.createClass({
  filterChanged() {
      this.props.filterChanged({startTime: this.refs.startTime.value,
      endTime: this.refs.endTime.value, breakTime: this.refs.breakTime.value,
      sikumTime: this.refs.sikumTime.value,
      speakerTimeInitial: this.refs.speakerTimeInitial.value,
      breakTimeOver: this.refs.breakTimeOver.checked});
  },

  render() {
    return (
      <div className="FiltersSec">
      <div><h3>Start:</h3> <input type="time" ref="startTime" defaultValue="00:00" onChange={this.filterChanged} /></div>
      <div><h3>End:</h3> <input type="time" ref="endTime" defaultValue="00:00" onChange={this.filterChanged} /></div>
      <div><h3>Break Time:</h3> <input type="number" ref="breakTime" defaultValue="0" onChange={this.filterChanged} />
      <input type="checkbox" ref="breakTimeOver" defaultChecked={false} onChange={this.filterChanged} />
      </div>
      <div><h3>Sikum Time:</h3> <input type="number" ref="sikumTime" defaultValue="0" onChange={this.filterChanged} /></div>
      <div><h3>Initial Speaker Time:</h3> <input type="number" ref="speakerTimeInitial" defaultValue="0" onChange={this.filterChanged} /></div>
      </div>
    )
  }
});
