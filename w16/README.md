
# Week 16

## Overview
I decided to change my solution I had coded in for the code along. After doing that I forgot to move my code over and make a commit. So if you look at my commits there will be no differences in the files. I will try to break do the changes here instead.

#### Part One Solution
Since I am using the point value pass in by the `select` input and converting it into a `int` I am just using a ternary operator to check if the checkbox for owning both a dishwasher and washing machine is check. if it is I just multiple it by 2. And if it is not I just return the valus.
```js
this.waterUseagePts = this.ownBoth ? this.runs * 2 : this.runs
    
```

