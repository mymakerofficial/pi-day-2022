<template>
  <div>
    <div class="container">
      <h1 class="title">Approximating 𝑃𝑖</h1>
      <h3 class="title">Monte Carlo method</h3>
      <canvas ref="canvas"></canvas>
      <br>
      <p>
        <math>pointsTotal = {{ piApprox.pointsTotal }}</math><br>
        <math>pointsInsideQuadrant = {{ piApprox.pointsInsideQuadrant }}</math>
      </p>
      <p>
        <math>π ≈ 4 * ( pointsInsideQuadrant / pointsTotal )</math><br>
        <math>π ≈ 4 * ( {{ piApprox.pointsInsideQuadrant }} / {{ piApprox.pointsTotal }} )</math><br>
        <math class="result">π ≈ <b>{{ piApprox.currentPi }}</b></math>
      </p>

      <h1>Method</h1>
      <p>
        We can approximate PI by scattering random points within a square.<br>
        In this example we place a quarter circle at the canvas's origin point with the same radius as the square's side length (<math>r</math>).<br>
      </p>
      <img src="visual_shapes.png">

      <h3>Areas</h3>
      <p>
        If we take a look at the areas of our shapes we have <math><b>r<sup>2</sup></b></math> for our square and <math><b>πr<sup>2</sup>/4</b></math> for our circular quadrant.<br>
        From this we know that the the ratio between these two areas is <math><b>π/4</b></math>.
      </p>
      <img src="visual_areas.png">

      <h3>Calculating Pi</h3>
      <p>
        By now by uniformly scattering points inside our square and keeping track of how many of those points are inside the quadrant we can approximate PI.<br>
        Knowing the ratio between our two areas (<math><b>π/4</b></math>) we can conclude that <math><b>π ≈ 4 * ( pointsInsideQuadrant / pointsTotal )</b></math>
      </p>
      <br>
      <div class="footer">
        <p>Made with ❤️ by <a href="https://maiker.de">My_Maker</a> on Pi Day 2022</p>
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
      pointsPerFrame: 3000
    }
  },

  methods: {
    update() {
      for(let i = 0; i < this.pointsPerFrame; i++){
        let p = this.piApprox.dropPoint();
        this.draw.drawPoint({x: p.x, y: p.y}, p.insideCircle)
      }

      window.requestAnimationFrame(this.update)
    }
  },

  mounted () {
    this.draw = new Draw(this.$refs.canvas);

    window.requestAnimationFrame(this.update)
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&family=Roboto+Slab');

body {
  font-family: 'Roboto', sans-serif;
  color: hsl(0, 1%, 18%);
  background-color: hsl(0, 1%, 98%);
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

img {
  max-height: 300px;
  max-width: 80vw;
}

canvas {
  max-width: 80vw;
}

math {
  font-family: 'Roboto Slab', serif;
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
