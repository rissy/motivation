(function(){
  const $ = (id) => document.getElementById(id);

  class App {
    constructor() {
      this.load();

      $('dob-wrapper').addEventListener(
        'submit', 
        () => this.submit(),
      );
    
      if (this.dob) {
        this.renderAgeLoop();
      } else {
        this.renderChoose();
      }
    }

    load() {
      const value = localStorage.dob;

      if (value) {
        this.dob = new Date(parseInt(value));
      }
    }

    save() {
      if (this.dob) {
        localStorage.dob = this.dob.getTime();
      }
    }

    submit() {
      const input = $('dob-input');

      if (!input.valueAsDate) {
        return;
      }
    
      this.dob = input.valueAsDate;
      this.save();
      this.renderAgeLoop();
    }

    renderChoose() {
      $('dob-wrapper').style.display = 'block';
      $('age-wrapper').style.display = 'none';
    }

    renderAgeLoop() {
      this.renderAge();

      $('dob-wrapper').style.display = 'none';
      $('age-wrapper').style.display = 'block';
    
      this.interval = setInterval(
        () => requestAnimationFrame(() => this.renderAge()), 
        100,
      );
    }

    renderAge() {
      const now = new Date();
      const duration = now - this.dob;
      const years = duration / 31556900000;

      const majorMinor = years.toFixed(9).toString().split('.');

      $('year').textContent = majorMinor[0];
      $('milliseconds').textContent = majorMinor[1];
    }
  }

  window.app = new App();
})();
