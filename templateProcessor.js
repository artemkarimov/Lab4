'use strict';

class TemplateProcessor {
  render(view) {
    if (!view) {
      window.location.hash = '#';
    }
    document.getElementById('mainpart').innerHTML = view;
  }
}

export default TemplateProcessor;