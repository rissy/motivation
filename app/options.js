(function(){
  const $ = (id) => document.getElementById(id);

  function initDobField() {
    const dobField = $('dob');
    const savedDob = localStorage.dob;

    if (savedDob) {
      const dob = new Date(parseInt(savedDob));

      dobField.value = dob.toISOString().split('T')[0];
    }

    dobField.onchange = ({target}) => {
      if (!target.valueAsDate) {
        return;
      }

      localStorage.dob = target.valueAsDate.getTime();
    }
  }

  initDobField();
})();
