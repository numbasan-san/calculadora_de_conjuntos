
var input_conjunto_a = (document.getElementById('input_conjunto_a'));
var input_conjunto_b = (document.getElementById('input_conjunto_b'));
var input_conjunto_universal = (document.getElementById('input_conjunto_universal'));

var output_result = document.getElementById('output_result');
var output_operation = document.getElementById('output_operation');

var conjunto_a, conjunto_b, conjunto_universal;
var result;

function variables_prepare(){
  conjunto_a = (input_conjunto_a.value).split(',');
  conjunto_b = (input_conjunto_b.value).split(',');
  conjunto_universal = (input_conjunto_universal.value).split(',');
  result = [];
}

function union(){
  variables_prepare();
  var cleaner = [];
  
  for (var i = 0; i < conjunto_a.length; i++) {
    cleaner.push(conjunto_a[i]);
  }
  for (var i = 0; i < conjunto_b.length; i++) {
    cleaner.push(conjunto_b[i]);
  }
  result = cleaner.filter((item,index)=>{
    return cleaner.indexOf(item) === index;
  });
  output_operation.innerHTML = 'A &#8746; B'; /* El código es para el símbolo de la unión de conjuntos */
  output_result.innerHTML = '{' + result + '}';
}

function diferencia(){
  variables_prepare();
  for (var i = 0; i < conjunto_a.length; i++) {
    if ( !(conjunto_b.includes(conjunto_a[i])) ){
        result.push(conjunto_a[i]);
    }
  }
  output_operation.innerHTML = 'A - B';
  output_result.innerHTML = '{' + result + '}';
}

function complemento(){
  variables_prepare();
  for (var i = 0; i < conjunto_universal.length; i++) {
    if ( (conjunto_a.includes(conjunto_universal[i])) ){
        delete(conjunto_universal[i]);
    }
  }
  var cleaner = conjunto_universal;
  result =  cleaner.filter((item,index)=>{
    return cleaner.indexOf(item) === index;
  });
  
  output_result.innerHTML = '{' + result + '}';
}
// q,w,e,r,t,y,u,i,o,p