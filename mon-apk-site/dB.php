<?php
host = "localhost";dbname = "apk_db";
user = "ton_user";pass = "ton_mdp";

try {
    pdo = new PDO("mysql:host=host;dbname=dbname;charset=utf8",user, pass);pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception e) 
    die("Erreur de connexion : " .e->getMessage());
}
?>
