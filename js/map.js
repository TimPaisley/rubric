require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/Search",
  "esri/tasks/support/Query",
  "esri/tasks/QueryTask"
], function(Map, MapView, FeatureLayer, Search, Query, QueryTask) {
  const property = new FeatureLayer({
    url:
      "https://gis.wcc.govt.nz/arcgis/rest/services/PropertyAndBoundaries/Property/MapServer"
  });

  const referenceLayers = [
    {
      name: "zone",
      id: "59",
      field: "dp_zone"
    },
    {
      name: "specialResidentialArea",
      id: "36",
      field: "Area_Name"
    },
    {
      name: "hazardFaultLineArea",
      id: "49",
      field: "status"
    }
  ];

  var map = new Map({
    basemap: "dark-gray-vector",
    layers: [property]
  });

  view = new MapView({
    container: "map",
    map: map,
    center: [174.78060739454546, -41.29645326918087],
    zoom: 10
  });

  var searchWidget = new Search({
    view: view,
    allPlaceholder: "Enter an Address",
    includeDefaultSources: false,
    sources: [
      {
        layer: property,
        searchFields: ["FullAddress"],
        displayField: "FullAddress",
        exactMatch: false,
        outFields: [
          "FullAddress",
          "StreetNumber",
          "StreetName",
          "Suburb",
          "PostCode",
          "Title",
          "ValuationID",
          "ValuationWUFI"
        ],
        name: "District Plan Zones",
        placeholder: "Enter an Address"
      }
    ]
  });

  view.ui.add(searchWidget, {
    position: "top-right"
  });

  generateImageServerURL = bbox => {
    return (
      "http://gis.wcc.govt.nz/arcgis/services/Imagery/Imagery2017/ImageServer/WMSServer" +
      "?width=300&height=300&format=image%2Fpng&request=GetMap&service=WMS" +
      "&transparent=true&version=1.3.0&crs=EPSG%3A3857&layers=0&bbox=" +
      bbox
    );
  };

  // default for development
  app.ports.selectMapProperty.send({
    zone: "Inner Residential",
    fullAddress: "101 Wakefield Street, Wellington Central",
    postCode: "6011",
    specialResidentialArea: "IR 3 - Aro Valley",
    streetName: "Wakefield Street",
    streetNumber: "101",
    suburb: "Wellington Central",
    title: "724107",
    valuationId: "17270-11800",
    valuationWufi: 1921748,
    imageUrl: generateImageServerURL(
      "19456000.33%2C-5055336.81%2C19456337.49%2C-5054883.31"
    )
  });

  searchWidget.on("select-result", function(event) {
    var attributes = event.result.feature.attributes;

    var extent = event.result.feature.geometry.extent;
    var bbox = [extent.xmin, extent.ymin, extent.xmax, extent.ymax].join("%2C");

    var property = {
      fullAddress: attributes.FullAddress,
      streetNumber: attributes.StreetNumber,
      streetName: attributes.StreetName,
      suburb: attributes.Suburb,
      postCode: attributes.PostCode,
      title: attributes.Title,
      valuationId: attributes.ValuationID,
      valuationWufi: attributes.ValuationWUFI,
      imageUrl: generateImageServerURL(bbox)
    };

    promises = [];
    var urlBase =
      "http://gis.wcc.govt.nz/arcgis/rest/services/DistrictPlan/DistrictPlan/MapServer/";

    referenceLayers.forEach(({ name, id, field }) => {
      var qt = new QueryTask(urlBase + id);
      var q = new Query();

      q.geometry = event.result.feature.geometry;
      q.spatialRelationship = "intersects";
      q.returnGeometry = false;
      q.outFields = [field];

      var p = qt.execute(q);
      promises.push(p);
    });

    Promise.all(promises).then(res => {
      referenceLayers.forEach(({ name, field }, i) => {
        if (res[i].src) {
          property["image"] = res.src;
        } else if (res[i].features[0]) {
          property[name] = res[i].features[0].attributes[field];
        }
      });

      console.log(property);
      app.ports.selectMapProperty.send(property);
    });
  });
});
