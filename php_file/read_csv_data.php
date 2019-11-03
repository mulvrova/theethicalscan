<?
$csvFile = file("dummy_data.csv");
$data = [];
foreach ($csvFile as $line) {
    $data[] = str_getcsv($line);
}

$barcode=$data[1];

foreach(range(2,4) as $n) {
  switch($data[$n]) {
    case $data[$n] >= 0 and $data[$n]<1:
      $data[$n]="Really bad";
      break;
    case $data[$n] >= 1 and $data[$n]<2:
      $data[$n]="Not good enough";
      break;
     case $data[$n] >= 2 and $data[$n]<3:
      $data[$n]="It's a start";
      break;
    case $data[$n] >=3 and $data[$n]<4:
      $data[$n]="Pretty good";
      break;
    case $data[$n] >=4 and $data[$n]<=5:
      $data[$n]="Great";
      break;
    case $data[$n]="" or $data[$n]="NaN":
      $data[$n]="No information available";
      break;
    }
}

$barcode_input="1073139284309900000000000000000000000000000000";

// if (stristr($barcode,$barcode_input)){
  $fp = fopen('results.json', 'w');
  fwrite($fp, json_encode($data));
  fclose($fp);
// }

foreach($barcode as $key){
        if( stristr( $key, $barcode_input ) ){

          $fp = fopen('results.json', 'w');
          fwrite($fp, json_encode($data));
          fclose($fp);
        }
    }
?>
