class MonteCarloPiApprox {
    r = 1;
    pointsTotal = 0;
    pointsInsideQuadrant = 0;

    dropPoint() {
        // generate random point inside square
        let x = Math.random();
        let y = Math.random();

        // check if point is inside quadrant
        let insideCircle = x * x + y * y < this.r;

        this.pointsTotal++;
        if(insideCircle) this.pointsInsideQuadrant++;

        return {x: x, y: y, insideCircle: insideCircle};
    }

    get currentPi() {
        return 4 * (this.pointsInsideQuadrant / this.pointsTotal);
    }
}

export default MonteCarloPiApprox;