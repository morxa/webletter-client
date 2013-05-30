enyo.kind({
  name: "WebLetter.Token",
  kind: "enyo.Control",
  classes: "token",
  topToken: true,
  multiline: false,
  published: {
    description: "",
    key: ""
  },
  events: {
    onNewToken: ""
  },
  create: function(args) {
    this.inherited(arguments);
    this.$.descr.setContent(this.getDescription() + ":");
    if (this.topToken) {
      this.doNewToken();
    }
  },
  getInput: function() {
    return this.$.input.getValue();
  }

});
