enyo.kind({
  name: "WebLetter.AddressToken",
  kind: "WebLetter.Token",
  style: "margin: 0px; padding: 0px;",
  topToken: false,
  components: [
    {kind: "onyx.Groupbox", components: [
      {kind: "onyx.GroupboxHeader", name: "descr"},
      {kind: "WebLetter.TextToken", name: "name", description: "Name", subkey: "name", subToken: true},
      {kind: "WebLetter.TextToken", name: "street", description: "Street", subkey: "street", subToken: true},
      {kind: "WebLetter.TextToken", name: "zip", description: "ZIP Code", subkey: "zip", subToken: true},
      {kind: "WebLetter.TextToken", name: "city", description: "City", subkey: "city", subToken: true}
    ]}],
  getInput: function() {
    var res = this.$.name.getValue()
    + "\\\\"
    + this.$.street.getValue()
    + "\\\\"
    + this.$.zip.getValue()
    + " "
    + this.$.city.getValue();
    return res;
  },
  enableInputs: function() { },
  disableInputs: function() { },
  saveData: function() { },
  loadData: function() { }
});
    

