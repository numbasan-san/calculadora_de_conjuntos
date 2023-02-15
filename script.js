
var input_conjunto_a = (document.getElementById('input_conjunto_a'));
var input_conjunto_b = (document.getElementById('input_conjunto_b'));
var input_conjunto_universal = (document.getElementById('input_conjunto_universal'));
var input_conjuntos = (document.getElementById('input_conjuntos'));
var input_nombre_conjuntos = (document.getElementById('input_nombre_conjuntos'));
var input_elemento = (document.getElementById('input_elemento'));

var output_result = document.getElementById('output_result');
var output_operation = document.getElementById('output_operation');
var output_conjuntos = document.getElementById('output_conjuntos');
var output_instructions = document.getElementById('output_instructions');

var btn_instructions = document.getElementById('btn_instructions');

var conjunto_a, conjunto_b, conjunto_universal, elemento;
var result;

function instructions() {
  btn_instructions.setAttribute("onClick", "clean_instr()");
  btn_instructions.innerHTML = "Limpiar Instructivo";
  output_instructions.innerHTML = 
  '<hr  />Instrucciones: <ul><li>Los conjuntos a calcular deben ir en las entradas "Conjunto A" y "Conjunto B" si no son el conjunto Universal. En dado caso, debe ir en su respectiva entrada. </li> ' + 
  '<li>Todas las operaciones trabajan con el valor de la entrada "Conjunto A" como conjunto principal, con excepciones, por lo que el valor que quieras calcular deberá ir en esa entrada.</li> ' + 
  '<li>Las operaciones que trabajan con las entradas "Conjunto A" y "Conjunto B" son: <ol><li>Intersección.</li><li>Unión.</li><li>Diferencia.</li><li>Diferencia Simétrica.</li></ol>Por otra parte, Complemento trabaja con el Conjunto Universal en vez del Conjunto B.</li> ' + 
  '<li>La entrada "Elemento" está para la operación "Pertenencia" que calculará si el elemento ingresado pertenece al conjunto ingresado en la entrada "Conjunto A".</li>' + 
  '<li>La operación potencia trabaja con el valor en "Conjunto A".</li>' + 
  '<li>Las entradas de la derecha están para enlistar los conjuntos que se usarán frecuentemente o para cuando se fueren a usar muchos conjuntos, con su respectivo nombre y valor. Deberá copiar y pegar los conjuntos que fueren a usarse en las entradas que correspondan, pero solo el valor.</li></ul><hr  />' + 
  'NOTA: Para las operaciones como las de conjunto primo, simplemente calcule la diferencia con el conjunto Universal o "Conjunto B" según convenga.<hr  />'
  ;
}

function clean_instr() {
  btn_instructions.setAttribute("onClick", "instructions()");
  btn_instructions.innerHTML = "Instructivo";
  output_instructions.innerHTML = '';
}

function variables_prepare() {
  conjunto_a = (input_conjunto_a.value).split(',');
  conjunto_b = (input_conjunto_b.value).split(',');
  conjunto_universal = (input_conjunto_universal.value).split(',');
	elemento = (input_elemento.value);
  result = [];
}

function union() {
  variables_prepare();
  var cleaner = [];

  for (var i = 0; i < conjunto_a.length; i++) {
    cleaner.push(conjunto_a[i]);
  }
  for (var i = 0; i < conjunto_b.length; i++) {
    cleaner.push(conjunto_b[i]);
  }
  result = cleaner.filter((item, index) => {
    return cleaner.indexOf(item) === index;
  });
  output_operation.innerHTML = 'A &#8746; B ='; /* El código es para el símbolo de la unión de conjuntos */
  output_result.innerHTML = '{' + result + '}';
}

function diferencia() {
  variables_prepare();
  for (var i = 0; i < conjunto_a.length; i++) {
    if (!(conjunto_b.includes(conjunto_a[i]))) {
      result.push(conjunto_a[i]);
    }
  }
  output_operation.innerHTML = 'A - B =';
  output_result.innerHTML = '{' + result + '}';
}

function interseccion() {
  variables_prepare();
  for (var i = 0; i < conjunto_a.length; i++) {
    if ((conjunto_b.includes(conjunto_a[i]))) {
      result.push(conjunto_a[i]);
    }
  }
  output_operation.innerHTML = 'A &#8745; B =';
  output_result.innerHTML = '{' + result + '}';
}

function complemento() {
  variables_prepare();
  for (var i = 0; i < conjunto_universal.length; i++) {
    if ((conjunto_a.includes(conjunto_universal[i]))) {
      delete(conjunto_universal[i]);
    }
  }
  var cleaner = conjunto_universal;
  result = cleaner.filter((item, index) => {
    return cleaner.indexOf(item) === index;
  });
  output_operation.innerHTML = 'A - U = ';
  output_result.innerHTML = '{' + result + '}';
}

function dife_sime() {
  variables_prepare();
  for (var i = 0; i < conjunto_a.length; i++) {
    if (!(conjunto_b.includes(conjunto_a[i]))) {
      result.push(conjunto_a[i]);
    }
  }
  for (var i = 0; i < conjunto_b.length; i++) {
    if (!(conjunto_a.includes(conjunto_b[i]))) {
      result.push(conjunto_b[i]);
    }
  }
  output_operation.innerHTML = 'A &#8710; B =';
  output_result.innerHTML = '{' + result + '}';
}
// q,w,e,r,t,y,u,i,o,p

function pertenencia(){
  variables_prepare();
  simbolo = '';
  verdad = '';
  
  if ((conjunto_a.includes(elemento))) {
      simbolo = '&#8712;'; // Pertenece
      verdad = 'V';
  } else {
      simbolo = '&#8713;'; // No Pertenece
      verdad = 'F';
  }
  output_operation.innerHTML = elemento + ' ' + simbolo + ' A =';
  output_result.innerHTML = '' + verdad + '';
}

function potencia(){
  variables_prepare();
  combo = conjunto_a.reduce((a, v) => a.concat(a.map(d => [v].concat(d))), [[]]);
  result = combo.values();

  output_operation.innerHTML = 'P(A) =';
  output_result.innerHTML = '';
  output_result.innerHTML += '{';
  for (i = 0; i < combo.length; i++){
    output_result.innerHTML += '{' + result.next().value + '},\n';
  }
  output_result.innerHTML += '}';
}

function imprimir(){
	output_conjuntos.innerHTML += '<li id="' + input_nombre_conjuntos.value + '">{' + input_nombre_conjuntos.value + '} = ' + input_conjuntos.value + '</li>';
}
