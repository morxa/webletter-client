enyo.kind({
  name: "WebLetter.Token",
  kind: "enyo.Control",
  classes: "token",
  topToken: true,
  subToken: false,
  multiline: false,
  isOptional: false,
  isEnabled: true,
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
    if (this.isOptional) {
      this.createComponent({
        name: "toggle",
        kind: "onyx.ToggleButton",
        onContent: "on",
        offContent: "off",
        value: this.$.isEnabled
      });
    }
    this.$.descr.setContent(this.getDescription() + ":");
    if (this.isEnabled) {
      if (this.topToken && !this.subToken) {
        this.doNewToken();
      }
      if (this.subToken) {
        this.setKey(this.owner.getKey() + "-" + this.getSubkey());
        this.doNewToken();
      }
    }
  },
  getInput: function() {
    return this.$.input.getValue();
  }

});
