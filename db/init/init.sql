USE forum;

CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    login VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS forums (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    is_locked BOOLEAN NOT NULL DEFAULT FALSE,
    author_id INT,
    FOREIGN KEY (author_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS sujets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    date DATETIME NOT NULL,
    author_id INT,
    forum_id INT,
    FOREIGN KEY (author_id) REFERENCES users(id),
    FOREIGN KEY (forum_id) REFERENCES forums(id)
);

CREATE TABLE IF NOT EXISTS messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    content TEXT NOT NULL,
    date DATETIME NOT NULL,
    author_id INT,
    sujet_id INT,
    FOREIGN KEY (author_id) REFERENCES users(id),
    FOREIGN KEY (sujet_id) REFERENCES sujets(id)
);


# -- Insertion des utilisateurs
# INSERT INTO users (login, password, admin) VALUES
#                                                 ('user', '$2b$10$J5SmCON7UkTyyv4Qq.8tmOWKYeuPJQ.HPO0xEiazhp0yhSRImzZu6', FALSE),
#                                                 ('admin', '$2b$10$9xOJiLAXiAjigbS95RjS8OYfDIeccFeGqNbnLs2clk6z4tak0A5Ly', TRUE);
#
# -- Insertion des forums
# INSERT INTO forums (title, is_locked, author_id) VALUES
#                                                     ('Forum 1', FALSE, 1),
#                                                     ('Forum 2', FALSE, 1),
#                                                     ('Forum 3', FALSE, 1),
#                                                     ('Forum 4', FALSE, 1);
#
# -- Insertion des sujets dans le forum 1
# INSERT INTO sujets (title, date, author_id, forum_id) VALUES
#                                                          ('Présentation des nouveaux membres', '2024-03-27 10:30:00', 1, 1),
#                                                          ('Discussion générale sur la programmation', '2024-03-27 10:31:00', 1, 1),
#                                                          ('Problèmes avec le langage Python', '2024-03-27 10:32:00', 1, 1),
#                                                          ('Partage de ressources en développement web', '2024-03-27 10:33:00', 1, 1),
#                                                          ('Questions sur les algorithmes', '2024-03-27 10:34:00', 1, 1),
#                                                          ('Actualités technologiques', '2024-03-27 10:35:00', 1, 1),
#                                                          ('Feedback sur les dernières versions de logiciels', '2024-03-27 10:36:00', 1, 1),
#                                                          ('Revue de code entre développeurs', '2024-03-27 10:37:00', 1, 1),
#                                                          ('Projets open source', '2024-03-27 10:38:00', 1, 1),
#                                                          ('Idées de startups', '2024-03-27 10:39:00', 1, 1),
#                                                          ('Formation en ligne recommandée', '2024-03-27 10:40:00', 1, 1),
#                                                          ('Discussion sur l intelligence artificielle', '2024-03-27 10:41:00', 1, 1),
#                                                          ('Débats sur les frameworks JavaScript', '2024-03-27 10:42:00', 1, 1),
#                                                          ('Tutoriels pour débutants en programmation', '2024-03-27 10:43:00', 1, 1),
#                                                          ('Dépannage informatique', '2024-03-27 10:44:00', 1, 1),
#                                                          ('Conseils pour la gestion de projet', '2024-03-27 10:45:00', 1, 1),
#                                                          ('Recrutement de développeurs', '2024-03-27 10:46:00', 1, 1),
#                                                          ('Gestion de bases de données', '2024-03-27 10:47:00', 1, 1),
#                                                          ('Sécurité informatique', '2024-03-27 10:48:00', 1, 1),
#                                                          ('Présentation de langages de programmation alternatifs', '2024-03-27 10:49:00', 1, 1),
#                                                          ('Discussion sur les certifications en informatique', '2024-03-27 10:50:00', 1, 1);
# -- Insertion des messages dans le sujet 1
# INSERT INTO messages (content, date, author_id, sujet_id) VALUES
#                                                              ('Bienvenue à tous les nouveaux membres ! N hésitez pas à vous présenter ici.', '2024-03-27 10:01:00', 1, 1),
#                                                              ('Bonjour tout le monde, je suis ravi de rejoindre cette communauté.', '2024-03-27 10:02:00', 1, 1),
#                                                              ('Salut, je suis passionné par la programmation depuis des années.', '2024-03-27 10:03:00', 1, 1),
#                                                              ('Hello, je suis un développeur Python et je suis là pour aider.', '2024-03-27 10:04:00', 1, 1),
#                                                              ('Bonjour à tous, avez-vous des recommandations pour apprendre le développement web ?', '2024-03-27 10:06:00', 1, 1),
#                                                              ('Salut, j ai un problème avec un algorithme de tri, pouvez-vous m aider ?', '2024-03-27 10:07:00', 1, 1),
#                                                              ('Bonjour, quelles sont les dernières nouvelles dans le monde de la technologie ?', '2024-03-27 10:08:00', 1, 1),
#                                                              ('Hello, je viens de tester la nouvelle version de Visual Studio Code, et vous ?', '2024-03-27 10:09:00', 1, 1),
#                                                              ('Salut à tous, qui est partant pour une revue de code ?', '2024-03-27 10:10:00', 1, 1),
#                                                              ('Bonjour, je cherche des projets open source auxquels contribuer.', '2024-03-27 10:11:00', 1, 1),
#                                                              ('Hello, avez-vous des idées de startups innovantes ?', '2024-03-27 10:12:00', 1, 1),
#                                                              ('Bonjour, je cherche une bonne formation en ligne sur le développement Android.', '2024-03-27 10:13:00', 1, 1),
#                                                              ('Salut, quelle est votre opinion sur l intelligence artificielle éthique ?', '2024-03-27 10:14:00', 1, 1),
#                                                              ('Hello, quel est votre framework JavaScript préféré et pourquoi ?', '2024-03-27 10:15:00', 1, 1),
#                                                              ('Bonjour à tous, je cherche des tutoriels pour apprendre le langage C.', '2024-03-27 10:16:00', 1, 1),
#                                                              ('Salut, j ai des problèmes avec mon ordinateur, quelqu un peut m aider ?', '2024-03-27 10:17:00', 1, 1),
#                                                              ('Hello, je cherche des conseils pour gérer efficacement un projet de développement.', '2024-03-27 10:18:00', 1, 1),
#                                                              ('Bonjour, une entreprise cherche des développeurs Java, des intéressés ?', '2024-03-27 10:19:00', 1, 1),
#                                                              ('Salut à tous, avez-vous des recommandations pour la gestion de bases de données NoSQL ?', '2024-03-27 10:20:00', 1, 1),
#                                                              ('Hello, quels sont les meilleurs moyens de sécuriser un réseau informatique ?', '2024-03-27 10:22:00', 1, 1),
#                                                              ('Bonjour, connaissez-vous des langages de programmation alternatifs prometteurs ?', '2024-03-27 10:23:00', 1, 1),
#                                                              ('Salut, que pensez-vous des certifications AWS ?', '2024-03-27 10:24:00', 1, 1);
#
