Watch = new React.createClass({
    getInitialState() {
        return {
            start : true,
            minutes : null,
            seconds : null,
            timeOutHandler: null
        }
    },
    
    getInTimeFormat() {
        if (this.state.minutes == null)
            return "00:00"; 
            
        var t = "";
        t += (this.state.minutes < 10 ? "0" : "") + this.state.minutes;
        t += ":" + (this.state.seconds < 10 ? "0" : "") + this.state.seconds;
        return t;
    },
    
    reduceTime() {
        this.state.seconds--;
        if (this.state.seconds < 0) {
            this.state.seconds = 59;
            this.state.minutes--;
        }
        this.setState(this.state);        
    },
    
    getButtonText() {
        return (this.state.start ? "Start" : "Finish");
    },
    
    click_button() {
        if (this.state.start) {
            if (this.state.minutes == null) {
                var t = this.props.getSpeakerTime();
                this.state.minutes = Math.floor(t);
                this.state.seconds = Math.floor((t - this.state.minutes) * 60);
            }
            this.state.timeOutHandler = setInterval(this.reduceTime, 1000);
        }
        else {
            clearTimeout(this.state.timeOutHandler);
            this.state.timeOutHandler = null;
        }
        
        this.state.start = !this.state.start;
        this.setState(this.state);
    },
    
    render() {
        return (
            <span>
                <input type="text" value={this.getInTimeFormat()} disabled={this.props.disabled} />
                <button onClick={this.click_button} disabled={this.props.disabled}>{this.getButtonText()}</button>
            </span>
        );
    }
});
