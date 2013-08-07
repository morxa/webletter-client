enyo.kind({
	name: "App",
	kind: "FittableRows",
	fit: true,
  tokens: [],
	components:[
		{kind: "onyx.Toolbar", content: "WebLetter"},
		{kind: "enyo.Scroller", fit: true,
      components: [
      //{name: "mylogger", content: "log", allowHtml: true},
			{name: "main", classes: "nice-padding", allowHtml: true, components: [
        {kind: "onyx.Groupbox", name: "settings", components: [
          {kind: "WebLetter.BooleanToken", key: "folding", description: "folding marks"}
          ]
        },
        {kind: "WebLetter.AddressToken", name: "addresser", description: "Addresser", key: "addresser"},
        {kind: "WebLetter.AddressToken", name: "addressee", description: "Addressee", key: "addressee"},
        {kind: "onyx.Groupbox", name: "contentGroup", components: [
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
    this.inherited(arguments);
    this.$.tokens = new Array();
  },
  handlers: {
    onNewToken: "registerToken"
  },
  registerToken: function(inSender, inEvent) {
    this.tokens.push(inEvent.originator);
  },
  go: function() {
    //this.$.mylogger.addContent(this.$.lettercontent.getValue());
    this.$.pdfform.destroyComponents();
    for (i in this.tokens) {
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
      this.$.pdfform.createComponent({tag: type, attributes: {name: this.tokens[i].key, value: value}, content: content});
    }
    this.$.pdfform.render();
    document.getElementById(this.$.pdfform.getAttribute("id")).submit();
  }

});
