$(document).ready(function(){
    require([
        "esri/views/MapView",
        "esri/WebMap",
        "esri/widgets/Search",
        "dojo/domReady!"
    ], function(
        MapView, WebMap, Search
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
            container: "viewDiv"
        });

        var searchWidget = new Search({
            view: view
        });

      // Add the search widget to the very top left corner of the view
        view.ui.add(searchWidget, {
            position: "top-right",
            index: 0
      });
    });
});