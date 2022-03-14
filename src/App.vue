<template>
  <div>
    <div class="container">
      <h1 class="title">Approximating 𝑃𝑖 <small>using Monte Carlo method</small></h1>
      <div v-if="!play">
        <button v-on:click="start" class="primary">▶ Play live demo</button><br>
      </div>
      <div v-else>
        <canvas ref="canvas"></canvas>
        <br>
        <p>
          <span class="math">pointsTotal = {{ piApprox.pointsTotal }}</span><br>
          <span class="math">pointsInsideQuadrant = {{ piApprox.pointsInsideQuadrant }}</span>
        </p>
        <p>
          <span class="math">π ≈ 4 * ( pointsInsideQuadrant / pointsTotal )</span><br>
          <span class="math">π ≈ 4 * ( {{ piApprox.pointsInsideQuadrant }} / {{ piApprox.pointsTotal }} )</span><br>
          <span class="math result">π ≈ <b>{{ piApprox.currentPi }}</b></span>
        </p>
        <p>
          <span class="math secondary"><small>π = {{ Math.PI }}</small></span><br>
        </p>
      </div>

      <h1>Method</h1>
      <p>
        Imagine a circle inside a square. The circle has a radius of <span class="math"><b>𝑟</b></span> and the square surrounding it has side length's of <span class="math"><b>2𝑟</b></span>.<br>
        We know that ratio of the shapes areas is <span class="math"><b>π/4</b></span>, but we don't know what Pi is. To approximate Pi we uniformly scatter points on our square, then from knowing how many of those points have landed inside our circle we can calculate an approximate value of Pi.<br>
        <br>
        In this example we are only using one quarter of our circle and square, this just makes things run a bit smoother and since the ratio between the areas stays the same, the math's don't change.
      </p>
      <img src="visual_shapes_full.svg" style="max-height: 500px;">

      <h1>The Math's</h1>
      <p>
        If we take a look at the area's of our shape's we have <span class="math"><b>𝑟<sup>2</sup></b></span> for our square and <span class="math"><b>π𝑟<sup>2</sup>/4</b></span> for our quarter circle.<br>
        From this we know that the the ratio between these two area's is <span class="math"><b>π/4</b></span>.
      </p>
      <img src="visual_areas.svg">
      <br>
      <p>
        By now by uniformly scattering points inside our square and keeping track of how many of those points are inside the quarter circle we can approximate Pi.<br>
        Calculating if a point is inside our quadrant is easy. We just need to calculate its distance to the origin like this <span class="math"><b>d = x<sup>2</sup> + y<sup>2</sup></b></span>, if the distance is smaller or equal to <span class="math">𝑟</span> then the point is inside.<br><br>
        Knowing the ratio between our two area's (<span class="math"><b>π/4</b></span>) we can conclude that <span class="math"><b>π ≈ 4 * ( pointsInsideQuadrant / pointsTotal )</b></span>
      </p>
      <button v-on:click="start" v-if="!play">See in action</button>
      <br>
    </div>
    <div class="footer">
      <div class="container">
        <p>
          Made with ❤️ by <a href="https://maiker.de">My_Maker</a> on Pi Day 2022<br>
          View <a href="https://github.com/mymakerofficial/pi-day-2022">source code</a> on GitHub
        </p>
        <p>Inspired by <a href="https://youtu.be/5cNnf_7e92Q">The Coding Train: Coding Challenge #95</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import MonteCarloPiApprox from "@/scripts/monte-carlo-pi-approx";
import Draw from "@/scripts/draw";


export default {
  name: 'App',
  components: {

  },

  data() {
    return {
      piApprox: new MonteCarloPiApprox(),
      draw: null,
      pointsPerFrame: 3000,
      play: false
    }
  },

  methods: {
    start() {
      this.play = true;

      window.scrollTo(0, 0)

      this.piApprox.pointsInsideQuadrant = 0;
      this.piApprox.pointsTotal = 0;

      this.$nextTick(() => {
        if(!this.draw) this.draw = new Draw(this.$refs.canvas);

        window.requestAnimationFrame(this.update)
      })
    },
    stop() {
      this.play = false;

      this.draw = null;
    },
    update() {
      for(let i = 0; i < this.pointsPerFrame; i++){
        let p = this.piApprox.dropPoint();
        this.draw.drawPoint({x: p.x, y: p.y}, p.insideCircle)
      }

      if(!this.play) return;
      window.requestAnimationFrame(this.update)
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&family=Roboto+Slab');

body {
  font-family: 'Roboto', sans-serif;
  color: hsl(0, 1%, 18%);
  background-color: hsl(0, 1%, 98%);
  padding: 0;
  margin: 0;
}

p {
  line-height: 1.6em;
  padding: 12px 24px;
}

h1, h2, h3, h4, h5, h6 {
  margin-top: 3em;
  padding: 12px 3px;
  border-bottom: solid 2px hsl(0, 1%, 80%);
}

.title {
  margin-top: 1.5em;
  border-bottom: unset;
}

.result {
  line-height: 2em;
  font-size: 1.3em;
  padding: 4px 0;
  border-bottom: solid 2px hsl(0, 1%, 80%);
}

.secondary {
  color: hsl(0, 1%, 60%);
}

img {
  max-height: 300px;
  max-width: 80vw;
}

canvas {
  max-width: 80vw;
}

.math {
  font-family: 'Roboto Slab', serif;
}

button {
  background-color: hsl(0, 1%, 90%);
  border: unset;
  padding: 12px 16px;
  margin: 12px;
  font-size: 1.01em;
  border-radius: 3px;
}

button:hover {
  cursor: pointer
}

button.primary {
  background: rgba(0, 93, 235, 0.5);
  background: radial-gradient(circle at top, rgba(235,49,23,0.5) 0%, rgba(235,49,23,0.5) 25%, rgba(0,93,235,0.5) 75%, rgba(0,93,235,0.5) 100%);
  background-size: 400% 200%;
  background-position: 80% 100%;
  background-repeat: repeat;
  font-weight: 600;
  font-size: 1.1em;
  color: hsl(0, 1%, 98%);
  transition-duration: .2s;
}

button.primary:hover {
  background-size: 400% 200%;
  background-position: -100% 100%;
}

.footer {
  margin-top: 42px;
  padding: 12px;
  background-color: hsl(0, 1%, 96%);
}

.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  padding: 0 32px;
}

@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}

</style>
