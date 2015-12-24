(function(){
    var app = angular.module('MemoryApp',[]);
    
    app.factory('cardSvc', function(){
        function Card(className){
            this.className = className;
            this.side = 'back';
            this.state = 'unopened';
        }
            Card.prototype.flip = function(){
                if (this.side === 'back') {
                    this.side = 'face';
                }
                else {
                    this.side = 'back';
                }
            };
            
            Card.prototype.toString = function(){
                return('Card : ' + this.className + ' , ' + this.side);
            };
        
        
        var cardService = {};
        cardService.cards = [
            'fa-anchor', 'fa-arrows', 'fa-asterisk', 'fa-at', 'fa-car', 'fa-ban', 'fa-university', 'fa-bed', 'fa-beer', 'fa-bell', 'fa-bicycle', 'fa-birthday-cake',
            'fa-bolt', 'fa-bomb', 'fa-book', 'fa-briefcase', 'fa-bug', 'fa-bus', 'fa-camera', 'fa-certificate', 'fa-child', 'fa-clock-o', 'fa-coffee', 'fa-cube',
            'fa-cutlery', 'fa-cubes', 'fa-diamond', 'fa-envelope', 'fa-exclamation-triangle', 'fa-eye', 'fa-female', 'fa-fighter-jet', 'fa-flag-checkered', 'fa-flask', 'fa-frown-o', 'fa-futbol-o',
            'fa-globe', 'fa-gift', 'fa-heart', 'fa-home', 'fa-key', 'fa-leaf', 'fa-lock', 'fa-magic', 'fa-male', 'fa-map-marker', 'fa-meh-o', 'fa-mobile',
            'fa-motorcycle', 'fa-music', 'fa-paint-brush', 'fa-paper-plane', 'fa-paw', 'fa-plane', 'fa-puzzle-piece', 'fa-refresh', 'fa-recycle', 'fa-smile-o', 'fa-ship', 'fa-rocket',
            'fa-sun-o', 'fa-thumbs-up', 'fa-tree', 'fa-trophy', 'fa-truck', 'fa-umbrella'
            ];
        cardService.maxQty = cardService.cards.length;
        
        cardService.getLayout = function(pairsQty) {
            var _layout = _.shuffle(cardService.cards).slice(0, pairsQty);
            _layout = _layout.concat(_layout);
            _layout = _.shuffle(_layout);
            
            var layout = [];
            _.map(_layout, function(className){
                layout.push(new Card(className));
            });
            return layout;
        };
        
        return cardService;
    });
    
    app.controller('mainCtrl', function($scope, $timeout, cardSvc){
        $scope.pairsQty = 6;
        $scope.openedPairs = 0;
        $scope.maxQty = cardSvc.maxQty;
        $scope.minQty = 6;
        
        $scope.startNewGame = function(){
            if ($scope.pairsQty < $scope.minQty) {
                $scope.pairsQty = $scope.minQty;
            }
            else if ($scope.pairsQty > $scope.maxQty) {
                $scope.pairsQty = $scope.maxQty;
            }
            $scope.items = cardSvc.getLayout($scope.pairsQty);
            $scope.currentPairsQty = $scope.pairsQty;
            $scope.openedPairs = 0;
            $scope.firstCard = null;
            $scope.gameOver = false;
            console.log($scope.items);
        };
        $scope.startNewGame(); //auto starting new game on loading
        
        $scope.check = function(card) {
            if (card.side === 'back'){
                card.flip();
                
                $timeout(function(){
                    if (!$scope.firstCard) {
                        $scope.firstCard = card;
                    }
                    else {
                        if($scope.firstCard.className == card.className) {
                            $scope.openedPairs++;
                            if($scope.openedPairs == $scope.currentPairsQty) {
                                $scope.gameOver = true;
                            }
                        }
                        else {
                            $scope.firstCard.flip();
                            card.flip();
                        }
                        $scope.firstCard = null;
                    }
                },1000);
            }
        };
        
        
        
    });
})();