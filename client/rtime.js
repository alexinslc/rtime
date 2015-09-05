if (Meteor.isClient) {
  // Session.set('ready1', "");
  // Session.set('ready2', "");
  Session.set('name1', "Seth");
  Session.set('name2', "Jenna");
  Session.set('ready1',0);
  Session.set('ready2',0);

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

  Template.vidBox.helpers({
    // counter: function () {
    //   return Session.get('counter');
    // }
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

  Template.vidBox.events({
    // 'click button': function () {
    //   // increment the counter when button is clicked
    //   Session.set('counter', Session.get('counter') + 1);
    // }
  });


  function readyCheck (){
    if(Session.get('ready1') && Session.get('ready2')) {
      console.log ("They're both ready");


    }
  }
}
