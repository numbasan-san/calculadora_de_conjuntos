
/*
	Se declaran las variables a usar.
*/
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

var chb_a_value = document.getElementById('chb_a_value');
var chb_b_value = document.getElementById('chb_b_value');

var conjunto_a, conjunto_b, conjunto_universal, elemento;
var result;
let biblioteca_conjuntos = [];

/*
	Son para las funciones del "botón" "funciones".
*/
function instructions() {
  btn_instructions.setAttribute("onClick", "clean_instr()");
  btn_instructions.innerHTML = "Limpiar Instructivo";
  output_instructions.innerHTML = 
  '<hr  />Instrucciones: <ul><li>Los conjuntos a calcular deben ir en las entradas "Conjunto A" y "Conjunto B" si no son el conjunto Universal. En dado caso, debe ir en su respectiva entrada. </li> ' + 
  '<li>Todas las operaciones trabajan con el valor de la entrada "Conjunto A" como conjunto principal, con excepciones, por lo que el valor que quieras calcular deber&#225; ir en esa entrada.</li> ' + 
  '<li>Las operaciones que trabajan con las entradas "Conjunto A" y "Conjunto B" son: <ol><li>Intersecci&#243;n.</li><li>Uni&#243;n.</li><li>Diferencia.</li><li>Diferencia Sim&#233;trica.</li></ol>Por otra parte, Complemento trabaja con el Conjunto Universal en vez del Conjunto B.</li> ' + 
  '<li>La entrada "Elemento" est&#225; para la operaci&#243;n "Pertenencia" que calcular&#225; si el elemento ingresado pertenece al conjunto ingresado en la entrada "Conjunto A".</li>' + 
  '<li>La operaci&#243;n potencia trabaja con el valor en "Conjunto A".</li>' + 
  '<li>Las entradas de la derecha est&#225;n para enlistar los conjuntos que se usar&#225;n frecuentemente o para cuando se fueren a usar muchos conjuntos, con su respectivo nombre y valor. Deber&#225; copiar y pegar los conjuntos que fueren a usarse en las entradas que correspondan, pero solo el valor.</li></ul><hr  />' + 
  'NOTA: Para las operaciones como las de conjunto primo, simplemente calcule la diferencia con el conjunto Universal o "Conjunto B" seg&#250;n convenga.<hr  />'
  ;
}

function clean_instr() {
  btn_instructions.setAttribute("onClick", "instructions()");
  btn_instructions.innerHTML = "Instructivo";
  output_instructions.innerHTML = '';
}

/*
	Se preparan las varaibles que se usarán.
*/
chb_a_value.addEventListener("change", is_true_checkbox_a, false);
chb_b_value.addEventListener("change", is_true_checkbox_b, false);
function is_true_checkbox_a() {
  var checked_a = chb_a_value.checked;
  if(checked_a) {
  	console.log('chb_a_value: True');
  	// console.log((input_conjunto_a.value).split(','));
    return (input_conjunto_a.value).split(',');
  } else {
  	console.log('Se busca un conjunto.');
  	return (input_conjunto_a.value);
  }
}
function is_true_checkbox_b() {
  var checked_b = chb_b_value.checked;
  if (checked_b) {
  	console.log('chb_b_value: True');
  	// console.log((input_conjunto_b.value).split(','));
    return (input_conjunto_b.value).split(',');
  } else {
  	console.log('Se busca otro conjunto.');
  	return (input_conjunto_b.value);
  }
}

function variables_prepare() {
  conjunto_a = is_true_checkbox_a();
  conjunto_b = is_true_checkbox_b();
  conjunto_universal = (input_conjunto_universal.value).split(',');
	elemento = (input_elemento.value);
  result = [];  
}

/*
	Son las operaciones.
*/
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
  output_operation.innerHTML = 'A &#8746; B ='; /* El c?digo es para el s?mbolo de la uni?n de conjuntos */
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

/*
	Es para que se puedan imprimir los conjuntos a modo de listado.
*/
function imprimir(){
  if (input_conjuntos.value == '') {
    input_conjuntos.value = '&#216;';
  }
	let conjunto = {
    'nombre': input_nombre_conjuntos.value, 
    'valor': input_conjuntos.value
  };
	biblioteca_conjuntos.push(conjunto);
  
	output_conjuntos.innerHTML += '<li>{' + conjunto['nombre'] + '} = ' + conjunto['valor'] + '</li>';
  input_conjuntos.value = '';
  input_nombre_conjuntos.value = '';
}
