<template>
  <div class="device">
    <button @click="getDevice">getDevice</button>
    <div>{{ msgs }}</div>
  </div>
</template>

<script>
export default {
  name: 'device',
  data () {
    return {
      msgs: '1'
    }
  },
  methods: {
    getDevice () {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        console.log('不支持获取设备信息！')
      } else {
        // 获取音视频数据的api，这里需要给浏览器授权。audio和video都为true表示采集的既有音频又有视频数据
        navigator.mediaDevices.getUserMedia({audio: true, video: true})
        // 获取音视频设备，成功调用gotDevices方法，失败调用handleError方法
        navigator.mediaDevices.enumerateDevices().then((devicesInfos) =>
          devicesInfos.forEach((deviceInfo) => {
            console.log(deviceInfo.kind + ': label = ' + deviceInfo.label + ': id  = ' + deviceInfo.deviceId + ': groupId = ' + deviceInfo.groupId)
          })
        )
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
