//MOS
var Version = 0;
var Subversion = 2;
var Subsubversion = 3;
var Subsubsubversion = 0;
var VersionText = ((((((("Version " + Version) + ".") + Subversion) + ".") + Subsubversion + "." + Subsubsubversion) + "\n Build ") + "15") + "";
var MusicID = 2;
var Apps = ["Settings", "App Store"];
var Beta = 1;
var OOSHome = "";
var OOSTerminalSetUp = 0;
var OOSTerminal = "";
var ISOOS = 0;
var OOSSetUp = 0;
var SCR = "MOS.Boot";
//DO NOT MODIFY!
function Errservice(errcode) {
  if (errcode == 1) {
    return "Fatal system error";
  } else if (errcode == 2) {
    return "Fatal appstore error";
  } else if (errcode == 3) {
    return "Fatal settings error";
  } else if (errcode == 4) {
    return "Fatal music error";
  } else if ((errcode == 5)) {
    return "App doesn't exist";
  } else if ((errcode == 6)) {
    return "Missing data";
  } else if ((errcode == 7)) {
    return "Not avaliable";
  }
}
function Supersetscreen(scr) {
  SCR = scr;
  setScreen(scr);
}
//Boot Modular-OS 
MOSBoot();
timedLoop(100, function() {
  setText("MOS.Homescreen.Time", (SOA.gettime() + "                      ") + SOA.getdate());
  lang(getProperty("MOS.Language", "index"));
  if (Beta == 1) {
    setText("MOS.Settings.About.Background", ("About \n \n \n" + VersionText) + "\n Beta Build .idex-1" + "\n \n This OS is made with open source projects like SOA!");
  } else {
    setText("MOS.Settings.About.Background", ("About \n \n \n" + VersionText) +  "\n \n This OS is made with open source projects like SOA!");
  }
});
function MOSBoot() {
  setTimeout(function() {
    Supersetscreen("MOS.Homescreen");
    console.log("Korishmo Technology Pre-release Operating System Modular-OS " + Version + "."+Subversion+"."+Subsubversion);
    console.log("This tool is only for developers, if someone asked to type something here, it could make your device unbootable");
    showElement("MOS.Homescreen.icon.1");
    showElement("MOS.Homescreen.icon.2");
    setProperty("MOS.Homescreen.icon.1", "image", "icon://fa-cogs");
    setProperty("MOS.Homescreen.icon.2", "image", "icon://fa-download");
  }, 370);
}
//Homescreen
onEvent("MOS.Homescreen.icon.1", "click", function( ) {
  Supersetscreen("MOS.Settings");
});
onEvent("MOS.Homescreen.icon.2", "click", function( ) {
  Supersetscreen("MOS.Appstore");
});
onEvent("MOS.Homescreen.icon.3", "click", function( ) {
  Supersetscreen("MOS.Music");
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
onEvent("MOS.Settings.Customizer.Scale.IconSize", "input", function( ) {
  if (getProperty("MOS.Settings.Customizer.Scale.IconSize", "index") == 1) {
    iconSize(55);
  } else {
    iconSize(42);
  }
});
//MOS.Settings.Modules
onEvent("MOS.Settings.Modules.Mod1", "click", function( ) {
  showElement("MOS.Settings.Modules.Mod1.Remove");
  hideElement("MOS.Settings.Modules.Mod2.Remove");
  hideElement("MOS.Settings.Modules.Mod3.Remove");
  hideElement("MOS.Settings.Modules.Mod4.Remove");
  hideElement("MOS.Settings.Modules.Mod5.Remove");
});
onEvent("MOS.Settings.Modules.Mod2", "click", function( ) {
  showElement("MOS.Settings.Modules.Mod2.Remove");
  hideElement("MOS.Settings.Modules.Mod1.Remove");
  hideElement("MOS.Settings.Modules.Mod3.Remove");
  hideElement("MOS.Settings.Modules.Mod4.Remove");
  hideElement("MOS.Settings.Modules.Mod5.Remove");
});
onEvent("MOS.Settings.Modules.Mod3", "click", function( ) {
  showElement("MOS.Settings.Modules.Mod3.Remove");
  hideElement("MOS.Settings.Modules.Mod2.Remove");
  hideElement("MOS.Settings.Modules.Mod1.Remove");
  hideElement("MOS.Settings.Modules.Mod4.Remove");
  hideElement("MOS.Settings.Modules.Mod5.Remove");
});
onEvent("MOS.Settings.Modules.Mod4", "click", function( ) {
  showElement("MOS.Settings.Modules.Mod4.Remove");
  hideElement("MOS.Settings.Modules.Mod2.Remove");
  hideElement("MOS.Settings.Modules.Mod3.Remove");
  hideElement("MOS.Settings.Modules.Mod1.Remove");
  hideElement("MOS.Settings.Modules.Mod5.Remove");
});
onEvent("MOS.Settings.Modules.Mod5", "click", function( ) {
  showElement("MOS.Settings.Modules.Mod5.Remove");
  hideElement("MOS.Settings.Modules.Mod2.Remove");
  hideElement("MOS.Settings.Modules.Mod3.Remove");
  hideElement("MOS.Settings.Modules.Mod4.Remove");
  hideElement("MOS.Settings.Modules.Mod1.Remove");
});
onEvent("MOS.Settings.Modules.Mod1.Remove", "click", function( ) {
  hideElement("MOS.Settings.Modules.Mod1.Remove");
  hideElement("MOS.Settings.Modules.Mod1");
});
onEvent("MOS.Settings.Modules.Mod2.Remove", "click", function( ) {
  hideElement("MOS.Settings.Modules.Mod2.Remove");
  hideElement("MOS.Settings.Modules.Mod2");
});
onEvent("MOS.Settings.Modules.Mod3.Remove", "click", function( ) {
  hideElement("MOS.Settings.Modules.Mod3.Remove");
  hideElement("MOS.Settings.Modules.Mod3");
});
onEvent("MOS.Settings.Modules.Mod4.Remove", "click", function( ) {
  hideElement("MOS.Settings.Modules.Mod4.Remove");
  hideElement("MOS.Settings.Modules.Mod4");
  setPosition("MOS.Settings.Modules.Mod5", 20, 200);
  setPosition("MOS.Settings.Modules.Mod5.Remove", 260, 205);
});
onEvent("MOS.Settings.Modules.Mod5.Remove", "click", function( ) {
  hideElement("MOS.Settings.Modules.Mod5.Remove");
  hideElement("MOS.Settings.Modules.Mod5");
});
onEvent("MOS.Settings.Modules.Bar.Back", "click", function( ) {
  Supersetscreen("MOS.Settings");
});
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
  wallpaper("wallpaper3-mos.png");
});
onEvent("MOS.Settings.Wallpapers.Wallpaper.04", "click", function( ) {
  wallpaper("wallpaper4-mos.png");
});
//MOS.Settings.Advanced
onEvent("MOS.Settings.Advanced.Button.2", "click", function( ) {
if (OOSSetUp == 0) {
  Supersetscreen("MOS.Settings.OtherOSSetup0");
} else {
  Supersetscreen("MOS.Settings.OOSManager");
}
});
onEvent("MOS.Settings.Advanced.Button.1", "click", function( ) {
  Supersetscreen("MOS.Settings.Customizer");
});
onEvent("MOS.Settings.Advanced.Bar.Back", "click", function( ) {
  Supersetscreen("MOS.Settings");
});
onEvent("MOS.Settings.Advanced.Button.3", "click", function( ) {
  Supersetscreen("MOS.Settings.Modules");
});
//MOS.Settings.OOS
onEvent("MOS.Settings.OOS.Bar.Back", "click", function( ) {
  Supersetscreen("MOS.Settings.Advanced");
});
onEvent("MOS.Settings.OOS.SetUp", "click", function( ) {
  Supersetscreen("MOS.Settings.OtherOSSetup1");
});
onEvent("MOS.Settings.OOS.Bar.Back", "click", function( ) {
Supersetscreen("MOS.Settings.Advanced");
});
//MOS.Settings.OOSErr
onEvent("MOS.Settings.OOSErr.OK", "click", function( ) {
	Supersetscreen("MOS.Settings.OOSManager");
});
//MOS.Settings.OOSS1
onEvent("MOS.Settings.OOSS1.Bar.Back", "click", function( ) {
  Supersetscreen("MOS.Settings");
});
onEvent("MOS.Settings.OOSS1.SetUp", "click", function( ) {
Supersetscreen("MOS.Settings.OOSManager");
OOSHome = getText("MOS.HOS");
OOSSetUp = 1;
});
onEvent("MOS.Settings.OOSS1.Bar.Back", "click", function( ) {
Supersetscreen("MOS.Settings.Advanced");
});
//App.settings.oosmanager
onEvent("MOS.Settings.OOSManager.Bar.Back", "click", function( ) {
  Supersetscreen("MOS.Settings.OOSManager");
  OOSHome = getText("MOS.HOS");
});
onEvent("MOS.Settings.OOSManager.Bar.Back", "click", function( ) {
Supersetscreen("MOS.Settings.Advanced");
});
function ToOOSHome() {
  Supersetscreen(OOSHome);
}
onEvent("MOS.Settings.OOSManager.RunOS", "click", function( ) {
ToOOSHome();
});
onEvent("MOS.Settings.OOSManager.Help", "click", function( ) {
Supersetscreen("MOS.Settings.OOSError");
setText("MOS.Settings.OOSErr.Err", "WIP");
});
function ToOOSTerminal() {
  if (OOSTerminalSetUp == 0) {
    Supersetscreen("MOS.Settings.OOSError");
    setText("MOS.Settings.OOSErr.Err", "You haven't set up terminal yet!");
  } else {
    Supersetscreen(OOSTerminal);
  }
}
onEvent("MOS.Settings.OOSManager.Terminal", "click", function( ) {
	ToOOSTerminal();
});
//App.appstore
onEvent("MOS.Appstore.Music.Install", "click", function( ) {
  showElement("MOS.Appstore.Music.Uninstall");
  hideElement("MOS.Appstore.Music.Install");
  showElement("MOS.Homescreen.icon.3");
  setProperty("MOS.Homescreen.icon.3", "image", "icon://fa-music");
  MusicInstalled = 1;
});
onEvent("MOS.Appstore.Music.Uninstall", "click", function( ) {
  hideElement("MOS.Homescreen.icon.3");
  showElement("MOS.Appstore.Music.Install");
  hideElement("MOS.Appstore.Music.Uninstall");
  stopSound();
  setProperty("MOS.Homescreen.icon.3", "image", "icon://fa-question");
  MusicInstalled = 0;
});
onEvent("MOS.Appstore.Paint.Install", "click", function( ) {
  showElement("MOS.Appstore.Music.Uninstall");
  hideElement("MOS.Appstore.Music.Install");
  showElement("MOS.Homescreen.icon.3");
  setProperty("MOS.Homescreen.icon.4", "image", "icon://fa-music");
  MusicInstalled = 1;
});
onEvent("MOS.Appstore.Paint.Uninstall", "click", function( ) {
  hideElement("MOS.Homescreen.icon.3");
  showElement("MOS.Appstore.Music.Install");
  hideElement("MOS.Appstore.Music.Uninstall");
  stopSound();
  setProperty("MOS.Homescreen.icon.4", "image", "icon://fa-question");
  MusicInstalled = 0;
});
onEvent("MOS.Appstore.Bar.Back", "click", function( ) {
  Supersetscreen("MOS.Homescreen");
});
//App.music
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
//App.settings
onEvent("MOS.Settings.Bar.Back", "click", function( ) {
  Supersetscreen("MOS.Homescreen");
});
onEvent("MOS.Settings.Button.1", "click", function( ) {
  Supersetscreen("MOS.Settings.Wallpapers");
});
onEvent("MOS.Settings.Button.3", "click", function( ) {
  Supersetscreen("MOS.Settings.Advanced");
});
onEvent("MOS.Settings.Button.2", "click", function( ) {
  Supersetscreen("MOS.Settings.About");
});
onEvent("MOS.Settings.About.Bar.Back", "click", function( ) {
  Supersetscreen("MOS.Settings");
});
//App.settings.languages
onEvent("MOS.Settings.Languages.Bar.Back", "click", function( ) {
  Supersetscreen("MOS.Settings.Advanced");
});
onEvent("MOS.Settings.Advanced.Button.4", "click", function( ) {
  Supersetscreen("MOS.Settings.Languages");
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
    setText("MOS.Settings.Modules.Mod3", "Settings App");
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
    setText("MOS.Settings.Languages.Background", "{ъчъп;зъ}");
    setText("MOS.Settings.Button.1", "{ъчъп;юдвхп}");
    setText("MOS.Settings.Button.2", "{фэтх}");
    setText("MOS.Settings.Button.3", "{фдпбъ}");
    setText("MOS.Settings.Customizer.Background", "{дпбшюдюш;эьэбхп}");
    setText("MOS.Settings.Customizer.Label.1", "{дфэюэвх бх}");
    setText("MOS.Settings.Customizer.Label.2", "{чдз бътхндзз}");
    setText("MOS.Settings.Customizer.Label.3", "{дфэюэвх бътхндзз");
    setText("MOS.Settings.Modules.Background", "{ъчъп;цдзфэз}");
    setText("MOS.Settings.Advanced.Background", "{ъчъп;ндьхпз бъюдзз}");
    setText("MOS.Settings.Advanced.Button.1", "{чдзбд;эьэбхп фдпбъ}");
    setText("MOS.Settings.Advanced.Button.2", "{ъчъп;яътш ндядп}");
    setText("MOS.Settings.Advanced.Button.3", "{ъчъп;цдзфэз}");
    setText("MOS.Settings.Advanced.Button.4", "{ъчъп;зъ}");
    setText("MOS.Settings.Modules.Mod1", "{ъчъп;юдвхп}");
    setText("MOS.Settings.Modules.Mod2", "{яътш ндядп}");
    setText("MOS.Settings.Modules.Mod3", "{вдцхзп ъчъп;ндьхпз}");
    setText("MOS.Settings.Modules.Mod4", "{вдцхзп яътш}");
    setText("MOS.Settings.Modules.Mod5", "{дпбшюдюш;вштэ цдзфэз}");
    setText("MOS.Appstore.Music.Text.1", "{фхзтдчэп}");
    setText("MOS.Music.Song.Stop", "{фхзтдчэп яъзюх}");
    setText("MOS.Settings.OOSErr.Background", "{вэвъ цш}тшз ,{ъчъп;яътш ндядп}");
    setText("MOS.Settings.OOSManager.Background", "{вэвъ цш}тшз ,{ъчъп;яътш ндядп}");
    setText("MOS.Settings.OOS.Background", "{вэвъ цш}тшз ,{ъчъп;яътш ндядп}");
    setText("MOS.Settings.OOSS1.Background", "{вэвъ цш}тшз ,{ъчъп;яътш ндядп}");
    setText("MOS.Appstore.Background", "{ьшззбшзз вдцхзп}");
    setText("MOS.Appstore.Music.Text.1", "{фхзтдчэп}");
    setText("MOS.Music.Background", "{фхзтдчэп}");
    setText("MOS.Settings.Background", "{ъчъп;ндьхпз}");
  } else {
    
  }
}
function wallpaper(img) {
  setProperty("MOS.Homescreen", "image", img);
  setProperty("MOS.Settings", "image", img);
  setProperty("MOS.Settings.About", "image", img);
  setProperty("MOS.Settings.Advanced", "image", img);
  setProperty("MOS.Settings.Customizer", "image", img);
  setProperty("MOS.Settings.Wallpapers", "image", img);
  setProperty("MOS.Settings.OOSError", "image", img);
  setProperty("MOS.Settings.OOSManager", "image", img);
  setProperty("MOS.Settings.OtherOSSetup0", "image", img);
  setProperty("MOS.Settings.OtherOSSetup1", "image", img);
  setProperty("MOS.Settings.Modules", "image", img);
}
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
  setProperty("MOS.Settings.Background", "font-size", fs);
  setProperty("MOS.Settings.Button.3", "font-size", fs);
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
