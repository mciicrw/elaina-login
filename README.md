# Elaina Login
LightDM Webkit Theme based on Elaina Openbox Theme, this theme is supposed to use with Elaina Openbox Theme so this will not have any customisation whatsoever and keep this theme simple.
Any feature request PR or Issues will be closed immediately.


## Installing Theme
**Dependencies**
- LightDM
- LightDM-webkit2-greeter

**How to Install**
1. Make sure lightdm using webkit greeter ([activate webkit greeter](https://wiki.archlinux.org/index.php/LightDM#Greeter))
2. Clone this repository
3. Copy cloned folder into `/usr/share/lightdm-webkit/themes`
4. Edit `webkit_theme` in `[greeter]` section inside `/etc/lightdm/lightdm-webkit2-greeter.conf` into `elaina-login`
5. Save and enjoy!

## Development
This project is still in heavy development, you can contribute too! just open an issue or PR, and i'll review it, as far as it isn't feature request.

File Structure
```
--/
 |- index.theme -> theme details
 |- index.html -> main html theme file
 |- css
   |- styles.css -> main css file for theme deploying
   |- fresh.css -> copied from styles.css for development before merged to styles.css
 |- js
   |- lightdm-sample.js -> js file contains dummy lightdm data for testing in browser
   |- loginHandler.js -> main js file for handling lightdm API
 |- images -> contain image file for theme
```

### Testing 
Want to test this theme? you can have it [here](https://mciicrw.github.io/elaina-login)

if you want to test after developing this theme you can use these method below

**Browser Method**
- Make sure you have browser installed, webkit browser such as Safari or GNOME Web (epiphany) is preferred
- go to theme folder and open `index.html`
- you're good to go!

**LightDM Theme Debugger**
- Install development theme with different name
- Change `webkit_theme` into development theme name
- Open terminal and run `lightdm-webkit2-greeter`
- you're good to go!

## Screenshot
soon

## TODO
- [ ] add screenshot preview
- [ ] fix login-card size in smaller screen
- [ ] fix footer size & placement
- [ ] customize select menu
- [ ] add background image in login-card so doesn't look plain & boring
- [ ] fix color scheme
- [x] blur background if applicable
- [ ] edit README.md further so new linux user can understand easily

Future Plan: Make easily customizable lightdm webkit theme based on this theme