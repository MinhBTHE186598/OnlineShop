-- Du lieu day du nhat se thuoc ve thang co username duoi 1 VD: "user1", "admin1", "sellmanager1",....
-- Mat khau cua tat ca user la "12345"

------------------------- Initial setup -----------------------------
use master
go
alter database OSWData set single_user with rollback immediate
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
    UserAccountName NVARCHAR(255),
    UserPassword NVARCHAR(255),
    UserPFP NVARCHAR(255),
    UserEmail NVARCHAR(255),
    UserAddress NVARCHAR(255),
    UserPhone NVARCHAR(20),
    UserFirstName NVARCHAR(255),
    UserLastName NVARCHAR(255),
	UserStatus NVARCHAR(50)
);
go



--Create table Categories
CREATE TABLE Categories (
    CategoryID INT identity(1,1) PRIMARY KEY,
    CategoryName NVARCHAR(255)
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



--Create table Sellers
CREATE TABLE Sellers (
    SellerID INT identity(1,1) PRIMARY KEY,	
    SellerName NVARCHAR(255),
    SellerAddress NVARCHAR(255),
	UserID INT,
	SellManagerID INT	
	FOREIGN KEY (UserID) REFERENCES Users(UserID),
	FOREIGN KEY (SellManagerID) REFERENCES SellManagers(SellManagerID)
);
go



--Create table Shippers
CREATE TABLE Shippers (
    ShipperID INT identity(1,1) PRIMARY KEY,
    UserID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
go



--Create table Products
CREATE TABLE Products (
    ProductID INT identity(1,1) PRIMARY KEY,
    SellerID INT,
    CategoryID INT,
    ProductName NVARCHAR(255),
    ProductDescription NVARCHAR(255),
    ProductPrice INT,
    ProductQuantity INT,
    ProductPic NVARCHAR(255),
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
    SellerReviewDate NVARCHAR(255),
    SellerReviewStar INT,
    SellerReviewText NVARCHAR(255),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (SellerID) REFERENCES Sellers(SellerID)
);
go



--Create table Bills
CREATE TABLE Bills (
    BillID INT identity(1,1) PRIMARY KEY,
    UserID INT,
    BillDate NVARCHAR(255) null,
    BillStatus NVARCHAR(50),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
go



--Create table BillDetails
CREATE TABLE BillDetails (
    BillDetailID INT identity(1,1) PRIMARY KEY,
    BillID INT,
    ProductID INT,
    BillDetailDate NVARCHAR(255),
    BillQuantity INT,
	BillDetailStatus NVARCHAR(255),
	ShipperID INT,
    FOREIGN KEY (BillID) REFERENCES Bills(BillID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
	FOREIGN KEY (ShipperID) REFERENCES Shippers(ShipperID)
);
go



--Create table ProductReviews
CREATE TABLE ProductReviews (
    ProductReviewID INT identity(1,1) PRIMARY KEY,
    UserID INT,
    ProductID INT,   
    ProductReviewDate NVARCHAR(255),
    ProductReviewStar INT,
	ProductReviewText NVARCHAR(255),
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
    BannerPic NVARCHAR(255),
    FOREIGN KEY (AdminID) REFERENCES Admins(AdminID),
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);
go



--Create table Notifications
CREATE TABLE Notifications (
    NotificationID INT identity(1,1) PRIMARY KEY,
    UserID INT,
    NotificationText NVARCHAR(255),
	NotificationHeader NVARCHAR(100),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
go


--Create table Supports
CREATE TABLE Supports (
    SupportID INT identity(1,1) PRIMARY KEY,
    UserID INT,
	AdminID INT,
	SupportTitle NVARCHAR(50),
    SupportRequest NVARCHAR(255),
	SupportResponse NVARCHAR(255) null,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
	FOREIGN KEY (AdminID) REFERENCES Admins(AdminID)
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
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('user1', '12345', 'https://robohash.org/etestnecessitatibus.png?size=300x300&set=set1', 'fsleathq@dropbox.com', '0964 Elmside Park', '3888425044', 'Filberto', 'Sleath', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('user2', '12345', 'https://robohash.org/distinctioestid.png?size=300x300&set=set1', 'saddlestoner@macromedia.com', '17 Memorial Place', '8298490860', 'Spenser', 'Addlestone', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('user3', '12345', 'https://robohash.org/perferendisquaeratqui.png?size=300x300&set=set1', 'britmeiers@scribd.com', '81 Pawling Plaza', '6382225261', 'Brig', 'Ritmeier', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('user4', '12345', 'https://robohash.org/fugitautemaut.png?size=300x300&set=set1', 'sshinet@theglobeandmail.com', '92 Mitchell Parkway', '7632589891', 'Sydney', 'Shine', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('user5', '12345', 'https://robohash.org/voluptatemnemoest.png?size=300x300&set=set1', 'mkennedyu@e-recht24.de', '614 Parkside Lane', '4037938700', 'Max', 'Kennedy', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('seller1', '12345', 'https://robohash.org/illositmolestiae.png?size=300x300&set=set1', 'mabramofv@hexun.com', '37808 Grasskamp Park', '2702718322', 'Melli', 'Abramof', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('seller2', '12345', 'https://robohash.org/commodidelectusqui.png?size=300x300&set=set1', 'lavarnew@pbs.org', '87 Thackeray Hill', '1985894440', 'Louis', 'Avarne', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('seller3', '12345', 'https://robohash.org/delectusofficiaquam.png?size=300x300&set=set1', 'lmcclounanx@japanpost.jp', '5508 Lindbergh Avenue', '2771188445', 'Lolita', 'McClounan', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('seller4', '12345', 'https://robohash.org/ipsasintfacilis.png?size=300x300&set=set1', 'rstowtey@hatena.ne.jp', '5156 Shopko Street', '3986984226', 'Romeo', 'Stowte', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('seller5', '12345', 'https://robohash.org/officiaomnisquis.png?size=300x300&set=set1', 'rgregolinz@salon.com', '82 Swallow Plaza', '6742932571', 'Randie', 'Gregolin', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('manager1', '12345', 'https://robohash.org/ipsamsuntquidem.png?size=300x300&set=set1', 'amcphilip10@state.gov', '7 Acker Road', '3046013942', 'Alana', 'McPhilip', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('manager2', '12345', 'https://robohash.org/explicaboautemfuga.png?size=300x300&set=set1', 'mgoodbur11@bloomberg.com', '8637 Forster Point', '3598239081', 'Miller', 'Goodbur', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('manager3', '12345', 'https://robohash.org/quibusdamvoluptatemducimus.png?size=300x300&set=set1', 'nvasyushkhin12@wired.com', '352 Corry Drive', '7876238742', 'Nana', 'Vasyushkhin', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('manager4', '12345', 'https://robohash.org/atquisit.png?size=300x300&set=set1', 'dbrackenridge13@google.com.br', '54 Coleman Way', '5239925650', 'Dexter', 'Brackenridge', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('manager5', '12345', 'https://robohash.org/etvitaedignissimos.png?size=300x300&set=set1', 'ctall14@washington.edu', '7652 Butterfield Street', '7022364743', 'Crystal', 'Tall', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('manager6', '12345', 'https://robohash.org/estquosalias.png?size=300x300&set=set1', 'ckunrad15@delicious.com', '42323 Sunbrook Road', '1702520489', 'Carroll', 'Kunrad', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('manager7', '12345', 'https://robohash.org/doloremqueetdebitis.png?size=300x300&set=set1', 'gcadalleder16@about.me', '96643 Hooker Junction', '9239063649', 'Gib', 'Cadalleder', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('manager8', '12345', 'https://robohash.org/utquisvitae.png?size=300x300&set=set1', 'tbaudic17@e-recht24.de', '92 Kipling Place', '1233710604', 'Travus', 'Baudic', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('manager9', '12345', 'https://robohash.org/utbeataeadipisci.png?size=300x300&set=set1', 'adoale18@reddit.com', '4 Mandrake Parkway', '6261378377', 'Aurel', 'Doale', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('manager10', '12345', 'https://robohash.org/ipsammaioresvoluptates.png?size=300x300&set=set1', 'wbarnshaw19@shutterfly.com', '9 Truax Way', '2538580339', 'Willy', 'Barnshaw', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('manager11', '12345', 'https://robohash.org/etessevoluptas.png?size=300x300&set=set1', 'cscally1a@dailymail.co.uk', '31 Express Street', '2106250812', 'Chadwick', 'Scally', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('manager12', '12345', 'https://robohash.org/utaliascommodi.png?size=300x300&set=set1', 'bmyatt1b@answers.com', '5 Upham Hill', '6661370906', 'Bale', 'Myatt', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('admin1', '12345', 'https://robohash.org/eligendivoluptatemdolorem.png?size=300x300&set=set1', 'ecapinetti1c@dailymail.co.uk', '9094 Chive Court', '6983227695', 'Elisha', 'Capinetti', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('admin2', '12345', 'https://robohash.org/molestiaeeaquenemo.png?size=300x300&set=set1', 'aayres1d@privacy.gov.au', '1 Spaight Trail', '9342731151', 'Amabel', 'Ayres', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('user6', '12345', 'https://robohash.org/eoslaboriosamqui.png?size=300x300&set=set1', 'kpleasaunce0@businessweek.com', '57 Spohn Drive', '6706339360', 'Karola', 'Pleasaunce', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('user7', '12345', 'https://robohash.org/noninlibero.png?size=300x300&set=set1', 'sstowte1@ftc.gov', '087 Lake View Circle', '162-674-5194', 'Shandee', 'Stowte', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('user8', '12345', 'https://robohash.org/accusamusidut.png?size=300x300&set=set1', 'omarjanovic2@stanford.edu', '79 Bartelt Road', '7342654271', 'Osbourn', 'Marjanovic', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('user9', '12345', 'https://robohash.org/estautperferendis.png?size=300x300&set=set1', 'oarmitt3@soundcloud.com', '90840 Del Mar Court', '5297638314', 'Osbourne', 'Armitt', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('user10', '12345', 'https://robohash.org/praesentiumnoninventore.png?size=300x300&set=set1', 'dspeeding4@flavors.me', '35 Prairieview Lane', '8668616539', 'Doti', 'Speeding', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('user11', '12345', 'https://robohash.org/ullamillumquo.png?size=300x300&set=set1', 'bducarme5@sina.com.cn', '03451 Fallview Street', '3545202041', 'Benson', 'ducarme', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('shipper1', '12345', 'https://robohash.org/quiiurea.png?size=500x500&set=set1', 'rdunridge0@dailymail.co.uk', '3685 Monica Park', '8262284612', 'Rickey', 'Dunridge', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('shipper2', '12345', 'https://robohash.org/ametetnon.png?size=500x500&set=set1', 'lstyche1@auda.org.au', '6 Delladonna Point', '3458000656', 'Llewellyn', 'Styche', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('shipper3', '12345', 'https://robohash.org/quoessequidem.png?size=500x500&set=set1', 'tprobart2@dailymotion.com', '392 Golf Course Hill', '2498959369', 'Tito', 'Probart', 'Active');
go
--select * from Users
--delete from Users
--DBCC CHECKIDENT (Users, RESEED, 0);



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



--insert Sellers
insert into Sellers (SellerName, SellerAddress, UserID, SellManagerID) values ('Muller-Mills', '60 Manitowish Park', 6, 1);
insert into Sellers (SellerName, SellerAddress, UserID, SellManagerID) values ('Ryan Inc', '72 Clarendon Terrace', 7, 1);
insert into Sellers (SellerName, SellerAddress, UserID, SellManagerID) values ('Marvin, Hintz and Krajcik', '967 Kedzie Street', 8, 1);
insert into Sellers (SellerName, SellerAddress, UserID, SellManagerID) values ('Bogisich, Witting and McDermott', '3280 Schlimgen Place', 9, 1);
insert into Sellers (SellerName, SellerAddress, UserID, SellManagerID) values ('Auer-Green', '06 Russell Terrace', 10, 1);
go
--select * from Sellers
--delete from Sellers
--DBCC CHECKIDENT (Sellers, RESEED, 0);



--insert Admins
insert into Admins(UserID) values (23),(24);
go
--select * from Admins
--delete from Admins
--DBCC CHECKIDENT (Admins, RESEED, 0);



--insert Shippers
insert into Shippers(UserID) values (31),(32),(33);
go
--select * from Shippers
--delete from Shippers
--DBCC CHECKIDENT (Shippers, RESEED, 0);



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
insert into SellerReviews (UserID, SellerID, SellerReviewDate, SellerReviewStar, SellerReviewText) values (4, 5, '14/10/2023', 5, 'ut labore et dolore magna aliqua.');
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
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 7, 'Flowery Phlox', 'ut enim ad minim veniam', 80000, 57, 'https://robohash.org/delectusautdolores.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 10, 'Wart Lichen', 'sed do eiusmod tempor incididunt', 10000, 29, 'https://robohash.org/sapientenullasit.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 6, 'Yellowgreen Catchfly', 'ut enim ad minim veniam', 100000, 92, 'https://robohash.org/abcommodinumquam.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 5, 'Desert Threadplant', 'Lorem ipsum dolor sit amet', 70000, 46, 'https://robohash.org/etestet.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 10, 'Red Cottongrass', 'nisi ut aliquip ex ea commodo consequat', 50000, 13, 'https://robohash.org/quasveniamomnis.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 3, 'Slim Larkspur', 'Lorem ipsum dolor sit amet', 40000, 45, 'https://robohash.org/officiiseumdicta.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 7, 'Chilean Podocarp', 'Lorem ipsum dolor sit amet', 40000, 37, 'https://robohash.org/nonquaeofficia.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 5, 'Chickensage', 'ut enim ad minim veniam', 50000, 60, 'https://robohash.org/rerumvoluptatumnatus.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 12, 'Little Sagebrush', 'sed do eiusmod tempor incididunt', 20000, 84, 'https://robohash.org/esseipsamdeserunt.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 1, 'Littlepod False Flax', 'ut enim ad minim veniam', 70000, 73, 'https://robohash.org/quasiquimodi.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 4, 'European Chestnut', 'Lorem ipsum dolor sit amet', 50000, 30, 'https://robohash.org/inventoreexplicaboeius.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 10, 'Hydrangea', 'consectetur adipiscing elit', 20000, 85, 'https://robohash.org/idvelplaceat.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 10, 'Diamond Spleenwort', 'Lorem ipsum dolor sit amet', 100000, 47, 'https://robohash.org/illocorruptialiquam.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 9, 'Stately Rose Gentian', 'quis nostrud exercitation ullamco laboris', 60000, 79, 'https://robohash.org/voluptatemnumquammagnam.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 8, 'Camphortree', 'sed do eiusmod tempor incididunt', 30000, 10, 'https://robohash.org/quianullaid.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 8, 'Japanese Privet', 'consectetur adipiscing elit', 10000, 1, 'https://robohash.org/nisilaudantiumeum.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 2, 'Smallseed Paspalum', 'sed do eiusmod tempor incididunt', 100000, 60, 'https://robohash.org/providentcommodifugit.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 7, 'Leafless Bentspur Orchid', 'ut labore et dolore magna aliqua', 60000, 2, 'https://robohash.org/etrerumullam.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 2, 'Clambering Polypody', 'ut labore et dolore magna aliqua', 20000, 42, 'https://robohash.org/rerumcorporisipsa.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 10, 'Prairie Phlox', 'ut enim ad minim veniam', 20000, 40, 'https://robohash.org/reiciendisinnon.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 11, 'Hall''s Rush', 'ut enim ad minim veniam', 100000, 38, 'https://robohash.org/sitimpeditreprehenderit.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 3, 'Alaska Saxifrage', 'nisi ut aliquip ex ea commodo consequat', 20000, 63, 'https://robohash.org/indolorquos.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 5, 'Peppermint Drop Lichen', 'quis nostrud exercitation ullamco laboris', 20000, 75, 'https://robohash.org/facilisexcepturimolestias.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 3, 'Wiegand''s Wildrye', 'consectetur adipiscing elit', 20000, 26, 'https://robohash.org/commodieosvoluptatem.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 3, 'Slenderleaf False Foxglove', 'sed do eiusmod tempor incididunt', 20000, 57, 'https://robohash.org/estveladipisci.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 8, 'Fremont''s-gold', 'Lorem ipsum dolor sit amet', 70000, 87, 'https://robohash.org/utsequiexpedita.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 3, 'Cardinal Beardtongue', 'quis nostrud exercitation ullamco laboris', 20000, 49, 'https://robohash.org/quassitanimi.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 7, 'Woolly Locoweed', 'quis nostrud exercitation ullamco laboris', 40000, 55, 'https://robohash.org/voluptatemplaceatreprehenderit.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 11, 'Threetooth Hawkweed', 'sed do eiusmod tempor incididunt', 90000, 46, 'https://robohash.org/voluptateeosnon.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 12, 'Cache Valley Buckwheat', 'Lorem ipsum dolor sit amet', 20000, 62, 'https://robohash.org/temporarepudiandaeimpedit.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 6, 'American Wintergreen', 'Lorem ipsum dolor sit amet', 50000, 8, 'https://robohash.org/asperioresquidolor.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 10, 'East View Rubberweed', 'ut enim ad minim veniam', 70000, 99, 'https://robohash.org/sequiinlaboriosam.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 6, 'Roundleaf Ceratodon Moss', 'consectetur adipiscing elit', 100000, 76, 'https://robohash.org/aliquidveldeserunt.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 12, 'Columbian Onion', 'Lorem ipsum dolor sit amet', 60000, 32, 'https://robohash.org/quoaperiameum.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 6, 'Bulbothrix Lichen', 'ut enim ad minim veniam', 60000, 80, 'https://robohash.org/consequaturquasiqui.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 11, 'Cape Cheesewood', 'nisi ut aliquip ex ea commodo consequat', 100000, 65, 'https://robohash.org/aimpeditnam.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 6, 'Bretonica Prieta', 'ut enim ad minim veniam', 20000, 8, 'https://robohash.org/optioquaeexpedita.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 3, 'Greenleaf Ticktrefoil', 'sed do eiusmod tempor incididunt', 20000, 17, 'https://robohash.org/quimagnameos.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 7, 'False Christmas Cactus', 'quis nostrud exercitation ullamco laboris', 70000, 16, 'https://robohash.org/autnihilqui.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 2, 'Deltoid-bract Saltbush', 'nisi ut aliquip ex ea commodo consequat', 100000, 16, 'https://robohash.org/doloresquiquo.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 3, 'Bastard Toadflax', 'quis nostrud exercitation ullamco laboris', 40000, 20, 'https://robohash.org/natusveniamoptio.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 3, 'Honolulu Melicope', 'quis nostrud exercitation ullamco laboris', 20000, 64, 'https://robohash.org/quiaestvelit.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 7, 'Hawai''i Holly', 'Lorem ipsum dolor sit amet', 10000, 80, 'https://robohash.org/itaqueevenietcumque.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 9, 'Crownscale', 'ut labore et dolore magna aliqua', 50000, 79, 'https://robohash.org/quoaliquiddistinctio.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 11, 'Common Reed', 'consectetur adipiscing elit', 30000, 37, 'https://robohash.org/iustoexercitationembeatae.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 2, 'Purple Mombin', 'consectetur adipiscing elit', 10000, 17, 'https://robohash.org/autquoet.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 5, 'Western Ponysfoot', 'quis nostrud exercitation ullamco laboris', 80000, 47, 'https://robohash.org/enimetoccaecati.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 1, 'Egyptian Marjoram', 'Lorem ipsum dolor sit amet', 20000, 17, 'https://robohash.org/modietbeatae.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 11, 'Krause''s Sedge', 'ut labore et dolore magna aliqua', 90000, 3, 'https://robohash.org/auteminciduntanimi.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 12, 'Whitewoolly Buckwheat', 'ut labore et dolore magna aliqua', 20000, 20, 'https://robohash.org/fugaidaliquid.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 10, 'Mexican Orange', 'Lorem ipsum dolor sit amet', 90000, 77, 'https://robohash.org/quireiciendisnumquam.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 7, 'Queen Sago', 'nisi ut aliquip ex ea commodo consequat', 40000, 79, 'https://robohash.org/doloromnisofficiis.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 9, 'Leechleaf Delissea', 'ut labore et dolore magna aliqua', 20000, 58, 'https://robohash.org/utpariaturnumquam.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 3, 'Prostrate Milkvetch', 'ut enim ad minim veniam', 20000, 71, 'https://robohash.org/consequunturrationeaspernatur.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 6, 'Needle Grama', 'sed do eiusmod tempor incididunt', 80000, 60, 'https://robohash.org/fugitametdicta.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 11, 'Julella Lichen', 'Lorem ipsum dolor sit amet', 80000, 44, 'https://robohash.org/numquamprovidentdeleniti.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 5, 'Hollisteria', 'sed do eiusmod tempor incididunt', 80000, 100, 'https://robohash.org/similiquenemosapiente.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 9, 'Carline Thistle', 'quis nostrud exercitation ullamco laboris', 30000, 63, 'https://robohash.org/fugiatutsunt.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 7, 'Rhynchospora', 'ut labore et dolore magna aliqua', 100000, 50, 'https://robohash.org/etautqui.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 1, 'Madeira Dyer''s Greenweed', 'Lorem ipsum dolor sit amet', 50000, 87, 'https://robohash.org/suntminimaamet.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 8, 'Kou', 'ut enim ad minim veniam', 30000, 26, 'https://robohash.org/veritatissedqui.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 12, 'Seaoats', 'ut labore et dolore magna aliqua', 50000, 22, 'https://robohash.org/voluptatemteneturesse.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 8, 'Richardson''s Sedge', 'ut enim ad minim veniam', 70000, 45, 'https://robohash.org/voluptatemdoloremmodi.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 6, 'Elongate Pohlia Moss', 'Lorem ipsum dolor sit amet', 20000, 87, 'https://robohash.org/quisquamcumqueearum.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 3, 'Balloon Sack Clover', 'Lorem ipsum dolor sit amet', 10000, 13, 'https://robohash.org/dictanonitaque.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 10, 'Subalpine Bedstraw', 'consectetur adipiscing elit', 50000, 85, 'https://robohash.org/fugitetalias.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 3, 'Sand Buckwheat', 'consectetur adipiscing elit', 100000, 77, 'https://robohash.org/magnamtemporibuseos.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 2, 'Mountain Monardella', 'sed do eiusmod tempor incididunt', 90000, 6, 'https://robohash.org/sedexcepturiet.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 11, 'Sclerophyton Lichen', 'sed do eiusmod tempor incididunt', 50000, 42, 'https://robohash.org/asperioresautrecusandae.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 2, 'Elegant Orange Wall Lichen', 'nisi ut aliquip ex ea commodo consequat', 20000, 26, 'https://robohash.org/officiafugiattotam.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 4, 'Bering''s Tufted Hairgrass', 'ut enim ad minim veniam', 30000, 88, 'https://robohash.org/ipsamquoqui.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 7, 'Saltcedar', 'ut enim ad minim veniam', 60000, 71, 'https://robohash.org/minusrepudiandaesint.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 3, 'Wood Wakerobin', 'Lorem ipsum dolor sit amet', 20000, 48, 'https://robohash.org/minimavoluptatemconsequuntur.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 9, 'Turkey Corn', 'sed do eiusmod tempor incididunt', 100000, 38, 'https://robohash.org/delenitiquaminventore.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 2, 'African Telosma', 'quis nostrud exercitation ullamco laboris', 40000, 58, 'https://robohash.org/repellendusnonvoluptas.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 9, 'Harperocallis', 'ut labore et dolore magna aliqua', 20000, 7, 'https://robohash.org/velitvoluptatemipsam.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 5, 'Snakegourd', 'nisi ut aliquip ex ea commodo consequat', 30000, 52, 'https://robohash.org/dolorvoluptaset.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 9, 'Scolosanthus', 'ut labore et dolore magna aliqua', 90000, 37, 'https://robohash.org/autoditqui.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 11, 'Limnophila', 'quis nostrud exercitation ullamco laboris', 50000, 16, 'https://robohash.org/atqueautomnis.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 12, 'Kunth''s Onion', 'ut labore et dolore magna aliqua', 40000, 21, 'https://robohash.org/quisintfacere.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 5, 'Goldenrod', 'quis nostrud exercitation ullamco laboris', 50000, 91, 'https://robohash.org/seddictaquae.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 7, 'James'' Seaheath', 'sed do eiusmod tempor incididunt', 50000, 52, 'https://robohash.org/utmolestiaeautem.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 11, 'Douglas'' Helianthella', 'ut labore et dolore magna aliqua', 30000, 94, 'https://robohash.org/natusipsaaut.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 12, 'Mung Bean', 'Lorem ipsum dolor sit amet', 60000, 23, 'https://robohash.org/architectoexplicabodolore.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 5, 'Tarovine', 'consectetur adipiscing elit', 50000, 59, 'https://robohash.org/perspiciatisodioaccusamus.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 2, 'Madagascar Ragwort', 'ut enim ad minim veniam', 20000, 8, 'https://robohash.org/voluptasetimpedit.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 11, 'Kohala False Ohelo', 'ut labore et dolore magna aliqua', 70000, 36, 'https://robohash.org/commodiquiaperiam.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 2, 'Hernandez''s Bluecurls', 'ut labore et dolore magna aliqua', 10000, 45, 'https://robohash.org/sedmollitiarepellat.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 5, 'Spreading Bellflower', 'consectetur adipiscing elit', 40000, 36, 'https://robohash.org/esttemporaperferendis.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 7, 'Sideoats Grama', 'ut enim ad minim veniam', 60000, 54, 'https://robohash.org/isteexpeditamaxime.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 5, 'Hall''s Biscuitroot', 'Lorem ipsum dolor sit amet', 90000, 65, 'https://robohash.org/adipiscinonneque.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 4, 'Stanford Orange Lichen', 'ut labore et dolore magna aliqua', 100000, 53, 'https://robohash.org/reprehenderitiurerecusandae.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 11, 'Mexican Ricegrass', 'sed do eiusmod tempor incididunt', 90000, 14, 'https://robohash.org/distinctioasperioresdeserunt.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 7, 'Semaphoregrass', 'ut enim ad minim veniam', 20000, 51, 'https://robohash.org/liberorepellatprovident.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 3, 'California Pseudobraunia Moss', 'quis nostrud exercitation ullamco laboris', 70000, 16, 'https://robohash.org/pariatursuntnulla.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 10, 'Rushleaf Jonquil', 'nisi ut aliquip ex ea commodo consequat', 70000, 28, 'https://robohash.org/nonquamnemo.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 8, 'Dwarf Live Oak', 'quis nostrud exercitation ullamco laboris', 20000, 24, 'https://robohash.org/sedeosqui.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 9, 'Hairy Rupturewort', 'consectetur adipiscing elit', 20000, 70, 'https://robohash.org/veroquinemo.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 4, 'Partridgeberry', 'nisi ut aliquip ex ea commodo consequat', 30000, 64, 'https://robohash.org/impeditrepellendusea.png?size=500x500&set=set1', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 6, 'Catillaria Lichen', 'nisi ut aliquip ex ea commodo consequat', 40000, 70, 'https://robohash.org/estutinventore.png?size=500x500&set=set1', N'Đã xác thực');
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
insert into Bills (UserID, BillDate, BillStatus) values (1, '23/03/2024', N'Đã thanh toán');
insert into Bills (UserID, BillDate, BillStatus) values (1, '16/01/2024', N'Đã thanh toán');
insert into Bills (UserID, BillDate, BillStatus) values (1, '12/01/2024', N'Đã thanh toán');
insert into Bills (UserID, BillDate, BillStatus) values (2, '04/04/2024', N'Đã thanh toán');
insert into Bills (UserID, BillDate, BillStatus) values (2, '21/06/2024', N'Đã thanh toán');
insert into Bills (UserID, BillDate, BillStatus) values (2, '22/08/2024', N'Đã thanh toán');
insert into Bills (UserID, BillDate, BillStatus) values (3, '25/10/2024', N'Đã thanh toán');
insert into Bills (UserID, BillDate, BillStatus) values (3, '24/01/2024', N'Đã thanh toán');
insert into Bills (UserID, BillDate, BillStatus) values (3, '11/07/2024', N'Đã thanh toán');
insert into Bills (UserID, BillDate, BillStatus) values (4, '01/01/2024', N'Đã thanh toán');
insert into Bills (UserID, BillDate, BillStatus) values (4, '10/07/2024', N'Đã thanh toán');
insert into Bills (UserID, BillDate, BillStatus) values (4, '30/05/2024', N'Đã thanh toán');
insert into Bills (UserID, BillDate, BillStatus) values (5, '21/11/2024', N'Đã thanh toán');
insert into Bills (UserID, BillDate, BillStatus) values (5, '26/08/2024', N'Đã thanh toán');
insert into Bills (UserID, BillDate, BillStatus) values (5, '24/03/2024', N'Đã thanh toán');
insert into Bills (UserID, BillDate, BillStatus) values (1, '24/03/2024', N'Đã thanh toán');
go
--select * from Bills
--delete from Bills
--DBCC CHECKIDENT (Bills, RESEED, 0);



--insert BillDetails
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (32, 54, '07/12/2023', 5, N'Đã nhận hàng', 3);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (35, 23, '18/11/2023', 8, N'Đã nhận hàng', 1);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (31, 12, '15/06/2023', 5, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (36, 20, '15/03/2023', 6, N'Đã nhận hàng', 3);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (41, 59, '02/02/2023', 3, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (43, 90, '04/11/2023', 9, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (32, 68, '23/08/2023', 2, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (39, 24, '07/05/2023', 7, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (42, 11, '07/09/2023', 10, N'Đã nhận hàng', 1);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (33, 64, '09/08/2023', 8, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (39, 41, '18/02/2023', 4, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (33, 73, '06/10/2023', 3, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (33, 1, '21/09/2023', 3, N'Đã nhận hàng', 1);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (31, 50, '11/06/2023', 7, N'Đã nhận hàng', 1);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (39, 60, '04/10/2023', 5, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (42, 58, '11/01/2023', 4, N'Đã nhận hàng', 1);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (33, 41, '03/12/2023', 7, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (36, 47, '04/12/2023', 2, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (41, 95, '02/06/2023', 1, N'Đã nhận hàng', 1);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (38, 56, '25/11/2023', 2, N'Đã nhận hàng', 1);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (34, 2, '25/03/2023', 1, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (38, 91, '31/05/2023', 1, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (32, 91, '05/08/2023', 7, N'Đã nhận hàng', 3);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (44, 7, '17/07/2023', 5, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (32, 50, '04/05/2023', 7, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (35, 44, '29/04/2023', 4, N'Đã nhận hàng', 3);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (45, 27, '29/09/2023', 6, N'Đã nhận hàng', 3);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (33, 40, '24/10/2023', 9, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (37, 87, '16/10/2023', 2, N'Đã nhận hàng', 1);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (41, 52, '28/10/2023', 9, N'Đã nhận hàng', 3);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (37, 18, '13/03/2023', 3, N'Đã nhận hàng', 1);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (44, 38, '14/07/2023', 3, N'Đã nhận hàng', 3);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (35, 92, '29/12/2023', 6, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (31, 7, '28/12/2023', 4, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (32, 22, '26/06/2023', 7, N'Đã nhận hàng', 3);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (34, 61, '10/12/2023', 3, N'Đã nhận hàng', 3);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (31, 99, '24/05/2023', 4, N'Đã nhận hàng', 1);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (44, 67, '13/04/2023', 1, N'Đã nhận hàng', 1);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (40, 40, '19/07/2023', 10, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (36, 65, '23/07/2023', 10, N'Đã nhận hàng', 1);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (31, 70, '29/01/2023', 7, N'Đã nhận hàng', 1);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (34, 2, '28/02/2023', 6, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (41, 23, '29/09/2023', 8, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (40, 83, '07/01/2023', 8, N'Đã nhận hàng', 1);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (33, 52, '27/09/2023', 9, N'Đã nhận hàng', 1);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (32, 29, '13/05/2023', 8, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (43, 87, '06/02/2023', 7, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (45, 49, '15/04/2023', 4, N'Đã nhận hàng', 3);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (38, 89, '01/05/2023', 5, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (31, 20, '12/04/2023', 7, N'Đã nhận hàng', 1);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (38, 44, '06/06/2023', 6, N'Đã nhận hàng', 3);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (42, 33, '22/01/2023', 6, N'Đã nhận hàng', 3);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (36, 81, '19/01/2023', 2, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (34, 3, '12/06/2023', 6, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (43, 65, '01/05/2023', 7, N'Đã nhận hàng', 1);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (34, 90, '04/11/2023', 4, N'Đã nhận hàng', 1);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (44, 85, '09/12/2023', 10, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (38, 10, '07/07/2023', 4, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (37, 30, '26/08/2023', 1, N'Đã nhận hàng', 1);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (36, 25, '10/02/2023', 5, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (37, 14, '26/05/2023', 5, N'Đã nhận hàng', 3);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (36, 36, '24/02/2023', 1, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (37, 28, '15/10/2023', 2, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (45, 61, '30/03/2023', 7, N'Đã nhận hàng', 3);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (37, 70, '26/10/2023', 2, N'Đã nhận hàng', 3);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (32, 1, '20/01/2023', 7, N'Đã nhận hàng', 3);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (33, 16, '25/09/2023', 8, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (44, 50, '24/04/2023', 7, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (43, 36, '13/02/2023', 5, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (34, 83, '19/12/2023', 5, N'Đã nhận hàng', 3);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (31, 9, '06/04/2023', 10, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (36, 40, '04/05/2023', 3, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (36, 33, '13/08/2023', 7, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (39, 56, '14/11/2023', 2, N'Đã nhận hàng', 1);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (36, 4, '21/06/2023', 7, N'Đã nhận hàng', 1);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (42, 26, '02/05/2023', 1, N'Đã nhận hàng', 3);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (44, 78, '28/10/2023', 4, N'Đã nhận hàng', 1);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (42, 49, '12/04/2023', 2, N'Đã nhận hàng', 3);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (45, 38, '21/10/2023', 2, N'Đã nhận hàng', 3);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (33, 45, '15/05/2023', 2, N'Đã nhận hàng', 3);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (44, 36, '23/03/2023', 4, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (33, 6, '23/02/2023', 9, N'Đã nhận hàng', 3);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (45, 29, '01/06/2023', 3, N'Đã nhận hàng', 3);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (41, 84, '05/11/2023', 10, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (33, 78, '16/06/2023', 2, N'Đã nhận hàng', 2);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (34, 54, '17/07/2023', 10, N'Đã nhận hàng', 1);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (36, 18, '20/10/2023', 10, N'Đã nhận hàng', 1);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (32, 7, '16/02/2023', 9, N'Đã nhận hàng', 1);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (41, 82, '03/09/2023', 2, N'Đã nhận hàng', 1);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus, ShipperID) values (32, 10, '22/02/2023', 7, N'Đã nhận hàng', 1);
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus) values (1, 76, '27/03/2023', 1, N'Chưa xác nhận');
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus) values (1, 3, '26/02/2023', 1, N'Chưa xác nhận');
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus) values (1, 57, '23/03/2023', 1, N'Chưa xác nhận');
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus) values (1, 59, '02/01/2023', 1, N'Chưa xác nhận');
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus) values (1, 96, '03/01/2023', 1, N'Chưa xác nhận');
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus) values (1, 95, '19/03/2023', 1, N'Chưa xác nhận');
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus) values (1, 76, '27/03/2023', 1, N'Chưa xác nhận');
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus) values (46, 3, '24/03/2024', 1, N'Đã xác nhận');
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus) values (46, 57, '24/03/2024', 1, N'Đã xác nhận');
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus) values (46, 59, '24/03/2024', 1, N'Đã xác nhận');
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus) values (46, 96, '24/03/2024', 1, N'Đã xác nhận');
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus) values (46, 95, '24/03/2024', 1, N'Đã xác nhận');
go
--select * from BillDetails
--delete from BillDetails
--DBCC CHECKIDENT (BillDetails, RESEED, 0);



--insert ProductReviews
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (3, 5, '13/02/2024', 1, 'consectetur adipiscing elit');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (2, 1, '10/03/2023', 1, 'Lorem ipsum dolor sit amet');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (4, 5, '28/05/2023', 2, 'consectetur adipiscing elit');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (3, 4, '08/07/2023', 4, 'sed do eiusmod tempor incididunt');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (4, 4, '10/06/2023', 1, 'Lorem ipsum dolor sit amet');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (1, 2, '04/08/2023', 3, 'consectetur adipiscing elit');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (4, 3, '20/07/2023', 4, 'ut labore et dolore magna aliqua.');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (5, 3, '25/01/2023', 2, 'Lorem ipsum dolor sit amet');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (5, 2, '15/05/2023', 3, 'ut labore et dolore magna aliqua.');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (1, 5, '12/04/2023', 5, 'sed do eiusmod tempor incididunt');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (3, 3, '04/03/2023', 3, 'Lorem ipsum dolor sit amet');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (2, 2, '21/12/2023', 5, 'Lorem ipsum dolor sit amet');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (3, 2, '13/09/2023', 5, 'Lorem ipsum dolor sit amet');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (4, 5, '25/01/2024', 2, 'ut labore et dolore magna aliqua.');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (1, 1, '12/03/2024', 4, 'ut labore et dolore magna aliqua.');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (4, 5, '10/12/2023', 2, 'Lorem ipsum dolor sit amet');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (3, 3, '15/12/2024', 2, 'consectetur adipiscing elit');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (1, 2, '03/06/2024', 3, 'Lorem ipsum dolor sit amet');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (5, 5, '10/01/2023', 5, 'consectetur adipiscing elit');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (4, 2, '23/04/2023', 2, 'sed do eiusmod tempor incididunt');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (3, 5, '10/02/2023', 1, 'consectetur adipiscing elit');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (2, 4, '15/04/2024', 1, 'ut labore et dolore magna aliqua.');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (4, 2, '25/02/2024', 2, 'sed do eiusmod tempor incididunt');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (2, 4, '19/03/2023', 5, 'ut labore et dolore magna aliqua.');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (2, 5, '05/01/2023', 1, 'sed do eiusmod tempor incididunt');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (1, 2, '03/05/2024', 1, 'sed do eiusmod tempor incididunt');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (1, 2, '20/12/2023', 2, 'consectetur adipiscing elit');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (3, 4, '02/08/2024', 4, 'sed do eiusmod tempor incididunt');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (3, 3, '03/01/2024', 4, 'sed do eiusmod tempor incididunt');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (1, 5, '04/04/2024', 4, 'sed do eiusmod tempor incididunt');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (3, 1, '19/10/2023', 5, 'sed do eiusmod tempor incididunt');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (2, 3, '21/10/2023', 5, 'sed do eiusmod tempor incididunt');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (4, 1, '04/12/2023', 4, 'consectetur adipiscing elit');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (5, 1, '12/07/2023', 2, 'sed do eiusmod tempor incididunt');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (4, 3, '18/02/2024', 2, 'sed do eiusmod tempor incididunt');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (5, 2, '02/04/2024', 5, 'Lorem ipsum dolor sit amet');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (5, 4, '12/02/2023', 2, 'ut labore et dolore magna aliqua.');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (5, 5, '19/03/2024', 3, 'consectetur adipiscing elit');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (2, 4, '26/07/2023', 2, 'consectetur adipiscing elit');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (1, 1, '18/08/2023', 3, 'consectetur adipiscing elit');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (5, 7, '27/02/2024', 4, 'that is the question.');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (2, 8, '12/10/2023', 2, 'How much wood would a woodchuck chuck if a woodchuck could chuck wood?');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (2, 6, '23/03/2023', 4, 'To be or not to be');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (1, 10, '19/01/2023', 5, 'How much wood would a woodchuck chuck if a woodchuck could chuck wood?');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (3, 10, '16/01/2024', 4, 'The quick brown fox jumps over the lazy dog.');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (5, 7, '13/07/2023', 2, 'The quick brown fox jumps over the lazy dog.');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (2, 8, '25/05/2023', 2, 'To be or not to be');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (3, 10, '26/05/2023', 1, 'Lorem ipsum dolor sit amet');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (1, 10, '28/02/2024', 5, 'Lorem ipsum dolor sit amet');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (4, 8, '18/07/2023', 1, 'The quick brown fox jumps over the lazy dog.');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (2, 6, '20/03/2024', 4, 'To be or not to be');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (5, 7, '25/06/2023', 5, 'Lorem ipsum dolor sit amet');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (3, 7, '02/12/2023', 5, 'All work and no play makes Jack a dull boy.');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (3, 6, '16/08/2023', 1, 'Lorem ipsum dolor sit amet');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (4, 7, '15/06/2023', 2, 'How much wood would a woodchuck chuck if a woodchuck could chuck wood?');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (1, 7, '29/04/2023', 1, 'How much wood would a woodchuck chuck if a woodchuck could chuck wood?');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (3, 8, '03/06/2023', 1, 'The quick brown fox jumps over the lazy dog.');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (1, 8, '12/02/2024', 3, 'consectetur adipiscing elit.');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (1, 10, '21/08/2023', 2, 'The quick brown fox jumps over the lazy dog.');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (1, 9, '17/03/2023', 5, 'Lorem ipsum dolor sit amet');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (1, 7, '27/12/2023', 5, 'All work and no play makes Jack a dull boy.');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (4, 7, '30/09/2023', 1, 'To be or not to be');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (2, 8, '14/09/2023', 5, 'All work and no play makes Jack a dull boy.');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (3, 8, '15/01/2024', 5, 'How much wood would a woodchuck chuck if a woodchuck could chuck wood?');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (4, 9, '28/03/2024', 4, 'How much wood would a woodchuck chuck if a woodchuck could chuck wood?');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (3, 10, '09/11/2023', 3, 'All work and no play makes Jack a dull boy.');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (2, 9, '29/11/2023', 4, 'To be or not to be');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (3, 10, '08/03/2023', 4, 'consectetur adipiscing elit.');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (3, 7, '26/06/2023', 1, 'How much wood would a woodchuck chuck if a woodchuck could chuck wood?');
insert into ProductReviews (UserID, ProductID, ProductReviewDate, ProductReviewStar, ProductReviewText) values (5, 9, '26/05/2023', 5, 'Lorem ipsum dolor sit amet');
go
--select * from ProductReviews
--delete from ProductReviews
--DBCC CHECKIDENT (ProductReviews, RESEED, 0);



--insert Supports
insert into Supports (UserID, AdminID, SupportTitle, SupportRequest) values (2, 1, 'Support A', 'How much wood would a woodchuck chuck if a woodchuck could chuck wood?');
insert into Supports (UserID, AdminID, SupportTitle, SupportRequest) values (3, 1, 'Support B', 'All work and no play makes Jack a dull boy.');
insert into Supports (UserID, AdminID, SupportTitle, SupportRequest) values (1, 1, 'Support C', 'To be or not to be');
insert into Supports (UserID, AdminID, SupportTitle, SupportRequest) values (1, 1, 'Support D', 'The quick brown fox jumps over the lazy dog.');
insert into Supports (UserID, AdminID, SupportTitle, SupportRequest) values (2, 1, 'Support E', 'Lorem ipsum dolor sit amet');
insert into Supports (UserID, AdminID, SupportTitle, SupportRequest) values (3, 1, 'Support F', 'Lorem ipsum dolor sit amet');
insert into Supports (UserID, AdminID, SupportTitle, SupportRequest) values (2, 1, 'Support G', 'To be or not to be');
insert into Supports (UserID, AdminID, SupportTitle, SupportRequest) values (1, 1, 'Support H', 'consectetur adipiscing elit.');
insert into Supports (UserID, AdminID, SupportTitle, SupportRequest) values (1, 1, 'Support I', 'that is the question.');
insert into Supports (UserID, AdminID, SupportTitle, SupportRequest) values (5, 1, 'Support J', 'that is the question.');
--select * from Supports
--delete from Supports
--DBCC CHECKIDENT (Supports, RESEED, 0);