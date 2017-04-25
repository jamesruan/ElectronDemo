# electron-demo
----
## Install
### yarn
Yarn is recommended to replace npm for better interface and speed.

    npm install -g yarn

Check your $PATH for yarn global binary. It should be set as npm does.

    yarn global bin
    echo $PATH

Setup Taobao's Mirror for speedup in china:

    export ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
    yarn config set registry https://registry.npm.taobao.org --global
    yarn config set disturl https://npm.taobao.org/dist --global

For further speed up, you can use the offline mirror of yarn:

    yarn config set yarn-offline-mirror /path/to/local-offline-mirror
    yarn config set yarn-offline-mirror-pruning true

### electron
For development, you'll need electron installed:

    yarn global add electron

### electron-packager
For release, you'll need electron-packager installed:

    yarn global add electron-packager

### jshint
Also, jshint is a good tool for code quality control.

    yarn global add jshint

### clone the demo

    git clone https://github.com/jamesruan/ElectronDemo.git

## Usage
### package.json
This Demo use two package.json config.
The outer one is for development, the inner one is packed as the config for app.
All source imports should be in the inner one. For example, add immutable.js to the source:

    cd app
    yarn add immutable

The inner one also has jshint config:

    "jshintConfig": {
      "esversion": 6,
      "maxerr": 5,
      "browser": true,
      "node": true,
      "strict": true,
      "asi": true,
      "eqnull": true,
      "unused": "vars",
      "undef": true,
      "varstmt": true
    }

which use ES6 and global 'use strict' directive. It also disallow var and check for unused and undef variables.

### run the app

    yarn run start

will run the app under Linux.

### release
If your are not in Windows, release the windows version need Wine1.6 installed.

    yarn run pack

will generate package for Windows/x64 and MacOsX/x64.
