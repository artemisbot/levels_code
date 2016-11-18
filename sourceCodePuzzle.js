function p() {
  $num = ['11','00','11','10','05','11','11','10','81','11','15','41','11','05','51'];
  $output = '';
  for ($i = 0; $i < 2; $i++) {
    for ($j = $i; $j < $num.length; $j += 2) {
      $output = $output + $num[$j];
    }
  }
}
