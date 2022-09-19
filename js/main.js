const options = {
    data() { return {
        player: undefined
    }},
    methods: {
        init() {
            console.log("正在初始化")
            let playerNode = document.getElementById('video-player')
            let options = {
                controls: true, // 启用控制条
                preload: 'auto', // 自动加载
                autoplay: false, // 自动播放
                fluid: true, // 自适应大小
                language: 'zh-CN', // 语言
                muted: false, // 静音
                sources: [], // 视频源
                children: [
                    'BigPlayButton',
                    'ControlBar'
                ]
            }
            this.player = videojs(playerNode, options, function() {
                console.log("播放器准备就绪", this)
            })
        },
        onBtnLoadVideoClick() {
            console.log("点击加载视频按钮")
        },
        onUploadFileChange(file, files) {
            console.log("文件发生改变")
            console.log(file)
            let lastDotIndex = file.name.lastIndexOf(".")
            let extName = file.name.substr(lastDotIndex)
            let fileType = this.getFileType(file.raw.type, extName)
            if (fileType.startsWith("video/")) {
                this.loadVideo(file)
            }
            else if (fileType.startsWith("subtitle/")) {
                this.loadSubtitle(file)
            }
            else {
                console.error("上传了无效的文件，扩展名：" + extName + "，类型：" + fileType)
            }
        },
        getFileType(type, extName) {
            let fileType = type
            if (fileType == "") {
                switch (extName) {
                    case ".srt":
                        fileType = "subtitle/srt"
                        break
                }
            }
            return fileType
        },
        loadVideo(file) {
            console.log("加载视频：" + file.name)
            let url = this.getUploadFileUrl(file)
            this.player.src({
                type: file.raw.type,
                src: url
            })
        },
        loadSubtitle(file) {
            console.log("加载字幕：" + file.name)
        },
        getUploadFileUrl(file) {
            return window.URL.createObjectURL(file.raw)
        }
    },
    mounted() {
        this.init()
    }
}

let app = Vue.createApp(options)
app.use(ElementPlus)
app.mount('#app')
