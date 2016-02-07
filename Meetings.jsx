if (Meteor.isServer) {
    // This code is executed on the client only
    Meteor.startup(function () {
        publishForAdmin();
    });
}
Router.onBeforeAction(function() {
  
    this.next();
  });

Router.route('', function () {
    if (Meteor.isClient) {
        var url = '';
        var sessionId = Session.get('sessionId');
        if (sessionId != null) {
            url = '/'+sessionId;
        }
        else {
            url += '/SetMeeting'; 
        }
        
        window.location.replace(url);
        this.response.end();
    }
});

Router.route('/SetMeeting', function () {
    var adminId = Meteor.userId();
    var _id = Meetings.insert({name:"", adminId: adminId});
    Session.set("sessionId", _id);
    renderApp(_id, adminId);
});   

Router.route('/:sessionId', function () {
    console.log('route "/:sessionId"');
    var params = this.params;
    renderApp(params.sessionId, Meteor.userId());
});
/*
Router.route('/:sessionId/:adminId', function () {
    console.log('route "/:sessionId/:adminId"');
    var params = this.params;
    renderApp(params.sessionId,params.adminId);
});
*/
function publishForAdmin() {
    if (Meteor.isServer) {
        Meetings.allow({
            insert: function(userId, post) {
                return true;
            },
            
            update: function(userId, post, fieldNames, modifier) {
                return post.adminId == userId;
            },
            
            remove: function(userId, post) {
                return post.adminId == userId;
            }
        });
        
        Meteor.publish("meeting", function () {
            return Meetings.find({adminId: this.userId});
        });
        
    }
    else {
        Meteor.subscribe("meeting");
    }
}

function renderApp(meetingId, adminId) {
    if (Meteor.isClient) {
        // This code is executed on the client only
        Meteor.startup(function () {
            // Use Meteor.startup to render the component after the page is ready
            React.render(<App MeetingId={meetingId} AdminId={adminId} />, document.getElementById("render-target"));
        });
    }
}