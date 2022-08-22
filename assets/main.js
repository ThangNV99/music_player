
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = 'music_player'

const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const prevBtn = $('.btn-prev')
const nextBtn = $('.btn-next')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playList = $('.playlist')

 const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
          name: "Blinding Lights",
          singer: "The Weeknd",
          path: "https://malpha.123tokyo.xyz/get.php/a/8f/fHI8X4OXluQ.mp3?cid=MjcuNzIuMTAwLjE0MXxNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTA0LjAuMC4wIFNhZmFyaS81MzcuMzZ8Vk4%3D&h=0IdzL-Y_Accq9kCmHji6FA&s=1661151723&n=The-Weeknd-Blinding-Lights-Official-Audio&dom=Iframe",
          image: "https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png"
        },
        {
          name: "Save your tears",
          singer: "The Weeknd",
          path: "https://mgamma.123tokyo.xyz/get.php/5/0d/XXYlFuWEuKI.mp3?cid=MjcuNzIuMTAwLjE0MXxNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTA0LjAuMC4wIFNhZmFyaS81MzcuMzZ8Vk4%3D&h=RHEmm9RLfiVrkIWPDR3DPQ&s=1661151810&n=The-Weeknd-Save-Your-Tears-Official-Music-Video&dom=Iframe",
          image: "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/5/5/905681/MV-Save-Your-Tears.jpg"
        },
        {
          name: "Intentions",
          singer: "Justin Bieber",
          path: "https://malpha.123tokyo.xyz/get.php/c/3c/3AyMjyHu1bA.mp3?cid=MjcuNzIuMTAwLjE0MXxNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTA0LjAuMC4wIFNhZmFyaS81MzcuMzZ8Vk4%3D&h=AV7t4cs7yFpE99Oc83Ol8g&s=1661151841&n=Justin-Bieber-Intentions-Official-Video-Short-Version-ft-Quavo&dom=Iframe",
          image: "https://i.pinimg.com/originals/b1/3d/13/b13d1360e594d0c0928dcf5248a7c0b0.jpg"
        },
        {
          name: "Titanium",
          singer: "Sia ",
          path: "https://malpha.123tokyo.xyz/get.php/9/d3/JRfuAukYTKg.mp3?cid=MjcuNzIuMTAwLjE0MXxNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTA0LjAuMC4wIFNhZmFyaS81MzcuMzZ8Vk4%3D&h=7k4kpOesNZn15-DIranKjQ&s=1661151885&n=David-Guetta-Titanium-ft-Sia-Official-Video&dom=Iframe",
          image: "https://i.pinimg.com/originals/96/65/b3/9665b32544b233f01a471cf0dac50195.jpg"
        },
        {
          name: "Let Her Go",
          singer: "Passenger  ",
          path: "https://mgamma.123tokyo.xyz/get.php/3/9c/RBumgq5yVrA.mp3?cid=MjcuNzIuMTAwLjE0MXxNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTA0LjAuMC4wIFNhZmFyaS81MzcuMzZ8Vk4%3D&h=_J1-i13kaEB7tupOgpEgVA&s=1661151919&n=Passenger-Let-Her-Go-Official-Video&dom=Iframe",
          image: "https://nhom40.com/wp-content/uploads/2018/08/let-her-go-1.jpg"
        }
      ],
    setConfig: function(key, value) {
      this.config[key] = value
      localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index = "${index}">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
        </div>
            `
        })
        playList.innerHTML = htmls.join('');
      },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
      },
    handleEvents: function() {
        const _this = this
        const cdWidth = cd.offsetWidth
        // Xử lý CD
        const cdThumbAnimate = cdThumb.animate([
          {transform: 'rotate(360deg)'}
        ], {
          duration: 10000, // 10s
          iterations: Infinity
        })
        cdThumbAnimate.pause()
        // Xử lý phóng to / thu nhỏ CD
        document.onscroll = function() { 
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth/cdWidth
        }
        // Xử lý khi click play
        playBtn.onclick = function() {
           if(_this.isPlaying){         
            audio.pause()          
           }
           else{
            audio.play()
           }
        }
        // Khi song play
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }
        // Khi song pause
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }
        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function() {
            if(audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }
        // Xử lý khi tua
        progress.onchange = function(e) {
          const seekTime = audio.duration / 100 * e.target.value
          audio.currentTime = seekTime
        }
        // Xử lý next bài
        nextBtn.onclick = function() {
          if(_this.isRandom){
            _this.randomSong()
          }
          else{
            _this.nextSong()
          }
          audio.play()
          _this.render()
          _this.scrollToActiveSong()
        }
        // Xử lý prev bài
        prevBtn.onclick = function() {
          if(_this.isRandom){
            _this.randomSong()
          }
          else{
            _this.prevSong()
          }
          audio.play()
          _this.render()
        }
        // Xử lý random bài
        randomBtn.onclick = function(e) {
          _this.isRandom = !_this.isRandom
          _this.setConfig('isRandom', _this.isRandom)
          randomBtn.classList.toggle('active', _this.isRandom)
        }
        // Xử lý phát lại 1 bài
        repeatBtn.onclick = function(e) {
          _this.isRepeat = !_this.isRepeat
          _this.setConfig('isRepeat', _this.isRepeat)
          repeatBtn.classList.toggle('active', _this.isRepeat)
        }
        // Xử lý next bài khi end
        audio.onended = function() { 
          if(_this.isRandom) {
            _this.randomSong()
          }
          else if(_this.isRepeat) {
            audio.play()
          }
          else{
            nextBtn.click()
          }
          audio.play()
         }
         // Xử lý khi chọn bài
         playList.onclick = function(e) {
          songNode = e.target.closest('.song:not(.active)')
          if(songNode || e.target.closest('.option')){
            if(songNode){
              _this.currentIndex = Number(songNode.dataset.index)
              _this.loadCurrentSong()
              _this.render()
              audio.play()
            }
          }
         }  
      },
      scrollToActiveSong: function() { 
        setTimeout(() => {
          $('.song.active').scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
          })
        }, 300)
       },
      loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
      },
      loadConfig: function() {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
      },
      nextSong: function() { 
        this.currentIndex ++
        if(this.currentIndex >= this.songs.length)
        {
          this.currentIndex = 0
        }
        this.loadCurrentSong()
       },
       prevSong: function() { 
        this.currentIndex --
        if(this.currentIndex < 0)
        {
          this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
       },
       randomSong: function () { 
        let newIndex
        do{
          newIndex = Math.floor(Math.random() * this.songs.length)
        } while(newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
        },
      starts: function() {
        // Gán cấu hình từ config vào object
        this.loadConfig()

        // Định nghĩa các thuộc tính cho object
        this.defineProperties()

        // Xử lý events
        this.handleEvents()

        // Tải thông tin bài hát đầu
        this.loadCurrentSong()

        // Render danh sách nhạc
        this.render()

        // Hiển thị trạng thái ban đầu của button repeat & random
        randomBtn.classList.toggle('active', this.isRandom)
        repeatBtn.classList.toggle('active', this.isRepeat)
      }
 }
 app.starts()
 