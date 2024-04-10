//MOS
var Version = 0;
var Subversion = 3;
var Subsubversion = 5;
var build = 2                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ;
var FullVersion = (((((Version + ".") + Subversion) + ".") + Subsubversion) + "-") + build;
var SCR = "MOS.Boot";
var batt = 100;
var icon1 = "";
var icon2 = "";
var icon3 = "";
var icon4 = "";
var icon5 = "";
var icon6 = "";
var icon7 = "";
var lid = getProperty("MOS.Language", "index") + -1;
var errors = [];
var OOSBoot = "";
var OOSTerminalSetUp = 0;
var OOSTerminal = "";
var ISOOS = 0;
var OOSSetUp = 0;
var twentyfourhourtime = getProperty("MOS.Settings.Customizer.Scale.24Hour.Time.Output", "index");
//Flags
var Beta = 1;
var Debug = 0;
//Funcs
function err(errcode) {
  var list = ["General Fault", "Fatal system error", "Fatal appstore error", "Fatal settings error", "Fatal music error", "App doesn't exist", "Required data non-existent", "Not avaliable", "SuperHomescreen Error"];
  errors[(errors.length + 1)] = list[errcode];
  console.log(list[errcode]);
  return (list[errcode]);
}
function Supersetscreen(scr) {
  SCR = scr;
  setScreen(scr);
  if (SCR != scr) {
    err(1);
  }
}
//Boot Modular-OS 
MOSBoot();
function MOSBoot() {
  Supersetscreen("MOS.Boot");
  wallpaper("MacOS-Ventura-Dark-8k-Wallpaper.jpg");
  installapp("Settings", "icon://fa-cogs");
  installapp("Appstore", "icon://fa-download");
  installapp("Tips", "icon://fa-lightbulb-o");
  setTimeout(function() {
    Supersetscreen("MOS.Homescreen");
    batteries();
  }, 500);
}
timedLoop(100, function() {
  if (Debug==1) {
    debuggerr();
  }
  StatusBar();
  lid = getProperty("MOS.Language", "index") + 0;
  twentyfourhourtime = getProperty("MOS.Settings.Customizer.Scale.24Hour.Time.Output", "index");
  lang(lid);
  if (Beta == 1) {
    setText("MOS.Settings.About.Background", ((("About \n \n \n" + "Version ") + FullVersion) + "\n") + "\n \n This OS is made with open source projects like SOA!");
  } else {
    setText("MOS.Settings.About.Background", ("About \n \n \n" + VersionText) +  "\n \n This OS is made with open source projects like SOA!");
  }
});
function StatusBar() {
  var Text = (((SOA.gettime(twentyfourhourtime) + "          ") + batt + "%") + "         ") + SOA.getdate();
  setText("MOS.Homescreen.Time", Text);
  setText("MOS.Settings.Time", Text);
  setText("MOS.Settings.About.Time", Text);
  setText("MOS.Settings.Advanced.Time", Text);
  setText("MOS.Settings.Customizer.Time", Text);
  setText("MOS.Settings.Wallpapers.Time", Text);
  setText("MOS.Settings.OOSError.Time", Text);
  setText("MOS.Settings.OOSManager.Time", Text);
  setText("MOS.Settings.OOS.Configurator.Time", Text);
  setText("MOS.Settings.OtherOSSetup0.Time", Text);
  setText("MOS.Settings.OOSS1.Time", Text);
  setText("MOS.Settings.Modules.Time", Text);
  setText("MOS.Settings.Languages.Time", Text);
  setText("MOS.Tips.Time", Text);
  setText("MOS.Notes.Time", Text);
  setText("MOS.Music.Time", Text);
  setText("MOS.Music.A.Time", Text);
  setText("MOS.Appstore.Time", Text);
  setText("MOS.Paint.Time", Text);
}
function debuggerr() {
  console.clear();
  console.log("------------------------------- Debugger 2.0 -------------------------------");
  console.log((("     Time Of Day: " + SOA.gettime(1)) + "                                                        Date: ") + SOA.getdate());
  console.log((("     User ID: " + getUserId()) + "                                      Version: ") + FullVersion);
  console.log("\n");
  for (var i = 0; i < errors.length; i++) {
    if (errors[i] != undefined) {
      console.log(errors[i]);
    }
  }
}
var count = 0;
var intervalId = setInterval(function() {
    if (batt <= 0) {
      Supersetscreen("MOS.Dead");
      setProperty("MOS.Ded.img", "image", "icon://fa-battery-empty");
      setTimeout(function() {
        setProperty("MOS.Ded.img", "image", "icon://fa-battery-quarter");
      }, 300);
      count++;
      if (count >= 4) {
          clearInterval(intervalId);
          setTimeout(function() {
            setProperty("MOS.Ded.img", "image", "icon://fa-battery-empty");
          }, 500);
      }
    }
}, 500);
function batteries() {
  timedLoop(50000, function() {
    batt = batt - 1;
  });
}
//MOS.Homescreen
function openapp(icon) {
  if (icon == "Tips") {
    Supersetscreen("MOS.Tips");
  } else if ((icon == "Settings")) {
    Supersetscreen("MOS.Settings");
  } else if ((icon == "Appstore")) {
    Supersetscreen("MOS.Appstore");
  } else if ((icon == "Music")) {
    Supersetscreen("MOS.Music");
  } else if (icon == "Paint") {
    Supersetscreen("MOS.Paint");
  } else if (icon == "Notes") {
    Supersetscreen("MOS.Notes");
  } else {
    err(8);
  }
}
onEvent("MOS.Homescreen.icon.1", "click", function( ) {
  openapp(icon1);
});
onEvent("MOS.Homescreen.icon.2", "click", function( ) {
  openapp(icon2);
});
onEvent("MOS.Homescreen.icon.3", "click", function( ) {
  openapp(icon3);
});
onEvent("MOS.Homescreen.icon.4", "click", function( ) {
  openapp(icon4);
});
onEvent("MOS.Homescreen.icon.5", "click", function( ) {
  openapp(icon5);
});
onEvent("MOS.Homescreen.icon.6", "click", function( ) {
  openapp(icon6);
});
onEvent("MOS.Homescreen.icon.7", "click", function( ) {
  openapp(icon7);
});
function installapp(appname, iconn, where) {
  //code* pattend by kio/arcane, cant use without permision
  //this code or any variant of this code*
  //athorization for its useage was allowed 
  var icon = iconn;
  if (appname == "Settings") {
    icon = "icon://fa-cogs";
  } else if ((appname == "Appstore")) {
    icon = "icon://fa-download";
  } else if ((appname == "Notes")) {
    icon = "icon://fa-sticky-note-o";
  } else if ((appname == "Tips")) {
    icon = "icon://fa-lightbulb-o";
  } else if (appname == "Dev") {
    icon = "icon://fa-terminal";
  } else {
    icon = iconn;
  }
  if (where == undefined) {
    if (icon1 != appname) {
    if (icon2 != appname) {
    if (icon3 != appname) {
    if (icon4 != appname) {
    if (icon5 != appname) {
    if (icon6 != appname) {
    if (icon7 != appname) {
    if (icon1 == "") {
      icon1 = appname;
      setProperty("MOS.Homescreen.icon.1", "image", icon);
      showElement("MOS.Homescreen.icon.1");
      return 1;
    } else if ((icon2 == "")) {
      icon2 = appname;
      setProperty("MOS.Homescreen.icon.2", "image", icon);
      showElement("MOS.Homescreen.icon.2");
      return 1;
    } else if ((icon3 == "")) {
      icon3 = appname;
      setProperty("MOS.Homescreen.icon.3", "image", icon);
      showElement("MOS.Homescreen.icon.3");
      return 1;
    } else if ((icon4 == "")) {
      icon4 = appname;
      setProperty("MOS.Homescreen.icon.4", "image", icon);
      showElement("MOS.Homescreen.icon.4");
      return 1;
    } else if ((icon5 == "")) {
      icon5 = appname;
      setProperty("MOS.Homescreen.icon.5", "image", icon);
      showElement("MOS.Homescreen.icon.5");
      return 1;
    } else if ((icon6 == "")) {
      icon6 = appname;
      setProperty("MOS.Homescreen.icon.6", "image", icon);
      showElement("MOS.Homescreen.icon.6");
      return 1;
    } else if ((icon7 == "")) {
      icon7 = appname;
      setProperty("MOS.Homescreen.icon.7", "image", icon);
      showElement("MOS.Homescreen.icon.7");
      return 1;
    } else {
      console.log("Storage Full!");
      err(8);
      return 0;
      
    }
    }
    }
    }
    }
    }
    }
    }
  } else {
    var temp = "icon" + where;
    temp = appname;
    if (where == 1) {
      icon1 = appname;
    } else if ((where == 2)) {
      icon2 = appname;
    } else if ((where == 3)) {
      icon3 = appname;
    } else if ((where == 4)) {
      icon4 = appname;
    } else if ((where == 5)) {
      icon5 = appname;
    } else if ((where == 6)) {
      icon6 = appname;
    } else if ((where == 7)) {
      icon7 = appname;
    }
    setProperty("MOS.Homescreen.icon." + where , "image", icon);
    showElement("MOS.Homescreen.icon."+where);
    return 1;
  }
}
function deleteapp(appname) {
  if (icon1 == appname) {
    icon1 = "";
    setProperty("MOS.Homescreen.icon.1", "image", "icon://fa-question");
    hideElement("MOS.Homescreen.icon.1");
  } else if ((icon2 == appname)) {
    icon2 = "";
    setProperty("MOS.Homescreen.icon.2", "image", "icon://fa-question");
    hideElement("MOS.Homescreen.icon.2");
  } else if ((icon3 == appname)) {
    icon3 = "";
    setProperty("MOS.Homescreen.icon.3", "image", "icon://fa-question");
    hideElement("MOS.Homescreen.icon.3");
    setText("Dev.input.3", "");
  } else if ((icon4 == appname)) {
    icon4 = "";
    setProperty("MOS.Homescreen.icon.4", "image", "icon://fa-question");
    hideElement("MOS.Homescreen.icon.4");
  } else if ((icon5 == appname)) {
    icon5 = "";
    setProperty("MOS.Homescreen.icon.5", "image", "icon://fa-question");
    hideElement("MOS.Homescreen.icon.5");
  } else if ((icon6 == appname)) {
    icon6 = "";
    setProperty("MOS.Homescreen.icon.6", "image", "icon://fa-question");
    hideElement("MOS.Homescreen.icon.6");
  } else if (icon7 == appname) {
    icon7 = "";
    setProperty("MOS.Homescreen.icon.7", "image", "icon://fa-question");
    hideElement("MOS.Homescreen.icon.7");
  } else {
    err(8);
  }
}
//MOS.Tips / MOS.Notes
onEvent("MOS.Tips.Bar.Back", "click", function( ) {
  Supersetscreen("MOS.Homescreen");
});
onEvent("MOS.Notes.Bar.Back", "click", function( ) {
  Supersetscreen("MOS.Homescreen");
});
//MOS.Settings
onEvent("MOS.Settings.Bar.Back", "click", function( ) {
  Supersetscreen("MOS.Homescreen");
});
onEvent("MOS.Settings.Button.1", "click", function( ) {
  Supersetscreen("MOS.Settings.Wallpapers");
});
onEvent("MOS.Settings.Button.2", "click", function( ) {
  Supersetscreen("MOS.Settings.About");
});
onEvent("MOS.Settings.Button.3", "click", function( ) {
  Supersetscreen("MOS.Settings.Advanced");
});
//MOS.Settings.OOSS1
onEvent("MOS.Settings.OOSS1.Bar.Back", "click", function( ) {
  Supersetscreen("MOS.Settings");
});
onEvent("MOS.Settings.OOSS1.SetUp", "click", function( ) {
  Supersetscreen("MOS.Settings.OOSManager");
});
onEvent("MOS.Settings.OOSS1.SetUp", "click", function( ) {
Supersetscreen("MOS.Settings.OOSManager");
OOSBoot = getText("MOS.HOS");
OOSSetUp = 1;
setText("MOS.Settings.OOS.Configurator.Setting2.Output", getText("MOS.HOS"));
});
onEvent("MOS.Settings.OOSS1.Bar.Back", "click", function( ) {
Supersetscreen("MOS.Settings.Advanced");
});
//MOS.Settings.OOS
onEvent("MOS.Settings.OOS.Bar.Back", "click", function( ) {
  Supersetscreen("MOS.Settings.Advanced");
});
onEvent("MOS.Settings.OOS.SetUp", "click", function( ) {
  Supersetscreen("MOS.Settings.OtherOSSetup1");
});
//MOS.Settings.OOSManager
function BootOOS() {
  eval(OOSBoot);
}
function ToOOSTerminal() {
  if (OOSTerminalSetUp == 0) {
    Supersetscreen("MOS.Settings.OOSError");
    setText("MOS.Settings.OOSErr.Err", "You haven't set up terminal yet!");
  } else {
    Supersetscreen(OOSTerminal);
  }
}
onEvent("MOS.Settings.OOSManager.Bar.Back", "click", function( ) {
  OOSBoot = getText("MOS.HOS");
  Supersetscreen("MOS.Settings.Advanced");
});
onEvent("MOS.Settings.OOSManager.RunOS", "click", function( ) {
OOSBoot = getText("MOS.HOS");
BootOOS();
});
onEvent("MOS.Settings.OOSManager.Help", "click", function( ) {
Supersetscreen("MOS.Settings.OOSError");
setText("MOS.Settings.OOSErr.Err", "WIP");
});
onEvent("MOS.Settings.OOSManager.Terminal", "click", function( ) {
	ToOOSTerminal();
});
onEvent("MOS.Settings.OOSManager.Settings", "click", function( ) {
	Supersetscreen("MOS.Settings.OOS.Configurator");
});
//MOS.Settings.OOSErr
onEvent("MOS.Settings.OOSErr.OK", "click", function( ) {
Supersetscreen("MOS.Settings.OOSManager");
});
onEvent("MOS.Settings.OOSErr.OK", "click", function( ) {
	Supersetscreen("MOS.Settings.OOSManager");
});
//MOS.Settings.OOS.Configurator
onEvent("MOS.Settings.OOS.Configurator.Bar.Back", "click", function( ) {
	Supersetscreen("MOS.Settings.OOSManager");
});
onEvent("MOS.Settings.OOS.Configurator.Setting1.Output", "change", function( ) {
	legacyMode = getChecked("MOS.Settings.OOS.Configurator.Setting1.Output");
});
onEvent("MOS.Settings.OOS.Configurator.Setting2.Output", "change", function( ) {
	_001 = getText("MOS.Settings.OOS.Configurator.Setting2.Output");
});
onEvent("MOS.Settings.OOS.Bar.Back", "click", function( ) {
Supersetscreen("MOS.Settings.Advanced");
});
//MOS.Settings.Advanced
onEvent("MOS.Settings.Advanced.Button.1", "click", function( ) {
  Supersetscreen("MOS.Settings.Customizer");
});
onEvent("MOS.Settings.Advanced.Bar.Back", "click", function( ) {
  Supersetscreen("MOS.Settings");
});
onEvent("MOS.Settings.Advanced.Button.3", "click", function( ) {
  Supersetscreen("MOS.Settings.Modules");
});
onEvent("MOS.Settings.Advanced.Button.4", "click", function( ) {
  Supersetscreen("MOS.Settings.Languages");
});
onEvent("MOS.Settings.Advanced.Button.2", "click", function( ) {
if (OOSSetUp == 0) {
  Supersetscreen("MOS.Settings.OtherOSSetup0");
} else {
  Supersetscreen("MOS.Settings.OOSManager");
}
});
//MOS.Settings.About
onEvent("MOS.Settings.About.Bar.Back", "click", function( ) {
  Supersetscreen("MOS.Settings");
});
//MOS.Settings.Customizer
onEvent("MOS.Settings.Customizer.Bar.Back", "click", function( ) {
  Supersetscreen("MOS.Settings.Advanced");
});
onEvent("MOS.Settings.Customizer.Scale.AppScale", "input", function( ) {
  textScale(getProperty("MOS.Settings.Customizer.Scale.AppScale", "value"));
});
onEvent("MOS.Settings.Customizer.Scale.RGB.R", "input", function( ) {
  iconColor(getProperty("MOS.Settings.Customizer.Scale.RGB.R", "value"), getProperty("MOS.Settings.Customizer.Scale.RGB.G", "value"), getProperty("MOS.Settings.Customizer.Scale.RGB.B", "value"));
});
onEvent("MOS.Settings.Customizer.Scale.RGB.G", "input", function( ) {
  iconColor(getProperty("MOS.Settings.Customizer.Scale.RGB.R", "value"), getProperty("MOS.Settings.Customizer.Scale.RGB.G", "value"), getProperty("MOS.Settings.Customizer.Scale.RGB.B", "value"));
});
onEvent("MOS.Settings.Customizer.Scale.RGB.B", "input", function( ) {
  iconColor(getProperty("MOS.Settings.Customizer.Scale.RGB.R", "value"), getProperty("MOS.Settings.Customizer.Scale.RGB.G", "value"), getProperty("MOS.Settings.Customizer.Scale.RGB.B", "value"));
});
onEvent("MOS.Settings.Customizer.Bar.Back", "click", function( ) {
  if (getProperty("MOS.Settings.Customizer.Scale.IconSize", "index") == 0) {
    iconSize(55);
  } else {
    iconSize(42);
  }
});
function textScale(fs) {
  setProperty("MOS.Settings.Customizer.Label.1", "font-size", fs);
  setProperty("MOS.Settings.Button.1", "font-size", fs);
  setProperty("MOS.Settings.Button.2", "font-size", fs);
  setProperty("MOS.Settings.About.Background", "font-size", fs);
  setProperty("MOS.Settings.Background", "font-size", fs);
  setProperty("MOS.Settings.Customizer.Background", "font-size", fs);
  setProperty("MOS.Homescreen.icon.1", "font-size", fs);
  setProperty("MOS.Settings.Customizer.Label.2", "font-size", fs);
  setProperty("MOS.Settings.Customizer.Label.3", "font-size", fs);
  setProperty("MOS.Settings.Advanced.Button.1", "font-size", fs);
  setProperty("MOS.Settings.Advanced.Button.2", "font-size", fs);
  setProperty("MOS.Settings.Advanced.Button.3", "font-size", fs);
  setProperty("MOS.Settings.Advanced.Button.4", "font-size", fs);
  setProperty("MOS.Settings.Background", "font-size", fs);
  setProperty("MOS.Settings.Button.3", "font-size", fs);
  setProperty("MOS.Settings.Modules.Background", "font-size", fs);
  setProperty("MOS.Settings.Modules.Mod1", "font-size", fs);
  setProperty("MOS.Settings.Modules.Mod2", "font-size", fs);
  setProperty("MOS.Settings.Modules.Mod3", "font-size", fs);
  setProperty("MOS.Settings.Modules.Mod4", "font-size", fs);
  setProperty("MOS.Settings.Modules.Mod5", "font-size", fs);
  setProperty("MOS.Tips.text", "font-size", fs);
  setProperty("MOS.Notes.text.1", "font-size", fs);
  setProperty("MOS.Notes.text.2", "font-size", fs);
}
function iconColor(r, g, b) {
  setProperty("MOS.Homescreen.icon.1", "icon-color", rgb(r,g,b));
  setProperty("MOS.Homescreen.icon.2", "icon-color", rgb(r,g,b));
  setProperty("MOS.Homescreen.icon.3", "icon-color", rgb(r,g,b));
  setProperty("MOS.Homescreen.icon.4", "icon-color", rgb(r,g,b));
  setProperty("MOS.Homescreen.icon.5", "icon-color", rgb(r,g,b));
  setProperty("MOS.Homescreen.icon.6", "icon-color", rgb(r,g,b));
  setProperty("MOS.Homescreen.icon.7", "icon-color", rgb(r,g,b));
  setProperty("MOS.Homescreen.icon.8", "icon-color", rgb(r,g,b));
}
function iconSize(size) {
  setProperty("MOS.Homescreen.icon.1", "width", size);
  setProperty("MOS.Homescreen.icon.2", "width", size);
  setProperty("MOS.Homescreen.icon.3", "width", size);
  setProperty("MOS.Homescreen.icon.4", "width", size);
  setProperty("MOS.Homescreen.icon.5", "width", size);
  setProperty("MOS.Homescreen.icon.6", "width", size);
  setProperty("MOS.Homescreen.icon.7", "width", size);
  setProperty("MOS.Homescreen.icon.8", "width", size);
  setProperty("MOS.Homescreen.icon.1", "height", size);
  setProperty("MOS.Homescreen.icon.2", "height", size);
  setProperty("MOS.Homescreen.icon.3", "height", size);
  setProperty("MOS.Homescreen.icon.4", "height", size);
  setProperty("MOS.Homescreen.icon.5", "height", size);
  setProperty("MOS.Homescreen.icon.6", "height", size);
  setProperty("MOS.Homescreen.icon.7", "height", size);
  setProperty("MOS.Homescreen.icon.8", "height", size);
}
//MOS.Settings.Wallpapers
onEvent("MOS.Settings.Wallpapers.Bar.Back", "click", function( ) {
  Supersetscreen("MOS.Settings");
});
onEvent("MOS.Settings.Wallpapers.Wallpaper.01", "click", function( ) {
  wallpaper("wallpaper1-mos.png");
});
onEvent("MOS.Settings.Wallpapers.Wallpaper.02", "click", function( ) {
  wallpaper("wallpaper2-mos.png");
});
onEvent("MOS.Settings.Wallpapers.Wallpaper.03", "click", function( ) {
  wallpaper("MacOS-Ventura-Dark-8k-Wallpaper.jpg");
});
onEvent("MOS.Settings.Wallpapers.Wallpaper.04", "click", function( ) {
  wallpaper("OIP-(1).jpeg");
});
function wallpaper(img) {
  setProperty("MOS.Homescreen", "image", img);
  setProperty("MOS.Settings", "image", img);
  setProperty("MOS.Settings.About", "image", img);
  setProperty("MOS.Settings.Advanced", "image", img);
  setProperty("MOS.Settings.Customizer", "image", img);
  setProperty("MOS.Settings.Wallpapers", "image", img);
  setProperty("MOS.Settings.OOSError", "image", img);
  setProperty("MOS.Settings.OOSManager", "image", img);
  setProperty("MOS.Settings.OOS.Configurator", "image", img);
  setProperty("MOS.Settings.OtherOSSetup0", "image", img);
  setProperty("MOS.Settings.OtherOSSetup1", "image", img);
  setProperty("MOS.Settings.Modules", "image", img);
  setProperty("MOS.Settings.Languages", "image", img);
  setProperty("MOS.Tips", "image", img);
  setProperty("MOS.Notes", "image", img);
  setProperty("MOS.Music", "image", img);
  setProperty("MOS.Music.Authors", "image", img);
  setProperty("MOS.Appstore", "image", img);
  setProperty("MOS.Paint", "image", img);
}
//MOS.Settings.Modules
onEvent("MOS.Settings.Modules.Mod1", "click", function( ) {
  showElement("MOS.Settings.Modules.Mod1.Remove");
  showElement("MOS.Settings.Button.1");
});
onEvent("MOS.Settings.Modules.Mod1.Remove", "click", function( ) {
  hideElement("MOS.Settings.Modules.Mod1.Remove");
  hideElement("MOS.Settings.Button.1");
});
onEvent("MOS.Settings.Modules.Mod2", "click", function( ) {
  showElement("MOS.Settings.Modules.Mod2.Remove");
  showElement("MOS.Settings.Advanced.Button.2");
});
onEvent("MOS.Settings.Modules.Mod2.Remove", "click", function( ) {
  hideElement("MOS.Settings.Modules.Mod2.Remove");
  hideElement("MOS.Settings.Advanced.Button.2");
});
onEvent("MOS.Settings.Modules.Mod3", "click", function( ) {
  showElement("MOS.Settings.Modules.Mod3.Remove");
  showElement("MOS.Settings.Advanced.Button.1");
});
onEvent("MOS.Settings.Modules.Mod3.Remove", "click", function( ) {
  hideElement("MOS.Settings.Modules.Mod3.Remove");
  hideElement("MOS.Settings.Advanced.Button.1");
});
onEvent("MOS.Settings.Modules.Mod4", "click", function( ) {
  showElement("MOS.Settings.Modules.Mod4.Remove");
});
onEvent("MOS.Settings.Modules.Mod4.Remove", "click", function( ) {
  hideElement("MOS.Settings.Modules.Mod4.Remove");
});
onEvent("MOS.Settings.Modules.Mod5", "click", function( ) {
  showElement("MOS.Settings.Modules.Mod5.Remove");
});
onEvent("MOS.Settings.Modules.Mod5.Remove", "click", function( ) {
  hideElement("MOS.Settings.Modules.Mod5.Remove");
});
onEvent("MOS.Settings.Modules.Bar.Back", "click", function( ) {
  Supersetscreen("MOS.Settings.Advanced");
});
//App.appstore
onEvent("MOS.Appstore.Music.Install", "click", function( ) {
  showElement("MOS.Appstore.Music.Uninstall");
  hideElement("MOS.Appstore.Music.Install");
  installapp("Music", "icon://fa-music");
});
onEvent("MOS.Appstore.Music.Uninstall", "click", function( ) {
  showElement("MOS.Appstore.Music.Install");
  hideElement("MOS.Appstore.Music.Uninstall");
  stopSound();
  deleteapp("Music");
});
onEvent("MOS.Appstore.Paint.Install", "click", function( ) {
  showElement("MOS.Appstore.Paint.Uninstall");
  hideElement("MOS.Appstore.Paint.Install");
  installapp("Paint", "icon://fa-paint-brush");
});
onEvent("MOS.Appstore.Paint.Uninstall", "click", function( ) {
  showElement("MOS.Appstore.Paint.Install");
  hideElement("MOS.Appstore.Paint.Uninstall");
  deleteapp("Paint");
});
onEvent("MOS.Appstore.Notes.Install", "click", function( ) {
  showElement("MOS.Appstore.Notes.Uninstall");
  hideElement("MOS.Appstore.Notes.Install");
  installapp("Notes", "icon://fa-sticky-note");
});
onEvent("MOS.Appstore.Notes.Uninstall", "click", function( ) {
  showElement("MOS.Appstore.Notes.Install");
  hideElement("MOS.Appstore.Notes.Uninstall");
  deleteapp("Notes");
});
onEvent("MOS.Appstore.Bar.Back", "click", function( ) {
  Supersetscreen("MOS.Homescreen");
});
//MOS.Music
onEvent("MOS.Music.Bar.Back", "click", function( ) {
  Supersetscreen("MOS.Homescreen");
});
onEvent("MOS.Music.Song.Stop", "click", function( ) {
  stopSound();
});
onEvent("MOS.Music.Song.1", "click", function( ) {
  playSound("music1-mos.mp3", false);
});
onEvent("MOS.Music.Song.2", "click", function( ) {
  playSound("music2-mos.mp3", false);
});
onEvent("MOS.Music.Song.A", "click", function( ) {
  setScreen("MOS.Music.Authors");
});
onEvent("MOS.Music.A.Bar.Back", "click", function( ) {
  setScreen("MOS.Music");
});
//MOS.Paint
onEvent("MOS.Paint.Bar.Back", "click", function( ) {
  Supersetscreen("MOS.Homescreen");
});
setActiveCanvas("MOS.Paint.Canvas");
var currentColor = "black";
var isDragging = false;
var previousX, previousY;
var redValue = getProperty("MOS.Paint.Slider.1", "value");
var greenValue = getProperty("MOS.Paint.Slider.2", "value");
var blueValue = getProperty("MOS.Paint.Slider.3", "value");
updateColor(redValue, greenValue, blueValue);
onEvent("MOS.Paint.Slider.1", "input", function(event) {
  var redValue = getProperty("MOS.Paint.Slider.1", "value");
  updateColor(redValue, null, null);
});
onEvent("MOS.Paint.Slider.2", "input", function(event) {
  var greenValue = getProperty("MOS.Paint.Slider.2", "value");
  updateColor(null, greenValue, null);
});
onEvent("MOS.Paint.Slider.3", "input", function(event) {
  var blueValue = getProperty("MOS.Paint.Slider.3", "value");
  updateColor(null, null, blueValue);
});
onEvent("MOS.Paint.Canvas", "mousemove", function(event) {
  if (isDragging) {
    var x = event.x - getXPosition("MOS.Paint.Canvas");
    var y = event.y - getYPosition("MOS.Paint.Canvas");
    var squareSize = 10;
    var lineWidth = 3;
    drawLine(previousX, previousY, x, y, lineWidth, currentColor);
    previousX = x;
    previousY = y;
  }
});
onEvent("MOS.Paint.Canvas", "mousedown", function(event) {
  isDragging = true;
  previousX = event.x - getXPosition("MOS.Paint.Canvas");
  previousY = event.y - getYPosition("MOS.Paint.Canvas");
});
onEvent("MOS.Paint.Canvas", "mouseup", function() {
  isDragging = false;
});
onEvent("MOS.Paint.Button.1", "click", function() {
  clearCanvas("MOS.Paint.Canvas");
});
function paintRect(x, y) {
  rect(x, y, 10, 10);
}
function drawLine(x1, y1, x2, y2, lineWidth) {
  setStrokeWidth(lineWidth);
  setStrokeColor(currentColor);
  line(x1, y1, x2, y2);
}
function updateColor(red, green, blue) {
  red = getNumber("MOS.Paint.Slider.1");
  green = getNumber("MOS.Paint.Slider.2");
  blue = getNumber("MOS.Paint.Slider.3");
  currentColor = rgb(red, green, blue);
}
//MOS.Settings.Languages
onEvent("MOS.Settings.Languages.Bar.Back", "click", function( ) {
  Supersetscreen("MOS.Settings.Advanced");
});
//Sets the language to OOS
function lang(id) {
  if (id == 0) {
    //English
    setText("MOS.Settings.Languages.Background", "Languages");
    setText("MOS.Settings.Button.1", "Wallpapers");
    setText("MOS.Settings.Button.2", "About");
    setText("MOS.Settings.Button.3", "Advanced");
    setText("MOS.Settings.Customizer.Background", "Customizer");
    setText("MOS.Settings.Customizer.Label.1", "Text Scale");
    setText("MOS.Settings.Customizer.Label.2", "Icon Color");
    setText("MOS.Settings.Customizer.Label.3", "Icon Size");
    setText("MOS.Settings.Modules.Background", "Modules");
    setText("MOS.Settings.Advanced.Background", "Developer Options");
    setText("MOS.Settings.Advanced.Button.1", "Advanced Customization");
    setText("MOS.Settings.Advanced.Button.2", "Other OSes");
    setText("MOS.Settings.Advanced.Button.3", "Modules");
    setText("MOS.Settings.Advanced.Button.4", "Languages");
    setText("MOS.Settings.Modules.Mod1", "Wallpapers");
    setText("MOS.Settings.Modules.Mod2", "OOS");
    setText("MOS.Settings.Modules.Mod3", "Customizer"); //to be changed in other langs
    setText("MOS.Settings.Modules.Mod4", "System process");
    setText("MOS.Settings.Modules.Mod5", "Module finder");
    setText("MOS.Appstore.Music.Text.1", "Music");
    setText("MOS.Music.Song.Stop", "Stop Music");
    setText("MOS.Settings.OOSErr.Background", "Other OSes (Beta)");
    setText("MOS.Settings.OOSManager.Background", "Other OSes (Beta)");
    setText("MOS.Settings.OOS.Background", "Other OSes (Beta)");
    setText("MOS.Settings.OOSS1.Background", "Other OSes (Beta)");
    setText("MOS.Appstore.Background", "App Store");
    setText("MOS.Appstore.Music.Text.1", "Music");
    setText("MOS.Music.Background", "Music");
    setText("MOS.Settings.Background", "Settings");
  } else if ((id == 1)) {
    //Spanish
    setText("MOS.Settings.Background", "Idiomas");
    setText("MOS.Settings.Button.1", "Fondos de pantalla");
    setText("MOS.Settings.Button.2", "Acerca de");
    setText("MOS.Settings.Button.3", "Avanzado");
    setText("MOS.Settings.Customizer.Background", "Personalizador");
    setText("MOS.Settings.Customizer.Label.1", "Escala de texto");
    setText("MOS.Settings.Customizer.Label.2", "Color del icono");
    setText("MOS.Settings.Customizer.Label.3", "Tamaño del icono");
    setText("MOS.Settings.Modules.Background", "Módulos");
    setText("MOS.Settings.Advanced.Background", "Opciones de desarrollador");
    setText("MOS.Settings.Advanced.Button.1", "Personalización avanzada");
    setText("MOS.Settings.Advanced.Button.2", "Otros sistemas operativos");
    setText("MOS.Settings.Advanced.Button.3", "Módulos");
    setText("MOS.Settings.Advanced.Button.4", "Idiomas");
    setText("MOS.Settings.Modules.Mod1", "Fondos de pantalla");
    setText("MOS.Settings.Modules.Mod2", "OOS");
    setText("MOS.Settings.Modules.Mod3", "Aplicación de configuración");
    setText("MOS.Settings.Modules.Mod4", "Proceso del sistema");
    setText("MOS.Settings.Modules.Mod5", "Buscador de módulos");
    setText("MOS.Appstore.Music.Text.1", "Música");
    setText("MOS.Music.Song.Stop", "Detener música");
    setText("MOS.Settings.OOSErr.Background", "Otros sistemas operativos (Beta)");
    setText("MOS.Settings.OOSManager.Background", "Otros sistemas operativos (Beta)");
    setText("MOS.Settings.OOS.Background", "Otros sistemas operativos (Beta)");
    setText("MOS.Settings.OOSS1.Background", "Otros sistemas operativos (Beta)");
    setText("MOS.Appstore.Background", "App Store");
    setText("MOS.Appstore.Music.Text.1", "Música");
    setText("MOS.Music.Background", "Música");
    setText("MOS.Appstore.Background", "Tienda de aplicaciones");
  } else if (id == 2) {
    setText("MOS.Settings.Background", "Magasin d'applications");
    setText("MOS.Settings.Languages.Background", "Langues");
    setText("MOS.Settings.Button.1", "Fonds d'écran");
    setText("MOS.Settings.Button.2", "À propos");
    setText("MOS.Settings.Button.3", "Avancé");
    setText("MOS.Settings.Customizer.Background", "Customizer");
    setText("MOS.Settings.Customizer.Label.1", "Échelle du texte");
    setText("MOS.Settings.Customizer.Label.2", "Couleur de l'icône");
    setText("MOS.Settings.Customizer.Label.3", "Taille de l'icône");
    setText("MOS.Settings.Modules.Background", "Modules");
    setText("MOS.Settings.Advanced.Background", "Options du développeur");
    setText("MOS.Settings.Advanced.Button.1", "Personnalisation avancée");
    setText("MOS.Settings.Advanced.Button.2", "Autres systèmes d'exploitation");
    setText("MOS.Settings.Advanced.Button.3", "Modules");
    setText("MOS.Settings.Advanced.Button.4", "Langues");
    setText("MOS.Settings.Modules.Mod1", "Fonds d'écran");
    setText("MOS.Settings.Modules.Mod2", "OOS");
    setText("MOS.Settings.Modules.Mod3", "Application Paramètres");
    setText("MOS.Settings.Modules.Mod4", "Processus système");
    setText("MOS.Settings.Modules.Mod5", "Recherche de modules");
    setText("MOS.Appstore.Music.Text.1", "Musique");
    setText("MOS.Music.Song.Stop", "Arrêter la musique");
    setText("MOS.Settings.OOSErr.Background", "Autres systèmes d'exploitation (bêta)");
    setText("MOS.Settings.OOSManager.Background", "Autres systèmes d'exploitation (bêta)");
    setText("MOS.Settings.OOS.Background", "Autres systèmes d'exploitation (bêta)");
    setText("MOS.Settings.OOOSS1.Background", "Autres systèmes d'exploitation (bêta)");
    setText("MOS.Appstore.Background", "App Store");
    setText("MOS.Appstore.Music.Text.1", "Musique");
    setText("MOS.Music.Background", "Musique");
  } else if (id == 3) {
    setText("MOS.Settings.Background", "アプリストア");
    setText("MOS.Settings.Languages.Background", "言語");
    setText("MOS.Settings.Button.1", "壁紙");
    setText("MOS.Settings.Button.2", "概要");
    setText("MOS.Settings.Button.3", "詳細");
    setText("MOS.Settings.Customizer.Background", "カスタマイザー");
    setText("MOS.Settings.Customizer.Label.1", "テキストスケール");
    setText("MOS.Settings.Customizer.Label.2", "アイコンの色");
    setText("MOS.Settings.Customizer.Label.3", "アイコンのサイズ");
    setText("MOS.Settings.Modules.Background", "モジュール");
    setText("MOS.Settings.Advanced.Background", "開発者向けオプション");
    setText("MOS.Settings.Advanced.Button.1", "高度なカスタマイズ");
    setText("MOS.Settings.Advanced.Button.2", "その他の OS");
    setText("MOS.Settings.Advanced.Button.3", "モジュール");
    setText("MOS.Settings.Advanced.Button.4", "言語");
    setText("MOS.Settings.Modules.Mod1", "壁紙");
    setText("MOS.Settings.Modules.Mod2", "OOS");
    setText("MOS.Settings.Modules.Mod3", "設定アプリ");
    setText("MOS.Settings.Modules.Mod4", "システムプロセス");
    setText("MOS.Settings.Modules.Mod5", "モジュールファインダー");
    setText("MOS.Appstore.Music.Text.1", "ミュージック");
    setText("MOS.Music.Song.Stop", "音楽を停止");
    setText("MOS.Settings.OOSErr.Background", "その他の OS (ベータ版)");
    setText("MOS.Settings.OOSManager.Background", "その他の OS (ベータ版)");
    setText("MOS.Settings.OOS.Background", "その他の OS (ベータ版)");
    setText("MOS.Settings.OOSS1.Background", "その他の OS (ベータ版)");
    setText("MOS.Appstore.Background", "App Store");
    setText("MOS.Appstore.Music.Text.1", "ミュージック");
    setText("MOS.Music.Background", "ミュージック");
  } else if (id == 4) {
    //Dock 2
    setText("MOS.Settings.Languages.Background", "кавеР;п");
    setText("MOS.Settings.Button.1", "титеР;п");
    setText("MOS.Settings.Button.2", "кити");
    setText("MOS.Settings.Button.3", "Шапа");
    setText("MOS.Settings.Customizer.Background", "пиму;пе");
    setText("MOS.Settings.Customizer.Label.1", "муР векам");
    setText("MOS.Settings.Customizer.Label.2", "титеР мапе");
    setText("MOS.Settings.Customizer.Label.3", "муР векам");
    setText("MOS.Settings.Modules.Background", "патан;п");
    setText("MOS.Settings.Advanced.Background", "тува тета;п");
    setText("MOS.Settings.Advanced.Button.1", "Шапа пиму;пвоу");
    setText("MOS.Settings.Advanced.Button.2", "мамин вемон;п");
    setText("MOS.Settings.Advanced.Button.3", "патан;п");
    setText("MOS.Settings.Advanced.Button.4", "кавеР;п");
    setText("MOS.Settings.Modules.Mod1", "титеР;п");
    setText("MOS.Settings.Modules.Mod2", "мамин вемон");
    setText("MOS.Settings.Modules.Mod3", "вене;п мивам");
    setText("MOS.Settings.Modules.Mod4", "вемон мивам");
    setText("MOS.Settings.Modules.Mod5", "патан миШен;пе");
    setText("MOS.Appstore.Music.Text.1", "вемим");
    setText("MOS.Music.Song.Stop", "патин вемим");
    setText("MOS.Settings.OOSErr.Background", "мамин вемон;п (нена)");
    setText("MOS.Settings.OOSManager.Background", "мамин вемон;п (нена)");
    setText("MOS.Settings.OOS.Background", "мамин вемон;п (нена)");
    setText("MOS.Settings.OOSS1.Background", "мамин вемон;п (нена)");
    setText("MOS.Appstore.Background", "мивам нини");
    setText("MOS.Appstore.Music.Text.1", "вемим");
    setText("MOS.Music.Background", "вемим");
    setText("MOS.Settings.Background", "вене;п");
  } else if (id == 5) {
    //[зъ тъзюэбъ] 
    setText("MOS.Settings.Languages.Background", "{ж;зъ}");
    setText("MOS.Settings.Button.1", "{ж;юдвхп}");
    setText("MOS.Settings.Button.2", "{фэтх}");
    setText("MOS.Settings.Button.3", "{фдпбъ}");
    setText("MOS.Settings.Customizer.Background", "{дпбшюдюш;эьэбхп}");
    setText("MOS.Settings.Customizer.Label.1", "{дфэюэвх бх}");
    setText("MOS.Settings.Customizer.Label.2", "{чдз бътхндзз}");
    setText("MOS.Settings.Customizer.Label.3", "{дфэюэвх бътхндзз");
    setText("MOS.Settings.Modules.Background", "{ж;цдзфэз}");
    setText("MOS.Settings.Advanced.Background", "{ж;ндьхпз бъюдзз}");
    setText("MOS.Settings.Advanced.Button.1", "{чдзбд;эьэбхп фдпбъ}");
    setText("MOS.Settings.Advanced.Button.2", "{ж;яътш ндядп}");
    setText("MOS.Settings.Advanced.Button.3", "{ж;цдзфэз}");
    setText("MOS.Settings.Advanced.Button.4", "{ж;зъ}");
    setText("MOS.Settings.Modules.Mod1", "{ж;юдвхп}");
    setText("MOS.Settings.Modules.Mod2", "{яътш ндядп}");
    setText("MOS.Settings.Modules.Mod3", "{дпбшюдюш;эьэбхп}");
    setText("MOS.Settings.Modules.Mod4", "{вдцхзп яътш}");
    setText("MOS.Settings.Modules.Mod5", "{дпбшюдюш;вштэ цдзфэз}");
    setText("MOS.Appstore.Music.Text.1", "{фхзтдчэп}");
    setText("MOS.Music.Song.Stop", "{фхзтдчэп яъзюх}");
    setText("MOS.Settings.OOSErr.Background", "{вэвъ цш}тшз ,{ж;яътш ндядп}");
    setText("MOS.Settings.OOSManager.Background", "{вэвъ цш}тшз ,{ж;яътш ндядп}");
    setText("MOS.Settings.OOS.Background", "{вэвъ цш}тшз ,{ж;яътш ндядп}");
    setText("MOS.Settings.OOSS1.Background", "{вэвъ цш}тшз ,{ж;яътш ндядп}");
    setText("MOS.Appstore.Background", "{ьшззбшзз вдцхзп}");
    setText("MOS.Appstore.Music.Text.1", "{фхзтдчэп}");
    setText("MOS.Music.Background", "{фхзтдчэп}");
    setText("MOS.Settings.Background", "{ж;ндьхпз}");
  }
}
