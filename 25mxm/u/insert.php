<?php


$isDelete =false;
// $searchKey = "";
//echo $_GET["a"];
if (!empty($_GET["a"])) {
    if ($_GET["a"] == "d") {
        if(empty($_POST["pwd2"])){
            echo "<h1>请输入密码.</h1>";
            return;
        }else{
            if ( $_POST["pwd2"] != "passw0rd") {
                echo "<h1>密码错误</h1>";
                return;
            }else{
                $isDelete = true;
            }
        }      
    }
}
if(!$isDelete){
    if(empty($_POST["pwd"])){
        echo "<h1>请输入密码</h1>";
        return;
    }
    else if ($_POST["pwd"] != "passw0rd") {
        echo "<h1>密码错误</h1>";
        return;
    }
    
}



$servername = "localhost";
$username = "root";
$password = "passw0rd";
$dbname = "item";
if($isDelete){
    $sql="DELETE from subitem  order by id desc Limit 1";
}else{
    $sql = "INSERT INTO subitem (number, name, tag,tb,wx,wxshop,img,txvideo) VALUES ('$_POST[number]','$_POST[name]','$_POST[tag]','$_POST[tb]','$_POST[wx]','$_POST[wxshop]','$_POST[img]','$_POST[txvideo]')";
}
// 创建连接
if (empty($conn)) {
    $conn = new mysqli($servername, $username, $password, $dbname);
}
// Check connection
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}
$result = $conn->query($sql);
if ($result) {
    echo "<h1>操作成功</h1>";
}else{
    echo "操作失败,UNKNOW ERROR";
}
$conn->close();
