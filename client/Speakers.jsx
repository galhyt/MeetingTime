Speaker = new React.createClass({
    checkSpeaker() {
        this.props.checkSpeaker(this.props.id);
    },
    
    render() {
        return (
            <div>
            <hr></hr>
            <input type="checkbox" className="SpeakerCheck" id={"check_"+this.props.id} onClick={this.checkSpeaker}
                disabled={!this.props.active} />
            <input type="text" value={this.props.name} id={this.props.id} key={this.props.key} className="speakerName"
                 />
            <Watch getSpeakerTime={this.props.getSpeakerTime} disabled={!this.props.active} />
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
        
        return this.props.speakers.map(function(item, indx) {
            return (<Speaker name={item.name} id={item.id} key={item.id} checkSpeaker={checkSpeaker}
            getSpeakerTime={getSpeakerTime} active={isSpeakerActive(indx)} />);
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
