<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Upload APK</title>
</head>
<body>

<h2>Uploader un APK</h2>
<form id="uploadForm">
  <input type="text" placeholder="Nom de l'application" id="name" required><br>
  <input type="text" placeholder="Description" id="desc" required><br>
  <input type="url" placeholder="URL de l'icône" id="icon" required><br>
  <input type="file" id="apkFile" accept=".apk" required><br>
  <button type="submit">Uploader</button>
</form>

<script>
document.getElementById('uploadForm').addEventListener('submit', async e=>{
  e.preventDefault();
  alert("Sur GitHub Actions, le fichier sera envoyé dans le repo automatiquement !");
});
</script>
</body>
</html>
