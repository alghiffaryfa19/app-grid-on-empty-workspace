//    Overview on empty workspace
//    GNOME Shell extension
//    @fthx 2025


import GLib from 'gi://GLib';

import * as Main from 'resource:///org/gnome/shell/ui/main.js';


export default class OverviewOnEmptyWorkspaceExtension {
    
    enable() {
        global.display.connectObject('window-left-monitor', () => Main.overview.showApps(), this);
        global.workspace_manager.connectObject('active-workspace-changed', () => Main.overview.showApps(), this);
    }

    disable() {
        global.display.disconnectObject(this);
        global.workspace_manager.disconnectObject(this);

        if (this._timeout) {
            GLib.Source.remove(this._timeout);
            this._timeout = null;
        }
    }
}
