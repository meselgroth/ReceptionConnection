Push-Location (Split-Path $script:MyInvocation.MyCommand.Path)
Start-Process powershell { -new_console Push-Location .\api; dotnet watch run;} 
Start-Process powershell { -new_console Push-Location .\frontend; npm run start;}
