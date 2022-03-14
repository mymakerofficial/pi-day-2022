
class Draw {
    element;
    ctx;

    constructor(element) {
        this.element = element;
        this.ctx = element.getContext('2d');
        element.width = 420;
        element.height = 420;
    }

    async drawPoint(point, inside) {
        let x = point.x * this.element.width;
        let y = point.y * this.element.height;

        this.ctx.fillStyle = '#FFF';
        this.ctx.beginPath();
        this.ctx.arc(x, y, 2, 0, 2 * Math.PI);
        this.ctx.fill();

        this.ctx.fillStyle = inside ? '#EB3117' : '#005DEB';
        this.ctx.beginPath();
        this.ctx.arc(x, y, 1, 0, 2 * Math.PI);
        this.ctx.fill();
    }
}

export default Draw;