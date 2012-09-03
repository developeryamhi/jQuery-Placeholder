<!DOCTYPE html>
<html dir="ltr" lang="en">
<head>
<title>Placeholder jQuery Plugin</title>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script>
<script src="jquery.placeholder.min.js"></script>
<script>
$(document).ready(function() {
    $(".text-input").placeholder();
    $(".textarea").placeholder();
});
</script>
</head>
<body>

<label for="text1">
    Input:
    <input type="text" name="text1" id="text1" class="text-input" value="Default Value" placeholder="Input Value" />
</label>

<label for="textarea1">
    Textarea:
    <textarea name="textarea1" id="textarea1" class="textarea" placeholder="Textarea Value">Default Value</textarea>
</label>

</body>
</html>