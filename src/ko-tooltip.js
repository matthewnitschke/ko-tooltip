(function(){
  ko.components.register('ko-tooltip', {
    viewModel: function(params){
      var self = this;
      self.text = params.text;

      var positions = {
        right: { x: 16, y: -3 },
        top: { x: 5, y: -25 },
        bottom: { x: 5, y: 25 }
      }

      var shiftPos;

      if (ko.unwrap(params.position)){
        shiftPos = positions[ko.unwrap(params.position)];

        if (ko.isObservable(params.position)){ // react to change if it is an observable
          params.position.subscribe(function(val){
            shiftPos = positions[val];
          });
        }

      } else {
        shiftPos = positions.right;
      }

      self.x = ko.observable();
      self.y = ko.observable();

      self.visible = ko.observable();

      var elements;
      if (params.element){
        elements = document.querySelectorAll(params.element);
      } else {
        elements = [document];
      }

      if (elements.length > 0){
        elements.forEach(function(e){
          e.addEventListener('mouseenter', function(){
            self.visible(true);
          }, false);
          e.addEventListener('mousemove', mousemove, false);
          e.addEventListener('mouseleave', function(){ self.visible(false); }, false);
        });
      } else {
        throw "ko-tooltip: No element was found to bind to"
      }


      function mousemove(e){
        self.x(e.pageX + shiftPos.x + 'px'); // 15 is the cursor padding
        self.y(e.pageY + shiftPos.y + 'px');
      }

    },
    template: '<div class="ko-tooltip-container" data-bind="html: text, visible: visible, style: {left: x, top: y}"></div>'
  })
}());
