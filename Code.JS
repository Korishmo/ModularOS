//MOS
var Version = 0;
var Subversion = 9;
var Subsubversion = 0;
var build = 1;
//R:Release, I:Internal
var Varient = "R";
var FullVersion = (((((Version + ".") + (Subversion + Varient)) + ".") + Subsubversion) + "-") + build;
var nbFullVersion = (((((Version + ".") + Subversion) + ".") + Subsubversion) + "") + "";
var SCR = "MOS.Boot";
var batt = 100;
var icons = ["", "", "", "", "", "", "", "", "", "", "", ""];
var lid = getProperty("MOS.Language", "index") + -1;
var errors = [];
var OOSBoot = "";
var OOSTerminalSetUp = 0;
var ISOOS = 0;
var OOSSetUp = 0;
var twentyfourhourtime = getProperty("MOS.Settings.Customizer.Scale.24Hour.Time.Output", "index");
var Username = "NULL";
var acctoken = "";
//Flags - Don't Set Manually
var TestFeatures = 0;
var Debugg = 0;
var AdvancedSettings = 0;
var AdvancedApp = 0;
var OOSAllowed = 0;
SetFlags();
//Funcs
function meow() {
  //fine if you del this code, its just for quick testing
  installapp("Tests", "icon://fa-bug");
  installapp("Advanced", "icon://fa-code");
}
function err(errcode) {
  var list = ["General Fault", "Fatal system error", "Fatal appstore error", "Fatal settings error", "Fatal music error", "App doesn't exist", "Required data non-existent", "Not avaliable", "SuperHomescreen Error"];
  errors[(errors.length + 1)] = list[errcode];
  console.log(list[errcode]);
  return (list[errcode]);
}
function PermText(text) {
  errors[(errors.length + 1)] = text;
  console.log(text);
  return text;
}
function ssetscreen(scr) {
  SCR = scr;
  setScreen(scr);
  if (SCR != scr) {
    err(1);
  }
}
//Boot Modular-OS 
function SetFlags() {
  //Don't Set Manually, Use KeyValues
  getKeyValue("TestFeatures", function (kTestFeatures) {
    getKeyValue("Debugg", function (kDebugg) {
      getKeyValue("AdvancedSettings", function (kAdvancedSettings) {
        getKeyValue("AdvancedApp", function (kAdvancedApp) {
          getKeyValue("OOSAllowed", function (kOOSAllowed) {
            if (kTestFeatures == undefined) {
              //if keys dont exist default to example settings
              setKeyValue("TestFeatures", 0, function () {
                
              });
              setKeyValue("Debugg", 1, function () {
                
              });
              setKeyValue("AdvancedSettings", 1, function () {
                
              });
              setKeyValue("AdvancedApp", 1, function () {
                
              });
              setKeyValue("OOSAllowed", 0, function () {
                
              });
            }
            TestFeatures = kTestFeatures;
            Debugg = kDebugg;
            AdvancedApp = kAdvancedApp;
            AdvancedSettings = kAdvancedSettings;
            OOSAllowed = kOOSAllowed;
            MOSBoot();
          });
        });
      });
    });
  });
}
function MOSBoot() {
  if (randomNumber(1, 10) == 1) {
    TestFeatures = 1;
    PermText("Congragulations you have been selected for MOS Test Features!");
  }
  ssetscreen("MOS.Boot");
  wallpaper("Best-iOS-17-wallpapers-1-1-scaled-(1).jpg");
  installapp("Settings", "icon://fa-cogs");
  installapp("Appstore", "icon://fa-download");
  installapp("Tips", "icon://fa-lightbulb-o");
  setTimeout(function() {
    if (TestFeatures == 1) {
      installapp("Tests", "icon://fa-bug");
    }
    if (AdvancedApp == 1) {
      installapp("Advanced", "icon://fa-code");
    }
    if (OOSAllowed == 1) {
      Logg("OOS is Enabled");
    }
    batteries();
    ssetscreen("MOS.Lock");
  }, 500);
}
timedLoop(100, function() {
  //flags
  if (OOSAllowed==0) {
    hideElement("MOS.Advanced.Button.2");
  } else {
    showElement("MOS.Advanced.Button.2");
  }
  if (Debugg==1) {
    debuggerr();
  }
  if (AdvancedSettings == 1) {
    showElement("MOS.Settings.Button.3");
    setText("MOS.Advanced.Button.1", "Advanced Settings: Enabled");
  } else {
    hideElement("MOS.Settings.Button.3");
    setText("MOS.Advanced.Button.1", "Advanced Settings: Disabled");
  }
  //sets
  StatusBar();
  lang(lid);
  lid = getProperty("MOS.Language", "index") + 0;
  twentyfourhourtime = getProperty("MOS.Settings.Customizer.Scale.24Hour.Time.Output", "index");
  if (AdvancedSettings == 1) {
    setText("MOS.Settings.About.Background", ((("About \n \n \n" + "Version ") + FullVersion) + "\n") + "\n \n This OS is made with open source projects like SOA!");
  } else {
    setText("MOS.Settings.About.Background", ((("About \n \n \n" + "Version ") + nbFullVersion) + "\n") + "\n \n This OS is made with open source projects like SOA!");
  }
});
function StatusBar() {
  if (batt == 100) {
    var Text = "  " + ((((SOA2.gettime(twentyfourhourtime) + "          ") + batt + "%") + "        ") + SOA2.getdate());
  } else {
    var Text = "  " + ((((SOA2.gettime(twentyfourhourtime) + "           ") + batt + "%") + "        ") + SOA2.getdate());
  }
  setText("MOS.Homescreen.Time", Text);
  setText("MOS.Settings.Time", Text);
  setText("MOS.Settings.About.Time", Text);
  setText("MOS.Settings.Advanced.Time", Text);
  setText("MOS.Settings.Customizer.Time", Text);
  setText("MOS.Settings.Wallpapers.Time", Text);
  setText("MOS.Settings.Wallpapers2.Time", Text);
  setText("MOS.Settings.Modules.Time", Text);
  setText("MOS.Settings.Languages.Time", Text);
  setText("MOS.Tips.Time", Text);
  setText("MOS.Notes.Time", Text);
  setText("MOS.Music.Time", Text);
  setText("MOS.Music.A.Time", Text);
  setText("MOS.Appstore.Time", Text);
  setText("MOS.Paint.Time", Text);
  setText("MOS.Tests.Time", Text);
  setText("MOS.Advanced.Time", Text);
  setText("MOS.Advanced.Report.Time", Text);
  setText("MOS.Advanced.DebugLog.Time", Text);
  setText("MOS.OOS2.Setup.1.Time", Text);
  setText("MOS.OOS2.Setup.2.Time", Text);
  setText("MOS.OOS2.Menu.Time", Text);
  setText("MOS.Accounts.Time", Text);
  setText("MOS.Accounts.OTC.Time", Text);
  setText("MOS.Accounts.Signin.Time", Text);
  setText("MOS.Lock.Time", Text);
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
      ssetscreen("MOS.Dead");
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
onEvent("MOS.Lock.Bar.1", "click", function( ) {
  ssetscreen("MOS.Homescreen");
});
//MOS.Homescreen
function openapp(icon) {
  if (icon == "Tips") {
    ssetscreen("MOS.Tips");
  } else if ((icon == "Settings")) {
    ssetscreen("MOS.Settings");
  } else if ((icon == "Appstore")) {
    ssetscreen("MOS.Appstore");
  } else if ((icon == "Music")) {
    ssetscreen("MOS.Music");
  } else if (icon == "Paint") {
    ssetscreen("MOS.Paint");
  } else if (icon == "Notes") {
    ssetscreen("MOS.Notes");
  } else if (icon == "Tests") {
    ssetscreen("MOS.Tests");
  } else if (icon == "Advanced") {
    ssetscreen("MOS.Advanced");
  } else {
    err(8);
  }
}
onEvent("MOS.Homescreen.icon.1", "click", function( ) {
  openapp(icons[0]);
});
onEvent("MOS.Homescreen.icon.2", "click", function( ) {
  openapp(icons[1]);
});
onEvent("MOS.Homescreen.icon.3", "click", function( ) {
  openapp(icons[2]);
});
onEvent("MOS.Homescreen.icon.4", "click", function( ) {
  openapp(icons[3]);
});
onEvent("MOS.Homescreen.icon.5", "click", function( ) {
  openapp(icons[4]);
});
onEvent("MOS.Homescreen.icon.6", "click", function( ) {
  openapp(icons[5]);
});
onEvent("MOS.Homescreen.icon.7", "click", function( ) {
  openapp(icons[6]);
});
onEvent("MOS.Homescreen.icon.8", "click", function( ) {
  openapp(icons[7]);
});
onEvent("MOS.Homescreen.icon.9", "click", function( ) {
  openapp(icons[8]);
});
onEvent("MOS.Homescreen.icon.10", "click", function( ) {
  openapp(icons[9]);
});
onEvent("MOS.Homescreen.icon.11", "click", function( ) {
  openapp(icons[10]);
});
onEvent("MOS.Homescreen.icon.12", "click", function( ) {
  openapp(icons[11]);
});
//MOS.Tests
onEvent("MOS.Tests.Bar.Back", "click", function( ) {
  ssetscreen("MOS.Homescreen");
});
hideElement("MOS.Tests.Button.1");
hideElement("MOS.Tests.Button.2");
hideElement("MOS.Tests.Button.3");
onEvent("MOS.Tests.Button.1", "click", function( ) {
  
});
onEvent("MOS.Tests.Button.2", "click", function( ) {
  
});
onEvent("MOS.Tests.Button.3", "click", function( ) {
  
});
//MOS.Advanced
onEvent("MOS.Advanced.Bar.Back", "click", function( ) {
  ssetscreen("MOS.Homescreen");
});
onEvent("MOS.Advanced.Button.1", "click", function( ) {
  if (AdvancedSettings == 1) {
    AdvancedSettings = 0;
  } else {
    AdvancedSettings = 1;
  }
});
onEvent("MOS.Advanced.Button.2", "click", function( ) {
  if (OOSSetUp == 1) {
    ssetscreen("MOS.OOS2.Menu");
  } else {
    ssetscreen("MOS.OOS2.Setup.1");
  }
});
onEvent("MOS.Advanced.Button.3", "click", function( ) {
  var logpluserr = Log + "***" + errors;
  setText("MOS.Advanced.DebugLog.Log", logpluserr);
  ssetscreen("MOS.Advanced.DebugLog");
});
onEvent("MOS.Advanced.Button.4", "click", function( ) {
  ssetscreen("MOS.Advanced.Report");
});
//MOS.Advanced.DebugLog
onEvent("MOS.Advanced.DebugLog.Bar.Back", "click", function( ) {
  ssetscreen("MOS.Advanced");
});
var Log = [];
var logpluserr = Log + "***" + errors;
function Logg(data) {
  Log[(Log.length + 1)] = SOA2.shiftString(data);
  logpluserr = Log + errors;
  setText("MOS.Advanced.DebugLog.Log", logpluserr);
}
//MOS.Advanced.Report
onEvent("MOS.Advanced.Report.Bar.Back", "click", function( ) {
  ssetscreen("MOS.Advanced");
});
onEvent("MOS.Advanced.Report.Button.1", "click", function( ) {
  createRecord("Bug", {version:FullVersion, token:(SOA2.generateRandomString(10)), "bug":(getText("MOS.Advanced.Report.Input.1")), userid:(getUserId()) });
});
//MOS.OOS2.Setup.1
onEvent("MOS.OOS2.Setup.1.Bar.Back", "click", function( ) {
  ssetscreen("MOS.Advanced");
});
onEvent("MOS.OOS2.Setup.1.Button.1", "click", function( ) {
  ssetscreen("MOS.OOS2.Setup.2");
});
//MOS.OOS2.Setup.2
onEvent("MOS.OOS2.Setup.2.Bar.Back", "click", function( ) {
  ssetscreen("MOS.OOS2.Setup.1");
});
onEvent("MOS.OOS2.Setup.2.Button.1", "click", function( ) {
  OOSSetUp = 1;
  OOSBoot = getText("MOS.OOS2.Setup.2.Input.1");
  ssetscreen("MOS.OOS2.Menu");
});
//MOS.OOS2.Menu
hideElement("MOS.OOS2.Menu.Button.1");
onEvent("MOS.OOS2.Menu.Bar.Back", "click", function( ) {
  ssetscreen("MOS.Advanced");
});
onEvent("MOS.OOS2.Menu.Button.4", "click", function( ) {
  ssetscreen(OOSBoot);
});
//MOS.Tips / MOS.Notes
onEvent("MOS.Tips.Bar.Back", "click", function( ) {
  ssetscreen("MOS.Homescreen");
});
onEvent("MOS.Notes.Bar.Back", "click", function( ) {
  ssetscreen("MOS.Homescreen");
});
//MOS.Settings
onEvent("MOS.Settings.Bar.Back", "click", function( ) {
  ssetscreen("MOS.Homescreen");
});
onEvent("MOS.Settings.Button.1", "click", function( ) {
  ssetscreen("MOS.Settings.Wallpapers");
});
onEvent("MOS.Settings.Button.2", "click", function( ) {
  ssetscreen("MOS.Settings.About");
});
onEvent("MOS.Settings.Button.3", "click", function( ) {
  ssetscreen("MOS.Settings.Advanced");
});
onEvent("MOS.Settings.Button.4", "click", function( ) {
  ssetscreen("MOS.Accounts");
});
//MOS.Settings.Advanced
onEvent("MOS.Settings.Advanced.Bar.Back", "click", function( ) {
  ssetscreen("MOS.Settings");
});
onEvent("MOS.Settings.Advanced.Button.1", "click", function( ) {
  ssetscreen("MOS.Settings.Customizer");
});
onEvent("MOS.Settings.Advanced.Button.2", "click", function( ) {
if (OOSSetUp == 0) {
  ssetscreen("MOS.Settings.OtherOSSetup0");
} else {
  ssetscreen("MOS.Settings.OOSManager");
}
});
onEvent("MOS.Settings.Advanced.Button.3", "click", function( ) {
  ssetscreen("MOS.Settings.Modules");
});
onEvent("MOS.Settings.Advanced.Button.4", "click", function( ) {
  ssetscreen("MOS.Settings.Languages");
});
onEvent("MOS.Settings.Advanced.Button.5", "click", function( ) {
  SOA2.BIOS("MOS.Lock");
});
//MOS.Settings.About
onEvent("MOS.Settings.About.Bar.Back", "click", function( ) {
  ssetscreen("MOS.Settings");
});
//MOS.Settings.Customizer
onEvent("MOS.Settings.Customizer.Bar.Back", "click", function( ) {
  ssetscreen("MOS.Settings.Advanced");
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
    iconSize(45);
  } else {
    iconSize(35);
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
  setProperty("MOS.Homescreen.icon.9", "icon-color", rgb(r,g,b));
  setProperty("MOS.Homescreen.icon.10", "icon-color", rgb(r,g,b));
  setProperty("MOS.Homescreen.icon.11", "icon-color", rgb(r,g,b));
  setProperty("MOS.Homescreen.icon.12", "icon-color", rgb(r,g,b));
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
  setProperty("MOS.Homescreen.icon.9", "width", size);
  setProperty("MOS.Homescreen.icon.10", "width", size);
  setProperty("MOS.Homescreen.icon.11", "width", size);
  setProperty("MOS.Homescreen.icon.12", "width", size);
  setProperty("MOS.Homescreen.icon.1", "height", size);
  setProperty("MOS.Homescreen.icon.2", "height", size);
  setProperty("MOS.Homescreen.icon.3", "height", size);
  setProperty("MOS.Homescreen.icon.4", "height", size);
  setProperty("MOS.Homescreen.icon.5", "height", size);
  setProperty("MOS.Homescreen.icon.6", "height", size);
  setProperty("MOS.Homescreen.icon.7", "height", size);
  setProperty("MOS.Homescreen.icon.8", "height", size);
  setProperty("MOS.Homescreen.icon.9", "height", size);
  setProperty("MOS.Homescreen.icon.10", "height", size);
  setProperty("MOS.Homescreen.icon.11", "height", size);
  setProperty("MOS.Homescreen.icon.12", "height", size);
}
//MOS.Settings.Wallpapers
onEvent("MOS.Settings.Wallpapers.Bar.Back", "click", function( ) {
  ssetscreen("MOS.Settings");
});
onEvent("MOS.Settings.Wallpapers.Bar.Next", "click", function( ) {
  ssetscreen("MOS.Settings.Wallpapers2");
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
  wallpaper("https://i.pinimg.com/originals/e4/5f/ff/e45fffa7609c6a89342f57532f1e3c83.jpg");
});
onEvent("MOS.Settings.Wallpapers.Wallpaper.05", "click", function( ) {
  wallpaper("432810-1080x1920.jpg");
});
onEvent("MOS.Settings.Wallpapers.Wallpaper.06", "click", function( ) {
  wallpaper("433468-1080x1920.jpg");
});
onEvent("MOS.Settings.Wallpapers.Wallpaper.07", "click", function( ) {
  wallpaper("Simple-Phone-Wallpaper-(1).jpg");
});
onEvent("MOS.Settings.Wallpapers.Wallpaper.08", "click", function( ) {
  wallpaper("Simple-Phone-Wallpaper.jpg");
});
//MOS.Settings.Wallpapers2
onEvent("MOS.Settings.Wallpapers2.Bar.Back", "click", function( ) {
  ssetscreen("MOS.Settings.Wallpapers");
});
onEvent("MOS.Settings.Wallpapers.Wallpaper.09", "click", function( ) {
  wallpaper("https://th.bing.com/th/id/OIP.2Oj1AiatJjMxRKbeqOPfgwHaNK?rs=1&pid=ImgDetMain");
});
onEvent("MOS.Settings.Wallpapers.Wallpaper.10", "click", function( ) {
  wallpaper("https://th.bing.com/th/id/OIP.UVuzXhrvLU_wt8IB1KRRCgHaQB?rs=1&pid=ImgDetMain");
});
onEvent("MOS.Settings.Wallpapers.Wallpaper.11", "click", function( ) {
  wallpaper("https://mymind.com/wp-content/uploads/2021/07/cover_New-Feature_-A-Focus-Mode-for-your-mind-notes.png");
});
onEvent("MOS.Settings.Wallpapers.Wallpaper.12", "click", function( ) {
  wallpaper("wallpaper1-mos.png");
});
onEvent("MOS.Settings.Wallpapers.Wallpaper.13", "click", function( ) {
  wallpaper("wallpaper1-mos.png");
});
onEvent("MOS.Settings.Wallpapers.Wallpaper.14", "click", function( ) {
  wallpaper("wallpaper1-mos.png");
});
onEvent("MOS.Settings.Wallpapers.Wallpaper.15", "click", function( ) {
  wallpaper("wallpaper1-mos.png");
});
function wallpaper(img) {
  if (acctoken != "") {
    readRecords("Accounts", {}, function(records) {
      for (var i = 0; i < records.length; i++) {
        if (records[i].token == acctoken) {
          updateRecord("Accounts", {id:(i+1), token:records[i].token, "lastloggedintime":(SOA.gettime(1)), lastloggedindate:(SOA.getdate()), username:records[i].username,isdisabled:records[i].isdisabled, wallpaper:img, displayname:records[i].displayname, epassword:(records[i].epassword), isadmin:records[i].isadmin, onetimecode:records[i].onetimecode, userid:records[i].userid });
        }
      }
    });
  }
  setProperty("MOS.Homescreen", "image", img);
  setProperty("MOS.Settings", "image", img);
  setProperty("MOS.Settings.About", "image", img);
  setProperty("MOS.Settings.Advanced", "image", img);
  setProperty("MOS.Settings.Customizer", "image", img);
  setProperty("MOS.Settings.Wallpapers", "image", img);
  setProperty("MOS.Settings.Wallpapers2", "image", img);
  setProperty("MOS.Settings.Modules", "image", img);
  setProperty("MOS.Settings.Languages", "image", img);
  setProperty("MOS.Tips", "image", img);
  setProperty("MOS.Notes", "image", img);
  setProperty("MOS.Music", "image", img);
  setProperty("MOS.Music.Authors", "image", img);
  setProperty("MOS.Appstore", "image", img);
  setProperty("MOS.Paint", "image", img);
  setProperty("MOS.Tests", "image", img);
  setProperty("MOS.Advanced", "image", img);
  setProperty("MOS.Advanced.Report", "image", img);
  setProperty("MOS.Advanced.DebugLog", "image", img);
  setProperty("MOS.OOS2.Setup.1", "image", img);
  setProperty("MOS.OOS2.Setup.2", "image", img);
  setProperty("MOS.OOS2.Menu", "image", img);
  setProperty("MOS.Accounts", "image", img);
  setProperty("MOS.Accounts.OTC", "image", img);
  setProperty("MOS.Accounts.Signin", "image", img);
  setProperty("MOS.Lock", "image", img);
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
  ssetscreen("MOS.Settings.Advanced");
});
//App.appstore
onEvent("MOS.Appstore.Music.Install", "click", function( ) {
  if (installapp("Music", "icon://fa-music") == 1) {
    showElement("MOS.Appstore.Music.Uninstall");
    hideElement("MOS.Appstore.Music.Install");
  }
});
onEvent("MOS.Appstore.Music.Uninstall", "click", function( ) {
  showElement("MOS.Appstore.Music.Install");
  hideElement("MOS.Appstore.Music.Uninstall");
  stopSound();
  deleteapp("Music");
});
onEvent("MOS.Appstore.Paint.Install", "click", function( ) {
  if (installapp("Paint", "icon://fa-paint-brush") == 1) {
    showElement("MOS.Appstore.Paint.Uninstall");
    hideElement("MOS.Appstore.Paint.Install");
  }
});
onEvent("MOS.Appstore.Paint.Uninstall", "click", function( ) {
  showElement("MOS.Appstore.Paint.Install");
  hideElement("MOS.Appstore.Paint.Uninstall");
  deleteapp("Paint");
});
onEvent("MOS.Appstore.Notes.Install", "click", function( ) {
  if (installapp("Notes", "icon://fa-sticky-note") == 1) {
    showElement("MOS.Appstore.Notes.Uninstall");
    hideElement("MOS.Appstore.Notes.Install");
  }
});
onEvent("MOS.Appstore.Notes.Uninstall", "click", function( ) {
  showElement("MOS.Appstore.Notes.Install");
  hideElement("MOS.Appstore.Notes.Uninstall");
  deleteapp("Notes");
});
onEvent("MOS.Appstore.Bar.Back", "click", function( ) {
  ssetscreen("MOS.Homescreen");
});
//MOS.Accounts
onEvent("MOS.Accounts.Bar.Back", "click", function( ) {
  ssetscreen("MOS.Settings");
});
onEvent("MOS.Accounts.Button.1", "click", function( ) {
  ssetscreen("MOS.Accounts.Signin");
});
onEvent("MOS.Accounts.Button.2", "click", function( ) {
  ssetscreen("MOS.Accounts.Manage");
});
onEvent("MOS.Accounts.Button.3", "click", function( ) {
  ssetscreen("MOS.Accounts.OTC");
});
//MOS.Accounts.Signin
onEvent("MOS.Accounts.Signin.Bar.Back", "click", function( ) {
  ssetscreen("MOS.Accounts");
});
var encodedusrid = AES256.encrypt(getUserId(), getUserId());
function signup(username, pass) {
var usrnm = username.toLowerCase();
if (usrnm != "") {
  var encodedpass = AES256.encrypt(pass, getUserId());
  createRecord("Accounts", {token:(SOA.generateRandomString(50)), "lastloggedintime":(SOA.gettime(1)), lastloggedindate:(SOA.getdate()), username:usrnm,isdisabled:0, wallpaper:"", displayname:usrnm, epassword:encodedpass, isadmin:"0", onetimecode:(randomNumber(111111, 999999)), userid:encodedusrid });
  login(username, pass);
}
}
function login(username, pass) {
  var usrnm = username.toLowerCase();
  if (usrnm != "") {
    ssetscreen("MOS.Boot");
    readRecords("Accounts", {}, function(records) {
      for (var i = 0; i < records.length; i++) {
        if (records[i].username == usrnm) {
          if (AES256.decrypt((records[i]).epassword, AES256.decrypt(encodedusrid, getUserId())) == pass) {
            console.log("Logged in!");
            acctoken = records[i].token;
            Username = usrnm;
            updateRecord("Accounts", {id:(i+1), token:records[i].token, "lastloggedintime":(SOA.gettime(1)), lastloggedindate:(SOA.getdate()), username:records[i].username,isdisabled:records[i].isdisabled, wallpaper:records[i].wallpaper, displayname:records[i].displayname, epassword:(records[i].epassword), isadmin:records[i].isadmin, onetimecode:records[i].onetimecode, userid:records[i].userid });
            if (records[i].isadmin == 1) {
              meow();
            }
            if (records[i].wallpaper != "") {
              wallpaper(records[i].wallpaper);
            }
            ssetscreen("MOS.Accounts");
            setText("MOS.Accounts.OTC.Text.1", records[i].onetimecode);
            setText("MOS.Accounts.Signin.Input.2", "");
            showElement("MOS.Accounts.Button.3");
          } else if (records[i].onetimecode == pass) {
            console.log("Logged in!");
            acctoken = records[i].token;
            Username = usrnm;
            updateRecord("Accounts", {id:(i+1), token:records[i].token, "lastloggedintime":(SOA.gettime(1)), lastloggedindate:(SOA.getdate()), username:records[i].username,isdisabled:records[i].isdisabled, wallpaper:records[i].wallpaper, displayname:records[i].displayname, epassword:(records[i].epassword), isadmin:records[i].isadmin, onetimecode:records[i].onetimecode, userid:records[i].userid });
            if (records[i].isadmin == 1) {
              meow();
            }
            if (records[i].wallpaper != "") {
              wallpaper(records[i].wallpaper);
            }
            ssetscreen("MOS.Accounts");
            setText("MOS.Accounts.OTC.Text.1", records[i].onetimecode);
            setText("MOS.Accounts.Signin.Input.2", "");
            showElement("MOS.Accounts.Button.3");
          } else {
            ssetscreen("MOS.Accounts.Signin");
            setText("MOS.Accounts.Signin.Text.1", "Incorrect pass/otc");
          }
        }
      }
    });
  }
}
onEvent("MOS.Accounts.Signin.Button.1", "click", function( ) {
  login(getText("MOS.Accounts.Signin.Input.1"), getText("MOS.Accounts.Signin.Input.2"));
});
onEvent("MOS.Accounts.Signin.Button.2", "click", function( ) {
  signup(getText("MOS.Accounts.Signin.Input.1"), getText("MOS.Accounts.Signin.Input.2"));
});
//MOS.Accounts.OTC
onEvent("MOS.Accounts.OTC.Bar.Back", "click", function( ) {
  ssetscreen("MOS.Accounts");
});
onEvent("MOS.Accounts.OTC.Button.1", "click", function( ) {
  if (acctoken != "") {
    readRecords("Accounts", {}, function(records) {
      for (var i = 0; i < records.length; i++) {
        if ((records[i]).token == acctoken) {
          updateRecord("Accounts", {id:(i+1), token:records[i].token, "lastloggedintime":(SOA.gettime(1)), lastloggedindate:(SOA.getdate()), username:records[i].username,isdisabled:records[i].isdisabled, wallpaper:records[i].wallpaper, displayname:records[i].displayname, epassword:(records[i].epassword), isadmin:records[i].isadmin, onetimecode:(randomNumber(111111, 999999)), userid:records[i].userid });
          setText("MOS.Accounts.OTC.Text.1", records[i].onetimecode);
        }
      }
    });
  }
});
//MOS.Music
onEvent("MOS.Music.Bar.Back", "click", function( ) {
  ssetscreen("MOS.Homescreen");
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
  ssetscreen("MOS.Homescreen");
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
  ssetscreen("MOS.Settings.Advanced");
});
//Sets the language to OOS
function lang(id) {
  if (id == 0) {
    //English
    setText("MOS.Settings.Languages.Background", "Languages"); //Languages
    setText("MOS.Settings.Advanced.Button.4", "Languages"); //Languages
    setText("MOS.Settings.Button.1", "Wallpapers"); //Wallpapers
    setText("MOS.Settings.Wallpapers.Background", "Wallpapers");//wallpapers
    setText("MOS.Settings.Modules.Mod1", "Wallpapers"); //Wallpapers
    setText("MOS.Settings.Button.2", "About"); //about 
    setText("MOS.Settings.Button.3", "Advanced"); //advanced
    setText("MOS.Settings.Advanced.Button.1", "Advanced Customization"); //Advanced customization
    setText("MOS.Settings.Customizer.Background", "Customizer"); //customizer
    setText("MOS.Settings.Customizer.Label.1", "Text Scale"); //icon scale
    setText("MOS.Settings.Customizer.Label.3", "Icon Size"); //icon size
    setText("MOS.Settings.Customizer.Label.2", "Icon Color"); //icon color
    setText("MOS.Settings.Modules.Background", "Modules"); //modules
    setText("MOS.Settings.Advanced.Background", "Developer Options"); //developer options
    setText("MOS.Settings.Advanced.Button.3", "Modules"); //modules
    setText("MOS.Settings.Modules.Mod3", "Customizer"); //customizer
    setText("MOS.Settings.Modules.Mod4", "System process"); //system process
    setText("MOS.Settings.Modules.Mod5", "Module finder"); //module finder
    setText("MOS.Settings.Modules.Mod2", "OOS"); //OOS
    setText("MOS.Settings.Advanced.Button.2", "Other OS"); //Other OS
    setText("MOS.Settings.Background", "Settings"); //settings
    setText("MOS.Appstore.Background", "App Store"); //app store
    setText("MOS.Appstore.Music.Text.1", "Music"); //music
    setText("MOS.Appstore.Paint.Text.1", "Paint");//paint
    setText("MOS.Appstore.Notes.Text.1", "Notes");//notes
    setText("MOS.Notes.text.1", "Notes");//notes
    setText("MOS.Music.Song.Stop", "Stop Music"); //stop music
    setText("MOS.Music.Background", "Music"); //music
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
    setText("MOS.Settings.Languages.Background", "{ж;зъ}");//Languages
    setText("MOS.Settings.Advanced.Button.4", "{ж;зъ}");//Languages
    setText("MOS.Settings.Button.1", "{ж;бэлъзвдп}");//Wallpapers
    setText("MOS.Settings.Wallpapers.Background", "{ж;бэлъзвдп}");//wallpapers
    setText("MOS.Settings.Modules.Mod1", "{ж;бэлъзвдп}");//Wallpapers
    setText("MOS.Settings.Button.2", "{фэтх}");//about 
    setText("MOS.Settings.Button.3", "{фдпбъ}");//advanced
    setText("MOS.Settings.Advanced.Button.1", "{чдзбд;эьэбхп фдпбъ}");//Advanced customization
    setText("MOS.Settings.Customizer.Background", "{дпбшюдюш;эьэбхп}");//customizer
    setText("MOS.Settings.Customizer.Label.1", "{дфэюэвх бх}");//icon scale
    setText("MOS.Settings.Customizer.Label.3", "{дфэюэвх вдцхзп}");//icon size
    setText("MOS.Settings.Customizer.Label.2", "{чдз вдцхзп}");//icon color
    setText("MOS.Settings.Modules.Background", "{ж;цдзфэз}");//modules
    setText("MOS.Settings.Advanced.Background", "ж:ндьхпз бъюдзз");//developer options
    setText("MOS.Settings.Advanced.Button.3", "{ж;цдзфэз}");//modules
    setText("MOS.Settings.Modules.Mod3", "{дпбшюдюш;эьэбхп}");//customizer
    setText("MOS.Settings.Modules.Mod4", "System process");//system process
    setText("MOS.Settings.Modules.Mod5", "Module finder"); //module finder
    setText("MOS.Settings.Modules.Mod2", "[OOS]");//OOS
    setText("MOS.Settings.Advanced.Button.2", "{яътш ндядп}");//Other OS
    setText("MOS.Settings.Background", "{ж;ндьхпз}");//settings
    setText("MOS.Appstore.Background", "{ьшззбшзз вдцхзп}");//app store
    setText("MOS.Appstore.Music.Text.1", "{фхзтдчэп}");//music
    setText("MOS.Appstore.Paint.Text.1", "{вдбдз}");//paint
    setText("MOS.Appstore.Notes.Text.1", "{цдзз;цдзз}");//notes
    setText("MOS.Notes.text.1", "{цдзз;цдзз}");//notes
    setText("MOS.Music.Song.Stop", "{фхзтдчэп яэях}");//stop music
    setText("MOS.Music.Background", "{фхзтдчэп}");//music
  } else if (id == 6) {
    //Phonemic English
    setText("MOS.Settings.Languages.Background", "Lāŋwajes");//Languages
    setText("MOS.Settings.Advanced.Button.4", "Lāŋwajes");//Languages
    setText("MOS.Settings.Button.1", "WälpāpŘs");//Wallpapers
    setText("MOS.Settings.Wallpapers.Background", "WälpāpŘs");//wallpapers
    setText("MOS.Settings.Modules.Mod1", "WälpāpŘs");//Wallpapers
    setText("MOS.Settings.Button.2", "àbowt");//about 
    setText("MOS.Settings.Button.3", "Ädvansd");//advanced
    setText("MOS.Settings.Advanced.Button.1", "Ädvansd Kușomezāßõn");//Advanced customization
    setText("MOS.Settings.Customizer.Background", "KușomizŘ");//customizer
    setText("MOS.Settings.Customizer.Label.1", "Tëkș Skāl");//icon scale
    setText("MOS.Settings.Customizer.Label.3", "Ikon Siz");//icon size
    setText("MOS.Settings.Customizer.Label.2", "Ikon CõlŘ");//icon color
    setText("MOS.Settings.Modules.Background", "Mädulz");//modules
    setText("MOS.Settings.Advanced.Background", "DëvëlëpŘ Äpßõns");//developer options
    setText("MOS.Settings.Advanced.Button.3", "Mädulz");//modules
    setText("MOS.Settings.Modules.Mod3", "KușomizŘ");//customizer
    setText("MOS.Settings.Modules.Mod4", "System process"); //system process
    setText("MOS.Settings.Modules.Mod5", "Module finder"); //module finder
    setText("MOS.Settings.Modules.Mod2", "OOS"); //OOS
    setText("MOS.Settings.Advanced.Button.2", "Other OS"); //Other OS
    setText("MOS.Settings.Background", "Settings"); //settings
    setText("MOS.Appstore.Background", "App Store"); //app store
    setText("MOS.Appstore.Music.Text.1", "Muzek");//music
    setText("MOS.Appstore.Paint.Text.1", "Paint");//paint
    setText("MOS.Appstore.Notes.Text.1", "Notes");//notes
    setText("MOS.Notes.text.1", "Notes");//notes
    setText("MOS.Music.Song.Stop", "Stop Muzek");//stop music
    setText("MOS.Music.Background", "Muzek");//music
  } else {
    
  }
}
function installapp(appname, iconn) {
  for (var i = 0; i < icons.length; i++) {
    if (icons[i] === "" || icons[i] === undefined) {
      icons[i] = appname;
      setProperty("MOS.Homescreen.icon." + (i + 1), "image", iconn);
      showElement("MOS.Homescreen.icon." + (i + 1));
      return 1; 
    }
  }
  err(8); 
  return 0;
}
function deleteapp(appname) {
  for (var i = 0; i < icons.length; i++) {
    if (icons[i] == appname) {
      icons[i] = "";
      setProperty("MOS.Homescreen.icon." + (i + 1), "image", "icon://fa-question");
      hideElement("MOS.Homescreen.icon." + (i + 1));
      if (i === 2) {
        setText("Dev.input.3", "");
      }
      return; 
    }
  }
  err(8); 
}
