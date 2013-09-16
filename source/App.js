enyo.kind({
	name: "App",
	kind: "FittableRows",
	fit: true,
  tokens: [],
	components:[
		{kind: "onyx.Toolbar", content: "WebLetter"},
		{kind: "enyo.Scroller", fit: true,
      components: [
			{name: "main", classes: "nice-padding", allowHtml: true, components: [
        {kind: "onyx.Groupbox", name: "settings", components: [
          {kind: "WebLetter.BooleanToken", key: "folding", description: "Folding Marks"},
          {kind: "WebLetter.BooleanToken", key: "togglefromphone", description: "Phone"},
          {kind: "WebLetter.BooleanToken", key: "togglefromlogo", description: "Logo"}
          ]
        },
        {kind: "WebLetter.AddressToken", name: "addresser", description: "Addresser", key: "from"},
        {kind: "WebLetter.AddressToken", name: "addressee", description: "Addressee", key: "to"},
        {kind: "onyx.Groupbox", name: "contentGroup", components: [
          {kind: "WebLetter.TextToken", description: "Subject", key: "subject", isOptional: true},
          {kind: "WebLetter.TextToken", description: "Opening", key: "opening"},
          {kind: "WebLetter.TextAreaToken", name: "lettercontent", allowHtml: true, key: "content", description: "Content", inputWidth: "800px", inputHeight: "400px"},
          {kind: "WebLetter.TextToken", key: "closing", description: "Closing"}
          ]
        },
        {tag: "form", name: "pdfform", attributes: {action: "http://localhost/webletter/server/letter.php", method: "post"}, showing: false},
          {kind: "onyx.Button", name: "go", content: "Generate PDF", ontap: "go"}
        ]
      }
		]}
	],
  create: function() {
    this.tokens = new Array();
    this.inherited(arguments);
  },
  handlers: {
    onNewToken: "registerToken",
    onDisableToken: "deregisterToken"
  },
  registerToken: function(inSender, inEvent) {
    this.tokens.push(inEvent.originator);
    return true;
  },
  deregisterToken: function(inSender, inEvent) {
    var index = this.tokens.indexOf(inEvent.originator);
    while (index != -1) {
      this.tokens.splice(index, 1);
      index = this.tokens.indexOf(inEvent.originator);
    }
    return true;
  },
  go: function() {
    //this.$.mylogger.addContent(this.$.lettercontent.getValue());
    this.$.pdfform.destroyComponents();
    for (i in this.tokens) {
      if (this.tokens[i].isEnabled) {
        // add opt-token if the token is optional
        if (this.tokens[i].isOptional) {
          var key = "%opt-token-" + this.tokens[i].key;
          this.$.pdfform.createComponent({tag: "input", attributes: {name: key, value: ""}});
        }
        if (this.tokens[i].topToken) {
          var type;
          var content = "";
          var value = "";
          if (this.tokens[i].multiline) {
            type = "textarea";
            content = this.tokens[i].getInput();
          } else {
            type = "input";
            value = this.tokens[i].getInput();
          }
          var keyprefix = "token-";
          var key = keyprefix + this.tokens[i].key;
          this.$.pdfform.createComponent({tag: type, attributes: {name: key, value: value}, content: content});
        }
      }
      else { // !this.tokens[i].isEnabled
        // only add the nopt token
        if (this.tokens[i].isOptional) {
          var key = "%nopt-token-" + this.tokens[i].key;
          this.$.pdfform.createComponent({tag: "input", attributes: {name: key, value: ""}});
        }
      }
    }
    this.$.pdfform.render();
    document.getElementById(this.$.pdfform.getAttribute("id")).submit();
  }

});
