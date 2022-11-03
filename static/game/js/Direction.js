function Direction(x=0, y=0) {
    this.x = x;
    this.y = y;
}

Direction.prototype.copy = function(){
    return new Direction(this.x, this.y);
}

Direction.prototype.add = function(vector){
    return new Direction(this.x + vector.x, this.y + vector.y);
}

Direction.prototype.addTo = function(vector){
    this.x += vector.x;
    this.y += vector.y;
}

Direction.prototype.subtract = function(vector){
    return new Direction(this.x - vector.x, this.y - vector.y);
}

Direction.prototype.mult = function(scalar){
    return new Direction(this.x*scalar, this.y*scalar);
}

Direction.prototype.dot = function(vector){
    return this.x * vector.x + this.y * vector.y;
}

Direction.prototype.length = function(){
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
}

Direction.prototype.distFrom = function(vector){
    return this.subtract(vector).length();
}