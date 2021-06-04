(async () => {
	class SelectToolEverywhere {
		static initialize(){
			//Patch so select tool works for Light and Sound
			canvas.getLayerByEmbeddedName("AmbientLight").options.controllableObjects = true;
			canvas.getLayerByEmbeddedName("AmbientSound").options.controllableObjects = true;
			canvas.getLayerByEmbeddedName("MeasuredTemplate").options.controllableObjects = true;
			if(canvas.getLayerByEmbeddedName("Note").options.controllableObjects === false) window['select-tool-everywhere'].push("Note");
			canvas.getLayerByEmbeddedName("Note").options.controllableObjects = true;
		}

		/**
		 * Hook into the toolbar and add buttons 
		 */
		static _getControlButtons(controls){
			let added_tools=[];
			for (let i = 0; i < controls.length; i++) {
				if(controls[i].name === "lighting"){
					if (!controls[i].tools.find(tool => tool.name === "select")) {
						controls[i].tools.unshift({
							name: "select",
							title: "CONTROLS.LightSelect",
							icon: "fas fa-expand"
						});
						added_tools.push("AmbientLight");
					}
				}
				else if(controls[i].name === "sounds"){
					if (!controls[i].tools.find(tool => tool.name === "select")) {
						controls[i].tools.unshift({
							name: "select",
							title: "CONTROLS.SoundSelect",
							icon: "fas fa-expand"
						});
						added_tools.push("AmbientSound");
					}
				}
				else if(controls[i].name === "measure"){
					if (!controls[i].tools.find(tool => tool.name === "select")) {
						controls[i].tools.unshift({
							name: "select",
							title: "CONTROLS.TemplateSelect",
							icon: "fas fa-expand"
						});
						added_tools.push("MeasuredTemplate");
					}
				}
			}
			window['select-tool-everywhere']=added_tools;
			console.log("SelectToolEverywhere | Tools added.");
		}

		static placeableSelected(placeable, selected){
			if(!window['select-tool-everywhere'].find(type => type === placeable.constructor.name)) return;
            placeable.controlIcon.border.visible = selected
		}
		static placeableHovered(placeable, hovered){
			if(!window['select-tool-everywhere'].find(type => type === placeable.constructor.name)) return;
			if(placeable._controlled){
				placeable.controlIcon.border.visible = true
			}
		}

	}
	window['select-tool-everywhere']=[];
	Hooks.on('getSceneControlButtons', (controls) => SelectToolEverywhere._getControlButtons(controls));
	Hooks.on('canvasReady', () => SelectToolEverywhere.initialize());
	for (const type of ["AmbientLight", "AmbientSound", "MeasuredTemplate", "Note"]) {
		Hooks.on(`control${type}`, SelectToolEverywhere.placeableSelected);
		Hooks.on(`hover${type}`, SelectToolEverywhere.placeableHovered);
	}
})();
