(async () => {
	class SelectToolEverywhere {
		static initialize(){
			//Patch so select tool works for Light and Sound
			AmbientLight.layer.options.controllableObjects = true;
			AmbientSound.layer.options.controllableObjects = true;
			MeasuredTemplate.layer.options.controllableObjects = true;
			Note.layer.options.controllableObjects = true;
		}

		/**
		 * Hook into the toolbar and add buttons 
		 */
		static _getControlButtons(controls){
			for (let i = 0; i < controls.length; i++) {
				if(controls[i].name === "lighting"){
					if (!controls[i].tools.find(tool => tool.name === "select")) {
						controls[i].tools.unshift({
							name: "select",
							title: "CONTROLS.LightSelect",
							icon: "fas fa-expand"
						});
					}
				}
				else if(controls[i].name === "sounds"){
					if (!controls[i].tools.find(tool => tool.name === "select")) {
						controls[i].tools.unshift({
							name: "select",
							title: "CONTROLS.SoundSelect",
							icon: "fas fa-expand"
						});
					}
				}
				else if(controls[i].name === "measure"){
					if (!controls[i].tools.find(tool => tool.name === "select")) {
						controls[i].tools.unshift({
							name: "select",
							title: "CONTROLS.TemplateSelect",
							icon: "fas fa-expand"
						});
					}
				}
			}
			console.log("SelectToolEverywhere | Tools added.");
		}

		static placeableSelected(placeable, selected){
            placeable.controlIcon.border.visible = selected
		}
		static placeableHovered(placeable, hovered){
			if(placeable._controlled){
				placeable.controlIcon.border.visible = true
			}
		}

	}

	Hooks.on('getSceneControlButtons', (controls) => SelectToolEverywhere._getControlButtons(controls));
	Hooks.on('canvasReady', () => SelectToolEverywhere.initialize());
	for (const type of ["AmbientLight", "AmbientSound", "MeasuredTemplate", "Note"]) {
		Hooks.on(`control${type}`, SelectToolEverywhere.placeableSelected);
		Hooks.on(`hover${type}`, SelectToolEverywhere.placeableHovered);
	}
})();
