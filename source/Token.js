enyo.kind({
  name: "WebLetter.Token",
  kind: "enyo.Control",
  classes: "token",
  topToken: true,
  subToken: false,
  multiline: false,
  published: {
    description: "",
    key: "",
    subkey: ""
  },
  events: {
    onNewToken: ""
  },
  create: function(args) {
    this.inherited(arguments);
    this.$.descr.setContent(this.getDescription() + ":");
    if (this.topToken && !this.subToken) {
      this.doNewToken();
    }
    if (this.subToken) {
      this.setKey(this.owner.getKey() + "-" + this.getSubkey());
      this.doNewToken();
    }
  },
  getInput: function() {
    return this.$.input.getValue();
  }

});
