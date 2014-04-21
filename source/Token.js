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
  isStatic: true,
  groupID: 0,
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
      if (this.isEnabled) {
        this.enableToken();
      }
      else {
        this.disableToken();
      }
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
      this.setKey(this.owner.getKey() + this.getSubkey());
      this.isStatic = this.owner.isStatic;
      this.groupID = this.owner.groupID;
      this.owner.addSubToken(this);
    }
    this.loadData("autosave-");
    this.doNewToken();
  },
  getInput: function() {
    return this.$.input.getValue();
  },
  setInput: function(value) {
    if (this.$.input) {
      this.$.input.setValue(value);
    }
    else {
      enyo.log("component " + this.name + " has no component input");
    }
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
    this.saveData(inEvent);
    for (i in this.subtokens) {
      this.subtokens[i].saveAllData(inSender, inEvent);
    }
  },
  saveData: function(inEvent) {
    if (inEvent == "autosave") {
      enyo.log("autosaving");
      prefix = "autosave-";
    }
    else {
      prefix = "";
    }
    enyo.log("saving: " + prefix + this.key + this.groupID + "=" + this.getInput());
    LocalStorage.set(prefix + this.key + this.groupID, this.getInput());
  },
  loadAllData: function(inSender, inEvent) {
    this.loadData();
    for (i in this.subtokens) {
      this.subtokens[i].loadAllData();
    }
  },
  loadData: function(prefix) {
    if (!prefix) {
      prefix = "";
    }
    enyo.log("loading: " + prefix + this.key + this.groupID);
    this.setInput(LocalStorage.get(prefix + this.key + this.groupID));
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
    if (this.$.input) {
      this.$.input.setDisabled(false);
    }
  },
  disableInputs: function() {
    if (this.$.input) {
      this.$.input.setDisabled(true);
    }
  },
  addSubToken: function(token) {
    enyo.log(this.name + ": add token " + token.name);
    this.subtokens.push(token);
  },
  clear: function() {
    this.setInput("");
    for (i in this.subtokens) {
      this.subtokens[i].clear();
    }
  },
  toJSON: function() {
    return {key: this.getKey(), value: this.getInput(), isOptional: this.isOptional, isEnabled: this.isEnabled, kind: this.kind, isStatic: this.isStatic, groupID: this.groupID};
  }
});
