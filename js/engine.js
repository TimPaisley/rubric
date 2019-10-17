var engine = null;
app.ports.askRubric.subscribe(function(data) {
  console.log(data);

  if (engine) {
    engine.setField("activity", data.scenario.activity);
    engine.setField("address", data.scenario.address);
    engine.setField("valuation_wufi", data.scenario.valuation_wufi);
    engine.setField("zone", data.scenario.zone);
    engine.setField("area_specific_layers", data.scenario.area_specific_layers);
    engine.setField(
      "hazard_fault_line_area",
      data.scenario.hazard_fault_line_area
    );

    engine.process(data.answers).then(() => {
      console.log(engine.standards);
      app.ports.receiveSections.send(engine.standards);
      app.ports.receiveStatus.send(engine.overallActivityStatus);
    });
  } else {
    engine = new Rubric({ fields: data.scenario });
    app.ports.receiveSections.send(engine.standards);
  }
});

app.ports.generatePDF.subscribe(function(data) {
  console.log(data);

  function formatQuestion(data) {
    var result = Object.keys(data).map(function(question, i) {
      var answer = "";
      if (data[question]) {
        answer = data[question].toString();
      }

      return { question: question, answer: answer };
    });

    return result;
  }

  function renderPage(name, key) {
    doc.addPage();
    doc.setFontSize(22);
    doc.text(name, 20, 20);

    doc.setFontSize(16);

    var counter = 0;
    formatQuestion(data[key]).forEach(function(res) {
      counter++;

      doc.setFontSize(16);
      doc.text(res["question"], 20, counter * 20 + 20);

      doc.setFontSize(14);
      doc.text(res["answer"], 20, counter * 20 + 30);

      if (counter % 12 == 0) {
        doc.addPage();

        doc.setFontSize(22);
        doc.text(name + " (continued)", 20, 20);
        doc.setFontSize(16);

        counter = 0;
      }
    });
  }

  var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "portrait" });

  renderPage("Proposal", "proposal");
  renderPage("District Plan Compliance", "answers");
  renderPage("Application Form", "application");

  doc.save();
});
