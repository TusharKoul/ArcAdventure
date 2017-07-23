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
    "esri/symbols/SimpleFillSymbol",
    "dojo/domReady!"
], function(
    Map, MapView, WebMap, Search, LayerList, FeatureLayer, PictureMarkerSymbol, SimpleRenderer, SimpleMarkerSymbol,SimpleLineSymbol, SimpleFillSymbol
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
        content:
        "<ul><li>{Descript}</li></ul>" +
        "<ul><li>Address: {Address}</li></ul>",
        actions: [addToPlan]
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
        url: "https://services8.arcgis.com/XKQO68YBFBIpiRAM/arcgis/rest/services/ZION_TRANS_Trail_ln/FeatureServer",
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
        url: "https://services8.arcgis.com/XKQO68YBFBIpiRAM/arcgis/rest/services/River_Access_/FeatureServer",
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
        url: "https://services8.arcgis.com/XKQO68YBFBIpiRAM/arcgis/rest/services/Campground_/FeatureServer",
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
        url: "https://services8.arcgis.com/XKQO68YBFBIpiRAM/arcgis/rest/services/Picnic_Tables/FeatureServer",
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
        url: "https://services8.arcgis.com/XKQO68YBFBIpiRAM/arcgis/rest/services/Visitor_Center_/FeatureServer",
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
        url: "https://services8.arcgis.com/XKQO68YBFBIpiRAM/arcgis/rest/services/Overlook_/FeatureServer",
        outFields: ["*"],
        popupTemplate: template,
        renderer:hikeRenderer
    });
    map.add(hikeLayer);

    var fill = new SimpleFillSymbol({
        outline: {
            width: 1,
            color: [161, 217, 155, 0.59]
        },
        color: [161, 217, 155, 0.56]
    });

    var fillRenderer = new SimpleRenderer({
        symbol:fill
    });


    var featureLayer6 = new FeatureLayer({
        url: "https://services8.arcgis.com/XKQO68YBFBIpiRAM/arcgis/rest/services/NPS_Boundary/FeatureServer",
        outFields: ["*"],
        popupTemplate: template,
        renderer:fillRenderer
    });
    map.add(featureLayer6);


    var fill2 = new SimpleFillSymbol({
        outline: {
            width: 1,
            color: [38, 115, 0, 1]
        },
        color: [38, 115, 0, 0.56]
    });

    var fill2Renderer = new SimpleRenderer({
        symbol:fill2
    });

    var featureLayer7 = new FeatureLayer({
        url: "https://services8.arcgis.com/XKQO68YBFBIpiRAM/arcgis/rest/services/USFS_boundaries/FeatureServer",
        outFields: ["*"],
        popupTemplate: template,
        renderer: fill2Renderer
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


function addToMyPlan(attributes){
    console.log(attributes);
}
