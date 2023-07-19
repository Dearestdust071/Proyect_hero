<?php

class heroe extends Conectar
{


    public function get_heroes()
    {
        $db = parent::Conexion();
        parent::set_names();
        $sql = "SELECT * FROM hero";
        $sql = $db->prepare($sql);
        $sql->execute();
        $resultado = $sql->fetchAll(PDO::FETCH_OBJ);
        $Array = [];
        foreach ($resultado as $d) {
            $Array[] = [
                'id' => (int)$d->id,
                'url' => $d->url,
                'genero' => $d->gender,
                'nombre' => ($d->name),
                'description' => ($d->description),
                'compania' => ($d->company),
                'timestamp' => ($d->insert_time),
            ];
        };
        return $Array;
    }

    public function insert_heroe($url, $genero, $nombre, $description, $compania)
    {
        try {
            $conectar = parent::Conexion();
            parent::set_names();

            // Sanitizar los valores antes de insertarlos en la base de datos
            $url = htmlspecialchars($url);
            $genero = htmlspecialchars($genero);
            $nombre = htmlspecialchars($nombre);
            $description = htmlspecialchars($description);
            $compania = htmlspecialchars($compania);

            $sql = "INSERT INTO `hero`(`url`, `gender`, `name`, `description`, `company`) VALUES (?,?,?,?,?);";
            $sql = $conectar->prepare($sql);
            $sql->bindValue(1, $url);
            $sql->bindValue(2, $genero);
            $sql->bindValue(3, $nombre);
            $sql->bindValue(4, $description);
            $sql->bindValue(5, $compania);

            $resultado['estatus'] = $sql->execute();

            if ($resultado['estatus']) {
                // Si la inserción fue exitosa, retornar el ID del registro insertado
                $resultado['mensaje'] = 'Inserción exitosa';
                $resultado['id'] = (int)$conectar->lastInsertId();
            } else {
                $resultado['mensaje'] = 'Error al insertar el registro';
            }

            return $resultado;
        } catch (PDOException $e) {
            // Manejar errores de la base de datos
            return ['estatus' => false, 'mensaje' => 'Error en la base de datos: ' . $e->getMessage()];
        } catch (Exception $e) {
            // Manejar otros errores
            return ['estatus' => false, 'mensaje' => 'Error: ' . $e->getMessage()];
        }
    }

    public function get_heroe_x_id($heroe_id)
    {
        try {
            $conectar = parent::conexion();
            parent::set_names();
            $sql = "SELECT * FROM hero WHERE id = ?;";
            $sql = $conectar->prepare($sql);
            $sql->bindValue(1, $heroe_id);
            $sql->execute();
            $resultado = $sql->fetch(PDO::FETCH_OBJ);
            $Array = $resultado ? [
                'id' => (int)$resultado->id,
                'url' => $resultado->url,
                'genero' => $resultado->gender,
                'nombre' => ($resultado->name),
                'description' => ($resultado->description),
                'compania' => ($resultado->company),
                'timestamp' => ($resultado->insert_time),
            ] : [];
            return $Array;
        } catch (PDOException $e) {
            return ['estatus' => false, 'mensaje' => 'Error en la base de datos: ' . $e->getMessage()];
        } catch(Exception $e){
            return ['estatus' => false, 'mensaje' => 'Error: ' . $e->getMessage()];
        }
    }

    public function update_hero($id, $url, $genero, $nombre, $description, $compania)
    {
        $conectar = parent::conexion();
        parent::set_names();
        $sql = "UPDATE `hero` SET `url`= ?, `gender`= ?, `name`= ?, `description` = ?, `company` = ? WHERE id = ?;";
        $sql = $conectar->prepare($sql);
        $sql->bindValue(1, $url);
        $sql->bindValue(2, $genero);
        $sql->bindValue(3, $nombre);
        $sql->bindValue(4, $description);
        $sql->bindValue(5, $compania);
        $sql->bindValue(6, $id);
        $resultado['estatus'] = $sql->execute();
        return $resultado;
    }

    public function delete_heroe($id)
    {
        $conectar = parent::conexion();
        parent::set_names();
        $sql = "DELETE FROM `hero` WHERE id = ?;";
        $sql = $conectar->prepare($sql);
        $sql->bindValue(1, $id);
        $resultado['estatus'] = $sql->execute();
        return $resultado;
    }

}
