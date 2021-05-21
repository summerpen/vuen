<template>
    <div class='dragon'>
        <div id='container'></div>
        <canvas id='canvas'></canvas>
        <!-- <img src="../assets/img/dragon.jpeg" alt=""> -->
    </div>
</template>

<script>
export default {
    name: 'Home',
    components: {},
    created() {},
    mounted() {
        var canvas = document.getElementById('canvas')
        var ctx = canvas.getContext('2d')

        var image = new Image()
        image.src = require('../assets/img/dragon.jpeg')
        image.onload = function () {
            canvas.width = image.width
            canvas.height = image.height
            ctx.drawImage(image, 0, 0)
            var imageData = ctx.getImageData(0, 0, image.width, image.height).data
            ctx.fillStyle = '#ffffff'
            ctx.fillRect(0, 0, image.width, image.height)

            var gap = 6

            for (var h = 0; h < image.height; h += gap) {
                for (var w = 0; w < image.width; w += gap) {
                    var position = (image.width * h + w) * 4
                    var r = imageData[position],
                        g = imageData[position + 1],
                        b = imageData[position + 2]

                    if (r + g + b == 0) {
                        ctx.fillStyle = '#000'
                        ctx.fillRect(w, h, 4, 4)
                    }
                }
            }
            var dragonContainer = document.getElementById('container')
            var dragonScale = 2
            for (var h = 0; h < image.height; h += gap) {
                for (var w = 0; w < image.width; w += gap) {
                    var position = (image.width * h + w) * 4
                    var r = imageData[position],
                        g = imageData[position + 1],
                        b = imageData[position + 2]

                    if (r + g + b == 0) {
                        var bubble = document.createElement('img')
                        bubble.src = require('../assets/img/bubble.png')
                        bubble.setAttribute('class', 'bubble')

                        var bubbleSize = Math.random() * 10 + 20
                        bubble.style.left = w * dragonScale - bubbleSize / 2 + 'px'
                        bubble.style.top = h * dragonScale - bubbleSize / 2 + 'px'
                        bubble.style.width = bubble.style.height = bubbleSize + 'px'
                        bubble.style.animationDuration = Math.random() * 6 + 4 + 's'

                        dragonContainer.appendChild(bubble)
                    }
                }
            }
        }
    },
}
</script>
<style lang="less" scoped>
.dragon {
    width: 100%;
    height: 100%;
    #container {
        // width: 100%;
        // height: 100%;
        position: absolute;
        z-index: 2;
    }
    #canvas {
        position: absolute;
        z-index: 1;
        filter: blur(5px);
    }
}

@keyframes floating {
    0% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-5px);
    }
    100% {
        transform: translateY(0px);
    }
}
</style>
