Harmony Connection Platform
==================

A platform that connects people together for shared life with God and each other. Created for the Harmony Methodist United Church in St. Louis.

# Setup for Development
### Pre-requisites
1. Install Node.js (version 8+)
2. Have access to a bash (or bash-like) terminal
3. Have administrator access to your machine (may need Execute file permissions, `chmod 755`, to run the shell scripts)

### Install
From the directory you want the project created in:
1. `git clone https://github.com/bpkennedy/harmony-connection-platform`
2. `cd harmony-connection-platform && npm install`
> If you get a permission/access denied, you may need to allow Execute permissions on the installDeps.sh script (and the others in the `/scripts` directory).  From a terminal, you can do `chmod 755 scripts/installDeps.sh` and retry `npm install`.


## Gotchas
Environment variable for the PEM (private key) in **Travis CI** requires that you wrap the newline-escaped string with `$''`.  So for a private key of "somePrivate\nKey", you would put into the environment variable: `$'somePrivate\nKey'.  Otherwise you'll get an "Invalid PEM file" error.

Environment variables in **Heroku** require you to remove your newlines.  So for the string of "----BEGIN----\nSomeThing\nAnotherThing\n----END----\n", you would enter as:
```
----BEGIN---
SomeThing
AnotherThing
----END----

```

It's a shame the two systems are different, but knowing this will save you hours of headache...