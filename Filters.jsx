Filters = new React.createClass({
  render() {
    return (
      <div className="FiltersSec">
      <div><h3>Start:</h3> <input type="time" ref="startTime" defaultValue="00:00" /></div>
      <div><h3>End:</h3> <input type="time" ref="endTime" defaultValue="00:00" /></div>
      <div><h3>Break Time:</h3> <input type="number" ref="breakTime" defaultValue="0" /></div>
      <div><h3>Sikum Time:</h3> <input type="number" ref="sikumTime" defaultValue="0" /></div>
      <div><h3>Speaker Time:</h3> <input type="number" ref="speakerTime" defaultValue="0" /></div>
      </div>
    )
  }
});
