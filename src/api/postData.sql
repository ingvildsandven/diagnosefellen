

CREATE TABLE publishers (
    publisher_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    logo VARCHAR(255)
);

CREATE TABLE publishers (
    publisher_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    logo VARCHAR(255),
);

INSERT INTO publishers (title, logo)
VALUES ('A-magasinet', '/logos/aftenposten.svg'),
       ('VG', '/logos/vg.png');


INSERT INTO article_types (type_name)
VALUES 
('Artikkel'),
('Kronikk');

CREATE TABLE articles (
  article_id INT AUTO_INCREMENT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date_published DATE,
  subscription BOOLEAN,
  link TEXT UNIQUE,

  publisher_id INT NOT NULL,
  type_id INT NOT NULL,

  -- one image per article (stored inline)
  image_url TEXT,
  image_photographer VARCHAR(255),
  image_alt_text TEXT,

  FOREIGN KEY (publisher_id) REFERENCES publishers(publisher_id),
  FOREIGN KEY (type_id) REFERENCES article_types(type_id)
);


INSERT INTO articles
(title, description, date_published, subscription, link, publisher_id, type_id)
VALUES
(
'ADHD-skeptisk overlege: – Jeg håper ikke altfor mange blir krenket',
'Hun har stilt hundrevis av diagnoser. – Nå får jeg oftere og oftere en dårlig magefølelse, sier barnepsykiater Henriette K. Sandven.',
'2025-02-07',
TRUE,
'https://www.aftenposten.no/amagasinet/i/vgGeA5/psykiater-henriette-k-sandven-ut-mot-adhd-diagnoser',
1,
1
);
