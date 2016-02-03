Router.onBeforeAction(function() {
  
    this.next();
  });

Router.route('', function () {
    if (Meteor.isServer) {
        Meetings.allow({
            insert: function(userId, post) {           
                return true;
            }
        });
    }
    var adminId = localStorage["adminId"];
    if (adminId == null) {
        adminId = Random.id();
        localStorage.setItem("adminId", adminId);
    }
    var _id = Meetings.insert({name:"", adminId: adminId});
    localStorage.setItem("sessionId", _id);
    publishForAdmin(_id, adminId);
});   

Router.route('/:sessionId', function () {
    console.log('route "/:sessionId"');
    var params = this.params;
    publishForAdmin(params.sessionId);
});

Router.route('/:sessionId/:adminId', function () {
    console.log('route "/:sessionId/:adminId"');
    var params = this.params;
    publishForAdmin(params.sessionId, params.adminId);
});

function publishForAdmin(sessionId, adminId) {
    if (Meteor.isServer) {
        
        Meteor.publish("meeting", function () {
            return Meetings.find({_id: sessionId});
        });
        
        Speakers.publish("speakers", function () {
            return Speakers.find({meetingId: sessionId});
        });
        
        var meeting = Meetings.find({_id: sessionId});
        if (meeting.length > 0 && meeting.adminId === adminId) {
            Speakers.allow({
                'insert': function(userId, post) {           
                    return (post.meetingId === sessionId)
                },
                'update': function(userId, post, fieldNames, modifier) {
                    return (post.meetingId === sessionId);
                },
                'remove': function (userId, post) {
                    return (post.meetingId === sessionId);
                }
            });
        }
    }
    else {
        Meteor.subscribe("meeting");
        Meteor.subscribe("speakers");
    }
    
}

if (Meteor.isClient) {
  // This code is executed on the client only
  Meteor.startup(function () {
    // Use Meteor.startup to render the component after the page is ready
    React.render(<App sessionId={localStorage["sessionId"]} />, document.getElementById("render-target"));
  });
}

