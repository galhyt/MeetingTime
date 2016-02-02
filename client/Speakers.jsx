Speaker = new React.createClass({
    checkSpeaker() {
        this.props.checkSpeaker(this.props.id);
    },

    removeSpeaker() {
        this.props.removeSpeaker(this.props.id);
    },

    isChecked() {
        if (this.refs.check == null) return false;
        return this.refs.check.checked;
    },

    render() {
        return (
            <div className="oneRow">
              <hr></hr>
              <input type="checkbox" className="SpeakerCheck" id={"check_"+this.props.id} onClick={this.checkSpeaker}
                  disabled={!this.props.active} ref="check" />
              <input type="text" id={this.props.id} key={this.props.key} className="speakerName"
                   />
              <Watch getSpeakerTime={this.props.getSpeakerTime} disabled={!this.props.active} />
              <button onClick={this.removeSpeaker} className="removeSpeaker" disabled={this.isChecked()}>x</button>
            </div>
        );
    }
});

Speakers = new React.createClass({

    isSpeakerActive(indx) {
        return this.props.activeSpeaker == indx;
    },

    getSpeakers() {
        var checkSpeaker = this.props.checkSpeaker;
        var getSpeakerTime = this.props.getSpeakerTime;
        var isSpeakerActive = this.isSpeakerActive;
        var removeSpeaker = this.props.removeSpeaker;

        return this.props.speakers.map(function(item, indx) {
            return (<Speaker name={item.name} id={item.id} key={item.id} checkSpeaker={checkSpeaker}
            getSpeakerTime={getSpeakerTime} active={isSpeakerActive(indx)} removeSpeaker={removeSpeaker} />);
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
