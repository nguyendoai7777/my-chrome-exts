function Str(value) {
  // Kiểm tra kiểu dữ liệu của value
  if (typeof value === 'string') {
    this.value = value;
  } else {
    this.value = value.toString();
  }
}

Str.prototype.length = function() {
  return this.value.length;
};

Str.prototype.charAt = function(index) {
  return this.value[index];
};

Str.prototype.toUpperCase = function() {
  return this.value.toUpperCase();
};

Str.prototype.toLowerCase = function() {
  return this.value.toLowerCase();
};


let chuoi1 = new Str('Hello, World!');
let chuoi2 = Str('JavaScript');

console.log('c1: ', chuoi1);
console.log('c2: ', chuoi2);