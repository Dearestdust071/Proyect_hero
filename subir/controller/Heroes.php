    <?php
    require_once("../config/conexion.php");
    require_once("../models/heroe.php");

    $heroes = new heroe();


    $body = json_decode(file_get_contents("php://input"), true);

    switch ($_GET["opcion"]) {

        case "GetAll":
            $datos = $heroes->get_heroes();
            echo json_encode($datos);
            break;
        case "GetId":
            $datos = $heroes->get_heroe_x_id($body["heroe_id"]);
            echo json_encode($datos);
            break;
        case "Insert":
            $datos = $heroes->insert_heroe($body["url"], $body["genero"], $body["nombre"], $body["descripcion"], $body["compania"]);
            echo json_encode($datos);
            break;
        case "Update":
            $datos = $heroes->update_hero($body["id"], $body["url"], $body["genero"], $body["nombre"], $body["descripcion"], $body["compania"]);
            echo json_encode($datos);
            break;

        case "Delete":
            $datos = $heroes->delete_heroe($body["id"]);
            echo json_encode($datos);
            break;
    }
