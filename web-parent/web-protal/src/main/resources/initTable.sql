
DROP TABLE IF EXISTS FILM;
CREATE TABLE FILM(
    [ID]               INTEGER PRIMARY KEY AUTOINCREMENT,            -- 设置主键
    [TID]              VARCHAR(32),
    [SERIALNO]         VARCHAR(50),
    [FILMNAME]         VARCHAR(200),
    [FILMCOVER]        VARCHAR(200),
    [ACTORNAME]        VARCHAR(50),
    [FILMEXT]          VARCHAR(10),
    [FILMSIZE]         VARCHAR(20),
    [FILMDURATION]     VARCHAR(20),
    [MARKINFO]         VARCHAR(20),
    [RELEASETIME]      VARCHAR(20),
    [TORRENTTERM]      VARCHAR(20),
    [SOURCE]           VARCHAR(100)
);


DROP TABLE IF EXISTS TORRENT;
CREATE TABLE TORRENT(
    [ID]               INTEGER PRIMARY KEY AUTOINCREMENT,            -- 设置主键
    [TID]              VARCHAR(32),    
    [TORRENTNAME]      VARCHAR(100),
    [TORRENTURL]       VARCHAR(200),
	[ISHD]             CHAR(1)
);
DROP TABLE IF EXISTS IMAGE;
CREATE TABLE IMAGE(
    [ID]               INTEGER PRIMARY KEY AUTOINCREMENT,            -- 设置主键
    [TID]              VARCHAR(32),
    [IMAGEURL]         VARCHAR(200),
    [ISCOVER]          CHAR(1)
);






