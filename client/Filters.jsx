Filters = new React.createClass({
  filterChanged() {
      this.props.filterChanged({startTime: this.refs.startTime.value,
      endTime: this.refs.endTime.value, breakTime: this.refs.breakTime.value,
      sikumTime: this.refs.sikumTime.value,
      speakerTimeInitial: this.refs.speakerTimeInitial.value,
      breakTimeOver: this.refs.breakTimeOver.checked});
  },
  
      getInTimeFormat(mil) {
          var d = new Date(mil);
        var t = "";
        t += (d.getHours() < 10 ? "0" : "") + d.getHours();
        t += ":" + (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
        return t;
    },


  render() {
    return (
      <div className="FiltersSec">
      <div><h3>Start:</h3> <input type="time" ref="startTime" defaultValue={this.getInTimeFormat(this.props.startTime)} onChange={this.filterChanged} /></div>
      <div><h3>End:</h3> <input type="time" ref="endTime" defaultValue={this.getInTimeFormat(this.props.endTime)} onChange={this.filterChanged} /></div>
      <div><h3>Break Time:</h3> <input type="number" ref="breakTime" defaultValue={this.props.breakTime} onChange={this.filterChanged} />
      <input type="checkbox" ref="breakTimeOver" defaultChecked={false} onChange={this.filterChanged} />
      </div>
      <div><h3>Sikum Time:</h3> <input type="number" ref="sikumTime" defaultValue={this.props.sikumTime} onChange={this.filterChanged} /></div>
      <div><h3>Initial Speaker Time:</h3> <input type="number" ref="speakerTimeInitial" defaultValue={this.props.speakerTimeInitial} onChange={this.filterChanged} /></div>
      </div>
    )
  }
});
