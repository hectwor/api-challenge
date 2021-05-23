# RETO TECNICO

Proyecto encargado de traducir llaves de las respuesta en la consulta con el SWAPI (https://swapi.py4e.com/documentation)

El archivo contenedor de las funciones es `handler.ts` ubicado dentro de la carpeta `src`.

Los archivos de pruebas unitarias estan dentro de la carpeta `test`.

El archivo configuracion llamado `serverless.yml`

Se esta colocando accessKeyId y secretAccessKey de prueba, eliminando el acceso a las 2 semanas de generado el proyecto.

## Install
    (npm install) / (yarn add) -g serverless
    (npm) / (yarn) install
    sudo apt install default-jdk
    sls dynamodb install (Para probar dynamodb en local)

## Run the app
    sls dynamodb start (Para probar dynamodb en local)
    (npm run) / (yarn) local
    
## Run the tests
    (npm run) / (yarn) test

## Run the lint
    (npm run) / (yarn) lint

# REST API

## Get Keys

### Request

`GET /keys/`

    curl -i -H 'Accept: application/json' -X GET http://localhost:3000/keys/

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    []

## Crear una key

### Request

`POST /keys/`

    curl -i -H 'Accept: application/json' -X POST -d '{"original": "name", "translated": "Nombre"}' http://localhost:3000/keys

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    {"message":"Guardado correcto."}

## Actualizar Key

### Request

`PUT /keys`

    curl -i -H 'Accept: application/json' -X PUT -d '{"original": "name", "translated": "Nombre"}' http://localhost:3000/keys

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    {"message":"Actualizado correcto."}

## Obtener Films

### Request

`GET /films`

    curl -i -H 'Accept: application/json' -X GET http://localhost:3000/films/

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    []