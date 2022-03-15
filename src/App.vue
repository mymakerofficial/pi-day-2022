<template>
  <div>
    <div class="container">
      <h1 class="title">Approximating 𝑃𝑖 <small>using Monte Carlo method</small></h1>
      <div v-if="!play">
        <button v-on:click="start" class="primary">▶ See in action</button><br>
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
          <span class="math result"><b>π ≈ {{ piApprox.currentPi }}</b></span>
        </p>
        <p>
          <span class="math secondary"><small>π = {{ Math.PI }}</small></span><br>
        </p>
      </div>

      <h1>Method</h1>
      <p>
        Imagine a circle inside a square. The circle has a radius of <span class="math"><b>𝑟</b></span> and the square surrounding it has side length's of <span class="math"><b>2𝑟</b></span>.<br>
        We know that the ratio of the shape's area's is <span class="math"><b>π/4</b></span>. However we do not know Pi, so to approximate Pi we uniformly scatter points on our square, then from knowing how many of those points have landed inside our circle we can calculate an approximate value of Pi.<br>
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
        Calculating if a point is inside our quadrant is easy. We just need to calculate its distance to the origin like this <span class="math"><b>d = x<sup>2</sup> + y<sup>2</sup></b></span>, if the distance is smaller or equal to <span class="math"><b>𝑟</b></span> then the point is inside.<br><br>
        Knowing the ratio between our two area's (<span class="math"><b>π/4</b></span>) we can conclude that <span class="math"><b>π ≈ 4 * ( pointsInsideQuadrant / pointsTotal )</b></span>
      </p>
      <button v-on:click="start" v-if="!play" class="highlight">See in action</button>

      <h1>The Code</h1>
      <p>
        The code for this is extremely simple. In this case I've written a class in JavaScript to manage all the calculations.
      </p>
      <pre><code ref="approxCodeField"></code></pre>
      <p>
        We can now continuously call our <code><span class="hljs-title function_">dropPoint</span>()</code> method to create new random points.
      </p>
      <pre><code ref="execExampleCodeField"></code></pre>
      <button v-on:click="start" v-if="!play" class="highlight">See in action</button>
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
import hljs from "highlight.js";
import axios from "axios";

export default {
  name: 'App',
  components: {

  },

  data() {
    return {
      piApprox: new MonteCarloPiApprox(),
      draw: null,
      pointsPerFrame: 3000,
      play: false,
      codeHtml: "loading...",
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
  },

  mounted() {
    axios.get(`https://gist.githubusercontent.com/mymakerofficial/0c220620d3f2412099b3c278919b31bb/raw/3749b4df011b3a566082733313da401423176ea6/monte-carlo-pi-approx.js`).then(response => {
       this.$refs.approxCodeField.innerHTML = hljs.highlight(response.data, {language: 'js'}).value
    }).catch(error => {
      console.log(error)
    })

    axios.get(`https://gist.githubusercontent.com/mymakerofficial/0c220620d3f2412099b3c278919b31bb/raw/61168a26e0f472a79a9fced61bde1161531c1519/execute-example.js`).then(response => {
      this.$refs.execExampleCodeField.innerHTML = hljs.highlight(response.data, {language: 'js'}).value
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&family=Roboto+Slab&family=Roboto+Mono');

body {
  font-family: 'Roboto', sans-serif;
  color: hsl(0, 0%, 18%);
  background-color: hsl(0, 0%, 98%);
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
  border-bottom: solid 2px hsl(0, 0%, 80%);
}

.title {
  margin-top: 1.5em;
  border-bottom: unset;
}

.result {
  line-height: 2em;
  font-size: 1.3em;
  padding: 4px 0;
  border-bottom: solid 2px hsl(0, 0%, 80%);
}

.secondary {
  color: hsl(0, 0%, 60%);
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
  background-color: hsl(0, 0%, 90%);
  border: unset;
  padding: 12px 16px;
  margin: 12px 24px;
  font-size: 1.01em;
  border-radius: 3px;
}

button:hover {
  cursor: pointer
}

button.highlight {
  background: hsl(0, 0%, 90%);
  background: radial-gradient(circle at top, hsl(0, 0%, 90%) 0%, hsl(0, 0%, 90%) 25%, hsl(0, 0%, 96%) 75%, hsl(0, 0%, 96%) 100%);
  background-size: 400% 200%;
  background-position: 80% 100%;
  background-repeat: repeat;
  transition-duration: .2s;
}

button.highlight:hover {
  background-size: 400% 200%;
  background-position: -100% 100%;
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

code {
  font-family: 'Roboto Mono', monospace;
  padding: 6px;
  background-color: hsl(0, 0%, 96%);
  border-radius: 3px;
}

pre code {
  padding: 12px;
  display: block;
  margin: 12px 24px;
}

.footer {
  margin-top: 42px;
  padding: 12px;
  background-color: hsl(0, 0%, 96%);
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

.hljs {
  color: #000;
  background: #fff;
}

.hljs-subst,
.hljs-title {
  font-weight: normal;
  color: #000;
}

.hljs-title.function_ {
  color: #7A7A43;
}

.hljs-code,
.hljs-comment,
.hljs-quote {
  color: #8C8C8C;
  font-style: italic;
}

.hljs-meta {
  color: #9E880D;
}

.hljs-section {
  color: #871094;
}

.hljs-variable.language_,
.hljs-symbol,
.hljs-selector-class,
.hljs-selector-id,
.hljs-selector-tag,
.hljs-template-tag,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-keyword,
.hljs-meta .hljs-keyword,
.hljs-literal,
.hljs-name,
.hljs-built_in,
.hljs-type {
  color: #0033B3;
}

.hljs-property,
.hljs-attr {
  color: #871094;
}

.hljs-attribute {
  color: #174AD4;
}

.hljs-number {
  color: #1750EB;
}

.hljs-regexp {
  color: #264EFF;
}

.hljs-link {
  text-decoration: underline;
  color: #006DCC;
}

.hljs-meta .hljs-string,
.hljs-string {
  color: #067D17;
}

.hljs-char.escape_ {
  color: #0037A6;
}

.hljs-doctag {
  text-decoration: underline;
}

.hljs-template-variable {
  color: #248F8F;
}

.hljs-addition {
  background: #BEE6BE;
}

.hljs-deletion {
  background: #D6D6D6;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}

.hljs-variable,
.hljs-operator,
.hljs-punctuation,
.hljs-title.class_.inherited__,
.hljs-title.class_,
.hljs-params,
.hljs-bullet,
.hljs-formula,
.hljs-tag {
  /* purposely ignored */
}
</style>
