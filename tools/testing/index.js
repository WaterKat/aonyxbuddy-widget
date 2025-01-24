const h = fetch("./se-index.html");
const s = fetch("./se-styles.css");
const j = fetch("./se-index.js");
const f = fetch("./se-fields.json");

Promise.all([h, s, j, f])
  .then(values => Promise.all(values.map(a => a.text())))
  .then(([html, css, js, fields]) => {
    document.body.innerHTML = html;

    const styleElement = document.createElement("style");
    styleElement.innerHTML = css;
    document.head.appendChild(styleElement);

    const fieldsObject = JSON.parse(fields);
    const convertedfieldsObject = Object.keys(fieldsObject).reduce((acc, key) => {
      acc[key] = fieldsObject[key].value ?? "";
      return acc;
    }, {});
    console.log(fields);

    const scriptElement = document.createElement("script");
    scriptElement.innerHTML = js;
    document.head.appendChild(scriptElement);

    setTimeout(() => {
      console.log("onWidgetLoad called");
      window.dispatchEvent(new CustomEvent("onWidgetLoad", {
        detail:
        {
          channel: {
            username: "aonyxbuddy",
          },
          overlay: {
            isEditorMode: true,
          },
          fieldData: convertedfieldsObject
        }
      }));
    }, 1000);
  });

