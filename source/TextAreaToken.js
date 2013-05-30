enyo.kind({
  name: "WebLetter.TextAreaToken",
  kind: "WebLetter.Token",
  multiline: true,
  published: {
    inputWidth: "400px",
    inputHeight: ""
  },
  components: [
    {name: "descr"},
    {kind: "onyx.InputDecorator", style: "vertical-align: text-top;", components: [
      {kind: "onyx.TextArea", name: "input"}
      ]
    }
  ],
  create: function() {
    this.inherited(arguments);
    this.$.input.applyStyle("width", this.getInputWidth());
    if (this.getInputHeight() != "")
      this.$.input.applyStyle("height", this.getInputHeight());
  },
  getValue: function() {
    return this.$.input.getValue();
  }
});
