<?php
require_once "db.php";

// Récupérer la liste des APK
stmt =pdo->query("SELECT * FROM apks ORDER BY uploaded_at DESC");
apks =stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html><html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>APK Store</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>APK Store</h1>

  <h2>Publier une application</h2>
  <form action="upload.php" method="post" enctype="multipart/form-data">
    <input type="text" name="name" placeholder="Nom de l’application" required><br>
    <textarea name="description" placeholder="Description courte"></textarea><br>
    <input type="file" name="apk_file" accept=".apk" required><br>
    <button type="submit">Uploader</button>
  </form>

  <h2>Applications disponibles</h2>
  <ul>
    <?php foreach (apks asapk): ?>
      <li>
        <strong><?= htmlspecialchars(apk['name']) ?></strong>
        <br>
        <?= htmlspecialchars(apk['description']) ?><br>
        <a href="download.php?id=<?= apk['id'] ?>">Télécharger APK</a>
        <em>(<?= htmlspecialchars(apk['filename']) ?>)</em>
      </li>
    <?php endforeach; ?>
  </ul>
</body>
</html>
