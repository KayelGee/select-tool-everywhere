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
					controls[i].tools.push({
						name: "select",
						title: "CONTROLS.LightSelect",
						icon: "fas fa-expand"
					});
				}
				else if(controls[i].name === "sounds"){
					controls[i].tools.push({
						name: "select",
						title: "CONTROLS.SoundSelect",
						icon: "fas fa-expand"
					});
				}
				else if(controls[i].name === "measure"){
					controls[i].tools.push({
						name: "select",
						title: "CONTROLS.SoundSelect",
						icon: "fas fa-expand"
					});
				}
			}
			console.log("SelectToolEverywhere | Tools added.");
		}
	}

	Hooks.on('getSceneControlButtons', (controls) => SelectToolEverywhere._getControlButtons(controls));
	Hooks.on('canvasReady', () => SelectToolEverywhere.initialize());
})();
