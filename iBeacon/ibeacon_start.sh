#!/bin/sh
. ./ibeacon.conf
echo "Launching virtual iBeacon..."
sudo hciconfig $BLUETOOTH_DEVICE up
sudo hciconfig $BLUETOOTH_DEVICE noleadv
sudo hciconfig $BLUETOOTH_DEVICE leadv 0
sudo hcitool -i hci0 cmd 0x08 0x0008 1E 02 01 1A 1A FF 4C 00 02 15 $UUID $MAJOR $MINOR $POWER 00
echo "Complete"