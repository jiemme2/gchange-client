angular.module('cesium.market.app.controllers', ['ngResource',
  'cesium.es.services', 'cesium.market.modal.services'])

  // Configure menu items
  .config(function(PluginServiceProvider, csConfig) {
    'ngInject';

    var enable = csConfig.plugins && csConfig.plugins.es;
    if (enable) {
      // Menu extension points
      PluginServiceProvider.extendState('app', {
         points: {
           'menu-main': {
             templateUrl: "plugins/market/templates/menu_extend.html",
             controller: "MarketMenuExtendCtrl"
           },
           'menu-user': {
             templateUrl: "plugins/market/templates/menu_extend.html",
             controller: "MarketMenuExtendCtrl"
           }
         }
        });
    }
  })

 .controller('MarketMenuExtendCtrl', MarketMenuExtendController)

;


/**
 * Control menu extension
 */
function MarketMenuExtendController($scope, esSettings, PluginService) {
    'ngInject';

    $scope.extensionPoint = PluginService.extensions.points.current.get();
    $scope.enable = esSettings.isEnable();

    esSettings.api.state.on.changed($scope, function(enable) {
        $scope.enable = enable;
    });
}
