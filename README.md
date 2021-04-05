# 🚀  Github Comment to Discord - Action 
This is a customize action that takes comment from PR and Issues and sends it diiiiirectly to your discord channel 💥

![Disord view](/Screenshots/Discord.png)

## Features
- ✅  Tracking comments on issues
- ✅  Tracking comments on PR 
- ✅  Posting customized-formed pretty comments on discord
- ✅  Easy to go back to github (push on "Go to github" in dissord message )

## 📚 Usage

```
name: OnComment
on: [issue_comment]
jobs: 
  test:
    runs-on: ubuntu-latest  
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Post to Discord now
        uses: annsudo/discord-comments@master
        with:
           DISCORD_WEBHOOK_ID: ${{ secrets.DISCORD_WEBHOOK_ID }}
           DISCORD_WEBHOOK_TOKEN: ${{ secrets.DISCORD_WEBHOOK_TOKEN }}
```   

## 💥 Bonus Hack --> filter who you want to receive comments from

```
name: OnComment
on: [issue_comment]
jobs: 
  test:
    if: github.actor == 'annsudo' || github.actor == 'user2' 
    runs-on: ubuntu-latest  
    steps:
      - name: Checkout
     ... 
```

## Input variables

⚡ DISCORD_WEBHOOK_ID --> webhook for discord id channel (can be created by admin of that channel)

⚡ DISCORD_WEBHOOK_TOKEN --> webhook token for discord channel (can be created by admin of that channel)
