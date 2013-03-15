<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
      "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>

<title>Unisim Server List</title>

</head>

<body>

<h1>Welcome to the UniSim server list!</h1>

<p>Below is a list of all running UniSim servers that have registered to have their server list</p>

<table>
    {{#servers}}
        <tr>
            <th>Server Name</th>
            <th>Clients</th>
            <th>Link</th>
        </tr>
        <tr>
            <td>{{name}}</td>
            <td>{{clients}}&#47;{{maxClients}}</td>
            <td><a href="http&#58;&#47;&#47;{{address}}">Play Now!</a></td>
        </tr>
    {{/servers}}
<table>

</body>

</html>