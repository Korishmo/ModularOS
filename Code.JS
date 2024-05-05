//MOS
var Version = 1;
var Subversion = 0;
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
            //Don't Set Manually, Use KeyValues
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
  wallpaper("https://9to5mac.com/wp-content/uploads/sites/6/2022/06/WWDC22.png");
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
    ssetscreen("MOS.Setup1");
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
  setText("MOS.Lock.Time2", SOA2.gettime(twentyfourhourtime));
  setText("MOS.Lock.Time", Text);
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
  setText("MOS.Setup1.Time", Text);
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
onEvent("MOS.Setup1.Bar.Next", "click", function( ) {
  ssetscreen("MOS.Lock");
});
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
  wallpaper("https://9to5mac.com/wp-content/uploads/sites/6/2022/06/WWDC22.png");
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
  setProperty("MOS.Setup1", "image", img);
  setProperty("SOA.BIOS", "image", img);
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
//eng
var lang0 = ["Languages", "Wallpapers", "About", "Advanced", "Advanced Customization", "Customizer", "Icon Scale", "Icon Size", "Icon Color", "Modules", "Other OS", "Settings", "meow", "meow", "Developer Options", "App Store", "Music", "Paint", "Notes", "Stop Music"];
//filipino
var lang1 = ["Mga Wika", "Mga Wallpaper", "Tungkol sa", "Advanced", "Advanced na Pag-customize", "Customizer", "Icon Scale", "Laki ng Icon", "Kulay ng Icon", "Mga Module", "Iba pa OS", "Mga Setting", "meow", "meow", "Developer Options", "App Store", "Music", "Paint", "Notes", "Stop Music"];
//shavian
var lang2 = ["𐑤𐑨𐑙𐑜𐑢𐑦𐑡𐑩𐑟", "𐑢𐑷𐑤𐑐𐑱𐑐𐑼𐑟", "𐑩𐑚𐑬𐑑", "𐑩𐑛𐑝𐑨𐑯𐑕𐑑", "𐑩𐑛𐑝𐑨𐑯𐑕𐑑 ·𐑒𐑳𐑕𐑑𐑩𐑥𐑦𐑟𐑱𐑖𐑩𐑯", "𐑒𐑳𐑕𐑑𐑩𐑥𐑲𐑟𐑼", "𐑲𐑒𐑪𐑯 ·𐑕𐑒𐑱𐑤", "𐑲𐑒𐑪𐑯 ·𐑕𐑲𐑟", "𐑲𐑒𐑪𐑯 ·𐑒𐑳𐑤𐑼", "𐑥𐑪𐑡𐑵𐑤𐑟", "𐑳𐑞𐑼 ·𐑴𐑕", "𐑕𐑧𐑑𐑦𐑙𐑟", "𐑥𐑰𐑬", "𐑥𐑰𐑬", "𐑛𐑦𐑝𐑧𐑤𐑩𐑐𐑼 ·𐑪𐑐𐑖𐑩𐑯𐑟", "𐑨𐑐 ·𐑕𐑑𐑹", "𐑥𐑿𐑟𐑦𐑒", "𐑐𐑱𐑯𐑑", "𐑯𐑴𐑑𐑕", "𐑕𐑑𐑪𐑐 ·𐑥𐑿𐑟𐑦𐑒"];
if (id == 0) {
setText("MOS.Settings.Languages.Background", lang0[0]);//Languages
setText("MOS.Settings.Advanced.Button.4", lang0[0]);//Language
setText("MOS.Settings.Button.1", lang0[1]);//Wallpapers
setText("MOS.Settings.Wallpapers.Background", lang0[1]);//wallpapers
setText("MOS.Settings.Modules.Mod1", lang0[1]);//Wallpapers
setText("MOS.Settings.Button.2", lang0[2]);//about 
setText("MOS.Settings.Button.3", lang0[3]);//advanced
setText("MOS.Settings.Advanced.Button.1", lang0[4]);//Advanced customization
setText("MOS.Settings.Customizer.Background", lang0[5]);//customizer
setText("MOS.Settings.Customizer.Label.1", lang0[6]);//icon scale
setText("MOS.Settings.Customizer.Label.3", lang0[7]);//icon size
setText("MOS.Settings.Customizer.Label.2", lang0[8]);//icon color
setText("MOS.Settings.Modules.Background", lang0[9]);//modules
setText("MOS.Settings.Advanced.Background", lang0[14]);//developer options
setText("MOS.Settings.Advanced.Button.3", lang0[9]);//modules
setText("MOS.Settings.Modules.Mod3", lang0[5]);//customizer
setText("MOS.Settings.Modules.Mod4", lang0[12]);//system process
setText("MOS.Settings.Modules.Mod5", lang0[13]);//module finder
setText("MOS.Settings.Modules.Mod2", lang0[10]);//OOS
setText("MOS.Settings.Advanced.Button.2", lang0[10]);//Other OS
setText("MOS.Settings.Background", lang0[11]);//settings
setText("MOS.Appstore.Background", lang0[15]);//app store
setText("MOS.Appstore.Music.Text.1", lang0[16]);//music
setText("MOS.Appstore.Paint.Text.1", lang0[17]);//paint
setText("MOS.Appstore.Notes.Text.1", lang0[18]);//notes
setText("MOS.Notes.text.1", lang0[18]);//notes
setText("MOS.Music.Song.Stop", lang0[19]);//stop music
setText("MOS.Music.Background", lang0[16]);//music
}
if (id == 1) {
setText("MOS.Settings.Languages.Background", lang1[0]);//Languages
setText("MOS.Settings.Advanced.Button.4", lang1[0]);//Language
setText("MOS.Settings.Button.1", lang1[1]);//Wallpapers
setText("MOS.Settings.Wallpapers.Background", lang1[1]);//wallpapers
setText("MOS.Settings.Modules.Mod1", lang1[1]);//Wallpapers
setText("MOS.Settings.Button.2", lang1[2]);//about 
setText("MOS.Settings.Button.3", lang1[3]);//advanced
setText("MOS.Settings.Advanced.Button.1", lang1[4]);//Advanced customization
setText("MOS.Settings.Customizer.Background", lang1[5]);//customizer
setText("MOS.Settings.Customizer.Label.1", lang1[6]);//icon scale
setText("MOS.Settings.Customizer.Label.3", lang1[7]);//icon size
setText("MOS.Settings.Customizer.Label.2", lang1[8]);//icon color
setText("MOS.Settings.Modules.Background", lang1[9]);//modules
setText("MOS.Settings.Advanced.Background", lang1[14]);//developer options
setText("MOS.Settings.Advanced.Button.3", lang1[9]);//modules
setText("MOS.Settings.Modules.Mod3", lang1[5]);//customizer
setText("MOS.Settings.Modules.Mod4", lang1[12]);//system process
setText("MOS.Settings.Modules.Mod5", lang1[13]);//module finder
setText("MOS.Settings.Modules.Mod2", lang1[10]);//OOS
setText("MOS.Settings.Advanced.Button.2", lang1[10]);//Other OS
setText("MOS.Settings.Background", lang1[11]);//settings
setText("MOS.Appstore.Background", lang1[15]);//app store
setText("MOS.Appstore.Music.Text.1", lang1[16]);//music
setText("MOS.Appstore.Paint.Text.1", lang1[17]);//paint
setText("MOS.Appstore.Notes.Text.1", lang1[18]);//notes
setText("MOS.Notes.text.1", lang1[18]);//notes
setText("MOS.Music.Song.Stop", lang1[19]);//stop music
setText("MOS.Music.Background", lang1[16]);//music
}
if (id == 2) {
setText("MOS.Settings.Languages.Background", lang2[0]);//Languages
setText("MOS.Settings.Advanced.Button.4", lang2[0]);//Language
setText("MOS.Settings.Button.1", lang2[1]);//Wallpapers
setText("MOS.Settings.Wallpapers.Background", lang2[1]);//wallpapers
setText("MOS.Settings.Modules.Mod1", lang2[1]);//Wallpapers
setText("MOS.Settings.Button.2", lang2[2]);//about 
setText("MOS.Settings.Button.3", lang2[3]);//advanced
setText("MOS.Settings.Advanced.Button.1", lang2[4]);//Advanced customization
setText("MOS.Settings.Customizer.Background", lang2[5]);//customizer
setText("MOS.Settings.Customizer.Label.1", lang2[6]);//icon scale
setText("MOS.Settings.Customizer.Label.3", lang2[7]);//icon size
setText("MOS.Settings.Customizer.Label.2", lang2[8]);//icon color
setText("MOS.Settings.Modules.Background", lang2[9]);//modules
setText("MOS.Settings.Advanced.Background", lang2[14]);//developer options
setText("MOS.Settings.Advanced.Button.3", lang2[9]);//modules
setText("MOS.Settings.Modules.Mod3", lang2[5]);//customizer
setText("MOS.Settings.Modules.Mod4", lang2[12]);//system process
setText("MOS.Settings.Modules.Mod5", lang2[13]);//module finder
setText("MOS.Settings.Modules.Mod2", lang2[10]);//OOS
setText("MOS.Settings.Advanced.Button.2", lang2[10]);//Other OS
setText("MOS.Settings.Background", lang2[11]);//settings
setText("MOS.Appstore.Background", lang2[15]);//app store
setText("MOS.Appstore.Music.Text.1", lang2[16]);//music
setText("MOS.Appstore.Paint.Text.1", lang2[17]);//paint
setText("MOS.Appstore.Notes.Text.1", lang2[18]);//notes
setText("MOS.Notes.text.1", lang2[18]);//notes
setText("MOS.Music.Song.Stop", lang2[19]);//stop music
setText("MOS.Music.Background", lang2[16]);//music
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
