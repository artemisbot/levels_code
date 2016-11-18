//function as found on the website:
function p() {
  $num = ['11','00','11','10','05','11','11','10','81','11','15','41','11','05','51'];
  $output = '';
  for ($i = 0; $i < 2; $i++) {
    for ($j = $i; $j < $num.length; $j += 2) {
      $output = $output + $num[$j];
    }
  }
}




//function with comments:
function p() {
  //create a function p
  $num = ['11','00','11','10','05','11','11','10','81','11','15','41','11','05','51'];
  //create an array (= list) named $num, containing the values 11, 00, ...
  $output = '';
  //create an empty variable called $output to store the output later
  for ($i = 0; $i < 2; $i++) {
    //create a loop: the loop checks each time it runs whether $i is still smaller than two. if it is, it runs
    //$i starts at the value 0, and "$i++" increases its value by 1 each time, so the loop runs twice
    for ($j = $i; $j < $num.length; $j += 2) {
      //a second loop: it checks whether $j is less than the length of $num. it increases the value of $j by 2 each time
      $output = $output + $num[$j];
      //appends the value at position $j in the array $num to output.
      //if $output were equal to "test" and $num had "ing" at position $j, the resulting $output would be "testing"
    }
  }
}


//this function does not do anything at the moment, since it has no way of displaying its result
//the player is expected to add some way of displaying this result
