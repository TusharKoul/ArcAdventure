require([
    "esri/Map",
    "esri/views/MapView",
    "esri/WebMap",
    "esri/widgets/Search",
    "esri/widgets/LayerList",
    "esri/layers/FeatureLayer",
    "dojo/domReady!"
], function(
    Map, MapView, WebMap, Search, LayerList, FeatureLayer,
) {

    /************************************************************
     * Creates a new WebMap instance. A WebMap must reference
     * a PortalItem ID that represents a WebMap saved to
     * arcgis.com or an on-premise portal.
     *
     * To load a WebMap from an on-premise portal, set the portal
     * url with esriConfig.portalUrl.
     ************************************************************/
    // var webmap = new WebMap({
    //     portalItem: { // autocasts as new PortalItem()
    //         id: "b4209b90632b484383d54e821d0fc1b6"
    //     }
    // });

     var map = new Map({
        basemap: "streets"
    });

    var view = new MapView({
        map: map,
        center: [-100, 35], //united states
        zoom: 5,
        container: "viewDiv"
    });

    var searchWidget = new Search({
        view: view,
        //container:"search-container"
    });
    view.ui.add(searchWidget, {
        position: "top-left",
        index: 0
      });
    
    view.then(function() {
        var layerList = new LayerList({
            view: view
        });
        view.ui.add(layerList, "top-left");
    });


    view.then(function(){
        // All the resources in the MapView and the map have loaded. Now execute additional processes
        jQueryReady();
        // $(document).ready(jQueryReady);
    }, function(error){
        // Use the errback function to handle when the view doesn't load properly
        console.log("The view's resources failed to load: ", error);
    });

    var template = {
    title: "Marriage in NY, Zip Code: {ZIP}",
    content: "<p>As of 2015, <b>{MARRIEDRATE}%</b> of the population in this zip code is married.</p>" +
      "<ul><li>{FID} people are married</li>" +
      "<li>{FID} have never married</li>" +
      "<li>{FID} are divorced</li></ul>",
    fieldInfos: [{
      fieldName: "FID",
      format: {
        digitSeparator: true, // Use a comma separator for large numbers
        places: 0 // Sets the number of decimal places to 0 and rounds up
      }
    }]
    };

    // Reference the popupTemplate instance in the
    // popupTemplate property of FeatureLayer
    var featureLayer = new FeatureLayer({
        url: "https://services8.arcgis.com/XKQO68YBFBIpiRAM/arcgis/rest/services/ZionNPTrails/FeatureServer",
        outFields: ["*"],
        popupTemplate: template
    });
    var featureLayer1 = new FeatureLayer({
        url: "https://services8.arcgis.com/XKQO68YBFBIpiRAM/arcgis/rest/services/Zion_River_Access/FeatureServer",
        outFields: ["*"],
        popupTemplate: template
    });
    var featureLayer2 = new FeatureLayer({
        url: "https://services8.arcgis.com/XKQO68YBFBIpiRAM/arcgis/rest/services/ZionCampgrounds/FeatureServer2",
        outFields: ["*"],
        popupTemplate: template
    });
    var featureLayer3 = new FeatureLayer({
        url: "https://services8.arcgis.com/XKQO68YBFBIpiRAM/arcgis/rest/services/Zion_Picnic_Tables/FeatureServer",
        outFields: ["*"],
        popupTemplate: template
    });
    var featureLayer4 = new FeatureLayer({
        url: "https://services8.arcgis.com/XKQO68YBFBIpiRAM/arcgis/rest/services/Zion_Visitor_Center/FeatureServer",
        outFields: ["*"],
        popupTemplate: template
    });
    var featureLayer5 = new FeatureLayer({
        url: "https://services8.arcgis.com/XKQO68YBFBIpiRAM/arcgis/rest/services/Zion_Overlooks/FeatureServer",
        outFields: ["*"],
        popupTemplate: template
    });
    map.add(featureLayer);
    map.add(featureLayer1);
    map.add(featureLayer2);
    map.add(featureLayer3);
    map.add(featureLayer4);
    map.add(featureLayer5);
});



function jQueryReady() {
    console.log($("#where-range-picker").value);

    $("#where-range-picker").on("input change", function() {
        let val = $("#where-range-picker").val();
        $("#where-range-input").val(val)
    });

    $("#where-range-input").on("input change", function() {
        let val = $("#where-range-input").val();
        $("#where-range-picker").val(val)
    });

    $('.what-toggle').click(function() {

        if($(this).hasClass('on')) {
            $(this).val('100'); // Set the value of your choice
            $(this).removeClass('on');
            $(this).addClass('off');
            // Set the message of your choice and you can delete +$(this).val() after '
            console.log('option is off');
        }

        else if($(this).hasClass('off')) {
            $(this).val('200'); // Set the value of your choice

            $(this).removeClass('off');
            $(this).addClass('on');

            // Set the message of your choice and you can delete +$(this).val() after '
            console.log('option is on');
        }

    });

}
