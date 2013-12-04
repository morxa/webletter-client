enyo.kind({
  name: "WebLetter.TextToken",
  kind: "WebLetter.Token",
  published: {
    inputWidth: "100%"
  },
  components: [
    {kind: "onyx.InputDecorator", components: [
      {name: "descr", classes: "pad-right"},
      {kind: "onyx.Input", name: "input"}
      ]
    }
  ],
  create: function() {
    this.inherited(arguments);
    this.$.input.applyStyle("width", this.getInputWidth());
  },
  inputWidthChanged: function(oldValue) {
    this.$.input.applyStyle("width", this.getInputWidth());
  },
  getValue: function() {
    return this.$.input.getValue();
  }
});


