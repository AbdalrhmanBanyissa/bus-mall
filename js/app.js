'use strict';

let productNameArr = [
  'bag','banana','bathroom','boots','breakfast',
  'bubblegum','chair','cthulhu','dog-duck','dragon',
  'pen','pet-sweep','scissors','shark','sweep',
  'tauntaun','unicorn','usb','water-can','wine-glass'
];

function random ( min, max ) {
  min = Math.ceil( min );
  max = Math.floor( max );
  return Math.floor( Math.random() * ( max - min + 1 ) + min ); //The maximum is inclusive and the minimum is inclusive
}

const imgDiv = document.getElementById( 'productImgDiv' );
const leftImg = document.getElementById( 'left' );
const midImg = document.getElementById( 'mid' );
const rightImg = document.getElementById( 'right' );

let section = document.getElementById( 'sec1' );
let button = document.getElementById( 'resultsButton' );

function doSomething () {
  // Disable the button
  document.getElementById( 'resultsButton' ).disabled = true;

  // Do your processing here
  alert( 'Your statistics results are created' );

  // Re-enable after processing if you want
  // document.getElementById("myButton").disabled = false;
}

function resultsBut( ) {
  let list = document.getElementById( 'list' );

  for ( let i = 0; i < Product.arr.length; i++ ) {
    const liElements = document.createElement( 'li' );
    list.appendChild( liElements );
    liElements.textContent = 'Product Name: ' + Product.arr[i].productName + ', Number of Selection: ' + Product.arr[i].clicks + ', Number of views: ' + Product.arr[i].views;

  }
  doSomething ();
}

let clickNumber = 0;
let leftSideImage = 0;
let midSideImage = 0;
let rightSideImage = 0;

function Product ( name ){
  this.productName = name;
  this.productImg = `./img/${name}.jpg`;
  this.views = 0;
  this.clicks = 0;
  Product.arr.push( this );
}

Product.arr = [];

for ( let i = 0; i < productNameArr.length; i++ ){
  new Product ( productNameArr[i] );
}

function controller( event ) {
  if ( ( event.target.id == 'left' || event.target.id == 'mid' || event.target.id == 'right' ) && clickNumber < 25 ) {

    if( event.target.id == 'left' ) {
      Product.arr[leftSideImage].clicks++;
    }

    if( event.target.id == 'mid' ) {
      Product.arr[midSideImage].clicks++;
    }

    if( event.target.id == 'right' ) {
      Product.arr[rightSideImage].clicks++;
    }

    clickNumber++;
    render();

  } else if ( clickNumber == 25 ) {
    button.addEventListener( 'click', resultsBut );
  } else {
    console.log( Product.arr );
  }
}

let render = function () {
  let leftP = random ( 0, productNameArr.length - 1 );
  let midP;
  let rightP;

  do {
    midP = random( 0, productNameArr.length - 1 );
  } while ( leftP == midP || leftP == rightP || midP == rightP );

  do {
    rightP = random( 0, productNameArr.length - 1 );
  } while ( leftP == midP || leftP == rightP || midP == rightP );

  leftImg.src = Product.arr[leftP].productImg;
  midImg.src = Product.arr[midP].productImg;
  rightImg.src = Product.arr[rightP].productImg;

  leftSideImage = leftP;
  midSideImage = midP;
  rightSideImage = rightP;

  Product.arr[leftP].views++;
  Product.arr[midP].views++;
  Product.arr[rightP].views++;

};

imgDiv.addEventListener( 'click', controller );
render ();
