# FoundryVTT - Select tool everywhere
![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/KayelGee/select-tool-everywhere?style=for-the-badge) 
![GitHub Releases](https://img.shields.io/github/downloads/KayelGee/select-tool-everywhere/latest/total?style=for-the-badge) 
![GitHub All Releases](https://img.shields.io/github/downloads/KayelGee/select-tool-everywhere/total?style=for-the-badge&label=Downloads+total)  

**[Compatibility]**: *FoundryVTT* v10+  
**[Systems]**: *any*  
**[Languages]**: *English*  
As of v10 this doesn't work for lights(it randomly crashes the canvas when moving multiple lights) 
and I don't know how to fix that so this doesn't enable the select tool for lights anymore.
Adds the select tool to most controls(measure templates and sound). 
You can move multiple sounds/templates with this. 

Thanks to Blitz#6797 the selection does show correctly.  

This module checks if a select tool is there before adding it(also thanks to Blitz) and makes sure to only do anything if this module added the select tool, so it should be safe to use with other modules that add a select tool. 

This will probably be obsolete in the future.

## Installation

1. select-tool-everywhere using manifest URL: https://raw.githubusercontent.com/KayelGee/select-tool-everywhere/master/module.json
2. While loaded in World, enable **_Select tool everywhere"_** module.

## Usage

Select the select tool. Select your sounds/templates you wish to move all at once. Drag one sound/template to move them all.

![](select-tool-everywhere.gif)

## Contact

If you wish to contact me for any reason, reach me out on Discord using my tag: `KayelGee#5241`

## Credits

Workaround for Lights and Notes provided by Aedif
