let trailsLayer;
let waterAccessLayer;
let picnicLayer;
let campLayer;
let visitorLayer;
let hikeLayer;

require([
    "esri/Map",
    "esri/views/MapView",
    "esri/WebMap",
    "esri/widgets/Search",
    "esri/widgets/LayerList",
    "esri/layers/FeatureLayer",
    "esri/symbols/PictureMarkerSymbol",
    "esri/renderers/SimpleRenderer",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "dojo/domReady!"
], function(
    Map, MapView, WebMap, Search, LayerList, FeatureLayer, PictureMarkerSymbol, SimpleRenderer, SimpleMarkerSymbol,SimpleLineSymbol
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
        basemap: "gray"
    });

    var view = new MapView({
        map: map,
        center: [-100, 35], //united states
        zoom: 5,
        container: "viewDiv"
    });

    var searchWidget = new Search({
        view: view,
        map:map,
        container:"search-container"
    });

    searchWidget.on("search-complete",function(event){
        console.log(event);
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


    var addToPlan = {
        title: "Add To Plan",
        id: "add-to-plan",
        image: "addIcon.png"
    };

    var template = {
    title: "{Location}",
    actions: [addToPlan],
    content:
      "<ul><li> Website:  https://www.nps.gov/zion/index.htm</li>" +
      "<li>Description: {Descriptio}</li>" +
      "<li>{FID} are divorced</li></ul>"
    };

    function addToPlanner(event) {
        console.log(event);
        console.log(view.popup.selectedFeature);

    }

    view.popup.on("trigger-action", function(event) {
    // Execute the measureThis() function if the measure-this action is clicked
        if (event.action.id === "add-to-plan") {
            addToPlanner(event);
        }
    });


    // Reference the popupTemplate instance in the
    // popupTemplate property of FeatureLayer

    var line = new SimpleLineSymbol({
        style: "short-dash-dot",
        cap: "round",
        join: "round",
        width: 2,
        color: [0, 169, 230, 1]
    });
    var lineRenderer = new SimpleRenderer({
        symbol:line
    });

    trailsLayer = new FeatureLayer({
        url: "https://services8.arcgis.com/XKQO68YBFBIpiRAM/arcgis/rest/services/ZionNPTrails/FeatureServer",
        outFields: ["*"],
        popupTemplate: template,
        renderer:lineRenderer
    });
    map.add(trailsLayer);


    let waterSymbol = new PictureMarkerSymbol('resources/images/pins/water-access-pin.png', 30, 30);
    var waterRenderer = new SimpleRenderer({
        symbol:waterSymbol
    });
    waterAccessLayer = new FeatureLayer({
        url: "https://services8.arcgis.com/XKQO68YBFBIpiRAM/arcgis/rest/services/Zion_River_Access/FeatureServer",
        outFields: ["*"],
        popupTemplate: template,
        renderer:waterRenderer
    });
    map.add(waterAccessLayer);


    let campSymbol = new PictureMarkerSymbol('resources/images/pins/camp-pin.png', 30, 30);
    var campRenderer = new SimpleRenderer({
        symbol:campSymbol
    });
    campLayer = new FeatureLayer({
        url: "https://services8.arcgis.com/XKQO68YBFBIpiRAM/arcgis/rest/services/ZionCampgrounds/FeatureServer2",
        outFields: ["*"],
        popupTemplate: template,
        renderer:campRenderer
    });
    map.add(campLayer);


    let picnicSymbol = new PictureMarkerSymbol('resources/images/pins/picnic-pin.png', 30, 30);
    var picnicRenderer = new SimpleRenderer({
        symbol:picnicSymbol
    });
    picnicLayer = new FeatureLayer({
        url: "https://services8.arcgis.com/XKQO68YBFBIpiRAM/arcgis/rest/services/Zion_Picnic_Tables/FeatureServer",
        outFields: ["*"],
        popupTemplate: template,
        renderer:picnicRenderer
    });
    map.add(picnicLayer);


    let visitorSymbol = new PictureMarkerSymbol('resources/images/pins/visitor-pin.png', 30, 30);
    var visitorRenderer = new SimpleRenderer({
        symbol:visitorSymbol
    });
    visitorLayer = new FeatureLayer({
        url: "https://services8.arcgis.com/XKQO68YBFBIpiRAM/arcgis/rest/services/Zion_Visitor_Center/FeatureServer",
        outFields: ["*"],
        popupTemplate: template,
        renderer:visitorRenderer
    });
    map.add(visitorLayer);


    let hikeSymbol = new PictureMarkerSymbol('resources/images/pins/hike-pin.png', 30, 30);
    var hikeRenderer = new SimpleRenderer({
        symbol:hikeSymbol
    });
    hikeLayer = new FeatureLayer({
        url: "https://services8.arcgis.com/XKQO68YBFBIpiRAM/arcgis/rest/services/Zion_Overlooks/FeatureServer",
        outFields: ["*"],
        popupTemplate: template,
        renderer:hikeRenderer
    });
    map.add(hikeLayer);


    var featureLayer6 = new FeatureLayer({
        url: "https://services8.arcgis.com/XKQO68YBFBIpiRAM/arcgis/rest/services/NPS_Boundary/FeatureServer",
        outFields: ["*"],
        popupTemplate: template
    });
    map.add(featureLayer6);
    var featureLayer7 = new FeatureLayer({
        url: "https://services8.arcgis.com/XKQO68YBFBIpiRAM/arcgis/rest/services/USFS_boundaries/FeatureServer",
        outFields: ["*"],
        popupTemplate: template
    });
    map.add(featureLayer7);


    // map.add(featureLayer1);
    // map.add(featureLayer2);
    // map.add(featureLayer3);
    // map.add(featureLayer4);
    // map.add(featureLayer5);
    // map.add(featureLayer6);
    // map.add(featureLayer7);


    let jQueryReady = function() {
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
                $(this).removeClass('on');
                $(this).addClass('off');

                let newSource = $(this).find('img').attr('src').replace("blue","gray");
                $(this).find('img').attr('src',newSource);

                let newHoverText = $(this).find('p').text().replace("hide","show");
                $(this).find('p').text(newHoverText);
            }
            else if($(this).hasClass('off')) {
                $(this).removeClass('off');
                $(this).addClass('on');

                let newSource = $(this).find('img').attr('src').replace("gray","blue");
                $(this).find('img').attr('src',newSource);

                let newHoverText = $(this).find('p').text().replace("show","hide");
                $(this).find('p').text(newHoverText);
            }
        });
    }
});





function jQueryReady() {

}

