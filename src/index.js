(function(window) {
  const bootstrap = {};

  /**
   * generateHtml
   * This function takes json object and returns html form of the object.
   * @param {*} struct
   */
  function generateHtml(struct) {
    let htmlPlatForm;
    // a tagged element or tag name
    const firstChar = struct.element.trim()[0];
    if (firstChar === "<") {
      let domparser = new DOMParser();
      htmlPlatForm = domparser.parseFromString(struct.element, "text/html");
      htmlPlatForm = htmlPlatForm.querySelector("body").firstChild;
    } else {
      htmlPlatForm = document.createElement(struct.element);
      struct.attributes &&
        Object.keys(struct.attributes).forEach(attr => {
          htmlPlatForm.setAttribute(attr, struct.attributes[attr]);
        });
      if (
        Object.keys(struct).indexOf("htmlTextPosition") !== -1 &&
        isNaN(parseInt(struct.htmlTextPosition, 10))
      ) {
        console.log(
          "%cERROR: Invalid htmlTextPosition received in below structure",
          "background: #ffffff; color: #ff0000;"
        );
        console.log(struct);
        throw new Error();
      }
      (Object.keys(struct).indexOf("htmlTextPosition") === -1 ||
        parseInt(struct.htmlTextPosition, 10) === 0) &&
        htmlPlatForm.append(
          document.createTextNode(
            struct.htmlText && struct.htmlText.length > 0 ? struct.htmlText : ""
          )
        );
      struct.children &&
        struct.children.forEach((childElement, ii) => {
          if (ii !== 0 && ii === parseInt(struct.htmlTextPosition, 10)) {
            htmlPlatForm.append(
              document.createTextNode(
                struct.htmlText && struct.htmlText.length > 0
                  ? struct.htmlText
                  : ""
              )
            );
          }
          let childHTML = generateHtml(childElement);
          htmlPlatForm.append(childHTML);
        });
      (parseInt(struct.htmlTextPosition, 10) === -1 ||
        (struct.children &&
          parseInt(struct.htmlTextPosition, 10) >= struct.children.length)) &&
        htmlPlatForm.append(
          document.createTextNode(
            struct.htmlText && struct.htmlText.length > 0 ? struct.htmlText : ""
          )
        );
    }

    return htmlPlatForm;
  }

  /**
   * validateAndtransform
   * This function will determine if received stringified json is an array[] or object{}.
   * To work with array, caller must supply an element id on the document.
   * If used object, id is not required, however if provided, generated html
   * will be appended to that element.
   *
   * @param {*} json : could be an array of objects or a sigle object
   * @param {*} id : mandatory when array of objects in passed to json
   *
   */
  function validateAndtransform(json, returnText = false) {
    let struct;
    try {
      struct = JSON.parse(json);
    } catch (e) {
      struct = json;
    }

    try {
      let multiElements = false,
        newHtml;
      if (Array.isArray(struct)) multiElements = true;
      if (multiElements) {
        const demoBody = document.createElement("body");
        struct
          .map(e => generateHtml(e))
          .forEach(e => {
            demoBody.append(e);
          });
        newHtml = returnText
          ? demoBody.innerHTML
          : Array.from(demoBody.children);
      } else if (!multiElements) {
        newHtml = generateHtml(struct);
        if (returnText) {
          const demoBody = document.createElement("body");
          demoBody.append(newHtml);
          newHtml = demoBody.innerHTML;
        }
      }
      return newHtml;
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * To expose the functions
   */
  bootstrap.toHtml = json => {
    return validateAndtransform(json);
  };
  bootstrap.toHtmlText = json => {
    return validateAndtransform(json, true);
  };

  if ("undefined" !== typeof module && module.exports)
    module.exports = bootstrap;

  window.toHtml = bootstrap.toHtml;
  window.toHtmlText = bootstrap.toHtmlText;
})("undefined" !== typeof window ? window : {});
