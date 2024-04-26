# Projet Forum

## Membres :
 - Quentin FLAGEOLLET
 - Stanislas JEANGEY
 - Antonin ROBERT

## Ressources :

### Connexion sur le site :

**Tous les mots de passes des administrateur sont :** `admin`  
**Tous les mots de passes des utilisateurs sont :** `user`  
Un utilisateur `admin:admin` est crée par défaut et dans la route de génération de données.  
Pour les autres utilisateurs, ce sont leur login qui est affiché dans l'application ou vous pouvez les récupérer avec la route `GET /api/users`

### Lien du projet :  
**Lien vers l'appli :** [http://localhost:3000/](http://localhost:3000/)  
**Lien vers adminer :** [http://localhost:8080/](http://localhost:8080/)

### Requete sur l'api :
Vous pourrez retrouver un fichier `Insomnia_XXXX-XX-XX.json` à la racine du projet qui contient les requêtes pour l'api.  
Vous trouverez dans celui-ci une requete paramétrable dans le body `POST /api/generate` qui permet de générer des données aléatoires pour la base de données si celle déjà inséré ne vous convienne pas.
#### POST /api/generate
```json
{
  "nbForumMin":...,
  "nbForumMax":...,
  "nbSujetMin":...,
  "nbSujetMax":...,
  "nbMessageMin":...,
  "nbMessageMax":...,
  "nbUser":...,
  "nbAdmin":...
}
```

## Setup for dev :

Après le git clone du projet, exécuter les commandes suivantes pour lancer le projet en mode développement (attention les port 3306 et 8080 doivent être libres) :

```bash
docker compose up -d db adminer
```
```bash
npm i
```
```bash
npm run dev
```

## Setup for prod :

Après le git clone du projet, exécuter la commande suivante pour lancer le projet en mode production (attention les port 3306 et 8080 doivent être libres) :

```bash
docker compose up -d 
```

La commande peut être longue car le conteneur doit télécharger les dépendances nécessaires pour le projet.  
Vous pouvez retirer l'option `-d` pour voir les logs du conteneur et savoir quand le serveur sera accessible.


## Informations de connexion BD :

- **Host** : `db` pour les conteneurs ou `localhost` pour la machine hôte
- **Port** : `3306`
- **User** : `user`
- **Password** : `password`
- **Database** : `forum`

### Importation de la base de données dans PHPStorm

```
#DataSourceSettings#
#LocalDataSource: base forum
#BEGIN#
<data-source source="LOCAL" name="base forum" uu[ID]="643a87c9-a69b-48f5-8b55-89793eec0563"><database-info product="MariaDB" version="11.3.2-MariaDB-1:11.3.2+maria~ubu2204" jdbc-version="4.2" driver-name="MariaDB Connector/J" driver-version="3.0.7" dbms="MARIADB" exact-version="11.3.2" exact-driver-version="3.0"><extra-name-characters>#@</extra-name-characters><[ID]entifier-quote-string>`</[ID]entifier-quote-string></database-info><case-sensitivity plain-[ID]entifiers="mixed" quoted-[ID]entifiers="mixed"/><driver-ref>mariadb</driver-ref><synchronize>true</synchronize><jdbc-driver>org.mariadb.jdbc.Driver</jdbc-driver><jdbc-url>jdbc:mariadb://localhost:3306/forum</jdbc-url><secret-storage>master_key</secret-storage><user-name>user</user-name><schema-mapping><introspection-scope><node kind="schema" qname="@"/></introspection-scope></schema-mapping><working-dir>$ProjectFileDir$</working-dir></data-source>
#END#
```

## Rapport 

### Les choix techniques :

Comme demandé dans le sujet, nous avons utilisé `NuxtJS` pour l'application et pour l'api. Pour la partie interface, nous avons utilisé `Vuetify`. Pour notifier l'utilisateur en cas d'information ou d'erreurs, nous avons utilisé la librairie `vue3-toastify`.

### Les fonctionnalités :

Quand vous arrivez sur l'application, vous accédez à la liste des forums. En cliquant sur un forum, cela vous conduit vers la page qui liste les sujets de ce forum. En cliquant sur un sujet, cela vous conduit vers la page qui liste les messages de ce sujet. Sur toute l'application, vous pourrez retrouver une barre de navigation qui vous permet de revenir à la page d'accueil, de revenir en arrière, de vous connecter/déconnecter ou encore de vous inscrire.


### Les difficultés rencontrées :

Nous avons principalement rencontré des problèmes au début du projet avec le connecteur à la base de données. Mais une fois le nouveau connecteur installé, nous n'avons pas rencontré de problème majeur. Nous avons eu quelques difficultés à mettre en place la session et l'interconnexion des informations de la session entre les différentes pages afin de tout synchroniser. À part cela, le reste de l'application s'est développé tranquillement.