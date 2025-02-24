show databases;
create database bytequick;
use bytequick;
show databases;

create table RESTAURANT(RESTAURANT_ID VARCHAR(50) PRIMARY KEY, NAME VARCHAR(50), CONTACT numeric(10), MENU JSON, ADDRESS JSON);

INSERT INTO RESTAURANT (RESTAURANT_ID, NAME, CONTACT, MENU) VALUES
('sahu123', 'sahu ke Ande', 1234567890, 
'{
    "Main Course": {
        "paneer": "180", 
        "chicken": "200", 
        "sabji": "180", 
        "bhindi": "150"
    }, 
    "Starter": {
        "tikka": "200", 
        "maggi": "50", 
        "choumin": "50", 
        "paneer": "150"
    }
}');

INSERT INTO RESTAURANT (RESTAURANT_ID, NAME, CONTACT, MENU) VALUES
('spice123', 'Spice Symphony', 1234567890, '{"Main Course":{"biryani":"250","dal":"150","naan":"80"},"Starter":{"samosa":"60","pakkora":"70"}}'),
('cafe456', 'Cafe Delight', 1234567891, '{"Main Course":{"pasta":"220","pizza":"300"},"Dessert":{"cake":"150","icecream":"100"}}'),
('tandoor789', 'Tandoori Nights', 1234567890, '{"Main Course":{"tandoori chicken":"350","paneer tikka":"250"},"Starter":{"chicken wings":"150","spring rolls":"90"}}'),
('italian321', 'Italian Bistro', 1234567890, '{"Main Course":{"lasagna":"400","risotto":"300"},"Dessert":{"tiramisù":"200","panna cotta":"180"}}'),
('burger234', 'Burger Barn', 1234567890, '{"Main Course":{"cheeseburger":"150","veggieburger":"120"},"Side":{"fries":"80","onion rings":"90"}}');

UPDATE RESTAURANT SET CONTACT = 1234567890 WHERE RESTAURANT_ID = 'sahu123';
UPDATE RESTAURANT SET CONTACT = 1234567890 WHERE RESTAURANT_ID = 'spice123';
UPDATE RESTAURANT SET CONTACT = 1234567890 WHERE RESTAURANT_ID = 'cafe456';
UPDATE RESTAURANT SET CONTACT = 1234567890 WHERE RESTAURANT_ID = 'tandoor789';
UPDATE RESTAURANT SET CONTACT = 1234567890 WHERE RESTAURANT_ID = 'italian321';
UPDATE RESTAURANT SET CONTACT = 1234567890 WHERE RESTAURANT_ID = 'burger234';

-- data fillup upto there-- ;

SELECT * FROM RESTAURANT;
commit;


