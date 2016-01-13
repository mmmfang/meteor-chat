Messages = new Mongo.Collection("msgs");

Meteor.methods({
  sendMessage: function (messageText) {
    /* add authentication here */
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Messages.insert({
      messageText: messageText,
      createdAt: new Date(),
      username: Meteor.user().username
    });
  }
});

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("messages", function () {
    return Messages.find({}, {sort: {createdAt: -1}, limit: 5});
  });
}

/* scrolling code */

if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("messages");

  /* helper code */
    Template.body.helpers({
    recentMessages: function () {
      return Messages.find({}, {sort: {createdAt: 1}});
    },
    /* unread message helper */
  });

  /*chat window scrolling*/

  /*events*/
    Template.body.events({
    "submit .new-message": function (event) {
      var text = event.target.text.value;

      Meteor.call("sendMessage", text);

      event.target.text.value = "";
      event.preventDefault();
    },

    /* scroll event */

  });

  /*account config*/
    /*account config*/
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}