require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/Search",
  "esri/tasks/support/Query",
  "esri/tasks/QueryTask",
  "esri/geometry/Extent",
  "esri/geometry/SpatialReference",
  "esri/geometry/geometryEngine"
], function (Map, MapView, FeatureLayer, Search, Query, QueryTask, Extent, SpatialReference, geometryEngine) {
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
      field: "gis1_vector_GISADM_dp_hazards_f"
    }
  ];

  var map = new Map({
    basemap: "gray-vector",
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
    container: "search-widget",
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

  generateImageServerURL = bbox => {
    return (
      "http://gis.wcc.govt.nz/arcgis/services/Imagery/Imagery2017/ImageServer/WMSServer" +
      "?width=300&height=300&format=image%2Fpng&request=GetMap&service=WMS" +
      "&transparent=true&version=1.3.0&crs=EPSG%3A3857&layers=0&bbox=" +
      bbox
    );
  };

  searchWidget.on("select-result", function (event) {
    var attributes = event.result.feature.attributes;

    var bounds = event.result.feature.geometry.extent;
    var extent = new Extent(bounds.xmin, bounds.ymin, bounds.xmax, bounds.ymax, new SpatialReference({ wkid: 3857 }));
    var buffer = geometryEngine.geodesicBuffer(extent.center, Math.max(extent.width, extent.height) / 2, "meters");
    var bbox = [buffer.extent.xmin, buffer.extent.ymin, buffer.extent.xmax, buffer.extent.ymax].join("%2C");

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
          property[name] = res[i].features[0].attributes[field].toString();
        }
      });

      console.log(property);
      app.ports.selectMapProperty.send(property);
    });
  });
});
