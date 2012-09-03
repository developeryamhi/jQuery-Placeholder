<!DOCTYPE html>
<html dir="ltr" lang="en">
<head>
<title>Placeholder jQuery Plugin</title>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script>
<script src="jquery.placeholder.js"></script>
<script>
$(document).ready(function() {
    $(".text-input").placeholder();
});
</script>
</head>
<body>

<label for="text1">
    Input:
    <input type="text" name="text1" id="text1" class="text-input" value="value is this" placeholder="Value" />
</label>

</body>
</html>