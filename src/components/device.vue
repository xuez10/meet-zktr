<template>
  <div class="device">
    <button @click="getDevice">getDevice</button>
    <div>{{ audioInputDevice }}</div>
    <div>
      <label for="audioInput">audioInPut</label>
      <select id="audioInputDevice" @change="selectAudioInputDevice()" v-model="audioInputDevice">
        <option :key="audioIn" v-for="audioIn in audioInputDevices" :value="audioIn.deviceId">
          {{audioIn.label}}
        </option>
      </select>
    </div>
    <div>
      <label for="videoInput">videoInput</label>
      <select id="videoInputDevice">
        <option :key="videoIn" v-for="videoIn in videoInputDevices" :value="videoIn.deviceId">
          {{videoIn.label}}
        </option>
      </select>
    </div>
    <div>
      <label for="audioOutput">audioOutput</label>
      <select id="audioOutputDevice">
        <option :key="audioOut" v-for="audioOut in audioOutputDevices" :value="audioOut.deviceId">
          {{audioOut.label}}
        </option>
      </select>
    </div>
    <div>
      <canvas id="wrap" height="550" width="800"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: 'device',
  data () {
    return {
      msgs: 'null',
      audioInputDevices: [],
      videoInputDevices: [],
      audioOutputDevices: [],
      audioInputDevice: '',
      videoInputDevice: '',
      audioOutputDevice: ''
    }
  },
  methods: {
    async getDevice () {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        console.log('不支持获取设备信息！')
      } else {
        // 获取音视频数据的api，这里需要给浏览器授权。audio和video都为true表示采集的既有音频又有视频数据
        await navigator.mediaDevices.getUserMedia({audio: true, video: true}).then(() => { return navigator.mediaDevices.enumerateDevices() }).then((devicesInfos) => {
          this.audioInputDevices = []
          devicesInfos.forEach((deviceInfo) => {
            console.log(deviceInfo.kind + '; label = ' + deviceInfo.label + '; id  = ' + deviceInfo.deviceId + '; groupId = ' + deviceInfo.groupId)
            if (deviceInfo.kind === 'audioinput') {
              this.audioInputDevices.push(deviceInfo)
            } else if (deviceInfo.kind === 'videoinput') {
              this.videoInputDevices.push(deviceInfo)
            } else if (deviceInfo.kind === 'audiooutput') {
              this.audioOutputDevices.push(deviceInfo)
            }
          })
        })
        // // 获取音视频设备，成功调用gotDevices方法，失败调用handleError方法
        // navigator.mediaDevices.enumerateDevices().then((devicesInfos) => {
        //   this.audioInputDevices = []
        //   devicesInfos.forEach((deviceInfo) => {
        //     console.log(deviceInfo.kind + '; label = ' + deviceInfo.label + '; id  = ' + deviceInfo.deviceId + '; groupId = ' + deviceInfo.groupId)
        //     if (deviceInfo.kind === 'audioinput') {
        //       this.audioInputDevices.push(deviceInfo)
        //     }
        //   })
        // })
      }
    },
    selectAudioInputDevice () {
      navigator.mediaDevices.getUserMedia(
        {
          audio: {
            deviceId: { ideal: this.audioInputDevice }
          }
        }, this.drawAudio
      )
    },
    drawAudio (stream) {
      var wrap = document.getElementById('wrap')
      var cxt = wrap.getContext('2d')
      // 获取API
      var context = new AudioContext()
      // 加载媒体
      var audio = stream
      // 创建节点
      var source = context.createMediaStreamSource(audio)
      var analyser = context.createAnalyser()
      // 连接：source → analyser → destination
      source.connect(analyser)
      analyser.connect(context.destination)
      // 创建数据
      var output = new Uint8Array(361)(
        function drawSpectrum () {
          analyser.getByteFrequencyData(output)
          // 获取频域数据
          cxt.clearRect(0, 0, wrap.width, wrap.height)
          // 画线条
          for (var i = 0; i < output.length; i++) {
            var value = output[i] / 10
            // 绘制左半边
            cxt.beginPath()
            cxt.lineWidth = 1
            cxt.moveTo(300, 300)
            cxt.lineTo(Math.cos((i * 0.5 + 90) / 180 * Math.PI) * (200 + value) + 300, (-Math.sin((i * 0.5 + 90) / 180 * Math.PI) * (200 + value) + 300))
            cxt.stroke()
            // 绘制右半边
            cxt.beginPath()
            cxt.lineWidth = 1
            cxt.moveTo(300, 300)
            cxt.lineTo((Math.sin((i * 0.5) / 180 * Math.PI) * (200 + value) + 300), -Math.cos((i * 0.5) / 180 * Math.PI) * (200 + value) + 300)
            cxt.stroke()
          }
          // 画一个小圆，将线条覆盖
          cxt.beginPath()
          cxt.lineWidth = 1
          cxt.arc(300, 300, 200, 0, 2 * Math.PI, false)
          cxt.fillStyle = '#fff'
          cxt.stroke()
          cxt.fill()
          // 请求下一帧
          requestAnimationFrame(drawSpectrum)
        }
      )()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
label {
  width: 100px;
}
select {
  width: 200px;
}
</style>
