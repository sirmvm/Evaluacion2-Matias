CREATE TABLE IF NOT EXISTS notebook (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name_computer VARCHAR(255) NOT NULL,
	mark VARCHAR(255) NOT NULL
	
);
INSERT INTO notebook (name_computer, mark) VALUES (
	"SuperComputador 2022", "Lenovo"
);