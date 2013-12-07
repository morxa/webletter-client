enyo.kind({
	name: "App",
	kind: "FittableRows",
	fit: true,
  tokens: [],
	components:[
    {kind: WebLetter.Config, name: "config"},
		{kind: "onyx.Toolbar", content: "WebLetter"},
		{kind: "enyo.Scroller", fit: true,
      components: [
			{name: "main", classes: "nice-padding", allowHtml: true, components: [
        {kind: "onyx.Groupbox", name: "settings", components: [
          {kind: "WebLetter.BooleanToken", key: "folding", description: "Folding Marks"},
          {kind: "WebLetter.BooleanToken", key: "footer", description: "Footer"},
          {kind: "WebLetter.BooleanToken", key: "logo", description: "Logo"}
          ]
        },
        {kind: "WebLetter.AddressToken", name: "addresser", description: "Addresser", key: "from"},
        {kind: "WebLetter.AddressToken", name: "addressee", description: "Addressee", key: "to"},
        {kind: "onyx.Groupbox", name: "contentGroup", components: [
          {kind: "WebLetter.TextToken", description: "Subject", key: "subject", isOptional: true},
          {kind: "WebLetter.TextToken", description: "Opening", key: "opening"},
          {kind: "WebLetter.TextAreaToken", name: "lettercontent", allowHtml: true, key: "content", description: "Content", inputWidth: "100%", inputHeight: "400px"},
          {kind: "WebLetter.TextToken", key: "closing", description: "Closing"},
          {kind: "WebLetter.TextToken", key: "signatureaddition", description: "Signature Addition", isOptional: true}
          ]
        },
        {tag: "form", name: "pdfform", showing: false},
          {kind: "onyx.Button", name: "go", content: "Generate PDF", ontap: "go"}
        ]
      }
		]}
	],
  create: function() {
    this.tokens = new Array();
    this.inherited(arguments);
    // set up form
    this.$.pdfform.attributes.method=this.$.config.getMethod();
    this.$.pdfform.attributes.action=this.$.config.getServerUrl();
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
    // do nothing since disabled tokens might be optional and
    // need the %nopt-token to be replaced
    return true;
  },
  go: function() {
    //this.$.mylogger.addContent(this.$.lettercontent.getValue());
    this.$.pdfform.destroyComponents();
    for (i in this.tokens) {
      if (this.tokens[i].isEnabled) {
        // add opt-token if the token is optional
        if (this.tokens[i].isOptional) {
          var key = "%opt-" + this.tokens[i].key;
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
          var key = "%nopt-" + this.tokens[i].key;
          this.$.pdfform.createComponent({tag: "input", attributes: {name: key, value: ""}});
        }
      }
    }
    this.$.pdfform.render();
    if (this.$.config.getDebugging()) {
      var components = this.$.pdfform.getComponents();
      for (i in components) {
        var attrs = components[i].attributes;
        enyo.log("'" + attrs.name + "': '" + attrs.value + "'");
      }
    }
    else {
      document.getElementById(this.$.pdfform.getAttribute("id")).submit();
    }
  }

});
