(async () => {
  class SelectToolEverywhere {
    static initialize() {
      //Patch so select tool works for Light and Sound
      canvas.getLayerByEmbeddedName("AmbientLight").options.controllableObjects = true;
      canvas.getLayerByEmbeddedName("AmbientSound").options.controllableObjects = true;
      canvas.getLayerByEmbeddedName("MeasuredTemplate").options.controllableObjects = true;
      canvas.getLayerByEmbeddedName("Note").options.controllableObjects = true;
    }

    /**
     * Hook into the toolbar and add buttons
     */
    static _getControlButtons(controls) {
      let added_tools = [];
      for (let i = 0; i < controls.length; i++) {
        if (controls[i].name === "lighting") {
          if (!controls[i].tools.find((tool) => tool.name === "select")) {
            controls[i].tools.unshift({
              name: "select",
              title: "CONTROLS.LightSelect",
              icon: "fas fa-expand",
            });
            added_tools.push("AmbientLight");
          }
        } else if (controls[i].name === "sounds") {
          if (!controls[i].tools.find((tool) => tool.name === "select")) {
            controls[i].tools.unshift({
              name: "select",
              title: "CONTROLS.SoundSelect",
              icon: "fas fa-expand",
            });
            added_tools.push("AmbientSound");
          }
        } else if (controls[i].name === "measure") {
          if (!controls[i].tools.find((tool) => tool.name === "select")) {
            controls[i].tools.unshift({
              name: "select",
              title: "CONTROLS.TemplateSelect",
              icon: "fas fa-expand",
            });
            added_tools.push("MeasuredTemplate");
          }
        }
      }
      window["select-tool-everywhere"] = added_tools;
      console.log("SelectToolEverywhere | Tools added.");
    }

    static placeableRefresh(placeable) {
      if (placeable.controlled) placeable.controlIcon.border.visible = true;
    }
  }
  window["select-tool-everywhere"] = [];
  Hooks.on("getSceneControlButtons", (controls) => SelectToolEverywhere._getControlButtons(controls));
  Hooks.on("canvasReady", () => SelectToolEverywhere.initialize());
  for (const type of ["AmbientSound", "MeasuredTemplate", "AmbientLight", "Note"]) {
    Hooks.on(`refresh${type}`, SelectToolEverywhere.placeableRefresh);
  }

  // For notes the refresh hook is called while ControlIcon is still loading its texture (see ControlIcon.draw())
  // Once the texture is loaded border visibility will be reset to false undoing our change in SelectToolEverywhere.placeableRefresh
  // Instead delay here to account for this
  Hooks.on("drawNote", (note) => {
    setTimeout(() => {
      SelectToolEverywhere.placeableRefresh(note);
    }, 10);
  });

  Hooks.once("init", () => {
    libWrapper.register(
      "select-tool-everywhere",
      "AmbientLight.prototype._onDragLeftCancel",
      function (...args) {
        Object.getPrototypeOf(AmbientLight).prototype._onDragLeftCancel.apply(this, args);
        this.updateSource({ defer: true });
      },
      "OVERRIDE"
    );
  });
})();
