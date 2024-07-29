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
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('user1', '12345', 'https://robohash.org/etestnecessitatibus.png?size=300x300&set=set1', 'fsleathq@dropbox.com', '0964 Elmside Park', '3888425044', N'Văn Sơn', N'Trần', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('user2', '12345', 'https://robohash.org/distinctioestid.png?size=300x300&set=set1', 'saddlestoner@macromedia.com', '17 Memorial Place', '8298490860', N'Thị Tú', N'Lê', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('user3', '12345', 'https://robohash.org/perferendisquaeratqui.png?size=300x300&set=set1', 'britmeiers@scribd.com', '81 Pawling Plaza', '6382225261', N'Văn Tuấn', N'Lý', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('user4', '12345', 'https://robohash.org/fugitautemaut.png?size=300x300&set=set1', 'sshinet@theglobeandmail.com', '92 Mitchell Parkway', '7632589891', N'Mạnh Tùng', N'Nguyễn', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('user5', '12345', 'https://robohash.org/voluptatemnemoest.png?size=300x300&set=set1', 'mkennedyu@e-recht24.de', '614 Parkside Lane', '4037938700', N'Hải Phong', N'Đỗ', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('seller1', '12345', 'https://robohash.org/illositmolestiae.png?size=300x300&set=set1', 'mabramofv@hexun.com', '37808 Grasskamp Park', '2702718322', N'Thị Linh', N'Nguyễn', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('seller2', '12345', 'https://robohash.org/commodidelectusqui.png?size=300x300&set=set1', 'lavarnew@pbs.org', '87 Thackeray Hill', '1985894440', N'Trung Kiên', N'Trần', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('seller3', '12345', 'https://robohash.org/delectusofficiaquam.png?size=300x300&set=set1', 'lmcclounanx@japanpost.jp', '5508 Lindbergh Avenue', '2771188445', N'Thị Mai', N'Đinh', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('seller4', '12345', 'https://robohash.org/ipsasintfacilis.png?size=300x300&set=set1', 'rstowtey@hatena.ne.jp', '5156 Shopko Street', '3986984226', N'Quốc Sư', N'Lý', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('seller5', '12345', 'https://robohash.org/officiaomnisquis.png?size=300x300&set=set1', 'rgregolinz@salon.com', '82 Swallow Plaza', '6742932571', N'Trọng Khang', N'Vũ', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('manager1', '12345', 'https://robohash.org/ipsamsuntquidem.png?size=300x300&set=set1', 'amcphilip10@state.gov', '7 Acker Road', '3046013942', N'Sơn Lâm', N'Dương', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('manager2', '12345', 'https://robohash.org/explicaboautemfuga.png?size=300x300&set=set1', 'mgoodbur11@bloomberg.com', '8637 Forster Point', '3598239081', N'Văn Sáu', N'Phạm', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('manager3', '12345', 'https://robohash.org/quibusdamvoluptatemducimus.png?size=300x300&set=set1', 'nvasyushkhin12@wired.com', '352 Corry Drive', '7876238742', N'Anh Bảy', N'Phan', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('manager4', '12345', 'https://robohash.org/atquisit.png?size=300x300&set=set1', 'dbrackenridge13@google.com.br', '54 Coleman Way', '5239925650', N'Thanh Thanh', N'Phùng', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('manager5', '12345', 'https://robohash.org/etvitaedignissimos.png?size=300x300&set=set1', 'ctall14@washington.edu', '7652 Butterfield Street', '7022364743', N'Đại Học', N'Đỗ', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('manager6', '12345', 'https://robohash.org/estquosalias.png?size=300x300&set=set1', 'ckunrad15@delicious.com', '42323 Sunbrook Road', '1702520489', N'Văn An', N'Lê', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('manager7', '12345', 'https://robohash.org/doloremqueetdebitis.png?size=300x300&set=set1', 'gcadalleder16@about.me', '96643 Hooker Junction', '9239063649', N'Như Nhộng', N'Trần', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('manager8', '12345', 'https://robohash.org/utquisvitae.png?size=300x300&set=set1', 'tbaudic17@e-recht24.de', '92 Kipling Place', '1233710604', N'Đóng Cột', N'Đinh', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('manager9', '12345', 'https://robohash.org/utbeataeadipisci.png?size=300x300&set=set1', 'adoale18@reddit.com', '4 Mandrake Parkway', '6261378377', N'Duy Phong', N'Tống', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('manager10', '12345', 'https://robohash.org/ipsammaioresvoluptates.png?size=300x300&set=set1', 'wbarnshaw19@shutterfly.com', '9 Truax Way', '2538580339', N'Trọng Nghĩa', N'Phan', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('manager11', '12345', 'https://robohash.org/etessevoluptas.png?size=300x300&set=set1', 'cscally1a@dailymail.co.uk', '31 Express Street', '2106250812', N'Nhân Sâm', N'Lại', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('manager12', '12345', 'https://robohash.org/utaliascommodi.png?size=300x300&set=set1', 'bmyatt1b@answers.com', '5 Upham Hill', '6661370906', N'Quốc Khánh', N'Mai', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('admin1', '12345', 'https://robohash.org/eligendivoluptatemdolorem.png?size=300x300&set=set1', 'ecapinetti1c@dailymail.co.uk', '9094 Chive Court', '6983227695', N'Tuấn Tài', N'Lê', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('admin2', '12345', 'https://robohash.org/molestiaeeaquenemo.png?size=300x300&set=set1', 'aayres1d@privacy.gov.au', '1 Spaight Trail', '9342731151', N'Bá Thanh', N'Trần', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('user6', '12345', 'https://robohash.org/eoslaboriosamqui.png?size=300x300&set=set1', 'kpleasaunce0@businessweek.com', '57 Spohn Drive', '6706339360', N'Thu Phương', N'Nguyễn', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('user7', '12345', 'https://robohash.org/noninlibero.png?size=300x300&set=set1', 'sstowte1@ftc.gov', '087 Lake View Circle', '162-674-5194', N'Tiến Nam', N'Lý', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('user8', '12345', 'https://robohash.org/accusamusidut.png?size=300x300&set=set1', 'omarjanovic2@stanford.edu', '79 Bartelt Road', '7342654271', N'Trung Dũng', N'Nguyễn', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('user9', '12345', 'https://robohash.org/estautperferendis.png?size=300x300&set=set1', 'oarmitt3@soundcloud.com', '90840 Del Mar Court', '5297638314', N'Kiên Cường', N'Trần', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('user10', '12345', 'https://robohash.org/praesentiumnoninventore.png?size=300x300&set=set1', 'dspeeding4@flavors.me', '35 Prairieview Lane', '8668616539', N'Phúc Đức', N'Phạm', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('user11', '12345', 'https://robohash.org/ullamillumquo.png?size=300x300&set=set1', 'bducarme5@sina.com.cn', '03451 Fallview Street', '3545202041', N'Thị Trang', N'Vũ', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('shipper1', '12345', 'https://robohash.org/quiiurea.png?size=500x500&set=set1', 'rdunridge0@dailymail.co.uk', '3685 Monica Park', '8262284612', N'Anh Mười', N'Phan', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('shipper2', '12345', 'https://robohash.org/ametetnon.png?size=500x500&set=set1', 'lstyche1@auda.org.au', '6 Delladonna Point', '3458000656', N'Thị Ánh', N'Phạm', 'Active');
insert into Users (UserAccountName, UserPassword, UserPFP, UserEmail, UserAddress, UserPhone, UserFirstName, UserLastName, UserStatus) values ('shipper3', '12345', 'https://robohash.org/quoessequidem.png?size=500x500&set=set1', 'tprobart2@dailymotion.com', '392 Golf Course Hill', '2498959369', N'Tấn Trung', N'Phan', 'Active');
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
insert into Sellers (SellerName, SellerAddress, UserID, SellManagerID) values (N'Công ty TNHH số 1', '60 Manitowish Park', 6, 1);
insert into Sellers (SellerName, SellerAddress, UserID, SellManagerID) values (N'Tập đoàn số 2', '72 Clarendon Terrace', 7, 1);
insert into Sellers (SellerName, SellerAddress, UserID, SellManagerID) values (N'Doanh nghiệp số 3', '967 Kedzie Street', 8, 1);
insert into Sellers (SellerName, SellerAddress, UserID, SellManagerID) values (N'Xí nghiệp số 4', '3280 Schlimgen Place', 9, 1);
insert into Sellers (SellerName, SellerAddress, UserID, SellManagerID) values (N'Cửa hàng số 5', '06 Russell Terrace', 10, 1);
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
insert into Banners (AdminID, CategoryID, BannerPic) values (1, 10, N'https://media.istockphoto.com/id/1665093623/vi/anh/tiếp-thị-kỹ-thuật-số-và-công-nghệ.jpg?s=2048x2048&w=is&k=20&c=W6bzUUHjU8yEy16QjMRE4SgeFzxw6P31P0suXiigqo8=');
insert into Banners (AdminID, CategoryID, BannerPic) values (2, 8, N'https://cdn.pixabay.com/photo/2016/08/03/09/04/universe-1566161_1280.jpg');
insert into Banners (AdminID, CategoryID, BannerPic) values (2, 5, N'https://cdn.pixabay.com/photo/2015/12/08/08/40/banner-1082644_1280.jpg');
insert into Banners (AdminID, CategoryID, BannerPic) values (1, 7, N'https://cdn.pixabay.com/photo/2015/12/08/08/40/banner-1082646_1280.jpg');
insert into Banners (AdminID, CategoryID, BannerPic) values (1, 3, N'https://cdn.pixabay.com/photo/2016/08/03/09/03/universe-1566159_1280.jpg');
go
--select * from Banners
--delete from Banners
--DBCC CHECKIDENT (Banners, RESEED, 0);



--insert Notifications
insert into Notifications (UserID, NotificationText, NotificationHeader) values (1, 'Lorem ipsum dolor sit amet', N'Thông báo 1');
insert into Notifications (UserID, NotificationText, NotificationHeader) values (1, 'consectetur adipiscing elit', N'Thông báo 2');
insert into Notifications (UserID, NotificationText, NotificationHeader) values (1, 'sed do eiusmod tempor incididunt', N'Thông báo 3');
insert into Notifications (UserID, NotificationText, NotificationHeader) values (1, 'ut labore et dolore magna aliqua', N'Thông báo 4');
insert into Notifications (UserID, NotificationText, NotificationHeader) values (1, 'Lorem ipsum dolor sit amet', N'Thông báo 5');
insert into Notifications (UserID, NotificationText, NotificationHeader) values (1, 'consectetur adipiscing elit', N'Thông báo 6');
go
--select * from Notifications
--delete from Notifications
--DBCC CHECKIDENT (Notifications, RESEED, 0);



--insert Products
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 7, N'Giá Sách', 'ut enim ad minim veniam', 80000, 57, 'https://dogoqueen.com/wp-content/uploads/2022/12/ke-sach-dep-gia-re.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 10, N'Bim Bim', 'sed do eiusmod tempor incididunt', 10000, 29, 'https://down-vn.img.susercontent.com/file/vn-11134201-23030-lznrficffrov9e', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 6, N'Màn Hình Máy Tính', 'ut enim ad minim veniam', 100000, 92, 'https://chiemtaimobile.vn/images/detailed/42/man-hinh-may-tinh-redmi-rmmnt215nf__3_.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 5, N'Gậy Bi-a', 'Lorem ipsum dolor sit amet', 70000, 46, 'https://xbilliard.vn/wp-content/uploads/2023/07/1-5.png', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 10, N'Kẹo Mút', 'nisi ut aliquip ex ea commodo consequat', 50000, 13, 'https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/filters:quality(95)/https://cms-prod.s3-sgn09.fptcloud.com/chupa_chups_huong_hon_hop_143288a808.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 3, N'Bút Chì', 'Lorem ipsum dolor sit amet', 40000, 45, 'https://product.hstatic.net/1000362139/product/120-hb_eebfb7111eaa48d0bd1b535f7c399c93.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 7, N'Tủ đồ nhỏ', 'Lorem ipsum dolor sit amet', 40000, 37, 'https://hoaphatsaigon.com/upload/sanpham/large/2722-hoc-di-dong-lem3d-1.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 5, N'Gậy Bóng Chày', 'ut enim ad minim veniam', 50000, 60, 'https://www.thethaodaiviet.vn/images/201702/source_img/gay-bong-chay-go-g29-p9601487366144071.jpg?v=1.0.0', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 12, N'Sạc Dự Phòng', 'sed do eiusmod tempor incididunt', 20000, 84, 'https://topk.vn/Upload/product/pin-sac-du-phong-topk-i2006-20000mah-2-cong.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 1, N'Áo Hoodie', 'ut enim ad minim veniam', 70000, 73, 'https://product.hstatic.net/1000360022/product/id-000558a_9ee033869a0a4172b45bc77f8238168d_master.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 4, N'Sách Mein Kampf', 'Lorem ipsum dolor sit amet', 50000, 30, 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/msnbc/2016_27/481496/gettyimages-501415212.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 10, N'Kẹo Dẻo', 'consectetur adipiscing elit', 20000, 85, 'https://cdn.dungculambanh.com.vn/wp-content/uploads/2021/05/keo-xop-04.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 10, N'Kẹo Nougat', 'Lorem ipsum dolor sit amet', 100000, 47, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Nougat.jpg/640px-Nougat.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 9, N'Vòng Tay', 'quis nostrud exercitation ullamco laboris', 60000, 79, 'https://www.vietgemstones.com/image/cache/catalog/san-pham/trang-suc-phong-thuy-menh-thuy/Topaz/vong-tay-da-topaz-phoi-charm-bac-2-1000x1000.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 8, N'Bộ Đũa', 'sed do eiusmod tempor incididunt', 30000, 10, 'https://moriitalia.com/images/thumbs/002/0023870_dua-tre-nhat-ban-vi-5-doi-kokusai-ndck-05a_700.jpeg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 8, N'Thìa', 'consectetur adipiscing elit', 10000, 1, 'https://miura.com.vn/wp-content/uploads/2023/01/mm.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 2, N'Son môi', 'sed do eiusmod tempor incididunt', 100000, 60, 'https://www.shiseido.com.vn/dw/image/v2/BCSK_PRD/on/demandware.static/-/Sites-itemmaster_shiseido/default/dw14d75c28/images/products/18058/18058_S_01.jpg?sw=1000&sh=1000&sm=fit', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 7, N'Tranh Treo Tường', 'ut labore et dolore magna aliqua', 60000, 2, 'https://tranhsondauthaison.com.vn/wp-content/uploads/2021/01/tranh-truu-tuong-vangogh-1.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 2, N'Kem Dưỡng Da', 'ut labore et dolore magna aliqua', 20000, 42, 'https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/https://cms-prod.s3-sgn09.fptcloud.com/kem_duong_am_danh_cho_da_kho_cerave_moisturizing_cream_50_ml_1_d0050ef0cc.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 10, N'Kẹo Lạc', 'ut enim ad minim veniam', 20000, 40, 'https://nguyenninhhanoi.com/wp-content/uploads/2022/09/keo-lac.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 11, N'Khối Rubik 3x3', 'ut enim ad minim veniam', 100000, 38, 'https://product.hstatic.net/1000279312/product/rubik_3x3_jiehui_cube__1__c4a0c904c8724c3785936aefbcdb8030.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 3, N'Bút Bi', 'nisi ut aliquip ex ea commodo consequat', 20000, 63, 'https://down-vn.img.susercontent.com/file/a626d23da6c9d8bee5e03de3636925da', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 5, N'Quả Bóng Chuyền', 'quis nostrud exercitation ullamco laboris', 20000, 75, 'https://product.hstatic.net/1000288768/product/3__1__c2ec7c3ff88c4ea3a54951475ef8f945.png', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 3, N'Gôm Tẩy', 'consectetur adipiscing elit', 20000, 26, 'https://product.hstatic.net/1000362139/product/526b30_e5b7c205bab445e0a0030c38566e90a2.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 3, N'Thước Kẻ', 'sed do eiusmod tempor incididunt', 20000, 57, 'https://ngoclanvpp.vn/User_folder_upload/vppngoclan/images/thuoc-ke-deli-20cm.jpeg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 8, N'Bộ Dĩa', 'Lorem ipsum dolor sit amet', 70000, 87, 'https://jysk.vn/Data/Sites/1/Product/9723/495141384-bo-4-dia-an-jysk.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 3, N'Com Pa', 'quis nostrud exercitation ullamco laboris', 20000, 49, 'https://product.hstatic.net/1000230347/product/compa_thien_long_c-018_cam_6c3892df87374e99a0734873d3e0c990_1024x1024.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 7, N'Thảm Trang Trí', 'quis nostrud exercitation ullamco laboris', 40000, 55, 'https://product.hstatic.net/1000050141/product/tham-cafe-sua_558f31331ea047df800a90f36223ff6f_master.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 11, N'Đồng Hồ Ben 10', 'sed do eiusmod tempor incididunt', 90000, 46, 'https://cf.shopee.vn/file/bbe8d6bdc562eab727d6581b4902c73a', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 12, N'Sạc Type C', 'Lorem ipsum dolor sit amet', 20000, 62, 'https://product.hstatic.net/200000460953/product/h96fab2e3ffc5457da7fc2319a9580f69j.jpg_960x960_3d4589616790429db8d678262ca99643_master.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 6, N'Vỏ Case Máy Tính', 'Lorem ipsum dolor sit amet', 50000, 8, 'https://hanoicomputercdn.com/media/product/69511_eliteone_xigmatek__2___1_.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 10, N'Khô Gà Lá Chanh', 'ut enim ad minim veniam', 70000, 99, 'https://cdn.eva.vn/upload/3-2023/images/2023-07-21/1689925842-538-cach-lam-kho-ga-la-chanh-bang-noi-chien-khong-dau-tuyet-ngon-1-1689925831-622-width1000height800-1689925842-width1000height800.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 6, N'Bàn Phím Cơ', 'consectetur adipiscing elit', 100000, 76, 'https://product.hstatic.net/200000722513/product/rog-azoth-01_1928856f97bd4c0fa27cf7ffb959eb0d_121e4dcf75f04292bf018b77e6b29fcb_1024x1024.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 12, N'Ốp Lưng Điện Thoại', 'Lorem ipsum dolor sit amet', 60000, 32, 'https://hatocase.com/wp-content/uploads/2021/06/op-lung-dien-thoai-cap-doi-74.4-1.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 6, N'Chuột Máy Tính', 'ut enim ad minim veniam', 60000, 80, 'https://hanoicomputercdn.com/media/product/53012_mouse_logitech_g102_lightsync_rgb_black_0000_1.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 11, N'Hộp Bài Yugioh', 'nisi ut aliquip ex ea commodo consequat', 100000, 65, 'https://m.media-amazon.com/images/I/61wCK8v-86L._AC_UF894,1000_QL80_.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 6, N'Tai Nghe', 'ut enim ad minim veniam', 20000, 8, 'https://cdn.nguyenkimmall.com/images/detailed/605/10042790-tai-nghe-bluetooth-prolink-phb6003e-den-do-1.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 3, N'Hộp Bút', 'sed do eiusmod tempor incididunt', 20000, 17, 'https://bizweb.dktcdn.net/100/210/976/products/11.jpg?v=1623209055243', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 7, N'Đèn Trang Trí', 'quis nostrud exercitation ullamco laboris', 70000, 16, 'https://daiphuocanjsc.com/wp-content/uploads/2019/04/dt-a9905d-600x600.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 2, N'Kem trị mụn', 'nisi ut aliquip ex ea commodo consequat', 100000, 16, 'https://skin365.vn/wp-content/uploads/2021/05/Kem-Tri-Mun-La-Roche-Posay-Effaclar-Duo-40mL-1.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 3, N'Bút Máy', 'quis nostrud exercitation ullamco laboris', 40000, 20, 'https://bizweb.dktcdn.net/100/299/021/products/150350.jpg?v=1660716723340', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 3, N'Ê Ke, Thước Đo Độ', 'quis nostrud exercitation ullamco laboris', 20000, 64, 'https://down-vn.img.susercontent.com/file/e9a37e4524722e58f134e2390fac74c8', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 7, N'Két Sắt', 'Lorem ipsum dolor sit amet', 10000, 80, 'https://bizweb.dktcdn.net/thumb/1024x1024/100/437/287/products/ks50n-mo-8b10ab61-a9d5-4e88-9794-7e1708c4b134.jpg?v=1665220672903', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 9, N'Nhẫn', 'ut labore et dolore magna aliqua', 50000, 79, 'https://locphuc.com.vn/Content/Images/022023/DSR0918BRW.WG01A/nhan-kim-cuong-DSR0918BRW-WG01A-g1.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 11, N'Bài Uno', 'consectetur adipiscing elit', 30000, 37, 'https://assets.target.com.au/transform/5bcd50f9-33ca-4f5a-adf4-6ee15435fa49/277877-IMG-000?io=transform%3Afit%2Cwidth%3A1400%2Cheight%3A1600&quality=90&output=webp', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 2, N'Phấn Phủ', 'consectetur adipiscing elit', 10000, 17, 'https://product.hstatic.net/1000328823/product/thiet_ke_chua_co_ten__72__bb235e20704a4f6abefe49a6825157d6_master.png', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 5, N'Vợt Cầu Lông', 'quis nostrud exercitation ullamco laboris', 80000, 47, 'https://aocaulong.com/Uploads/images/vot-cau-long-lining-axforce-bigbang-trang%20(1).jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 1, N'Áo Khoác', 'Lorem ipsum dolor sit amet', 20000, 17, 'https://www.bodenimages.com/productimages/r1aproductlarge/23waut_u0154_cam.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 11, N'Boardgame Bang', 'ut labore et dolore magna aliqua', 90000, 3, 'https://bizweb.dktcdn.net/100/445/986/products/8936130670818.jpg?v=1702462916540', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 12, N'Sticker Trang Trí', 'ut labore et dolore magna aliqua', 20000, 20, 'https://bizweb.dktcdn.net/100/463/551/products/sticker-pokemon-dan-vali-cap-xach-2.jpg?v=1695889097567', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 10, N'Khô Bò Cháy Tỏi', 'Lorem ipsum dolor sit amet', 90000, 77, 'https://monngondathanh.com/wp-content/uploads/2021/03/bo-kho-da-nang-c.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 7, N'Đồng Hồ Treo Tường', 'nisi ut aliquip ex ea commodo consequat', 40000, 79, 'https://img.lazcdn.com/g/p/62311a46d7d3fbe17784754bff6715f6.jpg_720x720q80.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 9, N'Vòng Cổ', 'ut labore et dolore magna aliqua', 20000, 58, 'https://product.hstatic.net/1000238562/product/_eo_3051_d6c47e843d154f658ff62894149a86ce_master.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 3, N'Mực Viết Máy', 'ut enim ad minim veniam', 20000, 71, 'https://dungcuhocsinh.vn/wp-content/uploads/2020/12/015013814054096_151095678665427_5252164123766764490_n.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 6, N'Microphone', 'sed do eiusmod tempor incididunt', 80000, 60, 'https://3kshop.vn/wp-content/uploads/2023/03/3kshop-sennheiser-profile-usb-microphone-1.png', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 11, N'Boardgame Ma Sói', 'Lorem ipsum dolor sit amet', 80000, 44, 'https://vn-test-11.slatic.net/p/9e5e43ff462657f189290e33101710a7.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 5, N'Quả Bóng Rổ', 'sed do eiusmod tempor incididunt', 80000, 100, 'https://product.hstatic.net/200000365171/product/dsc09962_86f21d8778174ebf8a4d6273d5302b36_master.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 9, N'Đồng Hồ Đeo Tay', 'quis nostrud exercitation ullamco laboris', 30000, 63, 'https://cdn.tgdd.vn//News/1178420//nen-mua-dong-ho-nam-hang-nao-cac-tieu-chi-lua-chon-thuong-02.2.1-800x575-800x575.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 7, N'Giấy Dán Tường', 'ut labore et dolore magna aliqua', 100000, 50, 'https://z-home.com.vn/wp-content/uploads/2022/03/giay-dan-tuong-van-go-gia-go.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 1, N'Quần Dài', 'Lorem ipsum dolor sit amet', 50000, 87, 'https://contents.mediadecathlon.com/p1603890/k$1146358cae1cf09b47ac7452cc5ef567/men-s-country-sport-lightweight-breathable-trousers-500-beige-solognac-8543780.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 8, N'Đĩa Sứ', 'ut enim ad minim veniam', 30000, 26, 'https://ckporcelain.vn/wp-content/uploads/2019/10/TAB65103-TAB85103-TAB9103.png', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 12, N'Bình Nước Giữ Nhiệt', 'ut labore et dolore magna aliqua', 50000, 22, 'https://product.hstatic.net/200000605515/product/2_3__2ee79bc8e76c43a3bb095afcb1f69276.png', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 8, N'Bát Sứ', 'ut enim ad minim veniam', 70000, 45, N'https://gomsuohio.com/wp-content/uploads/2018/09/bát-cơm-số-1.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 6, N'Laptop', 'Lorem ipsum dolor sit amet', 20000, 87, 'https://cdn.nguyenkimmall.com/images/detailed/828/10053095-laptop-lenovo-ideapad-3-14iau7-82rj0019vn-1.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 3, N'Giấy Màu Thủ Công', 'Lorem ipsum dolor sit amet', 10000, 13, 'https://product.hstatic.net/1000266137/product/giay-in-mau__1__29212def759040aaa44b5e206bca8796_master.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 10, N'Trà Sữa Trân Châu', 'consectetur adipiscing elit', 50000, 85, N'https://gongcha.com.vn/wp-content/uploads/2018/02/Trà-sữa-Trân-châu-đen-1.png', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 3, N'Bút Sáp Màu', 'consectetur adipiscing elit', 100000, 77, 'https://product.hstatic.net/1000230347/product/cr-c04240years_5_c49a6db60d8c45af9548e3f7d13ef62c.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 2, N'Bút Kẻ Mắt', 'sed do eiusmod tempor incididunt', 90000, 6, 'https://picture.drhauschka.co.uk/media/image/be/ed/76/3134663-liquid-eyeliner-container-01-01-420005981.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 11, N'Bàn Cờ Vua', 'sed do eiusmod tempor incididunt', 50000, 42, 'https://www.covuacaocap.com/wp-content/uploads/Bo-Co-Vua-Go-Trac-Bach-Nhat-Ban-Gap-8.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 2, N'Kem Nền', 'nisi ut aliquip ex ea commodo consequat', 20000, 26, 'https://assets-hebela.cdn.vccloud.vn/dict/1/sdossstsrdgnthdrho20220921165302kem-nen-fit-me-118/ihsrsaasnrnisidisa20220921165526kem-nen-fit-me-118-hebela-3.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 4, N'Sách Đắc Nhân Tâm', 'ut enim ad minim veniam', 30000, 88, 'https://tiki.vn/blog/wp-content/uploads/2023/08/phan-4-dac-nhan-tam-1024x1024.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 7, N'Bàn Học', 'ut enim ad minim veniam', 60000, 71, 'https://hoaphatsaigon.com/upload/sanpham/large/88-ban-hr120sc7-1.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 3, N'Phách Gõ Nhịp', 'Lorem ipsum dolor sit amet', 20000, 48, 'https://vn-test-11.slatic.net/p/3ab4b3b67a5285cfb88ff5df54e2863a.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 9, N'Khuyên Tai', 'sed do eiusmod tempor incididunt', 100000, 38, 'https://bizweb.dktcdn.net/100/302/551/products/264606079785f62aaea8db.jpg?v=1531850862207', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 2, N'Sửa Rửa Mặt', 'quis nostrud exercitation ullamco laboris', 40000, 58, 'https://www.pharmart.vn/images/product/origin/sua-rua-mat-acnes-creamy-wash-ahabhazinc-6461fe1720245.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 9, N'Kính Râm', 'ut labore et dolore magna aliqua', 20000, 7, 'https://kinhmateyeplus.com/wp-content/uploads/2023/11/8102.png', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 5, N'Quả Bóng Đá', 'nisi ut aliquip ex ea commodo consequat', 30000, 52, 'https://zocker.vn/Pic/images/qua-bong-da-Latico.webp', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 9, N'Tất Giữ Ấm', 'ut labore et dolore magna aliqua', 90000, 37, 'https://pos.nvncdn.com/4260cc-24295/ps/20201030_Oyd2kndeXGWjOTYthMLsn6Me.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 11, N'Bàn Cờ Tướng', 'quis nostrud exercitation ullamco laboris', 50000, 16, 'https://bizweb.dktcdn.net/100/299/021/products/ban-co-tuong-545657-lon-1.jpg?v=1611642699347', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 12, N'Móc Khóa', 'ut labore et dolore magna aliqua', 40000, 21, 'https://img.ws.mms.shopee.vn/bf1d5815f056464a7ff3a35bd19c9e68', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 5, N'Quả Bóng Tennis', 'quis nostrud exercitation ullamco laboris', 50000, 91, 'https://my-live-01.slatic.net/p/31f2939ed70232b6a24807e40a2db31f.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 7, N'Đèn Học', 'sed do eiusmod tempor incididunt', 50000, 52, 'https://rangdong.com.vn/uploads/product/den-ban/RD-RL-01.V2/RD-RL-27.V2-1.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 11, N'Bàn Cờ Cá Ngựa', 'ut labore et dolore magna aliqua', 30000, 94, 'https://bizweb.dktcdn.net/100/317/763/products/9ed43408fad92f8776c83.jpg?v=1704856143890', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 12, N'Móc Phơi Quần Áo', 'Lorem ipsum dolor sit amet', 60000, 23, 'https://img.lazcdn.com/g/p/2476de83f47ab684232b3701dda2cd52.jpg_720x720q80.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 5, N'Quả Bóng Bàn', 'consectetur adipiscing elit', 50000, 59, 'https://thethaodonga.com/wp-content/uploads/2021/07/qua-bong-ban-3-sao-hop-12-qua-2.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 2, N'Dầu Gội Đầu', 'ut enim ad minim veniam', 20000, 8, 'https://cdn1.concung.com/storage/2022/11/1668997531-dau-goi-sunsilk-ong-muot-rang-ngoi-650g.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 11, N'Đồ Chơi Nhật Kendama', 'ut labore et dolore magna aliqua', 70000, 36, 'https://thvl.vn/wp-content/uploads/2016/12/trochoi1.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 2, N'Dung Dịch Tẩy Trang', 'ut labore et dolore magna aliqua', 10000, 45, 'https://skinaqua.vn/wp-content/uploads/2023/03/nuoc-tay-trang-Bioderma-xanh-1.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 5, N'Giày Đá Bóng', 'consectetur adipiscing elit', 40000, 36, 'https://supersports.com.vn/cdn/shop/files/ID9338-7_1200x1200.jpg?v=1700217594', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 7, N'Quạt Điện', 'ut enim ad minim veniam', 60000, 54, 'https://thegioidodung.vn/wp-content/uploads/2023/04/quat-ban-sankyo-b300-vn-6.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 5, N'Vợt Tennis', 'Lorem ipsum dolor sit amet', 90000, 65, 'https://www.gusport.com.vn/image/catalog/san-pham/VOT/YONEX/Percept/percept-2023/percept-100-300gr/vot-tennis-yonex-percept-100-300gr-2023-made-in-japan-01pe100.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 4, N'Khéo Ăn Nói Sẽ Có Được Thiên Hạ', 'ut labore et dolore magna aliqua', 100000, 53, 'https://product.hstatic.net/1000237375/product/bia_truoc_a9b8aae54aa645d4b28e8a3c148e6810.png', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 11, N'Fidget Spinner', 'sed do eiusmod tempor incididunt', 90000, 14, 'https://vuagiadung.net/wp-content/uploads/2021/03/medium_1511671740_wew1511671740.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 7, N'Ghế Gấp', 'ut enim ad minim veniam', 20000, 51, 'https://noithatsen.com/wp-content/uploads/2022/12/ghe-gap-g04-hoa-phat.jpeg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 3, N'Vở Viết', 'quis nostrud exercitation ullamco laboris', 70000, 16, 'https://pos.nvncdn.com/7a6d8f-102734/ps/20210621_V1pgSAj5CUlauapoLGnnaxjN.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 10, N'Bánh Donut', 'nisi ut aliquip ex ea commodo consequat', 70000, 28, 'https://cdn.tgdd.vn/Files/2021/07/28/1371385/2-cach-lam-banh-donut-nuong-va-chien-ngon-don-gian-tai-nha-202206031611571875.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 8, N'Nồi Nấu Ăn', 'quis nostrud exercitation ullamco laboris', 20000, 24, 'https://bizweb.dktcdn.net/thumb/1024x1024/100/448/192/products/nag1358-avata3.jpg?v=1654159073073', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 9, N'Găng Tay Giữ Ấm', 'consectetur adipiscing elit', 20000, 70, 'https://product.hstatic.net/200000033050/product/03_b883e6dad3a94d908775f400867215f0.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 4, N'Giáo Trình Tư Tưởng HCM', 'nisi ut aliquip ex ea commodo consequat', 30000, 64, 'https://img.ws.mms.shopee.vn/8ee15b436a2b1e762111a083e580b9d6', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 6, N'Vi Xử Lý', 'nisi ut aliquip ex ea commodo consequat', 40000, 70, 'https://product.hstatic.net/200000420363/product/-5-5600x-_3.7ghz-up-to-4.6ghz_-am4_-6-cores-12-threads_-box-chinh-hang_4b1a8df1391e4eb0b0cc7a32677cc9ff_master.jpg', N'Đã xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 1, N'Quần Short', 'Lorem ipsum dolor sit amet', 60000, 511, 'https://product.hstatic.net/200000775589/product/qsm042_043_36223b1a8a4e46aca0057aec0995b555_master.jpg', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 3, N'Bút Xóa Nước', 'consectetur adipiscing elit', 90000, 971, 'https://thietbivanphongtanphu.vn/wp-content/uploads/2022/05/But-xoa-CP-02-hop-10.jpg', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 4, N'Giáo Trình Triết Học MLN', 'ut labore et dolore magna aliqua.', 60000, 627, 'https://www.anhthanh.vn/upload/products/2023-06-28-09-26-14/1-10.jpg', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 6, N'Bo Mạch Chủ', 'sed do eiusmod tempor incididunt', 70000, 809, 'https://hanoicomputercdn.com/media/product/55023_b550_steel_legend_l1_.png', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 6, N'Card Đồ họa', 'sed do eiusmod tempor incididunt', 200000, 426, 'https://static.gigabyte.com/StaticFile/Image/Global/000ff0c69cc8e7ae8eda1df8867694d3/Product/24172/Png', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 10, N'Bánh Macaron', 'ut labore et dolore magna aliqua.', 70000, 803, 'https://cdn.tgdd.vn/2021/10/CookRecipe/Avatar/banh-macaron-bang-bot-mi-thumbnail-1.jpg', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 6, N'Bộ Nhớ Đệm', 'consectetur adipiscing elit', 60000, 127, 'https://hanoicomputercdn.com/media/product/54205_ram_desktop_gskill_trident_z_rgb__f4_3600c18d_16gtzr__16gb__2x8gb__ddr4_3600mhz_2.jpg', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 1, N'Áo Phông', 'consectetur adipiscing elit', 200000, 95, 'https://bizweb.dktcdn.net/100/480/122/products/cdl10-1.jpg?v=1692236733653', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 5, N'Gậy Đánh Golf', 'Lorem ipsum dolor sit amet', 60000, 192, 'https://www.tatgolf.vn/media/catalog/product/cache/4b8a26fd3678cf71135a0bf838b897de/r/t/rtx6_zipcore_nspro_1.jpg', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 12, N'Nước Lau Kính', 'sed do eiusmod tempor incididunt', 50000, 139, 'https://ptphucthinh.com/wp-content/uploads/2019/02/nuoc-lau-kinh-gift-540ml.jpg', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 6, N'Ổ Cứng SSD', 'ut labore et dolore magna aliqua.', 100000, 904, 'https://minhancomputercdn.com/media/product/2682_untitled_9.gif', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 5, N'Bình Nước Thể Thao', 'ut labore et dolore magna aliqua.', 80000, 583, 'https://healthyfarm.com.vn/wp-content/uploads/2021/07/z2586564753713_35298402efb31385e680b2d790a3d5df.jpg', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 6, N'Nguồn Máy Tính', 'Lorem ipsum dolor sit amet', 70000, 555, 'https://www.lifewire.com/thmb/Gb9Gx1CUa04i_-cq35BvBTEPdL0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/power-supply-5aba984fba617700376b877f.PNG', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 10, N'Bánh Cupcake', 'ut labore et dolore magna aliqua.', 50000, 867, 'https://cdn.tgdd.vn/Files/2022/03/18/1420984/cach-lam-banh-cupcake-de-thuong-vo-cung-don-gian-tai-nha-202203180755374657.jpg', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 2, N'Xà Phòng Lifebuoy', 'consectetur adipiscing elit', 60000, 576, 'https://product.hstatic.net/200000376269/product/xa-bong-cuc-lifebuoy-bao-ve-vuot-troi-90g-202211191641022011_166b3e9d3219471288f8c7acb38b4edf.jpg', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 1, N'Áo Mưa', 'ut labore et dolore magna aliqua.', 100000, 83, 'https://www.moby.com.vn/data/bt4/ao-mua-omron-1695831998.png', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 5, N'Kính Bơi', 'consectetur adipiscing elit', 100000, 182, 'https://bizweb.dktcdn.net/100/377/754/files/kinh-boi-view-v220a.jpg?v=1596534201764', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 1, N'Váy Dự Tiệc', 'consectetur adipiscing elit', 200000, 418, 'https://247store.vn/uploads/products/20220607/z3439735412566183bbe512d9122cda0072c3c0e755f4d.jpg', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 11, N'Mô Hình Buzz Lightyear', 'sed do eiusmod tempor incididunt', 80000, 129, 'https://homegift.vn/503-large_default/do-choi-toystory-buzz-lightyear.jpg', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 8, N'Chảo', 'sed do eiusmod tempor incididunt', 60000, 504, 'https://vietnamshine.com/wp-content/uploads/2017/11/teflon-infnity-frypan-20cm-3.png', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 4, N'Giáo Trình CNXH-KH', 'ut labore et dolore magna aliqua.', 90000, 182, 'https://cf.shopee.vn/file/vn-11134207-7qukw-lijvxelxj7wyf3', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 2, N'Sữa Tắm', 'sed do eiusmod tempor incididunt', 100000, 312, 'https://cdn.tgdd.vn/Products/Images/2444/96026/bhx/-202210260849345390.jpg', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 4, N'Giáo Trình Lịch Sử Đảng', 'consectetur adipiscing elit', 50000, 584, 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lhx6y4ujidtx7b', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 1, N'Giày Thể Thao', 'consectetur adipiscing elit', 60000, 133, 'https://product.hstatic.net/1000341630/product/black_1_64fb683626fe427b8a3acdaf4469f215_master.jpg', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 2, N'Lăn Khử Mùi', 'ut labore et dolore magna aliqua.', 90000, 682, 'https://www.lottemart.vn/media/catalog/product/cache/0x0/4/0/4005900835864.jpg.webp', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 6, N'Ổ Cứng HDD', 'sed do eiusmod tempor incididunt', 80000, 640, 'https://product.hstatic.net/200000722513/product/hdd_seagate_gearvn_f39c761c7dd145eb9864f9e131c2ebdf_1024x1024.jpg', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (1, 3, N'Túi Đựng Tài Liệu', 'consectetur adipiscing elit', 100000, 752, N'https://vppnguyenanh.com/wp-content/uploads/2018/10/Clearbag-A4-Trà-My-17270.jpg', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 10, N'Bánh Quy', 'consectetur adipiscing elit', 80000, 187, 'https://product.hstatic.net/200000397233/product/okie_6db7b5f903ef41208823b482c77c7b70_590934e6b0e547e1ac403726b3957e47_5aa0a81296d04db29799ff16f3d046d5_master.jpg', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 8, N'Thớt', 'sed do eiusmod tempor incididunt', 70000, 973, 'https://namhoatoys.vn/Data/Sites/1/Product/699/288b.png', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 9, N'Khẩu Trang', 'consectetur adipiscing elit', 90000, 318, 'https://product.hstatic.net/200000117085/product/den_sizel_1_e69c2dceb10b4f118e37f293dd5647f2_master.jpg', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 1, N'Dép Tổ Ong', 'ut labore et dolore magna aliqua.', 90000, 952, 'https://down-vn.img.susercontent.com/file/2727c633dc6d296510dee58d61ff5cd9', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 1, N'Áo Ba Lỗ', 'consectetur adipiscing elit', 90000, 128, 'https://img.muji.net/img/item/4550512618683_1260.jpg', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 10, N'Bánh Gạo', 'consectetur adipiscing elit', 50000, 597, 'https://www.lottemart.vn/media/catalog/product/cache/0x0/8/9/8936096670013.jpg.webp', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (2, 6, N'Tản Nhiệt Nước', 'consectetur adipiscing elit', 80000, 877, 'https://phatdatvinhvien.com/upload/product/b8db4cacc32faf0bf75806b8732f3e4d-3311.jpg', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 1, N'Áo Vest', 'Lorem ipsum dolor sit amet', 100000, 588, 'https://4menshop.com/images/thumbs/2022/02/ao-vest-tron-regular-av001-mau-den-16568.JPG', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (4, 8, N'Bộ Dao Kéo', 'ut labore et dolore magna aliqua.', 70000, 546, 'https://cdn.bepkhanhtrang.com/media/2022/01/bo-dao-keo-lam-bep-8-mon-bass-in01-006-0-1448011632.jpg', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 1, N'Áo Sơ Mi', 'ut labore et dolore magna aliqua.', 70000, 415, 'https://product.hstatic.net/1000096703/product/1_d4c95fe0dc8a47e28b0b3d3083498997_master.jpg', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 12, N'Hare Barley', 'sed do eiusmod tempor incididunt', 200000, 532, 'https://robohash.org/quinumquamomnis.png?size=500x500&set=set1', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (3, 3, N'Sổ Tay', 'consectetur adipiscing elit', 90000, 90, 'https://socprinting.vn/wp-content/uploads/2019/08/so-da-cao-cap-tphcm-2-1519991855.jpg', N'Chờ xác thực');
insert into Products (SellerID, CategoryID, ProductName, ProductDescription, ProductPrice, ProductQuantity, ProductPic, ProductStatus) values (5, 8, N'Nồi Cơm Điện', 'sed do eiusmod tempor incididunt', 60000, 864, 'https://bizweb.dktcdn.net/thumb/1024x1024/100/448/192/products/nag0146-1500x1500.jpg?v=1699953583483', N'Chờ xác thực');
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
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus) values (1, 76, '27/03/2023', 1, N'Chưa thanh toán');
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus) values (1, 3, '26/02/2023', 1, N'Chưa thanh toán');
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus) values (1, 57, '23/03/2023', 1, N'Chưa thanh toán');
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus) values (1, 59, '02/01/2023', 1, N'Chưa thanh toán');
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus) values (1, 96, '03/01/2023', 1, N'Chưa thanh toán');
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus) values (1, 95, '19/03/2023', 1, N'Chưa thanh toán');
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus) values (46, 42, '24/03/2024', 1, N'Chưa xác nhận');
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus) values (46, 28, '24/03/2024', 1, N'Chưa xác nhận');
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus) values (46, 5, '24/03/2024', 1, N'Chưa xác nhận');
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus) values (46, 52, '24/03/2024', 1, N'Chưa xác nhận');
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus) values (46, 14, '24/03/2024', 1, N'Chưa xác nhận');
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus) values (46, 69, '24/03/2024', 1, N'Chưa xác nhận');
insert into BillDetails (BillID, ProductID, BillDetailDate, BillQuantity, BillDetailStatus) values (46, 76, '24/03/2024', 1, N'Đã xác nhận');
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