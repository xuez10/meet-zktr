<template>
	<div class="interFace" id="interFace">
		<header>
      <div id="title" class="title">
        <a><img src="" alt="meet_logo" herf="/"></a>
        <a>Google Meet</a>
        <button class="right" @click="showSettings">
          <img src="" alt="settings">
        </button>
      </div>
    </header>
    <div class="row">
      <div class="column">
        <div class="left">
          <div class="text_big">专业级视频会议应用，现在免费供大家使用。</div>
          <div class="text_mid">我们改造了 Google Meet，让所有用户都能免费使用这项安全可靠的商务会议服务。</div>
          <div>
            <button class="joinNew">
              <span>发起新会议</span>
            </button>
          </div>
          <div>
            <label for="" class="button_id">
              <span> </span>
              <span>icon</span>
              <input type="text" value autocomplete="off" placeholder="输入会议代码或链接">
            </label>
          </div>
          <div>
            <button class="joinExist">
              <div>加入</div>
            </button>
          </div>
          <div class="clear"></div>
          <div class="detail">
            <span>
              <a href="_blank">详细了解</a>
              " Google Meet"
            </span>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="right">
          <img src="" alt="bigPicture">
        </div>
      </div>
    </div>
	</div>
</template>

<script>
export default {
  name: 'interFace',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    // ?show setting frame
    showSettings () {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  text-align: justify;
  overflow: hidden;
  float: left;
  position: fixed;
  top: 0;
  width: 100%;
  margin-top: 10px;
}
.title .right {
  text-align:justify;
  float: right;
}
.column {
  width: 50%;
  float: left;
  margin : auto;
}
.column > .left {
  padding: 70px;
}
.column > .left > * {
  margin-bottom: 50px;
}
.column > .right {
  margin-bottom: 50px;
  padding: 70px;
}
.row:after {
  content: "";
  display: table;
  clear: both;
}
.text_big {
  font-weight: normal;
  font-size: 300%;
  text-align: justify;
}
.text_mid {
  font-weight: normal;
  font-size: 150%;
  text-align: justify;
}
.joinNew {
  float: left;
  width: auto;
  padding: 10px;
  margin-right: 20px;
}
.button_id {
  float: left;
  width: auto;
  white-space: pre;
  padding: 10px;
  margin-right: 20px;
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgb(95, 95, 95);
}
.button_id:hover {
  box-shadow: 0 0 0 2px green;
}
.button_id:focus {
  box-shadow: 0 0 0 2px blue;
}
input {
  border: none;
  outline: none;
}
.joinExist {
  float: left;
  width: auto;
  padding: 10px;
  margin-right: 20px;
}
.clear {
  clear: both;
  padding: 20px;
  border-bottom: 1px solid #cac9c9a9;
}
.detail {
  width: auto;
  text-align: left;
}
.detail a {
  text-decoration:none;
  color: #0c8d62;
}
</style>
