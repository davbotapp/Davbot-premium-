<?php
require_once "db.php";

name =_POST['name'];
description =_POST['description'];
file =_FILES['apk_file'];

if (!file ||file['error'] !== UPLOAD_ERR_OK) {
    die("Erreur upload");
}

// Vérifier extension .apk
ext = strtolower(pathinfo(file['name'], PATHINFO_EXTENSION));if (ext !== "apk") 
    die("Seuls les fichiers .apk sont autorisés.");


// Limiter la taille (par ex. max 50 Mo)maxSize = 50 * 1024 * 1024;
if (file['size'] >maxSize) {
    die("Fichier trop volumineux.");
}

// Générer un nom de fichier unique
targetDir = "uploads/";
if (!file_exists(targetDir)) {
    mkdir(targetDir, 0755, true);uniqueName = uniqid() . "." . ext;targetPath = targetDir .uniqueName;

if (!move_uploaded_file(file['tmp_name'],targetPath)) {
    die("Erreur lors du déplacement du fichier.");
}

// Enregistrer dans la base de données
sql = "INSERT INTO apks (name, description, filename, uploaded_at) VALUES (?, ?, ?, NOW())";stmt = pdo->prepare(sql);
stmt->execute([name, description,uniqueName]);

header("Location: index.php");
exit;
?>
