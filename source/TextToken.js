enyo.kind({
  name: "WebLetter.TextToken",
  kind: "WebLetter.Token",
  components: [
    {kind: "onyx.InputDecorator", components: [
      {name: "descr", classes: "pad-right"},
      {kind: "onyx.Input", name: "input"}
      ]
    }
  ],
  create: function() {
    this.inherited(arguments);
  },
  getValue: function() {
    return this.$.input.getValue();
  }
});


