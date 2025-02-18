@echo off
set ARCHIVE_PATH=project.tar.gz
set ENV_PATH=.env.development
set SERVICE_NAME=AonyxBuddyWidget

echo Deploying using %ENV_PATH% to debian based machine. Please ensure node is installed in your target machine.

echo Loading %ENV_PATH% file...
setlocal
FOR /F "tokens=*" %%i in (%ENV_PATH%) do SET %%i

echo Packing...
git archive --format=tar.gz -o %ARCHIVE_PATH% HEAD

echo Sending package...
scp -r %ARCHIVE_PATH% %SSH_USER%@%SSH_HOST%:%REMOTE_PROJECT_DIR%/%ARCHIVE_PATH%
del %ARCHIVE_PATH%

echo Stopping service...
ssh %SSH_USER%@%SSH_HOST% "systemctl stop %SERVICE_NAME%.service || echo 'Stopping service failed...'"

echo Unpacking...
ssh %SSH_USER%@%SSH_HOST% "cd %REMOTE_PROJECT_DIR%; tar -xzf %ARCHIVE_PATH% -C .; rm %ARCHIVE_PATH%; chmod +x ./scripts/start.sh"
ssh %SSH_USER%@%SSH_HOST% "cd %REMOTE_PROJECT_DIR%; dos2unix ./**/*.* || echo 'dos2unix may not be installed or not working properly'"

echo Updating and starting service...
ssh %SSH_USER%@%SSH_HOST% "cp %REMOTE_PROJECT_DIR%/scripts/Template.service /etc/systemd/system/%SERVICE_NAME%.service; sed -i 's|^%PROJECT_NAME^%|%SERVICE_NAME%|g' /etc/systemd/system/%SERVICE_NAME%.service; sed -i 's|^%PROJECT_DIR^%|%REMOTE_PROJECT_DIR%|g' /etc/systemd/system/%SERVICE_NAME%.service; "
ssh %SSH_USER%@%SSH_HOST% "systemctl enable %SERVICE_NAME%.service || echo 'Enabling service failed...'"
ssh %SSH_USER%@%SSH_HOST% "systemctl start %SERVICE_NAME%.service || echo 'Starting service failed...'"

echo Finished.
