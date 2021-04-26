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
    liElements.textContent = Product.arr[i].productName + ' had ' + Product.arr[i].clicks + ' votes, and was seen ' + Product.arr[i].views + ' times.';

  }
  doSomething ();
  chartRender ();
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

let chartRender = function (){

  let clicks = [];
  let names = [];
  let shown = [];
  for( let i = 0; i < Product.arr.length; i++ ) {
    clicks.push( Product.arr[i].clicks );
    names.push( Product.arr[i].productName );
    shown.push( Product.arr[i].views );

  }

  let ctx = document.getElementById( 'myChart' ).getContext( '2d' );
  let myChart = new Chart( ctx, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        label: '# of Votes',
        data: clicks,
        backgroundColor:
          'rgb(0, 0, 0)',
        borderColor:
          'rgb(245, 219, 179)',
        borderWidth: 1,
      }, {
        label: '# of shown',
        data: shown,
        backgroundColor:
          'rgb(245, 219, 179)',
        borderColor:
          'rgb(0, 0, 0)',
        borderWidth: 1,
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  } );
};

imgDiv.addEventListener( 'click', controller );
render ();
