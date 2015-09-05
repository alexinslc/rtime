Template.home.events({
  'submit': function(event) {
    event.preventDefault();
    var newView = {
      chatcode: "derperer"
    };
    View.insert(newView);
  }
});


