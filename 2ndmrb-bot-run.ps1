# ------------------------------------------

# AUTHOR: JAMES AMBROSE
# FORMER J4 LEAD

# ------------------------------------------

$jsonFileName = "config-2ndmrb.json"
$mrbDockerImageName = "2ndmrbbot"
$mrbToken =  Read-Host "Please Enter 2nd MRB Token"

$jsonfile = "{
     `"personalGroupID`": `"656369822719803421`",
     `"recruiterGroupID`": `"682778069651554396`",
     `"welcomeChannelID`" : `"656584497503928330`",
     `"leaveChannelID`" : `"656371500412043275`",
     `"banterChannelID`" : `"656668182211330068`",
     `"clanChannelID`" : `"718168964160815215`",
     `"botAPIToken`" : `"$mrbToken`" 
}"


if (Test-Path $jsonFileName) 
{
  Write-Host "Old Json File Detected... Removing $jsonFileName"
  Remove-Item $jsonFileName
}

Write-Host "Generating New JSON File: $jsonFileName"
Out-File -FilePath .\"$jsonFileName" -InputObject $jsonFile -Encoding ascii


Write-Host "Building and Running Local Docker Image: $mrbDockerImageName"
docker rm $mrbDockerImageName --force
docker build -t $mrbDockerImageName .
docker run -d --name $mrbDockerImageName --restart unless-stopped $mrbDockerImageName