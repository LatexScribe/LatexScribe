CREATE TABLE auth_user
(
    username  VARCHAR(255) PRIMARY KEY NOT NULL,
    password  VARCHAR(255),
    full_name VARCHAR(255),
    email     VARCHAR(255)
);

CREATE TABLE document_tag
(
    id   BIGINT PRIMARY KEY NOT NULL,
    name VARCHAR(255)
);

CREATE TABLE document_template
(
    id                BIGINT PRIMARY KEY NOT NULL,
    name              VARCHAR(255),
    size              BIGINT,
    content           BYTEA,
    template_category VARCHAR(255),
    user_id           VARCHAR(255)
);

CREATE TABLE document
(
    id            BIGINT PRIMARY KEY NOT NULL,
    name          VARCHAR(255),
    size          BIGINT,
    last_modified TIMESTAMP,
    content       BYTEA,
    tag_id        BIGINT,
    user_id       VARCHAR(255),
    template_id   BIGINT
);

ALTER TABLE document
    ADD CONSTRAINT FK_DOCUMENT_TAG_ID FOREIGN KEY (tag_id) REFERENCES document_tag (id);

ALTER TABLE document
    ADD CONSTRAINT FK_DOCUMENT_USER_ID FOREIGN KEY (user_id) REFERENCES auth_user (username);

ALTER TABLE document
    ADD CONSTRAINT FK_DOCUMENT_TEMPLATE_ON_ID FOREIGN KEY (template_id) REFERENCES document_template (id);

ALTER TABLE document_template
    ADD CONSTRAINT FK_DOCUMENT_TEMPLATE_USER_ID  FOREIGN KEY (user_id) REFERENCES auth_user (username);

