# ------------------------------------------

# AUTHOR: JAMES AMBROSE
# FORMER J4 LEAD

# ------------------------------------------

$jsonFileName = "config-2ndmrb.json"

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
  Remove-Item $jsonFileName
}

Write-Host " Generating JSON File: $jsonFileName"
Out-File -FilePath .\"$jsonFileName" -InputObject $jsonFile