<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="index.css">
  <title>Document</title>
</head>
<body>
  <?php
    $globalCoords = [
      [80, 30],
      [150, 60],
      [230, 90],
      [290, 120],
      [350, 140]
    ]
  ?>
  <div id="root"></div>
<script type="text/javascript">var globalCoords = <?php echo json_encode($globalCoords); ?></script>
  <script type="text/javascript" src="index.js"></script>
</body>
</html>