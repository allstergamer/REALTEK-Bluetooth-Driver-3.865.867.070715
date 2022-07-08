# REALTEK PCIE Wireless LAN and Bluetooth Driver and Utility
that's the driver for the REALTEK PCIE Wireless LAN and Bluetooth Driver and Utility


# about the driver:
<BR>
Name=REALTEK Bluetooth Driver<BR>
Version=3.865.867.070715<BR><BR>

[Bluetooth_Driver]
<br>
TitleName=REALTEK PCIE Wireless LAN Driver<br>
TitleName_BT=REALTEK Bluetooth Driver<br>
TitleName_WithBT=REALTEK PCIE Wireless LAN and Bluetooth Driver<br>
<br>
BT_InstallTitle = REALTEK Bluetooth<br>
BT_TARGETDIR = REALTEK\Realtek Bluetooth <br>
<br>
<br>
[Install]<br>
UIPackage=Bluetooth_Utility<br>
DriverPackage=Bluetooth_Driver<br>
Installhotfix=0<br>
InstallTCPReg=0<br>
InstallCiscoEAP=0<br>
InstallEzSharing=0<br>
InstallXPTWOPORT=0<br>
InstallSelectedSuspend=0<br>
InstallRealtekWLAN=0<br>
InstallRealtekBT=1<br>
FeatureTree=0<br>
InstallShield_Contact=nicfae@realtek.com.tw<br>
InstallShield_Version=1041.1038.1040.220124<br>
<br><br>


# read isconfig.ini for more informations
## looks like it has WiFi included but isn't activ
