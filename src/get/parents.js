
import contextToElement from '../util/context-to-element';

// [elem, elem.parent, elem.parent.parent, …, html]
// will not contain the shadowRoot (DOCUMENT_FRAGMENT_NODE) and shadowHost
export default function({context} = {}) {
  const list = [];
  let element = contextToElement({
    message: 'get/parents requires valid options.context',
    context,
  });

  while (element) {
    list.push(element);
    // IE does know support parentElement on SVGElement
    element = element.parentNode;
    if (element.nodeType !== Node.ELEMENT_NODE) {
      element = null;
    }
  }

  return list;
}
