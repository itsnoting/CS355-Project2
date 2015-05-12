use kting;

DROP TABLE IF EXISTS Cart_Item;
DROP TABLE IF EXISTS Scoremore;
DROP TABLE IF EXISTS Employee;
DROP TABLE IF EXISTS Product;
DROP TABLE IF EXISTS Store;


CREATE TABLE Employee(
	EmployeeID INT PRIMARY KEY AUTO_INCREMENT,
	First_Name VARCHAR(10),
	Last_Name VARCHAR(20),
    Employee_Num INT(7),
	Admin bool
    );
    


CREATE TABLE Store (
	StoreID INT AUTO_INCREMENT PRIMARY KEY,
	Address varchar(100),
    Store_Number INT(4)
    );
    
CREATE TABLE Product (
	Brand VARCHAR(20),
	Product_Name VARCHAR(50),
    Price decimal(15,2),
	VSN varchar(12),
	UPC varchar(12) PRIMARY KEY
    );

CREATE TABLE Scoremore(
	OrderID INT PRIMARY KEY AUTO_INCREMENT,
	Date_Ordered DATETIME,
    StoreID INT,
    EmployeeID INT,
    
    FOREIGN KEY (StoreID) REFERENCES Store(StoreID) ON DELETE CASCADE,
	FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID) ON DELETE CASCADE
    );

CREATE TABLE Cart_Item(
	ItemID INT PRIMARY KEY AUTO_INCREMENT,
	OrderID INT,
    UPC VARCHAR(12),
    
    FOREIGN KEY (OrderID) REFERENCES Scoremore(OrderID) ON DELETE CASCADE,
	FOREIGN KEY (UPC) REFERENCES Product(UPC) ON DELETE CASCADE
    );
    
DROP VIEW IF EXISTS Employee_Full;
CREATE ALGORITHM=UNDEFINED DEFINER=`kting`@`localhost` SQL SECURITY DEFINER VIEW `kting`.`Employee_Full` AS select `e`.`First_Name` AS `First_Name`,`e`.`Last_Name` AS `Last_Name`,`e`.`Employee_Num` AS `Employee_Num`,`e`.`EmployeeID` AS `EmployeeID`,ifnull(`Average_Employee_Sales`(`e`.`EmployeeID`),0) AS `Average`,ifnull(`Total_Employee_Products`(`e`.`EmployeeID`),0) AS `Total_Products` from (((`kting`.`Employee` `e` left join `kting`.`Scoremore` `s` on((`s`.`EmployeeID` = `e`.`EmployeeID`))) left join `kting`.`Cart_Item` `c` on((`c`.`OrderID` = `s`.`OrderID`))) left join `kting`.`Product` `p` on((`p`.`UPC` = `c`.`UPC`))) group by `e`.`EmployeeID`;

DROP VIEW IF EXISTS Order_Full;
CREATE ALGORITHM=UNDEFINED DEFINER=`kting`@`localhost` SQL SECURITY DEFINER VIEW `kting`.`Order_Full` AS select `s`.`OrderID` AS `OrderID`,`s`.`Date_Ordered` AS `Date_Ordered`,`e`.`First_Name` AS `First_Name`,`e`.`Last_Name` AS `Last_Name`,`st`.`Store_Number` AS `Store_Number`,sum(`p`.`Price`) AS `Total_Price`,count(`ci`.`UPC`) AS `Total_Products` from ((((`kting`.`Scoremore` `s` join `kting`.`Employee` `e` on((`e`.`EmployeeID` = `s`.`EmployeeID`))) join `kting`.`Store` `st` on((`st`.`StoreID` = `s`.`StoreID`))) join `kting`.`Cart_Item` `ci` on((`ci`.`OrderID` = `s`.`OrderID`))) join `kting`.`Product` `p` on((`ci`.`UPC` = `p`.`UPC`))) group by `s`.`OrderID`;

DROP VIEW IF EXISTS Store_Full;
CREATE ALGORITHM=UNDEFINED DEFINER=`kting`@`localhost` SQL SECURITY DEFINER VIEW `kting`.`Store_Full` AS select `st`.`StoreID` AS `StoreID`,`st`.`Store_Number` AS `Store_Number`,`st`.`Address` AS `Address`,ifnull(count(`s`.`OrderID`),0) AS `Total_Orders`,ifnull(`Store_Average_Sales`(`st`.`StoreID`),0) AS `Average_Sales` from (((`kting`.`Store` `st` left join `kting`.`Scoremore` `s` on((`s`.`StoreID` = `st`.`StoreID`))) left join `kting`.`Cart_Item` `ci` on((`ci`.`OrderID` = `s`.`OrderID`))) left join `kting`.`Product` `p` on((`p`.`UPC` = `ci`.`UPC`))) group by `st`.`StoreID`;

DROP PROCEDURE IF EXISTS Employee_Info;
DELIMITER $$
CREATE DEFINER=`kting`@`localhost` PROCEDURE `Employee_Info`(_employee_id INT)
BEGIN 
SELECT e.First_Name,e.Last_Name, e.Employee_Num, e.EmployeeID, IFNULL(Average_Employee_Sales(_employee_id), 0) as Average

	FROM Employee as e 
	RIGHT JOIN Scoremore as s ON s.EmployeeID = e.EmployeeID
	JOIN Cart_Item as c ON c.OrderID=s.OrderID
    JOIN Product as p ON p.UPC=c.UPC
    WHERE e.EmployeeID = _employee_id
    GROUP BY  e.Employee_Num;
END$$
DELIMITER ;


DROP PROCEDURE IF EXISTS Cart;
DELIMITER $$
CREATE DEFINER=`kting`@`localhost` PROCEDURE `Cart`(_order_id int)
BEGIN
SELECT ci.ItemID, p.Brand, p.Product_Name, p.Price, p.UPC, s.OrderID FROM Cart_Item as ci
	join Scoremore as s on ci.OrderID = s.OrderID 
    join Product as p on p.UPC=ci.UPC
    WHERE ci.OrderID = _order_id;
END$$
DELIMITER ;

DROP FUNCTION IF EXISTS Average_Employee_Sales;
DELIMITER $$
CREATE DEFINER=`kting`@`localhost` FUNCTION `Average_Employee_Sales`(_employee_id INT) RETURNS decimal(15,2)
BEGIN
DECLARE AvgSales decimal(15,2);
SELECT IFNULL(AVG(p.Price), 0) INTO AvgSales 
	FROM Employee as e 
	RIGHT JOIN Scoremore as s ON s.EmployeeID = e.EmployeeID
	JOIN Cart_Item as c ON c.OrderID=s.OrderID
    JOIN Product as p ON p.UPC=c.UPC
    WHERE e.EmployeeID = _employee_id
    GROUP BY  e.Employee_Num;
RETURN AvgSales;
END$$
DELIMITER ;

DROP FUNCTION IF EXISTS Store_Average_Sales;
DELIMITER $$
CREATE DEFINER=`kting`@`localhost` FUNCTION `Store_Average_Sales`(_store_id INT) RETURNS decimal(15,2)
BEGIN
DECLARE Average_Sales DECIMAL(15,2);
	SELECT IFNULL(avg(p.Price),0) into Average_Sales FROM
	Store as st LEFT JOIN Scoremore as s ON s.StoreID = st.StoreID
	LEFT JOIN Cart_Item as ci on ci.OrderID=s.OrderID
	LEFT JOIN Product as p ON p.UPC=ci.UPC
    WHERE st.StoreID = _store_id
	GROUP BY  st.StoreID;
    RETURN Average_Sales;
end$$
DELIMITER ;

DROP FUNCTION IF EXISTS Total_Employee_Products;
DELIMITER $$
CREATE DEFINER=`kting`@`localhost` FUNCTION `Total_Employee_Products`(_employee_id INT) RETURNS int(11)
begin
DECLARE TotalProd INT;
SELECT IFNULL(COUNT(p.UPC),0) INTO TotalProd
	FROM Employee as e
    RIGHT JOIN Scoremore as s on e.EmployeeID=s.EmployeeID
    JOIN Cart_Item as c on c.OrderID = s.OrderID
    JOIN Product as p on p.UPC=c.UPC
    WHERE e.EmployeeID= _employee_id
    GROUP BY e.Employee_Num;
RETURN TotalProd;
END$$
DELIMITER ;

SELECT * FROM Employee;
SELECT * FROM Store;
SELECT * FROM Scoremore;
SELECT * FROM Cart_Item;


    
INSERT INTO Store (Address, Store_Number) VALUES ("26591 Carl Boyer Drive Santa Clarita, CA, 91350", 1047);
INSERT INTO Store (Address, Store_Number) VALUES ("401 Kenilworth Way Petaluma, CA 94954", 1048);
INSERT INTO Store (Address, Store_Number) VALUES ("1975 Cleveland Avenue Santa Rosa, CA, 95401", 1049);

INSERT INTO Employee (First_Name, Last_Name, Employee_Num, Admin) VALUES ("Kevin", "Ting", 323852, true);
INSERT INTO Employee (First_Name, Last_Name, Employee_Num, Admin) VALUES ("Michael", "Haderman", 323853, true);
INSERT INTO Employee (First_Name, Last_Name, Employee_Num, Admin) VALUES ("Mackenzie", "Larson", 323854, false);
INSERT INTO Employee (First_Name, Last_Name, Employee_Num, Admin) VALUES ("Bria", "Gabor", 323855, false);
INSERT INTO Employee (First_Name, Last_Name, Employee_Num, Admin) VALUES ("Mahesh", "Gautam", 323856, false);

INSERT INTO Product VALUES ("Nike",	"Elite Basketball",	49.99,	"104984-001", "800943889900");
INSERT INTO Product VALUES ('Cutters', 'X-40 C-TACK Revolution', 44.99, 'ISO-9002', '844018021066');
INSERT INTO Product VALUES ('Nike', 'Mercurial Vapor X', 200.00, '648553-016', '887231218981');
INSERT INTO Product VALUES ('Adidas', 'Predator Instinct', 250.00, 'M17642', '8873814215');
INSERT INTO Product VALUES ('Under Armour', 'Highlight MC', 119.99, '1246123-011', '888284331566');

INSERT INTO Scoremore (Date_Ordered, EmployeeID, StoreID) VALUES (current_timestamp, 1, 1);
INSERT INTO Scoremore (Date_Ordered, EmployeeID, StoreID) VALUES (current_timestamp, 2, 2);
INSERT INTO Scoremore (Date_Ordered, EmployeeID, StoreID) VALUES (current_timestamp, 3, 3);

INSERT INTO Cart_Item (OrderID, UPC) VALUES (1, "800943889900");
INSERT INTO Cart_Item (OrderID, UPC) VALUES (1, '887231218981');
INSERT INTO Cart_Item (OrderID, UPC) VALUES (2, '844018021066');
INSERT INTO Cart_Item (OrderID, UPC) VALUES (3, '844018021066');




