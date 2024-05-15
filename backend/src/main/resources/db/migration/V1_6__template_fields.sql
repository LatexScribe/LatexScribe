ALTER TABLE document_template DROP COLUMN user_id;
ALTER TABLE document_template ADD COLUMN code_name VARCHAR(255);
ALTER TABLE document_template ADD COLUMN author VARCHAR(255);
ALTER TABLE document_template ADD COLUMN description VARCHAR(255);
ALTER TABLE document_template ADD COLUMN license VARCHAR(255);