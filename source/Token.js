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
    onNewToken: "",
    onDisableToken: ""
  },
  create: function(args) {
    this.inherited(arguments);
    if (this.isOptional) {
      this.createComponent({
        name: "toggle",
        kind: "onyx.ToggleButton",
        onContent: "on",
        offContent: "off",
        onChange: "buttonToggle"
      });
      this.$.toggle.value = this.isEnabled;
    }
    this.$.descr.setContent(this.getDescription() + ":");
    if (this.isEnabled) {
      if (this.subToken) {
        this.setKey(this.owner.getKey() + "-" + this.getSubkey());
      }
      this.doNewToken();
    }
  },
  getInput: function() {
    return this.$.input.getValue();
  },
  buttonToggle: function(inSender, inEvent) {
    if (this.$.toggle.getValue()) {
      this.isEnabled = true;
      this.enableInputs();
      this.doNewToken();
    }
    else {
      this.isEnabled = false;
      this.disableInputs();
      this.doDisableToken();
    }
  },
  enableInputs: function() {
    this.$.input.setDisabled(false);
  },
  disableInputs: function() {
    this.$.input.setDisabled(true);
  }
});
