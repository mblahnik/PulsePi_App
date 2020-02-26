const customTitlebar = require('custom-electron-titlebar');

new customTitlebar.Titlebar({
  backgroundColor: customTitlebar.Color.fromHex('#FF69B4'),
  title: 'Pulse PI',
  icon: './assets/img/icon/heart.png',
  menu: null
});
