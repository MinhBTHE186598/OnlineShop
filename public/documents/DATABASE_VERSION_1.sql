CREATE TABLE Category (
    CategoryID INT identity(1,1) PRIMARY KEY,
    CategoryName NVARCHAR(255)
);

CREATE TABLE Product (
    ProductID int identity(1,1) PRIMARY KEY,
    ProductName NVARCHAR(255),
    CategoryID INT,
    ProductPic NVARCHAR(255),
    ProductPrice DECIMAL(10, 2),
    ProductQuantity INT,
    isWhitelisted BIT,
    ProductDescription TEXT,
    FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID)
);
CREATE TABLE [User] (
    UserID INT identity(1,1) PRIMARY KEY,
    UserAccountName NVARCHAR(255),
    UserPassword NVARCHAR(255),
    UserLastName NVARCHAR(255),
    UserFirstName NVARCHAR(255),
    UserEmail NVARCHAR(255),
    UserAddress NVARCHAR(255),
    UserPhone NVARCHAR(50),
    UserPFP NVARCHAR(255)
);

CREATE TABLE Seller (
    SellerID INT identity(1,1) PRIMARY KEY,
    UserID INT,
    FOREIGN KEY (UserID) REFERENCES [User](UserID)
);

CREATE TABLE Admin (
    AdminID INT identity(1,1) PRIMARY KEY,
    UserID INT,
    FOREIGN KEY (UserID) REFERENCES [User](UserID)
);

CREATE TABLE SellManager (
    SellManagerID INT identity(1,1) PRIMARY KEY,
    UserID INT,
    FOREIGN KEY (UserID) REFERENCES [User](UserID)
);

CREATE TABLE Review (
    ReviewID INT identity(1,1) PRIMARY KEY,
    UserID INT,
    ProductID INT,
    ReviewText TEXT,
    ReviewStar INT,
    ReviewDate DATE,
    FOREIGN KEY (UserID) REFERENCES [User](UserID),
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);

CREATE TABLE SellerReview (
    SellReviewID INT identity(1,1) PRIMARY KEY,
    UserID INT,
    SellerID INT,
    SellReviewText TEXT,
    SellReviewStar INT,
    SellReviewDate DATE,
    FOREIGN KEY (UserID) REFERENCES [User](UserID),
    FOREIGN KEY (SellerID) REFERENCES Seller(SellerID)
);

CREATE TABLE Bill (
    BillID INT identity(1,1) PRIMARY KEY,
    UserID INT,
    SellerID INT,
    BillDate DATE,
    Status NVARCHAR(50),
    FOREIGN KEY (UserID) REFERENCES [User](UserID),
    FOREIGN KEY (SellerID) REFERENCES Seller(SellerID)
);

CREATE TABLE BillDetail (
    BillDetailID INT identity(1,1) PRIMARY KEY,
    BillID INT,
    ProductID INT,
    BillQuantity INT,
    FOREIGN KEY (BillID) REFERENCES Bill(BillID),
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);

CREATE TABLE Whitelist (
    WhitelistID INT identity(1,1) PRIMARY KEY,
    SellManagerID INT,
    SellerID INT,
    ProductID INT,
    FOREIGN KEY (SellManagerID) REFERENCES SellManager(SellManagerID),
    FOREIGN KEY (SellerID) REFERENCES Seller(SellerID),
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);

