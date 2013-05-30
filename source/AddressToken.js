enyo.kind({
  name: "WebLetter.AddressToken",
  kind: "WebLetter.Token",
  style: "margin: 0px; padding: 0px;",
  components: [
    {kind: "onyx.Groupbox", components: [
      {kind: "onyx.GroupboxHeader", name: "descr"},
      {kind: "WebLetter.TextToken", name: "name", description: "Name", topToken: false},
      {kind: "WebLetter.TextToken", name: "street", description: "Street", topToken: false},
      {kind: "WebLetter.TextToken", name: "zip", description: "ZIP Code", topToken: false},
      {kind: "WebLetter.TextToken", name: "city", description: "City", topToken: false}
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
  }
});
    

