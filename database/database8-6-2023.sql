/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: band
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `band` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_band` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `deccode` varchar(255) DEFAULT NULL,
  `decoderDans` varchar(255) DEFAULT NULL,
  `device_band` varchar(255) DEFAULT NULL,
  `ip_band` varchar(255) DEFAULT NULL,
  `country_band` varchar(2) DEFAULT NULL,
  `date` varchar(255) DEFAULT 'دائم',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: bars
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `bars` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bcc` varchar(2000) DEFAULT '[]',
  `likes` varchar(2000) DEFAULT '[]',
  `bg` varchar(255) DEFAULT NULL,
  `bid` varchar(255) DEFAULT NULL,
  `lid` varchar(255) DEFAULT NULL,
  `mcol` varchar(255) DEFAULT NULL,
  `msg` varchar(255) DEFAULT NULL,
  `pic` varchar(255) DEFAULT NULL,
  `topic` varchar(255) DEFAULT NULL,
  `ucol` varchar(255) DEFAULT NULL,
  `uid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: bots
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `bots` (
  `idreg` int(11) NOT NULL AUTO_INCREMENT,
  `msg` varchar(255) DEFAULT '(عضو جديد)',
  `pic` varchar(255) DEFAULT 'pic.png',
  `im1` varchar(255) DEFAULT 'im1.png',
  `power` varchar(255) DEFAULT '',
  `country` varchar(255) DEFAULT '',
  `room` varchar(255) DEFAULT '',
  `ip` varchar(255) DEFAULT '',
  `id` varchar(255) DEFAULT '',
  `stat` int(11) DEFAULT 0,
  `topic` varchar(255) DEFAULT '',
  PRIMARY KEY (`idreg`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: bsb
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `bsb` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `systems` varchar(255) DEFAULT '',
  `browsers` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: cuts
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `cuts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text1` varchar(255) DEFAULT NULL,
  `text2` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: histletter
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `histletter` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(255) DEFAULT NULL,
  `msg` varchar(255) DEFAULT NULL,
  `topic` varchar(255) DEFAULT NULL,
  `v` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: hosts
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `hosts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hostname` varchar(255) DEFAULT NULL,
  `setting` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: intromsg
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `intromsg` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `msg` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: logs
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `state` varchar(255) DEFAULT NULL,
  `topic` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `device` varchar(255) DEFAULT 'en',
  `isin` varchar(255) DEFAULT NULL,
  `time` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: names
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `names` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `iduser` varchar(255) DEFAULT NULL,
  `fp` varchar(255) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `topic` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: notext
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `notext` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `v` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: owner
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `owner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bars` tinyint(1) DEFAULT 1,
  `Vpn` tinyint(1) DEFAULT 0,
  `Gust` text DEFAULT NULL,
  `datafinish` datetime DEFAULT current_timestamp(),
  `MaxRep` int(11) DEFAULT 3,
  `Tv` text DEFAULT NULL,
  `Vistor` text DEFAULT NULL,
  `room` varchar(255) DEFAULT NULL,
  `isbanner` tinyint(1) DEFAULT 0,
  `isbanner1` tinyint(1) DEFAULT 0,
  `isbanner2` tinyint(1) DEFAULT 0,
  `isbanner3` tinyint(1) DEFAULT 0,
  `rc` tinyint(1) DEFAULT 0,
  `cooment` tinyint(1) DEFAULT 0,
  `offline` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: powers
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `powers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `powers` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rooms
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `rooms` (
  `idroom` int(11) NOT NULL AUTO_INCREMENT,
  `about` varchar(255) DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `id` varchar(255) DEFAULT NULL,
  `owner` varchar(255) DEFAULT NULL,
  `topic` varchar(255) DEFAULT NULL,
  `pic` varchar(255) DEFAULT NULL,
  `collor` varchar(7) DEFAULT '#000',
  `rmli` int(11) DEFAULT 0,
  `welcome` varchar(255) DEFAULT NULL,
  `broadcast` tinyint(1) DEFAULT 0,
  `deleted` tinyint(1) DEFAULT 0,
  `needpass` tinyint(1) DEFAULT 0,
  `max` int(11) DEFAULT 0,
  PRIMARY KEY (`idroom`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: settings
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `site` text DEFAULT NULL,
  `dro3` text DEFAULT NULL,
  `emo` text DEFAULT NULL,
  `sico` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: site
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `site` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `banner` varchar(255) DEFAULT NULL,
  `pmpic` varchar(255) DEFAULT NULL,
  `prvpic` varchar(255) DEFAULT NULL,
  `prv2pic` varchar(255) DEFAULT NULL,
  `prv3pic` varchar(255) DEFAULT NULL,
  `host` varchar(255) DEFAULT NULL,
  `ids` int(11) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: stats
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `stats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `state` varchar(255) DEFAULT NULL,
  `topic` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `room` varchar(255) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: story
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `story` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `owner` varchar(255) DEFAULT NULL,
  `topic` varchar(255) DEFAULT NULL,
  `pic` varchar(255) DEFAULT NULL,
  `views` text DEFAULT '',
  `type` varchar(255) DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sub
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `sub` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `iduser` varchar(255) DEFAULT NULL,
  `sub` varchar(255) DEFAULT NULL,
  `topic` varchar(255) DEFAULT NULL,
  `topic1` varchar(255) DEFAULT NULL,
  `timestart` varchar(255) DEFAULT NULL,
  `timefinish` varchar(255) DEFAULT NULL,
  `timeis` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: users
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `users` (
  `idreg` int(11) NOT NULL AUTO_INCREMENT,
  `bg` varchar(255) DEFAULT '#FFFFFF',
  `mcol` varchar(255) DEFAULT '#000000',
  `ucol` varchar(255) DEFAULT '#000000',
  `evaluation` int(11) DEFAULT 0,
  `ico` varchar(255) DEFAULT '',
  `ip` varchar(255) DEFAULT '',
  `fp` varchar(255) DEFAULT '',
  `id` varchar(255) DEFAULT NULL,
  `lid` varchar(255) DEFAULT NULL,
  `uid` varchar(255) DEFAULT NULL,
  `msg` varchar(255) DEFAULT '(عضو جديد)',
  `pic` varchar(255) DEFAULT 'pic.png',
  `im1` varchar(255) DEFAULT 'im1.png',
  `im2` varchar(255) DEFAULT 'im2.png',
  `im3` varchar(255) DEFAULT 'im3.png',
  `power` varchar(255) DEFAULT '',
  `rep` bigint(20) DEFAULT 0,
  `topic` varchar(255) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `loginG` tinyint(1) DEFAULT 0,
  `muted` tinyint(1) DEFAULT 0,
  `documentationc` int(11) DEFAULT 0,
  `lastssen` text DEFAULT NULL,
  `joinuser` text DEFAULT NULL,
  PRIMARY KEY (`idreg`),
  UNIQUE KEY `username` (`username`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: band
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: bars
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: bots
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: bsb
# ------------------------------------------------------------

INSERT INTO
  `bsb` (`id`, `systems`, `browsers`)
VALUES
  (
    1,
    '{\"system1\":false,\"system2\":false,\"system3\":false,\"system4\":false,\"system5\":false,\"system6\":false,\"system7\":true}',
    '{\"browser1\":false,\"browser2\":false,\"browser3\":false,\"browser4\":false,\"browser5\":false,\"browser6\":false,\"browser7\":false,\"browser8\":false,\"browser9\":true}'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: cuts
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: histletter
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: hosts
# ------------------------------------------------------------

INSERT INTO
  `hosts` (`id`, `hostname`, `setting`)
VALUES
  (1, 'localhost', 1);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: intromsg
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: logs
# ------------------------------------------------------------

INSERT INTO
  `logs` (
    `id`,
    `state`,
    `topic`,
    `username`,
    `ip`,
    `code`,
    `device`,
    `isin`,
    `time`
  )
VALUES
  (
    1,
    'تسجيل|عضوية',
    'ali',
    'ali',
    '89.187.162.182',
    'SG',
    'Windows.10.qfz.208.nso.Chrome.r2g.4e4.jq4',
    '*',
    '1691265840014'
  );
INSERT INTO
  `logs` (
    `id`,
    `state`,
    `topic`,
    `username`,
    `ip`,
    `code`,
    `device`,
    `isin`,
    `time`
  )
VALUES
  (
    2,
    'عضو',
    'ali',
    'ali',
    '89.187.162.182',
    'SG',
    'Windows.10.qfz.208.nso.Chrome.r2g.4e4.jq4',
    '*',
    '1691268774943'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: names
# ------------------------------------------------------------

INSERT INTO
  `names` (`id`, `iduser`, `fp`, `ip`, `topic`, `username`)
VALUES
  (
    1,
    '4',
    'Windows.10.qfz.208.nso.Chrome.r2g.4e4.jq4',
    '89.187.162.182',
    'ali',
    'ali'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: notext
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: owner
# ------------------------------------------------------------

INSERT INTO
  `owner` (
    `id`,
    `bars`,
    `Vpn`,
    `Gust`,
    `datafinish`,
    `MaxRep`,
    `Tv`,
    `Vistor`,
    `room`,
    `isbanner`,
    `isbanner1`,
    `isbanner2`,
    `isbanner3`,
    `rc`,
    `cooment`,
    `offline`
  )
VALUES
  (
    1,
    1,
    0,
    '',
    '2023-08-05 20:49:40',
    3,
    '',
    '',
    'D8D8A9A9C0',
    0,
    0,
    0,
    0,
    1,
    NULL,
    0
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: powers
# ------------------------------------------------------------

INSERT INTO
  `powers` (`id`, `powers`)
VALUES
  (
    1,
    '[{\"rank\":1000000,\"name\":\"ispower\",\"ico\":\"\",\"kick\":1000,\"delbc\":1,\"alert\":1,\"mynick\":1,\"unick\":1,\"ban\":1,\"publicmsg\":1000,\"forcepm\":1,\"roomowner\":1,\"createroom\":1,\"rooms\":1000,\"edituser\":1,\"setpower\":1,\"upgrades\":1000,\"history\":1,\"cp\":1,\"stealth\":1,\"owner\":1,\"meiut\":1,\"loveu\":1,\"ulike\":1,\"flter\":1,\"subs\":1,\"shrt\":1,\"msgs\":1,\"bootedit\":1,\"grupes\":1,\"delmsg\":1,\"delpic\":1},{\"rank\":10000,\"name\":\"Hide\",\"ico\":\"\",\"kick\":1000,\"delbc\":1,\"alert\":1,\"mynick\":1,\"unick\":1,\"ban\":1,\"publicmsg\":1000,\"forcepm\":1,\"roomowner\":1,\"createroom\":1,\"rooms\":1000,\"edituser\":1,\"setpower\":1,\"upgrades\":1000,\"history\":1,\"cp\":1,\"stealth\":1,\"owner\":1,\"meiut\":1,\"loveu\":1,\"ulike\":1,\"flter\":1,\"subs\":1,\"shrt\":1,\"msgs\":1,\"bootedit\":1,\"grupes\":1,\"delmsg\":1,\"delpic\":1},{\"rank\":9999,\"name\":\"chatmaster\",\"ico\":\"\",\"kick\":1000,\"delbc\":1,\"alert\":1,\"mynick\":1,\"unick\":1,\"ban\":1,\"publicmsg\":1000,\"forcepm\":1,\"roomowner\":1,\"createroom\":1,\"rooms\":1000,\"edituser\":1,\"setpower\":1,\"upgrades\":1000,\"history\":1,\"cp\":1,\"stealth\":1,\"owner\":1,\"meiut\":1,\"loveu\":1,\"ulike\":1,\"flter\":1,\"subs\":1,\"shrt\":1,\"msgs\":1,\"bootedit\":1,\"grupes\":1,\"delmsg\":1,\"delpic\":1},{\"rank\":9000,\"name\":\"admin\",\"ico\":\"\",\"kick\":1000,\"delbc\":1,\"alert\":1,\"mynick\":1,\"unick\":1,\"ban\":1,\"publicmsg\":1000,\"forcepm\":1,\"roomowner\":1,\"createroom\":1,\"rooms\":1000,\"edituser\":1,\"setpower\":1,\"upgrades\":1000,\"history\":1,\"cp\":1,\"stealth\":1,\"owner\":1,\"meiut\":1,\"loveu\":1,\"ulike\":1,\"flter\":1,\"subs\":1,\"shrt\":1,\"msgs\":1,\"bootedit\":1,\"grupes\":1,\"delmsg\":1,\"delpic\":1}]'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rooms
# ------------------------------------------------------------

INSERT INTO
  `rooms` (
    `idroom`,
    `about`,
    `user`,
    `pass`,
    `id`,
    `owner`,
    `topic`,
    `pic`,
    `collor`,
    `rmli`,
    `welcome`,
    `broadcast`,
    `deleted`,
    `needpass`,
    `max`
  )
VALUES
  (
    1,
    'غرفه عامة',
    'TigerHost',
    '',
    'D8D8A9A9C0',
    '#1',
    'الغرفة العامة',
    'room.png',
    '0',
    0,
    'مرحبا بيكم و حياكم في الغرفة العامة',
    0,
    1,
    0,
    40
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: settings
# ------------------------------------------------------------

INSERT INTO
  `settings` (`id`, `site`, `dro3`, `emo`, `sico`)
VALUES
  (
    1,
    '{\"allowg\":true,\"allowreg\":true,\"background\":\"FFFFFF\",\"bg\":\"FFFFFF\",\"buttons\":\"8f8589\",\"code\":8747,\"fileslikes\":90000,\"id\":1,\"msgst\":5,\"notlikes\":7000,\"pmlikes\":2000,\"miclikes\":5000,\"name\":\"\",\"siteScript\":\"script.txt\",\"title\":\"\",\"sitedescription\":\"\",\"sitekeywords\":\"\",\"bclikes\":10,\"walllikes\":\"{\\\"lengthMsgBc\\\":250,\\\"lengthMsgPm\\\":250,\\\"lengthMsgRoom\\\":250,\\\"lengthUserG\\\":100,\\\"lengthUserReg\\\":100,\\\"likeMsgRoom\\\":8,\\\"likeTopicEdit\\\":100,\\\"likeUpImgBc\\\":500,\\\"likeUpPic\\\":10}\",\"wallminutes\":0}',
    '[\"1604251747557.gif\",\"1604251758520.gif\",\"1604251760700.gif\",\"1604251763307.gif\",\"1604251765529.gif\",\"1604251767731.gif\",\"1604251769909.gif\",\"1604251774614.gif\",\"1604251779064.gif\",\"1604251782799.gif\",\"1604251786594.gif\",\"1604251790351.gif\",\"1604251794339.gif\",\"1604251798073.gif\",\"1604251802309.gif\",\"1604251806907.gif\",\"1604251810741.gif\",\"1604251814784.gif\",\"1604251819379.gif\",\"1604251823185.gif\",\"1604251827989.gif\",\"1604251831990.gif\",\"1604251838469.gif\",\"1604251842627.gif\",\"1604251846871.gif\"]',
    '[\"1604249548786.gif\",\"1604249552249.gif\",\"1604249557389.gif\",\"1604249559586.gif\",\"1604249562578.gif\",\"1604249565103.gif\",\"1604249567441.gif\",\"1604249569890.gif\",\"1604249571683.gif\",\"1604250112044.gif\",\"1604250114824.gif\",\"1604250117129.gif\",\"1604250119159.gif\",\"1604250121260.gif\",\"1604250123684.gif\",\"1604250127012.gif\",\"1604250130267.gif\",\"1604250132979.gif\",\"1604250135135.gif\",\"1604250137078.gif\",\"1604250139418.gif\",\"1604250141554.gif\",\"1604250143949.gif\",\"1604250148416.gif\",\"1604250151626.gif\",\"1604250157583.gif\",\"1604250161010.gif\",\"1604250164058.gif\",\"1604250167093.gif\",\"1604250301035.gif\",\"1604250303382.gif\",\"1604250305101.gif\",\"1604250307243.gif\",\"1604250309516.gif\",\"1604250311419.gif\",\"1604250313565.gif\",\"1604250315773.gif\",\"1604250323110.gif\",\"1604250325576.gif\",\"1604250327685.gif\",\"1604250329596.gif\",\"1604250331537.gif\",\"1604250333377.gif\",\"1604250334834.gif\",\"1604250336616.gif\",\"1604250340845.gif\",\"1604250346903.gif\",\"1604250349821.gif\",\"1604250354191.gif\",\"1604250358585.jpg\",\"1604250362533.gif\",\"1604250367896.gif\",\"1604250371828.gif\",\"1604250375168.gif\",\"1604250377594.gif\",\"1604250380972.gif\",\"1604250384257.gif\",\"1604250390033.gif\",\"1604250393546.gif\",\"1604250397003.gif\",\"1604250400613.gif\",\"1604250409783.gif\",\"1604250413521.gif\",\"1604250418953.gif\",\"1604250428173.gif\",\"1604250431155.gif\",\"1604250435106.gif\",\"1604250439658.gif\",\"1604250442352.gif\",\"1604250551879.gif\",\"1604250555824.gif\",\"1604250559464.gif\",\"1604250563413.gif\",\"1604250566534.gif\",\"1604250568887.gif\",\"1604250572365.gif\",\"1604250579238.gif\",\"1604250592362.gif\",\"1604250597399.gif\",\"1604250603151.gif\",\"1604250613781.gif\",\"1604250620547.gif\",\"1604266996909.gif\",\"1604267106601.gif\",\"1604267183015.gif\",\"1604268709762.gif\",\"1604268716314.gif\",\"1604268722266.gif\",\"1604268727700.gif\",\"1604268733058.gif\",\"1604270678107.gif\",\"1604270684014.gif\",\"1604270690418.gif\",\"1604270696386.gif\",\"1604270702962.gif\",\"1604270708211.gif\",\"1604270713261.gif\",\"1604270718635.gif\",\"1604270725155.gif\",\"1604270729648.gif\",\"1604271739357.gif\",\"1604271750817.gif\",\"1604271756616.gif\",\"1604271761902.gif\",\"1604280039934.png\",\"1604280206207.gif\",\"1604287427389.gif\",\"1604481943094.gif\",\"1604483666879.gif\",\"1605830633143.gif\",\"1605830635667.gif\",\"1605830637741.gif\",\"1605830640364.gif\",\"1605830646183.gif\",\"1605830648792.gif\",\"1605830651332.gif\",\"1605830653983.gif\",\"1605830656198.gif\",\"1605830671170.gif\",\"1605830683417.png\",\"1605830695027.gif\",\"1605830951762.gif\",\"1605830953762.gif\",\"1605830955927.gif\",\"1605830958729.gif\",\"1605830960670.gif\",\"1605830962609.gif\",\"1605830964865.gif\",\"1605830967037.gif\",\"1605830968785.gif\",\"1605830971041.gif\",\"1605830973374.gif\",\"1605830975384.gif\",\"1605830977358.gif\",\"1605830981248.gif\",\"1605830985392.jpg\",\"1605830988749.gif\",\"1605830995027.gif\"]',
    '[\"1604252172995.gif\",\"1604252176284.gif\",\"1604252184298.gif\",\"1604252186337.gif\",\"1604252189266.gif\",\"1604252190912.gif\",\"1604252193896.gif\",\"1604252195837.gif\",\"1604252198211.gif\",\"1604252200570.gif\",\"1604252202543.gif\",\"1604252206680.gif\",\"1604252209740.gif\",\"1604252220270.gif\",\"1604252225797.gif\",\"1604252235687.png\",\"1604252245119.png\",\"1604252250114.gif\",\"1604252254204.gif\",\"1604252257907.gif\",\"1604252260131.gif\",\"1604252264678.gif\",\"1604252268079.gif\",\"1604252274470.gif\",\"1604252284576.gif\",\"1604252287259.gif\",\"1604252290261.gif\",\"1604252292834.gif\",\"1604252295129.gif\",\"1604252297722.gif\",\"1604252299533.gif\",\"1604252301551.gif\",\"1604252303892.gif\",\"1604252308631.gif\",\"1604252318054.gif\",\"1604252324629.gif\",\"1604252327278.gif\",\"1604252330524.gif\",\"1604252333375.gif\",\"1604252335817.gif\",\"1604252340230.gif\",\"1604252342353.gif\",\"1604252344604.gif\",\"1604252363748.gif\",\"1604252368063.gif\",\"1604252370700.gif\",\"1604252378615.jpg\"]'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: site
# ------------------------------------------------------------

INSERT INTO
  `site` (
    `id`,
    `banner`,
    `pmpic`,
    `prvpic`,
    `prv2pic`,
    `prv3pic`,
    `host`,
    `ids`,
    `logo`
  )
VALUES
  (
    1,
    'banner.png',
    NULL,
    NULL,
    NULL,
    NULL,
    'localhost',
    1,
    'logo.png'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: stats
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: story
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sub
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: users
# ------------------------------------------------------------

INSERT INTO
  `users` (
    `idreg`,
    `bg`,
    `mcol`,
    `ucol`,
    `evaluation`,
    `ico`,
    `ip`,
    `fp`,
    `id`,
    `lid`,
    `uid`,
    `msg`,
    `pic`,
    `im1`,
    `im2`,
    `im3`,
    `power`,
    `rep`,
    `topic`,
    `username`,
    `password`,
    `token`,
    `loginG`,
    `muted`,
    `documentationc`,
    `lastssen`,
    `joinuser`
  )
VALUES
  (
    1,
    '#FFFFFF',
    '#000000',
    '#000000',
    0,
    '',
    '192.168.1.1',
    '',
    '',
    'krxbhf84iow2w8060q4nw1anbfff158',
    '5t0ugyx2tonwxcg3oftklo',
    '(عضو جديد)',
    'pic.png',
    'im1.png',
    'im2.png',
    'im3.png',
    'Hide',
    0,
    'TigerHOST',
    'tigerhost',
    'sha1$df1a97a9$1$f657ffca337c32b89442d718a985ee4e45348a9d',
    '5gluto8vyh',
    0,
    0,
    1,
    NULL,
    '1691257780191'
  );
INSERT INTO
  `users` (
    `idreg`,
    `bg`,
    `mcol`,
    `ucol`,
    `evaluation`,
    `ico`,
    `ip`,
    `fp`,
    `id`,
    `lid`,
    `uid`,
    `msg`,
    `pic`,
    `im1`,
    `im2`,
    `im3`,
    `power`,
    `rep`,
    `topic`,
    `username`,
    `password`,
    `token`,
    `loginG`,
    `muted`,
    `documentationc`,
    `lastssen`,
    `joinuser`
  )
VALUES
  (
    2,
    '#FFFFFF',
    '#000000',
    '#000000',
    0,
    '',
    '192.168.1.1',
    '',
    '',
    'bv7wudrr9m1fytw5ratjrop7rf92odd',
    'xplw5bzj3qn24yvciqo6w0',
    '(عضو جديد)',
    'pic.png',
    'im1.png',
    'im2.png',
    'im3.png',
    'chatmaster',
    0,
    'admin',
    'admin',
    'sha1$01c19bb4$1$f23fec75d9808830263a80cd3d44d1d1a3a41235',
    '89hiplcpet',
    0,
    0,
    1,
    NULL,
    '1691257780191'
  );
INSERT INTO
  `users` (
    `idreg`,
    `bg`,
    `mcol`,
    `ucol`,
    `evaluation`,
    `ico`,
    `ip`,
    `fp`,
    `id`,
    `lid`,
    `uid`,
    `msg`,
    `pic`,
    `im1`,
    `im2`,
    `im3`,
    `power`,
    `rep`,
    `topic`,
    `username`,
    `password`,
    `token`,
    `loginG`,
    `muted`,
    `documentationc`,
    `lastssen`,
    `joinuser`
  )
VALUES
  (
    3,
    '#FFFFFF',
    '#000000',
    '#000000',
    0,
    '',
    '192.168.1.1',
    '',
    '',
    'b4f5vzokvw8vsl5ngktdcz5ozwycevf',
    'sx3uuv1nc410dh8jm0633o',
    '(عضو جديد)',
    'pic.png',
    'im1.png',
    'im2.png',
    'im3.png',
    'chatmaster',
    0,
    'chatmaster',
    'chatmaster',
    'sha1$263fda0d$1$087697a9924a22ec25990b2f3a6db2a722b78e4d',
    '0xvul8glev',
    0,
    0,
    1,
    NULL,
    '1691257780191'
  );
INSERT INTO
  `users` (
    `idreg`,
    `bg`,
    `mcol`,
    `ucol`,
    `evaluation`,
    `ico`,
    `ip`,
    `fp`,
    `id`,
    `lid`,
    `uid`,
    `msg`,
    `pic`,
    `im1`,
    `im2`,
    `im3`,
    `power`,
    `rep`,
    `topic`,
    `username`,
    `password`,
    `token`,
    `loginG`,
    `muted`,
    `documentationc`,
    `lastssen`,
    `joinuser`
  )
VALUES
  (
    4,
    '#FFFFFF',
    '#000000',
    '#000000',
    0,
    '',
    '89.187.162.182',
    'Windows.10.qfz.208.nso.Chrome.r2g.4e4.jq4',
    'b9NDCnvgYlZ3pC-mAAAP',
    'usqpg0rr7mdsn829fovw59qxfra8f1d',
    'fk9ot23u7k5hgww9oadoup',
    '(عضو جديد)',
    'pic.png',
    'im1.png',
    'im2.png',
    'im3.png',
    '',
    0,
    'ali',
    'ali',
    'sha1$c5e6040c$1$f779bc158132608d8d85db8facbf8cf78f246c29',
    'vo4up5xua6',
    0,
    0,
    0,
    '1691268754086',
    '1691265839946'
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
