# hubot-reminder

A hubot script to send reminders.

## Features

The main task of this script is to create reminders. The bot has several commands for interaction:

1. Create new reminder - `remind "%text%" %time%`, where:

    - **%text%** is text that bot will send you when reminder works (this part must be quoted);
    - **%time%** is reminder time that written in text format

    Supported date formats:

    - `today at 6pm`
    - `tomorrow at 18:00`
    - `08.03 at 20:00`

    other date formats you can check [here](https://github.com/wanasit/chrono)

2. Get list of all your reminders - `reminder list`

## Example Interaction

```
some.user >> @hubot remind "go to the store" tomorrow at 18:00
hubot >> Reminder accepted. Wait for him.
    The next day at 18:00
hubot >> Hi. I remind you to go to the store
```

# Authors

The first version of this script was created and now maintained by [Simon Suprun](https://github.com/BehindLoader). 

## Licensing

hubot-reminder is available under the [Apache License, Version 2.0](LICENSE).
