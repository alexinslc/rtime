if (Meteor.isClient) {
  // Session.set('ready1', "");
  // Session.set('ready2', "");
  Session.set('name1', "Seth");
  Session.set('name2', "Jenna");
  Session.set('ready1',0);
  Session.set('ready2',0);

  // var yt_int, yt_players={},
  // initYT = function() {
  //     $(".ytplayer").each(function() {
  //         yt_players[this.id] = new YT.Player(this.id);
  //     });
  // };
  // $.getScript("//www.youtube.com/player_api", function() {
  //     yt_int = setInterval(function(){
  //         if(typeof YT === "object"){
  //             initYT();
  //             clearInterval(yt_int);
  //         }
  //     },2000 );
  // });

  Template.person1.helpers({
    name1: function () {
      return Session.get('name1');
    }
  });

  Template.person2.helpers({
    name2: function () {
      return Session.get('name2');
    }
  });

  Template.count_down_timer.helpers({
    count_down: function () {
      return Session.get('count_down');
    }
  });

  Template.person1.events({
    'click #per_but1': function () {
      $('#per_but1').prop('innerHTML', "READY!");
      $('#per_but2').prop('innerHTML', "waiting...  " + Session.get('name2'));
      Session.set('ready1',1);
      readyCheck();
    }
  });

  Template.person2.events({
    'click #per_but2': function () {
      $('#per_but2').prop('innerHTML', "READY!");
      Session.set('ready2',1);
      readyCheck();
    }
  });

  function readyCheck (){
    if(Session.get('ready1') && Session.get('ready2')) {
      console.log ("They're both ready");
      yt_players['player'].playVideo();

    }
  }
}

Template.vidChat.events({
  "click #makeCall": function () {
    var outgoingCall = peer.call($('#remotePeerId').val(), window.localStream);
    window.currentCall = outgoingCall;
    outgoingCall.on('stream', function (remoteStream) {
      window.remoteStream = remoteStream;
      $('#theirVideo').prop('src', URL.createObjectURL(remoteStream));
    });
  },
  "click #endCall": function () {
    window.currentCall.close();
  }
});

Template.vidChat.onCreated(function () {
    window.peer = new Peer({
    key: '2p9ffp7ol6p3nmi',  // change this key
    debug: 3,
    config: {'iceServers': [
      { url: 'stun:stun.l.google.com:19302' },
      { url: 'stun:stun1.l.google.com:19302' },
    ]}
  });

  peer.on('open', function () {
    $('#myPeerId').text(peer.id);
  });

  // This event: remote peer receives a call
  peer.on('call', function (incomingCall) {
    window.currentCall = incomingCall;
    incomingCall.answer(window.localStream);
    incomingCall.on('stream', function (remoteStream) {
      window.remoteStream = remoteStream;
      $('#theirVideo').prop('src', URL.createObjectURL(remoteStream));
    });
  });
});

navigator.getUserMedia = ( navigator.getUserMedia ||
                  navigator.webkitGetUserMedia ||
                  navigator.mozGetUserMedia ||
                  navigator.msGetUserMedia );

// get audio/video
navigator.getUserMedia({audio: true, video: true}, function (stream) {
  //display video
  $('#myVideo').prop('src', URL.createObjectURL(stream));
  window.localStream = stream;
}, function (error) { console.log(error); }
);
