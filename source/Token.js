enyo.kind({
  name: "WebLetter.Token",
  kind: "enyo.Control",
  classes: "token",
  topToken: true,
  subToken: false,
  subtokens: [], // subtokens
  multiline: false,
  isOptional: false,
  isEnabled: true,
  saveable: false,
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
    this.subtokens = new Array();
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
    if (this.saveable) {
      this.createComponent({
        name: "saveButton",
        kind: "onyx.Button",
        content: "Save",
        ontap: "saveAllData"
      });
      this.createComponent({
        name: "loadButton",
        kind: "onyx.Button",
        content: "Load",
        ontap: "loadAllData"
      });
    }
    this.$.descr.setContent(this.getDescription() + ":");
    if (this.subToken) {
      this.setKey(this.owner.getKey() + "-" + this.getSubkey());
      this.owner.addSubToken(this);
    }
    this.doNewToken();
  },
  getInput: function() {
    return this.$.input.getValue();
  },
  setInput: function(value) {
    this.$.input.setValue(value);
  },
  buttonToggle: function(inSender, inEvent) {
    if (this.$.toggle.getValue()) {
      this.enableToken();
    }
    else {
      this.disableToken();
    }
  },
  saveAllData: function(inSender, inEvent) {
    this.saveData();
    for (i in this.subtokens) {
      this.subtokens[i].saveAllData();
    }
  },
  saveData: function() {
    enyo.log("saving: " + this.key + "=" + this.getInput());
    LocalStorage.set(this.key, this.getInput());
  },
  loadAllData: function(inSender, inEvent) {
    this.loadData();
    for (i in this.subtokens) {
      this.subtokens[i].loadAllData();
    }
  },
  loadData: function() {
    this.setInput(LocalStorage.get(this.key));
  },
  enableToken: function() {
    this.isEnabled = true;
    if (this.isOptional) {
      this.$.toggle.setValue(true);
    }
    this.enableInputs();
    for (i in this.subtokens) {
     this.subtokens[i].enableToken();
    }
  },
  disableToken: function() {
    this.isEnabled = false;
    if (this.isOptional) {
      this.$.toggle.setValue(false);
    }
    this.disableInputs();
    for (i in this.subtokens) {
     this.subtokens[i].disableToken();
    }
  },
  enableInputs: function() {
    this.$.input.setDisabled(false);
  },
  disableInputs: function() {
    this.$.input.setDisabled(true);
  },
  addSubToken: function(token) {
    enyo.log(this.name + ": add token " + token.name);
    this.subtokens.push(token);
  }
});
