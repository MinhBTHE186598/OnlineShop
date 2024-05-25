-- Du lieu day du nhat se thuoc ve thang co username duoi 1 VD: "user1", "admin1", "sellmanager1",....
-- Mat khau cua tat ca user la "Aa@12345"


use master
go
drop database if exists OSWData
go
create database OSWData
go
use OSWData
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
    SellerReviewID INT identity(1,1) PRIMARY KEY,
    UserID INT,
    SellerID INT,
    SellerReviewDate VARCHAR(255),
    SellerReviewStar INT,
    SellerReviewText TEXT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (SellerID) REFERENCES Sellers(SellerID)
);
go

CREATE TABLE Bills (
    BillID INT identity(1,1) PRIMARY KEY,
    UserID INT,
    BillDate VARCHAR(255),
    BillStatus NVARCHAR(50),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
go

CREATE TABLE BillDetails (
    BillDetailID INT identity(1,1) PRIMARY KEY,
    BillID INT,
    ProductID INT,
    BillDetailDate VARCHAR(255),
    BillQuantity INT,
    FOREIGN KEY (BillID) REFERENCES Bills(BillID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);
go

CREATE TABLE ProductReviews (
    ProductReviewID INT identity(1,1) PRIMARY KEY,
    UserID INT,
    ProductID INT,   
    ProductReviewDate VARCHAR(255),
    ProductReviewStar INT,
	ProductReviewText TEXT,
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
    SellerSignUpName NVARCHAR(255),
	SellerSignUpAddress NVARCHAR(255),
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


--insert Categories
insert into Categories (CategoryName) values (N'Thời trang'), (N'Mỹ phẩm'), (N'Đồ dùng học tập'), (N'Sách và tài liệu'), (N'Thể thao'), (N'Đồ điện tử'), (N'Nội thất'), (N'Đồ gia dụng'), (N'Phụ kiện'), (N'Đồ ăn vặt'), (N'Đồ chơi'), (N'Khác');
go
--select * from Categories
--delete from Categories
--DBCC CHECKIDENT (Categories, RESEED, 0);



-- insert Users 
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('user1', 'Aa@12345', 'https://robohash.org/etestnecessitatibus.png?size=300x300&set=set1', 'fsleathq@dropbox.com', '0964 Elmside Park', '3888425044', 'Filberto', 'Sleath');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('user2', 'Aa@12345', 'https://robohash.org/distinctioestid.png?size=300x300&set=set1', 'saddlestoner@macromedia.com', '17 Memorial Place', '8298490860', 'Spenser', 'Addlestone');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('user3', 'Aa@12345', 'https://robohash.org/perferendisquaeratqui.png?size=300x300&set=set1', 'britmeiers@scribd.com', '81 Pawling Plaza', '6382225261', 'Brig', 'Ritmeier');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('user4', 'Aa@12345', 'https://robohash.org/fugitautemaut.png?size=300x300&set=set1', 'sshinet@theglobeandmail.com', '92 Mitchell Parkway', '7632589891', 'Sydney', 'Shine');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('user5', 'Aa@12345', 'https://robohash.org/voluptatemnemoest.png?size=300x300&set=set1', 'mkennedyu@e-recht24.de', '614 Parkside Lane', '4037938700', 'Max', 'Kennedy');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('seller1', 'Aa@12345', 'https://robohash.org/illositmolestiae.png?size=300x300&set=set1', 'mabramofv@hexun.com', '37808 Grasskamp Park', '2702718322', 'Melli', 'Abramof');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('seller2', 'Aa@12345', 'https://robohash.org/commodidelectusqui.png?size=300x300&set=set1', 'lavarnew@pbs.org', '87 Thackeray Hill', '1985894440', 'Louis', 'Avarne');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('seller3', 'Aa@12345', 'https://robohash.org/delectusofficiaquam.png?size=300x300&set=set1', 'lmcclounanx@japanpost.jp', '5508 Lindbergh Avenue', '2771188445', 'Lolita', 'McClounan');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('seller4', 'Aa@12345', 'https://robohash.org/ipsasintfacilis.png?size=300x300&set=set1', 'rstowtey@hatena.ne.jp', '5156 Shopko Street', '3986984226', 'Romeo', 'Stowte');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('seller5', 'Aa@12345', 'https://robohash.org/officiaomnisquis.png?size=300x300&set=set1', 'rgregolinz@salon.com', '82 Swallow Plaza', '6742932571', 'Randie', 'Gregolin');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('manager1', 'Aa@12345', 'https://robohash.org/ipsamsuntquidem.png?size=300x300&set=set1', 'amcphilip10@state.gov', '7 Acker Road', '3046013942', 'Alana', 'McPhilip');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('manager2', 'Aa@12345', 'https://robohash.org/explicaboautemfuga.png?size=300x300&set=set1', 'mgoodbur11@bloomberg.com', '8637 Forster Point', '3598239081', 'Miller', 'Goodbur');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('manager3', 'Aa@12345', 'https://robohash.org/quibusdamvoluptatemducimus.png?size=300x300&set=set1', 'nvasyushkhin12@wired.com', '352 Corry Drive', '7876238742', 'Nana', 'Vasyushkhin');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('manager4', 'Aa@12345', 'https://robohash.org/atquisit.png?size=300x300&set=set1', 'dbrackenridge13@google.com.br', '54 Coleman Way', '5239925650', 'Dexter', 'Brackenridge');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('manager5', 'Aa@12345', 'https://robohash.org/etvitaedignissimos.png?size=300x300&set=set1', 'ctall14@washington.edu', '7652 Butterfield Street', '7022364743', 'Crystal', 'Tall');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('manager6', 'Aa@12345', 'https://robohash.org/estquosalias.png?size=300x300&set=set1', 'ckunrad15@delicious.com', '42323 Sunbrook Road', '1702520489', 'Carroll', 'Kunrad');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('manager7', 'Aa@12345', 'https://robohash.org/doloremqueetdebitis.png?size=300x300&set=set1', 'gcadalleder16@about.me', '96643 Hooker Junction', '9239063649', 'Gib', 'Cadalleder');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('manager8', 'Aa@12345', 'https://robohash.org/utquisvitae.png?size=300x300&set=set1', 'tbaudic17@e-recht24.de', '92 Kipling Place', '1233710604', 'Travus', 'Baudic');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('manager9', 'Aa@12345', 'https://robohash.org/utbeataeadipisci.png?size=300x300&set=set1', 'adoale18@reddit.com', '4 Mandrake Parkway', '6261378377', 'Aurel', 'Doale');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('manager10', 'Aa@12345', 'https://robohash.org/ipsammaioresvoluptates.png?size=300x300&set=set1', 'wbarnshaw19@shutterfly.com', '9 Truax Way', '2538580339', 'Willy', 'Barnshaw');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('manager11', 'Aa@12345', 'https://robohash.org/etessevoluptas.png?size=300x300&set=set1', 'cscally1a@dailymail.co.uk', '31 Express Street', '2106250812', 'Chadwick', 'Scally');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('manager12', 'Aa@12345', 'https://robohash.org/utaliascommodi.png?size=300x300&set=set1', 'bmyatt1b@answers.com', '5 Upham Hill', '6661370906', 'Bale', 'Myatt');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('admin1', 'Aa@12345', 'https://robohash.org/eligendivoluptatemdolorem.png?size=300x300&set=set1', 'ecapinetti1c@dailymail.co.uk', '9094 Chive Court', '6983227695', 'Elisha', 'Capinetti');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('admin2', 'Aa@12345', 'https://robohash.org/molestiaeeaquenemo.png?size=300x300&set=set1', 'aayres1d@privacy.gov.au', '1 Spaight Trail', '9342731151', 'Amabel', 'Ayres');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('user6', 'Aa@12345', 'https://robohash.org/eoslaboriosamqui.png?size=300x300&set=set1', 'kpleasaunce0@businessweek.com', '57 Spohn Drive', '670-633-9360', 'Karola', 'Pleasaunce');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('user7', 'Aa@12345', 'https://robohash.org/noninlibero.png?size=300x300&set=set1', 'sstowte1@ftc.gov', '087 Lake View Circle', '162-674-5194', 'Shandee', 'Stowte');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('user8', 'Aa@12345', 'https://robohash.org/accusamusidut.png?size=300x300&set=set1', 'omarjanovic2@stanford.edu', '79 Bartelt Road', '734-266-4271', 'Osbourn', 'Marjanovic');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('user9', 'Aa@12345', 'https://robohash.org/estautperferendis.png?size=300x300&set=set1', 'oarmitt3@soundcloud.com', '90840 Del Mar Court', '529-763-8314', 'Osbourne', 'Armitt');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('user10', 'Aa@12345', 'https://robohash.org/praesentiumnoninventore.png?size=300x300&set=set1', 'dspeeding4@flavors.me', '35 Prairieview Lane', '866-861-6539', 'Doti', 'Speeding');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName) values ('user11', 'Aa@12345', 'https://robohash.org/ullamillumquo.png?size=300x300&set=set1', 'bducarme5@sina.com.cn', '03451 Fallview Street', '354-520-2041', 'Benson', 'ducarme');
go
--select * from Users
--delete from Users
--DBCC CHECKIDENT (Users, RESEED, 0);



--insert Sellers
insert into Sellers (SellerName, SellerAddress, UserID) values ('Muller-Mills', '60 Manitowish Park', 6);
insert into Sellers (SellerName, SellerAddress, UserID) values ('Ryan Inc', '72 Clarendon Terrace', 7);
insert into Sellers (SellerName, SellerAddress, UserID) values ('Marvin, Hintz and Krajcik', '967 Kedzie Street', 8);
insert into Sellers (SellerName, SellerAddress, UserID) values ('Bogisich, Witting and McDermott', '3280 Schlimgen Place', 9);
insert into Sellers (SellerName, SellerAddress, UserID) values ('Auer-Green', '06 Russell Terrace', 10);
go
--select * from Sellers
--delete from Sellers
--DBCC CHECKIDENT (Sellers, RESEED, 0);



--insert SellManagers
insert into SellManagers (UserID, CategoryID) values (11, 1);
insert into SellManagers (UserID, CategoryID) values (12, 2);
insert into SellManagers (UserID, CategoryID) values (13, 3);
insert into SellManagers (UserID, CategoryID) values (14, 4);
insert into SellManagers (UserID, CategoryID) values (15, 5);
insert into SellManagers (UserID, CategoryID) values (16, 6);
insert into SellManagers (UserID, CategoryID) values (17, 7);
insert into SellManagers (UserID, CategoryID) values (18, 8);
insert into SellManagers (UserID, CategoryID) values (19, 9);
insert into SellManagers (UserID, CategoryID) values (20, 10);
insert into SellManagers (UserID, CategoryID) values (21, 11);
insert into SellManagers (UserID, CategoryID) values (22, 12);
go
--select * from SellManagers
--delete from SellManagers
--DBCC CHECKIDENT (SellManagers, RESEED, 0);



--insert Admins
insert into Admins(UserID) values (23),(24);
go
--select * from Admins
--delete from Admins
--DBCC CHECKIDENT (Admins, RESEED, 0);



-- insert SellerReviews
insert into SellerReviews (UserID, SellerID, SellerReviewDate, SellerReviewStar, SellerReviewText) values (1, 1, '22/03/2023', 5, 'Lorem ipsum dolor sit amet');
insert into SellerReviews (UserID, SellerID, SellerReviewDate, SellerReviewStar, SellerReviewText) values (2, 1, '27/04/2024', 3, 'consectetur adipiscing elit');
insert into SellerReviews (UserID, SellerID, SellerReviewDate, SellerReviewStar, SellerReviewText) values (3, 1, '05/04/2023', 2, 'sed do eiusmod tempor incididunt');
insert into SellerReviews (UserID, SellerID, SellerReviewDate, SellerReviewStar, SellerReviewText) values (4, 1, '01/08/2023', 4, 'ut labore et dolore magna aliqua.');
insert into SellerReviews (UserID, SellerID, SellerReviewDate, SellerReviewStar, SellerReviewText) values (5, 1, '02/05/2023', 5, 'Lorem ipsum dolor sit amet');
insert into SellerReviews (UserID, SellerID, SellerReviewDate, SellerReviewStar, SellerReviewText) values (1, 2, '17/11/2023', 5, 'consectetur adipiscing elit');
insert into SellerReviews (UserID, SellerID, SellerReviewDate, SellerReviewStar, SellerReviewText) values (2, 2, '24/02/2023', 2, 'sed do eiusmod tempor incididunt');
insert into SellerReviews (UserID, SellerID, SellerReviewDate, SellerReviewStar, SellerReviewText) values (3, 2, '11/10/2023', 5, 'ut labore et dolore magna aliqua.');
insert into SellerReviews (UserID, SellerID, SellerReviewDate, SellerReviewStar, SellerReviewText) values (4, 2, '26/12/2023', 2, 'Lorem ipsum dolor sit amet');
insert into SellerReviews (UserID, SellerID, SellerReviewDate, SellerReviewStar, SellerReviewText) values (5, 2, '09/12/2023', 1, 'consectetur adipiscing elit');
insert into SellerReviews (UserID, SellerID, SellerReviewDate, SellerReviewStar, SellerReviewText) values (1, 3, '29/04/2024', 2, 'sed do eiusmod tempor incididunt');
insert into SellerReviews (UserID, SellerID, SellerReviewDate, SellerReviewStar, SellerReviewText) values (2, 3, '16/07/2023', 5, 'ut labore et dolore magna aliqua.');
insert into SellerReviews (UserID, SellerID, SellerReviewDate, SellerReviewStar, SellerReviewText) values (3, 3, '01/07/2023', 2, 'Lorem ipsum dolor sit amet');
insert into SellerReviews (UserID, SellerID, SellerReviewDate, SellerReviewStar, SellerReviewText) values (4, 3, '20/06/2023', 3, 'consectetur adipiscing elit');
insert into SellerReviews (UserID, SellerID, SellerReviewDate, SellerReviewStar, SellerReviewText) values (5, 3, '21/01/2024', 5, 'sed do eiusmod tempor incididunt');
insert into SellerReviews (UserID, SellerID, SellerReviewDate, SellerReviewStar, SellerReviewText) values (1, 4, '13/03/2024', 4, 'ut labore et dolore magna aliqua.');
insert into SellerReviews (UserID, SellerID, SellerReviewDate, SellerReviewStar, SellerReviewText) values (2, 4, '18/08/2023', 1, 'Lorem ipsum dolor sit amet');
insert into SellerReviews (UserID, SellerID, SellerReviewDate, SellerReviewStar, SellerReviewText) values (3, 4, '21/08/2023', 3, 'consectetur adipiscing elit');
insert into SellerReviews (UserID, SellerID, SellerReviewDate, SellerReviewStar, SellerReviewText) values (4, 4, '15/04/2024', 2, 'sed do eiusmod tempor incididunt');
insert into SellerReviews (UserID, SellerID, SellerReviewDate, SellerReviewStar, SellerReviewText) values (5, 4, '08/10/2023', 3, 'ut labore et dolore magna aliqua.');
insert into SellerReviews (UserID, SellerID, SellerReviewDate, SellerReviewStar, SellerReviewText) values (1, 5, '20/02/2024', 5, 'Lorem ipsum dolor sit amet');
insert into SellerReviews (UserID, SellerID, SellerReviewDate, SellerReviewStar, SellerReviewText) values (2, 5, '02/01/2023', 5, 'consectetur adipiscing elit');
insert into SellerReviews (UserID, SellerID, SellerReviewDate, SellerReviewStar, SellerReviewText) values (3, 5, '01/03/2023', 3, 'sed do eiusmod tempor incididunt');
insert into SellerReviews (UserID, SellerID, SellerReviewDate, SellerReviewStar, SellerReviewText) values (4, 5, '14/10/2023', 0, 'ut labore et dolore magna aliqua.');
insert into SellerReviews (UserID, SellerID, SellerReviewDate, SellerReviewStar, SellerReviewText) values (5, 5, '10/05/2023', 1, 'Lorem ipsum dolor sit amet');
go
--select * from SellerReviews
--delete from SellerReviews
--DBCC CHECKIDENT (SellerReviews, RESEED, 0);



--insert Banners
insert into Banners (AdminID, CategoryID, BannerPic) values (1, 10, 'http://dummyimage.com/1920x600.png/cc0000/ffffff');
insert into Banners (AdminID, CategoryID, BannerPic) values (2, 8, 'http://dummyimage.com/1920x600.png/cc0000/ffffff');
insert into Banners (AdminID, CategoryID, BannerPic) values (2, 5, 'http://dummyimage.com/1920x600.png/ff4444/ffffff');
insert into Banners (AdminID, CategoryID, BannerPic) values (1, 7, 'http://dummyimage.com/1920x600.png/cc0000/ffffff');
insert into Banners (AdminID, CategoryID, BannerPic) values (1, 3, 'http://dummyimage.com/1920x600.png/dddddd/000000');
go
--select * from Banners
--delete from Banners
--DBCC CHECKIDENT (Banners, RESEED, 0);



--insert SellerSignUps
insert into SellerSignUps (UserID, SellManagerID, SellerSignUpName, SellerSignUpAddress) values (25, 1, 'Aufderhar-Cormier', '8524 Rusk Lane');
insert into SellerSignUps (UserID, SellManagerID, SellerSignUpName, SellerSignUpAddress) values (26, 1, 'Dickens-Hudson', '95 Scoville Lane');
insert into SellerSignUps (UserID, SellManagerID, SellerSignUpName, SellerSignUpAddress) values (27, 1, 'Emard-Lockman', '4350 Manitowish Alley');
insert into SellerSignUps (UserID, SellManagerID, SellerSignUpName, SellerSignUpAddress) values (28, 1, 'Miller-Prohaska', '35058 Hudson Park');
insert into SellerSignUps (UserID, SellManagerID, SellerSignUpName, SellerSignUpAddress) values (29, 1, 'Turner Group', '793 Dexter Circle');
insert into SellerSignUps (UserID, SellManagerID, SellerSignUpName, SellerSignUpAddress) values (30, 1, 'Streich-Hartmann', '59 Warrior Park');
go
--select * from SellerSignUps
--delete from SellerSignUps
--DBCC CHECKIDENT (SellerSignUps, RESEED, 0);



--insert Notifications
insert into Notifications (UserID, NotificationText) values (1, 'Lorem ipsum dolor sit amet');
insert into Notifications (UserID, NotificationText) values (1, 'consectetur adipiscing elit');
insert into Notifications (UserID, NotificationText) values (1, 'sed do eiusmod tempor incididunt');
insert into Notifications (UserID, NotificationText) values (1, 'ut labore et dolore magna aliqua');
insert into Notifications (UserID, NotificationText) values (1, 'Lorem ipsum dolor sit amet');
insert into Notifications (UserID, NotificationText) values (1, 'consectetur adipiscing elit');
go
--select * from Notifications
--delete from Notifications
--DBCC CHECKIDENT (Notifications, RESEED, 0);



--insert Products

--go
--select * from Products
--delete from Products
--DBCC CHECKIDENT (Products, RESEED, 0);



--insert Whitelists

--go
--select * from Whitelists
--delete from Whitelists
--DBCC CHECKIDENT (Whitelists, RESEED, 0);



--insert Bills

--go
--select * from Bills
--delete from Bills
--DBCC CHECKIDENT (Bills, RESEED, 0);



--insert BillDetails

--go
--select * from BillDetails
--delete from BillDetails
--DBCC CHECKIDENT (BillDetails, RESEED, 0);



--insert ProductReviews

--go
--select * from ProductReviews
--delete from ProductReviews
--DBCC CHECKIDENT (ProductReviews, RESEED, 0);