<template>
<b-container class="calculator" fluid>
<div id="app">
   <header class="header">
    <a class="header__logo" href="#">My Product</a>
    <div class="ham-menu" @click="changeVisibility()" :class="{ 'active': burgerVisibility }">
      <span class="ham-menu__item"></span>
      <span class="ham-menu__item"></span>
      <span class="ham-menu__item"></span>
    </div>
    <nav class="header__nav-wrap" :class="{ 'open': burgerVisibility }">
      <ul class="header__nav-list" @click="burgerVisibility = false">
        <li class="header__nav-item"><router-link class="header__nav-link" to="/">Home</router-link></li>
        <li class="header__nav-item"><router-link class="header__nav-link" to="/products">Products</router-link></li>
        <li class="header__nav-item"><router-link class="header__nav-link" to="/calculator">Calculator</router-link></li>
        <li class="header__nav-item"><router-link class="header__nav-link" to="/">About</router-link></li>
      </ul>
    </nav>
  </header>
  <router-view/>
</div>
</b-container>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      burgerVisibility: false
    }
  },
  methods: {
    changeVisibility () {
      this.burgerVisibility = !this.burgerVisibility
    }
  }
}
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

@mixin wide-screen {
  @media screen and (min-width: 1200px) {
    @content;
  }
}

@mixin pc {
  @media screen and (min-width: 960px) {
    @content;
  }
}

@mixin tab {
  @media screen and (min-width: 560px) and (max-width: 959px) {
    @content;
  }
}

@mixin sp {
  @media screen and (max-width: 559px) {
    @content;
  }
}

@mixin hamburger {
  @media screen and (max-width: 959px) {
    @content
  }
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Helvetica Neue",Arial,"Hiragino Kaku Gothic ProN",
    "Hiragino Sans",Meiryo,sans-serif;
}

.header {
  display: flex;
  width: 100%;
  background-color: #fff;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  box-shadow: 0px 8px 10px #ccc;
  @include sp {
    height: 60px;
  }
  @include tab {
    height: 70px;
  }
  @include pc {
    height: 70px;
  }
  &__logo {
    display: inline-block;
    height: auto;
    text-decoration: none;
    color: #000;
    @include sp {
      margin-left: 16px;
      font-size: 18px;
      letter-spacing: 0.07em;
    }
    @include tab {
      margin-left: 16px;
      font-size: 24px;
      letter-spacing: 0.05em;
    }
    @include pc {
      margin-left: 24px;
      font-size: 26px;
      letter-spacing: 0.05em;
    }
    @include wide-screen {
      margin-left: 32px;
    }
  }
  &__nav-wrap {
    height: 100%;
    width: max-content;
    margin-left: auto;
    @include hamburger {
      position: fixed;
      left: 0;
      top: 0;
      display: none;
      z-index: 10;
      background-color: rgba(0, 0, 0, 0.9);
      width: 100%;
      height: 100%;
    }
    @include pc {
      display: inline-block;
      margin-right: 16px;
    }
    &.open {
      display: block;
    }
  }
  &__nav-list {
    list-style: none;
    height: 100%;
    margin: 0;
    padding: 0;
    @include hamburger {
      height: 100%;
      position: relative;
      overflow-x: hidden;
      overflow-y: auto;
      padding-top: 30vh;
    }
    @include pc {
      display: flex;
      align-items: center;
    }
  }
  &__nav-item {
    width: max-content;
    @include sp {
      display: block;
      margin: 0 auto;
      margin-bottom: 32px;
      text-align: center;
    }
    @include tab {
      display: block;
      margin: 0 auto;
      margin-bottom: 40px;
      text-align: center;
    }
    @include pc {
      display: inline-block;
      margin-right: 24px;
    }
    @include wide-screen {
      margin-right: 40px;
    }
  }
  &__nav-link {
    position: relative;
    display: inline-block;
    text-decoration: none;
    letter-spacing: 0.15em;
    color:#1a1c1a;
    @include hamburger {
      font-size: 21px;
      color: #fff;
    }
    @include pc {
      font-size: 18px;
    }
    @include wide-screen {
      font-size: 20px;
    }
    &::after {
      position: absolute;
      bottom: -4px;
      left: 0;
      content: '';
      width: 100%;
      height: 2px;
      transform: scale(0, 1);
      transform-origin: center top;
      transition-duration: 0.25s;
      @include hamburger {
        background-color: #fff;
      }
      @include pc {
        background-color: #1a1c1a;
      }
    }
    &:hover::after {
      transform: scale(1, 1);
    }
  }
}

.ham-menu {
  @include hamburger {
    display: inline-block;
    box-sizing: border-box;
    margin-left: auto;
    margin-right: 16px;
    transition: all 0.3s;
    z-index: 20;
    position: relative;
    width: 40px;
    height: 40px;
    background-color: transparent;
    display: flex;
    justify-content: center;
    border-radius: 5px;
    border: 2px solid #000;
    cursor: pointer;
  }
  @include pc {
    display: none;
  }
  &__item {
    @include hamburger {
      display: inline-block;
      box-sizing: border-box;
      transition: all 0.3s;
      position: absolute;
      width: 30px;
      height: 4px;
      background-color: #000;
      border-radius: 5px;
    }
    &:nth-of-type(1) {
      top: 8px;
    }
    &:nth-of-type(2) {
      top: 16px;
    }
    &:nth-of-type(3) {
      bottom: 8px;
    }
  }
  &.active {
    border: none;
  }
  &.active .ham-menu__item:nth-of-type(1) {
    -moz-transform: translateY(10px) rotate(-45deg);
    -webkit-transform: translateY(10px) rotate(-45deg);
    transform: translateY(10px) rotate(-45deg);
    background-color: #fff;
  }
  &.active .ham-menu__item:nth-of-type(2) {
    transition-duration: 0s;
    opacity: 0;
  }
  &.active .ham-menu__item:nth-of-type(3) {
    -moz-transform: translateY(-10px) rotate(45deg);
    -webkit-transform: translateY(-10px) rotate(45deg);
    transform: translateY(-10px) rotate(45deg);
    background-color: #fff;
  }
}

</style>
