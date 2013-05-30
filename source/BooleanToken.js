enyo.kind({
  name: "WebLetter.BooleanToken",
  kind: "WebLetter.Token",
  components: [
    {tag: "span", name: "descr", classes: "nice-padding"},
    {kind: "onyx.ToggleButton", name: "input", onContent: "yes", offContent: "no"}
  ],
  getInput: function() {
    if (this.$.input.getValue()) {
      return "true";
    }
    else {
      return "false";
    }
  }
});
