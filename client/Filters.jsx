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
        <div>
          <div><h5>Start</h5> <input type="time" ref="startTime" defaultValue={this.getInTimeFormat(this.props.startTime)} onChange={this.filterChanged} /></div>
          <div><h5>End</h5> <input type="time" ref="endTime" defaultValue={this.getInTimeFormat(this.props.endTime)} onChange={this.filterChanged} /></div>
          <div className="oneRow"><h5>Break Time</h5> <input type="number" id="breakTime" ref="breakTime" defaultValue={this.props.breakTime} onChange={this.filterChanged} />
          <input type="checkbox" ref="breakTimeOver" id="breakTimeOver" defaultChecked={false} onChange={this.filterChanged} />
          </div>
        </div>
        <div>
          <div><h5>Sikum Time</h5> <input type="number" ref="sikumTime" defaultValue={this.props.sikumTime} onChange={this.filterChanged} /></div>
          <div><h5>Initial Speaker Time</h5> <input type="number" ref="speakerTimeInitial" defaultValue={this.props.speakerTimeInitial} onChange={this.filterChanged} /></div>
        </div>
      </div>
    )
  }
});
