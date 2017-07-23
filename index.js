require([
    "esri/views/MapView",
    "esri/WebMap",
    "esri/widgets/Search",
    "esri/widgets/LayerList",
    "dojo/domReady!"
], function(
    MapView, WebMap, Search, LayerList
) {

    /************************************************************
     * Creates a new WebMap instance. A WebMap must reference
     * a PortalItem ID that represents a WebMap saved to
     * arcgis.com or an on-premise portal.
     *
     * To load a WebMap from an on-premise portal, set the portal
     * url with esriConfig.portalUrl.
     ************************************************************/
    var webmap = new WebMap({
        portalItem: { // autocasts as new PortalItem()
            id: "b4209b90632b484383d54e821d0fc1b6"
        }
    });

    /************************************************************
     * Set the WebMap instance to the map property in a MapView.
     ************************************************************/
    var view = new MapView({
        map: webmap,
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
