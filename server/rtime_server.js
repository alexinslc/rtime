if (Meteor.isServer) {
  var videoId;
  var timer = 5;
  var user1 = "";
  var user2 = "";

  Meteor.startup(function () {
  	Meteor.methods({
      'active': function(uuid) {
          if (user1 ===""){
            user1 = uuid;
            Active.insert({'user1': user1})
          } else if (user2 === ""){
            user2 = uuid;
            Active.insert({'user2': user2})
          }

      },

  	  startTimer: function () {

  	  },

      setVideo: function (id) {
        videoId = id;
      },

      readyCheck: function (videoId){
        if (user1 != 1) {
          user1 = 1;
        } else if (user2 != 1) {
          user2 = 1;
        } else {
          if(user1 && user2) {
            console.log ("They're both ready");
            player = $('#background-video').data('ytPlayer').player
            player.cueVideoById(videoId);

            startTimer();

            if(timer === 0){
              player.playVideo();
            }
          }
        }
      }
  	});
  });
}
