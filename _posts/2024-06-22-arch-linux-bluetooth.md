---
title: How to Activate Bluetooth Service on Arch Linux?
date: 2024-06-22 21:35
categories: [Posts, Arch Linux]
tags: [setting]     # TAG names should always be lowercase
math: true
image: /assets/img/2024-06-22-arch-linux-bluetooth/arch_bluethooth.png
published: true
---

After installing [Arch Linux](https://wiki.archlinux.org/title/installation_guide) and fiddling with it, I encountered an issue where the Bluetooth option was visible but I was unable to activate it.


![Bluethooth button fails to function](/assets/img/2024-06-22-arch-linux-bluetooth/arch_bluetooth.gif)
_Bluethooth button fails to function_

Check Bluetooth Status
---
To diagnose the issue, start by checking the status of the Bluetooth service with the following command:
```zsh
systemctl status bluetooth
```
You might see a response like this:
```zsh
peter% systemctl status bluetooth
bluetooth.service - Bluetooth service
    Loaded: loaded (/usr/lib/systemd/system/bluetooth.service; disabled; preset: disabled)
    Active: inactive (dead)
    Docs: man:bluetoothd(8)
```
This indicates that the Bluetooth service is disabled and inactive, which is why it's not functioning.

Activate Bluetooth Service
---
Here's how I resolved the issue:
![Bluethooth is functioning](/assets/img/2024-06-22-arch-linux-bluetooth/console_bluethooth.png)
  
- Start the Bluetooth service:
  ```zsh
    sudo systemctl start bluetooth
  ```
  This command initiates the Bluetooth service.

- Enable the Bluetooth service to start at boot:
    ```zsh
    systemctl enable bluetooth
    ```
    This ensures that the Bluetooth service starts automatically with each boot of the system.

Now the bluetooth is functioning!
![Bluethooth is functioning](/assets/img/2024-06-22-arch-linux-bluetooth/bluetooth_work.png)
_Bluethooth is functioning_

I hope this guide helps you resolve any similar issues with Bluetooth on Arch Linux.