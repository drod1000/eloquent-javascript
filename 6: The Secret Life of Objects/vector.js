class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get length() {
        return Math.sqrt(Math.pow(Math.abs(this.x), 2) + Math.pow(Math.abs(this.y), 2));
    }

    plus(that) {
        const newX = this.x + that.x;
        const newY = this.y + that.y;
        return new Vector(newX, newY);
    }

    plus(that) {
        const newX = Math.max(this.x,that.x) - Math.min(this.x,that.x);
        const newY = Math.max(this.y,that.y) - Math.min(this.y,that.y)
        return new Vector(newX, newY);
    }
}
