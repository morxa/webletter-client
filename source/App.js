enyo.kind({
	name: "App",
	kind: "FittableRows",
	fit: true,
  tokens: [],
  lastGroupID: 1,
	components:[
    {kind: WebLetter.Config, name: "config"},
		{
      kind: "onyx.Toolbar",
      layoutKind: "FittableColumnsLayout",
      components: [
        {content: "WebLetter"},
        {fit: true},
        {kind: "onyx.Button", name: "clear", content: "Clear Form", ontap: "clearForm"}
    ]},
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
        {kind: "onyx.Groupbox", name: "addressees", components: [
          {kind: "WebLetter.AddressToken", name: "addressee1", description: "Addressee 1", key: "to", isStatic: false, groupID: 1}
          ]
        },
        {kind: "onyx.Button", name: "newAdressee", content: "Add Addressee", ontap: "addAddressee"},
          {kind: "onyx.Groupbox", name: "contentGroup", components: [
          {kind: "WebLetter.TextToken", description: "Subject", key: "subject", isOptional: true},
          {kind: "WebLetter.TextToken", description: "Opening", key: "opening"},
          {kind: "WebLetter.TextAreaToken", name: "lettercontent", allowHtml: true, key: "content", description: "Content", inputWidth: "100%", inputHeight: "400px"},
          {kind: "WebLetter.TextToken", key: "closing", description: "Closing"},
          {kind: "WebLetter.TextToken", key: "signatureaddition", description: "Signature Addition", isOptional: true, isEnabled: false},
          {kind: "WebLetter.TextToken", key: "ps", description: "PS", isOptional: true, isEnabled: false},
          {kind: "WebLetter.TextToken", key: "encl", description: "Enclosure", isOptional: true, isEnabled: false}
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
  sendJSONRequest: function(request) {
    var ajax = new enyo.Ajax({
      url: this.$.config.getServerUrl(),
      method: "GET",
      contentType: "application/json"
    });
    ajax.go({
      q: request
    });
    ajax.response(this, function(inSender, inResponse) {
      enyo.log(inResponse);
      //var blob = new Blob([inResponse], {type: "text/plain"});
      //saveAs(blob, "letter.txt");
    });
  },
  go: function() {
    //this.$.mylogger.addContent(this.$.lettercontent.getValue());
    this.$.pdfform.destroyComponents();
    // JSON request
    var request = new Object();
    request.tokens = new Array();

    //autosave
    for (i in this.tokens) {
      this.tokens[i].saveAllData(this, "autosave");
    }

    request.tokens = this.tokens;
    this.$.pdfform.createComponent({tag: "input", attributes: {name: "q", value: JSON.stringify(request)}});
    this.$.pdfform.render();
    if (this.$.config.getDebugging()) {
      enyo.log("Stringify request: " + JSON.stringify(request));
    }
    else {
      document.getElementById(this.$.pdfform.getAttribute("id")).submit();
    }
  },
  addAddressee: function() {
    groupID = this.nextGroupID();
    enyo.log("adding new addressee with group ID " + groupID);
    this.$.addressees.createComponent(
    {
      kind: "WebLetter.AddressToken",
      name: "addressee" + groupID,
      description: "Addressee " + groupID,
      key: "to",
      isStatic: false,
      groupID: groupID}
      );
    this.$.addressees.render();
    return true;
  },
  nextGroupID: function() {
    this.lastGroupID += 1;
    return this.lastGroupID;
  },
  clearForm: function() {
    for (i in this.tokens) {
      this.tokens[i].clear();
    }
  }
});
