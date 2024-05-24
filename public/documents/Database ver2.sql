use master
go
drop database if exists SE1829Group6OnlineShop
go
create database SE1829Group6OnlineShop
go
use SE1829Group6OnlineShop
go
CREATE TABLE Users (
    UserID INT identity(1,1) PRIMARY KEY,
    UserAccountName VARCHAR(255),
    UserPassword VARCHAR(255),
    UserPFP VARCHAR(255),
    UserEmail VARCHAR(255),
    UserAddress NVARCHAR(255),
    UserPhone VARCHAR(20),
    UserFirstName NVARCHAR(255),
    UserLastName NVARCHAR(255)
);
go

CREATE TABLE Categories (
    CategoryID INT identity(1,1) PRIMARY KEY,
    CategoryName NVARCHAR(255)
);
go

CREATE TABLE Sellers (
    SellerID INT identity(1,1) PRIMARY KEY,
    SellerName NVARCHAR(255),
    SellerAddress NVARCHAR(255),
	UserID INT
	FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
go

CREATE TABLE Products (
    ProductID INT identity(1,1) PRIMARY KEY,
    SellerID INT,
    CategoryID INT,
    ProductName NVARCHAR(255),
    ProductDescription TEXT,
    ProductPrice INT,
    ProductQuantity INT,
    ProductPic VARCHAR(255),
    ProductStatus NVARCHAR(50),
    FOREIGN KEY (SellerID) REFERENCES Sellers(SellerID),
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);
go

CREATE TABLE SellerReviews (
    SellReviewID INT identity(1,1) PRIMARY KEY,
    UserID INT,
    SellerID INT,
    SellReviewDate DATE,
    SellReviewStar INT,
    SellReviewText TEXT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (SellerID) REFERENCES Sellers(SellerID)
);
go

CREATE TABLE Bills (
    BillID INT identity(1,1) PRIMARY KEY,
    UserID INT,
    BillDate DATE,
    BillStatus NVARCHAR(50),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
go

CREATE TABLE BillDetails (
    BillDetailID INT identity(1,1) PRIMARY KEY,
    BillID INT,
    ProductID INT,
    BillDetailDate DATE,
    BillQuantity INT,
    FOREIGN KEY (BillID) REFERENCES Bills(BillID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);
go

CREATE TABLE Reviews (
    ReviewID INT identity(1,1) PRIMARY KEY,
    UserID INT,
    ProductID INT,
    ReviewText TEXT,
    ReviewDate DATE,
    ReviewStar INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);
go

CREATE TABLE Admins (
    AdminID INT identity(1,1) PRIMARY KEY,
    UserID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
go

CREATE TABLE Banners (
    BannerID INT identity(1,1) PRIMARY KEY,
    AdminID INT,
    CategoryID INT,
    BannerPic VARCHAR(255),
    FOREIGN KEY (AdminID) REFERENCES Admins(AdminID),
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);
go

CREATE TABLE SellManagers (
    SellManagerID INT identity(1,1) PRIMARY KEY,
    UserID INT,
    CategoryID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);
go

CREATE TABLE Whitelists (
    WhitelistID INT identity(1,1) PRIMARY KEY,
    ProductID INT,
    SellManagerID INT,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
    FOREIGN KEY (SellManagerID) REFERENCES SellManagers(SellManagerID)
);
go

CREATE TABLE SellerSignUps (
    SellerSignUpID INT identity(1,1) PRIMARY KEY,
    UserID INT,
	SellManagerID INT,
    SellerSignUpName VARCHAR(255),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
	FOREIGN KEY (SellManagerID) REFERENCES SellManagers(SellManagerID)
);
go

CREATE TABLE Notifications (
    NotificationID INT identity(1,1) PRIMARY KEY,
    UserID INT,
    NotificationText TEXT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
go


--insert categories
insert into Categories (CategoryName) values (N'Thời trang'), (N'Mỹ phẩm'), (N'Đồ dùng học tập'), (N'Sách và tài liệu'), (N'Thể thao'), (N'Đồ điện tử'), (N'Nội thất'), (N'Đồ gia dụng'), (N'Phụ kiện'), (N'Đồ ăn vặt'), (N'Đồ chơi'), (N'Khác');
--select * from Categories
--delete from Categories where CategoryID < 100
--DBCC CHECKIDENT (Categories, RESEED, 0);


-- insert users into Users table
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('agrimmert0', 'a1234567', 'https://robohash.org/eaconsequaturomnis.png?size=100x100&set=set1', 'agrimmert0@state.tx.us', '78 5th Crossing', '8255591033', 'Augustus', 'Grimmert');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('tstowell1', 'a1234567', 'https://robohash.org/maioresofficiain.png?size=100x100&set=set1', 'tstowell1@telegraph.co.uk', '6884 Cascade Avenue', '6106567542', 'Teresina', 'Stowell');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('rbisp2', 'a1234567', 'https://robohash.org/maximelaboreperferendis.png?size=100x100&set=set1', 'rbisp2@i2i.jp', '89835 Bartillon Court', '6736306870', 'Rina', 'Bisp');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('dvaan3', 'a1234567', 'https://robohash.org/sapienteofficiisad.png?size=100x100&set=set1', 'dvaan3@com.com', '41 International Plaza', '2161743602', 'Dudley', 'Vaan');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('brudsdale4', 'a1234567', 'https://robohash.org/similiquefaceremagni.png?size=100x100&set=set1', 'brudsdale4@utexas.edu', '263 Crescent Oaks Parkway', '4814353403', 'Bebe', 'Rudsdale');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('jjellis5', 'a1234567', 'https://robohash.org/sintutlibero.png?size=100x100&set=set1', 'jjellis5@delicious.com', '25912 Golf View Point', '7563576062', 'Janela', 'Jellis');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('byearnsley6', 'a1234567', 'https://robohash.org/beataedelenitiplaceat.png?size=100x100&set=set1', 'byearnsley6@paginegialle.it', '204 Valley Edge Parkway', '2023517329', 'Benita', 'Yearnsley');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('hcheavin7', 'a1234567', 'https://robohash.org/autsiteum.png?size=100x100&set=set1', 'hcheavin7@chron.com', '109 Lyons Point', '7516146926', 'Hughie', 'Cheavin');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('pvasenkov8', 'a1234567', 'https://robohash.org/eummolestiasea.png?size=100x100&set=set1', 'pvasenkov8@google.com.hk', '0 Thierer Plaza', '5429455979', 'Patrizia', 'Vasenkov');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('tcadge9', 'a1234567', 'https://robohash.org/sintperspiciatissit.png?size=100x100&set=set1', 'tcadge9@cmu.edu', '0 Florence Trail', '8173266896', 'Tana', 'Cadge');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('fblesinga', 'a1234567', 'https://robohash.org/odioquiaveritatis.png?size=100x100&set=set1', 'fblesinga@feedburner.com', '27 Briar Crest Court', '2695527073', 'Feliks', 'Blesing');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('jbarszczewskib', 'a1234567', 'https://robohash.org/etnonqui.png?size=100x100&set=set1', 'jbarszczewskib@meetup.com', '7 Cordelia Terrace', '3579375960', 'Jacinda', 'Barszczewski');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('amacdermidc', 'a1234567', 'https://robohash.org/easitfacilis.png?size=100x100&set=set1', 'amacdermidc@woothemes.com', '10 Carberry Street', '8106029298', 'Aldwin', 'MacDermid');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('thynardd', 'a1234567', 'https://robohash.org/optiotemporibusassumenda.png?size=100x100&set=set1', 'thynardd@examiner.com', '27914 Buell Parkway', '6573515278', 'Thibaud', 'Hynard');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('vbragge', 'a1234567', 'https://robohash.org/etetneque.png?size=100x100&set=set1', 'vbragge@si.edu', '40358 Canary Terrace', '9821758988', 'Vita', 'Bragg');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('deglintonf', 'a1234567', 'https://robohash.org/cupiditatelaboriosamreiciendis.png?size=100x100&set=set1', 'deglintonf@live.com', '657 Spaight Pass', '6682121892', 'Drew', 'Eglinton');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('gbrockwayg', 'a1234567', 'https://robohash.org/consequaturdoloribusaspernatur.png?size=100x100&set=set1', 'gbrockwayg@cnbc.com', '1 Farwell Crossing', '5095438747', 'Grazia', 'Brockway');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('mwurzh', 'a1234567', 'https://robohash.org/harumidnecessitatibus.png?size=100x100&set=set1', 'mwurzh@cyberchimps.com', '4262 Harbort Way', '1424145417', 'Mollee', 'Wurz');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('glantaffi', 'a1234567', 'https://robohash.org/sitplaceatid.png?size=100x100&set=set1', 'glantaffi@china.com.cn', '70318 Blackbird Alley', '8295946565', 'Gwenette', 'Lantaff');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('alantj', 'a1234567', 'https://robohash.org/quiaassumendaearum.png?size=100x100&set=set1', 'alantj@noaa.gov', '2297 Spohn Crossing', '2754835510', 'Adolpho', 'Lant');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('spearmaink', 'a1234567', 'https://robohash.org/quiaquisquamvelit.png?size=100x100&set=set1', 'spearmaink@surveymonkey.com', '67330 Lukken Avenue', '7401138784', 'Sigismond', 'Pearmain');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('tbatstonel', 'a1234567', 'https://robohash.org/utinventoreexcepturi.png?size=100x100&set=set1', 'tbatstonel@mit.edu', '18 Pleasure Drive', '6655551435', 'Theresita', 'Batstone');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('hcargom', 'a1234567', 'https://robohash.org/molestiaequihic.png?size=100x100&set=set1', 'hcargom@mozilla.com', '2 Eliot Point', '9504318311', 'Heinrik', 'Cargo');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('frickardsn', 'a1234567', 'https://robohash.org/ipsamexpeditaquaerat.png?size=100x100&set=set1', 'frickardsn@europa.eu', '0 Bunting Street', '6927615287', 'Felita', 'Rickards');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('dmaffinio', 'a1234567', 'https://robohash.org/reiciendisautdeleniti.png?size=100x100&set=set1', 'dmaffinio@google.co.uk', '37 Susan Avenue', '3803650505', 'Dougie', 'Maffini');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('mkolodziejskip', 'a1234567', 'https://robohash.org/rerumenimunde.png?size=100x100&set=set1', 'mkolodziejskip@paypal.com', '9 Logan Court', '8457943083', 'Marcelline', 'Kolodziejski');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('fsleathq', 'a1234567', 'https://robohash.org/etestnecessitatibus.png?size=100x100&set=set1', 'fsleathq@dropbox.com', '0964 Elmside Park', '3888425044', 'Filberto', 'Sleath');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('saddlestoner', 'a1234567', 'https://robohash.org/distinctioestid.png?size=100x100&set=set1', 'saddlestoner@macromedia.com', '17 Memorial Place', '8298490860', 'Spenser', 'Addlestone');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('britmeiers', 'a1234567', 'https://robohash.org/perferendisquaeratqui.png?size=100x100&set=set1', 'britmeiers@scribd.com', '81 Pawling Plaza', '6382225261', 'Brig', 'Ritmeier');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('sshinet', 'a1234567', 'https://robohash.org/fugitautemaut.png?size=100x100&set=set1', 'sshinet@theglobeandmail.com', '92 Mitchell Parkway', '7632589891', 'Sydney', 'Shine');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('mkennedyu', 'a1234567', 'https://robohash.org/voluptatemnemoest.png?size=100x100&set=set1', 'mkennedyu@e-recht24.de', '614 Parkside Lane', '4037938700', 'Max', 'Kennedy');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('mabramofv', 'a1234567', 'https://robohash.org/illositmolestiae.png?size=100x100&set=set1', 'mabramofv@hexun.com', '37808 Grasskamp Park', '2702718322', 'Melli', 'Abramof');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('lavarnew', 'a1234567', 'https://robohash.org/commodidelectusqui.png?size=100x100&set=set1', 'lavarnew@pbs.org', '87 Thackeray Hill', '1985894440', 'Louis', 'Avarne');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('lmcclounanx', 'a1234567', 'https://robohash.org/delectusofficiaquam.png?size=100x100&set=set1', 'lmcclounanx@japanpost.jp', '5508 Lindbergh Avenue', '2771188445', 'Lolita', 'McClounan');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('rstowtey', 'a1234567', 'https://robohash.org/ipsasintfacilis.png?size=100x100&set=set1', 'rstowtey@hatena.ne.jp', '5156 Shopko Street', '3986984226', 'Romeo', 'Stowte');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('rgregolinz', 'a1234567', 'https://robohash.org/officiaomnisquis.png?size=100x100&set=set1', 'rgregolinz@salon.com', '82 Swallow Plaza', '6742932571', 'Randie', 'Gregolin');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('manager12', 'a1234567', 'https://robohash.org/ipsamsuntquidem.png?size=100x100&set=set1', 'amcphilip10@state.gov', '7 Acker Road', '3046013942', 'Alana', 'McPhilip');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('manager11', 'a1234567', 'https://robohash.org/explicaboautemfuga.png?size=100x100&set=set1', 'mgoodbur11@bloomberg.com', '8637 Forster Point', '3598239081', 'Miller', 'Goodbur');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('manager10', 'a1234567', 'https://robohash.org/quibusdamvoluptatemducimus.png?size=100x100&set=set1', 'nvasyushkhin12@wired.com', '352 Corry Drive', '7876238742', 'Nana', 'Vasyushkhin');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('manager9', 'a1234567', 'https://robohash.org/atquisit.png?size=100x100&set=set1', 'dbrackenridge13@google.com.br', '54 Coleman Way', '5239925650', 'Dexter', 'Brackenridge');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('manager8', 'a1234567', 'https://robohash.org/etvitaedignissimos.png?size=100x100&set=set1', 'ctall14@washington.edu', '7652 Butterfield Street', '7022364743', 'Crystal', 'Tall');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('manager7', 'a1234567', 'https://robohash.org/estquosalias.png?size=100x100&set=set1', 'ckunrad15@delicious.com', '42323 Sunbrook Road', '1702520489', 'Carroll', 'Kunrad');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('manager6', 'a1234567', 'https://robohash.org/doloremqueetdebitis.png?size=100x100&set=set1', 'gcadalleder16@about.me', '96643 Hooker Junction', '9239063649', 'Gib', 'Cadalleder');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('manager5', 'a1234567', 'https://robohash.org/utquisvitae.png?size=100x100&set=set1', 'tbaudic17@e-recht24.de', '92 Kipling Place', '1233710604', 'Travus', 'Baudic');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('manager4', 'a1234567', 'https://robohash.org/utbeataeadipisci.png?size=100x100&set=set1', 'adoale18@reddit.com', '4 Mandrake Parkway', '6261378377', 'Aurel', 'Doale');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('manager3', 'a1234567', 'https://robohash.org/ipsammaioresvoluptates.png?size=100x100&set=set1', 'wbarnshaw19@shutterfly.com', '9 Truax Way', '2538580339', 'Willy', 'Barnshaw');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('manager2', 'a1234567', 'https://robohash.org/etessevoluptas.png?size=100x100&set=set1', 'cscally1a@dailymail.co.uk', '31 Express Street', '2106250812', 'Chadwick', 'Scally');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('manager1', 'a1234567', 'https://robohash.org/utaliascommodi.png?size=100x100&set=set1', 'bmyatt1b@answers.com', '5 Upham Hill', '6661370906', 'Bale', 'Myatt');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('admin2', 'a1234567', 'https://robohash.org/eligendivoluptatemdolorem.png?size=100x100&set=set1', 'ecapinetti1c@dailymail.co.uk', '9094 Chive Court', '6983227695', 'Elisha', 'Capinetti');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('admin1', 'a1234567', 'https://robohash.org/molestiaeeaquenemo.png?size=100x100&set=set1', 'aayres1d@privacy.gov.au', '1 Spaight Trail', '9342731151', 'Amabel', 'Ayres');
--select * from Users
--delete from Users where UserID < 100
--DBCC CHECKIDENT (Users, RESEED, 0);