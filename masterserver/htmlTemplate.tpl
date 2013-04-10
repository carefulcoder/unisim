<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
      "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>

<title>Unisim Server List</title>
<link href="style.css" rel="stylesheet" type="text/css"/>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

</head>

<body>

<h1>Welcome to the UniSim server list!</h1>

{{#empty}}
<p>There are no servers registered to the server at the moment.</p>
{{/empty}}

{{#servers.length}}

<p>Below is a list of all running UniSim servers that have registered to have their server list</p>

<table>
    <tr>
        <th>Server Name</th>
        <th>Clients</th>
        <th>Link</th>
    </tr>
    {{#servers}}
        <tr>
            <td>{{name}}</td>
            <td>{{clients}}</td>
            <td><a href="http&#58;&#47;&#47;{{address}}">Play Now!</a></td>
        </tr>
    {{/servers}}
</table>
{{/servers.length}}

</body>

</html>