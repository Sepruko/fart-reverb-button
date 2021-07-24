const { Plugin } = require('powercord/entities');
const { ipcRenderer } = require('electron');
const { getModule } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');

const t = getModule([ 'setSystemTrayApplications' ], false);
const b = [
  {
    name: 'Play Sound',
    id: 'tray_sound_button'
  }
];

module.exports = class FartReverb extends Plugin {
  async startPlugin() {
    inject('tray-button', t, 'setSystemTrayApplications', () => [b], true);

    ipcRenderer.on('DISCORD_LAUNCH_APPLICATION', (_, id) => {
      if (id === 'tray_sound_button') {
        var s = new Audio('https://raw.githubusercontent.com/NatSepruko/fart-reverb-button/main/assets/fart-reverb.mp3');
        s.play();
      }
    });

    tray.setSystemTrayApplications(b);
  }

  pluginWillUnload() {
    uninject('tray-button');
    powercord.api.settings.unregisterSettings(this.entityID);
    // remind me to figure out how to unload the button and listener because yes.
  }
}