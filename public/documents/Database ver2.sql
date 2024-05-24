drop database SE1829Group6OnlineShop
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
    SellerSignUpName VARCHAR(255),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
go

CREATE TABLE Notifications (
    NotificationID INT identity(1,1) PRIMARY KEY,
    UserID INT,
    NotificationText TEXT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
go
