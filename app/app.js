(function(){

var $ = document.getElementById.bind(document);

var App = function(){
  this.load();

  $('dob-wrapper').addEventListener(
    'submit', this.submit.bind(this)
  );

  if (this.dob) {
    this.renderAgeLoop();
  } else {
    this.renderChoose();
  }
};

App.fn = App.prototype;

App.fn.load = function(){
  var value;

  if (value = localStorage.dob)
    this.dob = new Date(parseInt(value));
};

App.fn.save = function(){
  if (this.dob)
    localStorage.dob = this.dob.getTime();
};

App.fn.submit = function(e){
  var input = $('dob-input');
  if ( !input.valueAsDate ) return;

  this.dob = input.valueAsDate;
  this.save();
  this.renderAgeLoop();
};

App.fn.renderChoose = function(){
  $('dob-wrapper').style.display = 'block';
  $('age-wrapper').style.display = 'none';
};

App.fn.renderAgeLoop = function(){
  this.renderAge();

  $('dob-wrapper').style.display = 'none';
  $('age-wrapper').style.display = 'block';

  this.interval = setInterval((function (self) { 
    return function() {
      requestAnimationFrame(self.renderAge.bind(self));
    }
  })(this), 100);
};

App.fn.renderAge = function(){
  var now       = new Date
  var duration  = now - this.dob;
  var years     = duration / 31556900000;

  var majorMinor = years.toFixed(9).toString().split('.');

  $('year').textContent = majorMinor[0];
  $('milliseconds').textContent = majorMinor[1];
};

window.app = new App();

})();
