-- Du lieu day du nhat se thuoc ve thang co username duoi 1 VD: "user1", "admin1", "sellmanager1",....
-- Mat khau cua tat ca user la "Aa@12345"

------------------------- Initial setup -----------------------------
use master
go
drop database if exists OSWData
go
create database OSWData
go
use OSWData
go


------------------------- Create tables -----------------------------
--Create table Users
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



--Create table Categories
CREATE TABLE Categories (
    CategoryID INT identity(1,1) PRIMARY KEY,
    CategoryName NVARCHAR(255)
);
go



--Create table Sellers
CREATE TABLE Sellers (
    SellerID INT identity(1,1) PRIMARY KEY,
    SellerName NVARCHAR(255),
    SellerAddress NVARCHAR(255),
	UserID INT
	FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
go



--Create table Products
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



--Create table SellerReviews
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



--Create table Bills
CREATE TABLE Bills (
    BillID INT identity(1,1) PRIMARY KEY,
    UserID INT,
    BillDate VARCHAR(255) null,
    BillStatus NVARCHAR(50),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
go



--Create table BillDetails
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



--Create table ProductReviews
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



--Create table Admins
CREATE TABLE Admins (
    AdminID INT identity(1,1) PRIMARY KEY,
    UserID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
go



--Create table Banners
CREATE TABLE Banners (
    BannerID INT identity(1,1) PRIMARY KEY,
    AdminID INT,
    CategoryID INT,
    BannerPic VARCHAR(255),
    FOREIGN KEY (AdminID) REFERENCES Admins(AdminID),
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);
go



--Create table SellManagers
CREATE TABLE SellManagers (
    SellManagerID INT identity(1,1) PRIMARY KEY,
    UserID INT,
    CategoryID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);
go



--Create table SellerSignUps
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



--Create table Notifications
CREATE TABLE Notifications (
    NotificationID INT identity(1,1) PRIMARY KEY,
    UserID INT,
    NotificationText TEXT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
go

--------------------------------Insert Data----------------------------------

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
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 8, 'Pseudoscleropodium Moss', 'Lorem ipsum dolor sit amet', 100000, 845, 'https://robohash.org/autilloomnis.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 11, 'Rotala', 'ut labore et dolore magna aliqua.', 50000, 117, 'https://robohash.org/maximevoluptatemquis.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 3, 'Nevada Blazingstar', 'ut labore et dolore magna aliqua.', 60000, 240, 'https://robohash.org/quoautcorporis.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 1, 'Large Adderstongue', 'Lorem ipsum dolor sit amet', 200000, 366, 'https://robohash.org/consequunturdoloreaut.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 5, 'Delta Tule Pea', 'consectetur adipiscing elit', 50000, 121, 'https://robohash.org/quinullavoluptatibus.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 11, 'Xylographa Lichen', 'Lorem ipsum dolor sit amet', 50000, 733, 'https://robohash.org/suntautexercitationem.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 3, 'Broadleaf Ironweed', 'sed do eiusmod tempor incididunt', 200000, 106, 'https://robohash.org/nonauteaque.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 9, 'Mistmaiden', 'ut labore et dolore magna aliqua.', 100000, 752, 'https://robohash.org/sapientelaudantiumminima.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 5, 'Muhlick''s Buckwheat', 'consectetur adipiscing elit', 80000, 271, 'https://robohash.org/quissuntquas.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 6, 'Tropic Shield Lichen', 'ut labore et dolore magna aliqua.', 70000, 627, 'https://robohash.org/etestet.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 10, 'Bucayo', 'ut labore et dolore magna aliqua.', 60000, 663, 'https://robohash.org/cupiditatequodexplicabo.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 8, 'Woodrose', 'sed do eiusmod tempor incididunt', 100000, 366, 'https://robohash.org/sedautmodi.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 4, 'Rosette Lichen', 'ut labore et dolore magna aliqua.', 80000, 761, 'https://robohash.org/aliquamfuganihil.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 6, 'Pineland Nailwort', 'ut labore et dolore magna aliqua.', 200000, 724, 'https://robohash.org/sitetfuga.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 5, 'Redstem Springbeauty', 'sed do eiusmod tempor incididunt', 80000, 202, 'https://robohash.org/quidoloribusvel.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 9, 'Pineland Butterfly Pea', 'ut labore et dolore magna aliqua.', 90000, 695, 'https://robohash.org/sinteaqueporro.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 8, 'Hernandez''s Bluecurls', 'sed do eiusmod tempor incididunt', 80000, 280, 'https://robohash.org/etfugitullam.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 6, 'New York Hawthorn', 'Lorem ipsum dolor sit amet', 100000, 583, 'https://robohash.org/nullaestminus.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 5, 'Pallas'' Wallflower', 'consectetur adipiscing elit', 60000, 577, 'https://robohash.org/utquiconsectetur.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 10, 'Porocyphus Lichen', 'consectetur adipiscing elit', 70000, 750, 'https://robohash.org/porroreprehenderitet.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 10, 'Naked Miterwort', 'consectetur adipiscing elit', 100000, 111, 'https://robohash.org/quicumpossimus.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 12, 'Deformed Cup Lichen', 'ut labore et dolore magna aliqua.', 60000, 796, 'https://robohash.org/providentvelitmaiores.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 8, 'Narrowleaf Gentian', 'consectetur adipiscing elit', 80000, 448, 'https://robohash.org/uthicsint.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 10, 'Wreath Lichen', 'Lorem ipsum dolor sit amet', 80000, 651, 'https://robohash.org/eumquiadipisci.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 12, 'Low Beardtongue', 'consectetur adipiscing elit', 50000, 737, 'https://robohash.org/quameaamet.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 1, 'Cicada Milkvetch', 'consectetur adipiscing elit', 70000, 68, 'https://robohash.org/illoutaperiam.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 1, 'Whitefingers Lichen', 'consectetur adipiscing elit', 70000, 580, 'https://robohash.org/voluptatumsuntsint.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 4, 'Saltmarsh False Foxglove', 'Lorem ipsum dolor sit amet', 200000, 238, 'https://robohash.org/fugiatetex.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 6, 'Wiggins'' Croton', 'ut labore et dolore magna aliqua.', 200000, 187, 'https://robohash.org/porroetaccusantium.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 6, 'Indianhemp', 'consectetur adipiscing elit', 70000, 880, 'https://robohash.org/sequirepudiandaeconsequuntur.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 8, 'Hairy False Goldenaster', 'sed do eiusmod tempor incididunt', 50000, 273, 'https://robohash.org/suscipitquaeratdolorem.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 6, 'Zebrina', 'Lorem ipsum dolor sit amet', 100000, 540, 'https://robohash.org/sintsimiliquetempora.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 9, 'Snow Lichen', 'sed do eiusmod tempor incididunt', 50000, 198, 'https://robohash.org/earumsimiliquealias.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 7, 'Amygdalaria Lichen', 'sed do eiusmod tempor incididunt', 100000, 997, 'https://robohash.org/quasiconsequaturet.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 1, 'California Brodiaea', 'ut labore et dolore magna aliqua.', 100000, 262, 'https://robohash.org/nonlaboreplaceat.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 6, 'Pucciphippsia', 'consectetur adipiscing elit', 60000, 511, 'https://robohash.org/praesentiumetqui.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 3, 'Chisos Hophornbeam', 'sed do eiusmod tempor incididunt', 90000, 372, 'https://robohash.org/aperiamrepudiandaepossimus.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 4, 'Tiny Trumpet', 'sed do eiusmod tempor incididunt', 50000, 605, 'https://robohash.org/quibusdamconsecteturconsequatur.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 12, 'Mexicali Muhly', 'consectetur adipiscing elit', 80000, 408, 'https://robohash.org/dolorevoluptateset.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 6, 'Common Yellow Oxalis', 'Lorem ipsum dolor sit amet', 200000, 102, 'https://robohash.org/estnihilillo.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 9, 'American Burnweed', 'ut labore et dolore magna aliqua.', 50000, 647, 'https://robohash.org/cupiditateeosofficia.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 11, 'Elegant Calicoflower', 'consectetur adipiscing elit', 90000, 833, 'https://robohash.org/quasiexpeditaeligendi.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 3, 'Wisconsin Weeping Willow', 'sed do eiusmod tempor incididunt', 80000, 538, 'https://robohash.org/cumbeataeblanditiis.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 3, 'Blue Ridge Sedge', 'ut labore et dolore magna aliqua.', 80000, 393, 'https://robohash.org/evenietfacilisad.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 8, 'Abbot''s Bushmallow', 'consectetur adipiscing elit', 100000, 460, 'https://robohash.org/dolorecommodimagnam.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 1, 'Berks County Hawthorn', 'Lorem ipsum dolor sit amet', 200000, 231, 'https://robohash.org/dictacumquesit.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 6, 'Santonica', 'Lorem ipsum dolor sit amet', 90000, 481, 'https://robohash.org/velitevenietnostrum.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 5, 'Winged Milkwort', 'consectetur adipiscing elit', 50000, 89, 'https://robohash.org/quonondolores.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 3, 'Fijian Sawsedge', 'ut labore et dolore magna aliqua.', 60000, 950, 'https://robohash.org/delenitiperspiciatismagni.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 1, 'Thurber''s Needlegrass', 'consectetur adipiscing elit', 60000, 599, 'https://robohash.org/doloribusvelconsequatur.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 11, 'Carolina Larkspur', 'consectetur adipiscing elit', 200000, 239, 'https://robohash.org/quisillumillo.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 9, 'Mosquin''s Clarkia', 'consectetur adipiscing elit', 80000, 129, 'https://robohash.org/consequaturadrecusandae.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 12, 'Swamp Chestnut Oak', 'ut labore et dolore magna aliqua.', 90000, 94, 'https://robohash.org/voluptatemasperioressed.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 11, 'Slenderstem Monkeyflower', 'ut labore et dolore magna aliqua.', 80000, 222, 'https://robohash.org/autipsaoccaecati.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 5, 'Chaparral Yucca', 'ut labore et dolore magna aliqua.', 70000, 402, 'https://robohash.org/consequaturiustoharum.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 11, 'Kidney Lichen', 'consectetur adipiscing elit', 200000, 74, 'https://robohash.org/doloresoptioet.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 2, 'Hausknecht''s Buckwheat', 'Lorem ipsum dolor sit amet', 80000, 79, 'https://robohash.org/etaccusamusdolore.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 11, 'Runyon''s Water-willow', 'Lorem ipsum dolor sit amet', 70000, 959, 'https://robohash.org/expeditamaximevitae.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 11, 'Pore Lichen', 'sed do eiusmod tempor incididunt', 90000, 643, 'https://robohash.org/voluptatequiquia.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 2, 'Axilflower', 'Lorem ipsum dolor sit amet', 200000, 320, 'https://robohash.org/minimaipsaesse.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 12, 'Hairyfruit Chervil', 'ut labore et dolore magna aliqua.', 50000, 640, 'https://robohash.org/evenietlaudantiumsit.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 2, 'Johnston''s Knotweed', 'consectetur adipiscing elit', 80000, 317, 'https://robohash.org/abutfacilis.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 11, 'Castle Lake Bedstraw', 'sed do eiusmod tempor incididunt', 60000, 203, 'https://robohash.org/doloresquasdistinctio.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 12, 'Cochlear Cartilage Lichen', 'sed do eiusmod tempor incididunt', 100000, 424, 'https://robohash.org/ullamoditexercitationem.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 7, 'Prairie Hawthorn', 'ut labore et dolore magna aliqua.', 100000, 984, 'https://robohash.org/estoptiominima.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 8, 'Scandix', 'sed do eiusmod tempor incididunt', 100000, 630, 'https://robohash.org/ineatemporibus.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 11, 'Fragrant Manjack', 'ut labore et dolore magna aliqua.', 200000, 618, 'https://robohash.org/eosetassumenda.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 9, 'Farlow''s Petractis', 'ut labore et dolore magna aliqua.', 200000, 797, 'https://robohash.org/facilisetdistinctio.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 11, 'Coccotrema Lichen', 'sed do eiusmod tempor incididunt', 70000, 587, 'https://robohash.org/consequunturautad.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 12, 'Slender Dwarf Morning-glory', 'ut labore et dolore magna aliqua.', 100000, 466, 'https://robohash.org/quosofficiapossimus.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 7, 'Swamp Hornpod', 'ut labore et dolore magna aliqua.', 70000, 965, 'https://robohash.org/voluptassintvoluptate.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 4, 'Leskea Moss', 'consectetur adipiscing elit', 100000, 765, 'https://robohash.org/dictamolestiasquibusdam.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 12, 'Apple Blossom', 'sed do eiusmod tempor incididunt', 50000, 882, 'https://robohash.org/nonutfuga.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 2, 'Trelease''s Milkvetch', 'consectetur adipiscing elit', 70000, 739, 'https://robohash.org/doloresquiquo.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 5, 'Nealley''s Sprangletop', 'ut labore et dolore magna aliqua.', 50000, 163, 'https://robohash.org/idminusfacere.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 11, 'Mediterranean Amaranth', 'consectetur adipiscing elit', 200000, 537, 'https://robohash.org/dolormolestiasrem.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 6, 'Guadalupe Ricegrass', 'Lorem ipsum dolor sit amet', 70000, 282, 'https://robohash.org/impeditmaioresexercitationem.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 11, 'Siberian Hazelnut', 'consectetur adipiscing elit', 90000, 642, 'https://robohash.org/etdistinctiofacere.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 11, 'Oregon White Oak', 'sed do eiusmod tempor incididunt', 60000, 653, 'https://robohash.org/uteosquis.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 4, 'False Tick Trefoil', 'Lorem ipsum dolor sit amet', 90000, 978, 'https://robohash.org/rerumoditmaxime.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 6, 'Fivestamen Miterwort', 'consectetur adipiscing elit', 200000, 99, 'https://robohash.org/etatdolorem.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 8, 'Threadstalk Milkvetch', 'consectetur adipiscing elit', 60000, 484, 'https://robohash.org/laudantiumsolutarem.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 10, 'Mancos Columbine', 'ut labore et dolore magna aliqua.', 60000, 624, 'https://robohash.org/nullaquiculpa.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 11, 'Poisonbulb', 'Lorem ipsum dolor sit amet', 70000, 702, 'https://robohash.org/animicumsaepe.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 11, 'Bull''s Eye', 'ut labore et dolore magna aliqua.', 100000, 133, 'https://robohash.org/inadarchitecto.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 12, 'Bajada Lupine', 'Lorem ipsum dolor sit amet', 70000, 801, 'https://robohash.org/magnamquibusdamvoluptatibus.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 4, 'Tufted Cryptantha', 'ut labore et dolore magna aliqua.', 70000, 979, 'https://robohash.org/utlaudantiumveniam.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 9, 'Remy''s Sandmat', 'ut labore et dolore magna aliqua.', 80000, 229, 'https://robohash.org/maioresofficiapraesentium.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 8, 'Sharp''s Homaliadelphus Moss', 'sed do eiusmod tempor incididunt', 100000, 510, 'https://robohash.org/delenitiautimpedit.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 8, 'Peacocksplume', 'Lorem ipsum dolor sit amet', 100000, 939, 'https://robohash.org/veronostrumbeatae.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 3, 'Crater Lichen', 'consectetur adipiscing elit', 70000, 989, 'https://robohash.org/quoddolortemporibus.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 7, 'Devil''s-tongue', 'ut labore et dolore magna aliqua.', 90000, 215, 'https://robohash.org/natusfugitet.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 8, 'Bailey''s Hedgehog Cactus', 'Lorem ipsum dolor sit amet', 50000, 234, 'https://robohash.org/liberodelenitibeatae.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 4, 'Preuss'' Milkvetch', 'consectetur adipiscing elit', 90000, 542, 'https://robohash.org/architectoiustodolor.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 2, 'Viscid Mallow', 'consectetur adipiscing elit', 100000, 234, 'https://robohash.org/quimagnamtempore.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 1, 'Orange Lichen', 'sed do eiusmod tempor incididunt', 60000, 292, 'https://robohash.org/sitquiadolorem.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 9, 'Prickly Bog Sedge', 'ut labore et dolore magna aliqua.', 80000, 797, 'https://robohash.org/temporaeumsed.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 4, 'Cypress Swamp Sedge', 'sed do eiusmod tempor incididunt', 90000, 813, 'https://robohash.org/quoutcorporis.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 12, 'Largeleaf Cup Lichen', 'sed do eiusmod tempor incididunt', 60000, 476, 'https://robohash.org/velitreiciendisnam.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 2, 'California Sawgrass', 'Lorem ipsum dolor sit amet', 90000, 396, 'https://robohash.org/rerumetfuga.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 1, 'Peculiar Moonwort', 'Lorem ipsum dolor sit amet', 60000, 511, 'https://robohash.org/sedquaeratnesciunt.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 3, 'Florida Scrub Frostweed', 'consectetur adipiscing elit', 90000, 971, 'https://robohash.org/maioresexcepturiqui.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 4, 'Basindaisy', 'ut labore et dolore magna aliqua.', 60000, 627, 'https://robohash.org/repellenduscorruptiquo.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 6, 'Wrinkled Spineflower', 'sed do eiusmod tempor incididunt', 70000, 809, 'https://robohash.org/pariaturnemooccaecati.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 6, 'Deltoid-bract Saltbush', 'sed do eiusmod tempor incididunt', 200000, 426, 'https://robohash.org/autoptionumquam.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 10, 'Shortleaf Drepanocladus Moss', 'ut labore et dolore magna aliqua.', 70000, 803, 'https://robohash.org/undevoluptasquia.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 6, 'Texas Cornsalad', 'consectetur adipiscing elit', 60000, 127, 'https://robohash.org/ipsumrerumpraesentium.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 1, 'Mono Lupine', 'consectetur adipiscing elit', 200000, 95, 'https://robohash.org/officiavoluptasunde.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 5, 'Lesser Blackscale Sedge', 'Lorem ipsum dolor sit amet', 60000, 192, 'https://robohash.org/etestrerum.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 12, 'Cursed Buttercup', 'sed do eiusmod tempor incididunt', 50000, 139, 'https://robohash.org/remutmagni.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 6, 'Yellow Nutsedge', 'ut labore et dolore magna aliqua.', 100000, 904, 'https://robohash.org/dignissimosevenietcorrupti.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 5, 'Boston Swordfern', 'ut labore et dolore magna aliqua.', 80000, 583, 'https://robohash.org/consequaturdoloreaperiam.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 6, 'Subalpine Fir', 'Lorem ipsum dolor sit amet', 70000, 555, 'https://robohash.org/sintvoluptatumpraesentium.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 10, 'Limahuli Valley Cyanea', 'ut labore et dolore magna aliqua.', 50000, 867, 'https://robohash.org/corruptilaboredoloribus.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 2, 'Anthracothecium Lichen', 'consectetur adipiscing elit', 60000, 576, 'https://robohash.org/reiciendisvelquos.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 1, 'Woolly Pricklyleaf', 'ut labore et dolore magna aliqua.', 100000, 83, 'https://robohash.org/evenietaccusantiumullam.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 5, 'Teff', 'consectetur adipiscing elit', 100000, 182, 'https://robohash.org/fugaametqui.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 1, 'Weeping Fingergrass', 'consectetur adipiscing elit', 200000, 418, 'https://robohash.org/iustofaceresaepe.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 11, 'Jolon Clarkia', 'sed do eiusmod tempor incididunt', 80000, 129, 'https://robohash.org/quasifugiatexpedita.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 8, 'Partridge Pea', 'sed do eiusmod tempor incididunt', 60000, 504, 'https://robohash.org/nostrumvoluptatesrerum.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 4, 'Apalachicola Toadflax', 'ut labore et dolore magna aliqua.', 90000, 182, 'https://robohash.org/veritatisnostrumeius.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 2, 'Scarlet Vetch', 'sed do eiusmod tempor incididunt', 100000, 312, 'https://robohash.org/sedexpeditaexplicabo.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 4, 'Bull''s Eye', 'consectetur adipiscing elit', 50000, 584, 'https://robohash.org/numquamporroconsequuntur.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 1, 'Variegated Orchid', 'consectetur adipiscing elit', 60000, 133, 'https://robohash.org/utquamquo.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 2, 'West Indian Bristlegrass', 'ut labore et dolore magna aliqua.', 90000, 682, 'https://robohash.org/quamquasiquia.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 6, 'Lung Lichen', 'sed do eiusmod tempor incididunt', 80000, 640, 'https://robohash.org/placeatquoblanditiis.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 3, 'Big-flower Broom', 'consectetur adipiscing elit', 100000, 752, 'https://robohash.org/eaquefugiatvoluptatem.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 10, 'Miraculous Berry', 'consectetur adipiscing elit', 80000, 187, 'https://robohash.org/iurecumaperiam.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 8, 'Bering Chickweed', 'sed do eiusmod tempor incididunt', 70000, 973, 'https://robohash.org/eumnequetenetur.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 9, 'Heliopsis', 'consectetur adipiscing elit', 90000, 318, 'https://robohash.org/eiusipsamolestiae.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 1, 'Spreading Groundsmoke', 'ut labore et dolore magna aliqua.', 90000, 952, 'https://robohash.org/molestiaeistevoluptas.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 1, 'Springtime Dewberry', 'consectetur adipiscing elit', 90000, 128, 'https://robohash.org/quassitrem.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 10, 'Ulihi Phyllostegia', 'consectetur adipiscing elit', 50000, 597, 'https://robohash.org/nullaasperioresconsequuntur.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 6, 'Mojave Ragwort', 'consectetur adipiscing elit', 80000, 877, 'https://robohash.org/eumfaciliset.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 1, 'Palisot''s Calymperes Moss', 'Lorem ipsum dolor sit amet', 100000, 588, 'https://robohash.org/solutacumea.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 8, 'Southwestern Ringstem', 'ut labore et dolore magna aliqua.', 70000, 546, 'https://robohash.org/quirepellendusblanditiis.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 1, 'Southern Pokeweed', 'ut labore et dolore magna aliqua.', 70000, 415, 'https://robohash.org/estnecessitatibuset.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 12, 'Hare Barley', 'sed do eiusmod tempor incididunt', 200000, 532, 'https://robohash.org/quinumquamomnis.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 3, 'Macoun''s Poppy', 'consectetur adipiscing elit', 90000, 90, 'https://robohash.org/maioresvoluptatemrerum.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 8, 'Jackie''s Saddle', 'sed do eiusmod tempor incididunt', 60000, 864, 'https://robohash.org/odiodignissimosest.png?size=500x500&set=set1', N'Chờ xác thực');
go
--select * from Products
--delete from Products
--DBCC CHECKIDENT (Products, RESEED, 0);



--insert Bills
insert into Bills (UserID, BillStatus) values (1, N'Chưa thanh toán');
insert into Bills (UserID, BillStatus) values (2, N'Chưa thanh toán');
insert into Bills (UserID, BillStatus) values (3, N'Chưa thanh toán');
insert into Bills (UserID, BillStatus) values (4, N'Chưa thanh toán');
insert into Bills (UserID, BillStatus) values (5, N'Chưa thanh toán');
insert into Bills (UserID, BillStatus) values (6, N'Chưa thanh toán');
insert into Bills (UserID, BillStatus) values (7, N'Chưa thanh toán');
insert into Bills (UserID, BillStatus) values (8, N'Chưa thanh toán');
insert into Bills (UserID, BillStatus) values (9, N'Chưa thanh toán');
insert into Bills (UserID, BillStatus) values (10, N'Chưa thanh toán');
insert into Bills (UserID, BillStatus) values (11, N'Chưa thanh toán');
insert into Bills (UserID, BillStatus) values (12, N'Chưa thanh toán');
insert into Bills (UserID, BillStatus) values (13, N'Chưa thanh toán');
insert into Bills (UserID, BillStatus) values (14, N'Chưa thanh toán');
insert into Bills (UserID, BillStatus) values (15, N'Chưa thanh toán');
insert into Bills (UserID, BillStatus) values (16, N'Chưa thanh toán');
insert into Bills (UserID, BillStatus) values (17, N'Chưa thanh toán');
insert into Bills (UserID, BillStatus) values (18, N'Chưa thanh toán');
insert into Bills (UserID, BillStatus) values (19, N'Chưa thanh toán');
insert into Bills (UserID, BillStatus) values (20, N'Chưa thanh toán');
insert into Bills (UserID, BillStatus) values (21, N'Chưa thanh toán');
insert into Bills (UserID, BillStatus) values (22, N'Chưa thanh toán');
insert into Bills (UserID, BillStatus) values (23, N'Chưa thanh toán');
insert into Bills (UserID, BillStatus) values (24, N'Chưa thanh toán');
insert into Bills (UserID, BillStatus) values (25, N'Chưa thanh toán');
insert into Bills (UserID, BillStatus) values (26, N'Chưa thanh toán');
insert into Bills (UserID, BillStatus) values (27, N'Chưa thanh toán');
insert into Bills (UserID, BillStatus) values (28, N'Chưa thanh toán');
insert into Bills (UserID, BillStatus) values (29, N'Chưa thanh toán');
insert into Bills (UserID, BillStatus) values (30, N'Chưa thanh toán');
insert into Bills (UserID, BillDate, BillStatus) values (1, '23/03/2024', N'Đã nhận hàng');
insert into Bills (UserID, BillDate, BillStatus) values (2, '16/10/2023', N'Đã thanh toán');
insert into Bills (UserID, BillDate, BillStatus) values (1, '12/01/2024', N'Đã thanh toán');
insert into Bills (UserID, BillDate, BillStatus) values (4, '04/04/2023', N'Đã nhận hàng');
insert into Bills (UserID, BillDate, BillStatus) values (1, '21/06/2023', N'Đã thanh toán');
insert into Bills (UserID, BillDate, BillStatus) values (3, '22/08/2023', N'Đang vận chuyển');
insert into Bills (UserID, BillDate, BillStatus) values (4, '25/10/2023', N'Đang vận chuyển');
insert into Bills (UserID, BillDate, BillStatus) values (1, '24/01/2024', N'Đang vận chuyển');
insert into Bills (UserID, BillDate, BillStatus) values (1, '11/07/2023', N'Đã nhận hàng');
insert into Bills (UserID, BillDate, BillStatus) values (4, '01/01/2024', N'Đã thanh toán');
insert into Bills (UserID, BillDate, BillStatus) values (3, '10/07/2023', N'Đã thanh toán');
insert into Bills (UserID, BillDate, BillStatus) values (3, '30/05/2023', N'Đang vận chuyển');
insert into Bills (UserID, BillDate, BillStatus) values (1, '21/11/2023', N'Đã thanh toán');
insert into Bills (UserID, BillDate, BillStatus) values (4, '26/08/2023', N'Đã nhận hàng');
insert into Bills (UserID, BillDate, BillStatus) values (1, '24/03/2023', N'Đang vận chuyển');
insert into Bills (UserID, BillDate, BillStatus) values (5, '20/02/2024', N'Đang vận chuyển');
insert into Bills (UserID, BillDate, BillStatus) values (4, '09/11/2023', N'Đang vận chuyển');
insert into Bills (UserID, BillDate, BillStatus) values (4, '22/04/2023', N'Đã nhận hàng');
insert into Bills (UserID, BillDate, BillStatus) values (3, '20/02/2023', N'Đã nhận hàng');
insert into Bills (UserID, BillDate, BillStatus) values (3, '03/02/2024', N'Đã thanh toán');
insert into Bills (UserID, BillDate, BillStatus) values (5, '08/01/2023', N'Đã thanh toán');
insert into Bills (UserID, BillDate, BillStatus) values (5, '05/07/2023', N'Đã nhận hàng');
insert into Bills (UserID, BillDate, BillStatus) values (1, '22/04/2023', N'Đã nhận hàng');
insert into Bills (UserID, BillDate, BillStatus) values (5, '08/03/2024', N'Đã nhận hàng');
insert into Bills (UserID, BillDate, BillStatus) values (3, '21/03/2023', N'Đã nhận hàng');
insert into Bills (UserID, BillDate, BillStatus) values (5, '29/08/2023', N'Đang vận chuyển');
insert into Bills (UserID, BillDate, BillStatus) values (3, '02/11/2023', N'Đang vận chuyển');
insert into Bills (UserID, BillDate, BillStatus) values (1, '28/04/2023', N'Đã thanh toán');
insert into Bills (UserID, BillDate, BillStatus) values (4, '30/04/2023', N'Đang vận chuyển');
insert into Bills (UserID, BillDate, BillStatus) values (1, '17/03/2024', N'Đang vận chuyển');
go
--select * from Bills
--delete from Bills
--DBCC CHECKIDENT (Bills, RESEED, 0);



--insert BillDetails
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (43, 88, '20/03/2023', 1);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (35, 85, '20/03/2023', 6);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (57, 23, '15/03/2023', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (37, 9, '26/03/2023', 7);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (52, 80, '01/03/2023', 7);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (42, 89, '19/01/2023', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (36, 66, '09/03/2023', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (46, 47, '09/02/2023', 9);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (39, 59, '26/03/2023', 1);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (32, 15, '30/01/2023', 7);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (34, 84, '31/01/2023', 5);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (47, 29, '22/01/2023', 10);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (53, 5, '27/02/2023', 7);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (42, 74, '05/01/2023', 3);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (44, 19, '21/02/2023', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (33, 82, '07/03/2023', 4);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (59, 62, '20/01/2023', 1);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (53, 32, '10/02/2023', 9);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (38, 15, '01/03/2023', 6);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (47, 70, '06/01/2023', 8);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (41, 57, '11/01/2023', 10);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (57, 95, '04/01/2023', 6);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (52, 90, '09/03/2023', 7);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (38, 41, '18/02/2023', 7);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (35, 68, '06/01/2023', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (38, 78, '03/02/2023', 10);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (52, 40, '07/01/2023', 3);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (36, 55, '16/01/2023', 6);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (52, 74, '07/03/2023', 3);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (59, 84, '07/01/2023', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (39, 90, '06/02/2023', 3);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (59, 90, '07/02/2023', 9);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (56, 15, '08/03/2023', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (59, 62, '27/02/2023', 1);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (43, 57, '12/03/2023', 9);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (45, 40, '26/03/2023', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (38, 56, '05/02/2023', 3);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (45, 94, '08/01/2023', 7);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (54, 64, '26/01/2023', 5);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (37, 79, '12/03/2023', 9);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (47, 97, '05/03/2023', 5);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (50, 20, '03/01/2023', 10);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (59, 77, '04/02/2023', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (48, 66, '12/02/2023', 8);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (50, 33, '04/02/2023', 3);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (49, 64, '02/03/2023', 8);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (51, 9, '28/01/2023', 6);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (37, 67, '16/03/2023', 7);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (55, 65, '25/01/2023', 10);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (48, 26, '12/01/2023', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (36, 35, '04/02/2023', 6);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (47, 97, '25/02/2023', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (53, 57, '03/01/2023', 8);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (47, 59, '21/01/2023', 10);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (46, 13, '12/02/2023', 3);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (50, 78, '17/01/2023', 6);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (38, 18, '21/01/2023', 9);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (32, 15, '27/03/2023', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (34, 4, '12/02/2023', 1);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (53, 100, '22/03/2023', 4);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (34, 49, '22/01/2023', 10);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (31, 20, '02/02/2023', 5);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (42, 71, '30/03/2023', 6);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (49, 57, '22/01/2023', 5);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (43, 99, '16/02/2023', 4);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (44, 97, '07/03/2023', 6);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (34, 16, '09/03/2023', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (50, 57, '31/03/2023', 10);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (36, 96, '04/01/2023', 8);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (58, 74, '24/02/2023', 7);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (32, 22, '21/02/2023', 4);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (34, 74, '06/03/2023', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (48, 42, '30/01/2023', 5);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (34, 4, '15/03/2023', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (53, 15, '02/02/2023', 5);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (48, 63, '07/02/2023', 10);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (31, 61, '31/03/2023', 7);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (31, 2, '24/02/2023', 4);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (56, 19, '11/02/2023', 10);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (37, 65, '27/02/2023', 3);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (53, 11, '27/02/2023', 8);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (42, 38, '28/02/2023', 5);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (40, 29, '05/01/2023', 1);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (58, 34, '15/03/2023', 4);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (52, 83, '01/02/2023', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (51, 90, '07/01/2023', 3);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (50, 48, '04/02/2023', 4);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (43, 38, '01/01/2023', 9);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (33, 69, '05/02/2023', 3);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (59, 97, '09/01/2023', 10);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (39, 59, '10/01/2023', 6);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (33, 41, '06/02/2023', 10);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (46, 96, '07/03/2023', 5);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (39, 47, '28/02/2023', 4);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (31, 74, '22/03/2023', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (47, 100, '24/02/2023', 10);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (39, 63, '30/03/2023', 5);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (47, 62, '09/02/2023', 1);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (45, 56, '08/01/2023', 10);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (31, 69, '23/02/2023', 5);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (1, 76, '27/03/2023', 7);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (1, 3, '26/02/2023', 8);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (1, 57, '23/03/2023', 8);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (1, 59, '02/01/2023', 7);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (1, 96, '03/01/2023', 8);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity) values (1, 95, '19/03/2023', 5);
go
--select * from BillDetails
--delete from BillDetails
--DBCC CHECKIDENT (BillDetails, RESEED, 0);



--insert ProductReviews
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (3, 5, '2/13/2024', 1, 'consectetur adipiscing elit');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (2, 1, '10/3/2023', 1, 'Lorem ipsum dolor sit amet');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (4, 5, '5/28/2023', 2, 'consectetur adipiscing elit');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (3, 4, '8/7/2023', 4, 'sed do eiusmod tempor incididunt');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (4, 4, '10/6/2023', 1, 'Lorem ipsum dolor sit amet');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (1, 2, '4/8/2023', 3, 'consectetur adipiscing elit');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (4, 3, '7/20/2023', 4, 'ut labore et dolore magna aliqua.');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (5, 3, '1/25/2023', 2, 'Lorem ipsum dolor sit amet');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (5, 2, '5/15/2023', 3, 'ut labore et dolore magna aliqua.');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (1, 5, '12/4/2023', 5, 'sed do eiusmod tempor incididunt');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (3, 3, '4/3/2023', 3, 'Lorem ipsum dolor sit amet');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (2, 2, '12/21/2023', 5, 'Lorem ipsum dolor sit amet');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (3, 2, '9/13/2023', 5, 'Lorem ipsum dolor sit amet');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (4, 5, '1/25/2024', 2, 'ut labore et dolore magna aliqua.');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (1, 1, '3/12/2024', 4, 'ut labore et dolore magna aliqua.');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (4, 5, '10/12/2023', 2, 'Lorem ipsum dolor sit amet');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (3, 3, '3/15/2024', 0, 'consectetur adipiscing elit');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (1, 2, '3/6/2024', 0, 'Lorem ipsum dolor sit amet');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (5, 5, '10/1/2023', 5, 'consectetur adipiscing elit');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (4, 2, '4/23/2023', 2, 'sed do eiusmod tempor incididunt');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (3, 5, '2/10/2023', 1, 'consectetur adipiscing elit');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (2, 4, '4/15/2024', 1, 'ut labore et dolore magna aliqua.');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (4, 2, '2/25/2024', 2, 'sed do eiusmod tempor incididunt');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (2, 4, '3/19/2023', 0, 'ut labore et dolore magna aliqua.');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (2, 5, '5/1/2023', 1, 'sed do eiusmod tempor incididunt');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (1, 2, '3/5/2024', 1, 'sed do eiusmod tempor incididunt');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (1, 2, '12/20/2023', 2, 'consectetur adipiscing elit');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (3, 4, '2/8/2024', 4, 'sed do eiusmod tempor incididunt');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (3, 3, '3/1/2024', 4, 'sed do eiusmod tempor incididunt');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (1, 5, '4/4/2024', 0, 'sed do eiusmod tempor incididunt');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (3, 1, '10/19/2023', 5, 'sed do eiusmod tempor incididunt');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (2, 3, '10/21/2023', 0, 'sed do eiusmod tempor incididunt');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (4, 1, '4/12/2023', 4, 'consectetur adipiscing elit');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (5, 1, '12/7/2023', 2, 'sed do eiusmod tempor incididunt');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (4, 3, '2/18/2024', 2, 'sed do eiusmod tempor incididunt');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (5, 2, '2/4/2024', 0, 'Lorem ipsum dolor sit amet');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (5, 4, '12/2/2023', 2, 'ut labore et dolore magna aliqua.');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (5, 5, '3/19/2024', 3, 'consectetur adipiscing elit');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (2, 4, '7/26/2023', 0, 'consectetur adipiscing elit');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (1, 1, '8/18/2023', 3, 'consectetur adipiscing elit');
go
--select * from ProductReviews
--delete from ProductReviews
--DBCC CHECKIDENT (ProductReviews, RESEED, 0);