<?php
require_once "db.php";

id = intval(_GET['id']);
stmt =pdo->prepare("SELECT * FROM apks WHERE id = ?");
stmt->execute([id]);
apk =stmt->fetch(PDO::FETCH_ASSOC);

if (!apk) 
    die("APK non trouvé.");filepath = "uploads/" . apk['filename'];
if (!file_exists(filepath)) {
    die("Fichier introuvable.");
}

// Envoyer les headers pour forcer le téléchargement
header('Content-Description: File Transfer');header('Content-Type: application/vnd.android.package-archive');
header('Content-Disposition: attachment; filename="' . basename(apk['filename']) . '"');
header('Expires: 0');
header('Cache-Control: must-revalidate');
header('Content-Length: ' . filesize(filepath));
readfile($filepath);
exit;
?>
