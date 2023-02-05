
var input_conjunto_a = (document.getElementById('input_conjunto_a'));

var input_conjunto_b = (document.getElementById('input_conjunto_b'));

var output_result = document.getElementById('output_result');




var conjunto_a, conjunto_b;
var result;



function union(){

  conjunto_a = (input_conjunto_a.value).split(',');
  conjunto_b = (input_conjunto_b.value).split(',');
  result = '';

  for (var i = 0; i < conjunto_a.length; i++) {

    for (var j = 0; j < conjunto_b.length; j++) {

      if (conjunto_b[j] == conjunto_a[i]){

        result += conjunto_a[i] + ',';

      }

    }

  }

  
return '{' + result + '}';

}



function diferencia(){

  conjunto_a = (input_conjunto_a.value).split(',');
  conjunto_b = (input_conjunto_b.value).split(',');
  result = '';

  for (var i = 0; i < conjunto_a.length; i++) {

    for (var j = 0; j < conjunto_b.length; j++) {

      if (conjunto_b[j] == conjunto_a[i]){

        result += conjunto_a[i] + ',';

      }

    }

  }

  
return '{' + result + '}';

}

