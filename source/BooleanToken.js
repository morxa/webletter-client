enyo.kind({
  name: "WebLetter.BooleanToken",
  kind: "WebLetter.Token",
  isOptional: true,
  components: [
    {tag: "span", name: "descr", classes: "nice-padding"}
    //{kind: "onyx.ToggleButton", name: "input", onContent: "yes", offContent: "no"}
  ],
  getInput: function() {
    return this.$.toggle.getValue();
  }
});
