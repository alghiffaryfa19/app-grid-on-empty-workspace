//    Overview on empty workspace
//    GNOME Shell extension
//    @fthx 2025


import GLib from 'gi://GLib';

import * as Main from 'resource:///org/gnome/shell/ui/main.js';


export default class OverviewOnEmptyWorkspaceExtension {
    
    enable() {
        global.display.connectObject(
            'window-left-monitor',
            () => this._checkWorkspace(),
            this
        );

        global.workspace_manager.connectObject(
            'active-workspace-changed',
            () => this._checkWorkspace(),
            this
        );
    }

    _checkWorkspace() {
        let wm = global.workspace_manager;

        let activeWs = wm.get_active_workspace();
        let index = activeWs.index();
        let lastIndex = wm.n_workspaces - 1;

        let windows = activeWs.list_windows().filter(w => !w.skip_taskbar);

        if (index === lastIndex && windows.length === 0) {
            Main.overview.showApps();
        }

        // if (index === lastIndex) {
        //     Main.overview.showApps();
        // }
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
