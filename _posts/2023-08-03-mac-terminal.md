---
title: I "Updated" My Mac Terminal
description: "A personal guide to improving the macOS command-line experience with iTerm2, Oh My Zsh, plugins, and themes."
date: 2023-08-03 22:43
categories: [Posts, MacOS]
tags: [MacOS, Terminal]
math: true
image: /assets/img/2023-08-03-mac-terminal/cover.png
---

## Shell vs. Terminal Emulator

| **Aspect**          | **Shell**                                                                 | **Terminal Emulator**                                                                                       |
|----------------------|---------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|
| **Definition**       | A command interpreter that reads commands and launches programs.          | A graphical application that emulates a text terminal and hosts a shell.                                    |
| **Examples**         | Bash, Zsh, PowerShell                                                      | Terminal.app, iTerm2, VS Code's integrated terminal                                                         |
| **System Access**    | Accesses processes, files, and environment variables through the operating system. | Provides input and output for the shell running inside it.                                              |
| **Purpose**          | Interprets commands and runs scripts.                                      | Displays terminal output and handles keyboard input, tabs, panes, and profiles.                             |
| **Dependency**       | Can run in a terminal emulator or another non-interactive environment.     | Runs a shell or another text-based program.                                                                 |

[iTerm2](https://iterm2.com/) is an advanced **terminal emulator** for macOS. It provides a powerful interface for interacting with Unix shells such as Bash, Zsh, and Fish.

| **Aspect** | **Description** |
|-------------|-----------------|
| **Type** | Terminal emulator (not a shell itself). |
| **Purpose** | Provides a graphical interface to run command-line shells and processes on macOS. |
| **Key Features** | - Split panes and tabs<br>- Hotkey window<br>- Search and autocomplete<br>- Shell integration and trigger automation<br>- Inline image and file previews<br>- Extensive customisation (themes, key bindings, profiles) |
| **Difference from Shell** | iTerm2 doesn’t interpret commands—it passes them to the shell (e.g., zsh or bash) running inside it. |
| **Typical Use** | Used by developers and power users for productivity, scripting, and managing multiple terminal sessions. |


## Installation

### Install [Homebrew](https://brew.sh/)
```zsh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

After installation, add Homebrew to your `PATH` if it is not already available:
```zsh
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/[username]/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```
Replace `[username]` with your actual username.

### Install [iTerm2](https://iterm2.com/)
```zsh
brew install --cask iterm2
```

### Install Git (if it is not already installed)
```zsh
brew install git
```

## Install Oh My Zsh
```zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## Install the Powerlevel10k Theme for Oh My Zsh
Run this command to install Powerlevel10k:
```zsh
git clone https://github.com/romkatv/powerlevel10k.git $ZSH_CUSTOM/themes/powerlevel10k
```
Open `~/.zshrc` with your preferred editor and change the value of `ZSH_THEME` as shown below:
```zsh
ZSH_THEME="powerlevel10k/powerlevel10k"
```
To apply the change, restart the terminal or run:
```zsh
source ~/.zshrc
```

## Install Meslo Nerd Font
Install the font by pressing “y” and then quit iTerm2.

## Update the VS Code Terminal Font (Optional)
Open `settings.json` and add this line:
```json
"terminal.integrated.fontFamily": "MesloLGS NF"
```
If this is not the first setting in the object, make sure the preceding line ends with a comma.

## Configure Powerlevel10k
Restart iTerm2. The Powerlevel10k configuration process should appear. If it does not, run:
```zsh
p10k configure
```
Follow the configuration prompts to adapt the terminal to your preferences.

## Increase Terminal Font Size
1. Open iTerm2 Settings.
2. Go to **Profiles > Text**.
3. Increase the font size; I use approximately 16 px.

## Change iTerm2 Colors to My Custom Theme
1. Open iTerm2.
2. Open iTerm2 Settings.
3. Go to **Profiles > Colors**.
4. Download a scheme from [iTerm2 Color Schemes](https://iterm2colorschemes.com/).
5. Import the downloaded colour profile.
6. Select the colour profile.
   
## Install ZSH Plugins
Install zsh-autosuggestions:
```zsh
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```
Install zsh-syntax-highlighting:
```zsh
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```
Open `~/.zshrc` in your preferred editor and update the plugins line as follows:
```zsh
plugins=(git zsh-autosuggestions zsh-syntax-highlighting web-search)
```
Load these new plugins by running:
```zsh
source ~/.zshrc
```

Additional plugins can be added to the same list as needed.
