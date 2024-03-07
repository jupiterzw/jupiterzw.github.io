---
title: I "UPDATE" My Mac Terminal
date: 2023-08-03 22:43
categories: [Posts, MacOS]
tags: [terminal, mac]     # TAG names should always be lowercase
math: true
image: /assets/img/2023-08-03-mac-terminal/mac_terminal.png
---

I recently leveled up my Mac terminal for convenience and fun. Here is how I did it.

## Install Homebrew
In your command line, type the following:
```zsh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
## Add Homebrew To Path
After installing, you will see these prompts at the end tells you how to add homebrew to path:
```zsh
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/[username]/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```
Remember to replace ”[username]” with your actual username.

## Install iTerm2
```zsh
brew install --cask iterm2
```

## Install Git
```zsh
brew install git
```

## Install Oh My Zsh
```zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## Install PowerLevel10K Theme for Oh My Zsh
Run this to install PowerLevel10K:
```zsh
git clone https://github.com/romkatv/powerlevel10k.git $ZSH_CUSTOM/themes/powerlevel10k
```
Now that it’s installed, open the ”~/.zshrc” file with your preferred editor and change the value of “ZSH_THEME” as shown below:
```zsh
ZSH_THEME="powerlevel10k/powerlevel10k"
```
To reflect this change on your terminal, restart it or run this command:
```zsh
source ~/.zshrc
```

## Install Meslo Nerd Font
Install the font by pressing “y” and then quit iTerm2.

## Update VSCode Terminal Font (Optional)
Open settings.json and add this line:
```json
"terminal.integrated.fontFamily": "MesloLGS NF"
```
Don't forget to add comma in the previous line:)

## Configure PowerLevel10K
Restart iTerm2. You should now be seeing the PowerLevel10K configuration process. If you don’t, run the following:
```zsh
p10k configure
```
Follow the instructions for the PowerLevel10K configuration to make your terminal fits your own preference.

## Increase Terminal Font Size
1. Open iTerm2 preferences
2. Go to Profiles > Text
3. I increase my font size to about 16px

## Change iTerm2 Colors to My Custom Theme
1. Open iTerm2
2. Open iTerm2 preferences
3. Go to Profiles > Colors
4. Download [Iterm2 Color Schemes](https://iterm2colorschemes.com/)
5. Import the downloaded color profile
6. Select the color profile
   
## Install ZSH Plugins
Install zsh-autosuggestions:
```zsh
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```
Install zsh-syntax-highlighting:
```zsh
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```
Open the ”~/.zshrc” file in your desired editor and modify the plugins line to what you see below.
```zsh
plugins=(git zsh-autosuggestions zsh-syntax-highlighting web-search)
```
Load these new plugins by running:
```zsh
source ~/.zshrc
```

I'll update the plugin section once I find useful ones.





