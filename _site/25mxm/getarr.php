<?php

// $arr = array({
//     'id' => 3,
//     'name' => '时尚洋装连衣裙',
//     'tb' => 'https://item.taobao.com/item.htm?id=594352164056',
//     'wx' => 'https://mp.weixin.qq.com/s/wsIk3J0NxI-2VCAua-_0Lg',
//     'img' => 'https://img.alicdn.com/imgextra/i3/173939715/O1CN01RYIT232LdWJ7Q51pH_!!173939715.jpg',
//     'video' => ''}
// );
$searchKey = "";
if (!empty($_GET["key"])) {
    $searchKey = $_GET["key"];
}


$isMatched = preg_match('/^[A-Za-z0-9]+$/', $searchKey, $matches);



$isSecond = false;
//$sql = "SELECT (@i:=@i+1) as id,subitem.* from subitem,(select @i:=0) as it  ORDER BY name ";
$sql = "SELECT * FROM item ORDER BY id ";
function whatsSearchKey(){
    global $searchKey;
    global $isSecond;
    global $sql;
    if (!empty($searchKey)) {
        //$sql = "SELECT * FROM subitem WHERE name LIKE '%[" . $searchKey . "]%' ORDER BY id";
        $sql = "SELECT * FROM item WHERE name LIKE " . Split($searchKey, $isSecond) . " ORDER BY id ";
        //$sql = "SELECT (@i:=@i+1) AS id,subitem.* FROM subitem,(SELECT @i:=0) AS it WHERE name LIKE " . Split($searchKey, $isSecond) . " ORDER BY name";
    }
}


search();

function Split($str, $isSecond)
{
    $list = array();
    $start = 0;
    $lengh = mb_strlen($str, 'utf8'); //这里可以是指定的长度
    while (count($list) < $lengh) {
        $list[] =  mb_substr($str, $start, 1, 'utf8'); //也可以用$list .=
        $start++;
    }
    $result = "";
    $f = 0;
    foreach ($list as $value) {
        if ($isSecond) {
            if ($f == 0) {
                $result .= " '%" . $value . "%'";
                $f++;
            } else {
                $result .= "OR name LIKE '%" . $value . "%'";
            }
        } else {
            $result .= "%" . $value;
        }
    }
    if (!$isSecond) {
        $result = $result . "%";
        $result = "'" . $result . "'";
    }
    return $result;
    //print_r($result);
    //OR name LIKE '%子%'
}

function search()
{
    whatsSearchKey();
    global $isSecond;
    global $sql;
    //print_r($sql);
    global $isSecond;
    global $isMatched;
    $servername = "127.0.0.1";
    $username = "root";
    $password = "password";
    $dbname = "MXM_DB";

    // 创建连接
    if (empty($conn)) {
        $conn = new mysqli($servername, $username, $password, $dbname);
    }
    // Check connection
    if ($conn->connect_error) {
        die("连接失败: " . $conn->connect_error);
    }
    $result = $conn->query($sql);
    $arr = "";
    if ($result->num_rows > 0) {
        // 输出数据
        //var_dump($result->fetch_assoc());
        while ($row = $result->fetch_assoc()) {
            //$i=0;
            // echo "id: " . $row["Id"]. " - Name: " . $row["name"]. " " . $row["tb"]. "<br>";
            //var_dump($row);
            if(empty($row["wx"])){
                $row["wx"]=$row["txvideo"];
            }
            $arr = $arr . '{ "id": "' . $row["id"] . '","name": "' . $row["name"] . '","tb": "' . $row["tb"] . '","wx": "' . $row["wx"] . '","img": "' . $row["img"]. '","wxshop": "' . $row["wxshop"]  . '"},';
            //, "video": "" 
            //array_push($arr,$arr);

            // echo '<script>Item.push(' . json_encode($row) . '); 
            // //setTimeout(reflashQRcode, 1000);
            // //reflashQRcode();
            // </script>';
        }
        echo "[" . substr($arr, 0, strlen($arr) - 1) .',{"isSecondSearch":"'.$isSecond.'"}'. "]";
    } else {
        if (!$isSecond) {
            if($isMatched){
                echo 'no_result';
                $conn->close();
                return;
            }
            $isSecond = true;
            search($sql);
            return;
        }
        echo 'no_result';
        //echo "0 结果";
    }
    $conn->close();
}

//array_push($arr,$arr);
// $arr1 =  json_encode($arr1);
// $arr = substr($arr,1,strlen($arr)-1); 
// $newstr = "{id".$newstr;
// echo $arr1;
//echo json_encode($arr);

// echo '<script>Item.push(' . json_encode($arr) . '); 
// setTimeout(reflashQRcode, 1000);
// //reflashQRcode();
// </script>';
